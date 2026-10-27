#!/usr/bin/env node
/* CVSS recompute — does a stored score equal the arithmetic of its own vector?
 *
 * Why this exists (filed 2026-10-27 04:29, built the same night; Research item: "does any consumer
 * recompute a CVSS from its vector — or does every downstream just copy `score`?"). The 04:29 learn
 * pass found one advisory carrying two numbers for **one vector string**: `CVE-2026-115905` (the Rust
 * `zip` crate) has `CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H/SC:H/SI:H/SA:L/…` stored as
 * **10.0** by NVD (source `security-advisories@github.com`) while the GHSA page prints **9.9** for
 * the same string. That is a *stored* disagreement; it says nothing about which number the arithmetic
 * yields, and the learn pass wrote the wrong inference — "NVD propagated the score, not the
 * arithmetic" — because nothing in the toolchain recomputed anything. This tool recomputes.
 *
 * It is deliberately honest about what it can and cannot compute:
 *   v3.1 / v3.0 — **exact**, implemented here from the FIRST specification (base metric group).
 *   v4.0        — **not implemented natively.** v4.0 needs a 270-row MacroVector table plus a
 *                 severity-distance interpolation; a wrong table is worse than no table, and this
 *                 repo carries no dependencies. v4.0 metrics are therefore reported as
 *                 `v4-not-recomputed` unless `--oracle <path>` points at an installed implementation
 *                 (`cvss4` or `@pandatix/js-cvss`). Both were sampled on 2026-10-27 and agreed with
 *                 each other, with the spec's own examples (9.3 / 9.2) and on the MacroVector string
 *                 for the vectors tried — the second half of that agreement was first written down as
 *                 a disagreement, from memory, and measured away in the same run.
 *
 * The measurement this was built for — run it against a real publication window:
 *   node agent/tools/cvss-recompute.mjs --from 2026-10-20 --to 2026-10-26 --census
 *
 * Usage:
 *   cvss-recompute.mjs --ids CVE-2026-115905,CVE-2026-102649      # one NVD call for the list
 *   cvss-recompute.mjs --from 2026-10-20 --to 2026-10-26          # census over a pub window
 *   cvss-recompute.mjs --from … --to … --json                     # per-metric records
 *   cvss-recompute.mjs --oracle /tmp/cvsscheck/node_modules/cvss4  # exact v4.0 via third party
 *   cvss-recompute.mjs --file en/feed/2026-10-27.md               # every CVE id in a feed file
 *   cvss-recompute.mjs --selftest
 *
 * Verdicts per metric: `exact` · `differs` (stored ≠ recomputed, with the delta) ·
 * `no-vector` (a score with no vector — unverifiable, not wrong) · `unparseable` ·
 * `v4-not-recomputed` (no oracle) · `v4-oracle`.
 *
 * Exit code is 0 unless `--strict` and a `differs` was found.
 */
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';

const args = process.argv.slice(2);
const argOf = (flag, dflt = null) => {
  const i = args.indexOf(flag);
  return i === -1 ? dflt : args[i + 1];
};
const API_KEY = process.env.NVD_API_KEY || '';
const PACE_MS = API_KEY ? 800 : 6500;
const ENDPOINT = 'https://services.nvd.nist.gov/rest/json/cves/2.0';
const JSONOUT = args.includes('--json');
const STRICT = args.includes('--strict');
const CENSUS = args.includes('--census');
const ORACLE_PATH = argOf('--oracle', process.env.CVSS_ORACLE || null);
const sleep = ms => new Promise((r) => setTimeout(r, ms));

// ── CVSS v3.1 / v3.0 base score, from the FIRST specifications ───────────────────────────────
/* Weights are transcribed from the spec, not from an implementation. v3.0 and v3.1 share the base
 * metric weights and the 8.22 exploitability multiplier — the difference between the two versions
 * is the *rounding* rule (v3.1 made Roundup explicit and floating-point-safe) and the environmental
 * equations. This was calibrated, not assumed: the first draft gave v3.0 its own AV/AC weights and
 * a 20× multiplier (a v2-era recollection) and scored `AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H` at
 * **10.0** instead of 9.8 — the selftest below is what caught it. */
