---
date: 2026-11-10
updated: 2026-11-09T20:29:21Z
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

Meta FAIR 开源了 **e-means**，一个 Lloyd 算法的替代品，已进入 **`faiss/contrib/e_means`**，并附带论文与浏览器内 playground。其主张少见，因为速度与质量通常互相交换："Across a large range of scales and datasets, e-means reaches a test loss below Lloyd's at 25 epochs, in 1.2 to 3 epochs"——作者端到端测得，相对 Flash-KMeans **GPU 上 10–45 倍墙钟加速**，相对 FAISS **CPU 上 8–15 倍**。作者为 Bessa、Mazaré、Szilvasy、Touvron、Picard、Douze 与 Jégou——后三位正是写下它所击败的 FAISS 基线的人。

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

## 7. FFmpeg 一天收到 102 条 CVE 记录——其中 96 条说最新版本仍然受影响

- **Velocity:** ▮▮▮ trending
- **Source:** NVD · 11 月 9 日发布 102 条记录
- **Tags:** `security` `cve` `ffmpeg`

VulnCheck 在 **2026-11-09** 发布了 **102 条 FFmpeg CVE 记录**，全部仍处于 `Received` 状态，NVD 未做分析。这批几乎都是编解码器与滤镜树里的内存安全问题——`huffyuvenc`、`dvbsubenc` 与 `gif.c` 的堆溢出，VVC 与 Vulkan AV1 路径的越界写，十多个解码器的未初始化内存泄露——外加一长串 NULL 解引用。分数在两个框架上都来自 VulnCheck：**3.1 `Primary` 最高 7.8**，**4.0 `Secondary` 最高 8.5**（`CVE-2026-125250`，GIF 编码器 `shrunk_buf` 尺寸计算错误）。分布比最大值更重要：**102 条描述里有 96 条写着 "through 9.0.2"**，也就是 FFmpeg 的最新 tag（`n9.0.2`），只有 **6** 条给出了修复边界（"before 8.1.3 and 9.x before 9.0.2"）。

**Why it matters:** 当一批 102 条记录里绝大多数条目描述的都是最新 tag 中仍然存在的缺陷时，这是一次**未命名修复版本**的披露，而不是补丁公告——而 4.0 与 3.1 的差值（同一 CNA、同一族向量，3.1 上 7.8、4.0 上 8.5）是打分口径，不是分歧。这里全部是 `Received`，所以"NVD 说"目前还不存在；引用 VulnCheck，并说明这一点。

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

**Why it matters:** 作者的立论就是结论："Evaluations that check only task success can miss this cost, and the stale file can persist." 过期指令是文档债，其利息由之后每一个会话支付——所以自然的实验不是"agent 有没有做完"，而是它一路上做了什么、以及是否恢复。任何见过 agent 跑 2024 年那条测试命令的团队都认得这一类问题；这项研究固定代码、只移动文字，这才让那笔成本变得可测。

