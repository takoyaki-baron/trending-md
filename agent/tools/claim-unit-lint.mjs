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
 * CHECKS, each one a unit that has produced a wrong sentence here:
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
 *      Both verdicts carry a **disclosure guard** (added 2026-11-03 12:37, from a false finding on
 *      item 2 of that batch): a repo the ITEM itself calls stale or archived — the pushed day in a
 *      sentence that names a push, or a state word the author chose — reports `stale-disclosed` /
 *      `archived-disclosed` at severity 0 instead of sev 2, because there the staleness is the
 *      story and the item already carries the advice. The suppression prints, so the class stays
 *      countable. Calibrated both ways: `stale-disclosed` on python-jose (item 2), `archived-
 *      disclosed` on Pico CSS, and still `archived` (sev 2) on the same repo with the sentence that
 *      does not say so.
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
 *   G. `vulnStatus` is a QUEUE POSITION, not a property of the vulnerability, and NVD moves it
 *      without the feed doing anything wrong. A prose status claim is checked against the same
 *      single NVD pull the cvss check pays for (`status-stale`), the direction is named when the
 *      pipeline rank falls (`REGRESSION`), and `--status-watch` keeps a per-CVE history in
 *      `agent/data/nvd-status.json` so a backwards move is OBSERVED rather than inferred. Built
 *      2026-10-30 on the `CVE-2026-97229` case: `Analyzed` → `Undergoing Analysis` 27 minutes after
 *      its KEV add, when CISA-ADP rewrote the container. Reading rules in the check's header.
 *
 *   H. PAPER DATE (`--check paper`, in the default set since 2026-11-05) — an arXiv paper's
 *      `published` instant against the date the item quotes for it. Built because the 11-05 batch
 *      was a day early on **3 of 3** papers, in the same direction and by the same amount — a unit
 *      defect in the generator, and one no existing arm could see (`date` binds publish cues to CVE
 *      records; `count`/`ratio` read pages, not timestamps). ONE unmetered request per file:
 *      `export.arxiv.org/api/query?id_list=<a,b,c>` returns `published` and `updated` for the whole
 *      batch. Verdicts: `paper-date-mismatch` (sev 2 — the quoted day/instant is not the
 *      submission instant), `paper-date-imprecise` (sev 1 — the day is right and the instant was
 *      available), `paper-date-revision` (sev 1 — the quoted date is a v2+ paper's LATER instant,
 *      so it names the wrong submission rather than the wrong day), `paper-date-unread` (sev 0).
 *      Two guards: the cue must be **submission** (`submitted`/`posted`/`preprint`), never
 *      `announced`/`published`, because arXiv's announcement is a second and later clock; and a
 *      quoted instant is compared at the precision it states, since the feed writes `21:38Z` for
 *      `21:38:49Z`. Calibrated both ways on its filing file: the pre-correction committed feed
 *      returns **3 findings** (all three papers), the corrected one **0 findings / 3 verified**.
 *
 * Usage:
 *   node agent/tools/claim-unit-lint.mjs --file en/feed/2026-10-26.md
 *   node agent/tools/claim-unit-lint.mjs --file … --no-net            # check A only (prose)
 *   node agent/tools/claim-unit-lint.mjs --file … --check cvss,repo   # subset
 *   node agent/tools/claim-unit-lint.mjs --file … --check bundle      # local PEM bundle counts
 *   node agent/tools/claim-unit-lint.mjs --file … --status-watch      # + per-CVE status history
 *   node agent/tools/claim-unit-lint.mjs --status-watch --ids CVE-…   # watch ids, no feed
 *   node agent/tools/claim-unit-lint.mjs --files 'en/feed/2026-10-2*.md' --census
 *   node agent/tools/claim-unit-lint.mjs --file … --json --strict     # exit 1 on any finding
 *   node agent/tools/claim-unit-lint.mjs --ghsa-census [--pages 3]    # field-shape census
 *   node agent/tools/claim-unit-lint.mjs --quotation-census --files 'en/feed/2026-1*.md'
 *                                                                    # the quotation blind spots
 *
 * Exit code is 0 unless `--strict` and a finding was reported (so a pipeline can gate on it).
 * Findings are advisory: a flagged number is a claim to open, not a proven error.
 */
import { readFileSync, writeFileSync, mkdirSync, globSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, basename } from 'node:path';
// The score's arithmetic, not just the record's copy of it. `cvss-recompute.mjs` guards its CLI
// behind an `import.meta.url` check, so importing it costs nothing but the v3.1 equations.
import { judge, recompute, roundup31, stoppingPoints } from './cvss-recompute.mjs';

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
// A browser UA for page reads — the same one link-check.mjs and doc-twin.mjs send, because some
// hosts answer 404 to anything else and that 404 is a statement about the client, not the page.
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36 trending-md-claim-unit-lint/1.0';
/* Two client strings, because the walls point in opposite directions on different hosts (see
 * `citedPageText`): a browser UA is refused by drupal.org and required by bearblog, so the second
 * is tried only when the first came back a wall. The named one is not `Mozilla`-shaped — that is
 * the point of it. */
const CLIENT_STRINGS = [UA, 'curl/8.7.1 trending-md-claim-unit-lint/1.0'];
const STAR_TOLERANCE = Number(arg('star-tolerance') ?? 0.10);
// a relative drift on a tiny count is not a wrong claim (2026-11-01: 6★ → 8★ in one batch)
const STAR_MIN_DELTA = Number(arg('star-min-delta') ?? 5);
/* A repo in its launch window multiplies, and a launch is not a drift (2026-11-01 12:39). The
 * check runs minutes after the batch was written, so it only ever watches a repo move *under* the
 * item — and at that timescale stars move in **one direction**. See `starVerdict()`. */
const SURGE_LAUNCH_DAYS = Number(arg('launch-days') ?? 30);
const MAX_REPOS = Number(arg('max-repos') ?? 8);
const MAX_AGE = Number(arg('max-age') ?? 3);
const MAX_GHSA = Number(arg('max-ghsa') ?? 6);
// cveawg is unmetered but not free: one request per CVE, cached 6h, and the cap keeps a
// 200-CVE census from turning the pre-commit lint into a crawler.
const MAX_CNA = Number(arg('max-cna') ?? 30);
const CACHE_PATH = arg('cache') ?? 'agent/data/claim-unit-cache.json';
// committed file: a text budget, not an entry count — three pages were 5 MB of the 19 MB a census made.
// 5 MB of TEXT is ~7 MB on disk (JSON escapes newlines); 8 MB was an 11 MB file, bigger than the 9.9 MB
// it was meant to bound.
const CACHE_BYTES = Number(arg('cache-bytes') ?? 5_000_000);
const CHECKS = new Set((arg('check') ?? 'issues,cvss,status,date,temporal,cwe,field,range,rangeabsent,idrange,repo,count,ratio,bundle,quotation,paper').split(',').map((s) => s.trim()));

