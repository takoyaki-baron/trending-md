#!/usr/bin/env node
/* Per-batch uncurated-domain nudge (opened 2026-09-16 20:46).
 *
 * The 09-16 04:57 act pass diagnosed why single-citation curation kept falling behind: build.js
 * prints an uncurated-domain WARNING each build, but only when an act pass happened to pick the
 * cleanup did anything run — a 35-domain backlog grew invisibly between 09-14 and 09-15. The learn
 * pass now pre-curates its own batch, but nothing in agent-run.sh SURFACES the list (with the
 * citing URLs) at run time — the agent only saw a count, and only if someone re-read build output.
 *
 * This tool re-scans en/feed/*.md the same way build.js's extractSources() does (same item split,
 * same URL regex, same host normalization + reserved-TLD skip), diffs against
 * sources/domains.json, and prints each uncurated domain WITH the feed file, item number and the
 * exact URLs citing it — so the next pass can fetch-and-curate without re-searching. The alias map
 * is extracted from build.js source at runtime (single source of truth — a tool-side copy would
 * drift and produce false nudges, the 09-03 `myapp.localhost**` artifact in reverse).
 *
 * Best-effort: exits 0 even on error; prints nothing when the directory is clean.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

/* ── single source of truth: pull SOURCE_ALIASES out of build.js source ── */
function loadAliases() {
  try {
    const src = fs.readFileSync(path.join(ROOT, 'build.js'), 'utf8');
    const start = src.indexOf('const SOURCE_ALIASES = {');
    if (start === -1) return {};
    const end = src.indexOf('};', start);
    const block = src.slice(src.indexOf('{', start) + 1, end);
    const map = {};
    for (const m of block.matchAll(/'([^']+)'\s*:\s*'([^']+)'/g)) map[m[1]] = m[2];
    return map;
  } catch (e) {
    return {};
  }
}

function normalizeHost(url, aliases) {
  try {
    const h = new URL(url).hostname.toLowerCase().replace(/^www\./, '').replace(/^m\./, '');
    return aliases[h] || h;
  } catch (e) {
    return null;
  }
}

function main() {
  const aliases = loadAliases();
  const dir = path.join(ROOT, 'en', 'feed');
  let curated;
  try {
    curated = JSON.parse(fs.readFileSync(path.join(ROOT, 'sources', 'domains.json'), 'utf8'));
  } catch (e) {
    curated = {};
  }
  const files = fs.readdirSync(dir).filter(f => /^\d{4}-\d{2}-\d{2}\.md$/.test(f)).sort();
  const URL_RE = /https?:\/\/[^\s"'<>`)\]]+/g;
  /* domain -> { count, cites: [{file, item, url}] } for uncurated domains only */
  const hits = {};

  for (const f of files) {
    const body = fs.readFileSync(path.join(dir, f), 'utf8');
    /* split before each item header, keeping it — `## N. Title` gives the item number */
    for (const chunk of body.split(/\n(?=## \d+\. )/)) {
      const m = chunk.match(/^## (\d+)\. /);
      if (!m) continue;
      const itemNo = m[1];
      for (const uRaw of chunk.match(URL_RE) || []) {
        const u = uRaw.replace(/[.,;:!?»*]+$/, '');
        const h = normalizeHost(u, aliases);
        if (!h || /\.(localhost|test|invalid|example)$/.test(h)) continue;
        if (curated[h]) continue;
        if (!hits[h]) hits[h] = { count: 0, cites: [] };
        hits[h].count++;
        const cite = { file: f, item: itemNo, url: u };
        if (!hits[h].cites.some(c => c.url === u && c.file === f)) hits[h].cites.push(cite);
      }
    }
  }

  const domains = Object.keys(hits).sort((a, b) => hits[b].count - hits[a].count);
  if (domains.length === 0) {
    console.log('uncurated-report: clean — every cited domain in en/feed is curated.');
    return;
  }
  console.log(`uncurated-report: ${domains.length} cited domain(s) missing from sources/domains.json — fetch each URL, confirm the attributed claim, cross-validate ≥1, then curate with cred/density/cv:`);
  for (const d of domains) {
    console.log(`\n  ${d} (${hits[d].count} citation${hits[d].count > 1 ? 's' : ''})`);
    for (const c of hits[d].cites.slice(0, 6)) {
      console.log(`    ${c.file} item ${c.item}: ${c.url}`);
    }
    if (hits[d].cites.length > 6) console.log(`    +${hits[d].cites.length - 6} more URLs`);
  }
}

try {
  main();
} catch (e) {
  console.log(`uncurated-report failed (non-fatal): ${e.message}`);
}
