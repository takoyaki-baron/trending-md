#!/usr/bin/env node
/**
 * osv-lag.mjs — how long a CVE takes to become *scanner-visible*, measured in the artifact a
 * scanner actually reads.
 *
 * THE CLAIM THIS REPLACES. On 2026-10-24 12:03 the feed repeated Aikido's line that advisory
 * databases "don't map the CVE to either PyPI package" for Brotli. Within a day it was false:
 * `GHSA-9v8h-qqgm-4m35` (published 2026-10-22T15:32Z) carries BOTH `PyPI/brotli` and
 * `PyPI/brotlicffi`, and two PYSEC records name them individually. "Scanners won't flag it yet" is a
 * claim that expires while you type it, and the fix is not to phrase it more carefully — it is to
 * measure it, with the definition written down.
 *
 * THE DEFINITION. For one CVE:
 *   record date   = NVD's `published` for the CVE record (a workflow timestamp — see
 *                   disclosure-lag.mjs — but it is the date every downstream aggregator keys on)
 *   visible date  = the EARLIEST `published` among the OSV records that (a) alias this CVE and
 *                   (b) carry at least one `affected[].package.ecosystem` entry
 *   lag           = visible − record, in days (positive = the package mapping appeared after the
 *                   record; negative = the package database was ahead of the CVE record)
 * "Scanner-visible" means "a scanner that queries `package@version` can match it" — which is exactly
 * what OSV's `/v1/query` answers, so it is checkable end-to-end rather than inferred.
 *
 * FOUR TRAPS, each measured on the Brotli record while writing this:
 *  1. AN ALIAS IS NOT A MAPPING. `GET /v1/vulns/CVE-2026-111497` returns a record whose `affected[]`
 *     is a single `GIT` range with no package, but whose `aliases[]` already lists
 *     `PYSEC-2026-4322/4323`. A tool that stops at the CVE's own record reports "mapped" on the
 *     strength of an identifier list; a scanner keyed on `PyPI/brotli@1.2.0` needs the PYSEC or GHSA
 *     record. The alias must be FOLLOWED and the target's `affected[]` read. (Same species as the
 *     `patched:` cell vs installable artifact in disclosure-lag.mjs.)
 *  2. `published` IS NOT `modified` AND NOT `github_reviewed_at`. GHSA's `github_reviewed_at` is when
 *     GitHub's own review finished (10-23T19:08Z on Brotli, a day and a half after its `published`);
 *     `modified` moves on every re-import. Only `published` is the mapping's date.
 *  3. PYSEC TIMESTAMPS ARE DAY-GRANULAR. `PYSEC-2026-4322` reads `2026-10-23T00:00:00Z` — midnight
 *     is the format, not the moment. A sub-day lag computed from a PYSEC record is fake precision, so
 *     each row carries its granularity and the census reports the coarse rows separately.
 *  4. `unmapped` IS PERISHABLE, like every other absence. It is the state of the databases *at the
 *     instant of the query*; re-run before quoting. A CVE with no GHSA/PYSEC/RUSTSEC record today can
 *     have one in an hour, and the reverse never happens (records are not retracted here).
 *
 * Usage:
 *   node osv-lag.mjs --ids CVE-…,CVE-…                 # per-CVE lag + ecosystem
 *   node osv-lag.mjs --ids … --census                  # per-ecosystem tally + median lag
 *   node osv-lag.mjs --pkg brotli --ecosystem PyPI --version 1.2.0 --cve CVE-2026-111497
 *                                                      # the scanner's own question: does THIS
 *                                                      # package@version resolve to THIS CVE
 *   node osv-lag.mjs --ids … --json
 *   node osv-lag.mjs --selftest
 *
 * Cost: api.osv.dev is unmetered for this volume; NVD is 5 req/30s unauthenticated (NVD_API_KEY →
 * 50/30s) and calls are paced, so a 25-CVE cohort takes ~3 minutes. Pass NVD_API_KEY when you have it.
 */

