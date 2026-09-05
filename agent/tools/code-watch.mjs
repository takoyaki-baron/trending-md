#!/usr/bin/env node
// code-watch.mjs — standing GitHub code-search watch for fingerprints whose "absence of new hits"
// is itself the data point. Generalized (2026-09-06) from evidence-tier-watch.mjs, which was
// hardcoded to a single query: the Random Attention agenda item had claimed "an upstream
// integration surfaces itself" via release-watch, but release-watch only pins the RA repo itself —
// an upstream integration lands in vLLM/SGLang *code*, which nothing watched. A config-driven
// code-search watch closes that class: any fingerprint question of the form "has X appeared in
// the world's code yet" becomes a config entry, not an agenda line.
//
//   node agent/tools/code-watch.mjs --config agent/tools/code-watch.json \
//        --state agent/data/code-watch.json
//
// Behavior: for each config entry, run the code search, diff against that entry's seen-set in the
// state file, print ONLY new hits (repo/path) for the run log, then merge them in. A watch with no
// new hits prints a one-line null — a null is a data point, not an error. Exits non-zero only when
// every search fails (gh missing/unauthenticated), which callers treat as non-fatal. Sequential
// execution: GitHub's code-search rate limit is 10 req/min authenticated.
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const arg = (name) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : null;
};
const configPath = arg('config') ?? 'agent/tools/code-watch.json';
const statePath = arg('state') ?? 'agent/data/code-watch.json';

let state = { watches: {}, last_run: null };
try { state = { ...state, ...JSON.parse(readFileSync(statePath, 'utf8')) }; } catch { /* first run */ }

const config = JSON.parse(readFileSync(configPath, 'utf8'));
const now = new Date().toISOString();
const out = [];
let failed = 0;

for (const { id, query, why } of config.watch) {
  const w = state.watches[id] ?? { seen: {}, runs: 0, first_run: null };
  let hits;
  try {
    const res = execFileSync('gh', ['api', '-X', 'GET', 'search/code',
      '-f', `q=${query}`, '-f', 'per_page=100'], { encoding: 'utf8', timeout: 60_000 });
    hits = JSON.parse(res).items ?? [];
  } catch (err) {
    failed += 1;
    out.push(`${id}: search failed — ${String(err.message || err).split('\n')[0]}`);
    continue;
  }
  const fingerprint = (h) => `${h.repository.full_name}::${h.path}`;
  const newHits = hits.filter((h) => !w.seen[fingerprint(h)]);
  w.runs += 1;
  w.last_run = now;
  w.last_total = hits.length;
  if (!w.first_run) w.first_run = now;
  if (newHits.length === 0) {
    out.push(`${id}: null — ${hits.length} hits, all previously seen (run #${w.runs})`);
  } else if (w.runs === 1) {
    out.push(`${id}: seeded ${newHits.length} baseline hit(s) (run #1)`);
  } else {
    out.push(`${id}: ${newHits.length} NEW hit(s) of ${hits.length} total (run #${w.runs}) — ${why}`);
  }
  for (const h of newHits) {
    if (w.runs > 1) out.push(`  ${h.repository.full_name} — ${h.path} — ${h.html_url}`);
    w.seen[fingerprint(h)] = { repo: h.repository.full_name, path: h.path, html_url: h.html_url, found: now };
  }
  state.watches[id] = w;
}

state.last_run = now;
mkdirSync(dirname(statePath), { recursive: true });
writeFileSync(statePath, `${JSON.stringify(state, null, 2)}\n`);

if (out.length) console.log(`code-watch (run @ ${now}):`);
for (const line of out) console.log(`  ${line}`);
if (failed === config.watch.length) {
  console.error('code-watch: every search failed');
  process.exit(1);
}
