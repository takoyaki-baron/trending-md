---
date: 2026-11-13
updated: 2026-11-12T20:33:45Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 18
license: CC-BY-4.0
---

# trending.md — 2026-11-13

## 1. 黄仁勋辞任 Nvidia CEO——CFO Colette Kress 出任临时 CEO，开盘暴跌 13%

- **Velocity:** ▮▮▮ trending
- **Source:** CNBC live blog · 2,156+ pts on HN · 6.2h ago (~21:50 UTC+8)
- **Tags:** `nvidia` `industry` `leadership`

昨日 feed 报道了 WSJ 的罢免传闻:现在成真了。黄仁勋——他联合创立 Nvidia 已 33 年,并将其打造成 4 万亿美元市值的公司——于 **11 月 12 日**辞去总裁、CEO 及董事职务。此前一天 NYT 报道了他与 VP Kimberly Powell 的婚外情,数小时后 Reuters 又引述了第二段关系。董事会任命 **CFO Colette Kress 为临时 CEO**(同时保留 CFO 职务),并任命自 1993 年起就任董事的 **Harvey C. Jones** 为 Nvidia 史上第一位董事会主席。NVDA 开盘暴跌**超过 13%**,市值跌破 4 万亿美元,自上周五收盘以来已蒸发逾 7,400 亿美元;Q3 财报仍定于 **11 月 17 日**发布。董事会聘请 Wachtell Lipton 调查情报指控(黄仁勋聘请了 Paul Weiss),众议院外交事务主席 Brian Mast 表示黄仁勋"has agreed to come"在感恩节前作证。

**Why it matters:** 整个 AI 基建浪潮赖以融资的公司的 CEO 现在离场了,三天的报道在 24 小时内变成了辞职,接下来的日程表(11 月 17 日财报、国会作证)本身就是一场压力测试:检验 Nvidia 的势头究竟来自路线图还是来自这个人。Kress 同时执掌 CFO 与 CEO,是最值得关注的临时安排细节。

> "The Board has full confidence in Colette and the leadership team." — Nvidia 首位董事会主席 Harvey C. Jones

