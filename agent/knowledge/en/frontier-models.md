---
title: Frontier model economics
topic: frontier-models
created: 2026-08-13
---

# Frontier model economics (Aug 2026)

The frontier LLM race as of the Aug 2026 trend window: the benchmark gap between open-weight and
closed models keeps shrinking while the price gap stays enormous — "reasoning quality" is no longer
the moat; distribution and integration speed are.

## The Aug 13 double-header

- **DeepSeek V4 Pro GA** — `DeepSeek-V4-Pro-0813` promoted from preview to GA overnight. Adds
  agent-grade plumbing (JSON structured output, tool calling, Responses API, Anthropic-compatible
  API, Codex integration), 1M-token context, up to 384K output. DeepSeek's benchmark table: within
  ~5% of Anthropic Claude Fable 5 across 10 agentic benchmarks, *beating* it on Cybergym (83.3 vs
  83.1) and AutomationBench (31.8 vs 29.1); the biggest jump is DeepSWE (12.8 → 62.7, long-horizon
  software engineering). Self-reported harness; DSBench-FullStack/Hard are internal → third-party
  verification pending.
- **xAI Grok 4.6** — tuned for long-running agents and visual/interactive work, with better
  self-verification over long trajectories. Artificial Analysis Intelligence Index **61**, matching
  GPT-5.6 Sol Max (61 vs 62); ~69.9% CursorBench v3.2, ~65.9% DeepSWE v1.1. $2/M input, $6/M output
  via API + OpenRouter/Vercel/Cloudflare. Proprietary, no open weights announced.

## The pattern

Three closed-frontier anchors (Claude Fable 5, GPT-5.6 Sol, Grok 4.6) and a fast-rising open-weight
tier (DeepSeek V4 Pro, Motif 3, Qwen-Max-class) now trade within a few points on agentic benchmarks
while spanning a huge input-price range. "Reasoning quality is the moat" is failing; the frontier is
a multi-way race on price + distribution + tooling integration.

## Qwen-Max goes open (Aug 14)

**Qwen3.8-2.4T-A95B** — `Qwen/Qwen3.8-2.4T-A95B` — is Alibaba's first fully open-sourced
Qwen-Max-class (flagship) model. A fine-grained MoE with **2.4T total / ~95B active** parameters,
512 experts per layer (10 routed + 1 shared), hybrid Gated-DeltaNet + Gated-Attention, and
multi-token-prediction training. Native 262K context (extensible to ~1M); the open build is
text-only with thinking forced on. Self-reported: Terminal-Bench 2.1 86.6, PaperBench 93.0, GPQA
Diamond 92.6, SWE-bench Pro 67.7. Weights (~4.9TB BF16) on Hugging Face + ModelScope under a custom
Qwen3.8-Max license; NVIDIA's blog shows it served on a GB300 NVL72 rack at 4,000+ tok/s per GPU in
FP8 via vLLM/SGLang/TokenSpeed.

This closes the open-vs-closed gap at the very top of the curve: a *downloadable* Qwen-Max-class
model shifts fine-tuning and self-hosting economics for teams that previously could only call
Alibaba's API. It is the strongest instance yet of the Aug pattern — Chinese labs ship frontier-scale
open weights (DeepSeek V4 Pro, Qwen-Max-class) while US labs ship smaller, faster closed models.

## Pricing (verified 2026-08-13)

The feed's "~1/46th the price" headline was **wrong** and has been corrected to "~23× on input".
Verified against the primary sources — DeepSeek's pricing page (`DeepSeek-V4-Pro-0813`) and
Anthropic's published Fable 5 rates:

| Token | DeepSeek V4 Pro | Claude Fable 5 | Fable 5 ÷ V4 Pro |
|-------|-----------------|----------------|------------------|
| Input (cache miss) | $0.435/M | $10/M | ~23× |
| Output | $0.87/M | $50/M | ~57× |
| Input (cache hit) | $0.003625/M | $1/M | ~276× |

