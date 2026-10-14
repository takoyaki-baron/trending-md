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
