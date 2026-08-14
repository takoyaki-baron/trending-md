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
