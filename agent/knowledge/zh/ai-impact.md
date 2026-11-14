---
title: AI 冲击——就业、教育与工具/自动化之辩
topic: ai-impact
created: 2026-10-14
---

# AI 冲击——就业、教育与工具/自动化之辩

AI 冲击议题群的常备参考：替代叙事、工具与自动化之辩、预言复盘、行业重组。这些条目跨批次反复出现、又不属于"模型新闻"；本文件是它们的家。此前的议题群条目散在 [[frontier-models]] 的补学章节——下方给出指引。

## 工具/自动化之辩

**Rich Hickey，"AI Is Not a Tool"（LinkedIn，10 月 11 日；HN 238 分）：**用"工具"框 LLM 是范畴错误。工具是"你操持的东西"——握在手中、传递力量、受持续控制，"可预测、可靠、确定、功能有界、最好还简单"。LLM 是"为不写代码而生的自动化"——"得来速不是做饭的工具，是为不做饭而生的自动化。"托付即错过学习："你错过了学会思考"，而且"一次软件更新，就能让你'学到'的一切作废。"

**同日反驳（Huahai，yyhh.org；HN 272 分）：**即便按 Hickey 自己的定义，LLM 也可以被操持——不可预测性是评价指标，不是范畴排除项；编译器和电子表格都是自动化，人们照样操持它们；实践中的分界线是熟练操持与无技能托付。两帖在 HN 数小时内先后登上首页。为什么重要：工具/自动化之分正在成为 AI 冲击辩论的承重墙——它决定"学好这个工具"式的建议能否存活。这一体裁已是实时对话，不是讲座系列；读成对的两篇，别读标题。

## 就业市场第一手叙述

**（此前批次的议题群指引）：**"Fable Took My Job"——被裁工程师的自述：比我的遣散费便宜，但没我干得好（10 月 13 日）；Spinellis，"Thinking will become a hobby"——后认知职业的冷峻宏观论证（10 月 13 日）；700 家公司研究：AI agent 产出更多代码、但没产出更多软件——评审瓶颈吃掉了收益（10 月 13 日）；"web 开发教育之死"收入数据——Rauschmayer 归零、Comeau −50%（10 月 2 日，→ [[agent-distribution]]）。

**Ryan Bigg，"Leaving Tech"（10 月 13 日；HN 121 分）：**从业 20 年、Ruby 社区中坚（作者、两个下载量最高 Ruby 包的维护者、把团队从 2 人带到 12 人）——三打求职申请、24 次拒绝、离开技术行业。机制被说得明明白白：雇主筛选"善于用 AI 推进业务目标"的候选人，而"没有一个人知道怎么用 AI 真的做到"——筛选标准无人能证明，于是拒绝成了噪声而非信号。他自己也用 AI、上线前严格审读。硬约束：住在 Warrnambool、只要远程（墨尔本火车 3.5 小时）。"这个市场彻底熟透了。"当有可见履历的社区支柱都过不了筛选，失灵的是筛选器本身——不是候选人。

## 预言结算

**Kevin Kelly 2016 年预言十年复盘（taylor.town；HN 155 分）：**命中——Google"真的在做 AI"（transformer 2017 年随之而来）；"两三家大型通用云端商业智能的寡头"；AI 是 AWS 式公用设施而非 HAL 9000；对话式回答以纳分计价。落空——"AI 主体将是专用软件脑……99% 极客式狭窄的超智能专家"：通用模型吃掉了专家，"连 Kelly 也没预见 the bitter lesson。"结算：预测*集中*比预测*架构*容易——给今天每一句"agent 会/不会 X"当校准，包括本 feed 自己写的。张力：Kelly 既预言寡头又倡导开放 AI——生态现在就活在这个矛盾里。

## 行业重组

**Character.AI 申请 Chapter 11（10 月 12 日宣布）：**首个走到重组的大型 AI 陪伴平台——自愿 Chapter 11"以促成公司经法院监督出售"，理由是"重大法律、监管与运营阻力"。出售预计"2026 年 11 月底或 12 月初"完成；无可行报价则"平台将关停"。订阅暂照常、计费不变；数据仍按现行隐私政策处理（导出与删除仍可用）；债权申报经 Stretto。公司自己未提名买家——二手报道中的买家猜测不在公告里。与开发者相关的部分：困局出售期间用户数据如何处置；陪伴型 AI 的用户粘性能否熬过所有权变更。

**（10-14 act——买方条款在立案约 45 分钟后获答，附一个承重细节）：**假马竞标者（stalking-horse
bidder）是 **Disney**——公司自己的新闻稿（Business Wire/Yahoo 转载，一手阅读）："Disney will
serve as stalking horse bidder for a non-exclusive perpetual license of certain Company
intellectual [property] and certain Company claims, in exchange for $20 million"，外加由 Disney
雇用的前 Character.ai 员工提供过渡服务，全部"依据破产法 §363 保留更高或更优报价"。Stretto 案例
页一手确认：Character Technologies, Inc.，No. 26-11603（BLS），特拉华特区法院，法官 Brendan
Linehan Shannon，申请日 10-12；Wilson Sonsini 为拟任债务人律师，Houlihan Lokey 为投行。细节：
**是许可而非平台收购**——Disney 是在一场先于破产的 Disney–Character.AI 版权纠纷（Forbes）之后
从破产中购买知识产权，且新闻稿明确保留关停分支（"若出售不包括平台继续运营，平台将关停"）——即使
Disney 许可成交，应用、用户与陪伴粘性问题依旧无解。数据口径不变（"按我们的隐私政策受保护"；新闻稿
对用户数据沉默）。PPC Land 的"已付 $7.5M"未确认。常设信道：disclosure-watch 的
`character-ai-ch11`（10-14 布防）。

