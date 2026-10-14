#!/usr/bin/env node
/* Machine-readable vendor advisories — the unadvertised twin, and who actually owns a CVE ID.
 *
 * Why this exists (two seeds, one run, 2026-10-14 20:32):
 *
 * 1. CLAUDE.md rule 6 ("a JS-only vendor page has a machine-readable twin") was filed as a *rule*
 *    rather than a tool because its only calibrated endpoint was Microsoft's CVRF and "a wrong
 *    guess costs a 404". A second and third vendor now have calibrated endpoints (Red Hat CSAF v2,
 *    Cisco's publication service), so the rule graduates: the endpoint registry below is fetched,
 *    not remembered, and `--vendors` prints it with what a number from each artifact *means*.
 *
 * 2. The open Research item "Do vendor-document-only CVEs stay out of NVD, or is CVE-2026-92707 a
 *    lag rather than a gap?" turned out to be answerable *inside the vendor document*. Microsoft's
 *    CVRF carries a `Type="CNA"` note on every one of its 1,760 October entries, and for
 *    CVE-2026-92707 it says `GitHub_M` — the ID is not Microsoft's to publish. Cross-validated
 *    first-hand against the CVE Program's own registry (`assignerShortName` matches the CVRF's CNA
 *    on Linux / apache / GitHub_M / redhat / talos). So "not in NVD" was never the finding: the
 *    finding is *which* registry is pending, and the vendor document says so in a field that no
 *    aggregator carries. 343 of the 1,760 October entries are assigned by 17 non-Microsoft CNAs —
 *    a Patch Tuesday list is not a list of that vendor's CVEs.
 *
 * Hence two modes: parse a vendor document for CNA attribution, and check one CVE ID across the
 * registries that could publish it. The watch mode pins the second, because "published by no
 * registry" is a perishable absence exactly like "no CVSS" and "unpublished npm version".
 *
 * Usage:
 *   node vendor-advisory.mjs --vendors                       # the calibrated registry
 *   node vendor-advisory.mjs --cna <url|path>                # CVRF/CSAF CNA histogram
 *   node vendor-advisory.mjs --cve CVE-1,CVE-2 [--ghsa]      # registry presence per ID
 *   node vendor-advisory.mjs --watch                         # manifest presence watch, changes only
 *   node vendor-advisory.mjs --watch --seed                  # write the baseline silently
 *
 * NVD paces 5 req/30s unauthenticated (NVD_API_KEY → 50/30s). The GitHub advisory route is
 * rate-limited to 60/hr unauthenticated and this repo budgets ~5–10 api.github.com calls per run,
 * so GHSA is OPT-IN (--ghsa) and never part of the standing watch.
 */
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const argOf = (flag, dflt = null) => {
  const i = args.indexOf(flag);
  return i === -1 ? dflt : args[i + 1];
};
const VENDORS_MODE = args.includes('--vendors');
const WATCH = args.includes('--watch');
const SEED = args.includes('--seed');
const WITH_GHSA = args.includes('--ghsa');
const CNA_SRC = argOf('--cna', '');
const IDS = argOf('--cve', '');
const MANIFEST = argOf('--manifest', 'agent/tools/vendor-advisory.json');
const STATE = argOf('--state', 'agent/data/vendor-advisory.json');
const API_KEY = process.env.NVD_API_KEY || '';
const PACE_MS = API_KEY ? 800 : 6500;

const NVD = 'https://services.nvd.nist.gov/rest/json/cves/2.0';
const CVEAWG = 'https://cveawg.mitre.org/api/cve/';
const GHSA = 'https://api.github.com/advisories';
const KEV = 'https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json';
const MSRC = m => `https://api.msrc.microsoft.com/cvrf/v3.0/document/${m}`;

const sleep = ms => new Promise(r => setTimeout(r, ms));

/* ── The calibrated registry ──
   Every row was fetched first-hand on 2026-10-14. `means` is the load-bearing column: it is the
   sentence CLAUDE.md requires the feed to write ("name which artifact a number came from"), and
   two of these artifacts disagree about what their own totals count. */
