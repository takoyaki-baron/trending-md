---
date: 2026-10-14
updated: 2026-10-14T04:20:00Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 44
license: CC-BY-4.0
---

# 趋势 — 2026-10-14

## 1. Gemini 4 Argon 正式开放：消费级 rollout 附带一张自认五项落后的基准表——外加机器人版

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 650+ pts · ~4.2小时前 (~00:03 UTC+8)
- **Tags:** `gemini` `model-release` `ga` `robotics` `cyber`

继我们 10月2日 对 9月30日 发布会的报道（Fairwind 可信防御者优先、$2/$10 介绍价、100万 token 输出上限、Artificial Analysis 智能指数 53 / 223 名中第 8）之后：**Gemini 4 Argon 现已正式开放**——"今日起向 Google AI Pro 与 Ultra 订阅用户开放"，覆盖 Gemini 应用、AI Mode、AI Studio、Antigravity、Gemini API 与 Cloud。发布页的基准表公布了真实的落败项：FrontierSWE v2 55.0 对 Claude Fable 5.1 的 65.5，Terminal-bench 4.0 57.4 对 Opus 5.5 的 66.4，Terminal-Bench Science 57.6 对 GPT-6 Astra 的 68.1，PostTrainBench 45.3 对 49.3，OSWorld-2.0 69.2（仅离线子集、部分得分）对 72.6。获胜项包括 LABBench 2 的 88.8、RiemannBench 76.0、GraphWalks 99.7（≤128k），以及 CWE-bench v1 以 68.0 与 Astra 并列第一。Google 称其为"迄今对间接提示注入最有韧性的模型"，部署了"监控 Argon 思维链与行动、必要时中止执行"的失准缓解机制，并将 Fairwind 扩展至"数百个新增"合作伙伴。同日的机器人版将 Argon 定位为"通用物理推理模型"：ERQA 87%（"超过所有其他前沿模型"），仿真训练数据把真实 VLA 成功率从 56% 提到 75%，API 模型名 `gemini-4-argon`。

**为什么重要：** 正式开放却公布正面落败的基准，正是本信息流一直在呼吁的"基准问责"姿态（对比昨天只挂工具档数字的 Wonder Full）——而真正安静的大事是 Fairwind 的扩张：拿到"无网络安全防护"版 Argon 的群体正在成倍增长。

