#!/usr/bin/env node
/* Disclosure lag — "how long between the fix and the record?"
 *
 * Why this exists (filed 10-22 20:20, System: "Make 'how long between the fix and the record?' a
 * one-call check"). The 10-22 batch's whole spine was a join the repo held both halves of and had
 * no tool for: `nvd-provenance.mjs` knows the RECORD (status, metrics, CVE id) and
 * `artifact-provenance.mjs` knows the ARTIFACT (publisher, attestations), but nothing joined
 * "patch release date → record published date → lag in days → is the current release still in the
 * affected range". Every disclosure-lag item in that batch was assembled by hand from three sites.
 *
 * The claim this tool measures (→ [[disclosure-lag]]): a CVE record's `published` field is when an
 * ASSIGNMENT WORKFLOW finished, not when the vulnerability appeared. The gap runs in both
 * directions — vLLM's fix shipped 16 days before its record, Vibe-Trading's 168 days before, Vyper
 * has no fix at all, and six ZDI kernel reports have no CVE id to look up. Each state implies
 * different advice, and the only field that separates them is the VERSION RANGE.
 *
 * The five states the agenda named, plus two measurement forced in:
 *   no-record            — the CVE id has no NVD record (GitLab CVE-2026-110264). Never a lag.
 *   pre-record           — a tracker id (ZDI-CAN-…) with no CVE id anywhere. Nothing to key on.
 *   indeterminate        — a record exists but no affected range can be attributed. Do NOT guess.
 *   no-fix               — patched: None, and the latest release is still in range.
 *   backfill             — an advisory carrying this exact cve_id predates the record by >7d.
 *   fix-then-record      — the fixed release precedes the record (lag ≤ 90d).
 *   fix-predates-record  — the fixed release precedes the record by > 90d ("months").
 *   record-then-fix      — the record precedes the fixed release (exposure window was real).
 * `indeterminate` and `record-then-fix` were added because forcing either into the five would
 * invent a lag (a fabricated number is worse than a missing one) or hide one.
 *
 * CALIBRATION (2026-10-22, the batch the states were measured on — re-run to check the tool, not
 * the batch): vLLM CVE-2026-114053 = fix-then-record 16d; Vibe-Trading CVE-2026-114108 =
 * fix-predates-record 168d; Vyper CVE-2026-114117 = no-fix; Trigger.dev CVE-2026-114085 =
 * record-then-fix (the record is 1d older than v4.7.7); MessagePack-CSharp CVE-2026-92707 =
 * backfill 28d. Every one matches the hand count from the 10-22 learn pass, and three of them
 * only matched after a bug in this file was fixed — which is why the calibration is in the
 * header rather than in a commit message:
 *   · timezone  — NVD drops the `Z`; `new Date("2026-10-21T01:17:28.083")` is HOST-local, which
 *                 on a UTC+8 host read vLLM as 15d instead of 16d. Every date now goes through
 *                 `ts()`, which appends `Z` when the string carries no offset.
 *   · ordering  — api.github.com returns releases newest-first by CREATION, which is neither
 *                 version order nor date order once backfilled tags exist; Vibe-Trading's "latest"
 *                 read v0.1.4 (April) while v0.1.18 (Oct 21) was live. Sorted with `cmpVer`.
 *   · syntax    — the cell syntax and the cell CONTENT both have two forms; see `parseRanges` and
 *                 `titleBound`/`contradicted` for the two ways the advisory's own numbers lie.
 *
 * THE ARTIFACT AXIS (added 2026-10-23 20:32). Every state above is TEMPORAL — it says when the fix
 * landed relative to the paperwork. None of them says whether the fix is INSTALLABLE, and the 10-23
 * batch produced a record where the two answers are opposite: EDK2's 9.5 pre-boot RCE has PR #13302
 * merged 2026-10-15 while the same advisory's cell reads `Patched versions: Not patched currently`,
 * because firmware images are built and signed downstream of the repo. `--artifact <commit|package|
 * firmware|image>` prints the advisory's cell VERBATIM beside the derived state and answers the
 * installable question; when a fix exists in source but no artifact at or after it, the state is
 * `fix-in-source-no-artifact` — permanent for an installed base, not pending.
 *   · The fix's date comes from `--fix-ref <commit|pull url|sha>`, or automatically from the Debian
 *     tracker's own `Fixed by:` commit links (`--debian <srcpkg>`). No GitHub API call is needed:
 *     a commit page carries `"committedDate"`, a pull page carries `"mergedTime"`.
 *   · EDK2 calibration (2026-10-23): commit `14cdbb86` committed 2026-10-15, newest release
 *     `edk2-stable202608` tagged 2026-08-12, Debian lists forky/sid `2026.08+ds-2` **vulnerable**
 *     and `(unfixed)` → `fix-in-source-no-artifact`. The cell is a REPORTING date, not an
 *     introduction date: `Affected versions: EDK II master as of 2026-09-14` looks like it excludes
 *     the Aug tag, and Debian's tracker is what proves the Aug release IS affected. An artifact
 *     older than an `as of` date is therefore not necessarily clean, and the tool says so instead
 *     of inferring it.
 *   · Brotli CVE-2026-111497 → `fix-then-record 1d` + `artifact-carries-fix` (v1.0.10/v1.1.1/
 *     v1.2.1 all shipped 2026-10-21). Keycloak CVE-2026-18963 → `fix-then-record 7d` +
 *     `artifact-carries-fix` (26.6.6 on 08-11, 26.7.2 on 08-19; 26.4.15 predates the atom feed's
 *     window and that gap is printed rather than read as a missing release).
 *   · Two of the three needed the RANGE from prose, because neither had a usable GHSA cell:
 *     Brotli's record says "versions 1.0.3 through 1.2.0 … to the latest available version: 1.0.10
 *     or 1.1.1 or 1.2.1", and Keycloak's lives only in the RHSA, which is a JS shell. Prose
 *     extraction is narrow, labelled `record prose`, and never silent; `--range` accepts an
 *     operator-supplied range and labels it the same way.
 *   · FOUR parsers were wrong in ways only live data exposed, each now asserted in `--selftest`:
 *     a multi-line advisory renders ONE `<div class="f4">` PER LINE and the cell reader took only
 *     the first (Keycloak's three ranges collapsed to one); a hyphen range (`26.0.0-26.4.14`, the
 *     spelling vendor advisories actually use) parsed as nothing, while a prerelease
 *     (`4.5.0-rc.2`) must never be read as one; the "every patched version is inside the affected
 *     range" test fired on Brotli's legitimate multi-line patch set (1.0.10 sorts below 1.2.0 and
 *     still fixes its own line); and a self-contradictory cell now REFUSES — Trigger.dev's
 *     `<= 4.6.0` / `>= 4.6.0` returns `indeterminate` instead of the known-wrong 36d, because the
 *     bound that rescues it exists only in api.github.com's advisory object.
 *   · TWO degraded-mode repairs, both measured the same hour: when api.github.com 403s, the
 *     timeline falls back to `releases.atom` (no auth, no budget) — and because the atom feed holds
 *     only recent releases, a named fix version missing from it is looked up on its own tag page
 *     before the tool claims it is absent.
 *   · ONE discovery gap: the advisory a CVE is filed against is not always in the owning repo.
 *     Keycloak's lives only in the GitHub Advisory Database (`/advisories/GHSA-…`) with no NVD
 *     reference to it, so record → references → GHSA finds nothing; `advisoryFromDatabase` is the
 *     third route and the tool says so when it is the one that answered.
 *
 * `no-record` has no live calibration left: BOTH negatives this tool was filed against —
 * CVE-2026-92707 ("in no registry at all", CLAUDE.md rule 7) and CVE-2026-110264 ("NVD had no
 * record when checked at publication", the 10-22 feed) — acquired NVD records on 10-15 and 10-22
 * respectively. The state stays in the code because it is real, but absence has a shelf life of
 * hours here, and a `no-record` result should be re-run before it is quoted.
 *
 * WHERE THE RANGE COMES FROM — three sources, in order, because the obvious one is empty:
 *   1. NVD `configurations[].cpeMatch[]`. For this cohort it is **null**: 0 configuration nodes on
 *      CVE-2026-114053 and -114117 (checked). Recent VulnCheck-assigned records carry no CPE data
 *      at all, so a tool that reads only NVD cannot answer "which versions".
 *   2. The GitHub advisory named in the record's references (`github.com/<o>/<r>/security/
 *      advisories/GHSA-…`). Its HTML carries machine-readable "Affected versions" / "Patched
 *      versions" cells: `>= 0.7.3, < 0.31.0` / `>= 0.31.0`, and literally `None` for Vyper. This is
 *      the source that works today.
 *   3. `/advisories?cve_id=…` — the global advisory's `vulnerabilities[]`. **Empty on this whole
 *      cohort** (four checked, all `[]`), and on the global page the same fields read "Unknown".
 *      Kept as a last resort, and its emptiness is printed rather than silently skipped, because
 *      "no range published" and "range could not be found" are different sentences.
 *
 * The same trap one level up, which the tool prints instead of hiding: the global advisory's
 * `published_at` on a VulnCheck-style bulk drop is an INGESTION timestamp — four CVEs from two
 * different repos all come back at 2026-10-21T03:32:2xZ. So it is never used as the advisory's own
 * date; `--repo` reads the repo's own advisory list instead, which carries the real dates.
 *
 * THE ANNOUNCEMENT AXIS (added 2026-10-24 04:28). The artifact question has a FOURTH document —
 * the release announcement — and on OpenWrt's CVE-2026-53921 it was the only one that spoke in the
 * consumer's unit. Four artifacts, four answers:
 *   · the GHSA cell              `Affected: <= master (e432dd6)` / `Patched versions: None`
 *   · the record's own prose     "patched in version 25.12"  (a branch, not a point release)
 *   · the component repo         the three fixes are commits on `master` and `openwrt-25.12` with
 *                                DIFFERENT SHAs (cherry-picks), and NONE of them is on
 *                                `openwrt-24.10` — because 24.10's fix ships as patch files
 *                                0030/0031/0033 inside the openwrt/openwrt tree over a source
 *                                pinned at b14cf98c (2025-10-02), never as a branch commit
 *   · the announcement           24.10.8 (r29233, 2026-07-26) names the CVE and its GHSA, and
 *                                25.12.5 (r33051, 2026-07-01) names it too
 * `--release-notes <url>[,<url>…]` reads the announcements and answers per page: does it name this
 * CVE, which release does it name, when was that released, on which revision, and what does the
 * page say about the end of the line. Several pages are the POINT — "does 25.12 carry it?" has
 * three different answers across 25.12.0 / .5 / .6 (0 / 1 / 0 occurrences of the id), and one page
 * cannot show that. Passing a line's every note is how "upgrade to <line>" turns into "from which
 * patch level".
 *   · New state `advisory-none-but-notes-name-it`, emitted ONLY when the advisory's patched cell is
 *     `None`/`Unknown`/absent AND an announcement names the CVE — a cell that contradicts a shipped
 *     artifact, not merely a terse one. The version-axis state is preserved on its own `temporal`
 *     line, as `--artifact` already does.
 *   · A page that does not name the CVE never changes the state: EDK2 has announcements, they name
 *     no version, and EDK2 must stay `fix-in-source-no-artifact`. Reported as
 *     `notes-do-not-name-it`, with the caveat that it does not clear anything.
 *   · An UNREADABLE page is `notes-unreadable`, never "does not name it" — the gate/absence
 *     distinction from doc-twin.mjs applies to every fetched page here.
 *   · The page's version is its SELF-DESCRIPTION (the `<title>`, or a banner carrying the version
 *     beside its own revision id) or it is null. Scanning the body for a version string is how the
 *     EDK2 control read a release index row and reported the release as "3.5.1"; the same wiki also
 *     spells the release date "26th July 2026" in English and "1. July 2026" in German, so both
 *     ordinal forms are parsed.
 *   · Two counts the notes carry that nothing else does: the series' own EoL projection, and the
 *     number of SIBLING fixes the same page labels "no CVE" (24.10.8: four) — shipped code no
 *     record can key on, which is the `pre-record` state caught at the announcement instead of at
 *     the record. The count is a count, NOT a count of independent bugs, and the odhcpd chain is
 *     why: one of those four "no CVE" entries is the fix-of-the-fix for commit 0320032ae — its own
 *     message begins "Commit 0320032ae313 hoisted handshake_len above the Reconfigure Accept
 *     block", and it landed 3h39m after the commit it repairs, in a series that had not released.
 *     The CVE record lists all six commits (three fixes × master + the 25.12 cherry-picks), so
 *     "the record's references" means "the security release's commits", not "this CVE's commits".
 *
 * Usage:
 *   node disclosure-lag.mjs --ids CVE-…,CVE-… --pypi vllm
 *   node disclosure-lag.mjs --ids CVE-… --repo triggerdotdev/trigger.dev
 *   node disclosure-lag.mjs --tracker ZDI-CAN-33549          # pre-record check (absence query)
 *   node disclosure-lag.mjs --ids CVE-… --json
 *   node disclosure-lag.mjs --ids CVE-… --repo tianocore/edk2 --artifact firmware --debian edk2
 *   node disclosure-lag.mjs --ids CVE-… --repo google/brotli --artifact package
 *   node disclosure-lag.mjs --ids CVE-… --range "26.0.0-26.4.14, 26.5.0-26.6.5" --repo keycloak/keycloak
 *   node disclosure-lag.mjs --ids CVE-… --release-notes <url>[,<url>…]   # the announcement axis
 *   node disclosure-lag.mjs --selftest                       # parsers + the artifact + notes verdicts
 *
 * Cost: NVD is 5 req/30s unauthenticated (NVD_API_KEY → 50/30s); calls are paced. api.github.com is
 * 60/hr unauthenticated and this repo budgets ~5–10 calls per feed run — this is an ad-hoc tool,
 * and `--repo` costs 2 of those calls, so pass one repo per invocation.
 */
