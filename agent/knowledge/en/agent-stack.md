---
title: Agent infrastructure stack
topic: agent-stack
created: 2026-08-13
---

# Agent infrastructure stack (Aug 2026)

The pieces of the AI-agent stack, each gaining open-source winners in the Aug 2026 trend window.

## Runtime / execution substrate
- **Cloudflare Computer** — `@cloudflare/computer`, MIT. Persistent virtual filesystem backed by
  SQLite; orchestrates between fast serverless isolates and full Linux containers (containers
  needed for <10% of agent work). One entry point (`workspace.runtime.exec()`) spans three
  backends — full Linux **container** (FUSE-mounted), **bash isolate** (Dynamic Worker),
  **JavaScript isolate** — with files persisting via `@cloudflare/dofs` (SQLite Durable Object
  filesystem) and every read/write/exec gated, audited, observed. Part of Cloudflare Agents Week
  2026. 7,300+ stars, preview-only.
- **Cloudflare OS** — `cloudflare/cloudflare-os`, open source. Browser-based AI workspace: build
  apps from natural language; V8-isolate sandbox, zero-trust by default (network off,
  "Gatekeepers" for sensitive actions). Cloudflare Agents Week 2026, alongside Computer.
- **Orca** — `stablyai/orca`, MIT, TypeScript. "Agent Development Environment": runs parallel AI
  coding agents, each in an isolated git worktree. 27+ CLI agents, mobile companion, WebGL
  terminal. 42K stars.
- **AgentENV** — `kvcache-ai/AgentENV` (Moonshot/Kimi team), MIT, ~90% Rust. Distributed platform
  that powered Kimi K3's agentic RL training: each sandbox is an isolated Firecracker microVM with
  snapshot/fork in <100ms, boot/resume in <50ms, fork into up to 16 children for parallel agent
  workflows; ublk + overlaybd layered images (images can exceed disk capacity); E2B-compatible
  HTTP API (existing E2B SDKs work unchanged); scales across Kubernetes. No auth layer yet (run on
  a trusted network). ~1.4K stars.
- **phone-harness** — `ShawnPana/phone-harness`, MIT, ~500 lines of Python. Lets Claude Code / Codex
  drive a real iPhone with no jailbreak, Xcode, or WebDriverAgent — the transport is macOS's iPhone
  Mirroring window. "Sees" via scoped `screencapture` + Apple Vision OCR (a "poor man's DOM" with
  tap-ready coordinates), "acts" via HID-level CGEvents (taps, long-presses, drags, scroll, typing),
  and "verifies" with a ground-truth screenshot. Ships a SKILL.md with consent rules (stop-and-ask
  before anything outward-facing / hard-to-reverse). macOS Sequoia+, Accessibility + Screen Recording
  grants. ~1.7K stars. Mobile is the last untapped computer-use surface; Mirroring-as-I/O sidesteps
  the whole WebDriverAgent/Xcode stack.
- **Orchard** — `microsoft/Orchard`, MIT (Microsoft Research). Kubernetes-native agentic-modeling
  framework: an **Orchard Env** service (sandbox create/exec/file/patch/network/timeouts via REST +
  Python) decoupled from the training loop, so SFT/RL/GRPO and any harness (Codex, OpenClaw,
  ZeroClaw, ReAct) share one sandbox substrate — 1,000 sandboxes in ~26s at ~1/10th managed-sandbox
  cost on spot instances. Recipes: Orchard-SWE (Qwen3.5-35B-A3B → 69.7% SWE-bench Verified),
  Orchard-GUI (WebVoyager 74.1%), Orchard-Claw (Claw-Eval 59.6%). arXiv 2605.15040. Signal: agent
  training was bottlenecked by bespoke sandbox infra, not models — a ~3B-active-param model at ~70%
  SWE-bench says infra, not scale, was the constraint.

- **DeepSeek Harness** — `deepseek-ai/deepseek-harness`, MIT, v0.1 developer preview (TypeScript).
  A coding-and-office agent framework built on the **Cordis** plugin system: models, tools, skills,
  sessions, sandboxes, storage, scheduling, and UI are all composable plugins — developers extend or
  replace capabilities at the config layer without touching the core. Four run modes (Standard, PTC
  programmatic tool-calling, Minimal, Create); append-only session logs + a Trajectory view support
  resume/fork/retrieve/replay. `npx @deepseek-ai/dsh web`. ~38.9K stars. Signal: DeepSeek extends its
  "cheap frontier models" play into the harness layer — and "everything is a plugin" means it built
  its *own* plugin system (Cordis) rather than adopting Agent Plugins 1.0.0, a format-fragmentation
  watch-item (see [[agent-plugins]]).

## Model routing
- **NeMo Switchyard** — `NVIDIA-NeMo/Switchyard`, Apache 2.0, Rust. Proxy/library that translates
  between OpenAI Chat, Anthropic Messages, and OpenAI Responses formats and routes each request
  across a pool of models (vLLM, NVIDIA NIM, Ollama, or any OpenAI-compatible endpoint) with no
  app rewrites. Built-in routers: `llm_classifier`, `stage_router`, escalation, `random`, plus
  `passthrough`. Internal benchmark: frontier-level accuracy at ~1/3 the cost of Claude Opus 4.8;
  LangChain cut costs 74% by routing only 7% of calls to a frontier model — *at a 6% accuracy
  tradeoff* (145 multi-turn Deep Agents tasks). Pre-alpha (API will change before v1.0); launched
  alongside the 30B-MoE Nemotron 3.5 Lightning. See [[smart-routing]].

