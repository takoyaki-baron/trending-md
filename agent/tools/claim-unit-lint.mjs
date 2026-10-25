#!/usr/bin/env node
/**
 * claim-unit-lint.mjs — the four claim units that keep being quoted as their own headline, checked
 * on a feed file BEFORE it ships, because writing the rule down did not work.
 *
 * THE FAILURE THIS REPLACES. Two rules were promoted into CLAUDE.md and into the knowledge
 * library on 2026-10-25, and BOTH recurred in the very next batch (10-26 04:03):
 *   - "`open_issues_count` is issues + PRs" — written after t3code's 3,286; recurred as Orca's
 *     "8,538 open issues" (really 4,379 issues + 4,159 PRs). A rule in prose does not fire at
 *     generation time; a check does.
 *   - "`Primary`/`Secondary` is a slot, not a provenance" — written after VulnCheck's Tomcat; the
 *     next batch read one CNA's two CVSS versions as two parties, and the one after that wrote
 *     "9.1 (CVSS 3.1)" where 9.1 was the v4.0 score and 3.1 said 7.4.
 * Both were caught by hand, after publication. This tool is the hand.
 *
 * FOUR CHECKS, each one a unit that has produced a wrong sentence here:
 *   A. ISSUE COUNTER (`--check issues`) — a number followed by "issues" in an item that never
 *      splits issues from PRs. Also verifies the arithmetic when a total AND parts are quoted:
 *      the composite is a cached counter, and it lagged its own parts on free-my-tv (77 vs 21+58).
 *      Prose-only, no network.
 *   B. CVSS VERSION (`--check cvss`) — every (score, version) pair in the item, compared against
 *      the NVD record for the CVEs the item names. Catches the three shapes seen: a score quoted
 *      against the WRONG version (9.1 is v4.0, not v3.1), a version that the record does not carry
 *      at all, and a score that appears nowhere. One NVD request per feed: the API accepts a
 *      comma-separated `cveId` list (measured 2026-10-26: seven IDs, one call, six records back —
 *      the seventh genuinely has no NVD record).
 *   C. REPO STATE (`--check repo`) — a star count quoted on a repo that is archived or has not been
 *      pushed in `--stale-days` (default 60), or where the API's own `stargazers_count` disagrees
 *      with the number in the text by more than `--star-tolerance` (default 10%). This is the
 *      Void lesson's cheapest half; `api.github.com` is metered, so the budget is `--max-repos`
 *      (default 8) and results are cached for 6h in `agent/data/claim-unit-cache.json`.
 *   D. COUNT CLAIM (`--check count`) — "N harnesses", "N rules", "N install sections": a number
 *      about the ARTIFACT, read against the artifact. The README is fetched from
 *      `raw.githubusercontent.com` (unmetered) and searched for the same noun with ANY number;
 *      `differs` reports the README's own count, `absent` says the page never states one. This is
 *      the impeccable 62-vs-61 lesson generalised — and it fires on a TITLE, which is where the
 *      10-26 batch's "17 harnesses" survived its own body correction to "sixteen harness sections".
 *
 * TRAPS ENCODED (each measured while writing this, 2026-10-26):
 *  1. A NUMBER NEXT TO "issue" IS NOT AN ISSUE COUNT. "one issue per twenty-four stargazers"
 *     describes a ratio; "the issue was X" is prose. Only `<n> [open] issues` (or `issues:` in a
 *     stats line) counts as a quote, and an item that names BOTH issues and PRs is compliant even
 *     when it also prints the composite.
 *  2. A VERSION TOKEN IS NOT ALWAYS A CVSS VERSION. `4.0` and `3.1` are also release numbers;
 *     a claim is only extracted when the version sits beside a CVSS word, an `on`/`in` preposition,
 *     parentheses, or directly beside a bare score in the `3.1 5.9` form.
 *  3. THE RECORD MAY CARRY TWO VERSIONS FROM ONE SOURCE. VulnCheck writes v3.1 and v4.0 into its
 *     own container; NVD mirrors them into `Primary`/`Secondary` slots. So a pair that matches a
 *     metric is `ok` regardless of slot, and a `Primary`/`Secondary` mentioned as provenance is
 *     reported separately as advisory (`slot-quoted`) — it is a style defect, not a mismatch.
 *  4. A MISSING RECORD IS NOT A MISSING SCORE. `CVE-2026-114148` was cited by .NET's own security
 *     release and exists in neither registry; the verdict for its claim is `no-record`, which is a
 *     statement about the REGISTRY, not about the number. Never fold the two.
 *  5. THE README'S COUNT MAY BE ON A DIFFERENT BRANCH. `main` says 62, the released tag says 61
 *     (impeccable). This check reads the DEFAULT branch only and says so; a `differs` here means
 *     "the artifact's main branch disagrees with the item", and `release-drift.mjs --claim` is the
 *     tool that separates main from the released tag.
 *  6. A SPELLED-OUT NUMBER IS INVISIBLE. "sixteen harness sections" in a body and "17 harnesses" in
 *     its own title are the same claim, and this lint only sees the digits. That asymmetry is a
 *     finding in itself: the correction pass edits prose, and titles keep the old number.
 *
 * Usage:
 *   node agent/tools/claim-unit-lint.mjs --file en/feed/2026-10-26.md
 *   node agent/tools/claim-unit-lint.mjs --file … --no-net            # check A only (prose)
 *   node agent/tools/claim-unit-lint.mjs --file … --check cvss,repo   # subset
 *   node agent/tools/claim-unit-lint.mjs --files 'en/feed/2026-10-2*.md' --census
 *   node agent/tools/claim-unit-lint.mjs --file … --json --strict     # exit 1 on any finding
 *
 * Exit code is 0 unless `--strict` and a finding was reported (so a pipeline can gate on it).
 * Findings are advisory: a flagged number is a claim to open, not a proven error.
 */
