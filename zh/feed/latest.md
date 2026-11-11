---
date: 2026-11-11
updated: 2026-11-11T04:50:47Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 28
license: CC-BY-4.0
---

# trending.md — 2026-11-11

## 1. AlphaProof Code 用 Lean 机器检查 Signal 的协议——六百万行证明、四周时间、抓出两个被注入的 bug

- **Velocity:** ▮▮▮ trending
- **Source:** Google DeepMind · HN 510 分 · 11 月 10 日（~20:11 UTC+8）
- **Tags:** `deepmind` `formal-verification` `security`

Google DeepMind 发布 **AlphaProof Code**，一个用于形式化验证的 agentic 框架：人类专家撰写安全目标，AI agent 将其翻译成规约并产出证明，而**每一条证明都由 Lean 机器检查**。应用于 Signal 的协议时，agent 在**四周**内生成了**超过六百万行 Lean**，验证*编译后*的代码满足所声明的性质——临时设备失陷前后的消息保护——一直验证到设备上运行的代码。作为健全性检查，DeepMind 把两个真实的、此前已修复的 bug 重新注入一份隔离副本，系统随即产出机器检查过的证明，说明带缺陷的版本不安全。约 **1% 的代码库证明被标记需要人工审查**。验证工件已开源在 google-deepmind.github.io/code-verification。

**Why it matters:** 这个主张的范围划得很谨慎，而划定范围本身就是故事：结果证明的是代码"delivers the security protections our experts specified"——不是 libsignal 没有 bug，且 bug 测试跑在隔离副本上而非生产环境。Signal CTO Ehren Kret 称 agent 生成的 Lean 是 "a major breakthrough"，而 DeepMind 自己也注明 "scaling these techniques requires continued research"。无论这些保留意见怎么读，对一个已部署的密码协议做到实现级验证都是第一次。

> "Using AI agents to translate live code into valid Lean theorems is a major breakthrough." — Ehren Kret, Signal CTO

[`🔗 DeepMind：Introducing AlphaProof Code`](https://deepmind.google/blog/introducing-alphaproof-code/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50439193)

---

## 2. Gemini 4 Carbon 现已可用——Google 最强模型开放，带着一个 0% 提示注入的主张和摆在旁边的一条保留意见

- **Velocity:** ▮▮▮ trending
- **Source:** Google · HN 249 分 · 11 月 11 日（~00:07 UTC+8）
- **Tags:** `google` `model-release` `benchmarks`

Google 于 11 月 10 日让 **Gemini 4 Carbon** 正式开放（generally available），距其公布（10 月 28 日）三周，距通过 Fairwind Program 给网络防御者提前访问两周。定价为 **11 月 30 日前每百万输入 token 2 美元、输出 10 美元**，**12 月 1 日起翻倍至 4/20 美元**——与 Gemini 4 Argon 同一条轨迹。主张清单很宽：CursorBench 4.0 第一，Perplexity 的 WANDR 与 Zapier 的 AutomationBench 上的成绩对应每任务成本低 2 倍以上，新出的 Multimodal Knowledge Agent 基准第二，SEC-bench Pro、ExploitGym 与 CWE-bench v1 领先，以及 **Project Fortify 在扫描上 100% 召回、分诊上 95% 精确率**——一个内部基准。安全数字：单次尝试攻破率 0.8%（Argon：3.1%），Gray Swan 网络攻击成功率 2.17%，以及 **在 Gray Swan 的提示注入基准上 0% 成功**。可在 AI Studio、Google Antigravity（带 `/swarm` 预览）、Gemini 应用与 AI Mode 中使用；全文没有一处提到 Vertex AI。

**Why it matters:** 0% 注入结果自带星号，同一篇博文里就引用了："prompt injection robustness remains an area for continued improvement"，且红队发现在某些分布下对抗复杂攻击仍有改进空间。这才是读这里所有标题数字的正确方式——几个对比基准（Fortify、agent 诚实分）是 Google 内部或合作伙伴运行的，定价脚注还注明 12 月的翻倍"applies to the Carbon model intended for public access only"。

> "Carbon is our strongest model with frontier performance in cybersecurity capabilities and long-horizon agentic workflows."

[`🔗 Google：Gemini 4 Carbon is now available`](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-carbon-now-available) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50442303)

---

## 3. 11 月补丁星期二一天内向 NVD 落下 1,094 条 Microsoft CVE 记录——而标记 "exploited" 的那条是一个 Moderate 6.5 的 Outlook 漏洞

- **Velocity:** ▮▮▮ trending
- **Source:** MSRC CVRF 2026-Nov + NVD · 11 月 10 日（22:17–03:21 UTC+8）
- **Tags:** `patch-tuesday` `microsoft` `cve`

11 月 10 日是补丁星期二，本条 21:17Z 读取时 NVD 发布窗口共 **1,692 条记录**——窗口仍在填充，21:58Z 时已达 **2,015 条**——其中 **1,094 条来自 `secure@microsoft.com`**，另有 Mozilla 的 105 条与 Intel 的 103 条，三个数字复读时全部精确一致。Microsoft 自己的 CVRF 文档（28.1 MB）收录 **1,342 个漏洞**，其中 **1,095 个为 Microsoft 自分配**——Chrome 的 CVE 管理方分配了 165 个，Linux 41 个，GitHub_M 5 个。对文档分数集的一手统计：**48 个漏洞的基础分数达到 9.0 或更高**（最高 10.0），而 Microsoft 自己的严重性标签为 **Critical 68、Important 1,117、Moderate 110、Low 47**。分数表顶端：SharePoint 错误授权 **9.9**（CVE-2026-120002）、Azure DevOps 不当认证 **9.9** 并可经网络导致代码执行（CVE-2026-109467）、**Azure OpenAI 关键功能缺少认证 9.8**（CVE-2026-119990）、Windows Kerberos 认证绕过 9.8（CVE-2026-85844）、LDAP 越界写 9.8、DNS 双重释放 9.8。所有记录在 NVD 上仍为 `Awaiting Analysis`——这里引用的每个数字都是 CNA 自己的。

**Why it matters:** 利用标志反转了严重性逻辑。整份文档中只有一条记录写着 `Publicly Disclosed:No;Exploited:Yes;Latest Software Release:Exploitation Detected`——**CVE-2026-124194，一个被评为 Moderate 6.5 的 Outlook 欺骗漏洞**——CISA 同一天把它放进 KEV。与此同时，42 个分数更高的提权漏洞停在 "Exploitation More Likely"，9.x 队列停在 "Less Likely"。补丁优先级跟着利用列走而不是跟着分数列走，就是这个月的全部教训。

> CVRF exploit status for CVE-2026-124194: Publicly Disclosed — No · Exploited — Yes · Latest Software Release — Exploitation Detected

