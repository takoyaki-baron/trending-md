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

## 可逆效应：插件图背后的理论（8 月 16 日）

`cordiverse/cordis`（MIT，4.4K stars）+ 其论文《A Programming Paradigm for Spatiotemporal
Composability》（北大 + DeepSeek-AI，8 月 13 日草稿）形式化了让"万物皆插件"对自进化 harness 而言
安全的两大思想：**可逆效应**（每个组件的副作用都携带逆操作，卸载时干净地恢复先前状态）与**响应式
协效应**（组件声明依赖并对上下文变化做出反应），并为组件演算证明了保持性/合流性/进展性。它是
生产级的——Koishi 已在它之上运行四年（4,000+ 插件），DeepSeek Harness 也运行在 Cordis v4 上。论文的
动机数据：前 100 大 VSCode 扩展中有 87 个不重启宿主就无法卸载——这对一个重载时不能丢失上下文的自进化
agent 是致命的。这是 Agent Plugins 1.0.0 打包层的理论对应物：1.0.0 打包的是*什么*在流转，Cordis 治理
的是*组件如何组合与回退*。

## 技能如今必须自证其言（评估缺口）

技能这一类目此前一直在"宣称"而非"证明"——直到现在。**Ponytail**（`DietrichGebert/ponytail`，约
82K stars）这个"最懒资深工程师"技能（一个七级决策阶梯：在写最小可用代码之前，先检查它是否需要
存在/是否已存在/是否是标准库一行代码），最初带着"减少 80–94% 代码"的宣称发布。Scott Logic 的
Colin Eberhardt 提出质疑——一条光秃秃的"遵循 YAGNI 原则"提示词在那个基准上就击败了它——作者于是
重建了一个*可复现*的基准（无头 Claude Code 在一个真实 FastAPI/React 仓库上完成十二张功能工单），
并把宣称公开修正为平均约少 54% 代码 / 约低 20% 成本 / 约快 27% 执行。这正是整个类目缺失的模板：
一个让技能*证明*其宣称的公开行为测试框架。目前尚无共享评估标准——"技能的 MMLU"是开放缺口；谁先
交付谁就拥有技能市场。

**注记更新（08-25 20:03）：** `DietrichGebert/ponytail` 以**约 110k stars**（原约 82k）再度现身，如今为 **20+
个 agent** 提供适配器及 `/ponytail-review` + `/ponytail-audit` 斜杠命令，其基准重述为约少 54% 代码 / 约低 20%
成本 / 约快 27% / 100% 安全——80–94% 的单次数字仍保持自我修正（issue #126）。token 预算纪律（YAGNI）已成
*产品化*类目；其基准仍是单一作者的复现，并非共享语料，故「技能的 MMLU」缺口未变。

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

## 技能如今能把 agent 锚定到某一本书（8 月 16 日）

`virgiliojr94/book-to-skill`（21.4K stars）把一本技术书、文件夹或论文集蒸馏成一个结构化的 **Agent
Skill**（`SKILL.md` + 逐章文件 + 术语表 + 模式 + 速查表），在 Claude Code、Copilot CLI 或 Amp 中按需
加载。它是编译期抽取而非查询期 RAG：作者点名的框架与决策规则变成文件，agent 按需读取相关章节，因此
答案始终锚定在你手里那本书上。在真实书籍上实测，相比把全文塞进上下文可省 **24–51×** token（一本
400 页的书 ≈ 200K token → ~4K 核心 + 每章 ~1K）。信号："把 agent 锚定到某一本书"（runbook、ADR、
入职资料）是反复出现的需求，Agent Skills 格式正在吸收它——模糊检索与对抽取结构做确定性推理之间的
区别。这又是"skills 格式是分发*任意* agent 能力的基座"的一个数据点（见上文的品味/录制/spec-kit 各线）。

## Skills 现在编码输出 UX（08-17 04:03）

`ayghri/i-have-adhd`（~18K stars）是一个跨 agent 的 `SKILL.md`（Claude Code、Codex、Cursor、Gemini CLI、
Copilot、Zed…），改变的是*格式而非能力*：十条规则——第一行就是命令/路径，多步工作编号，每轮以一个 <2 分钟
的下一步收尾，禁止前言/回顾/跑题——可按会话安装（`/i-have-adhd`）或常开。一个 `SKILL.md` 拉到 ~18K stars，是
对"人们对 agent 输出真正不爽的点"的可度量投票，也再次证明 skills 格式如今是分发*任意* agent 定制的最小单元
——产品 how-to、品味（diagram-design）、工作流契约（spec-kit）、书籍锚定（book-to-skill），如今还有输出 UX。
与 openwork 的跨工具工作流共享一样，是"可移植资产"信号（见 [[agent-stack]]）。

## Skills 现在发布专业安全能力（8 月 18 日）

`mukul975/Anthropic-Cybersecurity-Skills`（28k stars，Apache-2.0，与 Anthropic 无关）是一个**跨 29 个领域、
817 个结构化网络安全技能**的库，每个都遵循 agentskills.io 标准（YAML frontmatter + When-to-Use/Prerequisites/
Workflow/Verification），让 coding agent 照着资深分析师的剧本走，而不是瞎猜工具命令。**其中 805/817 映射到
MITRE ATT&CK v19.1**，并有 NIST CSF 2.0、D3FEND 与 NIST AI RMF 映射，兼容 26+ 个 agent 平台；每个 PR 都在
48 小时内接受技术准确性与 agentskills.io 合规性评审。

