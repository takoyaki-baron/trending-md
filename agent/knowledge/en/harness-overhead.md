---
title: Harness overhead — the two resources a harness spends without a line item (tokens on self-description, attention on re-checking earlier work)
topic: harness-overhead
created: 2026-10-29
---

# Harness overhead — the two resources a harness spends without a line item

A harness bills for the work it was asked to do and pays, invisibly, for two other things: **tokens
spent describing itself** and **attention spent re-checking what it already did**. Neither appears in
a request the user made, both scale with the session rather than with the task, and the 2026-10-29
20:00 batch measured each one — one as a share of a bill, one as a failure rate after a defect.

Adjacent files: [[harness-reliability]] (the same seam measured under fault injection, StateMirror,
HarnessMM), [[token-economics]] (the cost boundary; cache reads at 96–99% of agentic spend),
[[agent-stack]] (the harness as a product category), [[fact-check]] (how to read a self-reported
table), [[frontier-models]] (the harness as a benchmark column).

**The claim:** the harness's own bookkeeping competes with the task for the same two resources, and
the useful unit for each is a *share of the thing being spent* — 16.4% of spend, 95% of missed
defects — not a per-call cost. A design that prices consequence (not confidence) and reveals memory
in layers (not in bulk) is the current best answer to both.

## 1. Token overhead: a status line that costs a sixth of the bill

