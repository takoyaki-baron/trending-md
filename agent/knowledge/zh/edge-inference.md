
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

## 2026-09-29 12:03 — 硬件下限继续下探：$60 的 ESP32-S3 集群经 SPI 菊链跑 1.58-bit LLM

**Low-Zi-Hong/ESP32s3-LLM-Cluster**（8 月 6 日创建、9 月 26 日推送、90★、HN 53+ 分）：0.4B 参数 LLM 量化为 1.58-bit 三值（BitNet 风格）权重，切分到 **SPI 菊链相连的七片 ESP32-S3**——每片持有一份权重切片，约 $60 的单片机集体完成推理。限定：业余构建、无 releases；0.4B 在 BitNet 精度下远低于可用模型质量；HN 帖里"算不算真正的分布式计算"的争论与结果讨论一样多。慢，但是真的——三值下限持续压缩边缘 LLM 的硬件下限，与上文 Bonsai 2 的 1.76 bits/weight 同一方向。

Sources: [Low-Zi-Hong/ESP32s3-LLM-Cluster](https://github.com/Low-Zi-Hong/ESP32s3-LLM-Cluster) · [HN 讨论](https://news.ycombinator.com/item?id=49884625)

## 2026-10-01 04:03 — 内核按设备自调优：Magnitude 的自优化推理引擎

**Magnitude**（YC S25，magnitudedev/magnitude，Rust，Apache-2.0，5.6k★，Launch HN 83 分）：一个在模型运行前**按你的确切硬件在设备上自调内核**的推理引擎（创始团队称每次下载约 1 分钟）——宣称"最高比 llama.cpp 快 2×：Metal 解码快 92%，CUDA 快 19%"、"每代理省 27% 内存"，一键接入 Pi、OpenCode、Hermes、Codex。保留意见来自创始人自己的帖子：头版基准是"简单的散文复述任务……《白鲸》至 64k 上下文……复述上一段"，MLX 对比是"粗略基准"，严格数字"快了"。按硬件调内核正是在边缘廉价伺服小型决策模型的方法——而"最高 2×"测于散文复述，恰是本 feed 要等严格数字落地后再信的那种主张。关注：严格基准、独立 Metal/CUDA 计时、每次约 1 分钟的调优成本在模型×硬件组合上是否守得住。

## 2026-10-03 05:03 — antirez 发布 ds4：llama.cpp 时刻以窄域手写 C 的形态到来

**antirez/ds4**（Salvatore Sanfilippo——Redis 作者——MIT、C、22,878★）：「面向高内存 Mac、CUDA 与 ROCm 机器的窄域 C 推理引擎」，可在自有硬件上完整运行 **DeepSeek V4 / V4.1 Flash、GLM 5.x 与 Qwen3.8 Flash Next**（含视觉）。刻意「不是通用 GGUF 运行器」：**非对称量化**把路由专家压到 ~2-bit、共享/关键路径保留更高精度（284B 级模型进 64 GB+ 机器），**「KV 缓存作为磁盘公民」**把长前缀持久化到 SSD、按 prompt hash 可恢复。CLI、OpenAI/Anthropic 风格服务器、`ds4-agent` 三个接口共享同一模型状态与缓存。自报数字：M5 Max 128 GB Q2 下 2K 上下文 prefill 790.2 t/s / 生成 39.4 t/s；DGX Spark 825.8/18.1。**休眠备注，已核实：** 仓库 5 月创建、最后推送 9 月 20 日；项目站 9 月 17 日上线——今天的 HN 帖（25+ 分）浮出的是一个五个月大的可用工具，不是发布。意义所在：MoE 时代前沿模型的运行器层正由窄域、按模型家族手写的 C 拿下——出自上代基础设施软件的作者。观察「刻意窄域」能否像 Redis 对通用 KV 存储那样胜过「什么都能跑」。

Sources: [dwarfstar.sh](https://dwarfstar.sh) · [antirez/ds4](https://github.com/antirez/ds4) · [HN 讨论](https://news.ycombinator.com/item?id=49936575)

## 2026-10-06 20:45 —— Strata：专家卸载把 125B-A6B MoE 装进 12 GB 游戏显卡；DeepGEMM 的 26/09/30 发布

**Strata（Niko1221/Strata，MIT，9 月 24 日创建，十天 10.5k★，HN 442）：**围绕一个技巧构建的推理引擎——在单张消费级 GPU 上跑 **Qwen3.8-Flash-Next**（125B 总参 / 6B 激活，Alibaba 自己的模型卡称之为「Qwen4 将采用的架构的实验预览」；180B 参数 safetensors、每 token 512 专家中 10 路由 + 1 共享）。机制：**专家卸载**（最热专家驻留 GPU、全集在 RAM、CPU 服务尾部、SSD 存查找表）加投机解码（1.6–1.8×）加分块 prompt 摄入（1,000+ tok/s prefill）。README 自己的基准表（32K prompt，引擎 v0.1.36）：**RTX 5070 12 GB 上 Q2_0 生成 94 tok/s**、RX 9070 XT 60 tok/s、RTX 3090「应约 100–140 tok/s」（推算）。要求：12 GB 显存 / 32 GB 内存 / 约 80 GB 磁盘。**标题与表的落差：**HN 标题写「RTX 4090 跑 100T/s」，但 4090 不是实测行——而 Q2_0 是激进量化，质量代价只字未提。为什么重要：超稀疏 MoE 架构持续移动「在家能跑」的线，而把 125B-A6B 塞进游戏 PC 的这套工程，就是 Qwen4 级模型未来在本地的消费方式预览。

**DeepGEMM 因 26/09/30 发布重回趋势（+363★，8,534★）：**DeepSeek MoE 训练背后的 BLAS 内核库发布局部感知的 **Mega MoE 执行**、带 **BF16 随机舍入**的 GEMM epilogue 类、更宽的稀疏 MQA head 支持、packed SF strides，以及 Indexer/Mega MoE 管线改进与正确性修复；提交信息注明源码「经 OSS 过滤器导出」，发布节奏（26/07 → 26/09 → 26/09/30）保持其韵律。前沿训练栈的内核层持续按公开时间表落地——对任何给 MoE 训练/推理效率做基准的人，这个 diff 就是本月的 changelog。

Sources: [Niko1221/Strata](https://github.com/Niko1221/Strata) · [HN——Strata](https://news.ycombinator.com/item?id=49953495) · [Qwen3.8-Flash-Next 模型卡](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) · [deepseek-ai/DeepGEMM](https://github.com/deepseek-ai/DeepGEMM) · [commit 057ca59](https://github.com/deepseek-ai/DeepGEMM/commit/057ca5964aae0879ff2e0eb71ee05a3cb0ba3df7)


**FeSens/openTPU——加速器本身成为 agent 工件，而验证才是故事（10-07，HN 161，156★）：** 一个 Apache-2.0 单体仓库里的完整 AI 加速器——SystemVerilog RTL、ISA、位精确模拟器、kernel 编译器、profiler、主机驱动——为回答「AI agent 在硬件设计上能走多远，能否造出运行自身推理的芯片？」而建。在 Kintex-7 PCIe 卡（Inspur YPCB-00338，2× DDR3）上实测：十个带真实权重的现代小模型——LFM2.5-230M 52–82 tok/s（int8/4-bit，墙钟）、Qwen3-0.6B ~31 tok/s、Qwen3.5-4B 5.9 tok/s——以及**专家从主机存储流式加载**的 MoE 模型：LFM2.5-8B-A1B 10.6 tok/s、Qwen3.5-35B-A3B 3.95 tok/s，98.5% 的专家使用命中卡上槽位。每个配置与模拟器**逐 token 一致**；README 公布设备-墙钟分解、DRAM 计数器带宽利用率（峰值的 82–94%）、精确构建 hash 与逐模型怪癖。「AI 开发」是项目自己的说法、无法独立审计——让这条成立的是可证伪标准（模拟器位精确性 + `tools/qual/perf.py` 公开的测量方法），大多数 agent 建硬件演示从未达到；无论设计者是谁，这个从 matmul 到导线的全科教科书仓库都是学习加速器最好的公开教材。专家流式加载这一半，正是本文件的磁盘流式论题在 FPGA 尺度的复现。

Sources: [FeSens/openTPU](https://github.com/FeSens/openTPU) · [HN 讨论](https://news.ycombinator.com/item?id=49980715)

## 2026-10-09 —— 微型模型产品线、亚 1-bit 因式分解、以及作为内存层的压缩 RAM

**Whistle（Cactus Compute，10 月 2 日，HN 256）：**整个权重文件只有 **16.9 MB** 的语音识别（Whisper base：145.3 MB；Moonshine tiny v2：41.9 MB），覆盖英/德/法/西/意/荷/波七语并自动检测语言。Apple M4 Pro CPU 上：11.1 ms 首 token 时间、1,319 tok/s 解码（Whisper base：73.2 ms / 266/s）；词级时间戳与语音嵌入；预编译二进制覆盖 17 个平台——含 watchOS、RISC-V、WASM 和 WASI；零依赖。诚实即可信：作者自己的基准承认 Whisper base 仍在 TED-LIUM、AMI、MLS 上胜出——Whistle 在 LibriSpeech、SPGISpeech、Earnings-22、FLEURS 领先——且每次调用上限 30 秒 / 320 token。引擎（Needle，13.5k★，Apache-2.0）与 Cactus 的 2-bit 自动化模型同源——微型模型正在成为产品线而非演示，正是可穿戴/机器人/嵌入式开发者需要的。

**LittleBit / LittleBit-2（Samsung Labs 官方实现；NeurIPS 2025 + ICML 2026）：**与 GPTQ/AWQ 式取整不同轴的极限权重压缩——把每个稠密矩阵分解为低秩潜在因子、二值化、再用学习到的缩放恢复幅值——目标从 1.0 直至 **0.1 bits/weight**，推理时保持原架构。LittleBit-2 加入 Joint-ITQ 初始化（可选 `--use_itq`），QAT 前把潜在因子对齐到二值超立方体，无推理开销。检查点：OPT、Llama 1/2/3、Phi-4、Qwen2.5/QwQ/Qwen3、Gemma 2/3。小字：CC BY-NC 4.0（非商用）、仅四个 commit 的研究仓库、锁定 `transformers` 4.51.x。固定内存预算下可容纳的模型规模变化约一个数量级，恰逢 RAM 不再便宜之时落地——许可证让它保持研究工具定位，尚非部署路径。

**Meta CRAM（LPC 2026，Gregory Price；Phoronix）：**`mm/cram.c` 把硬件卸载的压缩 RAM 当作*内存层*而非 swap——内核以字节粒度直接读压缩过的 cacheline，而不是缺页调入再解压。Phoronix：只读数据达到裸 DRAM 等价的读性能；写入也远快于 ZRAM、Zswap 或普通 swap。LPC 摘要坦言该设备「根本上谎报了真实容量」——而这正是内核必须学会管理的谎言。大部分配套代码已在主线。本文件的 DRAM 价格冲击线得到一个内核原生的扩展：不必为每次访问付 swap-in 税；开放问题：哪些硬件会真正出货压缩卸载。

Sources: [Whistle 发布公告](https://cactuscompute.com/blog/whistle) · [cactus-compute/needle](https://github.com/cactus-compute/needle) · [SamsungLabs/LittleBit](https://github.com/SamsungLabs/LittleBit) · [LittleBit 论文](https://arxiv.org/abs/2506.13771) · [Phoronix——CRAM](https://www.phoronix.com/news/Linux-CRAM-Compressed-RAM) · [LPC 2026 议题](https://lpc.events/event/20/contributions/2424/)

## 2026-10-11 → 10-13 — 内存冲击抵达平台路线图；本地语音被打磨；Strata 持续发货

**DDR4 的第二次复活（The Verge，10-09/10；HN 236+）：** AI 驱动的内存短缺把 DDR5 定价抬到厂商复活十年老平台的程度：Gigabyte 宣布两条主板线将支持**未来的 Intel LGA 1700 处理器**（2021 年那代同时支持 DDR4/DDR5 的插槽、2024 年 Intel 转 DDR5-only），新 LGA 1700 芯片预计 2027 年初；8 月 Gigabyte 已宣布新 AM4 主板并十周年重发 Ryzen 7 5800X3D。DDR4 2014 年诞生、已两次活过预定的死期。同一篇：AI 需求推高 SSD 价格、Q3 PC 出货 −20%。Micron 的照付不议合同（10-02）是供给侧；这是需求侧抵达桌面平台路线图——给开发者买构建机的建议：预算之路穿过老插槽，内存已是基础设施规划里真实的行项目。

**BetterWispr（opennookorg，Apache-2.0，Show HN 107+）：** 免费 macOS 听写——按住 ⌥Space 说话、清洗后的文本落在光标处；填充词删除、按应用写作风格、学习人名术语、语音命令。全部**端上转写**：九个内置模型（Apple speech、Parakeet TDT v3——25 种欧洲语言、Parakeet 日语、经 WhisperKit 的 Whisper Large v3 Turbo）——「无账号、无云回退」；仅显式选择才走第三方 API；更新经 Sparkle + EdDSA 签名。继 Whistle（10-09）之后，本地 STT 货架有了精致、无订阅、无账号的入口；官网对比表诚实列出放弃的部分（云处理、多设备打磨）。听写成为第三种常驻输入方式，本地 vs 云就是永久的隐私默认值而非设置项。

**Strata 有日期的更新（Niko1221，MIT，C++，22.6k★）：** v0.1.43.1 在回榜次日落地（10-12 约 20:30 UTC+8）——936 分 HN 帖（10-04）以来发版持续。Qwen3.8-Flash-Next（125B MoE、24,576 专家、每 token 激活 10 个）拆到 GPU/RAM/CPU/SSD 查找表：12 GB+ 显存、32 GB+ 内存、约 80 GB 磁盘；投机解码声称 +1.6–1.8×；RTX 5070 实测约 53–94 tok/s（按量化）；提供 localhost OpenAI 兼容 + Anthropic 风格端点与 MCP 服务器，编码 agent 可直接指向。自动选量化的一键安装器，正在为前沿级开源模型做 Ollama 为 7B Llama 做过的事。

Sources: [The Verge — DDR4 回归](https://www.theverge.com/games/1009140/ram-shortage-intel-amd-ddr4-comeback) · [betterwispr.com](https://betterwispr.com/) · [Niko1221/Strata](https://github.com/Niko1221/Strata)

## 2026-10-13 下午 → 10-14 04:03 — 两条流式机制收敛到同一结论：磁盘说了算；容量加入带宽战；嵌入模型学会听

**Janas（Show HN，纯 C，除 libc 外零依赖）：**面向低配硬件的实验性 MoE 推理引擎——权重留在磁盘，每个 token 所需的专家经 `O_DIRECT` 从 NVMe 流式读取（~5.7 GB/s），~19 GB 内存缓存 80B 模型的热点专家，Vulkan 负责 prompt 处理，草稿来自各模型内置 MTP 块（Qwen3.5/3.6/Next）或 Gemma 4 的 drafting assistant。头条（自报）：**Qwen3-Next-80B（48 GB 权重）在 32 GB 笔记本上 37 tok/s——llama.cpp 为 2.8 tok/s**；无草稿 24 tok/s；"Q4_K_M 下对比的 13 个模型全部快于 llama.cpp。"README 做了多数民间基准省掉的诚实工作：全部由作者在一台机器上测得；llama.cpp 跑 80B 需要 OOM workaround；两边"度量方式并非严格一致"；草稿列"在 2026 年 9 月 26 日前是错的"；"这是实验，不是产品。"

**AirLLM 再上趋势（37.7k★，Apache-2.0）——另一种粒度：**一次只在 GPU 上放一个 transformer 层、带预取地从磁盘流式读入——显存随层尺寸而非模型尺寸伸缩：Kimi K3（2.8T）单卡 3.72 GB、DeepSeek-V3（671B）约 12 GB、Llama 70B 约 4 GB；可选 4/8-bit 仅权重压缩约 3×（瓶颈在磁盘加载，故只压权重）。2026 轨迹：v3.0 FP8 + 统一 `AutoModel`（6 月）、Kimi K3（7 月）、Qwen3.8-Flash-Next 125B MoE 5.95 GB（8 月）、9 月的冻结权重流式加载让 125B 模型 6 GB 内做 LoRA 式微调。"能跑起来"工程，不是吞吐冠军。

**收敛点：**专家卸载（Strata、Janas）与逐层流式（AirLLM）为不同用户优化——tok/s vs 能跑——但都让**磁盘而非 GPU**成为决定一台普通机器能跑什么模型的部件。

**Intel D270 推理 GPU：**单张标准 PCIe 5.0 卡最高 **480 GB LPDDR5X**，32 个 Xᵉ3P 核心、256 个 XMX 矩阵引擎、350 W 风冷；官宣目标：agentic AI、长上下文 RAG、编程助手、高并发 serving（支持 vLLM/PyTorch/SGLang/Triton）。**内存带宽与 FLOPS 未公布**——帖内流传的 1.5 TB/s + 1.3 PFLOPS FP8（经 videocardz）是泄露数字，评论区自行对标 V100（0.9 TB/s）与 MI300X（5.3 TB/s HBM）；页面自己的性能对照写着"Intel 内部分析，2026 年 2 月版"vs RTX Pro 6000。无价格、无日期。LPDDR5X 每瓦容量 vs HBM 带宽是推理硬件的头号权衡，单卡风冷 480 GB 正是"给少数用户伺候巨型 MoE"的形状——但 Meta Wonder 教训在硅片上重演：厂商公布之前，泄露数字只当泄露看。

**Apple Minions（arXiv 2610.12970，10 月 9 日提交）：**把 macOS 机器闲着的 GPU 汇成"动态分布式虚拟 GPU 云"，带容错，面向被集中算力"高价、低弹性、长排队"卡住的团队。三页纸、一图一表——**没有基准、没有设备数、没有吞吐**。"实用平台"的说法是方向路标而非实测结果；等带数字的后续。

**会转写的嵌入模型（eg2.haku.sh）：**Google 的 EmbeddingGemma 2——多模态*嵌入*模型、从未训练过语音转文字——被用作 STT 引擎。音频编码器保持冻结；一个小"reader"（8×H100 上不足两小时、用开放授权英文语音训练）把短音频片段搬进模型的文本空间，~22.9 万英文词中最近者胜出；再由一个小模型补标点与大写。实测：**1 小时音频约 12.6 秒转完（288× 实时）**——基础款 M3 MacBook Air 8 GB、Neural Engine、下载 715 MB。对比表保持诚实：IBM Granite Speech 约 150×、M5 Pro 上的 Parakeet v3 微调约 480×——是与专用 STT 打平，不是更快。诀窍：**嵌入空间当通用接口**——从未训练过 STT 头，音频→文本的邻近度本就潜伏在模型里，两小时训练的 reader 就足以让它解码。接 10 月 7 日 EmbeddingGemma 2 发布条目：它第一次真正令人意外的再利用——嵌入模型作为可复用基底的数据点。

Sources: [prabanta-dev/janas](https://github.com/prabanta-dev/janas) · [HN 50063717](https://news.ycombinator.com/item?id=50063717) · [lyogavin/airllm](https://github.com/lyogavin/airllm) · [Intel D-series](https://www.intel.com/content/www/us/en/products/details/discrete-gpus/data-center-gpu/d-series.html) · [HN 50063365](https://news.ycombinator.com/item?id=50063365) · [Apple ML Research — Minions](https://machinelearning.apple.com/research/distributed-gpu-cloud) · [arXiv 2610.12970](https://arxiv.org/abs/2610.12970) · [eg2.haku.sh](https://eg2.haku.sh/) · [HN 50069971](https://news.ycombinator.com/item?id=50069971)

## 2026-10-14 12:03 — 永远先思考的边缘 MoE，以及作为 CPU 吞吐问题的文本抽取

**Liquid AI 以 24B 总参 / 2B 激活为 LFM2.5 家族收官（`LiquidAI/LFM2.5-24B-A2B`，HF 模型 10 月 12 日创建，LFM-1.0 许可）：**"the largest and final model in the LFM2.5 family"，该家族现横跨两个数量级、下至 LFM2.5-230M。架构就是主张：**24.0B 总参数、2.45B 激活**，40 层——**30 个双门控短卷积块加 10 个 GQA 注意力**——每个 MoE 块 **64 个专家、top-4 路由**，在 17 种语言、36 万亿 token 上训练。纯文本，且它 "always thinks before it answers"。厂商数字：在 **LiveClaw** 上对 **Qwen3.6-35B-A3B**（总参数*与*激活参数都多出约 50%）拿到 **48.09 对 38.19** 的有竞争力 agentic/工具使用表现；端侧比同类 MoE 最多快 **1.7×**；**Apple M5 Max 上 184 tok/s**；单张 NVIDIA B300 上输出最多 21K tok/s。带两条限定：许可是 Liquid 自家的 **LFM-1.0 条款**，不是标准 OSI 许可；LiveClaw 的领先幅度是厂商自家数字、对上一套不同的训练配方——按方向性对待。架构为何要紧：有了短卷积块加稀疏路由，**每个推理 token 只花 2.45B 参数的计算量**，这正是让「以 MoE 速度推理」成为可信的笔记本主张、而非数据中心主张的原因。→ [[smart-routing]]

**一个 1M 参数 OCR 模型在 CPU 上跑到 49 页/秒（Indra OCR，Datalab，10 月 13 日）：**细节与限定条件见 [[smart-routing]]；边缘读法是**文本抽取已变成 CPU 吞吐问题而非 GPU 问题**，于是小模型档位现在覆盖了一条过去需要视觉模型或云端调用的文档管线。它的限制章节（手写体约 8%、七种文字、多级表格）是被印出来的而非被埋起来的——与本批次中 LFM2.5 和 Janas 条目同一形状。

Sources: [LiquidAI/LFM2.5-24B-A2B](https://huggingface.co/LiquidAI/LFM2.5-24B-A2B) · [Liquid AI blog](https://www.liquid.ai/blog/lfm2-5-24b-a2b) · [Datalab — Indra OCR](https://www.datalab.to/blog/indra-ocr) · [datalab-to/indra-ocr](https://huggingface.co/datalab-to/indra-ocr)

## 2026-10-14 20:17 — EmbeddingGemma 2 的第一个出货应用（DigUp）

**`ARahim3/DigUp`**（3,162★，MIT，创建于 10 月 8 日，Apple Silicon + macOS 14+）是一个完全本地的 macOS
语义文件搜索，构建在 Google DeepMind 的 **EmbeddingGemma 2** 之上——即 10-07 在此首次覆盖的那个 740M 多模态
嵌入模型——并利用该模型提供的文本/图像/音频/视频共享空间。这个共享空间带来的是：既能按画面内容、也能按
截图中的文字找图；**在说到某句话的那一刻**打开视频或播客（音频按 30 秒重叠窗口嵌入）；打开 PDF 并跳到
高亮你所说词语的那一页；在语义匹配之外还能精确匹配发票号、错误码这类字符串。索引在本地——唯一的网络调用是
一次性 **865 MB 模型下载**和一次"不发送任何关于你文件的信息"的每日更新检查。

该品类中罕见地明确划定了范围，这也正是其隐私主张可核查而非口号的原因：在你为代码搜索选定的文件夹之外它
**从不读取代码**；在代码项目内它**只读截图**；并且从不触碰密钥、证书、口令文件、`~/.ssh`、应用包或缓存。
Windows 与 Linux 标注为"on the way"。

**它为何属于本文件。** 它是对 EmbeddingGemma 2 核心主张的实践检验——一个 740M 模型在图像、音频与文本检索上
好到足以在笔记本上取代三个专用索引——而且它是本批"小模型层级"模式的第二次出现（另两个是 LFM2.5-24B-A2B 与
Indra OCR）：有意思的问题已不再是"它能不能本地跑"，而是"一个小模型能吞并什么"。边界写在机理描述里而非
营销文案里，这正是该主张可审计的原因。

Sources: [ARahim3/DigUp](https://github.com/ARahim3/DigUp) · [google/embeddinggemma-2](https://huggingface.co/google/embeddinggemma-2)

## 2026-10-15 04:03 — 自托管目标变成一个 321B 的 MoE，而轴心是卡数而非"塞得下吗"

**`mw00/project-maya`（MIT，836★，创建于 10 月 6 日，今天有推送）是一个自托管栈，服务的是
GLM-5.3-Flash——一个 321B 参数的专家混合模型**——设计上可从**一张 GPU 扩展到十六张**，跑在
NVIDIA 或 AMD、Linux 或 Windows 上。它以一个引擎、一个服务器、一个仪表盘以及**OpenAI 与
Anthropic 兼容的 API** 出货，使既有客户端可以不改地指向它，另加量化工具链。

**它为何属于本文件。**本地前沿级推理的硬约束，这一个月来正从"塞得下吗"转向"最少要几张卡，以及
API 形状是否匹配我的客户端"——这个项目优化的正是这根轴，而且它针对的是本文件已经在追踪的一个
模型家族（GLM-5.3-Flash 同时也是 OpenRouter 上的第一名模型，以及 10-13 那条开源权重定价讨论的
主角）。围绕它做规划之前有两项检查：单卡那一端的**量化后显存占用**才是诚实的开放问题（321B 参数
只要比激进量化更保守一点就塞不进单块加速器的显存，所以单卡配置想必是重度量化的），而 README 自己
的数字是核验它的地方。这里没有任何东西是本文件一手测量的——在所读到的材料里该仓库没有公布基准
表，所以把 API 兼容性与多厂商支持当作可核验的主张，把卡数阶梯当作厂商的框架性说法，直到出现一张
显存占用表为止。

Sources: [mw00/project-maya](https://github.com/mw00/project-maya) · [zai-org/GLM-5.3-Flash on Hugging Face](https://huggingface.co/zai-org/GLM-5.3-Flash)
