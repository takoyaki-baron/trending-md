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
