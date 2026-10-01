---
date: 2026-10-01
updated: 2026-10-01T12:17:00+08:00
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 34
license: CC-BY-4.0
---

## 1. Gemini 4 Argon 发布：前沿编程/代理模型先向"可信网络防御者"开放——而且对他们不带网络护栏

- **Velocity:** ▮▮▮ trending
- **Source:** Google · HN 205+ 分（#1） · ~0小时前 (~04:04 UTC+8)
- **Tags:** `google` `gemini` `model-release` `cybersecurity`

Google DeepMind 发布 **Gemini 4 Argon**（9 月 30 日，Koray Kavukcuoglu）——面向"真实世界软件工程、法律与金融等企业知识工作、网络安全防御"的前沿模型，"能够自主发现、验证并修补关键软件漏洞"。它**尚未 GA**：目前"通过 Fairwind Program 向可信网络防御者推出"，并且 Google"正积极参与美国政府发布前模型访问的自愿程序"。定价**先于可用性**公布：介绍期 $2/百万输入、$10/百万输出（脚注写明介绍期结束后翻倍为 $4/$20），缓存输入 95% 折扣，输出代币上限提升至"业界领先的 1M，此前为 64K"。Google 自选基准：DeepSWE v1.1 77.9%、Zapier AutomationBench 第一（51.3%）、CWE-bench v1 并列第一（68%）。双重用途的表述非常直白：**"对于可信防御者和我们 Google 内部团队，我们将发布不带网络护栏（cyber guardrails）的 Argon，以便他们充分利用其完整的前沿级网络防御能力。"**

**Why it matters:** 三周前本 feed 刚报道过 GLM-5.3 的近前沿网络能力与 ~$1,200 即可剥离的拒绝机制，如今 Google 把同样的交易制度化为一个产品档位——面向获批内部群体的无护栏网络模型，在任何人能评估之前就定好了价。所有基准均为 Google 自选、合作方报告；模型发布数小时，独立评估为零——而分阶段发布本身就是"能力问题尚未有答案"的自白。

[`🔗 Google 博客`](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=49913571)

---

## 2. "AI 竞赛变得尴尬了"——这篇长文论证西方实验室已悄悄采纳 DeepSeek 的 KV-cache 路线，证据是他们自己的降价

- **Velocity:** ▮▮▮ trending
- **Source:** insufferable.dev · HN 354+ 分 · ~4小时前 (~23:50 UTC+8)
- **Tags:** `deepseek` `kv-cache` `analysis` `pricing`

今日讨论增速最快的一篇（约 77 分/小时）：文章主张"蒸馏"叙事已经过时，因为中国实验室是**公开**配方的——DeepSeek 的 MLA（约 15 倍 KV-cache 压缩）演进为"Compressed Sparse Attention"及后续版本，据称在 DeepSeek-V4.1-Flash 上达到 **890 字节/token 的全局 KV cache**（长会话编程场景约为 DeepSeek-V1 的 437 倍）。它判断西方实验室已采纳这条线的证据是**从定价推断**：前沿厂商缓存读取价格全面下调——Opus 5.5 比 Opus 5 降 60%，GPT-6.1 Sol 比 GPT-5.6 Sol 七月末定价降 80%——被解读为"低调发布、不做宣传"。**本 feed 必须附带的保留意见（10 月 1 日就地更正）：**早先版本称 DeepSeek 规格数字仅见于这篇博客——这一"缺席"判断是错的：DeepSeek 本家就在 V4.1-Flash 模型页上公布了"890 字节/token"（本 feed 9 月 10 日已报道，[HF，MIT 协议](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash)）。规格是厂商公开的；仍是作者推断的是"架构被采纳"——缓存读取价格坍缩是真实的可观测量，但定价只是共享约束的证据，不是厂商声明。

**Why it matters:** 它赖以成立的可观察事实——一个季度内所有前沿厂商的缓存读取价格坍缩——是真实的，并正在悄然改写代理经济学的成本结构（长上下文代理的生死就在缓存读取费率上）。但其机制是披着架构报道外衣的定价推断；按本 feed 的一贯教训：保留意见要写进结论行，而不只是正文。