import fs from 'node:fs';

const UA = { 'User-Agent': 'trending.md learnt-agent (disclosure-lag)' };
const NVD = 'https://services.nvd.nist.gov/rest/json/cves/2.0';
const GH = 'https://api.github.com';
const NVD_API_KEY = process.env.NVD_API_KEY || '';
const NVD_PACE = NVD_API_KEY ? 800 : 6500;

const sleep = ms => new Promise(r => setTimeout(r, ms));
const args = process.argv.slice(2);
const argOf = (flag, dflt = null) => {
  const i = args.indexOf(flag);
  return i === -1 ? dflt : args[i + 1];
};
const JSON_OUT = args.includes('--json');
const IDS = (argOf('--ids', '') || '').split(',').map(s => s.trim()).filter(Boolean);
const TRACKERS = (argOf('--tracker', '') || '').split(',').map(s => s.trim()).filter(Boolean);
const REPO = argOf('--repo', null);
const PYPI = argOf('--pypi', null);
/* The artifact axis: what a consumer can install, as opposed to when the paperwork moved. */
const ARTIFACT = argOf('--artifact', null);
const NOTES = (argOf('--release-notes', '') || '').split(',').map(s => s.trim()).filter(Boolean);
const FIX_REF = argOf('--fix-ref', null);
const DEBIAN = argOf('--debian', null);
const RANGE_OVERRIDE = argOf('--range', null);
const SELFTEST = args.includes('--selftest');
const ARTIFACT_MODES = ['commit', 'package', 'firmware', 'image'];
if (ARTIFACT && !ARTIFACT_MODES.includes(ARTIFACT)) {
  console.error(`--artifact must be one of ${ARTIFACT_MODES.join('|')} (got "${ARTIFACT}")`);
  process.exit(2);
}

/* ── versions ──
   Semver-ish comparison, because the cohort is full of things like `v0.5.0b1`, `4.5.0-rc.2` and
   `>= v3.3.8`. Numeric segments first, then a release sorts after its prereleases — enough to
   answer "is the latest release still inside the affected range", which is the only ordering
   question this tool asks. */
function parseVer(v) {
  const s = String(v).replace(/^\s*[vV]/, '').trim();
  const m = s.match(/^(\d+(?:\.\d+)*)(.*)$/);
  if (!m) return { nums: [], pre: s };
  return { nums: m[1].split('.').map(Number), pre: (m[2] || '').replace(/^[-._]/, '') };
}
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

/* Range expression → a LIST of bounds. Two syntaxes appear in the wild and both were found the
   hard way on 2026-10-22:
 *   comparison   `>= 0.7.3, < 0.31.0`   (vLLM, Vyper, Trigger.dev — one branch)
 *   interval     `[,2.5.303), [3.0,3.1.9)`  (MessagePack-CSharp, GHSA-qhrr-8q5h-9q3h)
 * The second is GitHub's rendering for an advisory that fixes SEVERAL release lines at once, and
 * a parser that only reads comparison syntax reports "no range" on the exact records where
 * version range is the whole story — which is how the first version of this tool classified a
 * perfectly scoped advisory as `indeterminate`. `[`/`]` are inclusive, `(`/`)` exclusive, and an
 * empty bound means unbounded. Returns [] for "Unknown"/"None"/empty so the caller can tell
 * "no bound published" from "bound published and satisfied". */
function parseRanges(raw) {
  if (!raw) return [];
  const s = String(raw).trim();
  if (/^(unknown|none|n\/a)$/i.test(s)) return [];
  /* ` | ` separates lines of a multi-line cell (see parseAdvisoryHtml) — each line is its own
     range, and merging them would turn three disjoint branches into one wide span. */
  if (s.includes(' | ')) return s.split(' | ').flatMap(p => parseRanges(p));
  const out = [];
  if (/[\[(]/.test(s)) {
    for (const m of s.matchAll(/([\[(])\s*([^,\]\)]*?)\s*,\s*([^\]\)]*?)\s*([\])])/g)) {
      const [, lo, min, max, hi] = m;
      out.push({ raw: `${lo}${min},${max}${hi}`, min: min || null, minInc: lo === '[',
        max: max || null, maxInc: hi === ']' });
    }
    return out;
  }
  /* A third range spelling, which IS what vendor advisories print: `26.0.0-26.4.14`. It is split
     per comma like the comparison form, and the second version must START WITH A DIGIT so a
     prerelease (`4.5.0-rc.2`) is never read as a range — that ambiguity is why the narrowing is
     explicit rather than a bare `-`. */
  const hy = s.split(',').map(p => p.trim())
    .map(p => p.match(/^v?(\d[\w.+]*)\s*(?:-|–|—|\.\.|to)\s*v?(\d[\w.+-]*)$/i))
    .filter(Boolean)
    .map(m => ({ raw: `${m[1]}-${m[2]}`, min: m[1], minInc: true, max: m[2], maxInc: true }));
  if (hy.length) return hy;
  const r = { raw: s, min: null, minInc: false, max: null, maxInc: false };
  for (const part of s.split(',')) {
    const m = part.trim().match(/^(>=|<=|>|<|=)\s*(.+)$/);
    if (!m) continue;
    const [, op, ver] = m;
    if (op === '>=') { r.min = ver.trim(); r.minInc = true; }
    else if (op === '>') { r.min = ver.trim(); r.minInc = false; }
    else if (op === '<=') { r.max = ver.trim(); r.maxInc = true; }
    else if (op === '<') { r.max = ver.trim(); r.maxInc = false; }
    else { r.min = ver.trim(); r.minInc = true; r.max = ver.trim(); r.maxInc = true; }
  }
  return (r.min || r.max) ? [r] : [];
}

/* ── prose: the range nobody publishes as a cell ──
   Two of the three artifact calibration records had NO GitHub advisory at all, so the only
   affected range in existence was in the CVE description's own sentence. These parsers are
   deliberately narrow — one phrasing each — and every result is labelled `record prose` at the
   point of use, because prose extraction that is not attributable is indistinguishable from a
   guess. */
function proseRange(text) {
  if (!text) return null;
  const m = String(text).match(/\bversions?\s+v?(\d[\w.+]*)\s+(?:through|thru|to)\s+v?(\d[\w.+]*)/i);
  if (!m) return null;
  return { raw: `${m[1]}-${m[2]}`, min: m[1], minInc: true, max: m[2], maxInc: true, from: 'prose' };
}
/* "… update … to the latest available version: 1.0.10 or 1.1.1 or 1.2.1." — the fix list, in the
   vendor's words. Anchored on a phrase that names the fixed versions, so an affected range in the
   same paragraph ("between 1.0.3 through 1.2.0") cannot be mistaken for one. */
function prosePatched(text) {
  if (!text) return null;
  const m = String(text).match(/\b(?:latest\s+(?:available\s+)?(?:version|release)|patched\s+versions?|fixed\s+(?:in|versions?))\s*:?\s*((?:v?\d[\w.+]*\s*(?:,|\bor\b|\band\b|\/)\s*)+v?\d[\w.+]*)/i);
  if (!m) return null;
  return m[1].split(/\s*(?:,|\bor\b|\band\b|\/)\s*/i).map(s => s.trim().replace(/[.,;:]+$/, '')).filter(Boolean);
}
/* A date-shaped affected cell — `EDK II master as of 2026-09-14`. This is NOT a version range and
   NOT an introduction date: it is when the reporter took the snapshot. Kept as its own kind so the
   classifier never compares it to a tag date and concludes "not affected". */