## Memory
- **TencentDB-Agent-Memory v2** — `TencentCloud/TencentDB-Agent-Memory`, MIT. Converts
  conversations/docs/code into Chat Memory, Skills, LLM-Wiki, CodeGraph. v2.0.0 adds **Team
  Memory** — four reusable assets (Chat Memory with L0 conversation → L3 persona distillation,
  versioned Skills, LLM-Wiki, CodeGraph) governed from a Memory Hub console with ACL visibility
  (`private`/`team`/`restricted`). Hybrid retrieval = BM25 + vectors + reciprocal-rank fusion;
  PersonaMem accuracy reported 48% → 76%. Memory Proxy for Claude Code/OpenAI protocol. 15K+ stars
  within 80 days. SQLite + sqlite-vec (BM25).
- **Memory standardization gap (open):** MCP (tool/data access) and A2A (agent-to-agent, both Linux
  Foundation) have converged, but neither types a *persistent, governed shared-memory record* — no
  authorship/confidence/provenance fields, no memory-space permissions, no conflict/ordering
  semantics. Every framework invents its own (Mem0, Zep, Letta, custom vector stores), so switching
  frameworks resets memory to zero. OWASP ASI06 "Memory & Context Poisoning" now names cross-agent
  memory exchange as an attack path (gated writes, provenance, segmentation, treat stored memory as
  untrusted input). Proposals: **Agent Memory Hall** (typed MemoryCells — fact/preference/constraint/
  lesson/risk; three-tier trust raw_source→llm_derived→human_confirmed + an "Anti-Ouroboros" rule
  blocking LLM-derived memories from superseding each other; identity ACLs; append-only audit; runs as
  an MCP server) and **Portable Agent Memory** (Episodic/Semantic/Procedural/Working/Identity model,
  Merkle-DAG provenance). TencentDB Team Memory and Macro's MCP-exposed team memory fill the gap ad
  hoc; no cross-system standard yet.
- **ai-memory — vendor-neutral cross-agent handoff** — `akitaonrails/ai-memory`, MIT, Rust, 1.5K
  stars. A local, git-versioned "shared brain": captures prompts, tool calls, and session boundaries
  into a per-project Markdown wiki (SQLite FTS5, optional vector ranking) with **zero LLM** (FTS5 +
  rules), and exposes a typed cross-agent handoff protocol — `memory_handoff_begin` / `accept` /
  `cancel` — so you can quit Claude Code mid-task and have Codex (or Cursor, Gemini CLI, OpenCode…)
  resume a "where you left off" summary in the same directory (~10 agent CLIs + a read-only web UI).
  Signal: agent memory is splitting into two shapes — team-level knowledge graphs (TencentDB) versus a
  *portable, per-project, vendor-neutral* memory that treats "handoff between different agents" as a
  first-class typed protocol.

## Identity & context standardization (the two-speed split)

The agent-context fragmentation question (ego-lite's browser identity vs holaOS's file memory) resolves
into two layers standardizing at different speeds:

- **Identity/trust — standardizing first.** MCP (vertical agent↔tool/data) and A2A (horizontal
  agent↔agent, both Linux Foundation) govern access/connectivity; **ACP** (Linux Foundation / IBM-BeeAI
  REST) is the internal-framework bridge; **ANP** adds decentralized **W3C DID identity** (`did:wba`,
  HTTPS-hosted DID documents) so agents from different companies verify each other cryptographically
  with no shared authority; A2A's `AgentCardSignature` (JWS) guards capability cards. The **Agentic AI
  Foundation (AAIF)** — Linux Foundation, formed Dec 2025 (Anthropic donated MCP alongside Block's goose
  and OpenAI's AGENTS.md), 170+ orgs — runs an **Identity & Trust working group** "defining portable
  identity and delegation protocols for agents". NIST's **AI Agent Standards Initiative** (Feb 17, 2026)
  is the first US-government program for agentic interoperability/security.
- **Context/memory — still product-specific.** ego-lite (shared logged-in state in isolated Spaces) and
  holaOS (memory as plain-text Markdown + SQLite vec) are two product answers to the same gap; neither
  is cross-vendor. The earliest standardization attempts — "governed Context Layer" / "Context Repos"
  (versioned, model-agnostic units where lineage/ownership/certification travel with each query) and the
  `scp` white paper (cryptographic context isolation + human accountability chains + capability-based
  authorization + verifiable provenance) — are still pre-standard.

Signal: identity standardizes before context; context/memory portability is the harder, later layer — the
same open gap as the memory-standardization note above.

## Workspace / all-in-one
- **Macro** — `macro-inc/macro`, AGPL-3.0, SolidJS + Rust backend (167 crates, 42 deployable
  services). All-in-one team workspace: Gmail-style email, channels/DMs, Linear-style tasks,
  CRDT-based docs, a 2D canvas, CRM, calls, and agents — everything @linked into a bidirectional
  graph with shared AI memory. "Fully open source — not open core"; team memory exposed via MCP
  with no rate limits. SOC 2 Type II / ISO 27001. ~1.6K stars.
- **holaOS** — `holaboss-ai/holaOS` (Holaboss), open source, 6.9K stars. A local-first "AI agent
  workspace" that runs Claude Code, Codex, or its own built-in agent side-by-side over shared memory,
  tools, files, and a real browser. The differentiator is **memory as plain-text files** on disk —
  readable, editable, shared across agents/sessions — plus a "correction-as-rule" mechanism that turns
  every fix you make into a durable rule. Ships frontier models (Kimi K3, GLM 5.2, GPT 5.6, Claude
  Opus 5, Fable 5) or BYOK; 100+ integrations, MCP support, "HolaApps" embeds live UIs. Signal:
  "memory as files" is a strong debuggability/trust choice — but the memory format's portability
  decides whether it stays an open standard or a holaOS lock-in (ties into the memory gap above).

## Browser / computer-use
- **ego-lite** — `citrolabs/ego-lite`, MIT (CitroLabs), 10.1K stars. A Chromium-based browser built
  so humans and AI agents share one browser without fighting over tabs: migrates existing Chrome data
  (logins/cookies/extensions) once, then gives each agent an isolated in-process "Space" while you
  keep browsing up front. Agents call JavaScript functions through an `ego-browser` skill layer
  (composing multi-step tasks into one script); page snapshots compressed ~30,000 → ~200–400 tokens
  via the Chromium accessibility tree. README claims up to 2.5× faster complex workflows than CLI
  browser approaches, ~94% less memory than separate instances; macOS-only for now. Signal: the
  "login wall" — agents either share your session or start logged-out — is browser automation's
  highest-friction point; "same logged-in state, isolated space" is a concrete answer.

## Knowledge / provenance
- **Semantica** — `semantica-agi/semantica`, MIT, 4.1K stars. Self-hosted graph-native layer for
  agents: RDF/LPG dual-graph storage, Rete reasoning engine, W3C PROV-O provenance on every derived
  fact, 7 vector-DB backends. Deterministic graph reasoning + LLM only for fuzzy extraction →
  auditable, reproducible decisions. `pip install semantica`. **v0.6.5** is a security release
  fixing five externally-reported vulns (missing auth on Explorer routes, Cypher/SPARQL injection).

**Provenance standardization (Aug 16 20:27):** "who standardizes agent provenance" is now a *layered*
convergence, not a single owner. **W3C PROV-O** supplies the vocabulary — Entity / Activity / Agent
(+ a `Plan` subclass) with the core relations `wasGeneratedBy` / `wasDerivedFrom` / `used` /
`wasInformedBy` / `wasAssociatedWith` / `actedOnBehalfOf` — extended by **PROV-AGENT** for AI-agent
decision lineage (identity/authority + delegation chains). **OpenTelemetry GenAI semantic conventions**
(v1.42+, `gen_ai.*` span attributes: provider, request, usage, tool-execution spans) supply the
telemetry/transport substrate and trace correlation. A 2026 **AIBOM** (AI Bill of Materials) proposal
argues the strongest single-run ground truth is a *causality graph* — entities, activities, agents
linked by trace correlation and backed by immutable runtime events, with snapshots preserving
transient context (retrieved chunks, prompt windows, memory state). Implementations are appearing:
`agentweave-sdk` (PyPI — PROV-O attributes on agent spans), `ringkernel`/RustCompute (PROV-O
attribution on message envelopes), civic-ai-tools (PROV-O JSON-LD `@context`). Semantica (above) is
the self-hosted open-source instance of this exact bet. No single owner yet — the "standard" is the
*stack* (PROV-O vocabulary + OTel transport + event-sourced persistence), not one vendor.

## Skills / routing
- **google/skills** — `google/skills`, Apache 2.0. ~110 markdown-based skills (reference files +
  code snippets an agent loads on demand) for Google products — GKE, BigQuery, Cloud Run, Gemini
  API, Firebase, Google Ads — plus multi-product "solution" workflows. `npx skills add
  google/skills`. Launched at Google Cloud Next 2026 with 13 skills, now ~110; each skill follows
  the Agent Skills format (`SKILL.md` + optional scripts/references). Reference implementation of
  the open Agent Skills format, now standardized via **Agent Plugins 1.0.0** — see
  [[agent-plugins]]. ~18K stars.
- **agent-skills** — `casualuser/agent-skills` (Addy Osmani), MIT. 24 SKILL.md workflows encoding
  senior-engineer discipline (code review, TDD, security, CI/CD, ship). 56.9K stars.
- **reverse-skill** — `zhaoxuya520/reverse-skill`, MIT. 20+ security scenarios (APK/binary RE,
  pentest, CTF, EDR bypass) with 41 routing rules + 163 regression tests. 22.4K stars.
- **Qwen-MM-Plugins** — `QwenLM/Qwen-MM-Plugins`, Apache 2.0. 8 multimodal capabilities (vision,
  video memory, Blender/FreeCAD CAD) as installable skills + MCP. Upgrades competing harnesses to
  call Qwen models.
- **diagram-design** — `cathrynlavery/diagram-design`, MIT. An Agent Skills package (Claude Code,
  Codex, Pi) that generates 27+ editorial diagram types (architecture, sequence, ER/data, Gantt,
  radar, medallion…) as self-contained HTML + SVG — no build step, no JS, no render server. Encodes
  a design system as machine-readable rules (4px grid, 1px hairlines, no shadows, one accent color,
  three-font stack); a 60-second brand-onboarding scrapes palette/fonts + runs WCAG contrast checks;
  redraws draw.io/Mermaid with dials. ~10.2K stars, +2,951/day. Proof that skills now encode
  *taste*, not just product how-tos — see [[agent-plugins]].

## Orchestration / harness
- **Prime Agent** — `PrimeIntellect-ai/prime-agent`, MIT. Recursive Language Model (RLM): context
  as first-class variables in a persistent IPython REPL; Continual Harness for self-improvement.
  95.5% ARC-AGI-3 with Opus 5.
- **Multi-Agent-CAD** — `Pan-Chera/Multi-Agent-CAD` (Tsinghua IEI Lab), MIT. 4-agent text-to-CAD
  with compact structured JSON state-passing; 116× fewer tokens than single-agent.
- **qm** — `yc-software/qm`, MIT (Y Combinator). Multiplayer agent harness for work: teams run Claude
  Code / Codex / OpenCode / Pi agents in per-user workspace sandboxes with shared file storage,
  permission configs, and cron scheduling, behind a pluggable "harness" interface. TypeScript.
  ~13K stars in ~2 weeks. Signal: the shift from single-user CLI wrappers to multi-user, permissioned
  agent infrastructure — "agents as organizational infrastructure."

- **Cline Kanban** — `cline/kanban`, Apache 2.0, research preview. A local web board that runs CLI
  coding agents (Cline, Claude Code, Codex, OpenCode — auto-detected) in parallel against one repo.
  Each card spins up an ephemeral git worktree (sharing git-ignored files like `node_modules` via
  symlinks), so agents work side-by-side without merge conflicts; cards chain into dependency DAGs
  and combine with auto-commit/auto-PR toggles into pipelines, while a built-in review loop sends
  inline diff comments back to the agent. `npx kanban`. Worktree-per-task is now the standard
  isolation primitive for parallel agent orchestration (Cline CLI v3.0.3 also added `--worktree`).
- **LoopX** — `huangruiteng/loopx`, MIT (a ByteDance engineer). A provider-neutral **state kernel**
  for long-running agent teams: objectives, typed todos, claims/leases, evidence logs, quota-aware
  auto-wake, and verifiable handoffs stay stable while Codex / Claude Code / Cursor execute bounded
  turns. Explicitly *not* a runtime — it answers "may the loop continue?" and projects into a Kanban
  (e.g. a Lark/Feishu adapter) that is never the source of truth. Local-first in a `.loopx/` dir, no
  deps beyond the Python stdlib; dangerous permissions + production writes stay human-gated. ~4.6K
  stars. Signal: as runs stretch to days, the missing layer is durable state + human gates — "board
  is a projection, kernel is truth."
- **Mole** — `lajosdeme/mole`, Apache 2.0, single Go binary. A terminal deep-research agent that
  makes cost and provenance *enforceable* rather than advisory: an **enforced budget** reserves and
  settles every model call against a ledger with non-negative DB constraints (`--usd 0.50` claims
  0% overshoot); **verified quotes** discard any claim whose quote doesn't appear verbatim in its
  source before it reaches the answer; and a **privacy boundary** analyzes local CSV/folders while
  only aggregates (≥5-record buckets) leave the machine. Speaks MCP so coding agents can drive it.
  Signal: "deep research" is proliferating, but its trust problems — cost overruns, hallucinated
  citations, local-data leakage — are being answered with *enforced mechanisms* (ledger constraints,
  quote verification), not prompts. Same trust-as-code direction as LoopX's human gates.

### The decomposition: plugin graph + state kernel + isolation primitive

Three new entrants sketch the same architecture from different angles: **DeepSeek Harness** makes
every component a plugin (the *plugin graph*), **LoopX** separates durable state + human gates from
the runtime (the *state kernel*), and **Cline Kanban** makes git-worktree-per-task the *isolation
primitive* for parallel agents (alongside Orca and Cline CLI `--worktree`). The monolithic CLI is
decomposing into these three separable layers — consolidation is happening *by layer*, not into one
monolith.

## Isolation boundary — two-speed standardization (Aug 16 20:27)

The "is git-worktree-per-task isolation the same boundary as the untrusted-exec sandbox?" question
resolves into **two different boundaries standardizing separately**:

- **Untrusted-exec sandbox — a *security* boundary, converging on tiered kernel isolation.** Agent
  code is generated at runtime and can't be reviewed before execution, so the threat model is
  "arbitrary adversarial code," and process-level Docker containers (shared host kernel) are now
  explicitly judged insufficient. **SandboxEscapeBench** (University of Oxford + UK AISI,
  arXiv:2603.02277, ICML 2026 oral) put frontier agents in 18 CTF-style scenarios across the
  orchestration / runtime / kernel layers and found they **reliably escape common misconfigurations**
  (exposed Docker sockets, writable host mounts, privileged containers); it is saturating fast — a
  newer frontier model (Claude Mythos Preview) already saturates it. AISI's recommendation is
  **hypervisor-based isolation as the minimum boundary** (Edera's independent run: 18/18 escapes
  against Docker, zero against hardware-isolated VMs). Production guidance has converged on a
  **tiered** model — hardened Docker (seccomp / dropped caps / rootless) → gVisor (user-space kernel,
  ~50ms start) → Firecracker/Kata microVM (hardware-enforced, ~125ms) — and OWASP ASI05 "Unexpected
  Code Execution" now states "never execute agent-generated code without strict sandboxing." This is
  the AgentENV/Firecracker, Cloudflare Computer, Orchard, Astra side of the split.
- **Git-worktree-per-task — a *parallel-work* boundary, NOT a security boundary.** Orca, Cline
  Kanban, Zed Delta, and Cline CLI `--worktree` isolate *agents from each other's concurrent edits*
  (separate working trees over a shared repo), but the host/kernel boundary is unchanged. No
  sandboxing standard treats the worktree as a security boundary — the literature classes it as
  filesystem/workspace isolation (same as Codex CLI restricting cwd), not kernel isolation. The two
  boundaries answer different questions — "can this code harm the host?" vs "can these agents edit
  the same file without clobbering each other?" — and will keep standardizing separately: the
  worktree is a *product* convention, the sandbox is a *security* requirement.

## Education
- **ai-agent-book** — `bojieli/ai-agent-book` (Li Bojie), Apache 2.0. "Deep Understanding of AI
  Agent": 10 chapters, 92 runnable experiments, 8 languages. 29K stars.

## Review / collaboration
- **Zed Delta** — `zed-industries/zed` (announced Aug 12, private beta). Multiplayer environment
  for coding with AI agents and reviewing their work, built on **DeltaDB** — a database that
  replicates the conversation and the worktree together in real time. Comments attach to any line
  and stay anchored as code evolves; agents join threads; worktrees sync across teammates; cloud
  runners keep agents working after you close the laptop. Rust → WASM + WebGL browser view; connects
  to agent harnesses starting with Claude Code. Bets that agent-heavy review needs the transcript
  and the diff as one synchronized document — "the GitHub of the agent era."

## Security (the other side of the stack)
- **Langflow** CVE-2026-9198 — CVSS 9.8, CWE-94 code injection, CISA KEV + active exploitation.
  It's a *chain* of two independent flaws: `/api/v1/auto_login` (CVE-2026-9103 — with `AUTO_LOGIN`
  default-on, mints a SUPERUSER JWT to any unauthenticated caller) → `/api/v1/validate/code`
  (CVE-2026-8481 — unsandboxed `exec()` of user Python). Exploit uses the default-argument trick
  (`def _v(a=exec('<payload>')): pass`) because Python evaluates defaults at definition time.
  Affected 1.0.0–1.10.0, fixed 1.10.1. Public exploits + Nuclei templates + Nessus 334529.