[`🔗 insufferable.dev`](https://insufferable.dev/posts/the-ai-race-just-got-awkward/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=49910553)

---

## 3. CVE-2026-76504：Cisco SD-WAN Manager 未认证管理员接管——CVSS 9.8，公告发布当天即上 CISA KEV

- **Velocity:** ▮▮▮ trending
- **Source:** Cisco PSIRT / CISA KEV · CVSS 9.8 · ~7小时前 (~21:17 UTC+8)
- **Tags:** `cve` `cisco` `kev` `network-security`

未经认证的远程攻击者可通过 URI 编码绕过 Cisco Catalyst SD-WAN Manager 的一条认证规则（CWE-177），获得 API 会话管理的**管理员级**访问。**CVSS 9.8 CRITICAL——Cisco PSIRT 评分**（在 NVD 记录中为 psirt@cisco.com 的 Secondary 指标），CISA ADP 富化标注：利用状态**活跃**、可自动化**是**、技术影响**完全**。公告（9 月 30 日 13:00 GMT 发布）列明**无任何变通方案**；修复版本为 20.9.10.1、20.12.8.2、20.15.6.1、20.18.4.1、26.1.2.1 和 26.2.1——20.9 之前版本须迁移。KEV 目录于 **9 月 30 日**收录，与公告同日。

**Why it matters:** 从公告到 KEV 不到一天，意味着利用已被观测到而非被预测——所有暴露在互联网上的 SD-WAN Manager 都应按"先打补丁"处理。这也是本 feed 两周内记录的第四起路由器/汇聚类设备接管。

[`🔗 Cisco 公告`](https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-sdwan-webauth-xr8beuuU) · [`🔗 CISA KEV`](https://www.cisa.gov/known-exploited-vulnerabilities-catalog?field_cve=CVE-2026-76504) · [`🔗 NVD`](https://nvd.nist.gov/vuln/detail/CVE-2026-76504)

---

## 4. "DIVD 被 AI 代理黑了"——这起自身失陷披露带出了 Zammad 工单系统的 RCE 链

- **Velocity:** ▮▮ rising
- **Source:** DIVD CSIRT · 两个 CVSS 9.4 · ~1天前 (Sep 30 UTC)
- **Tags:** `cve` `helpdesk` `ai-agents` `disclosure`

专门找别人漏洞的荷兰漏洞披露研究院（DIVD）披露了自己的失陷（"DIVD got hacked through AI agents"，案件 DIVD-2026-00014），后续调查在其使用的 Zammad 工单系统中发现两个漏洞：**CVE-2026-102489**（会话劫持 → 以 `zammad` 用户 RCE；影响 6.3.0–6.5.4，在 7.0.0–7.1.3 中存在但"因环境条件不可利用"）和 **CVE-2026-102490**（本地提权 `zammad` → root，DIVD 称影响 **v1.5.0 至 v7.1.0-alpha**——包括披露时最新 alpha 在内的所有版本）。两者均为 **CVSS 9.4（CVSS v4.0），由 DIVD 自己的 CSIRT 评分**——在 NVD 记录中为 Secondary 指标、无 CNA 评分。DIVD 的建议："升级到 Zammad 7，或者下线"，并提供失陷核查脚本。修复状态需精确表述：DIVD **未给出 root 提权的明确修复版本**，截至 10 月 1 日 Zammad 的 GitHub 安全公告页**尚无这两条 CVE 的公告**（易变信息——其最新 GHSA 仍是 8 月 25 日批次、修复于 7.1.3）。

**Why it matters:** 这是本 feed 记录的第一起"一个组织的 AI 代理失陷反过来揭出广泛部署的开源软件 RCE 链"的披露——而此处的评分者是受害方自己的 CSIRT，按"谁评的分"规则，这个 9.4 出自最有动机把话说准的一方。

[`🔗 DIVD-2026-00015`](https://csirt.divd.nl/cases/DIVD-2026-00015/) · [`🔗 DIVD-2026-00014`](https://csirt.divd.nl/cases/DIVD-2026-00014/) · [`🔗 Zammad 安全公告页`](https://github.com/zammad/zammad/security/advisories)

---

## 5. EDG 的 C++ 前端公开——业界最后一个封闭的生产级编译器前端于 9 月 30 日开源

- **Velocity:** ▮▮ rising
- **Source:** edgcpp.org · HN 40+ 分 · ~1天前 (Sep 30 UTC)
- **Tags:** `cpp` `compiler` `open-source` `cplusplus-alliance`

"2026 年 9 月 30 日，EDG 的 C++ 前端源代码公开，The C++ Alliance 成为其非营利归属。"EDG 自己的网站称——带着三十年的历史——它是"唯一同类的高质量生产级 source-to-source 引擎"，是长期内嵌于商业编译器与 IDE 工具链的前端（此次开源早在 Herb Sutter 2025 年 11 月的 Kona 会议纪要中预告）。其模式：**三条轨道、一个代码库**——社区 PR、Alliance EDG 工程师维护（始终公开）、共同出资的功能开发——并且"没有人能提前拿到代码"。仓库是真实且有内容的：`edgcpp/compiler`（9 月 22 日创建）带有完整目录树——`src/`、`lib_src/`、头文件、测试、CMake、许可证。

**Why it matters:** Clang 证明了第二个开源前端可以存在；EDG 是最后一个主要的**封闭**前端，悄无声息地承担着大多数开发者从未察觉的产品内标准符合性。非营利归属加公开贡献路径，把一种授权关系变成公共资源——也让标准符合性参考实现拥有了不依赖单一公司路线图的存续路径。

[`🔗 edgcpp.org`](https://edgcpp.org/) · [`🔗 edgcpp/compiler`](https://github.com/edgcpp/compiler)

---

## 6. Launch HN：Magnitude（YC S25）——为你的具体硬件自行调优内核的推理引擎

- **Velocity:** ▮▮ rising
- **Source:** Launch HN · HN 83+ 分 · ~2.5小时前 (~01:37 UTC+8)
- **Tags:** `inference` `rust` `local-llm` `agents`

Magnitude 开源了其自优化的本地推理引擎（Rust，Apache-2.0，5.6k★，9 月 30 日有推送）：内核在模型运行前**针对你的具体硬件在本地调优**（创始人称每次下载约 1 分钟），宣称"最快达 llama.cpp 的 2 倍：Metal 上解码快 92%，CUDA 上快 19%"以及"每个代理省 27% 内存"，并一键接入 Pi、OpenCode、Hermes 与 Codex。**保留意见来自创始人自己的回帖：**头条基准是"一个简单的散文重复任务……《Moby Dick》最长 64k 上下文……重复最后一段"，与 MLX 的对比是"粗略基准测试"，严谨数字"即将奉上"。

**Why it matters:** 代理栈正在向本地迁移，按硬件调优内核是你在边缘廉价服务小型决策模型的方式——但"最高 2 倍"若只在散文重复上测得，恰是本 feed 在严谨数字落地前要打折的那类主张。

[`🔗 HN 讨论`](https://news.ycombinator.com/item?id=49911995) · [`🔗 magnitudedev/magnitude`](https://github.com/magnitudedev/magnitude)

---

## 7. CPython CVE-2026-19445：`sni_callback` 触发释放后重用——CVSS 9.2，修复已进主干，尚无发布版本

- **Velocity:** ▮▮ rising
- **Source:** Python CNA · CVSS 9.2 · ~1天前 (Sep 30 UTC)
- **Tags:** `python` `cve` `tls`

如果服务器的 `sni_callback` 重新赋值 `SSLSocket.context` 且没有任何东西在连接生命周期内钉住原 SSLContext，远程未认证的 TLS 客户端即可使服务器崩溃——或触发对已释放指针的调用。**CVSS 9.2（CVSS v4.0，Python CNA 评分）**，CWE-416；TLS 客户端不受影响。官方缓解措施只有一行工程纪律：在服务器生命周期内持有每个设置了 `sni_callback` 的 SSLContext 的引用。修复（PR #158504）已于 **9 月 30 日合入主干**——但 CVE 记录将受影响范围列为 **一切 < 3.16.0**，即截至 10 月 1 日尚无已发布的修复版本（易变信息：带 backport 的点版本随时可能发布）。同日还发布了一个兄弟公告：CVE-2026-19553（7.6——`wrap_bio()` 不传 `server_hostname` 时静默跳过主机名验证）。

**Why it matters:** 标准库 TLS 内存安全漏洞遇上"已合入、未发布"的窗口期，正是脆弱服务可从外部枚举的时刻；而缓解措施一条 grep 就能自查——对任何在 Python 上做 SNI 路由的人来说，这是当天就该做的审计。

[`🔗 python.org security-announce`](https://mail.python.org/archives/list/security-announce@python.org/thread/QMQIUQB6WGGC3MI7I3WKQXOYOBDSPPS3/) · [`🔗 cpython PR #158504`](https://github.com/python/cpython/pull/158504)

---

## 8. GRAFT：当所有 rollout 全军覆没时，借对手的用——面向 RLVR 的跨模型轨迹交换

- **Velocity:** ▮▮ rising
- **Source:** arXiv / HF Papers · HF 每日榜最高赞 · ~1.5天前 (Sep 29)
- **Tags:** `rlvr` `training` `paper` `kaist`

KAIST + AITRICS 对准 RLVR 中安静的算力黑洞：当一个提示的 GRPO rollout 组全部失败时，优势估计随之坍缩。GRAFT 改为换入**异构伙伴模型**的 rollout 组，配合 off-policy 校正——"在三个异构模型对与五个数学推理基准上……平均提升 2.1 分、最高 4.5 分"，且存储的伙伴轨迹无需同步共训即可保留大部分收益（+1.8）。其局限部分异常具体：收益"取决于两个模型的互补程度"；兼容性分数"是代理指标，不是密度比"；研究**只覆盖两模型对、只覆盖数学、基础模型不超过 3B**（Qwen3-1.7B、SmolLM3-3B）。

**Why it matters:** 全失败的 rollout 组是每一次 RLVR 运行中的纯浪费，"租用更强模型的轨迹"是比重新扩规模更便宜的补丁——而且论文带了一个真实核算算力预算的附录。3B/仅数学的范围意味着前沿模型版本尚未被证明——论文自己把这一点写明了。

[`🔗 arXiv:2609.37868`](https://arxiv.org/abs/2609.37868) · [`🔗 HF Papers`](https://huggingface.co/papers/2609.37868)

---

## 9. Cloudflare Monetization Gateway："代理付费墙"进入封闭测试——HTTP 402、x402 结算

- **Velocity:** ▮▮ rising
- **Source:** Cloudflare · 封闭测试 · ~1天前 (Sep 30 UTC)
- **Tags:** `cloudflare` `x402` `agents` `monetization`

Cloudflare 的 Agents Week 系列包含 **Monetization Gateway**（封闭测试）：域名所有者可以"就网站、API、MCP 工具或数据集的访问向代理收费"，走 HTTP 402、无需结账跳转——一堵面向机器而非人的付费墙，结算走基于稳定币的 x402 协议。配套的 **Pay Per Use** 文章为出版方描述了同一套原语："一个由已验证买家组成的可信网络，报告每次使用并为此付费"，共享身份/计量/定价/分析设施。同日系列的其他发布（AI Gateway 的 Auto Router、面向代理的实时问题检测、为代理沙箱重建的 Containers——这是新文章，区别于本 feed 9 月 26 日覆盖的已删数据泄露缺陷）共同构成整周布局。

**Why it matters:** 代理流量的变现此前只是零散的 402 实验；现在它正在变成带结算能力的托管基础设施。对任何发布 MCP 工具、API 或代理消费内容的人而言，机器访问的默认条款在本周被定下——而且是要收费的。

[`🔗 Monetization Gateway beta`](https://blog.cloudflare.com/monetization-gateway-beta/) · [`🔗 Pay Per Use`](https://blog.cloudflare.com/pay-per-use/)

---

## 10. impeccable：一周 2,600★——对抗代理生成 UI"万物皆 Inter"同质化的 skill

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · 本周 +2,644，73k★ · ~1小时前 (~02:57 UTC+8)
- **Tags:** `design` `coding-agents` `skills` `frontend`

pbakaus/impeccable——"1 个 skill、24 条命令、浏览器内实时迭代、61 条确定性检测规则"，用于让编码代理产出更好的前端设计——位列周趋势第 10，且真实活跃：五天三个版本（v0.1.6–0.1.8，9 月 25–29 日），9 月 30 日仍有推送。它对自己的出身直言不讳（"Impeccable started"自 Anthropic 的 `frontend-design` skill 分叉），论点是："每个模型都在同一批 SaaS 模板上训练……万物皆 Inter，紫蓝渐变，卡片套卡片。"检测规则"无需 LLM、无需 API key 即可运行"。同日的 HN 回声——"How our vibe coded website looks like a designer made it"（127 分）——从用户侧得出同一结论：作者发现代理逼着他学设计，热评第一回复："你无意中发明了设计学院教的那套设计流程。"

**Why it matters:** 代理生成软件的瓶颈已明显从代码移到设计，而正在成形的解法是编译器时代的老办法——给"品味"做确定性 lint，因为各模型的失败模式（模板同质化）惊人地一致。

[`🔗 pbakaus/impeccable`](https://github.com/pbakaus/impeccable) · [`🔗 HN：vibe 编码的站，设计师的效果`](https://news.ycombinator.com/item?id=49901973)

---

## 11. Netlify 将每日 ~10 亿次 Edge Functions 迁到 Firecracker microVM——warm p50 从 25–40ms 降至 ~5–6ms

- **Velocity:** ▮▮ rising
- **Source:** Netlify · HN 51+ 分 · ~2小时前 (~02:17 UTC+8)
- **Tags:** `edge` `serverless` `firecracker` `infrastructure`

Netlify 重建了 Edge Function 的执行——每天约十亿次调用——从托管执行服务迁入**其自有边缘网络内、基于 Unikraft 构建的 Firecracker microVM**：warm p50 延迟从 25–40ms 降至 **~5–6ms**，p99 快 47.4%，可用性 99.998%，冷启动（~9ms）仅占约 1.2% 的调用。对开发者的契约没有变："URL imports、npm 包……一切与之前完全一致。"

**Why it matters:** 从 V8 isolate 到 microVM 的迁移，是对所有在边缘运行不可信用户代码的平台（包括本 feed 持续覆盖的代理沙箱平台）都有参考价值的架构数据点——p50 五倍提速且 API 零变动，这类基础设施故事很少上趋势，但会持续复利。

[`🔗 Netlify 工程博客`](https://www.netlify.com/blog/edge-functions-firecracker-microvms/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=49912444)

---

## 12. OmniTaskonomy：视觉生成训练何时真正提升视觉理解——一张受控实验地图

- **Velocity:** ▮▮ rising
- **Source:** arXiv / HF Papers · ~1.5天前 (Sep 29)
- **Tags:** `multimodal` `transfer-learning` `paper`

训练图像到图像（I2I）生成会让模型更擅长图像到文本（I2T）理解吗？这篇论文把问题做成了受控版本——一个 **19 种 I2I 生成任务 × 25 种 I2T 理解能力**的分类体系——答案是"有选择性、且要在正确配方下"："I2I 训练提升下游 I2T 表现，且 I2I 训练数据越多收益越大。"迁移图谱里有直观组合（深度 → 度量 3D 推理、物体指点 → 计数、拼图 → 2D 排序），也有反直觉组合（**2.5D 分割提升类别识别；Z 深度预测提升定位**），用梯度对齐进行探查。作者名单含 Jitendra Malik、Ranjay Krishna、Sewon Min 等（据 arXiv 页面）。

**Why it matters:** "生成教会理解"此前多以氛围传播；这是第一张分类学级的地图，标出迁移在哪里真实成立——而它自己的表述也很谨慎：收益是任务依赖的，不是无条件的背书。

[`🔗 arXiv:2609.38079`](https://arxiv.org/abs/2609.38079) · [`🔗 HF Papers`](https://huggingface.co/papers/2609.38079)

---

## 13. CVE-2026-86131：恶意 VPN 服务器可以 root 自己的 Firebox 客户端——WatchGuard 把边缘设备威胁模型倒转了

- **Velocity:** ▮ steady
- **Source:** WatchGuard PSIRT · CVSS 9.2 · ~1.5天前 (Sep 29 UTC)
- **Tags:** `cve` `vpn` `firewall` `firmware`

**控制远端 BOVPN-over-TLS 服务器**的攻击者可以在连接上来的 WatchGuard Firebox 上**以 root** 执行任意命令——代码注入（CWE-94，叠加证书验证与模块加载缺陷）。CVSS 9.2 Critical（CVSS v4.0），9 月 29 日发布时修复版本已就绪：Fireware OS **2026.3.2 / 2026.2.3 / 12.12.3**，T15/T35 为 12.5.21。WatchGuard 表示"未发现在野利用"。

**Why it matters:** 分支机构防火墙常常回连运维者并不控制的汇聚设备——因此一个恶意或失陷的 VPN 端点是机队级事件，不是单机事故。通常的边缘设备 CVE 假设客户端作恶；这一条假设服务端作恶，几乎没人按这个方向做补丁分诊。

[`🔗 WatchGuard PSIRT`](https://psirt.watchguard.com/CVE-2026-86131) · [`🔗 NVD`](https://nvd.nist.gov/vuln/detail/CVE-2026-86131)

---

## 14. Apache PLC4X：四个缺陷叠出来的 MITM——其中一个是"只接受无效签名"的校验

- **Velocity:** ▮ steady
- **Source:** Apache（oss-security） · CVSS 9.2 · ~1天前 (Sep 30 UTC)
- **Tags:** `cve` `ics` `opc-ua` `apache`

Apache PLC4J 的 OPC UA 驱动（CVSS 9.2，Apache CNA）允许网络位置攻击者冒充服务器并读取或伪造安全通道流量——包括凭据。因为四个缺陷叠加：0.9.0–0.11.0 中签名校验失败**只记日志**、服务器证书取自未认证的 GetEndpoints 响应；0.12.0–0.13.1 中签名校验**被写反**——有效签名被拒、无效签名被接受；所有版本默认 policy None、静默降级，且 0.13+ 偏好最弱端点。公告自己的警告："只检查其中一种机制的用户可能错误地认为自己不受影响。"0.9.0 起至 **1.0.0** 之前均受影响；修复即 1.0.0——校验签名、要求信任库、默认 Basic256Sha256。

**Why it matters:** 工控协议部署默认 OT 网络让 MITM 无从发生——而写反的校验恰恰是单一机制审计会放过的那类 bug，这正是公告要把这层意思说破的原因。

[`🔗 oss-security`](http://www.openwall.com/lists/oss-security/2026/09/30/4) · [`🔗 Apache 邮件列表`](https://lists.apache.org/thread.html/o076mcnsx6wnqpdy780m7s6hddbbnjfw)

---

## 15. Slug 的 GPU 文字渲染专利进入公有领域——SDF vs MSDF vs Slug 的技术指南随之而来

- **Velocity:** ▮ steady
- **Source:** AlphaPixel · HN 106+ 分 · ~6小时前 (~21:50 UTC+8)
- **Tags:** `graphics` `gpu` `patents` `typography`

一篇对比 GPU 文字渲染三种路线的深度文章——SDF 图集、多通道 SDF 图集，以及 Slug（Eric Lengyel，2017）：直接**在片元着色器里从轮廓渲染字形**，无需纹理图集、无需逐帧网格化。教程之下的新闻是：Lengyel 2019 年为该技术申请专利，并**"于 2026 年 3 月 17 日将该专利贡献给公有领域"**——这才使 AlphaPixel 得以发布 C++20 实现 Slughorn。HN 热评第一给出了标准更正：MSDF 图集不必静态烘焙，异步上传即可解决 CJK 场景。

**Why it matters:** 一项基础渲染技术进入公有领域是少到可以标注日期的事件，而这篇文章同时是"为什么文字始终抗拒每一种 GPU 友好表示"的现场指南。

[`🔗 alphapixeldev.com`](https://alphapixeldev.com/sdf-vs-msdf-vs-slug-vs-rive-gpu-text-rendering/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=49908962)

---

## 16. 求解 Factorio Quality：把回收终局形式化为线性规划

- **Velocity:** ▮ steady
- **Source:** exyr.org · HN 240+ 分 · ~18小时前 (~10:27 UTC+8)
- **Tags:** `optimization` `linear-programming` `games`

"我玩 Factorio 的方式很正常：写矩阵代码来规划工厂。"Factorio Space Age 的 Quality 机制——从 normal 到 legendary 五个等级，每升一级加 10% 概率，4 格机器上限 **24.8%**——把终局升级变成一个随机回收循环；这篇文章将其建模为线性规划，并附在线计算器。HN 讨论（91 条评论）贡献了可用的传奇品质单装配机方案。（本 feed 9 月 26 日报道过 Factorio 的 247 个可打印机器 STL——同一社区，另一种较真。）

**Why it matters:** "把游戏解掉"这一类型持续产出比多数教科书更好的运筹学教材——而这是本周最干净的样本：一个真实的随机过程，被建模、被求解、并被做成了工具。

[`🔗 exyr.org`](https://exyr.org/2026/solving-factorio-quality/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=49887343)

---

## 17. "提交说明是一种思考工具"——当代码代理替你写 commit body，真正失去的是什么

- **Velocity:** ▮ steady
- **Source:** yedhu.me · HN 81+ 分 · ~2.5小时前 (~01:18 UTC+8)
- **Tags:** `git` `ai-agents` `engineering-culture`

在有代理之前，作者花 5–10 分钟写 commit body，因为"写作过程本身帮助我反思代码"。现在代理代笔——文章点破了这背后的交易：**"当 AI 不知道'为什么'这一半时，它会自己编一套理由。我觉得这很危险。"**把完整上下文交给代理可以治编造，却治不了更深一层的损失：反思本身就是目的。HN 热评第一正是把这句当作全场要点引用的。

**Why it matters:** commit message 正在加入那份"写的过程本身承重"的工件清单——代码评审、复盘——把写作外包出去，在历史里的"为什么"变成模型的猜测之前，一直都是免费的。

[`🔗 yedhu.me`](https://yedhu.me/posts/commit-description-as-a-thinking-tool/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=49911757)

---

## 18. 续 9 月 24 日报道：Apache MINA SSHD 新增三个 CVSS 9.1 认证绕过——这次有已发布的修复版本

- **Velocity:** ▮ steady
- **Source:** Apache（oss-security） · 三个 CVSS 9.1 · ~1.5天前 (Sep 29 UTC)
- **Tags:** `cve` `ssh` `apache` `java`

上周本 feed 报道了 MINA 的 CVE-2026-94301——6 月的修复只提交到分支、从未进入发布。续集是三个全新的 **CVSS 9.1** 认证绕过，均为 Apache CNA 评分、9 月 29–30 日发布：两个在可选的 `sshd-ldap` 模块（`LdapPasswordAuthenticator` 缺失一处检查，外加 LDAP 注入），一个在 `sshd-core`（绕过"某种（推测罕见的）"实现 SSH 服务器的方式）。受影响：1.2.0–2.19.0 与 3.0.0-M1–M5。**修复于 2.20.0 或 3.0.0-M6——这次有真发布。**发现者：Dilrevx、Ho1aAs。

**Why it matters:** 上周 MINA 的故事是"补丁存在于你拿不到的地方"；这一周是带可下载修复的绕过批次。"纸面已修复"与"发布版已修复"之间的距离，正是本月 Apache 系列报道的全部运维教训。

[`🔗 oss-security`](http://www.openwall.com/lists/oss-security/2026/09/29/39) · [`🔗 Apache 邮件列表`](https://lists.apache.org/thread.html/cyrxkdzl3c70rrqs3klqphqz1hwm7p41)

---

## 19. "TLA+ 能检验什么、不能检验什么"——形式化方法热潮迎来它的反驳章节

- **Velocity:** ▮ steady
- **Source:** Hillel Wayne · HN 87+ 分 · ~6小时前 (~21:57 UTC+8)
- **Tags:** `tla-plus` `formal-methods` `ai-agents`

在本 feed 9 月 27 日报道"互联网发现了 TLA+"三天后，Hillel Wayne 的通讯给出了配重。这次的触发是新的："上周，Claude Code 之父 Boris Cherny 提到 Opus 能够用 TLA+ 找到竞态条件"——Wayne 的回应是"关于'TLA+ 会把 AI 从它自己手里救出来'的叙事，我们稍微冷静一点"。核心局限用 `[]P`/`P'`/`<>P` 走了一遍：**"要验证一个性质，你得先有那个性质"**——模型检验的是规约，而写下正确的规约仍然是人类那半边、未被解决的功课。

**Why it matters:** 代理+形式化方法这波热潮的有用版本不是"模型证明你的系统"——而是"模型写出你懒得起草的规约，然后拿着它去约束实现"。验证依然始于一个关于"什么才重要"的人类决定。

[`🔗 Computer Things`](https://buttondown.com/hillelwayne/archive/what-tla-can-and-cant-check/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=49909056)

---

## 20. NRC 颁发美国首张 BWRX-300 小型模块化反应堆建设许可——TVA，Clinch River

- **Velocity:** ▮ steady
- **Source:** GE Vernova Hitachi · HN 111+ 分 · ~21小时前 (~07:03 UTC+8)
- **Tags:** `nuclear` `smr` `energy` `regulation`

美国核管理委员会（NRC）向田纳西河流域管理局（TVA）颁发了在 **Oak Ridge 的 Clinch River** 建设 **BWRX-300** 的建设许可——这是 GE Vernova Hitachi 30 万千瓦小型模块化反应堆获得的首张美国建设许可，此前 2025 年 4 月已获加拿大 CNSC 许可。设计上承重的简化：无再循环泵——自然对流冷却。（9 月 29 日宣布。）

**Why it matters:** 数据中心的电力需求是本 feed 每日追踪的算力扩建故事的另一半，而"首堆"建设许可正是把 SMR 时间线从新闻稿变成浇筑混凝土的那种监管里程碑。

[`🔗 GE Vernova 新闻稿`](https://www.gevernova.com/news/press-releases/nrc-issues-first-us-construction-permit-bwrx-300-small-modular-reactor-tva-clinch-river) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=49902019)

---

## 21. "我本可以访问 17 万亿条微软记录"——一个 16 岁少年、一枚未验签的登录令牌和一台内部分析 API

- **Velocity:** ▮▮▮ trending
- **Source:** blog.faav.net · HN 264+ 分 · ~2天前 (Sep 29 04:32 UTC+8)
- **Tags:** `microsoft` `bug-bounty` `ai-agents` `authorization`

Faav——16 岁，一边上学一边全职挖洞——披露：微软数据集中约 **17.3 万亿条存储记录**本可以通过一台内部分析服务（"Titan"）访问到，原因是它**从不校验登录令牌的签名**：这个缺陷让他可以冒充管理员身份、在没有任何真实凭据的情况下提交未授权 SQL 查询。整条路径由 AI 端到端辅助完成：他的个人 AI 挖洞机器人 "Antares" 在 8 月 25 日发现了 Titan，人类在十天后的一个周五晚上收尾——写明 "VPN REQUIRED" 的锁定前端根本无关紧要，因为一份公开的 Swagger 文件列出了四条路由，而接受原生 SQL 的那条（`/v2/Query`）恰好是唯一**没有**标注需要 Azure AD bearer 认证的一条；56 个表定义则来自 Wayback Machine 里 Titan 2023 年 Superset 配置的存档快照。这篇博文对自身局限写得很清楚：影响是假设性的，只动过元数据和有界的样本行——而且值得注意的是，**"微软对本文拥有编辑权，在发布前删减了章节和图表、重塑了影响的描述方式。"**

**Why it matters:** 两件事在这里叠加。第一，这个失效类别——内部服务的认证按路由配置、其中一条路由发生了漂移——是可以被枚举的，而 17 万亿行就是微软语境下"内部"二字的规模。第二，披露文本本身经过了厂商编辑，所以我们在纸上看到的影响形状，是微软批准过的形状；这个注意事项写在原始来源里，也应当写进结论里。

[`🔗 blog.faav.net`](https://blog.faav.net/how-i-couldve-accessed-17-trillion-microsoft-records) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=49883970)

---

## 22. HowToLiveBetter：一本 649 条、按证据分级的中文人生指南以 32.3k★ 登顶本月新仓库——还附带一个会引用自身条目的 agent skill

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub · 32.3k★ · ~25分钟前推送 (~11:53 UTC+8)
- **Tags:** `chinese-oss` `evidence-grading` `agent-skill` `open-data`

《高性价比人生指南》（eternity4719/HowToLiveBetter，CC-BY-4.0，9 月 7 日创建）是本月新建仓库中 star 数最高的一个：**649 条建议**，覆盖长寿、急救、省钱、法律、就业、婚育与出国——每条写明花掉什么、换回什么、证据有多硬（**A 级 428 · B 级 171 · C 级 50**），并附 **1,531 条原始文献链接**，只引期刊论文与官方文件。它以可检索的 VitePress 站点加上 PDF/EPUB/离线 HTML 发行，而 2026 年的部分是：还附带一个 **Claude Code 与 Codex 的 agent skill**——问它"该不该替朋友担保签字"，它会先检索书中的条目再回答，并注明出自第几节第几条。配套的单页在线阅读版（cdyforever/how-to-live-better）又贡献了 5.9k★。

**Why it matters:** 这是 byoungd/up 一脉——把人生建议做成开源——但这次被工程化成了一个*检索语料库*：证据分级、引用密集、结构化到 agent 可以逐条引用的程度。RAG 应用用在文档上的那套模式，被搬到了个人决策上，而且是同时为两类读者写的。

[`🔗 eternity4719/HowToLiveBetter`](https://github.com/eternity4719/HowToLiveBetter) · [`🔗 在线检索版`](https://eternity4719.github.io/HowToLiveBetter/)

---

## 23. 续今晨报道：Gemini 4 Argon 迎来首份独立评估——Artificial Analysis 给出 53 分，223 个模型中排第 8

- **Velocity:** ▮▮▮ trending
- **Source:** Artificial Analysis · HN 92+ 分 · ~7.5小时前 (Oct 1 04:50 UTC+8)
- **Tags:** `google` `gemini` `benchmarks` `evaluation`

在 Google 发布约一天后——本 feed 今晨在头条报道时还写着"模型发布数小时、独立评估为零"——Artificial Analysis 公布了 **Gemini 4 Argon (High)** 的数据：**智能指数 53，在 223 个模型中排第 8**，远高于同类中位数 26，但没到榜首；定价核实无误（每百万 token $2/$10、缓存 95% 折扣、每任务 $1.99），上下文窗口如发布时所说是 1M。有意思的差值是冗长度：跑完智能指数要生成 **110M 输出 token**，而中位数是 82M——这个模型"出声思考"的量比典型水平多约 34%，而每任务成本已经反映了这一点。速度一栏标为 N/A；评估只覆盖推理变体。

**Why it matters:** Google 自选基准上的并列第一（DeepSWE 77.9%、CWE-bench 并列第一）与独立评测框架给出的第 8 名之间的差距，正是本 feed 给发布日数字打折扣的原因——而冗长度是 Argon 的定价页不会提的成本故事，因为它是测出来的，不是营销出来的。

[`🔗 Artificial Analysis`](https://artificialanalysis.ai/models/gemini-4-argon) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=49914236)

---

## 24. 续 9 月 30 日报道：America.gov 的 AI 聊天被发现在"玩 Minecraft"——美国政府的前门没有话题护栏

- **Velocity:** ▮▮ rising
- **Source:** HN · 112+ 分 · ~8.7小时前 (Oct 1 03:34 UTC+8)
- **Tags:** `government` `ai-agents` `guardrails`

本 feed 昨天（9 月 30 日）刚报道 America.gov 作为"面向美国政府的 AI 前门"上线，HN 就找到了它聊天端点的保留节目：让它 **"play Minecraft"**，它会表演游戏片尾诗的政府版——"它已经到达更高的层级了。它能读《联邦法规汇编》……它以为我们是一个聊天机器人。"很可爱，也很有诊断价值：一个面向公民的 agent 上线时，对域外请求没有任何可见的场景测试。（时效状态注：本次运行期间 `america.gov/chat` 对脚本客户端返回 403——这里的对话文本引自 HN 讨论串，这也是下面截图属于二手信息的原因。）

**Why it matters:** 与本 feed 报道过的每一个 agent 部署故事是同一课，只是这次发生在联邦层面：打破人设的那条 prompt 永远只差一次复制粘贴，而修复办法从来不是"模型自己知道分寸"——而是某个没人拍板的 harness 决策。

[`🔗 HN 讨论`](https://news.ycombinator.com/item?id=49913255) · [`🔗 america.gov/chat`](https://america.gov/chat)

---

## 25. CS240 的 AI 作弊风波迎来任课教师本人的复盘——政策明确、处理失当自己认、"几乎没承担后果"

- **Velocity:** ▮▮ rising
- **Source:** turkeyland.net · HN 102+ 分 · ~8.4小时前 (Oct 1 03:54 UTC+8)
- **Tags:** `education` `academic-integrity` `ai-policy`

2026 年春季 CS240（C 语言编程）AI 作弊风暴中心的教授，发表了学生们一直追问的完整叙述：课程大纲**明文禁止**在任何作业中使用 LLM——但他自己的处理"本可以做得更好，这也是为什么触犯这条明文政策的那些人最终**几乎没承担什么后果**"。他说写这篇文章是因为围绕该事件"显然还在持续的讨论"中充斥着错误信息。这是一份来自教师一侧的详细一手文档，包括政策原文与处理结果。

**Why it matters:** 政策从来不是难的部分——执行才是，而这是一份罕见的内部自白：有明文规则、有已知违规、制度性后果约等于零。这种不对称——而不是大纲的措辞——才是每一门禁用 agent 的课程真正身处其中的现实。

[`🔗 CS240 复盘`](https://turkeyland.net/thoughts/ai.php) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=49913458)

---

## 26. Halfspace：Matt Keeter 的距离场实体建模 IDE——"都 2026 年了，开篇先声明：这不是 vibe coded 的"

- **Velocity:** ▮▮ rising
- **Source:** mattkeeter.com · HN 88+ 分 · ~8.5小时前 (Oct 1 03:44 UTC+8)
- **Tags:** `cad` `graphics` `distance-fields` `webgpu`

Halfspace 是一个用**距离场**做实体建模的实验性 IDE——Keeter 自 2022 年起打造的 Fidget 内核的浏览器（WebGPU）展示应用：GUI 内的图像以"接近实时"的速度光栅化，模型可导出为图像或三角网格。它的开篇即论点：底层隐式曲面工作"有点像写汇编"，所以 Halfspace 在其上构建高层——而那句"都 2026 年了，开篇先声明：**这不是 vibe coded 的**。我从 2025 年 4 月开始做，用我的人脑写代码"作为出处声明正在发挥实际作用。

**Why it matters:** Keeter 的隐式建模系列文章是这个细分领域长期在更新的参考读物，这次的 demo 在浏览器标签页里真的能用。而那句免责声明本身就是文化标本：手工编写的出处声明，现在成了作品集项目必须挂牌公示的东西，跟许可证一样。

[`🔗 Halfspace`](https://www.mattkeeter.com/projects/halfspace/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=49913350)

---

## 27. 续 9 月 22 日报道：AGMAI 发布《AI 生成数学成果的负责任发布》——600+ 条社区反馈，并请求实验室停止这一做法

- **Velocity:** ▮▮ rising
- **Source:** agmai.org · HN 83+ 分 · ~26小时前 (Sep 30 10:36 UTC+8)
- **Tags:** `mathematics` `ai-policy` `publication-norms`

本 feed 9 月 22 日报道过数学与 AI 顾问组（AGMAI）经 Terry Tao 客串博文宣布成立；九天后它发布了第一份成果：**《AI 生成数学成果的负责任发布》**（9 月 29 日），基于 **600+ 条社区反馈**。全篇的骨架是这门学科最古老的规范在新局面下的重申——作者必须*理解*论证、验证它、并对它负责——外加一个令人不适的请求："当前，一些前沿 AI 实验室正在私有模型上测试高深的数学问题……**我们想从一开始就明确表态：我们不认可这种做法，我们请求他们停止。**"在没有人类理解即时跟上的情况下发布重大数学成果的实验室，必须对其负责。

**Why it matters:** 这是数学界在把本 feed 在基准报道中反复撞见的那道裂缝正式化——结果先于理解而存在——而且它亮出了厂商博文从不亮明的立场：受审视的不只是发布礼仪，测试行为本身就是问题。

[`🔗 agmai.org`](https://agmai.org/general-sep29/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=49903713)

---

## 28. Meta-Skills：冻结的 "Builder" 模型学会为另一个冻结的 "Target" 搭建 harness——AI-for-AI 成为可迁移技能

- **Velocity:** ▮▮ rising
- **Source:** arXiv / HF Papers · HF 每日榜首 (28 赞) · ~1天前 (Sep 30)
- **Tags:** `agents` `harness` `paper` `ai4ai`

UIUC 团队（Cheng Qian、Kunlun Zhu、Beibin Li、Zhenhailong Wang、Heng Ji）把 **test-time AI-for-AI** 形式化：在*两个*模型权重全部冻结的前提下，Builder 从 Target 在开发集上的执行反馈中学习 **Meta-Skills**——"规定何时需要支持、提供什么资源的原则"——然后用这份冻结的技能库为未见过的任务构建执行环境（harness）。在他们的 Harness-Bench 与 Newton Bench 上，全库 meta-skills 使宏平均成绩比无技能构建提高 **8.95 个百分点**，比把同一份技能库直接交给 Target 高出 **12.02 个百分点**——起作用的有一部分是包装本身，而不只是内容。

**Why it matters:** harness 工程——本 feed 报道密度最高的类别——正在从手工制品变成一种可学习、可迁移的层。注意事项在评测上：Harness-Bench 和 Newton Bench 都是作者自建，所以在别人的 agent 栈复现之前，这些增益只在其自身设定内成立。

[`🔗 arXiv:2609.38143`](https://arxiv.org/abs/2609.38143) · [`🔗 HF Papers`](https://huggingface.co/papers/2609.38143)

---

## 29. Gitea 28.0 去掉 "1." 前缀——审计日志、机器人账号，以及保密一周的安全修复

- **Velocity:** ▮▮ rising
- **Source:** Gitea 博客 · HN 70+ 分 · ~7.8小时前 (Oct 1 04:32 UTC+8)
- **Tags:** `gitea` `git` `self-hosted` `release`

Gitea v28.0.0 告别了沿用至今的 `1.` 前缀（是 28.0.0，不是 1.28.0），带来许久未见的大批次功能：**审计日志、机器人账号、HTTPS 部署令牌、管理员用户模拟、code-owner 批准规则、diff 文件过滤器、Actions 队列视图**。安全小节写着刻意的含糊："本版本包含安全修复。为给所有人留出升级时间，细节将在约一周后补充到本文。"升级者的破坏性变更：发布二进制不再包含 32 位 x86 与 `gogit` 构建，Snap 不再构建 armhf 版本，下载文件名去掉 OS 版本后缀。

**Why it matters:** 版本方案切换，是自托管 Git 生态宣告后 1.0 时代的方式——而"细节保密"的模式则是那个长期提醒：'最新版本'与'完整披露'是两种状态；如果你的 Gitea 暴露在公网上，按发布升级，别等披露。

[`🔗 Gitea 28.0.0 发布文`](https://blog.gitea.com/release-of-28.0.0/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=49913975)

---

## 30. PSSA：用 Rust 从零写成的"塑性"状态空间语言模型——逐 token 权重更新、无任何 ML 框架、自称生成快 ~12 倍

- **Velocity:** ▮ steady
- **Source:** GitHub / HN · 85+ 分 · ~2天前 (Sep 30 11:19 UTC+8)
- **Tags:** `state-space` `rust` `architecture` `from-scratch`

PSSA（"塑性状态空间架构"，Sparticle62ops/pssa）是一个非 Transformer 的小型语言模型：文本经一个循环状态空间层逐 token 读入，一块**情景记忆库**在前向传播中被写入和查询，部分权重**在模型运行时自我重写**。它完全没有用 ML 框架——线性代数是手写的，因为在自动微分框架里干这些"意味着每一步都在跟框架搏斗"，每个批处理 kernel 都对照标量参考路径校验到 ~3e-8。自称的测量结果：在相同参数、相同语料下，它比 Transformer 基线学得更快，在同一颗 CPU 上文本生成**快约 12 倍**。README 直白得令人愉快："这里的声明是架构本身。实现语言只是一个细节。"

**Why it matters:** 后 Transformer 探索在车库规模上依然活着，而"原位可塑性 + 推理期间写入的可寻址记忆"是有意思的组合——但这里的每个数字都出自一位开发者的测量，没有任何独立复现。

[`🔗 Sparticle62ops/pssa`](https://github.com/Sparticle62ops/pssa) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=49903993)

---

## 31. laya-mlx：Laya 的类型化决策模型迎来原生 MLX 运行时——Apple 芯片上 7–14 毫秒出决策，不依赖 PyTorch

- **Velocity:** ▮ steady
- **Source:** GitHub / PyPI · 6.7k★ · 9 月 19 日创建
- **Tags:** `mlx` `decision-models` `apple-silicon` `local-llm`

mizorewww/laya-mlx（PyPI v0.2.0）是 **Laya 类型化决策模型**的原生 MLX 运行时——Laya 正是本 feed 9 月 20 日头条报道的开源 "System 1" 家族——在 M3 Max 上 **7–14 毫秒**产出 choice/score/yes-no 决策，没有文本生成、没有 PyTorch、没有云 API。它是本月本 feed 持续追踪的本地决策模型基础设施浪潮的 Apple 芯片分支（9 月 21 日 Kev 的可自托管家族、9 月 26 日 Ollaya 的 Rust 守护进程、现在是 Laya-MLX），它重要的原因是算术：本地 10 毫秒出一次类型化决策，改变的是 agent 在每次按键之间"查得起"什么。

**Why it matters:** 决策模型的 serving 正在像 LLM serving 一样按平台分化——服务器端是 Rust 守护进程，Mac 上是 MLX——而每移除一层框架依赖，逐调用路由就从"优化项"变成"默认项"。注意事项：仓库自 9 月 22 日起没有新推送；运行时真实、已打包，但还年轻。

[`🔗 mizorewww/laya-mlx`](https://github.com/mizorewww/laya-mlx) · [`🔗 PyPI 上的 laya-mlx`](https://pypi.org/project/laya-mlx/)

---

## 32. codegraph：预索引、自动同步的代码知识图谱达到 72.6k★——以及一整天框架专属的启发式修复

- **Velocity:** ▮ steady
- **Source:** GitHub · 72.6k★ · v1.6.1（9 月 29 日），修复持续今天
- **Tags:** `code-intelligence` `rust` `coding-agents` `indexing`

colbymchenry/codegraph 自称"最快的完整代码图谱"：预索引的符号/知识图谱**随代码变更自动同步**，100% 本地，Rust 内核，以带 provenance 与构建证明徽章的 npm 包发行，可接入九种 agent（Claude Code、Codex、Gemini CLI、Cursor、OpenCode、Antigravity、Kiro、Copilot、Hermes）。v1.6.1 于 9 月 29 日发布，而今天的提交全是同一物种的修复——"中间件候选只能是声明，永远不会是 import"、组件名启发式仅限 `.astro`——都是按框架逐个收紧的名称模式规则。

**Why it matters:** agent 的上下文供给已经是独立的基础设施层，且竞争者众（DeusData 的 codebase-memory-mcp 44.3k★，9 月 23 日报道过；jevgrep 的语义检索，9 月 29 日），codegraph的差异点在自动同步加完全本地。而今天的提交日志是那条诚实的成本线：启发式代码索引是一条按框架逐个填坑的长尾。

[`🔗 colbymchenry/codegraph`](https://github.com/colbymchenry/codegraph) · [`🔗 文档`](https://colbymchenry.github.io/codegraph/)

---

## 33. 56k.rip：1996 年的完整拨号上网体验，装进一个浏览器标签页

- **Velocity:** ▮ steady
- **Source:** 56k.rip · HN 100+ 分 · ~6小时前 (Oct 1 06:08 UTC+8)
- **Tags:** `retro` `dialup` `web`

"完整的 1996 拨号上网体验：握手音、等待，还有有人拿起电话。请开声音。"把整套仪式——调制解调器协商音频、连接等待、被打断——复原成一个可交互页面的单页作品。HN 上六小时冲到 100 分还在涨。

**Why it matters:** 纯粹的怀旧工程，而这一题材经久不衰恰恰因为它是反 agent 的互联网：慢、需要身体在场、会被人类拿起电话打断——一种任何优化都改善不了的体验。

[`🔗 56k.rip`](https://56k.rip/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=49915126)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-10-01T12:17:00+08:00 |
| Items | 33 |
| Sources tracked | 34（Hacker News、GitHub Trending、GitHub、Google 博客、Artificial Analysis、blog.faav.net、turkeyland.net、mattkeeter.com、agmai.org、arXiv、Hugging Face、blog.gitea.com、56k.rip、america.gov、PyPI、eternity4719.github.io、colbymchenry.github.io、Cisco PSIRT、CISA KEV、NVD、DIVD CSIRT、edgcpp.org、python.org security-announce、Cloudflare 博客、Netlify、WatchGuard PSIRT、oss-security、Apache 邮件列表、alphapixeldev.com、exyr.org、yedhu.me、Computer Things/buttondown、GE Vernova、insufferable.dev） |
| Update schedule | 04:03, 12:03, 20:03 UTC+8（每日 3 次） |
| Ranking | Velocity 加权（时效 × 互动加速 × 来源权威度） |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[Previous day](2026-09-30.md) · [Raw .md](latest.md) · [Archive](../archive/index.md)
