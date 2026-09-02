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

## Second Thought —— 在空闲窗口里推理（08-25）

**Second Thought**（arXiv 2608.13667，SMU）利用 ReAct agent 的「推理空闲窗口」——等待工具执行与观测结果的时间——在
每个 Thought 阶段结束的瞬间分叉出**四条辅助推理分支**（验证、回忆、复述、回退），与主循环并发解码，待观测到达时合并。
免训练。在 3 个基准 × 3 个 LLM 上把主线程解码最多减少 43%（平均约 20%），并在算力匹配的对照下以 1.3–3.2× 更少的顺序
解码取得更高 Pass@1。并非边缘/量化技巧——它是 agent 运行时层的「边等边想」，在不增加用户可感延迟、不重训的前提下扩展
推理；对任何在工具 I/O 上闲置的运行时都直接相关。


## Apple 的 2nm 转向——512 GB / 1.2 TB/s 的端侧前沿级推理（08-26 04:03）

端侧推理的天花板刚被抬高。Apple 发布 **M6**——首款 **2nm** 芯片——装入新 Mac mini（双 16 核神经网络引擎，
AI 性能最高为此前 mini 的 4×，**$899**）；**M5 Ultra**（quad-die UltraFusion，最高 36 核 CPU / 80 核 GPU）
装入 Mac Studio——**512 GB 统一内存 + 1.2 TB/s 带宽**，足以承载"数千亿参数"的端侧模型，LLM 提示词处理
最高为 M1 Ultra 的 9.8×。Mac Pro 停产，Studio 成为顶级桌面。9 月 22 日随 macOS 27 发货。约 4.3–4.5×
的 AI 数字是 Apple 自报；价格跳涨（mini $899 / Studio $5,499）反映的是 DRAM 成本环境（上文内存经济学笔记）。
论点 3 的端侧推理转向如今有了一台消费级邻近的机器，能把前沿级权重常驻内存——带宽自适应服务
（FreeToken 的桌面 284B / 单工作站 753B 数字）的硬件一半不再只是理论。

## llama.cpp v0.3.0 + Perplexity Portable Computer —— 本地栈的参考运行时与产品化的本地优先 agent（08-26 12:03）

- **llama.cpp v0.3.0（ggml-org）—— 本地推理参考运行时的首个 0.x 大版本，久违了。** `mtmd` 多模态库新增
  **dots3-note 视觉与音频**（新的 DSA-ISWA KV 缓存类型）、经 ffmpeg 的 WebP 解码、Pillow 精确的缩放算法，
  以及修复了 `moov` atom 在文件末尾的视频；GLM-4.5-Air 增加 MTP，DeepSeek 4 新增 tensor-split 模式，
  核心升至 **ggml v0.22.0**（meta-backend 张量切分、并行编译的逐算子 Metal kernel、真正的非 in-place
  `ggml_clamp`）。多模态 + 视频处理收拢进大多数本地 AI 工具所依赖的同一个二进制——对整个本地推理生态
  （论点 3）都是一次一等信号更新。
- **Perplexity Portable Computer —— 在 NVIDIA DGX Spark 上把"本地优先、云端按需"产品化。** 与 NVIDIA 紧密
  合作打造的 Computer agent 平台的纯本地版本：本地模型（Qwen 3.8 27B 或 Perplexity 后训练的 **PPLX 27B**）、
  agent 运行框架、工具路由、连接器与一个 OS 级沙箱全部本地运行，本地工作消耗**零 token 额度**——升级到 15+
  云端前沿模型需要显式批准，且只返回纯文本建议、不接触本地文件。在其 Local Knowledge Work Bench 上得 82.6%
  （PPLX 27B 为 85.4%），优于 Pi 77.6 / Hermes 74.0，BrowseComp 上比 Pi 少用约 70% token。值得追踪的论点：
  本地 agent 需要的是*协同设计*的运行框架，而非通用框架——把小型模型 agent 之争重新框定为框架设计问题
  （论点 12 的杠杆伸到端侧），落脚在上文 M6/M5 Ultra 的硬件天花板之上。
  **独立核实（08-26 12:27）：** 该基准**仍是厂商自测**——Perplexity 计划开源 Local Knowledge Work Bench 但尚未，
  且无第三方复现。协同设计*机制*有独立支持：harness 溢价文献（论点 12，arXiv:2605.30621）发现弱模型无法*加载*
  并遵从通用 harness（skill-load 0.251、遵从度 0.52→0.13）——正是 Portable Computer 点名的"小模型在通用 harness
  假设下不堪重负"失败。Perplexity 自己的拆解把领先 Pi 约 12 分中的 ~5 分归功于 harness 栈（基础 Qwen 也领先 Pi 约 5 分），
  PPLX 后训练只加 2.8 分——在基准开源前，应视为方向性主张而非规格。DIY 复刻路径（Ollama + Qwen3.8-27B + OpenCode，
  24 GB GPU）存在，但不是独立基准。

