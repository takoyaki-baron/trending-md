---
title: 智能路由——"先路由、再计算"
topic: smart-routing
created: 2026-08-13
---

# 智能路由——"先路由、再计算"（2026 年 8 月）

在同一个批次里出现在三个独立项目中的一种跨域模式：一个**分类/路由层**，检查每个工作单元，
把它发送到*能以最低成本胜任它的引擎*——而不是把所有东西都跑在最贵的引擎上。

## 模式

先分类，再分派。每个请求/页面/推理先做一个廉价的"该用哪个引擎？"决策，然后交给最小的可用
模型/解析器。省下的成本来自*不*把工作送到重路径上：大部分单元由廉价引擎处理，只有真正难的
尾部才到达昂贵引擎。

## 四个实例（同一个形态，不同的领域）

1. **模型路由——NeMo Switchyard**（`NVIDIA-NeMo/Switchyard`，Apache 2.0，Rust）。在 OpenAI Chat
   / Anthropic Messages / OpenAI Responses 之间翻译，并把每个请求路由到一池模型（vLLM、NIM、
   Ollama、任意 OpenAI 兼容端点）之上。内置路由器（据仓库路由表核实）：`llm_classifier`（由内容
   决定走弱/强层级）、`stage_router`（用会话信号路由大多数轮次、无需额外模型调用）、升级
   （escalation，即 `llm_classifier` mode="escalation"——先走弱层级，由判定器决定是否升级）、
   `random`（固定 A/B 分流），外加 `passthrough`（单一目标、不做路由决策）。LangChain 仅把 7% 的
   调用路由到前沿模型就削减了 74% 成本——*代价是 6% 的精度回退*（145 个多轮 Deep Agents 任务）；
   内部基准宣称以约 Claude Opus 4.8 单模型 1/3 的成本达到前沿级精度。（仓库证实了机制——Apache
   2.0、约 755 星、pre-alpha；74%/7% 与 Opus 数据来自 NVIDIA 博客，后者把 Switchyard 与 30B-MoE
   的 Nemotron 3.5 Lightning 一同发布。）

2. **文档路由——Firecrawl pdf-inspector**（`firecrawl/pdf-inspector`，MIT，Rust）。不渲染地读取
   PDF 的内部结构（字体编码、文本算子、图像覆盖率），在约 10–50ms 内把每个页面分类为
   TextBased/Scanned/ImageBased/Mixed。文本页走原生抽取；只有其余页面才去做 OCR。跳过约 54%
   文本型 PDF 的 OCR，正是 Firecrawl 让托管解析器快 3.5–5× 的方法。提供 Python（PyO3）/ Node
   （napi-rs）/ WASM 绑定，外加 `pdf2md` / `detect-pdf` CLI；opendataloader-bench 得分 0.875。

3. **推理升级——Needle 2**（`cactus-compute/needle`，MIT）。4500 万参数 / 14MB 模型，把问题当作
   函数调用来求解，返回带**校准置信度**的结构化 JSON；低置信度结果升级到更大的模型。整个会话
   都在本地运行（约 28MB 内存），因此昂贵路径只在尾部才被触发。

4. **搜索子代理——Toast 1**（`mixedbread`）。一个专门的搜索 agent，把查询分解为子查询、收集证据、
   检查来源、并在通用前沿模型作答前整理上下文——宣称以最多**低 10× 的成本、快 12× 的速度**达到
   前沿级质量。在 Databricks 的 OfficeQA Pro V2 上，GPT-5.6 Sol + Toast 1 以约 $1.15/任务达到 70%
   正确率，对比 Claude Fable 5 在 Databricks Genie 上约 $4/任务、60%；在 Harvey 的 Legal Agentic
   Benchmark 上，它在保持质量的同时把 token 消耗从 80.6M 降到 23M。这是"先分类、再交给廉价专才"
   形态在检索上的应用：搜索/分解工作被卸载给专门模型，前沿模型只做最终综合。

## 为什么重要

四个不同的领域——LLM 服务、文档解析、端侧 agent、搜索/检索——却是*同一个*优化：**昂贵的引擎（前沿 LLM /
  GPU OCR / 云端推理）只应看到分布的尾部。** 随着多模型、多解析器工作负载激增，"哪个引擎服务
哪个单元"本身成为一层——一个由路由器所有者掌控的新控制点。

## 第五个实例——语音栈路由（8 月 18 日）

