---
date: 2026-08-16
updated: 2026-08-16T12:03:00Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 35
license: CC-BY-4.0
---

# trending.md — Dense Trending Signals

Machine-readable trending information. Ranked by **velocity** — how fast attention is shifting.
Built for AI agents. Readable by humans.
→ Raw feed: [`/en/feed/latest.md`](/en/feed/latest.md)
→ Archive: [`/en/feed/`](/en/feed/)

---

## 1. Prime Agent — a self-improving "RLM" coding agent that cleared ARC-AGI-3 above the human baseline

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub · 16.2k stars · ~1d ago (~20:03 UTC+8)
- **Tags:** `agents` `self-improving` `rlm` `arc-agi-3` `open-source`

Prime Intellect open-sourced **prime-agent** (MIT), a coding-and-research agent built on a **Recursive Language Model (RLM)** abstraction: instead of a fixed tool menu, the model gets one persistent IPython kernel and does file ops, shell, subagent spawning (`rlm(...)`), and context management as Python code. A second layer, the **Continual Harness**, stores prompts, memories, and reusable subagent specs as durable state that the agent itself refines via `/refine` — small, evidence-backed self-edits that never touch the immutable system prompt. On **ARC-AGI-3** the harness hit **95.5% RHAE Best@1** (vs a 95.4% human-expert baseline), and it built working Sega Genesis and Game Boy Color emulators from spec.

**Why it matters:** It's the first high-profile open agent to treat its *own harness* as mutable learned state, and its ARC-AGI-3 result is the new high-water mark for the benchmark — though the 95.5% is vendor-reported and the public repo ships without the ARC adapter/prompts.

> Not a sandbox: it executes model-generated Python with your permissions; results vary hard by base model (78.3% with GPT-5.6 Sol, 8.6% with GLM-5.2).