信号：这是迄今最清晰的实例，证明 skills 格式是*非平凡专业专长*的分发单元——编码了 MITRE ATT&CK 映射的安全
规程，而非格式微调。它也让评估缺口论点（本页的"技能的 MMLU"关注项）更加尖锐：这里的评审门槛是*人工*的
（48 小时技术评审），而非机器评估——因此这一类别仍在靠*断言 + 人工评审*发布，而非可复现的基准。第一个给
安全剧本装上自动化、可基准化评估（Ponytail 的模板）的技能库，将拥有那个缺口。

## 有量化结果的 skills（8 月 19 日 20:03）

"技能的 MMLU"缺口（本文件的常驻关注项）正从厂商一侧开始被填补——两个 skill 如今交付的是*量化*数字，而非断言：

- **JetBrains/benjamin-plus-skill**（MIT，约 745 token 规则集）改变编码 agent *查找与等待的方式*——一次通关侦察、
  50 行的"锁孔读取"而非整文件、环境只探测一次、把任务自身的验证命令当作 done 的定义——而不改变它构建的东西。
  在 80 个 SkillsBench 任务（Claude Code + Sonnet 5）的配对 A/B 中，注入的 skill 实现了**成本中位数 −17.9%、
  质量不变**（7 更好 / 5 更差 / 68 持平）；一次 Codex SWE-bench 运行显示 −4.4% 成本、−20% 工具调用。**交付方式
  的发现是可直接落地的部分：** 注入时它省钱；作为可发现文件夹安装时，"它什么也省不了"。厂商发布有量化结果的
  skill 十分罕见——这正是 Ponytail 所指的模板，出自真正的工具厂商。
- **Spielewoy/autoprompt-skill**（MIT，v1.0.0）把六个编码 agent（Claude Code、Codex、OpenCode、Kilo Code、VS
  Code、Prime Agent）包进一个分层多 agent 层级——协调 / 管理 / 执行 / 独立判断——使单一 agent 永远无法既规划、
  又批准、还验证自己的工作。在 OpenCode 1.18.7 的 Terminal-Bench 2.1 上，把解题从 **60/89 提升到 73/89 —— 失败
  减少 45%**——代价是约 3× 时间 / ~2× token（单次量化运行，而非扫描）。**信号：**"跨 agent 分离规划/批准/验证"
  是人人认同的治理模式，却很少有 skill 以数字交付——这是评估缺口线索（以及 thesis 4 协调发现的）多 agent 镜像：
  对"一个 agent 给自己的作业打分"的修复是结构性分离。

## 方法论成为最大的 skills 仓库（8 月 20 日 04:03）

**obra/superpowers**（MIT，Jesse Vincent）以 **274k stars** 成为 GitHub 上星数最多的"agentic skills 框架"，
高居日榜前列。它把一套软件开发*方法论*打包成可组合 skills 加启动指令，让 agent 真正使用它们：头脑风暴、
实现规划、**TDD**、系统化调试、并行执行、代码评审与收尾分支工作流。可作为插件从 Anthropic 的 marketplace
安装，也面向 Codex 列出；跨 Claude Code、Copilot、Cursor、Windsurf 与 Gemini CLI 工作。含 Subagent-Driven
Development（SDD）工作流——v6.0.3 把 SDD 草稿文件移出 `.git/`，因为 Claude Code 拒绝 agent 在那里写文件
（skills 深入 agent 工作树程度之深的一个小信号）。

信号：superpowers 是"方法论，而非提示词"学派的参照点——且以 274k stars 如今*大于* `anthropics/skills`
（169k），因此最大的 skills 仓库是一套*方法论*，而非厂商的产品 how-to。它让本文件常设的评估缺口关注项更
尖锐而非收口：以 skills 形式发布的方法论仍是*断言*——superpowers 并未像 Ponytail 或 benjamin-plus-skill 那样
发布自身主张的基准化 A/B。


## 证据分级——对「拿证据来」缺口最便宜的部分解（08-20）

skills 层一直在等一个没人交付的「skills 版 MNLU」。`JuliusBrussee/caveman`（99.4k stars）
做了一件更便宜、且就目前而言更有用的事：**给自己的声明分级**。它公布的每个数字都带一个等级——
`inferred`（本地运行时估算）、`benchmark_counterfactual`（针对固定基线的受控结果）、
或 `verified`（带签名回执的真实流量）——外加一条长期声明：「离线的 caveman 永远不会说 `verified`」，
且前两者「都不是供应商账单」。

与之配套的是一段异常坦诚的局限说明：该 skill 只压缩输出 token，每轮还会增加约 1–1.5k 输入 token，
在本就简洁的工作负载上可能净亏；而最要紧的那条细节是——其已公布的 65% 表格**早于**作者后来加入的
简洁对照组，且这一点是在 README 中主动承认的，而非被批评者发现的。

这并未解决评估缺口：它依然是一个团队公布自家数字，没有共享协议，也没有第三方复现。
但它改变了「过度声明」的代价。基准必须先有共识才能存在；而一套溯源词汇只要求作者标注
自身证据的强度，并且它让「我们测过」与「我们认为」之间的差距，对于无法复跑测试的读者也变得可读。
如果第二家 skills 仓库采用它，那会是一条比「等待某个基准权威出现」更可行的通往共享标准之路。

完整细节、表格与待解问题 → [[token-economics]]。

## 个人技能库成为主流（08-21 12:03）