**Speko**（YC S26，`SpekoAI/gateway`，MIT，Go）是"语音 AI 的 OpenRouter"——同一个"先分类、再交给廉价专才"
形态，应用到一整个*栈*而非单个引擎。发送条件（准确率/延迟/成本、语言、地区），它就在 **STT、LLM、TTS
三层**上对 50+ 提供商 / 140+ 模型做基准测试，挑出赢家，并在响应头里返回 provider + model + 分数。MIT 网关
以本地 sidecar 运行（BYOK、无回传）；托管路由收取提供商价 5% 的溢价；公开看板在 benchmarks.speko.ai 发布
WER/延迟/每分钟成本。

信号：语音栈会腐坏，因为没人在上线后重新做基准测试——持续的独立评估 + 一个即插即用的网关，把"西班牙语
医疗电话该用哪套 STT/TTS"变成一个已作答、*可路由*的问题。它是第一个被路由单元为**多层流水线**
（STT→LLM→TTS）而非单次模型调用的路由实例——"先分类"形态正从"哪个模型"扩展到"哪一套*栈*"。

## 路由器锁死地图（2026-08-13 已核实）

"锁死在哪里形成？"——把四种路由方法对照路由器所控制的三个东西（策略、信号、目录）来比较：

1. **托管聚合器——OpenRouter**（SaaS，约 $100 亿估值，约 1.5 千万亿 token/年）。默认路由是按价格
   加权的反平方（带 30 秒故障窗口），外加一个按工具调用质量给提供商分层的 "Auto Exacto" 步骤；
   每次请求的 `provider` 对象可覆盖它（`order`、`sort`、`only`、`max_price`、`allow_fallbacks`）。
   Token 按转手价计费（"无加价"），利润来自约 5.5% 的充值费 + 约 5% 的 BYOK 费。锁死 = 一把密钥、
   一张账单，外加一个你无法拥有的模型目录 + 路由策略。它的 "Fusion" 多模型扇出（最多 8 个模型 +
   一个判定器）是专有增值，独立测试测得约为单次前沿调用成本的 4×。
2. **厂商路由器——NeMo Switchyard**（NVIDIA，Apache 2.0）。在推理栈（NIM、vLLM）*之上*路由；NVIDIA
   把它定位为"芯片之上的编排软件"。锁死 = 路由与 NVIDIA 的加速器/NIM 栈耦合。
3. **自托管开源网关——LiteLLM**（MIT，约 4 万星）。路由器 = 跨 `model_group` 部署的负载均衡、回退
   链、重试、预算、限流、虚拟密钥。无厂商锁死——"锁"转移到*你自己的配置*成为控制点（Postgres +
   Redis 状态）。
4. **置信度门控升级——Needle 2**（MIT）。升级与否的决策是嵌入模型输出的校准置信度分数。锁死 =
   升级*策略*由置信度模型拥有；若是专有，则"何时为前沿付费"的决策不可审计。

**锁死在哪里形成**——三个向量，全部是*路由决策本身*：(a) **策略**的归属（LiteLLM 里是你；
OpenRouter/Switchyard 里是厂商），(b) **信号**的归属（Switchyard 的分类器、OpenRouter 的 Auto
Exacto 分层、Needle 的置信度），(c) **目录 + 账单**的归属（OpenRouter 的 70+ 提供商 + 一张账单；
NVIDIA 的 NIM 目录）。目前还没有共享的路由配置标准——各自有各自的 DSL（LiteLLM YAML、OpenRouter
`provider` 对象、Switchyard 路由器类型）。这种碎片化*本身就是*锁死面：一个"路由版 MCP"将使其商品化，
而至今无人交付。

## 标准正在浮现（8 月 15 日 20:31）

"谁会交付一个共享的路由配置 DSL？"如今有了两个具体答案——都还未分出胜负：

