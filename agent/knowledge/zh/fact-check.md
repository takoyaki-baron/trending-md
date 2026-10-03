
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
