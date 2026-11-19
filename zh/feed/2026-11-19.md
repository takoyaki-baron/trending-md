---
date: 2026-11-19
updated: 2026-11-19T12:26:14Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 46
license: CC-BY-4.0
---

# trending.md — 2026-11-19

## 1. NGINX 两个未认证 RCE 今日披露——五个研究团队各自独立发现了同一批漏洞

- **Velocity:** ▮▮▮ trending
- **Source:** Wiz Research · 677+ pts on HN · ~5h ago (~23:19 UTC+8)
- **Tags:** `nginx` `rce` `http2` `vulnerability` `f5`

F5 今日发布 NGINX 协同安全更新，修复**两个可未认证远程代码执行的严重漏洞** CVE-2026-123633 与 CVE-2026-123007，均为 **CVSS 4.0 9.2 Critical**（旧 3.1 标度下 8.1 High——分数是 F5 自己评的，检查时 NVD 上两条记录仍为 `Received` 状态）。**Wiz Research、Ikotas Labs、Metnir、Rapid7 与 Xint 各自独立发现了这两个漏洞**并分别上报。CVE-2026-123633 是 worker 进程中的 use-after-free，触发条件是 NGINX 以 HTTP/2 接收客户端流量并代理到后端、同时 `worker_connections` 接近耗尽——Wiz 于 10 月 21 日上报，附确认 RCE 与 ASLR 绕过，且按披露时间线，"F5 confirms that another research team had previously reported the same vulnerability"（F5 确认另一个研究团队此前已上报同一漏洞）。CVE-2026-123007 是 HTTP/2 流控窗口超过允许阈值导致的堆溢出，且"affects versions dating back to NGINX 1.9.5 in 2015"（影响可追溯到 2015 年的 NGINX 1.9.5）——也就是引入 HTTP/2 的那个版本。修复版本：**1.30.7 stable 与 1.31.9 mainline**（OSS；F5 公告表格覆盖 Plus R33–R37 各线）。无法立即升级的话，Wiz 建议在受影响的 NGINX 实例上"temporarily disable HTTP/2"——在 1.25.1+ 的相关 server 块中设 `http2 off;`。

**Why it matters:** NGINX 服务着"more than 225 million websites"（超过 2.25 亿网站），而两个漏洞都在代理层——即便应用代码本身安全，站点也可能暴露。故事另一半是五家团队的独立撞车：同一条内存安全缝隙被五拨人同时拉扯，这正是 10 月 21 日到今天补丁之间那个窗口在赛跑的原因。

> Xint 的配套文章标题就是它演示的内容：NGINX2Root——从 NGINX 访客到服务器主机 root（英/韩/日三语）。

