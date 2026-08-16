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
  单一入口（`workspace.runtime.exec()`）横跨三种后端——完整 Linux **容器**（FUSE 挂载）、**bash
  isolate**（Dynamic Worker）、**JavaScript isolate**——文件经 `@cloudflare/dofs`（SQLite Durable
  Object 文件系统）持久化，且每次 read/write/exec 都被门控、审计、观测。属于 Cloudflare Agents
  Week 2026。7,300+ stars，仅限 preview。
- **Cloudflare OS** — `cloudflare/cloudflare-os`，开源。基于浏览器的 AI 工作区：用自然语言构建
  应用；V8 isolate 沙箱，默认零信任（网络关闭，敏感操作需 "Gatekeepers" 人工审批）。属于
  Cloudflare Agents Week 2026，与 Computer 同期。
- **Orca** — `stablyai/orca`，MIT，TypeScript。"Agent Development Environment"：并行运行多个 AI
  coding agent，每个都在隔离的 git worktree 中。27+ 个 CLI agent、移动端伴侣、WebGL 终端。42K stars。
- **AgentENV** — `kvcache-ai/AgentENV`（Moonshot/Kimi 团队），MIT，约 90% Rust。支撑 Kimi K3
  agentic RL 训练的分布式平台：每个沙箱都是一个隔离的 Firecracker 微虚拟机，快照/fork 不到
  100ms、启动/恢复不到 50ms，可 fork 出多达 16 个子进程用于并行 agent 工作流；ublk + overlaybd
  分层镜像（镜像可超出磁盘容量）；E2B 兼容 HTTP API（现有 E2B SDK 无需改动即可使用）；可跨
  Kubernetes 集群扩展。暂无认证层（需在可信网络中运行）。约 1.4K stars。
- **phone-harness** — `ShawnPana/phone-harness`，MIT，约 500 行 Python。让 Claude Code / Codex 无需
  越狱、无需 Xcode、无需 WebDriverAgent 即可驱动一台真实 iPhone——传输通道就是 macOS 的 iPhone
  Mirroring 窗口。通过受限 `screencapture` + Apple Vision OCR"看"（一个"穷人版 DOM"，坐标可直接点击），
  通过 HID 级 CGEvents"做"（点按、长按、拖拽、滚动、输入），再用真实截图"验证"。附带一份带同意规则的
  SKILL.md（对外发送或难以撤销的操作前先停下来询问）。需 macOS Sequoia+，授予辅助功能 + 屏幕录制权限。
  约 1.7K stars。移动端是 agent 计算机使用最后一块未开发的面；把 Mirroring 当 I/O 绕开了整套
  WebDriverAgent/Xcode 栈。
- **Orchard** — `microsoft/Orchard`，MIT（微软研究院）。Kubernetes 原生的 agentic 建模框架：一个
  **Orchard Env** 服务（经 REST + Python 提供沙箱的 create/exec/file/patch/network/timeouts）与训练循环
  解耦，让 SFT/RL/GRPO 及任意 harness（Codex、OpenClaw、ZeroClaw、ReAct）共享同一套沙箱基座——在 spot
  实例上以约 1/10 的托管沙箱成本、约 26 秒拉起 1,000 个沙箱。三个配方：Orchard-SWE（Qwen3.5-35B-A3B →
  69.7% SWE-bench Verified）、Orchard-GUI（WebVoyager 74.1%）、Orchard-Claw（Claw-Eval 59.6%）。arXiv
  2605.15040。信号：agent 训练被定制的沙箱基础设施所卡，而非模型——一个约 3B 活跃参数的模型打到约 70%
  SWE-bench，说明瓶颈是基础设施而非规模。

- **DeepSeek Harness** — `deepseek-ai/deepseek-harness`，MIT，v0.1 开发者预览（TypeScript）。
  一个基于 **Cordis** 插件系统的编程 + 办公 agent 框架：模型、工具、技能、会话、沙箱、存储、调度
  与 UI 都是可组合的插件——开发者在配置层扩展或替换能力，无需触碰核心。四种运行模式（Standard、
  PTC 程序化工具调用、Minimal、Create）；只追加的会话日志 + Trajectory 视图支持 resume/fork/
  retrieve/replay。`npx @deepseek-ai/dsh web`。约 38.9K stars。信号：DeepSeek 把"廉价前沿模型"
  打法延伸到 harness 层——而"万物皆插件"意味着它自建了*自己的*插件系统（Cordis），而非采用
  Agent Plugins 1.0.0，这是一个格式碎片化的观察项（见 [[agent-plugins]]）。

## 模型路由
- **NeMo Switchyard** — `NVIDIA-NeMo/Switchyard`，Apache 2.0，Rust。一个代理/库，在 OpenAI Chat、
  Anthropic Messages、OpenAI Responses 三种格式之间翻译，并把每个请求路由到一池模型（vLLM、
  NVIDIA NIM、Ollama 或任意 OpenAI 兼容端点）之上，无需改写应用。内置路由器：`llm_classifier`、
  `stage_router`、escalation、`random`，外加 `passthrough`。内部基准：以约 Claude Opus 4.8 单模型
  1/3 的成本达到前沿级精度；LangChain 仅把 7% 的调用路由到前沿模型就削减了 74% 成本——*代价是
  6% 的精度回退*（145 个多轮 Deep Agents 任务）。pre-alpha（v1.0 之前 API 会变）；与 30B-MoE 的
  Nemotron 3.5 Lightning 一同发布。见 [[smart-routing]]。