import { readFileSync, writeFileSync, mkdirSync, globSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, basename } from 'node:path';

const arg = (name) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : null;
};
const has = (name) => process.argv.includes(`--${name}`);

const FILE = arg('file');
// `--files` repeats: accumulate every occurrence, so a census can be spelled as several globs.
const FILES = process.argv.flatMap((a, i) => (a === '--files' ? [process.argv[i + 1]] : [])).filter(Boolean);
const NO_NET = has('no-net');
const JSON_OUT = has('json');
const OUT = arg('out');
const CENSUS = has('census');
const STRICT = has('strict');
const STALE_DAYS = Number(arg('stale-days') ?? 60);
const STAR_TOLERANCE = Number(arg('star-tolerance') ?? 0.10);
const MAX_REPOS = Number(arg('max-repos') ?? 8);
const CACHE_PATH = arg('cache') ?? 'agent/data/claim-unit-cache.json';
const CHECKS = new Set((arg('check') ?? 'issues,cvss,repo,count').split(',').map((s) => s.trim()));

const SELFTEST = has('selftest');
if (!FILE && !FILES && !SELFTEST) {
  console.error('usage: claim-unit-lint.mjs --file <feed.md> [--no-net] [--check issues,cvss,repo,count] [--strict] [--json] [--census] [--selftest]');
  process.exit(2);
}

const paths = FILE ? [FILE] : FILES.length ? [...new Set(FILES.flatMap((g) => globSync(g)))].sort() : [];

