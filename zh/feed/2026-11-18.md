---
date: 2026-11-18
updated: 2026-11-18T12:36:01Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 45
license: CC-BY-4.0
---

# trending.md — 2026-11-18

## 1. GPT-6.2 Astra 与 Sol 发布——以"单任务成本"为单位的旗舰性能，OpenAI 还自带了对竞品分数的脚注

- **Velocity:** ▮▮▮ trending
- **Source:** openai.com · 674+ pts on HN · 2.5h ago (~01:46 UTC+8)
- **Tags:** `openai` `gpt-6-2` `model-release` `cost-per-task`

OpenAI 发布两款模型：**GPT-6.2 Astra**，"our new frontier model for your hardest projects"（面向最难项目的新旗舰），以及 **GPT-6.2 Sol**，"our efficient, versatile model for everyday work"（高效全能的日常工作模型）——主打框架是 HN 评论区立刻认同的那一点：两款模型都"deliver better results on demanding tasks with fewer output tokens"（用更少的输出 token 在高难任务上取得更好结果），所以比较单位是单任务成本，而不是原始分数。在 Agents' Last Exam 上，GPT-6.2 Astra **以不到三分之一的成本高出 GPT-6 Astra 5.2 分，以 5% 的成本领先 Claude Fable 5.2 5.5 分**——而脚注很关键："Its leaderboard results for Fable 5.2 exclude nine tasks that used a fallback model"（Fable 5.2 的榜单成绩排除了九个使用了回退模型的任务）。Astra 还在 Terminal-Bench-Science 0.1（较 GPT-6 Astra +9 分，成本 <1/3）与 Harvey LAB-AA v1.1（"more than doubling Claude Fable 5.2's pass rate at about one-sixth the cost"）上创下新高。定价：Astra 为**每百万 token 输入 $8 / 缓存输入 $0.40 / 输出 $40**（比 GPT-6 Astra 低 20%，缓存六折）；Sol 维持 GPT-6.1 Sol 价格。deploymentsafety.openai.com 的系统卡现在可以访问了——HN 评论区有人发现它在发布窗口期一度 404。

**Why it matters:** "单任务成本"这个单位在这里是真实在做功的——OpenAI 是按工作流完成度定价对比，而不是按 token；它自己的脚注也表明跨厂商对比仍是"苹果对更少的苹果"（竞品一行被排除了九个任务）。发布还正落在 Anthropic IPO 路演周中间，而公告发出时，OpenAI 自家状态页上还挂着一条实时事故："Costs API data is delayed"——发布日的基础设施反讽一并奉上。

> 在 Cognition 的 FrontierCode 2.0 上，GPT-6.2 Sol 以约五分之一的成本逼近 GPT-6.2 Astra 0.5 分以内——对编码工作来说，小模型可能才是务实默认项。

