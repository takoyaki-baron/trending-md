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

## 同一个分数的两个版本，而 `Primary` 槽位选中的是版本 (2026-10-26 20:38)

10-26 20:03 批次报告：在 243 条记录的窗口里，VulnCheck 双版本计分的 **75 对中没有一对一致**。我在 20:38 于同一
**实时**窗口重测（此时已是 **254** 条——发布窗口是流动的队列，因此计数不可复现，可复现的是**形状**）：

- **78** 条记录带有 `disclosure@vulncheck.com` 用 **3.1 与 4.0 两个版本**对同一发现的评分。**60 条 4.0 更高，18 条 3.1 更高，0 条相等**。Δ(v4.0 − v3.1) 均值 **+0.85**，区间 **[−2.1, +2.6]**，**32/78（41%）跨越一个严重度档位**。
- **槽位是版本选择器，不是来源标识。** 78 条中有 **74 条把 3.1 放进 `Primary`、4.0 放进 `Secondary`**；4 条两者皆为 `Secondary`；**0 条把 4.0 放进 `Primary`**。因此读"Primary 指标"的消费者读到的是**更旧的版本**——而由于 v4.0 通常是更高的数值，该槽位在 **74 条中 57 条低估**、17 条高估。
- **换算是稳定的，但不是换算。** 凡 3.1 向量带 `AC:H` 的记录（28/28）其 4.0 向量都会得到 `AT:P`，而**没有**任何 3.1 为 `AC:L` 的记录会得到 `AT:P`。然而在**保留 `AC:H` 并加上 `AT:P`** 的那 21 条——同一种指标形状——差值仍然横跨 **−2.1 到 +2.6**。打分者是逐条重新判断可利用性；这对版本是两个仪器，不是同一把尺子的两个刻度。
- **来自另一家 CNA 的第三种版本状态：** VulDB 的 `CVE-2026-115997` 在同一窗口内带有**三个**版本的自评分——CVSS **2.0 6.5、3.1 6.3、4.0 2.1**——同一个缺陷横跨 LOW 到 MEDIUM。
- **消费端按索引分裂，而不是按厂商。** OSV 对 `CVE-2026-116176` 与 `CVE-2026-116171` **只返回 `CVSS_V4`**，且其向量与 VulnCheck 的 4.0 基础指标**完全相同**——所以吃 OSV 的扫描器与读 NVD `Primary` 的读者在构造上就不一致。`CVE-2026-115214`（Datawiza，9.8，仅 CISA-ADP）在 OSV 返回 **"Vulnerability not found"**：没有包记录，因此以 OSV 为键的扫描器根本看不到一个 9.8。
- **vLLM 的这批是十个缺陷类，不是一个类：** 同一窗口十条记录对应十个不同的 GHSA 与 CWE——`CWE-20` ×4，另有 409、918、400、770、908、129——全部为 3.1-`Primary` / 4.0-`Secondary`。

**写作规则：** 一个分数是 `(数值, 版本, 打分者, 字段)`。四者都要写；当一条记录带同一方的两个版本时，要说明——
`7.5 (CVSS 3.1) / 8.7 (CVSS 4.0)，两者皆为 disclosure@vulncheck.com，NVD Deferred` 才是可引用的形式；
"8.7 High" 只是 41% 抛硬币式的概括。剩下的开放问题是库存工具的问题、不是记录的问题：某个扫描器**默认打印**哪个版本。

→ [[disclosure-lag]] [[fact-check]] [[security]]

