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

