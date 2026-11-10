#!/usr/bin/env node
/* NVD score-provenance watch — per-CVE, not per-keyword.
 *
 * Why this exists (filed 10-14 12:20, Research: "Do the CNA-scored, NVD-unanalyzed 10.0s ever get
 * analyzed?"): CLAUDE.md's rule 6 tells the feed to record *who scored* a CVE, because
 * `CVSS 9.8 (CNA-assigned, NVD "Awaiting Analysis")` and `CVSS 9.8 (NVD Analyzed)` are different
 * statements about the same number. Nothing watched the second half of that sentence. The existing
 * disclosure-watch NVD channel is a *keyword* search — it finds new records, and would stay silent
 * while a record already in the feed flipped from "Received" to "Analyzed", or while NVD published
 * its own metric alongside the CNA's. Both are the events the feed's provenance claim lives on.
 *
 * So: pin `vulnStatus` + every published metric (source, Primary/Secondary, version, base score) +
 * CWE + KEV state per watched CVE, and report ONLY what moved. One NVD call per CVE per run.
 *
 * Usage:
 *   node nvd-provenance.mjs --watch                        # diff manifest vs state, changes only
 *   node nvd-provenance.mjs --ids CVE-1,CVE-2              # ad-hoc lookup, print full provenance
 *   node nvd-provenance.mjs --watch --seed                 # write the baseline silently
 *   node nvd-provenance.mjs --backfill-feeds [--days 7]    # append trailing-7d feed-cited CVEs
 *                                                          # missing from the manifest, then exit
 *                                                          # (combine with --watch to backfill first)
 *   node nvd-provenance.mjs --selftest                     # pure checks, no network
 *
 * NVD allows 5 req/30s unauthenticated (set NVD_API_KEY for 50/30s); calls are paced accordingly.
 *
 * BATCHED FETCH (added 2026-11-10 21:28): every mode above now pulls `cveId=CVE-1,CVE-2,…` in
 * chunks of 25 (the convention claim-unit-lint.mjs has used since 2026-10-26 — same pacing, one
 * retry per chunk), replacing the one-call-PER-id loop that made a 369-id watch ≈ 40 min
 * unauthenticated. The watch had quietly rotted under that cost: the manifest was last seeded by
 * hand on 11-08 and build.js's trailing-7d coverage check (installed 10-17/10-19 for exactly this
 * class) warned about 122 uncovered CVEs on 11-10. `--backfill-feeds` closes the loop — the manifest
 * seeds ITSELF from the same feeds the coverage check reads, so an act pass no longer has to
 * remember. Guards carried over from the lint's pull: a chunk that fails twice is a statement
 * about the REQUEST, never the registry — its ids keep their old snapshots instead of faking a
 * change, and the failed chunk is named in the summary.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const argOf = (flag, dflt = null) => {
  const i = args.indexOf(flag);
  return i === -1 ? dflt : args[i + 1];
};
const WATCH = args.includes('--watch');
const SEED = args.includes('--seed');
const SELFTEST = args.includes('--selftest');
const BACKFILL = args.includes('--backfill-feeds');
const BACKFILL_DAYS = Math.max(1, parseInt(argOf('--days', '7'), 10) || 7);
const MANIFEST = argOf('--manifest', 'agent/tools/nvd-provenance.json');
const STATE = argOf('--state', 'agent/data/nvd-provenance.json');
const API_KEY = process.env.NVD_API_KEY || '';
const PACE_MS = API_KEY ? 800 : 6500;
const ENDPOINT = 'https://services.nvd.nist.gov/rest/json/cves/2.0';
const CHUNK = 25;

const sleep = ms => new Promise(r => setTimeout(r, ms));

/* ── pure helpers (pinned by --selftest) ── */

/** Split an id list into fetch chunks, order-preserving, tail chunk short. */
export function splitChunks(ids, size = CHUNK) {
  const out = [];
  for (let i = 0; i < ids.length; i += size) out.push(ids.slice(i, i + size));
  return out;
}

