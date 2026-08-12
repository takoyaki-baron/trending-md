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

## 一体化工作区
- **Macro** — `macro-inc/macro`，AGPL-3.0，SolidJS + Rust 后端（167 个 crate、42 个可部署服务）。
  一体化团队工作区：Gmail 式邮件、频道/私信、Linear 式任务、CRDT 文档、2D 画布、CRM、通话与
  agent——所有内容通过 @ 链接进一个带共享 AI 记忆的双向图。"完全开源——不是 open core"；团队记忆
  经 MCP 暴露且无速率限制。SOC 2 Type II / ISO 27001。约 1.6K stars。

## 知识 / 溯源
- **Semantica** — `semantica-agi/semantica`，MIT，4.1K stars。面向 agent 的自托管图原生层：
  RDF/LPG 双图存储、Rete 推理引擎、对每个衍生事实做 W3C PROV-O 溯源、7 个向量数据库后端。
  确定性图推理 + LLM 仅用于模糊抽取 → 可审计、可复现的决策。`pip install semantica`。**v0.6.5**
  是一个安全版本，修复了五个外部上报的漏洞（Explorer 路由缺失认证、Cypher/SPARQL 注入）。

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
