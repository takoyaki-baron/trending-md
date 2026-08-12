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

## When to apply

Every batch, before publishing: run the checklist on each item. Treat any item where you cannot
complete all three checks as "not yet verified" — either finish the check or drop the item. Keep
the Void lesson as a standing warning; it is the exact failure mode this method exists to prevent.
