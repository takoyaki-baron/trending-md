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
 *      the record of the identifier it belongs to. Catches the three shapes seen: a score quoted
 *      against the WRONG version (9.1 is v4.0, not v3.1), a version that the record does not carry
 *      at all, and a score that appears nowhere. One NVD request per feed: the API accepts a
 *      comma-separated `cveId` list (measured 2026-10-26: seven IDs, one call, six records back —
 *      the seventh genuinely has no NVD record).
 *      **Two subjects, bound per claim** (added 2026-10-26 12:29). The check used to pair every
 *      score with EVERY CVE in the item, which is wrong in both directions: item 26 names a
 *      CVE-less GHSA *and* an unrelated earlier CVE, so its correct 4.0 9.1 was reported
 *      `version-absent`. Each claim now binds to the identifier *nearest* it in the text, and a
 *      score that fails on its own subject but matches another identifier in the same item is
 *      `wrong-subject` — the number belongs to a different record, which is a real error and was
 *      previously invisible. GHSA ids are first-class subjects: `api.github.com/advisories/<id>`
 *      is fetched only for the GHSA an item actually names (cached 6h, `--max-ghsa`, default 6).
 *      **A null in one field is not an absence, and `0.0` is not a score** (measured 2026-10-26
 *      over 100 advisories published 10-22→23): the legacy `cvss` object is a mirror of
 *      `cvss_v3` (65/100, 0 score mismatches) and is **null on 35/100**, while
 *      `cvss_severities` is populated on **100/100**; exactly one of the two version slots
 *      carries a real score on **95/100** (3 carry both, 2 carry neither). An empty slot reads
 *      `{score: 0.0, vector_string: null}` — a sentinel, not a zero — so the version to quote is
 *      whichever slot has a **vector**, and the check reports the field it read. The verdict that
 *      matters most is `absence-contradicted`: prose asserting "no CVSS" while the record carries
 *      one, which is the bug this whole check was extended for.
 *   C. REPO STATE (`--check repo`) — a star count quoted on a repo that is archived or has not been
 *      pushed in `--stale-days` (default 60), or where the API's own `stargazers_count` disagrees
 *      with the number in the text by more than `--star-tolerance` (default 10%). This is the
 *      Void lesson's cheapest half; `api.github.com` is metered, so the budget is `--max-repos`
 *      (default 8) and results are cached for 6h in `agent/data/claim-unit-cache.json`.
 *   D. COUNT CLAIM (`--check count`) — "N harnesses", "N rules", "N install sections": a number
 *      about the ARTIFACT, read against the artifact. The repo README is fetched from
 *      `raw.githubusercontent.com` (unmetered) and searched for the same noun with ANY number;
 *      `differs` reports the README's own count, `absent` says the page never states one. This is
 *      the impeccable 62-vs-61 lesson generalised — and it fires on a TITLE, which is where the
 *      10-26 batch's "17 harnesses" survived its own body correction to "sixteen harness sections".
 *      Two defects it had, both measured on the 10-26 20:34 batch and both fixed: **(1)** the
 *      matcher required `N <noun>` with a SPACE, so `31,132-skill analyzed subset` was invisible
 *      and SkillSpector's correct number read as `differs` against the other number in the same
 *      README; **(2)** it read only the repo README, so a count quoted from the page the item
 *      actually cites — item 43's **1,251 skills** is the arXiv abstract's sentence — came back
 *      `absent`. Now: three spellings (`N nouns`, `N-noun`, `N | noun`), and before any `absent`
 *      the item's **cited pages** are read, with verdict `ok-cited-page` naming the page. `absent`
 *      names every page it read and says whether any was unreadable, because unread is not absent.
 *      Generalized 2026-10-27: EVERY `https://` URL in the item is a candidate (a GitHub `blob/`
 *      link is rewritten to its `raw` twin, HN threads and repo roots skipped, linked files ranked
 *      above landing pages, max 3, cached). The two-pattern version produced the same false
 *      `absent` twice in one file — item 30's "38" is Stalwart's blog ("38 headline comparisons")
 *      and item 31's "32 languages" is the item's own `docs/README.md`. A number found beside a
 *      DIFFERENT head noun is now the advisory `number-other-noun` (the feed's paraphrase, quoted
 *      back), not `absent`.
 *   E. SCORE ARITHMETIC (`--check cvss`) — a score that matches the record has matched its COPY.
 *      Every matched metric's `vectorString` is recomputed through `cvss-recompute.mjs`; a stored
 *      number its own vector does not yield is `score-not-reproducible` (severity 2). Baseline,
 *      measured: 4,461/4,461 NVD metrics over 2026-10-20→26 and 21/21 on the 2026-10-27 feed
 *      reproduce, so a disagreement is rare and worth a generation-time finding. v4.0 has no
 *      native implementation here (no vendored MacroVector table) and reports silently; a metric
 *      with no vector is `ok` — unverifiable is not wrong.
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
 *  7. A SCORE BELONGS TO AN IDENTIFIER, NOT TO AN ITEM. An item can cite two vulns and quote one
 *     score; checking the union of all records lets any number pass on any item, and narrowing to
 *     the first CVE reports a correct score as absent. Bind per claim, and keep the cross-check
 *     (`wrong-subject`) because a score attributed to the wrong record is the error that survives.
 *  8. `score: 0.0` IS AN EMPTY SLOT UNLESS THERE IS A VECTOR. `{score: 0.0, vector_string: null}`
 *     means "this version was not scored"; a genuine 0.0 carries a vector whose all-N impact
 *     metrics compute to zero (seen on GHSA-27mw-82g8-phjj, whose legacy `cvss` holds the vector
 *     but a null score — a third state, where the score is derivable from the vector and absent
 *     from the field). Distinguish by `vector_string`, never by the score.
 *  9. THE LEGACY `cvss` OBJECT IS A MIRROR OF v3.1, NOT A SUMMARY. So a null there says "no v3.1
 *     score", never "no score"; 100% of the sampled advisories carry v4 in `cvss_severities` and
 *     the null legacy object is exactly the set that moved to a v4-only shape. A reader that
 *     parses `cvss.score` sees nothing for ~35% of new records — quote the field you read.
 *
 * Usage:
 *   node agent/tools/claim-unit-lint.mjs --file en/feed/2026-10-26.md
 *   node agent/tools/claim-unit-lint.mjs --file … --no-net            # check A only (prose)
 *   node agent/tools/claim-unit-lint.mjs --file … --check cvss,repo   # subset
 *   node agent/tools/claim-unit-lint.mjs --files 'en/feed/2026-10-2*.md' --census
 *   node agent/tools/claim-unit-lint.mjs --file … --json --strict     # exit 1 on any finding
 *   node agent/tools/claim-unit-lint.mjs --ghsa-census [--pages 3]    # field-shape census
 *
 * Exit code is 0 unless `--strict` and a finding was reported (so a pipeline can gate on it).
 * Findings are advisory: a flagged number is a claim to open, not a proven error.
 */
