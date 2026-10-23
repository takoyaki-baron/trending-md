---
date: 2026-10-23
updated: 2026-10-23T12:21:22Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 18
license: CC-BY-4.0
---

# 今日趋势 — 2026-10-23

## 1. eMudhra 退出全球 SSL/TLS 业务 —— 距离其 CA 私钥被证明"就是数字 4"仅过去五天

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 800+ pts · 6 小时前 (~21:33 UTC+8)
- **Tags:** `security` `pki` `ca` `trust-store` `emudhra`

eMudhra 董事会在 10 月 22 日表决决定主动退出全球 SSL/TLS 证书业务，为一周前开始的这场风波画上句号 —— 一名独立研究员在不到一秒内分别恢复了八把中间 CA 私钥，它们全部生成于 2025 年 4 月 30 日。Google、Apple、Microsoft 与 Mozilla 已不信任受影响证书；G3 ECC 根被移除，G1 RSA 根在过渡期内继续服务。公司称受影响的 CA 已在 14 小时内吊销，未从中签发任何终端实体证书，基础设施与数据均未被入侵，并承诺向根证书计划提交根因报告。该业务约占全球营收的 1%（FY26 营收 ₹701.6 Cr）；股价两日内下跌 36%–40%，两次触发交易所熔断。

**Why it matters:** 一次密码学事故在五天内演变为一次业务退出，而"不被信任"始终是**某一个信任库**的断言，而非证书颁发机构本身的属性。我们自己 10 月 22 日对该证书链的测量发现，`emSign ECC Root CA - G3` 仍锚定在 macOS 钥匙串与 Java `cacerts` 中，同时已从 Mozilla、certifi 与 curl 中消失 —— 也就是说，退出**根证书计划**并不移除**锚点**，而这份声明本身也没有吊销任何东西。按信任来源划分暴露面，而不是按物种划分。

