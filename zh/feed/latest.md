---
date: 2026-11-21
updated: 2026-11-21T12:25:51Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 40
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

11 月 20 日，已知被利用漏洞目录（KEV）新增四条，每条都带 11 月 23 日的三天联邦修复期限。头条是 **CVE-2026-123890**——VMware vCenter 目录服务的认证绕过（9.8，VMware 以 CNA 身份评分；本轮 11-21 复读时记录为 `Analyzed`，lastModified 2026-11-21T05:18Z——我们在 11-20 20:16Z 读取时它还是 `Undergoing Analysis`，约 36 分钟后完成了分析），修复版本为 9.1.1.0200、9.0.2.0200、8.0 U3m 和 5.2.5，Telco Cloud Platform 相关版本同样受影响。旁边是 **CVE-2026-76466**：Cisco Expressway Series，数据库服务中的硬编码凭据加上客户端证书校验缺失，让未认证攻击者可以"execute arbitrary operating system commands as root"（9.8，Cisco 以 CNA 身份评分）。另外两条：**CVE-2026-129448**——Apache Roller 的 XML-RPC 反序列化 RCE（9.8），我们 11 月 17 日刚报道过其新公告，如今进入 KEV；以及 **CVE-2025-42884**，SAP NetWeaver Enterprise Portal 的 JNDI 注入（6.5）。

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

## 15. Thinking Machines 发布 Inkling 2 Mini——权重开放的"循环 transformer"，小到能在笔记本上跑

- **Velocity:** ▮▮▮ trending
- **Source:** Thinking Machines · 780+ pts · ~8h 前 (~04:15 UTC+8)
- **Tags:** `ai-models` `looped-transformer` `open-weights` `local-inference` `monitorability`

Thinking Machines 发布了开放权重的 Inkling 2 Mini——"a looped transformer, running the middle layers of the model three times for every token"：总参 26.4B / 激活 3.4B 的 MoE，24 层存储权重、每 token 应用 48 次，"Looping allows the model to reason longer without writing its reasoning down"。头条主张：它 "leads every open-weights model with less than 100B total parameters on benchmarks such as DeepSWE v1.1 (48.2%) and Vals Index v2.2 (46.5%)"，SWE-bench Pro v2 Hard 77.9%（表格逐行标注了所用 harness），斯坦福 Hazy Research 的"每瓦智能"实测 0.703（DGX Spark，四个本地模型中最高，第二名 0.430）。"The total memory footprint of Inkling 2 Mini is ~20GB"，训练与部署同为原生 NVFP4（最后四层 MXFP8）、"no conversion loss from quantization"，Ollama 可跑在任何 32GB+ 内存的 Mac 上——发布演示是在 MacBook Pro 飞行模式下离线造出一个飞行模拟器。同时发布 TML-d24-varloop-research（可变循环研究模型，已上 Hugging Face），用于研究循环直接提出的那个问题：no-CoT 时间视野"from 16 seconds at one pass to 37 seconds with three"，而思维链"grew shorter with more loops but stayed legible throughout"。

**Why it matters:** 循环结构直接命中 CoT 可监控性这个担忧——每 token 内部计算越多，就有越多推理永远不会落到可读文本上——而 Thinking Machines 把测量随模型一起发布了：在这个规模上没有出现有意义的可监控性损失，agentic 破坏测试也没有随循环加深而上升。引用基准之前先读它的局限部分：多轮对话与多约束指令仍落后 Qwen3.8-27B。

> "Inkling 2 Mini is not the strongest small model for multi-turn chat or for instructions with many constraints: it scores 50.0% on MultiChallenge and 33.4% on ComplexConstraints v1.1, behind Qwen3.8-27B on both."