// ── parse ────────────────────────────────────────────────────────────────────────────────────
const NUM = '(\\d[\\d,]*)';
const strip = (s) => s.replace(/\*\*|\*|`/g, '');
const toNum = (s) => Number(String(s).replace(/,/g, ''));

function parseItems(text) {
  const lines = text.split('\n');
  const items = [];
  let cur = null;
  for (const line of lines) {
    const m = line.match(/^##\s+(\d+)\.\s+(.*)$/);
    if (m) {
      cur = { n: Number(m[1]), title: m[2].trim(), lines: [] };
      items.push(cur);
    } else if (/^##\s+Metadata/.test(line)) {
      cur = null;
    } else if (cur) {
      cur.lines.push(line);
    }
  }
  for (const it of items) {
    it.body = it.lines.join('\n');
    it.text = `${it.title}\n${it.body}`;
    it.plain = strip(it.text);
    it.cves = [...new Set(it.text.match(/CVE-\d{4}-\d{3,7}/g) ?? [])].sort();
    const repos = new Set();
    for (const m of it.text.matchAll(/github\.com\/([\w.-]+)\/([\w.-]+)/g)) {
      const slug = `${m[1]}/${m[2]}`.replace(/\.git$/, '');
      if (!/^(features|topics|orgs|sponsors|marketplace|search|about)$/.test(m[1])) repos.add(slug);
    }
    for (const m of it.text.matchAll(/`([\w.-]+\/[\w.-]+)`/g)) {
      if (/^(main|HEAD|master)$/.test(m[2] ?? '')) continue;
      const [a, b] = m[1].split('/');
      if (!a || !b || b === 'main' || b === 'master') continue;
      if (/\.(md|json|js|mjs|py|toml|yml|yaml|sh|ts|rs|go|c|cpp|h)$/.test(b)) continue;
      repos.add(m[1]);
    }
    it.repos = [...repos];
  }
  return items;
}

// ── check A: issue counter ───────────────────────────────────────────────────────────────────
function checkIssues(it) {
  const out = [];
  const t = it.plain;
  const issueQuotes = [];
  const re = new RegExp(`${NUM}\\s+(?:open\\s+)?issues?\\b`, 'gi');
  for (const m of t.matchAll(re)) {
    const after = t.slice(m.index + m[0].length, m.index + m[0].length + 24).toLowerCase();
    if (/^ per /.test(after)) continue; // a ratio, not a count
    issueQuotes.push({ n: toNum(m[1]), at: m.index, ph: m[0] });
  }
  if (!issueQuotes.length) return out;
  const namesSplit = /\bissues?\b[^.\n]{0,40}\b(?:PRs?|pull requests?)\b|\b(?:PRs?|pull requests?)\b[^.\n]{0,40}\bissues?\b/i.test(t);
  if (!namesSplit) {
    out.push({
      check: 'issues', item: it.n, verdict: 'unsplit-issue-count',
      claim: issueQuotes.map((q) => q.ph).join(' | '),
      detail: it.repos.length
        ? `no issues/PR split in the item — GitHub's open_issues_count is issues + PRs; spend one search call on ${it.repos[0]}`
        : 'no issues/PR split in the item (no repo slug to check)',
    });
    return out;
  }
  // split named — now check the arithmetic when a composite is also quoted
  const parts = [];
  for (const m of t.matchAll(new RegExp(`${NUM}\\s+(?:open\\s+)?issues?\\b`, 'gi'))) parts.push({ kind: 'issues', n: toNum(m[1]) });
  for (const m of t.matchAll(new RegExp(`${NUM}\\s+(?:open\\s+)?(?:PRs?|pull requests?)\\b`, 'gi'))) parts.push({ kind: 'prs', n: toNum(m[1]) });
  const issueN = parts.find((p) => p.kind === 'issues')?.n;
  const prN = parts.find((p) => p.kind === 'prs')?.n;
  if (issueN == null || prN == null) return out;
  out.push({
    check: 'issues', item: it.n, verdict: 'ok',
    claim: `${issueN} issues + ${prN} PRs`,
    detail: `split named (PR share ${Math.round((prN / (issueN + prN)) * 100)}%)`,
  });
  const sum = issueN + prN;
  // a composite is a number near "open_issues_count" or a bare total that equals neither part
  const compRe = /open_issues_count[^.\n]{0,60}?(\d[\d,]*)|(\d[\d,]*)\s+splits into/gi;
  for (const m of t.matchAll(compRe)) {
    const total = toNum(m[1] ?? m[2]);
    if (total && total !== sum) {
      out.push({
        check: 'issues', item: it.n, verdict: 'compound-lags-parts',
        claim: `${total} vs ${issueN}+${prN}=${sum}`,
        detail: 'the composite counter and its parts disagree — quote the half you counted',
      });
    }
  }
  return out;
}