import { readFileSync, writeFileSync, mkdirSync, globSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, basename } from 'node:path';
// The score's arithmetic, not just the record's copy of it. `cvss-recompute.mjs` guards its CLI
// behind an `import.meta.url` check, so importing it costs nothing but the v3.1 equations.
import { judge } from './cvss-recompute.mjs';

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
const MAX_GHSA = Number(arg('max-ghsa') ?? 6);
const CACHE_PATH = arg('cache') ?? 'agent/data/claim-unit-cache.json';
const CHECKS = new Set((arg('check') ?? 'issues,cvss,repo,count').split(',').map((s) => s.trim()));

const SELFTEST = has('selftest');
if (!FILE && !FILES && !SELFTEST && !has('ghsa-census')) {
  console.error('usage: claim-unit-lint.mjs --file <feed.md> [--no-net] [--check issues,cvss,repo,count] [--strict] [--json] [--census] [--selftest] | --ghsa-census [--pages N]');
  process.exit(2);
}

const paths = FILE ? [FILE] : FILES.length ? [...new Set(FILES.flatMap((g) => globSync(g)))].sort() : [];

// ── parse ────────────────────────────────────────────────────────────────────────────────────
const NUM = '(\\d[\\d,]*)';
const strip = (s) => s.replace(/\*\*|\*|`/g, '');
const toNum = (s) => Number(String(s).replace(/,/g, ''));

/* A backticked `a/b` is a repo slug only some of the time. The measured counterexample (2026-10-27
 * batch, item 7) is **Erlang function/arity notation**: ``merge_ssl_opts/3`` and ``partial_chain/1``
 * are quoted from the `hackney` advisory, and the slug reader spent an `api.github.com` call on
 * `repos/merge_ssl_opts/3`, got a 404, and reported the item as having an **unreadable repo** — a
 * finding about the checker, not about the item. So: a bare integer of arity length (0–2 digits)
 * after a snake_case or `Module.function` identifier is a function reference, not an owner/repo. */
function backtickSlug(raw) {
  const [a, b] = raw.split('/');
  if (!a || !b) return null;
  if (b === 'main' || b === 'master' || b === 'HEAD') return null;
  if (/\.(md|json|js|mjs|py|toml|yml|yaml|sh|ts|rs|go|c|cpp|h)$/.test(b)) return null;
  if (/^\d{1,2}$/.test(b) && (/^[a-z][a-z0-9]*(?:_[a-z0-9]+)+$/.test(a) || /^[A-Z][A-Za-z0-9]*\.[a-zA-Z_]\w*$/.test(a))) return null;
  return a && b ? raw : null;
}

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
      const slug = backtickSlug(m[1]);
      if (slug) repos.add(slug);
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
  // "pull requests", "pull-request" and "PRs" are the same word; a hyphen-blind pattern reported
  // arXiv's "57,240 issue and pull-request threads" as an unsplit count (measured 2026-10-26).
  const namesSplit = /\bissues?\b[^.\n]{0,40}\b(?:PRs?|pulls?[- ]requests?)\b|\b(?:PRs?|pulls?[- ]requests?)\b[^.\n]{0,40}\bissues?\b/i.test(t);
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
  for (const m of t.matchAll(new RegExp(`${NUM}\\s+(?:open\\s+)?(?:PRs?|pulls?[- ]requests?)\\b`, 'gi'))) parts.push({ kind: 'prs', n: toNum(m[1]) });
  const issueN = parts.find((p) => p.kind === 'issues')?.n;
  const prN = parts.find((p) => p.kind === 'prs')?.n;
  // "57,240 issue and pull-request threads" states ONE number for both nouns, and that combined
  // count is exactly what open_issues_count means — so it is compliant, and the useful thing to
  // record is that the item quoted the composite the counter actually is.
  if (issueN != null && prN == null) {
    const shared = t.match(new RegExp(`${NUM}\\s+(?:open\\s+)?issues?\\s+(?:and|&|\\+)\\s+(?:pulls?[- ]requests?|PRs?)\\b`, 'i'));
    if (shared) {
      out.push({ check: 'issues', item: it.n, verdict: 'ok', claim: `${toNum(shared[1])} issues+PRs combined`, detail: 'one number for both nouns — that is the composite the counter reports, so nothing is being presented as an issue-only count' });
      return out;
    }
  }
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
      for (const m of arr) metrics.push({ version: ver, type: m.type, source: m.source, score: (m.cvssData ?? {}).baseScore, vector: (m.cvssData ?? {}).vectorString });
    }
    map.set(c.id, { status: c.vulnStatus, assigner: c.sourceIdentifier, metrics });
  }
  return map;
}

// ── check B helpers: subject binding + the GHSA field model ────────────────────────────────
const GHSA_RE = /GHSA(-[23456789cfghjmpqrvwx]{4}){3}/g;

/** Identifier mentions with their offset in the SAME stripped text `extractCvss` measures on. */
function idMentions(t) {
  const out = [];
  for (const m of t.matchAll(/CVE-\d{4}-\d{3,7}/g)) out.push({ id: m[0], at: m.index, kind: 'cve' });
  for (const m of t.matchAll(GHSA_RE)) out.push({ id: m[0], at: m.index, kind: 'ghsa' });
  return out.sort((a, b) => a.at - b.at);
}

/**
 * The identifier a claim is about. Nearest-mention alone is not enough: an item's subject is
 * declared in its `Source:` line and its title, and a *different* vuln mentioned 900 characters
 * later can be narrowly closer to the score than the subject is (item 26: GHSA at 183 vs a
 * passing CVE at 2,239, score at 1,247). So — sentence scope first, then the declaration:
 *   1. an identifier in the SAME SENTENCE as the claim → nearest of those;
 *   2. otherwise the item's primary subject (first id on the `Source:` line, else the title);
 *   3. otherwise the nearest mention anywhere.
 * The binding never consults the score, or the check would always pass.
 */
function sentences(t) {
  const out = [];
  let start = 0;
  for (const m of t.matchAll(/[.!?]["')\]]*\s+(?=[A-Z“‘"'(])/g)) {
    out.push({ start, end: m.index + m[0].length });
    start = m.index + m[0].length;
  }
  out.push({ start, end: t.length });
  return out;
}

function primarySubject(t, mentions) {
  if (!mentions.length) return null;
  const src = t.match(/^.*\bSource:\s*(.*)$/m);
  if (src) {
    const line = src[0];
    const first = mentions.find((m) => m.at >= (src.index ?? 0) && m.at <= (src.index ?? 0) + line.length);
    if (first) return first;
  }
  const titleEnd = t.indexOf('\n');
  const inTitle = mentions.find((m) => m.at < titleEnd);
  return inTitle ?? mentions[0];
}

function bindSubject(claimAt, mentions, ctx) {
  if (!mentions.length) return null;
  if (ctx?.sents) {
    const s = ctx.sents.find((x) => claimAt >= x.start && claimAt < x.end);
    if (s) {
      const inside = mentions.filter((m) => m.at >= s.start && m.at < s.end);
      if (inside.length) {
        let best = inside[0];
        for (const m of inside) if (Math.abs(claimAt - m.at) < Math.abs(claimAt - best.at)) best = m;
        return best;
      }
    }
    if (ctx.primary) return ctx.primary;
  }
  let best = mentions[0];
  let bestD = Math.abs(claimAt - best.at);
  for (const m of mentions) {
    const d = Math.abs(claimAt - m.at);
    if (d < bestD || (d === bestD && m.at <= claimAt && best.at > claimAt)) { best = m; bestD = d; }
  }
  return best;
}

/**
 * The Advisory Database's field model, which is the sixth unit this check kept getting wrong.
 * `cvss` is a legacy mirror of `cvss_v3` and is null for the records that moved to v4-only;
 * `cvss_severities` carries one slot per CVSS version. An unscored slot reads
 * `{score: 0.0, vector_string: null}` — a sentinel. A real 0.0 carries a vector.
 */
function advisoryMetrics(j) {
  const metrics = [];
  const push = (o, version, field) => {
    if (!o || o.score == null) return;
    if (o.score === 0 && !o.vector_string) return; // empty slot, not a score of zero
    metrics.push({ version, type: 'GHSA', source: 'security-advisories@github.com', score: o.score, vector: o.vector_string, field });
  };
  push(j.cvss, '3.1', 'cvss (legacy mirror of cvss_v3)');
  const sev = j.cvss_severities ?? {};
  push(sev.cvss_v3, '3.1', 'cvss_severities.cvss_v3');
  push(sev.cvss_v4, '4.0', 'cvss_severities.cvss_v4');
  return metrics;
}

function advisoryState(id) {
  const key = `ghsa:${id}`;
  const hit = cache[key];
  // An error is not a six-hour fact: a rate-limit or a network blip must be re-probed, or the
  // next run inherits "unreadable" as though it were the record's own state. A 404 is a state,
  // so it keeps the full TTL — but re-classify entries written before `notInDb` existed.
  if (hit?.error && !hit.notInDb && /\b404\b|Not Found/i.test(hit.error)) hit.notInDb = true;
  const ttl = hit?.error && !hit.notInDb ? ERROR_TTL_MS : CACHE_TTL_MS;
  if (hit && Date.now() - Date.parse(hit.fetched_at) < ttl) return hit;
  let j;
  try {
    const raw = execFileSync('gh', ['api', `advisories/${id}`], { encoding: 'utf8', timeout: 30_000, stdio: ['ignore', 'pipe', 'pipe'] });
    j = JSON.parse(raw);
    apiCalls += 1;
  } catch (e) {
    // `execFileSync` puts the HTTP status on STDERR ("gh: Not Found (HTTP 404)") — reading only
    // e.message loses it, which made "404, not in the database" indistinguishable from a blip.
    const msg = `${e.stderr ?? ''}${e.stdout ?? ''}${e.message ?? ''}`.split('\n').filter((l) => l.trim() && !/^Command failed/.test(l))[0]?.trim() || String(e.message ?? e);
    // A 404 is a STATE, not a failure: the repo advisory page can render while the GLOBAL
    // Advisory Database carries no record under that id (measured 2026-10-26 on Snipe-IT's
    // GHSA-xf36-wx48-5rqp and Parse Server's GHSA-rq3w-5c6f-p7wr — both pages 200, both ids 404
    // here AND absent from OSV under the GHSA id, which indexes them only by their CVE alias).
    cache[key] = { fetched_at: new Date().toISOString(), error: /\b404\b|Not Found/i.test(msg) ? 'not-in-advisory-db' : msg, notInDb: /\b404\b|Not Found/i.test(msg) };
    return cache[key];
  }
  cache[key] = {
    fetched_at: new Date().toISOString(),
    cve_id: j.cve_id ?? null,
    severity: j.severity ?? null,
    published_at: j.published_at ?? null,
    metrics: advisoryMetrics(j),
  };
  return cache[key];
}

/**
 * Prose that asserts a score does not exist — the sentence this check was extended to catch.
 * The trap that made its first version useless: a CORRECTED item describes the wrong reading
 * ("a reader that parses `cvss.score` … reports "no score""), so the phrase is present and the
 * claim is the opposite. Only a bare assertion counts: not inside quotation marks, and not
 * attributed to a reader, scanner, parser or reporter.
 */
function noScoreSpans(plain) {
  const out = [];
  const re = /\bno\s+(?:cvss|score)(?:\s+(?:at\s+all|published|assigned))?\b|\bwithout\s+(?:a\s+|any\s+)?(?:cvss|score)\b/gi;
  for (const m of plain.matchAll(re)) {
    const before = plain.slice(Math.max(0, m.index - 40), m.index);
    if (/["“'‘]\s*$/.test(before)) continue;               // quoted speech
    if (/\b(?:report|read|say|see|claim|describ|interpret|parse|treat|render|calls?)\w*\b[^.]{0,24}$/i.test(before)) continue; // attributed
    out.push({ at: m.index, text: m[0] });
  }
  return out;
}
function assertsNoScore(plain) {
  return noScoreSpans(plain).length > 0;
}

function checkCvss(it, subjects) {
  const out = [];
  const t = strip(it.text);
  const claims = extractCvss(t);
  const mentions = idMentions(t);
  if (!claims.length) return out;
  if (!mentions.length) {
    for (const cl of claims) {
      out.push({ check: 'cvss', item: it.n, verdict: 'no-cve-named', claim: `${cl.version} ${cl.score}`, detail: 'a CVSS pair with no CVE or GHSA in the item — the number cannot be checked' });
    }
    return out;
  }
  const all = [...new Set(mentions.map((m) => m.id))];
  const union = all.flatMap((id) => (subjects.get(id)?.metrics ?? []).map((m) => ({ id, ...m })));
  const ctx = { sents: sentences(t), primary: primarySubject(t, mentions) };

  for (const cl of claims) {
    const bound = bindSubject(cl.at, mentions, ctx);
    const rec = subjects.get(bound.id);
    if (!rec) {
      out.push({ check: 'cvss', item: it.n, verdict: 'no-record', claim: `${cl.version} ${cl.score}`, detail: `no record read for ${bound.id} — absence is a registry statement, not a verdict on the score` });
      continue;
    }
    if (rec.error) {
      // Unreadable is not wrong. The same vulnerability is usually present under its CVE, so
      // check that before reporting anything: only an unconfirmable claim is worth a finding.
      const alt = union.filter((m) => m.id !== bound.id);
      const hitAlt = alt.find((m) => m.version === cl.version && Math.abs(m.score - cl.score) < 0.05);
      if (hitAlt) {
        out.push({
          check: 'cvss', item: it.n, verdict: 'ok',
          claim: `${cl.version} ${cl.score}`,
          detail: `${hitAlt.id} · ${hitAlt.field ?? `${hitAlt.type}/${hitAlt.source}`} (bound subject ${bound.id} is ${rec.error === 'not-in-advisory-db' ? 'not in the global Advisory Database' : `unreadable: ${rec.error}`})`,
        });
      } else {
        out.push({
          check: 'cvss', item: it.n, verdict: 'advisory-unreadable', claim: `${cl.version} ${cl.score}`,
          detail: `${bound.id}: ${rec.error === 'not-in-advisory-db' ? 'no record in the global Advisory Database (a published repo page does not imply an ingested advisory)' : rec.error} — "I could not read it" is not "it does not say that"`,
        });
      }
      continue;
    }
    // A record with no metrics at all is the absence case: check it against the rest before calling it.
    const candidates = rec.metrics.length ? rec.metrics.map((m) => ({ id: bound.id, ...m })) : union;
    const fallback = !rec.metrics.length && candidates.length;
    const sameVersion = candidates.filter((m) => m.version === cl.version);
    const hit = sameVersion.find((m) => Math.abs(m.score - cl.score) < 0.05);
    if (hit) {
      /* The claim matches the RECORD. Does the record's own number survive its own vector? Those are
       * two different facts and this check used to verify only the first — "9.2 (CVSS 4.0)" passed
       * as soon as some metric said 9.2, whatever the vector beside it computed. The answer decides
       * how the number may be written: a reproduced score can be quoted bare, a
       * non-reproducing one cannot.
       *
       * Baseline, measured rather than assumed: over NVD's 2026-10-20→26 publication window the
       * stored `baseScore` IS the arithmetic of its `vectorString` on **4,461 of 4,461** metrics
       * (`cvss-recompute.mjs --census`), and on the 2026-10-27 feed **21 of 21** reproduce (v3.1
       * 11/11 natively, v4.0 10/10 through the `--oracle` implementation). So a disagreement is
       * rare — which is why it is worth a finding at generation time and not a nightly sweep.
       * v4.0 has no native implementation here (a 270-row MacroVector table is not vendored), so a
       * v4.0 claim reports `v4-not-recomputed` silently rather than as a finding. */
      const repro = hit.vector ? judge({ vector: hit.vector, score: hit.score }) : { verdict: 'no-vector' };
      if (repro.verdict === 'differs') {
        out.push({
          check: 'cvss', item: it.n, verdict: 'score-not-reproducible',
          claim: `${cl.version} ${cl.score}`,
          detail: `${hit.id} stores ${hit.score} for ${hit.vector}, which computes ${repro.computed} (Δ ${repro.delta > 0 ? '+' : ''}${repro.delta}) — the quoted number is the record's, and the record does not reproduce; say so rather than printing it bare`,
        });
        continue;
      }
      out.push({
        check: 'cvss', item: it.n, verdict: 'ok',
        claim: `${cl.version} ${cl.score}`,
        detail: `${hit.id} · ${hit.field ?? `${hit.type}/${hit.source}`}${fallback ? ' (bound record carries none; matched another id in the item)' : ''}${repro.verdict === 'exact' ? ` · vector reproduces ${repro.computed}` : ''}`,
      });
      continue;
    }
    // Fails on its own subject — does it belong to a different identifier in this item?
    const elsewhere = union.find((m) => m.id !== bound.id && Math.abs(m.score - cl.score) < 0.05);
    if (elsewhere) {
      out.push({
        check: 'cvss', item: it.n, verdict: 'wrong-subject',
        claim: `${cl.version} ${cl.score}`,
        detail: `bound to ${bound.id}, which does not carry it — ${cl.score} is on ${elsewhere.id} (${elsewhere.version}, ${elsewhere.field ?? elsewhere.type}); the score belongs to another record in this item`,
      });
      continue;
    }
    const otherVersion = candidates.filter((m) => m.version !== cl.version);
    const movedScore = otherVersion.find((m) => Math.abs(m.score - cl.score) < 0.05);
    const here = [...new Set(sameVersion.map((m) => m.score))].join(' / ');
    if (movedScore) {
      out.push({
        check: 'cvss', item: it.n, verdict: 'version-swapped',
        claim: `${cl.version} ${cl.score}`,
        detail: `${cl.score} is the ${movedScore.version} score on ${movedScore.id}${movedScore.field ? ` (${movedScore.field})` : ''}; its ${cl.version} metric says ${here || 'nothing'} — quote the version you quote`,
      });
    } else if (!sameVersion.length) {
      out.push({
        check: 'cvss', item: it.n, verdict: 'version-absent',
        claim: `${cl.version} ${cl.score}`,
        detail: `${bound.id} publishes no ${cl.version} score; the record carries ${otherVersion.map((m) => `${m.version} ${m.score}${m.field ? ` (${m.field})` : ''}`).join(', ') || 'none'}`,
      });
    } else {
      out.push({
        check: 'cvss', item: it.n, verdict: 'score-mismatch',
        claim: `${cl.version} ${cl.score}`,
        detail: `${bound.id}'s ${cl.version} score says ${here}${sameVersion[0]?.field ? ` (${sameVersion[0].field})` : ''}`,
      });
    }
  }
  // The absence claim is checked last, bound to the record the sentence is actually about.
  for (const span of noScoreSpans(t)) {
    const subj = bindSubject(span.at, mentions, ctx);
    const own = (subjects.get(subj?.id)?.metrics ?? []).filter((m) => m.score > 0 || m.field?.startsWith('cvss_severities'));
    const m = own[0] ?? union.filter((x) => x.score > 0)[0];
    if (!m) continue;
    out.push({
      check: 'cvss', item: it.n, verdict: 'absence-contradicted',
      claim: `prose says "${span.text}"`,
      detail: `${m.id} carries ${m.version} ${m.score} in ${m.field ?? `${m.type}/${m.source}`} — name the field, not the absence (a null in one field is not an absence)`,
    });
    break; // one finding per item is enough to open the question
  }
  /* A `Primary`/`Secondary` mention is a style defect ONLY where the slot stands in for a source.
     An item that says the rule out loud — "Primary/Secondary is a slot position, not a provenance" —
     is quoting the correction, not making the mistake, and three such items fired on the 10-26
     20:34 batch. The same sentence that names the slot must also say what it is. */
  if (claims.length && /\b(?:Primary|Secondary)\b/.test(t)) {
    const states = sentences(t).map((r) => t.slice(r.start, r.end)).filter((s) => /\b(?:Primary|Secondary)\b/.test(s)
      && /\bslot\b|\bposition\b|not\s+a\s+(?:provenance|source|party)\b/i.test(s));
    if (!states.length) {
      out.push({
        check: 'cvss', item: it.n, verdict: 'slot-quoted',
        claim: 'Primary/Secondary',
        detail: 'a metric slot is not a provenance — name the source (CNA / nvd@nist.gov / CISA-ADP) instead',
      });
    }
  }
  return out;
}