/** The manifest's `seeded` line for a freshly fetched record — same shape the hand-written
 *  entries have used since 2026-10-14: `YYYY-MM-DD [Status] 3.1 Primary/src 9.8, CWE-79, published MM-DD`.
 *  `NVD-CWE-noinfo`/`NVD-CWE-Other` are the field's words for "nothing here" (the cwe-check lesson,
 *  2026-10-30) and never become a CWE part. */
export function seededLine(p, day) {
  const cwe = p.cwe.filter(c => c && !c.startsWith('NVD-CWE'));
  const rest = [p.metrics.length ? p.metrics.map(fmtMetric).join(', ') : 'no CVSS published'];
  if (cwe.length) rest.push(cwe.join('/'));
  rest.push(`published ${(p.published || '?').slice(0, 10).slice(5)}`);   // accept raw instant or provenance's sliced form
  return `${day} [${p.vulnStatus}] ${rest.join(', ')}`;   // bracket sits OUTSIDE the join — the 10-14 entries read "[Received] 3.1 Primary/…", no comma
}

/** The item title that cites `id`: the nearest `^## N. Title` heading at or above the first line
 *  mentioning it (a heading line can carry the id itself, as batch items do). */
export function citeWhy(text, id) {
  let title = null;
  for (const ln of text.split('\n')) {
    const h = ln.match(/^## \d+\. (.+)$/);
    if (h) title = h[1].trim();
    if (title && ln.includes(id)) return title.slice(0, 140);
  }
  return null;
}

/** Append {id, why, seeded} entries to a manifest's watch array, skipping ids it already has.
 *  Pure so the selftest can pin dedup without touching the file. */
export function mergeWatch(manifest, entries) {
  const watch = manifest.watch || [];
  const have = new Set(watch.map(w => w.id));
  const added = entries.filter(e => !have.has(e.id));
  return { watch: [...watch, ...added], added: added.length };
}

/** One chunked `cveId=A,B,…` request → Map id → cve. Throws after one retry so the caller can
 *  isolate the failed chunk. */
async function nvdChunk(chunk) {
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const res = await fetch(`${ENDPOINT}?cveId=${encodeURIComponent(chunk.join(','))}`, {
        headers: API_KEY ? { apiKey: API_KEY } : {},
      });
      if (!res.ok) throw new Error(`NVD ${res.status} for ${chunk.length} id(s)`);
      const body = await res.json();
      const out = new Map();
      for (const v of body.vulnerabilities || []) {
        const cve = v.cve;
        if (cve?.id) out.set(cve.id, cve);
      }
      return out;
    } catch (e) {
      if (attempt === 1) throw e;
      await sleep(PACE_MS);
    }
  }
}

/* ── Provenance extraction ──
   The whole point is the (source, type) pair — but read `source` FIRST and the type flag second.
   `type` carries exactly one bit: **Primary = NVD wrote it, Secondary = someone else did.** It does
   NOT distinguish the CNA from an enrichment container. Calibrated 2026-10-22 the hard way, across
   four records in one batch: PHP's own metric (security@php.net, the CNA of record) is Secondary,
   MITRE's on CVE-2026-113380 is Secondary (MITRE is the assigner), Eclipse's on CVE-2026-113620 is
   Secondary (Eclipse is the assigner), and CISA-ADP's Vulnrichment metric is Secondary too. The
   previous comment here said "Primary means the CNA of record" — wrong in both directions, since
   Adobe's psirt adobe metric is Primary on an unanalyzed record. Only `source` identifies the party;
   fmtMetric tags the known enrichment containers so an ADP score is never quoted as the CNA's. */
