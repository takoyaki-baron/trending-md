#!/usr/bin/env node
// star-integrity.mjs — standing engagement-ratio check for repos whose star count the feed flagged
// as unverified. The manual check kept recurring by hand (Paperclip 09-25, reverse-skill 09-26),
// and one input it used to rely on is gone: GitHub now 404s the stargazers listing (API + HTML)
// PLATFORM-WIDE (verified 09-26 20:51 against four unrelated repos), so star TIMELINES are no
// longer obtainable and the check rests on what the repos endpoint still serves — stars, forks,
// subscribers, created_at — plus commit-count and first-commit probes.
//
//   node agent/tools/star-integrity.mjs \
//        --manifest agent/tools/star-integrity.json --state agent/data/star-integrity.json
//
// Per watched repo it computes: ★/commit ratio (commit count via the commits list's last Link
// page), fork %, subscriber %, and a history-span probe (oldest visible commit date vs the repo's
// created_at — a gap > `history_gap_days` means the visible history begins late: rewritten, or a
// long-empty repo whose star clock started long before its code). A repo is FLAGged when
// ★/commit ≥ `flag_ratio` (default 100, calibrated against the Paperclip 19 / jev-ultrafast ~85 /
// OpenMontage ~129 ladder) or the history gap trips; `controls` are measured for context, never
// flagged. Prints ONLY seeds and verdict changes — a stable verdict reprints one null line per
// run (a null is a data point). Exits non-zero only when every fetch fails (callers treat as
// non-fatal).
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const arg = (name) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : null;
};
const manifestPath = arg('manifest') ?? 'agent/tools/star-integrity.json';
const statePath = arg('state') ?? 'agent/data/star-integrity.json';

let state = { repos: {}, runs: 0, first_run: null, last_run: null };
try { state = { ...state, ...JSON.parse(readFileSync(statePath, 'utf8')) }; } catch { /* first run */ }

// -i so the Link header (commit-count pagination) is captured; body follows after the blank line.
const gh = (path) => {
  const raw = execFileSync('gh', ['api', '-i', path],
    { encoding: 'utf8', timeout: 60_000, maxBuffer: 8 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] });
  const split = raw.match(/\r?\n\r?\n/);
  const headers = raw.slice(0, split.index);
  const link = headers.match(/^link:.*?page=(\d+)>;\s*rel="last"/mi);
  return { body: JSON.parse(raw.slice(split.index + split[0].length)), lastPage: link ? Number(link[1]) : 1 };
};

const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
const FLAG_RATIO = manifest.flag_ratio ?? 100;
const HISTORY_GAP_DAYS = manifest.history_gap_days ?? 30;
const now = new Date().toISOString();
const lines = [];
const errors = [];

for (const kind of ['watch', 'controls']) {
  for (const { repo, why } of manifest[kind] ?? []) {
    const flagged = kind === 'watch';
    try {
      const meta = gh(`repos/${repo}`).body;
      const { lastPage: commitPages } = gh(`repos/${repo}/commits?per_page=1`);
      const oldest = gh(`repos/${repo}/commits?per_page=1&page=${commitPages}`).body;
      const firstCommit = oldest?.[0]?.commit?.author?.date ?? null;
      const commits = commitPages;
      const ratio = commits ? Math.round(meta.stargazers_count / commits) : null;
      const gapDays = firstCommit
        ? Math.round((Date.parse(firstCommit) - Date.parse(meta.created_at)) / 86_400_000)
        : null;
      const flags = [];
      if (ratio !== null && ratio >= FLAG_RATIO) flags.push(`ratio≥${FLAG_RATIO}`);
      if (gapDays !== null && gapDays > HISTORY_GAP_DAYS) flags.push(`history starts +${gapDays}d after created_at`);
      const verdict = flagged ? (flags.length ? `FLAG(${flags.join('; ')})` : 'ok') : 'control';
      const observed = {
        stars: meta.stargazers_count, commits, ratio,
        forks_pct: meta.stargazers_count ? +(100 * meta.forks_count / meta.stargazers_count).toFixed(1) : null,
        subs_pct: meta.stargazers_count ? +(100 * meta.subscribers_count / meta.stargazers_count).toFixed(2) : null,
        first_commit: firstCommit, created_at: meta.created_at, verdict, checked: now,
      };
      const prev = state.repos[repo];
      const ctx = `★${observed.stars.toLocaleString()}/${observed.commits} commits ≈ ${ratio}★/commit · ` +
        `forks ${observed.forks_pct}% · subs ${observed.subs_pct}% · history ${firstCommit?.slice(0, 10) ?? '?'} vs created ${observed.created_at.slice(0, 10)}`;
      if (!prev) {
        lines.push(`seed ${repo} — ${verdict}: ${ctx} — ${why}`);
      } else if (prev.verdict !== verdict) {
        lines.push(`${repo} VERDICT CHANGE: ${prev.verdict} → ${verdict}: ${ctx} — ${why}`);
      } else if (verdict.startsWith('FLAG') && prev.ratio !== ratio) {
        lines.push(`${repo} still ${verdict} at ${ratio}★/commit (was ${prev.ratio}) — ${why}`);
      }
      state.repos[repo] = observed;
    } catch (err) {
      errors.push(`${repo}: ${String(err.message || err).split('\n')[0]}`);
    }
  }
}

state.runs += 1;
state.last_run = now;
if (!state.first_run) state.first_run = now;
mkdirSync(dirname(statePath), { recursive: true });
writeFileSync(statePath, `${JSON.stringify(state, null, 2)}\n`);

if (errors.length) console.error(`star-integrity: ${errors.length} fetch failure(s): ${errors.join('; ')}`);
if (errors.length === (manifest.watch?.length ?? 0) + (manifest.controls?.length ?? 0)) process.exit(1);
if (lines.length === 0) {
  console.log(`star-integrity: null — ${(manifest.watch?.length ?? 0)} watched + ${(manifest.controls?.length ?? 0)} control repo(s) verdicts unchanged (run #${state.runs})`);
} else {
  console.log(`star-integrity: ${lines.length} line(s) (run #${state.runs}):`);
  for (const l of lines) console.log(`  ${l}`);
}
