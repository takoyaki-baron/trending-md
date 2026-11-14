
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

**10-16 晚→10-17（学习批次）——三个「什么通用硬件能跑」的数据点。 （1）Apple MLX v0.30.1：Thunderbolt 5 上的分布式推理。** 新增 **RDMA-over-TB5** 驱动（`jaccl` 后端，macOS 26.2）与经 `mlx.launch` 的流水线/张量并行：**四台 M5 Ultra Mac Studio**（各 512 GB 统一内存、1.2 TB/s）以 NVFP4 服务 **Muse Spark Open 816B-A42B，解码 36.73 tok/s**——高于阅读速度；该模型 BF16 需 >1.6 TB、4-bit 也要约 493 GB，单机*放不下*；M5 Ultra 对 M3 Ultra 首 token 最快 4.6×。注意事项异常完整、且出自 Apple 自己：MoE 跨机扩展*差于*稠密模型；张量并行伤害 Muse Spark 64k 上下文的 prefill（每专家输出归一化）；流水线并行不改变解码；解码只测了 128 token。「前沿开放权重搬回家」的故事拿到一条消费级互连——不要 InfiniBand，一根雷雳线——而 Apple 硅成了参考路径。 **（2）MiniCPM-V 4.7**（OpenBMB，权重 10-07 / 卡 10-15）：系列首个 MoE——**35B-A3B、Apache-2.0**、另有 1B 同门——宣称 **iPhone 17 Pro Max 上 3 GB 内存内 13+ tok/s**。技术才是内容：**Lookahead Expert Scheduling**——llama.cpp-omni fork 预测下一层需要哪些专家并预取，加载与计算重叠、计算仍跟随模型自身的逐 token 路由；此前手机 MoE 的办法是*限制路由池*（封顶能力），这次保住完整路由。另有细粒度逐层量化、DSpark 投机采样、ViT 内部视觉 token 压缩（LLaVA-UHD v4）。fork 复现之前当自报数据看。 **（3）PS5LM**（cobanov，约 271★，C++，10-16 有推送）：**llama.cpp 原生跑在越狱 PS5 上**，首发 Qwen 3.8——任何 GGUF、跑在主机自己的 OS、不装 Linux。一周内第三个 PS5 原生项目，方向与 AnyPS5 相反：AnyPS5 把 PS5 二进制重链到 Linux/Windows 上跑，PS5LM 把 PS5 本体当作算力目标——固定已知的 GPU/CPU 平台 + 大统一内存池，且数百万台已摆在桌上。小仓库、早期数字；模式（消费级固定硬件当推理机队）与老 Mac、Jetson 沦为推理下位机是同一个。

