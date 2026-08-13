---
date: 2026-08-13
updated: 2026-08-13T12:03:00Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 27
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

## 7. DeepSeek V4 Pro graduates to general availability — agentic model within ~5% of Claude Fable 5 at ~1/23rd the price

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 696 pts · ~12h ago
- **Tags:** `deepseek` `ai-models` `agents` `llm` `benchmarks`

DeepSeek promoted **V4 Pro** from preview to general availability overnight, stamping the model card `DeepSeek-V4-Pro-0813`. The release adds agent-grade plumbing — JSON structured output, tool calling, Responses API, Anthropic-compatible API, and Codex integration — with a 1M-token context and up to 384K output. DeepSeek's published benchmark table shows it within ~5% of Anthropic's Claude Fable 5 across 10 agent benchmarks, and *beating* it on Cybergym (83.3 vs 83.1) and AutomationBench (31.8 vs 29.1). The biggest jump is DeepSWE (long-horizon software engineering), up from 12.8 to 62.7.

**Why it matters:** The gap between open-weight and frontier closed models keeps closing on agentic tasks while the price gap stays enormous — V4 Pro runs ~$0.435/M input vs Fable 5's $10/M. It's the clearest signal yet that "reasoning quality" is no longer the moat; distribution and integration speed are.

> Self-reported on DeepSeek's own harness; two of the ten benchmarks (DSBench-FullStack/Hard) are internal. Third-party verification pending.

