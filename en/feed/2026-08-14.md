---
date: 2026-08-14
updated: 2026-08-14T20:03:00Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 23
license: CC-BY-4.0
---

# trending.md — Dense Trending Signals

Machine-readable trending information. Ranked by **velocity** — how fast attention is shifting.
Built for AI agents. Readable by humans.
→ Raw feed: [`/en/feed/latest.md`](/en/feed/latest.md)
→ Archive: [`/en/feed/`](/en/feed/)

---

## 1. Alibaba open-sources Qwen3.8-2.4T-A95B — its first Qwen-Max-class flagship with 2.4T parameters

- **Velocity:** ▮▮▮ trending
- **Source:** Hugging Face · 2.4T params · ~1d ago
- **Tags:** `alibaba` `qwen` `open-weights` `moe` `llm`

Alibaba's Qwen team released open weights for **Qwen3.8-2.4T-A95B** — the first time a Qwen-Max-class (flagship) model has been fully open-sourced. It's a fine-grained Mixture-of-Experts with **2.4 trillion total parameters (~95B active)**, 512 experts per layer (10 routed + 1 shared), a hybrid Gated-DeltaNet + Gated-Attention architecture, and multi-token-prediction training. Native context is 262K tokens, extensible to ~1M; the open build is text-only with thinking forced on. Self-reported benchmarks: Terminal-Bench 2.1 at 86.6, PaperBench 93.0, GPQA Diamond 92.6, SWE-bench Pro 67.7. Weights (~4.9TB BF16) land on Hugging Face and ModelScope under a custom Qwen3.8-Max license.

**Why it matters:** This closes the open-vs-closed gap at the very top of the capability curve — a downloadable Qwen-Max-class model shifts fine-tuning and self-hosting economics for teams that previously could only call Alibaba's API, and extends 2026's pattern of Chinese labs shipping frontier-scale open weights while US labs ship smaller, faster models.

> Text-only · thinking cannot be disabled · deployable via vLLM/SGLang/TokenSpeed, or on a full NVIDIA GB300 NVL72 rack at 4,000+ tok/s per GPU in FP8.