function provenance(cve) {
  const metrics = [];
  for (const key of Object.keys(cve.metrics || {})) {
    if (!key.startsWith('cvssMetric')) continue;   // ssvcV203 is CISA's decision data, not a score
    for (const m of cve.metrics[key]) {
      metrics.push({
        version: m.cvssData?.version || key.replace('cvssMetric', ''),
        type: m.type || '?',
        source: m.source || '?',
        baseScore: m.cvssData?.baseScore ?? null,
        severity: m.cvssData?.baseSeverity ?? null,
        vector: m.cvssData?.vectorString || null,
      });
    }
  }
  metrics.sort((a, b) => `${a.version}${a.type}${a.source}`.localeCompare(`${b.version}${b.type}${b.source}`));
  /* "Has NVD's own analysis landed?" — calibrated against a record known to be analyzed
     (CVE-2026-102489, status Analyzed): NVD's analyst metric carries source `nvd@nist.gov`.
     Primary/Secondary alone does NOT answer it — Adobe's psirt@adobe.com metric is Primary and
     the SAP cna@sap.com one is Secondary, yet neither record has been analyzed.
     2026-10-16 second calibration: the converse does NOT hold — CVE-2026-96951 reached
     vulnStatus Analyzed with NO nvd@nist.gov metric (Microsoft's Secondary 8.8 stayed the sole
     score: analysis-as-endorsement; first seen 10-14 on CVE-2026-104935, fact-check lesson 4,
     but never promoted into the CLAUDE.md rule until this event). So status is checked too; the
     metric count is reported separately as NVD-scored, a different question. */
  const analyzed = metrics.some(m => m.source === 'nvd@nist.gov') || cve.vulnStatus === 'Analyzed';
  return {
    vulnStatus: cve.vulnStatus || '?',
    published: (cve.published || '').slice(0, 10),
    lastModified: (cve.lastModified || '').slice(0, 16),
    metrics,
    cwe: (cve.weaknesses || []).flatMap(w => (w.description || []).map(d => d.value)).sort(),
    kev: cve.cisaExploitAdd || null,
    kevDue: cve.cisaActionDue || null,
    nvdAnalyzed: analyzed,
  };
}

/* Enrichment containers write into a record's ADP container and surface in NVD's metrics as
   Secondary — the same label the CNA's own metric carries. Tagging them here is what keeps an
   ADP score from being quoted as the assigner's. Extend as new containers are observed. */
const ADP_CONTAINERS = {
  '134c704f-9b21-4f2e-91b3-4a467353bcc0': 'CISA-ADP',
};
const fmtMetric = m => `${m.version} ${m.type}/${m.source} ${m.baseScore}` +
  (ADP_CONTAINERS[m.source] ? ` [${ADP_CONTAINERS[m.source]}]` : '');

function describe(id, p) {
  /* Two different questions, two different fields (named apart 2026-10-16): vulnStatus answers
     "did NVD analyze it"; the nvd@nist.gov metric count answers "did NVD publish its own score".
     The two empirically diverge — CVE-2026-96951 flipped to Analyzed with Microsoft's Secondary
     8.8 as the SOLE metric (analysis-as-endorsement, no NVD score) — so "NVD-analyzed" must never
     label the metric count. */
  const nvd = p.metrics.filter(m => m.source === 'nvd@nist.gov').length;
  return `${id} [${p.vulnStatus}] ${p.metrics.length} metric(s) (${nvd} NVD-scored) — ` +
    (p.metrics.length ? p.metrics.map(fmtMetric).join(', ') : 'no CVSS published') +
    (p.kev ? ` · KEV ${p.kev}` : '');
}

