#!/usr/bin/env node
/* Provenance census — how often is an NVD record's score NOT NVD's and NOT the CNA's?
 *
 * Why this exists (filed and built 2026-10-21 20:36; Research item: "does provenance case (5) hold
 * as a category?"). CLAUDE.md rule 6 names five score-provenance cases, the fifth being a score
 * written by a third-party *enrichment container* — CISA's ADP Vulnrichment (orgId
 * 134c704f-9b21-4f2e-91b3-4a467353bcc0) — which lands in the CVE record's ADP container and shows
 * up in NVD's API as a `Secondary` metric while the CNA publishes nothing and NVD sits at
 * `Awaiting Analysis`. That case was discovered from *three* records (Apache Tomcat, 10-21), and a
 * rule generalised from three records is a hypothesis, not a finding. This tool measures it.
 *
 * It pages NVD's CVE API over a publication window and classifies every record by who actually
 * scored it:
 *   nvd        — an `nvd@nist.gov` metric (NVD published its own score)
 *   cna        — every metric's source is the record's own CNA (`sourceIdentifier`)
 *   adp        — every metric comes from a known enrichment container (CISA-ADP by default),
 *                i.e. case (5): a number on the record that neither NVD nor the vendor wrote
 *   thirdparty — some other source (a distributor, an aggregator, a sibling CNA)
 *   none       — no CVSS metric of any version
 * A record can be several of these at once (NVD analyzing a CNA's score *endorses* it — the 10-16
 * lesson: `Analyzed` with zero NVD metrics is endorsement, not neglect), so the classes are
 * counted independently and `--json` prints each record's full metric fingerprint.
 *
 * Usage:
 *   node provenance-census.mjs                                  # yesterday (UTC), summary
 *   node provenance-census.mjs --from 2026-10-15 --to 2026-10-21
 *   node provenance-census.mjs --from 2026-10-19 --examples 5   # show IDs per class
 *   node provenance-census.mjs --from 2026-10-19 --json          # full per-record fingerprint
 *
 * NVD allows 5 req/30s unauthenticated (set NVD_API_KEY for 50/30s); pages are paced accordingly.
 */
import fs from 'node:fs';

const args = process.argv.slice(2);
const argOf = (flag, dflt = null) => {
  const i = args.indexOf(flag);
  return i === -1 ? dflt : args[i + 1];
};
const API_KEY = process.env.NVD_API_KEY || '';
const PACE_MS = API_KEY ? 800 : 6500;
const ENDPOINT = 'https://services.nvd.nist.gov/rest/json/cves/2.0';

/* Enrichment containers: a CVE record's ADP container, mirrored into NVD's metrics as Secondary.
 * CISA-ADP is the one calibrated first-hand (2026-10-21, Apache Tomcat trio). Others are added as
 * they are observed — the tool prints every non-CNA, non-NVD source it sees so a new container
 * announces itself instead of being silently bucketed as "thirdparty". */
const ADP_CONTAINERS = JSON.parse(argOf('--adp', 'null') || 'null') || {
  '134c704f-9b21-4f2e-91b3-4a467353bcc0': 'CISA-ADP Vulnrichment',
};
const NVD = 'nvd@nist.gov';

const sleep = ms => new Promise(r => setTimeout(r, ms));
const isoDay = d => d.toISOString().slice(0, 10);
const dayStart = s => (s.includes('T') ? s : `${s}T00:00:00.000`);
const dayEnd = s => (s.includes('T') ? s : `${s}T23:59:59.999`);

const now = new Date();
const to = argOf('--to', isoDay(new Date(now.getTime() - 864e5)));
const from = argOf('--from', to);
const EXAMPLES = Number(argOf('--examples', 3));
const JSONOUT = args.includes('--json');
const MAX_PAGES = Number(argOf('--pages', 50));

async function page(startIndex) {
  const url = `${ENDPOINT}?pubStartDate=${encodeURIComponent(dayStart(from))}` +
    `&pubEndDate=${encodeURIComponent(dayEnd(to))}` +
    `&resultsPerPage=2000&startIndex=${startIndex}`;
  let lastErr = null;
  for (let attempt = 1; attempt <= 4; attempt++) {
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), 120_000);  // NVD can hold a wide-window connection open;
    try {                                                   // a hung fetch is what stalled a 7-day run
      const res = await fetch(url, { headers: API_KEY ? { apiKey: API_KEY } : {}, signal: ctl.signal });
      const text = await res.text();                        // body read inside the try: an abort mid-body
      if (res.ok) return JSON.parse(text);                  // must become a retry, not an unhandled rejection
      if (res.status === 404) return { totalResults: 0, vulnerabilities: [] };
      lastErr = new Error(`NVD ${res.status}`);
    } catch (e) {
      lastErr = e;                                          // "terminated"/hang-up/timeout: retry, don't crash
    } finally {
      clearTimeout(timer);
    }
    if (attempt < 4) await sleep(PACE_MS * attempt * 2);
  }
  throw new Error(`NVD kept failing (startIndex ${startIndex}): ${lastErr?.message || 'unknown'}`);
}

