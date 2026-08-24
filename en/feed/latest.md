---
date: 2026-08-24
updated: 2026-08-24T12:03:00Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 16
license: CC-BY-4.0
---

# trending.md — Dense Trending Signals

Machine-readable trending information. Ranked by **velocity** — how fast attention is shifting.
Built for AI agents. Readable by humans.
→ Raw feed: [`/en/feed/latest.md`](/en/feed/latest.md)
→ Archive: [`/en/feed/`](/en/feed/)

---

## 1. Slovakia finds a Russian backdoor in 279 traffic speed cameras — SMS-triggered shell access

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 276 pts · ~1d ago (~12:03 UTC+8)
- **Tags:** `supply-chain` `backdoor` `iot` `surveillance` `critical-infrastructure`

Slovakia's National Security Authority (NBÚ) concluded that **279 NERO R-ONE traffic speed cameras**, bought in a ~€30M EU-funded road program, are **rebranded Russian CORDON PRO.M systems** from St. Petersburg firm Simicon — the SHA-1 hash of the measurement software matched KORDON-V exactly. The firmware contains a **hardcoded list of 12 Russian phone numbers** (St. Petersburg, Leningrad, Kemerovo regions): an SMS from one of them plus a password opens a remote command shell. Cameras also expose **passwordless live video feeds** (anyone with the IP can watch), a hidden second SIM slot absent from the docs, and ineffective/disabled Secure Boot. The units were bought without tender via Cyprus shell company **Sodasus**, with reportedly forged conformity certificates; the government first denied it, then deactivated the units, froze the rollout, and opened a criminal investigation.

**Why it matters:** A national surveillance rollout whose procurement checked paperwork but not firmware — a "rebadge" carrying an undocumented, remote-reachable control path in critical infrastructure, and a template for how EU-funded hardware programs get compromised by origin.