/** Field-level diff between two provenance snapshots. */
function diff(prev, next) {
  const out = [];
  if (prev.lastModified !== next.lastModified) out.push(`LASTMOD  ${prev.lastModified || '?'} → ${next.lastModified} (record touched — references/enrichment move without a metric change)`);
  if (prev.vulnStatus !== next.vulnStatus) out.push(`STATUS  ${prev.vulnStatus} → ${next.vulnStatus}`);
  const key = m => `${m.version}|${m.type}|${m.source}`;
  const prevMap = new Map(prev.metrics.map(m => [key(m), m]));
  const nextMap = new Map(next.metrics.map(m => [key(m), m]));
  for (const [k, m] of nextMap) {
    if (!prevMap.has(k)) out.push(`NEW METRIC  ${fmtMetric(m)} (${m.vector || ''})`);
    else if (prevMap.get(k).baseScore !== m.baseScore) out.push(`SCORE  ${k}: ${prevMap.get(k).baseScore} → ${m.baseScore}`);
  }
  for (const [k, m] of prevMap) if (!nextMap.has(k)) out.push(`REMOVED METRIC  ${fmtMetric(m)}`);
  const added = next.cwe.filter(c => !prev.cwe.includes(c));
  const gone = prev.cwe.filter(c => !next.cwe.includes(c));
  if (added.length) out.push(`CWE ADDED  ${added.join(', ')}`);
  if (gone.length) out.push(`CWE REMOVED  ${gone.join(', ')}`);
  if (!prev.kev && next.kev) out.push(`KEV ADDED  due ${next.kevDue}`);
  if (prev.kev && !next.kev) out.push(`KEV REMOVED  (was due ${prev.kevDue})`);
  return out;
}

/* ── selftest (pure, no network — runs after all definitions, before any fetch) ── */
if (SELFTEST) {
  let n = 0, fail = 0;
  const t = (name, cond) => { n++; if (!cond) { fail++; console.log(`FAIL ${name}`); } };
  const ids = Array.from({ length: 60 }, (_, i) => `CVE-2026-${String(10000 + i)}`);
  const cs = splitChunks(ids, 25);
  t('chunks: 60 ids → [25,25,10]', cs.length === 3 && cs[0].length === 25 && cs[2].length === 10);
  t('chunks: order preserved', cs.flat().every((id, i) => id === ids[i]));
  t('chunks: empty list → no chunks', splitChunks([], 25).length === 0);
  t('chunks: short list stays one chunk', splitChunks(ids.slice(0, 3), 25).length === 1);
  const p = { vulnStatus: 'Received', published: '2026-11-09T18:17:25.207', metrics: [{ version: '3.1', type: 'Primary', source: 'cna@x.com', baseScore: 9.8, severity: 'CRITICAL', vector: null }], cwe: ['CWE-79'], kev: null, kevDue: null, nvdAnalyzed: false, lastModified: '' };
  t('seededLine: matches the 10-14 hand-entry shape', seededLine(p, '2026-11-10') === '2026-11-10 [Received] 3.1 Primary/cna@x.com 9.8, CWE-79, published 11-09');
  t('seededLine: no metrics → "no CVSS published"', seededLine({ ...p, metrics: [] }, '2026-11-10') === '2026-11-10 [Received] no CVSS published, CWE-79, published 11-09');
  t('seededLine: NVD-CWE placeholders are not values', seededLine({ ...p, cwe: ['NVD-CWE-noinfo'] }, '2026-11-10').includes('CWE-79') === false);
  t('seededLine: multiple CWEs join with /', seededLine({ ...p, cwe: ['CWE-79', 'CWE-89'] }, '2026-11-10').includes('CWE-79/CWE-89') === true);
  const feed = ['---', '---', '', '## 7. FFmpeg batch — 121 records (CVE-2026-125250)', '', 'body text', '', '## 8. Next item', 'mentions CVE-2026-125368 here'].join('\n');
  t('citeWhy: nearest heading above the match', citeWhy(feed, 'CVE-2026-125368') === 'Next item');
  t('citeWhy: id inside the heading line itself', citeWhy(feed, 'CVE-2026-125250') === 'FFmpeg batch — 121 records (CVE-2026-125250)');
  t('citeWhy: unknown id → null', citeWhy(feed, 'CVE-2026-999999') === null);
  const man = { watch: [{ id: 'CVE-2026-1' }, { id: 'CVE-2026-2' }] };
  const m1 = mergeWatch(man, [{ id: 'CVE-2026-2' }, { id: 'CVE-2026-3' }]);
  t('mergeWatch: dedup by id, append new', m1.added === 1 && m1.watch.length === 3 && m1.watch[2].id === 'CVE-2026-3');
  t('mergeWatch: manifest without watch array', mergeWatch({}, [{ id: 'CVE-2026-1' }]).added === 1);
  console.log(fail ? `selftest: ${fail}/${n} FAILED` : `selftest: ${n} ok`);
  process.exit(fail ? 1 : 0);
}

