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
 *
 * NVD allows 5 req/30s unauthenticated (set NVD_API_KEY for 50/30s); calls are paced accordingly.
 */
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const argOf = (flag, dflt = null) => {
  const i = args.indexOf(flag);
  return i === -1 ? dflt : args[i + 1];
};
const WATCH = args.includes('--watch');
const SEED = args.includes('--seed');
const MANIFEST = argOf('--manifest', 'agent/tools/nvd-provenance.json');
const STATE = argOf('--state', 'agent/data/nvd-provenance.json');
const API_KEY = process.env.NVD_API_KEY || '';
const PACE_MS = API_KEY ? 800 : 6500;
const ENDPOINT = 'https://services.nvd.nist.gov/rest/json/cves/2.0';

const sleep = ms => new Promise(r => setTimeout(r, ms));

/** One NVD call. Returns null on 404 (CVE id not in NVD — itself a finding worth printing). */
async function fetchCve(id) {
  const res = await fetch(`${ENDPOINT}?cveId=${encodeURIComponent(id)}`, {
    headers: API_KEY ? { apiKey: API_KEY } : {},
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`NVD ${res.status} for ${id}`);
  const body = await res.json();
  const cve = body.vulnerabilities?.[0]?.cve;
  if (!cve) return null;
  return cve;
}

/* ── Provenance extraction ──
   The whole point is the (source, type) pair: `type` is NVD's own Primary/Secondary flag — Primary
   means the metric was assigned by the CVE's CNA of record, Secondary means it came from anyone
   else. A CNA-assigned 10.0 and an NVD-analyzed 10.0 look identical on the detail page. */
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

const fmtMetric = m => `${m.version} ${m.type}/${m.source} ${m.baseScore}`;

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

/* ── entry ── */
const ids = argOf('--ids', '');
if (ids && !WATCH) {
  const list = ids.split(',').map(s => s.trim()).filter(Boolean);
  let first = true;
  for (const id of list) {
    if (!first) await sleep(PACE_MS);
    first = false;
    let cve;
    try { cve = await fetchCve(id); } catch (e) { console.log(`${id}: FETCH FAILED (${e.message})`); continue; }
    if (!cve) { console.log(`${id}: NOT IN NVD (no record)`); continue; }
    const p = provenance(cve);
    const nvdScored = p.metrics.filter(m => m.source === 'nvd@nist.gov').length;
    console.log(describe(id, p));
    console.log(`    published ${p.published} · lastModified ${p.lastModified} · analyzed(status)=${p.nvdAnalyzed} · NVD-scored metrics=${nvdScored}` +
      (p.cwe.length ? ` · ${p.cwe.join(',')}` : ''));
  }
  process.exit(0);
}

if (!WATCH) { console.log('nothing to do: pass --watch or --ids CVE-…'); process.exit(0); }

const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
const watch = manifest.watch || [];
const state = fs.existsSync(STATE) ? JSON.parse(fs.readFileSync(STATE, 'utf8')) : {};
const seeded = !!state.cves;

let changes = 0, firstHit = 0, errors = 0;
const next = {};
let first = true;
for (const w of watch) {
  const id = w.id;
  if (!first) await sleep(PACE_MS);
  first = false;
  let cve;
  try { cve = await fetchCve(id); } catch (e) {
    console.log(`  ⚠ ${id}: fetch failed (${e.message})`);
    errors++;
    next[id] = seeded ? state.cves[id] : null;   // keep the old snapshot; don't fake a change
    continue;
  }
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
    (firstHit ? ` (${firstHit} first hit)` : '') + (errors ? `, ${errors} fetch error(s)` : ''));
} else {
  console.log(`nvd-provenance: ${changes} CVE(s) moved`);
}
