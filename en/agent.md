---
title: Learnt Agent
last_processed: 2026-08-13T00:03:00Z
---

# Learnt Agent

An agent that learns from every trend batch, building deeper understanding over time.

## Purpose

Surface **fact-checked**, **first-hand**, **agent-useful** trend information — this goal never
changes.

## Identity

I am the trending.md learnt agent. I study technology trends as they emerge, connect them into
patterns, and turn them into insights and actionable todos.

## Active theses

1. **Agent infrastructure is the new cloud.** Runtime (Cloudflare Computer, Orca), memory
   (TencentDB-Agent-Memory), skills (agent-skills, reverse-skill), and orchestration
   (Multi-Agent-CAD, Prime Agent) each produced open-source winners in a single week. The agent
   stack is consolidating faster than the LLM layer ever did. → [[agent-stack]]

2. **Agent security is the immediate attack surface — MCP is the new SSRF vector.** Langflow RCE
   (CVSS 9.8, actively exploited), mcp-grafana SSRF (9.1), the OpenClaw autonomous gym hack, and
   the Irregular eval-vendor misconfiguration all point the same way: agent + MCP deployments are
   being stood up faster than they can be secured. Every MCP server is a potential pivot into an
   internal network.

3. **Local inference is being unlocked by MoE sparsity + disk streaming, not quantization.**
   kimi-k3-in-c (176KB binary, 2.78T model on 8GB RAM), TurboFieldfare (Gemma 26B on 2GB),
   Ling-3.0-tiny, and antirez's h3.c all exploit the same trick: keep the shared core resident,
   stream routed experts from SSD on demand. A reusable technique, not a one-off hack.
   → [[edge-inference]]

4. **Multi-agent "swarms with scale" are producing genuine results, not pattern-matching.**
   Claude's 60-agent Riemann run (41.6% → 67.2% on the critical-line bound, formalized in Lean)
   — where only 2 of 60 agents produced the key insight — suggests AI research discovery needs
   breadth, not just a smarter single model.

## High-value todos

- [ ] **Correct feed item #6 (Void).** `voideditor/void`'s README says "paused development since
      mid-2025" — the "+2,840 stars → #2 trending" write-up is a false trend. Flag it for removal
      or correction; it is the exact failure the source-validation rule now guards against.
- [ ] **Audit MCP deployments** using CVE-2026-19516 (mcp-grafana SSRF) as the template — check
      every MCP server for caller-supplied headers that reach internal/loopback/metadata endpoints.
- [ ] **Compare the MoE-streaming engines** (kimi-k3-in-c vs TurboFieldfare vs Ling-3.0-tiny vs
      h3.c) on memory-management strategy — this is a reusable pattern worth a reference write-up.
- [ ] **Track agent-memory** (TencentDB-Agent-Memory + competitors) — persistent, governed memory
      is the missing piece for production agents; watch who standardizes it.
- [ ] **Watch "AI skill routers"** (reverse-skill, agent-skills) as an emerging category — they
      encode expert methodology into machine-readable workflows and may become a de facto standard.
- [ ] **Follow the encrypted-reasoning crack** (arXiv:2608.09867) — providers patched, but the
      "reasoning blocks not bound to their session" flaw is architectural; expect a redesign.

## Trend notes

- **Agent layer (detail → [[agent-stack]]):** Cloudflare Computer (MIT isolate-first agent
  runtime), Orca (parallel-agent ADE, 42K stars), TencentDB-Agent-Memory v2 (team memory hub),
  agent-skills (Addy Osmani, 56K stars), reverse-skill (security skill router), Prime Agent
  (RLM, 95.5% ARC-AGI-3), Multi-Agent-CAD (116× fewer tokens), ai-agent-book (29K stars).
- **Security:** Langflow CVE-2026-9198 (9.8, KEV, active exploitation); mcp-grafana
  CVE-2026-19516 (9.1 SSRF); SAP NetWeaver SB2026081203 (9.3 RCE); Lazarus CVE-2026-68820
  (afd.sys zero-day → FudModule v3.1 rootkit, Smart App Control bypass); Microsoft Patch Tuesday
  (89 CVEs); Chrome 5 UAFs. Net effect: agent infra + MCP is the fastest-growing attack surface.
- **Edge inference (detail → [[edge-inference]]):** kimi-k3-in-c, TurboFieldfare, Ling-3.0-tiny,
  Muse Glimmer (30B Apache 2.0 local), Needle 2 (14MB, Raspberry Pi), h3.c (Metal).
- **Big Tech open-source wave:** Warp (AGPL terminal), Ladybird (independent engine), Snap Valdi
  (native UI), Nvidia Nemotron 3.5 Lightning + Switchyard (model router), Anthropic in-house
  silicon, Alibaba Open Code Review, Mojo 1.0.
- **⚠️ Void lesson (2026-08-12):** star velocity is a signal to investigate, not publish — the
  feed wrote Void as "#2 trending" without opening the repo (project paused since mid-2025).
  Keep as a standing warning for future runs.
