#!/usr/bin/env node
/**
 * kev-record-watch.mjs — does a KEV addition ever precede its CVE record, for how long, and does any
 * row stay record-less?
 *
 * THE CLAIM THIS REPLACES. On 2026-10-31 04:19 the feed published that `CVE-2026-118527` was added
 * to CISA's Known Exploited Vulnerabilities catalog on **2026-10-30** while `cveawg` answered
 * `CVE_RECORD_DNE` and NVD had nothing — a KEV row whose own `notes` link an NVD detail URL that
 * resolves to nothing. Measured once, over the **79** entries added since **2026-09-01**: 78 are
 * `PUBLISHED` and exactly one is not, and the exception is the NEWEST row. One window cannot tell
 * "this row is late" apart from "KEV's publication and the CVE Program's publication are two
 * clocks", and the filing case has since been re-read a day later — **still no record**, catalog
 * version `2026.10.30`, so the answer is a lead time and not a one-off. This tool makes the second
 * observation cheap, because a MISSING → PUBLISHED transition is the only evidence that bounds it.
 *
 * THE DEFINITION. For one KEV row:
 *   added    = KEV's `dateAdded` — a DATE with no time (`2026-10-30`), so every lag here is
 *              DAY-GRANULAR. A sub-day number would be fake precision, the PYSEC trap from osv-lag.
 *   record   = `cveMetadata.datePublished` from cveawg, the CVE Program's own registry
 *   lag      = record − added, in days (negative = the record predates the KEV add, the normal case)
 * A row with no registry record is `unpublished`, and that word is chosen deliberately (guard 1).
 *
 * THREE GUARDS, each from a way the naive reading is wrong:
 *  1. A 404 FROM cveawg IS NOT "NO ASSIGNMENT". The id is RESERVED — the pool issued it, which is why
 *     KEV can cite it at all — and only the record is unpublished. Writing "CISA listed a CVE that
 *     does not exist" is a claim about the registry; the fact is that the registry has no PUBLISHED
 *     record yet. Two different sentences, and the second is the one that holds.
 *  2. `dueDate` IS NOT A CLOCK. It is the FCEB remediation deadline and it moves independently of
 *     every publication event (11-02 vs 11-13 on two rows added the same day). Only `dateAdded`
 *     measures the catalog's own timing.
 *  3. `unpublished` IS PERISHABLE, like every other absence. It is the state at the instant of the
 *     query; `--watch` keeps a history so a transition is a fact rather than two snapshots.
 *
 * WHAT THE CATALOG CANNOT TELL YOU. `catalogVersion` is a date, not a timestamp, and the whole
 * catalog is re-fetched in one request — so "added 2026-10-30" means "present in the 10-30 catalog",
 * which is CISA's batch date and not the hour the row appeared.
 *
 * Usage:
 *   node agent/tools/kev-record-watch.mjs                 # rows added in the last 30 days
 *   node agent/tools/kev-record-watch.mjs --since 2026-09-01
 *   node agent/tools/kev-record-watch.mjs --ids CVE-2026-118527
 *   node agent/tools/kev-record-watch.mjs --all           # every row in the window, not just laggards
 *   node agent/tools/kev-record-watch.mjs --watch         # record state into agent/data/kev-record-state.json
 *   node agent/tools/kev-record-watch.mjs --json
 *   node agent/tools/kev-record-watch.mjs --selftest
 *
 * Cost: the KEV catalog and cveawg are both UNMETERED. Zero `api.github.com` calls, zero NVD calls.
 * `--watch` writes one row per CVE and appends a history entry only when the state MOVES.
 */

import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const args = process.argv.slice(2);
const argOf = (flag, dflt = null) => {
  const i = args.indexOf(flag);
  return i === -1 ? dflt : args[i + 1];
};
const has = (f) => args.includes(f);

const STORE = argOf('--store', 'agent/data/kev-record-state.json');
const state = existsSync(STORE) ? JSON.parse(readFileSync(STORE, 'utf8')) : { updated: null, rows: {} };

/* ── pure functions (the selftest pins these without the network) ─────────────────────────── */

/** Day-granular lag. Both sides are reduced to `YYYY-MM-DD` FIRST — `dateAdded` carries no time, and
 * subtracting a midnight from a 15:47 publication manufactures a fraction of a day that the input
 * never had. A negative number is the normal case: the record usually predates the KEV add. */
function lagDays(added, publishedIso) {
  if (!added || !publishedIso) return null;
  const d = (s) => Date.parse(`${String(s).slice(0, 10)}T00:00:00Z`);
  const a = d(added);
  const p = d(publishedIso);
  if (!Number.isFinite(a) || !Number.isFinite(p)) return null;
  return Math.round((p - a) / 86_400_000);
}

/**
 * The five states a KEV row can be in, and the one word each may be published with.
 * `unpublished` deliberately does NOT say "unassigned" — see guard 1 in the header.
 *
 * TWO CLOCKS, and mixing them was this tool's first defect (caught by its own first live run, which
 * reported every row as `record-after-add` including a Fortinet record **239 days OLDER** than its
 * KEV add): a PUBLISHED row is judged by `lag` = record − add, while an UNPUBLISHED row has no
 * record to subtract and is judged by `daysSinceAdd`. Passing the wrong one makes the field look
 * like it means something it does not — the same class as reading a star delta as a total.
 */