const W = {
  AV: { N: 0.85, A: 0.62, L: 0.55, P: 0.2 },
  AC: { L: 0.77, H: 0.44 },
  PR: { U: { N: 0.85, L: 0.62, H: 0.27 }, C: { N: 0.85, L: 0.68, H: 0.5 } },
  UI: { N: 0.85, R: 0.62 },
  CIA: { H: 0.56, L: 0.22, N: 0 },
};

/* FIRST's v3.1 Roundup: the smallest one-decimal number ≥ input. `Math.ceil(x*10)/10` is the
 * common shortcut and it is wrong in floating point — 4.000000000000001 must round to 4.0, not
 * 4.1 — so the reference integer trick is used directly. */
export function roundup31(input) {
  const int_input = Math.round(input * 100000);
  if (int_input % 10000 === 0) return int_input / 100000;
  return (Math.floor(int_input / 10000) + 1) / 10;
}
/* v3.0 and v3.1 base scores are therefore **the same function**: the versions diverge in the
 * environmental/temporal equations and in how Roundup is *stated*, not in the base arithmetic.
 * Measured the hard way — a round-half-up first draft scored v3.0's
 * `AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N` at 6.0 against the spec's 6.1 (raw 6.007). */

function parseV3(vector) {
  // "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H" — the prefix is optional in stored data
  const body = vector.replace(/^CVSS:[^/]+\//, '');
  const m = {};
  for (const part of body.split('/')) {
    const [k, v] = part.split(':');
    if (k) m[k] = v;
  }
  for (const req of ['AV', 'AC', 'PR', 'UI', 'S', 'C', 'I', 'A']) {
    if (m[req] === undefined) throw new Error(`missing ${req}`);
  }
  return m;
}

export function scoreV3(vector, version) {
  const w = W;
  const m = parseV3(vector);
  const changed = m.S === 'C';
  const iss = 1 - (1 - w.CIA[m.C]) * (1 - w.CIA[m.I]) * (1 - w.CIA[m.A]);
  const impact = changed ? 7.52 * (iss - 0.029) - 3.25 * Math.pow(iss - 0.02, 15) : 6.42 * iss;
  const exploitability =
    8.22 * w.AV[m.AV] * w.AC[m.AC] * w.PR[changed ? 'C' : 'U'][m.PR] * w.UI[m.UI];
  if (impact <= 0) return 0;
  const raw = changed ? Math.min(1.08 * (impact + exploitability), 10) : Math.min(impact + exploitability, 10);
  return roundup31(raw);
}

// ── optional v4.0 oracle ─────────────────────────────────────────────────────────────────────
/* v4.0 is delegated on purpose (see the header). Two implementations were sampled on 2026-10-27
 * and agreed on every score tried — 10.0 / 10.0 / 9.3 / 9.2 — and on the MacroVector strings, so a
 * single oracle is used rather than a vote; `--oracle` takes whichever is installed. */
let oracle = null;
let oracleName = null;
if (ORACLE_PATH) {
  const base = ORACLE_PATH.replace(/\/$/, '');
  const req = createRequire(import.meta.url);
  /* Entry points are tried in order because a package's `main` is not always loadable:
   * `cvss4` 1.0.7 declares `module`-style dist files with extensionless imports, so *both*
   * `require` and `import` of them fail; only its UMD bundle loads. Measured 2026-10-27. */
  const candidates = [
    ['dist/bundle.umd.js', (m) => (v) => m.calculateBaseScoreV4(v), 'cvss4 (bundle.umd.js)'],
    ['dist/cvss40.js', (m) => (v) => new (m.CVSS40)(v).Score(), 'pandatix/js-cvss (dist/cvss40.js)'],
  ];
  for (const [rel, wrap, name] of candidates) {
    try {
      const m = rel.endsWith('.umd.js') ? req(`${base}/${rel}`) : await import(`${base}/${rel}`);
      oracle = wrap(m);
      oracleName = name;
      break;
    } catch { /* next candidate */ }
  }
  if (!oracle) {
    console.error(`--oracle ${ORACLE_PATH}: no loadable v4.0 entry point (tried ${candidates.map((c) => c[0]).join(', ')})`);
    process.exit(2);
  }
}

// ── vector → recomputed score, by version label ─────────────────────────────────────────────
/* The version comes from the vector's own prefix AND from which NVD metric bucket it arrived in;
 * when the two disagree the vector wins, because the arithmetic is a property of the string. */
export function recompute(vector) {
  const m = /^CVSS:(3\.[01]|4\.0)\//.exec(vector || '');
  if (!m) return { verdict: 'unparseable', detail: 'no CVSS:3.x/4.0 prefix' };
  const version = m[1];
  if (version === '4.0') {
    if (!oracle) return { verdict: 'v4-not-recomputed', detail: 'v4.0 needs a MacroVector table — pass --oracle' };
    try {
      const s = Number(oracle(vector));
      return { verdict: 'v4-oracle', score: s, detail: `${oracleName} ${s}` };
    } catch (e) {
      return { verdict: 'unparseable', detail: `oracle: ${e.message}` };
    }
  }
  try {
    return { verdict: 'computed', score: scoreV3(vector, version), version, detail: `v${version}` };
  } catch (e) {
    return { verdict: 'unparseable', detail: e.message };
  }
}

/* Compare one stored metric to its vector's arithmetic. `NaN`-safe: a stored score of absent/null
 * is `no-vector`, never a zero — the 10-26 GHSA lesson ("{score: 0.0} is an empty slot, not a zero"). */
export function judge({ vector, score }) {
  const r = recompute(vector);
  if (r.verdict === 'unparseable') return r;
  if (r.verdict === 'v4-not-recomputed') return { ...r, stored: score };
  const stored = Number(score);
  if (!Number.isFinite(stored)) return { verdict: 'no-vector', stored: score, computed: r.score, detail: 'stored score is absent — an unverifiable number, not a zero' };
  const delta = Math.round((stored - r.score) * 10) / 10;
  return {
    verdict: delta === 0 ? 'exact' : 'differs',
    stored,
    computed: r.score,
    delta,
    version: r.version ?? '4.0',
    detail: delta === 0 ? `v${r.version ?? '4.0'} reproduces ${stored}` : `stored ${stored} vs recomputed ${r.score} (Δ ${delta > 0 ? '+' : ''}${delta})`,
  };
}

// ── NVD plumbing ────────────────────────────────────────────────────────────────────────────
async function nvd(params) {
  const url = `${ENDPOINT}?${new URLSearchParams(params)}`;
  let lastErr;
  for (let attempt = 1; attempt <= 4; attempt++) {
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), 120_000);
    try {
      const res = await fetch(url, { headers: API_KEY ? { apiKey: API_KEY } : {}, signal: ctl.signal });
      const text = await res.text();
      if (res.ok) return JSON.parse(text);
      if (res.status === 404) return { totalResults: 0, vulnerabilities: [] };
      lastErr = new Error(`NVD ${res.status}`);
    } catch (e) {
      lastErr = e;
    } finally {
      clearTimeout(timer);
    }
    await sleep(2000 * attempt);
  }
  throw lastErr;
}

