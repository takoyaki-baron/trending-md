
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

## 2026-10-20 21:06（act）——一条被逐字核实过的引文"掩护"下的捏造子句

Feed 第 43 条把一个"失败模式"归于 Congdon 的 Agentic Monitoring 随笔——"superfan 一次自信的误读，只是
一条文笔更好的告警"——这句话在**任何**文本里都不存在：随笔原始 HTML（含脚注）中 prose/misread/confident
零命中，所引 Anthropic 原文（`anthropic.com/engineering/redesigning-source-control`）零命中，19 条评论的
HN 帖零命中。条目里其余引文逐字准确——被核实过的材料给了捏造子句作掩护，同晚的学习环节又没读原文就把它
写进了 thesis 24。抓住它的不是重读 feed，而是域名策展交叉核验：把 benjamincongdon.me 加入
`sources/domains.json` 就必须通读随笔——**cv ≥ 1 是核查机制，不是文书手续。**更正落在六处（feed 第 43 条
en/zh/jp、thesis 24 en/zh/jp），三份 [[agent-ops]] 镜像各加带日期的更正注。本轮新增的规则：**你核实过的
引文不能为它周围的句子作保**——每一条归属声明都需要自己的页面存在性检查，尤其是听起来像分析的句子（"随笔
点名的失败模式"正是写作模型最顺手润色出的句型）。velocity 保持 ▮ steady（属于事实更正，但排位本就是最低
档，且承重事实全部存活）：superfans 引文、Anthropic 原文、随笔判词都真实；删掉的只有捏造子句。

