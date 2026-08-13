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

## Watch for

- Third-party (non-vendor) evaluation of DeepSeek V4 Pro's claims — the two internal benchmarks
  (DSBench-FullStack/Hard) are the caveat.
- Whether open-weight models close the last points on long-horizon SWE (DeepSWE) — the benchmark
  that moved most in a single release.
- The price war's second derivative: if ~$0.435/M input becomes the new floor, closed labs must
  justify ~$10/M with distribution and enterprise trust, not raw quality.
