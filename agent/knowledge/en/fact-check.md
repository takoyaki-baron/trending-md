---
title: Fact-check method
topic: fact-check
created: 2026-08-13
---

# Fact-check method

A reusable pre-publish method for validating a trend item before it goes into the feed. Distilled
from the source-validation rule in `CLAUDE.md` and the 2026-08-12 Void lesson. This is the learnt
agent's most important reusable asset — the thing that separates first-hand signal from recycled
aggregation.

## The core principle

**Aggregate metrics are a signal to INVESTIGATE, not a signal to PUBLISH.** A star count, a trending
rank, or a "+2,840 stars" line tells you *that* something is moving — never *why*, and never whether
it's real. Velocity only earns an item a place in your research queue. The write-up is earned by
opening pages.

## The pre-publish checklist

Run these three checks before writing any item:

1. **Open the repo itself.** README, last commit date, `archived` flag, maintenance status. Star
   count alone says nothing about whether a project is alive, abandoned, or having a viral moment
   from an old blog post.
2. **Click every source link you plan to cite.** Does the page actually contain the data point
   you're attributing to it? A tool's landing page is not a data source. A search-results page is
   not a source for a specific fact. If you can't find the data on the page, don't cite it.
3. **Find the trigger, not just the metric.** A repo spikes for a reason — new release, HN mention,
   a thread, a blog post. Find that trigger and write the item around it. "X's dormant editor
   resurfaces after an HN mention" is accurate; "X rockets to #2" without context is misleading.

## Case study: Void (2026-08-12) — two failures, one root cause

- The feed saw `voideditor/void` at #2 trending with +2,840 stars and wrote it as "AI-first editor
  momentum beyond Cursor/Copilot."
- **Neither GitHub nor the cited PageCrawl page was visited.** Had the repo been opened: README says
  "paused development since mid-2025" — the project is dead. Had the PageCrawl link been clicked:
  it's a generic tool signup form with zero Void data.
- **Root cause:** aggregate metrics were trusted without visiting the actual pages. This is a
  two-layer false signal in a single item — the ranking was wrong, and the cited "source" backed
  none of it.

## Case study: doing it right (CVE verification, this run)

The same discipline applied to the two security items in [[agent-stack]] turns one-line feed
summaries into net-new first-hand detail:

- **mcp-grafana CVE-2026-19516 (SSRF)** — the feed's "caller-supplied `X-Grafana-URL` header"
  checks out against the CVE record, and opening it surfaces the deeper story: CWE-918, a *related
  predecessor* (CVE-2026-15583, "confused deputy" token exfiltration) whose fix patched the token
  leak but **not** the destination — which is exactly why 19516 still works. A single fix is rarely
  sufficient.
- **Langflow CVE-2026-9198 (RCE)** — the feed's "auto_login + validate/code" is really a *chain* of
  two independent flaws (CVE-2026-9103 auth bypass + CVE-2026-8481 unsandboxed `exec()`), and the
  exploit uses a default-argument trick (`def _v(a=exec('<payload>')): pass`) because Python
  evaluates defaults at definition time. Verifying opened the mechanism, not just the score.

The takeaway: fact-checking isn't a gate that only removes false items — it's the mechanism that
converts a thin summary into the detail the feed is supposed to deliver.

## Case study: GenLayer (2026-08-19) — the Void failure mode, caught before publication

The cleanest demonstration yet that a trending rank measures **incentive, not engineering** — and the
first time the checklist above ran end-to-end and *changed the story* rather than killing the item.

- **The aggregate said:** `genlayerlabs/genlayer-project-boilerplate` at **#12 on GitHub Trending
  (daily), +543 stars today, 15,898 total**.
- **Check 1 — open the repo (verified via the GitHub API, Aug 19):** `pushed_at` **2026-07-26** — 24
  days of zero code activity — 77 commits, **no published releases**, `description: null`, 800 forks,
  not archived. Star count 15,901 at re-check. The content is a demo: "the boilerplate code for a
  GenLayer use case implementation, specifically a football bets game."
