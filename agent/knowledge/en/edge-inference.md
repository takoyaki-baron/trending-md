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
