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