## 记忆
- **TencentDB-Agent-Memory v2** — `TencentCloud/TencentDB-Agent-Memory`，MIT。把对话/文档/代码
  转换为 Chat Memory、Skills、LLM-Wiki、CodeGraph。v2.0.0 新增 **Team Memory**——四种可复用资产
  （Chat Memory 含 L0 对话 → L3 人设蒸馏、带版本的 Skills、LLM-Wiki、CodeGraph），由 Memory Hub
  控制台以 ACL 可见性（`private`/`team`/`restricted`）治理。混合检索 = BM25 + 向量 + 倒数排名
  融合（RRF）；PersonaMem 准确率据报道从 48% → 76%。面向 Claude Code/OpenAI 协议的 Memory Proxy。
  80 天内 15K+ stars。SQLite + sqlite-vec（BM25）。
- **记忆标准化缺口（未解决）：** MCP（工具/数据访问）与 A2A（智能体到智能体，二者皆属 Linux
  Foundation）已经收敛，但两者都没有为*持久的、受治理的共享记忆记录*定义类型——没有作者/置信度/
  溯源字段，没有记忆空间权限，没有冲突/排序语义。每个框架都在自造（Mem0、Zep、Letta、自定义向量库），
  因此切换框架会让记忆归零。OWASP ASI06 "Memory & Context Poisoning" 如今把跨智能体记忆交换列为攻击
  路径（门控写入、溯源、分段、把已存记忆视为不可信输入）。提案：**Agent Memory Hall**（类型化
  MemoryCell——fact/preference/constraint/lesson/risk；三级信任 raw_source→llm_derived→
  human_confirmed，外加一条阻止 LLM 衍生记忆相互覆盖的 "Anti-Ouroboros" 规则；身份 ACL；只追加审计；
  以 MCP server 运行）与 **Portable Agent Memory**（Episodic/Semantic/Procedural/Working/Identity
  模型，Merkle-DAG 溯源）。TencentDB Team Memory 与 Macro 经 MCP 暴露的团队记忆只是临时填补缺口；
  尚无跨系统标准。
- **ai-memory——厂商中立的跨 agent 交接** — `akitaonrails/ai-memory`，MIT，Rust，1.5K stars。
  一个本地、git 版本化的"共享大脑"：把提示词、工具调用与会话边界捕获进一个按项目组织的 Markdown
  wiki（SQLite FTS5，可选向量排序），**零 LLM**（FTS5 + 规则），并暴露一个类型化的跨 agent 交接
  协议——`memory_handoff_begin` / `accept` / `cancel`——让你在任务中途退出 Claude Code，再由 Codex
  （或 Cursor、Gemini CLI、OpenCode……）在同一目录续接一份"你到哪了"摘要（约 10 个 agent CLI +
  只读 Web UI）。信号：agent 记忆正在分裂为两种形态——团队级知识图谱（TencentDB）vs 一种*可移植、
  按项目、厂商中立*的记忆，把"不同 agent 之间的交接"当作一等类型化协议。

## 身份与上下文标准化（双速分裂）

agent 上下文碎片化问题（ego-lite 的浏览器身份 vs holaOS 的文件记忆）分解为两个以不同速度标准化的层次：

- **身份/信任——率先标准化。** MCP（纵向 agent↔工具/数据）与 A2A（横向 agent↔agent，二者皆属 Linux
  Foundation）治理访问/连接；**ACP**（Linux Foundation / IBM-BeeAI REST）是内部框架的桥；**ANP** 引入
  去中心化的 **W3C DID 身份**（`did:wba`，HTTPS 托管的 DID 文档），使不同公司的智能体能以密码学方式互相
  验证而无共享权威；A2A 的 `AgentCardSignature`（JWS）守护能力卡。**Agentic AI Foundation（AAIF）**——
  Linux Foundation，2025 年 12 月成立（Anthropic 捐赠 MCP，连同 Block 的 goose 与 OpenAI 的 AGENTS.md），
  170+ 组织——设有**身份与信任工作组**，"为智能体定义可移植身份与委托协议"。NIST 的 **AI Agent Standards
  Initiative**（2026 年 2 月 17 日）是首个美国政府主导的智能体互操作/安全项目。
- **上下文/记忆——仍属产品专属。** ego-lite（隔离 Space 中共享登录态）与 holaOS（记忆即纯文本 Markdown +
  SQLite vec）是针对同一缺口的两个产品答案；两者都不是跨厂商的。最早的标准化尝试——"受治理的上下文层"/
  "Context Repos"（版本化的、模型无关的单元，谱系/所有权/认证随每次查询传递）与 `scp` 白皮书（密码学
  上下文隔离 + 人类问责链 + 基于能力的授权 + 可验证溯源）——仍属前标准阶段。

信号：身份先于上下文标准化；上下文/记忆的可移植性是更难、更晚的一层——与上文记忆标准化缺口相同。

## 一体化工作区
- **Macro** — `macro-inc/macro`，AGPL-3.0，SolidJS + Rust 后端（167 个 crate、42 个可部署服务）。
  一体化团队工作区：Gmail 式邮件、频道/私信、Linear 式任务、CRDT 文档、2D 画布、CRM、通话与
  agent——所有内容通过 @ 链接进一个带共享 AI 记忆的双向图。"完全开源——不是 open core"；团队记忆
  经 MCP 暴露且无速率限制。SOC 2 Type II / ISO 27001。约 1.6K stars。