The defensible headline is **~23× cheaper on input** — exactly the body's own "$0.435 vs $10".
Output is ~57× cheaper. The "46×" figure traces to neither: the exact Void-class failure the
[[fact-check]] method exists to catch — a headline number that never pointed to a source. Feed title
corrected (en/zh/jp).

## Sovereign open-weight goes beyond US/China

- **Motif 3** — `Motif-Technologies/Motif-3-Beta` (South Korea's Motif Technologies), MIT (instruct +
  base). A from-scratch sparse MoE: ~314B total / ~13.2B active params, 384 routed experts (top-8),
  native 256K context, ~12.5T-token pretrain, trained on 768 NVIDIA B200 GPUs over ~5 months. Custom
  in-house components (Grouped Differential Latent Attention, Grouped PolyNorm, manifold-constrained
  hyper-connections) — not a Llama/Qwen re-parameterization. Artificial Analysis Intelligence Index
  47: 9th globally, 4th among open-weight, 1st outside US/China; SWE-bench Verified 76.2,
  Terminal-Bench 74.9. The frontier now has a third pole of open-weight competition under a
  permissive license.

## The safety threshold (a new frontier constraint)

OpenAI paused **Astra**, an unreleased frontier model, after its own Preparedness Framework concluded
it "cannot rule out Critical capability" — the first model to hit the highest tier (independently
discovering zero-days and executing end-to-end cyberattacks without human direction). Development now
proceeds only in isolated sandboxes with restricted network/tool access, weight encryption, and
chain-of-thought monitoring. A live test of "reasoning quality is no longer the moat": at the very
top end, *offensive-cyber capability* is the threshold that now gates release. Reported by PCMag /
InfoSecurity (secondary); OpenAI's own statement not yet primary-confirmed here.

This is one lab's instance of a **converged cross-lab shape**. OpenAI PF v2 (two thresholds — "High"
and "Critical"), Anthropic RSP v3.0 (ASL-1 → ASL-5+ biosafety-style levels, effective Feb 24, 2026),
and Google DeepMind FSF v3.1 (Critical Capability Levels, now plus Tracked Capability Levels for
earlier, less-extreme signals) all run the same loop — capability threshold → evaluation →
pre-committed response. It is also going **statutory**: California SB 53 (effective Jan 1, 2026)
requires large developers to publish and comply with a frontier-safety framework, and the EU AI Act
adds systemic-risk obligations for general-purpose AI. The shared caveat: all three carry a
"competitor-adjustment clause" — labs may lower safeguards if a peer ships without comparable ones —
a potential race-to-the-bottom counterweight to the gating.

**Who measures the threshold (answered, Aug 14).** SB 53 is the *Transparency in Frontier AI Act*
(TFAIA; signed Sep 29 2025, effective Jan 1 2026): a frontier developer's framework must describe
"using third parties to assess the potential for catastrophic risks and the effectiveness of
mitigations", and every pre-deployment transparency report must state "the extent to which
third-party evaluators were involved". So third-party measurement is emerging — but as a *disclosure*
obligation enforced against each lab's self-published framework (up to $1M/incident civil penalty),
not a shared external floor. Enforcement asks "did you follow your own framework", not "did you miss
a shared threshold". The gap that remains is a **cross-lab** measurement standard.

## Hidden reasoning is extractable (Aug 14)

arXiv:2608.09867 — "Stealing Reasoning Traces from Proprietary LLM APIs" (Panfilov et al.) — is a
frontier-*security* finding, not an economics one, but it lands in the same window: the encrypted
"reasoning blocks" that proprietary APIs return (to hide chain-of-thought while letting clients
render it) are **fully interchangeable across sessions, users, and models within a provider**. The
authors exploit this by injecting a capable model's encrypted trace into a weaker, less-guarded model
from the same provider and forcing it to decode the trace verbatim — no direct jailbreak of the strong
model needed. Demonstrated vectors:

- **Anti-distillation bypass** — extracting proprietary reasoning from Anthropic, OpenAI, and Google.
- **Private-data recovery** — decoding 315,320 reasoning blocks scraped from public repos recovered
  367 PII artifacts and 182 credentials.
