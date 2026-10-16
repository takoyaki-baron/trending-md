#!/usr/bin/env node
// release-watch.mjs — standing GitHub release/status watch for repos whose *absence of motion* is
// itself the data point. Two agenda threads kept degrading into per-run manual status checks:
//   1. Routing policy DSLs (thesis 5): the "policy fragments, transport commoditized" reading rests
//      on three DSLs hardening main daily while shipping zero tagged releases and zero shared schema.
//   2. Skills-eval adoption (thesis 8): star-rich skill repos shipping no SkillsBench/Vals submission.
// Same close-out as the MCP-drift and evidence-tier watches: a best-effort standing tool wired into
// agent-run.sh, so a change surfaces itself in the run log instead of costing an agenda line.
//
//   node agent/tools/release-watch.mjs --manifest agent/tools/release-watch.json \
//        --state agent/data/release-watch.json
//
// Behavior: for each manifest repo, fetch latest release (tag + date), pushed_at, stars, and scan the
// README for adoption fingerprints (`SkillsBench`, `vals.ai`). Print ONLY changes vs the state file —
// a new/changed release tag, a README fingerprint gained or lost, or a frozen repo that moved. A run
// with no changes prints a one-line null (a null is a data point, not an error). First run seeds the
// baseline. Exits non-zero only when a fetch itself fails, which callers treat as non-fatal.
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const arg = (name) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : null;
};
const manifestPath = arg('manifest') ?? 'agent/tools/release-watch.json';
const statePath = arg('state') ?? 'agent/data/release-watch.json';

const FINGERPRINTS = /SkillsBench|vals\.ai/i; // the shared-corpus adoption signal for skills repos

let state = { repos: {}, runs: 0, first_run: null, last_run: null };
try { state = { ...state, ...JSON.parse(readFileSync(statePath, 'utf8')) }; } catch { /* first run */ }

const gh = (path) => JSON.parse(execFileSync('gh', ['api', path],
  { encoding: 'utf8', timeout: 60_000, maxBuffer: 64 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] }));

const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
const now = new Date().toISOString();
const changes = [];
const errors = [];

for (const entry of manifest.watch) {
  const { repo, why, body_regex, scan_count } = entry;
  try {
    /* ── scan mode (body_regex set): changelog watches on near-daily release streams.
       /releases/latest alone would fire on every tag and drown the channel; instead fetch the
       release LIST with bodies, regex only tags not yet seen, announce matches, silently
       re-baseline non-matching drift. Added 2026-10-16 for the header-channel watch
       (Claude Code / Codex / Gemini CLI release notes vs response-header handling). */
    if (body_regex) {
      const releases = gh(`repos/${repo}/releases?per_page=${scan_count ?? 20}`);
      const tags = releases.map((r) => r.tag_name);
      const prev = state.repos[repo];
      const seen = new Set(prev?.seen_tags ?? []);
      const hits = [];
      for (const r of releases) {
        if (seen.has(r.tag_name)) continue;
        const hay = `${r.name ?? ''}\n${r.tag_name ?? ''}\n${r.body ?? ''}`;
        const matched = [...new Set(hay.match(new RegExp(body_regex, 'gi')) ?? [])].slice(0, 6);
        if (matched.length) hits.push({ tag: r.tag_name, date: (r.published_at ?? '').slice(0, 10), matched });
      }
      if (!prev) {
        // Seed: baseline everything silently, but count pre-seed body mentions (published before
        // the item was filed — context, not a response; dates live in the releases themselves).
        const preSeed = releases.filter((r) =>
          new RegExp(body_regex, 'i').test(`${r.name ?? ''}\n${r.tag_name ?? ''}\n${r.body ?? ''}`));
        changes.push(`seed ${repo} (scan /${body_regex}/i) — ${tags.length} release(s) baselined, ` +
          `${preSeed.length} pre-seed body mention(s)${preSeed.length ? ` [${preSeed.map((r) => r.tag_name).join(', ')}]` : ''} — ${why}`);
      } else {
        for (const h of hits) {
          changes.push(`${repo} RELEASE-HIT: ${h.tag} (${h.date}) matched [${h.matched.join(' | ')}] — ${why}`);
        }
      }
      const meta = gh(`repos/${repo}`);
      state.repos[repo] = { seen_tags: tags.slice(0, 30), pushed_at: meta.pushed_at, stars: meta.stargazers_count, checked: now };
      continue;
    }
    const meta = gh(`repos/${repo}`);
    let release = null;
    try { release = gh(`repos/${repo}/releases/latest`); } catch { /* no releases yet */ }
    let readmeFlags = [];
    try {
      const rd = gh(`repos/${repo}/readme`);
      const text = Buffer.from(rd.content ?? '', 'base64').toString('utf8');
      const found = text.match(new RegExp(FINGERPRINTS.source, 'gi')) ?? [];
      readmeFlags = [...new Set(found.map((f) => f.toLowerCase()))];
    } catch { /* unreadable README — keep last flags */ }
    const observed = {
      tag: release?.tag_name ?? null,
      published_at: release?.published_at ?? null,
      pushed_at: meta.pushed_at,
      stars: meta.stargazers_count,
      flags: readmeFlags,
    };
    const prev = state.repos[repo];
    if (!prev) {
      changes.push(`seed ${repo} — tag=${observed.tag ?? 'none'} pushed=${observed.pushed_at} ★${observed.stars}` +
        (observed.flags.length ? ` flags=[${observed.flags.join(',')}]` : ''));
    } else {
      if (observed.tag !== prev.tag) {
        changes.push(`${repo} RELEASE: ${prev.tag ?? 'none'} → ${observed.tag} (${observed.published_at}) — ${why}`);
      }
      const gained = observed.flags.filter((f) => !prev.flags.includes(f));
      const lost = prev.flags.filter((f) => !observed.flags.includes(f));
      if (gained.length) changes.push(`${repo} README now references [${gained.join(',')}] — ${why}`);
      if (lost.length) changes.push(`${repo} README no longer references [${lost.join(',')}] — ${why}`);
      if (prev.pushed_at === prev.frozen_pushed_at && observed.pushed_at !== prev.pushed_at && prev.frozen_pushed_at) {
        changes.push(`${repo} moved after being frozen at ${prev.frozen_pushed_at} (pushed ${observed.pushed_at})`);
      }
    }
    state.repos[repo] = {
      ...observed,
      frozen_pushed_at:
        observed.pushed_at === (prev?.pushed_at ?? observed.pushed_at)
          ? (prev?.frozen_pushed_at ?? observed.pushed_at) // keep earliest seen push while frozen
          : null, // moved — clear the frozen marker
      checked: now,
    };
  } catch (err) {
    errors.push(`${repo}: ${String(err.message || err).split('\n')[0]}`);
  }
}

state.runs += 1;
state.last_run = now;
if (!state.first_run) state.first_run = now;
mkdirSync(dirname(statePath), { recursive: true });
writeFileSync(statePath, `${JSON.stringify(state, null, 2)}\n`);

if (errors.length) {
  console.error(`release-watch: ${errors.length} fetch failure(s): ${errors.join('; ')}`);
  if (changes.length === 0) process.exit(1); // all-failed run is an error; partial run still reports
}
if (changes.length === 0) {
  const scanned = manifest.watch.filter((e) => e.body_regex).length;
  console.log(`release-watch: null — ${manifest.watch.length} repos unchanged (run #${state.runs}` +
    (scanned ? `, ${scanned} changelog-scanned` : '') + `)`);
} else {
  console.log(`release-watch: ${changes.length} change(s) (run #${state.runs}):`);
  for (const c of changes) console.log(`  ${c}`);
}
