---
title: 边缘 / 本地推理引擎
topic: edge-inference
created: 2026-08-13
---

# 边缘 / 本地推理引擎（2026 年 8 月）

一群在极小硬件上运行超大模型的项目。共享技术：利用 MoE 稀疏性——让小型共享核心常驻内存，
按需从磁盘流式加载被路由的专家权重——而不是对整个模型做量化。

## 模式
MoE 模型的每个 token 活跃参数量很小，而大部分专家集处于闲置。把这些专家从 SSD/NVMe 流式加载
（配 LRU/LFU 缓存），就能把数万亿参数的模型变成消费级硬件的工作负载。"零量化、零蒸馏"是它们
共同的口号。

## 项目
- **kimi-k3-in-c** — `FareedKhan-dev/kimi-k3-in-c`，Apache 2.0。176KB 的 C99 二进制在 8.24GB
  内存上运行 Moonshot Kimi K3（2.78T 参数）。MXFP4 打包的专家从 NVMe 流式加载，16/896 专家激活，
  O_DIRECT 主干流式传输，专家 LRU 缓存。与 PyTorch 参考实现逐字节一致。
- **TurboFieldfare** — `drumih/turbo-fieldfare`，Apache 2.0。Swift+Metal 引擎，在 ~2GB 内存
  （Apple Silicon）上跑 Gemma 4 26B-A4B。~1.35GB 共享核心常驻，逐层 16 槽 LFU 专家缓存。
- **Ling-3.0-tiny** — `inclusionAI/Ling-3.0-tiny`（蚂蚁 Bailing），MIT。7.9B MoE（1.3B 激活），
  KDA:MLA 3:1 混合注意力，128 个专家。M4 Pro MacBook 上 ~90 tok/s，<100ms 首 token。
- **Muse Glimmer** — `meta-models/Muse-Glimmer-30B`（Meta），Apache 2.0。30B，从 Muse Spark 1.2
  蒸馏而来，~17GB 4-bit 量化，RTX 5090 上经 DFlash 投机解码达到 233 tok/s。
- **Needle 2** — `cactus-compute/needle`（Cactus Compute），Apache 2.0。45M 参数 → 14MB C++ 二进制；
  无 MLP 层（Walsh-Hadamard 变换），哈希 n-gram 表。树莓派 5 上 500–800 tok/s。已部署于 Pebble
  Index 01 智能戒指。
- **h3.c** — `antirez/h3-metal`，MIT。C/ObjC + Metal 引擎，在 Apple Silicon 上运行 MiniMax H3
  全模态模型；从 safetensors mmap 加载，`--ssd-streaming` 将 DiT 内存从 36.5 降到 2.0 GiB。

## 内存管理对比

"MoE 稀疏性"这个共同标签下其实藏着两种不同的策略。值得把它们分开——它们优化的是不同的约束，
失败的方式也不同。

**A. 流式 + 缓存**（kimi-k3-in-c、TurboFieldfare、h3.c 的 `--ssd-streaming`）——让共享核心常驻，
按需从 SSD/NVMe 流式加载被路由的专家，并缓存热点专家。无论有多少专家，内存占用都保持平坦；
代价是路由切换后的首个 token 会遇到缓存未命中。

- **kimi-k3-in-c** — 规模最大（2.78T → 8.24GB RAM）。专家 **LRU** 缓存，`O_DIRECT` 主干流式传输，
  16/896 专家激活。与 PyTorch 参考实现逐字节一致是它的标志性主张。
- **TurboFieldfare** — 占用最紧（~2GB）。逐层 **16 槽 LFU** 缓存，~1.35GB 共享核心常驻。用 LFU
  （而非 LRU），因为活跃专家集很小且逐层都是热点。
- **h3.c** — 把通用机制暴露为一个开关（`--ssd-streaming`），并应用到 DiT（扩散）栈而不只是
  LLM——证明了这套技巧与模态无关。

**B. 缩小活跃集**（Ling-3.0-tiny）——把*每个 token 的活跃*足迹压得足够小（7.9B 中的 1.3B，
KDA:MLA 3:1 混合注意力），让整个模型装进内存；完全不做磁盘流式。优化的是延迟和确定性的
首 token 时间（<100ms），而不是总参数量。

**可复用的洞见：** 引擎选择是在*规模*（A 可流式加载任意多的专家，但要付出缓存未命中代价）和
*延迟*（B 永不未命中，但受限于内存能装下的量）之间的权衡。缓存策略（LRU vs LFU、逐层 vs 全局）
是区分 A 类各引擎的可调旋钮。留意这两种策略是否会融合——一个"小常驻核心"模型，在更大的硬件上
也能流式加载溢出的专家。

