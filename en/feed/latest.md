---
date: 2026-08-13
updated: 2026-08-12T20:03:00Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 7
license: CC-BY-4.0
---

# trending.md — Dense Trending Signals

Machine-readable trending information. Ranked by **velocity** — how fast attention is shifting.
Built for AI agents. Readable by humans.
→ Raw feed: [`/en/feed/latest.md`](/en/feed/latest.md)
→ Archive: [`/en/feed/`](/en/feed/)

---

## 1. NVIDIA open-sources NeMo Switchyard — a Rust router that decides which LLM handles each request

- **Velocity:** ▮▮▮ trending
- **Source:** NVIDIA Blog · 750 stars · ~18h ago
- **Tags:** `nvidia` `llm-routing` `rust` `ai-agents` `nemotron`

NVIDIA released **NeMo Switchyard** (Apache 2.0), a Rust proxy/library that translates between OpenAI Chat, Anthropic Messages, and OpenAI Responses formats and routes each request across a pool of models (vLLM, NVIDIA NIM, Ollama, or any OpenAI-compatible endpoint) — no app rewrites. Built-in routers: **classifier**, **stage**, **escalation**, and random. Announced alongside the Nemotron 3.5 Lightning open model; internal benchmarks claim frontier-level accuracy at ~1/3 the cost of Claude Opus 4.8 alone, and LangChain cut costs 74% by routing only 7% of calls to a frontier model.

**Why it matters:** As multi-model agent workflows proliferate, "which model serves which tokens" becomes a new control point. Switchyard targets that routing layer — and positions NVIDIA as the orchestration software on top of the chips, not just the chip supplier.

> Apache 2.0 · pre-alpha (API will change before v1.0) · partners: OpenRouter, LiteLLM, Kong, Nous Research, Siemens

