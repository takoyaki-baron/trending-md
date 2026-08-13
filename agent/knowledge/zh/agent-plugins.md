---
title: Agent Plugins——可移植的 agent 扩展标准
topic: agent-plugins
created: 2026-08-13
---

# Agent Plugins 1.0.0 + Agent Skills 格式（2026 年 8 月）

把 AI agent 的 *skills* 与 *MCP server* 打包进一个可移植、厂商中立的插件的开放标准。**2026 年
8 月 6 日**发布——正是记忆窗口标记为高价值待办的"Agent Skills 格式之争"的收敛点。

## 两层

1. **Agent Skills**——一个 skill 是一个文件夹，含必需的 `SKILL.md`（元数据 `name` + `description`
   加指令）以及可选的 `scripts/`、`references/`、`assets/`。最初由 **Anthropic** 编写并以开放
   标准发布；被一长串客户端采纳（Cursor、VS Code、GitHub Copilot、Gemini CLI、Claude Code、
   ChatGPT/Codex 等）。以*渐进式披露*加载：发现（name + description）→ 激活（完整 `SKILL.md`）
   → 执行。
2. **Agent Plugins 1.0.0**——在 skills *之上*的打包层。一个 plugin 是一个目录，含 `plugin.json`
   （manifest；仅 `$schema` + `name` 必填）、`skills/`（每个 skill 一个子目录，采用 Agent Skills
   格式）、`mcp.json`（带显式传输类型的 MCP server 声明——stdio / Streamable HTTP / HTTP+SSE）。
   组件独立失效；v1.0 只标准化 skills + MCP server——hooks、自定义 agent、slash command 仍是
   客户端专属。

## 联盟（已核实——这正是 feed 措辞不精确之处）

- **技术指导委员会（创始）：** Amazon（AWS）、Cursor（Anysphere）、Microsoft、OpenAI，以及
  **Vercel（提案发起方）**。
- **Google 同日作为核心维护者加入**（Kevin Hou，Google DeepMind 高级主任工程师）——是维护者，
  而非创始 TSC 成员。
- **Anthropic 明显缺席**，尽管它编写了底层的 Agent Skills 规范以及启发了该标准的
  `.claude-plugin` 格式。Claude Code 也不是首发客户端。
- 首发客户端：VS Code、GitHub Copilot、Cursor、ChatGPT、Codex、Kiro。
- 许可：规范 CC-BY-4.0，代码 Apache-2.0；项目名称/logo/域名由中立实体托管。

## 它刻意留白之处（信任缺口）

v1.0 是"一个打包格式，仅此而已"。它*没有*定义安装机制、分发协议、权限模型、沙箱、信任/溯源
校验或应用市场。plugin 在安装时被隐式信任，这让每个平台的分发渠道成为事实上的守门人——批评者
称其为"薄标准"，可能固化现有平台领先者。它是在 IETF 的 DAWN 工作组仍在争论发现层时就发布的：
**先发布，胜过共识。**

## 为什么重要

一个 skill 现在无需重新打包就能跨 ChatGPT、Copilot、Cursor、VS Code 运行。触发点：
`google/skills`（Apache 2.0，在 Google Cloud Next 2026 发布时仅 13 个 skill，现已约 110）恰在
行业标准化这一包装层时成为参考实现。路由/插件层与 [[smart-routing]] 中的"先路由再计算"控制点
是同一回事，只是高了一层：谁拥有包格式，谁就拥有分发。

## skills 如今也编码"品味"（而不仅是产品操作手册）

生态正在从"如何使用某产品"扩展到*手艺*。`cathrynlavery/diagram-design`（MIT，约 10.2K stars，
单日 +2,951）是一个面向 Claude Code/Codex/Pi 的 Agent Skills 包，把 27+ 种编辑级图表生成为自包含
的 HTML + SVG，并把整套设计系统编码为机器可读规则（4px 网格、1px 细线、单一强调色、三字体栈）。
它把"图表质量"从提示词运气变成一份模型照做的规则文件——证明 skills 格式不只是厂商产品粘合剂，
而是品味/标准分发的基座。

## 关注点

- Anthropic 会收敛（采用 `plugin.json`）还是分叉（保留 `.claude-plugin` + `agents.md`）？
- 信任缺口：第一个落地签名 + 权限模型的平台将赢得企业市场。
- v2 是否会从 skills + MCP 扩展到 hooks / subagents / slash commands——下一个锁死面。
