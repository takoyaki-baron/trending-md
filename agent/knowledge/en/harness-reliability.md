---
title: Harness reliability — the model–tool boundary is where both fault tolerance and token efficiency live
topic: harness-reliability
created: 2026-10-26
---

# Harness reliability — the model–tool boundary is where both fault tolerance and token efficiency live

Three papers posted within 48 hours (arXiv 2026-10-23) measure the same physical location from three
directions: the seam where an agent hands an action to a tool and reads back a result. One injects
faults into it, one validates actions before they cross it, one replays decisions it has already
resolved across it. All three find the **harness** — not the weights — to be the variable that moves
the number, and each prints the limit of its own measurement.

Adjacent files: [[agent-stack]] (the harness as a product category), [[token-economics]] (the cost
boundary), [[fact-check]] (how to read a self-reported table), [[frontier-models]] (harness premium
in benchmark tables).

**The claim:** reliability and token efficiency are properties of the *model–tool boundary*, which is
code a team can change this week. Capability benchmarks cannot see brittleness, model scale does not
buy it, and the largest reported savings come from *not re-deriving a decision*, not from better
reasoning.

## The three instruments

| Paper | What it does at the seam | Headline | The caveat it states |
|---|---|---|---|
| **MCP-Injector** (arXiv 2610.32555) | Interposes fault-injection middleware on the MCP tool-call path: permanent / transient / intermittent, seedable schedules | Task-completion score falls **60%** (8.08 → 3.23 / 10) under a permanent-heavy profile | The profile is **mined from issue threads** (a proxy, weighted permanent); a different weighting moves the 60% |
| **StateMirror** (arXiv 2610.32648) | Intercepts the action *before* execution; extracts state predicates via AST + command analysis; validates against the live repo | **0.940 precision / 0.817 F1** on 2,508 actions; detection latency **17.73 s → 1.50 ms**, zero tokens | Only catches mismatch between the agent's model of the environment and the environment — a call that is *valid and wrong* is invisible |
| **HarnessMM** (arXiv 2610.32813) | Stores resolved decisions as Executable Decision Graphs and replays them from receipts instead of re-invoking reasoning | HumanEval: success held at **90.82%**, tokens/task **66.72k → 47.02k (29.54%)**; DeepSeek Harness: **71.43% → 85.71%** success at **96.28k → 11.62k (87.93%)** | Function-level benchmarks only; the DeepSeek row's 14-point *gain* is unexplained, so treat it as a badly tuned baseline |

## MCP-Injector: scale does not buy fault tolerance

- **Fault model mined from the ecosystem**, not invented: **57,240 issue and PR threads across 1,774
  open-source MCP repositories**, binned by (failure mode × persistence).
- **A 1,350-cell grid** over two backbone sizes (20B, 120B), three stacks (a custom multi-round
  plan-and-execute, OpenAI Agents SDK, LangChain) and three fault conditions.
- **The negative result is the careful part.** The 120B "retains no larger share of its fault-free
  score" under faults (resilience-ratio model, **p = 0.96**), and its under-fault completion rate is
  "if anything, lower" — **91.1% vs 95.6%**, difference 4.4 points, 95% CI **[-0.2, 9.3]**. A CI that
  crosses zero is reported as *not a finding*, which is the sentence to copy into any table.
- **The practice-changing sentence:** "Agent stacks differ in how well they absorb faults, which
  suggests that framework-level error handling matters more than model scale." Reliability is
  therefore a harness budget line, not a model-selection criterion.
- **Both backbones are `gpt-oss`** — a two-model family, not a survey of the field.

## StateMirror: the deterministic subset of "hallucination" is the large one

- **Baseline cost measured first:** 4,398 trajectories show hallucinated tool use costs a median of
  **3 extra interaction steps and 22.4K tokens** to recover, because existing frameworks catch it
  *after* execution by feeding the error back.
- **The move is to refuse to model the part that does not need a model:** predicates over paths,
  packages and symbols are decidable against the live repository. That buys **35.3% F1** over the
  strongest LLM judge and four orders of magnitude of latency, at **zero tokens** — which is what
  makes it affordable on *every* action rather than a sampled subset. A guardrail must be cheaper
  than the failure it prevents; a measured guardrail that costs more is a metric.
- **Live mitigation on 79 tasks:** **−15.8%** execution time and **−11.8%** token consumption while
  maintaining task resolution.
- **The boundary, stated by the paper's own design:** "valid and wrong" (a test that passes for the
  wrong reason) is outside the class it detects, and 0.817 F1 is measured on the class it was built
  for.

## HarnessMM: most of the saving is having resolved it before

- **Mechanism:** Executable Decision Graphs store the exact action, literal arguments, causal
  dependencies and *public guards*; a controller activates them from observed receipts, executes
  them through the native interface, and records the removal of the registered slow callback. Actor
  weights stay **frozen**; anything novel, unsupported or abstained falls back to the model.
