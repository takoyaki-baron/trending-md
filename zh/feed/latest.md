---
date: 2026-11-13
updated: 2026-11-13T12:28:15Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 29
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

**Why it matters:** 大多数小设备跑 LLM 的帖子会挑好看的基准;这一份公布了自己的失败(稠密 9B 只有 0.27 tok/s)和诚实的跨模型质量指标,而更大只在这个盒子上、当模型本身也更好时才有帮助(bigger only helps on this box when the model is also better)这一发现,才是全球真实持有的 30 美元设备舰队上的最先进水平。

> "Every number in this repo was measured on the device itself." —— smolmaxxing README

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

## 21. 六个中国前沿模型携带受出口管制的 Blackwell GPU 初始化指纹——直接从公开权重中恢复

- **Velocity:** ▮▮▮ trending
- **Source:** unemploymentlabs.com · 212+ pts on HN · 6.1h ago (~05:55 UTC+8)
- **Tags:** `checkpoint-forensics` `export-controls` `deepseek`

Will DePue 的取证报告(11 月 12 日)从模型初始化时烧录的 PRNG 种子与线程布局中,读出每次训练是由哪一代 GPU 启动的:**DeepSeek-V4-Flash 与 MiniMax-M3 匹配 148-SM 的 B200/B300 布局;DeepSeek-V4-Pro、Kimi K3、K3.1-Pro 以及蚂蚁 Ling-3.1-flash 匹配 152-SM 的 GB200/GB300 布局**——而同一家实验室更早的模型全部读作 132-SM 的 Hopper。方法可以在物理芯片上复现:用 DeepSeek 的种子 953049583 在 H100 上逐位复现 V3 的 57,344 个保留值、但无法复现 V4-Flash;在 B300 上则逐位复现 V4-Flash(469 个抽样行中 445 行完全一致);GB200 用种子 20256586 复现了 Kimi K3 的 13 个保留行。AMD MI300X 替代解释在 V4-Flash 上被排除——在两家厂商数值有差异的 377 个值里,公开权重 363 次匹配 NVIDIA、0 次匹配 AMD。该方法与 24 个公开过硬件信息的模型全部吻合,最强证据在 49 到 1,385 sigma 之间,而偶然匹配的基准线只有约 8 sigma。报告自己给出的估算:每次最终训练约需 1,500–3,500 张 Blackwell GPU,五个模型合计约 12,000 张,按 WSJ 的单卡价格超过五亿美元。

**Why it matters:** 这是出口管制指控背后第一份技术证据——而非官员的口头断言——而且完全来自公开权重。报告同样明确了天花板:指纹只能证明初始化硬件,"支持但不能证明 Blackwell 也执行了训练",也"不构成任何违法认定"。值得注意的是 Qwen、GLM、腾讯、小米和 StepFun 的最新模型仍全部读作 Hopper,而若干模型(CPU 初始化的 Qwen3、用 PaddlePaddle 的 ERNIE、用 ASIC 训练的美团 LongCat)根本不留下 GPU 指纹。

> "These flags describe the hardware class under the U.S. export rules of October 2022 and October 2023. They are not a finding that any law was broken."

