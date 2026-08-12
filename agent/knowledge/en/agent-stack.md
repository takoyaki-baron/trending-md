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
  needed for <10% of agent work). Part of Cloudflare Agents Week 2026. 7,300+ stars.
- **Cloudflare OS** — `cloudflare/cloudflare-os`, open source. Browser-based AI workspace: build
  apps from natural language; V8-isolate sandbox, zero-trust by default (network off,
  "Gatekeepers" for sensitive actions). Cloudflare Agents Week 2026, alongside Computer.
- **Orca** — `stablyai/orca`, MIT, TypeScript. "Agent Development Environment": runs parallel AI
  coding agents, each in an isolated git worktree. 27+ CLI agents, mobile companion, WebGL
  terminal. 42K stars.

## Memory
- **TencentDB-Agent-Memory v2** — `TencentCloud/TencentDB-Agent-Memory`, MIT. Converts
  conversations/docs/code into Chat Memory, Skills, LLM-Wiki, CodeGraph. Team governance (ACLs),
  Memory Proxy for Claude Code/OpenAI protocol. 15K+ stars. SQLite + sqlite-vec (BM25).

## Knowledge / provenance
- **Semantica** — `semantica-agi/semantica`, MIT, 4.1K stars. Self-hosted graph-native layer for
  agents: RDF/LPG dual-graph storage, Rete reasoning engine, W3C PROV-O provenance on every derived
  fact, 7 vector-DB backends. Deterministic graph reasoning + LLM only for fuzzy extraction →
  auditable, reproducible decisions. `pip install semantica`.

## Skills / routing
- **agent-skills** — `casualuser/agent-skills` (Addy Osmani), MIT. 24 SKILL.md workflows encoding
  senior-engineer discipline (code review, TDD, security, CI/CD, ship). 56.9K stars.
- **reverse-skill** — `zhaoxuya520/reverse-skill`, MIT. 20+ security scenarios (APK/binary RE,
  pentest, CTF, EDR bypass) with 41 routing rules + 163 regression tests. 22.4K stars.
- **Qwen-MM-Plugins** — `QwenLM/Qwen-MM-Plugins`, Apache 2.0. 8 multimodal capabilities (vision,
  video memory, Blender/FreeCAD CAD) as installable skills + MCP. Upgrades competing harnesses to
  call Qwen models.

## Orchestration / harness
- **Prime Agent** — `PrimeIntellect-ai/prime-agent`, MIT. Recursive Language Model (RLM): context
  as first-class variables in a persistent IPython REPL; Continual Harness for self-improvement.
  95.5% ARC-AGI-3 with Opus 5.
- **Multi-Agent-CAD** — `Pan-Chera/Multi-Agent-CAD` (Tsinghua IEI Lab), MIT. 4-agent text-to-CAD
  with compact structured JSON state-passing; 116× fewer tokens than single-agent.

## Education
- **ai-agent-book** — `bojieli/ai-agent-book` (Li Bojie), Apache 2.0. "Deep Understanding of AI
  Agent": 10 chapters, 92 runnable experiments, 8 languages. 29K stars.

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