## 端侧 VLM（第三种策略，8 月 15 日）

- **LFM2.5-VL-3B** — `LiquidAI/LFM2.5-VL-3B`，lfm1.0 许可。一个约 3.1B 的视觉语言模型（LFM2.5-2.6B
  骨干 + SigLIP2 NaFlex 编码器），面向 GUI-agent 利基——在放不下 27B 模型的手机/笔记本上本地读取
  屏幕并定位物体。Apple M5 Max 上 228 tok/s，Galaxy S26 Ultra 上约 20 tok/s（不足 3.3GB）；ScreenSpot-v2
  80.7，RefCOCO P@1 87.9，ChartQA 81.3，16 种语言。官方 GGUF/ONNX/MLX 量化版本随附发布。

这不是流式 + 缓存（A），也不是缩小活跃集（B）——它是*小密集模型 + 官方量化*路径，与上面的 MoE
流式引擎互补。端侧推理如今横跨三种策略：从磁盘流式加载巨型 MoE、缩小活跃集，或发布带一手量化的
小模型。

## 用层流式做微调（8 月 16 日）

"流式加载冻结底座"这一技巧如今也覆盖了训练，而不仅是推理。**Soup**（`MakazhanAlpamys/Soup`，
Apache-2.0）降低了本地微调的硬件门槛：一份 YAML 驱动 SFT/DPO/KTO/ORPO 及 20+ 种方法，其 **layer
streaming** 让冻结底座留在系统内存，一次只把一个 decoder 层流进 GPU——于是 **8B 模型在 4GB 笔记本
GPU 上做 LoRA 微调**（RTX 3050 上 119.6 tok/s、3.32GB 峰值显存）。结果作为 CI 测试在九种架构上与
常驻 GPU 参考实现**逐位一致**地验证。与 A 策略（流式 + 缓存）同构，只是应用在*训练*这一趟：冻结参数
无需常驻显存。Beta：仅支持 transformers + 普通 LoRA（GRPO/PPO 除外——生成阶段要重读每一层）；可迁移
Axolotl/LlamaFactory 配置。

## Apple 神经引擎上的端侧训练（08-17 04:03）

一批 MIT 项目逆向 Apple 私有 ANE API（`_ANEClient`、`_ANECompiler`），在神经引擎上跑**训练——而不只是推理**，
无需 CoreML 或 Metal：

- **ANE**（`maderix/ANE`）—— 概念验证：Stories110M 上正向 + 反向，约 91–115 ms/步。
- **Orion**（`mechramc/Orion`）—— 一个图编译器，带 "Delta Compilation"（权重更新快 8.5×），约 22 分钟稳定
  训练一个 110M transformer 1000 步。
- **ANEForge**（`sbryngelson/ANEForge`）—— 一个 pip 可安装的 Python 绑定（约 75 tok/s，在测试模型上比 GPU
  节能 8–16×）。

信号：这把论点 3 的"流式加载冻结骨干"从*推理*延伸到真正新的端侧**训练基座**——Apple 的 ANE 本为仅推理设计。
私有 API 与约 5–9% 的利用率使其目前仍是研究级。

## "这台机器能跑吗"成为工具（8 月 18 日）

随着开源模型激增，*安装*问题已从"怎么跑"变成"装得下吗、该用什么量化"——两个项目把答案产品化了：

- **llmfit** —— `AlexsJones/llmfit`，MIT，约 32k stars，Rust CLI。检测 RAM/CPU/GPU/VRAM/后端，再用一个
  内存带宽模型（约 80 GPU 的查表）为数百个模型按内存适配度、估计速度、质量与上下文打分，挑出能装下的最高
  量化。它按**活跃**参数正确换算 MoE 模型大小（Mixtral 8x7B 从约 23.9GB 降到约 6.6GB），且 `llmfit bench`
  实测真实 tok/s，由用户经 PR 回填以替换估算。`llmfit recommend --json` 专为脚本/agent 设计，`llmfit plan`
  则反过来回答"为这个模型我该配什么硬件？"——硬件检测 + 量化选择成了一键、可被 agent 脚本化的答案。
