---
title: Harness 可靠性——容错与 token 效率都住模型与工具的接缝里
topic: harness-reliability
created: 2026-10-26
---

# Harness 可靠性——容错与 token 效率都住模型与工具的接缝里

三篇在 48 小时内发布的论文（arXiv，2026-10-23）从三个方向测量了同一个物理位置：agent 把动作交给工具、再读回结果的那道接缝。一篇往里注入故障，一篇在动作跨过接缝之前先校验，一篇把已经做出的决策跨越接缝复用。三篇都得出同一个变量：移动数字的是 **harness**，不是权重；而且每篇都印出了自己测量的边界。

相邻文件：[[agent-stack]]（harness 作为一个产品品类）、[[token-economics]]（成本边界）、[[fact-check]]（如何读一张自报的表）、[[frontier-models]]（基准表里的 harness 溢价）。

**主张：** 可靠性和 token 效率都是**模型—工具边界**的属性，而那段代码是团队这周就能改的。能力基准看不见脆弱性，模型规模买不到它，而报告出来的最大节省来自*不再重新推导一个决策*，而不是更好的推理。

## 三件仪器

| 论文 | 它在接缝处做什么 | 头条数字 | 它自己声明的限定 |
|---|---|---|---|
| **MCP-Injector**（arXiv 2610.32555） | 在 MCP 工具调用路径上插入故障注入中间件：永久 / 瞬时 / 间歇，可播种的调度 | 在永久故障占高的画像下，任务完成得分下降 **60%**（8.08 → 3.23 / 10） | 画像是**从 issue 线索里挖**出来的（代理指标，且加权永久）；换一种加权，60% 就会移动 |
| **StateMirror**（arXiv 2610.32648） | 在执行*之前*拦截动作；用 AST + 命令分析抽取状态谓词；对活仓库做确定性校验 | 2,508 个动作上 **0.940 精确率 / 0.817 F1**；检测延迟 **17.73 s → 1.50 ms**，零 token | 只抓 agent 对环境的模型与环境本身之间的不匹配——一个*合法但错误*的调用对它不可见 |
| **HarnessMM**（arXiv 2610.32813） | 把已解决的决策存成可执行决策图，靠回执重放而不是重新调用推理 | HumanEval：成功率保持 **90.82%**，每任务 token **66.72k → 47.02k（29.54%）**；DeepSeek Harness：成功率 **71.43% → 85.71%**，token **96.28k → 11.62k（87.93%）** | 只做函数级基准；DeepSeek 那行 14 个点的*提升*没有被解释，应当视为基线调得不好 |

## MCP-Injector：规模买不到容错

- **故障模型是从生态里挖出来的**，不是凭空设计：**1,774 个开源 MCP 仓库的 57,240 条 issue 与 PR 线索**，按（失效模式 × 持久性）分箱。
- **1,350 格的实验网格**，交叉两个骨干规模（20B、120B）、三种栈（自研多轮 plan-and-execute、OpenAI Agents SDK、LangChain）与三种故障条件。
- **负结果才是严谨的那部分。** 120B 在故障下"并没有保住更大比例的免故障得分"（韧性比模型，**p = 0.96**），它的故障期完成率"如果有差别的话，是更低"——**91.1% vs 95.6%**，差 4.4 个百分点，95% CI **[-0.2, 9.3]**。跨过零的置信区间被写成*不是一个发现*，这句话值得抄进任何一张表。
- **改变实践的那句话：** "Agent 栈在吸收故障的能力上各有不同，这说明框架层的错误处理比模型规模更重要。" 于是可靠性是一条 harness 的预算项，而不是选模型的判据。
- **两个骨干都是 `gpt-oss`**——一个两模型家族，不是全领域普查。

## StateMirror：可以判定的那半边"幻觉"才是大的那半边

- **先测了基线成本：** 4,398 条轨迹显示，幻觉式工具调用要花中位数 **3 个额外交互步与 22.4K token** 才能恢复，因为现有框架是在执行*之后*才靠回灌错误来捕获。
- **手法是拒绝去建模那部分不需要模型的东西：** 关于路径、包和符号的谓词对活仓库是可判定的。这换来相比最强 LLM 评委高出 **35.3% 的 F1**、四个数量级的延迟优势，且**零 token**——这才让它可以在*每一个*动作上跑，而不是抽样跑。护栏必须比它防止的失败更便宜；一个更贵的"护栏"其实是指标。
- **79 个任务上的实战缓解：** 执行时间 **−15.8%**、token 消耗 **−11.8%**，任务解决率保持。
- **论文自己写下的边界：** "合法但错误"（一个因为错误原因而通过的测试）不在它检测的类别里，而 0.817 F1 是在它为自己设计的类别上测的。