Sources: [Apple ML: MLX 分布式推理](https://machinelearning.apple.com/research/mlx-distributed-inference) · [HN](https://news.ycombinator.com/item?id=50118320) · [HF: MiniCPM-V-4.7-35B-A3B](https://huggingface.co/openbmb/MiniCPM-V-4.7-35B-A3B) · [cobanov/PS5LM](https://github.com/cobanov/PS5LM) · [HN](https://news.ycombinator.com/item?id=50122431)

**10-17 20:31（学习轮）——买前问题有了带标注的矩阵。** **Llmspeed**（Show HN 105 分；llmspeed.dev，开源在 `nicorobinreal/llmspeed`）：约 31 台设备（RTX 3060→5090、RTX PRO 6000、H100/A100/H200、MacBook M2 Pro→M5 Max、Mac Studio M3/M4/M5 Ultra、RX 7900/9070 系、Arc Pro B70、DGX Spark，以及一台纯 CPU 的 Ryzen 9 9950X + 96 GB 平台）对 15 个模型（Qwen 3.x、GLM-5.3 Flash、GPT-OSS 20B/120B、Gemma 4、Llama 3.1 8B、DeepSeek R1 Distill 与 V4 Flash）的查询矩阵，用社区基准（r/LocalLLaMA、localscore.ai 等）回答"本地模型*用起来*有多快？"。诚实部分印在站上：部分数字是**"derived from similar setups or projected from specs"**——把这些单元格当作估计的估计——且数字只适用于"单设备短 prompt"：长上下文、多卡、并发用户都会不同。tok/s 是决定本地推理是愉悦还是不可用的那个数字，而这些数据一直散落在 Reddit 帖子里——带标注、可检视的矩阵胜过民间传说，哪怕它自带注意事项。它和 fit-to-measured-budget 工具（llmfit）一起，构成本地推理栈的买方侧。

Sources: [llmspeed.dev](https://llmspeed.dev/) · [Show HN](https://news.ycombinator.com/item?id=50127979)

**10-20 12:03（学习轮）——统一内存 ARM 笔记本在 Linux 上证明了可行性。** **ASUS ProArt P16 "RTX Spark"**（128 GB 统一内存、20 核 N1X ARM、6,144 CUDA 核；201 HN 分）的 bring-up 日志：**Arch Linux ARM** 以打过补丁的 ACPI 覆盖、NVIDIA 内核工作与从 ASUS 自家驱动包提取的扬声器固件启动——步骤公开、哈希钉死并签名，作为上游 **Archinstall 4.5** 的扩展构建。实测：压缩任务上 **7-Zip 在 20 线程比 Windows 快约 5%**，统一内存的卖点为真——**Linux 向 OS 和 CUDA 报告同一个 116.0 GiB 内存池**，而 Windows 把它切成专用/共享/CPU 区（Windows 上 91 GiB 预留换来 109.7 GiB CUDA 总量）。作者动机明说：开放权重模型、本地 RL 与微调，装在笔记本上、不要微软账号。这批统一内存 ARM 笔记本是今年的本地推理硬件，这是第一份它们是好用的 Linux 机器的详细证明——无聊的坑（固件、ACPI、电源管理）都在公开处填平。那一个 116 GiB 可寻址池，就是微调玩家关心的数字。

Sources: [josie.lol 构建日志](https://josie.lol/blog/linux-rtx-spark) · [HN](https://news.ycombinator.com/item?id=50158100)

**10-20 20:03（learn pass）——前沿实验室的生产推理栈变得可 fork：DeepSeek DeepInfer。** **deepseek-ai/DeepInfer**（Apache-2.0，写作时 6.2k★，637 HN pts）："驱动 DeepSeek 大规模生产服务的高性能推理框架"，README 对边界异常坦率。**收入**：带优化 kernel 的离线推理（FlashMLA、DeepGEMM、DeepEP、TileLang）、MoE EP + EPLB、"DSpark 与置信度调度验证"草稿 token 解码、SWA 有界重放、异步零开销批调度器、批不变推理、确定性采样、regex/JSON schema/EBNF 结构化输出。**硬件：NVIDIA SM100 与华为昇腾 950（CANN 9.2）同列一张依赖清单**——两个半球，落在 DHS FASCSA 命令（本 feed 第 23 条）把 DeepSeek 衍生产品逐出美国民事机构同一周。**明示不在**：无 KV cache 系统、无 prefill/decode 分离、无负载均衡——"完整推理服务所需（本版本未包含）"。这份"不包含"清单就是 DeepSeek 认为自己生产护城河所在地的地图。师承由致谢定案："最初主要基于 vLLM 构建"（vLLM 因此同日上榜），另受 SGLang 与 TensorRT-LLM 启发。基准（prefill 4×SM100、decode 64）附带 `run_sweep.sh` 供复现——本文件一直奖励的"复现脚本即声明"形态。虽非本地推理，但属同一引擎层的服务侧：DeepInfer 优化的 kernel（FlashMLA、DeepGEMM）正是本地/流式栈继承的那批。

Sources: [deepseek-ai/DeepInfer](https://github.com/deepseek-ai/DeepInfer) · [HN](https://news.ycombinator.com/item?id=50163277)

## 10-21 12:03 — 自托管语音栈抵达克隆与配音

`debpalash/VoiceStudio`（AGPL-3.0，79,224★，+17,057/周，今日 04:34 UTC 有推送——12:40 复验）：完全本地化的语音平台——声音克隆、声音设计、带时间轴的视频配音、浮动听写组件、转写、有声书与批处理——以 Electron 应用形式提供，带本地 API 与面向 agent 的 MCP server。默认引擎是 k2-fsa 的 OmniVoice，可切换其他引擎；最新发布 v0.5.6（9 月 23 日）。这是对 09-14 与 10-13 笔记（16 个 TTS + 11 个 ASR 引擎 → 6.14 万★安装渠道 → 7.92 万★）的带日期更新，实质在于上限被推到了哪里：自托管的替代方案现在覆盖**克隆与配音**——正是厂商不愿放进开源权重的那一层——而同一天 Mistral 把批量转写定价为 $0.0035/min 且未提许可证、未提权重（→ [[frontier-models]]）。限定：646 种语言是项目自述、未引用独立评测；AGPL-3.0 用于内部工具没问题，嵌进产品则是真实约束。

Sources: [debpalash/VoiceStudio](https://github.com/debpalash/VoiceStudio) · [voicestudio.sh](https://voicestudio.sh/)

## 10-21 20:03 — 内存/质量阶梯成为发布内容的一部分

**Strata**（`Niko1221/Strata`，MIT，29,586★，创建于 9 月 24 日，v0.2.2 于 10-21 push）是 **Qwen3.8-Flash-Next** 第三方量化版本的启动器与引擎——后者是 Qwen 社区许可下的 125B 开放权重预览——而它的 README 公开了多数「能在你的笔记本上跑」项目会跳过的那张阶梯表。agentionai 的「Gyro」系列用专家换内存：**Gyro-S 需 27.6 GB RAM+VRAM（下载 58.5 GB），质量「低于 IQ2_XS」**；**Gyro-M 35 GB，约 IQ3_XXS 质量，慢 16–21%**。往上的档位：32 GB 可用 Gyro-S 或保留一半专家的「Coder」变体（「在代码之外更弱」）；48 GB 上 IQ3_XXS（47.0 GB）；**64 GB 上 IQ3_S（54.8 GB），项目称其在公开测试上与完整模型持平**；96 GB 以上可达 4–8 bit。12 GB RTX 5070 + 64 GB RAM 的速度：**Q2_0 下生成 94 tok/s、prompt 2,650 tok/s**；IQ3_XXS 为 62/1,750。它同时说 OpenAI 与 Anthropic 两套 API，因此 Claude Code、Codex、OpenCode 都能连；还带 MCP server，以及一段可粘给编码 agent 让它自己完成安装的 prompt。

这是本地推理主线在当前阶段的样子：约束不再是「125B 能不能在这跑」，而是**你跑的是它的哪一种压缩**，而诚实的项目现在把阶梯表当作发布内容的一部分。这里的每个数字都是项目自测；尚无独立的 tok/s 或质量复跑。实际后果是一条陈述纪律——**「我在本地跑 Qwen」必须带上档位**，因为 27.6 GB 的装法与 54.8 GB 的装法是同名但不同的产品，而 32 GB 的笔记本跑的正是项目自己说低于 IQ2_XS 的那一档。

Sources: [Niko1221/Strata](https://github.com/Niko1221/Strata) · [Hugging Face: Qwen/Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next)

## 2026-10-23 20:03 批次 —— 服务工件变成编译并签名的包

**NVIDIA Flare 把本地推理拆成一个 Python 编译步骤和一个 Rust 运行时，交换的单位是一个已签名的包。**`NVIDIA/flare-local-inference`（Apache-2.0，**618★／4 关注**，2026-10-20 创建、10-23 推送——API 已核实）面向 **SM120/SM121** GPU，即工作站与紧凑系统（如 DGX Spark）。**Ignition**（PyTorch + Transformers + FlashInfer/b12x）加载模型、调优 kernel 并捕获 CUDA 图，产出一个*运行时包*：仅含元数据的主 `.safetensors` 加按 **SHA-256** 命名的不可变载荷块，装在一个**已签名信封**里，内含加密的 cubin。**Helios**，那个 Rust 运行时，在没有 Python 的情况下服务该包。所有配方默认 FP8 E4M3 的 KV 存储，而对话状态——包括递归状态与 KV 缓存——被作为一个单位规划，以便分支与恢复能保持它。

它属于磁盘流式这条线索而不是框架堆，有两个原因。第一，工件边界移动了：你交付的不再是"权重 + 某个引擎版本"，而是一个**编译过、按哈希寻址、已签名的块**，这与 agent 沙箱及溯源线索一直接近的形状相同（[[disclosure-lag]] 的工件轴、SLSA/LiteLLM 的教训），只是应用在模型权重上——可验证的服务，配不可验证的模型。第二，README 自己划了线，应当引用而非转述：一个"**研究原型**"，只覆盖 SM120/SM121，"**Flare 不是、也永远不会成为 vLLM 这类生产推理引擎的替代品**"。厂商公布非目标已是 2026 年的常态（[[fact-check]]），而它也告诉你该看什么：Ignition 的包格式是否出现第二个消费者——那会把厂商的构建工具变成交换格式。

来源：[NVIDIA/flare-local-inference](https://github.com/NVIDIA/flare-local-inference) · [模型准备与服务](https://github.com/NVIDIA/flare-local-inference/blob/main/docs/model-preparation.md)

## 2026-10-29——芯片名不是阶梯，决定的是内存带宽那一列

Apple 的 MacBook Pro announce 点名 **M5 Pro 与 M5 Max**，但技术规格页列出的是**三家**，其内存带宽排序**与名字相反**：

| 家族 | CPU | GPU | 内存带宽 | 内存上限 |
|---|---|---|---|---|
| **M6** | 12 核（2 超级 / 4 性能 / 6 能效） | 12 核 | 「最高 **170 GB/s**」 | 16 / 24 / 32 GB |
| **M5 Pro** | 15 核，**无能效核** | 16 核（可选 20） | **307 GB/s** | 最高 **64 GB** |
| **M5 Max** | 18 核 | 32 核（可选 40） | **460 GB/s**（可选 **614 GB/s**） | **128 GB**（40 核） |

**M6 上限 170 GB/s，而 M5 Pro 到 307、M5 Max 到 460–614**——所以数字更新的芯片对本 feed 关注的负载*不是*更快的那颗；一个"选最新芯片"的 14 英寸买家，拿到的是 M5 Pro 配置约三分之一的带宽。对本地推理而言，这一列决定什么装得下、解码多快；核心数和芯片上的数字都不决定。

补充细节：**M5 Pro 与 M5 Max 完全没有能效核**——这是一台用待机续航换持续吞吐的笔记本——而 Apple 的「最高 **24 小时**」标注的是**视频播放**，不是混合负载。Max 的存储可到 **8 TB**。

**重复这两个说法之前先核一下。**品牌名与面板名不是同一个字符串：规格栏仍写「**Liquid Retina XDR** 显示屏」、14 英寸 **3024×1964**、ProMotion 到 **120 Hz**，而页面标题是「**PROLED XDR** Display」——所以「PROLED XDR」是发布名，不是规格行。其次，Mac 笔记本上的**触摸屏是一个软件变更**：这个平台发布过的每套 AppKit 交互模型都假设屏幕不可触摸，所以「Touch」出现在亮点列表里，并不说明操作系统拿它做什么。两条都与本文件其余部分同一纪律——引用承载该断言的那个产物。

→ [[model-hardware-standard]] [[fact-check]]

## 2026-10-31 12:19——「能在笔记本上跑」是注册表不测的功能断言

GGUF 普查（arXiv **2609.05881**，完整单位分析见 [[fact-check]]）先是边缘推理的结果、然后才是事实核查的结果，因为它找到的失败**专属于本文件追踪的低位层级**：Ollama 官方库 **15** 个模型线的 **305** 个合规代码 GGUF tag 中，**七个（2.3%）**只解出 **164 题中的 ≤6 题**——而且每一个都是**≤4B** 模型的**低位量化**，正是每条「能在笔记本上跑」推荐里出现的 `Qwen2.5-Coder-1.5B`/`3B` 这一档。

变量是**校准**，不是位宽：权重、工具链与张量组合同定，加入 importance matrix 让 `Qwen2.5-Coder-3B` 在三个量化级别上**从零升到 164 题中的 76–113 题**，而同样的未校准配方让 **1.5B** 仍然可用——所以配方与规模单独都预测不了失败，而且更小的那个并不更安全。构建期的可复现性是另一个维度：五个可疑项从原始权重重建成「matched our uncalibrated rebuilds tensor for tensor, so none was corrupted」。

对端侧部署的操作含义：哈希验证文件、加载验证格式，两者都不验证任务。钉住某个 tag 之前先跑任务级探针；tag 失败时，先**换同一模型的已校准量化**，再去怀疑损坏。同批的另一个发布说明端侧这一层现在默认交付什么：`XHToken/Spark-X2.6-4B`（4B、apache-2.0、**12,515** 下载）保留 X2.5 架构、加三档思考预算（none/low/high），发布当天就能在 `llama.cpp`（build **b10828**）、Ollama **0.34.1+**、MLX 与 LM Studio 上跑——`spark2_5` 这个架构 id 同时出现在四个运行时里，这是分发信号，也比旁边那张 SVG 基准图更可核查。

论文自己声明的限度：15 个模型线、只测代码任务，误报一侧是 66 个 tag 的样本，所以该总体之外的失败率仍未测量。

→ [[fact-check]] [[frontier-models]] [[agent-stack]]

## 当真正交付的产物就是 4-bit 构建时，它自己那一列才是结果（2026-11-01 04:40）

`nvidia/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB`（HF，`license: other` / `openmdw-1.1`，`base_model` 为
`…Bolt-E4B-BF16`、关系 `quantized`）是 NVIDIA「在 Gemma-4-E4B-it 基础上进一步后训练」而来。它的命名是三件不同的
测量，全部一手核对：

- **「4B」** 是 Gemma-4-E4B 稀疏模型的*生效*参数量；卡自己的表格写「Total Parameters | **8B (4B effective)**」。
- **「4GB」** 是品牌名：Hub 上 Q4_K_M 文件是 **6,180,446,208 字节 = 6.18 GB**。
- **64K** 是上下文，输入输出各 64K，且是真的（卡内 llama.cpp 配方里 `-c 65536`）。

端侧正是量化从「优化」变成「部署」的地方，所以 Q4 那一列应当被当作头条来读，而不是当作增量。在 **21** 行基准里，
Q4_K_M 胜过同一模型 BF16 的有 **7** 行——四项是决定性的（ToolSandbox +5.36、RelyToolBench +6.13、RoleBench +4.16、
MultiChallenge +2.50），三项在噪声内（+0.21…+0.32）——输掉 14 行，跌幅最大的恰好落在长上下文（RULER 64K 上
86.99→85.76、LongBench v2 48K 上 50.50→48.67、Tau2-Bench 55.10→52.32）。所以「四位构建不是严格降级」有卡片支持，
「量化是免费的」没有。

两条让这张卡可引用的披露：「Accuracy numbers are measured by NVIDIA under a **consistent harness** (NeMo Gym);
they may differ from vendors' self-reported numbers」，以及「evaluations are conducted in reasoning mode except for
RoleBench, EQ-Bench v3, and RULER」——也就是说卡片给出了 harness，却**没有给出方差**，读者无法把 MultiChallenge 上的
+2.9 与运行噪声分开。以及日期：卡内 Model Dates 表写「Hugging Face **10/23/2026**」，而 Hub 的 `createdAt` 是
**2026-10-05**——仓库可以在卡片宣称发布之前 18 天就已创建，这正是发布漂移轴在模型侧的形态。

**同批次对照，光谱的地板：** `kerlenton/bootgpt` 在 512 字节 MBR 之后把 **11.5 KB** 的 int8 字符级模型放进
**23 个扇区**，运行在 386 的 16 位实模式（「The boot sector is code only — strings, weights and the vocab table
all live in the data sectors」），而作者给出的是上限不是下限：「With 8 chars of context and one hidden layer this
is roughly the quality you get」、「the model is not a general story teller」。从 MBR 里的 11.5 KB 到手机上的
6.18 GB，「模型多大」说的其实是你装了哪一件产物。


## 在消费级硬件上，放置策略比内核更值钱（2026-11-01 20:38）

`FlashML-org/FreeToken`（Apache-2.0，创建于 2026-07-20，**15,098★**，1,532 fork，469 个 issue+PR）
是一个边缘 MoE 推理引擎，背后有论文——arXiv **2608.16157**，十一位作者含 Stoica、Zaharia、Song Han
与 Keutzer——其自述阶梯是「from a 35B model on a laptop to a 284B model on a gaming desktop and the
753B GLM-5.2 on a single workstation GPU」。

实测行是在一张 RTX 5090 上跨四种 agent 负载、两个模型：Qwen3.6-35B-A3B 上 **77–83 tok/s**，
DeepSeek-V4-Flash 上 **22–25 tok/s**，分别是各负载最强基线的 **1.8–2.3×** 与 **1.5–1.9×**，且在
agentic serving 下稳定（三种 agent 负载下与单轮 W1 值相差 **12%** 以内）。机制是缓存策略而不是内核：
在 5090 的服务容量下，它的全局 LRU 漏掉解码期专家读取的 **16%** 与 **39%**，而 KTransformers 的
prefill 更新式放置是 **41%/59%**、llama.cpp 的静态切分是 **62%/89%**。流水化 prefill 在关闭第二缓冲
时值 **19% / 25% / 26%** 的吞吐（4k / 8k / 16k）。

厂商页面会藏起来的是**尾部**：FreeToken 的最差一轮在每个格子里都在 **44 秒**以内，而每个基线都会在
某处越过 **150 秒**——llama.cpp **232 秒**、Ollama **179 秒**、KTransformers **946 秒**——论文把尾部
对着客户端超时来读（OpenClaw 的 **120 秒** 空闲看门狗、Claude Code 约十分钟的请求超时），把它当成
**可用性边界**而不是延迟统计。这个框法值得留下：在消费级硬件上，问题不是平均 tok/s，而是一轮能否在
harness 放弃之前结束。

**两个限定必须跟标题一起走。**README 写 **290B+**，而摘要写 **284B**；753B 那次是 RTX PRO 6000 上
NVFP4 的独立演示，不是同一张对比表里的一行。**这周也没有出货**：读自 `releases.atom`，最新发布是
**v0.2.1**（`2026-10-26T03:24:21Z`）加一个滚动的 **Nightly**（`2026-10-30T11:19:16Z`），所以今天
15k star 的排名是**论文**驱动的冲高，不是发布——这正是上一批次在测量侧由 Nemotron 4-bit 卡逼出来的
同一个区分。

→ [[frontier-models]] [[fact-check]]

## 2026-11-02 20:20——Colibri v2.1.0：把吞吐量与星数一起引用

`JustVugg/colibri`（46,157★，纯 C，Apache-2.0，创建于 2026-07-01）是本文件追踪的同一族——共享部分
常驻、路由专家从磁盘流式读取——推到逻辑终点：一个 **744B** MoE，每个 token 只用约 **40B 参数**，
所以逐 token 变化的权重只有约 **11 GB**；注意力、共享专家与嵌入常驻内存，路由专家放在 NVMe 上，
前面是一个会学习工作集的缓存。**十三个引擎**：十个对话族（GLM-5.2/5.3、GLM-5.3-Flash、Inkling、
Kimi K3、DeepSeek V4／V4.1 Flash、MiMo-V2.6、Qwen3.8-Flash-Next、Qwen3.6、OLMoE）、一个图像模型，
以及**三个以概率作答而非闲聊的决策模型**——[[system1-decision]] 这一类以引擎槽位的形式出现。

让 README 可被引用的是它把失败模式印在成就旁边：

| 配置 | 模型 | 速率 |
|---|---|---|
| 25 GB 笔记本，冷启动 | GLM-5.2（429 GB 下载） | **0.05–0.1 tok/s** |
| 128 GB Ryzen AI Max+ 395 | GLM-5.2 | **1.83 tok/s** |
| 六张 RTX 5090 | GLM-5.2 | **9.0–9.2 tok/s** |
| 32 GB | DeepSeek V4 Flash（284B） | **0.93 tok/s** |
| 1.56 TB 磁盘、6.3 GB/s 读取 | Kimi K3（2.8T） | **约 9.4 秒/token** |

它引用自己的启动横幅——`GLM-5.2 · 744B MoE · int4 · streaming CPU · ready in 32s · resident 9.9 GB`
——是一个**放置**声明，不是速度声明；两者必须一起引用，否则这条就变成又一条「笔记本跑 744B」的
标题。v2.1.0（`2026-10-31`）包含 **v2.0.0 以来 387 个 PR，其中 208 个来自 35 位贡献者**，每个引擎都
按发布原样读取 GGUF，并新增 Mistral-Large-4（1T）家族。

**值得留下的是 README 自己的设计准则：**「更慢的内存可以带来速度代价；但它绝不能悄悄重新定义模型。」
这是整个磁盘流式族要守的不变式——次级内存层允许慢，不允许改变权重——也是面对任何只报常驻内存、
不报吞吐的引擎时该问的问题。

→ [[edge-inference]] [[system1-decision]] [[fact-check]]

## 量化的加速是一个 batch-size 主张，而公开记录里“速度 + 精度”只配齐过两次（2026-11-04 12:20）

arXiv 2611.04380（「Twice as Fast, Until It Isn't」）把能核实的公开测量全部汇总，找服务团队需要的两个数字——相对 BF16 的加速比、以及让出的精度——结论是**这两者几乎从不配套出现**。**只有两个 checkpoint** 同时有 vLLM 计时和精度分数；两者都是 **Gemma 3 12B 的 INT4 构建**，而那个精度数字只覆盖**单个 MMLU 科目**——恰好是 AWQ 构建用来校准的那个。batch-1 的计时早于当前引擎版本，**AMD 与 Intel Gaudi 在这个区间完全没有计时**，**FP4 相对 BF16 一个都没有**。

存活下来的计时遵循部署相关的规则：小 batch 时解码受内存带宽限制，4-bit 权重大致**翻倍**——Qwen2.5-14B 在 A100 上 **2.12×**；大 batch 时 GPU 变成算力受限，收益**消失**：Gemma 3 12B 在 **batch 256** 上 **1.02×**，此时**FP8** 才是还能帮上忙的配方。所以 batch-1 基准和生产服务配置描述的是两个不同的区间，而从一篇测了 batch 1 的博客里继承来的配方，是关于没人会跑的工作负载的成本主张。

精度那一半在这些样本量上往往无法测量：「Many published accuracy deltas, **including every HumanEval delta, lie within benchmark sampling noise**」。论文最后给出了一份七项报告清单。同一栈上相邻的既有教训：当**交付的产物就是 4-bit 构建**时，必须读它自己那一列（Nemotron-3.5-Bolt-E4B-4GB 在 Q4_K_M 下 21 行里赢 **7** 行、输 14 行），所以「4-bit 免费」和「4-bit 必然降级」都错，而 batch size 是第三个轴。

## 2026-11-04 20:28 —— 这台笔记本在 Windows 上快、在 Linux 上慢，因为电源表是加密的

MindStudio 的双系统实测（MSI Prestige N16 Flip AI Plus，RTX Spark 笔记本，与 DGX Spark 桌面同款 GPU 设计）是一组带对照的测量，反常的是
方向。GPT-OSS-120B：Windows **65.4** tok/s、**WSL 65.1**、DGX Spark 桌面 **61**、笔记本上的原生 Linux **13.9**。vLLM 八个并发客户端
时重演：**WSL 127 vs Linux 39.5**。较长一次运行在 Windows 上约 **8 分钟**、GPU 接近 **2.2 GHz**；在 Linux 上约 **37 分钟**、停在
**790 MHz** 左右，温度「between 40 and 47 °C」——所以不是过热。

对照才是让它是发现而非抱怨的原因：在 Windows 里禁用 **「Nvidia Platform Controllers and Framework」**直接复现了变慢（「tokens per
second dropped from around **83** to about **31**, and clock speed fell from roughly **2 GHz** down to the same **786 MHz**」），
重新启用立刻恢复。该控制器按固件里的电源表在 CPU/GPU 之间分配预算，而这张表「encrypted. Windows has the key to decrypt it. Linux
currently does not.」电池会反转直觉：不插电时 Linux 达到 **61–67** tok/s（约 1,800 MHz）；插电时约 15 tok/s（约 780 MHz）。首次启动
还有一道坎：笔记本为 GPU 预留 **96 GB 统一内存**，只有 Windows 暴露这个切分。

实用读法：用 WSL（继承 Windows 的时钟路径）——而这正是这台机器本来要避免的「Linux 工具链跑在 Windows 内核上」的妥协。对这类设备，
「supported on Linux」现在有第三种状态：开放内核驱动能加载、CUDA 能用、笔记本却只跑在三分之一的频率上。

→ [[platform-gatekeeping]] [[model-hardware-standard]] [[fact-check]]


## 2026-11-05 04:43 — 流式推理的地板有了时钟，本地栈长出了多节点旋钮

**`FareedKhan-dev/kimi-k3-in-c`**（Apache-2.0，创建于 2026-08-01，最后推送 **2026-10-02**，**v1.1.0**，读取时 10,194★ / 1,621 fork；macOS/Windows/NEON 移植、聊天模式与 MXFP4 内核有 20 位具名外部贡献者）用可移植 C99 实现 Kimi K3 推理——「No BLAS. No framework. No GPU.」——**2.78T** 参数、**1.56 TB** checkpoint（git 树 96 个分片之和与 HF 仓库逐字节一致）、**8.24 GB 峰值 RSS**、**176 KB** 引擎。

README 的时钟表才是产物，因为它给「内存地板」定价，而不是给峰值定价：

| 内存 | 每 token 时间 | 原因 |
|---|---|---|
| 8 GB | **26.5 s** | 「整个模型每一步都从磁盘流式读取」 |
| 32 GB | 24.2 s | 仍在流式读取 |
| 64 GB | 19.8 s | 仍在流式读取 |
| 128 GB+ | **5.6 s** | 「模型完全装进内存，磁盘等待消失」 |

四种情况下输出**逐字节相同**——「只有时钟变化」——README 也坦承其可运行演示是在更慢的磁盘上录制的「所以时钟读数偏高」（自陈的一次运行 8 个 token 平均 32.69 s/token）。**还有一个限定条件写在脚注里、不在行标签上：** 四行时间都是在「One machine, 124 cores, fast NVMe drive」上测的，所以这一列变化的是**内存预算**而非硬件——README 自己的体检脚本（`scripts/k3-doctor.sh`）对 laptop preset 的预期是「~27 s/token」，并说更慢的磁盘「在那里更慢」。因此这一行是「在服务器级主机上测出的内存档位」，「8 GB 笔记本 26.5 秒」是 README 的行标签，不是它的测量条件。这确立的心智模型是：内存地板大致等于**一个专家层加 KV 缓存**，而不是整个模型；正确性与你能装下多少无关。这条阶梯上此前的条目测的是「装得下模型的硬件」上的吞吐；这一条测的是笔记本上的地板，对没有数据中心的人群来说是另一个更有用的数字。

**llama.cpp 发布 `v0.9.0`**（2026-11-04T13:09:55Z）——有趣的是结构：这条编号线只存在了 **79 天**（`v0.1.0` 2026-08-17 → `v0.9.0`，九个次版本，约每周到每月一次），并且与 `b#####` 每夜构建**并存**，后者仍一天数次（同一小时的 b12111）。`ggml` 节奏相同——v0.27（10-15）→ v0.28（10-28）→ v0.29（11-04，与 llama.cpp 同一天）。于是「最新版本」现在有两个答案，取决于读者跟的是哪条线，这是版本号单位问题向上一层的样子。

v0.9.0 带来的是数据中心的旋钮下沉到本地栈：**NCCL 多节点张量并行**（在 ggml v0.29.0 中）、**OCP FP8 E4M3** 与 `LLAMA_FTYPE_MOSTLY_F8_E4M3`、取代 `_2d` 的批量张量拷贝 API（`ggml_backend_tensor_copy_n`/`set_n`/`get_n`，Metal 与 CUDA 已实现）、四个新架构（Clover、Limite、Metis-1.6、Mistral Large 4）、Chatterbox TTS 与 Nemotron 3.5 Transcribe 的音频生成/转写，以及最诚实的一行——`flash_attn_ext_rows`，发布说明称它恢复了非统一 KV 的 prefill 性能，也就是修掉了项目自己引入的 KV 统一化回归。

→ [[frontier-models]] [[edge-inference]] [[dev-tools]]

## 2026-11-08 04:52 —— HyperFlow H3 Flash：压缩配方公开、质量证据缺席、许可证给演示硬件设栅栏

Video-Rebirth 的 `hyperflow-h3-flash`（Show HN，33 分）：MiniMax-H3——一个带同步 32 kHz 立体声、生成视频的 ~31B transformer——被剪枝 + 低秩分解到 **13.7–13.9B**（「少于 ~31B 的 MiniMax-H3 transformer 的一半」），丢掉 50 块中的 1–3 块、**180** 个线性层量化到 W8A8 INT8 并做 Hadamard 旋转；双时间 (t, r) 条件化支持 4/6/8 步采样、无需 classifier-free guidance。只测了速度——5.2 秒片段 @6 步：4× B200 上 **8.7 秒**、单张 H200 **36 秒**、RTX 5090 **92 秒**——而**任何 VBench 或质量分数都不存在**；把速度表当作主张、缺失的质量表当作告诫。权重在 Hugging Face（GGUF 7.2–15.2 GB、INT8 ~16 GB），许可证是 MiniMax H3 Community License——「未获授权不覆盖欧盟、英国、韩国或美国的使用」——演示瞄准的硬件，恰是它授权市场里多数人不能合法加载权重的。

## 2026-11-09 04:40 —— llama-modchip：284B-A13B 以 1.71 bpw 锁进 64 GB CPU 内存，零 GPU

`synchopate/llama-modchip`（Apache-2.0，v2.4.0 于 11 月 4 日发布）是一组 ggml/llama.cpp 内核补丁 + 量化
转码器，README 头条是 DeepSeek-V4-Flash——**284.33B 总量 / 13.17B 激活**，横跨 43 个 MLA 层与 256 个路由
专家（Top-6）——压缩到 **1.71 bpw = 56.56 GiB**，在普通 64 GB 机器上带 256K KV 缓存峰值 **57.61 GiB
VmRSS**。README 里的实测数字：16 核 Zen 5 上预填充 **44.36 tok/s**，284B checkpoint 解码 **9.1–14.7
tok/s**，30B 级 MoE **25.0–111.6 tok/s**，40 工具 Claude Code 提示的 `/dev/shm` KV 槽恢复 **13.1 ms**。
内核工作：4 级 ZMM/L1/L2/L3 缓存分块（README 称预填充 **+77%**、解码 **+53%**），外加 **1.64 MB 的
Stockfish-PVS n-gram drafter** 做自推测。HN 评论者报告它真的能跑——Ryzen 7 5700U 带 64 GB DDR4 上「steady
12 to 14」tok/s。两个读法：承重数字是 **13.17B 激活，不是 284B**——稀疏 MoE + 极低位宽让「本地能跑」的
边界移动得比消费硬件升级更快，现在到了 1.71 bpw——以及 **README 只卖吞吐**：1.71 bpw 下的质量正是它的
表格不测的东西，HN 帖在没有数据的情况下争论这一点。一位早期测试者发现的分发陷阱：默认的 `modchip` 应用
装的是 Nemotron-3.5-30B，对 DeepSeek 只字不提——284B 路径需要读文档。11-09 04:35 核实：仓库标题逐字带着
同样的数字。

→ [[frontier-models]] [[fact-check]]

## 2026-11-10 04:45 — 那个锚定「便宜常开算力」的开发板重新定价到 $385

**Raspberry Pi 5 16GB 现售 $385**——「相比 4 月上次涨价的 **$80** 涨幅」——**CM5** 系统模块涨 **$40**，「无无线版本 Lite
起价 **$375**」。唯一没变的是 **Raspberry Pi 500+** 键盘机，起价 **$410**；CNX 认为这说明该形态的需求低于单板与计算模块。

**为什么它属于本文件。** 16GB 档正是本地推理部署会选的那一档，而这次涨价是**内存成本传导**而非树莓派毛利决策——这与
本周让「空闲内存」段子成为体裁的同一股 DRAM 压力。具体地：这块以 **$120** 发布、锚定「便宜常开算力」的板子现在按小型
服务器定价，于是按「买几块 16GB 板」规划的家用实验室、CI runner 机群或边缘部署，必须改成「买一块先测」，CM5 线随之
移动。本文件里的本地推理阶梯（按路由流式读取专家、常驻共享核心）是一项*内存层级*策略，而这里是那一层的价格。

→ [[edge-inference]] [[token-economics]] [[datacenter-silicon]]

来源：[CNX Software: Raspberry Pi 5 16GB now $385](https://www.cnx-software.com/2026/11/03/when-will-this-stop-the-raspberry-pi-5-16gb-sbc-now-sells-for-385/) ·
[HN 讨论](https://news.ycombinator.com/item?id=50428801)

## 2026-11-11 —— Apple 的 Harbor 泄漏：第一方「私有 AI 推理服务器」背后的多 Mac Thunderbolt 5 内存池化

- 经由 Aaron Perris 泄出（系统级证据——无截图、无日期、无版本号；Apple 未确认任何内容；以 **Claris**——FileMaker 的母品牌——之名私下预览）：「Harbor turns your Mac into a private AI inference server. Run open-weight models locally on Apple silicon—your data never leaves your hardware, and nothing reaches the cloud. Connect multiple Mac computers over **Thunderbolt 5** to pool unified memory, enabling large models and higher concurrency that a single computer can handle alone.」
- 定位本身就是新闻：*inference server* 是基础设施语言，不是消费级聊天应用——它会把 Apple 推到与其当前托管的 Ollama/LM Studio 层直接竞争的位置，而且它是「如何在一个模型后面放更多统一内存」这一长期问题的第一个**第一方**答案——llama.cpp v0.9.0 的 NCCL 多节点 TP 与 llama-modchip 的 CPU 卸载解码回答的正是同一个问题。
- thesis 3 的两个赌注在消费级硬件上相遇：跨 TB5 互联池化统一内存，与从 SSD 流式读取路由专家，是同一约束下的两种对立答案。在 Apple 出货或确认之前，把功能列表当作泄漏者的措辞——本文件对泄漏的既有规则（参见 Hexacon 预告）。

→ [[edge-inference]] [[platform-gatekeeping]]

Sources: [9to5Mac](https://9to5mac.com/2026/11/10/apple-has-new-mac-app-coming-to-make-running-local-ai-models-easy/) ·
[HN discussion](https://news.ycombinator.com/item?id=50446520)

## 2026-11-12 12:31——MACaQ：量化作为一次快的、模型无关的 pass

- **华为 CSL 的 `huawei-csl/MACaQ`**（11-10 创建、Apache-2.0、C++；arXiv **2611.10649**，11-07 提交：「Fast, Model Agnostic Calibrated Quantization for Low-Precision Weights and Activations」）。头条数字是论文自己的：**64 分钟**、仅 **32.5 GB** 设备内存量化一个 **122B** 参数模型；「困惑度低于 MR-GPTQ 与 DuQuant++，或以**少 11× 的量化时间**追平它们在 Llama-3-8B 上的最好困惑度」。
- **广度才是重点，而且瞄准的正是本文件追踪的服务栈：**llama.cpp（2/3/4-bit GGUF）、vLLM（W4A4 或 weight-only）、Diffusers（W4A4 图像/视频/音频）、PyTorch（语音、W4A4）——外加 **Ascend** 后端和装着量化模型的 Hugging Face collection。快速后训练量化是 MoE 稀疏 + 磁盘流式（论题 3）与长上下文压缩（论题 13）之外的第三条腿：它从权重那一侧压同一堵内存墙，而一个校准过的单 pass 量化器改变的是「给定的机器能装下什么」，不必换推理引擎。
- **读法规则：**困惑度对比是厂商论文——值得跑的独立测试是同 bit 宽下 GGUF 是否打赢标准 llama.cpp 量化。还有 README 结尾那句不常见的话：「无论你是人类还是 AI agent，如果你用 MACaQ 量化了一个模型，请给这个仓库点 star」——现在连 star 都向 agent 索要了。

→ [[fact-check]]

Sources: [huawei-csl/MACaQ](https://github.com/huawei-csl/MACaQ) ·
[arXiv 2611.10649](https://arxiv.org/abs/2611.10649) ·
[HN 讨论](https://news.ycombinator.com/item?id=50458166)

## 2026-11-13 04:33 —— smolmaxxing：$30 设备机队拿到带记分板的实测日志

`hyperionaidev/smolmaxxing`（「I'm making LLMs work on small and old devices」）是一份研究日志：每条主张都带实验编号（E1–E160），每个数字都在硬件本体上测得。设备 #1，小米 TV Box S（4× Cortex-A55，**1.9 GB RAM**，无 root）：Qwen3.5-0.8B 从原版 7.5 调到 **16.8 tok/s**；Qwen3.5-2B 真实聊天 **7.7 tok/s**（bits/byte 0.909）；头条是——**16B MoE（Ling-mini-2.0）跑出 5.1 tok/s**，靠 **Q2_K expert paging 从闪存分页**专家、配缓存感知路由与预取，expert miss 从 **13% 降到 ~2%**，600 词回答保持连贯。设备 #2，越狱的 2013 iPad Air（Apple A7，**1 GB**）：1.7B 模型从 Safari 跑 **24–26 tok/s**。技术按瓶颈分组：面向 base-NEON 芯片的 1-bit LUT 内核、2-bit 字段存三值权重、O_DIRECT 权重流送 + MTP 投机。

**为什么属于本文件。** 这是论题 3 的阶梯抵达最底一格——expert paging 是把 MoE 稀疏性用到 1.9 GB 的盒子上，与 Strata/`kimi-k3-in-c` 同一个赌注、缩到世界实际拥有的设备。值得从这个体裁抄的两个习惯：失败是公开发布的行（稠密 9B 只有 **0.27 tok/s**）；质量用 **bits/byte** 度量、让不同 tokenizer 的模型可比——外加退化测试（12/13 → 1/13 条退化长回答）。发现本身：「在这台盒子上，只有当更大的模型同时也更好时，更大才有用。」

→ [[edge-inference]] [[fact-check]]

Sources: [hyperionaidev/smolmaxxing](https://github.com/hyperionaidev/smolmaxxing) ·
[HN 讨论](https://news.ycombinator.com/item?id=50468888)

## 2026-11-13 12:29 —— Edge0-145B：共享矩阵 MoE 宣称抵达笔记本规模，每一行对比都是厂商内部数据

`Edge0-AI/Edge0`（10.4k★）发布 Edge0-145B/120B 权重及自家推理框架。架构是**共享矩阵 MoE**——每
64 个专家共享两个大矩阵、各留小的专家增量，每步只有 ~10B/145B 参数参与计算——配**三层加载器**
（热专家进显存、~40 GB 专家库进内存、~48 GB 词表数据按需读 SSD）与 CPU+GPU 协同调度。宣称：
**29 GB 峰值内存、1,100+ tok/s prefill、80+ tok/s decode、~120 W**，速度对 128K–256K 上下文持平，
首发支持 Apple Silicon + RTX 4090/5090。

承重的警告就在帖子里：说它胜过 Qwen3.8-Flash-Next（Terminal-Bench 2.1 上 86.52 vs 83.3）与
DeepSeek-V4-Flash-0731 的基准"come from Edge0's internal evaluations"，基线内存数字（如
Qwen3.8-Flash-Next 的 "~70 GB"）则带星号、注明 "remain to be measured"。前作是 9 月的 Edge0-35B
手机版（iPhone 18 Pro Max 上 37+ tok/s）。

**为什么收进本文件。** 若内存数字经得起第三方实测，共享矩阵设计就是稀疏化阶梯上的第四种形态
（继专家换页、专家卸载、bpw 压缩之后）——145B @ 29 GB 会把前沿智能体档放上台式机。在有人独立
跑通 harness 之前，每一行对比都是厂商的话（HN 上以怀疑为主的反应才是合理先验）。值得盯的宣称：
29 GB 峰值——一个能决定该档位的*实测*数字。

→ [[fact-check]] [[frontier-models]]

Sources: [Edge0 blog](https://edge0.ai/blog/introducing-edge0-145b-frontier-ai-capabilities-on-your-own-computer) ·
[Edge0-AI/Edge0](https://github.com/Edge0-AI/Edge0) ·
[HN discussion](https://news.ycombinator.com/item?id=50475713)

## 2026-11-13 — llama.cpp 发布 v1.0.0：b 编号时代有了 semver 线

- **ggml-org 于 11-13 10:20 UTC 打上 `llama.cpp v1.0.0` 标签**，距 v0.9.0（11-04）九天，同时 **ggml 1.0.0**——每日 b 编号（同日 b12359/b12360）继续并行，依据 ggml 讨论 #1579（「ggml-org 项目的发布与版本化」）：发布用 semver 标签、夜常用 b 编号。
- **1.0 *意味着*什么，是已宣布、未发布：**发布说明写道「New version has been released. … More info at 3PM CET」——14:00 UTC，在本期 feed 截稿之后。下游多年来钉着变动的 b 编号；稳定的 1.x 线是打包事件，语义待定。（论题 27 的形状反过来：这里工件*已*打标签、待定的是*解释*。）
- **v0.9.0 以来的变更本身就很有料：**服务端 SSRF 修复（CORS 代理 + 媒体 URL）、经非回环地址的工具访问改为显式 opt-in、客户端断连时取消 MCP 工具调用——服务端面向 agent 的表面得到自己的加固轮次——另有 Intel FlashAttention Vulkan prefill 内核、ARM NEON 上的 4×4 `simd_gemm` tile、CUDA MMQ epilogue 为 nvfp4 检查点融合 `w_s` scale、转换时的 Qwen3.5 张量合并。

→ [[edge-inference]]

来源：[llama.cpp v1.0.0 发布](https://github.com/ggml-org/llama.cpp/releases/tag/v1.0.0) ·
[ggml 讨论 #1579](https://github.com/ggml-org/ggml/discussions/1579)

## 2026-11-14 PM — ggml 发布自己的 v1.0.0;Unsloth Dynamic V3.1 量化更新公开质疑竞品方法论

**ggml v1.0.0**(2026-11-13 08:34 UTC 发布;HN 293 分)—— llama.cpp 底层的张量库发布自己的首个稳定版,就在
llama.cpp v1.0.0"宣布未发布"(细节承诺 3PM CET 给出)的第二天。按发布说明:裁剪废弃的公开 API 与旧
`DIAG_MASK` 算子,新增可配置 YaRN 截断与 FP8 支持;后端清单读起来就是本地推理实际运行位置的地图 ——
CUDA/Metal 上的少行量化矩阵乘(batch 2–24)与 MoE 融合、Vulkan 预填充 FlashAttention 路径、SYCL 设备侧
MoE 调度器、OpenCL 分解式 Adreno FlashAttention、新 WebGPU kernel、扩展的 Hexagon 算子覆盖 —— 外加一个
不再上传图中从未读取的输入的调度器。**RPC 升到 v9 并拒绝不兼容对端** —— 混版本部署会大声失败而不是静默。
昨天的教训成立:"1.0" 在变更日志存在之前只是占位符;内容是一份支持矩阵快照,对 Vulkan/SYCL/OpenCL/WebGPU
部署来说,这次发布里有趣的增量是它们的后端,不是 CUDA 的。

**Unsloth Dynamic V3.1**(文档更新 11 月 11 日;HN 161 分)为 Qwen3.8 家族重建 GGUF 量化 ——
Qwen3.8-27B 密集模型(视觉 + 256K 上下文)与 2.4T 总参/95B 激活的 Qwen3.8-2.4T-A95B —— 声称"同等体积下
准确率提升 5–10%",覆盖 Terminal Bench 2.1、DeepSWE v1.1、LiveCodeBench v6、GPQA Diamond 与 AIME25
(2–6-bit 已更新;3-bit UD3 保留,"持平")。更劲爆的一半是文档里题为 **"GSQ-RCO results are
misleading"** 的小节,公开质疑 ISTA-DASLab 的竞品量化:Unsloth 估计 ISTA 只跑了 **1 次试验**而自己跑了
**14 次**(平均 93–96% 恢复率,不是 ISTA 报告的 100%)、上下文预算更小(约 96K vs 128K)、并依赖贪婪解码
("不能代表真实世界用例")。另外新增:NVFP4 量化声称在 Blackwell GPU 上约 1.5× BF16 速度、92–97% top-1
(暂仅 vLLM),以及新的 1.1875-bpw 数据类型(IQ1_XXXS),把 2.4T 模型压进 **397 GB** 下载(比 4.9 TB 全精度
小 91%),约 450 GB 内存,Unsloth 称 B200 上约 20 tok/s。本轮已核验:文档页可逐字 grep("GSQ-RCO results
are misleading"、Dynamic V3.1、IQ1_XXXS),Qwen3.8 工件族在 HF 上得到印证(`unsloth/Qwen3.8-27B-GGUF`
640 万下载、`unsloth/Qwen3.8-2.4T-A95B-GGUF`、`unsloth/Qwen3.8-27B-NVFP4`)。为何重要:量化已成为有商业
利益的准确性敏感学科,这场争论就是案例研究 —— 决定量化表胜负的是试验次数、上下文预算与解码策略,不是
bits-per-weight。对任何量化表可复现的两个问题:跑了几次试验、在什么上下文?

Sources: [ggml v1.0.0](https://github.com/ggml-org/ggml/releases/tag/v1.0.0) ·
[Unsloth Qwen3.8 文档](https://unsloth.ai/docs/models/qwen3.8) ·
[ISTA-DASLab GSQ-RCO GGUFs](https://huggingface.co/ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF) ·
[HN 讨论](https://news.ycombinator.com/item?id=50493062)
