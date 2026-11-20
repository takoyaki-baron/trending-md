---
date: 2026-11-20
updated: 2026-11-20T12:28:42Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 42
license: CC-BY-4.0
---

# trending.md — 2026-11-20

## 1. Claude 解决两个黑洞物理学开放问题 — 并且把局限性一并公布了

- **Velocity:** ▮▮▮ trending
- **Source:** Anthropic · HN 199+ pts · ~2.6小时前 (~01:27 UTC+8)
- **Tags:** `ai-research` `physics` `agents` `formal-verification` `lean`

Anthropic 的研究文章（11 月 17 日发布，今晚登上 HN）描述了 Claude Fable 5.2 智能体的两项成果：今年 8 月研究员 Hongbin Chen 请 Claude 列出开放问题后，这些智能体"在后台、无任何特殊配置、自主运行了约六周"。**成果一：** 在 N=4 超对称杨-米尔斯理论中，与黑洞形成类似的热情相变"在弱耦合和强耦合下都是突变的"——Claude 完成了 Aharony 等人 2003 年设立的计算，而且另一位物理学家用不同方法独立做同一问题得到了相同答案。**成果二：** 在三维量子引力的模自举（modular bootstrap）中，Claude 找到并**证明了最优性**的最轻黑洞质量上界 M₁ ≤ c/Λ，其中 Λ 有精确公式、约为 9.1266——改进了此前 Hartman、Mazáč、Rastelli 证明的 c/8.5 上界。自举证明已于 9 月"在 Lean 中完成形式化验证"，其中一条路线是一名智能体从球堆积问题借来"谱曲线"工具，另一半"沿用了 OpenAI 证明的策略"。预印本已上线（2611.00174、2611.00175）。

**Why it matters:** 这是迄今最有力的公开实例：智能体跑完一场为期数周的研究战役，带独立复现和机器检查的证明——不是跑分，而是关闭了一个开放问题。文章对自己的局限也异常坦率："两个结果都不能直接描述我们所在的宇宙"，都未解决量子引力，中间耦合区的突变性仍是猜想。可引用的结论是*方法*，而局限性要随结论一起传播。

> 一名智能体的关键贡献是注意到数值上界随中心电荷移动时被错过的模式——这一步把一个数值观察变成了此前无人用于该问题的证明策略。