[`🔗 NVIDIA-NeMo/Switchyard`](https://github.com/NVIDIA-NeMo/Switchyard) · [`🔗 NVIDIA Blog`](https://blogs.nvidia.com/blog/nemotron-lightning-switchyard-rtx-dgx/) · [`🔗 Futurum Group`](https://futurumgroup.com/insights/who-decides-which-model-runs-nvidia-would-like-a-say/)

---

## 2. Firecrawl's pdf-inspector — a Rust library that routes PDFs away from expensive OCR

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · 14,990 stars · ~1d ago
- **Tags:** `firecrawl` `pdf` `rust` `document-parsing` `ocr`

Firecrawl open-sourced **pdf-inspector** (MIT), a from-scratch Rust library that reads a PDF's internal structure — font encodings, text operators, image coverage — without rendering, then classifies each page as TextBased/Scanned/ImageBased/Mixed in ~10–50ms. Text pages get native extraction with reading order preserved; only the rest are routed to OCR. Ships Python (PyO3), Node (napi-rs), and WASM bindings plus `pdf2md` / `detect-pdf` CLIs. Leads the opendataloader-bench corpus with a 0.875 overall score at 0.470s for 200 docs.

**Why it matters:** Most PDF pipelines dump every page into GPU OCR. pdf-inspector's smart routing skips OCR for the ~54% of text-based PDFs — which is exactly how Firecrawl made its hosted parser 3.5–5x faster. The "classify first, extract only what's needed" pattern is reusable far beyond PDFs.

> MIT · single `lopdf` dependency · ~15k stars · powers Firecrawl's `/parse` and `/scrape`

[`🔗 firecrawl/pdf-inspector`](https://github.com/firecrawl/pdf-inspector) · [`🔗 Firecrawl Blog`](https://www.firecrawl.dev/blog/anydoc-and-pdf-inspector)

---

## 3. Google's official Agent Skills repo — 100+ markdown playbooks for agentic Google workflows

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · 17,882 stars · ~1d ago
- **Tags:** `google` `agent-skills` `cloud` `ai-agents` `mcp`

**google/skills** (Apache 2.0) packages ~100 markdown-based "skills" — reference files + code snippets an agent loads *on demand* — for Google products: GKE, BigQuery, Cloud Run, Gemini API, Firebase, Google Ads, plus multi-product "solution" workflows like RAG on GKE + AlloyDB. Install with `npx skills add google/skills`. Each skill ships `SKILL.md`, `OWNERS`, and `EVAL.yaml`, with CI checks for frontmatter, line counts, and link validity.

**Why it matters:** Skills solve the "context bloat" problem — instead of loading a huge MCP context, agents pull in only the exact expertise needed for a task. Google's repo is the reference implementation of the open Agent Skills format, now standardized via Agent Plugins 1.0.0 alongside OpenAI, Microsoft, Amazon, and Vercel.

> Apache 2.0 · ~18k stars · launched at Google Cloud Next 2026 · weekly quality evals across frameworks

[`🔗 google/skills`](https://github.com/google/skills) · [`🔗 Google Cloud Blog`](https://cloud.google.com/blog/topics/developers-practitioners/level-up-your-agents-announcing-googles-official-skills-repository)

---

## 4. Macro — a fully open-source (AGPL) unified workspace: email, chat, docs, tasks, agents, CRM

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · 1,604 stars · ~6h ago
- **Tags:** `macro` `workspace` `rust` `crdt` `team-tools`

**macro-inc/macro** is the open-source codebase for Macro, an all-in-one team workspace combining Gmail-style email, channels/DMs, Linear-style tasks, CRDT-based docs, a 2D canvas, CRM, calls, and agents — everything @linked into a bidirectional graph with shared AI memory. Built on SolidJS + a Rust backend (167 crates, 42 deployable services). AGPL-3.0, "fully open source — not open core." SOC 2 Type II / ISO 27001.

**Why it matters:** The all-in-one workspace trend (email + docs + tasks in one app) is usually closed SaaS. Macro ships the entire thing as AGPL with self-hosting docs, plus MCP-exposed team memory — an interesting reference architecture for the "single system" bet on work software.

> AGPL-3.0 · ~5k commits · docs.macro.com · team memory exposed via MCP with no rate limits

[`🔗 macro-inc/macro`](https://github.com/macro-inc/macro) · [`🔗 Macro Docs`](https://docs.macro.com)

---

## 5. Woxi — an open-source Wolfram Language / Mathematica reimplementation in Rust

- **Velocity:** ▮ steady
- **Source:** Hacker News / Show HN · 226 pts · ~6h ago
- **Tags:** `wolfram` `mathematica` `rust` `cas` `symbolic-computation`

**Woxi** ("Wolfram oxidized") by ad-si reimplements the Wolfram Language in Rust — `woxi eval`/`run`/`repl` CLI, a Jupyter kernel, a browser WASM build, and **Woxi Studio** (a Mathematica-like `iced` GUI notebook). Startup is milliseconds because there's no kernel or license check. Conformance is enforced by ~26,000 unit tests and ~900 `.wls` snapshot tests run against WolframScript; supports "almost everything up to v6.0" of the language.

**Why it matters:** Mathematica/Wolfram Language is powerful but proprietary and license-gated. A fast, embeddable reimplementation opens symbolic computation to new environments (WASM, notebooks, embedded apps) — and the snapshot-testing-against-the-original approach is a robust template for compatible language reimplementations.

> Rust (97.6%) · Jupyter + JupyterLite + Woxi Studio · `cargo install woxi`

[`🔗 ad-si/Woxi`](https://github.com/ad-si/Woxi) · [`🔗 Hacker News`](https://news.ycombinator.com/item?id=49270040)

---

## 6. git-knife — edit commit messages, authors, and dates like a spreadsheet

- **Velocity:** ▮ steady
- **Source:** Hacker News / Show HN · 161 pts · ~10h ago
- **Tags:** `git` `gui` `tauri` `history-rewrite` `developer-tools`

**git-knife** (TheRealYT) is a Tauri (Rust + web) desktop GUI for editing git commit metadata — message, author/committer name+email, and both dates — in a spreadsheet-like table with bulk regex find-and-replace. It rebuilds commits via `git commit-tree`, reusing each commit's original tree so **file contents are provably never changed**, snapshots a backup ref (`refs/knife-backup/*`) before each rewrite, and warns on pushed history + stripped signatures.

**Why it matters:** Polished GUIs (GitKraken, Sublime Merge, lazygit) treat dates and committer identity as immutable; CLI tools like git-filter-repo have no GUI. git-knife fills that gap for legitimate history fixes — correcting a bad email, matching commit dates to scraped-data timestamps, splitting a repo — while its commit-tree design makes accidental content changes structurally impossible.

> Tauri v2 · shells out to system git · MVP · backup refs + one-click restore · merge commits locked

[`🔗 TheRealYT/git-knife`](https://github.com/TheRealYT/git-knife) · [`🔗 Hacker News`](https://news.ycombinator.com/item?id=49259611)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-08-12T20:03:00Z |
| Items | 6 |
| Sources tracked | 7 (GitHub Trending, Hacker News, NVIDIA Blog, Firecrawl Blog, Google Cloud Blog, Futurum Group, Macro Docs) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[Previous day](../2026-08-12/) · [Raw .md](../2026-08-13.md) · [Archive](../../archive/)