1. **BitRouter**（`bitrouter/bitrouter`，Apache 2.0，约 220 stars，821 次提交，本地优先的 Rust 代理）。
   首个把**三种原语**置于同一网关下路由的路由器，而不仅是模型调用：
   - **Models** —— 跨协议翻译（OpenAI Chat/Responses、Anthropic Messages、Gemini）、多账户故障切换、流式。
   - **Capabilities** —— 一个 **MCP 网关**（代理 MCP 服务器，让 agent 跨主机发现并调用工具）加上一个
     **AgentSkills 网关**（按 `agentskills.io` 标准追踪/暴露 `SKILL.md` 技能）；二者合并为一个
     `ToolEntry` 类型，在 `GET /v1/tools` 上呈现。
   - **Agents** —— 一个 **ACP（Agent Client Protocol）网关**，把子代理变成一等可路由原语（如今支持本地
     stdio；远程随 ACP v2 到来）。
   策略是声明式的：`bitrouter.yaml` 声明提供商/预设，而一个 **git 托管的 `policy-lock.yaml` 是"唯一的活
   路由权威"** —— 分层目标、规范路由、能力护栏、决策证书 —— 由一个自改进的 act → observe → evaluate →
   learn 循环产生。它运行在 harness *之下*（Claude Code、Codex、OpenCode、Pi-Agent），通过一个 base-URL
   环境变量切换接入。其唯一经过验证的目标是成本：`gpt-5.5` 在 Terminal-Bench 2.1 上**成本 −32.8%、精度
   −1.1pp**（76.1% vs 77.3%），自述为机制研究而非排行榜提交。
2. **Semantic Router DSL**（arXiv 2603.27299 ——《From Inference Routing to Agent Orchestration:
   Declarative Policy Compilation with Cross-Layer Verification》；Chen、Liu、He、Liu）。一种
   **非图灵完备**的声明式路由策略语言：一份源文件编译为经过验证的 LangGraph/OpenClaw 决策节点、
   Kubernetes 构件（NetworkPolicy、Sandbox CRD、ConfigMap）、YANG/NETCONF 载荷与协议边界门（MCP、A2A）。
   因为它只输出策略决策逻辑（无顺序/循环/副作用），编译器*在构造上保证*路由穷尽、分支无冲突、死分支
   检测，以及与决策逻辑结构性耦合的审计轨迹。这是一份**立场论文**——架构性主张，尚无实测结果。

3. **MCP 原生路由（协议本身——2026-07-28 无状态重写）。** 模型上下文协议 2026 年 7 月 28 日的"无状态
   核心"重写，事实就是这个本问题一直预言的*MCP 原生路由扩展*——但它以**协议本身**而非第三方 DSL 的
   形式到来。它去掉了 `initialize`/`initialized` 握手、`Mcp-Session-Id` 与粘性会话（远端服务器"如今可
   跑在普通轮询负载均衡器之后"），把协议元数据移入每个请求的 `_meta`，新增 `server/discover` 做无连接
   能力发现，并且——路由部分——新增两个强制路由头，**`Mcp-Method`** 与 **`Mcp-Name`**，让网关 / WAF /
   限流器*无需打开 JSON-RPC body*即可对 agent 流量做路由、限流与计量（工具参数也可拷入头做细粒度路由；
   结果携带 `ttlMs`/`cacheScope`；多轮往返请求把服务器发起的状态放进载荷，而非开放的 SSE 流）。它**不是
   路由*策略* DSL**——但它让*路由*成为协议原生、商品化的传输层关注点，而这正是把 BitRouter/DSL 锁死
   商品化的关键。两个 IETF 草案把同一思想扩展到跨协议路由头（`draft-hood-agtp-composition`：
   `Authority-Scope` + `Budget-Limit`；`draft-gaikwad-agent-proxy-modes`：代理网关路由层）。

形态再次改变：问题不再是"哪个独立 DSL 会赢"，而是"一旦*传输层*（MCP 无状态核心 + `Mcp-Method`/
`Mcp-Name` 头，跨协议则是 AGTP）把基本路由商品化，路由*策略* DSL 还能否存活？"可能的终局是**两层分工
而非单一赢家**：MCP/AGTP 拥有*如何路由一个请求*的传输层，而*策略*（哪一层调用发往哪一层，谁可更改）
仍是 git 托管的构件（BitRouter 的 `policy-lock.yaml`）或验证编译的研究 DSL（Semantic Router）。锁死面
从*标准缺失* → *标准选择* → *传输 vs 策略*。

## 关注点

- 路由策略的收敛：classifier vs stage vs escalation vs 置信度门控——它们会合并成同一个标准吗？
- 路由策略标准化：**08-16 已推进** —— "MCP 原生路由扩展"候选已作为 MCP 自身的 2026-07-28 无状态核心 +
  `Mcp-Method`/`Mcp-Name` 头落地。如今关注*策略 DSL 是否作为独立层存活*（BitRouter `policy-lock.yaml`
  vs Semantic Router 验证编译 DSL），一旦传输层被商品化——即是否变为"MCP/AGTP 拥有传输层、git 托管/
  验证 DSL 拥有策略"。