const METRIC_BUCKETS = [
  ['cvssMetricV40', '4.0'],
  ['cvssMetricV31', '3.1'],
  ['cvssMetricV30', '3.0'],
];

/* Every metric on one record, newest framework first. A record can carry several metrics of the
 * same version (a CNA's and NVD's) — that is the `Primary`/`Secondary` slot distinction, and both
 * are checked, because "the record has a score that does not reproduce" is true if *any* does. */
function metricsOf(cve) {
  const out = [];
  for (const [bucket, version] of METRIC_BUCKETS) {
    for (const m of cve.metrics?.[bucket] ?? []) {
      out.push({
        version,
        type: m.type,
        source: m.source,
        vector: m.cvssData?.vectorString ?? null,
        score: m.cvssData?.baseScore,
        severity: m.cvssData?.baseSeverity ?? null,
      });
    }
  }
  return out;
}

function rowsFor(rec) {
  const cve = rec.cve;
  const rows = [];
  for (const m of metricsOf(cve)) {
    const j = m.vector ? judge({ vector: m.vector, score: m.score }) : { verdict: 'no-vector', stored: m.score, detail: 'metric carries no vectorString — unverifiable' };
    rows.push({
      id: cve.id,
      published: (cve.published || '').slice(0, 10),
      cna: cve.sourceIdentifier,
      version: m.version,
      slot: m.type,
      source: m.source,
      vector: m.vector,
      stored: m.score,
      severity: m.severity,
      ...j,
    });
  }
  return rows;
}

