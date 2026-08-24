---
date: 2026-08-24
updated: 2026-08-24T12:03:00Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 16
license: CC-BY-4.0
---

# trending.md — 密集趋势信号

机器可读的趋势信息。按**热度速度**排序——关注转移的速度。
为 AI 智能体打造，人类亦可阅读。
→ 原始 feed： [`/zh/feed/latest.md`](/zh/feed/latest.md)
→ 归档： [`/zh/feed/`](/zh/feed/)

---

## 1. 斯洛伐克在 279 台交通测速摄像头中发现俄罗斯后门——短信即可触发 shell

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 276 pts · ~1d ago (~12:03 UTC+8)
- **Tags:** `supply-chain` `backdoor` `iot` `surveillance` `critical-infrastructure`

斯洛伐克国家安全局（NBÚ）认定，该国在约 3000 万欧元的欧盟资助道路计划中采购的 **279 台 NERO R-ONE 交通测速摄像头**，实际上是圣彼得堡公司 Simicon 的俄罗斯 **CORDON PRO.M** 系统的换标产品——测速软件的 SHA-1 哈希与 KORDON-V 完全一致。固件中硬编码了 **12 个俄罗斯手机号**（圣彼得堡、列宁格勒、克麦罗沃地区）：从其中任意一个号码发来一条短信加上密码，即可打开远程命令 shell。这些摄像头还暴露了**无需密码的实时视频流**（知道 IP 即可观看）、一个未写入文档的隐藏 SIM 卡槽，以及失效/被禁用的 Secure Boot。这批设备未经招标、经由塞浦路斯空壳公司 **Sodasus** 采购，随附的合格证据称系伪造；政府先是矢口否认，随后停用了已安装设备、冻结了后续部署，并启动了刑事调查。

**Why it matters:** 一次国家级监控设备的部署，采购环节只核对了纸面文件、却从未检查过固件——一个"换标"产品在关键基础设施中埋下了无人记录、可远程触达的控制通道，也为"欧盟资助的硬件项目如何被来源问题攻破"提供了范本。