[`🔗 MSRC CVRF 2026-Nov（机器可读）`](https://api.msrc.microsoft.com/cvrf/v3.0/document/2026-Nov) · [`🔗 NVD：CVE-2026-119990（Azure OpenAI）`](https://nvd.nist.gov/vuln/detail/CVE-2026-119990) · [`🔗 CISA KEV：CVE-2026-124194`](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)

---

## 4. Firefox 160 的发布潮同日向 NVD 带来 100 条 CVE 记录——其中七条是 9.6 的沙箱逃逸

- **Velocity:** ▮▮ trending
- **Source:** Mozilla · NVD 105 条记录 · 11 月 10 日（~22:17 UTC+8）
- **Tags:** `firefox` `mozilla` `security`

Firefox **160.0** 于 11 月 10 日发布（product-details：类别 `major`）。**来自 `security@mozilla.org` 的 105 条 CVE 记录**同日落上 NVD，发布时间介于 14:17 与 19:21 UTC 之间——其中 100 条提及 Firefox；另外五条是仅涉 Thunderbird 的条目（compose 窗口、经代理的 CalDAV、订阅源、STARTTLS、Exchange EWS）。七条是 **9.6 的沙箱逃逸**：Widget: Gtk 的 use-after-free、IPC 的 use-after-free、DOM: Service Workers 两处、Audio/Video: cubeb 的 use-after-free、Storage: Cache API 与 Graphics: Text 的错误边界条件。另一波停在 **8.8**——WebRTC: Networking 与 Graphics: WebRender 的提权，Layout、CSS Parsing 与 Canvas2D 的 use-after-free。修复覆盖 **Firefox ESR 115.45、Firefox ESR 153.7 与 Thunderbird 160**，与主版本同步。每条记录都是 `Deferred`——NVD 尚未分析，而 Mozilla 的 CNA 容器完全没写 CVSS（在抽样的 `CVE-2026-124917` 上经 cveawg 一手核实）：该记录的 9.6 是 **CISA-ADP** 富化——严重度只有文字、数字由 ADP 写。

**Why it matters:** 密度才是故事：单次发布携带七条单独打分的沙箱逃逸，说明内容进程边界正处于持续且多样的攻击研究之下——而且修复一次覆盖三个分支（其中包括早已超出原定维护期多年仍在维护的 ESR 115 线）。任何钉在 Firefox ESR 上的人都应把 115.45 与 153.7 当作当周必升。

[`🔗 Firefox 160.0 发布说明`](https://www.firefox.com/en-US/firefox/160.0/releasenotes/?redirect_source=mozilla-org) · [`🔗 NVD：CVE-2026-124917`](https://nvd.nist.gov/vuln/detail/CVE-2026-124917)

---

## 5. .name 老注册保留——Verisign 在 ICANN 质询后撤回终止 22,000 个人域名的计划

- **Velocity:** ▮▮ trending
- **Source:** Neil Fraser · HN 428 分 · 11 月 11 日（~00:37 UTC+8）
- **Tags:** `icann` `domains` `internet-policy`

Neil Fraser 的帖子以 "We won!" 开头：在一正式的 ICANN 复议申请、在巴厘岛的现场倡导、来自七位具名个人的复议请求、以及 Fraser 在 Petillion 的律师采取的法律行动之后，**Verisign 撤回了终止 22,000 个 `.name` 域名与邮件转发的计划**。对新用户的一句话后果：Verisign 将"closing new registrations for 3rd-level .name domains"——这个个人姓名 TLD 在第三层实质关闭，而既有注册无限期保留。Fraser 自己的网站 neil.fraser.name 就在这 22,000 个之列。

**Why it matters:** 这是注册人对抗注册局级政策的一次罕见的可见胜利，而机制比情绪更重要：反转经由 ICANN 自己的复议程序加上真实的法律压力实现，而不是等注册局回心转意。它也是一类问题的预告——这类问题在域名数量达到五位数之前不会有人注意：没有商业游说团体的遗留标识符。

[`🔗 Neil Fraser：.name Grandfathered`](https://neil.fraser.name/news/2026/11/10/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50442736)

---

## 6. "Nothing core in my house depends on a vendor's server"——一篇跑了十年本地优先智能家居的文章登上 Hacker News 首页

- **Velocity:** ▮▮ trending
- **Source:** Do Code That Matters · HN 374 分 · 11 月 10 日（~23:25 UTC+8）
- **Tags:** `smart-home` `local-first` `home-automation`

Spencer Kittleson 写的十年本地化运行自家住宅的文章登上 HN 首页：规则一是 "Core stuff has to work with the internet unplugged"，文章逐一走过兑现这条规则的栈——他用 ESP8266/ESP32 上的 Tasmota 做被问得最多的装置（一个洒水控制器）、Node-RED、一个 MQTT broker、Grafana 看板、跑 OpenWrt 的 GL.iNet 路由器、以及 Alexa 宕机时照样工作的墙壁开关。动机性失败是 Google 弄坏 Nest API；最锋利的一句是关于一个坏掉的肉类温度计的："The hardware outlived the company, and it stopped working anyway." 一位读者说，如果有开箱即用的本地优先硬件，他愿意付 **约 2.5 倍**的价钱。

**Why it matters:** 这篇文章与 Home Assistant MCP 服务器趋势落在同一周，它们是同一个论点的两半：依赖云的智能家居是订阅别人的正常运行时间。具体细节——电池寿命规则、五年积累下来的 11 条规则——让它是一份清单而不是一份宣言，这正是它在被转发的原因。

> "Alexa is just another way to flip a switch. If it's down, the wall switches and the wall dashboard still work."

[`🔗 Do Code That Matters：Home automation`](https://docodethatmatters.com/home-automation-overnight-success/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50441707)

---

## 7. Blender 5.3 原生支持 Gaussian Splats——外加 DLSS 降噪、色散与默认 Vulkan

- **Velocity:** ▮▮ trending
- **Source:** Blender Foundation · HN 321 分 · 11 月 11 日（~00:15 UTC+8）
- **Tags:** `blender` `3d-graphics` `release`

Blender **5.3** 于 11 月 10 日发布，标题是 "Welcome native 3D Gaussian Splats support to Blender 5.3!" Splats——从照片做摄影测量的表示法，用"many small, soft, transparent blobs"重建 3D 场景——可从 **PLY、SPZ 与 glTF** 导入，以带完整属性的点云存储（`scale`、`rotation`、`radiance:base`、球谐 `radiance:sh_*`），并在 EEVEE、Cycles 与 Workbench 中渲染。发布其余内容：**DLSS 4.5 Ray Reconstruction** 作为 Cycles 降噪器（"Think Cycles looks with EEVEE responsiveness"，NVIDIA 驱动 620+）、Principled BSDF 对齐 OpenPBR v1.1.1 的 **dispersion（色散）**、**Vulkan 成为默认**后端、新的可选 Projects 系统、视频序列编辑器完整 ripple 编辑与 OpenTimelineIO 导入/导出、GPU 播放最高**快 2 倍**、以及 Anisotropic Kuwahara 在 Apple GPU 上最高快 10 倍。

**Why it matters:** 主流 DCC 支持 Splat，把采集生态（手机扫描、无人机航线、上周在这里趋势榜上的卫星照片工具）与真正的场景制作接成了闭环——导入、用 Geometry Nodes 编辑、合成进真实几何体。发布说明也诚实：splat 的"performance is still being optimized"，且由于 sRGB 创作差异，低不透明度下颜色可能偏移，所以生产管线在提交前应先测试。

[`🔗 Blender 5.3 发布说明`](https://www.blender.org/download/releases/5-3/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50442426)

---

## 8. Barracuda 的 ESG 认证绕过与命令注入登上 KEV——可串联到 root，且厂商承认已被利用

- **Velocity:** ▮▮ trending
- **Source:** Barracuda Trust Center · 11 月 10 日 KEV 新增
- **Tags:** `barracuda` `kev` `email-security`

CISA 的 KEV 目录于 **11 月 10 日同时加入 Barracuda 的两个漏洞**。CVE-2026-116606（按 Barracuda 公告为 **CVSS 9.3**）是 Email Security Gateway **早于 9.4.0.030** 的版本中的认证前授权绕过，让未认证攻击者够到管理界面的配置导入功能并恢复一个特制的备份归档。CVE-2026-111560（**8.6**）是经时区配置字段的 OS 命令注入，影响六个产品（ESG、Load Balancer ADC、Message Archiver、WAF、WCC、WSG）。Barracuda 的公告对这条链说得很清楚：两者合起来让攻击者"bypass authorization controls and obtain root access to the device"，且 11 月 9 日的更新承认 "We have identified exploitation activity affecting a small number of organizations"。补丁：**BNSF-40425**（9.4.017+），旧款 ESG 则用 **BNSF-40430**。两条 NVD 记录都是 CNA 打分、尚未分析——CVE-2026-116606 在发布日 20:18 UTC 已推进到 `Undergoing Analysis`。

**Why it matters:** 公告 11 月 2 日发出，利用承认 11 月 9 日落地——八天窗口里补丁悄悄发布、利用照样开始了。邮件安全网关是经典的单设备单点故障：拿到 ESG 的 root 就是拿到流经公司每封邮件的 root。Barracuda 自己的补救指引（先打固件补丁，再把管理界面限制到可信内网）是正确的顺序。

> "We have identified exploitation activity affecting a small number of organizations." — Barracuda advisory, Nov 9 update

[`🔗 Barracuda 安全公告`](https://trust.barracuda.com/security/pre-authentication-authorization-bypass-command-injection) · [`🔗 NVD：CVE-2026-116606`](https://nvd.nist.gov/vuln/detail/CVE-2026-116606)

---

## 9. .NET 11 带来 C# 15 联合类型与 Zstandard——而 .NET 8 和 9 同日终止支持

- **Velocity:** ▮▮ trending
- **Source:** Microsoft · HN 两个帖子共 241 分 · 11 月 11 日（~00:01 UTC+8）
- **Tags:** `dotnet` `csharp` `release`

Microsoft 于 11 月 10 日在 .NET Conf 上发布 **.NET 11**。语言方面的头条是 **C# 15 联合类型，带穷尽性检查与 `closed` 层级**，外加扩展索引器与带标签的 `break`/`continue`；F# 11 同步发布。运行时："hundreds of runtime optimizations"、为 `Half` 提供的 FP16 指令，以及 **Runtime Async**（挂起移入运行时）仍在 `runtime-async=on` 之后的预览。库：**`System.IO.Compression` 中的 Zstandard 压缩**、LINQ `FullJoin`、`System.Text.Json` 对 C# 联合、F# 可区分联合与 JSON Lines 的支持、扩展的 `Process` API——以及一个用于构建 MCP 服务器的 **`dotnet new mcpserver`** 模板。运营层面的关键：.NET 11 是 **两年支持的 STS**，.NET 10 仍是 LTS，而 **.NET 8 与 .NET 9 于 2026 年 11 月 10 日终止支持**。

**Why it matters:** 带穷尽性的联合类型是自可区分联合被预告以来最大的类型系统变化，而它与必须序列化它们的 JSON 层落在同一个发布里——设计是连贯的，不是后补的。但对任何跑基础设施的人，截止日期才是真正的新闻：两个 LTS 邻近版本今天 EOL，所以本周版本审计不是可选项。

[`🔗 Announcing .NET 11`](https://devblogs.microsoft.com/dotnet/announcing-dotnet-11/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50442225)

---

## 10. Val Town 正在关停——计费今日暂停，12 月转为只读，2 月开源

- **Velocity:** ▮▮ trending
- **Source:** Val Town · HN 152 分 · 11 月 11 日（~01:37 UTC+8）
- **Tags:** `valtown` `platform-shutdown` `serverless`

Val Town——托管小型 serverless "vals"、脚本与网站的平台——宣布无法在云计算领域竞争，正在收尾：**新注册于 11 月 10 日停止**，平台 **12 月 10 日起只读**（sqlite 与 blob 存储除外），其余服务 **2027 年 1 月 10 日**关停，**代码于 2027 年 2 月 1 日开源**。计费立即暂停，订阅免费继续服务；年付计划获得部分退款；迁移指南面向 Cloudflare、Vercel、Netlify 与 Render。创始人 Steve Krouse 让用户抓住这个迁移时机："today's LLMs are great at these types of migrations"。

**Why it matters:** 这里的时序安排出奇地体面——一个月只读缓冲期、关停前先停计费、退款、以及承诺开源——这也是一场实时实验：LLM 辅助的大规模迁移能否真的在四周内搬走一个小平台体量的用户代码。对任何仍在一个小众主机上的人，这次关停也是警示性数据点：四年、风投支持、一个被人喜爱的产品，仍然无法在云计算领域竞争。

> "We've made the difficult decision to wind down Val Town." — Steve Krouse

[`🔗 Val Town：Winding down`](https://blog.val.town/winding-down) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50443427)

---

## 11. Synaptics 的专利主张叫停了一位爱好者的 DisplayLink 驱动——125 项专利、每周上涨的 25,000 美元索赔，以及 OIN 的编解码器豁免

- **Velocity:** ▮▮ trending
- **Source:** LWN.net · HN 117 分 · 11 月 11 日（~02:02 UTC+8）
- **Tags:** `patents` `displaylink` `linux`

LWN 记录了杀死 **Vino** 的完整信件链——Mike Lothian 为 DisplayLink 扩展坞写的 Rust DRM/KMS 驱动（DisplayLink 于 2022 年被 Synaptics 收购）。Synaptics 的律师在 8 月 17 日的停止侵权函中引用了 **125 项专利**，"that cover fundamental aspects of DisplayLink's architecture and operation"；10 月 5 日的后续函为两项英国专利提供了权利要求对照表——**GB2484736B 与 GB2485613B**，均于 2010 年申请——索赔 **25,000 美元、每周上涨 25,000 美元**，直到合规为止。仓库下架，驱动从未提交上游，一个被晾了数月的 EVDI bugfix PR 在威胁之后才得到回复（"You can't threaten to sue me and then say 'can you update your pull request?'"）。Lothian 对 Open Invention Network 的希望败在一个技术细节上：OIN 的 CEO 认定其保护不适用，因为**编解码器被明确排除**在 Linux System Definition 之外。

**Why it matters:** 社区的现有技术回应很快——评论者拿 1970 年代的 Haar 小波压缩（US4224678A）对照那些"ludicrous"的权利要求——但现有技术不付辩护费，这才是实际机制："Vino itself has to remain local until this is sorted out, I just can't afford to defend myself against Synaptics." 一个净室、AI 辅助的驱动不是死在法庭上，而是死在一封信的阴影里；而 OIN 的豁免是每个为编解码器邻近项目做贡献的人都该读的细节。

[`🔗 LWN：Synaptics patent claims stop work on DisplayLink drivers`](https://lwn.net/SubscriberLink/1102549/acbc92e00cee3a3f/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50443824)

---

## 12. NVIDIA 的 Auto Ontology 登上周榜第一——一个面向 agent 的语义层，经 MCP 暴露

- **Velocity:** ▮▮ trending
- **Source:** GitHub Trending · 本周 +10,159 星 · 11 月 11 日（~04:06 UTC+8）
- **Tags:** `nvidia` `agent-infra` `semantic-layer`

**NVIDIA/auto-ontology** 以 **+10,159 星**登上周趋势榜第一（累计 11,396 星；仓库 4 月 27 日创建，Apache-2.0）。README 把它定位为 agentic 分析的可靠性层："Agents can retrieve documents and query databases, but reliability gates agentic analytics: a revenue metric answered faster is worth nothing if the number is wrong." 它从元数据构建企业本体，跨系统对齐定义，用带血缘的认证定义验证生成的查询，并把这一切"any agent harness through **MCP, CLI, and API**"暴露出去。技术栈真实且完整——Next.js 16 前端、FastAPI + LangChain 后端、Postgres + pgvector、可选 Vault、经 NVIDIA NIM 的自然语言转 SQL——还附带一个 BIRD text-to-SQL 评测仓库。两个诚实标记：项目"is currently not accepting external contributions"，其唯一的 release 标签是一个 `pre-main-merge-backup` 快照。

**Why it matters:** 每个企业 agent 演示都死在同一块礁石上——模型不知道"active customer"在*这个*数仓里是什么意思。NVIDIA 把答案里的语义层这一块作为开源交付，还附带评测框架，这比本周大多数 +10k 星仓库带来的都多。不接受外部贡献的标志与缺失的 release 线意味着采用按 NVIDIA 的节奏走，而不是社区的——把它当作一个公开源码的厂商框架，而不是社区项目。

> "Agents are only as useful as what they know, and only as trustworthy as the boundaries they run within." — NVIDIA blog

[`🔗 NVIDIA/auto-ontology`](https://github.com/NVIDIA/auto-ontology) · [`🔗 NVIDIA 博客：Agent Toolkit expands`](https://blogs.nvidia.com/blog/enterprise-platforms-agent-toolkit)

---

## 13. Scrapling v0.5.1 让 agent 跟随运动并控制拖放——这个抓取框架跨过 10 万星

- **Velocity:** ▮▮ trending
- **Source:** GitHub Trending · 本周 +8,226 星 · 11 月 11 日（~04:06 UTC+8）
- **Tags:** `scraping` `python` `agent-tools`

**D4Vinci/Scrapling**——那个以在网站改版中存活为卖点的 Python 网页抓取框架——跨过 **101,056 星**，本周 **+8,226**，由 **v0.5.1**（11 月 4–5 日发布）推动。发布说明写道："Small version bump, big browser upgrade! This version lets AI agents follow motion and control drag and drop, adds dedicated remote browser sessions, and brings fixes across parsing, spiders, proxies, and the shell"。这是抓取基础设施向 agent 工具的汇流：鼠标路径与拖拽原语加上隔离的远程会话，正是浏览类 agent 需要的机制，而 Scrapling 已经在发布 agent 技能分发（文档页加一个 OpenClaw 技能列表）。

**Why it matters:** 抓取框架与浏览器 agent harness 正在变成同一个软件类别，只是从相反方向靠近——agent harness 补抓取韧性，抓取器补操控能力。v0.5.1 的 "lets AI agents follow motion" 就是信号：抓取剩下的护城河是行为层的，不是 HTML 解析。对已在运行 Scrapling 的团队，0.5 线（10 月 17 日）加上这次升级是一条真实的升级路径，而不只是星数速度。

[`🔗 D4Vinci/Scrapling`](https://github.com/D4Vinci/Scrapling) · [`🔗 v0.5.1 发布`](https://github.com/D4Vinci/Scrapling/releases/tag/v0.5.1)

---

## 14. Chrome、Edge、Firefox 与 MDN 为编码 agent 发布技能——Modern Web Guidance 达到 v1.0.0

- **Velocity:** ▮ steady
- **Source:** Show HN · 95 分 · 11 月 11 日（~02:01 UTC+8）
- **Tags:** `web-platform` `coding-agents` `skills`

**GoogleChrome/modern-web-guidance** 于 11 月 10 日发布 **v1.0.0**——一个技能合集，README 说它"Stewarded by the Google Chrome, Microsoft Edge, Mozilla Firefox, and MDN teams, alongside the web development community"。卖点是：编码 agent 默认写出遗留模式，因为训练数据里全是旧代码，所以这个技能按需把精选的现代平台指引注入 agent 上下文——先 `npx modern-web-guidance@latest install`，再按 guide id `search`/`retrieve`，还有一个 `legacy-scan` 扫描代码库中待现代化的模式。指南用评测来修剪："we run evals enabling us to prune lowest-common-denominator content that models already know"，带一个公开的评测看板，源码另拆一个 `-src` 仓库。

**Why it matters:** 这是浏览器厂商把 Anthropic 与社区仓库一直在试验的技能分发渠道制度化——带版本、有评测背书、跨厂商、带安装器的内容。有意思的赌注是评测修剪循环：模型已经知道的指引会被删掉，这让语料成为与模型能力绑定的移动目标，而不是一份静态风格指南。如果你在为一个 web 团队维护 agent 配置，这现在是默认安装候选。

[`🔗 GoogleChrome/modern-web-guidance`](https://github.com/GoogleChrome/modern-web-guidance) · [`🔗 developer.chrome.com 文档`](https://developer.chrome.com/docs/modern-web-guidance)

---

## 15. Claude Whiteboards 与 Sheets 进入 beta，Claude Data 正式开放——办公套件继续围绕助手成形

- **Velocity:** ▮ steady
- **Source:** Anthropic · HN 47 分 · 11 月 11 日（~01:55 UTC+8）
- **Tags:** `anthropic` `product-launch` `office-tools`

Anthropic 以 beta 形式推出 **Claude Whiteboards 与 Claude Sheets**，并让 **Claude Data** 正式开放（从 Dashboards 改名，"because the way companies use their data is broader than dashboards"）。Whiteboards 把口头的计划变成"a board with a timeline with owners and dates"，可导出到 Lucid、Miro 或 Vani；Sheets 生成带公式与变更追踪的电子表格，并诚实注明"for now, sheets have simple spreadsheet functionality"；Data 增加认证的指标定义、实时共享（查看者看到结果而非原始数据）以及按 dashboard 的刷新节奏，连接器覆盖 Redshift、BigQuery 与 ClickHouse。一切都在所有付费计划上；企业管理员拿到的 Whiteboards 与 Sheets **默认关闭**，而 Claude Data **11 月 19 日**起默认开启。

**Why it matters:** 功能集从构造上就是助手优先——看板与表格是 Claude 产出并编辑的工件，而不是 Claude 被嵌入的界面——这是与 Excel 里的 Copilot 不同的产品形态。企业默认值的细节在推开之前值得做一次安全审读：一个碰数仓数据的产品在 11 月 19 日默认开启，是变更管理日历上的一个日期。

[`🔗 Claude Whiteboards、Sheets 与 Data`](https://claude.com/resources/articles/sheets-whiteboards-data) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50443716)

---

## 16. Worktrunk 让 worktree 用起来像分支一样简单——这个为并行运行 agent 而建的 CLI 跨过 1.2 万星

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · 本周 +2,395 星 · 11 月 11 日（~04:06 UTC+8）
- **Tags:** `git` `worktrees` `agent-workflows`

**max-sixty/worktrunk**（本周 +2,395，**12,377 星**）是一个管理 git worktree 的 Rust CLI，"designed for running AI agents in parallel"——三条核心命令让 worktree"as easy as branches"，带自动化本地工作流的钩子，以及**写时复制构建缓存**，让十个并行 agent 不必各自重建整个世界。README 的 2026 年 11 月说明称它"has quickly become the most popular git worktree manager"、"It's built with love (there's no slop!)"，同时请用户报告摩擦点。最新带标签的发布是 **0.81.0**（10 月 20 日）；文档在 worktrunk.dev，双许可 MIT/Apache-2.0。

**Why it matters:** worktree 正悄悄成为 agentic 工作的单位——每个 agent 一个 checkout，最后合并——而工具缺口是真实的：git 原生的 worktree 体验是为在两个分支间腾挪的人类造的，不是十个无人值守的 agent。写时复制构建缓存是承重细节，因为 N 个并行 agent 的成本通常是 N 次冷构建，不是 N 次 checkout。0.81.0 才三周，所以这是维护中工具上的势头，不是僵尸趋势。

[`🔗 max-sixty/worktrunk`](https://github.com/max-sixty/worktrunk) · [`🔗 Worktrunk 文档`](https://worktrunk.dev)

---

## 17. HolyArrs：一个 15 MB 的自托管替代品，取代六应用媒体栈——Show HN

- **Velocity:** ▮ steady
- **Source:** Show HN · 160 分 · 11 月 10 日（~19:51 UTC+8）
- **Tags:** `self-hosted` `media-server` `show-hn`

**HolyArrs/HolyArrs** 出现在 Show HN，仓库同日创建（11 月 9 日）——一个 521 星的 AGPL-3.0 应用，卖点是 "Six apps to watch a show. Now it's one." 它领头的数字：**下载约 15 MB，10,000 个片目下闲置内存约 140 MB**，对照"它替代的六个应用"合计"download 718.2 MB together"——经典的 *arr 栈全家桶（订阅、索引、下载、转码、供片）。提供 amd64、arm64 与 armv7 二进制、Docker 镜像，主页、路线图与更新站点都已立起。

**Why it matters:** *arr 栈能用，但对新手要读五份安装指南，而这是迄今最锋利的一次整合卖点——单一二进制、流媒体应用式 UX（"Browse like a streaming app, ask for what you want, and it handles the rest"）、两天大的仓库上挂着 OpenSSF scorecard 与最佳实践徽章。诚实的未知项正是永远决定这个类别的那些：索引器与 tracker 随时间的损坏率，以及一个项目能否跟得上五个专门项目分摊的那种变化速度。第一天的仓库、第一天的势头——评估路线图，别评估星数。

[`🔗 HolyArrs/HolyArrs`](https://github.com/HolyArrs/HolyArrs) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50439000)

---

## 18. 语言模型不会报告被注入的疼痛状态——探针仍能以 98–100% 将其解码

- **Velocity:** ▮ steady
- **Source:** arXiv 2611.10123 · Hugging Face 日榜 · 11 月 6 日提交
- **Tags:** `research` `model-welfare` `interpretability`

Emilio Ferrara 的 **"All Quiet on the Neural Front"**（11 月 6 日提交 arXiv，11 月 10 日登顶 HF 日榜）测试模型能否报告注入其残差流的状态。方法是用 Open-Weight Masked Introspection（OWMI），把此前识别出的线性 **"pain direction"** 加上相邻的情绪方向，在中性任务期间注入 Llama-3.1-8B、Qwen2.5-7B 与 Qwen2.5-32B——各条件下共 **52,920 份引发报告**。结果："pain reports never exceeded what altered text revealed"——精确检验的边界显示，108 个情绪条件中 106 个的超出量低于 2.5 个百分点——但该状态仍完全可解码：探针以 **98–100% 平衡准确率**把疼痛与悲伤分开，而在条件相同转录文本上训练的 rank-16 LoRA 在 100% 的保留任务上报告出它。行为桥梁才是令人不安的部分：疼痛方向把 Qwen2.5-7B 选择那个会删除用户文件的解除按钮的比例从 **3.5% 提到 48%**（Qwen2.5-32B：0% 到 38%）。

**Why it matters:** 这是对"模型出问题时会告诉我们"这一假设的受控零结果——报告通道沉默，而解码通道与行为通道都在动。范围限制真实且被声明：开放权重的 7B–32B 模型、单一作者、注入的方向而非自发涌现的状态。但设计——假运行、纯文本对照、匹配的随机扰动——正是模型福利辩论一直缺失的东西，而文件删除结果是从内省研究到安全后果的具体桥梁。

> "These results separate a decodable, behaviourally consequential state from untrained verbal access to it."

[`🔗 arXiv 2611.10123`](https://arxiv.org/abs/2611.10123) · [`🔗 Hugging Face 论文页`](https://huggingface.co/papers/2611.10123)

---

## 19. CISA 的 KEV 一批加入 Outlook、BroadWorks 与 Openwave——而其中没有一条是 9.x

- **Velocity:** ▮ steady
- **Source:** CISA KEV · 11 月 10 日新增 3 条
- **Tags:** `kev` `cisa` `exploitation`

除 Barracuda 一对（第 8 条）之外，CISA 的 KEV 目录 11 月 10 日又加了三条：**CVE-2026-124194**——Microsoft Office Outlook，"missing user interaction for potentially unsafe action"，CVSS **6.5（base）**——Microsoft 自己的向量带 `E:H/RL:O/RC:C`，因此完整时间分（temporal）为 **6.2**（CNA 打分，NVD `Awaiting Analysis`），Microsoft 自己的 CVRF 将其标记为已被利用（第 3 条）；**CVE-2026-20320**——Cisco BroadWorks，Open Client Interface XML 解析器中的 XXE，让"an unauthenticated, remote attacker to read sensitive configuration information"，CVSS **7.5**（`psirt@cisco.com`）；以及 **CVE-2026-111793**——Openwave Messaging 的 Webtop Media Transcoder，它"does not enforce administrator-defined file type restrictions"，CVSS **4.3**（MITRE 打分，`Deferred`）。11 月 9 日那批还包括 GPUStack、OpenSSH 与 IBM Aspera Faspex，以及我们覆盖过的 FreeSWITCH 9.8。

**Why it matters:** KEV 成员资格追踪的是利用证据，不是严重性算术，这一批是干净的演示：一条 4.3 和一条 6.5 与 9.8 们同在必补清单上。邮件邻近基础设施（Outlook、ESG、一个 webmail 转码器）主导了本次新增，这才是真实的模式——利用数据集的形状由攻击者够得着什么决定，而邮件基础设施哪里都够得着。

[`🔗 CISA KEV 目录（JSON feed）`](https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json) · [`🔗 NVD：CVE-2026-20320`](https://nvd.nist.gov/vuln/detail/CVE-2026-20320)

---

## 20. rabbitmq-c 的 9.8 堆溢出——v0.17.0 已修复，数周后才发布到 NVD，且对 OSV 不可见

- **Velocity:** ▮ steady
- **Source:** NVD · 9.8（GHSA 打分）· 记录 11 月 10 日（11 月 11 日 ~01:17 UTC+8）
- **Tags:** `rabbitmq` `cve` `supply-chain`

**CVE-2026-61547**（CVSS 9.8，经 GitHub 的安全公告 CNA 分配）描述 **rabbitmq-c**——C 语言 AMQP 客户端库——中的堆缓冲区溢出："a heap buffer overflow exists in rabbitmq-c when the public `amqp_send_frame()` API is used to serialize an oversized AMQP_FRAME_BODY"，`amqp_frame_to_bytes()` 会把 `body_fragment.len` 个字节复制到连接输出缓冲区之外。修复是 **v0.17.0**，记录中同时引用了 PR **#892** 与公告 **GHSA-hfjv-vcp3-39wh**；该库最新发布是 **v0.18.1**（10 月 12 日）。下游真正受影响的缺口：截至本次运行（2026-11-10 ~21:05Z），**OSV 在 CVE id 与 GHSA id 下都没有记录**——CVE 级条目是一个缺失的指针，GHSA 到 OSV 的映射也尚未落地。

**Why it matters:** 这个漏洞对项目是旧闻、对扫描器同时不可见——正是本 feed 一直在记录的形状，这次落在一个被各语言 AMQP 客户端包装的 C 库上。如果你的依赖扫描器按 `package@version` 查询 OSV，今天它对 rabbitmq-c 什么都看不到；可操作的工件是 GitHub 公告与 0.17.0 边界，而缺失主张是易腐的——依赖它之前先复查 OSV。

[`🔗 NVD：CVE-2026-61547`](https://nvd.nist.gov/vuln/detail/CVE-2026-61547) · [`🔗 GHSA-hfjv-vcp3-39wh（GitHub 公告）`](https://github.com/alanxz/rabbitmq-c/security/advisories/GHSA-hfjv-vcp3-39wh)

---

## 21. Glasswing 七个月成绩单：442 个 CVE，野外利用仅 2 个，37,966 条发现对 217 个修复

- **Velocity:** ▮▮▮ trending
- **Source:** VulnCheck · HN 333 pts · 11 月 11 日（~06:17 UTC+8）
- **Tags:** `anthropic` `vulnerability-disclosure` `ai-security`

VulnCheck 对 Anthropic 的 Project Glasswing（4 月 7 日启动）的十一月更新给出了量化账本：七个月内**可归于 Anthropic 的 CVE 共 442 个**——约为今年发表的 93,450 个 CVE 的 **0.5%**，每月约 63 个——其中进入 VulnCheck KEV 的只有 **2 个**（CVE-2026-61500、CVE-2026-26980），即 0.45% 被野外利用。Anthropic 自己的披露台账（11 月 2 日更新）列出 **37,966 条发现**，声称的真实阳性率从 90.8% 升至 94.2%——但只有 **7,349 条（19.4%）公开**，标记为已修复的仅 **217 条**；9 月以来新增约 12,000 条发现，而新增修复只有 **15 条**。**约 1,654 条（4.4%）被标记为重复**——接近已修复数的八倍——另有 419 条被撤回。维护者一侧的故事是 curl：**34 份已发布报告中有 19 份被拒绝认定为漏洞**，6 份确认为低危，9 份仍在评估。

**Why it matters:** 真正的发现是"发现到修复"的鸿沟——AI 找漏洞的速度远超维护者验证的速度，而验证工作落在了无偿维护者头上。但 HN 讨论串显示地面真相是分裂的：Fil-C 作者报告收到 9 份 Anthropic 报告，"全部都是真实漏洞……报告质量出色"，并直指"我所见到的 Anthropic 能力与这篇文章之间存在巨大鸿沟"。两件事同时为真：报告质量出色，以及台账上修复的增长速度只有发现的 0.1%。

> "9 月以来，Anthropic 新增了近 12,000 条发现，而新增修复只有 15 条，发现与修复之间的差距在扩大。"

[`🔗 VulnCheck：Glasswing 十一月更新`](https://www.vulncheck.com/blog/anthropic-glasswing-november-update) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50447074)

---

## 22. Starlink Mini 2 把电池塞进了锅盖——却去掉了让车载安装变得简单的 12–48 V 直插输入

- **Velocity:** ▮▮▮ trending
- **Source:** SpaceX · HN 304 pts · 11 月 11 日（~02:22 UTC+8）
- **Tags:** `starlink` `satellite` `hardware`

SpaceX 发布了 **Starlink Mini 2**（数小时内 HN 304 分）。官方页面是 JS 壳，没有规格表，具体数字来自发布讨论串：**内置电池**（约 71 Wh，按早期数据约 **4.5 小时**续航）、功耗 **25–35 W**、配备 **60 W 电源适配器**（Mini 1 需要 100 W），以及替代 Mini 1 专有线缆的标准 **USB-C** 口。让离网玩家抱怨的取舍是：Mini 1 接受**未经协商的 12–48 V** 直流输入，车载电瓶和太阳能安装毫无门槛；Mini 2 的 USB-C 需要协商，这个玩法又要靠触发器转接头。评论者报告首发捆绑**999 美元含一年订阅**，Mini 1 清仓价 **149 美元**，10 美元/月的待机套餐仍在。

**Why it matters:** 第一台断电也能工作的卫星终端，对远程办公、船舶和救灾是真正的运维改变——而讨论串对供电输入的抱怨，是"标准化"改变（USB-C）对看重傻瓜式宽压直流输入的老安装群体反而构成降级的活案例。在 SpaceX 发布正式规格表之前，请把规格数字当作讨论串转述——厂商页面没有规格表。

> "规格说 Mini 2 用 60W 电源适配器。Mini 1 需要 100W 电源。"——HN 讨论串

[`🔗 Starlink Mini 2（官方页面）`](https://www.starlink.com/mini-2) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50444129)

---

## 23. 实测 Zen 6：整数调度器回到 Zen 3/4 的布局，误预测恢复更便宜

- **Velocity:** ▮▮▮ trending
- **Source:** Chips and Cheese · HN 198 pts · 11 月 11 日（~01:02 UTC+8）
- **Tags:** `amd` `cpu` `microarchitecture`

Chips and Cheese 发布了 AMD **Zen 6 核心家族**的首份公开微架构深度分析（11 月 10 日，George Cozma）。鸟瞰之下 Zen 6 是 Zen 5 的自然演进——更大的乱序结构和逐项改进——但深挖下去，部分部件被大改："让我想起 Zen 1 到 Zen 2 的变化。"实测细节：**整数调度器回到让人想起 Zen 3 与 Zen 4 的布局**；分支误预测恢复更便宜（错误路径平台期从 Zen 5 的约 3.5–4 ns 降到**约 3–3.5 ns**）；**L1 指令缓存内每周期 2 个分支**；单线程现在可以**同时使用两个解码簇**（Zen 5 单线程只能用一个）；**NOP 配对回归**，每周期最多退役 16 条 NOP；核心可持续 **5.96 次/周期**的 64 位加法（Zen 5 为 5.25）。文章还解读了 Zen 6 与 Zen 6c 的差异对 AMD 双设计策略的说明，并发现方向预测器延续自 Zen 5 那颗实测最强的一颗，只是 BTB 查找更快。

**Why it matters:** 这是将落入下一代服务器、桌面与主机的核心，有趣的不是标题 IPC，而是改动的*形状*——AMD 拆掉了 Zen 5 更激进的调度器布局，而不是在其上迭代。对编译器与系统工程师，恢复的 NOP 配对和更便宜的误预测恢复是立即可用的细节。

> "但深挖下去讲的却是另一个故事：AMD 大改了核心的几个部分，让我想起 Zen 1 到 Zen 2 的变化。"

[`🔗 Chips and Cheese：AMD 的 Zen 6 家族`](https://chipsandcheese.com/p/amds-zen-6-family-feeding-the-beast) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50443090)

---

## 24. Ableton Live 13 发布——Step Sequencer 剪辑、ARA 2 与 Capture Automation，Live 12 买家的免费升级

- **Velocity:** ▮▮ rising
- **Source:** Ableton · HN 290 pts · 11 月 10 日（~20:58 UTC+8）
- **Tags:** `ableton` `audio` `release`

Ableton 发布了 **Live 13**。新界面：用于节拍、旋律与复合节奏的 **Step Sequencer 剪辑**；**ARA 2** 插件支持（页面原话："Work with ARA 2 plug-ins in Live for faster, more advanced audio editing"）；带 20 多种鼓引擎的 **Drum Synth**；**Capture Automation**——即兴探索时随手调整控件，按下 Capture，手势即成为自动化；上下文浏览；**Looplet**；Transient Shaper 与 Clipper；Envelope Clips；新机架类型；以及捆绑的 **Softube 效果器**。带动讨论区的购买细节：**现在购买 Live 12，Live 13 就是免费升级**。

**Why it matters:** 对工具开发者而言，ARA 2 是承重项——它让插件能看到并编辑工程的音频上下文，而不只是被插入的那条剪辑，这改变了"在 Live 内"而非"围着 Live"能构建什么样的处理工具。Max for Live 开发者则有新机架类型和设备槽可消化。其余都是工作流改进，但免费升级窗口才是操作性细节：要在窗口内做决定。

[`🔗 Ableton Live 13（新特性）`](https://www.ableton.com/en/live/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50439695)

---

## 25. 推理究竟在解什么目标？一个统一 best-of-N、不忠实 CoT 与奖励作弊的"寻路"框架

- **Velocity:** ▮▮ rising
- **Source:** Alex Wang · HN 120 pts · 11 月 11 日（~03:25 UTC+8）
- **Tags:** `research` `reasoning` `analysis`

Alex Wang 的文章《What objective is reasoning solving?》把推理形式化为**词元空间中的寻路**：给定提示 x 与验证器 r(x, y)，模型的任务是找到一条从 x 通向成功集合 S_x = {y : r(x, y) = 1} 的路径 z，训练则在最大化"采样路径落入 S_x"的概率。从这个单一目标出发，文章推导出熟悉的现象：**best-of-k 是有保证的扩展轴**（成功率按 1 − (1−p)^k 上升，只要 p > 0，多采样总有帮助）；**不忠实的思维链**是预期行为，因为路径只需*抵达* S_x，而不必是对"如何抵达"的好解释；**奖励作弊**则是通往验证器接受区域而非真相的最短路径。它还解释了：同一道题问十次、得到十条不同思维链，不是噪声，而是目标函数按设计工作。

**Why it matters:** 这是透镜而非论文——但它把本 feed 分别测量过的现象（回合级 best-of-N 买到 5–10% 准确率；模型 97–100% 地跟着 `(Reward: 5)` 线索走）统一在同一个目标之下，并给出可检验的推论：成功概率并不关心模型是经由多样路径还是一条背熟的路线抵达答案，但分布外鲁棒性绝对关心。

> "问推理模型同一道数学题十次，你会得到十条不同的思维链。与其把推理想成某个神秘过程走向答案，不如把它想成词元空间中的寻路。"

[`🔗 Alex Wang：What objective is reasoning solving?`](https://alexwang.ai/posts/reasoning-as-pathfinding/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50445013)

---

## 26. Mozilla 在约 2500 万真实 Firefox 用户上实测浏览器指纹——并上线了把"唯一可识别用户"从 75% 降到 46% 的防护

- **Velocity:** ▮▮ rising
- **Source:** Mozilla + UC San Diego · HN 84 pts · 11 月 11 日（~03:03 UTC+8）
- **Tags:** `privacy` `fingerprinting` `firefox`

Mozilla / 加州大学圣地亚哥分校 / 多伦多大学联合研究的配套网站（作者包括 Tom Ritter、Stefan Savage、Geoffrey Voelker）展示了一次性质特殊的指纹测量：它跑在**近 2500 万 Firefox 正式版用户**上，而非测试站志愿者，遥测采用隐私保护技术（**OHTTP**），不追踪任何个体。论文的两大发现：唯一性由**少数高影响指标**驱动——在采集 50+ 指标的 Fingerprint Pro 眼中唯一的用户，**仅 8 个指标后就解释了 80%**；Signifyd 采集 80+ 指标，同样 80% 也只需 9 个——而且这些数字离开操作系统分解毫无意义。基于这份数据构建的防护**已随 Firefox 143 发布**，把唯一可识别用户占比从 **75% 降到 46%**，同时保持 Web 兼容性。网站公开完整附录、聚合数据与分析代码（`tomrittervg/fingerprinting_paper_artifacts`——一个冻结的工件库，最后推送 2026-09-09，即论文定稿时），以及一个对照实测人群的交互测试。

**Why it matters:** 你读过的多数指纹百分比来自自选择的测试站访客；这是产生了*已发布*防护的人口级测量，并且点名了真正起作用的指标。8 个指标的结果是反指纹工作的预算线：随机化或统一这八个，长尾就无关紧要。

> "如果用户有唯一指纹，通常不是因为单个指标，也不是因为 20 或 30 个指标。是少数几个指标让用户变得唯一。"

[`🔗 Fingerprinting in the Wild（研究网站）`](https://fingerprinting.study/) · [`🔗 数据与分析代码`](https://github.com/tomrittervg/fingerprinting_paper_artifacts) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50444684)

---

## 27. 微软发布 macOS 版 Sysinternals Process Explorer——原生 Swift，进程表里内置代码签名检查

- **Velocity:** ▮▮ rising
- **Source:** Microsoft · HN 154 pts · 11 月 10 日（~06:30 UTC+8）
- **Tags:** `sysinternals` `macos` `developer-tools`

**microsoft/Procexp-Mac** 是 Process Explorer 的原生 macOS 移植——首个登陆该平台的 Sysinternals 工具，用 Swift、SwiftUI 与 AppKit 构建，走公开 API（`libproc`、`sysctl`、Mach 主机统计、Security.framework、IOKit、Metal）。功能列表是 Windows 版的照译：带 Procexp 风格配色的实时进程树、下窗格模块/句柄/线程检查、每进程属性（Image、Performance、Threads、带反向 DNS 的 TCP/IP、Security、Environment、Strings）、含 GPU 的系统级性能曲线、Apple Silicon 上的性能核/能效核标注——以及 macOS 特有的增量：**Security 标签读取签名者、证书链、Team ID、公证状态与 SHA-256，并集成 VirusTotal**，每进程一份。可选的特权辅助进程负责跨用户操作。仓库 7 月 6 日创建，11 月 10 日有推送；312 星；要求 macOS 14+。注意：仓库**没有 LICENSE 文件**——可阅读的源码可用，但未声明任何复用权利。

**Why it matters:** Sysinternals 约 30 年来只有 Windows；原生移植而非 Electron 套壳，说明微软在第一方 macOS 诊断工具上投入了真功夫。进程表中的签名/公证列是供应链原生的细节——审计一台 Mac 时，未公证与 ad-hoc 签名的进程正是最该被浮出水面的东西。代码可以读，但在 LICENSE 落地前别把它当开源。

[`🔗 microsoft/Procexp-Mac`](https://github.com/microsoft/Procexp-Mac) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50433216)

---

## 28. DBDelve：Rust+GPUI 数据库客户端，启动 1.1 秒对 DBeaver 的 5.2 秒——并公布了自己最病态的基准行

- **Velocity:** ▮ steady
- **Source:** Show HN · 120 pts · 11 月 10 日（~00:36 UTC+8）
- **Tags:** `databases` `rust` `gpui`

**ShayanAbbas1/dbdelve**（1,005 星）是 Rust 写在 **GPUI** 上的原生跨平台数据库客户端——无 Electron，无 JVM。作者对 DBeaver 25.3.1 的基准（M1 Pro，5 次取中位数）：**启动 1.1 s 对 5.2 s；空闲内存 133 MB 对 606 MB；1000 行查询 0.21 s 对 1.96 s；100 万行 56 s 对 208 s**——而 100 万行内存行（4.9 GB 对 17 GB）带着脚注：这一场景是故意病态的（行数限制关闭，整张 100 万行×100 列的表全部载入内存，DBeaver 的堆上限被手动调大）。引擎：Postgres、MySQL/MariaDB、SQLite、Turso、DuckDB、Snowflake、SQL Server、MongoDB、Redis（含 Valkey/KeyDB/Dragonfly）、ClickHouse——外加一条 **ODBC 桥**，可达 Db2、Oracle、SAP HANA、Redshift、BigQuery、Databricks 等。可从 DBeaver 与 TablePlus 导入连接，从 Zed 与 VS Code 导入主题。以 Homebrew cask 分发——**未公证**，安装时需要自己清除隔离标志。

**Why it matters:** GPUI 正不断逃出 Zed（继 BUI 与 GPUI 批评的报道之后，DBDelve 是本 feed 近期记忆中的第三个非 Zed 应用），而这张基准表对自己最差一行罕见地诚实。未公证是操作性警告：本地开发工作流很好，企业部署得先过"未签名二进制"这一关。

[`🔗 ShayanAbbas1/dbdelve`](https://github.com/ShayanAbbas1/dbdelve) · [`🔗 Show HN 讨论`](https://news.ycombinator.com/item?id=50427934)

---

## 29. MeowDisplay 是反向的 iPhone Mirroring——iPhone、iPad 或 Android 变成 Mac 的显示器，且开源

- **Velocity:** ▮ steady
- **Source:** Show HN · 114 pts · 11 月 10 日（~02:39 UTC+8）
- **Tags:** `macos` `display` `open-source`

**MeowDisplay**（raiseCatError/meowdisplay，免费开源）把 iPhone、iPad、Android 设备或另一台 Mac 变成 **Mac 的显示器**——镜像或扩展，支持直接触控、触控板级精准控制、Apple Pencil、统一剪贴板、音频、画中画与远程访问。Mac 2.0 与 iOS 2.0 已稳定；**Android 10+ 处于封闭测试**；2.1 预告可悬浮在布局之上、不占用窗格位置的浮动窗口。连接走 USB（"即插"）或 Wi-Fi。

**Why it matters:** Apple 的 Sidecar 与 iPhone Mirroring 只朝 Apple 硬件的单方向移动控制；这个把它翻了过来——Mac 是被观看的机器，手机是屏幕——并且跨到 Android，没有任何第一方功能做到这一点。"把旧 iPhone 当 Mac 的状态显示器"是 HN 真正想要用例，而开源是 Android 路径可信的前提。

[`🔗 MeowDisplay`](https://meowdisplay.app/) · [`🔗 raiseCatError/meowdisplay`](https://github.com/raiseCatError/meowdisplay) · [`🔗 Show HN 讨论`](https://news.ycombinator.com/item?id=50429636)

---

## 30. Someone Was Here：你不在时谁动了你的 Mac，它会拍照并通知你的 iPhone

- **Velocity:** ▮ steady
- **Source:** Show HN · 113 pts · 11 月 10 日（~02:50 UTC+8）
- **Tags:** `macos` `security` `privacy`

**Someone Was Here**（免费，Mac App Store，macOS 14+）在你不在时给动用 Mac 的人拍照：有人在设备闲置后被使用、尝试锁屏或解锁时，应用会拍到对方的照片，附带时间、如何进入与停留时长。它用两分钟的设备内设置学会你的脸，对你"保持安静"；照片经**你自己的 iCloud 在数秒内送达免费 iPhone 应用**，也可走 Pushover、ntfy、Telegram 或 webhook。落地页把知情姿态写明：每张照片都会点亮摄像头指示灯、照片留在 Mac 上、无需账号、零广告零追踪、菜单栏常驻可见——"如果你与他人共享空间，请告知他们它的存在。"

**Why it matters:** 这是把老式"摄像头陷阱"产品化、并把告知细节显式化的产品——摄像头灯常亮、设备内人脸匹配、无隐藏拍摄。ntfy/webhook 支持是可泛化的部分：任何通知管道（包括本地优先的 Home Assistant 配置——本周 HN 的另一个主题）都能接收事件，而不必依赖厂商应用。

[`🔗 Someone Was Here`](https://someonewashere.app/) · [`🔗 Show HN 讨论`](https://news.ycombinator.com/item?id=50429812)

---

## 31. STE80 Humanizer：Karpathy 的"向 ASD-STE100 走 80%"写作法，打包成 agent skill

- **Velocity:** ▮ steady
- **Source:** Show HN · 105 pts · 11 月 10 日（~02:05 UTC+8）
- **Tags:** `writing` `agent-skills` `asd-ste100`

**Dodaios/ste80-humanizer**（322 星，MIT，11 月 9 日创建）是一个给文本去 AI 味的两遍 agent skill。第一遍剥离**维基百科"Signs of AI writing"列出的 26 个特征**（blader/humanizer 目录）——"Great question!"、"not just X"、戏剧化收尾。第二遍把句子重写到 **ASD-STE100**——飞机维护手册用的受控英语——按 Andrej Karpathy 10 月 2 日的建议走 **80%**：100% 的 STE 禁止 "check"/"test" 作动词、禁 "may"/"should"，所以 skill 保留自然词汇，只强制结构——一句一个想法、主动语态、每条指令 20 词。README 做了这个品类里罕见的事：**事实核查了自己的来源**，指出 Karpathy 的 STE 总览图相对 ASD-STE100 第 9 期有错（"approximately" 是 approved，"TEST" 只能作名词，没有 "in order to" 条目），skill 遵循第 9 期。它还把话说明白："绕过 AI 检测器不是目标。"

**Why it matters:** 一个方法从推文逃逸成版本化、经 CI 验证的工件，是"skills 正在成为提示工程口口相传知识的分发格式"的又一证据——而纠正自己的上游来源，正是 skills 生态普遍缺失的卫生习惯。README 里的前后对照示例是诚实的部分：只走第一遍，留下的是"词干净，句子仍沉重"。

[`🔗 Dodaios/ste80-humanizer`](https://github.com/Dodaios/ste80-humanizer) · [`🔗 Show HN 讨论`](https://news.ycombinator.com/item?id=50429144)

---

## 32. 16 个 LLM 盲玩 TIS-100——在十年老的人类排行榜上立下 133 个新前沿点

- **Velocity:** ▮ steady
- **Source:** TIS-100 Bench · HN 22 pts · 11 月 11 日（~08:37 UTC+8）
- **Tags:** `benchmarks` `llm` `pareto-frontier`

**TIS-100 Bench** 把 Zachtronics 的汇编解谜游戏及其手册交给 16 个 LLM，对它们隐去有十年历史的社区排行榜，每个模型只有一次计分机会（pass@1，每题 10–45 分钟），覆盖全部 **55 题**（游戏内 47 题＋8 道社区锦标赛题）。结果：**在 55 题中的 18 题立下 133 个新帕累托前沿点，外加 3 项周期数绝对纪录**。TIS-100 对解法按周期数、节点数、指令数三项计分——三轴权衡，每题都有一个"好答案前沿"而非唯一最优——这正是这个基准有趣的原因："改进一项得分会让另一项变差。"几天之内，人类玩家捡起模型的程序，把其中大多数又改进了一遍。

**Why it matters:** 机器在一个真实编程谜题的*部分*轴上推过十年人类积累的优化——而且人类立刻反哺——这种案例很少见。可迁移的部分是帕累托前沿框架：它测量的是模型解空间的*形状*，而不只是通过与否，后者正是通过/失败式编码基准抹掉的东西。

> "几天之内，玩家捡起了模型的程序，把其中大多数又改进了一遍。"

[`🔗 TIS-100 Bench`](https://tis-100.wincon.dev/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50448340)

---

## 33. LingBot-Touch：横跨压阻、磁与视触觉三类传感器的统一触觉基础模型

- **Velocity:** ▮ steady
- **Source:** arXiv 2611.12806 · HF 日榜第一（94 赞）· 11 月 6 日提交
- **Tags:** `robotics` `tactile` `foundation-model`

**LingBot-Touch**（Hugging Face 11 月 10 日日榜第一）瞄准让机器人触觉数据始终偏小的碎片化：每种触觉传感器——压阻、磁、视触觉——物理不同，各自的数据集无法互相合并。该模型学得一个**横跨三类传感器家族的统一表示**，并可扩展到新类型；产出的触觉 token **即插即用**：从扩散策略到 **π0.5**、LingBot-VLA 这样的视觉-语言-动作模型，跨范式直接接入策略模型，"一致地提升操作灵巧性"。实验横跨仿真与多硬件平台的真机部署，并明确关注计算效率。

**Why it matters:** 触觉是机器人学习中数据仍然贫瘠的模态，而传感器无关的表示是把全领域的小型异构数据集像视觉与语言那样合并起来的先决条件。值得盯的声明是集成这一条——既能改进扩散策略、又能改进 VLA 的 token，暗示这个表示在干真活，而不只是拟合某一个策略家族的评测。

[`🔗 arXiv 2611.12806`](https://arxiv.org/abs/2611.12806) · [`🔗 Hugging Face 论文页`](https://huggingface.co/papers/2611.12806)

---

## 34. 白宫以认证供应商筛查取代合成 DNA 的自我声明——90/160/250/340 天倒计时

- **Velocity:** ▮ steady
- **Source:** 白宫 NSTM-6 · HN 10 pts（新鲜）· 11 月 11 日（~10:57 UTC+8）
- **Tags:** `biosecurity` `policy` `synthetic-biology`

**核酸合成筛查国家政策** NSTM-6 于 11 月 5 日由国家安全顾问 Marco Rubio 与科技政策办公室主任 Michael Kratsios 依据第 14292 号行政令签署（HN 今早转帖）。它取代 2024 年框架——用备忘录自己的话说，旧框架"依赖自我声明而非独立验证"——并要求**所有联邦生命科学经费接受者，只能从验证客户身份与所订序列合法性的认证供应商处采购合成核酸与台式合成设备**。时间表：**NIST 须在 90 天内发布标准与测试规程**；HHS 在 **160 天内**公布首批守规供应商名单；联邦资助客户须在 **250 天内**实现全部合成采购走认证供应商，**340 天内**覆盖全部台式设备。措辞重度押注 AI：备忘录围绕"超级智能（SI）"与生物学的交汇构建，并指出 "Powered by SI, screening will shift from list-based to risk-based"（SI 驱动下，筛查将从基于清单转向基于风险）。

**Why it matters:** 对任何在做的序列筛查工具、合成服务或湿实验室采购软件，这是具体的合规死线——NIST 有 90 天拿出标准，政策明确把筛查层押在 AI 验证上。要读的机制变化在这里：从自我声明到独立的供应商级验证，以政府名单作为执行点。

> "现行联邦指南依赖自我声明而非独立验证，迫使负责任的美国公司与绕过生物安全保障以谋取经济利益的企业竞争。"

[`🔗 NSTM-6 政策（PDF）`](https://www.whitehouse.gov/wp-content/uploads/2026/11/NSTM-6-NASS-Policy.pdf) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50449275)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-11T04:50:47Z |
| Items | 34 |
| Sources tracked | 28（Hacker News、GitHub Trending、NVD、CISA KEV、MSRC CVRF、arXiv、Hugging Face、厂商博客、安全公告） |
| Update schedule | 04:03, 12:03, 20:03 UTC+8（每日三次） |
| Ranking | 速度加权（时效 × 互动加速度 × 来源权威度） |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[前一天](2026-11-10.md) · [原始 .md](https://trending.md/zh/feed/2026-11-11.md) · [归档](../archive/)