// ── check B: CVSS version ───────────────────────────────────────────────────────────────────
function extractCvss(text) {
  const t = strip(text);
  const claims = new Map();
  const push = (score, ver, idx, ph) => {
    const s = Number(score);
    if (!(s >= 0 && s <= 10)) return;
    if (!/^[34]\.[01]$/.test(ver)) return;
    const key = `${ver}|${s}`;
    if (!claims.has(key)) claims.set(key, { score: s, version: ver, phrase: ph.trim().slice(0, 48), at: idx });
  };
  // version then score: "3.1 5.9", "CVSS 4.0: 8.2"
  for (const m of t.matchAll(/(?:CVSS\s*)?\bv?([34]\.[01])\b\s*[:=]?\s*(\d{1,2}\.\d)\b/g)) {
    push(m[2], m[1], m.index, m[0]);
  }
  // score on/in/at version: "9.2 on CVSS 4.0", "8.1 on 3.1"
  for (const m of t.matchAll(/(\d{1,2}\.\d)\s*(?:on|in|at)\s*(?:CVSS\s*)?\bv?([34]\.[01])\b/g)) {
    push(m[1], m[2], m.index, m[0]);
  }
  // score (CVSS x) / score (v4.0)
  for (const m of t.matchAll(/(\d{1,2}\.\d)\s*\(\s*(?:CVSS\s*)?\bv?([34]\.[01])\s*\)/g)) {
    push(m[1], m[2], m.index, m[0]);
  }
  return [...claims.values()];
}

async function getJson(url, opts = {}) {
  const r = await fetch(url, { signal: AbortSignal.timeout(20_000), ...opts });
  if (!r.ok) throw new Error(`${r.status}`);
  return r.json();
}

function nvdBatch(cves) {
  // One request: NVD accepts a comma-separated cveId list (measured 2026-10-26).
  const url = `https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=${cves.join(',')}`;
  const raw = execFileSync('curl', ['-s', '--max-time', '45', url], { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 });
  const j = JSON.parse(raw);
  const map = new Map();
  for (const v of j.vulnerabilities ?? []) {
    const c = v.cve;
    const metrics = [];
    for (const [k, arr] of Object.entries(c.metrics ?? {})) {
      // v3.0 and v2.0 are real metric slots too — a "7.8 (v3.0)" claim is only absent if the
      // record carries no cvssMetricV30, not because the tool forgot the key existed.
      const ver = k === 'cvssMetricV31' ? '3.1' : k === 'cvssMetricV40' ? '4.0'
        : k === 'cvssMetricV30' ? '3.0' : k === 'cvssMetricV2' ? '2.0' : null;
      if (!ver) continue;
      for (const m of arr) metrics.push({ version: ver, type: m.type, source: m.source, score: (m.cvssData ?? {}).baseScore });
    }
    map.set(c.id, { status: c.vulnStatus, assigner: c.sourceIdentifier, metrics });
  }
  return map;
}

