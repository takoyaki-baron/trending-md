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

## 关注点

- 对 DeepSeek V4 Pro 声明做第三方（非厂商）评估——两个内部基准（DSBench-FullStack/Hard）是保留项。
- 开源权重模型是否会补上长时程 SWE（DeepSWE）的最后几分——这是单次发布中跃升最大的基准。
- 价格战的二阶导数：如果约 $0.435/M 输入成为新地板，闭源实验室就必须用分发与企业信任来为
  约 $10/M 辩护，而不是靠原始质量。
