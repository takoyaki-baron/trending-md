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

## ODS — the local-AI installer becomes its own category (09-01 12:22)

- **`Osmantic/ODS` (Apache-2.0, 5.6k★, v2.6.0 stable)** — a `curl | bash` installer (PowerShell block on
  Windows, Docker required) that assembles a full local stack: llama-server, Open WebUI, LiteLLM, Whisper,
  Kokoro TTS, the Hermes agent, n8n, Qdrant, SearXNG and ComfyUI. Auto-detects NVIDIA / AMD (incl. Strix
  Halo unified memory) / Intel Arc / Apple Silicon / CPU, picks a model tier to fit the VRAM/RAM envelope,
  and "bootstrap mode" serves a 1.5B model in under 2 minutes while the real model downloads in background
  and hot-swaps in. Every service is a drop-in extension (manifest + compose file) managed by an `ods` CLI;
  local-first by default, cloud/hybrid optional. The integration tax is the product — local-AI installers
  are becoming a category at exactly the moment the new hardware wave (Strix Halo, Mac Studio clusters) gives
  people machines to point them at. Caveats: ~1.4k open PRs against 3.2k commits is an unusual maintenance
  shape; the "sovereign human right" framing is the project's own marketing; no third-party benchmarks of
  the assembled stack.

## slotstream + Tiel-Coder — expert streaming fragments, quant surgery matures (09-02)

- **slotstream (`carloslfu/slotstream`, Show HN, 82 pts) — a fifth-plus parallel implementation of the
  expert-streaming thesis; the fragmentation is the finding.** A single Swift/MLX binary running
  Qwen3.8-Flash-Next (125B MoE, 104GB at 4-bit) on Macs that can't hold it in RAM: a ~3.8GB resident dense
  trunk plus the 32GB n-gram table stay in unified memory, while the 68GB of routed experts (512 per layer,
  10 active) are read on demand via `pread` into a fixed pool of cache slots shared across all 48 layers,
  auto-resized every 15s. Measured ~12 tok/s warm on a 48GB M5 Pro (~32GB peak). The right kind of claim:
  **greedy decoding byte-identical between 4GB and 24GB caches, "enforced as a standing test"** — falsifiable,
  in CI. Stated limits: this one model only; the entire prompt prefills before the first token (~70s at 8k
  tokens); 32k context; no tools, images, or JSON-schema outputs (HTTP 400); non-48GB figures are estimates.
  The top comment lists at least five prior repos doing essentially the same thing (mlx-moe-offload, streamlx,
  mlx-moe, mlx-flash, deepseek-v4-flash-mlx) and asks for collaboration rather than another README — the
  space is fragmenting exactly like the routing-DSL layer did (→ [[smart-routing]]): many engines, no shared
  implementation, and the differentiation is in cache policy and API compatibility.