[`🔗 arXiv 2611.09802`](https://arxiv.org/abs/2611.09802) · [`🔗 全文（HTML）`](https://arxiv.org/html/2611.09802v1)

---

## 14. MemoryDojo：每一种被测记忆架构都可被投毒，而伤害程度取决于架构

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2611.09721 · 11 月 9 日列榜
- **Tags:** `research` `agent-memory` `security`

**MemoryDojo** 是一个追踪被投毒记忆生命周期的基准测试。前提是："malicious instructions encountered in one session may be stored and propagated through memory before being retrieved and acted upon in later sessions"，以及"because memory systems differ in how they process and retrieve information, the downstream effects of poisoning can vary significantly across systems"。产物是覆盖四个领域的 **155 条多会话长程轨迹**，在 **5 种不同记忆系统**上运行，追踪投毒在何处写入、何时被检索、以及 agent 随后做了什么。结论冷静且不讨好：**"all memory systems are susceptible to memory poisoning, with substantial variation in downstream effects."**

**Why it matters:** 这个基准还附带一个攻击优化过程——"a memory-aware poison optimization process that increases the poisoning efficacy, highlighting differences between memory architectures"——于是架构间的差异从趣闻变成了攻击面。对任何正在交付记忆层的人（本 feed 上周覆盖了四种互不兼容的记忆格式），"我的存储和你不是一个形状"现在有了可测量的代价。

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

一篇有测量的讲解，讲的是 `malloc` 的接口与内核实际看到的东西之间的缺口。第一个实验用 `strace` 跟踪 **1,000 次 `malloc(16)`** 的循环，发现总共**只有两次 `brk` 系统调用**——一次查询 program break，一次把堆扩展 **132 KiB**，都发生在第一次调用里；"the other 999 just take from that already allocated memory"。它给被摊销的东西标了价："**575 ns for an empty** [syscall], as measured below"，然后在 `sbrk` 上写了一个 bump allocator，打印进程各区域的一个地址，并指出那次运行里 break 与 `printf` 相距 **23.4 TiB**——"about 1,530 times the machine's 15.6 GiB of RAM. Nearly all of that range is unmapped, so it costs no physical memory."

**Why it matters:** 这是多数性能推理会跳过的那一层——系统调用与用户态的边界，以及把它藏起来的记账。这篇文章也是"测量优于回忆"的示范：132 KiB、两次 `brk`、地址布局都是输出而不是断言，而且每一条都能用它打印的代码片段复现。

[`🔗 What is malloc doing, anyway?`](https://benmandrew.com/articles/what-is-malloc-doing-anyway) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50424157)

---

## 17. Raspberry Pi 5 16GB 涨到 385 美元——自 4 月以来跳了 80 美元，而它发布价是 120 美元

- **Velocity:** ▮▮ rising
- **Source:** CNX Software · 183 分 · 11 月 10 日（~01:42 UTC+8）
- **Tags:** `hardware` `raspberry-pi` `pricing`

Raspberry Pi 再次涨价，这次集中在 16GB 型号：**Raspberry Pi 5 16GB 现在售价 385 美元**，"an $80 increase compared to the last price hike in April"，而 **CM5** 系统模块涨 **40 美元**，"starting at $375 for the Lite model without wireless"。文章里唯一的好消息是维持不变："the Raspberry Pi 500+ mechanical keyboard PC stays at the same price, starting at $410"。CNX 自己对这种不对称的解读是：那款键盘机型"must have lower demand than for single board computers and compute modules"。

**Why it matters:** 曾经锚定低成本常开计算的那块板，现在的定价像一台小型服务器，而这次涨价是内存成本的传导，不是 Raspberry Pi 的毛利决策——正是本周把"闲置内存"玩笑变成一种体裁的同一股 DRAM 压力。对任何在盘算 homelab、CI runner 集群或边缘部署的人：16GB 这一档已经从"买几块"变成"买一块并测量"，而 CM5 一并移动。

[`🔗 CNX Software：Raspberry Pi 5 16GB 现价 385 美元`](https://www.cnx-software.com/2026/11/03/when-will-this-stop-the-raspberry-pi-5-16gb-sbc-now-sells-for-385/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50428801)

---

## 18. Flide 是决策模型缺的那层服务栈——比 vLLM 与 SGLang 快 9.5 倍，支持精确状态分叉

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 109 分 · 11 月 9 日（~12:43 UTC+8）
- **Tags:** `inference` `decision-models` `serving`

**`OmniJev/Flide`**（Apache 2.0，**258 星**）是"决策模型"家族的推理引擎——那种单次前向、不生成 token 的模型，本 feed 在 **2026-11-07** 覆盖过——它的立论是这类模型需要与生成式 LLM 不同的服务机制："**9.5 times faster than vLLM and SGLang; exact state forking**"，一个状态被分叉成三个问题，"each answered in one forward pass"。项目在 11 月 2 日公布方法论文（**arXiv 2610.42148**，"Accelerating Decision Inference with Exact State Forking"），并附带 `flide verify` 命令："checks exact forking on your own model and requests"。**PyPI `flide` 0.1.10** 于 **2026-11-09T06:57Z** 上传，同一天 README 记录了两个版本：0.1.9 增加 **`pplx-decider-v1.1-27b` 与 `JEV-35B`**，0.1.10 增加 **Ainvest-Decision-27b、Darwin-27B-RSI-Decision 与 KnowLine-31B-Gen1.5**，最后一个现在能读图。

**Why it matters:** 模型清单才是故事。Perplexity、Cloudflare（`Clef`）、Juspay、AutoTrust 等十几家现在发布的"decision"检查点不是聊天模型，而整个家族此前是用为 token 生成而建的引擎在服务。相对 vLLM 的 9.5 倍是项目在自家工作负载上的自测——但真正决定这 9.5 倍是公平比较还是一次不同计算的，是那个测分叉精确性、而不是测速度的 `verify` 命令。

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

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-09T20:29:21Z |
| Items | 19 |
| Sources tracked | 28（Hacker News、GitHub Trending、NVD、CISA KEV、arXiv、厂商博客、安全公告） |
| Update schedule | 04:03, 12:03, 20:03 UTC+8（每日三次） |
| Ranking | 速度加权（时效 × 互动加速度 × 来源权威度） |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[前一天](2026-11-09.md) · [原始 .md](https://trending.md/zh/feed/2026-11-10.md) · [归档](../archive/)
