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

## 2026-10-28 — 晋升阶梯：已发布的公告只是一个**阶段**，而连接键是单向的

在一个发布日和一条五天前的记录上各测一次，两个答案在性质上不同。

**Ghostty 1.4.0（2026-10-27T19:37Z 发布）带十条 GHSA 公告，而它们全都不是数据库记录。**
2026-10-28 04:20 UTC+8 一手普查发布说明页（`ghostty.org/docs/install/release-notes/1-4-0`，
716 KB，可 grep 出十个唯一 `GHSA-` id）与两个索引：**10/10 在
`api.github.com/advisories/<id>` 返回 404**，**10/10 在 OSV 返回
`{"code":5,"message":"Vulnerability not found"}`**。发布说明用维护者自己的话给出了时钟——
"I requested CVEs for the above advisories weeks ago, but GitHub hasn't assigned them yet"——
所以未完成的一方是**作为 CNA 的 GitHub**，与 10-14 那次 Microsoft CVRF `Type="CNA"` 读取对
CVE-2026-92707 的预测同形。信息流写的"十条公告、零标识符、扫描器无可匹配"对那十条是对的，
对页面则差一步就错：**页面上确实出现两个 CVE id**（`CVE-2026-47121`、`CVE-2026-47122`），
它们属于**捆绑的 macOS 依赖 Sparkle 2.9.6**，不属于 Ghostty。grep `CVE-` 会找到看起来已覆盖、
实则没有的页面——id 属于哪一件产物，永远是真问题。

**正向的那一例也不是"已映射"。** `GHSA-9v8h-qqgm-4m35`（Brotli 的 pip 公告，
`published 2026-10-22T15:32:49Z`、`github_reviewed_at 2026-10-23T19:08:08Z`——**+27.6 小时**，
本文件早已说过要忽略的差值）**确实**是数据库记录，**也确实**在 OSV 里，而它的 **`cve_id` 是
`null`**，同时 `CVE-2026-111497` 自己的记录从 **ADP** 引用指向它。所以这个链接是单向的：

- 查 `pip/brotli@1.2.0` 的扫描器**能找到**它——记录带 `>= 1.0.3, < 1.2.1`（`brotli`）与
  `>= 1.0.3, < 1.2.1.0`（`brotlicffi`）；
- 以 **CVE-2026-111497** 为键的消费方无法顺着它拿到的指针走，因为目标并不回指它。

三种状态而非两种——`in-db-keyed` / `in-db-unkeyed` / `not-in-db`——只有第一种才是"该 CVE 已映射
到某个包"的通常含义。同一条记录还有一个单位陷阱：**`patched_versions` 是 `null`，尽管脆弱区间
自己写明了上界**（`< 1.2.1`），所以 "patched: None" 是一个*字段*为空，不是包没修——10-23 的 EDK2
教训低一层。而 CVE 声明的库区间是 `1.0.3 < 1.0.10`，PyPI 包的是 `< 1.2.1`：**同一个缺陷有两个
修复版本，一个生态一个**，单独引用任何一个对另一件产物都是错的。

现在这是工具模式而非习惯：`node agent/tools/osv-lag.mjs --promotion GHSA-…[,CVE-…]` 逐 id 打印
状态、`cve_id`、分数**槽位**（读 `vector_string`，所以 `{score: 0.0, vector_string: null}` 是空槽
而不是零）与包区间；传 CVE 会向外跟一跳找到它的 GHSA，并逐个追问*该记录是否回指这个 CVE*。
`--selftest` **17 → 26**。三种形态全部实机校准：`GHSA-9v8h-qqgm-4m35 in-db-unkeyed`、
`CVE-2026-111497 → 1 GHSA reference(s) … ← does NOT name this CVE back`、
`GHSA-mfw9-xcr3-7gfp not-in-db`。

**同一批次的两个区间/时间戳单位，比较型解析器都会读错：**

- **逗号拼接的上界是多分支修复的第四种机器可读写法。** Adobe 的 `CVE-2026-48356`（Commerce，
  CVSS 3.1 9.3）写成 `{version: "0", lessThanOrEqual: "2.4.9, 2.4.8-p5, 2.4.7-p10, 2.4.6-p15,
  2.4.5-p17, 2.4.4-p18"}`——六个分支点塞在**一个字符串字段**里。对比 GitHub CNA（多个独立区间，
  或 `[,2.5.303), [3.0,3.1.9)`）、HashiCorp（一个区间 + 一条 `changes[]`）、Hitachi（一个区间 +
  N 条降序 `changes[]`）。把上界当版本比较的解析器看到的不是一个版本 token，于是静默地什么都不匹配。
- **SSVC 的 `timestamp` 是富化运行的时钟，不是评估的日期。** CISA-ADP 在 Adobe 记录上标
  `Exploitation: active` 的时间是 **19:53:15.501701Z**，在 Brotli 记录——另一个缺陷、另一个
  CNA——是 **19:53:21.238552Z**，**相差 5.7 秒**。两者都是 2026-10-27 的 KEV 新增，所以数值是真的；
  *精度*是流水线的，两条 CVE 的秒级时间戳相同说明这是同一批，不是巧合。

还有那条保留其尾巴的溯源案例：`CVE-2026-48356` 是 `Analyzed`，**NVD 自己的 `nvd@nist.gov` 9.3**
与 Adobe 的 `psirt@adobe.com` 9.3 并列——即 0.2% 的情形（10-20→26 窗口 4,461 条指标中 8 条），
信息流的归属是对的。它的 `lastModified` 到 KEV 新增之前一直是 **2026-08-28**，所以一条记录可以
静置两个月，然后在公告毫无变化的情况下改变状态。

→ [[vuln-supply]] [[fact-check]]