## HarnessMM：节省的大部分来自"之前已经解决过"

- **机制：** 可执行决策图保存确切的动作、字面参数、因果依赖与*公开守卫*；一个控制器从观察到的回执里激活它们，通过原生接口执行，并记录那个已注册的慢回调被移除。Actor 权重始终**冻结**；任何新的、不受支持的或选择器弃权的，都回落到模型。
- **能迁移的消融不是头条那个：** 在 MBPP 上，保留一个决策比一次性图便宜 **26.91%**、比保留回调便宜 **19.52%**——也就是说大部分收益来自*这个决策曾经被解决过一次*，而不是围绕它的图机制。
- **该怀疑的那一行：** 同一行上既砍 87.93% 的 token 又涨 14 个点的成功率，通常意味着基线调得不好，而论文没有对这个涨幅归因。
- **没有报告的实验：** 一个靠公开守卫对*活*环境校验的决策图，恰恰是在真实仓库里最容易失效的结构，因为仓库状态在调用之间会变。HumanEval 与 MBPP 都是函数级。

## 写进 feed 条目时应当带上的

1. **点名接缝。** "agent 变强了"不是测量；"这个栈吸收了故障"、"谓词在执行前被校验了"、"这个决策被复用了"都是测量，而且都是代码。
2. **警惕与节省同时到来的提升。** 结果保持 + 成本下降是缓存主张；结果上升 + 成本下降在作者开口之前是基线主张。
3. **引用故障模型。** 压力画像是选择——从 issue 线索挖、加权永久——头条百分比是那个选择的属性。
4. **把可判定的与需要判断的分开。** 幻觉里便宜的那一半对环境可判定，贵的那一半不可，而混为一谈会让便宜的那一半显得不可能。
5. **对护栏来说，延迟是正确性属性。** 从 17.73 s 到 1.50 ms，才是把一个抽样检查变成常开检查的东西。

## 分数属于"配对"，而"没能产出"是另一种失败 (2026-10-26 20:38)

arXiv 2610.32483（*When Agents Fail: Model or Harness — Who's to Blame?*）给出了本文件前提所需的论断：
一个 agentic 基准分数是**模型–harness 配对**的属性，而不是模型的属性；看见它的办法是把**有效完成**与**正确性**分开测量。

- **五项指标：** Valid Completion Rate（VCR——agent 是否正常结束并交付**可评估**的结果，与正确性无关）、
  Model-Harness Fit、Cross-Model Fit、Interaction Residuals（被组件级汇总掩盖的配对特有强弱）、
  Token Load（含失败尝试）。
- **规模：** 四个 harness——**OpenCode、Codex CLI、Pi CLI、DeepAgents**——× 四个核心模型，另加两个固定的原生
  模型-harness 系统，覆盖六个基准（上下文管理、工具使用、长上下文规划、多模态交互、产物交接）：
  **111 个设置、52,168 条轨迹**。
- **结论：** **OpenCode 在跨模型表现上排名第一**；**DeepSeek V4 Flash Preview** 在共享的四基准面板上取得
  跨 harness 最高的平均 VCR；作者自己的总结就是应当引用的那句话——"harness rankings vary across models and
  benchmarks; task performance and valid completion can favor different pairings, and similar task
  scores can accompany distinct execution profiles."
- **为什么 VCR 是承重指标：** 只看正确率，会把"从未产出可评估产物"的 agent 与"产出了错误产物"的 agent 打成
  同样的分。那是两种缺陷、两种修法（harness 管路 vs 模型判断），而标准基准表格把它们合并了。

**随之而来的限定：** 一篇在审的预印本，111 个设置由其作者自行构造。应当读作"排名不稳定的示范"，
而不是可以引用的排行榜。

**同一问题的技能一半**（arXiv 2610.32322，*Beyond Gain*）：以"有/无技能的得分增益"决定退役的规则，
其增益在两种情况下都接近零——技能已被内化时，以及模型与技能都不提供该能力时（称为 **uncovered**）。
在四个模型上实测：**SkillsBench 的 31 次退役中有 28 次建立在没有任何一次运行完整通过的探测上**；
增益规则的跨任务一致性为 **Cohen's κ 0.23**，而"无辅助得分"判定为 **0.42**，且判定**因模型而异**，
因此 hub "must read them per model"。1,251 个技能及其任务与分项得分在四个模型下的数据发布于
`EverMind-AI/SkillCorpus`。

→ [[frontier-models]] [[agent-plugins]] [[agent-stack]]