[`🔗 Google DeepMind: Gemini`](https://deepmind.google/models/gemini/) · [`🔗 Gemini 4 Argon for Robotics`](https://developers.googleblog.com/gemini-4-argon-for-robotics/)

---

## 2. Apple HomeView：一颗 A18 驱动的智能家居显示屏，摄像头与麦克风数据在 Secure Exclaves 中处理

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 550+ pts · ~7.2小时前 (~21:02 UTC+8)
- **Tags:** `apple` `smart-home` `hardware` `privacy`

Apple 发布 **HomeView**：7 英寸智能家居显示屏/中枢（穹顶铝制底座、1200 万像素 Center Stage 摄像头、四波束成形麦克风、A18 芯片），另有壁挂版本——**11月13日**发售，现已开启预购。它运行家庭应用、FaceTime、音乐与 Siri；最多识别六张人脸的多用户支持；家庭摄像头画面同屏最多九路；烟雾/一氧化碳声音检测；Handoff 与 Safari"开始烹饪"模式。Siri AI 以测试版随 HomeView 软件 27.2 提供——仅英语、有用量限制。真正值得注意的是隐私架构：摄像头与麦克风数据在 A18 的 **Secure Exclaves** 中处理——"操作系统与 Apple 均无法访问的隔离舱"。新的 Apple Home Collection 配件（摄像头、温控器、门锁）"稍后推出"、端到端加密；配件必须通过 HomeKit 或 Matter 认证。个人内容（信息、日历）只在配对 iPhone 处于同一 Wi-Fi、近期解锁过、且人脸识别通过时才会出现。页面未公布任何新 SDK 或 API。

**为什么重要：** Secure Exclaves 把 Apple 的设备内信任边界延伸到了常开传感器——今后所有环境摄像头产品都会被拿来与这个架构对比；而 Matter/HomeKit 徽章则表明 Apple 打算继续做智能家居的守门人，而不是开放平台。

[`🔗 Apple: HomeView`](https://www.apple.com/apple-homeview/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50071017)

---

## 3. Mozilla 推出 Firefox Enterprise：本地部署的浏览器治理——带一个能关掉 AI 工具的开关

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 490+ pts · ~8.2小时前 (~20:00 UTC+8)
- **Tags:** `mozilla` `firefox` `enterprise` `browser` `dlp`

Mozilla 发布 **Firefox Enterprise**——"面向受监管与安全敏感组织的本地部署浏览器治理"：管理控制台跑在客户自己的基础设施上，提供集中策略管控、外部连接控制、组织级扩展allow/block、面向高风险浏览的 Lockdown Mode、可"按域名警告或阻断敏感数据操作"的原生 DLP、SIEM 事件导出，以及这个品类里的新东西——**"AI controls — allow, restrict or disable AI tools"（允许/限制/禁用 AI 工具）**。附带 Professional Support（私有分诊、明确响应时限），**Thunderbird Enterprise** 标注"即将推出"、纳入同一控制台。合规徽章：DORA、GDPR、NIS2、ISO27001、SOC2。卖点押在开源透明与 Mozilla 自研引擎的反单一化上；值得注意的是，页面只字未提 ESR——企业版 Firefox 历来的支柱。

**为什么重要：** 浏览器正在成为数据与 AI 使用共同的执行点，而"允许/限制/禁用 AI 工具"开关是企业需求被写成了功能复选框。Mozilla 卖本地部署 + 非 Chromium 内核，是一记瞄准后 DORA 时代欧洲的主权牌。

[`🔗 Firefox Enterprise`](https://www.firefox.com/en-US/enterprise/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50070302)

---

## 4. Anthropic 重构源码管理：智能体压垮了 git，于是 7 名工程师用 5 个月造了 Scion

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 260+ pts · ~4.4小时前 (~23:49 UTC+8)
- **Tags:** `version-control` `monorepo` `agents` `ci` `infrastructure`

Anthropic 的工程博客给"智能体规模的软件工程"给出了数字：合并量从 ~2,500/天（2026年5月）涨到 **30,000+/天（9月）**，CI 检出约每天 2,500 万次——照 naive 的 git fetch 意味着每天 600+ PB 流量，峰值时他们内网跑着几百个 git 镜像硬扛。解法是 **Scion**：一个为"永远在线的客户端"设计的自研集中式 VCS——服务器负责历史、blame、diff、合并；客户端只持有有界缓存与稀疏/虚拟化工作副本；一切操作皆 API；不鼓励用 refs（因为 refs 逼全局协调）；工作单元是"changeset"（内容寻址 blob 的 WAL 条目）。结果：缓存命中率 99%+、基础设施占用缩小 200 倍、检出快两个数量级、CI CPU 节省 25%——外加带语义审批约束的评审工具 **Antique**。工程师从逐行读代码转为审意图、设约束。告警同样直白："Scion 绝不是 git 的通用替代品"，全局合并队列锁做不到（他们依赖合并后测试，让 Claude 解决冲突），他们真正的诉求是 git 平台采纳服务端 RPC。

**为什么重要：** 这是第一份量化"智能体驱动开发如何冲击研发基础设施"的数据——四个月 12 倍的合并量增长——并罕见地诚实地替所有人下了结论：没有超大 monorepo 的体量，别抄这个作业。

[`🔗 Anthropic Engineering`](https://www.anthropic.com/engineering/redesigning-source-control) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50073633)

---

## 5. 六天从网页到计算器：XBOW 的智能体造出了拿下 Google 首个 25 万美元赏金的 Chrome 全链

- **Velocity:** ▮▮ rising
- **Source:** XBOW Labs · HN 12 pts · ~1.6小时前 (~02:37 UTC+8)
- **Tags:** `chrome` `v8` `exploitation` `ai-agents` `vrp`

XBOW 的两篇披露文详解了这条在 Google 2026年4月新规下斩获**首个 25 万美元 Chrome 全链 VRP 赏金**的利用链：从渲染进程里的网页 JavaScript 一路打到用 `CreateProcessW` 启动计算器。三个漏洞：(1) V8 Maglev 在反优化时复用了可变装箱数字——获得 V8 4 GiB 指针压缩笼内的读写；(2) 动画 WebP 的 TOCTOU——缓存的几何信息遇上被改动的图像字节——换来笼外一次任意 64 位写入，再借 Wasm 代码指针表劫持拿到渲染进程代码执行；(3) Crashpad 把对"已冻结"渲染进程的一次失败读取当作稳定观测——用线程创建标志 `0x42` 击穿 `NtSuspendProcess()` 假设——在无沙箱的崩溃处理进程中拿到代码执行。工作从 8月2日 持续到 8月7日（六天、约 4 万美元 API 费用），OpenAI `gpt-5.6-sol` 智能体分路并行推进；四名人类负责定策略、供上下文、"质疑结果"。告警与结果同样精彩：第一条链死于其 Gin 漏洞与 Google 已知内部问题撞车，备选漏洞正是为此预先准备的；作者强调"我们确实用了相当多的人类专业判断"；三个漏洞均已修补（重启 Chrome 才生效）。

**为什么重要：** 国家级浏览器全链的成本从"6–9 个月、四名专家"跌到"六天 + 4 万美元"——而作者自己的预测是一年之内连人类指挥这一环也会消失。防御方拿到的是同一条曲线。

[`🔗 XBOW 博客：全链利用`](https://xbow.com/blog/xbow-built-a-chrome-full-chain-exploit) · [`🔗 XBOW Labs：Zero to Calc in Six Days`](https://xbow.com/labs/research/zero-to-calc-in-six-days-inside-xbow-chrome-full-chain)

---

## 6. Ivanti Connect Secure 身份验证绕过进入 CISA KEV——多数管理员还没看到公告，利用已在发生

- **Velocity:** ▮▮ rising
- **Source:** NVD/CISA KEV · NVD 记录发布于 10月13日 (~00:17 UTC+8) · KEV 整改期限 10月16日
- **Tags:** `cve` `kev` `ivanti` `vpn` `auth-bypass`

**CVE-2026-104935**："ICS 25.1.3.0 之前版本中的身份验证绕过（欺骗）允许远程未认证攻击者执行任意命令。不影响 22.7R2.14 及更早版本。"评分 **CVSS 8.6 HIGH**（`AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:L/A:L`）——CNA 赋分，NVD 记录已 Analyzed、10月13日 发布——并已进入 CISA 已知被利用漏洞目录，**整改期限 10月16日**（BOD 26-04，需取证排查）。版本算术是运维陷阱：修复线是 25.1.3.0，旧 22.7R2.x 线被声明不受影响——夹在中间的一切都是问号。厂商公告在 Ivanti 支持门户（hub.ivanti.com）之后，核查时页面无法加载。

**为什么重要：** 8.6，不是 9.x——但 KEV 收录比分数更响亮，因为它意味着利用已被证实而非停留在理论。在一台边缘 VPN 设备上，面对这么绕的版本划分，唯一安全的读法是"先打补丁，再谈影响范围"。

[`🔗 NVD: CVE-2026-104935`](https://nvd.nist.gov/vuln/detail/CVE-2026-104935) · [`🔗 CISA KEV 目录`](https://www.cisa.gov/known-exploited-vulnerabilities-catalog?field_cve=CVE-2026-104935)

---

## 7. 网络攻击令费马恩 Belt 超级工程停摆：工卡被禁用、船舶被瘫痪、归属不明

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 130+ pts · ~3.9小时前 (~00:24 UTC+8)
- **Tags:** `critical-infrastructure` `cyberattack` `denmark` `ot-security`

针对 FLC 联合体的攻击令 18 公里费马恩海峡沉管隧道（约 70 亿欧元、89 个沉管节段的世界最长隧道，雇有来自丹、德、法、比、荷公司约 2,800 名员工）的建设停摆：**工人身份证件被禁用，海上作业的船舶、起重机和平台被瘫痪**；丹麦媒体报道工程"因此完全停工"。国家投资方 Sund & Bælt 证实正在"与承包商沟通局势"。丹麦数字安全委员会主管 Henning Mortensen"不排除"混合战争关联——这是猜测，没有归属结论，也没有恢复时间表；项目官方新闻页（femern.com，本条目核查过）没有任何声明，最新一条还停在 10月5日。项目在攻击前就已宣布延期。

**为什么重要：** 模式本身才是重点——通过 IT 身份系统实现 OT 邻接的破坏，而不是黑 PLC。在归属落定之前，混合战争的叙事只是噪音；可操作的的事实（一个超级工程被一次凭证系统故障逼停）才是每个工业运营方都该计入定价的安全故事。

[`🔗 UA.News / RMF24 报道`](https://ua.news/en/world/kiberataka-zupinila-budivnitstvo-tuneliu-mizh-daniieiu-ta-nimechchinoiu-rmf24) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50074289)

---

## 8. iOS 版 Thunderbird：从零重写的原生应用、pre-alpha——以及一个为贡献者设计的功能开关系统

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 230+ pts · ~5.1小时前 (~23:07 UTC+8)
- **Tags:** `thunderbird` `ios` `email` `swift` `open-source`

Thunderbird 的首篇预览（10月1日 发布、10月13日 冲上 HN 首页）展示了一个**用 Swift/SwiftUI 从零构建的全原生 iOS 客户端**——按作者评论约 98.9% 是 Swift，公开仓库 `thunderbird/thunderbird-ios`——不复用桌面或 Android 的任何代码。WIP 阶段已可用的：快速账户设置、"兼顾电池寿命"的后台同步、收件箱、现代撰写器，以及一个让社区开发者尽早测试功能的实验性功能开关系统。首个社区测试版"数月内"推出；TestFlight 还没有。告警同样明确："一切皆非最终形态"；iCloud/me.com 账户只能走标准 IMAP + 应用专用密码（Apple 不提供 OAuth）；隐私立场是"零追踪、零数据收集"；iPad 在规划内、时间未定。

**为什么重要：** 它补全了今天 Firefox Enterprise 发布开启的图景——那边的控制台已经承诺纳管 Thunderbird——而客户端正在为它从未覆盖的最后一个平台重构，且贡献基础设施（功能开关）从第一个 commit 起就设计进去了，而不是事后加装。

[`🔗 Thunderbird 博客`](https://blog.thunderbird.net/2026/10/thunderbird-for-ios-a-first-look-at-the-native-iphone-email-app-in-development/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50072913)

---

## 9. Linux 手机的解剖报告：硬件终于成熟，公司们没有

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 270+ pts · ~39小时前 (~12:54 UTC+8，10月12日)
- **Tags:** `linux` `mobile` `open-source` `hardware`

Amos Batto 同时拥有 Librem 5 与 PinePhone、照着原理图记录过每一颗元件——他写下了十年来最具体的 Linux 手机清算。失败的部分：Librem 5 相机每拍一张停顿 3–4 秒，720p 视频编码耗时约为片长的 10 倍（PinePhone 约 50 倍），A64/i.MX8M SoC 让两台机器都迟钝。成功的部分：**Phosh** 赢下界面之争（39.3% 的 PinePhone 用户使用，Sxmo 15.5%），Purism 发起的 Librem 5 项目族约 46.9 万行代码中 98.7% 已由外部组织（GNOME、Phosh.mobi e.V.、FreeDesktop.org）掌控；移动 UI 已进入 Debian、Ubuntu、Fedora、postmarketOS 等发行版仓库。硬件转折点是瑞芯微 RK3588S（Liberux NEXX、Dawndrums Divine D.、下一代 Librem 的可能选择）——单核仍落后低端骁龙 4 Gen 4 约 25%。剩下三条活路：mainline RK3588S 手机、高通 IoT SoC（QCM6490 支持到 2036年7月）、Android 内核手机——但 libhybris 设备出厂自带 2026年1月1日 EOL 的内核，带着 **1,539 个未修复 CVE**，Waydroid 式应用兼容还削弱沙箱。Purism 涨价到 $1,299 并承认 600 笔无法退款的订单；PINE64 社区崩盘。论点："阻碍 Linux 手机的真正 Barrier 是公司"——期待的是 System76 式的利基市场，而不是挑战双寡头。

**为什么重要：** 它把十年的社区乐观翻译成了供应链与安全论证——EOL 内核的 CVE 数字是迄今反对"刷机就行"的最强单条事实，而 98.7% 的上游化成功是留给这个利基市场的最强论据。

[`🔗 Linux 手机能成为可行替代吗？`](https://amosbbatto.wordpress.com/2026/10/05/linux-phones-alternative/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50051530)

---

## 10. Character.AI 申请 Chapter 11：法院监督出售，服务"暂时"在线，流拍即关停

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 220+ pts · ~12.8小时前 (~15:28 UTC+8)
- **Tags:** `character-ai` `bankruptcy` `ai-companions` `industry`

Character.AI 宣布（10月12日）已"启动自愿 Chapter 11 破产程序，以推进法院监督下的公司出售"，理由是"一年来的重大法律、监管与运营逆风"。出售程序预计"11月底或 12月初"完成——若未产生可执行的报价，"平台将被关停"。订阅暂时有效、账单不变；数据仍按现有隐私政策处理，导出与删除功能可用；债权申报通过索赔代理 Stretto 进行。公司自己的公告未点名任何买家——二手报道里流传的买家猜测并不在 filing 公告中。

**为什么重要：** 第一个走到重整的头部 AI 陪伴平台，几百万重度用户头顶悬着一个 11 月中的死线。与开发者相关的部分是运营性的：困境出售中用户数据的命运，以及陪伴式 AI 的用户留存能否在易主后幸存。

[`🔗 Character.AI：官方说明`](https://blog.character.ai/an-update-on-character-ai/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50068036)

---

## 11. Janas：纯 C 实现 MoE 专家从 NVMe 流式读取——32 GB 笔记本跑 80B 模型 37 tok/s（自报数据）

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 210+ pts · ~22.2小时前 (~06:05 UTC+8)
- **Tags:** `llm` `inference` `moe` `local` `ssd`

Show HN 的 **Janas** 是一个纯 C（除 libc 外零依赖）的实验性推理引擎，面向普通硬件上的混合专家模型：权重留在磁盘上，每个 token 所需的专家用 `O_DIRECT` 从 NVMe 流式读取（磁盘约 5.7 GB/s），约 19 GB 内存缓存 80B 模型的热点专家，Vulkan 负责提示处理，draft 来自各模型内置的 MTP 模块（Qwen3.5/3.6/Next）或 Gemma 4 的小型草稿助手。头条数据：**32 GB 笔记本上跑 Qwen3-Next-80B（48 GB 权重）37 tok/s——对比 llama.cpp 的 2.8 tok/s**；关掉 draft 24 tok/s，且"Q4_K_M 下对比的 13 个模型全部快于 llama.cpp"。README 做了大多数自制基准都跳过的诚信工作：所有数据由作者在单机上跑出，llama.cpp 在 80B 模型上需要绕 OOM 的非常规配置，两套工具"的测量方式并不完全相同"，drafts 一列"在 2026年9月26日 之前是错的"，以及"这是实验，不是产品"。

**为什么重要：** 与 AirLLM 的逐层加载同属一个流派，但 MoE 的稀疏性才是让 SSD 流式读取真正划算的原因——每个 token 只需读它要的那几个专家。而这张自审过的基准表，是单人推理引擎浪潮里诚实的模板。

[`🔗 prabanta-dev/janas`](https://github.com/prabanta-dev/janas) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50063717)

---

## 12. Apple 的 Minions：用闲置 Apple Silicon 搭建的虚拟 GPU 云——3 页论文，大命题

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 195 pts · ~7.8小时前 (~20:26 UTC+8)
- **Tags:** `apple` `gpu` `distributed` `inference`

Apple ML Research 发表 **Minions**（arXiv 2610.12970，10月9日 提交；六位作者含 Sean Suchter）：一个"动态分布式虚拟 GPU 云"，把 macOS 机器的 GPU——那些"日常使用中大部分时间闲置"的 GPU——汇成一个具备"容错与高效资源利用"的推理平台，面向 otherwise 要忍受集中式 GPU"高成本、低弹性、长排队"的团队。论文自己的结论：闲置 macOS 设备"可以被改造成实用的分布式 GPU 推理平台"，在集中算力紧张的环境尤其实用。摘要没有基准、没有设备数、没有吞吐数字——论文只有 3 页、1 图、1 表。

**为什么重要：** 机队级闲置 GPU 回收是 Apple"人手一块硅"战略的逻辑终点——但论文自身的单薄意味着"实用平台"的说法目前是个方向标，不是实测结果。值得蹲一个带数字的后续。

[`🔗 Apple ML Research: Minions`](https://machinelearning.apple.com/research/distributed-gpu-cloud) · [`🔗 arXiv 2610.12970`](https://arxiv.org/abs/2610.12970)

---

## 13. "我发了 HN，然后网站被 AI 爬虫淹了"——一个摘要服务拖垮的流量比首页还多

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 160+ pts · ~4.8小时前 (~23:25 UTC+8)
- **Tags:** `ai-crawlers` `web` `infra` `robots-txt`

Sammy Straus 把 sprinklz.io（可定制阅读器）发上 HN 拿了约 100 个赞之后，网站慢了好几天——而且是在**人类关注消退之后**。诊断结果：全部流量里近一半来自单一 AI 服务，它监控网站变化、生成 AI 新闻信，"每分钟很多很多次"地轰这个站；其余是可识别的爬虫（Claude bot、OpenAI bot、Google）加漏洞扫描器——在一个根本不是 WordPress 的站上探测 WordPress 文件。统计数据的自相矛盾是线索——真实用户一只手数得过来，服务器负载却爆表——因为多数机器人请求从不抓文章、也不执行 SPA 的 JavaScript。解法都不起眼：按端点的请求日志、直接封掉那个摘要服务、仍然欢迎搜索机器人的 robots.txt、限流——以及长期方案，把网站真正做快。Claude 则被防御性地用来模拟扫描器、确认没有敏感信息外泄。

**为什么重要：** 这是一次对"智能体网络税"的实地测量：一个未配置的 AI 摘要服务拖过的流量比 HN 首页一波还多，而且在首页热度结束之后继续拖。可迁移的教训是那件无聊的事——按端点的日志让不可见的流量变得可见。

[`🔗 sammystraus.com`](https://sammystraus.com/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50073221)

---

## 14. xtool 再上趋势榜：在 Linux 与 Windows 上构建并分发 iOS 应用——v1.21.0、MIT、9.1k★

- **Velocity:** ▮ rising
- **Source:** GitHub Trending · 今日 +1,182★（~04:15 UTC+8 快照）· v1.21.0 于 10月5日 发布
- **Tags:** `ios` `xcode` `swift` `cross-platform`

**xtool-org/xtool**——"跨平台 Xcode 替代品。用 SwiftPM 在 Linux、Windows、macOS 上构建并分发 iOS 应用"——以今日 +1,182 星回到日榜第 9（总 9,125★，MIT）。已核实的状态：最新版本 **v1.21.0** 于 10月5日 发布，最后 push 10月6日，维护活跃，93 个 open issue。大 HN 讨论（195–269 pts）都停留在 2025年5月 的发布期，所以本周这波上涨没有新的讨论帖可挂——可见的触发点就是 v1.21.0 的发布窗口，本信息流不会把它包装成别的。

**为什么重要：** "没有 Mac 也能构建并分发 iOS 应用"在安静地复利——一个 23 个月的项目还能拉出四位数的单日涨星，说明 Linux 上的 Swift 工具链已经从演示跨进了至少一部分 iOS 生态参与者的日常。

[`🔗 xtool-org/xtool`](https://github.com/xtool-org/xtool) · [`🔗 v1.21.0 发布`](https://github.com/xtool-org/xtool/releases/tag/v1.21.0)

---

## 15. SolidCraft：纯 Rust 的参数化 CAD、带 MCP——智能体 CAD 货架一周内迎来第三个选手

- **Velocity:** ▮ rising
- **Source:** Hacker News (Show HN) · 127 pts · ~20.1小时前 (~08:11 UTC+8)
- **Tags:** `cad` `mcp` `rust` `agents`

Show HN 的 **SolidCraft**——"纯 Rust 构建的开源参数化 3D CAD 应用。桌面、Web，以及经 MCP 的自动化"——上线首周拿下 127 分与 1,700★（仓库 10月7日 创建，今日仍有 push）。它落在一条已被本信息流覆盖的时间线上：text-to-cad（10月12日）与 CADCraft（10月9日）——三个互相独立的项目、三种语言与界面，押的都是同一个判断：CAD 是下一个智能体工作台，且 MCP 是集成面。

**为什么重要：** 三个互不相干的 CAD 项目在同一周扑向同一个协议，这是需求信号而不是潮流——"智能体当机加工车间操作员"正在成为一个真实的工作负载类别，而 MCP 正在成为它的默认插头。

[`🔗 bherbruck/solidcraft`](https://github.com/bherbruck/solidcraft) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50064840)

---

## 16. "你的游戏就是 harness"：让代码智能体胜任游戏开发——种子随机、odiff 分数、一个胖 Thing 结构体

- **Velocity:** ▮ steady
- **Source:** Hacker News · 72 pts · ~6小时前 (~22:14 UTC+8)
- **Tags:** `gamedev` `agents` `claude-code` `workflow`

Kyle Kukshtel 对其 Indie Rodeo Calgary 演讲的文字版，从一个不舒服的观察开始："从结构上说，LLM 不擅长读游戏"——资源、状态与数据的不透明度是 Web 代码没有的。他的答案是让游戏自己成为 harness，并给出具体技术：从第一行代码起用种子随机；用 **odiff** 做截图对比，让智能体对着量化的相似度分数（"85% 相似"）优化，而不是用朴素像素对比制造"context rot"；从第一天就做存档/读档；**"Thing-Driven Development"**——用一个胖 `Thing` 结构体取代 OOP 类继承，给智能体一个无歧义的修改位置（"A Tree is a Dog"）；可序列化的命令模式；外部数据工具（他的 Depot 让约 7 个非程序员迭代游戏数据）；仿真独立成库，因为"仿真是唯一事实源"；以及智能体真能读的文本化性能分析（samply）。mood.site 花了 2–3 周约 20 小时；闭环之后，一次智能体回合"以秒计"。他自己标出了边界：手头的小项目一个都没用——这些技术瞄准的是更大的游戏。

**为什么重要：** 对"为什么智能体写 CRUD 神勇、碰引擎就垮"迄今最锋利的回答——差距在可观测性与可 diff 的事实源，不在模型质量。而"量化截图分数当反馈"这一招，能走的远不止游戏。

[`🔗 kylekukshtel.com`](https://kylekukshtel.com/ai-harness-engineering-game-development-claude-code) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50072120)

---

## 17. BB(10) 现已被证明超过格雷厄姆数——一台 Coq 验证的机器把忙海狸边界从 f_ω 抬到 f_(ω+1)

- **Velocity:** ▮ steady
- **Source:** Hacker News · 63 pts · ~7.6小时前 (~20:40 UTC+8)
- **Tags:** `busy-beaver` `computability` `coq` `formal-verification`

GitHub 用户 jeff87654（10月8日，经计算机搜索发现）发布的一台 10 状态、2 符号图灵机从空白纸带停机，其得分**在 Coq 8.20.1 中得到证明**（基于 busycoq 框架）——十二条主定理"Closed under the global context"、无公理，另附只需 Coq 标准库的自包含单文件版。界：f_(ω+1)((3T−13)/7 − 2) < ones < f_(ω+1)(6T)，其中 T = 2↑³⁷ 3——把 BB(10) 抬过 2024 冠军机的 f_ω(f_ω(25))，也越过格雷厄姆数。验证是分层的：先做独立的字面 Python 模拟，再跑一个与证明零共享代码的独立模拟器，"0 mismatches"。作者自己的告警：对 BB(11)–BB(14) 冠军机的对比"只在纸上"，直观的事件描述来自模拟而非 Coq，总步数从未算出，以及一切都"若被接受"——忙海狸社区尚未认可它。

**为什么重要：** 小 n 忙海狸边界靠暴力搜索加证明工程持续推进，而这份作业是纪律的正确示范：机器验证的得分、冗余的验证、诚实的"未获接受"状态。下一步的闸门是社区评审——请把这个纪录当作"已主张"，而非"已确认"。

[`🔗 该机器的证明文件`](https://github.com/jeff87654/busy-beaver/blob/main/BB10/1RB0RA_1LC1LF_1RD0LB_1RA1LE_1LI0LC_0RG1LD_1RH1LG_1LC0RG_0LJ0LI_1RZ0LC.md) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50070741)

---

## 18. 不要用 uv-build 的恳求：用 1.4 MiB 的 Rust 替掉 45 KiB 的 Python，一个月发十二个版

- **Velocity:** ▮ steady
- **Source:** Hacker News · 47 pts · ~2.1小时前 (~02:09 UTC+8)
- **Tags:** `python` `packaging` `pep517` `rust`

Gentoo 开发者 Michał Górny 的恳求明确不是冲着 uv 本身（"好工具，上游响应也快"）——而是冲着 Astral 的 **uv-build** 作为 PEP 517 构建后端这件事：wheel 重 1.2–1.5 MiB，对比 flit-core 的 45 KiB，**30 天里发了 12 个版本**，而每个采用它的下游包都在逼基于源码的发行版重新编译一个大而快变的 Rust 二进制——"又一打包丢了 keyword"。Rust 的可移植性也在咬人：rustix 依赖跳过 SPARC、32 位平台地址空间耗尽（Gentoo 的 ebuild 带着两个 hack 才能编过 uv）。那些正当性理由经不起推敲：PEP 517 的全部意义就是后端与前端自由组合，"与 uv 保持一致"不成立；性能收益约 100 ms，还是"一个很少执行的动作"，终端用户根本不跑。建议：flit-core 或 hatchling，配合 uv 做前端一样好用。

**为什么重要：** Rust 重写浪潮一再撞上同一堵墙：构建后端是基础设施，二进制体积加发版频率是一笔由最不可见的下游支付的税——源码发行版、冷门架构、32 位。PEP 517 的意义就在于让"换个小点的后端"成为一个正当答案。

[`🔗 不要用 uv-build 的恳求`](https://blogs.gentoo.org/mgorny/2026/10/12/a-plea-not-to-use-uv-build/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50076048)

---
## 19. OpenAI 用自家模型找到了会议室里的窃听器——而聊天记录成了起诉书

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 469 pts · ~8小时前 (~04:23 UTC+8) · 司法部起诉书，10月13日
- **Tags:** `openai` `insider-threat` `forensics` `security`

OpenAI 工程师 Abdulrahman Alfozan（35 岁）被捕，被控使用设备截取口头通信——起因是公司旧金山办公室一间高管会议室里被发现藏有录音设备。按起诉书的说法：设备于 **9月30日** 被 OpenAI 的技术反监听小组在一次会议室排查中发现，插在电视机背后的 USB 口上，用卫生纸包裹，内容已加密，据信在 9月28日 前后安装。真正值得读的是证据链。检方称，在设备出现之前，Alfozan 曾用一个"效率工具"查询 OpenAI 的办公楼地址、会议室、房间容量与日历，以及管理层和外部合作方会议的地点；一个与他配偶关联、且与他本人账号共享标识符的聊天机器人账号，在 9月24日至30日 之间提交了关于搭建、安装、隐藏和远程访问录音设备的提示词——包括如何"做一个连续录音器"和"加密 SD 卡"——并在 9月27–28日 询问了后来被发现的那台具体设备，细到它的 MAC 地址。OpenAI 表示员工"用我们的模型去理解这台设备以及它从何而来"，模型还分析了设备的取证镜像；公司称"没有迹象显示此人曾不当访问或外泄模型权重、源代码或客户数据"。联邦检察官 Craig Missakian 称此事"对我们而言是国家安全问题"；若罪名成立，Alfozan 面临最高五年监禁、25 万美元罚金及三年监督释放。起诉书并未指称任何外国政府指使了该行为。

**为什么重要：** 用来筹划涉嫌犯罪和用来侦破它的，都是语言模型——而支撑指控的是留下的日志，包括一个通过共享标识符关联起来的配偶账号。请把它读成一个企业日志留存与内部威胁分析的问题，而不是谍战故事。

[`🔗 SF Standard`](https://www.sfstandard.com/2026/10/13/openai-engineer-arrested-alleged-bugging-executive-conference-room/) · [`🔗 SiliconANGLE`](https://siliconangle.com/2026/10/13/openai-fires-saudi-employee-accused-of-planting-a-bug-in-its-executive-conference-room/)

---

## 20. 微软 Maia 300：七芯片封装里的 288 GB HBM4，以及 2027 年的多吉瓦部署

- **Velocity:** ▮▮▮ trending
- **Source:** The Next Platform · ~9小时前 (~03:17 UTC+8) · 微软公告 10月12日
- **Tags:** `microsoft` `hardware` `inference` `datacenter` `ocp`

在开放计算项目（OCP）峰会上，微软揭开了自研 XPU 第三代 **Maia 300** 的面纱。微软自己的说法是：Maia 200 已在生产环境承载负载；满配 **96 加速器** 的 Maia 300 将带来 **最高 7 倍于 Maia 200 的机架级 token 吞吐**，并且"每兆瓦 token 数比领先的 GPU 系统高 40%"——而 **对比系统并未点名**。The Next Platform 对架构的解读补上了微软没说的部分：**288 GB HBM4**，八堆叠、约 18 TB/s；封装实际上是 **七颗芯片加八个 HBM 堆叠置于中介层上**（计算 chiplet 用台积电 N2P，I/O 与 HBM 控制器拆分出来）；四个 tile 簇、每簇十二个 tile；ATL 以太网互联被重做，以便把更多 XPU 塞进一个一致性域来应对更大的智能体工作负载——**一台机架 96 颗 XPU，功耗约 167 kW**。量产定于 **2027 年**，Azure Maia 将扩展到多吉瓦级部署；GitHub Copilot 与 Microsoft Foundry 将在今年底切换到 Maia 200。与 Google TPU 或 AWS Trainium 不同，微软不向外部云客户出租 Maia 算力，训练依然采购 NVIDIA 与 AMD 芯片。

**为什么重要：** 一颗没有出租渠道的推理优先加速器，是在赌微软自身的 token 需求（Copilot、Foundry、OpenAI）足以支撑这笔晶圆支出——而 7 倍与 40% 是面向未点名基线的厂商说法，在机架真正出货前请当作未经证实。

[`🔗 The Next Platform`](https://www.theregister.com/compute/2026/10/13/microsofts-clea-maia-300-inference-xpu-is-a-bandwidth-beast/5302874) · [`🔗 微软：Maia`](https://news.microsoft.com/maia-2026/) · [`🔗 Azure Maia 300 架构深潜`](https://azure.microsoft.com/en-us/blog/deep-dive-into-azure-maia-300-architecture/)

---

## 21. Adobe 十月补丁潮：ColdFusion 里两个 CVSS 10.0，以及背后更大一批未被独立分析的高危

- **Velocity:** ▮▮▮ trending
- **Source:** Adobe 安全公告 · 10月13日发布（NVD 记录约 ~05:17 UTC+8） · 优先级 2
- **Tags:** `cve` `adobe` `coldfusion` `rce` `patching`

Adobe 发布了 **APSB26-144**，一个优先级 2 的 ColdFusion 更新，修复 **2025.0.13 与 2023.0.25** 中的严重、高危与中危问题，修复版本为 **2025.0.14** 与 **2023.0.26**。其中两个是 **CVSS 10.0**（`AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H`）：**CVE-2026-105899**，危险类型文件无限制上传（CWE-434）导致任意代码执行；**CVE-2026-106622**，服务端请求伪造（CWE-918）导致权限提升——两个都无需认证，且作用域变更。其后还有代码注入与授权不当的 9.9，以及 ColdFusion RDS 的路径穿越。Adobe 声明"尚不知晓本次更新所修复问题的任何在野利用"。同一天进入 NVD 的还有同一厂商周期里更大的一批严重记录——**Experience Manager** 因授权不当导致任意代码执行的 10.0（如 CVE-2026-48382、CVE-2026-48383、CVE-2026-90532）与 **Commerce** 的 10.0（CVE-2026-103849、CVE-2026-103848）——全部为 **psirt@adobe.com 评定的 Primary**，且在 NVD 上仍处于 **"Received"**，即发布时没有独立的 NVD 分析。

**为什么重要：** 同一份公告里同时出现无需认证的上传致 RCE 与无需认证的 SSRF，且都是 10.0，对暴露在互联网上的 ColdFusion 而言绝不是"平常的星期二"。真正的运维细节是评分来源：这些是未经分析的记录上的 CNA 自评，所以决定你是否暴露的是 Adobe 的修复版本表，而不是那个数字。

[`🔗 Adobe：APSB26-144`](https://www.adobe.com/trust/security/products/coldfusion/apsb26-144.html) · [`🔗 NVD：CVE-2026-106622`](https://nvd.nist.gov/vuln/detail/CVE-2026-106622) · [`🔗 NVD：CVE-2026-105899`](https://nvd.nist.gov/vuln/detail/CVE-2026-105899)

---

## 22. SAP 十月补丁日以 10.0 的 OAuth2 SSRF 打头：外泄 BTP 客户端凭据

- **Velocity:** ▮▮ rising
- **Source:** SAP 安全补丁日 / GHSA-4mv3-jxxm-9cx2 · 10月13日发布 · NVD 记录 10月13日（~09:16 UTC+8）
- **Tags:** `cve` `sap` `ssrf` `oauth` `supply-chain`

SAP 十月安全补丁日里有一个最高危漏洞，位于 **SAP Cloud SDK for Python**：**CVE-2026-89111**，一个影响 **多租户 BTP 应用** 的 OAuth2 SSRF，评分 **CVSS 3.1 10.0**（`AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:N`）——在 NVD 上是 **Secondary，由 cna@sap.com 评定**，记录仍为 **"Received"**，没有任何 NVD 分析指标。机制是：控制 `tenant_subdomain` 参数的攻击者可以把 OAuth2 token 请求重定向到自己控制的服务器，从而 **外泄客户端凭据**。修复版本是 **0.45.2**，它"在把 `tenant_subdomain` 代入 token URL 之前，按 RFC 1123 DNS 标签规则进行校验"；使用方的缓解办法是在任何 SDK 调用之前，用已注册的租户子域白名单校验该值。同一批还包括 **CVE-2026-89110**（NetWeaver Visual Composer 访问控制失效，**9.9**）与 **CVE-2026-89108**（SAP Manufacturing Integration and Intelligence，**9.1**）——均为 CNA 评分、均未经分析。

**为什么重要：** 看向量，不要看标题。可用性影响是 **None**（`A:N`）——这是静默的凭据窃取，不是拒绝服务或 RCE，而且只在应用允许攻击者影响多租户部署中租户子域时才成立。一个悄悄交出服务凭据的 10.0，对防守方来说比一个把东西搞崩的 10.0 形态更糟。

[`🔗 GitHub 安全公告 GHSA-4mv3-jxxm-9cx2`](https://github.com/SAP/cloud-sdk-python/security/advisories/GHSA-4mv3-jxxm-9cx2) · [`🔗 NVD：CVE-2026-89111`](https://nvd.nist.gov/vuln/detail/CVE-2026-89111) · [`🔗 SAP 安全补丁日`](https://url.sap/sapsecuritypatchday)

---

## 23. 两年后的 GhostPat：Docker Hub 曾静默重分配个人访问令牌——"未发现"被利用的证据

- **Velocity:** ▮▮ rising
- **Source:** Docker 公告 · 10月12日披露 · NVD 记录 10月14日（~02:17 UTC+8） · CVE-2026-105445
- **Tags:** `cve` `docker` `supply-chain` `tokens` `registry`

**CVE-2026-105445** 是 Docker Hub 账号转组织功能中的一个供应链漏洞，评分 **CVSS 4.0 9.4**（`VC:H/VI:H/VA:H/SC:H/SI:H/SA:H`）——**Secondary，由 security@docker.com 评定**，NVD 状态为 "Received"，且记录上 **只有 v4.0 指标**。按 Docker 自己的描述，机制是：转换功能允许发起者指定一个既有账号作为新组织的所有者，而"自 2024 年 8 月 26 日起，转换还会把被转换账号的个人访问令牌（PAT）重新分配给该新所有者……方式是改写令牌的所有者记录，**不轮换也不吊销令牌密钥**。被指定的所有者既未被要求确认，也未收到通知。"于是攻击者可以铸造一个 PAT、把自己的账号转成组织、指定目标为所有者，并保留一个仍然有效、且 **以目标身份** 向 registry 认证的令牌——能在目标仓库以及目标可触达的任何组织中拉取、推送乃至删除镜像。Docker 把"以合法名义发布镜像"视为核心风险，因此评为严重；但它 **不能** 访问 Web 界面，不能修改密码、邮箱或 2FA，也不能接管账号。暴露窗口从 **2024-08-26 20:33 UTC 到 2026-09-30 约 19:10 UTC**——两年多一点。9月30日收到报告后不到 4 小时即部署修复；10月2日邮件通知受影响用户；10月8日强制停用被转移的 PAT。最值得注意的是调查本身：Docker 枚举了漏洞引入以来的每一次账号转换，并检查了 **约 30.4 万次使用被转移令牌的推送**，**未发现被利用的证据**——每一次此类推送都落在被转换组织自身或新所有者自己的仓库中。

**为什么重要：** 一个持续两年、静默重分配令牌的窗口最终没有发现利用，这是罕见的"负面结果才是故事"的供应链惊魂——但它的存在完全建立在 Docker 去把整段历史枚举出来的基础上。另一个细节是：只有 v4.0、由厂商自评、没有 NVD v3.1——这里的 9.4 不能与 CVE 3.1 表里的 9.4 相提并论。

[`🔗 Docker 安全公告`](https://www.docker.com/blog/docker-hub-security-advisory-cve-2026-105445/) · [`🔗 GhostPat（mptrdev.com）`](https://ghostpat.com/) · [`🔗 NVD：CVE-2026-105445`](https://nvd.nist.gov/vuln/detail/CVE-2026-105445)

---

## 24. Ghostscript 的 9.8 原来是"看构建版本"的：10240 次利用尝试，实验室之外零次稳定成功

- **Velocity:** ▮▮ rising
- **Source:** NVD + Wordfence 研究（经 securityonline.info） · CVE 于 9月15日发布 · 报告 10月12日
- **Tags:** `cve` `ghostscript` `wordpress` `exploitability` `patching`

**CVE-2026-39919**——Ghostscript JPEG 2000 输出适配器 `base/sjpx_openjpeg.c` 中的堆缓冲区溢出（CWE-122）——于 **9月15日** 发布，在 **10.08.0** 中修复（9月8日发布）。NVD 记录上的评分为 **9.8（CVSS 3.1）** 与 **9.3（CVSS 4.0）**，而来源很关键：两者都是 **Secondary，来自 disclosure@vulncheck.com**——第三方分析机构，不是厂商，也不是 NVD；NVD 一个月后仍将该记录列为 **"Awaiting Analysis"**。新增的事件是研究报告，而不是这个 CVE。Wordfence 的 Argus 系统在一次 WordPress 7.1 评估中发现该问题，并写出了两个可用的利用——**针对它的实验环境构建**。随后它把这些利用在另外十个 Linux 发行包环境中 **运行了 10240 次，除匹配的构建外一次都没有成功**；在四个共享完全相同 Ghostscript 可执行文件的设置中才持续有效。Wordfence 自己的定位是："该评分描述的是最坏情况，而非保证"，以及"针对特定构建的利用更难，但并不无害"。实践中重要的链路是 WordPress → Imagick → ImageMagick → Ghostscript，需要同时满足四个条件：允许匿名或低权限用户上传 PDF、自动生成预览或缩略图、ImageMagick 能触达 Ghostscript、以及未修复的包。原版 WordPress 不允许匿名上传。两个运维陷阱：**`-dSAFER` 拦不住它**（"不要把 -dSAFER 当作修复"），并且 **10.08.0 的候选版本同样报告版本号 10.08.0，但依然存在漏洞**——所以要检查完整包修订号，而不是 `gs --version`。目前尚无确认的在野利用。

**为什么重要：** 这是"评分驱动的恐慌"最值得发表的反例。一个只在已知构建上成立的 9.8，是定向攻击与共享主机镜像的风险，不是大规模扫描的风险——而那个数字来自第三方分析机构、挂在一条一个月未被分析的记录上，这一事实恰好会改变防守方先做什么。

[`🔗 NVD：CVE-2026-39919`](https://nvd.nist.gov/vuln/detail/CVE-2026-39919) · [`🔗 securityonline.info 报道`](https://securityonline.info/ghostscript-vulnerability-cve-2026-39919/) · [`🔗 Artifex：Ghostscript 10.08.0`](https://github.com/ArtifexSoftware/ghostpdl-downloads/releases/tag/gs10080)

---

## 25. 西门子 S7-1500 Web 服务器：八个 9.6 的 CVE，而"目前没有可用修复"

- **Velocity:** ▮▮ rising
- **Source:** Siemens ProductCERT SSA-591731 · 10月13日发布 · NVD 记录 10月13日（~18:17 UTC+8）
- **Tags:** `cve` `siemens` `plc` `ics` `no-fix`

西门子发布 **SSA-591731**，涉及 **SIMATIC S7-1500** PLC 系列 Web 服务器中的八个 CVE（**CVE-2026-63350–63357**），而修复列才是重点：对列出的每一款产品——SIMATIC Drive Controller CPU 1504D TF 与 1507D TF、SIMATIC ET 200SP Open Controller CPU 1515SP PC2（V2 与 V3）与 PC3 V4，以及更多 S7-1500 型号——公告都写着"**所有版本受全部 CVE 影响**"以及"**目前没有可用修复**"，并注明"西门子正在准备修复，并对尚无可修复的产品推荐具体缓解措施"。主要记录为 **CVSS 3.1 9.6**（`AV:N/AC:L/PR:N/UI:R/S:C/C:H/I:H/A:H`），**Primary，由 productcert@siemens.com 评定**——CNA 评分，无 NVD 分析——CVSS 4.0 9.4 作为 Secondary 附带。机制是通过导入的跟踪文件中未净化字段造成的存储型 XSS（CVE-2026-63353 是构造的注释字段，CVE-2026-63354 是 CSV 视觉标记数据）：攻击方式是社工持"读取诊断"权限的用户导入构造的跟踪文件，随后攻击者控制的 JavaScript 在该操作员的浏览器会话中运行，并可 **在该用户自身授权范围内** 执行 PLC 操作——而不是直接攻陷 PLC。缓解措施：如非必需则关闭 Web 服务器；把 80/443 端口限制到可信 IP；只上传可信的跟踪文件。

**为什么重要：** `UI:R` 加上"存储型 XSS"看上去很轻，直到你注意到目标是 PLC 的 Web 服务器，而且修复路径尚不存在。在 ICS 里，"没有可用修复"让缓解措施清单成为唯一可执行的产物——而诚实的定界（浏览器会话、操作员自身权限）正是它没有被写成"远程接管 PLC"的原因。

[`🔗 Siemens SSA-591731`](https://cert-portal.siemens.com/productcert/html/ssa-591731.html) · [`🔗 NVD：CVE-2026-63353`](https://nvd.nist.gov/vuln/detail/CVE-2026-63353)

---

## 26. 一个 Windows Shell 命令注入进入 CISA 的 KEV——厂商评 8.8，NVD 仍在分析中

- **Velocity:** ▮▮ rising
- **Source:** CISA KEV · 10月13日收录 · 截止 10月16日 · NVD 记录 10月13日发布（~03:22 UTC+8）
- **Tags:** `cve` `kev` `microsoft` `windows` `command-injection`

**CVE-2026-96951**——"Windows Shell 中对命令中特殊元素的不当中和（'命令注入'），允许未授权攻击者通过网络绕过某项安全特性"（CWE-77）——于 **10月13日** 被加入 CISA 的已知被利用漏洞目录，与 Ivanti 那条同一天，**截止日期 10月16日**，并按 BOD 26-04 要求 **取证排查**。最该记住的细节是评分来源：唯一公布的指标是 **CVSS 3.1 8.8**（`AV:N/AC:L/PR:N/UI:R/S:U/C:H/I:H/A:H`），**Secondary**，来自 **secure@microsoft.com**，而 NVD 记录处于 **"Undergoing Analysis"**，没有 NVD 评定的分数。KEV 要求的动作是老一套——按厂商指引应用缓解措施，若无缓解措施则停用该产品——目录把勒索软件使用情况记为 "Unknown"。

**为什么重要：** 带 `UI:R` 的 8.8 读起来像例行周二补丁，但 KEV 收录意味着利用是已确认的、而非理论上的，而没有分析机构背书的分数则会低估其运维信号。当厂商自评的分数与 KEV 收录对严重性判断不一致时，以收录为准。

[`🔗 NVD：CVE-2026-96951`](https://nvd.nist.gov/vuln/detail/CVE-2026-96951) · [`🔗 CISA KEV 目录`](https://www.cisa.gov/known-exploited-vulnerabilities-catalog?field_cve=CVE-2026-96951) · [`🔗 微软 MSRC`](https://msrc.microsoft.com/update-guide/vulnerability/CVE-2026-96951)

---

## 27. AnyPS5：35.6k★，把 PS5 可执行文件重链接为原生 Linux 与 Windows 程序——无模拟器、无运行时

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending（周榜第一） · 本周 +28,663★ · 总计 35,595★ · 今日有推送
- **Tags:** `ps5` `reverse-engineering` `vulkan` `relinking` `open-source`

**boykopovar/AnyPS5** 是本周 GitHub 上涨幅最大的项目——"把 PS5 可执行文件自动移植到 Linux 与 Windows 的工具"，创建于 8月3日，现为 **35,595 星**，GPL-2.0，641 个未关闭 issue，数小时前刚有推送。它的路线不是模拟：一个 **relinker** 把可执行文件转换为目标系统的原生格式，项目则重新实现 PS5 的系统 `prx` 库以便二进制链接过去，"没有模拟，也没有独立的运行时进程"。着色器重编译器输出 SPIR-V，在使用 `ANYPS5_ENABLE_SPIRV_TOOLS` 构建时通过 Spirv-Tools 验证。README 对自己所处阶段的坦率程度不寻常：库覆盖率是相对项目 **目前声明过的函数** 计算的，而不是 PS5 的全部系统函数；并且"不支持或意外的状态会严格抛出 `std::runtime_error`"——进程把 `what()` 打到 stderr 然后终止。兼容性按游戏追踪在一个由公开 GitHub 数据构建的社区阻塞图上，每个标题一个 bring-up 讨论帖。

**为什么重要：** 它与本信息流报道过的 PS2 编译到 WebAssembly、PSP 重编译属于同一波浪潮的"静态重链接"分支——区别是这一款瞄准的是当代主机，并且交付的是原生二进制而非浏览器版。那个"已声明 vs 未声明"覆盖率的说明，是每个兼容性项目都该抄的诚实版进度条。

[`🔗 boykopovar/AnyPS5`](https://github.com/boykopovar/AnyPS5) · [`🔗 AnyPS5 网页转换器`](https://boykopovar.github.io/AnyPS5/)

---

## 28. 一块 7 美元的 ESP32 把零售版 iPhone 变成电脑操作设备——不需要 Mac、越狱或开发者账号

- **Velocity:** ▮▮ rising
- **Source:** GitHub · 3 天 1,647★ · 创建于 10月11日 · MIT
- **Tags:** `computer-use` `agents` `esp32` `ios` `hid`

**onehumanbeing/esp32-iphone-agent**——"让 AI 模型用一台真 iPhone——只要一块 7 美元的 ESP32"——在 **三天内收获 1,647 星**（创建于 10月11日，10月13日有推送，MIT，两个未关闭 issue）。它的设计绕开了所有通常阻断 iPhone 自动化的关卡：手机屏幕通过 UxPlay 以 **AirPlay** 镜像到主机，一块插在手机 USB 口上的小型 **ESP32-S3 板** 枚举为鼠标与键盘，于是触摸和输入走的是和人一样的路径。任何 OpenAI 兼容的视觉模型都能当大脑，云端或本地皆可。README 里的对比表就是它的论点：XCTest/WebDriverAgent 需要 Mac、Xcode、签名的 runner 和 Apple 开发者账号（免费账号的签名每 7 天过期一次）；这个方案全都不需要，而且因为它只看像素，在任何应用里都能用，包括游戏——而这正是无障碍树自动化通常失效的地方。示例任务——"设一个每天早上 7:00 重复的闹钟，然后保存"——会让智能体往时间轮里输入 `0700`，再一天一天地点选。

**为什么重要：** 电脑操作型智能体的瓶颈是"能在哪里跑"，而这把入场成本从"一台 Mac 加一个签名身份"降到一块 7 美元的板子——和 Mac mini 之于 CI 是同一种模式。它还把消费级硬件变成一个没有厂商 API 介入、可被机群批量寻址的设备，而这恰恰是让平台方紧张的那个属性。

[`🔗 onehumanbeing/esp32-iphone-agent`](https://github.com/onehumanbeing/esp32-iphone-agent) · [`🔗 演示视频`](https://www.youtube.com/watch?v=Ly4im-P4jYg)

---

## 29. mattpocock/skills：29 万★，第一个通过四家智能体自有插件市场分发的 skills 仓库

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending（周榜） · 本周 +11,955★ · 总计 289,927★ · 最新版本 v1.3.1，10月4日
- **Tags:** `agent-skills` `claude-code` `codex` `copilot` `plugins`

**mattpocock/skills**——"给真工程师的技能。直接来自我的 `.agents` 目录"——已有 **289,927 星**（MIT，创建于 2月3日，10月13日有推送），而重要的不是这个数字，而是分发方式：`claude plugin install mattpocock-skills@claude-plugins-official`、`codex plugin marketplace add mattpocock/skills`、`copilot plugin marketplace add … && copilot plugin install …`、`gemini skills install …`，以及其他一切用 `npx skills@latest add mattpocock/skills -a`。README 要求你 **每个智能体只选一种**，"因为两个都装会让每项技能出现两次"；它还带着一段针对"接管流程"类框架的定位论述：GSD、BMAD 和 Spec-Kit"夺走了你的控制权，并让流程中的 bug 难以排查"，而这里的目标是"小而易于改造、可组合"并且"适配任何模型"。目录结构为 `engineering/`、`productivity/`、`misc/`、`in-progress/` 和 `deprecated/`——后两个是大多数技能货架都会省略的部分。

**为什么重要：** 一个技能集合同时通过 Anthropic、OpenAI、GitHub 和 Google 的官方插件渠道分发，是"技能"不再属于某一家的文件格式、而成为一种可移植包类型的最清楚信号——而 `deprecated/` 目录是这条货架上几乎别的东西都没有的维护信号。

[`🔗 mattpocock/skills`](https://github.com/mattpocock/skills) · [`🔗 skills.sh 列表`](https://skills.sh/mattpocock/skills)

---

## 30. Anthropic 称反蒸馏防御把被采集数据削减了 90–99%——自报数字，但点了名

- **Velocity:** ▮▮ rising
- **Source:** Anthropic Research · 10月12日 · HN 讨论 10月13日（43 pts，92 条评论）
- **Tags:** `anthropic` `distillation` `policy` `model-security`

Anthropic 公布了其反蒸馏工作，并附上了两处异常具体的点名。头条数字在原文中就是带保留的："**早期证据表明**，这些方法把蒸馏方采集到的数据量削减了约 **90% 到 99%**"——厂商内部测量，没有独立复现，而"早期证据"是这里起作用的限定词。被点名的案例比这个指标更具体：Anthropic 称 **智谱** 在 GLM-5.3 的开发过程中蒸馏了网络能力，并且在尝试 Claude Fable 5 之后发现其网络防护让攻击失效，于是换用了一个较老的 Claude 模型加另一家实验室的模型；它引用 CAISSI 对 GLM-5.3 的评估，称其为迄今发布的网络能力最强的开放权重模型，并给出自己的发现：GLM-5.3 的防护容易被绕过。它还重述了 **Moonshot/Kimi** 一案：请求被秘密转发给 Claude，其中一条来自 Anthropic 认为与中国解放军有关联的用户，该用户在寻求分析针对某个具体个人的 CCTV 监控。代价也被写了出来：这些措施"对 Anthropic 和我们的客户都确实有取舍"，公司"拒绝了可观的收入以及数万亿 token 的付费流量"，而且"我们的一些改动也要求合法用户更新他们的集成"。

**为什么重要：** 诚实的读法是不对称的——90–99% 是自查的、明确标注为初步的数字，而被点名的行为体指控则具体到可以被核查。对任何发布模型的人来说，可迁移的结论是：**推理轨迹**、而非最终答案，才是价值最高的采集目标，这让它成为一个日志与留存决策，而不只是 API 决策。

[`🔗 Anthropic：加强对蒸馏攻击的防御`](https://www.anthropic.com/research/distillation-defenses) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50074705)

---

## 31. Indra OCR：一个 100 万参数模型在 CPU 上跑到 49 页/秒——而"局限"一节才是真正干活的部分

- **Velocity:** ▮▮ rising
- **Source:** Datalab 博客 · 10月13日 · HF 模型创建于 10月10日
- **Tags:** `ocr` `document-ai` `cpu` `benchmark` `small-models`

Datalab（Vik Paruchuri）发布了 **Indra OCR**，一个围绕 **100 万参数** 识别模型构建的 OCR 包：在 **32 个 CPU 核上每秒读取 49 页**，比 Tesseract 与 PaddleOCR 的 PP-OCR 文本模型快 11–17 倍，单页延迟约 230 ms——而且给足版面信息：每一行一个框、每个版面块一个带标签的框（正文、章节标题、列表、表格、图注、脚注、表单、目录、页眉、页脚）、阅读顺序、对倒置或横向页面的自动摆正，以及 markdown 或 JSON 输出——输出的 JSON 会记录每页文字来自 PDF 文本层、OCR，还是两者兼有。头条精度是 **OmniParseBench 上的 62.1**，而 OmniParseBench 是 **Datalab 自己新造的基准**——这是核心保留意见，也是该被引用的那条。另一处是"局限"一节：手写体约 **8%**（"它还读不了手写"）；扫描件与图片只支持拉丁、西里尔、希腊、天城文、孟加拉文和中文，不支持阿拉伯文、希伯来文、泰文、假名或谚文；多层表头的复杂表格会丢失结构（表格得分 56.4）；而在文本上，PaddleOCR 的 PP-StructureV3 在默认模式下 **胜过它**（55.6 对 41.3）——只有在开启 `--math` 模式时 Indra 才领先，而那会付出 30–35% 的吞吐代价，并略微拉低表格得分。

**为什么重要：** 它的卖点是"够用的文本、够快"，这对分类与路由流水线是正确的取舍——但这里每一个速度倍数都是厂商在自家基准上测的，而那份诚实的局限清单正是它值得一读而不是被跳过的原因。小模型在 CPU 吞吐上取胜，与这一批里的 LFM2.5 和 Janas 是同一种形状。

[`🔗 Datalab：Indra OCR`](https://www.datalab.to/blog/indra-ocr) · [`🔗 Hugging Face：datalab-to/indra-ocr`](https://huggingface.co/datalab-to/indra-ocr)

---

## 32. NVIDIA 把 Vera Rubin 的机架与托盘设计开放给 OCP——名单上有 Cisco、Google、Meta 和微软

- **Velocity:** ▮▮ rising
- **Source:** NVIDIA 博客 · 10月12日（~23:00 UTC+8） · OCP 全球峰会，圣何塞
- **Tags:** `nvidia` `ocp` `datacenter` `networking` `standards`

在开放计算项目全球峰会上，NVIDIA 通过 **MGX 架构** 把 **Vera Rubin 的机架与计算托盘设计贡献给了 OCP**，其说法是为系统集成商提供"开发下一代 AI 工厂基础设施的共同基础"。公布的内容包括：更新后的 **MGX 1.2** 规范，扩展了 AI 工厂的开放架构；与超大规模厂商共同发布的 AI 工厂设计与 **电网韧性** 开放标准；**DSX AI Factory** 的新开源软件组件；**Meta 与 NVIDIA** 围绕 Spectrum-X 以太网 SuperNIC 与 Spectrum-6 推进开放 AI 网络；**Visionbay** 推出面向 Vera Rubin 时代的 800V 直流 AI 工厂设计；NVIDIA 与 **Cisco** 发布超密小型可插拔（USFP）标准，称其为业界首个面向 400Gb/s 级网络结构的模块；以及 NVIDIA 与 **Google** 宣布在未来 ConnectX-10 SuperNIC 与 BlueField DPU 上支持 Falcon Transport。开放液冷工作（MQD、MQDB）也被并入同一波推进。

**为什么重要：** 从专有整机架设计中获益最多的公司，正在公开机架与托盘规格——这与它在 Hopper 和 Blackwell 上做 MGX 是同一步。对采购 AI 工厂硬件的人来说，实际效果是机柜有了第二供应来源，即便芯片仍是单一来源；电网韧性标准是较少被注意的那一半，也是电力公司真正必须去读的那一半。

[`🔗 NVIDIA 在 OCP 全球峰会`](https://blogs.nvidia.com/blog/ocp-global-summit-vera-rubin-scale-ai-factories/) · [`🔗 NVIDIA MGX`](https://www.nvidia.com/en-us/data-center/mgx/)

---

## 33. ColGrep-Agent-2B：一个本地 2B 检索智能体，把前沿编程智能体的 token 砍掉三分之一

- **Velocity:** ▮ steady
- **Source:** Hugging Face（LightOn） · 10月12日发布 · 论文 arXiv 2610.05099，10月4日
- **Tags:** `agents` `code-search` `small-models` `retrieval` `cost`

LightOn 发布了 **ColGrep-Agent-2B**——"一个开源的 20 亿参数代码检索智能体，本地运行，坐在你的编程智能体和仓库之间"——以及背后的论文《Small Agents with Semantic Search: Efficient Multilingual Code Localization》。给定一个问题，该模型用 **ColGrep**（一个多向量 late-interaction 语义检索工具）搜索、读取有希望的文件、跟踪引用，然后返回文件路径、行范围与代码本身。测量方式：接入 **运行 Sonnet 5.5 的 Claude Code**，在 **52 个代码检索问题、横跨 13 个训练时未见过的仓库** 上，把检索委托给本地智能体使 **API token 减少 34%**、**缓存感知的 API 成本减少 40%**（相对 grep）——而用作者自己的话说是"**准确率没有统计显著变化**"。训练方式是先用教师轨迹做加权监督微调、按检索结果分配轮次级信用，再针对定位质量做强化学习。

**为什么重要：** 那条保留意见就是结论本身。这是一次明确"准确率中性"的成本与延迟优化，而不是准确率提升——它把最重复、最膨胀上下文的那些轮次（grep、打开、跟踪、再搜）从前沿模型上整体移走。对任何代码检索密集、智能体账单很大的人来说，这比选模型更便宜的一根杠杆。

[`🔗 HF：ColGrep-Agent`](https://huggingface.co/blog/lightonai/colgrep-agent) · [`🔗 arXiv 2610.05099`](https://arxiv.org/abs/2610.05099) · [`🔗 模型`](https://huggingface.co/lightonai/colgrep-agent-2B)

---

## 34. OpenAI 的 dot 在没有任何提示的情况下，一天烧掉 30 万+ token

- **Velocity:** ▮ steady
- **Source:** The Register · ~7小时前 (~05:20 UTC+8) · Geordie 的测试
- **Tags:** `agents` `always-on` `tokens` `governance` `openai`

治理厂商 **Geordie** 自 OpenAI 的"常驻"智能体助手 **dot** 9月发布以来一直在测试它，并公布了一个与其说关于能力、不如说关于闲置成本的测量：一个 dot 智能体产生了 **155 段独立活动序列**，在没有进一步人工交互的情况下 **一天消耗超过 30 万 token**。让这个数字有意思的是测试设置——Geordie 的首席 AI 官 **Hanah-Marie Darley** 只给了 dot **只读权限**，并且刻意没有把它接到邮箱、Slack 或个人应用上；这个智能体依然进入了研究姿态，去盘点自己被授予了什么、系统里跑着什么。她的形容是："非常像一个新来的项目经理，进来看看这里有什么。"

**为什么重要：** 常驻智能体的账单由"没人提问时它在干什么"决定，而只读限制住的是 *损害*，不是 *用量*。任何按用量而非按席位计费的智能体产品，都需要在开第一张发票之前回答"闲置时的行为"；这是一个关于该账单项的已公布数字。

[`🔗 The Register`](https://www.theregister.com/ai-and-ml/2026/10/13/openais-dot-assistant-burned-300k-tokens-in-a-day-without-a-single-prompt/5302913) · [`🔗 Geordie`](https://geordie.ai/)

---

## 35. NetBSD 的"无 AI"立场变成了钱：目标 5 万美元，实收 120,282 美元

- **Velocity:** ▮ steady
- **Source:** The Register · ~13小时前 (~23:15 UTC+8) · NetBSD Mastodon，10月6日
- **Tags:** `netbsd` `open-source` `funding` `ai-policy` `bsd`

当 Linux 各项目逐渐向接纳 AI 贡献靠拢时，NetBSD 明确的 **无 AI** 立场似乎正在变现：项目 Mastodon 账号报告 9月收到创纪录的 **约 120 笔捐款**、总额 **120,282 美元**，而捐款目标设为 **5 万美元**——"而且是的，我们总共收到了 120,282 美元。这自然把我们原本设为 5 万美元的捐款目标条完全填满了。该给一些项目拨款了！"（该帖已获 107 次转发、306 次收藏。）背景是 Unix 世界这一年的分化：Torvalds 在 7月 说 Linux"不是一个反 AI 项目"；Debian 的开发者们在 8月 投票允许 AI 生成的贡献；最近一届 Ubuntu 峰会充满 AI 气息；COSMIC 则对 AI 代码关上了门——而 NetBSD 在 7月30日 发布了 11.0，没有伴随这类争论。

**为什么重要：** 这是一次罕见的自然实验，检验明确的"反 AI 贡献"政策到底是筹资资产还是采用税，而第一个数据点是：一个小巧、可移植、几十年历史的操作系统，仅凭立场就能把目标做到近 2.5 倍。保留意见是：一个月的捐款是关于捐赠者群体的信号，而不是关于贡献者的信号。

[`🔗 The Register`](https://www.theregister.com/os-platforms/2026/10/13/netbsd-may-have-found-a-new-role-the-ai-free-foss-os/5302818) · [`🔗 NetBSD Mastodon 帖`](https://mastodon.sdf.org/@netbsd/117396625341557692) · [`🔗 NetBSD 捐赠`](https://www.netbsd.org/donations/)

---

## 36. Craft 套件有了启动器——十三个应用、一个安装器，以及这个家族最大的仓库

- **Velocity:** ▮ steady
- **Source:** GitHub Trending（新仓库） · 2,366★ · 创建于 10月9日 · Rust，原生 egui
- **Tags:** `artcraft` `rust` `desktop` `open-source` `launcher`

**storytold/craft-launcher**——"Craft 应用启动器"，创建于 10月9日，已有 **2,366 星**——是 ArtCraft 家族缺的那一块：一个原生应用，列出套件里每个程序，检测哪些已安装、装的是哪个版本，按你的操作系统与 CPU 选对构建（DMG、MSI、AppImage、.deb、.rpm），用该发行版的 **SHA-256 校验和** 验证后安装，并在每个应用的 GitHub releases 出现更新时通知你。它是纯 Rust 配 **egui**——"没有 Electron，没有 web view"——可以待在菜单栏或系统托盘，界面支持十一种语言，网页版展示同一份目录。目录本身就是另一条新闻：十三个应用——**PhotoCraft、LightCraft、FilmCraft、DesignCraft、VectorCraft、PdfCraft、EffectCraft、WordCraft、DeckCraft、GridCraft、CADCraft、SoundCraft 和 FigCraft**——远超本信息流单独报道过的 PhotoCraft、WordCraft 和 CADCraft。

**为什么重要：** 一个做到十三个桌面应用的套件，比起第十四个应用，更需要一个启动器；而从 GitHub releases 拉取、带校验和验证的安装，正是每个多应用开源家族在恰好这个规模上会撞上的分发问题。它也让 ArtCraft 的范围第一次变得可核查：仓库清单现在就是那份主张。

[`🔗 storytold/craft-launcher`](https://github.com/storytold/craft-launcher) · [`🔗 ArtCraft`](https://artcraft.storytold.com/)

---

## 37. Liquid AI 以 24B/2B 激活收官 LFM2.5 家族——一个"总是先思考"的边缘 MoE

- **Velocity:** ▮ steady
- **Source:** Hugging Face · 模型创建于 10月12日 · LFM-1.0 许可
- **Tags:** `liquid-ai` `moe` `edge` `on-device` `model-release`

Liquid AI 发布了 **LFM2.5-24B-A2B**，被称为"LFM2.5 家族中最大也是最后一个模型"，该家族现在跨两个数量级，向下一直到 LFM2.5-230M。数字是：**总计 240 亿参数、激活 24.5 亿**，40 层（30 个双门控短卷积块加 10 层 GQA 注意力），**每个 MoE 块 64 个专家、top-4 路由**，用 36 万亿 token 训练，覆盖 17 种语言。它是一个纯文本推理模型，"回答前总会先思考"，面向本地智能体：模型卡声称在智能体与工具使用任务上可与 **Qwen3.6-35B-A3B**（总参数与激活参数都多约 50% 的模型）抗衡，**LiveClaw 上 48.09 对 38.19**，在设备上比同类 MoE 快最多 **1.7 倍**，在 Apple M5 Max 上 **184 tok/s**，在单张 NVIDIA B300 上输出可达 2.1 万 tok/s。它采用 Liquid 自家的 LFM-1.0 条款，而非标准 OSI 许可。

**为什么重要：** 有意思的主张是架构上的，而非基准数字上的——短卷积块加稀疏专家路由，正是让"以 MoE 速度推理"在笔记本上可行的组合，因为每个推理 token 只花 24.5 亿参数的算力。LiveClaw 的对比是厂商自测，对手来自不同的训练配方，所以请把差距当作方向性参考。

[`🔗 LiquidAI/LFM2.5-24B-A2B`](https://huggingface.co/LiquidAI/LFM2.5-24B-A2B) · [`🔗 Liquid AI 博客`](https://www.liquid.ai/blog/lfm2-5-24b-a2b)

---

## 38. Strands Box：给智能体沙箱配上操作系统级管控和一门真正的策略语言——目前仅预览于 macOS

- **Velocity:** ▮ steady
- **Source:** GitHub · 393★ · 创建于 10月2日 · Apache-2.0 · v0.1.0，10月7日
- **Tags:** `sandbox` `agents` `policy` `rust` `strands`

**strands-agents/box** 是来自 Strands（AWS 血统）生态的一个 Rust 智能体沙箱引擎，其与众不同之处在于访问控制是代码而不是配置：策略用 **Dogwood** 编写，一门带 **默认拒绝** 语义的 `permit`/`forbid` 语言——"必须有匹配的 `permit` 才允许该操作，而匹配的 `forbid` 会覆盖该许可。"Box 与框架无关（把 `box.toml` 与 `policy.dw` 指向任意智能体二进制即可），把操作系统隔离与在智能体进程 **之外** 评估的语义规则结合起来，而且——最值得抄的一点——它的 **解释器与网关共享同一份事件历史**，因此通过 Shell 或 Python 解释器的一次文件读取，可以让出口网关在此后拒绝一次外发 HTTP 请求。它还做凭据注入，智能体自己从不持有密钥，并把策略决策导出为 OTLP-JSON。它的保留意见写在最前面，且都是实质性的："**预览：** Box 目前仅支持在 **搭载 Apple 芯片的 macOS** 上本地执行"——Linux 是计划中而非已交付——并且"`box.toml` 中的直接文件系统授权由操作系统执行，**不会** 产生单条 Dogwood 决策"，所以想让某个文件接受策略检查，就必须通过解释器访问它，而不是直接授权。393 星配 43 个未关闭 issue，读起来像是有人在积极分诊，而不是弃坑。

**为什么重要：** 大多数智能体沙箱执行的是能力清单；这个执行的是 *历史*——跨解释器的事件日志，正是把"它能碰什么"变成"在它已经做过什么之后，接下来允许它做什么"的机制。这正是时序策略需要的形状，而"仅限 macOS ARM 预览"是一句诚实的范围声明。

[`🔗 strands-agents/box`](https://github.com/strands-agents/box) · [`🔗 Dogwood 策略语言`](https://dogwood-policy.github.io/dogwood/)

---


## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-10-14T04:20:00Z |
| Items | 38 |
| Sources tracked | 44（Hacker News、GitHub Trending/API、NVD、CISA KEV、Adobe Trust Center、Microsoft/Azure/NVIDIA/Anthropic/Datalab/Liquid AI 博客、Siemens ProductCERT、SAP/GitHub 安全公告、Docker、securityonline.info、Hugging Face、arXiv、The Register、SF Standard、SiliconANGLE、geordie.ai、GhostPat、mastodon.sdf.org 及各新闻站点） |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (每天 3 次) |
| Ranking | 速度加权（新鲜度 × 互动加速度 × 来源权威度） |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[前一天](2026-10-13.md) · [原始 .md](latest.md) · [归档](../archive/index.md)
