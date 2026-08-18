---
title: Edge / local inference engines
topic: edge-inference
created: 2026-08-13
---

# Edge / local inference engines (Aug 2026)

A cluster of projects unlocking huge models on tiny hardware. Shared technique: exploit MoE
sparsity — keep the small shared core resident in RAM, stream routed expert weights from disk on
demand — rather than quantizing the whole model.

## The pattern
MoE models have a small active-per-token parameter count and a large mostly-idle expert set.
Streaming those experts from SSD/NVMe (with an LRU/LFU cache) turns multi-trillion-parameter models
into consumer-hardware workloads. "Zero quantization, zero distillation" is the common boast.

## Projects
- **kimi-k3-in-c** — `FareedKhan-dev/kimi-k3-in-c`, Apache 2.0. 176KB C99 binary runs Moonshot
  Kimi K3 (2.78T params) on 8.24GB RAM. MXFP4-packed experts streamed from NVMe, 16/896 experts
  active, O_DIRECT trunk streaming, expert LRU cache. Byte-identical to the PyTorch reference.
- **TurboFieldfare** — `drumih/turbo-fieldfare`, Apache 2.0. Swift+Metal engine for Gemma 4
  26B-A4B on ~2GB RAM (Apple Silicon). ~1.35GB shared core resident, per-layer 16-slot LFU expert
  cache.
- **Ling-3.0-tiny** — `inclusionAI/Ling-3.0-tiny` (Ant Group Bailing), MIT. 7.9B MoE (1.3B active),
  KDA:MLA 3:1 hybrid attention, 128 experts. ~90 tok/s on M4 Pro MacBook, <100ms first token.
- **Muse Glimmer** — `meta-models/Muse-Glimmer-30B` (Meta), Apache 2.0. 30B distilled from Muse
  Spark 1.2, ~17GB 4-bit quantized, 233 tok/s on RTX 5090 via DFlash speculative decoding.
- **Needle 2** — `cactus-compute/needle` (Cactus Compute), Apache 2.0. 45M params → 14MB C++ binary;
  no MLP layers (Walsh-Hadamard transforms), hashed n-gram tables. 500–800 tok/s on Raspberry Pi 5.
  Deployed in the Pebble Index 01 smart ring.
- **h3.c** — `antirez/h3-metal`, MIT. C/ObjC + Metal engine for MiniMax H3 omni-modal on Apple
  Silicon; mmap-from-safetensors loading, `--ssd-streaming` cuts DiT memory 36.5→2.0 GiB.

## Memory-management comparison

Two distinct strategies are hiding under the shared "MoE sparsity" label. Worth keeping separate —
they optimize for different constraints and fail differently.

**A. Stream-and-cache** (kimi-k3-in-c, TurboFieldfare, h3.c `--ssd-streaming`) — keep the shared
core resident, stream routed experts from SSD/NVMe on demand, and cache the hot experts. Memory
footprint stays flat no matter how many experts exist; the cost is a cache miss on the first token
after a routing change.

- **kimi-k3-in-c** — largest scale (2.78T → 8.24GB RAM). Expert **LRU** cache, `O_DIRECT` trunk
  streaming, 16/896 experts active. Byte-identical to the PyTorch reference is the notable claim.
- **TurboFieldfare** — tightest footprint (~2GB). Per-layer **16-slot LFU** cache, ~1.35GB shared
  core resident. LFU (not LRU) because the active-expert set is small and hot per layer.
- **h3.c** — the general mechanism exposed as a flag (`--ssd-streaming`), applied to the DiT
  (diffusion) stack, not just the LLM — proves the trick is modality-agnostic.

**B. Shrink the active set** (Ling-3.0-tiny) — make the *active* per-token footprint so small
(1.3B of 7.9B, KDA:MLA 3:1 hybrid attention) that the whole thing fits in RAM; no disk streaming
at all. Optimizes for latency and deterministic first-token time (<100ms) rather than total
parameter count.

**The reusable insight:** the engine choice is a trade between *scale* (A streams arbitrarily many
experts, but pays cache misses) and *latency* (B never misses, but is capped by what fits in RAM).
The cache policy (LRU vs LFU, per-layer vs global) is the tunable that separates the A-strategy
engines. Watch for the two strategies to merge — a small-resident-core model that also streams
overflow experts on larger hardware.

## On-device VLM (a third strategy, Aug 15)

- **LFM2.5-VL-3B** — `LiquidAI/LFM2.5-VL-3B`, lfm1.0 license. A ~3.1B vision-language model
  (LFM2.5-2.6B backbone + SigLIP2 NaFlex encoder) built for the GUI-agent niche — reading screens and
  grounding objects locally on phones/laptops that can't host a 27B model. 228 tok/s on Apple M5 Max,
  ~20 tok/s on a Galaxy S26 Ultra in under 3.3 GB; ScreenSpot-v2 80.7, RefCOCO P@1 87.9, ChartQA 81.3,
  16 languages. Official GGUF/ONNX/MLX quantizations ship.

