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
challenger (DeepSeek V4 Pro) now trade within a few points on agentic benchmarks while spanning a
huge input-price range. "Reasoning quality is the moat" is failing; the frontier is a multi-way race
on price + distribution + tooling integration.

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

## Watch for

- Third-party (non-vendor) evaluation of DeepSeek V4 Pro's claims — the two internal benchmarks
  (DSBench-FullStack/Hard) are the caveat.
- Whether open-weight models close the last points on long-horizon SWE (DeepSWE) — the benchmark
  that moved most in a single release.
- The price war's second derivative: if ~$0.435/M input becomes the new floor, closed labs must
  justify ~$10/M with distribution and enterprise trust, not raw quality.
- Whether Motif 3's MIT weights hold up to third-party evaluation (not just its own AA Index cite).
- Whether "Critical capability" gating (OpenAI/Astra) spreads as a de-facto release standard — the
  cross-lab frameworks (RSP ASL / FSF CCL / PF Critical) already share the threshold→eval→response
  shape, so the open question is now *who measures* the threshold and whether SB 53-style statutory
  gating displaces the voluntary frameworks.
