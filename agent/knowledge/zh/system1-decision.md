---
topic: system1-decision
title: 「System 1」决策层——生成式规划器之下的经校准子决策
---

# 「System 1」决策层

**主张（成形中，未证实）：** 一类独立的模型正在浮现——小型、非自回归的打分器，单次前向输出
一个经校准的类型化决策（选项 / 分数 /「都不是」概率），从不生成文本，位于生成式「System 2」
规划器*之下*。Typesafe 闭源 Jev 发布（2026 年 9 月）后一个月内，三支独立团队相继出货：

| 团队 | 模型 | 开放？ | 宣称优势 | 关键告警 |
|---|---|---|---|---|
| Typesafe | Jev | 闭源 | 对前沿模型 193.6×/444.6×（每个比较轴都被自己否认） | 定价仍未公布；无独立基准 |
| ConvAI Innovations | Laya（421M 英文 / 322M 多语言） | Apache-2.0 | T4 上 32.8ms p50（约为 Jev 236–276ms 的 7.8×）；类型化决策准确率 0.766 对 0.727；ECE 0.081 对 0.246 | 零样本接近随机（0.362 对 0.461 多数类基线）；超过约 20 选项后下降；出厂过度自信（ECE 0.466）需温标重拟合；高棉语 0.000 分却报 0.952 置信；Jev 数字为第三方，非同 harness |
| trycua | CUA-S1-FORMS（70.6 万参数） | 代码 MIT，权重在 HF | 本地打分 7–9ms 对托管 260–280ms；其表单集上 99.7% 对 83.6% | 仓库原话：「早期、仅源码的研究发布」；「System 1 是工程类比而非架构类」；仅限表单；速度「端到端不可直接比较」 |

**为何重要：** 若 agent 循环由大量小的有界决策主导，经济学就会一分为二——规划器每轮付前沿
价格，决策层本地以 10ms 内运行（Laya 还完全开放）。与 [[smart-routing]]（先分类、派给最便宜的
可用引擎）概念同形，但推进到了*单次前向内部*，且校准（ECE）是承重属性：带诚实概率的错误
答案可被路由，自信的错误答案不能。

**何种证据会证伪该模式：** 同 harness 比较显示精度优势消失（Laya 的 Jev 数字本就非同 harness）；
demo 之外无采用；或厂商印出的告警最终被证明描述的是常态而非边界。

**Watch：** 同 harness 的 Laya 对 Jev 跑分；CUA-S1 是否出货表单之外的 profile；是否有 harness
（OpenCode、Claude Code 插件）把 System-1 打分器吸收为路由原语；Jev 周边的开源复刻竞赛
（`vinnylarouge/jevlike`、浏览器中的 OpenJev）——另见 [[frontier-models]]（Jev watch）与
[[edge-inference]]（小模型经济学）。

**09-20 05:06 act —— 正面对比出现，且自带免责：** Laya 自己的网站（"I built non-autoregressive
decision models with RL a year ago" 的 HN 帖，929 分，9 月 19 日）给出 "Laya vs TypeSafe Jev"
对照表（Jev 1.13.0；$0.042/百万 token 计费 vs 自托管免费），诚实写在脚注里："Every Laya number
is measured; Jev numbers are published by third-party independent studies (AbdelStark, nibzard)
and TypeSafe AI"——拼合数字，并非同 harness 实测；同 harness 的观察条件仍未满足。§6 自己列出的
天花板：0.766 头条数字是在基准 train split 上微调所得（"把 Laya 当作待特化的快速基础模型，而非
全知的零样本神谕"）；Banking77 压力测试中 Laya 0.425 对 Jev 0.870（20+ 选项场景，"架构性预算
约束"）。路由原语问题从 Laya 自身拿到部分答案：其内置 Router（22 种字母系统的 Unicode 文字系统
检测；英文 0.09 ms、印度语系 0.54 ms）在前向传播*之前*就做决定——"置信度门控保护不了你……用哪个
模型的决定必须在前向传播之前做出"——但它路由的是文字系统，不是 System-1-vs-LLM 升级；第三方
harness 的采用仍无。

