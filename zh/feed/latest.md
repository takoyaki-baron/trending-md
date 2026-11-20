---
date: 2026-11-21
updated: 2026-11-20T20:27:37Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 17
license: CC-BY-4.0
---

# 趋势 — 2026-11-21

## 1. 同日两个 GRH 证明宣告——一个"与 Claude 合作写出"，一个"全由人类完成"——旁边还躺着一个纳维-斯托克斯爆破主张

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 1,941+ pts · ~6h 前 (~22:15 UTC+8)
- **Tags:** `mathematics` `ai-assisted-proof` `lean` `grh` `navier-stokes`

11 月 20 日可能是多年来数学界最离奇的一天。Levent Alpöge 宣布了对黎曼猜想及其推广形式的证明主张——"I believe I have, working with Claude, discovered a proof"——而且没有可读的论文：论证以 Lean 形式化存在，打包成十四个 tar 分卷；Tao 称之为"an (enormous) Lean-only proof of the Generalized Riemann Hypothesis"。同一次宣告覆盖了三个结果：Tao 的文章按"in decreasing order of how 'digested' the results currently are"排序——三维无外力 Euler 方程有限时间爆破证明（Alpöge、Buckmaster、Coiculescu，"heavy AI assistance"，已 Lean 形式化）、无外力纳维-斯托克斯爆破（Alpöge & Buckmaster，79 页论文外加约 60 万行 Lean 库，[仓库](https://github.com/tristanbuckmaster/navier-stokes)昨日创建），以及 GRH。而剧本没人敢写的转折是：斯坦福的 Ravi Vakil 同日公布了*第二个独立的* GRH 主张——Alessandro Masullo 的草稿，因为"this is urgent"而在开会间隙匆忙发布——强调"It is all human, with no AI"，Brian Conrad 已审阅"for months"，目前"so far looking good"。

**Why it matters:** AI 辅助研究不再是假设：一个千禧年级主张点名 Claude，另一个明确否认 AI，两者同日到达——而 Lean 形式化承担了让二者*可检验*而非*可相信*的全部重量。Tao 的表述才是诚实的版本：在被消化之前什么都没被证明，纳维-斯托克斯仓库自己也写明，论文给出哈希的那个证书"is not in this repository; the paper says that it will be released."

> 引用任何标题之前，先读仓库自己的告诫：修补后的 Lean 包"was not rebuilt when this repository was assembled"；Tao 写道，纳维-斯托克斯部分"more work needs to be done to create a proper, professionally written proof"。

[`🔗 Alpöge 的宣告（PDF）`](https://alpo.ge/remark.pdf) · [`🔗 纳维-斯托克斯论文 + Lean 形式化`](https://github.com/tristanbuckmaster/navier-stokes) · [`🔗 Terry Tao：三个主张，按消化程度排序`](https://terrytao.wordpress.com/2026/11/20/unforced-euler-singularity-unforced-navier-stokes-singularity-and-the-generalized-riemann-hypothesis/) · [`🔗 Vakil 公布 Masullo 主张`](https://math216.wordpress.com/2026/11/20/hurried-announcement-alessandro-masullo-grh/)

---

## 2. "I'll never buy Framework hardware again" 冲上 700+ 分——随后作者删文，只留"ENODRAMA"

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 713+ pts · ~4h 前 (~00:15 UTC+8)
- **Tags:** `hardware` `framework` `support` `consumer`

OpenSMTPD 作者 Gilles Chehade 昨晚发帖抱怨一次 Framework 笔记本售后纠纷，迅速成为当日 HN 第二大帖（713 分、460 条评论）。今天早上，正文没了。原网址现在只剩四行 TL;DR："This post ended up on Hacker News and got a lot more attention than I expected. I'm not trying to hurt Framework beyond repaid (pun intended); I want them to fix their support. I want them to give us what we paid for, a working laptop."——之后是"ENODRAMA. Move along, there's nothing to see here anymore."

**Why it matters:** 纠纷细节现在只存在于讨论区的引用和缓存里——这是硬件爱好者社区最热批评如何在病毒式传播数小时内被撤下的小案例，而 460 条评论的讨论保留了记录。引用这条新闻时请引用讨论帖：原文已不再承载它。

[`🔗 现状下的原帖`](https://poolp.org/posts/2026-11-20/ill-never-buy-framework-hardware-again/) · [`🔗 HN 讨论（460 评论）`](https://news.ycombinator.com/item?id=50576855)

---

## 3. 昨日报道过权重空间编程之后：一个开源 27B 模型改写*自己的*权重——无梯度、无训练

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 237+ pts · ~4h 前 (~00:15 UTC+8)
- **Tags:** `ai-research` `weight-space-programming` `self-improvement` `arxiv`

昨天那条讲的是权重空间编程的基准测试与 Edit-Ready Training。这一波的第二篇论文更离奇：arXiv 2611.21885（Jiajun Fan 等，v1 于 11 月 16 日），"Language Models Can Rewrite Their Own Weights"，报告了作者所称的*自我改写*（self-rewriting）——"the model is its own optimizer"。一个开源 27B 模型，拿到自己的权重、自己的评分答案和运行自身的能力后，诊断失败并改写其背后的权重，"6.6 points more accurate on problems it never saw"，连续八个 session 精度只升不降，还能在不读原始权重的情况下把一个损坏的自我副本修复到原精度 80% 以上。摘要里最扎眼的观察：该能力"emerges with scale"——在同一个模型家族里，较小的模型"make no edit or break themselves"。

**Why it matters:** 两天、三件套——一个基准、一个训练配方、一个自我编辑的模型——一个研究方向就是这样成型的。它也让昨天那条标记的安全问题更尖锐：如果改权重变成模型*自己*会做的事，"Weight Space Misfolding"威胁模型（11 月 14 日）就不再只针对外部攻击者。

[`🔗 arXiv: Language Models Can Rewrite Their Own Weights`](https://arxiv.org/abs/2611.21885) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50577265)

---

## 4. CISA 最新一批 KEV：vCenter 认证绕过与 Expressway root RCE——四条全部限期 11 月 23 日

- **Velocity:** ▮▮ rising
- **Source:** CISA KEV Catalog · 4 entries added 2026-11-20 · deadlines 2026-11-23
- **Tags:** `security` `kev` `vmware` `cisco` `ransomware`

11 月 20 日，已知被利用漏洞目录（KEV）新增四条，每条都带 11 月 23 日的三天联邦修复期限。头条是 **CVE-2026-123890**——VMware vCenter 目录服务的认证绕过（9.8，VMware 以 CNA 身份评分；本轮读取时记录为 `Undergoing Analysis`，lastModified 2026-11-20T20:16Z），修复版本为 9.1.1.0200、9.0.2.0200、8.0 U3m 和 5.2.5，Telco Cloud Platform 相关版本同样受影响。旁边是 **CVE-2026-76466**：Cisco Expressway Series，数据库服务中的硬编码凭据加上客户端证书校验缺失，让未认证攻击者可以"execute arbitrary operating system commands as root"（9.8，Cisco 以 CNA 身份评分）。另外两条：**CVE-2026-129448**——Apache Roller 的 XML-RPC 反序列化 RCE（9.8），我们 11 月 17 日刚报道过其新公告，如今进入 KEV；以及 **CVE-2025-42884**，SAP NetWeaver Enterprise Portal 的 JNDI 注入（6.5）。

**Why it matters:** 给 vCenter 目录服务绕过挂 72 小时期限，正是会驱动每个 VMware 环境周末紧急打补丁的那类条目；BOD 22-01 运营者应当把 11 月 23 日当作期限，而不是发布日。

[`🔗 CISA KEV Catalog`](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) · [`🔗 NVD: CVE-2026-123890`](https://nvd.nist.gov/view/vuln/detail?vulnId=CVE-2026-123890) · [`🔗 NVD: CVE-2026-76466`](https://nvd.nist.gov/view/vuln/detail?vulnId=CVE-2026-76466)

---

## 5. Signal 开始阻止操作系统 AI 代理读取你的屏幕——覆盖 iOS 27 和 Android，macOS 除外

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 360+ pts · ~10h 前 (~18:15 UTC+8)
- **Tags:** `privacy` `signal` `ai-agents` `mobile`

Meredith Whittaker 的文章把 Signal 对付 Microsoft Recall 的打法扩展到了两个正在搭载系统级读屏代理的移动平台。在 iOS 27 上，Signal 启用截屏阻止，让 Siri 的"Onscreen Awareness"无法捕获消息；在 Android 上，当 Google Gemini 之类的助手试图读取屏幕时，Signal 自动打开"Screen security"设置。文章对缺口也很坦白：没有可靠的截屏阻止 API，macOS 无法防护，部分 Android 厂商版本覆盖不到，并点名滥用无障碍权限的第三方代理——"a skeleton key"——包括 Meta 的 Muse。Signal 最后向苹果、谷歌和微软提出两点要求：给开发者一条文档化的退出 AI 数据访问的途径，以及真正说明代理如何访问和处理数据。

**Why it matters:** 应用层与操作系统层如今默认互为对手，Signal 称这一趋势为"an existential threat to privacy at the application layer"。每个承载私密内容的应用都得做同样的选择；多数应用既没有 Signal 的工程能力，也没有它的谈判筹码。

> "Signal is the canary in the coal mine, but this affects the entire ecosystem."

[`🔗 Signal 博客：Protecting Your Privacy`](https://signal.org/blog/protecting-your-privacy/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50572348)

---

## 6. Mozilla：DMA 三年后，iOS 上非 WebKit 浏览器仍为零——"the open door feels more like a trap door"

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 257+ pts · ~5h 前 (~23:15 UTC+8)
- **Tags:** `browsers` `apple` `regulation` `mozilla`

Mozilla 的政策文章清点了替代浏览器引擎的战绩：欧盟条件将近三年、日本同类规则约一年，没有任何开发者在 iOS 上发布过非 WebKit 浏览器。反事实写在数字里——自 DMA 选择屏上线以来，"millions have picked Firefox, and daily use on iOS has doubled"——但 Mozilla 认为，苹果的条款会强迫 Firefox 发布第二个独立应用，并要求用户手动迁移书签、密码和历史：苹果自己的应用绝不会接受这种摩擦。文章的结论："The reason is simple: Apple's conditions remain unworkable."

**Why it matters:** 这是"受监管的准入是否等于真实准入"的试金石——一个合规层面满足、结果层面零进入者的样本。浏览器引擎多样性如今也是 AI 政策问题：代理跑在谁的引擎里，决定适用谁的规则。

[`🔗 Mozilla：Why there are still no non-WebKit browsers on iOS`](https://blog.mozilla.org/en/mozilla/internet-policy/apple-ios-browser-engine-rules/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50575644)

---

## 7. crun 容器运行时：共享卷容器可以覆写宿主文件——包括 `/proc/sys`（7.8，RHEL 全线未修）

- **Velocity:** ▮▮ rising
- **Source:** NVD · CVE-2026-133553 · published ~16h 前 (~12:17 UTC+8)
- **Tags:** `security` `containers` `crun` `tocbou`

Red Hat 的 CNA 公开了 Podman 底层 OCI 运行时 crun 的一个缺陷：向挂载了 `tmpcopyup` 的 tmpfs 复制文件时，crun "opens the destination a second time by name"——与被创建容器共享可写卷的另一个容器可以在两次查找之间换掉该路径，于是 crun "copies image files onto host files, including files under /proc/sys"。记录带 7.8 分（`Secondary`，CNA 自评；NVD `Awaiting Analysis`），Red Hat 自己的修复状态数据把 crun 列为 RHEL 8、9、10 全线 `Affected`，OpenShift Container Platform 4 和 5 仍为 `Under investigation`。crun 最新版本（1.31，11 月 12 日）早于该记录发布，记录与 Red Hat 数据都还没有给出修复版本。

**Why it matters:** 这类漏洞从*内部*击穿容器/宿主边界——不需要内核漏洞利用，只要一个共享卷加一场竞争。在修复版本发布之前，务实做法是停止跨信任边界共享可写卷，并盯住关闭第二次查找的 crun 发布。

[`🔗 NVD: CVE-2026-133553`](https://nvd.nist.gov/view/vuln/detail?vulnId=CVE-2026-133553) · [`🔗 Red Hat CVE 数据`](https://access.redhat.com/security/data/cve/CVE-2026-133553) · [`🔗 containers/crun`](https://github.com/containers/crun)

---

## 8. "If you stop writing code, you also get worse at reviewing it"——技能萎缩随笔登上 HN 首页

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 277+ pts · ~7h 前 (~21:15 UTC+8)
- **Tags:** `craft` `ai-coding` `career` `essay`

Christian Ekrem 的文章说破了一个一旦说破就很显然的道理：所有学科都默认技能会因缺乏练习而退化，唯独工程师说服了自己——整天审阅代理输出也算保持锋利。他的论证：审阅不是练习——"you're not really reading half of it, are you"——更深的代价是，重度依赖 LLM 会训练出对努力本身的回避。"Repeated LLM usage for problem solving pounds the following premise into our brain's wiring: If something is hard, tricky or requires effort, you shouldn't even try."注意这是他批评的前提，不是他主张的。

**Why it matters:** 这与本周哈佛的企业级研究（11 月 18 日）同期落地——代码产出提升 76%，最终产出只涨 9–11%，瓶颈在评审——而这篇文章给出了产生差距的机制：审阅代理代码的人，正在失去评审所要求的那种技能。

[`🔗 If you stop writing code, you also get worse at reviewing it`](https://cekrem.github.io/posts/if-you-stop-writing-code-you-also-get-worse-at-reviewing-it) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50573886)

---

## 9. 谷歌员工请愿高层：别因为学校拒绝 Gemini 就切断其搜索

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 123+ pts · ~3h 前 (~01:15 UTC+8)
- **Tags:** `google` `ai-in-education` `policy` `labor`

继我们 11 月 14 日报道谷歌"AI or nothing"政策（关闭 Gemini/AI Overviews 的学校将失去 Search）之后，内部回应来了：数百名 Alphabet 工会成员请愿高层撤回该政策。政策于两周前的选举日公布；Mother Jones 报道此后多地社区举行了抗议，并引用一位谷歌员工对高管视角的转述：他们"convinced that resistance to AI"只说明学校"don't see the vision"。请愿要求公司停止把 Search 这样的核心基础设施与 AI 采用捆绑。

**Why it matters:** 一条新闻同时压住 2026 年的两条主线：AI 分发与不可替代的基础设施捆绑出售，以及劳动力成为监管者没能扮演的监督机制。这个捆绑接下来落在哪里（更多州？法院？）决定它是孤例还是模板。

[`🔗 Mother Jones：Google Workers Tell Their Employer Not to Punish Schools`](https://www.motherjones.com/politics/2026/11/google-alphabet-union-school-ai-protest-gemini-workers-petition/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50577901)

---

## 10. Epic 围绕 AI 代理重构虚幻引擎——Blueprints 退场，Verse 与 Scene Graph 登场

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 54+ pts · ~8h 前 (~20:15 UTC+8)
- **Tags:** `game-engines` `unreal` `ai-coding` `epic`

IEEE Spectrum 的深度报道（11 月 18 日）摊开了引擎级赌注：虚幻引擎 6 将移除 Blueprints——一家工作室创始人直言"AI doesn't handle Blueprints very well"，因为它们以二进制存储——改用严格文本语言 Verse，并以实体组件系统 Scene Graph 取代 OOP actor 框架。UE6 通过 API 暴露更多系统，"so that AI tooling can get at them without needing to fall back to slow computer use"（开发执行副总裁 Marcus Wassmer）；内部项目"Python All The Things"要让编辑器一切皆可脚本化；更多资产以文本存储供代理直接编辑。COO Daniel Vogel 谈编辑器本身："You're not going to move stuff visually in the editor. Those times are gone."11 月 9 日发布的 UE 5.9 开发者预览给出了第一口——Unreal Canvas，受 Miro 启发的代理协作画布。

**Why it matters:** 使用量最高的游戏引擎正在*为非人类操作者*重新设计——而文章最锋利的一刀指向另一侧：让虚幻可脚本化的同一批 AI，也让切换到 Godot 变得"trivial"，Epic 的护城河从此只能靠速度，不能靠锁定。（"This is why we are pivoting hard towards velocity."）

[`🔗 IEEE Spectrum：Epic Games Turns to AI Coding for the Unreal Engine`](https://spectrum.ieee.org/epic-games-unreal-engine-ai) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50573681)

---

## 11. HippoMaps：OpenStreetMap 上的确定性自然语言搜索——全程无 LLM

- **Velocity:** ▮ steady
- **Source:** Hacker News · 112+ pts · ~29h 前
- **Tags:** `openstreetmap` `search` `nlp` `maps`

一个持续攀升的 Show HN：HippoMaps 是基于 OpenStreetMap 的完整地图与导航应用，带自定义 Overpass API 引擎，而它真正的论点在查询解析器。作者说："I started working on a deterministic (as in no LLMs used) parser of queries that translates them to the Overpass QL"——查询被分词，"什么"与"哪里"从词表（已知品牌、运动、OSM 标签）解析，而非靠模型。输入"cafes by the Limmat 100 m from the lake in Zurich"，它编译成结构化 Overpass 查询，快到即时返回。

**Why it matters:** 在每个搜索表面都在被 LLM 包裹的一周里，一个可运行的演示证明 Google Maps 级的最后一个特性——自然语言地点搜索——可以确定性完成，既是工程成果，也是成本与延迟论证。讨论区读起来像 OSM 社区的愿望清单；最难的部分（查询理解）恰恰是它解决的部分。

[`🔗 HippoMaps`](https://hippomaps.ch/) · [`🔗 Show HN 讨论`](https://news.ycombinator.com/item?id=50561199)

---

## 12. floppy3.5：一台 3.5 英寸软盘 WiFi NAS——为索尼 Mavica 相机而生

- **Velocity:** ▮ steady
- **Source:** Hacker News · 114+ pts · ~30h 前
- **Tags:** `hardware` `retro` `raspberry-pi` `nas`

一台掌心大小的设备：把 1.44 MB FAT12 软盘塞进超薄软驱，通过 WiFi 提供访问——RP2354A 软盘控制器走 Greaseweazle 协议，ESP32-S3 桥接，照片在浏览器里 `floppy.local` 可见，可复制到 microSD——为的是抢救 90 年代用软盘存照片的索尼 Mavica 数码相机，那种现代机器已经读不了的盘。两颗芯片均可 OTA 升级，硬件是一块自绘 PCB，v1.1.0 于 11 月 17 日发布，带来体验修复。

**Why it matters:** 一半怀旧，一半是真正有用的归档工具——每个 Mavica 用户都有几盒软盘和一台读不了的机器。它也是极简设计的范例：一颗 RP2350 系芯片用 Greaseweazle 做磁通级软盘 IO，在 1.44 MB 上把事做全。

[`🔗 bigcrimping/floppy3.5`](https://github.com/bigcrimping/floppy3.5) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50560595)

---

## 13. tamserve：视频追踪的 vLLM 式服务——一份 SAM 2 权重在单 GPU 上追踪 64 路相机

- **Velocity:** ▮ steady
- **Source:** Hacker News · 122+ pts · ~95h 前
- **Tags:** `computer-vision` `inference` `sam` `serving`

tamserve 是 SAM 2/EdgeTAM 一直缺失的服务层：官方代码一次只处理一段录制视频，多相机部署就得每路一份模型副本，显存随之堆积。tamserve 让所有相机共用一份副本批处理——"what LLM servers such as vLLM do for chat"——README 自带表格给出收据：8 路相机显存从 8.6 GB 降到 2.2 GB，单路从 177 提速到 219 帧/秒，8 路跑到 323 帧/秒，64 路相机——老办法约需 70 GB——以 5.7 GB、321 帧/秒完成，精度"unchanged on DAVIS 2017"。Apache-2.0 协议，附 Colab 快速上手与六路实时相机追踪九个目标的演示视频。

**Why it matters:** 持续的世界监测是代理时代视觉要面对的负载，它正撞上 2023 年聊天撞过的同一堵墙：每请求一份模型副本无法扩展。批处理共享模式从 LLM 迁移到追踪，这才是本文可推广的部分。

[`🔗 aryamandarda/tamserve`](https://github.com/aryamandarda/tamserve) · [`🔗 Show HN 讨论`](https://news.ycombinator.com/item?id=50523377)

---

## 14. Dettato：2000 万参数的音频转 MIDI 模型跑赢 13 亿参数对手——训练零版权录音

- **Velocity:** ▮ steady
- **Source:** Hacker News · 183+ pts · ~91h 前
- **Tags:** `audio` `midi` `music-ai` `open-source`

Kobi 的 Dettato（11 月 16 日发布，仍在攀升）报告了 2000 万参数的 SOTA 音频转 MIDI 成绩——"roughly 65x smaller than muscriptor"（后者 composite 47.4）——并在 Mirelo 自己公布的基准上略胜其闭源 A2M v1.1 Pro（56.1）：composite 60.8，逐集 F1 表格全量公开。两条比标题更值钱的诚实说明：模型"trained on absolutely no copyrighted recordings"；其免责声明自己点出短板——"one thing my model performs poor on for instance, is splitting instruments correctly"——并向找乐谱的用户推荐 Songscription 与 Klangio。

**Why it matters:** 一个小 65 倍的开源模型在对手自家基准上获胜，附带逐集数字与明确的失败模式——这才是基准战应有的样子。转写也是一个数据权利友好的故事：训练音频零版权素材，允许商用。

[`🔗 Dettato：模型卡与基准`](https://kobi.music/research/dettato) · [`🔗 Show HN 讨论`](https://news.ycombinator.com/item?id=50526023)

---

## 元数据

| Field | Value |
|-------|-------|
| Generated | 2026-11-20T20:27:37Z |
| Items | 14 |
| Sources tracked | 17 (Hacker News, GitHub Trending, CISA KEV, NVD, Red Hat security data, vendor blogs, arXiv) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[前一天](../2026-11-20.md) · [Raw .md](https://trending.md/zh/feed/2026-11-21.md) · [归档](../archive/)