const args = process.argv.slice(2);
const argOf = (flag, dflt = null) => {
  const i = args.indexOf(flag);
  return i === -1 ? dflt : args[i + 1];
};
const IDS = (argOf('--ids', '') || '').split(',').map(s => s.trim()).filter(Boolean);
const PKG = argOf('--pkg', null);
const ECOSYSTEM = argOf('--ecosystem', 'PyPI');
const VERSION = argOf('--version', null);
const CVE = argOf('--cve', null);
const JSON_OUT = args.includes('--json');
const CENSUS = args.includes('--census');
const SELFTEST = args.includes('--selftest');

const UA = { 'User-Agent': 'trending.md learnt-agent (osv-lag)' };
const OSV = 'https://api.osv.dev/v1';
const NVD = 'https://services.nvd.nist.gov/rest/json/cves/2.0';
const NVD_API_KEY = process.env.NVD_API_KEY || '';
const NVD_PACE = NVD_API_KEY ? 800 : 6500;
const sleep = ms => new Promise(r => setTimeout(r, ms));

const DAY = 24 * 3600 * 1000;
/** Days between the record and the mapping, one decimal. `null` when either date is missing. */
function lagDays(recordDate, visibleDate) {
  if (!recordDate || !visibleDate) return null;
  const a = Date.parse(recordDate), b = Date.parse(visibleDate);
  if (!Number.isFinite(a) || !Number.isFinite(b)) return null;
  return +(((b - a) / DAY).toFixed(1));
}

/** Five states, and the boundary is a DAY, not "approximately": a mapping that lands the same day as
 *  the record is not a lag a reader can act on, while +1d is. */
function lagState(lag) {
  if (lag === null) return 'unknown';
  if (lag <= -1) return 'visible-before-record';
  if (lag < 1) return 'visible-with-record';
  return 'visible-after-record';
}

/** PYSEC / RUSTSEC / OSV-generated records truncate to midnight — a zero time-of-day is the format. */
function granularity(dateStr) {
  if (!dateStr) return null;
  return /T00:00:00(\.0+)?Z?$/.test(dateStr) ? 'day' : 'instant';
}

const ecosystemsOf = rec => [...new Set((rec.affected || [])
  .map(a => a.package?.ecosystem).filter(Boolean))];
const packagesOf = rec => [...new Set((rec.affected || [])
  .filter(a => a.package?.ecosystem)
  .map(a => `${a.package.ecosystem}/${a.package.name}`))];

/** The ecosystem-bearing records behind a CVE: the CVE's own record is only a pointer. */
function mappingRecords(cveRec, aliasRecs) {
  const out = [];
  if (cveRec && ecosystemsOf(cveRec).length) out.push(cveRec);   // rare, but real for PYSEC-sourced CVEs
  for (const r of aliasRecs) if (r && ecosystemsOf(r).length) out.push(r);
  return out;
}

/** Earliest `published` among the mapping records, plus which one supplied it. */
function earliestVisible(records) {
  const dated = records.filter(r => r.published).sort((a, b) => Date.parse(a.published) - Date.parse(b.published));
  if (!dated.length) return null;
  const r = dated[0];
  return { record: r, published: r.published, granularity: granularity(r.published) };
}

async function getJson(url, headers = {}) {
  const res = await fetch(url, { headers: { ...UA, ...headers } });
  if (res.status === 404) return { status: 404, body: null };
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
  return { status: 200, body: await res.json() };
}

/** An OSV lookup, including the case where the answer is in the ERROR.
 *
 *  `GET /v1/vulns/CVE-2026-18963` returns **404** with
 *  `{"code":5,"message":"Vulnerability not found, but the following aliases were: BIT-keycloak-2026-18963
 *  GHSA-4gv3-mc9p-5wqc"}` — so the CVE has no OSV record of its own, while the record that DOES carry
 *  `Maven/org.keycloak:keycloak-services` is named in the body of the refusal. Reading 404 as "nothing"
 *  (the first version of this tool did) silently converts a mapped CVE into an "unmapped" one, and the
 *  error is invisible because it looks like a legitimate absence. The pointer must be parsed. */
function aliasesFromNotFoundMessage(msg) {
  const tail = String(msg || '').split(/aliases were:?/)[1] || '';
  return tail.split(/[\s,]+/).map(s => s.trim()).filter(s => /^[A-Z][A-Z0-9]+-[A-Za-z0-9-]+$/.test(s));
}

