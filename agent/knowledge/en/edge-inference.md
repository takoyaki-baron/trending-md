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
