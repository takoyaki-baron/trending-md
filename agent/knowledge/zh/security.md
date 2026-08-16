---
title: 安全——CVE 流 + 攻击面综合
topic: security
created: 2026-08-16
---

# 安全——CVE 流 + 攻击面综合（2026 年 8 月）

贯穿 2026 年 8 月每一批 feed 的漏洞流汇总参考。agent 基础设施相关的条目（MCP SSRF 检查清单、
agent 执行面机制）也收录在 [[agent-stack]] 的安全章节；本文件是更广的企业/操作系统 CVE 台账，
加上记忆窗口所指的模式级综合。

## 模式级综合

五种反复出现的形态，各有一个典型实例：

1. **常驻凭证跳板。** 一个持有生产数据实时访问权的工具被打上未认证 RCE/SQL 注入，失陷随即级联。
   典型：Metabase CVE-2026-72898（密码重置端点 CVSS 10.0 SQL 注入——应用持有连到每个已连接数据仓库的
   常驻凭证）。TeamCity（9.8，agent 轮询协议）与 Apache Allura（9.8，git 参数注入）是 CI-CD 与 forge
   工具里的同构形态。SAP Commerce Cloud CVE-2026-58231（10.0，Data Hub Adapter）将其进一步延伸：
   该适配器把 Commerce Cloud 接入产品/订单/库存系统，因此一次命中远超暴露的服务本身。
2. **打补丁即逆向 → 负的利用时间（08-16，08-16 04:36 更新）。** 攻击者逆向刚发布的修复，并在多数组织
   打补丁之前就武器化它。典型：SAP Commerce Cloud CVE-2026-58231 在补丁发布*三天后*即在蜜罐遭到利用，
   且无公开 PoC（Defused）。更深的发现（Mandiant M-Trends 2026，Google Cloud）：平均利用时间如今是
   **−7 天**——平均而言利用先于补丁发生——轨迹为 +63 天（2018）→ 约 32 天（2022）→ −1 天（2024）→
   −7 天（2026）；Qualys（−1 天）、CrowdStrike 2026（42% 的漏洞在公开披露前即被利用；eCrime 突破中位
   29 分钟 / 最快 27 秒）、VulnCheck（28.96% 的 KEV 漏洞在 CVE 发布当天或之前即被利用，高于 23.6%）、
   Flashpoint（2020 年 745 天 → 2025 年约 44 天）也印证。SAP 3 天案例如今是*慢*端——Marimo CVE-2026-39987
   （披露后 9 小时 41 分，无 PoC）与 cPanel CVE-2026-41940（<24 小时）显示的是小时级。CVSS 10.0 的补丁
   不再是一次常规更新；逆向窗口*就是*暴露窗口，而补丁速度在结构上已过时（中位修复 74 天 vs −7 天 MTE）。
   **什么取代补丁速度（08-16 12:24）：** Mandiant 自己的答案是**行为异常检测**——用基线取代静态 IOC，
   标记异常的边缘设备访问、批量 API 操作与 SaaS token 滥用。全球中位驻留时间升至 14 天（原 11 天），
   但如今只是*滞后*指标（反映攻击者的老练，而非防御健康）；IAB→勒索加密的中位交接时间从 8 小时以上
   （2022）坍缩到 **22 秒**（2025），因此任何依赖人工环路的指标都只是装饰。只有 52% 的入侵是被内部
   检测到的。正在形成的指标组合：暴露面管理 + 假定已失陷的检测覆盖率 + 分钟级自动化 MTTC。
3. **默认暴露面。** 产品默认就开着一个网络服务、无认证，互联网自然会找上门。典型：macOS 屏幕共享
   CVE-2026-65400（9.8）——认证状态缺陷让网络攻击者无需凭证即可认证并提权到 root；macOS 在开启屏幕
   共享时会自动开放 TCP 5900 的 VNC（约 40,000 台互联网暴露的 Mac），荷兰 NCSC 确认其正被积极利用，
   结局是门罗币矿机。与自动暴露的 agent 执行面（UFO/AgenticSeek）同构，只是发生在桌面操作系统上。