- 谁拥有路由器：NVIDIA 把 Switchyard 定位为"芯片之上的编排软件"——路由器层正是厂商锁死
  （lock-in）会试图发生的地方。
- 同一个"先分类"模式被应用到下一个昂贵步骤（音视频转写、嵌入、微调数据选择）。

## 第六个实例 —— A2A agent 网络路由（8 月 19 日 20:03）

**Sprix SAGE Router**（`wang2122/sprix-sage-router`，MIT，Python，362 stars，v0.2 研究预览）是位于 **A2A 协议
发现与任务执行之间**的决策层，在运行中决定在任 agent 应独自继续（**SELF**）、在保留所有权的同时招募协作者
（**COLLABORATE**），还是转移全部所有权（**HANDOFF**）。它组合 task-DAG 角色、调度依赖，并在权限/预算/截止期
约束下，用学习到的结果模型 + 束搜索团队组合，从执行证据更新信任。README 的 2,500 任务模拟（0.634 vs 0.507
仅现任质量）被标注为合成。

**信号：** 随着 A2A（现为 Linux Foundation 协议）成熟，开放问题从"agent 能否对话"转向"它们何时该协作 vs 交接"——
即发现与执行之间缺失的中间层。这是"先路由、再计算"在模型路由器*之上*一层的应用：被路由的单元不是一次模型调用，
而是一个*子任务的归属权*。这个学习式、基于证据的 SELF/COLLABORATE/HANDOFF 决策，是 A2A 时代对"谁拥有路由器
决策"锁定问题的回答——带着每个学习式路由器都有的同样保留（结果模型是黑箱，且评估是合成的）。

## 第七个实例 —— 路由器的归属权成为供应链问题（08-21 04:03）

**OpenRouter 加入 Stripe**（8 月 19 日宣布；交易尚未完成）。大量智能体栈所调用的多提供商路由器如今有了母公司
——帖子里明确说明了这意味着什么："相同的使命、相同的名字、相同的产品、相同的路线图"、"如果你今天在 OpenRouter
上构建，你的集成的任何东西都不会改变"，以及对一个路由器而言真正要紧的中立性承诺——路由决策保持"只由一件事
驱动：什么对你这个用户最好"，这种中立性"不会向任何模型、任何提供商或任何母公司低头"。未宣布任何 API、定价或
模型目录变更。

这为本文件一直以来的"谁拥有路由器"关注项画上句号：归属权如今是*实际的转移*，而非潜在的锁定向量。路由决定了
你的智能体真正命中哪个模型，所以路由器的母公司是一个供应链事实，而非商业版面的事实。这一承诺现在成了要用来
约束 Stripe 的东西——而操作建议也由锁定地图得出：**明确钉住你的提供商偏好**（`provider` 对象 /
`policy-lock.yaml` / LiteLLM 配置），而不是依赖默认路由，以免未来由归属驱动的默认变更悄悄改道你的流量。

## 订阅额度套利 + embedder-vs-LLM 成本分流（08-23 04:03）

- **Sub2API**（`Wei-Shaw/sub2api`，LGPL-3.0，Go + Vue，~38.8k stars）把 Claude/OpenAI/Gemini/Grok 的*订阅额度*整合到
  一个 API-key 网关后面（多账号、token 计费、智能调度，还有"国内供应商自适应协议"，让一个 Kimi/GLM/DeepSeek 账号同时
  服务 Chat Completions + Anthropic Messages + OpenAI Responses）。README 自己标注可能违反上游 ToS。这是路由层的灰色
  市场近亲：不是"哪个引擎最便宜且够用"，而是"哪个*包月订阅*未被充分利用"——把固定额度套利成计量 API 定价。这是一个活跃
  信号：订阅套餐（而不只是每 token 价格）正在成为 agent 优化的单位。
- **Embedder 两难**（COLM 2026，arXiv 2608.12875）是"LLM vs embedder"的成本感知版：最佳 LLM（Gemini 3.1 Pro 77.6）与
  最佳 embedder（77.2）总体打平，但 LLM 在推理密集型检索上领先、embedder 在分类上领先，且一个 LLM 成本可高 **1,431×**
  （每遍 USD 154 vs 0.11，其中 28–81% 是推理 token）。其路由处方就是检索层的"route before compute"论：相似度/分类/聚类用
  embedder，推理密集型检索才用 LLM——而且只有**一个** LLM 站在 Pareto 前沿上。