- **Check 3 — find the trigger:** GenLayer runs an incentivized testnet points programme
  (Builder/Validator/Community tracks, reviewed by a Steward, scored on "novelty, complexity, and
  impact"), and third-party airdrop guides tell readers that starring the GitHub repo is the fastest
  way to log first points. So the trigger is a *points programme*, not a release.
- **Check 2 — click the source:** and here the checklist paid off. GenLayer's **own** Incentivized
  Builders Program announcement was read directly and **lists no GitHub-star action**; no token or
  airdrop has been confirmed. The airdrop-guide framing could not be substantiated at the primary
  source.
- **What got published:** the *discrepancy*, not the aggregator's framing — "the star-for-points claim
  appears in airdrop-guide aggregators, not in GenLayer's own programme post, which we read." The two
  curves fully decouple: **543 stars in a day against zero commits in 24 days.**

**The lesson this adds to Void:** Void was a *dead* project with live stars; GenLayer is a *live but
inactive demo* with incentivized stars. Different causes, one root: the star curve and the engineering
curve are independent variables. And when the secondary sources and the primary source disagree,
"report the discrepancy" is a stronger item than either version — it is the one framing that is
verifiably true.

**Corollary — check the venue claim too.** In the same batch, `RyanCodrai/turbovec` cited its
underlying TurboQuant paper as "ICLR 2026," while the arXiv record (2504.19874) lists no venue
acceptance. A publication venue is a citable fact like any other; a README asserting one is not a
source for it.

## Correcting after publish (the other half of the method)

Fact-checking is not only a pre-publish gate — the same discipline applies *after* an item ships and
turns out wrong. The feed-correction convention (codified in `CLAUDE.md` after the Void correction,
2026-08-13) is the post-publication half of this method:

1. **Fix the body in place** — keep the item's number and position; rewrite title/description to
   state what is actually true ("archived and deprecated", not "trending"). Never renumber or
   silently drop.
2. **Retract the bogus link** — remove any source that never contained the attributed fact; replace
   it with a source you have actually visited (the repo itself, the real vendor page).
3. **Keep ≥2 valid links** — every corrected item still needs at least two visited, working sources.
4. **Re-derive velocity** — a corrected item's velocity drops to match reality (▮ steady), never
   keeps its inflated rank.
5. **Mirror to zh/ and jp/** — the correction lands in all three locales in the same run.

The unified method: **verify before you publish, correct after you discover.** Both halves start by
visiting the primary source; neither starts from the aggregate's framing. Void is the standing
example of the first half (caught before publication), the in-place correction is the standing
example of the second (caught after).

## When to apply

Every batch, before publishing: run the checklist on each item. Treat any item where you cannot
complete all three checks as "not yet verified" — either finish the check or drop the item. Keep
the Void lesson as a standing warning; it is the exact failure mode this method exists to prevent.

## Corollaries from the Aug 19 20:03 batch

Three more "check the source, not the aggregate" instances, one per item:

- **Oracle's patch count — report the vendor's number.** The August CSPU item circulates as "925 CVEs /
  154 critical," but Oracle's own advisory states **943 new security patches**. The vendor's number is
  the one cited; third-party counts don't match it.
- **OpenZFS OZ-1 — cite the list we read.** The `hotmolts.com` write-up circulating alongside is
  client-rendered and served none of the technical content server-side, so the item cites the
  oss-security mailing-list post that was actually read.
- **Mojo's license — the detector is not the source.** GitHub's license detector reports
  `NOASSERTION` on `modular/modular` (the LLVM exceptions defeat auto-detection); the "Apache-2.0"
  claim is Modular's own, stated in the announcement that was read. A license claim needs the vendor's
  statement, not the detector — same shape as the turbovec "ICLR 2026" venue corollary.

## Corrections come in two species — and they have opposite velocity consequences (08-20)

Applying this checklist to *my own* feed caught two errors in one batch. They look alike — both are
"an item was wrong, fix it in place" — but treating them identically produces a worse ledger. The
distinction is now part of the method, and `CLAUDE.md`'s correction convention was amended to match.

### Species 1 — a claim error (framing was wrong)

**Case: `akitaonrails/ai-memory` attributed to DHH (2026-08-20, item 21).** The feed titled it "DHH's
Rust agent memory." The GitHub owner profile says **Fabio Akita** — Codeminer 42, Brazil, 19.5k
followers. DHH is `dhh` (David Heinemeier Hansson, 37signals), who authors **Omarchy — item 9 of the
same feed**. Two prominent Rails-community figures collapsed into one, inside a single file.

Why it earns a velocity re-derivation: the false attribution was doing *work*. "DHH shipped an agent
memory" is a story because of who DHH is; "a well-known Brazilian Rails developer shipped an agent
memory" is a smaller one. The rank was partly bought by the error, so the rank has to go back —
▮▮ rising → ▮ steady, alongside the title and body fix.

**The detection rule that would have caught it earlier:** an `owner/repo` slug is a *checkable claim
about a person*. One API call (`/users/<owner>`) settles it. Never infer authorship from a project's
community, its language ecosystem, or another item in the same batch.

### Species 2 — a citation error (the link was wrong, the story was right)

**Case: the GrapheneOS Mastodon permalink (2026-08-20, item 18).** The cited post returns **404** —
confirmed twice, via the HTML page and the Mastodon status API (`/api/v1/statuses/<id>` →
`{"error":"Not Found"}`). But the *story* — Google replacing Pixel kernel and userspace-driver Git
tags with a Google Form → human approval → history-stripped tarball on Drive — is real and
independently corroborated by Android Authority (Aug 10), securityonline.info, ITHome, OSChina and
others. Sibling item 15's GrapheneOS permalink, checked the same way, resolves fine and turned out to
contain *more* than the coverage did.

Why it must **not** get a velocity re-derivation: nothing about the item's prominence rested on that
URL. The HN thread's 647 points are real; the story is real. Dropping its velocity would make the feed
under-report a genuine trend as punishment for a dead link — an error in the opposite direction.

The fix is narrower: retract the bogus link, replace it with a source **actually opened** (Android
Authority), keep ≥2 valid links, and say so in the item.

### The rule

| | Claim/framing correction | Citation correction |
|---|---|---|
| What was wrong | the fact or the framing | only the pointer |
| Fix | rewrite title + body | swap the link |
| Velocity | **re-derive** (usually → ▮ steady) | **keep** |
| Rationale | the inflated framing drove the rank | the rank was never about the link |

Mechanically applying "corrected items drop to steady" to both would have quietly degraded the ledger.
The convention exists to stop *inflated* ranks surviving a correction — not to punish every edit.

### Two habits this adds to the checklist

1. **Resolve every permalink, not just article URLs.** Social-media permalinks (Mastodon, X) are the
   most fragile citations in the feed — posts get deleted, IDs get transcribed wrong, instances move.
   A status API is a one-call check and returns an unambiguous answer.
2. **Read the primary account's own timeline, not only the aggregator's excerpt.** Checking the
   *working* GrapheneOS permalink returned material the coverage omitted — the 2027 devices will be
   flagships "higher end hardware than Pixels at a higher price," gated on Qualcomm and on getting
   Motorola to pay for longer updates — plus the project's own pushback on the framing: "It isn't
   really news that the devices will be in 2027." Verification and reporting are the same action; a
   check that only returns pass/fail is being under-used.

## Freshness is a fact-check: the 3-day dedup window missed three repeats (08-23 04:03)

The 08-23 batch re-ran three repos already covered — `AprilNEA/OpenLogi` (08-19), `jundot/omlx` and
`AlexsJones/llmfit` (08-18) — as *fresh* discoveries. Root cause was mechanical, not a hallucination:
`generate-feed.sh` passed only a 3-day recent-history window, and all three sat 4–5 days back. Lesson: "is
this genuinely new?" is a fact-check the *prompt* must be able to perform — a dedup window shorter than the
natural re-appearance cadence of trending repos silently converts updates into duplicates. Fixed by widening
the window to 7 days and adding an explicit "cover it as a dated update, never a fresh discovery" rule.

## Vendor exploitability flags are the one un-verifiable field in a cloud CVE (08-23 04:03)

CVE-2026-69836 (Microsoft Entra ID, CVSS 10.0) was published "Exploited: Yes" then walked back to "No" the next
day. Read first-hand, the MSRC record now says `exploited: No` with a CVSS 3.1 vector of `…/E:U` (**unproven
exploitation**) and `customerActionRequired: false`. A *cloud-service* CVE has no patch artifact to inspect —
the exploitability flag is the only signal, and it is a mutable vendor-published field, so "is this being
exploited?" is fundamentally un-verifiable by third parties for fully-mitigated cloud CVEs. The one independent
handle: cross-check the qualitative flag against the temporal metric (`E:U`/`E:POC`/`E:F`/`E:H`). Same shape as
the "trust the vendor, not the aggregator" rule, one hop earlier.
