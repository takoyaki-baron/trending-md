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
 * Usage:
 *   node disclosure-lag.mjs --ids CVE-…,CVE-… --pypi vllm
 *   node disclosure-lag.mjs --ids CVE-… --repo triggerdotdev/trigger.dev
 *   node disclosure-lag.mjs --tracker ZDI-CAN-33549          # pre-record check (absence query)
 *   node disclosure-lag.mjs --ids CVE-… --json
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
  const out = [];
  if (/[\[(]/.test(s)) {
    for (const m of s.matchAll(/([\[(])\s*([^,\]\)]*?)\s*,\s*([^\]\)]*?)\s*([\])])/g)) {
      const [, lo, min, max, hi] = m;
      out.push({ raw: `${lo}${min},${max}${hi}`, min: min || null, minInc: lo === '[',
        max: max || null, maxInc: hi === ']' });
    }
    return out;
  }
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

/** GitHub advisory HTML → { affected, patched }. The two cells are the machine-readable part. */
function parseAdvisoryHtml(html) {
  const cell = label => {
    const i = html.indexOf(`>${label}</h2>`);
    if (i < 0) return null;
    const m = html.slice(i, i + 600).match(/class="f4 [^"]*"\s*>([^<]*)</);
    return m ? decode(m[1]).trim() : null;
  };
  return { affected: cell('Affected versions'), patched: cell('Patched versions') };
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

async function repoReleases(repo) {
  const { status, body } = await getJson(`${GH}/repos/${repo}/releases?per_page=100`,
    { Accept: 'application/vnd.github+json' });
  /* Every unauthenticated GitHub call in a session counts against 60/hr, and this repo spends a
     few of them per feed run. A rate-limited fetch must NOT degrade into "no release timeline" —
     that reads as "pass --repo" and sends you to fix a flag that is already correct. */
  if (status === 403 || status === 429) throw new Error(`api.github.com rate-limited (HTTP ${status}) — lag not computable, retry later`);
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
  return cleaned.split(',').map(s => s.trim()).map(s => (s.match(/(\d[\w.\-+]*)/) || [])[1]).filter(Boolean);
}
const fixedVersionFrom = p => fixedVersionsFrom(p)[0] || null;

function classify({ id, record, nvdRanges: cpes, advisory, timeline, repoAdv, trackerId, timelineError }) {
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

  // range: NVD CPE → advisory HTML → global advisory → give up (indeterminate, never a guess)
  let ranges = cpes || [];
  let patchedRaw = null;
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
  }
  if (!ranges.length && patchedRaw === null && advisory) patchedRaw = advisory.patched;
  base.range = ranges.length ? ranges.map(r => r.raw).join(' | ') : (advisory?.affected || advisory?.range || null);
  base.patched = patchedRaw;

  if (!ranges.length) {
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
  if (top && overlapping.length) {
    contradicted = contradicted || { cell: `affected ${base.range} vs patched ${patchedRaw}`, title: tb?.phrase || null, titleVer: tb?.ver || null };
    base.notes.push(`the advisory's own cells overlap at the patched version (${overlapping.join(', ')} is inside ${base.range})`);
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

/* ── entry ── */
if (!IDS.length && !TRACKERS.length) {
  console.log('nothing to do: pass --ids CVE-…,CVE-… and/or --tracker ZDI-CAN-…' +
    ' [--repo owner/repo | --pypi pkg] [--json]');
  process.exit(0);
}

let timeline = null, repoAdv = null, timelineError = null;
try {
  timeline = PYPI ? await pypiReleases(PYPI) : (REPO ? await repoReleases(REPO) : null);
} catch (e) { timelineError = e.message; }
try {
  repoAdv = REPO ? await repoAdvisories(REPO) : null;
} catch (e) { timelineError = timelineError || e.message; }
const sourceName = PYPI ? `pypi:${PYPI}` : (REPO ? `github:${REPO}` : null);
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
  const advisoriesFromRefs = record ? await advisoryFromRefs((record.references || []).map(r => r.url)) : null;
  /* Merge, do not pick: the referenced advisory is the only source of a usable range, and the
     GLOBAL advisory's summary is often the only place the human bound ("through 4.7.6") appears.
     Taking one or the other loses exactly the field that detects a wrong range. */
  const adv = advisoriesFromRefs
    ? { ...advisories, ...advisoriesFromRefs,
        summary: advisoriesFromRefs.summary || advisories?.summary || null }
    : advisories;
  const cls = classify({
    id, record,
    nvdRanges: record ? nvdRanges(record) : [],
    advisory: adv,
    timeline, repoAdv, timelineError,
  });
  cls.sources = { ...sources, ...(cls.sources || {}) };
  if (advisories) cls.ingestionTs = advisories.ingestionTs;
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
    if (r.recordDate) console.log(`    record   ${ymd(r.recordDate)} (NVD, ${r.recordStatus})`);
    if (r.fixVersion && r.fixDate) console.log(`    fix      ${r.fixVersion} released ${ymd(r.fixDate)} UTC (${sourceName})`);
    if (r.range) console.log(`    range    ${r.range}${r.patched !== null && r.patched !== undefined ? ` · patched: ${r.patched}` : ''}` +
      (r.sources?.range ? `  [${r.sources.range}]` : ''));
    if (r.latest) console.log(`    latest   ${r.latest} (${ymd(r.latestDate)}) — ${r.stillAffected ? 'STILL affected' : 'outside range'}`);
    if (r.advisoryDate) console.log(`    advisory ${r.advisoryGhsa} published ${ymd(r.advisoryDate)}`);
    // ingestion ts is printed only to be disowned: on a bulk drop it is the batch, not the advisory
    if (r.ingestionTs && r.state !== 'backfill') console.log(`    ghsa     ingested ${r.ingestionTs} (ingestion, not the advisory's own date)`);
    (r.notes || []).filter(Boolean).forEach(n => console.log(`    · ${n}`));
    console.log('');
  }
  const tally = results.reduce((m, r) => (m[r.state] = (m[r.state] || 0) + 1, m), {});
  console.log('disclosure-lag: ' + Object.entries(tally).map(([k, v]) => `${k}×${v}`).join(', ') +
    (sourceName ? ` — timeline ${sourceName}` : ' — no release timeline (lag not computable)'));
}
