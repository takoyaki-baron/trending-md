
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
