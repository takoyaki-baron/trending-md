#!/usr/bin/env node
// disclosure-watch.mjs — standing watch for pending security disclosures whose *absence* is
// currently the data point. Opened 2026-09-02: OpenAI's "Path to Astra" post self-designates
// Astra "Critical" and names two zero-days the model discovered and chained during evals with
// "disclosure in progress" — the externally checkable claim of an otherwise self-graded report.
// openai.com 403s a plain fetch (Cloudflare), so the post itself can't be fingerprinted; the
// watch instead looks where a disclosure lands:
//   1. NVD keyword search (services.nvd.nist.gov, no key, 5 req/30s) filtered to CVEs published
//      since the post — a Chrome/V8/OS CVE crediting OpenAI is the canonical landing.
//   2. Hacker News (Algolia search_by_date API) — an independent writeup surfaces as a new story.
// Same close-out as the MCP-drift, evidence-tier and release watches: a best-effort standing tool
// wired into agent-run.sh, so the disclosure surfaces itself in the run log instead of costing a
// per-run manual web check whose "no disclosure yet" slowly becomes an unnoticed null.
//
//   node agent/tools/disclosure-watch.mjs --manifest agent/tools/disclosure-watch.json \
//        --state agent/data/disclosure-watch.json
//
// Behavior: for each watch item, query both channels and print ONLY new hits vs the state file
// (first run seeds the baseline). A run with no new hits prints a one-line null — a null is a data
// point, not an error. Exits non-zero only when every channel fetch fails, which callers treat as
// non-fatal.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const arg = (name) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : null;
};
const manifestPath = arg('manifest') ?? 'agent/tools/disclosure-watch.json';
const statePath = arg('state') ?? 'agent/data/disclosure-watch.json';

let state = { items: {}, runs: 0, first_run: null, last_run: null };
try { state = { ...state, ...JSON.parse(readFileSync(statePath, 'utf8')) }; } catch { /* first run */ }

const get = async (url) => {
  const res = await fetch(url, { headers: { 'user-agent': 'trending-md-disclosure-watch/1.0' }, signal: AbortSignal.timeout(30_000) });
  if (!res.ok) throw new Error(`${res.status} ${url.slice(0, 80)}`);
  return res.json();
};

// NVD requires the pub window to be ≤ 120 days; clamp the item's `since` accordingly.
const clampSince = (iso) => {
  const min = Date.now() - 119 * 24 * 3600 * 1000;
  const t = Math.max(Date.parse(iso) || 0, min);
  return new Date(t).toISOString().replace('Z', '.000').slice(0, 23);
};

const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
const now = new Date().toISOString();
const changes = [];
const errors = [];

for (const item of manifest.watch) {
  const prev = state.items[item.id] ?? { nvd_seen: [], hn_seen: [] };
  const observed = { nvd_seen: [...prev.nvd_seen], hn_seen: [...prev.hn_seen] };

  // 1. NVD keyword search since the post date.
  for (const kw of item.nvd_keywords ?? []) {
    try {
      const url = 'https://services.nvd.nist.gov/rest/json/cves/2.0?keywordSearch=' +
        encodeURIComponent(kw) +
        `&pubStartDate=${encodeURIComponent(clampSince(item.nvd_since ?? now))}` +
        `&pubEndDate=${encodeURIComponent(new Date().toISOString().replace('Z', '.000').slice(0, 23))}` +
        '&resultsPerPage=50';
      const d = await get(url);
      for (const v of d.vulnerabilities ?? []) {
        const cve = v.cve.id;
        if (observed.nvd_seen.includes(cve)) continue;
        const desc = (v.cve.descriptions ?? []).find((x) => x.lang === 'en')?.value ?? '';
        if (prev.nvd_seen.length) { // seed run records silently; later runs announce
          changes.push(`${item.id} NVD: ${cve} — ${desc.slice(0, 140)}`);
        }
        observed.nvd_seen.push(cve);
      }
      await new Promise((r) => setTimeout(r, 1000)); // stay under the no-key rate limit
    } catch (err) {
      errors.push(`${item.id}/nvd/${kw}: ${String(err.message || err).split('\n')[0]}`);
    }
  }

  // 2. Hacker News stories matching the item's title fingerprint.
  if (item.hn_query) {
    try {
      const sinceEpoch = Math.floor((Date.parse(item.nvd_since ?? now) || Date.now()) / 1000);
      const url = 'https://hn.algolia.com/api/v1/search_by_date?query=' + encodeURIComponent(item.hn_query) +
        '&tags=story&hitsPerPage=50&numericFilters=created_at_i%3E' + sinceEpoch;
      const d = await get(url);
      const re = new RegExp(item.hn_title_regex ?? '', 'i');
      for (const h of d.hits ?? []) {
        const title = h.title ?? '';
        if (!re.test(title)) continue;
        if (observed.hn_seen.includes(h.objectID)) continue;
        if (prev.hn_seen.length) {
          changes.push(`${item.id} HN: "${title}" https://news.ycombinator.com/item?id=${h.objectID} (${h.points ?? 0} pts)`);
        }
        observed.hn_seen.push(h.objectID);
      }
    } catch (err) {
      errors.push(`${item.id}/hn: ${String(err.message || err).split('\n')[0]}`);
    }
  }

  observed.nvd_seen.sort();
  observed.hn_seen.sort();
  observed.checked = now;
  state.items[item.id] = observed;
}

state.runs += 1;
state.last_run = now;
if (!state.first_run) state.first_run = now;
mkdirSync(dirname(statePath), { recursive: true });
writeFileSync(statePath, `${JSON.stringify(state, null, 2)}\n`);

if (errors.length && errors.length >= (manifest.watch.length)) {
  console.error(`disclosure-watch: all channel fetches failed: ${errors.join('; ')}`);
  process.exit(1);
}
if (errors.length) console.error(`disclosure-watch: ${errors.length} partial failure(s): ${errors.join('; ')}`);
if (changes.length === 0) {
  const watched = manifest.watch.map((w) => w.id).join(', ');
  console.log(`disclosure-watch: null — no disclosure landed for [${watched}] (run #${state.runs})`);
} else {
  console.log(`disclosure-watch: ${changes.length} new hit(s) (run #${state.runs}):`);
  for (const c of changes) console.log(`  ${c}`);
}
