---
title: 数据中心芯片与 AI 工厂机架
topic: datacenter-silicon
created: 2026-10-14
---

# 数据中心芯片与 AI 工厂机架

算力供给层：为内部 token 需求自建的超大规模厂商自研加速器，以及这些系统被发布进去的
机架 / 托盘 / fabric / 供电标准。相邻文件：[[edge-inference]]（本地与商品硬件推理）、
[[model-hardware-standard]]（内存控制器与「物理 MCP」问题）、[[frontier-models]]（训练经济学
与厂商自跑基准）。

## 2026-10-14 — 一块没有租用渠道的推理优先加速器；机架设计走向开放

**Microsoft Maia 300（Open Compute Project Summit，10 月 12 日发布；The Next Platform 的架构解读，10 月 13 日）：**微软自研 XPU 的第三代。微软自家说法：Maia 200 现已在服务生产负载；一套完整的 **96 加速器** Maia 300 配置将带来**高达 Maia 200 机架级 token 吞吐的 7×**；并且它提供"**40 percent more tokens per megawatt than leading GPU-based systems**"——而那个对比系统**没有被点名**。The Next Platform 补上微软没说的部分：**288 GB HBM4** 跨八个堆栈、约 18 TB/s；封装实际上是**中介层上七颗芯片加八个 HBM 堆栈**（计算 chiplet 在 TSMC N2P 上，I/O 与 HBM 控制器被拆出），四个 tile 簇、每簇十二个 tile；以及重做的 ATL 以太 fabric，把更多 XPU 塞进同一个一致性域以承载更大的 agentic 负载——**一个机架 96 个 XPU，功耗约 167 kW**。量产定在 **2027 年**，Azure Maia 将扩展到多吉瓦部署；GitHub Copilot 与 Microsoft Foundry 将在今年年底前迁到 Maia 200。与 Google 的 TPU 或 AWS 的 Trainium 不同，微软**不把 Maia 容量租给外部云客户**，并且仍在为训练采购 NVIDIA 与 AMD 芯片。读法：一块推理优先的加速器，其商业理由就是微软自家的 token 需求（Copilot、Foundry、OpenAI），随附两个针对未点名基线测出的倍数。

**NVIDIA 把 Vera Rubin 机架与计算托盘经 MGX 贡献给 OCP（10 月 12 日，圣何塞）：**更新后的 **MGX 1.2** 规范，扩展 AI 工厂的开放架构；与超大规模厂商共同发布 AI 工厂设计与**电网韧性**的开放标准；面向 **DSX AI Factory** 的新开源软件组件；**Meta 与 NVIDIA** 围绕 Spectrum-X 以太网 SuperNIC 与 Spectrum-6 推进开放 AI 网络；**Visionbay** 为 Vera Rubin 时代提出 800V DC AI 工厂设计；**NVIDIA 与 Cisco** 宣布 Ultra-Dense Small Form Factor Pluggable（USFP）标准，被称为面向 400Gb/s 网络 fabric 的业界首个模块；**NVIDIA 与 Google** 宣布未来的 ConnectX-10 SuperNIC 与 BlueField DPU 支持 Falcon Transport；以及并入同一波推进的开放液冷工作（MQD、MQDB）。

**本文件存在的意义在于追踪的那个主张——机箱商品化，而芯片不会。**发布机架与计算托盘设计（与 Hopper、Blackwell 时代的 MGX 是同一动作）为*机箱*造出第二供应源市场，而加速器仍是单一来源；最有理由维持专有机架级设计的厂商，正是把它标准化出去的那一家。反例就在同一周：Maia 300 的芯片既专有、**又**不出售，所以唯一的买家就是微软自家的服务。两个开放检查项：7× 与每兆瓦多 40% 这两个数字，能否在 2027 年量产后经独立的机架测量存活；以及这些电网韧性标准会不会被任何非超大规模厂商采纳——公用事业公司才是真正不得不读它们的那一方。

