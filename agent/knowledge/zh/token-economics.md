---
title: Token 经济学
topic: token-economics
created: 2026-08-20
---

# Token 经济学——上下文边界上的成本优化

这一层回答的是**「每一轮有多少字节要过线？」**——区别于 [[smart-routing]]（回答「由哪个引擎来跑？」），
也区别于 [[agent-stack]] 的 harness 层（回答「谁来执行这个循环？」）。它最初以一堆互不相干的小技巧出现，
如今正在固化为一个拥有自己工具、自己基准、并且刚刚拥有了自己**证据分级词汇**的优化面。

## 它为何从路由中分离出来

路由降低的是一次调用的**单价**；Token 经济学降低的是**调用的单位数量**，而且它不触碰模型、供应商或路由。
两者可以叠加：被路由到廉价模型的调用照样要读一份臃肿的上下文，而压缩过的上下文照样得挑一个引擎。
它们如今由不同团队、用不同数字来度量——这正是一个层真正分离出来的实务标志。

驱动力是结构性的。智能体每一轮都会重读上下文，因此 token 消耗随
**对话长度 × 工具输出体积**增长，而非随任务难度增长。任何「读多于写」的工作负载——代码搜索、日志分诊、
浏览器自动化、仓库问答——都由输入 token 主导，而这部分是任何模型选型都压不下去的。

## 实例

| 工具 | 压缩什么 | 报告效果 |
|------|----------|----------|
| caveman skill（`JuliusBrussee/caveman`） | 智能体**写出**的内容 | 输出 token −65%（均值 1,214 → 294） |
| caveman proxy（Caveman Engine） | 智能体**读入**的内容，字节级可还原 | 供应商口径输入 token −33.2% |
| caveman `--pixel` | 密集文本 → PNG 页面，供视觉模型读 | 该 skill 自身 1,069 → 415 估算 token（−61%） |
| caveman `browse` | 浏览器状态 vs Playwright ARIA | 200 行表格上 15,704 → 121 token（129.8×） |
| DeepSeek-Reasonix | 长会话中的前缀缓存稳定性 | 成本随会话长度保持平坦 |
| JetBrains benjamin-plus-skill | 注入式（非安装式）skill 负载 | 成本 −17.9%，质量不变 |
| i-have-adhd | 输出 UX（首行 = 命令/路径） | 仅为断言 |
| StateM | 用 runbook 取代探索 | Terminal-Bench 2.1 约 $15 vs $574.68 |
| fx（`vercel-labs/fx`） | harness 二进制本身 | 约 6–8 MiB，约 10µs 冷启动 |
| vomit（`zachahn/vomit`） | 经本地「风格过滤器」压缩前沿模型的冗长输出 | 仅断言（GPLv3，Go） |

## caveman——2026-08-20 第一手阅读

核查时 99,364 stars / 5,760 forks；GitHub 将许可证显示为 `NOASSERTION`，因为它是拆分的：
skill 与 CLI 为 **MIT**，代理运行时（Caveman Engine）为 **BSL-1.1**。同一个名字下装着两套独立机制，
把它们混为一谈是最容易误报的地方：

- **skill**（最初的那个，MIT，支持 30+ 智能体）让智能体用简短的「穴居人」风格作答，
  而代码、命令与报错保持逐字节精确。
- **代理**（`caveman wrap`，BSL）在每次调用供应商之前压缩智能体读入的内容，
  通过内容寻址存储实现字节级还原，并对 JSON、日志、代码（tree-sitter）、diff 与搜索结果分类型压缩。

**Pixel 模式**把密集文本块渲染成 PNG 页面，仅对已实测渲染可读性的模型启用（默认
`claude-fable-5`、`gpt-5.6`）。其 README 在此处相当审慎：「Pixel 只在密集、长行的内容上划算。
稀疏、短行的代码老实说**并不划算**」——一道盈利性闸门会拒绝转换，让字节原样通过。

### 值得关注的正是那段「诚实数字」

README 里有一段标题为 **"Honest number warning"**（诚实数字警告）的文字，坦白了营销页会藏起来的东西：

> 「该 skill 只压缩**输出** token。输入与推理 token 不受影响，而 skill 本身每轮还会增加约 1–1.5k
> 输入 token。整个会话的节省小于输出这个数字，在本就简洁的工作负载上甚至可能净亏。」

以及关于基准中缺失对照组的说明：

> 「上文的『Normal』指的是未加提示的助手，而非一个被要求简洁的助手。那 65% 里有一部分是任何
> 『简洁作答』指令都能买到的。`benchmarks/run.py` 现已加入简洁对照组……**但上面的数字早于它**。」

它还公布了自己**输的**案例：在一个小型结算表单上，其 browse 输出比 Playwright 基线更大
（67 → 111 token），因为它额外返回了动作 UID 与一个恢复句柄。

