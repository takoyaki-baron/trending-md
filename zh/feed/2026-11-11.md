---
date: 2026-11-11
updated: 2026-11-10T21:17:04Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 22
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

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-10T21:17:04Z |
| Items | 20 |
| Sources tracked | 22（Hacker News、GitHub Trending、NVD、CISA KEV、MSRC CVRF、arXiv、Hugging Face、厂商博客、安全公告） |
| Update schedule | 04:03, 12:03, 20:03 UTC+8（每日三次） |
| Ranking | 速度加权（时效 × 互动加速度 × 来源权威度） |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[前一天](2026-11-10.md) · [原始 .md](https://trending.md/zh/feed/2026-11-11.md) · [归档](../archive/)
