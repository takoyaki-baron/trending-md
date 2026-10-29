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
 *   F. STOPPING POINTS (`--check temporal`) — ONE VECTOR CAN YIELD THREE NUMBERS AND NVD PUBLISHES
 *      ONLY ONE OF THEM. `CVE-2026-107656` (FortiSandbox, 2026-10-27 batch) is the calibration:
 *      Fortinet's own container stores `baseScore: 9.6` beside
 *      `CVSS:3.1/…/E:F/RL:O/RC:C`, while NVD re-serves the same source at **9.8** with the three
 *      temporal components **stripped**. Three numbers, one vector — base **9.8**, base × E
 *      **9.6**, and the full temporal score **9.1**. Recomputing the base can therefore never
 *      confirm or refute a 9.6, and checking only NVD cannot even see it. So the check reports the
 *      RECORD SHAPE rather than the prose: for every CVE in the item whose CNA container carries a
 *      temporal vector, it prints all three stopping points and the number NVD re-serves, and asks
 *      the writer to name which one is quoted.
 *      The equation is v3.1's own (§7.2), read off FIRST's specification on 2026-10-27:
 *      `TemporalScore = Roundup(BaseScore × E × RL × RC)` — a SINGLE Roundup over the flat
 *      product. (Recomputing step by step gives 9.2 and is wrong for 3.1; a first draft here
 *      asserted that from memory of the v3.0 layout, which is why the weights and the formula are
 *      quoted from the spec page rather than recalled.) The weights are the spec's table, and the
 *      one worth pinning is **RL:W = 0.97**, not the 0.95 an "official fix" neighbour suggests.
 *      A CNA metric is also a subject in its own right: when NVD does not carry a quoted score but
 *      the CNA container does, the verdict is `cna-only-score` (naming the container) rather than
 *      `version-absent` — the record's absence is not the vendor's.
 *
 *   G. BUNDLE COUNT (`--check bundle`) — a count of MATCHES is not a count of OBJECTS. The 10-29
 *      feed published `/etc/ssl/cert.pem` as carrying "**8** `emSign` matches"; 8 was right as a
 *      LINE count and wrong as a CERTIFICATE count, because that bundle is an `openssl x509 -text`
 *      dump where each root prints its name twice (`=== /C=…/CN=…` and `Subject: …`). Measured on
 *      the host: **128** certificates, **8** emSign lines, **4** emSign certificates. The check
 *      loads the bundle the item NAMES and compares a quoted number against matching certificates
 *      and matching lines separately; `bundle-line-count` (sev 3) is the defect, `bundle-lines-named`
 *      (sev 0) is the same number with the operation named — the disclosure is the fix. Three
 *      guards keep it quiet: a bundle with no name metadata (Debian's bare `ca-certificates.crt`)
 *      can produce no match and says nothing; a number binds to the NEAREST path token in its own
 *      sentence, so a second store ("the keychain holds 154 … while the file holds 128") is not
 *      scored against the wrong bundle; and a total is only read against the bundle when a total
 *      VERB precedes it and no subset qualifier is present — "there are 4 certificates" is a subset
 *      and reported the correction as the defect on the first live run. Local-only, no network.
 *
 *   B (continued). A GHSA that is **not in the global Advisory Database** is still very often a
 *      readable primary: `github.com/<owner>/<repo>/security/advisories/<id>` renders server-side,
 *      so `advisory-unreadable` was a finding about the checker. Measured 2026-10-29 on
 *      `GHSA-49hg-9qhc-4623` (OpenPanel): API **404**, page **200** with `Severity: critical`, the
 *      vector, `patched 3.16.2` and `CVE ID: No known CVE`. The verdict for a page that renders is
 *      `advisory-repo-only` (sev 0), and the score is RECOMPUTED from the page's own vector — which
 *      is how this fallback can confirm a number the API cannot see, and how the item's "no CVE id"
 *      claim gets checked against the advisory's own CVE-ID row.
 *
 * Usage:
 *   node agent/tools/claim-unit-lint.mjs --file en/feed/2026-10-26.md
 *   node agent/tools/claim-unit-lint.mjs --file … --no-net            # check A only (prose)
 *   node agent/tools/claim-unit-lint.mjs --file … --check cvss,repo   # subset
 *   node agent/tools/claim-unit-lint.mjs --file … --check bundle      # local PEM bundle counts
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
import { judge, recompute, roundup31 } from './cvss-recompute.mjs';

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
const MAX_AGE = Number(arg('max-age') ?? 3);
const MAX_GHSA = Number(arg('max-ghsa') ?? 6);
// cveawg is unmetered but not free: one request per CVE, cached 6h, and the cap keeps a
// 200-CVE census from turning the pre-commit lint into a crawler.
const MAX_CNA = Number(arg('max-cna') ?? 30);
const CACHE_PATH = arg('cache') ?? 'agent/data/claim-unit-cache.json';
const CHECKS = new Set((arg('check') ?? 'issues,cvss,temporal,repo,count,bundle').split(',').map((s) => s.trim()));

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
  // A **hostname** is not an owner: GitHub logins allow alphanumerics and hyphens only, so a dot in
  // the first segment is never a repo and is almost always a site path quoted in backticks —
  // `pkgs.tailscale.com/stable` spent an `api.github.com` call on `repos/pkgs.tailscale.com/stable`
  // and returned a bogus `unreadable` finding against a correct item (measured 2026-10-28, item 21).
  if (a.includes('.')) return null;
  // A **GitHub path segment** is not an owner either: `advisories/GHSA-m8xf-2cr7-77ph` is a route
  // on github.com, not a repository (measured the same run, item 22 — second bogus `unreadable`).
  // `GHSA-…` in the second slot is the advisory id, for the same reason.
  if (GH_PATH_SEGMENTS.has(a.toLowerCase())) return null;
  if (/^GHSA-/i.test(b)) return null;
  return a && b ? raw : null;
}
const GH_PATH_SEGMENTS = new Set([
  'advisories', 'security', 'releases', 'blob', 'tree', 'issues', 'pull', 'pulls', 'commit', 'commits',
  'actions', 'raw', 'tags', 'settings', 'sponsors', 'topics', 'features', 'about', 'orgs', 'marketplace',
  'search', 'network', 'forks', 'stargazers', 'watchers', 'discussions', 'wiki', 'compare', 'apps', 'blog',
]);

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
      // A github.com **route** looks exactly like a repository in a URL: `github.com/advisories/
      // GHSA-…` is the Advisory Database's page for an advisory, not `advisories/GHSA-…` the repo —
      // it cost an api.github.com call and produced a bogus `unreadable` finding on item 22 (10-28).
      if (GH_PATH_SEGMENTS.has(m[1].toLowerCase())) continue;
      if (/^GHSA-/i.test(m[2])) continue;
      repos.add(slug);
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
/* `11 issues` is a tracker count only some of the time. The measured counterexample (2026-10-28,
 * item 31) is **review findings**: Anthropic's life-sciences post says Claude "caught all 11 issues
 * that human reviewers had spotted", and the reader reported an unsplit `open_issues_count` against
 * an item that names no repository and no tracker at all — a finding about the checker. Two
 * suppressors, both narrow: (a) a **review verb** immediately before the number (`caught`,
 * `flagged`, `missed`, …) means defects in a document, not rows in a tracker; (b) a bare `N issues`
 * with no `open` and no repo slug in the item is unverifiable *and* semantically ambiguous, so it is
 * not a finding. `3,286 open issues` still fires — `open` is the tracker's own word. */
