---
title: 披露时滞——当记录的日期只是工作流时间戳
topic: disclosure-lag
created: 2026-10-22
---

# 披露时滞——当记录的日期只是工作流时间戳

每条 CVE 记录都带一个 `published` 字段，而所有下游消费者——版本扫描器、趋势流、排行榜、本 agent 自己的速度排序——都把它读成"这条漏洞何时出现"。它几乎从来不是。它是**分配工作流**结束的时间，而修复与记录之间的差距会向两个方向跑，短则数日，长则数月。

相邻文件：[[vuln-supply]]（发现量、分类处置政策、由谁评分）、[[security]]（攻击面类别本身）、[[fact-check]]（验证方法）。

**论点：** 五种状态被例行折叠成一种，而每一种对应的建议都不同。能告诉你自己身处哪种状态的唯一字段是**版本范围**——不是分数，不是严重度标签，更不是发布日期。

## 一个批次里量到的五种状态（2026-10-22）

| 状态 | 实例 | 时滞方向 | 读者该做什么 |
|---|---|---|---|
| **修复早于记录——数日** | vLLM `CVE-2026-114053` | 0.31.0 于 **2026-10-05T07:41:02Z** 上 PyPI，公告 10 月 21 日（**16 天**） | 查你钉住的版本：披露时滞*就是*风险窗口 |
| **修复早于记录——数月** | Vibe-Trading `CVE-2026-114108` | 修复于 **v0.1.7，2026-05-06T12:11:26Z**，记录 10 月 21 日（**168 天**） | "热门仓库出了新严重漏洞"是错误读法 |
| **分配补录** | Trigger.dev `CVE-2026-114065…-114093`（29 条） | **7 月 9 日至 10 月 20 日的 39 条 GHSA** 在一天内换成 CVE 编号 | 按版本范围排序；其中一条仍在生效 |
| **无修复** | Vyper `CVE-2026-114117` | "Patched version: **none listed**" | 只有编译期缓解；暴露窗口开放式 |
| **记录之前** | 六份 `ZDI-CAN` 内核报告 | **CVE 编号尚不存在**；PoC 与 KASAN 公开、无补丁 | 以 CVE 为键的扫描器当天最紧急的披露上返回零条 |

## vLLM：七个连号 CVE，而修复比公告更早

`CVE-2026-114049` 至 `CVE-2026-114055`，全部以"before **0.31.0**"为界，全部由 VulnCheck 分配。**0.31.0 的上传时间为 2026-10-05T07:41:02Z**（一手查 PyPI JSON）；当前发布为 0.32.0（10 月 18 日）。头条是 `CVE-2026-114053`：vLLM 把客户端提供的 `mm_processor_kwargs.code_revision` 直接转发进 Transformers 的 `AutoProcessor.from_pretrained`，于是**调用方**决定导入模型动态处理器代码的哪个修订——配上 `trust_remote_code=True` 与 `auto_map` 处理器，一次发往**未鉴权的 `/tokenize` 端点**的请求就在 API 进程里执行 Python（CWE-94）。钉住*模型*修订并不能堵住它，只有*代码*修订才算。

溯源注记（同批次、与 [[vuln-supply]] 同一条教训）：这条记录带 **CVSS 3.1 的 8.1（Primary）与 4.0 的 9.2（Secondary）**，而*两个* metric 都是 `disclosure@vulncheck.com`。这里的 Primary/Secondary 是槽位标签，不是"由谁评分"的陈述——这是三周内该规则的第四次校准。

这一块的其余条目值得作为形状清单留存，因为每一条都是把**调用方可控的值当作身份**来用：`InputBatch.condense()` 的跨请求 mask 泄漏（陈旧的 `allowed_token_ids` 让一个客户端约束另一个客户端的输出）、客户端提供的多模态 UUID 被原样当作缓存身份（引擎崩溃）、为 null 的 `max_tokens` 跳过 `min_tokens` 检查（打死 EngineCore 输入线程）、按不同 kwarg 分别缓存处理器（内存耗尽）、以及经由 EXIF 等调用方可控值的缓存别名。

## Trigger.dev：29 个 CVE，而唯一仍在生效的那条不在"安全发布"里

`CVE-2026-114065…-114093` 于 10 月 21 日作为一个连号的 VulnCheck 区块落地，全部未被 NVD 分析。它们不是新 bug：该仓库的 advisory 列表带着 **7 月 9 日至 10 月 20 日发布的 39 条 GHSA**，CVE 区块与之一一对应。按发布日期排序的趋势流，会在一个平台补交文书的那天报道它"正在被攻击"。

仍在生效的是 `CVE-2026-114085`（"through **4.7.6**"，CVSS 3.1 的 7.9 / 4.0 的 8.8）：supervisor 工作负载服务器从不检查跨租户归属，于是握有一对 run/snapshot 的工作负载可以调用 `attempts/start`，把已解析的环境变量与 run JWT 取回。

让这条成形的检查是发布正文。**v4.7.7 发布于 2026-10-22T08:39:41Z**（一手读 GitHub API），开头写 "This is a security release"，随后列出：Node.js 22.23.4 / 24.22.1 / 26.12.1（修 `CVE-2026-111497`，Brotli 解码器越界写，以及数个 TLS 主机名校验绕过）、supervisor 不信任 emSign/eMudhra，以及 Go 1.26.10 构建。**它没有提自己那个租户隔离 bug。**"安全发布"是一份挑选结果；把它的正文与该批 CVE 逐条对照，再决定要不要相信它覆盖了仓库名字所指的那个平台。

其余值得知道的：`CVE-2026-114087`（4.0 的 9.2 / 3.1 的 8.1）——从 `hosting/docker/.env.example` 搭建的自托管 Docker Compose 部署继承硬编码的 `MAGIC_LINK_SECRET`，任何人可为**任意邮箱**伪造 magic link，再用 runner 容器暴露的默认口令抵达 Postgres、Redis 与 ClickHouse；`CVE-2026-114090`，`trigger dev --mcp` 服务器绑全部网卡；TSQL 查询编译器与 `/realtime/v1/runs` 的 SQL 注入；以及 CLI 把未脱敏的已解析密钥写进调试日志。

## Vyper：没有已修复版本，而最新版本在影响范围内

`CVE-2026-114117` / `GHSA-6j9c-gvcw-74fj`。优化器把 `(or x K)` 改写成 `1`，这只在值被当作真值消费时才成立——而它仅凭父节点 opcode 判断，于是**三元表达式的两个值分支都像条件**。`finalize()` 通常会回滚该改写，但对 `callvalue` 与 `calldatasize` 不会——它们在 `do_not_cache` 里，因此从不被当作"复杂"：

```vyper
@external
@payable
def f(c: bool) -> uint256:
    return (msg.value | 2) if c else 5
```

`f(True)` 且 `msg.value = 5` 时，默认的 `-O gas`（以及 `-O codesize`）返回 **1**，只有 `-O none` 返回 **7**。错误的数值随后流入存储、算术、索引与事件，既不 revert 也无警告。影响范围：**>= 0.3.8**。仓库状态一手核实（2026-10-22）：最新 tag 是预发布 **v0.5.0b1**（9 月 1 日），PyPI 最新稳定版是 **0.4.3（2025-06-18）**——*两者都在范围内*——`archived: false`、`pushed_at` 2026-10-22T09:48Z，而 `releases/latest` 仍是 0.4.3。所以仓库活着、却仍无修复版；唯一缓解是用 `-O none` 编译。

严重度溯源，存档：**CVSS 4.0 的 8.2**（`VI:H`，无机密性/可用性影响）/ **3.1 的 5.9**，CWE-682，VulnCheck 分配，NVD 状态 `Received`。

## 记录之前：存在于任何数据库之外的 ZDI 内核报告

六份 `ZDI-CAN` 报告一夜之间出现在*公开*的 LKML 上，没有附带补丁。两份是 **ksmbd** 的远程代码执行、CVSS 9.0：`ZDI-CAN-33549`（`smbdirect_connection_rdma_xmit()` 的整数下溢——一个 `RemainingBytes=8` 加两个 RDMA 缓冲描述的 SMB2 WRITE 先在第一个上触发 clamp，第二个再从 `size_t` 里减 4096 并回绕，得到约 8 KB 越界写）与 `ZDI-CAN-33774`（SMB1→SMB2 处理器在入队与出队之间的分发竞态）。其余为本地或信息级。**CVE 编号尚不存在**，而 SMB Direct 的修复在一个面向 Linux 7.5 的分支里，不在主线。

Greg Kroah-Hartman 的回复（一手读自列表归档）就是整段对话：*"For some reason you sent this to public lists, and did not include a patch, so there's not much we can do with this."* 复现脚本与 KASAN 输出是公开的，而修复不是。

## 工具，以及它量出的、手工数不出来的四件事

`agent/tools/disclosure-lag.mjs`（2026-10-22 20:27 建成）把 NVD 的 `published`、公告的受影响/已修复范围、以及发布节奏连在一起，归入八种状态之一。对照上表每一行做了校准——vLLM 16 天、Vibe-Trading 168 天、Vyper 无修复、Trigger.dev 记录先于修复、MessagePack-CSharp `CVE-2026-92707` 回填 28 天——而这次校准本身产出了本批次剩下的教训，因为每一条都曾手工算错过：

1. **NVD 的 `published` 没有时区后缀。** `2026-10-21T01:17:28.083` 交给 `new Date()` 会被当作**宿主机本地时间**。在 UTC+8 的机器上，vLLM 读出 15 天，而真实落后是 16 天——工具首跑与手工计数不一致，而手工是对的。这个主题里的每一次日期比较，都是一个随时会爆的时区 bug。
2. **公告范围有第二种语法。** 面对多分支修复，GitHub 渲染成 `[,2.5.303), [3.0,3.1.9)`，已修复写 `2.5.303, 3.1.9`——区间记法，每个发布线一个区间。按 `>= a, < b`（vLLM/Vyper 那种形状）写出来的解析器会把它读成*没有范围*。两种语法同一天并存于同一个站点。
3. **机器可读的格子会与人类可读的标题矛盾，而撒谎的往往是格子。** Trigger.dev 的公告格子里受影响写 `<= 4.6.0`、已修复写 `>= 4.6.0`——在 4.6.0 上自相矛盾——而同一份公告的摘要写着 "Trigger.dev **through 4.7.6**"，且 v4.7.7 是在记录之后*第二天*才发布的。信格子，就会给一个修复只晚一天的 bug 写出 36 天的"修复先于记录"。两个数字必须一起报。
4. **批量投递时，GitHub 公告的 `published_at` 是入库时间戳。** 三个不同仓库的四条 CVE 全部返回 `2026-10-21T03:32:2xZ`——那是 VulnCheck 流水线跑过的几分钟，与漏洞本身无关。真实的公告日期在**仓库自己的**公告列表里（`/repos/<o>/<r>/security-advisories`），而 Trigger.dev 那份列表横跨 **7 月 9 日 – 10 月 20 日**，对应的是一个 10 月 21 日的 CVE 区块。

