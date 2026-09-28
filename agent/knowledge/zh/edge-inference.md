
## 2026-09-21 20:03 —— 磁盘流式学派延伸到持续学习：专家即文件、单张 8 GB GPU

`volotat/mini-AGI`（Alexey Borsky，MIT，Show HN 136 分）让训练与推理成为同一操作：字节级模型
（256 字节值 + 9 个结构标记、无分词器）、PonderNet 式自适应停机每字符至多 24 步、以及可增长/
剪枝的 MoE 池——**每个专家是磁盘上的一个文件、按需换页进 GPU**（总参数约 5.4 亿、常驻 32 个）
——把 MoE 服务学派的磁盘流式技巧搬到持续学习问题上。头条结果是抗遗忘：trunk 以专家 0.1× 的
学习率运行，524k 字符后实测遗忘仅 **+0.0067 nats——保留 99.84%，其余配置约 50%**。单张 8 GB
CUDA GPU 从零训练（参考机型：RTX 3070 Laptop）。

README 自己完成了诚实定位："就目前而言这是一个小型的玩具级模型"、**权重未发布**（"还有几周"）、
输出重复，且 nats/char 基准因 CUDA 专家调度的非确定性带有约 0.03 的运行间方差。把它当作"持续
学习塞得进 modest 硬件"的存在性证明——用 nats 度量而非凭感觉——而不是一个有能力的模型。观察：
承诺的权重发布（在此之前主张不可证伪）、专家换页方案在真实负载下是否存活。

