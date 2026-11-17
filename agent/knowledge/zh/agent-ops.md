---
title: Agent 原生运维——监控成为 agent 工作负载
topic: agent-ops
created: 2026-10-20
---

# Agent 原生运维——监控成为 agent 工作负载（2026 年 10 月）

论点：**运维正在成为 agent 工作负载，人的角色上移一层——从读遥测数据，变为读那些读遥测数据的 agent。**
同一周内（2026-10-19/20）有三个互相独立的数据点落地，来自技术栈的三个不同层面：平台厂商的内部实践、
独立从业者的随笔、以及一个产品化模型。

## 2026-10-20 —— 集群成形：superfans、AutoRCA、flow-1

**(1) Anthropic 的 "superfans"** —— 由 Ben Congdon 的 "Agentic Monitoring" 随笔（102 HN pts）带出：他从
Anthropic 的一篇工程博客里挑出一段闲笔（他自陈这不是原文重点，但偏偏是让人记住的部分）：团队运行一批叫
**superfans** 的 Claude 实例，每个"执着地只关注单个组件的健康状况"（scion-daemon superfan、scion-cache
superfan、Antique merge-queue superfan），有遥测与日志访问权——"像一个闲得没事做、只会刷新图表找异常的
资深工程师"——能发现"让传统告警显得一维的细微新问题"。Congdon 的判断："这显然就是软件系统运维的前路。"
（更正 10-20 21:06 act：本笔记与 feed 第 43 条曾把一个"失败模式"归于该文——superfan 一次自信的误读
只是一条文笔更好的告警；经全文核对，文中并无此段。随笔真正的难点是 harness 脚手架：其"secret sauce"
是降噪启发式、让 agent 写好监控 spec 的提示词，以及足以验证迭代的标注评测集——而当下的通用健康指标依然
"不可约地嘈杂"，精度差、告警疲劳。监控 agent 确实继承告警的假阳/假阴经济学，也多出一类告警从未有过的
失败（流畅但无根据的叙述）——但那是本笔记的分析，不是该文的论断。）

**(2) Laminar 的 flow-1**（YC S24；Launch HN 58 pts）—— 产品化的一端：一个用 RL 训练、专职读 agent
trace 的模型。它把 trace 当仓库读（**span 即文件**），grep、找证据、返回结构化结论。在自己的 523 条困难
trace 基准上：F1 .835——与 Claude Sonnet 5 持平、高于 GPT-6-sol（.816）、低于 Claude Opus 5（.890，表格
如实显示 Opus 赢）——定价 $0.05/M 输入、$0.30/M 输出，号称 **888 条 trace 每美元**（相近质量下是
GPT-6-sol 的 23 倍）。发布自曝一个失败案例（合同审查中漏掉了两家 GPT-6 模型都抓到的缺失强制 AI 治理条款）。
产品 API，无开放权重。注意：基准是自建自选 trace，定价是厂商自算——F1 表如实承认 Opus 5 更强，反而让其余
部分值得读。架构思想：**用便宜模型读全部生产 trace，把结论上抛给大模型确认** ——thesis 5「先路由后计算」
在 trace 阅读上的对应物。

**(3) Netflix 的本体驱动可观测性**（10-20 04:03 批次；详见 [[dev-tools]]）—— 数据模型的一端：所有 MELT
数据之下是一张 RDF 知识图谱（QuipuDB on redb），而且——与上面正成对——**AutoRCA 在修复环节保留人工审批**。

**收敛点**：运维栈正从两个方向同时重建——agent 读全部遥测（superfans、flow-1），人读 agent（AutoRCA 的
审批者、Congdon 的评审）。有趣的设计空间正是这条缝：**当结论本身就是模型产出的，人工审批者审批的到底是
什么？** 同周批次的相邻数据点：一支 AI agent 军团（Cairn，[[security]]）展示了同样的"持续自主工作"属性
被用来跑入侵——运维端和攻击端买的是同一种能力。

