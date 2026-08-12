---
title: 智能路由——"先路由、再计算"
topic: smart-routing
created: 2026-08-13
---

# 智能路由——"先路由、再计算"（2026 年 8 月）

在同一个批次里出现在三个独立项目中的一种跨域模式：一个**分类/路由层**，检查每个工作单元，
把它发送到*能以最低成本胜任它的引擎*——而不是把所有东西都跑在最贵的引擎上。

## 模式

先分类，再分派。每个请求/页面/推理先做一个廉价的"该用哪个引擎？"决策，然后交给最小的可用
模型/解析器。省下的成本来自*不*把工作送到重路径上：大部分单元由廉价引擎处理，只有真正难的
尾部才到达昂贵引擎。

## 三个实例（同一个形态，不同的领域）

1. **模型路由——NeMo Switchyard**（`NVIDIA-NeMo/Switchyard`，Apache 2.0，Rust）。在 OpenAI Chat
   / Anthropic Messages / OpenAI Responses 之间翻译，并把每个请求路由到一池模型（vLLM、NIM、
   Ollama、任意 OpenAI 兼容端点）之上。内置路由器（据仓库路由表核实）：`llm_classifier`（由内容
   决定走弱/强层级）、`stage_router`（用会话信号路由大多数轮次、无需额外模型调用）、升级
   （escalation，即 `llm_classifier` mode="escalation"——先走弱层级，由判定器决定是否升级）、
   `random`（固定 A/B 分流），外加 `passthrough`（单一目标、不做路由决策）。LangChain 仅把 7% 的
   调用路由到前沿模型就削减了 74% 成本——*代价是 6% 的精度回退*（145 个多轮 Deep Agents 任务）；
   内部基准宣称以约 Claude Opus 4.8 单模型 1/3 的成本达到前沿级精度。（仓库证实了机制——Apache
   2.0、约 755 星、pre-alpha；74%/7% 与 Opus 数据来自 NVIDIA 博客，后者把 Switchyard 与 30B-MoE
   的 Nemotron 3.5 Lightning 一同发布。）

2. **文档路由——Firecrawl pdf-inspector**（`firecrawl/pdf-inspector`，MIT，Rust）。不渲染地读取
   PDF 的内部结构（字体编码、文本算子、图像覆盖率），在约 10–50ms 内把每个页面分类为
   TextBased/Scanned/ImageBased/Mixed。文本页走原生抽取；只有其余页面才去做 OCR。跳过约 54%
   文本型 PDF 的 OCR，正是 Firecrawl 让托管解析器快 3.5–5× 的方法。提供 Python（PyO3）/ Node
   （napi-rs）/ WASM 绑定，外加 `pdf2md` / `detect-pdf` CLI；opendataloader-bench 得分 0.875。

3. **推理升级——Needle 2**（`cactus-compute/needle`，MIT）。4500 万参数 / 14MB 模型，把问题当作
   函数调用来求解，返回带**校准置信度**的结构化 JSON；低置信度结果升级到更大的模型。整个会话
   都在本地运行（约 28MB 内存），因此昂贵路径只在尾部才被触发。

## 为什么重要

三个不同的领域——LLM 服务、文档解析、端侧 agent——却是*同一个*优化：**昂贵的引擎（前沿 LLM /
  GPU OCR / 云端推理）只应看到分布的尾部。** 随着多模型、多解析器工作负载激增，"哪个引擎服务
哪个单元"本身成为一层——一个由路由器所有者掌控的新控制点。

## 关注点

- 路由策略的收敛：classifier vs stage vs escalation vs 置信度门控——它们会合并成同一个标准吗？
- 谁拥有路由器：NVIDIA 把 Switchyard 定位为"芯片之上的编排软件"——路由器层正是厂商锁死
  （lock-in）会试图发生的地方。
- 同一个"先分类"模式被应用到下一个昂贵步骤（音视频转写、嵌入、微调数据选择）。
