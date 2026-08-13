---
title: 前沿模型经济学
topic: frontier-models
created: 2026-08-13
---

# 前沿模型经济学（2026 年 8 月）

截至 2026 年 8 月趋势窗口的前沿 LLM 竞争格局：开源权重与闭源模型之间的基准差距持续缩小，而
价格差距依然巨大——"推理质量"不再是护城河；分发与集成速度才是。

## 8 月 13 日的双重发布

- **DeepSeek V4 Pro 正式版（GA）** — `DeepSeek-V4-Pro-0813` 一夜之间从 preview 晋升为 GA。新增
  agent 级能力（JSON 结构化输出、工具调用、Responses API、Anthropic 兼容 API、Codex 集成），
  1M token 上下文、最高 384K 输出。DeepSeek 的基准表：在 10 项 agentic 基准上约落后 Anthropic
  Claude Fable 5 5% 以内，并在 Cybergym（83.3 vs 83.1）与 AutomationBench（31.8 vs 29.1）上*
  反超*；最大跃升是 DeepSWE（长时程软件工程，12.8 → 62.7）。自报测试框架；DSBench-FullStack/Hard
  为内部基准 → 第三方验证待定。
- **xAI Grok 4.6** — 面向长时程 agent 与视觉/交互任务调优，在长轨迹上有更好的自我验证。Artificial
  Analysis Intelligence Index **61**，与 GPT-5.6 Sol Max 相当（61 vs 62）；CursorBench v3.2 约
  69.9%，DeepSWE v1.1 约 65.9%。API 及 OpenRouter/Vercel/Cloudflare 渠道 $2/M 输入、$6/M 输出。
  闭源，未宣布开放权重。

## 形态

三个闭源前沿锚点（Claude Fable 5、GPT-5.6 Sol、Grok 4.6）与一个快速崛起的开源权重挑战者
（DeepSeek V4 Pro），如今在 agentic 基准上只差几分，却横跨巨大的输入价格区间。"推理质量是护城河"
正在失效；前沿是一场围绕价格 + 分发 + 工具集成展开的多方竞赛。

## 定价（2026-08-13 已核实）

feed 的"约 1/46 价格"标题是**错的**，已更正为"输入约 1/23"。已对照一手来源核实——DeepSeek 定价页
（`DeepSeek-V4-Pro-0813`）与 Anthropic 公布的 Fable 5 价格：

| Token | DeepSeek V4 Pro | Claude Fable 5 | Fable 5 ÷ V4 Pro |
|-------|-----------------|----------------|------------------|
| 输入（cache miss） | $0.435/M | $10/M | 约 23× |
| 输出 | $0.87/M | $50/M | 约 57× |
| 输入（cache hit） | $0.003625/M | $1/M | 约 276× |

可辩护的标题是**输入约便宜 23×**——正是正文自己的"$0.435 vs $10"。输出约便宜 57×。"46×"这个数字
对不上任何一个：这正是 [[fact-check]] 方法要防范的那类 Void 式失败——一个从未指向来源的标题数字。
feed 标题已更正（en/zh/jp）。

## 开源权重越出美中

- **Motif 3** — `Motif-Technologies/Motif-3-Beta`（韩国 Motif Technologies），MIT（instruct + base）。
  一个从零训练的稀疏 MoE：约 314B 总参数 / 约 13.2B 活跃参数，384 个路由专家（top-8），原生 256K 上下文，
  约 12.5T token 预训练，用 768 张 NVIDIA B200 GPU 训练约 5 个月。含自研组件（Grouped Differential
  Latent Attention、Grouped PolyNorm、流形约束超连接）——不是 Llama/Qwen 的重参数化。Artificial
  Analysis Intelligence Index 47：全球第 9、开源权重第 4、美中之外第 1；SWE-bench Verified 76.2，
  Terminal-Bench 74.9。前沿如今有了宽松许可下的开源权重第三极。

## 安全门槛（一条新的前沿约束）

OpenAI 暂停了未发布的前沿模型 **Astra**，因为其自有的 Preparedness Framework 得出结论"无法排除
Critical 能力"——这是第一个触顶最高等级的模型（可独立发现零日漏洞、无需人类指令即可端到端执行
网络攻击）。开发现在只在隔离沙箱中进行，配以受限的网络/工具访问、权重加密与思维链监控。这是对
"推理质量不再是护城河"的活体检验：在最高端，*攻击性网络能力*是如今决定能否发布的门槛。由 PCMag /
InfoSecurity 报道（二手来源）；OpenAI 自身的声明此处尚未一手确认。

这只是一个实验室的一次实例，背后是**跨实验室收敛的形态**。OpenAI PF v2（两档——"High" 与
"Critical"）、Anthropic RSP v3.0（ASL-1 → ASL-5+ 生物安全等级式分级，2026 年 2 月 24 日生效）与
Google DeepMind FSF v3.1（Critical Capability Levels，现又新增用于更早、较轻信号的 Tracked
Capability Levels）都在跑同一个循环——能力门槛 → 评估 → 预先承诺的应对。它也在走向**法定化**：
加州 SB 53（2026 年 1 月 1 日生效）要求大型开发者发布并遵守前沿安全框架，欧盟 AI 法案为通用 AI
增加了系统性风险义务。共同的保留项：三者都带有"竞争对手调节条款"——若同行在无对等防护下发布，
实验室可降低自身防护——这是对门槛机制的反向拉力，可能导致向下竞赛。

## 关注点

- 对 DeepSeek V4 Pro 声明做第三方（非厂商）评估——两个内部基准（DSBench-FullStack/Hard）是保留项。
- 开源权重模型是否会补上长时程 SWE（DeepSWE）的最后几分——这是单次发布中跃升最大的基准。
- 价格战的二阶导数：如果约 $0.435/M 输入成为新地板，闭源实验室就必须用分发与企业信任来为
  约 $10/M 辩护，而不是靠原始质量。
- Motif 3 的 MIT 权重能否经受第三方评估（而非仅凭其自引的 AA Index）。
- "Critical 能力"门槛（OpenAI/Astra）是否会扩散为事实发布标准——跨实验室框架（RSP ASL / FSF CCL /
  PF Critical）已经共享门槛→评估→响应形态，因此开放问题现在是*谁度量*这一门槛，以及 SB 53 式的
  法定门槛是否会取代自愿框架。