[`🔗 Unemployment Labs: checkpoint forensics`](https://unemploymentlabs.com/checkpoint-forensics) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50474883)

---

## 22. PostgreSQL 52-CVE 补丁日背后的研究者故事:把一个 22 年历史的复合类型原语变成 root RCE

- **Velocity:** ▮▮ rising
- **Source:** mehmetince.net · 155+ pts on HN · 9.7h ago (~02:25 UTC+8)
- **Tags:** `postgresql` `type-confusion` `exploit-research`

Mehmet Ince 的第三篇(11 月 9 日发表,11 月 12 日重新登上 HN)是本日第 10 条所覆盖补丁潮的研究者自述:创建一个带 `uuid` 字段的复合类型,`PREPARE` 一条返回该类型的查询,执行 `ALTER TYPE ... ALTER ATTRIBUTE key TYPE bytea CASCADE`,再 `EXECUTE`——此时 `record_out()` 会把已存储的 UUID 字节交给 `byteaout()`,而前缀 `01 02` 会被读作展开对象指针。伪造的 header 加 methods 表让 detoast 过程变成一次间接调用:`system(H)`。同一原语还能击穿 ASLR——把数组元素类型改成 `bigint[]`,`unnest()` 就会把指针当作整数交还(三个 UUID 即可伪造 48 字节数组头)。可变行类型的行为可以追溯到提交 `077db40fa1f3`(2004 年 5 月 5 日);利用链依赖 2015 年加入的展开对象指针。Ince 报告了 21 个变体,并指出 11 月 9 日发布中的 52 个 CVE 有六个属于这个家族(**CVE-2026-6460** 总修复,外加 CVE-2026-120142、-120148、-116329、-116306、-120139),最低权限的登录角色即可触发。总修复记录本身——**8.8 分**,直到 11 月 12 日才由 PostgreSQL 自己的 CNA 发布到 NVD——说得直白:"PostgreSQL 中的类型混淆允许对象创建者以运行数据库的操作系统用户身份执行任意代码。"他与托管 Postgres 行业私下协调——"我没有看到任何不受影响的厂商"——Databricks 立即验证、Google 将 AlloyDB 升级到 P0,AWS、Azure 和 Supabase 在 8 月就收到了可用的 PoC。修复提交的 Reported-by 名单横跨 PostgreSQL 核心、OpenAI 安全研究团队与 Anthropic 的 Nicholas Carlini。

**Why it matters:** 周二发布中那些抽象的类型混淆 8.8 分,在这里是最坏情形的具体化——一个无特权 SQL 角色在托管 Postgres 机群上抵达操作系统代码执行。它也是一份坦诚的 agent 辅助漏洞研究记录:Ince 明确感谢一个由 Opus 驱动的"pg_expert"导师陪他学完 Datum 内部机制,同时自己动手找到了漏洞。

> "I gave PostgreSQL a value inside a composite type, changed the type of one of its fields, and asked it to read the value back. That type confusion led to one of the most reliable memory-corruption exploit I have seen."

[`🔗 Mehmet Ince: Part 3/6, CVE-2026-6460`](https://mehmetince.net/part-3-6-how-i-ended-up-turning-a-22-year-old-postgresql-type-confusion-primitive-into-rce-cve-2026-6460) · [`🔗 NVD: CVE-2026-6460`](https://nvd.nist.gov/vuln/detail/CVE-2026-6460) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50471761)

---

## 23. AI 生成的应用洪流正在压垮 Apple 审核流水线——合成器开发者因幻觉理由被拒

- **Velocity:** ▮▮ rising
- **Source:** synthanatomy.com · 128+ pts on HN · 6.9h ago (~05:05 UTC+8)
- **Tags:** `app-store` `apple` `industry`

Synth Anatomy 记录了 iOS 音乐应用两侧同时发生的 AI 失效:如今每天约有 **10–20 款新 iOS 音乐应用**以 vibe coding 方式涌现,而 Apple 的审核——其指南承诺"至少 50% 的提交在 24 小时内完成、90% 在 48 小时内"——已经拖延到数周。Pittsburgh Modular 的 Microvolt 3901 在 10 月 27 日发出 VST 版,iOS 版却拖到 11 月 12 日。Unfiltered Audio 的 Michael Hetrick 报告其 Sinusoidal Run Rhythm **被拒四次**——"审核员幻觉出 'Polyharmonic' 是一种音频技术,要求我们出示该术语的使用许可文件",随后要求拍摄与"必需的专有硬件"连接的视频,再把 MIDI 版判为与音频版雷同的垃圾应用——一个月往返后只能先发纯音频版。更糟的是,开发者 Marek Dendes 的 CRUX Synth 连续四次被拒,理由是"设计垃圾"、由"应用生成模板服务"产出,申诉五天无回复:提交状态"从'等待审核'变成'审核中',然后瞬间变成'已拒绝'"。

**Why it matters:** App Review 是平台的核心信任产品——店里的每样东西都被检查过。廉价生成让闸门被淹没,而自动化审核在幻觉中制造拒审理由,申诉通道形同虚设;如果这个状态延续,成本将恰好落在审核制度本应保护的小开发者身上。

> "Apple seems to be using AI for automated App Store reviews. SRR got rejected 4 times." — Michael Hetrick, Unfiltered Audio, Loopy Pro 论坛

[`🔗 Synth Anatomy: AI is turning Apple's app review into a nightmare`](https://synthanatomy.com/2026/11/ai-is-turning-apples-app-review-process-into-a-nightmare-for-developers.html) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50474311)

---

## 24. Edge0-145B 开源:145B 参数,宣称在笔记本上以 29 GB 峰值内存跑出 80+ tok/s 解码

- **Velocity:** ▮▮ rising
- **Source:** edge0.ai · 116+ pts on HN · 5.0h ago (~07:05 UTC+8)
- **Tags:** `on-device-ai` `moe` `open-weights`

Edge0 团队(仓库 **Edge0-AI/Edge0**,10.4k★)发布了 Edge0-145B 与 Edge0-120B 权重及其推理框架。架构是共享矩阵 MoE——每组 64 个专家共享两个大矩阵,各专家只保留小的增量参数,因此每步只有约 10B/145B 参数参与计算——配合三层加载(热专家驻留显存、约 40 GB 专家库放系统内存、约 48 GB 词表数据按需从 SSD 读取)与 CPU+GPU 协同调度。宣称数字:**29 GB 峰值内存、1,100+ tok/s 预填充、80+ tok/s 解码、约 120 W**,直到 128K–256K 上下文速度基本不变,首发支持 Apple Silicon 与 RTX 4090/5090。基准测试将其排在 Qwen3.8-Flash-Next(Terminal-Bench 2.1 上 86.52 对 83.3)与 DeepSeek-V4-Flash-0731 之前——但帖子自己写明这些对比"来自 Edge0 的内部评估",基线内存数字(例如 Qwen3.8-Flash-Next 的"约 70 GB")带星号、属"尚待实测"的估算。同帖还回顾了 9 月的 Edge0-35B 手机版(iPhone 18 Pro Max 上 37+ tok/s)。

**Why it matters:** 如果内存数字经得起第三方复测,"笔记本上跑前沿 agent"就不再是一句营销话术——145B 只要 29 GB,决定的是工作站的规格而不是机房的规格。在有人独立跑过同一套评测之前,每一行对比都应视为厂商主张;HN 的反应(113 分且仍在涨,以怀疑为主)是正确的先验。

[`🔗 Edge0 blog: Introducing Edge0-145B`](https://edge0.ai/blog/introducing-edge0-145b-frontier-ai-capabilities-on-your-own-computer) · [`🔗 Edge0-AI/Edge0`](https://github.com/Edge0-AI/Edge0) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50475713)

---

## 25. 九条 NetScaler CVE 记录一夜落地——ADC/Gateway 内存破坏,修复版本 14.1-73.57 与 13.1-64.39

- **Velocity:** ▮▮ rising
- **Source:** NVD records (CNA: Citrix) · published 00:20–03:17 UTC Nov 13 (~08:20–11:17 UTC+8)
- **Tags:** `citrix` `netscaler` `cve-wave`

Citrix 的 CNA 一夜之间发布了 **9 条 NetScaler ADC/Gateway 记录**,每条都指向公告 **CTX697305**,评分全部采用 CVSS 4.0:CVE-2026-107412 达 **9.5**(多处内存溢出),5 条 9.3——包处理、SMPP、DNS 与 DNS-over-HTTPS、NetScaler Push——另有 3 条 8.7(RTSP ALG、SAML、WebAuth)。cveawg 容器给出了修复构建:**14.1-73.57**(FIPS 为 14.1-73.58)、**13.1-64.39**(FIPS/NDcPP 为 13.1-37.293),达到或高于这些版本则不受影响。描述止步于"内存溢出……可能导致……拒绝服务";写稿时九条记录仍为 `Received` 状态。Citrix 公告页对普通抓取呈现为 JavaScript 壳,因此本条读的是 CVE 记录而非公告正文——记录本身就是 CNA 的原始表述。

**Why it matters:** NetScaler 的内存破坏家族有变成边缘设备利用链的前科(Citrix Bleed,2023),而 ADC/Gateway 恰恰是管理接口最常被预认证侦察的边界资产。"拒绝服务"措辞对 8.7–9.5 的分数,意思是"定级前先读公告"——但边缘设备本周就该打补丁,无论定级如何。

[`🔗 NVD: CVE-2026-107408 (DNS/DoH memory corruption)`](https://nvd.nist.gov/vuln/detail/CVE-2026-107408) · [`🔗 Citrix advisory CTX697305`](https://support.citrix.com/support-home/kbsearch/article?articleNumber=CTX697305)

---

## 26. AgentRun 开源一个会自我改进的 agent 控制平面——Pi、Claude Agents、Codex、OpenCode 走 ACP 接入

- **Velocity:** ▮ rising
- **Source:** Parcha-ai/agentrun · 86+ pts on HN (Show) · 9.8h ago (~02:15 UTC+8)
- **Tags:** `agent-infra` `self-improvement` `acp`

GREP.AI(YC F26)开源了 AgentRun(Apache-2.0,npm `@parcha/agentrun`,640★):在你喜欢的 agent harness 之上提供"自我改进、持久执行与控制平面",经 ACP 接入任意 harness(Pi、Claude Agents、Codex、OpenCode),带沙箱、计算机环境、数千种工具,以及一个 Learning 标签页展示 agent 保留了什么——演示文案称"回答从 10 秒缩短到 2 秒,单次运行成本从 $0.05 降到 $0.0077"。案例研究是其中最诚实的部分:当每次代码审查收费 1 美元后,他们的账单从每月 180 美元涨到 6,451 美元,于是他们用便宜模型、以自己的 PR 微调,自建了一个审查器——**每次审查 18 美分**,自称在 30 个 PR 上"抓到的真实 bug 是 Greptile 的 1.6 倍";商户分类"学会这份工作后便宜了 7 倍"。支持 Render 一键部署,也有托管控制台。

**Why it matters:** 值得关注的是把"自我改进"当作一条可测量的成本曲线而非一个记忆功能——30 个 PR 的样本是公司自己的数据,但这个形态(跨 harness 的控制平面 + 会复利的学习回路)正是 agent 基础设施正在收敛的方向,比今早的路由代理高一层。

[`🔗 Parcha-ai/agentrun`](https://github.com/Parcha-ai/agentrun) · [`🔗 HN discussion (Show)`](https://news.ycombinator.com/item?id=50471650)

---

## 27. Lambda Web Functions 在最后一次请求之后仍计费内存 5–7 分钟——于是有创业公司自建了算力

- **Velocity:** ▮ rising
- **Source:** easel.sh · 71+ pts on HN · 11.1h ago (~00:55 UTC+8)
- **Tags:** `aws` `lambda` `cloud-costs`

Easel 对 AWS 10 月推出的 Lambda Web Functions 做了基准测试,撞上一种值得记住的计费形态:**六个 us-east-1 环境在最后一次请求后仍存活 313–411 秒**(10 月 26 日数据),且没有可配置的空闲超时——CPU 只在活跃时计费,内存却按环境整个生命周期计费。一次 200 毫秒的请求加 345 秒空闲,等于"约 1,700 倍于请求时长的内存计量时间";内存占了该实验计算成本的约 88%。空闲 10 秒后自行终止环境能把计量时间降约 20 倍,但 AWS 把每次主动退出都记为运行时故障。于是 Easel 把执行搬到了自建主机上(11 月 2 日上线),Lambda 只做溢出——同一个 Next.js 16 应用:**暖请求中位数快 1.5–3 倍,冷启动快约 3.5 倍**(空闲 12 分钟后 216–250 毫秒对 810–854 毫秒),暂停环境恢复只要 14 毫秒,而 Web Functions 需要 908 毫秒。帖子也写明了自己的局限:单一区域、单个小应用、仅两次配对冷启动试验。

**Why it matters:** Serverless 经济学存在一个安静的底价——每个突发型低流量应用,每毫秒真实工作都要为几分钟的内存秒买单,而 Web Functions 把这个底价摆到了明处。应对方式同样说明问题:一家托管创业公司得出的结论是"许多应用共享一台温热机器"胜过"每个应用一个隔离环境"——老的独享主机模型,在按毫秒计费的世界里重新出现。

[`🔗 easel.sh: Why we chose our own compute over Lambda Web Functions`](https://www.easel.sh/blog/lambda-web-functions-idle-memory) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50470445)

---

## 28. 把 CPython 适配给 yk:约 450 行代码,让一个元追踪 JIT 在 13 个基准中的 12 个上跑赢 CPython

- **Velocity:** ▮ steady
- **Source:** tratt.net · 56+ pts on HN · 15.2h ago (~20:50 UTC+8 Nov 12)
- **Tags:** `cpython` `jit` `interpreters`

Laurie Tratt 的 yk 是给 C 解释器加装元追踪 JIT 的工具包(yklua 比 PUC Lua 快 2 倍),但一个公平的质疑是"你怎么知道它对大型解释器也有效?"答案:**ykcpython**,3–4 天直接工作量加 1.5 周的 yk 通用修复,改动约 450 行。最有教益的是路径:先适配 CPython 的 tier-1 解释器(200 行),结果比原版更*慢*——quickening 在特化与去特化之间的反复切换不断作废 trace——于是改投 tier-2 uop 解释器(只需 80 行)。一个 30 行的幂等加载提示就让 Mandelbrot 快了 2.7 倍(11.67 秒 → 5.0 秒)。对比 CPython 3.15.1 及其实验性 JIT 的最终数字:ykcpython 在 13 个 AWFY 基准中的 12 个上快于原版(DeltaBlue 慢约 2.5%),在 13 个中的 8 个上快于 CPython 自家的 JIT——Mandelbrot 4.20 秒 vs 6.94 秒(JIT)vs 11.66 秒;Richards 33.18 秒 vs 40.56 秒 vs 54.80 秒。限定条件同样写得直白:"它绝对不是"可用于生产的,且"基准套件成绩是必须跨过的横杆,而不是目的本身"。

**Why it matters:** 这是第三个证据,说明一个可用的 JIT 可以以约 450 行的 fork 加进主流解释器,而不是一场重写——而且它借力 CPython 自己的 tier-2 uop 基础设施,意味着实验性 JIT 打下的地基正在回馈竞争性的 JIT 设计。可复现实验与原始数据都已公开。

[`🔗 Laurie Tratt: Adapting CPython for yk`](https://tratt.net/laurie/blog/2026/adapting_cpython_for_yk.html) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50466410)

---

## 29. Dixell/Copeland XWEB EVO 一波收到 14 条 CVE 记录——超市制冷服务器上的预认证 root 命令注入加硬编码后门

- **Velocity:** ▮ steady
- **Source:** NVD records (CNA: VulnCheck) · published from Nov 12 20:18 UTC (~04:18 UTC+8 Nov 13)
- **Tags:** `iot-security` `backdoor` `cve-wave`

VulnCheck 的 CNA 在 11 月 12 日发布了 20 条记录,其中 **14 条针对 XWEB EVO**——这是 Dixell(Copeland)制冷控制器的 Web 服务器,广泛用于食品零售——研究者署名 Valentin Lobstein。三条最高的都是 CVSS 3.1 **9.8**:**CVE-2026-124002**,经由 login.lua、cleanout.lua 或 api.lua 的*用户名字段*进行预认证 OS 命令注入,"发生在密码校验之前",再串联 setuid-root 的 `wlua` 解释器直达 root;**CVE-2026-124004**,硬编码后门密码,直接获得完整管理员权限;**CVE-2026-124010**,经由 setuid-root CGI `xwconsole.cgi` 的 root 命令注入。免认证任意文件写入(CVE-2026-124014,9.1)补齐了危急组。公告里的一句话决定了应对方式:"该产品线已于 2026 年 3 月到达服务终止日"——没有修复路径,因此受影响安装(注入为 ≥ 5.2.3、< 5.7.0)除非隔离或更换,否则将永久存在。(VulnCheck 自己的页面对同一条记录打印的 CVSS 4.0 是 9.3,而 NVD 提供的是 9.8/3.1——同一评估方,两套框架。)

**Why it matters:** 暴露的 PLC/后门模式通常让人想起摄像头和路由器;这次是超市制冷的控制平面——可从互联网触达、凭据在设计上可猜、且已 EOL。"无补丁"是永久的那种,应对方式从排期打补丁变成今天就做网络隔离。

[`🔗 VulnCheck advisory: XWEB EVO pre-auth command injection`](https://www.vulncheck.com/advisories/dixell-copeland-xweb-evo-pre-authentication-os-command-injection-via-username) · [`🔗 NVD: CVE-2026-124002`](https://nvd.nist.gov/vuln/detail/CVE-2026-124002)

---

## 30. Claude 宕机两小时——一次身份验证故障让 claude.ai、Claude Code、Console 和 Cowork 全线搁浅,随后恢复

- **Velocity:** ▮▮▮ trending
- **Source:** status.claude.com · 230+ pts on HN · 1.9h ago (~18:18 UTC+8)
- **Tags:** `outage` `anthropic` `claude-code`

Anthropic 的状态页在 **09:58 UTC** 开出事故 `nn11wk485zfn`:"We are investigating an issue with users authenticating to Claude.ai and Claude Code."(我们正在调查用户登录 claude.ai 和 Claude Code 时遇到的问题。)**11:05 UTC** 部署修复并进入 Monitoring,**11:58 UTC** 标记为 Resolved——一场持续两小时的身份验证故障,波及 claude.ai、Claude Console(platform.claude.com)、Claude Code 和 Claude Cowork。HN 同时出现三个帖子(状态页链接 230+ 分、"Claude Is Down" 118 分、一个 Tell HN),照例伴随着状态页从未点名的故障原因的各种猜测。

**Why it matters:** 对 Claude 宕机感受最深的是 agent 集群——两小时的认证故障不是丢聊天记录,而是成千上万个进行到一半的编码 agent 会话卡在下一次 API 调用上。恢复那半是令人鼓舞的:两小时内三次状态更新、当日上午解决,比下文 Microsoft 365 这一波干净得多的事件响应。

[`🔗 Claude status: incident nn11wk485zfn`](https://status.claude.com/incidents/nn11wk485zfn) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50481187)

---

## 31. "把 THE boss 带回来":Nvidia 员工请愿让黄仁勋回归——内部建议箱帖子收到 1,600+ 条评论

- **Velocity:** ▮▮▮ trending
- **Source:** wired.com · 639+ pts on HN · 9.9h ago (~10:16 UTC+8)
- **Tags:** `nvidia` `industry` `leadership`

今晨的 feed(第 1 条)报道了辞职,续集来了:WIRED(Paresh Dave 与 Zoë Schiffer,11 月 12 日晚 8:17 ET)查阅了内部通信,其中一条内部"建议箱"帖子——由一位资深工程师在辞职*之前*提交,敦促董事会在采取行动前考虑员工情绪——已吸引 **1,600 多条评论**,"大多数都全力支持让他复职"("If you believe in the mission, bring back THE boss"——如果你相信这个使命,就把 THE boss 带回来)。一名员工更进一步,发了全公司邮件要求对黄仁勋的离任保持透明:"I stand by Jensen."(我站在 Jensen 这边。)黄仁勋 63 岁,自 1993 年创立以来一直执掌 Nvidia,周日致员工的邮件中承认自己"unfaithful to [his] wife"(对妻子不忠),并表示"no excuse"(没有任何借口)。Nvidia 与新任董事长 Harvey Jones 未回应 WIRED 的置评请求。

**Why it matters:** 辞职事件的悬而未决之处已不再是"他走不走",而是过渡班子(Kress 身兼 CFO/CEO,Jones 任董事长)能否在员工中站得住——而请愿书正是对这一点的一次可见测量。盯住 **11 月 17 日**的财报电话会:这是公司第一次必须在公开场合表演"一切如常",而它有相当一部分员工正记录在案地想让被赶下台的 CEO 回来。

> "If you believe in the mission, bring back THE boss." —— 一位匿名的 Nvidia 员工,写在内网建议箱里

[`🔗 WIRED: 'Bring Back THE Boss'`](https://www.wired.com/story/nvidia-employees-petition-for-jensen-huangs-return/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50477231)

---

## 32. llama.cpp 发布 v1.0.0——b 编号时代有了稳定的 semver 线,详情定在 CET 下午 3 点

- **Velocity:** ▮▮ rising
- **Source:** ggml-org/llama.cpp · v1.0.0 released 10:20 UTC (~18:20 UTC+8) · +176★ today on GitHub Trending
- **Tags:** `llama.cpp` `local-llm` `release`

ggml-org 于今天 10:20 UTC 发布 **llama.cpp v1.0.0**,距 v0.9.0(11 月 4 日)九天——同步发布的照例还有 nightly(b12359/b12360)和配套的 **ggml 1.0.0** 版本号提升。发布说明刻意极简:"New version has been released. … More info at 3PM CET"(CET 下午 3 点,即 14:00 UTC——在本期 feed 截稿*之后*),并指向 ggml 讨论 #1579"Releases and versioning of `ggml-org` projects"——ggml-org 各项目以 semver vX.Y.Z 打标签,而 llama.cpp 的 b 编号继续作为 nightly 构建。v0.9.0 以来的 changelog 本身就很有料:server 安全修复(CORS 代理与媒体 URL 的 SSRF 修复、经非回环地址访问工具改为显式 opt-in、客户端断开时取消 MCP 工具调用),外加 Intel FlashAttention Vulkan prefill 内核、ARM NEON 上的 4×4 `simd_gemm` 分块、CUDA MMQ epilogue 对 nvfp4 checkpoint 的 `w_s` 缩放融合,以及 Qwen3.5 在转换期的张量合并。

**Why it matters:** llama.cpp 是大多数本地 LLM 工具链脚下的依赖,下游多年来只能钉在一个个变动的 b 编号上——一条 1.x semver 线终于给打包者一个稳定目标。"1.0"到底*意味着*什么还是悬念:承诺的 CET 下午 3 点说明尚未落地,所以在那之前,把语义当作"已宣布、未发布"来对待。

[`🔗 llama.cpp v1.0.0 release`](https://github.com/ggml-org/llama.cpp/releases/tag/v1.0.0) · [`🔗 ggml: Releases and versioning of ggml-org projects`](https://github.com/ggml-org/ggml/discussions/1579)

---

## 33. Microsoft 365 宕机第 20 小时:修复"不如预期",随后"取得额外进展"——学校、全科医生和国会仍在等待

- **Velocity:** ▮▮ rising
- **Source:** bbc.com live · 355+ pts on HN · 7.1h ago (~13:08 UTC+8)
- **Tags:** `outage` `microsoft-365` `exchange-online`

第 5 条的更新:11 月 12 日 16:17 UTC 开出的事故(EX1550543)**约 20 小时后仍未修复**,BBC 直播页(在 feed 截稿前几分钟更新)此前的大标题是"Attempts to Fix Global Outage Not Going 'as Expected'"(修复全球宕机的尝试'不如预期')。到 UTC 上午中段,微软表示正在取得"additional progress towards recovery"(额外进展),优先事项是"reducing email queues and backlogs"(清减邮件队列与积压),并重申原因不是"a cyber-security breach"(网络安全攻击)。影响报道:已知 **4.3 亿** Microsoft 365 用户;英国全科医生警告"there will be major problems NHS-wise"(NHS 会出现大问题),学校要求家长改用电话联系,英国国会启用"alternative communication arrangements"(替代通信安排)。

**Why it matters:** 第 5 条的判断(舰队一致性故障、健康检查欠债、状态页自己也在闪断)现在有了下半场:一次横跨邮件、会议、文档、Copilot 和 Defender、拖过整个工作日的降级。要盯的观测点是恢复瓶颈——邮件积压的清排;"修复完成"但队列还在排空的状态可能看起来已打好补丁,实际还要再等一天才能真正送达。

[`🔗 BBC: Microsoft outage live updates`](https://www.bbc.com/news/live/cq5y10ge3dp3t) · [`🔗 HN: Microsoft Outlook/365 still down after 12 hours`](https://news.ycombinator.com/item?id=50478609)

---

## 34. 台积电就员工数据泄露提交 6-K——云服务商的系统,"no evidence that TSMC's systems have been compromised"

- **Velocity:** ▮▮ rising
- **Source:** sec.gov (Form 6-K) · 103+ pts on HN · 4.5h ago (~15:39 UTC+8)
- **Tags:** `tsmc` `data-leak` `third-party-breach`

HN 标题写的是"TSMC Hacked"(103 分);一手来源要窄得多。台积电的 SEC **Form 6-K**(11 月 12 日,CFO Wendell Huang 签署)陈述:"some of our current and former employee data was made available on an external website without authorization"(部分现任与前任员工的数据在未经授权的情况下出现在一个外部网站上),并且两次声明了它*没有*声称的事:"Currently, we have found no evidence that TSMC's systems have been compromised"(目前没有证据表明台积电自身的系统遭到入侵),数据"has been verified to match data stored in the system services of a cloud service provider, but is unrelated to the company's operations or customer-related data"(经核实与某云服务商系统服务中存储的数据相符,与公司运营或客户相关数据无关)。台积电表示正与云服务商、调查机构和一家第三方网络安全机构合作,并通知、支持受影响员工。

**Why it matters:** 标题与文件之间的差距就是这条新闻:这读起来是第三方云系统暴露员工数据,而非晶圆厂被攻破——而文件自己的限定语(无系统失陷证据、无客户数据)恰恰是聚合媒体没有带上的事实。待观察项是哪家云服务商,以及外部网站上那份副本是否已被撤下。

[`🔗 TSMC Form 6-K: Statement Regarding the Unauthorized Access of Employee Personal Data`](https://www.sec.gov/Archives/edgar/data/1046179/000104617926000800/a20261112statementregardin.htm) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50479721)

---

## 35. Brave Search API 经 x402 协议接受 agentic 支付——按次以 USDC 付费,无需 API key

- **Velocity:** ▮ steady
- **Source:** brave.com · 129+ pts on HN · 9.0h ago (~11:08 UTC+8)
- **Tags:** `agentic-payments` `search-api` `x402`

Brave 的博客(11 月 12 日):Search API 现已支持"instant, pay-as-you-go, agentic payments enabled by the open x402 payment protocol"(由开放 x402 支付协议启用的即时、按量付费的 agentic 支付),让 agent 查询 Brave 的独立索引并"实时结算请求,从而免除传统 API key 管理"。机制就是协议本身:"A request sent without payment receives an HTTP 402 Payment Required response that states the price of that search and the payment details needed to pay it. The agent signs a USDC payment for that amount and retries the request with the signed payment attached."(未附支付的请求会收到 HTTP 402 Payment Required 响应,其中写明本次搜索的价格与所需支付细节;agent 签署一笔等额 USDC 支付,附在请求上重试。)Brave 运营自己的 facilitator,接受 Base 区块链上的 USDC,其他网络与其他稳定币"incoming soon"(即将到来);事先无需注册账号或选择套餐。

**Why it matters:** 搜索是 agent 技术栈里调用频率最高的付费原语,而这是主流搜索索引第一次以 HTTP 原生方式暴露按请求结算——402 流程把开通与密钥管理整个拿掉,换成一只有钱的钱包。它同时也给了 x402 第一个搜索领域的规模化参考客户,这正是该协议一直缺的接受度信号。

[`🔗 Brave: Search API agentic payments via x402`](https://brave.com/blog/search-api-agentic-payments/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50477649)

---

## 36. Google 发布 A2UI 1.0——其 agent 生成式 UI 协议的首个稳定版

- **Velocity:** ▮ steady
- **Source:** developers.googleblog.com · 42+ pts on HN · 34.5h ago (~09:42 UTC+8 Nov 12)
- **Tags:** `generative-ui` `agents` `protocol`

Google 的 A2UI 团队(PM Vishal Motwani,11 月 11 日):"Today, we're releasing A2UI 1.0, the first stable version of our open protocol for generative UI."(今天,我们发布 A2UI 1.0——我们开放式生成式 UI 协议的首个稳定版本。)Agent 以交互屏幕作答——一张确认表单、一张图表——agent 只描述要展示什么,而**每个应用用它自己的原生组件来渲染**:web、Android、iOS 的渲染 SDK,Python、TypeScript、Dart 的 agent SDK。安全模型是白名单加服务端绑定——agent"只能放置和配置你注册的组件",并且 A2UI"reliably binds to your data and child components on the server, so sensitive values never reach the model"(在服务端可靠地绑定到你的数据与子组件,敏感值永远不会到达模型)。组合方式是"A2UI Express"或"system one"决策模型——"pick components instead of writing text"(挑选组件而非书写文本),协议还能在托管 MCP 应用的第三方助手里运行,"such as Gemini or Claude"(例如 Gemini 或 Claude)。"Companies such as Atlassian, Alation, Bloomberg, and ByteDance are already building with it."(Atlassian、Alation、Bloomberg 与字节跳动等公司已在用它构建。)

**Why it matters:** 生成式 UI 正收敛到同一条路:agent 输出受限规格,应用负责原生渲染。A2UI 1.0 是这个押注的 widest-industry 版本,点名的采用者加上 SDK 矩阵(三端渲染、三语言 agent)让它成为值得评估的候选标准。组件白名单加服务端绑定,正是让模型驱动的 UI 能走出 demo、进入生产的那个东西。

[`🔗 Google: A2UI 1.0`](https://developers.googleblog.com/a2ui-10-build-delightful-fast-reliable-agentic-experiences/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50461919)

---

## 37. Microsoft Defender 三个月里上传了一位开发者的未发布构建 217 次——都在"safe samples"默认设置下

- **Velocity:** ▮ steady
- **Source:** garrettstimpson.ca · 64+ pts on HN · 34.7h ago (~09:27 UTC+8 Nov 12)
- **Tags:** `defender` `telemetry` `windows`

Garrett Stimpson 的帖子(11 月 11 日):他在排查连接迟缓问题时用上了 Hodometer(他自己写的按进程追踪流量的托盘工具),随后发现 Defender 的事件日志记录了"**217 sample submissions from my PC over three months. I hadn't seen a prompt for any of them**"(三个月里我电脑上的 217 次样本提交,我一次也没见过提示)——其中大多数是他自己未发布程序的构建。`MpCmdRun.exe`"一天内向 Azure 存储发送了 224 MB",以每分钟约 28 MB 的突发进行;Event 2050 记录每次提交的文件名与 SHA-256;217 次里 201 次是同一个 Go 测试程序的构建,横跨 216 个不同哈希——是新鲜二进制,不是重复上传——最忙的一天 75 次。Windows 的按应用流量统计显示 `MpCmdRun.exe` 30 天上传 **2.8 GB,约占该电脑上传给微软总量的 80%**。允许这一切的默认项是"Send safe samples automatically",而"safe"的意思是"不太可能包含个人身份信息"。帖子最锋利的细节:10 月 28 日他运行了 `Set-MpPreference -SubmitSamplesConsent 2`;Event 5007 记录了改为"never send"——当天 19:53,另一条记录显示它被改**回了 1**("I don't know what changed it back"——我不知道是什么改回来的),重新启用后又上传了 25 次。

**Why it matters:** 信任问题不在 PII——而在于未发布的专有二进制默认离开你的机器、没有任何提示、藏在一个多数用户不知道存在的设置里。对任何在 Windows 上开发闭源软件的人来说,sample submission 是一张要审计的数据出口;帖子结尾附上了如何检查你自己 Defender Operational 日志的方法。

> "Microsoft Defender Antivirus has uploaded a file for further analysis" —— Event 2050,引自该帖子

[`🔗 Garrett Stimpson: I caught Microsoft red-handed with Hodometer`](https://garrettstimpson.ca/posts/2026/11/11/caught-microsoft-red-handed-with-hodometer/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50461786)

---

## 38. FrankenPHP 一波收到 14 条 CVE 记录——worker 模式状态泄漏、点号头部认证绕过,以及一条针对陈旧 Docker 基础镜像的 9.8

- **Velocity:** ▮ steady
- **Source:** NVD records (CNA: VulnCheck) · published 10:18 UTC Nov 13 (~1.9h ago)
- **Tags:** `frankenphp` `php` `security`

VulnCheck 的 CNA 今晨为 `php/frankenphp`(把 PHP 嵌入 Go 二进制的项目)一次性发布了 **14 条记录**(CVE-2026-128014 至 -128027)。最高分 **CVE-2026-128027(9.8)** 不是代码缺陷而是构建流程缺口:"FrankenPHP Docker images before 1.1.11 were rebuilt only when new base image tags were created, so security fixes that Alpine, PHP, and Go applied under existing tags were not propagated."(1.1.11 之前的 Docker 镜像只在新基础镜像标签出现时才重建,Alpine、PHP 与 Go 在既有标签下发布的安全修复因此未被吸收。)**CVE-2026-128014(8.1)** 打的是独立静态二进制——它们捆绑了链接 Brotli 1.2.0 的 PHP brotli 扩展,该解码器存在越界写入(即底层的 CVE-2026-111497)。**CVE-2026-128023(7.4)** 是经点号头部的认证绕过:客户端发送 `X.Authenticated.User` 这类名字,PHP 会改写成下划线形式的 `$_SERVER` 键,从而伪造用户身份、客户端 IP 或协议。其余是一个 worker 模式家族——`putenv()` 写入进程级 OS 环境导致数据库密码等秘密跨并发请求泄漏(6.4)、每请求环境变量在线程上残留(4.8)、libxml 错误状态在客户端之间泄漏(3.7)、SplTempFileObject 流的释放后使用(6.5)——外加一组 DoS。每一条分数都是 **VulnCheck 自己的 CVSS 3.1**(Primary,CNA 指定),且所有 NVD 记录均处于 `Deferred`。修复分布在 1.13.0–1.13.4(10 月 4 日至 10 月 26 日),11 月 5 日还有 1.13.5——记录比补丁晚到了一个月。

**Why it matters:** worker 模式是 FrankenPHP 的卖点,而这个家族的形态——请求状态在共享线程上跨请求存留——是租户边界故障,生产环境里会变成跨用户泄漏。跑 **≥ 1.13.4**(当前 1.13.5),并且因为那条 9.8,请核实你部署的 Docker 镜像真的重建过,而不是假设拉个基础标签就吸收了修复。

[`🔗 NVD: CVE-2026-128023 (dot-header auth bypass)`](https://nvd.nist.gov/vuln/detail/CVE-2026-128023) · [`🔗 GHSA-x9p2-77v6-6vhf (stale Docker base images)`](https://github.com/php/frankenphp/security/advisories/GHSA-x9p2-77v6-6vhf)

---

## 39. HermesEnabler:解锁任意 Apple Watch 上 Hermès 表盘的侧载 watch 应用——今日 218★,随 watchOS 27 beta 重新钉版本

- **Velocity:** ▮ steady
- **Source:** pookjw/HermesEnabler · 1,699★, +218 today on GitHub Trending
- **Tags:** `watchos` `sideloading` `apple`

`pookjw/HermesEnabler` 位列今日 GitHub Trending 第 4 名,触发器是苹果自己的发布列车:**1.5.2**(11 月 12 日)加入 watchOS 27.0 beta 3 支持,**1.5.3**(11 月 13 日 01:34 UTC)加入"support for watchOS 27.0 RC (24R363) and 27.2 beta 1 (24S5086l)",**1.5.4**(11 月 13 日 04:21 UTC)加入越南语本地化——两天三个版本。机制按 README:通过 Sideloadly 或 Xcode 侧载一个 IPA(一个 iPhone 宿主应用加一个 `HermesEnabler2` watch 应用)——Windows 上用 WatchBridge——在两台设备上都启用开发者模式,然后在 Watch 上运行该应用;支持范围是"watchOS 27.0 through 27.3 beta 1"。README 诚实地记录了摩擦点:Sideloadly 0.72 的已知 bug 会在签名时剥掉内嵌 watch 应用、开发者证书信任步骤、以及一个未签名的 Windows 辅助工具。

**Why it matters:** 它是侧载一切模式在 watchOS 上的脸面,其发布史本身就是一份维护成本估算:苹果每个 beta 都会弄坏它,每个 release 都要重新钉上精确的构建号(24R363、24S5086l)。把它当作一份实地报告来读——看看未签名开发者模式工具目前在 watchOS 上能走多远,以及对未发布苹果操作系统做开发实际要付多少钱。

[`🔗 pookjw/HermesEnabler`](https://github.com/pookjw/HermesEnabler) · [`🔗 Releases (1.5.2–1.5.4)`](https://github.com/pookjw/HermesEnabler/releases)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-13T12:28:15Z |
| Items | 39 |
| Sources tracked | 29 (Hacker News, GitHub Trending, NVD, status pages, SEC filings, vendor advisories, vendor blogs, research pages) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[Previous day](2026-11-12.md) · [Raw .md](latest.md) · [Archive](../archive/index.md)