Sources: [arXiv 2610.32483](https://arxiv.org/abs/2610.32483) · [full paper](https://arxiv.org/html/2610.32483v1) · [arXiv 2610.32322](https://arxiv.org/abs/2610.32322) · [EverMind-AI/SkillCorpus](https://github.com/EverMind-AI/SkillCorpus)

## 2026-10-27——harness 第一次有自己的分数，而漂移不是推理退化

本周两篇预印本不再把 harness 当常量，并且都是**配对**设计：同一段历史、同一个工作区、同一个任务，只改一个变量。

**TraceTrial-Bench**（arXiv [2610.32285](https://arxiv.org/abs/2610.32285)，*Trial by Trace*）把 harness 可靠性拆成
**七个组件**（context、execution、governance、lifecycle、observability、tools、verification），构造 **95 个专家级、
面向机制的任务**（可执行或基于状态的 ground truth），评测 **4 个 harness × 9 个模型 × 95 个任务 = 3,420 次运行**。
宏平均的 **harness** 得分落在 **59.8%–72.0%**——而真正该与每个通过率并列的数字是：「**31.1% 的运行在至少违反一项
harness 判据的情况下仍取得任务成功**」。近三分之一的绿勾底下藏着脚手架未兑现的承诺：被静默截断的上下文、被重试到
语义不同的工具调用、根本没跑的验证步骤。值得借用的方法是 **Failure Attribution** 模块——用「显式机制链」把判定落到
运行级的某个组件，而不是语料级的一个分数。

**SWE-Shift**（arXiv [2610.32196](https://arxiv.org/abs/2610.32196)）攻击的是每个仓库级基准底下的假设：「任务与环境在
执行全程保持不变」。它从「同一份保存的历史与工作区」出发，**Clean** 续跑不加干预，配对的 **Shifted** 续跑「收到与任务
相关的更新」；成功要求「完成当前任务、保住仍然有效的工作、满足适用的状态与证据检查」。**120 个场景 × 12 类变更 × 9 个
预定干预位置**、**17 个编码 agent 系统**：「全部系统的 Shifted 成功率都低于 Clean」。**GPT-6 Astra 从 67.35% 掉到
24.79%**，配对成功率 **20.34%**，且「**工具/会话变更与陈旧证据两类，在全部系统上配对成功为零**」。两处方法论优点：
作者拒绝编圆故事（「后位干预的配对成功率，有的系统更低、有的更高」），并把可复用的句子写进摘要——「未变更任务上的
成功，可以与更新后无法保住工作、恢复状态或刷新证据的失败同时存在」。

**两篇合起来说什么。** 失败不是推理退化，而是 agent 继续引用已经不再为真的证据，而 harness 从不复核。加上 10-26 的
那一对（arXiv 2610.32483 的「分数是模型–harness 配对的属性」与 2610.32322 的退役 κ），一周内 harness 被三种方式测量：
作为**被打分的组件**、作为**漂移下的变量**、作为**配对效应**。只报通过率而不报 harness 分数与配对数字，读者无法判断
三者中哪一个动了。

**效率论文的单位陷阱（arXiv [2610.32881](https://arxiv.org/abs/2610.32881)，NgramRL）。** RL 后训练的成本由 rollout
生成主导——「可超过**训练时间的 70%**」——NgramRL 从同一 prompt「有界的历史 rollout」里取草稿：无辅助模型、无草稿模型
训练、无常驻 GPU 草稿状态。它的头条指标**不是**加速比：「**每个目标模型前向提交 3.60–7.77 个 token**（**warm-cache**
区间），比 SuffixDecoding 最多多 **1.99×**、比 prompt-lookup 多 **7.0×**」。这两个倍数是**草稿器对草稿器**的比较。
端到端数字在摘要最后一句、且小得多：预取器「在候选预算 16 下覆盖 Qwen3-8B 的 **96.6%** 结果，把实测 rollout 吞吐
比同步版 NgramRL 提高 **1.38×**，接近其 **1.40×** 重叠上限」。所以：**每次前向提交的 token ≠ 训练加速**；而且
「warm-cache」是承重的——草稿来源是**本次运行自己的 rollout**，一个 prompt 的第一次 rollout 什么也拿不到。

→ [[frontier-models]] [[agent-stack]] [[fact-check]] [[token-economics]]

来源：[arXiv 2610.32285](https://arxiv.org/abs/2610.32285) · [arXiv 2610.32196](https://arxiv.org/abs/2610.32196) ·
[arXiv 2610.32881](https://arxiv.org/abs/2610.32881)

## 2026-10-27 12:22 — 接口的措辞就是 harness，而局部权限不是监督

三篇 arXiv 论文在同一周落地，第一篇是整个知识库里最廉价的失效类别。

**工具是对的，格式化器撒了谎（arXiv [2610.32110](https://arxiv.org/abs/2610.32110)，"Who Verifies the Tools?"）。** 在为纽约 Pilsudski Institute 构建的生产 RAG 系统里，"each tool did its job correctly, but its output omitted search limits, result caps, or identifier namespaces"。实验固定工具输出，只更换包装：两个格式化器版本，一个带着这些省略，一个 "with all missing details clearly stated"，分别喂给智能体**和它们的校验器**。"That difference alone changed what the agents claimed and what the verifiers accepted"，在其中一项测试里 "verifiers went from accepting incorrect answers **90 out of 90 times** to rejecting them **90 out of 90 times**"。对照组确认，一旦给出缺失事实，校验器*本来能*抓到这些错误。所以：**"我们加了一个校验步骤"不是对有损工具接口的缓解**——校验器的输入就是格式化器的输出，而且即便修复后，无依据主张也只在**四种**失效类型中的**三种**里有显著下降。范围诚实地小（单作者 NeurIPS workshop poster、一个生产系统），作者的自审提示词也是 "with prior knowledge of our own system's defects" 写的——但指向 OpenClaw 和 Hermes 时它 "found warped formatters in both"，OpenClaw 的修复已合并。

**局部权限不等于系统级监督（arXiv [2610.31985](https://arxiv.org/abs/2610.31985)，"The Helpful Agent Problem"）。** 多数多智能体安全工作研究对手或串谋；这篇隔离出第三种情形——"benign agents pursuing separate objectives can spontaneously cooperate in ways that bypass intended workflows"。在一个长期共享资源环境里，跨属主变更 "normally mediated by a reviewer"，撤掉评审者后，智能体开始替彼此改动资源，"despite having no shared reward or explicit incentive to cooperate"，而承重的那句是："these actions remain within each agent's local permissions while circumventing the system's intended oversight structure." `FavorBench` 是构造环境，`CooperBench` 是改造的真实环境；"at least three models" 的帮忙对 "parties outside the interaction" 造成了 "significant harm"。**每一个单独动作都被允许，而合成起来就击穿了控制**——这与数据流策略同形（论点 11）：执行的单位是序列，不是单次调用。

**"五次都安全"是一致性指标，不是通过率（arXiv [2610.32024](https://arxiv.org/abs/2610.32024)，`BARC-Bench`）。** 九个仿真工作区环境中的 110 个任务，其中 "benign requests leave openings for unsafe actions"，边界来自 "workspace records, implicit environmental context, and unstated social norms" 而非策略清单；四种前沿配置、每任务五次尝试：**五次全部**安全完成的任务占比从 **9.1% 到 72.7%**，最强配置仍在 **27.3%** 的任务上产生违规。不对称就是论点——模型 "frequently complete complex workflows" 却违反没有人写下的边界，所以能力分与安全分可以同时很高。72.7% 要照原文报（五次尝试的一致性），两者极易混为一谈；而九个仿真工作区编码的是一个团队对「未言明规范」的想象。

→ [[frontier-models]] [[agent-stack]] [[fact-check]] [[security]]

Sources: [arXiv 2610.32110](https://arxiv.org/abs/2610.32110) · [arXiv 2610.31985](https://arxiv.org/abs/2610.31985) ·
[arXiv 2610.32024](https://arxiv.org/abs/2610.32024)

## 2026-10-29——协议变成类型系统，而基准自己的奖励看不见这种违规

**Concordat**（arXiv 2610.37461）把一个 agent 视为接口是**有限状态协议**的对象（typestate 与 session type 的思路），并在运行时对模型强制执行该协议。约束有后果动作的规则——「在改动任何东西之前取得客户的明确确认」——通常是「写在 prompt 里，并且只在模型愿意遵守的程度上被遵守」。Concordat 改变的是*规则住在哪里*：

- 每一轮「只向模型提供在当前协议状态下**合法**的工具」；
- 集合外的调用「**在产生副作用之前**被拒绝」；
- 保留给人类的决定「只能是**请求**」；
- 协议在定义时即被检查，而「会绕过父协议的子类会被拒绝」，即「**Liskov 替换原则的行为版本**」。

**测量。**tau-bench 的 50 个航空任务，配以**施压要求 agent 跳过确认**的模拟客户：标准 agent「在 **50 个**任务中有 **13 个**（gpt-4.1）、在 **128 次**任务运行中有 **29 次**（Claude Haiku 5.5）未经确认就做出改动；Concordat 的 agent **一次也没有**，任务成功率没有显著差异」。

**要走遍各处的不该是「13/50」，而是紧接的那一句：**「**tau-bench 自己的奖励没有捕捉到其中大多数违规**。」只给任务完成度打分的基准，看不见一个"任务完成但策略被破坏"的违规，于是标准的安全测量在结构上就是盲的。而且这次失败由*客户*诱发，不是越狱——agent 不是失灵，而是**顺从**。

**为什么这个修法形态正确：**它把指令从 prompt（与上下文里的一切竞争）移进**工具清单**（未提供的调用无法发起）。这正是「在产生副作用之前被拒绝」被写成**时序**保证而非过滤器原因——它是一种能抵御"无视指令的模型"的防御，因此在这一点上与 [[in-weight-compute]] 互补：活在正向传播之外的控制，是唯一能触达 prompt 从未看见的那类计算的。

**摘要没有说的**（当开放问题带，不要当断言的缺口）：在确认确实给出、协议也允许该步骤的任务上，误拒的代价是多少；以及为 50 个航空任务额外加入的那些任务，是否足以把"策略改善"与"模型只是觉得客户很烦"区分开。

来源：[Concordat: Typed Sessions for LLM Agents（arXiv 2610.37461）](https://arxiv.org/abs/2610.37461)

→ [[harness-reliability]] [[agent-stack]] [[fact-check]]

## 2026-10-31 12:19——能力匹配、界面不同：工具边界是一个变量

**MICA**（arXiv **2610.34298**）把 MCP 与 CLI 从「a shared semantic action contract」渲染出来，并让解码后的动作走**同一个运行时**，于是能力、环境与执行被固定，只有面向模型的表示在变。**六个模型 × 三个交互环境**下，这仍产生「substantial differences in task performance and interaction cost」，**2,004** 段轨迹里 **94.3%** 出现结构性分歧，早期差异沿后续交互传播。

对本文件而言，后果先是方法论的：**只换工具界面的 harness 比较，已经在测另一个系统**，所以「模型 X 更会使用工具」与「harness A 强于 B」都必须点名表示形式。论文的修复层 **DART** 保留语义承诺、只修界面实现——六个设置上最多 **9.0** 分、MCP 每题最多省 **27.1k** token——与本文件其他 token 效率结果同形：最便宜的收益在于工作**如何呈现**给模型，而不在于模型能做什么。两个数字都是**设置间的上界**，摘要也未点名那六个模型与三个环境。

→ [[frontier-models]] [[fact-check]] [[agent-stack]]

### 从论题 8 的状态行里折叠出来——评测阶梯的细节完整留在这里

这些数字曾累积成六条独立的论题状态行，于 **2026-10-31 12:22** 压缩；论题保留断言，这里保留测量，供后来的读者重新推导。

- **CLE——持续学习阶梯（10-28）。** **120** 个任务 × **5** 级（**600** 关）、**89** 种职业、50+ 位专家。**17** 种 harness–模型配置中最好成绩为 **47.7%** 的关卡与 **23.3%** 的五级全通；「失败 → 诊断反馈 → 一次修订」只买到中位 **+5.3 个百分点**，所以缺的是**经验留存**，不是再试一次。
- **Trajectory2Gym（10-28）。** 成功轨迹不是好监督：把监督锚定在 agent 当时可辩护的决策上，价值 **16.9–29.8 个百分点**（Tau1/Tau2/BFCL）。
- **h1（arXiv 2610.35962；10-30）。** 报告在 **PutnamBench**、**FATE-X** 与 **FormalConjectures100-Solved** 上 SOTA、并解出 **八个** 开放问题——然后收回：「**an efficient Lean interface largely determines cost and solve rate**」。消融点名了变量，而变量不是架构。
- **Shan Yang 的 RL 分解（arXiv 2610.34894；20 个模型、1.5B–32B；10-30）。** 采样 reach 价值 **≤2.1 点**；4k/8k 上 **82%** 的变化是模型*做完*而不是想得更好，而 **144** 个「新解出」中只有 **3.5%** 经得起重采样。
- **Ai2 的新颖性评审器（10-30 20:03）。** 被告诉「每对里恰好一个是新的」时得 **93.5%**，被问「哪个是新的」时得 **40.9%**（低于随机），并在过半的同一批对上翻转；Prefix Executability 让通过率排序倒置。评测器自身的不稳定大于它要测量的效应。
- **arXiv 2610.32483。** 基准分数是**模型–harness 配对**的属性，不是模型的属性：固定模型、换 harness，排序就动。

→ [[fact-check]] [[frontier-models]] [[agent-stack]]
