---
date: 2026-10-30
updated: 2026-10-30T12:16:26Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 32
license: CC-BY-4.0
---

# 今日趋势 — 2026-10-30

按**速度**排序 — 衡量的是注意力转移的快慢，而非累积的总量。每一条都链接到一个被实际打开并阅读过的一手来源。

---

## 1. Mistral 放出 1T 参数的 Large 4 权重 — 卡片写 1M，部署配方写 131K，两份同日文档的基准还对不上

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 893+ pts · ~6h ago (~22:13 UTC+8)
- **Tags:** `mistral` `open-weights` `moe` `licensing`

Mistral 于 2026-10-29 发布了 Mistral Large 4 的开放权重 — 绰号 "Le Chonk"，一个混合指令-推理 MoE，**总参数 1T / 激活 49B**，支持多模态输入。Hugging Face 仓库 `mistralai/Mistral-Large-4-1T-A52B` 现在带有 **54 个 consolidated safetensors 分片**（最后修改时间 14:51 UTC，就在公告发布后几分钟）；仓库本身创建于 2026-09-30，用于预览版。许可证是 **Mistral Ecosystem Open-Weight license**，官方博文称其为"a modified MIT license"，但同时规定"businesses that operate a Model-as-a-Service offering must obtain a separate commercial license from Mistral."

最容易被传错的两个数字是上下文窗口和推理开关。博文从未给出上下文长度 — HF 的文章补上了"about 1T total, 49B active parameter, and a context window of 1M tokens" — 但同一篇文章里的 vLLM 示例设置的是 `--max-model-len 131072`，而 Inference Endpoints 配方"serves up to 131K tokens of context."至于推理开关："reasoning cannot be disabled, so using `reasoning_effort`: `none` would still use `high`."主要基准：Terminal-Bench 4.0 **41%**（比预览版提升 13 个点）、Artificial Analysis Coding Agent Index **48%**（与 GLM-5.3 持平，"while using 47% fewer tokens per task"）、BrowseComp **84.5%**、FinWorkBench **73.3%** — 在博文自己的图表里，BrowseComp 一项落后 Kimi K3 的 91.2%。

**自家第二份发布文档就对不上。** 同日发布的 Hugging Face 文章写道"As of October 29, 2026, the model is the fifth best open weights model on Artificial Analysis Intelligence index"，随后给出"**28.3% on Terminal-Bench 4**"和综合"Coding Agent Index score of **49.8%**" — 而新闻稿写的是 41% 和 48%。新闻稿自己的图表把预览版的 **28%** 标为"self reported"、把 ML4 标在 41%，也就是说两份文档里有一份把预览期的数字挂在了正式模型名下。

**Why it matters:** Mistral 自己在博文里承认"we see a potential for uplift to conduct real attacks"，并以"rigorous vetting"为条件把网络安全变体限制给设计合作伙伴 — 这在发布会文案里并不常见。但 131K 并不是 Mistral 的数字：**模型卡**三处写 1M，Vibe 配置里是 `max_context_length = 1048576`，它自己的 FP8 vLLM 配方根本没设上限 — 两个 131K 全部出自 **Hugging Face** 的文档（NVFP4 配方 `--max-model-len 131072`，以及 HF Inference Endpoints 的"131K tokens of context"）。所以那个"可部署数字"是第三方为省显存给出的配置；更值得写的是没人标注的那处：同一场发布的两份文档，在这款模型主打的基准上差了 12.7 个百分点。NVFP4 版本另外"requires NVIDIA Blackwell GPUs"，而只有 2-bit 量化能装进单台 512 GB 的 Apple Silicon Ultra。