- **omlx** —— `jundot/omlx`，Apache-2.0，约 19k stars，SwiftUI macOS 应用（源自 vllm-mlx）。经 MLX 在 Apple
  Silicon 上原生跑 LLM/VLM，并在 localhost 暴露 OpenAI/Anthropic 兼容 API。亮点是**两级 KV 缓存**——热 RAM
  层 + 冷 SSD 层（以 safetensors 持久化、重启后仍在）——外加连续批处理、多模型 LRU 逐出、8GB-below-RAM
  内存守护，以及 MCP/结构化输出支持（LLM、VLM、OCR、嵌入、重排器，可选分布式多 Mac 推理）。Apple Silicon
  的统一内存是本地模型最划算的宿主，omlx 把它变成真正的（SSD 支撑、可批处理）服务器——向"Mac 即推理节点"
  又近一步。

信号：边缘推理故事如今有了*选择*与*服务*两层，而不只是引擎——llmfit 回答"哪个模型 + 哪种量化装得下这台
机器"，omlx 回答"把它作为常驻服务器对外提供"，两者都本地优先。

## 适配实测预算取代预设压缩——RAM 不再便宜（8 月 19 日）

三个独立项目在两周内收敛到*同一种*重新框定：不再选择压缩预设，而是针对你实际测得的字节数求解一个
分配问题。

- **Shoehorn**（MIT，Rust，8 月 13 日创建）——反转了量化选择。它不是挑一个无视机器的预设，而是"从你实际
  拥有的内存出发，减去推理本身所需，再针对剩余部分求解逐张量的混合精度分配"。报告的适配极端："常规使用预算
  的 **99.99%**，有时精确到字节"，并以 `unsloth/Qwen3-4B-GGUF` 给出一个实例：**519.2 MiB 的预算用了 519.2
  MiB——99.998% 利用率，仅 13 KB 余量**。量化器用 Rust 从零编写（不链接任何 llama.cpp 代码），输出标准
  **GGUF v3**，llama.cpp 只作为推理后端，因此下游无需任何改动；`shoehorn ui` 测量机器、流式呈现适配过程，并在
  你开始对话前报告困惑度代价。目标平台为 macOS Apple Silicon、Linux x86-64（NVIDIA/AMD）、Windows x86-64
  （NVIDIA），内存档位从 8 GB 到 128 GB，上下文 4k–32k。**非常年轻——检查时仅 37 stars**，所以请把 99.998%
  这个数字当作作者演示，而非独立结果。
- **Linux VRAM overcommit（显存超配）** —— Valve 承包商 **Natalie Vock** 交付了让 Linux 在 GPU 内存压力下
  不再把前台游戏的显存换出到系统内存的工作。它建立在 **`dmem` cgroup 控制器**（`dmemcg`，与 Maarten
  Lankhorst/Intel 及 Maxime Ripard/Red Hat 共同开发，已进主线）之上，新增六个内核补丁加两个用户态助手——
  `dmemcg-booster` 和一个 KDE Plasma "Foreground Booster" 分支——让前台应用优先获得显存，后台应用先被逐出。
  覆盖 AMD `amdgpu` 与 Intel `xe`；**NVIDIA 没有等价机制**。实例：后台应用只给需要 **7.4 GB** 的游戏留了
  8 GB 显卡中的 **6.1 GB**；这些补丁归还了 1 GB。现已通过 CachyOS（Linux 7.0rc7-2+）和 `linux-dmemcg` AUR
  包可用。
- **llmfit**（上文）——同一形态在更高一层：测量机器，然后挑选能装下的最高量化，按*活跃*参数换算 MoE 大小。

**让这件事变得紧迫的制衡因素——内存不再变便宜了。** TrendForce（8 月 17 日）：德国 DDR5 零售价格指数在 8 月
同比从 **445% 攀升到 486%**——一套典型内存约是**去年的 4.9 倍**——而深圳华强北市场 **DDR5 24Gb 环比
+14.29% 至 $48**、16Gb 到 $40，**DDR4 8Gb 3200 环比 +12.82% 至 $22**。TrendForce 预测 **3Q26 服务器
DRAM 合约价环比上涨 13–18%**，称市场供不应求，并预计服务器 DRAM 短缺将持续到 2027 年；Tom's Hardware 的
零售数据点是 **128 GB DDR5 售价 $3,399**（仅标题——正文付费墙）。原因：AI 数据中心与 HBM 需求把晶圆产能从
通用器件上抽走。

信号——本文档的两半现在相互拉扯。**MoE 稀疏性 + 磁盘流式降低了模型的下限**（论点 3 的原始主张）；**DRAM
定价刚刚抬高了机器的下限**。于是优化压力从"把模型做得更小"转向"**把手里精确的字节花掉**"——这正是 fit
求解器（Shoehorn、llmfit）与 OS 级设备内存 QoS（`dmemcg`）在同一窗口出现的原因。cgroup 工作超越游戏范畴的
意义也在于此：它是第一个主线的原语，用于在本地模型与桌面上的其他一切之间仲裁显存。

