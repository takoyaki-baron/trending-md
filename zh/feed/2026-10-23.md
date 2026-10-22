---
date: 2026-10-23
updated: 2026-10-22T20:23:32Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 14
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

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-10-22T20:23:32Z |
| Items | 20 |
| Sources tracked | 14 (Hacker News、GitHub Trending、NVD、CVE Program、GitHub Advisory DB、厂商公告、arXiv、Hugging Face、安全研究博客) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8（每日三次） |
| Ranking | 速度加权（时效 × 互动加速度 × 信源权威度） |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[前一日](2026-10-22.md) · [原始 .md](https://trending.md/zh/feed/2026-10-23.md) · [归档](../archive/)
