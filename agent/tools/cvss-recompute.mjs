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
 *   cvss-recompute.mjs --from … --to … --stopping-point-census    # base vs threat, per assigner
 *   cvss-recompute.mjs --file en/feed/2026-10-27.md               # every CVE id in a feed file
 *   cvss-recompute.mjs --selftest
 *
 * Verdicts per metric: `exact` · `differs` (stored ≠ ANY number the vector yields) ·
 * `no-vector` (a score with no vector — unverifiable, not wrong) · `unparseable` ·
 * `v4-not-recomputed` (no oracle).
 *
 * ── STOPPING POINTS (2026-11-02 12:34) ─────────────────────────────────────────────────────────
 * A vector carrying a Threat metric (v3.x `E`/`RL`/`RC`, v4.0 `E`) has more than one honest
 * number: FIRST's v3.1 §7.2 is `TemporalScore = Roundup(BaseScore × E × RL × RC)` — ONE Roundup
 * over the flat product — and v4.0 folds `E` into the MacroVector lookup instead of multiplying.
 * Nothing in either schema says which one a `baseScore` field holds, and this tool used to compare
 * a stored number against the BASE alone, so a record honestly storing the threat score read as
 * `differs`. Both are now checked (`stoppingPoints()`), and only a number matching neither is a
 * finding. The census that sized the class:
 *   node agent/tools/cvss-recompute.mjs --from 2026-10-26 --to 2026-11-01 --stopping-point-census
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
/* Progress goes to stderr under `--json`: a census that prints a line before its object makes the
 * machine-readable mode unparseable, which is an output contract rather than a caller error
 * (recorded 2026-11-01 when `--remedy-census … --json | JSON.parse` died on exactly that). */
const note = (...a) => (JSONOUT ? console.error(...a) : console.log(...a));

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

// ── stopping points: every number one vector honestly yields ────────────────────────────────
/* FIRST, CVSS v3.1 §7.2 — `TemporalScore = Roundup(BaseScore × E × RL × RC)`, ONE Roundup over the
 * flat product. The weights are that page's table; `RL:W = 0.97` (Workaround) beside Official
 * Fix's 0.95 is the pair worth pinning in a test, because confusing them moves a score.
 * v4.0 does NOT multiply: its Threat metric `E` enters the MacroVector lookup, which is why the
 * oracle is asked twice below rather than asked once and scaled. */
export const TEMPORAL_W = {
  E: { X: 1, H: 1, F: 0.97, P: 0.94, U: 0.91 },
  RL: { X: 1, U: 1, W: 0.97, T: 0.96, O: 0.95 },
  RC: { X: 1, C: 1, R: 0.96, U: 0.92 },
};

