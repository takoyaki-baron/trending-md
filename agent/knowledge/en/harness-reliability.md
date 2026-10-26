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