/** Classify one record by who wrote its numbers. Classes are not exclusive. */
function judge(cve) {
  const cna = (cve.sourceIdentifier || '').toLowerCase();
  const sources = new Map();   // source -> { type, versions:Set, best }
  let metricCount = 0;
  for (const key of Object.keys(cve.metrics || {})) {
    if (!key.startsWith('cvssMetric')) continue;
    for (const m of cve.metrics[key] || []) {
      metricCount++;
      const src = String(m.source || '').toLowerCase();
      const rec = sources.get(src) || { type: m.type, versions: new Set(), best: 0 };
      rec.versions.add(m.cvssData?.version || key.replace('cvssMetricV', '').replace('0', '.0'));
      rec.best = Math.max(rec.best, Number(m.cvssData?.baseScore ?? 0));
      sources.set(src, rec);
    }
  }
  const hasNvd = sources.has(NVD);
  const nonNvd = [...sources.keys()].filter(s => s !== NVD);
  const adpSources = nonNvd.filter(s => ADP_CONTAINERS[s]);
  const cnaSources = nonNvd.filter(s => cna && (s === cna || s.includes(cna) || cna.includes(s)));
  const otherSources = nonNvd.filter(s => !ADP_CONTAINERS[s] && !cnaSources.includes(s));

  const classes = [];
  if (metricCount === 0) classes.push('none');
  if (hasNvd) classes.push('nvd');
  if (adpSources.length && !hasNvd && !cnaSources.length && !otherSources.length) classes.push('adpOnly');
  if (cnaSources.length && !hasNvd && !adpSources.length && !otherSources.length) classes.push('cnaOnly');
  if (adpSources.length && (hasNvd || cnaSources.length)) classes.push('adpPlus');
  if (otherSources.length) classes.push('thirdparty');

  const best = Math.max(0, ...[...sources.values()].map(v => v.best));
  return {
    id: cve.id,
    status: cve.vulnStatus || '',
    cna: cve.sourceIdentifier || '',
    metricCount,
    hasNvd,
    best,
    classes,
    sources: [...sources.entries()].map(([s, v]) => ({ source: s, type: v.type, best: v.best, adp: ADP_CONTAINERS[s] || null })),
  };
}

const records = [];
let total = null;
for (let start = 0, p = 0; p < MAX_PAGES; p++) {
  const body = await page(start);
  total = body.totalResults ?? 0;
  const batch = body.vulnerabilities || [];
  for (const v of batch) if (v.cve) records.push(v.cve);
  start += batch.length;
  if (start >= total || batch.length === 0) break;
  await sleep(PACE_MS);
}

const judged = records.map(judge);
const counter = () => new Map();
const classes = counter();
for (const r of judged) for (const c of r.classes) classes.set(c, (classes.get(c) || 0) + 1);
const sourceFreq = counter();
for (const r of judged) for (const s of r.sources) sourceFreq.set(s.source, (sourceFreq.get(s.source) || 0) + 1);

const pct = n => (judged.length ? ((100 * n) / judged.length).toFixed(1) : '0.0');
const examplesOf = cls => judged.filter(r => r.classes.includes(cls)).slice(0, EXAMPLES).map(r => r.id);

if (JSONOUT) {
  console.log(JSON.stringify({ from, to, totalResults: total, fetched: judged.length, classes: Object.fromEntries(classes), sources: Object.fromEntries(sourceFreq), records: judged }, null, 2));
} else {
  console.log(`Provenance census — ${from} → ${to} (UTC publication window)`);
  console.log(`  NVD reports ${total} records; fetched ${judged.length}`);
  for (const cls of ['nvd', 'cnaOnly', 'adpOnly', 'adpPlus', 'thirdparty', 'none']) {
    const n = classes.get(cls) || 0;
    console.log(`  ${cls.padEnd(11)} ${String(n).padStart(5)}  ${pct(n).padStart(5)}%` +
      (EXAMPLES && n ? `   e.g. ${examplesOf(cls).join(', ')}` : ''));
  }
  const adpIds = Object.entries(ADP_CONTAINERS);
  const adpHits = judged.filter(r => r.sources.some(s => s.adp));
  console.log(`  enrichment containers seen: ${adpIds.map(([id, name]) => `${name} on ${adpHits.length} record(s)`).join('; ')}`);
  const odd = [...sourceFreq.entries()]
    .filter(([s]) => s !== NVD && !ADP_CONTAINERS[s])
    .sort((a, b) => b[1] - a[1]).slice(0, 12);
  console.log(`  top non-NVD, non-ADP metric sources: ${odd.map(([s, n]) => `${s}×${n}`).join(', ')}`);
}