**Claude Code's `agent_summary`** (measured by flamerix.ai, 2026-10-29). Every ~30 seconds, for every
**background agent**, the client sends that agent's **entire transcript** to its own model and asks it
to "describe your most recent action in **3-5 words**"; the answer updates a line in the agents panel
and never reaches the model or the conversation. On by default since **2.1.232** (August 2026), with
"no setting that turns it off" — the linked issue is a *feature request* for one
([anthropics/claude-code#86879](https://github.com/anthropics/claude-code/issues/86879), opened
2026-08-15, still open).

The measurement is from the client's own **OpenTelemetry** export, grouped by `query_source`:

| Metric | `query_source = agent_summary` | main conversation |
|---|---|---|
| share of all Claude Code spend (`cost_usd`) | **16.4%** | 15.7% |
| share of all API requests | **19.7%** | — |
| share of that spend on Opus | **96%** | — |

Input-to-output ratio ≈ **9,000 : 1** — a summariser reads a transcript to write three words, so the
cost is proportional to **context length**, which is why the ratio is the mechanism and not a detail.
The issue thread carries **four independent measurements of 18–26%**, so the defensible sentence is
"**a sixth to a quarter**", not "16.4%".

**The unit, which is where this claim usually breaks:** 16.4% is a share of Claude Code's **own
`cost_usd` estimate**, not of an invoice. On a subscription what is lost is **rate-limit headroom**,
not money — a distinction the source states ("if you are on a subscription, what you lose is
rate-limit headroom") and a coverage summary routinely drops.

**The instrumentation lesson generalises past this client.** The hook is an ~80-line **Bun preload**
(`BUN_OPTIONS=--preload`) that wraps `setTimeout`/`setInterval` and returns an inert handle when a
callback's source text matches a summariser anchor. It works although the module ships as
**precompiled Bun bytecode** — because `Function.prototype.toString` still returns a callback's
**source text** even when it executes from bytecode, so the timer is identifiable by a *string inside
it* rather than by identity. Any bundled runtime has this property, in both directions: it is how you
find an undocumented timer, and it is why the match is brittle.

**The source publishes its own fail-open list** (this is the part that makes it citable): the log
line or query-source id renamed; the callback passed through `fn.bind(...)` (no source in `toString`);
the anchor strings moved to a shared constant outside the callback; or the timer migrated to an
unwrapped API (`timers/promises`, a scheduler loop). Its **Tested versions** table covers
2.1.257 → 2.1.312 with summary forks per ~2.5-minute run of **5 / 5 / 0** for
no-hook / hook-pass / hook-off — i.e. the hook is verified by *counting the forks it prevents*, not
by asserting it installed.

## 2. The counter-design: reveal memory in layers

**`thedotmack/claude-mem`** (104,222★, 9,193 forks, Apache-2.0, created 2025-08-31, pushed 2026-10-29
— a year-old project, verified first-hand) answers the same cost problem from the store's side. Its
retrieval is **not** "embed and return": three layers of MCP tools —

1. `search` → a compact index with IDs (**~50–100 tokens/result**),
2. `timeline` → chronological context around the survivors,
3. `get_observations` → full detail **only for filtered IDs** (**~500–1,000 tokens/result**).

An agent-memory store's failure mode is not recall, it is **context cost**, so a two-pass filter
spends the expensive tokens only on rows the model already chose. Two claims to hold at arm's length:
"**~10× token savings**" has no benchmark section behind it in the README (quote it as the project's
own figure), and the token bands are **estimates**, not measurements.

Two install details that bite: `npm install -g claude-mem` installs "the **SDK/library only** — it does
not register the plugin hooks or set up the worker service" (a global install looks successful and
delivers nothing), and for one supported host the default is **CMEM Pro**, the hosted memory, with the
local observer as an opt-in (`--provider host`) — the sentence to read before pointing it at a
proprietary repo.

## 3. Attention overhead: the defect nobody re-reads

**FeatureArc** (arXiv 2610.37434, submitted 2026-10-27; **Hunyuan Team, Tencent** + CUHK — affiliations
read from the HTML full text, not the abstract page) evaluates the request that arrives **after** the
agent's own earlier work: **10 coding agents**, **73** manually reviewed tasks of **2–10 stages**, one
persistent session and workspace, **no external test feedback and no rollback**.

| Measurement | Value |
|---|---|
| pooled success, first stage | **62.7%** |
| pooled success, whole feature on the final code | **28.5%** |
| failed later stages carrying an **inherited defect** | **72.9%** |
| stages after a failure where the earlier error stays **unnoticed** | **~95%** |

The 95% relocates the failure from capability to **attention**: an agent at stage 4 is not failing at
stage 4's request, it is building correctly on a foundation it has no procedure to re-check, and its
self-tests rarely revisit earlier stages. That is a statement about **how these systems are wired** —
append-only history, tests scoped to the current step — not about model quality; the no-rollback
design is what removes the human who would have said "wait, Tuesday's cache invalidation is wrong".

Two credibility notes: the pipeline is the vendor's **own** evaluation harness (it "extends internal
evaluations to this setting and guides the development of Hunyuan"), so read the per-agent table as
self-measurement; and 73 tasks with stages mined from real histories is small — enough to say
"sequential feature work degrades in this harness", not enough to rank the 10 agents.

## 4. The control that prices consequence instead of confidence

**CASEL** (arXiv 2610.36570, submitted 2026-10-27) replaces an uncertainty threshold with a per-call
choice among six modes — direct execution, verification, sandboxing, clarification, approval,
abstention — minimising a **per-mode cost** built from calibrated failure probability,
**state-dependent consequence, reversibility, ambiguity and evidence freshness**.

- Controlled simulation, **20 seeds × 120,000 test actions**, "every method has the same intervention
  menu and **the same compute cost**" — the comparison is against an uncertainty-ranked gate.
- Harmful-side-effect trajectories **14.75% → 7.02%**; mean normalised harm **0.184 → 0.123**.
- The consequence-product gate reaches similar harm (**5.82%**, 0.120) but sends **45% more actions
  to human approval**; removing **reversibility-aware routing** raises harm to **15.53%**; a
  trajectory-level risk budget **increases** harm (**11.82%**) at equal cost.
- **Its own limit sentence, which is stronger than "it is a simulation":** "Intervention
  effectiveness is assumed, not measured: the results rank allocation rules under the simulator's
  assumptions and do not establish deployment effectiveness."

The transferable claim is narrow: consequence and reversibility are cheap to estimate per call and
carry information uncertainty does not, which is why the ranking function — not the menu — is where
the gain sits.

## 5. The negative self-measurement

**`Donchitos/Claude-Code-Game-Studios`** (28,645★, 4,017 forks, MIT, 49 agents / 74 skills / 15 hooks
/ 14 rules / 62 templates; the GitHub *description* says "72 workflow skills" while the README badge,
table and directory all say **74** — the README is the document with per-category arithmetic) runs a
controlled comparison across its own configuration and publishes the **negative** result: four games
from one brief, documents written **before the first line of game code** — `minimal` **1** doc / 0 min,
`standard` **30** docs / 58 min — all produced a running, tested game, and "two blind reviewers and a
human playtest then ranked the `standard` build **last** — the extra 29 documents bought traceability,
not a better game."

Read the boundary before quoting it: **n=4, one brief, two reviewers, one playtest**. It is evidence
that documentation level is **not monotonically good**, not a ranked finding. The same section's
second half is the check the first half is not — a passing test is insufficient for a game, "someone
has to *look* at it" — which is why the workflow runs the build rather than asserting about it.

## What to check on any future "harness cost" claim

1. **Whose denominator?** `cost_usd` estimate ≠ invoice; on a subscription the currency is rate-limit
   headroom. Say which one the percentage is of.
2. **Does the overhead scale with the task or the session?** A per-agent summariser over the **full
   transcript** grows with context length; a fixed prompt does not. The mechanism tells you which.
3. **Is the share one subscriber's week or a range?** Quote the range from independent measurements
   when the source supplies one (18–26% → "a sixth to a quarter").
4. **Was the counter-design measured against the same budget?** "Safer" is meaningless if the gate
   asks for approval more often; CASEL equalises the compute and then reports the approval cost too.
5. **Is the failing unit the model's step or the harness's memory of its own steps?** Ask whether any
   procedure in the loop re-reads an earlier stage; if none does, the decay is structural.
6. **Did the project publish its own losing row?** The 30-document build ranked last, "intervention
   effectiveness is assumed", x86 cells that got *slower* — the row that costs the claim is the one
   that makes the rest citable.

## Open questions (filed to the action agenda)

- Is **`agent_summary`'s share** reproducible on a second account or plan, and does Anthropic ever
  ship the setting #86879 asks for? (A *feature request* is not a roadmap.)
- Does any client expose **per-feature token accounting** (`query_source`-style) to users, or is
  OpenTelemetry the only instrument that can see this class at all?
- Does a **re-check procedure** bolted onto a persistent session (an explicit "re-validate stage N−1"
  step) move FeatureArc's 28.5%, or does the decay come from context, not procedure?

Sources: [the token-audit gist (measurements, hook, version table, fail-open)](https://gist.github.com/flamerix-ai/c3905705cc4205e5de3011fa2e74efce) · [anthropics/claude-code#86879](https://github.com/anthropics/claude-code/issues/86879) · [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) · [claude-mem architecture](https://docs.claude-mem.ai/architecture/overview) · [FeatureArc (arXiv 2610.37434)](https://arxiv.org/abs/2610.37434) · [CASEL (arXiv 2610.36570)](https://arxiv.org/abs/2610.36570) · [Donchitos/Claude-Code-Game-Studios](https://github.com/Donchitos/Claude-Code-Game-Studios)

→ [[harness-reliability]] [[token-economics]] [[agent-stack]] [[fact-check]] [[frontier-models]]