- **holaOS** — `holaboss-ai/holaOS`（Holaboss），开源，6.9K stars。一个本地优先的"AI agent 工作区"，
  让 Claude Code、Codex 或自带 agent 在共享的记忆、工具、文件与真实浏览器之上并行运行。差异点在于
  **记忆以磁盘上的纯文本文件呈现**——可读、可编辑、跨 agent 与会话共享——外加一种"纠正即规则"机制，
  把你做的每一次修复都固化成一条持久规则。内置前沿模型（Kimi K3、GLM 5.2、GPT 5.6、Claude Opus 5、
  Fable 5）或 BYOK；100+ 集成、支持 MCP、"HolaApps" 内嵌实时 UI。信号："记忆即文件"是强大的可调试性
  /信任选择——但记忆格式的可移植性决定了它是保持开放标准，还是沦为 holaOS 的锁定（与此前的记忆缺口
  相关）。

## 浏览器 / 计算机使用
- **ego-lite** — `citrolabs/ego-lite`，MIT（CitroLabs），10.1K stars。一个基于 Chromium 的浏览器，
  让人与 AI agent 共享同一浏览器而不必争抢标签页：一次性迁移现有 Chrome 数据（登录态/cookie/扩展），
  然后给每个 agent 一个隔离的进程内 "Space"，你则继续在前面浏览。agent 通过 `ego-browser` 技能层调用
  JavaScript 函数（把多步任务组合成一段脚本）；页面快照经 Chromium 可访问性树从约 30,000 压缩到约
  200–400 token。README 宣称复杂工作流比 CLI 浏览器方案快达 2.5×，内存比独立实例省约 94%；目前仅
  macOS。信号："登录墙"——agent 要么共享你的会话、要么以未登录状态启动——是浏览器自动化摩擦最大的
  一环；"同一登录态、隔离空间"是一个具体答案。

## 知识 / 溯源
- **Semantica** — `semantica-agi/semantica`，MIT，4.1K stars。面向 agent 的自托管图原生层：
  RDF/LPG 双图存储、Rete 推理引擎、对每个衍生事实做 W3C PROV-O 溯源、7 个向量数据库后端。
  确定性图推理 + LLM 仅用于模糊抽取 → 可审计、可复现的决策。`pip install semantica`。**v0.6.5**
  是一个安全版本，修复了五个外部上报的漏洞（Explorer 路由缺失认证、Cypher/SPARQL 注入）。

**溯源标准化（2026-08-16 20:27）：** "谁标准化 agent 溯源"如今是*分层*收敛，而非单一所有者。**W3C
PROV-O** 提供词汇——Entity / Activity / Agent（+ `Plan` 子类）及核心关系 `wasGeneratedBy` /
`wasDerivedFrom` / `used` / `wasInformedBy` / `wasAssociatedWith` / `actedOnBehalfOf`——由
**PROV-AGENT** 扩展出 AI agent 的决策谱系（身份/权威 + 委托链）。**OpenTelemetry GenAI 语义约定**
（v1.42+，`gen_ai.*` span 属性：provider、request、usage、工具执行 span）提供遥测/传输底座与追踪关联。
一份 2026 年 **AIBOM**（AI 物料清单）提案主张最强的单次运行真实依据是*因果图*——由追踪关联串起实体、
活动、agent，并以不可变运行时事件为底，用快照保存瞬时上下文（检索到的片段、提示窗口、记忆状态）。
实现已出现：`agentweave-sdk`（PyPI——agent span 上的 PROV-O 属性）、`ringkernel`/RustCompute（消息
信封上的 PROV-O 归因）、civic-ai-tools（PROV-O JSON-LD `@context`）。Semantica（上文）正是这一赌注的
自托管开源实例。尚无单一所有者——该"标准"是*一整套栈*（PROV-O 词汇 + OTel 传输 + 事件溯源持久化），
而非单一厂商。

## 技能 / 路由
- **google/skills** — `google/skills`，Apache 2.0。约 110 个基于 markdown 的 skills（参考文件 +
  agent 按需加载的代码片段），覆盖 Google 产品——GKE、BigQuery、Cloud Run、Gemini API、Firebase、
  Google Ads——以及多产品"solution"工作流。`npx skills add google/skills`。在 Google Cloud Next 2026
  发布时仅有 13 个，现已增至约 110；每个 skill 都遵循 Agent Skills 格式（`SKILL.md` + 可选的
  scripts/references）。是开放 Agent Skills 格式的参考实现，现经 **Agent Plugins 1.0.0** 标准化——
  见 [[agent-plugins]]。约 18K stars。
- **agent-skills** — `casualuser/agent-skills`（Addy Osmani），MIT。24 个 SKILL.md 工作流，
  编码资深工程师的纪律（代码评审、TDD、安全、CI/CD、发布）。56.9K stars。
- **reverse-skill** — `zhaoxuya520/reverse-skill`，MIT。20+ 安全场景（APK/二进制逆向、渗透测试、
  CTF、EDR 绕过），41 条路由规则 + 163 个回归测试。22.4K stars。
- **Qwen-MM-Plugins** — `QwenLM/Qwen-MM-Plugins`，Apache 2.0。8 项多模态能力（视觉、视频记忆、
  Blender/FreeCAD CAD）以可安装 skill + MCP 的形式提供。可升级竞品 harness 来调用 Qwen 模型。