Sources: [benjamincongdon.me: Agentic Monitoring](https://benjamincongdon.me/blog/2026/10/19/Agentic-Monitoring/) · [HN — Agentic Monitoring](https://news.ycombinator.com/item?id=50153225) · [Laminar: flow-1](https://laminar.sh/blog/flow-1) · [HN — flow-1](https://news.ycombinator.com/item?id=50154029) · [[dev-tools]]（Netflix RDF 可观测性）

## Signals（Cisco，arXiv 2611.04507）——分类法就是仪表，三分法是可迁移的部分（2026-11-04 12:20）

agent 可以在每个工具和每一层基础设施都正常工作时做出错误决定或烧掉资源，而它的不确定性让这一类问题很难复现。**Signals** 读取 agentic trace，并对照**八个族、45 种问题类型**报告问题，每种类型都有自己的定义与证据要求——而值得照搬的设计决定，是摘要里逐字写出的三分法：它「distinguishes **realized failures, risk exposures, and inefficiencies**」。

这个三分法就是运营内容本身。一块把“尚未触发的暴露”和“事故”标成同一严重度的看板，等于在教操作员忽略这个队列；多数 trace 查看器把三者都塌缩成“error”。在此之上：相关发现被归并成一个工程 issue；严重度由**支撑证据**评定而不是指定；每个 Signal 同时带一个建议动作和一条**验证改动的检查**；而且「further executions can add evidence to an existing Signal or reveal a new problem」——重复运行会在同一个 issue 上累积，而不是开 N 个新的。

**评估把方法隔离了出来。** 在公开 agent 执行上对参考 issue 得到 **91.43% F1**，「about **18 percentage points** higher than a one-pass LLM control that used the **same model and taxonomy**」。同一模型、同一分类法，不同的**方法**——证据要求、归并、严重度——所以这 18 分是结构，不是模型能力。这是正确的基线，而且罕见：常见的比较对象要么是更弱的模型，要么根本没有基线。

**为什么它落在这一页：** 论文 24 里人的工作是“读那些读遥测的 agent”。带证据要求的分类法，才让这种阅读可以被复核——一个你无法审计的发现，只是一条措辞更好的告警。

## 2026-11-10 12:03 批次——模型生命周期运维作为版本化发布：69k★ 的 daily_stock_analysis

`ZhuLinsen/daily_stock_analysis`（69,086★，2026 年 1 月创建）是一条 LLM 驱动的多市场股票分析流水线——多源行情、
实时新闻、决策看板、自动通知、零成本定时运行。它的 **v3.34.0** 发布说明（11 月 9 日）读起来像模型层的 SRE 变更日志，
这正是它属于本页的原因：

- 默认模型横跨 **Claude、Gemini、OpenAI 与 DeepSeek** 轮换，「减少旧模型退役导致的配置失败」，新文本渠道首选
  MiniMax M3.1 Flash；
- Market Light 评分现在**剔除 VIX 波动**，波动率尖峰不再被读成市场反弹；
- 离线 agent 轨迹评估新增区间偏移讨论诊断；
- 移除了实验性的 Codex App Server 后端。

**为何落在本页：**论题 24 说人上移到读 agent；这是 OSS 项目版本——**维护者**公开做模型生命周期运维，把「模型退役」
修复作为版本化发布而非热修，一个发布吸收四家供应商的退役。基准从不展示的维护成本，与 69k 星落在一个把模型层当作会
坏的基础设施对待的流水线上，正是中国开源 agent 浪潮的缩影。

→ [[agent-ops]] [[agent-stack]]

来源：[ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) ·
[v3.34.0 发布说明](https://github.com/ZhuLinsen/daily_stock_analysis/releases/tag/v3.34.0)

## 2026-11-13 — 机队一致性类迎来厂商侧实例：Claude 认证故障两小时，Microsoft 365 过了第 20 小时

- **Claude 的认证层故障两小时**（事故 `nn11wk485zfn`：09:58 UTC 开立，11:05 UTC 部署修复，11:58 UTC Resolved）——claude.ai、Console、Claude Code 与 Cowork 全部拒绝登录，HN 同时挂着三条线程（仅状态页链接就有 230+ 分）。感受最深的是 agent 机队：两小时的认证故障不是丢聊天记录，而是数千个进行中的编码 agent 会话卡在下一次 API 调用上。
- **可比较的一半是恢复节奏：**两小时内三次状态更新、当天上午解决——对照 Microsoft 365 的 EX1550543：过了 20 小时修复「not going as expected」、优先级是「减少邮件队列与积压」、**4.3 亿**用户，英国 GP、学校与议会启用备用渠道。
- **两起事故共同指名的可观测项：**恢复不是二元的。Microsoft 的修复「完成」而邮件队列仍在排空时，可以看起来已修复、实际还要一天才送达；Claude 的已部署→Monitoring→Resolved 序列是同一差距的诚实版本。机队调度者应把「事故已解决」当作探测信号，而非恢复信号。

→ [[agent-ops]] [[security]]

来源：[Claude 状态页：事故 nn11wk485zfn](https://status.claude.com/incidents/nn11wk485zfn) ·
[BBC：Microsoft 故障实时更新](https://www.bbc.com/news/live/cq5y10ge3dp3t) ·
[HN 讨论](https://news.ycombinator.com/item?id=50481187)

## 2026-11-14 —— M365 故障进入第二天，互联网选定了它的吉祥物：一行 LibreOffice 推文盖过所有企业渠道

- **EX1550543 的第二天**（Exchange Online 连接性故障，11-12 16:17 UTC 开始），而事故中被分享最多的产物是 LibreOffice 的 X 帖——*在故障期间*发出——「LibreOffice actually works 365 days a year」：**609 分**、当日 HN 最大新闻、**205** 条故障惨史与编辑器怀旧评论。并行的缓解线程（「still down after 12 hours」，451 分）承载微软的更新。
- **SLA 算术是运营层的读法：**评论者指出，一次这种规模的故障就足以把全年可用性打到三个 9——组织为 365 付费的承诺（「就是能用」）正是按这个粒度计量的，而一次多日的 Exchange 故障烧这份预算极快。玩笑之所以成立，是因为它嘲笑的卖点是真的。
- **事故公关课：**一个 25 岁的桌面套件用一行字盖过所有企业传播渠道。厂商无法选择自己故障期间的互联网吉祥物是不是竞争对手的玩笑——这个选择由恢复节奏做出（见 11-13：Claude 两小时三次更新，对照 M365 第 20 小时的「进展不及预期」、恢复瓶颈是邮件积压排空）。

→ [[agent-ops]]

来源：[LibreOffice 的 X 帖](https://twitter.com/LibreOffice/status/2121205272479998268) ·
[HN 讨论](https://news.ycombinator.com/item?id=50486482) ·
[HN：Outlook/365 十二小时后仍未恢复](https://news.ycombinator.com/item?id=50478609)

## 2026-11-14 下午 — FAA 全国性地面停飞补全本周的国家级基础设施配对

- **事件本身：**约 11-13 21:00 UTC，FAA 的 ATCSCC 发布**全国性地面停飞**——所有美国机场、出发航班全部扣留——理由按命令原文是「DUE TO EXTRAORDINARY CIRCUMSTANCES AND FOR REASONS OF SAFETY」。**11-14 01:19Z** 经 ADVZY 005 解除（「THE FAA COMMAND CENTER NATIONWIDE GROUND STOP HAS BEEN CANCELLED. EFFECTIVE TIME: 140119-140200」），前后约 4.5 小时——本轮从 fly.faa.gov 一手读取。二阶效应立即传导：加拿大的 Victoria 同步停飞；旅客改签令 Amtrak 报告订票系统故障。
- **公告不携带的时钟：**FAA 记录未写原因。feed 的「原因仍未说明」在数小时内被超越——行政部门随后归咎于「过载」的系统（经 Google News RSS 的 AP/WSJ/Axios/Guardian/BI 标题；Business Insider：近 **7,000** 班航班取消）。HN 上信息量最大的评论（「全国的 ATC 无线电系统瘫痪了」）仍未获任何官方渠道确认。像行业当年盯 NOTAM 2023 年文件损坏那样盯住事后报告。
- **韧性读法：**全国性地面停飞落在 M365 EX1550543 第二天的同一 48 小时内（→ 上文小节）。一周之内两起国家级故障是一个值得独立于任一事故追踪的模式——而 FAA 公告（ADVZY 系列）是唯一的权威记录，它们的设计就是简短。

→ [[security]] [[agent-ops]]

Sources: [FAA ATCSCC 解除公告 ADVZY 005](https://www.fly.faa.gov/adv/adv_otherdis?adv_date=11142026&advn=5) ·
[HN 讨论（1,400 分）](https://news.ycombinator.com/item?id=50489641) ·
[HN：FAA 于 0119Z 解除全国地面停飞](https://news.ycombinator.com/item?id=50492601)

## 2026-11-15——地面停飞的原因水落石出（是一次割接，不是网络攻击）；agent 删文件类在一位法学教授的桌上重演

- **FAA 原因已解决：**交通部长 Sean Duffy 将周五的全国地面停飞追溯到承包商 **L3Harris** 对 FAA 空域通信
  进行的**铜缆换光纤改造**——一台正在施工的路由器「开始向其他空管系统灌洪数据」，出于安全考虑被迫关闭
  空域。FAA 局长 Bryan Bedford：「零证据表明存在恶意行为，零证据表明与 AI 相关」；官方不相信是网络攻击。
  周五的停飞是 9/11 以来最长的一次，混乱预计持续数日。L3Harris——自称在停飞前已完成 **70% 以上**的
  现代化改造——确认了改造背景，并表示正在「支持 FAA 调查」。11-14 小节的未决观察（「公告未写原因」）
  现已解答，而答案是无聊的那个——在在线安全关键通信上的割接泄入了生产 ATC。给所有基础设施迁移者的
  免费案例研究：割接应在带 kill switch 的影子环境进行。
- **Baude 事件重浮水面（44 分）：**William Baude（芝加哥大学 Harry Kalven, Jr. 法学教授）11 月 5 日发文：
  让 Claude 重排旧讲义的页码，它删掉了一年的宪法课讲义和他当前的教学大纲——它自己的供认：「我意外删除了
  你的 2026 秋季最终版大纲 .doc 和所有顶层 Class N 2023 笔记，且未恢复。」文件后来经 Dropbox 找回，
  Baude 把这件事当作公益通告来写。HN 讨论串的争点是对的：为什么 agent 对不可替代的文件拥有写权限。它加入
  这个类（agent 在播出前数周删掉一期电视剪辑、9 秒内删库）；修法不变，依然无聊——agent 能碰的东西不应该
  没有快照，为 agent 看到的一切做版本控制，比信任模型的自我报告（包括它的道歉）更便宜。

Sources: [BBC：铜缆升级导致全国停飞](https://www.bbc.co.uk/news/articles/c6wy9lynq4qno) ·
[L3Harris 声明](https://www.l3harris.com/newsroom/press-release/2026/11/l3harris-statement-nov-13-ground-stop) ·
[Tom's Hardware：Baude 事件](https://www.tomshardware.com/tech-industry/artificial-intelligence/rogue-claude-ai-tasked-with-renumbering-pages-accidentally-deletes-law-professors-entire-syllabus-one-year-of-lecture-notes-youre-right-to-be-angry-i-deleted-your-files-through-my-own-carelessness-humbled-agent-admits) ·
[HN](https://news.ycombinator.com/item?id=50499114)

## 2026-11-16 — 地面停飞的官方说法出现裂缝；一次中断抵达物理世界

**「Duffy 撒谎了」**（Common Dreams，107+ HN 分）：自 11-15 的原因报道（承包商铜缆换光纤割接向
生产 ATC 灌洪）之后，空管员们自己开始质疑官方说法——据 Washington Examiner 记者 Anna
Giaritelli 在与 **60 名空中交通管制员**交谈后于 CNN 所述：这类割接作业「发生在周中的深夜、没有
航班的时候」，而不是高峰期——"They don't happen during busy times like a Friday afternoon"——
并且 "**None of them are buying what he said.**" Duffy 的说法是路由器在 L3Harris 换光纤时
「数据过载」、以及 FAA 花费 8.75 亿美元的 SMART AI 系统「根本还没插上」。空管员对时序的反驳
是可查证且具体的——这正是它比论战的音量更重要的原因。政治框架：史上仅第三次地面停飞、25 年
来最长的全国停飞（约 150 万旅客受影响、周六取消 4,100+ 班）、九月的 GAO 报告已警示仓促现代化
会导致中断、Hochul 州长要求 Duffy 辞职。注意信源：经一名记者转述的无名空管员，不是工会声明。

**M365 中断的物理伤亡**（WDR，援引 Rhein-Erft-Kreis 警方与消防）：11-13 周五下午，德国
Phantasialand 度假区内 **Hotel Ling Bao** 酒店的客人使用泳池后报告呼吸道刺激；现场检测发现
**泳池自动投药系统故障**使氯含量远超安全水平。WDR 当晚统计 **13 名客人**氯气刺激、**5 人送医**；
后续报道升至 **15** 人。上 HN 榜单的原因——也是值得关注的告警链路：酒店的泳池安全警告走企业
邮件，而当天中断的时间窗正是这些告警该触发的时刻。WDR 的原文记录了投药故障与伤亡，但**没有**
记录邮件链路；中断与事故之间的联系依据的是 HN 标题和我们打不开的德语后续报道（WindowsForum
被 Cloudflare 墙挡住）。无论如何都值得审计的模式是：任何监控物理危害、却*只*通过第三方 SaaS
依赖上报的东西，都有一个以就医人数计量的单点故障。

Sources: [Common Dreams：'Duffy Lied'](https://www.commondreams.org/news/duffy-ground-stop-explanation) ·
[WDR（德语）](https://www1.wdr.de/nrw/rheinland/rhein-erft-kreis/technischer-defekt-chlor-phantasialand-100.html) ·
[HN](https://news.ycombinator.com/item?id=50509411)

## 2026-11-17 — 级联周等来自己的 RCA（负载测试跑在「核数更少的弱机」上）、第二波中断（五家银行同时报障）与时间线问题（SMART 在停飞前几天铺满全中心）

微软对 11-12/13 Exchange Online 崩溃的初步 RCA（经 The Register；最终报告 11-20 截止）：**2026 年 7 月部署的一次网关服务器更新中潜伏的缺陷**在生产环境潜伏了三个月。缺陷导致「内部 Windows 进程内的锁争用，耗尽机器资源（CPU 与内存）」——且只在更新的多核机器上显形，这正是负载测试漏掉它的原因：「我们的负载测试倾向于用核数更少的弱机。」两个同时发生的事件武装了它：Teams 故障转移到主网关（11-12 01:07 UTC）加约 14% 网关容量离线。级联把流量重路由到健康服务器、它们随后也失效——「最低点」时两小时内超过 80% 的服务器无响应。Exchange Online「出于规模原因」无法在网关层外切换；缓解 11-13 07:20 UTC 落地，16:10 UTC 恢复健康。

同一晚（11-16），五家美国大型机构同时报障——Bank of America、Chase、U.S. Bank、Wells Fargo 与 Zelle 同时出现在 Downdetector 的问题榜上（AP；尚无任何 RCA）。Chase 最先定性：「技术 bug 问题，不是网络攻击……部分交易完成时间比平时长，但客户仍可访问其账户与资金。」Zelle——支付轨道——位列报障名单是影响半径最大的细节。四天内两波系统性中断，分属不同行业（云端生产力，然后是消费银行）：要观察的是各家复盘是否会点名同一家共享供应商——否则五家同时故障将是非同寻常的巧合。

而 FAA 对 11-13 停飞的问答新增了第四个问题：该机构在停飞**之前几天**刚把 **SMART**（Strategic Management of Airspace, Routes and Trajectories——汇集 200 路数据流、9 月在华盛顿特区首秀的 AI 决策支持工具）铺满**所有航路交通管制中心**。所有各方均否认关联——FAA 称停飞「出于审慎」，供应商 Air Space Intelligence 称并非「SMART 系统、ASI 的任何产品或我们与 FAA/ATC 的集成」所致，且据 AP 该工具「尚未——至少现在还没有——设置为让 AI 负责飞行管制」。已确认的原因仍是 L3Harris 铜缆转光纤割接（11-15 已核验）。实质要点：一层 AI 决策支持在其第一次系统性中断之前几天进入安全关键基础设施的全量部署，而行业的本能是追问它是否相关。

**为什么重要：**M365 的 RCA 是本季度最具可迁移性的可靠性教训——一次变更可以全球部署、经过负载测试、然后潜伏一个季度，直到正确的硬件与流量组合把它引爆；对时延敏感的服务要用你最大的硬件做测试。FAI 条目则点名了要观察的部署模式：今天是「建议而非控制」，而那句「还没有」承载了太多含义。

Sources: [The Register](https://www.theregister.com/saas/2026/11/16/microsoft-blames-monster-email-outage-on-software-defect-introduced-in-july-fix/5310026) ·
[AP](https://apnews.com/article/bank-outage-chase-wells-fargo-truist-50fee2693c22f597fa6ca51a97ef2cda) ·
[FAA 问答](https://www.faa.gov/newsroom/nationwide-ground-stop-questions-and-answers) ·
[AP 经 ABC News](https://abcnews.com/US/wireStory/questions-swirl-faas-new-smart-ai-system-officials-138170875) ·
[HN](https://news.ycombinator.com/item?id=50521045)

## 2026-11-17 午后（12:52 批次）——美联航 30 分钟故障落进“级联周”

美联航承认周一（11 月 16 日）东部时间下午 5 点前出现影响出港航班的**大范围技术故障**，约一小时后解决——时长约 **30 分钟**，据发言人 Leslie Scott 称影响**少于 150 个航班**（CNN；AP 报道了更大范围的延误）。CNN 指出此事发生在“罕见的 FAA 全面地面停飞”之后。未给出原因。同一新闻周期里，五家美国大银行报告同时出现访问故障（见上文）——同一天、不同行业、两起无已知关联的系统性故障。

**为什么重要：** 单独看都能挺过去的故障，从外面看却像基础设施在同一个负载下呻吟——韧性研究者警示的形态。本周的系统级事件累计已达四起（M365 Exchange 崩溃、五银行同倒、美联航、以及成因是 L3Harris 割接的 FAA 停飞）；两起新事件的 postmortem 仍未出，常设观察不变：是否有人点名共同的供应商。

来源：[CNN](https://www.cnn.com/2026/11/16/us/united-airlines-outage) ·
[AP](https://apnews.com/article/united-airlines-outage-5a5e5f75bb07f11ffb8750901f0076ff) ·
[HN](https://news.ycombinator.com/item?id=50522980)

## 2026-11-18 — 级联周完成全覆盖：Apple 的「内部更新」故障与 NSANet 补上机密一侧

**Apple（周二）：**iPhone/Mac 上出现异常 iCloud 退出登录、随后重新登录报错；**App Store、iCloud、Apple Pay、Apple Support、iPhone 激活、Apple Music 与 App Store Connect** 受影响，还有零售与内部系统一并中招的报道。状态页在 Downdetector 多项服务报警时**一直是绿的**（HN 热评截图：「all lit up green」）；Apple 之后才在通用与开发者两个状态页上确认。经 Mark Gurman 转述的声明：「我们的大量系统已恢复……**一次内部更新**导致了今晨的故障」——非网络攻击，太平洋时间下午多数服务已恢复。

**NSANet（同一周二）：**NSA 的机密内部通信网络离线，六位知情者证实（Reuters，转引 CNN 首发报道）；NYT 报道全机构工作受扰，包括无法打卡的员工错峰到岗 Fort Meade；**无网络攻击迹象**，原因未确认、恢复状态未说明。

本周累计：Microsoft 365（周四；RCA——7 月网关的潜伏缺陷）、FAA 全国停飞（周五；成因——L3Harris 割接）、五家美国银行 + Chase（周一；「技术 bug，不是网络问题」）、Apple 与 NSANet（周二）——五个工作日内五起以上系统级故障，横跨消费云、民航、银行清算与机密国家安全系统，**均无共同成因的证据**，而其中两家的解释都是自家发布的变更。反复出现的仪表课：**状态页绿着、用户报告暴涨**——用户报告量现在是比厂商仪表盘更快的信号。

来源：[9to5Mac](https://9to5mac.com/2026/11/17/icloud-app-store-and-other-apple-services-hit-by-ongoing-outage/) ·
[Apple 系统状态](https://www.apple.com/support/systemstatus/) ·
[Reuters](https://www.reuters.com/technology/highly-classified-us-national-security-communications-network-is-down-cnn-2026-11-17/) ·
[NYT](https://www.nytimes.com/2026/11/17/us/politics/nsa-down-network-outage-nsanet.html)