function verdictOf(recState, lag, daysSinceAdd) {
  if (recState === 'PUBLISHED') return lag != null && lag > 0 ? 'record-after-add' : 'record-at-add';
  if (recState === 'REJECTED') return 'record-rejected';
  if (daysSinceAdd != null && daysSinceAdd >= 30) return 'record-pending-stale';
  return 'record-pending';
}

/** Which rows a run is about. `--ids` pins an id list (the standing-watch form); otherwise `--since`. */
function inWindow(row, since) {
  return !since || String(row.dateAdded) >= since;
}

/* ── network ───────────────────────────────────────────────────────────────────────────────── */

let requests = 0;

function kevCatalog() {
  const raw = execFileSync('curl', ['-s', '--max-time', '60',
    'https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json'],
    { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  requests += 1;
  return JSON.parse(raw);
}

/** cveawg is the CVE Program's own registry, unmetered, and it is the artifact KEV cites. A 404 is a
 *  RESERVED-but-unpublished id (guard 1), never `unassigned`. */
const REC_CACHE = new Map();
async function cveRecord(id) {
  if (REC_CACHE.has(id)) return REC_CACHE.get(id);
  const out = { state: 'unpublished', published: null, reserved: null, assigner: null, title: null };
  try {
    const r = await fetch(`https://cveawg.mitre.org/api/cve/${encodeURIComponent(id)}`, { signal: AbortSignal.timeout(20_000) });
    requests += 1;
    if (r.ok) {
      const j = await r.json();
      out.state = j.cveMetadata?.state ?? 'unpublished';
      out.published = j.cveMetadata?.datePublished ?? null;
      out.reserved = j.cveMetadata?.dateReserved ?? null;
      out.assigner = j.cveMetadata?.assignerShortName ?? null;
      out.title = j.containers?.cna?.title ?? null;
    }
  } catch { /* an unreadable registry is not a claim about the row */ }
  REC_CACHE.set(id, out);
  return out;
}

async function pool(items, limit, fn) {
  const out = new Array(items.length);
  let i = 0;
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (i < items.length) { const k = i++; out[k] = await fn(items[k], k); }
  }));
  return out;
}

/* ── the run ───────────────────────────────────────────────────────────────────────────────── */

const SELFTEST = has('--selftest');

if (SELFTEST) {
  const cases = [];
  const t = (name, got, want) => cases.push({ name, pass: JSON.stringify(got) === JSON.stringify(want), got, want });
  t('lag: the normal case is negative — the record predates the KEV add',
    lagDays('2026-10-30', '2026-08-14T19:04:11.123Z'), -77);
  t('lag: the filing case, if it published the next day', lagDays('2026-10-30', '2026-10-31T02:15:00.000Z'), 1);
  t('lag: DAY-GRANULAR — an evening publication on the same date is 0, not 0.6',
    lagDays('2026-10-30', '2026-10-30T23:47:00.000Z'), 0);
  t('lag: a missing side is null, never 0', [lagDays('2026-10-30', null), lagDays(null, '2026-10-30T00:00:00Z')], [null, null]);
  t('verdict: a published record that predates the add is the normal case',
    verdictOf('PUBLISHED', lagDays('2026-10-30', '2026-08-14T00:00:00Z'), 77), 'record-at-add');
  t('verdict: a record published AFTER the add is the new state',
    verdictOf('PUBLISHED', 3, 3), 'record-after-add');
  // the first live run's defect: every PUBLISHED row read `record-after-add` because the verdict was
  // handed `daysSinceAdd` instead of `lag`, and a 239-day-old record was reported as a laggard
  t('verdict: the two clocks are not interchangeable',
    verdictOf('PUBLISHED', -239, 52), 'record-at-add');
  t('verdict: no record yet is pending, and the word is not "unassigned"',
    verdictOf('unpublished', null, 1), 'record-pending');
  t('verdict: 30 days of silence is the finding, not another pending row',
    verdictOf('unpublished', null, 31), 'record-pending-stale');
  t('verdict: a rejected record is its own state',
    verdictOf('REJECTED', null, 4), 'record-rejected');
  const rows = [{ dateAdded: '2026-10-30' }, { dateAdded: '2026-09-15' }];
  t('window: --since is inclusive on the date string', rows.filter((r) => inWindow(r, '2026-10-30')).length, 1);
  t('window: no --since means everything', rows.filter((r) => inWindow(r, null)).length, 2);

  for (const c of cases) console.log(`  ${c.pass ? '✓' : '✗'} ${c.name}${c.pass ? '' : ` — got ${JSON.stringify(c.got)}, want ${JSON.stringify(c.want)}`}`);
  const ok = cases.filter((c) => c.pass).length;
  console.log(`selftest ${ok}/${cases.length}`);
  process.exit(ok === cases.length ? 0 : 1);
}