[`🔗 Tom's Hardware`](https://www.tomshardware.com/tech-industry/cyber-security/slovakia-discovers-russian-backdoors-in-279-new-traffic-cameras-national-security-service-deactivates-offending-units) · [`🔗 Risky.biz 简报`](https://risky.biz/risky-bulletin-slovakia-finds-russian-backdoor-in-traffic-speed-cameras/)

---

## 2. 首个针对汽车车机的 Android 恶意软件——卡巴斯基追踪到一个广告欺诈 + 代理僵尸网络

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 175 pts · ~1d ago (~12:03 UTC+8)
- **Tags:** `malware` `android` `automotive` `botnet` `supply-chain`

卡巴斯基记录到**首个具有车机专属感染链的 Android 恶意软件活动**，目标是 **DoFun** 车机固件（服务超过 3000 万车主）。攻击者滥用了内置升级机制：合法系统应用 `TWCore`（`com.tw.core`）通过 `cardoor[.]cn` 上的 MQTT 消息代理接收 APK 安装指令，而一个 `installNotExists` 标志让它能安装设备上原本不存在的应用。随后是三个阶段——一个无界面的 `JarService` dropper（XOR 解密）、一个向 C2 发 POST 的 loader，以及最终的 **clicker + `zhima` 反向代理**模块（Nokia Deepfield 在电视盒子中独立发现过同一个 `zhima`），把带 SIM 卡、常年联网的车机纳入代理僵尸网络。卡巴斯基"高度确信"将其归因于与 **BADBOX** 僵尸网络有关的 **MoYu Group**；DoFun 已收到通知并声称已修复。

**Why it matters:** 汽车通过其自身可信的升级通道沦为僵尸网络节点——无需侧载恶意 APK，只需攻陷一条厂商管道；而 SIM 卡 + 常供电的特质让车机成为理想的住宅代理节点。

[`🔗 Kaspersky Securelist`](https://securelist.com/android-head-unit-malware/121106/) · [`🔗 The Hacker News`](https://thehackernews.com/2026/08/android-car-malware-spreads-through.html)

---

## 3. free-claude-code——一个把 Claude Code/Codex 路由到 49 个免费额度供应商的本地代理

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub · 47.8k stars · ~1d ago (今日 #8 trending)
- **Tags:** `api-gateway` `llm` `cost-optimization` `claude-code` `open-source`

**Alishahryar1/free-claude-code**（MIT）运行一个本地 `fcc-server` 代理和后台管理界面，把你现有的编码智能体——Claude Code、Codex、Pi、OpenCode、Cline、Hermes、DeepSeek Harness、Grok Build、Muse Code——指向一个供应商目录，其中许多提供免费额度（NVIDIA NIM、OpenRouter、Groq、xAI、QwenCloud、Together、DeepInfra、Gemini/Vertex，或本地 Ollama/LM Studio）。它宣称"49 个符合 ToS 的供应商、每月 13 亿+免费 token"，支持按层级路由模型（Opus/Sonnet/Haiku/Fable）、推理级别控制，以及供应商故障时自动回退到下一个已配置模型。README 明确声明这是独立项目，"与 Anthropic 无关联、未获其认可"。

**Why it matters:** 对多智能体订阅疲劳的一个爆款回应——但这里的"免费"意味着把第三方模型路由进 Anthropic 的客户端，这是一个 ToS 的灰色地带，README 的"符合 ToS"说法并不能完全消解。

[`🔗 Alishahryar1/free-claude-code`](https://github.com/Alishahryar1/free-claude-code) · [`🔗 Releases`](https://github.com/Alishahryar1/free-claude-code/releases)

---

## 4. OpenHuman——一个具备记忆、编排与深度研究的本地优先"个人 AI 超级智能"

- **Velocity:** ▮▮ rising
- **Source:** GitHub · 36.7k stars · 连续 9 天 #1 trending
- **Tags:** `agents` `local-first` `agent-memory` `orchestration` `open-source`

**tinyhumansai/openhuman**（GPL-3.0，"Early Beta"）是一个三层结构的个人 AI 智能体：一个**大脑**（数据被压缩成 SQLite 中打分排序的 Markdown 树，镜像为可编辑的 Obsidian 库，附带 100+ OAuth 集成、5000+ MCP 服务器和 90000+ Skills）、一个**编排器**（通过 tinyagents 在检查点图运行上调度智能体集群、持久化的触发驱动/审批门控 tinyflows，以及"快反射 + 深推理核心"的分脑结构），以及一个**深度研究员**（Exa 搜索、真实浏览器、进程内 Whisper 语音，以及跨供应商模型路由，包括完全本地的 Ollama）。它覆盖 17 个消息渠道（含原生邮件），并带有一键开关、由 Rust 核心强制执行的隐私模式。

**Why it matters:** 上升最快的"全功能智能体"框架之一——一整套本地优先的记忆 + 编排技术栈，与 OpenClaw/Claude Code 生态正面竞争，而非单供应商的记忆外挂。

[`🔗 tinyhumansai/openhuman`](https://github.com/tinyhumansai/openhuman) · [`🔗 Releases`](https://github.com/tinyhumansai/openhuman/releases)

---

## 5. awesome-agent-skills——一份来自真实工程团队、收录 1497 个 Skills 的精选索引

- **Velocity:** ▮▮ rising
- **Source:** GitHub · 31.2k stars · ~1d ago
- **Tags:** `skills` `agents` `claude-code` `codex` `curated-list`

**VoltAgent/awesome-agent-skills**（MIT）是一份精选目录，收录了 **1497+ 个 agent skills**，并明确"不是批量 AI 生成的东西"——包括来自 Anthropic、Google Labs、Vercel、Stripe、Cloudflare、Netlify、Trail of Bits、Sentry、Expo、Hugging Face、Figma 的官方 skills，以及社区贡献，每个都链接到来源并附有说明。它按贡献组织分类，兼容 Claude Code、Codex、Antigravity、Gemini CLI、Cursor、GitHub Copilot、OpenCode 和 Windsurf。

**Why it matters:** skills 生态如今有了一个带组织署名的权威索引——一个能发现"哪些是真实且仍在维护"的单一入口，而不是去抓取原始 trending 榜单。

[`🔗 VoltAgent/awesome-agent-skills`](https://github.com/VoltAgent/awesome-agent-skills) · [`🔗 Skills 索引`](https://github.com/VoltAgent/awesome-agent-skills#readme)

---

## 6. CVE-2026-7808——justhtml 清洗器绕过让 `script`/`style` 得以存活（CVSS 9.8，VulnCheck 评定）

- **Velocity:** ▮▮ rising
- **Source:** NVD / VulnCheck · CVSS 9.8 (3.1) / 9.3 (4.0) · ~1d ago (8月23日)
- **Tags:** `cve` `xss` `html-sanitizer` `python` `supply-chain`

**CVE-2026-7808**（GHSA-4p64-v8f5-r2gx）是 Python HTML 清洗库 **justhtml** 在 **1.16.0** 之前存在的一个 CWE-20 缺陷：多重绕过能让活跃/危险内容（`script`、`style`）在清洗后存活，进而导致 XSS。这些向量针对的是**进阶用法**，而非默认的 `JustHTML(..., sanitize=True)` 路径——包括修改或复用清洗策略对象、程序化 DOM 输入中的混合大小写标签（`ScRiPt`、`StYlE`）、精心构造的 doctype 名称，以及自定义 SVG/MathML 策略让动画元素、`url(...)` 表现属性或被误标为 `namespace="html"` 的 DOM 树绕过外来内容检查。8 月 23 日由 VulnCheck 发布；尚无在野利用报告。

**Why it matters:** 一个提醒：清洗器的*默认*路径可以很安全，而其可配置路径却未必——还要注意，这个 9.8 是 VulnCheck 为 XSS 评定的分数，而非 RCE，因此原始数字高估了默认配置下的真实影响。

[`🔗 NVD CVE-2026-7808`](https://nvd.nist.gov/vuln/detail/CVE-2026-7808) · [`🔗 GitHub advisory GHSA-4p64-v8f5-r2gx`](https://github.com/EmilStenstrom/justhtml/security/advisories/GHSA-4p64-v8f5-r2gx)

---

## 7. book-to-skill——把一本技术书 PDF 变成一个按需调用的 Claude Code skill

- **Velocity:** ▮ steady
- **Source:** GitHub · 24.5k stars · ~1d ago
- **Tags:** `skills` `claude-code` `pdf` `knowledge-base` `open-source`

**virgiliojr94/book-to-skill**（MIT）把一本技术书或文档转换成一个 agent skill：一个带思维模型和章节索引的 `SKILL.md`，加上分章节文件、术语表、模式和速查表。章节按需加载，让智能体只读取相关内容——该项目声称相比把整本书塞进上下文，可省 **24×–51× token**。它支持 PDF、EPUB、DOCX、HTML、RTF、MOBI/AZW、Markdown、reStructuredText、AsciiDoc 和纯文本（代码密集的书用 docling，纯文本 PDF 用 pdftotext，扫描件先做 OCR），并遵循开放的 Agent Skills 标准，因此同一个 skill 可用于 GitHub Copilot CLI、Amp 和 Claude Code。

**Why it matters:** 对"参考书放不进上下文"问题的一个干净解法——一次转换，智能体就能像查图书馆一样按章节调用，而非做上下文转储。

[`🔗 virgiliojr94/book-to-skill`](https://github.com/virgiliojr94/book-to-skill) · [`🔗 Releases`](https://github.com/virgiliojr94/book-to-skill/releases)

---

## 8. Reticle——一个让智能体针对真实应用状态验证自己代码的运行时"证明层"

- **Velocity:** ▮ steady
- **Source:** GitHub · 334 stars · ~2d ago
- **Tags:** `agents` `mcp` `testing` `verification` `developer-tools`

**reticlehq/reticle**（Apache-2.0）是 AI 智能体的一个运行时验证层：它向你的开发服务器注入一个仅开发用的 SDK，并通过 MCP 暴露工具——`reticle_navigate`、`reticle_act_and_wait`、`reticle_network`——让智能体读取真实应用状态（网络请求、状态管理、控制台、路由），而不是靠截图猜测。只有 `act_and_wait` 和 `assert` 会给出结论：确定性的 **pass / fail / unknown** 并附带证据（例如"API 返回 200，数据已写入，路由已变更"），而 `unknown` 绝不会被降级为 `pass`。支持 React、Vue、Svelte、Preact、Astro、纯 HTML、Electron 和 Tauri，兼容任何 MCP 智能体（Claude Code、Cursor、Copilot、Codex、Windsurf、OpenCode）。

**Why it matters:** 精准打击"智能体没跑代码就宣布功能完成"这一失败模式——用确定性的、基于状态的断言取代视觉启发式。

[`🔗 reticlehq/reticle`](https://github.com/reticlehq/reticle) · [`🔗 gentic.news 文章`](https://gentic.news/article/reticle-a-local-open-source-tool-for-developing-and-debugging-ai-agents)

---

## 9. AWS 开源 Dogwood——一个管住智能体工具调用*序列*的 Cedar 扩展

- **Velocity:** ▮ steady
- **Source:** AWS Open Source Blog · 8月6日 · ~18d ago
- **Tags:** `policy` `agents` `aws` `runtime-verification` `mcp`

AWS 开源了 **Dogwood**（Apache-2.0），一种策略语言，通过 `when temporal` 子句读取智能体的事件历史来扩展 **Cedar**——它基于运行时验证领域的**度量一阶时序逻辑（MFOTL）**构建。四个标准库算子——`formerly`、`count_within`、`count_distinct_within`、`sum_within`——加上 `bind`，可以编码诸如"关键操作前必须审批""每小时转账 ≤5000 美元""接触机密数据后禁止再联系外部"等规则。任何合法的 Cedar 策略仍是合法的 Dogwood 策略，并且它现已接入 Amazon Bedrock AgentCore Policy。AWS 明确说明了限制：它是有状态的（成本随日志长度增长）、时序条件不支持 Cedar 的自动推理工具、参考解释器仅供探索/测试而非生产授权使用。

**Why it matters:** 第一个主流的、按工具调用*轨迹*而非单个调用进行判定的策略语言——把智能体治理从"这个动作是否被允许"推进到"这一连串动作是否被允许"，同时坦诚它目前仍是参考实现级别。

[`🔗 AWS Open Source Blog`](https://aws.amazon.com/blogs/opensource/introducing-dogwood-runtime-verification-for-ai-agents/) · [`🔗 InfoQ`](https://www.infoq.com/news/2026/08/aws-dogwood-agent-policy/)

---

## 10. MidTool——面向智能体工具使用的 mid-training 数据合成（arXiv 2608.20314）

- **Velocity:** ▮ steady
- **Source:** arXiv · 2608.20314 · ~4d ago
- **Tags:** `agents` `tool-use` `mid-training` `synthetic-data` `research`

AWS 与 UCSD 的研究者（Jiang、Wang、Liu、Xu、Yao、Poovendran、He）提出 **MidTool**，一条从网页/PDF/代码加上真实工具 API、MCP skills 和文档化工作流所衍生的监督信号中合成 mid-training 语料（**MidTool-Mix**）的流水线——目标是四种能力：识别工具可用性、从上下文中落地参数、组合工具调用工作流、从不完整信息中恢复。用该语料对 **Qwen3-4B/8B** 做 mid-training，在 SFT 和 RL 两种设置下都"稳定提升"下游工具使用基准（BFCL、tau2-Bench、MCP-Universe）。

**Why it matters:** 证明通用工具使用值得专门的 mid-training，而不是完全留给 post-training——一个能与现有微调叠加的、低成本提升工具调用能力的杠杆。

[`🔗 arXiv 2608.20314`](https://arxiv.org/abs/2608.20314) · [`🔗 Hugging Face Papers`](https://huggingface.co/papers/2608.20314)

---

## 11. Break It Down, Pass It On——整任务 skill 反而*拖累*智能体，子任务 skill 才有帮助（arXiv 2608.20274）

- **Velocity:** ▮ steady
- **Source:** arXiv · 2608.20274 · ~4d ago
- **Tags:** `agents` `skill-transfer` `memory` `benchmark` `research`

一项关于 LLM 智能体跨任务 skill 迁移的受控研究得出一个反直觉结论：**任务级 skill 大多会把性能拖到低于无记忆基线，而子任务级 skill 平均而言能提升性能**，且基于文本的 skill 比基于代码的迁移得更好。作者提出一个结合具体性与抽象性的**"skill 效用评分"**，无需实际执行任务即可预测某个 skill 是否会迁移成功。

**Why it matters:** 直接反驳了智能体记忆设计中"记住你做过的所有事"这一直觉——有用的单位是细粒度的子任务 skill，而这个评分启发式则是一个判断"什么值得保留"的廉价过滤器。

[`🔗 arXiv 2608.20274`](https://arxiv.org/abs/2608.20274) · [`🔗 Hugging Face Papers`](https://huggingface.co/papers/2608.20274)

---

## 12. Inject, Align, Recover——将文档语料免检索地内化进模型（arXiv 2608.20281）

- **Velocity:** ▮ steady
- **Source:** arXiv · 2608.20281 · ~4d ago
- **Tags:** `post-training` `knowledge-internalization` `rag` `research`

**IAR** 框架通过三个 post-training 阶段——注入、对齐、恢复——把一份固定的文档语料转化为参数化知识，使模型直接从权重中作答而非依赖检索。在 Llama、Phi、Qwen 和 SmolLM 四个模型家族上，它报告平均 **+3.6pp 的领域 QA** 提升和 **+12.1pp 的通用基准**提升，优于持续预训练。

**Why it matters:** 对固定知识库而言，它可能是比 RAG 更便宜、延迟更低的替代方案——在训练阶段一次性内化，而不是每次查询都支付检索 + 上下文成本，且结果在四个模型家族上均可复现。

[`🔗 arXiv 2608.20281`](https://arxiv.org/abs/2608.20281) · [`🔗 Hugging Face Papers`](https://huggingface.co/papers/2608.20281)

---

## 13. CVE-2026-18963 — Keycloak 密码重置绕过漏洞让任何人都可接管任意账户（CVSS 9.1）

- **Velocity:** ▮▮▮ trending
- **Source:** NVD / Red Hat · CVSS 9.1（CNA 评定） · ~1d ago (Aug 24)
- **Tags:** `cve` `keycloak` `identity` `account-takeover` `authentication`

Red Hat 披露了 **CVE-2026-18963**——Keycloak `reset-credentials` 认证流程中的状态校验缺陷（CWE-640），使**未经认证的远程攻击者无需点击邮件中的操作链接即可重置任意用户的密码**。向重置端点发送精心构造的请求，会将会话直接推进到密码更新阶段，因此邮件令牌完全不需要；结果是任意账户（**包括管理员账户**）被完全接管。上游 Keycloak **26.7.2**（8 月 19 日）及 Red Hat Build of Keycloak 26.4 / 26.6 分支已修复；Red Hat 的临时缓解措施是在每个 realm 中禁用"忘记密码"设置。截至 8 月 24 日尚无利用或公开 PoC 的报告。

**Why it matters:** 一次未经认证的请求就能击穿一流身份提供商核心的"证明你拥有邮箱"环节——任何在内部系统前部署 Keycloak 的团队都应当把 26.7.2 当作"放下一切立即升级"的更新，而非例行补丁。

[`🔗 NVD CVE-2026-18963`](https://nvd.nist.gov/vuln/detail/CVE-2026-18963) · [`🔗 The Hacker News`](https://thehackernews.com/2026/08/critical-keycloak-password-reset-flaw.html)

---

## 14. Qwen3.8-27B — 阿里 27B Apache-2.0 开源模型"家用 Opus"，24 GB 显卡即可跑 agent 编码

- **Velocity:** ▮▮▮ trending
- **Source:** Hugging Face · Qwen3.8-27B · ~10d ago (Aug 14 release)
- **Tags:** `open-weights` `llm` `qwen` `agentic-coding` `multimodal`

阿里 Qwen 团队开源了 **Qwen3.8-27B**（Apache-2.0）：一个 27B 稠密模型（含视觉编码器为 28B），采用 **Gated-DeltaNet / 注意力**混合架构——48 层线性注意力 + 16 层全注意力——原生支持**图像与视频输入**和 **262K 上下文**（通过 YaRN 可扩展到 1M，仅托管版）。核心数据：**SWE-bench Pro 61.7**、**Terminal-Bench 2.1 73.0**，高于 Claude Opus 4.6 Max 报告的 SWE-bench Pro 53.4；4-bit 量化后（约 17 GB）即可在 24 GB 消费级显卡或笔记本上运行。发布数日内即登顶 Hugging Face trending，前三天下载量突破 300 万。

**Why it matters:** 这是"前沿级"agent 编码能力在本地可部署规模下最清晰的证据——但看待 SWE-bench Pro 的差距要谨慎：该数字是厂商自报、且使用 **Claude Code harness** 跑出来的，而 Opus 4.6 Max 的分数是其官方报告值，两者并非同条件的消融对比；独立测试还发现它比前代慢约 3 倍、更耗 token。

[`🔗 Qwen3.8-27B model card`](https://huggingface.co/Qwen/Qwen3.8-27B) · [`🔗 OrcaRouter review`](https://www.orcarouter.ai/blog/qwen-3-8-27b-review)

---

## 15. CVE-2026-76904 — GeoServer `jsonArrayContains` SQL 注入回归 CVE-2023-25158，已被积极利用（CVSS 9.8）

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub advisory GHSA-mqjf-5f49-2fjh · CVSS 9.8 · disclosed Aug 12, patched Aug 14
- **Tags:** `cve` `sql-injection` `geoserver` `postgis` `actively-exploited`

**CVE-2026-76904**（GHSA-mqjf-5f49-2fjh，CVSS 9.8）是 GeoServer 面向 PostGIS 数据存储的 OGC `jsonArrayContains` 过滤器中的未认证 SQL 注入——是 **CVE-2023-25158 的回归**（同为 9.8）。`jsonArrayContains(<column>, <pointer>, <value>)` 函数将 `<value>` 未经转义地写入生成的 SQL；通过 **WFS 1.0** 串联，可在查询顶层执行第二条 PostgreSQL 语句，若 GeoServer 以超级用户或持有 `pg_execute_server_program` 的角色连接数据库，则可升级为数据库主机上的**操作系统命令执行**。watchTowr 在披露后数小时内即观察到积极的利用尝试。已在 GeoTools 33.6 / 34.5 / 35.1（GeoServer 2.27.6 / 2.28.5 / 3.0.1）中修复。

**Why it matters:** 教科书式的回归——一个已修复的 9.8 漏洞被一个新的过滤器函数重新引入——而它落在通常面向公网暴露、用于公开地图的服务器上，且利用行为已在野外被观察到，并非理论推演。

[`🔗 GitHub advisory GHSA-mqjf-5f49-2fjh`](https://github.com/advisories/GHSA-mqjf-5f49-2fjh) · [`🔗 The Hacker News`](https://thehackernews.com/2026/08/unpatched-geoserver-zero-day-targeted.html)

---

## 16. vorssaint-utils — 一个免费 macOS 菜单栏工具集，替代十几个付费工具（日增 2.5k star）

- **Velocity:** ▮▮ rising
- **Source:** GitHub · 9.9k stars · +2,530 today (#20 daily trending)
- **Tags:** `macos` `menu-bar` `open-source` `gpl` `local-first`

**vorssaint/vorssaint-utils**（GPL-3.0）把按应用音量混音器（支持超过 100% 增益和按应用输出路由）、窗口吸附 + ⌘Tab 切换器、剪贴板历史、命令栏、防止休眠、显示器/XDR 亮度、电池/温度曲线图和 Homebrew 管理器整合进一个菜单栏图标——"无账户、无遥测、无订阅"，全部本地运行。通过 `brew install --cask vorssaint` 安装，模块化设计（只安装需要的功能），所有权限均为可选并附说明。

**Why it matters:** 一个"Raycast 遇上 Bartender"式的整合成为 GitHub 今日涨星最快的项目，其本地优先、模块化的姿态，也正是推动桌面工具去订阅化的大趋势所在。

[`🔗 vorssaint/vorssaint-utils`](https://github.com/vorssaint/vorssaint-utils) · [`🔗 Releases`](https://github.com/vorssaint/vorssaint-utils/releases)

---

## 17. ai-engineering-from-scratch — 一门 511 课、20 阶段课程，每课都交付一个可复用工件

- **Velocity:** ▮▮ rising
- **Source:** GitHub · 48k stars · #13 trending
- **Tags:** `education` `ai-engineering` `curriculum` `open-source` `mcp`

**rohitg00/ai-engineering-from-scratch**（MIT）是一套免费的 511 课 / 20 阶段 AI 工程课程（约 329 小时，覆盖 Python、TypeScript、Rust、Julia），每课都产出一个**可复用工件——prompt、skill、agent 或 MCP server**——而非纯理论。阶段从线性代数 → 经典机器学习 → 深度学习 → Transformer → LLM → 工具/协议 → agent → 群体 → 生产部署；可安装的 AI 助教 skill（`npx skills add …`）包含专门的 MCP 和 Agent Skills 路径，另附六卷合订本和免费的 Anthropic 认证备考。

**Why it matters:** 直击"84% 的人在用 AI 工具，却只有 18% 觉得能专业地使用"的鸿沟——一门围绕 agent 真正消费的工件而构建的课程，而非又一堆 notebook。

[`🔗 rohitg00/ai-engineering-from-scratch`](https://github.com/rohitg00/ai-engineering-from-scratch) · [`🔗 aiengineeringfromscratch.com`](https://aiengineeringfromscratch.com)

---

## 18. claude-obsidian — 一个本地优先的"第二大脑"，把资料归档进 Obsidian 知识图谱

- **Velocity:** ▮ steady
- **Source:** GitHub · 11.5k stars · #12 trending
- **Tags:** `obsidian` `claude-code` `agent-memory` `local-first` `knowledge-base`

**AgriciDaniel/claude-obsidian**（MIT，v2.1.0）把 Obsidian + Claude Code 变成一个自组织知识系统：丢入文件、URL 或 YouTube，15 个 skill（`wiki`、`save`、`wiki-ingest`、`wiki-query`、`wiki-lint`、`autoresearch`……）即会阅读、链接并把来源归档到你自己的纯 Markdown 中，遵循 Karpathy 的 LLM-Wiki 模式。信任是事务性的——SHA-256 哈希、进程级 vault 锁、日志化备份与冲突检测（绝不静默覆盖）——且逐条追踪来源，宁可拒绝也不编造引用。

**Why it matters:** 把 agent 记忆做成可审计、人类可拥有的 Obsidian vault，而非不透明的向量库——默认本地，embedding、OCR 与网络出口均需显式授权。

[`🔗 AgriciDaniel/claude-obsidian`](https://github.com/AgriciDaniel/claude-obsidian) · [`🔗 Releases`](https://github.com/AgriciDaniel/claude-obsidian/releases)

---

## 19. anthropics/claude-plugins-community — Anthropic 为 Claude Code 开放经过安全审查的插件市场

- **Velocity:** ▮ steady
- **Source:** GitHub · 1.2k stars · #7 trending
- **Tags:** `plugins` `claude-code` `marketplace` `anthropic` `skills`

Anthropic 发布了 **anthropics/claude-plugins-community**（Apache-2.0），这是 **Claude Cowork 与 Claude Code** 社区插件市场的只读镜像。插件在 clau.de/plugin-directory-submission 提交，需通过自动化安全扫描后方可分发；`marketplace.json` 列表每晚从 Anthropic 内部审查管线同步。用 `claude plugin marketplace add anthropics/claude-plugins-community` 安装，再 `claude plugin install <name>@claude-community`——当前插件包括 `eli5`、`quickdesign`、`testdino` 和 `tres-finance-plugin`。

**Why it matters:** 为第三方 Claude Code 扩展提供了一个经审查的分发渠道——这是 skills 生态一直缺失的"应用商店"层，也是一个重要的信任边界，因为每个插件都在你的开发环境里运行。

[`🔗 anthropics/claude-plugins-community`](https://github.com/anthropics/claude-plugins-community) · [`🔗 Claude plugins`](https://claude.com/plugins)

---

## 20. Daedalus-150M — 一个为 CPU 推理设计的卷积-注意力混合模型（arXiv 2608.20210）

- **Velocity:** ▮ steady
- **Source:** arXiv · 2608.20210 · ~1d ago
- **Tags:** `research` `efficient-models` `cpu-inference` `quantization` `small-models`

**Daedalus-150M**（arXiv 2608.20210）是一个为 CPU 推理而生的 1.5 亿参数语言模型：18 个 block 中只有 6 个使用全注意力，其余 12 个使用"记忆宽度仅两个时间步"的短卷积，因此三分之二的网络从不重读不断增长的缓存。从零开始用 59.9B token 训练、4-bit 权重，在预注册的五任务基准上（47.31 vs 42.20 及格线）击败 GPT-2 124M、Pythia-160M、OPT-125M 和 MobileLLM-125M——尽管后者们见过 3×–1000× 更多的数据——且在 2K 上下文下比同规模全注意力对照组解码快 1.76×。

**Why it matters:** 一项受控实验证明，长上下文 LLM 的主要内存成本 KV-cache 在 CPU/边缘层级可以被大幅设计掉，且该消融（相同数据、相同规模）真正隔离了架构的作用。

[`🔗 arXiv 2608.20210`](https://arxiv.org/abs/2608.20210) · [`🔗 Hugging Face Papers`](https://huggingface.co/papers/2608.20210)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-08-24T12:03:00Z |
| Items | 20 |
| Sources tracked | 16 (Hacker News, Tom's Hardware, Risky.biz, Kaspersky, The Hacker News, GitHub, AWS, InfoQ, NVD, VulnCheck, arXiv, Hugging Face, gentic.news, OrcaRouter, aiengineeringfromscratch.com, Claude.com) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[前一天](../2026-08-23/) · [Raw .md](../2026-08-24.md) · [归档](../../archive/)