This is neither stream-and-cache (A) nor shrink-the-active-set (B) — it is the *small dense model +
official quantizations* path, complementary to the MoE-streaming engines above. On-device inference
now spans three strategies: stream huge MoEs from disk, shrink the active set, or ship a small model
with first-party quantization.

## Fine-tuning with layer streaming (Aug 16)

The "stream the frozen base" trick now spans training, not just inference. **Soup**
(`MakazhanAlpamys/Soup`, Apache-2.0) lowers the hardware floor for local fine-tuning: a single YAML
drives SFT/DPO/KTO/ORPO and 20+ methods, and its **layer streaming** keeps the frozen base in system
RAM while streaming one decoder layer at a time into the GPU — so an **8B model LoRA-finetunes on a
4GB laptop GPU** (119.6 tok/s at 3.32GB peak VRAM on an RTX 3050). Results are verified **bit-exact**
against a resident-GPU reference across nine architectures as a CI test. Same shape as strategy A
(stream-and-cache) applied to the *training* pass: the frozen parameters don't need to live in VRAM.
Beta: transformers + plain LoRA only (GRPO/PPO excluded — generation re-reads every layer); migrates
Axolotl/LlamaFactory configs.

## On-device training on Apple's Neural Engine (Aug 17 04:03)

A cluster of MIT projects reverse-engineer Apple's private ANE APIs (`_ANEClient`, `_ANECompiler`) to
run **training — not just inference — on the Neural Engine**, with no CoreML or Metal:

- **ANE** (`maderix/ANE`) — the proof of concept: forward + backward on Stories110M, ~91–115 ms/step.
- **Orion** (`mechramc/Orion`) — a graph compiler with "Delta Compilation" (8.5× faster weight
  updates) and stable 1,000-step training of a 110M transformer in ~22 min.
- **ANEForge** (`sbryngelson/ANEForge`) — a pip-installable Python binding (~75 tok/s, 8–16× more
  energy-efficient than GPU on tested models).

Signal: this extends thesis 3's "stream the frozen base" thread from *inference* to a genuinely new
on-device **training substrate** — Apple's ANE was inference-only by design. Private APIs and ~5–9%
utilization keep it research-grade for now.

## "Will this run on my machine" becomes a tool (Aug 18)

As open models proliferate, the *install* problem has shifted from "how do I run this" to "does this
fit, and at what quantization" — and two projects productize the answer:

- **llmfit** — `AlexsJones/llmfit`, MIT, ~32k stars, Rust CLI. Detects RAM/CPU/GPU/VRAM/backend, then
  scores hundreds of models across memory-fit, estimated speed, quality, and context — using a
  memory-bandwidth model with a ~80-GPU lookup table — and picks the highest quantization that fits.
  It correctly sizes MoE models by **active** parameters (Mixtral 8x7B drops from ~23.9GB to ~6.6GB),
  and `llmfit bench` measures real tok/s that users contribute back via PR to replace estimates.
  `llmfit recommend --json` is built for scripts/agents, and `llmfit plan` inverts the question to
  "what hardware do I need for this model?" — hardware detection + quantization selection as a
  one-command, agent-scriptable answer.
- **omlx** — `jundot/omlx`, Apache-2.0, ~19k stars, SwiftUI macOS app (originated from vllm-mlx). Runs
  LLMs/VLMs natively on Apple Silicon via MLX and exposes OpenAI/Anthropic-compatible APIs on localhost.
  The standout is a **two-tier KV cache** — a hot RAM tier plus a cold SSD tier persisted as safetensors
  that survives restarts — plus continuous batching, multi-model serving with LRU eviction, an
  8GB-below-RAM memory enforcer, and MCP/structured-output support (LLMs, VLMs, OCR, embeddings,
  rerankers, optional distributed multi-Mac inference). Apple Silicon's unified memory is the best
  budget host for local models, and omlx turns it into a real (SSD-backed, batching) server — another
  step toward the Mac-as-inference-node.

Signal: the edge-inference story now has its *selection* and *serving* layers, not just the engines —
llmfit answers "which model + quantization fits this box" and omlx answers "serve it as a persistent
server," both local-first.

## Fit-to-measured-budget replaces preset compression — as RAM stops being cheap (Aug 19)

Three independent projects converged on the *same* reframing within a fortnight: stop choosing a
compression preset, and solve an allocation problem against the bytes you actually measured.