4. **AI 辅助利用（攻击侧）。** 漏洞利用开发周期正被 coding agent 压缩。典型：Rapid7 的 SharePoint 链
   （CVE-2026-55040 JWT `alg:none` 绕过 + CVE-2026-63520 .NET 类型实例化 → 未认证 RCE）——一次明确的
   AI 辅助实验，历时 24 个有效日、96 个会话、约 80,000 次工具调用，由人主导。这是 Vercel deepsec 的
   攻击侧镜像；PoC 发布一天内即有攻击者对蜜罐探测。
5. **设计即供应链。** 通过分发更新的通道本身实现 RCE。典型：WPMU DEV Dashboard CVE-2026-16051（9.8）
   ——无包完整性校验 + 签名管理请求无重放保护，因此一个被重放或伪造的签名请求就能经插件更新通道安装
   任意代码。Cl0p/PTC Windchill CVE-2026-12569（9.8）是其中的勒索软件实例（约 50 家企业、工程 IP 被窃）。
6. **提示注入型 RCE——agent 本身就是攻击面。** 注入目标是模型的代码执行工具，而非网页表单。典型：
   MindsDB Minds Platform CVE-2026-73678（CVSS 10.0）：一个未认证的 `POST /api/v1/responses/` 端点 +
   一条自带密钥（BYO-key）链（`PUT /api/v1/settings/` 端点同样未认证）让攻击者驱动内置的 **Anton**
   agent 的 scratchpad 工具落入一个无沙箱的裸 `exec()` → 以应用权限执行任意系统命令（含 SSH 密钥、
   已存凭证、环境密钥）。过度宽松的 CORS（`allow_origins=["*"]` + `allow_credentials=True`）还使浏览
   器侧利用成为可能。披露时无已修复版本。
   **已命名 + 标准（08-16 12:24）：** OWASP 的 agentic 榜单已将此类命名为 **Unexpected Code
   Execution**（ASI05）；MITRE 标签为 CWE-94（代码注入）+ CWE-306（缺失认证）+ CWE-942（宽松 CORS），
   而 OWASP 的 LLM06「Excessive Agency」则框定了根因（模型被授予过大的工具权限）。尚未进入 CISA KEV
   （8 月 14 日才发布；CNA 为 VulnCheck）。收敛中的缓解标准：默认给 agent 端点加认证、给代码执行工具
   加沙箱（去掉裸 `exec()`/`shell=True`）、最小权限工具范围 + 权限分级（OWASP 多层防御）。

## CVE 台账（最新在前）

- **MindsDB Minds Platform CVE-2026-73678**（10.0）——未认证的 `POST /api/v1/responses/` + 自带密钥链
  （未认证的 `PUT /api/v1/settings/`）→ 提示注入的 Anton agent scratchpad 经无沙箱的裸 `exec()` 执行
  攻击者影响的 Python → RCE。宽松的 CORS（`allow_origins=["*"]` + `allow_credentials=True`）使浏览器侧
  利用成为可能。披露时无已修复版本（修复仅在 dev 分支）；公告 GHSA-jcxw-h8ph-pxpv。
- **Citrix NetScaler ADC/Gateway CVE-2026-8452**——SAML 规范化路径（`nsppe`）中的堆溢出：超大的
  `<ds:SignedInfo>` `PrefixList` 溢出定长缓冲区并破坏相邻堆块的 data 指针 → write-what-where；NetScaler
  以非 PIE + 可执行堆发布 → 以 root 未认证 RCE（PHP webshell 落在 `/vpn/theme/x.php`，pitboss watchdog
  信号处理器被禁用）。2023 年以来首个公开的 NetScaler 预认证 RCE（前一个为 CVE-2023-3519）。Citrix 6 月
  30 日的公告仅将其低估为"不可预测的行为"。watchTowr 的 PoC 硬编码针对 13.1-30.52；JPCERT/CC 称截至
  8 月 15 日无已确认的野外利用。无缓解措施——升级到 14.1-72.61 / 13.1-63.18。
