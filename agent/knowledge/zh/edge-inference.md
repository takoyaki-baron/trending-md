
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