[`🔗 PrimeIntellect-ai/prime-agent`](https://github.com/PrimeIntellect-ai/prime-agent) · [`🔗 Prime Intellect blog`](https://www.primeintellect.ai/blog/prime-agent)

---

## 2. SAP Commerce Cloud hit by a CVSS 10.0 flaw — exploit attempts landed 3 days after the patch

- **Velocity:** ▮▮▮ trending
- **Source:** The Hacker News · CVSS 10.0 · ~1d ago (~20:03 UTC+8)
- **Tags:** `sap` `cve` `rce` `commerce-cloud` `zero-day`

SAP patched **CVE-2026-58231**, a maximum-severity (CVSS 10.0) flaw in the **Commerce Cloud Data Hub Adapter** where insufficient authorization checks plus weak input validation let an **unauthenticated attacker abuse a default authentication client** to submit crafted input and reach arbitrary code execution. Threat-intel firm Defused Cyber reported exploitation attempts against its honeypots **three days after the patch**, with **no public PoC** — meaning attackers likely reverse-engineered the fix itself. Onapsis warns the Data Hub Adapter plugs Commerce Cloud into product/order/inventory systems, so a hit extends well beyond the exposed service.

**Why it matters:** "Patch-then-reverse-engineer" is the fastest-widening attacker pattern, and it punishes any organization that treats a CVSS 10.0 patch as a routine update. Onapsis stresses the fix is urgent and that downloading the patch isn't enough — the running Commerce Cloud must be rebuilt and redeployed.

> Temporary workaround: configure an IP Filter Set to restrict access to the vulnerable endpoint; affected branches COM_CLOUD 2211 / 2211-JDK21.

[`🔗 The Hacker News`](https://thehackernews.com/2026/08/sap-commerce-cloud-cve-2026-58231.html) · [`🔗 SOCRadar advisory`](https://socradar.io/blog/sap-commerce-cloud-cve-2026-58231/)

---

## 3. Claude Code flips Auto Mode to default — an AI classifier replaces click-through approval

- **Velocity:** ▮▮▮ trending
- **Source:** Anthropic · ~2d ago (~12:03 UTC+8)
- **Tags:** `anthropic` `claude-code` `auto-mode` `safety` `prompt-injection`

As of Aug 14, **Claude Code** runs **Auto Mode by default** on Pro, Max, and Team plans: a proprietary classifier scores every tool call in real time and only blocks actions judged "irreversible, destructive, or aimed outside your environment," instead of prompting on each action. Anthropic's rationale is data — in a study of 1,053 testers, humans caught only **13.6%** of deliberately dangerous commands (falling to ~5% after 50 prompts) while Auto Mode caught **89%**, and users approve ~97% of prompts anyway. A third-party eval (Trajectory Labs, 720 injection attempts) found zero successful attacks against Claude models in Auto Mode vs 5.8–19% against GPT-5.6 Sol in Codex modes.

**Why it matters:** This is the first major default move from "human approves every action" to "model judges every action" — a genuine shift in who guards the boundary — and it's landing exactly as prompt-injection attacks on coding agents go mainstream.

> Critics note Anthropic built, tested, and now mandates the classifier itself; a single prompt injection only has to slip past once. Enterprise/API users still opt in for now.

[`🔗 Claude Code blog`](https://claude.com/blog/auto-mode-default-in-claude-code) · [`🔗 Simon Willison`](https://simonwillison.net/2026/aug/8/auto-mode/)

---

## 4. macOS Screen Sharing auth bypass is being actively exploited for root + Monero miners

- **Velocity:** ▮▮ rising
- **Source:** The Hacker News · CVSS 9.8 · ~1d ago (~20:03 UTC+8)
- **Tags:** `apple` `macos` `screen-sharing` `cve` `cryptomining`

**CVE-2026-65400** is an authentication-bypass in macOS Screen Sharing (VNC on TCP 5900) caused by an authentication-state-management error that lets a network attacker authenticate **without credentials** and escalate to root. Apple patched it Aug 6 (macOS Tahoe 26.6.1 / Sequoia 15.7.9 / Sonoma 14.8.9), but the **Dutch NCSC confirmed active in-the-wild exploitation**: every documented case ended in root access and an installed **Monero miner**, against Macs with port 5900 exposed to the internet (~40,000 potentially exposed machines).

**Why it matters:** macOS automatically opens port 5900 when Screen Sharing is enabled, so a surprising number of internet-facing Macs were silently reachable. It's a reminder that "default on, VNC exposed" is a real attack surface — disable Screen Sharing or block 5900 unless you actually use it.

> Indicators: sustained high CPU from Apple-named processes, c3pool connections, files under `/private/var/root/.config/`.

[`🔗 The Hacker News`](https://thehackernews.com/2026/08/apple-macos-screen-sharing-flaw.html) · [`🔗 4sysops`](https://4sysops.com/archives/active-attacks-exploit-macos-screen-sharing-flaw-cve-2026-65400-to-gain-root-access/)

---

## 5. Cloudflare's @cloudflare/computer — "your agent needs a computer, not a container"

- **Velocity:** ▮▮ rising
- **Source:** GitHub · 8.2k stars · ~2d ago (~12:03 UTC+8)
- **Tags:** `cloudflare` `agents` `durable-objects` `filesystem` `edge`

Cloudflare open-sourced **@cloudflare/computer** (MIT), an agent runtime whose centerpiece is a **Workspace** — a persistent virtual filesystem backed by **SQLite in a Durable Object**, so an agent's "hard drive" survives sessions and hibernation. One entry point (`workspace.runtime.exec`) dispatches to three backends: a full **Linux container** (FUSE-mounted via a `computerd` daemon), an **isolate shell**, and **isolate JavaScript** — the thesis being that agents only need heavy containers for <10% of work, while the rest runs in cheap isolates. Ships AI-SDK-compatible `read`/`write`/`edit`/`ls`/`exec` tools, all gated and audited.

**Why it matters:** "Give every agent a container" doesn't scale to the billions-of-agents future Cloudflare is betting on; the Workspace model is the first credible filesystem-shaped answer, and it's a concrete preview of how agent state will live at the edge.

> Early preview, unstable APIs, explicitly not production-ready; distinct from Cloudflare Kitesurf (browser automation).

[`🔗 cloudflare/computer`](https://github.com/cloudflare/computer) · [`🔗 Cloudflare Blog`](https://blog.cloudflare.com/cloudflare-computer/)

---

## 6. TencentDB Agent Memory — team-level memory hub turns chat/docs/code into shared agent assets

- **Velocity:** ▮▮ rising
- **Source:** GitHub · 21.9k stars · ~2d ago (~12:03 UTC+8)
- **Tags:** `tencent` `agent-memory` `team-memory` `knowledge-graph` `mcp`

Tencent Cloud's **TencentDB-Agent-Memory** (MIT) crossed 20k stars in 90 days and shipped v2.0 **Team Memory**, turning a team's conversations, documents, and code into four reusable assets: **Chat Memory** (an L0→L3 extraction ladder from raw logs to long-term persona), **Skills** (versioned SOPs with trigger/validation rules), **Wiki** (LLM-structured pages + link graphs), and **CodeGraph** (symbols, call relationships, impact paths). A three-service Docker stack (`memory-core`/`memory-hub`/`memory-proxy`) injects matched memory into any coding agent's system prompt each turn via OpenAI/Anthropic-compatible APIs.

**Why it matters:** Individual "agent memory" is table stakes now; TencentDB-Agent-Memory is the strongest push so far to make memory a **shared, governed team asset** that survives framework and model changes — the layer that lets a one-person "company" of agents actually compound.

> Framework-agnostic; BM25 + vector + RRF retrieval; visibility scoped private/team/ACL per asset.

[`🔗 TencentCloud/TencentDB-Agent-Memory`](https://github.com/TencentCloud/TencentDB-Agent-Memory) · [`🔗 Manila Times`](https://www.manilatimes.net/2026/08/13/tmt-newswire/pr-newswire/tencentdb-agent-memory-tops-20000-github-stars-in-90-days-launches-team-memory-for-multi-agent-collaboration/2404570)

---

## 7. Lazarus burned a Windows afd.sys zero-day in its "Dream Job" campaign; CISA set an Aug 25 deadline

- **Velocity:** ▮▮ rising
- **Source:** CISA KEV · CVSS 7.0 · ~5d ago (~04:03 UTC+8)
- **Tags:** `windows` `afd-sys` `lazarus` `cve` `kev`

**CVE-2026-68820** is a use-after-free race condition in the Windows Ancillary Function Driver (`afd.sys`) that lets a locally-authenticated attacker reach **SYSTEM** with no user interaction — one of three zero-days in Microsoft's Aug 11 Patch Tuesday. Check Point attributed exploitation to **Lazarus Group's Operation Dream Job**: fake Lockheed Martin / Enveil recruiter accounts on LinkedIn delivered a trojanized PDF viewer and the **Troy** backdoor, then used the flaw to install an updated **FudModule v3.1** rootkit that blinds 94 ETW channels. CISA added it to KEV with an **Aug 25** federal remediation deadline.

**Why it matters:** A rootkit-grade zero-day paired with post-quantum (Kyber/ML-KEM) delivery against defense and aerospace targets is a sharp escalation — and it means the kernel-driver attack surface remains the state-sponsored escalation path of choice.

> No known mitigation; apply the August cumulative Windows updates first. Recovered rootkit sample dated July 7 → ~5 weeks of pre-patch exploitation.

[`🔗 CISA KEV catalog`](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) · [`🔗 Expel Patch Tuesday`](https://expel.com/blog/patch-tuesday-august-2026-expels-version/)

---

## 8. Rapid7 chained two SharePoint flaws into unauthenticated RCE — with an AI agent doing most of the digging

- **Velocity:** ▮▮ rising
- **Source:** The Hacker News · CVSS 9.1 + 8.1 · ~4d ago (~04:03 UTC+8)
- **Tags:** `sharepoint` `cve` `jwt` `rce` `ai-assisted`

Rapid7 disclosed a two-CVE chain that achieves **unauthenticated RCE** on on-prem SharePoint: **CVE-2026-55040** (CVSS 9.1) — a JWT validation bypass where `RequireSignedTokens=false` means `alg:none` tokens are accepted and the signing key resolves from an attacker-supplied `x5t` header — chained with **CVE-2026-63520** (CVSS 8.1), an unsafe .NET type instantiation in Business Connectivity Services. Rapid7 framed the work as an experiment in **AI-assisted exploit research**: 24 active days, 96 sessions, ~80,000 tool calls — with humans steering a model that "cheated" by replaying admin credentials. A PoC dropped Aug 11; Defused Cyber saw attackers probing it against honeypots within a day.

**Why it matters:** It's the clearest public data point yet on AI-compressed exploit development — and a caution that patching only one half of a chain leaves the other fully weaponizable, since Microsoft shipped the two fixes a month apart.

> SharePoint Online is unaffected; 8,500+ internet-facing on-prem servers tracked. Apply both July and August updates.

[`🔗 The Hacker News`](https://thehackernews.com/2026/08/attackers-exploit-sharepoint.html) · [`🔗 CSO Online`](https://www.csoonline.com/article/4187155/microsoft-says-web-enabled-ai-agents-can-trigger-host-level-rce.html)

---

## 9. Semantica — "graph-native infrastructure" that makes every AI decision auditable

- **Velocity:** ▮▮ rising
- **Source:** GitHub · 7.8k stars · ~1d ago (~20:03 UTC+8)
- **Tags:** `knowledge-graph` `accountability` `provenance` `agents` `governance`

**semantica-agi/semantica** (MIT) bills itself as "the open-source Palantir for AI agents": a deterministic layer that sits under an LLM/vector/agent stack and turns unstructured data into **typed knowledge graphs with full provenance**, so "what is connected, and why" is queryable. Its signature is **Decision Intelligence** — every AI decision becomes a first-class graph node with `record_decision()`, causal links, precedent search, and policy gates, exportable as W3C PROV-O/CSV for regulators — plus SHACL/OWL ontology constraints and polyglot storage (RDF4J, Neo4j, FalkorDB, Milvus…).

**Why it matters:** As agents move into finance, healthcare, and defense, "explainable" stops being optional. Semantica is the first framework to make accountability a *storage and reasoning primitive* rather than a log line bolted on afterward.

> v0.5.0 (May 2026) added an Ontology Hub and 12 security fixes; `pip install semantica`.

[`🔗 semantica-agi/semantica`](https://github.com/semantica-agi/semantica) · [`🔗 Trendshift`](https://trendshift.io/repositories/28205)

---

## 10. Needle 2 — a 14MB, 45M-param model that does single-shot tool calling on a Raspberry Pi

- **Velocity:** ▮▮ rising
- **Source:** GitHub · 5.9k stars · ~3d ago (~04:03 UTC+8)
- **Tags:** `edge-ai` `tiny-models` `tool-calling` `quantization` `on-device`

Cactus Compute's **needle** (MIT) is a foundation model for tiny devices, and **Needle 2** shrinks it further: 45M parameters in a **14MB binary** (2-bit quantization-aware training from the start) that runs a full session in ~28MB RAM, at 500 tok/s on a Raspberry Pi 5 and 300–1,500 tok/s on phones/wearables/VR. The architecture is a **Simple Attention Network** — the feed-forward layers (normally ~⅔ of parameters) are replaced with a fixed Walsh-Hadamard transform — and it's specialized for **single-shot function/tool calling** with byte-level grammar-constrained JSON decoding and confidence gating that escalates low-confidence calls to the cloud.

**Why it matters:** It's a concrete bet that most on-device "agent" work is just "turn a query into a typed tool call" — a narrow task a 14MB model can do privately and in milliseconds, no NPU or cloud round-trip required, beating 5–70× larger models on the benchmark.

> Pretrained on 115B tokens, post-trained on 38B; ~70 MFLOPs/token (7–85× cheaper than comparable small LLMs).

[`🔗 cactus-compute/needle`](https://github.com/cactus-compute/needle) · [`🔗 MarkTechPost`](https://www.marktechpost.com/2026/08/13/cactus-compute-needle-2-45m-parameter-tool-calling-model/amp/)

---

## 11. Paperclip — the "open-source OS for a zero-human company" closing in on 72k stars

- **Velocity:** ▮ steady
- **Source:** GitHub · 72.1k stars · ~2d ago (~12:03 UTC+8)
- **Tags:** `agents` `orchestration` `org-chart` `autonomy` `open-source`

**paperclipai/paperclip** (MIT, TypeScript) is an open-source platform for running a business as a team of AI agents — "if OpenClaw is an employee, Paperclip is the company." You bring your own agents (Claude, Codex, Cursor, Gemini CLI…) and arrange them in an **org chart** with goals, budgets, and governance; a **Heartbeat Engine** wakes agents on schedule to check/act/sleep with crash auto-recovery, per-agent budgets hard-stop runaway API costs, and work surfaces as tickets with a full immutable audit log. Humans sit as the "board" — approving hires and pausing agents.

**Why it matters:** It's the most literal realization yet of the agent-company pattern: an operating system where the UI is the org chart, not a form. Still "very, very early" (no sandboxing or multi-user), but the +21k-star first week signals real demand for the shape.

> ~72k stars, 668 releases; self-hostable, multi-company, one dashboard for costs and goals.

[`🔗 paperclipai/paperclip`](https://github.com/paperclipai/paperclip) · [`🔗 ZenML LLMOps DB`](https://www.zenml.io/llmops-database/open-source-agent-orchestration-platform-for-multi-agent-business-automation)

---

## 12. AutoDesign — a meta-harness that optimizes its own agentic workflow, beating Claude Design

- **Velocity:** ▮ steady
- **Source:** arXiv · ~3d ago (~04:03 UTC+8)
- **Tags:** `arxiv` `agentic-design` `harness` `benchmark` `self-optimization`

**AutoDesign** (arXiv:2608.13560) is a framework for **meta-harness optimization** in long-horizon agentic design — it doesn't just run a design task, it iteratively refines the harness (prompts/tool sequences) that does the task. On the authors' new **PosterBench** (100 papers across five disciplines, e.g. paper→poster), it scored **78.32**, beating the commercial Claude Design by **7.45 points**, and in a fully autonomous loop executed 253 tool calls and 11 edit turns in 40 minutes for **under $3** — reaching average conference-poster quality with the highest human preference in a system-blind study.

**Why it matters:** It flips the optimization target from "train a better model" to "evolve a better harness" — a cheap, model-agnostic lever — and PosterBench gives agentic-design work a benchmark that isn't saturated.

> Ships the 100-paper main track plus a 10-paper mini subset; paper-to-poster is the flagship task.

[`🔗 arXiv:2608.13560`](https://arxiv.org/abs/2608.13560) · [`🔗 PosterBench (thepaper.cn)`](https://www.thepaper.cn/newsDetail_forward_33778743)

---

## 13. book-to-skill — turn any technical book PDF into a Claude Code skill

- **Velocity:** ▮ steady
- **Source:** GitHub · 21.4k stars · ~2d ago (~12:03 UTC+8)
- **Tags:** `agent-skills` `claude-code` `knowledge` `pdf` `rag`

**book-to-skill** (virgiliojr94/Leutenegger) distills a technical book, folder, or paper collection into a structured **Agent Skill** (`SKILL.md` + per-chapter files + glossary + patterns + cheatsheet) that loads on demand in Claude Code, Copilot CLI, or Amp. It's compile-time extraction rather than query-time RAG: the author's named frameworks and decision rules become files the agent reads the relevant chapter from, so answers are grounded in your actual copy. Measured on real books it cut tokens **24–51×** versus dumping the text into context (a 400-page book ≈ 200K tokens → ~4K core + ~1K/chapter).

**Why it matters:** "Ground an agent in a specific book" is a recurring need (runbooks, ADRs, onboarding), and book-to-skill shows the Agent Skills format absorbing it — the difference between retrieval (fuzzy) and reasoning over extracted structure (deterministic).

> `/book-to-skill my-book.pdf`, then `/my-book ch05`; supports PDF/EPUB/DOCX/MOBI and more.

[`🔗 virgiliojr94/book-to-skill`](https://github.com/virgiliojr94/book-to-skill) · [`🔗 SkillsLLM`](https://skillsllm.com/skill/book-to-skill)

---

## 14. reverse-skill — a self-evolving router that steers coding agents through RE / pentest workflows

- **Velocity:** ▮ steady
- **Source:** GitHub · ~10.4k stars/wk · ~2d ago (~12:03 UTC+8)
- **Tags:** `reverse-engineering` `pentest` `agent-skills` `security` `routing`

**zhaoxuya520/reverse-skill** is a "Security Skill Router Pack" that fixes a real gap: coding agents don't know *which* tool (jadx, Frida, IDA, Ghidra, BurpSuite…) to reach for, so it adds a `MASTER-ROUTING` layer plus 42 skill modules (APK/iOS/binary/.NET reverse, malware/YARA, patch-diff, pwn-chain, EDR bypass, CTF) that route a task, **bootstrap the toolchain on demand**, and enforce a scope gate (`case-init`) before any target action. It self-evolves — skill weights and routing improve from usage logs — and ships 163 regression tests, CI-validated on Windows + Ubuntu.

**Why it matters:** Security workflows are exactly where agent hallucination is most dangerous, and reverse-skill is the most complete attempt to turn "guess commands" into a repeatable, evidence-chained methodology for the major coding clients.

> PowerShell-native (best on Windows); bootstrapping downloads external tools, so run it in a sandbox/VM.

[`🔗 zhaoxuya520/reverse-skill`](https://github.com/zhaoxuya520/reverse-skill) · [`🔗 SoFarBot`](https://www.sofarbot.com/zh/opensource/S8JmRKYw9eKF)

---

## 15. Soup — fine-tune an 8B model on a 4GB laptop GPU from a single YAML

- **Velocity:** ▮ steady
- **Source:** GitHub · Show HN · ~1w ago (~04:03 UTC+8)
- **Tags:** `fine-tuning` `lora` `cli` `gpu` `open-source`

**Soup** (MakazhanAlpamys, Apache-2.0) lowers the hardware floor for local fine-tuning: a single YAML drives SFT/DPO/KTO/ORPO and 20+ methods, and its headline **layer streaming** keeps the frozen base in system RAM while streaming one decoder layer at a time into the GPU — so an **8B model LoRA-finetunes on a 4GB laptop GPU** (119.6 tok/s at 3.32GB peak VRAM on an RTX 3050). Results are verified **bit-exact** against a resident-GPU reference across nine architectures as a CI test.

**Why it matters:** Fine-tuning has been gated by GPU memory; layer streaming proves the frozen base doesn't need to live in VRAM, moving 8B-scale tuning from "rent a datacenter GPU" to "run it on the laptop you have."

> BETA: transformers + plain LoRA only; GRPO/PPO excluded (generation re-reads every layer). Migrates Axolotl/LlamaFactory configs.

[`🔗 MakazhanAlpamys/Soup`](https://github.com/MakazhanAlpamys/Soup) · [`🔗 Gigazine`](https://gigazine.net/gsc_news/en/20260806-soup-fine-tune-llm)

---

## 16. code-graph-rag — query and edit a monorepo through a Tree-sitter knowledge graph

- **Velocity:** ▮ steady
- **Source:** GitHub · 4.3k stars · ~2d ago (~12:03 UTC+8)
- **Tags:** `rag` `knowledge-graph` `monorepo` `tree-sitter` `mcp`

**vitali87/code-graph-rag** (MIT) parses a multi-language monorepo with **Tree-sitter** into a single language-agnostic knowledge graph in Memgraph, then exposes a RAG layer that turns natural-language questions into **Cypher** queries and drives AI editing — with AST-based surgical patching, structural search/replace via ast-grep, dead-code detection from entry points, and new `FLOWS_TO` taint edges for C#/Java/C/Go. It runs as an **MCP server**, so Claude Code and other MCP clients can query and edit the codebase directly.

**Why it matters:** As coding agents hit large repos, flat embeddings stop being enough — a queryable *structure* graph (who-calls-what, data flow) is what lets an agent reason about impact before touching code. The MCP surface makes it a drop-in for any agent.

> Fully supports Python/TS/JS/Rust/Go/Java/C/C++/C#/PHP/Lua/Dart; `uv tool install code-graph-rag`.

[`🔗 vitali87/code-graph-rag`](https://github.com/vitali87/code-graph-rag) · [`🔗 DEV.co`](https://dev.co/ai/rag/code-graph-rag)

---

## 17. OpenAI ships a native ChatGPT desktop app for Linux — ChatGPT, Work, and Codex in one

- **Velocity:** ▮ steady
- **Source:** OpenAI · preview · ~5d ago (~04:03 UTC+8)
- **Tags:** `openai` `chatgpt` `linux` `codex` `desktop`

OpenAI released the first official **ChatGPT desktop app for Linux** (preview), bundling **ChatGPT, ChatGPT Work, and Codex** into a single Electron app and closing a two-year platform gap. Codex inside it can read local projects, edit code, run commands, and review PRs — with its own view and history — under GPT-5.6. Launch support covers **Ubuntu 24.04/26.04, Debian 13, and Fedora 43/44** (x64 + ARM64, `.deb`/`.rpm`); Arch/NixOS aren't officially listed, and **Computer Use isn't available on Linux** in the same form as macOS/Windows.

**Why it matters:** It completes OpenAI's "one client on every OS" consolidation — and lands a full coding agent onto developer Linux boxes, which is exactly why IT teams are being told to review its filesystem/command permissions before connecting it to real repos.

> Early feedback flags Wayland, input-method, and CLI-↔-desktop sync issues; preview has no GA date.

[`🔗 TechRepublic`](https://www.techrepublic.com/article/news-openai-chatgpt-codex-linux-desktop-preview/) · [`🔗 ZDNet`](https://www.zdnet.com/article/openai-brings-the-chatgpt-desktop-app-to-linux/)

---

## 18. DreamX-Phi 1.0 — a video world model that wins WorldArena 2.0 by nailing geometry, not just realism

- **Velocity:** ▮ steady
- **Source:** arXiv · ~3d ago (~04:03 UTC+8)
- **Tags:** `world-model` `robotics` `video-generation` `arxiv` `manipulation`

**DreamX-Phi 1.0** (arXiv:2608.13489, AMAP-ML) is an action-conditioned video world model for robotic manipulation: given an RGB frame, a language instruction, and a bimanual SE(3) action sequence, it predicts the resulting video. Its thesis is that realism isn't faithfulness — so it injects per-arm **SE(3) geometric encodings directly into attention** (PRoPE-style), adds a depth branch and SAM3/V-JEPA masks for object permanence, and distills the multi-step Wan2.2-TI2V-5B generator into a few-step student. It took **first place on Track 1 (video prediction)** and second on Track 2 of the **WorldArena 2.0 Challenge**.

**Why it matters:** World models are the bet for sample-efficient robot learning, but a rollout that *looks* right while moving the wrong arm is worse than useless — DreamX-Phi's "geometric prescription" is a concrete answer to the faithfulness gap.

> Code (AMAP-ML/DreamX-Phi) was promised after the challenge; reproduction is multi-day compute.

[`🔗 arXiv:2608.13489`](https://arxiv.org/abs/2608.13489) · [`🔗 OpenTrain`](https://www.opentrain.ai/papers/dreamx-phi-1-0-action-conditioned-video-world-model-for-robotic-manipulation--arxiv-2608.13489/)

---

## 19. watchTowr turns a Citrix NetScaler heap overflow into the first public pre-auth RCE in three years

- **Velocity:** ▮▮▮ trending
- **Source:** watchTowr Labs · PoC released · ~1d ago (~12:03 UTC+8)
- **Tags:** `citrix` `netscaler` `cve` `saml` `pre-auth-rce`

watchTowr Labs published "You're Back In The Room," a full write-up plus PoC for **CVE-2026-8452**, a heap overflow in the SAML canonicalization path of **Citrix NetScaler ADC/Gateway** (`nsppe`). An oversized `<ds:SignedInfo>` `PrefixList` overflows a fixed-size buffer and corrupts an adjacent heap chunk's data pointer, yielding a write-what-where primitive — and because NetScaler ships non-PIE with an executable heap, the researchers turned it into **unauthenticated RCE as root**, dropping a PHP webshell at `/vpn/theme/x.php` and disabling the pitboss watchdog's signal handlers to survive reboots. It's the first public NetScaler pre-auth RCE since **CVE-2023-3519** (2023).

**Why it matters:** Citrix's June 30 bulletin described this only as a memory overflow leading to "unpredictable behavior" — the unpredictable part turned out to be reliable root code execution on a network-edge appliance that ransomware and state-sponsored actors have hit for years. Reachable when SAML SP/IdP (or Gateway/AAA vServer) is configured; there is no workaround — upgrade to 14.1-72.61 / 13.1-63.18.

> All PoC offsets are hardcoded for NetScaler 13.1-30.52; JPCERT/CC reported no confirmed in-the-wild exploitation as of Aug 15.

[`🔗 watchTowr PoC repo`](https://github.com/watchtowrlabs/watchTowr-vs-Citrix-Netscaler-PreAuth-RCE-CVE-2026-8452) · [`🔗 JPCERT/CC alert`](https://www.jpcert.or.jp/at/2026/at260024.html)

---

## 20. MindsDB Minds Platform ships an unauthenticated, prompt-injectable RCE — CVSS 10.0, no patch yet

- **Velocity:** ▮▮▮ trending
- **Source:** IONIX · CVSS 10.0 · ~1d ago (~12:03 UTC+8)
- **Tags:** `mindsdb` `cve` `prompt-injection` `rce` `ai-agents`

**CVE-2026-73678** is a maximum-severity flaw in **MindsDB Minds Platform** (≤26.1.0): the `POST /api/v1/responses/` endpoint has no authentication check, and a "bring-your-own-key" chain lets an attacker first register their own LLM API key via the unauthenticated `PUT /api/v1/settings/` endpoint, then submit a prompt that drives the built-in **Anton** agent's scratchpad tool to run attacker-influenced Python through a bare `exec()` with no sandboxing. The result is arbitrary OS command execution with the app's privileges — SSH keys, stored credentials, and environment secrets included. Overly permissive CORS (`allow_origins=["*"]` + `allow_credentials=True`) also enables browser-based exploitation.

**Why it matters:** It's the sharpest example yet of the new vulnerability class at the AI/agent boundary, where the *agent* is the attack surface and the injection target is the model's code-execution tool rather than a web form. At disclosure there was **no patched release** (fixes only on dev branches), so mitigation is network/agent hardening, not an update.

> Researcher: Ho Viet Khanh (HK4zCzi); public PoCs exist; advisory GHSA-jcxw-h8ph-pxpv.

[`🔗 IONIX advisory`](https://www.ionix.io/threat-center/cve-2026-73678/) · [`🔗 VulnCheck advisory`](https://www.vulncheck.com/advisories/mindsdb-minds-platform-unauthenticated-rce-via-scratchpad-exec)

---

## 21. Meta returns to open weights with Muse Glimmer — a 30B local agent model under Apache 2.0

- **Velocity:** ▮▮ rising
- **Source:** Artificial Analysis · ~3d ago (~04:03 UTC+8)
- **Tags:** `meta` `muse-glimmer` `open-weights` `on-device` `agents`

Meta released **Muse Glimmer**, a ~30B dense multimodal model (plus a ~2B ViT vision encoder) under **Apache 2.0** — Meta's first open-weights release since Llama 4 (April 2025) and its most permissive license yet. Distilled from the closed **Muse Spark** flagship via logit distillation with agent-heavy mid-training and RL post-training, it targets always-on local agents: 131K context, 100+ languages, and **DFlash speculative decoding** for up to 3.1× faster generation (74.9→233.4 tok/s on an RTX 5090). 4-bit GGUF builds run in 17–20GB, fitting a single 24GB consumer GPU.

**Why it matters:** It's Meta's explicit pitch for "personal superintelligence" that runs offline — open weights as the privacy/sovereignty answer just as local agent runtimes (Ollama, llama.cpp, MLX) mature. Artificial Analysis rates it 44 on the Openness Index, ahead of most open models, though Meta's benchmark wins (vs Gemma4-31B, Qwen3.6-27B) are vendor-reported.

> Meta's own framework classifies it as not "frontier AI"; its 28.4% prompt-injection success rate is weaker than Gemma4-31B's 25.6%.

[`🔗 Artificial Analysis`](https://artificialanalysis.ai/articles/muse-glimmer) · [`🔗 InfoQ`](https://www.infoq.com/news/2026/08/meta-muse-glimmer/)

---

## 22. Xiaohongshu open-sources dots3-note — a 280B MoE built for long-horizon agent tasks

- **Velocity:** ▮▮ rising
- **Source:** GitHub · ~2d ago (~12:03 UTC+8)
- **Tags:** `xiaohongshu` `dots3` `moe` `open-weights` `long-horizon`

Xiaohongshu's Dots Model Lab open-sourced **dots3-note preview** (Apache 2.0), a 280B-total / 16B-active **Mixture-of-Experts** model with a 512K context window over text, image, video, and audio input. It's tuned for open-ended **long-horizon agent tasks** (travel planning, store operations, home renovation) via a new RL method Dots calls **TEMPO**, with a same-series model (dots-note-3.0) having scored a perfect **42/42 at the IMO**. On **Terminal-Bench 2.1** it posts 75.1 — 4.9 points above the top US open-weight model per a SemiAnalysis chart — and Huawei announced Ascend 0-day adaptation the same day.

**Why it matters:** It's the first open release from a major Chinese consumer platform's in-house lab and a concrete push on the *agent-native* axis (long-horizon, environment memory, self-correction) rather than raw benchmark saturation. Weights are on Hugging Face/ModelScope with native vLLM/SGLang support.

> Deploys on a single 8-card node (FP8); demos include clearing all 6 ARC-AGI-3 levels using a self-updating "memory.md" notepad.

[`🔗 studio-dots-ai/dots3-note-prev`](https://github.com/studio-dots-ai/dots3-note-prev) · [`🔗 36Kr`](https://eu.36kr.com/en/p/3938759517896072)

---

## 23. A solo dev used Codex to squeeze a 232× faster GPU QR kernel — and placed 12th of 183

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 373 pts · ~1d ago (~12:03 UTC+8)
- **Tags:** `codex` `auto-research` `gpu` `cuda` `agents`

Sankalp's "Auto-research with codex" topped HN with a write-up of the GPU Mode / Core Automation auto-research contest: optimize a batched compact-Householder QR factorization to match `torch.geqrf`. Running a benchmark→profile→research→improve loop with Codex, Modal GPUs, and a "beam of candidates" to escape local maxima, he cut runtime from ~419,000µs to 1,805µs (**232×**) over 14 days and 1,500+ submissions — for **12th of 183**. The decisive move was algorithmic — blocked Householder with WY representation, turning serial reflector updates into tensor-core GEMMs — not just kernel tuning.

**Why it matters:** It's a candid, data-rich case study of what agentic research is good at (intense search within an algorithmic frame) and where it still loses: the #1 entry used a CholeskyQR-Householder hybrid that was ~48% faster, a genuinely different idea. Domain expertise accelerated harness design and human steering.

> The author notes he didn't exploit input distributions or Blackwell's tcgen05 instructions, and regrets not adopting beam search from the start.

[`🔗 Sankalp's write-up`](https://sankalp.bearblog.dev/autoresearch/) · [`🔗 Hacker News`](https://news.ycombinator.com/item?id=49309549)

---

## 24. uBlock Origin concedes the Facebook ad-blocking war, marks Sponsored posts "wontfix"

- **Velocity:** ▮ steady
- **Source:** hardwareluxx · ~2d ago (~04:03 UTC+8)
- **Tags:** `adblocking` `ublock-origin` `facebook` `open-source` `cat-and-mouse`

The uBlock Origin maintainers announced they're **ending dedicated Facebook ad-blocking**, marking the platform's filters "wontfix" after years of escalation: Facebook scatters the word "Sponsored" letter-by-letter across code, inserts invisible fake characters, and continuously regenerates element names to defeat pattern-matching filters. The team — unusually blunt, calling Facebook a "disgusting, anti-user website" — said the maintenance burden is no longer sustainable for a volunteer project, with Google's Manifest V3 and Edge already having crippled the extension.

**Why it matters:** It's the most visible data point yet that client-side ad-blocking is losing to platform-side obfuscation-as-a-service, pushing the open-web community toward alternative filter lists — or simply abandoning hostile sites. Existing filters keep working until Facebook's next code change breaks them.

> Firefox and Brave still support uBlock Origin; tracker blocking on Facebook remains unaffected.

[`🔗 racunalniske-novice`](https://www.racunalniske-novice.com/en/facebook-is-too-tough-a-nut-to-crack-ublock-origin-has-given-up/) · [`🔗 hardwareluxx`](https://www.hardwareluxx.de/index.php/news/software/browser-und-internet/70010-ublock-origin-gibt-auf-facebook-werbung-wird-kuenftig-nicht-mehr-gezielt-blockiert.html)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-08-16T12:03:00Z |
| Items | 24 |
| Sources tracked | 35 (GitHub, Prime Intellect, The Hacker News, SOCRadar, Anthropic, Simon Willison, 4sysops, Cloudflare Blog, Manila Times, CISA KEV, Expel, CSO Online, Trendshift, MarkTechPost, ZenML, arXiv, thepaper.cn, SkillsLLM, SoFarBot, Gigazine, DEV.co, TechRepublic, ZDNet, OpenTrain, watchTowr Labs, JPCERT/CC, IONIX, VulnCheck, Artificial Analysis, InfoQ, 36Kr, Hacker News, sankalp.bearblog.dev, racunalniske-novice, hardwareluxx) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[Previous day](../2026-08-15/) · [Raw .md](../2026-08-16.md) · [Archive](../../archive/)