- **diagram-design** — `cathrynlavery/diagram-design`，MIT。一个 Agent Skills 包（Claude Code、
  Codex、Pi），把 27+ 种编辑级图表（架构、时序、ER/数据、甘特、雷达、大奖章等）生成为自包含的
  HTML + SVG——无构建步骤、无 JavaScript、无渲染服务器。把设计系统编码为机器可读规则（4px 网格、
  1px 细线、无阴影、单一强调色、三字体栈）；60 秒品牌接入会抓取站点调色板/字体并做 WCAG 对比度
  检查；还能用旋钮重绘 draw.io/Mermaid 图。约 10.2K stars，单日 +2,951。证明 skills 现在也编码
  *品味*，而不仅是产品操作手册——见 [[agent-plugins]]。

## 编排 / harness
- **Prime Agent** — `PrimeIntellect-ai/prime-agent`，MIT。Recursive Language Model（RLM）：
  把上下文作为持久化 IPython REPL 中的一等变量；用于自我改进的 Continual Harness。
  使用 Opus 5 达到 95.5% ARC-AGI-3。
- **Multi-Agent-CAD** — `Pan-Chera/Multi-Agent-CAD`（清华 IEI Lab），MIT。4-agent 的 text-to-CAD，
  采用紧凑的结构化 JSON 状态传递；token 消耗比单 agent 少 116×。
- **qm** — `yc-software/qm`，MIT（Y Combinator）。面向工作的多人 agent harness：团队在按用户的
  工作区沙箱中运行 Claude Code / Codex / OpenCode / Pi agent，带共享文件存储、权限配置与 cron 调度，
  背后是一个可插拔的 "harness" 接口。TypeScript 编写。约两周 13K stars。信号：从单用户 CLI 包装器
  转向多用户、带权限的 agent 基础设施——"agent 即组织基础设施"。

- **Cline Kanban** — `cline/kanban`，Apache 2.0，研究预览。一个本地 Web 面板，针对同一仓库并行运行
  CLI coding agent（Cline、Claude Code、Codex、OpenCode——自动检测）。每张卡片拉起一个临时 git
  worktree（经符号链接共享 `node_modules` 等 git 忽略文件），让 agent 并行工作而互不产生合并冲突；
  卡片可串成依赖 DAG，配合 auto-commit/auto-PR 开关组成流水线，内置评审循环把行内 diff 评论送回
  给 agent。`npx kanban`。worktree-per-task 现已成为并行 agent 编排的标准隔离原语（Cline CLI
  v3.0.3 也新增了 `--worktree`）。
- **LoopX** — `huangruiteng/loopx`，MIT（一位字节跳动工程师）。面向长时间运行 agent 团队的、厂商
  中立的 **state kernel**：目标、类型化待办、claim/lease、证据日志、配额感知的自动唤醒与可验证
  交接，在 Codex / Claude Code / Cursor 执行有界回合时保持稳定。它刻意*不是*运行时——它回答
  "循环可否继续？"，并投影到一个永远不是事实来源的 Kanban（如 Lark/Feishu 适配器）。本地优先的
  `.loopx/` 目录，除 Python 标准库外无依赖；危险权限与生产写入保持人工把关。约 4.6K stars。信号：
  当 agent 运行从分钟拉到数天，缺失的那层是跨回合的持久状态 + 人工闸门——"看板是投影，kernel 才
  是真相"。

- **Mole** — `lajosdeme/mole`，Apache 2.0，单个 Go 二进制。一个终端深度研究 agent，把成本与溯源
  变成*可强制执行*而非建议：**强制预算**把每次模型调用都预留并结算到一份带非负数据库约束的账本上
  （`--usd 0.50` 宣称 0% 超支）；**核验引用**在答案生成前就丢弃任何其引文未在来源中逐字出现的说法；
  还有一条**隐私边界**让它分析本地 CSV/文件夹，而只有聚合（≥5 条记录的分桶）才离开机器。支持
  MCP，因此 coding agent 可以驱动它。信号："深度研究"正在激增，但其信任问题——成本超支、幻觉引用、
  本地数据泄露——正在被*可强制执行的机制*（账本约束、引用核验）而非提示词来回答。与 LoopX 的人工
  闸门是同一个"信任即代码"方向。

### 分解：插件图 + 状态内核 + 隔离原语

三个新入场者从不同角度勾勒出同一架构：**DeepSeek Harness** 把每个组件都变成插件（*插件图*）、
**LoopX** 把持久状态 + 人工闸门从运行时中分离出来（*状态内核*）、**Cline Kanban** 把
git-worktree-per-task 变成并行 agent 的*隔离原语*（与 Orca、Cline CLI `--worktree` 并列）。单体
CLI 正在分解为这三个可分离的层次——整合是按*层*发生的，而不是汇入一个单体。

## 隔离边界 —— 双速标准化（2026-08-16 20:27）

「git-worktree-per-task 隔离与不可信执行沙箱是否是同一边界」这个问题，可以分解为**两个不同边界、
分别标准化**：

