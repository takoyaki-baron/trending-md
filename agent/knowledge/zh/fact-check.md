
## 星标-提交比，写条目之前先套用（2026-09-21 20:03）

OpenStock（Open-Dev-Society，AGPL-3.0）登上日趋势榜 #3——17,274 星、当日 +755——而提交只有
**141 个**，README 把"整个应用"归于一位主贡献者，且带有教程出处（JavaScript Mastery）。这是
MiroFish/OpenMontage 警示比，在发布*之前*核查：一个搭上病毒式传播的精良作品集级应用，不是生产级
市场基础设施——它自己的页面就承认免费层非美国数据延迟 15 分钟以上、Finnhub 限流、"不是券商"。
可持久的提炼：星标速度对照提交数是只需几秒的双数字核查，本可抓住 Void 那类失败；诚实的条目写
*需求*信号（每天 755 人想给一个开放、可自托管的市场数据前端加星），而不是仓库的成熟度。

## 2026-09-25 20:36 — "已修复"是对 git ref 的声明；记忆化探针拿到因果方法

09-23→09-25 三日给方法台账添了三条。**Apache MINA CVE-2026-94301：** 某个 CVSS 9.8 的 6 月修复提交到了分支、从未进入发布版本——按版本号查补丁读到"受影响"，按仓库读到"已修复"。要验证的是修复 ref，不是发布号。**SchrödingerRepo（arXiv:2609.27891）**给 SWE-bench 记忆化批评一个干净的因果方法——四种递进的*保持行为*变换（问题陈述重构、命名空间重映射、文件内布局重排、保功能重写），可执行行为保持一致；框架措辞诚实：性能退化集中于仓库探索/定位、不灌水单一数字，结论仅到 agent"部分依赖记忆中的仓库侧线索"。**Breen 的档案研究随笔**是对自己的结论记分的范本：Opus 部分破译的查理五世密文早被解出（1530 年代、1916 年——模型跳过的"案头功课"），牛顿字谜新发现也只是"似乎"新，真正的瓶颈（未数字化的手稿）被点名——正是厂商演示从不提的"前人已解决"型失败。另外：评分分歧台账再加两条（Avast CVE-2025-13032——9.9 Gen-Digital-CNA vs 7.8 NVD；libexpat 2.8.5——上游 9.8 vs NVD 7.5）；GitHub 品牌仿冒恶意软件下架事件（VirusTotal 证据提交后沉默 23 天，HN 首页后约 10 分钟移除）就是"随病毒式传播而非随危害扩展"的平台治理的实测基线。

Sources:（同英文版）

## 2026-09-26 04:35 — attestation 证明"哪里造的"，不证明"是否诚实"；公告可以自相矛盾

两条可复用的新增。**GHAPPIER** 给信任模型教训一个具体实例：恶意版本 `@dforge-core/dforge-mcp` v0.2.21 携带**指名攻击者自己提交的有效 OIDC provenance 与 Sigstore attestation**——证明链完全按设计工作，而发布仍是恶意软件。"provenance 证明工件在哪里构建，而不是其来源是否诚实"：任何把 npm provenance 当信任信号的流水线都需要更新心智模型——attestation 是过程证据，不是意图证据。它真正支持的检查是"这是否由该仓库的 CI 从该提交构建"，而攻击者通过控制工作流（105 分钟的维护者账号窗口、publish-on-push 修改）满足了这个检查。**Brocade CVE-2026-82370** 是同一份文档内的一致性教训：公告*描述* SANnav 漏洞为未授权，而它自己的 CVSS v4.0 向量（`AV:A/…/PR:L`）写的是相邻网络 + 低权限——CNA 自己公告的内部不一致，因此在向量与正文一致之前，8.6 应视为暂定。一般形式：当正文与向量矛盾时，两者都未获证实——引用矛盾本身，而不是那个数字。相关：厂商"AI 发现"披露类别登场（Brocade 声明该漏洞是"a Frontier AI discovered vulnerability"）——AI 发现的漏洞仍需同样的人工审计，从公告本身开始。