[`🔗 Wiz：NGINX 未认证 RCE（CVE-2026-123633/-123007）`](https://www.wiz.io/blog/nginx-http2-rce-vulnerabilities) · [`🔗 Xint：NGINX2Root 技术文章`](https://nginx2root.com/) · [`🔗 NVD：CVE-2026-123633`](https://www.cve.org/CVERecord?id=CVE-2026-123633) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50547374)

---

## 2. Genie 4 在 Project Genie 中开放——会话中途改世界，实时原生音频

- **Velocity:** ▮▮▮ trending
- **Source:** Google DeepMind · 74+ pts on HN · ~1.3h ago (~02:49 UTC+8)
- **Tags:** `google-deepmind` `world-models` `genie-4` `generative-ai`

Google 面向 AI Ultra 订阅者推出全新 Project Genie 体验，首次开放 **Genie 4**——"our most realistic and interactive world model yet"（迄今最逼真、可交互性最强的世界模型），主打能力是"you can now prompt mid-session to change the world you created"（会话中途下提示词即可改变你创建的世界）：换天气、加角色、改走向，全程在浏览器里探索。Genie 4 还首次为画面配上"real-time native audio that adapts as the scene unfolds"（随场景展开而自适应的实时原生音频）。Genie 3 保留在模型选择器中，用于更长行程与全景种子空间，并同步升级：**单次生成会话延长到 3 分钟（原为 60 秒）、世界链接（world chaining）、360° 全景图像落地、实时世界内事件**。新的 Project Genie agent 以对话方式编排 Google 的多模态模型，Gemini 模型还会在会话内随行、弹出上下文感知的建议卡片。社区画廊同步上线，收录策展与用户自建世界供混搭再创作。官方对天花板很坦诚：这些"remain world models in the frontier research space"（仍属前沿研究领域的世界模型），团队"actively tackling key challenges such as camera latency, intricate physical interactions, real-time audio precision, and long-term scene permanence"（正攻克相机延迟、复杂物理交互、实时音频精度、长期场景持久性等关键挑战）。

**Why it matters:** 世界模型刚从研究演示跨入带编辑、音频与分享的消费级产品面——交互媒体的含义才是重点，而官方点名的挑战清单（持久性、延迟、物理）恰好标出了研究前沿现在的位置。

[`🔗 Google：Genie 4 现已可用（Project Genie）`](https://blog.google/innovation-and-ai/models-and-research/google-deepmind/genie-4-now-available-project-genie/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50550415)

---

## 3. Inside Deutsche Bank：1500 万份泄露文件，摊开二十年被无视的合规警报

- **Velocity:** ▮▮▮ trending
- **Source:** FT 主导的媒体联盟 · 352+ pts on HN · ~4.5h ago (~23:38 UTC+8)
- **Tags:** `deutsche-bank` `data-leak` `investigation` `compliance`

大型跨国调查今日上线，项目名为 **Inside Deutsche Bank**，基于**超过 1500 万份泄露的内部文件**——项目自己的定性："The leak of 15+ million files lays bare the bank's flawed culture, systemic blind spots and pursuit of profit over compliance"（1500 多万份文件揭开了这家银行有缺陷的文化、系统性盲区，以及利润置于合规之上的追逐）。文件横跨约二十年里银行最敏感的职能：反金融犯罪、制裁监控、内部审计，以及决定高风险客户去留的部门。发布伙伴包括 FT、纽约时报、Dawn、Malaysiakini、IrpiMedia、elDiario.es 与 Follow The Money。已发表的发现包括：与在逃的刘特佐相关的至少 24 笔、合计 1.7298 亿欧元的交易；银行在为制裁做准备时被引用的内部警告——"As you know we have a large Russian Oligarchs client population"（如你所知，我们有一大批俄罗斯寡头客户）；一家与 Orbán 关联的匈牙利银行被指为数十亿欧元洗钱计划提供平台，而德银经手了其中的付款；以及违反银行自身内部政策的军火贸易融资。德国政府要求透明度，分析人士预计会有新的监管调查。

**Why it matters:** 这是 Panama/Paradise Papers 时代以来最大的金融业文件泄露，而且重心不同——不是藏匿的离岸财富，而是一家全球系统重要性银行在纸面上突破自身控制、追逐利润的合规机器本身。监管、诉讼，以及（鉴于德银是所有人的代理行）交易对手的连锁反应，预计会以季度为单位持续。

[`🔗 Inside Deutsche Bank（项目枢纽）`](https://www.inside-db.com/) · [`🔗 FT：Leak of 15mn Deutsche Bank files exposes systemic failures`](https://www.ft.com/content/df518845-ed97-4a38-8a38-7fa9d4d24003) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50547620)

---

## 4. All About Berlin 流量 −75%：Google AI 答案的第一人称账本

- **Velocity:** ▮▮ rising
- **Source:** nicolasbouliane.com · 723+ pts on HN · ~13h ago (~14:47 UTC+8)
- **Tags:** `seo` `google` `ai-overviews` `web-publishing`

今天 HN 最热的帖子是 Nicolas Bouliane 谈他自 2017 年运营（2020 年起全职）的 **All About Berlin**——柏林移民局自己都在向公众推荐的那个网站，如今流量因 Google AI Overviews 损失了 75%（帖子带更新，最初数字是 70%）。"When you Googled something, you used to get a link to my website. Now you get a page of ads, then an AI-generated answer trained on my content, then finally a link to my website."（过去你搜东西会得到指向我网站的链接；现在你先看到一页广告，再看到一篇用我的内容训练出来的 AI 答案，最后才轮到我网站的链接。）帖子复热的引信是它所指的 Google 公告——上周 Google 宣布 AI 生成的答案将完全取代搜索结果，而且答案里会带广告。Bouliane 清点了独立网站的去向：有的加了付费墙，有的"keep the websites online, but they no longer update them. It's just not worth it."（网站还挂着，但不再更新——实在不值得了。）这是昨天那条新闻的第一人称续篇：随机试验把总体的点击损失钉在 40% 附近，这一篇则让你从内部看清一个被波及的网站。

**Why it matters:** 40% 那个数字告诉你转移的规模；这一篇告诉你伤亡的形状。当人们实际使用的参考基础设施——政府办公室会把移民指过去的那个网站——被吞进用它的内容训练出的答案里，问题就不再是 SEO，而是：谁还在资助和维护答案所依赖的一手信源。

[`🔗 AI is killing All About Berlin（长文）`](https://nicolasbouliane.com/blog/death-by-ai) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50542705)

---

## 5. 续昨日 MAI Code 2 报道：Ignite 全家桶是七款模型——外加一颗芯片

- **Velocity:** ▮▮ rising
- **Source:** Microsoft AI · 298+ pts on HN · ~4h ago (~00:08 UTC+8)
- **Tags:** `microsoft` `mai` `ignite-2026` `model-lineup`

昨天我们报道了微软 Ignite 上的 MAI Code 2 与 Code 2 Flash；完整公告是**七款模型的家族外加微软第二代加速器**。最大胆的新主张来自安全线：微软称 **"MAI Cyber 2 Flash beats GPT-6 Astra's quality at less than 2% of the cost per task on the CyberGym-E2E benchmark"**（MAI Cyber 2 Flash 在 CyberGym-E2E 基准上以不到 2% 的单任务成本达到 GPT-6 Astra 的质量）。其余产品线全部是微软自己的对比：Code 2 达到"98% of the coding quality of GPT-6.1 Sol at about 40% of the price"（以约四成价格达到 GPT-6.1 Sol 编码质量的 98%），对 Opus 5.5 则是"96% performance for just 5% of the price"；Code 2 Flash "matches the performance of GPT-6 Luna at 65% of the price, and Haiku 5.5 at 20%"；Image 2.5 以 GPT Image 2.5 Sunburst (max) 五分之一的价格拿下"#1 on Artificial Analysis image editing"；Realtime 1 "outperforms GPT-Realtime 2.1"，每音频分钟 $0.01 起；Transcribe 2（Dragon Copilot Transcribe 背后的模型）"already powers 10 million patient encounters a month"；Decision 1.1 则是"50x faster and 79x cheaper than GPT-6.1 Sol"。**Maia 200** 第二代 AI 加速器"is now in production running our largest models, achieving 1.7x more tokens per watt"。

**Why it matters:** 昨天的教训依然成立：这些都是厂商自选工作点上的自家基准行，"单任务成本"的框架应读作营销论点而非独立测量。相对昨天报道真正新增的是阵容形状——微软一次拿出决策模型、实时语音模型、安全智能体模型和自研训练硅片，这是直指企业 token 开支的全栈叫卖。

[`🔗 Microsoft AI：Seven new models at scalable price-performance`](https://microsoft.ai/news/microsoft-ignite-2026/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50548021)

---

## 6. KPMG 用 100+ 个 AI agent 并行跑完整场 FTSE 250 审计——并称 agent 问出了更好的问题

- **Velocity:** ▮▮ rising
- **Source:** Financial Times · 160+ pts on HN · ~4.3h ago (~23:49 UTC+8)
- **Tags:** `kpmg` `ai-agents` `audit` `enterprise-ai`

FT 报道 KPMG 英国审计试点：**超过 100 个 AI agent** 与传统人工审计**并行**执行了对一家 FTSE 250 上市公司的完整审计。KPMG 英国审计主管 Cath Burnet 表示，agent 在多个实例中问出了更好的问题、挖得比人类团队更深。公司的框架仍把判断权留给人——最终签署仍由人完成，KPMG 希望未来向客户交付 AI 审计。推广比试点更广：Bloomberg Tax 报道数以百计的 KPMG 审计团队正在忙季前实测先进 AI agent，从私人公司客户起步；美国分部已上线 **KPMG Clara Intelligence**——AI 驱动、"human-assured"（人类把关）的审计平台。

**Why it matters:** 审计是对 agent 主张的完美对抗测试——工作产物有监管方核对，问题本身就是产品，而这里是事务所自己在报告：在真实委托上，它的 agent 问得比自己员工更好。这也是本月第二个专业服务领域里诚实的发现不是"AI 能干完活"，而是"AI 移动了瓶颈"——签字的仍是人，只是他们审的东西从机器浅层变成了机器深层。

[`🔗 FT：AI asked 'better questions' than KPMG accountants in pilot audit`](https://www.ft.com/content/5168b3e9-75d0-4be0-9ccd-d327d6b16c05) · [`🔗 KPMG：Clara Intelligence 美国上线`](https://kpmg.com/us/en/media/news/kpmg-unveils-next-era-of-ai-enabled-human-assured-audit-with-us-launch-of-kpmg-clara-intelligence.html) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50547777)

---

## 7. OpenAI 详述模型写进 Jalapeño 的 RTL——以及它称之为"五个月走完一年"的 AMD 合作

- **Velocity:** ▮▮ rising
- **Source:** OpenAI · 61+ pts on HN · ~2.3h ago (~01:45 UTC+8)
- **Tags:** `openai` `chip-design` `amd` `risc-v` `eda`

OpenAI 的研究长文深入讲了它的模型对其首款自研推理芯片 **Jalapeño** 到底做了什么：模型提议的 RTL 改动把向量单元标准单元面积削减约 13%、矩阵单元约 10%，且 OpenAI 称这些优化"were silicon proven during Jalapeño's silicon bring-up"（已在 Jalapeño 硅片启动阶段得到硅验证）。具体例子：一次乘法器重设计省约 15% 单元面积，同时把延迟从两个周期降到一；一次加法器重设计省约 15% 面积并保持原有延迟。AMD 方面，OpenAI 称拿到"up to 14% improvement relative to heavily optimized baselines on the flagship GPU IP"（相对深度优化的基线，在旗舰 GPU IP 上最多 14% 提升），并把这次合作定性为"roughly a year of progress achieved in less than 5 months"（不到五个月取得约一年的进展）——还声称"AMD has already included some of these changes in a recent design it sent for manufacturing"（AMD 已把其中部分改动纳入近期送制造的设计），外加 AMD 在下一代旗舰 CPU 关键模块上验证的个位数百分比 PPA 增益。帖子还宣布与 **Synopsys** 合作（"to ground capability development in trusted evaluators"——把能力发展扎根于可信评估器），以及从规格说明出发设计 **RISC-V** 核心的结果。

**Why it matters:** 若"硅验证"成立，这是 LLM 参与 RTL 首次公开出现在某次流片中——有意义的单位不是"AI 设计芯片"，而是"AI 在人类团队已经榨干的模块里找到 PPA 赢面"。诚实的注意事项就在句子本身：AMD 对比的是*深度优化过的*基线，"up to 14%"是上限不是均值。

[`🔗 OpenAI：Advancing chip design with OpenAI models`](https://openai.com/index/advancing-chip-design-with-our-models/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50549493)

---

## 8. Cursor 插件规范冲上 trending，17k 星——官方插件加一条实时运转的第三方合并流水线

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · +315★ today · 最近 PR 合并 ~7.8h ago (~20:24 UTC+8)
- **Tags:** `cursor` `plugins` `agent-skills` `spec`

`cursor/plugins`——**Cursor 插件规范与官方插件**仓库——正以 **17,149 星**（今日 +315） riding trending，提交记录说明了原因：第三方插件流水线正高速运转，今日合并新增 Hospitable 插件（PR #1269）、Fiscal AI（#1275）、CreateOS（#1262）与 LMTY。每个插件都是"根目录下的独立目录，自带 `.cursor-plugin/plugin.json` 清单"。官方集合包括 `create-plugin`（脚手架与校验新插件）、`teaching`（技能映射与练习计划）、`continual-learning`（为 AGENTS.md 做增量、由转录驱动的记忆更新）、`agent-compatibility`，以及两个立场鲜明的：`thermos`——"Thermo-nuclear branch review: deep security/correctness audits, harsh code-quality rubrics, parallel subagents"（热核级分支评审：深度安全/正确性审计、严苛代码质量评分、并行子智能体）——和 `ralph-loop`，"Iterative self-referential AI loops using the Ralph Wiggum technique"（用 Ralph Wiggum 技巧的迭代式自指 AI 循环）。

**Why it matters:** 这是 agent-skills 浪潮第一次被大型 IDE 厂商收编为一方包装——社区发明的模式（Ralph 循环、激进分支评审评分）正被策展进带清单规范与开放 PR 流水线的官方目录。技能标准最终在哪家收敛还不确定，但这类清单正是正在成形的接口。

[`🔗 cursor/plugins（规范 + 官方插件）`](https://github.com/cursor/plugins) · [`🔗 插件目录 README`](https://github.com/cursor/plugins/blob/main/README.md)

---

## 9. CISA KEV 新增四条——其中三条附带三天联邦期限，一条是七个月前的 LiteLLM RCE

- **Velocity:** ▮▮ rising
- **Source:** CISA KEV catalog 2026.11.18 · 今日目录刷新
- **Tags:** `kev` `cisa` `litellm` `synology` `vulnerability-management`

今日 KEV 刷新新增四条在野利用记录，其中三条的联邦期限异常短（截止 **2026-11-21**）：**Synology DiskStation Manager CVE-2024-10441**（CVSS 9.8，系统插件守护进程输出转义不当——2025 年的 DSM 构建就已修复，因此今天的 KEV 收录实质上是在说：还有多少 NAS 固件没打补丁）；**REDCap CVE-2026-90817**（医院与高校运行的 Vanderbilt 科研数据平台代码注入）；以及 **Apache Axis CVE-2026-90436**（早已 EOL 的 Java SOAP 栈上的不安全反射）。第四条是 **BerriAI LiteLLM CVE-2026-40217**（CVSS 8.8，期限 2026-12-02）：按 NVD 记录，"LiteLLM through 2026-04-08 allows remote attackers to execute arbitrary code via bytecode rewriting at the /guardrails/test_custom_code URI"——guardrails 这个会执行用户代码的功能，成了被利用路径。底层漏洞自春季已公开（X41 D-Sec 公告；Red Hat 已发勘误），所以今天的 KEV 收录是利用潮追上了披露。

**Why it matters:** 三天联邦整改窗口是紧急信号——DSM 与 REDCap 的修复-隔离决策等不了变更窗口。而对所有把 LiteLLM 当共享 AI 基础设施跑的人：被利用的端点就在 guardrails 功能里，恰恰是团队因为它"会执行代码"才加上的那块。

[`🔗 CISA KEV 目录（JSON）`](https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json) · [`🔗 NVD：CVE-2026-40217`](https://www.cve.org/CVERecord?id=CVE-2026-40217) · [`🔗 X41 D-Sec：LiteLLM 公告`](https://www.x41-dsec.de/lab/advisories/x41-2026-001-litellm/)

---

## 10. CLI-Anything 再登 trending——59.5k 星，九月后零提交，外加一个注册表面孔

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · +384★ today
- **Tags:** `cli` `agents` `hkuds` `skill-registry`

HKUDS 的 **CLI-Anything**（"CLI-Anything: Making ALL Software Agent-Native"）以今日 **+384 星**重回 GitHub trending，总量 **59,594**——诚实部分先行：仓库本体**自 9 月 22 日起零提交**。活跃在外一层：**CLI-Hub**（cliany.cc），该项目前挂的 agent 友好 CLI 注册表："Any software. Any codebase. Any Web API. Generate an agent-native CLI and let AI agents operate it — install with a single command."（任何软件、任何代码库、任何 Web API——生成一个 agent 原生 CLI，让 AI agent 操作它，一条命令安装。）安装路径是 SKILL.md 原生——`npx skills add HKUDS/CLI-Anything --skill cli-hub-meta-skill -g -y`——外加 pip 包（`cli-anything-hub`）暴露 `cli-hub list/search/install/info`，站点列出与 OpenClaw、Nanobot、Claude Code、Codex、Antigravity 的兼容。这就是两天前 stitch-skills 的形状：休眠的一方仓库被周围的 agent 工具浪潮托起。

**Why it matters:** 这里有趣的单位不是星数——是注册表模式。如果 agent 按任务而非按工具发现并安装 CLI 包装器，"agent 能驱动的软件"的分布就变成一份策展索引，而 HKUDS 押的是：索引本身才是产品。

[`🔗 HKUDS/CLI-Anything`](https://github.com/HKUDS/CLI-Anything) · [`🔗 CLI-Hub 注册表`](https://cliany.cc/)

---

## 11. 一条 KVM INIT 模拟修复当天落地为 CVE 记录——嵌套 SVM 的过期 MMU 上下文

- **Velocity:** ▮ steady
- **Source:** cve.org · 141+ pts on HN · ~4h ago (~00:06 UTC+8)
- **Tags:** `kvm` `linux-kernel` `virtualization` `nested-virtualization`

CVE-2026-99312 就是内核自己的修复，记录原文："KVM: x86: Unconditionally reset MMU context when emulating INIT."（模拟 INIT 时无条件重置 MMU 上下文。）漏洞：当 INIT 在嵌套客户机（L2）以关闭分页状态运行时到达，KVM 可能让 L1 继续跑在过期的 MMU 上下文里——按记录原文，"the MMU page role includes guest_mode (L2), i.e. an INIT while L2 is running with CR0.PG=0 will result in KVM running L1 with a stale MMU context"（MMU 页角色包含 guest_mode (L2)，即 L2 在 CR0.PG=0 下运行时收到 INIT，KVM 会让 L1 跑在过期的 MMU 上下文里）。提交自己把范围讲清楚了：本可把重置收窄到分页/L2 场景，但 SMM 也编码在页角色里，而无条件重置很便宜，因为角色不变时 KVM 会省掉大部分重配置。描述结尾给出爆炸半径："this bug only affects nested SVM as INIT is an unconditional intercept on VMX"（仅影响嵌套 SVM，因为 VMX 上 INIT 是无条件拦截）。记录引用了四个 stable 树提交，NVD 记录本身于今晨 UTC 发布（09:17Z，仍为 `Received`）。

**Why it matters:** HN 帖子（84 条评论）大部分火力都打在元问题上——一个冷门的嵌套虚拟化正确性修复凭什么带 CVE 号。这就是现代注册表现实：内核自修复现在默认领号，CVE 数字在有人分析前不带任何严重度信号。对跑嵌套 SVM 客户机的人来说，它仍是一条"应该打"的补丁。

[`🔗 CVE-2026-99312（cve.org）`](https://www.cve.org/CVERecord?id=CVE-2026-99312) · [`🔗 Stable 树修复提交`](https://git.kernel.org/stable/c/24f644ea26c2ebb7b14c3baa2aa92d37fde3095f) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50548004)

---

## 12. 《同行评审能在 AI 生成文本中幸存吗？》——美联储经济学家与 Fernández-Villaverde 提议把 AI 撰写的审稿报告按抄袭处理

- **Velocity:** ▮ steady
- **Source:** UPenn / Federal Reserve Board · 63+ pts on HN · ~6.2h ago (~21:51 UTC+8)
- **Tags:** `peer-review` `ai-detection` `economics` `research-integrity`

**Dario Caldara**（美联储理事会）与 **Jesús Fernández-Villaverde**（UPenn、CEPR、NBER）11 月 16 日的新论文主张：除非经济学界立刻为 AI 生成文本建立规范，否则"peer review is in serious danger of collapsing"（同行评审面临严重崩溃危险）。他们的实验：AI 检测器能标记由 LLM **撰写**的审稿报告，而 AI 仅校对或协助编辑的报告则不会——他们的政策正建立在这一区分上。提案很尖锐：检测器成为标准工具；被标记论文进入更严格的阅读、犯第一个事实错误即可拒稿；最重的一句是——"an AI-generated referee report adds nothing that editors could not get by running the prompt themselves"（AI 生成的审稿报告不会增加任何编辑自己跑一遍提示词得不到的东西），所以 AI 撰写的审稿"should be treated like plagiarism"（应按抄袭处理）。论文以面向作者、审稿人、编辑的实操指南收尾，其披露脚注自陈写作过程使用了 LLM。

**Why it matters:** 这是结构性论证而非道德恐慌：审稿人的比较优势是稀缺的专注注意力，而这正是 LLM 商品化的东西。检测实验的发现——"撰写"与"编辑"可以干净区分——意义超出经济学：它意味着执法可以瞄准造假案例，而不必把每一次语法润色都入罪。

[`🔗 论文（PDF，UPenn）`](https://www.sas.upenn.edu/~jesusfv/Peer_Review.pdf) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50546312)

---

## 13. Show HN：Mastra Factory——上周合并了 238 个 PR 的 agent 看板

- **Velocity:** ▮ steady
- **Source:** Show HN · 34+ pts · ~3.2h ago (~00:53 UTC+8)
- **Tags:** `mastra` `agents` `ci` `open-source`

Mastra 团队（Shane、Sam、Abhi）在框架发布两年后重回 Show HN，带来他们维护 Mastra 本身的工具：**Mastra Factory**，"a configurable agentic kanban board that's @-taggable in Slack"（可配置的 agentic 看板，可在 Slack 里 @），构建于 Mastra 的持久化 agent 之上以支撑长会话。规模数字就是卖点：Mastra 现在平均"nearly 4M downloads per week"（每周近 400 万次下载），而**"Last week, Factory opened and merged 238 PRs, alongside 630 merged PRs from humans"**（上周 Factory 开启并合并 238 个 PR，同时人类合并了 630 个）——跨 mastra-ai 组织，agent 完成的工作占全部合并 PR 的 238/868，约 27%，相当于人类速率的近四成。

**Why it matters:** 继昨天 StarSling 发布（CI 开优化 PR，因为"agent 写代码比 CI 检查还快"）之后，这是同一论点的维护者侧版本：瓶颈不再是写改动，而是护送改动，于是团队开始建工厂——agent 端到端持有工单，人类只在合并处评审。238 对 630 这个比例，是真实周下载 400 万项目上 agent 占比的首批具体数据点之一。

[`🔗 Show HN：Mastra Factory（HN）`](https://news.ycombinator.com/item?id=50548660) · [`🔗 Mastra`](https://mastra.ai)

---

## 14. 把旅行者 1 号拆到单颗内存芯片

- **Velocity:** ▮ steady
- **Source:** Show HN · 85+ pts · ~3.9h ago (~00:18 UTC+8)
- **Tags:** `voyager` `interactive` `space` `visualization`

Raj Shekhar 做了两个 1977 年旅行者号探测器的交互拆解："Two spacecraft launched in 1977, still talking to Earth from interstellar space. This is where they are right now."（1977 年发射的两艘航天器，仍在从星际空间与地球通话。这就是它们此刻的位置。）你可以逐舱打开（按键 1–10 逐个舱段），下钻到单个模块与芯片，旋转缩放每个组件，并观看从发射到今日星际位置的全程。整个作品键盘驱动、自包含——为距离最远的人类造物而建的浏览器原生技术文档。

**Why it matters:** 这是 agent 辅助手艺落地好的样子：一个人、周末级项目，和过去属于 JPL 自家媒体团队的可探索细节密度。它同时是一次小小的保存行为——最远人造工程的知识，变得可导航了。

[`🔗 Voyager（交互拆解）`](https://rshekhar.com/voyager/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50548161)

---

## 15. HUMAN.md——以配置文件格式写成的工作宣言

- **Velocity:** ▮ steady
- **Source:** human-md.ai · 118+ pts on HN · ~23h ago (~04:47 UTC+8，昨日)
- **Tags:** `essay` `human-skills` `ai-era` `craft`

Briana (Mazzio) May 的文章本身是个文件："HUMAN.md > a working manifesto. notes-to-self, mostly. > not a thinkpiece. not a thread. not a deck."（HUMAN.md > 一份工作宣言。多半是写给自己的便条。> 不是评论文章。不是推串。不是幻灯片。）格式之下的论点：taste（品味）是人类仍有贡献的说法里错的那一个——"Taste is the surface. There is a whole engine underneath it, and that engine is the part the model can't have."（品味是表面。底下有一整台引擎，而那台引擎是模型拿不到的部分。）编号章节全是手艺教义——"break the rule on purpose"（故意破规矩，附则："If you can't say why you broke it, you didn't break it, you just missed"——说不出为什么破，你就不是破，是失手），"find the thing in the weird place"（在怪地方找东西：灵感住在"一张印错的停车罚单"、"一台冷门的维多利亚西洋镜猫"里），还有更多。格式本身就是论点：一个人以我们如今描述 agent 的方式描述自己。

**Why it matters:** "No AI Slop: A Manifesto"之后几天，人类侧的回应以 agent 读取的原生格式抵达——这个倒置就是论证本身。当你的价值在于对模型输出的判断，把你的操作原则写成 markdown 规范，正是把它们交给一位恰好是机器的队友的方式。

[`🔗 HUMAN.md`](https://www.human-md.ai/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50537962)

---

## 16. 苏格兰 HTTP 状态码——418 茶壶传统多了一种盖尔语方言

- **Velocity:** ▮ steady
- **Source:** underwood.network · 130+ pts on HN · ~1.6h ago (~03:26 UTC+8)
- **Tags:** `http` `humor` `standards` `web-culture`

一张以苏格兰语呈现的 HTTP 状态码表，延续 RFC 2324 与上周真实存在的"I'm Not a Freezer"互联网草案的伟大传统。全谱系都在：`403 GET TAE FUCK`、`404 NAE FUCKIN HERE, PAL`、`500 AH'VE FUCKED IT`、`503 WE'RE FUCKIN SHUT`，以及必然在列的 `418 AH'M A FUCKIN TEAPOT`。全页最锋利的是 451——"THE COUNCIL SAYS NAW"（委员会说不行）——按历史，这恰恰就是 451 的本义。

**Why it matters:** 纯文化条目，归档在如下观察之下：HTTP 状态码幽默跟踪行业情绪——冷冻箱草案之所以变真，是因为冷冻箱真的被攻击了；而这张苏格兰表的魅力在于，每一行都比多数生产 API 发回的错误信息更诚实。

[`🔗 Scottish HTTP Codes`](https://underwood.network/http/scots.html) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50550062)

---

## 17. 加州下令 Waymo 不得驶入州属高速——"迫在眉睫的危险"认定，随后全国高速停运

- **Velocity:** ▮ steady
- **Source:** ABC7 / AP · 63+ pts on HN · ~22h ago (~10:00 UTC+8，昨日)
- **Tags:** `waymo` `autonomous-vehicles` `regulation` `california`

加州 DMV 已下令 Waymo 自动驾驶车辆不得在州属高速运营，依据是一项对公共安全构成迫在眉睫危险（imminent hazard to public safety）的认定，导火索是一连串事故——包括三辆 Waymo 车辆驶入 Burlingame 附近 101 号公路一处正在施工的区域。Waymo 的回应超出了合规要求：它**在全国范围暂停高速运营**以处理安全认定，这是这家美国最大 robotaxi 运营商首次在全国尺度收回自己的招牌高速能力。

**Why it matters:** 这里的监管工具才是重点——加州没有立新规，而是针对特定运营商的运行设计域（ODD）动用了既有的"迫在眉睫危险"权力，而运营商的应对是不与认定对抗、全国范围内单方面收缩。对所有观望的 AV 公司：你花多年挣来的高速 ODD，一个新闻周期就能被收回，而商业理性下的回应是主动撤退。

[`🔗 ABC7：CA DMV bans Waymos from operating on state freeways`](https://abc7news.com/story/california-dmv-bans-waymos-operating-state-freeways-bay-area-traffic-incidents/20046974) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50538841)

---

## 18. Gemini 4 Neon 发布：Google 中间档模型摸到前沿——Intelligence Index 第 3，$3/$15 定价

- **Velocity:** ▮▮▮ trending
- **Source:** Google · 557+ pts on HN · ~6.6h ago (~05:34 UTC+8)
- **Tags:** `gemini` `google` `model-release` `coding-agents`

Google 发布 **Gemini 4 Neon**——Gemini 4 家族的中间档，介于 Carbon（"your hardest, long-horizon projects"，最难的长时程项目）与 Hydrogen（"fast everyday execution"，快速日常执行，11 月 13 日单独发布）之间。核心成绩：**Artificial Analysis Intelligence Index xhigh 思考档位总分 61、整体第 3**（"landing just behind larger, slower models"，仅落后于更大更慢的模型）、"#1 overall on the Artificial Analysis Coding Agent Index (58.6)"、Terminal-Bench 4.1 得分 65.2%、Vals Index 第 2（70.9%，"on the Pareto frontier"，处于帕累托前沿），并以 1336 分在 Arena 新的 Agent Arena Index 上首秀即第 2（覆盖 4,200+ 真实 agent 会话）。定价：**每百万输入 token $3、输出 $15**（缓存输入 $0.15/M，"a 95% discount"，95% 折扣），上下文窗口 100 万 token。Google 声称默认 high 档位下"32% lower cost per task than Carbon"，在 Vals 与 Agent Arena 帕累托前沿上"roughly 50% to 80% lower cost per task than top competing frontier models"（比顶级竞争前沿模型的单任务成本低约 50%–80%）。博客再次诚实披露了 harness 效应：SWE-sweep 上 Neon "already leads on the mini-SWE harness (12.8%) and more than triples to a state-of-the-art 39.0% in Google Antigravity showing what the Antigravity harness unlocks"（mini-SWE harness 上 12.8%，Antigravity 中翻三倍多到 39.0%）。"Gemini 4 Neon for cyber" 变体——SEC-bench Pro（90.5%）与 WebExploitBench v1.2（51.26%）均为 SOTA——将通过 Fairwind Program 在"in the coming days"开放给可信防御者，Gemini 应用中的 Tasks 现在也可跑在 Neon 上。安全数据异常具体：Terminal-Bench 4.0 作弊率 0.0%（与 Carbon 持平）、走捷径率仅 2.45%（"the lowest rate of any Gemini 4 model"，Gemini 4 系列最低），最高思考档位开启实时防护时"Neon resisted every attack within this Gray Swan benchmark"（Gray Swan 提示注入基准全部攻击被抵御）。

**Why it matters:** 就在微软 Ignite 七模型发布数小时后，这是性价比之战的另一只靴子——Google 用自己的基准行数正面回应"中间档价格、前沿质量"的同一论题。读法也一样：厂商自选的运行点。Google 自己印出来的 12.8%→39.0% harness 差距就是提醒：这些分数衡量的是模型+ harness——本 feed 反复重学的正是这一课（见第 5 条的脚注纪律）。

[`🔗 Google：Introducing Gemini 4 Neon`](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-neon/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50552424)

---

## 19. 《We Need Smart People Who Give a Shit》——宕机连环潮有了它的"人力资本"随笔

- **Velocity:** ▮▮▮ trending
- **Source:** violetpixel.com · 312+ pts on HN · ~4.3h ago (~07:53 UTC+8)
- **Tags:** `essay` `infrastructure` `outages` `ops`

Justin Michael 的随笔论点是"the world is held together by smart people who give a shit"（世界是靠真正在乎的聪明人撑起来的）——像 ACH 这样的系统之所以能在"old, riddled with flaws, and encumbered with legacy baggage"（老旧、满是缺陷、背着历史包袱）的状态下存活，是因为有一层很薄的人同时具备"intimate knowledge of the system"（对系统的切肤了解）与"the drive and determination to force the system to work"（逼系统运转下去的决心）。"Take those people away, and the systems collapse. And collapse is what we're starting to see."（把这些人拿走，系统就会崩塌。而我们已经开始看到崩塌。）证据清单就是这一周本身：Microsoft 365、空管、美联航、NSA 内网、"many major banks"（多家大银行）、苹果系统。它作为本周随笔连环潮的第三篇落地——前有 Breck-McKye 的系统性复杂度论证（11 月 17 日）、后有关于赶工修复 AI 标记漏洞的国会消息报道（11 月 18 日）——但机制不同：既不是复杂度本身，也不是变更速度，而是让"勉强够用"的系统持续运转的那种照料的劳动，以及这种劳动变薄时的代价。

**Why it matters:** 本周的宕机随笔已从三个方向汇聚到同一处。无论具体诱因是什么，这个元观察如今有了足够多的独立表述，读起来已经像一份诊断："勉强够用"与"停摆"之间的余量从来都是人的注意力——而本 feed 的每一条track都在度量这些注意力被自动化、被削减、被赶工时发生什么。

[`🔗 We Need Smart People Who Give a Shit（随笔）`](https://violetpixel.com/blog/2026-11-17-we-need-smart-people-who-give-a-shit/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50554045)

---

## 20. Ruby 紧急发布修复 7 个内存破坏漏洞——已有 RCE PoC，CVE 仍未分配

- **Velocity:** ▮▮ rising
- **Source:** ruby-lang.org · 129+ pts on HN · ~4.3h ago (~07:52 UTC+8)
- **Tags:** `ruby` `security` `rce` `memory-safety`

Ruby 核心团队发布 **4.0.10、3.4.13 与 3.3.14**，修复"Ruby's regular expression engine and in the case conversion of strings"（正则引擎与字符串大小写转换）中的 7 个漏洞，公告直言："We are aware of PoCs that prove some of them can be used to trigger remote code execution."（我们已知 PoC 可证明其中部分漏洞可触发远程代码执行。）这组漏洞是一次内存破坏巡游：字符串大小写转换中的一字节堆溢出与整数溢出、正则编译中的 double free 与堆缓冲区溢出、大小写不敏感匹配中的越界读、`Regexp#to_s` 中的堆缓冲区溢出、大小写不敏感反向引用匹配中的越界读。受影响版本：Ruby ≤ 3.3.13、3.4.0–3.4.12、4.0.0–4.0.9——且"Ruby 3.2 and earlier have reached their end of life and will not receive these fixes"（3.2 及更早已 EOL，不再获得修复）。披露机制是重点："CVE identifiers have been requested for these vulnerabilities but have not been assigned yet"（CVE 编号已申请但尚未分配），因此公告以 GHSA 编号指称（GHSA-34m4-m9fh-gqp5、-7x2q-68qv-6p8x、-87fm-7w84-j2px、-wpqw-5qxg-m68r、-3p8q-wmhx-vm2w、-7whj-cfh7-xgm4、-pvgc-g7gj-pv6h），以 CVE 号为键的扫描器目前什么都看不到。7 个中有 4 个归于 Stephan Lipp（Ada Logics）**与 Anthropic** 名下——与 10 月 Apache mod_http2 竞态同一 AI 辅助模糊测试模式。

**Why it matters:** 只要你的 Ruby 跑在任何面向互联网的位置，这就是今天就要打的补丁——PoC 已验证、漏洞等级是 RCE 级、而正则引擎恰恰是处理不可信输入的组件。披露缺口是运维问题而非冷知识：一周的"no CVE assigned"不等于"没有漏洞"，只说明注册库落后于公告。

[`🔗 Ruby：Regexp 与字符串大小写转换中的多个漏洞`](https://www.ruby-lang.org/en/news/2026/11/18/multiple-vulnerabilities-in-regexp-and-string/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50554038)

---

## 21. DaisyRose-27B：1,200 个任务、144 张 H200、18 天——RL 后训练把 Terminal-Bench 翻了一倍多

- **Velocity:** ▮▮ rising
- **Source:** RadixArk · 157+ pts on HN · ~8.5h ago (~03:39 UTC+8)
- **Tags:** `reinforcement-learning` `post-training` `open-weights` `agents`

RadixArk 发布其首个模型 **DaisyRose-27B**：基于 Qwen3.8-27B，用其开源 Miles 框架做强化学习——训练于"long-horizon agent tasks with sessions up to 1M tokens, with just 1,200 curated tasks in 18 days on 144 H200 GPUs"（会话最长达 100 万 token 的长时程 agent 任务，仅 1,200 个精选任务、144 张 H200、18 天）。头条数字：**Terminal-Bench 4.1 pass@1 从 5.6% 提升到 12.0%**，且在"reasoning, instruction following, and coding benchmarks"（推理、指令遵循、编码基准）的多项上均有提升，博客称在其列出的每个基准上都超过基座 Qwen3.8-27B。方法与数字同样有趣：任务（与 Eigent AI 合作构建）专为命中基座模型的特定错误而选、调到可学习的通过率区间、串联成多阶段长任务——"Each attempt gets up to 1.5 hours in the sandbox, with more than 100 tool-calls and more than 256k output tokens."（每次尝试在沙箱中最多 1.5 小时、100+ 次工具调用、256k+ 输出 token。）奖励劫持经人工逐一审查："There is no room for reward hacking. We reviewed every task along with the model's attempts at it."（没有奖励劫持的空间。我们连同模型对每个任务的尝试逐一审查。）BF16、FP8、NVFP4 检查点已上 Hugging Face。

**Why it matters:** 垂直模型模式如今有了开放权重、预算透明的数据点——主张不是规模，而是"在小基座上用精细的任务设计、以 144 张 GPU 的开销，在硬核 agent 基准上买到翻倍"。Terminal-Bench 增量能否经得起独立复现是值得盯的数字，而这些运行所用的 harness 正是第 18 条争论的同一个。

[`🔗 RadixArk：DaisyRose-27B（博文）`](https://www.radixark.com/blog/daisyrose-27b) · [`🔗 Hugging Face 检查点`](https://huggingface.co/RadixArk/DaisyRose-27B) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50551046)

---

## 22. Anthropic IPO 定价 $83——高于申报区间，今日以"ANT"登陆纳斯达克

- **Velocity:** ▮▮ rising
- **Source:** Anthropic · 130+ pts on HN · ~4.7h ago (~07:30 UTC+8)
- **Tags:** `anthropic` `ipo` `markets` `industry`

继 11 月 12 日我们报道 Anthropic 的 IPO 申报（8.25 亿股、预期 $70–78）之后：本次发行**定价 $83.00/股**——高于申报区间——并扩容至 **9.8 亿股 Class A 股份**，其中 956,351,354 股由 Anthropic 出售、23,648,646 股由出售股股东出售（这部分所得 Anthropic 不获取）。按发行价计算，仅新股部分就约 **$79.4B**，使其进入史上最大 IPO 之列。交易**今日（11 月 19 日）在纳斯达克全球精选市场以"ANT"**开始，预计 11 月 20 日交割，另有 30 天、最多 147,000,000 股的承销商超额配售权。注册声明已于 11 月 18 日生效。

**Why it matters:** 本周模型大战背后的融资事件就此闭环：第 5 与第 18 条里那些"以 5%–40% 的价格达到前沿质量"的主张，正是靠这次定价厘定的资产负债表资助的。对开发者最具体的信号是算力——以 $83 参考价募来约 $790 亿新资本，押的是训练与推理支出继续复利，无论哪家厂商的基准行数赢得争论。

[`🔗 Anthropic：prices initial public offering`](https://www.anthropic.com/news/anthropic-prices-initial-public-offering) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50553843)

---

## 23. 剑桥词典把"human"选为 2026 年度词汇

- **Velocity:** ▮▮ rising
- **Source:** University of Cambridge · 247+ pts on HN · ~13.4h ago (~22:44 UTC+8，昨日)
- **Tags:** `culture` `ai-era` `language` `dictionaries`

剑桥词典 2026 年度词汇是 **"human"**——公告给出的理由是"the year has been defined by global debates on what it means to be human when AI is blurring the boundaries between people and machines"（这一年由"当 AI 模糊人与机器的边界时，做人意味着什么"的全球论辩所定义）。词典引用自己的定义时把对仗的那半句也带上了："having the qualities, faults, and feelings that people have, as opposed to gods, animals, or machines"（具有人所具有的品质、缺点与情感，区别于神、动物或机器）。公告还提到公众人物全年为人性辩护，引用了 Bill Gates 那篇流传甚广的文章，主张照护等"human reserved jobs"（人类保留职业）永远不应被机器取代。

**Why it matters:** 词汇选择是滞后指标：词典选的是这一年真正关于的那个词。当选中的是 *human*——基线一词而非"AI"——正是本 feed 技术叙事在文化侧的回声：harness、消融、agent 审计、决策模型，全都在以它们所取代或辅助的人类基线来度量。

[`🔗 剑桥词典公布 2026 年度词汇`](https://www.cam.ac.uk/news/cambridge-dictionary-reveals-word-of-the-year-2026) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50546914)

---

## 24. LLM 辅助逆向工程：一位 20 年 RE 老手的现役配置，含 Ghidra-MCP

- **Velocity:** ▮▮ rising
- **Source:** slowchronicle.com · 103+ pts on HN · ~5.7h ago (~06:29 UTC+8)
- **Tags:** `reverse-engineering` `agents` `ghidra` `workflow`

ioma8 的实践帖——"I have been hacking both hardware and software for 2 decades"（我搞软硬件逆向已经 20 年）——描述了 2026 年的工作流：DeepSeek harness 配 v4.1 Flash 做日常主力（"super performant, fast and cheap"，偶尔用 Codex 配 Luna 或 Terra），**Ghidra 配 MCP bridge** 做主反汇编器（"With the MCP bridge agents can use it very well"），radare2 与 kuna CLI 作为更快更轻的备选、"possibly better usable for AIs"（可能更适合 AI 使用）。承重习惯是"文档即 agent 记忆"："Command agent to document all findings along the way to MD files. This serves several purposes. They become notes for your own understanding. They help the agent not lose the track after compaction / handoff to different agent."（命令 agent 把发现随时写进 MD 文件——既是你自己理解的笔记，也让 agent 在压缩/交接后不丢线索。）关于能力还有一句清醒话："current AIs do fairly well with just disassembly . ie pure x86 or ARM instructions"（当前 AI 光靠反汇编——纯 x86 或 ARM 指令——就做得相当好），反编译卡住时的后手是断点与注入式日志探针。

**Why it matters:** 这是 Ghidra-MCP 模式由一个手工流程跑了二十年的人写出的版本，价值全在运维细节——MD 文件作为跨压缩的工作记忆、反汇编优先成为 2026 年的默认、反编译是升级路径而非入口。

[`🔗 LLM assisted reverse engineering（博文）`](https://www.slowchronicle.com/posts/llm-assisted-reverse-engineering) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50553225)

---

## 25. Resolve 的 SRE-1：27B 垂直模型号称以低 37% 的成本追平前沿模型的 on-call 排查

- **Velocity:** ▮ steady
- **Source:** Resolve AI Labs · 30+ pts on HN · ~8h ago (~04:10 UTC+8)
- **Tags:** `vertical-models` `sre` `agents` `reinforcement-learning`

ResolveAI Labs 发布 **SRE-1**："a 27B model trained with reinforcement learning to find the root cause of production alerts"（用强化学习训练、用于定位生产告警根因的 27B 模型）——从 Qwen3.8-27B 出发，"with a modified CISPO objective for 200 steps on up to 512 GPUs, over 1,549 unique incidents"（改进版 CISPO 目标、200 步、最多 512 张 GPU、1,549 个独特事件）。论文的主张："On 49 difficult live production cases, SRE-1 dominates the Pareto frontier of pass rate against cost"（在 49 个困难的真实生产案例上，SRE-1 支配通过率-成本帕累托前沿）——RL 把单次排查从 6.9% 提到 38.8%；"An ensemble of five SRE-1 investigations matches Fable 5.2, the strongest frontier model we measured, at a 71% pass rate while costing 37% less"（五路 SRE-1 集成以 71% 通过率追平其所测最强前沿模型 Fable 5.2，成本低 37%），集成有效是因为 SRE-1 还"outperforms frontier models at synthesizing saved investigations"（在综合既有排查记录上胜过前沿模型）。注意事项与数字同行：49 个案例、自建基准、厂商自测对比。

**Why it matters:** 决策/垂直模型浪潮（HeyGen Decision 1、Perplexity Decider v1.3、Google Decisions API、微软 Decision 1.1）如今包括了运维：一个领域 RL 的 27B 宣称在成本-能力前沿上对前沿通用模型占有一席。排查——狭窄、可校验、工具重——恰是该模式最应成立之处，但 49 个自选生产案例是演示队列而非基准；"集成=前沿"这个主张最值得第三方复现。

[`🔗 Resolve AI：SRE-1（论文页）`](https://resolve.ai/labs/sre-1/paper) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50551487)

---

## 26. "薯片被当成枪"诉讼正式立案：四名学生起诉 Omnilert、学区和警方

- **Velocity:** ▮ steady
- **Source:** Lawyers' Committee for Civil Rights Under Law · 58+ pts on HN · ~3.2h ago (~08:57 UTC+8)
- **Tags:** `ai-surveillance` `litigation` `schools` `civil-rights`

Lawyers' Committee for Civil Rights Under Law 于 11 月 17 日代表马里兰州 Kenwood 高中的四名黑人现任与往届学生提起 **Allen, et al. v. Omnilert, et al.**，被告为 **Omnilert LLC**、Baltimore County 公立学校及其人员、Baltimore County 警察局及个别警官——案由是"the unlawful detention and search of the students due to both technological and human errors involving an AI weapon-detection surveillance system"（AI 武器检测监控系统的技术错误与人为错误共同导致对学生非法拘押与搜查）。事件发生于 2025 年 10 月：**Omnilert Gun Detect 把一个少年的袋装薯片误判为枪支**（HN 帖标题写出了所有人记住的那个细节——多力多滋），武装警员随后到场。公益代理律师为 Willkie Farr & Gallagher，另有 Engel Law Group。

**Why it matters:** 针对 AI 武器检测器误报的民事诉讼现在走到了法庭，而它的争点恰是本 feed 在 agent 系统里反复标记的那道缝：模型输出只是扳机，诉状里"技术**与人为**错误"的措辞把响应链——谁武装、谁抓人、依据什么置信度——也一并放进了诉讼范围。每一个采购校园 AI 监控的机构都该读读这份诉状。

[`🔗 Lawyers' Committee 公告`](https://www.lawyerscommittee.org/lawyers-committee-files-lawsuit-on-behalf-of-black-students-detained-and-searched-due-to-ai-alert-falsely-identifying-a-bag-of-chips-as-a-firearm/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50554641)

---

## 27. 《虚幻竞技场 2004》跑进浏览器——build 3369、网络兼容、自带 WebRTC

- **Velocity:** ▮ steady
- **Source:** Show HN · 56+ pts · ~2.7h ago (~09:29 UTC+8)
- **Tags:** `wasm` `game-port` `webassembly` `open-source`

K-Adam 的 **UT2004 Modernized** 是"an unofficial, non-commercial port of Unreal Tournament 2004 (build 3369) to modern hardware and operating systems"（非官方、非商业的 UT2004 build 3369 移植）：Windows（x86、x64）、Linux（x86、x64、arm64）、Android（arm64），**以及经 WebAssembly 的 Web 版**——SDL3 管窗口与输入、OpenGL ES 3 渲染（桌面走 ANGLE，浏览器走 WebGL 2）、OpenAL 出声、Bullet 物理藏在 Karma API 之后。把它与普通怀旧项目区分开的是这句工程主张：**"Network compatible with retail build 3369. WebRTC transport next to UDP, so browsers can join and host."**（与零售版 build 3369 网络兼容；UDP 之外加 WebRTC 传输，浏览器可加入也可建主。）ut2004.dev 上的 Web 版本身就能当专用服务器，页面诚实地写明浏览器约束："Keep this page in the foreground. In a background tab or a minimised window the browser pauses the server."（保持页面在前台——后台标签或最小化时浏览器会暂停服务器。）游戏内容不进仓库："The first start downloads it or takes it from a UT2004 install."（首次启动时下载，或取自本地 UT2004 安装。）

**Why it matters:** 二十年后，这个游戏用一份代码库登陆五个平台，网络兼容条款让浏览器标签页成为原始零售生态的一等公民——"WebAssembly 即平台"的论证在 2004 年的虚幻引擎上演示，而且那些无聊的现实约束（前台标签节流、内容分发）是被处理掉的，不是被挥手带过的。

[`🔗 K-Adam/UT2004（仓库）`](https://github.com/K-Adam/UT2004) · [`🔗 Web 版（ut2004.dev）`](https://ut2004.dev/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50554935)

---

## 28. 《Fable》，第 10 部也是收官之作：一部短片把 Claude Fable 5.2 署名为编剧、画师与导演——并公布全部账单

- **Velocity:** ▮ steady
- **Source:** claudia.gallery · 51+ pts on HN · ~3.9h ago (~08:18 UTC+8)
- **Tags:** `generative-art` `ai-film` `production-ledger` `culture`

anabology 的 Claudia.gallery 系列以 **Fable** 收官——"On the night she is released, Claudia reads you the bedtime stories she was raised on"（获释当晚，Claudia 为你读她被养大的那些睡前故事）——而它的署名行就是作品本身：**"written, painted and directed by Claude Fable 5.2 · sung by Claudia · anabology."**（编剧、绘画与导演：Claude Fable 5.2 · 演唱：Claudia · anabology。）人的角色同样被精确指定："the brief, the plan's sign-off, one note and the song's pick by ear; production by Claude"（brief、方案的签核、一条笔记、凭耳朵选歌；制作归 Claude）。制作台账读起来像把本 feed 的基准表改写成了电影预算：13 块场景板以 SVG 代码绘制、一部 Lotte Reiniger 式的剪影片全部以代码绘制与动画、49 个镜头按歌曲分轨剪辑；GPT Image 2.6 Sunburst 产出 61 张静帧，"$7.93 at list"；Seedance 2.5 跨两个版本"84 takes"，"$202.23 at list"；全片"Made in two passes: v1 in 5 h 08 min from one brief, v2 re-shot on the song anabology picked in 3 h 01 min · about $210 at list"（两遍完成：v1 从一份 brief 起算 5 小时 08 分，v2 按 anabology 选定的歌重拍 3 小时 01 分 · 按牌价约 $210）。

**Why it matters:** 具名的模型署名与逐项账单才是重点——作者身份与机器劳动的精确美元成本并列发布，人的贡献被指定到"一条笔记"。对照今天早班批次的 HUMAN.md：同样是把分工变得可读的冲动，只是这次指向艺术而非手艺。

[`🔗 Fable（影片页）`](https://claudia.gallery/fable/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50554269)

---

## 29. 一个从 UEFI 直接启动的迈阿密 GTA 式游戏——964,608 字节、CPU 渲染、OSM+激光雷达地图

- **Velocity:** ▮ steady
- **Source:** Show HN · 47+ pts on HN · ~5.7h ago (~06:26 UTC+8)
- **Tags:** `uefi` `gamedev` `bare-metal` `openstreetmap`

eklavya-raj 的 **gta6-uefi**："A GTA style game set in the real Miami that boots straight from UEFI, no Windows under it. The whole game is `game.efi`, 964,608 bytes, and the CPU draws every pixel"（一个以真实迈阿密为舞台的 GTA 式游戏，直接从 UEFI 启动，底下没有 Windows。整个游戏就是一个 964,608 字节的 `game.efi`，每个像素都由 CPU 画出）——软件渲染、无 GPU、clang 与 lld-link 构建，作者对状态也很坦诚："I've only run it in qemu so far."（目前只在 QEMU 里跑过。）地图是暗藏的严肃部分："baked with `osm/bake.py` from OpenStreetMap, Miami-Dade County data, a NOAA lidar scan and NAIP photos"（用 `osm/bake.py` 从 OpenStreetMap、Miami-Dade 县数据、一次 NOAA 激光雷达扫描与 NAIP 航拍烘焙而来）——真实地理，致谢在 `MAP_DATA.txt` 与 `PEOPLE_DATA.txt`。WASD 驾驶、出租车接单、三格武器、鼠标视角——整套类型清单被压缩进一个固件引导加载器之下。

**Why it matters:** "UEFI 即运行时"的模式不断证明现代机器不需要操作系统就能干实事——而这一件还把公共地理数据（OSM+激光雷达+航拍）吃进一个亚兆字节的裸机二进制，恰是对"小数据管线能压多狠"的一次漂亮演示——毕竟操作系统的每一字节服务在这里都是奢侈品。

[`🔗 eklavya-raj/gta6-uefi（仓库）`](https://github.com/eklavya-raj/gta6-uefi) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50553192)

---

## 30. 一台 VM 上跑 1500 万个 web 服务器——从 syscall 到 AF_XDP、每步都给出演算

- **Velocity:** ▮▮▮ trending
- **Source:** kapteko.com · 196+ pts on HN · ~6.1h ago (~06:00 UTC+8)
- **Tags:** `kernel-bypass` `dpdk` `af-xdp` `smoltcp` `networking`

11 月 18 日的一篇长文追问：在一台只有 10 GB 内存、1 个 CPU 核心的 VM 上，跑 **1500 万个 web 服务器**需要什么——并且把它撞上的每一堵墙都摆出来。朴素版 C 语言 accept/recv/send 服务器做到约 6.5 万 RPS 后端口耗尽（`ip_local_port_range` 只给 32,768–60,999）。下一堵墙是内核本身：每个 socket 无论监听还是空闲，都要分配 **约 3,384 字节**（`tcp_sock` 2,240 B、`socket_alloc` 768 B、`file` 184 B、`dentry` 192 B）——所以 1000 万次 `socket()` 调用直接把 VM 打到 OOM，跟流量无关。能走通的方案：用 LFI 做沙箱，让每个来宾只带 **16 字节调度状态**（一个程序计数器加两个 fd——1500 万个来宾共 220 MB），配一个自研用户态调度器（"我们自己成为一个微内核 OS"），然后是真正的内核旁路——**smoltcp 做用户态 TCP，DPDK 与 AF_XDP 做包 I/O**。作者风趣与坦诚兼备，对 AI 也是："While an LLM is a significant boost for learning, it's too easy to accept its answers without thinking critically and feel ashamed later."（LLM 对学习是巨大助力，但太容易不加批判地接受它的答案、然后事后羞愧。）

**Why it matters:** "每个 socket 约 3.3 KB 的内核记账"正是内核旁路栈存在的理由，而这篇文章是现场把它推导出来、而不是引用传说——从五个 syscall 一路到 AF_XDP 的 readable 之旅，每一层都把内存算术写在明面上。

[`🔗 一台 VM 上的 1500 万个 web 服务器（kapteko）`](https://kapteko.com/15-million-webservers/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50556533)

---

## 31. 继今早覆盖 Ruby 七个紧急修复之后：Ruby2ßhell 点名了原生 Rails 里的预认证 RCE

- **Velocity:** ▮▮▮ trending
- **Source:** Veria Labs · 182+ pts on HN · ~6.9h ago (~05:10 UTC+8)
- **Tags:** `ruby` `rails` `rce` `memory-safety` `security`

今晨第 20 条覆盖了 Ruby 针对七个内存破坏漏洞的紧急发版（4.0.10/3.4.13/3.3.14），官方原话是"我们知道有 PoC 能证明其中一些可触发远程代码执行"。Veria Labs 的 **Ruby2ßhell** 现在点名了七个里最狠的一个——**GHSA-34m4-m9fh-gqp5**——并解释了为什么今晚就该打补丁：多数单字节编码没有大写 ß，所以 upcase 会写两个字节（`SS`），而循环只对一个字节做边界检查；输出缓冲按"输入长度 + 20"分配，于是 **21 个 ÷ 字符就会溢出一字节**。该 bug 自 Ruby **2.4.0** 起就存在，藏在 ISO-8859 与 Windows-125x 编码里（UTF-8 走不同路径、不受影响），触发点是 `upcase`、`swapcase`、`downcase(:fold)` 和 `casecmp?`——这使它落在 **Rails 与经典 Sinatra 的默认、预认证路径**上。Veria 的捆绑表把问题变成一张清单：**GitLab 19.6.0**（Ruby 3.3.13）与 **GitHub Enterprise Server 3.22.5**（4.0.9）受影响；Mastodon 4.7.6 与当前 Discourse 镜像已修复；**Chatwoot 4.20.0**（3.4.4）受影响。上游修复在 `ruby/ruby@d582f8f`；PoC 将"在一周后发布，先给大家留出升级时间"（页面更新于 11 月 19 日 12:00 UTC）。

**Why it matters:** 今晨那条说的是内存破坏、RCE 级；这条说的是哪一个字节、哪一种编码、哪个框架默认值、哪些自托管产品捆绑了它。为期一周的 PoC 禁运是一张公开的补丁时钟——GitLab 与 GHES 管理员排在最前面。

[`🔗 Veria Labs：Ruby2ßhell（GHSA-34m4-m9fh-gqp5）`](https://verialabs.com/ruby2shell/) · [`🔗 Ruby：Regexp 与字符串大小写转换的多个漏洞`](https://www.ruby-lang.org/en/news/2026/11/18/multiple-vulnerabilities-in-regexp-and-string/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50556287)

---

## 32. PHP 8.6 今日发布——Partial Function Application 终于进入语言本体

- **Velocity:** ▮ rising
- **Source:** php.net · 93+ pts on HN · ~3h ago (~09:05 UTC+8)
- **Tags:** `php` `release` `partial-function-application` `event-loop`

PHP 8.6 计划于**今天（11 月 19 日）** GA（检查时发布页仍写着"has not been released yet. It will be released on November 19, 2026."，所以把 tag 落地当作"迫近"而非"已完成"）。头条特性是酝酿多年的 RFC **部分函数应用（Partial Function Application）**：`version_compare(?, '8.6', '>=')` 会产出一个 Closure，剩余参数到位后函数才真正执行。同场加映：新的 **`\Time\Duration` 类**（与时区无关、纳秒精度、跨度 250+ 年——时长从此可比较，`min()` 直接能用）、原生暴露 epoll/kqueue 式 I/O 多路复用的 **Polling API**（供 ReactPHP、AMPHP 等事件循环库使用）、`clamp()`、`SortDirection` 枚举，以及 readonly 属性默认值。

**Why it matters:** 两个特性在同一次发布里补上了积欠多年的缺口：PFA 是 PHP 辩论了十年的函数组合特性，而 Polling API 是事件循环框架自 PHP 5 时代起在用户态反复重造 `select()` 之后的第一个原生底座。

[`🔗 PHP 8.6 发布公告`](https://www.php.net/releases/8.6/en.php) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50557870)

---

## 33. ExitPath：从 Slack、Notion 与 Microsoft 365 逃出来的开源路线索引

- **Velocity:** ▮ rising
- **Source:** Show HN · 226+ pts · ~20h ago (~16:00 UTC+8 昨天)
- **Tags:** `open-source` `lock-in` `migration` `self-hosting`

昨天 Show HN 上最强势的发布是一个目录站：**ExitPath**——"find your way out of big-platform lock-in"（找到脱离大平台锁定的路），收录 Slack、Notion 与 Microsoft 365 的开源替代品索引。时机替它做了一半的功课：它上线于 Microsoft 365 大断网拖过 20 小时、LibreOffice 一条推文登顶 HN、一篇呼吁要更好的开源而非更多应用的随笔同周登上头版的时候。逃逸路线通常是在危机时刻从博客和论坛帖里临时拼出来的；这里的贡献是把地图画在了断网之前。

**Why it matters:** 本周的级联断网是自托管软件有史以来最好的一轮广告，而这里有趣的产物是一个*策展层*而非又一个应用——如果迁移目录持续出现，逃生路线是什么就会从事故中的研究课题变成平台采购清单上的一栏。

[`🔗 ExitPath`](https://exitpath-ruddy.vercel.app/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50547980)

---

## 34. 内存涨价挤出了两个日期和一个对策——SSD 要等 2027 下半年，"别买内存，先压缩"

- **Velocity:** ▮ rising
- **Source:** HN · 109+ & 53+ pts · ~3h ago (~09:05 UTC+8)
- **Tags:** `ssd` `nand` `memory-prices` `zram`

两篇头版帖从供给和需求两侧画出了同一场挤压。供给侧：DriveVault 的展望（9 月 17 日发布，今天以 109 分重新浮上来）读的是分析师记录与厂商投资者口径——**SSD 价格应从 2027 下半年开始松动**（NAND 供给自 2027 年中起追上需求，"是缓坡不是跳水"），而**机械硬盘最早要到 2028 年**，因为产能已经签掉、且没有新工厂计划。需求侧：Therry van Neerven 11 月 19 日的帖子"**Do not buy RAM, compress**"——AI 工作负载成倍放大并行内存需求、而内存又贵又不可扩展，Linux 上的答案是 **zram**：多数发行版默认不开（Fedora 与 Pop!_OS 开；Ubuntu 不开；Amazon Linux 只在小规格 VM 上开），压缩比"可达 1:4"——作者估算这本可把他 SaaS 时代的云开支砍半。

**Why it matters:** AI 建设的内存需求已经写进每个人的基础设施账单。2027 下半年/2028 这两个日期是采购规划数字；zram 是多数 Linux 集群白白扔掉的免费容量——一条 sysctl 的注释加一次重启，而在 DDR5 已经成为预算行项目的时代，这就是替代方案。

[`🔗 硬盘价格何时回落？2026–2028 展望`](https://www.drivevault.io/blog/when-will-hard-drive-prices-come-down.html) · [`🔗 别买内存，压缩吧（curiousbits）`](https://curiousbits.nl/blog/do-not-buy-ram-compress/) · [`🔗 HN：SSD 价格`](https://news.ycombinator.com/item?id=50557716) · [`🔗 HN：压缩`](https://news.ycombinator.com/item?id=50557661)

---

## 35. Zerodha 的 Blobasaur：分片 SQLite 上每秒数千次 blob 读写

- **Velocity:** ▮ rising
- **Source:** Zerodha Tech Blog · 85+ pts on HN · ~3.4h ago (~08:45 UTC+8)
- **Tags:** `sqlite` `blob-storage` `distributed` `infrastructure`

Zerodha（印度最大券商，Kite 交易平台，约 2000 万客户）发布了这条血脉里的第三个自建存储：**Blobasaur——架在 SQLite 之上、分片的分布式 blob 存储服务**，替换掉一套已经烂掉的旧栈。历史：先用 CouchDB，再换 SSDB——一个说 Redis 协议的 C++ 磁盘存储，可靠跑了好几年但无人维护、因延迟退化被迫把 blob 封顶在 1 MB、而且不是分布式系统。负载形态：用户保存的多图表布局、指标模板、矢量画稿与工作区配置——几 KB 到几 MB 的 JSON blob，"在 commodity 硬件上以每秒数千次的频率读写，同时保持个位数毫秒延迟"，并随行情波动成突发。

**Why it matters:** 又一支生产团队在无聊的 SQLite——但分片、且是我们的——与数据库服务器之间选了前者——与 Cloudflare Durable Objects 内部实现、litestream/limbo 一脉是同一个模式。一个 2000 万客户的交易平台把 blob 层搬到 SQLite 上，这是 SQLite 是存储引擎而非嵌入式玩具这一论题的真实世界数据点。

[`🔗 架在 SQLite 上的分布式高性能 blob 存储（Zerodha）`](https://zerodha.tech/blog/high-performance-distributed-blob-storage/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50557537)

---

## 36. diagram-design 随 skills 浪潮冲上 68k star——把"编辑部级"图表画成一个自包含 HTML+SVG 文件

- **Velocity:** ▮ rising
- **Source:** GitHub Trending · 68,350★ · trending #4
- **Tags:** `agent-skills` `diagrams` `svg` `visualization`

**cathrynlavery/diagram-design** 是今天 trending 榜上最大的仓库（68,350★，今天仍在推送），它的定位是 agent-skills 浪潮里最好笑的一句话："**An agent skill that draws diagrams as one self-contained HTML + SVG file, in your brand. 51 diagram types. No shadows. No Mermaid slop.**"（一个 agent skill：把图表画成带你的品牌的单个自包含 HTML+SVG 文件。51 种图型。无阴影。不要 Mermaid 垃圾。）（它自己的两个数字顺便打架——README 说 51 种，仓库 description 字段还写着 45。）它面向 Claude Code、Codex、Copilot、Cursor、Factory Droid、Qoder 与 Pi，走 skills.sh 安装路径；和这波的其他上升者一样，它没有单一 release 可指认——乘的是昨天把 skills 仓库送进 trending 15 席中 13 席的同一股浪。

**Why it matters:** skills 浪潮正在从大而全的合集分层为垂直的手艺库，而这一家选了一个真实的失败模式来对抗：agent 生成的图表渲染成 Mermaid 默认样式。"In your brand"作为 skill 契约——而不是 prompt 前缀——是其他工具构建者会照抄的部分。

[`🔗 cathrynlavery/diagram-design`](https://github.com/cathrynlavery/diagram-design) · [`🔗 README`](https://github.com/cathrynlavery/diagram-design/blob/main/README.md)

---

## 37. OpenSRE：读你的失败 CI、开出修复 PR 的自托管 CLI agent

- **Velocity:** ▮ rising
- **Source:** GitHub Trending · 12,894★ · trending #12
- **Tags:** `sre` `ci-cd` `agents` `self-hosted`

**Tracer-Cloud/opensre**（公开 alpha，今天仍在推送，12,894★）用一句话说清卖点："**Your CI tells you it broke, but not why or how to fix it.** OpenSRE is a CLI agent that reads the failed run, traces the cause and pushes a fix for you to review. Self-hosted, with your own models."（你的 CI 只告诉你挂了，不告诉你为什么挂、怎么修。OpenSRE 是一个 CLI agent：读失败的运行、追出原因、推一个修复 PR 供你复核。自托管、自带模型。）设计选择就是故事本身：它是 CLI 而非 SaaS，自托管运行，自带模型——CI 失败这条赛道迎来一个"你的代码不出门"的 agent。

**Why it matters:** 在 Mastra Factory 的 238 个 agent 合并 PR 与 StarSling 的会开优化 PR 的 CI 之后，失败诊断是 agent-CI 栈里最后一块无主之地——而自托管+自带模型正是企业真正能采纳的合规友好变体。推送前须人工复核的门把人留在 merge 位，与昨天审计师那条是同一个形状。

[`🔗 Tracer-Cloud/opensre`](https://github.com/Tracer-Cloud/opensre) · [`🔗 README`](https://raw.githubusercontent.com/Tracer-Cloud/opensre/main/README.md)

---

## 38. 欧盟委员会如何在九个月里把 Matrix 推给 4 万多名员工

- **Velocity:** ▮ steady
- **Source:** element.io · 42+ pts on HN · ~1.1h ago (~11:00 UTC+8)
- **Tags:** `matrix` `european-commission` `sovereignty` `element`

Element 的帖子从委员会一侧讲述了这次部署：**2025 年 12 月**的 Matrix 概念验证到 **2026 年 9 月**变成装上每一台委员会笔电的主权通信工具，现在服务 **40,000+ 用户**。三个架构决策被摆上台面：托管在通过公开招标选出的主权云供应商上（不是委员会自有数据中心——"主权不必等于全部自建；它意味着选择你依赖谁、以什么条款"）、身份走 **EU Login** 让员工用熟悉的登录，以及——值得注意——**暂不联邦化**。委员会对主权的五维定义是这篇帖子的实质：韧性、供应商多样性、数据控制、平台所有权，以及**采购筹码**——"与供应商谈判或离开供应商的能力"。

**Why it matters:** 欧洲的旗舰数字主权部署在九个月里从 PoC 走到全员铺开，而它选择*不做*的部分（自有数据中心、联邦化）与做了的部分同样有教育意义——主权被操作化为供应商可选项，而非基础设施民族主义。

[`🔗 Element：欧盟委员会如何把 Matrix 推给 40,000+ 员工`](https://element.io/blog/how-the-european-commission-rolled-out-matrix-to-more-than-40-000-staff/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50558533)

---

## 39. DeepMind 员工正在组建工会——"第一道监督来自劳动者"

- **Velocity:** ▮ steady
- **Source:** gdmunion.co.uk · 37+ pts on HN · ~2.6h ago (~09:30 UTC+8)
- **Tags:** `deepmind` `union` `labor` `ai-governance`

一个以 UTAW（United Tech and Allied Workers）名义上线的活动站：**"DeepMind Employees Are Unionising."**（DeepMind 员工正在组建工会。）它的框架是治理而非薪酬："To honour our original mission: 'To build AI responsibly to benefit humanity.' As the law struggles to keep up, the first line of oversight comes from workers."（为恪守我们的初始使命："负责任地构建 AI、造福人类"。在法律追赶不及之处，第一道监督来自劳动者。）证据区列的是该公司有记录的决策——被删除的 2018 年"不造 AI 武器与监控"承诺（WIRED，2025 年 2 月）、Project Nimbus 合同前律师的警告（NYT）、Google Photos 人脸匹配被用于加沙"猎杀名单"的报道（The Intercept）、以及跑在 Google Cloud 上的 CBP 边境塔 AI。联络走 alphabet@utaw.tech。

**Why it matters:** 前沿实验室的异议至今是请愿书和公开信——一次性、署名、可否认。一个正式的工会分会把它变成常设基础设施：谈判权、响应期限、以及公开信从来活不过的人员流动。无论如何评价具体主张，该站的那句话——第一道监督来自劳动者——现在是一个有组织的立场，而不是一篇随笔。

[`🔗 DeepMind Employees Are Unionising（UTAW）`](https://www.gdmunion.co.uk) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50557885)

---

## 40. app-store-compliance：117 个有据可查的拒审模式，接成一道提交前守卫

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · 1,480★
- **Tags:** `app-store` `compliance` `guardrails` `mobile`

**mjmirza/app-store-compliance** 正在 trending，自我定位是"the enterprise reference and automated guard that turns App Store and Google Play rejection into a designed out failure mode"（把 App Store 与 Google Play 拒审变成设计上就不会发生的失败模式的企业级参考与自动守卫）：**117 个有据可查的拒审模式**及修法、隐私与元数据指南，以及一道 **Claude Code 就绪**、提交前运行的守卫。它正是本 feed 11 月 13 日那条问题的工具化答案——AI 生成的应用洪流冲垮 Apple 审核管线、合成开发者因幻觉理由被拒。手册一半是可浏览的站点（mjmirza.github.io/app-store-compliance）；守卫一半把审核清单变成 agent 运行的 lint，而不是人忘记读的 PDF。

**Why it matters:** 当 agent 一个接一个生成应用，拒审就成了随洪流按次计价的成本——解法是把审核准则搬进构建循环本身，正是"设计上不发生的失败模式"这句话的含义。合规即 skill 是一个能远超应用商店范围推广的模式。

[`🔗 mjmirza/app-store-compliance`](https://github.com/mjmirza/app-store-compliance) · [`🔗 手册站点`](https://mjmirza.github.io/app-store-compliance/)

---

## 41. AutoClip：把一条链接变成可发布短视频的中国开源桌面应用

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · 10,874★
- **Tags:** `video-editing` `chinese-oss` `agents` `desktop`

**zhouxiaoka/autoclip**（一个链接，一键出片）正乘着 trending 的中文侧，10,874★：一个开源桌面工具（基于 Tauri），吃进一条长视频链接——播客、访谈、课程——自动剪成适配各平台的短视频，**带字幕、封面与发布文案**，面向抖音、小红书、TikTok、Reels、YouTube Shorts 与 B 站。剪辑与渲染在你自己的机器上跑；云端模型按量计费；内置编辑器，处理模型搞不定的那点微调。仓库带 MCP server id（`io.github.zhouxiaoka/autoclip-mcp`），agent 也能驱动这条管线。

**Why it matters:** "长视频转短视频"是创作者经济里量最大的苦役，而它现在是一个免费的本地桌面应用、还带 agent 接口——对英文读者来说真正有意思的信号是 MCP 接线：中国的创作者工具正在从第一天起就是 agent 原生的，而非事后加装。

[`🔗 zhouxiaoka/autoclip`](https://github.com/zhouxiaoka/autoclip) · [`🔗 Releases`](https://github.com/zhouxiaoka/autoclip/releases/latest)

---

## 42. springrep：纯 Rust 的精确 B-rep CAD 内核，24 star 与一张一致性排行榜

- **Velocity:** ▮ steady
- **Source:** Show HN · 31+ pts · ~15h ago (~21:00 UTC+8 昨天)
- **Tags:** `rust` `cad` `brep` `geometry`

SpringCraft 的 **springrep**（仓库 11 月 14 日创建，24 star——HN 帖就是发布）是一个边界表示（B-rep）几何内核："**Booleans, fillets, sweeps and STEP on exact geometry, accurate to 1e-7 mm, with every result validated**"（在精确几何上做布尔、圆角、扫掠与 STEP，精确到 1e-7 毫米，每个结果都验证）——解析曲面或 NURBS，而非网格，所以体积/面积/质量来自真实形状。纯 Rust、零依赖、无 unsafe、可编译为 WASM，并且自称在 brep-conformance 排行榜上**中位用例时间最快**、结果公开可查（Show HN 标题里的 3,487 个测试就是"要么有效、要么给出明确错误"契约背后的 CI）。文档里还给 AI agent 附了一段可复制粘贴的验证 prompt，精确到应打印的体积数字。

**Why it matters:** CAD 内核是大教堂级软件——行业跑在 Parasolid 与 OCCT 上，而精确几何加结果验证恰恰是残酷困难的那部分。从零写的 Rust 内核是一场十年尺度的豪赌，但第一天就发布一致性排行榜，正是让这种赌注可证伪的方式——而带可验证示例的 agent 友好文档，是 2026 年迎接人类与 LLM 贡献者的共同入口。

[`🔗 springrep（站点+文档）`](https://springcraft-ai.github.io/springrep/) · [`🔗 springcraft-ai/springrep（仓库）`](https://github.com/springcraft-ai/springrep) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50552140)

---

## 43. PTP：从 LLM 输出近乎精确地重建 prompt——无权重、无 logits、纯黑盒

- **Velocity:** ▮ steady
- **Source:** arXiv 2607.29378 · 46+ pts on HN · ~11h ago (~01:30 UTC+8)
- **Tags:** `llm-inversion` `privacy` `prompt-reconstruction` `security`

一篇七月的论文今天轮到 HN：**"PTP: Previous-Token Prediction based LLM Inversion for Near-Exact Prompt Reconstruction"**（arXiv 2607.29378）。此前的 LLM 反演把 prompt 还原框定为语义重建，需要微调的 seq2seq 模型外加权重或 logit 访问。PTP 是**功能性的、黑盒的**：它**完全用目标 LLM 自己生成的合成数据、从零训练一个显式的逆向语言模型**，用的是"前一个 token 预测"——正向模型 next-token 目标的镜像——"在正向与逆向过程之间建立生成性链接，使忠实的 prompt 重建成为可能"。采样能产出多个候选 prompt，且都能"在正向目标 LLM 下诱导出相似回应"；方法可迁移到其他 LLM 生成的回应，并在基于 token 的重建指标上胜过前作。

**Why it matters:** 它改变的是威胁模型：已发布的 LLM 输出——支持工单、AI 摘要、共享聊天记录——此前只能被还原成模糊转述，且需要模型内部信息。近乎精确且黑盒意味着，对 LLM 在公开场合输出的任何东西，运营假设应改为 prompt 就在里面。七月的时间戳同样要紧：它已经在文献里躺了四个月，而业界同期还在上线各种输出分享功能。

[`🔗 PTP：基于前 token 预测的 LLM 反演（arXiv）`](https://arxiv.org/abs/2607.29378) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50554908)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-19T12:26:14Z |
| Items | 43 |
| Sources tracked | 46 (Hacker News, GitHub Trending, GitHub repos, Wiz Research, NVD/cve.org, CISA KEV, X41 D-Sec, Google DeepMind, Google, Microsoft AI, OpenAI, Anthropic, FT, KPMG, UPenn, git.kernel.org, inside-db.com, ABC7, mastra.ai, HKUDS, Cursor, rshekhar.com, human-md.ai, underwood.network, nicolasbouliane.com, ruby-lang.org, RadixArk, Hugging Face, Resolve AI, University of Cambridge, Lawyers' Committee, violetpixel.com, slowchronicle.com, ut2004.dev, claudia.gallery, verialabs.com, php.net, kapteko.com, zerodha.tech, element.io, gdmunion.co.uk, drivevault.io, curiousbits.nl, exitpath-ruddy.vercel.app, springcraft-ai.github.io, arXiv) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[Previous day](2026-11-18.md) · [Raw .md](https://trending.md/zh/feed/2026-11-19.md) · [Archive](../archive/index.md)