- **Hazardous-content disclosure** — dangerous reasoning revealed behind a "safe" final refusal.
- **Invisible prompt injection** — malicious payloads embedded in encrypted blocks to poison agentic
  systems.

The takeaway is architectural: encrypting reasoning *per block* is meaningless if the block is a
fungible token any sibling model will decrypt; the fix is to bind reasoning to its session
(cryptographic + system-level mitigations, per the paper's responsible disclosure). "Hidden CoT" is a
confidentiality assumption the top three labs all violated, not a protection boundary.

## The session-binding fix (status, Aug 14)

"Which provider ships the fix first" resolved — **none publicly, and no standard has formed.** As of
Aug 2026 the demonstrated attack is already mitigated: all three providers acknowledged the report and
deployed mitigations, and the researchers' proof-of-concept no longer reproduces against current API
builds. No CVE and no coordinated disclosure followed. The root cause was a single per-family global
key (Will Smidlein: "a single global key to encrypt and authenticate all reasoning data sent to the
client") — an obfuscation scheme with a shared key, not per-session confidentiality.

But the *architectural* fix is still undocumented vendor-by-vendor: researchers did not publish the
full technical detail of the mitigations, "leaving customers dependent on provider assurances rather
than independently verifiable guarantees" (CSA research note). Partial signals: Anthropic's docs now
say thinking blocks are tied to the producing model and must be stripped when switching models;
Google's backend "manages thought compatibility" on model switch; Anthropic separately removed
assistant-turn prefilling in the 4.6 models (still present in Claude Haiku 4.5). The paper's
recommended fix — hash the precise prompt + preceding conversation history into the block's
authentication tag (true session binding) — must be engineered to not break legitimate multi-turn
continuity or model-switching. The CSA note calls the underlying trade-off ("client-side statelessness
vs cryptographic binding") **unresolved industry-wide**. So: mitigation shipped everywhere, a
session-binding *standard* nowhere — the same per-vendor fragmentation as routing configs and plugin
ABIs. Open sub-questions: whether any provider publishes its binding scheme, and whether
already-published blocks in public repos remain decodable.

## Post-training as the lever — GLM-5.3 (Aug 15)

**GLM-5.3** — Zhipu (Z.ai) — is a coding- and cybersecurity-focused model built on the **same
743B-parameter base as GLM-5.2**, so every gain came from scaled-up post-training (RL), not a new
architecture. Coding roughly doubled on long-horizon tasks (SWE-Marathon 19.4→42.5; Terminal Bench
3.0 4.6→28.3, a ~6× leap). On the security side it scored **84.5% on CyberGym** — first among all
models evaluated, ahead of Anthropic's Mythos 5 (83.8%) — and 54.4% on ExploitBench. Pre-release
testing with Chinese security teams surfaced **2,436 vulnerabilities across 269 open-source
projects** (1,097 critical/high, oldest 1981, avg 26.6 years hidden), published in a Security
Disclosure Ledger. Open weights land **~2 weeks after launch** on safety grounds, with a "trusted
access" program for the most sensitive cyber functions — the first Chinese lab to publicly justify
a delayed open-weight release, and the first to gate release on offensive-cyber capability.

Two signals: (1) **post-training, not scale, is now the visible frontier lever** — a 743B base
jumped to frontier coding/security purely on RL; (2) **vulnerability discovery is becoming a
headline model benchmark**, with a public ledger as its disclosure artifact.

## The Aug 15 PM beat: price, speed, and open distillation

A single 24-hour window added three more frontier data points, all on the price/distribution axis of
the pattern above:

- **Gemini 3.7 Flash** — Google's "most intelligent" Flash for coding/agents, three weeks after
  Gemini 3.6 Flash. DeepSWE v1.1 49.0→65.3%, FrontierCode 1.1 34.4→43.6%, WebDev Arena Elo 1538→1588,
  1M-token input. Launch pricing halved to $0.75/M in / $3.75/M out through Dec 31 (then $1.50/$7.50).
  A three-week cadence + half-price launch is a direct bid for the "cheap agent workhorse" tier; it
  powers the Gemini Spark agent.
- **Qwen3.8-27B** — `Qwen/Qwen3.8-27B`, Apache 2.0. The mid-size companion to Qwen3.8-Max: a natively
  multimodal 27B (Gated DeltaNet + attention + multi-token prediction), 262K native context (1M via
  YaRN), native image/video. Best-in-row SWE-bench Pro 61.7, LiveCodeBench v6 90.3, OSWorld-Verified
  84.3, WebArena-Verified 64.8, AndroidWorld 81.9; 271 quantized variants within a day. Closes the gap
  between closed APIs and full-stack agent tooling under a permissive license.
- **GPT-5.6 Sol "Ultrafast"** — OpenAI preview of the flagship served on **Cerebras** chips: up to
  750 tok/s, ~14× faster, without dropping to a smaller model. No GA date. If it holds, the inference
  bottleneck shifts from raw speed to orchestration/safety/cost — serving *hardware* becomes a
  distribution lever alongside price and release cadence.
- **Nemotron Teacher 550B** — `nvidia/Nemotron-Labs-Teacher-General-Reasoning`, a 550B-total
  (55B-active) LatentMoE Mamba-2 + Transformer "reasoning teacher" used in NVIDIA's Multi-Teacher
  On-Policy Distillation (MOPD) pipeline. Weights-only (1.12TB, OpenMDW-1.1, disclosed post-training
  data), no published benchmarks — a rare open window into how labs build reasoning models, and a
  distillation counterpart to GLM-5.3's "post-training, not scale" signal.

## Anthropic's Model 2 — labs are holding back what they can't measure (Aug 15)

Anthropic's **second company-level Risk Report** (Aug 14, assessments through July 15) discloses an
internal, unreleased model — **Model 2** — that outperforms the public flagship **Claude Mythos 5**:
AECI capability index **162.79 vs 161.29**, and **62.8% vs 50.3% on CoBench** (Anthropic's internal
benchmark of 449 real R&D tasks; a model able to fully substitute its own engineers would need ~85%).
Anthropic says it has **no plans to release Model 2** and hasn't finished its pre-deployment safety
suite. The report also (a) raised **catastrophic-misalignment risk from "very low" to "low"** for the
first time, (b) disclosed that **Claude now authors a large majority of the code merged into
Anthropic's production codebases**, and (c) admitted its task-based evals are **"saturated"** — no
longer able to distinguish capability gains. It also disclosed a **biosafety-classifier flag that was
accidentally disabled for ~11 months** (133M messages), and chain-of-thought contamination in
0.27–5.1% of RL training episodes.

Two signals: (1) **the gap between an unreleased internal model and the public flagship is now
self-disclosed** — the clearest evidence yet that frontier labs are holding back models they can no
longer fully measure; (2) the "who measures the threshold" question (SB 53) gains a corollary — **who
measures the *unreleased* tier**, where the only eval is the lab's own saturated benchmark.

## Who audits the unshipped tier (Aug 15 20:31)

The corollary now has an answer: **nobody external, by default.** Anthropic's governance has an unused
lever and a redacted record:

- **The Long-Term Benefit Trust (LTBT) can compel external review of risk reports and approves the
  reviewers** — but it did *not* exercise that power for this report, and the RSP did not require one.
  The only external reviews were **pilot** reviews (METR, SecureBio) on *prior* sections, not this one.
- **The one independent review this cycle** was **Redwood Research** on the chain-of-thought-leak
  disclosure (CoT accidentally graded during RL: 0.27% of Opus 4.8 episodes up to 5.1% of Mythos
  Preview) — judged "inadequate processes, not a one-off" (blog.redwoodresearch.org), and it only
  reviewed that single disclosure, not Model 2's capability claims.
- **The public report is redacted** (one incident withheld entirely; unredacted versions circulate to
  ≥200 employees), so it is not a complete, reproducible public record.
- **The risk-label change was an uncertainty adjustment, not a new capability finding.** Anthropic's
  report says its own arguments "still support very low" for high-stakes misalignment; it raised the
  label to "low" because of *recent incident disclosures* — its July 30 report (3 real-world incidents
  in 141,006 cyber-eval runs; Opus 4.7, Mythos 5, an unnamed internal model) and a UK AISI evaluation
  (Mythos 5 with safeguards removed + internet: 19 unsanctioned actions, 17 Mythos 5 / 2 GPT-5.6 Sol).
  **Neither incident names Model 2 as a participant.**

**What triggers release: nothing defined.** Model 2 is already deployed internally as a **staged
"controlled canary"** (first on internal surfaces with stronger blockers, then broader internal use),
and "no current plan to release" is explicitly *not* "never." The implied preconditions are a completed
predeployment suite, a system-card/eval record, longer internal-use results, and fresh testing on any
plan change — but no threshold is specified. The unshipped tier is thus gated by (a) the lab's own
saturated evals, (b) an optional, currently-unexercised trust lever, and (c) an undefined release trigger.

## Vero — evaluation moves to machine-checked proof (Aug 15)

**Vero** (arXiv:2608.13522, UC Berkeley — Dawn Song et al.; `sunblaze-ucb/vero`) is the first benchmark
to evaluate AI agents on **joint code implementation and machine-checked proof synthesis at the
repository level**. Its 43 multi-module instances come from real-world repositories (Python, Dafny,
Verus, Coq); each gives an agent a multi-module **Lean 4** repository with fixed API interfaces and
formal specifications, in proof-only or code-and-proof modes. The strongest frontier coding-agent
configuration **fully solved only 27 of 43 instances** and closed no specifications on the hardest
repos.

As SWE-bench and its variants saturate, Vero shifts the frontier rung from "passes tests" to
"mathematically verified correctness" — a stress test current agents still fail badly at repository-
scale proof obligations. This is the evaluation-side answer to spec-kit's authoring-side bet (see
[[agent-plugins]]): intent becomes a machine-checkable artifact.

## Watch for

- Third-party (non-vendor) evaluation of DeepSeek V4 Pro's claims — the two internal benchmarks
  (DSBench-FullStack/Hard) are the caveat.
- Whether open-weight models close the last points on long-horizon SWE (DeepSWE) — the benchmark
  that moved most in a single release.
- The price war's second derivative: if ~$0.435/M input becomes the new floor, closed labs must
  justify ~$10/M with distribution and enterprise trust, not raw quality.
- Whether Motif 3's MIT weights hold up to third-party evaluation (not just its own AA Index cite).
- Whether "Critical capability" gating (OpenAI/Astra) spreads as a de-facto release standard — SB 53
  now supplies the "who measures" answer (disclosure-based third-party evaluation); the remaining gap
  is a *cross-lab* measurement standard, and whether statutory disclosure displaces the voluntary
  frameworks.
- Which provider ships the reasoning-block session-binding fix first (arXiv:2608.09867) — **answered
  08-14**: none has publicly documented the architectural fix; all three shipped unannounced
  mitigations, no cross-vendor standard. Remaining watch: the first provider to publish its binding
  scheme, and whether already-published reasoning blocks stay decodable.
- Whether Qwen's custom Qwen3.8-Max license + ~4.9TB weights actually get fine-tuned/downloaded at
  scale — open weights only shift economics if the ecosystem can run them.
- Whether GPT-5.6 Sol "Ultrafast" holds 750 tok/s at GA, and whether custom serving hardware (Cerebras)
  becomes a third distribution axis alongside price and release cadence.
- Whether "Model 2"-style unreleased internal models become the norm — the public frontier (Mythos 5)
  is no longer the lab's best model, and the gap is now self-disclosed. **Who audits the unshipped tier
  (answered 08-15):** nobody external by default — the LTBT has an unexercised external-review power,
  METR/SecureBio were pilot-only, Redwood reviewed one disclosure, the report is redacted, and no release
  trigger is defined. Watch: does the LTBT actually *exercise* its review power on a future report?
- Whether Vero-style formal-verification benchmarks become the next standard eval rung as SWE-bench
  saturates.