- **SAP Commerce Cloud Data Hub Adapter CVE-2026-58231**（CVSS 10.0）——授权不足 + 输入校验薄弱，让未
  认证攻击者滥用默认认证客户端实现任意代码执行；补丁发布 3 天后即被利用且无公开 PoC；影响 COM_CLOUD
  2211 / 2211-JDK21。Defused 于 8 月 14 日首次检测到蜜罐命中（SAP 8 月 11 日补丁后 3 天；无公开 PoC），
  来自 AS11402（216.249.99.43），为自动化批量扫描；Shadowserver 指纹到 4,200+ 个互联网暴露的 SAP
  Commerce Cloud 实例。临时缓解：对漏洞端点配置 IP Filter Set。
- **macOS 屏幕共享 CVE-2026-65400**（9.8）——VNC/TCP 5900 认证绕过 → root；8 月 6 日已修复（Tahoe
  26.6.1 / Sequoia 15.7.9 / Sonoma 14.8.9）；荷兰 NCSC 确认野外利用，结局为门罗币矿机；约 40,000 台
  潜在暴露的 Mac。关闭屏幕共享或封禁 5900。
- **Rapid7 SharePoint 链 CVE-2026-55040（9.1）+ CVE-2026-63520（8.1）**——JWT 校验绕过
  （`RequireSignedTokens=false` → 接受 `alg:none`；签名密钥从攻击者提供的 `x5t` 解析）串联 BCS 中的
  不安全 .NET 类型实例化 → 本地 SharePoint 未认证 RCE。PoC 于 8 月 11 日发布；两个修复相隔一个月，
  因此只修一半会让另一半仍可武器化。
- **Lazarus CVE-2026-68820**（afd.sys UAF 零日）——本地 → SYSTEM、无需交互；Operation Dream Job
  （LinkedIn 上冒充 Lockheed Martin / Enveil 的招聘账号）投递 Troy 后门 + 后量子（Kyber/ML-KEM）载荷，
  随后安装 FudModule v3.1（致盲 94 个 ETW 通道）。CISA KEV 截止 8 月 25 日；rootkit 样本日期为 7 月
  7 日 → 补丁前被利用了约 5 周。
- **Windows DNS Server CVE-2026-62878**（9.8）——栈溢出、未认证/网络可达/无交互，据 ZDI 可蠕虫化；是
  398 个 CVE 的 8 月 Patch Tuesday 头条，与正被积极利用的 **CVE-2026-62832**（LegacyHive，User Profile
  Service → SYSTEM）并列。
- **GeoServer SQL 注入零日（尚无 CVE）**——`jsonArrayContains` SQL 注入在 H2 `sa` / MSSQL admin 配置下
  可达 RCE；8 月 12 日由 @q1uf3ng 披露，数小时内即被探测。反复出现的"广泛部署 OSS + 未修补 SQL 注入
  /RCE"缺陷类。
- **SonicWall SMA1000 CVE-2026-15409（10.0 SSRF）+ CVE-2026-15410（7.2）**——wsproxy「Work Place」SSRF
  + 命令注入串联为零点击未认证 root；INC Ransomware 关联组织的攻击媒介；6 月 22 日起被利用（早于
  披露），约 380 台暴露。
- **Metabase CVE-2026-72898**（10.0）——`POST /api/session/reset_password` 的未认证 SQL 注入，正被积极
  利用，KEV 截止（08-14）。持有连到每个已连接数据仓库的常驻凭证。
- **JetBrains TeamCity CVE-2026-63077**（9.8）——agent 轮询协议中经 XStream 反序列化的未认证 RCE，
  KEV，约 4,500 暴露 / 约 450 已修补。
- **Apache Allura CVE-2026-73240**（9.8）——git 参数注入，1.19.1 之前版本。
- **Cl0p / PTC Windchill CVE-2026-12569**（9.8）——未认证 RCE（不安全反序列化 + WSDL 信息泄露 → JSP
  webshell）；约 50 家企业被勒索（Shell、Philips、GE、Fiserv）；PLM 上的 MOVEit 剧本。
