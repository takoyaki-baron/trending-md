#!/usr/bin/env node
/* cv-audit.mjs — the `cv` review field on sources/domains.json (opened 2026-10-15 04:36).
 *
 * The registry carries a `cv` number per curated domain, and CLAUDE.md requires `cv >= 1` for any
 * new source ("confirm at least one of its facts against an independent source before adding it").
 * Nothing ever said what a *second* unit of `cv` means, or what would justify adding one — so the
 * field was write-once at curation time and 169 entries drifted above 1 with no record of why.
 *
 * The rule this tool enforces, and the reason it exists:
 *
 *   cv = the number of INDEPENDENT confirmations of a fact attributed to this domain.
 *        1 is the curation cross-check (required by CLAUDE.md). Each further confirmation
 *        appends a dated `cvlog` line and increments cv:  cv === 1 + cvlog.length.
 *
 *   "Independent" means the confirming party is not downstream of the same original report.
 *   In particular: TWO HOSTS CITED IN THE SAME FEED ITEM ARE NOT A CROSS-CHECK. Co-citation is a
 *   shared-origin signal — one press release, one vendor advisory, one wire story, one joint
 *   government document — and bumping cv off it would inflate exactly the field that exists to
 *   measure independent confirmation. The 10-15 batch is full of the trap: a curl CVE cited on
 *   curl.se + daniel.haxx.se + openwall.com is one origin (the curl project's own announcement);
 *   a joint CSI cited on ncsc.govt.nz + cyber.gc.ca is one origin (a co-sealed document).
 *
 * Modes:
 *   --clusters [--feed <path>] [--top N]   hosts co-cited per item, i.e. shared-origin candidates
 *                                          (a bump is NOT justified by this output alone)
 *   --check                                enforce cv === 1 + cvlog.length on every entry that has
 *                                          a cvlog; report pre-rule entries (cv > 1, no cvlog)
 *   --bump <host> --note "<YYYY-MM-DD — …>"  dry-run; add --write to apply
 *
 * Mirrors build.js's item split, URL regex and alias map (single source of truth, same as
 * uncurated-report.mjs). Best-effort: exits 0 even on error.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const REGISTRY = path.join(ROOT, 'sources', 'domains.json');

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

function loadRegistry() {
  const raw = fs.readFileSync(REGISTRY, 'utf8');
  return { data: JSON.parse(raw), raw };
}

/* JSON is written by build-adjacent tooling as JSON.stringify(data, null, 2) + '\n' with sorted
 * keys; keep that shape so a bump is a one-line diff instead of a whole-file rewrite. */
function writeRegistry(data) {
  const sorted = {};
  for (const k of Object.keys(data).sort()) sorted[k] = data[k];
  fs.writeFileSync(REGISTRY, JSON.stringify(sorted, null, 2) + '\n');
}