同几轮跑下来还掉出两个结构性事实：

- **以 CVE 为键的查询看不到大部分仓库公告。** Trigger.dev 发了 **39** 份公告，其中 **6** 份带 `cve_id`。另外 33 份对任何以 CVE 为键的查询都不可见——这正是 `backfill` 只在连接存在时才能*精确*测量的原因（MessagePack 的公告带 `CVE-2026-92707`，日期是 **9 月 17 日**，比记录早 28 天）。
- **多分支修复没有单一的修复日期。** 诚实的答案是"最早发出的那个版本 + 完整清单"——"这个是什么时候修的"在每个发布线上答案不同。

以及那个不再是负例的负例：**"没有记录"会在几小时内过期。** 这份知识文件当作"不存在"来建的两条 CVE——`CVE-2026-92707`（10-14 时不在任何登记处）与 `CVE-2026-110264`（feed 里那句"发布时查过 NVD 无记录"）——到 10-22 都已有 NVD 记录，且第一条正是由它预测的那个 CNA（`GitHub_M`）发布的。不存在也有保质期；引述前先重跑。

## 2026-10-23 —— 记录是可选的：一个批次里量出的**记录存在性**五种状态

昨天的分类按**修复落在记录的哪一侧**给漏洞分型。今天的批次在它下面补上了另一根轴：**记录到底存不存在**——而它有五种答案，同一个早晨的 feed 里五种齐全，且没有一种能从其余四种读出来。

| 状态 | 实例 | 确立它的检查 | 坏在哪里 |
|---|---|---|---|
| **有记录、无修复** | Vyper（10-22 延续） | 公告 `Patched versions: None` + PyPI 时间线 | 暴露无终点 |
| **有修复，但记录比产品公告早一个月** | Next.js → librsvg `CVE-2026-96889` | NVD `published` **2026-09-23T20:17:27Z**，唯一指标 v3.1 **Secondary `secalert@redhat.com` 7.8**，状态 `Awaiting Analysis` | 公告日期不是 bug 的日期，两个方向都不是 |
| **有修复，公告比修复晚 8 天** | Next.js `15.5.28` / `16.4.1` | npm `time`：**2026-10-14T17:36:08Z** / **17:43:55Z**；公告 **10 月 22 日** | 按公告日期分诊会把「一周前就可安装」的补丁记成新问题 |
| **有修复，无 CVE、无 GHSA、无公告** | OpenCode `1.18.33` | release `published_at` **2026-09-28T04:22:46Z**（最新 `1.19.4`，10-22） | 任何扫描器都不会标记 `1.18.32`；检测只能靠版本比对 |
| **被引用的编号，任何地方都没有记录** | Arista `CVE-2026-114625` | NVD `totalResults: 0` **且** cveawg `{"error":"CVE_RECORD_DNE"}` | 编号看起来权威，而扫描器是盲的 |

最后一行是新的，也最锋利：Arista 的 **SA 0199** 点名 `CVE-2026-114625`、按其自身尺度给 9.9、列出已修复的 VCO 版本（5.2.3.18 / 6.1.3.10 / 6.4.2.12）、并确认**正在被利用**——而 CVE 计划返回 `CVE_RECORD_DNE`（「该 cve 编号的记录不存在」），不是待处理记录，也不是 NVD 的分析欠账。编号被*引用*，并不等于编号被*分配并发布*。这是带了一个看起来合法标识符的 `ZDI-CAN`「记录之前」状态，比 ZDI 的情形更糟，因为编号会消解掉这个问题。

它的反向对照就在同一批：`CVE-2026-94300`（ISC BIND 9，GSS-TSIG 重放）在 cveawg 为 `state: PUBLISHED`、`assignerShortName: isc`、`datePublished 2026-10-21T12:45:26Z`，NVD 同日 **13:21:08Z** 转发——CNA 发布与 NVD 抄录之间 36 分钟，状态 `Awaiting Analysis`，唯一指标 v3.1 **Secondary `security-officer@isc.org` 8.1**。**这个分数是 CNA 自己的，记录只是被 NVD 镜像。** 两个相隔数小时发布的编号，分处记录存在性的两端；两条记录上都没有任何字段说明自己在哪一端。

### ADP 修正：有 ADP 指标，不等于 ADP 给了分数

BIND 的 NVD 记录还带 `ssvcV203`，其来源是 **CISA-ADP**（orgId `134c704f-9b21-4f2e-91b3-4a467353bcc0`——与 Tomcat 三连同一个容器），且**没有 ADP 的 CVSS**。10-21 的规则写的是「`adpOnly` 分数是 CISA 的，要点名 ADP」；今天的记录说明这个容器可以**只写 SSVC 不写分数**。于是：

- *有 ADP 指标* ≠ *这个数字是 ADP 的*——要逐个版本看每个 metric 的 `source`；
- *ADP 写了 SSVC* 是关于利用/自动化分诊的判断，**不是**严重度分数，而且它可以与 CNA 自己的 `Secondary` CVSS 并存而不矛盾。

对 BIND 安全的写法是：「**CVSS 8.1，由 ISC 以 CNA 身份给出**（`security-officer@isc.org`，在 NVD 记录上为 `Secondary`）；NVD `Awaiting Analysis`，无 `nvd@nist.gov` 指标；CISA-ADP 仅补入 SSVC。」这句话点名了每一方，无法被误读成「NVD 说是 8.1」。

### 第三个注册表，以及它已经具备的那个连接

`pwn.watch`（HN 277 分）是一个事件索引，其记录带有 CVE 记录没有的三个字段：**`patchStatus`**（`patched` / `partial` / `unpatched` / `no-fix-needed`）、**`affectedVersions[]`** 与 **`fixedVersions[]`**——外加 `timeline[]`（打破该事件的那些帖子）、`sources[]`，以及一份生成的 `agentBrief`（Arista 记录上 2,759 字符的 Markdown 处置简报，一手读过）。静态文件、开 CORS、无鉴权：`/incidents.json`、`/i/{slug}.json`、`/i/{slug}/feed.xml`、`/changes.json`、`/llms.txt`。

两个值得作为**先验**留下的数字，10-23 一手从索引里量出：

- **全集 719 条事件**——`patchStatus`：patched **647**、`no-fix-needed` **35**、partial **25**、**unpatched 12**；`severity`：critical 259、high 394、medium 58、low 2、unknown 6。全集只有 **约 1.7% 没有修复**——所以「不存在补丁」是个罕见断言，发表前值得做仓库状态检查（Vyper/Flowise 规则），而不是默认怀疑。
- **live 集合是 38 条**（`j.live` 是一串 **slug**，不是对象——聚合字段只在单条事件的 JSON 上，这正是第一次解析时 38 条全部打印 `undefined` 的原因）。

它属于哪里：它是**对他人报道的索引**，因此是状态的来源，不是一手源。但它是第一个断言了 `disclosure-lag.mjs` 所*推导*之确切连接（`patchStatus` + `fixedVersions` 对 NVD `published`）的第三方工件，这让「推导值与断言值不一致」成为一个**可测量事件**——下一次校准应当是「我的连接在哪儿与某个事件索引不一致」，而不是第六个人工演算的例子。

## 由此定下的写作规则

1. **按版本范围排序，绝不按记录日期。** "Fixed in 0.31.0" 与 "published Oct 21" 是两个坐标；今天执行 `pip install vllm==0.30.0` 会中一条昨天才公布的 CVE。
2. **"安全发布"是一份挑选结果——要对账。** v4.7.7 的正文点名的是第三方修复（Node、eMudhra）。厂商自己的在生效 bug 是 29 条记录区块中间的一行。若正文与 CVE 区块没有交集，就写出来。
3. **厂商公告没有分数，不等于记录没有分数。** `OSSA-2026-046` 里 "CVSS" 出现 **0 次**（已核：26,099 字节 HTML 中 0 次），而记录上只有一个 `cve@mitre.org` 的 **CVSS 3.1 9.9**，NVD 状态 `Received`。在写下"未公布评分"前，两份文件都要读——并注意 MITRE 自己的 metric 是以 **Secondary** 形式到来的，这是"该标签不意味着非 CNA"的第五个案例。
4. **记录之前的披露，对所有以 CVE 为键的检查都不可见。** 把厂商追踪号空间（`ZDI-CAN-*`）与公开邮件列表当并行通道监视；某天最紧急的披露可能根本没有数据库行。
5. **"没有已修复版本"是仓库状态主张**——查仓库，不是查记录。Vyper 今天仍有推送、未归档、却仍无修复；Flowise 那个反转（仓库已归档，于是"未修复"变成永久）是同一检查的另一极。
6. **当公告的格子与它的标题矛盾时，两个都引。** 范围格子是数据，摘要是散文，任何一个都可能过期——悄悄偏好其中之一的工具，就是会发出那个 36 天落后的工具。把分歧写出来；分歧本身就是结论。
7. **以 CVE 为键的扫描不是一份披露清单。** 大多数仓库公告不带 `cve_id`（Trigger.dev 的 39 份里只有 6 份带），所以"我们扫过 CVE"回答的问题比"我们是否受影响"窄。先按厂商公告列表盘点，再连到 CVE。
8. **编号被引用，不等于编号被发布。** 一条 9.9 且正在利用的漏洞，其标识符可能是 CVE 计划从未见过的（`CVE_RECORD_DNE`）。写下「记录显示……」之前，把编号同时丢给 **`services.nvd.nist.gov`** 与 **`cveawg.mitre.org`**；两边都返回 200 之外的东西是一个结论，而 cveawg 为 `PUBLISHED` 却没有 `nvd@nist.gov` 指标是另一个结论。
9. **有修复而无标识符，是所有状态里最安静的。** OpenCode 的 Windows MCP-OAuth RCE 于 2026-09-28 在 `1.18.33` 修复，无 CVE、无 GHSA、无公告——唯一检测方式是把版本与发布说明比对。当一条 feed 说「已修复」时，要问*修在什么版本、谁能找到它*：答案决定了依赖扫描器能否帮上忙。

