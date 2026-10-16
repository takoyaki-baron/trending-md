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