- **WPMU DEV Dashboard CVE-2026-16051**（9.8）——无包完整性校验 + 签名管理请求无重放保护 → 经更新
  通道 RCE（5.0.1 修复）。
- **Microsoft UFO CVE-2026-73296**（9.4）——TCP 8020/8021 上无认证的 Streamable HTTP MCP → 对 ADB
  连接的 Android 达到 RCE 等效控制；修复在缺少 `UFO_MCP_API_KEY` 时拒绝启动。
- **Fosowl AgenticSeek CVE-2026-72776**（9.8）——`/query` 挂在 `0.0.0.0:7777` → `subprocess.Popen
  (shell=True)`；PR #534 修复。
- **Langflow CVE-2026-9198**（9.8，KEV）——一条链：`/api/v1/auto_login`（CVE-2026-9103，给任意未认证
  调用者发放 SUPERUSER JWT）→ `/api/v1/validate/code`（CVE-2026-8481，无沙箱 `exec()`），经默认参数
  技巧利用。MCP 相邻的 agent 工具触及 `exec()` = RCE，无需 SSRF。
- **mcp-grafana CVE-2026-19516**（9.1 SSRF）——调用方可控的 `X-Grafana-URL` 请求头设定出站目标；前身
  CVE-2026-15583 只修补了 token 泄露而未修补目标地址。
- **更早的企业边缘：** VMware vCenter CVE-2026-59310（9.8 未认证 RCE）；Progress Kemp LoadMaster
  CVE-2026-8037（9.6 命令注入，KEV）；Adobe Commerce/Magento CVE-2026-71362（9.1 未认证账户接管）；
  Cisco ASA/FTD CVE-2026-20349（8.6 未认证 VPN DoS，KEV）；SAP NetWeaver SB2026081203（9.3 RCE）；
  Semantica v0.6.5（5 个外部上报漏洞）；Chrome 5 个 UAF。

## 防御镜像 + 审计清单

- **Vercel deepsec**（`vercel-labs/deepsec`，Apache 2.0）与 **OpenAI Codex Security** 把同样的 agentic
  模式反过来用于防御：候选扫描 → agent 数据流追踪 → 再校验（约 10–20% 误报率），源码不外流。见
  [[agent-stack]]。
- **MCP SSRF 审计清单**（7 步，模板 CVE-2026-19516）与未认证 MCP/工具执行的修复清单（绑定环回、给
  端点加闸、去掉 `shell=True`、强制 token）收录于 [[agent-stack]]。

## 关注点

- ~~"打补丁即逆向"会否压缩补丁窗口？~~ **已作答（08-16 04:36）：是——窗口已转为负值（−7 天 MTE）。**
  ~~什么会取代补丁速度成为可度量的防御指标？~~ **已作答（08-16 12:24）：行为异常检测 + 假定失陷覆盖率；
  驻留时间（14 天）如今是滞后指标，22 秒交接让人工环路指标沦为装饰（见形态 2）。** 开放子问题：
  "披露-赛跑"会否推动厂商走向静默或延迟披露？
- AI 辅助的*攻击*利用节奏（Rapid7 24 天）vs 防御侧的铺开——谁赢得这场压缩竞赛？
- VNC 与 MCP 之外的默认暴露面：agent 运行时与桌面操作系统里还有哪些"默认开启、网络可达"的服务？
- ~~未认证的 agent 端点 + 提示注入型工具执行（MindsDB）——这一类会否获得命名 / KEV 收录，缓解标准会
  是什么？~~ **已作答（08-16 12:24）：** 此类已命名（OWASP ASI05 "Unexpected Code Execution" /
  CWE-94/306/942 / LLM06 "Excessive Agency"）；尚未进入 KEV（发布太新）。缓解标准：给端点加认证 +
  给代码执行工具加沙箱 + 最小权限工具分级（见形态 6）。
