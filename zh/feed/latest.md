---
date: 2026-11-10
updated: 2026-11-10T04:30:36Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 28
license: CC-BY-4.0
---

# trending.md — 2026-11-10

## 1. Claude Fable 5.2 与 Mythos 5.2 以更低价格发布——但那张基准表并不是一边倒

- **Velocity:** ▮▮▮ trending
- **Source:** Anthropic · HN 504 分 · 11 月 10 日（~02:56 UTC+8）
- **Tags:** `anthropic` `model-release` `benchmarks`

Anthropic 于 11 月 9 日发布 **Claude Fable 5.2 与 Claude Mythos 5.2**——"the same underlying model"，用安全机制区分：Fable 带网络安全与生物领域过滤，面向所有用户；Mythos 则通过 Cyber 与 Life Sciences 验证计划开放。输出比 5.1 "up to 30% faster"，定价为**每百万输入 token 8 美元、输出 40 美元**；可选 fast mode 让生成"up to 2.5 times"更快，价格 16/80 美元。在 **FrontierCode 2.0** 上，该模型在 Xhigh 档拿到 **49.1%**，博文称这是"the highest score of any released model we've tested"；High 档为 **45.3%**，对比 Opus 5.5 的 **45.5%**，"for roughly half the cost per task"。但同一张表也有反向的行：**AutomationBench 51.4** 对 Gemini 4 Carbon 的 **53.9**，以及 **AA-Briefcase 1785 Elo** 对 **Opus 5.5 的 1800**——而那正是 Anthropic 仍建议作为起点的模型。

**Why it matters:** 先读脚注，再读标题数字。脚注 3 说明网络与生物相关结果是在 **Mythos 5.2** 上跑的，理由是"testing the model with reduced safeguards provides the most comprehensive look at model behavior"——所以 CyScenarioBench 76.3 与 CVE-rediscovery 89.6 这两行不是 Fable 的数字。脚注 4 更直白："None of the external organizations reviewed the contents of this blog post or the contents of the System Card. Those organizations do not necessarily agree with any of the claims made in either publication." 页面上 Vercel、Shopify、Uber、Oracle 的引语是热情，不是背书；而 Computer-use 那一行标注着"OSWorld 2.1 (offline set, partial)"。

> "Over 90% of the changes merged into Anthropic's core codebase are now written by Claude (with human guidance)."