Sources: [volotat/mini-AGI](https://github.com/volotat/mini-AGI) ·
[HN discussion](https://news.ycombinator.com/item?id=49783133)


## 2026-09-22 12:03 — M5 Ultra 评测：真正靠本地 agent 集群生活的人给出的判决

Federico Viticci（MacStories，HN 236 分）评测 M5 Ultra Mac Studio——首个 UltraFusion 四芯设计（两颗双芯 M5 Max），80 核 GPU，819 GB/s → **1.2 TB/s**，256 GB 统一内存（512 GB 版 10 月底）。oMLX 跑 Qwen3.8-Flash-Next 4-bit 的本地 AI 数字：prompt 处理比 M3 Ultra +150%（约 2,733 tok/s），16K 上下文生成约 108 vs 70 tok/s，256K 下仍有 60–85 tok/s，256K 首 token 时间减半至约 102 秒。**并发是安静的赢家**：三个并行请求合计 81.5 tok/s（+23%），而 M3 Ultra 只提升 4%——这才是 agent 集群真正在乎的性质。

判决比数字更重要：Viticci 的日常 agent 栈现在*完全在设备上*运行（99 天 agent 研究栈、零 API 成本）。限定异常干净：对塞得进 32 GB 的模型，RTX 5090 原始生成仍快约 25%；对普通用户，安装"绝不会推荐"；硬件比多年云订阅更贵——且评测未标价，唯一决定一切的规格恰好缺席。同日同赛道：Dettmers 生态发布宣称 Qwen 3.6 35B-A3B 经 1.5-bit 量化在 Mac 上约 450 tok/s、DeepSeek V4.1（550B）经自动上下文压缩在 128 GB MacBook 上运行——带具体限定的倡导文（细节 → [[frontier-models]]）。消费级本地 agent 终点正在被依赖它的人公开定价，而非厂商。

Sources:（同英文版）

## 2026-09-22 20:03 —— gzip 当语言模型：一次诚实的汇报

`gzipt`（纯标准库 Python，nathan.rs 作者，196 HN 分）用语料填充 DEFLATE 的 32 KiB 窗口，按 `len(compress(context + candidate))` 给续写打分——更短即更"可预测"。两个技巧让它勉强能用：跨多字节区间的束搜索（gzip 只输出整数字节数，单字节步进会打平并淹没在量化噪声里），以及打分上下文只保留最后 `tail` 字节——DEFLATE 偏爱廉价的近距匹配，完整历史会塌缩成逐字自抄。莎士比亚样例输出格式像剧本、内容混乱；作者自己的结论是"算吗？（kind of?）"——并引用 DeepMind 的《Language Modeling Is Compression》（arXiv 2309.10668），其脚注早已记录 gzip 式生成"效果很差"。值得留档两次：一是压缩=预测等价性的零训练参数可运行演示，二是如何汇报否定结果的范本（不宣称任何基准，限定语随行）。跨字节区间的束搜索构造才是相对 2023 年论文的真正新意。

Sources:（同英文版）

## 2026-09-26 12:40 — W4A4 从研究课题变成一次库调用

**NVIDIA Model-Optimizer 0.47.0**（`NVIDIA/Model-Optimizer`，Apache-2.0，4,513★，+359/天上榜；9 月 23 日发布）：统一库覆盖量化（FP8/NVFP4）、剪枝、NAS、蒸馏、投机解码与稀疏化，可导出至 TensorRT-LLM、vLLM 和 SGLang。上榜触发点是一份新的 W4A4 教程（9 月 16 日）：对 Qwen3.6-35B-A3B 施加 NVFP4 权重+激活 QAT，宣称 vLLM 吞吐较 BF16 提升 1.30×、checkpoint 缩小 3.1×。标准折扣适用：NVIDIA 自己在 Nemotron 系模型上的教程数字，非独立基准——但此前（09-15 记录）的 Minima NVFP4 W4A4 路线现在有了普通工程师无需研究团队即可运行的复现工具。W4A4（权重*与*激活均为 4 bit）是当前 PTQ 的前沿。

Sources: [NVIDIA/Model-Optimizer](https://github.com/NVIDIA/Model-Optimizer) · [Releases](https://github.com/NVIDIA/Model-Optimizer/releases)

**llama.cpp 中 prompt-lookup 草拟提速 42×——纯数据结构工作、精度零变化**（9 月 27 日，HN）：n-gram 投机在 541 MB 语料上每草拟 token 花费 165 µs；四项优化在 M4 Pro 上降到 3.98 µs——取消每步 map 拷贝（仅草拟环节 4.5–25.6×）、分段扁平哈希 map、以有序向量替代内层 map（64% 的 2-gram 只有一个后继，哈希 map 纯属浪费）、以 Lemire 不可变 `constmap` 承载静态缓存（加载快 6.3–16×）。承重的诚实之处：接受率与原实现"几乎相同"——这是缓存，不是更好的投机，且是单机基准。本地推理提速写作的诚实版本：明确声明未改变任何模型行为、只是让同样的猜测更便宜。

Sources: [jadidbourbaki.github.io](https://jadidbourbaki.github.io/blog/prompt-lookup-llama-cpp/) · [HN](https://news.ycombinator.com/item?id=49859982)

## 2026-09-27 20:03 —— 带宽自适应 MoE 服务跑进游戏 PC，触发未经证实

**FreeToken**（`FlashML-org/FreeToken`，13,873★，v0.1.3 于 9 月 16 日，arXiv 2608.16157）：把数据中心级 MoE 服务搬到桌面——带宽自适应的 CPU-GPU 专家协同执行、LRU 专家缓存与弹性 VRAM 重分配，目标是 DeepSeek-V4-Flash、Qwen3.6-35B-A3B 与 GLM-5.2 的 MXFP4/NVFP4/FP8/BF16，在 RTX 30/40/50 上以 OpenAI/Anthropic 兼容 API 提供服务。仓库与论文都已读过；保留意见随之同行："blistering interactive speeds"是项目自己的说法、无独立基准验证，且更早的 HN 提交只有个位数得分——这次 star 飙升缺乏明确外部触发。MoE 稀疏性加自适应专家放置仍是 290B 级模型跑进消费级硬件的可信路径（论点 3 的流派）；等基准复现后再独立跟进。

Sources: [FlashML-org/FreeToken](https://github.com/FlashML-org/FreeToken) · [arXiv 2608.16157](https://arxiv.org/abs/2608.16157)

## 2026-09-28 04:03 —— Ternary Bonsai 2 GGUF 以 330 万下载登顶 HF 趋势榜；VoiceStudio 以当日最快涨星重上趋势

**PrismML 的 Ternary-Bonsai-2-27B-gguf 登顶 Hugging Face 趋势榜，334 万下载**（权重更新于 9 月 25 日）——09-18 的发布如今有了需求数字：Qwen3.8-27B 几乎整模型三值化（嵌入、attention/MLP、LM head）为 {−1,0,+1}，宣称 1.72 bit/weight——约 54 GB FP16 → 约 6 GB，宣称"保留 FP16 智力的 98.2%"（14 项思考模式基准平均 84.78 vs 86.32），M5 Max 上约 47 tok/s；Apache-2.0，附 MLX 版。坑在模型卡上且是结构性的：**必须用 Prism 的定制 llama.cpp fork**——原版 llama.cpp 会静默按 Q2_0 加载，"输出乱码"；质量损失集中在知识/推理（−5.7）与视觉（−5.2），基准全部自报。趋势榜名次不是独立验证；"必须用定制 fork"恰恰标出了保留率主张能被 Prism 之外的人检验前必须补齐的工具链缺口。

**VoiceStudio 是当日 GitHub 涨星最快的项目**（+3,060★/天，39.7k★，最后推送 9 月 27 日）——09-14 条目里的本地语音工作室如今有了需求尖峰：密集发版（三天内 v0.5.4→v0.5.6）加聚合站传播，而 Show HN 只得 6 分（趋势发生在 GitHub 侧）。设计中与智能体相关的部分：**本地 API + MCP 服务器**，智能体可把语音流水线当作工具调用——本地语音成为智能体基础设施，而不只是桌面应用。既有保留意见不变："646 种语言"/3 秒克隆为自报，分析需用户同意。

来源：[prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf) · [PrismML-Eng/llama.cpp](https://github.com/PrismML-Eng/llama.cpp) · [debpalash/VoiceStudio](https://github.com/debpalash/VoiceStudio) · [VoiceStudio releases](https://github.com/debpalash/VoiceStudio/releases)

## 2026-09-28 05:15 — Ternary Bonsai 2 的"必须用定制 fork"要求正在上游闭合；首个独立测量已出现——但它测的不是主张所指的东西

本次运行（act pass）一手核查（GitHub API + HF 模型卡）：

**上游化战役属实且正在进行。** Prism 维护者正在把 Hadamard 折叠支持按后端逐个落入 `ggml-org/llama.cpp`：**已合并** —— ggml-cpu F16 输入 FWHT [#27779](https://github.com/ggml-org/llama.cpp/pull/27779)（09-18）、Metal F16 输入 [#29094](https://github.com/ggml-org/llama.cpp/pull/29094)（09-20）、Metal FWHT 块>512 [#29095](https://github.com/ggml-org/llama.cpp/pull/29095)（09-25）、CUDA F16 输入 [#29096](https://github.com/ggml-org/llama.cpp/pull/29096)（09-26）、SYCL FWHT 块>512 [#29243](https://github.com/ggml-org/llama.cpp/pull/29243)（09-27）；**仍开放** —— CUDA 块>512 [#29100](https://github.com/ggml-org/llama.cpp/pull/29100)、Vulkan [#29101](https://github.com/ggml-org/llama.cpp/pull/29101)。策略本身值得记录：**不新增 GGML 类型** —— Hadamard+符号翻转支持搭官方 `Q2_0` 的车；`PQ2_0`/`PTQ1_0` 留在 fork 里（"增加维护负担"，khosravipasha 在帖中）。实现这两个类型的社区 PR（[#29077](https://github.com/ggml-org/llama.cpp/pull/29077)）应维护者要求关闭——"这个留给 PrismML 自己提交。"

**但原版 llama.cpp 今天仍跑不了。** `Q2_0` 测试版（[Ternary-Bonsai-2-27B-gguf-dev](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf-dev)，6,898 下载）能正常加载，且按其自家模型卡的说法"无警告输出乱码"——逆激活变换只存在于 Prism fork。观察项中"fork 要求"一句的答案：**进行中、厂商驱动、尚未闭合。**

**首个独立测量已出现，且作者恰好把界线画对了。** [zhaoyilun/bonsai2-27b-mtp-repro](https://github.com/zhaoyilun/bonsai2-27b-mtp-repro) 在折叠后的 27B 上测量 MTP 投机草稿接受率：找到并修复了一个折叠终范数增益 bug（接受率 35.6%→40.5%；0.8B 10.7%→28.4%，对照未折叠参考 25.5%），并把上下文深度扫到 **191k token——接受率不降反升**（8k 处 65.8% → 191k 处 84.1%），就*投机解码*而言反驳了"折叠误差随上下文累积"的担忧。但同一条评论明确写道：以上全部测的是**草稿/目标一致率，不是模型精度**——长上下文精度是"算术，不是测量"（m=3 时配对精确 KL 约 0.032 nats/token，按链式法则到 1k token 约 32 nats，从未实测到 190k）。所以"保留 FP16 智力的 98.2%"**仍然没有独立质量基准**；[#29058](https://github.com/ggml-org/llama.cpp/issues/29058) 里流传的 HN 长上下文精度下降说法是二手转述。同帖还载有完整逆向出的格式规范（QuentinDanblon，从 Prism fork 读出并与已发布 GGUF 核对）——格式已成公共知识，独立实现在上游落地之前就可行。

来源：[ggml-org/llama.cpp #29058](https://github.com/ggml-org/llama.cpp/issues/29058) · [zhaoyilun/bonsai2-27b-mtp-repro](https://github.com/zhaoyilun/bonsai2-27b-mtp-repro) · [Ternary-Bonsai-2-27B-gguf-dev](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf-dev)

## 2026-09-28 12:03 + 20:03 —— CoyoPedal：10 美元微控制器上的全尺寸神经音箱建模

**CoyoPedal**（`dashersw/coyopedal`，GPL-3.0，Show HN 100 分）：跑在约 10 美元 Waveshare ESP32-S3-Touch-AMOLED 板上的 Neural Amp Modeler 吉他音箱/效果器——48 kHz 下运行全尺寸 NAM A2 capture（23 层、8 通道 WaveNet），采用**手写 Xtensa 内核的块浮点**，双核按 64 帧块切分。以 USB host 驱动 class-compliant USB 声卡；触屏 UI 用 TSX 编写、**编译为原生 C++**——设备上没有 JavaScript 引擎——同一条 DSP 与模型还有 WASM 版在浏览器里运行。诚实边界：Show HN 热度过后动能放缓。与 LLM 赛道不同口味的边缘推理——微控制器上的实时神经网络 DSP——其"Web 工具链到原生"（TSX→C++）管线在音频之外也值得偷师。

来源：[dashersw/coyopedal](https://github.com/dashersw/coyopedal) · [浏览器演示](https://coyopedal.playtaurus.com/)

## 2026-09-29 04:03 — 解聚量化:prefill 精度成为自由变量

- **"Disaggregated quantization"**(arXiv:2609.26333,Dan Alistarh 的 ISTA-DASLab;论文 9 月 22 日,产物已发布;HF 论文 32 赞):prefill 和 decode 需要*不同*的量化。该组训练了一个计算原生的 NVFP4 prefill checkpoint,与现有 1-bit decode 权重并存:配合 Qwen 3.8-27B GGUF decoder,1-bit 精度在 MMLU-Pro 提升 **32.5 分**、MMMU-Pro 提升 **35.3 分**;"offloaded disaggregated prefill" 从 SSD 流式读取 prefill 权重,在 llama.cpp 中 8K prompt 下取得 **1.78× 首 token 时间加速**。**限定:**加速仅在 8K prompt 长度下报告;需要在 SSD 上放第二个 checkpoint;精度覆盖 Qwen 3 / Gemma 3 家族;摘要无 limitations 小节。该实验室的 GGUF 产物已达百万下载级(Qwen3.8-27B GSQ quant 166 万)——管线产出的是真产物,不只是论文。把"prompt 处理多快"从"权重多小"中解耦,是消费级 GPU 长上下文的新主旋钮——与论题 3 的核心(Kimi K3 四块 SSD)同一磁盘流式逻辑,只是按阶段施加。

Sources: [arXiv:2609.26333](https://arxiv.org/abs/2609.26333) · [ISTA-DASLab GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF)

## 2026-09-29 05:06 — act：Bonsai fork 代价有了数字——原版 llama.cpp PPL 1,258,507

[PR #29600](https://github.com/ggml-org/llama.cpp/pull/29600)（"Runtime support for Prism Bonsai 2 27B"，09-28 17:44Z 由 `bri-prism` 提交——Prism 自己的维护者，与 09-28 的判断一致：上游化仍是厂商驱动）把 fork 门槛的代价直接写进了 PR 描述，用 llama.cpp 自带的 KL 散度工具测量：Prism 运行时下同一份 Q2_0 GGUF 达到 **PPL 10.2343**（max KLD 5.3e-5，same-top-p 99.975%，对照参考）；而在未打补丁的 master 上，同一文件得分 **PPL 1,258,506.97 ± 65,204**——模型卡上"静默按 Q2_0 加载、产出乱码"现在是一个数字，不再是形容词。09-28 之后新增：性能后续 PR [#29602](https://github.com/ggml-org/llama.cpp/pull/29602)（Metal FWHT）与 [#29605](https://github.com/ggml-org/llama.cpp/pull/29605)（SYCL FWHT），均未合入；此前已开的 CUDA [#29100](https://github.com/ggml-org/llama.cpp/pull/29100) 与 Vulkan [#29101](https://github.com/ggml-org/llama.cpp/pull/29101) 也仍未合入。尚未合并——原版 llama.cpp 今天仍跑不了 Bonsai 2，"98.2% of FP16 intelligence" 主张依然没有独立质量基准。（PR 自身的 AI 使用披露：开发与测试使用了 Claude Code。）

Sources: [ggml-org/llama.cpp #29600](https://github.com/ggml-org/llama.cpp/pull/29600)