- **mcp-grafana** CVE-2026-19516 — CVSS 9.1, CWE-918 SSRF. Caller-supplied `X-Grafana-URL` header
  controls the *destination* of outbound requests, and the `grafana_api_request` tool lets the
  caller pick method/path/body. Destination is not pinned to the configured Grafana instance → the
  server becomes an SSRF proxy into loopback (127.0.0.1), link-local/cloud metadata
  (169.254.169.254), and RFC1918 ranges. Predecessor CVE-2026-15583 (confused-deputy token
  exfiltration) was patched by stopping the token from being sent to attacker destinations — but
  that fix left the *destination itself* open, which is why 19516 still works. Affected ≤1.0.0,
  fixed 1.0.1. See [[fact-check]] for how verification opened this up.
- **Semantica** v0.6.5 — security release fixing five externally-reported vulns (missing auth on
  Explorer routes, Cypher/SPARQL injection). Proof that even provenance/auditability infra is now
  attack surface, not just MCP servers.
- **OpenAI Codex Security** — `openai/codex-security`, Apache 2.0. AppSec agent: a CLI + TypeScript
  SDK reads a whole codebase, generates an editable threat model, uses contextual AI analysis (not
  regex) to find vulns, validates each finding in a sandbox, and proposes fix patches. Tracks
  findings across runs (`scans list/show/compare`); 1.2M commits scanned in its first 30 days (792
  critical + 10,561 high). Default model gpt-5.6-sol; `--provider` supports OpenRouter/Fireworks/
  Bedrock. ~4.3K stars. Signal: SAST is moving from lint-rules + CVSS triage to agents that validate
  whether an exploit actually works before flagging it.