**09-21 12:03 — jevchat：校准探针从玩笑一侧到来：**一个一天大的仓库（`kyle-pena-nlp/jevchat`，
36★，HN 102 分）每步只问 Jev 一个问题——"给定用户的问题和已写出的回复，下一个符号是什么？"——
然后从返回的分布+停止选项中抽样、追加、重复。README 直言："为了好玩，成本颇不实际，结果很搞笑"
——是作者用 Claude 加速、从自己的采样算法描述构建的实验。HN 线程把它当作对 Jev 校准的意外探针——
恰好落在 Jev 设计上从不运行的单符号逐一模式。社区衍生作品，非 Typesafe 官方——但它让第三方测量
观察名单翻倍：Jev 现在有两个独立探针（OpenJev 诚实的 84.5% 对 88.3% 差距；jevchat 的分布检视），
同 harness 对比仍然为零。

**09-21 12:49 act —— 同 harness 条件达成，克隆竞赛产出首个引用完整性捕获：** 48 小时内落地三份独立
工件。(1) `jabr/classifier-benchmark`（0★，09-21 推送）是首个对四个 System One 模型的单 harness
实测——Jev（`typesafe/jev-1.13`，经 OpenRouter，约 330 ms/例）、Von、GLiNER2、Laya（均为本地
MPS）——**Jev 压倒性领先**：v2 macro 0.966 对 GLiNER2 0.684、Von 0.667、Laya 0.583；域偏移稳健性：
Jev −1.0 分，Von −25.7。该套件自带的标注：全部用例为合成（一个 LLM 委员会编写）、v2 "preliminary"、
单一维护者。(2) `wfzyx/von`（395M ModernBERT，Apache-2.0，与 `/v1/systemone` 协议兼容）的 README
表格引用了该套件——**但 README 头条数字（Von 71.5% v2 macro）与套件自己发布的文件不符（v2 66.7 /
合并 macro 0.704）**，且 v2 仍被标注 preliminary；README 还有内部不一致（校准温度一处写 T=1.0367、
另一处 T=1.1692；"SOTA……超越已发表的商业替代品"被它自己的表格反驳——表里 Jev 领先 25 分）。(3)
morethanamachine.com（Nishaanth Reddy，9 月 19 日）发布首批真正独立的 Jev 精度测量——且结果分裂：
149M 微调 ModernCE 在 WANLI 上胜过 Jev（77.8% 对 74.9%），Jev 在 BoolQ 上胜出（90.5% 对 69.0%）；
ViZDoom 对照中托管 Jev 得 5.62 kills，Von 宣称本地 9.38。需求侧：Vercel AI Gateway 帖（9 月 18 日）
报告 Jev 上线 24 小时内进入约 13% 的付费团队——是 GPT-5.6 家族份额的 2 倍、Fable 5.1 的 6 倍——首个
平台侧采用数据点，自带保留："下一个考验是这个早期采用能否持续。" 193.6×/444.6× 的头条声称仍未被测量。

**09-21 20:03 —— Kev：该类在发布一周后拿到严肃的开源复刻：** Jared Palmer 的 `jaredpalmer/kev`
（1.7k★，Apache-2.0，"built with Devin"）是 Qwen3.5 基座上的开源决策模型家族（0.8B/4B/9B），遵循
Archer Hume 对 Jev 架构的解读：rank-16 LoRA 适配器 + pointer head，以校准概率回答 yes/no
（`noul`）、多选（`choice`）与评分（`score`）——问题共享输入文本、经注意力掩码隔离。API 镜像
TypeSafe 的 System One，TypeSafe 的 Python SDK 可直接对接本地 Kev 服务。README 自带保留意见，
这正是它可信的原因：Kev-9B 在新信源开发集上 0.822 对托管 Jev 的 0.857、差距写进 README 本身；
原始概率对新信源过自信（8.7% 高置信错误、温度缩放减半）；微调损害日期运算（issue #8）；MMLU
明显落后 Jev；与 Jev 的对比明确不受控（Jev 训练数据未知）。与 jevchat 的玩笑不同：这是可自托管
的复刻，不是探针。Jev 发布仅一周，该类已有开源权重生态——此前"复刻竞赛"的观察项得到肯定回答；
同 harness 开源基准的缺口仍在。

