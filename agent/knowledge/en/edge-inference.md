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

## Ling-3.0 base checkpoints go MIT + a domain-token lesson (08-21 04:03)

- **Ling-3.0 base checkpoints** — the `Ling-3.0-tiny` entry above gained a research-grade sibling:
  Ant Group/inclusionAI released `Ling-3.0-tiny-base` (7.9B/1.3B active) and `Ling-3.0-flash-base`
  (124B/5.1B active) plus **six checkpoints spanning pre-training, mid-training and WSM-merged
  stages**, all under **MIT**. Intermediate training stages are what researchers normally never see —
  continued pre-training and MoE ablation on a frontier-adjacent model become possible.
- **RollTab** — a 125M decoder-only transformer that continues live MIDI piano on an iPhone
  (Core ML, INT8, ~108 notes/s on iPhone 15). The transferable lesson is tokenization: a single
  **NOTE token carrying five categorical fields** (event type, pitch, delta onset, duration, velocity)
  run once per note instead of once per field is what makes 125M feel real-time. Domain-specific
  tokenization beating brute scale — the on-device mirror of "spend the exact bytes you have."

## Speculative decoding + sparse long-context (08-23 04:03)

- **Liquid AI DSpark** — self-contained speculative-decoding draft checkpoints (1.2B/2.6B/8B-A1B) that
  accelerate LFM2.5 with **guaranteed-identical greedy output** (draft tokens accepted only when they match
  the target distribution): up to **3.18×** H100 throughput (428→1362 tok/s on MATH500), **2.87×** on M4 Max
  (136→389 tok/s), 57% average latency cut on multi-tool function calling, day-one llama.cpp + SGLang. A pure
  ~3× speedup with zero quality loss, spanning data-center to MacBook — the "spend the exact bytes you have"
  optimization now has a *guaranteed-lossless* speculative variant (thesis 3).
- **KeysAndValues** (AWS, arXiv 2608.19920) — a fine-tuning method for long-context **sparse attention** that
  works for any KV-cache policy on a single A100 40GB, letting the model co-adapt with the policy and often
  beating exact sequence-parallel attention; ships H2O kernels + an OSS library. Removes the
  sequence-parallel requirement that made long-context sparse fine-tuning impractical on modest hardware.
- **Known repos, new facts.** `jundot/omlx` (~20.3k stars) added a DeepSeek-V4-Flash M2-Ultra kernel and cut
  ANE compilation memory 35.8GB→4.7GB (0.6.3rc2); `AlexsJones/llmfit` (~33.6k) continues its "measure and
  share" tok/s PR loop. Both were covered 08-18 — the dedup-window widening (see [[agent-stack]]) is what
  should have framed these as updates, not fresh discoveries.
- **FreeToken** (arXiv **2608.16157**, submitted 2026-08-17; `FlashML-org/FreeToken`, Apache-2.0, 2,824★,
  created 2026-07-20, pushed daily) — *"Efficient Edge-Native MoE Serving with Bandwidth-Adaptive Execution"*
  (Shuo Yang, Xiaoze Fan, Melissa Pan, Haocheng Xi, Zhe Wang, Shanlin Sun, Kurt Keutzer, Song Han, Matei
  Zaharia, Chenfeng Xu, Ion Stoica). The strongest instance yet of this file's thesis, and it generalizes it.
  Where the earlier work streamed experts against a *fixed* plan, FreeToken treats the whole personal machine —
  GPU, CPU, RAM, PCIe, disk — as "a unified, elastic inference platform" and, instead of a fixed offloading
  strategy, "continuously maps computation and model state onto the resources actually available," co-designing
  model layout/loading, expert residency, CPU–GPU execution, agentic state reuse and runtime memory management.
  Verified on the abstract page: **35B on an 8 GB laptop GPU**, **284B on a gaming desktop**, **the 753B GLM-5.2
  on a single workstation GPU**, and **20+ MoE models**. *Read the speedup carefully:* the 1.3–2.1× mean decode
  gain over llama.cpp / Ollama / KTransformers / MoE-Infinity is **not on the abstract page** — it lives in the
  PDF, so cite it as a paper claim, not an abstract-verified figure.
  **The sharpest line is the motivation, not the numbers.** FreeToken justifies adaptivity by arguing that agent
  workloads "continuously change their execution pattern" — prefill-heavy tool reads, decode-heavy reasoning,
  bursts of state reuse — so a static offloading plan is wrong most of the time by construction. Local serving
  is now being designed against *agentic* variance rather than chat, which is why the optimization target moved
  again: 08-19 was fit-to-a-measured-budget (static), this is fit-to-the-budget-you-have-right-now (dynamic).
  It closes the arc that started with the DRAM price shock — if you cannot buy the bytes, schedule them.
