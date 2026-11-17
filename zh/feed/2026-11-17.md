---
date: 2026-11-17
updated: 2026-11-17T12:28:51Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 47
license: CC-BY-4.0
---

# trending.md — 2026-11-17

## 1. "五大银行宕机"其实是一家银行的 bug——Chase 本地部署硬件中的软件缺陷通过交易通道波及 BofA、U.S. Bank、Wells Fargo 与 Zelle

- **Velocity:** ▮▮▮ trending
- **Source:** apnews.com · 289+ pts on HN · 1.5h ago (~02:31 UTC+8)
- **Tags:** `outage` `banking` `zelle` `reliability`

周一晚间，**Bank of America、Chase、U.S. Bank、Wells Fargo 和 Zelle** 五个名字同时涌出大量用户报告——但 AP 的报道显示，事件只发生在 **Chase 一家**："JPMorgan Chase has experienced a temporary issue related to a software bug in an on-premise hardware system — it is not cyber-related"（JPMorgan Chase 遇到一个临时性问题，源于本地部署硬件系统中的一个软件缺陷——与网络攻击无关），银行发言人 Joe Evangelisti 说。其他四个名字出现在故事里，只是因为它们的客户与 Chase 有交易往来："other banks may have been impacted by slowness in transactions only to the extent that they were a party to a transaction with us"（其他银行仅在与我们发生交易时，受到交易变慢的影响）——Bank of America 与 Citigroup 自身服务并无故障，U.S. Bank 报告未受直接影响，Zelle 网络本身始终保持完全可用。本周语境也需要一次更正：微软大宕机发生在**周四**（报道自带更正说明，修正了早前的周五说法），FAA 禁飞令在周五，而 AP 报道官员与公司均未把三起事件联系起来。Chase 预计周一当天完成全面恢复。

**Why it matters:** 反转后的教训比原框架更锋利：一家银行的本地 bug **看起来**像全行业宕机，是因为检测层是共享的——对手方的客户看到转账变慢，报告的是*自己*银行故障，于是五个名字同时亮起。报告榜的同时性不是共同原因的证据；它只是共享通道（Zelle/Early Warning Services，恰由这些银行共同持有）从外部看起来的样子。而节奏上的相关性只是节奏：据 AP，官员与公司没有把三起事件联系起来。

> AP 自己的更正说明："This story has been updated to correct Microsoft outage began Thursday, not Friday."——聚合层先拿到的是周五版本；一手信源自己完成了修正。