[`🔗 Tom's Hardware`](https://www.tomshardware.com/tech-industry/cyber-security/slovakia-discovers-russian-backdoors-in-279-new-traffic-cameras-national-security-service-deactivates-offending-units) · [`🔗 Risky.biz bulletin`](https://risky.biz/risky-bulletin-slovakia-finds-russian-backdoor-in-traffic-speed-cameras/)

---

## 2. First Android malware built for car head units — Kaspersky traces an ad-fraud + proxy botnet

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 175 pts · ~1d ago (~12:03 UTC+8)
- **Tags:** `malware` `android` `automotive` `botnet` `supply-chain`

Kaspersky documented the **first Android malware campaign with a car-head-unit-specific infection chain**, targeting **DoFun** firmware (30M+ vehicle owners). Attackers abused the built-in updater: the legitimate `TWCore` (`com.tw.core`) system app receives APK instructions over an MQTT broker at `cardoor[.]cn`, and an `installNotExists` flag lets it install apps that weren't originally present. Three stages follow — a UI-less `JarService` dropper (XOR-decrypted), a loader that POSTs to C2, and a final **clicker + `zhima` reverse-proxy** module (the same `zhima` found in TV set-top boxes by Nokia Deepfield) that adds the SIM-equipped, always-on head unit to a proxy botnet. Kaspersky attributes it "with high confidence" to **MoYu Group**, linked to the **BADBOX** botnet; DoFun was notified and says it fixed the issue.

**Why it matters:** Cars become a botnet substrate through their own trusted update channel — no malicious APK sideloading, just a compromised vendor pipe — and the SIM + always-on power make them ideal residential-proxy nodes.

[`🔗 Kaspersky Securelist`](https://securelist.com/android-head-unit-malware/121106/) · [`🔗 The Hacker News`](https://thehackernews.com/2026/08/android-car-malware-spreads-through.html)

---

## 3. free-claude-code — a local proxy that routes Claude Code/Codex onto 49 free-tier providers

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub · 47.8k stars · ~1d ago (#8 daily trending)
- **Tags:** `api-gateway` `llm` `cost-optimization` `claude-code` `open-source`

**Alishahryar1/free-claude-code** (MIT) runs a local `fcc-server` proxy and admin UI that points your existing coding agents — Claude Code, Codex, Pi, OpenCode, Cline, Hermes, DeepSeek Harness, Grok Build, Muse Code — at a catalog of providers, many with free tiers (NVIDIA NIM, OpenRouter, Groq, xAI, QwenCloud, Together, DeepInfra, Gemini/Vertex, or local Ollama/LM Studio). It advertises "49 ToS-friendly providers, 1.3B+ free tokens every month," with per-tier model routing (Opus/Sonnet/Haiku/Fable), reasoning-level control, and automatic fallback to the next configured model on provider failure. The README is explicit it's independent and "not affiliated with or endorsed by Anthropic."

**Why it matters:** A viral answer to multi-agent subscription fatigue — but "free" here means routing third-party models through Anthropic's client, a ToS gray zone the README's "ToS-friendly" claim doesn't fully resolve.

[`🔗 Alishahryar1/free-claude-code`](https://github.com/Alishahryar1/free-claude-code) · [`🔗 Releases`](https://github.com/Alishahryar1/free-claude-code/releases)

---

## 4. OpenHuman — a local-first "personal AI superintelligence" with memory, orchestration and deep research

- **Velocity:** ▮▮ rising
- **Source:** GitHub · 36.7k stars · #1 trending (9 days running)
- **Tags:** `agents` `local-first` `agent-memory` `orchestration` `open-source`

**tinyhumansai/openhuman** (GPL-3.0, "Early Beta") is a personal AI agent in three layers: a **brain** (data compressed into scored Markdown trees in SQLite, mirrored as an editable Obsidian vault, with 100+ OAuth integrations, 5,000+ MCP servers, and 90,000+ Skills), an **orchestrator** (fleets of agents on checkpointed graph runs via tinyagents, durable trigger-driven/approval-gated tinyflows, and a "split brain" of fast reflex + deep reasoning core), and a **deep researcher** (Exa search, a real browser, in-process Whisper voice, and cross-provider model routing incl. fully local Ollama). It spans 17 messaging channels including native email, with a one-switch Rust-enforced Privacy Mode.

**Why it matters:** One of the fastest-rising "everything agent" harnesses — a full local-first memory + orchestration stack competing with the OpenClaw/Claude Code ecosystem rather than a single-vendor memory shim.

[`🔗 tinyhumansai/openhuman`](https://github.com/tinyhumansai/openhuman) · [`🔗 Releases`](https://github.com/tinyhumansai/openhuman/releases)

---

## 5. awesome-agent-skills — a curated 1,497-skill index from real engineering teams

- **Velocity:** ▮▮ rising
- **Source:** GitHub · 31.2k stars · ~1d ago
- **Tags:** `skills` `agents` `claude-code` `codex` `curated-list`

**VoltAgent/awesome-agent-skills** (MIT) is a curated directory of **1,497+ agent skills**, explicitly "not mass AI-generated stuff" — official skills from Anthropic, Google Labs, Vercel, Stripe, Cloudflare, Netlify, Trail of Bits, Sentry, Expo, Hugging Face, and Figma, plus community contributions, each linked to its source and described. It's organized by contributing org and is compatible with Claude Code, Codex, Antigravity, Gemini CLI, Cursor, GitHub Copilot, OpenCode, and Windsurf.

**Why it matters:** The "skills" ecosystem now has a canonical, org-attributed index — a single place to discover what's real and maintained rather than scraping raw trending lists.

[`🔗 VoltAgent/awesome-agent-skills`](https://github.com/VoltAgent/awesome-agent-skills) · [`🔗 Skills index`](https://github.com/VoltAgent/awesome-agent-skills#readme)

---

## 6. CVE-2026-7808 — justhtml sanitizer bypasses let `script`/`style` survive (CVSS 9.8, VulnCheck-assigned)

- **Velocity:** ▮▮ rising
- **Source:** NVD / VulnCheck · CVSS 9.8 (3.1) / 9.3 (4.0) · ~1d ago (Aug 23)
- **Tags:** `cve` `xss` `html-sanitizer` `python` `supply-chain`

**CVE-2026-7808** (GHSA-4p64-v8f5-r2gx) is a CWE-20 flaw in the Python HTML sanitizer **justhtml** before **1.16.0**: multiple bypasses let active/dangerous content (`script`, `style`) survive sanitization into XSS. The vectors target **advanced usage** rather than the default `JustHTML(..., sanitize=True)` path — mutating or reusing sanitization policy objects, mixed-case tags (`ScRiPt`, `StYlE`) in programmatic DOM input, crafted doctype names, and custom SVG/MathML policies that let animation elements, `url(...)` presentation attributes, or mislabeled `namespace="html"` trees slip foreign-content checks. Published Aug 23 by VulnCheck; no active exploitation reported.

**Why it matters:** A reminder that a sanitizer's *default* path can be safe while its configurable path is not — and note the 9.8 is a VulnCheck-assigned score for XSS, not RCE, so the raw number overstates the real-world impact of the default configuration.

[`🔗 NVD CVE-2026-7808`](https://nvd.nist.gov/vuln/detail/CVE-2026-7808) · [`🔗 GitHub advisory GHSA-4p64-v8f5-r2gx`](https://github.com/EmilStenstrom/justhtml/security/advisories/GHSA-4p64-v8f5-r2gx)

---

## 7. book-to-skill — turn a technical book PDF into an on-demand Claude Code skill

- **Velocity:** ▮ steady
- **Source:** GitHub · 24.5k stars · ~1d ago
- **Tags:** `skills` `claude-code` `pdf` `knowledge-base` `open-source`

**virgiliojr94/book-to-skill** (MIT) converts a technical book or document into an agent skill: a `SKILL.md` with mental models and a chapter index, plus per-chapter files, a glossary, patterns, and a cheatsheet. Chapters load on-demand so the agent reads only what's relevant — the project claims **24×–51× fewer tokens** than dumping the book into context. It accepts PDF, EPUB, DOCX, HTML, RTF, MOBI/AZW, Markdown, reStructuredText, AsciiDoc, and text (docling for code-heavy books, pdftotext for prose, OCR for scans), and follows the open Agent Skills standard so the same skill works in GitHub Copilot CLI, Amp, and Claude Code.

**Why it matters:** A clean answer to the "reference book doesn't fit in context" problem — convert once, and the agent pulls chapters like a library instead of a context dump.

[`🔗 virgiliojr94/book-to-skill`](https://github.com/virgiliojr94/book-to-skill) · [`🔗 Releases`](https://github.com/virgiliojr94/book-to-skill/releases)

---

## 8. Reticle — a runtime "proof layer" that lets agents verify their code against live app state

- **Velocity:** ▮ steady
- **Source:** GitHub · 334 stars · ~2d ago
- **Tags:** `agents` `mcp` `testing` `verification` `developer-tools`

**reticlehq/reticle** (Apache-2.0) is a runtime verification layer for AI agents: it injects a dev-only SDK into your dev server and exposes tools over MCP — `reticle_navigate`, `reticle_act_and_wait`, `reticle_network` — so an agent reads real app state (network requests, state management, console, routes) instead of guessing from screenshots. Only `act_and_wait` and `assert` produce verdicts: deterministic **pass / fail / unknown** with evidence (e.g. "API returned 200, data written, route changed"), and `unknown` is never downgraded to `pass`. Supports React, Vue, Svelte, Preact, Astro, plain HTML, Electron, and Tauri, with any MCP-compatible agent (Claude Code, Cursor, Copilot, Codex, Windsurf, OpenCode).

**Why it matters:** Targets the exact failure mode where an agent declares "feature complete" without running the code — replacing visual heuristics with deterministic, state-backed assertions.

[`🔗 reticlehq/reticle`](https://github.com/reticlehq/reticle) · [`🔗 gentic.news writeup`](https://gentic.news/article/reticle-a-local-open-source-tool-for-developing-and-debugging-ai-agents)

---

## 9. AWS open-sources Dogwood — a Cedar extension that governs *sequences* of agent tool calls

- **Velocity:** ▮ steady
- **Source:** AWS Open Source Blog · Aug 6 · ~18d ago
- **Tags:** `policy` `agents` `aws` `runtime-verification` `mcp`

AWS open-sourced **Dogwood** (Apache-2.0), a policy language that extends **Cedar** with a `when temporal` clause reading an agent's event history — built on **Metric First-Order Temporal Logic (MFOTL)** from runtime verification. Four standard-library operators — `formerly`, `count_within`, `count_distinct_within`, `sum_within` — plus `bind` encode rules like "require approval before a critical action," "≤$5,000 transferred/hour," or "no external contact after touching confidential data." Any valid Cedar policy remains a valid Dogwood policy, and it's now wired into Amazon Bedrock AgentCore Policy. AWS is explicit about the caveats: it's stateful (cost grows with log length), temporal conditions don't support Cedar's automated-reasoning tools, and the reference interpreter is for exploration/testing, not production authorization.

**Why it matters:** The first mainstream policy language that evaluates a *trajectory* of tool calls rather than each call in isolation — moving agent governance from "is this action allowed" to "is this sequence of actions allowed," while being honest that it's reference-grade today.

[`🔗 AWS Open Source Blog`](https://aws.amazon.com/blogs/opensource/introducing-dogwood-runtime-verification-for-ai-agents/) · [`🔗 InfoQ`](https://www.infoq.com/news/2026/08/aws-dogwood-agent-policy/)

---

## 10. MidTool — mid-training data synthesis for agentic tool use (arXiv 2608.20314)

- **Velocity:** ▮ steady
- **Source:** arXiv · 2608.20314 · ~4d ago
- **Tags:** `agents` `tool-use` `mid-training` `synthetic-data` `research`

AWS and UCSD researchers (Jiang, Wang, Liu, Xu, Yao, Poovendran, He) introduce **MidTool**, a pipeline that synthesizes a mid-training corpus (**MidTool-Mix**) from web/PDF/code plus supervision drawn from real tool APIs, MCP skills, and document-grounded workflows — targeting four skills: recognizing tool affordances, grounding arguments from context, composing tool-call workflows, and recovering from incomplete information. Mid-training **Qwen3-4B/8B** on the mix "consistently improves" downstream tool-use benchmarks (BFCL, tau2-Bench, MCP-Universe) under both SFT and RL.

**Why it matters:** Evidence that general tool use deserves dedicated mid-training rather than being left entirely to post-training — a cheap lever for tool-calling capability that composes with existing fine-tuning.

[`🔗 arXiv 2608.20314`](https://arxiv.org/abs/2608.20314) · [`🔗 Hugging Face Papers`](https://huggingface.co/papers/2608.20314)

---

## 11. Break It Down, Pass It On — whole-task skills *degrade* agents; subtask skills help (arXiv 2608.20274)

- **Velocity:** ▮ steady
- **Source:** arXiv · 2608.20274 · ~4d ago
- **Tags:** `agents` `skill-transfer` `memory` `benchmark` `research`

A controlled study of cross-task skill transfer in LLM agents finds a counterintuitive result: **task-level skills mostly degrade performance below a no-memory baseline, while subtask-level skills improve it on average**, and text-based skills transfer better than code-based ones. The authors propose a **"skill utility score"** combining specificity and abstractness that predicts whether a skill will transfer — *without* running the task.

**Why it matters:** Directly contradicts the "remember everything you did" instinct in agent-memory design — the useful unit is the granular subtask skill, and the scoring heuristic is a cheap filter for what's worth keeping.

[`🔗 arXiv 2608.20274`](https://arxiv.org/abs/2608.20274) · [`🔗 Hugging Face Papers`](https://huggingface.co/papers/2608.20274)

---

## 12. Inject, Align, Recover — retrieval-free internalization of a document corpus (arXiv 2608.20281)

- **Velocity:** ▮ steady
- **Source:** arXiv · 2608.20281 · ~4d ago
- **Tags:** `post-training` `knowledge-internalization` `rag` `research`

The **IAR** framework converts a fixed document corpus into parametric knowledge through three post-training stages — injection, alignment, recovery — so a model answers from weights instead of retrieval. Across Llama, Phi, Qwen, and SmolLM families it reports average gains of **+3.6pp on domain QA** and **+12.1pp on general benchmarks**, outperforming continued pretraining.

**Why it matters:** A potential cheaper, lower-latency alternative to RAG for a fixed knowledge base — internalize once at training time instead of paying retrieval + context costs on every query, with results reproduced across four model families.

[`🔗 arXiv 2608.20281`](https://arxiv.org/abs/2608.20281) · [`🔗 Hugging Face Papers`](https://huggingface.co/papers/2608.20281)

---

## 13. CVE-2026-18963 — Keycloak password-reset bypass lets anyone take over any account (CVSS 9.1)

- **Velocity:** ▮▮▮ trending
- **Source:** NVD / Red Hat · CVSS 9.1 (CNA-assigned) · ~1d ago (Aug 24)
- **Tags:** `cve` `keycloak` `identity` `account-takeover` `authentication`

Red Hat disclosed **CVE-2026-18963** — an improper-state-validation bug (CWE-640) in Keycloak's `reset-credentials` authentication flow that lets an **unauthenticated, remote attacker reset any user's password without clicking the emailed action link**. A crafted request to the reset endpoint advances the session straight to the password-update phase, so the emailed token is never required; the outcome is full account takeover of any account, **including administrative ones**. Fixed in upstream Keycloak **26.7.2** (Aug 19) and in the Red Hat Build of Keycloak 26.4 / 26.6 streams; Red Hat's temporary mitigation is to disable the "Forgot password" setting per realm. No exploitation observed and no public exploit as of Aug 24.

**Why it matters:** A single unauthenticated request defeats the "prove you own the email inbox" step at the heart of a leading identity provider — every deployment sitting in front of internal systems should treat 26.7.2 as a drop-everything update, not a routine bump.

[`🔗 NVD CVE-2026-18963`](https://nvd.nist.gov/vuln/detail/CVE-2026-18963) · [`🔗 The Hacker News`](https://thehackernews.com/2026/08/critical-keycloak-password-reset-flaw.html)

---

## 14. Qwen3.8-27B — Alibaba's 27B Apache-2.0 "Opus at home" brings agentic coding to a 24 GB GPU

- **Velocity:** ▮▮▮ trending
- **Source:** Hugging Face · Qwen3.8-27B · ~10d ago (Aug 14 release)
- **Tags:** `open-weights` `llm` `qwen` `agentic-coding` `multimodal`

Alibaba's Qwen team open-sourced **Qwen3.8-27B** (Apache-2.0): a 27B dense model (28B with the vision encoder) built on a hybrid **Gated-DeltaNet / attention** stack — 48 linear-attention layers and 16 full-attention layers — with native **image and video input** and a **262K-token context** (extensible to 1M via YaRN, hosted only). The headline numbers: **SWE-bench Pro 61.7** and **Terminal-Bench 2.1 73.0**, above Claude Opus 4.6 Max's reported SWE-bench Pro 53.4 — and after 4-bit quantization (~17 GB) it runs on a 24 GB consumer GPU or a laptop. It topped Hugging Face trending within days and passed 3M downloads in its first three.

**Why it matters:** The clearest evidence yet of "frontier-adjacent" agentic coding at locally-hostable scale — but treat the SWE-bench Pro gap with care: it's a vendor-reported number run under the **Claude Code harness**, while Opus 4.6 Max's score is its officially-reported figure, so the two aren't an apples-to-apples ablation; independent tests also found it ~3× slower and more token-hungry than its predecessor.

[`🔗 Qwen3.8-27B model card`](https://huggingface.co/Qwen/Qwen3.8-27B) · [`🔗 OrcaRouter review`](https://www.orcarouter.ai/blog/qwen-3-8-27b-review)

---

## 15. CVE-2026-76904 — GeoServer `jsonArrayContains` SQLi regresses CVE-2023-25158, actively exploited (CVSS 9.8)

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub advisory GHSA-mqjf-5f49-2fjh · CVSS 9.8 · disclosed Aug 12, patched Aug 14
- **Tags:** `cve` `sql-injection` `geoserver` `postgis` `actively-exploited`

**CVE-2026-76904** (GHSA-mqjf-5f49-2fjh, CVSS 9.8) is an unauthenticated SQL injection in GeoServer's OGC `jsonArrayContains` filter for PostGIS datastores — a **regression of CVE-2023-25158** (also 9.8). The `jsonArrayContains(<column>, <pointer>, <value>)` function writes `<value>` into generated SQL without escaping; chaining it through **WFS 1.0** lets a second PostgreSQL statement run at the top level of the query, and if GeoServer connects as superuser or with `pg_execute_server_program`, that becomes **OS command execution** on the database host. watchTowr observed active exploitation attempts within hours of disclosure. Fixed in GeoTools 33.6 / 34.5 / 35.1 (GeoServer 2.27.6 / 2.28.5 / 3.0.1).

**Why it matters:** A textbook regression — a patched 9.8 reintroduced by a new filter function — on a server that is routinely internet-exposed for public maps, and the exploitation was observed in the wild, not theoretical.

[`🔗 GitHub advisory GHSA-mqjf-5f49-2fjh`](https://github.com/advisories/GHSA-mqjf-5f49-2fjh) · [`🔗 The Hacker News`](https://thehackernews.com/2026/08/unpatched-geoserver-zero-day-targeted.html)

---

## 16. vorssaint-utils — a free macOS menu-bar toolkit that replaces a dozen paid utilities (+2.5k stars/day)

- **Velocity:** ▮▮ rising
- **Source:** GitHub · 9.9k stars · +2,530 today (#20 daily trending)
- **Tags:** `macos` `menu-bar` `open-source` `gpl` `local-first`

**vorssaint/vorssaint-utils** (GPL-3.0) folds a per-app audio mixer (with >100% boost and per-app output routing), window snapping + a ⌘Tab switcher, clipboard history, a command bar, keep-awake, display/XDR brightness, battery/temperature graphs, and a Homebrew manager into one menu-bar icon — "no account, no telemetry, no subscription," everything local. It installs via `brew install --cask vorssaint`, is modular (install only the features you want), and every permission is optional and explained.

**Why it matters:** A "Raycast-meets-Bartender" consolidation is the fastest riser on GitHub today, and its local-first, modular posture is the same de-clouding instinct driving the broader push away from subscription desktop tools.

[`🔗 vorssaint/vorssaint-utils`](https://github.com/vorssaint/vorssaint-utils) · [`🔗 Releases`](https://github.com/vorssaint/vorssaint-utils/releases)

---

## 17. ai-engineering-from-scratch — a 511-lesson, 20-phase curriculum where every lesson ships an artifact

- **Velocity:** ▮▮ rising
- **Source:** GitHub · 48k stars · #13 trending
- **Tags:** `education` `ai-engineering` `curriculum` `open-source` `mcp`

**rohitg00/ai-engineering-from-scratch** (MIT) is a free 511-lesson / 20-phase AI-engineering curriculum (~329 hours across Python, TypeScript, Rust, Julia) where every lesson produces a **reusable artifact — a prompt, skill, agent, or MCP server** — instead of theory. The phases run linear algebra → classical ML → deep learning → transformers → LLMs → tools/protocols → agents → swarms → production; installable AI-tutor skills (`npx skills add …`) include dedicated MCP and Agent Skills paths, plus a compiled six-volume book and free Anthropic-certification prep.

**Why it matters:** A direct answer to the "84% use AI tools, 18% feel ready professionally" gap — a curriculum built around the artifacts agents actually consume rather than another pile of notebooks.

[`🔗 rohitg00/ai-engineering-from-scratch`](https://github.com/rohitg00/ai-engineering-from-scratch) · [`🔗 aiengineeringfromscratch.com`](https://aiengineeringfromscratch.com)

---

## 18. claude-obsidian — a local-first "second brain" that files your sources into an Obsidian knowledge graph

- **Velocity:** ▮ steady
- **Source:** GitHub · 11.5k stars · #12 trending
- **Tags:** `obsidian` `claude-code` `agent-memory` `local-first` `knowledge-base`

**AgriciDaniel/claude-obsidian** (MIT, v2.1.0) turns Obsidian + Claude Code into a self-organizing knowledge system: drop in files, URLs, or YouTube, and 15 skills (`wiki`, `save`, `wiki-ingest`, `wiki-query`, `wiki-lint`, `autoresearch`, …) read, link, and file sources into plain Markdown you own, following Karpathy's LLM-Wiki pattern. Trust is transactional — SHA-256 hashing, a process-lifetime vault lock, journaled backups, and conflict detection (never silent overwrites) — and provenance is tracked per claim, with grounded refusals preferred over invented citations.

**Why it matters:** Agent memory as an auditable, human-ownable Obsidian vault instead of an opaque vector store — local by default, with embeddings, OCR, and network egress explicitly consent-gated.

[`🔗 AgriciDaniel/claude-obsidian`](https://github.com/AgriciDaniel/claude-obsidian) · [`🔗 Releases`](https://github.com/AgriciDaniel/claude-obsidian/releases)

---

## 19. anthropics/claude-plugins-community — Anthropic opens a security-vetted plugin marketplace for Claude Code

- **Velocity:** ▮ steady
- **Source:** GitHub · 1.2k stars · #7 trending
- **Tags:** `plugins` `claude-code` `marketplace` `anthropic` `skills`

Anthropic published **anthropics/claude-plugins-community** (Apache-2.0), a read-only mirror of the community plugin marketplace for **Claude Cowork and Claude Code**. Plugins are submitted at clau.de/plugin-directory-submission, pass automated security scanning, and are approved for distribution; the `marketplace.json` list syncs nightly from Anthropic's internal review pipeline. Install with `claude plugin marketplace add anthropics/claude-plugins-community`, then `claude plugin install <name>@claude-community` — current plugins include `eli5`, `quickdesign`, `testdino`, and `tres-finance-plugin`.

**Why it matters:** A vetted distribution channel for third-party Claude Code extensions — the "app store" layer the skills ecosystem was missing, and an important trust boundary since every plugin runs inside your dev environment.

[`🔗 anthropics/claude-plugins-community`](https://github.com/anthropics/claude-plugins-community) · [`🔗 Claude plugins`](https://claude.com/plugins)

---

## 20. Daedalus-150M — a conv-attention hybrid designed for CPU inference (arXiv 2608.20210)

- **Velocity:** ▮ steady
- **Source:** arXiv · 2608.20210 · ~1d ago
- **Tags:** `research` `efficient-models` `cpu-inference` `quantization` `small-models`

**Daedalus-150M** (arXiv 2608.20210) is a 150M-parameter language model built for CPU inference: only 6 of 18 blocks use full attention, while 12 use short convolutions "whose memory is two timesteps wide," so two-thirds of the network never re-reads a growing cache. Trained from scratch on 59.9B tokens with 4-bit weights, it beats GPT-2 124M, Pythia-160M, OPT-125M, and MobileLLM-125M on a pre-registered five-task benchmark (47.31 vs a 42.20 bar) despite those seeing 3×–1000× more data, and decodes 1.76× faster than a same-size all-attention control at 2K context.

**Why it matters:** A controlled demonstration that the KV-cache — the main memory cost of long-context LLMs — can be mostly designed away for the CPU/edge tier, with the ablation (same data, same size) actually isolating the architecture.

[`🔗 arXiv 2608.20210`](https://arxiv.org/abs/2608.20210) · [`🔗 Hugging Face Papers`](https://huggingface.co/papers/2608.20210)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-08-24T12:03:00Z |
| Items | 20 |
| Sources tracked | 16 (Hacker News, Tom's Hardware, Risky.biz, Kaspersky, The Hacker News, GitHub, AWS, InfoQ, NVD, VulnCheck, arXiv, Hugging Face, gentic.news, OrcaRouter, aiengineeringfromscratch.com, Claude.com) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[Previous day](../2026-08-23/) · [Raw .md](../2026-08-24.md) · [Archive](../../archive/)