/* ── entry ── */
const ids = argOf('--ids', '');
if (ids && !WATCH && !BACKFILL) {
  const list = ids.split(',').map(s => s.trim()).filter(Boolean);
  for (const [ci, chunk] of splitChunks(list).entries()) {
    if (ci) await sleep(PACE_MS);
    let batch;
    try { batch = await nvdChunk(chunk); }
    catch (e) { for (const id of chunk) console.log(`${id}: FETCH FAILED (${e.message})`); continue; }
    for (const id of chunk) {
      const cve = batch.get(id);
      if (!cve) { console.log(`${id}: NOT IN NVD (no record)`); continue; }
      const p = provenance(cve);
      const nvdScored = p.metrics.filter(m => m.source === 'nvd@nist.gov').length;
      console.log(describe(id, p));
      console.log(`    published ${p.published} · lastModified ${p.lastModified} · analyzed(status)=${p.nvdAnalyzed} · NVD-scored metrics=${nvdScored}` +
        (p.cwe.length ? ` · ${p.cwe.join(',')}` : ''));
    }
  }
  process.exit(0);
}

/* ── backfill (added 2026-11-10 21:28): the manifest seeds itself from the feeds ──
   build.js's coverage check reads the SAME window (trailing `--days` of the newest dated feed,
   full-id regex) — a run that ends with that check clean proves the backfill worked. `why` is the
   citing item's title (citeWhy), `seeded` is the record's state at seed time (seededLine); an id
   with no NVD record yet is seeded anyway — "no record at seed time" is exactly the perishable
   absence this watch exists to catch, and its FIRST HIT later is the event. */
if (BACKFILL) {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
  const feedDir = path.join(root, 'en', 'feed');
  const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
  const watched = new Set((manifest.watch || []).map(w => w.id));
  const dated = fs.readdirSync(feedDir).filter(f => /^\d{4}-\d{2}-\d{2}\.md$/.test(f)).sort();
  const newest = dated[dated.length - 1];
  if (!newest) { console.log('backfill: no dated feeds found'); process.exit(0); }
  const newestMs = Date.parse(newest.replace(/\.md$/, ''));
  const cutoffMs = newestMs - (BACKFILL_DAYS - 1) * 86400e3;
  const inWindow = dated.filter(f => {
    const ms = Date.parse(f.replace(/\.md$/, ''));
    return Number.isFinite(ms) && ms >= cutoffMs && ms <= newestMs;
  });
  const cited = new Map();   // id → { files: Set, why: string|null }
  for (const f of inWindow) {
    const text = fs.readFileSync(path.join(feedDir, f), 'utf8');
    for (const id of new Set(text.match(/\bCVE-\d{4}-\d{4,7}\b/g) || [])) {
      const e = cited.get(id) || { files: new Set(), why: null };
      e.files.add(f.replace(/\.md$/, ''));
      if (!e.why) e.why = citeWhy(text, id);
      cited.set(id, e);
    }
  }
  const missing = [...cited.keys()].filter(id => !watched.has(id));
  if (!missing.length) {
    console.log(`backfill: nothing to add — watch covers all ${cited.size} cited id(s) in ${inWindow[0]}..${newest} (${watched.size} watched)`);
  } else {
    const entries = [];
    let failed = 0;
    for (const [ci, chunk] of splitChunks(missing).entries()) {
      if (ci) await sleep(PACE_MS);
      let batch;
      try { batch = await nvdChunk(chunk); }
      catch (e) {
        failed += 1;
        console.log(`  ⚠ chunk ${ci} failed twice (${e.message}) — its ${chunk.length} id(s) are NOT seeded (a failed request is not an absence; re-run)`);
        continue;
      }
      for (const id of chunk) {
        const cve = batch.get(id);
        const day = new Date().toISOString().slice(0, 10);
        const whySrc = cited.get(id);
        const why = `${[...whySrc.files].join(',')} — ${whySrc.why || 'cited in feed'}`;
        entries.push({ id, why, seeded: cve ? seededLine(provenance(cve), day) : `${day} [no NVD record at seed time]` });
      }
    }
    const res = mergeWatch(manifest, entries);
    if (res.added) {
      manifest.watch = res.watch;
      fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 1) + '\n');
    }
    const noRec = entries.filter(e => e.seeded.includes('no NVD record')).map(e => e.id);
    console.log(`backfill: +${res.added} manifest entr${res.added === 1 ? 'y' : 'ies'} (${watched.size} → ${res.watch.length}) from ${inWindow[0]}..${newest}` +
      (noRec.length ? ` · ${noRec.length} seeded with no record yet (${noRec.join(', ')})` : '') +
      (failed ? ` · ${failed} failed chunk(s), ids not seeded — re-run` : ''));
  }
  if (!WATCH) process.exit(0);
}