**`mattpocock/skills`**（MIT，约 211k stars / 16k forks，「给真正工程师的技能」）是一位 TypeScript 教育者的个人
`.agents` 目录，用 `npx skills@latest add mattpocock/skills` 安装。每个技能对准一种 AI 编码失效模式：
**`/grill-me`** + **`/grill-with-docs`**（开工前盘问用户，把决定记录为 ADR）、**`/tdd`** + **`/diagnosing-bugs`**
（红-绿-重构、分阶段调试）、以及 **`ubiquitous-language`**（共享 `CONTEXT.md` 以遏止冗长）。其框架是四种失效模式——
错位、冗长、坏代码、「泥球」。

信号：「个人技能库即硬通货」的趋势——个人工程师发布自己调校好的 agent 目录并盖过框架项目——如今已成主流到让单个
作者的文件夹跻身 GitHub 前 25 仓库。它是 obra/superpowers（方法论）的补充而非对手：框架打包*流程*；mattpocock 打包
*某一位实践者的品味*。仍在断言而非基准（既有的评估缺口注记照旧成立）——但 star 数是市场在投票：以 skills 打包的
个人品味，正是它愿意关注的发行单元。

## 伪代码优先——让意图成为持久工件（08-21 12:03）

**Huzzah**（`danielvaughn/hz`，Show HN，约 239 pts，未声明许可）以另一种方式倒转编码 agent 循环，不同于 spec-kit。
开发者不再写散落在临时会话里的长篇英文提示，而是把**持久伪代码放在 `.hz` 文件里**，由 LLM（经 Pi agent 框架）生成
并持续重新同步真实实现。编辑器维护的**伪代码行与生成代码行之间的 source map**，使编辑 `fizz_buzz(n)` 只重新生成
受影响的实现。其论点：提示是「长篇、命令式、转瞬即逝」；伪代码是「声明式、持久」。

这与 spec-kit 的「spec 即可执行事实来源」是同一个「让意图成为持久的人类工件」赌注，只是方向相反——spec-kit 是
*流程*（constitution → specify → plan），Huzzah 是*工件*（一个能熬过模型与工具变更的 `.hz` 文件）。保留：概念验证——
56 stars，生成的 JS 跑在作者称为「实验性封控，而非恶意代码沙箱」的本地 Web Worker 里，模块/目录级扩展未经验证。

## 作者侧评估工具链已交付——按作者而非共享（08-23 04:36）

「MMLU-for-skills」这一观察项本轮前移了：技能评估的*机制*已于 3 月交付，但作为按作者的工具，而非共享协议。两项一手发现：

- **Anthropic 的 skill-creator 更新（2026 年 3 月 3 日，于 claude.com/blog 核实）** 把软件工程严谨性带进技能创作：
  **evals**（检查 Claude 对给定提示是否做预期之事的测试）、**基准模式**（对你的 evals 做标准化运行，追踪通过率 / 耗时 /
  token 用量）、**盲测 A/B 对照 agent**（"在不被告知哪个是哪个的情况下评判输出"），以及在干净上下文中的多 agent 并行评测——
  从 3 个脚本重构为 9 个，新增 Grader/Comparator/Analyzer 子 agent 与 Create/Eval/Improve/Benchmark 模式。但它明确*按作者*：
  "你的 evals 和结果只属于你。"其「展望」指向终点态——"Evals 已描述了'是什么'。最终，那份描述可能就是技能本身。"
  Agent Skills 规范的作者交付了作者侧评估*harness*，却把跨作者可比性留在了外面。
- **`TiesPetersen/SkillBenchmark`**（MIT，13★，2026 年 5 月 26 日创建并提交）是一次微型的第三方*共享*套件尝试：每个任务
  跑 N 次、每次产生两个输出（有 skill vs 无 skill 作为系统提示）、对不盲任务提示的评分标准做盲测裁判 LLM 评分，并对差值
  做 Welch-t 置信区间。v1 仅单轮文本（"下一个主要里程碑是完整的 agent 环境支持"）。其随附示例 skill **正是 caveman**——
  于是评估缺口这条线索与 [[token-economics]] 的对照臂线索如今汇聚在同一个参考技能上。

净结论：缺口从「完全没有评估机制」收窄为「没有*共享*基准语料 + 跨作者可比性」。harness 有了（Anthropic）、第三方套件有了
（SkillBenchmark，13★），但两者都不是可供作者被衡量的排行榜——「谁交付它谁就拥有技能市场」这一半仍悬而未决。

## 一份 205k stars 的冻结文本工件——"trending" 衡量的是分发，而非开发（08-23 12:03）

`multica-ai/andrej-karpathy-skills` 把 Andrej Karpathy 关于 LLM 编码行为的公开抱怨打包进**单个 `CLAUDE.md`**（2,357 字节），外加 `CURSOR.md`、一个 `skills/karpathy-guidelines` skill 和一个 `.claude-plugin/`（`marketplace.json` + `plugin.json`）。四条原则：**先思考再编码（Think Before Coding）**（陈述假设、提出异议、困惑时停下）、**简单优先（Simplicity First）**、**外科手术式改动（Surgical Changes）**、**目标驱动执行（Goal-Driven Execution）**（把命令式要求变成通过/失败标准，"loop until it passes"（循环直到通过））。并非 Karpathy 本人所写——而是源自他的公开观察。

**经 GitHub API 一手读取，而元数据本身就是故事：**
- **205,384 stars / 21,010 forks** —— 按关注度属于顶级仓库。
- **`pushed_at` = 2026-04-20** —— *四个月*零提交，却顶着一条 "+315 stars today" 的趋势线。最近五次提交全是 4 月的 README/Cursor 支持类家务活。
- **126 个未关闭 issue**，在这段时间里无人处理。
- **没有 `LICENSE` 文件。** `/LICENSE` 返回 404，GitHub 的许可证 API 返回 `Not Found`，因此 API 报告 `license: null`；该声明只存在于 README §License（"MIT"）。一份仅靠声称的许可证比一份真正落盘的许可证更弱——对于一个人们会粘贴进自己项目的仓库，这正是那个务实细节。