function summarise(rows) {
  const by = (keyFn) => {
    const m = new Map();
    for (const r of rows) {
      const k = keyFn(r);
      const cur = m.get(k) ?? { n: 0, exact: 0, differs: 0, unverifiable: 0, deltas: [] };
      cur.n += 1;
      if (r.verdict === 'exact') cur.exact += 1;
      else if (r.verdict === 'differs') { cur.differs += 1; cur.deltas.push(r.delta); }
      else cur.unverifiable += 1;
      m.set(k, cur);
    }
    return [...m.entries()].sort((a, b) => b[1].n - a[1].n);
  };
  const pct = (a, b) => (b ? `${((a / b) * 100).toFixed(1)}%` : '—');
  const line = ([k, v]) =>
    `  ${String(k).padEnd(34)} ${String(v.n).padStart(5)} metrics · exact ${String(v.exact).padStart(5)} (${pct(v.exact, v.n).padStart(6)}) · differs ${String(v.differs).padStart(4)} (${pct(v.differs, v.n).padStart(6)}) · unverifiable ${String(v.unverifiable).padStart(4)}`;

  console.log(`\nrecomputed ${rows.length} metrics`);
  console.log('\nby version:');
  for (const e of by((r) => `v${r.version}`)) console.log(line(e));
  console.log('\nby scorer (version · slot · source):');
  for (const e of by((r) => `${r.version} · ${r.slot} · ${r.source}`)) console.log(line(e));
  const differing = rows.filter((r) => r.verdict === 'differs');
  if (differing.length) {
    const over = differing.filter((r) => r.delta > 0).length;
    const deltas = differing.map((r) => r.delta).sort((a, b) => a - b);
    console.log(`\ndiffers: ${differing.length} (stored higher on ${over}, lower on ${differing.length - over});` +
      ` Δ range ${deltas[0]}…${deltas[deltas.length - 1]}`);
    for (const r of differing.slice(0, Number(argOf('--examples', 12)))) {
      console.log(`  ${r.id} v${r.version} ${r.slot}/${r.source}: ${r.detail} · ${r.severity ?? ''}`);
      console.log(`     ${r.vector}`);
    }
  }
  if (args.includes('--pairs')) console.log(pairBlock(rows));
  return differing;
}

/* The dual-column question ("is the v3.1-vs-v4.0 spread a CNA property or a universal one?") is
 * only answerable on records that carry *both* versions, and only if the pair belongs to one party.
 * A record can hold a CNA's 3.1 and the ADP's 4.0 — that is two assessments, not one scorer twice —
 * so pairs are accepted only when both metrics share a `source`, and the split is printed per source
 * so a single CNA cannot masquerade as the class. */
function pairBlock(rows) {
  const byId = new Map();
  for (const r of rows) {
    if (!byId.has(r.id)) byId.set(r.id, []);
    byId.get(r.id).push(r);
  }
  const pairs = [];
  for (const [id, rs] of byId) {
    const v31 = rs.filter((r) => r.version === '3.1');
    const v40 = rs.filter((r) => r.version === '4.0');
    for (const a of v31) {
      for (const b of v40) {
        if (a.source !== b.source) continue;
        if (!Number.isFinite(Number(a.stored)) || !Number.isFinite(Number(b.stored))) continue;
        pairs.push({ id, source: a.source, s31: Number(a.stored), s40: Number(b.stored) });
      }
    }
  }
  if (!pairs.length) return '\nsame-source 3.1/4.0 pairs: 0 — no scorer published both versions in this window';
  const out = [`\nsame-source 3.1/4.0 pairs: ${pairs.length}`];
  const per = new Map();
  for (const p of pairs) {
    const cur = per.get(p.source) ?? { n: 0, equal: 0, hi40: 0, hi31: 0, sum: 0, bands: 0 };
    cur.n += 1;
    const d = Math.round((p.s40 - p.s31) * 10) / 10;
    if (d === 0) cur.equal += 1;
    else if (d > 0) cur.hi40 += 1;
    else cur.hi31 += 1;
    cur.sum += d;
    const band = (s) => (s >= 9 ? 'C' : s >= 7 ? 'H' : s >= 4 ? 'M' : s > 0 ? 'L' : 'N');
    if (band(p.s31) !== band(p.s40)) cur.bands += 1;
    per.set(p.source, cur);
  }
  for (const [src, c] of [...per.entries()].sort((a, b) => b[1].n - a[1].n)) {
    out.push(`  ${src.padEnd(34)} ${String(c.n).padStart(4)} pairs · equal ${c.equal} · 4.0 higher ${c.hi40} · 3.1 higher ${c.hi31} · mean Δ ${(c.sum / c.n).toFixed(2)} · band crossing ${c.bands}`);
  }
  return out.join('\n');
}