[`🔗 Thinking Machines：Introducing Inkling 2 Mini`](https://thinkingmachines.ai/news/inkling-2-mini/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50581260)

---

## 16. "We promoted developers into architects without informing them"——vibe coding 反噬等来了它的岗位说明书

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 335+ pts · ~10h 前 (~02:15 UTC+8)
- **Tags:** `craft` `ai-coding` `architecture` `essay` `career`

一位 Google Forms 插件开发者的文章（335+ 分，200+ 评论）以一个 15 秒的欢迎屏开场：同事 vibe coded 了安装日志，而 AI 对 Google 授权限制给出的答案是三层嵌套的 try/catch 兜底——"all of these are one line of code, but internally each of these makes multiple API calls to Google servers"——而且在页面渲染之前就执行。诊断："AI is great at writing code. But it doesn't know if you are launching the app or have millions of users"，而且 "it is also sycophantic and tries to execute your requirements exactly without pushing back"。文章的关键动作是给岗位改名："if you generate code by specifying your requirements instead of specifying your architecture, AI will decide the architecture on your behalf"——所以先定义数据模型，把 agent 约束在你的架构之内，判断什么时候值得为向后兼容保留重复表，然后"the way an architect reviews a developer's code"去审查。

**Why it matters:** 它是本批技能萎缩一文（第 8 条）的建设性对照文：那篇点名损失，这篇点名那次无人宣布的晋升——"You got promoted. Nobody told you, so I am telling you."。哈佛的企业级研究（11 月 18 日）补上了机制：评审是瓶颈，所以能在代码存在之前对需求说不的人才是稀缺角色。

[`🔗 We promoted developers into architects without informing them`](https://manidoraisamy.com/developer-to-architect.html) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50579331)

---

## 17. DreamCoder：Mastering Emacs 作者花 15 个月做出浏览器原生的编码 harness

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 140+ pts · ~8h 前 (~04:10 UTC+8)
- **Tags:** `coding-harness` `emacs` `agent-tools` `ide`

Mastering Emacs 作者 Mickey Petersen 宣布 DreamCoder——"a frontier coding harness with a tiling window manager that runs in your browser on all 3 platforms"，从 2025 年 5 月手写起步，历时"15 months of work"。设计是把 Emacs 翻译进 agent 时代：每个窗格都有最小/舒适/最大尺寸，由"a sophisticated constraint satisfaction solver"求解；workspace 即虚拟桌面；每个 workspace 一张迷你图，agent 工作时脉冲闪烁、阻塞时高亮；avy 式跳转和 Helm 式面板取代 tab 循环；`Alt+x` 呼出全局命令。前沿 harness 的清单全部勾选——"MCP, backgroundable sub agents and shell commands, terminal windows, skills, hooks, 99% cache hit, it runs for days"——附带 Pi、OpenCode、Codex 配置导入器，并一等公民支持开源权重模型（"Qwen 3.8 27B, for example, is fantastically good for its size"）。全文的转折点：他在 Emacs 里手写起步，"only to see DreamCoder write itself… in DreamCoder today"。

**Why it matters:** "Taste is a scarce, human resource." 是全文论点，而 harness 类目正是它的试金石——所有竞品都收敛到同一种聊天侧栏形态，因为品味恰恰是模型供给不了的部分。他宣布的下一个在 DreamCoder 里构建的项目：一个渗透测试套件，"built for humans. The AI does the work."

[`🔗 Announcing DreamCoder`](https://www.masteringemacs.org/article/announcing-dreamcoder) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50581110)

---

## 18. NINLIVE：粉丝维护的 1,210 场 Nine Inch Nails 演唱会档案——现在能回放 1988 年至今

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 160+ pts · ~5.5h 前 (~06:35 UTC+8)
- **Tags:** `archives` `music` `streaming` `fan-projects`

首页的黑马是一个粉丝运营的 Nine Inch Nails 现场档案：1,210 场演唱会、1,949 份录音、4,675 张照片与媒体、363 首曲目跟踪，覆盖 46 个国家、373 座城市。触发讨论的是 11 月 16 日的更新——"The Future Is Here - ninlive Streaming 1988-2026"："You are now able to stream all of your favorite NIN live recordings from 1988-2026"，用 Discord 登录可收藏喜欢的录音。更新日志读起来像把档案维护过成了生活方式——一份从未流通的 DAT 母带为 1994 年洛杉矶场补上了缺环（"First recording available from the third and final night!"），刚为一位 taper 完成"200 DAT tape project"，票根与 setlist 扫描件正在逐场拍照入库。页脚写得很直白："Fan run, not affiliated with the band."

**Why it matters:** 与本周的 Salon 保存行动、Apple 论坛抢救是同一种本能：档案才是耐久的产物，而那些不性感的工程——磁带代际溯源、流媒体基础设施、逐场元数据——正由志愿者为了一支乐队的磁带脉络免费完成。

[`🔗 NINLIVE`](https://ninlive.com/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50583274)

---

## 19. 用 agent"摇"出一颗推理芯片：FPGA 跑 LLM 到 213 tokens/s——此前 agent 写了约 300 万行

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 120+ pts · ~10h 前 (~02:15 UTC+8)
- **Tags:** `fpga` `ai-coding` `inference` `hardware`

Ankit Gupta 的实录：租一台 AWS F2 FPGA 实例（16 GB HBM），把云上 agent 指向 DeepGrove 的三值权重架构，几天后得到硬件上 bit-exact 的 LLM 推理——"increased its speed by 33× from the first full-model bit-exact baseline to get it to a real-time relevant speed"，6 → 213 tokens/s，靠 14 步复利式优化（burst attention、并行 MoE router、带草稿模型的精确投机解码、无损 5-trit 权重打包）。账单："roughly 3M lines across the experiment history and parsing 30M lines of output files, burning only $10,000 in Claude and OpenAI tokens."。他的提示词大多是打气——"you're a superintelligent model, time to be more creative"——而当他贴入一份老手 FPGA 设计指南时，agent 自己的复盘是："Its biggest design ideas were already in my plan before you pasted it."

**Why it matters:** 可迁移的部分是验证纪律——全程对齐 CPU 参考实现的 bit-exact 契约，仿真、时序、上板结果分开存放——而 Gupta 的结论精确命名了分工："the humans are still useful at defining how to iterate fast and what correctness looks like, and the agents are great to manage the exploration."

[`🔗 Vibecoding an inference chip`](https://ankitg.me/blog/vibecoding-inference-chip/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50579297)

---

## 20. Winedroid：真 Android APK 跑进浏览器——"essentially replicates Android" 的 Rust 运行时

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 115+ pts · ~8.5h 前 (~03:35 UTC+8)
- **Tags:** `android` `wasm` `rust` `emulation`

一个 Show HN 演示在浏览器里运行 F-Droid 的 APK——OpenCalc、冥想计时器、文件管理器、天气应用——全程不涉及 Android。按其 FAQ 的说法，Winedroid "written completely in Rust and it essentially replicates Android so it works everywhere"；浏览器加载的运行时"12MB right now"，仓库（今日创建，读时 86★）目标是 "Web, Linux, macOS and Windows"。短板自己说在前头：JIT 在 web 目标上不可用，所以浏览器演示比原生慢；应用覆盖"still improving day by day"。

**Why it matters:** 这是 Wine 的祖传手艺——重实现 API 表面而非机器本身——应用到 Android 上，意味着应用与 Google 运行时解耦，正如当年 Wine 把 Windows 软件与 Windows 解耦。尚早，但浏览器原生目标是有趣的赌注：无需应用商店的分发。

[`🔗 winedroid 演示`](https://winedroid.soham.sh/demo/) · [`🔗 sohzm/winedroid`](https://github.com/sohzm/winedroid)

---

## 21. Slopstrap：让诚实的网站看起来像是匆匆 vibe coded 出来的 CSS 框架

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 110+ pts · ~12.5h 前 (~23:15 UTC+8)
- **Tags:** `satire` `css` `vibecoding` `design`

Mike Lacher 的戏仿框架把 2026 年生成式落地页的每一处破绽做成了可复制的组件：闪烁的状态点（"All Systems Operational"、"0 Real Incidents"）、粗彩色左边框、渐变标题配"low-contrast slate-400"正文、"one arbitrary italic serif word"、能"fracture any simple paragraph into an asymmetrical grid of glowing rounded boxes"的 bento 网格、自动生成的证言（"Sarah Chen has used your product and can't stop talking about it"）、滚动时才开始跳字的统计数字。演示对"Bob's Local Plumbing & Pipe Repair"——1998 年起服务 Springfield、"we actually pick up the phone when your basement is flooding"——执行 `Slopstrap.slopify('#plain-demo')`，一键变成发光卡片网格。

**Why it matters:** 戏仿在做分类学：这套组件正是"哪些视觉信号如今读作机器生成"的清单，它甚至带一个 `/agents` 页——"Why use an agent if people can't tell an agent made your site?"——笑点的终点是：slop 风格已经成为 agent 按需复刻的流派。

[`🔗 Slopstrap`](https://slopstrap.mikelacher.com/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50576012)

---

## 22. pip 出了一个 9.3：26.2.2 之前的版本捆绑的 certifi 带着被攻破的 eMudhra 证书

- **Velocity:** ▮▮ rising
- **Source:** NVD · CVE-2026-133949 · 11 月 20 日发布 (~19:18 UTC, ~03:18 UTC+8)
- **Tags:** `security` `pip` `python` `supply-chain` `emudhra`

PSF 的 CNA 发布 CVE-2026-133949："pip prior to v26.2.2 the certifi bundled with pip contains the compromised eMudhra certificates." 评级 9.3 Critical（CVSS 4.0，PSF 自己的 CNA 评分；CVE-2026-133949 在本运行读取时于 NVD 仍为 `Received`）。记录给出的修复有先后顺序：升级"either by first upgrading Python to a version that rejects the compromised intermediates (CVE-2026-115557) or use hash pinning with a known-secure version of pip."。让局面可控的那句话是："pip is not vulnerable when using a Python version that rejects the compromised certificates."。PSF 的用户说明帖与 pip PR #14371 有操作细节。

**Why it matters:** 10 月的 eMudhra/emSign CA 攻破事件仍在向工具链下游扩散，这一跳触及所有用旧 pip 装包的机器。值得读两遍的是"Python 先拒绝这些中间证书"这个依赖——只升 pip 未必闭合。

[`🔗 NVD：CVE-2026-133949`](https://nvd.nist.gov/view/vuln/detail?vulnId=CVE-2026-133949) · [`🔗 PSF：给 Python 用户的情况说明`](https://discuss.python.org/t/information-for-python-users-regarding-emudhra-emsign-ca-certificate-security-incident/109576) · [`🔗 GHSA-6q48-6c7w-9gw2`](https://github.com/advisories/ghsa-6q48-6c7w-9gw2)

---

## 23. 继昨日两条 NGINX RCE 之后：同一次发布其实修了十个 CVE——仓库今天上了 trending

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending + nginx.org · 发布 11 月 18 日，披露 11 月 19 日
- **Tags:** `security` `nginx` `patching` `http2` `mtls`

关闭昨日条目中两条 RCE（CVE-2026-123633、CVE-2026-123007）的 1.31.9 mainline 与 1.30.7 stable，其实一次修了**十个 CVE**。nginx 的安全公告用文字标签而非 CVSS 分表达严重度：三个"major"——HTTP/2 流控内存破坏（CVE-2026-123007）、"Infinite loop while reading client request body over TLS 1.3"（CVE-2026-118899）、"Use-after-free in mail proxy module"（CVE-2026-113425）——其余为 medium/minor，其中包括"SNI bypass when using client certificate validation in stream"（CVE-2026-120967）与"Insufficient validation in stream ssl_preread module"（CVE-2026-123640）。nginx 仓库今天上了 GitHub trending——补丁潮本身就是流量。

**Why it matters:** 两条 RCE 的头条低估了这次发布。stream 模块的 SNI 绕过是安静的那颗雷：对在 nginx 终止 mTLS 的人，客户端证书校验若能匹配到错误 SNI，那是访问控制缺陷而非崩溃——而它与 RCE 修在同一次升级里。

[`🔗 nginx 安全公告`](https://nginx.org/en/security_advisories.html) · [`🔗 release-1.31.9`](https://github.com/nginx/nginx/releases/tag/release-1.31.9)

---

## 24. MCP 服务器层再落两条 CVE：Tapo 的 DNS 重绑定设备操控、SSH 管理器的 cron 持久化

- **Velocity:** ▮▮ rising
- **Source:** NVD · 11 月 20 日发布 2 条记录 · 均为 GitHub_M 指派
- **Tags:** `security` `mcp` `agents` `dns-rebinding` `command-injection`

两条记录均发布于 11 月 20 日，均由 GitHub 担任 CNA，均为 8.8 分，均已有修复。**CVE-2026-77329**（CVSS 4.0，tapo-mcp 0.5.0 修复）：面向 TP-Link 智能家居的 Rust/Python Tapo MCP 服务器"calls disable_allowed_hosts() without replacement Host or Origin validation"，于是"a malicious website can use DNS rebinding to send same-origin browser requests to the victim's local or LAN Tapo MCP listener when it runs without an API key"——够得着"control_device for smart-device actuation and take_snapshot for configured cameras"。**CVE-2026-129995**（CVSS 3.1，3.8.5 修复）：mcp-ssh-manager 的备份工具"build remote shell commands from caller-controlled values"且"without neutralizing shell metacharacters"，构造参数即可"execute arbitrary OS commands on managed remote servers as the configured SSH user"——而"ssh_backup_schedule can persist execution through cron"。

**Why it matters:** 上周的 agent 栈 CVE 浪潮（Phoenix、CubeSandbox、MCP Python SDK）还在继续，且形态不变：危险面不是模型，而是绑在 localhost/局域网、带一个没人设置的"可选"鉴权开关的工具服务器。能操控实体设备、读取摄像头的监听器，说明赌注又抬高了。

[`🔗 tapo 公告 GHSA-2cwc-6wwp-62q6`](https://github.com/mihai-dinculescu/tapo/security/advisories/GHSA-2cwc-6wwp-62q6) · [`🔗 mcp-ssh-manager 公告 GHSA-qwwm-vrm9-4mw8`](https://github.com/bvisible/mcp-ssh-manager/security/advisories/GHSA-qwwm-vrm9-4mw8) · [`🔗 NVD：CVE-2026-77329`](https://nvd.nist.gov/view/vuln/detail?vulnId=CVE-2026-77329)

---

## 25. OpenComputer：Digger 的开源 Devin 替代品——Slack 里 @Computer，会话跑在 rootless Podman

- **Velocity:** ▮ steady
- **Source:** Show HN · 75+ pts · ~7.5h 前 (~04:30 UTC+8)
- **Tags:** `ai-agents` `devtools` `slack` `self-hosted`

Digger 团队的 Show HN 发布："Mention `@Computer` in a Slack thread with a task, it works on its own computer, you & your team can watch and steer it as it goes, and the result lands as a pull request." 技术栈刻意朴素：一台只许出站流量的 VM 跑名叫 Calvin 的网关，按 Slack 线程启动 Claude Code、Codex 或 OpenCode 会话——"each session is isolated with rootless Podman"——控制面则是 Cloudflare Workers 与 Durable Objects。发布的钩子是一个基准："in our benchmark it opens PRs 3.3x faster than Devin"，旁边是对比本地 Claude Code 的同题竞速（32.0s vs 36.2s）。"We built it to feel as fast as Claude Code on your laptop."

**Why it matters:** "agent 在自己的电脑上干活"这一类目正在收敛为 Slack 编排 + 你自己的云算力——而"from the compute layer up"开源是对 Devin 的差异化卖点，隔离原语（rootless 容器、只出不进的 VM）是安全团队真能审的那种。

[`🔗 diggerhq/opencomputer`](https://github.com/diggerhq/opencomputer) · [`🔗 Show HN 讨论`](https://news.ycombinator.com/item?id=50581403)

---

## 26. Poste.io 发布 2.5.22 修一个 9.2：DMARC 报告附件导致未认证 root RCE

- **Velocity:** ▮ steady
- **Source:** NVD · CVE-2026-127027 · CERT-PL 公告 · 11 月 20 日发布
- **Tags:** `security` `email` `rce` `mail-server`

CERT-PL 在 Poste.io（一体化 Docker 邮件服务器）中发布 CVE-2026-127027（9.2 Critical，CVSS 4.0，CNA 评分；2.5.22 修复）。"Email sent to dmarc-reports@<domain> is saved without sender verification."，而"Script that runs as root unpacks the attachments using unsafe shell commands, allowing command injection through crafted attachments (e.g. file names or archive contents)"。后果："a remote unauthenticated attacker who can send an email to the server's port 25 can execute arbitrary commands as root within the Poste.io container."

**Why it matters:** 攻击者只需要能向你的域名发邮件——无需凭证、无需用户交互——这对邮件服务器来说几乎就是零点击远程 root。在跑 Poste.io 的话，2.5.22 就是今天的升级项；容器边界是攻击者与宿主机之间的唯一一道墙。

[`🔗 CERT-PL 公告`](https://cert.pl/en/posts/2026/11/CVE-2026-127027) · [`🔗 NVD：CVE-2026-127027`](https://nvd.nist.gov/view/vuln/detail?vulnId=CVE-2026-127027)

---

## 27. GitHub 把用户账号挂到 404 且不发邮件——数小时后恢复

- **Velocity:** ▮ steady
- **Source:** Hacker News · 50+ pts · ~4.5h 前 (~07:35 UTC+8)
- **Tags:** `github` `platform-risk` `moderation`

小事，但边缘锋利（50+ 分，46 评论）：一位开发者的 GitHub 账号（`0n4t3`）被暂停——主页 404，"all my personal projects are gone"——"not so much as a pop up notification or email on what happened."。帖子发酵后账号恢复了，如今开头写着 "Update — I'm back!"，感谢"whoever undid my (prob automated?) deletion and/or ban on Github."。留下来的是这两句："I still have no idea what got me banished or if it'll happen again. Still not so much as a pop up notification or email on what happened, lol, just a random banishment then unbanishment." 他现在在做本地镜像，并在考虑迁移。

**Why it matters:** 这是 11 月 18 日 Codeberg 注册商停机事件的账号侧版本：把整个身份下线的审核动作不经过任何通知渠道，而解决方案——被恰巧看到的人解除封禁——并不是流程。做镜像吧；平台的申诉通道是一条上热帖的讨论串。

[`🔗 Help github just deleted me`](https://nate.mecca1.net/posts/2026-11-20_help/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50583911)

---

## 28. Backblaze 新隐私声明称可能出售或共享个人信息用于定向广告——出现在一家备份公司

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 201+ pts · ~9h 前 (~11:20 UTC+8)
- **Tags:** `privacy` `backup` `data-rights` `industry`

Backblaze——一家以"你的数据会在我们这里安全保存多年"为全部卖点的备份服务商——发布了新的"Notice at Collection and Privacy Policy"，由此引发的讨论帖（201 分）成了一场公投。声明写道，个人信息——类别列表包括 "Internet or Other Similar Network Activity; Commercial Information; Geolocation Data"——可能被出售或共享用于 "cross-context behavioral advertising"，退出路径也写得很清楚："You have the right to direct us to stop selling or sharing your personal information for cross-context behavioral advertising"，可通过"Your Privacy Choices"链接或 Global Privacy Control 信号行使。两个精确的解读很重要。声明**没有**说备份文件内容会被出售——涉及的类别是账户与使用行为类的个人信息，且同时写明 "We do not sell or share sensitive personal information"、精确地理位置一栏为 "No"。而且它是 opt-OUT——一个单独的偏好设置表单而非默认加入，讨论帖将其读作暗黑模式。

**Why it matters:** 正如讨论帖的高赞总结："Backup is a trust business. The entire product promise is 'your data is safe with us for years'"——把同一份客户关系拿去做广告数据变现，是与承诺相反的方向。具体动作：下次备份前设置隐私偏好或开启 GPC；续费前先读备份服务商的收集声明。

[`🔗 Backblaze Notice at Collection and Privacy Policy`](https://www.backblaze.com/company/policy/privacy) · [`🔗 HN 讨论（201 分）`](https://news.ycombinator.com/item?id=50585593)

---

## 29. GnuPG 披露 GPGME 关键双重释放漏洞——可经签名邮件外泄数据，RCE "can't be ruled out"——并提前拉闸披露

- **Velocity:** ▮▮▮ trending
- **Source:** gnupg-announce · HN 43+ pts · ~3.6h 前 (~16:35 UTC+8)
- **Tags:** `security` `gnupg` `cve` `memory-safety`

Werner Koch 宣布 GPGME 2.3.1，修复"a critical security bug found in all prior versions"——CVE-2026-129975（内部编号 T8557），由携带"a crafted very long user id"的 OpenPGP 密钥触发的双重释放。机制属于陈旧指针一类：缓冲区重分配后的新指针"is only assigned back to the context object at the end of the function"，因此读错误导致的提前返回会让上下文继续持有已释放的内存并再次释放——而且"due to other allocations in between"，分配器的双重释放检查可能不触发。影响链条异常实际："This double free can be used exfiltrate data from applications by sending for example signed data"，而"Exploiting this bug to mount an Remote Code Execution attack (RCE) can't be ruled out. Thus an immediate update is highly suggested。"受影响名单几乎覆盖整个 OpenPGP 桌面世界——Gpg4win、GnuPG Desktop 与 VS-Desktop、"Most mail clients"、众多 XMPP 客户端、Samba、Flatpak。披露本身也有故事：研究者 Johan Carlsson 的发现原定经 GitLab 协调于 2026-11-25 披露，因"due to the new Ruby2Shell bug GitLab had to update earlier"而提前到 11 月 20 日——与昨天的 Ruby 紧急修复同一波。本次运行核查时（12:09Z）NVD 尚无记录。

**Why it matters:** GPGME 是应用程序与 gpg 之间的那层库，这使它成为一个应用侧内存漏洞，恶意密钥可以通过普通签名邮件触达。补丁难点在依赖树：静态链接的二进制需要重新构建到 2.3.1，而发行版的更新会晚于公告数日。

[`🔗 GnuPG 安全公告（gnupg-announce）`](https://lists.gnupg.org/pipermail/gnupg-announce/2026q4/000517.html) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50587208)

---

## 30. 冰岛最大托管服务商在攻击后关闭全部服务——其常务董事称攻击烧掉了"tens of millions in artificial intelligence costs"

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 94+ pts · ~12.7h 前 (~07:30 UTC+8)
- **Tags:** `security` `hosting` `iceland` `ai-powered-attack`

1984 ehf——按其常务董事的说法"probably by far the largest provider of website and email hosting services in Iceland"——在前端系统遭网络攻击后关闭了全部服务，影响数万名客户，CERT-IS 与冰岛电子通信办公室正协同处置。被广泛转引的细节是 Mörður Áslaugarson 对攻击者的描述："These are professionals, and this was probably an enormously well-funded attack. We're talking about tens of millions in artificial intelligence costs. It happened at a speed unlike anything anyone has ever even heard of." 恢复是渐进式的——先恢复邮件和 DNS——进度在公司的公开状态页跟踪；他还补充"There are certain theories about which groups were behind this, but none of them has been confirmed."

**Why it matters:** "tens of millions in artificial intelligence costs"这个数字能否经得起推敲另说，但这个说法本身就是本周安全级联的缩影：只有巨额算力预算才买得到的执行速度，瞄准的是一个国家真实运转所依赖的基础设施。一家国家级托管服务商选择全面停机，是本月一连串宕机故事的防御侧镜像。

[`🔗 RÚV：Serious cyberattack thought backed by wealthy operators`](https://www.ruv.is/english/2026-11-20-serious-cyberattack-thought-backed-by-wealthy-operators-493411) · [`🔗 1984 状态页`](https://status.1984.is/status/public) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50583856)

---

## 31. FBI 据报正在调查其犯罪数据库（NCIC）遭入侵——同时 USDA 的农民支付系统也遭到网络攻击

- **Velocity:** ▮▮ rising
- **Source:** BBC + France24（经 NBC、CNN）· HN 40+ pts · ~1.6h 前 (~18:35 UTC+8)
- **Tags:** `security` `fbi` `breach` `ncic`

据美国媒体援引两名知情人士的说法，FBI 正在调查"an apparent breach of its criminal information database"——即 NCIC，联邦与地方执法部门共享通缉令和背景调查信息的系统。这将是该局今秋的第二起事件：9 月，ShinyHunters 组织声称窃取了全部约 38,000 名 FBI 员工的数据。另一起：USDA 告知员工其农民支付系统"had been targeted"（NBC，经两名前 USDA 官员）；该部门尚未置评。两起事件都发生在华盛顿对上周宕机的追问之中——同一周白宫解雇了国家网络主任 Sean Cairncross——CNN 指出 FBI 是"hacked for the second time since September"，并报道两起事件是否相关、责任人是谁目前仍不清楚。

**Why it matters:** NCIC 记录直接支撑逮捕和警员安全核查，这里的失守不是统计泄露。背景与事件本身同样重要：在一个月"官方否认是网络攻击"的宕机之后，两起并行的联邦入侵调查会让"这次是吗？"成为未来每次宕机的默认问题。

[`🔗 BBC：FBI reportedly investigating apparent hack of its criminal database`](https://www.bbc.com/news/articles/cvze7de86pk3o) · [`🔗 France24：US Agriculture Department and FBI hit by cyberattacks`](https://www.france24.com/en/americas/20261121-us-agriculture-department-fbi-hit-by-cyberattacks-media-report) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50587859)

---

## 32. ClawDOS：给 DOS 用的 AI 编码代理——跑在真实的 1981 年 IBM PC XT 上

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 84+ pts · ~6.5h 前 (~13:40 UTC+8)
- **Tags:** `ai-agents` `dos` `retro` `coding-agent`

一个名副其实的 Show HN：在原始硬件上运行的 DOS 聊天与编码 harness——一台 IBM PC 5160，"an 8088 at 4.77 MHz, 640K of RAM, a CGA card"。HARNESS.EXE 是一个 176 KB 的 DOS 程序，自己直接讲 Claude Messages API：写请求、解析流式回复、运行工具，把每个对话保存在独立目录里，并在会话之间维护笔记，让代理"picks up where it left off"。它读写磁盘文件、写程序、用 Turbo C 编译、运行后"looks at what they draw on the screen"。TLS 被卸载到另一台"bridge" PC，因为 8088 扛不住。作者的自述很坦白："100% of this repo is written by Claude, with the exception of the text within this box"——网站本身也是代理的下一个练习："can that something it built then build other somethings?"

**Why it matters:** 约束驱动的 harness 工程是这门手艺进步的方式——这里的每个想法（流式解析器、文件系统级工作区、跨会话记忆）都为 640K 的机器重建了一遍，等于对"代理循环真正需要什么"做了一次压力测试。它也是今年"代理写代理"系列里最好的一个条目。

[`🔗 ClawDOS`](http://ricapar.net/ClawDOS/) · [`🔗 Ricapar/ClawDOS`](https://github.com/Ricapar/ClawDOS) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50586292)

---

## 33. Apple 团队发布 Depth Pro 2：图像*和*视频的度量深度，既锐利又时序一致——代码与权重同日开放

- **Velocity:** ▮▮ rising
- **Source:** arXiv · 2611.26603 · 代码与权重 11 月 20 日发布
- **Tags:** `computer-vision` `depth-estimation` `open-weights` `apple`

Depth Pro 2（11 月 19 日提交，来自 Vladlen Koltun 所在团队）直击单目深度的核心权衡：多帧方法买到时序一致性却牺牲边界锐度，单帧方法正相反。团队训练了"a single, scalable network that processes both images and video and predicts depth maps at native resolution"，并主张度量精度、锐度与时序一致性"all at once, outperforming prior work in all of these dimensions"——一族据称在"a new Pareto frontier in terms of metric accuracy, sharpness, temporal consistency, and runtime"上的模型。代码与权重随论文一同发布在新的 `apple-aiml-research` 组织下（旧的 `apple/ml-depth-pro` 链接现已重定向），生态一天内跟进：11 月 20 日即出现 ComfyUI 节点和 ONNX/TensorRT 移植。

**Why it matters:** 视频度量深度是机器人、AR 与代理感知的基础设施，这个发布就是接下来大家要对着构建的开源权重基线。隔夜出现的 ComfyUI/ONNX 移植，也是"开源发布如今多快被重新打包"的小案例。

[`🔗 arXiv：Depth Pro 2`](https://arxiv.org/abs/2611.26603) · [`🔗 apple-aiml-research/ml-depth-pro-2`](https://github.com/apple-aiml-research/ml-depth-pro-2)

---

## 34. "AI is giving everyone the same advice"：向 65 个模型发问 127,918 次，量化默认答案——并找到它们的来源

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 92+ pts · ~19h 前 (~00:50 UTC+8)
- **Tags:** `ai-research` `homogenization` `evaluation`

Cody Collier 的独立实验把人们真正会问的问题问了一遍——"65 AIs from 30 companies… 127,918 times"——然后度量同质化。请它"Recommend one book that will change my life"，100 次里有 73 次推荐《Man's Search for Meaning》；要商业点子，100 次里 76 次给订阅盒；学什么→计算机科学 90%；一万美元投哪→指数基金 98%。锋利的细节：在"3,151 people the AIs made up"中，69% 恰好是 34 岁；每家公司都有招牌人名（"Claude invents Marisol, Gemini invents Elena"）；而只用无害的问题，"59% of AIs answer most like another AI from the same company, against 4% by chance." 机制层面的主张是全文最有用的部分：在一个他能在每个训练阶段度量的开源模型里，那个最受欢迎的答案出现在"when it's taught to be an assistant"的那一步——而且默认值正在泄漏到现实世界（"Elena Vance… is named in 684 new GitHub projects this year. Before 2025: none"）。

**Why it matters:** 同质化一直有人论证，这次是测量，而且把成因定位到助手调优而非预训练数据。它的实用建议也经得起检验：让 AI"be original"没有用——给上下文才有用。

[`🔗 AI is giving everyone the same advice`](https://a90.com/experiments/same-advice/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50577872)

---

## 35. "The gig economy has arrived for cardiologists"：Scale AI 旗下 Outlier 给医生开 180 美元时薪——然后套用数据工人那一套

- **Velocity:** ▮ steady
- **Source:** Rest of World · HN 146+ pts · ~43h 前
- **Tags:** `labor` `data-work` `gig-economy` `industry`

Julián Posada（耶鲁大学，《Platform Extractivism》作者）记录了 AI 劳动力供给的下一层：被招募进数据工作的医生、律师和博士。Scale AI 旗下的 Outlier 广告写着"up to $180 an hour for physicians in the U.S. to design complex cardiac scenarios, review artificial intelligence-generated reports, and rank model outputs"，而同样的工作"up to $7.50 an hour for Tagalog work in the Philippines"、"up to $12.50 an hour for Swahili in Tanzania"。文章的重点是模式而非价格：全球数据劳动力身上早已记录在案的那些手段——降薪、任务稀缺、突然封号与已读不回——如今落在了以为这套路数与自己无关的高学历专业人士头上。

**Why it matters:** 前沿劳动力市场正在收敛成一张带地区乘数的全球价目表——而高端角色之所以高端，恰恰是因为他们在训练那批终将把自己定价出局的模型。对任何想把"AI 评估"当副业收入的人，这篇文章就是尽职调查。

[`🔗 Rest of World：AI isn't replacing your job. It's turning it into low-paid gig work`](https://restofworld.org/2026/ai-jobs-skills-gig-work/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50562500)

---

## 36. 法院拒绝给仅凭人脸识别匹配就执行逮捕的警探合格豁免——"the Fourth Amendment does not permit an individual to be arrested based on nothing more than an uncorroborated conclusion by AI"

- **Velocity:** ▮ steady
- **Source:** Techdirt · HN 69+ pts · ~37h 前 · 判决见 DocumentCloud
- **Tags:** `policy` `facial-recognition` `fourth-amendment` `law-enforcement`

判决背后的故事是一起崩塌的空头支票逮捕案：Florence（肯塔基州）警局的警探 Ryan Kilmer 将银行监控截图送入人脸识别，并按判决书的表述"Relying solely on the AI identification… concluded that 'Yony' was actually Alain Vizcay Osorio"——把一个 Facebook 账号"for an unknown reason"匹配到了被告身上。Osorio 被羁押；在他证明案发时人在内布拉斯加后，指控被撤销。在随后的民事诉讼中，法院拒绝了合格豁免，裁定"the Fourth Amendment does not allow a detective to delegate to AI the task of assessing probable cause"，且"no reasonable detective in the Defendant's position could conclude otherwise." 判决还指出 Florence 警局自己的政策早已写明，人脸识别不能单独构成 probable cause。Techdirt 对冲击半径的解读是它刷屏的原因：同样的逻辑会延伸到预测式警务和 AI 代写的警方报告。

**Why it matters:** 这是模型未经证实的说法在国家权力面前失效的判例法——每个向执法机构出售 AI 分诊的供应商都得迈过这道坎；拒绝豁免意味着它将走向上诉，而不是悄悄和解。

[`🔗 判决书（DocumentCloud PDF）`](https://www.documentcloud.org/documents/28909866-ai-isnt-pc/) · [`🔗 Techdirt 分析`](https://www.techdirt.com/2026/11/19/court-tells-cops-that-the-4th-amendment-doesnt-cover-ai-generated-probable-cause/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50567735)

---

## 37. Twice-Told Critiques：ICLR 同一论文各审稿意见的主张级重合率一年内从 12.0% 升至 21.3%

- **Velocity:** ▮ steady
- **Source:** arXiv · 2611.26286 · 11 月 19 日提交
- **Tags:** `peer-review` `llm-detection` `ai-research`

一项单人作者（Ilya Gusev）的测量研究，把同行评审辩论中一直被断言的事变成了数字：同一篇论文的审稿意见越来越倾向找出同样的问题。在"in reviews from the same stage of the review process"的口径下度量主张级重合率，ICLR 从 12.0%（2026）升至 21.3%（2027），NeurIPS、ICML 与 F1000、PLOS 期刊也逐年上升；2027 年，第三份 ICLR 审稿意见在前两份之外新增 5.46 个问题，低于 2026 年的 6.12。与 MELD（一个 LLM 文本检测器）交叉核对："two reviews that MELD flags overlap more than two unflagged reviews: by 3.0 points at ICLR in 2024-2025, by 4.5 points in 2026-2027, and by 5.4 points across five journal sources"——被标记的审稿意见彼此"less distinct from each other"的证据。

**Why it matters:** 它给 11 月 18 日的"Can Peer Review Survive AI-Generated Text?"提案提供了第一个具体数字——不是看起来像 AI 写的文字，而是表现得像同一个人写完的审稿意见集合。审稿人分配、转投系统与 meta-review 全部继承这个问题。

[`🔗 arXiv：Twice-Told Critiques`](https://arxiv.org/abs/2611.26286) · [`🔗 Hugging Face papers`](https://huggingface.co/papers/2611.26286) · [`🔗 Fernández-Villaverde：Can Peer Review Survive AI-Generated Text?（PDF）`](https://www.sas.upenn.edu/~jesusfv/Peer_Review.pdf)

---

## 元数据

| Field | Value |
|-------|-------|
| Generated | 2026-11-21T12:25:51Z |
| Items | 37 |
| Sources tracked | 40 (Hacker News, GitHub Trending, CISA KEV, NVD, Red Hat security data, nginx.org, CERT-PL, PSF/discuss.python.org, Thinking Machines, vendor blogs, arXiv, gnupg-announce, backblaze.com, ruv.is, status.1984.is, bbc.com, france24.com, a90.com, restofworld.org, techdirt.com, documentcloud.org, ricapar.net, github.com, huggingface.co) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[前一天](../2026-11-20.md) · [Raw .md](https://trending.md/zh/feed/2026-11-21.md) · [归档](../archive/)