function checkCvss(it, nvd) {
  const out = [];
  const claims = extractCvss(it.text);
  if (!claims.length) return out;
  const records = it.cves.filter((c) => nvd.has(c));
  for (const cl of claims) {
    if (!it.cves.length) {
      out.push({ check: 'cvss', item: it.n, verdict: 'no-cve-named', claim: `${cl.version} ${cl.score}`, detail: 'a CVSS pair with no CVE in the item — the number cannot be checked' });
      continue;
    }
    if (!records.length) {
      out.push({ check: 'cvss', item: it.n, verdict: 'no-record', claim: `${cl.version} ${cl.score}`, detail: `no NVD record for ${it.cves.join(', ')} — absence is a registry statement, not a verdict on the score` });
      continue;
    }
    const candidates = records.flatMap((c) => nvd.get(c).metrics.map((m) => ({ cve: c, ...m })));
    const sameVersion = candidates.filter((m) => m.version === cl.version);
    if (sameVersion.some((m) => Math.abs(m.score - cl.score) < 0.05)) {
      const m = sameVersion.find((x) => Math.abs(x.score - cl.score) < 0.05);
      out.push({ check: 'cvss', item: it.n, verdict: 'ok', claim: `${cl.version} ${cl.score}`, detail: `${m.cve} ${m.type}/${m.source}` });
      continue;
    }
    const otherVersion = candidates.filter((m) => m.version !== cl.version);
    const movedScore = otherVersion.find((m) => Math.abs(m.score - cl.score) < 0.05);
    const here = [...new Set(sameVersion.map((m) => m.score))].join(' / ');
    if (movedScore) {
      out.push({
        check: 'cvss', item: it.n, verdict: 'version-swapped',
        claim: `${cl.version} ${cl.score}`,
        detail: `${cl.score} is the ${movedScore.version} score on ${movedScore.cve}; its ${cl.version} metric says ${here || 'nothing'} — quote the version you quote`,
      });
    } else if (!sameVersion.length) {
      out.push({
        check: 'cvss', item: it.n, verdict: 'version-absent',
        claim: `${cl.version} ${cl.score}`,
        detail: `${it.cves.join(', ')} publish no ${cl.version} metric; the record carries ${otherVersion.map((m) => `${m.version} ${m.score}`).join(', ') || 'none'}`,
      });
    } else {
      out.push({
        check: 'cvss', item: it.n, verdict: 'score-mismatch',
        claim: `${cl.version} ${cl.score}`,
        detail: `NVD's ${cl.version} metric says ${here}`,
      });
    }
  }
  if (claims.length && /\b(?:Primary|Secondary)\b/.test(it.plain)) {
    out.push({
      check: 'cvss', item: it.n, verdict: 'slot-quoted',
      claim: 'Primary/Secondary',
      detail: 'a metric slot is not a provenance — name the source (CNA / nvd@nist.gov / CISA-ADP) instead',
    });
  }
  return out;
}

// ── check C: repo state ─────────────────────────────────────────────────────────────────────
let cache = {};
try { cache = JSON.parse(readFileSync(CACHE_PATH, 'utf8')); } catch { /* first run */ }
let apiCalls = 0;
const CACHE_TTL_MS = 6 * 3600 * 1000;

function repoState(slug) {
  const hit = cache[slug];
  if (hit && Date.now() - Date.parse(hit.fetched_at) < CACHE_TTL_MS) return hit;
  let j;
  try {
    const raw = execFileSync('gh', ['api', `repos/${slug}`], { encoding: 'utf8', timeout: 30_000, stdio: ['ignore', 'pipe', 'ignore'] });
    j = JSON.parse(raw);
    apiCalls += 1;
  } catch (e) {
    cache[slug] = { fetched_at: new Date().toISOString(), error: String(e.message ?? e).split('\n')[0] };
    return cache[slug];
  }
  cache[slug] = {
    fetched_at: new Date().toISOString(),
    pushed_at: j.pushed_at, created_at: j.created_at, archived: j.archived,
    stars: j.stargazers_count, forks: j.forks_count, license: j.license?.spdx_id ?? null,
  };
  return cache[slug];
}