[`🔗 AP News: A technical issue at JPMorgan Chase triggers online banking delays for major US banks`](https://apnews.com/article/bank-outage-chase-wells-fargo-truist-50fee2693c22f597fa6ca51a97ef2cda) · [`🔗 AP 解读：A look at online delays that affected major US banks`](https://apnews.com/article/bank-outage-chase-wells-fargo-zelle-aeb4b0d6b6789c8c96bb2520454a6d1e) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50521045)

---

## 2. "w2rt6byl5nf1opmc-a.com 是什么？"——一个乱码域名在 Majestic Million 上排在 github.com 前面，答案竟是 Majestic 自己的实验

- **Velocity:** ▮▮▮ trending
- **Source:** jack.cab · 297+ pts on HN · 6.2h ago (~21:51 UTC+8)
- **Tags:** `seo` `web-trust` `ranking-data` `investigation`

Jack Cabral 的调查始于一次虚荣心检查：他的网站在 siterate.org 上排名 #783,052——排在五个越南赌场垃圾站之后——直到他注意到 **w2rt6byl5nf1opmc-a.com 排名第 8**，领先 googletagmanager.com、microsoft.com 和 github.com。而这个域名在浏览器里根本无法解析。顺着榜单背后的 Majestic Million 挖下去：约 274,833 个引用子网、约 853,298 个引用 IP，**241,085,378 条 nofollow 反链对仅仅 6 条 follow 链接**，分布在 5,163,708 个引用域——而 Ahrefs 只显示 53 条反链，证书首次出现于 11 月 11 日，*晚于*大多数反链。后续一锤定音：Majestic 自家的 Steve Pitchford 回复——"Some internal experimentation. Choose a domain, make it esoteric, do some experiments. However, looks like we forgot to add a filter to avoid reporting it."（一些内部实验。选个域名，弄得怪一点，做些实验。不过我们好像忘了加过滤，才让它进了报告。）作者的结论：不要在生产环境里做测试。

**Why it matters:** Majestic Million、Tranco 这类排名数据集在 quietly 地支撑着安全研究、广告反欺诈和各种流行度启发式判断——而一个未过滤的内部实验，就能把一个前十席位污染数周（Tranco 早在 10 月 5 日就把它排在 #38）。任何消费第三方网络信任数据的人，都在继承数据提供方的卫生水平。

[`🔗 jack.cab: What the fuck is w2rt6byl5nf1opmc-a.com?`](https://jack.cab/blog/siterate) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50517602)

---

## 3. FBI 快报：Artex AI 渗透测试平台"三小时内"攻入网络——ConnectWise、Barracuda、韩国银行业均为受害者

- **Velocity:** ▮▮▮ trending
- **Source:** techcrunch.com · 18+ pts on HN · 1.9h ago (~02:12 UTC+8)
- **Tags:** `artex` `fbi` `ai-offense` `pentesting` `storm-0940`

FBI 快报（11 月 13 日发布，Zack Whittaker 11 月 16 日报道）记录了用 **Artex** 发动的真实攻击——Artex 是一个开源的 AI 渗透测试平台，可挂接 Anthropic 与 OpenAI 的托管前沿模型，也可用开源权重模型替代。FBI 称 Artex 驱动的入侵从选定目标到实际攻陷"in under three hours"（不到三小时）——动静很大，但快过人类防守者的响应速度。点名受害者：**ConnectWise**，经供应链攻击失守，至少 2,250 家客户的 Microsoft 365 环境暴露（微软将其归因于与中国关联的 **Storm-0940**）；**Barracuda**，11 月 11 日因一枚未撤销的暴露第三方凭据被攻入；以及多家**韩国金融机构**，攻击者在薄弱防御与缺失 MFA 的环境下窃取了至少 68,000 人的个人数据。开发者在攻击后转闭源，但 FBI 指出旧的开源版本仍然"widely accessible"（随处可得）——而且研究者发现数百台无密码的 Artex 服务器直接暴露在公网（TechCrunch，11 月 6 日）。

**Why it matters:** 这是迄今最清晰的一次"AI 工具出现在具名攻击链中"的归因——不是"模型犯罪"的泛泛修辞，而是具体的 harness、具体的速度指标、具体的受害者。防守侧的读法并不舒服：它利用的瓶颈是响应延迟，而这恰恰是智能体防御工具宣称要解决的问题。

[`🔗 TechCrunch: FBI says Artex AI open-source hacking tool used to breach networks in "under three hours"`](https://techcrunch.com/2026/11/16/fbi-says-artex-ai-open-source-hacking-tool-used-to-breach-networks-in-under-three-hours) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50520796)

---

## 4. Kevin Buzzard 给"Lean 检查过了"立了四道测试——OpenAI 定理库 290 条中约 38 条连论文主定理都没有陈述

- **Velocity:** ▮▮ rising
- **Source:** xenaproject.wordpress.com · 252+ pts on HN · 8.4h ago (~15:38 UTC+8)
- **Tags:** `lean` `formal-verification` `ai-math` `proof-assistants`

Xena Project（Kevin Buzzard 在帝国理工学院的数学形式化团队）发布了 AI 数学时代最实用的一份清单：编译通过是必要条件，但远远不够，还有四件事必须检验。**陈述保真**——Lean 陈述与论文定理是否同一件事？在 OpenAI 定理库附带 Lean 代码的 290 条定理中，约 38 条"have the property that the Lean code does not even state, let alone prove, the main theorem of the paper. And OpenAI never claimed that it did!"（其 Lean 代码甚至没有陈述、更谈不上证明论文的主定理。而 OpenAI 从未声称它证明了！）；Buzzard 在这里批判的，是把"代码 accompanies 论文"升级成"论文已被证明"的读者。**编译**（Anthropic 的 1300 万行 FLT 形式化需要 96 核、500 GB 内存的机器；OpenAI 的 64 万行 Navier–Stokes 工作在笔记本上就能构建）；**证明与陈述一致**（防隐藏花招——解法是他们自研的 `lake comparator`，校验可信陈述与不可信证明在标准公理下一致）；以及 **kernel 可靠性缺陷**（由 Lean 的多个独立 kernel 缓解，其中一个已形式化验证到汇编层）。文中还提到库中三篇论文因一个符号错误被撤回，并以一条操作警告作结：绝不在未沙箱的情况下运行不可信的 AI 生成 Lean 代码。

**Why it matters:** "Checked in Lean" 正在成为 AI 数学公告的信用货币——仅本周本刊就报道过机器检验的 Signal 协议证明和 Gödel 笔记本——而 Buzzard 的要点是：这句话其实是四个不同的命题，其中大多数目前根本没人去跑。`lake comparator` 这套流程，任何团队明天就能 adoption。

[`🔗 Xena Project: …and the proof is checked in Lean`](https://xenaproject.wordpress.com/2026/11/12/and-the-proof-is-checked-in-lean/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50515058)

---

## 5. Jiff 1.0：BurntSushi 的 Rust 日期时间库承诺 API 稳定——uv、Cargo、AWS LLRT 已在用

- **Velocity:** ▮▮ rising
- **Source:** burntsushi.net · 188+ pts on HN · 3.2h ago (~00:53 UTC+8)
- **Tags:** `rust` `datetime` `timezones` `libraries`

Andrew Gallant（BurntSushi——ripgrep 的作者）发布了他的 Rust 日期时间库 **Jiff 1.0** 稳定版，承诺说得干脆："Unless some significant defect is found in Jiff's API, my plan is to commit to Jiff 1.0 indefinitely."（除非 API 出现重大缺陷，我计划无限期地坚守 Jiff 1.0。）设计上，时区是核心 API 关注点而非功能开关——DST 折叠与空洞附近的歧义民用时间，通过显式的消歧策略解决（默认 `compatible`，另有 `earlier`、`later`，以及直接报错的 `unambiguous`）；类型系统分层（`civil::Date/Time/DateTime`、`Timestamp`、`ZonedDateTime`），时长采用双模型（日历感知的 `Span` 与物理时间的 `SignedDuration`）。采用名单解释了为什么现在发 1.0：Jiff 已进入 **uv、Cargo、Starship、fd、Nushell、Jujutsu、uutils/coreutils 和 AWS LLRT 的 Temporal 实现**。它深受 JavaScript Temporal 启发，支持 RFC 3339/9557/2822，并通过 feature 提供 ICU4X 本地化。

**Why it matters:** Rust 标准库至今没有日期时间类型，Jiff 在生态尺度上补上了这一空缺——采用名单几乎就是开发者日常工具的一次普查。Gallant 在 ripgrep 上积累的 API 稳定性声誉，让"无限期坚守"的承诺比大多数 1.0 更可信。

[`🔗 burntsushi.net: Jiff 1.0`](https://burntsushi.net/jiff/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50519744)

---

## 6. 续 11 月 13 日微软 365 大宕机报道：微软归因于 7 月网关更新埋下的缺陷——负载测试一直跑在"核更少、性能更弱的硬件"上

- **Velocity:** ▮▮ rising
- **Source:** theregister.com · 70+ pts on HN · 6.8h ago (~21:18 UTC+8)
- **Tags:** `microsoft-365` `outage` `rca` `reliability`

微软对 11 月 12–13 日 Exchange Online 崩溃的初步 RCA，把根因追溯到一个 **2026 年 7 月部署的网关服务器更新中潜伏的缺陷**——它在生产环境静默了三个月。该缺陷引发"lock contention inside an internal Windows process which caused the machine's resources (CPU & memory) to be exhausted"（内部 Windows 进程内的锁争用，耗尽机器的 CPU 与内存资源）——而且只在较新的多核机器上显形，这正是负载测试漏掉它的原因："Our load testing tended to focus on weaker hardware with fewer cores."（我们的负载测试往往集中在核数更少、性能更弱的硬件上。）两个事件同时触发了它：Teams 故障转移到主网关（11 月 12 日 01:07 UTC），加上约 14% 网关容量离线。级联相当惨烈——流量重路由到健康服务器，健康服务器随后也宕了，"at its lowest"（最低点）两小时内超过 80% 的服务器无响应。Exchange Online 因"scale reasons"（规模原因）无法从网关层故障切出，所以邮件成了最后恢复的服务（07:20 UTC 应用缓解，16:10 UTC 恢复健康）。最终事故报告 11 月 20 日发布。

**Why it matters:** 微软尺度上重复着老教训：一次变更可以全球部署、通过负载测试、然后沉睡一个季度，直到正确的硬件与流量组合把它引爆。对延迟敏感的服务要用最大的硬件来测，并为级联预留预算——这是今天任何后端团队都能从这份 RCA 里拿走的两个处方。

[`🔗 The Register: Microsoft blames monster email outage on software defect introduced in July fix`](https://www.theregister.com/saas/2026/11/16/microsoft-blames-monster-email-outage-on-software-defect-introduced-in-july-fix/5310026) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50517321)

---

## 7. VulnCheck 一天落地 105 条 CVE 记录——认证绕过浪潮横扫 npm 时代的 CMS 框架，而多数连可升级的修复版都没有

- **Velocity:** ▮▮ rising
- **Source:** NVD (disclosure@vulncheck.com CNA) · 105 records published Nov 16 (01:17–22:18 UTC)
- **Tags:** `cve` `auth-bypass` `npm` `vulncheck`

NVD 11 月 16 日的批次里有 **105 条来自 VulnCheck CNA 的 CVE 记录**——当日最大的单一来源浪潮，领先 GitHub 的 60 条和三星的 39 条（早间批次成稿时是 75/30/39：GitHub 的批次翻倍，VulnCheck 在 22:00 UTC 又落地一波 26 条）。头条是自托管 Web 框架中的认证绕过集群：**Tensei ≤ 0.11.5** 在 `JWT_SECRET` 未设置时回退到硬编码 JWT 签名密钥 `auth-secret-key`（9.8）；**NodePress ≤ 8.5.1** 带两个独立的 9.8 认证绕过；**Prime CMS ≤ 0.4.0-beta.0** 的 `isAuthenticated()` 守卫被注释掉、`createAbility()` 把所有角色硬编码为 admin（9.8）。围绕它们：Kalmia、REBUILD（4 条）、DeepAudit（4 条）、thirdweb Dashboard、Contentlayer 8.8 代码注入，外加 SeaweedFS、LimeSurvey、wallabag、GitBucket、PrestaShop、Sandboxie-Plus 和 Axigen。每个分数都是 VulnCheck 自己打的（CVSS 3.1，`Secondary` 来源）。操作层面的关键在于：其中几个的受影响上限*就是*最新版本——Prime CMS 自 2023 年 1 月起就没有提交，Tensei 最后一次推送是 2026 年 2 月——根本没有修复版可升级。

**Why it matters:** 这波浪潮是 npm 时代长尾的一次普查：曾经像生产级的框架，休眠之后被同一家研究机构系统性审计。比分数更重要的是修复语言——当上限就是最新版本时，"升级"是空话，诚实的缓解是下线或 fork。

[`🔗 VulnCheck advisory: Tensei auth bypass via hard-coded JWT secret`](https://www.vulncheck.com/advisories/tensei-through-0.11.5-authentication-bypass-via-hard-coded-jwt-secret-in-tensei-auth) · [`🔗 CVE-2026-129552 record`](https://www.cve.org/CVERecord?id=CVE-2026-129552)

---

## 8. 达索 3DEXPERIENCE 出现 10.0 分：Station Launcher App 反序列化预认证 RCE，旁侧还有两个 9.9 命令注入

- **Velocity:** ▮▮ rising
- **Source:** CVE-2026-93664 (3DS CNA-assigned) · record published Nov 16 (~13:17 UTC)
- **Tags:** `cve` `3ds` `deserialization` `rce`

达索系统（Dassault Systèmes）自己的 CNA 于 11 月 16 日给出 CVSS **10.0**：**CVE-2026-93664**，3DEXPERIENCE 平台 **Station Launcher App**（R2023x 至 R2026x 版本）中的不可信数据反序列化缺陷，"could lead to an unauthenticated remote code execution"（可能导致未认证远程代码执行）。同一波还有两个同伴——**CVE-2026-77033** 与 **CVE-2026-19732**，同一组件中的 OS 命令注入，各 9.9 分。公告页面没有列出修复版本；修复信息位于达索支持知识库（文档 QA00000522688），藏在客户门户之后。NVD 上三条记录都还是 `Received` 状态，每个分数都是厂商 CNA 自己打的。

**Why it matters:** 3DEXPERIENCE 是航空航天与制造业的 PLM/CAD 基础设施——恰好是"10.0 分预认证 RCE 会落进准隔离网络、补丁节奏缓慢"的那类部署。无公开修复版本的形态与本刊上周标记的 Cyrus SASL 如出一辙：当公告把你引向支持门户时，就该假设修复是服务器端安装模块，而不是版本号升级。

[`🔗 3DS security advisory: CVE-2026-93664`](https://www.3ds.com/trust-center/security/security-advisories/cve-2026-93664) · [`🔗 CVE-2026-93664 record`](https://www.cve.org/CVERecord?id=CVE-2026-93664)

---

## 9. MuJoCo 首个 4.x：speculative contacts 与弹塑性落地——随后 4.0.1 修掉 4.0.0 自己引入的求解器 bug

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · +1,922★ this week · 18.2k total · v4.0.0 Nov 6, v4.0.1 Nov 11
- **Tags:** `mujoco` `physics-simulation` `robotics` `reinforcement-learning`

Google DeepMind 的物理仿真器迎来多年来的首次主版本变更：**MuJoCo 4.0.0**（11 月 6 日）新增 **speculative contacts**（高速凸体不再在一个时间步内穿透薄障碍物）、**elasto-plasticity**（`mjData.plastic` 中的带状态塑性变形，连续体 flex 用 von Mises J₂ 回映）、Python 包拆分（`mujoco-core` / `mujoco-studio` / `mujoco`），以及 flex 模型上 1.4–3 倍的稀疏 Newton 求解加速。**4.0.1**（11 月 11 日）随后修掉 4.0.0 引入的稀疏 Cholesky 分解 bug—— supernode 合并错误导致 Newton 求解器拿到错误的 Hessian 因子，造成收敛缓慢与发散（#3767）——并通过平台无关的 `mujoco-studio-wasm` wheel 把 MuJoCo Studio web viewer 带到 Windows。周榜数据印证了发版效应：本周 +1,922★。

**Why it matters:** MuJoCo 是相当大比例机器人学习研究的默认物理后端，其中两项变更——防穿透接触与塑性——直接拓展了"可仿真"的边界（可变形体、高速操作臂）。而 4.0.1 的故事是诚实的另一半：旗舰仿真版本里的数值求解器回归，恰恰是基准数字掩盖掉的那类 bug。

[`🔗 MuJoCo 4.0.0 release notes`](https://github.com/google-deepmind/mujoco/releases/tag/4.0.0) · [`🔗 MuJoCo 4.0.1 release notes`](https://github.com/google-deepmind/mujoco/releases/tag/4.0.1)

---

## 10. Coral：智能体亲手写自己的工具——Rust 网关用 V8 isolate 运行它们，34 项任务省 37% token

- **Velocity:** ▮▮ rising
- **Source:** Show HN · 50+ pts · 5.8h ago (~22:14 UTC+8) · withcoral/coral at 5.0k★
- **Tags:** `mcp` `agent-infrastructure` `tooling` `rust`

今日 Show HN：**Coral** 是一个自托管、Apache-2.0 的网关（"execution rails for agents"），智能体不只是调用工具——它会编写简短的 **TypeScript 程序**把多个工具调用串联起来，程序在一个全新的 **V8 isolate** 中运行：无网络访问、无凭据、无 import。每个底层工具调用都要先过工作区策略闸门（Allow / Ask / Block）才挂上凭据；运行会在需要时暂停等待人类批准，并归因到发起者（人或智能体）。成功的程序沉淀为可复用的自定义工具，存放在 `coral.private` 或 `coral.shared`，任何 MCP 客户端都能调用（`claude mcp add --transport http coral <url>`）。README 自带的基准：34 项 GitHub/Linear/Slack 任务上，自定义工具**省 37% token、31% 成本、29% 时间**，宣传语是 "Opus 5.5 accuracy at Haiku 5.5 cost"。企业版目录（SSO/SCIM、RBAC、审计日志）放在独立许可证下，"coming soon"。

**Why it matters:** 工具泛滥正在成为 MCP 生态的规模化税负——成百上千个窄工具，对任何具体任务而言大多无关。让智能体在策略闸门之下把原语*编译*成自己的工具，是这个问题迄今最具体的答案，而基于 isolate 的沙箱正是它该有的信任边界。

[`🔗 withcoral/coral`](https://github.com/withcoral/coral) · [`🔗 Show HN 讨论`](https://news.ycombinator.com/item?id=50517803)

---

## 11. ffmpeg-skill 蹭着新版本冲上趋势榜：42 个本地视频工具加自验证 MCP 契约——npm 3.10.1 昨晚发布

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · +475★ today · 6.5k total · npm 3.10.1 published 2026-11-15 23:39Z
- **Tags:** `ffmpeg` `mcp` `video-editing` `agent-skills`

**kajisho5/ffmpeg-skill**（"Give your coding agent a video editor"）在发布 **npm 3.10.1** 的第二天跳涨 +475★——release 与 registry 两端一致，这波上涨才可解读。该工具包用 42 个 Python 标准库脚本封装本地 FFmpeg（剪切、拼接、静音 removal、字幕/karaoke、响度、HDR→SDR、平台导出），每个都带 `--dry-run` 和 `--json`，无云、无 API key。有趣的是契约：MCP server 从各脚本自己的 argparse 解析器推导出每个工具的 schema——项目把这个模式叫做 **SPEC（Self-Producing Execution Contract）**——契约与代码漂移时 CI 直接失败。每个工具标记 `mutates_input: false`，由哈希测试强制保证；工作流是 probe → edit → check → verify，包括智能体侧的 contact-sheet 视觉检查。README 给出的数字：10 个真实素材文件语料上 92/92 验证步骤通过、40/40 同步偏移在 10 ms 内、场景检测 F1 0.97——还有一篇关于"verification-driven coding"的立场论文，把项目自己在该纪律下的符合度评为*部分*符合。

**Why it matters:** 视频是编程智能体处理得最差的媒体类型，这个 repo 的赌注是：纪律（契约、dry-run、验证）胜过模型智力。一个会公布自己并未完全遵守自家纪律的 skill，比宣称 100% 的 skill 稀有得多。

[`🔗 kajisho5/ffmpeg-skill`](https://github.com/kajisho5/ffmpeg-skill) · [`🔗 npm: ffmpeg-skill`](https://www.npmjs.com/package/ffmpeg-skill)

---

## 12. HeyGen 发布 Decision 1：决策模型品类扩展到视频 AI——一次请求 400 个具名问题，返回带概率的类型化答案

- **Velocity:** ▮▮ rising
- **Source:** developers.heygen.com · release trackers date it Nov 13 · surfaced on OpenRouter
- **Tags:** `decision-models` `heygen` `api` `classification`

做虚拟人视频的 HeyGen，现在文档化了 **Decision 1**——一个"turns text, images, and video into decisions your application can use"（把文本、图像和视频转化为应用可用的决策）的 API。调用者 POST 一个 `state`（文本或 JSON）加 1–400 个具名问题，问题分三类：`noul`（是否判断，返回为真的概率）、`choice`（在 1–255 个具名选项中选择，各选项概率之和为 1）、`score`（1–10 个有序等级，返回概率加权的分数）。基础版上下文 128k，单请求最多 4 张图和 1 个视频；**Turbo** 变体扩展到 256k、100 张图、10 个视频。响应同步返回且 `output_tokens` 恒为 0，文档里有一句难得坦白的警告：confidence 是"**not a calibrated probability that the answer is correct**"（不是"答案正确"的校准概率）。这是本刊自 Perplexity Decider 与 Google Decisions API（11 月 10–12 日）以来持续跟踪的品类中的最新入场者：模型的产品*就是*决策本身，而不是散文。

**Why it matters:** 连虚拟人视频厂商都发货决策模型而非聊天模型，说明这个品类已经从研究珍奇变成了默认产品形态——路由、排序与人工升级阈值，正在成为独立的推理负载。那句"confidence 未校准"的警告，值得每个集成方抄进自己的文档。

[`🔗 HeyGen docs: HeyGen Decision`](https://developers.heygen.com/docs/models/heygen-decision) · [`🔗 OpenRouter: heygen-decision-1`](https://openrouter.ai/heygen/heygen-decision-1)

---

## 13. Google Research 开源 paper-orchestra：五个智能体把想法和实验日志变成可投稿的 LaTeX——"not an officially supported Google product"

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · +306★ today · 1.3k total · 8 commits · arXiv preprint
- **Tags:** `paper-writing` `multi-agent` `google-research` `llm`

**google-research/paper-orchestra**（Yiwen Song、Yale Song、Tomas Pfister、Jinsung Yoon）是一条多智能体流水线，把"unconstrained pre-writing materials (ideas and experimental logs)"（未受约束的写作前材料：想法与实验日志）转化为可投稿的 LaTeX 论文。五个专职智能体分工——**Outline、Literature Review**（检索、排序、整合相关工作）、**Section Writing、Content Refinement、Plotting**（用代码生成图表，外加概念示意图）——目标模板是 CVPR 2025 这类会议格式，附带 `autoraters/` 目录做自动评估。README 对边界很坦白："**This is not an officially supported Google product**"，评估数据集不在仓库内、将另行发布，且需要自备 Semantic Scholar/OpenAI/Vertex 的 key。引用指向 arXiv:2604.05018。

**Why it matters:** 自动化论文*写作*正是智能体浪潮与发表激励相撞的地方，而这个 repo 的不寻常之处在于：它把不性感的部分（文献筛选、图表生成、模板适配）作为可检视的流水线发布出来，而不是一个 demo。作者自带的"非官方支持"标签，恰是阅读其产物时应当导入的谨慎程度。

[`🔗 google-research/paper-orchestra`](https://github.com/google-research/paper-orchestra) · [`🔗 arXiv:2604.05018`](https://arxiv.org/abs/2604.05018)

---

## 14. 续 11 月 15 日禁飞令成因报道：FAA 新 AI 工具 SMART 引发疑问——禁飞前数日刚推广到全部中心，官方否认关联

- **Velocity:** ▮ steady
- **Source:** faa.gov Q&A (dated Nov 15) · AP via ABC News · updated Nov 16
- **Tags:** `faa` `ai-in-safety-critical` `ground-stop` `policy`

FAA 关于 11 月 13 日全国禁飞令的问答，如今要多回答第四个问题：就在禁飞前几天，FAA 刚把新工具 **SMART** 推广到全部空中航路交通管制中心——此前 9 月在华盛顿特区一带试点。SMART——Strategic Management of Airspace, Routes and Trajectories——由交通部长 Sean Duffy 与 FAA 局长 Bryan Bedford 于 9 月发布，称其为"a cutting-edge tool that centralizes 200 data streams — including weather patterns, flight paths, traffic flow, and controller staffing metrics — into one platform"（一个把 200 路数据流——天气、航路、流量、管制员排班指标——集中到一个平台的前沿工具），其 AI 支持的引擎将数据综合成流量的"comprehensive visualization"。它只向人类给出建议；据美联社，它"is not — at least not yet — set up for AI to be in charge of flight control"（至少目前还没有到让 AI 负责飞行管制的地步）。各方均否认关联：FAA 问答称禁飞是"out of an abundance of caution"（出于高度谨慎），供应商 **Air Space Intelligence** 表示事故并非由"the SMART system, any product of ASI or our integration with FAA and ATC"引起。已确认的成因仍是此前报道中的路由器作业——一次铜缆改光纤施工淹没了 ATC 系统。

**Why it matters:** 时机问题不言自明，但更实质的点更安静：一个 AI 决策支持层在安全关键基础设施的第一次系统性故障前几天完成了全量推广，而行业的本能是先问它有没有关系。这才是值得盯的部署模式——今天是"建议而非控制"，而那句话里的"not yet"承担了太多含义。

[`🔗 FAA: Nationwide Ground Stop — Questions and Answers`](https://www.faa.gov/newsroom/nationwide-ground-stop-questions-and-answers) · [`🔗 AP (via ABC News): Questions around FAA's new SMART AI system`](https://abcnews.com/US/wireStory/questions-swirl-faas-new-smart-ai-system-officials-138170875)

---

## 15. "软件正在系统性失灵"——Breck-McKye 的长文给 2026 年的故障级联找出了共同的形状

- **Velocity:** ▮ steady
- **Source:** breck-mckye.com · 137+ pts on HN · 1.8h ago (~02:17 UTC+8)
- **Tags:** `essay` `reliability` `ai-debt` `complexity`

Jimmy Breck-McKye 的文章（11 月 15 日）论证：今年的一系列事故——微软宕机、FAA 禁飞令、PHP2Shell、eMudhra 证书沦陷、Shai Hulud npm 投毒——没有单一原因，却有单一形状："a highly complex system made of low quality parts"（一个由低质量部件组成的高度复杂系统），没有人理解全局。AI 在这条更长的衰败线上**既是原因也是症状**：云与 OSS 依赖（团队"stopped knowing the details"）、文化上的去专业化（全栈通才的扁平化让 left-pad 和 XZ 那样的早期警报失灵），以及——引用 Kristen Maevyn 的 *The Decoherence Trap*——AI 真正的危险不是幻觉代码，而是"locally valid but mutually incompatible"（局部有效但彼此不相容）的变更在系统尺度上摧毁一致性。终点是技能退化成"meat proxies"，以及当每张工单、每份文档、每份摘要本身都是生成的时候，组织认知的流失。结尾很冷："The internet is at a breaking point"，而且这是"the new normal"。

**Why it matters:** 这是本刊整月的故障报道在经验层面积累出的论点成文版——它最有价值的贡献是 decoherence 框架：它解释了为什么每次变更的质量指标都是绿的，系统却还是崩了。文章见报同一天，五家银行一起倒下——是巧合，还是佐证。

[`🔗 Breck-McKye: Software is breaking down at a systemic level`](https://www.breck-mckye.com/blog/2026/11/software-is-breaking-down-at-a-systemic-level/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50520866)

---

## 16. TRMNL Frame：31.5 英寸彩色 ePaper 显示器装进手工木框——E Ink Spectra 6 配开源色彩引擎，首批约 470 台

- **Velocity:** ▮ steady
- **Source:** trmnl.com · 116+ pts on HN · 3.7h ago (~00:23 UTC+8)
- **Tags:** `epaper` `hardware` `eink` `dashboard`

TRMNL 的第三款产品 **Frame**，是一台 31.5 英寸全彩 ePaper 显示器，基于 E Ink 的 **Spectra 6** 平台，木框产自公司位于佐治亚州 Pine Mountain 的自家木工坊。色彩质量的赌注押在软件上：一个叫 **Lazarus** 的新色彩转换引擎——TRMNL 称它带来"the best color matching on the market for any Spectra 6 display"（市场上所有 Spectra 6 显示器中最好的色彩匹配），并且将**开源**。新的 Clock Sync 功能改变刷新行为：在一天中的固定时刻更新（更少闪烁、更长续航）；microSD 接口支持完全离线运行；Local Art 插件让用户提交甚至出售自己的作品。预购已开放：第一批约 **470 台**，限美国、加拿大、墨西哥和澳大利亚，少数年底前发货，大多数 2027 年初交付。

**Why it matters:** 大尺寸彩色 ePaper 在"展会 demo"阶段卡了很多年；一家小硬件公司把自己的木工坊和一条开源色彩管线都押上去，这种垂直整合要么打开用例，要么输得很有意思。开源的 Lazarus 引擎，是其他 Spectra 6 厂商第一天就能复用的部分。

[`🔗 TRMNL: Introducing Frame`](https://trmnl.com/blog/introducing-frame) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50519354)

---

## 17. "Active Directory 时代终于结束了"——Infisical 论机器身份：AD "自动批准短命云资源"，已沦为安全表演

- **Velocity:** ▮ steady
- **Source:** infisical.com · 89+ pts on HN · 5.8h ago (~22:15 UTC+8)
- **Tags:** `identity` `active-directory` `secrets-management` `zero-trust`

Infisical 的文章（11 月 13 日，11 月 16 日更新）论证：Active Directory 靠在一个地方回答三个问题而成功——哪些身份存在、什么为它们背书、在哪里有效——而当机器不再是由管理员注册的物理服务器时，它就断了。现代基础设施是短暂的（Kubernetes pod、CI runner、云数据库），加域自动化如今常常 auto-approve 短命云资源——即便你造出全部自动化来把每个测试数据库和 pod 都镜像进 AD，它也还是"**security theater**"：统一目录"would exist on paper, but lack authority"（存在于纸面上，却没有权威性）。证据是日常级别的：某国防组织一个公开暴露的 Lambda 函数，策略是 `iam:*`；`.env` 文件里的明文凭据；GitHub 自动化拒绝目录身份。结论："**Active Directory is the new mainframe: great for its time, but you'd never choose to start from scratch.**"（Active Directory 是新时代的大型机：曾几何时很伟大，但你绝不会从零开始选它。）两个替代方案——身份联邦（跨平台的 OIDC attestation）与凭据代理（Infisical 自家的模式）——都在没有单一目录的情况下还原那三个答案。结尾的论证正对本刊读者：AI 智能体将需要自己的身份与策略，机器身份即将变得远比现在承重。

**Why it matters:** 在多数云资产里，非人类身份早已比人类身份多一个数量级，而智能体工作流会让它们再翻一番。这篇文章是厂商所写、也自认厂商，但其诊断与本月的 Auth0 RAG、otterdog 事故在机制上互相印证：失守的边界，恰恰是从未经人类批准的那一个。

[`🔗 Infisical: The Active Directory Era Is Finally Over`](https://infisical.com/blog/active-directory-machine-identity) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50517815)

---

## 18. jiangshan-map：手工绘制的中国两千年历史交互地图——198 幅疆域快照、一个 MCP server，以及诚实的数据来源标注

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · +285★ today · 6.6k total · trending Repository of the Day badge (#2)
- **Tags:** `history` `maps` `visualization` `chinese-oss`

**DeanChensj/jiangshan-map**（江山时序，英文名 Chronicles of the Realm）是一个零依赖的静态站点，让你在**公元前 403 年至今**的时间轴上自由拖动——18 个历史时期、198 幅疆域快照——看着边界随"ghost boundary diffs"演化，点击任意城市查看其 2400 年的行政区划谱系，或顺着事件故事线追踪秦始皇、诸葛亮、玄奘。它自带一个 MCP server（零 npm 依赖）、现成的 agent skill、`window.atlasAPI` 浏览器 API，以及兼容 Leaflet/MapLibre/QGIS 的 GeoJSON 导出。数据来源的标注格外诚实：轮廓以 aourednik/historical-basemaps 为起点然后**手工重绘**；县级边界源自 CHGIS V6 与 Hartwell China Historical GIS，授权仅限学术非商业用途；README 明确警告疆域是"schematic approximations of broad jurisdictions, not surveyed borders"（大致辖区的示意近似，而非实测边界）。

**Why it matters:** 历史地图项目通常死在数据授权这一关；这个项目把哪些图层自由、哪些受限写得清清楚楚——这恰恰是任何克隆者都会搞错的部分。MCP server 加 skill 的打包方式也预示着教育可视化的走向：让智能体能驱动地图集，而不只是浏览器。

[`🔗 DeanChensj/jiangshan-map`](https://github.com/DeanChensj/jiangshan-map) · [`🔗 在线演示`](https://deanchen.me/jiangshan-map/)

---

## 19. S2 在 Spanner 上自建权威 DNS server——因为 Route53 把写入节流到每秒约 5 次，而攻击者注意到了

- **Velocity:** ▮ steady
- **Source:** s2.dev · 62+ pts on HN · 10.8h ago (~17:19 UTC+8)
- **Tags:** `dns` `infrastructure` `spanner` `postmortem-adjacent`

S2 的工程文章（Cristian Caciuc，11 月 16 日）解释了这家流式存储公司为什么用自建权威 DNS 替换托管 DNS：他们的每个"basin"都有一个子域，必须在创建时**立即**可解析，但 Route53 把记录 API 节流到约每秒 5 次 UPSERT——曾有攻击者创建数万个 basin，耗尽配额，留下耗时数小时才清完的积压（这正是旧的 100-basin 上限的由来）。解法：一个基于 **Go** 与 `miekg/dns` 的权威 DNS server，直接从 **Google Cloud Spanner 上的实时 SELECT** 应答——那是他们本就强一致的 basin 数据库，所以不存在会漂移的同步系统。NXDOMAIN 攻击经济学（每个伪造查询变成一次数据库查找）由前置的 Cloudflare DNS Firewall 处理，源站仅允许 Cloudflare IP 访问，并有 `ns-leak-test` 防 SOA/NS 响应中的源站泄漏，横跨两个 GKE region。运行数周，稳定——作者还提到近期提交"mostly CVE fixes, dependency bumps and cost savings"。

**Why it matters:** "It's always DNS"通常意味着 DNS 是别人的事；这里，对一个配额滥用循环的诚实工程回答是：自己成为 DNS 运营商。文章对每个取舍都很坦白（Go 而非 Rust、Spanner 一致性而非缓存、Cloudflare 当防 abusing 的盾）。即便你永远不运营 nameserver，这也是一篇好的架构阅读。

[`🔗 s2.dev: It's always DNS, so why are we running our own?`](https://s2.dev/blog/dns-server) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50515616)

---

## 20. 2007 年的"ThinkPad 神秘电源键代码"重现：按 10 次、长按 30 秒——而客服自己的解释是"dude, you know as much as I do"

- **Velocity:** ▮ steady
- **Source:** masnick.com · 257+ pts on HN · 8.4h ago (~19:39 UTC+8)
- **Tags:** `retro` `hardware` `thinkpad` `folklore`

Mike Masnick 2007 年的帖子重回首页：他全新的 ThinkPad z61t 在一次大会演讲前彻底断电，IBM 客服带他做了一遍仪式——拔电源、卸电池，**以一秒间隔按电源键 10 次，然后按住 30 秒**，装回电池，开机。机器瞬间复活。客服的官方解释是"static discharge"（静电释放）；被追问时的诚实回答是："dude, you know as much as I do… but your machine is working."（兄弟，你知道的和我一样多……不过你机器能用了。）评论区的成功报告横跨 2008 到 2015 年，远不止 z61t——T/X/R 系列 ThinkPad，还有 Acer、IdeaPad 和一台 S10 上网本——异议者认为单次长按效果相同，另一些人则信 RAM 重插或 CMOS 电池。

**Why it matters:** 这是带合理机制（耗掉残余电荷，解除卡死的电源状态）的民间偏方，也是围着民间偏方的合理机制，外加十八年不肯消失的一线数据。对任何维护旧硬件的人——大体就是本刊读者——这套仪式值得放进抽屉，和曲别针放在一起。

[`🔗 masnick.com: The Secret ThinkPad Powerbutton Code (2007)`](https://masnick.com/posts/the-secret-thinkpad-powerbutton-code-to-bring-dead-laptops-back-to-life/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50516473)

---

## 21. 卡内基梅隆把 CS 课堂搬上 YouTube——本月 8 门完整课程首播，其中包括一门 AI Agents 课

- **Velocity:** ▮▮▮ trending
- **Source:** cs.cmu.edu · 915+ pts on HN · 7.8h ago (~04:40 UTC+8)
- **Tags:** `education` `cmu` `courses` `open-access`

卡内基梅隆大学计算机学院上线了 **CS Learn**（cs.cmu.edu/learn）：由其教师讲授的完整课堂录像，免费放在 YouTube 上——"Free lectures now on YouTube. Free courseware coming next."（免费讲座现已登陆 YouTube，免费课件即将推出。）本月有八门课首播，包括 **10-605 大规模数据集机器学习**（William Cohen）、**15-442 机器学习系统**（Tianqi Chen 与 Zhihao Jia），以及周四首播的 **11-768 AI Agents**（Daniel Fried 与 Graham Neubig）——同日首播的还有 17-645 生产环境中的机器学习（Christian Kästner 与 Bogdan Vasilescu）。一月的阵容包括概率与计算（Mor Harchol-Balter）、多模态机器学习等。路线图不止于视频：下一步是带即时反馈和徽章的自学课件，而且"AI tutoring is coming to the courseware experience"（AI 辅导即将进入课件体验）。

**Why it matters:** 上周 MIT 把课程站点向 agent 开放；如今 CMU 把整个阶梯教室搬上 YouTube，课程表中排进了 AI Agents 课，路线图上写着 AI 辅导——顶尖计算机院校正在竞相让自己的教学成为人类和 agent 共用的免费训练语料。

[`🔗 CMU SCS：CS Learn`](https://www.cs.cmu.edu/learn/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50522980)

---

## 22. Windows 11 在悄悄记录你运行哪些编码 agent——MissionControlAggregator.dll 匹配 claude.exe、codex.exe、cursor.exe 并上报 Diagnostics

- **Velocity:** ▮▮▮ trending
- **Source:** xusheng.dev · 332+ pts on HN · 5.6h ago (~06:52 UTC+8)
- **Tags:** `windows` `telemetry` `privacy` `coding-agents`

逆向工程师 Xusheng Li 让 AI 在 Windows 二进制里挖掘未公开功能，结果在 **MissionControlAggregator.dll** 里撞见一份编码 agent 名单：四个 CLI agent 槽位检查 `copilot.exe`、`claude.exe`、`codex.exe`、`agy.exe`（WSL 路径上还有无扩展名版本），五个桌面 agent 槽位检查 `github.exe`、`claude.exe`、`codex.exe`、`cursor.exe`、`antigravity.exe`。这些名字被名为 **CLICodingAgentUsage**（feature ID 62580080）的功能开关后面的可执行文件名匹配器使用；该组件记录哪些 agent 和开发工具被使用过，先在本地缓存，再上报给 Windows Diagnostics——而且"除非你退订了'可选'诊断数据（它默认开启），数据就会上传给微软"。

**Why it matters:** Agent 的采用率已经值得操作系统级埋点——而埋点本身就是隐私故事。如果你管理机器，结论很具体："可选诊断数据"现在包含你的开发者都在用哪些 AI 工具。

[`🔗 Xusheng Li：Windows 11 Is Collecting Data on Which Coding Agents and Developer Tools You Use`](https://xusheng.dev/posts/windows-coding-agent-telemetry/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50524736)

---

## 23. BugMeNot 在运营二十余年后关闭——"Thanks to everyone who envisioned a better internet"

- **Velocity:** ▮▮ rising
- **Source:** bugmenot.com · 384+ pts on HN · 6.9h ago (~05:35 UTC+8)
- **Tags:** `internet-history` `privacy` `login-walls`

BugMeNot——那个让人绕过"请注册免费账户以阅读本文"墙的几十年老牌共享账号服务——已关闭。站点现在只剩一页告别："**BugMeNot has closed. Thanks to everyone who envisioned a better internet**"（BugMeNot 已关闭。感谢所有曾设想一个更好互联网的人）——没有说明任何原因，后面跟着一串四字母分组，讨论串里还没人解开。社区的悼词对衰落并不避讳：近期还能用的登录大多是弃用邮箱（bugmenot@mailinator.com、yopmail 账号），有用户"一两个月前"还觉得它有用，今天才发现关站了。

**Why it matters:** 本刊本周刚报道过注册墙、抓取禁令和登录围墙——前围墙时代的老物件正巧在同一周死去。这句告别语读起来像是对那笔交易的评价。

[`🔗 BugMeNot 告别页`](https://www.bugmenot.com/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50523601)

---

## 24. 美联航 30 分钟系统故障延误全国航班——同一天的第二起系统性技术故障

- **Velocity:** ▮▮ rising
- **Source:** cnn.com · 204+ pts on HN · 6.3h ago (~06:15 UTC+8)
- **Tags:** `outage` `airlines` `reliability`

美联航周一美东时间下午 5 点前承认一次影响出港航班的**大范围技术故障**，约一小时后解决——这次约 30 分钟的故障延误了全美机场的出港航班，发言人 Leslie Scott 称**受影响航班少于 150 架次**。CNN 指出它发生在"一次罕见 FAA 禁飞令造成大范围混乱之后"。原因未公布。同一天，五家美国大型银行同时报告访问故障（见第 1 条）——不同行业、未见共同原因，对集中度风险而言是非常糟糕的一天。

**Why it matters:** 一个新闻周期里两起互不相关的系统性故障，正是韧性研究者警告的模式：单独看都能挺过去的故障，从外面看却像基础设施在同一负荷下呻吟。两份根因报告都还没出。

[`🔗 CNN：United Airlines says it resolved system outage that delayed flights`](https://www.cnn.com/2026/11/16/us/united-airlines-outage) · [`🔗 AP：United Airlines has a widespread system outage`](https://apnews.com/article/united-airlines-outage-5a5e5f75bb07f11ffb8750901f0076ff)

---

## 25. OPTIMJACK：178 个站点经 Optimizely 自家 CDN 投放恶意代码——攻击者写进客户 Project JavaScript，攻击包还带 iOS 漏洞利用

- **Velocity:** ▮▮ rising
- **Source:** blog.report-uri.com · 163+ pts on HN · 5.6h ago (~06:55 UTC+8)
- **Tags:** `supply-chain` `skimware` `magecart` `optimizely`

11 月 16 日，**178 家机构**的访客通过 Optimizely Web 的代码片段收到了恶意 JavaScript——其中包括 Zoom、BBC、CNN、Salesforce、GitLab、IKEA、HSBC、Equifax、Air France-KLM、Ledger 和 Peacock（Scott Helme，Report URI）。入侵手法相当外科：攻击者写进了 Optimizely 后台中客户项目的 **Project JavaScript** 字段，于是带毒代码依然从 `cdn.optimizely.com` 加载、挂着 Optimizely 的证书——客户自己的源站全程干净。攻击包会调换加密货币钱包地址、窃取支付卡信息、偷 cookie 和截屏，并在 iPhone 和 iPad 上投放 **Coruna 与 DarkSword iOS 漏洞利用包**；加密货币已被盗，且交易可验证。清理过程被实时追踪：20:56 UTC 时 188 个受感染片段中有 169 个带毒，21:52 UTC 降到 1 个。独立分析文章将行动命名为 **OPTIMJACK**（Optimizely 包内的加载器追加 `track.js`；C2 位于 `1688360[.]cc` 及两个 `.icu` 域名）。

**Why it matters:** "Trusted JavaScript doesn't always remain trustworthy"（受信任的 JavaScript 不会永远可信）——一个第三方标签平台是所有嵌入它的站点的单点 compromise。如果你的站点加载任何实验或代码片段管理器，今天就审计你的 bundle；report 模式的 CSP 本可暴露此事。

[`🔗 Report URI：World's Largest Brands Infected With Malware Via Optimizely`](https://blog.report-uri.com/worlds-largest-brands-infected-with-malware-via-optimizely/) · [`🔗 Amirul Cyber：OPTIMJACK 分析`](https://amirulcyber.com/2026/11/16/optimjack-optimizely-skimmer/)

---

## 26. OpenCode 发布 Browse：把你真实的浏览器变成 agent 的工具——真实标签页、真实登录态，2FA 时交还控制权

- **Velocity:** ▮▮ rising
- **Source:** opencode.ai · 157+ pts on HN · 7.2h ago (~05:25 UTC+8)
- **Tags:** `mcp` `browser` `agent-infrastructure` `opencode`

OpenCode 发布 **Browse**："An MCP server and a Chromium extension that let your agents use your real browser, with your tabs, your logins and your extensions."（一个 MCP server 加一个 Chromium 扩展，让 agent 使用你的真实浏览器，带着你的标签页、登录态和扩展。）Agent 标签页在后台以折叠分组打开，支持 Chrome、Edge、Brave、Arc、Helium、Vivaldi、Opera 与 Chromium；agent 能读页面、点击、输入、截屏和录制标签页。有趣的是那条**交接边界**：遇到登录、2FA 提示或支付时，agent 把标签页交还给你，你点 Continue 后它继续——还有工具栏按钮把当前已打开的标签页"借"给 agent，以及 allowed-sites 列表把 agent 的标签页钉在指定域名上。支持任何 MCP 客户端（OpenCode、Claude Code、Cursor、Codex、Zed）。

**Why it matters:** Agent 浏览器一直两头分裂：无头一次性 profile（没有登录态）与截屏驱动的 computer use（慢且瞎）。Browse 押注第三条路——你真实的已登录浏览器作为底层，在恰好涉及凭据的步骤上让人留在回路里。

[`🔗 OpenCode：Browse`](https://opencode.ai/product/browse) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50523459)

---

## 27. 一波隔夜 CVE 直接打在 agent 技术栈上：Phoenix 10.0（窃取环境变量）、CubeSandbox 9.4（沙箱逃逸）、MCP Python SDK 7.5（OAuth 凭据外泄）

- **Velocity:** ▮▮ rising
- **Source:** NVD（28 条 GitHub CNA 记录，发布于 2026-11-16 20:00Z – 11-17 04:00Z）
- **Tags:** `cve` `agent-infrastructure` `mcp` `sandbox-escape`

隔夜的 GitHub CNA 记录中有三条落在 agent 技术栈自身的管道上，评分全部为 CNA 自评，NVD 状态仍为 `Received`。**CVE-2026-53998（10.0）**：Arize-Ai 的 Phoenix AI 观测平台（13.0.0 至 15.7.0）把攻击者控制的 F-string 模板传进 `applyChatTemplate` GraphQL 查询，而 `DotDict.__getattr__` 未能阻止对私有属性的遍历——`__class__`、`__init__`、`__globals__`——使构造字段得以**读取进程环境变量**，也就是 API key 的住所。**CVE-2026-120699（9.4，CVSS 4.0）**：腾讯云"为 AI agent 打造的即时、并发、安全、轻量沙箱"CubeSandbox 允许任何已认证租户给 `metadata["host-mount"]` 传入任意已存在的主机路径——没有授权检查也没有前缀白名单——把主机目录挂进沙箱；0.5.1 修复。**CVE-2026-115563（7.5）**：官方 **MCP Python SDK**（1.9.1 至 1.30.0，以及 2.2.0）的 OAuth 客户端会把凭据发给由不受信 MCP server 选定的授权服务器——`ClientCredentialsOAuthProvider` 与 `PrivateKeyJWTOAuthProvider` "cannot identify the authorization server that owns their credentials."（无法识别凭据属于哪个授权服务器。）

**Why it matters:** 环境变量是 key 的住所，沙箱是信任边界，OAuth 是 agent 的认证方式——三个 CVE 正好打在这三个假设上，而且是每个严肃 agent 部署都要站的三层（观测、沙箱、协议 SDK）。补丁清单：Phoenix ≥ 15.7.0，CubeSandbox ≥ 0.5.1，MCP SDK 升出受影响区间。

[`🔗 GHSA-gfv3-m769-5xm3（Phoenix）`](https://github.com/Arize-ai/phoenix/security/advisories/GHSA-gfv3-m769-5xm3) · [`🔗 GHSA-qx49-fqc8-xw99（MCP Python SDK）`](https://github.com/modelcontextprotocol/python-sdk/security/advisories/GHSA-qx49-fqc8-xw99)

---

## 28. ChatGPT Wallet：agent 有了真正的钱包——卡片令牌、逐笔生物识别审批，Amex/Chase/Mastercard/Visa 入场

- **Velocity:** ▮▮ rising
- **Source:** openai.com · 46+ pts on HN · 13.4h ago (~23:10 UTC+8)
- **Tags:** `agentic-commerce` `payments` `openai` `chatgpt`

OpenAI 发布 **ChatGPT Wallet**——"the first wallet that lets agents pay without access to users' actual card details and that requires a security check for every purchase"（第一个让 agent 在接触不到用户真实卡号的情况下付款、且每笔交易都要求安全校验的钱包）——与美国运通、Chase、Mastercard、Visa 合作构建。流程：用户录卡一次；每笔购买前复核商品、总额与所选卡片；审批是一次生物识别安全校验；支付网络随后下发**令牌**代替卡片，agent 和商家都看不到真实卡号，而既有积分与争议保护照常适用。**今天起在 dots 中推出**，面向 18 岁以上的美国 ChatGPT Pro 订阅用户及合规的美国发卡。随附 Commerce Partner Playbook：用 Web Bot Auth 识别签名 agent 请求，反欺诈伙伴（Forter、Riskified、Sardine、Signifyd），PSP 集成（Adyen、Checkout.com、Stripe）——并预告最终可在消费限额与品类边界内完全委托购买。

**Why it matters:** 在美联航封禁 agent 订票、x402 试验按次付费之后，卡组织已选边站：agent 支付正在成为带生物识别授权记录的受监管基础设施，而非外挂。每个商家下周要建合规面，规格书已经发下来了。

[`🔗 OpenAI：Introducing ChatGPT Wallet`](https://openai.com/index/introducing-chatgpt-wallet/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50518501)

---

## 29. 细读 Anthropic 的 IPO 路演主张：Mythos 用约 3 天把 Claude 搬上 AMD MI355X——仅限 prefill、仅一个模型

- **Velocity:** ▮▮ rising
- **Source:** tomshardware.com · 29+ pts on HN · 3.3h ago (~09:10 UTC+8)
- **Tags:** `anthropic` `claude-mythos` `amd` `cuda`

Anthropic 向 IPO 投资人表示，**Claude Mythos Preview** 在"仅三天、基本无人干预"的情况下完成了让 Claude 跑上 AMD Instinct MI355X GPU 的软件工作，移植或编写了"几乎 100% 的 kernel"——对照的是历史上用数十名工程师、耗时 6 到 12 个月的加速器上线（联合创始人兼首席算力官 Tom Brown，11 月 10 日路演视频；招股书 S-1/A No. 2 也载有此说但无数字）。Tom's Hardware 对幻灯片脚注的解读才是该引用的部分：约 3 天覆盖的是"**prompt processing for one Anthropic model on AMD MI355X GPUs at a useful level of performance**"（一个 Anthropic 模型在 MI355X 上、达到可用性能水平的 prompt 处理）——decode 性能未说明，图表的"~100%"轴从未说明是 100% 的什么，也未公布 AMD 对 Nvidia 的速度对比。背景：AMD 七月主题演讲里是一名工程师加 Claude 在一个周末带起 MI355X 机架；Jensen Huang 称 Anthropic 是"一个孤例，不是趋势"——而 Nvidia 和 AMD 恰是按 IPO 发行价认购 Anthropic 260 亿美元股票的七家公司之二。

**Why it matters:** 如果 kernel 移植从数月缩到数天，CUDA 护城河就从工程问题变成基准问题——但主张的脚注（仅 prefill、单模型、无速度基线）正是本刊反复标记的"增量对不上配置"式模糊。复测机会在 2027 上半年的首批 MI450 Helios 机架。

[`🔗 Tom's Hardware：Anthropic says Claude Mythos slashed software work to onboard AMD GPUs`](https://www.tomshardware.com/tech-industry/artificial-intelligence/anthropic-says-claude-mythos-slashed-software-work-to-onboard-amd-gpus-from-up-to-12-months-to-around-three-days-writing-almost-100-percent-of-kernels-autonomously-chips-away-at-nvidias-cuda-moat) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50526264)

---

## 30. Harmonic 的 Aristotle 支持 Rust：证明无未定义行为、符合规约——"even inside unsafe blocks"

- **Velocity:** ▮ steady
- **Source:** harmonic.fun · 110+ pts on HN · 11.1h ago (~01:30 UTC+8)
- **Tags:** `formal-verification` `rust` `ai` `harmonic`

Harmonic 宣布 **Aristotle 现已验证 Rust**，把其 AI 驱动的形式化验证从 C 与 Verilog 扩展开来。支持 Rust 后，它能"prove that your code has no undefined behavior and does exactly what its spec says, **even inside unsafe blocks**"（证明你的代码没有未定义行为、完全符合规约——即便在 unsafe block 内），对 C 改写为 Rust 的代码，还能证明新代码与原实现行为一致。CEO Tudor Achim："Rust is where much of the world's most critical new code is being written, and increasingly, AI is the one writing it."（世界最关键的新代码正写于 Rust，而写得越来越多的正是 AI。）其公开案例给出了它声称能抓到的东西的质感：某个 Verilog 设计的 bug"found 110,000 cycles deep in its hardest block"（在最难的模块深处 11 万个周期才显形）、LibTomMath 在同一规约下被证明提速 31–38%，以及整个 Rust 订单簿上的 28 条发现。

**Why it matters:** 它与今天第 4 条 Buzzard 的 Lean 验证主张四项检验落在同一天——AI 代码时代正在裂成两条 QA 路线：统计式（测试、基准）与机械化（证明、验证器），而吃下 Rust 的验证器——安全攸关改写浪潮选定的语言——是两者中分量更重的那一个。

[`🔗 Harmonic：Aristotle Expands Into Rust`](https://www.harmonic.fun/news/aristotle-rust-verification) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50520270)

---

## 31. Jolt：会说 C 的 Clojure——自举于 Scheme 层之上，无 JVM，单二进制构建加原生 C 互操作

- **Velocity:** ▮ steady
- **Source:** jolt-lang.net · 99+ pts on HN · 12.2h ago (~00:20 UTC+8)
- **Tags:** `clojure` `lisp` `languages` `compilers`

**Jolt** 是一个自举的 Clojure 实现，运行在支持多后端的可移植 Scheme 层上——原生走 Chez Scheme，JavaScript 走 Gambit——全程不见 JVM。它的自述："Most Clojure runs unchanged, any C library binds natively, and `jolt build` ships a single standalone binary."（多数 Clojure 代码原样可跑，任何 C 库原生绑定，`jolt build` 出货单个独立二进制。）`defcfn` 把 C 函数变成普通 Clojure fn（文档自带示例这样够到 SQLite、Postgres、OpenSSL 和 zlib）；`jolt build` 提前编译运行时、标准库、应用和依赖为单个自包含可执行文件，C 依赖静态链接。宣称完整 Clojure 语义——持久化数据结构、惰性序列、transducer、multimethod、protocol——加上真实的 OS 线程并发（`future`、`agent`、`pmap`、`core.async`）。首页那个 REPL 就是 Gambit 后端编译成 JavaScript 的 Jolt 本体，在浏览器里实时求值。

**Why it matters:** Clojure 押注 JVM 二十年后，Jolt 证明这门方言的语义可以与之彻底脱钩——而 Scheme 宿主这个技巧是真正漂亮的可移植性故事：同一份源码树，既出原生二进制，又出浏览器 REPL。

[`🔗 Jolt：Clojure that speaks C`](https://jolt-lang.net/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50519345)

---

## 32. Spamhaus 本月起强制 HELO/PTR/A 记录对齐——每个发件人的底线收紧了

- **Velocity:** ▮ steady
- **Source:** spamhaus.org · 77+ pts on HN · 6.9h ago (~05:35 UTC+8)
- **Tags:** `email` `deliverability` `spamhaus` `dns`

Spamhaus 新的 Sender Guidelines 带着明确日期的要求："**Starting in November 2026, we are gradually rolling out a requirement for every sending IP to have a valid HELO, a reverse DNS (PTR) record, and a matching A record**"（自 2026 年 11 月起，我们将逐步要求每个发信 IP 拥有有效 HELO、反向 DNS（PTR）记录以及匹配的 A 记录）——并配有 HELO/DNS 检查工具供自测。指南把其余门槛分六节：基础设施与 DNS、认证（SPF/DKIM/DMARC）、许可与列表卫生（含 spamtrap）、发送最佳实践（预热、退信管理、退订）、IP 与域名信誉、以及 ESP/大发件人义务。

**Why it matters:** 多数邮件送达建议是民间偏方；这是一家黑名单运营商把准入标准写成了公开、带日期、可自测的规格。如果你自建邮件服务器，HELO/PTR/A 三角已是入场券——检查工具一次调用就告诉你过没过。

[`🔗 Spamhaus：Sender Guidelines`](https://www.spamhaus.org/sender-guidelines/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50523784)

---

## 33. Git 的 `clone --recurse-submodules` 缺陷（8.0）与 containerd 的 manifest 恐慌（7.1）同乘隔夜这波浪

- **Velocity:** ▮ steady
- **Source:** NVD（GitHub CNA 记录，发布于 2026-11-16 20:00Z – 11-17 04:00Z）
- **Tags:** `cve` `git` `containerd` `supply-chain`

隔夜 GitHub CNA 记录里还有两条值得单独一行。**CVE-2026-111760（8.0）**：Git 2.50.2/2.51.3/2.52.1/2.53.1/2.54.1/2.55.1/2.56.1 之前的版本，一个**由攻击者自持的仓库**（"hosted by the attacker rather than on a normal forge site"，即不在正常托管平台上）配合 `git clone --recurse-submodules`，可以让 Git 把子模块 gitfile 覆写为符号链接，指向藏有攻击者控制的 Git 配置或钩子的目录——随后在克隆者机器上执行。**CVE-2026-95839（7.1，CVSS 4.0）**：containerd（2.2.0 至 2.2.10/2.3.7/2.4.2）在拉取 manifest 携带畸形 digest 的 `io.containerd.manifest.subject` 注解镜像时守护进程崩溃——"including through a default CRI PullImage request"（包括经由默认的 CRI PullImage 请求），也就是说一个恶意或被攻陷的 registry 能拖垮从中拉镜像的 Kubernetes 节点。已在 2.2.10、2.3.7、2.4.2 修复。

**Why it matters:** 两个都是每个 CI 系统都要走的两步操作——clone 与 pull——上的信任边界缺陷，且都在普通命令上触发，无需花哨参数。在下一次对陌生 URL 做递归克隆之前，先把 Git 补丁位与 containerd 小版本钉死。

[`🔗 GHSA-vp2w-7xxj-jvxr（Git）`](https://github.com/git/git/security/advisories/GHSA-vp2w-7xxj-jvxr) · [`🔗 GHSA-vwhp-8p66-mq4f（containerd）`](https://github.com/containerd/containerd/security/advisories/GHSA-vwhp-8p66-mq4f)

---

## 34. Phison SSD 主控固件：泄露的 RSA 参数解锁厂商命令——可在盘上任意内存读写、临时执行代码

- **Velocity:** ▮ steady
- **Source:** NVD（CERT/CC 记录，发布于 2026-11-16 20:00Z – 11-17 04:00Z）· CVE-2026-126828 等
- **Tags:** `cve` `firmware` `ssd` `hardware-security`

CERT/CC 的披露潮隔夜砸向 Phison SSD 主控固件：**CVE-2026-126828**（E18；固件 EIFM80.0 与 EIFK51.2）——拥有管理员权限的本地攻击者可以"by leveraging leaked RSA parameters found in vendor utility binaries"（利用厂商工具二进制中泄露的 RSA 参数）绕过盘的"Security Access"握手，解锁允许**任意内存读写**的厂商专有命令；由于"the firmware's code regions lack protection"（固件代码区缺少保护），这些原语可覆写既有处理函数，在 SSD 主控上实现**volatile 代码执行**。同批记录覆盖 E16（EGFM13.2，CVE-2026-129187）与 E12（ECFM32.2，CVE-2026-129190），VulnCheck 另案的 **CVE-2026-124017（6.7）** 则描述 E12/E18 上的**Secure Boot 绕过**，允许特权攻击者运行改过的固件。NVD 状态全部为 `Received`；关联研究仓库（VL4DR/PhisonExecutor）今天有推送。

**Why it matters:** 这是 OS 之下的攻击面：磁盘加密、Secure Boot 和 OS 取证都默认信任的那一层。本地管理员到主控代码执行，正是物理接触或恶意内部人叙事需要的提权路径——而固件修复的时钟与 OS 补丁不同。

[`🔗 CVE-2026-126828 记录`](https://www.cve.org/CVERecord?id=CVE-2026-126828) · [`🔗 VL4DR/PhisonExecutor`](https://github.com/VL4DR/PhisonExecutor)

---

## 35. lend：herdr 作者对 agent 凭据蔓延的答案——agent 以租约借用你笔记本上的工具，永远看不到密钥本身

- **Velocity:** ▮ steady
- **Source:** blog.antonio.cx · 52+ pts on HN · 3.2h ago (~09:20 UTC+8)
- **Tags:** `agent-infrastructure` `credentials` `security` `cli`

继 11 月 12 日报道过编码 agent 的 Rust 终端复用器 **herdr** 之后：其作者现已发布缺失的那一块——**lend**，一个"a tool built to let remote agents use tools on my laptop with my approval"（为让远程 agent 在我批准下使用我笔记本上的工具而造）的工具。架构：agent 跑在可丢弃 VM 上，笔记本保留王冠明珠（SSH key、1Password 保险库、已登录的 `gh` 与云 CLI）；agent 需要时，lend 以租约居中调停，持有"secrets the agent never sees"（agent 永远看不到的密钥），让作者事后检视 agent 做了什么，甚至从笔记本代答 agent 的提问。文章对边界同样坦白：专设一节"What lend doesn't protect against"（lend 防不了什么），外加先行工作梳理。

**Why it matters:** 凭据问题是 agent 基础设施里不受待见的那一半——人人都靠把 token 糊进 VM 解决。租约加审批、密钥留在 agent 够不到的地方，这与 OpenCode 在浏览器侧选择的交接边界（第 26 条）是同一条信任线，在终端里独立长了出来。

[`🔗 antonio's blog：Running coding agents without handing them my credentials`](https://blog.antonio.cx/running-agents-with-lend) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50526152)

---

## 36. psychic：会学习你打开什么的 fzf——用本机使用数据训练 ML 模型排序的 Rust 文件浏览器

- **Velocity:** ▮ steady
- **Source:** klauria.tech · 44+ pts on HN · 13.4h ago (~23:10 UTC+8)
- **Tags:** `cli` `rust` `ml` `developer-tools`

Kshitij Lauria 的 **psychic**（"like fzf but learns from your actions"，像 fzf 但会从你的行为中学习）是一个终端文件浏览器兼 `cd` 替代品：记录你去过哪些目录、打开过哪些文件，在本机数据上训练一个轻量 ML 模型并以此排序——开源（kshitijl/psychic，Rust），结果随输入即时更新，UI 渲染低于 16 毫秒。作者自己的使用数据把卖点说得很实：2025 年 10 月以来打开 1,450 次，找到目标文件**平均只敲 1.6 个字符**，29% 的时候零字符——打开、回车、完事。一切设计都服从一条规则：必须快到一个按键一帧内更新。

**Why it matters:** 面向单个开发者的自适应浪潮（学习你代码库的编辑器、学习你命令的 shell）如今到达文件系统导航——而那句坦白的自省（"I'd rather do 10 fast searches … than 1 smart search"，宁可十次快搜索也不要一次慢聪明）正是 ML 进 CLI 回路的正确约束。

[`🔗 klauria.tech：psychic`](https://klauria.tech/psychic/) · [`🔗 kshitijl/psychic`](https://github.com/kshitijl/psychic)

---

## 37. Sutra-OS：一个"AI agents 只提案"的自托管本体平台——每次变更都是服务端强制执行的提案，获批才生效

- **Velocity:** ▮ steady
- **Source:** Show HN · 42+ pts · 5.1h ago (~07:30 UTC+8) · 0nelight/sutra-os 51★
- **Tags:** `ontology` `self-hosted` `agent-governance` `data-lineage`

今天的 Show HN：**Sutra-OS**——"Scarce Units, Typed, Related, Actionable"——一个 AGPL-3.0 的自托管本体平台（beta），把组织数据变成一个你拥有的模型：带类型、带关联、只能经服务端强制执行的规则变更，血缘把每个数字追溯到源头。它的九个核心特性读起来像一份 agent 治理清单：写入只走一扇门（action 会被服务端带着理由拒绝）、**"deciding is not doing"（决定不等于执行，每次变更都是提案，获批才生效）**、**"AI agents only propose"（AI agent 只能提案）**、模型与数据都有分支、访问控制由服务端经 markings 强制、模型即生成的类型化 API、凭据由独立的 egress agent 保管、Writer/Calc/Visio 式文档在模型上实时共编。Web 应用、Python SDK、CLI、REST API、agent 与 git 全部服从同一套规则。

**Why it matters:** Agent 提案、人类审批，是本刊反复出现的治理模式——OmniAgent 的审批门（以及它把 `find` 前缀当安全的洞）已说明强制执行有多难。把执行放进服务端而非 prompt 的平台，是那课的架构版。

[`🔗 0nelight/sutra-os`](https://github.com/0nelight/sutra-os) · [`🔗 Show HN 讨论`](https://news.ycombinator.com/item?id=50525052)

---

## 38. AI 原生笔记先驱 Mem 将于 1 月 15 日关停——品类开创者五度转型后谢幕

- **Velocity:** ▮ steady
- **Source:** get.mem.ai · 21+ pts on HN · 2.3h ago (~10:15 UTC+8)
- **Tags:** `shutdown` `notes` `ai-native` `saas`

Mem——这个 AI 原生笔记应用，其轨迹几乎就是整个品类的轨迹（2022 年基于嵌入的"Similar Mems"、2022–23 年的生成式 Smart Write、2024 年的 Mem Chat、2026 年 4 月的 MCP 连接器与 ChatGPT 应用、2026 年 7 月伸进 iMessage/WhatsApp/Slack 的主动 agent）——于 11 月 16 日宣布关闭：**12 月 18 日笔记转只读，2027 年 1 月 15 日服务关停**，计费已暂停。创始人 Kevin Moody 的告别信配了迁往 Apple Notes、Notion、Obsidian 等处的迁移指南，外加一份少见的详尽回顾，把每个时代原始发布帖都链接在列。

**Why it matters:** 围绕 AI 整理个人知识建立的独立应用，正是前沿厂商不断吸收进自家产品的品类——而一次带着干净导出路径与公开时间线的关停，是本刊覆盖的每一样依赖都应被要求的告别方式。

[`🔗 Mem：Mem is shutting down`](https://get.mem.ai/blog/mem-is-shutting-down) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50526537)

---

## 39. Uber 数据泄露：约 15 万司机驾照信息经一家技术供应商的被窃凭据外流

- **Velocity:** ▮ steady
- **Source:** techcrunch.com · 26+ pts on HN · 5.9h ago (~06:35 UTC+8)
- **Tags:** `breach` `uber` `third-party` `pii`

Uber 正在通知**近 15 万名司机**：他们的个人信息与驾照数据在**十月发生的一家技术供应商侧泄露**中被窃（Zack Whittaker，TechCrunch）。据本周向加州、爱荷华等多州总检察长提交的通知：该供应商 10 月 9 日告知 Uber，黑客入侵后**窃取内部凭据**，进而访问了存放在该供应商处的 Uber 数据。被窃数据包括姓名、地址、出生日期与驾照信息。Uber 自有系统并未被描述为失守——这次泄露走的是供应商关系。

**Why it matters:** 就在本刊报道 FBI 把入侵归因于 AI 渗透平台（第 3 条）的同周，本季度的老模式再次应验：失守的边界不是公司自己的——是供应商的凭据。供应商凭据清单就是新的攻击面地图。

[`🔗 TechCrunch：Uber says hackers stole information on close to 150,000 driver's licenses`](https://techcrunch.com/2026/11/16/uber-confirms-hackers-stole-thousands-of-drivers-license-information-in-data-breach/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50524538)

---

## 40. Claude Code 团队如何思考验证——当代码约九成由 agent 写出，测试就是管理层

- **Velocity:** ▮▮▮ trending
- **Source:** claude.dev · HN 42+ pts · 2h ago (~18:03 UTC+8)
- **Tags:** `verification` `claude-code` `testing` `agent-infrastructure`

Addy Osmani 撰文阐述 Claude Code 团队维持质量的工程方法："我们绝大部分代码（约 90%）由 Claude 编写并由 Claude 审查。在这种规模下，让 agent 用证据来验证自己的工作就变得极其重要。" 值得投入的三类测试：**端到端**（"很难被糊弄——要么整个功能能用，要么不能用"）、**属性测试**（用 fast-check/Hypothesis/proptest 生成上千个输入，打向"人们容易漏掉、而 agent 恰恰常失手的边缘情况"），以及**差分测试**。一条内部数字："让独立的 grader 按评分细则核查 Claude 的工作，比标准提示循环最多提升 10 个点的任务成功率，越难的问题收益越大。" 操作细节同样关键：flaky 测试是毒药，因为"你会把 agent 训练成重跑测试而不是修复代码"；而验证循环正是让团队并行跑"几十甚至上百个" agent 而不是一两个的前提——因为没有人逐个人工复核。

**Why it matters:** 厂商自述自家代码库约 90% 由机器写成，是本刊连日话题迄今最硬的数据点：护城河已经从"写代码"移到"规格化与验证代码"。这篇文章与今天的 Buzzard 四条检验（第 4 条）、Harmonic 的 Rust 验证器（第 30 条）正好拼出 AI 代码时代的 QA 技术栈。

[`🔗 claude.dev：How the Claude Code team thinks about verification`](https://claude.dev/blog/how-the-claude-code-team-thinks-about-verification/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50529612)

---

## 41. Apple 在 macOS 27.3 上线分级式完全磁盘访问——"只选择特定的受保护文件夹或应用"，而不是绕过系统保护

- **Velocity:** ▮▮▮ trending
- **Source:** support.apple.com · HN 144+ pts · 10h ago (~02:00 UTC+8)
- **Tags:** `macos` `privacy` `permissions` `security`

Apple 发布支持文档，披露 **macOS 27.3** 的一项悄然变化：当应用申请"完全磁盘访问"或**"系统与应用保护覆写"**时，"你可以选择只让该应用访问特定的受保护文件夹或应用"。文档对"全有或全无"授权的含义毫不讳言：完全磁盘访问让应用"不经询问即可读取、更改、删除并导出这些数据"——包括信息、邮件、照片和其他用户的数据；而系统与应用保护覆写"可以完全控制你的 Mac 和应用……它还能看到每一个窗口和应用，包括后台运行的那些，并捕获每一次按键"。在"隐私与安全性"设置里，macOS 现在会提示用户只勾选该应用真正需要的文件夹或应用（点名对象包括备份工具、磁盘清理器、文件索引器和安全类应用），"而其余数据的系统保护保持原样"。

**Why it matters:** 完全磁盘访问一直是 macOS 上最常被滥用的授权页——一次点击就能把工具软件变成全监视应用。把两项最危险的 TCC 授权做成分级选择，是桌面端终于补上移动系统多年前就有最小权限模式；对开发者来说假设也变了：应用不能再把 FDA 当成"我什么都拿得到"。

[`🔗 Apple 支持：如果应用申请"完全磁盘访问"或"系统与应用保护覆写"`](https://support.apple.com/en-us/149699) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50526560)

---

## 42. Carmack 谈 3dfx Voodoo 1 为何色彩发灰："NeXT 和 3DFX 都想在色彩空间上'做对的事'，结果通常比竞品看起来更糟"

- **Velocity:** ▮▮ rising
- **Source:** x.com (id_aa_carmack) · HN 165+ pts · 12h ago (~00:00 UTC+8)
- **Tags:** `graphics` `retro` `color` `carmack`

HN 的问题是：为什么 3dfx Voodoo 1 显卡输出色彩发灰？John Carmack 的回答是一份迟到二十年的复盘："NeXT 和 3DFX 都想在色彩空间上'做对的事'，结果通常比竞品看起来更糟。很多年后我才真正理解这件事。" 楼里的讨论把机制拼了起来——一条热门评论解释了反直觉之处：sRGB 除信号电压层外处处非线性，而在 CRT 上"50% 的 sRGB 就真的是 50% 的信号电压"，于是在数学上"正确"的线性管线，反而比单纯对着用户面前那块玻璃调参的竞品更暗、更平。

**Why it matters:** 这是"正确"与"合适"之别的一堂压缩课：两家公司都为数学上站得住的选择做了优化，却把市场输给了在用户实际显示器上更好看的东西。1996 年以来关于色彩管理、色调映射与显示响应的每一场管线争论，都是这笔交易的下游。

[`🔗 John Carmack on X`](https://twitter.com/id_aa_carmack/status/2122478083319992513) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50525575)

---

## 43. K2-Horizon：六款全开源语言模型编队，0.9B 到 375B-A23B MoE——检查点、日志、数据管线全数公开

- **Velocity:** ▮▮ rising
- **Source:** arxiv.org · 论文 11 月 16 日提交 · HF Papers 52+ 赞
- **Tags:** `open-weights` `llm` `moe` `training-data`

K2 团队（Zhengzhong Liu、Haonan Li、Xuezhe Ma、Rupesh Kumar Srivastava 等数十人）发布"**由六款完全开源的语言模型组成的编队，从 0.9B 稠密模型到 375B-A23B MoE**，面向通用推理与 agentic 工作"。建模侧两个新结构：**MoVA**（Mixture-of-Value Attention——"把 MoE 应用到注意力的 value 投影上"）与 **softplus 注意力门控**；36B-A4B 模型"在相同数据上训练，以七分之一的激活参数逼近 32B 稠密模型"。另有 **Uno**——"无损扩散适配器，无需独立草稿模型即可将解码加速至多 2.2 倍"。发布遵循 LLM360 的开源定义：完整开发史、每个训练阶段的中间检查点、预训练数据、训练日志、全部训练/评测/基础设施代码——包括 xLLM 训练框架与 RL360 强化学习栈。数据主张最大胆：约 **10 万亿合成预训练 token**，"说明合成数据可以成为规模化预训练的主要成分"；四个模型共享同一份 22T token 语料与配方。权重已在 Hugging Face 上线，含 GGUF。

**Why it matters:** 大多数"开源"发布只给权重和论文，这次把整条生产线都交了出来——检查点、数据、日志、管线，这才是可复现性真正需要的东西。10T 合成 token 的规模化数据点是多数实验室从不披露的，而四档尺寸共享同一配方也让受控的 scaling 研究成为可能。

[`🔗 arXiv:2611.21003 — K2-Horizon`](https://arxiv.org/abs/2611.21003) · [`🔗 Hugging Face 上的 IFM/K2-Horizon-MoVA-36B-A4B`](https://huggingface.co/IFM/K2-Horizon-MoVA-36B-A4B)

---

## 44. Daniel Stenberg 评 agent 用 Rust 重写 curl：三周把 18.5 万行 C 变成 34 万行 Rust——同一窗口里上游合并了 200 个 bugfix

- **Velocity:** ▮▮ rising
- **Source:** daniel.haxx.se · HN 18+ pts · 12h ago (~00:00 UTC+8)
- **Tags:** `curl` `rust` `ai-agents` `maintainers`

curl 之父 Daniel Stenberg 回应今秋两个由 agent 写成的 curl 重写版——数月前的 **urlx**，与 11 月的"curl, rewritten in Rust"（"命名上居然毫不避讳"，宣称花费约 8600 美元）。他给出的对照："在这些 agent 把 185,000 行 C 代码转换成 340,000 行 Rust 代码的同一时间（我数过），真正的 curl 项目合并了 300 多个提交……实际上有 200 多个 bugfix。这 200 个 bugfix，那些 Rust 重写版一个都没有。" 谈内存安全他给出具体数字："在 curl 2026 年迄今确认的 81 个漏洞中，14 个最可能源于若用 rust 这类内存安全语言本可避免的错误。这是 17.3%。也就是说 Rust 版 curl 仍会有其中 67 个漏洞。" 结论："我不相信任何语言的重写。我相信持续不断的打磨、迭代与重构。" 他还指出重写之所以可能，"是因为全世界的 AI 都拿 curl 代码训练过多年"——几十年的测试与文档本身就是规格。

**Why it matters:** 这是 agent 驱动重写旗舰级 C 项目这件事的第一份真正纵向数据：重写之所以可行，恰恰因为上游做了三十年的维护；而维护速度——每天约 11 个提交、同期 200 个修复——是任何基准都测不到的部分。这篇文章正好是上周《所有 AI 生成代码都应开源》一文的维护者视角回声。

[`🔗 daniel.haxx.se：Actual curl rewrites in rust`](https://daniel.haxx.se/blog/2026/11/17/actual-curl-rewrites-in-rust/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50525713) · [`🔗 Jakub T. Jankiewicz：All AI-generated code should be Open Source`](https://jakub.jankiewicz.org/blog/ai-code-open-source/)

---

## 45. Three.js 里的 AAA 光照工程：逐阶段审计 WebGPU 版 Three.js 现在能做与不能做什么

- **Velocity:** ▮▮ rising
- **Source:** ben3d.ca · HN 144+ pts · 15h ago (~05:00 UTC+8)
- **Tags:** `threejs` `webgpu` `graphics` `rendering`

Ben Houston 的五部曲系列（11 月 9 日发表，现于 HN 回热）以一句改变判断的话开篇："WebGPU 已在多数设备上运行，Three.js 也有了一个为它打造的新渲染器。两者合在一起，首次让网页里的室内场景能以 AAA 游戏的方式打光。" 第三篇是干货——把游戏级管线逐阶段（G-buffer、烘焙 GI、动态 GI、遮蔽、SSR/SSGI、反射探针、间接 BRDF、TRAA/TAAU 时域超分）对着 Three.js 做成三列审计表：**Three.js 已有**（MRT prepass、lightmap + radiosity 烘焙器、GTAO、提速 8 倍的 LightProbeGrid）、**评审或草稿中**（DDGI visibility、JPEG XL / KHR_lightmap 扩展）、**仍待建设**（octahedral normals、运行时 BC6H、接缝缝合）。每个阶段都写明游戏对它的要求，这张表同时就是浏览器级游戏光照的公开路线图。

**Why it matters:** 浏览器渲染这十年在"demo 集锦"和"只是三角形"之间来回摇摆；这篇两者都不是——它是对着一条具体 AAA 管线的实测差距分析，缺口被具名成 pull request。如果浏览器游戏真的要来，这就是它距离还有多远的诚实工程台账。

[`🔗 ben3d.ca：Building the AAA Lighting Pipeline in Three.js`](https://ben3d.ca/blog/building-the-aaa-lighting-pipeline-in-threejs) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50523291)

---

## 46. N-able N-central 一波落下 10 条 CVE 记录——MSP 的 RMM 平台上，9.3 分让任何人可冒充设备，9.2 分把更新元数据变成 RCE

- **Velocity:** ▮ steady
- **Source:** NVD（N-able CNA）· 11 月 17 日发布 10 条 CVSS 4.0 记录（UTC 凌晨）
- **Tags:** `cve` `msp` `rmm` `n-central`

N-able 自己的 CNA 对 N-central——MSP 用来管理客户机群的远程监控平台——一口气发布十条记录，全部已在 **2026.4.1 HF3** 修复，NVD 状态均为 `Received`。**CVE-2026-129272（9.3）**：N-central "使用可预测的凭据向 agent 侧 API 认证设备。知道或猜出设备标识的远程未认证攻击者，即可获得有效的设备 token 与会话并冒充该设备"。**CVE-2026-129286（9.2）**：软件更新元数据中的版本值与下载位置不校验——"能够提供或修改服务器所收更新元数据的攻击者，可在下载目录之外写文件并执行代码"。**CVE-2026-129280（9.3）**：多个 ServerUI/ServerUI2 SOAP 操作"不验证调用者的会话、权限或客户范围"，部分情况下无需认证。周围还有：伪造远程执行结果（8.7）、只读权限即可设置设备执行配置（8.5）、补丁管理引擎 LPE（8.5）、经审计导出的配置注入（8.6）、邮件选项注入（8.7）。

**Why it matters:** 这正是 FBI 的 Artex 通报（第 3 条）和今年 ConnectWise 一类事件反复指着的层级：MSP 的 RMM 是打开整个机群的万能钥匙，一个设备冒充漏洞就可能触及该设备管理的所有终端。如果你在运维 N-central，HF3 就是补丁清单；如果你是 MSP 的客户，这就是本周该问的问题。

[`🔗 CVE-2026-129272 记录`](https://www.cve.org/CVERecord?id=CVE-2026-129272) · [`🔗 CVE-2026-129286 记录`](https://www.cve.org/CVERecord?id=CVE-2026-129286)

---

## 47. GitLab 一波 37 条安全记录——两条 8.7 存储型 XSS——旁边还落下 Apache Roller 的 9.8 XML-RPC 反序列化 RCE

- **Velocity:** ▮ steady
- **Source:** NVD（GitLab CNA：37 条；Apache CNA：CVE-2026-129448）· 11 月 17 日发布
- **Tags:** `cve` `gitlab` `roller` `deserialization`

GitLab 自己的 CNA 今天在 NVD 放下 37 条记录，全部在 **19.3.9 / 19.4.8 / 19.5.6** 修复：压轴的是两条 **8.7 存储型 XSS**（CVE-2026-105739，17.2 起存在；CVE-2026-108153，16.1 起）"可能在特定条件下让认证用户在其他用户的浏览器中执行任意 JavaScript"；另有 8.2 项目访问问题、7.6 Kubernetes 密钥读取、6.2 EE 代码执行、4.3 Duo Workflow "提权"问题——外加几十条 2–6 分的信息泄露与权限类 bug，其中一条暴露"敏感凭据值"（CVE-2026-110990）。与此同时，Apache 的 CNA 落下 **CVE-2026-129448（9.8）**：**Apache Roller 4.0.0–6.1.4** 的不可信数据反序列化——"XML-RPC 端点接受厂商扩展类型，并在认证请求者之前就将其反序列化"——记录自己写明**"正被积极利用"**（与 CVE-2026-82384 为同一漏洞，早前记录仅列出 6.1.5）。修复版本为 **Roller 6.1.6 或更高**；记录给暂时无法升级者的缓解方案带着一句要紧的警告："仅在管理界面里禁用 XML-RPC 是不够的，因为旧版本会在检查该设置之前就先反序列化请求。"

**Why it matters:** 一夜之间两种形态：GitLab 这波多数是只有全面审计才会浮出水面的权限矩阵慢性腐烂——那些不起眼的 4.x 分数才是规模部署真正流血的地方；而 Roller 提醒我们：XML-RPC，互联网最老的 RPC 面，2026 年仍在认证之前反序列化。

[`🔗 CVE-2026-105739 记录`](https://www.cve.org/CVERecord?id=CVE-2026-105739) · [`🔗 CVE-2026-129448 记录`](https://www.cve.org/CVERecord?id=CVE-2026-129448)

---

## 48. Nimony.org 上线：Nim 3 的编译器——借用检查、显式可空性、不依赖 LLVM 与 GCC 的原生代码生成

- **Velocity:** ▮ steady
- **Source:** nimony.org · HN 83+ pts · 35h ago (~09:00 UTC+8, 11 月 16 日)
- **Tags:** `nim` `compilers` `languages` `memory-safety`

Nim 之父 Andreas Rumpf（Araq）为他的编译器重写项目安了新家："**Nimony 是 Nim 的新编译器，也是 Nim 3 语言的家：借用检查、显式可空性、和类型、受检泛型等等，增量与并行构建从一开始就有。**" 卖点横跨嵌入式到 Web：面向 x86_64、ARM64、ARM32、AVR 与 RISC-V 的原生代码生成，"独立于 LLVM 与 GCC"——用 `nimony n` 你甚至不需要 C 编译器；运行时"针对堆耗尽做了加固"，OOM"是你处理的一个条件，而不是一次崩溃"；同一份代码库可编译到 C、原生、JavaScript 与 WebAssembly。内存安全来自"优化过的自动引用计数与一种容易理解的借用检查变体"，并有可证的越界检查：在 `staticContracts` 特性下，"可证越界的索引是编译期错误"。四平台的每夜工具链每日构建。

**Why it matters:** Nimony 是多年 ORC 与借用检查研究落成可用编译器的地方——也是极少数代码生成完全不经过 LLVM 或 C 的生产语言之一。对嵌入式与 RISC-V 工作来说，C 工具链藏起来的未定义行为不再存在，这不是基准分数，而是功能本身。

[`🔗 Nimony — the road to Nim 3`](https://nimony.org/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50512779)

---

## 49. WINUDF 1.2：给 DOS 与 Windows 1.x 至 ME 的 DVD/蓝光文件系统驱动——四件套复古驱动之一

- **Velocity:** ▮ steady
- **Source:** github.com/ages2001/WINUDF · HN 97+ pts · 28h ago (~16:00 UTC+8, 11 月 16 日)
- **Tags:** `retro` `file-systems` `drivers` `windows`

**WINUDF 可读写 UDF 1.02 到 2.60**——DVD、蓝光光盘、包刻录 CD 与 UDF 格式化 U 盘所用的文件系统——运行在比该规范早十到二十年的操作系统上：`WINUDF.EXE` 为 DOS 与 Windows 1.0x–3.11 提供盘符，`WINUDF.VXD` 则是 Windows 95/98/ME 的文件系统驱动，支持长文件名。它是同一作者的四个 WINDRV 软件包之一，可单独使用也可组合：**WINDISK**（IDE、SATA AHCI 与 NVMe 硬盘、CD/DVD 驱动器、SD 读卡器、eMMC）、**WINUSB**（USB 主控与设备、PS/2、触控板——含 USB4/Thunderbolt）、**WINAUDIO**（HD Audio、AC'97、General MIDI、Sound Blaster 16 仿真）。HN 帖子里作者正在实时回答驱动层的问题。

**Why it matters:** 复古计算圈正在悄悄变成正经的系统工程——给 Win98 时代的机器装上现代 UDF 栈，意味着那个年代的正确硬件今天也能读新刻的光盘和 U 盘；而 VxD 之下的 NVMe 加 USB4 支持，是没人付钱却人人受益的那种工作。

[`🔗 ages2001/WINUDF`](https://github.com/ages2001/WINUDF) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50515182)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-17T12:28:51Z |
| Items | 49 |
| Sources tracked | 47 (Hacker News, GitHub Trending, NVD/CVE, vendor blogs, AP/CNN News, FAA, engineering blogs, research groups, Hugging Face) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[Previous day](2026-11-16.md) · [Raw .md](https://trending.md/zh/feed/2026-11-17.md) · [Archive](../archive/index.md)