[`🔗 Anthropic：Claude 解决两个黑洞物理学开放问题`](https://www.anthropic.com/research/claude-black-hole-physics) · [`🔗 预印本：模自举上界 (2611.00174)`](https://hexagonmath.org/2611.00174v1) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50563148)

---

## 2. 英国法庭裁决：政府经由获授权的媒体吹风泄露了自己对苹果的加密命令的存在

- **Velocity:** ▮▮▮ trending
- **Source:** Investigatory Powers Tribunal · HN 276+ pts · ~3.7小时前 (~00:21 UTC+8)
- **Tags:** `encryption` `privacy` `policy` `uk` `e2ee`

调查权力法庭（IPT）于 11 月 19 日就苹果对内政部技术能力通知（Technical Capability Notice）的挑战作出裁决（[2026] UKIPTrib 9，案号 IPT/26/191/CH 及 IPT/25/83-86/CH）——这道 2025 年 2 月被媒体报道披露的秘密命令要求获取 iCloud 端到端加密备份的访问权，导致苹果向英国用户撤下了高级数据保护（ADP）。苹果主张该通知的存在"绝不可能损害国家安全"；法庭认同这一事实如今已在本案程序中被确认，并更进一步针对政府"不确认也不否认"（NCND）的立场写道：**"证据表明政府在本语境下并未一贯适用 NCND"**，并推断"多个政府消息源在未经吹风授权的情况下向媒体吹风是极不可能的"——也就是说，世界得知这道命令靠的是官方吹风，而非泄密。通知的*内容*仍保密于同日下达的 PRIVATE 与 CLOSED 判决，Privacy International、Liberty、Ian Hosein 与 Ben Wizner 代表 NGO 出庭介入。

**Why it matters:** 实体之争——英国能否强令为全球用户提供端到端加密的服务开后门——仍未裁决；判决书本身也指出 2026 年 12 月开审已不现实，实体审理将拖入 2027 年。今天变化的是问责程序：一道秘密命令的存在获得司法确认，而其内容仍属机密；法庭还点名政府在正式拒绝确认命令存在的同时，却在向记者吹风。

> 合议庭：Lady Carmichael（主席）、Chamberlain 法官与 Johnson 法官——2026 年 9 月 17 日听证，2026 年 11 月 19 日判决。

[`🔗 IPT 判决：Apple Inc 及 NGO 诉内政大臣`](https://investigatorypowerstribunal.org.uk/judgement/1-mr-vincent-kearney-2-british-broadcasting-corporation-v-1-chief-constable-of-the-police-service-of-northern-ireland-2-chief-constable-of-durham-constabulary-3-security-service-4-governme/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50562113)

---

## 3. "Fuck Your AI Safeguards" — 一名防御者被挡在自己安全工作门外的自述

- **Velocity:** ▮▮▮ trending
- **Source:** ounapuu.ee · HN 245+ pts · ~3.6小时前 (~00:27 UTC+8)
- **Tags:** `ai-safety` `claude-code` `security` `guardrails` `open-weights`

爱沙尼亚资深产品工程师 Herman Õunapuu 的这篇文章——写作缘起是黑客篡改 Selver 超市冷柜温度的事件——描述了他让 Claude Code 扫描自己的产品、寻找易修复的弱点。Claude 发现了一个真实问题（"一行代码即可修复的简单疏忽"），随后以安全护栏为由停止了工作。文章记录了他亲历的 Anthropic Cyber Verification Program：多个工作日的等待、政府身份证件、放弃数据保留豁免、不保证批准——而他只是想测试公开 PoC 利用对自己技术栈是否有效。他的绕行方案：一个欧盟托管的开源权重模型（他点名 GLM 5.3）验证了漏洞、实现了修复并确认解决。他的论点是那道不对称：被"清洗"过的开源模型没有这些摩擦，于是约束只绑住了防御者而非攻击者——文章结尾指责 Anthropic 让生态更不安全，并猜测这些限制是 IPO 相邻期的监管护城河。

**Why it matters:** 这是防御者摩擦之怨今年以来最尖锐的第一人称陈述——它在 Anthropic 纳斯达克挂牌次日发出，与一份有组织的声明（见第 6 条）遥相呼应。无论是否接受"监管护城河"的定性，其可操作的主张是具体且可检验的：一旦防御性扫描触发了护栏，开源权重能在同一小时内从欧盟境内提供替代方案。

> 同样的抱怨也出现在今天的 [Pete Warden 访谈](https://thedataexchange.media/pete-warden-moonshine/)（第 8 条）中，只是方向相反：白帽研究者"会不断绊倒在那些出于好意内置的限制和护栏上"正是他论证本地 AI 必胜的第一件展品。

[`🔗 Fuck Your AI Safeguards (ounapuu.ee)`](https://ounapuu.ee/posts/2026/11/19/unsafeguards/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50562262)

---

## 4. 继昨日报道 Java4Shell 之后：该漏洞自 9 月 9 日起就躺在 OpenJDK 自己的 PR 队列里

- **Velocity:** ▮▮ rising
- **Source:** OpenJDK GitHub PR · HN 251+ pts · ~8.3小时前 (~19:45 UTC+8)
- **Tags:** `java` `openjdk` `cve` `memory-safety` `jvm`

昨天的故事是 Java4Shell（CVE-2026-114938）——经由 OpenJDK 的 AVX-512 Base64 内在函数实现预认证代码执行，叙事围绕"AI 辅助一小时内发现"。今天 HN 挖出了 [PR #32781](https://github.com/openjdk/jdk/pull/32781)，"8392044: AVX-512 Base64 decoder overwrites output buffer on short padded tail"，**创建于 2026-09-09**——同一个漏洞，细节齐全（掩码向量路径在非法输入上算出错误的 `output_mask`，"在返回 Java 之前写越逻辑输出长度，破坏堆"），附修复建议，并勾选了 OpenJDK 的临时 AI 政策确认框。它始终没等到必需的两份评审；bridgekeeper 机器人在闲置 8 周后发出警告，PR 于 **2026-11-04 自动关闭，未合并**。Oracle 的 CVE 记录（2026-11-17 发布，状态 `Analyzed` → 11-19 起为 `Modified`）载有 Oracle 自己的 CVSS 3.1 **8.1**（AV:N/AC:H），影响 Java SE 8u511/17/21/25/27 与 GraalVM。昨天傍晚，HN 用户已在 PR 下追问作者为何关闭。

**Why it matters:** 一小时内由 AI 发现的叙事需要加一条脚注：该漏洞在 OpenJDK 自己的公开队列里躺了八周才被自动关闭，比 Oracle 记录发布早六周。JIT 的 Base64 路径上一个预认证堆破坏原语，就在交付它的项目自己的眼皮底下公开可见——这与其说说明 AI 辅助发现，不如说暴露了评审容量真正卡在哪一环。

> PR 正文对触发条件很谨慎：合法输入（长度为 4 的倍数）永远打不到它——破坏只在非法输入时发生，而这恰恰是服务端必须默认会到达的那类输入。

[`🔗 OpenJDK PR #32781（2026-09-09 创建，2026-11-04 自动关闭）`](https://github.com/openjdk/jdk/pull/32781) · [`🔗 CVE-2026-114938`](https://www.cve.org/CVERecord?id=CVE-2026-114938) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50558906)

---

## 5. 无署名的"Gestalt"登顶盲评设计基准 — HN 的裁决：把作品拿出来看

- **Velocity:** ▮▮ rising
- **Source:** contralabs.com · HN 103+ pts · ~9小时前 (~19:03 UTC+8)
- **Tags:** `benchmarks` `design` `ai-models` `elo` `leaderboard`

Contra Labs 与 BenchFlow 的 Frontier Design Benchmark 用来自 Contra 市场的 33 份真实客户设计任务评审模型，由 **68 名职业设计师经 4,311 次盲评两两对决**、按 35 个评分维度打分（评分尺与设计师评分相关性 r = 0.94）。其 17 个条目的 Elo 榜单把一个名为 **Gestalt** 的条目排在第 1——高于"Human golden"（真实设计师作品），领先 Claude Fable 5.2、Claude Opus 5.5 与 GPT-6.1 Sol。这几乎就是全部可验证的内容：落地页**没有任何 Elo 数值、没有日期、Gestalt 无任何署名，也从不用"stealth"标注任何条目**——公开图廊里也看不到这个神秘条目的作品。HN 提交者的标题（"两个隐身模型刚刚出现在排行榜上，都在 Fable 5.2 之前"）在页面上只对得上一个明确无署名的条目。讨论区的反应是一致的怀疑："随机某个 AI 实验室自造一个新基准，把自己至少一个模型排在 Fable 5.2 前面"，"终极的'信我，哥们'操作"，以及直接发问：为什么没有任何地方找得到叫 Gestalt 的模型。

**Why it matters:** 基准营销季正在见顶——一个匿名模型击败所有前沿系统的新榜单，正是当下这股怀疑论校准的目标。有意思的是方法论层面，而且可检验：具名职业设计师的盲评是真实方法，但没有分数、日期和样例输出的榜单，要你信任的只有叙事本身。盯住 Gestalt 是否在别处出现即可——讨论区的猜测者点名 GLM 5.5 或在昇腾上训练的 DeepSeek，均未证实。

> 讨论区唯一有实质的观察：Kimi K3.1 Pro 在页面自己的"slop"指标上得分很高，却拿到了不错的职业点评——"slop"与"设计师品味"量的是不是同一件事，值得盯着。

[`🔗 Frontier Design Benchmark（Contra Labs × BenchFlow）`](https://contralabs.com/frontierdesign) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50558559)

---

## 6. "Anthropic 不是一家安全的 AI 公司" — 科学家、法学学者与 Hugging Face 联创签署 IPO 周声明

- **Velocity:** ▮▮ rising
- **Source:** misanthropicstatement.com · HN 136+ pts · ~27小时前 (~01:03 UTC+8)
- **Tags:** `ai-safety` `anthropic` `ipo` `industry` `open-source`

一份与 Anthropic 公开上市时机精准配合的联盟声明，经由 Business Wire 新闻稿发布、在 misanthropicstatement.com 签署，指控该公司"用安全品牌招揽投资者、员工和公众——同时悄悄弱化自己的安全承诺，并为利己的监管游说"，结论是：**"Anthropic 不是一家安全的 AI 公司，我们必须拒绝它以更大的善为名攫取权力的鲁莽尝试。"** 具名签署者包括 Steven Pinker（哈佛）、Thomas Wolf（Hugging Face 联合创始人兼首席科学官）、Laurence Tribe（哈佛法学院荣休教授）、Stephen Fry 与 Rumman Chowdhury（Humane Intelligence）——这份名单横跨知名的 AI 怀疑论者与知名的反末日论者，HN 讨论区把这读作声明的真正要点：这是对 Anthropic 自我呈现的一种批评，而不是一种世界观。

**Why it matters:** AI 安全叙事的重构已从博客随笔升级为具名联盟，并把打击时机对准资本市场事件——声明落地于 2 万亿美元纳斯达克挂牌后 24 小时内，与上文["Fuck Your AI Safeguards"一文](https://ounapuu.ee/posts/2026/11/19/unsafeguards/)几乎同时。对开发者而言，实际信号是："安全"作为厂商品牌已成 contested territory，开源权重阵营（Hugging Face 联创在其列）正在公开打对反品牌牌。

> 声明的核心指控具体到可以随时间检验：Anthropic"悄悄弱化了安全承诺"——它自己的政策变更史就是双方都要争夺的引文。

[`🔗 The MisAnthropic Statement（签署名单）`](https://misanthropicstatement.com/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50548485)

---

## 7. Garage Door Spam：五百个赞，只为把云端从车库门里拆掉

- **Velocity:** ▮▮ rising
- **Source:** blog.harrison.page · HN 598+ pts · ~76小时前 (~00:15 UTC+8)
- **Tags:** `self-hosted` `homekit` `iot` `ratgdo` `open-source`

Harrison Page 的文章是本周 HN 最大讨论串，主题并非无线电攻击——"spam"指的是 Chamberlain myQ 应用里糊满的广告，而那是车门开合推送通知的唯一官方途径。他的替代方案：两块 **ratgdo32** 板子（每块约 62 美元）运行开源固件，直接接在开门机端子上、以本地方式说 LiftMaster 的 Security+ 2.0 协议：HomeKit 与 Siri 控制、每门独立 Web UI、Tailscale 子网路由实现远程访问，外加一个 cron 任务（`garage-watch`，夜间每 10 分钟一次）在车门未关时经 Slack 告警——他自嘲这是把父亲童年的水银开关走廊灯技巧用软件复刻了一遍。他还向 ratgdo 项目合并了一个小 PR。"一切本地运行，无云端"，而且通知现在能识别*是谁*开了门——myQ 从来做不到。

**Why it matters:** 这个模式每周都在重演——厂商加广告或砍第三方 API（Chamberlain 在 2023 年底干了后者），然后一个开源固件项目承接需求。ratgdo 是值得记住的形态：廉价 ESP32 硬件接到既有端子、协议级本地控制、云端从必需品降级为可选项。讨论串的热度就是市场信号：只要存在可信的本地路径，硬件所有者会立刻把设备迁出厂商云。

> Chamberlain 于 2023 年底切断第三方 myQ API 访问；myQ 云至今仍是厂商支持的唯一通知路径。ratgdo32 固件兼容 ESPHome/HomeKit，项目接受上游 PR——包括作者的这一个。

[`🔗 Garage Door Spam (blog.harrison.page)`](https://blog.harrison.page/garage-door-spam/) · [`🔗 ratgdo32 固件（GitHub）`](https://github.com/ratgdo/homekit-ratgdo32) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50519231)

---

## 8. Pete Warden 为本地 AI 立论 — 并称 Chrome 内置的 4B 模型是"iPhone 时刻"

- **Velocity:** ▮ steady
- **Source:** thedataexchange.media · HN 163+ pts · ~4.4小时前 (~23:39 UTC+8)
- **Tags:** `local-ai` `open-weights` `voice` `edge-ai` `moonshine`

The Data Exchange 对 Pete Warden（TensorFlow Lite/Moonshine）的访谈主张：本地模型的能力"只落后前沿模型几个月"，差距在于营销与包装而非质量——当年把 Apache 与 Postgres 推过商业对手的经济学正在重演。节目里的硬件账：9B 模型 4 比特量化装进 4GB；苹果 256GB 统一内存的机器已能以可用速度跑千亿参数模型。谈语音时，他给界面质量设的试金石是"你隔着房间会不会跟伴侣说话"，延迟预算在 200ms 附近，他的 Moonshine 工作如今在只有 500KB 内存 Pico 微控制器上跑起完整语音界面。他坚定站在"复合 AI"（compound AI）阵营——专用小模型流水线，并称端到端语音模型"更像一个营销词"；他还指出 Chrome 已内置约 4B 参数模型、可从 JavaScript 调用，他认为这可能是 LLM 的"iPhone 时刻"。谈推理硬件：他把 GPU 比作"试着开着油轮去街角买东西"，值得盯的是高带宽闪存。

**Why it matters:** 这篇访谈给本地 AI 立场配上了最可引用的经济学论证——免按量付费的推理、可审计的数据流、稳定版本号背后不会偷偷换模型——并且与今天的安全护栏文章（第 3 条）互为注脚：Warden 把白帽研究者被云护栏绊倒列为他的第一件展品。对任何在做智能体或语音产品的人，复合 AI 框架（组件独立、以文本为公共接口）可以直接落地。

> 他的硬件预言很具体：盯苹果——充裕的高速统一内存加纯推理加速，可能让独立 GPU 在推理上变成可选项，一如集成显卡当年让它在显示上变成可选项。

[`🔗 Pete Warden 谈本地 AI、开源模型与语音界面（The Data Exchange）`](https://thedataexchange.media/pete-warden-moonshine/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50561508)

---

## 9. "OpenAI 仍有 WebRTC 问题" — 语音智能体传输层的数学批评

- **Velocity:** ▮ steady
- **Source:** moq.dev · HN 86+ pts · ~6小时前 (~22:03 UTC+8)
- **Tags:** `webrtc` `moq` `voice-ai` `realtime` `protocols`

Kixelated 的续篇（今晚在 HN 传播）主张 OpenAI 的实时语音栈继承了 WebRTC 的会议假设，而这些假设对智能体是错的。WebRTC 激进丢弃晚到约 30ms 以上的音频、默认关闭重传——对人类够用（人靠推断补洞），对 LLM 是浪费：模型"被上下文阻塞"，听完整个话语才能作答，本有几秒的余量可供无形重传。说话侧更糟：TTS 出音频快于实时，WebRTC 智能体被迫在包间人为休眠，任何丢包都无法恢复；Opus FEC 只护得住单包丢失，而拥塞丢包是突发成串的。作者提议的替代是 Media over Quic：每个订阅声明延迟预算（语音对语音 500ms，精确的 STT→LLM→TTS 约 5s、共享一条连接）、基于时间戳的播放、经轨道切换实现打断。文章坦承这是带信封背面数学（1 秒 64Kbps Opus ≈ 8KB）和粗糙个人 demo 的观点文——并指出修 WebRTC 本身这条出路已停滞十年：playout-delay RTP 扩展在 Google 的 libwebrtc 里只做了视频，自 ~2016 年起如此。

**Why it matters:** 语音智能体正在快速铺开，而它在坏网络下的失败模式是一个没人重新审视的传输选择——智能体让你重说一遍，只因一份老会议预算判定晚到的包一文不值。MoQ 替代方案（在延迟预算耗尽前一直重传）具体到可以原型验证，作者还链接了一个正在做这件事的 Pipecat PR。

> 门禁观察也许是全文最经久的一条：让 WebRTC 的播放行为适配智能体的修复，十年前就作为扩展合并了——仅限视频——而推进它需要 Google 点头。

[`🔗 OpenAI still has a WebRTC Problem (moq.dev)`](https://moq.dev/blog/webrtc-is-still-the-problem/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50560461)

---

## 10. Chrome 的 AI 功能被指每月消耗"数百 GB"带宽 — 但这只是一位管理员的测量

- **Velocity:** ▮ steady
- **Source:** perishablepress.com · HN 86+ pts · ~3.2小时前 (~00:51 UTC+8)
- **Tags:** `chrome` `browser` `privacy` `bandwidth` `on-device-ai`

Jeff Starr（Perishable Press）报告他的服务器侧带宽用量几个月前"冲破了天花板"，在他逐一关闭 Chrome 的**"AI innovations"与端上 AI 设置**（他报告这些默认开启）后，网络监视器显示流量"几乎归零"，他归因于 Chrome 的用量达到每月字面意义上的数百 GB 量级。文章自己把证据基础说得很直白：一张设置页截图、一次活动监视器观察、以及一句"用你喜欢的网络监视器自己复现"的邀请。没有日志、没有前后对照表、没有设备或系统细节——这是一位管理员的轶事，不是测量研究，讨论区的反应也是如此对待的。

**Why it matters:** 无论数字能否复现，它提出的检查成本极低，而底层问题是真实存在的：会周期性同步模型的端上 AI 功能，在机器集群上能搬动可观的流量，而最终在企业出口账单里看见它的正是 IT 管理员。如果你在大规模管理 Chrome，这篇文章的价值是那页待审计的设置和一个一晚就能做完的实验——而且时机耐人寻味，恰与上文本地 AI 经济学论述同周出现。

> 数量级请按未验证对待：文中没有测量窗口与方法论。它的可操作内容是设置项位置与"自己动手复现"的方法。

[`🔗 Chrome AI features wasting much bandwidth (perishablepress.com)`](https://perishablepress.com/chrome-ai-wasting-much-bandwidth/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50562636)

---

## 11. Foolscap：一个读你的书、但绝不替你写一个字的写作应用

- **Velocity:** ▮ steady
- **Source:** foolscap.works · HN 98+ pts · ~7小时前 (~21:03 UTC+8)
- **Tags:** `writing-tools` `ai` `show-hn` `publishing`

今日 Show HN：Foolscap 自称"一个了解你整本书的写作应用"——写作时它"注意什么彼此呼应、什么还悬而未决，并用你自己的话指给你看"，呈现手稿中的结构关系与未收束的伏线。它的差异化定位是承重墙，且说得直白：**"它绝不替你写一个字。"** 这是写作 AI 的分析侧——连续性、伏笔回收、悬空设定——不带生成侧，与替你起草的工具正面相异。隐私方面，站点称你的文字永不用于训练 AI，而按书设置的私密模式意味着"它的任何内容都不会流向任何 AI"——这暗示云端 AI 默认在链路里。讨论区的争论如期而至：不带生成的结构分析，究竟是写作者真正想要的功能，还是同一条路上的又一步？

**Why it matters:** 在 AI 写作工具竞相生成更多内容两年之后，反其道而行——读尽一切、一字不写——本身正在成为一个品类。值得盯的设计选择是默认值：一个在你不选择退出时就把手稿送往云端 AI 的分析伴侣，与本地优先的主张是完全不同的信任命题，写作者会问清楚这是哪一种。

> Show HN 讨论区就是这类定位之争的公开决斗场——"绝不替你写"这句话承担的，通常是定价页的职能。

[`🔗 Foolscap`](https://foolscap.works/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50559749)

---

## 12. Launch HN：Onlook 重建为真实代码库上的可视化画布 — 支持自带智能体

- **Velocity:** ▮ steady
- **Source:** GitHub · HN 50+ pts · ~3.5小时前 (~00:33 UTC+8)
- **Tags:** `design-tools` `developer-tools` `open-source` `agents` `yc`

Onlook（YC W25）今日以 Launch HN 重新出发：一款 Apache-2.0 桌面应用（27.3k stars），打开你机器上的任意 git 仓库、运行你自己的 dev server，把活的应用放上无限画布，移动端/平板/桌面帧并排同屏——设计师直接编辑真实运行的应用，而不是日后要重建的 mockup。编辑可视觉操作或对话完成，采用**自带智能体**模式：不捆绑模型，接入你已有的 Claude Code 或 Codex 账号，外加 MCP 连接器；改动落在安全的 worktree 副本中，经一键 PR 交付。它可导出自包含的 HTML/PNG/JPEG/PDF，本地优先（源码构建无需账号），目前仅支持 macOS，Windows 与 Linux 在等候名单中。当前应用是彻底重写——README 把旧浏览器版（v1 分支）与 Electron 应用（`onlook-dev/desktop`，自 2025 年 7 月起停止更新）标为前身。

**Why it matters:** 设计工具与智能体的边界正从两侧合拢——Figma 在加代码，智能体在加像素——Onlook 的赌注是：持久的位置是直接在运行中的应用上设计，用你已经付费的任何智能体。自带智能体也是一句安静的定价宣言：拒绝在你的 token 上加价，这正变得稀有。

> "画布跑你的 dev server"这一架构意味着框架支持继承自你自己的工具链——任何 dev server 能渲染的东西，画布就能显示。

[`🔗 onlook-dev/onlook（GitHub）`](https://github.com/onlook-dev/onlook/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50562320)

---

## 13. Ghost-Downloader-3 一天连发两个版本 — 顺势登上 trending

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · 今日 +449★ (~00:40 UTC+8 发布)
- **Tags:** `download-manager` `open-source` `qt` `chinese-oss` `cross-platform`

中国开源下载管理器 Ghost-Downloader-3（12.4k stars，今日 +449）凭**今日连发的 v4.5.9 与 v4.5.10**（v4.5.8 昨日落地）登上趋势榜。v4.5.10 新增阿拉伯语、马来语与土耳其语并迁移到 Crowdin 翻译管理，Linux 包开箱支持 fcitx5 输入法，改进 Aria2 RPC 对子目录与相对路径的兼容，并修复一批 i18n 与 UI 缺陷（包括 v4.5.9 引入的"界面语言卡在中文"）。项目架构才是看点：Qt 内核加可加载的**功能包**——m3u8 流媒体、BitTorrent、eD2k、哔哩哔哩——外加对 HuggingFace、arXiv、GitHub 与 yt-dlp 链接的内置处理，覆盖 Windows（x86_64/arm64）、macOS（Apple Silicon/Intel）、Linux（AppImage/deb/tar.xz）与 Android，所有资产附 SHA256 校验。维护者注明开发将放缓："因个人学业，更新频率会降低。"

**Why it matters:** 模型发布季让 HuggingFace 与 arXiv 链接成为真实的下载负载，一个对这两类站点有一等公民处理——外加多连接加速——的下载器，吃到的是真需求而非趋势算法。功能包设计也是可持续开源的一课：协议支持以可选模块交付，内核在维护者时间收缩时仍可构建。

> 发布卫生值得抄作业：每个资产都带 SHA256 校验，v4.5.10 的说明明确点名它修复的是 v4.5.9 的哪个回归。

[`🔗 XiaoYouChR/Ghost-Downloader-3（GitHub）`](https://github.com/XiaoYouChR/Ghost-Downloader-3) · [`🔗 发布说明：v4.5.10`](https://github.com/XiaoYouChR/Ghost-Downloader-3/releases)

---

## 14. NVD 的 11 月 19 日批次：Mandiant 给 .NET 反 CSRF 库打出 9.3，Meilisearch DoS 修复，以及 Geany 命令注入

- **Velocity:** ▮ steady
- **Source:** NVD / cve.org · 11 月 19 日发布记录（首条 ~10:17 UTC+8）
- **Tags:** `cve` `dotnet` `meilisearch` `geany` `vulnerability`

昨日 NVD 批次中有三条值得行动。**CVE-2026-131914** —— ASP.NET 上的 **Idunno.AntiCsrf ≤ 0.9.1 Beta** 在"双提交 cookie 与表单字段校验"中存在不可信数据反序列化，"远程未认证攻击者……可经对象注入执行代码"；由 **Mandiant 评为 CVSS 4.0 9.3**（`mandiant-cve@google.com`，是记录仍处 `Received` 状态时的 Secondary 指标）。**CVE-2026-132750** —— Meilisearch 1.55.1 之前与 1.56.x 的 1.56.1 之前版本，过滤解析中存在二次方内存消耗路径（针对搜索基础设施的 DoS 原语）；修复已发布——11 月 2 日的 1.56.1 与 11 月 16 日的 1.57.0。**CVE-2026-132756** —— Geany 至 2.1.0，经打开文档中的内嵌 shell 命令实现 OS 命令注入（8.5）。三条记录的分数均由 VulnCheck 或 Mandiant 评定；NVD 分析尚未跟上任何一条。

**Why it matters:** 没有一条是头版蠕虫，但第一条是个提醒：安全*辅助*库同样是攻击面——一个在校验路径上反序列化攻击者可控数据的反 CSRF 库，是在反转自己的存在意义；而来自 Mandiant（非厂商自评）的 9.3 说明研究者是认真的。Meilisearch 运维应确认版本在 1.56.1+；记录的修复链早已发布，所以这是一个版本检查，不是一场等待。

> 分数出处，一如既往：9.3 是 Mandiant 的 CVSS 4.0，挂在一条 `Received` 记录上——背后尚无 NVD 分析，记录仍可能移动。

[`🔗 CVE-2026-131914（Idunno.AntiCsrf）`](https://www.cve.org/CVERecord?id=CVE-2026-131914) · [`🔗 CVE-2026-132750（Meilisearch）`](https://www.cve.org/CVERecord?id=CVE-2026-132750) · [`🔗 CVE-2026-132756（Geany）`](https://www.cve.org/CVERecord?id=CVE-2026-132756)

---

## 15. "这套架构不是设计出来的，是堆出来的" — 从 4004 到 486 的 x86 故事

- **Velocity:** ▮ steady
- **Source:** pikuma.com · HN 177+ pts · ~29小时前 (~23:03 UTC+8)
- **Tags:** `cpu-architecture` `history` `x86` `intel` `retrocomputing`

Gustavo Pezzi 的长文（2026 年 10 月，正在 HN 回潮）沿着 x86 谱系从 4 位 4004——为 Busicom 计算器而生——走到 8086/8088、286、386 与 486，主张把 ISA 当作一份历史档案来读。每个负载都是穿着工程外衣的商业决定：小端字节序与寄存器组可追溯到 CTC 设计的 **Datapoint 2200** 终端（而非 Intel）；AX/BX/CX/DX 之所以存在，是因为 8086 对 8080 提供的是*源*兼容；分段（segment × 16 + offset）是 16 位寄存器够到 1MB 的办法，而 640KB 的 DOS 限制是 IBM 内存映射的选择，不是 CPU 的约束。286 的保护模式进得去出不来——逼出 IBM 的键盘控制器复位补丁与 A20 门（Intel 直到 2013 年 Haswell 才放弃）——Gates 骂它是"brain-damaged"。386 加了 32 位寄存器与分页，却因单一供应商点燃 AMD 诉讼；486 换引擎不换架构，5 级流水线翻转了优化规则（LOOP 从此慢过 `dec/jnz`）。

**Why it matters:** 人们至今仍在咒骂的每一条 x86 兼容包袱——A20 门、段运算、寄存器命名——都能追溯到 1971–1989 年间的某个交付期限或合同，而文章留全了凭据。无论你在写模拟器、做复古开发，还是单纯在争论 ISA 设计，它都是关于"兼容性为何是无期徒刑"的最干净的单文件叙述。

> 命名尾注正是论点落点：486 的后继者没法把"586"注册成商标，于是有了 Pentium——营销接管了一个竞争对手已学会利用的编号方案。

[`🔗 The History Behind the x86 CPU: 4004 to 486（Pikuma）`](https://pikuma.com/blog/history-of-x86-4004-to-486) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50546967)

---

## 16. "软件公司在试图杀死家庭计算？" — 那篇七月文章迎来它的时刻

- **Velocity:** ▮ steady
- **Source:** lateblt.livejournal.com · HN 174+ pts · ~20小时前 (~08:03 UTC+8)
- **Tags:** `essays` `subscriptions` `ownership` `windows` `industry`

lateblt 2026 年 7 月的 LiveJournal 长文回潮至 174 分：软件不会磨损，所以一次性售卖在结构上已死——而行业的应对，是把本地计算搞得足够难受，让"租"显得更体面。凭据横跨二十年：Windows 产品激活（2001）终结一证多机安装，Windows 11 的 React Native 开始菜单与 TPM 2.0 门槛，GTA 6 无光盘发售，Adobe 2013 年的 CC 转型，本地 Exchange 要求订阅外加"Software Assurance"——他的类比：一家汽车公司带着致命设计缺陷，却"期望每位客户支付 500 美元来修好这个问题"。文章最锋利的一转是同情 TempleOS 作者 Terry Davis——引用"文件权限不属于消费级产品"——并指出 Linux 也从 UNIX 继承了这些概念。结论：这是一场"针对你使用计算机软件能力"的"主动战争"，作者预计它永不结束。

**Why it matters:** 这篇文章把所有权对租赁的论证讲透了，而这一论证不断在具体战役中重现——myQ 广告（第 7 条）、车库门式固件接管、云可选工具把"本地优先"变成营销卖点。它写自爱好者侧翼，但同一逻辑正是"可离线运行"在 2026 年重新出现在企业工具推介中的原因：默认不再是本地，于是本地成了要额外出售的功能。

> 值得与车库门讨论串对读：同一个诊断，一篇是宣言，另一张是 124 美元的账单加一个 cron 任务。

[`🔗 Software companies are trying to kill home computing?（lateblt）`](https://lateblt.livejournal.com/526188.html) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50554010)

---

## 17. Fanzines.app：在浏览器里解出 8 页小册子的折叠排版

- **Velocity:** ▮ steady
- **Source:** krthr.co · HN 159+ pts · ~6.8小时前 (~21:15 UTC+8)
- **Tags:** `zines` `print` `front-end` `diy` `browser-tools`

Wilson Tovar（krthr）拆解了他 fanzines.app 背后的印前拼版问题：一张 A4 纸对折三次、沿中缝剪开，就是一本不用订书钉的 8 页小册子——但平铺版的版式对谁都不友好，因为折叠让页面落在奇怪的位置、上排要倒着印（第 6、5、4、3 页旋转 180°，压在 Back/Cover/1/2 一排之上）。他厌倦了每次在 Photoshop 里转图、对列，于是让应用在浏览器里完成拼版：你把内容放进小册子的逻辑页，它产出可直接打印的平铺版。文章本身也是一份友好的折纸入门——单是那张示意图就值回访问。

**Why it matters:** 单一用途的浏览器小工具持续赢得 Show-HN 式的关注，因为它移除一处精确的摩擦而不索取任何东西——不设账号、隐私向变体不上传、无需安装。拼版也是计算机帮助毫无歧义的罕见问题：折叠是固定几何，工具要么排对，要么排错。

> 文中那张展开页的 ASCII 图——哪几格要倒着印、页面按什么顺序落位——就是完整规格说明，而且只有四行长。

[`🔗 Paper, folds, and what's new in fanzines.app（krthr.co）`](https://krthr.co/paper-folds-and-whats-new-in-fanzines-app/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50559719)

---

## 18. 勒索软件团伙泄露与摩根大通、Visa、Mastercard 相关的客户数据 — 途径是第三方营销供应商

- **Velocity:** ▮▮▮ trending
- **Source:** Wall Street Journal · HN 133+ pts · ~4.8小时前 (~07:32 UTC+8)
- **Tags:** `security` `breach` `banking` `third-party-risk` `ransomware`

据 WSJ 报道，一个被追踪为 **n0n** 的勒索软件团伙公布了从服务于摩根大通、Visa 和 Mastercard 的第三方营销供应商处窃取的数据；三家机构均表示被攻击的是供应商，而非其核心系统。对该泄露的报道（cybernews，经 MSN 转载）称其中包含摩根大通约 **16,000 名最富有持卡人**的电子邮件地址和电话号码；银行自己的声明则刻意收窄："我们相信攻击者获取了这些供应商持有的部分营销数据，可能包含部分客户姓名和电子邮件地址。"注意这是与周二"五银行故障"不同的事件——那是 Chase 本地硬件故障波及其他银行的交易链路；这是从营销供应链窃取数据，已在 X 上发声明披露。

**Why it matters:** 失败单元持续外移——先是银行核心系统（本周的故障级联），现在是替银行保管客户联系数据的营销供应商。如果团伙泄露站上的数字成立、而银行的描述停留在"姓名和电子邮件地址"，那么供应商丢了什么与银行承认了什么之间的落差，就是接下来每一轮披露中最值得盯的故事。

> 团伙名称与 16,000 这个数字来自泄露站报道（cybernews/MSN），而非银行——在机构的事件报告落地前，把它们当作攻击者的叙事框架来对待。

[`🔗 WSJ：Visa、Mastercard 和摩根大通客户数据被黑客泄露`](https://www.wsj.com/finance/banking/visa-mastercard-and-jpmorgan-customer-data-leaked-by-hackers-3b5a0f87) · [`🔗 Reuters：摩根大通、Visa、Mastercard 称第三方供应商遭网络攻击`](https://www.reuters.com/legal/government/jpmorgan-says-third-party-vendors-targeted-cyberattack-2026-11-19/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50568082)

---

## 19. 继昨日报道 Gemini 4 Neon 之后：它现在登顶 Models Engineering Index

- **Velocity:** ▮▮▮ trending
- **Source:** git-aarvin.github.io/mei · HN 245+ pts · ~4.7小时前 (~07:35 UTC+8)
- **Tags:** `ai-models` `benchmarks` `gemini` `engineering` `leaderboard`

昨天的故事是 Neon 作为 Google 中端档位发布，以 $3/$15 在 Intelligence Index 排第三。今天另一个独立维护的产物——**Models Engineering Index**，一个单人维护的项目——把 **Gemini 4 Neon 排到第一，指数 68.0**，超过 Claude Fable 5.2（65.3）、GPT-6.2 Astra（61.5）、Gemini 4 Carbon（61.4）和 Claude Opus 5.5（61.1）。方法才是有趣之处：它把七个工程基准（CursorBench、FrontierCode、Code Migration、IOI、ProgramBench、Terminal-Bench、Vibe Code）的分数标准化后，同时拟合模型效应与基准效应，使模型不会因挑到容易的基准而得利。在成本轴上，Neon 的成本倍数是 1.6×，而 Fable 5.2 是 6.4×——排名翻转与价格差距是两个不同的主张，这份指数对两者都给出了陈述。

**Why it matters:** 基准营销季正在见顶（见上文第 5 条匿名的"Gestalt"），可信的制衡是方法透明——无实验室背景、公开拟合方式、每个子基准都展示。一份指数把昨天的中端档位排到旗舰模型之上，也是中端正在吃掉前沿这一论点的具体数据点，而 Neon 的定价正是为这个论点设计的。

> 把它当作某个维护者的聚合视图而非行业共识——但它是那种你能从页面出发实际复算数字的产物。

[`🔗 Models Engineering Index`](https://git-aarvin.github.io/mei/) · [`🔗 Google：Introducing Gemini 4 Neon`](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-neon/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50568130)

---

## 20. OpenSSL EVP_EncodeBlock() 缓冲区溢出 — CVE 已公开、修复已提出、尚无发布版包含它

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub PR · HN 54+ pts · ~2.2小时前 (~10:01 UTC+8)
- **Tags:** `openssl` `cve` `memory-safety` `tls` `c`

CVE-2026-121481（2026-11-18 发布，`Awaiting Analysis`）："调用 EVP_EncodeBlock() 时若输入长度接近 INT_MAX，可能导致编码输出大小的计算溢出，并写到调用者提供的输出缓冲区之外。"记录上的 **9.8** CVSS 3.1 来自 CISA-ADP 富化容器（Secondary 指标，org `134c704f-…`）——既非 NVD 分析，也非 OpenSSL 自己的评分。提出的修复是 [PR #33652](https://github.com/openssl/openssl/pull/33652)，由 nmouha 于 11 月 10 日发起，**至今仍开放未合并**：对无效输入（NULL 缓冲区、负长度、编码后放不进 int 的尺寸）返回 `-1`，与 wolfSSL 的兼容层做法一致，并为 `EVP_DecodeBlock()` 提出了类似的防护。PR 描述写道"The OpenSSL SRT has asked for it to be fixed publicly; the advisory is still pending."（OpenSSL SRT 已要求公开修复；公告仍在等待中。）目前没有任何已发布的 OpenSSL 版本包含该修复——最新的是 10 月 23 日的 4.1.0。

**Why it matters:** Base64 编码无处不在，但暴露面是逐应用而定的：溢出需要调用者把攻击者可控的、接近 INT_MAX 的长度传进 `EVP_EncodeBlock()`，所以 9.8 是库影响层面的数字，你的风险取决于你的调用点。产物缺口才是操作层面的事实——CVE 公开、PR 公开、公告未出、无可安装之物——因此修复动作是盘点（谁在用未校验的长度调用 EVP_EncodeBlock？），而非升级。

> 评分来源照例注明：9.8 是 CISA-ADP 的，挂在 NVD 尚未分析的记录上——等 OpenSSL 自己的公告落地时记录仍可能变动。

[`🔗 CVE-2026-121481`](https://www.cve.org/CVERecord?id=CVE-2026-121481) · [`🔗 OpenSSL PR #33652（开放，未合并）`](https://github.com/openssl/openssl/pull/33652) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50569226)

---

## 21. Synology 在 DSM OAuth API 中投下 9.8 — 修复承诺"2026-11-20 前发布"，缓解措施就是今天的动作

- **Velocity:** ▮▮ rising
- **Source:** Synology · HN 119+ pts · ~6.1小时前 (~06:13 UTC+8)
- **Tags:** `nas` `cve` `synology` `oauth` `self-hosted`

Synology 公告 SA-26:21（2026-11-19 15:47 UTC+8 发布）：**CVE-2026-120382**，DiskStation Manager 的 **OAuth API** 中 CWE-88 参数分隔符未正确中和，厂商自评 **CVSS 3.1 9.8**——远程攻击者可读写任意文件并发起拒绝服务攻击。影响 DSM 6.2.4 至 7.4 各线（各分支列明具体版本号）以及 BeeStation OS 1.5。当下即有效的缓解措施：**停用 OAuth Service 套件（Deactivate the OAuth Service package）**。修复版本——DSM 7.4.1-90080-2 与 7.3.2-86009-6——"定于 2026-11-20 前发布"，即承诺今天发布，公告发出时尚未上线；7.2.x 用户被建议跨分支升级到 7.3.2。截至今天 ~04:12 UTC 检查时 NVD 还没有该 CVE 的记录，~13:25 UTC+8 与 ~21:10 UTC+8 复查时仍无——CVE Program 自己的注册表（cveawg）也没有记录，说明该 id 已预留但尚未发布；上文引用的 9.8 与 CWE-88 是 Synology 自己公告的原文（向量 `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H`），已对照公告（仍为 Revision 1，构建仍是"scheduled"——在承诺日期当天 21:10 UTC+8 检查时仍未上线）一手复核；这也是 Synology 一周内的第二起事件：*另一个* DSM 漏洞 CVE-2026-10441 已于 11-18 进入 KEV 目录，附带三天联邦整改期限。

**Why it matters:** 自建云的装机量巨大——Synology NAS 承载着从家庭照片库到小企业文件服务器的各种负载——而一个在多数安装中默认启用、可未认证任意文件读写的漏洞，正是最快被武器化的那类。缓解措施今天就能做；升级是一个带日期的承诺。

> 评分来源：9.8 是 Synology 自己公告里的分数，NVD 记录尚未发布——引用前请再查，别写成"已获 NVD 分析"。

[`🔗 Synology SA-26:21（DSM、BeeStation OS）`](https://www.synology.com/en-uk/security/advisory/Synology_SA_26_21) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50567209)

---

## 22. PostgreSQL 19 发布：REPACK (CONCURRENTLY)、计划建议与并行 autovacuum

- **Velocity:** ▮▮ rising
- **Source:** postgresql.org · HN 99+ pts · ~14.2小时前 (~22:11 UTC+8)
- **Tags:** `postgres` `database` `release` `performance` `vacuum`

年度大版本昨日落地，主角是运维侧：**REPACK (CONCURRENTLY)** 可在不阻塞读写的前提下回收表膨胀，并能按索引重排表数据——取代阻塞访问的 `VACUUM FULL`/`CLUSTER`（两者为兼容保留）。计划稳定性方面新增 **pg_plan_advice** 扩展（用"计划建议"迷你语言钉住或试验计划）与 **pg_stash_advice**——按查询标识存储建议并自动应用，不改动应用代码即可修复劣化计划。autovacuum 现在能用**并行 worker** 清理索引（`autovacuum_max_parallel_workers`），并按新的评分系统决定先处理哪些表；查询执行期间会把页面标记为 all-visible，缩减未来的 vacuum 工作量。其他亮点：备库读己之写（read-your-writes）一致性、逻辑复制初始化不再需要重启服务器（首个逻辑槽创建时自动提升 WAL 级别），以及新的监控视图（`pg_stat_lock`、`pg_stat_recovery`、`pg_stat_autovacuum_scores`）。

**Why it matters:** 膨胀清理十年来一直是 Postgres 生态里第三方工具形状的空洞（`pg_repack` 用户懂这套舞步）；把它内建——而且是并发地——移除了最后一个需要让表离线的常规理由。计划建议对每个在凌晨三点看着好计划因统计信息变动而翻车的人来说，是一场安静的革命。

> 升级窗口的读法：托管厂商首日即上线（Neon 与 Databricks Lakebase 都在数小时内宣布支持）——单凭 REPACK 命令，就足以成为繁忙写入密集表的升级理由。

[`🔗 PostgreSQL 19 发布（postgresql.org）`](https://www.postgresql.org/about/news/postgresql-19-released-3449/) · [`🔗 Snowflake：用 Postgres 19 Repack 压缩表`](https://www.snowflake.com/en/blog/engineering/postgres-19-repack-table-bloat/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50560357)

---

## 23. Lastbook：离线"重建社会"知识库 — 本地 Gemma、离线地图、374 分

- **Velocity:** ▮▮ rising
- **Source:** lastbook.org · HN 374+ pts · ~13.6小时前 (~22:47 UTC+8)
- **Tags:** `offline-first` `local-ai` `preparedness` `open-source` `maps`

Lastbook 是一个开源（MIT）桌面应用，支持 Mac（Apple Silicon）、Windows 与 Linux，把一套生存与重建知识库打包为完全离线运行：用于问答的**本地 Gemma 4 26B A4B**、**258,000+ 个可搜索的离线地点**（消防局、庇护所、供水与医疗 POI）、2,324 个离线视频，以及涵盖急救、安全饮水、食物保存、关键维修、电力与撤离规划指南。定位写在标语里："Free, local, offline and private."。仓库（`Immortal-Protocols/lastbook`）创建于 11 月 12 日，已有约 2,600 stars 且持续推送——几天前的 Show HN 只有 19 分，昨天的重投拿到 374 分。

**Why it matters:** 这是本地 AI 论点（第 8 条）编译成的一个产物：模型、索引、地图和视频，无连接。沉睡的特性是离线 POI 索引——四分之一百万个可搜索地点，是断网时不降级的部分，也是多数"离线百科"项目跳过的部分。

> 八天的新仓库，动得很快——374 分是关注度，不是履历；观察这个库是长大还是分叉。

[`🔗 Lastbook`](https://lastbook.org/) · [`🔗 Immortal-Protocols/lastbook（GitHub）`](https://github.com/Immortal-Protocols/lastbook) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50560822)

---

## 24. Jeveration：冻结的 VLM 单次前向生成图像 — 78 毫秒，"比现有统一模型最快快 122 倍"

- **Velocity:** ▮▮ rising
- **Source:** Hugging Face 每日论文 · 116+ upvotes · ~24小时前 (~12:00 UTC+8, 11-19)
- **Tags:** `ai-research` `image-generation` `arxiv` `single-forward-pass` `vlm`

Hugging Face 每日榜单的头名论文把一个冻结的视觉语言模型改用于 System One / 决策模型范式下的生成——并行预测，而非逐 token 解码。摘要原文："Jeveration generates a 512x512 image in 78 ms, up to 122x faster than existing unified models, while maintaining competitive image quality and dense prediction performance."（Jeveration 在 78 毫秒内生成 512×512 图像，比现有统一模型最快快 122 倍，同时保持有竞争力的图像质量与稠密预测性能。）一个检查点覆盖文生图、图生图与稠密预测，各自一次前向完成。一致性难题——同一提示对应多幅有效图像，并行预测必须收敛——通过让所有位置以共享随机状态为条件来解决；又因模型"在直接图像监督下倾向忽略该状态"，先用离散图像码上的学习分布来引导这一次前向。

**Why it matters:** 决策模型阵营（本周的 HeyGen Decision 1、Perplexity 的 Decider 线）刚刚拿到了生成侧的展品：78 毫秒是任何自回归图像解码器都够不着的延迟预算；而把生成与稠密预测统一进一个检查点，是把复合模型之梦写成产物。常规保留意见照旧——512×512 与论文自选的基准集定义了"有竞争力"。

> 方法谱系本身就是故事：决策模型用于判断的那种"快速并行预测"，如今被用在了像素上。

[`🔗 arXiv：Jeveration (2611.24738)`](https://arxiv.org/abs/2611.24738) · [`🔗 Hugging Face 论文页`](https://huggingface.co/papers/2611.24738) · [`🔗 Carol-lyh/Jeveration（GitHub）`](https://github.com/Carol-lyh/Jeveration)

---

## 25. Firecrawl 以 Firecrawl Local 为中心重塑品牌 — 一个 Rust 二进制、本地 MCP、云端 Alexandria

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · 共 204k★ (~12:10 UTC+8 检查)
- **Tags:** `agents` `web-scraping` `mcp` `rust` `open-source`

这个 204k-star 的"为智能体抓网页"仓库凭一次定位重塑登上趋势：11 月 19 日的 README 重写（[PR #5855](https://github.com/firecrawl/firecrawl/pull/5855)）把一句话简介改为"Knowledge infrastructure to make your agents smarter"（让智能体更聪明的知识基础设施），并让 **Firecrawl Local** 打头——原文是"Run Firecrawl on your own machine as one binary that turns websites into clean markdown, plugs into your AI agent as an MCP server and serves the Firecrawl API on localhost"（在你自己的机器上把 Firecrawl 跑成一个二进制：把网页变成干净的 markdown、作为 MCP 服务器接入你的 AI 智能体、并在 localhost 上提供 Firecrawl API），可从 crates.io 安装。云侧则围绕搜索与 **Firecrawl Alexandria**（"550+ 数据提供商"研究索引）重构。需要说清楚这是什么：自 6 月的 v2.11.0 以来没有新版本发布——这是定位变更加一个 Rust 二进制，不是版本升级。

**Why it matters:** 抓取类目正在收敛为知识基础设施——索引优先的答案，以本地优先的二进制为楔子——而"本地二进制 + MCP"正是所有智能体数据工具正在汇合的形状。对自托管者来说，无需数据库、队列或容器的 crates.io 二进制才是值得评估的具体交付物。

> 把这波趋势读作战略信号：教智能体抓网页的仓库，如今想成为"在抓取之前就给出答案"的那一层。

[`🔗 firecrawl/firecrawl（GitHub）`](https://github.com/firecrawl/firecrawl) · [`🔗 Firecrawl（firecrawl.dev）`](https://firecrawl.dev/)

---

## 26. RegExr 下线自己 — 声明里写着"AI 黑客"

- **Velocity:** ▮ steady
- **Source:** regexr.com · HN 61+ pts · ~5.9小时前 (~06:27 UTC+8)
- **Tags:** `regex` `security` `web-history` `legacy` `ai-hacking`

一代开发者用来学正则的测试器/可视化工具 RegExr 现已"临时下线"，公告直白地写明原因："RegExr 的代码库已经老化，加上 AI 黑客的存在，我们认为保全你的数据的最好方式是下线站点，直到我们有机会现代化并加固它。对此次中断深表歉意！"该站有账号与用户保存的正则——正是 AI 辅助攻击经济学已经从理论变成日常的那个长尾画像：受爱戴的工具、老化的代码、小维护者、存着用户数据。

**Why it matters:** 这是 AI 攻击曲线的退役阶段：无力资助重写的站点，如今把攻击者当作下线而非在线的理由。本周的故障与漏洞级联有一条安静的尾巴——成千上万个 RegExr 形状的服务正在用更少的体面做同样的计算。

> 反事实值得一说：面临风险的只是正则表达式——而下线仍然跑赢了风险赔率。把这套算式放大到每个带账号的爱好型服务上去。

[`🔗 RegExr：临时下线`](https://regexr.com/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50567374)

---

## 27. Platypush 重建语音管线 — 本地 microwakeword、中间是 OpenAI、附上完整凭据

- **Velocity:** ▮ steady
- **Source:** blog.platypush.tech · HN 71+ pts · ~7.4小时前 (~04:57 UTC+8)
- **Tags:** `voice-assistant` `self-hosted` `wake-word` `home-automation` `platypush`

platypush 作者 Fabio Manganiello 11 月 19 日的文章两个月内第二次重建他的自托管语音助手，而最诚实的是动机：他"对自己自托管管线的高误报/漏报率不满意，也对其在嘈杂环境和廉价麦克风下检测语音起止的鲁棒性不满意"。新栈把 **openwakeword 换成 microwakeword**（本地唤醒词），语音识别用 **assistant.openai**，并以 **assistant.vosk** 作本地后备；响应经 openai（云或本地），发声用 **tts.openai** 或 **tts.piper**。文章附完整配置与代码改动，以及与真实房间过招后幸存的那些注意事项。

**Why it matters:** 复合 AI 论点（第 8 条）有了一份可运行的实现账本：在时延与隐私绑住的地方用本地（唤醒词），在准确率仍然取胜的地方用云（STT），每一段都有成文的后备链。这是"全本地"原教旨与把厨房交给亚马逊之间的实用中间地带——而且它以误唤醒率为尺度，不是凭感觉。

> "两个月重建一次"的节奏本身就是发现：自托管语音进步得够快，技术栈本身是个移动靶。

[`🔗 重建我的语音助手管线（blog.platypush.tech）`](https://blog.platypush.tech/article/Rewriting-my-voice-assistant-pipeline) · [`🔗 BlackLight/platypush（GitHub）`](https://github.com/BlackLight/platypush) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50566261)

---

## 28. Vint Cerf 谈 TCP/IP 为何从未申请专利 — 以及他离开 Google 后的星际互联网创业

- **Velocity:** ▮ steady
- **Source:** seremot.com · HN 48+ pts · ~3.2小时前 (~09:06 UTC+8)
- **Tags:** `internet-history` `tcp-ip` `openness` `interplanetary` `podcast`

João Tomé（前 Cloudflare）上线 Future Stories 播客，首位嘉宾是 Vint Cerf，访谈里带着真新闻：83 岁的 Cerf 在 Google 二十年余后于今年离开，正参与创办 **Tolero**——为行星之间的互联网造软件，"光速太慢了"。谈到 TCP/IP 为何从未申请专利，他的回答是战略性的而非情怀式的："25 年后我们的盟友会是谁？我们不知道。所以我们认为，能确保盟友也能用上它的唯一办法，就是干脆把它开放。"那些轶事也值回票价：一个随机崩溃困扰两周、好友 Steve Crocker 三十秒定位（"问题就在这"——他关于协作的论证），以及 1989 年 CERFnet 上线时他与网络总监把一瓶闪光彩屑砸在思科路由器上。

**Why it matters:** 开放性的论证如今每周都在 AI 许可之争中被重新审理——本月早些时候那篇主张所有 AI 生成的代码都应开源的文章就是其中一轮；这里是协议层的版本，被表述为地缘保险而非意识形态。而行星际互联网创业是一个可以持续追踪的具体新产物，不是一篇回忆。

> 命名轶事：CERFnet 想叫 SURFnet，被荷兰人占了，于是借用了他的名字——他答应的理由是没人会怪罪"被命名的那个人"。

[`🔗 Vint Cerf 谈 TCP/IP 为何从未申请专利（seremot.com）`](https://seremot.com/p/vint-cerf-on-why-tcpip-was-never) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50568861)

---

## 29. Frostbite：一套由 AI 设计的通用 CPU 宣称 4.59× 每瓦性能——细则就写在它自己的脚注里

- **Velocity:** ▮▮▮ trending
- **Source:** architectlabs.com · HN 150+ pts · ~2.1小时前 (~18:05 UTC+8)
- **Tags:** `ai-hardware` `chip-design` `agents` `interaction-nets` `lean`

Architect Labs 继 Redwood 之后的第二步：**Frostbite**，一颗通用 CPU，其 ISA、微架构、RTL、验证与最终 GDS 全部由 agent 集群围绕一个新的执行模型产出——**交互网**（interaction nets，Lafont 1990）：用类 Rust 的 **Vine** 语言写出的程序被编译为一张图，并行性是显式的、空间性的，而不是靠乱序机制在运行时重新发现。在 7nm 版图上实测（GDS 中 500 MHz，quad + 4 个 L3 节点 = 0.792 mm²），他们报告在 25 个工作负载上（其中 10 个是 agent 调优所用的搜索集，**15 个留到最终评估才解锁**）对参照核（"TCPU"）取得 **4.59× 每瓦性能**与 **8.77× 每面积性能**的几何均值（held-out 集上为 3.83×）。能耗账目才是有意思的部分：取指/译码/发射从基线的 27% 降到 6%，代价是 26% 花在片上网络和一套硬件化的工作窃取调度器上——而按文章的说法，这套行为"从未由任何人类指定"。整个项目由一门内部形式化规范语言（ASL）撑住，最终降为 **80 万+ 行 Lean**；agent 集群在四轮搜索中提出的 58 个想法留下了 37 个。

**Why it matters:** 这是"AI 设计整颗芯片"这一论点迄今最完整的公开主张（OpenAI 的 RTL 工作、Anthropic 的 Mythos-AMD 训练让本周本就是这个主题——Frostbite 走得更远，把一个工作负载一路带到 GDS）。头条倍数值得配上传言，而且文章自己带了——只要读到摘要之后：基线在开篇被称作一款现代的、流片验证过的超标量 CPU，但结果部分的脚注把 TCPU 定义为双发射、顺序执行处理器，且"出于法律原因"不能透露其身份——按现代核心的标准这是个很弱的基线，而且所有数字都是流片前的（文章自己也这么说）。诚实的读法是：一个真正新颖的执行模型、一条严肃的形式化验证主线，以及一个含义是打赢小型顺序核而非 Zen 6 的 4.59×。

> 能推动这个主张的东西：文中承诺的 SPEC/PARSEC 对宽乱序大核的对比、FPGA 试验场，以及他们列为下一步的 RTL + ISA 开源——落地时都可用检查。

[`🔗 Introducing Frostbite（architectlabs.com）`](https://architectlabs.com/blog/frostbite) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50572503)

---

## 30. GrapheneOS："Google 正在说服 OEM 合作伙伴不要支持 GrapheneOS，甚至不要支持 bootloader 解锁"

- **Velocity:** ▮▮▮ trending
- **Source:** grapheneos.social（Mastodon）· HN 393+ pts · ~6.8小时前 (~05:20 UTC+8)
- **Tags:** `android` `privacy` `bootloader` `grapheneos` `oem`

GrapheneOS 项目官方账号昨晚（2026-11-19 20:40 UTC）发帖：**"Google 正在损害他们的 OEM 合作伙伴，把越来越多的功能和更新做成 Pixel 独占。与此同时，Google 正在说服 OEM 合作伙伴不要支持 GrapheneOS，甚至不要支持 bootloader 解锁。他们也在直接试图伤害 GrapheneOS。"** 帖子没有点名任何 OEM、没有文件、没有具体功能——这是项目自己的一家之言，这也正是 HN 讨论（393 分）在替所有人追问"哪些可验证"的原因：Pixel 独占多年来持续收紧，而整个行业允许 bootloader 解锁的手机集合也在不断缩小。

**Why it matters:** GrapheneOS 是 hardened Android 的选项——沙箱化的 Play 服务、按应用的网络与权限控制、安全研究者们推荐给别人的那一套。它的硬件路径恰恰经过这篇帖子所说的 Google 正在施压的 OEM 关系与 bootloader 解锁开关。如果指控成立，实际后果落在所有运行（或推荐）去 Google 化 Android 的人身上：受支持设备的池子停止增长。这一指控目前只有项目一方——等某家 OEM 公开表态，无论哪边。

> 这个模式与本周的平台守门主题押韵（Google 的"AI 要么用要么别搜"条款、Waymo 高速公路禁令）：平台的运营者同时也在卖替代品，而切换成本是你的。

[`🔗 GrapheneOS on Mastodon（2026-11-19）`](https://grapheneos.social/@GrapheneOS/117645038299496084) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50570479)

---

## 31. "我看得出这是你自己写的"——一份工科学生的报告得到了 2026 年最意味深长的夸奖

- **Velocity:** ▮▮▮ trending
- **Source:** em-online.bearblog.dev · HN 229+ pts · ~4.9小时前 (~15:15 UTC+8)
- **Tags:** `education` `ai-dependence` `essays` `engineering` `writing`

一位工科荣誉学位学生（Em）交了一份关于扑翼微型飞行器控制的 10 页报告——在 48 个小时的紧绷里写完，全程人写——导师的评语是：**"我看得出这是你自己写的"，**接着一句：*"最近收到了很多 AI 写的报告。"*这篇文章拆解了为什么这句话落下来像警告而不是表扬：作业说明以"强烈鼓励你探索 AI 的使用"开头，很快被读成*理所当然*；"我这个学位最难的一门课，是在一间砖墙无窗的机房里对着 AI 提示词过八小时一天"；整个行业正在把一代人训练成"高级保姆"。作者担心那个滑坡——被鼓励时用它，然后连一份要当面答辩的项目报告也外包出去——最后落在识字率、偏见识别和独立思考这些真正有风险的东西上。

**Why it matters:** 这是本周人力资本主线的教育侧证词——Jane Street 的面试改革、哈佛企业级研究显示 agent 把代码产出抬高 76% 而最终产出只涨 9–11%、以及昨天的[《我们需要在乎的人》](https://violetpixel.com/blog/2026-11-17-we-need-smart-people-who-give-a-shit/)一文。如今需要被明确说出的夸奖本身就是一个可测量的文化信号：当"人写"变得可被识别，它就变得稀有，而把它变得稀缺的机构正是发放安慰的那些。

> 最锋利的一句是结构性的而非感性的：学生要为一份必须当面答辩的项目评分，同时却被训练用一种从不需要为任何东西答辩的媒介来产出它。

[`🔗 "I can tell you wrote this yourself"（Em's Blog）`](https://em-online.bearblog.dev/i-can-tell-you-wrote-this-yourself/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50571189)

---

## 32. 继 11 月 10 日我们报道 FFmpeg 的 121 条 CVE 浪潮之后：9.1 "Gauss" 今日发布——整趟修复列车之后第一条稳定分支

- **Velocity:** ▮▮ rising
- **Source:** ffmpeg.org · HN 170+ pts · ~8.1小时前 (~12:00 UTC+8)
- **Tags:** `ffmpeg` `release` `multimedia` `open-source` `codecs`

FFmpeg 9.1 "Gauss" 于**今日（2026-11-20）发布**，2026-10-24 自 master 切出——9.1 分支的首个稳定版，接在 9.0 线末端 9.0.2 "Lei"（9 月 18 日）之后。更新日志共 32 条，主打：经 libastcenc 的 **ASTC** 纹理编解码（带 `.astc` 与 KTX 1.0 的 muxer/demuxer）、**大幅改进的 AAC 编码器**、**APV Vulkan 编码器**、LCEVC 载荷合并 bitstream filter、MVR demuxer、**libcurl 协议**支持、DVD-Audio LPCM 解复用、NVIDIA 光流加速，以及 iTerm2 内联图像 muxer。各库版本号全面前进（libavutil 61.19.100、libavcodec 63.24.100）。讨论串里还有一条结构性注脚：FFmpeg 的正典 git 现在住在 **code.ffmpeg.org**——项目自己的 forge 实例。

**Why it matters:** 十天前本 feed 报道过那波 121 条记录的 CVE 浪潮，其修复表述是"through 9.0.2"和"9.x before 9.0.2"——9.1 是把整条安全列车合并进一条新分支的首个次版本，外加 AAC 编码器的工作（互联网一半音频管线压身的那个编解码器）。任何在生产附近跑 FFmpeg 的人：CVE backport 和功能工作终于坐进同一棵树的版本线就是这条。

> 来源披露，一如既往：发布日期、分支切点、库版本均出自 ffmpeg.org 自己的下载页；这里的更新日志亮点是 HN 讨论串里携带的 release notes。

[`🔗 FFmpeg 下载页：9.1 "Gauss"`](https://ffmpeg.org/download.html#release_9.1) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50569998)

---

## 33. Jujutsu 入门：一篇把"工作副本本身就是一个提交"的 Git 兼容 VCS 讲明白的实战指南

- **Velocity:** ▮▮ rising
- **Source:** ethanlowman.com · HN 140+ pts · ~6.4小时前 (~13:40 UTC+8)
- **Tags:** `jujutsu` `vcs` `developer-tools` `rust` `stacked-prs`

Ethan Lowman 的 **Jujutsu Primer**（11 月 18 日）是迄今最好的单文件 `jj` 入门，今天正迎来它的 HN 时刻。它教的心智模型：在现有仓库里跑 `jj git init`，jj 与 git 并行追踪同一批对象；你的工作副本**就是一个提交**（每条 jj 命令自动快照），每个逻辑变更携带一个**变更 ID**，在 rebase 中保持稳定而提交 ID 不断换新；冲突被记录在提交上而不是叫停一切；op log 让 `jj undo`/`jj redo` 无所不能。再往后是 revsets、作为 git 分支的 bookmarks、自动生成的分支名（`push-<changeid>`）与 stacked-PR 工作流——并诚实地观察到 agent"相当擅长"用 jj-hunk 这类工具为评审拆分提交。两个值得记住的生态事实：发版很密（v0.47.1 于 11 月 5 日发布），jj 的作者 Martin von Zweigbergk 现在是为 jj 而建的新 forge **East River Source Control** 的 CTO。

**Why it matters:** jj 的设计选择与 agent 时代的工程流程吻合得可疑——自动 rebase、稳定变更 ID、冲突即数据、全量撤销。一篇入门冲上 HN 首页是采用信号；其下的 forge 新闻是基础设施信号。Git 不会走，但"工作副本即提交"的模型是它十年来面对的第一次认真的工效学挑战。

> 入门自己给出的尝试框架：jj 与 git 在同一仓库里并行运行，所以这个实验在构造上就是可逆的。

[`🔗 Jujutsu Primer（ethanlowman.com）`](https://ethanlowman.com/posts/jj-primer/) · [`🔗 jj-vcs/jj（GitHub）`](https://github.com/jj-vcs/jj) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50570628)

---

## 34. 英国的秘密冰箱行动：在攻击者找到漏洞之前，几万台冷柜被拔离开放互联网

- **Velocity:** ▮▮ rising
- **Source:** BBC News · HN 54+ pts · ~2.3小时前 (~17:50 UTC+8)
- **Tags:** `iot-security` `ot` `ncsc` `food-supply` `disclosure`

BBC 网络安全记者 Joe Tidy 揭露（发布于 2026-11-20 00:02 GMT，为压低风险一直压着没发）一场协同的英国防御：10 月下旬，制冷咨询公司 **Omega Solutions** 发现英国最受欢迎的制冷控制器——**Resource Data Management（RDM）**的设备——存在**"与今年欧洲冰箱黑客浪潮中被攻击的 Danfoss 及其他控制器类似的弱口令问题"**。Pen Test Partners 验证并扩大了发现；**NCSC、Defra 与 FSA** 组织行业电话会；覆盖超市、仓库、餐馆、加油站和体育场的数千台控制器被远程或以物理拔线的方式撤出开放互联网，一家大型连锁的 IT 团队"一周里每天让几百台设备下线"。背景是：10 月 11–12 日法国数百家站点经 Danfoss 系统被攻击；11 月 1–2 日波及七个欧洲国家的数十家超市（比利时与卢森堡最重）以及法国的血站；法国将此归咎伊朗，德黑兰否认。**RDM 对严重性有异议**——称利用它需要物理接触硬件（"一个在测试环境里发现的漏洞"，且该测试"包括拆解我们的硬件"）——但已发布首批补丁，并报告未见恶意活动迹象。Pen Test Partners 的 Ken Munro 指出所需硬件在 eBay 上很便宜："罪犯或国家级黑客搞明白它，大概只是几天的事。"

**Why it matters:** 这是本周中断与漏洞级联的运营技术（OT）尾巴——食品供应跑在带默认口令、暴露于互联网的控制器上，而奏效的防御朴素到极点：拔线、人工监控温度、打补丁。这也是本周引发 guardrails 之争的那类事件（第 3 条背后的冷冻柜攻击）的同一物种，只是这次附上了防御方的操作手册——以及一个罕见的、在武器化之前安静完成协同披露的公开范例。

> 把严重性之争当作标准的厂商/研究者鸿沟来读——RDM 称利用它需要物理接触硬件，PTP 则指出这些硬件在 eBay 上卖得很便宜——而 NCSC 无论如何都把它当成了值得一场全国行动的事。

[`🔗 数万台英国冰箱在秘密行动中获得保护（BBC）`](https://www.bbc.co.uk/news/articles/c6eq49zyx7p4o) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50572430)

---

## 35. GIMP 开始在每次合并时测试整个 UI——用 13 个真实窗口测试覆盖三十年的菜单

- **Velocity:** ▮ steady
- **Source:** gimp.org · HN 125+ pts · ~8.2小时前 (~11:55 UTC+8)
- **Tags:** `gimp` `testing` `ui-automation` `open-source` `ci`

GIMP 的新闻帖（11 月 16 日，Harsh Verma 撰写，今天重新浮起）描述了一套新的 **GUI 测试平台**：每个测试启动一个真实的 GIMP，点击真实的菜单与对话框，然后读回结果——目前 13 个测试，**每次合并**自动运行。文章对原因说得很精确：单元测试"并没有打开真实窗口"，所以无法判断一个对话框是否打开、一个菜单项是否完成了工作；而 GIMP 原有那些直接与核心代码交互的旧式 GUI 测试太容易坏掉——而且不是因为它们测到了 bug。覆盖面：启动与主窗口、欢迎对话框的标签页行为与"启动时显示"开关、文件→新建的尺寸、文件→导出为写出正确的 PNG、颜色交换与前景色输入、图层的增删、撤销/重做、缩放。

**Why it matters:** GIMP 是教科书级的缠绕代码库噩梦——恰恰是那种改一个对话框会悄悄弄坏另一个的项目。每次合并跑 UI 级测试，与上周 Claude Code 团队描述的纪律——当代码大部分由 agent 写成，测试套件就是管理层——是同一件事，只是由一个 30 年的志愿者项目来执行——而且它正是 agent 贡献者需要的护栏：agent 现在可以弄坏 UI，并在人类注意到之前被告知。

> 不起眼的数字才是故事本身：13 个测试对 GIMP 的界面而言覆盖极小，但每次合并都跑它们的平台是难的部分，而它已经完成。

[`🔗 GIMP：改进的图形用户界面测试`](https://www.gimp.org/news/2026/11/16/gimp-ui-tests/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50569985)

---

## 36. DeepMind 研究院追问"AGI 之后是什么"——并画出通往超级智能的四条路

- **Velocity:** ▮ steady
- **Source:** institute.deepmind.com · HN 81+ pts · ~9.4小时前 (~10:40 UTC+8)
- **Tags:** `agi` `deepmind` `ai-research` `governance` `essays`

Google DeepMind 研究科学家 Tim Genewein 于 11 月 19 日在 DeepMind 研究院网站发表这篇文章，而它的前提本身就是新闻：AGI"正在变得可及"，因此后 AGI 体制"正从哲学思辨转向实证研究与治理问题"。框架是：把通用智能看作一个连续统，ASI 的定义是在耗时数年的任务上以更少资源持续胜过人类专家*群体*；**"认知工业化"**作为过渡机制；从 AGI 到 ASI 的四条路径——**扩大模型与数据、技术范式转变、改进 agent 协调、递归自我改进（RSI）**——每条都有自己的动力学与不确定性。它要的是测量："沿 whichever 成形的道路，建立严格可靠的进度追踪方法"。

**Why it matters:** 当一家前沿实验室的研究院把后 AGI 路径形式化为实证议程，这个框架就从文章话语进入与基准指数、评估 harness 相同的机器——本周的 Models Engineering Index（第 19 条）与决策模型浪潮正是这张地图将来要对照的测量层。把它读成一家实验室带着自家框架的地图，而不是领域共识。

> 这篇文章诚实的重心：它把"AGI 可及"当作前提而非结论——四条路是一个用来查明这个前提是否成立的研究纲领。

[`🔗 What comes after AGI?（Google DeepMind Institute）`](https://institute.deepmind.com/essays/what-comes-after-agi/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50569519)

---

## 37. ChatGPT for SNES：跑在 Super FX 芯片上的 220 万参数语言模型，附诚实警告

- **Velocity:** ▮ steady
- **Source:** bxfoundry.com · HN 101+ pts · ~11.6小时前 (~08:30 UTC+8)
- **Tags:** `retrocomputing` `edge-ai` `snes` `language-models` `show-case`

Benj Edwards（BX Foundry）为超级任天堂做了一个聊天程序：0.7 版（标注 2026-11-02）在卡带的 **Super FX 2** 芯片上运行一个 **220 万参数**的语言模型，一次输出一个词——既能在浏览器里经 Snes9x 玩（约 4 MB），也能在真机上用 Super FX 烧录卡带（FXPak Pro / sd2snes）运行。第二个版本加了"事实书"：**15 万篇 Simple English Wikipedia 文章**的开头句存进 MSU-1 数据文件，模型可以像用搜索工具一样选择查阅。训练对话由 **gpt-oss-120b** 生成，代码由 AI agent 编写——页面上的诚实段落是设计的一部分：模型"认识约 8,000 个词，经常出错，有时还很自信"，而且整件事"非 OpenAI 制作或背书"。

**Why it matters:** 这是本地 AI 曲线的极值点（第 8 条）：一个每次击键都要等一拍的界面，跑在 1995 年的硬件上——以及一个完整的 AI 造物，从合成训练数据到 agent 写的代码。按它自己的描述这是个玩具，但它对语言模型物理上能跑在哪所划出的下界，比任何基准表格都清楚。

> "用键盘在游戏内屏幕键盘上打字"这个细节让设计约束变得可见：1995 年的 I/O 预算，2026 年的模型。

[`🔗 ChatGPT for SNES（BX Foundry）`](https://www.bxfoundry.com/chatgpt_snes/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50568548)

---

## 38. 权重空间编程正在变成一个研究领域：LLM 徒手写网络权重，如今还配上了"可编辑性"训练配方

- **Velocity:** ▮ steady
- **Source:** notesbylex.com · HN 105+ pts · ~62小时前（文章 11-18；论文 11-19 新鲜出炉）
- **Tags:** `ai-research` `interpretability` `weight-space-programming` `training` `benchmarks`

"前沿 LLM 能直接读取、写入并**编辑神经网络权重**"这个想法本周正在凝聚成一个小型文献。脉络是：RikiyaT 最初的 Weight-Space Programming 帖子——GPT-6 Astra 从零构建一个下围棋的网络，再通过自我对弈后编辑权重来改进它；Lex Toumbourou 的文章（11 月 18 日）以更严格的设定重跑——Claude Fable 5.2 为 MNIST **徒手设定一个 CNN 的全部 5,994 个权重**，不许拟合、回归或搜索——发现模型伸手抓向 1990 年代的手工滤波技术（Sobel 式模板），且 Fable 在该任务上明显胜过 Opus 5.5。然后是测量层：康斯坦茨大学的 **2611.26408**（Ropinski & Kranz，11 月 19 日）把 LLM 驱动的权重空间编程在视觉模型上做成基准——五个 LLM、**2,600+ 次编辑过程**，每次都在 held-out 图像上按成功率、副作用与精度损失计分——并提出 **Edit-Ready Training（ERT）**：在训练中预演 LLM 将执行的直接闭式权重编辑，为 GPT-6 Astra 与 Claude Opus 5.5 取得最高的平均编辑分。一个能在浏览器里观看权重空间编程运行的 TabbyML WebGPU playground 踏着同一波浪上了 Show HN。

**Why it matters:** 如果网络可以*被训练得可编辑*，模型改进的单位就不再是一次梯度下降运行，而是一次权重编辑——这对可解释性与安全都有双向含义（与 11 月 14 日的"权重空间错误折叠"威胁模型接上了）。早期、小网络、视觉任务——基准自己的边界——但这个方向现在有了基准、有了训练方法、有了可复现的实验日志，领域就是这样起步的。

> 跨模型的细节是最挑衅的部分：ERT 对*前沿*模型的编辑成功率提升最大——可编辑性也许是一种随规模增长的能力，而不是一个 hack。

[`🔗 Weight-Space Programming 像 90 年代研究者一样构建神经网络（NotesByLex）`](https://notesbylex.com/weight-space-programming-1990s) · [`🔗 arXiv：Training Vision Models for LLM-Driven Weight-Space Programming（2611.26408）`](https://arxiv.org/abs/2611.26408) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50538977)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-20T12:28:42Z |
| Items | 38 |
| Sources tracked | 42 (Hacker News, GitHub Trending, GitHub repos, Anthropic, hexagonmath.org, Investigatory Powers Tribunal, ounapuu.ee, cve.org, contralabs.com, misanthropicstatement.com, blog.harrison.page, thedataexchange.media, moq.dev, perishablepress.com, foolscap.works, pikuma.com, lateblt.livejournal.com, krthr.co, wsj.com, reuters.com, git-aarvin.github.io, synology.com, postgresql.org, snowflake.com, lastbook.org, huggingface.co, arxiv.org, blog.platypush.tech, regexr.com, seremot.com, firecrawl.dev, architectlabs.com, grapheneos.social, em-online.bearblog.dev, ffmpeg.org, ethanlowman.com, bbc.co.uk, gimp.org, institute.deepmind.com, bxfoundry.com, notesbylex.com, rikiyat.github.io) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[Previous day](2026-11-19.md) · [Raw .md](https://trending.md/zh/feed/2026-11-20.md) · [Archive](../archive/index.md)
