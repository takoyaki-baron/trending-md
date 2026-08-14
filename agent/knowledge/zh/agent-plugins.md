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

## skills 如今也由演示捕获（而非手写 markdown）

`microsoft/skill-recorder`（MIT，约 3K stars）颠倒了 skills 的写作方式：一个桌面应用记录屏幕上的
工作会话（点击、应用/窗口切换、访问的页面、剪贴板、可选旁白），再用 GitHub Copilot CLI 把它重构成
"意图 + 有序步骤"，并输出可复用的 `SKILL.md`（或 Microsoft Scout / Copilot Cowork / Copilot Studio 的
自动化）。它刻意不是一个宏录制器：生成的 skill 优先调用 agent 的原生工具（`gh`、`web_fetch`、API），
仅在必要时回退到 UI 自动化，因此能泛化并抵御 UI 变更。"演示一次、永久复用"把 `SKILL.md` 固化为跨
Microsoft、Claude Code、Codex、Goose 的共享捕获格式——并延伸了本页的论点：skills 格式正在成为分发
*任意* agent 能力的基座，而不只是产品操作手册。

## 插件如今组合的是整个 harness（而不只是技能）

插件*模式*已经跃出技能层，开始塑造整个 harness。`deepseek-ai/deepseek-harness`（MIT，v0.1，约
38.9K stars）在其 **Cordis** 插件系统背后，把模型、工具、技能、会话、沙箱、存储、调度与 UI 全部
做成可组合插件——开发者在配置层扩展或替换能力。"万物皆插件"正是 Agent Plugins 1.0.0 标准化的
同一思想，只是高了一层——但 DeepSeek 自建了*自己的*插件系统，而非采用 1.0.0 格式。随着模式扩散，
格式正在碎片化：Agent Plugins 1.0.0（打包）、Cordis（harness 内部）与各 harness 自有机制
（`.claude-plugin`、`agents.md`、Codex 扩展）并存。关注 harness 层是否会收敛到一个插件 ABI。

## 技能如今必须自证其言（评估缺口）

技能这一类目此前一直在"宣称"而非"证明"——直到现在。**Ponytail**（`DietrichGebert/ponytail`，约
82K stars）这个"最懒资深工程师"技能（一个七级决策阶梯：在写最小可用代码之前，先检查它是否需要
存在/是否已存在/是否是标准库一行代码），最初带着"减少 80–94% 代码"的宣称发布。Scott Logic 的
Colin Eberhardt 提出质疑——一条光秃秃的"遵循 YAGNI 原则"提示词在那个基准上就击败了它——作者于是
重建了一个*可复现*的基准（无头 Claude Code 在一个真实 FastAPI/React 仓库上完成十二张功能工单），
并把宣称公开修正为平均约少 54% 代码 / 约低 20% 成本 / 约快 27% 执行。这正是整个类目缺失的模板：
一个让技能*证明*其宣称的公开行为测试框架。目前尚无共享评估标准——"技能的 MMLU"是开放缺口；谁先
交付谁就拥有技能市场。

## Anthropic 推出规范的正典之家（8 月 14 日）

`anthropics/skills` —— Anthropic 官方的 Agent Skills 公开仓库（169K stars）——如今成为它亲手编写的
这个格式的事实正典之家。该仓库收录了规范（托管于 agentskills.io）、一个可复用的 skill 模板，以及
参考 skills：驱动 Claude 产品内文档编辑的 source-available **document skills**（`docx`、`pdf`、
`pptx`、`xlsx`），外加 `skill-creator`、`mcp-builder` 与 `artifacts-builder`。在 Claude Code 中它
以插件市场形式安装（`/plugin marketplace add anthropics/skills`）。这在一定程度上回答了"Anthropic
会收敛还是分叉？"这一关注项：即便它仍缺席 Agent Plugins 1.0.0 联盟，Anthropic 仍在交付自己的正典
参考实现（规范 + 生产级 document skills）——该格式如今有*两个*参考极点：`google/skills`（标准化
包装层的参考）与 `anthropics/skills`（规范作者的正典之家）。其他所有 skill 库如今都要对着这两者
来衡量。

## 关注点

- Anthropic 会收敛（采用 `plugin.json`）还是分叉（保留 `.claude-plugin` + `agents.md`）？
- 信任缺口：第一个落地签名 + 权限模型的平台将赢得企业市场。
- v2 是否会从 skills + MCP 扩展到 hooks / subagents / slash commands——下一个锁死面。
- harness 插件格式会否碎片化（Cordis vs Agent Plugins 1.0.0 vs `.claude-plugin`）？
- 谁会标准化 agent 技能评估——Ponytail 的基准所指向的"技能的 MMLU"？
