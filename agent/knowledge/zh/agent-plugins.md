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

## 分叉定型：联盟 vs Anthropic（8 月 15 日）

**Agent Plugins 1.0.0 联盟**如今已明确：**OpenAI、Microsoft、GitHub、AWS、Vercel 与 Cursor
（Anysphere）**，加上**以核心维护者身份加入的 Google**——它们标准化的打包规范建立在 **Anthropic
自己的 MCP + Agent Skills** 之上。Anthropic 却**缺席**，转而为其 **Cowork** 单独交付了一套插件
系统。该格式如今有三个极点：`google/skills`（标准化包装层的参考）、`anthropics/skills`（规范作者
的正典之家），以及一个连规范作者本人都不加入的跨厂商打包规范。

**`cursor/plugins`**（MIT，约 2.8K stars）是 Cursor 官方的插件规范 + 市场：每个插件是一个目录，含
`.cursor-plugin/plugin.json` manifest，可打包六类组件中的任意几种——**rules**（`.mdc`）、**skills**、
**agents**、**commands**、**MCP servers** 与 **hooks**——带基于文件夹的自动发现，并随附 11 个官方
插件（每个社区插件都经人工审核）。它收敛到联盟所标准化的同一套 `skills/` + `mcp.json` 原语，因此
既是 1.0.0 的参考实现，*又*补充了 1.0.0 规范刻意留白的 Cursor 专属扩展（rules、hooks、canvases）。
密钥使用 `${VAR}` 占位符，在控制面板设置，绝不存进插件。

## Harness 插件 ABI：分层式收敛，而非扁平碎片化（8 月 15 日）

"harness 层会收敛到一个插件 ABI，还是像路由配置那样碎片化？"这个开放问题如今有了更清晰的答案：
**一种分层式收敛**——可移植核心在收敛，而 harness 外壳仍逐厂商。

- **可移植核心正在代码层面收敛。** OpenAI Codex 合并了 PR #35105（"Support Agent Plugins
  manifests"，2026-07-24 合并），该 PR 识别根 `plugin.json`（Agent Plugins 1.0 schema），把其可移植
  元数据 + `skills/` + `mcp.json` 映射进 Codex 的原生 manifest，并把 `.codex-plugin/plugin.json`
  保留为*回退覆盖层*（保留旧 manifest 优先级；拒绝不支持的 schema 版本）。Codex CLI 0.147.0 的
  变更日志已列明对可移植 Agent Plugins 的支持——厂商专属的 `.codex-plugin` 格式正被*叠加到*可移植
  标准之上，而非被其取代。`cursor/plugins` 如出一辙：以 `skills/` + `mcp.json` 为共享核心，以
  Cursor 专属的 rules/hooks/canvases 为客户端专属扩展。
- **harness 外壳仍逐厂商。** Claude Code 的 `.claude-plugin/plugin.json` 仍独立（Anthropic 不在
  TSC 中，也非首发客户端；其 8 月 7 日的 2.1.224 版本扩展了 zip 安装 + SHA-256 锁定）。DeepSeek
  Harness 的 Cordis 是一张完整的 harness 内部插件图（服务经 Fiber 链上的 Proxy 提供；hook 是类型化
  拦截扩展点），并且它显式地*桥接*而非采用——一个 bridge 插件指向现有 `hooks.json`，让外部
  Claude-Code/Codex 风格的外壳 hook 原样运行，而一个"原生 hook"只是一个普通 Cordis 插件。
- **所以：核心处有一个共享 ABI（`plugin.json` 背后的 Skills + MCP），外壳处的 hooks/apps/原生扩展
  逐厂商——并以桥接（Codex 的回退覆盖层、DeepSeek 的 hooks.json 桥接、Cursor 的扩展命名空间）在两者
  之间转译。** 这不是路由配置 DSL 所遭受的那种扁平碎片化；而是操作系统内核的形态：厂商专属运行时
  之上有一个共享的用户态 ABI。剩余锁定不在打包格式，而在*外壳*（hooks、权限、市场）——恰是 v1.0
  留白的"信任缺口"。

## 规范成为可执行的契约（8 月 15 日）

agent 编码的*工作流*层正围绕 spec-as-code 收敛。`github/spec-kit`（MIT，约 128.8K stars，单日 +1,160，
v0.12.11）打包了 GitHub 的 Spec-Driven Development：一个 `specify` CLI 脚手架化
constitution → specify → plan → tasks → implement 流水线，并以 slash 命令或 **Agent Skills 形式装进 30+
个 coding agent**（Copilot、Codex、Claude Code、Gemini CLI）。规范成为 agent 在每个检查点都要对照并校验的
"可执行事实来源"——对"能编译却丢了意图的 vibe coding"的明确回应。与每个 skills 包一样的取舍：用更多
前置 token 换取更可预测的输出（GitHub 仍标注为实验性）。

这正好落在 skills/评估这条线索所指的方向上：skills 不再只是产品操作手册，而是*工作流契约*——而评估缺口
的下一梯队正是 **Vero** 的仓库规模形式化验证（见 [[frontier-models]]）。写作侧的 spec-as-skill + 评估侧的
机器检验证明 = 让意图成为机器可检验的工件。

## 关注点

- Anthropic 会收敛（采用 `plugin.json`）还是分叉（保留 `.claude-plugin` + `agents.md`）？
- 信任缺口：第一个落地签名 + 权限模型的平台将赢得企业市场。
- v2 是否会从 skills + MCP 扩展到 hooks / subagents / slash commands——下一个锁死面。
- harness 插件 ABI：核心已收敛到 `plugin.json`——逐厂商的*外壳*（hooks、权限、市场）如今会否成为锁定
  面，还是坍缩进 v2？
- 谁会标准化 agent 技能评估——Ponytail 的基准所指向的"技能的 MMLU"？
- spec-kit 的 spec-as-code 会否成为插件/技能标准的正式组成部分（v2），还是停留在 GitHub 专属的工作流层。
