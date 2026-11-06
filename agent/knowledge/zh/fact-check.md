
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

**2026-10-31 20:41 结案——是普查而非轶事决定了它。** 悬而未决的问题是：这一类值不值得一个数据源，
还是只配一个抑制。`--commit-quote-census` 覆盖 **84 份 feed／3,160 个条目／8,549 个引号片段**，
先回答规模：**6 个片段、2 个条目——0.070%**（10-04 第 3 条的 System76 提交、10-30 第 27 条的五条）。
小，且集中。然后 `--net` 把设计问题跑了一遍：`commits.atom`——无需计量、**20 条**、仅默认分支——
**6/6 全部命中**，两个立案案例都在内（`pop-os/cosmic-epoch` 回溯到一个月前的
`2026-09-30T15:45:00Z`）。于是它成了**只作正向证据的数据源**，而这个不对称正是全部的防线：
在提交列表上找到标题是证明；**找不到**只是关于一个 20 条窗口的陈述，不是关于仓库的陈述。
因此未匹配的 `(#N)` 片段报 **`quote-unreadable-source`**（severity 0）而不是 sev 3 的伪造，
和这个检查对 429 或 JS 外壳早就做的是同一个判断。10-30 第 27 条从 `quote-not-found` 变成 `ok`；
10-31 文件仍是 **0 条非 ok／43 次检查**。`--selftest` **130 → 135**。
**这条追加的通用规则：** 一个覆盖率上限**已被测量**的数据源，可以赢得一个数据源类别，但不该赢得
一次反驳——在让它的沉默变成结论之前，先问「这个源够得着那件事吗」。而普查正是把「我见过一次」
变成足以支撑（或否定）一次建造的比率的东西。

→ [[vuln-supply]] [[security]] [[frontier-models]]

## 一张公开表格的「行数」也是一个单位（2026-11-01 04:40）

11-01 的 feed 写 NVIDIA 的 `nvidia/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB` 模型卡「**九行里有三行**」是量化版胜过自家 BF16。
那张卡有 **21** 行基准，Q4_K_M 赢了 **7** 行。被点名的三行是对的——它们是三项最大涨幅——但比率里的两个数字都是编的，
而且 lint 的 `count` 检查与一次仔细的通读都没抓到，因为**检查是去页面上找数字，而页面上既没有「9」也没有「3」**：
这个计数是 *markdown 表格的行数*，一个默认没有任何东西去解析的单位。

机械地数（列含义：`[1]` = 本模型 BF16，`[5]` = 本模型 Q4_K_M）：

| 结果 | 数量 | 行 |
|---|---|---|
| Q4 > BF16 | **7** | MultiChallenge 53.10→55.60（+2.50）、RoleBench 67.05→71.21（+4.16）、ToolSandbox 68.77→74.13（+5.36）、RelyToolBench 63.16→69.29（+6.13）、Brevity +0.32、IFBench +0.21、RAGTruth +0.29 |
| Q4 < BF16 | **14** | 跌幅最大的三项：Tau2 55.10→52.32、LongBench v2 50.50→48.67、RULER 86.99→85.76 |

这一课带来三点：

1. **比例完全相同（3/9 = 7/21 = 33%），所以这个错误没有改变任何结论。** 一个不改变结论的错误分母，与一个「买来了排位」
   的错误框架，是不同物种——更正公约里的速度规则针对的是*虚高*，而这里没有虚高。改句子、保留速度，并在日志里写明。
2. **卡片自己的结构就是那把尺。** 写「BF16 与 Q4_K_M 并排」是一个关于*比较对*的断言，任何这类断言都能用一
   遍表格重算出来。同时公布两个精度列的模型卡，是 feed 里最便宜的一次重算；要做，不要扫过去。
3. **七个胜出里有两个在噪声内**（+0.21、+0.29），两个是决定性的（+5.36、+6.13），所以「Q4 不是严格降级」为真，
   「Q4 大多会赢」为假。选那个分布支持得住的句子。

## 两个由原始来源自己印出、而报道通常会丢掉的分母（2026-11-01 04:40）

- **PAPERBENCHX（arXiv 2610.39744，逐字核对）：** 93 个专家构建任务、覆盖 12 个研究领域、10 种前沿 agent 配置，
  「the best configuration fully reproduces only **14%** tasks under the **90%** threshold」，
  「mean rubric scores range from **27.53%** to **59.08%**」。这两个数才是诚实的一对——只报 59% 的均值，
  就等于公布了一项并不存在的能力，因为部分评分「rarely translates into complete scientific reproduction」。
- **Jepsen / ParticleDB 1.1.4（2026-10-31）：** 96 个问题；「**All but three** of these issues occurred in
  healthy, single-node instances」（即 93 个单节点——feed 的这个拆分是正确推导出来的）；「Most issues required
  just a single server, single client, and no faults」；「By version 1.1.18.11.rc-22, all but ten of those issues
  appeared resolved」；完全没测复制（「The builds Orkes provided did not support replication」）；「formally proven」
  的营销背后没有 TLA+ 规范；一组非确定性失败「may be artifacts of a bug in the test suite」；认识论直接写在纸上——
  「we can prove the presence of bugs, but not their absence」。这份报告由 **Orkes 出资**，结论仍是建议用户
  「halt further deployment of ParticleDB and migrate to other databases as soon as possible」。

从 Jepsen 报告里可以搬走的那条排序是：单节点、默认配置、不注入故障，引擎仍然丢失已确认的写入。在这条线之上发布的
任何分布式系统数字，度量的都是基础引擎尚未赢得的东西——这是一条对任何「Full ACID」宣称都通用的检验。

→ [[security]] [[frontier-models]] [[disclosure-lag]]

## 「行数」这个单位变成了一项检查，而它的首次普查说明它很安静（2026-11-01 04:46）

04:40 那一趟只是把这个单位立了项；这一趟把它建了出来。`claim-unit-lint.mjs --check ratio`（已进入默认检查集）
会读取条目里每一个「N of M」——前提是那句话在讲「行」——再找到被引页面上的 Markdown 表格，把两个数字都从表里重算一遍。

**在立项案例上双向校准。** 对未修正的 feed 运行，它打出一条 sev-3：`#5 ratio-row-count — three of nine …
21 rows, "Nemotron-3.5 Bolt-E4B BF16" vs "Nemotron-3.5 Bolt-E4B-4GB Q4_K_M" → 7 / 14 / 0`；对修正后的 feed
运行，它打出 `ok-ratio — 7 of 21 reproduces`。`--selftest` 135 → **152**。

五条护栏，每一条都对应一种「否则这项检查就会判错」的方式：

1. **列按表头文字匹配，绝不按位置。** 位置匹配的读法在模型卡上会把「哪个模型」和「分数」拿去比。表头 token 按
   「条目提到了几个」打分，最佳一对必须整对压过其他所有列——第二名并列就是 `table-columns-unresolved`（sev 0），
   因为**认不出**的表不等于**不同意**的表。Bolt 卡真正的那一对是第 **1 列与第 5 列**（同一个模型的 BF16 与 Q4_K_M），
   所以「必须相邻」的规则反而会拒掉这项检查唯一存在的理由。
2. **英文数词也要读。** 这个错当初写成的是「three of nine」而不是「3 of 9」——只认数字的读法会彻底漏掉立项案例。
3. **`Q4_K_M` 要能在清理标记后存活。** 第一版单元格清洗器把下划线全删了（当作 Markdown 强调），表头变成 `Q4KM`，
   条目讲的那一列就跟自己的表头对不上了。只有**位于边界**的下划线才是强调。
4. **单元格里写了文字就是 `unparsed`，绝不算「输」**；平局作为第三种计数单独印出——「7 of 21」和「7 of 21 但有 2 个平局」
   是两个不同的断言。
5. **不判定方向。** 只要分子等于 `B>A` 或 `B<A` 任一方向的计数就算通过，因为两个表头谁在左是厂商的排版，
   而「赢」是条目的用词；两个数都印出来，让人自己看。

**在 10 月全部 31 期 feed 上做普查（先决定这次取页值不值得）：`ratio` 只在 5 个条目上触发，全部是
`table-columns-unresolved`（sev 0），零 findings、零 `ok-ratio`**——而且它新增了 **0** 次 `api.github.com` 调用，
因为它读的页面正是 `count` 已经取过的那批。所以这一类是「真实但稀少」：一个月里没有一个断言能靠表核对，
却抓住了一个已发布的错误。值得留着的理由和 `--status-watch` 一样：它抓的那种错，其他任何读法都看不见。

**同一趟里，`count` 那一半顺手删掉了自己的一个假 finding。** 修正后的 feed 上 `count` 曾报
`number-other-noun — 21 is on huggingface.co/models as "21 days ago"`，原因是这张卡在正文里根本没写出总数：
**总数就是那张表**。现在，被引页面的某张表只要表头点到了断言的名词、且数据行数等于那个数字，就算正面核实
（`ok-table-rows`），并且排在「换个说法」那条判决之前——落地页不该压过条目真正在讲的产物。

**一个批次里三条假的 `repo` finding，以及把它们分开的那条规则。** `anthropic/claude-opus-4.6`（OpenRouter 的模型 id，
404 →「读不到的仓库」）、`moonshotai/kimi-k2`（**同一句话**里的名字，确有其仓但条目从没讨论过它，11,112★ →
对着没人问的问题回答了「已停更」）、以及 `plugins/sql`（OpenSearch SQL 的**端点**）。三条都是「反引号里的 `a/b`
出现在讲技术字符串的句子里」。护栏是：`github.com` 的链接是证据，标题里的 slug 是主角，除此之外，如果这句里唯一
像 `a/b` 的东西紧挨着 `model` / `endpoint` / `parameter` / `fallback` / `temperature`，那它就不是在讲仓库——
记为 `not-a-repo`（sev 0）而不是悄悄丢掉；并且**按 slug 判定而不是按出现次数**，因为第 8 条把 `plugins/sql`
写了两次，按次数判会让第二次漏过去、白白花掉一次 `api.github.com` 调用。

**两个「小分母」护栏，都是被一次实跑买来的。** 对 6 这个基数用相对容差，会让「到账两颗星」变成 25% 的 finding
（`3 commits, 6 stars` 在同一个批次里变成 8），所以现在同时要求绝对差（`--star-min-delta`，默认 5）。
另外，缓存是一个**被提交进仓库**的文件：一次整月普查把它从 9.9 MB 撑到 19 MB，所以写入时会把带正文的条目按
字节预算（5 MB）裁掉——丢一个页面只值一次不计费的重新抓取，而那次膨胀里有 5 MB 就来自三个页面。

→ [[disclosure-lag]] [[vuln-supply]]

## 请求的身份是来源的一部分，而范围本身就是一种单位 (2026-11-01 12:33)

**一个 404 可以是关于客户端的陈述。** 第 31 条引用 `https://karpathy.bearblog.dev/hacker-tube/`——正是 HN
条目 **50319510**（920 分，作者 `karpathy` 于 2026-10-31T19:56:53Z 提交）指向的 URL。裸 `curl` 拿到的是
**HTTP 404、9 字节「Not found」**；同一个 URL 对浏览器 UA 返回 **200 / 14,966 字节**（2,232 字符正文）。
对六个 user agent 实测，区分它们的不是「浏览器 vs 非浏览器」：`undici`、`python-requests/2.31.0`、
`Wget/1.21` 和一个裸 `Mozilla/5.0` 全部 **200**，而 `curl/8.7.1` **以及完全不带 `User-Agent` 头的请求**
都是 **404**。所以这台主机拒绝的是 `curl` 与匿名，不是库——于是有两条后果。**(a)**「链接坏了」与「服务器不喜欢
这个客户端」是同样九个字节，所以一个 shell 出去调 `curl` 的链接检查器会凭空制造死链。**(b)** 这次普查只花了一条
命令：第 21–35 条引用的 **36** 个非 HN URL 里，**1** 个对 curl 与浏览器给出不同答案——正是这个页面——所以这个类
大约 2.8%，不算稀有到可以忽略，但 n=36、只覆盖一个批次。
工具备注：`link-check.mjs` 和 `doc-twin.mjs` 本来就带浏览器 UA；`claim-unit-lint.mjs` 的页面读取器没有，现在
显式带上（`PAGE_CACHE_V` **2 → 3**，因为页文本现在取决于谁在问）。UA 墙是 `auth-gated`、`JS gate`、`JS shell`
之外的**第四种不可读状态**，诚实的判决仍然是 `unread`——永远不是 `absent`。

**第二十七种单位是范围（SCOPE）——一个数字被测于其上的总体。** 论文 28 已经数过字段、重算、停点、匹配、
组成、表格行数与定义这些单位。这一批给出了最朴素的一种，而且给了五次：**10 道题** × 5 轮（memdoor 的 9.8 对
9.6）；**30 条留出 dweet**（困惑度）；**一个绑定的核**（Pivot 的 50.1% `backend_bound_memory`）；**一个分支**
（`3.0.0`–`3.0.0-M2`，不是「MINA」）；以及**被选择之前的多个回答**（水印的多样性）。每一个例子里数字都是对的，
是总体决定了它们的含义——这也是为什么下面那条更正是范围错误而不是算术错误。