const SINCE = argOf('--since', null);
const IDS = (argOf('--ids', '') ?? '').split(',').map((s) => s.trim()).filter(Boolean);
const JSON_OUT = has('--json');
const SHOW_ALL = has('--all');
const WATCH = has('--watch');

const catalog = kevCatalog();
const catalogDate = catalog.catalogVersion ?? null;
const rows = catalog.vulnerabilities ?? [];

let picked = IDS.length ? rows.filter((r) => IDS.includes(r.cveID)) : rows.filter((r) => inWindow(r, SINCE));
if (!IDS.length && !SINCE) {
  // a rolling 30-day window, so a default run is the batch's own rows and not a 1,766-row crawl
  const cut = new Date(Date.now() - 30 * 86_400_000).toISOString().slice(0, 10);
  picked = rows.filter((r) => String(r.dateAdded) >= cut);
}
picked.sort((a, b) => String(b.dateAdded).localeCompare(String(a.dateAdded)));

const today = new Date().toISOString().slice(0, 10);
const obs = await pool(picked, 6, async (r) => {
  const rec = await cveRecord(r.cveID);
  const lag = lagDays(r.dateAdded, rec.published);
  const daysSinceAdd = lagDays(r.dateAdded, `${today}T00:00:00Z`);
  return {
    id: r.cveID, added: r.dateAdded, due: r.dueDate,
    record: rec.state, published: rec.published, reserved: rec.reserved, assigner: rec.assigner,
    lag, daysSinceAdd, verdict: verdictOf(rec.state, lag, daysSinceAdd),
    name: r.vulnerabilityName, vendor: r.vendorProject,
  };
});

const tally = obs.reduce((m, o) => { m[o.verdict] = (m[o.verdict] ?? 0) + 1; return m; }, {});
const publishedLags = obs.filter((o) => o.lag != null).map((o) => o.lag).sort((a, b) => a - b);
const median = publishedLags.length ? publishedLags[Math.floor(publishedLags.length / 2)] : null;

if (JSON_OUT) {
  console.log(JSON.stringify({ catalogVersion: catalogDate, today, window: SINCE ?? 'last 30 days', tally, medianLagDays: median, rows: obs, requests }, null, 1));
} else {
  console.log(`KEV catalog ${catalogDate} · ${rows.length} rows · window ${SINCE ?? 'last 30 days'} · ${picked.length} row(s) · ${requests} unmetered request(s)`);
  console.log(`verdicts: ${Object.entries(tally).map(([k, v]) => `${k} ${v}`).join(' · ') || '—'}`);
  console.log(`lag (record − KEV add, day-granular): ${publishedLags.length} published · median ${median}d · range ${publishedLags[0]}…${publishedLags[publishedLags.length - 1]}d`);
  const laggards = obs.filter((o) => o.verdict !== 'record-at-add');
  const show = SHOW_ALL ? obs : laggards;
  if (!show.length) console.log('  every row in this window had a published record at or before its KEV add');
  for (const o of show) {
    const when = o.published ? `record ${String(o.published).slice(0, 10)} (${o.lag > 0 ? '+' : ''}${o.lag}d)` : `no record after ${o.daysSinceAdd}d — id reserved${o.reserved ? ` ${String(o.reserved).slice(0, 10)}` : ''}, record unpublished`;
    console.log(`  ${o.id}  KEV ${o.added}  ${when}  [${o.vendor ?? '?'}]`);
  }
  /* Guard 1, printed where the number is: a 404 is a reserved id, not an absent one. */
  if (obs.some((o) => o.record === 'unpublished')) {
    console.log('  (an unpublished record means the id exists and the CVE Program has not published it — never "CISA listed a CVE that does not exist")');
  }
}

if (WATCH) {
  const now = new Date().toISOString();
  state.updated = now;
  let moved = 0;
  for (const o of obs) {
    const prev = state.rows[o.id];
    if (!prev) {
      state.rows[o.id] = { added: o.added, first_seen: now, state: o.record, published: o.published, history: [{ at: now, state: o.record, published: o.published }] };
      continue;
    }
    if (prev.state !== o.record) {
      prev.history.push({ at: now, state: o.record, published: o.published });
      // the only evidence that bounds a lag: MISSING → PUBLISHED, with the KEV add as the origin
      if (prev.state !== 'PUBLISHED' && o.record === 'PUBLISHED') {
        console.log(`  ↩ MOVED ${o.id}: ${prev.state} → PUBLISHED, ${o.lag}d after the KEV add (${o.added})`);
      } else {
        console.log(`  ↩ MOVED ${o.id}: ${prev.state} → ${o.record}`);
      }
      moved += 1;
    }
    prev.state = o.record;
    prev.published = o.published ?? prev.published;
  }
  // keep a row for a year, or for as long as it keeps moving
  const keep = new Date(Date.now() - 365 * 86_400_000).toISOString();
  for (const [id, r] of Object.entries(state.rows)) {
    if (!r.history?.length) delete state.rows[id];
  }
  writeFileSync(STORE, `${JSON.stringify(state, null, 1)}\n`);
  console.log(`  state → ${STORE} (${Object.keys(state.rows).length} row(s), ${moved} moved this run, kept since ${keep.slice(0, 10)})`);
}