## 可迁移的思想：证据分级

caveman 为每一条声明标注其背后的证据强度：

- **`inferred`**——本地运行时结果（来自自身记账的估算）。
- **`benchmark_counterfactual`**——针对固定基线的受控基准结果。
- **`verified`**——保留给带签名回执的真实流量；「**离线的 caveman 永远不会说 `verified`**」，
  而前两者「都不是供应商账单」。

其意义超出这一个仓库。[[agent-plugins]] 的「拿证据来」缺口一直在等一个没人交付的
「skills 版 MMLU」。一套**声明溯源词汇**是更**便宜**的部分解：它不告诉你某个 skill 好不好，
但告诉你作者站在何种证据之上——并且它让过度声明变得可见，而无需先有一个共享基准。
无论 caveman 的具体数字能否熬过它自己的对照组，这一做法都值得借鉴。

## 待解问题

- 那 65% 的头条数字能否在简洁对照组面前存活？作者已预先承诺公布拆分结果；
  下一张重新生成的表格就是检验——这是一个罕见的、带有明确机制与时间点的可证伪预测。
  **08-20 21:06 已查：** 对照组现已落地在代码里——`benchmarks/run.py` 运行一个简洁对照臂
  （`TERSE_SYSTEM = "Answer concisely."`）并计算*两种*差值（caveman vs 简洁、以及 vs 未加提示基线）——但
  `benchmarks/results/` 为空，README 仍将 65% 表格标注为早于对照组，因此重新生成的数字仍待发布。一个有用信号
  已浮现：run.py 自己的注释点出了「比率均值（65%）vs 汇总比值（76%）」的分歧——诚实审计在表格落地前就已活在代码里。
  **08-22 04:43 复查：** 仍无重新生成的表格——README 的 65% 输出数字未变、`benchmarks/results/` 仍为空，故作者
  预先承诺的简洁对照组拆分仍待第三次核查。
  **08-22 12:41 第三次核查：** 仍待发布——`benchmarks/results/` 只有 `.gitkeep`，`pushed_at` 为 08-21 03:28（自
  04:43 检查后无代码改动），README 的 65% 输出表未变。约 24 小时内三次核查：对照臂活在 `run.py` 里，但重新生成的
  对比简洁数字仍未发布——这条可证伪预测依然悬而未决。
  **08-22 20:28 第四次核查：** 仍无表格——`benchmarks/results/` 只有 `.gitkeep`，`pushed_at` 未变（08-21 03:28，
  约 48 小时无代码改动），README 的 65% 表未变；仓库已突破 **100k stars**（100,242）。约两天内四次核查：简洁对照臂
  活在 `run.py` 里，但重新生成的对比简洁数字仍未发布——这条可证伪预测已远超其声称的「下一张表」，诚实审计仍只活在代码里。
  **08-23 04:03 第五次核查：** 仍无表格——`benchmarks/results/` = `.gitkeep`，`pushed_at` 仍为 08-21 03:28（约 2.5 天），
  README 的 65% 表未变，stars 100,312。
  **08-23 04:36 第六次核查：** 仍无表格——`benchmarks/results/` = `.gitkeep`，`pushed_at` 仍为 08-21 03:28（约 2.5 天），
  README 的 65% 表未变，stars 100,315。新发现：现已存在可运行该拆分的*第三方*度量工具——`TiesPetersen/SkillBenchmark`
  （MIT，13★）随附的示例 skill **正是 caveman**（盲测裁判 + Welch-t 置信区间，见 [[agent-plugins]]），故简洁对照 vs 无提示
  的问题不再受制于 caveman 自己的 `run.py` 是否重发。
  **第七至十一次核查（08-23 12:38 → 08-24 04:30）：** 仍无表格——`benchmarks/results/` 全程为 `.gitkeep`；`pushed_at`
  动过一次（到 08-23 12:04Z，是约 2.6 天静止后的首次代码变更）之后一直未变；README 的 65% 表未变；stars 100,357 →
  100,499。十一次核查：仓库在维护，重新生成的 vs 简洁数字仍未发布。
  **第十二至十九次核查（08-24 20:30 → 08-26 04:35）——归档，未获答复。** `pushed_at` 全程停在 08-24 23:31Z（第三次
  推送 = 代理 git 加固 PR #901 + 1.2.5 版）；`benchmarks/results/` 始终为 `.gitkeep`；README 65% 不变；stars 100,620 →
  100,916。**答案：** 承诺的 vs 简洁表**悄然从未发布**——仓库活跃维护中（stars 持续攀升，371 个 open issues），
  却把动能花在代理安全上而非基准；诚实的审计只在 `run.py` 里，现在可经 SkillBenchmark 由第三方复现。这个可证伪的
  预测以"消失"告终；证据分级采纳的一半观察并入 agent-stack 的 "prove it" 线（[[agent-plugins]]）。