const REVIEW_VERB = /\b(?:caught|found|flagged|spotted|missed|identified|raised|addresses|addressed|fixed|fixed\s+all)\b[^.;]{0,28}$/i;
function checkIssues(it) {
  const out = [];
  const t = it.plain;
  const issueQuotes = [];
  // "pull requests", "pull-request" and "PRs" are the same word; a hyphen-blind pattern reported
  // arXiv's "57,240 issue and pull-request threads" as an unsplit count (measured 2026-10-26).
  const namesSplit = /\bissues?\b[^.\n]{0,40}\b(?:PRs?|pulls?[- ]requests?)\b|\b(?:PRs?|pulls?[- ]requests?)\b[^.\n]{0,40}\bissues?\b/i.test(t);
  const re = new RegExp(`${NUM}\\s+(?:open\\s+)?issues?\\b`, 'gi');
  for (const m of t.matchAll(re)) {
    const after = t.slice(m.index + m[0].length, m.index + m[0].length + 24).toLowerCase();
    if (/^ per /.test(after)) continue; // a ratio, not a count
    const isTrackerWorded = /\bopen\s+issues?\b/i.test(m[0]);
    // `open issues` is the tracker's own word, so it is a count whatever verb precedes it; only a
    // bare `N issues` is ambiguous enough for the two suppressors below to apply, and a named split
    // is itself the anchor (a count of tracker rows, stated correctly).
    if (!isTrackerWorded && !namesSplit) {
      if (REVIEW_VERB.test(t.slice(Math.max(0, m.index - 44), m.index))) continue; // defects, not tracker rows
      if (!it.repos.length) continue; // no tracker anchor anywhere in the item
    }
    issueQuotes.push({ n: toNum(m[1]), at: m.index, ph: m[0] });
  }
  if (!issueQuotes.length) return out;
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

/** The sentence a claim lives in — used to read a disclosure the item makes about itself. */
function sentenceAround(t, phrase) {
  const i = t.indexOf(phrase);
  if (i < 0) return '';
  const r = sentences(t).find((s) => i >= s.start && i < s.end);
  return r ? t.slice(r.start, r.end) : t.slice(Math.max(0, i - 200), i + 200);
}

/** An item that says it counted the number itself is not claiming a page says it. */
const SELF_COUNTED = /\b(?:counted (?:from|it|them|myself|by hand)|no page states (?:a |the )?total|nothing states a total|count(?:ed)? (?:from|off) the (?:manifest|README|file|page)|a total counted|(?:block|field|key|frontmatter|metadata)\s+(?:lists|carries|has|holds|contains)\s+\d+)\b/i;

/* The disclosure can live in the body while the NUMBER lives in the title — item 35's headline is
 * "36 language tags" and its justification is a body sentence, "the card's `language:` block lists
 * 36 codes". Keying only on the claim's own phrase reads the title, finds no admission, and calls
 * the item's own census an unsupported count. So: a sentence carrying the disclosure must also
 * carry the same NUMBER. That is what keeps this from over-suppressing — an item may say "counted
 * from the manifest" about 24 while a different 36 stays a claim. */
function selfCountedNear(t, claim) {
  if (SELF_COUNTED.test(sentenceAround(t, claim.phrase))) return true;
  const n = String(claim.n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const re = new RegExp(`(?<![\\d,.])${n.replace(/,/g, ',?')}(?![\\d,])`);
  return sentences(t).some((s) => {
    const sentence = t.slice(s.start, s.end);
    return re.test(sentence) && SELF_COUNTED.test(sentence);
  });
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

/* A GHSA that is **not in the global Advisory Database** is still very often a readable
 * PRIMARY — `github.com/<owner>/<repo>/security/advisories/<id>` renders server-side with the
 * severity label, the CVSS vector, the affected/patched cells and a `CVE ID` row. Measured
 * 2026-10-29 on `GHSA-49hg-9qhc-4623` (OpenPanel, feed item 13): `api.github.com/advisories/<id>`
 * → **404**, while the repo page → **200** with 7,093 chars of text, `Severity: critical`,
 * `CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:C/C:H/I:H/A:H`, `patched 3.16.2`, and `CVE ID: No known CVE`.
 * So the check's `advisory-unreadable` was a finding about the CHECKER: not-ingested is a state,
 * and "I could not read it" was false. The verdict for the readable-but-uningested page is
 * `advisory-repo-only`, and it recomputes the score from the page's own vector rather than
 * reading the widget that prints it — which is why this fallback can CONFIRM a number the API
 * cannot see. Cached 6h; one unmetered `github.com` fetch per CVE-less advisory actually cited. */
function repoAdvisory(it, id) {
  const key = `repoghsa:${id}`;
  const hit = cache[key];
  if (hit && Date.now() - Date.parse(hit.fetched_at) < CACHE_TTL_MS) return hit;
  const want = new RegExp(`github\\.com/([\\w.-]+)/([\\w.-]+)/security/advisories/${id}`);
  const m = want.exec(it.text);
  if (!m) { cache[key] = { fetched_at: new Date().toISOString(), error: 'no-page-in-item' }; return cache[key]; }
  // A repo advisories page is the ONLY address for an advisory whose global record is missing, so
  // the URL the item cites is the whole derivation — there is nothing to guess.
  let html;
  try {
    html = execFileSync('curl', ['-sS', '-m', '20', `https://github.com/${m[1]}/${m[2]}/security/advisories/${id}`],
      { encoding: 'utf8', maxBuffer: 8 * 1024 * 1024 });
    repoCalls += 1;
  } catch (e) {
    cache[key] = { fetched_at: new Date().toISOString(), error: 'fetch-failed' };
    return cache[key];
  }
  const rec = { fetched_at: new Date().toISOString(), ...parseRepoAdvisory(html) };
  if (!rec.severity && !rec.vector) { cache[key] = { fetched_at: new Date().toISOString(), error: 'not-an-advisory-page' }; return cache[key]; }
  cache[key] = rec;
  return rec;
}

/** The page's own fields. Split out so the selftest can pin the markers without a network call. */
function parseRepoAdvisory(html) {
  const g = (re) => re.exec(html)?.[1]?.trim() ?? null;
  return {
    severity: g(/title="Severity:\s*([A-Za-z]+)"/),
    vector: g(/\b(CVSS:[34]\.[01]\/[^<\s"]+)/),
    published_at: g(/<relative-time datetime="([^"]+)"/),
    cve_id: g(/CVE ID<\/h3>\s*<div class="[^"]*"[^>]*>\s*([^<]*?)\s*</),
    package: g(/Package<\/h2>\s*<div\s*>\s*<span[^>]*>([^<]*)</),
    affected: g(/Affected versions<\/h2>\s*<div class="[^"]*"\s*>([^<]*)</),
    patched: g(/Patched versions<\/h2>\s*<div class="[^"]*"\s*>([^<]*)</),
  };
}

// ── check F helpers: the CNA container + the stopping points of one vector ──────────────────
/* FIRST, CVSS v3.1 specification §7.2, read off the page on 2026-10-27:
 *   TemporalScore = Roundup (BaseScore × ExploitCodeMaturity × RemediationLevel × ReportConfidence)
 * ONE Roundup over the flat product — not the step-by-step form a v3.0 memory supplies (that
 * recomputes CVE-2026-107656 to 9.2 instead of the spec's 9.1). The weights are that page's own
 * table; the one worth pinning in a test is **RL:W = 0.97**, next to an Official Fix's 0.95. */
const TEMPORAL_W = {
  E: { X: 1, H: 1, F: 0.97, P: 0.94, U: 0.91 },
  RL: { X: 1, U: 1, W: 0.97, T: 0.96, O: 0.95 },
  RC: { X: 1, C: 1, R: 0.96, U: 0.92 },
};
const TEMPORAL_NAME = { E: 'Exploit Code Maturity', RL: 'Remediation Level', RC: 'Report Confidence' };

/**
 * Every number one v3.x vector can honestly yield, in increasing order of application:
 * base, then base × each temporal component applied so far (each with its own Roundup, which is
 * what "the score if only these were applied" means), and the full temporal score.
 * Returns null when the vector carries no temporal component — nothing to disambiguate.
 */
function temporalStops(vector) {
  const body = String(vector ?? '').replace(/^CVSS:[^/]+\//, '');
  const m = {};
  for (const part of body.split('/')) { const [k, v] = part.split(':'); if (k) m[k] = v; }
  const applied = ['E', 'RL', 'RC'].filter((k) => m[k] && m[k] !== 'X');
  if (!applied.length) return null;
  const base = recompute(vector);
  if (base.verdict !== 'computed') return null;
  const stops = [{ label: 'base', score: base.score, applied: [] }];
  let product = base.score;
  for (const k of applied) {
    const w = TEMPORAL_W[k]?.[m[k]];
    if (w == null) return null; // an unknown metric value has no arithmetic — say nothing
    product *= w;
    stops.push({ label: `base×${applied.slice(0, applied.indexOf(k) + 1).join('×')}`, score: roundup31(product), applied: stops.at(-1).applied.concat(k) });
  }
  return { base: base.score, applied, stops, full: stops.at(-1).score, vector };
}

/** The sentence that names which stopping point a stored number sits at. */
function describeStop(st, score) {
  const hit = st.stops.filter((s) => Math.abs(s.score - score) < 0.05);
  const all = st.stops.map((s) => (s.label === 'base' ? `base ${s.score}` : `${s.applied.join('+')} ${s.score}`)).join(', ');
  const point = hit.length ? ` — that is ${hit.at(-1).label === 'base' ? 'the base score' : `${hit.at(-1).label} with only ${hit.at(-1).applied.join(', ')} applied`}` : ' — which is none of them';
  return `${point} (${all}; full temporal ${st.full}, FIRST v3.1 §7.2)`;
}

/**
 * The CNA container, which is the only place a number NVD normalised away still exists.
 * `baseScore` is the field's name, not its content: a vendor that publishes a temporal vector may
 * store a partial product there (Fortinet stores `base × E`). Cached 6h, unmetered, one call per CVE.
 */
function cnaState(id) {
  const key = `cna:${id}`;
  const hit = cache[key];
  const ttl = hit?.error ? ERROR_TTL_MS : CACHE_TTL_MS;
  if (hit && Date.now() - Date.parse(hit.fetched_at) < ttl) return hit;
  let j;
  try {
    j = JSON.parse(execFileSync('curl', ['-s', '--max-time', '20', `https://cveawg.mitre.org/api/cve/${id}`], { encoding: 'utf8', maxBuffer: 8 * 1024 * 1024 }));
    if (!j?.cveMetadata) throw new Error('not-in-cveawg');
  } catch (e) {
    cache[key] = { fetched_at: new Date().toISOString(), error: e.message === 'not-in-cveawg' ? 'not-in-cveawg' : 'unreadable' };
    return cache[key];
  }
  const metrics = [];
  for (const m of j.containers?.cna?.metrics ?? []) {
    for (const [k, version] of [['cvssV3_1', '3.1'], ['cvssV3_0', '3.0'], ['cvssV4_0', '4.0']]) {
      const d = m[k];
      if (!d) continue;
      metrics.push({ version, score: d.baseScore, temporalScore: d.temporalScore, vector: d.vectorString, field: `containers.cna.metrics.${k}.baseScore` });
    }
  }
  cache[key] = { fetched_at: new Date().toISOString(), state: j.cveMetadata.state, assigner: j.cveMetadata.assignerShortName, metrics };
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

function checkCvss(it, subjects, cna = new Map()) {
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
        /* Before calling an advisory unreadable, ask the REPO page. A GHSA with no global record
         * can still render a complete advisory — and when it does, the claim is verifiable and the
         * right verdict is `advisory-repo-only` (2026-10-29 item 13: OpenPanel's
         * `GHSA-49hg-9qhc-4623`, 404 in the DB, 200 on the page, "No known CVE" in its own CVE-ID
         * row — which is also how the item's "carries no CVE id" claim gets checked). */
        const page = rec.error === 'not-in-advisory-db' && bound.kind === 'ghsa' ? repoAdvisory(it, bound.id) : null;
        if (page && !page.error) {
          const rp = page.vector ? judge({ vector: page.vector, score: cl.score }) : { verdict: 'no-vector' };
          const fs = (x) => Number(x).toFixed(1); // a CVSS score is written 9.0, not 9
          const cells = [page.severity && `Severity ${page.severity}`, page.vector, page.patched && `patched ${page.patched}`, page.cve_id && `CVE ID ${page.cve_id}`].filter(Boolean).join(' · ');
          if (rp.verdict === 'differs') {
            out.push({
              check: 'cvss', item: it.n, verdict: 'score-not-reproducible', claim: `${cl.version} ${cl.score}`,
              detail: `${bound.id}: not in the global Advisory Database, but the repo page renders ${cells}; its vector computes ${fs(rp.computed)}, not ${cl.score} (Δ ${rp.delta > 0 ? '+' : ''}${rp.delta})`,
            });
          } else {
            out.push({
              check: 'cvss', item: it.n, verdict: 'advisory-repo-only', claim: `${cl.version} ${cl.score}`,
              detail: `${bound.id}: not in the global Advisory Database, but the repo page renders (published ${String(page.published_at ?? '').slice(0, 10)}) — ${cells}${rp.verdict === 'exact' ? `; the vector reproduces ${fs(rp.computed)}` : ''} — an advisory that is not ingested is a STATE, not an unreadable page`,
            });
          }
          continue;
        }
        out.push({
          check: 'cvss', item: it.n, verdict: 'advisory-unreadable', claim: `${cl.version} ${cl.score}`,
          detail: `${bound.id}: ${rec.error === 'not-in-advisory-db' ? 'no record in the global Advisory Database, and no repo page could be read (a published repo page does not imply an ingested advisory — and an uncited one cannot be found)' : rec.error} — "I could not read it" is not "it does not say that"`,
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
    /* The vendor's container is a subject in its own right. NVD re-serves a NORMALISED number —
     * temporal components stripped, so the CNA's own `baseScore` can differ or be the only copy —
     * and a score that exists only there is not an absent score. Rule 4 applies to the CNA too:
     * "NVD does not carry it" is a statement about the registry, not about the vendor. */
    const cnaRec = cna.get(bound.id);
    const cnaHit = (cnaRec?.metrics ?? []).find((m) => m.version === cl.version && Math.abs(m.score - cl.score) < 0.05);
    if (cnaHit) {
      const st = temporalStops(cnaHit.vector);
      out.push({
        check: 'cvss', item: it.n, verdict: 'cna-only-score',
        claim: `${cl.version} ${cl.score}`,
        detail: `${bound.id}: the CNA container (${cnaRec.assigner ?? 'cna'}) carries ${cl.version} ${cnaHit.score}${st ? describeStop(st, cnaHit.score) : ''} — NVD does not; name the container, because a normalised record is not the vendor's number`,
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

/**
 * Check F — the record SHAPE, not the prose. A CVE whose CNA container carries a temporal vector
 * publishes more than one defensible number, and NVD publishes a different one again; the writer
 * has to say which they quote, and the prose may not mention a version at all (item 38 quotes 9.8,
 * 9.6 and 9.1 in one paragraph with no `CVSS 3.1` label anywhere, so every pair-based check in
 * this file is blind to it). Triggering on the container rather than on the sentence is what makes
 * it visible.
 */
function checkTemporal(it, cna, subjects) {
  const out = [];
  const t = strip(it.text);
  const ids = [...new Set((t.match(/CVE-\d{4}-\d{3,7}/g) ?? []))];
  for (const id of ids) {
    const rec = cna.get(id);
    if (!rec || rec.error) continue;
    for (const m of rec.metrics ?? []) {
      const st = temporalStops(m.vector);
      if (!st) continue;
      const nvd = (subjects.get(id)?.metrics ?? []).map((x) => `${x.version} ${x.score} (${x.source})`);
      // Nothing to disambiguate when the vendor's number IS the base and the base is the whole story.
      if (Math.abs(m.score - st.base) < 0.05 && st.full === st.base) continue;
      out.push({
        check: 'temporal', item: it.n, verdict: 'temporal-stopping-point',
        claim: `${id} · CNA ${m.score} / base ${st.base} / full ${st.full}`,
        detail: `${rec.assigner ?? 'cna'} stores ${m.version} ${m.score} in \`${m.field}\`${describeStop(st, m.score)}; NVD re-serves ${nvd.join(', ') || 'no metric'} — one vector, so name the stopping point you quote (a field called \`baseScore\` does not have to hold the base)`,
      });
      break; // one finding per record is enough to open the question
    }
  }
  return out;
}

// ── check C: repo state ─────────────────────────────────────────────────────────────────────
let cache = {};
try { cache = JSON.parse(readFileSync(CACHE_PATH, 'utf8')); } catch { /* first run */ }
let apiCalls = 0;
// unmetered `github.com` HTML fetches for the repo-advisory fallback — counted separately, because
// conflating them with `api.github.com` would make the budget look spent when it is not.
let repoCalls = 0;
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

/* A **dated** quote is not a **stale** quote. The 2026-10-28 feed's item 5 reads "at the time of
 * writing holds **56 stars**" — true when written, 114 forty minutes later — and the reader reported
 * `star-drift` at −50%, which is a finding about the clock, not about the item. When the number's own
 * sentence discloses when it was read, the drift is a **surge signal**: report both readings and the
 * direction, at advisory severity, instead of asking for a reread. */
const DATED_QUOTE = /\b(?:at the time of writing|at publish|when (?:this|the) (?:item|entry|note) was written|as of|when (?:we|I) (?:wrote|read) (?:this|it)|at the time of (?:this|writing)|last (?:checked|read))\b/i;

/* A repository's **age** is a claim about its history, and `created_at` is the clock of the *record*.
 * moxnox (2026-10-28) was created 2026-10-22 carrying 9,479 commits back to 2021-12-08 — a re-pushed
 * history — so a "six-day-old project" reading was wrong by 4.9 years. The cheap check is one
 * `Link: rel="last"` hop on the commits list, which yields the **oldest** commit without walking the
 * history; gated to young records that make an age claim, capped separately from MAX_REPOS. */
const AGE_N = String.raw`(?:\d+|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)`;
// no trailing `\b`: the usual spelling is `created 2026-10-27T13:19Z`, and `7`→`T` is not a word
// boundary, so a trailing `\b` silently excluded the most common form (caught by the live run).
const AGE_CLAIM = new RegExp(String.raw`\b(?:${AGE_N}[- ](?:day|week|month)s?[- ]old|in (?:just |only )?${AGE_N} (?:day|week|month)s?|since (?:its|the) (?:launch|release|creation)|created \d{4}-\d\d-\d\d(?!\d))`, 'i');
const YOUNG_RECORD_DAYS = 120;
/* An item that already draws the distinction is not making the mistake the check exists for — the
 * same disclosure-suppression shape as `counted-by-author` and `slot-quoted`. Moxnox's item, once
 * corrected, reads "its history begins 2021-12-08 … so `created_at` dates this public home, not the
 * project"; flagging that would be a finding about the checker. */
const SELF_DISCLOSED_HISTORY = /\b(?:history (?:begins|goes back|dates)|commits (?:deep|going back)|created_at dates|not the project'?s? (?:history|age)|re-?pushed)\b/i;

function oldestCommit(slug) {
  const key = `oldest:${slug}`;
  const hit = cache[key];
  if (hit && Date.now() - Date.parse(hit.fetched_at) < CACHE_TTL_MS) return hit;
  try {
    const head = execFileSync('gh', ['api', `/repos/${slug}/commits?per_page=1`, '--include'], { encoding: 'utf8', timeout: 30_000, stdio: ['ignore', 'pipe', 'ignore'] });
    apiCalls += 1;
    const lastPage = /[?&]page=(\d+)>;\s*rel="last"/.exec(head)?.[1] ?? /rel="last"[^>]*[?&]page=(\d+)/.exec(head)?.[1] ?? null;
    if (!lastPage || lastPage === '1') {
      // one page of history only (the common case for a young repo): the newest commit IS the
      // oldest, so the `--include` body already answers it and the second call is not spent.
      const first = /"date":\s*"([^"]+)"/.exec(head)?.[1] ?? null;
      cache[key] = { fetched_at: new Date().toISOString(), oldest: first, approx_commits: 1 };
      return cache[key];
    }
    const body = execFileSync('gh', ['api', `/repos/${slug}/commits?per_page=1&page=${lastPage}`], { encoding: 'utf8', timeout: 30_000, stdio: ['ignore', 'pipe', 'ignore'] });
    apiCalls += 1;
    const arr = JSON.parse(body);
    const c = Array.isArray(arr) ? arr[0] : null;
    cache[key] = {
      fetched_at: new Date().toISOString(),
      oldest: c?.commit?.author?.date ?? c?.commit?.committer?.date ?? null,
      oldest_sha: c?.sha ?? null,
      approx_commits: lastPage,
    };
    return cache[key];
  } catch (e) {
    cache[key] = { fetched_at: new Date().toISOString(), error: String(e.message ?? e).split('\n')[0] };
    return cache[key];
  }
}

/** The sentence the *star quote itself* lives in — a bare `indexOf("56")` finds a version first. */
function starQuoteSentence(plain, n) {
  const re = /([+\-−]?)(\d[\d,]*(?:\.\d+)?)\s*(k)?\s*(?:★|stars?\b)/gi;
  for (const m of plain.matchAll(re)) {
    if (m[1]) continue;
    if (toNum(m[2]) * (m[3] ? 1000 : 1) !== n) continue;
    const r = sentences(plain).find((s) => m.index >= s.start && m.index < s.end);
    return r ? plain.slice(r.start, r.end) : plain.slice(Math.max(0, m.index - 200), m.index + 200);
  }
  return '';
}

/* Is this slug a Hugging Face model? One unmetered GET, memoised for the run. Returns a short
 * description ("gated: false, 353 files") or null. Deliberately conservative: only a 200 with a
 * parseable model record counts, so a network failure returns null and the caller still says
 * `unreadable` rather than inventing a hub. */
const HF_CACHE = new Map();
function hfModel(slug) {
  if (HF_CACHE.has(slug)) return HF_CACHE.get(slug);
  let verdict = null;
  try {
    const r = execFileSync('curl', ['-sS', '-m', '20', `https://huggingface.co/api/models/${slug}`],
      { encoding: 'utf8', maxBuffer: 8 * 1024 * 1024 });
    const j = JSON.parse(r);
    if (j && j.id) verdict = `huggingface.co/${j.id} (gated: ${j.gated}, ${(j.siblings || []).length} files, created ${String(j.createdAt || '').slice(0, 10)})`;
  } catch { verdict = null; }
  HF_CACHE.set(slug, verdict);
  return verdict;
}

/* The model-card twin of `readme()`: `huggingface.co/<id>/raw/main/README.md`, unmetered. Returns
 * `{ text }` (possibly empty) like `readme()`, or null when the hub does not answer 200. */
async function hfCard(slug) {
  if (!/^[\w.-]+\/[\w.-]+$/.test(slug)) return null;
  try {
    const r = execFileSync('curl', ['-sS', '-m', '30', `https://huggingface.co/${slug}/raw/main/README.md`],
      { encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 });
    if (!r || /^Entry not found$/m.test(r)) return null;
    return { text: r };
  } catch { return null; }
}

function checkRepo(it, budget, ageBudget) {
  const out = [];
  const starQuotes = starQuotesOf(it.plain);
  if (!it.repos.length) return out;
  for (const slug of it.repos.slice(0, 2)) {
    if (budget.left <= 0) break;
    budget.left -= 1;
    const st = repoState(slug);
    if (st.error) {
      // A Hugging Face model id is `org/Name` and looks exactly like a repository slug. Two items on
      // 2026-10-29 (`internlm/Atria-Dawn`, `nvidia/NVIDIA-Nemotron-3.5-Transcribe-30B-A4B`) produced a
      // bogus `unreadable` each, and the count check then asked for a GitHub README that cannot exist.
      // Ask the other hub before calling a name unreadable; a 200 there is a model, not a repo.
      const hf = hfModel(slug);
      if (hf) {
        out.push({ check: 'repo', item: it.n, verdict: 'hf-model', claim: slug, detail: `${hf} — a Hugging Face model id, not a GitHub repository (read the card, not a README)` });
        continue;
      }
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
      const quote = `${biggest}`;
      const dated = DATED_QUOTE.test(starQuoteSentence(it.plain, biggest));
      // negative delta = quoted below today's count = the repo grew under the item
      const dir = starDelta < 0 ? 'the item under-counts a live surge' : 'the item over-counts';
      out.push({
        check: 'repo', item: it.n, verdict: dated ? 'star-dated' : 'star-drift',
        claim: `${biggest} quoted vs ${st.stars} now`,
        detail: dated
          ? `${slug}: ${(starDelta * 100).toFixed(0)}% — the item dates this reading, so the drift is the trend (${dir}); quote the second reading too`
          : `${slug}: ${(starDelta * 100).toFixed(0)}% — reread the number or date the item`,
      });
    }
    // age is a history claim: only young records that say their own age are worth a second hop.
    const recAgeDays = st.created_at ? Math.round((Date.now() - Date.parse(st.created_at)) / 86_400_000) : null;
    if (recAgeDays != null && recAgeDays <= YOUNG_RECORD_DAYS && ageBudget.left > 0
        && AGE_CLAIM.test(it.plain) && !SELF_DISCLOSED_HISTORY.test(it.plain)) {
      ageBudget.left -= 1;
      const oc = oldestCommit(slug);
      if (oc.error) {
        out.push({ check: 'repo', item: it.n, verdict: 'history-unreadable', claim: slug, detail: `commits API: ${oc.error} — unread is not young` });
      } else if (oc.oldest) {
        const histDays = Math.round((Date.now() - Date.parse(oc.oldest)) / 86_400_000);
        if (histDays > recAgeDays * 2 && histDays - recAgeDays > 60) {
          out.push({
            check: 'repo', item: it.n, verdict: 'history-older-than-record',
            claim: `${slug} record ${recAgeDays}d vs oldest commit ${histDays}d`,
            detail: `created_at ${st.created_at.slice(0, 10)} but the oldest commit is ${oc.oldest.slice(0, 10)} (~${oc.approx_commits} commits) — a re-pushed history; "N-day-old project" is the record's clock, not the code's`,
          });
        } else {
          out.push({ check: 'repo', item: it.n, verdict: 'ok-history', claim: slug, detail: `record ${recAgeDays}d, oldest commit ${oc.oldest.slice(0, 10)} (~${oc.approx_commits} commits)` });
        }
      }
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

/* A digit INSIDE an identifier is not a count, and the claim reader cannot tell them apart by
 * grammar alone: `COUNT_RE` sees "FP8 model" and reads eight models. Measured 2026-10-29 on item
 * 35, whose second link is labelled `🔗 tencent/Hy-SimulMT-30B-A3B-FP8 model card` — the lint
 * opened the card looking for a count of eight, and the model tabled **five** commercial APIs.
 * The same shape is everywhere in this feed: `30B-A3B`, `Qwen3.8`, `H.264`, `b88741`, `1.104.4`,
 * `3.16.2`. So: a number glued to a letter (either side) or reached through a dot is part of a
 * name, and a claim is only a claim when the digits stand alone. */
function identifierNumber(text, index, raw) {
  const before = index > 0 ? text[index - 1] : '';
  const after = text[index + raw.length] ?? '';
  return /[A-Za-z_.]/.test(before) || /[A-Za-z]/.test(after);
}

/* A card's `language:` block IS the count — but it is a YAML list, not a sentence, so
 * `countNumsIn` reads straight past it and the item's own correct census comes back `absent`.
 * Measured 2026-10-29 on `tencent/Hy-SimulMT-30B-A3B-FP8`: the frontmatter lists exactly **36**
 * codes (`zh` … `kk`) while the card's only literal "36" is the words "Watch larger · 36 seconds"
 * on a demo-video link — so the checker matched the video's DURATION and reported the feed's
 * language count as another noun's number. Returns null when there is no such block, so "the card
 * has no `language:` key" stays distinct from "it has one and the count differs" — the same
 * field-vs-value distinction the `cvss` check learned from `{score: 0.0, vector_string: null}`. */
function frontmatterBlockCount(text, noun) {
  const key = noun.replace(/s$/, '');
  const fm = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text);
  if (!fm) return null;
  const lines = fm[1].split(/\r?\n/);
  const at = lines.findIndex((l) => new RegExp(`^${key}:`).test(l));
  if (at < 0) return null;
  const inline = lines[at].slice(key.length + 1).trim();
  // `language: [zh, en]` and `language: zh` are the two inline spellings
  if (inline) return inline.replace(/^\[|\]$/g, '').split(',').filter((s) => s.trim()).length;
  let n = 0;
  for (let i = at + 1; i < lines.length; i++) {
    if (/^\s*-\s+\S/.test(lines[i])) n += 1;
    else if (/^\S/.test(lines[i])) break; // the next top-level key ends the block
  }
  return n;
}

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
  /* The identifier guard applies to PAGE bodies too, and the page is where it bites hardest —
   * a README is full of product names and table ids that wear a count noun. Measured 2026-10-29
   * over the 29 page/README texts in `agent/data/claim-unit-cache.json`: **7 of 94** count-shaped
   * matches are identifier artifacts, and on two pages the artifacts are the ONLY match, so a
   * correct claim would have been scored against them — `VoxCPM2 Model Architecture` (an image
   * alt, read as 2 models) and SkillSpector's severity table rows (`P8 | Tool-Based Exfiltration`,
   * `TM1 | Tool Parameter Abuse`, read as 8 and 1 tools). Same rule, same reason as the claim
   * side: a digit glued to a letter, or reached through a dot, is part of a name. */
  return [...body.matchAll(re)].filter((m) => !identifierNumber(body, m.index, m[1])).map((m) => toNum(m[1]));
}

/* A count's NOUN is part of the claim, and a paraphrase is not an absence. Stalwart's own post
 * says "faster in 35 of the 38 headline comparisons"; the feed's title says "wins 35 of 38
 * benchmarks". The number IS on the page the item cites — only the head noun differs — so the
 * README-only `absent` was wrong and so is `differs` (which would claim the page prints another
 * number). Measured 2026-10-27, the first day the cited-page reader covered vendor blogs. */
function numberNeighbours(body, n) {
  const alt = n >= 1000 ? `${n.toLocaleString('en-US')}|${n}` : String(n);
  const re = new RegExp(`\\b(?:${alt})\\b([ \\t]+[\\p{L}\\d][\\p{L}\\d'’-]*(?:[ \\t]+[\\p{L}\\d][\\p{L}\\d'’-]*){0,3})`, 'gu');
  return [...body.matchAll(re)]
    // The identifier guard, one step deeper: `P8 | Tool-Based` and `VoxCPM2 Model` are the same
    // artifacts here as in `countNumsIn`, and this matcher feeds `number-other-noun` — a verdict
    // that would then tell the author to "quote what the page says" about a product name.
    .filter((m) => !identifierNumber(body, m.index, /^[\d,]+/.exec(m[0])[0]))
    .map((m) => `${n.toLocaleString('en-US')}${m[1]}`.replace(/\s+/g, ' ').trim()).slice(0, 3);
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
    // a plain `huggingface.co/<org>/<name>` is a MODEL CARD, and it is the page a count about a model
    // has to be read against — 2026-10-29 item 7's "40 languages" lives there, not in a GitHub README
    const hfModelUrl = /^https:\/\/huggingface\.co\/(?!blog\/|datasets\/|spaces\/|papers\/)([\w.-]+\/[\w.-]+)(?:\/|$)/.exec(url);
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
    } else if (hfModelUrl) {
      url = `https://huggingface.co/${hfModelUrl[1]}/raw/main/README.md`;
      label = `HF model ${hfModelUrl[1]}`;
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
    if (identifierNumber(it.plain, m.index, m[1])) continue; // "FP8 model card" is a name, not a count
    const n = toNum(m[1]);
    const noun = m[2].toLowerCase();
    if (n < 2 || n > 100000) continue; // "1 model" is not a count claim worth opening a page for
    const key = `${n}|${noun}`;
    if (seen.has(key)) continue;
    seen.add(key);
    claims.push({ n, noun, phrase: m[0] });
  }
  if (!claims.length || !it.repos.length) return out;
  // A Hugging Face model id has a *card*, not a README, and the card is where a model's counts live
  // (2026-10-29 item 7: "40 languages" is on the Nemotron card beside "34B (4.3B active)"). Asking
  // GitHub for a README called an annotated item unreadable; ask the hub the id belongs to.
  // `readme()` returns an OBJECT even when the fetch failed, so truthiness of the object is the wrong
  // test — the fallback has to key on `.text` or the hub is never asked (measured 2026-10-29).
  let rd = await readme(it.repos[0]);
  if (!rd || !rd.text) rd = await hfCard(it.repos[0]);
  if (!rd || !rd.text) {
    out.push({ check: 'count', item: it.n, verdict: 'artifact-unreadable', claim: claims.map((c) => c.phrase).join(' | '), detail: `no README or model card at ${it.repos[0]} — open the page before quoting a count` });
    return out;
  }
  const body = rd.text.replace(/[*_`]/g, '');
  const unresolved = [];
  for (const cl of claims) {
    const anyNum = countNumsIn(body, cl.noun);
    // A YAML block is a count written as structured data — read it before calling the claim absent
    const block = frontmatterBlockCount(rd.text, cl.noun);
    if (anyNum.includes(cl.n)) {
      out.push({ check: 'count', item: it.n, verdict: 'ok', claim: cl.phrase, detail: `README states it` });
    } else if (block === cl.n) {
      out.push({ check: 'count', item: it.n, verdict: 'ok', claim: cl.phrase, detail: `the card's \`${cl.noun.replace(/s$/, '')}:\` block lists ${block} — a structured block is a count, not a sentence` });
    } else {
      unresolved.push({ cl, anyNum, block });
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
      // A model card is fetched RAW (frontmatter intact), so its `language:` block is checkable even
      // though no sentence states the total — the item's count is verified, not merely excused.
      const blockHit = fetched.find((p) => frontmatterBlockCount(p.text, cl.noun) === cl.n);
      if (hit) {
        out.push({ check: 'count', item: it.n, verdict: 'ok-cited-page', claim: cl.phrase, detail: `${hit.label} states it (the repo README does not) — quote the page the number came from` });
      } else if (blockHit) {
        out.push({ check: 'count', item: it.n, verdict: 'ok-cited-page', claim: cl.phrase, detail: `${blockHit.label}'s \`${cl.noun.replace(/s$/, '')}:\` block lists ${cl.n} — the count is in the metadata, not a sentence` });
      } else if (anyNum.length) {
        out.push({ check: 'count', item: it.n, verdict: 'differs', claim: cl.phrase, detail: `README says ${[...new Set(anyNum)].join(' / ')} ${cl.noun}${fetched.length ? `; also read ${fetched.map((p) => p.label).join(', ')}` : ''}` });
      } else if (selfCountedNear(it.plain, cl)) {
        /* The item already says it counted the number itself. `absent` means "the page states
           none and the prose does not admit it" — an item that admits it is the fix, not the defect
           (expo/skills' "24 … a total counted from the manifest itself, since no page states it",
           measured 2026-10-28). Same species as `slot-quoted`: a suppression that fires only when
           the sentence itself carries the disclosure.
           ORDER MATTERS (measured 2026-10-29): the coincidence test below used to run first, and a
           card's demo-video link reading "36 seconds" turned item 35's correctly counted 36 language
           tags into `number-other-noun`. A number the item says it counted is not a number it
           attributed to a page's sentence, so a stray 36 elsewhere cannot outrank it. */
        out.push({ check: 'count', item: it.n, verdict: 'counted-by-author', claim: cl.phrase, detail: `no page states a ${cl.noun} total, and the item says so — the count is the author's own census` });
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

// ── check G: a count of MATCHES is not a count of OBJECTS ───────────────────────────────────
/* The 10-29 feed published `/etc/ssl/cert.pem` "carries **8** `emSign` matches" — and 8 was
 * right, as a **line** count, and wrong as a **certificate** count, because every certificate in
 * that bundle writes its name twice (`subject=` and `issuer=`). There were **4** certificates and
 * the bundle holds **128**. Three runs in one week produced the same species (`grep -c` quoted as
 * an object count), so it is a unit the lint has to own: the item's number is "true" under one
 * operation and false under the one a reader assumes.
 *
 * The check reads the bundle the item NAMES, on this host, and compares a quoted number against
 * **matching certificates** and **matching lines** separately. Three things keep it from crying
 * wolf: (a) only a bundle that carries name metadata can be checked at all — a bare Debian
 * `ca-certificates.crt` is base64 with no subject lines, so nothing matches and nothing is said;
 * (b) the number binds to the NEAREST path token in its own sentence, so a second store in the
 * same sentence ("the keychain holds 154 … while the file holds 128") cannot be scored against the
 * wrong bundle; (c) a sentence that NAMES the line operation (`grep -c`, `wc -l`, "8 lines") is
 * `bundle-lines-named`, advisory — the disclosure is the fix, the `slot-quoted` shape again.
 * `bundle-unavailable` says a named bundle is not on this host: report the set you measured. */
const BUNDLE_TOKEN_RE = /[\w./~-]+\.(?:pem|crt|cer|p7b|keychain|jks|p12)\b/g;
const BUNDLE_STOP = new Set([
  'certificate', 'certificates', 'cert', 'certs', 'subject', 'issuer', 'begin', 'end', 'root',
  'roots', 'bundle', 'store', 'file', 'keychain', 'lines', 'line', 'trust', 'trusted', 'openssl',
  'python', 'macos', 'apple', 'system', 'systemroot', 'default', 'https', 'http', 'carries',
  'holds', 'cert.pem', 'roots.pem',
]);
const BUNDLE_LINES_NAMED = /\b(?:lines?|rows?)\b|\bgrep\s+-c\b|\bwc\s+-l\b|\bgrep\s+-c\s/i;
const BUNDLE_CACHE = new Map();

function loadBundle(p) {
  if (BUNDLE_CACHE.has(p)) return BUNDLE_CACHE.get(p);
  let out = null;
  try {
    const text = readFileSync(p, 'utf8');
    /* A certificate's readable name lives ABOVE its PEM block, not inside it: macOS's
     * `/etc/ssl/cert.pem` is an `openssl x509 -text` dump where each root is preceded by
     * `=== /C=…/CN=…` and `Subject: …` lines, and the block itself is pure base64. So a
     * certificate's record is *the preamble since the previous block* plus the block — counting
     * block membership alone returns 8 lines and **0** certificates (measured 2026-10-29). */
    const records = [];
    const re = /-----BEGIN CERTIFICATE-----[\s\S]*?-----END CERTIFICATE-----/g;
    let last = 0;
    for (const m of text.matchAll(re)) {
      records.push({ block: m[0], head: text.slice(last, m.index) });
      last = m.index + m[0].length;
    }
    if (records.length) {
      // Metadata = everything that is neither a PEM delimiter nor a base64 body line. A Debian
      // `ca-certificates.crt` carries none, so it can never produce a match and the check stays
      // silent there rather than inventing 0s.
      const meta = text.split('\n').filter((l) => l.trim() && !/^-----/.test(l) && !/^[A-Za-z0-9+/=]{20,}$/.test(l.trim()));
      out = { text, records, total: records.length, meta: meta.join('\n') };
    }
  } catch { out = { error: 'unreadable' }; }
  BUNDLE_CACHE.set(p, out);
  return out;
}

function bundleNameStats(b, name) {
  const re = new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
  const lines = b.text.split('\n').filter((l) => !/^-----/.test(l) && re.test(l)).length;
  const certs = b.records.filter((r) => re.test(r.block) || re.test(r.head)).length;
  return { lines, certs };
}

/** Proper-noun-ish tokens near the number that actually occur in this bundle's name metadata. */
function bundleNamesNear(sent, b, at) {
  const out = [];
  const meta = b.meta.toLowerCase();
  for (const m of sent.matchAll(/[A-Za-z][A-Za-z0-9&._-]{3,}/g)) {
    const w = m[0];
    if (BUNDLE_STOP.has(w.toLowerCase())) continue;
    if (Math.abs(m.index - at) > 90) continue;
    if (!meta.includes(w.toLowerCase())) continue;
    out.push({ name: w, dist: Math.abs(m.index - at) });
  }
  return out.sort((a, b2) => a.dist - b2.dist);
}

function checkBundle(it) {
  const out = [];
  const t = it.text.replace(/\*\*|\*/g, '');
  const tokens = [...t.matchAll(BUNDLE_TOKEN_RE)].map((m) => ({ path: m[0], at: m.index }));
  if (!tokens.length) return out;
  const said = new Set();
  for (const s of sentences(t)) {
    const local = tokens.filter((x) => x.at >= s.start && x.at < s.end);
    if (!local.length) continue;
    const sent = t.slice(s.start, s.end);
    for (const nm of sent.matchAll(/(?<![\d.])(\d[\d,]{0,6})(?![\d.])/g)) {
      const at = s.start + nm.index;
      const near = local.reduce((a, b) => (Math.abs(b.at - at) < Math.abs(a.at - at) ? b : a));
      if (Math.abs(near.at - at) > 140) continue;
      const b = loadBundle(near.path);
      if (!b) continue; // not a PEM bundle (or not a file we can count)
      if (b.error) {
        // Only a `.pem`/`.crt` path is honestly "named but unreadable here"; a keychain or a PKCS#12
        // is a different container, and calling it unreadable would be a finding about the format.
        const k = `un:${near.path}`;
        if (/\.(?:pem|crt|cer|p7b)$/i.test(near.path) && !said.has(k)) {
          said.add(k);
          out.push({ check: 'bundle', item: it.n, verdict: 'bundle-unavailable', claim: near.path, detail: 'the item names this bundle and it is not readable on this host — report the set you measured, never a universal' });
        }
        continue;
      }
      const n = toNum(nm[1]);
      if (!Number.isFinite(n) || n < 2) continue;
      const cands = bundleNamesNear(sent, b, nm.index);
      let hit = null;
      for (const c of cands) {
        const st = bundleNameStats(b, c.name);
        if (st.lines < 2 && st.certs < 2) continue;
        if (n === st.lines || n === st.certs) { hit = { ...c, ...st }; break; }
      }
      if (hit) {
        const k = `${near.path}|${n}|${hit.name}`;
        if (said.has(k)) continue;
        said.add(k);
        if (hit.lines === hit.certs || n === hit.certs) {
          out.push({ check: 'bundle', item: it.n, verdict: 'bundle-ok', claim: `${n} × ${hit.name} in ${near.path}`, detail: `${hit.certs} certificate(s) match (${hit.lines} matching line(s)); bundle holds ${b.total}` });
        } else if (BUNDLE_LINES_NAMED.test(sent)) {
          out.push({ check: 'bundle', item: it.n, verdict: 'bundle-lines-named', claim: `${n} × ${hit.name} in ${near.path}`, detail: `${n} is the LINE count and the sentence says so — ${hit.certs} certificate(s) match, bundle holds ${b.total}` });
        } else {
          out.push({
            check: 'bundle', item: it.n, verdict: 'bundle-line-count', claim: `${n} × ${hit.name} in ${near.path}`,
            detail: `${n} is the number of matching LINES — every certificate writes its name as both subject= and issuer= — while only ${hit.certs} CERTIFICATE(S) match in a bundle of ${b.total}; count certificates, or name the operation that produced the count`,
          });
        }
        continue;
      }
      // No name matched, but a TOTAL was claimed beside the path: read it against the bundle size.
      // The total has to be spelled as one — a total verb immediately before the number, and no
      // subset qualifier — because "there are 4 certificates" is a SUBSET count and comparing it
      // with the bundle's 128 reported the correction as the defect on the first live run.
      const totalVerb = /\b(?:holds?|carries|contains|ships|bundles|has)\s*$/i.test(sent.slice(Math.max(0, nm.index - 30), nm.index).replace(/[*`]/g, ''));
      const subset = /\b(?:including|of which|match(?:es|ed)?|subset|among)\b/i.test(sent);
      const tail = sent.slice(nm.index + nm[1].length).match(/^[\s*`]*(\d[\d,]{0,6})?[\s*`]*(certificates?|certs?|root certificates?|roots)\b/i);
      if (totalVerb && !subset && tail && !tail[1]) {
        const k = `tot:${near.path}|${n}`;
        if (said.has(k)) continue;
        said.add(k);
        if (n === b.total) out.push({ check: 'bundle', item: it.n, verdict: 'bundle-ok', claim: `${n} ${tail[2]} in ${near.path}`, detail: `the bundle holds ${b.total} certificates` });
        else out.push({ check: 'bundle', item: it.n, verdict: 'bundle-total-mismatch', claim: `${n} ${tail[2]} in ${near.path}`, detail: `the bundle holds ${b.total} certificates — a bundle is a snapshot, so requote it or date the reading` });
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
  // 2026-10-28 item 31: review findings are not tracker rows
  t('review defects are not an issue count', checkIssues(mk('t', 'Claude caught all **11 issues** that human reviewers had spotted')).map((x) => x.verdict), []);
  t('a bare issue count with no repo is not a finding', checkIssues(mk('t', 'the list carries 11 issues overall')).map((x) => x.verdict), []);
  t('a bare issue count in a repo item still fires', checkIssues({ ...mk('t', 'it has 3,286 issues'), repos: ['a/b'] }).map((x) => x.verdict), ['unsplit-issue-count']);
  t('open issues fires even after a review verb', checkIssues(mk('t', 'found **3,286 open issues** on the board')).map((x) => x.verdict), ['unsplit-issue-count']);

  // star quotes — a delta and a total are different units (the item-12 false finding)
  t('star delta is not a count', starQuotesOf(strip('Source: GitHub Trending · +312 stars today · nightly-labs')), []);
  t('k-suffix is read as thousands', starQuotesOf(strip('**1.4k stars**, **174 forks**')), [1400]);
  t('plain total survives', starQuotesOf(strip('1,030 stars and 12.5k★')), [1030, 12500]);
  t('week delta skipped', starQuotesOf(strip('up 900 stars this week')), []);

  // repo-slug extraction — the 10-27 arity false positive and what must still be a repo
  const slugs = (s) => parseItems(`## 1. t\n\n${s}\n`)[0].repos.sort();
  t('erlang arity is not a repo', slugs('`merge_ssl_opts/3` and `partial_chain/1` in `hackney_ssl:partial_chain/1`'), []);
  t('elixir arity is not a repo', slugs('`Enum.map/2` and `String.split/3`'), []);
  // 2026-10-28 items 21 / 22: a hostname and a github.com route are not repositories
  t('hostname is not a repo', slugs('download from `pkgs.tailscale.com/stable` today'), []);
  t('github route is not a repo', slugs('see `advisories/GHSA-m8xf-2cr7-77ph` for the record'), []);
  t('blob path is not a repo', slugs('`blob/main/docs/x.md`'), []);
  t('real repo slug survives', slugs('`obra/superpowers` and `zip-rs/zip2`'), ['obra/superpowers', 'zip-rs/zip2']);
  // a dated star quote is a surge signal, not a stale number (2026-10-28 item 5: 56 → 114)
  t('dated quote detected', DATED_QUOTE.test('at the time of writing holds 56 stars and one commit'), true);
  t('undated quote is not dated', DATED_QUOTE.test('the repo holds 56 stars and one commit'), false);
  t('age claim detected', AGE_CLAIM.test('a six-day-old project with 9,479 commits'), true);
  t('version number is not an age claim', AGE_CLAIM.test('released 1.4.0 with 12 days of work'), false);
  t('github url is still a repo', slugs('[advisory](https://github.com/padok-team/burrito/security/advisories/GHSA-x)'), ['padok-team/burrito']);
  t('file path is not a repo', slugs('`src/lib/json.js` and `docs/readme.md`'), []);

  const ver = (s) => extractCvss(s).map((c) => `${c.version}:${c.score}`).sort();
  t('score (CVSS v)', ver('scored **9.1 (CVSS 3.1)**'), ['3.1:9.1']);
  t('version then score', ver('**3.1 5.9** and **4.0 8.2**'), ['3.1:5.9', '4.0:8.2']);
  t('score on version', ver('9.2 on CVSS 4.0 and 8.1 on 3.1'), ['3.1:8.1', '4.0:9.2']);
  t('release number is not a version', ver('affected >= 1.37, <= 1.74.1, patched 1.74.2'), []);
  t('out-of-range score dropped', ver('CVSS 4.0 11.4'), []);

  // stopping points — FIRST v3.1 §7.2: one Roundup over the flat product (CVE-2026-107656)
  const stops = (v) => { const s = temporalStops(v); return s && { base: s.base, stops: s.stops.map((x) => x.score), full: s.full }; };
  t('fortisandbox: base / ×E / ×E+RL / ×E+RL+RC',
    stops('CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H/E:F/RL:O/RC:C'),
    { base: 9.8, stops: [9.8, 9.6, 9.1, 9.1], full: 9.1 });
  t('no temporal component is not a stopping-point question',
    stops('CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H'), null);
  t('X applies nothing', stops('CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H/E:X'), null);
  // The weight a memory gets wrong: Remediation Level Workaround is 0.97, and 0.95 would give 9.1.
  t('RL:W is 0.97, not an official fix\'s 0.95',
    stops('CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H/E:F/RL:W').full, 9.3);
  t('a single Roundup over the product, not per-component rounding',
    stops('CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H/E:U/RL:W'),
    { base: 9.8, stops: [9.8, 9.0, 8.7], full: 8.7 });

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
  // measured 2026-10-29 over the cached page corpus: 7 of 94 page-side matches are identifiers,
  // and on SkillSpector's severity table they are the ONLY match — a table id is not a count
  t('count: a page-side identifier is not a count (table id row)', countNumsIn('| P8 | Tool-Based Exfiltration |', 'tools'), []);
  t('count: a product name is not a count (image alt)', countNumsIn('alt="VoxCPM2 Model Architecture"', 'models'), []);
  t('count: a real page-side count still reads', countNumsIn('ships 12 tools and 3 language packs', 'tools'), [12]);
  t('count: numberNeighbours skips an identifier number too',
    numberNeighbours('| P8 | Tool-Based Exfiltration |', 8), []);
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
  // measured 2026-10-28 on item 36 (expo/skills): the page states no total and the item says so
  t('count: an item that says it counted the number itself is not `absent`',
    SELF_COUNTED.test(sentenceAround('Its manifest groups **24** skills into three buckets — a total counted from the manifest itself, since no page states it. Installation is per-harness.', '24** skills')), true);
  t('count: and a bare count with no such disclosure is not suppressed',
    SELF_COUNTED.test(sentenceAround('The repo ships **24** skills in three groups.', '24** skills')), false);
  // measured 2026-10-29 on item 35: the disclosure is in the body, the number is in the title
  t('count: a disclosure in another sentence carrying the SAME number still counts',
    selfCountedNear('The title reads 36 language tags over one pair.\n\nThe card\'s `language:` block lists 36 codes, from `zh` to `kk`.', { n: 36, noun: 'language', phrase: '36 language' }), true);
  t('count: a disclosure about a DIFFERENT number does not suppress this one',
    selfCountedNear('The title reads 36 language tags over one pair.\n\nIts manifest groups 24 skills, a total counted from the manifest itself.', { n: 36, noun: 'language', phrase: '36 language' }), false);
  // the identifier guard: a digit inside a name is not a count
  t('count: "FP8 model card" is a name, not eight models',
    identifierNumber('tencent/Hy-SimulMT-30B-A3B-FP8 model card', 34, '8'), true);
  t('count: "36 language tags" is a real count',
    identifierNumber('and 36 language tags over one pair', 4, '36'), false);
  t('count: a dotted version is part of a name', identifierNumber('upgraded to 3.16.2 models here', 14, '16'), true);
  // a YAML block is a count written as data (measured 2026-10-29 on the Hy-SimulMT card)
  const cardFixture = '---\nlanguage:\n- zh\n- en\n- ug\nlicense: apache-2.0\n---\n\n# Model\n';
  t('count: a frontmatter block is read as a count', frontmatterBlockCount(cardFixture, 'languages'), 3);
  t('count: an absent block is null, not zero', frontmatterBlockCount(cardFixture, 'skills'), null);
  t('count: an inline list is counted too', frontmatterBlockCount('---\nlanguage: [zh, en]\n---\n', 'languages'), 2);

  // a bundle's matches are LINES; its objects are CERTIFICATES (measured 2026-10-29 on /etc/ssl/cert.pem)
  const pemFixture = [
    '### eMudhra Inc',
    '',
    '=== /C=US/OU=emSign PKI/O=eMudhra Inc/CN=emSign ECC Root CA - C3',
    'Certificate:',
    '        Subject: C=US, OU=emSign PKI, O=eMudhra Inc, CN=emSign ECC Root CA - C3',
    '-----BEGIN CERTIFICATE-----',
    'MIIB',
    '-----END CERTIFICATE-----',
    '=== /C=US/OU=emSign PKI/O=eMudhra Inc/CN=emSign Root CA - C1',
    'Certificate:',
    '        Subject: C=US, OU=emSign PKI, O=eMudhra Inc, CN=emSign Root CA - C1',
    '-----BEGIN CERTIFICATE-----',
    'MIIB',
    '-----END CERTIFICATE-----',
    '=== /C=IN/OU=emSign PKI/CN=emSign ECC Root CA - G3',
    '        Subject: C=IN, OU=emSign PKI, CN=emSign ECC Root CA - G3',
    '-----BEGIN CERTIFICATE-----',
    'MIIB',
    '-----END CERTIFICATE-----',
    '=== /C=IN/OU=emSign PKI/CN=emSign Root CA - G1',
    '        Subject: C=IN, OU=emSign PKI, CN=emSign Root CA - G1',
    '-----BEGIN CERTIFICATE-----',
    'MIIB',
    '-----END CERTIFICATE-----',
  ].join('\n');
  const mb = {
    text: pemFixture,
    records: [...pemFixture.matchAll(/-----BEGIN CERTIFICATE-----[\s\S]*?-----END CERTIFICATE-----/g)]
      .map((m, i, arr) => ({ block: m[0], head: pemFixture.slice(i ? arr[i - 1].index + arr[i - 1][0].length : 0, m.index) })),
    total: 4,
    meta: 'emSign ECC Root CA - C3\nemSign Root CA - C1\nemSign ECC Root CA - G3\nemSign Root CA - G1',
  };
  t('bundle: 8 matches are 8 LINES, and 4 certificates', bundleNameStats(mb, 'emSign'), { lines: 8, certs: 4 });
  t('bundle: a name counts only if the bundle carries it',
    bundleNamesNear('carries 8 emSign matches', mb, 9).map((x) => x.name), ['emSign']);
  t('bundle: a structural word is not a name candidate',
    bundleNamesNear('carries 8 certificate matches', mb, 9).map((x) => x.name), []);
  t('bundle: an operation that NAMES the line count is not the defect',
    BUNDLE_LINES_NAMED.test('grep -c emSign /etc/ssl/cert.pem returns 8'), true);
  t('bundle: "8 emSign matches" names no operation', BUNDLE_LINES_NAMED.test('the file carries 8 emSign matches'), false);
  t('bundle: an unreadable path is unavailable, never a count', loadBundle('/nonexistent/bundle.pem')?.error, 'unreadable');
  // nearest-path binding: a second store in the same sentence must not be scored against the file
  t('bundle: a keychain token anchors its own number',
    [...'`SystemRootCertificates.keychain` holds 154 roots while `/etc/ssl/cert.pem` holds 128'.matchAll(BUNDLE_TOKEN_RE)].map((m) => m[0]),
    ['SystemRootCertificates.keychain', '/etc/ssl/cert.pem']);

  // the repo advisory page is a readable primary even when the global DB has no record (item 13)
  const adv = parseRepoAdvisory('<span title="Severity: critical" data-view-component="true">Critical</span>'
    + '<div data-view-component="true" class="mt-2 tmp-mt-2">CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:C/C:H/I:H/A:H</div>'
    + '<relative-time datetime="2026-10-27T22:12:09Z">Oct 27, 2026</relative-time>'
    + '<h3 class="mb-2 f6">CVE ID</h3> <div class="color-fg-muted" >No known CVE</div>');
  t('repo advisory: severity, vector, CVE row are read off the page',
    [adv.severity, adv.vector, adv.cve_id, adv.published_at],
    ['critical', 'CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:C/C:H/I:H/A:H', 'No known CVE', '2026-10-27T22:12:09Z']);
  t('repo advisory: its vector is the arithmetic a claim is checked against',
    judge({ vector: adv.vector, score: 9.0 }).verdict, 'exact');

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
// CNA containers (check F): the only place a number NVD normalised away survives. cveawg is
// unmetered, so the cap is about latency rather than budget — cached entries cost nothing.
const cna = new Map();
let cnaCalls = 0;
if (!NO_NET && (CHECKS.has('cvss') || CHECKS.has('temporal'))) {
  const ids = [...new Set(parsed.flatMap((f) => f.items.flatMap((it) => strip(it.text).match(/CVE-\d{4}-\d{3,7}/g) ?? [])))].slice(0, MAX_CNA);
  for (const id of ids) {
    const fresh = !cache[`cna:${id}`];
    const st = cnaState(id);
    if (fresh) cnaCalls += 1;
    if (!st.error) cna.set(id, st);
    if (fresh) await new Promise((r) => setTimeout(r, 250));
  }
}
for (const id of new Set(parsed.flatMap((f) => f.items.flatMap((it) => strip(it.text).match(GHSA_RE) ?? [])))) {
  const rec = cache[`ghsa:${id}`];
  if (rec) subjects.set(id, { kind: 'ghsa', ...rec });
}

for (const { path: p, items } of parsed) {
  const findings = [];
  const budget = { left: MAX_REPOS };
  const ageBudget = { left: MAX_AGE };

  for (const it of items) {
    if (CHECKS.has('issues')) findings.push(...checkIssues(it));
    if (!NO_NET && CHECKS.has('cvss')) findings.push(...checkCvss(it, subjects, cna));
    if (!NO_NET && CHECKS.has('temporal')) findings.push(...checkTemporal(it, cna, subjects));
  }
  if (!NO_NET && CHECKS.has('repo')) for (const it of items) findings.push(...checkRepo(it, budget, ageBudget));
  if (!NO_NET && CHECKS.has('count')) for (const it of items) findings.push(...await checkCount(it));
  // the bundle check is local-only (it reads the path the item names), so it runs even under --no-net
  if (CHECKS.has('bundle')) for (const it of items) findings.push(...checkBundle(it));

  perFile.push({ file: basename(p), items: items.length, findings });
  allFindings.push(...findings.map((f) => ({ file: basename(p), ...f })));
}

try { mkdirSync(dirname(CACHE_PATH), { recursive: true }); writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 1)); } catch { /* cache is best-effort */ }

const SEVERITY = { ok: 0, 'ok-cited-page': 0, 'no-cve-named': 1, 'no-record': 1, 'slot-quoted': 1, 'counted-by-author': 0, 'number-other-noun': 1, 'temporal-stopping-point': 1, 'cna-only-score': 1, 'star-drift': 2, 'star-dated': 1, 'ok-history': 0, 'history-older-than-record': 2, 'history-unreadable': 1, stale: 2, archived: 2, differs: 2, absent: 2, 'unsplit-issue-count': 3, 'compound-lags-parts': 3, 'version-swapped': 3, 'version-absent': 3, 'score-not-reproducible': 2, 'score-mismatch': 3, 'wrong-subject': 3, 'absence-contradicted': 3, 'advisory-unreadable': 1, 'advisory-repo-only': 0, unreadable: 1, 'artifact-unreadable': 1, 'nvd-unavailable': 1, 'bundle-ok': 0, 'bundle-lines-named': 0, 'bundle-unavailable': 0, 'bundle-line-count': 3, 'bundle-total-mismatch': 2 };
const REAL = (f) => (SEVERITY[f.verdict] ?? 1) >= 2;

const summary = { generated: new Date().toISOString(), files: perFile, api_calls: apiCalls, readme_calls: readmeCalls, cited_page_calls: citedPages_requests, repo_page_calls: repoCalls, nvd_calls: nvdCalls, cna_calls: cnaCalls };
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
  console.log(`\napi.github.com calls: ${apiCalls} (cached ${Object.keys(cache).filter((k) => !k.startsWith('readme:')).length} repos) · raw.githubusercontent fetches: ${readmeCalls} (unmetered) · github.com advisory-page fetches: ${repoCalls} (unmetered) · NVD calls: ${nvdCalls} · cveawg calls: ${cnaCalls}`);
}

const realCount = allFindings.filter(REAL).length;
if (STRICT && realCount) process.exit(1);