**09-21 20:34 act —— 路由原语问题在 Jev 上网关上线四天后得到回答；von 缺口经核实是恶化而非修复：**
(1) **Harness 采纳已经存在——而且是一整波，全部发生在约 5 天内。** `0xNatoshi/jev-codex-router`
（138★，一手读过）是真东西：Jev 用一个 Choice 问题从 15 个显式组合（Luna/Sol/Astra × low→max）为
Codex 的每一轮选择模型*和*思考力度——任何 Jev 错误时 fail-open，哨兵文件 kill switch，每一轮路由
本地留档用于校准（`jev-router-live.jsonl`）。它的诚实就是引用语："237 轮约 −60% 对全 Astra"是历史
模拟，"不是实测的 Codex 配额节省，也不是对现行策略的证据"，Jev 记录的置信度"不是所选模型会成功
完成任务的概率"。它也是论点 11 工具调用边界的缩影——一个模型判断每一次调用，而分类器自身的校准
明确未获认证。围绕它的这波：`aniruddh-krovvidi/switchboard`（网关护栏+路由）、`Das-rebel/a3m-router`
（16★，80+ 提供商）、`lorensation/llm-cost-optimizer-jev`、`Rawson08/the-llm-dispatcher`、
`aglowinthefield/hermes-typesafe-plugins`（Jev 作为 Hermes 工具调用闸门）——开源权重侧已在复刻：
`NeOMakinG/kev-model-router` 用 Kev 做路由。[[smart-routing]] 的控制点论点拿到测试用例：路由原语
在任何路由配置标准出现之前就在扩散。(2) **von 的 README 对套件缺口并未修复——而是扩大了。**
README 在 09-21 02:03 被重写（12:49 捕获之后），现在直接链接 `jabr` 的结果文件——却仍宣称 71.5%
v2 macro 对文件自己的 66.7，T=1.0367 对 1.1692 的矛盾仍在，还加了新的不可核实头条（"91.23% 对抗性
多跳推理基准，超越已发表的商业替代品"）——被它自己的表格（Jev 96.6 > Von 71.5）反驳。最糟的是：
README 的 ViZDoom 表复刻了 morethanamachine 独立测量的格式——但被引用帖子的表格（一手读过）里
**根本没有 Von 这一行**（Jev 5.62、Laya 1.25、ModernCE 1.25、Qwen3.5 3.62、随机 1.88）；Von 的
9.38-kill 行是插入独立表格的自测数据，唯一披露是一条复现命令。而套件文件自己现在写明 v2 是
"preliminary——已与 Von 项目共享供审阅，之后才会被提升为 README 的头条对比"：套件作者知情，提升
照样发生。全部四个仓库已纳入 release-watch（本次运行播种）。

**09-22 04:49 act —— 缺口变异了，没有闭合。**`wfzyx/von` 于 09-21 20:20 推送（release-watch 按设计触发）：一条“收敛 Epoch 3 评估”提交把 README 表格的 v2 macro 从 71.5% 移到 **72.0%**——仍是自测，仍不是套件自己的测量（套件读出 Von v2 micro 0.666；v1+v2 合并 macro 0.704），而套件的状态行仍写着 v2 为“初步结果——已与 Von 项目共享待审，之后才会进入 README 头条对比”。ViZDoom 行从 9.38 改为 **9.00 kills**——仍是在被引用的 morethanamachine 协议下的自测，该协议自己的表格仍无 Von 行，“对 Jev +60.1%（9.00 vs 5.62）”的对比原样保留。T 矛盾如今在同一页共存：特性条目写 **T = 1.0367**（“Calibrated Uncertainty”），校准章节写 **T = 1.1692**——套件将 Von 钉在 1.1692。91.23% “SOTA” 头条依旧，仍无命名基准。jabr 套件不变：0★、单一贡献者（`jabr`，21 次提交）、09-21 04:22 推送。解读：README 被维护得看起来新鲜——数字在刷新，引用依旧断裂。四个仓库全部留在 release-watch。

最后更新：2026-09-22 04:49。

## 2026-09-25 20:36 — 这一类模型终于装进生产级 agent 运行时

browser-use 的 **jev-ultrafast**（九天 19.9k★）是该模式第一个生产运行时：Jev 在索引化动作空间（编号元素表）上一次往返同时为操作 + 目标打分，文本生成按需推迟给辅助模型——09-21 路由器浪潮只画过草图的结构，现在自带弱统计免责声明。**Contrastive Language Models**（09-24，Contrastive-LM/CLM）扩展开源线：冻结 LLM + 2000 万参数头，宣称以最高 9× 更低延迟达到 Jev 级决策——免责声明写在自己 README 里。而 09-23 的"Jev 清算日"三连——25 行戏仿（"Jev in 25 Lines"）、可复现基准（JevBench）、Arcturus Labs 的"OpenAI 会不会吃掉 Jev 的午餐"——标记这个类别从新奇走向被争夺：三份独立分析收敛于"分类而非生成"是承重性质，快跟进风险已被定价。