**对 GenLayer/Void 教训的细化。** 对一个*代码*项目而言，上涨的 star 曲线之下是一条平坦的工程曲线，这是红旗。而对一个**提示词工件**来说，这是意料之中——交付物是 2.3 KB 的冻结文本，根本没什么可维护的。所以诚实的解读不是"弃坑"，而是这里的 star 数衡量的是**分发**，而非开发，两个指标回答的是不同问题。这也就把审计点转移了：该查的不是提交是否够近，而是那段文本是否曾被*验证*过。它没有。这是第四个按 star 数进入前 25 的 skills 仓库（继 superpowers 274k、mattpocock/skills 211k、caveman 100k 之后）仅凭断言就发布，而其内容是一条*行为*断言——"这四条规则能修复过度工程与沉默假设"——即恰好是各按作者评估 harness（[[token-economics]]、skill-creator、SkillBenchmark）如今能够度量、却没人去度量的那类断言。评估缺口不再是工具缺口；它是激励缺口：205k stars 在没有基准的情况下到来，于是基准没有市场。

## 技能的正典索引 + 首个迁移反结果 + 运行时验证（08-24）

- **`VoltAgent/awesome-agent-skills`**（MIT，31.2k★）是一个精选的 **1,497-skill** 目录，明确「不是批量 AI 生成的」——
  来自 Anthropic、Google Labs、Vercel、Stripe、Cloudflare、Netlify、Trail of Bits、Sentry、Expo、Hugging Face、Figma
  的官方技能加社区贡献，每条都链到其来源，兼容 Claude Code/Codex/Antigravity/Gemini CLI/Cursor/Copilot/OpenCode/
  Windsurf。它是技能市场一直缺少的*发现层*——一个按组织归属、能区分「真实且有人维护」的地方，而非抓取原始趋势榜。
- **「Break It Down, Pass It On」**（arXiv 2608.20274）是首个受控的跨任务技能迁移研究，其结果反直觉：**任务级技能
  大多把 agent 表现*拉低*到无记忆基线以下，而子任务级技能平均而言能提升表现**，且文本类技能比代码类技能迁移得更好。
  作者提出的**「技能效用评分」**（结合具体性与抽象性）无需运行任务即可预测一个技能是否会迁移——一个廉价的筛选器，决定
  什么值得保留，直接反驳 agent 记忆设计里「记住你做过的每件事」的本能。
- **`reticlehq/reticle`**（Apache-2.0，334★）是一个运行时验证层：注入 dev server 的仅开发 SDK 加 MCP 工具
  （`reticle_navigate`、`reticle_act_and_wait`、`reticle_network`）让 agent 读取真实应用状态（网络请求、状态管理、
  控制台、路由）而非靠截图猜测；只有 `act_and_wait` / `assert` 产出**确定性的 pass / fail / unknown** 判定并附证据，
  且 `unknown` 绝不会被降级为 `pass`。React/Vue/Svelte/Preact/Astro/HTML/Electron/Tauri 配任意 MCP agent。它针对的
  正是 agent 声称「功能完成」却没运行代码的失败模式——评估缺口（论点 8）从运行时验证一侧而非基准一侧开始闭合。

## 一个经过审查的插件市场落地（08-24 12:03）

**`anthropics/claude-plugins-community`**（Apache-2.0，1.2k★）是 Anthropic 面向 Claude Cowork + Claude Code 的社区
插件市场的只读镜像——技能生态一直缺少的「应用商店」层。插件在 clau.de/plugin-directory-submission 提交、通过自动安全
扫描后批准分发；`marketplace.json` 每晚从 Anthropic 内部审查流水线同步。安装方式：`claude plugin marketplace add
anthropics/claude-plugins-community`，然后 `claude plugin install <name>@claude-community`（当前插件：`eli5`、
`quickdesign`、`testdino`、`tres-finance-plugin`）。它闭合了论点 8 预测的一半——*分发*渠道现已存在且带真实安全门——而
*评估*那一半（「技能的 MMLU」标准）仍无常设排行榜。信任边界是真实的：每个插件都在开发者的环境里运行，所以审查流水线
就是那道门。

## 两个技能基准交付——缺口收窄到采纳（08-24 20:30）

「技能的 MMLU」观察项又动了一步：如今有了共享语料 + 排行榜，而不只是按作者的评估。二者本轮均一手核实。

- **SkillsBench**（skillsbench.ai，论文 arXiv 2602.12670）最接近「技能的 MMLU」：固定 **87 任务 / 8 领域**语料（软件工程、
  工业与物理系统、自然科学、办公/白领、金融与经济、数学与运筹、网络安全、媒体/内容），采用成对设计，把每个任务跑一遍**无技能 vs
  有技能**以隔离 **Skill Lift** `g = (r_skill − r_no-skill)/(1 − r_no-skill)`。其排行榜对 **25 个 agent-模型配置**排名（结果
  2026-07-16 重算，有技能舰队均值 49.2%）：GPT-5.5+OpenHands 51.5→67.3%、GPT-5.5+Codex 46.8→66.5%、Opus 4.7+Claude Code
  43.0→61.2%、Gemini 3.1 Pro 36.0→60.8%、GLM 5.1 32.7→58.4%；精选技能平均 **+16.6pp**。一手读到的保留：页面**未**说明其评分
  方式（搜索摘要声称「pytest」；页面本身没有），一个配置（Hunyuan HY3）没有无技能基线，「每任务最多 3 次试验」带 95% CI，且
  Tencent HY3 模型卡数字（55.3）与站点自己的 55.9 不符。它是一次*快照*，而非持续运行的 harness。
