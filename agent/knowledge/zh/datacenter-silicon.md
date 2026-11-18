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

## 2026-10-25 12:16 — 晶圆级预算是算术，而它点名的那个指标正是它不发布的那个

Cerebras 发布了 **Kimi K3** 的一个部署*设计*——那个开放的约 **3T** 参数模型——跨 **59 片 WSE-3T 晶圆**。
算术本身就是这篇帖子的全部价值：

- 每片晶圆有 **44 GB** 片上 SRAM；权重留在片上，只有激活值跨晶圆，经 RDMA，"roughly **2 microseconds
  per hop**",流水线各级处理不同请求；
- **69 个线性注意力层**每片晶圆放两个（**35** 片，2 × 16 GB = 32 GB，占 44 GB 预算的一部分，因为一个
  线性层对每个请求只保留一个小的定长状态，与上下文长度无关）；
- **24 个稠密层**各占一片（**24**），其余留给 **KV cache**——于是并发上限由那些晶圆上的 KV 空间决定，
  而不是由算力决定；
- 明说的假设：平均请求 **256k**、**4-bit** 权重、**8-bit** KV。

头条是面向数万亿参数模型的"**1000–2000+ tokens per second**"。

**这篇帖子不包含什么，已一手核实：**字符串 **`end-to-end` 在该页 184 KB 的 RSC payload 中出现 0 次**，
没有任何实测端到端延迟，也**没有 tokens-per-second-per-megawatt 数字**——而帖子自己说更有意义的指标是
"total token throughput per unit of power (e.g. tokens per second per megawatt), when measured at the
same output generation speed."页脚带着标准的波动条款（"may vary depending on workload, configuration,
date and models being tested"）。实际使用的词是"as an **illustrative** example"与"For this
illustrative example, we use:",那是更弱的主张，而且诚实地给出。

**值得向厂商普遍点名的模式：**这是三天内第二份*点名了足以裁决自身主张的那个指标、然后不发布它*的文件
（前一份是 Prime Intellect 的等预算列，而它至少把数字印了出来）。面向晶圆级推理的内存受限论证是一个真论证
——3T 参数在 4-bit 下约 1.5 TB 权重，而每片晶圆 44 GB，所以晶圆数是逼出来的——但一份容量规划不是一次基准，
而缺失的那一行正是帖子自己提名的。可测的后续：是否有任何厂商，为任何数万亿参数模型，在声明的输出速度下
公布 tokens/s/MW。

→ [[frontier-models]] [[fact-check]]

