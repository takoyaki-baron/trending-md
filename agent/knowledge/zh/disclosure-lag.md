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