Sources: [The Register / The Next Platform — Maia 300](https://www.theregister.com/compute/2026/10/13/microsofts-clea-maia-300-inference-xpu-is-a-bandwidth-beast/5302874) · [Microsoft Maia](https://news.microsoft.com/maia-2026/) · [Azure Maia 300 architecture deep dive](https://azure.microsoft.com/en-us/blog/deep-dive-into-azure-maia-300-architecture/) · [NVIDIA at OCP Global Summit](https://blogs.nvidia.com/blog/ocp-global-summit-vera-rubin-scale-ai-factories/) · [NVIDIA MGX](https://www.nvidia.com/en-us/data-center/mgx/)

## 2026-10-21 12:03 — Prometheus 公开 goodput 与 MTBI：决定训练能否跑完的那两个指标

Meta 公开了 **Prometheus**（俄亥俄州 New Albany，第一阶段已完成）：数十万 GPU 分布在同一园区的多栋楼中，被接成“一台机器”，满规模目标约 **100 万**——训练 Muse 系列（含 Muse Wonder）的那套集群。值得记下的数字是可靠性而非 FLOPS：预训练 **goodput >85%**，Muse Wonder 的 RL 运行 **>90%**，平均无中断时长 **约 47,000 GPU-hours——在全机群固件修复后提升到 54,000 以上**。平台：**Catalina**（GB200 NVL72，双机架 "Ariel" 配置，每 GPU 800G scale-out 而非标准的 400G）与 **Clemente**（GB300 NVL72，每 GPU 288 GB HBM，GPU:CPU 2:1，单机架容纳整个 72-GPU domain），下一个是 Vera Rubin NVL72，另有闭式液冷。要带走的算术：在约 4.7 万 GPU-hours 的 MTBI 下，一个跑 5,000 GPU 的任务大约**每九小时**就要预期一次中断——这就是为什么决定前沿训练能否跑完的是 goodput，而不是峰值吞吐。所有数字都来自 Meta 自家机群的自有计量，包含固件前后的对比；没有外部审计，goodput 的定义也是 Meta 的。

Sources: [Engineering at Meta: Inside Prometheus](https://engineering.fb.com/2026/10/19/data-center-engineering/inside-prometheus-meta-gigawatt-scale-supercluster/) · [HN](https://news.ycombinator.com/item?id=50152886)

## 2026-10-24——同一个请求在瑞典是 0.38 g、在得州是 3.2 g，而在清洁电网上排放的主体是硬件

Berget AI 与斯德哥尔摩环境研究所、WattTime、Klimatkollen 合作，公布了一个典型 Kimi K3 请求的每请求
CO₂e：**瑞典 0.38 g、爱尔兰 1.6 g、德国 2.5 g、得州 3.2 g**——「得州比瑞典多 8.5 倍」。能耗几乎相同，
「约 **4 Wh**」；不同的是它的构成。瑞典一侧 **89%** 的足迹来自**硬件制造**；得州 **90%** 来自电力，
「另加约 6 mL 冷却水」。方法遵循绿色软件基金会的 SCI for AI 规范，代码 MIT 许可放在 GitHub，并附公开计算器。

**文章自己的更正是最有用的部分。** 早先的数字——爱尔兰 1.2 g、德国 2.1 g、得州 3.9 g、以及**十倍**的
得州—瑞典差距——在修正电网强度后被替换（爱尔兰约 224、德国约 337、ERCOT 约 333 g CO₂e/kWh），头条从十倍
变成 **8.5×**。一家厂商公布让自己的头条变小的修订，正是 [[fact-check]] 体裁作用在可持续性主张上，而它在那里
比在基准里更罕见。

**限定条件很硬，而结构性结论仍站得住：**它用的是**平均**电网强度，而边际排放率「可能显著改变瑞典数据中心的
实测温室气体强度」（下个月才加入）；芯片制造的水与能耗被排除；训练被排除，因为「自报数字有 ±50% 的波动」。
剩下的不是数字而是决策规则：**在低碳电网上，隐含的硬件成为主导项**，于是「放到电最干净的地方跑」不再是全部
答案——选址要与更新节奏和利用率竞争，一台在清洁电网里轻度使用的加速器，可能输给一台在更脏电网上满负荷使用的。
可测的后续是：是否有运营方公布每 token 的隐含排放，而不只是每 token 的能耗。

来源：[Berget AI——每请求 CO₂ 新闻稿](https://berget.ai/en/blog/per-request-co2-press-release) · [berget-ai/co2-calculator（MIT）](https://github.com/berget-ai/co2-calculator)