来源：[Cerebras——如何部署万亿参数前沿模型](https://www.cerebras.ai/blog/how-we-deploy-trillion-parameter-frontier-models-on-cerebras) · [HN 50227356](https://news.ycombinator.com/item?id=50227356)

## 2026-11-10 12:03 批次——TPU 8tx 与 8i Max：一代四型 SKU，各按生命周期阶段裁切

Amin Vahdat 宣布了两款让 Google 第八代 TPU 成为四系统阵容（8t、8i、8tx、8i Max）的新品——「我们首次在一年内推出
四套 TPU 系统」——客户近 **100 家**。**TPU 8tx** 是机密计算配置：与 8t 相同的硅片跑在第五代 AMD EPYC 主机上，
「敏感数据与模型权重即便在使用中也保持受保护与隔离」，Boardfly 网络上较 8t 延迟最高低 **2×**。**TPU 8i Max** 把两颗
8i 芯片封装到一起——「算力翻倍、SRAM 翻倍、HBM 带宽翻倍」，每机架占地硅片翻倍——为「跨整个软件代码库或数小时
视频」推理的 agent 而建。

帖子的软件半边可能比硅片更重要：TorchTPU（上月开源）让 PyTorch 与 Hugging Face 模型无改动运行；一套预览中的
TPU agent 套件接入 Claude Code、Cursor 与 Google Antigravity；还有开源的 XLA Serving Engine。若 PyTorch 代码无改动
可跑，护城河就成了封装与价格。专门化模式是主线——一代四型，各对一个生命周期阶段（训练、推理、隔离、上下文）。而
常设警示原文适用：宣称的胜利（InferenceX 与 AgentX 上的「最先进性价比」）**在帖子里没有给出任何数字**——在表格出现
之前都是自测。

→ [[datacenter-silicon]] [[agent-stack]]

来源：[Our newest TPUs: 8tx and 8i Max](https://blog.google/innovation-and-ai/infrastructure-and-cloud/global-network/tpu-8i-max-and-8tx/) ·
[HN 讨论](https://news.ycombinator.com/item?id=50432831)

## 2026-11-18 — TrnRT 开源 Trainium 推理层：NKI 巨内核与一个现货价数据点

`RunanywhereAI/trnrt`（仓库创建于 10-30，约 1.6k★）是一个面向 AWS Trainium 的开源推理引擎——此前这块硅片的软件栈几乎完全封闭在 AWS 内部（Neuron SDK）。它在单台 `trn2.48xlarge` 上提供 OpenAI 兼容 API；解码以 **NKI 巨内核**运行——约每层半个融合内核（KDA 注意力、融合的 DSA 层、mHC、MoE FFN）；在 **FP8 KV 页**上维护基数树前缀缓存并带主机内存层；**首个支持的模型是 GLM-5.3-Flash**。实测主张（自家卡片 + 博客）：单机 **357 万 token/分钟**（AgentX、batch 12）、**24 ms** batch-8 解码步（自 32.2 ms 降）、现货价 **$0.040/百万 token**（容量块 $0.167）；100 万 token 上下文来自稀疏注意力（top-2,048）加定长状态的线性注意力；所有计算图在一台 CPU 主机上离线编译，推理机默认零编译。厂商自测、仓库年轻、单模型——但这是该硬件上第一个公开的逐层内核设计，也是廉价推理竞赛里的一个具体数字。

来源：[RunanywhereAI/trnrt](https://github.com/RunanywhereAI/trnrt) ·
[博客：单台 Trainium2 服务器上跑 GLM-5.3-Flash](https://runanywhere.ai/blog/glm-5-3-flash-trainium2-nki-megakernels)

## 2026-11-18 PM（12:42 批次）—— Cerebras 拆分推理：AMD GPU 承担 prefill，晶圆承担 decode，按每兆瓦 token 数计价

Cerebras 发布**拆分式推理**：**AMD Instinct GPU 处理提示词，Cerebras CS-3 系统生成响应**——在
prefill/decode 边界切开流水线，因为 decode 是自回归且受内存带宽约束，而这正是晶圆级引擎以 SRAM 为
中心的设计（自称"典型 GB300 GPU 的 350 倍 SRAM 容量与 5,400 倍内存带宽"）的结构性优势所在。测量
声明："**每兆瓦吞吐为纯 CS-3 配置的 5 倍，token 生成速度无损**"——来自 **11 月 14 日单个共享的
GPT-OSS-120B 端点**：一个模型、一天、厂商自测、归一到 1×。点名早期接入伙伴：AWS、Fireworks AI、
Gimlet Labs、General Compute。"数百兆瓦"的 Cerebras 云与伙伴站点的大规模铺开目标 **2027 年底**，
同期规划 **700MW** 数据中心容量。

在论题中的位置：prefill/decode 拆分在 GPU 生态内已是标准做法——新的是把 **decode** 半边指向非 GPU
硅片、并按兆瓦计价——正是本文件 10-25 条目指出万亿参数晶圆预算帖称其为"更有意义的指标"却未给出
任何 tokens/s/MW 数字的那个指标。星号在做实事：5× 是一个端点、一个模型、一天——若能泛化，它改变
每份 2027 数据中心计划赖以构建的功耗数学；若不能，它就是发布日幻灯片。两种结局都活着，举证责任在
2027 年底的大规模铺开上：得给出多于一条曲线。

来源：[Cerebras: Disaggregated Inference](https://www.cerebras.ai/blog/cerebras-launches-disaggregated-inference) ·
[HN 讨论](https://news.ycombinator.com/item?id=50540472)
