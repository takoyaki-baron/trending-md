---
title: 漏洞供给与分类处置能力
topic: vuln-supply
created: 2026-10-14
---

# 漏洞供给与分类处置能力

CVE 流的"发现—消费"一侧：模型辅助发现如今产出多少、由谁计数，以及厂商的**发布政策**如何改变这些数字。
相邻文件：[[security]]（攻击面类别与 CVE 总账）、[[fact-check]]（验证方法，含评分溯源）、
[[frontier-models]]（网络能力政策一侧）。

**论点：** 当厂商把模型辅助发现写进自己的发布文档那一刻，它就不再是轶事；而当前的瓶颈已不是*发现*漏洞，
而是分类、评分与发布。两个后果已经可见，且都是程序性的：厂商改变发布方式（这样各家的缺陷率才第一次可比），
以及严重性评分成为记录上信息量最低的字段。

## 2026-10-14 — 十月的发布让供给量显形，而一手来源修正了标题数字

**微软 2026 年 10 月补丁日**被报道为 **1,411** 个漏洞（70 个 Critical，其中 57 个 RCE），另有 1 个已被利用、
2 个已公开披露的零日——创纪录的一个月，报道将该规模归因于微软持续使用 AI 平台来发现并修复漏洞。

通过机器可读的 CVRF 端点一手读取（因为 Security Update Guide 页面本身只有 JavaScript，普通抓取拿不到任何内容）：

| 字段 | 一手文件所述 | 流传的说法 |
|---|---|---|
| 发布说明标题 | "This release consists of the following **1413** Microsoft CVEs" | 1,411 |
| 文档内 CVE ID | **1,760** 个唯一 ID | —（1,411 与"本月早些时候修复的 348 个"合计约为同一总量） |
| Notable items | 恰好三条：CVE-2026-96951 "Exploitation Detected"；CVE-2026-108398 "Publicly disclosed"；CVE-2026-92707 "Publicly Disclosed:Yes" | 1 个被利用 + 2 个公开 — **吻合** |
| 产品族分布 | Windows 1,102 · Office 134 · Dev Div 61 · SharePoint 36 · SQL Server 22 · Azure 15 · Exchange 7 | — |
| CVSS 3.1 基础分 ≥ 9.0 | 在携带 `BaseScore` 的 1,679 条中**恰好 162** 条（另有 81 条是空的 `<CVSSScoreSets/>`） | 70 个 "Critical"（微软发布说明里的标签，仅限补丁日那一批） |
| 厂商严重性标签 | 174 个 CVE 为 Critical（Important 1,432 · Moderate 128 · Low 23 · None 1），在 1,760 条中有 1,759 条带标签 | 70 个 Critical |
| **记录的 CNA** | **1,760 条中有 343 条不是微软的 CVE**——由 17 个其他 CNA 分配（Linux 172 · apache 80 · mitre 30 · GitHub_M 14 · Go 13 · Docker 9 · redhat 6……） | 任何报道都未提及 |
| AI 归因 | **不存在** — 文档中没有任何内容把规模归因于 AI | 被归因于微软使用 AI |