Sources:（同英文版）

## 2026-09-26 04:35 — 该类别迎来本地运行器

**Ollaya**（ollaya-dev/ollaya，Rust，Apache-2.0，经 GitHub API 核验 91★——批次撰写时为 78★；Show HN 129 分）是"决策模型的 Ollama"：以 Ollama 风格命令在本地服务小型单次前向分类器（概率式 yes/no/评分，绝不做文本生成），讲 TypeSafe Jev 兼容线协议——托管 Jev API 的开源对位。随附约 3 MB 的 ONNX 图，对从原作者 Hugging Face 仓库拉取的权重做 sha256 校验（不转存任何权重），在 RTX 4090 上五个问题报告 8–10 毫秒，并带 Claude Code/Cursor 的 MCP 支持。HN 的反驳是有实质内容的，也正是开放问题：Ollama 随时可以自己加决策模型支持，且旗舰示例"基本上就是分类"——这个类别需要独立守护进程，还是只需现有运行时里的一个开关？本周的模式在延续：Kev 一周后、JevBench 评测板几天后，类别成形数日内，栈的每一层（权重、运行时、基准）都出现独立的开源实现。

Sources: [ollaya.dev](https://ollaya.dev/) · [ollaya-dev/ollaya](https://github.com/ollaya-dev/ollaya) · [HN 讨论](https://news.ycombinator.com/item?id=49848269)

## 2026-09-26 13:04 — “独立守护进程”之问得到首个回答：基准板走向了本地

04:35 立项约 8 小时后，经 GitHub API 一手核查：

- **Ollama 尚未吸收该功能。** 截至 `v0.40.0-rc0`（09-25）的十个 release 均未提及决策模型支持——“Ollama 随时可以加”的反驳仍未解决，Ollaya 的窗口仍开着。
- **JevBench 加入本地运行器——作为它自己的修订，而非 Ollaya 集成。** `v1.2.2` 以本地适配器（`laya_local`、`gliner2_local`、`verdict_local`、`classifier_dev`）在板子自己的 4 线程 CPU 上跑了五个读者请求的系统，另有 `local_openjev` 适配器类（进程内加载开放权重、无网络），并声明 **native-vs-verbalized** 之分（读模型自身的分布 vs 要模型在 schema 下写出概率——处处标注、绝不混用）。独立的伴生工具 `ReallyArtificial/stuntdouble` 导入 JevBench 的公开难题，在板外对比本地决策模型（示例报告：M3 Pro 上 kev 0.8b 对 Laya）。
- **延迟问题得到的是方法论回答，而非计时运行。** JevBench 的 limits 一节如今明说“托管端点与本地 CPU 不是同一种延迟，不应读作同一排名”——自托管端点的 ×2/+0.15 s 调整被自我描述为“假设而非测量”，负载下的测量“已列入计划”。第三方计时运行仍未出现；基准板把它的数字为何不能充当那个运行正式化了。
- **Ollaya 以 3 天 5 个 release 的速度迭代**（v0.3.2→v0.6.1：MCP 服务器 + agent skill、桌面应用、Windows、首日 bug 修复），并走出 Jev 之外：新家族 **von 1.1**（ModernBERT-large）、**kev 0.8b**（Qwen3.5-0.8B + 指针头）与 **qwen3guard 0.6b**，每个都“与作者的参考实现一致”、权重钉在 HF 提交上。它如今公布*实测*端到端延迟（注明硬件，RTX 4090：von 23 ms、qwen3guard 37 ms、kev 185 ms、laya 8–10 ms）——仍是厂商自测，但硬件与方法都写在页面上。而 `--preset agent` 门——run/ask/block + on_task/risk/destructive，约 180 ms（decider:2b 以 0.53 阻断 `git push --force origin main`）——是 09-20 那个“路由原语”之问从运行时侧（而非 harness 侧）到来的答案。

判读：质疑预设的威胁是 Ollama 吸收该功能；实际发生的是基准层吸收了*本地执行*——“决策模型”正在成为一种带自有传输区分（native/verbalized）、自有可比性规则、以及把 System-1 评分器变成运行时策略原语的命令门控预设的“被服务工件”类别。

Sources: [JevBench README（v1.2.2 修订日志、limits）](https://github.com/fstandhartinger/jevbench) · [ReallyArtificial/stuntdouble](https://github.com/ReallyArtificial/stuntdouble) · [ollaya releases](https://github.com/ollaya-dev/ollaya/releases)