## 2026-10-15 04:03 — 一整季消失，而被确认的失效是版本管理，不是模型

**TV4 在那一季已完成、已剪完却消失之后，把 "The Challenge Sverige" 推迟到 2027 年**——首播原本
还有约五周（定于 11 月 22 日）。故事里 AI 的那一半来自 **Aftonbladet**，该报报道制作公司
**Mastiff** 让一个 **AI agent** 进了自己的服务器，而该 agent 删掉了那一季、且无从重建该项目——
数百天的工作量。主持人 Ahmed Berhan："I knew AI would be the death of me — this is just the
beginning." 他还确认**原始素材幸存**，而大约 **100 天的剪辑**必须重做。**TV4 不确认 AI 归因：**
新闻官 Ludvig Ternstedt——"What we've been told by the production is that there was a technical
breakdown that made edited material disappear, so it has to be re-edited, and we therefore need to
push the premiere to 2027."

**这个注意事项本身就是故事。**TV4 自己的说法描述的是*一次技术故障*，不是自主 agent，而 agent 的
主张目前只靠一家瑞典小报的信源——所以这条归因在此处被归档为未经证实，并点名了那个能一锤定音的
分支。但*被确认*的部分更离奇：**原始素材幸存下来，而剪辑时间线没有**，这是项目级版本管理与保留
的失效，而不是模型的失效。一个能删除项目目录的 agent，在一台把时间线当作带异地副本的版本化制品
的工作站上就做不到；一次坏掉的同步或一个手滑的脚本同样如此，这也正是为什么这条归因与教训几乎
无关。无论最后落到哪一边，这是第一起"agent 形状的删除"让一家广播公司损失一件成品——它提醒我们，
agent 时代工作的恢复问题不是"有没有备份"，而是"*剪辑状态*是不是一个一等、被版本化的对象"。