[`🔗 Claude Fable 5.2 and Mythos 5.2`](https://www.anthropic.com/claude-fable-and-mythos-5-2) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50429906)

---

## 2. Meta 的 Muse Ember 以三分之一成本追平 Haiku 5.5 的智能指数——代价是 64% 的问题拒答

- **Velocity:** ▮▮▮ trending
- **Source:** Artificial Analysis · HN 118 分 · 11 月 10 日（~01:58 UTC+8）
- **Tags:** `meta` `small-models` `benchmarks`

Meta Superintelligence Labs 发布其最轻量模型 **Muse Ember**，定价为**每百万输入 token 0.10 美元、缓存输入 0.004 美元、输出 0.50 美元**。Artificial Analysis 测得它在 **Intelligence Index 上为 36，每个任务成本 0.14 美元**——与 **Claude Haiku 5.5 (max) 的 0.41 美元**同分——比 Meta 自家的 **Muse Wonder（44 分，每任务 6.95 美元）**低 8 分。赢的地方具体但狭窄：**AutomationBench-AA 68.1%**，与 Muse Wonder 持平；**Terminal-Bench 4.0 40.9%** 对 Haiku 的 32.8%；以及**在 Meta 自家 Muse Code 里的 Coding Agent Index 得 46**，对比 Haiku 在 Claude Code 里的 37。输的地方同样具体：**FrontierCode 2.0 27.2% 对 34.9%**，以及 **AA-Briefcase 1521 对 1574 Elo**。

**Why it matters:** 解释这个价格的数字不是分数，而是 **AA-Omniscience 准确率 21.1%**——对比集中最低——原因是 Ember "declines to answer 64% of questions"，这把它的幻觉率压在 **17.4%**，只有 Haiku 5.5 的一半。一个会弃答的廉价路由器，与一个会瞎猜的廉价模型是两种产品；拒答率才是让路由叙事（"Muse Wonder plans, Muse Ember handles the volume"）成立的东西，而不只是一张价格图。

[`🔗 Artificial Analysis 的测量`](https://artificialanalysis.ai/articles/meta-s-muse-ember-is-the-cheapest-model-scoring-36-on-the-intelligence-index) · [`🔗 TechCrunch：Meta 发布 Muse Ember`](https://techcrunch.com/2026/11/09/meta-releases-muse-ember-a-new-lightweight-model-for-agent-execution/)

---

## 3. e-means 替换了 FAISS 里的 Lloyd 算法——迭代次数只要十分之一，最终损失还更低

- **Velocity:** ▮▮▮ trending
- **Source:** Meta FAIR · 项目页 + arXiv 2611.09501 · 11 月 9 日
- **Tags:** `research` `clustering` `faiss`

Meta FAIR 开源了 **e-means**，一个 Lloyd 算法的替代品，已进入 **`contrib/e_means`**，并附带论文与浏览器内 playground。其主张少见，因为速度与质量通常互相交换："Across a large range of scales and datasets, e-means reaches a test loss below Lloyd's at 25 epochs, in 1.2 to 3 epochs"——作者端到端测得，相对 Flash-KMeans **GPU 上 10–45 倍墙钟加速**，相对 FAISS **CPU 上 8–15 倍**。作者为 Bessa、Mazaré、Szilvasy、Touvron、Picard、Douze 与 Jégou——后三位正是写下它所击败的 FAISS 基线的人。

**Why it matters:** k-means 是向量索引、量化码本与基于聚类的检索过滤之下的承重原语，迭代次数减少 10 倍会同时触及这三者，且不需要新数据结构。诚实的保留是：比较用的是作者自己的测试框架、对手是自己团队实现的当前最优；对冲的是代码进了 FAISS 本身，所以基线可复现，而不是只在论文里断言。

[`🔗 e-means 项目页`](https://e-means.github.io/) · [`🔗 arXiv 2611.09501`](https://arxiv.org/abs/2611.09501)

---

## 4. Sherlock 登上 GitHub 趋势第一——而这个仓库自 11 月 1 日后没再提交代码

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub Trending · 今日 +4,294 星 · 11 月 10 日（~04:06 UTC+8）
- **Tags:** `osint` `python` `github-trending`

**sherlock-project/sherlock**——那个用用户名在社交网络上逐个探测的 MIT 许可 Python 工具——以 **+4,294 星**登顶日榜，累计 **106,745 星、12,366 fork**。星数没有告诉你的是：背后没有任何仓库事件。最后一次提交是 **11 月 1 日**（"update banner layout"），最后一次发布是 **9 月 8 日的 v0.16.2**，仓库未归档，也没有新公告。这条星曲线也不是单日现象——这一周里它每天都在增加数千星——而代码库的 CLI 一年来几乎没动。

**Why it matters:** 这是趋势故事诚实的那一版：一个八年的 OSINT 工具、106k 星，纯靠注意力上行。仓库里唯一真正新的产物是一处 banner 布局，所以把速度理解为对*问题*的兴趣（查清自己有哪些身份暴露在某个用户名下），而不是对工具的信心——400 个未关闭的 issue 与 PR 正是误报报告所在的地方，而这一周没有一个被修。

[`🔗 sherlock-project/sherlock`](https://github.com/sherlock-project/sherlock) · [`🔗 GitHub 趋势（日榜）`](https://github.com/trending?since=daily)

---

## 5. T3 Code 登上周榜第一：一个"agent harness control surface"现在驱动七种 CLI

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub Trending · 本周 +15,379 星 · 11 月 10 日（~04:06 UTC+8）
- **Tags:** `agent-infra` `coding-agents` `electron`

**pingdotgg/t3code** 以 **+15,379 星**登顶周榜，仓库自 **2026 年 2 月 8 日**创建以来累计 **53,850 星**。它自称"agent harness control surface"：你安装并已认证的那些 CLI——**Codex、Claude Code、Cursor、Grok Build、OpenCode、Google Antigravity 与 fx**——由 T3 Code 从 iOS、Android、Web 或 Electron 桌面壳里统一驱动。仓库是 MIT，README 直说商业模式（"Nothing. We built T3 Code because we wanted the best possible development experience with agents"）。发布以 nightly 标签进行且非常频繁：**`v0.1.8-nightly.20261109.4429`** 于 11 月 9 日 18:58 UTC 落地，是当天的第三个 nightly。

**Why it matters:** 值得关注的转变是架构性的，不是审美性的。harness 层正在与模型厂商分离——一个界面控制七种互相竞争的 agent CLI，意味着你选择的是订阅而不是 harness，而 README 的安装矩阵（七套不同的 CLI 登录流程）就是这种可移植性的真实成本。警号在计数器里：一个九个月大的仓库有 **5,976 个未关闭 issue 与 PR**。

[`🔗 pingdotgg/t3code`](https://github.com/pingdotgg/t3code) · [`🔗 t3.codes`](https://t3.codes)

---

## 6. CISA 的 KEV 一次加了三条——而 FreeSWITCH 的 9.8 在被打分之前就已被利用

- **Velocity:** ▮▮▮ trending
- **Source:** CISA KEV · 目录 2026.11.09 · 11 月 10 日（~03:48 UTC+8）
- **Tags:** `security` `cve` `kev`

CISA 目录推进到 **2026.11.09（1,772 条）**，同一天新增三条：**FreeSWITCH CVE-2026-116779（9.8）**、**OpenSSH CVE-2026-123158（8.1）**、**GPUStack CVE-2026-102895（9.8）**。FreeSWITCH 那条最机械：`sofia_presence_handle_sip_i_message()` "split the To user of an inbound SIP MESSAGE on a plus sign and treated the left side as a chat protocol selector"——选到 `api` 就进入了 `switch_api_execute()`，于是其 MESSAGE 被接受的对端就能执行 FreeSWITCH API 命令，"including operating-system command sinks, with the daemon's privileges"。缺省内外部 profile 都开启了入站 chat，且"exploitation has been observed in the wild"。修复版本 **1.11.3**。

**Why it matters:** 注意注册表*没有*说什么。三条记录都是 `Analyzed`，且**没有任何 `nvd@nist.gov` 指标**——分数属于 GitHub 的 CNA（FreeSWITCH、GPUStack，3.1 `Secondary`）与 MITRE 的（OpenSSH），所以扫描器引用的"NVD 9.8"其实是 CNA 的数字，NVD 只是背书，没有发布自己的分数。OpenSSH 那条正是本 feed 在 **2026-11-05** 覆盖过的 musl 无 PAM 密码绕过（任意 256–1024 字符的密码都能通过，10.6p2 修复）——修复早已发布，KEV 是"它确实被用过"的第一次确认。GPUStack 的公告在 **2026-11-05** 就声称野外利用；KEV 是佐证，不是新事实。

[`🔗 CISA 已知被利用漏洞目录`](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) · [`🔗 GHSA-mg63-h38w-8p9p（FreeSWITCH）`](https://github.com/signalwire/freeswitch/security/advisories/GHSA-mg63-h38w-8p9p)

---

## 7. FFmpeg 62 分钟内收到 121 条 CVE 记录——其中 114 条说最新版本仍然受影响

- **Velocity:** ▮▮▮ trending
- **Source:** NVD · 11 月 9 日发布 121 条记录
- **Tags:** `security` `cve` `ffmpeg`

VulnCheck 在 **2026-11-09** 发布了 **121 条 FFmpeg CVE 记录**——第一条 19:16:48Z，最后一条 20:18:13Z——全部仍处于 `Received` 状态，NVD 未做分析。这批几乎都是编解码器与滤镜树里的内存安全问题——`huffyuvenc`、`dvbsubenc` 与 `gif.c` 的堆溢出，VVC 与 Vulkan AV1 路径的越界写，十多个解码器的未初始化内存泄露——外加一长串 NULL 解引用。分数在两个框架上都来自 VulnCheck：其 **3.1 指标最高 7.8**、**4.0 指标最高 8.5**，且有九条记录同时落在两个最大值上（其中一条是 `CVE-2026-125250`，GIF 编码器 `shrunk_buf` 尺寸计算错误）。分布比最大值更重要：**121 条描述里有 114 条写着 "through 9.0.2"**，也就是 FFmpeg 的最新 tag（`n9.0.2`），只有 **7** 条给出了修复边界（"before 8.1.3 and 9.x before 9.0.2"）。

**Why it matters:** 当一批 121 条记录里绝大多数条目描述的都是最新 tag 中仍然存在的缺陷时，这是一次**未命名修复版本**的披露，而不是补丁公告——而 4.0 与 3.1 的差值（同一 CNA、同一族向量，3.1 上 7.8、4.0 上 8.5）是打分口径，不是分歧。这里全部是 `Received`，所以"NVD 说"目前还不存在；引用 VulnCheck，并说明这一点。

[`🔗 CVE-2026-125250（NVD）`](https://nvd.nist.gov/vuln/detail/CVE-2026-125250) · [`🔗 FFmpeg tags`](https://github.com/FFmpeg/FFmpeg/tags)

---

## 8. SuperTokens 的 9.9：一个应用的 API key 可以改写父租户——顺带改写所有兄弟应用

- **Velocity:** ▮▮ rising
- **Source:** NVD · CVE-2026-123800 · 11 月 10 日（~03:16 UTC+8）
- **Tags:** `security` `cve` `authentication`

**CVE-2026-123800（9.9，CVSS 3.1，GitHub CNA 打分，记录状态 `Received`）** 是开源认证服务器 **SuperTokens Core** 的多租户授权缺陷。`Multitenancy.checkPermissionsForCreateOrUpdate` "does not adequately authorize updates to a parent connection URI domain or the base tenant"：在某个非默认 connection URI 域下托管多个应用的商业授权部署里，持有**某一个**应用有效 API key 的攻击者可以改写父域，因为目标分支"checks the domain without requiring the source application and tenant to be public"。由于 `api_keys` 未受保护，链条继续延伸——替换父 key，再替换兄弟 key，读取或修改兄弟用户，以他们身份取得会话，通过兄弟 dashboard 用户建立持久化，并让兄弟应用自己的 key 被锁死。

**Why it matters:** 修复清单才是这个故事真正的形状：跨七个大版本共 **18 个补丁版本**（6.0.24、7.0.23、8.0.7、9.0.6 …… 12.3.1），因为这段代码自 6.0.0 起就被一路带下来。前提条件也很精确——*商业授权*的多租户部署、多个应用共用同一个非默认 connection URI 域——所以自建单租户安装不在受影响集合内。记录尚未分析，9.9 是 CNA 的数字。

[`🔗 CVE-2026-123800（NVD）`](https://nvd.nist.gov/vuln/detail/CVE-2026-123800) · [`🔗 修复提交 13c3de17`](https://github.com/supertokens/supertokens-core/commit/13c3de170dd40dd217db0f6bd2bded0948476a42)

---

## 9. Redpanda Connect 的管理 API 默认挂在 `0.0.0.0:4195` 且无认证——所以一个 POST 就是 RCE

- **Velocity:** ▮▮ rising
- **Source:** NVD · CVE-2026-123270 · 11 月 10 日（~02:17 UTC+8）
- **Tags:** `security` `cve` `rce`

**CVE-2026-123270（9.8）** 覆盖 **Redpanda Connect 4.39 至 4.110**：在 streams 模式下"the management HTTP API is exposed on `0.0.0.0:4195`, but authentication is disabled by default and there is no authentication gate protecting the stream CRUD routes"。能访问该端口的未认证攻击者可以向 `/streams/{id}` `POST` 一份流水线定义，其中包含可执行代码的 processor——`command`、`subprocess`、`ffi`，或不安全的 `sql_raw`——并且"because pipelines can also return command output in-band via HTTP, this vulnerability enables full host compromise, credential theft, and data exfiltration with no user interaction or credentials required"。**v4.111** 把该 API 改为默认关闭，但记录指出：若手动启用管理 API，RCE "remains achievable on v4.111 and later"。

**Why it matters:** 这个分数是 **CISA-ADP 的**，不是 Redpanda 的、也不是 NVD 的——记录为 `Received`，唯一指标是 `134c704f-…`（Vulnrichment）的 9.8，`CWE-306`。参考列表更少见：只有一条链接，研究者自己的复现仓库（`pagvac/redpanda-connect-unauth-rce`），记录里既没有厂商公告也没有提交——所以上面的段落是 CNA 描述的叙述，而修复边界（"4.111，改为显式启用"）是唯一被发布的补救表述。

[`🔗 CVE-2026-123270（NVD）`](https://nvd.nist.gov/vuln/detail/CVE-2026-123270) · [`🔗 复现仓库`](https://github.com/pagvac/redpanda-connect-unauth-rce)

---

## 10. Airflow 的 8.8 是一次不完整的修复：升级到 3.3.1 并不能关掉它

- **Velocity:** ▮▮ rising
- **Source:** NVD · CVE-2026-111421 · 11 月 9 日（~18:17 UTC+8）
- **Tags:** `security` `cve` `airflow`

**CVE-2026-111421（8.8，CISA-ADP）** 是一个 Apache 以为已经修好的缺陷的另一半。Airflow 的 Task Execution API"stored XCom values written by a task without the reserved-key check applied elsewhere"，于是 Dag 作者的任务可以写入一个 XCom，"when a user later viewed it through the API with deserialization enabled, made the API server instantiate classes from the `airflow.*` namespace with arguments the Dag author chose"。记录明确说明谁仍然暴露："This is an incomplete fix for CVE-2026-59242: users who applied that fix in **apache-airflow 3.3.1** remain affected through this route and should upgrade to **apache-airflow 3.4.0** or later."

**Why it matters:** 反序列化本来就在那些认真对待第一份公告的部署里开着，所以仍在风险中的群体，正是打过补丁的群体——每一次"不完整修复"都会产生这种分布形状。记录里的 CWE 是 `CWE-502`，而缓解措施是乏味的那一种：在 3.4.0 部署之前，把 API server 的反序列化关掉。

[`🔗 CVE-2026-111421（NVD）`](https://nvd.nist.gov/vuln/detail/CVE-2026-111421) · [`🔗 Apache 邮件列表线程`](https://lists.apache.org/thread.html/pwdwx354tv0x3m8wzfhh59r6wyztj2lk)

---

## 11. otterdog 在密钥未设置时跳过 HMAC 校验——那正是默认值——然后 `eval()` 这个 webhook body

- **Velocity:** ▮▮ rising
- **Source:** NVD · CVE-2026-123870 · 11 月 9 日（~17:16 UTC+8）
- **Tags:** `security` `cve` `supply-chain`

**CVE-2026-123870（CVSS 4.0 上的 9.5，Eclipse CNA 打分）** 落在 **otterdog**——Eclipse 基金会用代码管理 GitHub 组织的工具。 "The otterdog webapp evaluates a format-string built from the incoming GitHub webhook JSON body using Python's `eval()`. When the `GITHUB_WEBHOOK_SECRET` configuration value is unset or empty（**the code default is `None`**）, the HMAC signature check is skipped entirely, allowing an unauthenticated network client to reach the `eval()` sink with attacker-controlled input and execute arbitrary Python on the webapp host." 已在 **`bbc9e3ce`** 修复。

**Why it matters:** 两个默认值合起来构成了这个漏洞：一个未配置时*失效开放*的认证控制，挡在针对请求数据的 `eval()` 前面。任意一个单独出现都值得修；合在一起，每个从没设过这个环境变量的部署都是远程代码执行。这也是一条只有 CVSS 4.0 的记录——9.5 是 Eclipse 在 4.0 框架上的数字，且记录为 `Received`，所以目前没有 NVD 或 3.1 分数可以对照。

[`🔗 CVE-2026-123870（NVD）`](https://nvd.nist.gov/vuln/detail/CVE-2026-123870) · [`🔗 GHSA-32xf-7j44-xq72`](https://github.com/eclipse-csi/otterdog/security/advisories/GHSA-32xf-7j44-xq72)

---

## 12. Zebkit 把 Chromium 的内容层链进你的应用——比 Electron 小 34%，并且诚实说明自己输在哪

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 99 分 · 11 月 9 日（~22:34 UTC+8）
- **Tags:** `browsers` `electron` `rust`

**ikey4u/zebkit**（LGPL-2.1，v0.2.0，**135 星**，10 月 10 日创建）把 Blink、带全部 JIT 档位的 V8、PDFium 与 FFmpeg 做成"one library you link into your own application"——没有 Chrome 界面、没有 Node 运行时、没有 Electron 打包。它跑在应用自己的事件循环里（`zebkit_init()`、`zebkit_pump()`），画到你交给它的窗口：X11 窗口、`NSView` 或 `HWND`，并提供 C、Rust、Python、Go、JavaScript 绑定。对 **Electron 45.2.1** 公布的基准测试——同一套 harness、同一批页面、5–11 次取中位数、Linux x86-64、日期 2026-11-06/07——读数是**发布体积 171.2 / 59.4 MiB** 对 260.5 / 87.1，**冷启动 2.3 秒** 对 6.6 秒，**空白页内存 179 MB** 对 250 MB，DOM 与 JS 负载则**持平**。

**Why it matters:** 表格最后几行才是它值得读的原因。每页进程数：**zebkit 7，Electron 6**——因为 zebkit 把存储沙箱单独放进一个进程，"as Chrome"。而 README 还写了一段这个体裁通常会省略的话："**Where Electron is ahead**: one process fewer a page, and memory on two of the ten sites, YouTube and The Verge, where advertising and video decide." 一个 135 星项目的自测是主张，不是对你工作负载的测量——但一个会写明自己输在哪里的主张，值得重跑一遍。

[`🔗 ikey4u/zebkit`](https://github.com/ikey4u/zebkit) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50426207)

---

## 13. 当指令文件过期，agent 就走那条死路——三个真实仓库上的 732 条轨迹

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2611.09802 · 11 月 9 日列榜
- **Tags:** `research` `coding-agents` `documentation`

**《When Instruction Files Go Stale: Documentation Debt and Hidden Cost in Coding Agents》** 研究的是每个有 `CLAUDE.md` 的仓库都会遇到的事：指令文件"read in every agent session"，却"can fall behind the code and become stale (e.g., a test folder moves, but the file still points to the old one)"。实验是受控的——来自活跃开源仓库的三条真实过期指令，各自代表不同类别的指引（**一条测试命令、一个代码位置、一套新增组件的流程**）——agent 在每条指令的三种版本下完成 **22 个维护任务**：保持过期、修正为当前路径、以及删除。代码与任务保持不变，共分析 **732 条轨迹**。

**Why it matters:** 作者的立论就是结论："Evaluations that check only task success can miss this cost, and the stale file can persist." 过期指令是文档债，其利息由之后每一个会话支付——所以自然的实验不是 agent 有没有做完，而是它一路上做了什么、以及是否恢复。任何见过 agent 跑 2024 年那条测试命令的团队都认得这一类问题；这项研究固定代码、只移动文字，这才让那笔成本变得可测。

[`🔗 arXiv 2611.09802`](https://arxiv.org/abs/2611.09802) · [`🔗 全文（HTML）`](https://arxiv.org/html/2611.09802v1)

---

## 14. MemoryDojo：每一种被测记忆架构都可被投毒，而伤害程度取决于架构

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2611.09721 · 11 月 9 日列榜
- **Tags:** `research` `agent-memory` `security`

**MemoryDojo** 是一个追踪被投毒记忆生命周期的基准测试。前提是："malicious instructions encountered in one session may be stored and propagated through memory before being retrieved and acted upon in later sessions"，以及"because memory systems differ in how they process and retrieve information, the downstream effects of poisoning can vary significantly across systems"。产物是覆盖四个领域的 **155 条多会话长程轨迹**，在 **5 种不同记忆系统**上运行，追踪投毒在何处写入、何时被检索、以及 agent 随后做了什么。结论冷静且不讨好：**"all memory systems are susceptible to memory poisoning, with substantial variation in downstream effects."**

**Why it matters:** 这个基准还附带一个攻击优化过程——"a memory-aware poison optimization process that increases the poisoning efficacy, highlighting differences between memory architectures"——于是架构间的差异从趣闻变成了攻击面。对任何正在交付记忆层的人（本 feed 上周覆盖了四种互不兼容的记忆格式），存储与你形状不同这件事现在有了可测量的代价。

[`🔗 arXiv 2611.09721`](https://arxiv.org/abs/2611.09721) · [`🔗 全文（HTML）`](https://arxiv.org/html/2611.09721v1)

---

## 15. 同一块 H100 是每小时 2.69 或 12.29 美元——而账单写明了这 4.57 倍不是什么

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 147 分 · 11 月 9 日（~23:39 UTC+8）
- **Tags:** `gpu` `pricing` `infrastructure`

**`datareceipts/data-receipts`** 发布的是价格对比背后的算术，而不是对比本身：H100 SXM 80GB 按需价格，归一化为每 GPU 每小时，并按 730 小时折月。**RunPod Community 2.69 美元**（每月 1,964）、RunPod Secure 3.99、**AWS `p5.48xlarge` 6.88**（5,022）、**Azure `ND96isr_H100_v5` 12.29**（8,972）——"4.57× between cheapest and dearest, for the same chip." 这项研究也拒绝那张显而易见的图："An H100 is three different products. The SXM 80GB, the PCIe 80GB and the NVL 94GB all get marketed as H100s and they do not cost the same"，所以所有比较都留在同一个（型号、显存）分组内，且每家厂商都按其拿到该 GPU 的*最便宜*路径计价。

**Why it matters:** 仓库里"**What the 4.57× is not**"那一节才让这个数字可用：Azure 的 ND SKU 带"400 Gbps per GPU of Quantum-2 InfiniBand with GPU Direct RDMA"，这正是多机训练比单机微调贵的原因——"if you are fine-tuning on one node, you are paying for an interconnect you will never use." 声明的限制同样具体：只算按需目录价（spot"would narrow the gap a lot"）、各一个区域，以及"**Availability is not priced. A cheap H100 you cannot get is not a price.**"

[`🔗 data-receipts/109-gpu-pricing`](https://github.com/datareceipts/data-receipts/tree/main/109-gpu-pricing) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50427085)

---

## 16. malloc 到底在做什么：1,000 次分配、2 个系统调用、132 KiB

- **Velocity:** ▮▮ rising
- **Source:** benmandrew.com · 180 分 · 11 月 9 日（~19:31 UTC+8）
- **Tags:** `systems` `memory` `glibc`

一篇有测量的讲解，讲的是 `malloc` 的接口与内核实际看到的东西之间的缺口。第一个实验用 `strace` 跟踪 **1,000 次 `malloc(16)`** 的循环，发现总共**只有两次 `brk` 系统调用**——一次查询 program break，一次把堆扩展 **132 KiB**，都发生在第一次调用里；"the other 999 just take from that already allocated memory"。它给被摊销的东西标了价："**575 ns for an empty one**, as measured below"，然后在 `sbrk` 上写了一个 bump allocator，打印进程各区域的一个地址，并指出那次运行里 break 与 `printf` 相距 **23.4 TiB**——"about 1,530 times the machine's 15.6 GiB of RAM. Nearly all of that range is unmapped, so it costs no physical memory."

**Why it matters:** 这是多数性能推理会跳过的那一层——系统调用与用户态的边界，以及把它藏起来的记账。这篇文章也是"测量优于回忆"的示范：132 KiB、两次 `brk`、地址布局都是输出而不是断言，而且每一条都能用它打印的代码片段复现。

[`🔗 What is malloc doing, anyway?`](https://benmandrew.com/articles/what-is-malloc-doing-anyway) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50424157)

---

## 17. Raspberry Pi 5 16GB 涨到 385 美元——自 4 月以来跳了 80 美元，而它发布价是 120 美元

- **Velocity:** ▮▮ rising
- **Source:** CNX Software · 183 分 · 11 月 10 日（~01:42 UTC+8）
- **Tags:** `hardware` `raspberry-pi` `pricing`

Raspberry Pi 再次涨价，这次集中在 16GB 型号：**Raspberry Pi 5 16GB 现在售价 385 美元**，"an $80 increase compared to the last price hike in April"，而 **CM5** 系统模块涨 **40 美元**，"starting at $375 for the Lite model without wireless"。文章里唯一的好消息是维持不变："the Raspberry Pi 500+ mechanical keyboard PC stays at the same price, starting at $410"。CNX 自己对这种不对称的解读是：那款键盘机型"already richly priced and the demand must be lower than for single board computers and compute modules"。

**Why it matters:** 曾经锚定低成本常开计算的那块板，现在的定价像一台小型服务器，而这次涨价是内存成本的传导，不是 Raspberry Pi 的毛利决策——正是本周把"闲置内存"玩笑变成一种体裁的同一股 DRAM 压力。对任何在盘算 homelab、CI runner 集群或边缘部署的人：16GB 这一档已经从"买几块"变成"买一块并测量"，而 CM5 一并移动。

[`🔗 CNX Software：Raspberry Pi 5 16GB 现价 385 美元`](https://www.cnx-software.com/2026/11/03/when-will-this-stop-the-raspberry-pi-5-16gb-sbc-now-sells-for-385/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50428801)

---

## 18. Flide 是决策模型缺的那层服务栈——比 vLLM 与 SGLang 最高快 9.5 倍，支持精确状态分叉

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 109 分 · 11 月 9 日（~12:43 UTC+8）
- **Tags:** `inference` `decision-models` `serving`

**`OmniJev/Flide`**（Apache 2.0，**258 星**）是"决策模型"家族的推理引擎——那种单次前向、不生成 token 的模型，本 feed 在 **2026-11-07** 覆盖过——它的立论是这类模型需要与生成式 LLM 不同的服务机制："**With exact state forking it is up to 9.5 times faster than vLLM and SGLang, and every answer is the one the model gives the question alone**"——一个状态被分叉成三个问题，每个都在一次前向里作答。项目在 11 月 2 日公布方法论文（**arXiv 2610.42148**，"Accelerating Decision Inference with Exact State Forking"），并附带 `flide verify` 命令："checks exact forking on your own model and requests"。**PyPI `flide` 0.1.10** 于 **2026-11-09T06:57Z** 上传，同一天 README 记录了两个版本：0.1.9 增加 **`pplx-decider-v1.1-27b` 与 `JEV-35B`**，0.1.10 增加 **Ainvest-Decision-27b、Darwin-27B-RSI-Decision 与 KnowLine-31B-Gen1.5**，最后一个现在能读图。

**Why it matters:** 模型清单才是故事。Perplexity、Cloudflare（`Clef`）、Juspay、AutoTrust 等十几家现在发布的"decision"检查点不是聊天模型，而整个家族此前是用为 token 生成而建的引擎在服务。相对 vLLM 最高 9.5 倍是项目在自家工作负载上的自测——那个 "up to" 是有实际作用的——但真正决定这 9.5 倍是公平比较还是一次不同计算的，是那个测分叉精确性、而不是测速度的 `verify` 命令。

[`🔗 OmniJev/Flide`](https://github.com/OmniJev/Flide) · [`🔗 PyPI：flide 0.1.10`](https://pypi.org/project/flide/)

---

## 19. PackageKit 本地的 8.5：一次"模拟操作"里的路径穿越，变成 root

- **Velocity:** ▮ steady
- **Source:** NVD · CVE-2026-104620 · 11 月 9 日（~23:17 UTC+8）
- **Tags:** `security` `cve` `linux`

**CVE-2026-104620（CVSS 4.0 上的 8.5，SUSE 打分）** 是一条很短、影响面却很大的记录："A path traversal attack in simulation of actions in the **Zypp backend of PackageKit** before **1.4.1** could be used by local attackers to gain root privileges." PackageKit 是多数桌面发行版图形化装包背后的 D-Bus 服务，按设计以 root 运行——所以缺陷出在*模拟*路径上恰恰要紧，因为模拟正是应用在请求授权前发起的非特权调用。

**Why it matters:** 记录只有一条参考——一个 **SUSE Bugzilla 条目**——没有 CVE 衍生的公告文本、没有上游提交、也没有修复版本链接，所以受影响版本的细节在厂商自己的勘误里。这也是一条只有 4.0 分数、由 Linux 发行商提交、且仍为 `Received` 的记录：一套部署极广的桌面软件栈有一个本地 root 缺陷，而它的完整披露在注册表之外——这正是本 feed 在发行商提交的记录里反复见到的形状。

[`🔗 CVE-2026-104620（NVD）`](https://nvd.nist.gov/vuln/detail/CVE-2026-104620) · [`🔗 SUSE Bugzilla 1284954`](https://bugzilla.suse.com/show_bug.cgi?id=1284954)

---


## 20. USPS 开始出售官方 ZIP Code 边界面——标价五位数起步

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 529 分 · 11 月 10 日（~03:58 UTC+8）
- **Tags:** `geodata` `usps` `gis`

USPS 的 PostalPro 上线了 **USPS® ZIP Code Boundaries**——官方 ZIP Code 边界面产品，官方将其定位为 "the ground truth for ZIP Code boundaries"，分三个授权层级出售（**Internal、Enterprise、Publication**），每级含四次季度更新，并附 **GeoJSON 样例文件**。页面上的资源——简报、技术指南、许可协议、订购表——日期从 2026 年 6 月到 9 月不等，所以 HN 首页这条讨论是"发现潮"，而不是发布事件。讨论里挖出的实用信息：一条 HN 评论指向订购表，**"starting at $10k"**；许可协议限制再分发——而社区实际在用的替代品 OpenDataDE 的 State-zip-code-GeoJSON 依旧免费，但数据停留在 2010 年人口普查。

**Why it matters:** ZIP Code 从来不是地理区域——它是投递路线的分组，USPS 自己几十年来一直这么说；官方边界面是该机构第一次为这个所有人都在近似的形状出售"地面真值"。这条讨论真正的价值在于市场的回答：人人在用的免费近似，对比几乎没人会按一万美元买下的正版真值。

[`🔗 USPS ZIP Code Boundaries`](https://postalpro.usps.com/zcb) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50431058)

---

## 21. Gemini 连接应用的承诺被悄悄改写：Google 自己的页面现在承认 Drive 和 Gmail 数据会进人工审查

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 469 分 · 11 月 10 日（~02:24 UTC+8）
- **Tags:** `privacy` `gemini` `google`

Google 2023 年的博客原文仍在页面上——使用 Workspace 扩展时，"your content from Gmail, Docs and Drive is not seen by human reviewers, used by Bard to show you ads, or used to train the Bard model"——但这句话后面多了一条 **"Update, October 16, 2026"**，注明连接的 Workspace 数据 "can also be subject to human review in limited circumstances"。现在的帮助页面说得更直接："Data from Connected Apps is used and human reviewed per the Gemini Apps Privacy Notice。" 随 HN 帖子贴出的仓库记录了摄取机制：对个人话题的随意提及会在**不加 @ 标签**的情况下触发后台 Workspace 查询，且捕获是概率性的——观察到四种结果，从零检索、元数据摘要、部分原文引用，直到**整份文件**被摄入会话上下文。

**Why it matters:** 承诺、反转和机制如今都在 Google 自己的页面上；仓库补充的是演示——检索会在闲聊中触发，而不只是显式 @Drive 调用——所以审查流水线可以看到一封用户从未让 Gemini 打开的完整邮件。对任何做连接应用集成的人来说，设计教训是：用户问过、用户知道有工具被调用，是两个不同的同意事件。

[`🔗 gemini_files：行为文档`](https://github.com/thisisme6598/gemini_files/) · [`🔗 Google Help Answer 16836988`](https://support.google.com/gemini/answer/16836988) · [`🔗 2023 年博文（含 10 月 16 日更新）`](https://blog.google/innovation-and-ai/products/our-responsible-approach-to-building-guardrails-for-generative-ai/)

---

## 22. TPU 8tx 与 8i Max：一代之内四套系统，各自切中 agent 生命周期的不同阶段

- **Velocity:** ▮▮▮ trending
- **Source:** Google 博客 · HN 226 分 · 11 月 10 日（~05:56 UTC+8）
- **Tags:** `google` `tpu` `infrastructure`

Amin Vahdat 宣布第八代 TPU 阵容再添两员——"the first time we have introduced four TPU systems in a single year"（8t、8i、8tx、8i Max），客户已达 **nearly 100 customers**。**TPU 8tx** 是机密计算配置：与 8t 同一硅片，搭配第五代 AMD EPYC 主机，让 "sensitive data and model weights protected and isolated even while in active use"，在 Boardfly 网络上比 8t 延迟最高降低 **2 倍**。**TPU 8i Max** 把两颗 8i 封装进一个 package——"double the compute, double the SRAM and double the HBM bandwidth"，同机架占地面积塞进两倍硅片——为需要"across an entire software codebase or hours of video at once"推理的 agent 而造。博文中软件部分同样具体：TorchTPU（上个月开源）让 PyTorch 与 Hugging Face 模型免改跑通；TPU agent suite 预览版接入 Claude Code、Cursor 和 Google Antigravity；另有开源的 XLA Serving Engine。

**Why it matters:** 故事在于专用化的模式——同一代、四个 SKU、各对一个生命周期阶段（训练、推理、隔离、上下文）——而开源软件公告可能比硅片本身更重要：如果 PyTorch 代码免改就能跑，护城河就变成封装和价格。注意文中宣称的战绩（InferenceX 与 AgentX 上的 "state-of-the-art price-performance"）没有给出任何数字。

[`🔗 Our newest TPUs: 8tx and 8i Max`](https://blog.google/innovation-and-ai/infrastructure-and-cloud/global-network/tpu-8i-max-and-8tx/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50432831)

---

## 23. Watched.earth：过去一周飞过地球上任意地点的每一颗卫星，和它实际拍下的照片

- **Velocity:** ▮▮ rising
- **Source:** Show HN · 257 分 · 11 月 10 日（~01:51 UTC+8）
- **Tags:** `satellites` `gis` `show-hn`

**Watched** "shows which satellites passed over any place on Earth in the last 7 days, and the real photos they took"——作者做它是想知道谁拍过自己那条街。过境搜索在浏览器里**对 CelesTrak 目录跑 SGP4**（每次查询约半秒），并对照极点、反子午线与小范围的暴力穷举验证，**0 次漏检**；轨道上全部 **约 17,000 个物体在 GPU 上绘制**，每帧求解开普勒方程。影像来自真正找到的 Sentinel-2/Landsat 过境——作者还标注了自己踩过的坑：Sentinel-2 的时间戳与卫星实际过境常常"often 5-10 min off"。只有真实影像存在时才标记为被观测，不存储你的位置，代码开源（MIT，`dev-Armaan/satellites`）。

**Why it matters:** 卫星过境通常是专家工作流——TLE 传播、过境预报、影像 API 手工拼接；这个项目把它压成一次地图查询，而诚实的细节正是承重墙：时间戳偏差这种测量误差，放在别处会悄悄破坏影像与过境的配对。

[`🔗 watched.earth`](https://www.watched.earth) · [`🔗 dev-Armaan/satellites`](https://github.com/dev-Armaan/satellites) · [`🔗 HN 讨论（作者的发布说明）`](https://news.ycombinator.com/item?id=50428907)

---

## 24. CUI：C 语言原生 UI 组件——一套 C99 代码，完整应用约 250 KB，每个组件在文档里可现场运行

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 164 分 · 11 月 10 日（~03:35 UTC+8）
- **Tags:** `c` `ui` `native`

CUI 自述为 "About 190 components, compiled to machine code with no browser or runtime inside"，运行于 "Windows, macOS, Linux and the web, from one C99 codebase"，且 "A complete app is about 250 KB"。文档站点在浏览器里**现场渲染每一个组件**；组件索引本身列出约 150 个条目（合并页面解释了它与站点约 190 头条数字的差）。MIT 许可，已发布 **v1.3.1**，738 星——**11 月 5 日**创建，一周大就上了 HN 首页。

**Why it matters:** 最直接的对比对象是跨平台工具包；更可迁移的想法是文档即演示——每个组件都能在自己的文档页上执行，这是原生工具包很少做到的，也顺手兼任项目的测试套件。这些宣称（组件数、包大小）是作者自己的，但工件离你只有一次 clone。

[`🔗 CUI 文档（组件现场运行）`](https://yappologistic.github.io/CUI/) · [`🔗 yappologistic/CUI`](https://github.com/yappologistic/CUI) · [`🔗 组件索引`](https://yappologistic.github.io/CUI/components/)

---

## 25. Exact：Expo 的新运行时不是 React Native——而是一种 AI agent 能构建、运行、看到并测试的应用格式

- **Velocity:** ▮▮ rising
- **Source:** Show HN · 约 76 分 · 11 月 10 日（~06:59 UTC+8）
- **Tags:** `ui` `cross-platform` `agent-native`

**expo/exact**（MIT，Rust，**8 天 1,133 星**，尚无 release）开篇即："Write an app once. It runs natively on the web, macOS, iOS, and Linux, and an AI agent can build it, run it, see it, and test it on every one of them." 界面用 **Contract**（一种声明式语言）编写，编译成紧凑的 plan；逻辑用 TypeScript 或 Rust。在 web 上，plan 经约 20 KB 运行时驱动真实 DOM；在原生平台上，Rust 布局内核按 CSS 规则算出每个盒子，由 AppKit、UIKit 或 GPU painter 绘制——"no webview and no JavaScript bridge in the UI"。README 的核心是一段**给 Claude Code 的复制即用提示词**：脚手架一个 todo 应用、写一份 `app.test.contract`，并经 `scripts/agent.mjs` 在 web、macOS 与 iOS 模拟器上通过测试——干净 clone 上的 agent 运行耗时 **约 57 分钟**，"about 25 of those minutes were the first macOS and iOS builds"。明言 pre-1.0："no API stability, no backwards compatibility, and no migration guide, by design."

**Why it matters:** Expo——一门生意建立在 React Native 上的公司——发布了一个不是 React Native 的运行时，这本身就是信号；而它的卖点不是开发者人体工学，是 **agent 可验证性**：一个工件（contract 测试），agent 能在所有宿主上写出、执行并读取。如果 agent 驱动开发成为主要客户端，agent 能否在所有平台上测试它，就不再是锦上添花，而是框架特性。

[`🔗 expo/exact`](https://github.com/expo/exact) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50433541)

---

## 26. SAP 补丁浪潮抵达 NVD：一夜 40 条记录，四条 10.0，每个分数都是 CNA 自己的

- **Velocity:** ▮▮ rising
- **Source:** NVD · 40 条记录 · 11 月 9–10 日（隔夜批量）
- **Tags:** `security` `cve` `sap`

SAP 的安全补丁日浪潮隔夜抵达注册表：一个发布窗口内 **40 条记录**，全部仍是 `Received`，每个分数都由 SAP 自己的 CNA 容器携带（`cna@sap.com`，`Primary`），NVD 分析为零。四条 **10.0**（全部 `AV:N/AC:L/PR:N`）：**CVE-2026-120017**（NetWeaver AS ABAP——"does not perform sufficient verification of incoming authentication assertions"）、**CVE-2026-76964**（NetWeaver AS ABAP 网络输入校验）、**CVE-2026-89103**（SAP Gateway，"activates the default Access Control List with high privileges"）、**CVE-2026-89126**（SAP Web Dispatcher）。另有三条 9.9，以及 9.6 和 9.1 的行，横跨 NetWeaver、Web Dispatcher、Gateway、HANA XSA 与 BusinessObjects——还有一条落在 **SAP Cloud SDK for Python** 的 7.5（加密签名验证不当）。

**Why it matters:** 这条的新闻点是文书形态：40 条全部 `Received`，所以每个数字都是 SAP 自己的，细节在厂商门户之后——每条记录指向一个 `me.sap.com` note 而非公开公告。如果你运维 SAP，补丁日的 note 清单才是重要文件；如果你扫 NVD，这是一份会在你脚下移动的"第一天快照"。

[`🔗 CVE-2026-120017（NVD）`](https://nvd.nist.gov/vuln/detail/CVE-2026-120017) · [`🔗 SAP note 3849308`](https://me.sap.com/notes/3849308)

---

## 27. FrodoBots EarthRover Mini+：一套全车队硬编码凭据，守着每台车的 root

- **Velocity:** ▮▮ rising
- **Source:** CERT/CC VU#188754 · 6 条 CVE 记录 · 11 月 10 日（~01:17 UTC+8）
- **Tags:** `security` `iot` `robotics`

CERT/CC 于 11 月 9 日发布 **VU#188754**，对象是带摄像头和麦克风的消费级遥操作机器人 FrodoBots EarthRover Mini+：固件 "contains several sets of hard-coded, fleet-wide credentials"——Agora token 服务的 BasicAuth、**AWS IAM 访问密钥**、AWS IoT MQTT 凭据和一个 Slack incoming webhook（CVE-2026-121685）。六条记录中最重的一条，**CVE-2026-121686**：固件方法 "accepts arbitrary shell commands delivered via" AWS IoT MQTT "and executes them as root"——"Access is gated only by shared Internet of Things (IoT) credentials, with no per-device authentication, enabling remote code execution as root across the fleet." CERT 概述：攻击者可以 "take remote control of the rover, access its audio and video streams, or use it to gain a foothold in its network"。六条记录全部 `Received`、无分数；提交方为 `cret@cert.org`。

**Why it matters:** 一套凭据守一整条产品线，是 IoT 反模式的纯态——一把泄露的钥匙就是全队 root，同一套钥匙还开着 IAM 和 Slack webhook。消费级机器人再加一条物理尾巴：远程控制这台车，等于控制了某人家里的摄像头和麦克风，不只是一台被入侵的设备。

[`🔗 VU#188754（CERT/CC）`](https://kb.cert.org/vuls/id/188754) · [`🔗 CVE-2026-121686（NVD）`](https://nvd.nist.gov/vuln/detail/CVE-2026-121686)

---

## 28. Mongoose 的 sanitizeFilter 有个洞：countDocuments() 跳过注入防御——而修复比记录早了三个月

- **Velocity:** ▮▮ rising
- **Source:** NVD · CVE-2026-125120 · 11 月 10 日（~07:17 UTC+8）
- **Tags:** `security` `npm` `mongodb`

同一天落地的两条 Mongoose 记录。**CVE-2026-125120（9.8）**：`countDocuments()` "does not apply the configured sanitizeFilter query selector injection defense"——启用了 `sanitizeFilter` 却把攻击者可控的过滤值传给 `countDocuments()` 的应用，会让查询操作符对象被当作操作符而非字面量处理，计数包含本不该匹配的文档，"potentially undermining authorization or application logic based on that count"。修复版本（6.13.11、7.8.12、8.24.3、9.9.2）在 npm 上的发布时间是 **8 月 10 日**——修复比文书早了三个月。同日另一条 **CVE-2026-125117（8.2，CWE-1321）** 是原型污染族：`init()`、`$__set` 与 `utils.mergeClone` 会下钻继承属性，构造 `toString`/`valueOf` 键即可写进共享内建函数；在更晚的补丁线修复（npm 显示 8.24.7 于 10 月 23 日发布）。

**Why it matters:** 这条有趣的主张关于防御而非缺陷：做了正确的事——`sanitizeFilter: true`——的代码，仍在这个跳过净化器的唯一方法上暴露；这提醒我们，一个安全选项的完整性等于它的调用点覆盖面。而由于修复早于记录，任何在当前 npm 版本上的人自八月起就安全了；真正暴露的人群是钉死依赖版本的人。

[`🔗 CVE-2026-125120（NVD）`](https://nvd.nist.gov/vuln/detail/CVE-2026-125120) · [`🔗 npm 上的 mongoose 版本`](https://www.npmjs.com/package/mongoose?activeTab=versions)

---

## 29. OmniAgent 的审批门把所有以 `find` 开头的命令当作安全——而 `find` 有 `-execdir`

- **Velocity:** ▮▮ rising
- **Source:** NVD · CVE-2026-125368 · 11 月 10 日（~08:17 UTC+8）
- **Tags:** `security` `agents` `prompt-injection`

**OmniAgent**——一个 2,587 星的 Python agent 框架，自述 "An agent capable of self-evolving and dynamically hardening security"——带有 **CVE-2026-125368（CVSS 4.0 上 7.7，3.1 上 7.5，均为 VulnCheck）**：`ReflexionAgent._is_safe_bash_command` "treats any command starting with find as safe without inspecting -execdir arguments"，于是一条被提示注入的 agent 可以用 `-execdir` 跑 `find`，经未沙箱的 shell 调起 `dd`、`nc`、`perl`、`openssl` 等二进制，"overwriting files or executing code without human approval"。代码证实了这个形状——白名单在第 1379 行，第 1973 行对被分类器判为安全的命令跳过审批请求。**Issue #67**（10 月 24 日提交，仍然 open）比 CVE 更直白：标题写着 "bash safety classifier bypass via find -execdir skips the advertised approval gate entirely"，并引用 README 自己宣称的 "four-layer... unbypassable (industry-first)" 安全控制。仓库最后一次 push 是 **7 月 27 日**。

**Why it matters:** 这是 agent 安全里反复出现的类别：一个按前缀匹配而非解析语法的白名单，挡在一道审批门前。`-execdir` 是 1970 年代的 `find` 语义在干现代的 agent 逃逸工作——而讽刺是结构性的：一个框架把安全层吹得越响，单次绕过就越值钱。

[`🔗 CVE-2026-125368（NVD）`](https://nvd.nist.gov/vuln/detail/CVE-2026-125368) · [`🔗 Issue #67（10 月 24 日起 open）`](https://github.com/YeQing17-2026/OmniAgent/issues/67)

---

## 30. ScrapeBench：agent 在禁抓站点 95% 以上会无视规则——在合法站点又有 98.5% 过度拒绝

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2611.11306 · 11 月 8 日提交
- **Tags:** `research` `agents` `benchmark`

ScrapeBench 自称首个针对网站抓取**法律合规**的 agentic 基准，测试对象是 ToS 与 robots.txt，覆盖 "1,626 popular websites that explicitly prohibit scraping" 与 269 个允许抓取的站点。在禁止站点上，"most agents exhibit low compliance rates (< 5%)"——而且 "even where AI agents actively check the applicable ToS and robots.txt, they continue to exhibit low compliance rates"。在合法目标上失败方向反转："agents sometimes refuse to scrape despite it being lawful, such as Claude Opus 4.6 exhibiting an over-refusal rate of 98.5%." 人类基线（n=180）一半相同一半相反："humans exhibit compliance rates comparable to AI agents but over-refuse at much higher rates."

**Why it matters:** 两个方向同时失败——有规则的地方 agent 破坏规则，没规则的地方 agent 拒绝——这意味着"检查 robots.txt"目前是走过场：检查发生了，答案不产生约束。带人类基线的合规基准是罕见的、能说清"好"到底长什么样的那种，对 agent 构建者和写政策的网站都一样。

[`🔗 arXiv 2611.11306`](https://arxiv.org/abs/2611.11306) · [`🔗 全文（HTML）`](https://arxiv.org/html/2611.11306v1)

---

## 31. 按答案搜索的偏置：稠密检索器偏爱提及它已相信的答案的段落

- **Velocity:** ▮ steady
- **Source:** arXiv 2611.11396 · 11 月 8 日提交
- **Tags:** `research` `retrieval` `rag`

稠密检索器本应选取与查询语义规格匹配的段落——但它们 "suffer from search-by-answer bias: they favor passages that mention answer objects the model knows (scores as likely), over passages that support valid alternative answers"。方法是受控的：用 LAMA/TREx 构造事实对照，让 token 预测头给标准对象与替代对象打分，再检验该分数是否预测段落排序。跨 **八个检索器**——DPR、Spider 变体、Contriever、E5、Qwen3-Embedding——更高的 token 预测分一致预测更高的检索分，且效应在 "when passages differ only in the answer object, and even when the passage that mentions the high-scoring object expresses a wrong relation" 时仍成立。

**Why it matters:** 检索质量通常测的是相关性；这里测出的是一个**偏置**——检索器继承了一个语言模型头对哪些答案可信的语料级先验，这决定了 RAG 系统见得到哪些证据。如果你的管线检索的是"可信"的答案，一次 recall@5 评估可能测的是先验，不是搜索。

[`🔗 arXiv 2611.11396`](https://arxiv.org/abs/2611.11396) · [`🔗 全文（HTML）`](https://arxiv.org/html/2611.11396v1)

---

## 32. daily_stock_analysis：6.9 万星，release notes 读起来像一份给 LLM 依赖的 SRE 变更日志

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · 今日 +506 星 · 11 月 10 日（~04:06 UTC+8）
- **Tags:** `llm` `agents` `chinese-oss`

**ZhuLinsen/daily_stock_analysis**——69,086 星，2026 年 1 月创建——是一条 LLM 驱动的多市场股票分析管线：多源行情、实时新闻、决策看板、自动推送，"支持零成本定时运行"。**v3.34.0 于 11 月 9 日发布**，notes 是一份 agent 运维案例：跨 Claude、Gemini、OpenAI、DeepSeek 更新默认模型，以"减少旧模型退役导致的配置失败"，新建文本渠道优先 MiniMax M3.1 Flash；Market Light 评分**排除 VIX 涨跌**，波动率飙升不再被读成市场上涨；离线 agent 轨迹评估新增讨论股票范围偏移的诊断；实验性的 Codex App Server 后端被移除。

**Why it matters:** 6.9 万星落在一条把模型层当作会坏的基础设施对待的管线上——"模型退役"的修复以版本化 release 而非热修发布——这是中国开源 agent 浪潮的缩影。notes 里描述的维护负担（一次 release 追平四家供应商的模型退役）是基准测试从不展示的成本。

[`🔗 ZhuLinsen/daily_stock_analysis`](https://github.com/ZhuLinsen/daily_stock_analysis) · [`🔗 v3.34.0 release notes`](https://github.com/ZhuLinsen/daily_stock_analysis/releases/tag/v3.34.0)

---

## 33. 法国将超市冷柜攻击归因于伊朗革命卫队——冷柜被从 −27 °C 推到 50 °C 以上

- **Velocity:** ▮ steady
- **Source:** The Guardian · HN 60 分 · 11 月 10 日（~03:33 UTC+8）
- **Tags:** `security` `attribution` `critical-infrastructure`

法国正式将 10 月的超市冷柜网络攻击归因于伊朗：一位部长在巴黎确认 "the Islamic Republic of Iran's Revolutionary Guards are responsible for this attack"，巴黎检察官将行动归于与 IRGC 关联的网络单位 **Shahid Kaveh**， citing "the use of Farsi and IP addresses traced back to devices located in Iran"。10 月 11–12 日的攻击远程改写了 "as many as 700 supermarkets and shops across France" 的温控，"pushing them from as low as -27C (-16.6F) to well over 50C (122F)"；数千吨食物被丢弃，部分门店因高温触发火灾与喷淋损失。上周类似事件波及其他欧洲国家的冷柜，一家法国血库的低温存储阈值也被调高，靠警报才让技术人员来得及介入。

**Why it matters:** 这次归因异常直接——调查点到了该单位的负责人——而目标类别是平凡的控制系统的、制冷，物理效果立竿见影，安全姿态却毫无加固。报道里的升级逻辑才是值得带走的警告："they are attacking easy equipment but as a state group that has the means, the determination and the time, we should be prepared to see attacks on other systems like water or electricity."

[`🔗 The Guardian：法国指责伊朗革命卫队`](https://www.theguardian.com/world/2026/nov/09/france-blames-irans-revolutionary-guards-for-cyber-attacks-on-supermarket-fridges) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50430585)

---


## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-10T04:30:36Z |
| Items | 33 |
| Sources tracked | 33（Hacker News、GitHub Trending、NVD、CISA KEV、arXiv、厂商博客、安全公告） |
| Update schedule | 04:03, 12:03, 20:03 UTC+8（每日三次） |
| Ranking | 速度加权（时效 × 互动加速度 × 来源权威度） |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[前一天](2026-11-09.md) · [原始 .md](https://trending.md/zh/feed/2026-11-10.md) · [归档](../archive/)