## QAH + CarWatch + Groq 3 LPX (08-26 20:19)

- **QAH —— 量化感知治愈让 4-bit 模型反超其 bf16 源（arXiv 2608.20953，Multiverse Computing）。** 用**直接从原始全精度
  模型**经 KL 散度蒸馏 4-bit 学生，取代 QAT/QAD 中降级的中间教师。应用于 GPT-OSS 120B → 60B → MXFP4，QAH 学生在
  **9 项基准中 7 项匹配或超过其 bfloat16 源**（AA-LCR 42.7 vs 35.3，AIME 2025 76.3 vs 70.7，Aider 40.9 vs 38.2），
  并在 LiveCodeBench 上逼近 120B 教师——权重与每 token 算力约减半。在 GPT-OSS 9B 上峰值约比 QAT 快 7×，1,200 步内
  距峰值约 2 分，而 QAT 掉约 19 分。以开源权重 **HyperNova-60B**（Apache-2.0）发布。**注意：** Multiverse 自有管线上的
  自测数字（专有压缩、仅 GPT-OSS）——"反超 bf16" 是需要复现的结果，尚非独立事实。按实测预算量化转向（论点 3）多了
  一个"能自愈的压缩"变体：若 4-bit + 减半参数就能匹配全精度，开源模型的主导服务成本就会下降。
- **CarWatch —— 树莓派 5 变成完全离线的车载 agent（`ThinkOffApp/CarWatch`，AGPL-3.0，171★，Show HN）。**
  本地跑 **Qwen3.6-35B-A3B**（约 14.3 GB 量化，约 3.5 tok/s），对 745 页车主手册做 RAG，经蓝牙 ELM327 读取 OBD-II，
  并通过 Home Assistant 发出"可安全执行"的云端命令（锁门、关窗）。免提语音完全端侧——连续 VAD → whisper.cpp →
  接地答案。一台约 $100 的设备跑 35B 本地模型是具体的"本地 AI"终态；只读 OBD-II 与显式"可安全执行"命令的切分，
  是端侧 agent 合理的安全模型。
- **NVIDIA Groq 3 LPX —— 解码引擎进入量产（Gemma 4 31B 在 100K 上下文下约 3,400 tok/s）。** Hot Chips 2026 上
  NVIDIA 宣布来自 Groq 收购的解码阶段 **LPU** 芯片（与 Vera Rubin 互补）进入量产。Artificial Analysis 实测在
  **Gemma 4 31B 100K 上下文下约 3,400 输出 tok/s**（zhidx 引用 100K 下 3,431 tok/s 中位数，与 10K 几乎持平；
  SPEED-Bench 编码中位数 4,767）。每机架 256 个 LP30 加速器（128 GB 片上 SRAM、640 TB/s scale-up、液冷）；
  **Nebius** 通过其 Token Factory 平台成为首个云厂商。硬件押注**多轮 agent 工作负载（而非聊天）才是推理的约束**——
  与按实测预算转向互补的"解码引擎"。注意（08-26 20:19 已核实）：头条数字**由 Artificial Analysis 实测，但在私人预发布端点**
  （8 月 21 日），而非生产级 serverless——独立评估方，但还不是生产实测；4×/30× 为厂商预测。

## 面具不是模型 + ALPHABET（08-27 04:15）

- **已发布混合模型中的因果泄漏——《面具不是模型》（arXiv 2608.22876）。** 领域默认的因果正确性检查——检查注意力掩码——
  根本不够；论文形式化**前缀不变性**并给出单页、两次前向传播的逐层审计。用 192 次注入故障试验测试 **8 个已发布检查点**，
  发现**两个**存在真实缺陷：Zamba2 与 Nemotron-H 在其循环/扫描组件的**分块扫描边界**恰好泄漏信息。掩码是对的，但块间聚合
  泄漏——**"因果性是图级属性。"** 掩码检查"一个也没检出，而我们的审计把 192/192 全部定位到精确层。"**为何重要：** *已发布、
  被广泛下载*的开源模型存在因果泄漏，意味着预训练权重里带未来上下文污染——而且教训适用于所有正在出货的扫描/聚合架构，
  **包括新的 DeltaNet/QSA 混合体（Qwen3.8-Flash-Next）**与 Kimi K3 的线性注意力核心。审计工具很便宜（一页、两次前向）；
  悬而未决的问题是它会不会在混合架构*发布前*被用上（→ 议程）。
