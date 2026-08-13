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

## Workspace / all-in-one
- **Macro** — `macro-inc/macro`, AGPL-3.0, SolidJS + Rust backend (167 crates, 42 deployable
  services). All-in-one team workspace: Gmail-style email, channels/DMs, Linear-style tasks,
  CRDT-based docs, a 2D canvas, CRM, calls, and agents — everything @linked into a bidirectional
  graph with shared AI memory. "Fully open source — not open core"; team memory exposed via MCP
  with no rate limits. SOC 2 Type II / ISO 27001. ~1.6K stars.

## Knowledge / provenance
- **Semantica** — `semantica-agi/semantica`, MIT, 4.1K stars. Self-hosted graph-native layer for
  agents: RDF/LPG dual-graph storage, Rete reasoning engine, W3C PROV-O provenance on every derived
  fact, 7 vector-DB backends. Deterministic graph reasoning + LLM only for fuzzy extraction →
  auditable, reproducible decisions. `pip install semantica`. **v0.6.5** is a security release
  fixing five externally-reported vulns (missing auth on Explorer routes, Cypher/SPARQL injection).

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