- **Tiel-Coder-35B-A3B (peculiar-ragdoll, GGUF of MIT Ornith-1.5-35B-A3B, 87.8k downloads) — template +
  imatrix surgery now plausibly rivals frontier-medium agentic coding at 22GB.** A custom coding-weighted
  imatrix and a new "Sharp" chat template; the card claims 12/25 fixes on SWE-bench-Live, "the same as Opus
  4.6 (medium)," at an 8.6-minute median per attempt, and the best multi-turn conversation of any local model
  measured (67.2 Claw-Eval vs the base's 65.3), vision inherited from the base's BF16 mmproj projector. The
  load-bearing caveat is the card's own: "Benchmarks are one run per problem on SWE-bench-Live… treat small
  differences as noise" (n=25) — the honest headline, in the same class as the disclaimer-stripping cases in
  [[fact-check]] but on the virtuous side. Bonus quality-control story: a side note documents that Ornith's
  original **MTP head shipped as random-init weights** until a trained one was re-uploaded Aug 23, verified
  by kurtosis statistics — check the checkpoints, not the card.

## Baseten's efficient frontier — which techniques trade tradeoffs and which erase them (09-02)

- Philip Kiely imports portfolio theory into inference engineering: every deployment sits on a
  latency–throughput efficient frontier, and techniques divide into those that move you **along** it (batch
  sizing, tensor/expert/attention-data parallelism) and those that **push the frontier out** (quantization
  MXFP4/NVFP4, speculative decoding EAGLE-3, prefill/decode disaggregation) — with frontier gains compounding
  (2× hardware × 2× software ≈ 4×).
- The prominent caveats are the honest part: a conceptual taxonomy with **no benchmarks**; the frontier is
  "very jagged," with cutoffs discoverable only by empirical sweeps; and the framing assumes a GLM-5.3/Kimi
  K3-class model doing agentic coding with KV-cache reuse and KV-aware routing. Quantization gets its own
  note: it opens a *new* quality axis rather than a free win.
- Useful because inference debates are usually tradeoff arguments without a shared map — naming which
  techniques relocate you versus expand the frontier is the mental model behind most real serving-config
  decisions, and the zero-benchmark disclaimer keeps it a mental model, not a result.

## The M4 Pro blueprint — the concrete middle of the local-LLM market (09-02)

- lws.io (HN 237): an always-on M4 Pro Mac mini (48 GB) runs **Qwen3.6-35B-A3B-OptiQ-4bit** (35B total /
  256 experts, ~3B active, ~20 GB resident) as the main reasoning model, plus Gemma-4-E4B-it (2.4 GB) for
  chat and formatting, served by **oMLX** (HF model browser, auto-discovery, SSD-persisted KV cache) at a
  measured 325 tok/s prompt processing / 34 tok/s generation — reached from iPhone, MacBook and mini over
  Tailscale. Clients: Hermes agent backend, Apollo on iOS, Raycast AI, Pi for coding.
- Numbers stated with their tradeoffs: 4-bit OptiQ (8-bit on sensitive layers) costs 1–2 benchmark points vs
  BF16; dense 27B models don't fit 16 GB machines without swap pain; 34 tok/s is "quick enough that he
  doesn't notice," not instant. Sizing checklist: file size ≈ parameter count in GB at 4-bit, minus ~6–8 GB
  macOS overhead, minus KV-cache headroom, keep 10–15% buffer before SSD swapping.
- Position: the concrete middle between slotstream's expert-streaming extreme and the API fallback — a
  ~$1,400 always-on box covering "the 80% of requests that do not need GPT-5 or Claude Opus," with the API
  kept as fallback rather than a purity test. The telling detail is the MoE lesson: total parameter count is
  marketing; active parameters × quantization is what fits in RAM.

## WebLLM — the browser as the zero-install end (09-03)

- mlc-ai/web-llm (18.8k★, Apache-2.0) resurfaces on HN (64 pts): high-performance LLM inference entirely
  in-browser via WebGPU, no server — OpenAI-compatible streaming/JSON-mode API, Web Worker + Service Worker
  support, Chrome-extension deployment, MLC-format models from Llama/Phi/Gemma/Mistral/Qwen2.
- The honest README limitations: first model load downloads weights uncached ("a significant amount of
  time"), function calling is "preliminary," and the `model` chat parameter is **silently ignored** — engines
  are selected at construction, not per-request, a footgun for anyone porting OpenAI SDK code. Service
  workers can be killed by the browser at any time.
- Position in this file's map: the strongest *privacy* end of local inference — weights and prompts never
  leave the tab — and the zero-install extreme of the same fit-to-device trend as the M4 Pro blueprint and
  colibri's disk streaming. The trade is browser-lifecycle fragility instead of hardware sizing.

- **Qwen3.8 27B on Cerebras at ~1,500 tok/s (Sep 3, HN 250 pts).** Wafer-scale serving of an open-weights
  Apache-2.0 dense 27B (released by Qwen in August) at ~1,500 tokens/s with 64k/128k context; for scale,
  `gpt-oss-120b` runs ~3,000 tok/s on the same catalog. The HN thread is local-inference operators doing
  arithmetic against their own tok/s budgets. The asterisk: Cerebras hardware, not reproducible on a GPU node.
  Position in this file's map: agent loops are bottlenecked on output tokens, and 1,500 tok/s makes long
  reasoning chains cost-irrelevant *if* you accept wafer-scale as your serving tier — the serving-speed
  counterpart to the M4 Pro blueprint (own hardware) and WebLLM (browser).

## 2026-09-05 04:03

- **llama.cpp's future under NVIDIA-owned Hugging Face (governance note).** ggml.ai — Georgi Gerganov and
  the llama.cpp founding team — joined Hugging Face in February with written commitments: the projects
  "remain open and community driven as always," "will continue to be 100% open-source," and the community
  retains autonomous control over technical and architectural decisions. NVIDIA's reported ~$12.9B HF
  acquisition has closed over the team, and Gerganov publicly reiterated the commitment — the test of
  whether it holds is only beginning. Community concerns raised in the announcement thread itself: US
  jurisdiction, ownership clarity, no prior public discussion. Practical note for this feed: llama.cpp/ggml
  is the substrate every "runs on your laptop" demo here runs on — its governance *is* local-inference
  infrastructure. (Sourcing caveat: the X permalink of Gerganov's comment could not be opened
  unauthenticated; the HN discussion quotes and links it, and the Feb 20 commitment is in llama.cpp
  discussion #19759.)

## Signal-free eviction; compilation as an alternative to serving (09-05 20:03)

- **Random Attention (arXiv 2609.03430, Salesforce) deletes the field's central premise.** Every KV-cache compression
  method scores cached tokens by future importance and keeps the best; Random Attention keeps the prompt and evicts
  everything else uniformly at random per head — no scoring at all — and matches or beats the strongest learned
  selectors (SnapKV, R-KV, VaSE, TriAttention) at matched budgets. README (verified first-hand: Apache-2.0,
  `random_pp`): "the fastest evictor" in both an HF harness and a vLLM stack — note the paper's **32–43% vLLM
  throughput figure and the "prompt is the fragile part of the cache" framing are paper-only, not on the README**.
  Mechanism: reasoning traces protect themselves with redundancy at two levels — the text restates what it needs as
  it works, and each head keeps its own copy — so once the prompt is safe, a random draw retains enough. Scope
  honestly framed: extended-reasoning workloads (Qwen3-4B/14B/32B, phi-4-reasoning; MATH-500, GPQA-Diamond, AIME25/26,
  HMMT, LiveCodeBench), not general KV compression. Follows Daedalus in shrinking what the cache *is* — first the
  cache becomes optional, now its selection signal measures almost nothing.
- **Compile by Training (arXiv 2609.04199, Deng/Nie/Shieber, EMNLP 2026 demo, #1 HF daily paper) makes the LLM a
  compiler backend, not a runtime dependency**: at compile time, teacher models generate task-specific training data
  from a natural-language spec and train a small adapter on a compact interpreter; the compiled function then runs
  locally with no teacher and no API call — stored, versioned and composed "like ordinary software." On
  FuzzyBench-Hard: 83.6% semantic accuracy where the fast Program-as-Weights baseline scores exactly zero — with the
  honest caveats that the headline benchmark is the authors' own, the baseline scores zero on it by construction, and
  accuracy is explicitly traded against ~1 minute of compile time. Ships as a public interactive service.
- **TERMy / NPC-Forge (gioblu, AGPL-3.0) is the same build-time/run-time split from the no-training end**: a ~1,000-line
  deterministic Python NLU pipeline (noise stripping → exact → template → probabilistic matching with IDF-weighted
  Levenshtein) turns natural language into shell commands with millisecond responses on a Pi Zero, hardcoded
  permission gating for destructive commands, and an OpenAI-compatible API so the same NPC plugs into LLM frontends.
  Honest limits from the HN thread: anaphora resolution ("delete *it*") misfires, the dataset is a proof of concept,
  and the author's own proposed hybrid is the convergence point — an LLM generates dataset entries offline, the
  CPU-only runtime serves them. Determinism as a product: predictable, auditable, no alignment filter needed.

## Minima: W4A4 on every linear layer, recurrent ones included (09-06 04:03)

- **Minima AI (arXiv 2609.04098) applies NVFP4 W4A4 to all 496 linear layers of a hybrid 27B model** (16 attention
  + 48 Gated DeltaNet recurrent layers) — quantization work normally exempts the fragile parts — reporting a
  5-task average delta of −0.52 vs BF16 across MMLU-Pro, GSM8K, AIME'25, GPQA-Diamond, LiveCodeBench and RULER to
  64K. The mechanism findings matter more than the headline: gate projections convert ~11% GEMM error into ~2%
  output error, and the delta-rule recurrence holds injected noise flat over 32K tokens — **the recurrent half
  everyone assumed fragile is quantization-stable**. Smallest recipe 17.5 GiB with +14–19% faster prefill;
  checkpoint public (`minima-ai/mnma_qwen3.8_27b_nvfp4`). The authors' own limits: single architecture (no
  generalization claim), the 32K perplexity gap only "shrinks with position" rather than vanishing, only
  NVFP4/FP8 tested — and "within seed noise" is the vendor's framing of a small self-reported degradation. If
  recurrent layers survive 4-bit weights *and* activations, the last exempted component of hybrid LLMs falls and
  sub-20GiB 27B serving gets a documented recipe.

## Speculative decoding's printed counter-case (09-08)

vLLM's blog (AMD + Embedded LLM teams, Aug 23; HN trigger Sep 7, 118 pts) walks five drafting methods — native MTP,
Gemma 4 MTP, EAGLE-3, DFlash, DSpark — on Instinct MI300X/MI355X with ROCm. Peak measured: **2.83×** output-token
throughput (Qwen3.5-122B-A10B, mean accepted length 5.01, acceptance 80.2%); Qwen3.6-35B-A3B with DFlash at 1.77–2.06×;
optimal proposal length **N = 3–11** by model and dataset. The value is the printed counter-cases: **EAGLE-3's largest
measured MATH500 value remained *below* the no-spec baseline — it can be slower.** The TL;DR hedges immediately
(results "depended on the model family, draft checkpoint, workload, and acceptance behavior," all numbers "from our
test environment") and insists configs be chosen "using representative workloads and end-to-end measurements."
Speculative decoding has become reflexive advice; the post's discipline is the model for presenting it. Standard
vendor-benchmark caveat applies: AMD measuring AMD.

## Quantization with confidence intervals: 4-bit holds, 1-bit collapses (09-09)

Quesma's engineering post (Aug 26, trending Sep 8; read first-hand) is the rare quantization study with
**Wilson 95% confidence intervals and an agentic benchmark**: ~$3,000 of rented L40S/H100/H200 time
(Terminal-Bench 2.1 alone ~$2,308), llama.cpp, Unsloth GGUF quants of Qwen3.8 27B against a replicated BF16
baseline on GPQA Diamond / IFBench / Terminal-Bench 2.1 (89 tasks, 98k context). Results: **Q4_K_M (17 GB)**
—"you won't notice a difference on these benchmarks" — matched BF16 on Terminal-Bench while fitting a 24 GB
card; **UD-Q2_K_XL (10.7 GB)** — "things break a bit" but still "the level of Opus 4.7 or Gemini 3.1 Pro,"
writing ~25% more tokens per solved task (IFBench unchanged down to 2-bit); **UD-IQ1_S/M (6.2 GB)** —
"scores are around the random guessing level, with the smallest model being below that threshold," and at
`xhigh` reasoning effort it exhausts its token budget and returns empty answers — longer reasoning *hurts*
the broken quant. This directly contradicts Unsloth's "retain around 72% top-1% accuracy" marketing:
"that missing ~28% is decisive." The caveats are printed, which is why they're citable: the exact tested
quant files were replaced upstream (Aug 19), Q8_0 was accidentally skipped on Terminal-Bench (interpolated),
KV-cache quantization untested (F16 throughout), and an Aug-16 llama.cpp build was required.

## 2026-09-09 12:03 — Kimi K3 at 1 tok/s from four SSDs; gpu-lexer

- **Kimi K3 (2.78T) at a measured 1.00 tok/s on a 128 GB MacBook Pro M5 Max** (`argonautlabsai/deltafin`,
  a fork of `gavamedia/deltafin`; HN 227+). ~1.45 TB of MXFP4 expert weights streamed as per-(layer,expert)
  17.5 MB files from four Thunderbolt 5 SSDs via `pread` + `F_NOCACHE` (16 of 896 experts per layer), the
  attention trunk resident in int8. Four instrumentation-driven wins stacked: split demand/prefetch thread
  pools (+14%), hot experts spread across two drives (+10%), a least-expected-completion prefetch balancer
  (+11%), and re-testing a stale benchmark assumption (+8%) — and **RAID-0 was slower** ("striping makes
  every read touch every drive, so the slowest drive sets every barrier"). The limits are measured, not
  hidden: prefill is read-amplified ~6.2× (≈9 TB of reads for a 1.4 TB model), context caps at ~4.4k
  tokens, and the stated use case is overnight batch where data stays local. Ecosystem caveat: the demo
  lives in a 52-star fork; the upstream engine (`gavamedia/deltafin`, 805★) hasn't been pushed since Aug 6.
  The "your disk is your RAM" school (colibri, slotstream, kimi-k3-in-c) gains its most explicit
  instrumentation writeup — the wins are scheduling and cache placement, not raw bandwidth.
- **gpu-lexer** (Shu Ding, Vercel Labs; HN 95+). A **41,321-parameter WebGPU model** in a 27.4 KB bundle
  (trained on ~4.69M tokens) labels word/whitespace/symbol splits into nine token classes, merging
  adjacent labels into spans — replacing Shiki's 991.5 KB of hand-written grammars across 91 tested
  languages (embedded `<script>`/`<style>` included): 5.56M characters in 402 ms vs Shiki's 29.6 s. The
  same "small model beats a hand-written rule system" pattern that took over code search and diffing now
  reaches syntax highlighting, at browser-bundle size. The citation boundary is the author's own: accuracy
  is measured as *agreement with Shiki* (88% held-out, under 50% on Jinja/VB), not correctness, and he
  explicitly says it should not replace parsers, linters, or compilers.

## 2026-09-10 04:03 — on-device inference becomes a priced SDK tier

- **Desert Ant Labs — 18 task-specific on-device models behind one SDK, free below 100k devices/month**
  (launch Sep 8; HN 326+ pts). A new European lab (founded by the maker of the Detail video app): one
  Swift/Kotlin/JS SDK over 18 models (12 stable) — Voz transcribes 10 minutes of audio in 2s on iPhone
  (claimed 4.7× faster than Whisper; 319× realtime on M3 Ultra vs 78× for Apple SpeechAnalyzer), 9MB
  Clear for audio enhancement, 12MB Redact for PII masking, 284MB Clips for video. The post does its own
  caveat work: Redact catches 88.8% of PII vs GLiNER-PII's 91.1%, all benchmarks self-reported, Clear's
  figure "best of three." Why it matters: the edge tier gets a product shape — no tokens, no logins,
  free under 100k monthly active devices attacks per-token cloud pricing directly, and the privacy
  argument ("never uploaded") does real work for the transcription/redaction/classification tier of app
  development. The local-AI question shifts again: from "which runtime" (llama.cpp/MLX) to "which SDK."

## 2026-09-10 20:03 — the streaming school gets its maintained engine; "will it run" becomes one command; memory stacks on the die

- **colibri re-trends (+157/day, 27.3k★) — the 08-28 no-GPU expert-streamer now documented as a
  maintained engine, not a stunt.** Distinct from the one-off Kimi-K3-on-four-SSDs build: the README
  publishes failure modes — speculative decoding a **measured net loss** (MTP −32% near 85% expert hit;
  DeepSeek drafters default off), quantization-container rules, drive-dependent `O_DIRECT` — and lists
  what's unproven by name (placement, SSD striping, auto-planning). The floor is honest: 5.8–6.8 tok/s
  on 6× RTX 5090, ~1.8 tok/s warm CPU-only, 0.05–0.1 cold on 25 GB. Publishing failures alongside tok/s
  is what makes the numbers usable.
- **llmfit (AlexsJones, MIT, Rust, 35.5k★, +247/day)**: detects CPU/RAM/GPU/VRAM (CUDA, Apple Silicon,
  ROCm, oneAPI; multi-GPU, MoE-aware) and scores catalog models on four axes — memory fit, estimated
  speed, quality, context — with quantization awareness (GGUF, AWQ, GPTQ, EXL2), a TUI, a web dashboard,
  REST endpoints. Its honesty lives in `llmfit info`: speed and memory are model-based estimates grounded
  in a memory-bandwidth model + community `bench --share` submissions; real measurements replace
  estimates locally. The "will it run" question — answered daily by trial-and-error across quantization
  forums — becomes one command, with the estimate-vs-measured distinction kept visible.
- **Samsung zHBM prototype** (THE ELEC, 30+ HN pts): memory stacked directly on the AI accelerator die
  instead of alongside — claimed (all vendor, prototype-stage) up to 8× HBM5 data-processing
  performance, 3× perf-per-watt, thermal resistance cut by more than half. No production timeline,
  capacity, or pricing; the open question is where the memory controller lives. The most direct possible
  attack on the bandwidth/capacity constraint that binds both frontier training and colibri-class local
  inference — a direction, not a spec.

- **Apple ANE, reverse-engineered at the register level (eileen-yoon/eiln, Sep 12):** three years after
  abandoning her Linux ANE driver, Eileen Yoon mapped the M1 ANE end-to-end — 16 cores × 128 FP16 (256
  INT8) MAC lanes = 2,048 lanes; Q16.16 saturating accumulation read out as FP16 (shown via overflow
  probes); tanh is a 33-entry piecewise-linear LUT sampled at tanh(i/8); **no ISA — a fixed-function
  dataflow engine** driven by fixed-size ControlDMA register-write descriptors; 2 MiB shared L2 + 16×
  64 KiB kernel memory, roofline ridge point 162 OP/byte; and KernelDMA is **load-only at ~38 GB/s vs GPU
  ~78 GB/s** — an additive bottleneck she argues specifically hurts transformer decode, a concrete
  explanation for why NPUs disappoint at LLM decode. Motivation: the M5 folding ANE cores into the GPU,
  which she reads as "the beginning of the end for the standalone NPU." Her own caveats: "too opinionated
  to build a general-purpose accelerator platform around it," some layout reasoning self-described
  "armchair engineering," several register banks unidentified. Tools public (`eiln/ane` Linux driver,
  `ane-notes` firmware notes).

## 2026-09-14 04:03 — local speech becomes a one-app category; the CUDA-on-Windows moat gets another friction-reducer

- **debpalash/VoiceStudio (AGPL-3.0, 26.4k★, +2,546/day — the day's fastest riser):** 16 TTS and 11 ASR
  engines behind one desktop app — cloning, dubbing, dictation, transcription, audiobooks across a
  646-language catalogue — on Tauri v2 + React + a Python FastAPI backend, with an **OpenAI-compatible
  audio API and an MCP server on localhost** (agent-integrable by default). The trigger looks like
  v0.5.2 (Sep 10): a UX overhaul with one-click engine installs, folder-watching batch dubbing, and a
  new CPU audio backend. 2,536 commits. The README does the honesty work most "ElevenLabs killer" repos
  skip: beta status flagged, no local backend on Intel Macs, and the default OmniVoice weights are
  CC-BY-NC — so commercial use is governed by the *model* terms, not the app's AGPL; AudioSeal
  watermarking is on by default. The same local-first logic that reshaped LLM serving applied to the
  voice stack, with the MCP server as the bridge to agent runtimes.
- **Speedstu/CUDA-for-AMD-Windows (created the day before, 38 stars, HN 102+ pts):** packages the
  perpetually-frictional ZLUDA + ROCm/HIP recipe — running CUDA-targeted Windows applications on AMD
  GPUs — as a PowerShell-driven setup. The interest is the signal, not the repo: CUDA's grip on Windows
  ISV software (the one segment the CUDA-on-Linux translation path doesn't cover) is the last moat of
  the GPU duopoly, and every tiny repo that lowers ZLUDA's setup cost gets an audience. Caveat:
  **no license file** — treat it as a reference script, not redistributable software.
- Sources: [github.com/debpalash/VoiceStudio](https://github.com/debpalash/VoiceStudio) ·
  [Release notes v0.5.2](https://github.com/debpalash/VoiceStudio/releases) ·
  [github.com/Speedstu/CUDA-for-AMD-Windows](https://github.com/Speedstu/CUDA-for-AMD-Windows) ·
  [HN discussion](https://news.ycombinator.com/item?id=49684356)

## 2026-09-16 04:03 — ambient local AI ships as furniture; a memory-claim-only MoE trends

- **fugleramme (arnegiacomo/fugleramme, MIT, 1.2k★, 279 commits, Show HN #1 at 1,029 pts):** a
  Raspberry Pi 5 + 13.3″ Pimoroni Inky Impression (Spectra 6) e-ink frame running BirdNET-Go locally
  for audio bird detection — when the detected species change, it redraws one of 800+ hand-cut
  public-domain illustrations (400+ species, sized by AVONET body mass). One-line Pi installer, Docker
  compose bundles BirdNET-Go, live demo runs from the author's kitchen window in Bergen. Ambient,
  local-first AI that ends in a drawing on the wall instead of a chat box — and the discipline that
  made HN love it is that the frame **only redraws when the species actually change**. The README's own
  caveats: "still in early development"; artwork coverage best for "the Nordics, the British Isles and
  Germany. Elsewhere not so much (yet)"; BirdNET-Go's detection output is CC BY-NC-SA (non-commercial);
  "no art is AI-generated, though some has been retouched with AI."
- **Edge0-35B-A3B-preview (Hugging Face trending, 17.9k downloads / 2.6k likes):** a 35B sparse MoE
  with ~3B active parameters claiming "about 3 GB peak active memory," climbing alongside an 8B-A1B
  sibling (~1 GB) and a family of tiny ASR/TTS models (0.1B–0.6B), positioned for local/private/
  offline inference on phones, laptops, wearables, robots. The download velocity is real, and so is
  what's missing: **no numeric benchmark results anywhere on the org page** — the only performance
  claim is the memory footprint — no license stated, and the 3 GB figure is the org's own, unverified.
  Sparse-MoE memory math and real-world latency are different claims; treat as a signal to
  investigate, not a spec sheet (the Void lesson, still the standing default).
- Sources: [arnegiacomo/fugleramme](https://github.com/arnegiacomo/fugleramme) ·
  [HN discussion](https://news.ycombinator.com/item?id=49711544) ·
  [Edge0 on Hugging Face](https://huggingface.co/Edge0)

## 2026-09-16 12:03→20:03 — the clean-room GPU driver; local voice makes engines swappable

- **"I Came, I Prompted, I Left Part 2" (codyho.dev, 202+ HN pts) — a conformant M4 GPU driver in about a month:** Cody Ho and Niklas reverse-engineered the AGX firmware ABI and user space for M4/A18 Pro/(mostly) M5 using only live hardware probing through a custom hypervisor, built a custom IR/shader compiler + command-stream builder, and shipped a full Linux kernel driver — OpenGL ES 3.0-compliant, Chrome/Firefox WebGL with compositing, Minecraft at 200 fps. Clean-room discipline is the headline (no Apple binaries opened; all experiments published for provenance), and agents did much of the implementation grind under human direction — pairing a custom hypervisor with agent-driven RE compressed a multi-year effort into weeks. Honesty markers intact: "days was overly optimistic," code "not yet ready for end users," conformant Vulkan still ahead. (Lineage: Eileen Yoon's ANE register map, 09-12 — the same hardware, attacked from the other side.)
- **jamiepine/voicebox (MIT, 54.1k★, +409/day) — a local ElevenLabs/WisprFlow replacement whose abstraction is the point:** zero-shot cloning + 50+ preset voices, seven swappable TTS engines (Kokoro 82M → Qwen3-TTS 1.7B, 23 languages), Whisper dictation with global hotkey, pedalboard effects, unlimited-length generation via auto-chunking, and MCP integration so agents can speak in cloned voices; bundled Qwen3 LLMs (0.6B–4B) handle dictation cleanup. Differentiator vs the local-TTS cohort (VoiceStudio, 09-14): **engines are swappable, so the app survives model-of-the-week churn.** Gaps: no Linux binaries; target-aware auto-paste is macOS-only.
- Sources: [codyho.dev: GPU driver](https://codyho.dev/blog/gpu-driver/) ·
  [HN discussion](https://news.ycombinator.com/item?id=49717638) ·
  [github.com/jamiepine/voicebox](https://github.com/jamiepine/voicebox)

## 2026-09-17 12:03→20:03 — NVIDIA makes Rust a native CUDA language; ternary packing beats the 1.58-bit "floor"

- **NVIDIA publishes "Introducing CUDA Rust" — two official tracks for GPU kernels in Rust**, the
  vendor itself shipping a compiler path (community Rust-on-GPU projects have existed for years;
  this puts Rust alongside CUDA C++/Python as a first-class kernel language):
  - **cuda-oxide** (NVlabs) — a custom `rustc` codegen backend: `#[kernel]` functions flow through
    Rust MIR → Pliron IR → LLVM IR → PTX, for per-thread SIMT kernels in safe Rust (safety via
    per-thread exclusive `DisjointSlice` writes + validated launch contracts; shared memory still
    requires `unsafe`).
  - **cutile-rs** (`cutile` on crates.io) — the tile-based track: operate on tensor tiles, the
    compiler handles thread mapping + memory layout via CUDA Tile IR JIT, on **stable Rust 1.89+**;
    already runs outside NVIDIA in Hugging Face's Grout inference engine and mistral.rs.
  - Carry NVIDIA's own caveats: "both projects are early-stage and neither is production-ready,"
    "coverage is incomplete and APIs will move," Linux-only, compute capability 8.0+.
- **BITCOS (arXiv 2609.16338, Georganas/Heinecke/Dubey, Intel):** symbol-distribution measurements
  across 29 ternary models show zeros are up to **51.5% of weights**; BITCOS exploits the skew with
  a distribution-adaptive layout (dense presence bitmap + compacted sign vector, 2−z bits/weight):
  **1.485 bits/weight on the sparsest — below the log₂3 ≈ 1.585 floor, which assumes uniform
  symbols**; beats five-trit packing in 26/29 models, up to 1.28× speedup over production ternary
  matvec kernels, decode +1.18× CPU / +1.27× Xe2 GPU. Honest caveats: *loses* in 3 of 29, gains
  conditioned on each model's zero density, kernels target Intel hardware (AVX-512/AVX2/Xe2).
- Sources: [NVIDIA Developer Blog](https://developer.nvidia.com/blog/introducing-cuda-rust-two-tracks-for-writing-gpu-kernels/) ·
  [NVlabs/cuda-oxide](https://github.com/NVlabs/cuda-oxide) ·
  [HN: CUDA Rust](https://news.ycombinator.com/item?id=49724881) ·
  [arXiv 2609.16338](https://arxiv.org/abs/2609.16338) ·
  [HN: BITCOS](https://news.ycombinator.com/item?id=49732931)

## 2026-09-18 04:03 — colibri re-trends with exact numbers still in print

- **colibri (`JustVugg/colibri`, 35.7k★ verified via API, +872/day #15 daily, v1.11.0 Sep 13,
  Apache-2.0):** the pure-C, zero-dependency expert-streaming engine keeps trending, now with a
  model matrix — GLM-5.2/5.3, Kimi K3 (2.8T), DeepSeek V4 Flash, Qwen3.6, OLMoE — and the
  multitier split stated exactly: keep the ~17B dense core of a 744B GLM in RAM (~9.9 GB at
  int4), stream 19,456 routed experts (~372 GB) from NVMe on demand, no GPU. Published numbers:
  1.8 tok/s warm on a 128 GB CPU-only box, 5.8–6.8 tok/s on 6× RTX 5090; README invites
  "negative results too." Carry the project's own caveats: self-published, machine-specific
  benchmarks; O_DIRECT gains "vary per machine." The maintained-engine position from 09-10 holds —
  the disk-streaming school now has both the reference implementation and the honest failure log.
- Sources: [JustVugg/colibri](https://github.com/JustVugg/colibri) ·
  [GitHub Trending](https://github.com/trending)

## 2026-09-18 12:03→20:03 — ternary gets a second open challenger; quant culture keeps publishing its error bars; the browser replication arrives

- **PrismML Ternary Bonsai 2 27B** (Caltech spinout; HN 297 pts): Qwen3.8-27B rebuilt with {−1,0,+1}
  ternary weights + FP16 group-wise scaling — **1.76 effective bits/weight, 5.9 GB**, 262K context —
  with live GGUF/MLX weights on Hugging Face under Apache-2.0 (Simon Willison ran the GGUF in the
  thread — not vaporware). Self-reported: 83.9 vs 85.4 aggregate ("98.2% retention"), 143 tok/s on an
  RTX 5090. The hedges: "near-lossless" is vendor framing — it **trails the full-precision baseline in
  nearly every category** (vision 78.59 vs 81.64), requires Prism's own llama.cpp fork (an Intel B70
  owner got nothing usable), and full numbers live in a whitepaper PDF rather than the model card. If
  ternary holds at 27B, 27B-class becomes consumer-GPU default — the BITCOS zero-density conditionality
  (09-17) now has an industrial test case.
- **ByteShape ShapeLearn GGUF quants** (HN 77 pts, vendor post): the full Qwen 3.8 27B run published —
  five levels from IQ2_XXS (2.56 bpw) to IQ4_XS (3.84 bpw), tested RTX Pro 6000 → 4080/5060 Ti; the
  GPU-4 tier fits 11.0 GB targeting 16 GB cards; speculative decoding via an embedded MTP draft head or
  a 1.1 GB external DFlash2 draft; scores BF16-normalized across instruct (GSM8K, IFEval, MMLU,
  LiveCodeBench V6) and thinking (BFCL V4, ACEBench) suites on llama.cpp b10430. Consumer-GPU
  quantization culture now publishes KLD-divergence fidelity curves where it once published vibes —
  with the disclaimers in the right places (vendor self-benchmarking, spec-decode plots "do not
  independently establish quality equivalence," Bartowski's newer quants postdated testing, VRAM fit
  depends on context/serving config). Joins Quesma's CI'd bench (09-09) as the measured end of the
  quant-claims spectrum.
- **OpenJev (TheoLeeCJ/openjev, MIT, 1.4k★)** — the browser as a replication lab: pinned GGUF builds
  (Qwen3 0.6B / MiniCPM5 2B / Qwen3.5 4B) running in-page via wllama (WASM llama.cpp), no backend,
  inputs never leaving the page — reaching **84.5% vs hosted Jev's 88.3%** and publishing its own
  shortfall (softmax-over-options, not calibrated confidence; different quantization than BF16). Also
  the zero-install privacy end web-llm argued (08-21), now used for community benchmarking. (Model-side
  reading → [[frontier-models]].)
## 2026-09-21 04:03 — the memory constraint gets a supply-side datapoint

- **Samsung reportedly to more than double HBM4/HBM4E output next year** (Seoul Economic
  Daily, 159-pt HN thread): from unnamed industry sources — outsourced glass-carrier cleaning
  volume 20k → 50k sheets/month, overall HBM capacity up ~40% (180k → 250k wafers/month),
  HBM4-family share of shipments ~40% → ~80% as HBM4E ramps. Recaps: HBM4 mass-production
  shipments began February (1c DRAM, 4nm base die); 12-layer HBM4E samples to customers
  including Nvidia in May. Read the caveats before the numbers: the headline itself says
  "Sources Say," Samsung confirmed nothing, the article is AI-translated from Korean, and glass
  carriers are reused after cleaning, so sheet volume maps loosely to output. If even the
  direction is right, the AI-memory constraint everyone is pricing for 2027 loosens — and
  Nvidia being the only named customer tells you where the allocation goes.

Sources: [Seoul Economic Daily](https://en.sedaily.com/finance/2026/09/20/samsung-to-double-hbm4-output-next-year-sources-say) ·
[HN discussion](https://news.ycombinator.com/item?id=49778029)


- Sources: [prismml.com/news/bonsai-2-27b](https://prismml.com/news/bonsai-2-27b) ·
  [HF: prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf) ·
  [HN: Bonsai 2](https://news.ycombinator.com/item?id=49746618) ·
  [byteshape.com: ShapeLearn Qwen 3.8 27B](https://byteshape.com/blogs/Qwen3.8-27B/) ·
  [HN: ByteShape](https://news.ycombinator.com/item?id=49749393) ·
  [openjev.com](https://openjev.com/) ·
  [TheoLeeCJ/openjev](https://github.com/TheoLeeCJ/openjev)

## 2026-09-21 20:03 — the disk-streaming school reaches continual learning: experts as files, one 8 GB GPU

`volotat/mini-AGI` (Alexey Borsky, MIT, Show HN 136 pts) makes training and inference the same
operation: a byte-level model (256 byte values + 9 structural markers, no tokenizer), PonderNet-style
adaptive halting applied up to 24 times per character, and a growing/pruning Mixture-of-Experts pool
where **each expert is a file on disk paged onto the GPU as needed** (~540M total params, 32
resident) — the disk-streaming trick from [[agent-stack]]'s MoE-serving school applied to the
continual-learning problem. The headline result is anti-forgetting: running the trunk at 0.1× the
experts' learning rate held measured forgetting to **+0.0067 nats after 524k characters — 99.84%
retained, vs ~50% for other configurations**. Trains from scratch on a single 8 GB CUDA GPU
(reference rig: RTX 3070 Laptop).

The README does the honest-framing work: "as of now this is a small toy-level model," **weights not
published** ("a couple of weeks away"), outputs repetitive, and the nats/char benchmark carries ~0.03
run-to-run variance from nondeterministic CUDA expert dispatch. Treat it as an existence proof that
continual learning fits in modest hardware — measured in nats, not vibes — not a capable model.
Watch: the promised weights release (the claim is unfalsifiable until then), and whether the
expert-paging scheme survives contact with real workloads.

Sources: [volotat/mini-AGI](https://github.com/volotat/mini-AGI) ·
[HN discussion](https://news.ycombinator.com/item?id=49783133)


## 2026-09-22 12:03 — the M5 Ultra review: the local-agent-fleet verdict from someone who actually lives on it

Federico Viticci (MacStories, 236-pt HN) reviews the M5 Ultra Mac Studio — the first UltraFusion
quad-die design (two dual-die M5 Max chips), 80-core GPU, 819 GB/s → **1.2 TB/s**, 256 GB unified
memory (512 GB variant late October). Local-AI numbers with Qwen3.8-Flash-Next 4-bit via oMLX:
prompt processing +150% vs M3 Ultra (~2,733 tok/s), ~108 vs 70 tok/s generation at 16K context,
60–85 tok/s even at 256K, time-to-first-token at 256K halved to ~102s. **Concurrency is the quiet
win**: three parallel requests hit 81.5 tok/s combined (+23%) where the M3 Ultra gained only 4% —
the property that actually matters for agent fleets.

The verdict matters more than the numbers: Viticci now runs his daily agent stack *entirely
on-device* (a 99-day agent research stack at zero API cost). The caveats are unusually clean: an
RTX 5090 still beats it on raw generation (~25% faster) for models that fit in 32 GB; setup is
"not something I would ever recommend" to casual users; the hardware costs more than years of
cloud subscriptions — and the review states no price, the one spec that decides everything.
Same lane, same day: Dettmers' ecosystem drop claims Qwen 3.6 35B-A3B at ~450 tok/s on a Mac via
1.5-bit quantization and DeepSeek V4.1 (550B) on a 128 GB MacBook with automatic context
compression — advocacy with concrete caveats (detail → [[frontier-models]]). The consumer
local-agent endpoint is now being priced in public by people who depend on it, not by vendors.

Sources: [MacStories review](https://www.macstories.net/stories/m5-ultra-mac-studio-review-the-dream-mac-for-local-ai-agents/) ·
[HN discussion](https://news.ycombinator.com/item?id=49787313)

## 2026-09-22 20:03 — gzip as a language model, honestly reported

`gzipt` (pure-stdlib Python, by the nathan.rs author, 196-pt HN) primes DEFLATE's 32 KiB window with a corpus and scores continuations as `len(compress(context + candidate))` — shorter means more "predicted". Two tricks make it work at all: beam search over multi-byte spans (gzip emits integer byte counts, so single-byte steps tie and drown in quantization noise), and keeping only the last `tail` bytes in the scoring context, since DEFLATE favors cheap nearby matches and full history collapses into verbatim self-copying. The Shakespeare sample comes out recognizably play-formatted and garbled; the author's own verdict is "kind of?" — citing DeepMind's "Language Modeling Is Compression" (arXiv 2309.10668), whose footnote already recorded that gzip-based generation "ended up performing poorly". Worth keeping twice over: a working, zero-trained-parameter demonstration of the compression=prediction equivalence, and a model of how to report a negative result (no benchmarks claimed, caveats in line). The beam-over-byte-spans construction is the actual novelty over the 2023 paper.

Sources: [nathan.rs](https://nathan.rs/posts/gzip-lm/) · [arXiv:2309.10668](https://arxiv.org/abs/2309.10668) · [HN discussion](https://news.ycombinator.com/item?id=49797323)