const VENDORS = [
  {
    slug: 'msrc',
    vendor: 'Microsoft',
    artifact: 'https://api.msrc.microsoft.com/cvrf/v3.0/document/<YYYY-Mon>',
    format: 'CVRF 1.1 XML',
    calibrated: '2026-Oct → 39.9 MB, 1,760 <vuln:CVE> elements, a Type="CNA" note on every entry',
    means: 'inclusion in this month\'s release. The document\'s own note says "1413 Microsoft CVEs"; the document holds 1,760 IDs, 343 of them assigned by 17 other CNAs. "70 Critical" (a vendor label, one release) and "162 at CVSS ≥ 9.0" (whole document) are different measurements.',
    why: 'the Security Update Guide release-notes HTML page returns only its <title> to a plain fetch',
  },
  {
    slug: 'redhat',
    vendor: 'Red Hat',
    artifact: 'https://security.access.redhat.com/data/csaf/v2/advisories/changes.csv (+ advisories/<year>/<id>.json)',
    format: 'CSAF 2.0 JSON + a change feed',
    calibrated: '2026-10-14 → changes.csv 30,000 rows newest-first; rhsa-2026_81613.json parses (4 CVEs, aggregate_severity "Important")',
    means: 'one per-advisory record: tracking id, status, aggregate_severity, and the CVE list as Red Hat published it. Use changes.csv for "what shipped since last run" and the JSON for the advisory itself.',
    why: 'the /data/csaf/v2/advisories/<year>/ directory listing is an 8.6 MB JS single-page app — a plain fetch returns markup, not an index',
  },
  {
    slug: 'cisco',
    vendor: 'Cisco',
    artifact: 'https://sec.cloudapps.cisco.com/security/center/publicationService.x?i=1&y=<YYYY>&s=<n>',
    format: 'JSON (declares text/html)',
    calibrated: '2026-10-14 → 200 with an array of {identifier, title, version, firstPublished, lastPublished, url}',
    means: 'Cisco\'s advisory index for a year, with first/lastPublished so a revision is visible. Sent as text/html — a content-type check would reject it, so parse the body, not the header.',
    why: 'the human-facing advisory pages are per-ID and have no index',
  },
  {
    slug: 'mozilla',
    vendor: 'Mozilla',
    artifact: '(none located) — use the CNA record via cveawg.mitre.org',
    format: '—',
    calibrated: '2026-10-14 → probed www.mozilla.org/security/advisories/mfsa2026-106.json, /security/advisories.json, product-details/1.0/security_advisories.json: all 404/HTML',
    means: 'no machine-readable advisory twin was found at the guessed paths. The MFSA page is HTML (75 KB, carries the per-bug MFSA-2026-106 entries and the policy statement); for structured data, Mozilla is a CNA, so its own records are at cveawg.mitre.org/api/cve/<id>.',
    why: 'recorded as a negative so the next run does not re-probe the same three paths',
  },
  {
    slug: 'adobe',
    vendor: 'Adobe',
    artifact: '(none located) — helpx.adobe.com/security/security-bulletin.html is HTML',
    format: '—',
    calibrated: '2026-10-14 → security-bulletin.json 404; the HTML bulletin 200/24.8 KB',
    means: 'no machine-readable twin located at the obvious path. APSB detail pages remain HTML-only as far as this run could establish — treat an Adobe count quoted from a page as an HTML-page count.',
    why: 'negative result, kept so the rule does not over-claim coverage',
  },
];

if (VENDORS_MODE) {
  console.log('Calibrated machine-readable advisory artifacts (fetched first-hand 2026-10-14):\n');
  for (const v of VENDORS) {
    console.log(`▸ ${v.slug} — ${v.vendor}   [${v.format}]`);
    console.log(`    artifact:  ${v.artifact}`);
    console.log(`    calibrated: ${v.calibrated}`);
    console.log(`    a number from it means: ${v.means}`);
    console.log(`    why the twin is needed: ${v.why}\n`);
  }
  console.log('Recurring formats behind these: CSAF, CVRF, OSV, GHSA. Registry presence for one ID');
  console.log('is a separate question — see --cve. The CVE Program\'s own registry (cveawg) names the');
  console.log('assigning CNA, which is what decides *which* vendor document is authoritative.');
  process.exit(0);
}

/* ── CNA attribution inside a vendor document ──
   CVRF's `Type="CNA"` note is the field aggregators never carry: it names the party that assigned
   the ID, which is not always the vendor publishing the document. Cross-validated 2026-10-14
   against cveawg's assignerShortName on five IDs across five different CNAs. */