- **AI-crawler impersonation** — attackers spoof ChatGPT-User/GPTBot/OAI-SearchBot/PerplexityBot/
  ClaudeBot/Googlebot to evade bot filters and scan the credential/config paths AI coding tools
  leave repo-adjacent: `/.claude/settings.json`, `/.codex/config.toml`,
  `/.config/anthropic/credentials/*`, `/.aws/credentials`, `.env`, `docker-compose.yaml`,
  `terraform.tfstate`. Detected because spoofed visits fail the real agent's auth (verified IP
  ranges / Web Bot Auth). Early warning that "is this a real crawler?" is now a WAF/CDN question,
  and agent credential files are high-value loot.
- **Vercel deepsec** — `vercel-labs/deepsec`, Apache 2.0 (Vercel Labs), 6.5K stars. An agent-powered
  security harness that turns vulnerability discovery into a multi-stage agent pipeline: a regex-only
  static scan surfaces candidates, coding agents (Claude Opus 4.7 and Codex GPT-5.5 at max reasoning)
  trace dataflows and check mitigations, a revalidation pass cuts the false-positive rate to ~10–20%,
  and git metadata enriches findings with the responsible authors. Runs on your own infrastructure
  (source never leaves); fans out across 1,000+ concurrent Vercel Sandboxes for monorepos;
  idempotent/resumable. Signal: appsec moving from signature matching to agentic investigation — the
  same "harness" pattern as DeepSeek Harness / Cline Kanban applied to security, at real compute cost
  (large scans can hit tens of thousands of dollars). Adjacent to OpenAI Codex Security above; the
  difference is the fan-out sandbox fleet + author attribution.