function itemsOf(file) {
  const body = fs.readFileSync(file, 'utf8');
  const out = [];
  for (const chunk of body.split(/\n(?=## \d+\. )/)) {
    const m = chunk.match(/^## (\d+)\. (.*)$/m);
    if (!m) continue;
    out.push({ n: m[1], title: m[2].trim(), body: chunk });
  }
  return out;
}

/* ── mode: --clusters ── */
function clusters(feedPath, top) {
  const aliases = loadAliases();
  const { data } = loadRegistry();
  const URL_RE = /https?:\/\/[^\s"'<>`)\]]+/g;
  const found = [];
  for (const it of itemsOf(feedPath)) {
    const hosts = new Map();
    for (const uRaw of it.body.match(URL_RE) || []) {
      const u = uRaw.replace(/[.,;:!?»*]+$/, '');
      const h = normalizeHost(u, aliases);
      if (!h || /\.(localhost|test|invalid|example)$/.test(h)) continue;
      if (!hosts.has(h)) hosts.set(h, u);
    }
    if (hosts.size < 2) continue;
    const highest = Math.max(...[...hosts.keys()].map(h => (data[h] && data[h].cv) || 0));
    found.push({ item: it, hosts, highest });
  }
  console.log(`cv-audit --clusters ${path.relative(ROOT, feedPath)}: ${found.length} item(s) cite ≥2 hosts\n`);
  console.log('Co-citation means SHARED ORIGIN, not mutual confirmation. A bump needs a named');
  console.log('independent check — cv-audit --bump <host> --note "<YYYY-MM-DD — what you checked>".\n');
  for (const f of found.slice(0, top)) {
    console.log(`  item ${f.item.n} — ${f.item.title.slice(0, 72)}`);
    for (const [h, u] of f.hosts) {
      const cv = data[h] ? (data[h].cv != null ? data[h].cv : '–') : 'UNCURATED';
      console.log(`    cv=${String(cv).padEnd(9)} ${h.padEnd(28)} ${u}`);
    }
  }
  if (found.length > top) console.log(`\n  +${found.length - top} more item(s) with ≥2 hosts (--top N)`);
}

/* ── mode: --check ── */
function check() {
  const { data } = loadRegistry();
  const bad = [];
  const legacy = [];
  let logged = 0;
  for (const [host, v] of Object.entries(data)) {
    if (host.startsWith('$')) continue;
    const log = Array.isArray(v.cvlog) ? v.cvlog : null;
    if (!log) {
      if (typeof v.cv === 'number' && v.cv > 1) legacy.push(`${host} (cv=${v.cv})`);
      continue;
    }
    logged++;
    if (v.cv !== 1 + log.length) bad.push(`${host}: cv=${v.cv} but cvlog has ${log.length} line(s) (expect ${1 + log.length})`);
    for (const line of log) {
      if (!/^\d{4}-\d{2}-\d{2} — /.test(line)) bad.push(`${host}: cvlog line is not dated "YYYY-MM-DD — …": ${line.slice(0, 80)}`);
    }
  }
  console.log(`cv-audit --check: ${Object.keys(data).filter(k => !k.startsWith('$')).length} entries, ${logged} carrying a cvlog`);
  if (bad.length) {
    console.log(`  ✗ ${bad.length} invariant failure(s):`);
    for (const b of bad) console.log(`      ${b}`);
  } else {
    console.log('  ✓ invariant holds on every entry that has a cvlog: cv === 1 + cvlog.length');
  }
  if (legacy.length) {
    console.log(`  · ${legacy.length} pre-rule entr(ies) with cv > 1 and no cvlog (legacy, not retro-fitted):`);
    console.log(`      ${legacy.slice(0, 12).join(', ')}${legacy.length > 12 ? ` … +${legacy.length - 12}` : ''}`);
  }
  process.exitCode = bad.length ? 1 : 0;
}

/* ── mode: --bump ── */
function bump(host, note, write) {
  const { data } = loadRegistry();
  if (!data[host]) {
    console.log(`cv-audit --bump: "${host}" is not in sources/domains.json — curate it first.`);
    process.exitCode = 1;
    return;
  }
  if (!/^\d{4}-\d{2}-\d{2} — /.test(note || '')) {
    console.log('cv-audit --bump: --note must open with "YYYY-MM-DD — " (the dated provenance the rest of the repo uses).');
    process.exitCode = 1;
    return;
  }
  if ((note || '').length < 40) {
    console.log('cv-audit --bump: --note is too short to name what was checked; say what you verified and against what.');
    process.exitCode = 1;
    return;
  }
  const log = Array.isArray(data[host].cvlog) ? data[host].cvlog.slice() : [];
  if (log.includes(note)) {
    console.log(`cv-audit --bump: "${host}" already carries that exact note — no-op.`);
    return;
  }
  log.push(note);
  const before = data[host].cv;
  data[host].cvlog = log;
  data[host].cv = 1 + log.length;
  console.log(`cv-audit --bump ${host}: cv ${before} → ${data[host].cv}${write ? '' : '  (dry-run — pass --write to apply)'}`);
  console.log(`  + ${note}`);
  if (!write) {
    console.log('\nReminder: co-citation is not a cross-check. The bump is only legitimate if the note');
    console.log('names a confirming party that is NOT downstream of the same original report.');
    return;
  }
  writeRegistry(data);
  console.log(`  wrote ${path.relative(ROOT, REGISTRY)}`);
}

function main() {
  const args = process.argv.slice(2);
  const get = (flag, dflt) => {
    const i = args.indexOf(flag);
    return i >= 0 ? args[i + 1] : dflt;
  };
  if (args.includes('--check')) return check();
  if (args.includes('--bump')) return bump(args[args.indexOf('--bump') + 1], get('--note', ''), args.includes('--write'));
  const feed = get('--feed', path.join(ROOT, 'en', 'feed', new Date().toISOString().slice(0, 10) + '.md'));
  return clusters(feed, Number(get('--top', 12)));
}

try {
  main();
} catch (e) {
  console.log(`cv-audit failed (non-fatal): ${e.message}`);
}