function parseV4ish(vector) {
  const m = {};
  for (const part of String(vector ?? '').replace(/^CVSS:[^/]+\//, '').split('/')) {
    const [k, v] = part.split(':');
    if (k) m[k] = v;
  }
  return m;
}

/** The base of a v4.0 vector: the same string with the Threat metric removed, through the oracle. */
export function baseOfV4(vector) {
  if (!oracle) return null;
  const stripped = String(vector).replace(/\/E:[^/]+/, '');
  try { return Number(oracle(stripped)); } catch { return null; }
}

/**
 * Every defensible number for one vector, in increasing order of temporal application.
 * Returns `null` when the vector carries no Threat metric — the question does not arise, and a
 * `null` here is silence rather than a zero.
 *   v3.x — base, then base × each component applied so far (each with its own Roundup: "the score
 *          if only these were applied"), then the full temporal score.
 *   v4.0 — base (E stripped) and threat (E applied); there is no RL/RC in v4.0.
 */
export function stoppingPoints(vector) {
  const m = parseV4ish(vector);
  const v = /^CVSS:(3\.[01]|4\.0)\//.exec(String(vector ?? ''))?.[1];
  if (!v) return null;
  if (v === '4.0') {
    if (!m.E || m.E === 'X' || !oracle) return null;
    const base = baseOfV4(vector);
    const threat = Number(oracle(vector));
    if (!Number.isFinite(base) || !Number.isFinite(threat)) return null;
    return { version: '4.0', base, applied: ['E'], stops: [{ label: 'base', score: base, applied: [] }, { label: 'threat (E)', score: threat, applied: ['E'] }], full: threat };
  }
  const applied = ['E', 'RL', 'RC'].filter((k) => m[k] && m[k] !== 'X');
  if (!applied.length) return null;
  let base;
  try { base = scoreV3(vector, v); } catch { return null; }
  const stops = [{ label: 'base', score: base, applied: [] }];
  let product = base;
  for (const k of applied) {
    const w = TEMPORAL_W[k]?.[m[k]];
    if (w == null) return null; // an unknown metric value has no arithmetic — say nothing
    product *= w;
    stops.push({ label: `base×${stops.at(-1).applied.concat(k).join('×')}`, score: roundup31(product), applied: stops.at(-1).applied.concat(k) });
  }
  return { version: v, base, applied, stops, full: stops.at(-1).score };
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
 * is `no-vector`, never a zero — the 10-26 GHSA lesson ("{score: 0.0} is an empty slot, not a zero").
 *
 * A vector with a Threat metric has SEVERAL honest numbers, and a stored one matching any of them
 * is `exact` for that stopping point (`stopping` names which). Only a number matching **none** is
 * `differs` — the 2026-11-02 correction: before it, a record storing the threat score read as a
 * non-reproducing score, which is the same number written one Roundup earlier. */
export function judge({ vector, score }) {
  const r = recompute(vector);
  if (r.verdict === 'unparseable') return r;
  if (r.verdict === 'v4-not-recomputed') return { ...r, stored: score };
  const stored = Number(score);
  if (!Number.isFinite(stored)) return { verdict: 'no-vector', stored: score, computed: r.score, detail: 'stored score is absent — an unverifiable number, not a zero' };
  const version = r.version ?? '4.0';
  const sp = stoppingPoints(vector);
  const stops = sp ? sp.stops : [{ label: 'base', score: r.score, applied: [] }];
  const hit = stops.filter((s) => Math.abs(s.score - stored) < 0.05).at(-1);
  const base = stops[0].score;
  if (hit) {
    return {
      verdict: 'exact',
      stored,
      computed: hit.score,
      base,
      stopping: hit.label,
      version,
      /* `base` is the label the schema uses, so it is not worth a sentence; any OTHER stopping
         point is worth one, because the reader cannot see it in the record. */
      detail: hit.label === 'base'
        ? `v${version} reproduces ${stored}${sp ? ` at the base (temporal ${sp.full})` : ''}`
        : `v${version} ${stored} is the ${hit.label} score, not the base (${base}) — same vector, one Roundup later`,
    };
  }
  const deltas = stops.map((s) => Math.round((stored - s.score) * 10) / 10);
  const delta = deltas[0];
  return {
    verdict: 'differs',
    stored,
    computed: base,
    delta,
    version,
    detail: `stored ${stored} vs ${sp ? `base ${base} / temporal ${sp.full}` : `recomputed ${base}`} (Δ ${delta > 0 ? '+' : ''}${delta})`,
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

/* ── the stopping-point census (Research item filed 2026-11-02 12:32) ────────────────────────
 * Question: when a stored score does not equal its vector's base, is the difference always the
 * vector's own Threat term — i.e. a second honest stopping point rather than a wrong number?
 * Unit: one METRIC, because a record can carry four frameworks and each has its own arithmetic.
 * The control is built in: a vector whose `E` is `X` has base == threat by construction, so any
 * `stored-neither` row there is a genuine arithmetic defect rather than a stopping-point choice. */
async function stoppingCensus(rows, label, json = false) {
  const say = json ? () => {} : (...a) => console.log(...a);
  const E = (v) => parseV4ish(v)?.E ?? null;
  const classified = [];
  for (const r of rows) {
    if (!r.vector) continue;
    const sp = stoppingPoints(r.vector);
    const e = E(r.vector);
    const stored = Number(r.stored);
    if (!sp) {
      classified.push({ ...r, e, clazz: Number.isFinite(stored) ? 'no-threat-metric' : 'no-score' });
      continue;
    }
    const hit = sp.stops.filter((s) => Math.abs(s.score - stored) < 0.05).at(-1);
    classified.push({ ...r, e, base: sp.base, threat: sp.full, clazz: hit ? (hit.label === 'base' ? 'stored-base' : 'stored-threat') : 'stored-neither' });
  }
  const withQ = classified.filter((r) => r.clazz === 'stored-base' || r.clazz === 'stored-threat' || r.clazz === 'stored-neither');
  const pct = (a, b) => (b ? `${((a / b) * 100).toFixed(1)}%` : '—');
  say(`\nstopping-point census ${label}`);
  say(`  metrics read ${classified.length} · with a Threat metric ${withQ.length} (${pct(withQ.length, classified.length)}) · no Threat metric ${classified.filter((r) => r.clazz === 'no-threat-metric').length}`);
  const row = (k, f) => {
    const n = withQ.filter(f).length;
    say(`  ${String(k).padEnd(34)} ${String(n).padStart(5)} (${pct(n, withQ.length)})`);
  };
  say('\nwhere the stored number sits:');
  row('stored-base', (r) => r.clazz === 'stored-base');
  row('stored-threat', (r) => r.clazz === 'stored-threat');
  row('stored-neither  ← the defect class', (r) => r.clazz === 'stored-neither');
  say('\nby framework:');
  for (const v of [...new Set(withQ.map((r) => r.version))].sort()) {
    const s = withQ.filter((r) => r.version === v);
    const n = (c) => s.filter((r) => r.clazz === c).length;
    say(`  v${v.padEnd(5)} ${String(s.length).padStart(5)} metrics · base ${String(n('stored-base')).padStart(4)} · threat ${String(n('stored-threat')).padStart(4)} · neither ${String(n('stored-neither')).padStart(3)}`);
  }
  say('\nby assigner (CNA) and slot:');
  const per = new Map();
  for (const r of withQ) {
    const k = `${r.cna ?? '?'} · ${r.slot ?? '?'} / ${r.source ?? '?'}`;
    const cur = per.get(k) ?? { n: 0, base: 0, threat: 0, neither: 0, deltas: [] };
    cur.n += 1;
    if (r.clazz === 'stored-base') cur.base += 1; else if (r.clazz === 'stored-threat') cur.threat += 1; else cur.neither += 1;
    cur.deltas.push(Math.round((r.stored - r.base) * 10) / 10);
    per.set(k, cur);
  }
  for (const [k, c] of [...per.entries()].sort((a, b) => b[1].n - a[1].n)) {
    const ds = c.deltas.filter((d) => d !== 0);
    const span = ds.length ? `${Math.min(...ds)}…${Math.max(...ds)}` : '—';
    say(`  ${k.padEnd(52)} ${String(c.n).padStart(4)} · base ${String(c.base).padStart(3)} · threat ${String(c.threat).padStart(3)} · neither ${String(c.neither).padStart(2)} · Δ(stored−base) ${span}`);
  }
  const neither = withQ.filter((r) => r.clazz === 'stored-neither');
  if (neither.length) {
    say(`\nstored-neither: ${neither.length}`);
    for (const r of neither.slice(0, Number(argOf('--examples', 12)))) {
      say(`  ${r.id} v${r.version} ${r.slot}/${r.source}: stored ${r.stored}, base ${r.base}, threat ${r.threat}`);
      say(`     ${r.vector}`);
    }
  }
  /* The control, stated as a number rather than a promise: with `E:X` the base IS the temporal
     score, so `stored-neither` there cannot be a stopping-point choice. */
  const control = withQ.filter((r) => r.e === 'X' || r.e === null);
  say(`\ncontrol (E absent or X): ${control.length} metrics · neither ${control.filter((r) => r.clazz === 'stored-neither').length} — a non-zero row here is arithmetic, not a stopping point`);

  /* ── the CNA join ────────────────────────────────────────────────────────────────────────────
   * NVD-only classification cannot answer the question the item asks ("does NVD differ from the
   * CNA's own number on the SAME framework"), because a base-only vector is indistinguishable from
   * one whose temporal components were REMOVED. So for the CVEs that carry a Threat metric on NVD,
   * read the container the number came from (cveawg, unmetered) and classify its number against the
   * SAME framework's arithmetic. Bounded by `--with-cna <n>`; a cap is printed, never hidden. */
  const CNA_CAP = Number(argOf('--with-cna', 0));
  if (CNA_CAP > 0) {
    const ids = [...new Set(withQ.map((r) => r.id))];
    const use = ids.slice(0, CNA_CAP);
    say(`\n── CNA join: ${use.length} of ${ids.length} record(s)${use.length < ids.length ? ' (capped by --with-cna)' : ''}`);
    const pairs = [];
    for (const id of use) {
      let j;
      try {
        const res = await fetch(`https://cveawg.mitre.org/api/cve/${id}`, { headers: { 'user-agent': 'trending-md-cvss-recompute/1.0' } });
        if (!res.ok) { pairs.push({ id, skip: `cveawg ${res.status}` }); continue; }
        j = await res.json();
      } catch (e) { pairs.push({ id, skip: `unreadable: ${e.message}` }); continue; }
      const cnaM = [];
      for (const m of j.containers?.cna?.metrics ?? []) {
        for (const [k, version] of [['cvssV4_0', '4.0'], ['cvssV3_1', '3.1'], ['cvssV3_0', '3.0']]) {
          const d = m[k];
          if (d) cnaM.push({ version, vector: d.vectorString, score: Number(d.baseScore), temporal: d.temporalScore ?? null });
        }
      }
      /* EVERY framework the container publishes, not only the one that carried a Threat metric on
         NVD. The reverse direction is the more surprising one: a v3.x vector whose `E` the container
         published and whose `E` NVD's copy does not carry — the stripping case, invisible to an
         NVD-only census because a stripped vector is simply a base-only vector. */
      for (const c of cnaM) {
        const r = rows.find((x) => x.id === id && x.version === c.version && x.vector);
        if (!r) { pairs.push({ id, version: c.version, skip: 'NVD copy carries no metric for this framework' }); continue; }
        if (!c.vector) { pairs.push({ id, version: c.version, skip: 'container states no vector for this framework' }); continue; }
        const sp = stoppingPoints(c.vector);
        const cHit = sp ? sp.stops.filter((s) => Math.abs(s.score - c.score) < 0.05).at(-1) : null;
        const nvdSp = stoppingPoints(r.vector);
        const nvdHit = nvdSp ? nvdSp.stops.filter((s) => Math.abs(s.score - r.stored) < 0.05).at(-1) : null;
        const cnaE = parseV4ish(c.vector)?.E ?? null;
        const nvdE = parseV4ish(r.vector)?.E ?? null;
        const nvdBase = nvdSp ? nvdSp.base : Number(recompute(r.vector).score);
        /* A vector with NO Threat metric has one honest number, so its stored score is `base`
           rather than `neither` — the bucket that means "matches no arithmetic at all". Calling a
           stripped vector `neither` was the first pass's own error and it would have put the whole
           normalisation class in the defect column. */
        const nvdStop = nvdHit
          ? (nvdHit.label === 'base' ? 'base' : nvdHit.label)
          : (!nvdSp && Math.abs(Number(r.stored) - nvdBase) < 0.05 ? 'base (no Threat metric)' : (Number.isFinite(Number(r.stored)) ? 'neither' : 'no score'));
        pairs.push({
          id, version: c.version, assigner: r.cna,
          cnaScore: c.score, cnaStop: cHit ? cHit.label : (Number.isFinite(c.score) ? 'neither' : 'no score'),
          cnaE, nvdE,
          nvdScore: r.stored,
          nvdStop,
          stripped: Boolean(cnaE && cnaE !== 'X' && (!nvdE || nvdE === 'X')),
          /* A stripped vector loses the temporal arithmetic entirely, so the case worth counting
             is "the vendor published E and NVD's copy cannot express it". */
          same: Number.isFinite(c.score) && Number.isFinite(Number(r.stored)) && Math.abs(c.score - Number(r.stored)) < 0.05,
          nvdBase,
        });
      }
      await sleep(120);
    }
    const ok = pairs.filter((p) => !p.skip);
    const tally = (f) => { const m = new Map(); for (const p of ok) m.set(f(p), (m.get(f(p)) ?? 0) + 1); return m; };
    say(`  read ${ok.length} record/framework pair(s); skipped ${pairs.length - ok.length} (${[...new Set(pairs.filter((p) => p.skip).map((p) => p.skip))].slice(0, 4).join('; ') || '—'})`);
    say('\n  the container\'s number:');
    for (const [k, v] of tally((p) => p.cnaStop)) say(`    ${String(k).padEnd(14)} ${String(v).padStart(4)}`);
    say('\n  NVD\'s number on the same framework:');
    for (const [k, v] of tally((p) => p.nvdStop)) say(`    ${String(k).padEnd(14)} ${String(v).padStart(4)}`);
    say('\n  did NVD KEEP the container\'s Threat metric on this framework?');
    for (const [k, v] of tally((p) => (p.stripped ? 'stripped (container had E, NVD has none)' : p.cnaE && p.cnaE !== 'X' ? 'kept' : 'container publishes no E'))) say(`    ${String(k).padEnd(42)} ${String(v).padStart(4)}`);
    say('\n  by framework · did the two artifacts disagree on the NUMBER, and did NVD keep the Threat metric?');
    for (const v of [...new Set(ok.map((p) => p.version))].sort()) {
      const s = ok.filter((p) => p.version === v);
      const diff = s.filter((p) => !p.same && p.cnaStop !== 'no score' && p.nvdStop !== 'no score');
      const span = diff.length ? `${Math.min(...diff.map((p) => Math.round((Number(p.nvdScore) - p.cnaScore) * 10) / 10))}…${Math.max(...diff.map((p) => Math.round((Number(p.nvdScore) - p.cnaScore) * 10) / 10))}` : '—';
      const stripped = s.filter((p) => p.stripped).length;
      say(`    v${v.padEnd(5)} ${String(s.length).padStart(4)} pairs · differ ${String(diff.length).padStart(3)} · Δ(nvd−cna) ${span.padEnd(10)} · Threat metric stripped by NVD ${String(stripped).padStart(3)}`);
    }
    const unexplained = ok.filter((p) => !p.same && (p.cnaStop === 'neither' || p.nvdStop === 'neither'));
    say(`\n  pairs that differ where EITHER side matches no stopping point: ${unexplained.length}${unexplained.length ? ' ← the class that is actually wrong' : ' — every disagreement is one vector, two stopping points'}`);
    if (args.includes('--cna-examples')) for (const p of ok.slice(0, 12)) say(`    ${p.id} v${p.version} cna ${p.cnaScore} (${p.cnaStop}) · nvd ${p.nvdScore} (${p.nvdStop})${p.stripped ? ' · STRIPPED' : ''}`);
  }
  return classified;
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
    if (missing.length) note(`no NVD record: ${missing.join(', ')}`);
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
    note(`window ${from} → ${to}: ${pages} NVD page(s)`);
  }

  if (JSONOUT) {
    /* `--json` is an output CONTRACT, so a census mode must answer in JSON here rather than print
       a progress line first — the 2026-11-01 lesson where a note on stdout made `--json | JSON.parse`
       die. Nothing above writes to stdout except the window line, which is printed before this. */
    if (args.includes('--stopping-point-census')) {
      const rowsJson = await stoppingCensus(rows, `${argOf('--from', '')} → ${argOf('--to', '')}`.trim(), true);
      console.log(JSON.stringify({ generated: new Date().toISOString(), oracle: oracleName, metrics: rowsJson }, null, 1));
      return;
    }
    console.log(JSON.stringify({ generated: new Date().toISOString(), oracle: oracleName, rows }, null, 1));
    return;
  }
  if (args.includes('--stopping-point-census')) {
    await stoppingCensus(rows, `${argOf('--from', '?')} → ${argOf('--to', '?')}`);
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

  /* ── stopping points (2026-11-02 12:34) ──────────────────────────────────────────────────────
   * The rule is "a stored number matching ANY stopping point is exact, and only one matching none
   * is `differs`". Both halves are pinned here, plus the one weight that is easy to misremember. */
  const T = (name, cond, extra = '') => { if (!cond) bad += 1; console.log(`${cond ? 'ok  ' : 'FAIL'} ${name}${extra ? ` → ${extra}` : ''}`); };
  T('RL:W is 0.97 (Workaround), not Official Fix\'s 0.95', TEMPORAL_W.RL.W === 0.97 && TEMPORAL_W.RL.O === 0.95);
  const v31 = 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H/E:P/RL:O/RC:R';
  const sp = stoppingPoints(v31);
  T('one vector, four honest numbers', sp && sp.stops.length === 4, sp && sp.stops.map((s) => `${s.label} ${s.score}`).join(' · '));
  T('base is not the temporal score', sp && sp.base === 9.8 && sp.full === 8.5, `base ${sp?.base} · full ${sp?.full}`);
  T('a stored THREAT score is exact, not a defect', judge({ vector: v31, score: 8.5 }).verdict === 'exact' && judge({ vector: v31, score: 8.5 }).stopping !== 'base');
  T('a stored BASE score is exact', judge({ vector: v31, score: 9.8 }).verdict === 'exact' && judge({ vector: v31, score: 9.8 }).stopping === 'base');
  T('a number matching NO stopping point still differs', judge({ vector: v31, score: 9.1 }).verdict === 'differs');
  T('a vector with no Threat metric has no stopping-point question', stoppingPoints('CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H') === null);
  if (oracle) {
    const v4 = 'CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H/SC:H/SI:H/SA:L/E:P';
    const s4 = stoppingPoints(v4);
    T('v4.0 folds E into the lookup rather than multiplying', s4 && s4.base === 10 && s4.full === 9.3, s4 && `base ${s4.base} · threat ${s4.full}`);
    T('v4.0: the base is exact and NAMED as the base', judge({ vector: v4, score: 10 }).stopping === 'base');
    T('v4.0: the threat is exact and NAMED as the threat', judge({ vector: v4, score: 9.3 }).stopping === 'threat (E)');
  } else {
    console.log('skip v4.0 stopping-point cases (no --oracle installed)');
  }
  console.log(bad ? `\n${bad} failure(s)` : '\nall selftests pass');
  if (bad) process.exit(1);
}

/* Only run as a program. `import` of this file must be side-effect free — the first version was
 * not, and importing `judge()` to sanity-check it ran a whole default census instead. */
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await main();