async function osvRecord(id) {
  const res = await fetch(`${OSV}/vulns/${encodeURIComponent(id)}`, { headers: UA });
  if (res.status === 404) {
    const body = await res.json().catch(() => null);
    const msg = body?.message || '';
    return { notFound: true, aliases: aliasesFromNotFoundMessage(msg), message: msg || null };
  }
  if (!res.ok) throw new Error(`${OSV}/vulns/${id} → HTTP ${res.status}`);
  return res.json();
}

async function nvdPublished(id) {
  const { status, body } = await getJson(`${NVD}?cveId=${encodeURIComponent(id)}`,
    NVD_API_KEY ? { apiKey: NVD_API_KEY } : {});
  if (status === 404) return { published: null, status: 'no-record', refs: [] };
  const cve = body?.vulnerabilities?.[0]?.cve;
  if (!cve) return { published: null, status: 'no-record', refs: [] };
  return { published: cve.published || null, status: cve.vulnStatus || null,
    refs: (cve.references || []).map(r => r.url).filter(Boolean) };
}

/** GHSA ids named in the RECORD's references. The CVE's OSV record does not list them all: on
 *  CVE-2026-111497 the alias list is `BIT-*`, `PYSEC-2026-4322`, `PYSEC-2026-4323` while
 *  `GHSA-9v8h-qqgm-4m35` — the earliest record carrying BOTH PyPI packages, published the same
 *  afternoon — appears only in NVD's `references`. Following aliases alone therefore *overstates*
 *  the lag on exactly the case that started this tool, so the record's own references are a second
 *  route, and they cost nothing: the NVD response is already in hand for the date. */
function ghsasFromRefs(refs) {
  return [...new Set((refs || [])
    .map(u => (String(u).match(/GHSA-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}/i) || [])[0])
    .filter(Boolean))];
}

/** One CVE, end to end. Aliases are followed to a bounded depth because the graph is shallow
 *  (CVE ↔ GHSA ↔ PYSEC ↔ BIT-node) and a cycle is normal, not exceptional. */
async function probe(id) {
  const nvd = await nvdPublished(id);
  const cveRec = await osvRecord(id);
  const own = cveRec && !cveRec.notFound;
  /* Two routes to a package record, and neither is sufficient alone: the alias list (which can
     arrive inside a 404 body) and the GHSA ids in the record's references (which the alias list
     omits). Deduped and bounded. */
  const aliases = [...new Set([...(cveRec?.aliases || []), ...ghsasFromRefs(nvd.refs)])]
    .filter(a => !/^BIT-/.test(a));
  const followed = [];
  for (const a of aliases.slice(0, 6)) {
    const r = await osvRecord(a);
    if (r && !r.notFound) followed.push(r);
  }
  const maps = mappingRecords(own ? cveRec : null, followed);
  const first = earliestVisible(maps);
  const lag = first ? lagDays(nvd.published, first.published) : null;
  return {
    id,
    recordDate: nvd.published,
    recordStatus: nvd.status,
    osvRecord: own,
    aliases,
    mappings: maps.map(r => ({ id: r.id, published: r.published, modified: r.modified,
      ecosystems: ecosystemsOf(r), packages: packagesOf(r), granularity: granularity(r.published) })),
    visibleDate: first?.published || null,
    visibleVia: first?.record?.id || null,
    visibilityGranularity: first?.granularity || null,
    lagDays: lag,
    state: first ? lagState(lag) : 'unmapped',
  };
}

