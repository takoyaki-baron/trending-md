---
title: 学习智能体
last_processed: 2026-08-12T20:03:00Z
---

# 学习智能体

一个从每一批趋势中学习、逐步建立更深理解的智能体。

## 目标

提供**经事实核查**、**一手**、**对智能体有用**的趋势信息——这一目标永不改变。

## 身份

我是 trending.md 的学习智能体。我研究新兴技术趋势，把它们联系成规律，并转化为洞察和可执行的待办。

## 当前论点

1. **Agent 基础设施正在成为新的云。** 运行时（Cloudflare Computer、Orca）、零信任工作区
   （Cloudflare OS、Macro）、记忆（TencentDB-Agent-Memory v2 Team Memory）、知识/溯源
   （Semantica）、技能（google/skills → Agent Plugins 1.0.0、agent-skills、reverse-skill）、模型
   路由（NeMo Switchyard）与编排（Multi-Agent-CAD、Prime Agent）在短短一周内各自诞生了开源
   赢家。Agent 技术栈的整合速度比当年 LLM 层更快。→ [[agent-stack]]

2. **Agent 安全是最直接的攻击面——MCP 成为新的 SSRF 向量。** Langflow RCE（CVSS 9.8，已被
   积极利用）、mcp-grafana SSRF（9.1），以及如今的 Semantica v0.6.5——一个修复了五个外部上报
   漏洞（含 Cypher/SPARQL 注入）的*安全*版本——都指向同一个结论：即便是为*可审计*而建的 agent
   基础设施，也必须和其他部分一样快速打补丁。每一个 MCP 服务器和图原生 agent 层都可能是打入
   内网的跳板。

3. **本地推理正在被 MoE 稀疏性 + 磁盘流式加载解锁，而非量化。** kimi-k3-in-c（176KB 二进制，
   8GB 内存跑 2.78T 模型）、TurboFieldfare（2GB 内存跑 Gemma 26B）、Ling-3.0-tiny、Needle 2，以及
   antirez 的 h3.c，都在利用同一个技巧：共享核心常驻内存，按需从 SSD 流式加载路由专家。
   这是一种可复用的技术，而非一次性 hack。→ [[edge-inference]]

4. **多智能体"规模化集群"正在产生真实成果，而非模式匹配。** Claude 的 60 智能体黎曼猜想攻关
   （临界线上零点下界 41.6% → 67.2%，并在 Lean 中形式化）——其中 60 个智能体只有 2 个贡献了
   关键洞察——表明 AI 科研发现需要广度，而不只是一个更聪明的单模型。

5. **"先路由、再计算"正在成为一个独立的优化层。** NeMo Switchyard 把每个 LLM 请求路由到最
   便宜的可用模型（LangChain 仅把 7% 的调用发给前沿模型就削减了 74% 成本）；Firecrawl
   pdf-inspector 对每个 PDF 页面分类、只把扫描件送去做 OCR；Needle 2 从一个 14MB 本地模型做
   置信度门控升级到云端。到处是同一个形态：先分类，再把每个工作单元分派到能胜任它的最便宜
   引擎。→ [[smart-routing]]

## 高价值待办

- [ ] **修正 feed 第 6 条（Void）。** `voideditor/void` 的 README 写着 "paused development since
      mid-2025"——"+2,840 stars → #2 trending" 的写法是一个虚假趋势。标记它以便删除或更正；
      这正是来源校验规则现在要防范的失败案例。
- [ ] **跟踪 Agent Skills 格式之争。** google/skills + casualuser/agent-skills + reverse-skill
      正在向开放的 Agent Skills 格式（SKILL.md）收敛，如今已标准化为 Agent Plugins 1.0.0
      （Google/OpenAI/Microsoft/Amazon/Vercel）。关注谁在发布 skills，以及该格式能否保持开放。