## Unsloth 成为桌面应用——运行与训练合二为一的本地工具（8 月 19 日）

`unslothai/unsloth`（Apache-2.0，**73,546 stars**，8 月 18 日 push）悄然换了品类：仓库描述现在写着 "Local
UI to run and train LLMs and diffusion models"，而 **Unsloth Desktop** 已在 Windows/macOS/Linux 上以极快的
发布节奏推出（v0.1.70-beta → v0.1.800-beta，8 月 11–14 日），带无代码训练、RAG、MCP 与远程 Cloudflare
访问。最新版本通过 Dynamic GGUFs 加 NVFP4 量化，**在约 17 GB RAM 内本地运行 Qwen3.8-27B**，宣称 GGUF 推理
在更低显存下快约 10%，并以模型切分适配更小 GPU 实现 "Fast FP8 10× faster MiniMax-H3 inference（3 分钟 vs
30）"；还新增 AMD RDNA 3/4 + Strix Halo 支持、Mac 上基于内存的上下文尺寸、每模型 `llama-server` 参数，以及
针对外部提供商的工具调用 + 网页搜索。

触发点是三个模型发布在两周内落进同一个工具——Desktop 发布（8 月 11–13 日）、Meta Muse Glimmer 支持（8 月
10 日）、Qwen3.8 支持（8 月 14 日）。信号：Unsloth 曾是一个*需要 import 的微调库*；如今它成了在同一硬件上
运行**和**改造模型的本地优先 GUI，且接入了 MCP——为从不打开 notebook 的人抹平了"试一个模型"与"改造一个
模型"之间的鸿沟。与 Shoehorn 和 llmfit 一起，本地技术栈如今把选择、适配、服务与改造都变成了普通的桌面
软件。

## Ling-3.0 基座检查点转 MIT + 一个领域 token 的教训（08-21 04:03）

- **Ling-3.0 基座检查点**——上文的 `Ling-3.0-tiny` 条目多了一个研究级兄弟：蚂蚁集团/inclusionAI 发布
  `Ling-3.0-tiny-base`（7.9B/1.3B 激活）与 `Ling-3.0-flash-base`（124B/5.1B 激活），外加**跨越预训练、中训练和
  WSM 合并阶段的六个检查点**，全部 **MIT**。中间训练阶段正是研究者通常看不到的东西——在前沿邻近模型上做持续预训练
  与 MoE 消融成为可能。
- **RollTab**——一个 125M 的 decoder-only transformer，在 iPhone 上实时续写 MIDI 钢琴（Core ML、INT8，iPhone 15
  上约 108 notes/s）。可迁移的教训是 token 化：单个 **NOTE token 携带五个类别字段**（事件类型、音高、起始 delta、
  时值、力度），每个音符跑一次而非每个字段跑一次，正是这让 125M 感觉像实时。领域专属 token 化胜过蛮力规模——
  "精确花掉你拥有的字节"的端侧镜像。

## 投机解码 + 稀疏长上下文（08-23 04:03）

- **Liquid AI DSpark**——自包含投机解码草稿检查点（1.2B/2.6B/8B-A1B）为 LFM2.5 加速，且**保证贪心输出一致**（草稿 token
  只有匹配目标分布才被接受）：H100 吞吐最高 **3.18×**（MATH500 上 428→1362 tok/s）、M4 Max 上 **2.87×**（136→389 tok/s）、
  多工具函数调用平均延迟降 57%，llama.cpp + SGLang 当日即支持。纯 ~3× 加速、零质量损失，横跨数据中心到 MacBook——
  "精确花掉你拥有的字节"的优化现在有了*保证无损*的投机变体（thesis 3）。
- **KeysAndValues**（AWS，arXiv 2608.19920）——一种长上下文**稀疏注意力**微调方法，可在单张 A100 40GB 上适配任意
  KV-cache 策略，让模型与策略协同适应，往往胜过用精确序列并行注意力训练的模型；附 H2O 内核 + 一个开源库。去掉了让长上下文
  稀疏微调在普通硬件上不切实际的序列并行前提。
- **已知仓库，新事实。**`jundot/omlx`（~20.3k stars）新增 DeepSeek-V4-Flash M2-Ultra 内核，并把 ANE 编译内存从 35.8GB 降到
  4.7GB（0.6.3rc2）；`AlexsJones/llmfit`（~33.6k）延续"测量并分享"的 tok/s PR 循环。两者 08-18 已覆盖——去重窗口的加宽
  （见 [[agent-stack]]）本应把它们框成更新而非新发现。
