#!/usr/bin/env node
// evidence-tier-watch.mjs — standing GitHub code-search watch for independent adopters of caveman's
// evidence-tier vocabulary (`inferred` / `benchmark_counterfactual` / `verified`). This agent ran the
// check manually 27 times (08-19 → 09-01) with zero second adopters; the MCP-drift precedent says a
// per-run manual check should become a best-effort standing tool wired into agent-run.sh, so a new
// adopter surfaces itself in the run log instead of waiting for an agenda line.
//
//   node agent/tools/evidence-tier-watch.mjs --state agent/data/evidence-tier-watch.json
//
// Behavior: search GitHub code for the vocabulary's fingerprint token, diff against the seen-set in
// the state file, print ONLY new hits (repo/path) for the run log, then merge them into the seen-set.
// A run with no new hits prints a one-line null — a null is a data point, not an error. Exits non-zero
// only when the search itself fails (gh missing/unauthenticated), which callers treat as non-fatal.
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const QUERY = 'benchmark_counterfactual'; // the tier term unique to the vocabulary
const arg = (name) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : null;
};
const statePath = arg('state') ?? 'agent/data/evidence-tier-watch.json';

let state = { seen: {}, runs: 0, first_run: null, last_run: null, last_total: null };
try { state = { ...state, ...JSON.parse(readFileSync(statePath, 'utf8')) }; } catch { /* first run */ }

let hits;
try {
  const out = execFileSync('gh', ['api', '-X', 'GET', 'search/code',
    '-f', `q=${QUERY}`, '-f', 'per_page=100'], { encoding: 'utf8', timeout: 60_000 });
  hits = JSON.parse(out).items ?? [];
} catch (err) {
  console.error(`evidence-tier-watch: search failed: ${String(err.message || err).split('\n')[0]}`);
  process.exit(1);
}

const fingerprint = (h) => `${h.repository.full_name}::${h.path}`;
const newHits = hits.filter((h) => !state.seen[fingerprint(h)]);

state.runs += 1;
state.last_run = new Date().toISOString();
state.last_total = hits.length;
if (!state.first_run) state.first_run = state.last_run;
for (const h of newHits) state.seen[fingerprint(h)] = { repo: h.repository.full_name, path: h.path, html_url: h.html_url, found: state.last_run };
mkdirSync(dirname(statePath), { recursive: true });
writeFileSync(statePath, `${JSON.stringify(state, null, 2)}\n`);

if (newHits.length === 0) {
  console.log(`evidence-tier-watch: null — ${hits.length} hits, all previously seen (run #${state.runs}); no second adopter yet`);
} else {
  console.log(`evidence-tier-watch: ${newHits.length} NEW hit(s) of ${hits.length} total (run #${state.runs}) — possible second adopter(s):`);
  for (const h of newHits) console.log(`  ${h.repository.full_name} — ${h.path} — ${h.html_url}`);
}
