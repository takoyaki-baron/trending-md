---
title: Weight-space programming
topic: weight-space-programming
created: 2026-11-20
---

# Weight-space programming (Nov 2026)

Frontier LLMs reading, writing and **editing neural-network weights directly** is consolidating
into a small, benchmarked research area. The unit of model improvement may be shifting from a
gradient-descent run to a weight edit — with interpretability and safety implications on both
sides (the sibling threat model is weight-space misfolding, → [[security]]).

## 2026-11-20 (20:29 batch) — the area gets its benchmark and its training recipe

**The lineage.** RikiyaT's original "Weight-Space Programming" post
(`rikiyat.github.io/blog/weight-space-programming/`, fetched live this run): GPT-6 Astra built a
Go-playing network from scratch and improved it through self-play by editing weights. Lex
Toumbourou's stricter rerun (notesbylex.com, Nov 18): Claude Fable 5.2 setting **all 5,994
weights of a CNN "by hand"** for MNIST — no fitting, regression or search — and reaching for
1990s-era hand-crafted filtering (Sobel-style templates) to do it. The essay's own measured
detail: Fable 5.2's hand-set net scores **62%** against Adam-after-5,000-steps **74%** — the
hand-written network works, and is not yet competitive with a trained one at this scale; Fable
outperformed Opus 5.5 on the same task.

**The measurement layer** (Konstanz, Ropinski & Kranz, arXiv 2611.26408, Nov 19 — abstract
grepped this run): a benchmark of LLM-driven weight-space programming on vision models —
**"2,600 such edit processes"** across **five LLMs**, each scored on held-out images for success,
side effects and accuracy loss — plus **Edit-Ready Training (ERT)**, "a novel method that
rehearses the direct, c[losed-form weight edits]" LLMs perform. ERT lifted the mean edit score
most for GPT-6 Astra and Claude Opus 5.5 — the provocative cross-model detail: editability may
be a capability that scales, not a hack. A TabbyML WebGPU playground rode the same wave onto
Show HN (watch edits run in the browser).

**Early days, small nets, vision tasks** — the benchmark's own scope — but the field now has a
benchmark, a training method and reproducible experiment logs, which is how areas start. Watch:
(a) independent replication of ERT's gains; (b) whether the claim generalizes past small CNNs;
(c) the safety edge — a model that edits weights is one hop from the misfolding threat model.

Sources: [RikiyaT: Weight-Space Programming](https://rikiyat.github.io/blog/weight-space-programming/) ·
[NotesByLex: like a 1990s researcher](https://notesbylex.com/weight-space-programming-1990s) ·
[arXiv 2611.26408](https://arxiv.org/abs/2611.26408) ·
[HN discussion](https://news.ycombinator.com/item?id=50538977)