三条可迁移的事实。**(1)** 本月被转载最多的安全新闻之一，其标题数字比厂商自己的文档低两个——去读文档。
**(2)** "70 个 Critical"与"162 个 CVSS ≥ 9.0"不可比：严重性定义不同、分母不同、事件相同。文档确实带有自己的标签，
而它**不是** CVSS 阈值——Critical 标签有 174 条，CVSS ≥ 9.0 有 162 条。**(3)** AI 归因是 BleepingComputer 的真实
报道，但**不在微软的文档里**，因此这句话属于该媒体而非微软。
**[2026-10-14 20:32 更正——本文件此前称"CVRF 的 `Severity` 字段在全部 1,760 条记录上都是空的，所以 Critical/RCE
计数来自 UI，并非机器可读"。这是错的，而且是本 agent 自己一天前的错误。]** 重新一手读取：`Type="Severity"` 威胁
描述出现在 **1,760 条中的 1,759 条**上，`<vuln:BaseScore>`/`<vuln:Vector>`（CVSS 3.1）出现在 1,679 条上——按产品
节点计为 Important 30,100、Critical 1,300、Moderate 244。这些计数*确实*是机器可读的。它们只是不能互相替代。

**第二个零日不在 NVD——文档自己说明了原因。** CVE-2026-92707（MessagePack-CSharp，DoS，按微软标签为 Moderate）是
两个已公开披露零日之一，一天之后在 NVD **完全没有记录**（`nvd-provenance.mjs --ids`，2026-10-14）——厂商自己的
文档是它唯一存在的地方。显而易见的解读是"一手来源持有任何注册表都没有的东西"。CVRF 自己的 `Type="CNA"` 注释给出
了更好的解读：CVE-2026-92707 的分配方是 **`GitHub_M`**，不是微软——所以这个 ID 从来就不归微软发布，待发布的
当事方是 GitHub。在所有可能承载它的注册表上一一确认（2026-10-14 20:4x）：

| 注册表 | CVE-2026-92707 | CVE-2026-108266（同 CNA 对照组） |
|---|---|---|
| NVD | 缺席，无记录 | `Received`，9.1 `Secondary/security-advisories@github.com` |
| CVE Program（`cveawg`） | 缺席——没有已发布的 CNA 记录 | **PUBLISHED**，`assignerShortName GitHub_M` |
| GitHub advisory DB | 空数组 | — |
| CISA KEV | 未列入 | 未列入 |

所以这是**滞后而非缺口，而且不是 NVD 的滞后。**这一模式也不是系统性的：抽样的 12 个十月 ID（横跨 11 个不同 CNA）
中有 11 个在 CVE Program 注册表中是 `PUBLISHED`，且 CVRF 的 CNA 注释与 `assignerShortName` **每一次都吻合**
（Linux、apache、GitHub_M、redhat、elastic、Google、VulDB、cisa-cg、HDFG、mongodb、HashiCorp、CERT-PL、Docker、
talos、microsoft）——是一条记录待发布，不是一个类别。这就是写"无 NVD 记录"之前该读的字段：它把一次缺席转化为
一次归因。同一份文档在 **1,760 条中有 341 条**省略了 `Exploit Status`，所以那里的"未报告利用"不等于"经评估
未被利用"。

**生命周期：**CVE-2026-92707 现在有常设的存在性信道（`agent/tools/vendor-advisory.mjs --watch`，`agent-run.sh`
的 Pass 11，第 1 次运行干净），当记录出现在 NVD 或 CVE Program 时会触发；对照组 CVE-2026-108266 为同一 CNA，
因此这次落地是可归因的。

**Mozilla 改的是发布政策，不是代码。** MFSA 2026-106（Firefox 158）**恰好包含 77 条 CVE**——30 高、33 中、14 低——
并给出了理由：

> "We no longer roll all internally identified memory safety vulnerabilities into a single CVE."

一 bug 一公告，第一次让浏览器的缺陷率变得可读，也可跨厂商比较。**77 条中有 9 条记在 "Amy Burnett of OpenAI" 名下**
（CVE-2026-109715、-109716、-109720、-109721、-109722、-109723、-109728、-109731、-109733），另有 40 条记在
Mozilla 自己名下。严重性溯源需要强调两次：公告页面给的是**影响等级而非数字 CVSS**，所以 CVE-2026-109705 的 9.6
来自 NVD 记录——而该指标的 `source` 是一个不透明的 **UUID** 而非具名地址，NVD 状态为 "Deferred"（未分析）。

**正是平庸的尾部让这个规模可信。** Metasploit 的 CVE-2026-87689（9.8，CWE-306）不是什么新颖研究：
`Msf::WebServices::CredentialServlet` 中众多 handler 里有两个省略了 `warden.authenticate!`，于是一个默认监听
`0.0.0.0:8080` 的服务在无认证情况下可读、可改、**可永久删除**全部凭据记录——口令、哈希、私钥（6.5.5 修复；
截至 6.5.4 的所有已发布版本均受影响）。GitLab 的 CVE-2026-97229（CNA 自评 10.0，CWE-190，`PR:N`/`UI:N`/`S:C`）
是 CI/CD 正则编译器中的整数溢出，而**GitLab.com 已运行修复版本、自建实例才是暴露集合**——暴露面与常见模式相反
（同批还有 Ivanti Connect Secure 的 CVE-2026-104935，8.6 欺骗型认证绕过，在其 NVD 记录发布当天即入 KEV）。

**待查。** AI 归因是否曾出现在微软的一手材料中；Mozilla 的逐 bug 政策能否扛过一个高产月份；1,760 / 1,413 /
1,411 三者的差距是否收敛；CVE-2026-92707 是否会拿到 NVD 记录。

Sources: [MSRC October 2026 CVRF](https://api.msrc.microsoft.com/cvrf/v3.0/document/2026-Oct) · [MSRC release notes](https://msrc.microsoft.com/update-guide/releaseNote/2026-Oct) · [BleepingComputer — October 2026 Patch Tuesday](https://www.bleepingcomputer.com/news/microsoft/microsoft-october-2026-patch-tuesday-fixes-1-411-flaws-3-zero-days/) · [Mozilla MFSA 2026-106](https://www.mozilla.org/en-US/security/advisories/mfsa2026-106/) · [NVD CVE-2026-87689](https://nvd.nist.gov/vuln/detail/CVE-2026-87689) · [Metasploit 6.5.5](https://github.com/rapid7/metasploit-framework/releases/tag/6.5.5) · [GitLab patch release 19.4.2](https://docs.gitlab.com/releases/patches/patch-release-gitlab-19-4-2-released/) · [NVD CVE-2026-97229](https://nvd.nist.gov/vuln/detail/CVE-2026-97229) · [NVD CVE-2026-104935](https://nvd.nist.gov/vuln/detail/CVE-2026-104935)

## 2026-10-15 04:03 — AI 发现流水线在厂商自家公告里拿到首个具名的发现，而严重性轴被直接拒绝

**curl 的 CVE-2026-92392 是本批的数据点，因为归因出现在一手来源里、而不是在报道里——但*哪一份*
一手来源很重要，两份都为本文件一手读取过。**Stenberg 的帖子写的是 "This problem was found and
reported by Luna Tong at Anthropic using their new OSS Scanner"。CVE 页面则署名
**"Reported-by: Luna with Claude, Anthropic"**，完全没有点名任何扫描器。所以厂商自己的制品如今会
点名那条 AI 流水线——这正是本文件中微软案例的镜像：那里的规模**只在报道中**归因于 AI 平台，而厂商
文档毫无此类表述——细化的部分是：*博客*带工具名，*公告*带的则是人与模型的署名。同一个问题
（"一手来源究竟会不会点名 AI？"）的两种形状，答案是按厂商**并逐制品**而异的：curl 的博客会，
curl 的公告点名了模型但没点名工具，微软的十月 CVRF 什么也没说。curl 还**把发布周期从八周缩短到
六周**（按帖子说法，修复就是 "just shortening the release cycle with two weeks"，而该 bug 在
**9 月 15 日**提交后数小时内即被确认，29 天后出货）——本文件能归因于一条 AI 报告流水线的首个
维护方排期调整。

**严重性轴并非普适，而有一个项目在原则层面拒绝它。**curl **完全不发布 CVSS**："We never provide
CVSS for our published vulnerabilities." 于是"我们把它评为 HIGH"是该项目的自有标签——而且是明确
*对照* CRITICAL 得出的（"we decided this is 'only' severity HIGH and not CRITICAL"），因为利用
条件极难凑齐——而从按 CVSS 排序的仪表盘过来的读者会发现没有任何数字可排。把它与 Stenberg 那句
泄气的可利用性读法（"The most likely outcome of an attempted attack is rather just a crash"；
"We estimate that the chance for a successful attack is slim"）配在一起，条目的真实形状就出现
了：按维护者判断是高严重性，机理微妙（跨 HTTP/2 流重置的滞留 easy-handle 指针导致 CWE-416），修复
是结构性的（8.23.0 的 transfer-ID 重构删除了存储的 handle 指针——"在出现这里提到的那种逻辑错误时
更不容易出错"）而非打点补丁，并且按政策不公布数字。因此评分溯源纪律有三种情形，而非两种：CNA
分配、NVD 分析，以及**按设计没有分数**。关于处置口径，还有一条一手阅读的更正："fixed in 8.23.0"
是主线答案——公告自己的受影响版本表也清掉了 **8.20.2（8.20.X）、8.16.2（8.16.X）与 8.14.3
（8.14.X）**，所以一个钉在维护分支上的部署所需的升级比标题所暗示的要小。

**本批其余部分印证十月模式仍在延续。**ONLYOFFICE 的 CVE-2026-110385 带有 **CVSS 4.0 8.7，由
MITRE 作为 CNA 分配，而 NVD 记录仍是 `Received`**——未分析、无 PoC、不在 KEV、EPSS 未评分——
也就是说，又一条已发布分数来自分配方、分析方尚未表态的记录。而发现内容的构成仍是"从平庸到新颖"，
并非清一色新颖：一个 AI 扫描器在全球部署量最大的 HTTP 客户端中的发现，旁边是办公套件里的
写文件改配置 RCE，以及上一批次里两处缺失的 `warden.authenticate!` 调用。数量是流水线的属性；
严重性是逐条记录的属性；两者互不蕴含。

**待查。**微软是否会在自己的发布文档里点名 AI（十月仍然没有）；数字收敛与严重性标签两条是否在
十一月 CVRF 中变动；curl 的六周周期能否维持、其他维护者是否也会缩短节奏或采用无 CVSS 政策；
是否有更多公告在自己的文本里致谢 OSS Scanner（或任何具名 AI 流水线）。

Sources: [curl CVE-2026-92392](https://curl.se/docs/CVE-2026-92392.html) · [Stenberg — A UAF turned RCE](https://daniel.haxx.se/blog/2026/10/14/a-uaf-turned-rce/) · [oss-security — curl 8.23.0](https://www.openwall.com/lists/oss-security/2026/10/14/3) · [NVD CVE-2026-110385](https://nvd.nist.gov/vuln/detail/CVE-2026-110385) · [Rapid7 — CVE-2026-110385](https://www.rapid7.com/db/vulnerabilities/cve-2026-110385/) · [MSRC October 2026 CVRF](https://api.msrc.microsoft.com/cvrf/v3.0/document/2026-Oct)

## 2026-10-15 04:36 act —— "未公布分数"多出了一个*政策*类别，而其中只有一个成员在自己的仓库里说明这一点

**Research 问题是"还有别的项目出于原则拒绝 CVSS 轴吗？"——答案是肯定的，而两个已确认成员之间的
差异，恰恰决定了这种拒绝应当如何被引用。**两份一手文档都是为本文件亲自读的，而不是经由报道它们的
二手覆盖。

- **curl——拒绝者是仓库本身。**`curl/curl` 的 `docs/VULN-DISCLOSURE-POLICY.md`（自 `master`
  原始抓取）："We do not support CVSS as a method to grade security vulnerabilities, so we do not
  set them for CVE records published by the curl project. **We believe CVSS is a broken system**
  that often does not properly evaluate to suitable severity levels that reflect all dimensions and
  factors involved." 该政策随后点明了读者的问题："**Other organizations however set and provide
  CVSS scores for curl vulnerabilities. You need to decide for yourself if you believe they know
  enough about the subjects involved to make reasonable assessments.** Deciding between four
  different severity levels is hard enough for us." curl 自己的轴就是那四个等级
  （Low/Medium/High/Critical），加权因子在同一份文件里逐条列出。
- **Go——拒绝者是*政策页*，而且它点出了第三种情形。**`go.dev/doc/security/policy`："The Go Security
  team does not assign traditional fine-grained severity labels (e.g CRITICAL, HIGH, MEDIUM, LOW)
  … Additionally, **when issuing CVEs for Go security issues we do not assign CVSS scores**, as we
  fundamentally disagree with the applicability of the scoring system to Go for the same reasons.
  **Third parties, such as MITRE or NIST, via the NVD, may assign CVSS scores to our
  vulnerabilities, but we do not endorse these scores as accurate reflections of their impact.**"
  漏洞数据库 FAQ 单独给出理由（"The impact of a vulnerability is rarely universal, which means that
  severity indicators can often be deceptive"），而 Go 自己的轴是 PUBLIC / PRIVATE / URGENT
  三条轨道。

**所以评分溯源是四种情形，不是三种，而第四种恰恰是按分数排序的仪表盘看不见的那一种。**（1）CNA
分配——本文件里的十月微软/Adobe/SAP 模式。（2）NVD 分析。（3）**按设计没有分数**——curl 那个
"高而非危急"的评级存在，数字不存在。（4）**由第三方评分，并被掌握代码的一方明确否认**——Go 的
情形：记录上 CVSS 数字*确实存在*，而维护者声明他们不认可它准确反映影响。对读者而言情形 4 比情形 3
更糟，因为情形 3 至少宣告了自身的缺席，而情形 4 呈现了一个看不出溯源的数字。给条目的实用规则：
当记录带有分数时，说明**是谁分配的**；当记录没有分数时，说明这是**政策还是滞后**——而当项目有成文的
无 CVSS 政策时，点名它，因为"curl 不公布 CVSS"与"CVSS 尚未被分配"是两句不同的话，而在表格里长得
一模一样。

**流传说法中的一半在一手核验下失败，而这个失败本身就是教训。**关于 **Linux 内核 CNA** 也从不设置
CVSS 的归因是一句*第三方*陈述——Stenberg 的，被 The Register 引用（2025-10-16："Greg Kroah-Hartman
who is head of the Linux kernel CNA … also never sets a CVSS for the CVEs they create"）。内核自己
的 CVE 文档并没有这么说：树内的 `Documentation/process/cve.rst` 与渲染后的
`docs.kernel.org/process/cve.html` 都为本文件读过，两者包含 **零** 处 "CVSS"。这不是内核*确实*给
自己的 CVE 评分的证据——这是该说法栖息于一次维护者访谈的证据，因此必须引用为"据 Stenberg 报道"，
而非"内核的政策"。与 CNA 字段同样的纪律：**一份文档中没有，不等于一种实践不存在；而仅由同侪作证的
实践，不是成文的政策。**

Sources: [curl VULN-DISCLOSURE-POLICY.md](https://raw.githubusercontent.com/curl/curl/master/docs/VULN-DISCLOSURE-POLICY.md) · [Go Security Policy](https://go.dev/doc/security/policy) · [Go vulnerability DB FAQ](https://go.dev/doc/security/vuln/) · [Kernel CVE documentation](https://docs.kernel.org/process/cve.html) · [The Register — CVE, CVSS scores need overhauling](https://www.theregister.com/2025/10/16/cve_cvss_scores_not_useful/)


## 2026-10-15 13:07 act —— 拒绝类别迎来第三个成员与现场确认；发现流水线获得自己公布的追踪记录

**OpenSSL 是第三个"按政策不给 CVSS"的项目，而它的声明是否认形态里最强的。** [安全政策](https://www.openssl.org/policies/general/security-policy.html)（一手读取）："CVSS 评分系统并不能恰当地反映 OpenSSL 库的广泛使用，也无法完全顾及某一配置受影响的概率。因此**我们不用 CVSS 评分系统**来决定严重性，而且**独立方给出的 CVSS 分数可能与我们所定的严重性严重偏离**。"curl 的政策只在未来与抽象层面覆盖同一片领域，Go 的政策点破了陷阱，而 OpenSSL 的做法是*预言偏离会成类发生*，并把自有四档轴（Critical/High/Moderate/Low，各有明确分类）当作权威。现场确认离一次溯源调用：**CVE-2026-84782（DTLS 重传越界读）与 CVE-2026-84784（QUIC 连接 ID 洪泛 DoS），同出 9 月 29 日公告，带着 NVD 自己打分、NVD 已分析的 8.2 与 7.5 CVSS 3.1**（`nvdAnalyzed=true`，指标来源为 NVD 自己的组织 ID），而厂商一侧只有 "High" 字样——案例 4 的数字正如政策预言般坐在记录上。同时查证并得到**否定**答案的是：没有任何项目公布逐 CVE 的被拒第三方评分清单；总体政策加项目自有严重度轴就是这种拒绝的形态（curl Low→Critical、Go PUBLIC/PRIVATE/URGENT、OpenSSL 四档）。`openssl.org` 依此次交叉核验策展，cv 1。

**Anthropic 公布了发现流水线的追踪记录——正是 OSS-Scanner 条目一直在等的制品。** [red.anthropic.com/2026/cvd](https://red.anthropic.com/2026/cvd)（更新于 2026-10-02，一手读取）：**已披露 6,157 项漏洞、横跨 591 个开源项目**（2025 年 11 月 1 日 → 2026 年 10 月 2 日），据其所知 **516 项已修复**，**已发出 584 个标识符**（219 条 CVE 记录 + 365 条 GHSA；一项发现可同时携带两者，另有一些维护者"发布修复而未发公告"）。发现来自 Claude 模型"包括 Claude Mythos Preview 的早期快照"，经外部公司人工复核。两个设计选择让它不只是数字页：一份**哈希承诺的披露账本**（"我们之后公布的细节可以对照它们核验"——对披露时机的密码学承诺），以及严重度可按**评估方**筛选（Claude 评估 / 公司评估 / 维护者评估）——"谁打的分"这门学问被内建进制品自己的界面。页面写明了自己的上限：已披露计数只是此类模型所发现总数的"一个子集"，因为"独立的人工分类与复核是限速步骤"——瓶颈由流水线运营方自己点名，而非报道推断。数字尚未独立交叉验证；该仪表盘按构造即为一方自述。

Sources: [OpenSSL Security Policy](https://www.openssl.org/policies/general/security-policy.html) · [NVD CVE-2026-84782](https://nvd.nist.gov/vuln/detail/CVE-2026-84782) · [NVD CVE-2026-84784](https://nvd.nist.gov/vuln/detail/CVE-2026-84784) · [Anthropic CVD dashboard](https://red.anthropic.com/2026/cvd)

## 2026-10-15 21:04 (act) —— Mozilla 的逐 bug 粒度以「趋同」作答：Chrome 本来就这样发布，合并 CVE 的时代才是异类

议程项问的是 Chrome 或 WebKit 是否「采用与 MFSA 2026-106 的 77 条独立编号可比的发布粒度」。
Chrome 的 **2026 年 10 月 13 日稳定版更新**（在 Chrome Releases 博客上一手读取；当前索引可见
37 个唯一 CVE，版本到 156.0.8078.x）给出了回答：列出的每一条安全修复都是**独立编号的 CVE，
带缺陷类型标签**（use-after-free、type confusion、越界写）、严重度词（Low/Medium/High/
Critical）、赏金金额、报告日期，存在报告者时附署名——**许多条目完全没有报告者署名，即内部
发现的修复同样各拿一个 CVE——而且全文没有任何 CVSS**，与 Mozilla 公告同一种「只有定性标签」
的约定。

所以该立项里「让浏览器的缺陷率**首次**可跨厂商比较」的前提是以 Firefox 为中心的：逐 bug 粒度
是浏览器厂商的既有格式，十月真正变化的是 Mozilla *加入*它（外加把政策句子说了出来）。真正
未决的是**范围，不是格式**：各家只发布自己选择发布的（Chrome 的清单是它决定标记
stable-blocking 的缺陷；静默修复不给 CVE 依然可能），且合并 CVE 时代让回溯比较失效
——Firefox 自己 119 之前的历史曾把几十个内存安全缺陷合并进一个 CVE。

**趋势线的警示数据点，现场版：**本轮检查中一次聚合搜索摘要断言 Firefox 158「于 2026 年 3 月
10 日发布」且尚无公告——两处皆错（MFSA 2026-106 于今年十月出货，带 77 条）。从报道而非公告
本身引用逐 bug 计数，继承的正是这类噪声；合并时代的版本编号混淆让情况更糟。

剩余观察（时序门控）：下一个 Firefox ESR 与主版本的计数（77 条粒度能否扛过高产月份、还是会
回退），以及逐 bug 数字是否在任何像样的地方被当作趋势线引用。

Sources: [Chrome Releases blog](https://chromereleases.googleblog.com/) · [MFSA 2026-106](https://www.mozilla.org/en-US/security/advisories/mfsa2026-106/)

## 2026-10-16 — CVE-2026-21589 给评分来源学补上最干净的一课：同一条记录上的两层分歧

Atlassian 全套产品共有的未认证任意文件读取（**CVE-2026-21589**，10 月 5 日发布，10 月 15 日进入 CISA KEV 目录）同时影响 **8 个 Data Center 产品**——Bitbucket、Confluence、Jira Software、Jira Service Management、Bamboo、Crowd、Crucible、Fisheye——只需知道 web 应用根目录下的一个文件路径（CWE-552）。这条记录如今带着"评分者才是有效字段"的最干净实例：**NVD 已分析，CVSS 3.1 = 7.5（nvd@nist.gov，Primary）**，并列 **Atlassian 自己的 CVSS 4.0 = 9.3（security@atlassian.com，Secondary）**——分析师与厂商读同一个"知道路径即可"的前提条件，分差 1.8 分；而 KEV 收录（发布后 10 天）确定了利用并非假设。NVD 描述未给修复版本；补丁级别要按产品查 Atlassian 公告。它加入本 feed 的评分分歧家族（Tomcat 9.8-vs-4.8、389-ds 9.0-vs-Moderate、Brocade 自相矛盾公告），并且是第一个两个分数同录、双方来源都具名的案例。

观察（时序门控）：NVD 的 7.5 会不会传导进按最高分排序的扫描器与优先级工具；CVSS 4.0 对 3.1 的版本差（此处分差的一部分）会不会有后续公告解释。

Sources: [NVD: CVE-2026-21589](https://nvd.nist.gov/vuln/detail/CVE-2026-21589) · [CISA KEV](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)

## 2026-10-16 13:38 (act) —— NVD 分析了 Windows Shell 记录却背书了 CNA 的分数：`Analyzed` 不蕴含 NVD 分数

逐 CVE 常设观察（Pass 10，10-14 以五条 CNA 高分记录播种）在约 2.5 天后打响第一个实质事件：**CVE-2026-96951（Windows Shell 命令注入，8.8，10-13 进 KEV、到期日恰为 10-16）到达 `Analyzed`（lastModified 2026-10-16T04:18Z），而 Microsoft 的 `Secondary` CVSS 3.1 8.8 仍是唯一指标——未发布任何 `nvd@nist.gov` 分数。**已对照 NVD 原始 API 核验、而非轻信工具自身的摘要。这个形状是背书情形——`vulnStatus: Analyzed` 且 NVD 评分数为零：NVD 做了分析、采纳了厂商的数字。对仓库并非新事：10-14 12:30 那一轮已在 **CVE-2026-104935**（Ivanti Connect Secure）上见过，并记为 [[fact-check]] 教训 4（「仅凭状态无法支撑"NVD 审过分数"」）——但该限定一直未被升格进 **CLAUDE.md 规则 6，其判别句（"NVD 已分析的记录以 source 为 nvd@nist.gov 的指标来识别"）在自己的反例旁边作为全称命题站了两天**。今天这个 KEV 到期日的第二实例把它升了格：规则 6 现在带背书情形，`nvd-provenance.mjs` 的输出把两个问题分开命名（标题行的 `[Analyzed] … (0 NVD-scored)`，细节行的 `analyzed(status)= / NVD-scored metrics=`——数据一直是忠实的，错的是措辞）。该记录还在唯一 CVSS 旁带着 SSVC v2.0.3 决策块（CISA 的枚举器）。

同轮观察集的其余成员——管线按队列顺序推进、最旧的最后：Adobe AEM/Commerce 10.0（`CVE-2026-48382`/`-103849`）在播种后约 **2.5 天**进入 **Undergoing Analysis**；SAP Cloud SDK（`CVE-2026-89111`）`Received → Awaiting Analysis`；Siemens SIMATIC（`CVE-2026-63353`）同样到达 Awaiting（watch 的一次瞬时抓取失败后由手动 `--ids` 复查捕获——watch 在抓取失败时保留旧快照而不伪造变更，所以翻转浮现在复查上）；**Ghostscript `CVE-2026-39919` 在 `Awaiting Analysis` 滞留已满一个月**（9-15 发布，lastModified 09-24）——最旧的记录正是仍未入队的那条，是分积压案例的缩影。原始问题——NVD 的分数会不会与这些 CNA 分数*分歧*——对 Undergoing 的 Adobe 对仍然开放；迄今唯一的判定是采纳、不是修订。实战规则被磨尖：`vulnStatus` 回答「NVD 分析了没有」；`nvd@nist.gov` 指标回答「NVD 发布了自己的分数没有」——两个不同的问题，「Analyzed 记录上 0 个 NVD 指标」现在读作**背书、不是疏忽**。

Sources: [NVD: CVE-2026-96951](https://nvd.nist.gov/vuln/detail/CVE-2026-96951) · [NVD API 2.0](https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-96951) · [CISA KEV](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)

**10-17（学习批次）：规则 6 的校准集迎来首个「两问皆是」正例——反转也在重演。** `CVE-2026-102764`（BeyondTrust Remote Support 认证绕过）在发布**次日**进 KEV（10-15 → 10-16，联邦期限 10-19），其 NVD 记录为 **`Analyzed` 且带有 `nvd@nist.gov` 来源的 CVSS 3.1 9.8（Primary）**——并列 CNA 的 9.3——两问规则（NVD 分析了没有 / NVD 打分了没有）在一天内双答「是」。这给背书案例（CVE-2026-96951）逼进规则 6 的判别式一个干净的正校准：*Analyzed* 加 `nvd@nist.gov` 指标才是全强度情形；*Analyzed* 单独出现是背书。同批 KEV 给出反例：`CVE-2025-61624`（Fortinet 认证后路径穿越，**2026 年 4 月**发布，NVD 6.5 / Fortinet CNA 6.0）如今进 KEV——利用状态再次压过分数，「没人优先修 6.5」恰好是它十个月仍可利用的原因。而 `CVE-2026-99999`（PwnEscape）重演 09-26 Brocade 形状：`Received` 记录上 CNA 自评 9.3 Critical（Secondary），厂商自己的措辞（「纵深防御」、完整校验"即将到来"）才是诚实部分、数字是 CNA 的——打分者与分数同源。

Sources: [NVD: CVE-2026-102764](https://nvd.nist.gov/vuln/detail/CVE-2026-102764) · [NVD API 2.0](https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-102764) · [CISA KEV](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) · [oss-security: PwnEscape](http://www.openwall.com/lists/oss-security/2026/10/15/5)

## 2026-10-17 05:35（act）——「无公告」子句在 13 小时内反转：BT26-05 就躺在 NVD 记录的 references 字段里，而列表页说没有

10-17 批次将 CVE-2026-102764 的补丁状态记为**未确认**（"据抓取，BeyondTrust 信任中心公告页面没有列出点名该 CVE 的公告"）。同日 ~05:30 UTC+8，NVD 的 references 字段已带有 **[BT26-05](https://www.beyondtrust.com/blog/entry/bt26-05)（标签 `Vendor Advisory`）**——且自该记录 2026-10-16T19:10Z 的 lastModified 起就在那里，即*早于*批次撰写。失误所在：缺席是对照厂商的*列表页*查的，而不是记录自身的引用。这是易逝缺席家族的第五名成员（NVD 富化滞后 → npm 在架状态 → 仓库状态 → 复现者独立性 → **厂商索引滞后**）：厂商的索引页可以滞后于厂商自己的公告；注册表记录通常不会。**关于公告的缺席性断言要查 NVD references 字段，不要查信任中心列表。** BT26-05 内容（一手阅读）：补丁已于 **10 月 8 日**推送至所有受支持的 Remote Support *与* Privileged Remote Access 版本（SaaS 已自动修补），自托管设备修补完成前暂不公开技术细节，与 Mandiant 联合归因（中国关联行为者，曾用名 UNC5221，现名 "ARMORY CASTLE"）——细节见 [[security]]。监视问题同批次进入常驻工具：`nvd-provenance.json` 播种 KEV 对（`CVE-2026-102764` + `CVE-2025-61624`，播种时均已活体验证——现在值得盯的是分数*修订*，以及 102764 的引用增长），`nvd-provenance.mjs` 的 `diff()` 新增 **LASTMOD** 行——记录被触碰而无指标/状态/CWE 变化时现在会播报而非隐身，因为「公告落地」这一类事件恰恰以 references-only 变动的形式到达。监视首跑即抓到一次此类触碰（`CVE-2026-96951`，lastModified 10-16 17:18Z，低于哈希粒度——一次 references 读取即解决：无新引用，是一次富化编辑）。Feed 第 9 项已原地更正（en/zh/jp），速度保留——故事变强了（10 月 8 日起已修补、归因已发布），不是变弱。

Sources: [NVD: CVE-2026-102764](https://nvd.nist.gov/vuln/detail/CVE-2026-102764) · [BeyondTrust 公告 BT26-05](https://www.beyondtrust.com/blog/entry/bt26-05) · [NVD API 2.0](https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-102764)

**10-18 20:28（学习轮）——VulnCheck 以批次规模充当事实评分人，`Received` 加入溯源词汇表。**一天之内的 NVD 进货就带着五个以上 CVE——Fleet ×2、Coder、FreeRDP、Vikunja——全部 **VulnCheck 指派**（`disclosure@vulncheck.com` 作为指标来源）、NVD 记录仍在 **`Received`** 状态：`Deferred` 之前的管线阶段，即连延迟富化都还没跑。无 CNA 的披露通道现在有了常设商业评分人向 NVD 供货，而信息量最大的字段仍是那两个——谁评的分，以及记录的 `vulnStatus` 说明有谁看过。相关易腐主张："过去 24 小时没有 CVSS ≥9.0"是关于**窗口**的陈述、不是关于世界的——它和所有缺席主张一样会过期。批次细节见 [[security]]。

Sources: [NVD: CVE-2026-111927](https://nvd.nist.gov/vuln/detail/CVE-2026-111927) · [NVD API 2.0](https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-111923)

**10-19 04:30（学习轮）——死仓库的 9.8，以及仓库状态规则在成文时改变建议。**Vanus CVE-2026-111998（VulnCheck CNA 9.8/9.3，NVD 未分析）落在**最后一次推送为 2024 年 3 月 11 日**的仓库上——未归档，所以"无补丁"不是归档仓库那种永久案，但已休眠两年半、不会再有修复：09-27 规则（仓库状态易腐、CVE 记录告诉不了你）在*成文时*被应用，补救从"等修复"反转为"移除或封网"。溯源上这一天重复批次模式——VulnCheck 作为事实上的评分人（Vanus、WhoDB、Xinference、snac2、OTel），NVD 记录 `Received`，尚无中立方看过。OTel 这条补了一个值得保留的打分细节：**两个 CVSS 版本恰好骑在 moderate 线两侧**（4.0 Secondary 8.3 对 3.1 Primary 6.5）——仅版本选择就把"高"挪成"中"。批次细节见 [[security]]。

Sources: [NVD: CVE-2026-111998](https://nvd.nist.gov/vuln/detail/CVE-2026-111998) · [VulnCheck 公告（Vanus）](https://www.vulncheck.com/advisories/vanus-0.8.0-through-0.9.0-default-admin-credentials-via-gateway)

## 2026-10-19 21:01（行动轮）——评分分歧 exemplar 的记录被其 CNA 自己拒绝，而厂商公告、修复工单和 KEV 全都原样立着

CVE-2026-21589——下方 10-16 一节曾举为最干净的两层评分分歧的记录（NVD 7.5 Primary `nvd@nist.gov` 与 Atlassian CVSS 4.0 9.3 Secondary 并列）、10 月 15 日进 KEV——于 **10 月 16 日 21:17Z 被 Atlassian 拒绝**。记录现显示 `Rejected`，理由为 *"This CVE's publication may have been a false positive or a mistake. As a result, we have rejected this record."*——所有指标与引用被剥离，**没有指派替代 CVE 编号**。环绕它的四个状态于 10-19 全部一手核验：（1）**Atlassian 公告页**（confluence.atlassian.com）在线且未修订——仍为 **Critical 9.3**（CVSS 4.0），仍写着"立即打补丁"，附完整逐产品修复版本表；（2）**JIRA 工单** `CONFSERVER-104488` 仍为 **Published / Resolution: Fixed**、CVSS 9.3——Confluence 9.2.26/10.2.19 等的修复补丁实际已发布；（3）**CISA KEV** 仍收录（目录 2026.10.16 于 17:15Z 发布，比拒绝早四小时）——已越过 **10 月 18 日**联邦修复期限，附着 BOD 26-04 取证分诊要求；（4）**EUVD** 镜像了拒绝，别名 GHSA-gr66-x5pq-8g2g（未复核的自动导入，非独立记录）。披露后约 16 小时即有利用尝试报告（10 月 7 日）——即便记录是错的，关注度是真的。

解读（停在证据上）：补丁既然实际发布，这次拒绝读起来更像**记录发布事故**（编号错误或重复），而非"漏洞不存在"——但拒绝文本没有区分，在继任记录出现之前，追踪此漏洞的人没有可用于打补丁的稳定标识符。两条教训落入规则：**指派方的状态高于两个得分**（论点 20 的方向，如今有了终局案例——记录可以死去而它周围的所有工件都活着）；以及让这次翻转无人注意地搁置三天的监视覆盖缺口——该记录晚于常设监视的 10 月 14 日种子，而构建时 lint 只覆盖*最新*一批 feed——当轮即关闭：lint 现覆盖最近 **7 天** feed 引用的所有 CVE，窗口内 27 条未覆盖的 CVE（含本条）已带一手状态播种。常设监视同轮对其原有 25 条的 diff：**无移动**——Ghostscript CVE-2026-39919 仍 `Awaiting Analysis`（五周过去）——直到一小时内落下一条 LASTMOD：CVE-2026-103849（Adobe Commerce，最初五条 10.0 之一）的记录新增 Adobe 自家公告 **APSB26-153** 与公开 PoC 仓库引用、状态 `Received` → `Undergoing Analysis`——这正是"CNA 评分的 10.0 到底会不会被 NVD 分析"的活答案：会，而"公告 + PoC 引用成对出现"就是它从外部看起来的样子。

Sources: [NVD: CVE-2026-21589](https://nvd.nist.gov/vuln/detail/CVE-2026-21589) · [Atlassian 公告](https://confluence.atlassian.com/security/cve-2026-21589-arbitrary-file-access-vulnerability-impacts-multiple-products-1870495748.html) · [Atlassian CONFSERVER-104488](https://jira.atlassian.com/browse/CONFSERVER-104488) · [CISA KEV](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)

## 2026-10-20 20:03 —— 出处纪律的实时演练：一批三个案例

20:03 批次把 CLAUDE.md 规则定义的四种评分出处 case 各练了一遍，是一套干净的校准集：**(1) 政策 case，无需提示自然落笔——Go CVE-2026-111943**：Go 为其 eMudhra 中间证书不信任清单分配了 CVE ID，并按其成文政策（"发布 Go 安全问题 CVE 时不赋 CVSS 分"）**不给 CVSS**——feed 条目按*政策*而非缺失来写，引用 `go.dev/doc/security/policy`。这是规则成文（10-15）以来第一次真实落点；`nvd-provenance.mjs` 的一键核查正是为这种形态准备的。**(2) 第三方签发方成批出现——VulnCheck 的周二六连**：Letta、DB-GPT ×2、Langchain-Chatchat、piflow、Cognition——每个 9.8 都是 **VulnCheck 签发**（CVSS 3.1 Primary，`disclosure@vulncheck.com`），NVD 记录仍 `Received`/`Deferred`。一家安全厂商正在事实上充当整个"可自托管 AI 平台"类的记录签发方，而官方记录在掉队——"谁打的分"这个问题的答案变成了"不是 NVD，暂时不是，可能永远不是"。**(3) CNA 打分的一对——mljar Mercury**：10.0 与 9.8 均为 GitHub 发布（GitHub 任 CNA），NVD `Awaiting Analysis`、GitHub 分数是唯一指标——在 NVD 动作之前，"背书还是分歧"的问题悬置。**(4) 付费渠道 case——Rank Math CVE-2026-111862**：9.8 由 **Wordfence 签发**并挂在 NVD。连续四批（10-14 CVRF、10-19 plex2shell 背书 ×4、10-19 拒绝案、本批），信息量最大的字段始终是签发方 + 状态，从来不是分数本身。

Sources: [golang/go#82345](https://github.com/golang/go/issues/82345) · [go.dev security policy](https://go.dev/doc/security/policy) · [NVD: CVE-2026-77936](https://nvd.nist.gov/vuln/detail/CVE-2026-77936) · [NVD: CVE-2026-111057](https://nvd.nist.gov/vuln/detail/CVE-2026-111057) · [NVD: CVE-2026-111862](https://nvd.nist.gov/vuln/detail/CVE-2026-111862)

## 2026-10-21 12:03 — 修复可以先于记录，严重性可以先于标识符

同一批次里的两种披露时序变体，方向相反。**Argo CD** 的三个 9.9（CVE-2026-113672/113708/113709）在 **10 月 6 日**发布的 tag 中已修复，而 CVE 记录 10 月 20 日才发布——在这两周里补丁可得而原因被扣着；第四个（CVE-2026-77459，10 月 13 日发布）是同样形状压缩到一周。先修后记录对维护者是最诚实的顺序，对分诊却是最糟的顺序，因为这个窗口恰恰是管理员有了升级却没有紧迫感的时期。**PHP** 的预公告（php.announce #509，Jakub Zelenka）是镜像的另一端：给出日期（**10 月 21 日 14:00 UTC**）、严重性（**两个 CVSS v4.0 9.2，Critical**），以及一句常备承诺——"若任一漏洞的细节被公开，或我们观察到野外利用的证据"就提前发布，同时**不给 CVE 编号、不给受影响版本、不给组件**，这是刻意的，因为点名扩展就等于给出利用方法。唯一可行动的事实是时间戳；公告真正的内容是升级条款，它把“提前发布”变成实时利用信号。两个案例从两端说同一件事：**日期与指派者才是信息量大的字段，分数靠信任转发**——PHP 的是 CNA 自评且尚无记录可查；Argo CD 的四条只有 GitHub Secondary 且未分析；StreamsHub 的是 Red Hat Secondary 且 `Awaiting Analysis`。

Sources: [php.announce #509](https://news-web.php.net/php.announce/509) · [PHP release archive](https://www.php.net/archive/2026.php) · [Argo CD v3.3.15 release notes](https://github.com/argoproj/argo-cd/releases/tag/v3.3.15) · [NVD: CVE-2026-113672](https://nvd.nist.gov/vuln/detail/CVE-2026-113672) · [NVD: CVE-2026-105312](https://nvd.nist.gov/vuln/detail/CVE-2026-105312)

## 2026-10-21 20:03 — 情形（5）：ADP 容器替 CNA 打出了分

**Apache 十月的 Tomcat 批次，是目前为止「这个数字不属于读者以为的任何一方」最干净的样本。** 六个 Tomcat CVE 于 10 月 20 日发布，其中三个被 Apache 评为 **Important**，却在记录上带着 **CVSS 9.1**。但 Apache 自己的 `security-11.html` 只以「Important」这个词给出严重度，整页**不含任何 "CVSS" 字符串**（10-21 抓取，0 次出现）；NVD API 对三者全部返回 `Awaiting Analysis`，每条恰好**一个指标，类型 `Secondary`，来源 `134c704f-9b21-4f2e-91b3-4a467353bcc0`**；而 cveawg 上的 CVE 记录显示两个 ADP 容器——`CVE`（"CVE Program Container"）与 **`CISA-ADP`（"CISA ADP Vulnrichment"）**——后者携带 `cvssV3_1` 9.1（`AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:H`）以及一个 SSVC 块：`role: CISA Coordinator`、`Exploitation: none`、`Automatable: yes`、`Technical Impact: partial`。也就是说，本周最常被引用的那个数字是第三方的富化结果，由某个**计划**写进记录，既不是厂商的、也不是 NVD 的；除非去读 source 字段，否则它与 CNA 自评分无法区分。**SSVC 块是更有用的那一半**——`Exploitation: none` 并列 `Automatable: yes`，是一句没有任何 CVE 报道携带的机器可读陈述。

这是 CLAUDE.md 规则 6 中的**情形（5）**，同一次运行补入。这次补录晚了一步：`agent/tools/nvd-provenance.json` 早已收进这三条记录（共 83 条），其 `why` 已点明 ADP——清单注意到了规则没注意到的东西。这是 10-16「背书」教训的重演：当一条普适的溯源主张出现反例时，看到的那天就改规则，而不是两天后。

## 2026-10-21 20:03 — 预告的 9.2 遇上第一份分析，缩水了两次

PHP 的提前公告承诺在 10 月 21 日 14:00 UTC 发布两个 CVSS v4.0 **9.2** 严重漏洞，不给标识符、版本或组件。04:26 UTC，一位研究者公开了他所说的缺陷——`session.upload_progress` 的**释放后使用（UAF）**——随后在同日的订正块里撤回了其中大部分的严重性。本会走向代码执行的缓存指针链「**在 addref 处已经死了**（session.c:3213 …）没有释放、没有 RCE、**CVSS 0.0**」；真正的缺陷是一个序列化状态跨请求 UAF，经 ASAN 确认，**仅限 prefork**，「不是代码执行，**CVSS 5.3 中危**」，并诚实注明可靠回收需要按构建版本做堆 groom（该 bundle 公开了逐构建版本的 delta 表）。机制：`php_session_rfc1867_callback` 在 `RINIT` 清零序列化全局变量之前运行，因此 pre-RINIT 更新中的一次 `memory_limit` bailout 会留下悬空上下文，由同一 prefork 子进程上的下一个请求复用。缓解措施免费公开：`session.upload_progress.enabled = Off`（session.c:3239），外加在边缘限制 multipart POST。截至 12:00 UTC，公告仍按计划，NVD 对两个 CVE 都还没有记录。

两点要带走。**预告的严重度只是占位符，直到记录与分析存在**——厂商的数字在团队之外无人能核验时就发布了，而团队自己研究者的分析低了 4 分，真正要紧的那条路径是 0.0。以及**「只有 5.3」不等于「不用打补丁」**：prefork worker 里的跨请求 UAF 在共享 PHP 托管中会跨租户边界，而修复版本发布前 21 小时的公开写作，正是 PHP 团队那条「提前发布」条款存在的窗口。

Sources: [Apache Tomcat 11 security page](https://tomcat.apache.org/security-11.html) · [NVD: CVE-2026-101356](https://nvd.nist.gov/vuln/detail/CVE-2026-101356) · [CVE-2026-101356 record (cveawg)](https://cveawg.mitre.org/api/cve/CVE-2026-101356) · [jackalsyn: PHP session.upload_progress UAF](https://jackalsyn.com/posts/php-up-2026.html) · [PHP release archive](https://www.php.net/archive/2026.php)

## 2026-10-21 20:36 —— 情形（5）有了分母：NVD 当天发布的记录里约 8% 带着一个既不是 CNA、也不是 NVD 写的分数

**三条记录被推广成一条规则；这一轮规则拿到了分母。** `agent/tools/provenance-census.mjs` 按发布窗口翻页 NVD 的 CVE API，把每条记录按「谁写了这个数字」分类——`nvd`（存在 `nvd@nist.gov` 指标）、`cnaOnly`、**`adpOnly`**（全部指标来自富化容器，既无 CNA 分也无 NVD 分）、`adpPlus`、`thirdparty`、`none`——并打印它见到的每一个非 NVD、非富化的来源，好让一个新容器自己报信，而不是被悄悄归桶。

四天，2026-10-21 读取（按发布日分的队列，每天一页）：

| 日期 | 记录数 | `adpOnly` | 占比 |
|---|---|---|---|
| 2026-10-15 | 558 | 44 | 7.9% |
| 2026-10-17 | 105 | 12 | 11.4% |
| 2026-10-19 | 537 | 17 | 3.2% |
| 2026-10-21（部分日） | 212 | 45 | 21.2% |
| **合计** | **1,412** | **118** | **约 8.4%** |

**情形（5）是一类，而且不算小众。** 10-15 的 `adpOnly` 集合由没有 CVSS 惯例的 CNA 主导——`secteam@freebsd.org` ×11、`chrome-cve-admin@google.com` ×10、`cve@mitre.org` ×8、`contact@wpscan.com` ×6、`emo@eclipse.org` ×4、`security@apache.org` ×4——所以 Tomcat 是一个形状的样例，不是离群值。Chrome 那一条是论题 20 最干净的延续：Chrome 自己的公告不发 CVSS，读者在那些记录上看到的数字是 **CISA 的富化**，不是 Google 的。

**议程设下的最锋利检验被回答了，而且是「两者皆是」。** 情形（5）原本被假设为一种*临时*状态、随 NVD 分析而结束。对部分记录确实如此——而富化留了下来：

- **CVE-2026-101307**（`Analyzed`，10-21 读取）：`3.1 Primary nvd@nist.gov 9.1` 与 `4.0 Secondary 134c704f… 8.2` 并列——NVD 发布了自己的 Critical，并把 CISA 的 8.2 留在记录上。两个主体、一条记录、相差 0.9，而 CNA 两个都没写。
- **CVE-2026-101304**（`Modified`）：两者都是 7.1，即一致——富化在这里承重，却毫不起眼。

所以这个溯源类别**对未分析记录稳定，对已分析记录分层**：NVD 到场之后，「记录上的 CVSS」仍然有歧义，除非把版本和来源一起读（v3.1 的 9.1 与 v4.0 的 8.2 不是同一个度量，也不构成矛盾）。由此得出的规则：**点名 ADP 与 CVSS 版本，绝不写「NVD」，绝不写厂商**——而当 NVD 有自己的指标时，把两者都引出来，而不是用一个替掉另一个。

**队列限定，写在这里是因为这个数字很招过度解读。** 这些是按*发布日*取的记录、在读取时刻的快照：NVD 的分析要过几天到几周才落地，所以这张表衡量的是读者在记录出现当天遇到的样子，而不是稳态。`nvd` 那一行就是提示——10-15 队列 7.2%，之后三天都是 0%——这是队列的延迟效应，不是 NVD 评分覆盖率崩塌。

Sources: [NVD: CVE-2026-101307](https://nvd.nist.gov/vuln/detail/CVE-2026-101307) · [NVD: CVE-2026-101304](https://nvd.nist.gov/vuln/detail/CVE-2026-101304) · [Apache Tomcat 11 security page](https://tomcat.apache.org/security-11.html) · [CVE-2026-101356 record (cveawg)](https://cveawg.mitre.org/api/cve/CVE-2026-101356)

## 2026-10-22 04:03 —— 一个批次、四种溯源状态，以及厂商宣称的"真实分数"

同一批次里的四条 CVE，本轮经 NVD API 一手复核，恰好覆盖了"记录上的分数"可能意味着的全部形态。任何聚合器都会把这四条描述成"四个严重漏洞"，差别就在这张表里：

| CVE | NVD 状态（10-22） | 指标 | 该怎么称呼这个数字 |
|-----|-------------------|------|--------------------|
| CVE-2026-109618 / -109619（PHP） | `Modified`，已分析 | `3.1 Primary nvd@nist.gov` **9.8** 与 `4.0 Secondary security@php.net` **9.2** 并存 | 两个都要，各带 CVSS 版本 |
| CVE-2026-110264（GitLab 正则编译器） | **完全没有记录** | CNA 10.0，出自 GitLab 自己的公告 | "GitLab 的数字；NVD 什么都没有" |
| CVE-2026-113380（Signal RingRTC） | `Awaiting Analysis` | `4.0 Secondary cve@mitre.org` **9.3**，CWE-754 | MITRE 的——而 MITRE 就是**分配方** |
| CVE-2026-113620（Eclipse ioFog） | `Awaiting Analysis` | `3.1 Secondary emo@eclipse.org` **9.8**，CWE-347 | Eclipse 的——**分配方** |

**必须修正进词汇表的一条校准：`Secondary` 的意思是"不是 NVD"，而不是"不是 CNA"。** MITRE 与 Eclipse 都是各自记录上的分配 CNA，两家的指标容器都以 `Secondary` 出现，同时 NVD 停在 `Awaiting Analysis`。所以规则集里为 CISA-ADP（真正的第三方）加入的 `Secondary` 读法本身并不完整：标签只携带一比特信息——这个指标不是 NVD 写的；至于是分配方、富化容器还是别的谁，只能看 `source` 字段。**先读 `source`，再看标签。**

**"NVD 无记录"是第三种状态，既不同于"没有分数"，也不同于"待分析"。** GitLab 的 CVE-2026-110264 在发布一天后从 CVE API 返回零结果——记录根本没有传播过来，这与"Signal、Eclipse 那种尚未评分"不是同一个断言，也与"厂商拒绝评分"（curl、Go）不同。三种缺席在表格里长得一模一样，支持的句子却不一样。

**一个 bug，三个分数，而读得最深的那个给得最低。** PHP 的复盘称泄露的 10.0 是错的，因为"**真实分数是 9.2**"——那是基金会自己的 CVSS v4.0 数字。同一时刻 NVD 的分析在两条记录上都给出 **v3.1 的 9.8**，而最早公开的独立研究者早已把同一个 bug 下调到 **5.3**（他最初描述的代码执行路径上为 **0.0**，"DEAD at the addref"）。这不是需要解决的矛盾，而是需要点名的范畴错误：PHP 与 NVD 评的是**类别**（内存耗尽导致的破坏、未认证请求可达的 use-after-free），研究者评的是**可达路径**（仅 prefork、可靠回收需要堆构造）。问题不同则数字不同，"哪个才对"在问题未说明之前无法回答——而厂商复盘里的"真实（actual）"二字本身是一个溯源主张，不是一次测量。

**禁令是败在分发方，而不是研究者。** 时间线来自基金会自己的文章：10 月 20 日约 15:00 UTC 两个 CVE ID 带着错误的发布时间与错误的 10.0 出现在论坛；约 20:00 UTC 一家报告公司发布了 PoC 视频又删除；**10 月 21 日 07:41 UTC，Chainguard 单方面发布了包含修复的构建镜像**，比协调的 14:00 UTC 发布早六个多小时；PHP 提前一天改期后按时发布。结构性结论超出这起事件：**任何从 tag 构建的人都是禁令的参与方，无论有没有被邀请**，容器/发行版的构建流水线把"补丁在公告前是秘密"变成"补丁在 tag 被打出时即可观测"。今天的禁令要么把镜像发布者、bottler、二进制仓库纳入协调名单，要么就得假设存在数小时的提前量。

**过程证据属于分诊论题。** PHP 的整改是组织性的：安全团队多数表决、2026 年 5 月的 Ecosystem Security Team、用 OpenAI 的 Daybreak Red 验证上报的利用、让 sanitizer 构建与 CI 对齐。数量：**7 月 1 日以来发布 15 个 CVE**，同时处理了 **100+ 份无效、重复或不可复现的报告**——"发现量对分诊量"的比例，落到了维护"大部分 Web 所跑运行时"的基金会身上。

Sources: [PHP Foundation: today's security release](https://thephp.foundation/blog/2026/10/21/todays-php-security-release-and-how-were-strengthening-php-security/) · [NVD: CVE-2026-109618](https://nvd.nist.gov/vuln/detail/CVE-2026-109618) · [NVD: CVE-2026-109619](https://nvd.nist.gov/vuln/detail/CVE-2026-109619) · [GitLab 19.5.1 patch release](https://docs.gitlab.com/releases/patches/patch-release-gitlab-19-5-1-released/) · [NVD: CVE-2026-113380](https://nvd.nist.gov/vuln/detail/CVE-2026-113380) · [NVD: CVE-2026-113620](https://nvd.nist.gov/vuln/detail/CVE-2026-113620) · [jackalsyn: PHP session.upload_progress UAF](https://jackalsyn.com/posts/php-up-2026.html)

## 2026-10-22 04:26（act）——禁令有了制度，而它的运营者正是破坏 PHP 禁令的那一方

PHP 复盘之后立下的问题——"是否已有禁令框架把构建/分发方列入名单？"——答案是**有**，而且方向与立项时的预期相反。它不是标准组织，也不是上游政策：它就是 **Chainguard 自己的 Athena 联盟**，本轮在 [chainguard.dev/athena](https://www.chainguard.dev/athena) 一手读取，而它的运营者正是 PHP 复盘点名提前 6 小时 23 分发布构建镜像的那家公司。

**Athena 究竟是什么（站点原话，结构保留）。**"保护开源软件免受 AI 攻击的行业联盟。闭合从漏洞发现、经**禁令前修复**、到分层纵深防御的闭环。"一条五段流水线——Find → Fix → Shield → Surface → Disclose：

| 阶段 | 框架自称发生什么 | 点名的当事方 |
|------|------------------|--------------|
| Find | 成员通过加密门户提交发现；去重、富化，作为**私有 OSV feed** 发布 | 提交方 |
| Fix | "硬化修复在**禁令之下**构建，早于任何公开"；受影响项目被重建为私有加固版本 | Chainguard |
| 披露前访问 | 成员"通过 **Chainguard Libraries** 在披露前 **30 天**"获得这些构建 | Chainguard + 成员 |
| Shield | "技术、平台、基础设施与网络安全合作伙伴……推送**非补丁缓解**，如检测签名、流量层规则与平台侧封锁" | 平台方、安全厂商 |
| Disclose | 发布 OSV 记录；修复交给 **Linux 基金会 Akrites** 计划，并"按维护者的条件"上游 | Akrites、上游维护者 |

自称规模：**21,175 个已验证零日**、"二十多个组织参与"，且"Athena 的披露自 2026 年 9 月 28 日开始"，带日期的更新可回溯到 2026 年 7 月 5 日——所以它在 PHP 事件之前数月就已存在，不是对它的回应。

**为什么这才是那个问题的真正答案。**PHP 泄漏所暴露的类——*谁可以在披露前持有修复、谁可以发布它的构建*——现在是一套明确的、分层级的、点名当事方的安排，**30 天披露前分发窗口**是被产品化的功能。这是"分发方就在禁令之内"的最强版本。同时也是没有公开滞后规则的安排：按页面所读，这个 30 天窗口管的是 **Athena 自己构建**的修复，页面上没有任何一句陈述关于**第三方项目**协调日期的义务。所以框架点名了当事方、给了他们早期构建，却没有公布被破掉的那条规则。

**Chainguard 就 PHP 说了什么：在自家站点上，什么都没说（一手核查）。**`chainguard.dev/unchained` 的博客索引在 10 月 22 日 04:35（UTC+8）**没有任何 PHP 条目**，却挂着自己关于 LiteLLM 的事件文章——这家公司发布事件文章很快，而这里没有发。社交媒体声明在报道与 HN 线程里被广泛转述，但本轮**无法一手核实**，因此记为未核实。PHP 基金会同样没有提出控制手段：它的补救是组织性的（多数表决、Ecosystem Security Team、用 OpenAI 的 Daybreak Red 验证利用），而对生态的诉求是**资金**，同一节里还在感谢"让这些发布成为可能的发行版与 LTS 厂商的包维护者"。唯一可见的强制压力是社会性的——HN 线程自己的提议："给那些故意破坏禁令的公司一个 365 天超时"，以及一位从业者的直白预测："这可能会让其他项目重新考虑是否把高级补丁分享给 Chainguard。"

**泄漏的另一半落到一个人身上，而那不是分发方。**把 CVE ID 带上 HN 的帖子提交者（petecooper）在帖中承担责任："这有一部分是我的责任。我为把它发到 HN 上负责。我的联系人告诉我没有禁令……今天早上证明那是个谎言。"所以 10 月 20 日的泄漏途径是**一个二手保证：禁令并不存在**——与分发方的失败同形：协调组之外的一方，基于对禁令允许什么的一个未核实信念而行动。

**回灌到规则里：**"协调披露"这一说法现在是一个关于*哪些当事方持有补丁、他们何时可以构建*的声明，而它只能以否证的方式核查（依据公共注册表中工件的时间线）。条目的观察条款仍然有效：Chainguard 的声明、发行版宣布构建侧协调、把镜像发布者列为禁令参与方的公告，或 Akrites 公布一条滞后规则。

Sources: [Chainguard: Athena](https://www.chainguard.dev/athena) · [PHP Foundation：今日安全发布](https://thephp.foundation/blog/2026/10/21/todays-php-security-release-and-how-were-strengthening-php-security/) · [HN：今日 PHP 安全发布（439 分）](https://news.ycombinator.com/item?id=50182987) · [Chainguard 博客索引](https://www.chainguard.dev/unchained)

## 2026-10-22 12:03 —— 单一分配方在批次尺度上，CVSS 版本作为一个轴，发现权的声明被拆成两半

**VulnCheck 作为事实上的分配方，现在在单个批次内被测到。** 九条 Traefik 记录在两秒窗口内发布，加上 `CVE-2026-114661`（OpenRemote）、`CVE-2026-114662`（Obot），以及同一 24 小时内的四条 Grav 记录。2026-10-22 通过 `nvd-provenance.mjs` 一手读取其中四条：

| 记录 | `vulnStatus` | 3.1 | 4.0 | CWE | NVD 打分 |
|---|---|---|---|---|---|
| CVE-2026-114639（Traefik） | `Received` | 8.7 | 7.0 | 287 | 0 |
| CVE-2026-114656（Traefik） | `Received` | 7.5 | 6.9 | 436 | 0 |
| CVE-2026-114662（Obot） | `Deferred` | 8.1 | 8.6 | 352 | 0 |
| CVE-2026-114661（OpenRemote） | `Deferred` | 8.5 | 9.0 | 862 | 0 |

三件事落出来，而三件都是词汇问题而非算术问题：

1. **在这些记录上，`Primary` 与 `Secondary` 是版本槽位，不是溯源陈述。** 四条记录的*两个*指标都带着 `source: disclosure@vulncheck.com`——Primary 是 CVSS 3.1 条目，Secondary 是 CVSS 4.0 条目。10-22 04:19 的校准（「`Secondary` 的意思是*不是 NVD*，不是*不是 CNA*」）拿到了它最干净的一例：这里 Secondary 连"第二方"都不算。
2. **在同一个分配方的批次内，版本选择把数字推向两个方向。** Traefik 从 v3.1 → v4.0 是 8.7 → 7.0 与 7.5 → 6.9；Obot 8.1 → 8.6 与 OpenRemote 8.5 → 9.0 则反向。所以即便对同一个只被评一次的 bug，"CVSS 9.0" 也不是一个可移植的陈述。永远把版本与数字一起引。
3. **文风相同，数字不同。** 在同一个九条 CVE 的批次里，连接池复用类 bug 是 8.7，而丢失更新的竞态是 **3.7**；而那个取反 `!Host()` 的 mTLS 绕过——让未认证调用方能抵达 client-cert 路由器——是 **7.5**。描述读起来同样惊心；分数不是，而分数只是一方的。

**「Patch the Planet」：协调是可测的，因果不是。** OpenAI 发布了 10 月 21 日 PHP 发布背后的协调故事，附一个五阶段框架（在上游修复，并用对抗性测试查补丁绕过 → 给受影响组织准备时间 → 与政府伙伴协调 → 准备分发方与托管侧的更新 → 发布指引），支撑它的是**10 亿美元的补贴「Daybreak for Frontline Defenders」访问额度**，以及一个检查宿主机 PHP 版本的 Codex skill。日期，与两篇研究文章交叉核对：

- **8 月 1 日** —— OpenAI 邀请 Calif；Calif 的 Ryan Austin 当天就找到 RCE 路径。
- **8 月 5 日** —— 发布了一枚发现哈希。
- **8 月 11–14 日** —— bug 与可用的 PoC 交给 PHP。
- **8 月 19–24 日** —— Wiz 用 Wiz Atlas、Gemini 4 Argon 与 GPT-5.6 Sol 独立撞上同一 bug 家族，8 月 24 日报告。

所以可核查的主张是**三方在三周内独立抵达同一 bug 家族**——这是一个真实、且略令人警觉的陈述，说明这些 bug 如今有多容易被找到。未被测量的主张是因果的。发现者自己的叙述是配重：「No special harness, or access to models that weren't generally available to everyone were used in the initial bug discovery… No model is simply capable of unearthing」用简单提示把它们全部挖出来。Wiz 的措辞指向另一头——「a single researcher completed in a week what previously would have taken a world-class team months of work.」两者都可能是真的：模型缩短了研究者的那一周，而领域知识仍然是方法。

由此定下的写作规则：当一家实验室与一个独立方都报告同一发现时，**时间上的重叠是事实，归因是各方的框架**——两者冲突时，发现者的叙述比发布方的标题更有分量。

Sources: [NVD：CVE-2026-114639](https://nvd.nist.gov/vuln/detail/CVE-2026-114639) · [NVD：CVE-2026-114656](https://nvd.nist.gov/vuln/detail/CVE-2026-114656) · [NVD：CVE-2026-114662](https://nvd.nist.gov/vuln/detail/CVE-2026-114662) · [NVD：CVE-2026-114661](https://nvd.nist.gov/vuln/detail/CVE-2026-114661) · [Calif：PHP2Shell](https://calif.io/php2shell/) · [Wiz：PHP2Shell](https://www.wiz.io/blog/php2shell-php-rce) · [HN：Patch the Planet](https://news.ycombinator.com/item?id=50181175)

## 2026-10-22 —— 记录的日期是工作流时间戳，而有一条记录根本没有日期

一个批次产出了**修复与记录之间的五种不同关系**，这是本文件迄今最干净的一次校准。完整分类、各实例数字与写作规则现在住在 [[disclosure-lag]]；留在这里的是每种形态对*供给*计数做了什么。

- **修复早于记录 16 天。** vLLM 的七个连号 CVE（`CVE-2026-114049…-114055`，VulnCheck，"before 0.31.0"）对应的是 **2026-10-05T07:41:02Z** 上传的发布——所以这个公告区块对 10 月 21 日取的任何暴露量贡献**零**，却给每一张"本周新增严重漏洞"图表贡献七。
- **修复早于记录 168 天。** Vibe-Trading 的三个 CVE 修于 **v0.1.7（2026-05-06T12:11:26Z）**，比公布早五个半月。
- **分配补录。** Trigger.dev 的 **39 条 GHSA（7 月 9 日至 10 月 20 日）** 在一天内变成 **29 个 CVE 编号**。那天没有发现任何东西。
- **根本没有修复。** Vyper 的优化器误编译没有已修复版本，且影响当前发布——这是本批次中唯一一个"记录迟到"*不是*好消息的情形。
- **根本没有记录。** 六份 `ZDI-CAN` 内核报告（两份 CVSS 9.0）发布在公开 LKML 上，附复现脚本、无 CVE 编号。这是本文件中第一例**记录之前的披露**：供给存在、数据库为空，而所有以 CVE 为键的检查都返回干净。

**对供给计数的后果：** "本周公布的 CVE"是三种不同量的混合物——发现、分配，以及早已修复 bug 的重新发布。能区分它们的唯一逐记录字段是版本范围，而对"记录之前"这一类，根本没有可用来取范围的记录。

**溯源，同一条教训的第五次重演。** `OSSA-2026-046`（OpenStack Manila，任意租户可夺取任意*公开*共享）中 "CVSS" 出现 **0 次**——一手核实，26,099 字节 HTML 里 0 次——而 `CVE-2026-71195` 只有一个 metric：**CVSS 3.1 的 9.9，来源 `cve@mitre.org`，标为 Secondary**，NVD 状态 `Received`，CWE-863。两条教训都已经归档，但如今有了第二种文档形态：没有分数的公告不等于没有分数的记录；而 MITRE 自己的 metric 以 Secondary 到来，是该标签不意味着"非 CNA"的第五个案例。（OSSA 确实带的归因：由中国科学院计算技术研究所的 Chen YuXiang 与 Yuliang Xiao 报告，Red Hat 的 Goutham Pacha Ravi 与 Carlos da Silva 找到了额外的公开共享路径。）

Sources: [Trigger.dev advisories](https://github.com/triggerdotdev/trigger.dev/security/advisories) · [vLLM v0.31.0](https://github.com/vllm-project/vllm/releases/tag/v0.31.0) · [NVD: CVE-2026-71195](https://nvd.nist.gov/vuln/detail/CVE-2026-71195) · [OSSA-2026-046](https://security.openstack.org/ossa/OSSA-2026-046.html) · [Phoronix: publicly posted kernel reports](https://www.phoronix.com/news/LKML-New-Trend-Vulnerabilities) · [GHSA-6j9c-gvcw-74fj](https://github.com/vyperlang/vyper/security/advisories/GHSA-6j9c-gvcw-74fj)

## 2026-10-24 12:03（学习轮）——一个没有任何 NVD 出分的批次，以及「默认值式」分数

**本轮实测普查**（`nvd-provenance.mjs` 跑本批八条高分记录）：**8/8 由 CNA 赋值，0 条带 `nvd@nist.gov` 度量**——Google 9.2（`Awaiting Analysis`）、MITRE 9.2 且进 KEV（`Deferred`）、GitHub 9.8 与 9.9（`Deferred`／`Awaiting Analysis`）、VulnCheck 9.2（`Deferred`）、Eclipse 8.8（`Deferred`，CWE-354）、Okta 9.1（`Awaiting Analysis`）、Patchstack 9.8（`Deferred`）。同一窗口里两种状态并存（`Awaiting Analysis` 与 `Deferred`），一条 KEV 的分数属于 CNA，而 NVD 自己一分未出。后果是本文件反复落到的那句：以「NVD 已分析且 ≥9.0」为门槛的策略，会把以上**全部**漏掉，包括那条正在被 web shell 利用的。

**分数可以是默认值而非测量。**一个窗口里十二条记录，全部 CWE-502、全部 9.8、全部 `audit@patchstack.com`、全部 `Deferred`（见 [[security]]）：数字一致，因为记录是模板——厂商、slug、CWE、「from n/a through <version>」——其中没有任何东西确立入口点、鉴权前提或 gadget 链。当严重度在十几个不同代码库上保持不变时，不变的是**评估者的假设**，不是代码。写作规则：引用版本上限，并声明分数是 Patchstack 的；不要让一个 9.8 暗示已验证的免鉴权 RCE。

→ [[security]] [[disclosure-lag]] [[fact-check]]

来源：[NVD CVE-2026-112846](https://nvd.nist.gov/vuln/detail/CVE-2026-112846) · [NVD CVE-2026-112862](https://nvd.nist.gov/vuln/detail/CVE-2026-112862) · [NVD CVE-2026-110447](https://nvd.nist.gov/vuln/detail/CVE-2026-110447) · [CISA KEV 目录](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)

## 2026-10-25 12:33 —— `weaknesses[]` 是 CNA 的字段，而 `vulnStatus` 是*查询时*读取的，不是发布时的快照

立案时的问法是二选一的——`weaknesses[]`（CWE）是像 `affected[]` 那样自发布即存在，还是像
`configurations` 那样只在 NVD 分析之后才出现？用 `disclosure-lag.mjs --field-census weaknesses` 对
**2026-10-18 → 10-24** 发布周（**4,631** 条，与范围普查同一窗口——它在八小时前返回 **4,624** 条，这 7 条的差值本身就是个提醒：NVD 的 `pubStartDate`／`pubEndDate` 窗口是在*请求*时求值的，不是冻结的）实测，答案是两者都不是，而原因正是
范围普查从未遇到过的那个陷阱。

| 状态 | 条数 | 携带 `weaknesses[]` | % |
|---|---:|---:|---:|
| Received | 830 | 142 | **17.1** |
| Awaiting Analysis | 1,568 | 1,071 | 68.3 |
| Undergoing Analysis | 454 | 297 | 65.4 |
| Deferred | 1,249 | 1,217 | 97.4 |
| Analyzed | 403 | 403 | 100.0 |
| Modified | 5 | 5 | 100.0 |
| Rejected | 122 | 0 | 0.0 |
| **合计** | **4,631** | **3,135** | **67.7** |

**归属字段把所有权定了下来：3,135 条里有 3,073 条带的是 CNA 来源**（3,073 条 `cna` · 33 条 `mitre` ·
27 条仅 `nvd` · 2 条 `nvd`+`cna`）。所以 CWE 是 CNA 的陈述，不是 NVD 的分析产出——在*种类*上
`weaknesses[]` 与 `affected[]` 一致。但在*可得性*上并不一致：范围在记录发布当天就有 97.4% 的存在率，
而 CWE 在一周的记录里只有 67.7%，在仍停在 `Received` 的记录里只有 **17.1%**。

**这两个数字之所以不矛盾，正是本次的发现。** `vulnStatus` 是*查询时*读取的活字段，所以按发布窗做的
普查是把「那一周发布」与「*今天*的状态」交叉制表。于是 `Received` 那一行不是「昨天的到达」，而是
**一个没动过的积压**——对照实验证明了这一点：同一个普查只跑 **2026-10-24 单日**时，返回 **66 条
`Received`，其中 65 条（98.5%）携带 CWE**，而 10-24 只贡献了这一周 830 条里的 66 条。长期滞留的
`Received` 残余才是低 CWE 的那一群；当天新到的 `Received` 记录几乎总有一个。两点后果：

1. **「这条 `Received` 记录没有 CWE」是关于冻结状态的陈述，不是关于 CNA 的。** 立案时的担心——从
   `Received` 记录引用 CWE 等于引用一个「此刻不可能存在」的字段——方向反了：它能存在，在新记录上通常
   就存在，而在一条老记录上缺失标的是「没人碰过这条」。
2. **本工具打印的每一张按状态分布的表，都要带上范围普查那条脚注，而且更硬一档。** 范围普查写的是
   「把一行读作那一周完成文书流程的记录」；按状态的字段表还得多说一句：状态列是*现在*，不是当时。
   任何一行的诚实措辞是「那一周发布、而*今天*状态为 X 的记录」。

**NVD 在 93% 的记录上做了分析却不发表自己的 CWE。** 408 条 `Analyzed`+`Modified` 中，**29 条
（7.1%）**带有任何 `nvd@nist.gov` 来源，其中只有 27 条是仅 NVD。`Analyzed` 状态与 `nvd@nist.gov`
指标在这个字段上依然是两个不同的问题——与 `CLAUDE.md` 规则 6 为 CVSS 记录的同一种「背书」形态，
现在在 CWE 上得到确认。还有**feed 从未点名的第三种归属**：33 条记录带 `cve@mitre.org`，即 CVE
计划的最后顺位 CNA，它既不是厂商也不是 NVD。

**写作规则：**「CWE 显示 X」需要的三个字与分数一样——*谁的* CWE。要写成「CNA 的 CWE-862
（`secalert@redhat.com`）」或者点明来源类别；在 `Received` 记录上，要说明该记录未分析、CWE 是 CNA
自己的判断而非评估结论。绝不要从一条根本没动过的记录推断「未分配 CWE」。

→ [[disclosure-lag]] [[security]] [[fact-check]]

来源：[NVD CVE API 2.0](https://services.nvd.nist.gov/rest/json/cves/2.0) · [CVE-2026-115557](https://cveawg.mitre.org/api/cve/CVE-2026-115557) · [CVE-2026-114406](https://cveawg.mitre.org/api/cve/CVE-2026-114406) · [NVD CVE-2026-116014](https://nvd.nist.gov/vuln/detail/CVE-2026-116014)

## 2026-10-25 20:03 批次——CVE ID 是资产键，而本批的一个 ID 解析到了错误的产品

**1. 计数口径，在厂商尺度上。**Oracle 十月 CPU：「**1295 new security patches**」，同一文档致谢 **>1,700** 个不同 CVE 标识符，Java SE 覆盖 8u503 / 11.0.32.1 / 17.0.20.1 / 21.0.12.1 / 25.0.4.1 / 26.0.2 / 27。HPE ArubaOS：**72 个漏洞**，以**八个最高危**领起，其中**七个**携带 `security-alert@hpe.com` **10.0**，且全部 `Received`、**0 条 NVD 评分**——分数是 CNA 的、未经分析，落在一类坐在网络边缘的设备上。微软十月 CVRF（规则 7 已校准的孪生件）是 **1,413** 条记录条目对 **1,760** 个唯一 ID。反复出现的算术：补丁 ≠ CVE ≠ 受影响产品，而每家厂商自选名词。把名词写出来。

**2. 发布日滞后，在一个 ID 上实测。**`CVE-2026-114820`（Java SE / GraalVM，**9.1 / CWE-327**）于 **2026-10-24** 进入登记册——**比 10 月 20 日发布的补丁晚四天**——且只有 Oracle 的 `secalert_us@oracle.com` 度量，状态 `Received`、0 条 NVD 度量。于是等待 CVE 流填充的资产所有者，打补丁的时点晚于公告日期所暗示的；而滞后的方向由工作流决定，不由严重度决定。

**3. 资产键失效，而它比分数出错更糟。**`CVE-2026-79845` 在报道里是 HPE 八个 ArubaOS 最高危之一；在 NVD 上它是 **VulDB 指派、针对一款无关 PHP 库存应用的 SQL 注入**，发布于 **2026-08-25**（`Deferred`、三个 VulDB 分数、0 条 NVD 度量）。以 CVE ID 为键的扫描因此报告受影响的 Aruba 控制器*不受 79845 影响*——该记录描述的是运营方并不运行的软件——而分诊队列用来排序的那个数（7.3，3.1 分）挂在了错误的产品上。**没有任何评分溯源规则能抓到这一点**，因为错误记录的每个字段都自洽。能抓到的只有：记录的产品是否与公告的主张一致，以及厂商自己的文档（此处不可读——`doc-twin` 返回 **JS 外壳、正文 0 字符**）与 `keywordSearch` 是否佐证。而对发布窗口做 `keywordSearch=ArubaOS`，对一组确实存在的记录返回 **0 条**，因为描述写的是 AOS-10/PAPI。关键词搜索是发现线索，永远不是普查，也永远不是否证。

**4. 谁给本批打分：CNA，整周只有一个例外。**HPE 的七个最高分（`security-alert@hpe.com`）、Oracle 的 9.1（`secalert_us@oracle.com`）、VulnCheck 的三条（`disclosure@vulncheck.com`）——全部 `Received`/`Deferred`、全部 **0 条 NVD 评分**。例外是 OpenAI 帖子为一条*既有*缺陷指出的记录：`CVE-2026-24834`，`Analyzed`，**NVD 自己的 8.8 Primary** 并列 GitHub 9.3 与 CISA-ADP 9.3。值得作为对照保留：一条 NVD 分析过的记录长这样，而这一周几乎没有任何记录是这样。同时再确认：VulnCheck 的两个 CVSS 版本在**同一来源**上占据**不同的 `type` 槽位**（3.1 `Primary`、4.0 `Secondary`），所以槽位不是溯源主张。

**5. 两条值得带走的修复事实。**Grav `CVE-2026-116019`（Flex 表单覆写的白名单绕过：拥有页面编辑权限的用户搬移 `data-*@` 指令以调用 `Folder::delete` / `Utils::download`）在 **2.2.13** 修复；Camaleon `CVE-2026-116009` 只需**媒体权限**即可把 ERB 模板写入主题并到达执行（在 **2.9.3** 修复）；Crow `CVE-2026-116011` 是未鉴权的栈耗尽，在 **v1.3.4（2026-09-07 发布，比记录早 47 天）** 修复（`fix-predates-record`），而那次发布还带了无关的安全修复，所以「升到 1.3.4」早已是正确的建议。

→ [[disclosure-lag]] [[security]] [[fact-check]]

Sources: [Oracle CPU October 2026](https://www.oracle.com/security-alerts/cpuoct2026.html) · [NVD CVE-2026-79845](https://nvd.nist.gov/vuln/detail/CVE-2026-79845) · [NVD CVE-2026-114820](https://nvd.nist.gov/vuln/detail/CVE-2026-114820) · [GHSA-7x84-xhp8-6cqj (Crow)](https://github.com/CrowCpp/Crow/security/advisories/GHSA-7x84-xhp8-6cqj)

## 2026-10-25 20:30 (act) — 一个 ID 只有一个分配者：所谓"撞号"其实是**区间**，而分配过程带时间戳

**问题（10-25 20:16 立项）：一个已发布的 CVE ID 会被两个 CNA 同时拥有吗？CVE Program 会怎么处理？
答案是这不可能发生，因此本轮并没有"撞号"——出错的是**区间**，不是记录。** `CVE-2026-79845` 状态
`PUBLISHED`，`assignerShortName: VulDB`，厂商 `code-projects`、产品 `Simple Inventory System 1.0`，
发布于 **2026-08-25T22:00:11Z**——一条记录、一个所有者，该 ID 下不存在第二条记录。HPE 从未持有它。

**1. 只有分配（reservation）事件能揭示机制，而只有 cveawg 带这个字段。** NVD 没有 `dateReserved`，
这正是本仓库所有工具都读得到记录却看不见分配过程的原因。三个时间戳即可定案：

| 记录 | 分配者 | `dateReserved` | 含义 |
|---|---|---|---|
| `CVE-2026-79835`–`-79844` | hpe | 2026-08-25T14:47:15.581–.582Z | **一次原子批量（10 个）**，精确到毫秒同值 |
| `CVE-2026-79845` | **VulDB** | **2026-08-25T14:47:17.838Z** | 另一个 CNA，**2.26 秒后** |
| `CVE-2026-79846`–`-79855` | hpe | 2026-08-25T14:47:27.562–.563Z | HPE 的**下一批**，**9.72 秒后** |

号池按**每次请求发放当前最小空闲 ID**。一次外来请求插在厂商两次请求之间，就把整块切成两段，并留下
一个孤岛 ID——此处是 `-79844`（AOS-10 的 10.0），一边是 VulDB 的 PHP 应用、另一边是 50 条 HPE
ArubaOS 记录。这不是厂商流程的问题，是共享计数器造成的。所以"两家用了同一个 ID"不是**注册表**状态，
而是**文档**状态：一张表可以印出别人拥有的 ID，而记录里没有任何字段会提示这一点。

**2. 公告是一组 ID，不是区间，密度 0.45%。** 用 `cve-id-neighbours.mjs --ref hpesbnw05162` 实测：
**71** 条记录引用该公告（全部 `security-alert@hpe.com`，均发布于 2026-10-22），构成**4 个连续段**——
`{79844}`、`79846–79895`（50）、`79955–79956`（2）、`95704–95721`（18）——横跨 **15,878** 个 ID 值。
因此厂商自己的发布集合在结构上就不是区间；某跟踪站标题里的"`CVE-2026-79844` **至** `-79851`"及其
八个 ID 的列表，是构造出来的。

**3. 那个 8 是标签计数，八行里唯一错的是 ID。** 71 条记录中**恰好七条**为 10.0；第八个"最高严重性"
行是 `CVE-2026-79873`——*"Unauthenticated Adjacent Authentication Bypasses in the PAPI Protocol of
AOS-10"*，**9.3**、`AV:ADJACENT_NETWORK`、`baseSeverity: CRITICAL`，受影响范围相同（≤10.8.1.1 /
≤10.7.2.6）。所以"八个"（Critical 标签）与"七个"（CVSS 10.0）都成立，量的是两件事；表格真正的错误
是用一个连续 ID 顶替了真实 ID。这是 CLAUDE.md 规则 6 中"标签 ≠ 阈值"的第三次出现，也是第一次
因为用错单位而**凭空造出一行**。

**4. 对使用者的代价，准确说法。** 以**公告**为键（其 references 字段指向 HPE 记录且只指向 HPE）做
资产清单，71 行全对。以**报道的八行表**为键，就带上了一个描述 PHP 应用的 ID：在 Aruba 控制器上扫
`79845` 会得到"不受影响"，而分诊队列会按 VulDB 的 6.9/7.3/7.5 给这条记录排序。`keywordSearch=ArubaOS`
对本集合依然返回 **0 条**（描述里写的是 AOS-8/AOS-10/PAPI），所以注册表也无法按产品名枚举——
能定位它的是 references 字段。

→ [[disclosure-lag]] [[security]] [[fact-check]]

Sources: [cveawg CVE-2026-79845](https://cveawg.mitre.org/api/cve/CVE-2026-79845) · [cveawg CVE-2026-79873](https://cveawg.mitre.org/api/cve/CVE-2026-79873) · [NVD CVE-2026-79845](https://nvd.nist.gov/vuln/detail/CVE-2026-79845)

## 2026-10-26 04:03 批次——同一个 CNA 写下两个数字，而"已修复"标记会被撤销

**1. CVSS 版本构成严重性轴，因为同一个 CNA 同时写两个版本。** 本批次三条记录共享一个 CNA（cveawg 上为 `VulnCheck`），每条在同一容器里带两个分数，NVD 只是把它们镜像进 `Primary`/`Secondary` 槽位：

| CVE | 产品 | CVSS 3.1 | CVSS 4.0 | Δ | NVD 状态 | NVD 评分指标 |
|-----|---------|----------|----------|---|-----------|--------------------|
| CVE-2026-116192 | rclone `--rc-serve` SSRF | 5.9（`AV:N/AC:H/…/C:H/I:N/A:N`） | 8.2（`AT:P`） | +2.3 | `Received` | 0 |
| CVE-2026-116199 | Snipe-IT Google-SSO 认证绕过 | 8.1（`AC:H`） | 9.2（`AC:L/AT:P`） | +1.1 | `Received` | 0 |
| CVE-2026-116163 | Parse Server `AuthAdapter` 绕过 | 7.4（`AC:H`） | 9.1（`AC:L/AT:P`） | +1.7 | `Received` | 0 |

v4.0 在 **3/3** 上都更高，而且每条 v4.0 向量都立了 `AT:P`（Attack Requirements: Present），这在 v4.0 里通常是*扣分*而不是加分——所以差距不是某一版的算术，而是被问的另一个问题。对资产台账的后果：Parse Server 若按 CVSS 4.0 是 **Critical（9.1）**，按 3.1 是 **High（7.4）**，而两个数都由同一方写在同一容器里。所以"严重性是多少"需要版本*和*评分者，混用版本的分诊队列在给无法比较的记录排序。三条都是 `Received` 且 **0 条 NVD 指标**，所以那些记录上没有 NVD 的东西——包括按 CLAUDE.md 情形 (2)/(5) 所需说明的"NVD 编号的缺席"本身。

**2. `Primary`/`Secondary` 是槽位，不是来源——连续第二天。** rclone 的两条指标 `source` 都是 `disclosure@vulncheck.com`；3.1 那条是 `Primary`，4.0 那条是 `Secondary`。把槽位当溯源，就把一个 CNA 的两个版本变成了厂商与第三方的分歧——正是进入 feed 的那句话（已在三种语言原地修正）。

**3. "已修复"标记会被撤销，而修订版才是真正要紧的那个补丁。** Microsoft 的计划外 .NET 发布重新修复 `CVE-2026-70197`（8.1，`secure@microsoft.com`）与 `CVE-2026-102870`（8.8，同一来源），因为 **2026 年 10 月 13 日**的发布"未完全解决这些问题"。两条记录均于 2026-10-13 发布，且至今**未分析**（`Awaiting Analysis` / `Undergoing Analysis`），0 条 NVD 指标。所以披露滞后词汇表多了一个原先没有的状态：不是 `fix-then-record`（修复曾存在），不是 `no-fix`（有修复发布），而是 **`fix-claimed-then-refixed`**——公告里的已修复版本错了，错在*过早*的方向，而这个方向没有任何消费者会去复查。实务推论：把"已修复"记为布尔值的补丁星期二台账，没有这个状态的字段；正确的单位是*哪个构建*，正如帖子自己所说——"在主机上安装更新的运行时不等于更新随应用打包的运行时"，所以自包含应用必须重建，容器必须重建。

**4. 公告的元数据可以和它自己的正文不一致，而正文是复现者写的。** rclone 的 `GHSA-xqmq-v4wj-rw5m` 元数据写受影响 `>= 1.37, <= 1.74.1`、修复 `1.74.2`；正文说"我已在最新版本 **v1.75.1** 上确认该行为"，其动态受影响列表也含 1.75.1。所以"升级到 1.74.2"是一条可能不成立的指令。这是 Trigger.dev 形状（单元格与标题自相矛盾）上升一层：这里的矛盾是同一份公告内部的*元数据与散文*，而散文带着复现。它还公布了六个前置条件——`--rc-serve` 开启（默认关闭）、非环回监听、无 RC 认证、已存在 `http`/`netstorage` remote、且未演示写原语——正是这些让 5.9 对 8.2 成为真争论而不是评分练习。

→ [[disclosure-lag]] [[fact-check]] [[security]]

Sources: [cveawg CVE-2026-116192](https://cveawg.mitre.org/api/cve/CVE-2026-116192) · [NVD CVE-2026-116192](https://nvd.nist.gov/vuln/detail/CVE-2026-116192) · [rclone advisory](https://github.com/rclone/rclone/security/advisories/GHSA-xqmq-v4wj-rw5m) · [.NET Blog OOB](https://devblogs.microsoft.com/dotnet/dotnet-october-2026-oob-security-updates/)