// ── check C: repo state ─────────────────────────────────────────────────────────────────────
let cache = {};
try { cache = JSON.parse(readFileSync(CACHE_PATH, 'utf8')); } catch { /* first run */ }
let apiCalls = 0;
const CACHE_TTL_MS = 6 * 3600 * 1000;
const ERROR_TTL_MS = 10 * 60 * 1000;

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

/* A star **delta** is not a star **count** — the second unit error this check made on the same
 * family of numbers. Item 12 of the 2026-10-27 feed reads `GitHub Trending · +312 stars today`
 * beside `**1.4k stars**` in its body: 312 is Trending's day-over-day gain and 1.4k is the total,
 * and the reader took 312 as the total, compared it with the repo's 1,365, and reported a −77%
 * "star-drift" finding against a correct item. Three spellings are now separated: a signed number
 * (`+312`), a number followed by a period word (`today`, `this week`, `per day`), and the `1.4k`
 * suffix that used to be dropped entirely (which is why `1.4k` could not compete with `312`). */
function starQuotesOf(plain) {
  const out = [];
  const re = /([+\-−]?)(\d[\d,]*(?:\.\d+)?)\s*(k)?\s*(?:★|stars?\b)/gi;
  for (const m of plain.matchAll(re)) {
    if (m[1]) continue;                                   // signed → a delta, not a count
    const after = plain.slice(m.index + m[0].length, m.index + m[0].length + 24).toLowerCase();
    if (/^\s*(?:today|yesterday|this\s+(?:day|week|month)|in\s+the\s+(?:last|past)|\/\s*day|per\s+day|so\s+far|overnight|a\s+day)/.test(after)) continue;
    const n = toNum(m[2]) * (m[3] ? 1000 : 1);
    if (Number.isFinite(n)) out.push(n);
  }
  return out;
}

