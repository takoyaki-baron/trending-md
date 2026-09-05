#!/usr/bin/env node
// link-check.mjs — standing liveness check for the links the feed cites. CLAUDE.md's correction
// convention names the failure class ("resolve every permalink, not just article URLs — social-media
// permalinks are the feed's most fragile citations"), but nothing in the pipeline ever re-resolves a
// published link after the run that cited it: a 404 that lands tomorrow surfaces only when a reader
// hits it. This tool is that re-resolution, standing and best-effort: each run it re-checks every
// URL in the newest en/feed/YYYY-MM-DD.md file(s) and prints ONLY failures — same close-out shape as
// the MCP-drift, disclosure, evidence-tier and release watches (the check retires into the tool; a
// dead link surfaces itself in the run log).
//
//   node agent/tools/link-check.mjs --feed-dir en/feed --state agent/data/link-check.json [--days 1]
//
// Verdicts: ok | dead (404/410) | blocked (401/403/429/999 bot-wall — cannot tell) | transient
// (5xx/timeout/network; retried once). `blocked` and `transient` never escalate; a link that comes
// back `dead` on 2 consecutive runs prints with a ⚠ (correction-candidate). First run still prints
// dead links — unlike the other watches there is no "seed quietly" period worth having, because the
// actionable response is the CLAUDE.md in-place correction convention, not a follow-up watch.
// Exits non-zero only when every check errored at network level (caller treats as non-fatal).
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';

const arg = (name) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : null;
};
const feedDir = arg('feed-dir') ?? 'en/feed';
const statePath = arg('state') ?? 'agent/data/link-check.json';
const days = Number(arg('days') ?? '1');

let state = { urls: {}, runs: 0, first_run: null, last_run: null };
try { state = { ...state, ...JSON.parse(readFileSync(statePath, 'utf8')) }; } catch { /* first run */ }

// Social/status permalinks — the class CLAUDE.md flags as most fragile; failures here are
// announced more loudly than article-link failures.
const PERMALINK = /\/\/(x\.com|twitter\.com)\/[^/]+\/status\/|\/@(?:[^/]+)\/\d{10,}|\/\/bsky\.app\/profile\/[^/]+\/post\/|\/\/(www\.)?threads\.(com|net)\//;

const files = readdirSync(feedDir)
  .filter((f) => /^\d{4}-\d{2}-\d{2}\.md$/.test(f))
  .sort()
  .slice(-days);
if (!files.length) {
  console.error(`link-check: no feed files found in ${feedDir}`);
  process.exit(1);
}

