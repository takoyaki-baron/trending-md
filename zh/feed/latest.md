---
date: 2026-11-17
updated: 2026-11-16T20:29:19Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 23
license: CC-BY-4.0
---

# trending.md — 2026-11-17

## 1. 美国五大银行同时故障——BofA、Chase、U.S. Bank、Wells Fargo、Zelle 集体被报宕机，微软宕机周尚未走远

- **Velocity:** ▮▮▮ trending
- **Source:** apnews.com · 289+ pts on HN · 1.5h ago (~02:31 UTC+8)
- **Tags:** `outage` `banking` `zelle` `reliability`

周一晚间，美国五家大型金融机构的用户同时报告无法访问网上账户：**Bank of America、Chase、U.S. Bank、Wells Fargo 和 Zelle** 齐齐出现在 Downdetector 的故障榜上。Chase 最先给出定性——发言人称银行遇到的是"a technical bug issue, not a cyber issue"（技术缺陷问题，而非网络攻击），并表示："Due to a technical issue, some transactions are taking longer than usual to complete but customers still have access to their accounts and funds."（由于技术问题，部分交易完成时间比平时长，但客户仍可访问其账户与资金。）美联社的报道明确把这一时刻放进本周的语境：它紧随周五开始、拖垮 Outlook、Teams 和 Copilot 数小时的微软大宕机。目前尚无银行发布根因报告，而支付通道 Zelle 也在被报故障的服务之列——这是影响面最广的一个细节。

**Why it matters:** 四天之内、两个行业、两波系统性故障——这是本刊读者应当内化的模式：集中度本身就是脆弱性，2026 年的事故节奏（微软、FAA 禁飞令、现在轮到银行）正在把韧性工程从冷门话题变成采购决策。值得盯的是各行的复盘会不会指向同一家供应商——五家同时倒下，否则就是惊人的巧合。

[`🔗 AP News: Customers at major banks report difficulty accessing accounts online`](https://apnews.com/article/bank-outage-chase-wells-fargo-truist-50fee2693c22f597fa6ca51a97ef2cda) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50521045)

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

## 7. VulnCheck 一天落地 75 条 CVE 记录——认证绕过浪潮横扫 npm 时代的 CMS 框架，而多数连可升级的修复版都没有

- **Velocity:** ▮▮ rising
- **Source:** NVD (disclosure@vulncheck.com CNA) · 75 records published Nov 16 (~12:17–15:17 UTC)
- **Tags:** `cve` `auth-bypass` `npm` `vulncheck`

NVD 11 月 16 日的批次里有 **75 条来自 VulnCheck CNA 的 CVE 记录**——当日最大的单一来源浪潮，远超三星的 39 条和 GitHub 的 30 条。头条是自托管 Web 框架中的认证绕过集群：**Tensei ≤ 0.11.5** 在 `JWT_SECRET` 未设置时回退到硬编码 JWT 签名密钥 `auth-secret-key`（9.8）；**NodePress ≤ 8.5.1** 带两个独立的 9.8 认证绕过；**Prime CMS ≤ 0.4.0-beta.0** 的 `isAuthenticated()` 守卫被注释掉、`createAbility()` 把所有角色硬编码为 admin（9.8）。围绕它们：Kalmia、REBUILD（4 条）、DeepAudit（5 条）、thirdweb Dashboard、Contentlayer 8.8 代码注入，外加 SeaweedFS、LimeSurvey、wallabag、GitBucket、PrestaShop、Sandboxie-Plus 和 Axigen。每个分数都是 VulnCheck 自己打的（CVSS 3.1，`Secondary` 来源）。操作层面的关键在于：其中几个的受影响上限*就是*最新版本——Prime CMS 自 2023 年 1 月起就没有提交，Tensei 最后一次推送是 2026 年 2 月——根本没有修复版可升级。

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

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-16T20:29:19Z |
| Items | 20 |
| Sources tracked | 23 (Hacker News, GitHub Trending, NVD/CVE, vendor blogs, AP/ABC News, FAA, engineering blogs) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[Previous day](2026-11-16.md) · [Raw .md](https://trending.md/zh/feed/2026-11-17.md) · [Archive](../archive/index.md)