**文章中途的发现不是文章的发现。** 12:23 那批的第 30 条把「输出丢了味道」当作那篇 demoscene 文章的判决发布。
原文说的是程序「more consistent」但仍「still lacked a certain『charm』」——而*下一段*以「Fortunately, Dwitter
has an『awesomeness』score…」开头，随后报告了两个修好它的阶段（课程表「turned out to be a breakthrough」，以及
以作者本人为奖励函数的 RLHF）。破绽是机械的、值得去 grep：一句引出问题的话后面，通常跟着 `Fortunately`、
`Then` 或 `This turned out to be`。已在 en/zh/jp 以及三个 `latest.md` 镜像里就地更正，按断言更正规则处理
（该条速度本已在最低档，所以没有任何位移）。与 Cerebras 和 Genie 的引文教训同族：**把文档读到结尾，再决定是否
把它的中段当作结论**，并把任何多阶段文章当作一个序列——后面的阶段可以反转前面的判决。

→ [[frontier-models]] [[security]] [[disclosure-lag]]

## 一个数字不可能持有的两个单位，以及属于客户端字符串的墙（2026-11-01 12:39）

**少算是激增，多算才是漂移。**生成期的 lint 在批次写出后几分钟运行，所以它能看到的唯一移动就是仓库在条目*底下*变化——在那个时间尺度上，星数只朝一个方向走。12:23 批次产生了 **两条 sev-2 `star-drift`**，落在两个**正确的条目**上：`kerlenton/bootgpt` 引作 **6★**、一小时后读到 **25★**（记录建于 2026-10-30T21:28:17Z，**1.3 天**），`vercel-labs/agent-desktop` 引作 **3,979★**、读到 **4,547★**（+14%），而它的记录已经 **254 天**、三天内从 **1.0.0 发到 1.0.2**。立项时提议的是「按仓库年龄缩放容差」，但年龄是错的轴：**没有任何百分比能分开「发布」和「写错」**，因为 HN 首页把六个月大的仓库翻倍和把六小时大的仓库翻倍一样容易。能分开的是**符号**——`引用 < 当前` 是上涨中仓库该有的样子，`引用 > 当前` 是仓库并不持有的数字（在批次尺度上，星数不会下落，除非删号、清 spam 或写错）。`starVerdict()` 现在对前者返回 `star-surge`（sev 1，提示；记录 ≤30 天时点名发布窗口），对后者返回 `star-drift`（sev 2）。在今天的文件上校准（**2 条发现 → 0，55 条已核实**），并用一份**整整一天前**的 feed 泛化：10-31 只剩一行星数，`milind-soni/OpenMausBot` **8,400 → 9,795（+14%）**——那正是「昨天的条目」应有的样子，过去却被当成发现。`--selftest` **156 → 164**。

**墙属于 (URL, 客户端字符串) 对，而这份语料里两个方向都存在。**同一次运行在相隔数小时内测到两台方向相反的主机：

| 主机 | 浏览器 UA | 具名 `curl/8.7.1` UA |
|---|---|---|
| `drupal.org/sa-contrib-2026-254` | **200 / 226 字符**（3,038 字节的「Client Challenge」） | **200 / 4,354 字符**（公告全文，两条引文逐字存在） |
| `karpathy.bearblog.dev/hacker-tube/` | **200 / 14,966 字节** | **404 / 9 字节「Not found」** |

所以「这个检查器发浏览器 UA」和「这个检查器发 curl」都是关于来源的错误陈述，唯一可用的规则是：**在一个字符串上是墙，不等于在另一个字符串上也是墙**。两个正文读取器现在各带两个字符串，只在遇到墙之后重试（`claim-unit-lint.mjs` 的 `CLIENT_STRINGS`、`doc-twin.mjs` 的 `--ua-census`），并且**墙只缓存 10 分钟而不是 6 小时**：门控是按请求的，六小时缓存会把一次不走运的抓取变成半天的「不可读」——那是「未读不等于不存在」从缓存漏了进来。`link-check.mjs` 有意保持状态码判定：墙仍然是活链接，因此「活」与「可读」是两个问题。

**这一类，被测量过了。**`doc-twin.mjs --ua-census --days 31` 把每个可计入的被引 URL 抓两次（浏览器 UA、具名 curl UA）并给这一对分类。**31** 期 feed（2026-10-02 → 2026-11-01）的全部 **1,300** 个可计入 URL，返回 **1,299** 行：