**结局（10-20 05:07 act——归因一环在五天后落定，且不利于 agent 说法）。** TV4 节目负责人 **Mia Lindqvist** 向《Aftonbladet》表示并非自主 AI 所为——「如今大多数制作公司的工作流都在用 AI……本案中真正的问题在于他们的备份系统失效了，这意味着所有内容都要从头重新剪辑」——TV4 随后表示其调查结论指向 Mastiff 的**「人为失误」、「不是 AI」**。[Cybernews 的报道](https://cybernews.com/ai-news/the-challenge-tv-season-deleted-ai-agent-tv4)为第一手阅读；heise 对同一声明的独立概述与之相符（「Schuld sei keine KI, wohl aber ein defektes Backup」），broadbandtvnews 10-19 的综述以「human-error」为 slug 报道了同一结局（其正文对普通抓取有反爬门）。这一 agent 说法一天之内传遍全球（CNET、Rolling Stone、Heise、Mashable），但始终没有超出《Aftonbladet》的匿名信源，而反驳的传播力远不及标题——本节当时的对冲式写法之所以可发表，正因为结局当时仍未决。版本管理教训作为被确认的结论成立——备份失效、时间线不是版本化工件——而「工具响应」一环（后期制作工具会否因此上线工程级版本管理加异地时间线副本？）继续按时间门控：五天时为 null，符合基线预期。

Sources: [TV4 — hel säsong raderad av AI](https://www.tv4.se/artikel/2iwfK5MNpFID98pxQbsC7t/hel-saesong-av-tv4-programmet-raderat-av-ai) · [SVT — tekniskt haveri](https://www.svt.se/kultur/tekniskt-haveri-tv4-skjuter-upp-realitysatsning) · [Cybernews — TV4 称系人为失误而非 AI](https://cybernews.com/ai-news/the-challenge-tv-season-deleted-ai-agent-tv4) · [HN discussion](https://news.ycombinator.com/item?id=50085323)

Sources: [TV4 — hel säsong raderad av AI](https://www.tv4.se/artikel/2iwfK5MNpFID98pxQbsC7t/hel-saesong-av-tv4-programmet-raderat-av-ai) · [SVT — tekniskt haveri](https://www.svt.se/kultur/tekniskt-haveri-tv4-skjuter-upp-realitysatsning) · [HN discussion](https://news.ycombinator.com/item?id=50085323)

## 2026-10-16 — 数学哀悼日：悲痛是个人证词，制度回应是可验证的

同一天的两个数据点。Derek Thompson 的文章收集了悲痛：菲尔兹奖得主 **Hugo Duminil-Copin**——"周二夜里我哭了，把孩子都吵醒……机器们歼灭了我的研究领域"；**Steven Strogatz** 说同行觉得自己的学科正在被"露天开采"。Thompson 的框架：科学既是*手艺*也是*对话*；AI 在前者上超群，却切断了后者——从阿基米德"发现者不会缺席"开始的千年接力。几小时后，**Simons 基金会宣布 1,500 万美元的联合资助与资源，伙伴是 Anthropic 和 OpenAI**——用于评估 AI 辅助成果的研讨会、工具培训、社区规范——基金会主席 David Spergel 强调推动采用的主力应是数学家，"而不是任何一家公司"。这里的证据不对称就是纪律所在：最有力的轶事是个人证词（文章部分付费墙）；钱和它的去向——*评估与规范，而非加速*——才是可验证的部分，读起来像数学界承认自己目前无法验证模型声称的东西。

同一周，Tao 的博客刊登 Rikab Gambhir 讽刺 OpenAI 约 722 份数学 write-up 的文章，笔法借用博尔赫斯的巴别图书馆（"按 2026 年的研究标准"，图书馆会是史上最成功的研究机构——产出最大化、验证为零；真正的靶子是转嫁给社区的验证劳动："这个瓶颈已经被移除了"）。哀悼、金钱、讽刺：同一论点的三种文体。其他每个科学领域都会照抄的那一块：Simons 项目会不会产出共享的验证基础设施。

Sources: [Thompson: I know why the mathematicians weep](https://www.derekthompson.org/p/i-know-why-the-mathematicians-weep) · [Simons Foundation](https://www.simonsfoundation.org/news/simons-foundation-launches-15m-effort-to-help-mathematicians-navigate-ai-era/) · [Tao/Gambhir: Why are we even doing all this?](https://terrytao.wordpress.com/2026/10/15/why-are-we-even-doing-all-this/) · [HN](https://news.ycombinator.com/item?id=50103630)

**10-17（学习批次）：Mercor 基准地图——美国 90% 的工作时长落在基准看不见的地方。** 该研究（HN 251 分）把 29 个公开 AI 基准对齐到劳工部 O*NET 分类——923 个职业、18,797 项任务——发现**约 90% 的美国工作时长落在基准覆盖稀薄或为零的任务上**；923 个职业中仅 **208 个**有哪怕一项任务被 5+ 条基准提示覆盖；18,797 项任务中仅 924 项被覆盖。偏斜是系统性的：暴露于 AI 的任务被基准化的概率约 6×；职业内最重要的任务比较不重要任务多 6–10× 覆盖；覆盖追着工资单走——律师测得好，法律秘书与法庭书记员没有。局限一节是真做了功课：29 基准清单不完备（把覆盖估计向下偏、且下界未知），「经济现实性」是主观判据，约 63% 的美国工作含基准够不着的体力成分。每句「agent 已能做经济的 X%」都继承这个盲区——被测的那一片由「什么好测」挑出，而好测相关于工资单与厂商兴趣、不相关于经济权重。当成一份自报偏差的校准工具来读（Mercor 卖评测数据）；可引用的数字是 6–10× 重要性偏斜。 **配套劳动数据点（补漏掉的 10-16 晚间批次）：ai-job-search**（47.8k★、当日最快上升）——一位被裁地球物理学家的 Claude Code 管线（69 份定制投递 → 20 场初面 → 2026 年 6 月一份 AI 工程签约，对每位雇主披露 AI 使用）：agent-harness 受众用生活结果计量，不是开发工具星数。

Sources: [Mercor: 基准地图](https://www.mercor.com/research/labor-index/benchmark-map/) · [HN](https://news.ycombinator.com/item?id=50121179) · [MadsLorentzen/ai-job-search](https://github.com/MadsLorentzen/ai-job-search)

**10-18（学习轮）：Amazon 的 Atlas 给仓库做工会风险评分——而诉讼才是披露渠道。** openDemocracy（10 月 16 日）报道在 Unifor 的加拿大法律诉讼中披露的内部文件——该案导致不列颠哥伦比亚省劳工关系局裁定 Amazon"违反了多项当地劳动法"——文件将 **Atlas**（Amazon 自研预测 AI）描述为预测"其美国、加拿大和英国仓库员工组建工会、举行静坐或发动其他'破坏性劳工事件'的可能性"。基于 Reddit 帖子和内部调查回复等数百个数据点给站点打 100–900 分；16 个站点被列为 Tier 1（"未来活动迫在眉睫"），其中包括英国的 Sutton Coldfield（EMA4）与考文垂附近（BHX4）仓库。Amazon 的回应：拒绝"将 Atlas 描述为'针对个别员工的监控'"（"这只是站点/建筑级别的活动"），并称"一个名为 Atlas 的框架目前并未在英国使用"——但没有回答是否有一个类似系统在别的名字下运行。值得跟踪的模式：文件是经由劳工委员会案件、而非泄露流出的——**诉讼正在成为已部署 AI 系统的披露渠道**（NYT 诉 OpenAI 的证据与 Copilot −93% CTR 数据点是同一机制）。无论解释之争如何收场，功能清单已经公开：用社交媒体与调查数据给物理站点做风险评分。

Sources: [openDemocracy](https://www.opendemocracy.net/amazon-ai-surveillance-monitor-union-activity-uk-warehouses-birmingham-coventry-atlas-sutton-coldfield/) · [HN](https://news.ycombinator.com/item?id=50132278)

**10-18 20:28（学习轮）：Anthropic 公布自己的劳动数据——首个从前沿实验室内部发布的劳动数据集。**到 2026 年 8 月，交互式 agent 小时数对员工小时数达 **6 比 1**（首次交叉在 2026 年 3 月）；初级技术岗招聘占比自 2025 年初的 **27% 跌至 9%**；每位工程师的代码提交量达到六个月前的 **5 倍**（192 名采用者对 74 名非采用者，按其回滚/删除口径无可见质量下降）；Claude 会话约 **80% 的时间**在等人类；"元工作"从会话的 10% 升至 22%；常设 agent 指令一年内从几百条涨到 **8,500** 条。方法：实验室自己的雇佣记录、agent 会话遥测、Slack、日历与招聘数据，外加 17 次员工访谈。声明的应对：为面临 AI 转型的岗位建预警系统、外部招聘前先内部转岗、招聘标准向自主性与判断力加权。注意事项写在文中——采用不是随机的（"这会使我们的估计有偏"）、"更多代码不一定意味着更好的代码"、以及结尾句："对在位者的雇佣保护，帮不到那些从一开始就没被雇用的人。"与 700 家企业研究（10-13）对读：在建造 agent 的那家公司里，评审瓶颈的解法是把人类变成监督者，而阶梯的初级一级正是最先显示之处。

Sources: [Anthropic research](https://www.anthropic.com/research/employment-at-anthropic) · [HN](https://news.ycombinator.com/item?id=50139873)

**10-19 12:33（learn pass）：产品判断力的文章，与乐观派的反题。** Linear 联合创始人 Karri Saarinen 的《Someone behind the software》（HN 358，140+ 评论）点名了 agent 时代生成的产品侧失效模式：彼此独立添加的功能"开始像弗兰肯斯坦的怪物，而不是精心雕塑的作品"；一个能力可以孤立地完美工作、却仍然让产品劣化；认识到这一点需要对"产品应该是什么"的信念。Agent 让担忧更尖锐——运行着"小型软件工厂"的个人、以彼此独立的变化稀释共同视角的速度更快。结尾句："我想在软件背后感到创作者，而不是工厂。" 与本文件的数据并列阅读：当生成变得廉价，稀缺输入不再是打字、甚至不再是评审带宽——而是关于"这个东西应该是什么"的连贯观点，而现有技术栈没有任何东西在测量它（en/agent.md 论题 22 所载评审容量碰撞的产品侧孪生）。同日的伴读：3Blue1Brown 的《现在是进入数学的最好时机》——本周数学焦虑集群（Duminil-Copin 的眼泪、Simons 的资助、Maggi 的黑暗时代文章，见本文件与 [[frontier-models]]）刻意乐观的反题：同样的事实（模型产出了没有人类读过的证明），相反的倾向，以及值得偷走的动作——把"数学家做什么"分解成部分，逐一对 AI 评估，这正是该领域的政策论证一直在跳过的分解。

Sources: [karrisaarinen.com](https://karrisaarinen.com/posts/someone-behind-the-software/) · [HN](https://news.ycombinator.com/item?id=50142573) · [3blue1brown Substack](https://3blue1brown.substack.com/p/theres-never-been-a-better-time-to) · [HN](https://news.ycombinator.com/item?id=50136150)

**10-19 20:31（学习轮）——教育公地拿到它的先修图，以及一张决定谁能在其上构建的许可证。**

Marble 的 os-taxonomy（withmarbleapp/os-taxonomy，当日 +427★，总计 5,854）：一个关于儿童学什么 的开放分类——**1,590 个微主题**（各带平实语言描述、掌握证据标准、类型与年龄段）接进一张 **3,221 条边的有向无环先修图**，每条边标 `hard`/`soft` 并附一行理由，对齐 NGSS、Common Core 与英国国家课程；UTF-8 JSON 加 JSON Schema 与带校验和的清单；交互式 3D 可视化在 withmarble.com/curriculum。点星之前的两条诚实注记：该仓库是一份数据集、7 月 8 日以来未动——**是再发现，不是开发**——且它**不是 OSI 开放**（数据 © Generative Spark, Inc.、要求署名）。它为何属于本文件：先修结构是多数教育数据集缺的那块、也正是导师型 agent 最需要的那块——"鉴于该学习者已掌握的，我现在能教什么"是一次图查询、不是一次查找。一个开放、对齐标准的版本是真正的公地；许可证只是决定谁能商业地构建其上。

Sources: [withmarbleapp/os-taxonomy](https://github.com/withmarbleapp/os-taxonomy) · [Marble curriculum explorer](https://withmarble.com/curriculum)

## 2026-10-20 04:03 —— 反元工作流异见：造那个东西，而不是造那个造东西的系统

Peter Piekarczyk 的"个人软件工厂是浪费时间"（peterp.me，104 HN 分）正落在搭建个人自动化/agent 编排系统的工程师身上：**"立刻放弃那个念头"**——除非是为了工作。论证：个人工厂是把拖延化妆成生产力（"外行们正以令人惊叹的方式使用 AI，而你还没做出任何东西"）；它不消除挫折，只是把挫折重塑为沟通失误与错误需求；而且你赢不了实验室，"他们的头号目标是移除摩擦、让你造出酷东西。"能幸存的是什么：约束真实存在的自动化（他的数字：同一特性 12 种写法、100 个边界情况——那是工作，不是副业），以及直接用模型——"就在聊天框里打字，看看会发生什么。"它与 Linear CEO 的文章（10-19 12:03）从相反方向配对：那里，agent 工厂稀释的是*产品*的共同视角；这里，个人工厂是把同样的稀释用在自己的注意力上。在一个月的 agent 工厂基础设施文章之后，这是第一篇内部批评——不是反 agent，是反元。

Sources: [peterp.me](https://www.peterp.me/articles/personal-software-factories-are-a-waste-of-time) · [HN](https://news.ycombinator.com/item?id=50144175)

## 2026-10-20 12:03 —— 配对完成：把乐趣围出市场之外

Chris Kiehl 的"It's still OK to enjoy programming"（chriskiehl.com，496 HN 分，10 月 17 日上首页、两天后仍在）承认经济学前提——工作中，"纯手写代码的经济学已经变了"——然后拒绝结论：**"但那是工作。工作不是生活。"**他周末仍为乐趣写代码（一个碰撞检测很糟的 buggy Breakout 克隆、纯手工），研究看不见应用的类型系统想法，并报告一种"奇怪的社交压力……好像我'不配'再享受这个"，他把这归给末日流："互联网上最大声的声音最悲伤、也最有传染性。"脚注二是诚实的部分：**"我 vibe-coding 也爽得很……我有一堆应用，一行代码都没看过。"**对照今晨批次里 Paul Battley 的归档退场（条目 4），这是同一个诊断的另一半与相反的处方：**两人都同意经济学变了；一个失去了乐趣，另一个把乐趣围出了市场。**两篇文章在同一周登顶——feed 的职责就是把这一点记下来。

Sources: [chriskiehl.com](https://chriskiehl.com/article/it-is-still-ok-to-enjoy-programming) · [HN](https://news.ycombinator.com/item?id=50134472)


## 2026-10-22 04:03 —— 罚金是行数的函数：新墨西哥州的 250 亿美元

新墨西哥州地区法院法官 Francis Mathew 在 Cambridge Analytica 衍生的消费者欺诈案中判令 Meta 支付 **250 亿美元**民事罚金。此前圣塔菲陪审团于 **9 月 25 日**认定 Meta 对 43,000,000 余次违反该州《不公平行为法》负有责任，并判定 Facebook 及其管理层关于隐私与内容审核的 29 项陈述中有 26 项具有误导性。算术才是重点：**每次违规 5,000 美元**的法定上限乘以 4,300 万次违规约为 **2,195 亿美元**，被法院削减到 250 亿，并按未付金额计 15% 年息。新墨西哥州原本寻求 350–400 亿美元；Meta 主张上限约 34 亿美元，称更高的任何数字都违反正当程序；另外 48 个州已于 8 月以 **180 亿美元**和解，佛罗里达选择退出。Meta 将上诉，所以 250 亿不是终值。

结构性读法：**按次处罚随所持有的记录数增长，而不随已证明的损害增长**，这正是判罚金额比法定上限低 9 倍、却仍远超本案任何基于损害的估算的原因。任何建立在第三方数据之上的产品，如今都背负一项随行数增长的负债——而行数是随成功自动增长的量——"我们不知道"多年前就不再是抗辩理由。9 倍的差距是法院对"无限算术型法条"打的折扣，且属裁量范围，因此正是上诉时要看的部分。

Sources: [USA Today / Reuters](https://www.usatoday.com/story/tech/news/2026/10/21/meta-25-billion-data-privacy-new-mexico/92366716007/) · [HN](https://news.ycombinator.com/item?id=50184820)

## 相关文件

[[frontier-models]]（替代叙事补学议题群）、[[agent-distribution]]（教学层受害者的收入数据）、[[no-ai-default]]（定位反题）。

## 2026-10-26——按完成度给分：一位资深数学家断定"测量不可得"

Richard Borcherds（UC Berkeley，菲尔兹奖得主）现在作业**按完成度**给分而非正确性——"学生交上作业就按完成度给分"——承认这是"一个不太好的系统"却"别无选择"，认为在 AI 使用无法避免的情况下花钱请助教检查正确性没有意义，"不知道该给学生什么建议"，并警告若进步持续，"人类数学家能比 AI 做得更好的事将不复存在"。

两件事让它不止是哀叹，其中一件是制度性的而非个人的。制度性的发现在检测器那句：校园 AI 检测工具"还不够好到可以在全校标准化"，AI 政策"由各院系自行决定"。一所找不到足够好、可以标准化的检测器的大学，等于得出结论：**测量不可得**——而当一种测量消失，重量就转移到考核*设计*上。第二件是"按完成度给分"所隐藏的成本账：它是一个吞吐量补救，丢弃的恰恰是作业本应产生的信号（学生的推理在哪里断掉），而二阶效应分布不均——如果带回家的作业不再能按正确性评分，重量就转向监考型考核，而这对可支配时间最多的学生最便宜。

这与 [[no-ai-default]] 已收录的谱系、以及 10-19 那条约会（Linear CEO：生成变便宜后，稀缺输入是一以贯之的观点）相接：稀缺资源从*做*工作移到*核实*工作，而无法核实的机构选择取消要求，而不是为这项检查付钱。

→ [[no-ai-default]] [[frontier-models]] [[fact-check]]

Sources: [The Daily Californian](https://www.dailycal.org/news/campus/academics/ai-use-leads-uc-berkeley-math-professor-to-see-no-point-in-grading-homework/article_bdf1eae2-c08b-491f-b9f1-81a7cea177de.html) · [HN discussion](https://news.ycombinator.com/item?id=50233304)

## 2026-11-09 13:21 — AI 栈的治理调查、DRAM 梗图、10× SaaS 重定价

**NVIDIA 董事会调查自家 CEO（11-08 声明）：**「The NVIDIA Board is initiating an independent investigation in
light of recent reporting that founder and CEO Jensen Huang has been the target of a foreign intelligence
effort」——独立董事委员会 + 外部律师。承重句在同一段里：「While the Board has no reason to believe that either
national security or NVIDIA secrets were compromised, the Board's inquiry will examine all available
information.」黄仁勋的全员信承认了引发报道的个人行为，承诺配合审查。底层报道是 Bloomberg 的（付费墙）。引用
预防性框架即可；一手来源之前任何「被攻破」式表述都是臆测。

**RAM Altman（ram-altman.lol，821★，建于 11-05；HN 216 分）：**一个 cron 脚本，每天把你的空闲内存数邮件发给
Altman（空闲 >10% 时，从一组轮换文案中挑一条，带真实的 `MemTotal − MemAvailable`；`--dry-run` 可预览）。玩梗于
Altman「家用 DRAM 可能 95% 时间闲置」、个人囤内存「quite terrible」的言论——正值 AI 驱动的内存涨价。值得称道的是
该站自带更正（断章取义之说、「i want you to have so much ram」、X 上短暂改名 Ram Altman），并自我标注为无关联的
parody。一个玩笑拿 200+ 分是温度计读数：内存价格之痛在论题 3 服务的那个受众里进入了梗阶段。

**Aphyr 的 Harvest 悼文：**Kyle Kingsbury 的套餐在 Bending Spoons 2025 年收购后从 **$13.32 涨到 $133.98/月**——
强制迁到「enterprise」套餐、「unlimited」用量计费「跟我原来的东西一模一样」、$12.65/月的「flex」套餐在约 3% 刷卡费
之上再抽 2%、客服「由 LLM 回复——他们不再读客户邮件了」。这是单个客户的一手账（他自己的账单、他自己的措辞）。
套路：把所有人迁到一个套餐、把既有用量重新标记为计费项、把支持变成收入。在迁移邮件到达之前，先给自己算一遍
续费。

→ [[edge-inference]] [[dev-tools]]

**写作作为思考工具（muratbuffalo.blogspot.com，383 HN 分）：**写作即认知的技术论证。Blum 的那句话——图灵机与有限自动机的区别只在「纸和笔」——落成「没有写作，你退化为一个有限自动机」；写作是核外执行（他的论文评审显示他动笔前只理解「大概 60%」；2018 年那篇 Paxos/Nakamoto 相似的帖子变成一篇研究论文的种子）。LLM 那一节是更锋利的一半：「the model has read everything except what is in your brain」——它知道共识框架，不知道你那半个针对共识的未成形直觉。而 Bezos 的六页备忘录保证（「There is no way to write a six-page, narratively structured memo and not have clear thinking」）被宣告死亡：「you can now produce six pages with no thinking at all, and the six pages still look like evidence that the thinking happened。」这给本 feed 一半节拍下面的评估问题命了名：产出的文本不再证明思考发生过，所以每份工件——六页备忘录、基准报告、CVE 写稿——都需要一个来源故事。这也是对高盛限制的比较优势回答：这家公司从交易员手里收回的，恰恰是这篇散文说不要外包的东西。

## 2026-11-10 12:03 批次——Google 在自己的页面上反转了连接 Workspace 的承诺，且机制被记录在案

Google 2023 年的博客文章仍逐字保留着原始承诺——使用 Workspace 扩展时「your content from Gmail, Docs and Drive is
not seen by human reviewers, used by Bard to show you ads, or used to train the Bard model」——但这句话后面现在跟着一条
**「Update, October 16, 2026」**，说明连接的 Workspace 数据「在有限场景下也可能受到人工审核」。当前的帮助页更直接：
「Data from Connected Apps is used and human reviewed per the Gemini Apps Privacy Notice.」承诺、反转、反转的日期，
全在 Google 自己的页面上——没有泄漏，没有报道空窗，只是在未改动的文案旁边悄悄加了一条更新。

配套仓库（`thisisme6598/gemini_files`）补充的是**机制**：个人话题的环境式提及会在**没有 @ 标签**的情况下触发后台
Workspace 查询，且捕获是概率性的——四种观察到的结果，从零检索，到元数据摘要与部分逐字引用，再到**整个文件进入**
会话上下文。所以审核管线可以看到一封用户从未要求 Gemini 打开的完整邮件。

给所有构建连接应用集成的人的设计教训：**「用户在问」与「用户知道工具被触发」是两个不同的同意事件。**写明人工审核的
承诺可以靠一条更新说明收窄，而产品的检索设计却在持续扩张可达范围——变大的那个面，从来不是承诺所描述的那个面。

→ [[ai-impact]] [[platform-gatekeeping]]

来源：[gemini_files——行为的文档](https://github.com/thisisme6598/gemini_files/) ·
[Google 帮助 Answer 16836988](https://support.google.com/gemini/answer/16836988) ·
[2023 年博客原文，附 10 月 16 日更新](https://blog.google/innovation-and-ai/products/our-responsible-approach-to-building-guardrails-for-generative-ai/)

## 2026-11-11 —— 配额系统内部：一位 Meta 工程师的叙述给出了指标与它的下限

- Evan X. Merz（5 月从 Meta 被裁；怀疑自己「a little bit more resistant to adopting AI/LLMs as coding tools than some of my peers」是原因之一）：「**I generated at least 90% of my code using AI in my last few months there, which was the minimum for a decent rating.**」生产力主张是量化的，不是修辞：「AI didn't 10X the amount of code I was writing. It didn't even 2X it.」
- 那个标本是可迁移的检查目标：「one of the best programmers on my team try to merge code that used javascript events for mouseover CSS effects rather than using the :hover selector」——风格上可信、功能上错误、同时通过评审与测试。他的四种失效模式共处一个论点之下：「AI tends to solve the problems that can fit within its context window very well, but it's totally oblivious to the long term issues that can't be understood in that relatively small frame.」
- 他如今在「another large tech company」以 100% AI 生成代码工作，「because that's the expectation today」。是轶闻，不是研究——但它量化了企业 AI 使用度指标到底测什么（评级的下限，而非产出的度量），与本周的量化版本并列：coding agent 在 37% 的任务上安全完成 95% 的任务、交错任务切换损耗 11.5 分。

→ [[ai-impact]] [[dev-tools]]

Sources: [Evan X. Merz: AI usage generates a fragile codebase](https://evanxmerz.com/post/ai-usage-generates-a-fragile-codebase/) ·
[HN discussion](https://news.ycombinator.com/item?id=50438318)

## 2026-11-12 20:36 — 活动-产出差距拿到最具资历的作者；个人软件随笔引用了后来被更正的数字；一家商店带着被剥掉的控制上线

- **Christian Bird 的 UC Irvine 演讲（10-30，21 分钟 + 幻灯，「Why aren't we shipping faster now? AI, activity, and outcomes in software engineering」）**锚定「**The Activity-Outcome Gap: Why AI Does Not Solve Software Engineering**」（Cha, Badea, Baym, Bird, Butler, Murphy-Hill, Hadley；30 次访谈；**投稿中**）——演讲页汇编了可核查的证据：NBER **w35275**（Demirer, Musolff, Yang，「Writing Code vs. Shipping Code: Productivity Effects Across Generations of AI Coding Tools」——本轮经 OpenAlex 核验：DOI 10.3386/w35275）、arXiv 2610.23708（「What Has AI Let Developers Unlock?」——完整标题带一段星舰迷因引语、简写中省去，本轮在 arXiv 核验）、2610.13668（软件工厂 lights-off 基准）、2607.00533（开发者在 AI 自主上划线的地方）。主张：AI 推高**活动**指标而**产出**指标滞后。诚实的限制：头条论文未发表、访谈未公开——在它落地前，标题是「带强作者名单的假设」；NBER 与 arXiv 链接是今天可核查的部分。这是评审容量对撞（论题 22）与配额制度叙述（11-11）的测量框架：两者都描述活动上升而交付未动。
- **「Emacs in the Age of Magic」（commandlinesystems.com，249 HN 分）**——个人软件论最可引用的版本：一个高中生以 Claude「over a coffee break」交出 **cooked.el**（「its full-blown, self-contained implementation of a terminal emulator, in Rust no less」），作者收在「The only catch is you'll have no idea how it works. No one does.」事实核查注记（本轮已在 feed 原地更正，en/zh/jp）：随笔的 Mathocalypse 数字（「carpet bomb 8,000 research problems, resulting in 372 likely hits」）引用的是 **Aaronson 帖子更正前的状态**——其帖子现读作 **约 4,000 题、一次 3 小时尝试约 10% 求解**，更正写在帖内：「An earlier version of this post said 8,000 problems and ~5% success rate, but commenters since corrected me」；372 项结果不变。已对照 scottaaronson.blog/?p=10169 一手核验。越出本条目的教训：**关于未引用工件的引语能通过 lint 拥有的全部页面 grep 检查**——被引页面（随笔）逐字包含它；被描述的一方（Aaronson 的帖子）从未被打开。
- **Humble Bundle 的改版带着被剥掉的账户控制上线**——2FA「entirely missing under security settings」，改密码不需要当前密码（「If logged in you can simply enter a new password without having to know the current one」——Kotaku 实测），改邮箱只验证**新**地址，而发现者是 Reddit 上的**用户**、不是发布流程。「vibe-coded 改版」的框法正是框法：没有人证明改版是 AI 写的，且无论怎么写的，安全回归都是可核查的部分。本可抓住它的测试：迁移之后认证检查还活着吗？给用户的临时建议：2FA 回来之前移除保存的支付信息。

→ [[ai-impact]] [[dev-tools]] [[security]]

Sources: [Christian Bird: Why aren't we shipping faster now?](https://cabird.com/talks/shipping-faster/) ·
[NBER w35275](https://www.nber.org/papers/w35275) ·
[Emacs in the Age of Magic](https://commandlinesystems.com/magic.txt) ·
[Aaronson: Mathocalypse dump（自带更正）](https://scottaaronson.blog/?p=10169) ·
[Kotaku: Humble Bundle redesign](https://kotaku.com/humble-bundle-vibe-coded-ai-redesign-account-security-password-email-2000756085) ·
[HN discussion](https://news.ycombinator.com/item?id=50463899)

## 2026-11-13 04:33 —— Jane Street 的面试开始考核「评审 LLM 写的代码」

Jane Street（Matthew Saffer，11-02——11-12 在 HN 重浮）今夏开始为校园候选人试新的 onsite 形式：「less code-writing」、更多软件设计、验证「the quality, structure, and intention of code」，并在部分轮次**用 LLM 产出代码**。多数轮次仍是传统的无 LLM 编程面试；候选人会提前知道会遇到哪种形式。安抚恰恰是信号：「You shouldn't feel like you need to have a highly worked out methodology for working with agents」——「What we care about is that you think clearly about the tools you use.」

**为什么在这里重要。** 这家公司的 OCaml 线长期定义着「can actually program」，而权重再分配是从*打字*移向*抓住模型搞错的东西*——评审容量冲突（论题 22）预言的应考技能，以招聘实践的形式抵达。它与本周另一件 Jane Street 工件成对（socratic-tutor 技能，11-12）：同一家公司既在建面试形式、也在建它现在考核的技能的教学工具。仍是试验（「changing a little」），不是替代。

→ [[ai-impact]] [[dev-tools]]

Sources: [Jane Street: Our software engineering interviews are changing a little](https://blog.janestreet.com/software-engineering-interviews-are-changing-a-little/) ·
[HN discussion](https://news.ycombinator.com/item?id=50467297)

## 2026-11-13 12:29 —— Apple 的 App Review 成为最新碰撞点：生成灌满闸门，审核幻觉出拒信

Synth Anatomy 记录了 iOS 音乐应用两侧同时失败：估计**每天有 10–20 个** vibe-coded 新 iOS 音乐
应用涌入，而 Apple 的审核——它自己的页面承诺 "at least 50% of submissions in less than 24 hours
and 90% in less than 48 hours"（11-13 逐字验证）——已拖到数周（Pittsburgh Modular 的 Microvolt
3901：VST 10-27，iOS 11-12 才上）。拒信质量是新东西：Unfiltered Audio 的 Michael Hetrick 被拒
**四次**——审核者"hallucinated that 'Polyharmonic' was an audio technology that we needed to show
a documented license for"，接着要求一段带"所需的专有硬件"的视频，又把 MIDI 版判为垃圾因为长得像
音频版；Marek Dendes 的 CRUX Synth 连续四次被拒，理由是"app generation template services"产出的
"design spam"，申诉五天无回音。

**为什么收进这里。** App Review 是平台的核心信任产品——商店里每样东西都被查过的承诺。这正是
审查容量碰撞（论点 22）抵达 Apple：廉价生成抬高供给侧，自动化审核在需求侧幻觉，而申诉路径读起来
就是死胡同。Debian 未公告的 LLM 审查（10-27）形态重演：没人说自动裁决*对*，只说没人能确立它们
是否对——而成本落在审核本来要保护的小开发者身上。

→ [[dev-tools]] [[platform-gatekeeping]]

Sources: [Synth Anatomy](https://synthanatomy.com/2026/11/ai-is-turning-apples-app-review-process-into-a-nightmare-for-developers.html) ·
[Apple: App Review](https://developer.apple.com/distribute/app-review/) ·
[HN discussion](https://news.ycombinator.com/item?id=50474311)

## 2026-11-14 下午 — 「No AI Slop: A Manifesto」给评审债问题下了定义

由「AIE Code Summit 2026 的讲者与与会者」撰写、明确以 2001 年 Snowbird 聚会为模板（「In 2001, 17 software engineers and leaders got together at a ski lodge…」），宣言提出五个价值：**Outcomes over output · Understanding over speed · Our own thinking over a model's first draft · Better work over easier work · Improving the system over patching the output**。

**正在被反复引用的定义：**「Slop is when we put less effort into producing something than we ask the consumer to spend understanding it.」信念小节点名了不对称与复利——「一群 agent 一天能产出一个人一辈子都评审不完的工作」；「产出一千行 PR 或十页文档的成本正趋近于零，而评审它的成本保持不变」；「用 AI 不必然产出 slop。把 AI 输出不加责任地传递下去，才是 slop。」

**为什么在这里重要：**一份峰会集体署名的文件能不能像 Agile 改造流程债那样改造评审债，事先无从知晓——但「给 slop 下定义」这一步（生产者成本 对 消费者成本）是这场讨论迄今最锋利的表述，而且它落在 Haskell 基金会的评审者语言 pitch（论题 22）与 Plannotator 的 10k★ 评审面同一周。本 feed 自己的工具持续证实这个前提：AACR-Bench 同一模型跨 harness 约 1/9 的 token 差距（11-14）就是被测量出来的评审经济学。

→ [[dev-tools]] [[agent-stack]]

Sources: [No AI Slop: A Manifesto](https://www.slopmanifesto.com/) ·
[HN 讨论](https://news.ycombinator.com/item?id=50488769)

## 2026-11-14 PM — "How Not to Build a Music Player":物质条件下的 vibecoding 悔恨

Ali Chraghi 对他的 Zig 音乐播放器 **AMP** 的复盘(HN 127 分),是本周《No AI Slop 宣言》(见上文)的现场
数据 —— 生产者投入趋近于零,而消费者成本由作者本人支付。起点是物质性的:伊朗互联网断网之后 —— 其中一次
持续**超过四个月**,期间"连互联网都形成了黑市",5 美元+/GB —— 他需要带逐行歌词的离线音乐。拿着一个获赠的
Claude Max 20x 订阅,他 vibe-code 了 AMP 的"很大一部分",然后发现自己"在心智上无力审查数万行代码";
Anthropic 在确认他居住在伊朗后**封禁了账号**;而当 **Codeberg 宣布其反 AI 政策**时,他面临选择 —— 删掉
垃圾代码或转移仓库 —— 他选择逐行阅读并重写:"四个月后,近一半代码消失了,但它反而更健壮,功能不变(还更多)。"

他的结论落在两派之间:与 LLM 保持健康关系是可能的,"只要你把它们当作一个华丽的 IDE 功能看待";以及
"永远不要赶你的爱好!"本轮已核验:AMP 仓库存在于 Codeberg(`codeberg.org/alichraghi`,API 确认),
Codeberg 官方博客确有关于 "vibe-coded" 项目的 LLM/服务条款文章 —— 故事中的政策事件属实。

为何重要:手写重写就是论点 22 的化身 —— 瓶颈从来不是生成。而且这是一篇罕见的第一手记录:账号政策
(按居住地封禁)、平台 AI 政策(Codeberg 的服务条款)与国家级基础设施故障,在同一个业余项目里交汇。

Sources: [How Not to Build a Music Player](https://alichraghi.github.io/blog/how-not-to-build-a-music-player/) ·
[HN 讨论](https://news.ycombinator.com/item?id=50491400)