- **ALPHABET——6,437 参数线性时间序列模型逼近 Bayes 预言机（arXiv 2608.24051）。** 用直接库（重合成特征轨迹）、独立级联库
  与只读模态能量与滞后矩的仿射头，把时间历史压缩成稳定的复"极点模态"——宽度 D=64 的"显式可审计预测接口"。在高斯控制任务上
  其学习描述子逼近 **Bayes 预言机**，而原始自协方差只达随机水平；在 82 任务注册表上平均秩 **3.97**；比九个基线**推理快 5.02×**、
  训练快 3.93×；每个模态能量对应二阶谱的频域局域测量。"微型高效模型"趋势的极端（与 Daedalus 的 KV-cache 消除并置）——
  可审计内部状态（模态能量，而非黑箱激活）对需要知道模型*为何*如此决策的控制任务是真正的差异化。
- **审计工具同一周被产品化——VIDRAFT AX-RAY（08-27 04:30，一手核实）。** 《面具》论文作者（VIDRAFT，韩国 AI 公司，
  首席执行官 Kim Min-sik）把该诊断做成 **AX-RAY / FINAL-Bench Diagnostics**——一个公开的 AI 安全目录，含 **117 个诊断项**，
  横跨三个轴、十一个运营类别（前缀不变性/因果泄漏、分块扫描与掩码一致性、KV-cache 路径一致性、跨实现一致性），把条目映射到
  法律/监管/伦理语境，并把确证的因果泄漏视为**阻塞缺陷**，与分数无关。它正被定位为韩国政府"网络安全专用 AI 基础模型"项目
  的验证层——这项审计如今有了一个*监管*客户。**观察，暂答（08-27 04:30）：截至本次运行，没有任何已发布的前缀不变性审计**
  **覆盖 Qwen3.8-Flash-Next（Gated DeltaNet + QSA）或 GLM-5.3-Flash（稀疏 + 线性）**——无论是实验室还是第三方。
  根因如今是一个代码级普查条目：在 `transformers` 5.7.0 中，`modeling_zamba2.py` 与 `modeling_nemotron_h.py` 先置换再沿
  **输出**分块轴归约，而 `modeling_mamba2.py` 沿**输入**分块轴归约——且该缺陷只在缺少快速内核（CPU/CI 慢路径）时触发。
  审计足够便宜，以至于它缺席于新混合架构发布这件事本身就是一个信号。

## colibri + 百度 Unlimited-OCR——无 GPU 的 MoE 与恒定 KV 解码器（08-28 12:15）

- **colibri（`JustVugg/colibri`，Apache-2.0，纯 C，26.3k★）——迄今最强的"无 GPU 前沿"引擎。** 把 VRAM、RAM 与 NVMe 当作同一内存层级：744B MoE 的约 19,456 个路由专家驻留磁盘（约 370 GB），按需经逐层 LRU 缓存（带学习热钉）、批量并集读取、`O_DIRECT` 与双 SSD 镜像流式加载。能跑 GLM-5.2（744B）、Kimi K3（2.8T）、Inkling（975B）、DeepSeek-V4-Flash、Qwen3.6 与 OLMoE——"它们都不需要 GPU"；速度受磁盘约束，GPU 只起辅助。v1.8.0，活跃维护（77 个开放 issue，40 个 PR）。专家流式加载击碎了"前沿 MoE 推理需要数据中心"的假设——正是这股压力让 2.8T 参数模型可被一台笔记本认领（论点 3，与 kimi-k3-in-c / FreeToken 并列）。
- **百度 Unlimited-OCR（`baidu/Unlimited-OCR`，MIT，24.7k★）——恒定 KV cache 的一次性长程文档解析。** 用 Reference Sliding Window Attention（R-SWA）替换 DeepSeek-OCR 式流水线的全部解码器注意力层：全局可见的视觉 token 参考段 + 128 token 滑窗解码窗口让 KV cache 恒定，因此几十页可在单次前向中转录，而非逐页循环重置内存。3B 总量 / 500M 活跃的 MoE 解码器把 1024×1024 PDF 页压缩为 256 个视觉 token（16×），带单页（"gundam"）与多页（"base"）模式。在 OmniDocBench v1.5/v1.6 单页端到端解析上达到 SOTA；作者认为 R-SWA 可泛化到 ASR 与翻译。"Soft forgetting" 才是 KV 增长之墙的真正解药——一种通用注意力模式，而非包装（论点 3，与 Daedalus-150M 的缓存消除并置）。