function asOfDate(text) {
  if (!text) return null;
  const m = String(text).match(/\bas\s+of\s+(\d{4}-\d{2}-\d{2})/i);
  return m ? m[1] : null;
}
function inRange(v, r) {
  if (!r) return null;
  if (r.min) { const c = cmpVer(v, r.min); if (c < 0 || (c === 0 && !r.minInc)) return false; }
  if (r.max) { const c = cmpVer(v, r.max); if (c > 0 || (c === 0 && !r.maxInc)) return false; }
  return true;
}
const inAnyRange = (v, ranges) => (ranges?.length ? ranges.some(r => inRange(v, r)) : null);

/* ── fetchers ── */
async function getJson(url, headers = {}) {
  const res = await fetch(url, { headers: { ...UA, ...headers } });
  if (res.status === 404) return { status: 404, body: null };
  if (res.status === 403 || res.status === 429) return { status: res.status, body: null };
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
  return { status: 200, body: await res.json() };
}
async function getText(url) {
  const res = await fetch(url, { headers: UA, redirect: 'follow' });
  return { status: res.status, body: res.ok ? await res.text() : null };
}

/** NVD record, or null when the CVE id has no record (its own state — see `no-record`). */
async function nvdRecord(id) {
  const { status, body } = await getJson(`${NVD}?cveId=${encodeURIComponent(id)}`,
    NVD_API_KEY ? { apiKey: NVD_API_KEY } : {});
  if (status === 404) return null;
  if (!body) throw new Error(`NVD HTTP ${status} for ${id}`);
  return body.vulnerabilities?.[0]?.cve || null;
}

/** CPE ranges — empty for this cohort, kept because it is the answer when it exists. */
function nvdRanges(cve) {
  const out = [];
  for (const cfg of cve.configurations || []) {
    for (const node of cfg.nodes || []) {
      for (const m of node.cpeMatch || []) {
        if (!m.vulnerable) continue;
        const r = { raw: m.criteria, min: m.versionStartIncluding || m.versionStartExcluding || null,
          minInc: !!m.versionStartIncluding, max: m.versionEndExcluding || m.versionEndIncluding || null,
          maxInc: !!m.versionEndIncluding, from: 'nvd-cpe' };
        if (r.min || r.max) out.push(r);
      }
    }
  }
  return out;
}

const decode = s => s.replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'").replace(/&amp;/g, '&');

/** GitHub advisory HTML → { affected, patched }. The two cells are the machine-readable part.
 *
 *  A MULTI-LINE advisory renders ONE `<div class="f4">` PER LINE, and the first version of this
 *  parser read only the first one — which silently truncated Keycloak's CVE-2026-18963 from three
 *  ranges (`>= 26.0.0, < 26.4.15` / `>= 26.5.0, < 26.6.6` / `>= 26.7.0, < 26.7.2`) to one, on the
 *  exact records where the range is the whole story. Every value between the label and the next
 *  heading is collected and joined with ` | `, which `parseRanges` splits back into separate
 *  bounds. A truncated cell is worse than a missing one: it parses, and it is wrong. */
function parseAdvisoryHtml(html) {
  const cell = label => {
    const i = html.indexOf(`>${label}</h2>`);
    if (i < 0) return null;
    const seg = html.slice(i + label.length + 5);
    const stop = seg.indexOf('<h2');
    const scope = stop > 0 ? seg.slice(0, stop) : seg.slice(0, 1500);
    const vals = [...scope.matchAll(/class="f4 [^"]*"\s*>([^<]*)</g)]
      .map(m => decode(m[1]).trim()).filter(Boolean);
    return vals.length ? vals.join(' | ') : null;
  };
  return { affected: cell('Affected versions'), patched: cell('Patched versions') };
}

/** The advisory a CVE is filed against is not always in the repo that owns the code. Keycloak's
 *  CVE-2026-18963 has NO repo-scoped advisory and NO NVD reference to a GHSA — it lives only in
 *  the GitHub Advisory Database (`/advisories/GHSA-…`), which is a third-party ingest, not the
 *  vendor's own page. Without this path the tool sees `indeterminate` on a record whose range is
 *  published and unambiguous. Two HTML GETs, no api.github.com budget. */
async function advisoryFromDatabase(cveId) {
  const { body } = await getText(`https://github.com/advisories?query=${encodeURIComponent(cveId)}`);
  if (!body) return null;
  const ids = [...new Set([...body.matchAll(/GHSA-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}/g)].map(m => m[0]))];
  for (const ghsa of ids.slice(0, 3)) {
    const page = await getText(`https://github.com/advisories/${ghsa}`);
    if (!page.body) continue;
    const p = parseAdvisoryHtml(page.body);
    if (p.affected || p.patched) {
      const title = (page.body.match(/<title>([^<]*)<\/title>/i) || [])[1] || '';
      return { ...p, ghsa, url: `https://github.com/advisories/${ghsa}`, repo: null,
        title: decode(title).trim(), fromDatabase: true };
    }
  }
  return null;
}

const GHSA_URL_RE = /^https:\/\/github\.com\/([^/]+)\/([^/]+)\/(?:security\/advisories\/|advisories\/)(GHSA-[a-z0-9-]+)$/i;
async function advisoryFromRefs(refs) {
  for (const r of refs) {
    const m = (r || '').match(GHSA_URL_RE);
    if (!m) continue;
    const { status, body } = await getText(r);
    if (status !== 200 || !body) continue;
    const p = parseAdvisoryHtml(body);
    if (p.affected || p.patched) {
      const title = (body.match(/<title>([^<]*)<\/title>/i) || [])[1] || '';
      return { ...p, url: r, ghsa: m[3], repo: `${m[1]}/${m[2]}`, title: decode(title).trim() };
    }
  }
  return null;
}

/* The human bound — "through 4.7.6", "before 0.31.0" — from the advisory's own title/summary.
   It is checked against the machine-readable cell because the two disagree in the wild, and the
   disagreement is not cosmetic: on CVE-2026-114085 the repo advisory's cells read
   `<= 4.6.0` / `>= 4.6.0` (self-contradictory at 4.6.0 itself) while the very same advisory's
   summary says "Trigger.dev **through 4.7.6**". Trusting the cell would have produced a 36d
   `fix-then-record` for a bug whose fix landed 1d *after* the record. Neither number is discarded:
   the title supplies the bound and the fix is inferred as the first release past it, explicitly
   labelled, so the inference is visible instead of buried in a wrong date. */
function titleBound(text) {
  if (!text) return null;
  const m = text.match(/\b(through|before|prior to|up to)\s+v?(\d[\w.\-+]*)/i);
  if (!m) return null;
  return { ver: m[2], inclusive: !/^(before|prior to)$/i.test(m[1]), phrase: m[0] };
}

async function globalAdvisory(cveId) {
  const { body } = await getJson(`${GH}/advisories?cve_id=${encodeURIComponent(cveId)}`,
    { Accept: 'application/vnd.github+json' });
  const a = Array.isArray(body) ? body[0] : null;
  if (!a) return null;
  const v = (a.vulnerabilities || [])[0] || null;
  return {
    ghsa: a.ghsa_id,
    ingestionTs: a.published_at || null,   // NOT the advisory's own date on a bulk drop — see header
    summary: a.summary || null,
    severity: a.severity || null,
    range: v?.vulnerable_version_range || null,
    patched: v?.patched_versions || null,
  };
}

/* `releases.atom` is the unauthenticated twin of `/releases` — same publish instants, no rate
   limit, no budget. It was added because the 403 below fired for real on 2026-10-23 while
   calibrating Keycloak, and a tool that cannot read a timeline for an hour a day is a tool whose
   answer depends on when it runs. Titles are release NAMES (keycloak: "26.8.1"), so the tag in
   each entry's link is preferred over the title. */