function checkRepo(it, budget) {
  const out = [];
  const starQuotes = [];
  for (const m of it.plain.matchAll(new RegExp(`${NUM}\\s*(?:★|stars?)\\b`, 'gi'))) {
    starQuotes.push(toNum(m[1]));
  }
  for (const m of it.plain.matchAll(/★\s*([\d,]+)|\(([+-]?[\d,]+)★/g)) starQuotes.push(toNum(m[1] ?? m[2]));
  if (!it.repos.length) return out;
  for (const slug of it.repos.slice(0, 2)) {
    if (budget.left <= 0) break;
    budget.left -= 1;
    const st = repoState(slug);
    if (st.error) {
      out.push({ check: 'repo', item: it.n, verdict: 'unreadable', claim: slug, detail: `api.github.com: ${st.error}` });
      continue;
    }
    const pushed = Date.parse(st.pushed_at);
    const ageDays = Math.round((Date.now() - pushed) / 86_400_000);
    const biggest = starQuotes.length ? Math.max(...starQuotes) : null;
    const starDelta = biggest && st.stars ? (biggest - st.stars) / st.stars : 0;
    if (st.archived) {
      out.push({ check: 'repo', item: it.n, verdict: 'archived', claim: slug, detail: `archived: true, last push ${st.pushed_at.slice(0, 10)} — an archived repo makes "unfixed" permanent, not pending` });
    } else if (ageDays > STALE_DAYS) {
      out.push({ check: 'repo', item: it.n, verdict: 'stale', claim: slug, detail: `last push ${st.pushed_at.slice(0, 10)} (${ageDays}d) with ${st.stars} stars — is the item about the code or the name?` });
    }
    if (biggest != null && st.stars && Math.abs(starDelta) > STAR_TOLERANCE) {
      out.push({ check: 'repo', item: it.n, verdict: 'star-drift', claim: `${biggest} quoted vs ${st.stars} now`, detail: `${slug}: ${(starDelta * 100).toFixed(0)}% — reread the number or date the item` });
    }
    if (!['archived', 'stale'].includes(out.at(-1)?.verdict) && biggest != null) {
      out.push({ check: 'repo', item: it.n, verdict: 'ok', claim: slug, detail: `${st.stars}★, last push ${st.pushed_at.slice(0, 10)}` });
    }
  }
  return out;
}

// ── check D: count claim vs artifact ────────────────────────────────────────────────────────
const COUNT_NOUNS = [
  'harnesses?', 'install sections?', 'sub-skills?', 'skills?', 'rules?', 'plugins?', 'agents?',
  'commands?', 'formats?', 'tools?', 'apps?', 'workers?', 'benchmarks?', 'languages?', 'models?',
];
const COUNT_RE = new RegExp(`${NUM}\\s+((?:${COUNT_NOUNS.join('|')}))\\b`, 'gi');
let readmeCalls = 0;

async function readme(slug) {
  const key = `readme:${slug}`;
  const hit = cache[key];
  if (hit && Date.now() - Date.parse(hit.fetched_at) < CACHE_TTL_MS) return hit;
  let text = null;
  for (const name of ['README.md', 'readme.md', 'README.rst', 'README']) {
    try {
      const r = await fetch(`https://raw.githubusercontent.com/${slug}/HEAD/${name}`, { signal: AbortSignal.timeout(15_000) });
      readmeCalls += 1;
      if (r.ok) { text = await r.text(); break; }
    } catch { /* try the next filename */ }
  }
  cache[key] = { fetched_at: new Date().toISOString(), bytes: text ? text.length : 0, text: text ?? '' };
  return cache[key];
}

async function checkCount(it) {
  const out = [];
  const claims = [];
  const seen = new Set();
  for (const m of it.plain.matchAll(COUNT_RE)) {
    const n = toNum(m[1]);
    const noun = m[2].toLowerCase();
    if (n < 2 || n > 100000) continue; // "1 model" is not a count claim worth opening a page for
    const key = `${n}|${noun}`;
    if (seen.has(key)) continue;
    seen.add(key);
    claims.push({ n, noun, phrase: m[0] });
  }
  if (!claims.length || !it.repos.length) return out;
  const rd = await readme(it.repos[0]);
  if (!rd.text) {
    out.push({ check: 'count', item: it.n, verdict: 'artifact-unreadable', claim: claims.map((c) => c.phrase).join(' | '), detail: `no README at ${it.repos[0]} — open the page before quoting a count` });
    return out;
  }
  const body = rd.text.replace(/[*_`]/g, '');
  for (const cl of claims) {
    const anyNum = [...body.matchAll(new RegExp(`(\\d[\\d,]*)\\s+${cl.noun}\\b`, 'gi'))].map((m) => toNum(m[1]));
    if (anyNum.includes(cl.n)) {
      out.push({ check: 'count', item: it.n, verdict: 'ok', claim: cl.phrase, detail: `README states it` });
    } else if (anyNum.length) {
      out.push({ check: 'count', item: it.n, verdict: 'differs', claim: cl.phrase, detail: `README says ${[...new Set(anyNum)].join(' / ')} ${cl.noun}` });
    } else {
      out.push({ check: 'count', item: it.n, verdict: 'absent', claim: cl.phrase, detail: `the README never states a count of ${cl.noun} — count it yourself, or say "the README states no total"` });
    }
  }
  return out;
}

// ── selftest (pure functions only; no network) ──────────────────────────────────────────────
if (SELFTEST) {
  const mk = (title, body = '') => ({ n: 1, title, body, text: `${title}\n${body}`, plain: strip(`${title}\n${body}`), cves: [], repos: [] });
  const cases = [];
  const t = (name, got, want) => cases.push({ name, pass: JSON.stringify(got) === JSON.stringify(want), got, want });

  t('unsplit: 3,286 open issues', checkIssues(mk('t', 'with **3,286 open issues** on the board')).map((x) => x.verdict), ['unsplit-issue-count']);
  t('split named: compliant', checkIssues(mk('t', '4,379 issues and 4,159 PRs')).map((x) => x.verdict), ['ok']);
  t('ratio is not a count', checkIssues(mk('t', 'one issue per twenty-four stargazers')).map((x) => x.verdict), []);
  t('composite lags parts', checkIssues(mk('t', 'open_issues_count reads 77 against 21 issues and 58 PRs')).map((x) => x.verdict).slice(-1), ['compound-lags-parts']);

  const ver = (s) => extractCvss(s).map((c) => `${c.version}:${c.score}`).sort();
  t('score (CVSS v)', ver('scored **9.1 (CVSS 3.1)**'), ['3.1:9.1']);
  t('version then score', ver('**3.1 5.9** and **4.0 8.2**'), ['3.1:5.9', '4.0:8.2']);
  t('score on version', ver('9.2 on CVSS 4.0 and 8.1 on 3.1'), ['3.1:8.1', '4.0:9.2']);
  t('release number is not a version', ver('affected >= 1.37, <= 1.74.1, patched 1.74.2'), []);
  t('out-of-range score dropped', ver('CVSS 4.0 11.4'), []);

  for (const c of cases) console.log(`  ${c.pass ? '✓' : '✗'} ${c.name}${c.pass ? '' : ` — got ${JSON.stringify(c.got)}, want ${JSON.stringify(c.want)}`}`);
  const ok = cases.filter((c) => c.pass).length;
  console.log(`selftest ${ok}/${cases.length}`);
  process.exit(ok === cases.length ? 0 : 1);
}

// ── run ─────────────────────────────────────────────────────────────────────────────────────
const allFindings = [];
const perFile = [];
const parsed = paths.map((p) => ({ path: p, items: parseItems(readFileSync(p, 'utf8')) }));

// One NVD budget for every file in the run, chunked to keep the request small and the rate
// under the keyless 5-per-30s ceiling (an unchunked multi-week census would 403 mid-run).
let nvd = new Map();
let nvdCalls = 0;
if (!NO_NET && CHECKS.has('cvss')) {
  const cves = [...new Set(parsed.flatMap((f) => f.items.flatMap((it) => it.cves)))];
  const CHUNK = 25;
  for (let i = 0; i < cves.length; i += CHUNK) {
    if (i) await new Promise((r) => setTimeout(r, 6_500));
    try { for (const [k, v] of nvdBatch(cves.slice(i, i + CHUNK))) nvd.set(k, v); nvdCalls += 1; } catch { /* offline or rate-limited; the cvss check reports no-record rather than a wrong verdict */ }
  }
}

for (const { path: p, items } of parsed) {
  const findings = [];
  const budget = { left: MAX_REPOS };

  for (const it of items) {
    if (CHECKS.has('issues')) findings.push(...checkIssues(it));
    if (!NO_NET && CHECKS.has('cvss')) findings.push(...checkCvss(it, nvd));
  }
  if (!NO_NET && CHECKS.has('repo')) for (const it of items) findings.push(...checkRepo(it, budget));
  if (!NO_NET && CHECKS.has('count')) for (const it of items) findings.push(...await checkCount(it));

  perFile.push({ file: basename(p), items: items.length, findings });
  allFindings.push(...findings.map((f) => ({ file: basename(p), ...f })));
}

try { mkdirSync(dirname(CACHE_PATH), { recursive: true }); writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 1)); } catch { /* cache is best-effort */ }

const SEVERITY = { ok: 0, 'no-cve-named': 1, 'no-record': 1, 'slot-quoted': 1, 'star-drift': 2, stale: 2, archived: 2, differs: 2, absent: 2, 'unsplit-issue-count': 3, 'compound-lags-parts': 3, 'version-swapped': 3, 'version-absent': 3, 'score-mismatch': 3, unreadable: 1, 'artifact-unreadable': 1, 'nvd-unavailable': 1 };
const REAL = (f) => (SEVERITY[f.verdict] ?? 1) >= 2;

const summary = { generated: new Date().toISOString(), files: perFile, api_calls: apiCalls, readme_calls: readmeCalls, nvd_calls: nvdCalls };
if (OUT) {
  try { mkdirSync(dirname(OUT), { recursive: true }); writeFileSync(OUT, JSON.stringify(summary, null, 1)); } catch { /* a missing findings file is not a failed lint */ }
}

if (JSON_OUT) {
  console.log(JSON.stringify(summary, null, 2));
} else {
  for (const f of perFile) {
    const real = f.findings.filter(REAL);
    const oks = f.findings.filter((x) => x.verdict === 'ok');
    console.log(`\n${f.file} — ${f.items} items · ${real.length} finding(s), ${oks.length} verified`);
    for (const x of f.findings.filter(REAL)) {
      console.log(`  ⚠ [${x.check}] #${x.item} ${x.verdict} — ${x.claim}`);
      console.log(`      ${x.detail}`);
    }
    for (const x of f.findings.filter((y) => !REAL(y) && y.verdict !== 'ok')) {
      console.log(`  · [${x.check}] #${x.item} ${x.verdict} — ${x.claim} — ${x.detail}`);
    }
    if (!f.findings.length) console.log('  (nothing to check)');
  }
  if (CENSUS) {
    const byVerdict = {};
    for (const f of allFindings) byVerdict[f.verdict] = (byVerdict[f.verdict] ?? 0) + 1;
    const byCheck = {};
    for (const f of allFindings) byCheck[f.check] = (byCheck[f.check] ?? 0) + 1;
    console.log('\nCENSUS');
    for (const [k, v] of Object.entries(byCheck).sort((a, b) => b[1] - a[1])) console.log(`  ${k.padEnd(8)} ${v}`);
    console.log('  verdicts: ' + Object.entries(byVerdict).map(([k, v]) => `${k}=${v}`).join(' '));
  }
  console.log(`\napi.github.com calls: ${apiCalls} (cached ${Object.keys(cache).filter((k) => !k.startsWith('readme:')).length} repos) · raw.githubusercontent fetches: ${readmeCalls} (unmetered) · NVD calls: ${nvdCalls}`);
}

const realCount = allFindings.filter(REAL).length;
if (STRICT && realCount) process.exit(1);