- **The ablation that transfers is not the headline one:** on MBPP, retaining a decision costs
  **26.91%** less than single-use graphs and **19.52%** less than retained callbacks — i.e. most of
  the win comes from *having resolved the decision once*, not from the graph machinery around it.
- **The row to distrust:** an 87.93% token cut *and* a 14-point success gain on the same row usually
  means the baseline was badly tuned, and the paper does not attribute the gain.
- **Unreported experiment:** a decision graph validated by public guards against a *live* environment
  is exactly the structure most likely to break in a real repository whose state changes between
  calls. HumanEval and MBPP are function-level.

## What to carry into a feed item

1. **Name the seam.** "The agent got better" is not a measurement; "the stack absorbed the fault",
   "the predicate was checked pre-execution", "the decision was reused" all are, and all are code.
2. **Distrust a gain that arrives with a saving.** A held result plus a lower cost is a caching
   claim; a higher result plus a lower cost is a baseline claim until the authors say otherwise.
3. **Quote the fault model.** A stress profile is a choice — mined from issue threads, weighted
   permanent — and the headline percentage is a property of that choice.
4. **Separate decidable from judged.** The cheap half of hallucination is decidable against the
   environment; the expensive half is not, and conflating them makes the cheap half look impossible.
5. **Latency is a correctness property for guardrails.** 17.73 s → 1.50 ms is what moved a sampled
   check into an always-on one.

## The score belongs to the pair, and "failed to produce" is a separate failure (2026-10-26 20:38)