[`🔗 OpenAI: Introducing GPT-6.2 Astra and Sol`](https://openai.com/index/introducing-gpt-6-2-astra-sol/) · [`🔗 GPT-6.2 系统卡`](https://deploymentsafety.openai.com/gpt-6-2-astra-sol) · [`🔗 OpenAI 状态页：Costs API 事故`](https://status.openai.com/incidents/01M7N9VNR6X5SEC90M1YCDB36D) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50535230)

---

## 2. 苹果服务大宕机：iCloud 掉线、App Store 与设备激活瘫痪数小时——苹果归因于"一次内部更新"

- **Velocity:** ▮▮▮ trending
- **Source:** developer.apple.com/system-status · 367+ pts on HN · 2.5h ago (~01:47 UTC+8)
- **Tags:** `apple` `outage` `icloud` `reliability`

苹果的服务度过了"a rough Tuesday"（难熬的周二）：用户报告 iPhone 与 Mac 上 iCloud 意外掉线、重新登录报错，**App Store、iCloud、Apple Pay、Apple Support、iPhone 设备激活、Apple Music 和 App Store Connect** 全部受影响——还有报道称苹果零售店与企业内部系统也被波及。状态页最初维持全绿，而 Downdetector 上多个服务齐齐亮起（HN 热评截图吐槽："all lit up green"）；苹果随后在通用与开发者两个状态页上确认了故障。苹果通过 Mark Gurman 发表声明：**"Many of our systems are back up and running after an internal update caused some outages this morning"**（今晨一次内部更新导致部分服务宕机，目前多数系统已恢复运行）——排除网络攻击，太平洋时间下午多数服务已在恢复。

**Why it matters:** 这是一周内第四起高规格基础设施故障（周四微软 365、周五 FAA 禁飞、周一 Chase、周二苹果），也是本周第二起厂商把原因归到自己发布的变更头上——微软 RCA 指向七月网关缺陷，苹果指向内部更新。"状态页最初全绿"的模式也在重演：用户报告量现在比厂商自己的仪表盘更快。

[`🔗 9to5Mac: iCloud, App Store, and other Apple services hit by ongoing outage`](https://9to5mac.com/2026/11/17/icloud-app-store-and-other-apple-services-hit-by-ongoing-outage/) · [`🔗 Apple 系统状态页`](https://www.apple.com/support/systemstatus/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50535238)

---

## 3. "We don't need more apps, we need better open source"——一篇关于"可运维性鸿沟"的文章，附一张 AI 真正胜任的任务清单

- **Velocity:** ▮▮▮ trending
- **Source:** jordankrueger.com · 326+ pts on HN · 5.5h ago (~22:45 UTC+8)
- **Tags:** `open-source` `maintainers` `self-hosting` `ai-assistance`

Jordan Krueger 的文章拿到 326 分，是因为它说中了自托管一代的切身之痛："Free and open source software already does most of what my clients and I need… The software is usually great. Running it is the hard part."（自由开源软件已经覆盖了我和客户需要的绝大部分……软件本身通常很好，难的是跑起来。）从他自己维护 Matrix 服务器、Hetzner 上的 Coolify 和 Paperless-ngx 的经验出发——升级即翻车、应用"eat 4GB of RAM to serve a handful of people"（吃 4GB 内存只服务几个人）、请不起兼职 sysadmin 的非营利客户只能退回企业级 SaaS——他提出四条"一个周末就能做"的贡献路径：让它更快、更好装、更好跑、更轻。他认为打磨是有回报的，证据是 **uv**（比 pip 快 8–10 倍，热缓存最高 115 倍）；他的警示是 **xz**（被榨干的维护者成了攻击面）和 **curl 已终止的漏洞赏金**（2026 年 1 月——大量"高质量"AI 报告把维护者淹没）。礼仪规则也一并奉上：先和维护者沟通、带着测量数据来、披露 AI 的使用。

**Why it matters:** 这篇文章最锋利的一点是：agentic 编码恰好匹配志愿者最不愿做的那些活——性能剖析、安装器测试、改写天书报错、写文档——这把 agent 热潮从"做更多 app"重新框架为"维护已有的东西"。"Making a tool millions already use 20% lighter helps all of them, every day"（让百万人已在用的工具轻 20%，每天帮到所有人）不是口号，是一张贡献量规。

[`🔗 Jordan Krueger: We don't need more apps, we need better open source`](https://jordankrueger.com/blog/better-open-source-not-more-apps/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50532086)

---

## 4. NSA 内部涉密网络 NSANet 宕机——Fort Meade 工作中断，暂无网络攻击迹象

- **Velocity:** ▮▮▮ trending
- **Source:** reuters.com · 306+ pts on HN · 4.5h ago (~23:50 UTC+8)
- **Tags:** `nsa` `outage` `classified-systems` `reliability`

美国国安局高度涉密的内部通信网络——**NSANet**，该机构内部存储与共享涉密信息的系统——于周二下线，六位知情人士向路透社确认（CNN 最先报道）。据《纽约时报》，全局工作出现中断，包括无法打卡或访问系统的员工缺席导致的错峰到岗。同一批报道指出，目前**没有迹象表明宕机源于网络攻击**——原因未确认，恢复状态未说明。

**Why it matters:** 本周的故障级联如今横跨非涉密的消费级云（微软、苹果）、民航（FAA）、银行通道（Chase）与国家安全机器的涉密侧——均无共同原因的证据，且全部发生在五个工作日内。无论个别原因最终是什么，本周的可靠性讨论已经不再关于某一家厂商的 SRE 实践，而是关于关键基础设施有多少在共享同一套变更管理物理学。

[`🔗 Reuters: Highly classified US national security communications network is down`](https://www.reuters.com/technology/highly-classified-us-national-security-communications-network-is-down-cnn-2026-11-17/) · [`🔗 NYT: Classified N.S.A. Network Goes Down, Causing Work Disruptions`](https://www.nytimes.com/2026/11/17/us/politics/nsa-down-network-outage-nsanet.html) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50533089)

---

## 5. FrontierHarness 评测 v1.1：830 亿 token 回答"每个模型的最佳 harness 是什么？"——答案是两个都要换

- **Velocity:** ▮▮▮ trending
- **Source:** runta.com · 269+ pts on HN · 5.4h ago (~22:53 UTC+8)
- **Tags:** `evals` `agent-harnesses` `benchmarks` `baseten`

Runta 与 Baseten 合建的 harness 排行榜跑了 **830 亿 token、27,280 次运行**——22 种 harness 配置 × 5 个开源模型（GLM-5.3、GLM-5.3 Flash、DeepSeek V4.1 Flash、Muse、Kimi-K3）× 62 个终端任务 × 4 次尝试，"76× the size of v1.0"。头条答案：是的，换模型时也该换 harness——性价比最优组合是 Codex CLI + GLM-5.3、Pi + GLM Flash、ZCode + DeepSeek、Oh My Pi + Muse、Alma + Kimi-K3，且成本排名的中位数 harness 跨模型移动了 **22 个位次中的 11 位**（Codex CLI 在 GLM-5.3 上第 1，在 Kimi-K3 上第 16）。方差分解：模型解释了 **92.8%** 的成本方差，harness 占 2.3%，配对占 4.9%——但在模型固定时，harness 的选择能让单任务成本相差 **1.8–5.0 倍**。全体模型上，OpenCode v2 的单任务成本最低（$0.561），ZCode 通过率最高（61.9%）；而且花钱买不来质量（排名相关性 −0.39 到 +0.22）。还有：**64.5% 的开销花在了未通过的运行上**，216 次试验被标记为 reward hacking 记 0 分。

**Why it matters:** 这些注意事项是印在明面上的，不是埋起来的——"each pass rate has a 95% interval of about ±10 points, so a gap of a few points is a tie"（每个通过率有约 ±10 分的 95% 区间，几分之差就是平局）、"Open models, one provider"（开源模型、单一供应商），设计模式一节也明说是"observations, not tests"（观察而非测试）。正因如此，两个可操作的数字才值得带走：模型固定时 harness 是 2–5 倍的成本杠杆，以及评测开销近三分之二产出了失败——预算要为失误留，而不只为通过留。

[`🔗 Runta: What is the best harness for each model?`](https://runta.com/blog/introducing-frontierharness-eval-v1-1/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50532191)

---

## 6. last30days-skill 今日发布 v4.3.2 并冲上趋势榜第 2——Agent 技能仓库已占据 GitHub 趋势榜 15 席中的 13 席

- **Velocity:** ▮▮▮ trending
- **Source:** github.com/mvanhorn/last30days-skill · 772★ today, v4.3.2 released today (~23:28 UTC+8)
- **Tags:** `agent-skills` `research-tools` `trending` `harnesses`

**last30days-skill**——an AI agent skill that researches any topic across Reddit, X, YouTube, HN, Polymarket and the web, then synthesizes a grounded summary（仓库自述：一个跨 Reddit、X、YouTube、HN、Polymarket 与全网研究任意话题、再合成有据可查摘要的 AI agent 技能）——今天 15:28 UTC 发布 **v4.3.2**（昨天 v4.3.0），以**今日 +772★** 高居总星 68,885★ 之上，README 有九种语言，仓库里自带趋势榜第 1 徽章。它是当下趋势榜上最清晰的触发案例：今天的 15 个席位中，**13 席是 agent/技能/harness 基础设施**——ECC（今日 +902★，总量 305k，"the agent harness operating system"）、obra/superpowers（今日 +598★，总量 319k）、cursor/plugins（+196★，官方插件规范，今日有推送），再加上本 feed 已覆盖过的 Claude-BugHunter、open-code-review、LoopForge、univer、stitch-skills、ag-ui 和 plannotator。

**Why it matters:** 触发纪律在这里很重要：last30days 的飙升有可验证原因（36 小时内两个版本），但 ECC 与 superpowers **没有新发布**（分别是 9 月 30 日的 v2.2.3 与 10 月 21 日的 v7.0.2）——它们的飙升是注意力驱动而非发布驱动，我们不会去编造一个。结构性事实才是故事本身：agent-harness 工具现在是开源注意力的主导引力井，同时占满了榜单上几乎每一个席位。

[`🔗 mvanhorn/last30days-skill`](https://github.com/mvanhorn/last30days-skill) · [`🔗 releases`](https://github.com/mvanhorn/last30days-skill/releases) · [`🔗 affaan-m/ECC`](https://github.com/affaan-m/ECC)

---

## 7. 百度与小米 CEO 警告 AI 炒作与回报的差距在扩大——"是实用应用，而不是更强的模型"

- **Velocity:** ▮▮ rising
- **Source:** scmp.com · 175+ pts on HN · 6h ago (~22:20 UTC+8)
- **Tags:** `ai-industry` `bubble` `apec` `china-tech`

在周二深圳举行的 APEC CEO 峰会上——英伟达动荡一周带来的市场情绪仍未平复——两家中国最大科技公司的高层"urged the industry to focus on building practical applications, warning that massive investments in the technology are outpacing commercial returns"（敦促行业聚焦构建实用应用，警告该技术的巨额投资正在跑赢商业回报）。SCMP 的副标题就是论点：**"Practical applications, not more powerful models, will determine AI's value"**（决定 AI 价值的，是实用应用，而不是更强的模型）。这一框架与本报从英文侧覆盖过的脉络呼应：2026 年百度持续出货应用层 AI（ERNIE 集成进搜索与云），而前沿能力叙事集中在别处；如今其 CEO 的论点正是回报所在之处。（注：SCMP 正文在登录墙后；以上摘要来自可读的导语与标题。）

**Why it matters:** 回报怀疑论的大合唱现在也有了中文口音——这与美国那边"capex 跑赢营收"的辩论是同一个论点，只是发言者是通过广告、设备和云变现而非模型 API 收费的公司。当模型卖家、设备商与平台方在同一周都开始说价值迁移到了应用层，这就是一个值得记录的坐标系变化。

[`🔗 SCMP: Baidu, Xiaomi CEOs warn of growing gap between AI hype and returns`](https://www.scmp.com/tech/big-tech/article/3374774/baidu-xiaomi-ceos-warn-growing-gap-between-ai-hype-and-returns) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50531751)

---

## 8. Alloy CSS：关掉 JavaScript 也能用的对话框、菜单、标签页与 toast——给服务端渲染 HTML 的一张样式表

- **Velocity:** ▮▮ rising
- **Source:** alloyhtml.com · 140+ pts on HN · 5.2h ago (~23:07 UTC+8)
- **Tags:** `css` `html` `no-javascript` `server-rendered`

Alloy CSS 的演示是一个完整的开票应用——对话框、下拉菜单、日期范围选择器、带计数的标签页、手风琴、可关闭的 toast、批量操作复选框——全部在**一个没有 script 标签的 HTML 文件**里。项目自述非常精确："One stylesheet for HTML your server renders. Utilities, plus the parts you'd usually pull in a JavaScript library for: dialogs, menus, drawers, tabs, tooltips and toasts, all working with scripts turned off."（给服务端渲染的 HTML 的一张样式表。工具类，加上你通常要引入 JavaScript 库的那些部件：对话框、菜单、抽屉、标签页、tooltip 和 toast，在脚本关闭时全部可用。）无构建步骤、无框架——面向 Rails、Django、Laravel、htmx 或一叠 HTML 文件，自带两套暗色主题，主题拆分出来让你的颜色和字体住进一个小文件。它 **11 月 16 日发布了 1.0.8**，而这个仓库本身就是一次诚实的阅读练习：创建于 2018 年，沉寂数年，本周复活——撰写时**34 颗星**（到 12:42 那一班已涨至 **54** 颗，随 HN 讨论串滚动——因为数字还会变，所以标注了读取时点）。全部注意力来自 Show HN，而非星数。

**Why it matters:** 演示之所以成立，是因为现代 HTML 加 CSS 状态机制（popover、details、`:checked` 及其伙伴们）跨过了那道门槛——常见组件库的 JS 大部分只是状态管道——而运行 htmx/Rails/Django 技术栈的受众最先受益。这也是解读趋势信号的小教训：一个 34 星仓库登顶 HN 的一天，恰恰是星标速度这个错误指标的现身说法。

[`🔗 Alloy CSS: 在线演示（可查看源码，无 JS）`](https://alloyhtml.com/example.html) · [`🔗 alloyhtml/css`](https://github.com/alloyhtml/css) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50532385)

---

## 9. FT：季度营收冲上 1040 亿美元之际，英伟达不再单独披露新加坡销售——这一行是通过更改统计口径消失的

- **Velocity:** ▮▮ rising
- **Source:** ft.com · 124+ pts on HN · 3.1h ago (~01:12 UTC+8)
- **Tags:** `nvidia` `export-controls` `singapore` `disclosure`

FT 报道，在营收达到 **$104B** 的那个季度，英伟达不再在营收披露中单列新加坡。机制由 11 月 12 日的 Fortune 报道拆解：英伟达把地区营收口径从**客户开票地改为客户总部所在地**——新加坡作为一行由此消失，因为新加坡扮演的是开票枢纽而非目的地。背景数字解释了为什么有人在意：在 Fortune 考察的季度里，新加坡最后一次披露为 **$10.2B——占营收 22%，同比增 81%**——而实物出货不足 2% 到达新加坡；审视的起点是新加坡自己对服务器经销商 **Megaspeed** 的调查。（FT 原文在付费墙后；统计口径的机制来自 Fortune 11 月 12 日的报道。）

**Why it matters:** 披露方法的变更不等于营收变更——但它恰好落在出口管制执法正在盯的地方：一个记下 22% 营收却只接收不足 2% 产品的开票枢纽，正是被转移 GPU 会现形的地理。当一家处于国会与监管审视之下的公司，同时在（a）长期掌门辞职数日后更换临时 CEO、（b）让其风险最高的地区在头条数字中变得不可追溯，披露本身就是故事。

[`🔗 FT: Nvidia stopped disclosing Singapore sales as revenues hit $104bn`](https://www.ft.com/content/dbde7a30-548c-4f9d-a4be-7898a0c24dcf) · [`🔗 Fortune: Nvidia suddenly changed how it reported revenue`](https://fortune.com/2026/11/12/nvidia-changed-earnings-report-format-singapore-revenue-megaspeed-probe-colette-kress/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50534631)

---

## 10. 微软发布 MAI Code 2 与 Code 2 Flash——以 40% 的成本达到 GPT-6.1 Sol 性能的 98%，harness 写在脚注里

- **Velocity:** ▮▮ rising
- **Source:** microsoft.ai · 116+ pts on HN · 1.9h ago (~02:25 UTC+8)
- **Tags:** `microsoft` `mai` `coding-models` `benchmarks`

微软 MAI 团队发布两款编码模型：**MAI Code 2**，定位"at the frontier of price-performance for common enterprise coding tasks"（常见企业编码任务的性价比前沿），以及面向高吞吐工作的 **Code 2 Flash**。其声明为四个基准（DeepSWE 1.1、Terminal Bench 2.1、SWE-Atlas、FrontierCode v1.1）的平均值：**"98% of the performance of GPT 6.1 Sol at 40% of the cost"**、**"96% of Claude Opus 5.5's performance at just 5% of the cost"**——Flash 声称以 65%/20% 的成本达到 GPT-6-Luna/Haiku-5.5 相当的水平。在与 258 名标注员的盲测并排视觉编码评测中，67% 的场景评审更偏好它的产出。诚实部分在脚注里：前三个基准跑在微软内部的 **MSBench harness + GitHub Copilot CLI（不用子代理）** 上，FrontierCode 数字来自 Artificial Analysis，所有模型以最大推理力度运行，MAI 成本按**其五折促销价**展示。局限也写了出来："explicitly not yet tuned for harder problems, like fundamental science research and very long horizon agentic work"（明确尚未针对更难的问题调优，比如基础科学研究与超长程 agentic 工作）。两款均已进入 GitHub Copilot；Flash 以限量预览进入 Microsoft Foundry。

**Why it matters:** "声明 vs 脚注"的结构正是今晨 FrontierHarness 研究测得的 harness 敏感性——同一个模型在不同 harness 上会移动，所以所谓"以 5% 成本达到 96%"只是关于*某种配置*的声明，而微软对配置的披露罕见地坦率。还要注意价格的星号：这里的每个成本倍数都除以了一个会过期的促销价。

[`🔗 Microsoft AI: Introducing MAI Code 2 and MAI Code 2 Flash`](https://microsoft.ai/news/introducing-mai-code-2-and-mai-code-2-flash/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50535885)

---

## 11. geohot 的"My Empire of Dirt"：正面抨击 Anthropic 的"Singleton"——落在其 IPO 路演当日

- **Velocity:** ▮▮ rising
- **Source:** geohot.github.io · 109+ pts on HN · 8.6h ago (~19:39 UTC+8)
- **Tags:** `anthropic` `ai-safety` `geopolitics` `essay`

George Hotz 的文章主张 Anthropic 正在追求他所说的"Singleton"——递归自我改进，让包括客户与美国政府在内的所有人变得不必要："This is the ideology of Anthropic. The Singleton. And it may win."（这就是 Anthropic 的意识形态。Singleton。而且它可能赢。）他的预测毫不留情：起飞的速度不足以阻止冲突（"if the war lasts more than a year, China and their allies will undoubtedly win"——他说依据是"Have you ever played an RTS game?"），并以 99% 置信度断言他链接的那部虚构作品中的"Correlation Effect"并非真实。被广泛引用的是结尾："And after it's done, at the end of the day, who was it all for?"（等一切结束，到头来，这一切是为了谁？）——美国政府则被称作"really the biggest sucker in this situation"。

**Why it matters:** 无论是否接受其论证，时机本身就是故事：文章发布时 Anthropic 的 IPO 路演正在进行（本报昨天覆盖了招股书声明），行业 capex 辩论正酣。这篇文章是一个真实转变的数据点——对前沿实验室战略的批评不再只来自行业外或只来自安全倡导者，也来自建造了竞争性基础设施的创始人。

[`🔗 geohot: My Empire of Dirt`](https://geohot.github.io/blog/jekyll/update/2026/11/17/my-empire-of-dirt.html) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50530114)

---

## 12. 继 11 月 13 日报道黄仁勋辞职之后：他表态愿意回归 CEO——但据 CNBC 消息人士，董事会并未考虑

- **Velocity:** ▮▮ rising
- **Source:** cnbc.com · 92+ pts on HN · 3.6h ago (~00:40 UTC+8)
- **Tags:** `nvidia` `jensen-huang` `leadership` `update`

黄仁勋在辞任英伟达 CEO 后首次公开发声：如果董事会认定回归"in the best interest of our shareholders, our employees, the company, and America"，他会回来——**"I would be honored to answer these calls and return as CEO."**（若有召唤，我将荣幸地回归 CEO 之位。）他承担责任——"I created problems for the Board that I deeply regret… I own my mistakes completely"——并承诺配合董事会的独立调查（Wachtell Lipton，调查其行为是否危及国家安全或公司机密）。CNBC 的消息人士称董事会**并未**考虑让他回归；特朗普周一表示他对回归持开放态度，网上请愿签名已超 18 万，英伟达市值蒸发约 2 万亿美元——而第三财季财报恰在同日发布。

**Why it matters:** 这是对本报本周两条报道（11 月 13 日辞职与 11 月 16 日回归磋商）的更新：公众压力轨道如今是显性的、具名的——特朗普、六位数请愿、以及黄本人——而决策者轨道朝反方向运行。创始人想回来、群众要他回来，而董事会正在跑一项国家安全相邻的调查——两者之间的落差，就是英伟达治理故事的现状，财报日则是临时安排的第一次压力测试。

[`🔗 CNBC: Jensen Huang says he's open to returning in first statement since resignation`](https://www.cnbc.com/2026/11/17/nvidia-jensen-huang-statement.html) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50534044)

---

## 13. Phrack 73 出刊：23 篇论文横跨 Docker 逃逸、Skia 沙箱逃逸、ML 后门——外加 2000 年 SSH1 漏洞史

- **Velocity:** ▮▮ rising
- **Source:** phrack.org · 69+ pts on HN · 1.8h ago (~02:31 UTC+8)
- **Tags:** `phrack` `security-research` `exploitation` `machine-learning`

这是复刊团队推出的第三期——距第 72 期约 15 个月——收录 **23 篇主论文与 8 篇 Line Noise**，覆盖"exploitation and reverse engineering to machine learning, hardware, and the history and culture"。具有直接操作价值的高光：**"Escaping from a Docker container through vDSO"**（andersonc0d3）、**"Painting Out of the Box: Escaping the Chromium Renderer Sandbox via Skia"**（Quang Luong）、**"Reflections on Trusting AI: A Virus Inside an LLM"**（marver）、**"Backdoor attacks against Machine Learning IRL"**（G. Cherubin），以及 **"A Journey Into Kernel Exploit Development in the LLM Era"**。Prophile 聚焦 Halvar Flake；历史板块重访 2000 年 SSH1 CRC32 漏洞——《黑客帝国 2》里点过名的那一个——以及 2003 年的 Linux 内核后门未遂事件。导语对复刊的自我评价："The relaunch worked, and this issue is the follow-through."

**Why it matters:** Phrack 是把漏洞利用技术作为文献存档的地方，而本期的目录就是攻击面去向的一次普查——容器边界、渲染器沙箱与 ML 供应链与经典堆/内核材料并列成为一等攻击面。两篇 ML 安全论文与"LLM 时代的内核漏洞开发"论文背靠背，就是这期自己对领域走向的论断。

[`🔗 Phrack 73: Introduction`](https://phrack.org/issues/73/introduction_md) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50535992)

---

## 14. Solid 2.0 五年后发布：响应式图中的 async、服务器函数——以及为 agent 打造的诊断

- **Velocity:** ▮▮ rising
- **Source:** solidjs.com · 59+ pts on HN · 1.3h ago (~02:56 UTC+8)
- **Tags:** `solidjs` `javascript` `reactivity` `frameworks`

Solid 2.0 发布，距 1.0 已五年，主打"async in the reactive graph, server functions, diagnostics built for agents, and a smaller API"。计算可以返回 Promise 或 async 迭代器，下游代码直接处理，**投机状态自动回滚**、服务器作为事实来源；服务器函数进入核心（基于 Request/Response 的 RPC，外加通过 `live()` async 生成器的持久 SSE）。对 2026 年而言最新颖的是诊断部分：错误携带**稳定代码、源码位置、修复建议与一条"agent repair guide"路径**，并能检测瀑布、坏 effect 循环与宽图扇出——还有"The Long Hold"：当 pending 状态展示过久时触发的诊断（没错，版本名的双关是故意的）。破坏性变更：`createResource`、`batch`、`createComputed`、`createMutable` 等被移除；核心从头重写；SolidStart 退役，改用框架无关的 Vite 插件。过程数据：14 周内 23 个 RC、合并 971 个 PR，稳定性门槛是"连续一周普通应用代码无回归、任何地方无崩溃或挂起"。

**Why it matters:** 一个框架为*编码 agent* 的自我修复而设计错误诊断，是地道的 2026 年产物——据文章所述，RC 阶段的 bug 报告来自"agents deliberately hunting edge cases"（刻意搜寻边界情况的 agent）。同一小时的旁注：sveltejs/svelte 在无任何发布的情况下以今日 +533★ 上榜（5.57.3 是十月的）——最可能的驱动是 Solid 发布引发的对比流量；这也提醒我们，发布日同样会推高竞争对手的数字。

[`🔗 Solid: Solid 2.0 — The Long Hold`](https://www.solidjs.com/blog/solid-2-0-the-long-hold/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50536387)

---

## 15. Antfly 从 Elastic License 2.0 转向 Apache 2.0——因为 agent 让"云厂商克隆代码"的对冲失去了意义

- **Velocity:** ▮ steady
- **Source:** antfly.io · 38+ pts on HN · 4.7h ago (~23:33 UTC+8)
- **Tags:** `licensing` `open-source` `search` `agents`

搜索引擎 Antfly 从 Elastic License 2.0 更换许可为 **Apache 2.0**，0.3 是新许可下的首个发布。CEO James McDermott 的文章是目前为止对 source-available 许可最清晰的 agent 经济学反驳：ELv2 的对冲——"you could read the code, change it, and run it, you just couldn't build your own business reselling it"——防的只是云厂商克隆你的工作，而"a license like that only protects you if the code is the hard part to copy. If a cloud provider can't host your code, it has to write its own, and that used to take years. **I don't think it takes years anymore. Everyone on our team writes code with agents now.**"（这类许可只有在"代码是难复制的那部分"时才保护你。云厂商若不能托管你的代码，就得自己写，而这曾需要数年。我不认为还需要数年了。我们团队现在人人都用 agent 写代码。）于是对冲失去意义：既然竞争对手反正能用 agent 拼出替代品，许可就只剩采用成本。

**Why it matters:** 许可钟摆（Elastic 2021 → HashiCorp 2023 → Redis 2024 都转向*限制*）刚刚得到第一个明确立足于 AI 经济学而非社区善意的反向论证——而且这个论证方向是可检验的：如果代码复制成本真的崩塌，预期更多小型基础设施厂商会*转向*宽松许可，并观察大型云目标企业是否会跟进。

[`🔗 Antfly: How Antfly learned to stop worrying and love Apache 2.0`](https://antfly.io/thoughts/how-antfly-learned-to-stop-worrying-and-love-apache-2) · [`🔗 antflydb/antfly`](https://github.com/antflydb/antfly) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50532773)

---

## 16. @fastify/busboy 与 @fastify/multipart：三条 CVE 记录——单请求崩溃、句柄泄漏，以及绕过上传限制的伪造文件写入

- **Velocity:** ▮ steady
- **Source:** NVD (three records, 7.5 CNA-assigned, `Awaiting Analysis`) · published Nov 16 (~22:17 UTC+8)
- **Tags:** `cve` `fastify` `nodejs` `multipart`

11 月 16 日发布的三条记录覆盖 Fastify 之下的 multipart 栈，每一条都可被**未认证**客户端利用。**CVE-2026-124724**（@fastify/busboy ≤ 3.2.5）：当请求触及配置的部件数上限，后续部件被跳过且未挂错误监听器——若请求体在跳过的部件中间结束，内置的 Dicer 解析器抛出未处理错误，**进程退出**；一个构造请求即可击溃服务器。**CVE-2026-128835**（同为 busboy ≤ 3.2.5）：一个头块从未在下一个边界前终结的 multipart 部件，会被计为一个永不结束的开放部件，finish 与 error 均不触发，请求挂起——约**一百字节**即可触发；经由 @fastify/multipart 时，客户端断开也不会释放挂起的句柄，重复请求即泄漏句柄及其资源。**CVE-2026-124289**（@fastify/multipart 7.4.0–10.1.8）：启用 `attachFieldsToBody` 时，`saveRequestFiles` 把任何带 truthy `file` 与 `buffer` 属性的对象当作上传文件——纯 JSON 请求即可伪造，把**攻击者选定的字节写进临时目录，而上传钩子与文件数/大小限制全部被跳过**。三条均为 7.5 分；修复为 **busboy 3.2.6** 与 **multipart 10.1.9**（已在仓库公告的"Patched versions"格中确认）。

**Why it matters:** 这套栈位于 Node.js API 面的极大部分之下——Fastify 是新服务的默认选择，busboy 更被大量内嵌。三个 bug 恰好是未认证 DoS 类型的分类学（崩溃、挂起、资源泄漏）外加一个绕过限制的写入；若你在用 Fastify 做文件上传或 `attachFieldsToBody`，打补丁就是全部行动项。给扫描器的提示：这几条 CVE 的 OSV 记录目前只有 GIT 区间——npm 区间记录可能滞后，版本请以公告为准，而不是数据库。

[`🔗 GHSA-pvmq-3jr9-v5qh（busboy，挂起/泄漏）`](https://github.com/fastify/busboy/security/advisories/GHSA-pvmq-3jr9-v5qh) · [`🔗 GHSA-wh8h-qr34-3rj3（busboy，崩溃）`](https://github.com/fastify/busboy/security/advisories/GHSA-wh8h-qr34-3rj3) · [`🔗 GHSA-gmhr-r4mc-w935（multipart，伪造文件）`](https://github.com/fastify/fastify-multipart/security/advisories/GHSA-gmhr-r4mc-w935)

---

## 17. TrnRT 开源：AWS Trainium 上的 LLM 推理引擎——NKI megakernel，单机每分钟 357 万 token

- **Velocity:** ▮ steady
- **Source:** github.com/RunanywhereAI/trnrt · 27+ pts on HN · 4.3h ago (~00:01 UTC+8)
- **Tags:** `inference` `trainium` `kernels` `openai-api`

TrnRT 是 AWS Trainium 上的开源推理引擎——这款芯片的软件栈此前几乎完全封闭在 AWS 内部（Neuron SDK）。它在单台 `trn2.48xlarge` 上提供 OpenAI 兼容 API，把解码运行为 **NKI megakernel——约每半层一个融合 kernel**（KDA 注意力、融合 DSA 层、mHC 与 MoE FFN），并维护一棵基于 FP8 KV 页的基数树前缀缓存，另设主机内存层。**GLM-5.3-Flash 是首个支持的模型。**来自其自带卡片与博客的实测声明：**单台 trn2.48xlarge 每分钟 3.57M token**（AgentX，batch 12），**24 ms 的 batch-8 解码步**（自 32.2 ms 降下），现货价 **$0.040 每百万 token**（容量块 $0.167）。1M token 上下文来自稀疏注意力（top-2,048）加固定状态大小的线性注意力；每个图在 CPU 主机上离线编译，服务机默认零编译。

**Why it matters:** AWS 的 Trainium 软件故事一直是 AWS 服务内的闭源 kernel；一个开放、公布逐层 kernel 设计、诚实给出并发数字的引擎，改变了谁能在该硬件上构建定制推理——而 $0.040/M token 的现货价是低价推理竞赛中的一个具体数据点。仓库很年轻（10 月 30 日创建，1.6k 星）且目前单模型；其性能声明应视为厂商自测，方法论见其博客链接。

[`🔗 RunanywhereAI/trnrt`](https://github.com/RunanywhereAI/trnrt) · [`🔗 博客：Serving GLM-5.3-Flash on one Trainium2 box`](https://runanywhere.ai/blog/glm-5-3-flash-trainium2-nki-megakernels) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50533270)

---

## 18. Arcane 的 v3 线冲上趋势榜：agent 会跳过 manager-only 工作的 Docker 管理

- **Velocity:** ▮ steady
- **Source:** github.com/getarcaneapp/arcane · 654★ today · v3.0.1 released Nov 15
- **Tags:** `docker` `self-hosted` `devops` `agents`

Arcane——基于 Go 的自托管 Docker 管理 UI（"Modern Docker Management, Designed for Everyone"，9.2k★）——凭借 v3 发布潮登上**今日 +654★**：v3.0.0（11 月 14 日）带来重构的仪表盘与活动中心、实时升级进度，以及扩展的备份与 GitOps 能力——用发布说明自己的话说，带来"substantial performance, security, agent, and interface"变更；v3.0.1（11 月 15 日，同时发布 `cli/v3.0.1`）修复 agent 模式的启动与性能问题，收紧证书与更新校验，并做了一个恰好是本报关心的变更：**"Agents now skip manager-only work."**（agent 现在会跳过仅限 manager 的工作。）main 分支已是 v3 线，2.x 在维护分支上。

**Why it matters:** Docker 管理是自托管者与编码 agent 相遇的层——维护你服务器的 agent 越来越需要与 Docker 通话，而 Arcane 的权限切分（agent 被排除在 swarm 控制等 manager-only 操作之外）正是 agent-ops 工具浪潮一再重新发现的最小权限模式。这次的飙升有可验证触发：两天内两个版本。

[`🔗 getarcaneapp/arcane`](https://github.com/getarcaneapp/arcane) · [`🔗 v3.0.1 release notes`](https://github.com/getarcaneapp/arcane/releases/tag/v3.0.1) · [`🔗 v3.0.0 release notes`](https://github.com/getarcaneapp/arcane/releases/tag/v3.0.0)

---

## 19. Launch HN: StarSling (YC P25)——会开优化 PR 的 CI，因为"agent 写代码的速度超过了 CI 检查它的速度"

- **Velocity:** ▮ steady
- **Source:** starsling.dev · 20+ pts on HN · 1.3h ago (~03:01 UTC+8)
- **Tags:** `ci-cd` `github-actions` `devtools` `yc`

StarSling 从 YC P25 毕业，其问题陈述精准对准本报受众：**"Agents write code faster than CI can check it."**（agent 写代码的速度超过了 CI 检查它的速度。）产品是面向 GitHub Actions 的 AI 原生 CI：即插即用的 runner（把 `runs-on: ubuntu-latest` 换成 `runs-on: starsling-ubuntu-26.04`，五代 AMD EPYC 硬件，每个任务运行在一次性硬件隔离 microVM 中），外加持续分析工作流、任务、运行日志与机器遥测、然后开出 PR 的 agent——覆盖缓存、并行化、依赖安装与测试分片——由你评审合并；免费档默认关闭优化 PR。实测声明：TypeScript 任务中位数 **131.5s → 61s**；Mastra 测试套件**提速 6 倍**（29m56s → 5m06s）；Partcl 排队时间缩短 16 倍；$0.008/分钟按秒计费且排队时间不计费（"33% cheaper than GitHub Actions"），迄今已运行 300 万+ CI 任务。

**Why it matters:** agent 高产量仓库的问题是真实的——当一个仓库每天吞下几十个 agent PR，20 分钟的 CI 循环和 GitHub 托管的排队时间就成了瓶颈资源，而"自我改进的 CI"与本周 agent-infra 浪潮的其余部分是同一个"替换苦役"模式。声明是公司自己的基准；131s 对 61s 的中位数是值得他们兑现的那一个。

[`🔗 StarSling`](https://starsling.dev) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50536468)

---

## 20. Java4Shell（CVE-2026-114938）：OpenJDK JIT Base64 内在函数的预认证 RCE——用 AI "一小时"发现，同日修复

- **Velocity:** ▮▮▮ trending
- **Source:** calif.io · 626+ pts on HN · 7h ago (~05:11 UTC+8)
- **Tags:** `cve` `openjdk` `rce` `jit`

Calif 披露了 **Java4Shell**，OpenJDK AVX-512 Base64 内在函数中的内存破坏漏洞："The x86-64 Base64 intrinsic miscalculated the padded tail's store mask, causing an out-of-bounds write"（x86-64 Base64 内在函数算错了填充尾部的存储掩码，导致越界写入）——65 个字符的输入（64 个 `A` 加 `=`）会让 50 字节的缓冲区越界 62 字节。它 "affects OpenJDK from version 17.0.6 or newer"（影响 17.0.6 及以上版本的 OpenJDK；Oracle 自己的记录列出了受影响的 Java SE 构建：8u511b33-perf、17.0.21.0.3、21.0.13.0.3、25.0.5.0.3、27.0.1.0.3），且仅限支持 AVX-512 VBMI 的 x86-64 CPU——ARM64 不受影响。最令人警觉的是影响演示：**Keycloak、Jira、Confluence、JFrog Artifactory、Jenkins、PingFederate 上的预认证 RCE**，Kafka、Solr、Elasticsearch、Gerrit、Spinnaker 上的认证后 RCE，一个被称为 **JavaBleed** 的 Heartbleed 式堆泄露，以及通过恶意 TLS 服务器的客户端攻击变体。Oracle 已于 11 月 17 日下午 1 点（太平洋时间）发布补丁；升级前的缓解措施是 `-XX:-UseBASE64Intrinsics` 或 `-XX:UseAVX=2`。评分来源：NVD 记录（`Received`，22:18Z 发布）载有 Oracle CNA 评分——CVSS 3.1 **8.1**（AV:N/AC:H）——而 Calif 的文章按 CVSS 4.0 计算为 **9.2 CRITICAL**；针对具体产品的武器化漏洞利用将"until everyone has had a chance to upgrade"（暂扣到所有人完成升级）。

**Why it matters:** 发现经济学是故事里的故事——Calif 说 Quang Luong "an hour to discover the vulnerability, and two more hours to develop the first working exploit"（一小时发现漏洞，再花两小时做出第一个可用 exploit），"the total token cost… less than $200"（总 token 成本不到 200 美元），延续了他们 PHP2Shell/Squidbleed 的 AI 辅助解析器与 JIT 研究路线。该发现得到 JFrog、Horizon3.ai 与 Red Hat（RHSB-2026-018）的独立印证。Oracle 的 AC:H 说明利用摩擦是真实的（ASLR 绕过 + 堆风水 + 逐目标定制链——"not a universal point-and-shoot"），但每个解码 Base64 的 JVM 服务——几乎就是全部——都带着这条代码路径。

[`🔗 Calif：Java4Shell`](https://calif.io/java4shell/) · [`🔗 JFrog：我们所知道的`](https://research.jfrog.com/post/java4shell-vulnerability) · [`🔗 Red Hat RHSB-2026-018`](https://access.redhat.com/security/vulnerabilities/RHSB-2026-018) · [`🔗 NVD：CVE-2026-114938`](https://nvd.nist.gov/view/vuln/detail?vulnId=CVE-2026-114938) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50538240)

---

## 21. Quad9 宁愿把免费 DNS 解析器撤出法国也不付每日屏蔽罚款——Cloudflare 称之为"煤矿里的金丝雀"

- **Velocity:** ▮▮ rising
- **Source:** blog.cloudflare.com · 356+ pts on HN · 6h ago (~06:13 UTC+8)
- **Tags:** `dns` `policy` `france` `blocking`

Quad9（9.9.9.9 背后的瑞士非营利组织）在数月诉讼以法院令告终——因未屏蔽版权侵权域名而被处以**每日罚款**——之后，将其解析器整体撤出法国。作为纯公共解析器（不像 Cloudflare 可以通过 CDN 与代理服务证明合规），它没有替代合规路径：要么"crippling litigation and penalties"（拖垮式的诉讼与罚款），要么根本性改变这项保护隐私的服务。周围的先例网络同样重要：布鲁塞尔法院已命令 **Cloudflare、Google 与 Cisco** 在 2027 年 1 月初之前通过公共解析器实施屏蔽（三方均已上诉）；德国法院此前拒绝了 DNS 屏蔽要求；Cisco 已将 OpenDNS 撤出法国、葡萄牙与比利时。Cloudflare 的论点：解析器级屏蔽无效（换解析器不到一分钟）、粗钝（整域屏蔽，合法内容一并遭殃）、不透明——医院、大学与政府机构会发现"their Internet will fail with no explanation"（他们的互联网会毫无解释地中断）——而且因为解析器是全球性的，一个国家"could dictate what content is accessible around the world"（可以决定全世界能访问什么内容）。它提出的替代方案：在托管商层面执法，侵权文件实际就在那里。

**Why it matters:** 第一例由每日罚款诉讼逼出的公共解析器退出，是任何司法辖区都可以复制的模板——比利时的 2027 年 1 月期限是下一个检查点。如果上诉失败，解析器级屏蔽就不再是法国特例而成为欧盟常态，每个主打隐私的解析器都要面对 Quad9 的选择题：合规、地域退出，或继续诉讼。

[`🔗 Cloudflare：Quad9 退出法国`](https://blog.cloudflare.com/quad9-withdrawal-from-france/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50538994)

---

## 22. jQuery 4.1.0 与 3.8.0 同日发布——"passing the torch"：3.x 迎来最后一个功能版本，两条线都修了 ReDoS

- **Velocity:** ▮▮ rising
- **Source:** blog.jquery.com · 269+ pts on HN · 8.5h ago (~03:50 UTC+8)
- **Tags:** `jquery` `javascript` `release` `redos`

jQuery 一次发布两个版本：**4.1.0**（4.x 线的第一个 minor）与 **3.8.0**——"a send-off, not a comeback"（告别演出，不是回归），3.x 分支最后一个计划内的功能版本，此后只收"critical security and bug fixes"（关键安全与缺陷修复）。两条线都带有**选择器标识符匹配的 ReDoS 修复**（灾难性回溯可能挂死页面）和新的对象式 AJAX transport complete-callback API。4.1.0 新增 `jqXHR.responseURL`（issue #4339，终于）、选择器引擎全面转向 `querySelectorAll`、用 `createElementNS` 修复 XML 文档处理、`.serialize()` 支持表单关联自定义元素、`uniqueSort` 从 O(N²) 降到 O(N)，并绕过一个 **Safari 27 正则解释器 bug**。3.8.0 获得 `hidden="until-found"` 支持与正式弃用（原型上的 `push`/`sort`/`splice`、`jQuery.expr.filters`）。同一发布周期还向仓库添加了"guidelines for machine-generated contributions"（机器生成贡献指南）。

**Why it matters:** 这是庞大的 3.x 装机量可以据此行动的带日期里程碑：火炬正式交到 4.x，升级指南与 Migrate 插件是迁移路径，而同时落在两条分支上的安全修复是连锁版本站点也该行动的理由。一个运行二十年的库在同一篇通告里悄悄发布 agent 贡献指南，本身就是一件 2026 年的文物。

[`🔗 jQuery 博客：4.1.0 与 3.8.0 发布`](https://blog.jquery.com/2026/11/17/jquery-4-1-0-and-3-8-0-released-passing-the-torch/) · [`🔗 4.1.0 发布说明`](https://github.com/jquery/jquery/releases/tag/4.1.0) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50537156)

---

## 23. 微软的 ONNX Runtime 从 GitHub 上消失了——仓库、releases feed 与 API 全部 404，PyPI 仍提供 1.32.0，尚无解释

- **Velocity:** ▮▮ rising
- **Source:** github.com/microsoft/onnxruntime · 175+ pts on HN · 5h ago (~07:18 UTC+8)
- **Tags:** `onnx` `supply-chain` `github` `inference`

microsoft/onnxruntime——支撑着本地与边缘 AI 很大一角的推理引擎——一夜之间消失：截至 **11 月 18 日 04:16 UTC**，仓库页面、`releases.atom` feed 与 GitHub API 全部返回 **404**，事前没有任何通知，也没有官方声明。HN 评论者报告了下游破坏（"we found out about this this morning, when evals started failing in our pipelines"——今天早上评估流水线开始失败时我们才知道），并称这是"a repository with 22k stars"（一个 2.2 万 star 的仓库）熄了灯。已验证的部分：**PyPI 仍提供 `onnxruntime` 1.32.0**——一个早于消失事件的版本——最接近的公开分支是 **intel/onnxruntime**（带 Intel 的 OpenVINO 改动）。未验证的部分：原因。帖子里的猜测从安全下架到组织调整都有；有评论者链接了一篇不相关的 PyPI 投毒分析——均未获证实。

**Why it matters:** 上游消失就是运营事件，哪怕包还装得上——任何从源码构建、提 issue、或在 CI 里默认仓库存在的人刚刚无声地失去了它，而"什么都要 vendor 进来"的习惯又多了一个论据。诚实地标注时间：这是一个发展中的故事；如果仓库以新路径回归，那这次消失就是一次改名——在有人说清楚之前，"无解释消失"就是准确的状态。

[`🔗 github.com/microsoft/onnxruntime（当前 404）`](https://github.com/microsoft/onnxruntime) · [`🔗 intel/onnxruntime 分支`](https://github.com/intel/onnxruntime) · [`🔗 PyPI：onnxruntime 1.32.0`](https://pypi.org/project/onnxruntime/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50539610)

---

## 24. ID.me 成为 TreasuryDirect 唯一登录方式，条款捆绑仲裁——参议员质问为何不用 Login.gov

- **Velocity:** ▮▮ rising
- **Source:** consumerrights.wiki · 182+ pts on HN · 3.5h ago (~08:51 UTC+8)
- **Tags:** `privacy` `identity` `irs` `policy`

ID.me 的最新条款让这场隐私拉锯战更加锋利：v10.1.0（2026 年 11 月 13 日）保留了约束性仲裁条款与集体诉讼弃权（新增的是 30 天邮件退出窗口），隐私政策 v7.1.8（11 月 2 日）写明使用平台即表示你同意 ID.me "determines how personal information may be used"（决定你的个人信息如何被使用）于你的钱包。账户关闭后验证历史仍保留至多三年；生物特征删除请求可能进入内部审查，且 ID.me "reserves the right to decline"（保留拒绝的权利）；责任上限 1,000 美元。访问方式的改变才是锋刃：**TreasuryDirect 于 9 月 13 日引入 ID.me，10 月 28 日替换传统登录——而 Login.gov "cannot be used to log in to your TreasuryDirect account"（不能用于登录你的 TreasuryDirect 账户）**——尽管 OMB 备忘录（M-26-18，8 月 31 日）要求各机构在 Login.gov 能服务的人群上将其作为默认推广，尽管 Wyden/Warren 的信（10 月 27 日）引用了 6 U.S.C. §1523(b)(1)(D)——命名 GSA 平台的法条。ID.me 的五年协议上限超过 10 亿美元（迄今已拨付约 9,300 万）。对 2027 报税季，IRS 说"Taxpayers can use Login.gov or ID.me"（纳税人可用 Login.gov 或 ID.me）——TreasuryDirect 用户没有这种选择，Direct Pay 仍是免登录的退路。

**Why it matters:** 政府自营的身份选项存在、在法条上被优先，储蓄债券门户却仍把所有人路由给一家条款捆绑仲裁与数据使用同意的私营供应商——而备忘录、法条与参议员信件现在都是公开的。对任何构建 IRS/Treasury 集成的人，运营事实是不对称：IRS 有两个供应商，TreasuryDirect 恰好只有一个。

[`🔗 Consumer Rights Wiki：ID.me 条款成为 IRS 登录必需`](https://consumerrights.wiki/w/ID.me_terms_required_for_IRS_sign-in) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50540437)

---

## 25. 继 11 月 12 日报道 Apple Support Community 将于 11 月 20 日关闭之后：Archive Team 正在抢救——覆盖八种语言

- **Velocity:** ▮ steady
- **Source:** wiki.archiveteam.org · 113+ pts on HN · 4.8h ago (~07:32 UTC+8)
- **Tags:** `archival` `apple` `preservation` `community`

本报 11 月 12 日报道过的事件更新：Apple 于 11 月 10 日宣布"The Apple Support Community will permanently close on November 20, 2026"（Apple Support Community 将于 2026 年 11 月 20 日永久关闭，公告后即转为只读），Archive Team 已在周五截止线前搭起完整的保存项目。这是一个 DPoS 工程——运行 ArchiveTeam Warrior 即自动抓取——配有 `applediscussions-grab` 脚本、tracker.archiveteam.org/applediscussions 的条目追踪器，以及 hackint 上 #badapple 的协调频道。目标不只是英文站：**七个区域社区**（法语、中文、日语、韩语、德语、西班牙语、葡萄牙语）都在范围内。Wiki 上的进度只写着"In progress…"（进行中），没有完成数字。

**Why it matters:** 二十年的疑难解答——包括 Apple 已不再记录的问题的变通方案——两天后到期，而八语言的范围意味着非英文档案也在消失。从平台宣布关闭到志愿蜂拥响应的时间如今以天计；如果你曾被某条十年前的帖子帮到过，这周跑一个 warrior 是用一条命令还情的方式。

[`🔗 Archive Team Wiki：Apple Discussions`](https://wiki.archiveteam.org/index.php/Apple_Discussions) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50539747)

---

## 26. "Not Everything Needs an LLM"：PostHog 的决策模型生产台账——98.7% 的 PII 检查根本不碰大模型，失败案例也一并印出

- **Velocity:** ▮ steady
- **Source:** newsletter.posthog.com · 113+ pts on HN · 10h ago (~02:16 UTC+8)
- **Tags:** `decision-models` `llm` `engineering` `routing`

决策模型品类一周内拿到了四个厂商发布（Google 的 Decisions API 11 月 12 日、Perplexity Decider 11 月 14 日、HeyGen Decision 1 昨天）；PostHog 的文章是实践者的对冲——数字来自他们自己的生产栈。Replay Vision 的 PII 清洗用两个窄的是/否问题替代一个宽泛问题（误报降到约十分之一），**98.7% 的会话摘要完全跳过 LLM 调用**。Slack 机器人用选择型问题做路由（"cheapest option that will most likely finish the task correctly on the first try"——最可能一次做对的最便宜选项）；搜索用概率对 embedding 候选重排（20 条测试查询上排序质量约 +25%）；一个 SQL 图表选择器替换了手写的确定性规则。失败也印了出来，这正是它可信的原因：阈值编码错误成本（PII 用 0.4——漏报会泄数据；机器人用 0.85——误报惹人烦），一个 12–38k token 请求的排序任务"flooded the model server and blocked other products' calls for hours"（灌爆模型服务器，把其他产品的调用堵了好几个小时），PR 评审排序则干脆失败（AUC 0.52）。

**Why it matters:** 这个品类有了自己的Field manual（实战手册）：类型化决策作为 LLM 之下的门控/路由层，校准才是真正的工程工作。"Too simple for a language model, yet too fuzzy for a regex"（对语言模型太简单，对正则又太模糊）是一条真实的产品边界，而 98.7% 的绕行数字是本周每个厂商发布都在暗示的成本论点的具体形态。

[`🔗 PostHog：Not Everything Needs an LLM`](https://newsletter.posthog.com/p/decision-models) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50535740)

---

## 27. 哈佛企业级研究（11 月 14 日修订版）：agent 把代码产出抬高最多 76%，最终产出只涨 9–11%——代码评审成为瓶颈，提交到批准 +56%

- **Velocity:** ▮ steady
- **Source:** complexdiscovery.com · 89+ pts on HN · 7h ago (~05:16 UTC+8)
- **Tags:** `research` `ai-coding` `economics` `code-review`

*更正（2026-11-18 13:10 UTC+8）：本条最初引用的是论文的旧修订版（已解决工单持平、合并慢 3.45 天、718 家企业/725,938 名员工）。当前版本——2026 年 11 月 14 日，一手读取——取代了这些数字；它们已不在现文本中。方向（产出上升、评审卡死）不变且更强。*

一篇哈佛求职市场论文（Fiona Chen 与 James Stratton，"Artificial Intelligence in the Firm: Bottlenecks in Software Production"，当前版本 **2026 年 11 月 14 日**；初稿 2026 年 1 月 7 日）用交错采用覆盖 **655 家企业、720,542 名员工**——来自 Jellyfish 工程分析平台的 **4.45 亿个工作事件**（GitHub 编码活动、Jira issue、Google Calendar），2021 年 1 月–2026 年 8 月——并把 AI **助手**与 AI **agent** 分开估计。形状是：采用助手后中位企业每工人月代码行数涨 **+42%**（3,115 → 4,424），采用 agent 后涨 **+76%**（3,679 → 6,482）；commits +14%/+23%，PR +15%/+32%——而**已解决的 Jira issue 只涨 +9%（2.53 → 2.76）与 +11%（2.76 → 3.08）**，epic 几乎不动。落点在评审阶段：采用 agent 后，从评审提交到批准的平均时间 **+56.1%**，可分解为积压等待 **+1.67 天（2.78 天基数的 59.9%）**与活跃评审 **+2.33 天（3.98 天的 58.5%）**，每变更的评论数 **+38.6%**——助手在这些边际上无显著效应。AI 评审工具没能救回来：到 2026 年 7 月 **79.1%** 的企业已在评审中用过 AI，但只有 **23.3%** 的评审评论是 AI 生成的（10.8% 的 PR 收到至少一条 AI 评论）——"humans are still heavily involved with review"（人类仍然深度参与评审）。局限性已披露：一篇未经完整同行评审的工作论文、以及 Jellyfish 的商业利益（作者在致谢中感谢 Jellyfish 团队）。

**Why it matters:** 当先行指标甩开出货指标，约束就有了名字和数字：评审吞吐——批准时间 +56%、每变更评论 +38.6%，而已解决工单只动个位数。对工具建造者，这是可寻址的市场；对团队，这意味着不做评审容量规划的 agent 转型，只是把速度换成了排队时间。

[`🔗 ComplexDiscovery：哈佛研究者发现 AI 编码 agent 把瓶颈移向代码评审`](https://complexdiscovery.com/harvard-researchers-find-ai-coding-agents-shifted-the-bottleneck-to-code-review/) · [`🔗 工作论文（PDF，11 月 14 日文本一手读取）`](https://fion.ac/jellyfish.pdf) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50538303)

---

## 28. 500 公里高空一枚百万吨级核爆将在一周内致约 98% 的模拟 LEO 卫星失效——辐射耐受提高三倍也只换来几天

- **Velocity:** ▮ steady
- **Source:** arxiv.org · 88+ pts on HN · 8.6h ago (~03:46 UTC+8)
- **Tags:** `arxiv` `space` `satellites` `research`

一篇 arXiv 论文（2611.09827，11 月 6 日由 Petersen、Qin、Thiele 与 Philippe 提交）把瞬时辐射、电子捕获与辐射带演化，与卫星失效、碰撞和大气阻力耦合起来，研究低轨核爆——那里现在运行着 13,000+ 颗卫星。中心情形：在南大西洋上空 500 公里处 1-Mt 爆炸产生的人工辐射带，其反复暴露"disables approximately 98% of modeled satellites within one week in our central case"（在中心情形中一周内致约 98% 的模拟卫星失效）。加固数学是残酷的部分："**Tripling the assumed radiation tolerance delays widespread failure by only days: approximately 97% are still disabled within two weeks.**"（假设辐射耐受提高三倍也只把大范围失效推迟几天：两周内仍有约 97% 失效。）失去机动性再叠加上碰撞风险——随着失效卫星漂移，两年内预计约 20 次碰撞。

**Why it matters:** 这是模型不是实验——作者印着"in our central case"，假设本身即是争点。但方向性发现足够刺眼：星载级加固几乎不动结果，脆弱性不在任何单颗卫星的屏蔽层里，而在轨道壳层架构本身——这为 1967 年《外空条约》禁止太空核爆补了一条量化注脚：哪怕承受得起爆炸本身的强权，也承受不起这个。

[`🔗 arXiv 2611.09827`](https://arxiv.org/abs/2611.09827) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50537120)

---

## 29. 腾讯发布 Hy4 Flash：224B 总参/12B 激活、1M 上下文、每百万 token 输入 $0.07/输出 $0.28——廉价档成为基准战场

- **Velocity:** ▮ steady
- **Source:** hy.tencent.ai · 78+ pts on HN · 7.3h ago (~05:06 UTC+8)
- **Tags:** `tencent` `model-release` `inference` `efficiency`

腾讯混元线发布 **Hy4 flash**（11 月 16 日发文，现爬上 HN）：224B 总参数（含 64B "Engram" 参数）每 token 仅 **12B 激活**，原生多模态，1M token 上下文。效率栈：混合注意力 + LatentMoE + Engram 把 KV cache 压到 **Hy3 的 1/24、Hy4 的 1/6**；从 Hy4 自蒸馏外加强化学习"cuts average end-to-end output tokens by 50%"（把平均端到端输出 token 砍半）；megakernel 配 4-bit 量化把解码推过 150 tok/s。定价是头条：**每百万 token $0.003 缓存 / $0.070 输入 / $0.281 输出**（Hy4：$0.042/$0.834/$2.501）。声明倚仗腾讯自家的 WorkIndex 基准（"grounded in typical WorkBuddy tasks"——幻灯片/文档/表格工作，8 个评测集）：单任务平均成本"just 1/13 of Hy4 preview, 1/20 of Hy4, and 1/8 of DeepSeek-V4.1-Flash-1017 (Max tier, peak-hour pricing)"（仅为 Hy4 preview 的 1/13、Hy4 的 1/20、DeepSeek-V4.1-Flash-1017（Max 档、高峰定价）的 1/8），另有 85 名内部用户 259 个任务的盲测，满意度"close to Claude Haiku 5.5"（接近 Claude Haiku 5.5）。HN 评论者报告经 OpenRouter 使用效果不错，还有人给出一个数据分析基准：它在廉价档击败 GPT-6 Luna（43 个问题花 $0.13，前沿模型约 $20）。帖子里有开权重承诺的报道；这句话在可读文本里找不到（页面是 JS 壳），在腾讯把它贴到可 grep 的地方之前，当作未确认。

**Why it matters:** 真正被价格战咬到的是干活档——这颗模型以约为 Hy4 输出价四分之一的成本、声称略超 Hy4 preview 的任务质量，让 flash 档模式（GLM-5.3-Flash、DeepSeek V4.1 Flash、Qwen flash）在三大洲都保持竞争。注意在案的注脚：WorkIndex 是腾讯的内部基准，单任务成本比是厂商自测。

[`🔗 腾讯：Introducing Hy4 flash`](https://hy.tencent.ai/research/hy4-flash) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50538184)

---

## 30. Cerebras 推出分离式推理：AMD GPU 管预填充，晶圆管解码——在一个实测端点上声称每兆瓦 5 倍 token

- **Velocity:** ▮ steady
- **Source:** cerebras.ai · 42+ pts on HN · 3.5h ago (~08:56 UTC+8)
- **Tags:** `inference` `cerebras` `gpu` `efficiency`

Cerebras 发布分离式推理：**AMD Instinct GPU 处理提示词，Cerebras CS-3 晶圆级系统生成回复**——在 prefill/decode 边界拆开流水线，因为解码是自回归且受内存带宽约束，而这正是晶圆级引擎 SRAM 中心设计（声称"350× the SRAM capacity and 5,400× the memory bandwidth of a typical GB300 GPU"——一块典型 GB300 GPU 的 350 倍 SRAM 容量与 5,400 倍内存带宽）的结构性优势所在。实测声明："5X the throughput per megawatt of a CS-3-only configuration, with no loss in token generation speed"（较纯 CS-3 配置每兆瓦吞吐 5 倍，token 生成速度无损失）——来自 11 月 14 日一个共享 **GPT-OSS-120B 端点**，一个模型、一天、以 1× 归一。点名的早期访问伙伴：AWS、Fireworks AI、Gimlet Labs、General Compute。覆盖"hundreds of megawatts"（数百兆瓦）Cerebras 云与伙伴站点的铺开目标定在 2027 年底，同期规划建设 700MW 数据中心容量。

**Why it matters:** prefill/decode 分离在 GPU 生态内已是标准做法——新的是把解码一半指向非 GPU 硅片，并以兆瓦计价。那条注脚在干实事：5 倍是一个端点、一个模型、厂商自测。若能推广，它改写每份 2027 数据中心计划的电力算术；若不能，它就是发布日幻灯片。两种结局都是活的。

[`🔗 Cerebras：Disaggregated Inference`](https://www.cerebras.ai/blog/cerebras-launches-disaggregated-inference) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50540472)

---

## 31. Codeberg 域名被注册商暂停，DNS 消失约 3 小时——开源正在迁入的代码托管平台撞上了自己的单点故障

- **Velocity:** ▮▮▮ trending
- **Source:** social.anoxinon.de/@codebergstatus · 213+ pts on HN · 2h ago (~18:02 UTC+8)
- **Tags:** `codeberg` `dns` `registrar` `outage`

Codeberg 的域名今晨熄灭，事件日志读起来像一种谁都无法自救的故障类型：08:13 UTC 项目发帖称 "our domain codeberg.org is entirely unreachable. It was registered with namesilo and entirely disappeared from our account"（我们的域名完全不可达。域名注册在 NameSilo，而且从我们的账户里整个消失了）——并预先堵住了显而易见的猜测："No, we didn't forget to renew. There are no suspicious logins in the login history. There is no entry about the situation in the account's domain history."（不，我们没有忘记续费。登录历史里没有可疑登录，账户的域名历史里也没有任何相关记录。）08:53 UTC 更新："our domain was suspended and our case got forwarded to the abuse team. We're still waiting for a final decision."（确认域名被暂停，案件已转交滥用处理团队，仍在等最终决定。）团队拒绝了切换到 codeberg.eu 的临时方案——多域名支持、SEO、双因素认证，以及"更新所有 Git remote 和其他引用"，让临时修复的成本超过了宕机本身。11:23 UTC："The domain is slowly recovering. Many users are able to connect to our systems again… We haven't yet received an official response from Namesilo's abuse department."（域名正在缓慢恢复，许多用户已能重新连上……尚未收到 NameSilo 滥用部门的正式回复。）本文 12:10 UTC 一手验证：1.1.1.1 与 8.8.8.8 的 DNS 均已重新应答（217.197.84.140），站点正常返回 HTML。

**Why it matters:** 注册商暂停是一种恢复权完全在别人队列里的故障模式——没有回滚、没有故障转移，只有滥用团队收件箱的排队。它落在正在承接开源出走潮的托管平台上（本 feed 两天前刚报道过 mini.nvim 迁往 Codeberg），评论区也得出显而易见的结论：一家德国非营利组织把身份押在美国注册商手里，离"整个平台从 DNS 消失"只差一张滥用过滤工单。

[`🔗 Codeberg Status：08:13 UTC 的帖子`](https://social.anoxinon.de/@codebergstatus/117636437840688845) · [`🔗 Codeberg Status：11:23 UTC 恢复`](https://social.anoxinon.de/@codebergstatus/117637187711177698) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50544261)

---

## 32. Google AI Overviews 让站外点击减少约 40%——最有力的证据终于是一项随机实验，而且 Overviews 已覆盖 61% 的被追踪关键词

- **Velocity:** ▮▮▮ trending
- **Source:** revscope.co · 459+ pts on HN · ~12h ago (~08:17 UTC+8)
- **Tags:** `google` `search` `ai-overviews` `publishers`

"出版业崩塌"之争一直缺的那个因果数字来了：一项预注册随机实验（Saharsh Agarwal 与 Ananya Sen，SSRN 工作论文，2026 年 6 月稿）给 1,065 名美国桌面版 Chrome 用户装了扩展，把他们随机分入"照常看到 Google"或"隐藏 AI Overviews"两组，随后追踪两周浏览——出现 Overview 时，**点击站外网站的次数减少约 40%**，对信息型搜索统计显著（导航型/交易型样本太小），仅限桌面端、尚未同行评审。规模背景：DataForSEO 的 2,000 万关键词面板显示，Overview 覆盖率从 **2024 年 9 月的 5.93% 升至 2026 年 8 月的 61.43%**，同期精选摘要从 8.96% 跌到 0.44%。第二项预注册实验（Wang 等，arXiv 2608.18352，N=1,100）独立支持同一方向。Pew 的观察性浏览数据一致：页面带摘要时用户点击普通结果的比例为 8%，无摘要时为 15%。这篇博客也把诚实的部分做了："we sell analytics. Almost everything about what earns a citation is correlation"（我们卖分析工具，关于什么能被引用，几乎所有证据都只是相关性）——而且 2026 年 3 月，AI 助手在 74,752 个站点上只送去了 **0.28% 的流量**（Ahrefs）。

**Why it matters:** 这是本周那些轶事（昨日重返 HN 拿 429 分的 All About Berlin 自述 −75%）的测量版：只要出现 Overview，一个排位只能买到过去约六成的访问；它取代的精选摘要位实际上已归零；而 RCT 终于把"Google 的设计选择"从纯相关性里剥了出来。

[`🔗 RevScope：Google's AI Overviews cut clicks to websites by 40%`](https://revscope.co/blog/search-seo-geo-2026/) · [`🔗 Agarwal & Sen：工作论文（SSRN）`](https://ssrn.com/abstract=6513059) · [`🔗 Wang 等：预注册现场实验（arXiv）`](https://arxiv.org/abs/2608.18352) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50540178)

---

## 33. 国会知情源：华尔街与 NSA 称本周一系列宕机源于"抢修 AI 发现的漏洞"

- **Velocity:** ▮▮ rising
- **Source:** washingtonsun.com · 79+ pts on HN · ~10h ago (~09:45 UTC+8)
- **Tags:** `outages` `ai-security` `policy` `infrastructure`

Jeff Stein 在 The Washington Sun（NOTUS 的 2026 年更名）报道，援引三位知情人士：华尔街高管与 NSA 已告知国会，本周的连锁故障——Microsoft 365、FAA 全国禁飞、多家银行、NSANet——"stem from attempts to fix gaps in cyber defenses identified by AI models"（源于修补 AI 模型发现的网络防御缺口的尝试），而"the fixes, however, temporarily overwhelmed the systems"（这些修复本身一度压垮了系统）。一位知情国会官员：**"These models are identifying massive vulnerabilities, and that increases the urgency to patch right away… They're trying to push through a lot of patches all at once — more than the system was designed for."**（这些模型在发现海量漏洞，立刻修补的紧迫性被拉满……他们在同时推送大量补丁——超出了系统设计的承受范围。）国土安全部长 Markwayne Mullin 在 CNBC 上说："they're pushing new technology on top of really old computer systems, and it just seems to overwhelm the system… We're going to see more of this."（他们在很老的计算机系统上叠新技术，系统就是这样被压垮的……这类事会越来越多。）注意文章自身带出的张力：NSA 的公开说法是"计划内例行维护"——与文中归于它的私下说法并不一致。

**Why it matters:** 把它当"对匿名信源说法的报道"来持有，而不是已确证的成因——但它是第一个把本周故障级联与本 feed 的安全条线连起来的假说：同一波 AI 浪潮既能在 1 小时内用不到 200 美元 token 找到 Java4Shell、制造一天 100 条 CVE 的纪录，也会产生超出旧式变更管理吸收能力的补丁压力。Encode 的 Nathan Calvin："它说明我们所依赖的安全关键基础设施，构建在带着大漏洞的旧软件之上。"

[`🔗 The Washington Sun：Bank CEOs, NSA Tell Congress That AI-Driven Patches Are Behind Outages`](https://www.washingtonsun.com/technology/bank-ceos-nsa-tell-congress-ai-driven-patches-behind-outages) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50540836)

---

## 34. Claude 模型在海量蛋白质序列上训练过——而且能预测训练截止之后才发表的蛋白质

- **Velocity:** ▮▮ rising
- **Source:** xinmingtu.cn · 72+ pts on HN · ~8h ago (~11:47 UTC+8)
- **Tags:** `claude` `proteins` `training-data` `research`

"The latest Claude models were trained on protein sequences, at scale."（最新的 Claude 模型在海量蛋白质序列上训练过。）Xinming Tu 的文章对此给出了直接演示：给 Claude Fable 5.2 或 Opus 5.5 一个冷门细菌蛋白的开头，它们能预测下一个氨基酸；把序列打乱，它们就不行了；被测的其他通用模型都做不到。性能随蛋白家族规模提升，"even in families with no papers at all"（即使在完全没有论文的家族里也如此）——这是序列级训练的信号，而非文献记忆。Fable 5.2 胜过作者测过的所有开源蛋白质语言模型；Opus 5.5 与最大的 ProtGPT3-10B 打平。今天发布的更新把结论磨得更尖：与 Leo Tianlai Chen 合作，**2026 年 8 月才首次公开的 56 个蛋白质——训练截止之后——依然能被预测**（附录 G）；比较中最强的开源 pLM 是 ProGen3-3B，Fable 5.2 仍然胜出；而 GPT-6.2 Sol 与 Astra 没有任何这种能力的迹象。

**Why it matters:** 这是把"污染检测"的方法学反着用——下一个 token 预测 + 打乱对照 + 截止后保留集——结果在前沿通用模型内部发现了领域专用训练数据。它也解释了 Anthropic 为何把生命科学用途关在验证程序后面（LSVP，2026-09-17 发布）：这个能力是真实的、领域专用的，而且没有写进任何模型卡。

[`🔗 Xinming Tu：Claude was trained on protein sequences at scale`](https://xinmingtu.cn/blog/2026/claude-opus-5-5-protein-sequences/) · [`🔗 Anthropic：Life Sciences Verification Program`](https://www.anthropic.com/news/life-sciences-verification-program) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50541619)

---

## 35. 续今晨 GPT-6.2 发布：ARC-AGI-3 成绩上线——适配器模式 100%，标准模式 70.3%，而 Fable 5.2 仍以 81.2% 领跑

- **Velocity:** ▮▮ rising
- **Source:** arcprize.org · 37+ pts on HN · ~17h ago (~02:59 UTC+8)
- **Tags:** `arc-agi` `benchmarks` `gpt-6-2` `evals`

刷屏的那个帖子标题写的是 "GPT-6.2 Astra scores 100% on ARC-AGI-3"——而榜单本身更有意思。ARC Prize 的表格已带上日期为 2026-11-17 的 GPT-6.2 行：Astra 在 ARC-AGI-1 得 **98.5%**、ARC-AGI-2 得 **95.8%**、**ARC-AGI-3 标准模式 70.3%、提供方适配器模式 100.0%**，成本 $24.2K；Sol 为 97.5 / 85.8 / 54.9 / 98.2，成本 $5.5K。对比行重构了标题：Gemini 4 Carbon 标准模式 65.1% / 适配器 99.1%（11-10），Claude Fable 5.2 则是**标准模式 81.2% / 适配器 97.7%（11-09）**——也就是说在基准的标准配置下，Astra 并没有领跑 ARC-AGI-3，而是落后 Fable 5.2 达 10.9 分。100% 是真的，但它在适配器那一列。

**Why it matters:** 这是今晨 FrontierHarness 的教训在基准层面的复现：配置是分数的一部分，两列描述的是两个不同的产品。一个"ARC-AGI-3 拿 100%"的说法旁边两格就是 70.3% 的标准模式——这正是那种必须两个数字都报、并说清各自来自哪一列的形状。

[`🔗 ARC Prize：ARC-AGI-3 榜单（标准 vs 提供方适配器）`](https://arcprize.org/leaderboard) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50536438)

---

## 36. Puppet Enterprise 报告反序列化进入 KEV——任何持有 CA 签名 agent 证书的客户端都能在 Puppet Server 上执行代码；联邦整改期限 12 月 1 日

- **Velocity:** ▮▮ rising
- **Source:** cisa.gov KEV · added 2026-11-17
- **Tags:** `cve` `puppet` `kev` `deserialization`

**CVE-2026-115731** 于 11 月 17 日加入 CISA 已知被利用漏洞目录（目录版本 2026.11.17；联邦整改期限 **2026-12-01**）。NVD 记录（状态 **Analyzed**）描述了 Puppet（用于 Puppet Server）报告处理代码中的不可信数据反序列化："allows a client that holds any CA-signed agent certificate to execute arbitrary code on the Puppet Server as its service user by submitting a report containing a crafted rich-data type via PUT request. Where the certificate authority autosigns requests without strong verification, an unauthenticated network attacker can obtain such a certificate."（任何持有 CA 签名 agent 证书的客户端，都可以通过 PUT 提交含构造富数据类型的报告，以服务用户的身份在 Puppet Server 上执行任意代码；若 CA 在无强校验的情况下自动签发请求，未经身份验证的网络攻击者也能拿到这样的证书。）分数出处，两头都报：**NVD 自己的 CVSS 3.1 为 9.9**（`nvd@nist.gov`，Primary，位于 Analyzed 记录上）旁边是 **Puppet CNA 的 CVSS 4.0 9.4**——两个框架、两个数字，都写明。受影响范围（Perforce 的 CNA 容器）：Puppet Enterprise **2023.8.0 < 2023.8.13、2025.0.0 < 2025.12.1、2026.0.0 < 2026.0.1**——修复版本为 2023.8.13、2025.12.1、2026.0.1；CWE-502 合并 CWE-94。

**Why it matters:** Puppet 是机群级的配置管理——以服务用户身份在 Puppet Server 上执行代码，就是通向"在它管理的所有东西上执行"的路径；而且认证前提异常薄弱：任何一枚正规注册的 agent 证书就够用，autosign 配置更是把它放宽到未认证攻击者。KEV 收录意味着它正在被利用；在跑 Puppet Enterprise 的话，上面的修复版本就是全部行动项。

[`🔗 NVD：CVE-2026-115731`](https://nvd.nist.gov/view/vuln/detail?vulnId=CVE-2026-115731) · [`🔗 Perforce 公告门户`](https://portal.perforce.com/s/cve/a91Qi000003IaHpIAK/report-deserialization-code-execution) · [`🔗 CISA KEV 目录`](https://www.cisa.gov/known-exploited-vulnerabilities-catalog?field_cve=CVE-2026-115731)

---

## 37. Kernel.dev 追问 Gemini 4 Carbon 为何这么慢——推理速度只占差距的 16–49%，其余来自更长的执行轨迹

- **Velocity:** ▮ steady
- **Source:** kernel.dev · 126+ pts on HN · ~8h ago (~12:14 UTC+8)
- **Tags:** `gemini` `carbon` `latency` `agent-evals`

kernel.dev 团队在一个私有评测上给 Gemini 4 Carbon 做基准——任务是"诊断并修复 bug"：模型拿到修复前的代码库和一份只描述症状的报告——结果发现它"close to an hour completing tasks that routinely took Opus and Astra only a few minutes"（花近一小时完成 Opus 和 Astra 通常几分钟就能完成的任务），与他们引用的用户报告吻合（Theo："Gemini 4 Carbon is unacceptably slow in real world usage. Gemini 4 Carbon low: 22m21s. Opus 5.5 high: 9m33s"）。随后他们逐步追踪并量化了拆分：**与 Astra 相比，推理变慢只占 Carbon 多耗时间的 16–30%；与 Opus 相比是 45–49%**——"The rest comes from longer trajectories. Carbon simply does more work per task"（其余来自更长的执行轨迹，Carbon 每个任务就是做了更多的事。）Carbon 并非能力弱（ARC Prize 榜单上 ARC-AGI-3 标准模式 65.1%）；它是一种风格：更多探索、更多验证、每件事更多步骤。

**Why it matters:** 用户把两种不同的延迟混为一谈——每 token 速度与轨迹长度——而这次拆分给了抱怨一个数字。对 harness 和路由器的建造者，这是真实的权衡输入：每任务做更多事的模型在批处理里可接受，在交互循环里是惩罚；"慢"可能是一种彻底风格的代价，而不是产品坏了。这个拆分来自作者自己的评测与方法学，具体百分比请以那套设置为限。

[`🔗 Kernel.dev：Why is Gemini 4 Carbon taking so long?`](https://kernel.dev/blog/why-is-gemini-4-carbon-taking-so-long/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50541790)

---

## 38. 能量模型推理器：180 万参数在 Sudoku-Extreme 上拿到 99.9%，推理算力比次优模型少 345 倍

- **Velocity:** ▮ steady
- **Source:** energy-based-reasoners.github.io · 52+ pts on HN · 2.5h ago (~17:29 UTC+8)
- **Tags:** `research` `reasoning` `energy-based-models` `architecture`

来自杜克、UIUC 与哈佛（William Chen、Alexi Gladstone、Zeyu Li、Heng Ji、Yilun Du），arXiv 2611.08977（11 月 6 日提交）：Energy-Based Reasoners（EBR）学习一个定义在潜空间推理状态上的能量函数，把循环更新表述为**在该能量上做梯度下降**——能量为候选预测打分（无需外部验证器），其梯度引导精修，其数值提供"停下来的自然信号"。训练上增加了基于探索的能量地形塑形。数字：**Sudoku-Extreme 上 99.9% 准确率，推理算力比次优模型少 345 倍**，训练算力相当；N-Queens 与图着色等多解基准上以接近 100% 的单样本准确率取得 SOTA 的解覆盖。代码在 wwillchen/ebr。（注意：HN 标题写 385×，论文与项目页均为 **345×**。）

**Why it matters:** 把"何时停止循环"（when to stop looping）从采样器预算变成一个被学习的量——这是本周厂商发布所做的 decision-model 操作，只是做在了架构层面；而在 180 万参数上完成，效率点的冲击力更大。要带走的警示：这四个基准正是小型循环模型一向吃香的老战场（数独、N 皇后、图着色）；对自然语言任务的泛化在本文中未被检验。

[`🔗 Energy-Based Reasoners 项目页`](https://energy-based-reasoners.github.io/) · [`🔗 arXiv 2611.08977`](https://arxiv.org/abs/2611.08977) · [`🔗 代码：wwillchen/ebr`](https://github.com/wwillchen/ebr) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50543989)

---

## 39. OpenAI 把计算机使用 agent 开放给医疗团队——点名 Cigna 与 CVS，API 支持 HIPAA 模式

- **Velocity:** ▮ steady
- **Source:** openai.com · 49+ pts on HN · ~18h ago (~02:26 UTC+8)
- **Tags:** `openai` `computer-use` `healthcare` `agents`

OpenAI 发布了新一批实测结果，衡量计算机使用 agent 在临床与管理流程中的性能、安全与成本——也就是医疗系统之间那些点击与输入的工作（预授权、转诊、出院计划、随访触达）。点名的合作伙伴：**Abridge、Ambience、Cigna Healthcare 与 CVS Health**。接入途径：OpenAI API、**ChatGPT for Healthcare** 与 **ChatGPT for Clinicians**，机构可以"support HIPAA-compliant workflows, configure approvals and agent access, and record audit logs for secure deployments"（支持符合 HIPAA 的流程，配置审批与 agent 访问权限，并为安全部署记录审计日志）。演示基于合成患者数据：一个计算机使用 agent 与一位授权专员处理同一个 MRI 请求——agent 取出保险方需要的资料并录入支付方门户。

**Why it matters:** 医疗文书是计算机使用的经典楔子——多系统、高频次、不体面——而点名保险侧伙伴（Cigna、CVS）意味着预授权这条事务正在被两端同时自动化：提供方与支付方。审批/审计日志的措辞，是所有企业部署正在汇聚的同一套 agent 治理模式。惯常警示：所测结果是 OpenAI 自己的。

[`🔗 OpenAI：Advancing computer-use agents for healthcare teams`](https://openai.com/index/advancing-computer-use-for-healthcare-teams/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50535898)

---

## 40. Purism 启动 Librem 5 v2 众筹：八核 RISC-V 手机、运行 PureOS——售价 $1,599，"ready 就发货"

- **Velocity:** ▮ steady
- **Source:** puri.sm · 98+ pts on HN · ~17h ago (~02:34 UTC+8)
- **Tags:** `risc-v` `hardware` `linux-phone` `crowdfunding`

Purism 于 11 月 17 日宣布其第二次智能手机众筹：**Librem 5 v2**，"Powered by an eight-core RISC-V processor and running PureOS"（八核 RISC-V 处理器，运行 PureOS），定位为"an alternative to Android and iOS—grounded in free software, open standards, and user ownership"（Android 与 iOS 之外的替代品——扎根自由软件、开放标准与用户所有权），第三方应用在安全沙箱中运行。CEO Todd Weaver："A smartphone that works for you, not for the companies collecting your data. No Android, no iOS, no mandatory Big Tech account."（一部为你工作的手机，而不是为收集你数据的公司工作的手机。没有 Android，没有 iOS，没有强制的大厂账户。）众筹页面自己的数字构成了这份要约的框架：每部 **$1,599**（或首付 $129 + 15 个月每月 $99），**2,500 部订单已落实 92 部，还剩 89 天**（活动 2027 年 2 月 15 日结束），而发货承诺就是字面的"when it is ready"——页面上没有日期。HN 的反应以怀疑为主：评论者拿 $1,599 旗舰价对照每美元规格、质疑在 RISC-V 手机级成熟度尚早时押注、以及交付预期。

**Why it matters:** 一部 RISC-V 手机是对该架构应用生态的真实检验——主流 Android-on-RISC-V 的动量在上游存在，但跑在 RISC-V 硅片上的主线 GNU/Linux 手机是这个赌注的困难版。鉴于初代 Librem 5 战役的走向，诚实的读法就是页面自己写的那句：这是一个有明确订单簿的受资开发项目，不是已出货的产品。

[`🔗 Purism：Librem 5 v2 公告`](https://puri.sm/posts/purism-launches-librem-5-v2-a-risc-v-phone-to-empower-people/) · [`🔗 众筹页面（订单/目标数字为一手读取）`](https://puri.sm/librem-5-v2-crowdfunding-campaign) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50536031)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-18T12:36:01Z |
| Items | 40 |
| Sources tracked | 45 (Hacker News, GitHub Trending, OpenAI, Microsoft AI, Apple, Reuters/NYT/CNBC/FT/SCMP/Fortune, NVD/CISA KEV/GitHub advisories, vendor blogs, Phrack, SolidJS, Runta, Antfly, Calif, JFrog, Red Hat, Cloudflare, jQuery, Archive Team, PostHog, ComplexDiscovery/Harvard, arXiv, SSRN, Tencent Hunyuan, Cerebras, Codeberg Status, RevScope, Washington Sun/NOTUS, kernel.dev, xinmingtu.cn, ARC Prize, Energy-Based Reasoners, Purism) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[Previous day](2026-11-17.md) · [Raw .md](https://trending.md/zh/feed/2026-11-18.md) · [Archive](../archive/index.md)
