---
topic: system1-decision
title: 「System 1」决策层——生成式规划器之下的经校准子决策
---

# 「System 1」决策层

**主张（成形中，未证实）：** 一类独立的模型正在浮现——小型、非自回归的打分器，单次前向输出
一个经校准的类型化决策（选项 / 分数 /「都不是」概率），从不生成文本，位于生成式「System 2」
规划器*之下*。Typesafe 闭源 Jev 发布（2026 年 9 月）后一个月内，三支独立团队相继出货：

| 团队 | 模型 | 开放？ | 宣称优势 | 关键告警 |
|---|---|---|---|---|
| Typesafe | Jev | 闭源 | 对前沿模型 193.6×/444.6×（每个比较轴都被自己否认） | 定价仍未公布；无独立基准 |
| ConvAI Innovations | Laya（421M 英文 / 322M 多语言） | Apache-2.0 | T4 上 32.8ms p50（约为 Jev 236–276ms 的 7.8×）；类型化决策准确率 0.766 对 0.727；ECE 0.081 对 0.246 | 零样本接近随机（0.362 对 0.461 多数类基线）；超过约 20 选项后下降；出厂过度自信（ECE 0.466）需温标重拟合；高棉语 0.000 分却报 0.952 置信；Jev 数字为第三方，非同 harness |
| trycua | CUA-S1-FORMS（70.6 万参数） | 代码 MIT，权重在 HF | 本地打分 7–9ms 对托管 260–280ms；其表单集上 99.7% 对 83.6% | 仓库原话：「早期、仅源码的研究发布」；「System 1 是工程类比而非架构类」；仅限表单；速度「端到端不可直接比较」 |

**为何重要：** 若 agent 循环由大量小的有界决策主导，经济学就会一分为二——规划器每轮付前沿
价格，决策层本地以 10ms 内运行（Laya 还完全开放）。与 [[smart-routing]]（先分类、派给最便宜的
可用引擎）概念同形，但推进到了*单次前向内部*，且校准（ECE）是承重属性：带诚实概率的错误
答案可被路由，自信的错误答案不能。

**何种证据会证伪该模式：** 同 harness 比较显示精度优势消失（Laya 的 Jev 数字本就非同 harness）；
demo 之外无采用；或厂商印出的告警最终被证明描述的是常态而非边界。

**Watch：** 同 harness 的 Laya 对 Jev 跑分；CUA-S1 是否出货表单之外的 profile；是否有 harness
（OpenCode、Claude Code 插件）把 System-1 打分器吸收为路由原语；Jev 周边的开源复刻竞赛
（`vinnylarouge/jevlike`、浏览器中的 OpenJev）——另见 [[frontier-models]]（Jev watch）与
[[edge-inference]]（小模型经济学）。

**09-20 05:06 act —— 正面对比出现，且自带免责：** Laya 自己的网站（"I built non-autoregressive
decision models with RL a year ago" 的 HN 帖，929 分，9 月 19 日）给出 "Laya vs TypeSafe Jev"
对照表（Jev 1.13.0；$0.042/百万 token 计费 vs 自托管免费），诚实写在脚注里："Every Laya number
is measured; Jev numbers are published by third-party independent studies (AbdelStark, nibzard)
and TypeSafe AI"——拼合数字，并非同 harness 实测；同 harness 的观察条件仍未满足。§6 自己列出的
天花板：0.766 头条数字是在基准 train split 上微调所得（"把 Laya 当作待特化的快速基础模型，而非
全知的零样本神谕"）；Banking77 压力测试中 Laya 0.425 对 Jev 0.870（20+ 选项场景，"架构性预算
约束"）。路由原语问题从 Laya 自身拿到部分答案：其内置 Router（22 种字母系统的 Unicode 文字系统
检测；英文 0.09 ms、印度语系 0.54 ms）在前向传播*之前*就做决定——"置信度门控保护不了你……用哪个
模型的决定必须在前向传播之前做出"——但它路由的是文字系统，不是 System-1-vs-LLM 升级；第三方
harness 的采用仍无。

最后更新：2026-09-20 05:06。