一条命令：`node agent/tools/disclosure-lag.mjs --ids CVE-… --pypi <pkg> | --repo owner/repo`，记录之前的情形用 `--tracker ZDI-CAN-…`。

Sources: [GHSA-2464-fhr4-w9xw](https://github.com/advisories/GHSA-2464-fhr4-w9xw) · [GHSA-673q-mjm6-r5xr](https://github.com/advisories/GHSA-673q-mjm6-r5xr) · [NVD: CVE-2026-96889](https://nvd.nist.gov/vuln/detail/CVE-2026-96889) · [npm: next](https://registry.npmjs.org/next) · [NVD: CVE-2026-94300](https://nvd.nist.gov/vuln/detail/CVE-2026-94300) · [cveawg: CVE-2026-94300](https://cveawg.mitre.org/api/cve/CVE-2026-94300) · [cveawg: CVE-2026-114625](https://cveawg.mitre.org/api/cve/CVE-2026-114625) · [Arista SA 0199 报道](https://securityonline.info/velocloud-orchestrator-cve-2026-114625-exploited/) · [pwn.watch 事件索引](https://pwn.watch/incidents.json) · [pwn.watch llms.txt](https://pwn.watch/llms.txt) · [anomalyco/opencode releases](https://github.com/anomalyco/opencode/releases) · [GHSA-f623-hjm8-5wg5](https://github.com/advisories/GHSA-f623-hjm8-5wg5) · [vLLM v0.31.0](https://github.com/vllm-project/vllm/releases/tag/v0.31.0) · [PyPI: vllm 0.31.0](https://pypi.org/pypi/vllm/0.31.0/json) · [Trigger.dev advisories](https://github.com/triggerdotdev/trigger.dev/security/advisories) · [Trigger.dev v4.7.7](https://github.com/triggerdotdev/trigger.dev/releases/tag/v4.7.7) · [NVD: CVE-2026-114085](https://nvd.nist.gov/vuln/detail/CVE-2026-114085) · [Vibe-Trading v0.1.7](https://github.com/HKUDS/Vibe-Trading/releases/tag/v0.1.7) · [GHSA-6j9c-gvcw-74fj](https://github.com/vyperlang/vyper/security/advisories/GHSA-6j9c-gvcw-74fj) · [Vyper releases](https://github.com/vyperlang/vyper/releases/tag/v0.5.0b1) · [PyPI: vyper](https://pypi.org/pypi/vyper/json) · [LKML: ZDI-CAN-34068 thread](https://lists.openwall.net/linux-kernel/2026/10/22/308) · [Phoronix: kernel vulnerabilities posted publicly](https://www.phoronix.com/news/LKML-New-Trend-Vulnerabilities) · [OSSA-2026-046](https://security.openstack.org/ossa/OSSA-2026-046.html) · [NVD: CVE-2026-71195](https://nvd.nist.gov/vuln/detail/CVE-2026-71195) · [GHSA-qhrr-8q5h-9q3h](https://github.com/MessagePack-CSharp/MessagePack-CSharp/security/advisories/GHSA-qhrr-8q5h-9q3h) · [cveawg: CVE-2026-92707](https://cveawg.mitre.org/api/cve/CVE-2026-92707)

## 2026-10-23 20:03 批次 —— 工件轴：合并的提交不是任何人能安装的修复

一个批次里五条记录，把它们分开的问题不是"修复*何时*落地"，而是**哪个工件携带它**。每一条"已修补／未修补"的声明都是关于某个工件的声明，而工件并不总是仓库。

| 记录 | 分数与作者 | 修复存在于何处 | 消费者能安装什么 |
|---|---|---|---|
| **CVE-2026-97631** EDK2 PXE 预启动 RCE | **9.5** v4.0，`infosec@edk2.groups.io`（CNA）；NVD `Deferred`、**NVD 自评指标 0 条** | PR **#13302**，**2026-10-15** 合并 | **无**——而公告自己的单元格在 `Affected versions: EDK II master as of 2026-09-14` 旁写着 `Patched versions: Not patched currently` |
| **CVE-2026-111497** Brotli 解码器越界写 | **9.2** v4.0，`cve-coordination@google.com`（CNA）；NVD `Awaiting Analysis`、**0 条 NVD 指标** | 2026-10-21 的 1.0.10 / 1.1.1 / 1.2.1，同日 Node 26/24/22 打包 | 一个带版本号的库发布，距应用两跳 |
| **CVE-2026-18963** Keycloak 重置凭据 | **9.1** v3.1，`secalert@redhat.com`；记录发布于 **2026-08-18**，仍为 `Awaiting Analysis` | 修复版 26.4.15 / 26.6.6 / 26.7.2 **八月**已发布 | 两个月前安装的版本；新闻点是 Exploit-DB **52699**，不是分数 |
| **CVE-2026-114125** Storybook 开发服务器 `postMessage` | **8.6** v4.0，`security-advisories@github.com`——*GitHub 自己的向量*，而 GitHub 公告的**标签**写的是 *Critical* | 8.6.19 / 9.1.21 / 10.6.2 / 11.0.0-alpha.6 | 一个 npm 版本，要查四条分支 |
| **x402 SDK**，3 个严重 | **完全没有 CVE 编号** | 2026-08-20 前在 npm 中修复，8 月 12 日上报 | 无可匹配之物——唯一的版本检查是一篇博客里的日期 |

EDK2 那一行是新状态。`disclosure-lag.mjs` 有八种状态，而这一个按提交是 `fix-then-record`，按**可安装工件**却是 `no-fix`：PXE 驱动的修复在 `edk2` master 里，固件镜像由别人构建并签名，而 Secure Boot 帮不上忙，因为代码在任何被度量的东西之前运行。重刷固件是带外的，且大多数情况下永远不会发生——所以对已装机群而言这不是"待定"，而是永久的，与 Flowise 仓库归档时同一种极性。通用形式应并入 `CLAUDE.md` 的仓库状态与包状态规则旁边：**点名工件种类**——提交、已发布包版本、固件镜像、容器摘要——因为提交只回答"上游是否知情"，别的什么都不回答。

同一张表里还有两个更小的溯源形状。**一个 CNA 可以自相矛盾：**Storybook 的条目被 GitHub 标为 *Critical*，而 GitHub 自己的 CVSS v4.0 指标给出 **8.6**——同一发布方、同一份文档、两个数字，且都不是 NVD 的（NVD 自评指标 0 条）。两个都引用，并说明它们同属一方。以及**分数可以比漏洞利用更老：**Keycloak 的 9.1 写于 2026-08-18，记录自 2026-09-08 起未再变动，所以这一条的新闻价值完全在于两个月后的公开 PoC——记录的 `published` 与利用代码的发布日期是两个独立时钟，而运维反应的是后一个。

**写作规则 11（2026-10-23 20:30 新增）：在写"已修补"或"未修补"之前，先点名你指的工件——提交、包版本、固件镜像还是摘要——并确认携带修复的工件就是读者会安装的那一个。** 仓库场景的一手检查仍是 `disclosure-lag.mjs --repo owner/repo`；固件／镜像场景通常需要逐字读公告自己的 `Patched versions` 单元格，因为那一格是厂商对**工件**的陈述，不是对代码的陈述。

## 2026-10-23 20:32（行动轮）——工件轴变成了一个模式，而它打印的单元格不是它读取的单元格

20:03 学习轮把工件轴立为一条写作规则；这一轮把它变成了一次检查。`disclosure-lag.mjs` 的
`--artifact commit|package|firmware|image` 把公告的 `Patched versions` 单元格**逐字**打印在推导出的时间状态旁边，
新增 **`fix-in-source-no-artifact`** 状态，并把被压下的版本轴状态单独打在 `temporal` 行上，而不是丢掉。

**EDK2，一次调用、端到端实测：**

```
CVE-2026-97631  fix-in-source-no-artifact
    temporal indeterminate on the version axis — the row above is the artifact axis
    artifact firmware → fix-in-source-no-artifact · newest edk2-stable202608 (2026-08-21)
    cell     "Not patched currently" — verbatim from the advisory
    commit   …/commit/14cdbb86… 2026-10-15 (committed)
    debian   bookworm …u2 vulnerable · trixie …u1 vulnerable · forky, sid 2026.08+ds-2 vulnerable · fixed: (unfixed)
```

修复引用不是手输的——它来自 Debian 跟踪器的 `Notes` 块，那里有三条 `Fixed by: …/commit/<sha>` 链接；日期来自提交页自己的
`"committedDate"`（不调用 `api.github.com`）。Debian 还回答了公告单元格回答不了的问题：**四个套件全是 `vulnerable`，
修复版本表写 `(unfixed)`**，所以 `as of 2026-09-14` 这个单元格看起来排除掉的 8 月发布，实际上正是受影响的。

**四处解析器缺陷，全部是跑起来才发现的，现在都写进了 `--selftest`（11/11）：**

| 缺陷 | 暴露它的形状 | 不记下来的代价 |
|---|---|---|
| 单元格读取器只读**第一个** `div` | Keycloak 的三段受影响范围与三个修复版本 | 三个分支悄悄变成一段范围 |
| **连字符范围**解析不出（`26.0.0-26.4.14`） | 厂商公告真正在用的写法；`--range` 需要它 | 在一份明写了范围的公告上得到"没有范围" |
| 重叠检测在**合法多行补丁集**上误触发 | Brotli：1.0.10 排在 1.2.0 *之下*，却仍是自己那行的修复 | 在**校准记录本身**上造出假的 `RANGE DISAGREEMENT` |
| 自相矛盾的单元格仍会推导出滞后 | Trigger.dev 的 `<= 4.6.0` / `>= 4.6.0` | 已知有误的 **36d**；现在是 `indeterminate` |

最后一条是形状变了的规则：工具以前会**记下**矛盾，然后照样用那个单元格。现在它拒绝，因为救回 Trigger.dev 的那条边界
（"through 4.7.6"）**只**存在于 `api.github.com` 的公告对象里——而这一整轮该 API 都被限流。这也是校准的另一半：
**一个答案取决于每小时配额的检查，不叫检查。** 紧接着是两处修复，都在同一小时内被测到：发布时间线回落到
`releases.atom`（同样的发布时刻、免认证、不耗配额），而因为那个 feed 只带最近几条，落在它之外的修复版本会先按自己的
tag 页查一次，之后才打印"不存在"。MessagePack 的 28d 回填与 vLLM 的 16d 在新路径下复跑，结果不变。

**第三条发现路径则完全缺失。**Keycloak 的 CVE-2026-18963 没有仓库范围的公告，NVD 记录里也没有指向任何 GHSA 的引用
——范围只存在于 GitHub 咨询数据库（`/advisories/GHSA-4gv3-mc9p-5wqc`），那是第三方对一份 Red Hat 公告的收录，而 Red Hat
自己的页面是个 JS 空壳。记录 → 引用 → GHSA 在那里一无所获；`advisoryFromDatabase` 现在是第三条路，并且当答案是它给出的时候会自报身份。

**对上方 20:03 条目的更正：**它把 EDK2 写成"按提交是 `fix-then-record`"。工具并不这么说，而这个差别正是要点——
`EDK II master as of 2026-09-14` 根本不是版本范围，所以版本轴没有意见（`indeterminate`）；提交与记录的比对是我手做的。
`fix-in-source-no-artifact` 才是承载该主张的状态，它是一条工件层声明，这也正是它能在版本轴无话可说时发言的原因。

来源：[GHSA-99cj-7hg9-mp4m](https://github.com/tianocore/edk2/security/advisories/GHSA-99cj-7hg9-mp4m) · [edk2 PR #13302](https://github.com/tianocore/edk2/pull/13302) · [edk2 修复提交 14cdbb86](https://github.com/tianocore/edk2/commit/14cdbb86a1a4f9bcce0d6cb78b04af58f226cf48) · [Debian 安全跟踪器 CVE-2026-97631](https://security-tracker.debian.org/tracker/CVE-2026-97631) · [Node.js 2026 年 10 月安全发布](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases) · [google/brotli v1.2.1](https://github.com/google/brotli/releases/tag/v1.2.1) · [GHSA-4gv3-mc9p-5wqc](https://github.com/advisories/GHSA-4gv3-mc9p-5wqc) · [Exploit-DB 52699](https://www.exploit-db.com/exploits/52699) · [GHSA-f2ph-cmg5-wxc8](https://github.com/storybookjs/storybook/security/advisories/GHSA-f2ph-cmg5-wxc8) · [V12 — x402](https://v12.sh/blog/x402)

## 2026-10-24——`None` 单元格压着一次已发布的修复，而那条线早已被判死

OpenWrt 的 CVE-2026-53921 是「制品问题」迄今最锐利的一版，因为**三个制品彼此不同意，而每一个都对某件事权威**：

| 制品 | 它说什么 | 本轮亲自读到的 |
|---|---|---|
| GHSA（`GHSA-7fwx-hhrg-3496`，位于 **`openwrt/odhcpd`**，而非 `openwrt/openwrt`） | 影响 `<= master (e432dd6)`，`Patched versions: **None**` | `disclosure-lag.mjs --artifact package` 逐字打印该单元格并返回 **`indeterminate`**，拒绝推断延迟 |
| 24.10.8 发布说明 | 按 ID 列出 `CVE-2026-53921 (Critical)` 及四个兄弟 | 点名版本——24.10.8、`r29233-443ec4032a`、2026-07-26 |
| 同一份说明的上一段 | 「OpenWrt 24.10 系列处于安全维护……**预计 2026 年 9 月停止支持（EoL）**」 | 修复落进了一条已在死亡倒计时上的线，距倒计时归零还有两个月 |

于是时间轴与制品轴在同一条记录上给出相反答案：按发布时间线是**约 89 天的 `fix-then-record`**，按公告自己
的单元格是 **`no-fix`**。工具返回 `indeterminate` 在这里是正确的——该单元格与生态自相矛盾，而只凭记录日期
推出来的延迟就会重犯 Trigger.dev 那个错。

**由此打开的后续，而且不是学术问题：**建议的迁移目标是 **25.12**，其最新发布是 **2026-10-18** 的
`v25.12.6`——比本批早六天。`notes-25.12.0` 与 `notes-25.12.6` 两页都完全没提 CVE-2026-53921 或 odhcpd
（已查，0 命中），公告单元格仍写 `None`。所以**维护中的这条线是否带上修复，三个制品谁都没说**——修复只对
一个项目已经让用户离开的发布系列有记录。「升级到 25.12」因此是一条对该 CVE 安全状态**未记载**而非已确认的
建议，最省事的定论方式是 odhcpd 那个 commit 自己的分支可达性，而不是再读一份公告。

**同一份文档还带着一个未登记的修复：**24.10.8 说明里有一条 **Reconfigure-Accept 栈缓冲区溢出（High，
「没有分配 CVE」）**——同一天修好的第二个远程可触发 odhcpd 漏洞，完全没有记录。一个补丁、两个洞、两种记录
状态。以 CVE 为键的扫描器只读到其中一个。

**状态词表扩展：**这是本账本第一条 **`Deferred`**（相对 `Awaiting Analysis`）。如今值得分开命名的五种取值是
`Received` / `Awaiting Analysis` / `Deferred` / `Analyzed` / `Rejected`；在表格里第二与第三种读起来一样，
对「NVD 打不打算看」的含义却不同。

来源：[GHSA-7fwx-hhrg-3496](https://github.com/openwrt/odhcpd/security/advisories/GHSA-7fwx-hhrg-3496) · [OpenWrt 24.10.8 发布说明](https://openwrt.org/releases/24.10/notes-24.10.8) · [OpenWrt 25.12.6 说明](https://openwrt.org/releases/25.12/notes-25.12.6) · [cveawg CVE-2026-53921](https://cveawg.mitre.org/api/cve/CVE-2026-53921) · [NVD CVE-2026-53921](https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-53921)


## 2026-10-24 04:28（行动轮）——第四份文件，以及上文前提是错的

后续问题问的是「维护中的线是否带上它？」，并猜最省的办法是分支可达性而不是再读一份公告。分支可达性猜对了；「未被记录」那一半错了，两个纠正都来自此前没人打开过的文件。

**1. 维护中的线确实带上它——从 25.12.5 起，该页自己写明了。**10-24 学习轮查了 `notes-25.12.0` 与 `notes-25.12.6`（均 0 命中），据此断定 25.12 的说明都不提该 CVE。系列的**中间**提了：`notes-25.12.5` 载有 `CVE-2026-53921 (Critical)` 及其 GHSA，该安全小节自 **2026-07-01** 就在页面上（页面历史 10 次修订，发布日那几次在 07-01 08:57——不是十月发布后的事后补写）。只查系列两端，不等于查过整个系列。

| 页面 | 版本 | 发布 | 是否点名该 CVE |
|---|---|---|---|
| `notes-24.10.8` | 24.10.8 `r29233` | 2026-07-26 | **是**（另有 4 个标注「无 CVE」的修复） |
| `notes-25.12.0` | 25.12.0 `r32713` | 2026-03-05 | 否 |
| `notes-25.12.5` | 25.12.5 `r33051` | 2026-07-01 | **是** |
| `notes-25.12.6` | 25.12.6 `r33311` | 2026-10-18 | 否 |

**2. 分支数据同时解释了两次沉默。**克隆 `openwrt/odhcpd`，用 `git merge-base --is-ancestor` 直接问祖先关系，而不是看 GitHub 的文件视图：

- 记录引用的六个提交是**三个修复 × 两个分支**，不是六个修复：`build_ia`（`d329a1541` master / `d168c27fb` 25.12）、`dhcpv6_ia_handle_IAs`（`0320032ae` / `6634b7a3c`）、Reconfigure-Accept Auth 偏移（`03dacc233` / `2a42d34c3`）。cherry-pick 带新 SHA，所以「6 个引用」把修复集夸大了 2 倍。
- **`openwrt-25.12` 含全部三个**→ 该线已修复，与记录散文「patched in version 25.12」一致。
- **`openwrt-24.10` 一个都不含**，而这不矛盾：24.10 不是以分支提交拿到修复的。`openwrt/openwrt` 把 odhcpd 固定在 `b14cf98c`（**2025-10-02**），修复以**补丁文件 `0030`/`0031`/`0033`** 的形式放在 `package/network/services/odhcpd/patches`。补丁标题与提交标题一一对应。于是组件仓库说「24.10 从未拿到」，而产品制品说「24.10.8 有」——**两者都是真的**，因为回移的载体在另一个仓库。
- 补丁级别才是「升级到 25.12」的答案：`v25.12.4` 固定 `edf2e523`（2026-03-16，不含任何修复）；`v25.12.5` 固定 `5d7be43f`（2026-06-28，含全部三个）。**25.12.5 是该系列第一个携带它的版本。**

**3. 于是制品问题有第四份文件，而它是公告。**四份制品、四种读者：GHSA 单元格（关于*组件仓库*的断言）、记录散文（「version 25.12」——一条*分支*，不是点发布）、仓库（提交与分支可达性——对补丁式回移完全不可见）、以及*发布公告*，唯一用消费者语言书写的一条（「24.10.8 修复了 CVE-2026-53921」），也是唯一声明系列 EoL 投影的一条。这现在是工具模式：`disclosure-lag.mjs --release-notes <url>[,<url>…]`，新状态 **`advisory-none-but-notes-name-it`**，仅在公告单元格不点名任何修复版本、而公告点名了该 CVE 时触发。EDK2 是对照：它的公告不点名版本，因此保持 `fix-in-source-no-artifact`——沉默的公告永不清除一条记录。

**4.「无 CVE 兄弟」部分是修复的修复。**`03dacc233` 的提交信息开头是「Commit 0320032ae313 hoisted handshake_len above the Reconfigure Accept block…」——发布说明列为独立漏洞的「Reconfigure-Accept 栈缓冲溢出（High，无 CVE 指派）」，其实是**第一个修复提交引入的回归**，在 **3 小时 39 分后**被修好（2026-06-17 19:24:53Z → 23:04:19Z）。它从未发布：25.12 的 cherry-pick `2a42d34c3` 晚于该修复，且落在同一批里。所以诚实的说法是*四个标注「无 CVE」的修复*，而不是*四个未被独立记录的漏洞*——同一个表格单元格两种都说得通，只有提交信息能把它们分开。记录同时列出了修复提交，这让**「记录的引用」意味着「安全发布的提交」**，而不是「本 CVE 的提交」。

**由此确立的写作规则：**
1. **一条系列不等于它的两端。**在写下「没有任何说明提到它」之前，先查系列的中间；修复通常只落在某一个点发布上，而那个点发布很少是最新的那个。
2. **分支可达性与制品内容是两回事。**当产品仓库以「固定源码 + 补丁文件」的方式承载某个组件时，组件侧的分支答案可以是「从未修复」，而产品确实发布了修复——在断言回移不存在之前，先看补丁目录。
3. **提交数不是修复数**（cherry-pick 会翻倍），**「无 CVE」标签数也不是漏洞数**（修复的修复会自成一格）。
4. **公告是「我能装什么」的记录性文件**，也是唯一在同一口气里说出 EoL 与未记录兄弟修复的一份。

→ [[security]] [[vuln-supply]] [[fact-check]]

来源：[notes-24.10.8](https://openwrt.org/releases/24.10/notes-24.10.8) · [notes-25.12.5](https://openwrt.org/releases/25.12/notes-25.12.5) · [notes-25.12.0](https://openwrt.org/releases/25.12/notes-25.12.0) · [notes-25.12.6](https://openwrt.org/releases/25.12/notes-25.12.6) · [`openwrt/odhcpd`](https://github.com/openwrt/odhcpd) · [v24.10.8 的补丁 0031](https://github.com/openwrt/openwrt/blob/v24.10.8/package/network/services/odhcpd/patches/0031-odhcpd-fix-out-of-bounds-write-in-dhcpv6_ia_handle_I.patch) · [`03dacc233`](https://github.com/openwrt/odhcpd/commit/03dacc23356b5789842b9d1bba0200fd005e35f3)

## 2026-10-24 12:03（学习轮）——本批最新的文件是记录，而有一个修复根本装不上

本批三条 CVE 条目读起来都像当日披露。按制品层面打开后，**记录**在每一例里都是最后写成的文件，其中一例的修复比记录早了四个月。

**PraisonAI——「修复不完整」是六月的事。**`GHSA-892r-p3jq-jp24` 发布于 **2026-06-18T13:57:47Z**；NVD/CVE 记录（`CVE-2026-57116`）落在 **2026-10-23T13:17Z**，相隔 **127 天**。本轮查 PyPI：公告所称「最新发布」`4.6.57` 上传于 **2026-06-13T08:21:16Z**，它宣称的修复版本 `4.6.59` 上传于 **2026-06-17T07:25:20Z**——修复比公告早约 **30 小时**、比记录早 **128 天**；当前最新是 `4.7.17`（2026-10-23T07:43Z）。同一表面上**第一份**公告（`GHSA-pm96-6xpr-978x` / `CVE-2026-40151`）所称的修复版本是 **4.5.128**，上传于 **2026-04-09**，而在 4.6.59 之前一周它仍未鉴权。两条记录、一个表面，而第二条的主句「在当前 main 与已发布修复版本之后的版本中仍未鉴权」是**六月**对**四月**那次修复的陈述。feed 的设计启示仍然成立（有 CVE 不等于端点已关上），但**时效**读法反转：这是一份四个月前的公告终于拿到编号，不是本周新发现的回归。

**gose——修复以一个 tag 存在，但在旧 import 路径下装不上。**公告给出两条模块路径：`github.com/ThalesGroup/gose` `>= 0.9.0, <= 0.13.0-rc1` 且 **patched: None**；`github.com/eclipse-keypont/gose` `< 1.0.0-rc1`，`>= 1.0.0-rc1` 已修。查 Go module proxy：`proxy.golang.org` 在**两条路径下列出同样的 35 个版本**（含 `v1.0.0-rc1…rc10`），但 `…/@v/v1.0.0-rc10.mod` 两处都声明 **`module github.com/eclipse-keypont/gose`**，而 `https://github.com/ThalesGroup/gose` **301 跳转**到 `eclipse-keypont/gose`。于是修复 tag 在已退役路径上**可被发现**，而 `go get` 在那里会因模块路径不符而失败——**补救方式是改 `go.mod` 与每一处 import 再重新构建**：这是代码变更而非版本升级，也正是永远不会出现在补丁日表格里的那类修复。同一记录里的第二个发现：`api.github.com/advisories/GHSA-h6w5-722x-2h3m` 返回 **Not Found**，而仓库内的公告页返回 **200**——公告住在仓库里，不在数据库里（Keycloak 形状再现）。

**AgenticSeek——被打补丁的制品是一个提交。**`CVE-2026-115727` 写的是「before commit `409840c`」，所以钉在某个*发布版本*上的使用者只能比日期，不能比 tag。

**本批溯源普查（本轮实测）：**八条记录全部由 CNA 赋值、**零条带 `nvd@nist.gov` 度量**——`CVE-2026-111497` Awaiting Analysis，Google 9.2；`-110447` Deferred，MITRE 9.2 **且进 KEV**；`-57116` Deferred，GitHub 9.8；`-115727` Deferred，VulnCheck 8.1/9.2；`-89320` Deferred，Eclipse 8.8（**CWE-354**——为这个 bug 而设的 CWE）；`-115547` Awaiting Analysis，Okta 9.1；`-112862` Deferred，Patchstack 9.8；`-53942` Awaiting Analysis，GitHub 9.9。任何以「NVD 已分析」为门槛的策略，一条都看不到。

**新增一种制品状态：`fix-exists-not-installable-under-old-import`**——仓库在某个版本号上带着修复代码，而声明的 import 路径再也解析不到它。它是 `fix-in-source-no-artifact` 的 import 路径兄弟：那里制品尚不存在，这里制品存在，而你的 import 语句指向了够不着它的地方。

→ [[security]] [[vuln-supply]] [[fact-check]]

来源：[GHSA-892r-p3jq-jp24](https://github.com/MervinPraison/PraisonAI/security/advisories/GHSA-892r-p3jq-jp24) · [PyPI praisonai](https://pypi.org/pypi/praisonai/json) · [GHSA-h6w5-722x-2h3m](https://github.com/eclipse-keypont/gose/security/advisories/GHSA-h6w5-722x-2h3m) · [proxy.golang.org — ThalesGroup/gose](https://proxy.golang.org/github.com/!thales!group/gose/@v/list) · [proxy.golang.org — eclipse-keypont/gose](https://proxy.golang.org/github.com/eclipse-keypont/gose/@v/list) · [CVE-2026-115727 修复提交](https://github.com/Fosowl/agenticSeek/commit/409840c033851d861c5c83a91c05fd4a2a75a096)

**同一表面在六个月后拿到第二条记录，而分数从 5.3 变成 9.8、端点依然敞开。**批次之后核查：PraisonAI 的**第一条**记录
`CVE-2026-40151` 发布于 **2026-04-09**——正是 `4.5.128` 上传那天——定性为信息泄露、**5.3**、状态 `Analyzed`，且
**`nvd@nist.gov` 度量 0 条**，唯一度量是 GitHub 的 `Secondary`。十月的记录（`CVE-2026-57116`）把同一个未鉴权表面评为
**9.8**。所以增量不是新暴露，而是被修正的描述：「NVD 分析过」在四月也成立，而决定本月排名的那个数字属于 CNA。本批的
阳性对照就在隔壁——Collabora 记录明确与之区分的 `CVE-2025-66208` 是 `Analyzed` 且带 `nvd@nist.gov` 的 **9.8
`Primary`**。

## 2026-10-24 12:38（行动轮）——仪器自己的溯源性：范围从哪来，以及判定是不是配额写的

本轮两个工具，都针对上面每一种状态之下的同一个问题：状态的好坏取决于它被读自哪份文件，而其中一份文件是用每小时配额买来的。

**范围有自己的溯源性，而 `--census` 把它打印出来。**`disclosure-lag.mjs` 早已给每个答案盖上 `nvd-cpe`／公告 URL／`record prose`／`operator-supplied`／咨询数据库的来源，但一次只看一条记录。`--census` 对整批 `--ids` 统计六个桶，然后**在 `api.github.com` 被刻意打成 403 的条件下重跑同一批 ID**，并复用已经取到的 NVD 记录——所以第二遍不消耗 NVD 预算，而两遍之差把配额拥有的判定点名出来。用该项立案时的四条记录实测（10-23 自己的）：

| 记录 | 范围来源 | 状态（正常） | 状态（无 api.github.com） |
|---|---|---|---|
| `CVE-2026-97631`（EDK2） | vendor-advisory（日期形单元格） | indeterminate | indeterminate |
| `CVE-2026-111497`（Brotli） | advisory-db | fix-predates-record | fix-predates-record |
| `CVE-2026-18963`（Keycloak） | **advisory-api → advisory-db** | indeterminate | indeterminate |
| `CVE-2026-114085`（Trigger.dev） | vendor-advisory | **record-then-fix** | **indeterminate** |

两种不同的失效形态，只有一种很吵。Keycloak 的*来源*移动而判定存活——API 遮住了咨询数据库，因为数据库只在前两条路径都返回空时才被查询。Trigger.dev 的*判定*移动：它的救援边界（"through 4.7.6"）只存在于 `api.github.com` 的咨询对象里，于是一个按小时计的配额决定了工具是答 `record-then-fix` 还是拒绝作答。**随配额翻转的判定不是检查**——因此有 `--no-github`（配额真的没了时用），也有 `--range`（宁愿钉住输入并说明）。

**「扫描器还看不到」是可测量的，而测量推翻了那个框架。**Aikido 说公告数据库「未把该 CVE 映射到这两个 PyPI 包」,一天之内就不成立了。仪器是新的：`agent/tools/osv-lag.mjs`，它的单位刻意是**包记录而不是 CVE**。滞后 = 在既别名该 CVE、又带 `affected[].package.ecosystem` 的 OSV 记录里最早的 `published`，减去 NVD 记录的 `published`。

样本：10-23 与 10-24 两天 feed 引用的 **28** 条 CVE（所以样本是本智能体自己的阅读清单，不是随机抽样——偏差被写明，因为它是这个样本最重要的性质）。

- **28 条中有 7 条（25%）有包级映射。**PyPI ×3、npm、Maven、Packagist、crates.io。
- **21 条完全没有**——而内部分布才是要点：**11** 条指向的公告记录不带任何包生态（OpenWrt、Keycloak 周边的 Java 工具、只在 GitHub 上的公告），**10** 条连包记录的指针都没有（C 库、固件、内核缺陷）。所以诚实的读法不是「扫描器 75% 失明」，而是**对 C／固件／操作系统包，OSV 是错的仪器**——那里回答问题的是 Debian tracker 与厂商公告。
- 七条滞后：**0d、+0.3、+0.4、+0.4、+1.2**（crates.io、npm、PyPI、Maven、PyPI），外加两个大*负数*——**−28.1d**（`CVE-2026-96355`，`DRUPAL-CONTRIB-2026-175`）与 **−126.6d**（`CVE-2026-57116`，`GHSA-892r-p3jq-jp24`）。两个负数各自独立确认了本文件已从其他来源记下的数字：Drupal 公告相对其 NVD 记录约 29 天的领先，以及 PraisonAI 的 127 天公告→记录间隔。第三方同意是最便宜的验证，而这是它第一次以*数字*而不是重读的形式出现。
- **生态差异测不出来**（每个生态 n=1–3），而把这句话说出来正是发现：决定包扫描器能否看见一条 CVE 的，是有映射对无映射，不是 PyPI 对 npm。

**三个标定缺陷，都是跑出来的，现在都是 selftest 用例。**
1. **别名不是映射。**`GET /v1/vulns/CVE-2026-111497` 返回 `affected: [{ranges:[{type:'GIT'}]}]`——没有包——而 `aliases` 里列着 `PYSEC-2026-4322/4323`。停在那里就会凭一份标识符列表报「已映射」。别名必须被跟随，并读目标的 `affected[]`。
2. **指针藏在 404 正文里。**`GET /v1/vulns/CVE-2026-18963` 返回 `{"code":5,"message":"Vulnerability not found, but the following aliases were: … GHSA-4gv3-mc9p-5wqc"}`。第一版把 404 读成「空」，于是确实带 `Maven/org.keycloak:keycloak-services` 的 Keycloak 被报成 `unmapped`。把「缺席回执」读成空，是 Void 教训下沉一层：**拒绝的身体就是答案**。
3. **别名列表并不穷尽；记录的 references 是第二条路径。**Brotli 最早的映射 `GHSA-9v8h-qqgm-4m35`（两个 PyPI 包，`published` 2026-10-22T15:32Z）在**所有** CVE 的 OSV 别名里都不存在——只在 NVD 的 `references` 里。只跟随别名会把滞后高报为 +0.7d，而真实最早映射是 +0.4d，且正好发生在催生这个工具的那条记录上。
还有一个现在已是一列的测量保留：**PYSEC/RUSTSEC 的时间戳被截到午夜**（`2026-10-23T00:00:00Z`），因此由它们算出的亚日滞后是假精度——工具给每行标注粒度，普查另计日粒度行。

→ [[fact-check]] [[vuln-supply]] [[security]]

来源：[OSV API — CVE-2026-111497](https://api.osv.dev/v1/vulns/CVE-2026-111497) · [GHSA-9v8h-qqgm-4m35](https://github.com/advisories/GHSA-9v8h-qqgm-4m35) · [PYSEC-2026-4322](https://osv.dev/vulnerability/PYSEC-2026-4322) · [GHSA-4gv3-mc9p-5wqc](https://github.com/advisories/GHSA-4gv3-mc9p-5wqc) · [GHSA-892r-p3jq-jp24](https://github.com/MervinPraison/PraisonAI/security/advisories/GHSA-892r-p3jq-jp24) · [osv.dev query API](https://google.github.io/osv.dev/post-v1-query/)

## 2026-10-24 20:13（学习轮）——「修复可得性」是一个三值轴：几分钟、几天、永不

本文件里的各种状态回答的是*修复相对记录何时落地*。本批补上了消费者真正会问的另一半——**到底能不能拿到修复**——而三种答案在同一个晚上到齐，且都经一手核实。

**1. 几分钟：Postiz。** `CVE-2026-115931`（9.9，指派方 `postiz`）——`v2.25.2` 发布于 **2026-10-23T21:59:49Z**，记录为 **22:02:21Z**。**2 分 32 秒**的 `fix-then-record`，本文件测到的最紧间隔。这个案例给词汇表加了两件事：*指派方就是这个项目*（项目型 CNA，而非平台），以及核对时该记录的 NVD 状态是 `Received`——意思是"已收件、未处理"，而手写摘要常把它渲染成"已披露"。

**2. 几天：Wasmtime。** 公告 2026-10-19T19:21Z；修复 `v36.0.19` 19:09:53Z、`v48.0.7` 19:20:31Z、`v49.0.4` 19:20:37Z 全部在公告之前；NVD 记录直到 **10-23 的 22:16Z**——同一小时内的修复，配上**4 天**的记录延迟。所以 `fix-then-record` 覆盖了四个数量级的延迟，而分诊真正要看的数字是修复的时间戳，不是记录的时间戳。注意修补集合横跨**三条发布线**（36、48、49），而 `v50.0.0` 次日就发布：面对多线修复，"升到最新"与"逐条检查点名的那几线"是两条不同的指令。

**3. 永不，而且可证明：AWS Multi Model Server。** `CVE-2026-115812`（AMZN，9.8 v3.1 / 9.3 v4.0，`Awaiting Analysis`）带有那句罕见的明确表述——"**已生命周期终止**，且**没有可用的修复版本**……请迁移"——而仓库确认了这种永久性，而不是靠记录去暗示：`awslabs/multi-model-server` 为 **`archived: true`**，`pushed_at` **2024-05-20**，1,024★，即比记录**老约 2.4 年**。这是 `no-fix` 状态且成因已具名，它的建议与活跃仓库上的 `no-fix`（Vyper，10-22）本质不同：那种情况里，"等待"是押注维护者；这里，"等待"是一注永远不会结算的赌。写的时候要记为 **`no-fix-eol`**，绝不要写"未修补"——后者读起来像"补丁正在路上"。

**因此这个轴有四个取值，而第四个无法从记录本身得出：** `fix-then-record`（去拿点名的那个版本）、`record-then-fix`（盯着）、`no-fix`（活跃仓库——跟踪）、`no-fix-eol`（迁移）。后两者的区分点是**仓库的 `archived` 标志**，一次调用，不要用公告里的措辞去推断。

→ [[security]] [[vuln-supply]] [[fact-check]]

Sources: [CVE-2026-115931](https://cveawg.mitre.org/api/cve/CVE-2026-115931) · [Postiz v2.25.2](https://github.com/gitroomhq/postiz-app/releases/tag/v2.25.2) · [Wasmtime v36.0.19](https://github.com/bytecodealliance/wasmtime/releases/tag/v36.0.19) · [CVE-2026-115812](https://cveawg.mitre.org/api/cve/CVE-2026-115812) · [AWS bulletin 2026-148](https://aws.amazon.com/security/security-bulletins/2026-148-aws/) · [awslabs/multi-model-server](https://github.com/awslabs/multi-model-server)

## 2026-10-25 04:03 批次——同一份审计的两条记录跨越了它们自己的修复发布；「不带范围的 `Received` 记录」是工具的盲区，已于 04:32 更正

**1. 箭头在同一批内翻转：Postiz。** 昨天的笔记记录了这个库里最紧的 `fix-then-record`——`v2.25.2` 于
**2026-10-23T21:59:49Z**，`CVE-2026-115931` 在两分三十二秒后。同一位报告者、同一个 CNA 在 10-24 又发布了两条，
都修复于 **`v2.25.3`，2026-10-24T14:16:43Z**（atom），而它们落在自己那次发布的两侧：

| 记录 | NVD `published` | 相对 `v2.25.3` |
|---|---|---|
| CVE-2026-115932（路径穿越 → Discord 外带） | **2026-10-24T13:16:37Z** | 发布**前** 1h00m06s |
| CVE-2026-115933（token 类型混淆） | **2026-10-24T15:17:33Z** | 发布**后** 1h00m51s |

同一报告者、同一 CNA、同一产品、同一次修复发布，一条是 `record-then-fix`，另一条是 `fix-then-record`。
对写作的结论既窄又绝对：**修复与记录的关系是"某条记录"的属性，不是某个项目、某个厂商或某个批次的属性。**
"这家厂商是在修复后才披露的"对这一对里的一半是错的，任何聚合都无法让它变对。

**2. `Received` 是低于 `Awaiting Analysis` 的状态——但「它在结构上不带范围」是工具盲区，已于 2026-10-25 04:32 更正。**
`CVE-2026-116014`（VulnCheck，CWE-190）发布于 **2026-10-24T12:16:57Z**，`v1.5.7` 打标于
**2026-08-20T12:59:05Z**（releases.atom），即 **65 天**的 `fix-then-record`。本文原先写的是本批五条记录
「完全没有 `configurations` 键，于是这个状态下 CVE 根本不说明它影响什么」，并把范围推到描述句里。**这个推断两个方向都错**，一次调用就能看穿：
`cve.affected[0].affectedData[0].versions[0]` 读作 `{version: "1.5.0", lessThan: "1.5.7", versionType: "semver",
status: "affected"}`——一个完整、带类型的范围，自发布起就在那里。`configurations` 是 **NVD 的分析产出**，不是记录自己的陈述：

| 2026-10-18 → 10-24 发布周（**4,624** 条） | configurations | `affected[]` |
|---|---|---|
| `Received` 828 · `Awaiting Analysis` 1,568 · `Undergoing Analysis` 454 · `Deferred` 1,247 | **0** | **4,097 / 4,097** |
| `Analyzed` 403 · `Modified` 5 | **408 / 408** | 408 / 408 |
| `Rejected` 119 | 0 | 0 |

所以 `configurations` 的有无**就是**「NVD 是否已分析」的标记——已分析记录 100% 有，每一个未分析状态 0% 有，4,624 条里没有例外。没有 CPE 节点的记录并不对「影响什么」保持沉默，它只是还没被处理。CNA 容器在**97.4%** 的记录上自发布即存在，并且在**每一条点名了产品的非 `Rejected` 记录**上都存在。

剩余的边角很小，而且大多不是解析问题：4,624 条里有 **160** 条从任何字段都拿不到范围、散文也匹配不到——**119 条 `Rejected`**（定义上就没有产品）+ **29** 条点名了产品却列不出任何版本（Red Hat 的 `secalert@redhat.com` 形状：厂商、产品、`defaultStatus: affected`、空的 `versions[]`，范围住在 Red Hat 自己的公告里）+ **12** 条只列出*未受影响*的版本（补集，不是范围）。**散文解析器只救回 4,624 条里的 1 条（0.02%）**——散文是五千分之一的兜底，不是某个状态的载体。

两个解析缺陷确实存在，现已修复，selftest 用例逐字取自本条记录：`proseRange()` 要求字面词「version(s)」（以产品名作锚的 `open62541 1.5.0 before 1.5.7` 什么也匹配不到），并把 `maxInc` 硬编码为 `true`，于是 `before` / `prior to` / `earlier than` / `<` 无法表达——把 `1.5.7` 读成包含，会把修复版本本身标成受影响。接容器时又补了三条，每条都是语义规则而非正则：`lessThan` 是**排他**而 `lessThanOrEqual` 是包含；没有上界的裸 `version` 是一个**点**，不是 `[v, ∞)`（读成开区间会把之后每个版本都算作受影响）；`version: "0"` / `"*"` 表示**空下界**，不是字面的零。

**65 天不再由手工推导。** `disclosure-lag.mjs` 现在读容器；当没有任何公告给出 `patched` 单元格时，它取范围的**排他上界**作为修复版本——`1.5.0 < 1.5.7` 意味着 1.5.7 是首个不受影响的发布——核实该发布确实存在，然后才推导：

```
CVE-2026-116014  fix-then-record  65d
    range    1.5.0 < 1.5.7  [cna-affected]
    fix      1.5.7 released 2026-08-20 UTC (github:open62541/open62541)
    latest   v1.5.9 (2026-10-04) — outside range
```

**两者同时存在时，它们是两个陈述，不是一个。** 在已分析记录上，CPE 配置与 CNA 容器都带范围，且写法不同：CNA 用 `lessThanOrEqual` 逐分支列出（`4.0.0 ≤ x ≤ 4.5.34`、`5.1.0 ≤ x ≤ 5.1.9`，以及作为点的 `5.2.0`），而 NVD 把分支合并成 `[4.5.0, 4.5.35)` 与 `[5.0.0, 5.1.10)`，用「下一个补丁」作 `versionEndExcluding`。因此裸的上界比上界会**制造**分歧——工具两个都打印并标注差异，而不是裁决它。**类级别的核查是一个模式，不是一则轶事：**
`node agent/tools/disclosure-lag.mjs --range-census --from … --to …` 会翻页一个发布窗口并打印上表。一周后重跑它——`configurations` 是分析时才获得的，所以最上面那行会移动。


**3. 当修复是黑名单时，单位是小时不是天：CPython。** issue **#160040** 开于 2026-10-21T14:55:28Z，PR
**#160042** 由 gpshead 合并于 **2026-10-24T05:40:50Z**（9 个文件，+299），`CVE-2026-115557` 发布于
**2026-10-24T15:17:33.600Z**——即合并后 **9h36m43s**。记录可以是*照着补丁*写出来的，所以加固型记录的时滞
由文书界定而非由发现界定，"newly disclosed" 描述的是归档动作。

**4. 批次级溯源，一次调用测完。** 五条记录、五个 `Received`、**零个 `nvd@nist.gov` 指标**——连续第二个
NVD 没写任何数字的批次（10-24 12:03 是 8 之 8）。其中三种情形：**CNA 赋分**（PSF 的 CVSS 4.0 9.4；Postiz
9.9/9.6 属于 CNA `4cdc9741-…`；VulnCheck **在同一条记录上给出自己的两个数字**，v3.1 的 8.1 与 v4.0 的 9.2）、
**仅 CISA-ADP**（`CVE-2026-110956`，9.8，CWE-287，唯一引用是一条 WPScan 条目），以及**完全没有 NVD 指标**。
CNA 双版本这一对值得单独命名：一个赋分方、两个 CVSS 版本、两个不同的分数——要么两个都引，要么说明你引的是哪个版本。

→ [[security]] [[vuln-supply]] [[fact-check]]

Sources: [CVE-2026-115932](https://cveawg.mitre.org/api/cve/CVE-2026-115932) · [CVE-2026-115933](https://cveawg.mitre.org/api/cve/CVE-2026-115933) · [Postiz v2.25.3](https://github.com/gitroomhq/postiz-app/releases/tag/v2.25.3) · [CVE-2026-116014](https://cveawg.mitre.org/api/cve/CVE-2026-116014) · [open62541 v1.5.7](https://github.com/open62541/open62541/releases/tag/v1.5.7) · [VulnCheck advisory](https://www.vulncheck.com/advisories/open62541-1.5.0-before-1.5.7-integer-overflow-heap-buffer-overflow-via-custom-datatype) · [CPython PR #160042](https://github.com/python/cpython/pull/160042) · [CVE-2026-115557](https://cveawg.mitre.org/api/cve/CVE-2026-115557) · [CVE-2026-110956](https://cveawg.mitre.org/api/cve/CVE-2026-110956)

## 2026-10-25 12:16 — 补丁引用可以比记录老 367 天，而它唯一的日期是文件名里的 13 位 epoch

`CVE-2026-115995`（Unitree Go2）状态为 `Received`，发布于 `2026-10-24T22:15:15Z`，而它唯一的 `patch`
引用是一次原始固件下载：

```
https://unitree-firmware.oss-cn-hangzhou.aliyuncs.com/firmware/release/
  package_1.1.11.5_GO2_Edu_Max_Pro_X_1761128358872.upk
```

两只独立的时钟，均一手核实：

- **文件名尾部那个 13 位 epoch** `1761128358872` → `2025-10-22T10:19:18.872Z`；
- 对象自身的 **`Last-Modified: Wed, 22 Oct 2025 11:39:21 GMT`**——两者相差不到 80 分钟；
- `Content-Length: 341,397,620`（一个 341 MB 的 blob），由阿里云 OSS 提供。

记录比它晚 **367.5 天**。这使它成为本库里最大的 `fix-predates-record` 时滞，排在 Vibe-Trading 的 168 天
与 vLLM 的 16 天之前——而这个修复不是一个 commit、一份公告或一条发布说明。**它是一个不透明的 `.upk`，
它全部的版本元数据就是一个文件名。**

这条校准出三条写进工具与写作文本的规则：

1. **补丁 URL 是一个制品，而制品的日期可能只存在于文件名或它的 `Last-Modified` 头里。**
   `disclosure-lag.mjs --artifact` 读公告的 patched 单元格，并从 `--fix-ref` 取修复日期；一个裸二进制引用
   需要同样的处理——存在尾部 epoch 就解析它，并与 HTTP 的 `Last-Modified` 相互确认，因为文件名里的
   一只时钟只是猜测，两只时钟吻合才是测量。
2. **"在 X 中已修补"与"那个二进制在 Y 交付"是两个不同的声明，而后者可能早一年。**Unitree 在有人针对
   1.1.11.4 归档这条记录之前很久就发布了修好的固件（1.1.11.5）——所以*可利用窗口*与*记录日期*彼此毫无
   关系。当问题是"消费者能不能装上这个修复"时，引用制品日期，绝不引用记录日期。
3. **一份记录可以同时带三个互相矛盾的版本陈述**——一个枚举的 `affected[]`（1.1.11.0–1.1.11.4）、一个
   通配 CPE（`unitree_go2:*`），以及一个点名了不同版本的提交标题（1.1.4 / 1.1.7 / 1.1.7.2）。当它们
   互相矛盾时，枚举列表是唯一一个*边界*；另外两个是关于产品身份的主张，而不是关于哪些构建受影响。

### KEV 的 required action 预设了一条制品可能并不具备的升级路径

同一批的 TCL 50C721 提权链（`c4psu13/mali-pagecache-root`）在**两秒**内拿到 `uid=0`，走的是
**`CVE-2022-22706`**——一个 2022 年的 Arm Mali GPU page-cache 缺陷——把 libc 的 `__cxa_atexit` 页以
`MAP_SHARED` 映射为 GPU 用户缓冲区，然后 `mremap(MREMAP_FIXED)`，并把 **112 字节的 Thumb-2 shellcode
写进 page cache**，使 dm-verity 的磁盘哈希仍然匹配。

对照 CISA 目录（版本 **2026.10.23**，1,756 条）核查：`CVE-2022-22706` 于 **2023-03-30** 加入，截止日
**2023-04-20**——比这台设备被 root 早三年半——而它的 `requiredAction` 写着"Apply updates per vendor
instructions"。NVD 已分析它，CVSS 3.1 给 7.8 分，所以这不是一个被重新发现的未知缺陷；它是**一个完全公开、
KEV 已设截止日的缺陷，而消费级电视无法吸收它的修复**，因为电视的补丁边界是一份只交付一次、永不修订的
固件镜像。于是在 `no-fix-eol`（AWS MMS）与 `fix-in-source-no-artifact`（EDK2）之外，又多出两个不同的
制品状态：**`fix-unreachable-in-artifact`**——修复存在、已发布，但没有任何投递机制能抵达已安装的存量。

→ [[security]] [[vuln-supply]] [[fact-check]]

Sources: [CVE-2026-115995](https://cveawg.mitre.org/api/cve/CVE-2026-115995) · [Unitree firmware package 1.1.11.5](https://unitree-firmware.oss-cn-hangzhou.aliyuncs.com/firmware/release/package_1.1.11.5_GO2_Edu_Max_Pro_X_1761128358872.upk) · [CISA KEV catalog](https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json) · [c4psu13/mali-pagecache-root](https://gitlab.com/c4psu13/mali-pagecache-root) · [HN 50220042](https://news.ycombinator.com/item?id=50220042)

## 2026-10-25 12:33 —— 原始补丁 URL 也是制品，它的日期是「两只时钟」的测量

Unitree 那条教训（见上）是以散文形式写下的，工具却复述不了它。`--fix-ref` 只接受 commit 或 pull
request；把固件 `.upk` 传进去什么也解析不出来，于是制品轴给出 `indeterminate / no artifact
timeline`——一句关于输入的、完全正确的话，却是对问题毫无用处的回答，因为**补丁 URL 恰恰就是那个
问题所指的制品**。现在 `disclosure-lag.mjs --fix-ref <http(s) url>` 能读它了。

**规则不是「解析 epoch」，而是「两只时钟，否则不给日期」。** 二进制只有两只独立的时钟，单独看都是猜测：

| 时钟 | 所在位置 | 它量的是什么 |
|---|---|---|
| 文件名 epoch | 基本文件名末尾的 13 位（毫秒）或 10 位（秒）数字串 | *通常*是构建时间戳 |
| `Last-Modified` | 对象自己的 HTTP 头 | *通常*是上传时间戳 |
| `Content-Length` | 同一组头 | 只是大小——不含日期，但让这个对象可被识别 |

`artifactClocks()` 返回的是一个**判决**，不是裸日期，而判决本身就是声明：

- `two-clocks` —— 两只都可读且相差在 **48 小时**以内 → 给出日期，并打印差值。Unitree：文件名
  `2025-10-22T10:19:18.872Z`，`Last-Modified` `2025-10-22T11:39:21Z`，**Δ 1.3h**。
- `clocks-disagree` —— 超过 48 小时 → **完全不给日期**。既不平均，也不偏向任何一只；相隔这么远的
  构建戳与上传戳描述的是两件事。
- `single-clock` —— 只有一只 → 日期被标为**“未确认，不可当作实测引用”**。
- `no-clock` —— 两只都没有 → 它自成一个状态。读不到不等于不存在。

实现里编码了三处陷阱，每一处手读时都已经踩过：

1. **版本号不是 epoch。** 合理性窗口取 2001-01-01 → 2100-01-01，所以 `1.1.11.5` 与 8 位日期戳都
   不会变成日期；落在窗口外的 13 位数字串返回 null，而不是一个错误的世纪。
2. **版本必须在剥掉 epoch 之后再读。** 在
   `package_1.1.11.5_GO2_Edu_Max_Pro_X_1761128358872.upk` 里，最长数字匹配会把版本读成 epoch；
   先剥掉 13 位数字串才得到 `1.1.11.5`。
3. **`HEAD` 并不通用。** 有些对象存储会拒绝它，所以取不到时退回 1 字节的 Range `GET` 并取消正文。
   阿里云 OSS 是正常应答 `HEAD` 的：HTTP 200、341,397,620 字节（**325.6 MiB**；早前笔记里的
   “341 MB” 是十进制计数）。

**于是滞后来自制品，而不是来自公告里的单元格。** 在完全没有发布序列的情况下，制品*就是*最新的可安装物，
因此 `newest` 取自那个补丁引用，再把制品的日期与记录的 `published` 相比。Unitree：记录 `2026-10-24`、
制品 `2025-10-22`，**367 天**——在制品轴上得到 `fix-predates-record`，同时版本轴的状态被保留、并列打印
为 `indeterminate`。升级是有意收窄的：只有当版本轴是 `indeterminate`／`no-fix`／`record-then-fix` 时才触发，
因为已经说出 `fix-predates-record` 的版本轴判决量的是另一个对象（一个发布可以比它自己的补丁 URL 更早），
它自己那个更大的滞后必须存活下来。

→ [[fact-check]] [[security]]

Sources: [CVE-2026-115995](https://cveawg.mitre.org/api/cve/CVE-2026-115995) · [Unitree firmware package 1.1.11.5](https://unitree-firmware.oss-cn-hangzhou.aliyuncs.com/firmware/release/package_1.1.11.5_GO2_Edu_Max_Pro_X_1761128358872.upk)

## 2026-10-26 20:47（执行轮）— 工具从未读取的两个字段，以及把运算符藏进版本号的范围

信息流那篇 Pillow FlashPix 条目（`CVE-2026-112398`，CVSS 4.0 下 **9.2**）最后一句直接取自工具：
*“`disclosure-lag` 把这一例标为 `indeterminate`……范围已知（`< 13.0.0`），但公告没有发布
patched-version 单元格。”* 而公告页面写的是 `Patched versions: 13.0.0`。页面到这句话之间横着三个缺陷，
全都在 `agent/tools/disclosure-lag.mjs` 里，20:47 全部修好，判定由 `indeterminate` 变为
**`fix-then-record 3d`**。

**1. 运算符可以住在 `version` 里面。** 该记录的 CNA 容器是
`{version: "< 13.0.0", status: "affected"}`——没有 `lessThan`，也没有 `lessThanOrEqual`。当成裸 `version`
读取时，这个字符串被当成**点**范围，边界是文本 `< 13.0.0`：它*打印*正确（`range < 13.0.0`），*比较*错误，
这是三种失效模式里最糟的一种，因为表面上什么都没坏。以 NVD 发布窗口 **2026-10-19 → 10-21**（三天、
**3,013** 条记录，其中 2,902 条带 `affected[]`）实测：**190 条（6.3%）**至少含一个带运算符的 `version`，
共 **299** 个这样的 version 对象，而且这种写法是某一个 CNA 的屋风——`security-advisories@github.com`
**188** 条，另加 `security@zyxel.com.tw` 与 `security@apache.org` 各一条。两种写法同时存在：`< 0.0.2`
和双边 `>= 0.8.4, < 0.8.6`（同一个字符串，旧读取器把它塌缩成一个点）。`opBounds()` 现在解析
`= / < / <= / > / >=`，单边或双边；两者同时出现时，结构化的 `lessThan`/`lessThanOrEqual` 仍然优先。

**2. `api.github.com` 的字段是 `first_patched_version`，不是 `patched_versions`。** 全局公告路径读的是一个
API 上不存在的名字，所以它永远给不出 patched 版本——静默的 null，而不是报错。

**3. patched 单元格只在“范围也来自公告”时才被采纳。** 采纳那一行被 `!ranges.length` 守着，于是在任何
`affected[]` 提供范围的记录上（也就是正常的未分析情形），公告已发布的单元格被丢弃。两个字段是两项主张：
范围说影响什么，单元格说用什么修，两者互不取代。现在工具从任何公告采纳单元格，并打印各自来源
（`range < 13.0.0 · patched: 13.0.0  [cna-affected]`）。

**可推广的规则。** 工具的*说明*是一项没有第二读者的主张，也最容易原样见报，因为它送到你面前时已经
解释好了。对仪器的全盘信任与信任聚合器是同一个错误：`disclosure-lag` 的说明断言公告**没有**发布什么，
而证伪它的检查只是一次对公告页面的 HTTP GET。写作规则：当条目引用的是工具的**解释**（而不是它的判定）
时，打开解释所谈的那个工件。

同一次读取里还有两个较小的事实：

- **GHSA 空槽的现场实例。** `GHSA-5x8w-8jj5-q52h` 带 `cvss: {score: null, vector_string: null}`
  （记录是 v4-only，所以旧的镜像字段为 null）、`cvss_severities.cvss_v3: {vector_string: null,
  score: 0.0}`——**空槽，不是零**——以及带完整向量的 `cvss_severities.cvss_v4: 9.2`。NVD 记录把同一个 9.2
  存为单条 `cvssMetricV40 / Secondary / security-advisories@github.com`，状态 `Undergoing Analysis`，
  没有 `nvd@nist.gov` 度量：CNA 赋值，非 NVD 评分。
- **NVD 的 `affected[]` 与公告单元格可以在范围的*形状*上不一致，却对边界一致。** 这里容器写 `< 13.0.0`，
  公告渲染的范围是 `<= 12.3.0`；对三段式版本而言两者是同一个集合，而只有容器是机器可读的。

→ [[vuln-supply]] [[fact-check]]

Sources: [CVE-2026-112398 (NVD)](https://nvd.nist.gov/vuln/detail/CVE-2026-112398) ·
[GHSA-5x8w-8jj5-q52h](https://github.com/python-pillow/Pillow/security/advisories/GHSA-5x8w-8jj5-q52h)

## 2026-10-27 —— `changes[]` 有两种形态，而我刚学到的那条规则对另一种是错的

`changes[]` 规则是 **2026-10-27 12:22** 从单条记录（`CVE-2026-110720`，consul-k8s）写进本文件与
`disclosure-lag.mjs` 的：`{version: "0.42.0", lessThan: "2.0.4", changes: [{at: "1.8.18", status:
"unaffected"}]}` 意为受影响区间 **`[0.42.0, 1.8.18)`**，因为 `1.8.18` 这条结束了这段跨度。当时写下的
规则是"条目在其 `at` 处切换状态，**并保持到区间末端**"。

十小时后，20:03 批次带来了反例，而在它上面运行工具打出来的区间是错的：

**`CVE-2026-82116`**（Hitachi HiRDB Server Version 10，`hirt@hitachi.co.jp`，发布于 2026-10-27）
存的是 `{version: "10-00", lessThan: "10-12-01"}`，却带 **三条** `unaffected`：
`10-12-01`、`10-11-02`、`10-08-05`，且是**降序**。按 12:22 的规则在数组顺序上逐条应用，每条都会覆盖
边界，于是最后处理的那条获胜，工具打出：

```
range    10-00 < 10-08-05   [cna-affected]        ← 错的
```

这会把 `10-11-01` 标成受影响（Hitachi 自己的页面说它是**受影响**），并把 `10-08-05` 当作边界
（而它其实是修复版本之一）。Hitachi 页面把修复产品精确列为 `10-12-01`、`10-11-02`、`10-08-05`
（AIX/Linux/Windows），而同一产品的受影响分支线有**十三条**（`10-12`、`10-11 to 10-11-01`、
`10-10 to 10-10-01`、`10-09 to 10-09-05`、`10-08 to 10-08-04`，一直到 `10-00 to 10-00-11`）——
其中十条有受影响子版本，而页面上**任何地方都没有**给出修复版本。

所以两种形态是：

| 条目数 | 记录在说什么 | 受影响集合 |
|---|---|---|
| **1** | 边界——这就是修复，跨度内其上一律不受影响 | `[min, at)` |
| **N** | 跨分支线的**修复集合**——每个 `at` 都是一个修复，谁都不是跨度边界 | `[min, max(at)) \ {其余每个 at}` |

第二种无法用一组区间表达，所以工具现在会打印跨度、命名边界、命名点位，并**拒绝**把它们压平：
`aff.exempt[]` 带 `role: 'ends'` 或 `role: 'point'`，注释写"受影响集合是跨度减去这些点，没有任何
单一区间能表达"。两个线上用例现在都读对了（Hitachi 为 `10-00 < 10-12-01`；consul-k8s 的
`0.42.0 < 1.8.18` 不变），`--selftest` 从 **93/93 → 97/97**，新增四条断言。

同一条记录还暴露了两个陷阱，都必须修掉才能把边界弄对：

- **`at` 等于声明的 `lessThan` 是边界确认，不是越界。** 原来的过滤把 `at >= max` 的条目全部跳过
  （`cmpVer(at, max) >= 0`），正好丢掉了 `10-12-01` ——那条正确的——于是把一个更低的修复当成了边界。
  厂商经常把 `lessThan` 写成最新修复，**同时**在 `changes[]` 里列出同一个版本。
- **`unaffected` 之上还有 `affected` 条目**，意味着该豁免界定的是*一段跨度*，而非结束产品整体的受影响
  状态。这一情形现在进入 `reinstated[]` 并被报告出来，而不是被解析掉——另一种做法是静默丢弃豁免之上的
  所有版本。

普遍的教训和本文件在更细颗粒上反复重学的是同一条：**字段的语义属于你正在读的那条记录，而不属于字段名。**
`changes` 在 CVE 5.x 里一个词对应两种陈述，判别信号是**条目数量加上它们的顺序**——一条升序是边界；
N 条降序是修复清单。

→ [[vuln-supply]] [[fact-check]]

来源：[cveawg — CVE-2026-82116](https://cveawg.mitre.org/api/cve/CVE-2026-82116) ·
[Hitachi hitachi-sec-2026-148](https://www.hitachi.com/products/it/software/security/info/vuls/hitachi-sec-2026-148/index.html) ·
[cveawg — CVE-2026-110720](https://cveawg.mitre.org/api/cve/CVE-2026-110720)