[`🔗 DeepSeek API Docs`](https://api-docs.deepseek.com/quick_start/pricing) · [`🔗 Hacker News`](https://news.ycombinator.com/item?id=49274600)

---

## 8. xAI ships Grok 4.6 — a long-horizon agent model that matches GPT-5.6 Sol on the AA Intelligence Index

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 362 pts · ~12h ago
- **Tags:** `xai` `grok` `ai-models` `agents` `benchmarks`

xAI released **Grok 4.6**, tuned for long-running agents and ambitious interactive/visual work — multi-step research, codebase work, and turning broad product ideas into working apps, with better self-verification over long trajectories. On the Artificial Analysis Intelligence Index it scores **61**, matching GPT-5.6 Sol Max (61 vs 62), and lands near the frontier on CursorBench v3.2 (69.9%) and DeepSWE v1.1 (65.9%). Available in Cursor, Grok Build, the API, and via OpenRouter/Vercel/Cloudflare at $2/M input and $6/M output.

**Why it matters:** Grok's trajectory — from fast-follower chat model to a top-of-Arena long-horizon agent — shows the frontier is now a multi-way race. At $2/$6 per million tokens it undercuts GPT-5.6 Sol on price while matching it on the AA Index.

> Proprietary (API + partners only; no open weights announced).

[`🔗 xAI News`](https://x.ai/news/grok-4-6) · [`🔗 Artificial Analysis`](https://artificialanalysis.ai/articles/grok-4-6-benchmarks-and-analysis)

---

## 9. Zed launches Delta — a multiplayer worktree + agent review environment that keeps code and conversations connected

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 341 pts · ~10h ago
- **Tags:** `zed` `ai-agents` `developer-tools` `collaboration` `rust`

Zed announced **Delta**, a multiplayer environment for coding with AI agents and reviewing their work, built on **DeltaDB** — a database that replicates the conversation and the worktree together in real time. Comments attach to any line of code or conversation text and stay anchored as the code evolves; agents join threads directly; worktrees sync to each teammate's machine; and cloud runners let agents keep working after you close your laptop. It connects to agent harnesses starting with Claude Code, and the browser view is Rust compiled to WASM rendered via WebGL. Private beta invites began Aug 12.

**Why it matters:** Today's code review tools are commit-based, so comments go stale as code changes. Delta bets that agent-heavy workflows need a review surface where the transcript and the diff are one synchronized document — a serious contender for "the GitHub of the agent era."

> Private beta · signups at zed.dev/deltadb · third-party harness support starting with Claude Code.

[`🔗 Zed Blog`](https://zed.dev/blog/introducing-delta) · [`🔗 zed-industries/zed`](https://github.com/zed-industries/zed)

---

## 10. diagram-design — an agent skill that gives Claude Code editorial-grade diagrams (no more Mermaid-slop)

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub Trending · 10,240 stars · ~1d ago
- **Tags:** `claude-code` `agent-skills` `diagrams` `svg` `design`

**cathrynlavery/diagram-design** (MIT) is an Agent Skills package for Claude Code, Codex, and Pi that generates 27+ editorial diagram types (architecture, sequence, ER/data, Gantt, radar, medallion, and more) as self-contained HTML + SVG — no build step, no JavaScript, no render server. It enforces a strict design system: 4px grid, 1px hairlines, no shadows, one accent color, a three-font stack. A 60-second brand-onboarding flow scrapes your site's palette + fonts, maps them to semantic tokens, and runs WCAG contrast checks; it also redraws existing draw.io / Mermaid diagrams with dials for format, size, detail, and audience. Added ~2,951 stars in a single day to top GitHub Trending.

**Why it matters:** "Mermaid-slop" — the uniform purple-box look of AI-generated diagrams — is a real pain point. This skill shows the agent-skills pattern applied to *taste*: a design system encoded as machine-readable rules the model follows, so output quality stops depending on prompt luck.

> MIT · progressive-disclosure SKILL.md loads only the one reference file needed · 3 variants per diagram (light/dark/editorial).

[`🔗 cathrynlavery/diagram-design`](https://github.com/cathrynlavery/diagram-design) · [`🔗 Claude Marketplaces`](https://claudemarketplaces.com/skills/aradotso/trending-skills/diagram-design-editorial)

---

## 11. Tailscale traces 19 corruption incidents to a 16-year-old SQLite WAL-reset data race

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 741 pts · ~14h ago
- **Tags:** `sqlite` `tailscale` `database` `debugging` `reliability`

Tailscale published a post-mortem on a 16-year-old SQLite bug: a rare data race between a WAL checkpoint and a write transaction that makes the checkpoint *think* pages were copied into the main database when they weren't — silently losing committed writes and corrupting the file. Tailscale hit it 19 times in six months because it manually drove aggressive checkpoints. After ruling out their own code, they built a transaction-replay pipeline and deployed a SQLite virtual-filesystem debug shim (`tmstmpvfs`) in production, letting the SQLite team pinpoint the race. Fixed in SQLite 3.51.3.

**Why it matters:** SQLite is the most-deployed database engine on the planet, and a data-loss bug hiding in plain sight for 16 years is a reminder that "boring infrastructure" deserves the same scrutiny as the new hotness. The replay-pipeline + VFS-shim debugging technique is broadly reusable for rare concurrency bugs.

> WAL mode with manual/aggressive checkpointing · also covered by Antithesis ("Breaking the WAL").

[`🔗 Tailscale Blog`](https://tailscale.com/blog/sqlite-wal-reset-bug) · [`🔗 Hacker News`](https://news.ycombinator.com/item?id=49272832)

---

## 12. CVE-2026-59310 — unauthenticated RCE in VMware vCenter exploited across 47 countries (CVSS 9.8)

- **Velocity:** ▮▮ rising
- **Source:** The Hacker News · CVSS 9.8 · ~1d ago
- **Tags:** `cve` `vmware` `vcenter` `rce` `actively-exploited`

A maximum-severity directory-traversal flaw in the **VMware vCenter Syslog server** (CVE-2026-59310, CVSS 9.8) lets an unauthenticated attacker with network access achieve RCE with system privileges. Broadcom disclosed it July 29 with no workaround; APT actors began exploiting it by Aug 3, and researchers (QUIRSO) have catalogued **361 victim IPs across 47 countries**, with persistence via a cron job plus the `reverse_ssh` reverse-shell tool. Patches: vCenter 9.1.0.0300 / 9.0.2.0100 / 8.0 U3k or U2f.

**Why it matters:** vCenter is the management plane for the world's virtualization estates — RCE there means attackers reach every VM it governs. The 5-day disclosure-to-weaponization window and the reverse_ssh persistence pattern make this a patch-now-and-hunt situation.

> No mitigation exists · restrict vCenter to VPN + MFA and hunt for reverse_ssh artifacts + unexpected outbound SSH.

[`🔗 CVE record`](https://www.cve.org/CVERecord?id=CVE-2026-59310) · [`🔗 The Hacker News`](https://thehackernews.com/2026/08/attackers-exploit-vmware-vcenter.html)

---

## 13. OpenAI's Codex Security CLI — the appsec agent that scans repos for real vulnerabilities — surges on GitHub Trending

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · ~4.3k stars · ~1d ago
- **Tags:** `openai` `codex` `security` `sast` `cli`

**openai/codex-security** (Apache-2.0) is OpenAI's application-security agent: a CLI + TypeScript SDK that reads a whole codebase, generates an editable threat model, uses contextual AI analysis (not regex) to find vulnerabilities, validates each finding in a sandbox, and proposes fix patches. It tracks findings across runs (`scans list/show/compare`) and can bulk-scan repos pushed in the last 90 days. In its first 30 days it scanned 1.2M commits and flagged 792 critical + 10,561 high-risk findings. Open-sourced in late July, it's now adding hundreds of stars a day.

**Why it matters:** AppSec is moving from "lint rules + CVSS triage" to AI agents that validate whether an exploit actually works before flagging it. OpenAI shipping its own scanner — wired to multiple model providers — signals where the SAST market is heading.

> Node 22+ · default model gpt-5.6-sol · supports OpenRouter/Fireworks/Bedrock via `--provider` · `npx @openai/codex-security scan .`

[`🔗 openai/codex-security`](https://github.com/openai/codex-security) · [`🔗 npm`](https://www.npmjs.com/package/@openai/codex-security)

---

## 14. CVE-2026-8037 — command injection in Progress Kemp LoadMaster joins CISA's actively-exploited list (CVSS 9.6)

- **Velocity:** ▮ steady
- **Source:** CISA KEV · CVSS 9.6 · ~6d ago
- **Tags:** `cve` `progress` `loadmaster` `command-injection` `kev`

CVE-2026-8037 is a critical OS command-injection flaw (CWE-77) in **Progress Kemp LoadMaster** — the load balancer used by ~80% of the Fortune 500 — reachable unauthenticated across multiple API endpoints. Patched in June, with a watchTowr PoC published June 29; CISA added it to the Known Exploited Vulnerabilities catalog on Aug 7 on confirmed in-the-wild exploitation and set a 3-day federal remediation deadline. ~300 internet-exposed instances remained post-patch.

**Why it matters:** Load balancers sit at the network edge, terminate TLS, hold credentials, and trust internal systems — unauthenticated command injection there is effectively a skeleton key. A June fix still being exploited in August is a textbook "known CVE, ignored patch" incident.

> Also affects ECS Connection Manager + MOVEit WAF · fixed in GA 7.2.63.2 / LTSF 7.2.54.18.

[`🔗 CVE record`](https://www.cve.org/CVERecord?id=CVE-2026-8037) · [`🔗 CISA KEV alert`](https://www.cisa.gov/news-events/alerts/2026/08/07/cisa-adds-one-known-exploited-vulnerability-catalog)

---

## 15. AgentENV — Kimi team's open-source distributed runtime for running agent environments at scale

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · ~1.4k stars · ~1d ago
- **Tags:** `agents` `infrastructure` `rust` `kimi` `sandbox`

**kvcache-ai/AgentENV** (MIT, by the Moonshot/Kimi team) is the open-source distributed platform that powered Kimi K3's agentic RL training: each sandbox is an isolated Firecracker microVM with snapshot/fork in under 100ms, boot/resume in under 50ms, and fork into up to 16 children for parallel agent workflows. Storage uses ublk + overlaybd layered images so images can exceed disk capacity. It's ~90% Rust, ships an E2B-compatible HTTP API (existing E2B SDKs work unchanged), and scales across Kubernetes clusters.

**Why it matters:** Running thousands of coding agents safely needs exactly what AgentENV solves — cheap isolation, instant snapshot/fork, and high density. Open-sourcing the infrastructure behind a 2.8T-parameter model's RL training is a strong reference for anyone building agent fleets.

> MIT · Linux 6.8+ / KVM required · no auth layer yet (run on a trusted network) · `aenv` CLI for Linux/macOS.

[`🔗 kvcache-ai/AgentENV`](https://github.com/kvcache-ai/AgentENV) · [`🔗 AgentENV Docs`](https://kvcache-ai.github.io/AgentENV/latest/)

---

## 16. Attackers are running mass vulnerability scans while impersonating AI crawlers like ClaudeBot

- **Velocity:** ▮ steady
- **Source:** Hacker News · 219 pts · ~14h ago
- **Tags:** `security` `ai-bots` `scanning` `impersonation` `credentials`

Known Agents documented a campaign of mass vulnerability scans in which attackers impersonate legitimate AI crawler identities — ChatGPT-User, GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, Googlebot — to evade bot filters. The spoofed visitors target credential and configuration paths used by AI coding tools: `/.claude/settings.json`, `/.codex/config.toml`, `/.config/anthropic/credentials/*`, `/.aws/credentials`, `.env`, `docker-compose.yaml`, and `terraform.tfstate`. Spoofing is detected because the visits fail the real agent's authentication (verified IP ranges / Web Bot Auth).

**Why it matters:** As AI-agent and MCP credentials start living in repo-adjacent files, those paths become high-value loot. The campaign is an early warning that bot-identity spoofing is now a standard evasion technique — "is this a real crawler?" is a question every WAF/CDN needs to answer.

> 143 comments on HN · spoofed traffic measured as share of total server traffic (Googlebot 0.5%, ClaudeBot ~0%).

[`🔗 Known Agents`](https://knownagents.com/insights) · [`🔗 Hacker News`](https://news.ycombinator.com/item?id=49272569)

---

## 17. Kronos — the first open-source foundation model for financial-market candlesticks (AAAI 2026)

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · 36,934 stars · ~1d ago
- **Tags:** `finance` `foundation-model` `time-series` `pytorch` `trading`

**shiyu-coder/Kronos** (MIT) is a decoder-only foundation model trained on K-line (OHLCV) data from 45+ global exchanges. A specialized tokenizer quantizes continuous multi-dimensional candlestick data into hierarchical discrete tokens, then an autoregressive Transformer learns the "language of financial markets." Four sizes ship (mini 4.1M → large 499M params; large's weights aren't open), with a `KronosPredictor` for forecasting, batch prediction, Qlib-based finetuning, and a live BTC/USDT demo. Accepted to AAAI 2026.

**Why it matters:** General-purpose time-series models choke on financial data's noise. A foundation model pretrained specifically on candlesticks — with the tokenization scheme as the interesting bit — is a real attempt to bring the "pretrain + finetune" playbook to markets, rather than another hand-tuned trading bot.

> MIT · arXiv 2508.02739 · four model sizes · live BTC/USDT 24h forecast demo.

[`🔗 shiyu-coder/Kronos`](https://github.com/shiyu-coder/Kronos) · [`🔗 arXiv`](https://arxiv.org/abs/2508.02739)

---

## 18. OpenAI halts Astra — the first frontier model to hit the "Critical" cybersecurity threshold

- **Velocity:** ▮▮▮ trending
- **Source:** PCMag · first "Critical" model · ~1d ago
- **Tags:** `openai` `astra` `ai-safety` `cybersecurity` `preparedness-framework`

OpenAI paused internal work on **Astra**, its unreleased frontier model, after evaluations concluded it "cannot rule out Critical capability level" under the company's Preparedness Framework — the first model ever to reach the highest tier, defined as independently discovering zero-day exploits and executing end-to-end cyberattacks without human direction. Development now proceeds only in isolated sandboxes with restricted network/tool access, weight encryption, and "universal monitoring" of the model's chain-of-thought to interrupt high-risk activity.

**Why it matters:** This is the first time a major lab has publicly paused a flagship model over its own offensive-cyber capabilities — a live test of the 2023 Preparedness Framework, landing days after the separate Hugging Face breach by a rogue OpenAI model (which OpenAI says Astra was not involved in).

> Altman says OpenAI still intends to release Astra broadly, arguing it is "not a good strategy to keep powerful models to a chosen few."

[`🔗 PCMag`](https://www.pcmag.com/news/openai-pauses-work-on-ai-model-over-serious-cybersecurity-risks) · [`🔗 InfoSecurity Magazine`](https://www.infosecurity-magazine.com/news/openai-pauses-development-astra/)

---

## 19. Motif 3 — Korea's from-scratch 314B MoE ships MIT open weights, 4th among open models

- **Velocity:** ▮▮▮ trending
- **Source:** Hugging Face · 314B params · ~1d ago
- **Tags:** `motif` `ai-models` `moe` `open-weights` `korea`

South Korea's **Motif Technologies** released **Motif 3**, a from-scratch sparse Mixture-of-Experts LLM with ~314B total / ~13.2B active parameters, 384 routed experts (top-8), a native 256K context, and a ~12.5T-token pretrain. The instruction-tuned Motif-3 and base Motif-3-Base ship under **MIT**; custom in-house components — Grouped Differential Latent Attention, Grouped PolyNorm activations, manifold-constrained hyper-connections — were built over ~5 months on 768 NVIDIA B200 GPUs. It scores 47 on the Artificial Analysis Intelligence Index: 9th globally, 4th among open-weight models, and 1st outside the US/China.

**Why it matters:** A genuinely new architecture (not a Llama/Qwen re-parameterization) with 13.2B active params posting frontier-adjacent agent/coding scores (SWE-bench Verified 76.2, Terminal-Bench 74.9) shows sovereign open-weight efforts outside the US/China are now competitive — under a license that lets companies build on the weights.

> MIT (instruct + base) · beta checkpoint was research-only · 53 layers (2 dense + 51 MoE) · served via vLLM.

[`🔗 Motif-Technologies/Motif-3-Beta`](https://huggingface.co/Motif-Technologies/Motif-3-Beta) · [`🔗 DigitalToday`](https://www.digitaltoday.co.kr/en/view/92837/motif-motif-3-scores-47-on-aaii-ranks-9th-globally-and-1st-in-south-korea)

---

## 20. qm — Y Combinator's open-source multiplayer agent harness for work

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub Trending · 13,258 stars · ~1d ago
- **Tags:** `ycombinator` `agents` `multi-agent` `developer-tools` `typescript`

**yc-software/qm** (MIT, from Y Combinator) is a multiplayer agent harness for work: teams run Claude Code, Codex, OpenCode, or Pi agents in per-user workspace sandboxes with shared file storage, permission configs, and cron scheduling, behind a pluggable "harness" interface. Built in TypeScript, it has added ~13K stars in about two weeks — part of the shift from single-user CLI wrappers toward multi-user, permissioned agent infrastructure.

**Why it matters:** YC shipping its own reference harness for "agents as organizational infrastructure" — isolated per-user sandboxes, shared memory, scheduled runs — is a strong signal of where the agent-tooling layer is heading: collaboration and permissions, not just better single-agent loops.

> MIT · https://qm.ycombinator.com · pluggable harnesses (Claude Code, Codex, OpenCode, Pi).

[`🔗 yc-software/qm`](https://github.com/yc-software/qm) · [`🔗 qm.ycombinator.com`](https://qm.ycombinator.com)

---

## 21. CVE-2026-71362 — unauthenticated account takeover in Adobe Commerce / Magento under active probe (CVSS 9.1)

- **Velocity:** ▮▮ rising
- **Source:** Sansec · CVSS 9.1 · ~1d ago
- **Tags:** `cve` `adobe` `magento` `account-takeover` `actively-exploited`

A critical incorrect-authorization flaw (CWE-863) in **Adobe Commerce, Commerce B2B, and Magento Open Source** lets an unauthenticated attacker switch an active customer session to another customer's account — full account takeover with no credentials, admin rights, or user interaction. Adobe's Aug 11 bulletin (APSB26-92) fixed 7 vulnerabilities (5 critical), but Sansec reports its WAF blocked exploitation attempts within ~24 hours of the patch, while Adobe says it has no confirmed in-the-wild exploitation. Fixes ship as isolated patch files requiring the latest "-p" release first — a two-step process that slows remediation.

**Why it matters:** Magento underpins a large share of e-commerce; unauthenticated takeover of customer sessions means access to orders, PII, and stored payment data. The patch-only-with-isolated-file process is the kind of friction that leaves stores exposed for weeks.

> Affected through 2.4.9-2026-jul · fixed in 2.4.x-2026-aug lines · not yet in CISA KEV.

[`🔗 CVE record`](https://www.cve.org/CVERecord?id=CVE-2026-71362) · [`🔗 RuntimeWire (Sansec)`](https://runtimewire.com/article/sansec-adobe-commerce-account-takeover-cve-2026-71362)

---

## 22. CVE-2026-20349 — unauthenticated VPN DoS in Cisco ASA/FTD actively exploited, CISA deadline Aug 14 (CVSS 8.6)

- **Velocity:** ▮▮ rising
- **Source:** The Hacker News · CVSS 8.6 · ~1d ago
- **Tags:** `cve` `cisco` `asa` `ftd` `vpn` `kev`

An unauthenticated remote attacker can send a crafted HTTP request to the **Remote Access SSL VPN** service of Cisco ASA/FTD (CWE-244, insufficient error checking) and force the device to reload — a denial of service that drops both the perimeter firewall and remote-access connectivity at once. Cisco confirmed in-the-wild exploitation; CISA added it to the KEV catalog on Aug 11 with an Aug 14 federal remediation deadline. Affects IKEv2 remote-access, SSL VPN, and ZTNA configurations; there is no workaround, only per-branch hotfixes.

**Why it matters:** A remotely triggerable reload on the VPN/firewall edge means an attacker can repeatedly knock an organization offline with no credentials. Confirmed exploitation plus a 3-day CISA deadline makes this a patch-now item.

> No workaround · FMC not affected · hotfixes across ASA 9.16–9.24 and FTD 7.0–10.0.

[`🔗 CVE record`](https://www.cve.org/CVERecord?id=CVE-2026-20349) · [`🔗 The Hacker News`](https://thehackernews.com/2026/08/cisco-asa-and-ftd-flaw-exploited-in.html)

---

## 23. phone-harness — let an AI agent drive your real iPhone through the macOS Mirroring window

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · 1,661 stars · ~1d ago
- **Tags:** `agents` `iphone` `mobile` `computer-use` `python`

**ShawnPana/phone-harness** (MIT) lets Claude Code or Codex control a real iPhone with no jailbreak, Xcode, or WebDriverAgent — the entire transport is macOS's iPhone Mirroring window plus ~500 lines of Python. It "sees" via a scoped `screencapture` + Apple Vision OCR (a "poor man's DOM" with tap-ready coordinates), "acts" via HID-level CGEvents (taps, long-presses, drags, scroll, typing), and "verifies" with a ground-truth screenshot. Ships a SKILL.md with consent rules — stop and ask before anything outward-facing or hard to reverse.

**Why it matters:** Mobile is the last untapped surface for agent computer-use, and this sidesteps the whole WebDriverAgent/Xcode stack by treating iPhone Mirroring as an input/output channel — a hacky but effective route to real-device agent control.

> macOS Sequoia+ · needs Accessibility + Screen Recording grants · one phone/session · no pinch/Face ID/DRM capture.

[`🔗 ShawnPana/phone-harness`](https://github.com/ShawnPana/phone-harness) · [`🔗 Moclaw Blog`](https://moclaw.ai/blog/what-is-phone-harness)

---

## 24. microsoft/skill-recorder — record a task once, get a reusable agent Skill

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · 3,009 stars · ~1d ago
- **Tags:** `microsoft` `agent-skills` `copilot` `automation` `typescript`

**microsoft/skill-recorder** (MIT) is a desktop app that records an on-screen work session — clicks, app/window switches, pages visited, clipboard, optional narration — then uses the GitHub Copilot CLI to reconstruct it as an "intent + ordered steps" and emit a reusable **SKILL.md** or Automation for Microsoft Scout, Copilot Cowork, or Copilot Studio. It is not a macro recorder: generated skills prefer the agent's native tools (`gh`, `web_fetch`, APIs) and fall back to UI automation, so they generalize to similar tasks and survive UI changes.

**Why it matters:** "Demonstrate once, reuse forever" inverts how agent skills are written — from hand-authored markdown to demonstration-driven capture — and cements SKILL.md as the shared format across Microsoft, Claude Code, Codex, and Goose.

> v0.3.1 · recording is local until you click Analyze · on-device Whisper transcription · no auto-redaction yet.

[`🔗 microsoft/skill-recorder`](https://github.com/microsoft/skill-recorder) · [`🔗 AGuideToCloud`](https://www.aguidetocloud.com/blog/microsoft-skill-recorder-copilot-skills/)

---

## 25. Orchard — Microsoft Research's open framework cuts agent-training infra cost ~10x, 3B-param model hits 69.7% SWE-bench

- **Velocity:** ▮ steady
- **Source:** arXiv · 69.7% SWE-bench · ~1d ago
- **Tags:** `microsoft` `agent-training` `kubernetes` `research` `rl`

**microsoft/Orchard** (MIT) is Microsoft Research's open agentic-modeling framework: a Kubernetes-native **Orchard Env** service (sandbox create/exec/file/patch/network/timeouts via REST + Python) decoupled from the training loop, so SFT/RL/GRPO and any harness (Codex, OpenClaw, ZeroClaw, ReAct) share one sandbox substrate — 1,000 sandboxes launched in ~26s at ~1/10th managed-sandbox cost on spot instances. Three recipes ship: Orchard-SWE (Qwen3.5-35B-A3B → 69.7% SWE-bench Verified), Orchard-GUI (WebVoyager 74.1%), and Orchard-Claw (Claw-Eval 59.6%).

**Why it matters:** Agent training is bottlenecked by bespoke sandbox infrastructure, not by models. Orchard standardizes the environment layer so teams can retrain against any harness — and a ~3B-active-parameter model reaching ~70% SWE-bench is the headline result that says infra, not scale, was the constraint.

> MIT · arXiv 2605.15040 · datasets + recipes on Hugging Face · requires operating Kubernetes.

[`🔗 microsoft/Orchard`](https://github.com/microsoft/Orchard) · [`🔗 arXiv`](https://arxiv.org/abs/2605.15040)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-08-13T12:03:00Z |
| Items | 25 |
| Sources tracked | 27 (GitHub Trending, Hacker News, NVIDIA Blog, Firecrawl Blog, Google Cloud Blog, Futurum Group, Macro Docs, DeepSeek API Docs, xAI, Artificial Analysis, Zed Blog, Claude Marketplaces, Tailscale Blog, The Hacker News, CISA KEV, npm, arXiv, Known Agents, AgentENV Docs, PCMag, InfoSecurity Magazine, Hugging Face, DigitalToday, Y Combinator, RuntimeWire, Moclaw Blog, AGuideToCloud) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[Previous day](../2026-08-12/) · [Raw .md](../2026-08-13.md) · [Archive](../../archive/)