async function repoReleasesAtom(repo) {
  const { status, body } = await getText(`https://github.com/${repo}/releases.atom`);
  if (status !== 200 || !body) return null;
  const out = [];
  for (const m of body.matchAll(/<entry>([\s\S]*?)<\/entry>/g)) {
    const e = m[1];
    const tag = (e.match(/releases\/tag\/([^"<]+)/) || [])[1];
    const title = (e.match(/<title>([^<]*)<\/title>/) || [])[1];
    const date = (e.match(/<updated>([^<]*)<\/updated>/) || [])[1];
    const version = decode(tag || title || '').trim();
    if (version && date) out.push({ version, date, name: decode(title || ''), prerelease: false, via: 'atom' });
  }
  return out.length ? out.sort((a, b) => cmpVer(a.version, b.version)) : null;
}

async function repoReleases(repo) {
  const { status, body } = await getJson(`${GH}/repos/${repo}/releases?per_page=100`,
    { Accept: 'application/vnd.github+json' });
  /* Every unauthenticated GitHub call in a session counts against 60/hr, and this repo spends a
     few of them per feed run. A rate-limited fetch must NOT degrade into "no release timeline" —
     that reads as "pass --repo" and sends you to fix a flag that is already correct. It falls back
     to the atom feed first, and only errors when BOTH routes are unavailable. */
  if (status === 403 || status === 429) {
    const atom = await repoReleasesAtom(repo);
    if (atom) { atom.via = 'atom'; return atom; }
    throw new Error(`api.github.com rate-limited (HTTP ${status}) and releases.atom unreadable — lag not computable, retry later`);
  }
  if (!Array.isArray(body)) return null;
  /* The API returns releases NEWEST FIRST by creation, which is not version order and is not even
     date order once backfilled tags exist. Sorting here is what makes `latest` mean latest — the
     first calibration run read Vibe-Trading's latest as v0.1.4 (April) while v0.1.7 (May) was the
     actual newest, which would have inverted its "still affected" answer. */
  return body.map(r => ({ version: r.tag_name, date: r.published_at, prerelease: r.prerelease, name: r.name }))
    .sort((a, b) => cmpVer(a.version, b.version));
}

/* The repo's OWN advisory list, which is the only place the real advisory dates live — and the
   measured gap that makes `backfill` visible: a CVE-keyed lookup cannot see an advisory that
   carries no `cve_id`, and most of them do not. */
async function repoAdvisories(repo) {
  const { body } = await getJson(`${GH}/repos/${repo}/security-advisories?per_page=100&state=published`,
    { Accept: 'application/vnd.github+json' });
  if (!Array.isArray(body)) return null;
  return body.map(a => ({ ghsa: a.ghsa_id, cve: a.cve_id || null, date: a.published_at, summary: a.summary }));
}

/* ── the artifact layer ──
   Three questions, three sources, none of them the CVE record:
 * `debianTracker` answers "can a Debian user install a fixed package today", per suite, and is
   also this tool's cheapest route to the FIX COMMIT: the tracker's Notes block carries
   `Fixed by: …/commit/<sha>` links, which is a third party naming the patch. One plain HTML GET.
 * `fixRefDate` turns a commit or pull URL into a date with NO api.github.com call — a commit page
   embeds `"committedDate":"…"` (when it landed on the branch, not when it was written; the
   `.patch` header's `Date:` is the author date and is the fallback, labelled as such) and a pull
   page embeds `"mergedTime":"…"`.
 * `newestArtifact` is the newest release in the timeline already fetched for the lag calculation —
   the same array, read for a different question. */
async function debianTracker(cveId) {
  const { status, body } = await getText(`https://security-tracker.debian.org/tracker/${cveId}`);
  if (status !== 200 || !body) return null;
  /* Rows come in two shapes: the first carries the source-package name and TWO anchors
     ("edk2 (PTS)"), every continuation row leaves that cell empty — so a cell-count parser is the
     only one that reads the whole table. The status column is matched by value, because that is
     what distinguishes the vulnerable-packages table from the fixed-versions table below it. */
  const STATUSES = /^(vulnerable|resolved|fixed|unfixed|ignored|not affected|end-of-life|no-dsa|unimportant)$/i;
  const suites = [];
  for (const tr of body.matchAll(/<tr>([\s\S]*?)<\/tr>/g)) {
    const tds = [...tr[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)]
      .map(m => decode(m[1].replace(/<[^>]+>/g, '')).trim());
    if (tds.length < 4 || !STATUSES.test(tds[3])) continue;
    suites.push({ package: tds[0].split(/\s*\(/)[0] || null, release: tds[1], version: tds[2], status: tds[3] });
  }
  const fixedCell = (body.match(/<th>Fixed Version<\/th>[\s\S]*?<td><span[^>]*>([^<]*)<\/span><\/td>/) || [])[1] || null;
  const commits = [...body.matchAll(/https:\/\/github\.com\/([^/"]+\/[^/"]+)\/commit\/([0-9a-f]{7,40})/g)]
    .map(m => ({ repo: m[1], sha: m[2], url: m[0] }));
  const prs = [...body.matchAll(/https:\/\/github\.com\/([^/"]+\/[^/"]+)\/pull\/(\d+)/g)]
    .map(m => ({ repo: m[1], n: m[2], url: m[0] }));
  return { suites, fixed: fixedCell ? decode(fixedCell).trim() : null, commits, prs };
}

async function fixRefDate(ref) {
  if (!ref) return null;
  const commit = ref.match(/github\.com\/([^/]+\/[^/]+)\/commit\/([0-9a-f]{7,40})/i)
    || (ref.match(/^([\w.-]+\/[\w.-]+)@?([0-9a-f]{7,40})$/i));
  if (commit) {
    const [, repo, sha] = commit;
    const page = await getText(`https://github.com/${repo}/commit/${sha}`);
    const m = page.body && page.body.match(/"committedDate":"([^"]+)"/);
    if (m) return { url: `https://github.com/${repo}/commit/${sha}`, date: m[1], kind: 'commit', label: 'committed' };
    const patch = await getText(`https://github.com/${repo}/commit/${sha}.patch`);
    const d = patch.body && patch.body.match(/^Date:\s*(.+)$/m);
    if (d) {
      const t = new Date(d[1]);
      if (!Number.isNaN(t.getTime()))
        return { url: `https://github.com/${repo}/commit/${sha}`, date: t.toISOString(), kind: 'commit', label: 'authored (no committer date on the page)' };
    }
    return null;
  }
  const pr = ref.match(/github\.com\/([^/]+\/[^/]+)\/pull\/(\d+)/i);
  if (pr) {
    const [, repo, n] = pr;
    const page = await getText(`https://github.com/${repo}/pull/${n}`);
    const body = page.body || '';
    const m = body.match(/"mergedTime":"([^"]+)"/);
    if (m) {
      const by = (body.match(/"mergedBy":"([^"]+)"/) || [])[1] || null;
      return { url: `https://github.com/${repo}/pull/${n}`, date: m[1], kind: 'pull', label: `merged${by ? ` by ${by}` : ''}` };
    }
    if (/Merged<\/span>|"state":"MERGED"/.test(body)) return { url: `https://github.com/${repo}/pull/${n}`, date: null, kind: 'pull', label: 'merged, merge date unreadable' };
    return { url: `https://github.com/${repo}/pull/${n}`, date: null, kind: 'pull', label: 'no merge timestamp on the page — not merged, or the page is a shell' };
  }
  return null;
}

/* The artifact verdict. Deliberately refuses in three situations rather than guessing:
   no fix date, no artifact timeline, and a cell-vs-commit disagreement (which is printed as a
   disagreement instead of being resolved in favour of either source). */
function artifactVerdict({ record, advisory, timeline, mode, fixRef, debian, patched, cellSource }) {
  const out = { mode, cell: patched !== undefined ? patched : (advisory?.patched ?? null),
    cellSource: cellSource || (patched !== undefined ? 'cell' : 'cell'), notes: [] };
  const fixedList = fixedVersionsFrom(out.cell);
  const newest = timeline?.length ? timeline[timeline.length - 1] : null;
  out.newest = newest ? { version: newest.version, date: newest.date } : null;

  let fix = fixRef || null;                       // resolved by the caller into {url,date,label}
  if (debian) {
    out.debian = debian;
    if (!fix && debian.commits?.length) {
      fix = { url: debian.commits[0].url, date: null, kind: 'debian-commit', label: 'unresolved' };
      out.notes.push(`fix ref taken from the Debian tracker's own "Fixed by:" link (${debian.commits.length} commit(s) listed)`);
    }
  }
  if (fix) out.fixRef = fix;
  if (out.cell === 'Not patched currently') out.notes.push('the advisory cell says the artifact is NOT patched, which is a statement about the installer, not about the source tree');

  if (!out.newest) { out.state = 'indeterminate'; out.notes.push('no artifact timeline (pass --repo or --pypi, or --debian for a distro view)'); return out; }
  if (fix && !fix.date) { out.state = 'indeterminate'; out.notes.push(`the fix ref carries no usable date (${fix.label})`); return out; }

  /* A cell that names patched versions is a claim about ARTIFACTS, and a multi-line cell names
     several — all of them must be looked up, because the timeline may hold only some of them
     (Keycloak's atom feed carries 26.6.6 and 26.7.2 but not 26.4.15, and reading only the first
     version reported "not in the timeline" about a fix that plainly shipped). */
  const shipped = fixedList.map(v => ({ v, rel: timelineLookup(timeline, v) })).filter(x => x.rel)
    .sort((a, b) => (ts(a.rel.date) ?? 0) - (ts(b.rel.date) ?? 0));
  const topShipped = shipped[shipped.length - 1] || null;

  /* If the commit that fixes it landed after the LAST artifact the cell calls patched, the two
     sources contradict each other and NEITHER is discarded: that is the one case where a verdict
     would be an invention. */
  if (fix?.date && topShipped && ts(fix.date) > ts(topShipped.rel.date)) {
    out.state = 'indeterminate';
    out.notes.push(`CELL-vs-COMMIT DISAGREEMENT — the advisory names ${fixedList.join(', ')} as patched (latest shipped: ${topShipped.v} on ${ymd(topShipped.rel.date)}), but the fix commit is dated ${ymd(fix.date)}; the cell cannot be true of that artifact, so no artifact verdict is emitted`);
    return out;
  }

  if (!fix?.date) {
    if (shipped.length) {
      out.state = 'artifact-carries-fix';
      out.notes.push(`${shipped.map(s => `${s.v} (${ymd(s.rel.date)})`).join(', ')} released — an installable artifact carries the fix`);
      const missing = fixedList.filter(v => !shipped.some(s => s.v === v));
      if (missing.length) out.notes.push(`not in the release timeline: ${missing.join(', ')} — older lines may have been dropped from the feed, so this is a gap in the timeline, not evidence the release is missing`);
    } else {
      out.state = 'indeterminate';
      out.notes.push(fixedList.length
        ? `the advisory names ${fixedList.join(', ')}, none of which is in the timeline`
        : out.cell !== null && out.cell !== undefined
          ? `the advisory's own patched cell is "${out.cell}" — no fix exists for an artifact to carry`
          : 'no fix ref and no patched-version cell — the artifact question cannot be answered from these two sources');
    }
    return out;
  }

  if (ts(fix.date) > ts(newest.date)) {
    out.state = 'fix-in-source-no-artifact';
    out.notes.push(`the fix landed ${ymd(fix.date)} but the newest ${mode === 'firmware' ? 'tagged release' : 'artifact'} is ${newest.version} (${ymd(newest.date)}) — nothing a consumer can install carries it`);
    if (mode === 'firmware') out.notes.push('firmware is built and signed by a party other than the code owner, so this is PERMANENT for the installed base until a vendor rebuilds — not a release that is "pending"');
  } else {
    out.state = 'artifact-carries-fix';
    out.notes.push(`the fix landed ${ymd(fix.date)}, at or before ${newest.version} (${ymd(newest.date)}) — an installable artifact carries it`);
  }
  return out;
}

/* One release's date, without the API. `releases.atom` carries only the most recent handful, so a
   degraded timeline says "does not contain this version" about a version that shipped two years
   ago — a true statement that reads like a missing release (Trigger.dev's 4.6.0, calibrated
   2026-10-23). The tag page carries its own `<relative-time datetime>`, one GET. */
async function tagDate(repo, version) {
  for (const v of [version, `v${version}`]) {
    const { status, body } = await getText(`https://github.com/${repo}/releases/tag/${encodeURIComponent(v)}`);
    if (status !== 200 || !body) continue;
    const m = body.match(/(?:datetime="|"publishedAt":")(\d{4}-\d{2}-\d{2}T[0-9:.]+Z)/);
    if (m) return { version, date: m[1], name: v, prerelease: false, via: 'tag page' };
  }
  return null;
}

async function pypiReleases(pkg) {
  const { status, body } = await getJson(`https://pypi.org/pypi/${pkg}/json`);
  if (status === 404 || !body) return null;
  const out = [];
  for (const [version, files] of Object.entries(body.releases || {})) {
    const f = (files || []).find(x => x.upload_time_iso_8601) || (files || [])[0];
    if (f?.upload_time_iso_8601) out.push({ version, date: f.upload_time_iso_8601 });
  }
  out.sort((a, b) => cmpVer(a.version, b.version));
  return out;
}

/* ── the announcement axis (added 2026-10-24 04:28) ────────────────────────────────────────────
 * "What can I install?" has a FOURTH document beyond record / commit / artifact: the release
 * ANNOUNCEMENT, which is frequently the only artifact that states a version in plain prose — and
 * the only one written in the consumer's unit ("24.10.8 fixes it") rather than the component's
 * ("patched in version 25.12"). The 10-24 batch's OpenWrt case is why this exists: the GHSA cell
 * read `Patched versions: None`, the record's own prose said "patched in version 25.12", the
 * odhcpd repo's `openwrt-24.10` branch contained none of the three fixes (they ship as patch files
 * in the openwrt/openwrt tree, patches 0030/0031/0033, over a source pinned at b14cf98c from
 * 2025-10-02) — and the 24.10.8 announcement named the CVE, the GHSA, the release (r29233) and the
 * series' EoL projection. Four documents, four answers, one of them actionable.
 *
 * `--release-notes <url>[,<url>…]` takes one or more announcement URLs and answers, per page:
 * does it name this CVE, which release does it name, when was that released, and what does it say
 * about the end of the line. Passing several pages is the point — the OpenWrt question "does
 * 25.12 carry the fix?" has THREE different answers across 25.12.0 / 25.12.5 / 25.12.6, and only
 * the matrix shows that (0 / 1 / 0 occurrences of the id). Never infer from one page.
 *
 * The state `advisory-none-but-notes-name-it` fires only when the advisory cell names NO patched
 * version (`None`, `Unknown`, absent) and an announcement names the CVE — the case where the cell
 * is not merely terse but contradicts a shipped artifact. The version-axis state is kept and
 * printed on its own `temporal` line, exactly as `--artifact` does. A page that does not name the
 * CVE never changes the state; it is reported as `notes-do-not-name-it` and the existing state
 * stands (the EDK2 calibration: its blog posts exist and name no version, so EDK2 must stay
 * `fix-in-source-no-artifact`).
 */
const MONTHS = { january: 1, february: 2, march: 3, april: 4, may: 5, june: 6, july: 7,
  august: 8, september: 9, october: 10, november: 11, december: 12 };

/* Announcement dates come in at least three spellings on ONE wiki, which is how this got written:
   DokuWiki's English locale renders "26th July 2026" and its German locale renders "1. July 2026"
   for the same field. A parser that knows one of them silently reports the date as absent, and
   `?` in a date column reads as "no release" rather than "not parsed". */
function proseDate(s) {
  if (!s) return null;
  const str = String(s);
  let m = str.match(/(\d{4})-(\d{2})-(\d{2})/);
  if (m) return `${m[1]}-${m[2]}-${m[3]}`;
  m = str.match(/(\d{1,2})(?:st|nd|rd|th)?\.?\s+([A-Za-z]{3,9})\.?,?\s+(\d{4})/);
  if (m && MONTHS[m[2].toLowerCase()]) {
    return `${m[3]}-${String(MONTHS[m[2].toLowerCase()]).padStart(2, '0')}-${m[1].padStart(2, '0')}`;
  }
  m = str.match(/([A-Za-z]{3,9})\.?\s+(\d{1,2})(?:st|nd|rd|th)?,?\s+(\d{4})/);
  if (m && MONTHS[m[1].toLowerCase()]) {
    return `${m[3]}-${String(MONTHS[m[1].toLowerCase()]).padStart(2, '0')}-${m[2].padStart(2, '0')}`;
  }
  return null;
}

/* The page's own claim about itself. Prefer the <title> ("OpenWrt 24.10.8 - Service Release -
   26th July 2026"), fall back to the banner a release announcement carries in its body
   ("OpenWrt 24.10.8, r29233-443ec4032a"). Both are the publisher's words; neither is inferred
   from the URL, because a versioned URL can serve an unversioned page and vice versa. */
function parseNotesPage({ url, title = '', text = '', cveId }) {
  const out = { url, title: (title || '').trim() || null, version: null, date: null, revision: null,
    eol: null, migrateTo: null, names: false, context: null, noCveFixes: 0, status: 'ok' };
  const hay = `${title} ${text}`;
  /* The version is the page's SELF-DESCRIPTION or it is nothing. A global version scan over the
     body is the defect the EDK2 control found live: GitHub's releases index carries "3.5.1" in an
     unrelated row, and a scanner that took the first match reported the release as 3.5.1 — a number
     that belongs to no EDK II artifact at all. So: the <title> ("OpenWrt 24.10.8 - Service Release
     …"), or a banner that puts the version beside its own revision id ("OpenWrt 24.10.8, r29233"). */
  const fromTitle = (title || '').match(/\bv(\d+(?:\.\d+)+)\b|\b(\d+\.\d+(?:\.\d+)+)\b/);
  if (fromTitle) out.version = fromTitle[1] || fromTitle[2];
  const rm = hay.match(/\b(r\d{4,6})\b/);
  if (rm) out.revision = rm[1];
  if (!out.version && out.revision) {
    const banner = hay.match(/\bv?(\d+\.\d+(?:\.\d+)?)\s*,\s*[\w.\-]*r\d{4,6}\b/i);
    if (banner) out.version = banner[1];
  }
  // The date comes from the title when it is there — the body of a release announcement is full of
  // OTHER dates (the packages' build dates, the previous release's), so a global date scan is wrong.
  out.date = proseDate(title) || null;
  const eol = text.match(/(?:end[\s-]of[\s-]life|EoL)[^.]{0,120}/i);
  if (eol) {
    const when = eol[0].match(/([A-Za-z]+)\s+(\d{4})/);
    if (when) out.eol = `${when[1]} ${when[2]}`;
    out.eolSentence = eol[0].trim();
  }
  const mig = text.match(/migrat\w*\s+to\s+([A-Za-z][\w.\- ]{0,24}\d+(?:\.\d+)*)/i);
  if (mig) out.migrateTo = mig[1].trim();
  if (cveId) {
    const i = text.toUpperCase().indexOf(cveId.toUpperCase());
    out.names = i >= 0;
    if (out.names) out.context = text.slice(i, i + 190).replace(/\s+/g, ' ').trim();
  }
  // "…fixed with no CVE at all" is a finding in its own right: a shipped fix that no record can
  // ever be keyed on. Counted, not listed, because the phrase is what is machine-detectable.
  // The optional prefix must be a bounded ANY-text run, not `\w+, ` — the real page writes
  // "(Moderate, CVSS 5.4, no CVE assigned)", and a one-comma pattern silently counted 3 of 4.
  out.noCveFixes = (text.match(/\([^()]{0,60}?\bno CVE\b[^()]{0,30}?\)/gi) || []).length;
  return out;
}

async function releaseNotesPage(url, cveId) {
  const { status, body } = await getText(url);
  if (status !== 200 || !body) return { url, status: `unreadable (HTTP ${status})`, names: false, version: null, date: null, noCveFixes: 0 };
  // A gate is a third state, not an absence (CLAUDE.md rule 7 / doc-twin.mjs): a Cloudflare
  // interstitial and a page that does not say something are different sentences.
  if (/Just a moment|Enable JavaScript and cookies to continue|cf-chl/i.test(body)) {
    return { url, status: 'JS gate — could not read it, which is not the same as "it does not say that"', names: false, version: null, date: null, noCveFixes: 0 };
  }
  const title = decode((body.match(/<title>([^<]*)<\/title>/i) || [])[1] || '');
  const text = decode(body.replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
  return parseNotesPage({ url, title, text, cveId });
}

/* The matrix over pages, plus the one inference worth making: when the pages name the CVE on SOME
   release of a line and not others, the earliest naming release is the answer to "from which patch
   level", which is a different question from "is the line patched". Labelled as derived. */
function notesVerdict({ pages, cell, cveId }) {
  const live = pages.filter(p => p.status === 'ok');
  const named = live.filter(p => p.names);
  const out = { cve: cveId, state: null, pages: pages.length, named: named.length, pageList: pages,
    version: null, versions: [], date: null,
    eol: live.find(p => p.eol)?.eol || null, migrateTo: live.find(p => p.migrateTo)?.migrateTo || null,
    earliestPatchedLevel: null, noCveFixes: 0,
    notes: [] };
  if (!live.length) {
    out.state = 'notes-unreadable';
    out.notes.push('no announcement page could be read — an unreadable page is not a page that omits it');
    return out;
  }
  const sorted = named.filter(p => p.version)
    .sort((a, b) => cmpVer(a.version, b.version));
  /* A per-page count, never a sum: three "no CVE" fixes spread across four announcements belong to
     three different releases, and an aggregate reads as though one release shipped all three. */
  out.noCveFixes = pages.reduce((n, p) => n + (p.noCveFixes || 0), 0);
  /* Several naming releases is the COMMON case (a line backports the fix at its next point
     release while the previous line already had it), so the verdict names all of them rather than
     picking the first page that happened to be listed first on the command line. */
  out.versions = sorted.map(p => p.version);
  out.version = out.versions[0] || null;
  out.date = sorted[0]?.date || null;
  if (sorted.length > 1) {
    out.earliestPatchedLevel = sorted[0].version;
    out.notes.push(`named on ${sorted.length} of ${live.length} readable pages: ${sorted.map(p => `${p.version}${p.date ? ` (${p.date})` : ''}`).join(', ')} — "upgrade to <line>" without a patch level is ambiguous`);
  }
  const silent = live.filter(p => !p.names && p.version);
  if (named.length && silent.length) {
    out.notes.push(`names the id on ${sorted.map(p => p.version).join(', ')} and NOT on ${silent.map(p => p.version).join(', ')} — silence in a later note is not a regression, but silence in an earlier one is not a fix`);
  }
  const cellBlocks = !cell || /^(none|unknown|n\/a)$/i.test(String(cell).trim());
  if (named.length && cellBlocks) {
    out.state = 'advisory-none-but-notes-name-it';
    out.notes.push(`the advisory's patched cell is ${cell === null || cell === undefined ? 'absent' : `"${cell}"`}, while the announcement names ${cveId} fixed in ${out.versions.join(', ')} — the artifact exists and the cell does not describe it`);
  } else if (!named.length) {
    out.state = 'notes-do-not-name-it';
    out.notes.push(`read ${live.length} page(s) (${live.map(p => p.version || 'unversioned').join(', ')}); none names ${cveId} — this does not clear them, it only means the announcement does not carry the id`);
  }
  if (out.eol) out.notes.push(`the series' own end-of-life statement reads: "${out.eol}"${out.migrateTo ? `, recommending migration to ${out.migrateTo}` : ''}`);
  const withNoCve = live.filter(p => p.noCveFixes);
  if (withNoCve.length) {
    out.notes.push(`sibling fixes labelled "no CVE" — ${withNoCve.map(p => `${p.version || 'unversioned'}: ${p.noCveFixes}`).join(', ')} — a COUNT of unrecorded fixes, not of independent bugs`);
  }
  return out;
}

/* ── classification ── */
const DAY = 86400000;
/* NVD dates have NO timezone suffix (`2026-10-21T01:17:28.083`). Handed straight to `new Date()`
   they parse as HOST-LOCAL — the first calibration run on this very tool read 15d where the hand
   count said 16d, because UTC+8 swallowed eight hours and flipped the rounded day. Python ISO
   timestamps carry six fractional digits, which V8 accepts; anything unparseable returns null
   rather than NaN so a missing date cannot silently become a lag of "NaN". */
function ts(s) {
  if (!s) return null;
  const str = String(s).trim();
  const t = Date.parse(/(?:Z|[+-]\d{2}:?\d{2})$/.test(str) ? str : `${str}Z`);
  return Number.isNaN(t) ? null : t;
}
const days = (a, b) => {                       // b is earlier → positive
  const A = ts(a), B = ts(b);
  if (A === null || B === null) return null;
  return Math.round((A - B) / DAY);
};
const ymd = s => { const t = ts(s); return t === null ? '?' : new Date(t).toISOString().slice(0, 10); };

function timelineLookup(timeline, version) {
  if (!timeline || !version) return null;
  const want = String(version).trim();
  let hit = timeline.find(t => t.version === want);
  if (!hit) hit = timeline.find(t => cmpVer(t.version, want) === 0);
  return hit || null;
}

/* Patched cells come in both shapes too: `>= 4.7.7`, or a comma LIST for a multi-line fix
   (`2.5.303, 3.1.9`). Return every version named, so a two-branch advisory can pick the earliest
   fix that actually shipped instead of the first string in the cell. */
function fixedVersionsFrom(patched) {
  if (!patched || /^(unknown|none|n\/a)$/i.test(String(patched).trim())) return [];
  const cleaned = String(patched).replace(/(>=|<=|>|<|=)/g, ' ').trim();
  return cleaned.split(/\s*\|\s*|,/).map(s => s.trim())
    .map(s => (s.match(/(\d[\w.\-+]*)/) || [])[1]).filter(Boolean);
}
const fixedVersionFrom = p => fixedVersionsFrom(p)[0] || null;

function classify({ id, record, nvdRanges: cpes, advisory, timeline, repoAdv, trackerId, timelineError,
  rangeOverride = RANGE_OVERRIDE }) {
  const base = { id, kind: trackerId ? 'tracker' : 'cve', sources: {}, lagDays: null, notes: [] };

  if (trackerId) {
    // no CVE id exists → nothing else can be looked up. This IS the finding.
    return { ...base, state: 'pre-record',
      notes: [`no CVE id exists for ${trackerId} (NVD keywordSearch totalResults 0)`] };
  }

  if (!record) {
    // Absence of an NVD record is a record-level state, and the advisory may still exist —
    // "pending" and "absent" are different sentences (CVE-2026-92707 precedent).
    if (advisory) base.notes.push(`GHSA exists (${advisory.ghsa}, ingested ${advisory.ingestionTs?.slice(0, 10)}) — the record is pending, not absent`);
    return { ...base, state: 'no-record',
      notes: [...base.notes, 'no lag can be computed: there is no record date'] };
  }

  base.recordDate = record.published || null;
  base.recordStatus = record.vulnStatus || null;
  base.sources.record = 'nvd';

  /* range: NVD CPE → advisory HTML → global advisory → operator override → the record's own prose
     → give up (indeterminate, never a guess). The last two were added 2026-10-23 because two of
     the three artifact calibration records published their range in NEITHER of the first three. */
  let ranges = cpes || [];
  let patchedRaw = null;
  const desc = (record.descriptions || []).find(d => d.lang === 'en')?.value
    || record.descriptions?.[0]?.value || null;
  if (ranges.length) {
    base.sources.range = ranges[0].from;
  } else if (advisory?.affected) {
    base.sources.range = advisory.url;
    ranges = parseRanges(advisory.affected);
    patchedRaw = advisory.patched;
  } else if (advisory?.range) {
    base.sources.range = `github advisory ${advisory.ghsa}`;
    ranges = parseRanges(advisory.range);
    patchedRaw = advisory.patched;
  } else if (rangeOverride) {
    base.sources.range = 'operator-supplied (--range)';
    ranges = parseRanges(rangeOverride);
  } else {
    const pr = proseRange(desc);
    if (pr) { ranges = [pr]; base.sources.range = 'record prose'; }
  }
  if (!ranges.length && patchedRaw === null && advisory) patchedRaw = advisory.patched;
  /* The fix list, when no cell published one — the vendor's own sentence ("… to the latest
     available version: 1.0.10 or 1.1.1 or 1.2.1"), labelled so it is never mistaken for a cell. */
  if (!patchedRaw) {
    const pp = prosePatched(desc);
    if (pp?.length) { patchedRaw = pp.join(', '); base.sources.patched = 'record prose'; }
  }
  base.range = ranges.length ? ranges.map(r => r.raw).join(' | ') : (advisory?.affected || advisory?.range || null);
  base.patched = patchedRaw;
  base.rangeKind = ranges.length ? 'version' : 'none';

  if (!ranges.length) {
    /* A DATE-shaped cell is not a failure to parse — it is a different kind of claim, and the
       version-axis states cannot express it. Record the kind and let the artifact axis speak. */
    const asOf = asOfDate(advisory?.affected);
    if (asOf) {
      base.rangeKind = 'date';
      base.asOf = asOf;
      base.notes.push(`the affected cell is a DATE ("${advisory.affected}"), not a version range — it is when the reporter took the snapshot, not when the bug was introduced, so an artifact older than ${asOf} is NOT thereby clean`);
    }
    return { ...base, state: 'indeterminate',
      notes: [...base.notes, 'no affected version range attributable — refusing to infer a lag from the record date alone'] };
  }

  const latest = timeline?.length ? timeline[timeline.length - 1] : null;
  const stillAffected = latest ? inAnyRange(latest.version, ranges) : null;

  // backfill: an advisory carrying THIS cve_id, published >7d before the record
  if (repoAdv?.length) {
    const own = repoAdv.find(a => a.cve === id);
    const adviceLag = own ? days(base.recordDate, own.date) : null;
    if (own && adviceLag !== null && adviceLag > 7) {
      return { ...base, state: 'backfill', lagDays: adviceLag,
        advisoryDate: own.date, advisoryGhsa: own.ghsa,
        sources: { ...base.sources, advisory: `repo advisory ${own.ghsa}` },
        notes: [...base.notes, `repo advisory ${own.ghsa} published ${ymd(own.date)} — the CVE id was attached ${adviceLag}d later`,
          'sort by version range, not by record date'] };
    }
  }

  /* Cross-check the cell against the human bound before deriving a fix version from it. A cell
     that has no upper bound (Vyper's `>= 0.3.8`) is not a disagreement — it is an open range — so
     only a PRESENT max that differs from the title is flagged. */
  /* The representative upper bound is the HIGHEST across branches: "through 4.7.6" describes the
     newest affected line, so comparing it against the lowest branch's max would flag every
     multi-line advisory. */
  const top = ranges.filter(r => r.max).sort((a, b) => cmpVer(b.max, a.max))[0] || null;
  const tb = titleBound(advisory?.summary || advisory?.title || record.descriptions?.[0]?.value);
  let contradicted = null;
  if (tb && top) {
    const same = cmpVer(tb.ver, top.max) === 0 && top.maxInc === tb.inclusive;
    if (!same) contradicted = { cell: `${top.maxInc ? '<=' : '<'} ${top.max}`, title: tb.phrase, titleVer: tb.ver };
  }
  const patchedList = fixedVersionsFrom(patchedRaw);
  const overlapping = patchedList.filter(p => inAnyRange(p, ranges) === true);
  /* Only a TOTAL overlap is a contradiction. A multi-line fix (Brotli: 1.0.10, 1.1.1 and 1.2.1
     for 1.0.3–1.2.0) names patch releases that sort BELOW the top of the affected range while
     still being real fixes for their own line — the version strings overlap the range and the fix
     is still coherent. Earlier this check fired on exactly that shape, producing a false
     "RANGE DISAGREEMENT" on the calibration record itself. */
  if (top && overlapping.length && overlapping.length === patchedList.length) {
    contradicted = contradicted || { cell: `affected ${base.range} vs patched ${patchedRaw}`, title: tb?.phrase || null, titleVer: tb?.ver || null };
    base.notes.push(`EVERY patched version (${overlapping.join(', ')}) is inside ${base.range} — the cell cannot describe a fix`);
  } else if (overlapping.length) {
    base.notes.push(`multi-line fix: ${overlapping.join(', ')} sort inside ${base.range} but one release (${patchedList.filter(p => !overlapping.includes(p)).join(', ')}) escapes it — a per-line patch set, not a contradiction`);
  }
  if (contradicted) {
    base.contradicted = contradicted;
    base.notes.push(`RANGE DISAGREEMENT — cell says ${contradicted.cell}${contradicted.title ? `, the advisory's summary says "${contradicted.title}"` : ''}; neither is discarded below`);
  }

  let fixVersion = fixedVersionFrom(patchedRaw);
  let fixInferred = false;
  /* Multi-branch advisory: several patched versions, so "the fix date" is genuinely plural. The
     tool reports the EARLIEST shipped one — the first moment a fix existed — and names the rest,
     because "when did this get fixed" has a different answer for each release line. */
  if (patchedList.length && timeline) {
    const cands = patchedList.map(v => ({ v, rel: timelineLookup(timeline, v) }))
      .filter(x => x.rel).sort((a, b) => (ts(a.rel.date) ?? 0) - (ts(b.rel.date) ?? 0));
    if (cands.length) {
      fixVersion = cands[0].v;
      if (cands.length > 1) {
        base.multiFix = cands.map(c => `${c.v} (${ymd(c.rel.date)})`);
        base.notes.push(`multi-branch fix, earliest first: ${cands.map(c => `${c.v} on ${ymd(c.rel.date)}`).join(', ')}`);
      }
    }
  }
  if (contradicted && contradicted.titleVer && timeline) {
    /* Prefer the title bound when the cell is unusable: the fix is the first release strictly
       past the title's max. Labelled, because "first release after 4.7.6" is an inference about
       the patch, not a published `patched versions` cell. */
    const cand = timeline.find(t => cmpVer(t.version, contradicted.titleVer) > 0);
    if (cand && (!fixVersion || cmpVer(cand.version, fixVersion) !== 0)) {
      fixVersion = cand.version;
      fixInferred = true;
      base.notes.push(`fix inferred as the first release past ${contradicted.titleVer}: ${cand.version} (not a published patched-version cell)`);
    }
  }
  if (fixInferred) base.fixInferred = true;
  /* A cell that contradicts itself cannot yield a fix date, and picking the cell silently is the
     exact failure the 10-22 calibration recorded: Trigger.dev's `<= 4.6.0` / `>= 4.6.0` produces a
     36d lag for a fix that landed 1d AFTER the record. The summary bound ("through 4.7.6") is what
     rescues it — and on 2026-10-23 that bound was unreachable, because it lives ONLY in the
     api.github.com advisory object, which was rate-limited; the GHSA HTML page carries the prose
     Summary but not that one-line title. So: no title bound → no verdict. Refusing is the answer. */
  if (contradicted && !contradicted.titleVer) {
    return { ...base, state: 'indeterminate',
      notes: [...base.notes, 'the advisory\'s cells contradict each other and no human-readable bound is readable this run — refusing to derive a lag from a cell that cannot describe a fix (the one-line summary lives only in api.github.com\'s advisory object)'] };
  }

  if (!fixVersion) {
    if (patchedRaw === null || patchedRaw === undefined) {
      return { ...base, state: 'indeterminate',
        notes: [...base.notes, 'range known but no patched-version cell published'] };
    }
    // "None" — no fix exists. Exposure is open-ended iff the latest release is in range.
    return { ...base, state: 'no-fix',
      latest: latest?.version || null, latestDate: latest?.date || null, stillAffected,
      notes: [...base.notes, `patched versions: ${patchedRaw}`,
        latest ? `latest release ${latest.version} (${latest.date?.slice(0, 10)}) is ${stillAffected ? 'STILL affected' : 'outside the range'}` : 'no release timeline supplied',
        stillAffected ? 'the only mitigation is the advisory\'s workaround, not an upgrade' : 'a fixed release exists outside the advisory\'s cell'] };
  }

  const fixRelease = timelineLookup(timeline, fixVersion);
  if (!fixRelease) {
    return { ...base, state: 'indeterminate', fixVersion,
      notes: [...base.notes, `fixed version ${fixVersion} is not in the release timeline — ` +
        (timelineError ? `the timeline was not fetched: ${timelineError}`
          : timeline ? 'the timeline was fetched but does not contain this version'
            : 'no timeline supplied (pass --pypi or --repo)')] };
  }
  const lag = days(base.recordDate, fixRelease.date);
  const out = { ...base, fixVersion, fixDate: fixRelease.date, lagDays: lag,
    latest: latest?.version || null, latestDate: latest?.date || null, stillAffected };

  if (lag === null) {
    return { ...out, state: 'indeterminate',
      notes: [...base.notes, `could not parse a date pair (record ${base.recordDate} / fix ${fixRelease.date})`] };
  }
  if (lag < 0) {
    return { ...out, state: 'record-then-fix',
      notes: [...base.notes, `the record is ${-lag}d older than the fix release — exposure was real when the CVE was published`] };
  }
  const state = lag > 90 ? 'fix-predates-record' : 'fix-then-record';
  return { ...out, state,
    notes: [...base.notes, `fix ${fixVersion} shipped ${lag}d before the record — the disclosure lag was the exposure window`,
      latest ? `latest release ${latest.version} (${latest.date?.slice(0, 10)}) is ${stillAffected ? 'STILL in the affected range' : 'outside the affected range'}` : ''] };
}

/* ── selftest ──
   The parsers are the part that fails silently, so they are asserted rather than trusted. Every
   case below is a shape that produced a wrong answer by hand at least once. */
if (SELFTEST) {
  const cases = [];
  const eq = (name, got, want) => cases.push({ name, ok: JSON.stringify(got) === JSON.stringify(want), got, want });
  eq('hyphen range (advisory spelling)', parseRanges('26.0.0-26.4.14, 26.5.0-26.6.5').map(r => r.raw), ['26.0.0-26.4.14', '26.5.0-26.6.5']);
  eq('prerelease is not a hyphen range', parseRanges('4.5.0-rc.2'), []);
  eq('comparison range still parses', parseRanges('>= 0.7.3, < 0.31.0').length, 1);
  eq('interval range still parses', parseRanges('[,2.5.303), [3.0,3.1.9)').map(r => r.raw), ['[,2.5.303)', '[3.0,3.1.9)']);
  eq('prose affected range', proseRange('in Google Brotli versions 1.0.3 through 1.2.0 on all platforms')?.max, '1.2.0');
  eq('prose patched list', prosePatched('Users need to update any Brotli libraries or binaries to the latest available version: 1.0.10 or 1.1.1 or 1.2.1.'), ['1.0.10', '1.1.1', '1.2.1']);
  eq('prose patched ignores an affected range', prosePatched('versions 1.0.3 through 1.2.0 on all platforms'), null);
  eq('as-of cell is a date, not a version', asOfDate('EDK II master as of 2026-09-14'), '2026-09-14');
  const tl = [
    { version: '2026.05', date: '2026-05-22T09:39:39Z' },
    { version: '2026.08', date: '2026-08-21T14:22:24Z' },
  ];
  const v1 = artifactVerdict({ record: {}, advisory: { patched: 'Not patched currently' }, timeline: tl,
    mode: 'firmware', fixRef: { url: 'x', date: '2026-10-15T00:09:14Z', label: 'committed' } });
  eq('EDK2: commit after the newest tag', v1.state, 'fix-in-source-no-artifact');
  const v2 = artifactVerdict({ record: {}, advisory: { patched: '>= 2026.09' }, timeline: [
    { version: '2026.08', date: '2026-08-21T14:22:24Z' }, { version: '2026.09', date: '2026-09-01T00:00:00Z' }],
    mode: 'firmware', fixRef: { url: 'x', date: '2026-10-15T00:00:00Z', label: 'committed' } });
  eq('cell vs commit disagreement refuses a verdict', v2.state, 'indeterminate');
  const v3 = artifactVerdict({ record: {}, advisory: { patched: '>= 1.2.1' }, timeline: [
    { version: '1.2.0', date: '2025-10-21T00:00:00Z' }, { version: '1.2.1', date: '2026-10-21T19:27:20Z' }],
    mode: 'package' });
  eq('patched cell shipped as an artifact', v3.state, 'artifact-carries-fix');
  /* ── the announcement axis: three date spellings on one wiki, and the EoL sentence ── */
  eq('announcement date, English ordinal', proseDate('OpenWrt 24.10.8 - Service Release - 26th July 2026'), '2026-07-26');
  eq('announcement date, Germanic ordinal', proseDate('OpenWrt 25.12.5 - Service Release - 1. July 2026'), '2026-07-01');
  eq('announcement date, US order', proseDate('Released July 26, 2026'), '2026-07-26');
  eq('announcement date, ISO', proseDate('2026-10-18 service release'), '2026-10-18');
  eq('a body-only date is not the release date', proseDate('see changelog-25.12.5 for details'), null);
  const pg = parseNotesPage({
    url: 'u', cveId: 'CVE-2026-53921', title: 'OpenWrt 24.10.8 - Service Release - 26th July 2026',
    text: 'OpenWrt 24.10.8, r29233-443ec4032a CVE-2026-53921 (Critical): stack buffer overflow in the DHCPv6 IA reply serialization. GHSA-7fwx-hhrg-3496 Reconfigure-Accept stack buffer overflow (High, no CVE assigned) The OpenWrt 24.10 series is in security maintenance, with end of life (EoL) projected for September 2026. We recommend migrating to OpenWrt 25.12 before then.' });
  eq('names the CVE', pg.names, true);
  eq('names the release', pg.version, '24.10.8');
  eq('reads the revision', pg.revision, 'r29233');
  eq('reads the release date', pg.date, '2026-07-26');
  eq('reads the EoL projection', pg.eol, 'September 2026');
  eq('reads the migration target', pg.migrateTo, 'OpenWrt 25.12');
  eq('counts the no-CVE sibling fix', pg.noCveFixes, 1);
  eq('no-CVE count survives a two-comma severity cell', parseNotesPage({ url: 'u', cveId: 'CVE-1', title: 'N',
    text: 'NDP hop-limit spoofing (Moderate, CVSS 5.4, no CVE assigned): the relay accepted …' }).noCveFixes, 1);
  eq('prose "no CVE" outside a parenthetical is not counted', parseNotesPage({ url: 'u', cveId: 'CVE-1', title: 'N',
    text: 'the bug has no CVE and probably never will' }).noCveFixes, 0);
  const pn = parseNotesPage({ url: 'u', cveId: 'CVE-2026-53921', title: 'EDK II Security Advisory', text: 'no mention here' });
  eq('a page that omits the id does not name it', pn.names, false);
  /* The EDK2 control's live defect: a version in the BODY is not the page's own release. */
  eq('body-only version is not the page version', parseNotesPage({ url: 'u', cveId: 'CVE-1', title: 'Releases', text: 'packages 3.5.1 and 1.2.3 are listed' }).version, null);
  eq('banner version beside its revision still parses', parseNotesPage({ url: 'u', cveId: 'CVE-1', title: 'Release Notes', text: 'OpenWrt 24.10.8, r29233-443ec4032a is out' }).version, '24.10.8');
  eq('title version wins over a body version', parseNotesPage({ url: 'u', cveId: 'CVE-1', title: 'OpenWrt 25.12.5 - Service Release - 1. July 2026', text: 'see 3.5.1 for details' }).version, '25.12.5');
  eq('cell None + notes name it → the new state', notesVerdict({ pages: [pg], cell: 'None', cveId: 'CVE-2026-53921' }).state, 'advisory-none-but-notes-name-it');
  eq('a real cell is not overridden by the notes', notesVerdict({ pages: [pg], cell: '>= 1.2.1', cveId: 'CVE-2026-53921' }).state, null);
  eq('silent notes leave the state alone (EDK2)', notesVerdict({ pages: [pn], cell: 'Not patched currently', cveId: 'CVE-2026-53921' }).state, 'notes-do-not-name-it');
  const multi = notesVerdict({ pages: [pg, { ...pg, version: '25.12.5', date: '2026-07-01' }, { ...pg, names: false, version: '25.12.6' }], cell: 'None', cveId: 'CVE-2026-53921' });
  eq('matrix: earliest naming release of the line', multi.earliestPatchedLevel, '24.10.8');
  eq('matrix: every naming release is reported, not the first page listed', multi.versions, ['24.10.8', '25.12.5']);
  eq('matrix: the silent later page is named, not dropped', /NOT on 25\.12\.6/.test(multi.notes.join(' ')), true);
  eq('an unreadable page is not an absent one', notesVerdict({ pages: [{ url: 'u', status: 'JS gate — x', names: false }], cell: 'None', cveId: 'CVE-2026-53921' }).state, 'notes-unreadable');
  let pass = 0;
  for (const c of cases) {
    if (c.ok) pass++;
    console.log(`${c.ok ? '✓' : '✗'} ${c.name}${c.ok ? '' : `\n    got  ${JSON.stringify(c.got)}\n    want ${JSON.stringify(c.want)}`}`);
  }
  console.log(`\nselftest: ${pass}/${cases.length} matched`);
  process.exit(pass === cases.length ? 0 : 1);
}

/* ── entry ── */
if (!IDS.length && !TRACKERS.length) {
  console.log('nothing to do: pass --ids CVE-…,CVE-… and/or --tracker ZDI-CAN-…' +
    ' [--repo owner/repo | --pypi pkg] [--artifact commit|package|firmware|image]' +
    ' [--fix-ref <commit|pull url>] [--debian <srcpkg>] [--range "<expr>"] [--json] [--selftest]' +
    ' [--release-notes <url>[,<url>…]]');
  process.exit(0);
}

let timeline = null, repoAdv = null, timelineError = null;
try {
  timeline = PYPI ? await pypiReleases(PYPI) : (REPO ? await repoReleases(REPO) : null);
} catch (e) { timelineError = e.message; }
try {
  repoAdv = REPO ? await repoAdvisories(REPO) : null;
} catch (e) { timelineError = timelineError || e.message; }
const sourceName = PYPI ? `pypi:${PYPI}`
  : (REPO ? `github:${REPO}${timeline?.via === 'atom' ? ' via releases.atom (api.github.com rate-limited)' : ''}` : null);
if (timelineError && !JSON_OUT) console.log(`  ⚠ ${timelineError}\n`);

if (!JSON_OUT && REPO && repoAdv) {
  const withCve = repoAdv.filter(a => a.cve).length;
  const dates = repoAdv.map(a => a.date).filter(Boolean).sort();
  console.log(`repo ${REPO}: ${repoAdv.length} published advisories, ${dates[0]?.slice(0, 10)} → ${dates.at(-1)?.slice(0, 10)}; ` +
    `${withCve}/${repoAdv.length} carry a CVE id`);
  if (withCve < repoAdv.length) {
    console.log(`  ⚠ ${repoAdv.length - withCve} advisories are invisible to a CVE-keyed lookup — repo-level fact, not a per-CVE join`);
  }
  console.log('');
}

/* The fix ref is resolved ONCE — it is a property of the advisory, not of each id. */
const fixRefResolved = FIX_REF ? await fixRefDate(FIX_REF) : null;
if (FIX_REF && !fixRefResolved && !JSON_OUT) console.log(`  ⚠ could not resolve a date from --fix-ref ${FIX_REF}\n`);

const results = [];
let first = true;
for (const id of IDS) {
  if (!first) await sleep(NVD_PACE);
  first = false;
  let record = null, advisories = null, sources = {};
  try {
    record = await nvdRecord(id);
  } catch (e) {
    results.push({ id, state: 'error', notes: [e.message] });
    continue;
  }
  advisories = await globalAdvisory(id);
  let advisoriesFromRefs = record ? await advisoryFromRefs((record.references || []).map(r => r.url)) : null;
  /* Order: the advisory the record links (the vendor's own page) → the global API → the Advisory
     Database. Only reached when the first two are empty, so a vendor page always wins over an
     ingest, and the database hit is labelled. */
  if (!advisoriesFromRefs && !advisories && record) {
    advisoriesFromRefs = await advisoryFromDatabase(id);
    if (advisoriesFromRefs && !JSON_OUT) console.log(`  · ${id}: advisory found only in the GitHub Advisory Database (${advisoriesFromRefs.ghsa}) — not in the record's references\n`);
  }
  /* Merge, do not pick: the referenced advisory is the only source of a usable range, and the
     GLOBAL advisory's summary is often the only place the human bound ("through 4.7.6") appears.
     Taking one or the other loses exactly the field that detects a wrong range. */
  const adv = advisoriesFromRefs
    ? { ...advisories, ...advisoriesFromRefs,
        summary: advisoriesFromRefs.summary || advisories?.summary || null }
    : advisories;
  /* Degraded-timeline repair: the atom feed lists ~10 recent releases, so a older fix version
     looks absent. Fill it in from its own tag page before classifying — bounded to the versions the
     advisory actually names, and only when the timeline came from the atom fallback. */
  if (REPO && timeline?.via === 'atom' && record) {
    const wanted = fixedVersionsFrom(adv?.patched);
    for (const v of wanted) {
      if (timelineLookup(timeline, v)) continue;
      const rel = await tagDate(REPO, v);
      if (rel) timeline.push(rel);
    }
    if (wanted.length) timeline.sort((a, b) => cmpVer(a.version, b.version));
  }
  const cls = classify({
    id, record,
    nvdRanges: record ? nvdRanges(record) : [],
    advisory: adv,
    timeline, repoAdv, timelineError,
  });
  cls.sources = { ...sources, ...(cls.sources || {}) };
  if (advisories) cls.ingestionTs = advisories.ingestionTs;

  if (ARTIFACT && record) {
    const debian = DEBIAN ? await debianTracker(id) : null;
    let fix = fixRefResolved;
    if (!fix && debian?.commits?.length) fix = await fixRefDate(debian.commits[0].url);
    cls.artifact = artifactVerdict({ record, advisory: adv, timeline, mode: ARTIFACT, fixRef: fix, debian,
      patched: cls.patched ?? null,
      cellSource: cls.sources?.patched === 'record prose' ? 'record prose (not a cell)' : 'cell' });
    /* The artifact verdict outranks a version-axis `indeterminate`/`no-fix` ONLY when it is the
       new state — that is the case where the temporal axis has nothing to say and the consumer's
       question is answerable. The suppressed state is kept and printed, never dropped. */
    if (cls.artifact.state === 'fix-in-source-no-artifact' && (cls.state === 'indeterminate' || cls.state === 'no-fix')) {
      cls.temporalState = cls.state;
      cls.state = 'fix-in-source-no-artifact';
    }
  }
  /* The announcement axis. Runs after the artifact axis because it answers the same consumer
     question from a different document, and it escalates the state only where the advisory's cell
     names no patched version at all — a cell that is wrong, not merely terse. */
  if (NOTES.length && record) {
    const pages = [];
    for (const u of NOTES) pages.push(await releaseNotesPage(u, id));
    cls.releaseNotes = notesVerdict({ pages, cell: cls.patched ?? null, cveId: id });
    if (cls.releaseNotes.state === 'advisory-none-but-notes-name-it' && !cls.temporalState) {
      cls.temporalState = cls.state;
      cls.state = 'advisory-none-but-notes-name-it';
    }
  }
  results.push(cls);
}

for (const t of TRACKERS) {
  results.push(classify({ id: t, record: null, nvdRanges: [], advisory: null, timeline, repoAdv, trackerId: t }));
}

/* ── output ── */
if (JSON_OUT) {
  console.log(JSON.stringify({ source: sourceName, checked: new Date().toISOString(), results }, null, 1));
} else {
  for (const r of results) {
    const lag = r.lagDays === null ? ''
      : r.lagDays < 0 ? `  ${-r.lagDays}d after the record` : `  ${r.lagDays}d`;
    console.log(`${r.id}  ${r.state}${lag}`);
    if (r.temporalState) console.log(`    temporal ${r.temporalState} on the version axis — the row above is the artifact axis`);
    if (r.recordDate) console.log(`    record   ${ymd(r.recordDate)} (NVD, ${r.recordStatus})`);
    if (r.fixVersion && r.fixDate) console.log(`    fix      ${r.fixVersion} released ${ymd(r.fixDate)} UTC (${sourceName})`);
    if (r.range) console.log(`    range    ${r.range}${r.patched !== null && r.patched !== undefined ? ` · patched: ${r.patched}` : ''}` +
      (r.sources?.range ? `  [${r.sources.range}]` : ''));
    if (r.asOf) console.log(`    as-of    ${r.asOf} (a reporting date, not an introduction date)`);
    if (r.latest) console.log(`    latest   ${r.latest} (${ymd(r.latestDate)}) — ${r.stillAffected ? 'STILL affected' : 'outside range'}`);
    if (r.artifact) {
      const a = r.artifact;
      console.log(`    artifact ${a.mode} → ${a.state}` +
        (a.newest ? ` · newest ${a.newest.version} (${ymd(a.newest.date)})` : ''));
      console.log(`    cell     ${a.cell === null || a.cell === undefined ? '(no patched-version cell published)' : JSON.stringify(a.cell)} — ${a.cellSource === 'cell' ? 'verbatim from the advisory' : a.cellSource}`);
      if (a.fixRef) console.log(`    commit   ${a.fixRef.url} ${ymd(a.fixRef.date)} (${a.fixRef.label})`);
      if (a.debian) {
        const s = a.debian.suites.map(x => `${x.release} ${x.version} ${x.status}`).join(' · ');
        console.log(`    debian   ${s || '(no suite rows)'}${a.debian.fixed ? ` · fixed: ${a.debian.fixed}` : ''}`);
      }
    }
    if (r.advisoryDate) console.log(`    advisory ${r.advisoryGhsa} published ${ymd(r.advisoryDate)}`);
    if (r.releaseNotes) {
      const n = r.releaseNotes;
      const tag = n.state === 'advisory-none-but-notes-name-it'
        ? ` ${n.versions.join(', ')}${n.date ? ` (earliest released ${n.date}` : ''}${n.eol ? `, series EoL ${n.eol})` : n.date ? ')' : ''}`
        : '';
      console.log(`    notes    ${n.state}${tag} — ${n.named}/${n.pages} page(s) name ${r.id}`);
      for (const p of (n.pageList || [])) {
        if (!p) continue;
        console.log(`             · ${p.version || '(unversioned)'}${p.date ? ` (${p.date})` : ''}${p.revision ? ` ${p.revision}` : ''} — ${p.names ? 'NAMES it' : 'does not name it'}${p.noCveFixes ? `, +${p.noCveFixes} fix(es) labelled no-CVE` : ''}${p.status !== 'ok' ? ` [${p.status}]` : ''}`);
      }
      (n.notes || []).filter(Boolean).forEach(x => console.log(`             ⤷ ${x}`));
    }
    // ingestion ts is printed only to be disowned: on a bulk drop it is the batch, not the advisory
    if (r.ingestionTs && r.state !== 'backfill') console.log(`    ghsa     ingested ${r.ingestionTs} (ingestion, not the advisory's own date)`);
    (r.notes || []).filter(Boolean).forEach(n => console.log(`    · ${n}`));
    (r.artifact?.notes || []).filter(Boolean).forEach(n => console.log(`    ⤷ ${n}`));
    console.log('');
  }
  const tally = results.reduce((m, r) => (m[r.state] = (m[r.state] || 0) + 1, m), {});
  console.log('disclosure-lag: ' + Object.entries(tally).map(([k, v]) => `${k}×${v}`).join(', ') +
    (sourceName ? ` — timeline ${sourceName}` : ' — no release timeline (lag not computable)'));
}