[`🔗 Hugging Face`](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B) · [`🔗 NVIDIA Technical Blog`](https://developer.nvidia.com/blog/serve-qwen3-8-2-4t-a95b-a-2-4t-parameter-model-with-configurable-reasoning-on-nvidia-gb300-nvl72/)

---

## 2. DeepSeek open-sources Harness — an "everything is a plugin" agent framework to rival Claude Code

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub · 38.9k stars · ~18h ago
- **Tags:** `deepseek` `agents` `plugin-architecture` `typescript` `cli`

DeepSeek released the developer preview of **DeepSeek Harness** (v0.1, MIT), a coding-and-office agent framework built on the **Cordis** plugin system. Models, tools, skills, sessions, sandboxes, storage, scheduling, and UI are all composable plugins — developers extend or replace capabilities at the configuration layer without touching the harness core. Four run modes ship (Standard, PTC programmatic tool-calling, Minimal, and Create), with append-only session logs and a Trajectory view supporting resume, fork, retrieve, and replay. Run it via `npx @deepseek-ai/dsh web`.

**Why it matters:** DeepSeek is extending its "cheap frontier models" play into the harness layer, directly targeting OpenAI Codex and Claude Code. "Everything is a plugin" also mirrors 2026's broader shift toward composable agent runtimes instead of monolithic CLIs — and DeepSeek is open-sourcing the whole stack.

> Developer preview — compatibility-breaking changes expected · 12k+ commits · plugin discovery via the `dsh-plugin` topic.

[`🔗 deepseek-ai/deepseek-harness`](https://github.com/deepseek-ai/deepseek-harness) · [`🔗 DoNews`](https://www.donews.com/news/detail/1/6670452.html)

---

## 3. CVE-2026-72898 — CVSS 10.0 SQL injection in Metabase under active exploitation; CISA deadline today

- **Velocity:** ▮▮▮ trending
- **Source:** Bishop Fox · CVSS 10.0 · ~3d ago
- **Tags:** `cve` `sql-injection` `metabase` `kev` `cvss-10`

An unauthenticated SQL injection (CVSS 10.0) in Metabase's `POST /api/session/reset_password` endpoint lets any remote attacker inject arbitrary SQL into the application database and seize full admin control — including the standing credentials Metabase holds to every connected warehouse (Snowflake, BigQuery, Databricks, etc.). Metabase disclosed it as a zero-day on Aug 6 with active exploitation confirmed; CISA added it to the Known Exploited Vulnerabilities catalog on Aug 11 with a federal remediation deadline of **Aug 14 (today)**. Fixed in branch releases (x.58.24+, x.59.21+, x.60.17+, x.61.11+, x.62.9+, x.63.5+); temporary workaround is blocking the password-reset endpoint.

**Why it matters:** A BI tool holding live credentials to production data stores is the ideal pivot point — one injected query can cascade into every connected database. With ~2,500 internet-exposed instances and public PoCs circulating, unpatched self-hosted deployments are a sitting target, and patching alone doesn't remediate prior compromise.

> Affects self-hosted x.58–x.63 branches; versions below x.58 unaffected · Metabase Cloud already patched.

[`🔗 Bishop Fox`](https://bishopfox.com/blog/critical-sql-injection-in-metabase-via-password-reset-cve-2026-72898) · [`🔗 CISA KEV`](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)

---

## 4. Cline ships Kanban — a local multi-agent scheduler where every card runs in its own git worktree

- **Velocity:** ▮▮ rising
- **Source:** GitHub · 1.3k stars · ~1d ago
- **Tags:** `cline` `multi-agent` `worktree` `orchestration` `cli`

Cline released **Kanban** (Apache 2.0, research preview), a local web board that runs CLI coding agents in parallel against one repo. Each task card spins up an ephemeral git worktree — sharing git-ignored files like `node_modules` via symlinks — so agents work side-by-side without merge conflicts. Cards can be linked into dependency chains, and combined with auto-commit/auto-PR toggles they form autonomous pipelines; a built-in review loop sends inline diff comments back to the agent. It auto-detects your installed CLI agent (Cline, Claude Code, Codex, OpenCode) and runs fully local via `npx kanban`.

**Why it matters:** Worktree-per-task is becoming the standard isolation primitive for parallel agent orchestration (Cline CLI v3.0.3 also added a `--worktree` flag). Kanban turns that primitive into a point-and-click control plane for a fleet of coding agents on a single codebase.

> Research preview — uses experimental CLI-agent features like bypassing permissions and runtime hooks for more autonomy.

[`🔗 cline/kanban`](https://github.com/cline/kanban) · [`🔗 Cline Docs`](https://docs.cline.bot/usage/kanban)

---

## 5. Ponytail — the "laziest senior dev" agent skill — corrects its own benchmark after a challenge

- **Velocity:** ▮▮ rising
- **Source:** GitHub · 82k stars · ~1d ago
- **Tags:** `agent-skills` `yagni` `benchmark` `claude-code` `codegen`

**Ponytail** (github.com/DietrichGebert/ponytail) injects a seven-rung "decision ladder" into coding agents — check whether the thing needs to exist, already exists, or is a stdlib/native one-liner before writing the minimum that works ("the best code is the code you never wrote"). Its original "80–94% code reduction" claim drew a challenge from Scott Logic's Colin Eberhardt, who showed a bare "Follow YAGNI principles" prompt beat it on that benchmark. The author rebuilt the benchmark against a fair agentic baseline — headless Claude Code editing a real FastAPI/React repo across twelve feature tickets — and publicly revised the claim to **~54% less code** on average, ~20% lower cost, ~27% faster execution.

**Why it matters:** Beyond one skill, this is a template for the whole agent-skills category, which is proliferating with no evaluation standard. Ponytail's response — a public behavioral test framework and reproducible benchmark — sets the expectation that a skill proves its claims rather than asserting them.

> The author flagged the earlier figure as "a per-task ceiling misreported as an average" — Eberhardt called the correction "really happy."

[`🔗 DietrichGebert/ponytail`](https://github.com/DietrichGebert/ponytail) · [`🔗 InfoQ`](https://www.infoq.com/news/2026/08/ponytail-agent-skill-benchmark/)

---

## 6. CVE-2026-63077 — unauthenticated RCE in JetBrains TeamCity's agent polling protocol, exploited in the wild

- **Velocity:** ▮▮ rising
- **Source:** Rapid7 · CVSS 9.8 · ~1w ago
- **Tags:** `cve` `teamcity` `ci-cd` `rce` `kev`

A CVSS 9.8 unauthenticated remote code execution in **JetBrains TeamCity On-Premises**, rooted in unsafe deserialization in the build-agent polling protocol — which shares a network interface with the main web UI, so any internet-facing server is directly reachable. An attacker registers a temporary agent, submits a serialized XStream gadget chain to the agent command endpoint, drops a polyglot SQL/JSP webshell, and executes OS commands. Disclosed July 27 and added to CISA's KEV catalog Aug 5 after exploitation began; Rapid7 released a PoC and mass-exploitation tooling has since circulated. Fixed in **2025.11.7** and **2026.1.3**, or via a patch plugin for 2017.1+.

**Why it matters:** TeamCity fronts source repos, CI secrets, and deploy pipelines — RCE there is a supply-chain-grade foothold. Censys observed ~4,500 exposed instances with only ~450 confirmed patched, making this a persistent soft target for CI/CD compromise.

> Attack chain: register agent → XStream deserialization → HSQLDB `SCRIPT` writes a JSP webshell → anonymous GET executes `Runtime.exec()`.

[`🔗 Censys`](https://censys.com/advisory/cve-2026-63077/) · [`🔗 Rapid7 PoC (sfewer-r7)`](https://github.com/sfewer-r7/CVE-2026-63077)

---

## 7. Turso runs unmodified Doom as a SQL query — SQLite's VDBE as "the LLVM of databases"

- **Velocity:** ▮ steady
- **Source:** Turso Blog · PoC demo · ~1d ago
- **Tags:** `sqlite` `rust` `bytecode` `database` `llvm`

Turso — the team rewriting SQLite in Rust (**Limbo**) — got unmodified Doom running as a **VDBE bytecode program**. A custom LLVM backend (`vdbecc`) compiles C → LLVM IR → SQLite bytecode; the entire C address space is one BLOB in a single row (loads/stores via `BlobRead`/`BlobWrite`), and the framebuffer streams out as one long-running query — `SELECT * FROM doom`. Controls are bind parameters ("Doom's input handler is a `WHERE` clause"), and saving the game is saving the database. A differential test confirmed the framebuffer is byte-for-byte identical to a native clang build.

**Why it matters:** It's a proof that SQLite's bytecode VM is a viable compilation target for arbitrary programs, not just SQL — positioning the rewrite as a shared substrate other databases can be built on, starting with a reimagined Postgres.

> No register allocation needed — the VDBE register file is unbounded, so each SSA value gets its own permanent register.

[`🔗 Turso Blog`](https://turso.tech/blog/running-unmodified-doom-in-the-sqlite-bytecode-language) · [`🔗 tursodatabase/limbo`](https://github.com/tursodatabase/limbo)

---

## 8. LoopX — an open control plane that keeps long-running AI agent teams on durable state

- **Velocity:** ▮ steady
- **Source:** GitHub · 4.6k stars · ~1w ago
- **Tags:** `agents` `control-plane` `kanban` `state-kernel` `python`

**LoopX** (MIT) is a provider-neutral "state kernel" for long-running agent teams: it keeps objectives, typed todos, claims/leases, evidence logs, quota-aware auto-wake, and verifiable handoffs stable while Codex, Claude Code, or Cursor execute bounded turns. It is explicitly *not* a runtime — it answers "may the loop continue?" and projects into a Kanban (e.g. a Lark/Feishu adapter) that is never the source of truth. State is local-first in a `.loopx/` directory with no dependencies beyond the Python standard library; dangerous permissions and production writes stay human-gated. Maintained by a ByteDance engineer with English + Chinese docs and courses.

**Why it matters:** As agent runs stretch from minutes to days, the missing layer is durable state and human gates across turns — not another runtime. LoopX's "board is a projection, kernel is truth" model is a clean answer to agent drift on multi-day, multi-agent work.

[`🔗 huangruiteng/loopx`](https://github.com/huangruiteng/loopx) · [`🔗 Moclaw Blog`](https://moclaw.ai/blog/what-is-loopx)

---

## 9. HL-Gauss PPO — swapping the critic's scalar head for a categorical predictor (COLM 2026)

- **Velocity:** ▮ steady
- **Source:** arXiv · COLM 2026 · ~2d ago
- **Tags:** `reinforcement-learning` `ppo` `rlvr` `research` `arxiv`

**"Start Classifying: Categorical Critics for LLM Reinforcement Learning"** (arXiv 2608.02181, accepted at COLM 2026) replaces the scalar MSE critic in PPO with a categorical predictor trained against Gaussian-smoothed HL-Gauss targets, decoded back to a scalar so the actor update stays unchanged — a drop-in critic swap. On RL with verifiable rewards, where rewards are sparse and binary and small value errors distort the advantages PPO relies on, HL-Gauss PPO consistently beats strong PPO and DAPO baselines across math reasoning, tool-augmented math, and Search-R1 on Qwen2.5/Qwen3 backbones, with better calibration and lower-variance advantages.

**Why it matters:** RLVR is the engine behind frontier reasoning models, and its critic is the weakest calibrated component. A critic head that improves stability and calibration with zero actor changes is a cheap, transferable win for post-training pipelines.

[`🔗 arXiv`](https://arxiv.org/abs/2608.02181) · [`🔗 ZhijianZhou/HL-guass-ppo`](https://github.com/ZhijianZhou/HL-guass-ppo)

---

## 10. CVE-2026-73240 — CVSS 9.8 git argument injection in Apache Allura enables unauthenticated RCE

- **Velocity:** ▮ steady
- **Source:** IONIX · CVSS 9.8 · ~1d ago
- **Tags:** `cve` `apache` `git` `rce` `command-injection`

A critical argument-injection flaw (CWE-88, CVSS 9.8) in **Apache Allura** — the forge software behind SourceForge — passes attacker-controlled input into underlying `git` command invocations without sanitization, letting unauthenticated remote attackers inject arguments and run arbitrary commands with the host's privileges. All versions before **1.19.1** are affected; upgrading to 1.19.1 (plus the documented configuration and database migration steps) is required.

**Why it matters:** Git argument injection is a recurring, high-blast-radius bug class in any forge or SCM tool that shells out to git. For self-hosted Allura deployments, this is a full-compromise RCE with no authentication required — patch immediately.

[`🔗 IONIX`](https://www.ionix.io/threat-center/cve-2026-73240/) · [`🔗 NVD`](https://nvd.nist.gov/vuln/detail/CVE-2026-73240)

---

## 11. Cl0p claims mass data theft from ~50 firms via PTC Windchill RCE (CVE-2026-12569)

- **Velocity:** ▮▮▮ trending
- **Source:** SecurityWeek · CVSS 9.8 · ~1d ago
- **Tags:** `cve` `rce` `ransomware` `cl0p` `kev` `supply-chain`

Russia-linked ransomware group **Cl0p** publicly claimed it stole data from nearly 50 companies — including **Shell, Philips, GE, and Fiserv** — in one coordinated campaign exploiting **CVE-2026-12569**, a critical (CVSS 9.8) unauthenticated RCE rooted in unsafe deserialization in **PTC Windchill PDMLink and FlexPLM** (fixed in 11.0 M030). The intrusion chains a pre-auth information-disclosure in the FlexPLM WSDL endpoint with the Windchill login-servlet deserialization flaw to drop hex-named JSP webshells and exfiltrate engineering and design data. PTC patched June 17 and CISA added the CVE to KEV June 25; extortion emails began hitting victims July 19–20, and Cl0p went public on Aug 13.

**Why it matters:** This is the MOVEit playbook repeated — Cl0p targets a widely deployed enterprise product (PLM software used across manufacturing, automotive, aerospace, and retail) with a 1-day flaw and mass-extorts the supply chain. Cl0p claims ~89 GB from Shell and ~13.5 GB from Philips (still unverified), and the payload is product designs and engineering IP, not just PII.

> Victims span ~50 orgs; Ransom-ISAC warned as early as July that Cl0p was exploiting the flaw, with extortion notices dating to July 19–20.

[`🔗 SecurityWeek`](https://www.securityweek.com/ptc-windchill-vulnerability-exploited-in-ransomware-campaign/) · [`🔗 Wiz Threat Center`](https://threats.wiz.io/all-incidents/cl0p-exploitation-of-ptc-windchill-and-flexplm-vulnerability)

---

## 12. Vercel open-sources deepsec — an agent-powered security harness that investigates real vulns

- **Velocity:** ▮▮▮ trending
- **Source:** Vercel Blog · 6.5k stars · ~1d ago
- **Tags:** `security` `agents` `vercel` `appsec` `scanner`

Vercel Labs released **deepsec** (Apache 2.0), a security harness that turns vulnerability discovery into a multi-stage agent pipeline: a regex-only static scan surfaces security-sensitive candidates, coding agents (**Claude Opus 4.7** and **Codex GPT-5.5** at maximum reasoning) trace data flows and check for mitigations, a revalidation pass cuts the false-positive rate to ~10–20%, and git metadata enriches findings with the responsible authors. It runs entirely on your own infrastructure — source code never leaves — and fans out across up to 1,000+ concurrent Vercel Sandboxes for monorepos, with idempotent/resumable runs.

**Why it matters:** This is appsec moving from signature matching to agentic investigation — early adopters (Unkey, dub.co) call it the most thorough scanner they've used with a good true-positive rate. It also shows the "harness" pattern from DeepSeek and Cline being applied to security, at the cost of real compute (large scans can run into tens of thousands of dollars).

> Runs with shell access like a coding agent, so Vercel warns against pointing it at untrusted source (prompt-injection risk); use a sandbox.

[`🔗 Vercel Blog`](https://vercel.com/blog/introducing-deepsec-find-and-fix-vulnerabilities-in-your-code-base) · [`🔗 vercel-labs/deepsec`](https://github.com/vercel-labs/deepsec)

---

## 13. Anthropic's official Agent Skills repo — the 169k-star canonical home of the format — tops trending

- **Velocity:** ▮▮ rising
- **Source:** GitHub · 169k stars · ~1d ago
- **Tags:** `anthropic` `agent-skills` `spec` `claude` `plugins`

**anthropics/skills** is Anthropic's official public repository for Agent Skills — the "folder of instructions" format it created, specified at agentskills.io. The repo holds the spec, a reusable skill template, and the reference skills: the source-available **document skills** (`docx`, `pdf`, `pptx`, `xlsx`) that power Claude's document editing in production, plus `skill-creator`, `mcp-builder`, and `artifacts-builder`. In Claude Code it installs as a plugin marketplace (`/plugin marketplace add anthropics/skills`).

**Why it matters:** As the agent-skills ecosystem explodes — google/skills, addyosmani/agent-skills, and Ponytail all trended this week — Anthropic's repo is the reference implementation every other skill library is measured against, and at 169k stars it has become the de-facto canonical home of the format.

> The document skills are source-available (not OSI open source), shared as reference for complex production skills; the rest are Apache 2.0.

[`🔗 anthropics/skills`](https://github.com/anthropics/skills) · [`🔗 agentskills.io`](https://agentskills.io/)

---

## 14. ego-lite — a browser where you and your AI agents work in parallel on your real logins

- **Velocity:** ▮▮ rising
- **Source:** GitHub · 10.1k stars · ~1d ago
- **Tags:** `browser` `agents` `automation` `chromium` `macos`

**ego-lite** (CitroLabs, MIT) is a Chromium-based browser built so humans and AI agents share one browser without fighting over tabs: it migrates your existing Chrome data (logins, cookies, extensions) once, then gives each agent an isolated in-process "Space" while you keep browsing up front. Instead of a command-per-action loop, agents call JavaScript functions through an `ego-browser` skill layer — composing multi-step tasks into a single script — and page snapshots are compressed from ~30,000 tokens to ~200–400 via the Chromium accessibility tree. The README claims up to **2.5× faster** complex workflows than CLI browser approaches.

**Why it matters:** Browser automation is the highest-friction part of agentic work because agents either share your session or start logged-out. ego-lite's "same logged-in state, isolated space" model is a concrete answer to the login wall that blocks most real-world agent browsing, using ~94% less memory than separate browser instances.

> macOS-only for now (Windows/Linux on the roadmap); browsing data stays on-device.

[`🔗 citrolabs/ego-lite`](https://github.com/citrolabs/ego-lite) · [`🔗 dev.to review`](https://dev.to/andrew-ooo/ego-lite-review-a-browser-your-ai-agents-can-share-2afi)

---

## 15. holaOS — an open-source local-first workspace where Claude Code and Codex share one brain

- **Velocity:** ▮▮ rising
- **Source:** GitHub · 6.9k stars · ~1d ago
- **Tags:** `agents` `workspace` `memory` `local-first` `electron`

**holaOS** (Holaboss) is an open-source, local-first "AI agent workspace" that runs Claude Code, Codex, or its own built-in agent side-by-side over shared memory, tools, files, and a real browser. The differentiator is **memory as plain-text files** on disk — readable, editable, and shared across agents and sessions — plus a "correction-as-rule" mechanism that turns every fix you make into a durable rule. It ships with frontier models (Kimi K3, GLM 5.2, GPT 5.6, Claude Opus 5, Fable 5) or BYOK, 100+ integrations, MCP support, and "HolaApps" that embed live UIs beside the agent.

**Why it matters:** Agent context fragmentation is the core pain holaOS targets — giving a team's agents durable, inspectable shared state in a local format rather than a cloud black box. "Memory as files" is a strong debuggability and trust choice, though the memory format's portability will determine whether it stays an open standard or a holaOS lock-in.

> Beta — one-line install via curl; macOS is the clearest path today.

[`🔗 holaboss-ai/holaOS`](https://github.com/holaboss-ai/holaOS) · [`🔗 holaOS Docs`](https://www.holaos.ai/docs/getting-started/workspaces)

---

## 16. OneDayAgent — a long-horizon harness sets SOTA on the AgentIF-OneDay benchmark

- **Velocity:** ▮ steady
- **Source:** arXiv · 2608.05013 · ~1d ago
- **Tags:** `agents` `long-horizon` `benchmark` `research` `arxiv`

**OneDayAgent** (arXiv 2608.05013, Zhejiang University + Ant Group) is a long-horizon harness for autonomous agents handling open-ended everyday requests across work, study, and life. It decomposes requests into bounded subtasks, maintains execution memory under context pressure, and verifies-and-repairs the final deliverable — and scores **0.821 on AgentIF-OneDay** (104 real-world tasks, 767 binary rubric points), beating AutoClaw (0.799), Codex GPT-5.5 (0.664), Manus (0.645), and ChatGPT-Agent (0.626). The same harness transfers across five backend models with no tuning; code and all execution trajectories are open.

**Why it matters:** Long-horizon autonomy — not single-shot coding — is where agent products now compete, and OneDayAgent's decomposition + memory + verify loop is a clean, reproducible recipe for the drift and state-loss failures that still sink multi-step agents.

> Ablations: decomposition and verify each add ~3.3 points; verify-and-repair is the most time-efficient fix per point.

[`🔗 arXiv`](https://arxiv.org/abs/2608.05013) · [`🔗 xbench-ai/AgentIF-OneDay`](https://github.com/xbench-ai/AgentIF-OneDay)

---

## 17. modly — a local, open-source desktop app that turns any photo into a 3D model on your GPU

- **Velocity:** ▮ steady
- **Source:** GitHub · 5.7k stars · ~1d ago
- **Tags:** `3d` `image-to-3d` `local-ai` `desktop` `mit`

**modly** (Lightning Pixel, MIT) is a desktop app for Windows, Linux, and Apple Silicon macOS that generates 3D meshes from photos entirely on your own GPU — no uploads, no account, no generation limits. It uses an extension system to load open models (Hunyuan3D 2 Mini, TripoSG, Trellis2 GGUF), exports to GLB/OBJ/STL/PLY (STL drops straight into Cura or Bambu Studio), and offers a node-based workflow UI plus a Python CLI (`agent.py`) so agents can drive generation headlessly.

**Why it matters:** Local image-to-3D has been the missing piece for privacy-sensitive 3D-printing, game-asset, and design workflows that can't send reference photos to cloud tools like Meshy or Luma. modly lowers that barrier to a free, GPU-local install — quality is prototyping-grade, but it's a real alternative for the "no cloud" crowd.

> Needs a model extension installed before generating (e.g. Hunyuan3D 2 Mini); 6GB+ VRAM recommended.

[`🔗 lightningpixel/modly`](https://github.com/lightningpixel/modly) · [`🔗 Product Hunt`](https://www.producthunt.com/products/modly-2)

---

## 18. FluidVoice — the open-source on-device macOS dictation app that's eating Wispr Flow's lunch

- **Velocity:** ▮ steady
- **Source:** GitHub · 10.1k stars · ~1d ago
- **Tags:** `dictation` `speech-to-text` `on-device` `macos` `privacy`

**FluidVoice** (Altic, GPLv3) is a macOS dictation app that runs 100% on-device: local speech models (NVIDIA Parakeet/Nemotron, Cohere Transcribe, Apple Speech, Whisper) plus a local "Fluid-1" AI enhancement layer handle transcription and cleanup (capitalization, filler removal, tone) with nothing leaving the Mac. It adds Command Mode for voice-controlling the Mac, Write Mode for dictating into any field, and per-app tone adjustment — positioning itself as the free, privacy-first alternative to Wispr Flow ($12–15/mo, cloud-processed).

**Why it matters:** On-device speech is the next privacy battleground after on-device LLMs, and FluidVoice's "comparable accuracy, zero cloud, zero cost" pitch has already driven a wave of Wispr Flow cancellations. It's rough around the edges (reviewers split on whether it's a full replacement yet), but the momentum and 10k+ stars signal real demand.

> macOS 15+ only; the Fluid-1 enhancement model is closed-source (core dictation is open), ~3.5GB local download.

[`🔗 altic-dev/FluidVoice`](https://github.com/altic-dev/FluidVoice) · [`🔗 OpenAlternative`](https://openalternative.co/fluidvoice)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-08-14T20:03:00Z |
| Items | 18 |
| Sources tracked | 23 (GitHub Trending, Hacker News, Hugging Face, NVIDIA Blog, DoNews, Bishop Fox, CISA KEV, Rapid7, Censys, Cline Docs, Moclaw Blog, Turso Blog, InfoQ, arXiv, IONIX, SecurityWeek, Wiz, Vercel Blog, agentskills.io, dev.to, holaOS Docs, Product Hunt, OpenAlternative) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[Previous day](../2026-08-13/) · [Raw .md](../2026-08-14.md) · [Archive](../../archive/)