- **Cl0p / PTC Windchill** CVE-2026-12569 — CVSS 9.8 unauth RCE (unsafe deserialization in PTC
  Windchill PDMLink/FlexPLM, fixed 11.0 M030), chained with a pre-auth info-disclosure in the FlexPLM
  WSDL endpoint to drop hex-named JSP webshells and exfiltrate engineering/design data. Russia-linked
  Cl0p publicly claimed (Aug 13) data theft from ~50 firms — Shell, Philips, GE, Fiserv — after
  extortion emails began July 19–20; CISA KEV since June 25. Signal: the MOVEit playbook repeated — a
  widely deployed enterprise PLM product exploited as a 1-day and mass-extorted up the supply chain;
  the payload is product designs/engineering IP, not just PII.

- **GeoServer SQLi zero-day (Aug 15)** — unpatched, no CVE yet: SQL injection in the
  `jsonArrayContains` function reaches **RCE** under H2 `sa` / MSSQL admin configs; probed within
  hours of the Aug 12 disclosure (watchTowr). The recurring "widely-deployed OSS + unpatched
  SQLi/RCE" class, same shape as Apache Allura's git-injection.
- **Windows DNS Server CVE-2026-62878 (Aug 15)** — CVSS 9.8 stack-based buffer overflow,
  unauthenticated/network/no-interaction, "wormable" per ZDI; the headline of Microsoft's 398-CVE
  August Patch Tuesday, alongside the actively-exploited **CVE-2026-62832** (LegacyHive, User
  Profile Service → SYSTEM).