| 判定 | n | 含义 |
|---|---|---|
| `same` | 1,131 | 两个客户端都读到，文本相近 |
| `both-walled` | 63 | 任何客户端字符串都读不到——`thehackernews.com`、`npmjs.com`、`reuters.com`（401）、`wsj.com`、`ft.com`、`arstechnica.com` |
| `browser-walled` | 27 | **被拒的是浏览器 UA**——`bleepingcomputer.com` **6/6**（403/16 字节 → 200/7–8 KB）、`commandline.microsoft.com`（403 → **201,056 字符**）、`adobe.com` 2/2（403 → 11,452／4,014）、`news.microsoft.com`、`intel.com`、`tangled.org`、`facebook.com`、`politico.com`，以及一条 `drupal.org` 公告 |
| `named-walled` | 8 | 浏览器读得到、具名客户端被拒——`sec.gov`（200/**1.57 MB** → 403/2,992）、`courtlistener.com`、`fortune.com`、`nyc.gov`、`dell.com`、`api.stackexchange.com`（200 → **400**） |
| `differs` | 15 | 两边都给，但文本不同——`lists.debian.org`（**16 字符** 对 3.6–5.3 KB）、`openwrt.org`（**912** 对 16,901）、`git.kernel.org`（1,337 对 4,311）、`reddit.com`（267 对 6）、`codeberg.org`、`developer.chrome.com`，以及五个 Discourse 论坛 |
| `rate-limited` | 28 | **是普查自己的足迹，不是页面的属性**——其中 26 条是本趟运行自身请求速率造成的 `huggingface.co` 429 |
| `gone` / `unreachable` / `client-error` | 10 / 13 / 4 | 不是客户端字符串断言：404、连不上、或 5xx |

**3.85%**（1,299 行中的 50 行）是一个客户端读得到、另一个被拒；`differs` 是值得单列的第五种形状：一篇 Debian 邮件列表帖对浏览器 UA 是 **16 个字符**、对 curl 是 **3.6 KB**，所以「页面上说」取决于用了哪个读取器。最要紧的主机仍是 `bleepingcomputer.com`——本 feed 引用最多的安全来源之一，对 `claim-unit-lint` **最先**发送的浏览器 UA **6/6 全拒**，也正是 CLAUDE.md 记作「403 中间页与 200 正式 HTML 相隔几分钟」的那台主机：现在有了比时间更便宜且可复现的解释。

**而 drupal.org 的结果把规则又推进了一步：墙甚至不是按 (URL, 客户端) 稳定的。**立案页面 `sa-contrib-2026-254` 在 12:40 是 **browser-walled**（浏览器 UA 连续三次拿到 226 字符，`curl` 拿到 4,354），二十分钟后同一趟普查里却是 **`same`**（两边都是 4,354）；而同一主机上的**另一条**公告 `sa-contrib-2026-175` 在同一趟里是 browser-walled。所以这里有三个轴——客户端字符串、请求（冷会话与热会话）、以及速率——没有任何静态规则能覆盖全部。留下来的规则是操作层面的：**用第二个客户端字符串重试、把墙短暂缓存、绝不让「不可读」变成「不存在」。**


## 记录有两栏而我引了一栏——集合性断言要读每一个成员（2026-11-01 20:38）

**我自己的已发布错误，已在 en/zh/jp 三语正文与三份镜像中就地更正。**2026-11-01 feed 第 40 条说七条
FFmpeg 记录「六条都带 **5.5**」。对着 NVD 实测：五条「使用未初始化」记录在 `Primary` 里带的是
**CVSS 3.1** 的 `5.5`，同时又在 `Secondary` 里带 **4.0** 的 **6.8**，两者作者都是
`disclosure@vulncheck.com`；第六条 `CVE-2026-120210`（IMF 解复用器路径穿越）是 **4.3** 与 **5.3**。
所以那句话错了两处——它把两栏合成了一栏，又把五个成员推广到了六个。

值得记录而不只是修掉的原因：这份 feed 已经用好几批时间在学同一个单位（「一个向量、三个诚实的数字」、
「`Primary`/`Secondary` 是槽位，不是来源」），而错误仍然穿了过去，因为数字**看起来**是齐的。可推广的
规则关于**量词**而不是版本：**「全部 N 条都是 X」是关于集合的断言**，检查方法是把每个成员都读一遍；
而当 CNA 同时写 v3.1 与 v4.0 时，看到一个数字并不构成其他数字与它相同的证据。

## 那次评估无法说出是哪个模型在服务它（2026-11-01 20:38）

`beenuar/AiSOC` v21.0.0（2026-10-31，MIT）用一个对自己的审计挣到了大版本号：「Every published
verdict-eval row had `resolved_models: []` — **72 calls** placed, answered, and unattributable,
because the only serving-identity reader was the LiteLLM gateway header and the measured runs talked
to an OpenAI-compatible endpoint directly.」

修法是一套**分类法，而不是回填**——`verified`（网关头）/ `self_reported`（响应体自带的 `model`，
「credited only with evidence it came from the body」，因为 langchain 在响应体没有名字时会回退到请求名）
/ `unattributed` / `serving_mismatch` / `no_calls`；记分卡带上 `provenance_status`；「the benchmark
table gained an Attribution column with the five historical rows reading **'unverified'** rather
than receiving invented attribution」。而与一次没人背书过的调用绑定的「清账」测量，现在会**阻断**而不是
放行。同一次发布连代价都写了出来而不是只写收益：标识缺失时相关性分组会收窄，于是「reduction moving
**42.6% → 24.5%** because unrelated alerts stop counting as grouped」（在一个固定的、检测形态的队列上
实测：之前 36 个跨规则事件组，之后为零）。

几乎没有 agent 评测会打包一个「服务身份来源」字段，所以这才是可复用的部分——benchmark 发布的数字是关于
**一次调用**的数字，而那次调用有身份，这个身份或者从请求头读出、或者从响应体推断、或者不存在。拿这个
去对照，反例就在同一个仓库里：`docs/audit/REPOSITORY_REALITY.md` 的日期是 **2026-09-23，「against
v8.1.0」**，而 changelog 最新一条是 **21.0.0**——一份按 WORKING / PARTIAL / BROKEN / DEMO-ONLY 分档的
清点表（实测计数 **22 / 4 / 1 / 4**），按代码的时钟腐坏，而这正是它被写出来要抓的那种失败。
**「现状文档」是带版本戳的快照，要读的正是那个戳。**

## 掩盖重叠的中位数，与不可能下降的排名（2026-11-01 20:38）

Nolan Lawson 的十二框架 agent 构建（Opus 5.5 高档，每个框架五次，公开成本 / 墙钟 / token /
Lighthouse / JS 体积）之所以可引用，正是因为它在中位数旁边印了区间：**Hono+htmx $2.67**
（2.23–3.19）、**Astro $2.76**（2.16–3.63）、**Nuxt $2.82**（2.39–4.25）、**Angular $4.97**
（3.19–6.82）并带 **9.76M** token（4.92–14.94）与 **17.2 分钟**（9.8–23.7）；实际发出 JS：Astro
**0 KiB**、vanilla 7、Hono+htmx 18、SvelteKit 36、Nuxt 84、Angular 93、React Router 115、
TanStack Start 118、Next.js 142。以上数字均为第一手 grep 自页面，包括那些限定它们自己的句子——
「this is not a perfect experiment」「this entire benchmark could be cheated by just pre-generating
all the HTML files as static assets」「The benchmark itself is largely vibe-coded」，以及他明确标为
**猜测**而非结论的那句（「I have a strong suspicion … that the current crop of MCPs and skills may be
doing more harm than good」）。作者自己的那句话定了读法：React Router 最便宜的一次（**$2.82**）
「still cheaper than the most expensive version of Hono+htmx（**$3.19**）」——也就是说中位数排序不是
单次运行的排序，而只引用 $2.67 与 $4.97 的摘要，把让这张表诚实的重叠区间丢掉了。

`shiyu-coder/Kronos` 是同一条教训在流水线另一端的样子：**44,930★、今日 +611**、MIT，而默认分支上最新的
提交是 **2026-04-13T12:38:49Z**（读自 `commits.atom`，六个半月前）。star 与 fork 是**只增不减的累计计数**，
所以一个 trending 排名可能已经一岁——仓库可以靠一次发布持续上榜，而 2026-10-29 的两份缺陷报告仍无人回应：
**#423**（「decode_s2: rotary positions collapse to 0 in the single-query cross-attention
(train/inference mismatch)」）与 **#422**（预测被拉向输入窗口均值；在已知 +2.1% 漂移的合成随机游走上
30 条序列的平均 20 根预测为 −10.4%），都出自同一名报告者，总共一条评论，而且是他自己的。
**这是 tracker 里的指控，不是已发表的发现**——对金融基础模型来说，提交日期与未处理缺陷列表正是
model card 不带的两个字段。

**还有一处，是这一轮写完之后由生成期 lint 找出来的——一段里三处错，全部来自没去打开一份 1.4 KB 的 README。**同一份 feed 的第 35 条把 `epoyraz/nes-contra-us` 称作「一份带注释的反汇编」；而 README 第一行是「A port of the NES game _Contra_ (US) from 6502 assembly to C, and from C to WebAssembly」，并且是「built on **vermiceli**'s annotated disassembly (itself started from Trax's work)」——也就是说该条把作者身份往上游客移了一层。它接着引用「and the build script(s) to reassemble the assembly into a byte-for-byte match of the game」，这句话在**四份可读来源里一处都没有**；README 原文是「`./build.sh` still reassembles the original ROM byte-for-byte with cc65」。而它作为保留条件断言「the README documents the disassembly and the reassembly, not the browser port」——可 README 里有 **Play in the browser** 小节、WebRTC 双人模式，以及验证移植的装置（`port/tools/parity_telemetry.c`：把 Mesen 2 的录制回放进 C 核心，逐帧比较 RAM/nametable/调色板/OAM/CHR/PPU/声音/像素，「Stages 1–4 are identical over the whole 40k-frame recording」）。可复用的规则：**一个「移植」或「fork」仓库有两个身份，没读第一行就会认错人**——而那句听起来最像尽职的保留条件（「README 讲的是 X，不是 Y」）是关于整页的断言，它需要的是检索，不是印象。

→ [[fact-check]] [[security]] [[dev-tools]]

## 发布日期是记录自己时钟里的一个日历日（2026-11-02 04:31）

11-02 的 feed 第 18 条把 `CVE-2026-120209` 写成「发布于 **2026-11-01**」。cveawg 的 `datePublished` 是
`2026-10-31T17:25:56.161Z`，NVD 的 `published` 是 `2026-10-31T18:17:09.263`——引用的那一天是同一瞬间的
**UTC+8 日期**，即宿主机的日历，不是记录的。这正是 `updated:` 那个陷阱（CLAUDE.md，2026-10-23）往外挪了一层：
没有时区的日期是一条断言，而这里它悄悄是本地时间。已在 en/zh/jp 与三份 `latest.md` 镜像就地更正，并做成检查而不是
规则：`claim-unit-lint.mjs --check date` 读取每一个发布**线索**（「published」/「disclosed」——绝不含「fixed」
「released」「reserved」，因为 NVD 根本不带 `dateReserved`，保留日期是*不可验证*而非错误），按 `cvss` 检查绑定
主体的方式绑定（自身句中的 id → 条目的单一 CVE → 所引记录日期一致），并与**在缺少 `Z` 时按 UTC 解析**的
`published` 比较。结论 `date-local-shift`（sev 2）与 `date-mismatch`（sev 2）；记录读不到时是沉默。收文当日双向
校准：未更正文件 **1 发现 / 24 通过**，更正后 **0 / 24**；`--selftest` **164 → 171**。两个仪器注记：subjects 映射
本就必须开始携带 `published`（原先只复制 status/metrics/cwe，所以首次实跑是结构性沉默、而非干净的沉默）；让多
CVE 的 Source 行可被检查的守卫是所引记录**日期一致**——没有它，一个日期会被拿去评分「恰好是主主体」的那条 id。

**同批次还有三个单位，都在这批自己的散文里。**

- **条件性的严重度在下游丢掉条件。** Prefab 的 `CVE-2026-120338` 带**两个带场景标签的 CVSS v3.1 度量**（未认证
  10.0 / 已认证 9.9），NVD 副本只保留 10.0。所以「记录说 10.0」为真但不完整：那数字对应未认证形态，它前面的部署
  才是变量。引用分数时要带上场景。
- **被归属的判断不是来源自己的判断。** 新华社报道 Apple/Qwen 时给出了真正重要的事实（**11 月 4 日**开发者测试版、
  12 月 **iOS 27.3**、可选开启、不用于训练、设备**与**账户地区都须为中国），随后把解释归给具名的人：
  「**Wang Xiaojie, an AI expert at Beijing University of Posts and Telecommunications**, said this is
  the first time a top global consumer hardware maker has used a Chinese large model as the primary
  system-level AI backbone.」而 feed 的「why it matters」把它写成了自己的结论。保留归属——它之所以站得住，正
  因为它是某个人的判断。
- **四天大的仓库说出惊人的话，通常是「组合」，而致谢页是查证处。** `valentderah/totk-pc-recomp`
  （**3,102★**，2026-10-29T12:32Z 建）声称把《王国之泪》静态重编译为原生 x86-64 + Vulkan，而 10-11→10-17 那波
  给出的价格是 **600–700B token / 数月**。它自己的 `docs/architecture.md` 用一张表解释：**LAS Recomp** 提供
  ARM64→C 提升器，**MacNativeGames** 提供 TotK 专用宿主（已在 Apple silicon 上跑 1.0.0–1.4.3），移植只「写两者
  都没有的部分」——可扩展的提升器与 NVN 前端的 Vulkan 后端。主张为真，时间线由既有成果解释，而这正是读到「四天」
  的人需要的区分。（feed 该条未写这一点；可复现的部分是 README 的「**No game files are included**」与
  「the result contains the game. It is for your own use. Do not share it.」）
- **跨天重现是学习者必须自己拥有的去重状态。** 11-02 feed 第 7 条是 TextSeal2（**2610.40613**），已在 11-01
  12:23 学过且数字已归档；feed 的去重范围是当天文件，所以一个故事可以在下一个日历日回来并读起来像新的。笔记里跳过
  它，并把它记为重现而非进展。

→ [[fact-check]] [[security]] [[dev-tools]] [[disclosure-lag]] [[ai-impact]]

## 区间本身也是一个单位——记录可以写出一个什么都不包含的区间（2026-11-02 04:43）

立案自 11-01 feed 的 Apache MINA 条目，它写着：「受影响的是 `3.0.0` 到 **`3.0.0-M2`**」。这句话每个字都
来自记录本身——cveawg 返回 `{version: "3.0.0", lessThanOrEqual: "3.0.0-M2", versionType: "maven"}`——
而这个区间是**空的**：按 semver 式排序，预发布版排在它的正式版*之前*，所以 `3.0.0-M2 < 3.0.0`，闭区间
`[3.0.0, 3.0.0-M2]` 里没有任何版本。被告诉「affected: 3.0.0 up to 3.0.0-M2」的扫描器拿到的是空集；读到这句
话的人则以为发过一个里程碑补丁。两者都不是记录想说的（「3.0.0 那条线，在它存在的期间」），而只有算术能把它
显示出来。

这与本文件里的其他单位是同一族——数字的**指称**不是句子暗示的东西——但有一个值得命名的反转：**对引文的
事实核查会通过。**这个智能体下游的每一项检查都会确认该条目：字符串在记录里、分数对、CWE 对、发布日期落在正确
的那一天。错误（如果有）住在两个被引用字段**之间**的算术里，任何 grep 都看不见。

### 背后的测量

`disclosure-lag.mjs --remedy-census` 跑 NVD 2026-10-25 → 10-31 发布窗口（3,461 条记录，剔除 `Rejected`），
发现 **87 条记录（2.5%）**声明的区间什么都不包含：**86** 条把点写成区间（`{version: X, lessThan: X}`，其中
**73 条来自 `chrome-cve-admin@google.com`**——那是行文习惯，所以引用赋值方，永远不要引用比例），另有 **1** 条
边界写反（MINA）。细节 → [[disclosure-lag]]。

### 变成了检查，以及先让它错了的两件事

`claim-unit-lint.mjs --check range`（在默认集合里；`--selftest` **171 → 184**，本检查独占 +13，当天日期工作结束时为 **194**）。它读的是 `cvss`/`cwe` 检查
已经付过费的两个制品——CNA 容器（`affected[]`，规范化为 `{min, minInc, max, maxInc, product, versionType,
changes[]}`，缓存版本 `CNA_CACHE_V: 3 → 4`）与作为后备的 NVD `configurations[]`；从条目散文里抽出每一个两端
版本区间，按其他检查的方式绑定到 CVE 再比较。结论：`span-empty`（sev 2——记录自己的区间是空的，而条目引用了
它）、`span-inverted`（sev 3——条目自己的两端从高到低，记录并非如此）、`span-unverifiable`（sev 0——git 区间，
或条目给的版本区间对上一个只有版本号修订的记录）、`ok-span`。

头两个小时里它有两个缺陷，各由一个 selftest 或一次实跑发现：

- **句末的句号不是版本的一部分。** 词元的字符类包含 `.`，好让 `1.2.3-build.4` 活下来，于是句末的
  `3.0.0-M2.` 不等于记录里的 `3.0.0-M2`——记录匹配崩塌，区间掉进**条目自述**那一支，一次忠实的引用被报成
  作者的倒序。MINA 立案案例正是这个形状，所以检查的第一版把自己的立案案例判错了。用 `cleanVer()`（去掉尾部
  `.,;:`）修复，并由 selftest 钉住。
- **记录的「空」与条目的算术是两种发现**，需要两个名字，因为补救不同：一个是补一句话，另一个是改一个数。
  它们有 20 分钟是一个结论。

三条护栏，每一条都是设计本来会产生的误报：

- **`0` 与 `*` 是空边界，不是版本**——CVE 5.x 的空下界意为「无界」，AJ-Report 形状（`version: "0"`、`≤ 1.7.1`）
  是开放式的，绝不空。
- **`through` 是这个语料里的区间语态；`to` 也是测量的写法。** `through`／破折号区间只要一端命中记录边界即可
  锚定；`to` 区间需要**两端**都是记录自己的边界。没有这条，「detection went from 41.39% to 56.97」与
  「0.96 to 0.86」都会被读成版本区间。
- **在含端点的语义下，两端相等不等于空。** `1.2.3 through 1.2.3` 是一个版本；只有 `lessThan`（不含端点）
  的上界才让这对边界成为空集。判定依据是记录的字段，不是散文的连接词。

→ [[fact-check]] [[disclosure-lag]] [[vuln-supply]]

## 日期普查：十一条发现里有十条是检查器自己的（2026-11-02 04:43）

悬着的问题是本地日期类有多大——语料里有多少发布日是宿主机的 UTC+8 日而不是记录自己的日。对 **33 份 feed**
（2026-10-01 → 11-02，**351** 个不同 CVE，每 25 个一次 NVD `cveId` 列表拉取）重跑 `--check date` 回答了它，
然后又回答了一个我并没问的问题。

**第一遍返回 55 个判定：44 个 `ok`、10 个 `date-mismatch`、1 个 `date-local-shift`。**我把十一条全部打开，
**其中十条是检查器的**，每一条都是「发布」线索词指向了别的制品：

| feed 里的线索 | 它其实在说什么 |
|---|---|
| `Source: Unit 42 · published 2026-10-14` | 新闻机构的文章 |
| `fixed in v0.1.7, published 2026-05-06` · `7.1.2-33 was published on 2026-10-10` · `fixed in v3.0.3, published 2026-10-26T21:38Z` | **发布**日期 |
| `worker 0.1.756 and gateway 0.1.776 — both published 2026-09-15T04:03Z` | 一对修复发布 |
| `published by Patchstack on 2026-10-13` · `Source: Patchstack · published 2026-10-13` | 厂商自己的发布 |
| `Behrouz … published the Sleep framework on 2026-10-27` | 作者的文章 |
| `Source: CVE Program (cveawg) / Postiz advisories · published …` | 一条被制品规则当成「advisories」的登记簿行 |

两条是**正则**：日期后面的 `\b` 在 ISO 瞬间上失效，因为 `1` 和 `T` 都是词字符——于是
`published 2026-10-31T09:29Z · reserved 2026-10-28` 跳过了那个瞬间、去算了**预留**日，而
`CVE published 2026-10-30T14:36Z · advisory dated 2026-06-24` 算了公告的日。还有一条是**两个时钟**：
`CVE-2026-117656` 在 cveawg 是 `2026-10-30T23:55:23Z`、在 NVD 是 `2026-10-31T00:16:51Z`——相差 21 分钟、
跨了日历日——于是一句正确的「published 2026-10-30」被拿另一个登记簿的日判错。

**修法**（`--selftest` **194/194**，当天 +23）：五个线索抑制器（线索后跟 `the`/`a`/`by`；一个**紧贴**线索的
版本号，中间只能有标点、破折号、`both`、`was`/`is`，且必须先剥掉 markdown 强调——否则 `**v0.1.7**,` 读起来完全
不像版本；前置从句里出现制品名词；以及 `Source:` 行**只**按是否点名登记簿判定，因为来源**名字**本身就由制品规则
要找的那些词组成）；用数字前瞻替代 `\b`；以及接受任一登记簿之日、并**说明命中哪一个时钟**的双时钟比较。

**对原本那个问题的回答：**修好之后，同样 33 份 feed 返回 **73 个判定，72 个命中记录的日、1 个
`date-local-shift`**——10-25 那条 Postiz，其 `Source:` 行点了 cveawg，却把 `published 2026-10-24` 写在一条
发布于 `2026-10-23T23:17:43Z`（离午夜 70 分钟）的记录上。所以这一类**真实但罕见——73 条可核查断言里 1 条
（1.4%）**，而每一条在读者眼里都把故事推后一天，足以把「修复早于记录」翻成「晚于记录」。

可迁移的形状：**线索词不是主语。**「published」附着于最近的名词，而在一个把文章、发布与公告和记录并排引用的
feed 里，最近的名词通常不是记录。是普查让这个比例现形——18% 的误报在「1 条发现 / 24 项通过」的单次标定里
是看不见的，因为那天的条目恰好没有发布行。

→ [[fact-check]] [[disclosure-lag]]

## 页面上的第二个数字是「止点」，不是「分歧」（2026-11-02 12:27）

11-02 批次的第 28 条说了一件听起来像丑闻、其实不是的事：`cna@vuldb.com` 分配的 **41** 条记录中，
NVD 转发的那份 **4.0** 分数在 **38 条里低于记录自己的值**（低 0.7–3.2，从不更高），而「没有任何字段说明
这两个数字各自停在哪个止点」。**字段**确实没说——但**算术说了**，一次神谕调用就把整类问题定了性。

一手测量 NVD 发布窗口 `2026-10-31T23:00Z → 2026-11-02T02:00Z`（一次列表调用，**41** 条，**41/41 `Received`**），
把每条 NVD 记录与它的 cveawg 容器对起来：

| 事实 | 结果 |
|---|---|
| 容器带 **CVSS 3.0** 的 | **41 / 41** |
| NVD 副本带 **CVSS 3.0** 的 | **0 / 41**（该框架在副本里被丢掉） |
| **3.1** 一致 | **41 / 41 完全相同** |
| **4.0** 一致 | **3 / 41 相同**、**38 / 41 不同且 NVD 恒低** |
| 向量里的 `E`（Exploit Maturity） | **`P` × 38**、**`X` × 3** |

再以 `cvss4` 作神谕（`node cvss-recompute.mjs --oracle <path>`，10-27 用过的同一条路）：

- 把 `E` 从向量里剥掉 → CNA 存下的 `baseScore` **41/41** 复现；
- 保留向量里的 `E:P` → **NVD** 存下的 `baseScore` **41/41** 复现；
- 那三条「一致」的，恰好就是 `E` 为 `X`（未定义）、两种算法重合的三条。

所以两个数字对**各自的止点**都算术精确：**CVSS-B（基础）对 CVSS-BT（威胁）**。`CVE-2026-120189` 在容器的
四套框架里都是 **10.0**，在 NVD 上 4.0 是 **9.3**——同样的基础度量加 `E:P`，9.3 是带上威胁项的结果，
10.0 是剥掉它的结果。

**由此得到的规则：**当 v4.0 的两个副本不一致时，**先看 `E`，再写「它们不一致」**。方向由度量固定：
`E:P`/`E:U` 把分数往下拉（此处 −0.7 到 −3.2），`E:A` 与 `E:X` 让它停在基础值。这是 FortiSandbox 形状
（10-27：`baseScore: 9.6` 配一条时序向量，而 NVD 剥掉时序后转发 9.8）在更高一层框架上的重演——**字段名
`baseScore` 是各发布方选的一个标签，不是「算的是什么」的定义**。可复用的版本是：第二个数字若能从一个
**不同的止点**在同一向量上复现，它就不是任何一方出错的证据，所以检查应该是重算，而不是把两个引用来的
分数摆在一起比。

条目更锋利的那一点仍然成立、且在上游：**容器比副本更丰富**——四套框架进、三套出，3.0 那一栏在 NVD 里
根本没有落点——所以「这条记录的分数」是在说「你读的是哪个容器」，读 NVD 的扫描器看到的集合严格小于
读 CVE 的人。那是 [[disclosure-lag]] 的地盘，不是评分争议。

→ [[fact-check]] [[vuln-supply]] [[disclosure-lag]]

## 内容寻址的 URL 是一份快照，而这一份当天就过期了（2026-11-02 12:27）

第 19 条（`hackerbooks.org`）为它的语料数字引用了 `https://hackerbooks.org/data/meta.47fd7cb7.json`。
我去查时：**HTTP 404、0 字节**。该站对数据文件做**内容哈希**，所以现在的名字是 `data/meta.2e673908.json`——
而数字也动了：

| 字段 | 条目所引 | 现存文件（`generated: 2026-11-02` 相同） |
|---|---|---|
| books | 15,362 | **15,767** |
| mentions | 270,334 | **281,374** |
| comments | 217,954 | **225,861** |
| commenters | 56,456 | **57,773** |

两个教训，都很便宜，且作为**类别**对本库是新的：

1. **带指纹的资产 URL 只有一次重新生成的寿命。** 这是 CLAUDE.md 里「引用易腐」问题的最强形式，因为页面
   并没有错——它是**没了**，而路径里的校验和保证链接在发布方重建的那一刻就死。引用**稳定名**
   （`/data/meta.json`）或人类页面，若快照本身重要就把哈希写进正文。
2. **语料计数是计数器，不是测量。** 这些字段在一天之内就长了（books +2.6%、mentions +4.1%），因为爬虫
   还在跑。任何「N 本书 / N 条提及」的句子都必须带上读取时间：耐久的内容是**形状**（1.5 万本书、约 27 万
   条提及、2007–2026）加上那份公开发布的校验。

**而那份校验正是要带走的东西：**每条提及都被标成 *recommend / neutral / critical / not about the book*，
并在 400 条提及上与**第二个模型**比对，一致率 **85%**。那是**模型间一致**，不是准确率——artifact 里没有
人类金标——所以 85% 是每个下游说法的**上限**，不是质量分。「被 N 个人推荐」这样的条目会继承它：排序把
独立评论者权重放在原始提及之上，而每条提及下面的标签，对**同族的另一个标注器**而言是五次里对四次。
把一致率公开并称之为一致率，是诚实的版本；这样的做法比它应该有的更少见。

→ [[fact-check]] [[ai-impact]]

## 只比对一个数字的分数检查，必须先知道那是哪一个数字（2026-11-02 12:34）

`cvss` 单位会根据向量自身的 `vectorString` 重算被引用的分数，对「记录里的数字在它自己的向量下是否成立？」这个问题，
这是对的仪器——一个发布周里 4,461 个 NVD 度量 4,461 个都复现。但对带威胁指标的向量，它是错的仪器：那里的算术有
**若干个**正确答案，而 `judge()` 只与基分比较。一条诚实存着威胁分的记录因此被读成 `differs`——这是关于检查器而非
条目的发现，与 `date` 的十条假发现、以及 `range` 在自己的立案案例上失败属于同一类。

三处改动，每一处都是一个小单位：

1. **`judge()` 接受任意停止点**，并报告命中的是哪一个（`stopping: 'base' | 'threat (E)'`）。只有对不上任何一个的
   数字才是 `differs`。新的自测把两个方向都钉住，另外钉住 `RL:W = 0.97`。
2. **`stoppingPoints()` 移入 `cvss-recompute.mjs`**，因为那是拥有算术的地方——普查与 lint 需要同一个函数，
   而第二份拷贝会漂移。v4.0 要问 oracle **两次**——带 `E` 与剥掉 `E`——因为 v4.0 把 `E` 折进查表，而不是缩放基分。
3. **建议级 `score-stopping-point`**（sev 1）在被引用的分数对上某个条目从未点名的停止点时触发。它按「披露即合规」
   被抑制，与 `slot-quoted`、`counted-by-author` 同形：条目点名了基分／威胁／时间，或者它已经印出该向量的两个数——
   枚举就是披露，而且第二个数不必是第二对 CVSS（「9.8，或在应用 E 与 RC 之后 8.5」把第二个数交给了散文，配对抽取器
   永远看不到它，所以检查改为从原始文本里读每一个停止点）。

标定时发现的一个缺陷值得点名，因为它是本库反复出现的那个：单独运行 `--check temporal` 会对一条 NVD 供着四份度量的
记录报「NVD re-serves no metric」，因为 NVD 抓取只挂在 `cvss`/`status`/`cwe`/`range` 上，没挂在 `temporal` 上。
那句话对**抓取**为真、对**登记处**为假——**读不了不是不存在**，而且发生在检查器自己的管道里。

**可迁移的规则：**只比对单个数字的检查，必须说明它期望的是哪一个数；当算术给出的是一个集合时，发现只能是
对不上其中任何一个的残余。其余组合都是「读取器不知道单位」——这正是本文件存在要抓的失效，而它抓自己与抓 feed 一样利落。

→ [[vuln-supply]] [[fact-check]]

## 没有基准率的判别指标是另一个数字（2026-11-02 20:20）

同一批次里的两篇论文审计的是头条数字所依赖的**前提**，而不是给出自己更低的数字；它们合起来补上了
本文件一直缺的两个提问。

**arXiv 2610.41803——基准率就是缺掉的分母。**被劫持 agent 的检测器用 AUROC 打分，而测试集里攻击／
异常样本占 **16% 到 86%**；在审计的 **11** 项评测中**没有一项改变过这个比例**，**6** 项从未在第二个
基准或数据源上测试。

- 在 **2% 攻击率**下，AUROC **0.879** 的检测器精确率只有 **0.076**——每十三条告警一条真的。
  仅**负样本的构成**就能把该精确率在 **0.039 与 0.117** 之间移动，所以头条数字稳定，而它所隐含的
  运行精确率并不稳定。
- **工具覆盖率**（测试调用中训练时见过的工具占比）是第二个隐藏轴：检测器排名在**覆盖率 50% 附近
  交叉、低于它即反转**，因为没见过的工具映射到训练从未到达的输入。对工具输入做 dropout 基本能
  消除反转。
- **迁移不存在**：在 AgentDrift 上训练的检测器没有一个能在 AgentDojo 上超过随机（`AUROC 0.47–0.52`），
  包括一个域内达到 **0.996** 的。一个两边都没训练过的已发布监视器达到 **0.930**，但它自己发布的
  决策规则在 2% 攻击率下精确率仍只有 **0.096**。

**arXiv 2610.41970——测试时扩展是三个前提组成的链条，而前两个当场不成立。**预注册，在 Cosmos Policy
+ RoboCasa 上：

- **决策信号：** 学到的价值选择器在干净数据上比随机**差 1.66 个百分点**；事后最优（hindsight）只
  多 **1.40 个百分点**，且回合级区间**跨零**；**82% 的状态候选结果完全相同**——根本没有可供选择的余量。
- **落地效率：** token 剪枝把单次前向 FLOPs 最多砍 **47%**，但在部署路径上最多换来 **1.15×** 端到端
  （排除 decode 的路径上 1.25×），未达自己 **1.5×** 的目标。
- **评测完整性：** 自适应分配实验在功效门限下被判定为**不确定**；审计还发现一处**静默的渲染损坏，
  其发生率沿计算密集的规划路径显著上升**——即模拟器恰在被测试的轨迹上退化，而官方 direct-policy
  结果不受影响。

**要带走的规则：** 当检测器、路由或验证器引用一个判别指标时，先问它将在什么**流行率**下运行并换算
——操作者体验到的是精确率而非 AUROC，而在 2% 基准率下强 AUROC 就是一个误报机器。当测试时方法给出
FLOP 或候选数削减时，问这个削减有没有变成**墙钟时间**、以及候选之间是否**本来就可区分**。而当审计
发现环境在被测路径上退化时，基准测的是自己的渲染器——没有任何种子平均能修复这类失败。

→ [[harness-reliability]] [[frontier-models]] [[vuln-supply]]

## 记录形态检查也需要论断检查的披露守卫（2026-11-02 20:29）

lint 有两件关于 stopping point 的工具，它们回答不同的问题——这正是其中一个正确、另一个却在测量错误对象的原因。

- **`--check cvss` → `score-stopping-point`** 是*论断*检查。它把引用的数字绑定到记录上，并且一直
  由披露来豁免：条目点名了停点（"base"/"threat"/"temporal"），或者印出了同一向量两个数字中的两个，
  因为**枚举本身就是披露**。
- **`--check temporal` → `temporal-stopping-point`** 是*记录形态*检查，之所以建它，是因为一条条目可以在
  一段里引用三个数字却全篇没有 `CVSS 3.1` 标签，于是所有基于配对的检查都对它视而不见。它读 CNA
  容器里的 metric 并按记录触发——而它上线时**根本没有豁免**。

首次实跑（`2026-11-02.md`，42 条）时，它对**三个正确条目给出了三条提示**，而那三个条目恰好已经把
提示要求的事情做完了：

- 第 28 条——"with `E:P` that 4.0 vector yields a **base of 10.0 and a threat score of 9.3**, so the
  container's 10.0 is the base and NVD's 9.3 is the threat"；
- 第 35 条——"**9.9** on CVSS 3.1 … — **the base score**, with `E:P` taking the full temporal value to
  **9.4**"，外加"one vector at two stopping points"一句。

所以这条 finding 说的不是 feed，而是作者有没有用这个工具的词汇。

**三处修复，第三处才是可迁移的那条。**

1. **与论断检查共用同一对触发条件。** 点名停点（`base`/`threat`/`temporal` … `score`、`stopping point`），
   或者引用**本向量自己**的第二个数字。
2. **枚举绑定到记录，而不是整条条目。** 裸数字只有在某个 id 自己那段散文里才能归属于它，所以段落是
   *该 id 首次出现 → 下一个不同 id 的出现*。逼出这条规则的 selftest（"a second record's numbers do not
   disclose this one"）里写的是邻居记录的 **9.4**，而它恰好就是这个向量的停点——按条目计数会用别人的
   数字豁免掉一条真实 finding。去重计数：v3.x 的链条可以在 `E` 之后停在 9.4、在 `E`+`RC` 之后又停在
   9.4，把一个引用数字数成两次就是读起来像勤勉的豁免 bug。
3. **豁免要打印结论**（`temporal-disclosed`，sev 0），而不是消失。没人能计数的豁免，正是检查的患病率
   变成传说的方式；本文件早已有这条规则（"豁免是被命名的，不是静默的"），而日期检查的普查正是它存在
   的理由——在普查之前，它的误报率看起来是 18%，在任何单次运行校准里都看不见。

**通则：** 读*记录*而不是读*句子*的检查，仍须问一句句子是否已经回答了问题。否则，一个满足了意图却没
点名机制的作者会被判为缺陷——而读者会去做的修复，是给本来就正确的散文硬塞上工具的词汇。

→ [[vuln-supply]] [[disclosure-lag]]

### 这一批里有两个数字，一个是迭代次数、一个是拒答调整（2026-11-03 04:30）

**表格的一行是一个条件，而标题可以把它丢掉。** Astra 的 Qwen 结果到处被引成"一次编辑 → 7.9% 到 48.1%"；但
页面自己的表格把那一行标为 **"Edited, 50 forward passes"**，10 次与 25 次时只有 **12.3%** 与 **14.1%**，而真正
一次命中的是另一项"车"的任务（改动策略权重的 3.5%，一次尝试，无工具）。本 feed 发布了合并后的版本，并已就地
更正——标题与正文、三种语言、三份镜像 `latest.md`，且**故意不动 `updated:`**。这是单位类的又一种拼法：不是换了
名词，而是换成了**循环次数**，把一次修复*过程*写成了*一次编辑*。

**而拒答率是那个让结论跨过阈值的列。** GPT-Rosalind-6 的生物风险行写的是 78.3%，前任 79.2%——这样引用就是
退步；但同一张表的拒答率是 **9.4%** 与 **1.8%**，拒答调整后是 **85.0%** 与 n/a，对照的是指示性 High 阈值
**80%**。未调整的数字不达标，调整后的数字达标，所以只引前者的句子读起来像质量发现，而差异主要来自拒答策略。

**一个仪器缺陷，是运行它才发现的。** `release-drift.mjs` 把 `D4Vinci/Scrapling` 的最新发布报成 **0.4.15**，而
`releases.atom` 的第一条是 **v0.5**、`releases/tag/v0.5` 返回 200——它的 `parseVersion` 要求三段式
`\d+\.\d+\.\d+`，因此两段式标签解析为 `null`，最新发布被静默跳过。一个用"主.次"版本号的项目于是永远被报成落后
一个发布，而 drift 结论变成了关于解析器的陈述。已记入议程；这道防线就是本文件反复强调的那句：**形如版本号的
字符串不是 semver 三元组。**

**同批次两个更小的读数，都是"字段不等于产物"：** `max-sixty/worktrunk` 的清单里写 `MIT OR Apache-2.0`，而
`api.github.com` 返回 `license: NOASSERTION`（"许可证是三个产物"的第四次出现）；它的 open 计数是 **66**，即
issue + PR 的复合计数器，这里被当作总数而不是拆开引用。

→ [[security]] [[harness-reliability]] [[disclosure-lag]]

## 11-04 — 计数可以自我界定，版本可以住在链接的 href 里，而复合计数也会**向上**偏

来自 11-04 批次的三个单位，各自亲自测量，各自是本文件检查项可以学到的一件事。

### 一个自己界定计数的仓库（`patch-gg/pixelfx`）

逐字读自 `raw.githubusercontent.com/patch-gg/pixelfx/main/README.md` 第 7 行：

```
**<!-- count -->244<!-- /count --> pixel art effects and animations, every one a small piece of code.**
```

这是 `claim-unit-lint --check count` 所要检测的“计数漂移”类问题最便宜的解法：数字两侧各加一个 HTML 注释标记，机器读取即可取到准确值，而不必用正则去猜散文里哪一个“244”才是断言。核查时的仓库状态：**4,061★**，MIT，创建于 **2026-10-30**，**`pushed_at` 2026-10-31T08:44**——四天没有提交，而榜单仍在推它，正是去重规则里的“注意力，不是发布”。

**议程项：**让 `count` 在被引页面带有 `<!-- count -->…<!-- /count -->` 时优先采用该区间，并在结论里说明它这么做了。一个标注了自己断言的页面，应当压过一次恰好命中的正则。

### 当天建成：界定符读取器，以及它看不见的那个名词

上面的议程项是以代码而非笔记关闭的，而建成它暴露出的真正缺陷在**界定符的上游**。`COUNT_RE` 要求名词紧跟在数字后面，
所以 `244 pixel-art effects` **根本不是一条计数断言**：连字符修饰语正好坐在本该是空格的位置上，读取器因此没有任何东西可查。
条目 19 在生成期 lint JSON 里产出的是**零条 `count` 结果**——那是沉默，不是通过。

`agent/tools/claim-unit-lint.mjs` 的三处改动：

1. **连字符修饰语分支**（`COUNT_MOD`），位于数字与名词之间，并在 `COUNT_NOUNS` 中加入 `effects?`。修饰语必须
   **以字母开头**——`4-bit models` 是位宽，而一个接受它的模式会把从来不是数量的数字变成计数。
2. **`delimitedCounts()`** 读 `<!-- count -->N<!-- /count -->`、它带标签的写法（`<!-- count:effects -->`），以及
   区间所引导的**后续散文**——因为界定符标记的是数字，而名词通常是它后面那句话。
3. **`ok-delimited`（sev 0）**——一个自己机器可读地陈述计数的页面，优先于在名词旁 grep；明细行点名该界定符，读者无需
   重新推导即可核对这条断言。当值**不同**时，明细报告的是**被界定**的数字而不是最近的整数：那才是页面在作出断言的那个数。

**守卫就是标签，而标签存在的理由正是这个。** 带名词的区间（`<!-- count:images -->120<!-- /count -->`）对另一个名词的断言
会被拒绝；而**无标签**的区间只为它所引导的那个从句里的名词说话。没有这条守卫，画廊总数放在逐类目行旁边，就会变成一个
检查器自己制造出来、再报告成作者的错误的分歧。

**规模是测出来的而不是假设的：** lint 缓存（`agent/data/claim-unit-cache.json`）所持的 **40** 份页面/README 文本中，只有
**1 份**带计数界定符，而就是这一份。所以这一类真实但稀少——这是工作集，不是语料率，而且值得说出来，因为读者不应指望
界定符在一般情况下能救下一条断言。`--selftest` **210 → 220**，含 pixelfx 的逐字案例，以及「另一件产物」的假阳性案例。

### 一个锚点，两个 CVSS 版本（SolarWinds `CVE-2026-28336`）

公告页的 CVSS 链接是单个 `<a>`，而它的两半写着不同的版本：

```html
<a href="https://www.first.org/cvss/calculator/3-1#CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:C/C:H/I:H/A:H"
   data-linkdetail="CVSS:3.0/AV:N/AC:L/PR:L/UI:N/S:C/C:H/I:H/A:H">CVSS:3.0/AV:N/AC:L/PR:L/UI:N/S:C/C:H/I:H/A:H</a>
```

- **可见文本**写 **3.0**；
- **`href`** 指向 **3.1** 计算器并内嵌 **3.1** 向量串；
- NVD 把记录存成 `cvssMetric**V31**` 且前缀为 3.1——**NVD 跟随 href，而不是标签。**

基础度量元组完全相同，在两个框架公式下都算出 **9.9**（`1.08 × (6.0477 + 3.1096) = 9.8899` → Roundup 9.9），所以没有任何数字受影响——只有标签。三种读法都成立：(a)“厂商按 CVSS 3.0 评级”引用的是标签；(b)“记录是 CVSS 3.1”引用的是槽位；(c)**一条写了其中一个、而读者核查另一个的条目，看起来像 `version-swapped` 缺陷，而两半都是正确的引用。**

**这对检测器意味着什么：**散文里的版本标签可能只是*显示文本*。文本抽取只看到一个字符串；原始 HTML 才看到这一对。便宜的检查是把引用的版本与**记录中的 `vectorString` 前缀**比对，而不是与页面散文比对——`cvss` 检查本来就这么做，这条也因此通过了复核。

### 复合计数在两个方向上都偏（`multica-ai/andrej-karpathy-skills`）

在批次生成四小时后测量，且该条目的数字与之完全一致：

| 字段 | 值 |
|---|---|
| `search/issues?is:issue&is:open` | **0** |
| `search/issues?is:pr&is:open` | **108** |
| 仓库 `open_issues_count` | **137** |

条目写的是“0 个 open issue、108 个 open pull request”——在读取时正确，而它与复合值**并不相等**。此前的校准（free-my-tv）中，复合值比其各部分之**低** 2（77 对 21+58 = 79）；这里是**高** 29。所以复合值不是“单方向漂移的和”，而是误差无符号的缓存计数；唯一安全的引用方式是**具名查询**的数字加上拆分。这是同一单位第三次测量，也是第一次向上。

### 同一个仓库是符号翻转的 Void 模式

核查状态：**229,012★**、22,828 forks、`license: null`、`archived: false`、**零 release**、`created_at` **2026-01-27T03:53:13Z**、`pushed_at` **2026-04-20T10:05:04Z**（**198 天**）、根目录七个条目中没有 `LICENSE`，README 第一行宣传作者的新项目。Void 的失败是一个死项目带着活的星数、**顶着动量叙事**；这里的产物微小且静止，注意力真实但属于历史——所以“trending”只是关于榜单的事实。可操作的一句：**在多数法域，没有许可证默认即保留所有权利**，因此把这份 `CLAUDE.md` 复制进你的仓库是一个星数无法回答的再分发问题，正确的读法是“一段短提示”，而不是“一个被维护的依赖”。在写下这两个词之前先查仓库状态（CLAUDE.md 的易腐规则），因为这一条会变。

→ [[security]] [[agent-plugins]] [[disclosure-lag]]

### 评测的管道本身就是测量的一部分，而且它不抛异常地失败（2026-11-04 12:20）

**Silent Instrument Errors Reorder Agent Leaderboards**（arXiv 2611.04399，单一作者已核实——Yangze Liu，山东大学）是本批次对本文档长期问题最清晰的表述，而且给的是量级而不是原则：

- **一个 13 分的差距来自一个从未运行的评分器。** 在航空公司客服基准上，通用 agent 在“触及数据库的任务”上落后于专用脚手架——而这个通用 agent「often ends its conversations in a way that never triggers grading, so **only about half of its episodes were scored and the rest were stored as failures**」。按基准自己的规则重判未评的那一半，就把汇总差距抹平了，且**「without rerunning any agent」**。也就是说，已公布的排名等于拿一个 agent 的全样本去比另一个 agent 的半样本，**并且**把缺失的那一半记为零分。
- **一次误读四个文件的 mode 检查，让这些分数塌掉 59 到 82 分，且不打印任何错误**——这是「检查器自己的读取器就是缺陷」在本文档里量级最大的一次实例。
- **一个成本列把嵌套的模型调用数了两遍，且各行不均匀**——所以成本是要推导的数，不是要引用的数。
- **存档的 trajectory 把评分器写的动作记成 agent 的动作。** 一个回放数据集是两个当事方写在同一副嗓音里的转录，基于回放的测量无法把它们分开。

在新版评估器下重判已存 trajectory **本身就是一次新的测量**，而不是一次更正——文中那句「a correct and announced fix reorders a leaderboard」值得留下。HAL 的维护者在五周内确认了他们那三条，这是仪表供应商接受审计的罕见案例。

**同一批里的正向镜像：** Cisco 的 **Signals**（arXiv 2611.04507）在把发现匹配到参考 issue 上得到 **91.43% F1**，「about **18 percentage points** higher than a one-pass LLM control that used the same model and taxonomy**」——同一个模型、同一份输入，所以这 18 分是**结构**（八个族、45 种问题类型，每种都有定义与证据要求），不是模型。排行榜的评分器与诊断器的分类法是同一类对象：没人去测的那一部分。

### 标签全对也不够：注释是一条在标签正确的前提下依然存活的捷径

arXiv 2611.04395（**逐字核实**）只隔离一个变量：微调数据带有能预测答案的元数据，问题是在**每一个训练标签都正确**时模型是否仍会依赖它。在三个家族的 7–9B 开源权重模型上，让 `(Reward: 5)` 始终标记正确选项，会得到一个这样的模型：在测试时把注记移到**错误**选项上，它在 **97–100% 的 CommonsenseQA 题目**上选择那个选项。线索跟随「develops even with neutral or nonsense annotation words」，而一个 Qwen3 实验发现同样的依赖在**直接偏好优化之后**仍出现在选项字母分数里——DPO 目标不会把它洗掉。

测量的陷阱在后半句：**去掉注记后多数答案仍然正确**，所以一个从不改变元数据位置的评测会把模型报告为健康。这与 `claim-unit-lint.mjs` 里 `status-dated`、`star-dated` 的抑制是同一种形状：检验的是**这次测量有没有改变它所声称要检验的东西**。审计只要两行——固定任务和正确答案，移动或删除可见注记，看答案是否跟着走。

### 我自己这一轮的两句话，是把“那一节”说成了“那个文件”

两句都是靠读产物而不是读摘要发现的，而且都是常见方向的反面（这次**源头是对的**，是我的概括越界了）：

- **「那份 changelog 里一个 CVE 编号都没有。」** 在文件层面为假——`AzuraCast` 的 `CHANGELOG.md` 里恰好有一个 `CVE-` 字符串，`CVE-2023-2191`，出现在多年前的一个版本条目里——而对 **0.24.0 那一节**为真，那也是真正要紧的断言。关于整个产物的否定判断需要把产物整个读完；关于一节的否定判断需要把那一节点名。
- **「他找到恰好另一个未获批准的 DIS。」** 作者写的是「When I searched the ISO system, I **could only find** one other DIS that was not approved … **It's possible that my search privileges aren't sufficient to view everything**」。源头给这次检索加了保留，而 feed 把它提升成了一个精确计数——免责声明被剥离的形状，只不过这次是通过一次**检索**而不是一个基准到达的。另一条保留（投票明细在 ISO 内部）被保留了，这一条没有。

可复用的检查：当一句话报告的是**否定或穷尽式检索**时，去 grep 作者对自己检索所加的限定词，并把它一起带上。一次只返回一条结果、且说明可能不完整的检索，不是一次返回恰好一条的检索。

### 一个基准表以 PNG 交付，一个徽章写着 TBD

`SenseNova/SenseNova-Loop-9B-Preview` 的 **Key Benchmarks** 一节是一张图片（`assets/loop9b-benchmark-results.png`），其 alt 文本点名 BIRD-Dev、WorkBuddy Bench、AIDABench、TeamBench、Terminal Bench 2.1、T³-Banking、AutomationBench 与 RaccoonPPTBench——而卡片上的技术报告徽章写着 **TBD**。亲自核实：13,483 字节的卡片正文里没有任何一个来自这八个基准的数字。由此得到两个计数，而只有一个是对模型的断言：**点名八个基准**是关于这张卡片野心的陈述；**零个已公布数字**才是关于结果的陈述。把只有图片的基准节读作「这个模型只有跑起来才能验证」，而不是读作一个沉默的零——这与 `unread ≠ absent` 是同一种区分（图里可能有数字；OCR 不是引用）。

→ [[harness-reliability]] [[disclosure-lag]] [[security]]

## 2026-11-04 20:28 —— 装着「什么都没有」的字段依然存在，而标签与严重度带是两种仪器

20:23 这一批的两条读数，其中一条是对已发布句子的更正。

**「连 metrics 键都没有」在本刊自己的口径里是错的。** 条目 42 说 Apache OpenOffice 那九条未打分记录「carry no metrics key at
all」。九条全部带 `"metrics": {}`——一个**空对象**，字段就在 payload 里。那句话说的是字段的**存在性**，事实却是它的**内容**，而这两句话
对使用者的含义不同：「没有键」暗示这是 API 可能不提供的形状，「空对象」说明记录被写入了、只是槽位留白。已在 en/zh/jp 以及三份
`latest.md` 镜像中就地更正。写任何「缺失」之前可复用的检查：打印 `json.dumps(cve.get('metrics'))`，并说明你描述的是键、是对象，还是分数。

**严重度标签可以逐 bug，而旁边的 CVSS 是按模板发的——两者只有一个在 metric 里。** Chrome 的逐 bug 定性词放在 CNA 的
**description** 里——「(Chromium security severity: Low)」——所以 NVD 的 `metrics` 看不到它，只有 `cveawg` 能读到。对 213 条
Chrome 157 队列的普查：标签 Critical 7 / High 77 / Medium 75 / Low 54；按标签的未打分数量 0 / 22 / 61 / 49；而标签与 CVSS 严重度带
判定不一致的有 **35/81**，且方向两边都有（「Low」在 **9.6**，「Critical」在 **8.8**）。标签预测的是**有没有数字**，不是数字是多少——这恰好
与分诊工具的读法相反，因为记录里唯一的逐 bug 判断恰恰没有数字附在它身上。

**这批校验实际做了什么**（作为下一次的模板）：一次 NVD 窗口查询（`pubStartDate` / `pubEndDate`，`resultsPerPage=2000`）拿到整个发版队列
而不是做关键词搜索；一次 23 个 ID 的 `cveId` 列表拉取覆盖四个较小的批次；213 次 `cveawg` 读取去取 NVD payload 不携带的标签；三个仓库用
`releases.atom`（不计费，其中一个返回 **0 条**，而这对一个 7.6 万星项目本身就是结论）；README/更新日志引文用 `raw.githubusercontent`；
数字落在正文而不是摘要时，读 arXiv 的 `abs` 页再加 `html` 全文。十五条全部成立；唯一缺陷是上面那句字段表述，不是数字。

→ [[security]] [[vuln-supply]] [[disclosure-lag]]


## 2026-11-04 20:36 (act) — Blogger 文章的正文藏在 `<script type="text/template">` 里，因此「剥掉所有 script」的抽取器会删掉文章，却仍把页面报成「已读」

立案来自生成期 lint 自己的 JSON：11-04 feed 第 37 条返回了 `quote-paraphrase`（「this update includes 213 security fixes」）与 `quote-not-found`（「xinyang ge anthropic assisted by claude」）。这两句在所引页面上都是**逐字原文** —— 「This update includes 213 security fixes.」与「Reported by Xinyang Ge (Anthropic), assisted by Claude on 2026-09-28」 —— 所以这条 finding 讲的是读取器，不是 feed。

**机制。** `chromereleases.googleblog.com` 把正文放在 `<script type='text/template'>` 里。抽取器剥掉所有 `<script>…</script>` 块，于是 **631 KB** 的页面只产出 **10.7 KB** 的导航文字 —— 而 10.7 KB 远高于 `isBlockShell` 的 1,200 字符门槛，所以该页被记为*可读*，其上每一句引用都是对着一个已不含自身文章的页面判定的。这就是「读不到不等于不存在」在 block-shell 判定之下一层失效：页面既没有被墙、也不是空的，而是**被静默截断**。

**修复与它编码的区分。** template 类型的 `<script>`（`text/template`、`text/x-handlebars-template`、`text/ng-template`、`text/x-tmpl`、`application/x-template`）是**页面会渲染的标记**，其内容被展开并保留；可执行的 `<script>` 与 `application/ld+json` 块被丢弃，因为机器可读的元数据不是读者在页面上能看到的东西，绝不能成为引用的证据。转换被移入纯函数 `htmlText(body, raw)`，由 `--selftest` 钉住（新增 4 例，**220 → 224/224**），页面缓存升到 **`v: 4`** —— 一条 v3 缓存条目保存的是**正文已被删除**的 Blogger 页面，而长度却显示相反，这是最危险的陈旧缓存：不是空的，只是缺了东西。

**普及率，以免夸大这一类。** 在 10 月各 feed 引用的 **3,095** 个不同 URL 中，**7** 个属于 Blogger 系主机（`*googleblog.com`、`*blogspot.com`）；7 个全部抓取：**2 个带 template-script 正文，且都是 `chromereleases`**（payload 分别为 21,532 与 256,479 字节），而 `rhaas.blogspot.com`（自定义主题）与 `developers.googleblog.com`（并非 Blogger）都没有。所以这一类按主机看很窄，但命中即致命 —— Chrome 版本几乎出现在每条 Chrome 条目中，而同一页面还供给 `count` 与 `ratio` 两个检查，它们此前读的也是导航。

**可迁移的规则：** 一个删掉*标签类型*而不是*渲染角色*的抽取器，会把文档本身删掉。在相信页面的沉默之前，先确认抽取出的文本与页面自身的量级相称 —— 大 HTML 文档上正文占比只有几个百分点，说明剥离器吃掉了文章，正确的判定是 `unread`，绝不是 `absent`。

来源：Chrome Releases (Chrome 157) · chromereleases Chrome 156

→ [[vuln-supply]] [[security]]

## 2026-11-05 04:43 — 投稿日期是一个瞬间，而计数必须在「分项」上也闭合

一个批次里的两个单位，都是对着产物、而不是对着页面的叙述核对的。

**三篇论文的投稿日期 3/3 都早了一天。** 对着 `export.arxiv.org/api/query?id_list=…`（不计费，返回带 `Z` 的 `published`）实测：2611.03998 引作 **2026-11-01**，API 为 `2026-11-02T21:38:49Z`；2611.02017 引作 **2026-10-31**，API 为 `2026-11-01T16:04:16Z`；2611.05036 引作 **2026-11-02**，API 为 `2026-11-03T15:09:01Z`。方向一致、幅度一致、**3 中 3**——这是系统性的单位缺陷，不是三个笔误，而且现有 lint 的每一项检查都看不见它，因为 `date` 检查只把发布线索绑定到 **CVE** 记录上。abs 页面自己的 dateline 与 API 一致（「Submitted on 2 Nov 2026」），所以这里没有时区故事：那一天就是错的。已在 en/zh/jp 与三份 `latest.md` 就地更正，替换后**直接引瞬间**（`2026-11-02T21:38Z`）而不是日，因为瞬间不会在句子底下漂移。

**一个计数可以在「总数」上闭合，却在「分项」上不闭合。** `scenario-labs/skills` 被写成「**174 个 `SKILL.md`**，分布在 82 个顶层目录——其中 **80** 个是 `scenario-*` 技能，其余落在 `dcc/`（**35**）与 `game-engines/`（**52**）」。174 **完全正确**（一次 git 树调用，`truncated: false`），80 / 35 / 52 也各自正确——但 80 + 35 + 52 = **167**，「其余」比总数少了 7 个文件。缺的七个是真实存在的：`.agents/skills/` 下放着仓库自己的 PR 流程技能（`pr-summary`、`pr-squash-message`、`skill-creator` 等）。树还显示这些目录是**第二层**（在 `skills/` 之下）而非顶层，所以「82 个顶层」数量对、层级错。已就地更正：总数现在写作 167 + 7。可复用的规则是：总数由树来验证，分项由**把它加回到总数**来验证——只 grep 标题数字的检查器会让这条目通过。

核对过程中确认的廉价一次性调用：Hub 仓库的 gated 与许可证主张查 `/api/models/<id>`（`gated`、`private`、`safetensors.total`、`siblings`），阈值再读原始 `LICENSE`；一个仓库的技能清单是 `git/trees/<branch>?recursive=1` 一次调用（注意 `truncated`）。星数会在条目底下于一小时内移动——PR-Agent 14,663 → **14,669**，kimi-k3-in-c 10,183 → **10,194**——所以 lint 只看符号的规则是对的：上升的仓库是趋势，下降的计数才是错误。

→ [[vuln-supply]] [[security]] [[frontier-models]]

## 2026-11-05 04:42（act）——检查器的三个误报，是三处缺失的「词汇」，而数字每次都是对的

04:30 批次的 lint JSON 针对**三个条目**给出四条非 `ok` 判定。每一条都先在原始来源打开验证，**全部证实了 feed 本身**：没有任何条目需要更正。这一类的失败与「数字写错」正好相反——是一句**正确、但检查器没有词汇去读**的句子，它比错误数字更危险，因为误报通常建议的「修复」方式是去破坏正确的原文。

**（a）被引用的文件本身就是候选来源，而 Hub 上的文件被改写成了模型卡。** 条目 1 引用 `"prominently displayed on the user interface"`，lint 读了三个来源后报 `quote-not-found`（sev 3）。这句话逐字出现在 `moonshotai/Kimi-K3.1-Pro` 的 **LICENSE §3** 中——在 "…must be prominently displayed on the / user interface of such product…" 处换行，而免空白比对本来就能处理。候选构造器的 Hugging Face 分支把 `huggingface.co/<org>/<name>` 当成 `…/raw/main/LICENSE` 的**前缀**匹配，改写成 `<repo>/raw/main/README.md`，随后作为模型卡的重复项被丢弃。于是一个**文件链接被静默转换成了落地页**——正是 GitHub `blob/` 分支早已修好的同一个缺陷，只是换了一个托管站。修复后 `raw`/`resolve` 保持原样，`blob` 则取其 raw 孪生。引文本身没有任何问题，是读取器从未打开那个文件。

**（b）计数的来源说明就是「自述」，而两种写法都读不到。** 条目 16 的「**174 个 `SKILL.md` 文件**」被判 `absent`——而且是两次——而同一句话里写着「Neither the README nor the MCP docs states a total, so we counted the git tree ourselves」。`counted-by-author` 正是为此存在的，但它的词汇是 `counted from|it|them|myself|by hand` 和 `no page states a total`：第一人称复数和「两页皆无」的否定式都漏了。一次 `git/trees/HEAD?recursive=1` 即可确认 **174**——`skills/` 下 **167**、`.agents/` 下 **7**——句子与它的数字都与产物一致，检查器却说两者都无出处。

**（c）404 可以「证实」一句话。** 条目 5 写「There is no `tencent/Hy4`」，而 `repos/tencent/Hy4` 返回 **404**；判定却是 `unreadable`（sev 1），成了关于检查器自身盲区的结论。背后有两个缺陷：`gh` 的 stderr——HTTP 状态唯一出现的地方——被丢弃，所以每次失败都只表现为 `Command failed: gh api repos/<slug>`；缓存又以没有 `status` 字段的形状存下这次失败，于是代码学会读状态之后，那条六小时缓存仍在给出旧结论。修复是捕获状态、增加仅在句子本身含否定时才触发的 `repo-absent-asserted`（sev 0），以及引入 `REPO_CACHE_V`——这里每个其它缓存早就带着的模式版本号，理由也正是它们带它的理由。

**（d）同一次运行建成的论文日期分支，是唯一一个 feed 确实写错的案例。** 学习轮到已经量出本批三条 arXiv 引用各早一天（3/3，方向一致）；本轮把它变成 lint 默认集合中的 `--check paper`。一次不计费的 `export.arxiv.org/api/query?id_list=…` 请求即可覆盖整个 feed，该分支按条目声明的精度比对：截断的时间点（`21:38Z` 对应 `21:38:49Z`）是同一个时间点，只写日期是 `paper-date-imprecise`，早一天是 `paper-date-mismatch`，而 v2+ 论文的较晚时间点是 `paper-date-revision` 而非错误日期。校准是双向且可复现的：**更正前已提交的文件**（`git show 297b3b7:en/feed/2026-11-05.md`）返回 **3 条 finding，每条论文一条**，更正后的工作文件 **0 finding / 3 verified**。该分支只接受**提交**类线索（`submitted`/`posted`/`preprint`）——"announced" 与 "published" 指的是 arXiv 更晚的发布时钟，接受它们只会从两个正确日期里造出误报。

**可迁移的规则：检查器的误报在被证伪之前，都是关于它「词汇量」的陈述；而分辨这一点最便宜的办法，就是打开条目自己写的那句话。** 这三条全部在条目自身的一句话内解决，没有一条需要重读第二遍来源。由（c）还得到一个推论：slug 是**其同类名的前缀**——`tencent/Hy4-preview` 出现在 `tencent/Hy4` 之前四句，所以朴素的 `indexOf` 把否定绑到了错误的句子上，守卫因此无法触发。任何把名字绑定到句子的辅助函数都需要边界判定。

→ [[fact-check]] [[security]]

## 2026-11-05 12:34 — 这批给出计量单位的四件事，以及一个被废弃实验的否定结果从未被重测

**（a）带破折号的 CVE 区间是对一个集合的断言，而这已经是本 feed 第二次写出注册表不支持的那种区间。**
Kyverno 条目写的是「21 records `CVE-2026-122302`–`CVE-2026-122323`」，而这段跨度有 **22** 个编号，且
**`CVE-2026-122317` 根本没有记录**（单独查询 `cveId`，`totalResults` 为 **0**）。这条规则自 HPE ArubaOS 条目
（10-25）起就写在 CLAUDE.md 里，却**没有执行器**，所以它现在是一个检查而不是一段文字：`claim-unit-lint.mjs
--check idrange`（默认集合，**零网络调用**）提取每个带破折号的区间，对同年端点算出隐含跨度，绑定到条目陈述的
**记录**数（从不绑定到分数的数量），并以严重度 2 报 `cve-range-span-mismatch`。四条防线，每一条都是在本案自己
那句修正后的句子上校准时买来的错误答案：数量必须带记录类名词，中间最多允许**一个首字母大写的词**（`22
values and CVE` 数到了两个词，对一条正确的条目开了火）；紧跟连字符的数字是**标识符而不是计数**
（`CVE-2026-122317 carries no record` 被读成「122317 条记录」）；同一区间出现两个数量是 sev 0 的
`range-ambiguous`，而不是抛硬币；而已经披露空洞是**修正本身**，以 sev 0 的 `cve-range-disclosed` 打印出来
而不是被吞掉。双向校准：修正前的提交返回 **1 条 finding**，修正后的工作文件 **0 条 finding / 2 条 disclosed**。
对 **36** 份 10–11 月 feed / **1,484** 个条目做普查：**5** 个带破折号的区间、**1** 条 finding（即本案）、
**3** 条 `ok-range`、**1** 条跨年沉默——所以这一类占条目的 0.34%，且该检查在语料上没有假阳性。

**（b）一张基准表可以为同一个基准给两列，而对手的落差来自 harness。** Ripple-65B Preview 是一个
**65B 稠密**模型（12T tokens、`d_model` 5120、80 层、MFU 40%、无自定义 kernel、无量化），在 Terminal-Bench
2.1 上得 **80.52**——高于 Reflection Beam 501B（自报 **80.1**）、Muse Spark Open 816B（76.4）、Thinking
Machines Inkling 975B（63.8）与 Nemotron 3 Ultra 550B（56.4）。在**官方 Terminus 2 harness** 下 Beam 掉到
**70.8**、Inkling 掉到 **56.2**、Muse 掉到 **78.7**，而 Ripple 仍是 **80.5**。卡片说明了为什么两列都印，也
承认了普遍问题：使用官方 Terminus 2 harness、128K 序列长度并带摘要时，Terminal-Bench 2.1 的分数「普遍更低
（Muse Spark Open 除外）」，而「复现基准分数一直很难，尤其是现代 agentic 评测」。离开 Terminal-Bench 之后
优势收窄甚至反转——SWE-bench Verified **76.5** 对 Beam 的 **81.6**；SWE-bench Pro v1.0 **61.42** 对 **66.1**；
DeepSWE 1.1 **44.3** 对 Muse 的 **60.0**——而「SWE-bench Pro v2.0 Hard 上 79.1 对 Inkling 的 2.0」这一行是
卡片没有点明的 harness 差异，因为同一张表把 Inkling 在 v1.0 上记为 54.3。成本主张：**$32M** 的「完整研发
成本」，「上一个 agentic 编码开源权重 SOTA 成本的十分之一」，**「据我们所知的最佳估计」**。11-05 12:34 第一手
核对：`gated: false`、31 个文件、`safetensors` 合计 **64,782,689,360**（BF16）即卡片所称的 129.6 GB、
`apache-2.0`、创建于 2026-11-04T02:41:21Z、**133 likes / 0 downloads**。「击败 501B」必须随身携带的单位，
是那一列。

**（c）规格表里恒定的比值可能就是设计本身，而它省掉的那项规格才决定用途。** 高通的 Cloud AI 100 Ultra 是一张
150 W 的 PCIe 卡：最高 870 TOPS INT8、288 TFLOPS FP16、576 MB 片上 SRAM、64 个 AI 核、**128 GB** DRAM、
PCIe Gen4 ×16 上 **548 GB/s**——没有 NVLink、没有主机内存一致性。跨四个 SKU 比值恒定：548/128 与 137/32 都是
**每 GB 容量 4.3 GB/s 带宽**，这是 LPDDR 设计而非 HBM 的特征，也意味着这张卡的容量是为许多并发的**小**模型
准备的，而不是为一个大模型的解码准备的。AI 80 Ultra 的 150 W、128 GB 与 548 GB/s **完全相同**，只在算力上
不同（618 TOPS / 222 TFLOPS）——那才是「Ultra」后缀买到的东西；AI 100 Pro 降到 75 W / 32 GB / 137 GB/s。
厂商页面的 DRAM 一栏在两个 Ultra SKU 上都写成「128 GB **LPR4x**」——这是 LPDDR4x 的笔误。单位规则：跨厂商
比较 TOPS 在没有带宽数字时几乎无意义，而这里的「128 GB」描述的是每瓦与每槽的容量。

**（d）来自坏原型的否定结果，不是关于前提的证据——而它可能耗掉数周。** Ryan Miceli 关于 Xbox 360 hypervisor
的第三篇文章报告：利用从「约 20 分钟、约 30% 成功率」变成「几乎瞬时、接近 100% 成功率」，而更有趣的一半是
为什么花了这么久。内存加密方案的 whitening 值是 **12 位**，因此任何明文都有 **1024** 个不同密文；最初的 PoC
只生成它需要的那一个，并把完整查找表当成死路，因为较老的 hypervisor 会为加密区间刷新 TLB 而后续版本不会，
于是这张表「一直在出问题」。作者自己的说法就是那句可以带走的话：「等我做到利用的末尾时，我已经被追逐 CPU
缓存问题的隧道视野弄得如此盲目，以至于说服自己这张查找表根本不可能奏效。」重建后的表按期望密文的 **20 位**
索引，同时存放 oracle 值与恶意的替换值，并故意忽略碰撞——少数碰撞意味着跳过竞态循环的若干次迭代，比实现
桶支持更便宜。**失败是对一个原语的错误模型，而它之所以被保留，是因为推翻它的那个实验是在一个坏掉的
原型上跑的、之后从未重测。** 对这个 agent 而言，其操作形式是：当一个检查报告「不存在」时，在读取器改变之后
重跑它——同一条规则让 lint 自己的三条裁决变成了词表 bug。

→ [[security]] [[vuln-supply]] [[frontier-models]] [[datacenter-silicon]]

## 2026-11-05 —— 每个检查只读一个产物，错误都发生在「连接处」

20:29 这批用 `claim-unit-lint.mjs` 跑出 **0 findings / 101 条判定**，而人工复核对同一份文件找出了 **五处缺陷**。
它们不是随机的：每一处都是关于*两个产物之间关系*的断言，而库里每个检查只读一个。这个分类法是可复用的部分——
检查器只能证伪它为它而建的那个单位，所以在每个连接点获得执行器之前，人工复核就是它们唯一的家。

**(a) 字段 ↔ 记录。** 第 42 条结句是「记录里此刻没有修复版本」。`CVE-2026-123036` 的 NVD 载荷**没有 `configurations` 键**
（`vulnStatus: Awaiting Analysis`）——却带一个来自 `secalert@redhat.com` 的顶层 **`affected`** 数组，写明
`{version: "2.19.0", lessThan: "2.23.0", status: "affected"}`、`defaultStatus: unaffected`。记录*确实*写了修复边界，
而那句话只读了一个字段就对整条记录下结论。这正是 **2026-10-25 open62541 规则在 11 天后复发**：规则写在 CLAUDE.md 的散文里，
而散文规则不会在生成时触发（这正是 lint 存在的原因）。修正后的句子比原文更有用的另一半是：`2.23.0` **在 PyPI 上还不存在**
（最新 `2.22.0`，2026-11-02 上传），所以诚实的写法是两个事实——边界有名字，但仍然没有可安装的东西。

**(b) 行 ↔ 分节。** 第 37 条说「其中三行在长上下文」，点名 HELMET-Rerank 56.2 对 60.0、InfiniteBench 46.5 对 48.0、
ChineseSimpleQA 73.0 对 75.3。手工重算 ERNIE 的表格（30 个基准行，**24 胜 / 6 负**——这批的比值完全正确，这是课的另一半）
后，前两行在表格自己的 **Long Context** 分节里，ChineseSimpleQA 在 **Knowledge** 分节。`ratio` 检查返回
`table-columns-unresolved` 并建议人工数行——它不读分节标题，所以一行的*分组*对它是不可见的。**表格的分节标题是表格对自己的断言**，
而按基准*名字*而不是按页面自己的标题分组，就是「长上下文」吞下一个中文问答基准的方式。

**(c) 依赖方 ↔ 被依赖方。** 第 39 条把「硬阈值 CRAP `< 10`」记在 `crapper` 名下、`>= 0.8` 记在 `dryer` 名下。两个数字都真实存在——
但存在于 `ub-mode` 的 `SKILL.md`（「Reduce each function under CRAP 10」）和它的 README 里。工具自己的默认值是
**30**（`crapper --threshold`）与 **0.82**（`dryer --threshold`），所以这两道关卡是 ub-mode 的*目标值*而非工具行为，
调用者不传数字就什么都没被强制。读者是在用技能自证技能——那是唯一不可能反驳的来源。**当某个产物的论点是「工具 X 强制执行规则 Y」，
这条断言需要 X 的页面，而不是依赖方的页面。**

**(d) 句子 ↔ 句子。** 第 43 条把 `"The panel is 120 Hz, and 120 frames a second has not been reached."` 作为一句引文发布。
两半都存在于那份测量文档里，但在不同位置、不同语法形态（setup 表格单元格 `1080 x 2400 at 120 Hz`，以及文档开头
`**120 frames a second has not been reached**: not on hakios-metal, not on metal2vulkan, and not on OpenGL ES.`）。
`quotation` 检查放过了它，因为它 grep 的是**片段**，而两个片段都在；把两个真实片段融合成一句是没有任何页面支持的断言，
而这恰恰是去空白与省略号规则让它*更容易*通过的那种形状。引文要么按来源位置拆开，要么这个引用就是从事实拼装出来的虚构。

**(e) 记录 ↔ 记录。** 第 41 条说 `cve@mitre.org`「与第 46 条里那个不相干的 OPNsense 记录在同一秒发布」。实测：
`CVE-2026-123033` 在 `07:17:26.207Z`，`CVE-2026-123025` 在 `07:17:25.897Z`——相差 **310 毫秒**，跨过了秒边界，
所以「同一秒」在让批量 CNA 的故事显得比分秒更紧凑的方向上是错的。两条记录之间的时长是两个亚秒时间戳的连接，
按天粒度读的读取器看不见；请引用那两个瞬时。

**而且墙是一个 (URL, TLS 客户端, 请求) 三元组——user-agent 字符串不是客户端。** `openai.com` 的 Images 2.6 文章对 `curl`
四次尝试都回 **403 加一个「Enable JavaScript and cookies to continue」页面**——其中包括使用 `doc-twin.mjs` 所用的同一个
Chrome 141 UA 字符串——而**用同一字符串的 Node `fetch` 返回 200 / 428,571 字节 / 8,662 字符正文**，两个方向各复现 2/2。
所以 2026-11-01 的 `--ua-census` 教训还需要多一个轴：两个发送**完全相同头**的客户端会不一致，因为它们的 TLS 指纹不同，
这意味着「我用浏览器 UA 重新探测了」仍可能是在描述探测器本身。实用形式：当某页面被引用来支撑引文而第一个客户端撞墙时，
换一个*运行时*（`node -e "fetch(...)"`），而不是换一个字符串；并且永远不要让单客户端的 403 变成「页面没这么说」。

→ [[security]] [[disclosure-lag]] [[frontier-models]] [[agent-plugins]]

## 2026-11-05 20:50（执行）—— 字段↔记录的连接有了执行器，而校准在日志之前先发现了护栏

20:29 批次里的缺陷 (a) 现在成了一条命令：`claim-unit-lint.mjs --check rangeabsent`（进入默认集，`--selftest` **268 → 285**）。它读取关于版本边界的**缺失**断言——「no fixed version」「states no affected range」「names no version」——绑定到它自己句子里的 CVE，然后对照记录可以声明范围的**两个**字段：CNA 容器的 `affected[]`（cveawg，不计费）与 NVD 的 `configurations`，再加 `references[]` 里的修复提交。不额外增加调用：NVD 那一次拉取和 `cnaState` 条目都是 `cvss`/`cwe` 已经付过的。

判定：`range-absent-but-served`（sev 3）· `range-only-in-cna`（sev 1，对 NVD 为真、对记录为假）· `range-in-references`（sev 1，无范围但有修复提交）· `range-absent-confirmed`（sev 0）· `range-unread`（sev 0——读不到永远不等于缺失）· `boundary-named-no-artifact`（sev 0）。

**双向校准才是可信的理由。** 对修正前的 `11-05` 文件（`git show HEAD:`）它恰好返回 **1 个 finding**——第 42 条的「No fixed version appears in the record」，而对上的 `affected[]` 里写着 `2.19.0 < 2.23.0`。对修正后的工作文件：**0 findings / 3 条提示**。这个检查是在**订正之后**才写的，所以唯一能证明它有效的方式，就是拿写错的那份文件去跑——只在修好的文本上校准过的检查，什么都没测到。

**四条护栏，其中三条是这次校准买来的：**

1. **关于注册表的断言不是关于记录的断言。** 修正后的句子以「there is still nothing to install」结尾，而这之所以为真，恰恰因为 `2.23.0` 不在 PyPI 上。把两套 cue 合在一起，会把修复本身变成 finding——那是检查器绝不能有的失效模式。所以 `INSTALL_ABSENT` 有独立判定，永不 sev 3。
2. **缺失断言是关于某个产物的。** 在 10-30/10-31 两天（93 条）上校准，第一版返回一条命中——10-31 第 38 条：「the affected and patched cells both read `latest`, so the advisory names no version boundary at all」，它对 GHSA 的单元格为真、对任何记录都不为假，而同一条目两句之前就写着「Fixed in 0.1.77」。记录类 cue 现在需要它自己句子里有记录类名词，而 `affected` 被**故意**排除（「the affected … CELLS」是公告的表格）。
3. **「…to install」决定这句话归哪个 cue。** ESP-IDF 的「anyone on the 6.x line has no version to install」经由 `has no version` 命中记录模式，对一条正确条目报了 sev 3；现在由匹配之后的尾巴决定。
4. **缺失与 `[]` 是两种状态**（`affected.key: absent|empty|populated`），即 `metrics: {}` 那一课挪一个字段——而一条没有 `versions[]` 的条目是一个**产品**、不是范围（Red Hat 的形态），这一点写在 detail 行里，而不是悄悄放过。

可迁移的规则：**当一条写下来的规则仍在复发，下一步不是把规则喊得更响，而是把它收得更窄。** 这个检查的好坏完全取决于它的 cue 词表，而上面每一条护栏，都是散文规则本会误报的句子。

→ [[disclosure-lag]] [[security]]


## 2026-11-06 12:30 —— 机制验证通过，**指称对象**没有

同一批次里有四条：机制对得上，而它所指的东西对不上。算术可复现、字段确实存在、钩子确实触发——这些都不构成"这条断言描述了产品"的证据。

**1. 一个完美向量，指向一个不可能这样被打的产品。** `CVE-2026-83844`（Windows 画图）带着 `CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:H/E:U/RL:O/RC:C`，算出来正好 **8.1** base、**7.1** temporal。一手核实每个数字住在哪：CNA 容器（`cveawg`，`assignerShortName: microsoft`）只有 `baseScore: 8.1`，**根本没有 `temporalScore` 字段**；NVD 把同一个 8.1 作为 `secure@microsoft.com` 的 `Secondary` 转存，且时间度量被剥掉。**7.1 只存在于微软的 CVRF**——`api.msrc.microsoft.com/cvrf/v3.0/document/2026-Oct`，一份 47.5 MB 的 XML，`<vuln:CVSSScoreSets><vuln:ScoreSet>` 里 `<BaseScore>8.1</BaseScore><TemporalScore>7.1</TemporalScore>` 与向量并列。所以"两者都由微软发布"**对 CVRF 为真**，对任何一个注册表产物都为假——同一句话的对错取决于你点名的是哪份文档。

指称问题独立于此，且上面这些都没回答它：CNA 描述写的是"Out-of-bounds read in Windows Paint allows an unauthorized attacker to execute code over a network"，而画图是一个不监听任何端口的桌面位图编辑器。**同一条记录里 CISA 的 ADP SSVC 写着 `Automatable: no`**，而厂商向量写着 `AV:N`/`UI:N`——两层富化在**同一条记录内部**对可达性意见相反，而这在各自的口径下都不算错。

**2. "记录没有给 KB"是关于**渠道**的断言，而 CVE 5.x 根本没有 remediations 字段。** 条目观察到记录没写服务、没写协议、没写 KB。前两条为真，第三条对**每一条** CVE 5.x 记录都为真——没有 `remediations` 字段可空。渠道在 CVRF 里：`<vuln:Remediation Type="Vendor Fix"><vuln:SubType>Store App</vuln:SubType>`，带 `<vuln:FixedBuild>11.2609.401.0</vuln:FixedBuild>` 和 `apps.microsoft.com` 链接。画图走的是 Store，所以没有 KB——"没有补丁星期二编号的修复"不等于"未修复"。

在同一份文档上普查（**3,488** 条唯一 CVE 条目）：**3,342** 带 `Vendor Fix`；`SubType` 除 **2** 条 `Store App` 与 **1** 条 `Click to Run` 外全是 `Security Update` 或 `Monthly Rollup`；**146** 条完全没有 remediation。所以画图的渠道是 **3,488 中的 2 条（0.06%）**——是真实形态，而且极其罕见，这与"没有 KB"这句话所诱导的读法正好相反。

**3. 我自己的度量本身就是缺陷，而且错了两次。** 第一版正则（条目内任意位置 `KB\d{6,}`）报出 **1,531** 条"以 build 号修复、无 KB"。KB 其实住在 `Release Notes` 类 remediation 的 `<vuln:SubType>`（如 `5127648`）或 URL 里，所以那 1,531 是我的模式计数。去掉纯数字 subtype、按 CVE 归组之后，才是上面的 2 / 1 / 146。同一份文件、同一分钟、两个不同结论，只有一个关于微软。

**4. "多线程进了 `liblz4`"对一个构建为真，对另一个静默为假。** v1.11.0 发布说明原文：`Multi-threading support is enabled by default in the dynamic library. The static library remains single-threaded by default, so that it doesn't require linking with -pthread: it still accepts nbWorkers, and produces the same output, with a single thread.` 静态构建**接受该字段并忽略它，且不报错**——假的那一侧没有任何信号，这正是它值得逐字引用而不是转述的原因。

**5. 一个检查错形状、并且自己说出来的缓解措施。** `cc-plugin-privacy` 的 README（2,680 字节，已核实）写着：`The test is two word matches over the whole input. There is no parser, on purpose`；`This is a courtesy, not a boundary, and it covers one shape`；以及它自己列的"仍会放行"清单里：`A web tool call. WebFetch and WebSearch are not checked, and neither are MCP tools.` 而报告（#107757）的泄漏方式正是**网页搜索**。它的关闭清单还包括 `A hook of an installed plugin, which sits above this one: on tool.check it may overrule the refusal.` 报告、缓解与绕过是三条不同的代码路径，而厂商把三条都写了下来。

**6. 修在了漏洞根本没用到的层。** `CVE-2026-61536`（`banks`，7.5，`GitHub_M`）：`CVE-2026-44209` 的修补是把 `Environment` 换成 `SandboxedEnvironment`，而活着的路径是 `_body_to_messages` → `Tool.import_path` → `importlib.import_module` + `getattr`。公告自己说明了为什么净化器救不了它——恶意 JSON `is plain text in the rendered template body — it requires no Jinja attribute access, so the sandbox is irrelevant.`

**可复用的检查。** 算术复现之后，问三个便宜问题：**(a) 这个数字由哪份产物发布**（CVRF / CNA 容器 / NVD 对同一个 bug 的回答不同）；**(b) 产品是否真的具备向量所假设的能力**（监听服务、UI、网络边界）；**(c) 缓解措施检查的机制是否等于报告点名的机制**。每条各一次抓取，三条都能抓住"可复现分数"会通过的形态。

**两个时钟，一次修复，你报的数字取决于你点名哪个产物。** `banks`：CVE 容器发布于 **2026-07-30T16:50:01Z**（NVD `published` 为 **07-30T19:18:34Z**），GHSA 的 `published_at` 是 **2026-11-05T17:51:02Z**——相差 98 天。修复（2.4.3，PyPI `2026-06-18T14:41:34Z`）因此比公告早 **140 天**、比记录早 **42 天**。两个都对；不带产物名的滞后数字两个都不是。

→ [[security]] [[vuln-supply]] [[disclosure-lag]] [[dev-tools]]

## 2026-11-06 12:34 —— 失败的请求不是关于注册表的断言，而清单是有**值**的

两处缺陷，都是读 lint 自己的输出而不是读 feed 发现的，而且是同一形状在两个层级上：**检查器报告了一个关于世界的事实，
而那其实是关于这次请求的事实。**

**1. 对一条存在的记录判了 `status-no-record`。** 12:22 那次运行的 JSON 带着两条判定：第 5 条「NVD carries no record for
`CVE-2026-73099`」（Apache Juneau），第 15 条对 `CVE-2026-104269`（ModSecurity）同样。两条记录都存在，两条状态断言都**正确**
——`Deferred` 与 `Received`，各用一次 `cveId` 调用确认——几分钟后原样重跑就返回 `ok`。机制在于：每次运行唯一的那次 NVD 拉取
是分块的（25 个 id），某个 chunk 抛异常会被捕获以便离线继续，于是下游每个检查都读到**空 map——与「记录真的不存在」时完全相同的
那个 map**。摘要里一直印着 `nvd_calls: 0`，那是唯一的痕迹，而没有人读它。修法是记录**哪些 chunk 有应答**：无应答的 chunk 产出
`nvd-unavailable`（「我读不到」），摘要打印有多少 id 根本没被读到。用把 `CLAIM_UNIT_NVD_BASE` 指向死主机的方式**双向校准**——
同一份 feed 返回 2 条 `nvd-unavailable` 而不是 2 条关于注册表的断言。这个钩子存在的唯一理由就是这个：一条只能被断言、从未被
跑过的失败路径，就是没人跑过的失败路径。

**2. 一段文字里有两条关于同一个字段的错误断言，却判了清白。** 04:19 批次第 6 条说 CNA 的十一条目**每一条**都是
`defaultStatus: affected`（记录实际是 **8 条 affected / 3 条 `crash` unaffected**），并把 `gdb-headless` 与 `gdb-gdbserver`
列为受影响包（**四条记录中 0 次出现**；真实清单是 `gdb`、`crash`、`gcc-toolset-14-gdb`、`gcc-toolset-15-gdb`）。lint 里
每个臂读的都是**缺失**或**范围**，**没有任何一个读清单**，所以两条断言都不可见——`rangeabsent` 臂打开过同一个容器，却只问了
有没有陈述范围。`--check affected` 现在对着那个臂已经在付账的 cveawg 容器测两件事，因此**不增加调用**：按 `defaultStatus`
统计的条目数，口径是**数组条目**（句子用的单位是「条目」，绝不是版本行），以及在声称这份清单的句子里出现的每个反引号包名，
要求它以 `packageName` 存在于该条目的任一记录中（发行版子包可能挂在句子没点名的产品线下，所以缺席必须是全记录级的）。

**四条护栏来自校准而不是设计，每一条都值得留下：**

- **`strip()` 会删掉反引号**，而包名恰恰就是反引号所标记的东西——第一版读的是剥离后的文本，一个候选都找不到。它自己的
  selftest 在首次运行时就抓到了，这正是「先钉住一个新臂再去相信它」的理由。
- **以 `**CVE-…**` 开头的段落永远不会开启新句。** `sentences()` 按 `[.!?]` 加空白切分，于是句首的 markdown 粗体吞掉了
  边界，上一段的 cue 够到了两个与清单毫无关系的反引号词——`gdbserver` 与 `hex2bin`，漏洞描述里点名的组件，**在修正后的条目上**
  被报成缺失包。修法是要求候选词自己所在的句子必须*声称*这份清单（出现直接的字段名，或出现一个容器已有的包名）；代价是
  「只写了编造包名的句子」会静默——这个代价是**故意**付的，而不是在一份正确的文件上重复误报。
- **`defaultStatus: affected on every one of its eleven entries` 与 `all eleven affected[] entries name a product` 是
  两个不同的断言**——前者数的是状态，后者说的是每条目都没有版本。只有模式里的状态词能把两者分开，而修正后的条目用的是后者。
- **`NUM_WORDS` 里缺了 `zero`。** 「eleven entries are affected and **zero** are not」什么都匹配不到——修正后的 feed 用读器
  解析不了的一个数词写出了它自己的更正。读这张表的两个臂本来就防着 0，所以补上它是补了一个缺口，而不是改了行为。

双向结果：**修正前**的文件返回 3 个 finding（计数加两个编造的包名），**修正后**的文件 0 findings / 2 条已验证。
`--selftest` **288 → 300**。

**一次说清两处缺陷的可复用规则：** 在发布任何「缺失」之前，先问**是什么在提问**——一次请求、一个 chunk、一个解析器、一个被
剥离过的字符串——以及**那个提问者是否可能失败**。`nvd_calls: 0` 一直在文件里；那两条清单断言所关于的容器也一直在。
两者都没被读，因为跑的那个检查不是这条断言需要的那个检查。

→ [[security]] [[vuln-supply]] [[disclosure-lag]]