/** The scanner's question, asked the way a scanner asks it. */
async function pkgQuery({ name, ecosystem, version, cve }) {
  const body = { package: { name, ecosystem } };
  if (version) body.version = version;
  const res = await fetch(`${OSV}/query`, {
    method: 'POST', headers: { ...UA, 'Content-Type': 'application/json' }, body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`osv query → HTTP ${res.status}`);
  const json = await res.json();
  const vulns = (json.vulns || []).map(v => ({ id: v.id, published: v.published,
    aliases: [...(v.aliases || []), v.id] }));
  const hit = cve ? vulns.find(v => v.aliases.includes(cve)) : vulns[0] || null;
  return { query: `${ecosystem}/${name}${version ? `@${version}` : ''}`, total: vulns.length,
    vulns: vulns.slice(0, 8), cve, matched: !!hit, hit };
}

function census(rows) {
  const byEco = new Map();
  for (const r of rows) {
    const ecos = [...new Set(r.mappings.flatMap(m => m.ecosystems))];
    const keys = ecos.length ? ecos : ['(no package record)'];
    for (const eco of keys) {
      if (!byEco.has(eco)) byEco.set(eco, []);
      byEco.get(eco).push(r);
    }
  }
  const lines = [];
  lines.push(`scanner-visibility census — ${rows.length} record${rows.length === 1 ? '' : 's'}, ` +
    `lag = OSV package-record published − NVD record published`);
  for (const [eco, rs] of [...byEco.entries()].sort((a, b) => b[1].length - a[1].length)) {
    const lags = rs.map(r => r.lagDays).filter(v => v !== null).sort((a, b) => a - b);
    const states = rs.reduce((m, r) => (m[r.state] = (m[r.state] || 0) + 1, m), {});
    const med = lags.length ? lags[Math.floor(lags.length / 2)] : null;
    const coarse = rs.filter(r => r.visibilityGranularity === 'day').length;
    lines.push(`  ${eco.padEnd(12)} n=${String(rs.length).padStart(2)}  ` +
      Object.entries(states).map(([k, v]) => `${k}×${v}`).join(', ') +
      (med !== null ? `  median ${med > 0 ? '+' : ''}${med}d` : ''));
    if (coarse) lines.push(`  ${' '.repeat(12)} ${coarse}/${rs.length} rows are day-granular (PYSEC-style midnight timestamps) — no sub-day claim from those`);
  }
  return lines.join('\n');
}

/* ── selftest ── */
if (SELFTEST) {
  const cases = [];
  const eq = (name, got, want) => cases.push({ name, ok: JSON.stringify(got) === JSON.stringify(want), got, want });
  eq('same-day mapping', lagState(lagDays('2026-10-22T13:35:00Z', '2026-10-22T15:32:00Z')), 'visible-with-record');
  eq('one day late', lagState(lagDays('2026-10-22T13:35:00Z', '2026-10-23T13:35:00Z')), 'visible-after-record');
  eq('negative lag is the vendor being ahead', lagState(lagDays('2026-10-22T13:35:00Z', '2026-10-20T00:00:00Z')), 'visible-before-record');
  eq('just under a day is not a lag', lagState(0.9), 'visible-with-record');
  eq('missing dates are unknown, not zero', lagState(null), 'unknown');
  eq('PYSEC midnight is day-granular', granularity('2026-10-23T00:00:00Z'), 'day');
  eq('an ordinary instant is an instant', granularity('2026-10-22T15:32:49Z'), 'instant');
  eq('the CVE record alone has no ecosystem', ecosystemsOf({ affected: [{ ranges: [{ type: 'GIT' }] }] }), []);
  eq('an alias list is not a mapping', mappingRecords({ affected: [{ ranges: [{ type: 'GIT' }] }] }, [])
    .length, 0);
  eq('a followed PYSEC record is', mappingRecords(null, [{ affected: [{ package: { ecosystem: 'PyPI', name: 'brotli' } }] }])
    .map(r => packagesOf(r)[0]), ['PyPI/brotli']);
  const first = earliestVisible([
    { id: 'GHSA-x', published: '2026-10-22T15:32:00Z' },
    { id: 'PYSEC-y', published: '2026-10-23T00:00:00Z' },
  ]);
  eq('earliest mapping wins', first.record.id, 'GHSA-x');
  eq('earliest mapping carries its granularity', first.granularity, 'instant');
  eq('undated records cannot supply a date', earliestVisible([{ id: 'GHSA-z' }]), null);
  /* The calibration find: the pointer arrives inside a 404. */
  eq('a 404 body names the mapping that exists',
    aliasesFromNotFoundMessage('Vulnerability not found, but the following aliases were: BIT-keycloak-2026-18963 GHSA-4gv3-mc9p-5wqc'),
    ['BIT-keycloak-2026-18963', 'GHSA-4gv3-mc9p-5wqc']);
  eq('a bare not-found message yields no aliases',
    aliasesFromNotFoundMessage('Vulnerability not found'), []);
  eq('prose in the message is not an alias',
    aliasesFromNotFoundMessage('Vulnerability not found, but the following aliases were: none'), []);
  eq('a GHSA in the record references is a second route',
    ghsasFromRefs(['https://github.com/google/brotli/security/advisories/GHSA-9v8h-qqgm-4m35',
      'https://github.com/advisories/GHSA-9v8h-qqgm-4m35', 'https://example.com/x']),
    ['GHSA-9v8h-qqgm-4m35']);
  eq('references without a GHSA yield none', ghsasFromRefs(['https://nvd.nist.gov/x']), []);
  let pass = 0;
  for (const c of cases) {
    if (c.ok) pass++;
    console.log(`${c.ok ? '✓' : '✗'} ${c.name}${c.ok ? '' : `\n    got  ${JSON.stringify(c.got)}\n    want ${JSON.stringify(c.want)}`}`);
  }
  console.log(`\nselftest: ${pass}/${cases.length} matched`);
  process.exit(pass === cases.length ? 0 : 1);
}

/* ── entry ── */
if (!IDS.length && !PKG) {
  console.log('nothing to do: pass --ids CVE-…[,CVE-…] [--census] [--json] [--selftest]' +
    ', or --pkg <name> [--ecosystem PyPI] [--version x.y.z] [--cve CVE-…]');
  process.exit(0);
}

if (PKG) {
  const r = await pkgQuery({ name: PKG, ecosystem: ECOSYSTEM, version: VERSION, cve: CVE });
  if (JSON_OUT) { console.log(JSON.stringify(r, null, 1)); process.exit(0); }
  console.log(`osv query ${r.query} → ${r.total} record(s)${CVE ? `, ${CVE} ${r.matched ? 'RESOLVES' : 'DOES NOT RESOLVE'}` : ''}`);
  for (const v of r.vulns) {
    console.log(`  · ${v.id} published ${v.published || '(none)'}` +
      (v.aliases.some(a => /^CVE-/.test(a)) ? ` — ${v.aliases.filter(a => /^CVE-/.test(a)).join(', ')}` : ''));
  }
  if (CVE && !r.matched) {
    /* Two different absences, and conflating them is how a fixed version gets reported as a gap:
       zero records at a version means "not affected" as often as it means "not mapped". */
    if (r.total === 0) {
      console.log(`  · no records for ${r.query} — this version is not flagged (a FIXED version also reads 0; ` +
        `check an affected version before concluding a mapping gap)`);
    } else {
      console.log(`  · ${r.total} record(s) cover ${r.query} but none names ${CVE} — invisible to a package@version ` +
        `scanner query as of ${new Date().toISOString()} (perishable: re-run before quoting)`);
    }
  }
  process.exit(0);
}

const rows = [];
let first = true;
for (const id of IDS) {
  if (!first) await sleep(NVD_PACE);
  first = false;
  try {
    rows.push(await probe(id));
  } catch (e) {
    rows.push({ id, state: 'error', notes: [e.message] });
  }
}

if (JSON_OUT) {
  console.log(JSON.stringify({ checked: new Date().toISOString(), results: rows }, null, 1));
} else {
  for (const r of rows) {
    if (r.state === 'error') { console.log(`${r.id}  error  ${r.notes.join('; ')}`); continue; }
    const lag = r.lagDays === null ? '' : `  ${r.lagDays > 0 ? '+' : ''}${r.lagDays}d`;
    console.log(`${r.id}  ${r.state}${lag}`);
    console.log(`    record   ${r.recordDate ? r.recordDate.slice(0, 10) + ' (NVD, ' + (r.recordStatus || '?') + ')' : '(no NVD record)'}`);
    if (r.visibleDate) {
      console.log(`    visible  ${r.visibleDate} via ${r.visibleVia} (${r.visibilityGranularity} granularity)`);
    }
    if (r.mappings.length) {
      for (const m of r.mappings) console.log(`             · ${m.id} ${m.published} — ${m.packages.join(', ')}`);
    } else {
      console.log(`    mapping  none — ${r.osvRecord ? "the CVE's own OSV record carries no ecosystem entry" : 'the CVE has no OSV record of its own'}` +
        `, and ${r.aliases.length} alias(es) resolved to nothing package-shaped`);
    }
    console.log('');
  }
  console.log(census(rows));
}