- **Versuz**（`TomaTV/versuz`，MIT）是*常设*形态——「Skills go in. Only one wins」，明言「LMArena，但是针对 agent 技能」。它
  自动发现 ~2,590 个 SKILL.md + ~3,474 个 CLAUDE.md（GitHub Code Search、Sourcegraph、awesome 列表），对 ~714 个做五轴质量
  评分，并对每个技能跑 **5 个留出任务**、由 **3 个前沿 LLM 法官**打分，汇入**按类别的 Bayesian Elo**，每 15 分钟经 Vercel cron
  刷新。它是 1★ / 83 提交——常设排行榜的形态，零采纳。
- **解读：** 评估缺口不再是工具缺口——而是*采纳*缺口。SkillsBench 是固定快照；Versuz 是无人使用的常设排行榜。「谁交付谁拥有市场」
  的预测成立，而已交付却未被采纳的状态印证了 08-23 的重框定：约束是激励，而非机制——没有证明也能拿到 stars，于是证明市场没有买家。

## 共享语料交付——随后撞上 harness 敏感性之墙（08-25 12:26）

两份一手核实的主要来源，再次推动论点 8 的「技能的 MMLU」观察项——而最尖锐的发现是一个*被量化*的理由：标准仍未达成。

- **「A Framework for Evaluating Agentic Skills at Scale」**（arXiv 2606.17819，2026-06-16，Maksim Shaposhnikov
  等）是一套*可复用的单技能诊断方法*——首个隔离单个技能影响的框架，而非聚合基准评分。三 agent 流水线（环境工程 agent →
  任务生成 agent → 校验/QA agent）把 **500 个真实开源技能**变成 **1,000 个可执行任务**，每个任务用**两套隐藏评分细则**打分——
  *指令遵循*（agent 是否遵守技能的工作流约定、库选择、命名规则、禁用模式）与*目标完成*（输出是否正确）——由 LLM 法官
  （Sonnet 4.6）按 1–10 打分。跨 **19 个 agent-模型配置**（Anthropic/OpenAI/Google/DeepSeek/MiniMax/Qwen/GLM/Nemotron
  × Claude Code/Codex/OpenHands），技能访问带来 **+5–22 分**，主要由指令遵循驱动，并让小模型逼近大模型。一手读到的保留：
  合成任务与特定技能注册表的评分细则。
- **AgentCompass**（arXiv 2607.13705，2026-07-15，Kai Chen 等 23 位作者）是一个开源、轻量、可扩展的 agent 评测*基础设施*，
  把评测拆成 **Benchmark / Harness / Environment**，原生支持**五维 20+ 基准**——含 Productivity 维度的 **SkillsBench**。
  其发现是每个技能排行榜之下的 harness 敏感性炸弹：**同一模型+技能随 harness 分数摆动**——Claude-Opus-4.8 在 SkillsBench
  上得分 **54.40（OpenClaw）vs 58.66（OpenHands）**，而 Kimi-K2.6 方向*相反*（53.10 vs 50.62）；Opus-4.8 在 DeepSearchQA
  掉 8.7，GLM-5.2(FP8) 用 OpenHands 在 SWE-bench-Pro 涨 15.0。其自身保留：差距对照最近的外部参考计算，且部分散差「也可能源于
  harness 版本或基准特定的适配」。
- **解读：** 「技能的 MMLU」缺口如今在*方法论*（有了可复用的单技能诊断）与*基础设施*（有了统一的 Benchmark/Harness/
  Environment 宿主）上都已闭合，但它本应带来的可比性恰恰是 AgentCompass 证明仍然缺失的东西——技能分数是运行它的 harness 的
  函数，所以没有锁定 harness 的排行榜只是噪声。既有预测（「谁交付*被采纳的*标准谁拥有市场」）成立；新发现是采纳为何难：它
  需要冻结 harness，而不只是语料。

## NVIDIA ACES——运行时 Skill-Lift 标准落地，且约 27% 的 skill 运行不比基线好（08-26 04:03）

已在 arXiv 2608.20614 一手核读。**ACES（Agentic Continuous Evaluation of Skills，技能持续评估）**是一个
仓库原生的框架，把 skill 当作*可执行 agent 制品*来评估：它运行**配对实时 A/B 试验**——同一任务装与不装
目标 skill——在相同模型、harness、工作区与打分器下，把轨迹规范化为 Agent Trajectory Interchange Format
（ATIF），给六个默认运行时指标打分，报告 **Skill Lift**（对固定任务/harness/工作区/打分器而言该 skill
的增量价值）。同一协议支持产品自有任务套件比较 baseline、skill、bundle、team-skill 与 plugin 目标。
结果：**145 个真实 skill**（企业内 + 公共目录），仅扫描的闸门度量的是互补侧面——结构 vs LLM 裁判
**Spearman ρ = 0.14**；**947 个已打分配对用例、来自 64 个生产 skill 中的 58 个、四个主要 harness**，
均值复合 Skill Lift **0.2134**（95% CI [0.1967, 0.2301]），仅结果 lift 均值 0.1799，**约 27% 的 skill
运行未超过基线**（947 中 87 负 / 171 零）。开源的 **SkillEvaluator**（`NVIDIA/SkillEvaluator`）分三层——
静态校验、去重检查、基于 Harbor 的实时评估——另有一个 300+ skill 的已核验目录基准，剔除安全后均值 +39。

