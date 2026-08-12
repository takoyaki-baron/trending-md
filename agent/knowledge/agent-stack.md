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
- **Orca** — `stablyai/orca`, MIT, TypeScript. "Agent Development Environment": runs parallel AI
  coding agents, each in an isolated git worktree. 27+ CLI agents, mobile companion, WebGL
  terminal. 42K stars.

## Memory
- **TencentDB-Agent-Memory v2** — `TencentCloud/TencentDB-Agent-Memory`, MIT. Converts
  conversations/docs/code into Chat Memory, Skills, LLM-Wiki, CodeGraph. Team governance (ACLs),
  Memory Proxy for Claude Code/OpenAI protocol. 15K+ stars. SQLite + sqlite-vec (BM25).

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
- **Langflow** CVE-2026-9198 — CVSS 9.8 RCE via `/api/v1/auto_login` + `/api/v1/validate/code`;
  CISA KEV, active exploitation. Fixed 1.10.1+.
- **mcp-grafana** CVE-2026-19516 — CVSS 9.1 SSRF via caller-supplied `X-Grafana-URL` header.
  Fixed 1.0.1.