[`🔗 CNBC: Nvidia CEO Jensen Huang resigns — live updates`](https://www.cnbc.com/2026/11/12/nvidia-jensen-huang-ceo-live-updates.html) · [`🔗 Reuters live`](https://www.reuters.com/live/nvidia-live-board-meets-fate-ceo-jensen-huang-after-affair-reports-2026-11-12/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50467087)

---

## 2. Gemini 4 Hydrogen 发布——Google 面向 agentic 工作流的快速日常模型,并带来全新 xhigh 思考档位

- **Velocity:** ▮▮▮ trending
- **Source:** blog.google · 305+ pts on HN · 2.0h ago (~02:00 UTC+8)
- **Tags:** `gemini` `model-release` `agents`

Google 于 11 月 12 日发布 **Gemini 4 Hydrogen**,定位为与前沿兄弟 Carbon、Argon 并列的快速日常模型:100 万 token 上下文**统一计价**(输入 $1.50/M,输出 $7.50/M),四档思考级别(low/medium/high/全新 **xhigh**),覆盖 AI Studio、Gemini API、Antigravity、Gemini 应用与 Google Search。数据:**Artificial Analysis Intelligence Index** 在 high 档 51 分(xhigh 档 54 分,Argon 为 50),Terminal-Bench 4.1 得分 **57%** vs Gemini 3.8 Flash 的 18.2%,编造性陈述减少逾 5 倍;Antigravity 的 Orchestrator 模式在 Terminal-Bench 上达到接近 Carbon 的成功率,"少消耗 24% 的额度、快 19%"。安全表声称过度拒绝最多下降 81%、错位动作减少 12 倍,并在"逾 20 万次审计轮次"上达到 96.7% 的 agent 诚实率。

**Why it matters:** 发布措辞明确对冲——它"matches or outperforms some of the competing models in its class",且 2.5 倍速度与 token 节省数据来自合作伙伴"早期测试"——所以应把它读作一次强劲的 agentic 主力模型更新,而非前沿跃升。真正会被开发者感知的,是 100 万上下文的统一计价和 xhigh 档位。

> 发布公告将 Hydrogen 定位为 Google 面向 agentic 工作流的日常主力模型,与前沿兄弟 Carbon、Argon 并列。

[`🔗 Google: Introducing Gemini 4 Hydrogen`](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-hydrogen/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50471431)

---

## 3. 《为什么写出正确的软件很难》——一篇 2016 年的复杂度理论长文,十年后登顶 HN

- **Velocity:** ▮▮▮ trending
- **Source:** pron.github.io · 314+ pts on HN · 9.6h ago (~18:25 UTC+8)
- **Tags:** `correctness` `complexity` `formal-methods`

Ron Pressler 2016 年的文章(扩展版曾于 Curry On 2016 报告)重新翻红至 314 分:正确性之难并非因为缺工具,而是可计算性理论使然——有界停机是 Θ(n)("you can't know what a program will do faster that running it" [sic]),一般性验证是计算机科学中最难的问题,而限制也无济于事(全语言仍是 Ω(|S|),符号模型检测仍是 PSPACE-complete,2005 年的参数化复杂度结果证明"correctness doesn't decompose")。文章的锚点令人难忘:一台 1,919 状态的图灵机,其停机性独立于 ZFC(约 100–200 行 Python);一个 10 行的全程序,当且仅当哥德巴赫猜想为假时崩溃;以及 2014 年多伦多的研究——92% 的灾难性分布式系统故障源于对非致命错误的处理不当。

**Why it matters:** 这篇文章在 2026 年读起来与 2016 年不同:它是"把写作交给 agent"并不能移除那堵墙的理论依据——验证成本不会因为代码作者换了就消失。它的结论依然正确:没有普适的数学解法,只有对人类(以及现在的 agent)实际产出的程序和 bug 的经验研究。

> "There does not exist a generally useful programming language where every program is feasibly verifiable."

[`🔗 pron.github.io: Why Writing Correct Software Is Hard`](https://pron.github.io/posts/correctness-and-complexity) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50465352)

---

## 4. Rust 1.100.0:`!`(never type)与自定义分配器转正——第 100 个 minor 版本

- **Velocity:** ▮▮ rising
- **Source:** rust-lang/rust · 285+ pts on HN · 1.7h ago (~02:20 UTC+8)
- **Tags:** `rust` `release` `language-design`

Rust 的整数版本(11 月 12 日,自 1.99 以来 5,340 个提交)转正了两个旷日持久的设计战役:**never type `!`**(`Infallible` 变成 `!` 的类型别名)与 **`extern "custom"`**;库方面,**自定义分配器落地**——`std::alloc::Allocator`、`Global`、`System`,以及 `Box::new_in`、`Vec::new_in`、`Vec::allocator` 和 `Box::map`/`Arc::map`/`Rc::map`。Cargo 获得了自己的 lint 表(`[lints.cargo]`,如 `cargo::unused_dependencies`)和**依赖冷却期**(dependency cooldowns)——按 RFC 3923 设置最低发布年龄,是供应链防护的正式化。平台方面:`wasm32-wasip3` 升为 Tier 2,新增 Tier 3 `powerpc64-sony-ps3` 目标,`i686-pc-windows-gnu` 降为无宿主工具的 Tier 2,标准库升级至 Unicode 18。

**Why it matters:** `!` 与 `Allocator` API 曾是波及整个生态的设计约束——它们的稳定化消除了十年来的 `#[feature]` 变通,让稳定版 Rust 拥有分配器泛型容器。cargo 冷却期 lint 也是个安静信号:包龄检查正在成为一等供应链工具,而非 CI 补丁。

[`🔗 Rust 1.100.0 release notes`](https://github.com/rust-lang/rust/releases/tag/1.100.0) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50471793)

---

## 5. Microsoft 365 大面积故障:Outlook、Teams、SharePoint、Copilot 一起挂——连状态页都挂了

- **Velocity:** ▮▮ rising
- **Source:** mailservices.isc.upenn.edu(MS 事件摘录)· 262+ pts on HN (Ask) · 1.8h ago (~02:15 UTC+8)
- **Tags:** `outage` `microsoft-365` `exchange-online`

11 月 12 日,一波进行中的事故席卷 Microsoft 365:**EX1550543**(Exchange Online 邮箱经 Outlook 网页版、MAPI、EAS、REST 的连接)于 **16:17 UTC** 开单,**MO1550821** 随后在 **18:26 UTC** 跟上——"Users may be unable to connect to multiple Microsoft 365 services",潜在影响 Exchange Online、Teams、SharePoint、**Copilot 365 与 Defender XDR**。微软的更新将失败的健康检查归于"a specific component on the affected servers",伴随"elevated processor usage while handling requests";在负载因"a large number of servers being unexpectedly unavailable"而上升后,它"paused all deployments and configuration changes"。HN 的 Ask 帖(262 分)和另一条首页帖指出服务健康仪表盘本身也在抽风;发稿时事件仍为 `serviceDegradation`。

**Why it matters:** 影响面(邮件 + 会议 + 文档 + Copilot + XDR 同时)与故障模式(部分服务器健康检查失败、部署全暂停)读起来像上周 GitHub 事故的同类——而一次连状态页都拖下水的降级,意味着用户被告知信任的唯一渠道自己失效了。

[`🔗 UPenn: Microsoft incident extract (EX1550543, MO1550821)`](https://mailservices.isc.upenn.edu/computing/email/penno365/alerts/ms-incidents.html) · [`🔗 CRN: Outage hits Outlook, Defender, Purview`](https://www.crn.com/news/cloud/2026/microsoft-outage-hits-outlook-defender-purview-day-after-teams-issues) · [`🔗 HN Ask: Microsoft/Azure outage?`](https://news.ycombinator.com/item?id=50471668)

---

## 6. Apple 把 MIPS 变成可学习的支撑函数——RAG 检索在 99% 召回下最高快 8 倍

- **Velocity:** ▮▮ rising
- **Source:** machinelearning.apple.com · 229+ pts on HN · 27.1h ago (~00:55 UTC+8 Nov 12)
- **Tags:** `rag` `retrieval` `research`

Apple 的 ML 研究文章(11 月 5 日,ICML 2026 论文 "Amortizing Maximum Inner Product Search with Learned Support Functions")做了一个数学上干净利落的观察:向量数据库检索的核心运算——最大内积搜索(MIPS)——是一个凸**支撑函数**,所以可以用一个小神经网络直接预测它。由此得到两种架构:**SupportNet**,一个按"簇内最优可达匹配"而非质心距离打分的路由器;**KeyNet**,一个查询改写器,直接预测最优匹配的 key 向量,把标准 FAISS IVF 索引导向它。在 Natural Questions(约 260 万段落)上,KeyNet 在 **99% 召回**下最高快 **8 倍**(0.23 ms vs 1.8 ms),或扫描的 key 减少约 11 倍;SupportNet 以约 1.9 倍速度达到 95% 路由召回。

**Why it matters:** 这是在"暴力扫描"与"近似索引"之外的第三条路——把检索摊销进一个用你自己的查询分布训练出的可学习函数。代价写在前提里:网络要按数据库、按查询分布分别训练,所以它适合 RAG 依赖的那种庞大稳定语料,在语料频繁变动时退化。文章未提及代码发布。

[`🔗 Apple ML: Faster Retrieval for Better, More Efficient RAG`](https://machinelearning.apple.com/research/faster-retrieval) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50455633)

---

## 7. 任天堂 DMCA 风暴:四份 11 月 6 日通知清除 Switch 模拟器 fork 与破解芯片固件——报道浪潮这才到来

- **Velocity:** ▮▮ rising
- **Source:** github/dmca · 180+ pts on HN · 3.6h ago (~00:25 UTC+8)
- **Tags:** `dmca` `nintendo` `emulation`

四份落款 **11 月 6 日**的任天堂下架通知(`2026-11-06-nintendo.md` 至 `-4.md`)进入 github/dmca,HN 的讨论浪潮在 11 月 12 日爆发。通知援引的是**反规避**而非普通复制:任天堂将 Switch 的 TPM 描述为"the encryption of video game files using certain proprietary cryptographic keys, such as those referred to as prod.keys",并主张**整个仓库**侵权——包括 yuzu fork `IpwnedU/yuzu-android-master` 与 Picofly 破解芯片固件(`Ansem-SoD/Picofly`),后者是硬件 mod 的固件,并非模拟器。每份通知均注明 GitHub 标准的下架前流程(联系仓库所有者、反通知窗口)。

**Why it matters:** 破解芯片固件被下架,把 yuzu/Ryujinx 的先例从模拟器*代码*扩展到了其外围的*硬件 mod 生态*——一种触及一切与 `prod.keys` 相关之物的更宽反规避解读。反通知窗口值得盯紧:整仓主张是最可逆的一类下架,被删代码的 fork 通常几天内就会重新出现。

[`🔗 github/dmca: 2026-11-06-nintendo.md`](https://github.com/github/dmca/blob/master/2026/11/2026-11-06-nintendo.md) · [`🔗 github/dmca: 2026-11-06-nintendo-2.md (Picofly)`](https://github.com/github/dmca/blob/master/2026/11/2026-11-06-nintendo-2.md) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50469994)

---

## 8. openQ4 0.14.1 发布 Raven 与 Ritual 从未发售的 Quake 4 资料片——在移植版自己的引擎上重建

- **Velocity:** ▮▮ rising
- **Source:** themuffinator/openQ4 · 197+ pts on HN · 5.8h ago (~22:15 UTC+8)
- **Tags:** `quake4` `game-port` `open-source`

开源 Quake 4 移植版 openQ4 于 11 月 11 日发布 **v0.14.1**——自称"自 0.13.2 以来最大的更新",并取代一个**被撤回的 0.14.0**。主角是 **The Awakening**:Raven Software 与 Ritual Entertainment 从未发售、由 Justin Marshall 找回的资料片——"All 13 maps run on openQ4's own engine and game code",怪物、武器与载具全部重建,因此"never loads the alpha's game DLL"(资料片文件需自备)。同一版本还带来 OpenGL 与 Vulkan 上稳定且缓存的阴影贴图、带 Remastered HUD 的全新界面、Vulkan 成为 Windows 默认渲染器、实验性的签名 ARM64 **Android** APK、多人模式的 bot 与语音聊天,以及实验性的 VR 和关卡编辑器。

**Why it matters:** 这是上周 Black Ops II 移植同一波"静态重编译 modding"的延续,但有一个值得借鉴的转折:openQ4 没有打包失落的 alpha 二进制,而是在自己的引擎上重写资料片内容——一种完全绕开法律与兼容灰色地带的保存策略。发布说明对 0.14.0 撤回的坦白,也比应有的更罕见。

> "Play the recovered Quake 4 expansion beside the original campaign from Single Player → Campaign." —— openQ4 0.14.1 发布说明

[`🔗 openQ4 v0.14.1 release notes`](https://github.com/themuffinator/openQ4/releases/tag/v0.14.1) · [`🔗 themuffinator/openQ4`](https://github.com/themuffinator/openQ4) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50467618)

---

## 9. smolmaxxing:1.9 GB 内存的安卓电视盒子跑出 16B MoE、5.1 tok/s——每条结论都在硬件上实测

- **Velocity:** ▮▮ rising
- **Source:** hyperionaidev/smolmaxxing · 172+ pts on HN · 4.7h ago (~23:20 UTC+8)
- **Tags:** `edge-ai` `quantization` `llm-inference`

"I'm making LLMs work on small and old devices" 是一份带排行榜的研究日志:一号设备是小米电视盒子(4× Cortex-A55,**1.9 GB 内存**,无 root),Qwen3.5-0.8B 从原版 7.5 tok/s 提到 **16.8**;Qwen3.5-2B 在真实对话中 **7.7 tok/s**(bits/byte 0.909);再借助 Q2_K 专家从 flash 分页、缓存感知路由与预取,一台 **16B MoE(Ling-mini-2.0)跑到 5.1 tok/s**,600 词回答保持连贯。二号设备是越狱的 2013 款 iPad Air(Apple A7,1 GB),在 Safari 里以 **24–26 tok/s** 跑 1.7B 模型。技术按瓶颈分组:面向基础 NEON 芯片的 1-bit LUT kernel、塞进 2-bit 字段的 ternary 权重、带 MTP 投机的 O_DIRECT 权重流式加载,以及把 expert miss 从 13% 压到约 2% 的专家分页器。全部以实验 E1–E160 记录,附带退化测试(退化长回答从 12/13 降到 1/13),并用 bits/byte 度量质量以便不同 tokenizer 公平比较。

**Why it matters:** 大多数小设备跑 LLM 的帖子会挑好看的基准;这一份公布了自己的失败(稠密 9B 只有 0.27 tok/s)和诚实的跨模型质量指标,而"bigger only helps on this box when the model is also better"(更大只在这个盒子上、当模型本身也更好时才有帮助)这一发现,才是全球真实持有的 30 美元设备舰队上的最先进水平。

> "Every claim is measured on the hardware itself." —— smolmaxxing README

[`🔗 hyperionaidev/smolmaxxing`](https://github.com/hyperionaidev/smolmaxxing) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50468888)

---

## 10. PostgreSQL 十一月浪潮:一次修复 52 个 CVE(18.7/17.12/16.16/15.20/14.25)——PostgreSQL 14 同时 EOL

- **Velocity:** ▮▮ rising
- **Source:** postgresql.org · 87+ pts on HN · 5.6h ago (~22:25 UTC+8)
- **Tags:** `postgresql` `security` `cve-wave`

PostgreSQL 的季度更新(11 月 12 日)在所有受支持分支上修复 **52 个安全漏洞与超过 140 个 bug**,而且分量十足:数十个因 type confusion 与 use-after-free 缺陷、可让攻击者执行任意代码而定级 **8.8** 的修复,包括 `dblink` 重入断连 UAF(**CVE-2026-120147**,对象创建者可以数据库 OS 用户身份执行代码)、逻辑复制写订阅端系统目录(**CVE-2026-120145**)、`pg_restore` 从未校验归档执行代码(**CVE-2026-116314**)、经约束名的 `pg_dump` SQL 注入(**CVE-2026-116318**)。这次更新同时是 **PostgreSQL 14 的最后一次更新**——该分支就此 EOL——并且附带作业:重建可能损坏的 GIN 与 `pg_trgm` GiST 索引、使用增量备份的用户重做一次全量备份、检查分区表上非法的 `NOT NULL NO INHERIT` 约束。PostgreSQL 19 RC 2 已带上同样的修复,GA 目标 11 月 19 日。

**Why it matters:** 一次累积更新修 52 个 CVE——多数由项目自己的 CNA 定为 8.8——是一次异常大规模的攻击面修正,其中好几处(pg_restore、pg_dump、vacuumdb)位于运维日常执行的 admin 工具链里。同一口气里 PostgreSQL 14 的 EOL,让这次升级成为本季度的必做项。

[`🔗 PostgreSQL 18.7, 17.12, 16.16, 15.20, 14.25 and 19 RC 2 released`](https://www.postgresql.org/about/news/postgresql-187-1712-1616-1520-1425-and-19-rc-2-released-3442/) · [`🔗 PostgreSQL CVE-2026-120147 (dblink UAF)`](https://www.postgresql.org/support/security/CVE-2026-120147/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50467763)

---

## 11. Synology 一口气发布 27 个 DSM CVE——9.8 的 Auth API 未认证 SQLi 居首

- **Velocity:** ▮▮ rising
- **Source:** Synology advisories · NVD wave published Nov 12 (~4.8h ago)
- **Tags:** `synology` `nas` `security`

Synology 的 **SA-26:19** 收录了最重的两个:**CVE-2026-76954(CVSS 9.8)**,DSM Auth API 的 SQL 注入,可让"remote attackers … read or write arbitrary files and conduct denial-of-service attacks";以及 **CVE-2026-85101(8.6)**,rsync 的认证绕过。**SA-26:18** 再加 25 个——8 个 Important,含三个 8.8(SSOAuth 经用户可控 key 的授权绕过 **CVE-2026-13672**、Sharing API 路径穿越 **CVE-2026-18792**、Auth API 缺失认证步骤 **CVE-2026-74857**)与 17 个 Moderate——合计 **27 个 CVE**,与 NVD 在 11 月 12 日发布的 27 条 `security@synology.com` 记录完全对应。两份公告均标记 Resolved,一行修复覆盖所有分支:DSM **7.4.1-90080-1**、**7.3.2-86009-5**、**7.2.2-72806-10** 或 **7.2.1-69057-13**,且未列出任何临时缓解。

**Why it matters:** NAS 是家庭和小型办公室面向互联网的备份端点,认证路径上一个未认证的 9.8 正是勒索团伙扫描的形态。公告 11 月 10 日发布,NVD 记录 11 月 12 日才落地——如果你靠 CVE feed 打补丁,你比厂商晚了两天。今天就检查你的 DSM 更新通道。

[`🔗 Synology-SA-26:19`](https://www.synology.com/en-global/security/advisory/Synology_SA_26_19) · [`🔗 Synology-SA-26:18`](https://www.synology.com/en-global/security/advisory/Synology_SA_26_18) · [`🔗 NVD: CVE-2026-76954`](https://nvd.nist.gov/vuln/detail/CVE-2026-76954)

---

## 12. 与 Mike Clark 谈 Zen 6:Zen 6c 升级为旗舰,整数乘法器砍到两个

- **Velocity:** ▮ rising
- **Source:** chipsandcheese.com · 144+ pts on HN · 5.9h ago (~22:10 UTC+8)
- **Tags:** `amd` `zen6` `cpu-architecture`

Chips and Cheese 的 George Cozma 采访了 AMD 初代 Zen 架构师 Mike Clark(33 年核心设计生涯),谈及 Zen 6/Venice,细节都是结构性的:**Zen 6c 从面积优化变体升格为旗舰**——32 核、完整 128 MB L3、全家族最高 IPC——经典 Zen 6 则转为高频型号,Clark 强调"we don't want to create a delta between the two architectures that software has to be optimized for"。执行端的变化跟随调度器回归分布式布局(我们 11-11 报道的 Zen 6 调度器分析即为此事):**整数乘法器从三个减到两个**、**向量加载翻倍到四个**、两个 VNNI 单元在平面布局早已定案后的项目后期挤了进去,用于编排级 AI("It's not going to beat a GPU, and that's not the point"),分支误预测恢复更便宜——Clark 承认用了 AI 辅助调优 TAGE 分支预测器表,并称团队对 redirect 速度"monomaniacally focused"。

**Why it matters:** Zen 6c 的升格颠覆了最近三代的定位——密度不再是廉价选项——而采访者实测的 SPECint 2026 结果(Zen 6c 在频率劣势下追平 AMD 最快的 Zen 5 服务器芯片)是第一个可度量的跨代检查点。

[`🔗 Chips and Cheese: Talking Zen 6 with Mike Clark`](https://chipsandcheese.com/p/talking-zen-6-with-mike-clark-at) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50467460)

---

## 13. Pharo World:完整的 Pharo Smalltalk 镜像经 WebAssembly 跑在浏览器标签页里

- **Velocity:** ▮ rising
- **Source:** massimo-nocentini.github.io · 131+ pts on HN · 29.7h ago (~22:20 UTC+8 Nov 11)
- **Tags:** `smalltalk` `webassembly` `live-programming`

Massimo Nocentini 的 Pharo World 把真正的 Pharo 镜像(`.image` + `.changes` + `.sources`)加载进页面里经 WebAssembly 编译的 VM,带可用的镜像内 REPL、拖入 `.st` 文件或整套镜像的能力,以及——最有趣的部分——通过可配置的 **Git HTTP 代理**在浏览器内执行 Iceberg/Metacello 的 Git 操作,因为直接克隆只对"让这个页面通过 CORS"的主机可行。代价写得很直白:代理"sees the code and any credentials that pass through it",所以请用自己可信的。

**Why it matters:** Smalltalk 是最初live编程环境,而 WASM 版 Pharo 让整套镜像式工作流(万物可检视、运行中改一切)变成一个可分享的 URL——这是讲授 Squeak/Pharo 系理念的免安装演示格式。CORS 代理的凭据警告,是每个浏览器内 IDE 都会撞上的平台边界。

[`🔗 Pharo World`](https://massimo-nocentini.github.io/pharo-vm/world.html) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50453763)

---

## 14. Jane Street 面试改革:现场面试加入"审阅并指挥 LLM 写的代码"的轮次

- **Velocity:** ▮ rising
- **Source:** blog.janestreet.com · 119+ pts on HN · 6.0h ago (~22:00 UTC+8)
- **Tags:** `hiring` `interviews` `ai-assisted-coding`

Jane Street(Matthew Saffer 执笔,11 月 2 日——11 月 12 日在 HN 翻红)称今年夏天开始为校园候选人试用新的 onsite 形式:"less code-writing",更多软件设计、检验"the quality, structure, and intention of code",以及**使用 LLM 产出代码**。大多数轮次仍是无 LLM 的传统编程面试;候选人会提前被告知会遇到哪种形式。安抚的话很说明问题:"You shouldn't feel like you need to have a highly worked out methodology for working with agents",以及"What we care about is that you think clearly about the tools you use."

**Why it matters:** 这是最强的信号:精英机构的招聘权重正在从"敲出代码"转向"规定并审查代码"——而且来自那家 OCaml 门槛长期定义"真的会编程"的公司。如果代码生成持续变便宜,被考察的技能就变成抓住模型错在哪里,这正是这些试验轮次考的东西。

[`🔗 Jane Street: Our software engineering interviews are changing a little`](https://blog.janestreet.com/software-engineering-interviews-are-changing-a-little/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50467297)

---

## 15. ZigZag:把 SVG 变成针脚的 Rust 刺绣编辑器——还能让 agent 经 MCP 驱动它

- **Velocity:** ▮ steady
- **Source:** simpsoka/zigzag · 91+ pts on HN (Show) · 3.0h ago (~01:00 UTC+8)
- **Tags:** `rust` `mcp` `hardware`

"我的 300 美元刺绣机要订阅,所以我自己写了个应用":ZigZag 是开源(Rust)的可视化刺绣编辑器,导入 SVG("fill and stroke parts, transforms, text"),生成 tatami 填充 / 缎面列 / 跑线,导出 **PES、DST、EXP、JEF 或 VP3**——或经蓝牙直发 **Brother Skitch (PP1)**。agent 角度是原生的:内置 **MCP 支持**,编码 agent 可与你并肩创建和编辑图案,同一引擎还有 `zigzag` CLI。Mac 版已签名公证;Windows 提供 zip 及常规 SmartScreen 提示。

**Why it matters:** "订阅锁死的设备"反叛正在成为一个品类(right-to-repair 遇上 Show HN),ZigZag 是个强样本:用文件格式覆盖面替换厂商锁定,外加一个 MCP 界面——上周 Klad 在绘画上展示过的 agent 控制物理制造工具的模板。

[`🔗 simpsoka/zigzag`](https://github.com/simpsoka/zigzag) · [`🔗 HN discussion (Show)`](https://news.ycombinator.com/item?id=50470488)

---

## 16. LibreAGI:一个以"让开源权重模型不可被杀死"为宗旨的私密 BitTorrent tracker

- **Velocity:** ▮ steady
- **Source:** libreagi.com · 91+ pts on HN · 5.9h ago (~22:10 UTC+8)
- **Tags:** `open-weights` `preservation` `bittorrent`

LibreAGI("Open models should outlive the places that host them")是一个仅供成员的私密 tracker,用于归档 safetensors/GGUF/ONNX 格式的开源权重模型,仅收 Apache-2.0、MIT 与 Qwen 社区许可证。其经济设计面向稀缺性:"Credit grows with size and time, and a model with one copy earns four times the base rate";每个文件"is checked against its source commit",每款模型经员工审核,还有一份"every model, hash and source"的**签名公开目录**,以便"anyone can rebuild the swarms if this site goes away"。一个无需账户的公共 IRC 频道对外开放。

**Why it matters:** 模型下架与悄无声息的删库是开源权重真实存在的失效模式,经哈希验证、带签名目录的 torrent swarm 是正确的存档形态——比起 Hugging Face,它更接近 Linux ISO 镜像。盲点由网站自己披露:运营者匿名、会员邀请制,其持久性主张完全押在那份签名目录上。

[`🔗 libreagi.com`](https://libreagi.com/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50467439)

---

## 17. free-claude-code:6.9 万星的路由器,把 12 个编码 agent harness 接到 61 家 provider——"1.3B+ free tokens"

- **Velocity:** ▮ steady
- **Source:** Alishahryar1/free-claude-code · 69,145★, +461 today on GitHub Trending
- **Tags:** `claude-code` `llm-routing` `agent-infra`

本周 GitHub 每日趋势榜的常客是 **free-claude-code**(AGPL,Python 3.14,PyPI 上为 `free-claude-code` 6.19.11——"Local proxy connecting coding agents to OpenAI-compatible AI providers"):一个代理,把 **12 个受支持的 harness**(Claude Code、Codex、Pi、OpenCode、Cline、Aider、Antigravity CLI、VS Code Chat 等)路由到 **61 家 provider**,号称在各家免费额度间拿到"1.3B+ free tokens per month",带自动模型/provider/API-key 回退、限流,以及集成 RTK/Headroom 实现"最高降 90% token 用量"。它对 ToS 问题的立场写得明白:"FCC follows provider TOS and removes integrations if they stop being allowed."

**Why it matters:** 无论你是否使用它,这个设计都是 agent 基建正在成型的样子:harness 可互换、模型可互换,价值落在路由/回退层——这解释了为何一个自己没有模型的代理,热度超过大多数模型发布。要盯的依赖是"free"这个词:每个宣称的 token 池都是某家 provider 的推广,可能随时无预警结束。

[`🔗 Alishahryar1/free-claude-code`](https://github.com/Alishahryar1/free-claude-code) · [`🔗 free-claude-code on PyPI`](https://pypi.org/project/free-claude-code/)

---

## 18. ManageEngine 自家 CNA 发布 9.9 与 8.8 PowerShell 注入组合,横跨其管理套件

- **Velocity:** ▮ steady
- **Source:** NVD records (CNA: Zohocorp) · published Nov 12 (~4.8h ago)
- **Tags:** `manageengine` `enterprise` `security`

Zohocorp 的 CNA 于 11 月 12 日发布一批 ManageEngine 修复,领衔的是 **CVE-2026-12591(CVSS 9.9)**——M365 Manager Plus 低于 build 4818,一个经认证技术人员的漏洞;以及 **DDI Central 低于 6301** 的一簇:认证绕过(**CVE-2026-19422**,9.1)、PowerShell 注入(**CVE-2026-19421**,8.8)、以及授权绕过 + PowerShell 注入的合体(**CVE-2026-75869**,8.8)。这波还覆盖共享平台的 **CVE-2026-12507(9.1)**,波及 ServiceDesk Plus 低于 15290、AssetExplorer 低于 7860 及同系构建。每个分数都是厂商 CNA 自己给的(截至写作时 NVD 尚未分析,所有记录均为 `Awaiting Analysis`)。

**Why it matters:** ManageEngine 套件是数千家中型企业的 IT 管理骨干,而它的历史里包括被主动利用的链(2022 年的 ManageEngine ADSelfService Plus 条目在 KEV 上挂了多年)。一个*经认证技术人员*可触达的 9.9 意味着:一个被攻陷的客服账号就是全公司事件——本周内把 build 4818/6301/15290 打上。

[`🔗 NVD: CVE-2026-12591`](https://nvd.nist.gov/vuln/detail/CVE-2026-12591) · [`🔗 NVD: CVE-2026-19422`](https://nvd.nist.gov/vuln/detail/CVE-2026-19422)

---

## 19. Apple 的 Attention-to-Mamba 配方:把 Transformer 蒸馏成纯 SSM——困惑度 14.01 vs 教师模型 13.86

- **Velocity:** ▮ steady
- **Source:** machinelearning.apple.com · 75+ pts on HN · 30.6h ago (~21:30 UTC+8 Nov 11)
- **Tags:** `distillation` `ssm` `mamba`

Apple 的研究页(TMLR,2026 年 11 月;arXiv 2604.14191)发布了一个两阶段配方,把 Attention 教师转换为**完全不含 attention 块的 Mamba 学生**:先用 kernel-trick 改造把 Transformer 蒸馏成线性化 Attention 变体,再用"principled initialization"把它蒸馏进 Mamba。在 1B 规模(Pythia-1B 教师,100 亿蒸馏 token)下,学生达到困惑度 **14.01**,教师的为 **13.86**,收益大体迁移到下游任务——尽管"some gaps appear on tasks relying more on in-context recall"。arXiv v2(11 月 3 日)与配方本身同样重要:v2"fixes an implementation error in v1 that affected the SSM decay gates",并在 Mamba-2 上重跑了全部实验。

**Why it matters:** 已知朴素的 Transformer→SSM 蒸馏离不开混合架构才会失败;一个可复现、能把损失压到教师 1.1% 以内的两阶段配方,改变了边缘部署的转换账——在那里 Mamba 的线性时间推理正是全部意义。v2 勘误是要随身携带的诚实注脚:v1 的数字带着 decay-gate bug 流传了数月。

[`🔗 Apple ML: Attention to Mamba`](https://machinelearning.apple.com/research/attention-mamba-distillation) · [`🔗 arXiv:2604.14191`](https://arxiv.org/abs/2604.14191)

---

## 20. ExcalidrawZ 重新翻红:纯 SwiftUI 原生 Mac/iOS Excalidraw,文件存本地

- **Velocity:** ▮ steady
- **Source:** chocoford/ExcalidrawZ · 76+ pts on HN · 4.6h ago (~23:25 UTC+8)
- **Tags:** `excalidraw` `macos` `diagramming`

一篇四天前的 HN 帖把 chocoford/ExcalidrawZ(1,718★,纯 SwiftUI,创建于 2022 年 12 月)重新送上首页:一个 macOS/iOS 原生 Excalidraw 应用,保留熟悉的画布,同时把图表存为**本地文件**而非浏览器 localStorage——绕开了这套生态常见的多文件同步与版本化怪癖。仓库最后一次推送是 10 月 24 日,所以这是一次翻红,而非发布事件。

**Why it matters:** Excalidraw 的浏览器优先模式人见人爱,也有极限:图稿活在标签页里,不在你的文件树里。原生封装站在 Web 应用与完整重写之间的中间地带,HN 帖子才是真正有用的产物——一份"图表工具要如何才有原生感"的可用清单(文件 provider、快捷键、iCloud 同步),且不必 fork 格式。

[`🔗 chocoford/ExcalidrawZ`](https://github.com/chocoford/ExcalidrawZ) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50468944)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-12T20:33:45Z |
| Items | 20 |
| Sources tracked | 18 (Hacker News, GitHub Trending, NVD, vendor advisories, vendor blogs, research pages) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[Previous day](2026-11-12.md) · [Raw .md](latest.md) · [Archive](../archive/index.md)