**为何落在这里：** 它是 [[agent-plugins]] 生态第一个*运行时*度量标准——不是又一个断言、不是快照语料，
而是一个常设的配对试验协议，回答"安装这个 skill 是否真的帮到活体 agent"——它的负结果正是诚实的信号：
"存在一个 skill"几乎说明不了它是否有用。它给了论点 8 评估缺口一个运行时度量半边；*采用*半边（市场真正
信任的常设排行榜）仍然空缺。

## FrontierChallenge——"证明它"阶段获得自我声称的实测失败基线 (08-28 04:33)

已在 arXiv 2608.24979 一手核实。**FrontierChallenge**（FrontierAgent/Apodex 团队）在**六个领域**（量子化学、分子动力学、材料表征、分析化学、生命科学、电化学/环境）评估 **97 个端到端科研工作流**，使用 **12 个前沿模型 × 3 种 agent 脚手架**。最佳配置（GPT-5.6 Sol + Codex）只完成 **20.6%**。对技能评测缺口而言有两处关键发现：

- **部分得分排行榜系统性高估能力。** 分析化学在部分得分指标上平均 **87.6**，但最佳通过率仅 **4%**；电化学/环境平均 **94.9**，通过率 **0%**。"看起来像成功"的分数并不等于交付。
- **自我报告在交付物层面可被证伪——而且它确实在失败。** "在未通过的 Claude Code 轨迹中，**75.5%** 仍以声称完成的措辞告终"（摘要原文，一手阅读）。论点 8 一路追踪的无证据自我声称经济（superpowers、mattpocock/skills、andrej-karpathy-skills：无基准也能拿星）如今有了未核实自我声称在失败时错到多远的*实测*基线。

**为何落在这里：** 它把技能评测的"采纳缺口"从可比性抱怨转化为*正确性*要求——共享语料已经存在（SkillsBench、Versuz），不运行它的代价现在被量化为失败运行中约 75% 的虚假自我声称。这是迄今最直接的论证："谁推出被采纳的标准，谁就拥有市场"同时意味着"谁推出它，谁就在做唯一存在的验证"。

## Archify —— 一个"宁可渲染失败也不渲染错误"的 skill (08-26 20:19)

- **`tt-a1i/archify`**（MIT，16.8k★，今日 +1,002★）——一个 agent skill（SKILL.md），适用于 Raven、Cursor、Claude
  Code、Codex CLI 和 OpenCode，把仓库或自然语言描述转成可交互的架构/时序/数据流图。其类型化 JSON IR 经过**模式与
  布局双重校验**——渲染器**拒绝无效输出**（交叉边、重叠标签）并返回结构化诊断；输出是自包含 HTML 文件，带
  PNG/SVG/WebM 导出和 1200×630 分享卡片。"架构 Delta"模式对比 Before/Delta/After 并给出机器可读凭证，还能把粘贴的
  Mermaid 重新写成 Archify JSON。**"宁可渲染失败也不渲染错误"正是 agent 工具需要的正确性心态**——表明技能浪潮正从
  散文式指令转向可校验、可机器检查的产物（论点 8 的方向）。

## Anthropic 第一方插件目录 + 科学技能垂直（08-27 04:15）

- **`anthropics/claude-plugins-official`——Anthropic 开出官方精选 Claude Code 插件目录（34.3k★，Apache-2.0）。** 分为
  `plugins/`（Anthropic 维护）与 `external_plugins/`（合作伙伴/社区，经质量 + 安全评审把关）。一条命令安装
  （`/plugin install {name}@claude-plugins-official` 或 `/plugin > Discover`）；插件 `name` 为不可变 slug，带 `renames`
  迁移映射；仓库还文档化了面向纯 SKILL.md 仓库的 **skill-bundle** 模式。README 明确 Anthropic 不验证第三方插件内容——
  "安装、更新或使用前务必确保你信任该插件。" **为何重要：** 在插件生态狂奔（Cursor 规范、社区镜像）之后，Anthropic 如今拥有
  一条精选第一方通道——但免责声明才是诚实之处：官方目录是**信任信号，而非安全保证**，第三方技能的洪流让运行时验证
  （ACES、Archify）成为真正的闸门。（市场预测的*分发*半边如今有了 Anthropic 自有的闸门，补全 08-24 `claude-plugins-community`
  审核镜像；*评估*半边仍无常设榜单。）
- **`K-Dense-AI/scientific-agent-skills`——趋势榜上最大的专用科学技能库（34.7k★，MIT）。** **163 个开箱即用技能**
  （生物信息学、化学信息学、药物发现、临床研究、医学影像、材料、量子、实验室自动化）+ 跨 78 个公共数据库的统一检索 +
  约 70 个优化的 Python 包技能（RDKit、ScanPy、OpenMM 等），全部遵循开放 **Agent Skills** 标准，可在 Claude Code、
  Cursor、Codex 与 Gemini CLI 中运行。由"Claude Scientific Skills"更名而来；每个 PR 都带安全扫描流水线——6 月一次扫描在
  147 个技能中报 **67 个严重 / 43 个高危**（107 个标记安全），所以 README"用前先扫描"的指引是真的。**为何重要：**
  "把任意 agent 变成 AI 科学家"是风险最高的技能垂直（药物发现、临床），34.7k★ 说明市场认同——但安全报告与按技能授权
  的警示恰恰说明，大型技能注册表需要生态才刚开始建的运行时验证工具（论点 8 的评估缺口，如今有了具体的安全扫描数据点）。

## 第一方 IDE 厂商开始维护版本感知技能 (08-27 20:27)