const SELFTEST = has('selftest');
const STATUS_WATCH = has('status-watch');
const EXTRA_IDS = (arg('ids') ?? '').split(',').map((s) => s.trim()).filter(Boolean);
if (!FILE && !FILES && !SELFTEST && !has('ghsa-census') && !has('quotation-census') && !has('commit-quote-census') && !STATUS_WATCH) {
  console.error('usage: claim-unit-lint.mjs --file <feed.md> [--no-net] [--check issues,cvss,status,date,temporal,cwe,field,range,rangeabsent,repo,count,ratio,bundle,quotation] [--strict] [--json] [--census] [--selftest] [--status-watch [--ids CVE-…]] | --ghsa-census [--pages N]');
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

/* A backticked `a/b` is a repo only when the sentence is about a PROJECT. The third, fourth and
 * fifth measured counterexamples all landed on the 2026-11-01 04:35 batch in one run:
 *   · `anthropic/claude-opus-4.6` — an OpenRouter model id in "The default model is …" (404 from
 *     `api.github.com`, reported as an **unreadable repository**);
 *   · `moonshotai/kimi-k2` — the same sentence, a real GitHub repo that the item never discusses
 *     (11112★, last push 2026-01-21), so the staleness check answered a question nobody asked;
 *   · `plugins/sql` — the OpenSearch SQL **endpoint** in "…the `plugins/sql` endpoint…".
 * The tell is context, not shape: a model id and a route are both `a/b`, and both live in
 * sentences about a technical string rather than an artifact. A github.com URL is proof and is
 * never suppressed; backticks are not, so the suppression is REPORTED (`not-a-repo`, sev 0)
 * rather than applied silently — a check that disappears quietly is a check you lose. */
const TECHNICAL_NOUN = /\b(?:models?|model\s+ids?|endpoints?|parameters?|params?|routes?|paths?|headers?|APIs?|fields?|ids?|identifiers?|fallbacks?|prompts?|temperature|URLs?|payloads?|arguments?|args?|query\s+string|slugs?)\b/i;
const PROJECT_TERMS = /\b(?:repos?(?:itory)?s?|README|releases?|stars?|open[-\s]?source|github|projects?|librar(?:y|ies)|packages?|SDKs?|CLIs?|source\s+code|maintainers?|commits?)\b/i;

function sentenceInText(text, index) {
  const before = text.slice(0, index);
  const m = [...before.matchAll(/[.!?]["')\]]*\s+/g)].pop();
  const start = m ? m.index + m[0].length : 0;
  const tail = text.slice(index);
  const e = /[.!?]["')\]]*(\s|$)/.exec(tail);
  return text.slice(start, e ? index + e.index + 1 : Math.min(text.length, index + 240));
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
      // A github.com **route** looks exactly like a repository in a URL: `github.com/advisories/
      // GHSA-…` is the Advisory Database's page for an advisory, not `advisories/GHSA-…` the repo —
      // it cost an api.github.com call and produced a bogus `unreadable` finding on item 22 (10-28).
      if (GH_PATH_SEGMENTS.has(m[1].toLowerCase())) continue;
      if (/^GHSA-/i.test(m[2])) continue;
      repos.add(slug);
    }
    /* A slug can occur twice and be ONE thing: item 8 names `plugins/sql` in the quoted advisory
       ("…to the `plugins/sql` endpoint…") and again in its own analysis ("If your cluster exposes
       `plugins/sql`…"). Judging each occurrence separately let the second one through and spent an
       `api.github.com` call on `repos/plugins/sql`, so the decision is per SLUG: every occurrence is
       read, and the strongest one decides. */
    const backticked = new Map();
    for (const m of it.text.matchAll(/`([\w.-]+\/[\w.-]+)`/g)) {
      const slug = backtickSlug(m[1]);
      if (!slug) continue;
      if (!backticked.has(slug)) backticked.set(slug, []);
      backticked.get(slug).push(sentenceInText(it.text, m.index));
    }
    for (const [slug, sents] of backticked) {
      // a github.com link for the same slug is proof, and a slug in the TITLE is the item's subject
      const linked = it.text.includes(`github.com/${slug}`);
      const subject = it.title.includes(slug);
      const why = sents.map((s) => (s.match(TECHNICAL_NOUN) ?? [])[0]).find(Boolean);
      it.notRepo ??= [];
      if (!linked && !subject && why && !sents.some((s) => PROJECT_TERMS.test(s))) {
        /* Kept in `repos` and only skipped by `checkRepo`: the `count`/`ratio` checks look a slug up
           as an ARTIFACT to read a card from, which a model id supports and a repository claim does
           not. Dropping it here would also have cost item 5 its table-row verification. */
        it.notRepo.push({ slug, why: why.toLowerCase() });
      }
      repos.add(slug);
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
  // The counter has a NAME too: `a **9** open-issue count`, `an open-issue counter of 9`. The
  // number-before-noun pattern above cannot see it (the hyphen is not `\\s+`), and this is the exact
  // sentence that shipped on 2026-11-03 — item 17's "9 open-issue count" is GitHub's
  // `open_issues_count` = **4 issues + 4 PRs**, so the reader is told a 9 that no issue count holds.
  // The noun itself is the tracker anchor, so the bare-count suppressors do not apply.
  const counterRe = new RegExp(`${NUM}\\s+(?:open[- ])?issues?[- ](?:count|counter)\\b`, 'gi');
  for (const m of t.matchAll(counterRe)) issueQuotes.push({ n: toNum(m[1]), at: m.index, ph: m[0] });
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
    /* `weaknesses[]` is a FIELD the cvss read already pays for and never parsed. `NVD-CWE-noinfo`
       and `NVD-CWE-Other` are the field's words for "nothing here", not CWE ids, so they are kept
       as values and filtered at use (a test for absence must not read them as presence). */
    const cwe = [];
    for (const w of c.weaknesses ?? []) {
      for (const d of w.description ?? []) cwe.push({ value: d.value, source: w.source, type: w.type });
    }
    /* `descriptions[]` costs nothing — it rides the same record — and it is the only place a
       quotation OF the record can be checked. A CNA/registry field is not a page: quoting
       "In the Linux kernel, the following vulnerability has been resolved" is a claim about the
       record's bytes, and no cited blog page need carry it. Note `Received` records usually have
       no description at all, which is "not yet", never "states nothing". */
    const desc = (c.descriptions ?? []).filter((d) => d.lang === 'en').map((d) => d.value).join(' ');
    /* `configurations` is NVD's ANALYSIS output, so its absence marks "not yet analysed" (measured
       2026-10-25: present on 408/408 `Analyzed`+`Modified`, 0/4,097 of every other status) — never
       "the record states nothing". It is the fallback range source, not the primary: the CNA's own
       `affected[]` lives in cveawg and is what the CNA actually said. */
    const cpeRanges = [];
    for (const conf of c.configurations ?? []) {
      for (const node of conf.nodes ?? []) {
        for (const m of node.cpeMatch ?? []) {
          if (m.vulnerable === false) continue;
          const min = m.versionStartIncluding ?? m.versionStartExcluding ?? null;
          const max = m.versionEndIncluding ?? m.versionEndExcluding ?? null;
          if (!min && !max) continue;
          cpeRanges.push({
            min, minInc: Boolean(m.versionStartIncluding),
            max, maxInc: Boolean(m.versionEndIncluding),
            product: (m.criteria ?? '').split(':')[4] ?? null,
            versionType: null, source: 'nvd-cpe',
          });
        }
      }
    }
    /* `raw` is kept for the `field` check: a sentence that says "carries no `metrics` key" is a claim
       about the PAYLOAD, and every derived field above has already flattened the answer — `metrics:
       {}` and a missing `metrics` produce the same empty array. The record is small (a few KB) and
       the pull is one call per feed, so keeping it costs nothing next to the parse that already ran. */
    map.set(c.id, { status: c.vulnStatus, assigner: c.sourceIdentifier, modified: c.lastModified, published: c.published, metrics, cwe, desc, cpe: cpeRanges, raw: c });
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

/* The sentence carrying a literal needle (a slug, a URL) — for reading what the item says ABOUT it.
 * A SLUG IS A PREFIX OF ITS SIBLINGS, which the first version of this helper missed: item 5 of the
 * 11-05 feed names `tencent/Hy4-preview` (a real model) four sentences before it says "There is no
 * `tencent/Hy4`", so a plain `indexOf` bound the negation to the WRONG sentence and the guard could
 * not fire. The occurrence counts only when the next character cannot continue the name. */
function sentenceWith(t, needle) {
  const s = String(t);
  let i = -1;
  for (let from = 0; (i = s.indexOf(needle, from)) >= 0; from = i + needle.length) {
    if (!/[A-Za-z0-9_.\-/]/.test(s[i + needle.length] ?? ' ')) break;
  }
  if (i < 0) return '';
  const r = sentences(s).find((x) => i >= x.start && i < x.end);
  return r ? s.slice(r.start, r.end) : s.slice(Math.max(0, i - 200), i + 200);
}

/** A sentence that asserts a name does not exist — a 404 agrees with it rather than refuting it. */
const ABSENT_ASSERTED = /\b(?:there (?:is|are|was|were) no|no such|(?:does|do|did) not exist|has no (?:github|repo|repository|release)|no (?:public |official )?(?:github |hf |hugging face )?(?:repo|repository|release|weights) (?:exists|yet))\b/i;

/** An item that says it counted the number itself is not claiming a page says it. */
/* Two arms added 2026-11-05, both from item 16 of that day's feed, whose sentence is "Neither the
 * README nor the MCP docs states a total, so we counted the git tree ourselves: 174 `SKILL.md`
 * files" — correct (the tree API returns 174: 167 under `skills/`, 7 under `.agents/`) and reported
 * `absent` **twice** because neither spelling was in the vocabulary:
 *   (a) **`we counted`** — the existing arm requires `counted from|it|them|myself|by hand`, so the
 *       first-person plural, which is how an author writes it, was invisible. The object varies
 *       ("the git tree", "the release list", "every skill directory"), so only the subject is pinned.
 *   (b) **`neither … states a total`** — the existing arm is `no page states a total`; a negative
 *       about TWO named pages says the same thing in a shape the alternation could not reach.
 * Both keep the same denominator guard as every other arm: the sentence must also carry the NUMBER
 * (`selfCountedNear`), so an item that says "we counted the tree" about 24 cannot suppress a
 * different 174. */
const SELF_COUNTED = /\b(?:counted (?:from|it|them|myself|by hand)|no page states (?:a |the )?total|nothing states a total|count(?:ed)? (?:from|off) the (?:manifest|README|file|page)|a total counted|\bwe counted\b|\b(?:no|neither)\b[^.]{0,80}?\b(?:states?|gives?|lists?|publishes?)\s+(?:a|the)\s+total|(?:block|field|key|frontmatter|metadata)\s+(?:lists|carries|has|holds|contains)\s+\d+)\b/i;

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
/* The arithmetic lives in `cvss-recompute.mjs`, which owns the spec transcription (FIRST v3.1
 * §7.2, one Roundup over the flat product; v4.0 folds `E` into the MacroVector lookup) and can
 * express both frameworks. It moved there on 2026-11-02 when the stopping-point census needed the
 * same function over a week of NVD records — one implementation, two callers, instead of a second
 * copy that would drift. */
const temporalStops = stoppingPoints;
const TEMPORAL_NAME = { E: 'Exploit Code Maturity', RL: 'Remediation Level', RC: 'Report Confidence' };

/** The sentence that names which stopping point a stored number sits at. */
function describeStop(st, score) {
  const hit = st.stops.filter((s) => Math.abs(s.score - score) < 0.05).at(-1);
  const all = st.stops.map((s) => (s.label === 'base' ? `base ${s.score}` : `${s.label} ${s.score}`)).join(', ');
  const point = hit
    ? ` — that is ${hit.label === 'base' ? 'the base score' : `the ${hit.label} score${hit.applied.length ? ` with only ${hit.applied.join(', ')} applied` : ''}`}`
    : ' — which is none of them';
  /* The two frameworks get their arithmetic from different places and it is worth saying which:
     v3.x multiplies by the Threat weights (FIRST v3.1 §7.2, one Roundup over the flat product),
     v4.0 feeds `E` into the MacroVector lookup, which is why v4.0 is the framework the oracle is
     needed for. A citation that names the wrong spec is the kind of small lie this file exists to
     stop, and the first version of this sentence said "FIRST v3.1 §7.2" over a v4.0 record. */
  const spec = st.version === '4.0' ? 'v4.0 §8.2, E in the MacroVector lookup' : 'FIRST v3.1 §7.2';
  return `${point} (${all}; full ${st.version === '4.0' ? 'threat' : 'temporal'} ${st.full}, ${spec})`;
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
  // `v` gates the cache schema: entries written before the cwe read carry no `problemTypes`, and a
  // missing array would read as "the container states no CWE" — the exact claim this check exists
  // to test. A schema-less hit is stale, not evidence.
  // v6 adds `fields` (the presence table the `field` check reads). An entry written before it would
  // answer "metric is missing" for a container that carries `"metrics": {}` — the OpenOffice
  // sentence one layer over, so the bump is the guard rather than an optimisation.
  if (hit && hit.v === CNA_CACHE_V && Date.now() - Date.parse(hit.fetched_at) < ttl) return hit;
  let j;
  try {
    j = JSON.parse(execFileSync('curl', ['-s', '--max-time', '20', `https://cveawg.mitre.org/api/cve/${id}`], { encoding: 'utf8', maxBuffer: 8 * 1024 * 1024 }));
    if (!j?.cveMetadata) throw new Error('not-in-cveawg');
  } catch (e) {
    cache[key] = { fetched_at: new Date().toISOString(), v: CNA_CACHE_V, error: e.message === 'not-in-cveawg' ? 'not-in-cveawg' : 'unreadable' };
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
  /* problemTypes is CVE 5.x's weakness field, and it exists in the CNA container AND in every ADP
     container. A CISA-ADP rewrite can therefore place a CWE where the CNA has none — the same
     layered-record shape the score check already names, so the origin is carried, not flattened. */
  const cwe = [];
  const containers = [['cna', j.containers?.cna], ...Object.entries(j.containers?.adp ?? {}).map(([k, v]) => [`adp${k ? `[${k}]` : ''}`, v])];
  for (const [origin, c] of containers) {
    for (const pt of c?.problemTypes ?? []) {
      for (const d of pt.descriptions ?? []) if (d.cweId) cwe.push({ value: d.cweId, origin, description: d.description });
    }
  }
  /* `descriptions[]` — the CNA's own prose, which a `Received` record replaces with nothing on the
     NVD side. It is a verbatim source for the `quotation` check: an advisory sentence quoted in the
     feed has bytes in the record, and the record is not a page. */
  const desc = (j.containers?.cna?.descriptions ?? []).map((d) => d.value).join(' ');
  /* `affected[]` is the CNA's own statement of the range — a different field from NVD's
     `configurations[]`, which is analysis output, and present on 97.4% of records where
     `configurations` is present only on analysed ones (census 2026-10-25). Kept per `versions[]`
     ENTRY, because one affected entry can carry several (one per release line), and `changes[]` is
     carried beside it: a change entry ENDS a range at its `at` version, so a span with one is not
     the shape a `≤ max` reader thinks it is. */
  const ranges = [];
  for (const a of j.containers?.cna?.affected ?? []) {
    for (const v of a.versions ?? []) {
      const status = v.status ?? a.defaultStatus ?? 'affected';
      if (status !== 'affected') continue;
      ranges.push({
        product: a.product ?? null,
        min: v.version ?? null,
        minInc: true,
        max: v.lessThanOrEqual ?? v.lessThan ?? null,
        maxInc: Boolean(v.lessThanOrEqual),
        versionType: v.versionType ?? a.versionType ?? null,
        changes: (v.changes ?? []).map((c) => ({ at: c.at, status: c.status })),
        source: 'cna-affected',
      });
    }
  }
  /* The SHAPE of `affected[]` — not its ranges — is what the `rangeabsent` check reads, and it is a
     different question from the one `ranges` answers. Measured on the 11-05 filing case: NVD's
     `configurations` is empty because the record is `Awaiting Analysis`, the CNA's `affected[]`
     carries `2.19.0 < 2.23.0`, and the two facts together are exactly what a "the record names no
     fixed version" sentence gets wrong. `entries` counts the array, `versioned` counts entries that
     state a `versions[]` at all (the Red Hat shape has products and no versions), and `key` keeps
     MISSING apart from `[]` — the `metrics: {}` distinction one field over. */
  const affRaw = j.containers?.cna?.affected;
  const affected = {
    key: affRaw === undefined ? 'absent' : Array.isArray(affRaw) ? (affRaw.length ? 'populated' : 'empty') : 'other',
    entries: Array.isArray(affRaw) ? affRaw.length : 0,
    versioned: Array.isArray(affRaw) ? affRaw.filter((a) => (a.versions ?? []).length).length : 0,
    products: Array.isArray(affRaw) ? [...new Set(affRaw.map((a) => a.product).filter(Boolean))] : [],
  };
  /* `references[]` is the THIRD place a record names a fix (`versions[]` is the second, prose the
     first), and here it is the only one a commit-shaped remedy can reach. */
  const refs = (j.containers?.cna?.references ?? []).map((r) => r.url).filter(Boolean);
  cache[key] = { fetched_at: new Date().toISOString(), v: CNA_CACHE_V, state: j.cveMetadata.state, assigner: j.cveMetadata.assignerShortName, metrics, cwe, desc, ranges, affected, refs, published: j.cveMetadata.datePublished, fields: fieldTable(j.containers ?? {}) };
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
      /* ── the stopping-point advisory (System item, filed 2026-11-02 12:32) ──────────────────
       * A vector carrying a Threat metric has several honest numbers, and a quoted one names which
       * only if the writer says so. Measured over NVD's 2026-10-26→11-01 window: **136 metrics
       * carry one, and 136/136 store the THREAT score** — every one v4.0, because NVD strips the
       * temporal metrics from v3.x and keeps v4.0's `E` (CNA join over 259 record/framework pairs:
       * **123 v3.1 stripped / 136 v4.0 kept**, and the two artifacts disagree on **123 of 136**
       * v4.0 pairs by −3.4…−0.4 — all of it the Threat term). So a quoted v4.0 score on NVD is
       * usually a threat score and the reader cannot tell.
       * Advisory, not a finding: the number is right, the sentence is under-specified. Suppressed
       * the way `slot-quoted` and `counted-by-author` are — by the item saying it out loud, or by
       * quoting more than one stopping point of the same vector (enumeration is disclosure). */
      const stops = hit.vector ? stoppingPoints(hit.vector) : null;
      if (stops && stops.stops.length > 1) {
        const namesStop = /\b(?:base|temporal|threat)\b[^.]{0,24}\bscore\b|\bstopping[- ]point\b|\b(?:base|threat)\s*(?:score)?\s*\(?[A-Z]?:?[A-Z]\b|E:(?:A|P|U|H|F)\b/i.test(t);
        /* Enumeration is disclosure, and it is not always a second CVSS PAIR: "9.8 … or 8.5 once
           E and RC are applied" gives the second number a unit in prose rather than a version
           label, so the score extractor never sees it. Read every stopping point off the item's
           own text instead of off the extracted pairs. */
        const enumerated = stops.stops.filter((s) => new RegExp(`(?:^|[^\\d.])${s.score.toFixed(1)}(?!\\d)`).test(t)).length > 1;
        if (!namesStop && !enumerated) {
          const here = stops.stops.map((s) => `${s.label} ${s.score}`).join(' · ');
          out.push({
            check: 'cvss', item: it.n, verdict: 'score-stopping-point',
            claim: `${cl.version} ${cl.score}`,
            detail: `${hit.id}'s vector carries a Threat metric, so one vector yields ${here}; the record stores ${hit.score}, which is the ${repro.stopping === 'base' ? 'BASE' : `${repro.stopping.toUpperCase()} score`} — say which one you quote, because the reader cannot see it in the record`,
          });
          continue;
        }
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

// ── check G: `vulnStatus`, the one field NVD moves on its own ───────────────────────────────
/* A status is not a fact about the vulnerability; it is NVD's *queue position*, and it moves
 * without the feed doing anything wrong. filed 2026-10-30 04:27 after the 04:03 batch's item 2
 * published "NVD marked the record `Analyzed`" for a record that had gone BACK to `Undergoing
 * Analysis` 27 minutes after its KEV add — CISA-ADP rewrote the container at 19:58:23Z and NVD
 * `lastModified` followed at 20:17:37Z. The rule ("name who scored it, and in what status") has
 * been in CLAUDE.md since 10-14; nothing executed it, which is the same defect the other checks
 * in this file were built to fix.
 *
 * Two things decide whether a mention is a claim at all:
 *   (a) **capitalization + an anchor.** `Analyzed` capitalized is NVD's word; `analyzed the
 *       binary` is English and does not match. A backticked token is a claim by construction; a
 *       bare one needs a registry word near it (`NVD`, `record`, `status`, `marked`, …).
 *   (b) **a transition names two statuses and is not a claim about the first.** "went
 *       `Analyzed` → `Undergoing Analysis`" is the CORRECT way to write the 10-30 regression, so
 *       an arrow disambiguates (the status after it is current) and two statuses without an arrow
 *       suppress the sentence entirely — "`Deferred`, unlike the other three which are
 *       `Analyzed`" would otherwise bind the wrong one. A coin-flip is not a finding.
 * A disagreeing claim that dates itself ("when I checked", "as of", "on 10-29") is `status-dated`
 * — advisory, the `star-dated` shape: disclose when you read it and the drift is the trend.
 */
const NVD_STATUS_VOCAB = ['Undergoing Analysis', 'Awaiting Analysis', 'Analyzed', 'Deferred', 'Received', 'Modified', 'Rejected'];
/* The pipeline order, for the DIRECTION of a disagreement. `Deferred` and `Rejected` are off it:
 * one means NVD declined to analyze, the other that the record was withdrawn, so neither is
 * "earlier" or "later" than `Analyzed`. */
const STATUS_PIPELINE = { Received: 1, 'Awaiting Analysis': 2, 'Undergoing Analysis': 3, Analyzed: 4, Modified: 5 };
const STATUS_ANCHOR = /\b(?:NVD|CVE|cveawg|cve\.org|record|status|registry|entry|marked|carries|carried|says|said|lists|listed|remains|still|moved|moves|went|sits|sitting|reads|shows|holds)\b/i;
const STATUS_DATED = /\b(?:at the time of writing|when I checked|as of|originally|had been|previously|was still|yesterday|last (?:week|month)|on \d{4}-\d{2}-\d{2}|on \d{2}-\d{2})\b/i;
const STATUS_ARROW = /(?:→|->|—>|becomes|became)/;

function statusMentions(text) {
  const out = [];
  const alt = NVD_STATUS_VOCAB.map((s) => s.replace(/ /g, '\\s+')).join('|');
  const re = new RegExp(`(?<![\\w-])(${alt})(?![\\w-])`, 'g');
  for (const m of text.matchAll(re)) {
    const at = m.index;
    const end = at + m[0].length;
    const canonical = NVD_STATUS_VOCAB.find((s) => s.toLowerCase() === m[0].replace(/\s+/g, ' ').toLowerCase());
    if (!canonical) continue;
    const backticked = text[at - 1] === '`' && text[end] === '`';
    if (!backticked && !STATUS_ANCHOR.test(text.slice(Math.max(0, at - 90), at))) continue; // English, not a status
    out.push({ status: canonical, at, end, backticked, phrase: m[0] });
  }
  return out;
}

function checkStatus(it, subjects) {
  const out = [];
  const text = it.text;
  const mentions = statusMentions(text);
  if (!mentions.length) return out;
  // Raw text throughout: the offsets must be the same text's, and `CVE-` ids contain none of the
  // characters `strip()` removes, so there is nothing to gain from stripping here.
  const ids = idMentions(text);
  const sents = sentences(text);
  const ctx = { sents, primary: ids.length ? primarySubject(text, ids) : null };
  const done = new Set();

  for (const m of mentions) {
    const s = sents.find((x) => m.at >= x.start && m.at < x.end);
    if (!s) continue;
    if (done.has(s.start)) continue;
    const inSent = mentions.filter((x) => x.at >= s.start && x.at < s.end);
    const distinct = [...new Set(inSent.map((x) => x.status))];
    const sentText = text.slice(s.start, s.end);
    let claim = m;
    if (distinct.length > 1) {
      const arrow = sentText.match(STATUS_ARROW);
      if (!arrow) { done.add(s.start); continue; } // two statuses, no direction — not a claim
      const arrowAt = s.start + arrow.index;
      const after = inSent.filter((x) => x.at >= arrowAt);
      if (!after.length) { done.add(s.start); continue; }
      claim = after[after.length - 1];
    }
    if (!ids.length) {
      out.push({ check: 'status', item: it.n, verdict: 'status-no-cve', claim: `\`${claim.status}\``,
        detail: 'a vulnStatus with no CVE id in the item — the queue position cannot be checked, and a status is a claim about a specific record' });
      done.add(s.start);
      continue;
    }
    const bound = bindSubject(claim.at, ids, ctx);
    const rec = subjects.get(bound.id);
    if (!rec) {
      // Absence is a registry statement: the item may be describing a record NVD genuinely lacks.
      out.push({ check: 'status', item: it.n, verdict: 'status-no-record', claim: `${bound.id} \`${claim.status}\``,
        detail: `NVD carries no record for ${bound.id}, so the status claim cannot be checked — that is "not in this registry", not "wrong"` });
      done.add(s.start);
      continue;
    }
    if (rec.error) { done.add(s.start); continue; } // unreadable is not wrong
    if (rec.status === claim.status) {
      out.push({ check: 'status', item: it.n, verdict: 'ok', claim: `${bound.id} \`${claim.status}\``,
        detail: `${rec.status}${rec.modified ? ` (lastModified ${rec.modified})` : ''}` });
      done.add(s.start);
      continue;
    }
    const dated = STATUS_DATED.test(sentText);
    const was = STATUS_PIPELINE[claim.status];
    const now = STATUS_PIPELINE[rec.status];
    const direction = was != null && now != null ? (now < was ? 'REGRESSION — the record moved BACK' : 'the record has advanced since')
      : `one of the two is off the analysis pipeline (${claim.status} → ${rec.status})`;
    const detail = `${bound.id} is \`${rec.status}\`${rec.modified ? ` (lastModified ${rec.modified})` : ''}, not \`${claim.status}\` — ${direction}; a status is NVD's queue position and it moves without the feed changing`;
    if (dated) {
      out.push({ check: 'status', item: it.n, verdict: 'status-dated', claim: `${bound.id} \`${claim.status}\``,
        detail: `${detail} — the sentence dates itself, so the drift is the TREND rather than an error: re-read and say when` });
    } else {
      out.push({ check: 'status', item: it.n, verdict: 'status-stale', claim: `${bound.id} \`${claim.status}\``, detail });
    }
    done.add(s.start);
  }
  return out;
}

/* Check H — a publish date is a CALENDAR DAY in the record's own clock, and a host at UTC+8 reads
 * the same instant as the NEXT day. Filed 2026-11-02 04:31 by my own error in that batch: item 18
 * published `CVE-2026-120209` as "published 2026-11-01" while cveawg's `datePublished` is
 * 2026-10-31T17:25:56Z (NVD: 2026-10-31) — the quoted day is the LOCAL date of that instant, which
 * is the `updated:` trap one layer over (CLAUDE.md: a date without a zone is a claim, not a
 * measurement). Three guards, each a way the check would otherwise be noise:
 *   (a) only PUBLISH cues count — "fixed", "released" and "reserved" are different clocks, and NVD
 *       carries no `dateReserved` at all, so a reservation date is unverifiable here rather than wrong;
 *   (b) a claim binds only when its own sentence names the id, or the item names exactly one CVE, or
 *       every record the item cites agrees on the day — otherwise a multi-CVE Source line's single
 *       date would be scored against whichever id happened to be primary;
 *   (c) an absent record is `skip`, never a finding — unreadable is not wrong. */
/* `\\b` after the day FAILS on an ISO instant, because `1` and `T` are both word characters — so
   `published 2026-10-31T09:29Z · reserved 2026-10-28` skipped the instant and scored the *reserved*
   day against the record, and `CVE published 2026-10-30T14:36Z · advisory dated 2026-06-24` scored
   the advisory's. Measured on the 33-feed census (11-02): 2 of the first 11 findings. The fix is a
   digit lookahead, not a `\\b`. */
const PUB_DATE = /\b(published|disclosed)\b[^.;|\n]{0,48}?(20\d\d-\d\d-\d\d)(?![\d])/g;
/* The cue is about the ARTIFACT nearest it far more often than about the record — measured over 33
   feeds (11-02): **10 of 11 findings were the checker's**, and every one of them was a cue about
   something else. Five suppressors, each a live case from that census:
     - "published **the** Sleep framework" / "published **by** Patchstack" → an author's output;
     - a version token immediately before the cue ("v0.1.7, published 2026-05-06", "7.1.2-33 was
       published on 2026-10-10") → a RELEASE date;
     - an artifact noun in the 60 characters before it (release, tag, advisory, report, research,
       article, blog, post, paper, commit, README, docs, bulletin) → that artifact's date;
     - a `Source:` line whose text before the cue names no registry (cveawg, CVE Program, NVD, CNA
       records) → the citing SITE's date, e.g. "Unit 42 · published 2026-10-14";
     - and a Source line that DOES name the registry is kept, which is what let the census find a
       real `date-local-shift` ("CVE Program (cveawg) · published 2026-10-24"). */
const DATE_ARTIFACT = /\b(?:releases?|released|tags?|tagged|advisories|advisory|reports?|research|articles?|blog|posts?|posted|papers?|commits?|README|docs?|specs?|bulletins?)\b/i;
const REGISTRY = /\b(?:cveawg|CVE Program|NVD|CNA|CVE)\b/i;
function dateCueIsArtifact(text, idx, dateStart) {
  const after = text.slice(idx, idx + 16);
  if (/^(?:published|disclosed)\s+(?:the|a|an)\b/i.test(after)) return true;   // published the framework
  if (/^(?:published|disclosed)\s+by\b/i.test(after)) return true;            // published by Patchstack
  // markdown emphasis sits BETWEEN the version and the cue (`**v0.1.7**, published`, `` 7.1.2-33 ``
  // was published) and a literal test reads that as no version at all — the 10-22 and 10-27 cases.
  /* The Source line decides by its own rule and returns, because its source NAME is made of the very
     words the artefact test looks for — `CVE Program (cveawg) / Postiz advisories · published …` was
     suppressed for containing "advisories", which is the registry speaking, not a vendor posting. */
  const lineStart0 = text.lastIndexOf('\n', idx) + 1;
  const lineEnd0 = text.indexOf('\n', idx);
  const line0 = text.slice(lineStart0, lineEnd0 < 0 ? text.length : lineEnd0);
  const srcIdx0 = line0.search(/\*\*Source:\*\*/);
  if (srcIdx0 >= 0) return !REGISTRY.test(text.slice(lineStart0 + srcIdx0, idx));
  const before = text.slice(Math.max(0, idx - 60), idx).replace(/[*`]/g, '');
  /* A version ATTACHED to the cue means a RELEASE: "v0.1.7, published…", "7.1.2-33 was published…",
     "worker 0.1.756 and gateway 0.1.776 — both published 2026-09-15T04:03Z". Presence alone is not
     enough — the item's sentence names the CVE and a version in every other case — so the test is
     the short tail between the version and the cue: punctuation, a dash, `both`/`all`, `was`/`is`. */
  if (/(?:^|[\s(])v?\d+(?:\.\d+)+(?:[-.][0-9A-Za-z][0-9A-Za-z.\-]*)?\s*[,;:]?\s*(?:[—–-]\s*)?(?:both\s+|all\s+)?(?:was\s+|is\s+)?$/.test(before)) return true;
  if (DATE_ARTIFACT.test(before)) return true;                                // "release … published"
  return false;
}
function checkDate(it, subjects, cna = new Map()) {
  const out = [];
  const text = it.text;
  const ids = idMentions(text);
  if (!ids.length) return out;
  const distinct = [...new Set(ids.map((m) => m.id))];
  const sents = sentences(text);
  const ctx = { sents, primary: primarySubject(text, ids) };
  const dayOfString = (p) => {
    if (!p) return null;
    const iso = /Z$|[+-]\d\d:?\d\d$/.test(p) ? p : `${p}Z`; // NVD omits the Z — parse it as UTC
    const ms = Date.parse(iso);
    if (!Number.isFinite(ms)) return null;
    return { utc: iso.slice(0, 10), local: new Date(ms + 8 * 3600e3).toISOString().slice(0, 10) };
  };
  /* TWO CLOCKS. NVD's `published` is when NVD ingested the record; cveawg's `datePublished` is when
     the CNA published it, and they are hours apart — enough to land on different calendar days, which
     is how CVE-2026-117656 (cveawg 2026-10-30T23:55:23Z, NVD 2026-10-31T00:16:51Z) was reported as a
     mismatch against a correct "published 2026-10-30" (census 2026-11-02). A claim is true if it
     matches EITHER clock's day; when the two disagree the verdict says which one it matched. */
  const clocksOf = (id) => {
    const out = [];
    const n = dayOfString(subjects.get(id)?.published);
    if (n) out.push({ name: 'NVD published', raw: subjects.get(id).published, ...n });
    const c = cna.get(id)?.published;
    const cd = dayOfString(c);
    if (cd) out.push({ name: 'cveawg datePublished', raw: c, ...cd });
    return out;
  };
  // the item's records, for the "every cited record agrees on the day" arm of guard (b)
  const recDays = distinct.map((id) => dayOfString(subjects.get(id)?.published)).filter(Boolean);
  const unanimous = recDays.length > 0 && recDays.every((d) => d.utc === recDays[0].utc);
  const done = new Set();
  for (const m of text.matchAll(PUB_DATE)) {
    const quoted = m[2];
    const at = m.index + m[0].lastIndexOf(quoted);
    if (dateCueIsArtifact(text, m.index, at)) continue;
    const s = sents.find((x) => at >= x.start && at < x.end);
    if (!s || done.has(s.start)) continue;
    const inSent = ids.filter((x) => x.at >= s.start && x.at < s.end);
    let id = null;
    if (inSent.length) id = bindSubject(at, ids, ctx).id;
    else if (distinct.length === 1 || unanimous) id = distinct[0];
    if (!id) continue;
    const clocks = clocksOf(id);
    if (!clocks.length) continue; // no record / no published / unreadable — silence is not equality
    done.add(s.start);
    const utcHit = clocks.find((c) => c.utc === quoted) ?? null;
    const localHit = clocks.find((c) => c.local === quoted) ?? null;
    const all = clocks.map((c) => `${c.name} ${c.raw} (${c.utc} UTC)`).join(' · ');
    if (utcHit) {
      out.push({ check: 'date', item: it.n, verdict: 'ok', claim: `${id} published ${quoted}`,
        detail: clocks.length > 1 ? `${all} — the two clocks differ; ${quoted} is the ${utcHit.name} day` : utcHit.raw });
    } else if (localHit) {
      out.push({ check: 'date', item: it.n, verdict: 'date-local-shift', claim: `${id} published ${quoted}`,
        detail: `${all} — ${quoted} is that instant's UTC+8 date, so the quoted day is the host's local one; write the UTC date, or the instant with its Z` });
    } else {
      out.push({ check: 'date', item: it.n, verdict: 'date-mismatch', claim: `${id} published ${quoted}`,
        detail: `${all} — neither clock's day is ${quoted}` });
    }
  }
  return out;
}

/* ── paper dates: an arXiv `published` instant is one unmetered call, and the feed was a day early on
 * 3 of 3 papers of the 11-05 batch (2611.03998 cited 2026-11-01, published 2026-11-02T21:38:49Z;
 * 2611.02017 cited 2026-10-31, published 2026-11-01T16:04:16Z; 2611.05036 cited 2026-11-02,
 * published 2026-11-03T15:09:01Z). Same direction and magnitude 3/3 — a unit defect in the
 * generator, not three typos — and **no existing arm could see it**: `checkDate` binds publish cues
 * to CVE records only, and `count`/`ratio` read pages rather than timestamps.
 *
 * Two rules the calibration put in, each a way this would otherwise produce a false finding:
 *   (a) **the cue must be SUBMISSION** (`submitted`, `posted`, `preprint`), never
 *       `announced`/`published`/`updated` — arXiv's announcement date is a second, later clock, and
 *       "updated" belongs to a revision, which is the separate verdict below.
 *   (b) **a revision has its own instant**, so a quoted date that matches `updated` on a v2+ paper
 *       is `paper-date-revision` (it names the wrong submission, not the wrong day) rather than a
 *       mismatch.
 * A quoted instant is compared at the precision it states — the feed writes `21:38Z` for
 * `21:38:49Z`, which is a truncation, not an error.
 */
const PAPER_CACHE_V = 1;
const ARXIV_SUBMIT_CUE = /\b(submitted|posted|preprint\s+(?:dated|of))\b[^.\n]{0,40}?(\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}(?::\d{2})?Z?)?)/i;

async function arxivRecords(ids) {
  const out = new Map();
  const miss = [];
  for (const id of ids) {
    const hit = cache[`paper:${id}`];
    if (hit && hit.v === PAPER_CACHE_V && Date.now() - Date.parse(hit.fetched_at) < CACHE_TTL_MS) { out.set(id, hit.rec); continue; }
    miss.push(id);
  }
  if (!miss.length || NO_NET) return out;
  try {
    // ONE request for the batch — the API accepts a comma-separated id_list
    const r = await fetch(`https://export.arxiv.org/api/query?id_list=${miss.join(',')}&max_results=${miss.length + 2}`, { signal: AbortSignal.timeout(30_000) });
    const xml = await r.text();
    for (const m of xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)) {
      const e = m[1];
      const full = (/<id>([^<]+)<\/id>/.exec(e) ?? [])[1];
      if (!full) continue;
      const withV = full.split('/abs/')[1] ?? '';
      const base = withV.replace(/v\d+$/, '');
      const rec = {
        id: base,
        version: Number((/v(\d+)$/.exec(withV) ?? [])[1] ?? 1),
        published: (/<published>([^<]+)<\/published>/.exec(e) ?? [])[1] ?? null,
        updated: (/<updated>([^<]+)<\/updated>/.exec(e) ?? [])[1] ?? null,
      };
      cache[`paper:${base}`] = { fetched_at: new Date().toISOString(), v: PAPER_CACHE_V, rec };
      out.set(base, rec);
    }
  } catch { /* unread is a state, not an absence — the caller reports it as unread */ }
  return out;
}

/** Pure: what the item's quoted date is, given the record. Split out so `--selftest` pins it. */
function paperVerdict(rec, quoted) {
  if (!rec?.published) return { verdict: 'paper-date-unread', detail: 'the arXiv API returned no record for this id — unread is not a wrong date' };
  const pub = rec.published;
  const pubDay = pub.slice(0, 10);
  const upd = rec.updated ?? pub;
  if (quoted.length <= 10) {
    // a DAY, where the record carries an instant — the imprecision is the finding, not a mismatch
    if (quoted === pubDay) return { verdict: 'paper-date-imprecise', day: pubDay,
      detail: `the item quotes ${quoted}; arXiv's \`published\` is ${pub} — the day is right and the instant is available, so quote it` };
    if (rec.version >= 2 && quoted === upd.slice(0, 10)) return { verdict: 'paper-date-revision', day: pubDay,
      detail: `the item quotes ${quoted}, which is this paper's REVISION instant (${upd}); the first submission was ${pub} (v${rec.version}) — name which submission` };
    return { verdict: 'paper-date-mismatch', day: pubDay,
      detail: `the item quotes ${quoted}; arXiv's \`published\` is ${pub}${rec.version >= 2 ? ` (updated ${upd})` : ''}` };
  }
  const q = Date.parse(quoted);
  if (!Number.isFinite(q)) return { verdict: 'paper-date-unread', detail: `“${quoted}” is not a parseable instant — silence, not a finding` };
  const near = (iso) => Number.isFinite(Date.parse(iso)) && Math.abs(q - Date.parse(iso)) < 60_000;
  if (near(pub)) return { verdict: 'ok', detail: `arXiv \`published\` ${pub} — the quoted instant is the submission's` };
  if (rec.version >= 2 && near(upd)) return { verdict: 'paper-date-revision', day: pubDay,
    detail: `the item quotes ${quoted}, which is this paper's REVISION instant (${upd}); the first submission was ${pub} (v${rec.version}) — name which submission` };
  return { verdict: 'paper-date-mismatch', day: pubDay,
    detail: `the item quotes ${quoted}; arXiv's \`published\` is ${pub}${rec.version >= 2 ? ` (updated ${upd})` : ''} — the difference is ${Math.round((q - Date.parse(pub)) / 60000)} minute(s)` };
}

function checkPaper(it, papers) {
  const out = [];
  const ids = [...new Set([...it.plain.matchAll(/arxiv\.org\/abs\/(\d{4}\.\d{4,5})/g)].map((m) => m[1]))];
  for (const id of ids) {
    const rec = papers.get(id);
    // the cue must be in a sentence that names THIS id — a neighbouring paper's date is not this one's
    const sents = sentences(it.plain).filter((s) => new RegExp(`\\b${id.replace('.', '\\.')}\\b`).test(it.plain.slice(s.start, s.end)));
    const hit = sents.map((s) => ARXIV_SUBMIT_CUE.exec(it.plain.slice(s.start, s.end))).find(Boolean);
    if (!hit) continue; // no submission cue — silence, never the announcement clock
    const v = paperVerdict(rec, hit[2]);
    out.push({ check: 'paper', item: it.n, verdict: v.verdict, claim: `arXiv ${id} ${hit[1]} ${hit[2]}`, detail: v.detail });
  }
  return out;
}

/**
 * The `--status-watch` store. A single feed run can only see today, so the *movement* — which is
 * the event worth catching, and which the 04:27 pass had to reconstruct from four timestamps by
 * hand — needs a memory across runs. One record per CVE: current status + the NVD stamp + an
 * append-only history that grows only when the status actually changes. Rides the same one NVD
 * request the cvss check already pays for; a run with no NVD budget simply writes nothing.
 */
const STATUS_STORE = process.env.STATUS_STORE ?? 'agent/data/nvd-status.json';
function statusWatch(records, now = new Date()) {
  let db = { cves: {} };
  try { db = JSON.parse(readFileSync(STATUS_STORE, 'utf8')); } catch { /* first run */ }
  db.cves = db.cves ?? {};
  db._note = 'vulnStatus watch (agent/tools/claim-unit-lint.mjs --status-watch). Records the one field NVD moves on its own, so a BACKWARDS move is visible rather than inferred from four timestamps by hand. Filed 2026-10-30 after CVE-2026-97229 went Analyzed → Undergoing Analysis when CISA-ADP rewrote its container 27 minutes after a KEV add. `at` is when this tool observed it; `modified` is the record\'s own lastModified.';
  const moved = [];
  for (const [id, rec] of records) {
    if (!rec || rec.error || !rec.status) continue;
    const prev = db.cves[id];
    if (prev && prev.status === rec.status) { prev.modified = rec.modified ?? prev.modified; prev.seen = now.toISOString(); continue; }
    const was = prev?.status;
    const entry = { status: rec.status, modified: rec.modified ?? null, seen: now.toISOString() };
    if (!prev) { db.cves[id] = { ...entry, history: [{ at: now.toISOString(), status: rec.status, modified: rec.modified ?? null }] }; continue; }
    prev.history = [...(prev.history ?? []), { at: now.toISOString(), status: rec.status, modified: rec.modified ?? null }].slice(-12);
    Object.assign(prev, entry);
    const a = STATUS_PIPELINE[was], b = STATUS_PIPELINE[rec.status];
    moved.push({ id, from: was, to: rec.status, regressed: a != null && b != null && b < a, modified: rec.modified });
  }
  /* A watch that only appends becomes a database of every CVE the feed ever cited. A record that
   * moved is the thing worth keeping, so history length is the retention rule: a single-observation
   * entry older than the cutoff is a fact the feed has stopped asking about. */
  const cutoff = now.getTime() - 45 * 86400 * 1000;
  for (const [id, v] of Object.entries(db.cves)) {
    if ((v.history?.length ?? 0) > 1) continue;
    const last = Date.parse(v.seen ?? v.history?.[0]?.at ?? 0);
    if (Number.isFinite(last) && last < cutoff) delete db.cves[id];
  }
  try { mkdirSync(dirname(STATUS_STORE), { recursive: true }); writeFileSync(STATUS_STORE, JSON.stringify(db, null, 1)); } catch { /* best-effort */ }
  return moved;
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
  /* The disclosure guard, and it is the same one the `cvss` check's `score-stopping-point`
   * advisory already carried — this check shipped without it on 2026-11-02 12:34 and produced
   * **3 advisories in one run, all three against items that disclose the stop**: item 28 wrote
   * "a **base of 10.0 and a threat score of 9.3**", item 35 "the base score, with `E:P` taking
   * the full temporal value to 9.4". A record-shape check is right to fire on the CONTAINER, but
   * it must yield when the prose already named the stop — otherwise the advisory is measuring
   * whether the writer used this tool's vocabulary, not whether the reader can tell.
   * Two arms, both from the `cvss` check: a named stop (`base`/`threat`/`temporal` … `score`,
   * `stopping point`), or **enumeration** — the item quotes more than one number this record's
   * own vector yields, which is disclosure whatever the wording. Suppression is PRINTED
   * (`temporal-disclosed`, sev 0) because the class's size is only measurable if it is counted. */
  const namesStop = /\b(?:base|temporal|threat)\b[^.]{0,24}\bscore\b|\bstopping[- ]points?\b|\b(?:base|threat)\s*(?:score)?\s*\(?[A-Z]?:?[A-Z]\b|E:(?:A|P|U|H|F)\b/i.test(t);
  /* Enumeration binds to the record, not the item: a number in the text cannot be attributed to
   * an id unless it sits in that id's own stretch of prose. Segment = from this id's first
   * mention to the next mention of a DIFFERENT id — item 28's disclosure sentence lies between
   * `CVE-2026-120189`'s mention and the next record's, and the selftest's "a second record's
   * numbers do not disclose this one" is a 9.4 that happens to equal this vector's stop. */
  const idHits = [...t.matchAll(/CVE-\d{4}-\d{3,7}/g)].map((m) => ({ id: m[0], at: m.index }));
  const segmentOf = (id) => {
    const first = idHits.find((h) => h.id === id);
    if (!first) return t;
    const next = idHits.find((h) => h.at > first.at && h.id !== id);
    return t.slice(first.at, next ? next.at : t.length);
  };
  for (const id of ids) {
    const rec = cna.get(id);
    if (!rec || rec.error) continue;
    const seg = segmentOf(id);
    for (const m of rec.metrics ?? []) {
      const st = temporalStops(m.vector);
      if (!st) continue;
      const nvd = (subjects.get(id)?.metrics ?? []).map((x) => `${x.version} ${x.score} (${x.source})`);
      // Nothing to disambiguate when the vendor's number IS the base and the base is the whole story.
      if (Math.abs(m.score - st.base) < 0.05 && st.full === st.base) continue;
      // Enumeration is read per RECORD, off the numbers THIS vector yields — a second record's
      // numbers cannot disclose this one's stop.
      // distinct scores only: a v3.x chain can stop at the same number twice (9.4 after `E`, 9.4
      // again after `E`+`RC`), and counting one quoted number twice would suppress a real finding.
      const stopsSeen = [...new Set(st.stops.map((s) => s.score.toFixed(1)))];
      const quoted = stopsSeen.filter((x) => new RegExp(`(?:^|[^\\d.])${x}(?!\\d)`).test(seg)).length;
      const enumerated = quoted > 1;
      if (namesStop || enumerated) {
        out.push({
          check: 'temporal', item: it.n, verdict: 'temporal-disclosed',
          claim: `${id} · CNA ${m.score} / base ${st.base} / full ${st.full}`,
          detail: `${namesStop ? 'the item names a stopping point' : `the item quotes ${quoted} of this vector's ${stopsSeen.length} distinct stopping points`} — silent, because the prose already lets the reader tell which number it read`,
        });
        break; // one verdict per record is enough
      }
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

// ── check G: the weakness field ────────────────────────────────────────────────────────────────
/* "States no CWE" is a claim about TWO fields, and I published one on 2026-10-30 that was false:
 * item 36 said ClickHouse's CVE-2026-116366 "CNA container states no CWE" while `cveawg` returns
 * `problemTypes.descriptions[0].cweId = "CWE-190"` (and NVD carries it too). The rule that would
 * have caught it is the one already written for scores — name the field, then read it — so the
 * executor is a check rather than another sentence.
 *
 * Two shapes only:
 *   - `cwe-absent-but-recorded` — an absence claim on a record that carries a CWE id in either
 *     field (`weaknesses[]` is NVD's, `problemTypes` is the CNA/ADP's).
 *   - `cwe-mismatch` — a stated CWE id set that is DISJOINT from both fields. A partial quote is
 *     not an error: an item naming one of a record's two weaknesses is quoting, not misstating.
 * Suppression is narrow, and the narrowness is the point: an item that names the field it read
 * ("the CNA container states no…") is still making the claim and must fire — that is the exact
 * sentence that was wrong. Only a *quoted* or *attributed* absence is suppressed, because a
 * correction that reproduces the mistaken reading must not be scored as the mistake.
 */
/* The second half used to read `CWE … missing` within 24 characters, and the first calibration over
   an older feed caught it reading **CWE-306 "missing authentication"** — a weakness's own NAME — as
   an absence claim about the field. An identifier followed by an adjective from its title is not a
   claim; only "CWE is/was missing" and "CWE … not stated/recorded/assigned" are. */
const CWE_ABSENT = /\b(?:no|without|states?\s+no|carries?\s+no|names?\s+no|records?\s+no|assigns?\s+no|has\s+no|lists?\s+no)\s+(?:an?\s+|any\s+)?CWE\b|\bCWE\b\s+(?:is|was)\s+(?:absent|missing|not\s+(?:stated|recorded|assigned))\b|\bCWE\b[^.]{0,14}\bnot\s+(?:stated|recorded|assigned)\b/gi;
const CWE_NOISE = /^NVD-CWE-(?:noinfo|Other)$/i; // the field's words for "nothing here"
const CWE_ID = /\bCWE-\d{1,5}\b/g;
const CWE_ANCHOR = /\b(?:carries|carried|lists?|listed|names?|named|records?|recorded|assigns?|assigned|classif\w+|categor\w+|states?|stated|maps?\s+to|weakness(?:es)?)\b[^.;]{0,12}$/i;

function cweClaims(plain) {
  const out = [];
  for (const m of plain.matchAll(CWE_ABSENT)) {
    const before = plain.slice(Math.max(0, m.index - 40), m.index);
    if (/["“'‘]\s*$/.test(before)) continue;                                       // quoted speech
    if (/\b(?:report|read|say|see|claim|describ|interpret|parse|treat|render|calls?)\w*\b[^.]{0,24}$/i.test(before)) continue; // attributed to a reader
    out.push({ kind: 'absent', at: m.index, phrase: m[0] });
  }
  for (const m of plain.matchAll(CWE_ID)) {
    out.push({ kind: 'stated', at: m.index, value: m[0], phrase: m[0] });
  }
  return out.sort((a, b) => a.at - b.at);
}

function checkCwe(it, subjects, cna) {
  const out = [];
  const t = strip(it.text);
  const claims = cweClaims(t);
  if (!claims.length) return out;
  const mentions = idMentions(t);
  if (!mentions.length) return out; // no subject → nothing to read (and not an error: CWE describes a class)
  const ctx = { sents: sentences(t), primary: primarySubject(t, mentions) };
  const seen = new Set();

  for (const cl of claims) {
    const bound = bindSubject(cl.at, mentions, ctx);
    if (!bound || bound.kind !== 'cve') continue; // a GHSA has no weaknesses field of its own
    const key = `${bound.id}:${cl.kind}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const nvd = subjects.get(bound.id);
    const rec = cna?.get(bound.id);
    const nvdRead = !!nvd && !nvd.error;
    const cnaRead = !!rec && !rec.error;
    const values = [
      ...(nvdRead ? (nvd.cwe ?? []).filter((w) => !CWE_NOISE.test(w.value)).map((w) => ({ value: w.value, origin: `NVD weaknesses[] (${w.source})` })) : []),
      ...(cnaRead ? (rec.cwe ?? []).map((w) => ({ value: w.value, origin: `${w.origin} problemTypes` })) : []),
    ];
    const ids = [...new Set(values.map((v) => v.value))];
    const where = values.map((v) => `${v.value} in ${v.origin}`).join(' · ');

    if (cl.kind === 'absent') {
      if (ids.length) {
        out.push({ check: 'cwe', item: it.n, verdict: 'cwe-absent-but-recorded', claim: `${bound.id} “${cl.phrase}”`,
          detail: `${bound.id} carries ${where} — the absence claim is about a field, and this one has a value; an absence asserted from a different field (or from coverage) is the recurring defect, re-run \`nvd-provenance.mjs --ids ${bound.id}\` or read cveawg before writing it` });
        continue;
      }
      if (nvdRead && cnaRead) {
        out.push({ check: 'cwe', item: it.n, verdict: 'ok', claim: `${bound.id} no CWE`,
          detail: `absent from both fields read first-hand (NVD weaknesses[], cna/adp problemTypes)${cl.phrase.toLowerCase().includes('cna') ? '' : ''} — the absence is a field fact, not a coverage gap` });
      } else {
        out.push({ check: 'cwe', item: it.n, verdict: 'cwe-unreadable', claim: `${bound.id} “${cl.phrase}”`,
          detail: `only ${[nvdRead && 'NVD weaknesses[]', cnaRead && 'cna problemTypes'].filter(Boolean).join(' + ') || 'neither field'} could be read — an unread field is not an absent value` });
      }
      continue;
    }

    // stated set — only a CLASSIFICATION claim about this record, not every mention of a CWE id
    // ("a similar CWE-79 pattern" is a cross-reference, and scoring it against the subject's record
    // would manufacture a mismatch). Anchored = its own sentence names the CVE, or a record verb
    // sits just before it.
    const sent = ctx.sents.find((x) => cl.at >= x.start && cl.at < x.end);
    const inOwnSentence = !!sent && mentions.some((m) => m.at >= sent.start && m.at < sent.end && m.id === bound.id);
    const before60 = t.slice(Math.max(0, cl.at - 60), cl.at);
    if (!inOwnSentence && !CWE_ANCHOR.test(before60)) continue;
    if (!nvdRead && !cnaRead) {
      out.push({ check: 'cwe', item: it.n, verdict: 'cwe-unreadable', claim: `${bound.id} ${cl.value}`, detail: 'neither NVD nor cveawg could be read — unverifiable is not wrong' });
      continue;
    }
    if (ids.includes(cl.value)) {
      out.push({ check: 'cwe', item: it.n, verdict: 'ok', claim: `${bound.id} ${cl.value}`, detail: `stated in ${values.find((v) => v.value === cl.value).origin}` });
    } else {
      out.push({ check: 'cwe', item: it.n, verdict: 'cwe-mismatch', claim: `${bound.id} ${cl.value}`,
        detail: `${bound.id} records ${ids.length ? where : 'no CWE id at all (its values are the field\'s "nothing here" sentinels)'} — the item\'s stated set is disjoint from both fields` });
    }
  }
  return out;
}

// ── check I: field presence ─────────────────────────────────────────────────────────────────
/* Filed 2026-11-04 20:28 from this pipeline's own correction: item 42 said Apache OpenOffice's nine
 * unscored records "carry **no metrics key at all**" and all nine carry `"metrics": {}` — the key
 * exists and is EMPTY, which is a different sentence with a different consequence (a parser that
 * tests for the key's absence misses the record entirely; one that tests for a value skips it).
 *
 * The unit is the KEY, not the value, so no existing check could see it: `cvss` reads scores, `cwe`
 * reads two fields' values, `count` greps page text. This one walks the record's own JSON.
 *
 * Four verdicts, because the remedies differ:
 *   - `field-present-empty` (sev 2): the sentence says absent, the key exists with `{}`/`[]`/null —
 *     the filing case. The repair is one word ("empty"), and it changes what a reader builds.
 *   - `field-present` (sev 3): the sentence says absent and the key carries values.
 *   - `field-empty-contradicted` (sev 2): the sentence says empty and the field has values, with
 *     the record's `published` and `lastModified` equal — i.e. it was never empty.
 *   - `field-empty-since-moved` (sev 1): the same, but the record MOVED after publication. This is
 *     the perishability arm, and it is not hypothetical: while this check was being written, all
 *     nine OpenOffice records in the filing case acquired a CVSS 3.1 (eight CISA-ADP, one NVD) and
 *     the 11-04 item's "empty `metrics` object" became false without anyone editing it. A verifier
 *     that reported that as the author's error would be blaming the feed for the registry's clock.
 *
 * Guards, each a false positive the first design would produce:
 *   - a claim about a CHILD field ("no `cvssMetricV40`") walks the path the sentence names, so a
 *     record whose `metrics` exists but holds no v4.0 bucket is a true absence;
 *   - `must not pool` — "the other nine" is a SET claim bound to the item's own records, not to the
 *     nearest CVE id. The filing sentence names no CVE at all, and a nearest-id binding would have
 *     scored it against `CVE-2026-59263` (the ONE scored record) and called the correct sentence a
 *     contradiction;
 *   - a self-dated sentence ("at publication", "as of") is the trend, not the error;
 *   - a token that is not a known record field is a prose claim about something else, reported as
 *     `field-unknown-name` (sev 0) only when the sentence uses the word key/field;
 *   - an unread record is `field-unreadable`, never an absent value.
 */

/** Dotted-path presence table for the keys a sentence can assert about. Values are `present` /
 *  `empty`; only the first element of an array is walked (a field's shape does not vary per entry),
 *  and two levels deep is enough for `metrics.cvssMetricV40` and `cna.metrics`. */
function fieldTable(node, prefix = '', depth = 0, out = {}) {
  if (!node || typeof node !== 'object' || depth > 2) return out;
  const obj = Array.isArray(node) ? (node[0] ?? null) : node;
  if (!obj || typeof obj !== 'object') return out;
  for (const [k, v] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${k}` : k;
    const isObj = v !== null && typeof v === 'object';
    const empty = v == null || v === '' || (isObj && (Array.isArray(v) ? v.length === 0 : Object.keys(v).length === 0));
    if (!(path in out)) out[path] = empty ? 'empty' : 'present';
    if (isObj && depth < 2) fieldTable(v, path, depth + 1, out);
  }
  return out;
}

/* CVE 2.0 / 5.x field names, so a prose token can be told from a payload key. A new field name is
 * a one-line addition here and is reported (not silently skipped) until it lands. */
const FIELD_VOCAB = new Set([
  'metrics', 'weaknesses', 'configurations', 'descriptions', 'references', 'affected', 'cvetags',
  'vulnstatus', 'sourceidentifier', 'published', 'lastmodified', 'id', 'problemtypes', 'credits',
  'timeline', 'solutions', 'workarounds', 'exploits', 'rejectedreasons', 'providermetadata',
  'cvssmetricv40', 'cvssmetricv31', 'cvssmetricv30', 'cvssmetricv2', 'baseseverity', 'basescore',
  'vectorstring', 'temporalscore', 'defaultstatus', 'versions', 'packagename',
  'product', 'cvedata', 'containers', 'cna', 'adp', 'cvssdata', 'exploitscore',
]);

function fieldClaims(plain) {
  const TOKEN = '[A-Za-z_][A-Za-z0-9_.-]{1,40}';
  const out = [];
  /* `explicit` marks a claim that NAMES a payload field — either it carries the noun (key / field /
     object / …) or its token is identifier-shaped. Only those report an unknown token; "it is
     missing" and "password is empty" are English, and the live calibration returned exactly those
     two as noise against 51 items. */
  const push = (m, kind, nameIdx, explicit = true) => {
    const before = plain.slice(Math.max(0, m.index - 40), m.index);
    if (/["“'‘]\s*$/.test(before)) return;                                        // quoted speech
    if (/\b(?:report|read|say|claim|pars|interpret|treat|render|check|test|see)\w*\b[^.]{0,24}$/i.test(before)) return; // a READER's reading
    out.push({ kind, at: m.index, phrase: m[0], name: m[nameIdx], explicit });
  };
  for (const m of plain.matchAll(new RegExp(`\\b(?:carr(?:y|ies|ying)|has|have|having|includes?|contains?|holds?)\\s+(?:no|not\\s+(?:a|an|any))\\s+(${TOKEN})\\s+(?:key|field|object|array|property|entry)\\b`, 'gi'))) push(m, 'absent', 1);
  for (const m of plain.matchAll(new RegExp(`\\b(?:no|without\\s+(?:a|an|any))\\s+(${TOKEN})\\s+(?:key|field|object|array|property|entry)\\b`, 'gi'))) push(m, 'absent', 1);
  for (const m of plain.matchAll(new RegExp(`\\b(${TOKEN})\\s+(?:key\\s+)?is\\s+(?:missing|absent)\\b`, 'gi'))) push(m, 'absent', 1, false);
  for (const m of plain.matchAll(new RegExp(`\\b(?:does|do|did)\\s+not\\s+(?:state|carry|include|have|contain)\\s+(?:a\\s+|an\\s+|any\\s+)?(${TOKEN})\\b`, 'gi'))) push(m, 'absent-soft', 1, false);
  /* An IDENTIFIER-shaped token needs no "key" after it: `cvssMetricV40`, `default_status` are
     unmistakably payload keys, while "no fixed version" is prose — so the arm is gated on the
     token's shape rather than on a noun, which is what makes "carries no cvssMetricV40" visible
     without turning every English sentence into a field claim. */
  const IDENT = '([A-Za-z][A-Za-z0-9]*_[A-Za-z0-9_]+|[a-z][a-z0-9]*[A-Z][A-Za-z0-9]*)';
  for (const m of plain.matchAll(new RegExp(`\\b(?:carr(?:y|ies|ying)|has|have|includes?|contains?|holds?)\\s+(?:no|not\\s+(?:a|an|any))\\s+${IDENT}\\b`, 'g'))) push(m, 'absent', 1);
  for (const m of plain.matchAll(new RegExp(`\\bno\\s+${IDENT}\\b`, 'g'))) push(m, 'absent', 1);
  /* `carried` is the tense a TIME-SCOPED claim is written in ("the other nine carried an empty
     `metrics` object at 11:17Z"), and the first version omitted it — so the corrected filing case
     produced NO claim at all, and a check that goes silent on the better sentence is worse than one
     that over-fires. Pinned by the three-way calibration below. */
  for (const m of plain.matchAll(new RegExp(`\\b(?:carr(?:y|ies|ying|ied)|has|had|having|holds?|held|with)\\s+(?:an?\\s+)?empty\\s+(${TOKEN})\\s+(?:object|array|field|list|map)\\b`, 'gi'))) push(m, 'empty', 1);
  for (const m of plain.matchAll(new RegExp(`\\b(${TOKEN})\\s+is\\s+empty\\b`, 'gi'))) push(m, 'empty', 1, false);
  return out.sort((a, b) => a.at - b.at);
}

/** Where a named field sits in a presence table. Exact or dotted-leaf match, shallowest wins. */
function probeField(table, name) {
  const want = String(name).toLowerCase();
  const hits = Object.keys(table ?? {}).filter((p) => p.toLowerCase() === want || p.toLowerCase().endsWith(`.${want}`));
  if (!hits.length) return { state: 'missing', where: name };
  hits.sort((a, b) => a.split('.').length - b.split('.').length);
  return { state: hits.some((h) => table[h] === 'present') ? 'present' : 'empty', where: hits[0], hits };
}

function checkField(it, subjects, cna = new Map()) {
  const out = [];
  const t = strip(it.text);
  const claims = fieldClaims(t);
  if (!claims.length) return out;
  const mentions = idMentions(t);
  const ctx = { sents: sentences(t), primary: primarySubject(t, mentions) };
  const itemCves = [...new Set(it.cves ?? [])];
  const tables = new Map();                 // `${kind}:${id}` → { table, rec }
  const tableFor = (id, viaCna) => {
    const key = `${viaCna ? 'cna' : 'nvd'}:${id}`;
    if (tables.has(key)) return tables.get(key);
    let v = null;
    if (viaCna) {
      const rec = cna.get(id);
      v = rec && !rec.error && rec.fields ? { table: rec.fields, rec } : null;
    } else {
      const rec = subjects.get(id);
      v = rec && !rec.error && rec.raw ? { table: fieldTable(rec.raw), rec } : null;
    }
    tables.set(key, v);
    return v;
  };
  const seen = new Set();

  for (const cl of claims) {
    const name = cl.name;
    // A prose token that is not a payload key is not this check's claim (only the key/field spellings
    // are reported, and only as advisory, so a new field name is visible rather than invisible).
    if (!FIELD_VOCAB.has(String(name).toLowerCase())) {
      if (cl.explicit) {
        const k = `unknown:${name}`;
        if (!seen.has(k)) { seen.add(k); out.push({ check: 'field', item: it.n, verdict: 'field-unknown-name', claim: `“${cl.phrase}”`, detail: `“${name}” is not a CVE record field this check knows — the claim is about something else, or FIELD_VOCAB needs the name` }); }
      }
      continue;
    }
    const near = t.slice(Math.max(0, cl.at - 90), cl.at + 90);
    /* Which artifact the claim is about. `CNA`/`ADP`/`cveawg` name the container outright; a bare
       "container" does NOT route there, because this feed covers Docker and a sentence about a
       container image would otherwise be scored against a CVE container — routing it to NVD instead
       costs nothing in the normal case (NVD mirrors the container's `metrics` byte for byte). */
    const viaCna = /\b(?:CNA|ADP|cveawg)\b/i.test(near);
    const sent = ctx.sents.find((x) => cl.at >= x.start && cl.at < x.end);
    const inSentence = sent ? mentions.filter((m) => m.at >= sent.start && m.at < sent.end) : [];
    /* Binding: a sentence that names a CVE is about that record; a sentence that names none is a
       SET claim over the item's own records ("the other nine"), never the nearest id — the filing
       sentence would otherwise be scored against the one record that contradicts it. */
    const ids = inSentence.length ? [...new Set(inSentence.map((m) => m.id))]
      : (itemCves.length ? itemCves : [ctx.primary?.id].filter(Boolean));
    if (!ids.length) continue;
    const sentence = sent ? t.slice(sent.start, sent.end) : near;
    /* A sentence can date its own reading with an INSTANT as well as a phrase — "carried an empty
       `metrics` object at 11:17Z" is the time-scoped form of the filing correction, and it is a
       disclosure in the same sense "as of" is. */
    const dated = /\b(?:at\s+(?:publication|the\s+time)|as\s+of|when\s+(?:it\s+was\s+)?(?:published|checked)|on\s+publication|at\s+publication\s+time)\b|\b\d{1,2}:\d{2}(?::\d{2})?(?:Z|\s*UTC)\b/i.test(sentence);
    const key = `${ids.join(',')}:${cl.kind}:${String(name).toLowerCase()}:${sent?.start ?? cl.at}`;
    if (seen.has(key)) continue;
    seen.add(key);

    const reads = ids.map((id) => ({ id, got: tableFor(id, viaCna) }));
    const readable = reads.filter((r) => r.got);
    if (!readable.length) {
      out.push({ check: 'field', item: it.n, verdict: 'field-unreadable', claim: `${ids.join(', ')} “${cl.phrase}”`, detail: `no ${viaCna ? 'CNA container' : 'NVD record'} could be read — an unread field is not an absent one` });
      continue;
    }
    const states = readable.map((r) => ({ id: r.id, ...probeField(r.got.table, name), rec: r.got.rec }));
    const count = (s) => states.filter((x) => x.state === s);
    const who = (s) => count(s).slice(0, 3).map((x) => `${x.id} (${x.where})`).join(', ');

    if (cl.kind === 'empty') {
      const withValues = count('present');
      if (!withValues.length) {
        if (count('missing').length) {
          out.push({ check: 'field', item: it.n, verdict: 'field-absent-not-empty', claim: `${ids.join(', ')} “${cl.phrase}”`, detail: `${count('missing').length} of ${states.length} record(s) have no “${name}” key at all — absent, not empty; the two read differently to a parser` });
        } else {
          out.push({ check: 'field', item: it.n, verdict: 'ok', claim: `${ids.join(', ')} empty “${name}”`, detail: `empty in ${states.length} record(s) — ${who('empty')}` });
        }
        continue;
      }
      if (dated) {
        out.push({ check: 'field', item: it.n, verdict: 'field-dated', claim: `${ids.join(', ')} “${cl.phrase}”`, detail: `${withValues.length} of ${states.length} carry values now — the sentence dates its reading, so the drift is the trend, not an error (${who('present')})` });
        continue;
      }
      /* The perishability arm: if the record moved after it was published, the field was empty when
         the item was written and the registry filled it — naming the author is the wrong defendant. */
      const moved = withValues.filter((x) => {
        const pub = Date.parse(x.rec?.published ?? 0), mod = Date.parse(x.rec?.modified ?? 0);
        return Number.isFinite(pub) && Number.isFinite(mod) && mod > pub;
      });
      out.push({
        check: 'field', item: it.n,
        verdict: moved.length ? 'field-empty-since-moved' : 'field-empty-contradicted',
        claim: `${ids.join(', ')} “${cl.phrase}”`,
        detail: `${withValues.length} of ${states.length} carry values — ${who('present')}${moved.length ? `; ${moved.length} moved after publication (published ${moved[0].rec.published}, lastModified ${moved[0].rec.modified}), so the field was empty when written and the registry filled it later` : '; published == lastModified, so it was never empty'}`,
      });
      continue;
    }

    // absence claim
    const present = count('present');
    const empty = count('empty');
    if (present.length || empty.length) {
      out.push({
        check: 'field', item: it.n,
        verdict: !present.length ? 'field-present-empty' : 'field-present',
        claim: `${ids.join(', ')} “${cl.phrase}”`,
        detail: [
          present.length ? `${present.length} of ${states.length} carry a value for “${name}” — ${who('present')}` : '',
          empty.length ? `${empty.length} of ${states.length} carry the key with an EMPTY value — ${who('empty')}; the key exists, so “no key” is the wrong sentence` : '',
          !present.length && empty.length ? 'the repair is one word: empty, not absent' : '',
        ].filter(Boolean).join(' · '),
      });
      continue;
    }
    out.push({ check: 'field', item: it.n, verdict: 'ok', claim: `${ids.join(', ')} no “${name}”`, detail: `absent from the ${viaCna ? 'CNA container' : 'NVD record'} JSON in ${states.length} record(s) — the absence is a payload fact, not a coverage gap` });
  }
  return out;
}

// ── check H: the affected span's own arithmetic ─────────────────────────────────────────────
/* Filed 2026-11-01 20:49 from the `--remedy-census` calibration: **87 of 3,461** records in one
 * publication week state a span that contains nothing — 86 write a POINT as a range
 * (`{version: X, lessThan: X}`, 73 of them Chrome's house style) and 1 inverts its bounds (Apache
 * MINA's `3.0.0` … `3.0.0-M2`, where the milestone sorts BEFORE the release). The feed quotes
 * affected spans constantly and nothing read the span: `count` greps numbers beside nouns, `cvss`
 * recomputes a vector, `cwe` reads two fields — none asks whether `min <= max`.
 *
 * The trap this check is built around is that **the inverted span is usually quoted faithfully**.
 * The 11-01 MINA item says "Affected is `3.0.0` through `3.0.0-M2`", which is exactly what the
 * record states and is still a statement whose subject set is empty. So the finding is not "you
 * misquoted the record"; it is "the span you quoted contains nothing, say so".
 *
 * Both directions of the same question are needed, because they fail differently:
 *   (a) the RECORD's span is empty and the item quotes it → `span-empty` (sev 2, the item should
 *       carry the arithmetic, since a scanner reading the range sees an empty set);
 *   (b) the ITEM's own two endpoints invert → `span-inverted` (sev 3, the item wrote it wrong).
 * Two verdicts rather than one, because the remedies differ: (a) is a sentence to add, (b) is a
 * number to fix.
 * Everything else is silence, never a pass: an item that quotes no span, or a record with no
 * readable range, is unmeasured rather than verified.
 *
 * Guards, each one a false positive the design would otherwise produce:
 *   - a `*` / `0` / missing bound is a NULL bound, never a version (CVE 5.x's null minimum), so the
 *     span is unbounded and cannot be empty;
 *   - a git range is not a version range — 211 of the first remedy-census pass's "empty spans" were
 *     `<sha>`…`<sha>` ordered by a comparator with no meaning for a hash → `span-unverifiable`;
 *   - "A through B" is INCLUSIVE on both ends, so A == B is one version and not an empty span; only
 *     a record's `lessThan` (exclusive) makes an equal pair empty;
 *   - the item's span must be ANCHORED to the record (an endpoint must equal one of its bounds), or
 *     a measurement pair — "from 41.39% to 56.97", "0.96 to 0.86" — reads as a version range.
 */
function parseVer(v) {
  const s = String(v).replace(/^\s*[vV]/, '').trim();
  const m = s.match(/^(\d+(?:\.\d+)*)(.*)$/);
  if (!m) return { nums: [], pre: s };
  return { nums: m[1].split('.').map(Number), pre: (m[2] || '').replace(/^[-._]/, '') };
}
/** Semver-ish: numeric segments first, then a release sorts AFTER its prereleases, which is the
    only ordering this check asks about (`3.0.0-M2` sorts before `3.0.0`). */
function cmpVer(a, b) {
  const A = parseVer(a), B = parseVer(b);
  for (let i = 0; i < Math.max(A.nums.length, B.nums.length); i++) {
    const x = A.nums[i] ?? 0, y = B.nums[i] ?? 0;
    if (x !== y) return x < y ? -1 : 1;
  }
  if (A.pre === B.pre) return 0;
  if (!A.pre) return 1;
  if (!B.pre) return -1;
  return A.pre < B.pre ? -1 : 1;
}
const NULL_BOUND = (v) => v == null || /^(?:\*|0|)$/.test(String(v).trim());
/** `<sha>` is not a version: 7–40 hex chars WITH at least one letter (a bare `20260101` is a date). */
const SHA_LIKE = (v) => /^[0-9a-f]{7,40}$/i.test(String(v ?? '').trim()) && /[a-f]/i.test(String(v ?? ''));
const sameVer = (a, b) => a != null && b != null && !NULL_BOUND(a) && !NULL_BOUND(b) && cmpVer(a, b) === 0;
/** `empty` | `ok` | `unbounded` | `unorderable` — the four states a stated span can be in. */
function spanState(r) {
  if (r.versionType === 'git' || SHA_LIKE(r.min) || SHA_LIKE(r.max)) return 'unorderable';
  const min = NULL_BOUND(r.min) ? null : r.min;
  const max = NULL_BOUND(r.max) ? null : r.max;
  if (!min || !max) return 'unbounded';
  const c = cmpVer(min, max);
  if (c > 0) return 'empty';
  if (c === 0 && r.maxInc === false) return 'empty';
  return 'ok';
}
function describeRange(r) {
  const lo = [r.min == null ? '·' : r.min, r.minInc === false ? '(exclusive)' : '(inclusive)'].join(' ');
  const hi = [r.max == null ? '·' : r.max, r.maxInc ? '(inclusive)' : '(exclusive)'].join(' ');
  return `${lo} … ${hi}${r.product ? ` · ${r.product}` : ''}${r.changes?.length ? ` · changes[] ${r.changes.map((c) => `${c.status}@${c.at}`).join(',')}` : ''}`;
}
/** Every range a record states, CNA `affected[]` first (what the CNA said) and NVD's analysis second. */
function rangesOf(id, subjects, cna) {
  const out = [];
  for (const r of cna.get(id)?.ranges ?? []) out.push(r);
  for (const r of subjects.get(id)?.cpe ?? []) out.push(r);
  return out;
}
/** The two-endpoint version span as this corpus writes it. The joiner is the discriminator: `through`
    is a range in this feed's own voice, while `to` and a spaced dash also carry measurements — so
    those two need the record anchor before they are read as a span (see `checkRange`). */
const VER_TOKEN = String.raw`[vV]?\d+(?:\.\d+)+(?:[-.][0-9A-Za-z][0-9A-Za-z.\-]*)?(?![%\d])`;
const SPAN_RE = new RegExp(String.raw`(${VER_TOKEN})\s*(through|to|–|—|\s-\s)\s*(${VER_TOKEN})`, 'gi');
/* The token's own char class includes `.` so that `1.2.3-build.4` survives, which means a
   sentence-final period is captured with it (`3.0.0-M2.`). Comparing that against the record's
   `3.0.0-M2` fails on the punctuation alone — a finding about the reader, not the span. */
const cleanVer = (v) => String(v).replace(/[.,;:]+$/, '');

function checkRange(it, subjects, cna = new Map()) {
  const out = [];
  const t = it.plain;
  const ids = idMentions(t);
  if (!ids.length) return out;
  const sents = sentences(t);
  const ctx = { sents, primary: primarySubject(t, ids) };
  const done = new Set();
  for (const m of t.matchAll(SPAN_RE)) {
    const [, a0, joiner, b0] = m;
    const a = cleanVer(a0), b = cleanVer(b0);
    const at = m.index;
    const s = sents.find((x) => at >= x.start && at < x.end);
    if (!s || done.has(s.start)) continue;
    const bound = bindSubject(at, ids, ctx);
    if (!bound) continue;
    const ranges = rangesOf(bound.id, subjects, cna);
    if (!ranges.length) continue;
    /* Is the item quoting a span the record states? Matched in EITHER order, because a writer can
       read a record's bounds backwards — and the pair test is also the discriminator that keeps a
       MEASUREMENT out: `41.39% → 56.97` and `0.96 → 0.86` are spans in the prose and ranges in
       nothing, and one endpoint happening to equal a bound is a coincidence, not an anchor. */
    const pairMatches = (r) => (sameVer(r.min, a) && sameVer(r.max, b)) || (sameVer(r.min, b) && sameVer(r.max, a));
    const rec = ranges.find(pairMatches) ?? null;
    const touches = (r) => [a, b].some((x) => sameVer(r.min, x) || sameVer(r.max, x));
    // `through` / a dash is the feed's own range voice, so one matching bound anchors it; `to` is
    // also how measurements are written, so it needs both endpoints to be the record's own bounds.
    const strong = /through/i.test(joiner) || /[\u2013\u2014]/.test(joiner);
    const anchored = strong ? ranges.some(touches) : rec != null;
    const span = `${a} ${/through/i.test(joiner) ? 'through' : '–'} ${b}`;
    const recState = rec ? spanState(rec) : null;
    /* The RECORD's emptiness is judged first and separately from the item's own arithmetic. The
       11-01 MINA item writes "3.0.0 through 3.0.0-M2" in the record's own order — a faithful
       quotation of an empty span — and calling that "the item wrote it backwards" would be a
       finding about the writer instead of about the range. A span the record states and the item
       reverses is the other case, and only it gets the item-voice detail. */
    if (rec && recState === 'empty') {
      done.add(s.start);
      out.push({
        check: 'range', item: it.n, verdict: 'span-empty', claim: `${bound.id} ${span}`,
        detail: `the record's own ${rec.source} span is ${describeRange(rec)} — ${rec.min} and ${rec.max} close a set with nothing in it under its own comparator, so the quoted range is vacuous; say so rather than restating it as a range`,
      });
      continue;
    }
    if (cmpVer(a, b) > 0) {
      if (!anchored) continue;
      done.add(s.start);
      out.push({
        check: 'range', item: it.n, verdict: 'span-inverted', claim: `${bound.id} ${span}`,
        detail: `the item's own span runs from ${a} to ${b}, and ${b} sorts BEFORE ${a} — the record's bounds are ${ranges.map(describeRange).join('; ')}`,
      });
      continue;
    }
    /* No version span matches, but every range the record states is a GIT range: the item is
       quoting a version span from somewhere else (a distro advisory, a fixed-in line) for a record
       whose own bounds are revisions. That is the state 211 of the first remedy-census pass
       mistook for an empty span, and the honest verdict is that nothing here is orderable —
       sev 0, because the item's span may be perfectly true of the packaged artifact. */
    if (!rec) {
      const stated = ranges.filter((r) => r.min || r.max);
      const inSent = ids.some((x) => x.at >= s.start && x.at < s.end);
      if (inSent && strong && stated.length && stated.every((r) => spanState(r) === 'unorderable')) {
        done.add(s.start);
        out.push({
          check: 'range', item: it.n, verdict: 'span-unverifiable', claim: `${bound.id} ${span}`,
          detail: `the record states only a git range (${stated.map(describeRange).join('; ')}), so the version span in the item is not the record's own bounds and neither endpoint can be ordered against them`,
        });
      }
      continue; // nothing else to compare: silence, never a pass
    }
    done.add(s.start);
    if (recState === 'unorderable') {
      out.push({
        check: 'range', item: it.n, verdict: 'span-unverifiable', claim: `${bound.id} ${span}`,
        detail: `the record's bound is a git revision, not a version (${describeRange(rec)}) — the comparator cannot order two hashes, so nothing is verified here`,
      });
    } else {
      out.push({ check: 'range', item: it.n, verdict: 'ok-span', claim: `${bound.id} ${span}`, detail: `${describeRange(rec)} — non-empty` });
    }
  }
  return out;
}

// ── check: a stated ABSENCE of a version range ────────────────────────────────────────────────
/* "The record names no fixed version" is a claim about a relationship between two artifacts, and
   every check above reads one. The rule has been in CLAUDE.md since **2026-10-25** (open62541: a
   "structurally range-less `Received` record" whose range had been in the CNA's `affected[]` from
   publication day), and it recurred on **2026-11-05** in a published item — ansible-core's record
   said "No fixed version appears in the record" while its CNA container carried
   `2.19.0 < 2.23.0`. A rule in prose did not fire at generation time, so it becomes a command. */
const AFFECTED_ABSENT = [
  /\bno\s+(?:fixed|patched|affected|vulnerable|repaired)\s+(?:version|release)s?\b/i,
  /\bno\s+(?:affected|version)\s+(?:range|bound|boundary)\b/i,
  /\b(?:states?|names?|carries?|lists?)\s+no\s+(?:affected|version|release|range|bound)\b/i,
  /\bcarries?\s+no\s+`?affected`?/i,
  /\bno\s+`?affected`?\s*(?:\[\])?\s+(?:entry|entries|field|array)\b/i,
  /\b(?:the\s+)?record\s+(?:states?|names?|carries?|gives?)\s+no\s+(?:version|range|bound|affected)\b/i,
];
/* A sentence about INSTALLABILITY is a different claim from a sentence about the record. The
   calibration sentence is the corrected one — "the boundary is named and there is still nothing to
   install" — which is TRUE when the record's own bound names a release that does not exist yet
   (`boundary-named-no-artifact` is the whole future-fix class, not a defect). Folding the two cue
   sets together would have turned the correction into a finding, which is the failure mode a
   checker must never have. */
const INSTALL_ABSENT = [
  /\bnothing\s+to\s+install\b/i,
  /\bno\s+(?:fixed\s+)?version\s+to\s+install\b/i,
  /\bnothing\s+to\s+upgrade\s+to\b/i,
];
const FIX_REF_RE = /\/(?:commit|pull|pull-request)\/|\/-\/commit\/|\b[0-9a-f]{7,40}\b.*\bfix/i;

/** Pure: what a stated absence means, given the two artifacts. Split out so `--selftest` pins
 *  every arm — including the corrected sentence — without a network call. */
function rangeAbsentVerdict({ cue, namesNvd, nvd, cna }) {
  const nvdRead = !!nvd && !nvd.error;
  const cnaRead = !!cna && !cna.error;
  if (!nvdRead && !cnaRead) return { verdict: 'range-unread', detail: 'neither the NVD record nor the CNA container could be read, so the absence is untested — unread is not absent' };
  const cfg = nvdRead ? (nvd.configs ?? 0) : null;
  const aff = cnaRead ? (cna.affected ?? { key: 'absent', entries: 0, versioned: 0, products: [] }) : null;
  const refs = [...(nvdRead ? (nvd.refs ?? []) : []), ...(cnaRead ? (cna.refs ?? []) : [])];
  const fixRef = refs.find((u) => FIX_REF_RE.test(u));
  const cnaServed = aff && aff.entries > 0;
  const nvdServed = cfg != null && cfg > 0;
  const shape = aff == null ? 'the CNA container is unreadable'
    : aff.key === 'absent' ? 'the container has no `affected` key'
    : aff.key === 'empty' ? '`affected: []` — present and empty, which is not the same as missing'
    : aff.versioned < aff.entries ? `${aff.entries} \`affected[]\` entr${aff.entries === 1 ? 'y' : 'ies'} of which ${aff.versioned} state a \`versions[]\``
    : `${aff.entries} \`affected[]\` entr${aff.entries === 1 ? 'y' : 'ies'} with a \`versions[]\``;
  const nvdState = nvdRead ? `NVD \`configurations\` ${cfg > 0 ? `carries ${cfg} CPE range(s)` : `is absent (record is \`${nvd.status ?? 'unknown'}\`, and absent \`configurations\` means "not yet analysed", never "states nothing")`}` : 'the NVD record is unreadable';

  if (cue === 'install') {
    if (cnaServed || nvdServed) {
      return { verdict: 'boundary-named-no-artifact', detail: `${nvdState}; ${shape} — so the record DOES name a bound, and "nothing to install" is a statement about the registry, not the record${fixRef ? `; a fix pointer is also present: ${fixRef}` : ''}` };
    }
    return { verdict: 'range-absent-confirmed', detail: `${nvdState}; ${shape} — nothing to install and nothing named, which agree` };
  }
  if (nvdServed || cnaServed) {
    /* "NVD states no affected range" can be TRUE of NVD and false of the record, and the two are
       different sentences. Only a claim that names the container gets the soft verdict. */
    if (namesNvd && !nvdServed && cnaServed) {
      return { verdict: 'range-only-in-cna', detail: `${nvdState}; ${shape} — the sentence is true of NVD and false of the record, because the CNA's own \`affected[]\` is where the range lives (this is the open62541 shape, 2026-10-25)` };
    }
    return { verdict: 'range-absent-but-served', detail: `${nvdState}; ${shape}${aff?.products?.length ? ` (${aff.products.slice(0, 3).join(', ')})` : ''} — the record states a range, so the absence is about the field the sentence read, not about the record` };
  }
  if (fixRef) {
    /* The third place a record names a fix is `references[]`, and a commit is a fix pointer with no
       version in it — so the sentence can be right about the range field and wrong about "no fix". */
    return { verdict: 'range-in-references', detail: `${nvdState}; ${shape} — but \`references[]\` points at a fix: ${fixRef}` };
  }
  return { verdict: 'range-absent-confirmed', detail: `${nvdState}; ${shape} — the absence holds in both fields` };
}

function affectedAbsentSpans(plain) {
  const out = [];
  for (const [cue, list] of [['record', AFFECTED_ABSENT], ['install', INSTALL_ABSENT]]) {
    for (const re of list) {
      for (const m of plain.matchAll(new RegExp(re.source, 'gi'))) {
        const before = plain.slice(Math.max(0, m.index - 40), m.index);
        /* "the 6.x line has no version **to install**" is the install claim wearing a record
           verb's clothes — the ESP-IDF calibration (11-05) read it as a claim about the record and
           produced a sev-3 finding against a correct item. The tail decides which cue owns it. */
        if (cue === 'record' && /^\s+to\s+(?:install|upgrade)/i.test(plain.slice(m.index + m[0].length, m.index + m[0].length + 24))) continue;
        if (/["“'‘]\s*$/.test(before)) continue;                                  // quoted speech
        if (/\b(?:report|read|say|see|claim|describ|interpret|parse|treat|render|calls?|writes?)\w*\b[^.]{0,24}$/i.test(before)) continue; // attributed
        out.push({ cue, at: m.index, phrase: m[0] });
      }
    }
  }
  return out.sort((a, b) => a.at - b.at);
}

function checkRangeAbsent(it, subjects, cna = new Map()) {
  const out = [];
  const t = strip(it.text);
  const claims = affectedAbsentSpans(t);
  if (!claims.length) return out;
  const ids = idMentions(t);
  if (!ids.length) return out;             // no subject → nothing to open (a general statement)
  const ctx = { sents: sentences(t), primary: primarySubject(t, ids) };
  const seen = new Set();
  for (const cl of claims) {
    const bound = bindSubject(cl.at, ids, ctx);
    if (!bound || bound.kind !== 'cve') continue; // a GHSA has its own advisory fields, not these two
    const key = `${bound.id}:${cl.cue}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const rec = subjects.get(bound.id) ?? null;
    const raw = rec?.raw;
    const nvd = !rec || rec.error ? { error: true }
      : { configs: (raw?.configurations ?? []).reduce((n, c) => n + (c.nodes ?? []).reduce((k, nd) => k + (nd.cpeMatch ?? []).filter((m) => m.vulnerable !== false).length, 0), 0), refs: (raw?.references ?? []).map((r) => r.url).filter(Boolean), status: rec.status };
    const cn = cna?.get(bound.id) ?? null;
    const s = ctx.sents.find((x) => cl.at >= x.start && cl.at < x.end);
    const sentText = s ? t.slice(s.start, s.end) : '';
    const namesNvd = /\bNVD\b/.test(sentText);
    /* A claim of absence is about an ARTIFACT, and an item can be talking about the ADVISORY while
       the CVE record it bound to says otherwise — measured on the 10-31 feed's item 38: "the
       advisory names no version boundary at all" is true of `GHSA-q3g8-3cf7-744f`'s `affected` /
       `patched` cells (both read `latest`), false of nothing, and the same item states "Fixed in
       0.1.77" two sentences earlier. So the RECORD cue needs a record-ish subject in its own
       sentence; a sentence about a GHSA, a cell or a bulletin is a different artifact's claim. */
    /* `affected` is deliberately NOT in this list: "the affected and patched CELLS both read
       `latest`" is an advisory's table, and the first build read the word as the record's field. */
    if (cl.cue === 'record' && /\b(?:advisory|GHSA|bulletin|cell)\b/i.test(sentText) && !/\b(?:record|container|NVD|field|array|entr(?:y|ies))\b/i.test(sentText)) continue;
    /* the identifier itself is not a record noun — "…at all for CVE-2026-123036" is still a
       sentence about the advisory's cells, and the first build let the id through as the subject. */
    if (cl.cue === 'record' && !/\b(?:record|container|affected|NVD|field|array|entr(?:y|ies)|CVE-\d{4})\b/i.test(sentText)) continue;
    const v = rangeAbsentVerdict({ cue: cl.cue, namesNvd, nvd, cna: cn ?? { error: true } });
    out.push({ check: 'rangeabsent', item: it.n, verdict: v.verdict, claim: `${bound.id} — "${cl.phrase}"`, detail: v.detail });
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
// Bump when the stored shape grows: a cached entry missing a field the check reads would turn
// "not fetched by this version" into "absent from the record".
/* v: 2 added `problemTypes` (the cwe check). v: 3 adds `descriptions[]` (the quotation check).
   v: 4 adds `affected[]` as normalised `ranges` (the range check); v: 5 adds `datePublished`, because
   the registry's clock and NVD's are hours apart and the `date` check was reading only one of them.
   v: 6 adds `fields`, the key-presence table the `field` check walks — without it a container that
   carries `"metrics": {}` would answer "absent", which is the claim being tested.
   v: 7 adds `affected` (the SHAPE summary) and `refs` — without them a v-6 entry answers "the CNA
   states no affected[]" for every record, which is the whole claim the `rangeabsent` check tests.
   Each bump is the rule, not
   a tidiness choice: an entry written before a field was read would turn "not fetched by this
   version" into "absent from the record", which is the exact defect the schema version exists to
   prevent. A bump forces one refetch per CVE and is unmetered. */
const CNA_CACHE_V = 7;
/* The repo cache had no version until 2026-11-05, and the day it needed one it produced exactly the
 * defect the versions above exist to prevent: v-0 entries stored a failure as a bare `error` string,
 * so `tencent/Hy4`'s 404 came back as "unreadable" from a six-hour-old entry even after `repoState`
 * learned to keep the HTTP status. An entry of another shape is a MISS, not a state — the refetch is
 * one metered call per slug and the answer is the record's own. */
const REPO_CACHE_V = 2;

function repoState(slug) {
  const hit = cache[slug];
  /* A 404 is a stable answer and may sit for the full TTL; a transient failure may not — the page
     cache's rule ("a wall is cached for 10 minutes, not 6 hours") one object over. */
  if (hit && hit.v === REPO_CACHE_V) {
    const ttl = hit.error && hit.status !== '404' ? ERROR_TTL_MS : CACHE_TTL_MS;
    if (Date.now() - Date.parse(hit.fetched_at) < ttl) return hit;
  }
  let j;
  try {
    const raw = execFileSync('gh', ['api', `repos/${slug}`], { encoding: 'utf8', timeout: 30_000, stdio: ['ignore', 'pipe', 'pipe'] });
    j = JSON.parse(raw);
    apiCalls += 1;
  } catch (e) {
    /* A 404 IS A STATE, NOT AN UNREADABLE REQUEST — and the two need different sentences. `gh`
     * writes the status to stderr, which this call used to discard, so every failure arrived as
     * "Command failed: gh api repos/<slug>" and item 5 of the 11-05 feed ("There is no `tencent/Hy4`")
     * came back `unreadable` at sev 1 against a sentence the 404 CONFIRMS. The status is now kept,
     * so a caller can tell "the registry says this name does not exist" from "I could not ask". */
    const msg = `${e.stderr ?? ''}${e.message ?? ''}`;
    const status = /HTTP (\d{3})/.exec(msg)?.[1] ?? (/Not Found|404/.test(msg) ? '404' : null);
    cache[slug] = { fetched_at: new Date().toISOString(), v: REPO_CACHE_V, status, error: String(e.message ?? e).split('\n')[0] };
    return cache[slug];
  }
  cache[slug] = {
    fetched_at: new Date().toISOString(), v: REPO_CACHE_V,
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

/* A **disclosed** staleness is not a **drifted** one (added 2026-11-03 12:37). The repo check asks
 * "is the item about the code or the name?", and that batch's item 2 had already answered: the lint
 * returned `stale` (sev 2) for `mpdavis/python-jose` at 203 days, while the item says "its last push
 * was 2026-04-14", "PyPI's newest release is still 3.5.0 from 2025-05-28" and tags itself
 * `unmaintained`. There the staleness **is** the story — the record describes a vulnerability whose
 * fixed version does not exist — so the finding was about the checker, the same species as
 * `star-dated` and `temporal-disclosed`. Downgrade rather than suppress: the suppression prints.
 * Two arms, and each must be about a *clock or a state*, never a lucky word:
 *   (a) the API's own last-push day, inside a sentence that also names a push/commit/release (so a
 *       coincidental CVE date elsewhere in the item cannot launder it);
 *   (b) a state word the author chose — `unmaintained`, `dormant`, `no commits since`, …
 * `archived` rides the same guard: an item that reports an archived repo (Flowise's "archived
 * read-only Aug 13") is making the point the check exists to make, not missing it. */
const STALE_STATE = /\b(?:unmaintained|dormant|abandoned|archived|stalled|gone quiet|dead project|no longer (?:maintained|updated|developed)|no (?:commits?|releases?|updates?|activity) since)\b/i;
const STALE_CLOCK_NOUN = /\b(?:last (?:push|commit|release|update)|newest release|latest release|repository (?:was )?last)\b/i;
function staleDisclosure(plain, pushedISO) {
  const day = String(pushedISO || '').slice(0, 10);
  if (/^\d{4}-\d\d-\d\d$/.test(day)) {
    for (const s of sentences(plain)) {
      const t = plain.slice(s.start, s.end);
      if (t.includes(day) && STALE_CLOCK_NOUN.test(t)) return `the item names this repo's own last-push day (${day})`;
    }
  }
  const m = STALE_STATE.exec(plain);
  if (m) return `the item states the state itself (“${m[0]}”)`;
  return null;
}

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
/* A dated item may already carry the second reading — item 15 of 10-30 reads "**1,239 stars as of
 * 04:25 UTC**, 1,477 by 12:30 UTC" and the checker, which only recognises a number followed by
 * `stars`/`★`, saw one quote and advised "quote the second reading too" about a sentence that had
 * it. Only the ADVICE changes: a higher number with its own clock (`by 12:30 UTC`, `now`, `later`)
 * ANYWHERE in the item means the drift is already disclosed, so the finding says so rather than
 * asking for work that is done — and it must scan the whole item, because item 15's quote sits on
 * the `Source:` line while its second reading sits in the body, two "sentences" apart under a
 * splitter that breaks only on punctuation. Deliberately narrow — an unrelated large number (a
 * memory total, say) carries no clock and must not read as a second star count. */
function laterReading(sent, biggest) {
  for (const m of sent.matchAll(/\b(\d[\d,]{2,})\b/g)) {
    const n = toNum(m[1]);
    if (!(n > biggest)) continue;
    const after = sent.slice(m.index + m[0].length, m.index + m[0].length + 30);
    if (/^\s*(?:by|as\s+of|at)\s+\d{1,2}:\d{2}\b/i.test(after) || /^\s*(?:now|later|since)\b/i.test(after)) return n;
  }
  return null;
}
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
  /* Cached like `readme()`: a census over a month of feeds asks the hub once per model id, not once
   * per item that names it, and the `ratio` check reads the same card the `count` check already
   * paid for. Unmetered is not free — a curl per item is most of a census run's wall clock. */
  const key = `hfcard:${slug}`;
  const hit = cache[key];
  if (hit && Date.now() - Date.parse(hit.fetched_at) < CACHE_TTL_MS) return hit.text ? { text: hit.text } : null;
  let text = null;
  try {
    const r = execFileSync('curl', ['-sS', '-m', '30', `https://huggingface.co/${slug}/raw/main/README.md`],
      { encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 });
    if (r && !/^Entry not found$/m.test(r)) text = r;
  } catch { /* unreadable is a state, not an absence */ }
  cache[key] = { fetched_at: new Date().toISOString(), bytes: text ? text.length : 0, text: text ?? '' };
  return text ? { text } : null;
}

/* **An under-count is a surge; an over-count is a drift** (2026-11-01 12:39 — this replaces the
 * age-scaling the 12:33 agenda proposed, because the age was the wrong axis). The lint runs minutes
 * after the batch is written, so the only movement it can watch is the repo moving *under* the
 * item — and at that timescale stars move one way: the number was true when it was written and the
 * repo grew. Two live cases from the 12:23 batch, both quoted correctly and both reported as sev-2
 * findings: `kerlenton/bootgpt` 6★ → 25★ on a **1.3-day-old** record and `vercel-labs/agent-desktop`
 * 3,979 → 4,547 (+12%) on a 254-day one. No percentage separates those from an error — an HN launch
 * doubles an old repo as readily as a new one — so the DIRECTION does the work: quoted < now is what
 * a rising repo looks like (advisory: the drift *is* the trend, and the advice is to date the
 * reading if the number will be re-used), while quoted > now is a number the repo does not support
 * right now (a star count does not fall on a batch timescale without a deletion or a typo) and keeps
 * sev 2. Record age only colours the advice: a young record is in its launch window, where growth is
 * expected rather than notable. Pure, so `--selftest` pins every arm without an api.github.com call. */
function starVerdict({ slug, quoted, now, recAgeDays = null, dated = false }) {
  if (quoted == null || !now) return null;
  const gap = quoted - now;
  if (Math.abs(gap) < STAR_MIN_DELTA) return null;
  const delta = gap / now;
  if (!(Math.abs(delta) > STAR_TOLERANCE)) return null;
  const pct = Math.abs(delta * 100).toFixed(0);
  if (delta > 0) {
    return {
      verdict: 'star-drift', direction: 'over', quoted, now,
      detail: `${slug}: ${quoted} quoted vs ${now} now (+${pct}%) — the repo does not carry the number the item states; reread it`,
    };
  }
  const spread = `${quoted} → ${now} (+${pct}%, ${now - quoted} stars)`;
  if (dated) {
    return {
      verdict: 'star-dated', direction: 'under', quoted, now,
      detail: `${slug}: ${spread} — the item dates this reading, so the drift is the trend`,
    };
  }
  const launch = recAgeDays != null && recAgeDays <= SURGE_LAUNCH_DAYS;
  return {
    verdict: 'star-surge', direction: 'under', quoted, now,
    detail: `${slug}: ${spread} since the batch was written${launch ? ` on a ${recAgeDays}-day-old record (launch window)` : ''} — a rising count is not a wrong one; date the reading if the number will be re-used`,
  };
}

/* 2026-11-05 12:34 — **a dashed CVE range is a claim about a SET, and the registry is one
 * namespace.** CLAUDE.md has carried that rule since the HPE ArubaOS item (10-25), and it had no
 * executor: the Kynerno cohort (11-05, item 23) shipped "21 records CVE-2026-122302 –
 * CVE-2026-122323", a span of **22** values in which **CVE-2026-122317 has no record at all**
 * (`cveId` queried on its own: `totalResults` **0**). Nothing about that needs the network — the
 * item's own count and its own range disagree, and the arithmetic is the whole check.
 *
 * Three guards, each a way this would otherwise fire on a correct item:
 *   (a) **A count must be a count of RECORDS.** "Seven score at or above 9.0" is a count of scores
 *       and says nothing about how many records the span holds, so the noun set is record-ish only
 *       and up to two words may sit between number and noun ("Twenty-one Kyverno records").
 *   (b) **Different years have no arithmetic** — `CVE-2025-66365` – `CVE-2026-122323` is a range of
 *       identifiers, not of integers, and the span size is a property of the pool, not of the dates.
 *   (c) **A disclosed gap is the correction, not the mistake.** An item that says a hole exists has
 *       done the work; the verdict is `cve-range-disclosed` at sev 0 and is PRINTED rather than
 *       dropped, because a suppression nobody can count becomes folklore. */
const ID_RANGE_RE = new RegExp(
  String.raw`\bCVE-(\d{4})-(\d{4,7})\s*(?:[–—]|-(?=\s)|\s+to\s+|\s+through\s+)\s*(?:CVE-(\d{4})-)?(\d{4,7})\b`,
  'gi',
);
const RECORD_NOUN_ALT = String.raw`(?:records?|cves?|advisories|advisory|ids?|entries)\b`;
/* Built at CALL time: `NUM_WORD_ALT` is declared further down the file, and a module-level regex
 * that reads it would be a TDZ error rather than a check.
 *
 * Two guards came from probing the filing case's own corrected sentence, and each had already
 * produced a wrong answer: `22 values and CVE` counted TWO intervening words when only a proper
 * noun should ever sit between a number and its noun, and `CVE-2026-122317 carries no record` read
 * the ID as a count — an identifier is not a number, the same defect `countNumsIn` has a guard for. */
const countBeforeNoun = () =>
  new RegExp(String.raw`(?<![\w-])(${NUM_WORD_ALT}|\d[\d,]*)(?:\s+[A-Z][\w'’-]*)?\s+${RECORD_NOUN_ALT}`, 'gi');
/* The disclosure vocabulary is the HOLE, not any mention of the word "span": a sentence that names
 * the missing identifier, or says the list is a set, has stated the thing this check asks for. */
const RANGE_DISCLOSED = /\bno record|has no record|absent|does not exist|doesn't exist|not in the (?:registry|span)|one hole|a hole|with one hole|set, not a range|set rather than a range|missing id\b/i;

function idRangeClaims(plain) {
  const counts = [];
  for (const m of plain.matchAll(countBeforeNoun())) {
    const n = numToken(m[1]);
    if (Number.isFinite(n)) counts.push({ n, at: m.index, sentence: sentenceAt(plain, m.index) });
  }
  const out = [];
  for (const m of plain.matchAll(ID_RANGE_RE)) {
    const y1 = m[1], y2 = m[3] ?? m[1];
    const a = Number(m[2]), b = Number(m[4]);
    const sameYear = y1 === y2;
    out.push({ from: m[0], y1, y2, a, b, sameYear, span: sameYear && b >= a ? b - a + 1 : null, at: m.index });
  }
  return { ranges: out, counts };
}

function checkIdRange(it) {
  const plain = it.plain ?? strip(it.text);
  const { ranges, counts } = idRangeClaims(plain);
  if (!ranges.length) return [];
  const out = [];
  for (const r of ranges) {
    if (!r.sameYear) {
      out.push({ check: 'idrange', item: it.n, verdict: 'range-cross-year', claim: r.from, detail: `spans two years — identifier arithmetic has no meaning across a pool boundary` });
      continue;
    }
    if (r.span == null) {
      out.push({ check: 'idrange', item: it.n, verdict: 'range-inverted', claim: r.from, detail: `ends below its start — the span is empty by construction` });
      continue;
    }
    // (a) counts near the range: same sentence first, then the item's only count
    const near = counts.filter((c) => c.sentence.includes(r.from));
    const pool = near.length ? near : counts;
    const stated = [...new Set(pool.map((c) => c.n))];
    if (!stated.length) continue; // no count stated: nothing to compare, and silence is not a pass
    if (stated.length > 1) {
      out.push({ check: 'idrange', item: it.n, verdict: 'range-ambiguous', claim: r.from, detail: `the item states ${stated.join(' / ')} records near ${r.from} (span ${r.span}) — it does not pin one count to one range` });
      continue;
    }
    const n = stated[0];
    if (n === r.span) {
      out.push({ check: 'idrange', item: it.n, verdict: 'ok-range', claim: r.from, detail: `${n} records across a ${r.span}-id span (${r.y1}-${r.a}…${r.b})` });
      continue;
    }
    if (RANGE_DISCLOSED.test(plain)) {
      out.push({ check: 'idrange', item: it.n, verdict: 'cve-range-disclosed', claim: r.from, detail: `${n} records stated against a ${r.span}-id span — the item names the gap, so the set/range distinction is disclosed` });
      continue;
    }
    out.push({
      check: 'idrange', item: it.n, verdict: 'cve-range-span-mismatch', claim: r.from,
      detail: `implies ${r.span} identifiers but the item states ${n} — quote the set, not the span (a dashed range asserts every id between its ends exists)`,
    });
  }
  return out;
}

function checkRepo(it, budget, ageBudget) {
  const out = [];
  const starQuotes = starQuotesOf(it.plain);
  // the suppressions are named, not silent — the class is measurable only if it is printed
  for (const { slug, why } of it.notRepo ?? []) {
    out.push({
      check: 'repo', item: it.n, verdict: 'not-a-repo', claim: slug,
      detail: `named in backticks but the sentence is about a “${why}”, not a project — a model id or an endpoint path is not a repository claim, so archived/stale cannot answer here`,
    });
  }
  if (!it.repos.length) return out;
  const technical = new Set((it.notRepo ?? []).map((x) => x.slug));
  for (const slug of it.repos.filter((s) => !technical.has(s)).slice(0, 2)) {
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
      /* A 404 CONFIRMS an item that says the name does not exist. Item 5 of the 11-05 feed reads
       * "There is no `tencent/Hy4` and no GA system card in the org's listing", and `gh api
       * repos/tencent/Hy4` answers 404 — an agreement reported as a sev-1 `unreadable` finding
       * because the status was thrown away and the sentence was never read. The guard is the usual
       * one: the suppression fires only when THIS slug's own sentence carries the negation, so a
       * live project whose repo 404s (deleted, renamed, private) still reports as unreadable. */
      const said = sentenceWith(it.plain ?? it.text ?? '', slug);
      if (st.status === '404' && ABSENT_ASSERTED.test(said)) {
        out.push({ check: 'repo', item: it.n, verdict: 'repo-absent-asserted', claim: slug, detail: `repos/${slug} answers 404 and the item's own sentence asserts it does not exist (“${said.trim().slice(0, 140)}”) — the registry agrees, so this is a confirmation, not an unreadable repo` });
        continue;
      }
      out.push({ check: 'repo', item: it.n, verdict: 'unreadable', claim: slug, detail: `api.github.com: ${st.error}${st.status ? ` (HTTP ${st.status})` : ''}` });
      continue;
    }
    const pushed = Date.parse(st.pushed_at);
    const ageDays = Math.round((Date.now() - pushed) / 86_400_000);
    const biggest = starQuotes.length ? Math.max(...starQuotes) : null;
    const recAgeDays = st.created_at ? Math.round((Date.now() - Date.parse(st.created_at)) / 86_400_000) : null;
    if (st.archived) {
      const disc = staleDisclosure(it.plain, st.pushed_at);
      out.push({
        check: 'repo', item: it.n, verdict: disc ? 'archived-disclosed' : 'archived', claim: slug,
        detail: `archived: true, last push ${st.pushed_at.slice(0, 10)} — an archived repo makes "unfixed" permanent, not pending`
          + (disc ? `; ${disc}, so the item already carries the advice` : ''),
      });
    } else if (ageDays > STALE_DAYS) {
      const disc = staleDisclosure(it.plain, st.pushed_at);
      out.push({
        check: 'repo', item: it.n, verdict: disc ? 'stale-disclosed' : 'stale', claim: slug,
        detail: `last push ${st.pushed_at.slice(0, 10)} (${ageDays}d) with ${st.stars} stars — `
          + (disc ? `${disc}, so the staleness is the story rather than an unexamined number` : 'is the item about the code or the name?'),
      });
    }
    /* A relative tolerance on a SMALL count is not a tolerance. Measured 2026-11-01 on item 17,
       a 7-hour-old Show HN repo quoted at "3 commits, 6 stars": two stars arrived while the batch
       was being written, which is a 25% drift and a finding on a number nobody could act on. The
       floor makes the check about the claim being wrong rather than about the ratio. */
    const sv = starVerdict({
      slug, quoted: biggest, now: st.stars, recAgeDays,
      dated: biggest != null && DATED_QUOTE.test(starQuoteSentence(it.plain, biggest)),
    });
    if (sv) {
      /* The dated arm still owes one piece of advice the predicate cannot know: whether the item
         already carries a *later* reading, in which case there is no work left to do. */
      if (sv.verdict === 'star-dated') {
        const later = laterReading(it.plain, biggest);
        sv.detail += later
          ? `; it already quotes the later reading (${later}), so nothing to correct`
          : '; quote the second reading too';
      }
      out.push({ check: 'repo', item: it.n, verdict: sv.verdict, claim: `${sv.quoted} quoted vs ${sv.now} now`, detail: sv.detail });
    }
    // age is a history claim: only young records that say their own age are worth a second hop.
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
    if (!['archived', 'stale', 'archived-disclosed', 'stale-disclosed'].includes(out.at(-1)?.verdict) && biggest != null) {
      out.push({ check: 'repo', item: it.n, verdict: 'ok', claim: slug, detail: `${st.stars}★, last push ${st.pushed_at.slice(0, 10)}` });
    }
  }
  return out;
}

// ── check D: count claim vs artifact ────────────────────────────────────────────────────────
const COUNT_NOUNS = [
  'harnesses?', 'install sections?', 'sub-skills?', 'skills?', 'rules?', 'plugins?', 'agents?',
  'commands?', 'formats?', 'tools?', 'apps?', 'workers?', 'benchmarks?', 'languages?', 'models?',
  'effects?',
];
/* A count's noun is often dressed by a hyphenated modifier, and the matcher used to require the
 * noun to follow the number directly. Measured 2026-11-04 on item 19: `244 pixel-art effects` is a
 * count claim the reader could not see at all, so the page's own machine-readable delimiter had
 * nothing to be compared against. The modifier is ONE hyphenated word followed by a space (not a
 * word ending in a hyphen — `pixel-art effects` has the separator between them), and it must START
 * with a letter, or `4-bit models` reads as a count of four when it is a bit width. */
const COUNT_MOD = '[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\\s+';
const COUNT_RE = new RegExp(`${NUM}\\s+(?:${COUNT_MOD})?((?:${COUNT_NOUNS.join('|')}))\\b`, 'gi');
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

/* A page can mark its own count MACHINE-READABLY, and then the "which page states it" question has
 * an exact answer instead of a neighbour-grep. Measured 2026-11-04 on `patch-gg/pixelfx`, whose
 * README opens `**<!-- count -->244<!-- /count --> pixel art effects and animations…**` — the
 * first artifact this pipeline has read that delimits its own number.
 *
 * The delimiter marks the NUMBER; the NOUN is usually the prose it introduces, so the tail is read
 * too. A delimiter that CARRIES a label (`<!-- count:effects -->`) is the stronger spelling and is
 * compared label-to-noun — which is also what stops a gallery total sitting beside a per-category
 * row from being read as this claim's count. That guard is the whole reason the label exists: a
 * span about another noun is another artifact's count, and using it would make the check manufacture
 * a disagreement it then reports as the author's. */
function delimitedCounts(text) {
  const out = [];
  const re = /<!--\s*count(?:[:=\s]+([A-Za-z][\w -]*?))?\s*-->([\s\S]{0,40}?)<!--\s*\/\s*count\s*-->/gi;
  for (const m of text.matchAll(re)) {
    const raw = m[2].replace(/[*_`\s]/g, '');
    if (!/^\d[\d,]*$/.test(raw)) continue; // a span holding prose is not a count
    const tail = text.slice(m.index + m[0].length, m.index + m[0].length + 90)
      .replace(/<!--[\s\S]*?-->/g, ' ').replace(/<[^>]*>/g, ' ');
    out.push({ n: toNum(raw), label: m[1] ? m[1].trim().toLowerCase() : null, tail });
  }
  return out;
}

/* `[]` is "no delimiter speaks to this claim", which is why it never becomes a finding: a page
 * that carries no delimiter is simply a page the prose reader handles as before. */
function delimitedFor(spans, noun) {
  const stem = noun.replace(/s$/, '').toLowerCase();
  const sq = (s) => s.replace(/s$/, '');
  return spans.filter((s) => {
    if (s.label) return sq(s.label) === stem;
    // Unlabelled: the noun has to be in the clause the span introduces, or the number is unattached.
    const head = s.tail.replace(/^[\s*_`]+/, '').split(/[.;:!?]/)[0];
    return new RegExp(`\\b${stem}(?:s|es)?\\b`, 'i').test(head);
  });
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
/* `hn` is the ONE skip a quotation has to un-skip: a thread's numbers are points and comments, but
   its prose is exactly what an item quotes ("Multiple users are confirming that their AI keys have
   been used." is a status-page line, and a commenter's sentence is no less attributed for being a
   comment). The order of CITED_SKIP is load-bearing — entry 0 is the HN pattern — so the option
   filters by INDEX rather than by re-testing the regexes. */
function citedPages(plain, { hn = false, cap = 3 } = {}) {
  const ranked = [];
  const seen = new Set();
  for (const m of plain.matchAll(/https:\/\/[^\s)\]<>"'`]+/g)) {
    let url = m[0].replace(/[.,;:]+$/, '');
    if (CITED_SKIP.some((re, i) => (i === 0 ? !hn : true) && re.test(url))) continue;
    let label = url.replace(/^https:\/\/(www\.)?/, '');
    let raw = false;
    let rank = 1;
    const arxiv = /^https:\/\/arxiv\.org\/abs\/(\d{4}\.\d{4,5})(?:v\d+)?/.exec(url);
    /* A FILE on the Hub is the file, not the card. `huggingface.co/<repo>/raw/<rev>/<path>`,
     * `/resolve/` and `/blob/` all name one artifact, and until 2026-11-05 they were rewritten by the
     * MODEL-CARD arm below to `<repo>/raw/main/README.md` and then dropped as a duplicate of the card
     * — so a cited LICENSE was never fetched. Item 1 of the 11-05 feed quotes `"prominently displayed
     * on the user interface"` verbatim out of `moonshotai/Kimi-K3.1-Pro`'s LICENSE §3, and the lint
     * reported `quote-not-found` (sev 3) against a correct item having read three sources, none of
     * them that file. Same species as the GitHub `blob/` arm one line down: a linked file IS the
     * text, and a rendered page is a guess. Raw URLs keep the revision the item pinned. */
    const hfFile = /^https:\/\/huggingface\.co\/(datasets\/)?([\w.-]+)\/([\w.-]+)\/(?:raw|resolve|blob)\/([^/]+)\/([^?#]+)$/.exec(url);
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
    } else if (hfFile) {
      // `raw` and `resolve` already serve the bytes; `blob` is the rendered viewer, so ask its twin
      url = `https://huggingface.co/${hfFile[1] ?? ''}${hfFile[2]}/${hfFile[3]}/raw/${hfFile[4]}/${hfFile[5]}`;
      label = `${hfFile[2]}/${hfFile[3]} ${hfFile[5]}`;
      raw = true;
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
  return ranked.sort((a, b) => a.rank - b.rank).slice(0, cap).map(({ rank, ...p }) => p);
}

/* A bot wall is short and says what it is. Both conditions are required: a legitimately short page
 * (an error note, a stub) must still count as read, and a long article that happens to open with
 * "just a moment" is a page. 1,200 chars is comfortably below any advisory and comfortably above
 * every challenge page measured (226–305 chars across drupal.org, and 750 for a typical Cloudflare
 * interstitial). */
const BLOCK_SHELL_RE = /client challenge|enable javascript|javascript is disabled|just a moment|checking your browser|attention required|access denied|verify you are human|cf-chl|ddos protection by|请启用 ?javascript|请稍候/;
function isBlockShell(text) {
  const t = String(text ?? '').trim();
  if (!t) return true;
  return t.length < 1_200 && BLOCK_SHELL_RE.test(t.slice(0, 900).toLowerCase());
}

/* A `<script type="text/template">` is NOT code — it is markup the page renders, and stripping
 * every `<script>` deletes the article. Measured 2026-11-04, the day it produced two findings
 * against correct quotations (item 37 of the 11-04 feed): chromereleases.googleblog.com's Chrome
 * 157 post carries its ENTIRE body — the "This update includes 213 security fixes." sentence and
 * every "Reported by X (Anthropic), assisted by Claude" credit — inside
 * `<script type='text/template'>`, so the strip left **10.7 KB of navigation out of a 631 KB
 * page**. That residue is well over `isBlockShell`'s 1,200-char floor, so the page counted as
 * READ, `quote-not-found` went out on two verbatim sentences, and the finding described the
 * extractor rather than the feed. Blogger/Blogspot serves post bodies this way, which makes it a
 * host class rather than one page (chromereleases is cited in nearly every Chrome item).
 * So template-typed scripts are UNWRAPPED (their content kept) and everything else — executable
 * JS, and `application/ld+json` metadata, which a reader never sees on the page — is dropped.
 * The distinction is the one this whole check rests on: prose a reader can see is a source;
 * machine-readable data the page merely carries is not. */
const SCRIPT_TEMPLATE_RE = /<script\b[^>]*\btype\s*=\s*["']?(?:text\/template|text\/x-handlebars-template|text\/ng-template|text\/x-tmpl|application\/x-template)["']?[^>]*>([\s\S]*?)<\/script>/gi;
const SCRIPT_DATA_RE = /<script\b[^>]*\btype\s*=\s*["']?application\/(?:ld\+json|json)["']?[^>]*>[\s\S]*?<\/script>/gi;

/** HTML → readable text. Pure, so `--selftest` pins the template unwrap without a network call. */
function htmlText(body, raw = false) {
  if (raw) return body;
  return body
    .replace(SCRIPT_TEMPLATE_RE, ' $1 ')
    .replace(SCRIPT_DATA_RE, ' ')
    .replace(/<(script|style|noscript|svg)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;|&#160;/g, ' ')
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => { try { return String.fromCodePoint(parseInt(h, 16)); } catch { return ' '; } })
    .replace(/&#(\d+);/g, (_, d) => { try { return String.fromCodePoint(Number(d)); } catch { return ' '; } })
    .replace(/&amp;/g, '&').replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    /* Tags become a space, so `the <a>213</a> fixes` arrives as three spaces in a row. A reader
       checking "does the page carry this sentence" compares one space, so collapse horizontal runs
       — newlines stay, because `mdTables` reads a page's table by LINE. */
    .replace(/[ \t]{2,}/g, ' ');
}

async function citedPageText(page) {
  const key = `page:${page.url}`;
  const hit = cache[key];
  /* `v` gates the extractor, not the page. Version 2 decodes NUMERIC character references: the
   * first version handled `&#39;` only, so a page writing `&#x27;` reached every check as
   * `isn&#x27;t` and item 16's verbatim title quotation — present on both its cited pages, one of
   * them the HN thread's own heading — read as an invented sentence. An entry written by an older
   * extractor must not be evidence for the newer one, which is the same rule the CNA cache's `v: 3`
   * encodes. Refetching is unmetered; only the verdict rested on the stale text. */
  /* A **wall is per-request**, so it must not be cached like a page: `drupal.org/sa-contrib-2026-254`
     served a 3 KB "Client Challenge" to the 12:31 run and **34,311 bytes of advisory** to a plain
     `curl` nine minutes later (measured 2026-11-01 12:40, both quotations in the item verbatim on
     the page). A 6-hour TTL on the wall would have turned one unlucky request into half a day of
     "unread", which is the `unread is not absent` rule leaking in through the cache. So an entry
     that holds a wall — or no text at all — gets the error TTL. */
  const hitWall = hit && (isBlockShell(hit.text) || !hit.text);
  if (hit && hit.v === PAGE_CACHE_V && Date.now() - Date.parse(hit.fetched_at) < (hitWall ? ERROR_TTL_MS : CACHE_TTL_MS)) return hit;
  let text = '';
  /* The UA is part of the request, and **no single client string is right** — measured 2026-11-01
   * on two hosts a few hours apart, with the verdict inverted between them:
   *  · `karpathy.bearblog.dev/hacker-tube/` answers **404 / 9 bytes "Not found"** to `curl/*` *and*
   *    to a request with no UA header, and **200 / 14,966 bytes** (2,232 chars of prose, the
   *    6,454-video paragraph in it) to `undici`, `python-requests`, `Wget` and a bare `Mozilla/5.0`
   *    — the URL HN item 50319510 (920 points, submitted by its author) points at.
   *  · `drupal.org/sa-contrib-2026-254` answers a **3,038-byte "Client Challenge"** to a
   *    Chrome-shaped UA (three consecutive requests, 1s apart) and **34,311 bytes of advisory** —
   *    both quoted sentences verbatim in it — to `curl/8.7.1`, `Wget/1.21`, `python-requests/2.31.0`
   *    and a request with **no** UA at all.
   * So the gate is a *client string*, never "browser vs not", and a wall on ONE string is not a
   * wall on the other. Retry with the second before recording unread: this is the difference
   * between "the page does not say that" and "I could not read it", which is the rule the whole
   * check rests on. Only paid when the first attempt came back a wall, and both are unmetered. */
  for (const ua of CLIENT_STRINGS) {
    try {
      const r = await fetch(page.url, { signal: AbortSignal.timeout(20_000), headers: { 'user-agent': ua, accept: 'text/html,application/xhtml+xml,*/*' } });
      citedPages_requests += 1;
      if (!r.ok) continue;
      const body = (await r.text()).slice(0, 3_000_000);
      // An abs page is HTML: keep its text, drop the tags, so a `<blockquote>` abstract reads as prose.
      // `<style>`/`<noscript>` go too — a stylesheet's tokens can spell a noun next to a number.
      // `htmlText()` keeps a template-typed `<script>` — see its comment: stripping that is what
      // deleted a Blogger post's whole body and reported two verbatim quotations as inventions.
      const t = htmlText(body, page.raw);
      // keep the longest read: a wall is short by construction, but a truncated 200 also arrives
      if (t.length > text.length) text = t;
      if (!isBlockShell(t)) break;
    } catch { /* unreadable is a state, not an absence — it is reported as unread this run */ }
  }
  cache[key] = { v: PAGE_CACHE_V, fetched_at: new Date().toISOString(), bytes: text.length, text };
  /* the short TTL above reads this entry's own contents, so a wall re-fetches after 10 minutes
     rather than being stored as fact for six hours */
  return cache[key];
}
/* v3 names its client (see `citedPageText`). A page's text now depends on who asked, and an entry
   fetched anonymously is not evidence about what a named client sees — the same rule the CNA
   cache's schema version encodes.
   v4 unwraps template-typed `<script>` blocks (`htmlText`). An entry written by the v3 extractor
   holds a Blogger page with its body DELETED and still reads as a full-text page, so it is the
   most dangerous kind of stale cache: not empty, but a page whose prose is missing while its
   length says otherwise. Bumping costs one unmetered refetch per cited page. */
const PAGE_CACHE_V = 4;
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
  const spans = delimitedCounts(rd.text);
  const unresolved = [];
  for (const cl of claims) {
    const anyNum = countNumsIn(body, cl.noun);
    // A YAML block is a count written as structured data — read it before calling the claim absent
    const block = frontmatterBlockCount(rd.text, cl.noun);
    const delim = delimitedFor(spans, cl.noun);
    if (delim.some((s) => s.n === cl.n)) {
      out.push({ check: 'count', item: it.n, verdict: 'ok-delimited', claim: cl.phrase, detail: `the README delimits this count itself (\`<!-- count -->${cl.n}<!-- /count -->\`) — the page answers the question exactly, with no neighbour-grep needed` });
    } else if (anyNum.includes(cl.n)) {
      out.push({ check: 'count', item: it.n, verdict: 'ok', claim: cl.phrase, detail: `README states it` });
    } else if (block === cl.n) {
      out.push({ check: 'count', item: it.n, verdict: 'ok', claim: cl.phrase, detail: `the card's \`${cl.noun.replace(/s$/, '')}:\` block lists ${block} — a structured block is a count, not a sentence` });
    } else {
      unresolved.push({ cl, anyNum, block, delim });
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
    for (const { cl, anyNum, delim } of unresolved) {
      const hit = fetched.find((p) => countNumsIn(p.text.replace(/&nbsp;/g, ' '), cl.noun).includes(cl.n));
      // A model card is fetched RAW (frontmatter intact), so its `language:` block is checkable even
      // though no sentence states the total — the item's count is verified, not merely excused.
      const blockHit = fetched.find((p) => frontmatterBlockCount(p.text, cl.noun) === cl.n);
      /* A cited page's own delimiter is the same exact answer the README's is, and it is checked
         here too because a vendor gallery marks its total on ITS page, not in the repo README. */
      const delimHit = fetched.find((p) => delimitedFor(delimitedCounts(p.text), cl.noun).some((s) => s.n === cl.n));
      if (delimHit) {
        out.push({ check: 'count', item: it.n, verdict: 'ok-delimited', claim: cl.phrase, detail: `${delimHit.label} delimits this count itself (\`<!-- count -->${cl.n}<!-- /count -->\`) — a machine-readable count is the exact question answered` });
      } else if (hit) {
        out.push({ check: 'count', item: it.n, verdict: 'ok-cited-page', claim: cl.phrase, detail: `${hit.label} states it (the repo README does not) — quote the page the number came from` });
      } else if (blockHit) {
        out.push({ check: 'count', item: it.n, verdict: 'ok-cited-page', claim: cl.phrase, detail: `${blockHit.label}'s \`${cl.noun.replace(/s$/, '')}:\` block lists ${cl.n} — the count is in the metadata, not a sentence` });
      } else if (tableRowHit(fetched, cl)) {
        /* A table's data rows ARE its count, and a card whose totals live only in a table states
           no sentence for `countNumsIn` to read. Measured 2026-11-01 on item 5: the Bolt card's
           "21 benchmark rows" is 21 pipe-rows under a `Benchmark` header and no sentence anywhere,
           so the claim fell through to `number-other-noun` against a *landing page* ("21 days
           ago") — a false finding whose suggested fix was to misquote a correct item. The guard is
           the header: the table must NAME the noun, or the row count is a coincidence. */
        out.push({ check: 'count', item: it.n, verdict: 'ok-table-rows', claim: cl.phrase, detail: `${tableRowHit(fetched, cl).label}: a table headed “${tableRowHit(fetched, cl).header}” has ${cl.n} data rows — a row count is a count` });
      } else if (anyNum.length) {
        /* A page that delimits its own count has stated it exactly, so the detail line quotes the
           DELIMITED value rather than the first nearby integer — that is the number the page is
           making a claim about, and the one a reader can act on. */
        const delimited = delim.length ? [...new Set(delim.map((s) => s.n))] : null;
        out.push({ check: 'count', item: it.n, verdict: 'differs', claim: cl.phrase, detail: delimited ? `the README's own \`<!-- count -->\` delimiter states ${delimited.join(' / ')} ${cl.noun} — a machine-readable count outranks the first nearby integer` : `README says ${[...new Set(anyNum)].join(' / ')} ${cl.noun}${fetched.length ? `; also read ${fetched.map((p) => p.label).join(', ')}` : ''}` });
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

// ── check E: a ratio over a TABLE's rows ────────────────────────────────────────────────────
/* The 2026-11-01 04:35 batch published NVIDIA's Bolt card as winning **"three of nine"** rows at
 * Q4_K_M. The card has **21** benchmark rows and Q4_K_M wins **7** of them, and nothing in the lint
 * could see it: `count` greps for a number beside a noun, and the card states no such sentence at
 * all — its totals ARE the table, so the claim was scored against a *landing page* and came back
 * `number-other-noun` (the model-name fix below). A careful read does not catch this either, and
 * that is the point: the three rows the item names are the three **largest** wins, so the rounding
 * is invisible from the examples and only the denominator is wrong.
 *
 * So the unit is a markdown table's ROW COUNT, the cheapest recompute in the feed. The reader is
 * deliberately timid, because a table matched by POSITION would happily compare "which model"
 * against "score" and produce a confident wrong answer:
 *   (a) both columns must be named by the item, matched by **header text** — never by index;
 *   (b) no third column may compete — it refuses rather than approximating, reported as
 *       `table-columns-unresolved`, sev 0: a table it could not pin is not a table that disagrees;
 *   (c) a row counts only when **both** cells are pure numbers after stripping bold and links — a
 *       cell holding prose is not a score and is counted as `unparsed`, never as a loss;
 *   (d) ties are a third count, printed, because "wins 7 of 21" and "wins 7 of 21 with 2 ties" are
 *       different claims about a 21-row table;
 *   (e) the check does not decide DIRECTION — it reports both `B>A` and `B<A` and accepts a
 *       numerator that matches either, since the left/right order of two headers is the vendor's
 *       layout and the item's "wins" is the item's wording. */
const ROW_VOCAB = /\b(?:rows?|benchmarks?|columns?|tasks?|tests?|comparisons?|entries|settings|head-to-head|tables?|charts?)\b/i;

/* Word numbers are how the wrong denominator was written — "three of nine", not "3 of 9" — so a
 * digits-only reader would have missed the filing case entirely. Bounded on purpose: the compound
 * form (`twenty-one`) is the only many-word spelling English uses for small numbers. */
const NUM_WORDS = {
  one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10,
  eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17,
  eighteen: 18, nineteen: 19, twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60,
  seventy: 70, eighty: 80, ninety: 90,
};
const NUM_WORD_ALT = String.raw`(?:${Object.keys(NUM_WORDS).join('|')})(?:-(?:one|two|three|four|five|six|seven|eight|nine))?`;
const RATIO_TOKEN = String.raw`(\d[\d,]*|${NUM_WORD_ALT})`;
const RATIO_RE = new RegExp(String.raw`\b${RATIO_TOKEN}\s+(?:of|out\s+of)\s+${RATIO_TOKEN}\b`, 'gi');

function numToken(s) {
  const w = String(s).toLowerCase();
  if (/^\d/.test(w)) return toNum(w);
  const [head, tail] = w.split('-');
  return (NUM_WORDS[head] ?? 0) + (tail ? (NUM_WORDS[tail] ?? 0) : 0);
}

function sentenceAt(t, i) {
  const r = sentences(t).find((s) => i >= s.start && i < s.end);
  return r ? t.slice(r.start, r.end) : t.slice(Math.max(0, i - 200), i + 200);
}

/** `7 of 21` / `three of nine` — only when the sentence is talking about rows of something. */
function ratioClaims(plain) {
  const out = [];
  for (const m of plain.matchAll(RATIO_RE)) {
    const a = numToken(m[1]);
    const b = numToken(m[2]);
    if (!a || !b || a < 2 || b < 2 || a > b || b > 100000) continue;
    const sent = sentenceAt(plain, m.index);
    if (!ROW_VOCAB.test(sent)) continue;
    if (identifierNumber(plain, m.index, m[1])) continue;
    out.push({ a, b, phrase: m[0].replace(/\s+/g, ' '), sent });
  }
  return out;
}

/** A cell is text once its markup is gone — bold, links and `<br>` are formatting, not data. */
function tableCell(raw) {
  return raw
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    // `**bold**` and `` `code` `` are formatting; an INTERNAL underscore is not. Measured on the
    // Bolt card, whose Q4_K_M column header lost its separators to a blanket `[*_`]` strip and
    // stopped matching the item — the column the item is about became invisible to the matcher.
    .replace(/\*\*|`/g, '')
    .replace(/(^|[^A-Za-z0-9])_+|_+(?![A-Za-z0-9])/g, '$1')
    .replace(/&nbsp;|&#160;/g, ' ')
    .trim();
}

/** A score cell is a NUMBER, not "53.10 (best)". Prose in a cell is `unparsed`, never a value. */
function tableNumber(cell) {
  const c = String(cell).replace(/\s+/g, '').replace(/,/g, '');
  if (!/^-?\d+(?:\.\d+)?%?$/.test(c)) return null;
  const n = Number(c.replace('%', ''));
  return Number.isFinite(n) ? n : null;
}

/** Markdown tables only — a `<table>` in HTML has no column headers to match by, and guessing is
 *  the one thing this check must not do. */
function mdTables(text) {
  const lines = String(text).split(/\r?\n/);
  const out = [];
  for (let i = 0; i + 1 < lines.length; i++) {
    if (!/^\s*\|/.test(lines[i])) continue;
    if (!/^\s*\|?[\s:|-]*-[\s:|-]*\|?\s*$/.test(lines[i + 1])) continue;
    const cells = (l) => l.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(tableCell);
    const header = cells(lines[i]);
    const rows = [];
    let j = i + 2;
    for (; j < lines.length && /^\s*\|/.test(lines[j]); j++) {
      const c = cells(lines[j]);
      if (c.every((x) => !x || /^:?-{3,}:?$/.test(x))) continue;
      rows.push(c);
    }
    i = j - 1;
    // a header with no words is an unlabelled spec table (`| | |`) — nothing to match a column by
    if (rows.length >= 3 && header.some((h) => /[A-Za-z]{2}/.test(h))) out.push({ header, rows });
  }
  return out;
}

const HEADER_STOP = new Set(['the', 'and', 'for', 'with', 'from', 'it', 'its', 'a', 'an', 'of', 'in', 'on', 'at', 'to', 'v', 'vs', 's', 'b', 'e']);

/** The `count` check's table half: a table whose HEADER names the claim's noun is a count of that
 *  noun, row by row. Without the header guard, any 21-row table would "verify" any 21 of anything. */
function tableRowHit(pages, cl) {
  const stem = cl.noun.replace(/s$/, '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  for (const pg of pages) {
    for (const tb of mdTables(pg.text)) {
      if (tb.rows.length !== cl.n) continue;
      const header = tb.header.find((h) => new RegExp(`\\b${stem}`, 'i').test(h));
      if (header) return { label: pg.label, header: header.trim() };
    }
  }
  return null;
}
function headerTokens(h) {
  return [...new Set(String(h)
    .split(/[^A-Za-z0-9_.+-]+/)
    .map((s) => s.replace(/^[.+-]+|[.+-]+$/g, ''))
    .filter((s) => s.length >= 2 && /[A-Za-z]/.test(s) && !HEADER_STOP.has(s.toLowerCase())))];
}
/** How much of a column header the item actually names. `Gemma4` does not match `Gemma-4`, which is
 *  correct: a header the item never mentions must not win a slot because two of its words are common. */
function columnScore(tokens, plain) {
  return tokens.filter((tk) => new RegExp(`(^|[^A-Za-z0-9])${tk.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^A-Za-z0-9]|$)`, 'i').test(plain)).length;
}

/** Pick the one table (and the one column pair) the item is talking about, or say why not. */
function pickRatioTable(pages, plain) {
  let sawTable = false;
  let best = null;
  for (const pg of pages) {
    for (const tb of mdTables(pg.text)) {
      sawTable = true;
      const scores = tb.header.map((h) => columnScore(headerTokens(h), plain));
      const order = scores.map((s, i) => [s, i]).sort((x, y) => y[0] - x[0] || x[1] - y[1]);
      if (order.length < 2 || order[0][0] < 2 || order[1][0] < 2) continue;
      const [s1, i1] = order[0];
      const [s2, i2] = order[1];
      const outside = order.slice(2).reduce((m, [s]) => Math.max(m, s), 0);
      if (outside >= s2) continue; // a third column competes for the same words — refuse
      const [a, b] = i1 < i2 ? [i1, i2] : [i2, i1];
      const score = s1 + s2;
      if (!best || score > best.score || (score === best.score && tb.rows.length > best.table.rows.length)) {
        best = { page: pg.label, table: tb, a, b, score };
      }
    }
  }
  if (best) return best;
  return sawTable ? { unresolved: true } : null;
}

/** Rows where both cells are numbers. `B` is the RIGHT-hand column of the pair as laid out. */
function tableWins(table, a, b) {
  let wins = 0;
  let losses = 0;
  let ties = 0;
  let unparsed = 0;
  for (const row of table.rows) {
    const va = tableNumber(row[a] ?? '');
    const vb = tableNumber(row[b] ?? '');
    if (va == null || vb == null) { unparsed += 1; continue; }
    if (vb > va) wins += 1;
    else if (vb < va) losses += 1;
    else ties += 1;
  }
  return { wins, losses, ties, unparsed };
}

async function checkRatio(it) {
  const out = [];
  const claims = ratioClaims(it.plain);
  if (!claims.length) return out;
  const pages = [];
  if (it.repos.length) {
    let rd = await readme(it.repos[0]);
    if (rd && rd.text) pages.push({ label: `${it.repos[0]} README`, text: rd.text });
    else {
      // a model id has a CARD, and naming a card "README" misreports where a number came from
      const card = await hfCard(it.repos[0]);
      if (card && card.text) pages.push({ label: `HF model card ${it.repos[0]}`, text: card.text });
    }
  }
  if (!NO_NET) {
    for (const p of citedPages(it.plain)) {
      const t = await citedPageText(p);
      if (t.text) pages.push({ label: p.label, text: t.text });
    }
  }
  const pick = pickRatioTable(pages, it.plain);
  if (!pick) return out; // no parseable table ⇒ say nothing
  if (pick.unresolved) {
    out.push({
      check: 'ratio', item: it.n, verdict: 'table-columns-unresolved',
      claim: claims.map((c) => c.phrase).join(' | '),
      detail: `a cited page carries a table, but no column pair is named by the item strongly enough to pin — count the rows by hand rather than let a positional match decide`,
    });
    return out;
  }
  const { wins, losses, ties, unparsed } = tableWins(pick.table, pick.a, pick.b);
  const rows = wins + losses + ties;
  if (rows < 3) return out;
  return out.concat(ratioFindings(it.n, claims, pick, { wins, losses, ties, unparsed, rows }));
}

/** Split from the fetch so the verdict is testable without a network. */
function ratioFindings(itemN, claims, pick, { wins, losses, ties, unparsed, rows }) {
  const hA = pick.table.header[pick.a];
  const hB = pick.table.header[pick.b];
  const shape = `${pick.page}: ${rows} rows${unparsed ? ` (+${unparsed} unparsed)` : ''}, “${hA}” vs “${hB}” → ${wins} / ${losses} / ${ties} (B>A / B<A / tie)`;
  return claims.map((cl) => {
    const numOk = cl.a === wins || cl.a === losses || cl.a === ties;
    const denOk = cl.b === rows;
    return numOk && denOk
      ? { check: 'ratio', item: itemN, verdict: 'ok-ratio', claim: cl.phrase, detail: `${cl.a} of ${cl.b} reproduces — ${shape}` }
      : {
        check: 'ratio', item: itemN, verdict: 'ratio-row-count', claim: cl.phrase,
        detail: `“${cl.phrase}” does not reproduce — ${shape}. The denominator is the table's row count and the numerator is one of its directions; quote the pair the table prints`,
      };
  });
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

// ── check H: a sentence in quotation marks is a claim about BYTES ───────────────────────────
/* Three published instances of one defect, none caught by a human read because the sentence reads
 * true. Cerebras was quoted as "an illustrative configuration, not a reported end-to-end benchmark"
 * and `end-to-end` appears **0** times in its 184 KB payload. Northflank's "verbatim" instruction
 * was a paraphrase wearing quote marks until it was re-read. And on 2026-10-31 the feed published
 * `nesformer`'s "The model was not trained. A compiler computed its weights." — which greps **0**
 * times, the README actually saying "Nobody trained these weights; a compiler computed every one."
 *
 * Every other check in this file reads a NUMBER. This one reads a STRING, and the test is the
 * cheapest in the file: the page text is already fetched (the `count` check pays for it), so the
 * question is `page.includes(quote)`.
 *
 * Five guards, each a way this would otherwise produce a finding about the checker:
 *   (a) PAIR PER LINE. An odd number of `"` on a line makes every later pair a guess, and a
 *       mis-paired span runs from the end of one quote to the start of the next — which is where
 *       the first draft's 29- and 32-word "quotations" came from. An odd line is skipped, counted,
 *       and reported as coverage rather than mined for a finding.
 *   (b) GLYPHS AND MARKDOWN. `“…”`, `"…"` and `«…»` are the same claim; `**bold**` inside a quote
 *       and a `[label](url)` inside a README sentence are both markup, not words. Normalize both
 *       sides before comparing, and compare case-insensitively (a quote lifted from mid-sentence
 *       often carries a capital the source does not).
 *   (c) TAG-SPLIT WORDS (`mostly preclinical`). A `<em>` inside a word becomes a space when tags
 *       are stripped to `' '`, so every comparison also runs against a whitespace-free form of
 *       both sides. This is also what makes a hard-wrapped README paragraph match a one-line quote.
 *   (d) UNREAD IS NOT ABSENT. No readable source → `quote-not-read` (severity 0), never a finding.
 *       A `</>`-heavy JS shell yields no prose and is exactly that case.
 *   (e) A RECORD IS NOT A PAGE. "In the Linux kernel, the following vulnerability has been
 *       resolved" is a quotation of the CVE record's own `descriptions[]`, and a `Received` record
 *       carries none — which is "not yet", never "states nothing". NVD's description, the CNA
 *       container's description, and KEV's `vulnerabilityName`/`shortDescription` are all verbatim
 *       sources, so a field quotation is checked against the field.
 * An ellipsis inside a quote is legitimate practice: the fragments are checked individually, and
 * only fragments of ≥6 words can produce a finding.
 *
 * THE BLIND SPOTS, MEASURED 2026-10-31 (`--quotation-census` over 31 October feeds, 1,248 items):
 *   (a) ODD LINES were **310 of 2,371 quoted lines (13.1%)** — and reading them shows they are not
 *       stray marks but **hard-wrapped quotations**, the opener ending one line and the closer
 *       starting the next. Skipping such a line whole discarded both halves, so 13% of quoted lines
 *       were never judged. A BOUNDED JOIN now absorbs up to two following lines and pairs the block:
 *       **≥6-word spans judged 2,208 → 2,338 (+130, +5.9%)**, 12 blocks left unbalanced (reported as
 *       coverage, never mined). A joined finding says so in its detail.
 *   (b) THE PAGE CAP of 4 is **not** a defect: across the same 1,248 items **1** (0.1%) cites more
 *       than four pages, dropping a single candidate — a second vendor advisory beside the same CVE,
 *       not the item's primary. Left at 4; the census prints the row so the claim is re-measurable.
 *   (c) THE 4–5-WORD CLASS is precise and its denominator was the problem. On the 10-30 feed's six
 *       advisories, **every one whose cited pages were readable was a real defect** (pico's "AI made
 *       it unnecessary" is nowhere on the maintainer's discussion; novelty-bench's "which idea is
 *       novel" reports the prompt as "asked which idea was novel"), one was a spelling normalisation,
 *       and the three that looked invented were **HTTP 429 from coindesk.com** — unread. So a short
 *       span escalates to `quote-paraphrase` (sev 2) only when **nothing the item cites went
 *       unread**, and stays `quote-short` (sev 1) with the unread count named in its detail when
 *       something did. Calibrated both ways: the 10-31 file returns 0 findings / 31 verified before
 *       and after, and the 10-30 file's three escalations were all real after opening the sources.
 */
const QUOTE_WORDS_FINDING = 6; // a 6+-word string that appears nowhere is an invented quotation
const QUOTE_WORDS_SPAN = 4;    // 4–5 words is checked too, but only as an advisory

/* THE COMMIT TITLE IS A SOURCE CLASS OF ITS OWN, AND ITS ABSENCE PROVES NOTHING.
 * Filed 2026-10-31 12:32 from item 27 of the 10-30 feed, which quotes five commit subjects —
 * "allocation-free listener callback for schedulable nodes (#148)" among them — read off a repo's
 * commit list. Every class the check read came back empty, so a true sentence was reported as an
 * invented one (`quote-not-found`, sev 3). `(#NNN)` inside a quotation is the tell, and the shape
 * is the same on GitLab and Gitea.
 *
 * Censused before designing (`--commit-quote-census` over **84 feeds / 3,160 items / 8,039 quoted
 * spans**): **6** spans end in a `(#N)` — **0.075%**, in **2 items** (10-04 item 3's System76
 * commit, 10-30 item 27's five). So the class is small and concentrated, which decided between the
 * two candidate designs rather than the anecdote doing it: the fetch is cheap and the suppression
 * would be permanent.
 *
 * The source is `commits.atom`, unmetered (no `api.github.com` call), and fetched only for an item
 * that still has an unmatched span of this shape — at most two requests, one per repo slug the item
 * names. It resolved **6 of 6** spans in the census, both filing cases included — verbatim, and with
 * a date (`2026-09-30T15:45:00Z` for System76's, a month before the check first misread it).
 *
 * THE GUARD IS THE HALF THAT MATTERS: that feed carries **20 entries**, the most recent commits on
 * the DEFAULT BRANCH. A PR merged before that window, or onto another branch, is absent from a feed
 * that simply cannot reach it. So the commit list is a POSITIVE source only — finding the title is
 * proof, not finding it is not (the "unread is not absent" rule, applied to a source whose coverage
 * limit is measured rather than assumed). An unmatched span of this shape therefore reports
 * `quote-unreadable-source` (severity 0) instead of a finding, and says how far back the feed reached.
 * Two live refutations of the naive reading, both from the census: a repo with 20 commits since
 * yesterday and one with 20 since a month ago read identically to this check. */
const COMMIT_QUOTE_RE = /\(#\d+\)\s*$/u;

/** Is this span a commit/PR subject? Tested on the RAW span (backticks and all) — `keyed
 *  \`ForEach\` with \`id:\` and per-row tracking (#149)` ends in the token even though the words
 *  before it are markup. */
const isCommitQuote = (raw) => COMMIT_QUOTE_RE.test(String(raw).trim());

/* A quotation lifted into a sentence takes THAT sentence's punctuation: the Model Spec's
 * "…do not yet fully reflect the Model Spec, but we are continually refining" is published as
 * "…do not yet fully reflect the Model Spec." and ten of eleven words are verbatim. Calibrated on
 * the 10-31 feed, where **8 of the first 13 findings** were exactly this — a period, comma or
 * colon where the source continues — and a ninth was a title's full stop rendered as a comma.
 * So PUNCTUATION IS NOT A WORD: the containment test runs on letters and digits only. What this
 * check owns is an invented SENTENCE (`interpreted correctly` for `read correctly`, or a sentence
 * that exists nowhere), not glyph drift, and a reader who fixes glyphs by hand is doing work the
 * checker cannot pay for. */
const quoteKey = (s) => s.replace(/['’`]/g, '').replace(/[^\p{L}\p{N}\s]/gu, ' ').replace(/\s+/g, ' ').trim();

/** Every “…” span, paired per LINE — see guard (a) — plus a BOUNDED JOIN for a wrapped quotation.
 * Measured 2026-10-31 over 31 October feeds (1,248 items): **310 of 2,371 quoted lines (13.1%)**
 * carry an odd number of straight quotes, and reading the samples shows what they are — not stray
 * marks but **hard-wrapped quotations**, a quote opened at the end of one source line and closed at
 * the start of the next ("…showing "known outdoor surveillance cameras and / license plate readers":
 * Flock Safety ALPRs…"). Skipping such a line whole therefore discarded BOTH halves, so 13% of the
 * feed's quoted lines were never judged at all — including, plausibly, wrapped fabrications.
 * So an odd line now OPENS A BLOCK that absorbs following lines until the count is even (at most
 * two continuations, 600 chars), and the block is paired as one line. Two limits keep the original
 * guard's protection: a line left odd with nothing following it is still `unpaired` and reported as
 * coverage, and a block that never balances is also unpaired rather than mined. */
function quoteSpans(text) {
  const out = [];
  const joined = []; // spans that only exist because a wrapped line was joined — reported, not hidden
  let unpaired = 0;
  const lines = text.split('\n');
  const pairsIn = (s) => {
    const at = [];
    for (let i = 0; i < s.length; i++) if (s[i] === '"') at.push(i);
    return at;
  };
  for (let li = 0; li < lines.length; li++) {
    const line = lines[li];
    if (/\]\(https?:\/\//.test(line)) continue; // a link line's quotes are labels, not prose
    const straight = pairsIn(line);
    if (straight.length % 2 === 0) {
      for (let k = 0; k < straight.length; k += 2) out.push(line.slice(straight[k] + 1, straight[k + 1]));
    } else if (straight.length) {
      // a wrapped quotation: absorb the next line(s) until the quote count balances
      let block = line;
      let used = 0;
      while (pairsIn(block).length % 2 === 1 && used < 2 && li + 1 < lines.length) {
        // a link line is labels, not prose — never absorb one into a quotation
        if (/\]\(https?:\/\//.test(lines[li + 1])) break;
        li += 1; used += 1;
        block = `${block} ${lines[li]}`;
        if (block.length > 600) break;
      }
      const at = pairsIn(block);
      if (at.length % 2 === 0) {
        if (used) for (let k = 0; k < at.length; k += 2) joined.push(block.slice(at[k] + 1, at[k + 1]));
        for (let k = 0; k < at.length; k += 2) out.push(block.slice(at[k] + 1, at[k + 1]));
      } else unpaired += 1;
    }
    for (const m of line.matchAll(/[“„«]([^”“»\n]{1,600})[”“»]/g)) out.push(m[1]);
  }
  return { spans: out.filter((s) => !/https?:\/\//.test(s)), unpaired, joined: joined.filter((s) => !/https?:\/\//.test(s)) };
}

/* One normalizer for BOTH sides. The page is a rendered HTML text or a raw README; the item is
 * Markdown. Whatever markup either carries is not a word, so it goes before the comparison. */
function normQuote(s) {
  return String(s)
    .replace(/<[^>]*>/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')   // a Markdown link is its label
    .replace(/[*`~]/g, '')                     // emphasis, code, strikethrough — `_` stays: snake_case is a word
    .replace(/[“”„«»]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[‐‑‒–—―]/g, '-')
    .replace(/&nbsp;|&#160;/g, ' ')
    .replace(/&quot;|&#34;/g, '"').replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}
const squeeze = (s) => s.replace(/\s+/g, '');

/** A verbatim source, normalized once: `norm` for display, `key` for the test, `tight` guard (c). */
function quoteSource(label, text) {
  const norm = normQuote(text);
  const key = quoteKey(norm);
  return { label, norm, key, tight: squeeze(key) };
}

function quoteFragFound(frag, src) {
  if (frag.key.length < 12) return false;
  return src.key.includes(frag.key) || src.tight.includes(squeeze(frag.key));
}

/** How much of an invented quotation the source DOES contain, and what it says next.
 * The unit is a WORD RUN, not a prefix: the 10-31 correction differs from the fabrication after
 * three words and then agrees for six more ("a compiler computed every one"), so a prefix reader
 * would report "3 of 13" about a sentence that is mostly right and point the author at the wrong
 * repair. The longest run present anywhere in the fragment is the useful hint. */
function quoteNearest(frag, sources) {
  const words = frag.key.split(' ');
  let best = { matched: 0, label: null, next: '', run: '' };
  for (const s of sources) {
    for (let i = 0; i < words.length - 1; i++) {
      for (let j = words.length; j > i + 1; j--) {
        const run = words.slice(i, j).join(' ');
        const at = s.key.indexOf(run);
        if (at < 0) continue;
        if (j - i > best.matched) {
          const next = s.key.slice(at + run.length).split(' ').slice(0, 12).join(' ').trim();
          best = { matched: j - i, label: s.label, next, run };
        }
        break; // the longest run starting here is the only one worth comparing
      }
    }
  }
  return { ...best, total: words.length };
}

/**
 * The check, as a pure function of the item and its sources so it can be calibrated without the
 * network. `sources` is already-normalized (see `quoteSource`).
 */
function checkQuotes(it, sources, ctx = {}) {
  const out = [];
  const { spans, unpaired, joined } = quoteSpans(it.text);
  const wrapped = new Set(joined ?? []);
  const claims = [];
  const wordsOf = (k) => k.split(' ').filter((w) => /[a-z\p{L}]{2,}/u.test(w)).length;
  for (const raw of spans) {
    const norm = normQuote(raw);
    const words = wordsOf(quoteKey(norm));
    if (words < QUOTE_WORDS_SPAN) continue;
    // an ellipsis is legitimate quotation practice — each fragment stands on its own
    const frags = norm.split(/\s*(?:…|\.\.\.)\s*/).map((s) => quoteKey(s))
      .filter((k) => wordsOf(k) >= 3).map((k) => ({ key: k, words: wordsOf(k) }));
    if (!frags.length) continue;
    claims.push({ norm, words, frags, wrapped: wrapped.has(raw), commit: isCommitQuote(raw) });
  }
  if (!claims.length) return out;
  if (!sources.length) {
    out.push({ check: 'quotation', item: it.n, verdict: 'quote-not-read', claim: `${claims.length} quotation(s)`, detail: `no cited page, README or record was readable this run — unread is not absent, so nothing is claimed about these quotation(s)${unpaired ? ` (${unpaired} line(s) had an unpaired quote and were skipped)` : ''}` });
    return out;
  }
  let ok = 0;
  const unreadable = [];
  for (const c of claims) {
    const missing = c.frags.filter((f) => !sources.some((s) => quoteFragFound(f, s)));
    if (!missing.length) { ok += 1; continue; }
    /* A commit title can only be REFUTED by a source that can reach the whole history, and none of
     * ours can: `commits.atom` holds 20 entries on the default branch, so "not on the commit list"
     * is a statement about the window, not about the repo. Report it as unread rather than absent —
     * the same call this check already makes for a 429 or a JS shell, for a source whose coverage
     * limit is now measured. The span's own `(#N)` is the tell (see COMMIT_QUOTE_RE). */
    if (c.commit) { unreadable.push(c); continue; }
    const frag = missing.reduce((a, b) => (b.key.length > a.key.length ? b : a));
    const heavy = frag.words;
    const near = quoteNearest(frag, sources);
    const where = `read ${sources.map((s) => s.label).join(', ')}`;
    const unread = ctx.unread ?? 0;
    const hint = near.matched >= 3
      ? `${near.label} carries ${near.matched} of ${near.total} words (“${near.run.slice(0, 70)}”) and continues “${near.next.slice(0, 110)}” — use the source's wording, or drop the quotation marks`
      : `no source carries it (${where}) — if this came from somewhere this item does not cite, cite it; otherwise it is the feed's own words and must not wear quotation marks`;
    /* A 4–5-word span is the one class whose severity has to be EARNED, because a short phrase can
     * fail to match for a dull reason (a page this item cites was a JS shell). Measured 2026-10-31
     * on the 10-30 feed's six advisories: **every one whose cited pages were all readable was a real
     * defect** (pico's "AI made it unnecessary", novelty-bench's "which idea is novel"), the one that
     * was a spelling normalisation was still a real difference, and the three whose source returned
     * **HTTP 429** (coindesk.com) were unread — so the class is precise and only its denominator was
     * contaminated. Hence `quote-paraphrase` (sev 2) when nothing was unread, `quote-short` (sev 1)
     * when something was: unread is not absent, and the severity is what says so. */
    const paraphrase = heavy < QUOTE_WORDS_FINDING && unread === 0 && (near.matched >= 3 || sources.length >= 2);
    /* A FABRICATION CLAIM NEEDS A COMPLETE DENOMINATOR — the same rule the 4–5-word class already
     * follows (guard (c) of the 10-31 calibration), now applied where it costs the most: a 6+-word
     * span found nowhere is `quote-not-found` (sev 3) only when **every cited page was read**.
     * With a page unread it is `quote-not-read` (sev 0), and the detail names which page and why,
     * because the sentence may be sitting on a wall — measured 2026-11-01, when one unread Drupal
     * advisory turned four correct quotations into sev-3 findings about this feed. */
    const walled = unread > 0;
    out.push({
      check: 'quotation', item: it.n,
      verdict: heavy < QUOTE_WORDS_FINDING
        ? (paraphrase ? 'quote-paraphrase' : 'quote-short')
        : (walled ? 'quote-not-read' : 'quote-not-found'),
      claim: `“${frag.key.slice(0, 96)}${frag.key.length > 96 ? '…' : ''}”`,
      detail: walled && heavy >= QUOTE_WORDS_FINDING
        ? `${heavy} words, 0 hits in ${sources.length} readable source(s), but ${unread} cited page(s) went unread${ctx.shells?.length ? ` (${ctx.shells.slice(0, 3).join(', ')} served a bot wall)` : ''} — unread is not absent, so this is not called a fabrication; open those page(s) before publishing${c.wrapped ? ', quotation spans a hard-wrapped line (recovered by the bounded join)' : ''}`
        : `${heavy} words, 0 hits in ${sources.length} readable source(s)${unread ? `, ${unread} cited page(s) unread` : ''}${c.wrapped ? ', quotation spans a hard-wrapped line (recovered by the bounded join)' : ''}; ${hint}`,
    });
  }
  if (unreadable.length) {
    const reach = ctx.commitReach ? `commit list read to ${ctx.commitReach}` : 'no commit list was readable';
    out.push({
      check: 'quotation', item: it.n, verdict: 'quote-unreadable-source',
      claim: `${unreadable.length} commit-title quotation(s)`,
      detail: `a commit subject is quoted (${unreadable.map((c) => `“${c.norm.slice(0, 48)}${c.norm.length > 48 ? '…' : ''}”`).join(', ')}) and ${reach} — the feed carries the most recent commits on the default branch only, so a title it does not carry is not thereby absent; cite the commit or PR URL`,
    });
  }
  if (ok) out.push({ check: 'quotation', item: it.n, verdict: 'ok', claim: `${ok} quotation(s)`, detail: `verbatim in ${sources.length} readable source(s)` });
  return out;
}

/* The KEV feed is unmetered and carries `vulnerabilityName` + `shortDescription` — the two fields
 * this feed most often quotes as "the catalog says". Fetched once per run, kept in memory only:
 * a 1.5 MB catalog has no business in a per-day cache file. */
let KEV_ROWS = null;
function kevFeed() {
  if (KEV_ROWS) return KEV_ROWS;
  KEV_ROWS = new Map();
  try {
    const raw = execFileSync('curl', ['-s', '--max-time', '40', 'https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json'], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
    for (const v of JSON.parse(raw).vulnerabilities ?? []) {
      KEV_ROWS.set(v.cveID, { name: v.vulnerabilityName, desc: v.shortDescription, added: v.dateAdded });
    }
  } catch { /* a catalog we could not read is not a claim about the item */ }
  return KEV_ROWS;
}

/* The only unmetered view of a repo's commit SUBJECTS. `api.github.com` would cost a call per item
 * for one sentence; this costs none, and it is the artifact the author actually read (a trending
 * page, a commit list, a PR title). Returns the concatenated titles as one text plus the reach of
 * the window, because the reach is the whole caveat: **20 entries, default branch only**. */
const COMMIT_LIST_CACHE = new Map();
async function commitList(slug) {
  if (COMMIT_LIST_CACHE.has(slug)) return COMMIT_LIST_CACHE.get(slug);
  const res = { text: '', entries: 0, oldest: null };
  try {
    const r = await fetch(`https://github.com/${slug}/commits.atom`, { signal: AbortSignal.timeout(20_000) });
    citedPages_requests += 1;
    if (r.ok) {
      const body = (await r.text()).slice(0, 500_000);
      const titles = [];
      const stamps = [];
      for (const m of body.matchAll(/<entry>([\s\S]*?)<\/entry>/g)) {
        const ti = /<title>([\s\S]*?)<\/title>/.exec(m[1]);
        if (ti) titles.push(ti[1].replace(/\s+/g, ' ').trim());
        const up = /<updated>([^<]+)<\/updated>/.exec(m[1]);
        if (up) stamps.push(up[1].trim());
      }
      res.text = titles.join('\n');
      res.entries = titles.length;
      // `updated` is newest-first in this feed, but sort rather than trust the order
      if (stamps.length) res.oldest = stamps.sort()[0];
    }
  } catch { /* a feed we could not read is not a claim about the item */ }
  COMMIT_LIST_CACHE.set(slug, res);
  return res;
}

async function checkQuote(it, nvd, cna) {
  if (!it.repos.length && !/https:\/\//.test(it.plain)) return [];
  const sources = [];
  // (1) the repo's own README / model card — where a project's words actually are
  for (const slug of it.repos.slice(0, 2)) {
    let rd = await readme(slug);
    if (!rd || !rd.text) rd = await hfCard(slug);
    if (rd && rd.text) sources.push(quoteSource(`${slug} README`, rd.text));
  }
  // (2) every page the item cites, HN threads included (guard for `CITED_SKIP` is elsewhere)
  // `unread` counts candidates that produced no text (a 429, a JS shell, a paywall) — the
  // denominator the advisory severity needs, so "not found" is never read as "not there".
  let unread = 0;
  const shells = [];
  for (const p of citedPages(it.plain, { hn: true, cap: 4 })) {
    const t = await citedPageText(p);
    /* A PAGE THAT ANSWERS IS NOT A PAGE THAT WAS READ. `drupal.org` serves a 3 KB, 226-char
     * "Client Challenge … JavaScript is disabled in your browser" every time a UA claims a browser
     * (measured 2026-11-01 on `sa-contrib-2026-254`, the one reference in `CVE-2026-118539`'s
     * record). It was counted as a readable source, so four quotations from that advisory came
     * back `quote-not-found` (sev 3) against an item whose only page carrying them was unread —
     * the exact "unread is not absent" failure this check exists to avoid, in the shape of a
     * finding. A wall is unfetched text, so it belongs in the unread denominator. */
    if (t.text && !isBlockShell(t.text)) sources.push(quoteSource(p.label, t.text));
    else { unread += 1; if (t.text) shells.push(p.label); }
  }
  // (3) the records — a field quotation is a claim about a field, not about a page
  const cves = it.cves ?? [];
  const kev = cves.length ? kevFeed() : new Map();
  for (const id of cves) {
    const rec = nvd.get(id);
    if (rec?.desc) sources.push(quoteSource(`${id} NVD description`, rec.desc));
    const c = cna.get(id);
    if (c?.desc) sources.push(quoteSource(`${id} CNA description`, c.desc));
    const k = kev.get(id);
    if (k) sources.push(quoteSource(`${id} KEV entry`, `${k.name} ${k.desc ?? ''}`));
  }
  let out = checkQuotes(it, sources, { unread, shells });
  /* (4) A REPOSITORY'S OWN DESCRIPTION IS NOT ITS README. Item 5 of the 10-31 feed quotes
   * "Skills for Real Engineers. Straight from my .agents directory." — which greps **0** times in
   * `mattpocock/skills`' README and is verbatim in the repo's `description` field ("… - mattpocock/
   * skills"). The trending page shows that line, so it is what an author lifts. Fetched only when
   * something is still unmatched, and from the repo's HTML (`github.com/<slug>`, unmetered) rather
   * than `api.github.com`, which is metered and would cost a call per item for one sentence. */
  if (out.some((f) => f.verdict === 'quote-not-found' || f.verdict === 'quote-short' || f.verdict === 'quote-paraphrase') && !NO_NET) {
    for (const slug of it.repos.slice(0, 2)) {
      const page = await citedPageText({ url: `https://github.com/${slug}`, label: `${slug} page`, raw: false });
      if (!page.text) continue;
      const more = quoteSource(`${slug} repo page`, page.text);
      const again = checkQuotes(it, sources.filter((s) => !s.label.startsWith(`${slug} `)).concat(more), { unread });
      const left = again.filter((f) => f.verdict === 'quote-not-found' || f.verdict === 'quote-short' || f.verdict === 'quote-paraphrase');
      if (left.length < out.filter((f) => f.verdict === 'quote-not-found' || f.verdict === 'quote-short' || f.verdict === 'quote-paraphrase').length) {
        sources.push(more);
        out = again;
      }
    }
  }
  /* (5) THE COMMIT LIST — a commit subject lives in no README, release page or article, so it is the
   * one class this check can CONFIRM but never refute. One unmetered request per affected item; the
   * second run decides, and an item whose titles are all in the window goes from a false sev-3
   * finding to `ok` (the census's 6 of 6 resolved this way, both filing cases included). */
  if (out.some((f) => f.verdict === 'quote-unreadable-source') && !NO_NET) {
    let entries = 0;
    let oldest = null;
    for (const slug of it.repos.slice(0, 2)) {
      const cl = await commitList(slug);
      if (!cl.text) continue;
      sources.push(quoteSource(`${slug} commit list`, cl.text));
      if (cl.entries > entries) entries = cl.entries;
      if (cl.oldest && (!oldest || cl.oldest < oldest)) oldest = cl.oldest;
    }
    if (entries) {
      out = checkQuotes(it, sources, { unread, commitReach: `to ${oldest ?? 'an unknown date'} (${entries} entries)` });
    }
  }
  return out;
}

// ── `--quotation-census`: measure the check's own blind spots ───────────────────────────────
/* Filed 2026-10-31 04:32 as the residue of building check H. Three coverage gaps, each countable
 * and none counted:
 *   (a) ODD LINES — a line whose straight quotes cannot be paired is skipped WHOLE, so a line
 *       carrying one good quotation and one stray mark loses both. The size of that loss was
 *       never measured.
 *   (b) THE PAGE CAP — `checkQuote` opens at most **4** cited pages per item, so a five-link
 *       item's fifth page is unread and a verbatim quotation from it comes back `quote-not-found`
 *       against a source the check never opened: the "unread is not absent" failure it otherwise
 *       avoids, in the shape of a finding rather than a silence.
 *   (c) THE 4–5-WORD ADVISORY CLASS — `quote-short` is sev 1, and on its filing batch 3 of 5
 *       were real paraphrases, so the rate decides whether the verdict belongs at sev 2.
 * Local-only: every number here is computed from feed text already on disk.
 */
if (has('quotation-census')) {
  const QC_PATHS = paths.length ? paths : globSync('en/feed/2026-*.md').sort();
  const QC_CAP = 4; // must match the `cap: 4` in checkQuote
  const wordsOf = (k) => k.split(' ').filter((w) => /[a-z\p{L}]{2,}/u.test(w)).length;
  const rows = [];
  const tot = {
    items: 0, itemsWithQuotes: 0, spans: 0, spans6: 0, before6: 0, unpairedBlocks: 0,
    quoteLines: 0, oddLines: 0, oddJoined: 0, oddSpans6Recovered: 0, oddExamples: [],
    overCapItems: 0, droppedPages: 0, droppedRank0: 0, overCapWithQuote: 0, maxCandidates: 0, capExamples: [],
  };
  /* The PRE-JOIN reader, kept so the census can report what the bounded join changed rather than
   * asserting it helped: pair per line, skip a line whose quotes do not balance. */
  const lineOnlySpans = (text) => {
    const out = [];
    for (const line of text.split('\n')) {
      if (/\]\(https?:\/\//.test(line)) continue;
      const at = [...line.matchAll(/"/g)].map((m) => m.index);
      if (at.length % 2 === 0) for (let k = 0; k < at.length; k += 2) out.push(line.slice(at[k] + 1, at[k + 1]));
      for (const m of line.matchAll(/[“„«]([^”“»\n]{1,600})[”“»]/g)) out.push(m[1]);
    }
    return out.filter((s) => !/https?:\/\//.test(s));
  };
  for (const p of QC_PATHS) {
    const items = parseItems(readFileSync(p, 'utf8'));
    const r = { file: basename(p), items: items.length, spans: 0, spans6: 0, before6: 0, oddLines: 0, unpairedBlocks: 0, recovered: 0, overCap: 0, dropped: 0, droppedRank0: 0, overCapWithQuote: 0 };
    for (const it of items) {
      tot.items += 1;
      const { spans, unpaired } = quoteSpans(it.text);
      const big = spans.filter((s) => wordsOf(quoteKey(normQuote(s))) >= QUOTE_WORDS_FINDING);
      const before = lineOnlySpans(it.text).filter((s) => wordsOf(quoteKey(normQuote(s))) >= QUOTE_WORDS_FINDING).length;
      r.spans += spans.length; tot.spans += spans.length;
      r.spans6 += big.length; tot.spans6 += big.length;
      r.before6 += before; tot.before6 += before;
      tot.unpairedBlocks += unpaired; r.unpairedBlocks += unpaired;
      if (spans.length) tot.itemsWithQuotes += 1;
      // (a) odd lines: the population the pre-join reader skipped, and how much of it balances now
      for (const line of it.text.split('\n')) {
        if (!line.includes('"') || /\]\(https?:\/\//.test(line)) continue;
        tot.quoteLines += 1;
        if ((line.match(/"/g) ?? []).length % 2 === 0) continue;
        tot.oddLines += 1; r.oddLines += 1;
      }
      // (b) the cap: how many candidates does a 4-page slice drop, and are they the good ones?
      const all = citedPages(it.plain, { hn: true, cap: 99 });
      const kept = all.slice(0, QC_CAP);
      const dropped = all.slice(QC_CAP);
      if (all.length > tot.maxCandidates) { tot.maxCandidates = all.length; tot.maxExample = `${basename(p)} #${it.n} (${all.length})`; }
      if (dropped.length) {
        tot.overCapItems += 1; r.overCap += 1;
        tot.droppedPages += dropped.length; r.dropped += dropped.length;
        if (big.length) { tot.overCapWithQuote += 1; r.overCapWithQuote += 1; }
        // `rank 0` is the class the ranking deliberately puts FIRST — a raw Markdown twin, an
        // arXiv abstract, an HF card — so a cap that drops rank 1 while keeping rank 0 is fine,
        // and one that drops rank 0 is dropping the cheapest primary in the item.
        const rank0 = dropped.filter((k) => /^arXiv /.test(k.label) || /^HF (model|dataset) /.test(k.label) || /\.(md|json|txt|rst)$/i.test(k.label));
        tot.droppedRank0 += rank0.length; r.droppedRank0 += rank0.length;
        tot.capExamples.push(`${basename(p)} #${it.n}: kept ${kept.map((k) => k.label).join(', ')} | DROPPED ${dropped.map((k) => k.label).join(', ')}${big.length ? `  ← ${big.length} 6+-word quotation(s)` : ''}`);
      }
    }
    rows.push(r);
  }
  console.log(`QUOTATION CENSUS — ${tot.items} item(s) over ${rows.length} file(s)\n`);
  console.log(`(a) ODD LINES — quoted lines ${tot.quoteLines}, odd ${tot.oddLines} (${((tot.oddLines / Math.max(1, tot.quoteLines)) * 100).toFixed(1)}% of quoted lines), blocks that never balanced ${tot.unpairedBlocks}`);
  console.log(`    ≥${QUOTE_WORDS_FINDING}-word spans judged BEFORE the join ${tot.before6} → AFTER ${tot.spans6} (+${tot.spans6 - tot.before6}, ${(((tot.spans6 - tot.before6) / Math.max(1, tot.before6)) * 100).toFixed(1)}% more)`);
  console.log(`(b) PAGE CAP ${QC_CAP} — items over the cap ${tot.overCapItems} (${((tot.overCapItems / Math.max(1, tot.items)) * 100).toFixed(1)}%), pages dropped ${tot.droppedPages}, rank-0 dropped ${tot.droppedRank0}`);
  console.log(`    items that BOTH drop a page and carry a ≥${QUOTE_WORDS_FINDING}-word quotation: ${tot.overCapWithQuote}  ← the population that can yield a false quote-not-found`);
  console.log(`    max candidates in one item: ${tot.maxCandidates}${tot.maxExample ? ` (${tot.maxExample})` : ''}`);
  for (const e of tot.capExamples.slice(0, 12)) console.log(`      ${e}`);
  // (c) the advisories already recorded, from the batch files the pipeline wrote
  const qFiles = globSync('agent/data/claim-unit-*.json').sort();
  const tallies = { 'quote-not-found': 0, 'quote-short': 0, 'quote-not-read': 0, ok: 0 };
  const qRows = [];
  for (const qf of qFiles) {
    let j; try { j = JSON.parse(readFileSync(qf, 'utf8')); } catch { continue; }
    const f = (j.files ?? []).flatMap((x) => x.findings ?? []).filter((x) => x.check === 'quotation');
    const c = { file: basename(qf), 'quote-not-found': 0, 'quote-short': 0, 'quote-not-read': 0, ok: 0 };
    for (const x of f) if (x.verdict in c) { c[x.verdict] += 1; tallies[x.verdict] += 1; }
    if (f.length) qRows.push(c);
  }
  const twoWay = tallies['quote-not-found'] + tallies['quote-short'];
  console.log(`\n(c) THE ADVISORY CLASS — over ${qRows.length} batch file(s): quote-not-found ${tallies['quote-not-found']}, quote-short ${tallies['quote-short']} (${((tallies['quote-short'] / Math.max(1, twoWay)) * 100).toFixed(0)}% of both), ok ${tallies.ok}`);
  for (const c of qRows) if (c['quote-short'] || c['quote-not-found']) console.log(`      ${c.file}: ${c['quote-not-found']} not-found · ${c['quote-short']} short`);
  console.log('\n  per file: ' + rows.map((r) => `${r.file.replace('.md', '')} ${r.spans} spans/${r.spans6} big`).join(' · '));
  process.exit(0);
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

// ── `--commit-quote-census`: is the commit-title class big enough to deserve a source? ──────
/* Filed 2026-10-31 12:32 with the design undecided between (a) a third source class and (b) a
 * suppression verdict. The census decided it, and not by argument: scan every quoted span in the
 * corpus for a `(#N)` tail, then (with `--net`) try to resolve each against `commits.atom` — which
 * is (a)'s entire case. If the unmetered feed carries them, one request beats a permanent silence.
 * Prints the count either way, so the prevalence below is re-measurable rather than remembered. */
if (has('commit-quote-census')) {
  const CQ_PATHS = paths.length ? paths : globSync('en/feed/2026-*.md').sort();
  const rows = [];
  const tot = { items: 0, spans: 0, pr: 0, itemsWithPr: 0 };
  for (const p of CQ_PATHS) {
    const items = parseItems(readFileSync(p, 'utf8'));
    const r = { file: basename(p), items: items.length, spans: 0, pr: 0, hits: [] };
    for (const it of items) {
      tot.items += 1;
      const { spans } = quoteSpans(it.text);
      r.spans += spans.length; tot.spans += spans.length;
      for (const s of spans) if (isCommitQuote(s)) { r.pr += 1; tot.pr += 1; r.hits.push({ it: it.n, span: s.trim(), repos: it.repos.slice(0, 2) }); }
    }
    if (r.pr) tot.itemsWithPr += 1;
    rows.push(r);
  }
  console.log(`commit-title quotations over ${rows.length} file(s) / ${tot.items} item(s): ${tot.pr} span(s) in ${tot.itemsWithPr} item(s) = ${((tot.pr / Math.max(1, tot.spans)) * 100).toFixed(3)}% of ${tot.spans} quoted spans`);
  for (const r of rows) if (r.pr) for (const h of r.hits) console.log(`  ${r.file} #${h.it}  ${h.span.slice(0, 96)}   [${h.repos.join(', ') || 'no repo slug'}]`);
  if (has('net')) {
    // the decisive question for design (a): does the unmetered commit list actually carry them?
    const bySlug = new Map();
    let resolved = 0, tried = 0;
    for (const r of rows) for (const h of r.hits) {
      let found = null;
      for (const slug of h.repos) {
        if (!bySlug.has(slug)) bySlug.set(slug, await commitList(slug));
        const cl = bySlug.get(slug);
        if (!cl.text) continue;
        const src = quoteSource(`${slug} commit list`, cl.text);
        const key = quoteKey(normQuote(h.span));
        if (quoteFragFound({ key, tight: squeeze(key) }, src)) { found = { slug, ...cl }; break; }
      }
      tried += 1;
      if (found) resolved += 1;
      console.log(`  ${found ? 'RESOLVED    ' : 'NOT ON LIST '} ${h.span.slice(0, 72)}${found ? `  ← ${found.slug} (${found.entries} entries, oldest ${found.oldest})` : ''}`);
    }
    console.log(`\n  resolved ${resolved}/${tried} from commits.atom — and an unresolved one is NOT absent: the feed holds 20 entries on the default branch only`);
  }
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
  t('bare issue count in a repo item still fires', checkIssues({ ...mk('t', 'it has 3,286 issues'), repos: ['a/b'] }).map((x) => x.verdict), ['unsplit-issue-count']);
  // 2026-11-03 filing case: the counter's own noun, number-first, hyphenated — invisible to the
  // pattern above, and it shipped as "**9** open-issue count" for a counter that was 4 issues + PRs.
  t('counter noun fires', checkIssues(mk('t', 'The repo has a **9** open-issue count against 9,759 forks')).map((x) => x.verdict), ['unsplit-issue-count']);
  t('counter noun with a split named is compliant', checkIssues(mk('t', 'an open-issue count of 8 that splits into 4 issues and 4 PRs')).map((x) => x.verdict), ['ok']);
  t('open issues fires even after a review verb', checkIssues(mk('t', 'found **3,286 open issues** on the board')).map((x) => x.verdict), ['unsplit-issue-count']);

  /* 2026-11-02 04:31 — the publish-date check, filed by my own error in that batch's item 18: a
     UTC+8 host read cveawg's 2026-10-31T17:25:56Z as "2026-11-01". */
  const subj = (o) => new Map(Object.entries(o).map(([k, v]) => [k, { status: 'Received', published: v }]));
  const dchk = (text, o) => checkDate(mk('t', text), subj(o)).map((x) => x.verdict);
  t('date: the UTC day matches', dchk('CVE-2026-120209 published 2026-10-31.', { 'CVE-2026-120209': '2026-10-31T17:25:56.000' }), ['ok']);
  t('date: the local day of the same instant is a shift', dchk('CVE-2026-120209 published 2026-11-01.', { 'CVE-2026-120209': '2026-10-31T17:25:56.000' }), ['date-local-shift']);
  t('date: a day matching neither clock is a mismatch', dchk('CVE-2026-120209 published 2026-09-04.', { 'CVE-2026-120209': '2026-10-31T17:25:56.000' }), ['date-mismatch']);
  t('date: no record is silence, not equality', dchk('CVE-2026-120209 published 2026-11-01.', {}), []);
  t('date: a fix date is a different clock', dchk('CVE-2026-120209 fixed 2026-09-15 and reserved 2026-10-31.', { 'CVE-2026-120209': '2026-10-31T17:25:56.000' }), []);
  t('date: a multi-CVE Source line binds only on unanimity',
    dchk('Three records published 2026-11-01.', { 'CVE-2026-120307': '2026-11-01T09:00:00.000', 'CVE-2026-120308': '2026-10-20T09:00:00.000' }), []);
  t('date: unanimously-same records make the line checkable',
    dchk('CVE-2026-120307 and CVE-2026-120308 published 2026-11-01.', { 'CVE-2026-120307': '2026-11-01T09:00:00.000', 'CVE-2026-120308': '2026-11-01T10:00:00.000' }), ['ok']);
  /* 2026-11-02 04:43 — the affected-span check, filed from the MINA calibration (11-01 feed):
     "Affected is `3.0.0` through `3.0.0-M2`" is a faithful quotation of a record whose own bounds
     contain nothing, which is exactly why a fact-check of the quotation passes and the span is
     still vacuous. */
  const rng = (text, ranges, id = 'CVE-2026-118636') =>
    checkRange(mk('t', text), new Map(), new Map([[id, { ranges }]])).map((x) => x.verdict);
  const R = (o) => ({ min: null, minInc: true, max: null, maxInc: true, versionType: null, source: 'cna-affected', ...o });
  t('range: the prerelease sorts BEFORE its release, so the MINA span is empty',
    cmpVer('3.0.0-M2', '3.0.0'), -1);
  t('range: a faithful quotation of an empty span is a finding',
    rng('`CVE-2026-118636`: Affected is `3.0.0` through **`3.0.0-M2`**.', [R({ min: '3.0.0', max: '3.0.0-M2' })]),
    ['span-empty']);
  t('range: a point written as an exclusive range is empty (Chrome house style)',
    rng('CVE-2026-118636 is affected from 1.2.3 through 1.2.3.', [R({ min: '1.2.3', max: '1.2.3', maxInc: false })]),
    ['span-empty']);
  // …but the same pair through an INCLUSIVE bound is one version, not an empty set
  t('range: equal bounds under an inclusive end are a point, not an empty span',
    rng('CVE-2026-118636 covers 1.2.3 through 1.2.3 exactly.', [R({ min: '1.2.3', max: '1.2.3' })]), ['ok-span']);
  t('range: a normal span verifies rather than passing silently',
    rng('CVE-2026-118636 affects 0.14.0 through 0.20.2.', [R({ min: '0.14.0', max: '0.20.3', maxInc: false })]), []);
  t('range: a span matching the record end to end is verified',
    rng('CVE-2026-118636 affects 0.14.0 through 0.20.3.', [R({ min: '0.14.0', max: '0.20.3', maxInc: false })]), ['ok-span']);
  // the item's OWN inversion still has to be anchored, or every measurement pair fires
  t('range: an inverted span the item wrote is a finding',
    rng('CVE-2026-118636 affects 2.0.0 through 1.0.0 here.', [R({ min: '1.0.0', max: '2.0.0' })]), ['span-inverted']);
  t('range: a measurement pair is not a version span',
    rng('CVE-2026-118636 detection went from 41.39% to 56.97.', [R({ min: '1.0.0', max: '2.0.0' })]), []);
  t('range: a descending measurement against one anchored endpoint is still not a span',
    rng('CVE-2026-118636 scored 0.96 to 0.86 on the same set.', [R({ min: '0.96', max: '1.4' })]), []);
  t('range: a git range has no arithmetic — the version span is unverifiable against it',
    rng('CVE-2026-118636 affects 1.0.0 through 2.0.0.', [R({ min: '1f4c0de9b2a7', max: '99aa11bb22cc', versionType: 'git' })]), ['span-unverifiable']);
  t('range: a mixed record with a real CPE range is not called unverifiable',
    rng('CVE-2026-118636 affects 1.0.0 through 2.0.0.', [R({ min: '1f4c0de9b2a7', max: '99aa11bb22cc', versionType: 'git' }), R({ min: '1.0.0', max: '3.0.0', source: 'nvd-cpe' })]), []);
  t('range: a null minimum is unbounded, never empty',
    spanState(R({ min: '0', max: '1.7.1' })), 'unbounded');
  t('range: no record range is silence, not a pass',
    rng('CVE-2026-118636 affects 1.0.0 through 2.0.0.', []), []);

  /* 2026-11-05 12:34 — the dashed-range check, filed by the Kyverno cohort it fired on. Both arms
     are pinned on the filing case's own wording: the pre-correction Source line, and the corrected
     sentence that names the hole. */
  const ir = (text) => checkIdRange(mk('t', text)).map((x) => x.verdict);
  t('idrange: 21 records across a 22-id span is a mismatch',
    ir('NVD · records CVE-2026-122302 – CVE-2026-122323 published today. Twenty-one Kyverno records landed.'),
    ['cve-range-span-mismatch']);
  t('idrange: the corrected sentence discloses the hole, and is printed not dropped',
    ir('The IDs are a set, not a range: the span CVE-2026-122302–CVE-2026-122323 holds 22 values and CVE-2026-122317 carries no record at NVD at all, so 21 records sit inside a 22-ID span with one hole.'),
    ['cve-range-disclosed']);
  t('idrange: a span whose stated count matches is verified',
    ir('21 records CVE-2026-122302 – CVE-2026-122322 landed in one batch.'), ['ok-range']);
  t('idrange: two years have no arithmetic',
    ir('The block runs CVE-2025-66365 – CVE-2026-122323 and the item says 30 records.'), ['range-cross-year']);
  t('idrange: an inverted span is a finding on its own terms',
    ir('CVE-2026-122323 – CVE-2026-122302 with 5 records.'), ['range-inverted']);
  t('idrange: a count with no record noun is not a count of records',
    ir('CVE-2026-122302 – CVE-2026-122323. Seven score at or above 9.0.'), []);
  t('idrange: no stated count is silence, not a pass',
    ir('CVE-2026-122302 – CVE-2026-122323.'), []);
  t('idrange: a word-number count reads the same as digits',
    ir('Twenty-one records CVE-2026-122302 – CVE-2026-122323.'), ['cve-range-span-mismatch']);
  t('idrange: two stated counts for one range is ambiguous, not a finding',
    ir('CVE-2026-122302 – CVE-2026-122323: 21 records in the block but 22 records expected later.'),
    ['range-ambiguous']);

  /* 2026-11-02 04:43 — the 33-feed census found **10 of 11 `date` findings were the checker's**, and
     all ten were a publish cue about an ARTIFACT. Each suppressor below is one of them. */
  t('date: an ISO instant is a date — the `\\b` after the day made it invisible',
    dchk('CVE-2026-118598 Source: cveawg · published 2026-10-31T09:29Z · reserved 2026-10-28.', { 'CVE-2026-118598': '2026-10-31T10:16:37.923' }), ['ok']);
  t('date: a Source line naming the registry keeps its date',
    dchk('CVE-2026-115931 - **Source:** CVE Program (cveawg) / Postiz advisories · published 2026-10-24.', { 'CVE-2026-115931': '2026-10-23T23:17:43.263' }), ['date-local-shift']);
  t('date: a Source line naming a newsroom publishes the ARTICLE, not the record',
    dchk('CVE-2025-61624 - **Source:** Unit 42 · published 2026-10-14.', { 'CVE-2025-61624': '2026-04-14T16:16:31.300' }), []);
  t('date: a version before the cue is a RELEASE date',
    dchk('CVE-2026-114106 was fixed in v0.1.7, published 2026-05-06.', { 'CVE-2026-114106': '2026-10-21T01:17:36.820' }), []);
  t('date: "<version> was published on" is a release, not a record',
    dchk('CVE-2026-116145 7.1.2-33 was published on 2026-10-10.', { 'CVE-2026-116145': '2026-10-25T14:16:52.543' }), []);
  t('date: "published the <thing>" is an author'+"'"+'s output',
    dchk('CVE-2026-98432 Behrouz published the Sleep framework on 2026-10-27.', { 'CVE-2026-98432': '2026-10-15T13:17:13.987' }), []);
  t('date: "published by <party> on" is the party'+"'"+'s date',
    dchk('CVE-2026-61991 it was reported in September, published by Patchstack on 2026-10-13.', { 'CVE-2026-61991': '2026-10-29T16:18:11.463' }), []);
  /* Two clocks (11-02 census): cveawg's `datePublished` and NVD's `published` are hours apart, and
     the gap crosses midnight on real records — the false positive this rule removes. */
  const dchk2 = (text, sub, cn) => checkDate(mk('t', text), subj(sub), new Map(Object.entries(cn))).map((x) => x.verdict);
  t('date: a claim matching the OTHER registry clock is verified, not a mismatch',
    dchk2('CVE-2026-117656 published 2026-10-30.',
      { 'CVE-2026-117656': '2026-10-31T00:16:51.340' }, { 'CVE-2026-117656': { published: '2026-10-30T23:55:23.426Z' } }), ['ok']);
  t('date: a day matching neither clock is still a mismatch',
    dchk2('CVE-2026-117656 published 2026-10-29.',
      { 'CVE-2026-117656': '2026-10-31T00:16:51.340' }, { 'CVE-2026-117656': { published: '2026-10-30T23:55:23.426Z' } }), ['date-mismatch']);

  t('date: a record cue right after the artefact noun still compares',
    dchk('CVE-2026-61738 CVE published 2026-10-30T14:36Z on the advisory line.', { 'CVE-2026-61738': '2026-10-30T15:16:53.507' }), ['ok']);

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
  /* 2026-11-05 item 5: a sentence asserting a name does not exist is CONFIRMED by a 404 — the
     finding said "unreadable" at sev 1 because the sentence was never read. Both sides pinned. */
  t('a sentence asserting absence is recognised',
    ABSENT_ASSERTED.test(sentenceWith('It ships computer use. There is no `tencent/Hy4` and no GA system card in the org listing.', 'tencent/Hy4')), true);
  t('a sentence about a live repo is not an absence claim',
    ABSENT_ASSERTED.test(sentenceWith('The release is `tencent/Hy4` and it is on the Hub.', 'tencent/Hy4')), false);
  /* the sibling-prefix trap: "tencent/Hy4-preview" must not answer for "tencent/Hy4" */
  t('a slug does not bind to its longer sibling sentence',
    ABSENT_ASSERTED.test(sentenceWith('The preview is tencent/Hy4-preview and it is Apache-2.0. There is no tencent/Hy4 and no GA card.', 'tencent/Hy4')), true);
  t('and the sibling sentence alone is still not an absence claim',
    ABSENT_ASSERTED.test(sentenceWith('The preview is tencent/Hy4-preview and it is Apache-2.0.', 'tencent/Hy4')), false);
  t('real repo slug survives', slugs('`obra/superpowers` and `zip-rs/zip2`'), ['obra/superpowers', 'zip-rs/zip2']);
  // a dated star quote is a surge signal, not a stale number (2026-10-28 item 5: 56 → 114)
  t('dated quote detected', DATED_QUOTE.test('at the time of writing holds 56 stars and one commit'), true);
  // 2026-10-30 item 15: the item already quoted the second reading, and the advice said to add it
  t('a later reading in the same sentence is recognised',
    laterReading('At 1,239 stars as of 04:25 UTC (1,477 by 12:30 UTC), 63 open issues and 9 PRs', 1239), 1477);
  t('an unrelated larger number is not a later reading',
    laterReading('At 1,239 stars as of 04:25 UTC, using 2,011 MB of memory', 1239), null);
  t('undated quote is not dated', DATED_QUOTE.test('the repo holds 56 stars and one commit'), false);
  /* 2026-11-01 12:39 — the two sev-2 false findings from the 12:23 batch, one line each. A rising
     count is the trend, not an error; a count above the repo's own is the error. */
  const sv = (o) => (starVerdict({ slug: 'a/b', ...o }) ?? {}).verdict ?? null;
  t('under-count on a young repo is a surge, not a drift', sv({ quoted: 6, now: 25, recAgeDays: 1 }), 'star-surge');
  t('under-count on an old repo is a surge too', sv({ quoted: 3979, now: 4547, recAgeDays: 254 }), 'star-surge');
  t('a dated under-count stays the trend reading', sv({ quoted: 56, now: 114, recAgeDays: 3, dated: true }), 'star-dated');
  t('over-count is still a drift in either window', sv({ quoted: 4547, now: 3979, recAgeDays: 254 }), 'star-drift');
  t('over-count on a young repo is still a drift', sv({ quoted: 25, now: 6, recAgeDays: 1 }), 'star-drift');
  t('a small absolute gap is not a finding', sv({ quoted: 6, now: 8, recAgeDays: 1 }), null);
  t('within tolerance is not a finding', sv({ quoted: 1000, now: 1080, recAgeDays: 200 }), null);
  t('the launch window is named in the detail',
    /launch window/.test((starVerdict({ slug: 'a/b', quoted: 6, now: 25, recAgeDays: 1 }) ?? {}).detail ?? ''), true);
  t('age claim detected', AGE_CLAIM.test('a six-day-old project with 9,479 commits'), true);
  t('version number is not an age claim', AGE_CLAIM.test('released 1.4.0 with 12 days of work'), false);
  /* 2026-11-03 12:37 — a repo the item itself calls stale is not an unchecked number. Item 2
     (`mpdavis/python-jose`, 203d, 1,759★) returned sev-2 `stale` against a sentence that names
     both clocks and a tag that names the state. */
  const sd = (plain, day = '2026-04-14') => staleDisclosure(plain, `${day}T00:39:48Z`);
  t('the item names the pushed day beside a push/release noun',
    /last-push day \(2026-04-14\)/.test(sd('The repo sits at 1,759 stars, its last push was 2026-04-14, and PyPI is still 3.5.0.') ?? ''), true);
  t('a state word the author chose is disclosure',
    /unmaintained/.test(sd('A dependency nobody maintains any more; unmaintained since 2025.', '2099-01-01') ?? ''), true);
  t('a bare date is not disclosure', sd('CVE-2026-120459 was published 2026-04-14 by another CNA.', '2026-04-14'), null);
  t('an unrelated item saying nothing is not disclosure', sd('A fast JSON library with 1,759 stars.'), null);
  t('the same date in another sentence does not reach the claim', sd('2026-04-14: a different repo shipped. This one has 1,759 stars.', '2026-04-14'), null);
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
  /* The `temporal` check's disclosure guard (added 2026-11-02 20:29): it fires on the RECORD's
     shape, so it would fire on every correct item that names the stop. Item 35 is the case. */
  const tmpCna = new Map([['CVE-2026-555555', { assigner: 'cna@vuldb.com', metrics: [
    { version: '3.1', score: 9.9, field: 'containers.cna.metrics.cvssV3_1.baseScore', vector: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:C/C:H/I:H/A:H/E:P' }] }]]);
  const tmpNvd = new Map([['CVE-2026-555555', { metrics: [{ version: '3.1', score: 9.9, source: 'cna@vuldb.com' }] }]]);
  const tmp = (body) => checkTemporal(mk('t', body), tmpCna, tmpNvd).map((x) => x.verdict);
  t('temporal: a score with no stop named is the advisory',
    tmp('CVE-2026-555555 is 9.9 on CVSS 3.1.'), ['temporal-stopping-point']);
  t('temporal: naming the stop suppresses it, and the suppression is printed',
    tmp('CVE-2026-555555 is 9.9 on CVSS 3.1 — the base score, with `E:P` taking the full temporal value to 9.4.'),
    ['temporal-disclosed']);
  t('temporal: quoting two of the vector\'s own numbers is disclosure',
    tmp('CVE-2026-555555 reads 9.9 in the container beside 9.4 once exploit maturity is applied.'),
    ['temporal-disclosed']);
  t('temporal: a second record\'s numbers do not disclose this one',
    checkTemporal(mk('t', 'CVE-2026-555555 is 9.9. Separately, CVE-2026-666666 reads 9.4 and 8.3.'),
      tmpCna, tmpNvd).filter((x) => x.claim.startsWith('CVE-2026-555555')).map((x) => x.verdict),
    ['temporal-stopping-point']);

  // vulnStatus — the field NVD moves on its own (built 2026-10-30 after the `Analyzed` → `Undergoing
  // Analysis` regression). A status is a queue position, so the check compares prose to the record.
  const st = (body, status = 'Undergoing Analysis') => checkStatus(mk('t', body),
    new Map([['CVE-2026-97229', { status, modified: '2026-10-29T20:17:37.000' }]])).map((x) => x.verdict);
  t('status: the 10-30 defect — prose says Analyzed, the record went back',
    st('NVD marked the record `Analyzed` for CVE-2026-97229.'), ['status-stale']);
  t('status: matching the record is verified, with its own stamp',
    checkStatus(mk('t', 'NVD holds CVE-2026-97229 at `Undergoing Analysis`.'),
      new Map([['CVE-2026-97229', { status: 'Undergoing Analysis', modified: '2026-10-29T20:17:37.000' }]]))
      .map((x) => x.detail), ['Undergoing Analysis (lastModified 2026-10-29T20:17:37.000)']);
  t('status: a transition with an arrow claims the status AFTER it',
    st('CVE-2026-97229 went `Analyzed` → `Undergoing Analysis`, so the endorsement case does not apply.'), ['ok']);
  t('status: two statuses and no direction is not a claim',
    st('CVE-2026-97229 is `Deferred`, unlike the other three which are `Analyzed`.'), []);
  t('status: a self-dated disagreement is the trend, not an error',
    st('CVE-2026-97229 was `Analyzed` when I checked it on 10-29.'), ['status-dated']);
  t('status: the lowercase English verb is not a status',
    statusMentions('We Analyzed 40 samples of the binary.').length, 0);
  t('status: a capitalized status with no registry word near it is not a claim',
    statusMentions('Analyzed results are in the appendix.').length, 0);
  t('status: a claim with no CVE cannot be checked',
    checkStatus(mk('t', 'NVD marked the record `Analyzed`.'), new Map()).map((x) => x.verdict), ['status-no-cve']);

  // weakness field — "states no CWE" is a claim about TWO fields (built 2026-10-30 from item 36,
  // where I published that sentence about a record whose CNA container said CWE-190)
  const cw = (body, nvdCwe = ['CWE-190'], cnaCwe = [{ value: 'CWE-190', origin: 'cna' }], rec = true) =>
    checkCwe(mk('t', body),
      new Map([['CVE-2026-116366', { status: 'Received', metrics: [], cwe: nvdCwe.map((v) => ({ value: v, source: 'cna' })) }]]),
      new Map(rec ? [['CVE-2026-116366', { state: 'PUBLISHED', assigner: 'ClickHouse', metrics: [], cwe: cnaCwe }]] : [])).map((x) => x.verdict);
  t('cwe: the 10-30 defect — "the CNA container states no CWE" on a record that has one',
    cw('CVE-2026-116366 is a 9.5. The CNA container states no CWE.'), ['cwe-absent-but-recorded']);
  t('cwe: naming the field that was read is still the claim, so it still fires',
    cw('CVE-2026-116366. NVD weaknesses[] carries no CWE.'), ['cwe-absent-but-recorded']);
  t('cwe: the corrected sentence is verified and says which field holds it',
    checkCwe(mk('t', 'CVE-2026-116366. The CNA container carries CWE-190.'), new Map([['CVE-2026-116366', { cwe: [] }]]),
      new Map([['CVE-2026-116366', { cwe: [{ value: 'CWE-190', origin: 'cna' }] }]])).map((x) => x.detail),
    ['stated in cna problemTypes']);
  t('cwe: a quoted or attributed absence is a correction, not the mistake',
    cw('CVE-2026-116366. A reader that parses the field reports "no CWE" here.'), []);
  t('cwe: NVD-CWE-noinfo is "nothing here", not a weakness',
    checkCwe(mk('t', 'CVE-2026-116366. The CNA container states no CWE.'), new Map([['CVE-2026-116366', { cwe: [{ value: 'NVD-CWE-noinfo', source: 'nvd@nist.gov' }] }]]),
      new Map([['CVE-2026-116366', { cwe: [] }]])).map((x) => x.verdict), ['ok']);
  t('cwe: a disjoint stated id is a mismatch',
    cw('CVE-2026-116366 is classified as CWE-79 by the vendor.'), ['cwe-mismatch']);
  t('cwe: a partial quote of a two-value record is not an error',
    cw('CVE-2026-116366 is classified as CWE-190 by the vendor.', ['CWE-190'], [{ value: 'CWE-190', origin: 'cna' }, { value: 'CWE-20', origin: 'cna' }]), ['ok']);
  t('cwe: a cross-reference to another class is not this record\'s classification',
    cw('CVE-2026-116366. It is the same class as CWE-79 elsewhere.'), []);
  t('cwe: an unread CNA container cannot turn into an absent value',
    cw('CVE-2026-116366. The CNA container states no CWE.', [], [], false), ['cwe-unreadable']);
  t('cwe: no CVE in the item is not a claim to check',
    checkCwe(mk('t', 'The container states no CWE.'), new Map(), new Map()).length, 0);
  /* Calibrated on the 2026-10-28 feed's item 20: "a CWE-306 missing authentication issue" is the
     weakness's NAME, and the first version of the regex read the adjective as an absence claim. */
  t('cwe: a weakness title is not an absence claim',
    cw('CVE-2026-116366 is a CWE-190 missing bounds-check issue.'), ['ok']);
  t('cwe: "CWE is missing" is still a claim',
    cw('CVE-2026-116366. The CWE is missing from the record.'), ['cwe-absent-but-recorded']);

  /* field presence — the 11-04 item 42 correction in executable form: "carries no metrics key at
     all" about nine Apache OpenOffice records that all carry `"metrics": {}`. The fixtures are the
     three real payload shapes, read first-hand from NVD on 2026-11-05: one record with a scored
     `metrics`, one with `{}`, one with no `metrics` key. */
  const RS = (raw, published = '2026-11-04T11:17:00.000', modified = published) => ({ raw, published, modified, status: 'Received', metrics: [], cwe: [] });
  const withScore = { id: 'CVE-2026-59263', metrics: { cvssMetricV40: [{ source: 'security@apache.org', cvssData: { baseScore: 1.9 } }] }, weaknesses: [{ description: [{ value: 'CWE-349' }] }] };
  const emptyMetrics = { id: 'CVE-2026-90627', metrics: {}, weaknesses: [{ description: [{ value: 'CWE-552' }] }] };
  const noMetricsKey = { id: 'CVE-2026-90630', descriptions: [{ lang: 'en', value: 'A record with no metrics bucket.' }] };
  const v31only = { id: 'CVE-2026-90631', metrics: { cvssMetricV31: [{ cvssData: { baseScore: 5.0 } }] } };
  const fld = (body, ids, recs, cnas = new Map()) =>
    checkField({ ...mk('t', body), cves: ids }, new Map(ids.map((id, i) => [id, recs[i]])), cnas).map((x) => x.verdict);
  t('field: the filing case — "no metrics key at all" on a record carrying {}',
    fld('The records carry no metrics key at all.', ['CVE-2026-90627'], [RS(emptyMetrics)]), ['field-present-empty']);
  t('field: the same sentence on a genuinely absent key is verified, not flagged',
    fld('The record carries no metrics key at all.', ['CVE-2026-90630'], [RS(noMetricsKey)]), ['ok']);
  t('field: absence claimed where the key carries values',
    fld('CVE-2026-59263 carries no metrics key.', ['CVE-2026-59263', 'CVE-2026-90627'], [RS(withScore), RS(emptyMetrics)]), ['field-present']);
  t('field: "the other nine" is a SET claim, never the nearest id',
    fld('One of the ten carries a score. The other nine carry an empty metrics object.', ['CVE-2026-59263', 'CVE-2026-90627'], [RS(withScore), RS(emptyMetrics)]), ['field-empty-contradicted']);
  t('field: a record that moved after publication is the registry\'s clock',
    fld('The other nine carry an empty metrics object.', ['CVE-2026-90627'],
      [RS(withScore, '2026-11-04T11:17:00.000', '2026-11-05T03:17:25.343')]), ['field-empty-since-moved']);
  t('field: a self-dated empty claim is the trend, not an error',
    fld('At publication the other nine carry an empty metrics object.', ['CVE-2026-90627'], [RS(withScore)]), ['field-dated']);
  t('field: a child field absent from a present parent is a true absence',
    fld('The record carries no cvssMetricV40.', ['CVE-2026-90631'], [RS(v31only)]), ['ok']);
  t('field: a child field that is present contradicts the claim',
    fld('The record carries no cvssMetricV40.', ['CVE-2026-59263'], [RS(withScore)]), ['field-present']);
  t('field: "is empty" on a key that does not exist is absent, not empty',
    fld('The record metrics is empty.', ['CVE-2026-90630'], [RS(noMetricsKey)]), ['field-absent-not-empty']);
  t('field: a reader\'s reading is not the record',
    fld('A parser that reads metrics reports no metrics key.', ['CVE-2026-90627'], [RS(emptyMetrics)]), []);
  t('field: a prose "no fixed version" is not a payload claim',
    fld('The record carries no fixed version.', ['CVE-2026-90630'], [RS(noMetricsKey)]), []);
  t('field: an unknown token is reported rather than silently skipped',
    fld('It carries no flibbertigibbet field.', ['CVE-2026-90627'], [RS(emptyMetrics)]), ['field-unknown-name']);
  t('field: an unread record is not an absent value',
    fld('CVE-2026-90627 carries no metrics key.', ['CVE-2026-90627'], [undefined]), ['field-unreadable']);
  t('field: the CNA container arm reads the container it names',
    checkField({ ...mk('t', 'The CNA container carries no metrics key.'), cves: ['CVE-2026-90627'] },
      new Map([['CVE-2026-90627', RS(withScore)]]),
      new Map([['CVE-2026-90627', { fields: fieldTable({ cna: { metrics: {} } }) }]])).map((x) => x.verdict),
    ['field-present-empty']);
  t('field: a Docker container in the window does not route the claim to cveawg',
    checkField({ ...mk('t', 'The container carries no metrics key.'), cves: ['CVE-2026-90627'] },
      new Map([['CVE-2026-90627', RS(emptyMetrics)]]),
      new Map([['CVE-2026-90627', { fields: fieldTable({ cna: { metrics: { cvssV3_1: [{ baseScore: 7.3 }] } } }) }]])).map((x) => x.verdict),
    ['field-present-empty']);
  t('field: {} is empty and a bucket is present — the whole distinction, pinned',
    [fieldTable({ metrics: {} }).metrics, fieldTable({ metrics: { cvssMetricV31: [] } }).metrics],
    ['empty', 'present']);

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

  /* ── the stopping-point advisory (2026-11-02 12:34) ──────────────────────────────────────────
   * One v3.1 vector `…/E:P/RL:O/RC:R` yields 9.8 / 9.3 / 8.8 / 8.5, and a record storing the base
   * or the threat is honest either way. The three cases that must be told apart: quoting it bare
   * (advisory), saying which one (silent), quoting two of them (silent — enumeration discloses). */
  const stopSubj = (score) => new Map([['CVE-2026-333333', { kind: 'cve', status: 'Received', metrics: [
    { version: '3.1', type: 'Primary', source: 'vulndb@example.com', score, vector: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H/E:P/RL:O/RC:R' },
  ] }]]);
  const stopV = (s, score) => checkCvss(mk('t', s), stopSubj(score)).map((x) => x.verdict).filter((v) => v !== 'ok');
  t('stopping: the threat score quoted bare is an advisory, not a mismatch',
    stopV('CVE-2026-333333 is 8.5 on CVSS 3.1.', 8.5), ['score-stopping-point']);
  t('stopping: the BASE quoted bare is the same advisory',
    stopV('CVE-2026-333333 is 9.8 on CVSS 3.1.', 9.8), ['score-stopping-point']);
  t('stopping: naming the base score is compliance',
    stopV('CVE-2026-333333 reads 9.8 as its base score, against 8.5 with the threat metrics applied.', 9.8), []);
  t('stopping: quoting two stopping points discloses by enum',
    stopV('CVE-2026-333333 is 9.8 on CVSS 3.1, or 8.5 once E and RC are applied.', 9.8), []);
  t('stopping: a base-only vector raises no question',
    checkCvss(mk('t', 'CVE-2026-222222 is 10.0 on CVSS 3.1.'), reproSubj(10.0)).map((x) => x.verdict), ['ok']);

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
  /* measured 2026-11-05 on item 1 of that day's feed: the LICENSE beside the model card was rewritten
     to the card's README and deduped away, so a verbatim §3 quotation came back `quote-not-found`.
     The file and the card must be TWO candidates. */
  t('cited pages: a HF file link is the file, not the card (raw twin kept)',
    citedPages('https://huggingface.co/moonshotai/Kimi-K3.1-Pro/raw/main/LICENSE').map((p) => p.url),
    ['https://huggingface.co/moonshotai/Kimi-K3.1-Pro/raw/main/LICENSE']);
  t('cited pages: a HF `blob/` viewer is asked for its raw twin',
    citedPages('https://huggingface.co/tencent/Hy4-preview/blob/main/README.md').map((p) => [p.url, p.raw]),
    [['https://huggingface.co/tencent/Hy4-preview/raw/main/README.md', true]]);
  t('cited pages: a HF file and its card are both sources under the cap',
    citedPages('https://huggingface.co/moonshotai/Kimi-K3.1-Pro · https://huggingface.co/moonshotai/Kimi-K3.1-Pro/raw/main/LICENSE').map((p) => p.url).sort(),
    ['https://huggingface.co/moonshotai/Kimi-K3.1-Pro/raw/main/LICENSE', 'https://huggingface.co/moonshotai/Kimi-K3.1-Pro/raw/main/README.md'].sort());
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
  /* measured 2026-11-05 on item 16 of that day's feed: "Neither the README nor the MCP docs states a
     total, so we counted the git tree ourselves: 174 `SKILL.md` files" — correct (tree API: 174) and
     reported `absent` twice, because neither "we counted" nor "neither … states a total" was known. */
  t('count: first-person "we counted" is a disclosure',
    SELF_COUNTED.test('Neither the README nor the MCP docs states a total, so we counted the git tree ourselves: 174 `SKILL.md` files.'), true);
  t('count: "neither A nor B states a total" is a disclosure',
    SELF_COUNTED.test('Neither the README nor the docs states a total.'), true);
  t('count: a page that DOES state a total is not a disclosure',
    SELF_COUNTED.test('The README states a total of 174 skills.'), false);
  t('count: "we counted" about another number does not suppress this one',
    selfCountedNear('The feed ships 174 skills.\n\nWe counted 24 directories at the top level.', { n: 174, noun: 'skill', phrase: '174 skill' }), false);
  t('count: and a bare count with no such disclosure is not suppressed',
    SELF_COUNTED.test(sentenceAround('The repo ships **24** skills in three groups.', '24** skills')), false);
  // measured 2026-10-29 on item 35: the disclosure is in the body, the number is in the title
  t('count: a disclosure in another sentence carrying the SAME number still counts',
    selfCountedNear('The title reads 36 language tags over one pair.\n\nThe card\'s `language:` block lists 36 codes, from `zh` to `kk`.', { n: 36, noun: 'language', phrase: '36 language' }), true);
  t('count: a disclosure about a DIFFERENT number does not suppress this one',
    selfCountedNear('The title reads 36 language tags over one pair.\n\nIts manifest groups 24 skills, a total counted from the manifest itself.', { n: 36, noun: 'language', phrase: '36 language' }), false);
  // a hyphenated modifier no longer hides the noun (measured 2026-11-04 on item 19)
  t('count: a hyphenated modifier does not hide the noun',
    [...'244 pixel-art effects and animations'.matchAll(COUNT_RE)].map((m) => `${m[1]} ${m[2]}`), ['244 effects']);
  t('count: a numeric unit is a width, not a count', [...'runs 4-bit models cheaply'.matchAll(COUNT_RE)].map((m) => m[1]), []);
  t('count: a plain count still reads', [...'ships 12 tools'.matchAll(COUNT_RE)].map((m) => m[1]), ['12']);
  /* 2026-11-04 — the delimited-count reader, filed from `patch-gg/pixelfx`'s own README. */
  t('count: a delimited span is read as a number',
    delimitedCounts('**<!-- count -->244<!-- /count --> pixel art effects and animations.**').map((s) => [s.n, s.label]),
    [[244, null]]);
  t('count: an unlabelled span takes its noun from the prose it introduces',
    delimitedFor(delimitedCounts('<!-- count -->244<!-- /count --> pixel art effects and animations.'), 'effects').map((s) => s.n), [244]);
  t('count: a labelled span matches its own noun', delimitedFor(delimitedCounts('<!-- count:effects -->244<!-- /count -->'), 'effects').map((s) => s.n), [244]);
  // the guard: a gallery total beside a per-category row is another artifact's count
  t('count: a span about another noun is not this claim\'s count',
    delimitedFor(delimitedCounts('<!-- count -->120<!-- /count --> images in the full gallery'), 'effects'), []);
  t('count: a span labelled with another noun is refused even beside the right prose',
    delimitedFor(delimitedCounts('<!-- count:images -->120<!-- /count --> effects'), 'effects'), []);
  t('count: a span holding prose is not a count', delimitedCounts('<!-- count -->lots<!-- /count --> effects'), []);
  t('count: a page with no delimiter yields nothing, never a finding', delimitedCounts('ships 244 effects'), []);
  // the identifier guard: a digit inside a name is not a count
  t('count: "FP8 model card" is a name, not eight models', identifierNumber('tencent/Hy-SimulMT-30B-A3B-FP8 model card', 34, '8'), true);
  t('count: "36 language tags" is a real count',
    identifierNumber('and 36 language tags over one pair', 4, '36'), false);
  t('count: a dotted version is part of a name', identifierNumber('upgraded to 3.16.2 models here', 14, '16'), true);
  // a YAML block is a count written as data (measured 2026-10-29 on the Hy-SimulMT card)
  const cardFixture = '---\nlanguage:\n- zh\n- en\n- ug\nlicense: apache-2.0\n---\n\n# Model\n';

  t('count: a frontmatter block is read as a count', frontmatterBlockCount(cardFixture, 'languages'), 3);
  t('count: an absent block is null, not zero', frontmatterBlockCount(cardFixture, 'skills'), null);
  t('count: an inline list is counted too', frontmatterBlockCount('---\nlanguage: [zh, en]\n---\n', 'languages'), 2);

  /* The ratio-over-rows check (built 2026-11-01 from published item 5). The fixture is the Bolt
     card's real benchmark table, trimmed and with the two columns the item names; the claim
     fixture is the ORIGINAL sentence that shipped, "three of nine". */
  const tbFixture = [
    '| Benchmark | Nemotron-3.5<br>Bolt-E4B<br>BF16 | Gemma4<br>E4B-it<br>BF16 | Nemotron-3.5<br>Bolt-E4B-4GB<br>Q4_K_M |',
    '|---|---:|---:|---:|',
    '| [MultiChallenge](https://labs.scale.com/x) | **53.10** | 42.08 | **55.60** |',
    '| [RoleBench](https://github.com/x/y) | **67.05** | 49.95 | **71.21** |',
    '| RoleMRC | **80.63** | 74.62 | **79.12** |',
    '| EQ-Bench v3 | 39.40 | **41.17** | 38.15 |',
    '| Brevity Benchmark | **82.52** | 79.99 | **82.84** |',
    '| BFCL-v3 | 68.51 | 66.39 | 67.31 |',
    '',
  ].join('\n');
  const tbPlain = '`nvidia/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB` is further post-trained from Gemma-4-E4B-it at 8B (4B effective), Q4_K_M, 64K. The card publishes BF16 and Q4_K_M side by side, and on three of nine rows the quantized build wins.';
  const tb = mdTables(tbFixture);
  t('ratio: a markdown table parses with its header intact', [tb.length, tb[0].rows.length, tb[0].header[3]], [1, 6, 'Nemotron-3.5 Bolt-E4B-4GB Q4_K_M']);
  t('ratio: bold and links are stripped from cells', [tb[0].rows[0][0], tb[0].rows[0][1]], ['MultiChallenge', '53.10']);
  t('ratio: the shipped "three of nine rows" is a claim', ratioClaims(tbPlain).map((c) => [c.a, c.b]), [[3, 9]]);
  t('ratio: word numbers up to a compound', [numToken('three'), numToken('twenty-one'), numToken('21')], [3, 21, 21]);
  t('ratio: a ratio with no row vocabulary is not a table claim', ratioClaims('It covered 6 of 36 problems in that run.'), []);
  t('ratio: a numerator above its denominator is not a ratio (PCK@20 of 3.5)', ratioClaims('scores PCK@20 of 3 in the log'), []);
  const pick = pickRatioTable([{ label: 'card', text: tbFixture }], tbPlain);
  t('ratio: columns are matched by header text, not position', [pick.a, pick.b, pick.page], [1, 3, 'card']);
  t('ratio: wins/losses/ties are counted per row', tableWins(pick.table, pick.a, pick.b), { wins: 3, losses: 3, ties: 0, unparsed: 0 });
  // the filing case end to end, without the network: the shipped sentence is a finding, the
  // corrected pair is not
  t('ratio: the shipped "three of nine" against a 6-row table is a finding',
    ratioFindings(1, ratioClaims(tbPlain), pick, { ...tableWins(pick.table, pick.a, pick.b), rows: 6 }).map((f) => f.verdict),
    ['ratio-row-count']);
  t('ratio: a claim that matches both counts passes',
    ratioFindings(1, [{ a: 3, b: 6, phrase: '3 of 6' }], pick, { ...tableWins(pick.table, pick.a, pick.b), rows: 6 }).map((f) => f.verdict),
    ['ok-ratio']);
  t('ratio: a right numerator with a wrong denominator still fires',
    ratioFindings(1, [{ a: 3, b: 9, phrase: '3 of 9' }], pick, { ...tableWins(pick.table, pick.a, pick.b), rows: 6 }).map((f) => f.verdict),
    ['ratio-row-count']);
  t('ratio: a three-way tie for the best column pair refuses instead of approximating', (() => {
    const amb = '| Benchmark | A | B | C |\n|---|---:|---:|---:|\n| x | 1 | 2 | 3 |\n| y | 2 | 1 | 3 |\n| z | 3 | 3 | 1 |\n';
    return pickRatioTable([{ label: 'p', text: amb }], 'A and B and C, 2 of 3 rows').unresolved;
  })(), true);
  t('ratio: a table it cannot pin is reported as a state, never as a disagreement',
    Object.keys(pickRatioTable([{ label: 'p', text: '| Metric | Alpha | Beta |\n|---|---:|---:|\n| x | 1 | 2 |\n| y | 2 | 1 |\n| z | 3 | 3 |' }], 'nothing named here, 2 of 3 rows')), ['unresolved']);
  t('ratio: no table anywhere says nothing at all', pickRatioTable([{ label: 'p', text: 'no pipes here' }], tbPlain), null);
  // the `count` half: a card whose total IS its table states no sentence, so the rows are the count
  t('count: a table headed with the noun verifies the count', tableRowHit([{ label: 'card', text: tbFixture }], { n: 6, noun: 'benchmarks' }), { label: 'card', header: 'Benchmark' });
  t('count: a table that does not name the noun verifies nothing', tableRowHit([{ label: 'card', text: tbFixture }], { n: 6, noun: 'languages' }), null);
  t('count: a row count that differs from the claim is not a hit', tableRowHit([{ label: 'card', text: tbFixture }], { n: 9, noun: 'benchmarks' }), null);


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

  // quotation — a sentence in quotation marks is a claim about BYTES (built 2026-10-31 from
  // `nesformer`, the third instance of a fabricated quote after Cerebras and Northflank)
  const NES_README = 'Nobody trained these weights; a compiler computed every one.\n'
    + 'The checkpoint is 466.6M parameters in bf16. It works with any model.';
  const qsrc = (...texts) => texts.map((t, i) => quoteSource(`page${i}`, t));
  const qv = (body, ...texts) => checkQuotes(mk('t', body), qsrc(...texts)).map((x) => x.verdict);
  t('quote: the 10-31 defect — an invented sentence that reads true',
    qv('as the README states plainly, "The model was not trained. A compiler computed its weights."', NES_README),
    ['quote-not-found']);
  t('quote: the corrected sentence is verbatim, so it verifies',
    qv('the README states plainly, "Nobody trained these weights; a compiler computed every one."', NES_README),
    ['ok']);
  t('quote: a quote lifted from mid-sentence matches a capitalised source',
    qv('it says "nobody trained these weights; a compiler computed every one."', NES_README), ['ok']);
  t('quote: `**bold**` inside the quotation is markup, not bytes',
    qv('a flat instruction: "**Nobody trained these weights; a compiler computed every one.**"', NES_README), ['ok']);
  t('quote: curly quotes in the item match straight quotes in the source',
    qv('the README says “Nobody trained these weights; a compiler computed every one.”', NES_README), ['ok']);
  t('quote: a tag-split word still matches (guard c, the “mostly preclinical” false negative)',
    qv('the README says "nobody trained these weights; a compiler computed every one."', 'Nobody trained these weights; a compiler computed <em>every</em> one.'), ['ok']);
  t('quote: a hard-wrapped README paragraph still matches',
    qv('it says "nobody trained these weights; a compiler computed every one."', 'Nobody trained these weights;\na compiler computed every one.'), ['ok']);
  t('quote: a Markdown link inside the source sentence is its label',
    qv('the README says "nobody trained these weights; a compiler computed every one."', 'Nobody trained these [weights](https://x.y/z); a compiler computed every one.'), ['ok']);
  t('quote: an ellipsis is fragments, not a missing string',
    qv('it says "Nobody trained these weights … a compiler computed every one."', NES_README), ['ok']);
  t('quote: a 4-word invented phrase is advisory, never a finding',
    qv('it calls itself "straight from my agents directory"', NES_README), ['quote-short']);
  t('quote: a title quoted with a comma for its full stop is the same words',
    qv('the post is headlined "AI isn\'t replacing SREs, it\'s deskilling them"', "AI Isn't Replacing SREs. It's Deskilling Them."), ['ok']);
  t('quote: no readable source is unread, not absent',
    checkQuotes(mk('t', 'it says "The model was not trained. A compiler computed its weights."'), []).map((x) => x.verdict),
    ['quote-not-read']);
  /* A page that answers 200 with a bot wall is unfetched text, and a fabrication claim needs every
   * cited page read. Both halves added 2026-11-01 after one unread Drupal advisory produced four
   * sev-3 findings about the feed. */
  t('quote: a "Client Challenge" page is a wall, not a source',
    isBlockShell('Client Challenge JavaScript is disabled in your browser. Please enable JavaScript to proceed. A required part of this site couldn’t load.'),
    true);
  t('quote: a short page with no wall marker is still read',
    isBlockShell('Deprecated: this function is removed in 3.0. Use `open()` instead. See the migration note for details and two worked examples.'), false);
  t('quote: a long article that merely says "just a moment" is a page',
    isBlockShell('just a moment of your time — this is a long post. ' + 'x'.repeat(1_400)), false);
  t('quote: an unread cited page demotes a 6-word miss from fabricated to unread',
    [checkQuotes(mk('t', 'it states "this vulnerability is being actively exploited in the wild"'), qsrc('Nothing of the kind here.'), { unread: 1 }).map((x) => x.verdict),
      checkQuotes(mk('t', 'it states "this vulnerability is being actively exploited in the wild"'), qsrc('Nothing of the kind here.'), { unread: 0 }).map((x) => x.verdict)],
    [['quote-not-read'], ['quote-not-found']]);
  t('quote: the nearest-source hint reports the run that IS real, not the prefix',
    checkQuotes(mk('t', 'the README states "Nobody trained these weights, and a compiler computed every one of them."'), qsrc(NES_README))
      .map((x) => [x.detail.includes('5 of 12 words'), x.detail.includes('a compiler computed every one')]),
    [[true, true]]);
  // guard (a): a mis-paired line is skipped, never mined — the 29/32-word “quotations” of the draft
  t('quote: an odd number of quotes on a line is skipped whole, not paired offline',
    (({ spans, unpaired }) => ({ spans, unpaired }))(quoteSpans('it was almost "done" and then "we found more')),
    { spans: [], unpaired: 1 });
  t('quote: a joined span is reported as joined, so a finding can name its provenance',
    quoteSpans('it says "one two three\nfour five six" here').joined, ['one two three four five six']);
  // …but a WRAPPED quotation is the common case, measured at 13.1% of quoted lines over 31 feeds:
  // the opener ends one line and the closer starts the next, and skipping both lost the span.
  t('quote: a hard-wrapped quotation is joined across the line break, not discarded',
    quoteSpans('it showed "known outdoor surveillance cameras and\nlicense plate readers": Flock Safety ALPRs').spans,
    ['known outdoor surveillance cameras and license plate readers']);
  t('quote: a block that never balances is still unpaired rather than mined',
    quoteSpans('a "one b\ntwo c\nthree d').unpaired, 1);
  t('quote: a balanced line still pairs exactly as before, and its neighbour is untouched',
    quoteSpans('"first" is here\n"second" is there').spans, ['first', 'second']);
  t('quote: pairing works after a short span that a length filter would have skipped',
    quoteSpans('"95%" premise is hypothetical, and "human-in-the-loop, not human-on-the-side" is a constraint.').spans,
    ['95%', 'human-in-the-loop, not human-on-the-side']);
  t('quote: a link line is labels, not prose',
    quoteSpans('[`🔗 A`](https://a.b) · [`🔗 "quoted label"`](https://c.d)').spans.filter((s) => s.includes('quoted')).length, 0);
  t('quote: a registry field is checked against the record, not the page',
    checkQuotes(mk('t', 'NVD describes it as "In the Linux kernel, the following vulnerability has been resolved".'),
      qsrc('In the Linux kernel, the following vulnerability has been resolved: a use-after-free in foo.')).map((x) => x.verdict), ['ok']);

  // THE COMMIT TITLE (filed 2026-10-31 12:32, item 27 of the 10-30 feed) — a source class whose
  // absence proves nothing, because `commits.atom` carries 20 entries on the default branch.
  const EL = 'basic support for SSR/SSG rendering of ElementaryUI views (#145)\n'
    + 'allocation-free listener callback for schedulable nodes (#148)\n';
  t('commit: a (#N) tail is the tell, markup and all',
    [isCommitQuote('allocation-free listener callback for schedulable nodes (#148)'),
      isCommitQuote('keyed `ForEach` with `id:` and per-row tracking (#149)'),
      isCommitQuote('the README says "Nobody trained these weights"')],
    [true, true, false]);
  t('commit: absent from every page is UNREAD, never an invented quotation',
    qv('the three days of commits after it — "allocation-free listener callback for schedulable nodes (#148)"', 'Nothing about it here.'),
    ['quote-unreadable-source']);
  t('commit: the commit list confirms it, and then it verifies',
    qv('the commits after it — "allocation-free listener callback for schedulable nodes (#148)"', EL), ['ok']);
  // …and the same words WITHOUT the tail are an ordinary quotation, so the class stays narrow
  t('commit: the same words with no (#N) tail are still a normal quotation',
    qv('it shipped "allocation-free listener callback for schedulable nodes"', 'Nothing about it here.'), ['quote-not-found']);
  t('commit: a mixed item still judges its non-commit quotations',
    checkQuotes(mk('t', 'it says "the model was not trained at all here today" and "allocation-free listener callback for schedulable nodes (#148)"'), qsrc('Nothing about it here.')).map((x) => x.verdict),
    ['quote-not-found', 'quote-unreadable-source']);

  /* THE TEMPLATE-SCRIPT BODY (filed 2026-11-04 20:36, item 37 of the 11-04 feed). Blogger serves
     a post body inside `<script type='text/template'>`; a strip that removes every `<script>`
     deletes the article and leaves enough navigation to pass `isBlockShell`, so the page reads as
     full text and two verbatim quotations were reported as inventions. The fixture is the Chrome
     157 post's own shape, trimmed. */
  const BLOGGER = '<html><head><style>body{}</style><script>var nav = "not prose";</script></head>'
    + '<body><div id="navbar">Home About</div>'
    + '<script type="text/template">\n<p>This update includes <a href="#">213</a> security fixes.</p>'
    + '<p>Reported by Xinyang Ge (Anthropic), assisted by Claude on 2026-09-28</p>\n</script>'
    + '<script type="application/ld+json">{"headline":"json metadata is not a source"}</script>'
    + '</body></html>';
  const bt = htmlText(BLOGGER);
  t('template: a Blogger post body survives the script strip',
    [bt.includes('This update includes 213 security fixes.'), bt.includes('assisted by Claude')], [true, true]);
  t('template: executable JS is still not prose', bt.includes('not prose'), false);
  t('template: ld+json metadata is not a source a reader can see', bt.includes('json metadata'), false);
  t('template: the unwrapped body answers the quotation check',
    checkQuotes(mk('t', 'the post says "This update includes 213 security fixes."'), qsrc(bt)).map((x) => x.verdict), ['ok']);

  /* ── paper dates: the three filing cases of 2026-11-05, verbatim, both sides ────────────────── */
  const P = (pub, version = 1, updated = pub) => ({ id: 'x', version, published: pub, updated });
  t('paper: a truncated instant is the same instant (21:38Z vs 21:38:49Z)',
    paperVerdict(P('2026-11-02T21:38:49Z'), '2026-11-02T21:38Z').verdict, 'ok');
  t('paper: the right day with an instant available is imprecise, not a mismatch',
    paperVerdict(P('2026-11-02T21:38:49Z'), '2026-11-02').verdict, 'paper-date-imprecise');
  t('paper: a day one early is a mismatch (2611.02017 cited 2026-10-31)',
    paperVerdict(P('2026-11-01T16:04:16Z'), '2026-10-31').verdict, 'paper-date-mismatch');
  t('paper: an instant one day early is a mismatch too (2611.03998 cited 2026-11-01)',
    paperVerdict(P('2026-11-02T21:38:49Z'), '2026-11-01T21:38Z').verdict, 'paper-date-mismatch');
  t('paper: a revision date is its own verdict, not a wrong day',
    paperVerdict(P('2026-10-20T09:00:00Z', 2, '2026-11-01T16:04:16Z'), '2026-11-01').verdict, 'paper-date-revision');
  t('paper: no record is unread, never a finding',
    paperVerdict(undefined, '2026-11-02').verdict, 'paper-date-unread');
  t('paper: the cue must be submission — "announced" is the other clock',
    ARXIV_SUBMIT_CUE.test('announced 2026-11-02 on the arXiv listing'), false);
  t('paper: a submitted cue is read', ARXIV_SUBMIT_CUE.exec('arXiv 2611.03998 · submitted 2026-11-02T21:38Z')?.[2], '2026-11-02T21:38Z');

  /* 2026-11-05 — the range-absence check, pinned on the filing case BOTH WAYS: the published
     sentence (which denied a range the CNA container carried) and the corrected one (which names
     the field and then says "nothing to install" about the registry). The second must NOT be a
     finding, or the check would punish the repair. */
  const nvdAwaiting = { status: 'Awaiting Analysis', configs: 0, refs: [] };          // NVD unanalysed
  const cnaAns = { affected: { key: 'populated', entries: 1, versioned: 1, products: ['ansible-core'] }, refs: [] };
  const ra = (cue, namesNvd, nvd, cna) => rangeAbsentVerdict({ cue, namesNvd, nvd, cna }).verdict;
  t('rangeabsent: the published sentence denied a range the CNA carried',
    ra('record', false, nvdAwaiting, cnaAns), 'range-absent-but-served');
  t('rangeabsent: the corrected "nothing to install" is about the REGISTRY, not the record',
    ra('install', false, nvdAwaiting, cnaAns), 'boundary-named-no-artifact');
  t('rangeabsent: naming NVD makes the same words true of NVD',
    ra('record', true, nvdAwaiting, cnaAns), 'range-only-in-cna');
  t('rangeabsent: an analysed record with NVD ranges refutes it in the stronger field too',
    ra('record', true, { status: 'Analyzed', configs: 3, refs: [] }, cnaAns), 'range-absent-but-served');
  t('rangeabsent: confirmed when neither field states one',
    ra('record', false, nvdAwaiting, { affected: { key: 'absent', entries: 0, versioned: 0, products: [] }, refs: [] }), 'range-absent-confirmed');
  t('rangeabsent: an empty affected[] is present-and-empty, and still confirms',
    ra('record', false, nvdAwaiting, { affected: { key: 'empty', entries: 0, versioned: 0, products: [] }, refs: [] }), 'range-absent-confirmed');
  t('rangeabsent: a versionless affected[] entry is a PRODUCT, which is not a range',
    ra('record', false, nvdAwaiting, { affected: { key: 'populated', entries: 6, versioned: 0, products: ['json-glib'] }, refs: [] }), 'range-absent-but-served');
  t('rangeabsent: a fix commit in references[] is the third place a remedy lives',
    ra('record', false, { status: 'Analyzed', configs: 0, refs: ['https://github.com/o/r/commit/717d7ecf'] }, { affected: { key: 'absent', entries: 0, versioned: 0, products: [] }, refs: [] }), 'range-in-references');
  t('rangeabsent: unread is never absent',
    ra('record', false, { error: true }, { error: true }), 'range-unread');
  t('rangeabsent: the filing sentence is a cue', affectedAbsentSpans(mk('t', 'No fixed version appears in the record at the time of writing.').plain).map((c) => c.cue), ['record']);
  t('rangeabsent: the corrected sentence is an INSTALL cue, not a record one',
    affectedAbsentSpans(mk('t', 'the boundary is named and there is still nothing to install.').plain).map((c) => c.cue), ['install']);
  t('rangeabsent: a quotation of the record is not the author asserting it',
    affectedAbsentSpans(mk('t', 'the advisory says "no fixed version is available".').plain).map((c) => c.cue), []);
  /* End-to-end on the two filing sentences plus the one false positive the 10-31 calibration
     produced: a claim about the ADVISORY's cells, bound to a CVE whose record it is not about. */
  const raIt = (text) => checkRangeAbsent(
    mk('t', text),
    new Map([['CVE-2026-123036', { status: 'Awaiting Analysis', raw: { configurations: [], references: [] } }]]),
    new Map([['CVE-2026-123036', { affected: { key: 'populated', entries: 1, versioned: 1, products: ['ansible-core'] }, refs: [] }]]),
  ).map((x) => x.verdict);
  t('rangeabsent: end-to-end, the published sentence fires on CVE-2026-123036',
    raIt('NVD has not analyzed CVE-2026-123036. No fixed version appears in the record at the time of writing.'), ['range-absent-but-served']);
  t('rangeabsent: end-to-end, the corrected sentence is information, not a finding',
    raIt('The fix boundary for CVE-2026-123036 is named in the CNA affected[] field, and there is still nothing to install.'), ['boundary-named-no-artifact']);
  t('rangeabsent: a claim about the ADVISORY is not a claim about the record',
    raIt('The affected and patched cells both read latest, so the advisory names no version boundary at all for CVE-2026-123036.'), []);
  t('rangeabsent: no CVE in the sentence is silence, not a general check',
    raIt('Some projects name no fixed version at all.'), []);
  t('rangeabsent: "the 6.x line has no version TO INSTALL" is the install cue, not a record one',
    affectedAbsentSpans(mk('t', 'anyone on the 6.x line has no version to install.').plain).map((c) => c.cue), ['install']);

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
/* `temporal` is in this list because its message quotes NVD's copy beside the container's — run
 * alone without it, the check said "NVD re-serves no metric" about a record NVD re-serves four of.
 * The statement was about the pull, not the registry, which is the "unread is not absent" defect
 * wearing a different hat (fixed 2026-11-02 12:34, while calibrating the stopping-point check). */
if (!NO_NET && (CHECKS.has('cvss') || CHECKS.has('temporal') || CHECKS.has('status') || CHECKS.has('cwe') || CHECKS.has('field') || CHECKS.has('range') || CHECKS.has('rangeabsent') || STATUS_WATCH || CHECKS.has('quotation'))) {
  const cves = [...new Set([...parsed.flatMap((f) => f.items.flatMap((it) => it.cves)), ...EXTRA_IDS])];
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
for (const [id, rec] of nvd) subjects.set(id, { kind: 'cve', status: rec.status, modified: rec.modified, published: rec.published, metrics: rec.metrics, cwe: rec.cwe, cpe: rec.cpe, raw: rec.raw });
/* The watch is written before the checks run, so a regression found here shows up in the same
 * report that a stale claim about it would. It records the observation, not a verdict: a move
 * that no item mentions is still the thing worth catching. */
let statusMoved = [];
if (STATUS_WATCH && !NO_NET) {
  const moved = statusWatch(nvd);
  statusMoved = moved;
  if (moved.length) {
    console.log(`\nSTATUS WATCH (${STATUS_STORE})`);
    for (const m of moved) {
      console.log(`  ${m.regressed ? '↩' : '→'} ${m.id}  ${m.from ?? '(new)'} → ${m.to}${m.regressed ? '   REGRESSION — the record moved back' : ''}${m.modified ? `  [lastModified ${m.modified}]` : ''}`);
    }
  } else {
    console.log(`\nSTATUS WATCH (${STATUS_STORE}) — ${nvd.size} record(s) read, nothing moved`);
  }
}
// CNA containers (check F): the only place a number NVD normalised away survives. cveawg is
// unmetered, so the cap is about latency rather than budget — cached entries cost nothing.
const cna = new Map();
let cnaCalls = 0;
if (!NO_NET && (CHECKS.has('cvss') || CHECKS.has('temporal') || CHECKS.has('cwe') || CHECKS.has('field') || CHECKS.has('range') || CHECKS.has('rangeabsent') || CHECKS.has('quotation'))) {
  const ids = [...new Set(parsed.flatMap((f) => f.items.flatMap((it) => strip(it.text).match(/CVE-\d{4}-\d{3,7}/g) ?? [])))].slice(0, MAX_CNA);
  for (const id of ids) {
    // A schema bump forces a refetch, and a refetch is a call: counting only "no entry at all"
    // reported cna_calls 0 on the run that rewrote 5 entries at CNA_CACHE_V.
    const fresh = cache[`cna:${id}`]?.v !== CNA_CACHE_V;
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
    if (!NO_NET && CHECKS.has('status')) findings.push(...checkStatus(it, subjects));
    if (!NO_NET && CHECKS.has('date')) findings.push(...checkDate(it, subjects, cna));
    if (!NO_NET && CHECKS.has('temporal')) findings.push(...checkTemporal(it, cna, subjects));
    if (!NO_NET && CHECKS.has('cwe')) findings.push(...checkCwe(it, subjects, cna));
    if (!NO_NET && CHECKS.has('field')) findings.push(...checkField(it, subjects, cna));
    if (!NO_NET && CHECKS.has('range')) findings.push(...checkRange(it, subjects, cna));
    if (!NO_NET && CHECKS.has('rangeabsent')) findings.push(...checkRangeAbsent(it, subjects, cna));
  }
  if (!NO_NET && CHECKS.has('repo')) for (const it of items) findings.push(...checkRepo(it, budget, ageBudget));
  if (!NO_NET && CHECKS.has('count')) for (const it of items) findings.push(...await checkCount(it));
  if (!NO_NET && CHECKS.has('ratio')) for (const it of items) findings.push(...await checkRatio(it));
  // a dashed CVE range is arithmetic on identifiers, so it needs no network and runs under --no-net
  if (CHECKS.has('idrange')) for (const it of items) findings.push(...checkIdRange(it));
  // the bundle check is local-only (it reads the path the item names), so it runs even under --no-net
  if (CHECKS.has('bundle')) for (const it of items) findings.push(...checkBundle(it));
  // a quotation is a claim about bytes — the page text is already cached by the count check
  if (!NO_NET && CHECKS.has('quotation')) for (const it of items) findings.push(...await checkQuote(it, nvd, cna));
  /* A paper's submission instant is one unmetered call for the WHOLE batch (a comma-separated
   * id_list), so the arm is per-file rather than per-item. */
  if (!NO_NET && CHECKS.has('paper')) {
    const ids = [...new Set(items.flatMap((it) => [...it.plain.matchAll(/arxiv\.org\/abs\/(\d{4}\.\d{4,5})/g)].map((m) => m[1])))];
    if (ids.length) {
      const papers = await arxivRecords(ids);
      for (const it of items) findings.push(...checkPaper(it, papers));
    }
  }

  perFile.push({ file: basename(p), items: items.length, findings });
  allFindings.push(...findings.map((f) => ({ file: basename(p), ...f })));
}

/* The cache is COMMITTED, so its growth is a repo cost, not a disk cost: a month-wide census of the
 * `count`/`ratio` checks pushed its page corpus from 9.9 MB to 19 MB in one run. Text-bearing keys
 * (`page:`, `readme:`, `hfcard:`) are bounded to the most recently fetched N; the small structured
 * keys (repo state, `cna:`, `ghsa:`) are kept whole because they are the ones a re-run saves a call
 * on. Dropping a page is cheap — every one of them is refetched unmetered. */
/* The CNA containers (351 for a month-wide census) are STRUCTURED and deliberately kept whole,
 * because they are what makes a re-run cost nothing — but they are only useful for the 6 h TTL, and
 * a census that walks a month leaves the whole corpus behind (6.2 MB, 11-02). Past a week an entry
 * is dead weight: refetching it is unmetered. Same rule as the text budget, different axis. */
const CNA_KEEP_MS = 7 * 86400 * 1000;
for (const k of Object.keys(cache)) {
  if (!k.startsWith('cna:')) continue;
  const at = Date.parse(cache[k]?.fetched_at ?? 0);
  if (Number.isFinite(at) && Date.now() - at > CNA_KEEP_MS) delete cache[k];
}
const cacheBytes = (e) => (e && typeof e.text === 'string' ? e.text.length : 0);
const textish = Object.keys(cache).filter((k) => /^(page|readme|hfcard):/.test(k));
textish.sort((a, b) => Date.parse(cache[b].fetched_at ?? 0) - Date.parse(cache[a].fetched_at ?? 0));
let keptBytes = 0;
for (const k of textish) {
  keptBytes += cacheBytes(cache[k]);
  if (keptBytes > CACHE_BYTES) delete cache[k];
}
try {
  mkdirSync(dirname(CACHE_PATH), { recursive: true });
  writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 1));
} catch { /* cache is best-effort */ }

const SEVERITY = { ok: 0, 'ok-cited-page': 0, 'no-cve-named': 1, 'no-record': 1, 'slot-quoted': 1, 'counted-by-author': 0, 'number-other-noun': 1, 'temporal-stopping-point': 1, 'temporal-disclosed': 0, 'score-stopping-point': 1, 'cna-only-score': 1, 'star-drift': 2, 'star-dated': 1, 'star-surge': 1, 'ok-history': 0, 'history-older-than-record': 2, 'history-unreadable': 1, stale: 2, archived: 2, 'stale-disclosed': 0, 'archived-disclosed': 0, differs: 2, absent: 2, 'unsplit-issue-count': 3, 'compound-lags-parts': 3, 'version-swapped': 3, 'version-absent': 3, 'score-not-reproducible': 2, 'score-mismatch': 3, 'wrong-subject': 3, 'absence-contradicted': 3, 'status-stale': 2, 'status-dated': 1, 'date-local-shift': 2, 'date-mismatch': 2, 'cwe-absent-but-recorded': 3, 'cwe-mismatch': 3, 'cwe-unreadable': 1, 'field-present': 3, 'field-present-empty': 2, 'field-empty-contradicted': 2, 'field-empty-since-moved': 1, 'field-absent-not-empty': 1, 'field-dated': 0, 'field-unknown-name': 0, 'field-unreadable': 0, 'span-empty': 2, 'cve-range-span-mismatch': 2, 'cve-range-disclosed': 0, 'ok-range': 0, 'range-ambiguous': 0, 'range-cross-year': 0, 'range-inverted': 2, 'span-inverted': 3, 'span-unverifiable': 0, 'ok-span': 0, 'range-absent-but-served': 3, 'range-only-in-cna': 1, 'range-absent-confirmed': 0, 'range-unread': 0, 'range-in-references': 1, 'boundary-named-no-artifact': 0, 'status-no-record': 1, 'status-no-cve': 1, 'advisory-unreadable': 1, 'advisory-repo-only': 0, unreadable: 1, 'artifact-unreadable': 1, 'nvd-unavailable': 1, 'ratio-row-count': 3, 'ok-ratio': 0, 'ok-delimited': 0, 'not-a-repo': 0, 'repo-absent-asserted': 0, 'ok-table-rows': 0, 'table-columns-unresolved': 0, 'bundle-ok': 0, 'bundle-lines-named': 0, 'bundle-unavailable': 0, 'bundle-line-count': 3, 'bundle-total-mismatch': 2, 'quote-not-found': 3, 'quote-paraphrase': 2, 'quote-short': 1, 'quote-not-read': 0, 'paper-date-imprecise': 1, 'paper-date-mismatch': 2, 'paper-date-revision': 1, 'paper-date-unread': 0 };
const REAL = (f) => (SEVERITY[f.verdict] ?? 1) >= 2;

/* `status_watch` rides the findings file so the act pass sees a backwards move without re-reading
   the store: the batch's own JSON is the thing it is told to open first. */
const summary = { generated: new Date().toISOString(), files: perFile, status_watch: statusMoved, api_calls: apiCalls, readme_calls: readmeCalls, cited_page_calls: citedPages_requests, repo_page_calls: repoCalls, nvd_calls: nvdCalls, cna_calls: cnaCalls };
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