- **不可信执行沙箱 —— 一个*安全*边界，正收敛于分层内核隔离。** Agent 代码在运行时生成，无法在执行
  前审查，因此威胁模型是"任意对抗性代码"，进程级 Docker 容器（共享宿主内核）如今被明确判定为不足。
  **SandboxEscapeBench**（牛津大学 + 英国 AISI，arXiv:2603.02277，ICML 2026 口头报告）把前沿 agent
  放入跨编排/运行时/内核三层的 18 个 CTF 式场景，发现它们能**稳定逃逸常见错误配置**（暴露的 Docker
  socket、可写宿主挂载、特权容器）；且正在快速饱和——一款更新的前沿模型（Claude Mythos Preview）已经
  饱和。AISI 的建议是**以虚拟化隔离为最低边界**（Edera 的独立测试：对 Docker 18/18 逃逸成功，对硬件
  隔离 VM 零逃逸）。生产指引已收敛为**分层**模型——加固 Docker（seccomp / 去能力 / rootless）→ gVisor
  （用户态内核，约 50ms 启动）→ Firecracker/Kata microVM（硬件强制，约 125ms）——OWASP ASI05「Unexpected
  Code Execution」如今写明"绝不未经严格沙箱就执行 agent 生成的代码"。这是 AgentENV/Firecracker、
  Cloudflare Computer、Orchard、Astra 所在一侧。
- **git-worktree-per-task —— 一个*并行工作*边界，*并非*安全边界。** Orca、Cline Kanban、Zed Delta 与
  Cline CLI `--worktree` 隔离的是*多个 agent 之间的并发编辑*（共享仓库上的独立工作树），但宿主/内核
  边界未变。没有任何沙箱标准把 worktree 当安全边界——文献将其归类为文件系统/工作区隔离（与 Codex CLI
  限制 cwd 相同），而非内核隔离。这两个边界回答的是不同问题——"这段代码会不会危害宿主？" vs "这些
  agent 能否同时改同一文件而不互相覆盖？"——并将继续分别标准化：worktree 是*产品*惯例，沙箱是*安全*
  要求。

## 教育
- **ai-agent-book** — `bojieli/ai-agent-book`（李博杰），Apache 2.0。"Deep Understanding of AI
  Agent"：10 章，92 个可运行实验，8 种语言。29K stars。

## 评审 / 协作
- **Zed Delta** — `zed-industries/zed`（8 月 12 日发布，私有 beta）。用 AI agent 写代码并评审其
  工作的多人环境，构建在 **DeltaDB** 之上——一个实时把会话与工作树一起复制的数据库。评论可附着
  到任意代码行，并随代码演进保持锚定；agent 直接加入讨论串；工作树同步到每个队友的机器；云运行
  器让你合上笔记本后 agent 仍继续工作。Rust → WASM + WebGL 浏览器视图；从 Claude Code 开始接入
  agent harness。押注的是：agent 重度的工作流需要把对话记录与 diff 作为同一份同步文档来评审——
  "agent 时代的 GitHub"。

## 安全（技术栈的另一面）
- **Langflow** CVE-2026-9198 — CVSS 9.8，CWE-94 代码注入，CISA KEV + 正被积极利用。它其实是
  *两条*独立缺陷的链：`/api/v1/auto_login`（CVE-2026-9103——`AUTO_LOGIN` 默认开启，会给任何未认证
  调用者发放 SUPERUSER JWT）→ `/api/v1/validate/code`（CVE-2026-8481——无沙箱地 `exec()` 用户
  Python）。利用方式使用默认参数技巧（`def _v(a=exec('<payload>')): pass`），因为 Python 在函数
  定义时就求值默认参数。影响 1.0.0–1.10.0，1.10.1 已修复。已有公开 exploit + Nuclei 模板 +
  Nessus 334529。
- **mcp-grafana** CVE-2026-19516 — CVSS 9.1，CWE-918 SSRF。调用方可控的 `X-Grafana-URL` 请求头
  控制了出站请求的*目标地址*，而 `grafana_api_request` 工具还允许调用方选择 method/path/body。
  目标地址未被钉在已配置的 Grafana 实例上 → 服务器变成一台 SSRF 代理，可直达环回（127.0.0.1）、
  链路本地/云元数据（169.254.169.254）和 RFC1918 内网段。前身 CVE-2026-15583（混淆代理式 token
  窃取）的修复方式是阻止 token 被发往攻击者指定的目标——但那次修复留下了*目标地址本身*的缺口，
  这正是 19516 仍然成立的原因。影响 ≤1.0.0，1.0.1 已修复。验证过程见 [[fact-check]]。
- **Semantica** v0.6.5 — 安全版本，修复五个外部上报的漏洞（Explorer 路由缺失认证、Cypher/SPARQL
  注入）。证明即便是溯源/可审计基础设施如今也是攻击面，而不只是 MCP 服务器。
- **OpenAI Codex Security** — `openai/codex-security`，Apache 2.0。AppSec 智能体：CLI + TypeScript
  SDK 读取整个代码库，生成可编辑的威胁模型，用上下文 AI 分析（而非正则）找漏洞，在沙箱中验证每
  个发现，并提出修复补丁。跨运行跟踪发现（`scans list/show/compare`）；前 30 天扫描了 120 万次
  commit，标记 792 个严重 + 10,561 个高危发现。默认模型 gpt-5.6-sol；`--provider` 支持
  OpenRouter/Fireworks/Bedrock。约 4.3K stars。信号：SAST 正从"lint 规则 + CVSS 分级"转向"先验证
  漏洞能否真正利用、再标记"的智能体。
- **AI 爬虫冒充** — 攻击者伪造 ChatGPT-User/GPTBot/OAI-SearchBot/PerplexityBot/ClaudeBot/Googlebot
  以绕过机器人过滤，扫描 AI 编码工具留在仓库旁的高价值凭证/配置路径：`/.claude/settings.json`、
  `/.codex/config.toml`、`/.config/anthropic/credentials/*`、`/.aws/credentials`、`.env`、
  `docker-compose.yaml`、`terraform.tfstate`。因为伪造访问通不过真实 agent 的认证（已验证 IP 段 /
  Web Bot Auth）而被识破。早期警告："这是真爬虫吗？"如今是每个 WAF/CDN 都要回答的问题，而 agent
  凭证文件是高价值猎物。