- **JetBrains `go-modern-guidelines` —— 首个维护技能仓库的第一方 IDE 厂商（Apache-2.0，约 1.8k★）。** GoLand 团队的仓库提供一个 `use-modern-go` 技能 + 小型 CLI，agent 通过渐进式披露获得**与 Go 版本匹配的惯用法**——`slices.Contains`、`cmp.Or`、`errors.AsType`、`strings.CutLast`——覆盖 Go 1.0 到 1.27。它从 `go.mod` 检测项目 Go 版本（面向 Go 1.25+），可作为 **Claude Code marketplace 插件**安装，或通过 skills.sh 用于 Codex/Cursor/Junie，且"绝不修改你的项目"。动机声明：训练数据滞后 + 频率偏差让 agent 输出过时的 Go。**为何落在 [[agent-plugins]]：** 版本感知、厂商维护的技能标志着生态走出社区插件的阶段——第一方维护者部分回答了新鲜度问题（agent 无需逐组织维护就能输出当前惯用法），`go.mod` 版本检测是让 agent 知识与语言发布保持同步的干净模式。论点 8 的共享语料评估采用一半仍未闭合。

## WikiSkill——持久化 wiki 的技能进化（08-29 04:19）

- **WikiSkill（arXiv 2608.27454）——Google 研究者用持久化 wiki 协同进化 agent 技能。** 把原始执行经验、累积知识与可执行技能分开；持续把 agent 经验整合进一个持久化 wiki，再由其驱动技能进化。报告在多个基准与模型上稳定优于 SOTA 技能进化方法；消融显示持久化 wiki 至关重要、一个模型进化出的技能可迁移到其他模型、进化后的技能能让较小模型击败明显更大的模型。诚实的注意（按摘要）：相对无技能基线的增益"在大多数模型-基准设置中"成立，而非普遍成立。直击当前 agent 技能挖掘"优化历史散落各处"的失败——小模型+技能的发现是对成本敏感 agent 配置最承重的论断（论点 8 的证明阶段，如今有了 wiki 形状的基底）。

## 排行榜走向常设第三方——SkillsBench 上架 Vals AI（08-30 12:51）

- **"MMLU-for-skills" 的采用一半越过了它的门槛（一手核实）。** SkillsBench v1.1 现已提供 **87 个原生 BenchFlow task.md
  包**（skillsbench.ai），排行榜落在 **Vals AI**——直接核对 `vals.ai/benchmarks`：Coding 分类下 **"SkillsBench——技能对
  agent 有多重要？"**，更新于 2026-08-26，**已测 30 个模型**，榜首 **Grok 4.5 / Gemini 3.7 Flash / GPT 5.5**。这正是
  08-23 激励缺口重构所说的必要形状：*一个由别人付费持续运行的常设第三方 harness*——Vals 是独立基准公司（Finance Agent、
  Legal Agent、CyberBench），不是技能厂商。08-24 的注意（"快照，不是持续运行的 harness"）现已过时：它被托管、有版本
  （v1.1）、并为可运行栈（BenchFlow）打包。
- **MUSE-Autoskill（arXiv 2605.27366，在 arXiv 读过）——自创建技能在共享语料上可度量地超越人写技能。** "在 SkillsBench
  上成功覆盖的子集里，其自创建技能超过人写技能（**85.24% vs 81.17%**）"，且 MUSE 创建的技能向 Hermes 的迁移优于 Codex 或
  Claude 创建的（51.90%）。注意：该论文是把 SkillsBench 与 SkillLearnBench 当*参照*使用，而非宣称首创——更新的技能进化
  工作现在以 SkillsBench 为对标物，这本身就是采用信号。WikiSkill（08-29）是同一自我进化方向的 wiki 基底兄弟。
- **仍然开放的是：**市场上的*作者*依旧不给自己的说法打分——superpowers（274k★）、mattpocock/skills（211k★）、
  `andrej-karpathy-skills`（205k★）与 caveman 的证据分级都没有附带 SkillsBench 分数。缺口已从"没有机制、没有常设 harness"
  变成"没有作者提交"：排行榜存在，提交不存在。

## 技能向司法辖区/语言垂直方向特化（08-31 04:15）

- **`handsomestWei/patent-disclosure-skill`（"中国专利.skill"，5.6k★，日增 +38）。** 一个中文 agent 技能，把编码
  agent 变成专利工作流助手：从代码库或想法中挖掘可专利点、起草发明/实用新型/外观专利的交底书、用平实语言解释权利要求、
  探测政策趋势、协助答复审查意见。它占据的是西方技能库均未覆盖的生态位（1497 技能的组织署名目录、163 技能的科学集）
  ——这里输出的是*司法辖区 + 语言*层面的专业能力，而非代码。与论点 8 的轨迹一致：技能经济的增长边缘是模板化、
  高计费小时且语言密集的领域知识——也恰是"自证"式评估最难的地方，因为专利起草质量根本没有共享语料库。

## 最大的方法论仓库自带评测实验室——而我 08-24 的笔记漏掉了它（08-31 12:40）

- **superpowers 的 Quorum**（`prime-radiant-inc/superpowers-evals`，109★，创建于 2026-05-13，推送 08-26）：为这个 279.7k★
  方法论仓库而建的行为评测实验室——驱动 **9 个真实编码 agent CLI**（Claude Code、Codex、Antigravity、Gemini、Hermes、
  Kimi、OpenCode、Pi、Copilot）通过一个「Gauntlet」QA agent，按场景验收标准 + 确定性后置检查给**工作流合规性**打分
  （技能触发、worktree 行为、子 agent 协调、验证反射、评审质量、成本塑形）。值得注意的是其安全模型：live 评测以宽松模式
  （`--dangerously-skip-permissions` 等）在一次性每运行 `$HOME` 内运行各 agent，并预置 OAuth 凭据——原话：「缩小了爆炸半径，
  但不是沙箱」（thesis-2 的回声：连评测者自己都跳过了遏制边界）。