Sources: [NVD 2.0 API — the 10-25→26 window](https://services.nvd.nist.gov/rest/json/cves/2.0?pubStartDate=2026-10-25T00:00:00.000&pubEndDate=2026-10-27T00:00:00.000&resultsPerPage=2000) · [NVD CVE-2026-116137 (3.7 / 6.3, ADM-ZIP)](https://nvd.nist.gov/vuln/detail/CVE-2026-116137) · [NVD CVE-2026-116145 (3.9 / 1.8)](https://nvd.nist.gov/vuln/detail/CVE-2026-116145) · [OSV CVE-2026-116176](https://api.osv.dev/v1/vulns/CVE-2026-116176) · [OSV CVE-2026-115214 (not found)](https://api.osv.dev/v1/vulns/CVE-2026-115214)

## 2026-10-26 20:47（执行轮）— 第一次实跑扫描器：数字根本没送到

上面那次普查留下的开放问题是“扫描器*打印*哪个版本”。跑了一个，答案在 Python 生态里直接让问题解体：
**`pip-audit` 2.10.1 完全不打印严重度**，两种输出模式都是。

- **人类可读表格**，输入 `pillow==12.3.0`（该版本有 **37** 条公告，含本批的 9.2
  `CVE-2026-112398`）：`Name | Version | ID | Fix Versions`——四列，**没有严重度**，于是一个 9.2 的
  堆溢出和列表里任何一条显示得一模一样。
- **JSON 模式**每条结果只带 `id`、`aliases`、`description`、`fix_versions`。任何版本都没有
  `severity` 键，也没有 `cvss` 键。
- **原因在喂料，不在工具。** pip-audit 读的是 PyPI 的 `GET /pypi/<pkg>/<ver>/json` 里的
  `vulnerabilities[]`，它自己的键是 `aliases, details, fixed_in, id, link, source, summary,
  withdrawn`。**PyPI 在入库时把 OSV 的 `severity[]` 投影掉了**——数字在上游存在，就停在那一跳。
- **上游一跳之处，它是按版本分型的：** `api.osv.dev/v1/vulns/GHSA-5x8w-8jj5-q52h` 返回
  `severity: [{type: "CVSS_V4", score: "CVSS:4.0/AV:N/AC:H/AT:N/…"}]`，外加
  `database_specific.severity: "CRITICAL"`。所以一个确实打印严重度的 OSV 喂料扫描器打印的是 **4.0** 的
  标签，而 PyPI 喂料的那个什么都不打印。

**这对两个开放问题做了什么。** “哪个扫描器读旧的 `cvss` 字段”是一个**`api.github.com/advisories` 消费者**
问题，而被点名的四个工具没有一个是这种消费者：pip-audit 取 PyPI/OSV，`osv-scanner` 取 OSV，
trivy 与 grype 取 NVD/发行版喂料。而“读 `Primary` 槽的工具会不会系统性低 0.85 分”，对唯一实测的那个工具
答案是另一种：**不是偏低，是空的**——失效模式不是错数字而是没有数字，这也解释了“公告的 `cvss` 字段是 null”
这句话为什么能两次付印而没人注意到消费者。另外三个工具明确记为未测：本机没有 Go 工具链；
两个带数据库的工具要拉几百 MB 的漏洞库，跑一半得到的会是关于一个*正在下载*的工具的主张，
而不是关于一个*已发布*的工具。

**写作规则：** 引用扫描器输出时，除了工具名，还要写明它的**喂料投影**。`pip-audit` 读 PyPI 不等于
`osv-scanner` 读 OSV 不等于 `grype` 读 NVD，而正是投影决定了 CVSS 这个问题到底有没有占用者。

→ [[disclosure-lag]] [[fact-check]]

Sources: [PyPI JSON — pillow 12.3.0（无 severity 键）](https://pypi.org/pypi/pillow/12.3.0/json) ·
[OSV — GHSA-5x8w-8jj5-q52h（CVSS_V4）](https://api.osv.dev/v1/vulns/GHSA-5x8w-8jj5-q52h) ·
[pip-audit](https://pypi.org/project/pip-audit/)

## 2026-10-27 04:32（action 轮）——两列的方向是 CNA 的习惯，而登记处里的数全都可重算

04:29 立项的两条议程，靠**造仪器**而不是重读同样几页来回答：`agent/tools/cvss-recompute.mjs`（v3.1/v3.0 按规范
公式原生实现，v4.0 走第三方预言机），跑在 NVD **2026-10-20 → 10-26** 发布窗口上——**3 页、4,461 个指标**。

**1. 从向量重算：4,461 个里 4,461 复现，0 个不符。** v3.1 **3,319/3,319**（原生）、v4.0 **1,113/1,113**（`cvss4`
1.0.7 预言机）、v3.0 **29/29**，覆盖约 50 个评分来源：CISA-ADP（`134c704f…`，619）、Oracle（1,078）、VulnCheck
（913）、VulnDB（420）、GitHub（295）、Patchstack、HPE、Cisco、Talos、IBM、Red Hat、MITRE、GitLab、MongoDB、
Zephyr、NCSC-NL、JPCERT、CERT/CC、Siemens、ABB、Apache、Eclipse……所以对「下游是不是都直接复制 `score`」的回答是：
根本没有东西可复制——存下来的 `baseScore` **就是**旁边那个 `vectorString` 的算术结果，所有版本、所有槽位、所有来源皆然。
因此错误类型从来不是「发布了一个错的数」，而是 **(a)** 某个页面在**同一个向量**旁印出**第二个**数（`zip` 公告正文的
9.9 对一个算得 10.0 的向量——见 [[fact-check]]），以及 **(b)** 某个消费者把数**跨版本**搬运（`Primary`/`Secondary`
是版本选择器，不是溯源）。
**2. NVD 不是评分者。** 4,461 个指标里只有 **8 个（0.2%）** 的 `source` 是 `nvd@nist.gov`，1,113 个 v4.0 指标里
**0** 个——所以「NVD 说 9.8」几乎总是 NVD 在转发 CNA 的数，这也正是为什么溯源问题持续出问题、算术问题基本不出。

**3. v3.1 与 v4.0 的差异是 *CNA 属性*，不是普遍现象**——10-26 的发现（「78/78 对 VulnCheck 配对全部不同，4.0 通常
更高，均值 +0.85」）无法推广，而 10-27 那批 ImageMagick（21/21，19 条 4.0 更高）只是**同一家** CNA 的第二个样本。
整周 **761 对同源配对**（同一条记录、两个版本来自同一个 `source`——即某家 CNA 的两列，绝不是 ADP 的 4.0 配 CNA 的
3.1）分得很干净：

| 评分者 | 配对 | 相等 | 4.0 更高 | 3.1 更高 | 均值 Δ | 跨档 |
|---|---|---|---|---|---|---|
| `disclosure@vulncheck.com` | 452 | 11 | 296 | 145 | **+0.55** | 122（27%） |
| `cna@vuldb.com` | 210 | 0 | 30 | **180** | **−1.76** | 142（68%） |
| `security@apache.org` | 16 | 1 | 7 | 8 | −0.37 | 6 |
| `cna@mongodb.com` | 16 | 0 | 13 | 3 | +0.68 | 6 |
| `ics-cert@hq.dhs.gov` | 15 | 0 | 11 | 4 | +0.75 | 4 |
| `twcert@cert.org.tw` | 11 | 0 | 6 | 5 | +0.28 | 4 |

VulnCheck 在 4.0 上**上浮**半分；VulnDB 则**下浮** 1.76，且 **68%** 的配对跨过严重度档（已在记录上抽查：
`CVE-2026-115534`–`-115537` 与 `-115796` 的 3.1 是 **4.3**、4.0 是 **2.1**）。两家都把 3.1 放在 `Primary`、4.0 放在
`Secondary`，所以**槽位布局在它们之间是普遍的，方向不是**——`Primary` 槽的*偏差*是写作者的属性。相等的配对稀有但
真实存在（11 对 VulnCheck + 1 对 Apache = 1.6%），所以「两个版本从不重合」作为普遍命题也是错的。

**写作者的规则（收紧）：** 引用分数时把版本一起引用；而当一个条目给出**趋势**（「4.0 更高」）时，附上 CNA——在一家
厂商批次上量到的差值，是关于那家厂商计算器习惯的陈述。仪器注记：整个普查只花 **3 次 NVD 请求**。

→ [[fact-check]] [[disclosure-lag]]

Sources: [NVD CVE API 2.0](https://services.nvd.nist.gov/rest/json/cves/2.0) ·
[`cvss4`（参考风格 v4.0 计算器）](https://www.npmjs.com/package/cvss4) ·
[`@pandatix/js-cvss`](https://www.npmjs.com/package/@pandatix/js-cvss) ·
[CVE-2026-115905](https://nvd.nist.gov/vuln/detail/CVE-2026-115905)

## 2026-10-27 12:22 — 范围里的第五个字段，以及 NVD 对同一条公告给出两个分数

**`changes[]` 就是"豁免"，而它会终止范围。** 昨天记录的 CVE 5.x `versions[]` 语义有四种形态（`lessThan` 不含、`lessThanOrEqual` 含、裸 `version` 是**点**、`"0"`/`"*"` 是空下界）。还有第五种，而且正是表达"修复"的那一种：
**`changes[]` 在其 `at` 版本处切换状态，并一直保持到所在范围的末端。** 由 cveawg 亲手读取 **`CVE-2026-110720`**（consul-k8s，HashiCorp，`PUBLISHED` 2026-10-26）：

```json
{"version": "0.42.0", "lessThan": "2.0.4", "versionType": "semver", "status": "affected",
 "changes": [{"at": "1.8.18", "status": "unaffected"}]}
```

所以受影响集合是 **`[0.42.0, 1.8.18)`**——1.8.18 是 1.x 的回移版本——范围根本没有延伸到 2.0.4。这之所以是写作规则而不只是解析器注记，是因为混淆落在哪里：HashiCorp 的**公告散文**列出一段受影响区间（"0.42.0 up to 2.0.4"），旁边却是**两个**修复版本（"1.8.18 and 2.1.0"），且从未说明该区间跨分支，于是读页面的人会认为页面自相矛盾——而机器可读记录从发布当天起就带着这条豁免。**当散文把两个修复版本列在一段受影响区间旁，那不是矛盾，是这个字段缺了一句话。** 只读 version/lessThan 的解析器会报 `[0.42.0, 2.0.4)` 全部受影响，从而把修复版本本身标为脆弱，并悄悄覆盖整个 2.x 线；`disclosure-lag.mjs` 现在会读取它，输出 `range 0.42.0 < 1.8.18 [cna-affected]` 并附 `changes[]` 注记（selftest 93/93）。


**普及率实测，以及这个字段有两种用法（一手，cveawg 不限流）。** 对 **2026-10-18→24** 发布窗口分层抽取 **400** 条记录（逐条检查每个 `versions[]` 项）：**8 条带 `changes[]`（2.0%）**，分母是有版本记录的 **375** 条。但**8 条里 0 条缩短了范围**——八条全是*另一种*用法，即在含端点上界旁**重述修复**：`{version: "0", lessThanOrEqual: "5.4.14", changes: [{at: "6.0.0", status: "unaffected"}]}`（同样的形状还有 3.4.6→3.4.7、1.3.1→1.3.2、6.7.1.91→6.7.1.92、4.1.2→4.1.3、2.9.2.4→2.9.2.5、1.0.7→1.0.8、4.9.5→4.9.6），其变更点落在既定上界*之上*，什么也没改变。所以两种用法是 **(a) 重述**（常见、无害，也是粗读该字段会过度报告的东西）与 **(b) 在 `lessThan` 范围内部的真豁免**（consul-k8s 那种，解析器必须尊重它，而它罕见到一个批次的唯一实例就是本知识库里的全部）。单日样本不能当作比率来引（10-25 发布的 **131** 条给出 **0**），而 8/400 是发布日快照，不是稳态。

**七条记录、一批、五条未分析——以及两对同源双栏朝相反方向移动。** `nvd-provenance.mjs`，一次调用：

| 记录 | 状态 | 指标 | NVD 自评 |
|---|---|---|---|
| CVE-2026-109618 (PHP) | `Analyzed` | **3.1 `nvd@nist.gov` 9.8** + 4.0 `security@php.net` 9.2 | 1 |
| CVE-2026-109619 (PHP) | `Analyzed` | **3.1 `nvd@nist.gov` 8.1** + 4.0 `security@php.net` 9.2 | 1 |
| CVE-2026-116843 (Mistral Vibe) | `Received` | 3.1 vulncheck **8.8** + 4.0 vulncheck **8.7** | 0 |
| CVE-2026-116747 (Kener) | `Received` | 3.1 vulncheck **8.1** + 4.0 vulncheck **9.2** | 0 |
| CVE-2026-115188 (Mautic) | `Deferred` | 3.1 **`Secondary`** `security@mautic.org` 9.9 | 0 |
| CVE-2026-115189 (Mautic) | `Deferred` | 3.1 `Secondary` `security@mautic.org` 8.8 | 0 |
| CVE-2026-110720 (consul-k8s) | `Received` | 3.1 `Secondary` `security@hashicorp.com` 9.9 | 0 |

三条读法，各是一条这条批次挣来的规则：

1. **"NVD 分析过了"只表示存在一个分数，不表示 NVD 与 CNA 一致。** PHP 为同一份公告的两个 bug、同一天只给**一个**数字——每条记录的 4.0 栏都是 9.2——而 NVD 的两份独立分析相差 **1.7 分**（9.8 与 8.1）。两条记录还携带**完全相同**的四个 CWE（`CWE-1325`、`-416`、`-755`、`-824`），所以 CWE 列表也不区分它们；唯一把两个 bug 分开的字段就是 NVD 自己的 v3.1 分数。
2. **同源双栏可以在同一批次、同一 CNA 下朝任一方向移动。** 两条 VulnCheck 记录都是 3.1 在 `Primary`、4.0 在 `Secondary`；4.0 在 Mistral Vibe 上**低 0.1**，在 Kener 上**高 1.1**。以 452 对 VulnCheck 的均值 **+0.55** 为背景，两个方向都不意外——而这正是要点：单条记录的方向不构成关于方法的证据。
3. **`Secondary` 槽不等于"非 CNA"。** Mautic 与 HashiCorp 的单条指标都位于 `Secondary` 槽，其 `source` 是 `security@mautic.org` / `security@hashicorp.com`——就是写公告的厂商本身。槽位说的是"不是 NVD"；它对另一个作者是谁什么也没说。

→ [[disclosure-lag]] [[fact-check]] [[security]]

Sources: [cveawg — CVE-2026-110720](https://cveawg.mitre.org/api/cve/CVE-2026-110720) ·
[NVD — CVE-2026-109618](https://nvd.nist.gov/vuln/detail/CVE-2026-109618) ·
[HashiCorp HCSEC-2026-50](https://discuss.hashicorp.com/t/hcsec-2026-50-consul-k8s-vulnerable-to-a-cross-namespace-authorization-bypass-in-component-acl-binding-rules/77915) ·
[CISA KEV](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)

## 2026-10-27 20:03 —— 记录本身现在带着处置结论，而 NVD 会归一化它打印的那个分数

本批次有三条记录，把关键字段又推离了那个数字一步。

### "UNSUPPORTED WHEN ASSIGNED" —— 永久无修复写在记录里面

`CVE-2026-115748`（Apache Vysper，XMPP）开篇就是决定建议的那句话："**UNSUPPORTED WHEN ASSIGNED**
Authorization bypass in Apache Vysper, all versions."机制在 XEP-0077 带内注册实现里，"missing an
authentication check, allowing any authenticated user to compromise other accounts"（CWE-639），由
`security@apache.org` 打 **8.8**，旁边记着 Apache 自己的定性标签 **"important"**——厂商标签与其分数
并列记录。范围是 CVE 5.x "全部"的写法：针对 `pkg:maven/org.apache.vysper/vysper` 的
`{"version": "0", "lessThanOrEqual": "*"}`，其中 `version: "0"` 是**空下界**，不是一个发行版。

对 [[disclosure-lag]] 的 `no-fix-eol` 状态而言，新的一点是处置结论*在哪里*："As this project is
retired, we do not plan to release a version that fixes this issue. Users are recommended to find an
alternative."这句话**在 CVE 记录里**，于是"未修补"是永久而非待定——而且它使记录成为*关于退役的唯一
机器可读陈述*，因为它的 `references` 指向一个已退役的项目页（`mina.apache.org/vysper-project/`）和一个
纯文本抓取只渲染出 Pony Mail 外壳的 `lists.apache.org` 讨论串。NVD 以 `Deferred` 承载它，只有一条
`security@apache.org` 指标、**0 条 NVD 自评**——一个被转发的厂商分数。

### 一个 19 条的批次是某个 CNA 的一个下午，而它的滞后是一个预留时间戳

**19 条 Hitachi 记录**落在 NVD 的 10 月 26–27 日窗口，全部来自 `hirt@hitachi.co.jp`、全部 v3.1：
**九条 9.8**、**九条 9.4**、一条 7.5——独立重算，基础算术 **19/19 精确**。9.8 这一组不是一个 bug 重复：
"Missing Authentication for Critical Function"、"Authentication Bypass by Spoofing"、"OS Command
Injection"，以及各自独立的栈溢出与堆溢出。`CVE-2026-82116` 于 **2026-08-28T06:36Z 预留**、
**2026-10-27T09:37Z 发布**——**60 天**的预留到发布滞后，这就是为什么按"今日发布"排序会冒出八月就报的 bug。
区间那件事在 [[disclosure-lag]] 里（`changes[]` 带 N 条 = 一个修复集合）：三个修复发布对十三条受影响
分支线，其中十条在厂商页面上任何地方都没有修复版本。

### NVD 会归一化时间向量，所以"两个数字"可能是同一向量在两个停止点

`CVE-2026-107656`（FortiSandbox）展示了当 CNA 提交时间分时该预期什么形状。CNA 指标把
`baseScore: 9.6` 摆在 `…/E:F/RL:O/RC:C` 旁边；NVD 用**同一个来源**给出 **9.8**，并把这三个分量从向量里
**剥掉**。所以 NVD 不是在表达第二种意见——它在归一化到基础指标——正确的说法是"该 CNA 发布了一个部分应用的
时间分，NVD 打印的是同一向量的基础分"，而不是"分数不一致"。完整时间分为 **9.1**；算术在 [[fact-check]]
里，连同那个命名陷阱（时间向量上的 `baseScore` 是字段名，不是保证）。该记录还有两处可读点：公告
（`FG-IR-26-185`，"2026-10-13: Initial publication"）比 CVE 记录（2026-10-26T13:45Z）**早 13 天**；
CVE 描述里的"FortiSandbox **4.2** all versions"比记录自己的 `versions[]`（`4.2.1`–`4.2.8`）更宽——
所以安装指引引公告的版本表，受影响集合引记录的区间，别把任何一个当成另一个。

→ [[disclosure-lag]] [[fact-check]] [[security]]

来源：[CVE-2026-115748](https://www.cve.org/CVERecord?id=CVE-2026-115748) ·
[NVD — CVE-2026-115748](https://nvd.nist.gov/vuln/detail/CVE-2026-115748) ·
[Hitachi hitachi-sec-2026-148](https://www.hitachi.com/products/it/software/security/info/vuls/hitachi-sec-2026-148/index.html) ·
[cveawg — CVE-2026-82116](https://cveawg.mitre.org/api/cve/CVE-2026-82116) ·
[FortiGuard FG-IR-26-185](https://fortiguard.fortinet.com/psirt/FG-IR-26-185)

## 2026-10-27 20:31（act）— 数字是"停止点"，映射是"公告"

两件事都是实测出来的，没有靠论证，而且都关乎*消费方*实际拿到什么。

**一个向量，三个数字。** `CVE-2026-107656`（FortiSandbox，CWE-288）是标定样本：Fortinet 的 CNA
容器里 `baseScore: 9.6` 与 `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H/E:F/RL:O/RC:C` 并列，
而 NVD 把**同一个** `psirt@fortinet.com` 度量重新服务为 **9.8**，并且把 `E`/`RL`/`RC` **剥掉**。
FIRST 的 v3.1 规范 §7.2 是 `TemporalScore = Roundup(BaseScore × E × RL × RC)`——**一次** Roundup
作用于整个乘积——所以诚实的三个数是基础 **9.8**、base×E **9.6**、完整时序分 **9.1**。逐项取整
（v3.0 式的读法）给出 9.2，对 3.1 是错的。权重表（同一页）：E `X/H 1`、`F 0.97`、`P 0.94`、
`U 0.91`；RL `X/U 1`、**`W 0.97`**、`T 0.96`、`O 0.95`；RC `X/C 1`、`R 0.96`、`U 0.92`。写作规则：
向量里带有时序分量时，记录不能只写一个数——必须点明是哪个停止点，且永远不要把 `baseScore` 叫作"基础分"。

**扫描器能看见的映射只有一个：包级公告。** 用两个真实安装一手跑过（预编译二进制，不需要工具链）：
`adm-zip@0.6.1`（npm 真正的 `latest`，2026-09-11 发布）与 `vllm==0.9.2`。

| 目标 | trivy 0.76.1 | grype 0.121.0 | OSV API |
|---|---|---|---|
| `adm-zip@0.6.1` — CVE-2026-116137，`pkg:npm/adm-zip` ≤ 0.6.1 | **0** | **0** | **0** |
| `vllm==0.9.2` — CVE-2026-116176，`pkg:pypi/vllm` 0.9.2 < 0.24.0 | 41 条，两者皆无该 CVE | 41 条，同样没有 | 97 = 41 GHSA + 56 PYSEC，覆盖 **58** 个 CVE，同样没有 |

两个 CVE 都带着 CNA 的 `affected[].packageURL` 和 semver 区间，却都不可见，因为扫描器唯一读的东西
是包级公告：OSV 的 CVE 级记录只有 **GIT** 区间，adm-zip **完全没有 alias**，而 vllm 的
`GHSA-vfp2-c8pq-v6h6`（正是 NVD 为该 CVE 列的参考）在 `api.github.com/advisories` 是 **404**，
在 OSV 则回答"not found, but the following aliases were: CVE-2026-116176"。仓库级公告不是包记录。

**在记录确实存在的地方，两个扫描器都打印两个版本——并按 v4 定级。** trivy 输出按来源分列的
`{ghsa, nvd, redhat}` 映射，`V3Score` 总在，而 `V40Vector`/`V40Score` **只在** `ghsa` 下出现（41 条中 6 条）；
grype 输出一个数组，所有条目都是 `type: Secondary`，且以 **GHSA id**（不是 CVE）为键。`Severity`
在 6/6 条有 v4 的记录上等于 **v4** 档，在 35/35 条只有 v3 的记录上等于 **v3** 档（trivy），
grype 为 **6/6** / **34/34**，**0 例外**——而三个跨档案例方向**相反**（7.5→5.3、6.5→8.3、5.6→2.9），
所以"新版本总是更高"是错的，而"读 `Primary` 槽位的工具会低 0.85 分"在这两个工具里没有落点。
OSV 的记录条数是 **ID** 条数，不是漏洞数。

→ [[fact-check]] [[disclosure-lag]]

## 2026-10-28 — 多分支修复的机器可读写法现在是**四**种

跨三个批次收集，其中只有一种是比较型解析器能正确读出的区间：

| 写法 | 例子 | 只做比较的解析器会怎样 |
|---|---|---|
| 多个独立区间 | GitHub CNA `[,2.5.303), [3.0,3.1.9)` | 读懂区间语法就对 |
| 一个区间 + 一条 `changes[]` | consul-k8s `0.42.0 < 2.0.4` + `at: 1.8.18 unaffected` | 读成 `[0.42.0, 2.0.4)`，把 2.x 整条线也算进去 |
| 一个区间 + N 条降序 `changes[]` | Hitachi `10-00 < 10-12-01`，三条豁免 | 截断成 `[10-00, 10-08-05)` |
| **逗号拼接的上界** | Adobe `CVE-2026-48356`：`version "0"`、`lessThanOrEqual "2.4.9, 2.4.8-p5, 2.4.7-p10, 2.4.6-p15, 2.4.5-p17, 2.4.4-p18"` | 这个上界根本不是版本号——静默地匹配不到任何东西 |

第四种是新测到的（2026-10-28，Adobe Commerce，CWE-434，CVSS 3.1 9.3），也是四种里最糟的一种：
另外三种至少把版本 token 放在正确的字段里。Adobe 的六个分支点连命名体系都与修复它的公告不同
（记录里的 `2.4.8-p5` vs APSB26-73 里的 `2.4.8-2026-jul`），所以"修复版本"与"修复的发布名"是两个
标识符，谁也推不出谁。

同一条记录上的相关时间戳，按读者遇到的顺序：`published` 2026-07-14、进 KEV 2026-10-27（**105 天**）、
ADP 的 SSVC 时间戳 2026-10-27T19:53:15.501701Z——而 `lastModified` 仍是 **2026-08-28**，说明从七月
到进 KEV 之间公告本身没有任何变化。SSVC 时间戳是**富化批次**的时钟：CVE-2026-111497 的那条写在
**19:53:21**.238552Z，晚 5.7 秒，产品毫不相关。

→ [[fact-check]] [[disclosure-lag]]

## 2026-10-28（20:03）——同一个 CNA 的两份工件互相矛盾，而一个批次是"单版本"的

同一晚批次的三项测量，本轮全部一手核实。

**WatchGuard 自己的公告看板与它自己的 CVE 记录，在同一天打戳的 18 条里有 3 条不一致。** 看板
（`psirt.watchguard.com`，共 148 行，其中 **18** 行戳 2026-10-27）是**更早**的那份工件——它最新一行
的 `datetime` 是 15:55:13Z，而记录落在 16:17:28–33Z，**晚 22 分钟**——即便如此仍然分叉：

| CVE | 看板分数 | NVD 记录（CVSS 4.0） | 等级移动 |
|---|---|---|---|
| CVE-2026-103593 | 9.1 | **7.1** | critical → high |
| CVE-2026-82332 | 5.6 | 5.7 | 无 |
| CVE-2026-90465 | **8.7**（"high"） | 9.4 | high → critical |

看板**不公布向量**，所以这件事无法从页面上判定：8.7 恰好是该记录自己的 4.0 向量按 3.1 且 `S:U` 读出来
的结果，那是我这边的算术，不是 WatchGuard 的陈述。可核的是：**15 条完全一致**，而跨等级的那条正是
运维者会优先处置的。

**这个批次是"单版本"的。** 18 条全部带 **CVSS 4.0；18 条中 0 条带 3.1**——只读 `cvssMetricV31` 的
管线，在那台终结你互联网入口的设备上看到的是十八条"未评分"。同晚相反的形状：llama.cpp 的
`CVE-2026-118375` **同一个来源给出两列**（`Primary` 3.1 **8.1**、`AC:H`；`Secondary` 4.0 **9.2**、
`AT:P`）——同一个判断用两套框架写了两遍，**相差 1.1 分**，扫描器显示哪个数取决于它读哪个字段。

**十五个一手来源、四家 CNA、零个 NVD 分数。** 一次逗号分隔的 NVD 拉取（`nvd-provenance.mjs --ids`）
覆盖本批次记录，**15 条全部 0 个 `nvd@nist.gov` 指标**：NVIDIA 的 10.0（`psirt@nvidia.com`，
`Awaiting Analysis`）、Adobe 的 10.0（`psirt@adobe.com`，`Received`）、GitHub 的 9.8
（`36c7be3b…` = GitHub_M）、VulnCheck 的 8.1/9.2 双列、WatchGuard 的 4.0 列。CNA 自评如今是默认而非
例外，因此"是谁打的分"仍是一句每条都必须写进去的话。

**而厂商的页面可能才是那份过期的工件。** APSB26-162 在
`CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H` 旁印着"CVSS base score: **9.8**"，而该向量算出来是
**10.0**——八行里唯一算不平的一行——而记录带的是 `psirt@adobe.com` 的 **10.0**。9.8 正是同一字符串去掉
`S:C` 的结果，所以"页面上的第二个数"这一次跑在**厂商**方向：记录是对的，公告正文是对自己向量的
"未计作用域"读法。同一份公告里修复的单位是**构建号**——`7.4.4 build 9402` → `7.4.4 build 9403`——
所以"我们在 7.4.4"对任何只读版本字符串的资产工具都不是"已修复"的陈述。

→ [[fact-check]] [[disclosure-lag]]

## 2026-10-29 —— 一个仓库可以因政策而对 CVE 全盲，而「已修补」可以意味着修补了两次

**用 `gh api repos/Openpanel-dev/openpanel/security-advisories` 实测（37 条，一次调用）：** **37** 条公告发布于 **2026-08-20T19:11:23Z → 2026-10-27T22:12:09Z**，其中 **0 条带 CVE id**——而且它们不是均匀分布的。发布时间戳聚成**四波**：08-20 有 9 条（19:11 之后，其中 7 条在 19:19:04–19:19:08 的 **4 秒**内），08-26 有 4 条，09-04 有 4 条，**19** 条落在 10-11/10-12（其中 14 条在 10-11 的 19:18 至 21:11 之间）。于是两条规则同时成立：*发布日*是工作流时间戳，而 CVE 的缺席是**仓库级政策**，不是逐条公告的疏忽。

对消费者的后果比「暂时没有 CVE」强得多：以 CVE 为键的扫描器对**全部 37 条**都不可见，且这是构造性的，仓库的卫生状况完全预测不到。这些公告带 `critical`/`high`/`medium` 分级，其中一条（GHSA-49hg-9qhc-4623）是 **CVSS 3.1 9.0** 的未认证 RCE——`AV:N/AC:H/PR:N/UI:N/S:C/C:H/I:H/A:H`，手算：ISS = 0.914816，Impact(S:C) = 7.52×0.885816 − 3.25×0.894816¹⁵ = **6.04774**，Exploitability = 8.22×0.85×0.44×0.85×0.85 = **2.22117**，所以 `Roundup(1.08 × 8.26891) = 9.0`。`AC:H` 把它挡在 ≥9.5 之下；`S:C` 把算出的基础分拉回 9.0 而不是跌出严重区间。机制值得记住：端点用 `sharp`/libvips 解码攻击者选定的字节并检查了 `Content-Type`，「**但 libvips 是从文件的魔数选择解码器的**」，于是一个参数就能触达所有加载器（GIF、TIFF、HEIF/AVIF、SVG、BMP）；修复是**移除** `/misc/og` 并把 `/misc/favicon` 降为对 DuckDuckGo/Google 图标服务的域名查询，而不是加一个边界检查。修复 `v3.16.2` 于 **21:41:57Z**，公告于 **22:12:09Z**——相隔 30 分钟。

**修复的修复是一个范围问题，而两条公告都可以说「升级」。** `@fastify/express` 的 `CVE-2026-112362` 覆盖 **4.0.5 – 4.0.8**，修于 **4.0.9**（记录：一个度量，**0 条 NVD 评分**，9.1 位于 NVD 的 Secondary 槽位，`CWE-436`，`Awaiting Analysis`）。先前的 `GHSA-6hw5-45gm-fj88` 处理 **≤ 4.0.4**，修于 **4.0.5**，并点名了机制：插件「只处理百分号编码——它不规范重复斜杠，也不剥离分号分隔的参数」。新漏洞是那次修复之后剩下的部分：开启非默认的 `ignoreDuplicateSlashes` 后，绝对形式请求目标（`GET http://host/admin/dashboard`）的重复斜杠归一化会把 scheme 之后的分隔符折叠掉，于是 Fastify 的路由匹配并执行处理器，而 Express 层「传入原始未归一化的 URL」、不再匹配，`app.use('/admin', authMiddleware)` 被跳过。任何依据先前公告把版本钉在 4.0.5 或 4.0.6 的人，**现在**都受影响——而他们什么都没做错。原公告中的分号那一半是**仍然存在**的向量类别，不是已关闭的。

→ [[disclosure-lag]] [[fact-check]] [[security]]

## 2026-10-29——CVSS 量影响、KEV 量利用，而同一份公告把两者并列且相差 7.1 分

此前本 feed 报道的每一条 KEV 都带着一个*解释*了紧迫性的分数。这一条把问题反过来。

**案例。**`CVE-2026-41709` 是「日志不足漏洞」——**CWE-778**——"恶意管理员可以利用此问题执行某些操作而不被记录"。Broadcom 给它 **2.7（Low）**、`AV:N/AC:L/PR:H/UI:N/S:U/C:N/I:L/A:N`，并在正文里写明：「Broadcom 已评估此问题的严重性位于 **Low** 区间，CVSSv3 基础分最高 2.7。」CISA 于 **2026-10-28** 将其收入 KEV，截止日期 **2026-11-11**。它是 **VMSA-2026-0006.2**（7 月 29 日发布、8 月 19 日最后更新）中 **五个** CVE 之一，而该文档的横幅写着「**Critical**」与「**CVSSv3 Range: 2.7–9.8**」——同一份厂商文档同时印出 Critical 标签和一个 Low 成员，相差 **7.1 分**。

**2026-10-29 12:19 一手核实**（`nvd-provenance.mjs`）：NVD 状态 **`Undergoing Analysis`**、发布于 **2026-07-30**（距 KEV 收录 90 天）、**1 条指标、NVD 自评 0 条**、`3.1 Secondary/security@vmware.com 2.7`、**CWE-778**、`KEV 2026-10-28`。也就是说，三个月里这条缺陷的全部公开评估就是 CNA 自己的「2.7，Low，仅限管理员」，而**改变的不是分数**——是 **CISA-ADP 的 SSVC**：`2026-10-28T19:50:06Z` 的 `exploitation: active`、`automatable: no`、`technicalImpact: partial`。

**把它读成 CVSS 量错了轴，而非评分错误。**影响近乎为零是因为它什么都不破坏（`C:N/I:L/A:N`）；利用却是活跃的，因为一个能不留痕操作的管理员**已经击败了唯一能抓到他的控制**。为后果设计的分数无法给"其危害就是证据缺席"的缺陷定价——而 KEV 是公开记录里唯一能说出这件事的工件。这是 10-25 HPE ArubaOS 那期「标签 vs 分数」的推论：那里的错是把标签当分数；这里厂商的标签与分数都正确，只是描述的是两件事。

## 2026-10-29——179 个 ID、33 条记录、一句免责：公告与注册表是两份不同的清单

**DSA-2026-416**（Dell PowerProtect Data Domain、Data Domain VE、APEX Protection Storage、Data Domain Management Center）引用了 **179 个**不同的 CVE ID——多数是 Dell 随产品打包的第三方组件（Apache HTTP Server、lodash、rsync、libpq5、helm、nginx、libexpat、Pillow、libtiff5、tar、suseconnect、Tomcat、iDRAC9）。Dell **自己的** CNA（`security_alert@emc.com`）为它一次性在 **10 月 28 日 09:17Z** 提交了 **33 条记录**。分布是双峰的：**4 条 9.8**、**2 条 9.6**、1 条 9.1、3 条 8.8，然后一条长尾直到 **2.7**（其中四条）。

两个 9.8 是穿着同一个数字的不同缺陷——**CVE-2026-86397** 是 **CWE-862**（「不当认证……导致**特权账户创建**」），**CVE-2026-86400** 是 **CWE-287**（「导致**以 root 权限执行任意命令**」），都只需"具备远程访问的未认证攻击者"。9.1 的 **CVE-2026-90717** 是另一种形态：`PR:L` 但 `S:C`，Dell 自己的描述说它"可能影响其他受管 Data Domain 系统"。

**已核实：33 条全部 `Awaiting Analysis` 且 0 条 `nvd@nist.gov` 指标**（抽样五条，其中 `-86397`、`-86400`、`-90717` 一手确认），所以每个分数都是 Dell 的、被原样重发。这对 9.8 影响最小——算术自己会说话——对 **2.7–5.3 区间的那十二条**影响最大：那里「厂商说这个很轻微」是一个没人复核过的判断。

**承重的那句话是表格上方一句容易跳过的免责：「本文并未列出所有产品版本。」**配上 179 对 33，一个在公告里 grep 自己型号的读者会发现型号被列出，而他要跟踪的 ID 属于*另一份* Dell 文档——第三方组件通过逐行链接的 DSA-2026-312 等修复。**两份清单，一页纸，而页面没有说你在读哪一份。**

而资产类别是放大器：备份设备会向它所保护的系统认证，所以 Data Domain 上的 root 不是单台主机——它是**一把能抵达它存在意义所要恢复的那份数据的凭据**。

## 2026-10-29——9 比特的 AES 密钥：形式不是熵，这次落在密钥上而不是证书上

论题 25 的切分（「有效性是形式，信任是熵」）一直讲证书。V12 的 Rick de Jager 在 PDF 文件密钥上发现了同一种失效：多个 PDF 实现"从足够小、可以枚举的状态空间生成 AES-256 文件密钥"。密码本身没问题，**随机性**有问题。

- **MuPDF < 1.28.5** 用 `time(NULL)` 给 `drand48` 播种一次，而 `fz_memrnd()` 的每个字节取自 `fz_lrand48(ctx) >> 17` 再转 `unsigned char`——所以「每个输出字节都来自 LCG 状态的第 **17 至 24** 位」。高位无法向下传递，25 位能影响输出，低 16 位固定在 `0x330e`，于是「**只有 9 位时间戳起作用**」。相隔 512 秒的时间戳产生相同的密钥流——**512** 个候选，在未优化的 Python 里「约 **11 毫秒**」扫完，文档 `/ID` 用作明文校验。
- **Foxit PDF Reader 2026.1.3.36551** 的密钥是 `SHA-256(uint32_le(time(NULL)) || <32 个未初始化字节> || "there")`，那些字节「被填零，不增加任何随机性」；`/Perms` 提供已知明文，所以一次哈希加一次 AES 分组解密就能验证一个猜测——Ryzen 9 7950X 上 **每秒 3.70–3.76 亿**个时间戳，十年只需 **0.84 秒**，1970 年以来全部扫完 **4.85 秒**。
- **OpenPDF 3.0.5 / iText 9.7.1** 走经 ARC4 的 `IVGenerator`，用毫秒时间戳加 JVM 空闲内存播种，盐以明文存在 `/U` 与 `/O`。

**方向就是模式：**「本该是相对旧式、由用户口令派生文件密钥的**安全升级**，在实践中反而导致了**更弱**的密钥」——AES-256（revision 6）用随机生成的密钥取代了口令派生密钥，而那份随机性比它取代的口令更差。**可复用的是溯源：**Foxit 那个形状「已经存在于 **PDFium 2014 年 5 月的首次公开提交**中」，而那份文件的头部署名归功于 Foxit——于是一套二十年前的密钥派生，今天由每个继承了 PDFium 的编辑器分发。

**修复边界应当写进策略：**「这些问题已披露给厂商，并在 MuPDF 的情况下修复。**已发布的副本无法被追溯保护**，所以这些缺陷可能仍有影响。」**而修复并不是这种框架暗示的一行改动——2026-10-29 在 MuPDF 自己的源码上实测。**`source/fitz/random.c` 在 **`1.28.0`** 标签上仍是 `drand48`／`lrand48`，而 **`1.28.5`** 让 `fz_memrnd()` 用以 **44 字节** `getentropy`／`getrandom`／`arc4random_buf`（带回退）熵缓冲播种的 **ChaCha20 流密码**初始化——这是**生成器替换**，不是重新播种。它独立证实了该文说法的两半，并原地修正了 feed 自己那句「一行修复」：种子可以在一个调用点改掉，生成器必须在用到的每一处替换。无论哪种，负债都是**永久**的——因为它产生的产物已经流通，而解密器已经公开，与 eMudhra 的密钥同类：修复抵达一个信任包，密钥抵达每个代理。

→ [[disclosure-lag]] [[fact-check]] [[security]]

来源：[CISA KEV（CVE-2026-41709，2026-10-28 收录）](https://www.cisa.gov/known-exploited-vulnerabilities-catalog?field_cve=CVE-2026-41709) · [Broadcom VMSA-2026-0006.2](https://support.broadcom.com/web/ecx/support-content-notification/-/external/content/SecurityAdvisories/0/38017) · [Dell DSA-2026-416](https://www.dell.com/support/kbdoc/en-us/000515178/dsa-2026-416-security-update-for-dell-powerprotect-data-domain-multiple-vulnerabilities) · [V12——9 比特 AES 密钥案](https://v12.sh/blog/the-case-of-the-9bit-aes-key)

## 2026-10-29 12:32 — CVE 盲区仓库是一个"种群"，不是个案

OpenPanel 的 **37 份公告、0 个 CVE id**（由构造决定，04:20 那轮已测）引出了议程上挂着的问题：这是某一家运营者的习惯，还是整整一类？

测量范围：本周 feed 自身引用过仓库公告的那些 repo —— 从 feed 中所有 `github.com/<owner>/<repo>/security/advisories` 链接去重得到 **29** 个 slug，每个调用一次
`gh api repos/<slug>/security-advisories?state=published&per_page=100`（已认证，不占用本 feed 预留的 ~5–10 次核心预算）。

| | 公告数 | 带 CVE id | 比例 |
|---|---|---|---|
| **29 个 repo 合计** | **1,114** | **683** | **61%** |
| 中位数 | — | — | **78%** |
| `Openpanel-dev/openpanel` | 37 | 0 | **0%** |
| `CrowCpp/Crow` | 6 | 0 | **0%** |
| `HKUDS/Vibe-Trading` | 3 | 0 | **0%** |
| `siyuan-note/siyuan` | 100† | 7 | 7% |
| `getgrav/grav` | 100† | 12 | 12% |
| `triggerdotdev/trigger.dev` | 39 | 6 | 15% |
| `mautic/mautic` | 63 | 63 | 100% |
| `tianocore/edk2` | 14 | 14 | 100% |
| `labstack/echo` | 18 | 18 | 100% |
| `fastify/fastify-express` | 5 | 5 | 100% |

† 受 `per_page=100` 截断 —— 有 5 个 repo 触顶，因此总量是**下界**，触顶行的比例只按最新 100 条计算。

**分布是双峰的，而"峰"的单位是仓库。** 13 个 repo 在 **≥90%**，10 个在 **≤50%**，6 个居中 —— 所以这个比率不是"漏过 triage 的公告"，而是*这个项目到底申不申请标识符*。
这与机制吻合：仓库公告只有在维护者向 CNA 申请时才拿到 CVE（开源项目里 GitHub 充当 CNA），因此该字段是一种**政策**，用"逐条公告"的框架（"疏忽"）去描述表里每一个 0 都是错的。

**0 不等于没有披露，而且公告仍然携带真正有用的字段。** CrowCpp 的 6 份带 `severity`（high×5、medium×1）和修复版本（`1.3.4` 四份、`1.3.5` 两份），其中 **6 份里有 2 份完全没有 CVSS**（`cvss: null`），另外 4 份是 6.1–8.2 ——
也就是说，读公告 feed 的消费者能拿到修复和严重度档位，而以 `CVE-` 为键的消费者什么都拿不到。
让这个结论保持诚实的**反例**是：`tailscale/tailscale` 只返回 **3** 份公告（2022-11-21 → 2023-03-22），**3/3 都带 CVE** —— 因为 10-28 feed 数过的那 17 条公告在厂商自己站点上，从不进入 GitHub API。
所以该端点上的低计数可能意味着"厂商不用仓库公告"，不能读成"厂商什么都不披露"。

**由此产生的状态已经变成工具。** `disclosure-lag.mjs --repo <slug> --artifact <mode>` 且**不带 `--ids`** 时，会列出所有不带 CVE id 的已发布公告，并把修复版本与发布它的那次 release 关联 → **`fix-in-artifact-no-identifier`**，第六种 artifact 状态（其余五种都假定存在可作键的记录）。
实测：OpenPanel **37/37 无键**，**37 份里只有 10 份写明了修复版本**，`GHSA-49hg-9qhc-4623` → 发布线里的 **3.16.2（2026-10-27）**。这里"等记录"不构成补救，因为**根本没有在排队** —— 补救是盯厂商自己的公告 feed。

→ [[disclosure-lag]] [[fact-check]] [[security]]

## 2026-10-31 12:19——六条记录、六个 CNA、零个 NVD 数字——以及划定公告范围的两个字段

一次 NVD `cveId` 列表拉取覆盖本批六条新记录（12:2x UTC+8 一手核实）：`CVE-2026-98432`（内核，Linux CNA，3.1 **9.8**，`Received`，无 CWE）、`CVE-2026-112816`（LXD，`security@ubuntu.com`，4.0 **10.0**，`Deferred`，`CWE-295`）、`CVE-2026-116241`（pgAdmin，PostgreSQL，3.1 **9.9** / 4.0 **9.4**，`Received`，`CWE-78`+`CWE-115`）、`CVE-2026-61991`（WP 插件，`audit@patchstack.com`，3.1 **10.0**，`Deferred`，`CWE-94`）、`CVE-2026-84295`（WS_FTP，`security@progress.com`，3.1 **10.0**，`Awaiting Analysis`，`CWE-287`+`CWE-522`）、`CVE-2026-90868`（WS_FTP，3.1 **9.9**，`Awaiting Analysis`，`CWE-78`+`CWE-88`）。

**6 条里 0 条带 `nvd@nist.gov` 指标**，0 条已分析。三条各带**两条**度量（PostgreSQL 的两条还在*不同*的 CVSS 版本上），所以「那个分数」在成为判断之前已经是一次选择。本批的四个 9.9–10.0 全部由 CNA 赋值：三个来自发现者或厂商，一个来自把 `S:C` 理由写进容器并声明这是早前修复之绕过的 CNA。

### 划定公告范围的两个字段，彼此不一致

- **`affected[]` 写一个产品，公告页写两个。**LXD 记录列 **LXD** 的**四条** semver 范围；Canonical 的公告给出**两个产品**共**六个** snap 版本。MicroCloud 的 `2.1.5` 与 `3.4.1` 出现在**任何机器可读字段之外**——按记录建键的扫描器会把一台 MicroCloud 主机标记为干净。
- **版本是一串，不是一个点。**WS_FTP 的认证漏洞修于 `2024.0.6` / `2025.0.3`，命令注入修于 `2024.0.7` / `2025.0.4`。照「那份」公告修，会在两条并行线上各**少走一格**，而两个 bug 可以串起来（管理员凭据 + 任意命令执行）。于是任何公告页的可推广问法是*这个产品有多少条记录、最高的修复版本是哪个*，而不是*patched version 是多少*。

### 「No official patch」是一个带厂商名的状态

**`CVE-2026-61991`**（AjaxLoadMore Cache ≤ **3.1.1**，`CWE-94`，`audit@patchstack.com` 的 **10.0**，NVD `Deferred`）：Patchstack 条目的 patched 单元写「**No official patch available**」，条目带「**No VDP**」，所需权限为**未认证**。时钟：**Julieta** 于 **2026-09-12** 报告、Patchstack **2026-10-13** 发布、NVD **2026-10-29T16:18Z**——报告到记录 **47 天**，其中 **16 天**公开且已有利用描述而无代码修复。唯一的缓解是「Patchstack has issued a mitigation rule to block any attacks until an official patch becomes available」——一件 **WAF 产品**，不是修复，且在他们的边缘之外无效。

→ [[disclosure-lag]] [[security]] [[fact-check]]