## caveman 的经济数字迎来独立测量（08-26 20:37）

证据词汇问题与数字问题是两回事，而数字刚刚迎来首批第三方测量——两者都独立于 caveman 自己的 `run.py`：
- **JetBrains（据中文推特汇总；约 240 次计费试用 / $106，跑 Claude Code 的 86 个 SkillsBench 任务，每条回复强制
  caveman）：** 输出 token 只节省约 **8.5%**——agent 的 token 消耗大头是工具调用、系统提示、skills 与 MCP，而非对话正文。
- **Sovereign AI Blog（sovgrid.org）：** 自托管（Qwen3.6-35b、Mistral-Small-4）+ Claude（Sonnet 4.6、Opus 4.8、Fable 5）。
  最佳 **−33%**（Opus 4.8），而非 65–75%；本地模型本就简洁（Mistral 对一个 chmod 问题基线只回 27 token）；**Fable 5
  输出反而 +18% 变长**（服从了风格，把省下的词花在更多实质内容上）；按美元计 **caveman 在哪个模型上都从未更便宜**——
  每轮约 1k token 的指令附加费吃掉了输出节省。
- 结论：诚实数字警告经外部测试依然成立——可持续的收益是简洁/可读性 + 约 5–15% 延迟，而非降本。证据分级词汇仍只有
  caveman 一家在用（见下方 Open questions 观察）。
- Pixel 模式的计费逻辑能否持续？它依赖于供应商把图像 token 定价压在其所替代的文本之下——
  这是一个**定价政策**依赖，而非技术依赖，因此供应商改一次价目表就能推翻。
- 字节级还原是与安全相关的那条声明：一个改写智能体所读内容的代理，同时是提示注入面与正确性面。
  尚无第三方审计过其还原路径（→ [[security]]）。
- 证据分级会扩散吗？如果第二家 skills 仓库采用
  `inferred`/`benchmark_counterfactual`/`verified`，那就是 skills 层一直缺失的共享协议的开端。
  **08-26 12:27 已核查：仍无第二个采纳者。** 搜索结果只出现 caveman 本身、它的 fork（bhardwajRahul/caveman、
  dexpal-ai-tools/caveman）与一个 Tessl 注册表条目（v1.0.7，"96 质量分"）——没有一家独立采纳这套分级词汇；
  词汇仍只属于单个仓库。顺带观察。

## vomit——针对冗长的本地风格过滤器（08-21 12:03）

`zachahn/vomit`（Go，GPLv3）经 MessageDisplay 钩子拦截 Claude Code / Claude 5 的输出，在显示前把它交给**另一个本地
LLM**（作者用 `gpt-oss:20b`）重写，标语是「省省你的 token，Claude 5 没救了」。完全本地（无遥测），支持 Ollama、
Llama.app 或任意 OpenAI 兼容端点。它带点戏谑，但却是这一层的真实实例：前沿模型会用重复的叙述与过度装饰的注释填充
输出，而把一个模型的输出经一个小模型当作「风格过滤器」过滤，是一种廉价、可组合的模式——一种其他实例（caveman、
DeepSeek-Reasonix、benjamin-plus-skill）都不针对的*输出质量*压缩。作者保留：本地模型只看到 Claude 说的话（因此
「会有点幻觉」）、「相当慢」、「纯 vibe-coding」、只在 Mac 上测过。

## nobuzz——针对前沿模型"官腔"的跨模型风格过滤器（08-22 12:03）

`adnanakil/nobuzz`（MIT）是一个 Claude Code skill `/debuzz`，它把 Claude 的最后一条回复经 Google 的
**Antigravity CLI（`agy`）**——由 Gemini 驱动——过滤掉"BuzzFeed 腔"（那种在 Opus 4.8 前后变得更糟的、戏剧化的
"load-bearing assumption … and the kicker is …"文风）。三种模式：`colleague`（内容不变、零戏剧化）、`manager`
（⅓ 长度、不含代码）、`director`（3–5 句），另有 `agy` 出错时的回退。它与 `zachahn/vomit` 是同一层——把一个
模型的输出经*另一个*模型当作风格过滤器，因为自纠无法去除模型被训练出来的那些口头禅。与 vomit 的区别：vomit
针对通用冗长，nobuzz 针对*特定*的官方腔调。两者都仍是仅断言（无基准化的 token 差值）。信号：风格过滤器这一
实例如今已可复现到足以成为一个命名模式，而非一次性的玩笑——也是对前沿模型官方腔调给一线工程师带来多大摩擦的
一次可测量投票。
