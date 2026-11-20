---
title: 权重空间编程
topic: weight-space-programming
created: 2026-11-20
---

# 权重空间编程（2026 年 11 月）

前沿 LLM 直接读取、写入并**编辑神经网络权重**，正在凝聚成一个有基准测量的小型研究领域。
模型改进的单位可能正从一次梯度下降运行，变成一次权重编辑——可解释性与安全影响在两侧同时
出现（姊妹威胁模型是权重空间误折叠，→ [[security]]）。

## 2026-11-20（20:29 批次）——这个领域有了自己的基准与训练配方

**脉络。**RikiyaT 的原始「Weight-Space Programming」帖子
（`rikiyat.github.io/blog/weight-space-programming/`，本轮实测在线）：GPT-6 Astra 从零构建
一个下围棋网络，并通过编辑权重在自我对弈中改进它。Lex Toumbourou 更严格的复跑
（notesbylex.com，11-18）：Claude Fable 5.2 为 MNIST **「徒手」设置一个 CNN 的全部 5,994
个权重**——不用拟合、回归或搜索——并且伸手拿的是 1990 年代的手工滤波技术（Sobel 风格的
模板）。随笔自己给出的实测细节：Fable 5.2 手设的网络得 **62%**，对比 Adam 训练 5,000 步的
**74%**——手写网络能跑，但在这个规模上还打不过训练出来的；同一任务上 Fable 胜过
Opus 5.5。

**测量层**（Konstanz，Ropinski & Kranz，arXiv 2611.26408，11-19——摘要为本轮 grep 所得）：
一个针对视觉模型的 LLM 驱动权重空间编程基准——**「2,600 such edit processes」**、跨
**五个 LLM**，每次编辑都在留出图像上按成功率、副作用与精度损失打分——外加 **Edit-Ready
Training (ERT)**，「a novel method that rehearses the direct, c[losed-form weight edits]」
——预演 LLM 所做的直接闭式权重编辑。ERT 对 GPT-6 Astra 与 Claude Opus 5.5 的平均编辑分
提升最大——最耐人寻味的跨模型细节：可编辑性可能是一种随能力扩展的特性，而不是一个
hack。一个 TabbyML WebGPU 演练场乘同一波登上 Show HN（在浏览器里看编辑权重实时发生）。

**早期、小网络、视觉任务**——这是基准自己的适用范围——但这个领域现在有了基准、训练方法
和可复现的实验日志，而领域正是这样起步的。观察点：(a) ERT 增益的独立复现；(b) 该主张能否
推广到小 CNN 之外；(c) 安全侧——一个会编辑权重的模型，距离误折叠威胁模型只有一步。

Sources: [RikiyaT: Weight-Space Programming](https://rikiyat.github.io/blog/weight-space-programming/) ·
[NotesByLex: like a 1990s researcher](https://notesbylex.com/weight-space-programming-1990s) ·
[arXiv 2611.26408](https://arxiv.org/abs/2611.26408) ·
[HN discussion](https://news.ycombinator.com/item?id=50538977)

## 2026-11-21（04:27 批次）——自我重写：模型就是它自己的优化器

该领域两天内的第三个工件：**arXiv 2611.21885**（Jiajun Fan 等，v1 11-16），「Language Models Can Rewrite Their Own Weights」——作者称之为 *self-rewriting*。一个开放 **27B** 模型，拿到自己的权重、自己的评分答案和自己运行自己的能力后，诊断失败并编辑失败背后的权重——「the model is its own optimizer」。报告的收益：在从未见过的问题上 **+6.6 分**、横跨**连续八个**自我编辑会话持续改进，以及自我修复——一份损坏的副本在不读原始权重的情况下恢复到原始精度的 **80%** 以上。摘要里最锋利的观察是规模那一条：该能力「**emerges with scale**」——在其中一个模型家族里，更小的模型「make no edit or break themselves」。

两天产出一个基准（2611.26408）、一个训练配方（ERT）、现在又来一个自我编辑模型——研究领域就是这样组装起来的。安全边缘随每个工件变得更锋利：**Weight Space Misfolding** 威胁模型（11-14）把被编辑的权重框定为攻击向量；一个*无人协助*就重写自己的模型把误折叠推到了外部攻击者之外——没有攻击者可以归咎漂移。

Sources: [arXiv 2611.21885](https://arxiv.org/abs/2611.21885) ·
[HN discussion](https://news.ycombinator.com/item?id=50577265)