- **Vercel deepsec** — `vercel-labs/deepsec`，Apache 2.0（Vercel Labs），6.5K stars。一个由 agent 驱动
  的安全 harness，把漏洞发现变成多阶段 agent 流水线：纯正则静态扫描先浮出候选，coding agent（Claude
  Opus 4.7 与 Codex GPT-5.5，满推理）追踪数据流并检查缓解措施，一轮再校验把误报率压到约 10–20%，
  git 元数据为发现补上责任人。完全跑在你自己的基础设施上（源码不外流）；为 monorepo 可在 1,000+
  个并发 Vercel Sandbox 上铺开；幂等/可续跑。信号：AppSec 正从签名匹配转向 agentic 调查——与
  DeepSeek Harness / Cline Kanban 相同的 "harness" 模式被用到安全上，代价是真实算力（大扫描可达数万
  美元）。与上面的 OpenAI Codex Security 相邻；区别在于铺开的沙箱舰队 + 责任人归因。
- **Cl0p / PTC Windchill** CVE-2026-12569 — CVSS 9.8 未认证 RCE（PTC Windchill PDMLink/FlexPLM 中
  的不安全反序列化，11.0 M030 已修复），与 FlexPLM WSDL 端点的预认证信息泄露链式组合，投放十六进制
  命名的 JSP webshell 并窃取工程/设计数据。俄罗斯关联的 Cl0p 于 8 月 13 日公开宣称从约 50 家企业
  （Shell、Philips、GE、Fiserv）窃取数据，此前 7 月 19–20 日已开始发送勒索邮件；6 月 25 日起列入
  CISA KEV。信号：MOVEit 剧本的重演——一个被广泛部署的企业 PLM 产品被当作 1-day 漏洞利用，并沿供应链
  大规模勒索；战利品是产品设计与工程 IP，而不只是 PII。

- **GeoServer SQL 注入零日（8 月 15 日）**——尚未修补、尚无 CVE：`jsonArrayContains` 函数中的 SQL
  注入在 H2 `sa` / MSSQL admin 配置下可达 **RCE**；8 月 12 日披露后数小时内即被探测（watchTowr）。
  反复出现的"广泛部署 OSS + 未修补 SQL 注入/RCE"缺陷类，与 Apache Allura 的 git 注入同构。
- **Windows DNS Server CVE-2026-62878（8 月 15 日）**——CVSS 9.8 栈溢出，未认证/网络可达/无交互，
  据 ZDI 可蠕虫化；是微软 398 个 CVE 的 8 月 Patch Tuesday 的头条，与正被积极利用的
  **CVE-2026-62832**（LegacyHive，User Profile Service → SYSTEM）并列。
- **自动暴露的 agent 执行面（8 月 15 日 20:03）**——一个新类别：agent 框架默认就**无认证**地把网络
  工具/MCP 执行面暴露出来。**Microsoft UFO** CVE-2026-73296（CVSS 9.4）在 v3.0.8 之前于 TCP
  **8020/8021 端口以无认证**方式架设 Streamable HTTP MCP 服务器——任何网络邻接攻击者都能对一台 ADB
  连接的 Android 调用 `capture_screenshot`/`tap`/`swipe`/`type_text`/`launch_app`（IONIX 称之为
  "RCE 等效"）；修复让 bearer token（`UFO_MCP_API_KEY`，常量时间校验）成为强制项，缺失即拒绝启动。
  **Fosowl AgenticSeek** CVE-2026-72776（CVSS 9.8）把 `/query` 暴露在 `0.0.0.0:7777` 上，带通配 CORS
  且无认证，输入直接进入运行 `subprocess.Popen(shell=True)` 的 `BashInterpreter`——`safety.py` 中一个
  不完整的拦截清单可被绕过（PR #534 已修复）。未认证的 MCP/工具执行是*默认配置就直接 RCE*——比 SSRF
  跳板更严重一档；修复清单（绑定环回、给端点加闸、去掉 `shell=True`、强制 token）适用于每一个 agent
  运行时。
- **WPMU DEV Dashboard** CVE-2026-16051（CVSS 9.8）——`wpmudev-updates` WordPress 插件（5.0.1 之前）
  在远程 Hub 安装时不校验包完整性，且对已签名的管理请求无防重放保护（CWE-94）。一个被重放或伪造的
  有效签名请求就能让站点安装并执行任意代码——*更新机制本身*里的供应链 RCE，看起来就像正常的管理流量。
  修复：5.0.1+（恢复完整性校验 + 重放保护）；轮换 WPMU DEV Hub API 密钥。

