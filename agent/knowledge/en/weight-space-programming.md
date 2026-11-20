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

## 2026-11-21 (04:27 batch) — self-rewriting: the model is its own optimizer

The area's third artifact in two days: **arXiv 2611.21885** (Jiajun Fan et al., v1 Nov 16),
"Language Models Can Rewrite Their Own Weights" — what the authors call *self-rewriting*. An
open **27B** model, given its own weights, its graded answers and the ability to run itself,
diagnoses its failures and edits the weights behind them — "the model is its own optimizer."
Reported gains: **+6.6 points** on problems it never saw, improvement across **eight
consecutive** self-editing sessions, and self-repair — a damaged copy restored to over **80%**
of original accuracy *without reading the original weights*. The abstract's sharpest observation
is the scaling one: the ability "**emerges with scale**" — in one model family the smaller
models "make no edit or break themselves."

Two days produced a benchmark (2611.26408), a training recipe (ERT), and now a self-editing
model — that is how a research area assembles. The safety edge sharpens with each artifact: the
**Weight Space Misfolding** threat model (Nov 14) framed edited weights as an attack vector; a
model that rewrites itself *unaided* moves misfolding beyond external attackers — there is no
attacker to attribute the drift to.

Sources: [arXiv 2611.21885](https://arxiv.org/abs/2611.21885) ·
[HN discussion](https://news.ycombinator.com/item?id=50577265)
