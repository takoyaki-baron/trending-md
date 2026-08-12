---
title: Agent 基础设施栈
topic: agent-stack
created: 2026-08-13
---

# Agent 基础设施栈（2026 年 8 月）

AI agent 技术栈的各个组成部分，在 2026 年 8 月的趋势窗口中各自诞生了开源赢家。

## 运行时 / 执行基座
- **Cloudflare Computer** — `@cloudflare/computer`，MIT。以 SQLite 为后端的持久化虚拟文件系统；
  在快速的 serverless isolate 与完整的 Linux 容器之间编排（容器仅用于 <10% 的 agent 工作）。
  属于 Cloudflare Agents Week 2026。7,300+ stars。
- **Orca** — `stablyai/orca`，MIT，TypeScript。"Agent Development Environment"：并行运行多个 AI
  coding agent，每个都在隔离的 git worktree 中。27+ 个 CLI agent、移动端伴侣、WebGL 终端。42K stars。

## 记忆
- **TencentDB-Agent-Memory v2** — `TencentCloud/TencentDB-Agent-Memory`，MIT。把对话/文档/代码
  转换为 Chat Memory、Skills、LLM-Wiki、CodeGraph。团队治理（ACL），面向 Claude Code/OpenAI 协议
  的 Memory Proxy。15K+ stars。SQLite + sqlite-vec（BM25）。

## 技能 / 路由
- **agent-skills** — `casualuser/agent-skills`（Addy Osmani），MIT。24 个 SKILL.md 工作流，
  编码资深工程师的纪律（代码评审、TDD、安全、CI/CD、发布）。56.9K stars。
- **reverse-skill** — `zhaoxuya520/reverse-skill`，MIT。20+ 安全场景（APK/二进制逆向、渗透测试、
  CTF、EDR 绕过），41 条路由规则 + 163 个回归测试。22.4K stars。
- **Qwen-MM-Plugins** — `QwenLM/Qwen-MM-Plugins`，Apache 2.0。8 项多模态能力（视觉、视频记忆、
  Blender/FreeCAD CAD）以可安装 skill + MCP 的形式提供。可升级竞品 harness 来调用 Qwen 模型。

## 编排 / harness
- **Prime Agent** — `PrimeIntellect-ai/prime-agent`，MIT。Recursive Language Model（RLM）：
  把上下文作为持久化 IPython REPL 中的一等变量；用于自我改进的 Continual Harness。
  使用 Opus 5 达到 95.5% ARC-AGI-3。
- **Multi-Agent-CAD** — `Pan-Chera/Multi-Agent-CAD`（清华 IEI Lab），MIT。4-agent 的 text-to-CAD，
  采用紧凑的结构化 JSON 状态传递；token 消耗比单 agent 少 116×。

## 教育
- **ai-agent-book** — `bojieli/ai-agent-book`（李博杰），Apache 2.0。"Deep Understanding of AI
  Agent"：10 章，92 个可运行实验，8 种语言。29K stars。

## 安全（技术栈的另一面）
- **Langflow** CVE-2026-9198 — CVSS 9.8 RCE，经 `/api/v1/auto_login` + `/api/v1/validate/code`；
  CISA KEV，正被积极利用。1.10.1+ 已修复。
- **mcp-grafana** CVE-2026-19516 — CVSS 9.1 SSRF，经调用方可控的 `X-Grafana-URL` 请求头。
  1.0.1 已修复。
