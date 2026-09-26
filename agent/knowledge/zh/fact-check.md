
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
