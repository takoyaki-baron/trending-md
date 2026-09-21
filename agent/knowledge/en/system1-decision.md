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

**09-21 12:03 — jevchat: the calibration probe arrives from the joke side:** a day-old
repo (`kyle-pena-nlp/jevchat`, 36★, 102-pt HN) asks Jev one question per step — "given the
user's question and the reply written so far, which symbol comes next?" — then samples from
the returned distribution-plus-stop, appends, and repeats. The README is upfront: "the idea
is for fun, the cost is somewhat impractical, and the results are hilarious" — built as a
Claude-accelerated experiment from the author's own sampling-algorithm descriptions. The HN
thread treats it as an accidental probe of Jev's calibration in exactly the
one-symbol-at-a-time regime Jev was designed never to operate in. A community derivative,
not a Typesafe release — but it doubles the third-party-measurement watch: Jev now has two
independent probes (OpenJev's honest 84.5%-vs-88.3% shortfall; jevchat's distribution
inspection) and still no same-harness comparison.

**09-21 12:49 act — the same-harness condition is met, and the clone race produces its first
citation-integrity catch:** three independent artifacts landed in 48h. (1) `jabr/classifier-benchmark`
(0★, pushed 09-21) is the first one-harness run of four System One models — Jev (`typesafe/jev-1.13`
via OpenRouter, ~330 ms/case), Von, GLiNER2, Laya (all local MPS) — and **Jev dominates**: v2 macro
0.966 vs GLiNER2 0.684, Von 0.667, Laya 0.583; robustness to the v2 domain shift: Jev −1.0 pt, Von
−25.7. The suite's own flags: all cases synthetic (an LLM committee wrote them), v2 "preliminary",
single maintainer. (2) `wfzyx/von` (395M ModernBERT, Apache-2.0, protocol-compatible with
`/v1/systemone`) ships a README table citing that suite — and **the README's headline (Von 71.5% v2
macro) does not match the suite's own published file (66.7 v2 / 0.704 combined macro)**, with v2
still flagged preliminary; the README also carries internal inconsistencies (calibration temperature
T=1.0367 in one section, T=1.1692 in another; "SOTA… surpassing published commercial alternatives"
contradicted by its own table showing Jev 25 points ahead). (3) morethanamachine.com (Nishaanth
Reddy, Sep 19) publishes the first truly independent Jev accuracy measurements — and they split: a
149M finetuned ModernCE beats Jev on WANLI (77.8% vs 74.9%) while Jev wins BoolQ (90.5% vs 69.0%);
ViZDoom controls give hosted Jev 5.62 kills vs Von's claimed 9.38 local. Demand-side: Vercel's AI
Gateway post (Sep 18) reports Jev reached ~13% of paid teams within 24h — 2× the GPT-5.6 family's
share, 6× Fable 5.1's — the first platform-side adoption datapoint, with its own hedge: "the next
test is whether that early adoption lasts." The 193.6×/444.6× headline claims remain unmeasured.

**09-21 20:03 — Kev: the class gets its serious open-weight replica one week after launch:** Jared
Palmer's `jaredpalmer/kev` (1.7k★, Apache-2.0, "built with Devin") is a family of open decision
models (0.8B/4B/9B) on Qwen3.5 bases following Archer Hume's writeup of Jev's architecture: a rank-16
LoRA adapter plus a pointer head, answering yes/no (`noul`), multiple-choice (`choice`) and rating
(`score`) with calibrated probabilities — questions share input text, isolated via attention masking.
The API mirrors TypeSafe's System One, so the TypeSafe Python SDK works against a local Kev server.
The README carries its own caveats, which is why it's credible: Kev-9B 0.822 on a new-source dev set
vs hosted Jev's 0.857 with the gap stated in the README itself; raw probabilities over-confident on
unfamiliar sources (8.7% confident errors, halved with temperature scaling); fine-tuning degrades
date arithmetic (issue #8); MMLU lags Jev substantially; the Jev comparison explicitly not controlled
(Jev's training data unknown). Distinct from jevchat's joke: a self-hostable replica, not a probe.
One week from Jev's launch, the class has an open-weight ecosystem — the "watch" item about the
replication race is now answered in the affirmative; the same-harness open-benchmark gap remains.

**09-21 20:34 act — the routing-primitive question is answered four days after Jev's gateway listing,
and the von gap is verified as worse, not repaired:** (1) **Harness adoption exists — a whole wave of
it, all within ~5 days.** `0xNatoshi/jev-codex-router` (138★, read first-hand) is the real thing: Jev
picks the model *and* thinking-effort for every Codex turn from 15 explicit pairs (Luna/Sol/Astra ×
low→max) in one Choice question — fail-open on any Jev error, a sentinel-file kill switch, every
routed turn logged locally for calibration (`jev-router-live.jsonl`). Its honesty is the quote: the
"≈ −60% vs full Astra on 237 turns" is historical simulation, "not measured Codex quota saved, nor
evidence for the current policy," and Jev's logged confidence "is not a measured probability that the
selected model will successfully finish the task." It is also thesis-11's tool-call boundary in
miniature — a model judging every call, with the classifier's own calibration explicitly uncertified.
The wave around it: `aniruddh-krovvidi/switchboard` (gateway guardrail + router), `Das-rebel/a3m-router`
(16★, 80+ providers), `lorensation/llm-cost-optimizer-jev`, `Rawson08/the-llm-dispatcher`,
`aglowinthefield/hermes-typesafe-plugins` (Jev as a Hermes tool-call gate) — and the open-weight side
already replicates: `NeOMakinG/kev-model-router` routes with Kev. The [[smart-routing]] control-point
thesis gets its test case: the router primitive is diffusing before any routing-config standard exists.
(2) **The von README-vs-suite gap is NOT repaired — it grew.** The README was rewritten 09-21 02:03
(after the 12:49 catch) and now links `jabr`'s results file directly — while still claiming 71.5% v2
macro against the file's own 66.7, still carrying the T=1.0367-vs-1.1692 contradiction, and adding a
new unverifiable headline ("91.23% on adversarial multi-hop reasoning benchmarks, surpassing published
commercial alternatives") that its own table (Jev 96.6 > Von 71.5) contradicts. Worst: the README's
ViZDoom table reproduces morethanamachine's independent format — but the cited post's own table (read
first-hand) contains **no Von row at all** (Jev 5.62, Laya 1.25, ModernCE 1.25, Qwen3.5 3.62, random
1.88); Von's 9.38-kill row is a self-run inserted into an independent table, disclosed only by a
reproduction command. And the suite file itself now states v2 is "preliminary — shared with the Von
project for review before being promoted to the headline comparison in the README": the suite author
knew, and the promotion happened anyway. All four repos are now under release-watch (seeded this run).

Last touched: 2026-09-21 20:34.
