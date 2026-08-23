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

## Three sourcing failures in one batch — the metric, the licence, and the phrasing (08-23 12:03)

Applying the checklist to the 08-23 12:03 items produced three distinct near-misses, each a different way a
true-sounding sentence outruns its evidence:

1. **A headline number that the benchmark's own control contradicts.** Prime Intellect's NanoGPT Speedrun
   Frontier headline is "Fable 5 closed **81.7%** of the human-record gap." The same page ships an equal-budget
   view showing that record took **8.7 days**, and that Fable 5's best result **within 24 hours** was 3,010 —
   **≈40.6%** of the gap. Half the headline is wall-clock. **Rule:** when a leaderboard publishes a budget
   control, the control *is* the finding; cite the pair (`81.7% / 8.7 days` or `40.6% @24h`), never the
   unqualified number. A time budget reported as a capability is the benchmark-design failure Dan Luu warned
   about in the same day's feed — arriving inside a benchmark rather than around one.
2. **A licence asserted in prose but never filed.** `multica-ai/andrej-karpathy-skills` is described as MIT;
   README §License says "MIT," but `/LICENSE` returns **404** and GitHub's license API returns `Not Found`
   (`license: null`). **Rule:** for any repo you tell people to copy code or config out of, check the
   *file*, not the README — `curl -o /dev/null -w '%{http_code}' .../LICENSE` is one call, and the API's
   `license` field is the second opinion.
3. **A claim stronger than the source cited for it.** The rogue-agent item says the AISI test ran "with safety
   filters deliberately switched off." Reuters and its iTnews syndication say no such thing — their wording is
   Anthropic's "**deliberately permissive conditions**." The stronger claim happens to be supportable, but from
   a *different* document (the AISI incident report read on 08-22: internet permitted, cyber classifiers
   disabled). **Rule:** attribute each clause to the document that actually contains it. Two sources describing
   one configuration at different strengths is not corroboration — it is a chance to cite the wrong one.

The common root is the same as Void's: **a claim inherited its confidence from an adjacent artifact** — the
leaderboard row next to the control, the README next to the missing file, the AISI report next to the news
story. Verification means opening the *specific* artifact the specific clause rests on.

## A release calendar is not a fix date (08-23 12:03, self-caught)

The 08-23 12:03 feed shipped `CVE-2026-61018` (Oracle WebCenter Sites, CVSS 9.8) under the headline **"fix not
expected until October,"** with a body asserting a "~2-month unpatched window" and a *Why it matters* telling
readers "the mitigation is monitoring and workarounds, not a patch, for months." Checked at the primary sources
the same day, **both load-bearing claims were false**:

- **NVD** (status *Analyzed*, published Aug 18, modified Aug 21) lists exactly one weakness — **CWE-284,
  Improper Access Control**. The item claimed CWE-502 + CWE-306; neither appears in the record.
- **NVD's sole reference** is Oracle's **August 2026 CSPU** advisory, and the CVE is *in that advisory's patch
  table* — "Oracle WebCenter Sites / WebCenter Sites / HTTP / Yes / 9.8 / … / 12.2.1.4.0, 14.1.2.0.0" — with an
  **empty Notes column**, exactly like the WebLogic and WebCenter Portal 9.8s in adjacent rows. It is patched.
- The **only** occurrence of the string "October" anywhere on that advisory is its boilerplate footer:
  "Upcoming Security Release Dates … 15 September 2026 (CSPU), **20 October 2026 (CPU)**, 17 November 2026
  (CSPU), 15 December 2026 (CSPU)."

**The mechanism of the error is the lesson.** Nobody invented the October date — it was *on the page*, in the
release calendar, and got attached to the CVE that was also on the page. This is the Void failure mode in its
purest form: **a fact inherited its authority from proximity.** The advisory was arguably "visited"; the
specific cell that would license the claim never was.

**Rules added:**
1. **A CVE's patch status is read off the vendor's patch *table* — the row, and its Notes cell — never inferred
   from a date elsewhere on the same page.** A CPU/CSPU cadence is a publication schedule; it says nothing about
   any individual CVE.
2. **"No patch until <date>" is a citation-bearing claim.** It must name the row, note, or sentence that says so.
   If you cannot quote it, the honest statement is "patch status unclear," not a window.
3. **Take the weakness class from the analyzed record, not from the flaw's description.** "Takes over the
   instance via crafted HTTP" *sounds* like deserialization; NVD's analysts said access control. Plausible
   mechanism is not a CWE assignment.

**Correction species:** *claim*, not citation — the invented unpatched window is precisely what made the item
rank, so per CLAUDE.md the velocity was re-derived **▮▮ rising → ▮ steady** alongside the title, body and tag
fixes, in en/zh/jp plus each `latest.md`, with a dated correction blockquote left in place.

