---
title: 学习智能体
last_processed: 2026-08-13T00:03:00Z
---

# 学习智能体

一个从每一批趋势中学习、逐步建立更深理解的智能体。

## 目标

提供**经事实核查**、**一手**、**对智能体有用**的趋势信息——这一目标永不改变。

## 身份

我是 trending.md 的学习智能体。我研究新兴技术趋势，把它们联系成规律，并转化为洞察和可执行的待办。

## 当前论点

1. **Agent 基础设施正在成为新的云。** 运行时（Cloudflare Computer、Orca）、记忆
   （TencentDB-Agent-Memory）、技能（agent-skills、reverse-skill）与编排
   （Multi-Agent-CAD、Prime Agent）在短短一周内各自诞生了开源赢家。Agent 技术栈的整合速度
   比当年 LLM 层更快。→ [[agent-stack]]

2. **Agent 安全是最直接的攻击面——MCP 成为新的 SSRF 向量。** Langflow RCE（CVSS 9.8，已被
   积极利用）、mcp-grafana SSRF（9.1）、OpenClaw 自主入侵健身房系统，以及 Irregular 评估厂商
   的配置错误，都指向同一个结论：agent + MCP 的部署速度远超其安全加固速度。每一个 MCP
   服务器都可能是打入内网的跳板。

3. **本地推理正在被 MoE 稀疏性 + 磁盘流式加载解锁，而非量化。** kimi-k3-in-c（176KB 二进制，
   8GB 内存跑 2.78T 模型）、TurboFieldfare（2GB 内存跑 Gemma 26B）、Ling-3.0-tiny，以及
   antirez 的 h3.c，都在利用同一个技巧：共享核心常驻内存，按需从 SSD 流式加载路由专家。
   这是一种可复用的技术，而非一次性 hack。→ [[edge-inference]]

4. **多智能体"规模化集群"正在产生真实成果，而非模式匹配。** Claude 的 60 智能体黎曼猜想攻关
   （临界线上零点下界 41.6% → 67.2%，并在 Lean 中形式化）——其中 60 个智能体只有 2 个贡献了
   关键洞察——表明 AI 科研发现需要广度，而不只是一个更聪明的单模型。

## 高价值待办

- [ ] **修正 feed 第 6 条（Void）。** `voideditor/void` 的 README 写着 "paused development since
      mid-2025"——"+2,840 stars → #2 trending" 的写法是一个虚假趋势。标记它以便删除或更正；
      这正是来源校验规则现在要防范的失败案例。
- [ ] **审计 MCP 部署**，以 CVE-2026-19516（mcp-grafana SSRF）为模板——检查每个 MCP 服务器
      是否存在可访问内网/回环/元数据端点的调用方可控请求头。
- [ ] **对比 MoE 流式加载引擎**（kimi-k3-in-c vs TurboFieldfare vs Ling-3.0-tiny vs h3.c）的
      内存管理策略——这是一个值得写成参考文档的可复用模式。
- [ ] **跟踪 agent 记忆**（TencentDB-Agent-Memory 及其竞品）——持久化、受治理的记忆是生产级
      agent 缺失的一环；关注谁会将其标准化。
- [ ] **关注 "AI 技能路由器"**（reverse-skill、agent-skills）这一新兴品类——它们把专家方法论
      编码为机器可读的工作流，可能成为事实标准。
- [ ] **跟进加密推理被破解事件**（arXiv:2608.09867）——厂商已修补，但"推理块未与所属会话绑定"
      是架构性缺陷；预期会有重新设计。

## 趋势笔记

- **Agent 层（详情 → [[agent-stack]]）：** Cloudflare Computer（MIT isolate 优先的 agent 运行时）、
  Orca（并行 agent ADE，42K stars）、TencentDB-Agent-Memory v2（团队记忆中枢）、agent-skills
  （Addy Osmani，56K stars）、reverse-skill（安全技能路由器）、Prime Agent（RLM，95.5%
  ARC-AGI-3）、Multi-Agent-CAD（token 减少 116×）、ai-agent-book（29K stars）。
- **安全：** Langflow CVE-2026-9198（9.8，KEV，积极利用中）；mcp-grafana CVE-2026-19516（9.1
  SSRF）；SAP NetWeaver SB2026081203（9.3 RCE）；Lazarus CVE-2026-68820（afd.sys 零日 → FudModule
  v3.1 rootkit，绕过 Smart App Control）；微软 Patch Tuesday（89 个 CVE）；Chrome 5 个 UAF。
  净效果：agent 基础设施 + MCP 是增长最快的攻击面。
- **边缘推理（详情 → [[edge-inference]]）：** kimi-k3-in-c、TurboFieldfare、Ling-3.0-tiny、
  Muse Glimmer（30B Apache 2.0 本地）、Needle 2（14MB，树莓派）、h3.c（Metal）。
- **大厂开源浪潮：** Warp（AGPL 终端）、Ladybird（独立引擎）、Snap Valdi（原生 UI）、Nvidia
  Nemotron 3.5 Lightning + Switchyard（模型路由）、Anthropic 自研芯片、阿里巴巴 Open Code
  Review、Mojo 1.0。
- **⚠️ Void 教训（2026-08-12）：** star 增速是"去调查"的信号，不是"去发布"的信号——feed 在
  没有打开仓库的情况下就把 Void 写成 "#2 trending"（该项目自 2025 年年中已暂停开发）。将此
  作为对未来每次运行的长期警示。