const urls = new Set();
for (const f of files) {
  const text = readFileSync(join(feedDir, f), 'utf8');
  // Cited links appear both as markdown [label](url) and as bare https://… (the build auto-links
  // those). Strip the trailing markdown/bare-URL punctuation the regex tends to swallow.
  for (const m of text.matchAll(/https?:\/\/[^\s)`|>'"]+/g)) {
    urls.add(m[0].replace(/[.,;]+$/, ''));
  }
}

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36 trending-md-link-check/1.0';

// GET, not HEAD: HEAD is unreliable at the edge — support.google.com serves 404 to HEAD and 200
// to GET, news.ycombinator.com 405s HEAD outright (both verified 2026-09-05). We cancel the body
// as soon as the status arrives, so the cost is one round trip like HEAD.
const verdictOf = async (url) => {
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch(url, {
        redirect: 'follow',
        headers: { 'user-agent': UA, accept: 'text/html,application/xhtml+xml,*/*' },
        signal: AbortSignal.timeout(20_000),
      });
      res.body?.cancel().catch(() => {});
      if (res.status >= 200 && res.status < 400) return 'ok';
      if ([404, 410].includes(res.status)) return 'dead';
      if ([401, 403, 429, 999].includes(res.status)) {
        // Bot walls and rate limiters (HN 403s a burst — verified 2026-09-05). One backoff retry
        // separates the two: a rate limiter lets the retry through, a bot wall doesn't.
        if (attempt === 0) {
          await new Promise((r) => setTimeout(r, 2500));
          continue;
        }
        return 'blocked';
      }
      if (res.status >= 500 || attempt === 1) return 'transient';
      return res.status >= 400 ? 'blocked' : 'transient'; // odd 4xx (405, 451, …) — cannot tell
    } catch {
      if (attempt === 1) return 'transient'; // network error / timeout — retried once
    }
    await new Promise((r) => setTimeout(r, 1200));
  }
  return 'transient';
};

const list = [...urls];
const results = {};
const WORKERS = 8;
// Per-host minimum spacing: HN's limiter 403s bursts of item GETs (verified 2026-09-05 —
// 32/32 blocked at 8 concurrent, ~all passing when spaced), so the feed's most-cited host
// gets paced; everything else runs at full concurrency.
const HOST_GAP = { 'news.ycombinator.com': 1500 };
const lastReq = {};
let cursor = 0;
const pace = async (host) => {
  const gap = HOST_GAP[host];
  if (!gap) return;
  const wait = gap - (Date.now() - (lastReq[host] ?? 0));
  if (wait > 0) await new Promise((r) => setTimeout(r, wait));
  lastReq[host] = Date.now();
};
await Promise.all(
  Array.from({ length: Math.min(WORKERS, list.length) }, async () => {
    while (cursor < list.length) {
      const url = list[cursor++];
      await pace(new URL(url).hostname);
      results[url] = await verdictOf(url);
    }
  }),
);

const now = new Date().toISOString();
const dead = [];
const blocked = [];
const transient = [];
for (const [url, verdict] of Object.entries(results)) {
  if (verdict === 'ok') {
    if (state.urls[url]) delete state.urls[url]; // healed — forget the history
    continue;
  }
  const prev = state.urls[url] ?? { streak: 0, verdict: null, first_seen: now };
  const streak = verdict === prev.verdict ? prev.streak + 1 : 1;
  const entry = { verdict, streak, first_seen: prev.first_seen ?? now, last_seen: now, feeds: files };
  state.urls[url] = entry;
  if (verdict === 'dead') dead.push({ url, streak, permalink: PERMALINK.test(url), first_seen: entry.first_seen });
  else if (verdict === 'blocked') blocked.push(url);
  else transient.push(url);
}

state.runs += 1;
state.last_run = now;
if (!state.first_run) state.first_run = now;
mkdirSync(dirname(statePath), { recursive: true });
writeFileSync(statePath, `${JSON.stringify(state, null, 2)}\n`);

dead.sort((a, b) => b.streak - a.streak);
if (dead.length === 0) {
  console.log(`link-check: null — ${list.length} link(s) in ${files.join(', ')} all reachable` +
    (blocked.length ? ` (${blocked.length} bot-wall/blocked, not judged)` : '') +
    ` (run #${state.runs})`);
} else {
  console.log(`link-check: ${dead.length} dead link(s) in ${files.join(', ')} (run #${state.runs}):`);
  for (const d of dead) {
    const tag = d.permalink ? ' [PERMALINK]' : '';
    const warn = d.streak >= 2 ? ' ⚠ dead on 2+ consecutive runs — correction candidate (CLAUDE.md convention)' : '';
    console.log(`  ✗ ${d.url}${tag}${warn}`);
  }
}
if (transient.length) console.error(`link-check: ${transient.length} transient (5xx/timeout/network, not judged): ${transient.slice(0, 3).join(', ')}${transient.length > 3 ? ' …' : ''}`);
if (blocked.length) console.error(`link-check: ${blocked.length} bot-walled (401/403/429 — cannot judge): ${blocked.slice(0, 3).join(', ')}${blocked.length > 3 ? ' …' : ''}`);
if (dead.length === list.length && list.length > 0) process.exit(1);