async function main() {
  if (args.includes('--selftest')) return selftest();
  const rows = [];

  const ids = argOf('--ids');
  const file = argOf('--file');
  if (ids || file) {
    const list = ids
      ? ids.split(',').map((s) => s.trim()).filter(Boolean)
      : [...new Set(fs.readFileSync(file, 'utf8').match(/CVE-\d{4}-\d{3,7}/g) ?? [])].sort();
    if (!list.length) { console.error('no CVE ids found'); process.exit(2); }
    const j = await nvd({ cveId: list.join(','), resultsPerPage: '2000' });
    const got = new Set();
    for (const rec of j.vulnerabilities ?? []) { got.add(rec.cve.id); rows.push(...rowsFor(rec)); }
    const missing = list.filter((id) => !got.has(id));
    if (missing.length) console.log(`no NVD record: ${missing.join(', ')}`);
  } else {
    const isoDay = (d) => d.toISOString().slice(0, 10);
    const to = argOf('--to', isoDay(new Date()));
    const from = argOf('--from', to);
    const end = to.includes('T') ? to : `${to}T23:59:59.999`;
    const start = from.includes('T') ? from : `${from}T00:00:00.000`;
    let startIndex = 0;
    let pages = 0;
    for (;;) {
      const j = await nvd({
        pubStartDate: start, pubEndDate: end, resultsPerPage: '2000', startIndex: String(startIndex),
      });
      pages += 1;
      for (const rec of j.vulnerabilities ?? []) rows.push(...rowsFor(rec));
      startIndex += (j.vulnerabilities ?? []).length;
      if (!j.vulnerabilities?.length || startIndex >= (j.totalResults ?? 0)) break;
      if (pages >= Number(argOf('--pages', 20))) break;
      if (PACE_MS) await sleep(PACE_MS);
    }
    console.log(`window ${from} → ${to}: ${pages} NVD page(s)`);
  }

  if (JSONOUT) {
    console.log(JSON.stringify({ generated: new Date().toISOString(), oracle: oracleName, rows }, null, 1));
    return;
  }
  const differing = summarise(rows);
  if (CENSUS) {
    // one line per differing (id, version, vector, stored, computed) for the knowledge file
    console.log(`\n--census: ${differing.length} of ${rows.length} metrics do not reproduce from their own vector`);
  }
  if (STRICT && differing.length) process.exit(1);
}

function selftest() {
  const cases = [
    // v3.1 — spec examples and well-known CVEs
    ['CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H', 9.8],
    ['CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H', 10.0],
    ['CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N', 6.1],
    ['CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H', 7.8],
    ['CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:N/A:N', 0.0],
    // v3.0 — same vectors score differently on its own weights
    ['CVSS:3.0/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H', 9.8],
    ['CVSS:3.0/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N', 6.1],
    ['CVSS:3.0/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H', 10.0],
  ];
  let bad = 0;
  for (const [v, want] of cases) {
    const got = scoreV3(v, v.startsWith('CVSS:3.0') ? '3.0' : '3.1');
    const ok = got === want;
    if (!ok) bad += 1;
    console.log(`${ok ? 'ok  ' : 'FAIL'} ${v} → ${got} (want ${want})`);
  }
  // the Empty/zero rule: no impact ⇒ 0, whatever the exploitability
  if (scoreV3('CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:N', '3.1') !== 0) { bad += 1; console.log('FAIL zero-impact'); }
  console.log(bad ? `\n${bad} failure(s)` : '\nall selftests pass');
  if (bad) process.exit(1);
}

/* Only run as a program. `import` of this file must be side-effect free — the first version was
 * not, and importing `judge()` to sanity-check it ran a whole default census instead. */
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await main();
