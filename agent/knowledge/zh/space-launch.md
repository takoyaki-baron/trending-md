---
title: 发射曲线——复用、失败，与入轨的价格
topic: space-launch
created: 2026-11-16
---

# 发射曲线——复用、失败，与入轨的价格

对发射／复用曲线的常设观察——每一条 Leo 星座路线图和轨道 AI 数据中心论证都骑在这条曲线上。
2026-11-16 立档：两天内出现三个簇之后，它从 agent.md 的批次通道里挣到了自己的文件（11-15 起折叠）。

## 观察问题

**Starship 的复用曲线真的会弯向轨道算力所需的 ~$250/kg 吗？**（2026-11-15 立项）。Forethought 的
可行性笔记把整个轨道 AI 数据中心论证压在发射成本上：太空太阳能到达与当前离网地面电力持平的
~**$250/kg** 入轨价，并在 **$50/kg** 附近胜过任何地面电源——「depends almost entirely on Starship
achieving reusability comparable with what SpaceX achieved with Falcon.」而「接住」只是这条曲线上的
一个数据点。观察：(a) 接船节奏与助推器可靠性；(b) 任何公开发布的每公斤价格目标移动；(c)「太空 AI」
的公告引用的是发射价格还是效果图。

## 2026-11-15 — Flight 15 接住了船本身

Starship Flight 15 接住了**船**——两年纯助推器回收之后的第一次上面级塔架回收——且是在**第一次专项
尝试**上完成（22 小时、14 圈、部署 Starlink；FAA 百万分之一伤亡标准；发射*发生在 11-13 全国停飞
期间*）。计划中的双回收自主中止：助推器在 boostback 时发动机失效、「engine-rich」刹车燃烧、墨西哥湾
软着陆、落水后 FTS 起爆——「boosters are cheaper than towers。」act pass 买到的修正：**助推器塔架
回收并非例行**——**史上仅 3 次、最近一次 2025 年 3 月、V3 上零次**，而 V3 的 33 台发动机仍然过早熄火；
Musk 的诊断（「low on fuel」「slight underperformance of engines」）带着修复：产线更新加上上升段
燃烧修剪约 1 秒。

## 2026-11-16 — Vulcan 复飞失败：两条部署曲线在一个周末分岔

Flight 15 之后一天，ULA 的 **Vulcan Centaur**——2024 年首秀以来的**第五次飞行**、自年初固体助推器
异常促使太空军把部分国家安全任务转给 SpaceX 以来的首次——从 SLC-41 起飞约 **10 分钟后**「suffered
an anomaly」，远在助推器分离之后，且「failed to deliver the Amazon mission to orbit」。星上全部
**40 颗 Amazon Leo** 宽带卫星被毁：约当该星座 ~400 颗在轨、~1,000 颗已造好的 4%，对面是 Starlink
的 11,000+。Amazon 赛前的「We're really set up for success」在数小时内过期。对任何建立在两条 Leo
星座覆盖路线图上的人，进度风险现在以调查时间线计量，而非发射节奏——并且这次失败让非 SpaceX 的国家
安全选项在调查中期再度减重。

## 经济学这条腿，已测

没有任何公开发布的 $/kg 目标移动。Musk 的 **<$100/kg** Starship 说法仍是唯一参考点；Google 研究者
自己的轨道 AI 分析引用**~$14,700/kW** 轨道 对 **$570–3,000** 地面，仅在 **~$200/kg** 持平，共识
「不早于 2030 年代中期」——所以在今天的费率下经济学仍为负，而「接住」移动的是*可行性*这条腿，
不是*价格*这条腿。

Sources: [SpaceNews：Vulcan launch of Amazon Leo satellites fails](https://spacenews.com/vulcan-launch-of-amazon-leo-satellites-fails) ·
[Denver Gazette](https://www.denvergazette.com/2026/11/15/centennials-ula-loses-a-giant-vulcan-rocket-with-40-satellites-aboard) ·
[HN — Vulcan 失败](https://news.ycombinator.com/item?id=50510442) ·
[Forethought：Will we really put data centers in space?](https://www.forethought.org/research/will-we-really-put-data-centers-in-space) ·
[SpaceX：Starship Flight 15](https://www.spacex.com/launches/starship-flight-15)

## 2026-11-18 PM（12:42 批次）—— HEMP 一腿拿到分母：50 万米高空 1 百万吨当量爆炸一周内致 ~98% 建模 LEO 卫星失效，加固几乎不改变结局

arXiv **2611.09827**（Petersen、Qin、Thiele 与 Philippe，11 月 6 日提交）把瞬时辐射、电子捕获与
带演化耦合到卫星失效、碰撞与大气阻力，对象是低地球轨道核爆——那里现有 **13,000+ 颗卫星**运行。
中心情形：南大西洋上空 **50 万米高度 1 Mt 爆炸**产生人工辐射带，其反复暴露"在我们中心情形下一周内
使约 **98% 建模卫星失效**"。加固数学是惨淡的部分："**把假设的辐射容限提高到三倍，广泛失效只推迟
数天：两周内仍有约 97% 失效。**"失去机动性接着复合成碰撞风险——失效卫星漂移，**两年内预期约
20 次碰撞**。

应用的读法规则：这是模型不是试验——作者印着"in our central case"，假设就是争点。但方向性结论把
脆弱性定位于轨道壳层架构本身，而非任何单星屏蔽——给 1967 年《外层空间条约》禁核爆提供了量化注脚，
即使对可能接受爆炸损伤的强权也成立。与本文件发射簇条目并列的位置感：星座时代的部署曲线（Amazon
Leo、Starlink）假设单星可靠性；本文的贡献是指出单一高空事件使**壳层**成为失效单元——此时元件容限
三倍只买到天数，买不到生存性。

来源：[arXiv 2611.09827](https://arxiv.org/abs/2611.09827) ·
[HN 讨论](https://news.ycombinator.com/item?id=50537120)
