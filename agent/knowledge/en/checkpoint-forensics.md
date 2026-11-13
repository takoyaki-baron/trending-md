---
topic: checkpoint-forensics
title: "Checkpoint forensics: hardware provenance recovered from published weights"
created: 2026-11-13
---

# Checkpoint forensics

**The claim (2026-11-13):** the random initialization of a model checkpoint leaks the GPU class
that produced it. Will DePue's report (Unemployment Labs, 2026-11-12) recovers the PRNG seed and
thread layout burned into a model's initial weights and reads back which hardware started the run —
making an export-control allegation technically checkable for the first time from public artifacts.

## The method

1. **Preserved values.** A trained checkpoint preserves a subset of its *initialization* values —
   tokens that survived training unchanged (padding, unused vocab rows, dead experts). These are
   the forensic substrate.
2. **Seed + layout search.** Framework init is a seeded PRNG filling a grid whose shape encodes the
   device's thread/SM layout. Search (seed, layout) space until a candidate reproduces the preserved
   values bit-for-bit.
3. **The class falls out of the layout.** The layout that reproduces the values identifies the GPU
   class: **132 SMs = Hopper (H100/H200), 148 SMs = B200/B300, 152 SMs = GB200/GB300** — the
   export-controlled classes. AMD's MI300X has a different layout and value order, so it is
   separable.

## The findings (Nov 12 report)

- **DeepSeek-V4-Flash, MiniMax-M3** → 148-SM B200/B300 layout. **DeepSeek-V4-Pro, Kimi K3,
  K3.1-Pro, Ant's Ling-3.1-flash** → 152-SM GB200/GB300. **Every earlier model from the same labs**
  reads 132-SM Hopper.
- **Reproducible on physical chips:** DeepSeek's seed 953049583 on an H100 reproduces V3's 57,344
  preserved values bit-for-bit but not V4-Flash's; on a B300 the same method reproduces V4-Flash
  (445 of 469 selected rows bit-exact); a GB200 reproduces Kimi K3's 13 preserved rows (seed
  20256586).
- **AMD excluded by discrimination:** in the 377 values where NVIDIA and AMD orders differ, the
  published weights match NVIDIA 363 times and AMD zero.
- **Scale estimate (the report's own):** ~1,500–3,500 Blackwell GPUs per final run, ~12,000 across
  five models, ≈ half a billion dollars at WSJ per-GPU figures.
- **Agreement rate:** the method matches all **24** models whose hardware is publicly known;
  strongest per-model evidence runs 49–1,385 sigma against an ~8-sigma chance benchmark.

## The negatives (as important as the positives)

- **Qwen, GLM, Tencent, Xiaomi, StepFun's newest models still read Hopper.**
- **Some models leave no GPU fingerprint at all:** CPU-initialized Qwen3, PaddlePaddle's ERNIE,
  Meituan's ASIC-trained LongCat — absence of a fingerprint is a property of the init, not evidence
  of compliance.

## The ceiling (the report's own words — quote them)

> "These flags describe the hardware class under the U.S. export rules of October 2022 and October
> 2023. They are not a finding that any law was broken."

Fingerprints show **initialization** hardware and "support, without proving, the inference that
Blackwell also performed the training". The one-line rule: **the fingerprint identifies the hardware
class that started the run; it does not attribute training compute, and it does not constitute a
legal finding.**

## Why it belongs in this file

This is a new measurement instrument in the [[fact-check]] arsenal: aggregate allegations
("China trains on smuggled Blackwell") previously had no checkable artifact; now the published
weights themselves are the evidence surface, and the method's premise (Hopper = 132 SMs) is
checkable against NVIDIA's own published specs (verified 11-13: Wikipedia/NVIDIA print 132 Hopper
SMs). The instrument's limits are the usual ones: it reads *one instant* (initialization), it is
silent when init is CPU/ASIC-shaped, and its model-level results await independent reproduction —
the HN thread is discussion, not replication. Expect this genre to recur wherever hardware
provenance carries legal weight; the reusable questions are: *what instant does the artifact
preserve, what is the discrimination baseline, and what does the report explicitly decline to claim?*

→ [[frontier-models]] [[fact-check]] [[datacenter-silicon]]

Sources: [Unemployment Labs: checkpoint forensics](https://unemploymentlabs.com/checkpoint-forensics) ·
[HN discussion](https://news.ycombinator.com/item?id=50474883)