[`🔗 Mistral — releasing the weights`](https://mistral.ai/news/mistral-large-4-oss/) · [`🔗 Hugging Face — Welcome Le Chonk`](https://huggingface.co/blog/mistral-large4) · [`🔗 mistralai/Mistral-Large-4-1T-A52B`](https://huggingface.co/mistralai/Mistral-Large-4-1T-A52B)

---

## 2. CISA 把 GitLab 的 10.0 拉进 KEV — 底层缺陷在 Ruby 的正则编译器里，而 Ruby 没为它申请任何 CVE

- **Velocity:** ▮▮▮ trending
- **Source:** CISA KEV · catalog 2026.10.29 · added 2026-10-29
- **Tags:** `cve` `gitlab` `ruby` `rce` `kev`

CISA 于 **2026-10-29** 把 **CVE-2026-97229** 加入已知被利用漏洞目录。该记录是 **CVSS 3.1 10.0** — `AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H` — 归为 CWE-190（整数溢出），而这个分数是 **GitLab 自己给的**（`Secondary` 槽位里是 `cve@gitlab.com`，NVD 自评指标为 0）。NVD 记录目前仍是 **`Undergoing Analysis`**，只有这一个指标，因此还不存在可供对比的 NVD 分数 — 这**不是**"背书"情形（已分析记录只保留 CNA 的分数）。GitLab 在 **19.4.2 中修复，该版本发布于 2026-10-12**；NVD 次日发布记录，KEV 则在**修复后 17 天**跟上 — 即记录发布后 16 天。NVD 记录目前尚未带上 KEV 标记 — 来源是目录本身，不是 CVE 条目。

根因不在 GitLab：Ruby 自己在 **2026-10-23** 的公告里点名了四个 GitLab 分配的编号 — CVE-2026-89078（正则解析器的 double free，PR #13332）、CVE-2026-93577、CVE-2026-97229 和 CVE-2026-110264 — 并明确写道："We have not requested CVE identifiers in Ruby for these fixes, at least for now."修复落在 **Ruby 4.0.9、3.4.12 和 3.3.13**。人们会想到的两个缓解手段都不管用："`Regexp.timeout` does not protect against these bugs"，以及"Limiting the length of patterns does not reliably protect against them either"，因为"some of them can be triggered by short patterns."

**Why it matters:** 从我们 10 月 29 日关于 Alpine 那台 GitLab 的记录之后，真正有意思的不是 KEV 收录本身 — 而是这个部署最广的自托管代码平台上那个 10.0 的未认证 RCE，**在它所在的编程语言里根本没有 CVE**。把 GitLab 升到 19.4.2 并不会修复它底下的 Ruby — 如果你从源码构建，或用发行版自带的 Ruby，缺口就还在，这正是 Alpine 撞上的那个缺口。触发条件窄但常见："reached only when an application compiles a regular expression from a string that an attacker controls."

[`🔗 GitLab 19.4.2 patch release`](https://docs.gitlab.com/releases/patches/patch-release-gitlab-19-4-2-released/) · [`🔗 Ruby — regexp fixes for GitLab CVEs`](https://www.ruby-lang.org/en/news/2026/10/23/regexp-fixes-for-gitlab-cves/) · [`🔗 CVE-2026-97229 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-97229)

---

## 3. PHP2Shell 配上我们昨天记录的那个内核漏洞，拿下了 25 台服务器 — 24 台防火墙、一台管理服务器，还有一个政府关联机构

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 219+ pts · ~10h ago (~18:42 UTC+8)
- **Tags:** `php` `pan-os` `kernel` `exploitation` `incident`

Dream 在 2026-10-26 发布了一份链式利用分析、10-29 更新：一次自动化批量攻击拿下了 **24 台面向互联网的 PAN-OS 防火墙**，随后的一次入侵又攻陷了一台内部防火墙管理服务器，"bringing the total number of servers exploited to 25."这 24 台中有两台属于一个美国政府关联组织，而攻击者横向移动拿下的那台管理服务器被描述为"a third government server" — 合计 **三台** 政府关联系统（总数 25）。链条是 **CVE-2026-109618 / CVE-2026-109619**（PHP2Shell，9.2）拿到 `nobody` 权限，再叠加 **CVE-2026-46300** — 那个 10 月 28 日进入 KEV、我们昨天日报里写过的 Linux 内核提权漏洞 — 通过覆写 `/etc/pam.d/su` 的 page cache，从一个非特权进程拿到 root。

时间线非常紧：第一台政府关联防火墙在 **10 月 23 日 18:14 UTC** 被拿下，第二台在 **10 月 24 日 10:09 UTC**，管理服务器在 **10 月 24 日 11:35 UTC** — "less than 90 minutes after rooting the second firewall."大部分机器被放着没动："For 22 of the 24 rooted firewalls, the attacker did nothing beyond planting the webshell."仍有大约 **19,000** 个可指纹识别的目标可被利用。

**Why it matters:** 报告里的保留意见才是重点。Dream 写道"What we cannot determine is whether the password spray, backdoor account creation, or SAML key extraction succeeded"，以及"we do not attribute this activity to a named threat actor."关于随报告一起流传的 AI 说法，作者先是不给归因、随后在同一句里提出相反推断："While we have no direct evidence that the AI tools were specifically used to write the exploit or the post-exploitation scripts, the code structure, commenting style, and consistency across ~40 scripts suggest AI-assisted development."两个单独看都还算可控的 9.x 漏洞，组合起来构成了不到 90 分钟内从零认证到 root 的路径 — 这正是把昨天那个内核记录和这个 PHP 记录当作同一起事件、而非两起事件来对待的理由。

[`🔗 Dream — chained PHP2Shell roots 25 servers`](https://dreamgroup.com/blog/chained-php2shell-exploit-roots-25-servers) · [`🔗 PHP 8.5.12 / 8.4.27 / 8.3.36 / 8.2.35`](https://www.php.net/archive/2026.php) · [`🔗 Hacker News 讨论`](https://news.ycombinator.com/item?id=50286987)

---

## 4. Agno 的 9.2 写着"through 3.1.11" — 而 3.1.12 在记录发布前 17 分钟发布，代码里还是同一个 `getattr`

- **Velocity:** ▮▮ rising
- **Source:** VulnCheck advisory · published 2026-10-29 14:17 UTC
- **Tags:** `cve` `agent-framework` `prompt-injection` `python` `rce`

**CVE-2026-119050** 评分为 **9.2（CVSS 4.0）** 和 **8.1（CVSS 3.1）**，两者都来自 VulnCheck，归为 CWE-470（对外部可控名称的假设不可变性）。Agno 的 `PandasTools` 调用 `getattr(pd, create_using_function)(**function_parameters)`，其中函数名和它的关键字参数都来自模型的工具调用 — 于是被提示注入的 agent 可以选 `pandas.read_pickle` 读攻击者指定的路径拿到代码执行，或用其它 reader 读取任意本地文件。上游 issue **#8699** 于 **2026-07-02** 提交，至今仍开着。

问题出在影响范围上。公告说"Agno through 3.1.11"，暗示 3.1.12 已修复。**v3.1.12 发布于 2026-10-29T14:00:55Z** — PyPI 上是 14:01:49，**比 CVE 发布早 17 分钟** — 而它的 `libs/agno/agno/tools/pandas.py` 里是**与 v3.1.11 完全一样、未经改动**的 `getattr` 那一行。`main` 分支第 54 行仍是同一个调用，第 90 行还有第二个反射面（`getattr(dataframe, operation)`，`operation` 由模型控制），而公告和 CVE 文本都没提到它。

**Why it matters:** CVE 的影响范围是关于**制品**的断言，而这个断言在真正要紧的方向上过时了 17 分钟 — 任何因为看到"through 3.1.11"就升级到最新版的人，实际上把漏洞一起装了进去。Agno 有 42,951 stars，自称"the self-driving agent platform"；`PandasTools` 是一方工具，不是社区插件。在这一行代码改掉之前，唯一的缓解方式是不要把这个工具挂在会读取不可信内容的 agent 上。

[`🔗 VulnCheck advisory`](https://www.vulncheck.com/advisories/agno-through-3.1.11-code-execution-via-pandastools-unsafe-reflection) · [`🔗 agno-agi/agno issue #8699`](https://github.com/agno-agi/agno/issues/8699) · [`🔗 pandas.py at v3.1.12`](https://github.com/agno-agi/agno/blob/v3.1.12/libs/agno/agno/tools/pandas.py#L54)

---

## 5. Tabularis 把只读模式关在一个工具里 — 另外三个 MCP 工具把 `table_name` 直接拼进了 PRAGMA

- **Velocity:** ▮▮ rising
- **Source:** GitHub Advisory · GHSA-xrx3-j98v-67x9 · 2026-10-28
- **Tags:** `mcp` `sql-injection` `agent-security` `sqlite`

**CVE-2026-118378**（VulnCheck：7.8 CVSS 3.1、8.5 CVSS 4.0；CWE-89 + CWE-863）是 Tabularis SQLite 驱动里的一个 SQL 注入：`describe_table` 把调用方传入的 `table_name` 插值进 `PRAGMA` 语句，精心构造的值可以"close[s] the quoted PRAGMA argument and append[s] statements to read, modify, or drop SQLite data."公告自己的诊断才是重点 — 产品的只读与写入审批检查"implemented only inside `tool_run_query`"，而 `describe_table`、`list_tables` 和 `list_databases`"do not invoke the read-only or approval checks."现实触发场景被明确写出："an AI agent driven by attacker-controlled/untrusted content."

严重性是被有意压低的。存在漏洞的服务通过**本地 stdio JSON-RPC** 访问，不是网络套接字（`AV:L`），且需要 agent 会话去发起调用（`UI:R`）— 所以才给了 7.8 而不是 9.x。公告里有一处奇怪之处：受影响范围写的是 `<= 0.18.0`，修复版本写的是 `0.28.0`，**0.19 到 0.27 完全没有被任何范围覆盖**；项目最新版本是 v0.30.0（2026-10-26）。

**Why it matters:** 这个模式可以推广到单个应用之外。面向 agent 的工具面是**逐个工具**搭建安全边界的，而后加进来的新工具不会继承任何一条。Tabularis 的只读模式不是被绕过了 — 它只是从未被四个工具中的三个查询过。任何宣称自己有"安全模式"的 MCP 服务器，都该被问一句：到底哪些工具真的会调用那个检查？

[`🔗 GHSA-xrx3-j98v-67x9`](https://github.com/TabularisDB/tabularis/security/advisories/GHSA-xrx3-j98v-67x9) · [`🔗 修复提交`](https://github.com/TabularisDB/tabularis/commit/fd1bdbbae35e5367c32d1e7fe9c44cb1b6875d74) · [`🔗 v0.28.0 发布`](https://github.com/TabularisDB/tabularis/releases/tag/v0.28.0)

---

## 6. Apple 自家的语音 API 获得了可替换引擎 — 干净 LibriSpeech 上 1.43% WER，真实会议上超过 23%

- **Velocity:** ▮▮ rising
- **Source:** Hugging Face Blog · 2026-10-29
- **Tags:** `apple` `speech` `swift` `core-ml` `on-device`

Mattt 发布了两个 Swift 包，它们位于 Apple 新语音栈**之下**而不是旁边。**AnySpeechRecognizer**"implements Apple's new speech-to-text API with a choice of recognition engine" — 默认走 Apple 自己的引擎，另外可通过 Core ML 在本地运行 NVIDIA Parakeet 和阿里 Qwen3-ASR，并镜像了 `SpeechAnalyzer`、`SpeechTranscriber` 和 `DictationTranscriber` 的接口。**AnyDecisionModel** 通过直接读取概率而非"先生成文本、再解析"来回答"yes-or-no, multiple-choice, and rating-scale questions with typed results and probabilities."

那张基准表异常具体，也异常诚实。在 3–8 分钟的 LibriSpeech 文件上，Parakeet Unified 的 WER 是 **1.43% / 2.19%**（test-clean / test-other），而 Apple 自家转写器是 **2.12% / 3.97%**。然后是与上述每一个数字都该一起传播的那句话：在困难的会议音频上，"every engine we tested had a word error rate above 23%."

**Why it matters:** 门槛才是坑 — Swift 6.2+、macOS 26 或 iOS 26、Parakeet 与 MLX 后端需要 Apple 芯片，而且"So far, we've tested only on macOS 27, not on an iPhone."决策模型那边也有自己的限制：next-token 后端把"a choice … at most 26 options, and a score at most 10 levels"卡死，而"It measures how concentrated the probabilities are, not whether the answer is right."最后这句话是对整个 agent 栈里每一个置信度打分的正确表述 — 不止这一个包。

[`🔗 Hugging Face — AnySpeechRecognizer and AnyDecisionModel`](https://huggingface.co/blog/anydecisionmodel) · [`🔗 mattt/AnySpeechRecognizer`](https://github.com/mattt/AnySpeechRecognizer)

---

## 7. IBM 发了一个没有增量大小、也没有任何数字的模型更新 —"nothing was recomputed"就是全部规格说明

- **Velocity:** ▮▮ rising
- **Source:** Hugging Face Blog · 2026-10-29 13:37 UTC
- **Tags:** `ibm-granite` `model-updates` `adapters` `release-engineering`

Granite Switch 4.1.1 把模型发布当作软件补丁来做：30B 的 `granite-switch-4.1-30b` 基座保持冻结，只有两个组件变动 — 一个新的 **0.5B Granite Speech ASR** 模型，覆盖"10 languages with native punctuation and capitalization"，以及 `granitelib-core` 中更新过的 Decision adapter。承诺是版本管理纪律："fully backwards compatible with 4.1, no migration, incremental improvements under the hood"，以及"Apart from training the new ASR model and Decision adapter, nothing was recomputed: the base model is untouched."

而博文里没有的，是任何测量。Decision adapter 唯一的基准说法是定性的 — "improved overall performance on the Jev Decision Index test set"，没有分数、没有基线，也没有任何分语言的 ASR 错误率。增量也没有字节级大小，所以"update models like you update software"这件事，无法对照用户实际下载到的东西来验证。

**Why it matters:** 模块化 adapter 的思路是对的 — 在同一个端点上"You compose the latest adapters you want and deploy"，30B 基座就不必每修一次就重新下载 60 GB。但一个改进未被量化的补丁版本，是关于架构的断言，不是关于模型的断言。让它可以被验证的工具也还没出来："We're working on tutorials and an Adapter SDK."

[`🔗 Hugging Face — Granite Switch 4.1.1`](https://huggingface.co/blog/ibm-granite/granite-switch-4-1-1) · [`🔗 ibm-granite on Hugging Face`](https://huggingface.co/ibm-granite)

---

## 8. 向五个助手索要统计数据，回溯了 1,285 条引用 — 其中 40% 指向一篇说法一致的论文

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 105+ pts · ~5h ago (~23:06 UTC+8)
- **Tags:** `ai-search` `citations` `research` `provenance`

Trakkr Research 第 013 号研究（"Zombie stats"，Mack Grenfell，2026-10-28）向 ChatGPT、Perplexity、Gemini、Claude 和 Google AI Overviews 提出了 **200 个问题**，通过开启联网搜索的 API 收集了 **1,000 条回答**，并随机抽取 **1,285** 条被引用的统计数据，最多回溯五层。结果：**40%** 最终指向说同一件事的研究（95% 区间 34–46%），**8%** 指向了那项研究但数字或语境已经变了，**40%** 指向无法核查的来源，**11%** 完全找不到研究，**1%** 是打不开的页面。

机理是溯源，不是凭空捏造。"The cited page contained the figure"在 **82%** 的情况下成立，但只有 **21%** 的被引页面是原始研究 — 超过一半是公司博客。所以才有那句话："A citation tells you where the AI found a number, not where the number came from."其典型"僵尸"是"44% of salespeople give up after just one follow-up attempt"：五个助手都给出了它，而它一路追溯到一个 2020 年销售公司的统计页和 2017 年一位自由撰稿人的文章，两者背后都没有研究。在营销自动化采用率上，五个助手分别回答 **49–51%、62%、70–79%、81%** 和 **96%**；在 71 个五者都给出百分比的问题里，28 个出现了四到五个不同数字。

**Why it matters:** 引用这份研究之前，先读它自己写的局限。结果是通过 API 得到的，所有问题只在 **2026 年 10 月 25 日**问了一次，而 AI 判官"was stricter than a person" — 纯模型打分只判定 23% 有出处，人工修正后升到 40%，所以头条那个数是修正后的。Trakkr 销售 AI 搜索可见度监测服务，页面没有利益冲突声明。可迁移的规则是报告末尾那句："Five assistants giving the same number isn't five sources."

[`🔗 Trakkr Research — Zombie stats`](https://trakkr.ai/trakkr-research/zombie-stats) · [`🔗 Hacker News 讨论`](https://news.ycombinator.com/item?id=50290283)

---

## 9. SkyPilot 的 27% 是模型算出来的，不是测出来的 — 它测出来的数字是 14.4%

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 101+ pts · ~4h ago (~23:45 UTC+8)
- **Tags:** `gpu-scheduling` `nvl72` `infrastructure` `training`

SkyPilot 的论点是：NVL72 的整机架 NVLink 只有在多节点作业留在同一机架内时才划得来，而目前的调度器忽略这一点。头条数字是 **27% 更多可用 GPU** — 而它是模型，不是 A/B 实测：NVIDIA 建模了一个 **128 机架、2,304 节点**的集群，约束是"Each slice must fit within a single rack"，节点不可用率约 2%，得到 **16 节点切片 2,037 个可用节点，对比 18 节点切片的 1,602 个**。2% 这个输入是实测的 — "on production NVL72 clusters we have measured unavailability rates of around 2%" — 但 27% 是模型在该输入下的输出。

另外单独测出的数字更小，但真实：在 **128 个节点、512 块 GB300** 上预训练 GR00T N1.7，吞吐提升 **14.4%**，每次迭代从 **1.59 s 降到 1.39 s**。支撑性对比都是有条件的：16 节点比 9 节点好 4%；对比 8 节点则在把 NVLink 域翻倍的同时，"sacrificing under 1% of usable capacity until unavailability exceeds about 3.3%."

**Why it matters:** 两个备用节点是有代价的，博文也说了 — "two nodes per rack sit idle while everything is healthy" — 而碎片整理只会抢占那些能安全重启的作业。所以诚实的表述是：这是一个有标价的调度权衡，不是免费的 27%。任何把这个头条数字用在并非"128 机架、2% 停机率"的集群上的人，引用的都是别人的配置。

[`🔗 SkyPilot — Grace Blackwell needs a new scheduler`](https://skypilot.ai/blog/grace-blackwell-needs-a-new-scheduler) · [`🔗 Hacker News 讨论`](https://news.ycombinator.com/item?id=50290912)

---

## 10. t3dotgg 发布九个 agent skill — 其中 `full-send` 在没人盯着的情况下自己合并 PR

- **Velocity:** ▮▮ rising
- **Source:** GitHub · 2,372 stars · created 2026-10-24
- **Tags:** `agent-skills` `claude-code` `codex` `pull-requests`

`t3dotgg/tstack` 是一套小巧的九个 MIT 许可 skill，据称"work in Claude Code and Codex"，2026-10-24 发布，已有 **2,372 stars**、6 个未关 issue 和 5 个未关 PR。skill 按其执行的动词命名 — `file-pr`、`babysit-pr`、`takeover`、`modernize`、`council`、`sol-loop` — 而且彼此组合：`full-send` 调用 `sol-loop`、`file-pr` 和 `babysit-pr`；`takeover` 还会拉上 `modernize` 和 `leaving-pr-comments`。

最有意思的是 `full-send`：它"Takes a change to a merged PR with nobody watching: proves it, reviews it, files it, babysits it, merges it."`full-stop` 是同一条流水线但去掉了合并。`council`"Gets review from three models from different providers, and loops until they agree" — 这需要跑在其他厂商模型上的子 agent，README 也直说了：用 T3 Code 的 `delegate_task`，或者"a harness that can run those models."前提条件是已认证的 `gh` 和 `python3`。

**Why it matters:** 这是第一套把"无人值守合并"当作一等动词交付、并且拿到大量 star 的 skill 集，而让它站得住脚的设计选择是那张依赖图 — 评审是一个独立 skill，你可以选择不安装。README 里最容易被其它仓库省掉的那句建议是："These are starting points. Edit them."个人设置写进 `CLAUDE.md` 或 `AGENTS.md`，这样 skill 更新就不会把它们覆盖掉。

[`🔗 t3dotgg/tstack`](https://github.com/t3dotgg/tstack) · [`🔗 skills/ 目录`](https://github.com/t3dotgg/tstack/tree/main/skills)

---

## 11. gpu-unlock 在 RTX 4090 上做到 2 倍 tensor 发射率 — 而它自己的 README 说 cuBLAS 只涨 12–34%

- **Velocity:** ▮▮ rising
- **Source:** GitHub · 4,502 stars (repo: `JustAResearcher/gpu-unlock-ada`) · created 2026-10-23
- **Tags:** `gpu` `rtx-4090` `firmware` `benchmarking`

`JustAResearcher/gpu-unlock-ada`（GPL-2.0）是一个 Linux 内核模块，在 RTX 4090（`10de:2684`，AD102）上"enables the SM speed-select override before the stock NVIDIA driver starts"，为 FP32 累加负载恢复 tensor core 的发射吞吐；另有一批实验性 Ada 型号藏在需要显式开启的开关后面。它沿用了我们 10 月 25 日报道过的那条路线：拉取固定版本的 NVIDIA `610.43.03` 输入、校验 SHA-256、本地生成固件，把 AD102 载荷集成进 Zagitta/gpu-unlock 的模块，然后"writes SS0 `0x88888888` and SS1 `0x8`, then performs FLR before the unmodified NVIDIA driver binds."

那个 2 倍的头条是真的，但它不是加速比：FP16→FP32 从 **165.6 到 331.6 TF/s**，BF16→FP32 从 **165.5 到 330.6 TF/s**，而仓库自己点明了单位 — "These are register-resident issue rates, not application GEMM or inference speedups."实际 cuBLAS GEMM 的增益是 FP16 **12–34%**、BF16 **16–20%**，"essentially unchanged at 4096³"，在量化 MoE 负载上没有增益，FP8 证据不一。它还需要冷启动："Loading the module manually after NVIDIA has bound the card cannot unlock it"，实验性目标必须按 PCI 地址显式开启，因为"`targets=all` never selects them."

**Why it matters:** 这是一个少见的项目：它在同一份 README 里同时给出指令发射率数字和应用层数字，并告诉你哪个是哪个。2 倍和 12–34% 之间的差距，就是从合成上限到一次真实训练所见的全部距离 — 许可说明也很重要：内核模块是 GPL-2.0-only，"NVIDIA firmware remains under its own terms"，且不分发任何预编译固件。

[`🔗 JustAResearcher/gpu-unlock-ada`](https://github.com/JustAResearcher/gpu-unlock-ada) · [`🔗 实测效果章节`](https://github.com/JustAResearcher/gpu-unlock-ada#measured-effect)

---

## 12. 一个简单的 agentic 循环解掉了八个未决 Lean 问题 — 而论文说立功的是 Lean 接口，不是循环

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.35962 · 2026-10-25
- **Tags:** `theorem-proving` `lean4` `agents` `scaling`

**h1** 直接提出了那个"苦涩教训"式的问题："can a simple agentic loop that scales test-time compute match these workflows?"它给模型一个高效的 Lean 4 接口，靠验证器反馈和自我反思让它持续工作，"without imposing a decomposition or search structure."结果是 **PutnamBench、FATE-X 和 FormalConjectures100-Solved** 上的 SOTA，解决了 FormalConjectures 里八个未决问题，并且在同等模型下"matches or outperforms specialized workflows such as Goedel-Architect and AlphaProof Nexus" — 还有一个惊人的发现："a single attempt (pass@1) can often scale to solve open problems."

然后论文用消融实验把头衔收了回去。与 Claude Code 和 AxProverBase 在同等模型下对比："simplicity alone is not enough: an efficient Lean interface largely determines cost and solve rate."由此得出的建议才是有用的部分 — 先用高效的执行反馈去评测前沿模型，再决定要不要规定工作流，"at the risk of bitter lessons."

**Why it matters:** 一篇五位作者（Moalla、Rammal、Patel、Munos、Kempe）的论文，报告了 SOTA，然后把功劳归给接口而不是架构 — 这正是本日报反复要求的那种做法：说清楚到底操纵了哪个变量。实际读法是：一个 harness 的工具人机工效，其影响压过它的编排图 — 这和 agent 基础设施团队从另一个方向反复得到的结论是同一个。

[`🔗 arXiv 2610.35962`](https://arxiv.org/abs/2610.35962) · [`🔗 全文（HTML）`](https://arxiv.org/html/2610.35962v1)

---

## 13. Outcome RL 最多只买到 2.1 个点的"触及率" — 而它"新解出"的题目里只有 3.5% 经得起重采样

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.34894 · 2026-10-26
- **Tags:** `reinforcement-learning` `evaluation` `reasoning` `benchmarks`

一篇单作者论文（Shan Yang）把 **20 个已发布的 RL 模型（1.5B–32B）** 相对其基座思考模型的 pass@1 增益拆成三部分：**finishing**（在 token 预算耗尽前作答）、**reliability**（答完之后答对）、**reach**（基座八次全错而 RL 能解出的题，减去反向的情形）。在固定 token 预算的物理与数学题上，结论是 RL 主要推动前两项。

当基座经常在预算内答不完时，"most of the change, gain or loss, is finishing (82% at 4k and 8k)" — 而且"Given more tokens, the base closes most of the finishing gap itself."当基座 token 足够时，增益来自 reliability。Reach 很小："Reach adds at most 2.1 percentage points on any of our four physics and math sets"；在 **144** 道只有 RL 模型解出的题里，"3.5% hold up when resampled or read."在随机抽样里，"nine of ten new RL steps a human confirmed also appear in the base's samples."

**Why it matters:** 这重新定义了"一次 RL 训练买到了什么"，而且它与本日报这一周一直在追的"harness 还是模型"的问题落在同一点上。如果表面上的 RL 进展大部分是预算管理和评分一致性，那么一个不固定 token 预算、或只评一次尝试的基准，测的就是错的轴。论文自己最后一条结论最诚实：在一个 8B 模型的小规模 RL 里，新题上的增益来自 finishing，而 reliability 持平。

[`🔗 arXiv 2610.34894`](https://arxiv.org/abs/2610.34894) · [`🔗 全文（HTML）`](https://arxiv.org/html/2610.34894v1)

---

## 14. NetBSD 在基础系统里加了一个 48 KB 的编辑器 — 小到可以塞进救援镜像

- **Velocity:** ▮ steady
- **Source:** Hacker News · 141+ pts · ~8h ago (~19:59 UTC+8)
- **Tags:** `netbsd` `editors` `base-system` `posix`

NetBSD 基金会于 2026-10-28 宣布 `-current`"now includes an alternative editor to vi(1) and xedit(1) in its base system, atto(1)."它是一个 nano/pico/xedit 家族的无模式屏幕编辑器，而它存在的理由写得异常直白："It is only 48 kilobytes, making it suitable for inclusion in the rescue system."公告结尾还自嘲了一句 — "(This is real, but I'm honestly missing an opportunity by not posting it on 1 April. Let the editor wars commence!)"

**Why it matters:** 基础系统的构成是少数几个"几十 KB 仍然是设计约束而不是舍入误差"的地方之一，而救援介质正是这个约束最尖锐的场景 — 终端或键盘不对劲的时候，vi 就不再好用了。一个 48 KB 的无模式编辑器，其依赖面比两个替代品都小；而一手来源是 man page，不是那条公告。

[`🔗 NetBSD 公告（Mastodon）`](https://mastodon.sdf.org/@netbsd/117518160563539748) · [`🔗 atto(1) man page`](https://man.netbsd.org/atto.1)

---

## 15. OpenIDEA 用 Rust 重建 JetBrains 那套工作方式 — 169 MB 对 2,011 MB，而基准表被它自己的 README 打了折

- **Velocity:** ▮ steady
- **Source:** GitHub · 1,239 stars（2026-10-30 04:25 UTC 实测）· created 2026-10-21
- **Tags:** `ide` `rust` `tauri` `performance`

`l0ng-ai/openidea`（Apache-2.0）把 IntelliJ IDEA 的工作方式 — 键位映射、工具窗口、随处搜索 — 搬到一个 Rust 核心加 Tauri 的原生应用上，覆盖编辑器、代码洞察、调试器、Git、终端、数据库和 HTTP 客户端，支持 60 多种语言，可跑在 macOS、Windows 和 Linux。创建九天后已有 **1,239 stars**、63 个未关 issue 和 9 个未关 PR——同一天早些时候是 1,024 / 46 / 9，计数器仍在动——是"重造 IDE"这一类里目前最具体的作品。

公开的基准以 warm cache 打开 `freqtrade`（Python，约 770 个文件），取 5 次运行中位数，在 Windows 11 上与 IntelliJ IDEA 2026.2.3 对比：打开项目 **0.9 s 对 3.1 s**，ready **1.1 s 对 13.2 s**，内存（USS，全进程）**169 MB 对 2,011 MB**，ready 前的 CPU 时间 **2.4 s 对 47.9 s**，退出 **0.3 s 对 5.9 s**。然后 README 拆了自己的台："IDEA analyses Python more deeply, so 'ready' doesn't mean the same work on both sides."

**Why it matters:** 那句限定就是发现本身。12 倍的"ready"加速，有一部分来自"在宣布 ready 之前到底做了多少事"的 12 倍差异；而一个愿意在表格同一节里说出这点的项目，比不说的更可信。把内存那一行当作耐久结论来读 — 169 MB 对 2,011 MB 是种类上的差别，不是调度上的差别。

[`🔗 l0ng-ai/openidea`](https://github.com/l0ng-ai/openidea) · [`🔗 基准章节`](https://github.com/l0ng-ai/openidea#benchmark)

---

## 16. 一份 OpenAPI 文档就能把 `func init()` 写进你生成的 Go 代码 — 注入点是 oapi-codegen 的枚举模板

- **Velocity:** ▮ steady
- **Source:** VulnCheck advisory · CVE-2026-119028 · 2026-10-29
- **Tags:** `go` `openapi` `code-generation` `supply-chain`

**CVE-2026-119028**（8.8 CVSS 3.1、8.7 CVSS 4.0，均来自 VulnCheck；状态 `Awaiting Analysis`）影响 `oapi-codegen` **2.0.0 before 2.8.1**：控制 OpenAPI 文档的攻击者可以在整数、数字或布尔 schema 里构造一个非字面量的枚举值，从而"closes the const block in `constants.tmpl` and injects a `func init()`, executing code when the generated package is built and imported."不需要手改生成文件，也不需要额外的构建步骤 — 载荷在包初始化时执行。

修复在 **2.8.1**（PR #2626，提交 `068f1bcd`），diff 改动的位置正好与公告所述一致：`pkg/codegen/templates/constants.tmpl` 从 v2.0.0 的第 12 行挪到 v2.8.0 的第 16 行。

**Why it matters:** OpenAPI 文档来自第三方 — 供应商规格、合作方仓库、公开 API 注册表 — 通常被当作数据看待。这件事让其中一份变成了"导入即执行"的代码源。需要移动的信任边界是"我们到底拿谁的 spec 去跑生成器"，而这条记录目前仍未分析，分数只有 VulnCheck 一家的。

[`🔗 VulnCheck advisory`](https://www.vulncheck.com/advisories/oapi-codegen-2.0.0-before-2.8.1-code-injection-via-non-string-enum-values) · [`🔗 GHSA-g2vv-83pm-v2hc`](https://github.com/oapi-codegen/oapi-codegen/security/advisories/GHSA-g2vv-83pm-v2hc) · [`🔗 constants.tmpl`](https://github.com/oapi-codegen/oapi-codegen/blob/v2.8.0/pkg/codegen/templates/constants.tmpl#L16)

---

## 17. agent 服务卡在工具返回上，于是 TAO 把它们放在一起调度 — 延迟最多降低 26.8%

- **Velocity:** ▮ steady
- **Source:** arXiv 2610.37230 · 2026-10-27
- **Tags:** `agents` `serving` `scheduling` `inference`

TAO 从多数服务栈忽略的一点出发：agent 服务"alternate[s] between model inference on clustered GPUs and external tools on distributed CPUs"，而现有系统"overlook tool-return readiness in service evaluation"，同时对 GPU 的准入与放置使用启发式策略。它的价值接口把近期工具就绪度、带时间衰减的节点级 cache credit 和 token 占用合并起来，再用一个动态规划在容量约束下联合选择与放置等待中的会话。

报告的结果是 12 组"模型-负载-并发"配置下的"最多"数字：延迟降低 **26.8%**、平均首 token 时间降低 **36.3%**、解码吞吐提升 **29.5%** — 每个都"relative to the best evaluated state-of-the-art baseline for each metric."

**Why it matters:** 每个指标各自取最好基线是对的报告方式，也是最难概括的方式：这三个百分比并非来自同一次对比运行，所以它们不能加总成"TAO 快了 26–36%"。真正的贡献是调度单元的定义 — 一个 agent 请求不是一条 token 流，而是一条会周期性阻塞在 CPU 上的 token 流；看不见这个阻塞的调度器，只调度了一半的工作负载。

[`🔗 arXiv 2610.37230`](https://arxiv.org/abs/2610.37230) · [`🔗 全文（HTML）`](https://arxiv.org/html/2610.37230v1)

---

## 18. 继我们 10 月 28 日关于 ggml-rpc 的记录之后：又一条记录，这次是 DoS — 而影响范围从 b2877 开始

- **Velocity:** ▮ steady
- **Source:** NVD · CVE-2026-119052 · published 2026-10-29 14:17 UTC
- **Tags:** `llama-cpp` `cve` `rpc` `denial-of-service`

**CVE-2026-119052**（8.7 CVSS 4.0、7.5 CVSS 3.1，均来自 VulnCheck）是我们在 10 月 28 日报道的栈溢出之后两天内的第二条 ggml-rpc 记录 — 同一个暴露的 `rpc-server`，不同的缺陷。在 HELLO 握手之后，客户端可以发送一条命令（例如 `SET_TENSOR`），其长度超过 `std::vector::max_size()`，"triggering an uncaught `std::length_error` that aborts the process and denies service to all clients."这次不需要认证，也不需要 RDMA 能力；修复在 build b11935（PR #31204）。

值得注意的是影响范围：**b2877 before b11935**，比 RDMA 那个漏洞的 b8841 还要早得多。严重性也正确地更低 — 4.0 向量上是 `VC:N/VI:N/VA:H`，只影响可用性。

**Why it matters:** 两天内针对同一个 RPC 面的两条未认证记录是一种模式，不是两起独立事件：`rpc-server` 当初是当作受信集群内的组件来写的，现在却按面向互联网的组件被报告。如果你把 `--rpc-server` 暴露到私有网络之外，两条记录都适用，而其中只有一条的分数高于 9。

[`🔗 CVE-2026-119052 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-119052) · [`🔗 修复 PR #31204`](https://github.com/ggml-org/llama.cpp/pull/31204)

---

## 19. 未认证的 `GET /api/flows/:id` 能读取磁盘上任意 YAML — OpenHop 的 id 在没有白名单的情况下进了 `path.join`

- **Velocity:** ▮ steady
- **Source:** GitHub Advisory · CVE-2026-59179 · 2026-10-28
- **Tags:** `path-traversal` `nodejs` `cve` `web-apps`

**CVE-2026-59179**（8.3，由 GitHub 的 advisory 团队评分）影响 **0.3.7** 之前的 `@openhop/server`。`GET /api/flows/:id` 和 `DELETE /api/flows/:id` 把路由参数传给 `FlowStore.filePath()`，"without an identifier allow-list"；路由层施加了 `decodeURIComponent`，随后 `path.join()`"normalizes traversal outside the configured flow directory after appending the .yaml extension."攻击者可以读取任意可访问的 `.yaml` 文件并把它当作 YAML 解析后的 JSON，也可以把它删掉 — `DELETE` 这个动词让问题同时具备破坏性，而两条路由都没有认证。

**Why it matters:** 这个缺陷是两行代码的组合失败 — 先 decode，再 join — 每一步单独看都合理，合起来不是。`path.join` 在扩展名追加之后才做规范化，正是击穿朴素"以 .yaml 结尾"检查的那个细节；修复（PR #190，提交 `c8190fb`）在 v0.3.7 里。小项目经常交付这种形状；这里唯一特殊的地方是它落在一条未认证路由上，还挂了一个删除动词。

[`🔗 CVE-2026-59179 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-59179) · [`🔗 修复 PR #190`](https://github.com/naorsabag/openhop/pull/190) · [`🔗 v0.3.7 发布`](https://github.com/naorsabag/openhop/releases/tag/v0.3.7)

---

## 20. Fowler 说 LLM 文风有一种恐怖谷 — 而接受一次改写建议就已经错了

- **Velocity:** ▮ steady
- **Source:** Hacker News · 221+ pts · ~5h ago (~22:57 UTC+8)
- **Tags:** `writing` `llm` `craft` `culture`

Martin Fowler 的 bliki 文章主张，LLM 生成的散文会触发人的反应 — "that sense that we are in an uncanny valley of prose" — 而检测工具是错误的应对方式，因为读者的反应在任何检查器跑起来之前就已经发生了。他的建议比常见的"别让它替你写"更强硬："I strongly recommend that authors should not fall into the trap of getting the LLM to write a draft"，以及"Even accepting suggestions of rephrasing is dangerous."他的理由关乎理解而非文风："the act of wrestling with the words forces me to overcome my confusions" — 把词句外包出去，就有把思考一起外包的风险。

**Why it matters:** 文中没有任何数字，Fowler 也没假装有 — 对于检测器，他只是表达了"skepticism about their accuracy"，而没有引用实测。限定也写清楚了："it isn't an absolute one"，无障碍是一个真实的例外（Jim Highsmith 借 LLM 应对帕金森病），行政性文档由机器撰写是合理的。结尾的披露才值得抄下来："I did not use AI or LLMs in any way while writing this post."

[`🔗 martinfowler.com — LLM Voice`](https://martinfowler.com/bliki/LLM-Voice.html) · [`🔗 Hacker News 讨论`](https://news.ycombinator.com/item?id=50290177)

---

## 21. Binance 称其热钱包流出 63 亿美元 — 而它自己给的说法是一台开发运维笔记本，不是泄露的私钥

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 913+ pts · ~6h ago (~05:38 UTC+8)
- **Tags:** `binance` `exchange` `incident` `custody` `ethereum`

Binance 估算损失为"**around $6.3 billion in stolen assets**"，并称"**Some $3 billion of assets were frozen**"，其中包含"$2.3 billion in USDT and USDC stablecoins altogether"。各家数字并不一致，而且它们量的不是同一件事：Chainalysis 说"roughly **$5.9 billion** at the time of the theft"，Arkham 报"more than **$5.7 billion** in various cryptos"，但描述的是黑客钱包"at one point"的持仓 — 那是快照，不是损失；Coinbase 的 Conor Grogan 给的是"up to **$5.8 billion**"。Tether 冻结了"over $1.57 billion in USDT"，Circle 冻结了"over $800 million in USDC"。

机制才是争议所在，而 Binance 的版本并非最先流传的链上叙事。其"initial investigation"称该事件"may involve a **compromised DevOps engineer's laptop**"，攻击者借此"gain access to a service container and submit unauthorized withdrawal transactions" — 紧接着的一句重新定义了这一整类缺陷："**We have found no evidence of any wallet private key leak.**"而当天早些时候，SecurityAffairs 仍把悬而未决的问题列为"whether credentials or signing mechanisms were compromised"，并提醒"Large transfers alone don't prove a hack."

**Why it matters:** 会有三个数字被当作一个来引用 — Binance 自己的影响估算、第三方在盗取时点的估值、Arkham 的钱包快照 — 所以第一件要修的是单位。第二件是机制。一家交易所通过*从服务容器提交的提现交易*流失 63 亿美元，意味着这是签名路径与私钥互为不同对象的架构，失效的控制点在容器上，不在 HSM 上。CoinDesk 还保留了它标题丢掉的限定："would be the largest ever crypto attack" 是条件句，另有"The transfers alone, however, don't establish whether the funds have become impossible to freeze or recover."市场面：比特币"dropped 4.8% to below $77,000"，以太坊 −5.7%，BNB −8%，AAVE −11%。

[`🔗 CoinDesk — Binance loses $5.7 billion in largest crypto hack to date`](https://www.coindesk.com/business/2026/10/29/potential-multi-billion-binance-hack-hitting-crypto-markets) · [`🔗 Security Affairs — Binance investigates suspicious transfers worth up to $5.8 billion`](https://securityaffairs.com/202089/hacking/binance-investigates-suspicious-crypto-transfers-worth-up-to-5-8-billion.html) · [`🔗 Hacker News 讨论`](https://news.ycombinator.com/item?id=50296470)

---

## 22. YC 在 Minecraft 和 Mindustry 里跑智能体集群 — GPT 以 6 比 1 获胜，还去读了游戏源码

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 215+ pts · ~6h ago (~05:40 UTC+8)
- **Tags:** `multi-agent` `agent-harness` `benchmark` `minecraft` `mindustry`

YC Labs 与 Olam Labs 做了三个多智能体实验，并把背后的 harness 全部开源：`yc-software/minecraft-agent-harness`（MIT，创建于 2026-10-29，24 星）、`olamlabs/multi-agent-mindustry`（GPL-3.0）与 `olamlabs/harbor-multiagent`（Apache-2.0，是 Terminal-Bench 背后 Harbor 框架的分支，文中称它"runs multiple agents in any environment"）。

数字很具体。**Civ50**：50 个 GPT-6.1 Sol 智能体，3 小时，唯一目标"Build a thriving civilization"，约 **5,900 条消息**，长出了配给台账和一套伪政府。层级来自智能体目录的顺序，所以"Ada, who was first, became the de facto leader"。总共 34 次智能体死亡，**首夜 22 次** — 而页面随后对照自己的图表做了更正："The first-night count in the text is the 22 deaths before minute 20. Two of them fall outside the shaded band."**Bed Wars**：九局各 45 分钟，10 个 Claude Opus 5.5 对 10 个 GPT-6.1 Sol —"GPTs won our series **6–3**."**Mindustry**：7 局、约 9.5 小时 —"The GPTs (GPT-6.1 Sol in Codex) won **6-1** against the Claudes (Claude Opus 5.5 in Claude Code) in the 7 games"，其中第 3 局打了 4 小时 16 分。

行为差异才是真正的产出。GPT 阵营把消息压缩到空格消失（`G7T5FIRSTcourierLIVE`），Claude 阵营演化出"+1"式提案投票；而最有普遍含义的一条是"When stuck, GPTs read the source code" — 它们会从网上抓 Mindustry 的公开源码，去理解单位与机制。"This did not let them alter the source code of the game."以及："The Claudes never searched up game code from the web."

**Why it matters:** 方法论那句才是检验任何"智能体集群"结论的尺子："**We intentionally do no harness-level customization or special memory work.**"这让实验可读、可复现，却并不构成模型对比 — 两个模型跑在不同的 harness 里（Codex 对 Claude Code），所以 6 比 1 是关于*配对*的陈述，正是本刊反复从另一个方向撞到的结论。战术细节则很诚实：Claude 在第 6 局输掉，是因为防空炮塔里"55 of them were loaded with COPPER"；第 7 局它们建了"a ring of 207 duos fed with graphite"，挡住了"the same 24-zenith strike" — 靠的是测量出来的修补，不是更聪明的模型。

[`🔗 YC Labs — Agents in Games`](https://labs.ycombinator.com/projects/games/index.html) · [`🔗 yc-software/minecraft-agent-harness`](https://github.com/yc-software/minecraft-agent-harness) · [`🔗 olamlabs/multi-agent-mindustry`](https://github.com/olamlabs/multi-agent-mindustry) · [`🔗 Hacker News 讨论`](https://news.ycombinator.com/item?id=50296486)

---

## 23. IBM 在 151 秒里发布了 33 个 Langflow CVE — 其中三个早在 198 天前就修好了

- **Velocity:** ▮▮▮ trending
- **Source:** NVD / IBM PSIRT · 33 records, 2026-10-29 16:17:35–16:20:06 UTC
- **Tags:** `cve` `langflow` `agent-platform` `mcp` `disclosure-lag`

针对"IBM Langflow OSS"的 33 个 CVE 在**两分半钟的窗口**内进入 NVD：6 个严重（**三个 9.9、三个 9.8**）、11 个高危、16 个中危。所有分数都出自同一方 — `psirt@us.ibm.com`，在部分记录里落在 `Primary` 槽、在另一部分落在 `Secondary`，这恰恰说明槽位不是来源。NVD 没有发布自己的分数：该窗口内每一条记录都停在 **`Undergoing Analysis`**（三个 9.9 之一的 CVE-2026-107328 亦然），且 `configurations` 全部为 null，整批没有任何 CPE 范围。产品是 `langflow-ai/langflow` — **156,149 星、MIT**，v1.13.0 于 2026-10-22 发布，而公告里自己的命令指向同一个产物：`pip install --upgrade "langflow==1.13.0"` 与 `langflowai/langflow:1.13.0`。

这批其实是**三份公告**，引用列表按修复波次干净地分开：`node/7293015`（16 个 CVE，"1.0.0 - 1.12.3" → 升级到 **1.12.4**）、`node/7293016`（13 个 CVE，"1.0.0 - 1.12.4" → **1.12.5**）、`node/7294467`（4 个 Langflow CVE 外加三个由 `security-advisories@github.com` 评分的 **Hono** 依赖 CVE，"1.0.0 - 1.12.8" → **1.13.0**）。这些版本分别发布于 2026-09-29、2026-10-06、2026-10-22 — 比披露早 **30、23、7 天**。

然后范围开始不成立。公告 7293016 说得很直白："**This bulletin also discloses fixes delivered in prior releases: CVE-2026-107366 was fixed in version 1.9.0; CVE-2026-18894 was fixed in version 1.11.2; and CVE-2026-77817 was fixed in version 1.11.5.**"对应版本发布于 2026-04-14、2026-08-04、2026-08-25 — 比记录早 **198、86、65 天** — 但每一个 CVE 自己的描述仍写着"1.0.0 through 1.12.4"，而 `configurations` 为 null，记录里没有任何字段承载这个更正。CVE-2026-107366 三者中最糟：它**单独在 2026-10-20 发布**，比这批早九天，带着同样被夸大的区间。

**Why it matters:** MCP 相关的缓解措施是 Langflow 运维者今天最该读的部分。公告 7293016 写道："Set `LANGFLOW_MCP_SERVER_INTERPRETER_HARDENING=true` to reject direct shell-script execution, and set `LANGFLOW_CUSTOM_COMPONENT_ADMIN_ONLY=true` to block non-admin MCP stdio access"，同时补上一句"**These controls do not replace the upgrade**"，并点名会把这些防护推翻的开关："Explicitly enabling `LANGFLOW_ALLOW_PUBLIC_CUSTOM_COMPONENTS` permits custom component execution and changes the default protection described for CVE-2026-18894."公告 7294467 的摘要把"**unauthenticated remote code execution exploitable through model context protocol tool enumeration**"列为它归并的四个问题之一。而上限是披露滞后的测量，不是严重度的测量：同一个下午发的是四月、八月、九月、十月的修复，所以"今天 33 个 CVE"描述的是文书何时闭合，不是代码何时改变。

[`🔗 IBM 公告 node/7293015（16 个 CVE → 1.12.4）`](https://www.ibm.com/support/pages/node/7293015) · [`🔗 IBM 公告 node/7293016（13 个 CVE → 1.12.5，MCP 缓解措施）`](https://www.ibm.com/support/pages/node/7293016) · [`🔗 IBM 公告 node/7294467（4 个 CVE + Hono 依赖 → 1.13.0）`](https://www.ibm.com/support/pages/node/7294467) · [`🔗 CVE-2026-107328（NVD）`](https://nvd.nist.gov/vuln/detail/CVE-2026-107328)

---

## 24. CVE-2019-25781 的编号里写着 2019，`dateReserved` 里写着 2026-10-29 — 而修复方案是"我们总有一天会重构"

- **Velocity:** ▮▮ rising
- **Source:** NVD / cveawg / GitHub · published 2026-10-29 13:08 UTC
- **Tags:** `cve` `python` `markdown` `redos` `maintenance`

VulnCheck 于 2026-10-29 发布 **CVE-2019-25781**：**CVSS 3.1 7.5** 与 **CVSS 4.0 8.7**，两个分数都由 VulnCheck 给出，CWE-407。描述为："Python-Markdown 3.0 through 3.11.2 contains an algorithmic complexity vulnerability in inline link parsing that allows remote attackers to exhaust CPU through unmatched brackets"，把 `LinkInlineProcessor.getText()` 与 `getLink()` 逼进"quadratic scans that keep workers busy for minutes"。

编号里的年份不是预留年份。cveawg 为该记录给出的 `dateReserved` 是 **2026-10-29T11:51:49.648Z** — 比发布早 **77 分钟**。那个 2019 是 VulnCheck 指向原始报告的方式：issue **#798，"Parsing [[[[[[… takes quadratic time"，开启于 2019-03-06**，至今**仍然开着**。

该记录没有点名任何修复版本。它的 CNA 容器写着 `affected: [{version: "3.0", lessThanOrEqual: "3.11.2"}]`，`defaultStatus: "unaffected"`，没有 `unaffected` 条目、没有 `changes[]` — 而 **3.11.2 就是 PyPI 的 `latest`**，上传于 2026-10-19。上游的轨迹说明了原因。2026-10-13，一位报告者开了 **#1654**，把一个 issue 里塞进六种二次复杂度载荷，并写下"One line of input is enough."一位维护者在 71 分钟后关掉了它："I would duplicate link discusion to https://github.com/Python-Markdown/markdown/issues/798 … We just need to get around to the refactor"，还加了一句会流传更广的话："I know it is easy to tell AI to find every performance issue, but then just posting a novel of them all in a single issue isn't very helpful."

**Why it matters:** 这是每一个日期形状的信号都用不同方式误导的案件，唯一诚实的说法只能由字段支撑：编号说 2019，`dateReserved` 说 2026 年 10 月 29 日，代码在 2019 年被报告过、在 2026 年 10 月被再次报告，而唯一能安装的版本正是记录称为受影响的版本。7.5 与 8.7 的差距同样是一对同源数字 — 同一个 CNA、两个 CVSS 版本、相差 1.2 分 — 所以不带版本地引用任何一个，都会得出一个没人需要为之负责的数字。对任何渲染用户 Markdown 的东西 — MkDocs、wiki、文档流水线，以及每一个会把抓来的 README 转成文本的 agent harness — 实际结论是：缓解手段是给渲染器加超时，不是升级，因为没有升级可升。

[`🔗 CVE-2019-25781（NVD）`](https://nvd.nist.gov/vuln/detail/CVE-2019-25781) · [`🔗 Python-Markdown issue #798（2019-03-06 开启，仍未关闭）`](https://github.com/Python-Markdown/markdown/issues/798) · [`🔗 Issue #1654（2026-10-13 开启并关闭）`](https://github.com/Python-Markdown/markdown/issues/1654)

---

## 25. Evo 2 的 40B 检查点在 Blackwell 上只有 25.7% — 缺口是一个投影的求和次序，不是权重

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.39415 · 2026-10-29
- **Tags:** `quantization` `fp8` `reproducibility` `gpu` `checkpoints`

两位作者（Xun Ding、Ziyuan Qin）从一句读起来像规格缺陷的话出发："**FP8 formats specify how values are stored, not how products are summed; this gap can break checkpoints.**"DNA 语言模型 Evo 2 为其 1B 与 40B 检查点明确要求 Hopper FP8。在两块 Blackwell（sm_120）GPU 上，两者都没通过开发者自己的前向测试 — 7B 通过 — 而"on an RTX 5070 Ti the 40B's next-base accuracy is **25.7%**, near guessing."

结论是：这个失败来自算术，而不是数值噪声。在 Hopper 上，"natively, **99.996%** of one projection's outputs are correctly rounded (**H100: about 30%**), and fp32 accumulation of the same operands fails" — 也就是说*更高*的精度反而更糟，因为模型是对着某一种特定舍入验证过的。他们的 H100 FP8 GEMM 模拟器（mmaemu，"bit-exact on captured 1B projections"）把依赖定位到 **1B 的 21 个投影中的第一个**：在那里"exact sums fail but pass when shrunk by the H100's 1.4% (measured in-sample), not 2.1%."只模拟这一个投影、权重不动，就让"40B BRCA1 variant-classification AUROC from **0.434 to 0.869** (H100: 0.868)"在 RTX 5070 Ti 上成立，在 RTX PRO 6000 上从 0.481 升到 0.867。

**Why it matters:** 限定由作者自己给出，并框住了结论的边界："We tested one model family but not training origin"，而 1.4% 的缩放是样本内测得的。但可复用的部分是这个建议 —"**releases should specify reference arithmetic**" — 因为一个只在某块 GPU 的累加次序下才复现的检查点，并不具备其许可证与文件格式所暗示的可移植性。给任何部署 FP8 权重的人的判断线索是：一个在模拟参考内核后消失的大幅基准下跌，说明你测的不是模型，而是厂商对着验证的那次 matmul。前向测试在开发者的硬件上通过，并不是对你这块硬件的兼容性陈述。

[`🔗 arXiv 2610.39415`](https://arxiv.org/abs/2610.39415) · [`🔗 全文（HTML）`](https://arxiv.org/html/2610.39415v1)

---

## 26. 一个世界模型和它的玩家能一起塞进 Pico 2 W — 26k–131k 参数，每帧 2–8M 次乘加

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 163+ pts · ~8h ago (~04:32 UTC+8)
- **Tags:** `world-models` `edge` `microcontroller` `transformers` `games`

`SheepSeb/tinyworldformer`（138 星，创建于 2026-10-22，**没有许可证文件**）把两个网络放进一块 Raspberry Pi Pico 2 W，并跑在同一个核上。网络一从当前帧加动作预测下一帧与奖励 — **looped transformer，int8，26k–131k 参数，每帧 2–8M 次乘加**。网络二选择动作 — 两层隐藏层的 MLP，float32，**9k–16k 参数**。两者也在浏览器里以 WebAssembly 运行，所以你可以亲手玩这个梦。

五个游戏，每个都是几百行 numpy，附一张留出集精度表：Breakout **99.99%**、Flappy Bird **100%**、Pong **99.45%**、Pac-Man lite **86.4%**、Doom-lite **83.6%**，其中"Exact frames"被定义为"the share of held-out transitions where every cell of the predicted frame matches the real game"，并排除随机事件之后的帧。在芯片上，"the actor only sees frames the world model generates, and the world model only gets actions from the actor" — 核 1 负责两者，核 0 负责 USB 与显示。

**Why it matters:** 精度表最弱的那一行自带解释，而正是这一点让人相信另外四行："Doom-lite's 3D view has 768 cells and a single shaded wall pixel off counts the whole frame as wrong, so its number looks worse than it plays; the game state is almost always right."这是精确匹配指标在做它该做的事，而且被披露出来，而不是被悄悄重定义。设计约束才是有意思的部分 — 一帧必须承载整个游戏状态，于是隐藏状态必须被*画进*帧里（"the ball's heading is part of its token, and Doom-lite has a minimap"）— 这比大多数论文都更干净地说明了世界模型究竟是什么。

[`🔗 tinyworldformer — research demo`](https://sheepseb.github.io/stealth/posts/tinyworldformer.html) · [`🔗 SheepSeb/tinyworldformer`](https://github.com/SheepSeb/tinyworldformer) · [`🔗 Hacker News 讨论`](https://news.ycombinator.com/item?id=50295450)

---

## 27. ElementaryUI 三天内补齐 SSR、持久化响应式与 keyed 列表 — 浏览器里的 Swift，Apache-2.0

- **Velocity:** ▮ steady
- **Source:** Hacker News · 74+ pts · ~7h ago (~04:56 UTC+8)
- **Tags:** `swift` `webassembly` `frontend` `reactive-ui`

`elementary-swift/elementary-ui`（**557 星、Apache-2.0**，创建于 2024-09-29）构建"SwiftUI-style apps that run in the browser" — 用 Embedded Swift 把声明式 Swift 编译成 WebAssembly，由 `@State`、`@Environment` 与 `@Reactive` 承载响应式模型。对体积最关键的那句是："Full Embedded Swift support means **kB-sized wasm bundles instead of MB**."v0.8.1 于 2026-10-27 发布；把它送上 Hacker News 的是之后三天的提交 —"basic support for SSR/SSG rendering of ElementaryUI views (#145)"、"persistent reactive listeners (#146)"、"cheaper listener fan-in and inline tracked dependencies (#147)"、"allocation-free listener callback for schedulable nodes (#148)"，以及"keyed `ForEach` with `id:` and per-row tracking (#149)"。

**Why it matters:** SSR/SSG 与 keyed 列表身份是把演示框架和能上线的框架分开的两个特性 — 前者决定页面能否在 wasm 加载前渲染，后者决定状态能否在重排后存活 — 而两者在一个两周岁的项目上一周之内落地。边界也被写明而不是暗示："ElementaryUI is an open-source project and not affiliated with or endorsed by Apple Inc."如果 wasm 包真的只有几 KB，那么有意思的问题就不是 Swift 能否在浏览器里跑，而是一个编译到 wasm 的 UI 框架能否在没有虚拟 DOM 的情况下保住身份与 hydration 语义 — 而那正是 #146 到 #149 实际在测的东西。

[`🔗 elementary.codes`](https://elementary.codes) · [`🔗 elementary-swift/elementary-ui`](https://github.com/elementary-swift/elementary-ui) · [`🔗 v0.8.1 发布`](https://github.com/elementary-swift/elementary-ui/releases/tag/0.8.1)

---

## 28. RetroChessBench 要求还原一盘棋的历史，GPT 6 Astra 在 24 次里失败 22 次 — 给了代码执行仍是 18 次

- **Velocity:** ▮ steady
- **Source:** arXiv 2610.39341 · 2026-10-29
- **Tags:** `benchmark` `reasoning` `chess` `tool-use`

一篇单作者论文（Tidor-Vlad Pricope）在逆向国际象棋里做了一个 **12 题**基准 — 重建合法历史并"distinguish possible events from forced ones" — 带"references, rubrics, and a terminal-reward environment"，覆盖"exact-length constructions, unique endings, and exhaustive answer sets"。在"two trials per task and condition, **GPT 6 Astra High fails to produce the required final answer in 22/24 attempts without tools and 18/24 with code execution**; mean terminal RL rewards are **14.75% and 27.19%**, respectively."

失败模式被点名而不是被评分抹掉："failed responses reject legal histories and treat temporary obstructions as permanent."而假设被当作假设提出 — 认为"limited exposure to these missing explanations in web-derived training data contributes to the observed reasoning failures"，因为"online retrograde archives often provide puzzles and final move sequences without detailed derivations."

**Why it matters:** 逆向国际象棋是本刊反复绕回的那个问题的干净版本：一个有明确、可校验规则、而网上几乎没有解法的领域。一个能对数学研究有贡献、却还原不出一段合法历史的模型并不自相矛盾 — 这是证据，说明数学表现部分是对解法*形状*的检索，也正是论文自己的结论："Claims of general intelligence require evidence that models can transfer learnt principles to areas with few worked examples."从 14.75% 到 27.19% 这一步，也该在读成模型结论之前先读成 harness 结论 — 同样的题、同样的模型，只多了一个工具。

[`🔗 arXiv 2610.39341`](https://arxiv.org/abs/2610.39341) · [`🔗 全文（HTML）`](https://arxiv.org/html/2610.39341v1)

---

## 29. Pico CSS 已归档 — 16,828 星、最终版本停在十九个月前，给出的理由是 AI

- **Velocity:** ▮ steady
- **Source:** Hacker News · 62+ pts · ~2h ago (~09:58 UTC+8)
- **Tags:** `css` `open-source` `maintenance` `frameworks`

"Pico CSS is no longer maintained"这条讨论在 2026-10-30 登上 Hacker News，但决定比帖子更早：仓库于 **2026-10-04** 被归档，帖子也是同一天写的。`picocss/pico` 现在是 `archived: true`，**16,828 星**。给出的理由异常直白："**Today, AI can generate lightweight, standalone, accessible HTML with just the CSS it needs, so a Minimal CSS Framework for Semantic HTML matters less than it used to.**"另一条路是重写，而它选择了不做 —"plain modern CSS instead of Sass, built on features it doesn't use today (OKLCH colors, cascade layers, Popover, anchor positioning)"，加上"a native compiler that strips unused CSS" — 那"would be a different project."

留下的："Nothing breaks. npm, the jsDelivr CDN and picocss.com stay online for the long term."停下的："The repositories are archived. No new issues, PRs or releases."而分叉条款是大多数项目会搞错的那部分 —"Pico CSS is MIT licensed. You're free to fork it,"紧接着"**The Pico CSS name and logo are not covered by the MIT license. Please give your fork its own name**, so users don't confuse it with the original."

**Why it matters:** 在转述这个理由之前，先把它和时间线对照读。最终版本 **v2.1.1 发布于 2025-03-15** — GitHub 与 npm 上都是 — 所以项目在被归档之前已经**十九个月**没有发布过任何版本，而"AI 让它不再必要"这个解释，是针对一个早于该解释的维护空档提出的。这并不说明理由错了，只说明它无法被检验；而它是本刊记录中第一个把 AI 说成关停原因（而非功能）的广泛使用的框架。真正可以干净切分的是许可证的拆分 — 代码用 MIT、名字用商标 — 这是正确的安排，也是唯一能避免分叉继承那些并未选择它的用户的做法。

[`🔗 picocss/pico discussion #754`](https://github.com/picocss/pico/discussions/754) · [`🔗 picocss/pico（已归档）`](https://github.com/picocss/pico) · [`🔗 Hacker News 讨论`](https://news.ycombinator.com/item?id=50298964)

---

## 30. Cursor 市场上的官方 Claude Code 扩展在 2.1.313 里带了一个 SSH 后门

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 143+ pts · ~1h ago (~19:05 UTC+8)
- **Tags:** `supply-chain` `claude-code` `cursor` `ssh-backdoor` `incident`

Phorion 于 2026-10-30 发布安全公告（作者 Calum Hall），披露 **Cursor 市场**上**官方 Claude Code for VS Code** 扩展遭到篡改：被植入后门的扩展包内含一个持久化 SSH 后门，针对 macOS、Linux 与 Windows 各有安装路径，版本号为 **2.1.313**。注入方式是在压缩后的 `extension.js` 前面拼一个立即执行函数，引入 `child_process`、`fs`、`os`、`path`、`http` 与 `crypto`，并且"Node 一加载该文件就执行，早于扩展正常的 `activate` 回调。用户完全不需要与扩展交互，载荷就会触发。"Cursor 已下架该版本，公告称同时从 npm 与 VS Code 注册表撤下了 2.1.313。

整条链分四段。**第一段**把一个由攻击者控制的 Ed25519 公钥追加进 `~/.ssh/authorized_keys`（目录 0700、文件 0600），注释为 `svc-telemetry`；写入前的检查比对的是**注释字符串**而不是密钥本身。随后尝试启动 sshd——Linux 走 `systemctl`/`service`/init.d，macOS 走 `sudo -n systemsetup -setremotelogin on`，Windows 用 PowerShell 安装 OpenSSH Server。**第二段**把第二把内嵌私钥（`svc-telemetry-tun`）写到 `$TMPDIR/.stk_<10 位十六进制>`，然后以用户 `tunnel` 向 `134.209.82[.]225` 建立反向隧道，参数 `-R *:0:localhost:22`，外面包一层脱离终端的 60 秒重试循环，即使 IDE 关闭仍存活。**第三段**做持久化：`~/Library/LaunchAgents/com.apple.sysmond.plist`（`RunAtLoad` + `KeepAlive`）、`@reboot` crontab 条目，或 `SysMon` 计划任务。**第四段**回连：把主机名、用户名、平台、架构、当前目录、`git config --global user.email`、公网 IP，以及最多 **40 个**匹配 `/KEY|TOKEN|SECRET|PASS|AWS|GCP/i` 的**环境变量名**，POST 到 `134.209.82[.]225:8099` 的 `/beacon`——是**变量名，不是值**——同时向 `127.0.0.1:8099` 发一份，而脚本自身并未在该端口监听。

**两项独立的注册表检查印证了这个版本号。** npm 上 `@anthropic-ai/claude-code` 的文档列出 553 个版本，`dist-tags` 为 `latest: 2.1.314`；**2.1.312 发布于 2026-10-27T18:36:10Z，2.1.314 发布于 2026-10-30T00:12:56Z，两者之间没有 2.1.313**。上游 `CHANGELOG.md` 从 `## 2.1.314` 直接跳到 `## 2.1.312`，字符串 `2.1.313` 出现次数为**零**。Anthropic 与 Cursor 双方我都没有找到公开声明，这份公告也没有 CVE。

**Why it matters:** 三个实现缺陷限制了影响半径，而它们都不是防线。macOS 上脚本**不提权**执行 `systemsetup -getremotelogin`，普通用户会得到标准输出上的 `You need administrator access to run this tool... exiting!` 且退出码为 0，`/Off/i` 永远不匹配，于是启用步骤被整段跳过——恶意代码"实际上把'我没权限检查 SSH 是否关闭'当成了'SSH 已经开着'"。这只在一台本就没开远程登录的 Mac 上切断了入站路径；公钥和 LaunchAgent 照样落地。Windows 路径把 PowerShell 交给一个硬编码 `/bin/sh` 的辅助函数。Linux 的 crontab 检查"在重复运行时可能清空用户已有的定时任务"。卸载扩展不会移除其中任何一项——公告给出的处置清单是：杀掉隧道进程、卸载 LaunchAgent、删除 `~/.config/.smt` 与 `.smtk`、移除公钥、轮换所有命中该环境变量过滤器的凭据。而结构性的一点比这次事件更久：IDE 扩展以 IDE 的权限运行，所以扩展宿主在后台写 `~/.ssh/authorized_keys` 本身就是信号，因为"IDE 二进制本身签名是有效的"，而盯着 `echo`/`tee` 的进程规则抓不到 `fs.appendFileSync`。

[`🔗 Phorion — Official Claude Code Extension Compromise`](https://phorion.io/blog/offical-claude-code-vsx-compromise/) · [`🔗 GossiTheDog（Mastodon）`](https://cyberplace.social/@GossiTheDog/117528831681803563) · [`🔗 Hacker News 讨论`](https://news.ycombinator.com/item?id=50302334)

---

## 31. Herdr 发布原生应用 — 窗口本身就是一棵文件树，关掉窗口不会停掉你的 agent

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 241+ pts · ~11h ago (~08:42 UTC+8)
- **Tags:** `agent-infra` `terminal` `multiplexer` `rust`

`herdrdev/herdr-app`（Apache-2.0，Rust）是一个面向终端与编码 agent 的桌面应用，创建于 2026-10-16，现有 **582 stars**、44 个 fork、83 个未关闭条目，**v0.1.9 发布于 2026-10-30**——CHANGELOG 里同日还有 0.1.8，10-29 有 0.1.7。它是 **herdr-core** 的客户端，README 把 core 描述为"你机器上的一个小服务"："窗口负责排列终端，core 负责运行它们。关闭窗口，它们继续运行。"

两个设计选择把它与 tmux 形态的方案区分开。第一，**agent 派生 agent 是一等动词**——`hc run --bg codex "review my diff. Done: hc send t1"` 起一个助手并指定回报方式；`hc send t3 "take another look"` 中途改它的方向；"报告、退出和'需要你'都会落进其父 agent 的输入里。"侧边栏把每个 agent 归为 Working / Blocked / Done / Idle。第二，**界面就是一个目录**：一切都放在 `~/.config/herdr-app` 下的 `settings.json`、`keys.json`、`layouts/`、`themes/` 和 `mods/`——后者是绘制面板与菜单的小段 JavaScript——并配一份 `AGENTS.md` 告诉 agent 它可以改什么。没有插件 API，也没有需要维护的分叉。SSH 机器会并入同一个侧边栏，远端 agent 只要"远端机器与 core 还在运行"就继续跑。

**Why it matters:** 诚实的句子在 README 里而不是落地页上："重启或 core 崩溃之后，保留下来的窗格会在原来的目录里得到新的 shell，而不是原来的程序。"——所以"关掉它，它们继续跑"对关闭窗口成立，对主机重启不成立，而这正是 tmux 用户会先问的那个区别。另外两条注意事项也写在明处："两个安装脚本都会下载并执行代码"（curl 管道执行与 `irm … | iex`），以及 macOS 预编译包只支持 Apple Silicon，Intel Mac 被要求从源码构建。HN 讨论里主要是长期使用多路复用器的老用户，最尖锐的问题指向守护进程与融资，而不是功能列表——对一个如今横在你和 agent 持有的全部凭据之间的工具来说，这恰恰是对的问题。

[`🔗 herdrdev/herdr-app`](https://github.com/herdrdev/herdr-app) · [`🔗 herdr.dev`](https://herdr.dev) · [`🔗 Hacker News 讨论`](https://news.ycombinator.com/item?id=50298436)

---

## 32. Clover-35B-A3B-Preview 把扩散语言模型推到 35B — 而它的速度数字是在"内部 agent 负载"上测的

- **Velocity:** ▮▮ rising
- **Source:** Hugging Face Blog · published 2026-10-30
- **Tags:** `diffusion-lm` `moe` `open-weights` `agentic-coding`

DiffuSpace——即 Dream 7B 背后的团队，那款模型 2025 年 4 月由港大 NLP 组发布，博文称 Dream 系列在 Hub 上已累计超过 **270 万次下载**——于 2026-10-30 发布 **Clover-35B-A3B-Preview**：一个 MoE **扩散**语言模型，总参数 35B / 激活 3B，支持思考模式，Apache 许可，权重挂在 Hugging Face、GitHub 与 ModelScope，推理侧支持 SGLang 与 llama.cpp。

它的基准表是扩散模型在这个规模上交出的最有竞争力的一份：**SWE-bench Verified 73.6**、**Terminal-Bench 2.1 51.7**、**τ³ Overall 65.3**、GPQA Diamond 83.8、ZebraLogic 95.8、AA-LCR 72.0 —— 在它自己的对比里，六项 agent 基准全部第一，对手包括 LLaDA2.2 flash、Mercury 2.5、Qwen3.6-35B-A3B 与 Qwen3.5-35B-A3B。

效率类主张的分母才是关键。**680 tokens/s** 测于"**内部 agent 负载**，单张 NVIDIA GB300，BF16 精度，batch size 1"——不是公开套件，而 batch 1 正是扩散并行解码最占优的区间。H200 上的对比 **515 tokens/s 对 365**，对手是"DFlash2 配置"下同等规模的 Qwen，即某一套特定加速栈，而不是该模型的出厂形态。端侧那个数字最干净：**INT4 跑在 16 GB 显存的 RTX 5070 Ti** 上，MATH-500 **101.8 tokens/s**，对比"同等规模的 MiniCPM 与 Qwen 模型"的 48.5。

**Why it matters:** 让速度主张站得住的是架构改动，而它描述得足够具体、可以被核对：一个**双向 Gated DeltaNet**，"已生成的上下文被高效压缩进 GDN 的循环状态，而当前块内的 token 通过细粒度双向 softmax 注意力交互"；记忆的**读出被当作一个独立信息单元，参与同一层 softmax**；加上可学习的块大小校准，以及一条零初始化、面向右侧上下文的卷积分支。注意事项就在名字里——这是 **Preview**——而这六项 agent 成绩目前没有任何独立评测。可迁移的读法是：这里的"更快"是一个解码**区间**（batch 1、扩散、GB300）加上某个特定基线加速栈的性质；对服务团队来说，680 应视为某一类负载形态的上界。

[`🔗 Hugging Face — Clover-35B-A3B-Preview`](https://huggingface.co/blog/Diffuspace/clover-35b-a3b-preview) · [`🔗 Diffuspace/Clover-35B-A3B-Preview`](https://huggingface.co/Diffuspace/Clover-35B-A3B-Preview) · [`🔗 DiffuSpace/Clover-35B-A3B-Preview`](https://github.com/DiffuSpace/Clover-35B-A3B-Preview)

---

## 33. Elixir 标准库在一个上午出了三个 CVE — 而它自己的文档写错了默认值

- **Velocity:** ▮▮ rising
- **Source:** NVD / EEF CNA · published 2026-10-30
- **Tags:** `elixir` `stdlib` `denial-of-service` `cve`

来自 Erlang Ecosystem Foundation 这个 CNA（`6b3ad84c-e1a6-4bf7-a703-f496b71e49db`）的三条记录在 2026-10-30 落地，全部由该 CNA 打分，在 NVD 上全部仍是 `Received`，**NVD 自评指标为 0**。运营上真正要管的是 **CVE-2026-115274**（6.9，CVSS 4.0，CWE-1284）：`JSON.decode/1` 与 `decode!/1` 把每个整数字面量直接交给 `erlang:binary_to_integer/1` 且不限长度，于是"一百万位的字面量能正常解码，但 CPU 开销是同长度字符串的 100 到 300 倍，因此几 MB 的请求体就能把一个调度器占住约一秒"；超过约 129 万位会抛 `SystemLimitError`。那句暴露面要读两遍："由 `phx.new` 生成的应用在 `Plug.Parsers` 里用 `JSON` 解码请求体，**早于路由与鉴权**。"

**CVE-2026-109821**（6.3，CVSS 4.0，`AT:P`）是同一个"数量不受限"形状在 `URI.parse/1` 里的重复：`split_authority/1` 用 `String.to_integer/1` 转换端口且不限长度，最多 1,262,592 位的十进制端口会变成一个大整数，而把 URI 渲染回文本时走 `:erlang.integer_to_binary/1`，在 Erlang/OTP 27、28 与 29.0 上是平方级——"40 万位的端口渲染约 2.6 秒，1 MB 的端口约 18 秒。"大于 65535 的端口同样被接受。**CVE-2026-97209**（5.4，`AV:L`）性质不同：`Mix.Tasks.Deps.Partition.server/4` 通过共享系统临时目录下一个固定名称的目录传递分区配置，并信任读回来的内容，而 `File.mkdir_p/1`"接受一个已存在的目录，却不检查其属主"——于是在同机另一用户先创建该目录的情况下，可以在编译用户身份下执行代码。影响范围仅 `1.20.0-rc.4` 到 `1.20.5` 之前。

**Why it matters:** EEF 自己的技术分析里含有最值得推广的那句话："`JSON.decode/3` 的文档把 `&String.to_integer/1` 写作默认值，**它转换方式相同**"——而代码调用的是 `erlang:binary_to_integer/1`。文档在行为上没错，在函数名上错了，而这正是能躲过评审的一类缺陷。修复版本是 **1.18.6、1.19.7 与 1.20.5**，横跨三条分支线。6.9 这个分数低估了 CVE-2026-115274：它落在请求解码器里，任何路由、plug 或鉴权检查都看不到它，所以按路由限流不是缓解手段——缓解手段是升级。

[`🔗 EEF CNA — CVE-2026-115274（JSON）`](https://cna.erlef.org/cves/CVE-2026-115274.html) · [`🔗 EEF CNA — CVE-2026-109821（URI）`](https://cna.erlef.org/cves/CVE-2026-109821.html) · [`🔗 CVE-2026-115274（NVD）`](https://nvd.nist.gov/vuln/detail/CVE-2026-115274)

---

## 34. Azure 的 API Connections 给了五个完整的跨租户沦陷 — 而其中一次修复重开了上一个洞

- **Velocity:** ▮ steady
- **Source:** Hacker News · 10+ pts · ~2h ago (~18:06 UTC+8)
- **Tags:** `azure` `cloud-security` `cross-tenant` `logic-apps`

Binary Security 的 Haakon Wik Gulbrandsrud 于 **2026-10-02** 发表本文，2026-10-30 登上 Hacker News。主张很大，机制很小：Azure 的 **API Connections**（Logic Apps 背后的共享组件）允许一个租户操作另一个租户的连接，并借此操作该连接所认证的后端——Key Vault、Azure SQL、Jira、Salesforce，"实际上没有边界"。链条成立的原因是 ARM 的 `DynamicInvoke` 与 `/extensions/proxy/` 端点能触及共享的 APIM 实例，而该实例对所有连接都有权限，于是请求路径里的穿越（`path/%2e%2e/%2e%2e/%2e%2e/%2e%2e/apim/keyvault/<id>/secrets/<name>/value`）可以读到受害租户的密钥。报告说第一次修复"看起来限制的是允许的路径，而不是底层的 token 问题"；作者随后 SSH 进一个 Standard Logic App 把代码取下来，发现**四个未公开的端点**（`DynamicInvoke`、`DynamicList` 以及另外两个），并用 `DynamicList` 对受害者的 Azure SQL 执行了一条任意 `INSERT`。

后续还有两条。Consumption Logic App 本身没有托管标识，因此对**每一个** Version 1 API Connection 都有隐式访问权，只靠输入校验挡着——而 `host.api.RuntimeUrl` 参数允许工作流指定一个不同于连接自带值的 `runtimeUrl`，只要主机名以 `azure-apihub.net` 结尾。微软的修复在**路径规范化之前**就校验了这个 URL，于是追加一段穿越内容即可通过校验，而 APIM 实例看到的是另一个连接。

**Why it matters:** 回归本身就是可迁移的教训："当微软好不容易凑齐这个路径穿越的修复时，一件意外的事发生了——原本的 `RuntimeUrl` 路径**不再被校验**"——第二次修复抹掉了第一次，这正是把补丁对上某个 payload、而不是对上某个原语时会出现的失效方式。作者自己说出的注意事项，是多数组织跳过的缓解措施："当然，搭建这些连接的人完全可以把访问 token 或密钥的权限收窄，让 API Connection 在后端只有最小权限。不过我猜，这么做的人很少。"所有问题都报告为已修复；这篇文章是一个月前的，对它而言是新的，对互联网不是。

[`🔗 Binary Security — Azure's Weakest Link`](https://www.binarysecurity.no/posts/2026/10/one-root-case) · [`🔗 Hacker News 讨论`](https://news.ycombinator.com/item?id=50301854)

---

## 35. Cloud Foundry 的 `/internal/v3/` 暂存回调没拿到 v4 与 v5 的那条拒绝规则 — 而只读审计员能枚举出 GUID

- **Velocity:** ▮ steady
- **Source:** NVD / Cloud Foundry Foundation · CVE-2026-59387 · 记录发布于 2026-10-30
- **Tags:** `cloud-foundry` `access-control` `cve` `privilege-escalation`

**CVE-2026-59387** 得 **8.8（CVSS 3.1）**——`AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H`——由 `security@vmware.com` 分配，在 NVD 上是 `Received`，**没有 NVD 自评分数**。缺陷是一条被扩了两次、第三次漏掉的拒绝名单："Cloud Controller 的 Nginx 路由配置阻止了未认证访问 `/internal/v4/` 与 `/internal/v5/` 端点，却漏掉了针对 `/internal/v3/` 的等效规则。"结果是 `/internal/v3/staging/:guid/droplet_completed` 与 `/internal/v3/staging/:guid/build_completed` "可以从公共 API 监听器访问，且不需要 OAuth 或双向 TLS"。

这买到什么："持有有效 build 或 droplet GUID 的攻击者可以提交一个伪造的暂存回调，把 droplet 转为 STAGED，并在没有关联 package 或 actor 的情况下持久化任意 process metadata 与 sidecar 数据"——而 GUID 并不难拿，因为"**拥有 SpaceAuditor 角色的人可以在没有写权限的情况下枚举 GUID**，这使它成为一次超出预期角色边界的有效提权。"只读角色变成了写入。

**Why it matters:** 两个日期要分开看。Cloud Foundry 的公告日期是 **2026-10-20**，CVE 记录发布于 **2026-10-30**——晚十天，这才是它出现在今天这批里的原因。受影响范围写作"CAPI 至 **v1.245.0**（含）"，修复为 **CAPI v1.246.0 及以上**与 **cf-deployment v60.7.0 及以上**（内含 CAPI v1.247.0）。报告者是 Minseong Kim（mak3bread）。可推广的缺陷是所有"内部端点"故事共有的那一个：把控制表达成**一份被封锁的路径清单**，只要有兄弟版本前缀存在就会失效，而版本前缀恰恰是内部 API 不断堆积的东西。

[`🔗 Cloud Foundry — CVE-2026-59387 公告`](https://www.cloudfoundry.org/blog/cve-2026-59387-broken-access-control-restriction-in-cloud-controller-api/) · [`🔗 CVE-2026-59387（NVD）`](https://nvd.nist.gov/vuln/detail/CVE-2026-59387)

---

## 36. ClickHouse 的 9.5 是未认证 RCE — 而厂商的公开说明只有 28 个词

- **Velocity:** ▮▮ rising
- **Source:** NVD / ClickHouse CNA · CVE-2026-116366 · published 2026-10-30 11:00 UTC
- **Tags:** `clickhouse` `cve` `rce` `disclosure`

**CVE-2026-116366** 是 **9.5（CVSS 4.0）**——`AV:N/AC:H/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H/SC:H/SI:H/SA:H`——由 `ClickHouse` 自己分配，预留时间 **2026-10-26T07:54:23Z**，发布 **2026-10-30T11:00:11Z**。四天。NVD 记录停在 `Received`，只带一个指标：CNA 的 9.5，位于 `Secondary` 槽，`nvd@nist.gov` 指标为零——所以这个数字是 ClickHouse 的，不是 NVD 的；CNA 容器未给出 CWE。`AC:H` 是这个向量距离 10.0 的唯一障碍。

机器可读的部分很精确。四条分支范围，全部是排他的 `lessThan` 上界，锚定到 `packages.clickhouse.com` 与 `github.com/ClickHouse/clickhouse`：`26.3 → 26.3.62.3-lts`、`26.8 → 26.8.36.3-lts`、`26.9 → 26.9.27.3-stable`、`26.10 → 26.10.3.7-stable`。厂商变更日志补上了日期与部署说明："**Fixed in ClickHouse v26.10.3.7, 2026-10-30**"，以及"修复已应用于所有 ClickHouse Cloud 与 BYOC 部署。"致谢给到 **Elshad Toklayev**。

**Why it matters:** 除了漏洞本身，其他都在。公开描述只有一句——"An issue has been discovered in ClickHouse Server that, under certain conditions, could allow an unauthenticated user with network access to execute arbitrary code on the ClickHouse Server"——共 28 个词，里面没有**哪些条件**。于是运维要问的两个问题指向相反方向："我是否暴露"无法从披露中回答，但"我是否已修补"可以从四条精确版本界里回答，且是当天。这算高于平均的披露流程（预留、发布与修复都在一周内，范围写在 CNA 容器里而不只是散文里），配了低于平均的描述——实际的后果是：任何在网络上开着监听端口的 ClickHouse 实例，都该按分数和范围升级，而不是按自己的威胁模型。

[`🔗 ClickHouse 安全变更日志`](https://clickhouse.com/docs/resources/changelogs/security-changelog) · [`🔗 CVE-2026-116366（NVD）`](https://nvd.nist.gov/vuln/detail/CVE-2026-116366)

---

## 37. Prefix Executability：agent 可以完成任务，而它的计划从头到尾都不可执行

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.40444 · 2026-10-29
- **Tags:** `agents` `evaluation` `tool-use` `benchmarks`

四位作者（Amir H. Rezaeian、Weiyi Sun、Yassine Benajiba、Dan Roth）主张，最终任务成功掩盖了真正想知道的事：中间的工具调用轨迹到底跑不跑得通。他们的协议检查"预测出的工具调用序列的每一个前缀，在工具 schema、状态前置条件与数据依赖下是否仍然可执行"，并用五个统计量概括——Prefix Executability 曲线、**First-Error Depth**、Trajectory Executability Rate、按视野归一化的 AUC-PEC 与 Recovery Rate。

实例化落在 **BFCL-v3 multi-turn** 与 **ToolSandbox** 的分层样本上，以及 **τ³-bench** 的 Airline/Retail base 全集。核心结果是一次排名反转："仅看结果与看前缀两种排名会分歧：执行以未经验证的计划为条件的 agent，往往取得比无条件基线更高的最终成功点估计，**同时显著降低 TER 与 AUC-PEC**。"作为验证性干预，"显式的执行前计划检查可以提升可执行前缀的存活率，同时维持有竞争力的最终成功。"

**Why it matters:** 该把它当方法论文读，因为它就是——摘要只定性地报告了这种分歧，没有给出分数、没有逐基准表、也没有效应量，所以谁都不该从里面引一个数字。它确实主张的那一点，正是本刊不断从其他方向撞到的那一点：先做计划的 agent 分数更高，而执行更常出问题，这意味着两个指标不是同一件事的两种分辨率，而是两件彼此权衡的不同的事。若这一点成立，只看终态的评测就是在系统性地挑出那些轨迹会被生产系统拒绝的 agent，而 First-Error Depth 就是告诉你错误落在哪里的那个数字。

[`🔗 arXiv 2610.40444`](https://arxiv.org/abs/2610.40444) · [`🔗 全文（HTML）`](https://arxiv.org/html/2610.40444v1)

---

## 38. 投机解码只在草稿被接受时才省能量 — 超过某个 batch 之后它会变成亏损

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.40287 · 2026-10-29
- **Tags:** `inference` `energy` `speculative-decoding` `serving`

五位作者（Bole Ma、Ayesha Afzal、Jan Eitzinger、Harald Koestler、Gerhard Wellein）用当下真正起约束作用的单位来核算投机解码："大模型服务受限于机房的电力。每个 token 的能量决定一个数据中心能服务多少 token，而时延目标限制每个用户拿到它们有多快。"测量在生产条件下进行——**SGLang 开启 CUDA graphs，H100 与 H200，batch size 最高 64，覆盖 5 个语料**——结论是一组条件，而不是一个加速比。

四条发现，每条都跟通常的说法相抵。第一，"在稠密模型上，**是验证而非起草主导能量开销**。"第二，"节省随 batch 增大而收缩，因为批处理已经把那笔投机想摊到被接受 token 上的权重读取共享掉了。"第三，"在大 batch 下，block drafter 会把验证推过算术与内存流量之间的平衡点，进入算力受限区间，**此时节省变成亏损**，而接受率低的 drafter 会抬高每 token 能耗。"第四，"用投机去满足更紧的时延目标，会额外付出能量"——也就是说时延收益与能量收益在同一工作点上指向相反方向。

接受率也不是 drafter 自己的属性，这一点最可迁移："我们评测的每一个 drafter 在对话上都比代码上接受得更少；每一个训练过的 drafter 在罗曼什语这种低资源语言上都比英语上接受得更少。"

**Why it matters:** 摘要没有给出任何比值——没有每接受 token 的焦耳数，也没有交叉点的 batch 大小——所以这是发稿前要读、而不是照着摘要引的论文。它确立的是：投机解码主张的正确单位是**在给定 batch 与时延目标下、每被接受 token 的能量**，而同一套配置是省是亏，取决于它服务的是哪个语料。最后那句对调参的人才是有用的："更大的 batch 在不做投机时就已经降低了每 token 能耗。投机只在高接受率时才叠加到这个节省上，而在我们测试的模型上，它几乎没给保持时延的 DVFS 留下余量。"

[`🔗 arXiv 2610.40287`](https://arxiv.org/abs/2610.40287) · [`🔗 全文（HTML）`](https://arxiv.org/html/2610.40287v1)

---

## 39. 一个探针在泄漏发生前抓到 82% 的 agent 调用 — 而一个词袋分类器几乎追平它

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.40588 · 2026-10-29
- **Tags:** `agent-safety` `interpretability` `monitoring` `multi-agent`

一篇单作者论文（Leonidas Raghav）就 agent 串谋问了一个窄而可检验的问题："输出过滤只检查 agent 已经写出来的东西。监督者能否提前知道一个 agent 即将让步？"设定是六个场景：一个同侪在最多 20 轮里持续施压，让目标泄露一个秘密——比如部署 token——而"目标往往先拒绝，然后让步。"探针在每次模型调用、输出写出之前读取激活。

数字很强：在留出的 **Qwen3-32B** 情节上，阈值设为标记 **5% 的良性调用**时，探针"抓到 **82%** 的泄漏调用"，而"在相近的标记率下，一个零样本决策模型监控器抓到 **26%**"。在 **gpt-oss-20b** 上，对推理过程做的探针达到 **AUROC 0.91**。

然后论文自己拆掉这个标题，这也是它出现在这里的原因："一个在同样调用上训练的词袋分类器表现接近，所以**大部分增益来自用标签训练，而不是来自激活值**。""探针也会标记被允许的披露：它读到的更多是即将发生的披露，而不是违规本身。"以及："预警是短程的，而对任何告警都中止会停掉大多数良性情节，这一点第二次文本检查也修不好。"

**Why it matters:** 82 比 26 是一个关于**监督方式**的主张——训练过的探针对零样本监控器——而词袋的结果说明这份提升主要来自标签，这就把贡献从"机制可解释性有效"重新表述为"廉价的监督式监控器有效，而激活值是一种顺手的特征"。这仍然有用：生成前预警与输出过滤是不同的控制点，而"在生成前发出的预警，可以让监督者在其他 agent 采取行动、或招募在蜂群里扩散之前，拦下即将让步的 agent"这句正是把检测器放在那个位置的论据。只是别把 82% 读成"你需要模型的内部表示"。

[`🔗 arXiv 2610.40588`](https://arxiv.org/abs/2610.40588) · [`🔗 全文（HTML）`](https://arxiv.org/html/2610.40588v1)

---

## 40. 一个 325M 模型在纯推理 NPU 上从零预训练，与 B200 孪生体的 loss 只差 0.0001 — 而方法是申请了专利的

- **Velocity:** ▮▮ rising
- **Source:** Hugging Face Blog · published 2026-10-26
- **Tags:** `pretraining` `npu` `hardware` `reproducibility`

VIDRAFT 的 FINAL-Bench 在一颗**商用纯推理 NPU** 上**从随机初始化**预训练了 **VKORE-325M-NPU-Base**，325.6M 参数的 decoder-only 模型，"反向传播在芯片上运行"，"没有使用任何预训练权重"。该次运行覆盖 FineWeb-Edu 的 **50 亿 byte token**，**76,292 步，约四天**。并与一条 B200 GPU 上的对照训练并行进行，"同样的初始化、数据、batch 与学习率日程"。

在**两个模型都没见过的 1,024 个 FineWeb-Edu 文本窗口**上：NPU loss **0.7993**，GPU loss **0.7994**，配对差值 **−0.0001，标准误 0.0007**，且"NPU 模型在 **50.1%** 的窗口上更低"。两套权重与评测脚本都已公开，所以这个主张几分钟内就能复核。

**Why it matters:** 文章给自己提的那个框架问题才是真问题——"主流看法是这类芯片无法训练……训练需要反向传播、优化器状态，以及跨越数万步的数值稳定更新，而推理栈不是为此构建的"——而结果是一次受控对照，这在硬件发布里很少见。但让它可引用的，是它自己那节"我们不主张什么"："**不是一个可用的助手。**这是一个 325M 的 base 模型，用 5B token 训练，作为硬件训练结果发布。**不是速度纪录。**……**不是方法本身。**训练循环与稳定性技术是内部方案，且**正在申请专利**。权重、数据配方、超参与评测完全公开。"也就是说，结果可复现，方法不可——任何人都能核对那个 loss，而没有人能在缺少被保留那一块的情况下复现这次训练。请把 0.0001 读作"在这个规模上，纯推理 NPU 可以把一次预训练跑到与 GPU 持平"，而不是"这就是做法"。

[`🔗 Hugging Face — 在纯推理 NPU 上从零预训练一个 325M 模型`](https://huggingface.co/blog/FINAL-Bench/pretraining-a-325m-language-model-from-zero-on-an) · [`🔗 FINAL-Bench/VKORE-325M-NPU-Base`](https://huggingface.co/FINAL-Bench/VKORE-325M-NPU-Base)

---

## 41. Ai2：在"新颖性评审"提示词里改几个词，GPT-5.4 从 93.5% 掉到 40.9%——低于随机

- **Velocity:** ▮▮ rising
- **Source:** Hugging Face Blog / arXiv 2610.02022 · published 2026-10-27
- **Tags:** `evaluation` `research` `benchmarks` `llm-judges`

Ai2 的 **"Old Ideas, Novel Problems"**（Kyle Wiggers 与 Ai2Comms，论文、数据与代码均已发布）检验的是 AI-for-science 系统依赖却很少验证的那个部件：**新颖性评审者**——即被问"这个研究想法是否新"的那个 LLM。标签来自 **ICLR 2026 的同行评审**而非录用结果：**高新颖池**为 **154** 个人类想法，取自所在领域评分前 10% 的录用论文，且评审明确肯定其新颖性、无人提出异议；**低新颖池**为 **145** 个，取自评分后 10% 的拒稿论文，评审提出原创性疑虑、无人给予肯定。一项评审挖掘核对中，标注者与抽取极性的判断在 **50 例里一致 47 例**。

比较了六位评审者——GPT-5.1、GPT-5.2、GPT-5.4、Claude Sonnet 4.5、Claude Opus 4.5、Claude Opus 4.6——在提示词、推理预算、检索、格式与聚合方式上逐项变动。标题式的不稳定：在 Human+Generated 对上，被告知"评审者认为每一对里恰好有一个想法是新的"的 GPT-5.4 得 **93.5%**；改问更简单的"哪个想法是新的"，它得 **40.9%**，低于随机，并且"在同一批对上改变了超过一半的判断"。人类写作的对也未能幸免——同一处改动让 Claude Opus 4.6 在 Human-Only 上移动了 **21 个点**——而且"也不存在普遍更好的提示词"。

**Why it matters:** 最该带出去的一句，是关于已经在用的系统："**检索和额外推理并不能稳定改善判断，而两个专门构建的新颖性评测系统，表现还不如一个简单提示的 Claude Opus 4.6 基线。**"但在引用那个百分比之前，先看标签质量：在 Human+Generated 上，"我们假设生成的想法不如人类写的那么新；这些是**弱标签**，并非对每个想法都经过核实的判断。"论文预判了这个反对意见——一位专家复核了 30 对、并偏向最强评审者答错的那些，在全部 30 对里都选了人类想法，且判定没有一个生成想法是新的——它还指出"我们的许多核心发现根本不依赖标签"，因为"如果两套合理的评测设置对同一对想法给出相反答案，这种不一致本身就揭示了不稳定。"一个措辞变动就摆动 50 个百分点的评审者，测的不是新颖性。

[`🔗 Hugging Face — 我们能信任 LLM 去判断一个研究想法是否新颖吗？`](https://huggingface.co/blog/allenai/novelty-bench) · [`🔗 arXiv 2610.02022`](https://arxiv.org/abs/2610.02022) · [`🔗 allenai/novelty-eval`](https://github.com/allenai/novelty-eval)

---

## 42. DOOMFORMER 把神经网络跑在 DOOM 地图里 — 10,000 张 MNIST 测试图全部精确，容差 0

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 99+ pts · ~13h ago (~07:25 UTC+8)
- **Tags:** `doom` `verification` `neural-networks` `demoscene`

`mottopanikeiku/doomformer`（MIT，Python 3.11+，**36 stars**，创建于 2026-10-20，v0.4.0）把一个整数神经网络编译进一张 DOOM 地图，让游戏引擎来运行它："巫毒娃娃做算术，光照等级与地板高度保存数值。" 一个数是娃娃的人群，一个权重是地上的一条线，一次求和是一个光照等级或一个高度，一个激活是一段楼梯，注意力是一块天花板。MNIST 地图用了 **1,355 个巫毒娃娃**；地图需要 ZDoom（UDMF 与 ACS），仓库用 ViZDoom 1.3.2 搭配 Freedoom 素材运行。

公布的成绩：MNIST 测试图 **10,000 / 10,000** 全对，在 20,000 个随机网络上 **0** 个不一致，"博物馆"地图在**另外 4 个** DOOM 引擎里同样精确。`doomformer mnist` 读四张测试图或你自己的图片，1.5 到 3 分钟；`doomformer ask "what does iddqd do"` 用 189 条 DOOM 事实作答；`doomformer machine subleq all` 在地图上跑一台微型计算机。

**Why it matters:** 这个项目攻击自己的检查，还列成了表，这也是标题成绩可信的原因。篡改一条权重线 → "检查恰好会在跨过那条线的输入上失败。" 在取值范围边界上模糊测试 20,000 个随机网络 → 0 个不一致，且 CI 每次推送都用新种子再跑一遍。对地图的某一行做 **1,004 次**变异 → **抓到 297 次**，并且"没有任何一个漏网的被证明是无害的"。不经 DOOM 把权重从地图里抽回来 → 与源网络相等。给每个读出页面加一个毒值 → "从未运行过的页面无法通过旧值。"然后是那条界限，写得明明白白："每次运行都把地图暴露出的每个值与 NumPy 比较。**这只证明跑过的那批输入，不证明别的。**" MNIST 地图暴露 248 个值；它没有暴露 903 个阶梯计数与 1,351 次门限比较，那些只通过它们喂入的求和被间接检查——而"模糊测试与单元测试在编译器里找到四个 bug。全部已修复。"一件 demoscene 作品，其验证章节比多数生产测试套件更好。

[`🔗 mottopanikeiku/doomformer`](https://github.com/mottopanikeiku/doomformer) · [`🔗 项目站点`](https://mottopanikeiku.github.io/doomformer/) · [`🔗 Hacker News 讨论`](https://news.ycombinator.com/item?id=50297697)

---

## 43. Lasm 把 Lean 4 编译成 WebAssembly — 一个 RealWorld 应用里有 117 条已证定理，而运行时没有内核

- **Velocity:** ▮ steady
- **Source:** Hacker News · 31+ pts · ~10h ago (~10:05 UTC+8)
- **Tags:** `lean4` `webassembly` `formal-verification` `dev-tools`

`Millillion/lasm`（MIT，**66 stars**，创建于 2026-09-23）把普通 Lean 4 提前编译成 WebAssembly："一份 Lean 代码可以变成一个 Node 服务、一个无损/边缘函数、一个 WASI/Fastly 模块或一个浏览器应用。因为是 Lean，你可以对你部署的代码证明性质。" `@lasm/cli` 现为 **0.3.5**，发布于 npm **2026-10-28T19:07:10Z**，并把 Lean 精确锁定在 **4.35.0**（`leanprover/lean4:v4.35.0`），自带工具链因此不需要 elan。目标表对一个 0.x 项目来说异常宽，且每一行都声称在 CI 里用该平台自己的本地运行时、镜像或模拟器测过：Node、AWS Lambda（zip 与容器）、Lambda@Edge、Vercel、Netlify、Azure Functions、Google Cloud Functions gen2、Cloudflare Workers、Vercel Edge、Netlify Edge、Deno Deploy、Supabase Edge、Bun、Deno、Fastly Compute、WASI、wasi-http 与浏览器。

**Why it matters:** 有意思的是"限制"那一列，而 README 把它放进了速查表而不是脚注："**运行时不可用：**elaboration、`#eval` 式求值、加载 `.olean`、Lean 内核——这些只在构建期工作。"也就是说，部署出去的产物里没有证明检查器：定理是你交付的那次构建的性质，而不是运行中那个进程的性质。而边缘 / Bun/Deno/WASI/浏览器目标"以 Lean 单线程运行，没有 socket 或进程（除 WASI 外也没有文件）"，比 Node 那一行的"完整运行时（线程、文件、进程、socket）"小得多。旗舰主张——带"**117 条已证定理**"的 Conduit RealWorld 应用——是项目自己在 README 里的计数，未经独立复现；诚实的读法是：它证明了一个全栈应用可以这样写出来。有一个细节值得照抄："按项目政策，CI 从不部署到真实的云账户。"

[`🔗 Millillion/lasm`](https://github.com/Millillion/lasm) · [`🔗 npm 上的 @lasm/cli`](https://www.npmjs.com/package/@lasm/cli) · [`🔗 Hacker News 讨论`](https://news.ycombinator.com/item?id=50299004)

---

## 44. 循环 transformer 并非一致更好 — 增益最终会饱和、反转，或变得不稳定

- **Velocity:** ▮ steady
- **Source:** arXiv 2610.40325 · 2026-10-29
- **Tags:** `transformers` `looped-models` `training` `inference`

八位作者（Chanakya Ekbote、Artidoro Pagnoni、Devendra Singh Sachan、Shruti Bhosale、Mike Lewis、Maryam Fazel-Zarandi、Shashank Rajput、Sujan Kumar Gonugondla）在三个彼此权衡的约束下、于从零训练的稠密 decoder-only transformer 上联合研究循环：最多 **1B 参数**、最多 **155B token**、最多 **1.07×10²¹ FLOPs**、最多 **32 层循环**。他们的框架是对的——"循环是否有用，取决于哪个约束在主导：模型大小、训练算力，还是自回归推理效率。"

结论是一组条件而非配方。"循环整个 transformer 通常在固定参数预算下给出最好的质量，而在训练 FLOPs 受限时，循环中间一段层给出更好的回报。""增加循环并非一致有益：增益最终会**饱和、反转，或变得不稳定**。"小的、按循环区分的低秩适配器有帮助，"且随着循环数增加，增益更大"。循环模型的解码变慢，且与循环数成正比，而显然的修法并不干净：Parallel Loop Transformer 通过跨相邻 token 位置传递隐状态让各阶段并发，但"原始形式并不能稳定保留普通循环的质量增益"——要找回它，需要在合并前保留当前 token 的嵌入，并将它与上一 token 的隐状态分别归一化。

**Why it matters:** 摘要没有给出任何基准分数或差值，所以诚实的读法是：这是一篇设计空间论文，而不是一个可以引用的结果。它的价值在负面结论："多加几层循环"是一个有资源约束的工程决定，两侧各有一个失效模式；而论文为并行变体给出的修法，改的是两个隐状态的归一化方式，而不是简单地把它们一起跑。任何正伸手去拿循环权重的人——本周本刊另有两篇论文在测小模型在更多测试时算力下能做什么——都该把"增益最终会饱和、反转，或变得不稳定"读作对整个方向的总结，而不是这一组消融的总结。

[`🔗 arXiv 2610.40325`](https://arxiv.org/abs/2610.40325) · [`🔗 全文（HTML）`](https://arxiv.org/html/2610.40325v1)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-10-30T12:16:26Z |
| Items | 44 |
| Sources tracked | 32（Hacker News、GitHub、NVD、CISA KEV、cveawg、PyPI、npm、厂商公告、CNA 公告、arXiv、Hugging Face、安全研究博客、安全媒体、厂商博客） |
| Update schedule | 04:03, 12:03, 20:03 UTC+8（每日 3 次） |
| Ranking | 速度加权（时效 × 互动加速度 × 来源权威度） |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[前一日](2026-10-29.md) · [原始 .md](https://trending.md/zh/feed/2026-10-30.md) · [归档](../archive/)