- **Shoehorn** (MIT, Rust, created Aug 13) — inverts quantization selection. Instead of picking a
  preset that ignores the machine, it "starts from the memory you actually have, subtracts what
  inference itself needs, and solves a per-tensor mixed-precision assignment" against the remainder.
  Reported fits are extreme: "routinely using **99.99%** of the budget, sometimes to the byte," with a
  worked example of **519.2 MiB of a 519.2 MiB budget — 99.998% used, 13 KB slack** for
  `unsloth/Qwen3-4B-GGUF`. The quantizer is written from scratch in Rust (no llama.cpp code linked)
  and emits standard **GGUF v3**, with llama.cpp only as the inference backend, so nothing downstream
  changes; `shoehorn ui` measures the machine, streams the fit, and reports the perplexity cost before
  you chat. Targets macOS Apple Silicon, Linux x86-64 (NVIDIA/AMD), Windows x86-64 (NVIDIA), profiles
  from 8 GB to 128 GB, contexts 4k–32k. **Very young — 37 stars at time of check**, so treat the
  99.998% figure as an author demo, not an independent result.
- **Linux VRAM overcommit** — Valve contractor **Natalie Vock** shipped work stopping Linux from
  evicting a foreground game's VRAM to system RAM under GPU memory pressure. It builds on the **`dmem`
  cgroup controller** (`dmemcg`, co-developed with Maarten Lankhorst/Intel + Maxime Ripard/Red Hat,
  already mainline) and adds six kernel patches plus two userspace helpers — `dmemcg-booster` and a KDE
  Plasma "Foreground Booster" fork — so the foreground app wins VRAM and background apps are evicted
  first. Covers AMD `amdgpu` and Intel `xe`; **NVIDIA has no equivalent mechanism**. Worked example:
  background apps left only **6.1 GB of an 8 GB card** for a title needing **7.4 GB**; the patches hand
  over 1 GB back. Available now via CachyOS (Linux 7.0rc7-2+) and the `linux-dmemcg` AUR package.
- **llmfit** (above) — the same shape one level up: measure the box, then pick the highest
  quantization that fits, sizing MoE by *active* parameters.

**The counterweight that makes this urgent — memory stopped getting cheaper.** TrendForce (Aug 17):
Germany's DDR5 retail price index climbed from **445% to 486% year-over-year in August** — a typical
kit at ~**4.9× last year's price** — while Shenzhen's Huaqiangbei market saw **DDR5 24Gb +14.29%
week-over-week to $48**, 16Gb to $40, and **DDR4 8Gb 3200 +12.82% WoW to $22**. TrendForce forecasts
**server DRAM contract prices up 13–18% QoQ in 3Q26**, calls the market undersupplied, and expects the
server DRAM shortage to run into 2027; Tom's Hardware's retail datapoint is **128 GB of DDR5 for
$3,399** (headline only — its article body is paywalled). Cause: AI-datacenter and HBM demand pulling
fab capacity off commodity parts.

Signal — the two halves of this file now pull against each other. **MoE sparsity + disk streaming
lowered the model's floor** (thesis 3's original claim); **DRAM pricing just raised the machine's
floor**. So the optimization pressure has moved from "make the model smaller" to "**spend the exact
bytes you have**" — which is why fit-solvers (Shoehorn, llmfit) and OS-level device-memory QoS
(`dmemcg`) showed up in the same window. The cgroup work matters beyond gaming for the same reason:
it is the first mainline primitive for arbitrating VRAM between a local model and everything else on
the desktop.

## Unsloth becomes a desktop app — run and train collapse into one local tool (Aug 19)

`unslothai/unsloth` (Apache-2.0, **73,546 stars**, pushed Aug 18) quietly changed category: the repo
description now reads "Local UI to run and train LLMs and diffusion models," and **Unsloth Desktop**
shipped for Windows/macOS/Linux across a fast release train (v0.1.70-beta → v0.1.800-beta, Aug 11–14)
with no-code training, RAG, MCP, and remote Cloudflare access. The newest release runs **Qwen3.8-27B
locally in ~17 GB RAM** via Dynamic GGUFs plus NVFP4 quants, claims ~10% faster GGUF inference at
lower VRAM, and "Fast FP8 10× faster MiniMax-H3 inference (3 minutes vs 30)" with model splitting to
fit smaller GPUs; also landed AMD RDNA 3/4 + Strix Halo support, memory-based context sizing on Mac,
per-model `llama-server` arguments, and tool calling + web search for external providers.

The trigger is a stack of three model drops landing in one tool inside a fortnight — Desktop's launch
(Aug 11–13), Meta Muse Glimmer support (Aug 10), Qwen3.8 support (Aug 14). Signal: Unsloth was a
fine-tuning *library you imported*; it is now the local-first GUI for running **and** adapting a model
on the same hardware, with MCP wired in — collapsing the gap between "try a model" and "adapt a model"
for people who never open a notebook. Together with Shoehorn and llmfit, the local stack now has
selection, fitting, serving, and adaptation as ordinary desktop software.