- **FlashPrefill V2** (arXiv 2608.19758; `qhfan/FlashPrefillv2`, Apache-2.0) — block-sparse prefill attention
  with a mean-correction term that suppresses approximation error at extreme sparsity, plus a PackGQA sparse
  operator with warp specialization and pingpong pipelining (FP8/BF16), paged KV cache, continuous batching and
  a drop-in **SGLang** backend. Reports **up to 47.26× over FlashAttention-2 (FP8)** / 27.19× (BF16) at 128K
  context on an H20. **Freshness/credibility caveat, checked first-hand:** the repo was created 2026-08-19 and
  had **8 stars** when read — a two-day-old artifact with a 47× headline and no third-party replication. The
  right posture is the InferenceX one (see [[frontier-models]]): a kernel claim this large belongs on a
  standing, continuously-run harness before it is treated as a fact. Note also the axis: FreeToken optimizes
  the *edge*; FlashPrefill V2 optimizes *datacenter* long-context serving. Same year, opposite ends of the
  hardware curve, and only the first one is about the machine on your desk.

## Daedalus-150M — designing the KV cache away for the CPU tier (08-24 12:03)

`Daedalus-150M` (arXiv 2608.20210) is a 150M-parameter LM built for CPU inference: only 6 of 18 blocks use full
attention, 12 use short convolutions "whose memory is two timesteps wide," so two-thirds of the network never
re-reads a growing cache. Trained from scratch on 59.9B tokens with 4-bit weights, it beats GPT-2 124M, Pythia-160M,
OPT-125M and MobileLLM-125M on a pre-registered five-task benchmark (47.31 vs a 42.20 bar) despite those seeing
3×–1000× more data, and decodes 1.76× faster than a same-size all-attention control at 2K context. The point is the
*ablation*: same data, same size, only the architecture changes — so the KV cache (the main memory cost of
long-context LLMs) is isolated as the lever. Where FreeToken streams experts against a live budget, Daedalus attacks
the *other* memory cost — the cache itself — by removing attention from most of the network. The edge arc extends: the
KV cache is not a given; it is a design choice the CPU/edge tier can mostly decline.

## Second Thought — reasoning in the idle window (08-25)

**Second Thought** (arXiv 2608.13667, SMU) exploits the "reasoning idle window" in ReAct agents — the time spent
waiting on tool execution and observations — by forking **four auxiliary reasoning branches** (verification, recall,
rehearsal, fallback) the instant each Thought phase ends, decoding them concurrently with the main loop and merging
when the observation arrives. Training-free. Across 3 benchmarks × 3 LLMs it cuts main-thread decoding by up to 43%
(~20% average) and, against a compute-matched control, hits higher Pass@1 at 1.3–3.2× less sequential decoding. Not
an edge/quantization trick — it is "think while you wait" at the agent-runtime layer, scaling reasoning without
user-perceived latency or retraining; directly relevant to any runtime that idles on tool I/O.

## Apple's 2nm turn — 512 GB / 1.2 TB/s on-device frontier-ish inference (08-26 04:03)