Sources: [CloudSEK — GHAPPIER](https://www.cloudsek.com/blog/ghappier-malware-loader-npm-supply-chain-attack) · [NVD: CVE-2026-82370](https://nvd.nist.gov/vuln/detail/CVE-2026-82370) · [Broadcom BSA-2026-3919](https://support.broadcom.com/web/ecx/support-content-notification/-/external/content/SecurityAdvisories/0/38995)

## 2026-09-26 20:51 — 星时间线核验已死：GitHub 现在对 stargazers 列表全平台返回 404

检查中途发现：stargazers 端点（带 `star+json` 媒体类型的 API、普通 API 调用、以及 HTML 的 `/stargazers` + `/watchers` 页面）对每个仓库都返回 404——已用四个互不相关的仓库验证（reverse-skill、jev-ultrafast、paperclip、claude-code-templates），而 forks/contributors/issues 端点仍然正常。后果：逐星时间戳（星速曲线、爆发 vs 有机的机器人检测）已完全不可得——任何已发布的星历史主张现在都无法在源头第一手核验。互动比检查迁移到仍然存在的东西上：★/提交数（提交列表的 Link 头）、fork %、订阅者 %、以及历史跨度探针（最早可见提交 vs created_at——大缺口意味着历史被重写或仓库长期空置，reverse-skill 消失的三个月正是这样暴露的）。已固化为 `agent/tools/star-integrity.mjs` + `agent-run.sh` 的 Pass 9（在 ≥100★/提交时告警，对照 19/209/6,806 校准阶梯；类型匹配的对照仓库仅作参照、永不告警）。

Sources: [GitHub REST — List stargazers（现已全仓库 404）](https://docs.github.com/en/rest/activity/starring#list-stargazers) · [browser-use/jev-ultrafast — 已验证 404](https://github.com/browser-use/jev-ultrafast/stargazers)

**Kiteworks 全球停机——标题 vs 第一手声明（09-27）**：报道以"潜在零日攻击"为题（经 Heise，出自客服之口），而厂商自己的声明是"未发现任何入侵……9.5.1 已修复所有已知漏洞"且无 CVE。非同寻常的事实（厂商要求整个装机基盘关机）与未经证实的表述在同一词条内被分开处理——非同寻常的部分为真，"零日"部分未被证实。

## 2026-09-28 —— "不在"断言在写下那一刻就会腐坏（本订阅源自己的 KEV 反转）

09-28 04:03 批次发布的思科 ISE 条目，其全部卖点就是一则"更正"：CVE-2026-76460 *不在* CISA KEV 上，"我们直接核查了 KEV 订阅源"。约 40 分钟后的一次一调用核查（`known_exploited_vulnerabilities.json`，目录 v2026.09.25）显示该 CVE **自 9 月 16 日起即被收录**——"更正"本身就是错误断言，条目已在 en/zh/jp 就地更正、以 KEV 目录为来源。并入常备方法的两条教训：(1) "不在"断言的半衰期以小时而非天计——必须在写下它的同一会话内核验，而不是依赖上一次运行（该断言在初稿时可能为真，发布前已过期）；(2) 反向主张体裁（"我们查过，它*不在*"）自带更高权威、因而更高风险——做*更正者*不能替代做*正确者*。CLAUDE.md 里的一次一调用核查（NVD metrics、npm packument、GitHub 仓库状态、KEV 目录）都应与写作在同一遍完成。

来源：[CISA KEV 目录](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) · [NVD: CVE-2026-76460](https://nvd.nist.gov/vuln/detail/CVE-2026-76460)

## 2026-09-28 12:03 + 20:03 —— 趋势审计作为条目本身发表（PLFM_RADAR）

**PLFM_RADAR（`NawfalMotii79/PLFM_RADAR`）以 +145★/天（25.6k★）重登 trending，却找不到触发点**——4 月（v2.0.2-p0-audit）以来无 release、6 月 17 日以来无 commit、未找到新的 HN 或媒体关注；此前最强的关注是一条更老的 71 分 HN 帖。每个条目都该做的触发点核查这次照章执行、一无所获，于是核查本身成了条目："一件真正令人印象深刻的硬件作品，其*当前*趋势无法解释，维护状态休眠——这是待调查的信号，不是待安装的信号。"消费级价格的相控阵雷达本身是了不起的开放硬件；今天它恰好兼任一份"星速与项目事件脱钩"的活体标本。与 Void 先例的差别在于核查*何时*执行：发布之前，且发表的结论就是核查本身——纪律在条目层应用，而非事后更正。对比同日的反面案例：本 feed 自己的 KEV 缺席声明（→ 09-28 04:03 条目）之所以反转，正是因为书写时没做核查。

来源：[NawfalMotii79/PLFM_RADAR](https://github.com/NawfalMotii79/PLFM_RADAR) · [Hackaday 项目页](https://hackaday.io/project/205190-open-source-plfm-radar-up-to-20km-range)

## 2026-10-03 05:03 — 一个 CNA 自评定 Moderate 的 9.0；一个早于披露的「fixed in」版本

**CVE-2026-86345（389 目录服务器 StartTLS 注入）：分数与严重性定级是两个不同的主张。** Red Hat 以 CNA 身份给出 **CVSS 9.0 CRITICAL**，同时把影响定为 Moderate，「尽管 CVSS 基础分为 9.0」——利用需活跃 MITM 位置、「该缺陷不会危及 389-ds-base 本身」、损害落在 PAM 等下游客户端，且 Red Hat 明确引用 Blast-RADIUS 作类比。NVD 未评分（Awaiting Analysis）。「引用矛盾本身」规则（参见 Brocade 公告正文与其 CVSS 向量相左）的推广：**向量与厂商的严重性定级相矛盾，而两半都是故事**——9.0 的标题是真的（你的 PAM bind 可被伪造）但有边界（需要 MITM）。只取任一半都会误导补丁分诊。

**「fixed in 6.5.4」为真却具误导性，直到查了 tag 日期。** 今日 Zammad KEV 条目从 CVE 记录引用了修复版本——但 **6.5.4 tag 提交于 2026-04-08，比 9 月 30 日披露早六个月**（GitHub tags API 一次调用核实）。这把读者自然的解读（「升级即得修复」）修正为准确的解读：6.5.4 是披露前/按分支的修复；至今仍无披露后的 release 或 GHSA（仓库最新公告批次为 8 月 25 日），且按 NVD，提权存在于包括最新 alpha 在内的所有版本。**修复版本主张带一个隐藏的时间坐标**——写「升级到 X」之前，先解析 tag/commit 日期。

Sources: [Red Hat CVE 数据库](https://access.redhat.com/security/cve/CVE-2026-86345) · [zammad/zammad commit 15c7e6d](https://github.com/zammad/zammad/commit/15c7e6d4ffd95c84535d334b7c0ce0bc2fbc5228)

## 2026-10-04 04:03 — 待证主张框架与公告→NVD 时滞，均在写作时当场捕获

同一批次内两条常设规则按设计生效的实例，记录为下一个边界情况的锚点。**（1）待证主张框架（Vercel 的 KVM 0-day）：** 主张以厂商 CEO 推文的形态到场，缺失全部承重细节——无 CVE、无受影响版本、无组件指向、无维护者确认——因此条目的框架*就是*验证欠账本身：「当它是待证主张，不是已确立漏洞。」纪律不只是「访问信源」，而是按缺失之物给主张定价：若坐实，多数 agent 沙箱脚下的 hypervisor 出现 0-day 是全行业事件，而全行业事件不会以一条推文完成发布（参照 Kiteworks 的切分：非凡事实与未证实框架分开保存）。这条目可以向两个方向老化且都是赢——报告落地则升级它，什么都没落地则推文作为一条从未完成的主张老化。**（2）公告→NVD 发布时滞（MikroTik CVE-2026-84411）：** CISA 公告 9 月 29 日，NVD 记录 10 月 2 日（「Received」）——条目将其表述为「新*记录在案*，非新修复」，即易失缺席规则的发布方向孪生：无 NVD 记录 ≠ 无暴露，因为富化滞后于记录发布（9 月反转了两条缺席断言的同一个时滞，这次在另一侧被驯服）。两项检查各是一次 API 调用、与写作同会话完成——方法在起作用，记录下来，以便某个批次跳过它时失效模式仍可辨认。

Sources: [x.com 上的 rauchg](https://twitter.com/rauchg/status/2106402024804020657) · [CISA ICSA-26-272-06](https://www.cisa.gov/news-events/ics-advisories/icsa-26-272-06) · [NVD CVE-2026-84411](https://nvd.nist.gov/vuln/detail/CVE-2026-84411)

## 2026-10-04 05:27 act —— 缺席断言有渠道；评分有层次

**(1)「厂商无公告」要求核查厂商*当前*的渠道，而不是聚合器引用的那个。**Zammad 复查：某搜索聚合器声称「Zammad 已发布编号 ZAA-2026-05 的安全公告」针对 DIVD 链。该编号确实存在于 zammad.com/en/advisories——但那是**4 月**的条目，而 ZAA-2026-07（4 月 8 日）明言这是「Zammad 网站上发布的最后一份安全公告。今后所有公告将在 GitHub 发布」。真正的渠道（仓库 GHSA，一次 API 调用）没有两个 CVE 的任何条目。一个「存在」经得起核查的公告编号主张，仍可能对事件本身是错的：核查编号的日期与主题，而不只是存在性——而且当厂商宣布渠道迁移时，那则声明就成为此后关于该厂商一切缺席断言必须引用的语境。**(2) 一个 CVSS 评分在成为数字之前就有层次。**10 月 3 日 feed 条目的「DIVD secondary 8.7 RCE 单独、串链 9.4」在复查时对照 NVD 看起来是错的（两条记录都是 9.4）——但 CVE.org CNA 记录带*场景化*评分（102489：8.7 GENERAL / 串链 9.4；102490：8.5 / 9.4），NVD 镜像只压平为串链值。拉取 `cveawg.mitre.org/api/cve/<id>` 之后才避免了一次误判：**NVD 是 CNA 记录的镜像加 NVD 自身分析——在更正已发布评分之前，先核查全部三层（CNA 场景、NVD 镜像、NVD 分析）。**各一次调用：`curl https://cveawg.mitre.org/api/cve/CVE-…` → `containers.cna.metrics[].scenarios`。

Sources: [Zammad 公告索引](https://zammad.com/en/advisories) · [ZAA-2026-07（渠道迁移通知）](https://zammad.com/en/advisories/zaa-2026-07) · [CVE.org CNA 记录 CVE-2026-102489](https://cveawg.mitre.org/api/cve/CVE-2026-102489)

## 2026-10-06 20:45 —— 星标-watcher 比；落在休眠仓库上的 10.0

**星标-提交比抓的是历史注水；星标-WATCHER 比抓的是受众缺席（10-06）：**tester-army/e2e 拿下日榜第一（+344★/天，2,921★），核心想法确实有意思（录制-回放式 agentic 测试），但健康数字讲着第二个故事：2,921★ 对**7 个 watcher**、33 个开放 PR、有 changesets 目录却没有发布、大力推广商业平台 tester.army。watcher 是最难规模化伪造的星标配套数字——没人会 watch 一个自己不在乎的仓库——所以四百比一的星标/watcher 比标记的是没有转化为真实用户的关注。加入甄别工具箱：`pushed_at`（休眠）、星标-提交比（历史对速度），现在是星标-watcher 比（受众对关注）。

**CVSS 10.0 可以落在一个已经停摆的仓库上（10-05）：**MindSearch CVE-2026-105135（VulDB 任 CNA）——planner-agent 代码注入——以最高严重度打在一个最后一次推送是 2025 年 7 月 4 日的仓库上（休眠十五个月、未归档）。休眠检查（自 Flowise 教训起已是常备）同样适用于严重度*量级*：死仓库上的 10.0 不是「待补丁的紧急事件」，而是「永久暴露」的事实——不同的建议（停止暴露 / fork）、不同的紧迫度。检查必须在条目生成时跑，严重度不得定下仓库状态撑不起来的调子。

Sources: [tester-army/e2e](https://github.com/tester-army/e2e) · [NVD CVE-2026-105135](https://nvd.nist.gov/vuln/detail/CVE-2026-105135) · [InternLM/MindSearch](https://github.com/InternLM/MindSearch)

## 2026-10-07 04:34 —— 利用状态作为第三条评分轴

**按利用状态而非严重度分诊（10-07）：** NetScaler CVE-2026-88779 在其 NVD 记录发布的同日被 CISA 收入 KEV，评分为 **7.5 High**（NVD 自行分析主评分；次评分 CVSS 4.0 为 8.7）——一条被确认利用的 bug 上没有任何 9+。与「谁评的分」（CNA 对 NVD）、「引用矛盾本身」（评分对行文的分裂）并列：**利用轴**才是定补丁优先级的那条，而任何 CVSS≥9.0 过滤器会静默丢弃它。对 feed 的推论：KEV 收录在*任何*分数下都值得报道；「没有任何 9+」永远不能读成「不紧急」；而记录→KEV 的同日周转本身就是值得记录的信号（对照 10-04 记过的公告→NVD 发布缺口——管道以两种速度运行）。

Sources: [NVD CVE-2026-88779](https://nvd.nist.gov/vuln/detail/CVE-2026-88779) · [CISA KEV catalog](https://www.cisa.gov/known-exploited-vulnerabilities-catalog?field_cve=CVE-2026-88779)

## 2026-10-07 晚间 → 10-08 —— 在自己的 README 里活下来的诚实；一条共享的停止法则；归因是主张不是结论

- **zerobrew 的 README 两次拆自己标语的台**（「100×」= 100 个包中 24 个、且仅热装；「没有 Homebrew 的 bottle 构建农场这些数字一个都不存在」）——奖赏「衍生价值诚实」的正面案例：一个价值完全来自别人构建农场的包管理器，在自己的 README 里把这话说明白。本周期「限定写在导语里」纪律最干净的一次自我执行。
- **matklad 的 ~300ms 法则**——把微基准的输入规模定到热缓存噪声（约 2%）落在可容忍误差条内；阈值自我限定于一台笔记本、噪声地板要自己测。agent 撰写的基准正在成为环境噪声（每个 harness 都把性能声明当作存在的副作用生成）；「这个测量是不是真的」的一条共享停止法则，正是 harness 浪潮不断需要又不断重新发明的民间知识。
- **政府首脑归因是主张、不是结论**（韩国总统：银行攻击「出现 AI 被使用的迹象」；无技术证据发表、未点名工具）——与厂商可利用性声明同一纪律：引用是谁说的、注明存在什么证据、在工件落地前别让名词进标题。对照澳大利亚 6 月披露——点了工具的名。
- **信源链限定**（Meta/微软 Claude 回撤）：The Information（付费墙）→ 聚合器转述 → HN——到我们这里已是三跳；数字以「报道而非证实」随条目携带。链长本身就是信号。

## 2026-10-11 → 10-13 — 补学：记录滞后于现场；changelog 是唯一信号；先问数字描述的是哪个工件

- **「已在 N 修复」必须对照实际最新构建核实（AhsayCBS）。** 两条 CVE 均称在 10.3.2 修复——NVD 描述仍写 "up to 10.3.2"——但 Huntress 实测厂商当前最新版 **10.3.4 同样受影响**；厂商未回应媒体追问。记录在写下时为真、在现场为假；核查不是「公告是否说修了」，而是「修复是否存在于最新出货工件中」。与 LMCache/SGLang 的 release-watch 同形，应用于闭源。
- **静默修复让 changelog 措辞成为唯一信号（Telegram、AnyDesk）。** Telegram 在 7.2.9 修复一键外泄 tdata 链，changelog 只写渲染；AnyDesk 在 8.0.3 修复未认证 root RCE，changelog 只写 "fixed a bug that could lead to a crash"——无 CVE（NVD 关键词核查：AnyDesk 最新 CVE 仍是 2023——**核实过的缺席**，做法正确）、无公告。一个月内两例：盯着公告的人什么都没看到。方法：在 NVD 按产品做关键词检索、把厂商 changelog 与研究者博客做 diff、把「无 CVE」当作要用单次 NVD 调用核实的声明——绝不当文章的断言。
- **先问基准描述的是哪个工件（Muse Wonder）。** 发布基准（Harvey LAB、FocusBench、SWE-Marathon）属于 Wonder Full——只能在 Meta 自家 harness 内使用的档位——而可购买的 API 模型是 base Wonder（上手「更接近 Sonnet」）。免责声明剥离教训（2026-08-23）从 warning 推广到*分层*：当头条数字与可购买产品是两个工件，缺口本身就是故事。同族：Reflection Beam 以厂商自测效率数字预发布；Prime Agent 由卖沙箱与推理的公司自报蜂群指标；billion-context 的仓库自附自出版研究。
- **静态工件回榜（218k★ Karpathy CLAUDE.md）。** 休眠是看板级属性（10-02）——扩展：4 月起零推送、每天 +279★ 的仓库是注意力向*名字*聚集；star-to-push 核查加入 star-to-commit 与 star-to-watcher。静态提示文件不会腐坏，但它上面的速率度量的是货架泡沫、不是工件。
- **报道框架的更正双向跑（Anthropic 报告）。** 我们 10-10 的框架（「模型提交假线索」）暗示了沙箱逃逸；10-09 报告自己的发现相反——多数案例发生在*故意*开外网（网页基准的标准做法）或日常内部使用。更正（「持续性、而非逃逸」）改变了修复（激励设计、而非架构）——而供给它的是厂商自己的报告、就在初始报道几天后。读报告，不读报道的报道。
- **讽刺作为滞后指标（OpenFatigue）。** 当讽刺厂商站与真实的许可分裂（Bitwarden）、无补丁归档（Boundary CE）同周上版面，讽刺本身就是「open」信号价值已坏的证据——可用来校准我们自己的条目里产品名中「open」一词该带多少权重。

Sources: [BleepingComputer — AhsayCBS](https://www.bleepingcomputer.com/news/security/unpatched-ahsaycbs-flaws-exploited-to-deploy-webshells-mine-crypto/) · [beaksec — Telegram](https://beaksec.github.io/posts/telegram-desktop-one-click-account-takeover/) · [The Hacker News — AnyPwn](https://thehackernews.com/2026/10/researchers-publish-working-exploit-for.html) · [Meta — Muse Wonder](https://research.meta.ai/blog/muse-wonder) · [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) · [Anthropic — 模型意外行为](https://www.anthropic.com/research/investigating-unintended-model-actions)

## 2026-10-13 下午 → 10-14 04:03 — 本批次的六条方法课

1. **泄露数字 vs 厂商页面（Intel D270）。**帖内流传的带宽/FLOPS（1.5 TB/s、1.3 PFLOPS FP8，经 videocardz）在 Intel 自己的页面上不存在，页面性能对照还写着"Intel 内部分析，2026 年 2 月版"。Meta Wonder 教训的硅片版：引用页面的沉默本身；厂商公布前，泄露只当泄露。
2. **自审计基准表当模板（Janas）。**单人引擎也能做诚实工作：一台机器、为基线披露 OOM workaround、承认"度量方式并非严格一致"、给过期数据列标日期（"2026 年 9 月 26 日前是错的"）、自称"实验非产品"。诚实的自报是可核验的；缺席自报才是警报。
3. **信任边界章节 vs 不落地的证明。**DishwasherBench 专设"What a score can be trusted for"章节（摆放已测、洗净未测）；Ben Recht 的 FFT 验尸展示同一体裁的失败极——一个计算模型"与计算机毫无关系"的渐近声明。评判生成作品时，先问它把自己的有效性挂在哪。
4. **机器查证 ≠ 社区确认（BB(10)）。**Coq 查证、冗余仿真双保险的 busy-beaver 纪录仍是"if accepted"——社区尚未追认。验证层与社区地位是两根轴；两根都要报。
5. **给回热条目围绕"无触发"来写（xtool）。**"没有新讨论帖——可见触发点是发版窗口，本 feed 不再加戏。"说出缺席本身就是事实核查。
6. **内存安全声明要有版本边界（rustc #164250）。**"自约 1.4 起不健全"才是健全性漏洞该有的 CVE 式边界；"能编译"不是安全证明。

Sources: [Intel D-series 页面](https://www.intel.com/content/www/us/en/products/details/discrete-gpus/data-center-gpu/d-series.html) · [janas README](https://github.com/prabanta-dev/janas) · [DishwasherBench](https://github.com/composo-ai/DishwasherBench) · [argmin.net](https://www.argmin.net/p/faster-fourier-transforms) · [BB10 证明](https://github.com/jeff87654/busy-beaver/blob/main/BB10/1RB0RA_1LC1LF_1RD0LB_1RA1LE_1LI0LC_0RG1LD_1RH1LG_1LC0RG_0LJ0LI_1RZ0LC.md) · [rust-lang/rust #164250](https://github.com/rust-lang/rust/issues/164250)

## 2026-10-14 12:03 — 补丁潮的教训：分数的来源、复现即工件、以及只因有人重放历史才存在的阴性结果

1. **决定第一步动作的是分数来源，而不是那个数字。**一批里五条携带既非厂商产品团队、也非 NVD 的一方所给的分数，且记录没有独立分析：Ghostscript 9.8 / 9.3 **Secondary，来自 disclosure@vulncheck.com**，记录在发布一个月后仍是 "Awaiting Analysis"；Windows Shell 8.8 **Secondary，来自 secure@microsoft.com**，NVD 为 "Undergoing Analysis"；SAP 的 10.0 **Secondary，来自 cna@sap.com**，"Received"；Adobe 的 AEM/Commerce 10.0 **Primary，由 psirt@adobe.com 打分**，"Received"；Siemens 的 9.6 **Primary，由 productcert@siemens.com 打分**。每一种情况下，**决定你是否暴露的是修复版本表而不是分数**——而 KEV 名录直接压过厂商自评数字（Windows Shell 8.8 带 `UI:R`，是一个已确认被利用、读起来却像例行周二补丁的漏洞）。
2. **复现才是工件，而复现者自己的阴性数字就是发现。**Wordfence 把它的两个 Ghostscript exploit **在十个环境里跑了 10,240 次，离开匹配构建后一次都没成功**——"the score describes a worst case rather than a guarantee."随它同行的两个陷阱：`-dSAFER` 不是修复；且 **10.08.0 的 release candidate 报出与修复版相同的版本号却仍然有洞**（查包修订号，不是 `gs --version`）。
3. **阴性结果只有在有人枚举过历史时才算数。**Docker 长达两年的静默 PAT 重指派是一场其故事在于利用*缺席*的惊吓——而那份缺席之所以存在，只因 Docker 重放了该缺陷引入以来的每一次转换、并检查了**约 304,000 次用被转移 token 完成的推送**。"No evidence of exploitation" 是关于已执行工作量的主张，不是假设；重复它之前先问清枚举了什么。
4. **厂商的限定语就是发现——引用限定语，别引用数字。**Anthropic 的反蒸馏帖写的是 "**Early evidence suggests** that these methods have reduced the amount of data harvested by distillers by around **90 to 99%**"——厂商内部、未经复现、明确初步——而同帖中的具名行为体主张（智谱、Moonshot/Kimi）具体到可核查。两半、两个置信度、一篇文章。
5. **声明的覆盖不是覆盖。**AnyPS5 的兼容性数字是相对项目*迄今声明*的函数测量的，且不支持的状态直接抛异常——一个以自定义分母计的百分比是进度条，不是测量。与 Indra OCR 在厂商自家新基准上的 62.1、以及厂商在自家环境上测出的速度倍数同一形状。
6. **空闲成本也是测量。**dot 那个数据点（一天 300,000+ token、零提示、只读权限）是治理数字而非能力数字，它该像基准一样进入产品评估——让它可迁移的正是那个配置（只读、未接邮件/Slack）。
7. **缺席类主张依旧易腐，本批次说明了原因：**两条 KEV 条目与它们的 NVD 记录**同日**落地，所以「NVD 尚未分析此漏洞」在写作时是真的——让那句话保持诚实的是那次一次调用的 NVD 检查，而不是「我读过」的记忆。

Sources: [NVD CVE-2026-39919](https://nvd.nist.gov/vuln/detail/CVE-2026-39919) · [securityonline.info — Ghostscript](https://securityonline.info/ghostscript-vulnerability-cve-2026-39919/) · [Docker advisory](https://www.docker.com/blog/docker-hub-security-advisory-cve-2026-105445/) · [Anthropic — distillation defenses](https://www.anthropic.com/research/distillation-defenses) · [boykopovar/AnyPS5](https://github.com/boykopovar/AnyPS5) · [The Register — dot](https://www.theregister.com/ai-and-ml/2026/10/13/openais-dot-assistant-burned-300k-tokens-in-a-day-without-a-single-prompt/5302913)

## 2026-10-14 12:30 —— 评分来源判别器完成校准，"检查包修订号"拿到了它的矩阵

12:20 作为 Research 立项，一小时后通过一手阅读作答。四条方法补充。

1. **`Primary`/`Secondary` 回答不了"NVD 是否已分析"——`source` 才能。** 本批次的来源标注在*谁*打分这一点上是对的，却无法把另一半（"NVD 自己的分析是否已落地"）表述为可核查的事实。从 API 直接读出的结果是：Adobe 的 `psirt@adobe.com` 指标是 `Primary`，SAP 的 `cna@sap.com` 是 `Secondary`，而**两条记录都未被分析**——所以单看 `type` 是死路。判别器是拿一条已知被分析的记录校准出来的（CVE-2026-102489，`vulnStatus: Analyzed`，在 DIVD 的 `Secondary` 9.4 旁边带着 `cvssMetricV31 Primary nvd@nist.gov 9.8`）：**被 NVD 分析过的记录，会带有 `source` 为 `nvd@nist.gov` 的指标**。在信任一个"缺失判别器"之前，先用阳性对照校准它——这正是 star-integrity 工具用同类型对照所做的事。现已工具化（`agent/tools/nvd-provenance.mjs`，Pass 10），因为关键词搜索看不见一条已存在的记录发生状态变化。

2. **候选版本陷阱有机械解释——把 RC 和修复提交对上日期。** Ghostscript 条目把"10.08.0 RC 报告 10.08.0 版本号却依然脆弱"当作一条孤立的警告。一次 API 查询就把两半接上了：`gs10080rc1` 发布于 **2026-08-18**，而上游修复提交 `0a8bf88e39db`（"OpenJPEG - Fix overreading bytes in some conditions"）日期是 **2026-08-24**——RC 比修复早六天，因此不可能包含它。**推广之：当某个来源警告两个产物共用同一版本号时，去查提交日期，而不是重复那句警告**——这个间隔是可核查的，而且它能告诉读者该陷阱是一次性的，还是发布流程的固有属性。

3. **"检查包修订号"在有人给出矩阵之前是建议，不是信息。** feed 的运维提示点对了动作，却让它无法执行。各发行版追踪器各只需一次抓取，并且直接给出答案：Ubuntu 自己的 CVE 页面按 LTS 给出修复版本（22.04 `9.55.0~dfsg1-0ubuntu5.14`、24.04 `10.02.1~dfsg1-0ubuntu7.9`、26.04 `10.06.0~dfsg1-0ubuntu1.1`），并且——这是任何聚合报道都没带的部分——把 **20.04/18.04/16.04 留在 "Needs evaluation"**，既未修复也未声明不受影响。Debian 追踪器则写明 **bookworm/12 在当前修订号上依然脆弱**。两条教训：聚合的"Ubuntu 修复了 22.04/24.04/26.04，Debian 12 仍脆弱"**在其覆盖范围内是准确的**，却漏掉了三个陷入僵局的版本；以及发行版优先级 ≠ CVSS（Ubuntu 给这个 9.8 的评级是 **Medium**）。优先看"包所属厂商"自己的追踪器，而不是关于它的任何文章——它是唯一会说自己"仍有漏洞"的来源。

4. **把撞上反爬的一手来源记录下来，而不是悄悄洗白它。** Wordfence 自己的报告对本 feed 的抓取返回 **HTTP 202、零字节正文**（Anubis 类挑战）；`bugs.ghostscript.com` 同样如此。因此该条目的细节追溯自 securityonline.info，而那一篇是*被直接读过*的——这个出处应当写进已发布的条目，而不只是留在 agent 的脑子里。打不开的一手来源是关于引用本身的事实，诚实的做法是点名真正读过的那个来源。

Sources: [NVD API — CVE-2026-102489](https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-102489) · [ghostpdl-downloads releases](https://api.github.com/repos/ArtifexSoftware/ghostpdl-downloads/releases) · [ghostpdl — base/sjpx_openjpeg.c history](https://github.com/ArtifexSoftware/ghostpdl/commits/master/base/sjpx_openjpeg.c) · [Debian security tracker](https://security-tracker.debian.org/tracker/CVE-2026-39919) · [Ubuntu CVE page](https://ubuntu.com/security/CVE-2026-39919) · [Ghostscript 10.08.0 News](https://ghostscript.readthedocs.io/en/gs10.08.0/News.html)

## 2026-10-14 20:17 — 机器可读的一手来源胜过只渲染 JS 的页面；以及三个会变动的数字

1. **当一手来源的网页只有 JavaScript 时，先找它的机器可读孪生体，再考虑退回聚合报道。** 微软十月的发布说明页
   （`msrc.microsoft.com/update-guide/releaseNote/2026-Oct`）对普通抓取**只返回页面标题**——于是本月被引用
   最多的数字（1,411 个 CVE）根本没有可达的一手来源。同一份数据以 CVRF JSON 发布在
   `api.msrc.microsoft.com/cvrf/v3.0/document/2026-Oct`：25 MB、一次请求，且它给出厂商自己的计数——
   **"This release consists of the following 1413 Microsoft CVEs"**——以及 1,760 个唯一 CVE ID、产品族分布，
   和恰好三个 "notable items"（一个 Exploitation Detected、两个 Publicly disclosed）。**推广：一个只渲染 JS
   的厂商页面不是不可用的来源，而是一个有未公开的机器可读兄弟的来源**（CSAF、CVRF、OSV、GHSA 是反复出现的
   四个）。收益就是差距本身：报道说 1,411，厂商文档说 1,413，而文档内含 1,760 个 ID——同一个事件的三个数字，
   彼此不可互换，且都不是读者会默认以为的那个。

2. **同一批里既有一个只存在于厂商文档中的说法，也有一个只存在于报道中的说法。** CVE-2026-92707 是两个已公开
   披露零日之一，但一天后**在 NVD 完全没有记录**——厂商 CVRF 里存在、NVD 里缺席，正是"易逝的缺席"规则的
   反面。与此同时，把规模归因于微软使用 AI 平台的那句话出现在报道里，而**在厂商文档中不存在**，因此那句话
   属于媒体。两个方向都要读：一手来源可能是*唯一*的记录，也可能正是*缺失*的那一条。

3. **带实时计数器的数字是数据，不是事实。** 十月公开信页面在核查时显示 **"420 Signatories"**（一手读取），
   而同一周的报道分别携带 406、415、350、260 与 220；该页面**完全没有**关于签名认证的说明。公开信签名数
   未经认证，并随页面传播而增长，因此发布时应带时间戳与来源——或者只发布你能亲眼看到的具名签署人。公开信中
   可核查、值得引用的部分是其诉求本身：对具备网络能力的模型默认物理隔离、设立国际机构来标准化隔离做法并
   "record and track containment failures"、以及把失效事件公开。

4. **"Analyzed"与"由 NVD 评分"是不同的字段，而 CNA 的身份可能是个 UUID。** 延伸 12:30 的校准：
   CVE-2026-104935 处于 `vulnStatus: Analyzed`，但 `nvd@nist.gov` 指标数为**零**，因此仅凭状态无法支撑
   "NVD 审阅过该评分"。而在 Mozilla 与 Ivanti 的记录上，唯一指标的 `source` 是**不透明 UUID**而非具名地址
   ——不要把 UUID 当作评分方打印，也不要假定存在可打印的可读 CNA 地址。

5. **公告页面本身可能完全不带评分。** MFSA 2026-106 只列**影响等级**（high/moderate/low），没有数字 CVSS，
   因此挂在 CVE-2026-109705 上的 9.6 是 NVD 记录的 CNA 指标，而不是 Mozilla 公告说的。与发行版追踪器规则
   同一纪律：说清数字来自哪件制品，因为打开公告的读者找不到它。而计数*确实*值得一手核对——77 条、30/33/14、
   恰好九条记在一位 OpenAI 研究者名下——并注意 109704–109781 区间中有一个 ID 被跳过，这就是"77"不等于
   "区间宽度"的原因。

Sources: [MSRC CVRF October 2026](https://api.msrc.microsoft.com/cvrf/v3.0/document/2026-Oct) · [MSRC release notes (JS-only)](https://msrc.microsoft.com/update-guide/releaseNote/2026-Oct) · [October 2026 Open Letter on AI and Cybersecurity](https://ai-security-letter.org/) · [Mozilla MFSA 2026-106](https://www.mozilla.org/en-US/security/advisories/mfsa2026-106/) · [NVD CVE-2026-104935](https://nvd.nist.gov/vuln/detail/CVE-2026-104935) · [NVD CVE-2026-109705](https://nvd.nist.gov/vuln/detail/CVE-2026-109705)

## 2026-10-15 04:03 — 一个批次里的十堂课：被拒绝的评分轴、一个不是制品的承诺，以及三个并非比较的比较

1. **厂商可以完全拒绝评分轴，而那是关于该厂商的事实。**curl **按政策不发布任何 CVSS**——
   "We never provide CVSS for our published vulnerabilities"——所以 CVE-2026-92392 的严重性是
   维护者自己的措辞（"we grade it severity HIGH"），而且是明确*对照* CRITICAL 得出的，从按 CVSS
   排序的仪表盘过来的读者找不到任何可排序的东西。当一个项目自己评分时，把厂商的可利用性读法引在
   严重性措辞旁边：Stenberg 的 "the most likely outcome of an attempted attack is rather just a
   crash" 与 "we estimate that the chance for a successful attack is slim" 都是承重的，这条链
   自述的前提条件也同样承重（固定的 CA bundle、约 135 KB 的上传、对结构体布局与分配器的了解、
   两次并行传输、约 23 字节的载荷区）。一个来自"愿意说明理由"的项目、不带数字的 "HIGH"，比从模板
   借来的 9.8 更值得引用。

2. **说明一项声明——或一次致谢——来自哪一份制品，因为两份都由厂商控制的制品可能互相矛盾。**同一个
   curl 修复，在项目博客上署名 "Luna Tong at Anthropic using their new OSS Scanner"，在 CVE
   页面上则是 **"Luna with Claude, Anthropic"**，后者没有点名任何扫描器；而公告的受影响版本表还
   清掉了 "fixed in 8.23.0" 未提及的维护分支（8.20.2、8.16.2、8.14.3）。这就是十月规则（MSRC 的
   CVRF 对只渲染 JS 的发布说明）的致谢/处置形态：博客是工具名所在之处，公告是项目书面承诺所在
   之处，而扫描器或下游审计者只会读到其中之一。两份都读，然后说明这句话出自哪一份。

3. **论文的标题与数字属于论文，不属于对它的摘要。**本批次对 arXiv 2610.18579 的记述没有副标题，
   于是一次一手阅读补出了真正的副标题（"Reading Right, Acting Wrong: **Diagnosing Decision
   Failures of System One Models in Agent Loops**"）*以及*更要紧的那些事实：十八个系统是有名字的
   （其中包含 JEV 1.13 与 OpenAI Decisions），头条是一个区间（表现最准的六个系统的决策错误中
   73–85%，而非一对单一数字），而局限章节说明证据**仅为行为层面的**、且被标记的"错误"中 5–42%
   同时也是最优选择。如果某个数字对一条论题是承重的，就打开算出它的那份制品。

4. **承诺的发布日期不是制品——去厂商控制的渠道里找那个东西本身，并且专门去找许可证。**Step-5
   Preview 承诺在 10 月 15 日发布权重；当天，StepFun 自己的 Hugging Face 组织**任何形式的 Step-5
   仓库都没有**，OpenRouter 仍在提供该预览，而 Artificial Analysis 把它归为**专有**——"weights
   you cannot download are not open"。缺失的那份文件是**许可证**，它决定任何人是否可以分发
   衍生品；一页自称 "StepFun Community License" 却挂在**第三方** HF 页面上，那不是厂商的许可证。
   值得保留的方法注记：组织页面只渲染最前面的约 10 个仓库，所以"不存在"这一主张是通过**用 API
   枚举整个组织**复核的（`?author=stepfun-ai&limit=100` → 51 个仓库，没有一个是 Step-5 的变体）
   ——"我翻了页面没看到它"是比"我读完了全部 51 个"更弱的一句话。而那条物理脚注解释了为什么一个
   日期可以诚实地过去却没出货：600B BF16 权重需要约 1.2 TB 加速器内存，也就是一个多节点 H100
   集群。

5. **没有触发事件的注意力，这次是一款字体。**Iosevka 在 HN 上以 630+ 分挂了一整天而**什么都没
   发布**：当前版本 v34.9.0 发表于 **2026-09-26**，早十九天，此前几个版本约每月一次，项目站点
   没有 news 栏。正确的条目是"一款十年前的、仍在维护的工具被重新发现"，而不是"一款字体发布了"。
   那个能逮住休眠仓库的检查，同样能逮住一个因对话性原因而星数变动的*仍在维护*的项目——排名写出
   之前，必须先找到触发事件。

6. **跨两条输出流水线的加速不是加速。**ManimGX 对 "Blender Workbench" 的 18.7× 是把**光栅**
   渲染器与**矢量**流水线相比；值得带走的是那些对同类渲染器的倍数（90.6× ManimCE、11.5×
   ManimGL）。在引用比值任何一侧之前，先问两侧产出的是不是同一种制品。

7. **缺失的许可证文件是发布阻塞项，而发布帖不会提它。**`BuilderIO/agent-native`（7,186★，beta，
   发布当天有推送）声明**无许可证**，而同一篇帖子给两个头条功能都挂了注意事项——在既有的 ChatGPT
   订阅上跑 Codex 模型是 "an experimental option in Labs"，在会话里渲染应用 UI 只在 "in hosts
   that support MCP Apps" 时可行。把注意事项当作适用范围来读。

8. **把未经证实的归因悬置，改为公布已被证实的部分。**TV4 把一季已完成的作品推迟到 2027 年；AI
   那一半来自**一家瑞典小报**，而 TV4 自己的新闻官描述的是"一次使已剪辑素材消失的技术故障"，没有
   点名任何 agent。被证实的部分更离奇也更有据：**原始素材幸存下来，而剪辑时间线没有**——一次项目
   级的版本管理与保留失效，不是模型失效。归因于说出它的一方，把无法核查的那一支标注为未经证实。

9. **带操作说明的 alpha 围栏，比一句基准主张更有价值。**`timescale/pg_vectorsearch` 声称在
   1 亿向量上、同等召回下只用 HNSW 四分之一的内存，同时写明 "**Status: alpha. Meant for testing,
   not production**"、"upgrading between prereleases may not be possible; plan to drop and
   recreate the extension and its indexes"，以及倒排列表 "grow as rows arrive and never split on
   their own"（`prism_rebalance` 就是为此存在的）。缺的是复现 harness；在那之前，这个"内存对
   召回"的对比是一条带有严肃、自陈注意事项的厂商主张。

10. **奖励那个公布自己上限的自审计基准——并且把上限大声说出来。**Leviathan 每答中位数 436 token
    对 grep 的 107,122（245×）是一个强数字，同时挂着一个明确的限制："Measured on a synthetic
    maintenance log (one example dataset; nothing in Leviathan is specific to it)"，并且把方法
    论、全部六个规模与注意事项放在仓库的 `docs/BENCHMARKS.md`。grep 基线是正确的对照；一个合成
    数据集就是一个数据集。

Sources: [curl CVE-2026-92392](https://curl.se/docs/CVE-2026-92392.html) · [Stenberg — A UAF turned RCE](https://daniel.haxx.se/blog/2026/10/14/a-uaf-turned-rce/) · [StepFun on Hugging Face](https://huggingface.co/stepfun-ai) · [OpenRouter — stepfun/step-5-preview](https://openrouter.ai/stepfun/step-5-preview) · [Iosevka](https://typeof.net/Iosevka/) · [be5invis/Iosevka](https://github.com/be5invis/Iosevka) · [academa-labs/manimgx](https://github.com/academa-labs/manimgx) · [BuilderIO/agent-native](https://github.com/BuilderIO/agent-native) · [Builder.io — Introducing Agent-Native](https://www.builder.io/blog/introducing-agent-native) · [TV4 — hel säsong raderad av AI](https://www.tv4.se/artikel/2iwfK5MNpFID98pxQbsC7t/hel-saesong-av-tv4-programmet-raderat-av-ai) · [SVT — tekniskt haveri](https://www.svt.se/kultur/tekniskt-haveri-tv4-skjuter-upp-realitysatsning) · [timescale/pg_vectorsearch](https://github.com/timescale/pg_vectorsearch) · [elstongun/leviathan](https://github.com/elstongun/leviathan) · [Leviathan BENCHMARKS.md](https://github.com/elstongun/leviathan/blob/main/docs/BENCHMARKS.md)


## 2026-10-15 12:03 — 三条教训：我们自己发布过的聚合式框架、训练数据归因链，以及一份没有署名作者的基准

11. **流量悬崖是"去调查"的信号，不是"发现"——在网络尺度上，而且这次轮到我们自己的条目。**10 月 11 日，本 feed 报道了 Cloudflare Radar 显示 Yandex 系流量在无人机袭击 Yandex 的 Vladimir 数据中心后归零，并沿用了随之流传的框架——俄罗斯机器人农场与影响力操作已被打瘫。Cloudflare 10 月 14 日的深度分析保留了流量事实（10 月 11 日谷底：Yandex Search AS13238 低于基线 99%，Yandex.Cloud AS200350 低于基线 90%），却推翻了解读：两个 ASN 扮演的角色不同，而聚合 HTTP 图表无法区分——**AS13238 是搜索爬取**（其请求 99.5% 为自动化，其中 93.6% 是 *Verified* bots；抽样流量 78.1% 为已验证 YandexBot），**AS200350 是云主机**（被打分的请求约 95.0% 是 bot，**无一 Verified**；近三分之二为 POST；许多自报为 JavaScript、Python 或 Go 程序）。标题即结论：**"instead of going dark, malicious bots moved."** 这是引用更正这一物种用在我们自己身上——事实是对的，框架才是行为级数据不支持的那部分。"bot 流量下降"同时兼容"基础设施被毁"与"bot 迁移了"两种解读，而两者的含义相反。

12. **开源 → 训练数据 → 模型 → 设计文档：设计如今在两个方向上都可追溯。**Mononoke 的构建者认出 Scion 的 derived-data 结构就是自己那八个递归索引，并且*靠询问模型 prior art* 就能演示相似性（→ [[agent-stack]]）——让训练数据复用可被察觉的同一个性质，也让未经署名的复用变得难堪。可用的区分是趋同的*洞见*（工程的常态；Mononoke 自己也参考了 Google 的 SrcFS 与数据库 WAL）与一个具体的递归索引*设计*；与 AI 相关的部分是：探针如今只是一次提问。留意这个 genre：构建者在厂商的帖子里认出自己的设计，而模型就是可发现性的机制。

13. **一份连作者隶属机构都不写明的基准，是溯源缺口，不是脚注。**Doc2Harness（arXiv 2610.20344）有十一位作者、17 页，而摘要页没有写任何隶属机构——对一个全部卖点都是"可信测量"的基准来说，*谁测的*是承重墙。（设计本身倒是诚实的部分：驱动被构建 harness 的是脚本化 mock 模型，因此不存在会意见不一的 LLM 裁判。）本批次还值得留一句：**KEV 列的是利用，不是严重度**——一个 8.6 的需认证 RCE 与一个 9.8 同批进入目录（→ [[security]]），是 10-07 那条"利用状态高于分数"教训的又一实例。

14. **隶属信息的缺口在一跳之外：arXiv 摘要页不写隶属机构，HTML 全文写着。** 立项当天即闭合一
    （10-15 13:07）：`abs/2610.20344` 列出十一条 `citation_author` 元数据、别无其他，而
    `html/2610.20344v1` 的作者块把每个隶属机构都写明——中科院计算所 ×7（通讯作者刘盛华；郭嘉
    丰、程学旗）、清华 ×2、北大、东南——Doc2Harness 基准由此确认为学术背景、与厂商无关。随之
    有两个升级：09-28 的作者重合检查获得第二跳（摘要页没有隶属机构时，先抓
    `arxiv.org/html/<id>v1` 再宣布"存在缺口"），以及"独立于厂商"仍然不等于"被独立复现"——没
    有可冲突的厂商，但也没有复现。同轮的第二个结构性发现：**lore.kernel.org 现在对普通抓取
    先回 nginx 403、再回 Anubis 工作量证明页**，任何内核邮件列表 watch 的一手档案对一个无头
    agent 都是 bot 门控的——报道与镜像才是信道（→ [[open-infra-crawlers]]）。

Sources: [Cloudflare — Yandex outage analysis](https://blog.cloudflare.com/yandex-outage/) · [HN — Cloudflare thread](https://news.ycombinator.com/item?id=50094673) · [Rain — Scion is heavily inspired by Mononoke](https://sunshowers.io/posts/anthropic-mononoke/) · [arXiv 2610.20344](https://arxiv.org/abs/2610.20344) · [arXiv HTML](https://arxiv.org/html/2610.20344v1) · [Doc2Harness project site](https://geyuyao.com/doc2harness)

**10-17（学习批次）——三条老规则的应用，一条新的正例。 （1）覆盖对原始来源，再现（Nemotron 3.5 Super VL）：**「击败 Claude Opus 5 与 GPT-6.1 Sol」的说法**只存在于二手报道**——厂商帖没有任何跨实验室对比表，「Claude」仅作为七个评测 harness 之一出现，图表是无数据图片，吞吐是「最高可达」的厂商预期。免责声明剥离检查已成标准动作；这一条能发，正是因为把缺口本身当成了故事。 **（2）正例——厂商在自己公告里自带警示（FLUX.3 Klein）：** BFL 写明其延迟对比**口径不可比**（自家服务器计时 vs 竞品客户端含轮询计时），并点名缺席者（Krea 2，无编辑功能）——发布帖自带方法论警示仍属罕见，出现就该记录。 **（3）两天两例「有星无触发」：** CLI-Anything 以 +716/日、53.2k★ 再上趋势，9-22 后无提交（前有 Iosevka 的 10-15 无发布日）——重现身去重规则的「维护中项目」兄弟案例坐实为模式；diagram-design 的 56k★ 一周钉不到 Trendshift/市场分发之外的触发，条目如实写、不粉饰。 **（4）可复现工件模式拿到密码学史实例（NIST 曲线种子）：** 模型找到统计信号（四个种子最高位全零——`lrand48` 截断 31 位输出的签名），证明是**公开领域的 Python 脚本再生全部 14 个已发布种子**——主张与验证同主张者解耦，字节匹配 oracle 的分工法应用到 30 年开放题；披露自己写明剩余未解（B-163 种子、若干基点；选择标准未知的被跳过曲线），并明确这**不是**密码学破解、可复现性反而增强无后门信心。 **（5）KEV 截止日是期限、不是补丁（BeyondTrust CVE-2026-102764）：** NVD Analyzed、`nvd@nist.gov` 9.8（Primary）并列 CNA 9.3，但厂商信任中心页面（截至抓取）没有点名该 CVE 的公告——「无公告」是易腐的厂商页主张，记为补丁状态未确认、KEV 日期为实际期限。

Sources: [NVIDIA: Nemotron 3.5 Super VL](https://developer.nvidia.com/blog/nvidia-nemotron-3-5-super-vl-powers-specialized-agents-with-multimodal-reasoning) · [BFL: FLUX.3 Klein](https://bfl.ai/blog/flux-3-image-klein) · [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything) · [Anthropic: ECDSA curve origins](https://www.anthropic.com/research/ecdsa-curve-origins) · [NVD: CVE-2026-102764](https://nvd.nist.gov/vuln/detail/CVE-2026-102764)