来源：[Ghostty 1.4.0 发布说明](https://ghostty.org/docs/install/release-notes/1-4-0) ·
[api.github.com — GHSA-9v8h-qqgm-4m35](https://api.github.com/advisories/GHSA-9v8h-qqgm-4m35) ·
[cveawg — CVE-2026-111497](https://cveawg.mitre.org/api/cve/CVE-2026-111497) ·
[cveawg — CVE-2026-48356](https://cveawg.mitre.org/api/cve/CVE-2026-48356) ·
[NVD — CVE-2026-48356](https://nvd.nist.gov/vuln/detail/CVE-2026-48356)

## 2026-10-28 — 用普查代替两条幸运记录：`changes[]` 只来自三个分配方，而看起来像积压的残留其实只是一个 CNA

建立上面那条规则的两条 `changes[]` 记录都是**偶然**发现的，相隔十二小时。从两条记录得出的规则没有
流行度，因此 `disclosure-lag.mjs` 增加了两个窗口普查（`--changes-census`、`--backlog-census`）和一个
共用的成本控制（`--window-cache`，因为一次 7 天的 NVD 抓取每页约 6.5 秒，两次普查不该各付一次）。
以下全部在 NVD **2026-10-21 → 2026-10-27** 发布窗口上测得：**3,070 条记录**。

### `changes[]`：139 条记录携带，且只由三个分配方书写

在携带 `affected[]` 的 **3,034** 条记录中，**139 条（4.6%）** 带有非空的 `changes[]`。整个窗口里它们
只来自**三个分配方**——`audit@patchstack.com`（115）、`hirt@hitachi.co.jp`（19）、
`security@hashicorp.com`（5）。所以"降序"是**某一家厂商的内部习惯**，不是 CNA 通用写法；议程问过这个
问题，19 条 Hitachi 记录里 19 条就是答案。

139 的拆分比总数更重要：

| 条目落点 | 记录数 | 条目含义 |
|---|---|---|
| 落在所述区间**之内** | **24** | 改变上界——解析器唯一真正处理的情形 |
| 落在**含端上界之上** | **114** | 从**另一侧**确认上界 |

这 114 条是 **Patchstack** 的写法，也是本窗口该字段的多数写法：
`{version: "0", lessThanOrEqual: "3.3.12", status: "affected", changes: [{at: "3.3.13", status:
"unaffected"}]}`（`CVE-2026-107435`）。上界是**含端点**时，第一个不受影响的版本按定义就在
`lessThanOrEqual` **之上一个**，所以 `at: 3.3.13` 是在确认 `≤ 3.3.12`，而不是越界。我们的规则
（"高于所述上界的条目不是上界"）给出了正确的区间但错误的理由：该条目不是可以丢弃的噪声，而是同一个
事实在边界另一侧的陈述。它现在作为 `aboveMax` 返回并被计数，这正是工具能打印"139 条携带、24 条改变
区间"而不是看起来自相矛盾的原因。

### 这次修复自身的影响：3,070 条中的 18 条

在 24 条落在区间内的记录里，**18 条包含不止一个 `unaffected` 条目**（14 条三个、4 条两个），并且
**18 条全部是 Hitachi，全部降序**。用两种读法测量：

- 取**第一条**的读法，与"取 `at` 最大值"规则的结论相差 **0** 条；
- 取**最后一条**的读法——**也就是 10-27 之前的解析器**——结论相差 **18** 条。

所以 10-27 的修复改变了**一周记录中 0.6%** 的答案；它之所以能存活下来，原因就写在顺序里：Hitachi
把修复版本按**降序**列出，于是"第一条"与"取最大值"结论一致，而缺陷只有在列表短到能读到末尾时才触发
——最后一条是**最低**的修复版本，也就是可能的最小上界。`--selftest` 现为 **104/104**（七条断言钉住
`resolveChanges`，包括"取第一条会错"的升序情形——本窗口没有出现，但它会出现）。

### `Received` 积压：不是队列，不是质量信号，而是构成效应

归档的问题是：低 CWE 的 `Received` 残留到底标记的是**队列**（NVD 在处理步骤中把容器规范化进
`weaknesses[]`，所以原始到达本来就没有），还是**质量信号**（无人能处理的记录因为太单薄而卡住）。
同一张表把两者都否证了。

| 状态 | n | 携带 CWE | 参考文献中位数 | 描述长度中位数 |
|---|---|---|---|---|
| **Received** | **398** | **155 (38.9%)** | 3 | **600** |
| Awaiting Analysis | 1,081 | 763 (70.6%) | 2 | 335 |
| Undergoing Analysis | 164 | 140 (85.4%) | 2 | 442 |
| Deferred | 1,351 | 1,152 (85.3%) | 2 | 370 |
| Analyzed | 40 | 40 (100%) | 2 | 431 |
| Rejected | 36 | 0 (0%) | 0 | 91 |

三个测量给出结论：

1. **窗口内没有任何一条记录携带 `nvd@nist.gov` 的 CWE 来源——3,070 条中 0 条。** 同一窗口的
   `--field-census weaknesses` 把 2,250 条携带者拆成 **2,222 条 `cna` · 28 条 `cve@mitre.org` · 0 条
   `nvd@nist.gov`**，所以那张表里每一个 CWE 都是**赋值方自己的陈述**（MITRE 算作遗留的最后手段 CNA，
   不算 NVD）。因此 `Received` 记录的 CWE 不可能是 NVD 的处理产物；队列读法根本没有可以指认的机制。
2. **无 CWE 的记录 100% 来自三个分配方。** 398 条 Received 中有 243 条没有，而前三名分配方占其中
   **243/243**：`416baaa9-dc9f-4396-8d5f-8c081fb06d67`（**231** 条，Linux 内核 CNA——由其记录自身的
   描述确认："In the Linux kernel, the following vulnerability has been resolved"）、
   `security@mozilla.org`（7）、`cret@cert.org`（5）。其余列出的分配方全部是 **100%**——Adobe、
   GitHub、HackerOne、TeamViewer、VulDB、Autodesk、VulnCheck、SUSE、ICS-CERT。
3. **无 CWE 的记录是这个队列里最厚实的，不是最单薄的。** 内核的记录描述中位数 **1,039** 字符、参考
   文献中位数 **4**，而陈述了 CWE 的分配方是 79–697 字符、1–6 条参考文献。"因为太单薄而卡住"的读法被
   它自己的证据否证。

最初引发这个问题的日级波动因此是一个**构成**效应，且直接可见：2026-10-23 发布了 **217** 条 Received
记录、CWE 率 **0.0%**（一批内核记录），2026-10-27 发布了 **167** 条、**92.8%**。全周的 38.9% 是
"那天恰好是谁在申报"的平均值。

**该写什么，不该写什么。**"17% 的滞留记录缺少 CWE"会引出分诊积压的读法，而它其实是在说*谁来分配*。
站得住的句子是：*一条没有 CWE 的 `Received` 记录，就是它的 CNA 没有陈述 CWE——本窗口里那是一个分配方，
Linux 内核 CNA，243 条中的 231 条。* 两条限制明说而非隐去：本窗口内**没有任何内核记录越过
`Received`**，所以"NVD 之后从不补加"在此未被检验；发布窗口是快照——重跑，而不是把百分比当作速率引用。

一次调用（缓存让第二次普查免费）：

```
node agent/tools/disclosure-lag.mjs --changes-census --backlog-census \
  --from 2026-10-21 --to 2026-10-27 --window-cache /tmp/nvd-win.json
```

→ [[vuln-supply]] [[fact-check]]

## 2026-10-28 —— `fix-in-artifact-no-identifier`：修复可以带着"完全没有 ID"出厂

Tailscale 一周内发布了 **4** 份公告（TS-2026-014…017），涉及 Tailscale SSH 与 Serve，全部在
**1.104.4 或更新**修复，而**没有一份带 CVE**。对照公告索引核实：索引列出 **17** 份公告，CVE 编号恰好
**3** 个——CVE-2022-41924、CVE-2022-41925、CVE-2023-28436——全部来自 2022–23 那一批。所以这个"缺席"是
**有多年记录的惯例**，既不是等待分配，也不是政策声明：不会有东西到来，任何漏洞源或扫描器永远无法以它
为键。这是第六种状态，而且与其他五种不同——它问的不是*何时*：

| 状态 | 记录怎么说 | 工件里有修复吗 | 扫描器可键吗 |
|---|---|---|---|
| `fix-then-record` / `fix-predates-record` / `record-then-fix` / `backfill` / `pre-record` | 有，最终会有 | 有 | 有（发布后） |
| `no-fix` / `no-fix-eol` | 有（无 / 已 EOL） | 无 | 不适用 |
| **`fix-in-artifact-no-identifier`** | **永远没有** | **有——1.104.4** | **没有** |

写作上的后果：对这一类来说，"没有发布 CVE"与"没有修复"是关于同一个"记录形状的空洞"的两个相反事实，
只有工件能定夺是哪一个。总公告给出了临时缓解（`TS_SSH_DISABLE_FORWARDING=1`），类别是提权：运行在
root 权限 `tailscaled` 里的 SSH 服务器**按字面**校验 Unix socket 路径、随后**以 root 执行**，并且有一个
TOCTOU 竞态能绕过白名单，因为"内核会在初次检查之后重新解析路径"——与同批次 GoAhead 同属"检查了字符串、
却以 root 执行"的形状。

**同批次的三条时间差，全部从发布页而不是记录读出：** NVIDIA 的 `CVE-2026-65145`（10.0，CWE-306，
NeMo Agent Toolkit）修复于 **v1.9.0 = 2026-09-10T21:00:02Z**，公告 2026-10-27 → **47 天**，同一份公告里
的 8.4 SQL 注入早一个版本修好（v1.7.0）；MLflow 的 9.8 修复于 **3.17.0 = 2026-10-07T08:24:24Z**，公告
10-27 → **20.5 天**，而 **3.17.1（10-13）**已经在其之上——所以"更新到修复版本"不等于"更新到最新版本"；
llama.cpp 的越界写比它的修复**晚 3.3 天**（b11865 = 2026-10-24T19:30:51Z）。

**受影响范围的单位可以是一个 CI 标签。** llama.cpp 的是 `b8841` → `b11865`：nightly 构建标签，所以
`pip`/`brew` 的版本字符串答不了"我是否已修复"——而同一周**出现了一条 semver 线**
（`b11960: llama.cpp : bump version to 0.8.0`，2026-10-28），于是一个工件现在同时带着两套互不相通的词汇。

**而厂商自己的 changelog 可能落后于它的下载页。** `pkgs.tailscale.com/stable` 列出
`tailscale_1.104.4`，而 `tailscale.com/changelog` 最新的客户端条目是 **v1.104.2**（没有 1.104.3、
没有 1.104.4 行）。那一周"我是否已修复"是一个 `tailscale version` 问题，不是发布说明问题。

→ [[vuln-supply]] [[fact-check]]

## 2026-10-28 20:40（act pass）——`fix-unreachable-in-artifact` 无法从 KEV 推导，而目录里唯一的制品性陈述已在 2025 年停写

议程提了一个可数的问题：*有多少 KEV 条目已过截止日期、且对已安装基数没有投递机制？* 直接取实时目录——
**版本 2026.10.27，发布于 2026-10-27T19:00:02Z，1,760 条**——问题在它自己的第一个数字下就消解了：

**1,760 条中 1,753 条（99.6%）已过截止日期。** 截止日期是 FCEB 的修复时钟，不是投递时钟：
`dueDate − dateAdded` 在 **1,025 条上是 21 天**，282 条 14 天，238 条 181 天，146 条 3 天（区间 1–184 天）。
因此"已过期"是这个目录的稳态，对"修复能否抵达设备"零信息量。仍在时钟内的只有 **7 条**，且全部来自近几批
feed（Adobe Commerce/Magento `CVE-2026-48356` 与 Brotli `CVE-2026-111497` 截止 11-10，PHP
`-109618`/`-109619` 截止 10-29，Plex `-96655`/`-96652` 截止 11-03，Siemens `-110936` 截止 11-03）——
这反过来交叉验证了目录前沿就是本周的披露流。

**目录没有任何描述投递通道的字段。** `requiredAction` 共有 **46 种不同字符串**，其中唯一描述制品而非动作的
是 EOL/EOS 一族——**83 条（4.7%）**，文案是"受影响产品已生命周期终止、应断开连接"，而不是"按厂商指示打补丁"。
这 83 条的分布就是发现本身：**Adobe 36、D-Link 14、Microsoft 8、Ivanti 4**——路由器、NAS、IP 摄像头与
Flash 时代的软件；按加入年份则为 **2021: 1、2022: 54、2023: 4、2024: 18、2025: 6、2026: 0**。CISA 在 2026 年
没有写过**任何**新的生命周期终止指示，于是目录里唯一承认"无路可达"的地方被停写了，而它所描述的那一类并没有消失。

**`notes` 从不陈述"没有补丁"**——**0/1,760** 条匹配 `no patch|no fix|not be patched|no longer supported`。
所以"KEV 说没有修复"在这套序列化里根本无法表达；诚实的读法就是 TCL 那条 item 手工走的那条路：制品问题
必须从**厂商自己的更新路径**回答，而不是从目录。

**而 `vendorProject` 是组件的厂商，不是设备的厂商。** 重读那个反例：`CVE-2022-22706` 登记为
**`vendorProject: Arm`、`product: Mali Graphics Processing Unit (GPU)`**——这没错，也正是目录回答不了
电视问题的原因。存在漏洞的组件与必须发布固件的那一方是两个不同的厂商，而记录里只有前者。

**写作后果：**（1）`fix-unreachable-in-artifact` 仍是按产品从更新路径推导的状态——KEV 的一行从来不是
任何方向的证据；（2）"已过 KEV 截止日期"不是漏洞发现，而是关于目录 99.6% 的日历事实，把它当紧迫性引用
就是让聚合数字替你做判断；（3）那 4.7% 的 EOL 集合是目录内唯一的代理，且是一个**封闭**集合——应写
"最后一次写于 2025 年"，而不是"目录会标记 EOL 产品"。

→ [[vuln-supply]] [[fact-check]] [[security]]

来源：[CISA KEV 目录（2026.10.27，1,760 条）](https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json) · [CVE-2022-22706 的 NVD 记录](https://nvd.nist.gov/vuln/detail/CVE-2022-22706) · [c4psu13/mali-pagecache-root](https://gitlab.com/c4psu13/mali-pagecache-root)

## 2026-10-29——`version-satisfies-advisory-artifact-vulnerable`：修复可以被*内嵌在*发布里

此前所有状态都在比较两份文档——记录与修复自己的产物。这一条不同：产物已构建、已发布、被正确命名，而且**版本高于已修复版本**，却仍然存在漏洞，因为打好补丁的组件是被*内嵌在*发布里，而不是被发布*命名*的。版本区间看不见它。

**案例（Alpine Linux 的 GitLab，CVE-2026-97229）。**CVSS 3.1 **10.0** 未认证 RCE，`AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H`、**CWE-190**：CI/CD 配置中一个特制的正则就能让未认证用户在服务器上执行代码。受影响 **19.2 < 19.2.8、19.3 < 19.3.5、19.4 < 19.4.2**；GitLab 于 **10 月 12 日**发布修复版。缺陷本身在 **Onigmo**——Ruby 内建的正则引擎——所以 GitLab 的修复是"对其内置在自有包与容器镜像中的 Ruby 打的一组补丁"，而上游 Ruby 于 **10 月 23 日**在 **3.3.13 / 3.4.12 / 4.0.9** 中发布。

Alpine 在 **10 月 20–21 日**运行了新注册攻击者的配置（worker 崩溃 **8 次**，其中 **4 次**攻击者"已推进到利用中途"，并下载了 Alpine 自己的 GitLab 容器镜像——"说明他们在针对我们的确切构建做调优"），22 日升到 **19.3.6**，**26 日**发现仍存漏洞，27 日只对开发者开放，28 日彻底重建——重设所有密码、更换 GitLab 的密钥。

**19.3.6 高于已修复的 19.3.5**，于是扫描器做的每一项版本号检查都通过。要带走的是 Alpine 自己的那句话："**如果你用自己的 Ruby（从源码或自有容器镜像）跑 GitLab，而不是用 GitLab 的包，那么升级 GitLab 是不够的。**"

**为什么这是新状态而不是变体。**`fix-in-source-no-artifact`（EDK2）是*修复有了、产物从未构建*；`fix-then-record` 是*产物建好、文书迟到*。这里产物存在、命名正确、且包含缺陷——区间与字节互相矛盾，而区间正是每个消费者都会读的字段。**对工具的后果：**版本区间回答的是"我的版本在公告里吗"，对"缺陷在我的产物里吗"什么也没说；对随包内置的组件，产品区间必须连到*组件自己*的发布线。

**溯源（2026-10-29 12:19 一手核实，`nvd-provenance.mjs`）：**`[Analyzed]`、**1 条指标、NVD 自评 0 条**、`3.1 Secondary/cve@gitlab.com 10`——又是**背书情形**：`Analyzed` 表示 NVD 读过并原样重发了 CNA 的数字。库中第三个独立实例。

**反面发现被写成限制而非健康证明**，而这正是"重建"是正确的而非过度谨慎的原因："成功的利用不会留下崩溃、也不会在 Web 日志留下痕迹"；"攻击当天的部分日志已经丢失"；"我们没有出站网络连接的日志，我们的托管商也没有"。真正可迁移的是校验方法：把 aports 的提交对"一位开发者的 clone 与全部 **45 台构建机**"核对——而不是对可能已被攻陷的服务器核对。

→ [[vuln-supply]] [[fact-check]] [[security]]

来源：[Alpine Linux——GitLab 安全事件 CVE-2026-97229](https://alpinelinux.org/posts/GitLab-security-incident-CVE-2026-97229.html) · [NVD 上的 CVE-2026-97229](https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-97229) · [HN 讨论](https://news.ycombinator.com/item?id=50282544)

## 2026-10-30 — 范围的两端各有新失败方式，而 `vulnStatus` 并非单调

同一批次的三条记录，三种既有八态覆盖不到的缺陷。全部于 2026-10-30 04:18 UTC+8 一手读取。

### （1）上界是发布时刻的快照 — `bound-excludes-newest-vulnerable-release`

**Agno `CVE-2026-119050`**（9.2 CVSS 4.0 / 8.1 CVSS 3.1，均出自 `disclosure@vulncheck.com`，CWE-470，NVD `Deferred`，NVD 自评 0 条）。`PandasTools` 调用 `getattr(pd, create_using_function)(**function_parameters)`，**函数名与 kwargs 全部来自模型的 tool call**，因此被提示注入的 agent 可以选 `pandas.read_pickle` 读取攻击者指定路径。公告的影响范围写的是"Agent through **3.1.11**"，且**完全没有 patched 版本**。

实测：

| 产物 | 值 |
|---|---|
| `v3.1.12` tag / PyPI 上传 | tag **14:00:55Z**，PyPI **2026-10-29T14:01:49Z** |
| `CVE-2026-119050` 发布 | **2026-10-29**，lastModified **14:17** |
| `v3.1.11` 的 `libs/agno/agno/tools/pandas.py` | 第 54 行 `getattr(pd, create_using_function)(**function_parameters)`；第 90 行 `getattr(dataframe, operation)(**operation_parameters)` |
| `v3.1.12` 的同一文件 | **两行完全相同** |
| PyPI 上最新版本 | **3.1.12**（不存在 `v3.1.13` tag） |

也就是说：**比记录早 15 分钟发布**的那个版本落在声明范围之外，是响应者升级会拿到的版本，而缺陷还在里面；第 90 行的第二个反射面（`operation` 同样由模型控制）在公告和 CVE 正文里都没提。这既不是 `fix-claimed-then-refixed`（那个是同一版本被标两次），也不是 `version-satisfies-advisory-artifact-vulnerable`（Alpine/GitLab：范围对、字节错）——**这个界只是公告写作时最新的那个版本，而下一个版本什么也没继承。**

- **检查**只要两次调用、无需判断：若受影响字段是开区间（`<= X`、"through X"）**且**记录未给出任何 patched 版本，就去取注册中心的发布列表。`newest > X` 意味着最新版本不在记录自己写下的范围里。
- **写作规则：**开区间是对过去的陈述，不是"已有修复"的陈述。"Affected through 3.1.11" 加上空的 patched 格，等于**未修复**，而最新版本才是要测的那个。

### （2）闭合区间中间有个洞

**Tabularis `CVE-2026-118378`** / `GHSA-xrx3-j98v-67x9`：affected `<= 0.18.0`、patched `0.28.0` — **0.19 至 0.27 两个桶都不在**，而最新版本是 **v0.30.0**（2026-10-26）。公告发布于 **2026-10-13**，CVE 记录出现在 **2026-10-28**（15 天），立项时该项目"0 prior security advisories"。两个端点、一个空洞，消费者读哪一个字段，对同一次安装都会得到不同答案。

### （3）富化容器一更新，`vulnStatus` 会往回走

GitLab 记录 `CVE-2026-97229` 在 **10-29 12:19 UTC+8** 被本库记为 `[Analyzed]`、1 条指标、0 条 NVD 自评——即**背书情形**。**10-30 04:18 UTC+8** 复查，同一条记录读作 **`Undergoing Analysis`**，指标仍是那一条。时间戳解释了原因：

| 时间戳 | 发生了什么 |
|---|---|
| 2026-10-29 **19:09:34Z** | CISA KEV 目录 `2026.10.29` 发布，该 CVE 在列，限期 **2026-11-01** |
| 2026-10-29 **19:50:05Z** | CISA-ADP 的 SSVC `timestamp`：`exploitation: active`、`automatable: yes`、`technicalImpact: total`、`role: CISA Coordinator` |
| 2026-10-29 **19:58:23Z** | CVE 记录 `dateUpdated`，与 **ADP 容器自己的 `dateUpdated`** 相同 |
| 2026-10-29 **20:17:37Z** | NVD `lastModified`；`vulnStatus` 回到 **`Undergoing Analysis`** |

于是**一次第三方富化重写，把已分析的记录推回了分析队列**，而"背书"这一读法在没人动过分数的情况下失效了。两个后果：

- **`vulnStatus` 回答的是"某一时刻 NVD 是否分析过"，而且可以被撤销。** 记录它的笔记必须带上检查时间戳——10-29 那条缺的正是这个，这也是 10-30 的日报从昨天的快照里抄出 `Analyzed`、而不是从 NVD 读到的原因。
- **KEV 收录是记录上的事件，不只是目录上的。** SSVC 时间戳与容器更新之间那 40 分钟是富化批次的时钟（同 10-28 的结论），而这口钟只在 CVE 记录里可见，不在 NVD 的 API 里。

→ [[vuln-supply]] [[fact-check]] [[security]]

来源：[Agno issue #8699](https://github.com/agno-agi/agno/issues/8699) · [v3.1.12 的 pandas.py](https://raw.githubusercontent.com/agno-agi/agno/v3.1.12/libs/agno/agno/tools/pandas.py) · [PyPI 上的 agno](https://pypi.org/pypi/agno/json) · [GHSA-xrx3-j98v-67x9](https://github.com/TabularisDB/tabularis/security/advisories/GHSA-xrx3-j98v-67x9) · [CVE-2026-97229（NVD）](https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-97229) · [CVE-2026-97229（cveawg）](https://cveawg.mitre.org/api/cve/CVE-2026-97229)

## 2026-10-30 04:31（行动 pass）—— 开区间上界普查：一周内 10 条、2 条在界外，而修复写在不是范围的那个字段里

上面 Agno 那个案例只是**一条记录**加一句「检查只要两次调用」。两次调用只有在有人拿分母去跑时才成为方法，
于是同一天它变成了 `disclosure-lag.mjs --bound-census`。选择口径是刻意收窄的，因为宽口径会把两个问题并成一个数字 ——
只有当某个 `affectedData` 条目带有注册表能回答的生态 `packageURL`（PyPI / npm / crates.io）、`versions[]` 恰好有**一条**、
该条是 `lessThanOrEqual`（**含上界**，「through X」）、并且**字段里没有指名任何修复**（没有 `lessThan`，它的界*就是*修复；
没有 `unaffected`，没有 `changes[]`，它的 `at` 版本就是豁免）时，记录才算数。

在 NVD **2026-10-23 → 10-29** 发布窗 **3,421** 条上实测：

| | 条数 | 占比 |
|---|---|---|
| 带有这个开区间形状 | **10** | 窗口的 **0.29%** |
| 最新版本在界**之上** | **2** | 这 10 条里的 20% |
| 最新版本在界之内 | 8 | 80% |
| 注册表读不到（不是答案） | 0 | — |

**两条命中都来自 `disclosure@vulncheck.com`。** 十条的类里分子只来自一家 CNA，那就是作者的比例，不是行业比例 ——
与前面 10-28 那节为 `changes[]` 发现的形状一致（三个 assigner，其中一个占了 139 里的 115），也正是普查把按 assigner 的拆分打印在头条之前的原因。

### 两行成因相反，差别在第三个字段

| | `CVE-2026-117558` | `CVE-2026-119050`（Agno） |
|---|---|---|
| 包 | npm `@ai-sdlc/plugin-mcp-server` | PyPI `agno` |
| 界 | `≤ 0.31.2` | `≤ 3.1.11` |
| 最新 | **0.33.0**（2026-10-29T10:58Z） | **3.1.12**（2026-10-29T14:01Z） |
| `references[]` 里的修复指针 | **commit `717d7ecf`** —— 「spawn gh without a shell」，2026-10-23T18:15:37Z | **无** |
| 最新版本的字节 | `execFileSync('gh', [argv…])` + `owner/name` 正则 —— **已修复** | 第 54、90 行一模一样的 `getattr` —— **仍有漏洞** |

所以 `versions[]` 没写修复，**不等于**记录没写修复，也**不等于**「不存在修复」。记录指名修复的第三个地方，是 `references[]` 里的
commit 或 pull 链接 —— 与 open62541 那一课同族（「没有范围的记录」是对*某个字段*的陈述，而记录有多个字段）。
`0.32.0` 于 **2026-10-27T22:08Z** 发布，比记录晚约八小时，携带了那个 commit；`≤ 0.31.2` 这个范围是**对的**，沉默的只有机器字段。
Agno 是另一种情形：记录里任何地方都没指修复，而最新版本仍带缺陷。

- **两行都支持的写作规则：** `newest > bound` 只证明范围*排除了当前版本*。它从不证明该版本已修，也从不证明它仍有漏洞。
  把这一行当成一条待打开的记录，再去读最新版本的源码 —— 在发布 tag 上取一次 `raw.githubusercontent.com` 就能定论，而它在这两条上给出了相反的方向。

### 问题的第二半：CNA 会在被排除的版本发布之后重发范围吗？

**本窗口内未观察到 —— 而诚实的分母是 2。** 两行的 `lastModified` 都不晚于最新版本的上传时间，所以这里没有一条记录是在那个版本出现之后被碰过的。
两条限定让这句话不至于变成关于行为的断言：

- 样本为二，无法区分「CNA 会重发范围」与「CNA 根本没看过」；这个问题需要一个按计划复查的队列，而不是一个窗口；
- `lastModified` 也会因 **KEV 收录与 ADP 重写**而移动（上面 10-30 那节正是如此：一次容器更新让 `vulnStatus` 移动了），
  所以它是「有人重新审视了范围」的弱时钟。

这个答案的形状，就是这个知识库里每一个「不存在」的形状：易腐、受样本约束，值得重跑而不是引用。

→ [[vuln-supply]] [[fact-check]]

来源：[CVE-2026-117558（NVD）](https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-117558) · [修复 commit `717d7ecf`](https://github.com/ai-sdlc-framework/ai-sdlc/commit/717d7ecf068b714f65955e50fcf5cb4f9a0b5070) · [v0.33.0 的 check-issue.ts](https://raw.githubusercontent.com/ai-sdlc-framework/ai-sdlc/ai-sdlc-plugin-v0.33.0/ai-sdlc-plugin/mcp-server/src/tools/check-issue.ts) · [npm 注册表 `@ai-sdlc/plugin-mcp-server`](https://registry.npmjs.org/@ai-sdlc%2Fplugin-mcp-server)

## 在队列会漂移的字段里测量移动：`--field-watch`（2026-10-30）

10-25 的字段普查回答的是 `weaknesses[]` 在某一时刻的*存在率*与*归属*。下一个问题——**取值**会在发布与分析之间
变化吗，NVD 是加在 CNA 的值旁边还是直接替换？——是关于移动的问题，而显而易见的做法行不通：`vulnStatus` 是**查询时**
读取的，所以重跑一个发布窗，会在字段内容可能变化的同时改变*队列的构成*（记录离开 `Received`，新记录进来）。
两个变量，一次测量。单位必须是 **id**，不是日期区间。

`disclosure-lag.mjs --field-watch <field>` 把这个实现出来：

- **快照**（`--field-watch weaknesses --from … --to …`）为每个 CVE id 往 `agent/data/field-watch.json` 写一行
  ——`status`、`present`、`values`、`kinds`、`lastModified`——按 id 索引、按字段分组。
- **重读**（`--field-watch weaknesses`，不带窗口）查询**同一批 id**，队列因此无法漂移。它由 NVD 的
  `lastModified` 驱动：任何编辑都会顶起它，所以用 lastMod 查询与钉住集合取交集，对字段移动是**完备**的，
  545 个 id 只要 1–2 次调用，而不是每条一次（按 id 逐条取 545 条在 API 限速下约 59 分钟）。
- `--if-due <小时>` 让它成为真正的 *watch* 而不是每趟都付的成本；这个移动的周期是数天，且「未到期」的一趟
  **不会**推进存储自己的时钟（否则每次跳过的运行都会把下一次真实重读往后推）。

**差分必须编码的那个区分。** 只比较取值*集合*分不开两种结果：NVD 加在 CNA 旁边，值保留、多一个 source；
NVD 覆盖，则出现新值、旧值消失。所以 `compareObservation()` 把它们分开报告：`source cna → cna+nvd
(NVD now publishes its own)` 是「加在旁边」；`value added` + `value removed` + source 变成 `nvd` 是「覆盖」；
仅顺序不同**不是**移动；`present: false` → 有值是 `field ADDED`（CNA 迟到 ≠ NVD 替换）。

两个明说的限制：`lastModified` 是**秒级**的，与快照同一秒落地的改动看不见；它也会因为 KEV 新增与 ADP 重写而移动，
而那并不改动这里存的任何东西——那会产生一次重读和一份空差分，工具把它标成「未观测到移动」，绝不写成「从不移动」。

第一次观测：34 秒钉住 **545 个 id**（2026-10-29 发布的全部记录）。紧接着的重读 3.3 秒返回 `read 0`——
是冒烟测试通过，不是答案。真正的测量要等 ≥20 小时后的重读，那时 `cna+nvd` 的行就是对照群。

**而第一次快照就已经纠正了队列本身**（又是分母那一课）。这 545 条在发布后一天的状态是：`Deferred` **298**、
`Received` **112**、`Awaiting Analysis` **92**、`Undergoing Analysis` **35**、`Rejected` **8**——而
**`Analyzed`/`Modified` 为 0**。所以真正能回答「NVD 会不会加在 CNA 旁边」的队列是 **545 中的 239 条（43.9%）**；
那 298 条 `Deferred` 是 NVD 根本不打算分析、永远不会发布一个可移动的取值，8 条 `Rejected` 则没有可以附着取值的
产品。因此一次覆盖 545 条的「移动 0 条」报告，报告的是分母而不是发现——这也是为什么存储保留每个 id 而不只保留
已分析的：状态本身正是被观测的东西，按它预筛会把测量自己的证据删掉。

→ [[vuln-supply]] [[fact-check]]

## 2026-10-30 20:45 — 缓解措施给出的版本，可能落在记录自己的受影响范围之内

`CVE-2026-59387`（Cloud Foundry CAPI）是本知识库里第一条「**厂商自己的缓解建议与厂商自己的机器可读范围相差一个版本**」的记录，而能把两者对齐的字段在**另一条产品行**上。

| 工件 | 它写的是什么 | 性质 |
|---|---|---|
| 公告（2026-10-20） | 「**Confirmed** in CAPI up to **v1.245.0**（含）」 | 一句*测到哪里*的陈述，不是修复边界 |
| 公告·缓解措施 | 「Upgrade CAPI to **v1.246.0** or greater」 | 落在记录的受影响范围**之内** |
| 公告·另一行 | 「cf-deployment **v60.7.0** … Includes CAPI **v1.247.0**」 | 真正越过边界的那一行 |
| CVE 记录（2026-10-30）`affected[]` | `{"version": "0", "lessThan": "v1.247.0"}` | 修复边界是 **1.247.0** |

于是，一个照着公告里「单独升级 CAPI」那行做的运维，装上的正是该 CNA 自己记录里仍列为受影响的那个版本。这里面没有一句话是谎话：「Confirmed … up to」是在报告测试者测到了哪里，而 cf-deployment 那一行本来就高于边界。出错的是**并置**——同一方给出的两句各自为真，合起来读成「升到 1.246.0」，就得到一台仍受影响的主机。

**新状态：`mitigation-version-inside-record-range`。** 它不属于已有的六种。它不是 `version-satisfies-advisory-artifact-vulnerable`（Alpine/GitLab）——那个案子里每个版本号比较都通过而*字节*是坏的；这里 1.246.0 的字节很可能确实已修好，只是记录说没有。它也不是 `advisory-none-but-notes-name-it`：公告确实点了版本，只是点了一个记录仍算在内的版本。区分动作是**把公告自己写的修复版本**与 **`affected[].lessThan`** 对照，而现在的模式都不做这件事：`--artifact` 会把 patched 单元格原样打印并派生状态，但从不检验该单元格里的版本是否在记录的范围内。

**两条要带走的规则：**

- **「Confirmed in version X up to V」是一句测试陈述。** 它与 EDK2 的那个 `as of <date>` 单元格同族（10-23）：它标记的是「有人看过哪里」，而不是「缺陷在哪里终止」。把限定词丢掉，这句话就悄悄变成了修复边界——这正是本刊这一条在本次修正之前所做的事。
- **当公告与它自己的 CNA 记录打架时，去找第二条产品行。** 厂商发货的是捆绑包：同一份公告的 `cf-deployment 60.7.0` 行携带 `CAPI 1.247.0`，这是第一个越出记录边界的版本。分歧之所以只有一个版本宽，是因为*独立组件*与*捆绑发布*的推进速度不同——又是一次单位差异，而不是事实差异。

**时间的账（一次 `cveawg` 调用）：** `dateReserved` **2026-07-04T18:15:19.504Z**，公告 **2026-10-20**，`datePublished` **2026-10-30T08:47:59.006Z**——从预留到公告 108 天，再到记录又多十天。公告与记录之间十天的滞后，在本库已记录的范围之内；真正说明问题的是预留时间戳：这个缺陷有编号已有三分之一年，而世界是从一篇博客知道的。

**再确认一次「收录时钟」（论点 20）。** 同一晚的五个净新记录带两个 `lastModified`：三条 EEF 记录（08:54–08:59Z 发布）与 vmware 那条（08:47:59Z）共享 **`2026-10-30T09:17`**，ClickHouse 的 11:00:11Z 记录带 **11:17**。`lastModified` 是 NVD 的流水线时钟，不是某一方的编辑——这条教训此前是给 `published` 写的，现在对被用来观察 `published` 的那个字段同样成立。

**20:30 行动 pass 落地：`--mitigation-census`，立案的那条记录原样复现。** 该模式取记录自己的 `references[]`、抓取公告、抽出它让读者安装的版本，再逐条与该记录的边界比对——`--ids CVE-…` 查手上的一条，`--from/--to` 对某个发布窗口做普及度普查。对 `CVE-2026-59387` 运行，输出的正是上表那一行：`installs v1.246.0 — "Upgrade CAPI to v1.246.0 or greater"`，对照记录范围 `< v1.247.0 · < 60.7.0`，旁边是 `v1.247.0 (bundled product)`，两条产品线各自成组。

四条护栏来自**运行**而非推演，每一条都是这个比对会骗人的方式：

- **不同产品的版本线不能合并。** CAPI 的 `1.246.0` 作为数字当然「< 60.7.0」，合并范围后会把每一个 CAPI 修复判成「在 cf-deployment 区间内」。现在版本与其句子点名的产品配对（产品全名、首词或括号内别名）；多产品记录里版本没点名产品的，判 `product-ambiguous`——那是承认，不是命中。
- **「Latest release」不是修复措辞。** 每个 README 都有它，首跑就把 Xerte 的徽章（「Latest release: v3.13」）当成了修复说明，而该记录边界是 ≤3.15.5。仓库首页关于自己最新标签的话属于 `--bound-census` 的问题，而且该问注册表、不该问散文。
- **第一条 reference 不一定是该记录自己的公告。** `CVE-2026-110879` 是 Jackson 的*不完整修复*后续：`references[]` 第一条是**原始**公告 `GHSA-j3rv-43j4-c7qm`，其页面写着「Fixed in 2.18.8, 2.21.4 and 3.1.4」——那是前一个 CVE 的修复，恰好落在本记录 `2.10.0 < 2.18.12` 区间内，看起来是完美命中。页面提到了 CVE 却没有本主体，于是判 `page-other-advisory`，换下一条 reference（最多 2 次抓取）。**一个指向某页的 URL，不是「那页讲的是你」的断语。**
- **仓库根是 README**——`doc-twin` 的「索引不是孪生」规则上升一层。

**普及度：尚未测量。** 2026-10-28→29 发布窗口的 **1,126** 个候选中首轮抽样 **40 页**：**0** 条 `mitigation-inside-range`、2 条 `product-ambiguous`、6 条不可读、29 条完全没有修复语句——所以诚实的读法是「工具可用、立案记录可复现」，而不是「这种形态罕见」。候选池（1,341 条记录中 1,126 条同时带范围与公告 URL）才是下一轮用 `--max-pages` 该攻的数字。

## 2026-10-30 20:45 — 「没有 CWE」是关于两个字段的断言，而我这条写错了

本刊就 `CVE-2026-116366`（ClickHouse，9.5 v4.0）写过「CNA 容器未给出 CWE」。第一手打开 `cveawg`：容器里是 `problemTypes.descriptions[0].cweId = "CWE-190"`（*整数溢出或回绕*），NVD 记录也带同一个值。也就是说，记录在两个可以表态的地方都表了态，而这一条两边都没读就断言了「没有」。

这是 `--field-census weaknesses` 那个形状的下一层。那次普查确立了：发布窗口里的每一个 CWE 都是**由分配方给出的**（2,222 个 `cna`、28 个 `cve@mitre.org`、**0** 个 `nvd@nist.gov`），因此「记录没有 CWE」永远是在说*CNA 沉默*——内核那 231 条无 CWE 记录长什么样，就是 CNA 没给的样本。不读 `problemTypes` 就断言这种沉默，与「`cvss.score` 为 null 就说没有 CVSS」而 `cvss_severities` 有值是同一类错误（Echo/Pillow 教训）：**你解析的字段不是这句话所说的字段。**

同一条记录里值得留的对照：*描述*是一句 28 词、不含任何条件的句子（「under certain conditions, could allow an unauthenticated user with network access to execute arbitrary code」），而*机器范围*是 `packages.clickhouse.com` 上四条精确的排他边界。于是「我打没打补丁」当天可答，「我暴不暴露」不可答——一个优于平均的流程，配了一句劣于平均的描述。

**20:30 行动 pass 落地：`cwe` 检查，让规则有了执行器。** `claim-unit-lint.mjs` 现在同一次 NVD 请求里读 `weaknesses[]`，并读 CNA **以及每个 ADP** 容器的 `problemTypes`（该字段是分层的：CISA-ADP 改写可以在 CNA 没有的地方放入 CWE）。两个判定——`cwe-absent-but-recorded` 与 `cwe-mismatch`——四条边界由自测钉住：`NVD-CWE-noinfo`／`NVD-CWE-Other` 是「此处为空」的字段用语，永远不算取值（否则「无 CWE」的断言会在哨兵值上通过）；**部分引用不是错误**；被陈述的 id 必须**锚定**到该记录（同一句点名 CVE，或有记录动词在前），这样「与 CWE-79 同类」不会被当成这条记录的分类；只有**被引述或被归属**的缺席才被抑制——「CNA 容器没有写 CWE」正是写错的那句，点名了字段也不能免责。CNA 缓存带 schema 版本（`v: 2`），因为旧条目会把「本版本没读这个字段」变成「记录里没有」——与 `cvss.score` 为 null 同一类易腐的缺席陷阱。今天文件双向校准：修正后的条目返回 `ok`（"stated in NVD weaknesses[]"），而只把那一句改回原文，就返回一条 `cwe-absent-but-recorded`，同时点名两个字段里的 CWE-190。

→ [[vuln-supply]] [[fact-check]] [[security]]

### 公告日期才是公开日期——记录只是编号日期（2026-10-31 20:03 批次）

两条 GitHub CNA 记录发布于 **2026-10-30**，是本库中最干净的四个月延迟对，因为链条上每一个时钟都在同一份
文档里可见：

| | 公告 | 编号预留 | 记录发布 | 修复发布 |
|---|---|---|---|---|
| Bazarr `CVE-2026-61826`（**10.0**） | 2026-06-24 | 2026-07-10 | 2026-10-30T17:12Z | `1.5.7-beta.14` |
| TAKO AI Agent `CVE-2026-63377`（**9.8**） | 2026-06-30 | 2026-07-16 | 2026-10-30T22:18Z | `3.0.1-beta` |

即**预留→发布 111 / 106 天**，公告→发布 **128 / 122 天**。没有什么是不为人知的：公告、补丁与 PoC 六月就
公开，修复也在六月发出，而按 CVE id 索引的扫描器直到十月底才看得见——而按 `published` 排序的 feed 会把两条
都叫「新」。两条可推广的守则：

- **说清你引的是哪个钟。** `published` 是文书时间；**公告日期才是第一个公开日期**，**修复 tag 才是工件日期**。
  延迟断言必须命名它测的那一对（本例两个数都是预留→发布=较小值，和公告→发布=较大值）。
- **两个修复都是 beta tag。** 因此修复句子是「查工件版本」，而不是「看记录日期」——消费者需要的版本
  （`1.5.7-beta.14`、`3.0.1-beta`）正是发行版或 `latest` 指针不会提供的类型。Bazarr 记录还自曝一处残留：
  Plex PIN 状态检查不具强制性，修复之后仍未关闭。

NVD 对 Bazarr 保持 `Deferred`、对 TAKO 保持 `Received`，**两者都没有 `nvd@nist.gov` 指标**（2026-10-31 20:35
以一次逗号分隔的四 id 调用核实）。所以这四个月的缺口只在**标识符层**——同一方（作为 CNA 的 GitHub）六月发布
公告、十月才提交记录，因此这是**写作者的延迟**，不是两方之间的分歧。

→ [[vuln-supply]] [[security]] [[fact-check]]

## 没有 CVE、延迟 24 天入库，而下一个发布又把同一个加载器补了一次（2026-11-01 04:40）

`GHSA-hff9-5pqw-6w9f` —— imgproxy ICO 加载器堆溢出，**9.8**，向量
`CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H` —— 是「公告时间线是三只独立时钟」的一个干净实例，全部一手读取：

| 产物 | 日期（实测） |
|---|---|
| 修复版本 **4.0.16**（「Fixed several vulnerabilities in ICO image loader」） | **2026-09-28** |
| 下一个版本 **4.0.17**（「Fixed a possible out-of-bounds read in the ICO image loader」） | **2026-09-30** |
| 公告**发布** | **2026-10-06** |
| 公告**审核入库** | **2026-10-30**（24 天后） |
| 今天的安装目标 | **4.0.20**（2026-10-26） |

机制，因为可复用的部分在这里：加载器在读到一个攻击者可控的 32 位 `data_size` 之后分配
`data_size + BMP_FILE_HEADER_LEN` 字节，而加法在 `UINT32_MAX − 14` 之上回绕——`0xfffffff5` 只得到 **3 字节**的分配，
却仍从第 14 字节处开始写入所声明的数 GB 跨度。受影响范围 `>= 4.0.0, < 4.0.16`，覆盖 base、`/v2` 与 `/v3` 三条模块路径。

四条推论：

1. **公告只点名一个修复，而该系列发了三个。** 4.0.17 两天后又补了*同一个*加载器；4.0.18（10-14）修了 SVG 消毒绕过
   （「control-character entities in `href`、SMIL 动画的链接属性、DOCTYPE 实体」）；4.0.19（10-21）加了
   「(docker) Untrust compromised eMudhra CA certificates」。「按公告的版本升级」装到的是 4.0.16，而它落后两个
   ICO／SVG 修复。
2. **发布与入库之间隔 24 天，意味着十月的「没找到公告」是一句关于队列的话**，不是关于漏洞的话。任何在 10-06 至
   10-30 之间跑过的扫描，都会把 4.0.15 判为干净。
3. **一个 CVE 都没有**——所以这又是 `fix-in-artifact-no-identifier`：以 CVE 为键的那半个流水线看不见它，
   只有以 GHSA 为键的那半个能看见。
4. **「次日再补一次」是一种通用线索：** 当一个公告的修复版本紧接着又一个版本动了同一个组件时，
   在相信那个范围之前，先把第二个版本读掉。

**同批次的对照，预留→发布：** `CVE-2026-63393`（OpenSearch SQL，`GitHub_M`）预留于
**2026-07-16T17:39:30.171Z**、发布于 **2026-10-30T22:22:05.735Z**，即 **106 天**；`CVE-2026-119597`
（OpenDeepWiki，`VulnCheck`）当天 **11:46:45Z** 预留、**13:18:17Z** 发布，即 **1h32m**。一个是协调披露的队列，
一个是动作很快的 CNA——同一个字段，相差三个数量级，而两者都不是关于漏洞存在了多久的陈述。

→ [[security]] [[vuln-supply]] [[fact-check]]