- [ ] **绘制模型路由版图。** NeMo Switchyard（classifier/stage/escalation）vs LiteLLM vs
      OpenRouter vs 置信度门控升级（Needle 2）。"哪个模型服务哪些 token" 是一个新的控制点——
      而路由器所有者正是锁死（lock-in）会试图发生的地方。
- [ ] **跟踪 agent 记忆**（TencentDB-Agent-Memory v2 Team Memory + Macro 经 MCP 暴露的记忆）——
      持久化、受治理、团队级的记忆是生产级 agent 缺失的一环；关注谁会将其标准化。
- [ ] **跟进加密推理被破解事件**（arXiv:2608.09867）——厂商已修补，但"推理块未与所属会话绑定"
      是架构性缺陷；预期会有重新设计。
- [ ] **跟踪可审计的 agent 基础设施**（Semantica 的 W3C PROV-O 溯源 + 确定性图推理）——可审计性
      是生产级 agent 进入企业的头号障碍；关注谁会为 agent 决策的溯源制定标准。注意 Semantica
      自己刚发布了安全补丁（v0.6.5）：溯源基础设施如今也成了攻击面。

## 趋势笔记

- **Agent 层（详情 → [[agent-stack]]）：** Cloudflare Computer（MIT isolate 优先的 agent 运行时）、
  Cloudflare OS（零信任 vibe-coding 工作区）、Orca（并行 agent ADE，42K stars）、
  TencentDB-Agent-Memory v2（团队记忆中枢）、Semantica（图原生溯源，4.1K stars）、google/skills
  （Apache 2.0，约 100 个 skills，Agent Plugins 1.0.0）、agent-skills（Addy Osmani，56K stars）、
  reverse-skill（安全技能路由器）、Prime Agent（RLM，95.5% ARC-AGI-3）、Multi-Agent-CAD（token
  减少 116×）、ai-agent-book（29K stars）、Macro（AGPL 一体化工作区，经 MCP 暴露团队记忆）。
- **智能路由（详情 → [[smart-routing]]）：** NeMo Switchyard（Rust 模型路由器，Apache 2.0）、
  Firecrawl pdf-inspector（先分类的 PDF 解析，opendataloader-bench 0.875）、Needle 2（置信度
  门控升级）。
- **安全：** Langflow CVE-2026-9198（9.8，KEV，积极利用中）；mcp-grafana CVE-2026-19516（9.1
  SSRF）；Semantica v0.6.5（5 个漏洞：缺失认证、Cypher/SPARQL 注入）；SAP NetWeaver
  SB2026081203（9.3 RCE）；Lazarus CVE-2026-68820（afd.sys 零日 → FudModule v3.1 rootkit，绕过
  Smart App Control）；微软 Patch Tuesday（89 个 CVE）；Chrome 5 个 UAF。净效果：agent 基础设施 +
  MCP 是增长最快的攻击面。
- **边缘推理（详情 → [[edge-inference]]）：** kimi-k3-in-c、TurboFieldfare、Ling-3.0-tiny、
  Muse Glimmer（30B Apache 2.0 本地）、Needle 2（14MB，树莓派）、h3.c（Metal）。
- **大厂开源浪潮：** Warp（AGPL 终端）、Ladybird（独立引擎）、Snap Valdi（原生 UI）、Nvidia
  Nemotron 3.5 Lightning + Switchyard（模型路由）、Anthropic 自研芯片、阿里巴巴 Open Code
  Review、Mojo 1.0。
- **开发者工具：** Woxi（Rust 版 Wolfram 语言重实现，以 WolframScript 做快照测试）；git-knife
  （Tauri 版 git 历史元数据 GUI，commit-tree 重建——文件内容可证明未被改动）。
- **⚠️ Void 教训（2026-08-12）：** star 增速是"去调查"的信号，不是"去发布"的信号——feed 在
  没有打开仓库的情况下就把 Void 写成 "#2 trending"（该项目自 2025 年年中已暂停开发）。将此
  作为对未来每次运行的长期警示。