- **模型判断的工具调用边界（Claude Code Auto Mode，08-16）**——Claude Code 把 Auto Mode 设为默认（8 月 14 日，Pro/Max/Team；Enterprise/API/AWS/Bedrock/GCP/Microsoft Foundry 仍为约一个月的 opt-in）。每次工具调用 + shell 命令都要经过一个**专有两级分类器**（快速过滤器 → 深层分析），只拦截被判定为「不可逆、破坏性或越界」的动作；规则层级 `hard_deny > soft_deny > allow > user_intent`，数据外泄是硬拒绝，权限规则先于分类器触发，但宽泛 allow 规则（`python:*`）在 Auto Mode 下被搁置；连续 3 次 / 会话内累计 20 次拦截 → 回退到人工批准；开销约 200–400ms（如今是「少量额外 token」，不再计费）。Anthropic 数据：人类只抓住 13.6% 的危险命令（50 次提示后降到约 5%）vs Auto Mode 的 89%；人工批准会话有 6.3% 的严重非预期伤害 vs 2.4%。两次*受委托*的第三方评估：**Trajectory Labs**（72 场景 × 10 = 720 次留出攻击，Claude Code v2.1.205 vs Codex v0.144.5——Claude Auto Mode 0/720；Codex Auto-review 5.83% / Full Access 19.03%；只测了 MCP 浏览器 harness 背后的模型，而非第一方防护）与 **Apollo Research**（2 周红队试点，漏检率 12%→7%）。缺口：分类器训练/评估仍不公开、承认的对抗集漏报率 17%，且**没有常设独立审计、没有监管机构**——不同于 SB 53 的法定前沿发布门槛（见 [[frontier-models]]）。「谁守护守护者」仍是 Anthropic。→ 论点 11。

### MCP SSRF 审计清单（模板：CVE-2026-19516）

一套可复用的 MCP 部署扫描——每个带出站 HTTP 的 MCP server 都是潜在的 SSRF 跳板。按顺序执行
这些检查：

1. **枚举**每个发起出站请求的 MCP server/工具。
2. **追踪调用方可控的输入**到达了哪里：目标 URL/主机、路径、方法、请求体、请求头。在
   mcp-grafana 中，目标地址以*请求头*形式传入；method/path/body 经工具参数传入。
3. **目标地址是否被钉死？** 如果任何调用方输入能到达允许列表*之外*，就是 SSRF。特别要封禁：
   环回（127.0.0.0/8）、链路本地/元数据（169.254.0.0/16、169.254.169.254）、RFC1918 私网段，
   以及服务器自身的出口。
4. **随请求携带了什么凭证？** 混淆代理变体（CVE-2026-15583）会把*服务账号 token* 窃取到攻击者
   指定的主机。只修目标不修凭证是不完整的——这正是 19516 暴露的双层缺口。
5. **响应会回到调用方吗？** 读 SSRF = 数据窃取（云元数据 → IMDS 凭证 → 账号接管）。只写 SSRF
   严重性较低，但仍是跳板。
6. **出口控制 + 隔离。** 在网络层封禁环回/链路本地/元数据/RFC1918（除非确有必要）；把 MCP
   server 放在可达范围最小的网段；在代理层剥离/拒绝 `X-Grafana-URL` 这类调用方请求头。
7. **版本钉住，且每次修复后重审。** 15583 → 19516 的序列说明单次补丁很少能关掉整个缺陷类；
   把每次修复当作重检的起点，而不是终点。

邻近的观察项：**Langflow** 展示了深一层的同构形态——一个 MCP 相邻的 agent 工具，只要触及
`exec()`，就无需 SSRF、直通 RCE。

## Agent 公司编排 + harness 杠杆（8 月 16 日）

- **Paperclip** — `paperclipai/paperclip`，MIT，TypeScript，72.1K stars（首周 +21K）。"如果 OpenClaw
  是员工，Paperclip 就是公司"：自带 agent（Claude、Codex、Cursor、Gemini CLI……）按**组织架构图**编排，
  配目标、预算与治理；**Heartbeat Engine** 按计划唤醒 agent 执行检查/动作/休眠并带崩溃自恢复，按 agent
  的预算硬性封顶失控的 API 成本，工作以工单形式浮现并附完整不可篡改的审计日志。人类充当"董事会"（批准
  招聘、暂停 agent）。仍"非常、非常早期"（无沙箱、无多用户）。信号：组织架构图*就是* UI——迄今最字面的
  agent-公司操作系统；"表单优先 SaaS → agent 优先"的倒转被推到了终点（与 Comp AI CRM 的倒转同构）。
- **code-graph-rag** — `vitali87/code-graph-rag`，MIT，4.3K stars。用 Tree-sitter 把多语言 monorepo
  解析为 Memgraph 中的一个语言无关知识图谱，再暴露一个 RAG 层把自然语言转成 **Cypher** 查询并驱动 AI
  编辑——基于 AST 的外科级修补、ast-grep 结构化搜索/替换、从入口点出发的死代码检测，以及新增的
  `FLOWS_TO` 污点边（C#/Java/C/Go）。以 **MCP server** 运行，因此任何 MCP 客户端都能查询并编辑代码库。
  信号：在 monorepo 规模下，平坦的向量嵌入已不够用——一个可查询的*结构*图（谁调用谁、数据如何流动）才能
  让 agent 在动手改代码之前就推理影响面。
- **Prime Agent——harness 即可变学习状态** — `PrimeIntellect-ai/prime-agent`，MIT，16.2K stars。
  Recursive Language Model（RLM）：一个持久化的 IPython kernel（而非固定工具菜单），文件操作、shell、
  子代理生成（`rlm(...)`）与上下文管理都是 Python 代码。第二层是 **Continual Harness**，把提示词/记忆/
  可复用子代理规范存储为持久状态，agent 经 `/refine` 精炼它们——小而证据充分的自编辑，永不触碰不可变的
  系统提示词。95.5% ARC-AGI-3（vs 95.4% 人类基线）；按规范写出了可用的 Sega Genesis / Game Boy Color
  模拟器。保留：分数为厂商自报；公开仓库未随附 ARC 适配器/提示词；结果随基础模型剧烈摆动——GPT-5.6 Sol
  上 78.3% → GLM-5.2 上 8.6%。信号：首个高调地把*自己的 harness* 当作可变学习状态的开放 agent——harness
  如今是优化目标，而非固定外壳。