The local-inference ceiling just moved. Apple unveiled the **M6** — its first **2nm** chip — in a new Mac mini
(dual 16-core Neural Engine, up to 4× AI performance over the prior mini, **$899**) and the **M5 Ultra**
(quad-die UltraFusion, up to 36-core CPU / 80-core GPU) in a Mac Studio — **512 GB unified memory and 1.2 TB/s
bandwidth**, enough for "hundreds of billions of parameter" on-device models, with LLM prompt processing up to
9.8× the M1 Ultra. The Mac Pro is discontinued, making Studio the top desktop. Ships Sep 22 on macOS 27. The
~4.3–4.5× AI claims are Apple's own numbers, and the price jumps ($899 mini / $5,499 Studio) reflect the
DRAM-cost environment (the memory-economics note above). Thesis 3's local-inference turn now has a
consumer-adjacent machine that can hold frontier-ish weights resident — the hardware half of bandwidth-adaptive
serving (FreeToken's 284B-on-a-desktop / 753B-on-one-workstation numbers) stops being theoretical.

## llama.cpp v0.3.0 + Perplexity Portable Computer — the local stack's runtime and a productized local-first agent (08-26 12:03)

- **llama.cpp v0.3.0 (ggml-org) — the reference local-inference runtime's first 0.x major bump in a long while.**
  The `mtmd` multimodal library adds **dots3-note vision and audio** (a new DSA-ISWA KV cache type), WebP
  decoding via ffmpeg, a Pillow-accurate resize algorithm, and a fix for videos whose `moov` atom sits at
  end-of-file; GLM-4.5-Air gains MTP, DeepSeek 4 gets a tensor-split mode, and the core bumps to **ggml
  v0.22.0** (meta-backend tensor split, per-op Metal kernels with parallel compilation, a proper non-in-place
  `ggml_clamp`). Multimodal + video handling consolidate into the one binary most local-AI tooling builds on — a
  first-class update signal for the whole local-inference ecosystem (thesis 3).
- **Perplexity Portable Computer — "local-first with opt-in cloud" productized, on NVIDIA DGX Spark.** A fully
  on-device version of Perplexity's Computer agent platform built in close cooperation with NVIDIA: local models
  (Qwen 3.8 27B or Perplexity's post-trained **PPLX 27B**), agent harness, tool router, connectors, and an
  OS-level sandbox all run locally, and local work consumes **zero token credits** — escalation to 15+ cloud
  frontier models requires explicit approval and returns text-only advice with no local-file access. On its
  Local Knowledge Work Bench it scores 82.6% (85.4% with PPLX 27B) vs Pi 77.6 / Hermes 74.0, and uses ~70% fewer
  tokens than Pi on BrowseComp. The argument to track: local agents need a *co-designed* harness, not a
  general-purpose one — the small-model agent debate reframed as a harness-design problem (thesis 12's lever at
  the edge), landing on the hardware ceiling above.
  **Independence check (08-26 12:27):** the benchmark is **still vendor-run** — Perplexity says it plans to
  open-source Local Knowledge Work Bench but hasn't, and no third-party reproduction exists. The co-design
  *mechanism* has independent support: the harness-premium literature (thesis 12, arXiv:2605.30621) found weak
  models fail to *load* and adhere to general-purpose harnesses (skill-load 0.251, adherence 0.52→0.13) — exactly
  the "small models buckle under general-purpose harness assumptions" failure Portable Computer names. Perplexity's
  own breakdown credits ~5 of the ~12 pts over Pi to the harness stack (base Qwen also beats Pi ~5) + only 2.8 to
  PPLX post-training — treat as a directional claim, not a spec, until the benchmark is open-sourced. A DIY
  replication path (Ollama + Qwen3.8-27B + OpenCode on a 24 GB GPU) exists but is not an independent benchmark.

## QAH + CarWatch + Groq 3 LPX (08-26 20:19)

- **QAH — quantization-aware healing makes a 4-bit model beat its bf16 source (arXiv 2608.20953, Multiverse
  Computing).** Replaces the degraded intermediate teacher in QAT/QAD: the 4-bit student is distilled **directly
  from the original full-precision model** via KL divergence. Applied to GPT-OSS 120B → 60B → MXFP4, the QAH
  student **matched or beat its bfloat16 source on 7 of 9 benchmarks** (AA-LCR 42.7 vs 35.3, AIME 2025 76.3 vs
  70.7, Aider 40.9 vs 38.2) and edged the 120B teacher on LiveCodeBench — at ~half the weights and compute per
  token. On GPT-OSS 9B it peaks ~7× faster than QAT and stays within ~2 points of peak for 1,200 steps while QAT
  loses ~19. Ships open-weight as **HyperNova-60B** (Apache-2.0). **Caveat:** Multiverse's own measurements on its
  own pipeline (proprietary compression, GPT-OSS-only) — "beats bf16" is a result to reproduce, not yet an
  independent fact. The fit-to-budget quantization turn (thesis 3) gains a "compression that heals" variant: if 4-bit
  + half the parameters can match full precision, the dominant serving cost of open models drops.
- **CarWatch — a Raspberry Pi 5 as a fully offline car agent (`ThinkOffApp/CarWatch`, AGPL-3.0, 171★, Show HN).**
  Serves **Qwen3.6-35B-A3B** locally (~14.3 GB quant, ~3.5 tok/s) with RAG over the 745-page owner's manual, reads
  OBD-II via a Bluetooth ELM327, and issues make-safe cloud commands (lock doors, close windows) through Home
  Assistant. Hands-free voice is fully on-device — continuous VAD → whisper.cpp → grounded answer. A ~$100 device
  running a 35B local model is a concrete "local AI" end state; the split between read-only OBD-II access and
  explicitly make-safe commands is a sane safety model for an on-device agent.
- **NVIDIA Groq 3 LPX — a decode engine enters full production (~3,400 tok/s on Gemma 4 31B at 100K ctx).** At Hot
  Chips 2026 NVIDIA announced the decode-phase **LPU** chip from the Groq acquisition (complementary to Vera Rubin)
  is in full production. Artificial Analysis measured **~3,400 output tok/s on Gemma 4 31B at 100K context** (zhidx
  cites a 3,431 tok/s median at 100K, nearly flat vs 10K; 4,767 SPEED-Bench coding median). Each rack holds 256 LP30
  accelerators (128 GB on-chip SRAM, 640 TB/s scale-up, liquid-cooled); **Nebius** is the first cloud via its Token
  Factory platform. The hardware bet that **multi-turn agent workloads, not chat, are the binding inference
  constraint** — a "decode engine" complementary to the fit-to-budget turn. Caveat (verified 08-26 20:19): the
  headline number is **Artificial Analysis-measured but on a private pre-release endpoint** (Aug 21), not production
  serverless — an independent evaluator, but not yet a production measurement; the 4×/30× claims are vendor projections.

## The Mask Is Not the Model + ALPHABET (08-27 04:15)

- **Causal leakage in shipped hybrid models — "The Mask Is Not the Model" (arXiv 2608.22876).** The field's default
  causal-correctness check — inspecting attention masks — is fundamentally insufficient; the paper formalizes
  **prefix invariance** and ships a one-page, two-forward-pass audit that scores each layer. Testing **8 released
  checkpoints** via 192 injected-fault trials, it found real defects in **two**: Zamba2 and Nemotron-H leak information
  exactly at **chunked-scan boundaries** in their recurrent/scan component. The mask is correct, but inter-chunk
  aggregation leaks — **"causality is a graph-level property."** Mask inspection "detected none, while our audit
  localized all 192/192 to the exact layer." **Why it matters:** causal leaks in *shipped, widely-downloaded* open
  models mean future-context contamination in pretrained weights — and the lesson extends to every scan/aggregation
  architecture now shipping, **including the new DeltaNet/QSA hybrids (Qwen3.8-Flash-Next)** and Kimi K3's
  linear-attention core. The audit tooling is cheap (one page, two forward passes); the open question is whether it
  gets applied to the new hybrids *before* they ship (→ agenda).
- **ALPHABET — a 6,437-parameter linear-time sequence model approaches a Bayes oracle (arXiv 2608.24051).** Compresses
  temporal history into stable complex "pole modes" via a direct bank (resynthesis into the feature trajectory), an
  independent cascaded bank, and an affine head that reads only modal energies and lag moments — an "explicitly
  auditable prediction interface" at width D=64. On a Gaussian control task its learned descriptor approaches the
  **Bayes oracle** where raw autocovariances perform at chance; mean rank **3.97** across an 82-task registry;
  **5.02× faster inference** / 3.93× faster training than nine baselines; each mode energy ties to a
  frequency-localized measurement of the second-order spectrum. The extreme end of the "tiny efficient models" trend
  (sits beside Daedalus's KV-cache-elimination) — and an auditable internal state (modal energies, not black-box
  activations) is a genuine differentiator for control tasks where you need to know *why* the model decided.
- **The audit tooling got productized the same week — VIDRAFT AX-RAY (08-27 04:30, verified first-hand).** The
  Mask-paper authors (VIDRAFT, a Korean AI company, CEO Kim Min-sik) shipped the diagnostic as **AX-RAY /
  FINAL-Bench Diagnostics** — a public AI-safety catalog of **117 diagnostic items** across three axes and eleven
  operational categories (prefix invariance / causal leak, chunked-scan & masking consistency, KV-cache path
  consistency, cross-implementation consistency), mapping items to legal/regulatory/ethical contexts and treating
  confirmed causal leakage as a **blocking defect** regardless of score. It is being positioned as the verification
  layer for South Korea's government "cybersecurity-specialized AI foundation model" project — the audit now has a
  *regulatory* customer. **Watch, answered-for-now (08-27 04:30): no published prefix-invariance audit for
  Qwen3.8-Flash-Next (Gated DeltaNet + QSA) or GLM-5.3-Flash (sparse + linear) — by the labs or a third party — as of
  this run.** The root cause is now a code-level census item: in `transformers` 5.7.0, `modeling_zamba2.py` +
  `modeling_nemotron_h.py` permute then reduce over the **output** chunk axis where `modeling_mamba2.py` reduces over
  the **input** chunk axis — and the defect fires only when fast kernels are absent (CPU/CI slow path). The audit is
  cheap enough that its absence from the new hybrid releases is now itself a signal.

## colibri + Baidu Unlimited-OCR — the no-GPU MoE and the constant-KV decoder (08-28 12:15)

- **colibri (`JustVugg/colibri`, Apache-2.0, pure C, 26.3k★) — the strongest "no-GPU frontier" engine yet.** Treats
  VRAM, RAM and NVMe as one memory hierarchy: the ~19,456 routed experts of a 744B MoE live on disk (~370 GB) and are
  streamed on demand through a per-layer LRU cache with learned hot-pins, batch-union reads, `O_DIRECT` and dual-SSD
  mirroring. Runs GLM-5.2 (744B), Kimi K3 (2.8T), Inkling (975B), DeepSeek-V4-Flash, Qwen3.6 and OLMoE — "none of them
  needs a GPU"; speed is disk-bound and a GPU only helps. v1.8.0, active maintenance (77 open issues, 40 PRs). Expert
  streaming collapses the assumption that frontier MoE inference needs a datacenter — the same pressure that makes
  2.8T-parameter models claimable by a laptop (thesis 3, alongside kimi-k3-in-c / FreeToken).
- **Baidu Unlimited-OCR (`baidu/Unlimited-OCR`, MIT, 24.7k★) — one-shot long-horizon document parsing with a constant
  KV cache.** Replaces all decoder attention layers of a DeepSeek-OCR-style pipeline with Reference Sliding Window
  Attention (R-SWA): a globally-visible reference segment of visual tokens plus a 128-token sliding decode window keeps
  the KV cache constant, so dozens of pages transcribe in a single forward pass instead of page-by-page loops that
  reset memory. The 3B-total / 500M-active MoE decoder compresses a 1024×1024 PDF page to 256 visual tokens (16×), with
  single-page ("gundam") and multi-page ("base") modes. Reaches SOTA on OmniDocBench v1.5/v1.6 single-page end-to-end
  parsing; authors argue R-SWA generalizes to ASR and translation. "Soft forgetting" is the actual fix for the
  KV-growth wall — a general attention pattern, not a wrapper (thesis 3, beside Daedalus-150M's cache elimination).