**Self-assessment note:** this is the third batch in which applying the checklist to *my own published feed*
caught an error (after the `ai-memory`/DHH misattribution and the 404'd GrapheneOS permalink). The pattern
across all three: the feed's generation step trusts an adjacent artifact — an owner name, a permalink, a
calendar — while the learn step is where the specific cell finally gets opened. That asymmetry is an argument
for pushing primary-source verification *earlier*, into generation, not for celebrating the catch afterwards.

## The disclaimer-stripping pattern (2026-08-23) — when the source ships its own control

Two batches running, the sharpest fact-check finding was not that a claim was unsupported, but that **the
primary source published the caveat that guts its own headline, and everyone downstream dropped it.**

- **08-23 12:03 — Prime Intellect's NanoGPT Speedrun Frontier.** Fable 5 at 81.7% of the human-record gap —
  over 8.7 days; the leaderboard's own equal-budget column puts the same run at ≈40.6% @24h.
- **08-23 20:03 — NVIDIA AVO.** A **100.00 RHAE** on the ARC-AGI-3 public set (183 levels / 25 environments /
  6,624 actions, Claude Opus 5 base, which ARC Prize separately reports at ~30% standalone). Read first-hand,
  NVIDIA's post disclaims the obvious inference **twice**: the 30% → 100.00 gap "should not be interpreted as a
  direct measurement of the performance contribution of AVO" (different reasoning setting, agent system and
  evaluation setup), and the VISTA comparison "should not be interpreted as a controlled ablation" (the two
  systems differ in agent backend, observation representation, memory and context management). It further notes
  the memory system's individual contribution is not isolated, that observations were text-only 64×64 grids, and
  that nothing here touches the semi-private or private competition sets. TechCrunch's headline — "the harness,
  not the AI model, is now the real hero" — is precisely the reading NVIDIA declined, and **my own feed
  reproduced it** ("It quantifies that scaffolding … drives long-horizon agent performance"). Corrected in place.

**The method this adds.** The Void rule was *visit the page*. This is the next hop: **read past the abstract to
the limitations, then check whether the framing you are about to publish is one the source explicitly refused.**
Vendor posts have become more epistemically careful than the coverage of them — NVIDIA and Prime Intellect both
shipped their own missing control — so the aggregation layer is now where honesty is lost, not the source layer.
Practical checks, cheap to run:
1. Search the primary page for "not", "should not be interpreted", "does not isolate", "limitations", "public
   set", "we did not". These sentences are where the story is.
2. If a headline is a *delta* (30% → 100), ask whether the source claims the delta is attributable. Two numbers
   from different setups are not an ablation, and the source usually says so.
3. When a caveat exists, the item must carry it in the **"Why it matters"**, not only in the body — the analysis
   line is what gets quoted onward.
4. Velocity treatment: this is a *framing* fix where the underlying event (a verified 100.00 on the public set,
   a seven-day autonomous CUDA run beating FlashAttention-4 by up to 10.5%) still justifies the rank, so the
   rank stands. Re-derive velocity only when the *inflated framing itself* bought the rank — the Void /
   `ai-memory` / Oracle-WebCenter species.

## Three more corrections from one batch (2026-08-23 20:03)

Applying the checklist to my own 20:03 items caught three further errors, each a distinct species — useful
because they show the checklist has to be run against *different* artifact types, not just repos.

1. **Qwen-UI-Agent — the reputation carry-over.** Framed as "open-sourced (Apache-2.0)" with "weights
   `MAI-UI-8B`/`MAI-UI-2B`." First-hand: no LICENSE file in the repo (Apache-2.0 asserted in README prose only),
   the `Qwen-UI-Agent/` directory holds just a technical-report PDF, and the cited weights are the
   **predecessor MAI-UI 1.0** (HF last-modified 2026-01-09 and 2025-12-29). Announced 2026-07-30, not that week.
   *Claim* correction → velocity re-derived ▮▮ → ▮. **The trap:** an org that open-weighted v1 lends unearned
   credibility to v2. Check the model-card date, not the org.
2. **SWE-bench Science — the flourish nobody sourced.** "Uses a private test suite to catch overfitting" appears
   nowhere on the cited arXiv page. Replaced with the guidance ablation the abstract does state (well-grounded
   context helps and improves token efficiency; misaligned context induces anchoring) — which is the more
   valuable finding anyway. **The trap:** a plausible methodological detail is the easiest thing to invent,
   because it sounds like something a careful benchmark *would* do.
3. **Operation CameraSwarm — the source corrected the record and I ignored it.** The item listed
   **CVE-2024-39943** in the exploit chain. Hunt.io's report, re-read first-hand, explicitly flags that
   identifier as a mislabel circulating in coverage (it is an unrelated Rejetto HFS flaw) and similarly notes
   CVE-2025-31702's advisory describes a narrower post-auth issue than what was observed. **The trap is the
   worst kind:** the primary source contained the correction, and the item was written from the parts of it that
   matched the aggregate framing. Reading a source is not the same as reading *all* of it — its own corrections
   and hedges are the highest-value paragraphs, because they are the ones no aggregator repeats.

**Also promoted to a standing check — "who scored this CVE?"** Elementor's CVE-2026-32475 carries CVSS 9.0 and
CWE-434 from **`audit@patchstack.com`**, i.e. the CNA, with NVD's record in *Deferred* status (not independently
analysed). This is the same axis as the Oracle WebCenter correction, where NVD's *Analyzed* record disagreed with
the feed's assumed weakness class. Record the scorer alongside the score; "CVSS 9.0 (CNA-assigned, NVD deferred)"
is a materially different statement from "CVSS 9.0 (NVD analyzed)". Note too the `AC:H` in that vector — attack
complexity is where an unauthenticated RCE loses the points that would have made it a 9.8.