function cnaStats(text) {
  const notes = [...text.matchAll(/<vuln:Note\s+Title="[^"]*"\s+Type="CNA"[^>]*>([^<]*)<\/vuln:Note>/g)];
  const hist = new Map();
  for (const m of notes) hist.set(m[1], (hist.get(m[1]) || 0) + 1);
  const idEls = [...text.matchAll(/<vuln:CVE>(CVE-\d{4}-\d+)<\/vuln:CVE>/g)].map(m => m[1]);
  const allIds = new Set([...text.matchAll(/CVE-\d{4}-\d{4,}/g)].map(m => m[0]));
  return {
    records: notes.length,
    hist: [...hist.entries()].sort((a, b) => b[1] - a[1]),
    cveElements: idEls.length,
    distinctIds: allIds.size,
  };
}

/** The CNA note attached to one CVE, or null. Scans the enclosing <vuln:Vulnerability> block. */
function cnaFor(text, id) {
  const blocks = text.split('<vuln:Vulnerability').slice(1);
  for (const b of blocks) {
    const cve = b.match(/<vuln:CVE>(CVE-\d{4}-\d+)<\/vuln:CVE>/);
    if (!cve || cve[1] !== id) continue;
    const note = b.match(/Type="CNA"[^>]*>([^<]*)<\/vuln:Note>/);
    const title = b.match(/<vuln:Title>([^<]*)<\/vuln:Title>/);
    return { cna: note ? note[1] : null, title: title ? title[1] : null };
  }
  return null;
}

async function loadDoc(src) {
  if (/^https?:\/\//.test(src)) {
    const res = await fetch(src);
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${src}`);
    return await res.text();
  }
  return fs.readFileSync(src, 'utf8');
}

if (CNA_SRC) {
  const text = await loadDoc(CNA_SRC);
  const s = cnaStats(text);
  if (!s.records) { console.log(`${CNA_SRC}: no CVRF CNA notes found (not a CVRF/CSAF document?)`); process.exit(1); }
  console.log(`${CNA_SRC}`);
  console.log(`  ${s.cveElements} <vuln:CVE> element(s) · ${s.distinctIds} distinct CVE id(s) mentioned · ${s.records} CNA note(s)\n`);
  const own = s.hist[0];
  const others = s.records - own[1];
  console.log(`  assigned by the publishing vendor (${own[0]}): ${own[1]}`);
  console.log(`  assigned by other CNAs: ${others} across ${s.hist.length - 1} organisations\n`);
  for (const [cna, n] of s.hist) console.log(`    ${String(n).padStart(5)}  ${cna}`);
  console.log('\n  A count of "the vendor\'s CVEs" in this document is a count of *inclusion in the release*,');
  console.log('  not of assignment. Quote the element count and the CNA split together, or not at all.');
  process.exit(0);
}

/* ── Registry presence ──
   "Is this ID in NVD?" is one question. "Has anyone published it?" is four. An ID's CNA is the
   party that owes the record, so the presence set plus the CNA answers "who is pending" — which is
   the difference between a lag and a gap. */
async function nvdPresence(id) {
  const res = await fetch(`${NVD}?cveId=${encodeURIComponent(id)}`,
    { headers: API_KEY ? { apiKey: API_KEY } : {} });
  if (res.status === 404) return { present: false };
  if (!res.ok) throw new Error(`NVD ${res.status}`);
  const cve = (await res.json()).vulnerabilities?.[0]?.cve;
  if (!cve) return { present: false };
  const sources = [];
  for (const k of Object.keys(cve.metrics || {})) {
    if (!k.startsWith('cvssMetric')) continue;
    for (const m of cve.metrics[k]) {
      sources.push(`${m.cvssData?.baseScore} ${m.type}/${m.source}`);
    }
  }
  return {
    present: true,
    status: cve.vulnStatus,
    published: cve.published,
    analyzedByNvd: sources.some(s => s.includes('nvd@nist.gov')),
    sources,
    kev: cve.cisaExploitAdd || null,
  };
}

async function cveawgPresence(id) {
  const res = await fetch(CVEAWG + encodeURIComponent(id));
  if (res.status === 404) return { present: false };
  if (!res.ok) throw new Error(`cveawg ${res.status}`);
  const m = (await res.json()).cveMetadata || {};
  return { present: true, cna: m.assignerShortName || null, state: m.state || null,
    reserved: m.dateReserved || null, published: m.datePublished || null };
}

async function ghsaPresence(id) {
  const res = await fetch(`${GHSA}?cve_id=${encodeURIComponent(id)}`, {
    headers: { accept: 'application/vnd.github+json', 'user-agent': 'trending-md-agent' },
  });
  if (!res.ok) throw new Error(`GHSA ${res.status}`);
  const arr = await res.json();
  return arr.length ? { present: true, ids: arr.map(a => a.ghsa_id) } : { present: false };
}

let kevIndex = null;
async function kevPresence(id) {
  if (!kevIndex) {
    const res = await fetch(KEV);
    if (!res.ok) throw new Error(`KEV ${res.status}`);
    kevIndex = new Set((await res.json()).vulnerabilities.map(v => v.cveID));
  }
  return { present: kevIndex.has(id) };
}

async function presence(id) {
  const out = { id };
  try { out.nvd = await nvdPresence(id); } catch (e) { out.nvd = { error: e.message }; }
  try { out.cveawg = await cveawgPresence(id); } catch (e) { out.cveawg = { error: e.message }; }
  try { out.kev = await kevPresence(id); } catch (e) { out.kev = { error: e.message }; }
  if (WITH_GHSA) {
    try { out.ghsa = await ghsaPresence(id); } catch (e) { out.ghsa = { error: e.message }; }
  }
  return out;
}

const pct = p => !p ? 'NVD absent (no record)' :
  `NVD ${p.status}${p.published ? ` (published ${p.published.slice(0, 10)})` : ''}` +
  `${p.sources.length ? ` — ${p.sources.join(' · ')}` : ' — no metrics published'}` +
  `${p.analyzedByNvd ? ' [nvd@nist.gov]' : ''}`;
const pctAwg = p => !p ? 'CVE Program absent (no published CNA record)' :
  `CVE Program PUBLISHED — CNA ${p.cna}${p.reserved ? `, reserved ${p.reserved.slice(0, 10)}` : ''}` +
  `${p.published ? `, published ${p.published.slice(0, 10)}` : ''}`;

function report(p, cnaNote) {
  console.log(`${p.id}`);
  console.log(`    ${p.nvd?.error ? `NVD FETCH FAILED (${p.nvd.error})` : pct(p.nvd.present ? p.nvd : null)}`);
  console.log(`    ${p.cveawg?.error ? `cveawg FETCH FAILED (${p.cveawg.error})` : pctAwg(p.cveawg.present ? p.cveawg : null)}`);
  if (WITH_GHSA) console.log(`    GitHub advisory DB ${p.ghsa?.error ? `FETCH FAILED (${p.ghsa.error})` : (p.ghsa.present ? `has it — ${p.ghsa.ids.join(', ')}` : 'absent (no GHSA)')}`);
  console.log(`    CISA KEV ${p.kev?.error ? `FETCH FAILED (${p.kev.error})` : (p.kev.present ? 'LISTED' : 'not listed')}`);
  if (cnaNote) console.log(`    vendor document says CNA = ${cnaNote.cna}${cnaNote.title ? ` ("${cnaNote.title}")` : ''}`);
  const anyRegistry = p.nvd?.present || p.cveawg?.present || p.ghsa?.present;
  if (!anyRegistry) {
    console.log(`    → published by NO registry. ${cnaNote?.cna ? `The CNA of record is ${cnaNote.cna}, so that party is the one pending.` : 'The vendor document is currently the only record.'}`);
  }
}

if (IDS && !WATCH) {
  const plan = argOf('--cna-doc', '');
  const doc = plan ? await loadDoc(plan) : null;
  let first = true;
  for (const id of IDS.split(',').map(s => s.trim()).filter(Boolean)) {
    if (!first) await sleep(PACE_MS);
    first = false;
    const p = await presence(id);
    report(p, doc ? cnaFor(doc, id) : null);
  }
  process.exit(0);
}

if (!WATCH && !CNA_SRC && !VENDORS_MODE && !IDS) {
  console.log('nothing to do: pass --vendors, --cna <doc>, --cve <ids>, or --watch');
  process.exit(0);
}

/* ── Watch mode ──
   The perishable claim is absence: "no registry has published this ID." A record appearing at NVD
   or cveawg, an assigner/state change, or a KEV add is the event. Deliberately does NOT poll GHSA
   (60/hr unauthenticated — the repo budgets a handful of api.github.com calls per run). */
const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
const watch = manifest.watch || [];
const state = fs.existsSync(STATE) ? JSON.parse(fs.readFileSync(STATE, 'utf8')) : {};
const seeded = !!state.ids;

function snapshot(p, cna) {
  return {
    nvd: p.nvd?.present ? { status: p.nvd.status, metrics: p.nvd.sources, nvdAnalyzed: p.nvd.analyzedByNvd } : null,
    cveawg: p.cveawg?.present ? { cna: p.cveawg.cna, state: p.cveawg.state } : null,
    kev: !!p.kev?.present,
    cna,
  };
}

function diff(prev, next) {
  const out = [];
  if (!prev.nvd && next.nvd) out.push(`NVD RECORD APPEARED  ${next.nvd.status}` + (next.nvd.metrics.length ? ` — ${next.nvd.metrics.join(' · ')}` : ''));
  if (prev.nvd && !next.nvd) out.push('NVD RECORD GONE (was present)');
  if (prev.nvd && next.nvd) {
    if (prev.nvd.status !== next.nvd.status) out.push(`NVD STATUS  ${prev.nvd.status} → ${next.nvd.status}`);
    if (!prev.nvd.nvdAnalyzed && next.nvd.nvdAnalyzed) out.push('NVD ANALYZED  an nvd@nist.gov metric appeared');
    const a = prev.nvd.metrics.join(' | '), b = next.nvd.metrics.join(' | ');
    if (a !== b) out.push(`NVD METRICS  [${a || 'none'}] → [${b || 'none'}]`);
  }
  if (!prev.cveawg && next.cveawg) out.push(`CVE PROGRAM RECORD APPEARED  CNA ${next.cveawg.cna} (${next.cveawg.state})`);
  if (prev.cveawg && !next.cveawg) out.push('CVE PROGRAM RECORD GONE (was present)');
  if (prev.cveawg && next.cveawg) {
    if (prev.cveawg.cna !== next.cveawg.cna) out.push(`CNA CHANGED  ${prev.cveawg.cna} → ${next.cveawg.cna}`);
    if (prev.cveawg.state !== next.cveawg.state) out.push(`CVE PROGRAM STATE  ${prev.cveawg.state} → ${next.cveawg.state}`);
  }
  if (!prev.kev && next.kev) out.push('KEV ADDED');
  if (prev.kev && !next.kev) out.push('KEV REMOVED');
  return out;
}

let changes = 0, firstHit = 0, errors = 0;
const next = {};
let first = true;
for (const w of watch) {
  if (!first) await sleep(PACE_MS);
  first = false;
  let p;
  try { p = await presence(w.id); } catch (e) {
    console.log(`  ⚠ ${w.id}: fetch failed (${e.message})`);
    errors++;
    next[w.id] = seeded ? state.ids[w.id] : null;
    continue;
  }
  const snap = snapshot(p, w.cna || null);
  next[w.id] = snap;
  const prev = seeded ? state.ids[w.id] : null;
  if (!prev && (SEED || !seeded)) { firstHit++; continue; }
  if (!prev) { console.log(`  ★ ${w.id}: FIRST HIT — ${w.why || ''}`); firstHit++; continue; }
  const d = diff(prev, snap);
  if (d.length) {
    changes++;
    console.log(`  ★ ${w.id}${w.why ? ` (${w.why})` : ''}`);
    d.forEach(line => console.log(`      ${line}`));
  }
}

fs.mkdirSync(path.dirname(STATE), { recursive: true });
fs.writeFileSync(STATE, JSON.stringify({ updated: new Date().toISOString(), ids: next }, null, 1));

if (!seeded) {
  console.log(`vendor-advisory: seeded ${watch.length} id(s) — ${watch.map(w => w.id).join(', ')}`);
} else if (!changes) {
  console.log(`vendor-advisory: ${watch.length} watched id(s), no registry movement` +
    (firstHit ? ` (${firstHit} first hit)` : '') + (errors ? `, ${errors} fetch error(s)` : ''));
} else {
  console.log(`vendor-advisory: ${changes} id(s) moved`);
}