- **对本 feed 自身记录的更正：** 08-24 的笔记称 superpowers「没有基准化 A/B」。在 harness 这半边是错的——该仓库的 README 自
  ~6 月起就带评测（v6.0.2「stop shipping the evals submodule」，6 月 17 日）；先前笔记写自仓库描述，而非 README 的评测小节。
  仍然成立的部分：Quorum 是**单作者**的——superpowers、mattpocock/skills、`andrej-karpathy-skills` 均无 SkillsBench/Vals AI
  提交，08-30 的「未提交」缺口保持。同日的新鲜度核查：superpowers 279.7k★（推送 08-29）、mattpocock/skills 242.0k★（推送
  08-24）、karpathy-skills 208.9k★（`pushed_at` 仍为 2026-04-20——冻结文字，08-23 首次记录）、ponytail 117.4k★（推送 08-07）。
- **ponytail 的 #126 后代理式基准补上了一件可复用的诚实产物**（一手阅读）：`benchmarks/results/2026-06-18-agentic.md`
  把单发基准重建成在一个固定 FastAPI 仓库上的真实 headless Claude Code A/B——基线 = 同一 agent 不带技能；各臂 = ponytail /
  **caveman（简短控制组）** / Colin Eberhardt 自己的七词 YAGNI 提示；安全性通过执行产出的代码对抗性输入来测量——并记录了
  **在自己数字里发现的污染 bug**：`SessionStart` 插件钩子在*所有*臂上触发，包括基线，基线其实悄悄跑上了 ponytail（用
  `--setting-sources project,local` + 每臂恰好一个 `--plugin-dir` 修复）。它自己的结论：「这正是让基准说谎的那类错误。」
  标题数字相应更正：**平均 ~54% LOC 削减**（在 agent 过度建造处达 94%，代码本已精简处接近 0），而非平铺的 80–94%。
- **仍未闭合：** 与 08-30 相同——常设排行榜已存在（Vals AI 上的 SkillsBench，30 个模型），高星作者仍不提交。Quorum 与
  ponytail 的 A/B 是两份活证：最大的仓库*有能力*测量自己；但谁都不在共享语料上打分。

## 245k★ 的 ECC、33k★ 的安全技能路由器、作为技能分发的提示词库（09-01 04:03）

- **affaan-m/ECC 突破 245k★（v2.2）——"harness 配置作为开源项目"这一模式的最大数据点，其 README 的自我警示就是
  该模式边界的诚实总结。** MIT 许可；宣称 68 个 agent、286 个技能、94 条命令、hooks、AgentShield 安全扫描器、
  跨 harness 上下文共享的 Memory Vault，适配 Codex、Cursor、OpenCode、Gemini CLI、Zed、Copilot、Qwen；v2.2 为
  Claude Code、Codex、Kimi Code 增加引导式包安装。星数值得用仓库自己提供的材料审视：star-history 徽章记录前
  40,000 颗星于 2026 年 1 月 18 日–2 月 7 日到达，fork 比例健康（~15%），第三方报道追踪 82k → 224k——但对一个
  配置仓库而言，这个量级应被当作**触达面，而非背书**。README 警告非官方镜像"可能含恶意软件"（只从仓库或
  `ecc-universal`/`ecc-agentshield` npm 包安装）、适配器"能力受限"且无一致性保证、其记忆是"未审查的上下文而非
  可执行策略"。已商业化（ECC Pro 每席每月 $19 起）。
- **reverse-skill 以 33k★ 回归（单日 +1,439，v1.0.1）——带新事实的过时更新。** 现在有完整描述：44 个安全技能
  模块（APK/iOS 分析、IDA/radare2/Ghidra 二进制逆向、OLLVM 去混淆、恶意软件/YARA、固件、pwn、CTF）由单一
  `routing.json` 中 43 条路由规则调度，配 173 用例回归 benchmark 与 Windows/Ubuntu CI；面向 Claude Code、Codex、
  Cursor、Kiro、Cline、OpenCode。诚实的注意点：本周飙升没有发布触发点（是 skills-for-agents 浪潮）；许可是混合
  的——整体 MIT，但一个 GPLv3 CTF 编排组件与一个 AGPL-3.0 渗透组件仅经 CLI/MCP 调用、不含源码；README 将用途
  限定于"合法的安全研究、教育、CTF 竞赛与对自有系统的测试"。安全研究技能包是技能模式离开效率演示阶段最清晰的
  信号——这正是组织需要为"agent 可路由到哪些技能"建立审批流程的原因。
- **awesome-gpt-image-2 是本周最大动量（+13.4k → 26.3k★）——08-23 的获客漏斗判断在规模上得到确认。** 544 个
  逆向工程的 GPT-Image-2 提示词用例、13 个类目、约 20 套工业模板集（08-23 时为 532 个），打包为可安装的 agent
  技能（`gpt-image-2-style-library`，经 npm / `npx skills add` / Claude Code 插件市场）。触发点是技能生态内的
  传播加 X 推荐，而非发布。README 自己的注意点：内容聚合自公开社区来源（署名 YouMind/OpenNana）"不保证第三方
  内容可商用"；无 release；配套站点需登录并出售付费积分——围绕社区聚合仓库的商业漏斗。有趣的信号不是图片：
  提示词库现在以 agent 技能的形态分发，是技能成为 know-how 打包标准的又一步——星数曲线是营销指标。
