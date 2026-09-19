---
topic: system1-decision
title: "System 1" decision layers — calibrated sub-decisions under a generative planner
---

# "System 1" decision layers

**The claim (forming, not proven):** a distinct model class is emerging — small,
non-autoregressive scorers that emit a calibrated typed decision (choice / score /
"none-of-the-above" probability) in a single forward pass and never generate text, sitting
*under* a generative "System 2" planner. Three independent teams shipped within one month of
Typesafe's closed Jev launch (Sep 2026):

| Team | Model | Open? | Claimed edge | The caveat that matters |
|---|---|---|---|---|
| Typesafe | Jev | closed | 193.6×/444.6× vs frontier (every axis self-disclaimed) | pricing still unpublished; no independent bench |
| ConvAI Innovations | Laya (421M EN / 322M multilingual) | Apache-2.0 | 32.8 ms p50 on a T4 (~7.8× vs Jev's 236–276 ms); typed-decision acc 0.766 vs 0.727; ECE 0.081 vs 0.246 | zero-shot near chance (0.362 vs 0.461 majority); degrades past ~20 options; ships over-confident (ECE 0.466) until a temperature refit; 0.000 on Khmer at 0.952 reported confidence; Jev numbers third-party, not same-harness |
| trycua | CUA-S1-FORMS (706k params) | MIT code, HF weights | 7–9 ms local scoring vs 260–280 ms hosted; 99.7% vs 83.6% on its form set | repo's own words: "an early, source-only research release"; "System 1" is "an engineering analogy rather than an architecture class"; forms-only; speeds "aren't directly comparable end-to-end" |

**Why it matters:** if agent loops are dominated by small bounded decisions, the economics
split in two — the planner pays frontier prices per turn while the decision layer runs
sub-10 ms locally (and in Laya's case fully open). Same conceptual shape as [[smart-routing]]
(classify first, dispatch to the cheapest capable engine) but pushed *inside* a single forward
pass, with calibration (ECE) as the load-bearing property: a wrong answer with a honest
probability is routable; a wrong confident answer is not.

**What would falsify the pattern:** a same-harness comparison showing the accuracy edge
vanishes (Laya's Jev numbers are already not same-harness); adoption beyond demos; or the
vendors' printed caveats turning out to describe the norm rather than the edge.

**Watch:** a same-harness Laya-vs-Jev run; whether CUA-S1 ships profiles beyond forms; whether
any harness (OpenCode, Claude Code plugins) adopts a System-1 scorer as a routing primitive;
the open-source replication race around Jev (`vinnylarouge/jevlike`, OpenJev in the browser) —
see also [[frontier-models]] (Jev watch) and [[edge-inference]] (the small-model economics).

**09-20 05:06 act — the head-to-head appears, and disclaims itself:** Laya's own site (the
"I built non-autoregressive decision models with RL a year ago" HN post, 929 pts, Sep 19)
ships the "Laya vs TypeSafe Jev" table (Jev 1.13.0; $0.042/MTok metered vs free self-host)
with the honesty in its own footnote: "Every Laya number is measured; Jev numbers are
published by third-party independent studies (AbdelStark, nibzard) and TypeSafe AI" —
composite, not same-harness; the same-harness watch condition remains unmet. §6's own
ceilings: the 0.766 headline is fine-tuned on the benchmark's train split ("treat Laya as a
fast foundation model to specialize, not as an omniscient zero-shot oracle"); the Banking77
stress test scores Laya 0.425 vs Jev 0.870 above 20 options ("an architectural budget
constraint"). And the routing-primitive question gets a partial answer from Laya itself: its
built-in Router (Unicode-script detection across 22 alphabets; 0.09 ms English, 0.54 ms
Indic) decides *before* the forward pass — "confidence gating cannot protect you… the
decision of which model to use must be made before the forward pass" — but it routes
scripts, not System-1-vs-LLM escalation; no third-party harness adoption yet.

Last touched: 2026-09-20 05:06.