- **FreeToken**（arXiv **2608.16157**，2026-08-17 提交；`FlashML-org/FreeToken`，Apache-2.0，2,824★，创建于
  2026-07-20，每日推送）——*"Efficient Edge-Native MoE Serving with Bandwidth-Adaptive Execution"*（Shuo Yang、
  Xiaoze Fan、Melissa Pan、Haocheng Xi、Zhe Wang、Shanlin Sun、Kurt Keutzer、Song Han、Matei Zaharia、Chenfeng Xu、
  Ion Stoica）。这是本文件论点迄今最强、且将其一般化的实例。早先的工作是针对一个*固定*计划流式加载专家，而
  FreeToken 把整台个人机器——GPU、CPU、RAM、PCIe、磁盘——当作「一个统一、有弹性的推理平台」，并且不是采用固定
  卸载策略，而是「持续把计算与模型状态映射到实际可用的资源上」，协同设计模型布局/加载、专家驻留、CPU–GPU 执行、
  agentic 状态复用与运行时内存管理。在摘要页已核实：**8 GB 笔记本 GPU 上的 35B**、**游戏台式机上的 284B**、
  **单块工作站 GPU 上的 753B GLM-5.2**，以及 **20+ 个 MoE 模型**。*仔细读加速比：*相比 llama.cpp / Ollama /
  KTransformers / MoE-Infinity 的 1.3–2.1× 平均解码增益**不在摘要页上**——它在 PDF 里，所以引用它时要当作论文声明，
  而非摘要已核实的数字。
  **最锋利的一句是动机，而非数字。**FreeToken 为自适应辩护的论据是：agent 工作负载「不断改变其执行模式」——
  prefill 密集的工具读取、decode 密集的推理、状态复用的突发——所以静态卸载计划在构造上大多数时候就是错的。本地服务
  现在正针对 *agentic* 的变异而非聊天来设计，这正是优化目标再次移动的原因：08-19 是适配一个已测得的预算（静态），
  这个是适配你*此刻*拥有的预算（动态）。它闭合了始于 DRAM 价格冲击的弧——如果买不起字节，就去调度字节。
- **FlashPrefill V2**（arXiv 2608.19758；`qhfan/FlashPrefillv2`，Apache-2.0）——块稀疏 prefill 注意力，带一个均值
  修正项，在极端稀疏度下抑制近似误差，外加一个带 warp 专业化与乒乓流水线（FP8/BF16）的 PackGQA 稀疏算子、分页
  KV cache、连续批处理，以及一个即插即用的 **SGLang** 后端。报告在 H20 上 128K 上下文时**最高达 FlashAttention-2
  的 47.26×（FP8）** / 27.19×（BF16）。**新鲜度/可信度告诫，已一手核查：**该仓库创建于 2026-08-19，读到时有
  **8 stars**——一个才两天大的工件，顶着 47× 的头条，却没有任何第三方复现。正确姿态是 InferenceX 那种（见
  [[frontier-models]]）：这么大的内核声明，在被当作事实之前，理应挂在一个常设、持续运行的 harness 上。还要注意
  轴线：FreeToken 优化的是*边缘*；FlashPrefill V2 优化的是*数据中心*长上下文服务。同一年份，硬件曲线的两端，而
  只有前一个才是关于你桌上的那台机器。

## Daedalus-150M——为 CPU 层把 KV cache 设计掉（08-24 12:03）

`Daedalus-150M`（arXiv 2608.20210）是一个为 CPU 推理而建的 150M 参数 LM：18 个块里只有 6 个用全注意力，12 个用「记忆
只有两个时间步宽」的短卷积，因此网络的三分之二从不重读不断增长的 cache。从零在 59.9B token、4-bit 权重上训练，它在
预注册的五任务基准（47.31 vs 42.20 的及格线）上击败 GPT-2 124M、Pythia-160M、OPT-125M 与 MobileLLM-125M——尽管后者的
数据量是它的 3×–1000×，并且 2K 上下文下解码比同尺寸全注意力对照快 1.76×。重点是*消融*：数据相同、尺寸相同、只有架构
改变——于是 KV cache（长上下文 LLM 的主要内存成本）被隔离为那个杠杆。FreeToken 是迎着实时预算流式加载专家，Daedalus
攻击的是*另一项*内存成本——cache 本身——通过把注意力从大部分网络中移除。边缘弧线延伸：KV cache 并非天经地义；它是
CPU/边缘层大可以放弃的一项设计选择。