if (!WATCH) { console.log('nothing to do: pass --watch, --ids CVE-…, or --backfill-feeds'); process.exit(0); }

const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
const watch = manifest.watch || [];
const state = fs.existsSync(STATE) ? JSON.parse(fs.readFileSync(STATE, 'utf8')) : {};
const seeded = !!state.cves;

let changes = 0, firstHit = 0, errors = 0;
const next = {};
const watchIds = watch.map(w => w.id);
const chunkOfId = new Map();
const chunks = splitChunks(watchIds);
chunks.forEach((chunk, ci) => { for (const id of chunk) chunkOfId.set(id, ci); });
const batches = new Map();   // chunk index → Map(id→cve); a FAILED chunk is absent
let first = true;
for (const [ci, chunk] of chunks.entries()) {
  if (!first) await sleep(PACE_MS);
  first = false;
  try { batches.set(ci, await nvdChunk(chunk)); }
  catch (e) {
    for (const id of chunk) console.log(`  ⚠ ${id}: fetch failed (${e.message})`);
  }
}
for (const w of watch) {
  const id = w.id;
  if (!batches.has(chunkOfId.get(id))) {
    errors++;
    next[id] = seeded ? state.cves[id] : null;   // keep the old snapshot; don't fake a change
    continue;
  }
  const cve = batches.get(chunkOfId.get(id)).get(id);
  if (!cve) {
    console.log(`  ⚠ ${id}: no NVD record (removed or never published?) — ${w.why || ''}`);
    next[id] = null;
    continue;
  }
  const p = provenance(cve);
  next[id] = p;
  const prev = seeded ? state.cves[id] : null;
  if (!prev && (SEED || !seeded)) { firstHit++; continue; }   // seeding: silent
  if (!prev) { console.log(`  ★ ${id}: FIRST HIT — ${describe(id, p)}`); firstHit++; continue; }
  const d = diff(prev, p);
  if (d.length) {
    changes++;
    console.log(`  ★ ${id}${w.why ? ` (${w.why})` : ''}`);
    d.forEach(line => console.log(`      ${line}`));
  }
}

fs.mkdirSync(path.dirname(STATE), { recursive: true });
fs.writeFileSync(STATE, JSON.stringify({ updated: new Date().toISOString(), cves: next }, null, 1));

if (!seeded) {
  console.log(`nvd-provenance: seeded ${watch.length} CVE(s) — ${watch.map(w => w.id).join(', ')}`);
} else if (!changes) {
  console.log(`nvd-provenance: ${watch.length} watched CVE(s), no provenance change` +
    (firstHit ? ` (${firstHit} first hit)` : '') +
    (errors ? `, ${errors} id(s) in ${batches.size ? 'failed chunk(s)' : 'chunk'} — old snapshots kept` : '') +
    ` · ${chunks.length} NVD call(s)`);
} else {
  console.log(`nvd-provenance: ${changes} CVE(s) moved · ${chunks.length} NVD call(s)`);
}