## ODS——本地 AI 安装器成为独立类目（09-01 12:22）

- **`Osmantic/ODS`（Apache-2.0，5.6k★，v2.6.0 stable）**——一条 `curl | bash` 安装器（Windows 上为 PowerShell 块，需
  Docker），装配完整本地栈：llama-server、Open WebUI、LiteLLM、Whisper、Kokoro TTS、Hermes agent、n8n、Qdrant、
  SearXNG 与 ComfyUI。自动检测 NVIDIA / AMD（含 Strix Halo 统一内存）/ Intel Arc / Apple Silicon / CPU，按 VRAM/RAM
  预算挑选模型档位，"bootstrap 模式"在 2 分钟内先以 1.5B 模型提供服务，真正的模型后台下载、热替换接入。每个服务都是
  由 `ods` CLI 管理的即插式扩展（manifest + compose 文件）；默认本地优先，云/混合可选。集成税就是产品——本地 AI 安装器
  正在成为独立类目，恰好赶上新硬件浪潮（Strix Halo、Mac Studio 集群）给了人们可以指向它们的机器。注意点：约 1.4k 开放
  PR 对 3.2k 提交是罕见的维护形态；"主权人权"式话术是项目自己的营销；装配后的栈无第三方基准。

## Baseten 的效率前沿——哪些技术在权衡，哪些在消除权衡（09-02）

- Philip Kiely 把组合金融理论引入推理工程：每个部署都位于一条延迟–吞吐效率前沿上，技术分为让你**沿前沿移动**
  的（批大小、张量/专家/注意力数据并行）与**把前沿向外推**的（量化 MXFP4/NVFP4、投机解码 EAGLE-3、prefill/
  decode 分离）——前沿收益还会复合（2× 硬件 × 2× 软件 ≈ 4×）。
- 显眼的告诫是诚实之处：一个**没有基准**的概念分类学；前沿"非常崎岖"，拐点只能靠经验扫描发现；框架默认的是
  GLM-5.3/Kimi K3 级模型在带 KV 缓存复用与 KV 感知路由下做 agentic coding。量化获得单独注记：它打开的是一条
  *新的*质量轴，而非免费收益。
- 有用在于推理争论通常是缺乏共享地图的权衡之争——命名哪些技术是重定位、哪些是扩前沿，正是真实服务配置决策
  背后的心智模型；而零基准的免责声明让它保持为心智模型，而非结果。

## M4 Pro 蓝图——本地 LLM 市场的具体中场（09-02）

- lws.io（HN 237）：一台常开的 M4 Pro Mac mini（48 GB）跑 **Qwen3.6-35B-A3B-OptiQ-4bit**（35B 总参数 /
  256 专家、约 3B 激活、约 20 GB 常驻）作为主推理模型，外加 Gemma-4-E4B-it（2.4 GB）负责聊天与格式化，
  由 **oMLX**（HF 模型浏览器、自动发现、SSD 持久化 KV 缓存）服务，实测 325 tok/s 提示处理 / 34 tok/s 生成
  ——从 iPhone、MacBook 与 mini 经 Tailscale 触达。客户端：Hermes agent 后端、iOS 上的 Apollo、Raycast AI、
  编码用的 Pi。
- 数字带着取舍陈述：4-bit OptiQ（敏感层 8-bit）对比 BF16 损失 1–2 个基准点；稠密 27B 模型装不进 16 GB
  机器除非忍受 swap 之痛；34 tok/s 是"快到他注意不到"，而非即时。选型清单：4-bit 下文件体积（GB）≈ 参数量，
  减去约 6–8 GB 的 macOS 开销，再减去 KV 缓存余量，并在 SSD swap 之前保留 10–15% 缓冲。
- 定位：slotstream 的专家流式极端与 API 回退之间的具体中场——一台约 $1,400 的常开盒子覆盖"那 80% 不需要
  GPT-5 或 Claude Opus 的请求"，API 作为回退保留而非纯洁性测试。最说明问题的细节是 MoE 教训：总参数量是
  营销；活跃参数 × 量化才是装得进 RAM 的东西。