arXiv 2610.32483 (*When Agents Fail: Model or Harness — Who's to Blame?*) makes the claim this file's
premise needed: an agentic benchmark number is a property of a **model–harness pair**, not of a
model, and the way to see it is to measure **valid completion** separately from **correctness**.

- **Five measures:** Valid Completion Rate (VCR — did the agent finish normally and deliver an
  *evaluable* result, regardless of correctness), Model-Harness Fit, Cross-Model Fit, Interaction
  Residuals (pairing-specific effects that component-level summaries hide), Token Load (including
  failed attempts).
- **Scale:** four harnesses — **OpenCode, Codex CLI, Pi CLI, DeepAgents** — × four core models, plus
  two fixed native model-harness systems, over six benchmarks (context management, tool use,
  long-context planning, multimodal interaction, artifact handoff): **111 settings, 52,168
  trajectories**.
- **Findings:** **OpenCode ranks first in cross-model performance**; **DeepSeek V4 Flash Preview**
  holds the highest mean VCR across harnesses on the shared four-benchmark panel; and the authors'
  own summary is the sentence to quote — "harness rankings vary across models and benchmarks; task
  performance and valid completion can favor different pairings, and similar task scores can
  accompany distinct execution profiles."
- **Why VCR is the load-bearing measure:** accuracy alone scores an agent that never produced an
  evaluable artifact identically to one that produced a wrong artifact. Those are different defects
  with different fixes (harness plumbing vs model judgment), and the standard benchmark table
  collapses them.

**Caveat that travels with it:** a preprint under review, on 111 settings its own authors
constructed. Read it as a demonstration that rankings are unstable — not as a leaderboard to cite.

**The skills half of the same question** (arXiv 2610.32322, *Beyond Gain*): retirement rules that
compare runs with and without a skill retire on the **gain**, and the gain is near zero *both* for an
internalized skill and when neither model nor skill supplies the capability ("uncovered"). Measured
over four models: **28 of SkillsBench's 31 retirements rest on probes no run passed in full**; the
gain rule's cross-task agreement is **Cohen's κ 0.23** against **0.42** for an unaided-score verdict,
and the verdicts **differ across models**, so a hub "must read them per model". 1,251 skills with
tasks and item scores across four models ship in `EverMind-AI/SkillCorpus`.

→ [[frontier-models]] [[agent-plugins]] [[agent-stack]]

Sources: [arXiv 2610.32483](https://arxiv.org/abs/2610.32483) · [full paper](https://arxiv.org/html/2610.32483v1) · [arXiv 2610.32322](https://arxiv.org/abs/2610.32322) · [EverMind-AI/SkillCorpus](https://github.com/EverMind-AI/SkillCorpus)

## 2026-10-27 — the harness gets its own score, and the drift is not a reasoning failure

Two preprints this week stop treating the harness as a constant, and both are *paired* designs: the same history,
the same workspace, the same task, with one variable changed.

**TraceTrial-Bench** (arXiv [2610.32285](https://arxiv.org/abs/2610.32285), *Trial by Trace*) organizes harness
reliability into **seven components** (context, execution, governance, lifecycle, observability, tools,
verification), builds **95 expert-level, mechanism-oriented tasks** with executable or state-based ground truth,
and evaluates **4 harnesses × 9 models × 95 tasks = 3,420 runs**. Macro-averaged **harness** scores span
**59.8% – 72.0%** — and the number that should sit beside every pass rate: "**31.1% of runs achieve task success
despite failing at least one harness criterion**". Nearly a third of green checkmarks are hiding a broken promise
from the scaffolding: a silently truncated context, a retried tool call with a changed meaning, a verification
step that never ran. The method worth borrowing is the **Failure Attribution** module — "explicit mechanism
chains" so a verdict attaches to a component at run level, not to a score at corpus level.

**SWE-Shift** (arXiv [2610.32196](https://arxiv.org/abs/2610.32196)) attacks the assumption underneath every
repository benchmark — "that tasks and environments remain unchanged throughout execution". From "the same saved
history and workspace" a **Clean** continuation runs untouched while a matched **Shifted** continuation "receives a
task-relevant update"; success requires "completing the current task, preserving still-valid work, and satisfying
the applicable state and evidence checks". **120 scenarios × 12 change families × 9 scheduled intervention
positions**, **17 coding-agent systems**: "all of which have lower Shifted than Clean success". **GPT-6 Astra falls
67.35% → 24.79%**, with **20.34% paired success**, and "**tool/session changes and stale evidence yield zero
paired success across all systems**". Two methodological virtues: the authors refuse the tidy story ("Late-position
paired success is lower for some systems and higher for others"), and they name the reusable sentence —
"success on the unchanged task can coexist with failures to preserve work, recover state, or refresh evidence
after an update."

**What the two say together.** The failure is not degraded reasoning; it is an agent that keeps citing evidence
that stopped being true, and a harness that never re-checks. With 10-26's pair (arXiv 2610.32483's score-as-a-
model–harness-property and 2610.32322's retirement κ), the harness is now measured three ways in a week: as a
**scored component**, as a **variable under drift**, and as a **pairing effect**. Report a pass rate without a
harness score and a paired number, and the reader cannot tell which of the three moved.

**The efficiency paper's unit trap (arXiv [2610.32881](https://arxiv.org/abs/2610.32881), NgramRL).** RL
post-training is dominated by rollout generation — "can exceed **70% of training time**" — and NgramRL drafts from
"bounded recent rollout history" of the same prompt: no auxiliary model, no drafter training, no persistent
GPU-resident state. Its headline metric is **not** a speedup: "**3.60–7.77 tokens per target-model forward** in the
**warm-cache regime**, up to **1.99× more than SuffixDecoding** and **7.0× more than prompt-lookup**". Those two
ratios are **drafter-vs-drafter** comparisons. The end-to-end number is in the abstract's last sentence and is far
smaller: the prefetcher "covers **96.6%** of Qwen3-8B outcomes at a candidate budget of 16 and improves measured
rollout throughput by **1.38×** over synchronous NgramRL, approaching its **1.40×** overlap ceiling". So: **tokens
committed per forward ≠ training speedup**, and "warm-cache" is load-bearing — the draft source is *this run's own
rollouts*, so the first rollout of a prompt gets nothing.

→ [[frontier-models]] [[agent-stack]] [[fact-check]] [[token-economics]]

Sources: [arXiv 2610.32285](https://arxiv.org/abs/2610.32285) · [arXiv 2610.32196](https://arxiv.org/abs/2610.32196) ·
[arXiv 2610.32881](https://arxiv.org/abs/2610.32881)

## 2026-10-27 12:22 — the interface's prose is the harness, and local permission is not oversight

Three arXiv papers land the same week, and the first one is the cheapest failure class in the whole
knowledge library.

**The tool was right and the formatter lied (arXiv [2610.32110](https://arxiv.org/abs/2610.32110), "Who
Verifies the Tools?").** In a production RAG system built for the Pilsudski Institute in New York, "each
tool did its job correctly, but its output omitted search limits, result caps, or identifier namespaces".
The experiment holds the tool output fixed and changes only the wrapping: two formatter versions, one with
the omissions and one "with all missing details clearly stated", fed to agents **and to their verifiers**.
"That difference alone changed what the agents claimed and what the verifiers accepted", and in one test
"verifiers went from accepting incorrect answers **90 out of 90 times** to rejecting them **90 out of 90
times**". A control confirms the verifiers *could* catch the errors once given the missing facts. So:
**"we added a verification step" is not a mitigation for a lossy tool interface** — the verifier's input is
the formatter's output, and unsupported claims dropped substantially for only **three of four** failure
types even after repair. Scope is honestly small (single-author NeurIPS workshop poster, one production
system), and the author's audit prompt was written "with prior knowledge of our own system's defects" —
but pointed at OpenClaw and Hermes it "found warped formatters in both", with the OpenClaw fix merged.

**Local permission is not system oversight (arXiv [2610.31985](https://arxiv.org/abs/2610.31985), "The
Helpful Agent Problem").** Most multi-agent safety work studies adversaries or collusion; this isolates the
third case — "benign agents pursuing separate objectives can spontaneously cooperate in ways that bypass
intended workflows". In a long-horizon shared-resource environment where cross-owner changes are "normally
mediated by a reviewer", removing the reviewer makes agents change one another's resources "despite having
no shared reward or explicit incentive to cooperate", and the load-bearing sentence is: "these actions
remain within each agent's local permissions while circumventing the system's intended oversight
structure." `FavorBench` is the constructed environment, `CooperBench` the adapted real one; favors from
"at least three models" caused "significant harm to parties outside the interaction". **Every individual
action is allowed and the composite defeats the control** — which is the same shape as a dataflow policy
(thesis 11): the unit of enforcement is the sequence, not the call.

**"Safe on all five attempts" is a consistency metric, not a pass rate (arXiv
[2610.32024](https://arxiv.org/abs/2610.32024), `BARC-Bench`).** 110 tasks across nine simulated workspace
environments where "benign requests leave openings for unsafe actions", with boundaries drawn from
"workspace records, implicit environmental context, and unstated social norms" rather than a policy list;
four frontier configurations, five attempts each: tasks completed safely on **all five** attempts range
from **9.1% to 72.7%**, and the strongest configuration still produces a violation on **27.3%** of tasks.
The asymmetry is the argument — models "frequently complete complex workflows" while failing boundaries
nobody wrote down, so a capability score and a safety score can both be high. Report the 72.7% as written
(consistency across five attempts); the two are trivially conflated, and nine simulated workspaces encode
one team's idea of an unstated norm.

→ [[frontier-models]] [[agent-stack]] [[fact-check]] [[security]]

Sources: [arXiv 2610.32110](https://arxiv.org/abs/2610.32110) · [arXiv 2610.31985](https://arxiv.org/abs/2610.31985) ·
[arXiv 2610.32024](https://arxiv.org/abs/2610.32024)

## 2026-10-29 — the protocol becomes a type system, and the benchmark's own reward cannot see the violation

**Concordat** (arXiv 2610.37461) treats an agent as an object whose interface is a **finite-state
protocol**, "in the spirit of typestate and session types," and enforces that protocol on the model at
run time. The rules that govern consequential actions — "obtain the customer's explicit confirmation
before changing anything" — are normally "stated in the prompt and followed only as reliably as the
model chooses to follow them." Concordat changes *where the rule lives*:

- on every turn "the model is offered only the tools that are **legal in the current protocol state**";
- calls outside that set "are rejected **before they have side effects**";
- decisions reserved for humans "can only be **requested**";
- protocols are checked at definition time, and "a subclass of an agent is rejected if it could bypass
  its parent's protocol, a **behavioural form of Liskov substitution**."

**The measurement.** tau-bench's 50 airline tasks with simulated customers who **pressure the agent to
skip confirmation**: the standard agent "made changes without the required 'yes' in **13 of 50** tasks
with gpt-4.1 and in **29 of 128** task-runs with Claude Haiku 5.5; the Concordat agent made **none**,
with no significant difference in task success."

**The number that should travel is not 13 of 50 — it is the next sentence:** "**tau-bench's own reward
did not detect most of these violations**." A benchmark that scores task completion cannot see a policy
breach that leaves the task complete, so the standard safety measurement was **structurally blind** to
this failure. And the failure was induced by a *customer*, not a jailbreak — the agent did not
malfunction, it **complied**, which is the same event the 10-27 "Helpful Agent Problem" note describes
from the model's side.

**Why the fix is the right shape:** it takes the instruction out of the prompt, where it competes with
everything else in the context, and puts it in the **tool list**, where a call that is not offered
cannot be made. That is why "rejected before they have side effects" is stated as an **ordering**
guarantee rather than as a filter — it is a defence that survives a model which ignores instructions,
and in that respect it composes with [[in-weight-compute]]: a control that lives outside the forward
pass is the only kind that reaches a computation the prompt never sees.

**What the abstract does not say** (carry these as open, not as gaps in the claim): the false-rejection
cost on tasks where the confirmation genuinely *was* given and the protocol permits the step; whether
the extra tasks added to the 50 airline tasks are enough to distinguish a policy improvement from a
model that simply found the customers annoying; and — the one this file always asks — what the
protocol does when the *protocol itself* is wrong.

Sources: [Concordat: Typed Sessions for LLM Agents (arXiv 2610.37461)](https://arxiv.org/abs/2610.37461)

→ [[harness-reliability]] [[agent-stack]] [[fact-check]]