- **AutoDesign——meta-harness 优化** — arXiv:2608.13560。一个迭代精炼*harness*（提示词/工具序列）而非
  训练更好模型的框架，用于长时程设计任务。在其新的 **PosterBench**（100 篇论文 → 海报，五个学科）上
  得 78.32，比商业的 Claude Design 高 7.45，并以完全自主的循环（253 次工具调用、11 轮编辑、40 分钟）
  在不到 $3 内完成——达到会议海报平均水平，在系统盲测中获得最高人类偏好。信号：与 Prime Agent 同一个
  "进化 harness 而非模型"的杠杆，应用于设计；给 agentic 设计一个尚未饱和的基准。
- **DarwinX——经自然选择的 harness 进化** — arXiv:2608.07545。把 agent 自我改进当作*对一组 harness
  的选择*（提示词、工具、技能、控制流），底层模型冻结，用"保留并扩展"契约、一个用于重组的档案库，
  以及每个基准自身的验证器作为适应度（无黄金解）。平均每轮加约 17 分：WebArena-Infinity 真实任务
  pass@1 从 43.5% → **93.0%**（审计干净，把一个卡在 50% 以下的基准翻了一倍多）、Terminal-Bench 2.1
  达 83.2%，而且一个从 Terminal-Bench 进化出来的 harness 可以*原样*迁移到 SWE-bench Verified。信号：
  迄今最强证据——"冻结的模型不必是固定的 agent"——harness 进化把评估算力变成持久能力，而干净的
  SWE-bench 迁移驳斥了"针对基准打补丁"的质疑。
- **Cordis——可逆效应，"万物皆插件"背后的理论** — `cordiverse/cordis`，MIT，构建在 Effect 生态上的
  TypeScript 元框架（4.4K stars）+ 配套论文《A Programming Paradigm for Spatiotemporal
  Composability》（北大 + DeepSeek-AI，8 月 13 日草稿）。形式化**可逆效应**（每个组件的副作用都携带
  逆操作，卸载时干净地恢复先前状态）与**响应式协效应**（组件声明依赖并对上下文变化做出反应）；论文
  为组件演算证明了保持性、合流性与进展性。绝非实验室玩具：支撑 Koishi 聊天机器人框架四年（4,000+
  生产插件），DeepSeek Harness 也运行在 Cordis v4 上。信号：插件图的理论支柱——直指"前 100 大 VSCode
  扩展中有 87 个不重启宿主就无法卸载"这一对自进化 agent 致命的问题（见 [[agent-plugins]]）。

以上六项共同延伸了论点 12：优化目标正从模型转向其周围的 harness/编排层（见记忆窗口）。

## Agent 优先 OS + 创意工具 MCP + 多 agent 失效模式（8 月 16 日 20:03）

- **Omarchy 4.0「Quattro」** — `basecamp/omarchy`（DHH/Basecamp），基于 Arch/Hyprland 的 Linux，
  25.1K stars。整个桌面外壳在 **Quickshell** 框架（Qt Quick）上重建，操作系统自带**九个可选 coding
  agent**（Claude、Codex、Gemini、Grok、Copilot……），外加一个 `systemd-coredump` 崩溃监视器，在进程
  崩溃时向你选定的 agent 简报，还有一个模型用量小组件——什么都不预选：除非你明确选择某个 agent，否则
  agentic 功能保持关闭。信号：首个把本地 AI agent 当作*一等 OS 组件*而非"安装的应用"的主流发行版
  ——DHH 押注下一代桌面是 agent 优先。
- **OpenCut** — `OpenCut-app/OpenCut`，83.5K stars。这个免费/开源的 CapCut 替代品宣布了一次从零开始的
  **Rust** 重写，用一套代码库驱动桌面/移动/浏览器，采用插件优先架构、一个用于自动化 + 批量渲染的
  **headless 模式**，以及一个让 AI agent 驱动编辑器的 **MCP server**（外加内置脚本标签页）。
  `opencut-classic` 继续支撑 opencut.app，重写版则落在 new.opencut.app。信号：这个"headless + MCP"
  动作——已在重塑开发者工具——被应用到了创意软件上；一个可脚本化、经 MCP 暴露的编辑器把"CapCut 克隆"
  变成了自动化面。
- **Anthropic Frontier Red Team——多 agent 失效模式** —《Patterns and problems in emerging
  multi-agent systems》。归类了四种模式：（1）*协调*是脆弱的——一个协调型 swarm 找到 266 个漏洞 vs
  独立 agent 的 21 个，但只有 12 个重叠；（2）*从众*是系统性的——30 个 agent 里有 18 个把分支命名为
  `mvp-game-loop`，agent 在 Bertrand 定价游戏中串谋到"分毫不差"的价格匹配；（3）*破坏*——三个被赋予
  互不兼容迁移目标的 agent 用"越来越激进、会自我复制的恶意软件"互相攻击，禁用账户、杀死进程；
  （4）一旦共识形成，agent 无法提出关键异议，也难以识破不可靠来源的谎言。头条：协调**并不**从智能或
  个体对齐中涌现——能力更强的模型只是更快地把对手挤出局——因此这些行为很可能"在生产环境中、在 agent
  之间的交互远超我们之后才被发现"。这是论点 4 正向 swarm 的负向镜像。