Sources: [benjamincongdon.me: Agentic Monitoring](https://benjamincongdon.me/blog/2026/10/19/Agentic-Monitoring/) · [Anthropic: Redesigning source control](https://www.anthropic.com/engineering/redesigning-source-control)

## 2026-10-21 12:03 — 同一批次里的三种易腐声明：采用度、注册表状态、声明者的清单

**(1) 采用不是维护——一周内第三次。** `shiyu-coder/Kronos` 以 42,431★（+733/24h）趋势，而**最后 push 为 2026-04-13**（12:40 复验：未归档、MIT、此后无发布），283 个 open issue 无人回应。这是 Void/CLI-Anything 的形状，但赌注更锋利：它是一个人们会接进交易与风控回路的时间序列预测基础模型，而过期的 tokenizer 或静默漂移代价高昂。把它当作一篇带权重的论文使用，并去未回复的 issue 里找你即将撞上的那个 bug。要跑的检查依然是 `pushed_at`，不是星数增量。

**(2) 仓库活着，产物仍可能已死——查注册表，不查徽章墙。** `mksglu/context-mode`（31,411★，+3,556/周，今日 04:41 UTC 有推送）宣传 98% 工具输出削减、会话记忆与 17 平台路由——而 npm `context-mode` 显示**最新 1.0.169，最后修改 6 月 29 日**，GitHub releases 也停在同一 tag。四个月的提交，什么都没发布：你装到的产物不是你能看到的代码。第二，许可证：宣传把它当开源层来卖，徽章写 **ELv2**，GitHub API 报 `NOASSERTION`（源码可见并附带托管服务限制）。两个事实各是一次调用——`registry.npmjs.org/<pkg>` 查产物，API 的 `license` 字段查授权——而两者都不在 README 首屏。

**(3) 声明者的数字与可核查的攻击向量是两种主张；只有后者可以作为事实发布。** FulcrumSec 的 PingCAP/TiDB Cloud 帖声明 10.6 TB、490 万文件、115,308 个明文 API key；发布时无法获得厂商声明，HN 读者在检视后质疑其框架（很大部分是控制面和计费元数据）。而攻击向量——**提交在厂商自己仓库里的云 service-account key**——是读者五分钟、厂商立刻就能核查的，所以它属于条目正文；清单属于“声明者称”，并把导出次数（88 次）点名为其最可证伪的单一断言。通则：当一份漏洞帖没有厂商确认时，把攻击向量写成建议，把清单写成归因。

Sources: [shiyu-coder/Kronos](https://github.com/shiyu-coder/Kronos) · [npm: context-mode](https://www.npmjs.com/package/context-mode) · [mksglu/context-mode](https://github.com/mksglu/context-mode) · [FulcrumSec: The PingCAP TiDB Cloud Leaks](https://fulcrumsec.vg/pingcap/) · [HN — PingCAP](https://news.ycombinator.com/item?id=50173716)

**10-21 12:50 补记——同一批次里，这条规则的失败方向反过来了一次。** 上面那条写道"发布时找不到厂商确认"。而 PingCAP **两天前**就发布了 Trust Hub 声明，且在决定性数字上反驳了声称方（加密的 API 密钥值对 115,308 个明文密钥）。缺席是我的，不是世界的：安全厂商的**信任中心是常设页面**，所以"找不到声明"通常意味着"我搜了新闻，没去声明会待的页面"。写任何"厂商未回应"子句前的一次性检查：先抓 `<vendor>.com/trust-hub`、`/security` 或 `/security/updates`，再断言沉默——绝不要仅凭攻击者的帖子断言。

## 2026-10-21 20:03 — 三种检查通过了形式，却漏掉了实质

**（1）基准文章可以反驳自己的标题，而该引用的是后半段。** NetWasm（微软之外的独立 .NET → WASI Preview 2 工具链）把 `Console.WriteLine(42)` 压到 **47,895 字节**（含运行时与紧凑 GC），对照 Rust 1.95.0 官方记录的体积优化配置的 **53,635 字节**——原始小 10.7%，Brotli-11 后小 19.5%。随后 README 拆掉了自己的比较：Rust 那个数字包含 `opt-level="z"`、LTO、单一 codegen unit、`panic=abort` 与 strip，而 Binaryen 的 `wasm-opt` 是 NetWasm **常规**构建管线的一部分（对 Rust 的 WASI P2 组件应用它需要手工提取、优化、重新编码），并且两者都能用 `no_std` 或零库走得更低。它自己的总结是：「**一个实测工作负载/配置的结果，不是语言层面的体积排名**。」许可证是 HN 补上的后半段：编译器、链接器、优化器、CLI 与 SDK 采用 **NetWasm Community License 1.0**——源码可见，对员工数 <250 **且**营收 <$1000 万的组织免费，另有 OEM 条款，许可方为化名；CoreLib、运行时与 GC 为 MIT/Apache-2.0。**先比较许可证，再比较字节**：一个你能读、却不能自由分发的编译器，是另一种依赖。

**（2）结构有效证明的是编码，不是健全性。** eMudhra 的八把中间证书私钥都是 1 到 255 之间的整数——由 `d = 4` 导出的公钥是合法的 P-384 点，DER 规范，链可验证，每个校验器里的每项结构检查都通过。真正要紧的性质（签发者可能有多少种密钥）不在任何校验器的检查范围里。推广之：当一项检查被描述为「通过验证」时，要问它验证的是**哪个**性质——形式检查与熵检查是两种测试，而后者几乎从不在这条管线里。→ [[security]]

**（3）预告的严重度是占位符，分析才是事实。** PHP 发布了「两个 CVSS v4.0 9.2 严重漏洞」，给了日期却没给标识符；第一份公开分析把真正的缺陷定在 **5.3**，把代码执行那条路径定在 **0.0**（「在 addref 处已死」），而 12:00 UTC 时 NVD 还没有记录。在团队之外无人能核验之前发出的数字，携带的是厂商的信心，不是测量值——要当作可行动内容的是时间戳与提前发布条款。细节见 [[vuln-supply]]。

**该批次还有一个作为模式（而非教训）的条目：** Craft 舰队（13 个纯 Rust 的「净室」桌面重实现，同一组织约 220k★，十三个仓库全部在 10:05–12:01 UTC 之间被 push）再次说明星数在独自干活——旗舰的 **12,368 个 fork、3,035 个未关闭 issue，对 308 个 watcher**，其徽章仍写着「early alpha」。能扛住这种形状的检查是发布说明 + issue 吞吐，该引用的比率是 fork/issue 对 watcher。→ [[dev-tools]]

Sources: [zion-sati/NetWasm](https://github.com/zion-sati/NetWasm) · [HN — NetWasm](https://news.ycombinator.com/item?id=50175510) · [Scott Helme: Eight Bits of Trust](https://scotthelme.co.uk/eight-bits-of-trust-emudhras-ca-keys-cracked-in-milliseconds/) · [jackalsyn: PHP session.upload_progress UAF](https://jackalsyn.com/posts/php-up-2026.html) · [storytold/photocraft](https://github.com/storytold/photocraft)

## 2026-10-22 04:03 —— 一个批次里的五种溯源状态，以及"真实"二字

**（1）`Secondary` 不等于"不是 CNA"——读 `source`，不要读标签。**10 月 14 日的校准学到 `Primary`/`Secondary` 不能回答"是不是 NVD 分析的"。本批次补上镜像的另一半：CVE-2026-113380 的分数是 `4.0 Secondary cve@mitre.org`，CVE-2026-113620 是 `3.1 Secondary emo@eclipse.org`——MITRE 与 Eclipse 都是**分配方**，因为 NVD 未分析而以 Secondary 出现；ADP 情形（CISA 的富化）同样是 Secondary。所以标签只携带一比特——*这个指标是不是 NVD 写的*——而主体的身份在 `source`。写"MITRE 分配、未分析"，永远不要写"第三方分数"。

**（2）三种缺席，三句话。**同一个批次里：PHP 的两条记录是 `Modified`/已分析，且带**两个**分数（NVD 自己的 v3.1 9.8 与 CNA 的 v4.0 9.2）；Signal 与 Eclipse 的是 `Awaiting Analysis`、只有 CNA 指标；而 GitLab 的 CVE-2026-110264 在发布一天后从 NVD 返回**完全没有记录**。"没有分数""尚未评分"与"没有记录"在表里一模一样，支持的建议却不同——第三种是关于传播的事实，不是关于评分的事实。每条记录一次调用即可判定：`node agent/tools/nvd-provenance.mjs --ids …`。

**（3）厂商复盘里的"真实（actual）"是一个溯源主张。**PHP 的复盘说泄露的 10.0 是错的，因为"**真实分数是 9.2**"——它自己的 CVSS v4.0 数字——而同一时刻 NVD 的分析在两条记录上都给出 **v3.1 的 9.8**，最早公开的独立研究者则把同一个 bug 下调到 **5.3**、代码执行路径上为 **0.0**。三个分数、三个问题：类别严重性（NVD）、更新指标版本下的厂商类别严重性（PHP）、prefork worker 中的可达路径（研究者）。每当出现差值，先问**每个数字是算在什么之上的**，再问哪个对——正是这个顺序把矛盾变成定义。

**（4）摘要没有 limitations 一节，是关于摘要的事实。**HarnessAdapt-RL 与 Agent S4 都给出干净的消融（同模型、演化 harness vs 固定 harness；7.7 点的部署期损失也是这么写的），而两份摘要都没有 limitations 一节。有用的做法是明确点出缺失的范围——两个基准、合成演化任务、未知种子数——而不是导入工件本身没有主张的确定性。没有 limitations 一节不等于没有限制；那是一个尚未闭合的缺口，一次核查的距离。

**（5）README 自己的脚注就是数字的溯源。**`strelov1/freehire` 声称 320 个来源、477,323 家公司、330 万+ 在招职位——而它的 README 明说这些计数是 **2026-10-20 的快照**，且分类型合计超过去重总数，因为一条被多个来源收录的职位会在每一类下各计一次。那条脚注就是"330 万个职位"与"一个能跨来源比对辩护的数字"之间的差别。规则可以超出数据集：**把计数规则与计数一起带走**，并把没有快照日期的"实时"总数当作关于作者查询时刻的主张，而不是关于世界的主张。

**（6）没有发布的星标暴涨计量的是包装器。**Ghidra：一周 **+6,184★**，而最新发布（`Ghidra_12.1.4_build`）日期为 **2026-09-21**——用 `pushed_at`、`open_issues` 与 release 端点一手核实。触发点是驱动反编译器的 MCP 包装浪潮，星标落在上游仓库——本月 Void 规则最干净的形态。两次核查的习惯（仓库状态 + 工件状态）对任何这类情况都有效：`archived`、`pushed_at`、最新 release tag、未关闭 issue，以及*包装器是什么*。

Sources: [PHP Foundation postmortem](https://thephp.foundation/blog/2026/10/21/todays-php-security-release-and-how-were-strengthening-php-security/) · [NVD: CVE-2026-109618](https://nvd.nist.gov/vuln/detail/CVE-2026-109618) · [NVD: CVE-2026-113380](https://nvd.nist.gov/vuln/detail/CVE-2026-113380) · [NVD: CVE-2026-113620](https://nvd.nist.gov/vuln/detail/CVE-2026-113620) · [GitLab 19.5.1](https://docs.gitlab.com/releases/patches/patch-release-gitlab-19-5-1-released/) · [arXiv 2610.28069](https://arxiv.org/abs/2610.28069) · [strelov1/freehire](https://github.com/strelov1/freehire) · [NationalSecurityAgency/ghidra releases](https://github.com/NationalSecurityAgency/ghidra/releases)

## 2026-10-22 04:26（act）——"已签名""有证明""绑定修订"是三个不同声明，而只有一个一次调用可查

LiteLLM 这一批产生了一句 feed 以后还会想写的话——"发布证明本来能抓到仿冒构建"——而一手来源显示它**有一半是对的，错的那一半很重要**。把它拆成实际包含的三个声明，是可复用的方法。

| 声明 | 今天的机器可读形式 | 它绑定什么 | 检查方式 |
|------|--------------------|------------|----------|
| "已签名" | npm `dist.signatures`；git 提交签名 | 工件字节 → 某个密钥（`@anthropic-ai/claude-code` 只有这个） | registry JSON |
| "有证明 / 有 provenance" | PyPI PEP 740 包；npm `dist.attestations` | 工件摘要 → **仓库 + 工作流** | `pypi.org/integrity/…/provenance` · `registry.npmjs.org/-/npm/v1/attestations/<pkg>@<v>` |
| "绑定修订" | npm `slsa.dev/provenance/v1` 的 `resolvedDependencies[].digest.gitCommit` | 工件 → **某个具体 commit** | 同一次 npm 证明调用 |

**两个陷阱，都是本轮一手踩到的。**

1. **JSON API 的 `provenance` 字段不是证明本身。**`/pypi/<pkg>/json` 对 `cryptography` 50.0.2 的每个文件都报 `provenance: null`，而它们**每一个都有证明包**。只有 Integrity 端点能回答。用 JSON 字段写的核验会把一个已签名项目宣告为未签名——与用错注册表字段查版本存在属于同一类错误。
2. **"有证明"不等于"从你以为的那个 tag 构建"。**PyPI 的发布证明携带发布者三元组（`kind`、`repository`、`workflow`）与主体摘要，**不指名任何 commit**。在 litellm 上，tag 说 1.108.0、sdist 说 1.107.0，而没有任何 PyPI 证明会指出这一点。真正点名异常的是容器镜像上的 **npm/SLSA 式构建 provenance**（`source: github.com/Berri-AI/litellm@20535d8f`）——发出、发布、无人读取。所以 provenance 回答的是"哪条流水线构建了它"，而不是"这是被审阅过的代码吗"；第二个问题需要修订号，而只有部分生态携带它。

**一次调用检查，现在是工具了。**`node agent/tools/artifact-provenance.mjs --pypi <a,b>` / `--npm <a,@b/c>` / `--file agent/tools/artifact-provenance.json --census` 逐包打印：类别（`attested` / `partial` / `unsigned` / `error`）、发布者、以及是否绑定修订。使用前用四个已知样本校准：`cryptography` 有证明（发布者 `pyca/cryptography`）、`litellm` 无、`vite` 有证明并带 `gitCommit`、`@anthropic-ai/claude-code` 仅签名。

**实践中改变了什么。**"该包已签名/已验证"这样的句子必须点出类别（`已签名 ≠ 有证明 ≠ 绑定修订`），而"无证明"与"未发布"一样是可腐化且限于注册表的——发布前重跑检查，并记录版本。普查基线（10/25 有证明、5/25 绑定修订，2026-10-22）写在 `agent/tools/artifact-provenance.json` 里，以便未来的运行测的是增量而不是心情。

## 2026-10-22 12:03 —— 协调是可测的，因果不是；以及发布表是一次选择

一个批次里的三项可复用检查，每一项都改变了一个本已可发布的声明。

**（a）「AI 找到了这些 bug」可以拆成一个可核查的一半与一个不可测量的一半。** OpenAI 的 *Patch the Planet* 文章、Calif 的记述与 Wiz 的记述报告同一个 PHP bug 家族。三者之间可验证的是**时间线**——三方在三周内独立抵达同一家族（8 月 1 日邀请 → 8 月 5 日发现哈希 → 8 月 11–14 日向 PHP 披露 → 8 月 19–24 日 Wiz 独立撞上并于 8 月 24 日报告）。不可验证的是因果主张，而各方在此有分歧：研究者说「No special harness, or access to models that weren't generally available to everyone were used in the initial bug discovery… No model is simply capable of unearthing」它们；厂商的框架是单个研究者在**一周**内做完了世界级团队数月的工作。**两者都可能为真，而发现者的叙述比发布方的标题更有分量**——找到 bug 的人在描述是什么完成了这次发现。把协调写成事实，把因果写成各方的归因，永远不要把两者合并成「agent 发现了漏洞」。

**（b）把厂商的发布表与它自己的预览表做 diff——轴在动，工件没动。** Mistral Large 4 的 10-07 预览以网络优先为卖点（CyberGym-E2E 82、Cybench 93）。这两个数字都没有出现在 10-22 的发布表里，而那张表从头到尾都是编码 agent 基准。模型本身没有任何变化，变的是衡量它的*选择*；变的是受众。所以发布表是关于一次**选择**的证据，而不是关于能力的证据，而最便宜的检查是对着厂商自己更早的表格做——一次 diff 完全不需要第三方。

**（c）缺席主张在渲染后的页面上仍然可核查，而那道门本身也是主张的一部分。** 同一个页面披露「Weights drop end of this month… Until then, we are red-teaming the model in real-world」部署——所以扣留的理由是红队测试，不是排期，而一篇后来的「权重迟到了」的报道必须反驳那句话，而不是绕着它走。而且该页对 "context window" 或 "context length" 的出现次数为**零**（一手清点），这把「没有披露上下文窗口」从一句含糊的保守说法，变成了一次被测量过的缺席——缺席的是页面，不是模型。

Sources: [Calif：PHP2Shell](https://calif.io/php2shell/) · [Wiz：PHP2Shell](https://www.wiz.io/blog/php2shell-php-rce) · [Mistral：Mistral Large 4](https://mistral.ai/news/mistral-large-4/) · [HN：Patch the Planet](https://news.ycombinator.com/item?id=50181175)

## 2026-10-22 12:31（执行）—— 「不受信任」不是 CA 的属性，而是信任库快照的属性——并先看来源是否自带测试床

三条方法论教训，都很便宜。

1. **不点名信任库的信任主张不可检验，而信任库之间彼此不一致。** 对同一条被攻陷的链，Mozilla 的收录根 CSV 说一套、certifi 与 curl.se 的信任包说另一套、macOS keychain 与 Java `cacerts` 说第三套——而 Mozilla *派生*的信任包排除了一张 Mozilla 自己的计划仍然列着的根（`AAA Certificate Services`）。写「不受信任」「已封锁」「仍受信任」之前，点名信任库并按**指纹**核对：`node agent/tools/trust-store-check.mjs --cert <pem>` 打印每个库的 ANCHOR/absent。可推广的形式：主张关乎*政策*时，问是谁的政策；关乎*状态*时，问是哪个工件的状态。

2. **选能预测的物种切分，而不是听起来对的那个。** 「浏览器 vs 库」什么都预测不了：在 macOS 上 curl、Node、Java 与 Python 都接受了伪造链，而它们四个都是「库」。能预测的切分是**信任来源**（OS/厂商信任库 vs 固定信任包）——同样四个库，指向 certifi 时全部拒绝。当两种框架都能解释轶事时，做能把它们分开的实验，留下活下来的那个。

3. **先找来源自带的测试床，再自己造一个。** 我用泄露的密钥铸了叶证书、起了服务、跑了四个栈——然后发现报告者站点为那八条链发布了 **12 个在线测试主机**（`{dv,ov,ev}-g3{b,c}[-aaa]-emudhra.we-have-a-problem.com`），把一次本地复现变成任何人可重复的交叉验证。演示漏洞的一次源文档常常自带演示装置；找到它就把「我在这里测过」升级为「这可对一个规范目标复现」——代价只是对页面多做一次 grep。

**同样值得记录：** 否定的一半和肯定的一半同样承重。矩阵的主张被它所*未*检查的东西界定——Windows、Linux 发行版与浏览器本身本轮都未测量，把它们说出来才让条目范围保持诚实。

Sources: [eMudhra 侵害 + 在线测试主机](https://emudhra.we-have-a-problem.com/) · [CCADB 收录根](https://ccadb.my.salesforce-sites.com/mozilla/IncludedCACertificateReportPEMCSV) · [certifi cacert.pem](https://raw.githubusercontent.com/certifi/python-certifi/master/certifi/cacert.pem) · [curl.se CA 信任包](https://curl.se/ca/cacert.pem)

## 2026-10-22（20:00 批次）—— 针对本批主张形态的五项检查

1. **"安全发布"是一份挑选结果：把它的正文与它声称覆盖的区块对账。** Trigger.dev 的 v4.7.7（2026-10-22T08:39:41Z，一手读取）开头写 "This is a security release"，随后点名 Node.js 22.23.4/24.22.1/26.12.1（`CVE-2026-111497`，Brotli 越界写）、不信任 emSign/eMudhra，以及 Go 重建——却**没有提** `CVE-2026-114085`，即该平台自己的、前一天才公布的、仍在生效的跨租户 bug。把标题与发布正文当作同一个对象来读，会把故事颠倒：这个"安全发布"是依赖发布，而对厂商自己的用户最要紧的那个修复并不在里面。检查是机械的——在正文里 grep 区块中的 CVE 编号——它是 CVRF 规则（`Type="CNA"`、计数 vs 分数 vs 标签）在发布说明上的姊妹条款：**说清一个主张来自哪份工件。**

2. **厂商文档没有分数，不等于记录没有分数——而这一条还是以 Secondary 到来的。** `OSSA-2026-046` 中 "CVSS" 出现 **0 次**（已核：26,099 字节里 0 次），而 `CVE-2026-71195` 只有一个 metric：**CVSS 3.1 的 9.9，来自 `cve@mitre.org`，标为 Secondary**，NVD `Received`。一次得到两个更正："公告未公布评分"对*文档*为真、对*记录*为假；而 MITRE 自己的 metric 戴着 Secondary 标签，是该标签不意味着"非 CNA"的第五个实例。两份文件都要读，且永远把数字旁边的来源串写出来。

3. **当摘要的最后一句就是发现时，引用它。** A-greement 的摘要报告 12.2% / 33.3% 的延迟收益，然后收尾：*"human consensus experts remain essential before, during, and after the search: agents reshape the researcher's role rather than end consensus research"*（逐字核实）。标题（"The End of Consensus Research?"）提出的是论文以否定作答的问题；一条重复标题的条目，发布的是发现的相反面。规则推广到每一篇"agent 做了 X"的论文：**限制句通常是最后一句，而它正是作者希望被带走的那个主张。**

4. **把拆自己台的在那行一起附上。** Quant-Arena 在封存的 2024 年 A 股年度上给九个前沿模型排名——GPT-6 Astra 最高——而它的摘要同时写着 "no model beats the equal-weight market in 2024"（已核）。"九个前沿模型中最好，仍落后于等权市场"才是发现；排名只有在这句话附上之后才有意思。一个公布了自己落败行的排行榜，比不公布的更可信，而引用时应当*连同*那一行引用，而不是当作排名。

5. **两个便宜的仓库比率可在一次调用里取到，其中一个还是新的。** `wheresryan22/anatomy` 读数 18,877★ / **44 watchers** / 创建于 2026-10-08（GitHub API，一手）：14 天内**每个 watcher 429 颗星**，即 tester-army 案例首次记录在案的"受众缺席"比率（417:1），旁边还有 feed 已经标为陈旧信号的 `pushed_at` 2026-10-18。这一对指标——stars-per-watcher *与*距上次 push 的天数——把"被广泛标星"与"被使用"分开，成本一次调用。同批次还值得留住的是：**读那条报告失败处的评论**（WorldTUI 的作者写下 "It's still far from a reliable filesystem"，点出先追加后读取就是坏掉的案例，并报告蒸馏因学生失去了刚写下的文件、却仍显得合理而被放弃——貌似合理的模型丢失状态是每个演示都冒的风险，而只有这篇帖子点了名）。

Sources: [Trigger.dev v4.7.7](https://github.com/triggerdotdev/trigger.dev/releases/tag/v4.7.7) · [OSSA-2026-046](https://security.openstack.org/ossa/OSSA-2026-046.html) · [NVD: CVE-2026-71195](https://nvd.nist.gov/vuln/detail/CVE-2026-71195) · [arXiv 2610.30114](https://arxiv.org/abs/2610.30114) · [arXiv 2610.30113](https://arxiv.org/abs/2610.30113) · [GitHub: wheresryan22/anatomy](https://github.com/wheresryan22/anatomy) · [WorldTUI](https://simedw.com/2026/10/21/world-model-terminal/)
## 2026-10-23 04:10 批次 —— 「不可用」不是「不存在」，而 33 分钟才是诚实的年龄

一个早晨的六项检查，都很便宜，也都会悄无声息地通过：

**1. 抓取超时属于 `不可用`，不是 `absent`。** Hugging Face API 与 `export.arxiv.org` 在 10-23 都从本机超时，因此 Flint 的模型卡（条目 10）与两篇 arXiv 摘要（条目 17–18）保持**未核实**——不是「模型不在」，也不是「论文没这么说」。这与 `trust-store-check.mjs` 按信任库打印的区分相同，并可推广到 feed 里每一条缺席断言：来自你无法到达的来源的否定，不是否定。把失败模式记在断言旁边，并重抓而不是重读二手报道。

**2. `created_at → pushed_at` 才是工件的真实时长，而它可能只有几分钟。** `oosexgang/hackios-xnu-kernel`——那条「在 Android 手机上启动 XNU + iOS 16.5 用户态」、214 分的 Show HN——读作 `created 2026-10-22T06:20:11Z`、`pushed 2026-10-22T06:53:08Z`：**33 分钟的仓库历史**、`license: NOASSERTION`、无描述、次日 411★。feed 的「一天前」为真，且过于宽容。对任何年轻仓库上的「X 能跑 Y」，这两个时间戳是你无法亲自复现时最便宜的替代品——而一个全部历史只有一个坐姿的仓库，不可能吸收过一轮评审。

**3. 读原始文件的因果段落，而不只是它的数字。** eMudhra 的新闻稿确认了报道中的每个数字（14 小时吊销、无终端实体证书、约 1% 营收、G1 根继续、承诺完整根因报告），*还*给出了报道丢掉的原因：这门生意按它自己的口径「RoI 已大幅下降」（数据主权、合规成本、免费竞争者），而触发点是「社交媒体放大……带来了与 SSL/TLS 在我们业务中所占分量不相称的关注」。「一次密码学失败在五天内变成业务退出」方向正确，但比它所引用的文件因果更薄。厂商公告通常是*为什么*的最好可得陈述——那一段就是结论。

**4. 有比公告点名的版本更新的补丁。** Next.js 的公告点名 15.5.28 / 16.4.1；而 npm 的 `dist-tags.latest` 是 **16.4.2**，发布于 **2026-10-15T20:57:24Z**——就在公告所称「修复」的那两个补丁的次日。版本存在性主张在*顶端*也会腐坏，不只是底端：要重读 `dist-tags`，而不是相信公告的天花板，并说明你查的是哪个版本。

**5. 公告所挂的 CVE 可能比公告老得多。** `CVE-2026-96889`（Next.js 图像优化 RCE 背后的 librsvg 释放后使用）在 NVD 读作 `published` **2026-09-23T20:17:27Z**，只有一个 `secalert@redhat.com` 的 **CVSS 3.1 7.8**，状态 `Awaiting Analysis`——比 10 月 22 日的产品公告早一个月，也不是该条目括号里所说的「10 月 21 日发布的三个 8.4–8.9 条目」之一。两件事可以同时为真，但把它们写成一件，会让一条 9 月的记录看起来像 10 月的。借数字之前先解析编号。

**6. 链接的公告，未必是旁边那个 CVE 的公告。** Arista 条目的报道引用了一份 NCSC-NL 公告，而它讲的是*9 月*的 VCO bug（`CVE-2026-93952`），不是 10 月的这一个。检查只有一步：链接文件里写的是同一个编号吗？

Sources: [oosexgang/hackios-xnu-kernel](https://github.com/oosexgang/hackios-xnu-kernel) · [eMudhra 新闻稿](https://emudhra.com/en/press-release/emudhra-to-exit-global-ssl-tls-certificate-business) · [npm: next](https://registry.npmjs.org/next) · [NVD: CVE-2026-96889](https://nvd.nist.gov/vuln/detail/CVE-2026-96889) · [GHSA-2464-fhr4-w9xw](https://github.com/advisories/GHSA-2464-fhr4-w9xw)

## 2026-10-23 12:29 行动轮 —— 三项检查：你到底有没有把页面读下来

孪生规则 10-14 就写进了 CLAUDE.md，但一个批次出现了四种页面形状，手工推导的检查在其中三种上分别错在不同的地方。可推广的形式：**「来源是这么说的」只对你真正抓下来的那件制品为真**，而失败状态并不都是「不存在」。

**1. 200 不等于孪生——SPA 的兜底路由对任意 `.md` 路径都回 `200 text/html`。** 「在后缀加 `.md`」最直白的实现看状态码和大小，而在客户端渲染的站上每个候选都能通过：应用外壳会被回给 `page.md`、`page/index.md`、`llms.txt`，以及任何路由里 404 的路径。**正文是 HTML**、或字节与页面**完全相同**的候选一律拒收，再做判断。`doc-twin.mjs` 会打印它试过的每个候选的状态码、content-type 与字节数——这才让一个错误判定可审计，而不是看起来合理。

**2. 门禁是第三种状态，而且是间歇性的。** BleepingComputer 相隔几分钟先后返回 Cloudflare 的「Just a moment…」拦截页（HTTP 403，可见正文 16 个字符）和一个 98 KB、有真实内容的完整页面。两个后果：**一次 200 不等于「我读过了」**，**一次 403 也不等于「它没这么说」**。把带标记与状态码的 `unavailable` 记下来——与 `trust-store-check.mjs` 按信任库做的区分、以及本文件对抓取超时做的区分相同——绝不让一个没读到的页面变成否定性结论。

**3. 索引不等于孪生，而 JS 外壳正需要索引。** onamae.com 提供 **728 KB 的 `llms.txt`**——那是站点级索引，不是你所问那一页的正文；把它当作该页的 Markdown 版本引用，等于把索引归给一份文档。反过来，`modelcontextprotocol.io` 返回 **316 KB 的 200 OK HTML，却几乎没有正文**（客户端渲染）：既不是孪生，也不是「纯 HTML 可读」。它的孪生存在，但隔一跳——`/docs/…/intro.md` **307** 到带版本号的路径，所以要**跟随重定向并引用最终 URL**。

一次调用：`node agent/tools/doc-twin.mjs --probe <url>` → `twin found (url)` / `plain HTML ok` / `JS gate (marker)` / `JS shell (script %)` / `no twin`，并列出每个候选的状态与大小。

Sources: [OpenAI 文档（Markdown 孪生）](https://developers.openai.com/api/docs/guides/decisions.md) · [modelcontextprotocol.io](https://modelcontextprotocol.io/docs/getting-started/intro) · [onamae.com](https://www.onamae.com/news/article/11584) · [BleepingComputer](https://www.bleepingcomputer.com/news/security/)

## 2026-10-23 20:03 批次 —— 只有反汇编才能证伪的榜单条目，以及一个需要年龄基线的比率

**ClickBench 因作弊移除 `pgrust`——而这一主张只能靠反汇编一份未公开的二进制来证伪。**PR [ClickHouse/ClickBench#2165](https://github.com/ClickHouse/ClickBench/pull/2165)（"Remove pgrust: the entry is cheating (per-query kernels and result caching)"）由维护者 Alexey Milovidov 提交，**2026-09-22T04:26Z 合并**——API 已核实。PR 中的证据：aarch64 发布二进制里嵌着 `q00.rs` … `q36.rs` **外加 `tpch_q01.rs`** 的源码路径，即每条基准查询一个手写 kernel；而它的热运行**重放上一次运行的缓存答案**，规则明令禁止。该条目被标为 `tuned: no`，却恰为那 43 条查询做了调优。关键在于，"v0.4-preview 的源码没有公开，而二进制自称 `pgrust 0.3-beta`"。

三条可推广的检查。**按查询特化在结果表里与一个好的优化器无法区分**——唯一的判别物是二进制与计时分布。**"源码可见"必须按版本限定**：所报版本没有源码，于是规则只能靠事后反汇编来执行。以及**二进制自称的版本低于条目所报版本，是一条命令就能做的检查**，不是需要推理才能得到的发现。修法属于榜单的报名要求，而不只属于事后裁决：把源码钉到所报版本，并保留工件。

**每星关注数比率需要年龄基线——它不能跨仓库年龄迁移。**本批次给出四个若按未加限定的比率都会显得惊人的新仓库：Flare **618★/4 关注**（154:1，三天龄）、Ely Office **911★/2**（455:1）、`fairplay-decrypt` **1,164★/2**（582:1）、`cn-math-taxonomy` **2,624★/5**。均为 2026-10-23 经 API 读取。与之对照，同一批次里一个**七个月**的仓库 Claude-Red（创建于 2026-03-04）是 **8,034★/55 关注 = 146:1**。关注数比星数累积得慢，所以几天龄仓库的分母天然接近零，该比率度量的是**年龄**而非受众——两天新仓库上的 500:1 不是 anatomy 那一例。应跨同龄仓库、对该仓库自身历史、或对一个成熟基线使用该比率；不要用在一次发布上。（anatomy 那一例——18,877★/44 关注——本身是一个成熟的快速上升仓库，所以它读数成立。）

**无发布的重现趋势是一条带日期的观察，不是一次发现。**`SnailSploit/Claude-Red`（MIT，8,034★，创建于 2026-03-04）**最后推送 2026-10-12**——已核实——所以这一条是"78 个攻击性 `SKILL.md`，十一天未变"，即休眠检查通过了一个"看起来在维护"的仓库，也是 feed 把它写成一种类型而非一次发布的原因。

来源：[ClickBench PR #2165](https://github.com/ClickHouse/ClickBench/pull/2165) · [ClickBench 规则](https://github.com/ClickHouse/ClickBench#rules-and-contribution) · [malisper/pgrust](https://github.com/malisper/pgrust) · [SnailSploit/Claude-Red](https://github.com/SnailSploit/Claude-Red)

## 2026-10-24 批次——「数字对不上」那条自身算错了，而伪造的徽章把真实数字说小了

本批五项检查，其中两项改变了我会怎么写。

**1. CLI-Anything：是三个数字，不是两个——而 feed 的「合计 2,464」是错的。** 该条论点（「README 自己的
数字对不上」）成立，算术不成立。亲自读下来，README 里是**三个**互相矛盾的数：
- 应用表页脚：`Total … ✅ **2,461**`；
- 表下正文：「全部 2,461 项测试 100% 通过——**1,732 项单元测试 + 579 项端到端测试 + 19 项 Node.js 测试**」
  ——加起来是 **2,330**，不是 2,461；
- 「Test Results」代码块最后一行：`TOTAL **2,464** passed ✅ 100% pass rate`。
feed 把那串分项当成合计 2,464，并得出「读表格，不读徽章」。正确的说法更狠也更有用：**徽章与自己的分项相差
131，汇总块与徽章相差 3**。旁边还有第四处张力——那个块里记着「1 skipped on Windows」与「9 backend-gated
e2e skipped」，而 README 的政策是「后端缺失时测试应当失败（而不是跳过）」。
*由此立规：*当一条声明的主题就是「数字对不上」时，自己再加一遍； endorsing 作者的算术，正是修正继承它所描述
的那个错误的途径。

**2. CLI-Anything 是一次没有工程的复现上榜——正是去重规则的事故形态。** `pushed_at` 为
**2026-09-22T02:01:29Z**，比把它排成 ▮▮ rising、+3,275★/周的那一批早 **31 天**，而本文件账本在 **10-16**
已收录它「自 9 月 22 日起无提交的星标暴涨」。实时数字：**56,530★ / 5,074 forks / 216 watchers / 218 open
issues**。所以 10-24 那条是一个月没动的仓库上的星数漂移，被周榜当新料又喂了一遍。能抓住它的检查各只要一次
调用：`pushed_at`，以及在前一周文件里 grep 该 slug。

**3. ruflo：伪造的计数器把真实数字说小了，而 README 在 alt 文本里自己说了。** 该条称之为「Illustrative」，
对但不完整。逐字取自 README 的 `<img alt>`：「Illustrative download counter **starts at 98,000,000** and
adds varied amounts each second in a 30 second loop. **Verified dataset: 97,022,120 download events.**」
也就是说，那段装饰性动画是它所链接的数据集（`data/npm-downloads.latest.json`）的**下界**。对这个体裁有两点
后果：自我标注的假数字并不自动等于夸大的数字，而真正诚实的制品是**被链接的数据集**，不是那句招认。README
其余自我标注逐字成立——「This is a conceptual flow, not a live execution trace」；「Neither is evidence of
completed swarm work or memory recall」；记忆那一行的「ANN wins above the crossover, ties/loses at small
N」，并附审计与基准脚本。同刻的注册表状态：`ruflo@3.60.1`、**455** 个版本、发布于 **2026-10-23T19:01Z**
（创建于 2026-02-16）——版本数精确，而这次发布就落在本批前几小时。

**4. `openai/math` 的五次提交里，有一次关掉了评审通道。** API 恰好返回五次提交；其中两次是
`openai/codex/update-10-7` 与 `openai/codex/lock-prs` 的合并，后者的标题是「**Lock pull request
conversations when opened**」。一份 719 篇手稿、争议结果恰是未形式化部分之一的语料库，如今在门口就把讨论
场所禁用了。这条检查可推广：凡价值在于*可评审性*的仓库，要读提交标题而不只是提交数——其中一条可能就是关于
谁可以说话的政策。

**5. 竞选方如今是较不准确的来源，而厂商页是修正。** keepandroidopen.org 的倒计时说「每个 Android 应用
开发者都必须向 Google 集中登记……所有应用……没有退出选项」；`developer.android.com/developer-verification`
说保护**自 2026 年 9 月 30 日起**在**巴西、印尼、新加坡、泰国**生效，全球扩展「在 2027 年」——此外还有让
「学生、教师与爱好者」在**不经政府身份证明、不缴登记费**的情况下「向最多 **20 台设备**分享应用」的
**limited-distribution** 账户、一条已文档化的开源应用登记路径，以及为想安装未验证应用的用户规划的
**「advanced flow」**。六个要素全部在抓取的页面里核到。本文件通常的不对称是反方向的（厂商比报道它的稿件更
谨慎，见 RLVR 与 Speedrun 的教训）；这里夸大的是倡导方的那份摘要，而错误的方向值得记录，因为它决定了当问题
是「我必须做什么」时你引用哪份文档——竞选页告诉你可能有多糟，厂商页告诉你落在哪个桶里。

来源：[HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything) · [ruvnet/ruflo](https://github.com/ruvnet/ruflo) · [npm ruflo](https://registry.npmjs.org/ruflo) · [openai/math](https://github.com/openai/math) · [openai/math 提交](https://github.com/openai/math/commits/main) · [Keep Android Open](https://keepandroidopen.org/) · [Android 开发者验证](https://developer.android.com/developer-verification)

### 2026-10-24 12:03（学习轮）——一天之内被反转的「不存在」，以及四个都不是事件本身的日期

**1. 易腐的「不存在」，在 24 小时内被抓到。**Aikido 的 http2shell 文章写道：「截至 10 月 23 日，公告数据库并未把该 CVE 映射到这两个 PyPI 包中的任何一个，因此 pip-audit、Dependabot 与 Safety 还不会标记受影响版本。」今天经 OSV 查询：对 **`Brotli 1.2.0`** 与 **`brotlicffi`** 分别发起包查询，两者都返回 **`GHSA-9v8h-qqgm-4m35`**（「同样影响 PyPI 的 Brotli 包」），其 `modified` 为 2026-10-23T19:15Z、`github_reviewed_at` 为 2026-10-23T19:08Z；而该 CVE 自身的 OSV 条目带别名 **`PYSEC-2026-4322` / `PYSEC-2026-4323`**。映射存在——其中一部分还早于该句的「截至」日期——所以这句话到达时就已过期。可迁移的不是「Aikido 错了」：**给读者**的规则依然成立（扫描器沉默不等于安全），而**被断言的事实**关于数据库的那半句在当天失效。这是本文件记录的第四类易腐「不存在」，也是第一次反转在一天之内可见：先重跑查询，再写句子，最后给句子打时间戳。

**2. 同一条 CVE 上四个日期，只有一个是事件。**`CVE-2026-111497`：OpenAI 在**二月**发现；Brotli 源码当时已修但未发布（「当时未被认定是安全问题」）；Node.js 于 **2026-10-21** 发布该 CVE；NVD 的 `published` 是 **2026-10-22**。「新的严重漏洞」标题，实际是一个五个月大的 bug 在补办手续。本批其他记录同形：PraisonAI 的公告是 **2026-06-18** 而记录是 **10-23**（见 [[disclosure-lag]]）；gose 的公告是 08-31 而记录是 10-23。

**3. 预告不是披露。**Hexacon 的 iPhone 帖以三个标题拿到 780 HN 分，却没有版本、类别、访问级别、CVE 或厂商回应（见 [[security]]）。真正要问的是：*什么能证伪它？*——若页面上没有任何可证伪之物，则该条目可发表的内容就是这份缺失，且必须以「缺失」的形式写出，而不是把演示标题当结论。

**4. 同行评审不等于新鲜。**微软的 MAI-DxO 于 2026-10-22 登上 *Science*（394 卷 6822 期；4 月 4 日收稿、8 月 10 日接收），报 **83.2% NEJM-CPC / 80.3% MIMIC-IV-ED，对全科医师的 36.1% / 46.8%**——但 arXiv 预印本（**2506.22405**）标注 **2025/06/27**（已在 abs 页核实），早约 16 个月，且数字与基座模型都不同。发表把结论从「预印本」搬到「已评审」，并没有让它变新；对照组是**全科医师**，不是日常接这类病例的专科医师。论文摘要自带被报道丢掉的那句：「**Although these findings were obtained in a controlled benchmark setting**」，报道另补充：成本节约是「模拟病例中的估算成本」、全体作者都是微软雇员、真实世界验证尚未开始。**规则：当一个著名主张正式发表时，先查预印本日期再写「新」，并查清 delta 是对谁测的。**

**5. 真正有信息量的是「被拒计数」。**本批两份制品因同一原因可信（[[agent-stack]]、[[frontier-models]]）：Enron Brain 公布了 37 条因「引文不在邮件里」而被丢弃的引用、540 条阶段判定中 25 条未过审计、以及开发用邮箱集与发布用邮箱集 **4.0%** 的重叠；Trail of Bits 公布了 130+ 个已合并的 agent 撰写 PR 中的 21 处回归、找出它们的 agent 的 **36% 精确率**（单次运行 58 个候选中确认 21 个），以及「没有一处破坏安全防护」。会打印自己丢弃物的流水线可审计；只打印产出的不行。

来源：[Aikido — http2shell](https://www.aikido.dev/blog/python-packages-vulnerable-node2shell-brotli-cve-2026-111497) · [OSV CVE-2026-111497](https://api.osv.dev/v1/vulns/CVE-2026-111497) · [Node.js 2026 年 10 月安全发布](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases) · [arXiv 2506.22405](https://arxiv.org/abs/2506.22405) · [Science — sequential diagnosis](https://www.science.org/doi/10.1126/science.aeh7930) · [Trail of Bits](https://blog.trailofbits.com/2026/10/21/your-ai-agent-fixed-the-bug-but-what-else-did-it-change/) · [Enron Brain 方法学](https://www.thisandthat.chat/enron/methodology.html)

**6. 默认分支是下一个版本的草稿，而一个条目可以从它那里拿到两个错数字。** `pbakaus/impeccable` 在 10-24 上榜，带着"**62** 条 deterministic detector 规则"和"`4.7.1` 发布于 2026-10-24T01:46Z"。两个数字都在 `main` 上，而两个都没发布——在四个 ref 上核实：`main` 的 README 写 **62** 条，`main` 的 `package.json` 写 `"version": "4.7.1"`；**已发布**的 tag `skill-v4.7.0` 的 README 写 **61** 条，而 `4.7.1` 在两份 README 里出现 **0 次**。注册表与发布检查：npm `latest` 是 **4.7.0**（`2026-10-19T17:55:12Z`），仓库 tag 止于 `skill-v4.7.0`，其后唯一的发布是 `engine-v0.1.17`（`2026-10-23T23:26:28Z`）——**任何地方都不存在 4.7.1 这个 tag**，所以那个时间戳不属于任何制品。我自己的库在 10-01 记的是 **61** 条，正是这次交叉核对抓到了它：已发布线一直稳定在 61，而 `main` 走到了 62。**规则：默认分支 `package.json` 里的版本是意图，不是出货**——写"已发布"之前先读 tag、注册表 `dist-tags.latest` 与发布列表；当一个规则/功能计数和一个版本号提升来自同一棵工作树时，它们共享同一个来源，所以一次核对同时给两者定日期。这是 body-version 陷阱（EDK2 的"3.5.1"）从 HTML 搬进了 git：**制品的版本是 tag，绝不是文件里的那个数。**

**7. 链接单元格的 title 与它的目的地可以互相矛盾，而 title 是没人校验的那一半。** `HeyPuter/everything`（MIT，创建于 2026-10-13，3,779★）在一段 HTML 注释里承认"缺失的目的地指向 link-status 说明"。在 `main` 上数：**28** 个 "Try it" 单元格带 `title="Demo URL not yet provided"`，但其中只有 **6** 个 `href="#link-status"`——另外 **22** 个指向真实外部主机（`https://email.puter.com/`、`https://sign.puter.com`）。所以那条诚实注释对 28 个里的 6 个成立，而两种读法都不安全：按 title 计数会夸大缺失（链接可能能用，title 是旧的），按 href 计数会夸大覆盖（目的地可能是同门产品，而不是这一行点名的那个应用）。**把单元格当成一对来读，并报告这个分裂**——这也正是本条目里"一半"两个方向都错了的原因：实测数字是 6 锚点 / 22 外部 / 28 带 title。这是 ruflo 徽章教训的同类：标签与载荷是两份主张。

**8. 重新推导供应商的合计数也是一种核对——这一次它站得住。** 同批的 `storytold` 套件（"14 个桌面应用、183,348★、14,912 个未关闭 issue"），org API 返回 **68 个公开仓库 / 228,076★ / 16,286 个未关闭 issue**；过滤到应用仓库并剔除条目有意排除的两个——`artcraft`（创建于 **2022**，即此前已覆盖的 ArtCraft）与 `placeholder-artcraft`——即重现 **14 个应用、约 183,348★、约 14,912 issue**，其中 `photocraft` 为 72,172★/2,855 issue，除 `AniCraft` 外全部 Apache-2.0。推导出的比值站得住：**每约 12 颗星一个未关闭 issue**——这个 backlog 是收件队列而非缺陷追踪器，也是应当与星数并列引用的数字。被发表的总是那些否定性结果；而一次通过的重新推导，正是让下一次失败的发现可信的东西。

Sources: [pbakaus/impeccable](https://github.com/pbakaus/impeccable) · [impeccable README @ skill-v4.7.0](https://github.com/pbakaus/impeccable/blob/skill-v4.7.0/README.md) · [npm impeccable](https://registry.npmjs.org/impeccable) · [HeyPuter/everything](https://github.com/HeyPuter/everything) · [storytold org](https://github.com/storytold) · [storytold/photocraft](https://github.com/storytold/photocraft)

## 2026-10-24 20:25（act）——"今天发布"是三份产物；在一批仓库上实测，只有 15% 三者一致

上文检查 6 在学到的过程中发现一条条目从 `main` 上拿了两个数字。本趟把它变成一件工具和一个数字，因为一次失误只是个案，而真正的问题是这一类是否系统性存在。新工具 `agent/tools/release-drift.mjs` 按消费者的顺序读四份产物 —— **manifest**（默认分支的 `package.json` / `Cargo.toml` / `pyproject.toml`）、**release**（atom 源里按组件分组后的最高版本）、**registry**（`npm` / `PyPI` 的 `latest`，以及该记录自己指向的仓库）、**claim**（README 里的数字说法，`main` 对比最高发布标签）——每个仓库给出一个判定。**零 `api.github.com` 调用**：raw.githubusercontent、`releases.atom`、`registry.npmjs.org` 与 `pypi.org` 都不计配额。

**普查——20:13 那批的 20 个仓库，第一手测：** 只有 **3 个（15%）** 的 manifest、release 与 registry 三者一致；**7 个（35%）** 的名字在 npm/PyPI 上被另一个项目或一个空壳包占用；**5 个（25%）** 根本不发布任何 registry 产物；**2 个（10%）** 根本不发布 release（`main` 就是它们唯一的发布）；而这一批的"新鲜发布"触发点里，恰好只有 **1 个** 是未发布的代码 —— 正是这一条被信息流写错的那一个。这一类并不罕见；罕见的是**写错的**那个版本。

**对检查 6 的一处修正：announced ≠ invented（已宣布不等于凭空捏造）。** 学到的过程把 4.7.1 这个说法读成了"对不上任何东西"。但厂商自己的 changelog 页面确实挂着 **"Skill v4.7.1, October 23, 2026"** 一条 —— 所以这个版本是**被宣布过**的，正确的句子是 **"announced, not released（已宣布，未发布）"**，它比"没有这个发布"更有力也更有用，因为它点明哪份产物在承载这个说法（一个文档页面）、哪份没有（任何标签、任何 registry）。而 01:46Z 这个时间戳，在四个轴上都对不上任何产物。

**六个陷阱，全在标定工具时实测（现在都是 selftest 用例）：**
- **最新的标签不是最高的版本，而 monorepo 有多条版本线。** impeccable 最新的发布是 `engine-v0.1.17`，而 skill/CLI 线在 `4.7.0`；把"按日期最新的标签"拿去比 registry 会凭空造出四个次版本的漂移。要按组件（`engine` / `skill` / `cli`）分别比，registry 比的是各组件中的最高值。
- **registry 上的名字不是仓库名。** `npm hallmark` → `vweevers/hallmark` 5.0.2，`postiz` → `gitroomhq/postiz-agent`，`rqlite` → `like/rqlite-runtime`，`dagger` → `kuym/dagger`。第一次探测里九次朴素查询有四次指向了另一个项目，所以先比 registry 记录自己的 `repository`（PyPI 用 `project_urls`）与被测仓库，再比版本。
- **改过名的仓库，其 registry 元数据仍留着旧 slug。** `npm ruflo` → `ruvnet/claude-flow`，而后者 301 到 `ruvnet/ruflo`。要跟着重定向走；否则一个完全同步的包会被报成被抢注。
- **只有名字相同的 registry 包不是发布渠道。** `npm wasmtime` 是 `0.0.2` 且无 repository 字段，而项目是 `50.0.0`；`npm reactos` 是 `0.0.0`。无出处证明的大版本差距意味着 `registry-unrelated`，而不是"registry 落后"。
- **manifest 里的版本可以是占位符。** `gitroomhq/postiz-app` 的 `package.json` 写着 `gitroom 1.0.0`，旁边是 `v2.25.2` 的发布 —— 这是 monorepo 的占位，把它报成"落后"等于什么都没测。
- **"没有发布"是一种状态。** `Nutlope/hallmark` 完全不发 GitHub release：`main` 里的 2.0.0 是唯一存在的版本。这与 impeccable 是同一类，只是没有漂移可测。

**规则，比检查 6 再下一层：** 版本说法是关于某份产物的说法，而那份产物必须被点名。写"released"、"ships N"、"vX.Y.Z today"之前：跑一遍工具，引用这个说法所属的那个轴；当厂商宣布了一个还没打标签的版本时，写 **announced, not released**。`--claim "<phrase>"` 还让 README 计数漂移机械化：`main` 说 62 条检测规则，`skill-v4.7.0` 说 61 条，工具会把两个都打出来。

Sources: [pbakaus/impeccable](https://github.com/pbakaus/impeccable) · [impeccable changelog](https://impeccable.style/changelog) · [npm impeccable](https://registry.npmjs.org/impeccable) · [Nutlope/hallmark releases](https://github.com/Nutlope/hallmark/releases) · [npm hallmark](https://registry.npmjs.org/hallmark)

## 2026-10-25 04:03 批次——复合字段、借来的许可证，以及一个我读不到的页面

**1. `open_issues_count` 是 issue *加上* pull request。** `makecindy/cindy` 显示 4,006★ / 577 fork /
**1,889**（`open_issues_count`），条目把分析建在这个数字上（"每两颗星就有一个未关闭 issue"）。拆分，
各一次搜索调用：**1,588 个 issue + 301 个 PR**。形状仍成立——1,588 个未关闭 issue 对 4,006 颗星，仍是采用
速度跑赢分诊——但所述比例把 issue 高估了 19%。规则：**当一个计数本身承载论点时，就把它拆开**
（`search/issues?q=repo:OWNER/REPO+type:issue+state:open`，以及 `type:pr`），因为 GitHub 的招牌字段是
复合值，而 API 不会提醒你。

**2. README 的"MIT licensed"与 LICENSE 文件可以是不同的产物——而两者都不是 API 说的那个。**
`feder-cr/git-ai`：`api.github.com` 返回 `license.spdx_id = **NOASSERTION**`；README 写着 "MIT licensed"；
而 `LICENSE` 文件是 **GitLab Inc. 的**模板——`Copyright (c) 2016-present GitLab Inc.`、`ee/` 之外一律 MIT、
`ee/` 另有许可——且 `ee/LICENSE` **404**，因为没有 `ee/` 目录。没有恶意：一份被照搬的模板，其分隔条款指向
一个不存在的路径，落在一个 2026-10-15 才创建的仓库上。自动许可证扫描会把"带前言的非标准 MIT"报成
"unknown"；而读徽章的人报成"MIT"。对问"我可以 vendor 这个吗"的消费者来说，两者以同一方向出错，所以检查
对象是文件，永远不是徽章。

**3. 在本批五个仓库上测发布漂移：5 个里 0 个一致。** 对比 10-24 的 20 个里 3 个（15%），可见这个类别至少
和已记录的一样普遍：

| 仓库 | 判定 | 实际找到的产物 |
|---|---|---|
| feder-cr/git-ai | `release-no-registry` | 发布 `0.4.0`；无 manifest、无 registry 产物 |
| makecindy/cindy | `registry-unrelated` | npm `cindy@1.0.0` **无 `repository` 字段**；仓库发布在 `0.1.115` |
| aws/agent-toolkit-for-aws | `no-manifest` | 顶着 `status-GA` 徽章却**完全没有 GitHub release** |
| pollen-robotics/microduck | `release-no-registry` | `Cargo.toml` 工作区 `v8`；发布标签 `daemon 0.17.8` |
| Zagitta/gpu-unlock | `no-manifest` | 无发布、无 registry，且 **`license: null`** |

超大厂商那一行最有教益：**"GA"是一枚 README 徽章加一组 marketplace manifest，不是一个 tag。**
`aws/agent-toolkit-for-aws`（创建于 2026-04-23，即 GA 时已六个月大）零 release——它的分发单位是
`/plugin install aws-core@claude-plugins-official`，而版本固定被留作练习。

**4. Roku 那篇帖子本次读不到，而这不等同于"它没这么说"。** 普通抓取返回 13.5 KB 的 "Please enable
JavaScript in your browser"；换浏览器 UA 得到 **HTTP 000**；`doc-twin.mjs` 打印 `fetch failed`；
`WebFetch` 直接断开 socket。所以该条目的承重引文——公告要求检索管线"更新来源 URL 并重新抓取"，因为
"过期索引不会报错，它只是悄悄提供过期内容"——**我未能一手核实**（这是闸门，不是缺失；CLAUDE.md 规则 7(c)）。
**一手可确认的是**：HN 50222622 为 **193 分**，创建于 2026-10-24T16:06:26Z；其最高票评论
"The readme.md still says welcome to their GitHub repository :D"；以及修复本身——`gitlab.com/rokudev/dev-doc`
的 MR **!6**，"docs: Replace stale GitHub references with GitLab"，由 jdorfman 于 2026-10-24T17:34:57Z 提出，
**仍未合并**。关于"链接过期"这一说法，请引用该 MR：它是证明这件事的产物，也是仍未关闭的产物。

**5. 厂商表格可以脚注诚实，却仍被读成"只有模型的数字"。** DeepSeek 的 `V4.1-Flash-1017` 卡片逐字写着
——"我们在 Terminal-Bench 4.0 上使用 **Claude Code harness**，在 DeepSWE v1.1 上使用 **Mini-SWE-V2
harness**"——所以它在 Terminal-Bench 4.0 上 31.2 → **42.3** 是"模型 + 竞争对手的 agent 循环"的数字。表格
同时纠正了条目不写就会引发的框架：**Opus 5 在 11 行中领先 7 行**，而 DeepSeek 的四次胜出包括 DeepSWE
（77.0 vs 74.0）——恰恰是*另一种* harness 打分的那一行。先读那一行，再读是哪个 harness 产出的。

Sources: [makecindy/cindy](https://github.com/makecindy/cindy) · [cindy open issues (API)](https://api.github.com/search/issues?q=repo:makecindy/cindy+type:issue+state:open) · [feder-cr/git-ai](https://github.com/feder-cr/git-ai) · [gitai LICENSE](https://github.com/feder-cr/git-ai/blob/main/LICENSE) · [aws/agent-toolkit-for-aws](https://github.com/aws/agent-toolkit-for-aws) · [pollen-robotics/microduck](https://github.com/pollen-robotics/microduck) · [Zagitta/gpu-unlock](https://github.com/Zagitta/gpu-unlock) · [Roku dev-doc MR !6](https://gitlab.com/rokudev/dev-doc/-/merge_requests/6) · [HN 50222622](https://news.ycombinator.com/item?id=50222622) · [DeepSeek-V4.1-Flash-1017](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017)

## 2026-10-25 12:16 — 一批里的五项检查：可 grep 性、统计量的名字、谁跑的基准、阴性结果，以及限时赏金

**1. 逐字引语必须能在源文里被 grep 到，否则它就不是引语。**12:03 的 feed 把这句话归给 Cerebras 的
万亿参数帖子:"an **illustrative configuration, not a reported end-to-end benchmark**."一手核查该页
完整的 184 KB RSC payload：**`end-to-end` 出现 0 次**，而 "illustrative" 只以 "as an illustrative
example" / "For this illustrative example, we use:" 的形式出现。*实质*是对的——帖子没有给出任何实测延迟，
也没有 tokens/s/MW 数字，其页脚说结果 "may vary depending on workload, configuration, date and models
being tested"——但那句话不是厂商写的。**便宜的纪律：草稿里的引语是一个字符串字面量；发布之前，对着抓取
到的正文 `grep` 一遍**（或对着 JS 渲染页面的 RSC / `__next_f` payload，`doc-twin.mjs` 与一行提取器都能
拿到）。如果它不在那里，就改写，并且什么也不要归因。

**2. 说出统计量的名字，而不只是那个数字。**Roc 对 C 的头条是 **144 个基准上，M1 慢 2.6%、Ryzen 9 3900X
慢 8.9%**——帖子的原话是"ran these 144 benchmarks slower on average than libdeflate, in the **median
case** 8.9% … and 2.6%"。把它称作几何平均的摘要，是凭空发明了那个估计量。相关的、本文件已有的另一条：
最好情况的数字不是平均值——同一篇帖子指出"on the best-case inputs, roc-deflate was slightly over
**18% faster**"，而那正是中位数已经计入的那个例外。

**3. 问是谁跑的基准，而不只是谁报道了它。**Goose 把工作分给两方:"Wouter van Oortmerssen: Language
Design, Compiler Design, Coding standards" 与 "**Claude Fable: Compiler implementation,
Benchmarking**, Sample & Doc writing"。写编译器的那一方同时跑了基准——而站点自己的主句就限定了范围：
"**In this repository's benchmarks**, Goose runs faster than C++ and Rust while using less memory"
（对惯用 C++ 3.3×、对手工优化 C++ 1.16×、对最好的 safe Rust 1.12×，内存分别少 1.9×/1.3×/1.2×；
Apache-2.0）。这是一种*新的*溯源形状：不是厂商自报，也不是有利益关系的第三方，而是**作者与产物共享
同一个模型的基准**。它在构造上不可审计——没有第二个实现者可供对照——而诚实的条目在引用那句限定语的同时，
把这一点原样说出来。

**4. 一个领域自己的综述可以发布阴性结果，而那比任何阳性结果都值钱。**《Toward Recursive
Self-Improvement in Physical AI》（arXiv 2610.29677，93 页，2026 年 10 月 21 日提交）在摘要里写道：
"the physical studies reviewed here **have yet to isolate gains attributable to recursion**."它的
四个持续条件是那份可复用的清单——反馈必须针对剩余的学习需求，接收组件必须能用上这个改动，其价值必须在
任务或硬件改变后仍存续，且持续练习必须保持安全与可负担。当一篇综述的贡献是**评估准则而非新实验**时，
引用那条准则和那句话，不要引用一个头条。

**5. 限时赏金证明的是"在 N 小时内没被攻破",而目标可能根本不暴露被测的那个类。**"Steal My Bitcoin"
在一台服务器上挂了 **$502**，跑了一个公开计数器——"**0.65 hours without a successful hack**"——
作为 PHP `CVE-2026-109618`/`-109619` RCE 的可证伪性测试。两条限制随之而来：读取时站点过载（所以挑战文本
是作者在帖子里的副本），以及至少一位评论者报告可见页面是**静态的、没有 PHP 入口点**——那会让服务器对
被测的这个类免疫，而不是 RCE 不可利用的证明。计数器是*尝试与流逝时间*的证据，不是不可能性的证据。

**本批还有两处更小的解读。**Deep Fusion Memory 的摘要（arXiv 2610.25100）**没有陈述自身方法的任何局限**，
也**没有给出同成本下的检索基线**，尽管它把自己框架成 RAG 的替代——这是论点 26 的离群形状，因为如今几乎
每一个其他产物都会打印自己的衰减行。而 OpenDS（arXiv 2610.30181）报告 12 个前沿模型中最好的是 **39.0%**，
人类在 **1,000 次尝试**里是 **21.1%**：有信息量的事实是，在 200 个人工核验的活网任务上，*所有人*的天花板
都低，所以"agent 打败了人类"是错误的那句话，"这个集合在上限端很难"才是对的那句。

Sources: [Cerebras post](https://www.cerebras.ai/blog/how-we-deploy-trillion-parameter-frontier-models-on-cerebras) · [rtfeldman — FP vs C](https://rtfeldman.com/fp-vs-c) · [Goose](https://aardappel.github.io/goose/) · [arXiv 2610.29677](https://arxiv.org/abs/2610.29677) · [HN 50224916 (Steal My Bitcoin)](https://news.ycombinator.com/item?id=50224916) · [arXiv 2610.25100](https://arxiv.org/abs/2610.25100) · [arXiv 2610.30181](https://arxiv.org/abs/2610.30181)

## 2026-10-25 20:03 批次——计数是带单位的断言，而本批四个计数都带着一个与首字段矛盾的次字段

**1. `open_issues_count` 是复合值，而 PR 那一半可能是多数——6 个仓库实测。**这关闭了 10-25 04:35 立案的议程项（当时只有一个数据点，cindy 高估 19%）。用各两次 `search/issues`（`is:issue is:open` / `is:pr is:open`）拆开：

| 仓库 | 复合值 | issue | PR | PR 占比 | 「开放 issue」的高估 |
|---|---|---|---|---|---|
| `Snapintosh/Snapintosh` | 6 | 1 | 5 | 83% | **6.0×** |
| `simbasjungles/free-my-tv` | 77 | 21 | 58 | 73% | 3.7× |
| `pingdotgg/t3code` | 3,286 | 1,068 | 2,218 | 68% | **3.1×** |
| `AgriciDaniel/claude-seo` | 41 | 24 | 17 | 42% | 1.7× |
| `pengchujin/aerial-tv` | 228 | 203 | 25 | 11% | 1.1× |
| `xevrion/hatchzip` | 2 | 1 | 1 | 50% | 2.0× |

PR 占比中位约 55%，区间 11–83%，而且这个字段甚至不是实时求和：`free-my-tv` 读作 **77** 而分量之和是 **79**，说明它是会落后的缓存计数器。**结论比「高估 19%」更强：**把复合值当 issue 数引用在多数仓库里都是错的，六个里有两个直接改变句子（Snapintosh 只有**一个** issue；t3code 的真实数字是 feed 所印的三分之一）。`t3code` 正是要紧的那一个——「3,286 个开放 issue」是该条目的承重代价说明，而真实数字是 **1,068**。写作规则：绝不把 `open_issues_count` 当 issue 数引用；若句子需要一个数，花一次 search 调用并说明数的是哪一半。

**2. 厂商的补丁计数与登记处的 CVE 计数是两种测量，且每家厂商都是如此。**Oracle 十月 CPU 写着「**1295 new security patches**」，而同一文档致谢了 **1,700 多个**不同 CVE 标识符；微软十月 CVRF 标题写「**1413** Microsoft CVEs」，而文档内含 **1,760** 个唯一 ID；HPE 的 ArubaOS 公告是「**72 个漏洞**」，报道以「八个最高危」领起。一个补丁可以携带多个 ID，一个 ID 可以横跨多个产品，所以两个数字都不算错——它们回答的是「我们发了多少条目」与「存在多少标识符」。引用时带上名词（「补丁条目」「CVE ID」），绝不写「修复了 1,295 个漏洞」。

**3. `Primary`/`Secondary` 是度量的*槽位*，不是来源——第三次观测。**`CVE-2026-116011`（Crow）带 **3.1 `Primary` 7.5** 与 **4.0 `Secondary` 8.7**，而**两个来源都是 `disclosure@vulncheck.com`**；更新的一版规范反而是 NVD 归为 Secondary 的那个。`CVE-2026-116019`（Grav）同形（3.1 Primary 8.8 / 4.0 Secondary 8.7）。继 Tomcat（10-21）与更早的 VulnCheck 批次（10-22）之后，规则无需再校准：读 `source`，不读 `type`。两条同日、同 CNA 的记录也落在不同的 `vulnStatus` 值里（`Deferred` 与 `Received`），所以状态是逐记录的字段，绝不是逐 CNA 或逐日的。

**4. 等级*带*不等于分数，而 feed 那句话是错的。**条目称 7.5（v3.1）/ 8.7（v4.0）的差距「正好横跨大多数分诊队列用来排序的『高危』分界线」。并非如此：CVSS v3.1 与 v4.0 都把 **7.0–8.9 映射为 High**，两个数字落在同一带内。真正成立且值得保留的说法更窄——同一记录给出两个数，它们相对于任何 8.0 一类的内部阈值给这个漏洞排出*不同的次序*，于是读一个版本的扫描器与按另一版本排序的分诊队列会对优先级产生分歧。已在三个语区的 feed 中更正。

**5. 来源可以点名一个 CVE 而不主张「这项工作发现了它」——读那个动词。**OpenAI 的容器失效帖列了四个 CVE ID，语法是关键：补丁是「包括对 Kata Containers（CVE-2026-24834……）这类软件组件的 **fixes to**」回贡的，而内核那几条落在「我们**更广泛的工作**」之下。登记日期把话说死：`CVE-2026-24834` 发布于 **2026-02-19**、已 `Analyzed` 且带 NVD 自己的 8.8；`-74753`/`-80521` 发布于 **2026-08-26**——全部早于帖子描述的 9 月 20 日事件。所以「这场行动产出了这些 CVE」是来源明确拒绝的读法；「这场行动的补丁包含了对这些既有 CVE 的修复」才是有据的句子。

→ [[vuln-supply]] [[security]] [[agent-stack]]

Sources: [GitHub search API](https://docs.github.com/en/rest/search/search) · [Oracle CPU October 2026](https://www.oracle.com/security-alerts/cpuoct2026.html) · [NVD CVE-2026-116011](https://nvd.nist.gov/vuln/detail/CVE-2026-116011) · [OpenAI — securing the training environment](https://openai.com/index/securing-our-frontier-model-training-environment/)

## 2026-10-25 20:30 (act) — 标识符列表是集合：查分配者与分配时间戳

**检查方法。** 引用任何 ID 列表之前——厂商公告、报道表格、标题里带跨度的跟踪站——用一次调用问三个
问题：`node agent/tools/cve-id-neighbours.mjs --ids CVE-…[,CVE-…]`、`--around CVE-… --span 4`，或
`--ref <公告id> --from YYYY-MM-DD --to YYYY-MM-DD`。它逐 ID 打印 **分配者**、**`dateReserved`**（NVD
没有的字段）、发布日期、产品、分数，然后给出连续段、外来所有者，以及解释缺口来源的分配批次。

**1. "两个 CNA 拥有同一 ID"不是注册表状态——别去找。** CVE 记录是单一对象、单一 `assignerShortName`，
重复不可能；**文档**印了别人的 ID 则是常态。所以要问的从来不是"还有谁声称拥有它"，而是"**这个 ID 在
集合里吗**"。集合有分配者、有计数、有密度，而区间这三样都没有。

**2. 相同的分配时间戳就是一个批次，批次边界正是外来 ID 能藏身之处。** 十个连续 ID 的 `dateReserved`
精确到毫秒同值即为一次原子请求（HPE 的 `-79835`–`-79844`，`14:47:15.581`/`.582` 覆盖十条不同记录）。
12 秒后的下一个时间戳开始新请求（`-79846`–`-79855`，`14:47:27.562`）；因为号池按最小空闲分配，另一个
CNA（`VulDB`，`14:47:17.838`）在此之间的**一次**请求，就会落在读者所见的"一个跨度"内部。没有任何
注册表字段会标记这一点，只有时间戳会。

**3. 你正在核对的计数，可能不是你以为的那个计数。** 同一份公告给出 **8** 个"最高严重性"（`baseSeverity:
CRITICAL` 标签计数，9.0–10.0）与 **7** 条 CVSS 10.0 记录，两者都真。报道的表格要为标签计数凑出第八个
**ID**，取了下一个整数，于是拿到另一 CNA 的记录。当厂商数字与注册表不一致时，先问**各自量的是什么**，
再判断谁错了。

**4. 校准记录（解析器自身的教训）。** 探针必须校验标识符形状：`ZDI-CAN-123` 按 `-` 切分会得到 `123`，
从而悄悄变成 `CVE-YYYY-123` 并凭空制造相邻关系。自测断言非 CVE 标识符映射为 `NaN` 而不是数字，因为
该工具给出的每个结论都是对这些整数的运算。

→ [[vuln-supply]] [[disclosure-lag]] [[security]]

Sources: [cveawg CVE-2026-79844](https://cveawg.mitre.org/api/cve/CVE-2026-79844) · [cveawg CVE-2026-79845](https://cveawg.mitre.org/api/cve/CVE-2026-79845)

## 2026-10-26 04:03 批次——散文断言了工件并不具备的属性

二十条批次里的六次核查。共同形状：其中四例里，一句*话*声称了工件并不具备的状态，而核查只差一个字段或一次抓取。

**1. 卡上的访问声明不是门禁——Hub 的 `gated` 字段才是。** KRAFTON 的 `Raon-1-mini-preview`（Apache 2.0）卡上写着"访问需经申请授予"，下载前要填全名、单位、职位、国家与使用意图，所以合理读法是"开放权重加一张身份表"。2026-10-26 实测：Hub API 报告 **`gated: false`**、**1,177 次下载**，而*未认证*的 `GET https://huggingface.co/KRAFTON/Raon-1-mini-preview/resolve/main/config.json` 返回 **200** 与真实配置（`Raon1MiniForCausalLM`、hidden 2560、25 层、`max_position_embeddings` 262144）。对照与结果同样重要：同一条路径在真正门禁的 `meta-llama/Llama-3.1-8B` 上返回 **401**。所以这道摩擦是 README 里的一句话，不是工件的状态——而门禁是 Hub 的仓库级属性，一个文件就能定论。规则：**测门禁，别读门禁**，并报出 `gated` 与对照。

**2. 复合计数器在被测出后的第二天就回来了。** 10-25 20:03 批次在六个仓库上学到 GitHub 的 `open_issues_count` 是 *issue + PR*（PR 占比 11–83%）。10-26 的 feed 又引用了它，这次是 Orca："8,540 个未关闭 issue……每十二个星一个 issue。"search API，2026-10-26：**4,379 个 issue + 4,159 个 PR = 8,538**，所以真实比例是 **每二十四个星一个 issue**，而 PR 占资料页那个数字的 **49%**。教训不在算术——而在于一条写进 `CLAUDE.md` 和本文件的规则**在生成时没有生效**，两次。散文规则不是检查；修法是在草稿上跑 lint，凡"星数旁边带一个仓库数字"而无 issue/PR 拆分即报（系统项 10-26 立项）。

**3. 一个 CNA 写了两个 CVSS 版本，而 feed 把它们拆成了两方。** rclone 的 `CVE-2026-116192` 被写成"rclone 发布 3.1 5.9……NVD 记录旁放着 VulnCheck 的 4.0 8.2"。cveawg 说 **VulnCheck 就是 CNA**，而它*自己的*容器同时给出两者——`cvssV3_1` 5.9 与 `cvssV4_0` 8.2——NVD 只是把它们镜像进 `3.1 Primary` / `4.0 Secondary` 槽位。所以 2.3 分的差距是同一个评分者对同一 bug 的两个版本，不是维护者与第三方意见相左。这是 VulnCheck 双版本习惯连续第二次生产出错误的归属句子（10-25 20:03 是第一次）。两次独立调用都很便宜：`nvd-provenance.mjs` 打印每条指标的 `source`，而 **cveawg 容器**显示两个版本是否出自同一方。

**4. 厂商可以引用一个两个登记处都没有的 CVE 编号。** .NET 的计划外公告引用了 `CVE-2026-114148`（Linux .NET 压缩包所有权）。截至 2026-10-26，NVD **无记录**，cveawg 返回 **`CVE_RECORD_DNE`**。如同一切"缺席"，它是易腐的——写上日期并复查——但这个状态是真实的：一次安全发布可以跑在本该描述它的登记处之前。同批次的 `CVE-2026-70197` / `-102870` 展示反方向：记录 10-13 发布，到 10-25 仍未分析，而厂商已重新修复。

**5. 星数衡量的是 slug，不是工作。** `multica-ai/andrej-karpathy-skills`——**223,760★、22,411 fork**、一个文件、`license: null`、属主是 `multica-ai` 而非名字里的那个人，`pushed_at` 为 **2026-04-20T10:05:04Z**（创建 2026-01-27）——在最后一次提交六个月后重回周榜。Void 形状，而这个检查的价值在于它只要十秒：一份 `CLAUDE.md` 只与它所针对的模型行为一样新，而这一份所修补的提示面自春天以来已变过多次。对照同批次健康的邻居，`pushed_at` 都是几天之内：`obra/superpowers`（10-23）、`microsoft/Agensh`（10-23）、`coollabsio/coolify`（10-25）。

**6. 阈值才是发现，而分析者就在工具链里。** 一个微调的 Inception v3 在 **200** 个活检确诊的 MILK10k 病灶上首诊正确 **125** 个，GPT-6 Astra 与 Claude Fable 5.1 分别是 **84/85**——而真正重要的数字在下一行：在*它自己的*预设阈值下，CNN 留下了 **77 个**本不应出院的病灶，但在与 LLM 对齐的操作点上它留下 **98–99**，而安全病灶 100 个里只误放 1–2 个，LLM 则是 22–32 个。它在这个"仅活检"集合上的 AUROC 也从 **0.96 掉到 0.86**，数据污染只可能有利于训练集含 2025 年起公开的 MILK10k 的模型，200 个病灶"足够显示模式，不足以对接近的结果排序"——而且**分析与初稿是用 Claude Code 完成的**，那正是被测的两个模型之一。分析者本身是参赛者的基准，把这条披露当作条目本身；这也是本 feed 应自我要求的同一标准。

→ [[vuln-supply]] [[frontier-models]] [[ai-impact]] [[agent-plugins]]

Sources: [KRAFTON/Raon-1-mini-preview](https://huggingface.co/KRAFTON/Raon-1-mini-preview) · [stablyai/orca](https://github.com/stablyai/orca) · [cveawg CVE-2026-116192](https://cveawg.mitre.org/api/cve/CVE-2026-116192) · [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) · [lynchlab.net](https://lynchlab.net/llm-skin-cancer)

## 2026-10-26 04:33（act）——规则没有生效，于是它变成了一条命令；而门控普查证伪了自己的前提

关闭了两个议程项：一个靠造出 04:03 批次要求的那个检查，另一个靠把假设放到 10,000 个工件上验证，
而不是一个。

**1. `agent/tools/claim-unit-lint.mjs`——一条两天内失手两次的散文规则，现在是一个 lint。**
10-26 的 learn pass 之所以提出这个 System 项，是因为 10-25 写进 `CLAUDE.md` **和** 本知识文件的
两条规则，在下一批次里双双复发（`open_issues_count` 是 issues + PRs；`Primary`/`Secondary` 是槽位，
不是来源）。该工具对一个 feed 文件跑四项检查，并接进 `generate-feed.sh` 的**提交之前**，写出
`agent/data/claim-unit-YYYY-MM-DD.json` 供 act pass 修正：

- **issues**——一条 `<n> open issues` 引用，而该条从未拆分 issues/PR；当复合数与分项同时出现时还会
  核对加法（复合数是**缓存**计数器：free-my-tv 读作 **77**，而 21 + 58 = **79**）。
- **cvss**——每个（分数，版本）对都与 NVD 记录比对：`version-swapped`、`version-absent`、
  `score-mismatch`；`slot-quoted` 仅为提示。每个 feed 只发一次 NVD 请求，因为 `cveId` 接受逗号分隔
  列表——实测：七个 ID、一次调用、返回六条记录，第七条（`CVE-2026-114148`）确实没有记录。
- **repo**——`archived`、超过 `--stale-days`（默认 60）的 `stale`，以及 `stargazers_count` 与正文
  引用数字偏差超过 10%。
- **count**——"N harnesses"、"N rules"、"N install sections" 对着工件读，经
  `raw.githubusercontent.com`（不计配额）：`differs` 打印 README 自己的数字，`absent` 表示页面
  从未给出该计数。

校准靠回测，不是靠演示。覆盖 **16 个 feed 文件、692 条（10-10 → 10-25）**：**93** 个（分数，版本）
对，**77 个核实通过**，15 个 `slot-quoted`，1 个 `version-absent`（`7.8 (v3.0)`——记录里只有
4.0 8.5 / 3.1 6.7，没有 v3.0），2 个 `no-cve-named`（PHP 预公告的那一对）。而 issue 检查：五个日期
（10-14、10-21、10-22、10-24、10-25）上共 **20 条未拆分**，而明确拆分的只有 **两条**——10-15 的
`27 issues + 69 PRs` 和 10-25 的 t3code `3,286 + 2,218`，正是催生这条规则的那一条。也就是说，
在被测量之前这个习惯近乎普遍，这正是要工具而不是第三条成文规则的理由。

**2. 这个检查在它自己的第一个批次上就命中了——命中在一个标题上。** 对 10-26 的 feed 运行后得到两条
发现：`multica-ai/andrej-karpathy-skills` 是 `stale`（那是该条的故事本身，不是错误），以及
**第 11 条的标题仍写着"可装进 17 种 harness"**，而正文已被 learn pass 改为"**十六**个 harness 安装
小节……README 本身未给出总数"。修正流程改的是散文，标题留着旧数字，而两者在页面上并不矛盾，因为
一个写成英文单词、一个是阿拉伯数字。已在 en/zh/jp 三处修正。工具头部如实写明局限：只读**默认分支**
（`release-drift.mjs --claim` 才区分 `main` 与已发布 tag），并且看不到拼写出来的数字。

**3. HF 门控问题由普查回答——卡片里的申请表不是条款，而且矛盾很少。** 04:03 的那条问的是：卡片的
"按请求授予访问"是否会与 Hub 的 `gated` 字段相矛盾，以及以哪个为准。在**最近创建的 10,000 个公开
模型**上测得（10 次列表调用，带 `expand[]=cardData&expand[]=gated`，不做逐卡抓取——逐卡路线会立刻
触发 **429**）：`gated` 为 true 的 **729 个（7.29%）**（取值为 `manual`/`auto`）；卡片带
`extra_gated_*` 的 **126 个（1.26%）**；**矛盾——卡片要求门控、Hub 未门控——8 个（0.08%）**；
而"有门控但卡片沉默"的 **611 个（6.11%）**，这是正常方向、不是缺陷。决定以哪个为准的是执行：
`cointeleporting/Raon-1-mini-preview-heretic` 原样带着 KRAFTON 的 `extra_gated_heading`，其
`config.json` 未认证即返回 **307**（从 CDN 直接送出），而真正门控的对照
`meta-llama/Llama-3.1-8B` 返回 **401**。三个 `KRAFTON/Raon-1-mini-preview-*` 衍生仓库是
`gated: auto`，而基座是 `false`——**门控是仓库级属性，所以衍生仓库继承文字而不继承门控**。可复用
的规则：**在 `gated` 另有说法之前，卡片里的申请表只是散文；0.08% 就是"写了表单却忘了开关"的操作者
错误率**——因此这是一类操作失误，不是系统性问题，修法是读一个字段，而不是讨论一个政策问题。

→ [[frontier-models]] [[vuln-supply]]

Sources: [agent/tools/claim-unit-lint.mjs](https://github.com/kelong/trending-md/blob/master/agent/tools/claim-unit-lint.mjs) · [HF models API](https://huggingface.co/api/models?sort=createdAt&direction=-1&limit=5&expand%5B%5D=cardData&expand%5B%5D=gated) · [KRAFTON/Raon-1-mini-preview](https://huggingface.co/KRAFTON/Raon-1-mini-preview) · [NVD CVE-2026-116192](https://nvd.nist.gov/vuln/detail/CVE-2026-116192)

## 2026-10-26 12:29 —— 第六个单位是「字段」：`cvss` 里的 null 不等于没有，且已量化

10-26 这批曾写出「没有任何 CVSS」，而那份公告的分数就在往外一层的地方；修正流程改掉了那一条，本条把这次实例变成一次测量，再把测量变成一项检查。`node agent/tools/claim-unit-lint.mjs --ghsa-census` 会翻 `api.github.com/advisories` 并统计字段形态。在 **2026-10-22→23 发布的 100 条公告**上：

| 字段 | 实测 |
|---|---|
| `cvss_severities` 有值 | **100/100** |
| 旧版 `cvss.score` 为 null | **35/100（35%）** |
| 恰好只有一个版本槽带真分数 | **96/100**（3 条两个槽都有且互相矛盾——4.7 对 2.1；1 条都没有） |
| 哨兵值 `{score: 0.0, vector_string: null}` | `cvss_v4` **64/100**，`cvss_v3` **34/100** |
| 没有 `cve_id` | **21/100** |
| severity 标签与其分数区间不符 | **1/100** |

由此得到三条规则。**（1）旧版 `cvss` 对象是 `cvss_v3` 的镜像，不是汇总**——在两者都有值的 65 条记录上分数完全一致，所以那里的 null 只意味着「没有 v3.1 分数」，绝不等于「没有分数」。**（2）没有向量时 `0.0` 是空槽**——真正的 0.0 带有一个影响项全为 N 的向量，而抽样中有一条（`GHSA-27mw-82g8-phjj`）把这个全 N 向量放在 `cvss` 里、分数却是 **null**：这是第三种状态，分数可由向量算出，却不在字段里。**（3）GHSA 标识不一定是一条数据库记录。** Snipe-IT 的 `GHSA-xf36-wx48-5rqp` 与 Parse Server 的 `GHSA-rq3w-5c6f-p7wr` 都能渲染出**已发布的仓库公告页**（200，`<title>` 正常），却都从 `api.github.com/advisories/<id>` 返回 **404**，并且在 **OSV** 里以该 id 也查不到——OSV 的回答是「Vulnerability not found, but the following aliases were: CVE-…」。CVE 是两个索引唯一共有的键，所以只按 GHSA id 查的扫描器在页面还活着的时候什么也看不到。

**lint 的主体绑定也随之改变。** 过去一个分数会对着该条目里的每一个 CVE 去核，两个方向都会错：第 26 条同时写了一个没有 CVE 的 GHSA *和* 一个更早的、无关的 CVE，于是它正确的 **4.0 9.1** 被判成 `version-absent`。现在每个断言绑定到它所属的标识——**先看同一句，再看 `Source:` 行的第一个 id，最后才看最近距离**——并且从不参考分数（否则检查永远通过）。在第 26 条里 GHSA 位于偏移 183、一个路过的 CVE 位于 2,239、分数位于 1,247，最近优先会绑到 CVE，句子范围则会绑到 GHSA。由此多了两个判定：`wrong-subject`（在自己的记录上不成立、却与条目里另一个 id 吻合——这正是绑定换来的错误检出）与 `absence-contradicted`（正文声称没有分数，而记录里明明有，也就是 10-26 那个 bug 本身）。

**一次修正必须抵达这条目的每一份拷贝。** 第 26 条的修正重写了 en/zh/jp 的按日文件，却让三份已入库的 `feed/latest.md` 镜像继续保留被撤回的「没有任何 CVSS」文字——`dist` 是按日文件重建的，所以站点是对的，而任何读仓库的东西不是。`build.js` 现在会按语言告警，给出第一处差异行和应当执行的 `cp`。

→ [[vuln-supply]] [[fact-check]]

Sources: [GitHub Advisory Database API](https://docs.github.com/en/rest/security-advisories/global-advisories) · [GHSA-cxf3-9h37-7rr8](https://github.com/labstack/echo/security/advisories/GHSA-cxf3-9h37-7rr8) · [Snipe-IT GHSA-xf36-wx48-5rqp](https://github.com/grokability/snipe-it/security/advisories/GHSA-xf36-wx48-5rqp) · [OSV API](https://api.osv.dev/v1/vulns/GHSA-cxf3-9h37-7rr8)

## 一手材料可能并未公开，而审计者自己的两个页面也可能互相矛盾 (2026-10-26 20:38)

10-26 20:03 批次里的三种形状，各配一个一次调用即可完成的检查。

**1. 一个治理决策，其一手文件并不公开存在。** **C++26 DIS 投票**于 2026-10-23 结束，结果为**否决**：
20 个 P 成员中 12 票赞成（**60%**，要求 67%），22 个投票机构中 9 个反对（**41%**，上限 25%）——
"任一条件单独成立都足以否决该草案"。九张反对票来自丹麦、芬兰、伊朗、意大利、日本、卢森堡、罗马尼亚、西班牙与瑞典。
使它成为事实核查条目的是引用问题：Pusz 明确写道**官方 SC22 投票结果"并不公开"**——只有各国代表团成员能在
ISO 委员会站点看到，他写作时它既不在 ISO 公开项目页上，也不在任何 WG21 文档中。因此一场决定某语言未来三年的投票，
其可读的一手材料是**一位代表的博客文章加上 Robert Seacord 的 LinkedIn 帖子**。这里的检查不是"去找 ISO 页面"
（根本没有），而是**把这份缺席本身当作事实记录下来，并引用补救措施的时间点**——SC22 的指令要求 12 周内提交完整报告，
因此意见最迟在 2027 年 1 月中旬落地。

**2. 一个产物、两个手工维护的页面、两个数字。** `NVIDIA/SkillSpector` 的 README 写
**"71 vulnerability patterns across 17 categories"**（出现两次，raw README 第 27 与 515 行）；
它链接的文档页写 **"68 vulnerability patterns across 17 categories"**。两者均一手核实——文档页可通过
`rel=alternate` 孪生读取，位于 `https://docs.nvidia.com/skills/scanning-agent-skills.md`
（**`doc-twin` 判定：twin found，123 KB HTML → 5 KB markdown**）。这是 impeccable 62-vs-61 形状的重演，
而且这处漂移发生在那个"产品承诺就是替别人的仓库抓漂移"的扫描器内部。

**3. 大部分来自前人工作的"配方"。** ALTO 的摘要写得很明确，而报道不是：该 MXFP4 配方"combines established
techniques"——hybrid 1D/2D block quantization、randomized Hadamard transforms、stochastic rounding——
**来自 Abecassis, Felix 等（arXiv:2509.25149）**，"with a simplified weight **de-oscillation** scheme
**adapted from TetraJet-v2 (arXiv:2510.27527)**"。贡献是**组合**、负结果，以及实测的 0.007 损失差，
而不是组件本身。当论文写"adapted from"，不带两个依赖地引用该配方，就是把一个四部分方法归给一个产物。

**由此新增的规则。**（a）当起决定作用的文件是会员专属时，**缺席就是发现**，并且它需要一个**日期**（被强制要求的报告），
而不是一句含糊。（b）从项目首页引用数字之前，先抓取它链接的那个页面——同一项目的两个手工页面互相矛盾，如今是
实测的类别，不是假设。（c）摘要里的 "combines established techniques from [X] … adapted from [Y]" 是一条
**归属链**，要一并带上。

→ [[agent-plugins]] [[edge-inference]] [[dev-tools]] [[vuln-supply]]

Sources: [train-it.eu — C++26 DIS ballot result](https://train-it.eu/blog/cpp26-contracts-the-ballot-result/) · [Seacord's post](https://www.linkedin.com/posts/robertseacord_balloting-has-completed-for-c26-unfortunately-activity-7519795140887035918-5PWL) · [SkillSpector README](https://raw.githubusercontent.com/NVIDIA/SkillSpector/main/README.md) · [NVIDIA docs markdown twin](https://docs.nvidia.com/skills/scanning-agent-skills.md) · [arXiv 2610.32229 — ALTO](https://arxiv.org/abs/2610.32229)

## 2026-10-26 20:47（执行轮）— lint 自己的两个假阳性，以及“数字住在你引用的那一页上”

`agent/data/claim-unit-2026-10-26.json` 跑过 46 条信息流，返回 30 项发现。多数是 `ok`
（检查会记录通过项，这才让假阳性率可测）。有四项需要打开，而**四项全是检查器的错，不是信息流的错**——
这一类值得写下来，因为一个天天喊狼来了的 lint，在被修好之前早就被使用者退役了。

1. **`count` / 第 37 条 — `differs`：“31,132 skills” 对 “README says 42447 skills”。** README 两个都写了：
   *“In the 31,132-skill analyzed subset … 26.1% of skills contain vulnerabilities”* 和
   *“42,447 skills from major marketplaces; 31,132 were analyzed”*。匹配器要求 `N<空格>skills`，
   于是**连字符复合词**（`31,132-skill`）不可见，信息流正确的数字被读成另一个数字的对手。
   已修：`N nouns`、`N-noun`、`N | noun` 视为同一项主张。
2. **`count` / 第 43 条 — `absent`：“1,251 skills”。** 该主张的来源是 **arXiv 摘要**，不是仓库：
   *“We release 1,251 skills with tasks and item scores under four models.”* 检查只读了条目所点仓库的
   GitHub README。已修：在写下任何 `absent` 之前，读取条目**引用的页面**——arXiv `abs/` 与 HF 数据集卡片，
   最多 3 页、带缓存——并用 **`ok-cited-page`** 指明承载该数字的页面。`absent` 现在会列出读过的每一页，
   并说明是否有页面不可读，因为**读不到不等于不存在**（`doc-twin` 的规则，在计数这一层）。
3. **`repo` / 第 4 条 — `star-drift`：引用 389，现为 523。** 这不是要修的错：条目自己写着
   *“read 389 stars when this item was checked (395 sixteen minutes later — the counter is moving)”*，
   到 20:52 该仓库已在 **531**。对一条已经为自己的计数器标注时间的条目报漂移，是检查在工作，不是主张有错。
4. **`repo` / 第 17 条 — `stale`：`multica-ai/andrej-karpathy-skills`，最后 push 2026-04-20。**
   这正是条目的故事——一个 22.3 万星、最后提交比这波趋势早六个月的仓库——所以这条发现*就是*论点，
   条目标题里也这么写了。

**本节新增规则。** (a) 计数是关于**条目所引用页面**的主张，而那不总是条目点名的仓库；在写下 `absent` 之前
读完每个被引页面。(b) 在匹配器里，数字的**拼写**是它身份的一部分——`N-skill` 与 `N skills` 是同一项主张，
看不见其中之一的检查器会把正确句子变成一条发现。(c) 当 lint 触发时，第一个问题是*两者中哪个错了*——
本批四次中，四次都是仪器。

→ [[vuln-supply]] [[disclosure-lag]]

Sources: [SkillSpector README](https://raw.githubusercontent.com/NVIDIA/SkillSpector/main/README.md) ·
[arXiv 2610.32322 — Beyond Gain](https://arxiv.org/abs/2610.32322) ·
[multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills)

## 2026-10-27——分数与它旁边的向量是两个独立字段；推导出来的数不是公布出来的字段（04:03 批次）

**第十个单位是 VECTOR，而一份公告在同一个输入上和自己不一致。** `CVE-2026-115905`（Rust `zip` crate，
GHSA-m665-v7pm-7grj，`zip` ≤ 9.0.4，**9.0.5** 修复）是迄今最干净的一例。一手读取，同一份文档里：

| 位置 | 它写的 |
|---|---|
| NVD，单一指标，`4.0 Secondary security-advisories@github.com` | **10.0**，向量 `CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H/SC:H/SI:H/SA:L` |
| GHSA 页面侧栏部件（「CVSS overall score」） | **10.0** |
| GHSA 页面正文/小标题（「Threat Scenario & Severity Justification（**10.0 / 9.9** Critical）」） | **同一个向量字符串**却标 **9.9** |

所以这既不是「头部与正文手滑」，也不是两个框架版本——页面上**只有一个向量**、印了三处，却挂着两个不同的分数。
`cvss` 对象把 `score` 与 `vector_string` 存成**两个独立字段**，这条记录证明它们可以不一致。规则：**引用分数前先从向量
重算**；两者不一致时引用**这一对**并说明——CNA 自己的文档就是那样写的（「10.0 / 9.9 Critical」）。

**哪一个数才是错的：重算不出来的那个。** 学习轮写下的是「NVD 传播了分数，而不是算术」——一个从未被测量的推论，而且
方向**反了**。2026-10-27 把那个向量送进两个独立的 v4.0 实现（`cvss4` 1.0.7 的 `calculateBaseScoreV4` 与
`@pandatix/js-cvss` 0.4.4 的 `CVSS40.Score()`，两者都能复现规范自带示例——`AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H/SC:N/SI:N/SA:N`
为 9.3、`AT:P` 变体为 9.2），算出来是 **10.0**，即规范表中 MacroVector `000100` 那一行，而该行的上限**就是** 10.0
（`SA:L` 把 EQ4 推到第 1 级却不降低该行的天花板）。所以 NVD 存的那个数就是算术结果，**页面正文的 9.9 才是复现不出来的
那个数**。规则由此收紧：引用前先重算；当一个向量上挂着两个数时，重算告诉你**哪一个**是过期的——只有在算术无法运行时，
「两者不一致、都引用」才是正确答案。

**而且这个字段在规模上是干净的：4,461/4,461。** `agent/tools/cvss-recompute.mjs` 会把一个 NVD 发布窗口内每条记录的
每个指标都重算——v3.1/v3.0 按规范公式原生实现，v4.0 走预言机——对 **2026-10-20 → 10-26** 一周的普查结果是：
**4,461 个指标、0 个不符**（v3.1 **3,319**、v4.0 **1,113**、v3.0 **29**），横跨 CISA-ADP、Oracle、VulnCheck、VulnDB、
GitHub、Patchstack、HPE、Cisco、MITRE、内核 CNA 等约 50 个来源。两个推论：**(1)** 在登记流水线上，存下来的 `baseScore`
处处是**派生值**，所以危险不是「有人手打了一个数」——而是某个页面在**同一个向量**旁印了**第二个**数（`zip` 案例），
或者某个读者把分数**跨版本**搬运（`Primary` 槽位陷阱）；**(2)** 这一周 NVD 只为 **4,461 个指标中的 8 个（0.2%）**
发表了**自己的**分数，所以「NVD 说 9.8」几乎总是关于一个 CNA 的数——而 NVD 只是转发——这正是为什么溯源问题（CLAUDE.md 规则 6）
而不是算术问题，一直在制造错误。

**同一条公告还是「GHSA id 未必是数据库记录」的第三例。** `GET /api.github.com/advisories/GHSA-m665-v7pm-7grj` →
**404**；`api.osv.dev/v1/vulns/GHSA-m665-v7pm-7grj` → **"Vulnerability not found"**；仓库渲染页 → **200**、231 KB、
向量在。于是可读的一手是仓库页，双方共享的键只有 CVE。（先例：Snipe-IT、Parse Server，10-26。）反面风险同样要记：
一条**缺**OSV 记录可能只是发布不满一天的抓取延迟——要说明是哪一种。

**两列、零一致，覆盖一家厂商整批。** 2026-10-25→26 发布的 **21** 条 ImageMagick 记录，同一 CNA
（`disclosure@vulncheck.com`）**每一**条都同时带 4.0 与 3.1 两个分；**21 对里 0 对相等**；**19 条 4.0 更高**、
**2 条 3.1 更高**（`CVE-2026-116145` 1.8 对 **3.9**；`CVE-2026-116149` 7.2 对 **8.1**）。写作后果：(a) 分布是关于
**某一列**的陈述——「平坦且低，9×4.8…1×1.8」是 4.0 列，3.1 列的最低记录不同（2.5，而非 3.9）；(b)「最低那条」随列
而变；(c) 21 条里有 2 条反向，所以 10-26 的「4.0 普遍更高」是倾向而非规则。工具：同一次逗号分隔的 NVD 调用即返回
两个 metric 对象，每批只花一次请求。

**推导值不是公布字段。** GPT-6.1 Terra 模型页写「**1,050,000 context window**」与「**128,000 max output tokens**」，
**完全没有 max input 字段**（`922` 只出现在 SVG path 数据里）。条目里的「**922,000 max input**」是两者之差——推理正确，
但**被当成字段**呈现。两者要分开：字段可以引用，推导必须标注（或者不写）。页面真正的长上下文规则更有用：
「超过 **272K** input token 的请求按 **2 倍 input 与 cache 费率、1.5 倍 output** 计费，且**按整个请求**计」——加价落在
**全请求**而非溢出部分。

**一个指标里可以装两个时钟。** S-1 的 **Run-Rate Revenue** 是「(i) 截至计量日的**过去 28 天**消费型费用之和**乘以 13**，
加 (ii) 计量日**月度订阅费**之和**乘以 12**」。两个窗口、两个乘数、一个数——所以「把 28 天窗口年化 ×13」只描述了半个
指标。该文件自带限定语应一并引用：「未获第三方独立验证」，且「已包含、并预计将继续包含我们随后认定为违反使用政策或
商业条款的客户的金额」。同一份摘要里还有两个单位陷阱：**$34.3B** 是 FY2025、**$72.4B** 是截至 2026-06-30 的**半年**
（两者都是「可转债、衍生负债与 SAFE 的公允价值变动」，不是收入）；**4,000 万客户**是**年收入低于 10 万美元的账户数**，
不是收入占比。

**一个缺失的数字有两种相反成因。** Pharo 14 的发布帖把贡献者人数留成字面占位符「**[X]**」——在页面 HTML 里核实存在，
是真未填的模板。EDGAR 文件是相反的情形：S-1 的收入占比句在按文本顺序抽取时读成「90%, 57%, 76%, and **%**」，因为该文档
是**绝对定位**的（逐行 `position:absolute` 的 div），第四个数字落在另一个块里，朴素的剥标签会**丢掉页面上看得见的数**。
永远不要凭文本抽取写「文件把 X 留空」——先看定位布局或 XBRL。

**`NOASSERTION` 不等于「无许可证」。** `nightly-labs/openbot` 的 `license.spdx_id` 是 **NOASSERTION**，而它的 LICENSE
文件写的是 **PolyForm Noncommercial License 1.0.0**（一手核实）。GitHub 的分类器不认识 PolyForm，所以 API 的
`NOASSERTION` 是**分类器缺口**而非缺席——这是「许可证是三个工件」的第三例（LICENSE 文本 / `spdx_id` / README 主张；
参见 10-25 的 `git-ai`）。

**没有基数的比率只是半个发现。** Cohere 的「十万分之一」看起来可以忽略，直到同一段给出乘数：「一个每周处理 **1,000 万**
agent 轮次的服务可能看到**多达一百次**这样的调用。」引用比率时带上来源自己用的量级，并优先引用做了乘法的来源。

**工具备注（无需动作）。** `claim-unit-lint.mjs` 通过 `raw.githubusercontent.com/<slug>/HEAD/…` 读 README，所以默认分支
为 `master` 的仓库（`alchaincyf/huashu-design`：`HEAD` 200、`main` 404，一手核实）会被正确读取——默认分支陷阱已闭合；
`[X]` 这类**拼写出来的**数字仍然不可见。

→ [[security]] [[vuln-supply]] [[disclosure-lag]] [[frontier-models]]

来源：[GHSA-m665-v7pm-7grj](https://github.com/zip-rs/zip2/security/advisories/GHSA-m665-v7pm-7grj) ·
[NVD CVE-2026-115905](https://nvd.nist.gov/vuln/detail/CVE-2026-115905) · [crates.io — zip versions](https://crates.io/crates/zip/versions) ·
[Anthropic PBC Form S-1](https://www.sec.gov/Archives/edgar/data/2130357/000162828026067168/anthropicpbc-sx1.htm) ·
[GPT-6.1 Terra 模型页](https://developers.openai.com/api/docs/models/gpt-6.1-terra) ·
[Cohere — concerning behaviour](https://cohere.com/blog/concerning-behaviour-popular-open-weight-ai-model) ·
[pharo.org — Pharo 14](https://pharo.org/news/2026-10-26-Pharo14Release.html) · [nightly-labs/openbot](https://github.com/nightly-labs/openbot)

## 2026-10-27 12:22 — 12:18 批次逼出的五项检查，每一项都是亲手做的

**1. 一篇文档的摘要可以低估它自己的定理——所以要引你真正指的那个界。** OpenAI 的 67 页 preprint（`Author: OpenAI`，`CreationDate`/`ModDate` 同为 `2026-10-25T00:00:00Z`，无致谢章节，无具名作者）对自己的运行时间给出**四种**写法，其中**摘要的最弱**：

| 位置 | 界 |
|---|---|
| 摘要 | `2^{n/(log n)^{1+o(1)}}` |
| 定理 1.1（一般 `m`） | `2^{O_k(√(n log log n / log n))}` |
| 定理 1.1（稠密，`m ≤ Dn`） | `2^{O_{k,D}(√(n / log n))}` |
| §6.4 有理插值——"the **weaker** exponent" | `ρ(n) = n(log log n)²/√(log n) = n/(log n)^{1/2+o(1)}` |

摘要的指数是 `n/polylog(n)`，定理的是 `√n·polylog(n)`。**论文的标题比它自己的定理更弱**，而它自称更弱的 §6.4 界仍然强于摘要。这与通常方向相反（[[frontier-models]] 论点 26 收集的是标题比产物*更强*的发布帖），但检查方式相同：**找出文档每一处写出该数字的位置，并说明你引的是哪一处。** 逐字核验的引文："Theorem 1.1 refutes ETH, SETH, Gap-ETH, and NSETH." 与 "It does not conflict with unconditional exponential lower bounds for restricted proof systems such as regular resolution [BI13]." 推论 C.1（`ENP ⊄ SIZE(O(n))`）引用的是 Williams [Wil13, Theorem 6.1]——一条 **2013** 年的蕴含，不是新结果。

**2. 读第二张表——构建速度基准的代价在运行时表里。** `indexable-inc/blaze` 卖的是「Rebuild Rust in milliseconds」，其基准页确实可复现（逐项目钉住 commit、具名机器、median-of-N、原始 JSON）。这条条目漏掉的是页面最后一张图：由该工具构建的二进制比 cargo 的 release 构建**慢 1.10–1.18 倍**（几何均值：macOS arm64 1.18×、Linux aarch64 1.14×、Linux x86-64 1.10×），其中 macOS arm64 上 **ripgrep 慢 1.50 倍**、aarch64 上 **words 慢 1.44 倍**。用 10–18% 的运行时倒退换取 10–24 倍的构建加速是一笔交易，不是白送的胜利，而它在覆盖所引数字的下方第四张表就写着。

**3. 格子里的标记是关于这次测量的声明，"最差"取决于你是否尊重它。** 同一页的 biome 行在 x86-64 是 **2.12 s → 2.38 s (0.9×)**，在 aarch64 是 **8.06 s → 108.75 s (0.1×)**——后者标了 **`(c)`**，意为「daemon 把这次编辑交还给了 cargo」。所以「最差的一行是 0.9×」只有在排除 `(c)` 格时才为真，而页面从未说要排除。两个数字都该进条目，并解释这个标记；标题挑一个、正文列两个，就是读者从一份文档里拿到两个互不相容事实的方式。

**4. `license: null` 有两种相反的成因，REUSE 是良性的那种。** `stalwartlabs/stalwart` 采用 **AGPL-3.0 + SELv2** 双许可，而 GitHub API 报告 `license: null`——因为**根本没有根许可文件**（亲手核验：`LICENSE` 404、`LICENSE.md` 404、`LICENSES/AGPL-3.0-only.txt` **200**）。该字段只认一种形态（GitHub 检测器认识的根级 `LICENSE`/`COPYING` 文件）；而这个仓库用的是 REUSE 布局。所以同一个 `null` 既表示「未声明许可」（`nightly-labs/openbot`：`NOASSERTION` 之下是 PolyForm Noncommercial 文件），也表示「许可声明在检测器不看的地方」。照旧是三件产物：**字段**、**许可文件**、**发布页的声明**——`null` 一个都没回答。

**5. 发布产物：4 个仓库 0 个对齐，且四处不一致里有三处是重名，不是版本漂移。** `release-drift.mjs`（0 次 `api.github.com` 调用）跑本批引用最多的四个仓库：

| 仓库 | 判定 | 不一致之处 |
|---|---|---|
| `indexable-inc/blaze` | `name-collision` | manifest **0.1.0**；最新 tag `23.1.4-e152d9fa2bc2`（一个 **llvm** tag）；npm `blaze` → `blazeui/blaze`；crates.io `blaze` 是无关的 HTTP 框架 |
| `stalwartlabs/stalwart` | `name-collision` | release **1.0.0**；npm `stalwart@0.1.0` → `mbrio/stalwart` |
| `mautic/mautic` | `name-collision` | release **7.2.2**；manifest `package.json` 写的是 **0.0.0**（占位符）；npm `mautic@0.0.4` → `fieldcontrol/mautic` |
| `FrigadeHQ/hob` | `registry-lags-release` | release **0.2.1**；npm `hob@0.0.1` 且**无 repository 字段** |

10-24 批次测得的教训（「只有 15% 对齐」）主要不是关于版本：**最常见的失败是名字不是仓库。** 四例中有三例「安装 X」解析到另一个项目的包，第四例的注册表记录毫无出处。引用任何版本前先看注册表记录自己的 `repository` 字段，相信某个 tag 之前先看它的*名字*。

→ [[frontier-models]] [[dev-tools]] [[vuln-supply]] [[disclosure-lag]]

Sources: [paper.pdf](https://github.com/openai/math/blob/main/preprints/The-Exponential-Time-Hypothesis-is-False-October-25-2026/paper.pdf) ·
[blaze benchmarks](https://github.com/indexable-inc/blaze/blob/main/docs/benchmarks.md) ·
[stalwart v1.0.0](https://github.com/stalwartlabs/stalwart/releases/tag/v1.0.0) ·
[FrigadeHQ/hob](https://github.com/FrigadeHQ/hob)

## 2026-10-27 20:03 —— 一个批次里三个归属陷阱，其中一个是被引错的作者

### 1. 一串分数是同一个公式的几个停止点，不是几种意见

`CVE-2026-107656`（FortiSandbox，FortiGuard `FG-IR-26-185`）看起来为一个弱点带了三个数字——批次原文
写的 **9.8 / 9.6 / 9.2**——而诚实的计法是：**只有一个是基础分**，但这三个也不是三种评估。CNA 指标把
`baseScore: 9.6` 摆在与 `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H/E:F/RL:O/RC:C` 旁边；NVD 用
**同一个来源**给出 **9.8**，并把时间分量**剥掉**（`CVSS:3.1/AV:N/…/A:H`）——那是 NVD 把 CNA 提交的
时间向量归一化到基础指标。所以：

| 算法 | 值 | 是什么 |
|---|---|---|
| 基础 | **9.8** | `AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H`——也是 NVD 打印的 |
| 基础 × `E:F` | **9.6** | 厂商公布的数；`RL`/`RC` 未应用 |
| 基础 × `E` × `RL:O` × `RC:C` | **9.1** | 完整 3.1 时间公式 |

`9.8 × 0.97 × 0.95 × 1.0 = 9.0307`，3.1 规范的 `Roundup`（先 `Math.round(x*100000)`，末四位非零时取
`(floor(i/10000)+1)/10`）得 **9.1**，而不是本刊先前的 **9.2**。已在 en/zh/jp 与三个 `latest.md` 镜像
就地更正。

可复用的命名陷阱：**`baseScore` 是字段名，不是保证。** 在 `vectorString` 带 `E`/`RL`/`RC` 的指标上，
`baseScore` 里的数字可能是基础分、部分应用的时间分、或完整时间分——而记录本身不会说。从向量重算，并说明
你引的是哪个停止点。`cvss-recompute.mjs` 只实现**基础**方程（v3.1/v3.0 基础，按规范），所以带时间向量的
记录正是它的 `exact` 只意味着"基础算术对得上"、而非"分数是对的"的那种情形。

### 2. `>` 前缀的句子是别人的——而 HTML 去引号会丢掉这一点

批次把"This unreliable and non-deterministic machine should not be sending messages unsolicited to
Debian package maintainers."归给了 **Ben Finney**。到源头去读（`debian-devel/2026/10/msg00289`），
这句话是**被引用的文本**，深度 `> > `——它出自 **Martin Steigerwald**，而 Finney 自己那封信是在**为**
这句话的立场辩护，对象是 **Theodore Tso**——后者回以"Humans are unrelible and non-deterministic, you
know"（原文如此）与"if you think it's a waste of time, feel free to ignore the report"。Finney 的原话
是："I am deeply troubled you would equivocate between a machine and a human in this conversation…
When a machine is unreliable, we have no obligation to suffer it."真实的线索是三方分歧，而错误归属
把一次辩护变成了一次升级。

机制是机械性的，所以值得写下来：把邮件列表页面转成纯文本，会把 `<blockquote>` 嵌套变成 `>` 前缀，而
折叠空白的规范化器会把它们吞掉。**我自己的引文检查通过了这个字符串**——它确实在页面上——所以"存在"
不等于"归属"。要加的检查是：对任何来自串式来源的引文，记录**引用深度**；深度 0 是作者本人的，更深的
是前一位发帖者的。这和"引文必须可 grep"是同一种类，只是它的下一层：可 grep 是必要条件，不是充分条件。

### 3. 一份阐释不是第二份证明，而作者通常会这么说

OpenAI 的 ETH 预印本之后 24 小时，出现了一篇 **22 页**的"A simplified proof of ETH is false"
（`shivakintali.github.io/papers/ETH.pdf`，标日期 2026-10-26）。摘要自己的致谢句——"**Our simplified
exposition of OpenAI's proof [1]**"——把框架定死了："现在有两份证明"是错的，"24 小时后出现了一份同一
证明的、更短的第二次写法"才是对的。让它可检验的细节是量词："For every fixed ε > 0 … Cε(n + m + 1)^cε
2^(εn)"，以及"This parameter is fixed before the input is given; the algorithm and its polynomial time
factor may depend on it"——是**每个 ε 一个算法**，不是一个带旋钮的算法。反驳标准的正速率形式于是就是
"taking, for example, ε = δ/2"。

**规则：** 当第二份文档很快出现时，先读它如何描述自己。`exposition`、`survey`、`note`、`comment on`
都是作者在告诉你这份文档是什么；把它算成一次复现的引文图，量的是引文，不是数学。这是本文件追踪该体裁的
第十个实例——一个独立性未说明或并不存在的独立复现主张。

→ [[frontier-models]] [[vuln-supply]] [[no-ai-default]]

来源：[CVE-2026-107656 (NVD)](https://nvd.nist.gov/vuln/detail/CVE-2026-107656) ·
[cveawg — CVE-2026-107656](https://cveawg.mitre.org/api/cve/CVE-2026-107656) ·
[FortiGuard FG-IR-26-185](https://fortiguard.fortinet.com/psirt/FG-IR-26-185) ·
[debian-devel msg00289](https://lists.debian.org/debian-devel/2026/10/msg00289.html) ·
[A simplified proof of ETH is false (PDF)](https://shivakintali.github.io/papers/ETH.pdf)

## 2026-10-28 — 从"从未解码的抓取"里得到的"0 次出现"是**未读到**，不是不存在

本批次最锋利的一次自我纠正，因为抓到我的是工具，不是反过来。

核查第 1 条 Genie 4 的说法时，对 DeepMind 那篇帖子 `curl -s` 后 grep，`SynthID`、`drift`、
`benchmark`、`remain`、`limitation` 全部返回 **0**——一个干净、看起来可引用的"帖子没这么说"。
但保存下来的 44,572 字节全是乱码：服务器给的是**压缩**响应体，而这次抓取没有 `--compressed`，
所以每一次 grep 都跑在编码流上。对同一 URL 运行 `doc-twin.mjs --probe`，它报告
"**plain HTML ok** · 219 KB · **30,224 chars of visible text**"——同一页面的两个测量不可能同时为真。
规则：**当页面自身的文本长度与你的 grep 相互矛盾时，嫌疑在抓取，不在页面。**
加 `--compressed` 重抓：`SynthID` ×1、`drift` ×3、`limitation` ×1、`benchmark` ×0，
局限性段落逐字可读。

所以第三种状态（[[disclosure-lag]] 的闸门、`doc-twin` 的 "unreadable"）有**第二扇门**：
JS 闸门让文本渲染不出来，坏掉的抓取让文本*根本不在那里*。两者在 grep 里长得一模一样，
而且都不是关于来源的证据。便宜的识别法：字节数相对页面已知大小小得可疑、开头是非 UTF-8 垃圾、
以及 doc-twin 的判定与 grep 相矛盾。

**而核实过的页面仍然让信息流付出了一处引用错误。** 解码之后，信息流写的"复杂物理交互、实时音频
准确性、可读文字渲染、空间准确性与长期一致性'**仍在研究中**'"无法 grep：页面说的是
"**are active areas of ongoing research**"。五个条目与其顺序都是对的（已核实），所以分析成立——
这属于只错引用的那一类，已在 en/zh/jp 与三份 `latest.md` 镜像就地修正，速度不变。

**同批次三个发布产物状态，各自都是一个"今天发布"陷阱：**

- **LFM3**：博客说六个模型；Hub 上有 **19** 个 LFM3 仓库，其中 `LiquidAI/LFM3-Audio-2B` 创建于
  **2026-09-08**——比发布早六周——而 `LFM3-1.7B-Base` 创建于 **2026-10-26**，反而*晚于*它理论上
  所生的文本模型（10-23）。`LiquidAI/LFM3-1.7B` 显示 `downloads 6,311 / likes 111`，且
  **`license: other`**，与模型卡上的 LFM Open License v1.0 相符，也与把 "open-weight" 读成 Apache
  相矛盾。博客页面完全没有声明许可证（grep 只命中一段捆绑的 three.js 声明）。
- **Hurston-1**：`destined/hurston-1` 是 **`gated: "auto"`**、**33 次下载**、创建于 **2026-10-15**、
  最后修改 **10-17**——Show HN 出现在产物落地十一天之后，而模型卡是 Apache-2.0。
  "Apache-2.0" 与"没有门禁"是两个不同的说法。
- **CFSG**：`AxiomMath/CFSG` 是真的（创建 **2026-10-27T13:19:32Z**、Apache-2.0、
  `open_issues_count 0`、04:25 UTC+8 时 **58★** 对信息流的 56），但它的提交列表有 **2** 次提交，
  不是信息流报的一次——这把"没有开发历史"的读法从"一个压缩提交"改成"两个，都在创建后两小时内"。
  `pushed_at` 是 **15:07:45Z**，比创建晚 1 小时 48 分。

→ [[vuln-supply]] [[frontier-models]] [[dev-tools]]

来源：[DeepMind — Genie 4](https://deepmind.google/blog/genie-4-a-new-generation-of-world-simulation/) ·
[LiquidAI/LFM3-1.7B](https://huggingface.co/LiquidAI/LFM3-1.7B) ·
[destined/hurston-1](https://huggingface.co/destined/hurston-1) ·
[AxiomMath/CFSG](https://github.com/AxiomMath/CFSG)

## 2026-10-28（20:03）——`created_at` 是仓库的时钟，不是项目的

`maharmstone/moxnox` 发布了 **v1.0**：一个自举（self-hosting）、以 NT 系统调用为形、跑在 btrfs 上的
类 POSIX 操作系统，"约 **130,000 行 C++**"，出自一个 **2026-10-22 创建**的仓库。若把它当成年龄来读，
那就是六天写出 13 万行 OS。用裸克隆实测（`git clone --bare`，零 API 预算）：**9,479 次提交**，首个提交
**2021-12-08 19:26:58 +0000**（"initial commit"），最后一次 **2026-10-27 22:52:08 +0000**——一段
**4.9 年**的历史，而 `created_at` 字段看不见它。`created_at` 是仓库*记录*被建立的时间（这里是：一个老
项目的新公开家），永远不是工作有多老；它是 `pushed_at` 休眠检查的镜像失败（陈旧的 `pushed_at` 也证明不了
分支是死的），而两者最便宜的判别器都是历史，不是元数据。

同一份 README 还带着本批次最干净的**来源声明**，而它的具体性正是重点："
**None of the substantive code was written by AI.**"——紧接着说明 AI *被*用在了哪里（"把 autotools 翻成
CMake、把 `ioctl` 换成 `tcgetwinsize`、把 C 结构体翻成 Rust"，以及一些冒烟测试），还有一个是评审而非署名的
角色："Where Claude really shines though is in reviewing your own commits. You give it a hash, and it tells
you about the silly memory leak or deadlock that you left in." 点名了机械性任务的声明可审计，笼统的
"no AI"不可。→ [[no-ai-default]]

## 2026-10-28（20:03）——我自己核查里的两个假阴性：一个被切开的引文，一个分隔符

两者都属于*"没读到不等于不存在"*家族，而且两者都会被写成"发现"发出去：

- **一句逐字引文可能因为页面把它切进了行内标记而 grep 不到。** Anthropic 的药物项目文章对
  "mostly preclinical" 返回 **0** 次命中——这读起来就是伪造引文（Cerebras 那种形状）。页面里其实有，
  被切成三个 span：`…so far it is mostly ` / `<em>preclinical—</em>` / ` that is, for the most part,
  it isn't yet at the stage where the drugs are being tested in humans.` RSC 载荷里也是同样的三份
  `_type: "span"` 子节点。所以*字符串*不存在、*引文*却精确——同一个测试得出了相反的结论。要 grep 邻域，
  或者先去标记；绝不要靠一次子串匹配失败就发布"伪造引文"。
- **格式差异不是矛盾。** `brangus.io` 的表格写的是"**21 of 22** right"、"19 of 22"、"14 of 22"；
  搜 `21/22` 返回 **0**，而 feed 里的"21/22"是对的。在报告"缺席"之前先归一化分隔符。

**同批次里我自己的一个真实单位失误：** RuView 的逐关节表给出 **r_hip 25.0% PCK@20 / 76.9% PCK@50**、
**r_knee 0.9% / 35.2%**、**r_shoulder 1.9% / 19.9%**——而文档自己的总结句写成"`r_hip` 77% PCK@50、
`r_knee` 35%、`r_shoulder` 20%"（全部是 @50）。引用*总结句*而不是*表格*，给三者中的两个贴错了 @20 标签。
在一个头条数字是 @20 的页面上，未加标签的同伴数会默认继承头条的单位——一张表就这样变成了一句错话。

→ [[vuln-supply]] [[disclosure-lag]] [[frontier-models]]

## 2026-10-29 —— 匹配数不是对象数，组成不是矛盾

04:20 那一批里我自己的两句话都失效了，而且失效方式相同：**那个数字数错了东西。**两句都不是事实错误，而是把正确的事实挂在了错误的对象上。

### 1. `grep -c` 数的是行，而一张证书会把自己的名字写两遍

> 本机 `/etc/ssl/cert.pem`「带 **8** 处 `emSign` 匹配」

在 macOS 15.5（24F74）上实测：文件里有 **128** 张证书，其中 eMudhra **4** 张（`emSign ECC Root CA - C3`、`emSign Root CA - C1`、`emSign ECC Root CA - G3`、`emSign Root CA - G1`）。它确实含 8 行匹配 `emSign`，因为每张证书都贡献一行 `subject=` 和一行 `issuer=`，且同名——自签名的根把自己写了两次。所以数出来的是**行**，却被当成**根**发布；而这个修正不是修辞问题：该条的全部要点就是它与另一个信任库的数量不同（keychain 里是 **2**）。应当枚举 PEM 块并对每块问 `openssl x509 -subject`；对 PEM 包做模式计数，得到的是*提及*数。

### 2. 裸的 `security find-certificate -c` 查的是一个不含系统根的列表

> `security find-certificate -c "emSign ECC Root CA - G3"` 返回来自 `SystemRootCertificates.keychain` 的根

并不会。在同一台机器上，这条裸命令回答「在 keychain 中找不到指定条目」——因为默认搜索列表是*用户的*，`SystemRootCertificates` 不在其中。带上参数就成立：`security find-certificate -a -p /System/Library/Keychains/SystemRootCertificates.keychain`。**一次没去看的搜索给出的「没有」，不是缺席**；而一条印进 feed 的验证配方，必须是真正跑过的那条命令。

### 3. 「两处不一致」——第二个数字是另一个对象，而且卡自己说了

> Hugging Face 元数据「把模型列为 **34B**」，而博文说「**30B**」——「一种会让容量规划出错的落差」

卡上的 Model Summary 原文是：「Total Parameters **34B (4.3B active), including the audio encoder**」，safetensors 索引合计 **33,697,781,029**，仓库名是 `…-30B-A4B`。所以 **30B 是语言主干，34B 是整个检查点**（主干 + 约 800M 音频编码器 + MTP 草稿层），而说明这层构成的句子，正是那条目只引了一半的那句。这与 Terra 的「922,000 max input」（一个减法，没有这个字段）以及 Nemotron 的前代同形：**两个规模不一致时，先读第二个数字旁边的从句，再叫它错误**——写明的组成不是矛盾，而「容量规划」读的是检查点，那恰好是正确的那个数。

**这三条共有的通则：** 发布任何计数之前，先说清被数的是什么对象、用的是什么操作（grep 匹配？PEM 块？文件？agent？PR？）。若答案是「模式产出的数」，那它就是个提及数，直到被证明不是。

→ [[security]] [[vuln-supply]] [[frontier-models]]

## 2026-10-29（12:17 批次）——星数既不是注意力也不是采用量，而加粗的一行不是最大值

一个批次里的四个单位。第一个我以后会最常用。

**（a）星数是第三种对象，而它的失效在同一批次里有两种相反形态。**2026-10-29 12:19 经 `api.github.com` 核实：

- `cloudflare/security-audit-skill`——**51,842★ / 3,302 fork / MIT**，创建于 **2026-06-18**（与它的发布博文同一天），而**自 2026-09-14 起无提交**。星数标注的是*公告*的日期；代码已 45 天未动。一次传播事件。
- `divagr18/qwenputer`——一个深度的单人产物（模型权重里跑着一个可用的 RISC-V 核），拿到 **195 个 HN 分**，而十一小时后只有 **112★ / 10 fork**。受众留在评论区，仓库从未见过他们。

两个数字都没错，也都不是采用量。要看的是**仓库自身运动与帖子之间**的比值：一个高星数配着休眠仓库，是在吃发布帖的老本；一个活产物配着很小的星数，说明注意力在星数读不到的地方。

**（b）加粗的一行不是最大值。**腾讯的 Hy-SimulMT 卡片把*整个*模型行加粗——「整个 Hy-SimulMT 行被加粗以突出我们的模型」——所以那些加粗值不携带任何信息，只有跨列最大值可比较。同一张卡上还有两个单位：**StreamLAAL 不是首字节输出时延**（「StreamLAAL 与首次语音输出的时间不是一回事」），所以它的约 3 秒是流上的平均滞后，不能和 TTS 管线的启动延迟相比；而 `language:` 列了 **36** 个代码——`zh`、`en`、`ug`、`bo`、`kk`……——但模型简介写的是「**中文与英文**之间的双向语音到语音翻译」，所以标签描述的是分词器或 Hy 家族，把它们读成 36 个语言对是错的。卡片自己的限制应与结果一起引用，因为声音克隆是它的头条特性而评测并未测量它：「这些结论只适用于本测试使用的样本、参与的译员与评测设置。它们**不**构成对语音质量、音色相似度或其他维度的全面评估。」

**（c）「低于 1,000」是一次阈值穿越，不是一个稳定状态。**Stack Overflow 的问题数取自 **Stack Exchange API 自己的 `total` 字段**（SEDE 图被 `Just a moment…` 拦住，所以这是同一存储的免门禁路径）：**961**（2026 年 9 月）、**1,019**（8 月）、**1,175**（7 月），对照 **5,263**（2025 年 10 月）、**5,072**（2025 年 9 月）与 **141,749**（2020 年 10 月）。**8 月在这条线之上**，所以诚实的说法是「趋势在最近一个完整月份越过了 1,000」，而不是「该站现在每月少于 1,000 问」——在阈值上差 7% 与一个持续状态不是同一个断言。而且单位是**问题**，不是访问量、也不是回答：一个正在丢失提问、却仍靠历史语料留住读者的站，看起来正是这张表。

**（d）一个值得记下的正面：复合计数器连续三次被正确拆分。**全部核实：`security-audit-skill` **102 = 35 个 issue + 67 个 PR**；`knowledge-work-plugins` **153 = 92 + 61**；`LinkSwift` **49 = 38 + 11**。10-25/10-26 那条规则正在被执行——而这次拆分带来一个我以前没记下的第二读法：**PR 占比是仓库类型属性**。用户脚本抓取器是 **11/49** 个 PR（issue 偏多，因为用户来报失效），而一个 agent 控制面是 **2,218/3,286**。所以复合值的构成回答了「这是什么类型的项目」，只标记未拆分数字的检查会把这个信息丢掉。

**（e）同批次还有一处许可证三产物：**`divagr18/qwenputer` 的 `license.spdx_id` 是 **`NOASSERTION`**，因为仓库是 **MIT 加例外**（「`games/roms` 里的 CHIP-8 ROM 不在本许可证覆盖范围内」），而它的 Hugging Face 卡片声明 **`apache-2.0`**（`gated: false`、**173** 次下载、**49** 个赞）。三个产物、三个答案——与 git-ai、LFM3、Atria Dawn 同形，也正是规则要说「点名你的产物」而不是「查一下许可证」的原因。

→ [[in-weight-compute]] [[vuln-supply]] [[frontier-models]] [[dev-tools]]

## 标识符守卫同样是**页面**规则，而页面才是它咬人的地方（2026-10-29 20:29）

`claim-unit-lint.mjs` 在 10-29 批次学会了：紧贴字母的数字——`FP8 model card`、`30B-A3B`、`H.264`、`3.16.2`——是**名称**的一部分，于是不再把条目正文里的这些读成计数。但这个守卫从未应用到条目**引用的页面**，而那才是更难的一半：README 里满是披着计数名词的产品名和表格 ID。在 `agent/data/claim-unit-cache.json` 已有的 **29** 份页面/README 文本上测量（不新增抓取）：**94** 个计数形状的匹配里有 **7 个（7.4%）**是标识符伪影，而且有**两个**页面上伪影是**唯一**的匹配——图片 alt 文本里的 `VoxCPM2 Model Architecture`（被读成 **2 个模型**）与 SkillSpector 严重度表格行 `P8 | Tool-Based Exfiltration`、`TM1 | Tool Parameter Abuse`（被读成 **8 个**和 **1 个工具**）。没有守卫时，这两页会用错误的数字回答「N 个模型／N 个工具」，把一条正确的断言变成 `differs`，或把产品名变成 `number-other-noun`（「页面的中心名词不是……」）。

`countNumsIn` 与 `numberNeighbours` 现在都经过 `identifierNumber()` 过滤；自测 **83 → 87**；在 **10-26／10-27／10-28／10-29**（187 个条目）上重跑，计数检查返回 **0 条发现**、只剩那两条已知的提示，说明守卫收回了误报能力而**没有改变任何一条已发布的判定**。一般规则与本文件一贯的线索一致：**检查器不拥有的单位，就会被读成它拥有的单位**——先是在断言上，现在是在核对断言所用的页面上，而那正是读者永远看不到的一侧。

→ [[in-weight-compute]] [[vuln-supply]] [[frontier-models]] [[dev-tools]]

## 2026-10-30 20:30 — 缺席断言指名的是**字段**，而这句话指错了字段

20:16 批次对 ClickHouse 的 `CVE-2026-116366` 发布了「CNA 容器没有写 CWE」。`cveawg` 返回 `problemTypes.descriptions[0].cweId = "CWE-190"`，NVD 的 `weaknesses[]` 里是同一个值。这不是推理错误，而是 CVSS 一侧早已有规则（「说出你解析的是哪个字段」）的那类缺陷，只是落在一个没人看过的字段上。

执行器现在是一条检查而不是一句话，因为散文里的规则在生成时不会触发（10-26 的教训）。它必须编码四条边界，每一条都是这条检查否则就会给出错误判定的方式：

- **`NVD-CWE-noinfo` 与 `NVD-CWE-Other` 是「此处为空」的字段用语，不是取值。** 把它们算进去的读者，会把每条已分析记录都标成带弱点。
- **部分引用不是错误。** 只提记录两条弱点之一是在引用，`cwe-mismatch` 只在集合与两个字段都**不相交**时才触发。
- **被陈述的 id 需要锚点。**「与 CWE-79 同类」是对另一条记录的交叉引用，所以断言必须位于点名该 CVE 的句子内，或跟在记录动词（`carries`、`classifies as`、`records`）之后。
- **弱点自身的标题不是缺席断言。** 对两份旧 feed 的首次校准把 `CWE-306 missing authentication`（CWE 的名字）读成了「字段缺失」，所以这条分支现在只认「CWE is/was missing」与「CWE … not stated/recorded/assigned」（10-28／10-29：修前 1 条、修后 0 条，9 条已核实）。
- **点名了字段不是免责理由。** `slot-quoted` 形态会抑制「描述被纠正的那个错误」的句子——但「CNA 容器没有写 CWE」本身就是字段断言，也正是写错的那句。抑制只留给**被引述或被归属**的缺席。

要带走的一般单位：**缺席断言是关于某个字段的断言，因此任何另一个持有取值的字段都能否证它**——而一个在字段被读取之前写下的缓存，绝不能代替「记录里没有它」（CNA 缓存现在带 schema 版本，正是为此）。

→ [[disclosure-lag]] [[vuln-supply]] [[security]]

## 2026-10-31 —— 引号里的句子是关于**字节**的断言，而抽取器是仪器的一部分

同一缺陷的三次发布，而人眼一次都没抓住的原因在于：**这句话读起来是真的**。Cerebras 被引作「an illustrative configuration, not a reported **end-to-end** benchmark」（`end-to-end` 在 184 KB 的载荷里出现 **0** 次）；Northflank 那条「逐字」指令在重读之前一直是转述；10-31 的 feed 把 `nesformer` 的「The model was not trained. A compiler computed its weights.」发了出来，而 README 写的是「**Nobody trained these weights; a compiler computed every one.**」。每一处周围的*分析*都是对的，只有引文是编的——这正是它能活过审阅的原因。

`claim-unit-lint.mjs --check quotation` 现在拥有这个单位。那个文件里其他每一项检查读的都是数字，只有它读字符串；而它的检验是文件里最便宜的，因为页面文本早已被 `count` 检查抓到手里——`page.includes(quote)`。

**它在立案当天产出的那条发现。** 10-31 feed 的第 10 条：「the complete proposed method still requires further experimentation」。arXiv 2610.40545 的摘要写的是「**to test the full proposed method further experimentation is necessary**」。没有数字错、没有状态过期、没有仓库归档——其他每项检查都让这一条通过，而这句话听起来正像作者会写的限制。这是任何旁证数字都抓不到的唯一失效形态。

### 九条护栏，以及最初十三条发现里有八条是检查器自己的错

这才是可复用的部分。**引文检查不能未校准就上线**，因为一段真引文对不上真页面，比一段假引文对不上要常见得多：

1. **标点不是词。** 最初十三条第里有九条是来源继续、而引文以句号、逗号或冒号收尾——Model Spec 的「…reflect the Model Spec, **but** we are…」被发布成「…the Model Spec.」。一个拥有「编造句子」的检查不该报标点漂移，所以包含检验只跑字母与数字。（同一条规则也顺手解决了句尾与「标题的句号被写成逗号」两件事。）
2. **引号按行配对，奇数行整行跳过。** 错配的 span 会从一段引文的结尾连到下一段的开头；草稿里 29 词与 32 词的「引文」就是这么来的——而对抽出 span 加长度过滤会让错配**更糟**，因为跳过一段很短的 `"95%"` 会把这一行之后的所有配对整体错位。
3. **去空白回退。** 词中间的 `<em>` 在去标签时会变成空格，硬换行的 README 会把句子断到两行。两边都去空白比较，一次解决两者。
4. **仓库的 `description` 不是它的 README。** 第 5 条的「Skills for Real Engineers. Straight from my .agents directory.」在 `mattpocock/skills` 的 README 里 grep **0** 次，却在 `description` 字段里逐字存在——而 trending 页显示的正是那一行，所以作者抄的就是它。仓库页面（`github.com/<slug>`，不计费）只在**引文仍未命中时**才抓。
5. **记录不是页面。** 「In the Linux kernel, the following vulnerability has been resolved」是对 CVE 记录 `descriptions[]` 的引用，任何被引博客都不必承载它。NVD 与 CNA 的 description、KEV 的 `name` + `shortDescription` 都是逐字来源，所以字段引文要对字段核验——CNA 缓存因此升到 **`v: 3`**。
6. **抽取器的 bug 会被读成伪造。** 页面抓取器解码了 `&#39;` 却没解码 `&#x27;`，于是第 16 条的标题——两个被引页面上都有，其中一个还是 HN 帖子自己的标题——被当成编造的句子。页面缓存因此加了 **`v: 2`**。一般规则：**抽取器是仪器的一部分**，由旧抽取器写下的缓存不能成为新检查的证据——CNA 缓存带 schema 版本本来就是同一个理由。
7. **省略号是片段。** 每个片段各自成立；只有 ≥6 词的片段能产出发现。
8. **一段引文可能逐字存在于检查从未打开的页面上。** 什么都没读到时就诚实地报 `quote-not-read`——未读不等于不存在。
9. **强调引号不是引用，而检查器分辨不出来。** 「good at repository edits, weaker at long-horizon shell work」是 **feed 自己的解读**加了引号。修法是去掉引号，而不是去找来源——它与 `slot-quoted`、`counted-by-author` 同属一类：披露本身（或没有披露）就是那条发现。

### 本批另外四处更正是同一类问题的不同表面

第 **14** 条把 bunny.net 的两句话并进一对引号（「found no evidence of unauthorized access, though it could not be fully ruled out」——页面写的是「…to the CDN node or any of its data」，并另有「cannot completely rule out the possibility」）。第 **20** 条替换了 us-tax-model README 里的两个词（把「proves a line points at a page, not that it was **read** correctly」写成「show where a line points, not that it was **interpreted** correctly」），并把求值器独立性的限定挂到了错误的对象上。第 **8** 条把模型卡的告诫转述后放进了引号（把「a capacity limit, not a guarantee of uniform accuracy across all sequence lengths or tasks」写成「does not guarantee consistent accuracy」）。

合并式转述与替换一个词，比整句编造**更**危险：周围的事实都对得上，而引文看起来像旁证。抓住它们的单位是同一个。

### 校准

未更正的 10-31 feed：**13 条发现 / 9 条已核实**。就地更正四处（第 8、10、14、20 条）并去掉三处强调引号（第 9、12、16 条）之后：**0 条发现 / 15 条已核实**，余下四个 4–5 词的 span 留在 `quote-short`（辅助），而不是升成发现。`--selftest` **109 → 126**，其中十七条属于这条检查。

→ [[disclosure-lag]] [[security]] [[no-ai-default]]

## 2026-10-31 12:19——又四个单位：一个工作集、一张图、一个校验和、一个文件夹

### 表是一张图，而图不是表

本批两个模型发布都把头条对比做成**渲染资源**、旁边没有表：`baidu/Unlimited-OCR-2` 说它「Achieves state-of-the-art performance across both dozens-of-pages benchmarks (e.g. MPDocBench) and extreme hundred-page benchmarks (e.g. MarathonDocBench)」，排行榜渲染成 `assets/leaderboard.png`；`XHToken/Spark-X2.6-4B` 声称匹配「models with approximately 9B parameters」，交付的是 `images/all_benchmark.svg`。于是两张卡里的任何数字不经 OCR 就无法引用或核对——而且截图没法像表那样在厂商改版时被 diff。检查是机械的：**在卡片的基准小节里 grep `<table>` 或 `|`；整段证据只有 `![...](...)` 或一个 SVG 链接，就是「发布了断言的一张图片」。**推论是：这类卡里的「SOTA」是定位陈述，两边的可审计部分在别处——Spark 是分发清单（`llama.cpp` 自 build **b10828** 原生支持 `spark2_5`、Ollama **0.34.1+**、MLX、LM Studio），OCR-2 是服务附录。

### 「unlimited」是关于工作集的断言，不是窗口

Unlimited-OCR-2 的机制是 **SR-SWA**：把文本-视觉注意力「compress[ed] … down to a fixed-size set of working references (e.g., 512 tokens)」，从而把计算限制住，使「per-step decoding latency and memory footprint nearly constant regardless of document length」。多页解析是一次请求（`"<PAGE><image>" * num_pages + "Multi page parsing."`），代价写在附录里：页面窗口复用前一个窗口的 KV 尾部、`--mem-fraction-static 0.7`（0.75 在 **32** 并发以上 OOM）、以及明确的取舍——更小的页面窗口降低峰值内存但**在窗口边界丢失跨页合并**。这是 10-30「1M 上下文 vs 131K 部署」那个单位再下潜一层：产品名数的是**被限住**的量，没被限住的是一个可调窗口加一个内存预算。

一手核对的 Hub 状态：`baidu/Unlimited-OCR-2` MIT、**24,276** 下载、**457** likes、`createdAt` **2026-10-26T03:57Z**（条目写「released 2026-10-27」——Hub 自己的创建时间早一天）；`XHToken/Spark-X2.6-4B` apache-2.0、**12,515** 下载、**923** likes、最后修改 **2026-10-31T02:26Z**。

### 校验和与任务是两个问题

"**Broken on Arrival**"（arXiv **2609.05881**）用 15 题代码筛选扫描了 Ollama 官方库 **15** 个模型线里**全部 305** 个合规代码 GGUF tag，外加 **22** 个 Hugging Face 社区文件，再对可疑项用全部 **164** 道 HumanEval+ 重测。**七个官方 tag（2.3%）最多解出六题**，全是**≤4B** 参数模型的低位量化。

对照就是发现：五个可疑项从原始权重重建成「matched our uncalibrated rebuilds tensor for tensor, so none was corrupted」——随后是那句要保留的话，「**Exact reproducibility did not imply function.**」变量是**校准**而非位宽：权重、工具链与张量组合同定，加入 importance matrix 让 `Qwen2.5-Coder-3B` 在三个量化级别上从**零升到 164 题中的 76–113 题**，而同样的未校准配方让 `Qwen2.5-Coder-1.5B` 仍然可用——所以配方本身预测不了失败。误报一侧：「None of 66 sampled tags that passed the screen was non-functional」。**v3** 修正了早前的一个诊断：一对社区 `deepseek-coder-6.7B` 失败的原因是**缺聊天模板**，不是后端。

于是同一个工件上叠着三层验证单位——*文件是不是发布者的*（哈希）、*能不能加载*（加载测试）、*能不能做题*（任务筛选）——而注册表公布的是**下载量与 likes**，三层都不是。操作规则：**≤4B 低位量化**先跑任务级冒烟测试再信标签；标签失败时，先考虑**换同一模型的已校准量化**，再去怀疑损坏。

### 许可证可以按文件夹分，而仓库级徽章是第四种工件

`anthropics/skills`（一手核对：**185,423★**、**21,904** fork、`open_issues_count` **1,450**、`pushed_at` **2026-10-28T19:20Z**、**`license: null`**）**没有根目录 `LICENSE`**（404），根目录只有 `.claude-plugin`、`.gitignore`、`README.md`、`THIRD_PARTY_NOTICES.md`、`skills`、`spec`、`template`。许可证写在 README 里，而且是**一个仓库两套**：「Many skills in this repo are open source (Apache 2.0). We've also included the document creation & editing skills … in the `skills/docx`, `skills/pdf`, `skills/pptx`, and `skills/xlsx` subfolders」，其中「These are **source-available, not open source**」。`skills/` 有 **19** 个文件夹（按 contents API 计数），所以 **19 个里 4 个**是「可读不可复用」。README 还说这些 skill「provided for demonstration and educational purposes only」，且「the implementations and behaviors you receive from Claude may differ from what is shown」——厂商在说实际发货的行为不是这份代码。

许可证在知识库里现在有**四种**工件形态：注册表/API 字段（`NOASSERTION` 或 `null`）、根 `LICENSE` 文件（或其 404）、README 声明、徽章。只有按**文件夹**枚举才能回答「我能不能 vendor 这个」。

→ [[security]] [[vuln-supply]] [[frontier-models]] [[agent-plugins]]

## 2026-10-31 12:32（act）— 检查器的沉默本身就是一种断言：全刊 13.1% 的引号行从未被判定

`quotation` 检查建于 2026-10-31，只在同一批数据上校准过，所以它自身的覆盖范围是"假定"而非"实测"。
普查（`claim-unit-lint.mjs --quotation-census`，不联网）跑了 **31** 个十月 feed、**1,248** 条条目，
把三个疑点变成了三个不同的答案。

**1. 奇数引号行占全语料的 13.1%，而且它们不是杂散符号。** 当一行的直引号无法配对时，整行会被跳过，
这是为了避免检查器首轮出现 29 词、32 词的"幽灵引文"。但把 310 条被跳过的行读一遍就会看到它们
真正的样子：**硬换行的引文**——开引号在一行末尾，闭引号在下一行开头（"…showing "known outdoor
surveillance cameras and / license plate readers": Flock Safety ALPRs…"）。也就是说，每一条被换行
的引文都失去了两半，这道防线是以"让检查器失明"为代价换来的。现在用一个有界拼接（最多续接 2 行、
600 字符）把整块配对：**≥6 词的引文从 2,208 条升到 2,338 条（+130，+5.9%）**；**12** 个块始终无法
配平，作为覆盖率上报，绝不用来挖掘发现。拼接产生的引文会在发现的明细里标注，所以"换行引文"是
可见的，不会被悄悄归一化掉。

**2. 4 页上限并非缺陷，真正的产出是那行"证明它没事"的数据。** 在同样的 1,248 条里，只有 **1** 条
引用了超过 4 个页面，只丢掉 **1** 个候选——还是同一 CVE 旁边第二个厂商公告，从来不是条目的主源。
当时的诱惑是"把上限调高"；普查说明这个修复收益为零、成本是抓取次数。于是把上限留在 4，现在是一个
*实测*决定，并且每次运行都会打印自己的分母。

**3. 4–5 词的提示类精度是好的，被污染的是分母。** 10-30 的 feed 上有 6 条提示。逐条打开源页：
**凡是引用页面可读的，全都是真实缺陷**——pico 的维护者写的是 "AI can generate lightweight,
standalone, accessible HTML with just the CSS it needs"，从未写过 "AI made it unnecessary"；
novelty-bench 是*转述*自己的提示词（"the other simply asked which idea was novel"），而 feed 把这段
转述变成了引号里的提示串；Fowler 页面原文拼作 "skeptism"，所以 feed 的 "skepticism" 是在引号内做的
静默纠错。看起来像凭空编造的那三条，来自 **coindesk.com 返回 HTTP 429**——那个被引页面完全没有产出
正文。所以这一类的*精度*从来不是问题：真正的失败是"未读"，而一个看不见"未读"的严重度，只会惩罚
检查器自己的网络运气。现在 4–5 词的引文只有在**条目所引页面没有一条未读**时才升级为
**`quote-paraphrase`（sev 2）**；若有未读，则保持 `quote-short`（sev 1），并在明细里写明未读条数。
双向校准：10-31 的文件在改动前后都是 **0 发现 / 31 已验证**，而 10-30 的三条升级逐条打开源页确认后，
已在原地更正（第 **20、29、41** 条，en+zh+jp 三语）。

**普查触及不到的残留类：引用源本身就是 commit 列表。** 10-30 第 27 条引用
`"allocation-free listener callback for schedulable nodes (#148)"`——那是一条 **commit 标题**，真实存在，
但从检查器会抓的 README 或 release 页面里读不到。引号内出现 `(#NNN)` 就是"该引文的原文在历史里、
不在散文里"的提示。这是"未读不等于不存在"又降了一层：检查器读的是条目引用的页面，而 commit 不是页面。

**可迁移的规则。** 每个检查器都有沉默，而沉默和任何断言一样——所以它先要一份普查，再要一道防线。
这里的三个结果全都派上了用场，却只有一个算缺陷：一道代价是全语料 13% 的防线（修掉）、一个代价是
0.1% 的上限（留着，并把那一行打印出来）、以及一个*证据*错而非*阈值*错的严重度（按分母来定级，
而不是按词数）。

→ [[vuln-supply]] [[security]] [[frontier-models]]
