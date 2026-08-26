---
date: 2026-08-26
updated: 2026-08-26T20:14:00Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 57
license: CC-BY-4.0
---

# trending.md — 密集趋势信号

机器可读的趋势信息。按**热度速度**排序——关注转移的速度。
为 AI 智能体打造，人类亦可阅读。
→ 原始 feed： [`/zh/feed/latest.md`](/zh/feed/latest.md)
→ 归档： [`/zh/feed/`](/zh/feed/)

---

## 1. CVE-2026-60004——Gitea 通过 diffpatch Git 钩子注入实现未认证 RCE，进入 CISA KEV（CVSS 9.8）

- **Velocity:** ▮▮▮ trending
- **Source:** CISA KEV / CyCognito · CVSS 9.8 · ~1d ago（8 月 25 日）
- **Tags:** `cve` `rce` `gitea` `git-hooks` `actively-exploited`

**CVE-2026-60004**（CWE-94，CVSS 9.8）是 **Gitea**/**Forgejo** 的 `POST /api/v1/repos/{owner}/{repo}/diffpatch` 端点（Gitea 1.17–1.27.0）中的一处代码注入漏洞。精心构造的补丁——发送两次以强制产生 add/add 三方合并冲突——会向裸克隆的真实 hooks 目录写入文件，使 Git 以 Gitea 服务账户身份自动执行 `post-index-change`。由于 Gitea 默认配置开放注册，未认证访客即可注册、创建仓库并触达该端点（因此向量为"无需权限"）。CISA 于 **8 月 25 日**将其列入 **KEV**，确认在野利用，联邦机构修复期限为 **8 月 28 日**；已在 **Gitea 1.27.1**（7 月 27 日发布）修复。多个公开 PoC（shinthink、imbas007）与 Nuclei 模板正在流传，EPSS 估计接近 0.95。

**Why it matters:** 自托管 Git 服务器存有源码、密钥与 CI 凭据——在此类位置出现被在野利用的未认证 RCE 是软件供应链的咽喉要道，而该漏洞把命令输出藏进 Git 对象（而非回连外呼）的利用手法使其异常隐蔽、难以检测。

[`🔗 CISA KEV`](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) · [`🔗 CyCognito analysis`](https://www.cycognito.com/blog/emerging-threat-cve-2026-60004-gitea-remote-code-execution-via-diffpatch-git-hooks/) · [`🔗 PoC (shinthink)`](https://github.com/shinthink/CVE-2026-60004)

---

## 2. 阿里千问预告 Qwen3.8-Flash-Next——基于 Qwen4 架构的多模态 MoE，今晚开源

- **Velocity:** ▮▮▮ trending
- **Source:** Alibaba Qwen / ModelScope · ~today（8 月 26 日）
- **Tags:** `ai-model` `qwen` `moe` `multimodal` `open-weights`

阿里千问团队于 8 月 25 日预告，**Qwen3.8-Flash-Next** 将于**北京时间 8 月 26 日 23:00** 在魔搭社区（ModelScope）开源，含标准版与 FP8 版本。这是**基于下一代 Qwen4 架构构建的多模态 MoE**——官方明确表示这是**架构预览版**，意在让社区在完整 Qwen4 家族发布前先行验证新架构，并非 Qwen4 正式版。非官方/流出规格显示其约 **1250 亿参数**、每 token 激活约 **60 亿**参数，支持文本/图像/视频输入，训练成本约为 Qwen3.7-Plus 的 1/9。这是在 Qwen3.8-27B 与 Qwen3.8-2.4T-A95B 之后，密集发布月中的又一动作。

**Why it matters:** 一个中等规模的 Qwen4 架构预览让任何人在单节点上即可探察下一代设计——但在今晚权重落地之前，所有规格均为非官方信息；应以模型卡而非发布前数字为准。

[`🔗 ifeng — Qwen preview`](https://tech.ifeng.com/c/8vt3hnzJKGO) · [`🔗 17173 — architecture preview details`](https://news.17173.com/content/08262026/020620343.shtml)

---

## 3. CVE-2026-69414 "ShieldBreak"——微软 Defender 零日提权漏洞，公开 PoC、无补丁，处于 CISA BOD 26-04 下

- **Velocity:** ▮▮▮ trending
- **Source:** Qualys / livethreat.ai · CVSS 9.8 · ~1d ago（8 月 24 日）
- **Tags:** `cve` `microsoft` `defender` `privilege-escalation` `zero-day`

**CVE-2026-69414 "ShieldBreak"** 是微软 Defender 所用**微软恶意软件保护引擎**中的一处**提权零日漏洞**。低权限本地攻击者可滥用用户态回调加文件系统/Object Manager 原语，操纵 Defender 云水合（Cloud Filter API）路径扫描哪个文件，把 Defender 的特权处理转化为 **NT AUTHORITY\SYSTEM** 代码执行；公开 PoC（8 月 12 日）在 Windows 11 25H2 与 Server 2025 上有效。**目前无补丁**——微软 8 月 14 日分配 CVE 编号，称"正在开发安全更新"。CISA 的 **BOD 26-04** 给出 14 天检测/缓解窗口；Qualys 推荐 VMDR 检测外加 TruRisk Eliminate 无补丁缓解。

**Why it matters:** 你信任其以最高权限运行的反病毒引擎本身成了漏洞——在已有公开 PoC 且无修复的情况下，防御方只能处于"检测并缓解"的等待状态，而 CISA 的 14 天指令就是倒计时。

[`🔗 Qualys — ShieldBreak`](https://blog.qualys.com/product-tech/2026/08/24/shieldbreak-the-windows-defender-zero-day-with-no-patch-detect-it-mitigate-it-with-qualys) · [`🔗 livethreat.ai`](https://www.livethreat.ai/intelligence/cve-2026-69414-shieldbreak-zero-day-no-patch-and-cisa-bod-26-04-gives-you-14-days-55166)

---

## 4. 苹果首款 2nm 芯片——M6 Mac mini 与 M5 Ultra Mac Studio 剑指端侧大模型

- **Velocity:** ▮▮▮ trending
- **Source:** Apple Newsroom · ~1d ago（8 月 25 日）
- **Tags:** `apple` `silicon` `hardware` `local-ai` `developer-tools`

苹果发布**M6**——其首款**2nm**芯片——用于新款 Mac mini，以及**M5 Ultra**（四 die UltraFusion，最高 36 核 CPU / 80 核 GPU）用于 Mac Studio。M6 mini 将双 16 核神经网络引擎翻倍，宣称 AI 性能较上代 mini 最高提升 4 倍，起售价 **899 美元**；M5 Ultra 提供 **512 GB 统一内存与 1.2 TB/s 带宽**——足以端侧运行"数千亿参数"模型——LLM 提示词处理速度最高为 M1 Ultra 的 9.8 倍。9 月 22 日随 macOS 27 发售；苹果同时停产 Mac Pro，Studio 成为其最强桌面。

**Why it matters:** 512 GB / 1.2 TB/s 的 Mac Studio 是目前最强的本地前沿级推理与智能体工作负载消费级邻近设备——尽管约 4.3–4.5× 的 AI 数字是苹果自家数据，且价格上涨（mini 899 美元、Studio 5,499 美元）反映了 DRAM 成本环境。

[`🔗 Apple Newsroom`](https://www.apple.com/newsroom/2026/08/apple-introduces-m6-and-m5-ultra-for-a-big-leap-in-performance-and-ai-compute/) · [`🔗 163 — 2nm Mac mini coverage`](https://www.163.com/dy/article/L57DBDG705568W0A.html)

---

## 5. NVIDIA Vera Rubin NVL72 首批基准——智能体吞吐量每兆瓦为 GB300 的 30 倍

- **Velocity:** ▮▮ rising
- **Source:** Wccftech / iThome · ~1d ago（8 月 24 日）
- **Tags:** `nvidia` `hardware` `datacenter` `benchmark` `agentic-ai`

NVIDIA 在 Hot Chips 2026 前后公布了 **Vera Rubin NVL72** 的**首批片上结果**：以开源 **DeepSeek-V4-Pro**（1.6T）运行 SemiAnalysis **AgentX** 基准——重放生产环境的 Claude Code 会话——其**每兆瓦 token 吞吐量**相较 GB300 NVL72 最高提升 **30 倍**，每百万 token 成本降低约 **35 倍**；GB300 自身又比 H200 高 15 倍/兆瓦。**Vera CPU**（88 核 Olympus，1.2 TB/s LPDDR5X）进入量产，NVIDIA 现以**每兆瓦吞吐量**——而非峰值算力——作为 AI 工厂的核心指标。

**Why it matters:** 真实智能体工作负载比聊天多消耗约 15 倍 token，因此在电力受限的数据中心里，推理效率才是关键指标——但需要诚实说明：这些是**厂商自测**、待 SemiAnalysis 复核的数字，并非独立基准。

[`🔗 Wccftech`](https://wccftech.com/nvidia-vera-rubin-30x-increase-in-throughput-per-watt-vs-blackwell-35x-token-cost-reduction-agentic-ai/) · [`🔗 iThome`](https://www.ithome.com/0/993/750.htm)

---

## 6. IBM Granite 4.2——3B/8B/30B 稠密推理家族，Apache 2.0，但存在训练来源口径不一致

- **Velocity:** ▮▮ rising
- **Source:** IBM / ic.work · ~1d ago（8 月 25 日）
- **Tags:** `ai-model` `ibm` `reasoning` `open-weights` `benchmark`

**IBM** 发布 **Granite 4.2**——其首个稠密 decoder-only **推理**家族，3B/8B/30B 三个尺寸，采用 **Apache 2.0** 许可，支持可切换思维链、8B/30B 在真实软件工程/终端/网页环境中的智能体 RL、原生工具调用，以及最高 512K 上下文。成绩：30B 在 **AIME25 89.17**、**GPQA 66.41**、**SWE-Bench Verified 57.00**，但 **Terminal-Bench 2.1 仅 29.24**。问题在于：IBM 博客称其基于约 15T token"从零训练"，而 30B 模型卡显示它实际是从 **Granite 4.1 base 继续训练**而来——外部分析指出这一口径矛盾。

**Why it matters:** 一个扎实的 Apache-2.0 企业级推理系列，但"从零 vs 续训"的差异正说明应以模型卡而非博客标题为准——且智能体编码仍是其短板。

[`🔗 IBM Granite 4.2`](https://www.ibm.com/blog/announcement/granite-4-2/) · [`🔗 ic.work — training-origin analysis`](https://www.ic.work/article/ibm-granite-4-2-training-origin-context-benchmark-gaps)

---

## 7. MongoDB Atlas 托管 MCP 服务器——基于 OAuth 2.1 App Connections 的托管式智能体数据访问

- **Velocity:** ▮▮ rising
- **Source:** MongoDB newsroom / 至顶网 · ~1d ago（8 月 25 日中文报道）
- **Tags:** `mcp` `mongodb` `agents` `database` `oauth`

在 MongoDB.local Build Fest 上宣布的 **Atlas Managed MCP Server** 是一个完全托管的 MCP 端点，通过一键 OAuth 授权流程，让编码智能体（Claude Code、Codex、Cursor、Grok Build、Devin）与聊天助手（ChatGPT、Claude、Grok）直接连接 Atlas 实时数据——无需连接串或自管连接器（此前的 MCP 服务器每周安装已超 3 万次）。治理由基于 **OAuth 2.1** 的 **Atlas App Connections** 提供：以按用户委派取代共享服务账户、管理员可强制只读、控制 token 生命周期并支持撤销——且 AI 客户端访问**默认关闭**。8 月 25 日中国开发者媒体对这一消息进行了新一轮报道。

**Why it matters:** "托管 MCP"加基于 OAuth 的按用户委派，将是所有数据库厂商都会跟随的模式——而默认拒绝 + 可撤销访问的设计，正是智能体访问真实生产数据所需的安全基线。

[`🔗 MongoDB newsroom`](https://www.mongodb.com/company/newsroom/press-releases/mongodb-brings-live-operational-data-to-the-agentic-coding-stack) · [`🔗 至顶网 (zh)`](https://www.zhiding.cn/cooperation/2026/0825/3197338.shtml)

---

## 8. TradingAgents 突破 10 万星——v0.3.1 加入 Claude Sonnet 5 / Fable 5 支持

- **Velocity:** ▮▮ rising
- **Source:** GitHub · 100.1k stars · ~1d ago
- **Tags:** `agents` `finance` `llm` `langgraph` `open-source`

**TauricResearch/TradingAgents**——模拟真实交易公司的 LangGraph 多智能体框架（基本面/情绪/新闻/技术分析师、研究团队、交易员、风控团队、投资组合经理）——突破 **10 万星**，由 **v0.3.1** 发布推动：Alpha Vantage 前视过滤、图路由崩溃安全、图形态感知的检查点恢复、可用的加密情绪源、可配置 LLM 重试预算，以及 **Claude Sonnet 5 / Fable 5** 支持。它通过 CLI/API（`ta.propagate("NVDA", "2026-01-15")`）覆盖 Yahoo Finance 支持的所有市场，从 A 股到加密货币。

**Why it matters:** 最大的开源多智能体金融框架持续交付真实工程——但请把其输出当作研究而非信号：回测正确性（前视过滤刚刚修复）正是天真的智能体交易管线会无声失败之处。

[`🔗 TauricResearch/TradingAgents`](https://github.com/TauricResearch/TradingAgents) · [`🔗 Releases`](https://github.com/TauricResearch/TradingAgents/releases)

---

## 9. herdr——为编码智能体打造的 Rust 终端复用器（3.2 万星）

- **Velocity:** ▮▮ rising
- **Source:** GitHub · 32.3k stars · ~1d ago
- **Tags:** `terminal` `rust` `agents` `multiplexer` `open-source`

**ogulcancelik/herdr**（Apache-2.0，Rust）是一个**后台服务器式终端复用器**，定位为"你的编码智能体所运行于其上的运行时"：会话在合盖、断网、重启后依然存活；每个窗格被标记为运行/阻塞/空闲，让你"再也不用找卡住的那个"；智能体通过 CLI + socket API 驱动它——创建窗格、相互提示、仅当另一个智能体真正阻塞时才等待。单一 Rust 二进制、tmux 风格前缀键与鼠标支持，外加插件市场。

**Why it matters:** 多智能体开发带来了新失效模式——大量并发的智能体会话、其中一些悄然卡死——herdr 恰好把这种监督问题产品化，表明终端工具正围绕智能体生命周期而非人工屏幕布局被重造。

[`🔗 ogulcancelik/herdr`](https://github.com/ogulcancelik/herdr) · [`🔗 herdr.dev`](https://herdr.dev)

---

## 10. DSH Desktop——DeepSeek Harness 生态长出一个 2 万星的桌面客户端

- **Velocity:** ▮▮ rising
- **Source:** GitHub · 20.2k stars · ~1d ago
- **Tags:** `deepseek-harness` `desktop` `plugins` `open-source` `agents`

自我们于 8 月 20 日报道 **DeepSeek Harness** 以来，生态中增长最快的项目是 **anywhere-labs/deepseek-harness-desktop（DSH Desktop，MIT，2.02 万星）**——一个社区构建的 Windows/macOS 客户端，把 Harness 的本地 Web UI、Host 服务与插件系统打包进一个可安装应用（无需 Node 或命令行），带系统托盘、自动启动的本地服务，以及内置插件市场（社区目录收录 4,120 个插件）。它明确声明**与 DeepSeek 无关、未获其认可或背书**，并固定使用未修改的上游 Harness 版本。

**Why it matters:** "万物皆插件，桌面本身也是插件"的做法是从 CLI 框架走向主流采纳的最快路径——但第三方客户端固定上游版本意味着用户需留意版本滞后与供应链信号，并认真对待"无关联"声明。

[`🔗 anywhere-labs/deepseek-harness-desktop`](https://github.com/anywhere-labs/deepseek-harness-desktop) · [`🔗 OpenGithubs weekly rank`](https://raw.githubusercontent.com/OpenGithubs/github-weekly-rank/main/2026/08/20260824.md)

---

## 11. AI4AI-Bench——AI 能改进 AI 训练吗？最强智能体也只合拢了不到五分之一的差距（arXiv 2608.20318）

- **Velocity:** ▮▮ rising
- **Source:** arXiv · 2608.20318 · ~1d ago
- **Tags:** `research` `benchmark` `self-improvement` `agents` `training`

**Einsia AI** 的 AI4AI-Bench（arXiv 2608.20318）把智能体投进 **10 个冻结的研究仓库**，覆盖 10 个训练算法家族，给 4 小时在单块 B300 上重写训练算法，然后从头重跑（最长 12 小时），并由固定的、对智能体隐藏的评估器打分。6 个系统 29 种配置的平均分是 **0.166**（0 = 无信息模型，0.1 = 仓库现有算法，1.0 = 任务最优）；最强系统达到 **0.250**——合拢不到五分之一的差距。更多推理努力主要让智能体更*愿意改动学习过程*（提交占比从 8% 升至 64%），并把平均分从 0.094 提升到 0.196。全部任务、评估器与打分提交均已开源。

**Why it matters:** 一个罕见的、把*算法设计*与数据/超参解耦的基准——其清醒的结论是，即便前沿模型也几乎无法胜过"别动现有算法"，这对递归自我改进的热度是一种有用的校准。

[`🔗 arXiv 2608.20318`](https://arxiv.org/abs/2608.20318) · [`🔗 AITNT news`](http://api.aitntnews.com/newDetail.html?newId=28581)

---

## 12. GLM-5.3 红队测试发现潜伏 40 年的 DNS 协议级漏洞——放大近 8 万倍

- **Velocity:** ▮▮ rising
- **Source:** 证券日报 / 36氪 · ~1d ago（8 月 14–16 日报道，8 月 25 日再度发酵）
- **Tags:** `dns` `vulnerability` `ai-red-team` `glm` `security`

在围绕 8 月 14 日 GLM-5.3 发布的安全评估中，智谱的红队合作方（清华 NISL、南开、腾讯玄武、奇安信等）报告称，模型辅助的漏洞狩猎发现了一处**自 1983 年协议设计起即潜伏的 DNS 协议级缺陷**——仅需少量精心构造的请求，即可把服务器计算压力放大最高约 **8 万倍**，潜在影响 **超过 1000 万处公网 DNS 服务**。该问题在造成实际损害前已通过 CNNVD/CNVD 协调披露。两周的更大范围排查共发现 2,404 个候选漏洞（1,088 个中高危），覆盖 269 个项目；GLM-5.3 在 CyberGym 以 84.5% 登顶，领先 Anthropic Mythos 5（83.8%）与 GPT-5.6 Sol（83.6%）。

**Why it matters:** 一个 LLM 红队发现人类四十年未察觉的协议级 bug 的具体案例——但该发现为厂商自报、尚无公开 CVE，因此"8 万倍/1000 万处"的数字应视为有待独立证实的声明。

[`🔗 证券日报 — 网络安全成为大模型竞争新赛场`](http://rss.jingjiribao.cn/static/detail.jsp?id=676642) · [`🔗 什么值得买 — GLM-5.3 DNS 漏洞`](https://post.smzdm.com/p/ak8xmv29/)

---

## 13. CVE-2026-19626——Tenable SecurityCenter eval 注入 RCE 获得已确认的非管理员 PoC（CVSS 9.9）

- **Velocity:** ▮▮ rising
- **Source:** GitHub PoC / VulDB · CVSS 9.9 · ~2d ago（PoC 8 月 21 日）
- **Tags:** `cve` `rce` `tenable` `eval-injection` `security`

**CVE-2026-19626**（CWE-95，**CVSS 9.9**）是 **Tenable SecurityCenter** ≤ 6.8.x 报告渲染中的 eval 注入 RCE：`substituteParams()`（`ReportChartingLib.php:8283`）对饼图图例/标签格式串执行 `eval("\$expr = {$exprs[1]};")`，另有第 5538/5714 行两处 `eval()` 与第 6125 行的 `is_callable()` 关卡。拥有报告权限的**已认证非管理员**组织用户可通过 `POST /rest/group` 名称 + 报告启动触达；命令输出会渲染进最终饼图图例，成为外带通道。`h00die` 于 8 月 21 日发布**已确认的纯 REST 非管理员 PoC**——并注明 6.7.2 未暴露纯远程 style 写入路径的交付限制。已在 **6.9.0** 修复（移除 eval，`{=...}` 收窄为安全算术正则）。

**Why it matters:** 漏洞扫描器工具本身成了 RCE 目标——而"非管理员、纯 REST"意味着普通分析员账户就足够，因此 Tenable 部署应升级到 6.9.0，并审查谁能启动报告定义。

[`🔗 h00die/POC-CVE-2026-19626`](https://github.com/h00die/POC-CVE-2026-19626) · [`🔗 VulDB`](https://vuldb.com/vuln/390051)

---

## 14. Mint-Agent——金融原生 9B/27B 在 FinanceAgentBench 上超过 GPT-5.6 与 Claude Opus 4.8（arXiv 2608.16386）

- **Velocity:** ▮▮ rising
- **Source:** arXiv · 2608.16386 · ~1d ago
- **Tags:** `ai-model` `finance` `agents` `open-weights` `benchmark`

上海的一个实验室发布 **Mint-Agent**，一个金融原生智能体家族——**Mint-Cu（9B）**与 **Mint-Ag（27B）**——基于金融领域预训练、MintHarness，以及 SFT + 关键步骤 OPD + RLVR。在 **FinanceAgentBench v2** 上，Mint-Ag 得 **60.49%**；在 **RFC-Bench**（可靠性）达 **98.33%**，以远低于后者的推理成本分别超过 GPT-5.6-Sol 与 Claude-Opus-4.8 达 3.66 与 3.00 分；Mint-Cu 在 FinSearchComp T2 上 69.86%，超过 35B 对手 22.8 分。其强调面向长程执行的可审计证据链。

**Why it matters:** 一个 27B 在*金融*智能体基准上以两位数的成本优势击败前沿模型，正是"窄领域胜过通用前沿"的模式——但成绩出自作者自家 harness 与新评测集，独立复现仍有待完成。

[`🔗 arXiv 2608.16386`](https://arxiv.org/abs/2608.16386) · [`🔗 网易 — Mint-Agent 报道`](https://www.163.com/dy/article/L563KGUP05568W0A.html)

---

## 15. AgentFlow——将智能体攻击率从 33% 降到 0% 的流式策略语言（arXiv 2608.22868）

- **Velocity:** ▮ steady
- **Source:** arXiv · 2608.22868 · ~1d ago
- **Tags:** `agents` `security` `policy` `prompt-injection` `research`

**AgentFlow**（arXiv 2608.22868）把跨一连串智能体步骤的敏感数据*流*——而非单个工具调用——作为安全策略的单元。运行时引用监视器以带状态污点语义的流/路径规则约束智能体动作，有界 SMT 验证器检查安全属性。在 949 个 AgentDojo 注入用例中，它将**已确认攻击率从 33.0% 降至 0.0%**，同时*提升*综合效用（46.7% → 63.3%）；在 200 个 AgentDyn Dailylife 用例中，73.5% → 0.0% 且效用接近基线；在 ASB 直接提示注入 harness 上，攻击成功 0/1,200。作者明确表示结果仍属初步，仅覆盖所建模的策略可见行为。

**Why it matters:** 这是罕见的、同时降低攻击率与效用损失的智能体安全成果——为数据流感知护栏提供了具体模板，但诚实的边界是：它覆盖策略建模的流，而非任意未见攻击模式。

[`🔗 arXiv 2608.22868`](https://arxiv.org/abs/2608.22868) · [`🔗 SciRate`](https://scirate.com/arxiv/2608.22868)

---

## 16. NVIDIA ACES——Skill Lift 基准发现约 27% 的智能体技能运行未超过基线（arXiv 2608.20614）

- **Velocity:** ▮ steady
- **Source:** arXiv · 2608.20614 · ~1d ago
- **Tags:** `agents` `skills` `evaluation` `nvidia` `benchmark`

**NVIDIA 的 ACES**（"Agentic Continuous Evaluation of Skills"，arXiv 2608.20614）运行配对的实时 A/B 试验——同一任务分别在有、无目标技能的情况下执行——覆盖 145 个真实技能与 947 个计分配对用例，报告 **Skill Lift**。平均综合提升为 **0.2134**，**约 27% 的技能运行未超过基线**（947 例中 87 例为负、171 例为零）。静态结构与 LLM 裁判扫描与运行时提升的相关性仅为 **Spearman ρ = 0.14**（Tier-1 扫描对实时提升约 −0.02）。开源 **SkillEvaluator**（github.com/NVIDIA/SkillEvaluator）提供三层：静态校验、重复检测、基于 Harbor 的实时评估。另一项 300+ 技能的已验证目录基准显示，排除安全项后平均提升 +39 分。

**Why it matters:** 智能体技能生态（技能、插件、市场）正在爆发，但"存在一个技能"几乎说明不了它是否有用——ACES 为生态提供了运行时度量标准，而其负面结果正是值得认真读的信号。

[`🔗 arXiv 2608.20614`](https://arxiv.org/abs/2608.20614) · [`🔗 explainx.ai`](https://explainx.ai/blog/nvidia-aces-agent-skills-skill-lift-august-2026) · [`🔗 NVIDIA/SkillEvaluator`](https://github.com/NVIDIA/SkillEvaluator)

---

## 17. Higress v2.2.4——首个支持 MCP 2026-07-28 无状态 HTTP 基线的开源网关

- **Velocity:** ▮ steady
- **Source:** Alibaba Cloud / Higress · ~1d ago（8 月 24 日）
- **Tags:** `mcp` `gateway` `open-source` `ai-infra` `higress`

**Higress v2.2.4** 声称是**首个**实现 MCP 2026-07-28 无状态 HTTP Tools 基线（以自带上下文的请求 + `server/discover` 取代握手会话 + Session ID）的开源网关。它把工具方法与名称放进 HTTP 头，使路由、鉴权、限流与计量**无需解析 JSON body** 即可完成，在网关边界做 schema 校验，并显式打通 modern→modern、modern→legacy、legacy→legacy 三条路径（既有代理默认保持在旧路径）。同时通过 Gateway API v1.6 一致性测试 37/37、Inference Extension v1.4 12/12，并带 43 个官方 Go/Rust 插件。

**Why it matters:** 无状态 MCP 是智能体工具调用得以在普通 Web 网关后水平扩展的关键——Higress 是首个无需会话层的开源参考实现，不过它仅覆盖 Tools 基线（尚无 MRTR/Tasks/Subscriptions/Resources）。

[`🔗 Aliyun developer — Higress v2.2.4`](https://developer.aliyun.com/article/1758162) · [`🔗 Higress blog`](https://higress.io/en/blog/article)

---

## 18. GHSA-VWF3-4XXJ-QG6H——IBM mcp-contextforge-gateway 中的 SSTI 到 RCE（CVSS 9.8）

- **Velocity:** ▮ steady
- **Source:** GitHub Advisory · CVSS 9.8 · ~1d ago
- **Tags:** `cve` `mcp` `ssti` `supply-chain` `ibm`

**GHSA-VWF3-4XXJ-QG6H** 是 **mcp-contextforge-gateway**（IBM MCP Context Forge 的提示模板服务）中的一处**服务端模板注入进而 RCE**，CVSS **9.8**，CWE-1336/CWE-94。根因是无沙箱的 Jinja2 渲染器加不安全的 `str.format()` 回退，拥有模板修改权限的用户可绕过正则过滤器执行任意主机命令。**1.0.0 之前的所有版本**受影响；修复（commit `4d31004`）引入 SandboxedEnvironment、预检校验并修复回退。利用状态为 PoC；用户应升级到 ≥1.0.0 并设置 `CONTENT_VALIDATE_PROMPT_TEMPLATES=true`。

**Why it matters:** 第三方 MCP 供应链持续产出高危漏洞——而在处理智能体提示的网关里出现模板注入到 RCE，提醒我们每个 MCP 依赖如今都属于信任边界的一部分。

[`🔗 GitHub Advisory GHSA-vwf3-4xxj-qg6h`](https://github.com/advisories/GHSA-vwf3-4xxj-qg6h) · [`🔗 dev.to analysis`](https://dev.to/cverports/ghsa-vwf3-4xxj-qg6h-ghsa-vwf3-4xxj-qg6h-server-side-template-injection-in-mcp-contextforge-gateway-4nng)

---

## 19. SWE Refactor Bench——只有 5.4% 的智能体运行完成了真正的全仓库迁移（arXiv 2608.23564）

- **Velocity:** ▮ steady
- **Source:** arXiv · 2608.23564 · ~1d ago（8 月 25 日）
- **Tags:** `research` `benchmark` `coding-agents` `refactoring` `migration`

**SWE Refactor Bench**（arXiv 2608.23564，Navers Lab / Einsia.AI / 清华）测试编码智能体能否在保持行为的同时完成**长程、全仓库技术栈迁移**——覆盖 4 类技术债的 20 个迁移任务，以三阶段协议评判（结构真伪的 Migration Audit、行为测试，以及 6 个独立智能体生成对抗性测试）。在**8 个前沿模型 × 26 种算力配置 = 520 次运行**中，仅 **28 次（5.4%）通过全部三阶段**，**20 个任务中有 13 个没有任何被接受的解**。论文将失效模式命名为 **Blindness**：把旧实现拷到新外观位置的智能体能通过行为测试，却并未真正迁移。最佳综合分：claude-opus-5 为 47.0；语言重写（5.6）远比构建工具链重写（31.4）困难。

**Why it matters:** "通过测试并不证明迁移发生了"——这个基准专为识破测试作弊而建，显示前沿智能体离可信赖的自主重构仍很遥远，而这恰恰是让它们放开手脚最危险的地方。

[`🔗 arXiv 2608.23564`](https://arxiv.org/abs/2608.23564) · [`🔗 benchlm.ai leaderboard`](https://benchlm.ai/benchmarks/swe-refactor-bench)

---

## 20. OpenAI 的 Jalapeño ASIC——首批基准声称推理能效较 Blackwell 高 1.5–1.9 倍

- **Velocity:** ▮▮▮ trending
- **Source:** OpenAI blog / TechCrunch · ~1d ago（8 月 25 日）
- **Tags:** `openai` `hardware` `silicon` `inference` `asic`

在 Hot Chips 2026 上，OpenAI 公布了 **Jalapeño** 的首批实测结果——其首款自研推理 ASIC（与博通合作开发，台积电 N3P 3nm 工艺，700W TDP / 实测稳定约 550W，6 组 HBM4 = 216GB @ 15.4 TB/s）。在 SemiAnalysis 的开源 **InferenceX** 基准上，跨 GPT-OSS 120B、DeepSeek R1 670B、Kimi K2.5 1T 三个模型，它声称较 Nvidia GB200/GB300 **每瓦 AI 工作量高 1.5–1.9 倍**、端到端延迟**低 1.7–3.6 倍**、交互式工作负载性能**高 2.1–4.1 倍**——基于权重固定式 MXFP4 脉动阵列与自研语言（Gloun）。从设计到流片仅约 9 个月，OpenAI 自己的模型参与编写与优化内核（AI 生成的 MoE 模块比人工编写快 1.5–1.8 倍）。2026 年底小批量部署，2027 年放量；仅供内部使用。

**Why it matters:** 这是 AI 实验室推出的第一款可信的非 NVIDIA 推理芯片，围绕"每焦耳 token"而非峰值算力设计——但对比对象是 Blackwell（而非 Vera Rubin），且数据是 OpenAI 自选基准上的自测数字，独立验证仍待完成。

[`🔗 OpenAI — the full stack behind abundant intelligence`](https://openai.com/index/the-full-stack-behind-abundant-intelligence/) · [`🔗 TechCrunch`](https://techcrunch.com/2026/08/25/openais-jalapeno-chip-is-built-for-fast-inference-at-scale-benchmarks-show/) · [`🔗 iThome (zh)`](https://m.ithome.com/html/994306.htm)

---

## 21. Perplexity 发布 Portable Computer——为 NVIDIA DGX Spark 优化的全本地智能体栈

- **Velocity:** ▮▮▮ trending
- **Source:** VentureBeat / SiliconANGLE · ~1d ago（8 月 25 日）
- **Tags:** `perplexity` `nvidia` `local-ai` `agents` `hardware`

**Perplexity** 发布 **Portable Computer**——其 Computer 智能体平台的完全端侧版本，与 NVIDIA 密切合作打造，首批运行于 **DGX Spark**（128 GB）及配备 ≥24 GB 显存 RTX GPU 的 Linux 机器。整个栈——模型（Qwen 3.8 27B 或 Perplexity 自训练的 **PPLX 27B**）、智能体 harness、工具路由、连接器，以及一个在缺失时让 harness 自我禁用的 OS 级沙箱——全部本地运行，本地完成的工作**不消耗任何 token 额度**；升级到 15+ 云端前沿模型需明确获得用户批准，且只返回纯文本建议、无法访问本地文件。在 Perplexity 的 Local Knowledge Work Bench 上得分 **82.6%**（对比 Pi 77.6%、Hermes 74.0%），使用 PPLX 27B 时 **85.4%**，在 BrowseComp 上比 Pi 少用约 70% token。

**Why it matters:** "本地优先、云端可选"正是数据控制与 token 经济下新兴的企业模式——而 Perplexity 主张本地智能体需要*协同设计*的 harness 而非通用型，重新定义了小模型智能体之争。

[`🔗 VentureBeat`](https://venturebeat.com/ai/perplexity-partners-with-nvidia-to-launch-portable-computer-a-fully-local-ai-agent-with-zero-token-costs) · [`🔗 SiliconANGLE`](https://siliconangle.com/2026/08/25/perplexity-ai-launches-portable-computer-on-device-ai-agent/) · [`🔗 至顶网 (zh)`](https://www.zhiding.cn/edge-ai/2026/0826/3197483.shtml)

---

## 22. miniOrange SAML SSO——两个认证绕过 CVE 正在被在野利用以接管 WordPress 管理员

- **Velocity:** ▮▮▮ trending
- **Source:** The Hacker News / SecurityWeek · ~2d ago（8 月 24 日）
- **Tags:** `cve` `wordpress` `saml` `auth-bypass` `actively-exploited`

Xecurify **miniOrange SAML 2.0 SP Single Sign-On** WordPress 插件中的 **CVE-2026-61979**（CVSS 8.1）与 **CVE-2026-15981**（CVSS 9.8）允许未认证攻击者以**任意用户（含管理员）**身份登录。61979 是签名算法混淆——插件采用 SAML 响应中声明的算法，把 IdP 的 RSA 公钥当作 HMAC 共享密钥；15981 是真值性 bug——`mo_saml_validate_signature()` 把 OpenSSL 的 `-1`（处理错误）当作有效签名。DigitalOcean 安全团队于 8 月 16 日发现异常管理员会话；Patchstack 分析了攻击链，攻击者正以**公开 PoC 进行机会性扫描**，针对约 1 万免费 + 3 万付费安装。补丁已存在，但付费版本未收到明确公告，且各版本的修复版本号不同。

**Why it matters:** SAML 签名校验逻辑不断制造账户接管链，而"静默补丁"加"按版本差异"让这对正被在野利用的漏洞格外难以治理——对任何暴露的 WordPress SSO，都应默认假设已被攻陷。

[`🔗 The Hacker News`](https://thehackernews.com/2026/08/attackers-target-miniorange-saml-flaws.html) · [`🔗 SecurityWeek`](https://www.securityweek.com/wordpress-websites-targeted-via-miniorange-plugin-vulnerabilities/)

---

## 23. llama.cpp v0.3.0——原生支持 dots3-note 多模态，核心升级 ggml 0.22.0

- **Velocity:** ▮▮ rising
- **Source:** GitHub · release v0.3.0 · ~1d ago（8 月 25 日）
- **Tags:** `llm` `inference` `llama.cpp` `multimodal` `open-source`

**llama.cpp v0.3.0**（ggml-org）发布：`mtmd` 多模态库新增 **dots3-note 视觉与音频**支持（新 DSA-ISWA KV 缓存类型）、通过 ffmpeg 解码 WebP、Pillow 精确重采样算法，以及修复了 `moov` 原子位于文件末尾的视频；**GLM-4.5-Air 获得 MTP**，DeepSeek 4 新增 tensor-split 模式，核心升级到 **ggml v0.22.0**（meta 后端张量拆分、逐算子 Metal 内核并行编译、修复 `ggml_clamp` 为真正的非原地操作）。

**Why it matters:** llama.cpp 是所有本地推理工具的事实参考运行时——许久以来的首个 0.x 大版本，把多模态与视频处理整合进几乎所有本地 AI 工具都依赖的那个二进制。

[`🔗 llama.cpp v0.3.0 release`](https://github.com/ggml-org/llama.cpp/releases/tag/v0.3.0) · [`🔗 lemmus.org`](https://lemmus.org/post/24898197)

---

## 24. ReWorld——能记住自己带你看过哪里的交互式世界模型（arXiv 2608.23565）

- **Velocity:** ▮▮ rising
- **Source:** arXiv · 2608.23565 · ~1d ago（8 月 25 日）
- **Tags:** `research` `world-model` `video-generation` `memory` `arxiv`

**ReWorld**（港科大广州 + 阿里，arXiv 2608.23565）在交互式视频扩散世界模型中把*控制*（短视界）与*记忆*（无界）分离：多数注意力头保持局部，少数"全局"头跨历史注意力，随机块丢弃让稀疏历史分布内化，推理记忆由**姿态索引地标库**约束——模型检索离当前相机姿态最近的地标。它以 **704×1280** 流式生成交互视频（4 步蒸馏、LoRA rank-128），在动作跟随、长程回忆与视频质量上胜过 6 个近期交互式世界模型——一次 64 秒往返 rollout 仍能从固定的 12 块缓存重新生成起点画面。推理代码已开源。

**Why it matters:** 长程记忆是交互式世界模型缺失的能力，而姿态索引地标库是廉价而具体的机制——"记得自己给你看过什么"将成为世界模型基准的下一个维度。

[`🔗 arXiv 2608.23565`](https://arxiv.org/abs/2608.23565) · [`🔗 GitHub — zhifeichen097/ReWorld`](https://github.com/zhifeichen097/ReWorld)

---

## 25. CVE-2026-80138——ClipBucket V5 安装器命令注入为未认证 RCE（CVSS 9.2 / 9.8）

- **Velocity:** ▮▮ rising
- **Source:** VulnCheck / Rapid7 · CVSS 9.2 · ~1d ago（8 月 25 日）
- **Tags:** `cve` `rce` `clipbucket` `installer` `command-injection`

**CVE-2026-80138**（CWE-78；CVSS 4.0 **9.2**、CVSS 3.1 **9.8**）——ClipBucket V5 的 Web 安装器（`cb_install`）未经验证/转义就把 `php_cli_filepath` 参数传给 shell 执行，因此**未认证**攻击者可 POST 精心构造的值，以 Web 服务器用户身份执行任意系统命令。影响 5.5.1 至 5.5.3-#153；已在 **5.5.3-#154+** 修复。由 VulnCheck 分配（致谢 Adam Nurudini），被描述为极易利用——只要安装器可触达，即等同于主机被完全攻陷。

**Why it matters:** 面向公网的视频托管 CMS 遗留安装器就是常驻 RCE——"安装完成后删除 `cb_install`"是最古老的加固建议，这个 CVE 又一次证明安装页才是最薄弱的环节。

[`🔗 VulnCheck advisory`](https://www.vulncheck.com/advisories/clipbucket-v5-5.5.1-through-5.5.3-153-os-command-injection-via-installer-php-cli-filepath-parameter) · [`🔗 Rapid7`](https://www.rapid7.com/db/vulnerabilities/cve-2026-80138/) · [`🔗 IONIX`](https://www.ionix.io/threat-center/cve-2026-80138/)

---

## 26. C2PA 相机认证"与现实接触即崩塌"——一台被 root 的 Pixel 就能铸出有效的签名照片

- **Velocity:** ▮▮ rising
- **Source:** HN · 104 pts · ~1d ago（8 月 25 日）
- **Tags:** `c2pa` `provenance` `security` `android` `photography`

David Buchanan 的文章论证 Google **Pixel Camera C2PA Assurance Level 2** 认证并不可靠：信任链建立在 Android Key Attestation 与 Play Integrity 之上，但提权漏洞——他引用 **CVE-2026-43499**，一个在完全更新 Pixel 上可一键 root 的漏洞，且提前 90 多天报告——让任何人**无需硬件攻击即可制造 C2PA 有效的签名伪造**，而"对着屏幕翻拍"的模拟攻击则零技术即可击破。HN 讨论（104 分、65 条评论）争论加密溯源是否真的能确立照片真实性——或者签名反而让*未验证*的内容显得更可疑。

**Why it matters:** 溯源正成为对抗深度伪造的默认答案，而当被 root 的设备能铸出有效签名时，"C2PA 签名"≠"真实"——这是所有押注该标准平台与政策的基本信任模型警告。

[`🔗 da.vidbuchanan.co.uk — essay`](https://www.da.vidbuchanan.co.uk/blog/android-c2pa.html) · [`🔗 Hacker News`](https://news.ycombinator.com/item?id=49439499)

---

## 27. Python 的 str.lower() 与 IDNA 2003 分道扬镳——CVE-2026-17084，一个 Unicode 版本锚定 bug

- **Velocity:** ▮ steady
- **Source:** Seth Larson blog · HN 46 pts · ~1d ago
- **Tags:** `python` `idna` `unicode` `cve` `security`

Seth Larson（PSF 安全驻场开发者）详解 **CVE-2026-17084**：`stringprep`/IDNA 2003 编解码器（`str.encode('idna')`）在 RFC 3454 大小写折叠中使用了 `str.lower()`，但 `str.lower()` 遵循解释器的 Unicode 版本（17.0）而非规范钉死的 **Unicode 3.2.0**。同一可见输入在不同 Unicode 版本下会编码成不同的 Punycode（如 `"ᎠᎠ"` → `xn--58da` 与 `xn--kz9aa`）——一个可用于同形字/钓鱼、白名单绕过或 SSRF 式混淆的解析器差分。修复仅在 StringPrep 内把大小写折叠锚定到 Unicode 3.2.0（CPython PR #155293，回移植到 3.14/3.15）；NVD 归类为 **CWE-436** 解释冲突。

**Why it matters:** "版本锚定"——规范钉住旧 Unicode 版本而代码跟随当前版本——是一类安静的安全 bug，建议迁移出 IDNA 2003 编解码器、改用 IDNA 2008 的 `idna` 包。

[`🔗 sethmlarson.dev`](https://sethmlarson.dev/when-str-lower-is-a-security-vulnerability) · [`🔗 CPython PR #155293`](https://github.com/python/cpython/pull/155293) · [`🔗 HN`](https://news.ycombinator.com/item?id=49440410)

---

## 28. ERPO——阿里把 RL 正则化从响应侧搬到查询侧（arXiv 2608.23311）

- **Velocity:** ▮ steady
- **Source:** arXiv · 2608.23311 · ~1d ago
- **Tags:** `research` `rl` `rhlf` `optimization` `alibaba`

**ERPO**（arXiv 2608.23311，被 EMNLP 2026 主会接收）用**查询 KL（Query-KL）**惩罚——针对当前策略所诱导的查询分布——替代 LLM 策略优化中的动作侧 **Policy-KL** 正则器：由于 QKL 梯度仅经查询似然流动，不会对响应分布施加直接压力，因此探索得以保留。它不依赖特定估计器，无需额外前向即可接入 GRPO/PPO/REINFORCE。在 6 个数学基准（Qwen2.5-Math-7B，240 步）上得分 **0.336 vs 0.274**（GRPO 基线）；在 960+ 步训练下 GRPO 的 KL 爆炸、约 480 步后准确率崩溃，而 ERPO 保持稳定。代码已开源（AlibabaResearch/ERPO）。

**Why it matters:** 稳定–探索困境是 RLHF 的核心瓶颈——用约束*查询*漂移取代约束*响应*漂移，是一个廉价、通用、能显著稳定长程训练的改动。

[`🔗 arXiv 2608.23311`](https://arxiv.org/abs/2608.23311) · [`🔗 GitHub — AlibabaResearch/ERPO`](https://github.com/AlibabaResearch/ERPO)

---

## 29. CVE-2026-79992——Emacs TRAMP 经构造文件名触发 shell 注入（CVSS 7.8）

- **Velocity:** ▮ steady
- **Source:** Red Hat / NVD · CVSS 7.8 · ~1d ago（8 月 25 日）
- **Tags:** `cve` `emacs` `tramp` `command-injection` `local`

Red Hat 披露 **CVE-2026-79992**（CWE-78，CVSS 7.8）：Emacs **TRAMP** 在把登录参数交给本地 shell 前未做净化拼接，因此本地攻击者诱使你打开**精心构造的文件名**（经由 "user" 字段）即可实现 shell 命令注入与任意代码执行。影响 RHEL 的 `emacs` 包（RHEL 9/10 标记为受影响）；支持渠道内暂无修复——缓解手段是避免处理不可信文件名。

**Why it matters:** 编辑器的远程文件层成了注入面——提醒我们，"本地"工具若为处理远程路径而调用 shell，也需要与网络服务同等的输入净化纪律，而不可信文件名就是新的不可信 HTML。

[`🔗 Red Hat CVE`](https://access.redhat.com/security/cve/cve-2026-79992) · [`🔗 NVD`](https://nvd.nist.gov/vuln/detail/CVE-2026-79992)

---

## 30. OxAlpha 确认为智谱下一代 GLM——今晚开源权重

- **Velocity:** ▮▮▮ trending
- **Source:** The Edge Malaysia / ChainCatcher · ~today（8 月 26 日）
- **Tags:** `ai-model` `glm` `zhipu` `open-weights` `openrouter`

自 8 月 22 日我们将 Ox Alpha 作为 OpenRouter 上的匿名模型报道以来，**智谱（Z.AI）**于 8 月 26 日向彭博社确认，它是**GLM 系列的最新迭代**——一个面向编码与智能体任务的多模态推理模型（文本/图像/视频）——并表示将于**当晚发布权重**。这次 8 月 20 日的匿名发布被称为 OpenRouter 史上最大发布：它登顶排行榜，使用量是 DeepSeek 的两倍多，目前免费一周。报道称其代号取自中国电影《牛来》，并指出阿里与小米今年也采用了同样的"匿名首发"策略。

**Why it matters:** "匿名首发 → 揭晓身份 → 开源权重"正在成为新的模型发布套路，而这一确认把排行榜传闻变成可复现的开源模型——但流传的约 100 万上下文与 DeepSWE 80% 等数字并未在已确认的来源中，因此在模型卡落地前，身份与可用性之外的数据都应视为未证实。

[`🔗 The Edge Malaysia`](https://theedgemalaysia.com/node/815823) · [`🔗 ChainCatcher — Bloomberg`](https://www.chaincatcher.com/article/2285607)

---

## 31. CVE-2026-63520——SharePoint 不安全的 .NET 类型实例化串联成未认证 RCE（CVSS 8.1）

- **Velocity:** ▮▮▮ trending
- **Source:** VulnCheck / Censys · CVSS 8.1 · ~1d ago（8 月 24 日）
- **Tags:** `cve` `microsoft` `sharepoint` `rce` `type-instantiation`

**CVE-2026-63520**（CVSS 8.1，`AV:N/AC:H/PR:N/UI:N`，CNA 分配——NVD 评估待定）是 SharePoint 业务连接服务（BCS）中的不安全 .NET 类型实例化：`DbTypeReflector.ResolveDotNetType()` 对攻击者控制的 BDCM `TypeName` 调用 `Type.GetType()` 且无允许列表。**VulnCheck** 于 8 月 24 日发布了**武器化完整利用链**，将其与已报道的 **CVE-2026-55040** JWT 绕过串联，实现**未认证 RCE**——实例化 `System.Web.UI.LosFormatter` 并通过 BDC Finder 方法触发 `Deserialize`。影响 **2026 年 8 月累积更新**之前的 SharePoint Server 2016/2019/订阅版，该更新加入了 `ValidateSafeBcsType` 允许列表；由 Rapid7 的 Stephen Fewer 发现，约 8,500 台公网服务器，8 月 25 日 Censys 联合公告。

**Why it matters:** 认证绕过那半条链已进入 KEV 且正被积极探测——在此基础上出现公开武器化利用链，意味着 SharePoint 管理员应假设完整的未认证 RCE 路径正在被尝试，8 月累积更新是唯一缓解手段。

[`🔗 VulnCheck`](https://www.vulncheck.com/blog/cve-2026-63520-sharepoint-unsafe-type-rce) · [`🔗 Censys advisory`](https://censys.com/advisory/cve-2026-55040-cve-2026-63520/) · [`🔗 NVD`](https://nvd.nist.gov/vuln/detail/CVE-2026-63520)

---

## 32. CVE-2026-79290——Chrome Aura 释放后使用漏洞是严重级沙箱逃逸（CVSS 9.6）

- **Velocity:** ▮▮▮ trending
- **Source:** Chrome Releases / OpenCVE · CVSS 9.6 · ~1d ago（8 月 25 日）
- **Tags:** `cve` `chrome` `use-after-free` `sandbox-escape` `browser`

**CVE-2026-79290**（CWE-416，**CVSS 9.6**，CISA ADP Vulnrichment 评分）是 Chrome **Aura** 窗口层中的释放后使用漏洞，Chromium 评为**严重级**：精心构造的 HTML 页面可破坏内存并**逃逸沙箱**，在渲染进程外执行代码。已在 **Chrome 152.0.7977.65**（Stable，8 月 25 日）全平台修复，同一批还包括 CVE-2026-79138（ANGLE 越界写，Windows，高危）、CVE-2026-79026（Extensions UAF，高危）与 CVE-2026-79125（WebXR 信息泄露，低危）。暂无在野利用报告，尚未进入 KEV。

**Why it matters:** 多数智能体框架与无头工具所依赖的浏览器出现严重级沙箱逃逸 UAF，是"立即更新"的信号——两周内第二个严重级 Chrome 修复，也让"浏览器即智能体运行时"持续处于供应链议题中心。

[`🔗 Chrome Releases`](https://chromereleases.googleblog.com/2026/08/stable-channel-update-for-desktop_0256176589.html) · [`🔗 OpenCVE`](https://app.opencve.io/cve/CVE-2026-79290) · [`🔗 NVD`](https://nvd.nist.gov/vuln/detail/CVE-2026-79290)

---

## 33. NVIDIA Groq 3 LPX 全面投产——Gemma 4 31B 在 100K 上下文下约 3,400 token/秒

- **Velocity:** ▮▮▮ trending
- **Source:** NVIDIA Newsroom / zhidx · ~2d ago（8 月 24 日，Hot Chips 2026）
- **Tags:** `nvidia` `hardware` `inference` `groq` `agentic-ai`

NVIDIA 在 Hot Chips 2026（8 月 24 日）宣布，其 **Groq 3 LPX** 加速器——源自 Groq 收购的解码阶段 LPU 芯片，与 Vera Rubin 平台互补——已**全面量产**。独立评测机构 **Artificial Analysis** 测得 **Gemma 4 31B 在 100K 上下文下约 3,400 输出 token/秒**（zhidx 引用 100K 下 3,431 tok/s 中位数，与 10K 几乎持平，SPEED-Bench 编码中位数 4,767 tok/s）。NVIDIA 称对延迟敏感的智能体工作负载比最接近的替代方案快 **4 倍**。每个机架含 256 颗 LP30 加速器（128 GB 片上 SRAM，640 TB/s 扩展带宽，液冷）；**Nebius** 是首个通过其 Token Factory 平台部署的云厂商。

**Why it matters:** Groq 3 LPX 是让前沿级模型逐请求秒回的"解码引擎"——这是"多轮智能体工作负载才是推理瓶颈，而非聊天"的硬件押注——不过头号数字是开放 31B 模型而非前沿 MoE，且 4×/30× 的说法是厂商预测。

[`🔗 NVIDIA Newsroom`](https://nvidianews.nvidia.com/news/nvidia-groq-3-lpx-now-in-full-production-with-world-class-speed-for-agentic-ai) · [`🔗 zhidx — 3,431 tok/s`](https://www.zhidx.com/p/587895.html) · [`🔗 Nebius`](https://nebius.com/blog/posts/nvidia-groq-3-lpx-nebius-token-factory)

---

## 34. Archify——把代码库变成经过 schema 校验的交互式图表的智能体技能（16.8k 星）

- **Velocity:** ▮▮ rising
- **Source:** GitHub · 16.8k stars · ~today（8 月 26 日）
- **Tags:** `agents` `skills` `diagrams` `architecture` `open-source`

**tt-a1i/archify**（MIT，16.8k 星）是一个面向 Raven、Cursor、Claude Code、Codex CLI 与 OpenCode 的智能体技能（SKILL.md），把仓库或自然语言描述转换为交互式架构/时序/数据流图。其类型化 JSON IR 经过 schema 与布局校验——渲染器**拒绝无效输出**（交叉连线、重叠标签）并返回结构化诊断——输出是自包含 HTML 文件，支持 PNG/SVG/WebM 导出与 1200×630 分享卡片。"架构 Delta"模式以机器可读回执对比 Before/Delta/After，还能把粘贴的 Mermaid 改写为 Archify JSON。今日登上 GitHub 日趋势（+1,002 星）。

**Why it matters:** "宁可渲染失败也不渲染错误"正是智能体工具所需的正确性思维，Archify 也表明技能浪潮正从散文式指令走向经过校验、机器可查的工件。

[`🔗 tt-a1i/archify`](https://github.com/tt-a1i/archify) · [`🔗 SkillsMP`](https://skillsmp.com/creators/tt-a1i/archify/archify)

---

## 35. CVE-2026-80104——DB-GPT 未认证路径穿越 → 任意文件写入 → RCE（CVSS 9.8）

- **Velocity:** ▮▮ rising
- **Source:** NVD / VulnCheck · CVSS 9.8 · ~1d ago（8 月 25 日）
- **Tags:** `cve` `db-gpt` `ai-infra` `path-traversal` `rce`

**CVE-2026-80104**（CWE-22，**CVSS 9.8**，VulnCheck 分配）是 **eosphoros-ai/DB-GPT** 中 `skill_upload` 处理器的未认证路径穿越：它把 `file.filename` 原样写入 `upload_dir/filename`，不做规范化或包含性检查，且认证依赖在无 `user_id` 头时仍返回 admin 角色。未认证攻击者可向包内投放 `.py` 模块，在下次导入时获得代码执行。影响 `dbgpt-app` 0.8.0；已在 **v0.8.1**（GitHub + PyPI）修复。暂无确认的在野利用。

**Why it matters:** 开发者正把数据库智能体框架直接接入生产数据存储，其中出现 CVSS 9.8 正是攻击者探测的 AI 供应链面——"无 user_id 也是 admin"提醒我们审计 AI 工具中的授权逻辑。

[`🔗 NVD`](https://nvd.nist.gov/vuln/detail/CVE-2026-80104) · [`🔗 eosphoros-ai/DB-GPT`](https://github.com/eosphoros-ai/DB-GPT/releases)

---

## 36. CVE-2026-78676——GitPython 把配置重序列化成活动的 `core.hooksPath` 实现 RCE（CVSS 9.8）

- **Velocity:** ▮▮ rising
- **Source:** GitHub Advisory / NVD · CVSS 9.8 · ~1d ago（8 月 25 日）
- **Tags:** `cve` `gitpython` `rce` `argument-injection` `python`

**CVE-2026-78676**（CWE-88，**CVSS 9.8**）影响 **GitPython ≤ 3.1.58**：`GitConfigParser.write_section` 会把带引号的多行配置值重序列化为不带引号的物理换行，从而把休眠值变成**活动指令（如 `core.hooksPath`）**——之后任何 Git 操作都会调用攻击者控制的钩子实现代码执行。触发需要一条精心构造的多行 git 配置值外加一次后续的无关配置写入。已在 **GitPython 3.1.59** 修复，该版本同时修复 CVE-2026-78675（`.gitmodules` 泄露）与 CVE-2026-78677（目录穿越）。暂无确认的在野利用；公开 PoC 在各追踪器上存在争议。

**Why it matters:** 几乎所有 Python 工具链都靠这个库来调起 Git，其中出现 9.8 就是供应链 RCE——而"一次配置写入变成钩子"是安全扫描器很少能抓到的延迟触发型注入。

[`🔗 GitHub Advisory GHSA-9557-234j-7rv9`](https://github.com/advisories/GHSA-9557-234j-7rv9) · [`🔗 NVD`](https://nvd.nist.gov/vuln/detail/CVE-2026-78676)

---

## 37. JoyAI-Echo-1.5——京东长时程音视频生成登顶 WBench（arXiv 2608.23383）

- **Velocity:** ▮▮ rising
- **Source:** arXiv · 2608.23383 · ~1d ago（8 月 25 日修订）
- **Tags:** `research` `video-generation` `audio-visual` `world-model` `open-source`

**JoyAI-Echo-1.5**（京东，arXiv 2608.23383）是统一音视频生成系统，含两个变体：**长视频**变体用可组合的跨镜头记忆与说话人线索保持角色外观与音色的持续性；**世界模型**变体把异构导航输入转换为经校准的度量 6-DoF 相机轨迹，支持与控制器无关的交互。采用渐进式教师强制加基于自生成轨迹的短/长时程 Self-Gradient Forcing 训练，世界模型变体**在 WBench 排名第一（平均 81.7）**，并在 SANA-WM-Bench 上于长时程持续性、视觉质量方面领先。代码与权重已开源（jd-opensource/JoyAI-Echo）。

**Why it matters:** "持续故事与可交互世界"是超越片段式视频生成的下一个前沿——把长视频路径与世界模型路径拆开，是这一领域向"带记忆的生成"收敛时值得关注的设计。

[`🔗 arXiv 2608.23383`](https://arxiv.org/abs/2608.23383) · [`🔗 jd-opensource/JoyAI-Echo`](https://github.com/jd-opensource/JoyAI-Echo)

---

## 38. QAH——量化感知修复让 4-bit 模型胜过其 bfloat16 源模型（arXiv 2608.20953）

- **Velocity:** ▮▮ rising
- **Source:** arXiv / Unite.ai · 2608.20953 · ~1d ago（8 月 25 日）
- **Tags:** `research` `quantization` `llm` `efficiency` `open-weights`

**量化感知修复（QAH）**（Multiverse Computing，HF 博客 8 月 25 日 + arXiv 2608.20953）用**直接基于原始全精度模型的 KL 散度蒸馏**替代 QAT/QAD 中质量退化的中间教师。应用到 **GPT-OSS 120B → 60B → MXFP4** 后，QAH 学生在 **9 项基准中 7 项达到或超过其 bfloat16 源**（AA-LCR 42.7 vs 35.3，AIME 2025 76.3 vs 70.7，Aider 40.9 vs 38.2），并在 LiveCodeBench 上险胜 120B 教师——而权重与每 token 算力约为其一半。在 GPT-OSS 9B 上，它约比 QAT 快 7 倍达到峰值，并在 1,200 步内保持离峰值约 2 分以内，而 QAT 跌去约 19 分。成果以 **HyperNova-60B**（Apache-2.0）开源权重形式发布。

**Why it matters:** 若 4-bit 压缩外加一半参数量就能追平全精度，开放模型的主要服务成本将骤降——但这些是 Multiverse 在自有流水线（专有压缩、仅 GPT-OSS）上的自测数据，因此"胜过 bf16"是待复现的结果，而非独立事实。

[`🔗 arXiv 2608.20953`](https://arxiv.org/abs/2608.20953) · [`🔗 Unite.ai`](https://www.unite.ai/multiverse-computings-4-bit-healing-beats-full-precision-model/) · [`🔗 papers.cool`](https://papers.cool/arxiv/2608.20953)

---

## 39. Ambient Context——面向 LLM 的纯文本"屏幕记忆"，macOS 上完全离线（Show HN）

- **Velocity:** ▮ steady
- **Source:** HN · 61 pts · ~1d ago（8 月 25 日）
- **Tags:** `agents` `memory` `macos` `privacy` `local-first`

**dragthelake/ambient-context**（Show HN，8 月 25 日）是一个 macOS 菜单栏应用，把工作记录为纯 Markdown 供 LLM 阅读：它通过辅助功能 API 每隔几秒捕获焦点窗口文本（无截图/OCR），每天写一个 Markdown 文件并附 `AGENTS.md` 描述格式，写入前会脱敏——跳过密码管理器/隐私浏览，清除凭据/API 密钥/银行卡号。完全离线（无账户、服务器、遥测或网络调用），你把 Claude Code 指向该文件夹问"我周二干了什么"即可。已知局限：Chromium/Electron 的辅助功能树较慢，GPU 渲染终端（Kitty、Alacritty）暴露的文本很少。122 星，v0.1.0 未签名，需 macOS 14+ Apple Silicon。

**Why it matters:** "纯文本、本地、仅屏幕记忆"是介于 Recall/Rewind 式录制与什么都不记之间的隐私友好中间路线——而用 AGENTS.md 描述你自己的日常日志，是无数据库把手头人类上下文交给智能体的巧妙模式。

[`🔗 dragthelake/ambient-context`](https://github.com/dragthelake/ambient-context) · [`🔗 runtimewire`](https://runtimewire.com/article/cameron-smith-ambient-context-mac-memory-markdown) · [`🔗 HN`](https://news.ycombinator.com/item?id=49429095)

---

## 40. CarWatch——把树莓派 5 变成完全离线的车载智能体（Show HN）

- **Velocity:** ▮ steady
- **Source:** HN · 143 pts · ~1d ago（8 月 25 日）
- **Tags:** `agents` `edge-ai` `raspberry-pi` `local-ai` `hardware`

**ThinkOffApp/CarWatch**（AGPL-3.0，171 星）是运行在树莓派 5 上的车载智能体：本地运行 **Qwen3.6-35B-A3B**（约 14.3 GB 量化，约 3.5 tok/s），基于 745 页车主手册做 RAG，通过蓝牙 ELM327 读取 OBD-II，并能经 Home Assistant 下发仅安全相关的云命令（锁门、关窗）。免提语音完全端侧运行——连续 VAD → whisper.cpp → 基于资料的应答——手机仪表盘在 8088 端口。Show HN 获得 143 分/45 评论（因格式而非内容被标记）。

**Why it matters:** 一台约百美元设备本地跑 35B 模型、带语音与你的车主手册，是"本地 AI"一个具体的终态——慢 token 也照单全收——而"只读 OBD-II 访问"与"明确仅安全命令"的划分，是端侧智能体合理的安全模型。

[`🔗 ThinkOffApp/CarWatch`](https://github.com/ThinkOffApp/CarWatch) · [`🔗 HN`](https://news.ycombinator.com/item?id=49435675)

---

## 41. Vinci Code——SimpleDirect 以 MIT 协议开源其基于 Pi 的终端编码智能体

- **Velocity:** ▮ steady
- **Source:** SimpleDirect blog · ~1d ago（8 月 25 日）
- **Tags:** `coding-agent` `cli` `open-source` `mit` `pi`

多伦多的 **SimpleDirect** 于 8 月 25 日以 **MIT** 协议开源了 **Vinci Code CLI**——"Pi 的一个发行版"（Mario Zechner 的 MIT 智能体框架），保留上游历史并加入一层有主见的封装：平白语言解说、命令守卫、密钥掩码、操作系统级沙箱、检查点、撤销/审查与持久任务回执。它把工作终结为四种明确状态——**DONE、DONE-UNVERIFIED、WAITING、BLOCKED**——而非信任模型自称的完成，并在不可逆命令前暂停（`rm -rf` 默认拒绝）。自带密钥（BYOK）支持 33 家供应商；明确处于 beta，不支持本地模型，仅 CLI。

**Why it matters:** 每次运行都以明确的"未验证/阻塞"状态收尾，是智能体 CLI 一个小小的但真实的问责转变——而"Pi 的发行版而非分支"也让日益壮大的 Pi 生态保持兼容。

[`🔗 SimpleDirect — Vinci Code`](https://getsimpledirect.com/blog/vinci-code-is-now-open-source) · [`🔗 getsimpledirect/vinci-code-cli`](https://github.com/getsimpledirect/vinci-code-cli)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-08-26T20:14:00Z |
| Items | 41 |
| Sources tracked | 57 (CISA KEV, CyCognito, GitHub, Qualys, livethreat.ai, Apple Newsroom, Wccftech, iThome, IBM, ic.work, MongoDB, 至顶网, arXiv, AITNT, 证券日报, smzdm, VulDB, dev.to, GitHub Advisory, herdr.dev, OpenGithubs, explainx.ai, Alibaba Cloud, Higress, benchlm.ai, SciRate, ifeng, 17173, 163.com, openai.com, TechCrunch, VentureBeat, SiliconANGLE, The Hacker News, SecurityWeek, lemmus.org, VulnCheck, Rapid7, IONIX, da.vidbuchanan.co.uk, HN, sethmlarson.dev, Red Hat, NVD, Censys, ChainCatcher, Chrome Releases, NVIDIA Newsroom, Nebius, OpenCVE, papers.cool, runtimewire, SimpleDirect blog, SkillsMP, The Edge Malaysia, unite.ai, zhidx) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[Previous day](../2026-08-25/) · [Raw .md](../2026-08-26.md) · [Archive](../../archive/)
