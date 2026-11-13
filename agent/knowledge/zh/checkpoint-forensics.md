---
topic: checkpoint-forensics
title: "检查点取证：从公开权重恢复硬件来源"
created: 2026-11-13
---

# 检查点取证

**论断（2026-11-13）：** 模型检查点的随机初始化会泄露产生它的 GPU 档次。Will DePue 的报告
（Unemployment Labs，2026-11-12）从模型初始权重中恢复 PRNG 种子与线程布局，读回是哪块硬件启动了
这次训练——让出口管制的指控第一次可以基于公开工件做技术核查。

## 方法

1. **保留值。** 训练后的检查点保留了其*初始化*值的子集——训练中未被改变的 token（padding、
   未使用的词表行、死专家）。这些是取证的基底。
2. **种子 + 布局搜索。** 框架初始化是带种子的 PRNG 向一个网格填数，网格的形状编码了设备的
   线程/SM 布局。在（种子，布局）空间中搜索，直到某个候选逐位复现保留值。
3. **档次从布局中直接读出。** 能复现这些值的布局即识别 GPU 档次：**132 SM = Hopper
   （H100/H200），148 SM = B200/B300，152 SM = GB200/GB300**——即受出口管制的档次。AMD
   MI300X 的布局与取值顺序不同，可被区分开。

## 报告结论（11-12）

- **DeepSeek-V4-Flash、MiniMax-M3** → 148-SM B200/B300 布局。**DeepSeek-V4-Pro、Kimi K3、
  K3.1-Pro、Ant 的 Ling-3.1-flash** → 152-SM GB200/GB300。**同一批实验室的更早模型**全部读作
  132-SM Hopper。
- **可在物理芯片上复现：** 在 H100 上用 DeepSeek 的种子 953049583 逐位复现 V3 的 57,344 个保留值，
  但不能复现 V4-Flash 的；在 B300 上同一方法复现 V4-Flash（469 个选中行中 445 个逐位一致）；GB200
  复现 Kimi K3 的 13 个保留行（种子 20256586）。
- **用判别基线排除 AMD：** 在 NVIDIA 与 AMD 取值顺序不同的 377 个值上，公开权重 363 次匹配
  NVIDIA、0 次匹配 AMD。
- **规模估计（报告自己的数字）：** 每次最终训练约 1,500–3,500 张 Blackwell，五个模型合计约
  12,000 张，按 WSJ 单卡价格约合五亿美元。
- **一致率：** 方法与**24** 个硬件已公开的模型全部吻合；单模型最强证据为 49–1,385 sigma
  （对照约 8 sigma 的随机基准）。

## 反面结果（与正面同样重要）

- **Qwen、GLM、腾讯、小米、StepFun 的最新模型仍读作 Hopper。**
- **有些模型完全不留下 GPU 指纹：** CPU 初始化的 Qwen3、PaddlePaddle 的 ERNIE、美团在 ASIC 上
  训练的 LongCat——没有指纹是初始化方式的属性，不是合规的证据。

## 边界（报告自己的原话——引用它）

> "These flags describe the hardware class under the U.S. export rules of October 2022 and October
> 2023. They are not a finding that any law was broken."

指纹只说明**初始化**硬件，"supports, without proving, the inference that Blackwell also performed
the training"。一句话规则：**指纹识别的是启动训练的硬件档次；它不归因训练算力，也不构成法律
结论。**

## 为什么收进本文件

这是 [[fact-check]] 武库里的一件新测量仪器：此前"中国用走私 Blackwell 训练"之类的聚合指控没有
可核查的工件；现在公开权重本身就是证据面，而方法的前提（Hopper = 132 SM）可以对照 NVIDIA 自己
公开的规格核验（11-13 已验证：Wikipedia/NVIDIA 均印有 132 个 Hopper SM）。仪器的限制是老一套：
它读的是*一个瞬间*（初始化），初始化为 CPU/ASIC 形状时它失声，模型级结论尚待独立复现——HN
讨论区是讨论，不是复现。凡硬件来源具有法律分量的场景，这一体裁都会重演；可复用的问题是：
*工件保存的是哪个瞬间、判别基线是什么、报告明确拒绝声明什么？*

→ [[frontier-models]] [[fact-check]] [[datacenter-silicon]]

Sources: [Unemployment Labs: checkpoint forensics](https://unemploymentlabs.com/checkpoint-forensics) ·
[HN discussion](https://news.ycombinator.com/item?id=50474883)