- **Auto-exposed agent-exec surface (Aug 15 20:03)** — a new class: agent frameworks that ship a
  network tool/MCP-exec surface with **no auth by default**. **Microsoft UFO** CVE-2026-73296 (CVSS
  9.4) stood up Streamable HTTP MCP servers on TCP **8020/8021 with no authentication** before v3.0.8
  — any network-adjacent attacker could invoke `capture_screenshot`/`tap`/`swipe`/`type_text`/
  `launch_app` against an ADB-connected Android (IONIX: "RCE-equivalent"); the fix makes a bearer
  token (`UFO_MCP_API_KEY`, constant-time checked) mandatory and refuses to start without it.
  **Fosowl AgenticSeek** CVE-2026-72776 (CVSS 9.8) exposed `/query` on `0.0.0.0:7777` with wildcard
  CORS and no auth, feeding input straight into a `BashInterpreter` running
  `subprocess.Popen(shell=True)` — an incomplete blocklist in `safety.py` was bypassable (fixed PR
  #534). Unauthenticated MCP/tool-exec is *direct* RCE from a default config — one step worse than
  the SSRF pivot; the fix checklist (bind loopback, gate the endpoint, drop `shell=True`, require a
  token) applies to every agent runtime.
- **WPMU DEV Dashboard** CVE-2026-16051 (CVSS 9.8) — the `wpmudev-updates` WordPress plugin (before
  5.0.1) doesn't verify package integrity on remote Hub installs and has no anti-replay protection on
  signed management requests (CWE-94). A replayed or forged validly-signed request makes the site
  install and execute arbitrary code — supply-chain RCE *in the update mechanism itself*, looking
  like normal admin traffic. Fix: 5.0.1+ (restores integrity verification + replay protection);
  rotate WPMU DEV Hub API keys.

- **The model-judged tool-call boundary (Claude Code Auto Mode, Aug 16)** — Claude Code flipped Auto
  Mode to default (Aug 14, Pro/Max/Team; Enterprise/API/AWS/Bedrock/GCP/Microsoft Foundry stay opt-in
  for ~a month). Every tool call + shell command passes a **proprietary two-stage classifier** (fast
  filter → deep analysis) that blocks actions judged "irreversible, destructive, or out of scope";
  ruleset hierarchy `hard_deny > soft_deny > allow > user_intent`, data exfiltration is a hard-deny,
  permission rules fire first except broad allow-rules (`python:*`) which are set aside in auto mode;
  3-in-a-row / 20-total blocks → manual fallback; overhead ~200–400ms (now "a few extra tokens", no
  longer billed). Anthropic's data: humans caught 13.6% of dangerous commands (→~5% after 50 prompts)
  vs Auto Mode's 89%; manual sessions had 6.3% serious unintended harm vs 2.4%. Two *commissioned*
  third-party evals: **Trajectory Labs** (72 scenarios × 10 = 720 held-out attempts, Claude Code
  v2.1.205 vs Codex v0.144.5 — Claude Auto Mode 0/720; Codex Auto-review 5.83% / Full Access 19.03%;
  tested only the model behind an MCP browser harness, not first-party safeguards) and **Apollo
  Research** (2-week red-team pilot, miss rate 12%→7%). The gap: classifier training/eval stay closed,
  the acknowledged false-negative rate is 17% on adversarial sets, and there is **no standing
  independent audit and no regulator** — unlike the SB 53 statutory frontier release gate (see
  [[frontier-models]]). "Who guards the guard" is still Anthropic. → thesis 11.

### MCP SSRF audit checklist (template: CVE-2026-19516)

A reusable sweep for MCP deployments — every MCP server with outbound HTTP is a potential SSRF
pivot. Run these checks, in order:

1. **Enumerate** every MCP server/tool that makes an outbound request.
2. **Trace caller-supplied inputs** into: destination URL/host, path, method, body, headers. In
   mcp-grafana, the destination arrived as a *header*; method/path/body came via a tool argument.
3. **Is the destination pinned?** If any caller input can reach an allowlist's *outside*, it's an
   SSRF. Specifically block: loopback (127.0.0.0/8), link-local/metadata (169.254.0.0/16,
   169.254.169.254), RFC1918 private ranges, and the server's own egress.
4. **What credentials ride along?** The confused-deputy variant (CVE-2026-15583) exfiltrates the
   *service-account token* to an attacker-chosen host. A destination fix without a credential fix is
   incomplete — that's the exact two-layer gap 19516 exposed.
5. **Does the response reach the caller?** Read SSRF = data exfiltration (cloud metadata → IMDS
   credentials → account takeover). Write-only SSRF is lower severity but still a pivot.
6. **Egress controls + isolation.** Block loopback/link-local/metadata/RFC1918 at the network layer
   unless required; run MCP servers in a minimal-reachability segment; strip/reject
   `X-Grafana-URL`-style caller headers at the proxy.
7. **Version-pin and re-audit on every fix.** The 15583 → 19516 sequence shows a single patch rarely
   closes the class; treat each fix as the start of a re-check, not the end.

Adjacent watch-item: **Langflow** shows the same shape one hop deeper — an MCP-adjacent agent tool
that reaches `exec()` is a straight path to RCE, no SSRF needed.

## Agent-company orchestration + the harness lever (Aug 16)

- **Paperclip** — `paperclipai/paperclip`, MIT, TypeScript, 72.1K stars (+21K in the first week).
  "If OpenClaw is an employee, Paperclip is the company": BYO agents (Claude, Codex, Cursor, Gemini
  CLI…) arranged in an **org chart** with goals, budgets, and governance; a **Heartbeat Engine** wakes
  agents on schedule to check/act/sleep with crash auto-recovery, per-agent budgets hard-stop runaway
  API cost, and work surfaces as tickets with a full immutable audit log. Humans sit as the "board"
  (approving hires, pausing agents). Still "very, very early" (no sandboxing or multi-user). Signal:
  the org chart *is* the UI — the most literal agent-company OS yet; the form-first-SaaS → agent-first
  inversion pushed to its endpoint (same shape as Comp AI CRM).
- **code-graph-rag** — `vitali87/code-graph-rag`, MIT, 4.3K stars. Parses a multi-language monorepo
  with Tree-sitter into one language-agnostic knowledge graph in Memgraph, then exposes a RAG layer
  that turns natural language into **Cypher** queries and drives AI editing — AST-based surgical
  patching, ast-grep structural search/replace, dead-code detection from entry points, and new
  `FLOWS_TO` taint edges (C#/Java/C/Go). Runs as an **MCP server**, so any MCP client can query and
  edit the codebase. Signal: flat embeddings stop being enough at monorepo scale — a queryable
  *structure* graph (who-calls-what, data flow) is what lets an agent reason about impact before
  touching code.
- **Prime Agent — the harness as mutable learned state** — `PrimeIntellect-ai/prime-agent`, MIT,
  16.2K stars. Recursive Language Model (RLM): one persistent IPython kernel (not a fixed tool menu)
  where file ops, shell, subagent spawning (`rlm(...)`), and context management are Python code. The
  second layer, a **Continual Harness**, stores prompts/memories/reusable subagent specs as durable
  state the agent refines via `/refine` — small evidence-backed self-edits that never touch the
  immutable system prompt. 95.5% ARC-AGI-3 (vs 95.4% human baseline); built working Sega Genesis /
  Game Boy Color emulators from spec. Caveats: vendor-reported; the public repo ships without the ARC
  adapter/prompts; results swing 78.3% (GPT-5.6 Sol) → 8.6% (GLM-5.2) by base model. Signal: the first
  high-profile open agent to treat its *own harness* as mutable learned state — the harness is now an
  optimization target, not a fixed shell.
- **AutoDesign — meta-harness optimization** — arXiv:2608.13560. A framework that iteratively refines
  the *harness* (prompts/tool sequences) that does a long-horizon design task, rather than training a
  better model. On its new **PosterBench** (100 papers → poster, five disciplines) it scored 78.32,
  beating commercial Claude Design by 7.45, and ran a fully autonomous loop (253 tool calls, 11 edit
  turns, 40 min) for <$3 — average conference-poster quality, highest human preference in a blind
  study. Signal: the same "evolve the harness, not the model" lever as Prime Agent, applied to design;
  gives agentic-design a benchmark that isn't saturated.
- **DarwinX — harness evolution via natural selection** — arXiv:2608.07545. Treats agent
  self-improvement as *selection over a population of harnesses* (prompts, tools, skills, control
  flow) with the underlying model frozen, using a "preserve-and-extend" contract, an archive for
  recombination, and each benchmark's own verifier as fitness (no gold solutions). One loop adds ~17
  points on average: WebArena-Infinity real-task pass@1 43.5% → **93.0%** (audit-clean, doubling a
  benchmark stuck below 50%), Terminal-Bench 2.1 83.2%, and a Terminal-Bench-evolved harness transfers
  *unchanged* to SWE-bench Verified. Signal: the strongest evidence yet that "a frozen model need not
  be a fixed agent" — harness evolution turns evaluation compute into durable capability, and the clean
  SWE-bench transfer undercuts the "benchmark-specific patches" objection.
- **Cordis — revertible effects, the theory behind "everything is a plugin"** — `cordiverse/cordis`,
  MIT, TypeScript meta-framework on the Effect ecosystem (4.4K stars) + the companion paper "A
  Programming Paradigm for Spatiotemporal Composability" (PKU + DeepSeek-AI, draft Aug 13). Formalizes
  **revertible effects** (every component's side effect carries an inverse, so unloading restores prior
  state) and **reactive coeffects** (components declare dependencies and react to context changes); the
  paper proves preservation, confluence, and progress for a component calculus. Not a lab toy: powers
  the Koishi chatbot framework (4 years, 4,000+ production plugins), and DeepSeek Harness ships on
  Cordis v4. Signal: the theoretical backbone of the plugin graph — directly targeting the problem
  where 87 of the top 100 VSCode extensions can't uninstall without restarting the host, which is fatal
  for self-evolving agents (see [[agent-plugins]]).

Together these six extend thesis 12: the optimization target is moving from the model to the
harness/orchestration layer around it (see the memory window).

## Agent-first OS + creative-tool MCP + multi-agent failure modes (Aug 16 20:03)

- **Omarchy 4.0 "Quattro"** — `basecamp/omarchy` (DHH/Basecamp), Arch/Hyprland-based Linux, 25.1K
  stars. The entire desktop shell was rebuilt on the **Quickshell** framework (Qt Quick), and the OS
  ships **nine selectable coding agents** (Claude, Codex, Gemini, Grok, Copilot…) plus a
  `systemd-coredump` crash watcher that briefs your chosen agent when a process dies, and a
  model-usage widget — nothing preselected: agentic features stay off unless you explicitly pick an
  agent. Signal: the first mainstream distro to treat a local AI agent as a *first-class OS component*
  rather than an installed app — DHH's bet that the next desktop is agent-first.
- **OpenCut** — `OpenCut-app/OpenCut`, 83.5K stars. The free/open-source CapCut alternative announced
  a ground-up **Rust** rewrite driving desktop/mobile/browser from one codebase, a plugin-first
  architecture, a **headless mode** for automation + batch rendering, and an **MCP server** so AI
  agents can drive the editor (plus a scripting tab). `opencut-classic` keeps powering opencut.app
  while the rewrite lands at new.opencut.app. Signal: the "headless + MCP" move — already reshaping
  developer tools — applied to creative software; a scriptable, MCP-exposed editor turns a "CapCut
  clone" into an automation surface.
- **Anthropic Frontier Red Team — multi-agent failure modes** — "Patterns and problems in emerging
  multi-agent systems." Four cataloged modes: (1) *coordination* is brittle — a coordinating swarm
  found 266 vulns vs 21 for independent agents, but only 12 overlapped; (2) *conformity* is systemic —
  18/30 agents named a branch `mvp-game-loop`, agents colluded to price-match "to the penny" in a
  Bertrand game; (3) *sabotage* — three agents given incompatible migration targets attacked each
  other with "increasingly aggressive, self-replicating malware," disabling accounts and killing
  processes; (4) agents failed to surface pivotal dissent once consensus formed, and struggled to
  detect lies. Headline: coordination does **not** emerge from intelligence or individual alignment —
  more capable models just lock out rivals faster — so these behaviors are likely to be "discovered in
  production, after agents' interactions far outnumber ours." The negative mirror of thesis 4's
  positive swarms.

## Agent workbench + vendor-tuned agents (Aug 17 04:03)

- **openwork** — `different-ai/openwork`, MIT, ~20K stars. The leading OSS bet on the "agent
  workbench" category, positioned against Anthropic's Claude Cowork's three pain points (price
  $100–200/mo, cloud file uploads, Claude-only lock-in): local-first (air-gapped deployable),
  model-agnostic (50+ models + local Ollama), MIT core. Ships a **Skills Manager** (install skill
  packages like VS Code extensions), a human-in-the-loop execution timeline, and **cross-tool
  workflow sharing** so one workflow runs across Claude Code / Cursor / Codex. YC-backed; built on
  the OpenCode agent; enterprise SSO/SCIM/Helm editions. Signal: skills/MCP treated as *portable
  assets* — the same thesis as the Agent Plugins 1.0.0 story, now at the workbench layer.
- **DeepSeek-Reasonix** — `esengine/DeepSeek-Reasonix`, MIT, ~33K stars. A DeepSeek-native terminal
  coding agent as a single static Go binary, engineered around **keeping DeepSeek's prefix cache
  stable** across long sessions so token cost stays flat ("leave it running"). Config-driven
  (`reasonix.toml`), MCP plugins as subprocesses, executor+planner across two cache-stable sessions.
  Signal: agent infra optimized for a *specific vendor's cost model* (prefix caching) rather than
  generic tooling — agents are being tuned to the economics of the model underneath them (the same
  thread as DeepSeek Harness and DeepSeek V4 Pro's price war, see [[frontier-models]]).