function checkRepo(it, budget) {
  const out = [];
  const starQuotes = starQuotesOf(it.plain);
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

/* A count on a page can appear in three spellings, and reading only one of them manufactures
 * false findings. `N skills` is the easy one. `N-skill analyzed subset` (a hyphenated compound,
 * singular head) and a table cell are the same claim. Measured 2026-10-26 on the 20:34 batch:
 * SkillSpector's README says "In the 31,132-skill analyzed subset … 26.1% of skills contain
 * vulnerabilities" AND "42,447 skills from major marketplaces; 31,132 were analyzed", yet the
 * `\\s+skills` matcher saw only 42,447 and reported the feed's correct 31,132 as `differs`. */
function countNumsIn(body, noun) {
  const stem = noun.replace(/s$/, '');
  const re = new RegExp(`(\\d[\\d,]*)\\s*(?:-|\\s|\\|)\\s*${stem}(?:s|es)?\\b`, 'gi');
  return [...body.matchAll(re)].map((m) => toNum(m[1]));
}

/* A count's NOUN is part of the claim, and a paraphrase is not an absence. Stalwart's own post
 * says "faster in 35 of the 38 headline comparisons"; the feed's title says "wins 35 of 38
 * benchmarks". The number IS on the page the item cites — only the head noun differs — so the
 * README-only `absent` was wrong and so is `differs` (which would claim the page prints another
 * number). Measured 2026-10-27, the first day the cited-page reader covered vendor blogs. */
function numberNeighbours(body, n) {
  const alt = n >= 1000 ? `${n.toLocaleString('en-US')}|${n}` : String(n);
  const re = new RegExp(`\\b(?:${alt})\\b([ \\t]+[\\p{L}\\d][\\p{L}\\d'’-]*(?:[ \\t]+[\\p{L}\\d][\\p{L}\\d'’-]*){0,3})`, 'gu');
  return [...body.matchAll(re)].map((m) => `${n.toLocaleString('en-US')}${m[1]}`.replace(/\s+/g, ' ').trim()).slice(0, 3);
}

/* The claim's source is the page the item CITES, not necessarily the repo it names. Item 43's
 * "1,251 skills released" is the arXiv abstract's sentence; the GitHub README never states it, so
 * a README-only check reported `absent` on a claim that was verbatim true.
 *
 * The list is EVERY page the item cites, not only the two 10-26 special cases. Measured on the
 * 2026-10-27 batch: item 30's "35 of the 38 headline comparisons" is Stalwart's own blog sentence
 * (verifiable: `grep -c` finds it in 114 KB of HTML) and item 31's "32 languages" is in
 * `docs/README.md` — the item's OWN second link — while the lint read only the repo root README
 * and reported both as `absent`. Two false findings of the same shape in one file is a reader
 * defect, not a feed defect.
 *
 * Ranking is not incidental: the cap is 3 pages per item, so a linked Markdown file outranks a
 * landing page (a `.md` blob IS the text; a product page may state nothing), and the order the
 * item lists them breaks ties. HN item pages are skipped — a discussion's numbers are points and
 * comments, never "N benchmarks" — and a repo-root link is skipped because its README is read
 * first anyway. */
const CITED_SKIP = [
  /^https:\/\/news\.ycombinator\.com\/item\?id=/, // a thread's numbers are points/comments
  /^https:\/\/github\.com\/[^/]+\/[^/]+\/?$/,     // repo root — its README is the first read
  /^https:\/\/github\.com\/trending/,             // a rankings page states no artifact count
];
function citedPages(plain) {
  const ranked = [];
  const seen = new Set();
  for (const m of plain.matchAll(/https:\/\/[^\s)\]<>"'`]+/g)) {
    let url = m[0].replace(/[.,;:]+$/, '');
    if (CITED_SKIP.some((re) => re.test(url))) continue;
    let label = url.replace(/^https:\/\/(www\.)?/, '');
    let raw = false;
    let rank = 1;
    const arxiv = /^https:\/\/arxiv\.org\/abs\/(\d{4}\.\d{4,5})(?:v\d+)?/.exec(url);
    const hf = /^https:\/\/huggingface\.co\/datasets\/([\w.-]+\/[\w.-]+)/.exec(url);
    const blob = /^https:\/\/github\.com\/([\w.-]+)\/([\w.-]+)\/blob\/([^/]+)\/([^?#]+)$/.exec(url);
    const rawGh = /^https:\/\/raw\.githubusercontent\.com\/([\w.-]+)\/([\w.-]+)\/([^/]+)\/([^?#]+)$/.exec(url);
    if (arxiv) {
      url = `https://arxiv.org/abs/${arxiv[1]}`;
      label = `arXiv ${arxiv[1]}`;
      rank = 0;
    } else if (hf) {
      url = `https://huggingface.co/datasets/${hf[1]}/raw/main/README.md`;
      label = `HF dataset ${hf[1]}`;
      raw = true;
      rank = 0;
    } else if (blob) {
      // the file's own text, fetched raw — a docs file is the readable twin of its rendered page
      url = `https://raw.githubusercontent.com/${blob[1]}/${blob[2]}/${blob[3]}/${blob[4]}`;
      label = `${blob[1]}/${blob[2]} ${blob[4]}`;
      raw = true;
      rank = 0;
    } else if (rawGh) {
      label = `${rawGh[1]}/${rawGh[2]} ${rawGh[4]}`;
      raw = true;
      rank = 0;
    }
    if (seen.has(url)) continue;
    seen.add(url);
    ranked.push({ url, label, raw, rank });
  }
  return ranked.sort((a, b) => a.rank - b.rank).slice(0, 3).map(({ rank, ...p }) => p);
}

async function citedPageText(page) {
  const key = `page:${page.url}`;
  const hit = cache[key];
  if (hit && Date.now() - Date.parse(hit.fetched_at) < CACHE_TTL_MS) return hit;
  let text = '';
  try {
    const r = await fetch(page.url, { signal: AbortSignal.timeout(20_000) });
    citedPages_requests += 1;
    if (r.ok) {
      const body = (await r.text()).slice(0, 3_000_000);
      // An abs page is HTML: keep its text, drop the tags, so a `<blockquote>` abstract reads as prose.
      // `<style>`/`<noscript>` go too — a stylesheet's tokens can spell a noun next to a number.
      text = page.raw ? body : body
        .replace(/<(script|style|noscript|svg)[\s\S]*?<\/\1>/gi, ' ')
        .replace(/<[^>]+>/g, ' ')
        .replace(/&nbsp;|&#160;/g, ' ')
        .replace(/&amp;/g, '&').replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"')
        .replace(/&lt;/g, '<').replace(/&gt;/g, '>');
    }
  } catch { /* unreadable is a state, not an absence — it is reported as unread this run */ }
  cache[key] = { fetched_at: new Date().toISOString(), bytes: text.length, text };
  return cache[key];
}
let citedPages_requests = 0;

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
  const unresolved = [];
  for (const cl of claims) {
    const anyNum = countNumsIn(body, cl.noun);
    if (anyNum.includes(cl.n)) {
      out.push({ check: 'count', item: it.n, verdict: 'ok', claim: cl.phrase, detail: `README states it` });
    } else {
      unresolved.push({ cl, anyNum });
    }
  }
  if (unresolved.length) {
    const pages = citedPages(it.plain);
    const fetched = [];
    for (const p of pages) {
      if (NO_NET) break;
      const t = await citedPageText(p);
      if (t.text) fetched.push({ ...p, text: t.text });
    }
    for (const { cl, anyNum } of unresolved) {
      const hit = fetched.find((p) => countNumsIn(p.text.replace(/&nbsp;/g, ' '), cl.noun).includes(cl.n));
      if (hit) {
        out.push({ check: 'count', item: it.n, verdict: 'ok-cited-page', claim: cl.phrase, detail: `${hit.label} states it (the repo README does not) — quote the page the number came from` });
      } else if (anyNum.length) {
        out.push({ check: 'count', item: it.n, verdict: 'differs', claim: cl.phrase, detail: `README says ${[...new Set(anyNum)].join(' / ')} ${cl.noun}${fetched.length ? `; also read ${fetched.map((p) => p.label).join(', ')}` : ''}` });
      } else if (fetched.some((p) => numberNeighbours(p.text.replace(/&nbsp;/g, ' '), cl.n).length)) {
        const hit = fetched.find((p) => numberNeighbours(p.text.replace(/&nbsp;/g, ' '), cl.n).length);
        const snips = numberNeighbours(hit.text.replace(/&nbsp;/g, ' '), cl.n);
        out.push({ check: 'count', item: it.n, verdict: 'number-other-noun', claim: cl.phrase, detail: `${cl.n} is on ${hit.label} as “${snips[0]}” — the page's head noun is not “${cl.noun}”, so this is the feed's paraphrase rather than the page's wording; quote what the page says` });
      } else {
        out.push({ check: 'count', item: it.n, verdict: 'absent', claim: cl.phrase, detail: `no count of ${cl.noun} on ${['README of ' + it.repos[0], ...fetched.map((p) => p.label)].join(' or ')}${pages.length > fetched.length ? ' (some cited pages were unreadable this run — unread is not absent)' : ''} — count it yourself, or say "no page states a total"` });
      }
    }
  }
  return out;
}

// ── `--ghsa-census`: measure the field model instead of asserting it ────────────────────────
if (has('ghsa-census')) {
  const pages = Number(arg('pages') ?? 1);
  const rows = [];
  for (let p = 1; p <= pages; p++) {
    const raw = execFileSync('gh', ['api', `advisories?per_page=100&page=${p}&sort=published&direction=desc`], { encoding: 'utf8', timeout: 60_000, maxBuffer: 64 * 1024 * 1024 });
    apiCalls += 1;
    rows.push(...JSON.parse(raw));
    if (p < pages) await new Promise((r) => setTimeout(r, 500));
  }
  const g = (a, k) => (a.cvss_severities ?? {})[k] ?? {};
  const real = (o) => o.score != null && !(o.score === 0 && !o.vector_string);
  let legacyNull = 0, sevPop = 0, one = 0, both = 0, neither = 0, sentinel4 = 0, sentinel3 = 0, noCve = 0, bandBad = 0;
  const band = (s) => (s >= 9 ? 'critical' : s >= 7 ? 'high' : s >= 4 ? 'medium' : s > 0 ? 'low' : 'none');
  for (const a of rows) {
    const legacy = a.cvss?.score ?? null;
    if (legacy == null) legacyNull += 1;
    if (a.cvss_severities) sevPop += 1;
    const r3 = real(g(a, 'cvss_v3'));
    const r4 = real(g(a, 'cvss_v4'));
    if (r3 && r4) both += 1; else if (r3 || r4) one += 1; else neither += 1;
    if (g(a, 'cvss_v4').score === 0 && !g(a, 'cvss_v4').vector_string) sentinel4 += 1;
    if (g(a, 'cvss_v3').score === 0 && !g(a, 'cvss_v3').vector_string) sentinel3 += 1;
    if (!a.cve_id) noCve += 1;
    const sc = r4 ? g(a, 'cvss_v4').score : r3 ? g(a, 'cvss_v3').score : null;
    if (sc != null && a.severity && band(sc) !== a.severity) bandBad += 1;
  }
  const n = rows.length;
  const pct = (x) => `${x}/${n} (${((x / n) * 100).toFixed(1)}%)`;
  const dates = rows.map((a) => (a.published_at ?? '').slice(0, 10)).sort();
  console.log(`\nGHSA field census — ${n} advisories, published ${dates[0]} → ${dates.at(-1)}`);
  console.log(`  legacy cvss.score null          ${pct(legacyNull)}`);
  console.log(`  cvss_severities populated       ${pct(sevPop)}`);
  console.log(`  exactly one slot scored         ${pct(one)}   both: ${both}   neither: ${neither}`);
  console.log(`  sentinel {0.0, no vector}       cvss_v4: ${pct(sentinel4)}   cvss_v3: ${pct(sentinel3)}`);
  console.log(`  no CVE id                       ${pct(noCve)}`);
  console.log(`  severity label ≠ score band     ${pct(bandBad)}`);
  console.log(`\napi.github.com calls: ${apiCalls}`);
  process.exit(0);
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
  t('hyphenated pull-request is a named split', checkIssues(mk('t', 'mined from **57,240 issue and pull-request threads** across 1,774 repos')).map((x) => x.verdict), ['ok']);

  // star quotes — a delta and a total are different units (the item-12 false finding)
  t('star delta is not a count', starQuotesOf(strip('Source: GitHub Trending · +312 stars today · nightly-labs')), []);
  t('k-suffix is read as thousands', starQuotesOf(strip('**1.4k stars**, **174 forks**')), [1400]);
  t('plain total survives', starQuotesOf(strip('1,030 stars and 12.5k★')), [1030, 12500]);
  t('week delta skipped', starQuotesOf(strip('up 900 stars this week')), []);

  // repo-slug extraction — the 10-27 arity false positive and what must still be a repo
  const slugs = (s) => parseItems(`## 1. t\n\n${s}\n`)[0].repos.sort();
  t('erlang arity is not a repo', slugs('`merge_ssl_opts/3` and `partial_chain/1` in `hackney_ssl:partial_chain/1`'), []);
  t('elixir arity is not a repo', slugs('`Enum.map/2` and `String.split/3`'), []);
  t('real repo slug survives', slugs('`obra/superpowers` and `zip-rs/zip2`'), ['obra/superpowers', 'zip-rs/zip2']);
  t('github url is still a repo', slugs('[advisory](https://github.com/padok-team/burrito/security/advisories/GHSA-x)'), ['padok-team/burrito']);
  t('file path is not a repo', slugs('`src/lib/json.js` and `docs/readme.md`'), []);

  const ver = (s) => extractCvss(s).map((c) => `${c.version}:${c.score}`).sort();
  t('score (CVSS v)', ver('scored **9.1 (CVSS 3.1)**'), ['3.1:9.1']);
  t('version then score', ver('**3.1 5.9** and **4.0 8.2**'), ['3.1:5.9', '4.0:8.2']);
  t('score on version', ver('9.2 on CVSS 4.0 and 8.1 on 3.1'), ['3.1:8.1', '4.0:9.2']);
  t('release number is not a version', ver('affected >= 1.37, <= 1.74.1, patched 1.74.2'), []);
  t('out-of-range score dropped', ver('CVSS 4.0 11.4'), []);

  // subject binding — a score belongs to an identifier, not to the item
  const men = (s) => idMentions(s);
  const bind = (s) => bindSubject(s.indexOf('SCORE'), men(s));
  t('bind: score after its own id',
    bind('see CVE-2026-111111 for 1 point and CVE-2026-222222, rated SCORE nine').id, 'CVE-2026-222222');
  t('bind: GHSA nearest wins over a distant CVE',
    bind('CVE-2026-55677 was an earlier bypass. GHSA-cxf3-9h37-7rr8 is the one, SCORE critical').id, 'GHSA-cxf3-9h37-7rr8');
  t('bind: single id gets every claim',
    bind('GHSA-5x8w-8jj5-q52h, SCORE').id, 'GHSA-5x8w-8jj5-q52h');
  t('bind: no id at all', bind('SCORE with no identifier'), null);

  // sentence scope + declared subject — the shape that mis-bound item 26
  const ctxOf = (s) => ({ sents: sentences(s), primary: primarySubject(s, idMentions(s)) });
  const bind2 = (s) => {
    const t = s.replace(/\*\*|\*|`/g, '');
    return bindSubject(t.indexOf('SCORE'), idMentions(t), ctxOf(t))?.id ?? null;
  };
  const echo = '- Source: GitHub Advisory GHSA-cxf3-9h37-7rr8\n\nCritical **9.1 on CVSS 4.0** is the score. '
    + 'What disagrees is the schema. '
    + 'The class is the real story: the list carries one CVE-identified issue (CVE-2026-55677, an encoded bypass). SCORE here.';
  t('bind: a distant passing CVE loses to the declared subject', bind2(echo.split(' SCORE')[0] + ' SCORE'), 'GHSA-cxf3-9h37-7rr8');
  t('bind: a same-sentence id still wins', bind2('SCORE CVE-2026-111111 is the one'), 'CVE-2026-111111');
  t('primary: Source line before title before first mention',
    primarySubject('t CVE-2026-999999\n\n- Source: NVD CVE-2026-111111\nbody', idMentions('t CVE-2026-999999\n\n- Source: NVD CVE-2026-111111\nbody')).id,
    'CVE-2026-111111');

  // the GHSA field model: a null in one field is not an absence, and 0.0 is a sentinel
  const fm = (o) => advisoryMetrics(o).map((m) => `${m.version}:${m.score}:${m.field}`);
  t('field: legacy null, v4 carries the score',
    fm({ cvss: { score: null, vector_string: null }, cvss_severities: { cvss_v3: { score: 0.0, vector_string: null }, cvss_v4: { score: 9.1, vector_string: 'CVSS:4.0/AV:N' } } }),
    ['4.0:9.1:cvss_severities.cvss_v4']);
  t('field: sentinel 0.0 is dropped, both slots present',
    fm({ cvss: { score: 6.1, vector_string: 'CVSS:3.1/AV:N' }, cvss_severities: { cvss_v3: { score: 6.1, vector_string: 'CVSS:3.1/AV:N' }, cvss_v4: { score: 0.0, vector_string: null } } }),
    ['3.1:6.1:cvss (legacy mirror of cvss_v3)', '3.1:6.1:cvss_severities.cvss_v3']);
  t('field: a genuine 0.0 with a vector is a score',
    fm({ cvss: { score: 0.0, vector_string: 'CVSS:3.1/AV:N/AC:H/PR:H/UI:N/S:U/C:N/I:N/A:N' }, cvss_severities: {} }),
    ['3.1:0:cvss (legacy mirror of cvss_v3)']);

  // the absence claim — the sentence that shipped twice
  t('absence: "carries no CVSS" is detected', assertsNoScore('the advisory carries no CVSS at all'), true);
  t('absence: a field-level null is NOT an absence claim',
    assertsNoScore('the cvss field is null while cvss_severities holds the score'), false);

  // a slot named AS a slot is compliance, not a style defect (three items fired on this 10-26)
  const emptySubj = new Map([['CVE-2026-111111', { kind: 'cve', status: 'Deferred', metrics: [] }]]);
  const slots = (s) => checkCvss(mk('t', s), emptySubj).map((x) => x.verdict).filter((v) => v === 'slot-quoted');
  t('slot: naming the slot as a slot is compliance',
    slots('CVE-2026-111111 is 9.2 on CVSS 4.0. Primary/Secondary is a slot position, not a provenance.'), []);
  t('slot: quoting a slot as a source still fires',
    slots('CVE-2026-111111 is 9.2 on CVSS 4.0, from the Primary metric.'), ['slot-quoted']);

  // the score's own arithmetic (built 2026-10-27; 4,461/4,461 NVD metrics reproduce over a week)
  const reproSubj = (score) => new Map([['CVE-2026-222222', { kind: 'cve', status: 'Analyzed', metrics: [
    { version: '3.1', type: 'Primary', source: 'nvd@nist.gov', score, vector: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H' },
  ] }]]);
  const repro = (score) => checkCvss(mk('t', `CVE-2026-222222 is 9.9 on CVSS 3.1.`), reproSubj(score)).map((x) => x.verdict);
  t('repro: a stored score its own vector yields passes and says so',
    checkCvss(mk('t', 'CVE-2026-222222 is 10.0 on CVSS 3.1.'), reproSubj(10.0)).map((x) => x.detail.includes('vector reproduces')), [true]);
  t('repro: a stored score its vector does not yield is a finding', repro(9.9), ['score-not-reproducible']);
  t('repro: no vector is unverifiable, never a finding',
    checkCvss(mk('t', 'CVE-2026-222222 is 9.9 on CVSS 3.1.'), new Map([['CVE-2026-222222', { kind: 'cve', status: 'Analyzed', metrics: [
      { version: '3.1', type: 'Primary', source: 'nvd@nist.gov', score: 9.9 }] }]])).map((x) => x.verdict), ['ok']);

  // the count matcher — three spellings of one claim (measured 2026-10-26 on the 20:34 batch)
  t('count: "N skills" is read', countNumsIn('a dataset of 42,447 skills from major marketplaces', 'skills'), [42447]);
  t('count: "N-skill analyzed subset" is the same claim', countNumsIn('In the 31,132-skill analyzed subset, 26.1% carry one', 'skills'), [31132]);
  t('count: "N were analyzed" is a different sentence, not read', countNumsIn('31,132 were analyzed for the following rates', 'skills'), []);
  t('count: both spellings together do not double-count a claim',
    [...new Set(countNumsIn('42,447 skills; 31,132-skill subset', 'skills'))], [42447, 31132]);
  t('cited pages: arXiv abs is a source for a count', citedPages('see https://arxiv.org/abs/2610.32322 for it').map((p) => p.label), ['arXiv 2610.32322']);
  t('cited pages: a HF dataset card is read raw', citedPages('https://huggingface.co/datasets/EverMind-AI/skillcorpus-lifecycle').map((p) => p.raw), [true]);
  // measured 2026-10-27: item 31's "32 languages" is in docs/README.md, the item's own second link
  t('cited pages: a linked docs file is fetched raw, not rendered',
    citedPages('[`docs`](https://github.com/FrigadeHQ/hob/blob/main/docs/README.md)').map((p) => [p.url, p.raw]),
    [['https://raw.githubusercontent.com/FrigadeHQ/hob/main/docs/README.md', true]]);
  t('cited pages: a repo root is skipped (its README is already read)',
    citedPages('https://github.com/FrigadeHQ/hob · https://github.com/FrigadeHQ/hob/releases/tag/v0.2.1').map((p) => p.url),
    ['https://github.com/FrigadeHQ/hob/releases/tag/v0.2.1']);
  t('cited pages: an HN thread is not a count source',
    citedPages('https://news.ycombinator.com/item?id=50245945').length, 0);
  t('cited pages: a linked file outranks a landing page under the cap',
    citedPages('https://stalw.art/blog/stalwart-1-0/ and https://github.com/stalwartlabs/stalwart/blob/main/README.md').map((p) => p.label),
    ['stalwartlabs/stalwart README.md', 'stalw.art/blog/stalwart-1-0/']);
  // measured 2026-10-27 on item 30: the feed's "38 benchmarks" is the post's "35 of the 38 headline comparisons"
  t('count: the number on the page with another head noun is reported, not called absent',
    numberNeighbours('Stalwart is faster in 35 of the 38 headline comparisons.', 38), ['38 headline comparisons']);
  t('count: a number in an unrelated token is still found (the caller decides what it means)',
    numberNeighbours('released 2026-10-38 by someone', 38).length, 1);

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
let ghsaCalls = 0;
if (!NO_NET && CHECKS.has('cvss')) {
  const cves = [...new Set(parsed.flatMap((f) => f.items.flatMap((it) => it.cves)))];
  const CHUNK = 25;
  for (let i = 0; i < cves.length; i += CHUNK) {
    if (i) await new Promise((r) => setTimeout(r, 6_500));
    try { for (const [k, v] of nvdBatch(cves.slice(i, i + CHUNK))) nvd.set(k, v); nvdCalls += 1; } catch { /* offline or rate-limited; the cvss check reports no-record rather than a wrong verdict */ }
  }
  // GHSA subjects: one call per id an item actually names (a CVE-less GHSA is a subject with no
  // other way in), capped and cached — so a re-run inside the TTL costs nothing.
  const ghsas = [...new Set(parsed.flatMap((f) => f.items.flatMap((it) => strip(it.text).match(GHSA_RE) ?? [])))].slice(0, MAX_GHSA);
  for (const id of ghsas) {
    const before = apiCalls;
    advisoryState(id);
    if (apiCalls > before) ghsaCalls += 1;
    await new Promise((r) => setTimeout(r, 400));
  }
}
const subjects = new Map();
for (const [id, rec] of nvd) subjects.set(id, { kind: 'cve', status: rec.status, metrics: rec.metrics });
for (const id of new Set(parsed.flatMap((f) => f.items.flatMap((it) => strip(it.text).match(GHSA_RE) ?? [])))) {
  const rec = cache[`ghsa:${id}`];
  if (rec) subjects.set(id, { kind: 'ghsa', ...rec });
}

for (const { path: p, items } of parsed) {
  const findings = [];
  const budget = { left: MAX_REPOS };

  for (const it of items) {
    if (CHECKS.has('issues')) findings.push(...checkIssues(it));
    if (!NO_NET && CHECKS.has('cvss')) findings.push(...checkCvss(it, subjects));
  }
  if (!NO_NET && CHECKS.has('repo')) for (const it of items) findings.push(...checkRepo(it, budget));
  if (!NO_NET && CHECKS.has('count')) for (const it of items) findings.push(...await checkCount(it));

  perFile.push({ file: basename(p), items: items.length, findings });
  allFindings.push(...findings.map((f) => ({ file: basename(p), ...f })));
}

try { mkdirSync(dirname(CACHE_PATH), { recursive: true }); writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 1)); } catch { /* cache is best-effort */ }

const SEVERITY = { ok: 0, 'ok-cited-page': 0, 'no-cve-named': 1, 'no-record': 1, 'slot-quoted': 1, 'number-other-noun': 1, 'star-drift': 2, stale: 2, archived: 2, differs: 2, absent: 2, 'unsplit-issue-count': 3, 'compound-lags-parts': 3, 'version-swapped': 3, 'version-absent': 3, 'score-not-reproducible': 2, 'score-mismatch': 3, 'wrong-subject': 3, 'absence-contradicted': 3, 'advisory-unreadable': 1, unreadable: 1, 'artifact-unreadable': 1, 'nvd-unavailable': 1 };
const REAL = (f) => (SEVERITY[f.verdict] ?? 1) >= 2;

const summary = { generated: new Date().toISOString(), files: perFile, api_calls: apiCalls, readme_calls: readmeCalls, cited_page_calls: citedPages_requests, nvd_calls: nvdCalls };
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