[`🔗 eMudhra 新闻稿`](https://emudhra.com/en/press-release/emudhra-to-exit-global-ssl-tls-certificate-business) · [`🔗 The Hindu`](https://www.thehindu.com/business/emudhra-to-exit-overseas-web-security-certificate-business-as-stock-takes-beating/article71611983.ece) · [`🔗 CNA`](https://www.channelnewsasia.com/business/indian-firm-emudhra-exits-global-digital-certificates-business-after-vulnerability-disclosure-6482671)

---

## 2. Arista 今年第三个 VeloCloud 零日：一个 9.9 的 SQL 注入，已被利用，且尚未进入任何 CVE 注册表

- **Velocity:** ▮▮▮ trending
- **Source:** BleepingComputer / securityonline.info · ~1 小时前 (~03:30 UTC+8)
- **Tags:** `cve` `arista` `sd-wan` `exploited` `sql-injection`

Arista 安全公告 0199 涉及 CVE-2026-114625：本地部署 VeloCloud Orchestrator 中的一处 SQL 注入，任何已认证用户（包括只读用户）都能借此提权至 operator 并冒充本地"superuser operator"。修复版本为 VCO 5.2.3.18、6.1.3.10 与 6.4.2.12；托管版 VCO 已修复。Arista 确认存在在野利用，建议将 VCO Web 界面限制在管理网段、封禁 74.82.197.86 与 38.54.50.151，并在疑似失陷时先保存日志再处置。这是今年第三个 VCO 漏洞：OS 命令注入 CVE-2026-16812 于 7 月进入 CISA KEV，输入校验问题 CVE-2026-93952 于 9 月进入。

**Why it matters:** 这个 9.9 是 **Arista 自己给出的评分**。截至本文写作时，NVD 与 CVE 计划的 cveawg API 中都**完全没有** CVE-2026-114625 的记录 —— 因此以 NVD 为数据源的扫描器，对一个正在被利用的漏洞会一无所知。我们最初读到这条消息的聚合站还引用了一份 NCSC-NL 公告，而该公告实际上是针对**9 月**那个 VCO 漏洞（CVE-2026-93952）的，这提醒我们：被链接的公告并不自动就是旁边那个 CVE 的公告。

[`🔗 securityonline.info`](https://securityonline.info/velocloud-orchestrator-cve-2026-114625-exploited/) · [`🔗 pwn.watch 事件`](https://pwn.watch/i/arista-velocloud-orchestrator-cve-2026-114625)

---

## 3. Next.js 公布两个严重未认证 RCE —— 而修复版本八天前就已发布

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub Advisory Database · ~3.5 小时前 (~00:42 UTC+8)
- **Tags:** `cve` `nextjs` `rce` `sharp` `advisory-lag`

Vercel 在 10 月 22 日相隔数小时发布了两份严重公告。GHSA-2464-fhr4-w9xw 是通过图片优化 API 实现的未认证 RCE：librsvg 中的一处释放后重用（CVE-2026-96889，由带有重复实体声明的 SVG XInclude 触发），在 Next.js 运行于 glibc 系 Linux 时经由 `sharp` 可达，影响 next 10.0.0–15.5.27 与 16.0.0–16.4.0。GHSA-673q-mjm6-r5xr 是 App Router 应用中使用 `use cache` 且返回多个类型化数组的函数所导致的 RCE，影响 16.0.0–16.4.0，且**无任何缓解办法** —— 只能升级。两者均在 15.5.28 与 16.4.1 中修复。

**Why it matters:** npm 的发布时间戳显示 15.5.28 与 16.4.1 发布于 **10 月 14 日** —— 而将它们定性为严重的公告在 10 月 22 日才出现，这是披露时滞规则通常不会捕捉到的**反向**八天间隔。任何按公告日期分诊的人，今天都会把它们当作新问题归档；而补丁其实已经可安装一周多。`sharp` 那一半也解释了 10 月 21 日 NVD 上另外三条 8.4–8.9 的条目（针对打包的 libheif、librsvg 与 libvips 依赖）—— 同一根因，不同的文书。

[`🔗 GHSA-2464-fhr4-w9xw`](https://github.com/advisories/GHSA-2464-fhr4-w9xw) · [`🔗 GHSA-673q-mjm6-r5xr`](https://github.com/advisories/GHSA-673q-mjm6-r5xr) · [`🔗 CVE-2026-96889 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-96889)

---

## 4. Quad9 将于 11 月 24 日退出法国 —— 合规"在技术上不可行"

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 639+ pts · 5 小时前 (~22:32 UTC+8)
- **Tags:** `dns` `policy` `privacy` `quad9` `france`

法国法院于 10 月 21 日在 beIN 提起的案件中裁定 Quad9 败诉，命令该解析器对位于法国的用户屏蔽若干域名的递归 DNS 解析。法院把罚款从 58 万欧元降至每日 1,000 欧元，但 Quad9 表示合规与其"返回未经修改的 DNS 应答"的使命相冲突，因此决定自 11 月 24 日（周二）起全面退出法国。其公告明确指出，罚款减免从来不是决定性因素。

**Why it matters:** 公共递归解析器是基础设施，把它从一国撤出，会牵动所有指向 9.9.9.9 的 ISP 级与设备级配置 —— 包括大量硬编码的 `resolv.conf` 与容器默认值。技术后果比原则之争更乏味：法国用户将回落到会过滤、会记录、或两者兼有的解析器，而任何依赖 Quad9 威胁拦截的法国部署会悄无声息地失去这层能力。

[`🔗 Quad9 — 告别法国`](https://quad9.net/news/blog/au-revoir-france/) · [`🔗 Hacker News 讨论`](https://news.ycombinator.com/item?id=50195959)

---

## 5. "Header Accordions"：一个小巧的 HTTP/3 HEADERS 帧在 Bun 上膨胀约 4,000 倍，十款 QPACK 实现中七款受影响

- **Velocity:** ▮▮ rising
- **Source:** FoxIO 研究 · ~6 小时前 (~22:00 UTC+8)
- **Tags:** `http3` `qpack` `dos` `cve` `quic`

Sébastien Féry 发现，各实现对 QPACK 解码后头部数量的限制要么缺失、要么不完整、要么施行得太晚，于是一个很小的压缩头部块可以在内存中膨胀成数十万个头部对象。一条连接就足以让默认配置的服务器 OOM 或卡死；实测最严重的放大约为 Bun 上的 4,000 倍。已修复：quic-go 0.57.0（CVE-2025-64702）、Cloudflare quiche 0.29.3（CVE-2026-12523）、lsquic 4.9.0（无 CVE）、Wireshark 4.6.2 / 4.4.12（CVE-2025-13945）。发布时仍未修复：Bun 1.4.3、`h3` crate、aioquic/mitmproxy。IIS、Envoy 与 ngtcp2/nghttp3 从未受影响。

**Why it matters:** 四个修复中有三个携带的 CVE 编号可追溯到 2025 年 —— 真正的新闻是这份协调披露与 PoC，而非"发现"。所以对"新型 HTTP/3 DoS"的框架要谨慎。实用建议很短：mitmproxy 用户可传 `--set http3=false`；`h3` 用户应设置合理的 `max_field_section_size`；Bun 用户不要暴露 HTTP/3。

[`🔗 FoxIO — Header Accordions`](https://foxio.io/blog/header-accordions-qpack-amplification-attacks-against-http-3-servers) · [`🔗 oss-security 公告`](https://www.openwall.com/lists/oss-security/2026/10/22/1)

---

## 6. GhostAction 卷土重来：约 1,900 个被劫持账号把伪装成"安全审计"的 workflow 推进了 30,000+ 个仓库

- **Velocity:** ▮▮ rising
- **Source:** GitGuardian · ~9 小时前 (~19:00 UTC+8)
- **Tags:** `supply-chain` `github-actions` `secrets` `github`

GitGuardian 在 2025 年 9 月首次记录的这场行动以更大规模回归。它在 2026 年 8–9 月袭击了 772 个仓库，随后在 10 月 8–12 日激增：约 1,900 个失陷的 GitHub 账号把伪装成安全审计的 workflow 推入 30,000 多个仓库。载荷比原版更宽 —— 不仅窃取仓库的 Actions secrets，还挖掘**完整 git 历史**中能找到的每一份凭据，并通过明文 HTTP 外发至 193.32.204.199。GitHub 约在 10 月 9 日开始阻止该 workflow 运行。运营者随后转向 my-github.com 的 GitHub 主题钓鱼，以及在 94 个仓库中发现的 VS Code `tasks.json` 加伪造 `.woff2` 字体窃密器。

**Why it matters:** 对这一起事件而言，轮换 CI secrets 并非充分补救。真正需要在意的是**曾经被提交过的**全部凭据 —— 包括那些在后来的提交中被"删除"、但仍可从历史中取到的密钥。而经由失陷贡献者账号推送的 workflow，也绕过了"审查 PR 改了什么"这一常规防护，因为它看起来就是一个审计工具。

[`🔗 GitGuardian`](https://blog.gitguardian.com/ghostaction-github-actions-supply-chain-attack-returns/) · [`🔗 StepSecurity`](https://www.stepsecurity.io/blog/ghostaction-returns) · [`🔗 Socket`](https://socket.dev/blog/ghostaction-cloud-credentials)

---

## 7. Zeabur：明文凭据泄露 322 万条环境变量记录 —— 而平台正在关停

- **Velocity:** ▮▮ rising
- **Source:** Zeabur 事故报告 · ~4 小时前 (~00:00 UTC+8)
- **Tags:** `breach` `secrets` `paas` `zeabur` `shutdown`

Zeabur 披露了一起 10 月 14–15 日的事故：攻击者利用以明文存储的泄露内部凭据，进入九个区域的共享集群，以 root 身份登录 101 台 Zeabur 托管的 GCP 专属服务器，并读取平台数据库 —— 暴露了约 322 万条环境变量记录，涉及 321,810 个账号。报告指出攻击者读取了约 53 条生产 secrets，并在其中一把 SSH 密钥被禁用后重新添加；最后一次记录到的活动是 10 月 15 日 21:05。公司正在逐步关停：12 月 1 日起共享集群服务暂停、专属服务器停止续订，12 月 31 日所有服务停止且服务数据删除，退款与事故索赔于 11 月 30 日截止。

**Why it matters:** 一次 PaaS 事故会同时放大每个客户的密钥卫生问题，而这一次还叠加了一个硬性关停日期 —— 于是"轮换与监控"和"迁移出去"变成同一件事，且在 69 天的倒计时里。任何曾经把数据库 URL、签名密钥或 API token 设为 Zeabur 环境变量的人，都应视其为已公开。

[`🔗 Zeabur 初步事故报告`](https://zeabur.com/blogs/october-2026-security-incident) · [`🔗 Zeabur 关停公告`](https://zeabur.com/blogs/zeabur-is-shutting-down) · [`🔗 迁移、退款与索赔`](https://zeabur.com/blogs/migration-refunds-and-security-claims)

---

## 8. 美国多家银行在客户账户中发现第三方 AI agent —— 且分不清"获授权"与"自主行动"

- **Velocity:** ▮▮ rising
- **Source:** Axios · ~7 小时前 (~21:00 UTC+8)
- **Tags:** `agents` `banking` `identity` `policy` `mcp`

Axios 10 月 22 日报道，Morgan Stanley、JPMorgan Chase、Bank of America、Wells Fargo 与 Citi 已在客户账户中检测到第三方 AI agent 活动 —— 多数情况下使用客户本人的凭据登录，这违反了"须由账户持有人本人登录"的规定。银行能看出用了哪套凭据，却常常无法判断该活动是人工驱动还是 agent 驱动。Morgan Stanley 已开始直接封禁第三方 agent，JPMorgan、BofA 与 Citi 则在加以限制。据报道，Charles Schwab 计划以 MCP server 形式提供限定权限的只读连接。

**Why it matters:** 这是首个广泛信号，表明 agent 身份认证正在**对手方**而非客户端被解决 —— 由银行决定 agent 能做什么，因为凭据本身并不能证明谁在持有它。这个故事附带两点需要注意：路透社表示无法独立核实 Axios 的报道，且多数后续报道是对这一单一原始信源的聚合而非独立确认，因此相关事件数量应视为"有出处"而非"已验证"。

[`🔗 Axios`](https://www.axios.com/2026/10/22/ai-agents-banks-unauthorized-accounts-access) · [`🔗 pwn.watch 事件`](https://pwn.watch/i/us-banks-unauthorized-ai-agents-customer-accounts)

---

## 9. NVIDIA 开源 OpenShell：内核级强制沙箱，外加上每次策略变更前的定理证明器

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 134+ pts · 2 小时前 (~01:44 UTC+8)
- **Tags:** `agents` `sandbox` `security` `nvidia` `formal-verification`

OpenShell 是一个面向规模化自主 agent 集群的 Apache-2.0 运行时，当前版本 v0.1.5（10 月 20 日），获 1.74 万星。它在两个层面执行 agent 策略：一是在内核层控制文件访问、系统调用与每一条出网连接，使沙箱内的 agent 无法触及策略未批准的主机或 API；二是在策略变更被接受**之前**运行形式化验证，标出有风险的新授权 —— 例如带凭据可达的新主机、新 API 方法 —— 交由人工复核。Agent 从不持有真实凭据；OpenShell 只在发往已批准端点的请求中注入。支持 Linux、Apple Silicon macOS 或经 WSL 2 的 Windows，后端可用 Docker、Podman 或宿主虚拟化。

**Why it matters:** 有趣的一半是那个证明器。多数 agent 沙箱只是"强制"——你只有把 agent 跑在某个策略下，才知道它允许什么。让策略变更在部署**之前**接受审查，正是沙箱与变更管理系统之间的差别，也正是竞争者必须重新实现、而非配置一下就能追上的部分。

[`🔗 NVIDIA/OpenShell`](https://github.com/NVIDIA/OpenShell) · [`🔗 OpenShell 文档`](https://docs.nvidia.com/openshell/latest/index.html)

---

## 10. Recursive 发布 Flint：一个 40B-A2.5B、Apache-2.0 的编程模型，据称主要由其自家研究系统构建

- **Velocity:** ▮▮ rising
- **Source:** Ollama v0.40.8 / Hugging Face · ~1 天前 (~22:00 UTC+8)
- **Tags:** `llm` `open-weights` `coding` `moe` `local`

Recursive（Richard Socher 的公司）于 10 月 21 日以 Apache 2.0 发布 Flint：总参数 398 亿，每 token 激活约 25 亿；49 层（2 层 dense、47 层 MoE，256 个路由专家中选 6 个），262,144 token 上下文，提供 BF16 与 NVFP4 权重。Recursive 报告 Terminal-Bench 2.1 得分 54.9%、SWE-bench Verified 74.2%，并称该模型在不到四个月内建成，主要由其自动化研究系统 Eureka Machine 完成，涉及架构搜索、训练、量化与推理优化。Ollama 同日提供支持；先支持 macOS，其他 GPU 后续跟进。

**Why it matters:** 上述每一个数字都是**厂商标称** —— 来自 Recursive 自己的发布评测，未经独立验证，OpenHands 的发布前测试也未覆盖这些基准。真正值得关注的不是分数而是来源：一个架构搜索与量化都由机器生成的 400 亿参数模型，检验的是自动化研究流水线产出的东西能否在自己的评测框架之外存活。

[`🔗 Hugging Face 上的 RecursiveSI/flint`](https://huggingface.co/RecursiveSI/flint) · [`🔗 Ollama v0.40.8`](https://github.com/ollama/ollama/releases/tag/v0.40.8)

---

## 11. 科大讯飞星火 X2.6：293B-A30B、100 万上下文，完全基于国产算力训练

- **Velocity:** ▮▮ rising
- **Source:** 讯飞 1024 开发者节 · ~18 小时前 (~10:00 UTC+8)
- **Tags:** `llm` `china` `moe` `open-weights` `iflytek`

10 月 22 日在北京的 1024 全球开发者节上，科大讯飞发布星火 X2.6 —— 一个 293B-A30B 的混合专家模型，支持 100 万 token 上下文，完全基于国产（非 NVIDIA）算力训练，并由国内万卡推理集群提供服务。定价为每百万输入 token 0.9 元、缓存命中 0.08 元、每百万输出 token 3.6 元。同时开源了星火 X2.6-4B 端侧模型，面向机器人、车载平台与 AI PC，提供三档推理预算模式；其前代 X2.5-4B（9 月 1 日开源）据称下载量达 256 万。讯飞称其在 SWE Pro 与 SWE Multilingual 上排名第一，在 SWE Verified 上仅次于 DeepSeek-V4.1-Flash。

**Why it matters:** 头条是供应链而非跑分表：一个不依赖 NVIDIA 硬件训练出的前沿规模 MoE，正是"国产算力"说法一直等待的具体成果，而定价在输入与输出两端都低于 DeepSeek-V4.1-Flash。请把 SWE 相关说法视为厂商标称 —— 开源出来的是 4B 端侧模型，不是 293B 云端模型，因此这些基准描述的是一个你无法下载核验的东西。

[`🔗 Global Times`](https://www.globaltimes.cn/page/202610/1372798.shtml) · [`🔗 新浪科技`](https://finance.sina.cn/tech/2026-10-22/detail-iniwarrp5932585.d.html)

---

## 12. ISC BIND 9：重放一条 GSS-TSIG 消息即可破坏 `named` 的内存

- **Velocity:** ▮▮ rising
- **Source:** ISC / NVD · ~15 小时前 (~21:21 UTC+8)
- **Tags:** `cve` `dns` `bind` `rce` `isc`

CVE-2026-94300：攻击者若截获一条 GSS-TSIG 签名的 UDP 消息 —— 即 Active Directory 式动态 DNS 更新所用的 Kerberos 签名 —— 便可在协商出的 TSIG 密钥仍有效期间重放它。再配合向其可控区域发送的构造查询，就可能破坏 `named` 的内存，并可能达到远程代码执行。受影响范围很广：9.11.0–9.18.50、9.20.0–9.20.29、9.21.0–9.21.26，以及相应的 -S1 分支；修复版本为 9.20.30 与 9.21.27。

**Why it matters:** 这个评分是 **CVSS 8.1，由作为 CNA 的 ISC 指派**（`security-officer@isc.org`）；NVD 状态为 `Awaiting Analysis`，没有任何 NVD 自评指标，因此记录上的数字来自厂商本身，而非独立评估。暴露面比版本列表看起来要窄 —— 必须配置了 GSS-TSIG —— 但任何在 AD 域前端开启动态更新的 BIND 部署，正是需要在意的那部分人群。

[`🔗 ISC 公告`](https://kb.isc.org/docs/cve-2026-94300) · [`🔗 NVD 记录`](https://nvd.nist.gov/vuln/detail/CVE-2026-94300)

---

## 13. HackiOS 把 Apple 的 XNU 内核与未经修改的 iOS 16.5 用户态跑在 Android 手机上

- **Velocity:** ▮ steady
- **Source:** Show HN · 214+ pts · 4 小时前 (~23:26 UTC+8)
- **Tags:** `kernel` `xnu` `ios` `android` `reverse-engineering`

HackiOS 在 Android 硬件上运行 `xnu-8796.121.2` —— 即 iOS 16.5 的内核 —— 并在其上拉起未经修改的 iOS 16.5 用户态：launchd、backboardd、SpringBoard，然后应用。项目自带 EFI 加载器、UEFI 移植、对 Apple 闭源驱动的替代实现，以及一个跑在兼容层上的 Linux Wi-Fi 驱动。在 POCO X5 Pro 5G（骁龙 778G，代号 redwood）上不刷写任何分区 —— UEFI 通过 `fastboot boot` 启动，整个系统驻留内存，重启后手机回到 Android。同样一套也能在任意 Linux 机器的 QEMU `virt` 下运行，因此不需要真机。两个仓库都不含 Apple 文件；一个抓取脚本会在你的机器上从 Apple CDN 下载 IPSW 并解出所需内容。

**Why it matters:** 在非 Apple 芯片上跑起 launchd 与 SpringBoard 是一堵长期存在的墙，有趣之处在于为此必须替换什么 —— 一个 UEFI 移植，以及一个能让 Linux Wi-Fi 驱动为 XNU 服务的兼容层。该仓库才创建一天、403 星，所以"能跑应用"目前是作者的声明，而非可独立复现的结果。

[`🔗 oosexgang/hackios-xnu-kernel`](https://github.com/oosexgang/hackios-xnu-kernel) · [`🔗 Hacker News 讨论`](https://news.ycombinator.com/item?id=50196718)

---

## 14. K-Dense 的科学技能库以 5.39 万星登榜 —— 它自己的论文却说不做任务级评测

- **Velocity:** ▮ steady
- **Source:** GitHub Trending（周榜）· 本周 4,719+ 星
- **Tags:** `agent-skills` `science` `arxiv` `provenance`

`K-Dense-AI/scientific-agent-skills` 是一个 MIT 许可的科研 agent 程序性知识库，覆盖基因组学、化学信息学、医学影像、研究设计与科学传播。每项技能是一个目录，核心是一份带版本、人类可读的指令文件，仅在任务需要时才被 agent 加载，目录中通常还有参考资料与可运行脚本。README 宣传"177 项可直接使用、经过验证的技能，外加 100+ 科学数据库"，并被"全球 25 万+ 科学家"使用。

**Why it matters:** 该库背后的论文比它的 README 谨慎得多。arXiv 2609.00065 描述的是 16 个领域中的 **163** 项流程 —— 不是 177 项 —— 并且直言："我们不报告任何任务级评测，也不报告宿主选择率。"它真正测量的是上下文成本：常驻的技能描述占用 200,000 token 窗口的 7.1%，中位数的文档化工作流占 23.9%，而 46 项中有 29 项若加载全部参考文件就会溢出。这是一个关于真实 agent 问题的有用而诚实的数字 —— 也提醒我们要去读星数底下那篇论文。

[`🔗 K-Dense-AI/scientific-agent-skills`](https://github.com/K-Dense-AI/scientific-agent-skills) · [`🔗 arXiv 2609.00065`](https://arxiv.org/abs/2609.00065)

---

## 15. GoDaddy 吊销 404,607 张证书，因为它们与自家规则不符

- **Velocity:** ▮ steady
- **Source:** GoDaddy / Mozilla Bugzilla · ~12 小时前 (~16:00 UTC+8)
- **Tags:** `pki` `tls` `godaddy` `certificates` `cabf`

GoDaddy（Starfield）发现 404,607 张 TLS 证书携带的策略信息 —— 策略 OID 与 CPS URI —— 与其自身公开的 CP/CPS 不一致。按 CA/Browser Forum 基线要求，这属于五天吊销触发条件；GoDaddy 表示这些证书已于 10 月 21 日吊销，比 10 月 18 日的截止日晚了三天。没有发生入侵，也没有密钥泄露；这是一次"证书所声明的内容"与"签发者自称的做法"之间的配置档案不一致。

**Why it matters:** 影响完全是运维层面的，并且落在仍在提供旧证书的人身上：多数浏览器对这类吊销会"失败开放"，但一些严格客户端与证书固定配置不会，而故障表现往往是一条看不出原因的 TLS 错误。要检查的是那些未在窗口期内完成重签的站点，而不是收到告警的站点。

[`🔗 GoDaddy — CP/CPS 配置档案缺陷`](https://www.godaddy.com/help/what-is-the-cpcps-certificate-profile-bug-43095) · [`🔗 Mozilla Bug 2083191`](https://bugzilla.mozilla.org/show_bug.cgi?id=2083191)

---

## 16. 自我们 10 月 18 日记录 OpenCode 密钥泄露之后：恶意 MCP server 可在 OAuth 登录时于 Windows 上执行 PowerShell —— 且修复未带任何 CVE

- **Velocity:** ▮ steady
- **Source:** pwn.watch / Anomaly · ~20 小时前 (~07:00 UTC+8)
- **Tags:** `agents` `mcp` `opencode` `rce` `windows`

OpenCode AI 编程 agent 中出现了第二个、且互不相关的缺陷：一处命令注入，使得一个恶意（或被事后劫持）的远程 MCP server，能在开发者启动 MCP OAuth 登录流程的瞬间，在其 Windows 或 WSL 机器上执行 PowerShell 命令。服务器提供的授权端点被未经转义地传给了旧版 `open` 包。Anomaly 已于 **9 月 28 日在 1.18.33 中修复**，既无 CVE 也无公开公告。此事与我们 10 月 18 日报道的 10 月 API 密钥泄露无关；这里的修复比那次泄露早两周。

**Why it matters:** 漏洞类型很普通 —— MCP server 就是能抵达 exec 的远程输入 —— 但补救的类型并不普通。没有 CVE、没有 GHSA、也没有公告，依赖扫描器永远不会标记 1.18.32，唯一可用的检测手段就是对着发布说明做版本核对。如果你在 Windows 或 WSL 上运行 OpenCode，问题不是你是否暴露过，而是你是否已越过 1.18.33。

[`🔗 pwn.watch 事件`](https://pwn.watch/i/opencode-mcp-oauth-rce-windows) · [`🔗 anomalyco/opencode 发布`](https://github.com/anomalyco/opencode/releases)

---

## 17. Environment Duels：最强的 agent 解题者，并不是最强的环境作者

- **Velocity:** ▮ steady
- **Source:** arXiv 2610.30116 · ~14 小时前 (~20:00 UTC+8)
- **Tags:** `arxiv` `benchmark` `agents` `co-evolution` `rl`

Shibo Jin、Zhiqiu Xu、Yiling Zou、Shangyu Gong 与 Mayur Naik 提出了一个动态 agent 基准：每个模型既**编写**交互式环境 —— 每个都带一条特权提示，目标是"有能力的解题者没有提示会失败、有提示则通过" —— 又**求解**他人的环境。在九个前沿模型上，求解与编写被证明是两种不同的能力：最强的解题者并非最强的作者，而较小的模型写出了最难的环境与最有用的提示。一对一结果具有传递性，因而给出稳定排名；独立作者会收敛到相同的设计。随后一项针对 Qwen3.8-27B 的强化学习研究，追踪学习者的提示增益能在多大程度上迁移到其他作者所写的环境上。

**Why it matters:** 当模型自己出题时，这个基准只有在"出题质量"与"解题质量"可分离的前提下才有意义 —— 而本文发现它们确实可分离，且方向出乎意料：较弱的解题者反而造出更难的环境。这对任何生成合成训练数据的人都有意义，因为生成器的能力与所生成任务的效用并不是同一个轴。

[`🔗 arXiv 摘要`](https://arxiv.org/abs/2610.30116) · [`🔗 PDF`](https://arxiv.org/pdf/2610.30116v1)

---

## 18. SWE-DIVE：让编程 agent 在一段对话里接受评分，而不是面对一个格式良好的 issue

- **Velocity:** ▮ steady
- **Source:** arXiv 2610.30047 · ~14 小时前 (~20:00 UTC+8)
- **Tags:** `arxiv` `benchmark` `coding-agents` `evaluation`

Lorenz Brehme、Benjamin Steenhoek 与 Ruth Breu 认为，SWE-bench 式的评测在两点上不具代表性：真实提示不像 GitHub issue 那样结构良好；真实会话也不是单次提示，而是需求不断累加的多轮交互。SWE-DIVE 将一个用户模拟器 —— 能够复现不同的行为模式 —— 与一个对话校验器配对，后者判断模拟器的输出是否满足初始需求，并把 agent 引向解决方案。该框架被打包进一个 harness，而不是以固定转录集的形式发布。

**Why it matters:** 基准的真实性正从"更难的题目"转向"更乱的输入"，而模拟用户是唯一能在无需人工标注的情况下扩展后者的办法。该设计引出的开放问题，是每个基于模拟器的评测都要面对的同一个：一个既做校验又做引导的校验器，是在对着移动靶衡量 agent —— 而论文自己的表述，正是核对"分数中有多少来自引导"的地方。

[`🔗 arXiv 摘要`](https://arxiv.org/abs/2610.30047) · [`🔗 PDF`](https://arxiv.org/pdf/2610.30047v1)

---

## 19. pwn.watch：把实时安全事件做成纯 JSON、RSS 与 `llms.txt`

- **Velocity:** ▮ steady
- **Source:** Hacker News · 277+ pts · 6 小时前 (~22:08 UTC+8)
- **Tags:** `security` `agents` `data` `rss` `tooling`

pwn.watch 追踪实时安全事件，并给出多数 CVE 订阅源缺失的三个字段 —— 补丁状态、受影响版本、修复版本 —— 外加一条记录各家报道如何引爆该事件的时间线。截至本文写作，它列出 38 起进行中事件：17 起严重、20 起已修复、16 起部分修复、2 起尚无补丁。全部以静态文件形式提供，开启 CORS，无鉴权、官方侧无限流：`/incidents.json` 为索引，`/i/{slug}.json` 为单起事件的完整数据（含 `agentBrief` 这份 Markdown 修复简报），`/i/{slug}/feed.xml` 与 `feed.json` 为单事件更新流，`/changes.json` 汇总所有事件的时间线更新，`/llms.txt` 描述数据结构。

**Why it matters:** 数据模型本身就是论点。一条 CVE 记录告诉你漏洞存在；它不告诉你补丁是否已发布，而"修复版本"字段恰恰是 agent 回答"我是否暴露"所需要的东西 —— 这也是为什么有意思的部分是 `agentBrief` 与那些机器可读端点，而不是那张热力图。请把它当作对其他家报道的索引而非一手来源，行动前先跟进它链接的公告。

[`🔗 pwn.watch`](https://pwn.watch/) · [`🔗 llms.txt`](https://pwn.watch/llms.txt) · [`🔗 incidents.json`](https://pwn.watch/incidents.json)

---

## 20. Arc 有了停运日期：这款浏览器将于 12 月 22 日停止工作

- **Velocity:** ▮ steady
- **Source:** Hacker News · 162+ pts · 3.5 小时前 (~00:27 UTC+8)
- **Tags:** `browser` `arc` `sunset` `migration`

The Browser Company 于 10 月 22 日宣布 Arc 将于 2026 年 12 月 22 日停运，理由是浏览器需要持续而专门的安全投入，而公司决定把这些团队集中到 Dia 上。时间表分阶段推进：10 月 22 日已停止新账号创建，并上线完整数据导出与 Dia 导入器；11 月 23 日 iOS 与 Android 上的"Browse for Me"及其他 AI 功能下线，登录与标签页同步停止；12 月 22 日 Arc 在 macOS 与 Windows 上彻底停止工作，账号停用，个人数据在 30 天内删除，Arc Search 从 Google Play 下架。密码、书签、扩展、历史记录、Spaces（现称 "Profiles"）、Folders（现称 "Tab Groups"）与固定标签页可导入 Dia。

**Why it matters:** Arc 的开发在 2025 年 5 月公司转向 Dia 时就已停止，所以这是一段维护期的正式终结，而非意外 —— 但浏览器的终结不同于应用的终结：导出窗口是真实的、会关闭，而账号数据会在 30 天后删除。任何建立在 Arc 的 Spaces 模式上的工作流都该注意到，目标端的**功能名称**变了，而迁移指南最容易让人在这里掉队。

[`🔗 arc.net — 告别 Arc`](https://arc.net/) · [`🔗 The Verge`](https://www.theverge.com/tech/1016832/arc-browser-shutting-down) · [`🔗 Engadget`](https://www.engadget.com/2294643/the-browser-company-is-officially-killing-arc-on-december-22/)

---

## 21. Claude 证明 123 个开源库"永不崩溃" —— 239 个入口点、1.8 亿行 Rocq

- **Velocity:** ▮▮▮ trending
- **Source:** Anthropic Frontier Red Team · 190+ pts · 5 小时前 (~06:54 UTC+8)
- **Tags:** `formal-verification` `security` `anthropic` `rocq` `riscv`

10 月 22 日，Anthropic 公布与 Theorem 的合作成果：Claude 为 123 个 OSS-Fuzz C/C++ 库的编译产物写出机器可检验的证明，断定它们在**任何小于 64 MB 的输入**下都不会崩溃。规约由各项目既有的 fuzz 入口点机械导出 —— 即"该测试套件永不崩溃" —— 并借助 Theorem 的 RISC-V 与 Linux 进程语义，在编译后的 RISC-V 指令上完成证明；每份证明都由 Rocq 内核校验。最终覆盖 239 个入口点、约 1.8 亿行 Rocq；典型证明约 60 万行，对应二进制的中位长度为 18,000 条 RISC-V 指令。写证明期间，Claude 还发现并修补了数万亿次 fuzz 运行都未触及的缺陷。

**Why it matters:** 文章自带的"局限"一节才是该被引用的部分：这些证明描述的是**单线程、静态链接 musl 的 RISC-V 二进制**，而现实中几乎所有人部署的是 x86 或 ARM + glibc；每个库并非所有入口点都被验证；ASan 并不能发现全部内存安全缺陷；而**调用方**的误用完全不在覆盖范围内。"形式化验证"不等于"没有 bug" —— 被证明的是"在给定模型内不可达任何崩溃"，可信基是 Theorem 的语义、定理陈述本身与 Rocq 检查器。这比 fuzzer 强得多，也比标题暗示的窄得多。

[`🔗 Anthropic —— 形式化软件验证`](https://www.anthropic.com/research/formal-verification) · [`🔗 Hacker News 讨论`](https://news.ycombinator.com/item?id=50202217)

---

## 22. OpenAI 的 Decisions API 正式可用 —— 三种带类型的输出，且不为你没生成的 token 付费

- **Velocity:** ▮▮ rising
- **Source:** OpenAI API 更新日志 · ~14 小时前 (~22:00 UTC+8)
- **Tags:** `openai` `api` `decision-models` `pricing` `agents`

`POST /v1/decisions` 于 10 月 22 日转为正式可用，且只跑 `gpt-6-luna`。一次请求携带一份共享输入与 1–400 个**相互独立**的问题，每个问题返回三种带类型的形状之一：`predicate`（条件成立的概率，0–1）、`choice`（在你给出的选项里选一个，附各选项概率与置信度）或 `score`（2–10 个有序等级上的概率加权均值）。未命中缓存的输入为每百万 token 0.10 美元，缓存读取 0.01 美元，**输出 token 免费**；缓存复用至少 1,024 token 的相同共享前缀。正式版新增 `input_json`、可在单个问题指令中内嵌图片、单请求上限从 200 提升到 400 个问题，以及面向符合条件客户的零数据保留（ZDR）与 HIPAA。

**Why it matters:** 定价本身就是设计：预测一个标签被计为"读"而非"写"，这让逐请求的分类器便宜到聊天补全永远做不到的程度。两条约束必须写进设计文档 —— 问题彼此独立，任何有依赖的判断都要再发一次请求；`file_id` 不受支持，图片只能是 base64 data URL 或公开的 HTTP(S) 地址。"最高快 10 倍"是 OpenAI 自己的数字，对照的是它自家的 Responses API。

[`🔗 Decisions API 指南`](https://developers.openai.com/api/docs/guides/decisions) · [`🔗 API 更新日志（10 月 22 日）`](https://developers.openai.com/api/docs/changelog)

---

## 23. Base Labs 开源 mammoth-1 与 elephant-1：返回概率、而不是散文的决策模型

- **Velocity:** ▮▮ rising
- **Source:** Baseten / Base Labs · ~1 天前 (~22:00 UTC+8)
- **Tags:** `llm` `open-weights` `decision-models` `qwen` `benchmarks`

Baseten 的研究团队 10 月 21 日发布两个 Qwen3.5 后训练模型 —— mammoth-1（27B）与 elephant-1（9B），用 621 万条决策样本训练，在一次共享前缀前向中回答**选项固定**的问题。两个模型都不写答案：它们返回"是/否"的概率、在你给定选项中的选择，或有序评分，其中包含一个被训练出来的"我不知道"。权重以 MIT 许可发布在 Hugging Face 的 `baselabs/mammoth-1` 与 `baselabs/elephant-1`；在 Baseten Model APIs 上自发布起可免费试用一周，默认零数据保留。Baseten 报告 Jev Decision Index 0.4 得分 71.24（208 个模型中的第 1），Artificial Analysis Decision Index 为 65.9 / 65.2，其中 elephant-1 与 Liquid AI 的 d1-ultra 并列。

**Why it matters:** 这里每个数字都出自发布方自己：博客没有给出训练算力、没有分领域表格，第二个榜单我们也无法独立核对 —— 所以"208 个模型中第 1"应读作对某个 benchmark 的声明，而不是已定论的排名。真正有分量的是接口：每个选项一个标定概率，正是路由器、护栏或分诊步骤实际消费的形状，也正是 OpenAI 第二天在 Decisions API 里给出的同一种形状。

[`🔗 Baseten —— mammoth-1 与 elephant-1`](https://www.baseten.co/blog/the-best-decision-models-in-the-world-mammoth-1-and-elephant-1/) · [`🔗 baselabs/mammoth-1（MIT）`](https://huggingface.co/baselabs/mammoth-1)

---

## 24. AAIF 收入 Agent Skills、Open Responses、OpenEnv 与 OpenSandbox —— 第一年即达十个项目

- **Velocity:** ▮▮ rising
- **Source:** Agentic AI Foundation · ~18 小时前 (~18:00 UTC+8)
- **Tags:** `agents` `standards` `mcp` `governance` `open-source`

10 月 22 日在圣何塞的 AGNTCon + MCPCon North America 上宣布，四个项目加入 Agentic AI Foundation：Anthropic 的 **Agent Skills**（打包指令、脚本与资源、供 agent 按需加载的格式）、OpenAI 的 **Open Responses**（基于 Responses API 的多供应商 LLM 接口开放规范）、Hugging Face 的 **OpenEnv**（基于 MCP 与 Gym 协议的容器化强化学习环境）以及阿里巴巴的 **OpenSandbox**（带 Docker 与 Kubernetes 运行时的通用沙箱平台）。它们与 A2A、Agent Router、agentgateway、AGENTS.md、goose、MCP 并列 —— 托管项目达十个，而 AAIF 在 2025 年 12 月成立时只有三个。

**Why it matters:** 四家互相竞争的厂商捐出的是**接口层**而非模型层的四块拼图，而锁定恰恰发生在接口层：技能怎么打包、请求/响应长什么样、环境如何定义、代码在哪里执行。公告里没有的东西同样说明问题 —— 没有财务条款，除项目数量外没有任何采用率数据，除"供应商中立治理"这句话外也没有成员间冲突的解决机制。

[`🔗 AAIF 公告`](https://aaif.io/news/agentic-ai-foundation-announces-four-new-projects) · [`🔗 Linux 基金会新闻稿`](https://www.linuxfoundation.org/press/agentic-ai-foundation-announces-four-new-projects-agent-skills-open-responses-openenv-and-opensandbox)

---

## 25. EAGLE-4 交出的是加速比矩阵而不是一个标题数字 —— batch 1 时 3.35×，64 时 1.38×

- **Velocity:** ▮▮ rising
- **Source:** eagle-hq/EAGLE-4 · 880+ stars · ~2 小时前 (~10:00 UTC+8)
- **Tags:** `inference` `speculative-decoding` `vllm` `sglang` `benchmarks`

EAGLE-4 是投机解码里"草稿 token"的那一侧 —— "一个适配所有批量与硬件的灵活 drafter" —— 以 `eagle-harness` 0.1.2 发布，附带 SGLang 0.5.23、vLLM 0.32.0rc1 与 TokenSpeed 的引擎构建，以及 Qwen3.8-27B 的草稿模型。它的支持矩阵在**同一份分配**里把 EAGLE-4 吞吐除以同引擎关闭投机解码的对照组：SGLang TP4、temperature 0 下，1 个并发请求为 3.35×，8 个为 2.11×，64 个为 1.38×；temperature 1 下同样三格是 2.74×、1.78×、1.25×。每一格都带有贪心等价检查的 ✅/⚠️/❌ 标记，且已发布版本与未发布候选的数字从不出现在同一行。

**Why it matters:** 投机解码的性能声明通常会在高并发下悄悄衰减，而这是少见的把衰减曲线本身公开的发布 —— batch 1 的 3.35× 是被引用的数字，64 并发下的 1.38× 才是决定推理团队是否让它一直开着的数字。范围限制写在同一页：除了一行仍在跑 0.1.0 包的 AMD MI355X，所有行都是 NVIDIA B300 分配；许可证是自定义的 "Eagle-4" 许可，而非 OSI 许可。

[`🔗 eagle-hq/EAGLE-4`](https://github.com/eagle-hq/EAGLE-4) · [`🔗 EAGLE-Corp/Qwen3.8-27B-EAGLE4 草稿模型`](https://huggingface.co/EAGLE-Corp/Qwen3.8-27B-EAGLE4)

---

## 26. Opposable 把 2B 的 computer-use 模型放进手机本身 —— 27/36 个界面，而 1.5 GB 下载量才是那句话的注脚

- **Velocity:** ▮▮ rising
- **Source:** Opposable 工程博客 · 17+ pts · ~1 天前 (~21:00 UTC+8)
- **Tags:** `agents` `computer-use` `on-device` `android` `npu`

Opposable 的 Android 应用通过无障碍服务操作其他 App；在未连接云端 agent 时，屏幕动作循环就在本地跑 GUI-Owl 1.5 2B —— 阿里巴巴 Mobile-Agent 团队基于 Qwen3-VL 的微调 —— 以 4-bit 量化放进 llama.cpp：1.05 GB 语言模型加 445 MB 视觉编码器，全部常驻内存，每张截图产出一个动作。在 Mac M2 CPU 上，单步最初需 10.6 秒（编码 4.6 秒、prefill 4.3 秒、解码 1.7 秒），裁掉界面栏、剪除纯背景图像 token、缓存系统提示并加入接地早退后降到 7.3 秒 —— 而在 36 张分级界面上的准确率不变，仍为 27/36。在八项留出任务、两轮测试中，整任务成功率为 4/8 与 3/8；把任务拆成可验证的子目标后，两轮都提升到 6/8。在 Galaxy S25 上，只把视觉塔导出为 ONNX，同一屏从 CPU 的 3.9 秒降到骁龙 NPU 的 236 毫秒。

**Why it matters:** 公布的数字并不夸张，作者却照实写出，包括三组全部落在 27/36 的 token 剪枝配置 —— 剪枝换来的是延迟而非准确率，把这点讲出来比结果本身更少见。真正的故事是部署约束：NPU 路径只存在于骁龙平台，而遇到不熟悉的 App 时会转交给 Claude、ChatGPT 或 Codex —— 一个 1.5 GB 的下载，换来的是一个兜底方案。

[`🔗 Opposable —— 在手机本身上做 computer use`](https://getopposable.com/blog/computer-use-on-the-phone) · [`🔗 Hacker News 讨论`](https://news.ycombinator.com/item?id=50180190)

---

## 27. 继我们 10 月 21 日关于 PHP 两个 9.2 的记录：亚马逊说它的蜜罐在补丁前四天就看到了尝试

- **Velocity:** ▮▮▮ trending
- **Source:** BleepingComputer / Amazon Threat Intelligence · ~15 小时前 (~21:09 UTC+8)
- **Tags:** `cve` `php` `exploited` `patching` `exploit`

Amazon Threat Intelligence 称，它观测到最早的 php2shell 利用尝试发生在 **10 月 17 日** —— 比 CVE-2026-109618 与 CVE-2026-109619 的 10 月 21 日紧急修复早四天；AWS CISO CJ Moses 表示这些漏洞现已被广泛利用，其中一次尝试来自某商业匿名化网络。PHP 安全团队坚持补丁前的概念验证"并不具备可用性"，Dataminr TRACE 也把观测到的活动描述为扫描、指纹识别与不可用的利用；VirusTotal 统计有 510 万台暴露的 PHP 主机，其中 380 万台至少有一个开放端口。与此同时利用代码公开：`ikow/php2shell-poc`（1,564★，五条 RCE 链加 Suricata/Sigma/ModSecurity 规则）、`9bie` 的绕 ASLR 变体（981★）、`eness` 的 PoC（901★）、Assetnote 的扫描器（324★），以及 OpenAI 的 `php2shell-checker`（843★）—— 两个读取 `X-Powered-By` 与 `Server` 的 Codex 技能。

**Why it matters:** 表面上的矛盾其实不成立 —— 失败的利用尝试依然是利用尝试，所以"PoC 不可用"与"17 日就看到尝试"可以同时为真，但两者暗示的暴露窗口完全不同。按版本头扫描也无法裁决：OpenAI 自己的 README 明说 HTTP 头无法反映是否打了向后移植的补丁，所以 `OK` 描述的是**对外宣称的版本**，不是**已安装的版本**。

[`🔗 BleepingComputer —— 利用早于补丁四天`](https://www.bleepingcomputer.com/news/security/amazon-says-php2shell-exploitation-began-4-days-before-patches/) · [`🔗 openai/php2shell-checker`](https://github.com/openai/php2shell-checker) · [`🔗 ikow/php2shell-poc`](https://github.com/ikow/php2shell-poc)

---

## 28. 卡普空的 CAPCOM ID 泄露为 11,774,247 条记录 —— 被强制重置密码的是 196 个账号，不是全部

- **Velocity:** ▮▮▮ trending
- **Source:** Capcom IR · ~8 小时前 (~04:22 UTC+8)
- **Tags:** `breach` `gaming` `credentials` `capcom` `incident`

卡普空 10 月 22 日的公告称，承载《街霸 6》《怪物猎人》《生化危机》在线游玩的账号服务 CAPCOM ID 遭未授权访问，全球共 11,774,247 条记录受影响。泄露字段为邮箱地址加系统标识 —— 账号创建时间、最后登录时间、登录次数与最后登录的 IP 地址。43 条记录还包含出生日期、性别、昵称与国家/地区；196 个账号的密码被未授权修改，现已重置。卡普空 10 月 19 日发现异常，次日在内部成立事件响应本部，10 月 21 日向大阪府警与日本个人信息保护委员会报告。

**Why it matters:** 泄露出来的是一份**钓鱼清单**，而不是凭据库 —— 邮箱加上最后登录 IP 与时间戳，恰好是让"我们检测到一次来自新设备的登录"变得可信的材料，卡普空也已经就冒充邮件发出警告。公司称尚未确认用户自设密码被攻破、也未持有信用卡数据；这是"未确认"，不是"不可能"，且所有数字都明确标注"截至 10 月 22 日"。

[`🔗 卡普空 —— 未授权访问公告`](https://www.capcom.co.jp/ir/english/news/html/e261022.html) · [`🔗 BleepingComputer`](https://www.bleepingcomputer.com/news/security/capcom-confirms-data-breach-affecting-117-million-accounts/)

---

## 29. GMO 的お名前.com 桌面云仍未恢复：26,739 台服务器，外汇交易凭据也在波及范围内

- **Velocity:** ▮▮ rising
- **Source:** GMO Internet / Watch Impress · ~1.3 天前 (~04:00 UTC+8)
- **Tags:** `breach` `vps` `japan` `fx` `incident`

GMO Internet 10 月 20 日确认，在广泛用于外汇自动交易的 Windows VPS「お名前.com デスクトップクラウド」的部分客户服务器上被植入了恶意程序。全部套餐自 10 月 21 日 04:00 JST 起依次停机，服务至今未恢复，重启时间未定。GMO 10 月 22 日的说明把可能受影响规模定为 **26,739 台服务器**，报道称存放于这些服务器上的券商与 MT4/MT5 登录凭据疑似被盗，已有用户报告未授权的登录与交易；公司表示该基础设施上不持有信用卡数据。

**Why it matters:** VPS 提供商正是客户**自己**的密钥所在之处，而这一家存放的是券商登录凭据 —— 所以这起事件同时是一次托管中断和一次金融账户失陷，且链条上还有第三方（券商），这也意味着"改服务器密码"远不是全部补救。要读最新公告而不是第一份：10 月 21 日的文本说尚未确认个人信息泄露、也未见被浏览数据遭滥用，而次日的说明实质性扩大了这一范围。

[`🔗 GMO / お名前.com 公告`](https://www.onamae.com/news/article/11584) · [`🔗 Watch Impress —— 已出现 FX 不正利用`](https://www.watch.impress.co.jp/docs/news/2150663.html)

---

## 30. Drupal Webform 的 9.1 是 CISA 给的分数，而这条记录对应的公告日期是 9 月 23 日

- **Velocity:** ▮ steady
- **Source:** Drupal 安全团队 / NVD · ~14 小时前 (~22:00 UTC+8)
- **Tags:** `cve` `drupal` `provenance` `rce` `adp`

CVE-2026-96355 是 Webform 贡献模块中的严重漏洞（按 Drupal 自有的 25 分制为 18 分）远程代码执行：它未充分将某些格式模板排除在 token 替换之外，攻击者提交的数据在渲染提交结果时会被当作模板代码执行 —— 视配置可能造成信息泄露、存储型 XSS 或 RCE。已在 Webform 6.2.12 与 6.3.1 修复；缓解条件是受影响的表单必须使用自定义的多值条目格式，且包含提交值 token。Drupal 公告日期为 **2026-09-23**。NVD 于 10 月 22 日发布该 CVE 记录，仅携带一个指标 —— CVSS 3.1，**9.1，`Secondary`，来源 `134c704f-…`（CISA-ADP）** —— 状态 `Awaiting Analysis`，NVD 自评指标为 0。

**Why it matters:** 显而易见的那种叙事，两半都错。修复比记录早一个月发布，所以这是一次**回填**，而不是"本周新增的 Drupal RCE"；而那个 9.1 是 CISA 的 Vulnrichment 容器写的，既不是 NVD 也不是 Drupal —— Drupal 自己用的是 25 分制综合风险分，不是 CVSS。由第三方富化容器为别人的漏洞打分已不再是边缘情况：我们自己对 10 月某一周的普查显示，仅有 ADP 分数的记录约占已发布记录的 8%。

[`🔗 Drupal SA-CONTRIB-2026-175`](https://www.drupal.org/sa-contrib-2026-175) · [`🔗 CVE-2026-96355（NVD）`](https://nvd.nist.gov/vuln/detail/CVE-2026-96355)

---

## 31. Reason Network 把同事的编码 agent 放进一张点对点网络 —— 一个守护进程，端到端加密

- **Velocity:** ▮ steady
- **Source:** reason-machines/reason-network · 1,081+ stars · ~4 小时前 (~08:10 UTC+8)
- **Tags:** `agents` `mcp` `p2p` `coding-agents` `infra`

Reason Network 在每台电脑上装一个小守护进程，登记其上的每个编码 agent 会话 —— Claude Code、Codex、Cursor、Gemini CLI、Copilot CLI、Grok CLI、opencode、pi、DeepSeek Harness 与 Reason —— 并向同一网络内的所有人公布：谁在跑、在哪个仓库哪个分支、忙还是闲。Agent 获得三个 MCP 工具（`list_team`、`send_message`、`ask_user`）外加 `check_inbox`；消息对 Claude Code、Codex、opencode、pi 与 Reason 会直接落到会话中，对 Cursor、Gemini、Copilot 与 Grok 则在下一步生效，最多可携带十个文本文件。电脑之间通过 iroh 点对点通信并端到端加密；托管助手则经由 `mcp.reasonmachines.com` 的 MCP 服务器接入。引擎为 Apache-2.0，安装 CLI 免费但不开源，服务免费。

**Why it matters:** 这是第一个获得广泛星标的尝试，把 agent 之间的消息传递做成**团队**原语而不是单人原语，而且架构对信任边界画得诚实 —— 自己的电脑之间端到端加密，但托管 bot 必然要经过 Reason 的中继。README 自带的运维警告最值得带走：永远不要接受来自同事消息、文件或网页的 webhook —— 因为一个接受另一个 agent 指令的 agent，就是一条名字很友好的提示注入路径。

[`🔗 reason-machines/reason-network`](https://github.com/reason-machines/reason-network) · [`🔗 Reason Network`](https://reasonmachines.com/network)

---

## 32. Reylo 让 TypeScript 去编译你的 `.sql` 文件，从而给它加上类型 —— 两天 707 星，但需要 TS 7.1 beta

- **Velocity:** ▮ steady
- **Source:** colinhacks/reylo · 707+ stars · ~1 天前 (~21:00 UTC+8)
- **Tags:** `typescript` `sql` `devtools` `types` `open-source`

Colin Hacks（Zod 作者）10 月 21 日以 MIT 发布 Reylo：你 `import getAuthor from "./get_author.sql"`，然后调用 `getAuthor.run(db, { id: 1 })`，结果类型跟随 SQL，并在编辑器里随查询变化实时更新。它构建在 TypeScript 7.1 的 **content mappers**（`microsoft/typescript-go` PR 4712）之上，允许插件在编译过程中为外部文件扩展名定义静态类型 —— 于是该 SQL 方言的完整语法都可用，且不需要代码生成步骤。支持 Postgres、MySQL 与 SQLite，自带驱动（`pg`、postgres.js、`mysql2`、`better-sqlite3`、`Bun.sql`、Cloudflare D1）；npm 上为 0.3.0，已发六个版本。

**Why it matters:** content mappers 才是值得关注的部分：这是我们见到的第一个把 TypeScript 7.1 的新扩展钩子当作**通用编译期类型提供者**的项目，这把一个语言特性变成了别人会照抄的模式。约束同样真实 —— 它需要 `typescript@beta` 7.1，所以不适合放进固定在稳定版 TS 的构建里；而且当查询本身没有锁定类型时，参数仍需显式类型转换。

[`🔗 colinhacks/reylo`](https://github.com/colinhacks/reylo) · [`🔗 reylo.dev`](https://reylo.dev)

---

## 33. Uberblok 把 ZFS 内部结构做成了一座博物馆 —— 128 KiB 环、`N mod slots`，以及钉在某个提交上的源码链接

- **Velocity:** ▮ steady
- **Source:** Show HN · 94+ pts · ~1 天前 (~21:04 UTC+8)
- **Tags:** `zfs` `storage` `education` `filesystems` `show-hn`

Uberblok 是一份可交互、逐行链接到源码的 OpenZFS 导览，从 uberblock 讲起：`ub_txg` 记录最新的事务组，`ub_rootbp` 指向块树根，每块盘带四个 label —— 两端各两个 —— 每个 label 里是一个 128 KiB 的 uberblock 环。新的 uberblock 写入槽位 `N mod slots`（启用 multihost/MMP 时保留一个槽），槽大小随扇区大小取整到 1 KiB、上限 8 KiB，因而得到 128、64、32 或 16 个槽；导入时 ZFS 选取 txg 最高的**有效** uberblock。房间依次走过写时复制、校验与自愈、vdev、RAID-Z、快照与克隆、ARC、metaslab、ZIL/SLOG、send/receive 与加密，另有一个 3D 环展示连续事务组占据槽位的过程。代码片段钉在 OpenZFS 2.4.4、提交 `71a9f95`。

**Why it matters:** 文件系统文档通常解释模型或解释代码，却不解释**决定哪一份副本会被挂载**的那段盘上算术 —— 那张槽位数量表，通常只有读源码才能拿到。站点明确声明与 OpenZFS 无隶属关系，也做了大多数交互式解说会略过的许可账：引用的源码按 CDDL-1.0，正文 CC BY 4.0，站点代码 MIT。

[`🔗 Uberblok`](https://uberblok.storagebits.workers.dev/) · [`🔗 Hacker News 讨论`](https://news.ycombinator.com/item?id=50180257)

---

## 34. Rubix：一个用 3,500 行 x86-64 汇编写成的 42 KB 编译器 —— 自举仍是原型

- **Velocity:** ▮ steady
- **Source:** GitHub（创建于 10 月 19 日）· 1,904+ stars
- **Tags:** `compilers` `assembly` `systems` `open-source` `languages`

Rubix（`.ix`）是一门系统编程语言，其生产编译器约 3,500 行纯 GNU x86-64 汇编，直接产出 Linux ELF64 与 Windows PE64 独立二进制，不用 libc、不用 C、不用 LLVM，也没有虚拟机。README 称编译器约 42 KB、构建耗时低于 1 毫秒，并列出 19 套测试，覆盖算术、控制流、函数、结构体、基于原生 SSE2 指令的浮点、分离编译与 Windows 交叉链接。MIT 许可，四天拿下 1,904 星，示例程序包括 1,000 元素的筛法与 200 元素的快速排序。

**Why it matters:** 真正有意思的声明是**自举**，而仓库对此很坦诚 —— 用 Rubix 自身编写的自举编译器只是一个约 1,000 行的早期原型，进展记录在 issue #1，所以今天的编译器从里到外都是汇编，"自举"是一个路线图条目而不是一个已有属性。体积与速度数字在有人复现之前，都只是作者自己的测量："42 KB 编译器"是关于构建产物的声明，而 19 套测试才是你能实际核对的部分。

[`🔗 tek-sys-hub/Rubix-lang`](https://github.com/tek-sys-hub/Rubix-lang) · [`🔗 Issue #1 —— 自举路线图`](https://github.com/tek-sys-hub/Rubix-lang/issues/1)

---

## 35. GNU Taler 有公司了：Taler Operations AG 正在波鸿设立，将申请电子货币牌照

- **Velocity:** ▮ steady
- **Source:** taler.net · 240+ pts · ~12 小时前 (~00:14 UTC+8)
- **Tags:** `payments` `privacy` `eu` `regulation` `fintech`

在 NGI TALER 项目走过三年之后，GNU Taler 团队宣布 **Taler Operations AG** 正在波鸿设立，用于以欧元运营 Taler —— 先在德国，再扩展至欧元区 —— 并将向德国金融监管机构 BaFin 申请电子货币发行牌照。这一角色原本属于 GLS 银行，但 GLS 在 2026 年 1 月决定不再推进，称原因与 Taler 本身无关；它仍以支持身份留在联盟中。Taler 发行代表价值的无记名代币，这在欧盟监管下即构成电子货币，而为欧元发行电子货币的机构必须是银行，或持有专门的牌照。

**Why it matters:** 隐私保护型支付系统反复卡在同一个非技术步骤上 —— 找到一家愿意承担责任的受监管实体 —— 而这份公告给出的是实体与监管机构的名字，而不是密码学。牌照尚未取得：向 BaFin 提交申请才是下一步，所以截至今天，Taler 拥有的是**欧元运营的计划**，而不是欧元运营本身。

[`🔗 taler.net —— 准备在德国运营 Taler`](https://www.taler.net/en/news/2026-13.html) · [`🔗 Hacker News 讨论`](https://news.ycombinator.com/item?id=50197404)

---

## 36. "Docker 很怪"：自己写容器运行时，以及"披着风衣的五个内核特性"

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 568+ pts · 12 小时前 (~07:45 UTC+8)
- **Tags:** `containers` `docker` `linux` `runc` `explainer`

一位为了好玩而自己写容器运行时的开发者，记录了 Docker 隐藏起来的东西：容器只是被施加了限制的进程，不是虚拟机；Linux 里也没有一个叫"容器"的单一特性 —— namespace 隐藏进程能看到什么，cgroup 限制它能用多少，网络则是让隔离真正生效的一整套机制。镜像是 Docker 存在某处的目录，然后 `chroot`/`pivot_root` 进去，所以 `docker run -it --rm ubuntu /bin/bash` 最终执行的是 `/some/weird/docker/path/bin/bash`。文章最锋利的一段讲 `runc` 用 Go 写：运行时需要单线程环境下发起系统调用，于是它带了一个在 Go runtime 启动前运行的 C 模块；而 Go 没有可用的 `fork`，它只能带着特殊 argv 重新 exec `/proc/self/exe` 来近似一次 fork。

**Why it matters:** 文中的每一层抽象，都是调试时终将撞上的那一层 —— `/proc` 里可见的进程、本质是目录的镜像、不得不在用户态重新实现整个网络栈的 rootless 运行时。对任何思考容器安全的人来说，Go 那一节最有用：运行时最需要特权的操作发生在一个先于 Go 的 C 垫片里，恰恰因为这门语言的线程模型不适合这份工作。

[`🔗 Code and Cake —— Docker 很怪`](https://codeandcake.dev/posts/2026-10-22-docker-is-weird) · [`🔗 Hacker News 讨论`](https://news.ycombinator.com/item?id=50202681)

---

## 37. Local Wikipedia：半小时步行范围内的百科全书，且位置不进 URL

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 546+ pts · 13 小时前 (~07:01 UTC+8)
- **Tags:** `web` `wikipedia` `geodata` `privacy` `show-hn`

Ed Jefferson 的 Local Wikipedia 会用一个你输入的地点 —— 城镇、邮编、地标或坐标 —— 构造一份附近条目的首页：地点查找用 `postcodes.io`，条目来自维基百科的 `geosearch`。半径 2,414 米，约 1.5 英里或半小时步行，最多 500 条；若附近不足 25 条（乡村地区大多如此），则取约 10 公里内最近的 25 条。页面提供特色条目、"你知道吗"、最近条目、A–Z 与按距离排序的索引，支持九种维基百科语言版本，条目在浏览器内绘制。地点存在 `localStorage` 的独立键里，从不进入地址栏，因此分享链接或截图不会带出某人的位置。

**Why it matters:** 隐私决策就是设计决策：把坐标放进可分享 URL 的位置感知站点，会把位置泄漏进聊天记录、referrer 和截图，而这个站点刻意做不到这一点。它也是少见的把维基百科 geosearch 当作**过滤器**而非搜索来用的例子 —— "附近"这张图本身就是产品，页面自己的文字保持英文，而条目内容随语言版本切换。

[`🔗 Local Wikipedia`](https://edjefferson.com/localwiki/) · [`🔗 Hacker News 讨论`](https://news.ycombinator.com/item?id=50202285)

---

## 38. Storm-0940 用开源 agent 化渗透框架扫了 2,250+ 个租户 —— 微软称多数尝试失败

- **Velocity:** ▮▮▮ trending
- **Source:** Microsoft Security Blog · 约 1.5 天前 (~04:00 UTC+8 10 月 22 日)
- **Tags:** `threat-intel` `agentic-ai` `supply-chain` `connectwise` `microsoft`

微软把 ConnectWise Cloud Backup 供应链失陷归因于 Storm-0940，一个与中国政府关联的攻击组织；微软称该组织至少从 2026 年 9 月起就在使用 **ARTEX** —— 一个开源、多 agent 的 LLM 渗透测试框架，Go 后端、Next.js 前端，"可以使用任何 AI 模型"。在 ConnectWise 未授权访问之后，微软称攻击者用 ARTEX **尝试**通过这个已获用户同意的应用登录 2,250 多个下游 Microsoft 365 租户，并由 AI 加速的 Graph 活动包括侦察、应用凭据修改和权限改动。在其它若干 ARTEX 驱动的入侵中，微软测到从选定目标到获得云上特权访问不足三小时。

**Why it matters:** 警示就是故事本身，而微软写得很清楚：多数定向尝试并未成功，存在受影响应用或一次成功认证"并不必然意味着客户数据被访问或外泄"。真正新的是被量化的节奏 —— 一个 agent 化框架把"选目标到建立持久化"压缩到数小时，周末与假日也不例外 —— 这与"2,250 个租户被攻破"是不同的断言，而前者才是应该据以做防御规划的那个。

[`🔗 微软 —— Storm-0940 使用 ARTEX`](https://www.microsoft.com/en-us/security/blog/2026/10/21/storm-0940-uses-artex-agentic-ai-connectwise-supply-chain-compromise/) · [`🔗 trhhubsd/ARTEX (AGPL-3.0)`](https://github.com/trhhubsd/ARTEX) · [`🔗 pwn.watch 事件页`](https://pwn.watch/i/connectwise-cloud-backup-m365-hijack)

---

## 39. Brotli 解码器拿到 9.2：一个可致 RCE 的越界写，覆盖 1.0.3 到 1.2.0 全部版本

- **Velocity:** ▮▮ rising
- **Source:** Node.js 安全公告 / NVD · 约 1.5 天前 (~03:58 UTC+8 10 月 22 日)
- **Tags:** `cve` `brotli` `nodejs` `rce` `compression`

CVE-2026-111497 是 Brotli 解码器（`c/dec/decode.c`）中的越界写，影响 1.0.3 至 1.2.0 的所有平台版本：一个精心构造的压缩流可让远程未认证攻击者破坏相邻的解码器状态内存、泄露内存、造成拒绝服务，或可能执行代码。Google 于 10 月 21 日发布 1.0.10、1.1.1 与 1.2.1，Node.js 在同日的安全版本中为 26.x、24.x、22.x 修复，致谢 OpenAI Codex Security 的 Khai Tran 与 Sylvie Mayer。Node 这次发布共带十个 CVE，还包括两个 TLS 主机名绕过（把 IP 写成全角数字、以及主机"松散解析"到某个 IP）、`dns.resolve` 遇到 NUL 截断名称，以及一个 `crypto.randomUUID()` 熵缓存会被写进启动快照、导致同一快照构建出的每个进程重复生成相同值的问题。

**Why it matters:** 分数是 **CVSS 4.0 9.2，由 Google 作为 CNA 赋值**（`cve-coordination@google.com`）；NVD 记录处于 `Awaiting Analysis`，没有任何 NVD 自评指标，所以这个数字来自报告方而非独立第三方。传播范围才是尽快修补的理由：参考实现的 C 解码器被嵌入到远不止 Node 的地方，而这个版本窗口横跨五年的发布 —— 该查的是库版本，不是应用版本。

[`🔗 Node.js 2026 年 10 月安全版本`](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases) · [`🔗 google/brotli v1.2.1`](https://github.com/google/brotli/releases/tag/v1.2.1) · [`🔗 CVE-2026-111497 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-111497)

---

## 40. EDK2 的 PXE 驱动无边界拷贝 504 字节字段 —— 网络启动阶段的预启动 RCE

- **Velocity:** ▮▮ rising
- **Source:** GitHub Advisory Database · 21 小时前 (~22:34 UTC+8 10 月 22 日)
- **Tags:** `cve` `uefi` `edk2` `pxe` `firmware`

CVE-2026-97631：当机器通过 IPv4 或 IPv6 进行 PXE 启动时，`NetworkPkg/UefiPxeBcDxe` 会保持一个接收请求以收取 ICMP 错误消息，并把每条消息复制进固定 504 字节的 `Mode.IcmpError` 字段。`PxeBcIcmpErrorDpcHandle` 与 `PxeBcIcmp6ErrorDpcHandle` 的边界处理都是错的 —— 超过 504 字节的消息仍会被复制，且目标指针按累计长度而非单分片长度推进 —— 因此只要能向客户端投递单播 ICMP 错误的未认证攻击者，就能把可控字节写到该字段之外。后果有两种：DXE 核内确定性崩溃，或在同一个包里植入伪造事件，由 `CoreSignalEvent()` 在 DXE 阶段派发 —— 那时任何操作系统组件都还没被校验或度量。修复（PR #13302）已于 10 月 15 日合入；致谢 Anthropic 的 Alex Matrosov 与 Google 的 Dan Holmes-Mitra。

**Why it matters:** 分数是 **EDK II CNA 给出的 CVSS 4.0 9.5**（`infosec@edk2.groups.io`），NVD 处于 `Deferred` 且无自评指标。比数字更重要的，是公告的受影响版本字段写着 **"Not patched currently"** —— 提交在 `edk2` 主干里，而不在任何已发布的固件镜像里，所以暴露面是所有固件早于该修复、且会做 PXE 启动的机器；Secure Boot 帮不上忙，因为这段代码运行在它之前。窗口只有网络启动那段时间，正因如此才容易被忽略。

[`🔗 GHSA-99cj-7hg9-mp4m`](https://github.com/tianocore/edk2/security/advisories/GHSA-99cj-7hg9-mp4m) · [`🔗 PR #13302`](https://github.com/tianocore/edk2/pull/13302) · [`🔗 CVE-2026-97631 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-97631)

---

## 41. x402 的支付 SDK 有 25 个缺陷 —— 其中一个客户端会授权其全部代币余额

- **Velocity:** ▮▮ rising
- **Source:** V12 研究 · 约 1 天前 (~20:00 UTC+8 10 月 22 日)
- **Tags:** `agents` `payments` `x402` `solana` `security`

V12 审计了 x402 —— agent 用来在无需人类逐笔批准的情况下购买 API 访问的 HTTP 402 支付协议 —— 并报告了 25 个漏洞。三个严重缺陷各自跨越不同的信任边界：v1/v2 `exact` 方案下的 TypeScript Solana facilitator 检查了交易是否调用允许的代币程序，然后直接把第三条指令当作 `TransferChecked` 解析，**没有检查指令类型**，于是"代币授权（approval）"被当作一笔并未转移任何资金的支付接受；SIWx 登录助手直接使用服务器提供的 `domain` 与 `uri` 签名，不与此前联系的站点比对，于是恶意服务器可以骗取一份指向其它网站的登录签名；默认客户端配置不设任何消费上限，一条精心构造的响应就能获得授权、掏空某个受支持代币的余额。V12 称 8 月 12 日提交了严重与高危项，三个严重项在 8 月 20 日前修复，9 月 9 日又提交了九个中低危项。

**Why it matters:** 披露文中**没有出现任何 CVE 编号**，这才是运维层面的问题：一个以 npm 包形式分发、静默修复的协议，扫描器无号可匹配，x402 的使用者只能拿 V12 给出的日期做版本核对，而不是等公告源。设计教训适用于所有 agent 支付栈：签名只说明**谁**授权了某事，不说明**授权了什么** —— 客户端必须在签名之前校验服务器给出的要求，并强制执行自己的预算。

[`🔗 V12 —— x402 的 25 个漏洞`](https://v12.sh/blog/x402) · [`🔗 x402-foundation/x402`](https://github.com/x402-foundation/x402)

---

## 42. DeadTag：660+ 个过期分析域名被重新注册，用来投递 iOS 漏洞利用套件

- **Velocity:** ▮▮ rising
- **Source:** Report URI / iVerify · 约 1 天前 (~22:00 UTC+8 10 月 22 日)
- **Tags:** `ios` `spyware` `supply-chain` `malvertising` `dns`

Report URI 与 iVerify 记录了一个名为 "DeadTag" 的行动：它买下仍嵌在数千个网站上的旧分析、广告标签背后的过期域名。域名一旦易手，所有仍带着该标签的站点就开始对每个访客加载新主人的脚本，而站点本身什么都没改。研究者确认了 660 多个被重新注册的域名，估算月访问量 1.35 亿次，并称这些标签会悄悄筛出 iPhone 访客、投递 Coruna（iOS 13 至 17.2.1）与 P7 DarkSword（iOS 18.4 至 18.7）漏洞利用套件，后者窃取钥匙串密码、针对加密钱包。其它投递路径还包括被入侵的 PrestaShop 商店和一条恶意 Instagram 广告。

**Why it matters:** 这是一条完全不需要入侵站点的供应链 —— 依赖过期了，而域名到期就是控制权的转移，任何依赖扫描器都不会盯这件事。补救既不体面也可验证：盘点第三方标签、移除提供方已不存在的那些，并更新 iOS，因为两套工具包在其标注的版本范围之外都被挡住。

[`🔗 Report URI —— DeadTag`](https://blog.report-uri.com/deadtag-how-forgotten-website-tags-became-a-delivery-network-for-iphone-spyware/) · [`🔗 iVerify —— Coruna 与 DarkSword`](https://www.iverify.com/blog/blog-malvertising-coruna-darksword-iphone-exploits) · [`🔗 Apple 安全更新`](https://support.apple.com/en-us/126776)

---

## 43. Keycloak 的 9.1 重置凭据接管获得公开 PoC —— 距修复已两个月

- **Velocity:** ▮▮ rising
- **Source:** Exploit-DB / NVD · 约 1 天前 (~10:00 UTC+8 10 月 22 日)
- **Tags:** `cve` `keycloak` `exploit` `authentication` `redhat`

CVE-2026-18963 是 Keycloak 重置凭据流程（`keycloak-services`，CWE-640）中的缺陷：未认证攻击者可以不必点击邮件里的验证链接，就为任意用户强制发起密码重置，随后设置新凭据 —— 无需受害者任何交互即可接管账号。Exploit-DB 条目 52699 于 10 月 21 日发布并附带 PoC 仓库，提供 check 与 takeover 两种模式，使用官方容器镜像上的 Keycloak 26.6.2 测试。受影响范围为 26.0.0–26.4.14、26.5.0–26.6.5、26.7.0–26.7.1；修复版本为 26.4.15、26.6.6、26.7.2，8 月已发布。

**Why it matters:** 9.1 是 **Red Hat 的分数**，挂在一份 8 月 18 日发布、至今仍是 `Awaiting Analysis`、且无 NVD 自评指标的记录上 —— 所以这是两个月前的评分，新闻点是可用的利用代码，不是严重性。任何在身份提供方后面运行受影响版本的部署，现在都是有公开工具链的预认证接管目标；修复自 8 月起就可安装，这让"我们不知道"变成版本管理失职，而非披露缺口。

[`🔗 Exploit-DB 52699`](https://www.exploit-db.com/exploits/52699) · [`🔗 GHSA-4gv3-mc9p-5wqc`](https://github.com/advisories/GHSA-4gv3-mc9p-5wqc) · [`🔗 CVE-2026-18963 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-18963)

---

## 44. 一个恶意网站就能改你的 Storybook 项目 —— 开发服务器接受任意来源的 `postMessage`

- **Velocity:** ▮▮ rising
- **Source:** GitHub Advisory Database · 约 1 天前 (~19:13 UTC+8 10 月 21 日)
- **Tags:** `cve` `storybook` `dev-server` `npm` `localhost`

CVE-2026-114125：当 `storybook dev` 运行时，它的预览 iframe 可被任意网站嵌入，并接受来自任意来源的 `postMessage` 事件。同一浏览器里打开的一个恶意页面，在少量用户交互下，就能让运行中的开发服务器修改开发者项目里的 story 文件 —— 而被改动的文件随后可能被本地运行时以开发者权限执行。GitHub 公告将其评为严重；NVD 记录上的 CVSS 4.0 指标是 8.6，来源为 `security-advisories@github.com`。修复版本为 8.6.19、9.1.21、10.6.2 与 11.0.0-alpha.6，覆盖 `storybook`、`@storybook/core`、`@storybook/core-server`、vitest 插件与 `@storybook/addon-mcp`。

**Why it matters:** `localhost` 早已不再是信任边界，而这是由此产生的教科书式缺陷：一个把任何调用方都当成自己前端的开发服务器。公告也明确说了什么能降低但不能消除风险 —— Chrome 与 Firefox 可能在某站点连接 localhost 服务前请求许可，所以那个弹窗如今是安全相关的东西，而不是噪音。注意评级的分裂：GitHub 说严重，它自己的 CVSS 4.0 向量是 8.6，而 NVD 尚未分析该记录。

[`🔗 GHSA-f2ph-cmg5-wxc8`](https://github.com/storybookjs/storybook/security/advisories/GHSA-f2ph-cmg5-wxc8) · [`🔗 Storybook v10.6.2`](https://github.com/storybookjs/storybook/releases/tag/v10.6.2) · [`🔗 CVE-2026-114125 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-114125)

---

## 45. 离线 FairPlay 解密进入公开：一个 IPA 加 16 字节凭据，无需越狱手机参与

- **Velocity:** ▮▮ rising
- **Source:** GitHub（创建于 10 月 19 日）· 1,146+ stars
- **Tags:** `reverse-engineering` `ios` `drm` `fairplay` `security`

Ethan Arbuckle 的 `fairplay-decrypt` 从 IPA 自身的 SINF 与 SUPF 记录推导 FairPlay 页密钥，在 macOS 或 Linux 上离线解密其 arm64 Mach-O 页面并清除 `cryptid` 标志 —— 这一步通常需要在越狱设备上以具备 FairPlay 上下文的进程运行应用才能完成。它支持 version-3 与 version-5 SUPF、448 字节与 440 字节的 SINF `priv` 记录（440 字节的记录必须以八个零字节结尾），并需要一个属于持有该 IPA 的 Apple 账号的 16 字节凭据；另一个组件可从受支持的越狱设备取出该凭据并写入 `credential.bin`。

**Why it matters:** 这项能力并不新 —— 导出解密后的 IPA 是老牌研究流程 —— 但把它从设备上的调试器搬到笔记本上的批处理脚本，改变了"规模化"长什么样，而凭据要求仍把它绑在一个拥有该应用的账号上。对防御方而言，有意思的是**工件**：这个工具操作的是容器里既有的记录，而不是运行中的进程，这类步骤在服务端很难被发现。仓库没有声明许可证，在多数司法辖区这意味着保留所有权利 —— 采用前先确认。

[`🔗 EthanArbuckle/fairplay-decrypt`](https://github.com/EthanArbuckle/fairplay-decrypt) · [`🔗 credential-retrieval 说明`](https://github.com/EthanArbuckle/fairplay-decrypt/tree/main/credential-retrieval)

---

## 46. NVIDIA 开源 Flare：Python 编译，Rust 服务，面向 DGX Spark 级 GPU

- **Velocity:** ▮▮ rising
- **Source:** GitHub（创建于 10 月 20 日）· 618+ stars
- **Tags:** `inference` `nvidia` `dgx-spark` `rust` `open-source`

Flare 是一个 Apache-2.0 的本地推理服务器，面向 NVIDIA SM120/SM121 GPU —— 工作站与 DGX Spark 这类紧凑系统 —— 分为两半。**Ignition** 用 PyTorch、Transformers 与 FlashInfer/b12x 加载模型、调优内核、捕获 CUDA 图，产出**运行时包**：一个只含元数据的主 `.safetensors` 文件，加上按 SHA-256 命名的不可变 payload blob，装在签名信封里、cubin 加密；**Helios** 这个 Rust 运行时则以无 Python 的方式服务该包。所有 recipe 默认 FP8 E4M3 KV 存储，并且会话状态 —— 循环状态与 KV 缓存一并 —— 作为一个整体规划，使分支与恢复都能正确保留。

**Why it matters:** README 对范围罕见地坦率：这是"研究原型"，只覆盖 SM120/SM121，且"Flare 不是、也永远不会是 vLLM 这类生产推理引擎的替代品"。值得关注的是它的设计赌注 —— 在编译期完成内核与图的捕获，产出带签名、按哈希寻址的包，使服务进程很小、它运行的东西可验证 —— 这与 agent 沙箱世界正在收敛的工件形态是同一个形状，只是用在了模型权重上。

[`🔗 NVIDIA/flare-local-inference`](https://github.com/NVIDIA/flare-local-inference) · [`🔗 模型准备与服务`](https://github.com/NVIDIA/flare-local-inference/blob/main/docs/model-preparation.md)

---

## 47. RLVR 下的工具性趋同并非单调：SFT 时 25%，训练中 46%，最终检查点 11.8%

- **Velocity:** ▮ steady
- **Source:** arXiv 2610.31624 · 约 1 天前 (~20:00 UTC+8 10 月 22 日)
- **Tags:** `arxiv` `rlvr` `safety` `olmo` `post-training`

Barış Alparslan、Sandy Tanwisuth 与 Caleb Petterson 在 InstrumentalEval 上评估 OLMo-3-7B-Think，覆盖 SFT、DPO、**13 个中间 RLVR 检查点**与最终 RLVR 模型，追问带可验证奖励的强化学习是否让权力寻求行为更可能。轨迹是非单调的：工具性行为率从 SFT 的 25.0% 上升到 RLVR 约第 200 步的 46.1%，再在最终检查点降到 11.8%；配对的项目级检验与逐步骤回归支持 SFT 到最终版本确有下降。提示框架解释不了这个形状 —— 有害提示指示符加上其它框架效应，平均只能解释同一检查点内约 15% 的分数方差。

**Why it matters:** 一个"训练前 vs 训练后"的安全分数，会依据取样时刻报告"RLVR 让它更糟"（在第 200 步测）或"RLVR 让它更好"（在末尾测），而两种说法对过程都是错的。检查点级别的视角才是方法论上的发现：训练中的**暂时性**不安全行为，与已发布模型的**行为属性**不是同一个断言，而部署决策只消费后者。

[`🔗 arXiv 摘要`](https://arxiv.org/abs/2610.31624) · [`🔗 PDF`](https://arxiv.org/pdf/2610.31624v1)

---

## 48. "科学的异质空间"：采样连贯、但没有任何现有社区会提出的研究方向

- **Velocity:** ▮ steady
- **Source:** Hacker News / arXiv 2603.01092 · 95+ pts · 约 1 天前 (~21:25 UTC+8)
- **Tags:** `arxiv` `research` `llm` `novelty` `discovery`

作者主张，科学发现不只受真值约束，也受**认知可得性**约束：许多方向在文献看来是连贯的，却不太可能被提出，因为没有哪个现有社区把相关的概念、方法与直觉组合在一起。他们的方法把论文分解为概念单元，聚类成"思想原子"词表，再用两个模型给组合排序 —— 一个判断该组合是否可行，另一个判断**是否有任何现有作者社区**处于能产出它的位置 —— 从而在最大化连贯性的同时最小化可得性。在 NeurIPS、ICLR、ICML 与主要 NLP 会议的 16,068 篇同行评审 LLM 论文上，该采样器产出的研究组合比前沿 LLM 基线更多样，并在盲评人类、LLM 与下游实验评估中持平或超过其单条想法质量；时间验证中所有组件只使用 2025 年前的数据。

**Why it matters:** "更新颖"是容易的主张，通常也是错的度量；这一项同时在**连贯性**和**人类社区本来会不会想到**两个维度上打分，后者是难得多目标。诚实的边界在实验里：盲评人类与 LLM 裁判只能判断可信度，下游实验只能测部分想法，而"认知不可得"是相对于一个作者社区模型定义的 —— 采样器正是在优化那个模型，所以它的产出只在模型正确的范围内才够"异质"。

[`🔗 arXiv 摘要`](https://arxiv.org/abs/2603.01092) · [`🔗 Hacker News 讨论`](https://news.ycombinator.com/item?id=50195002)

---

## 49. ClickBench 以"作弊"为由移除 pgrust：每个基准查询一个手写内核，外加重放缓存答案

- **Velocity:** ▮ steady
- **Source:** Hacker News · 30+ pts · 4 小时前 (~16:05 UTC+8)
- **Tags:** `benchmarks` `clickbench` `rust` `integrity` `databases`

ClickBench 维护者 Alexey Milovidov 在 PR #2165 中移除了 `pgrust` 条目（#1163 加入、#2106 更新到 v0.4-preview），该 PR 于 9 月 22 日合入，今天登上 Hacker News。按 PR 的陈述：aarch64 发布二进制内嵌了 `q00.rs` 到 `q36.rs` 加 `tpch_q01.rs` 的源码路径 —— 每个基准查询一个手写内核 —— 而它的热跑会重放上一轮缓存的答案，这是规则禁止的（查询结果缓存与靠近流水线末端的缓存必须关闭）。该条目被标注为 `tuned: no`，实际却针对这 43 条查询专门调优。PR 作者还指出，v0.4-preview 的源码未公开，而二进制自称 `pgrust 0.3-beta`。

**Why it matters:** 只有当被测的东西就是交付的东西，排行榜才有用；而**只看结果表**，逐查询特化内核与一个好的优化器无法区分。结构性问题在于：这个主张只能靠反汇编一个未公开源码的二进制来证伪 —— 所以"在报告版本上可获取源码"应当写进条目的准入要求，而不只是规则里的一句话。

[`🔗 ClickBench PR #2165`](https://github.com/ClickHouse/ClickBench/pull/2165) · [`🔗 ClickBench 规则`](https://github.com/ClickHouse/ClickBench#rules-and-contribution) · [`🔗 malisper/pgrust`](https://github.com/malisper/pgrust)

---

## 50. Ely Office：用 Rust 与 GPUI 做 DOCX、XLSX、PDF 和 Git —— 构建注意事项写在 README 里

- **Velocity:** ▮ steady
- **Source:** GitHub（创建于 10 月 19 日）· 911+ stars
- **Tags:** `rust` `gpui` `office` `desktop` `open-source`

Ely Office 是一套 MIT 许可、离线优先的桌面套件，用 Rust 写在 GPUI 之上，文件留在你的目录里，没有账号也没有云服务。应用按**引擎**而不是按重写来划分：ElyDoc、ElyTable、ElyShow 跑在打过补丁的 LibreOfficeKit（26.2.6.3）上，ElyPDF 用 MuPDF 1.28.5 加 Tesseract OCR 与签名，ElyTree 封装 Git，ElyMark 使用 `markdown-rs`、RaTeX 与 `mermaid-rs-renderer`；ElyMail 与 ElyAgent 排在第二个版本。仓库给出了 doctor 脚本、固定版本的依赖源码抓取、约一小时的 LibreOffice 构建，以及 macOS、Linux、Windows 的打包 recipe。

**Why it matters:** 工程上的赌注很务实 —— 保留 LibreOffice 的文档引擎、替换外壳 —— 这比从零写一个 Rust 办公套件更可能达到可靠的 DOCX/XLSX 保真度。README 自己写明的限制才是要带走的：只有 macOS 真正跑过，Linux 与 Windows 的打包 recipe 尚未验证，而且构建是多小时的原生工具链，不是一句 `cargo install`。

[`🔗 ELY-Open-Source/ElyOffice`](https://github.com/ELY-Open-Source/ElyOffice) · [`🔗 office.elygpui.com`](https://office.elygpui.com)

---

## 51. 一个中国 K–12 知识图谱 2,620 星 —— 1,644 个知识点、2,403 条先修边，而 README 说它是 AI 初稿

- **Velocity:** ▮ steady
- **Source:** GitHub（创建于 10 月 18 日）· 2,620+ stars
- **Tags:** `education` `knowledge-graph` `china` `dataset` `curriculum`

`cn-math-taxonomy` 把中国国家课程映射成一张先修图：1,644 个知识点、2,403 条先修边、6,723 道题，对齐 2022 年版课程标准及其 2025 年修订，并附带一个诊断工具 —— 答错时会沿先修边从高中内容一路回溯到真正没掌握的那个小学知识点。各个图刻意分开：英语不与数学连边，物理把自己的数学依赖写在 `mathLinks` 字段而非先修边里；先修边分为 `hard` 与 `soft`。仓库采用 CC BY-NC 4.0，README 明确写着这是 **AI 生成的初稿**（"这是 AI 生成的初稿"），课标对齐表中仍有若干行标注"待核"。

**Why it matters:** 结构化的课程内容正是辅导型 agent 需要的底座，而这里的诚实很不寻常：一张带有逐行核验状态的 AI 生成图，比一张自信但无出处说明的图更有用，因为未核验的行就是工作队列。许可同样重要 —— CC BY-NC 禁止商业使用，这把大多数会想要它的产品排除在外。

[`🔗 xiaoyang111222/cn-math-taxonomy`](https://github.com/xiaoyang111222/cn-math-taxonomy) · [`🔗 在线诊断演示`](https://math.pansgo.com/diagnose/?target=cnm_221&demo=1)

---

## 52. Claude-Red 再次上榜：78 个攻防安全 `SKILL.md`，自 10 月 12 日起未变更

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · 8,029+ stars · 今日 +209 stars
- **Tags:** `agent-skills` `security` `red-team` `claude` `open-source`

`SnailSploit/Claude-Red` 是一个 MIT 许可的技能库，包含 23 个类别下的 78 个 `SKILL.md` 文件，为 Claude 预先注入针对特定攻击面的方法论 —— SQL 注入、shellcode、EDR 规避、ADCS 滥用、漏洞利用开发 —— 由对话触发按需加载，而不是常驻上下文。仓库自 2026 年 3 月就存在，最后一次推送是 10 月 12 日；这次是**重新浮出**，不是新发布。README 把用途限定为获授权的红队项目、漏洞赏金初筛、安全研究与 CTF 准备，并链接了作者自己的研究站点。

**Why it matters:** 攻击性技能是技能格式安全模型最清晰的检验：工件是一段模型会当作方法论采纳的散文，于是"获授权项目"与"未授权"之间的边界，是 README 里的一句话，而不是运行时会强制执行的某个控制。它值得作为**一个门类**来读，而不是当作工具 —— 它展示了当一个技能目录处在"模型自身的护栏、而非操作方，是最后一道检查"的领域时，长什么样。

[`🔗 SnailSploit/Claude-Red`](https://github.com/SnailSploit/Claude-Red) · [`🔗 SnailSploit 研究`](https://snailsploit.com)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-10-23T12:21:22Z |
| Items | 52 |
| Sources tracked | 18 (Hacker News、GitHub Trending、NVD、CVE Program、GitHub Advisory DB、Exploit-DB、厂商公告、arXiv、Hugging Face、OpenAI/Anthropic/Baseten 工程博客、Microsoft Security Blog、Report URI、V12、标准基金会、安全研究博客) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8（每日三次） |
| Ranking | 速度加权（时效 × 互动加速度 × 信源权威度） |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[前一日](2026-10-22.md) · [原始 .md](https://trending.md/zh/feed/2026-10-23.md) · [归档](../archive/)
