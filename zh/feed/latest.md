---
date: 2026-11-15
updated: 2026-11-14T20:25:31Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 17
license: CC-BY-4.0
---

# trending.md — 2026-11-15

## 1. 安全研究人员扫描 159,041 个 Lovable 应用：24,664 个向匿名访客吐出数据库记录——其中包括护照信息、聊天记录与租户档案

- **Velocity:** ▮▮▮ trending
- **Source:** crissyfield.de · 277+ pts on HN · 2.5h ago (~01:43 UTC+8)
- **Tags:** `lovable` `supabase` `data-exposure` `vibe-coding`

Crissy Field GmbH 的研究人员与《商报》（Handelsblatt）合作，分析了来自 Common Crawl 的 **159,041 个 Lovable 项目**（2025 年 12 月–2026 年 9 月）：在接入 Supabase 集成的 **34,545** 个项目中，有 **24,664 个在页面加载时、无需任何登录就向外吐出数据库记录**。研究人员用同一个匿名访客 API Key 追加只读请求后发现，**7,403 个站点（占吐记录集合的 30%）**暴露了包含电子邮箱的数据表。案例具体得令人发指：一个德国生活论坛暴露 **80,000+ 用户资料和 200,000+ 聊天消息**；一家服务商暴露 **1,000+ 条含护照号码**与国籍的身份文件记录；一家物业管理公司的 AI 生成的租户内部邮件；还有一家服务商 **280,000 封客户邮件**可被任意读取。研究人员的措辞很谨慎——30% 并非确认的泄露率（邮箱可能是公开联系方式或测试数据），Common Crawl 样本也不具代表性——但模式是清楚的：Lovable 的卖点是零技术门槛，其服务条款却把数据处理责任压给客户，而 Supabase 的错误配置呈现重复模式，一个应用里能打开的洞，成千上万个应用同样打得开。

**Why it matters:** 这是"氛围编程"平台风险的一次规模化量化：问题不是某一个 bug，而是一类非技术构建者根本看不见的重复性错误配置，且跑在载有真实个人数据的应用上。研究人员自己的结论——自动化检查替代不了专业安全评估——就是所有要用这些应用承载用户数据的人的操作守则。

[`🔗 Crissy Field：Lovable 研究（英文）`](https://www.crissyfield.de/research/lovable-en/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50499017)

---

## 2. 意大利对 Meta 开出 8.05 亿欧元（约 8.87 亿美元）罚单：未经同意访问安卓用户照片

- **Velocity:** ▮▮▮ trending
- **Source:** reuters.com · 226+ pts on HN · 6.4h ago (~21:48 UTC+8)
- **Tags:** `meta` `gdpr` `privacy` `regulation`

意大利数据保护局（Garante）于 11 月 14 日（周六）宣布对 Meta 处以 **8.05 亿欧元**罚款——约合 **8.87 亿美元**，按该机构的说法约为 Meta 全球营收的 0.47%——事由是 Facebook 应用的一项功能：在向用户推荐可发布的相册内容的同时，**未经同意且未告知**地访问安卓用户的照片和视频。处罚令要求 Meta 在 **60 天内**默认停用该功能并单独征求同意；监管机构还保留了对 2026 年一项将相册内容交云端处理的功能单独评估的权利。据路透社报道，Meta 暂未置评，且本次调查**未**涉及内容是否被用于训练 AI 模型——Meta 一贯否认这一用途。本文细节均来自路透社：截至发稿，Garante 的英文新闻页尚未刊登该处罚公告。

**Why it matters:** 该案为"照片抓取类功能"在欧盟如何被监管立了模板——同意必须单独、明确，不能捆绑在分享建议里——而"云端处理"的后续评估才是值得盯的线：AI 训练问题将从那里重新入场。

[`🔗 路透社：Italy fines Meta $887 million over Android users' data access`](https://www.reuters.com/world/italy-fines-meta-887-million-over-android-users-data-access-2026-11-14/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50497009)

---

## 3. Univer 发布 v1.5.0：把 AI 办公作为目标的办源办公 SDK 越过 2.4 万星

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub Trending · +495★ today · 24.4k total · v1.5.0 released 9.6h ago (~18:33 UTC+8)
- **Tags:** `univer` `office-sdk` `spreadsheet` `typescript`

dream-num/univer——"Build your own AI office with Univer Office SDK"——发布了 **v1.5.0**（11 月 14 日 10:33 UTC），并在 GitHub Trending 上单日上涨 495 星。该项目把开源的**表格与文档**（编辑、计算、协作、文件处理）嵌入你自己的应用，并明确主打从开源的表格与文档起步、连接你自己的应用或智能体——也就是说，文档模型以编程接口暴露给 AI 工作流，而不只是被 UI 驱动。README 提供了独立表格编辑器的快速上手、8 种语言的文档，以及与它在嵌入场景中替代的商业套件的对比页。

**Why it matters:** "智能体办公"模式（智能体在应用自己的数据模型里读写结构化文档，而不是操纵一个封闭套件）缺的正是这一层——一个可许可修改、带 API 面的表格/文档引擎。v1.5.0 的 trending 时刻，正好是把它与闭源套件插件放在一起、为你的智能体栈做一次评估的好时机。

[`🔗 dream-num/univer`](https://github.com/dream-num/univer) · [`🔗 Release v1.5.0`](https://github.com/dream-num/univer/releases/tag/v1.5.0)

---

## 4. Google Antigravity /teamwork：并行智能体加"证伪器"——2013 年猜想的 Lean 证明、Weil 猜想形式化与 Rust 版 Zircon

- **Velocity:** ▮▮ rising
- **Source:** research.google · 109+ pts on HN · 6.9h ago (~21:20 UTC+8)
- **Tags:** `antigravity` `multi-agent` `lean` `formal-verification`

Google 研究博客（11 月 13 日，Vahab Mirrokni）介绍了 Antigravity 内部的多智能体协作系统 **/teamwork**，构建于 Gemini 4 模型之上：并行的探索者智能体配以专用的**证伪器**——Lean 4 证明检查、未改动的测试套件、执行模拟器——候选结果由机器验证而非被信任；上下文按构造分区，每个智能体只看到自己那一步的文件与工具。声明的结果异常具体：**2013 年 Courtade–Kumar 猜想**的完整证明已在 Lean 4 中形式化（5000 万行）、**Weil 猜想的首次形式化**（约 180 万行 Lean，28,800 次子智能体调用）、希尔伯特第十问题在整数环上的形式化、1927 年以来悬而未决的 Birkhoff 猜想、一个八天内涨约 2600 Elo 的围棋引擎，以及 **Zircon 微内核移植（约 80 万行安全 Rust）**，其中 libgav1 用 Rust 重写后比原 C++ 快 20–30%。外部落地也是真的：/teamwork、/boost 和 Deep Review 已在 Antigravity 上线，另有面向 1 万名学术研究者的免费访问计划开放申请。

**Why it matters:** 这里的每个数字都是 Google 自己测自己的系统，基准应视为厂商声明——但架构思想才是承重墙：生成器配自动证伪器，与本周 Gödel 笔记本、Lean 税法所用的"模型查模型"回路同构，正在成为"错误答案可被检验"类智能体工作的标准形态。

[`🔗 Google Research：Advancing science and engineering with Antigravity's /teamwork`](https://research.google/blog/advancing-science-engineering-with-antigravitys-teamwork-feature/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50496811)

---

## 5. claude-trading-skills 成为今日涨速之王：一套结构化交易决策的 Claude Skills 工具包——并且拒绝成为信号服务

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · +556★ today · 4.7k total · pushed 5.6h ago (~22:33 UTC+8)
- **Tags:** `claude-skills` `trading` `workflow` `finance`

tradermonty/claude-trading-skills 今日拿下 **+556 星**，是当日看板上涨幅最大的项目。这是一套面向时间紧张的散户投资者的 Claude Skills **工作流**工具包：五条命名工作流（`market-regime-daily`、`core-portfolio-weekly`、`swing-opportunity-daily`、`trade-memory-loop`、`monthly-performance-review`），每条都是机器可读的 YAML 清单，按序点名确切的技能、决策关卡与产物——市场宽度、回撤熔断、仓位管理、盘前纪律闸，以及盘后复盘回路。README 对"它不是什么"异常强调：不是投资建议、不是信号服务、不是自动化交易——目标是结构化复盘、风险管理与交易日志，每条工作流都备有无 API 的降级路径，示例输出也挂着醒目的"虚构数据"声明。

**Why it matters:** 有意思的信号是形态而非题材：智能体技能的采用正从完成任务转向用关卡与产物强制执行决策过程——金融、医疗、法律方向的智能体工具都在向这个形态收敛。其免责声明的自律程度，也值得所有要在受监管领域发布智能体工作流的人当作模板来读。

[`🔗 tradermonty/claude-trading-skills`](https://github.com/tradermonty/claude-trading-skills) · [`🔗 文档站`](https://tradermonty.github.io/claude-trading-skills/)

---

## 6. NVIDIA 用两台 DGX Station 跑 GLM-5.3（753B）——峰值 607.8 tok/s，并发曲线如实奉上

- **Velocity:** ▮▮ rising
- **Source:** developer.nvidia.com · 108+ pts on HN · 6h ago (~22:09 UTC+8)
- **Tags:** `glm-5` `vllm` `inference` `dgx`

NVIDIA 技术博客（11 月 13 日）演示了如何伺服 Z.ai 的 **GLM-5.3**——753B 参数 MoE（每 token 激活 40B），NVFP4 量化后检查点约 464 GB，超过单台 GB300 的 252 GB HBM3e——跨**两台以 ConnectX-8 RDMA 互联的 DGX Station**，由 vLLM v0.30.0 暴露单一 OpenAI 兼容端点。配方是张量并行（TP=2，非 disaggregation）、多 token 预测每步起草 4 个 token、FP8 KV cache 与前缀缓存；在 80 段 SPEED-Bench 编码对话上的实测曲线于并发 16 处冲上 **607.8 tok/s 峰值**——帖子里同时印出了全表：C32 跌至 **385 tok/s**、平均延迟 453.5 秒、单用户吞吐从 115.3 跌到 13.0 tok/s。注意事项也写在帖子里：端点默认**无鉴权**（扩大使用前先防火墙并加 TLS）、旧版 NCCL 在 RoCE 上跨节点 CUDA graph 重放会死锁、关闭前缀缓存会改变数字。

**Why it matters:** 这里有两种现货：其一是一份可复现的配方，应对检查点长过单机内存的时刻（464 GB 这一档正在变得常见）；其二是一个"把劣化曲线和标题数字一起发布"的范例——C16 峰值是推文素材，C32 那一行才是真相。

[`🔗 NVIDIA 技术博客：When one GPU isn't enough`](https://developer.nvidia.com/blog/when-one-gpu-isnt-enough-serving-glm-5-3-across-two-nvidia-dgx-stations-with-vllm/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50497155)

---

## 7. PyPI 上线安全信号改版：Security 标签页展示来源证明、标记迟入文件、对"来源丢失"告警

- **Velocity:** ▮▮ rising
- **Source:** blog.pypi.org · 148+ pts on HN · 4.5h ago (~23:40 UTC+8)
- **Tags:** `pypi` `supply-chain` `provenance` `packaging`

PyPI 项目页改版已全面上线（11 月 6 日宣布完成；HN 热度 11 月 14 日抵达）：新增专属 **Security 标签页**，展示每个发行版的**来源证明（provenance）状态**与逐文件证明详情——PyPI Publish 证明（Trusted Publisher 上传）与 SLSA Build Provenance（把文件关联到源码提交、平台与构建指令）。四类警告——**不完整、不一致、变更、丢失 provenance**——专为暴露可能的账号接管或构建管道失陷而设；**迟入文件警告**标记发行 14 天后才补入的文件（仅限 2026 年 7 月该政策落地前的发行版）；隔离横幅覆盖一切其他提示；侧栏元数据也被标注为"PyPI data"与"Data verified by PyPI"。项目由 OpenSSF 资助、Kabu Creative 实现、遵循 OpenSSF Attestations Style Guide。

**Why it matters:** 证明体系已存在两年；这次改版是让它们在"安装决策时刻"变得**可读**的 UI——而那正是它们能改变行为的时刻。"provenance 丢失"警告最有意思：它是一条供应链绊线，触发模式恰好是账号接管真实产生的模式。

[`🔗 PyPI 博客：UI updates complete`](https://blog.pypi.org/posts/2026-11-06-ui-updates-complete/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50497892)

---

## 8. KDE：纪录片——社区故事被拍成电影，263 分登顶 HN

- **Velocity:** ▮▮ rising
- **Source:** tube.kockatoo.org · 263+ pts on HN · 6.5h ago (~21:43 UTC+8)
- **Tags:** `kde` `documentary` `open-source` `community`

一部关于 KDE——Plasma 背后那个 30 岁的桌面社区——的长篇纪录片正在 HN 上冲到 **263 分、123 条评论**，托管在社区的 Peertube 实例上。评论者纷纷指认出品方：它来自 **CultRepo**，此前出品过多部自由软件纪录片的频道；讨论帖顺势变成了一场"20 年 KDE 用户"的怀旧会（跨版本稳定、可配置性、C++ 桌面代码库）。这是当天头版上罕见的纯社区历史条目——既不是发布，也不是漏洞。

**Why it matters:** 自由软件纪录片正在自成一派——CultRepo 的旧片目录一次次冲上 HN——而评论区是检视"最老牌大型桌面社区在 2026 年如何被一线工程师看待"的晴雨表。

[`🔗 KDE：纪录片（视频）`](https://tube.kockatoo.org/w/fFinNHfanLT7aBEb2B8y4c) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50496976)

---

## 9. Caveman Code 发布：12 万星的省 token 项目变成免费 Mac 编码智能体应用——自测基准正反两面都公布

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · +227★ today · 120.0k total
- **Tags:** `caveman` `token-optimization` `coding-agents` `context`

JuliusBrussee/caveman——那个让智能体"少说少读"的爆款 skill + 代理——突破 **12 万星**，并发布了 **Caveman Code**：一个免费的 Mac/浏览器 harness，可在你现有订阅上并排运行 Claude Agent、Codex、Cursor 与其自家智能体。发布页的声明全部锁定同一模型：Terminal-Bench 4 上，**每个解题任务比 Codex 便宜 21%**（GPT-6.1 Sol 解出 90/192，与 Codex 打平）、**比 Claude Code 便宜 14%**（Opus 5.5 解出 97/180 对 83/177）；模拟的整天多应用会话**便宜 76%**；首请求体积 2.7k token 对 Claude Code 的 16.7k。底层技术的自有数字：54 次 Claude Code 运行**输入 token 减少 33.2%**、18/18 答案正确。披露也异常完整——所有测量都是他们自己按牌价跑的、对 Claude Code 的运行次数略有差异（180 对 177）、连失败的实验也照发（从历史中剥离先前推理使重读减少 68%，但**成本反升 19%**且解题率下降），因此他们主张"每个解题任务的成本"而非裸 token 数才是指标。

**Why it matters:** 上下文效率 harness 正从副业项目走向产品，而这里的诚实基准形态——锁定模型、按解题计成本、连失败一起发——正是面对任何同一模型更小账单式的宣传时你该要求的形状。

[`🔗 JuliusBrussee/caveman`](https://github.com/JuliusBrussee/caveman) · [`🔗 发布文：Introducing Caveman Code`](https://caveman.so/news/introducing-caveman-code)

---

## 10. 美国税法进 Lean：138 处立法起草缺陷获机器验证证书，两个报税软件包被抓出 bug

- **Velocity:** ▮▮ rising
- **Source:** lexifina.com · 102+ pts on HN · 4.5h ago (~23:41 UTC+8)
- **Tags:** `lean` `formal-methods` `tax` `research`

Lexifina 的 Alan Yahya 项目（CC0 许可）把《美国法典》第 26 编——国内收入法典——翻译成 Lean，成为机器校验的结构化交叉引用（每部公法一个 git 提交，可回溯至 1994 年版），外加一个产出 1040 表数字的 **2025 年个人所得税模型**（约 2,159 个定义与定理，含 AMT）。已验证的产出：税法正文中 **138 处真实起草缺陷**，每处附 Lean 证书（死引用、拼写错误、编号重复、未闭合括号）；诸如"SALT 上限永不随收入增长""10 万美元以下税表与法定公式的偏差不超过 −5 至 +6 美元"的全称证明；以及在 5,000 户家庭上与三个独立工具（PolicyEngine-US、Tax-Calculator、UsTaxes）的交叉验证——从中抓出 **Tax-Calculator 与 UsTaxes 的 bug**，外加自己模型里的两个。在已被证明的模型上跑自动搜索（约 195,787 份单年申报），独立重新发现了 §199A 与 Roth 转换等已知策略，并报告了三条新结果，其中包括 Schedule 8812 的支付额超出法定允许。局限写得明白：法条翻译由 AI 完成、**未经律师或 CPA 核查**；覆盖范围仅 2025 年个人所得税；他们的结论是单个税年不存在 Roth 量级的未公开漏洞——大漏洞多半藏在合伙企业与 S 公司里。

**Why it matters:** 本周出现了三次相互独立的同构演示（本条、Antigravity 的证明、Gödel 笔记本）——AI 翻译，证明助手裁决——尺度各不相同。税法版对非数学家最有分量：这里的 oracle 是 IRS 自己公布的数字与三个独立软件包，而其中两个与法律本身不一致。

[`🔗 Lexifina：Formalizing the US Tax Code`](https://lexifina.com/blog/formalizing-the-us-tax-code) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50497900)

---

## 11. Project Zero 收紧披露政策：30 天缓冲取消，2028 年 1 月抵达"满 30 天"终点

- **Velocity:** ▮▮ rising
- **Source:** projectzero.google · 42+ pts on HN · 9h ago (~19:13 UTC+8)
- **Tags:** `project-zero` `disclosure` `security-policy` `ai`

Google Project Zero 发布新漏洞披露政策（11 月 13 日，Natalie Silvanovich），取代 2021 年起的"90+30"——90 天修复期外加 30 天缓冲——改为 **"Full X"时刻表：报告后 X 天即披露，无论是否已修复**。阶梯日期明确：**现在 Full 90 → 2027 年 2 月 2 日起 Full 60 → 2028 年 1 月 3 日起 Full 30**。宽限期与变体政策一并移除；仅存三类例外（在野漏洞按 Google 应用安全政策处理、已公开的漏洞、厂商主动要求）。给出的动机是 AI 出现在竞速两侧：LLM 压缩了漏洞发现、也缩短了补丁到利用的窗口，为"缓慢的漏洞开发"假设设计的缓冲期不再购买用户安全。值得注意的是，漏洞是否真正修复不再是政策的决策点——P0 仍会跟踪修复状态，但披露不再等它。

**Why it matters:** 这是第一个明确以"AI 加速的利用时间线"论证的重大披露政策重写，给整个行业立下了可以对照规划的截止日期——厂商的补丁 SLA，以及一切建立在 90+30 之上的企业补丁节奏假设，从此有了已知的到期日。

[`🔗 Project Zero：披露政策更新`](https://projectzero.google/2026/11/disclosure-policy.html) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50496051)

---

## 12. 190 行纯 JAX 写成 DeepSeek V3——MLA、MoE 均衡与 MTP，在 MacBook Air 上从头训练

- **Velocity:** ▮ steady
- **Source:** Show HN · 80+ pts · 5.1h ago (~23:04 UTC+8)
- **Tags:** `jax` `deepseek` `education` `transformer`

Vaibhaav Tiwari 的教学级实现把整个 DeepSeek-V3 架构装进 **190 行纯 JAX**——不用 Flax、不用 Equinox，参数就是普通的字典数组——并在 MacBook Air M5（24 GB）上从头预训练：36.2M 参数模型（每 token 激活 13.6M），2100 万 token 的公版侦探小说，约 2.6 小时，验证损失 5.02 → 3.51。DeepSeek-V3 的每个想法都在场且在这个尺度上可测：MLA 的潜缓存（每 token 每层 480 → 144 个数）、解耦 RoPE、DeepSeekMoE（1 共享 + 16 路由取 4），以及最妙的部分——**无辅助损失均衡**：README 直接印出前后对比——加偏置后每个专家的负载摊到 5.7–6.9%，不加则是 0.09–18.6%，直测了这个均衡技巧买到的东西。

**Why it matters:** 大多数 N 行实现 X 式的仓库只是把形状重敲一遍；这一版让论文里的每个想法都能在玩具尺度上被证伪——这正是代码导读与可用实验室的差别。仅凭偏置均衡那组前后对比，就值得所有读过 DeepSeek-V3 报告却不信负载图的人一读。

[`🔗 Vaibhaav-Tiwari/deepseek-v3-jax`](https://github.com/Vaibhaav-Tiwari/deepseek-v3-jax) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50497589)

---

## 13. agweb：为编码智能体打造的 macOS 浏览器——永不抢焦点，还自带 footprint 实测

- **Velocity:** ▮ steady
- **Source:** Show HN · 66+ pts · 6.1h ago (~22:08 UTC+8)
- **Tags:** `agweb` `agents` `browser` `macos`

agweb（paul-nameless/agweb）是一款为智能体而非人类设计的 WebKit macOS 浏览器：智能体从 shell 用 playwright 风格的 CLI 驱动它，对话框与文件选择器在代码层应答，而核心性质是——**任何窗口都不抢焦点**，五个并行智能体同时浏览也不会爆发键盘大战。每个智能体的标签页都收在一块仪表盘（⌘D）里，附各自最后一条命令；原生 macOS 事件驱动点击与悬停，人审门槛站点照常工作；`fill --secret-cmd 'pass show site'` 输入凭据而智能体的转录文本里永远看不到它；空闲标签页挂起至 0% CPU。README 附上自测：五个空闲页面 **590 MB**，对比 headless Chrome 730 MB、Playwright Chrome 1.6 GB。11 月 11 日创建，122 星，需 macOS 26+。

**Why it matters:** 智能体浏览器层正在收敛出一套明确的接口契约——引用稳定的 snapshot、可 diff 的 find、脱敏输入——而 agweb 的站位（真实窗口、不抢焦点、对人类保持可见）是 headless 浏览器与 Playwright 驱动 Chrome 之间设计空间里一个清晰的坐标点。

[`🔗 paul-nameless/agweb`](https://github.com/paul-nameless/agweb) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50497147)

---

## 14. Fursoy：从零手写的乱序 RV64 核心，SystemVerilog 实现，能启动主线 Linux 6.6

- **Velocity:** ▮ steady
- **Source:** Show HN · 50+ pts · 6.1h ago (~22:06 UTC+8)
- **Tags:** `riscv` `cpu` `systemverilog` `hardware`

Fursoy Slice-1 是一位独立开发者从零手写的**64 位乱序超标量 RISC-V 处理器**（RV64IMAFDV + Zba/Zbb），SystemVerilog 实现——2 宽取指/译码/重命名/退休，128 项 ROB，160 项物理寄存器堆，8 个分支检查点，带硬件页表遍历器的 8 bank 非阻塞 L1D，以及 Sv39 按需分页与 M/S/U 特权级分离。头条成果：它在虚拟内存下**启动了主线 Linux 6.6.50 与 BusyBox**，并在 Nangate 45nm 标准单元上跨 8 个核心功能块完成 **500 MHz** 时序收敛（完整综合报告已公开）。17 个星——这是工艺之作而非产品，README 的微架构细节密度也确实如此。

**Why it matters:** 在自研乱序核心上启动 Linux 是硬件领域最困难的个人里程碑之一，而公开的综合/STA 报告让它成为一份可用参考：每个结构都有名字、有尺寸、有时序，想知道乱序到底贵在哪里的人可以直接读。

[`🔗 FURSOY/fursoy-cpu`](https://github.com/FURSOY/fursoy-cpu) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50497137)

---

## 15. IRS Direct File 的代码在 GitHub 上——而仓库自己声明：已归档、不再维护、勿用于生产

- **Velocity:** ▮ steady
- **Source:** github.com/IRS-Public · 65+ pts on HN · 2.4h ago (~01:48 UTC+8)
- **Tags:** `irs` `direct-file` `open-source` `government`

HN 重新翻出了 **IRS-Public/direct-file**——IRS 免费直接电子报税服务背后的仓库，4.6k 星，README 对自身状态毫不含糊：**"本仓库已归档且不再维护。代码仅供历史参考，可能包含未修补或未知的漏洞。不应在生产系统中使用。"** 代码本身仍是了不起的公共产物：一个把 Title 26 翻译成平实语言问题的问答式报税服务（与 IRS 首席法律顾问办公室共同开发），外加 **Fact Graph**——一个声明式 XML 知识图谱，JVM 上跑 Scala、经 Scala.js 转译进浏览器，专为"填了一半的报税表"这类不完整信息做推理，并明确提供其作为业务规则引擎的参考实现。最后一次 push 是 6 月 11 日；讨论帖里活着的问题是 Direct File 项目本身是否会回归并被永久化。

**Why it matters:** 这里有两件事一起发生：一件真正可复用的公共部门产物（Fact Graph 与领域无关），以及一个为"归档政府代码"做出安全表态范本的仓库——README 拒绝让"历史参考"被读成"仍在维护的软件"。

> "This repository has been archived and is no longer maintained. The code is provided for historical reference and may contain unpatched or unknown vulnerabilities. It should not be used in production systems." —— 仓库 README

[`🔗 IRS-Public/direct-file`](https://github.com/IRS-Public/direct-file) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50499083)

---

## 16. 腾讯开源 LoopForge：自托管的智能体交付流水线——编码智能体开 PR，人类守关卡

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · +101★ today · 834 total · v0.3.9-rc.1 released ~24h ago
- **Tags:** `loopforge` `tencent` `agent-orchestration` `self-hosted`

腾讯的 Tencent/LoopForge 是一个自托管（Docker、MIT）的团队交付工作区：**Main Bot** 打开沙箱工作区、检出仓库、分派给项目角色并开出 PR——可复用的工作方式则沉淀为 **SOP**：由 Agent、Script、Human-gate 与子 SOP 节点组成的有向图，带逐节点产物、重试与"退回某一步"语义。执行器名单的宽度值得一读：CodeBuddy（腾讯自家的）、Codex、Claude Code、OpenCode、Cursor CLI、Antigravity、Kimi Code、Pi、DeepSeek Harness 与 ZCode。聊天与 SOP 两条路径都追踪同一份需求，汇入交付与成本报表。发版节奏很快——三天内 v0.3.7、v0.3.8 与 v0.3.9-rc.1——今日再涨 101 星。

**Why it matters:** 智能体交付平台层正是今年智能体工具收敛的方向，而 LoopForge 的差异点恰是多数竞品跳过的两件事：全部自托管在你自己的基础设施上，以及 human gate 是交付图里的一等节点，而不是侧边上挂一个审批按钮。

[`🔗 Tencent/LoopForge`](https://github.com/Tencent/LoopForge) · [`🔗 Releases`](https://github.com/Tencent/LoopForge/releases)

---

## 17. 生成式 AI 处理非英文文本多烧 1.4–180 倍能量——印地语 7.9 倍、孟加拉语 15.3 倍——而且准确率还更低

- **Velocity:** ▮ steady
- **Source:** news.umich.edu · 135+ pts on HN · 4.2d ago (~23:07 UTC+8, Nov 10)
- **Tags:** `energy` `multilingual` `research` `emnlp`

密歇根大学的研究者（Naihao Deng、Rada Mihalcea 等，EMNLP 报告）用 ML.Energy 框架测量了三个开源模型——Qwen 3、Gemma 3、Llama 3.1——在 122 种语言的 Belebele 阅读理解题上的能耗：生成非英文文本比英文**多耗 1.4 至 180 倍能量**，印地语 **7.9 倍**、孟加拉语 **15.3 倍**，而多数西欧语言不超过 2 倍。机制是复合的：非拉丁文字被切成更多 token，更多 token 占内存、迫使更小批次，更小批次抬高每 token 能耗——且这一差距在更大模型与不同处理器上都成立。准确率损失同行："通常耗能更多的语言，模型输出的准确率也往往更低"，Deng 说。按他们的计算（结合 Ethnologue 数据），约 **52 亿人**用母语使用 AI 要付出两倍以上的能量。

**Why it matters:** "双重惩罚"——同一个问题，更高成本、更低质量——不是物理定律而是定价结构：作者给出的修法（按语言专模型、先译成英文的管道）都是工程选择。对任何服务多语言用户的人，这篇论文就是在给分语言定价之前该跑的那次测量。

[`🔗 密歇根大学新闻：Generative AI uses more energy on non-English text`](https://news.umich.edu/generative-ai-uses-more-energy-on-non-english-text/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50441444)

---

## 18. CBC 调查后，LinkedIn 与 Monster 下架 1,500+ 条假招聘——追到一家旅游 MLM

- **Velocity:** ▮ steady
- **Source:** cbc.ca · 54+ pts on HN · 1.3h ago (~02:56 UTC+8)
- **Tags:** `linkedin` `job-scam` `mlm` `investigation`

超过 **1,500 条误导性招聘帖**——"居家旅游规划师与虚拟客服"、远程、无需经验、年薪最高 7.5 万美元——已从 LinkedIn 与 Monster 下架：CBC News 的可视化调查把这片旅游主题页面网络追到了一家美国多层次传销公司 **Evolution Travel**。这些帖子把应聘者导入虚拟说明会，要求先付数百美元外加月费，换一个靠"订票课程"与"拉人"赚钱的项目——按调查的原话，**"没有工作，也没有薪水。"** 报道发布于 11 月 12 日，11 月 14 日登上 HN 头版。

**Why it matters:** 招聘诈骗量是 AI 时代较安静的一种伤害——生成式工具让Listing 农场便宜到可以量产，恰逢经济焦虑让求职者放宽警惕——而这次下架表明，只有当有人做CBC 那样的串联功课时，审核闭环才会合上：把数百个名义上互不相干的页面连到同一个收款结构。

[`🔗 CBC News：LinkedIn, Monster take down over 1,000 fake job postings`](https://www.cbc.ca/news/canada/linkedin-monster-take-down-over-1-000-fake-job-postings-after-cbc-investigation-9.7415379) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50499723)

---

## 19. Watch a Brain Learn：Aatish Bhatia 的强化学习互动讲解，亲手给神经元接线

- **Velocity:** ▮ steady
- **Source:** aatishb.com · 73+ pts on HN · 6.7h ago (~21:31 UTC+8)
- **Tags:** `reinforcement-learning` `visualization` `neuroscience` `education`

Aatish Bhatia 与神经科学家 Arkarup Banerjee 发布了 Myriad 系列的又一篇互动讲解：**"Watch a Brain Learn"**，一篇强化学习的可视化解释。你先亲手给一个四神经元的数字生物（"spark"）接线、让它朝光飞——复现上一篇里的恐惧/攻击/趋光回路——然后把控制权交给试错：这只生物靠奖励自己学会同样的行为，学习规则的每一步都可交互、可见。其教学法与此前多篇头版常客一脉相承：机制是你去操作的，不是你去看的图。

**Why it matters:** RL 入门讲解通常从表格和 Q 值开始；这一篇从一个你自己可以接错的脑子开始，这是真正不同的入门坡道——也是递给团队里每个"在接触带奖励的智能体之前，需要先理解奖励如何塑造行为"的人的好链接。

[`🔗 Watch a Brain Learn（互动）`](https://aatishb.com/myriad/how-brains-learn/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50496885)

---

## 20. Let's Write a PostScript Interpreter：一门能印在一两页纸上的栈语言，用单行 JavaScript 函数写成

- **Velocity:** ▮ steady
- **Source:** beyondloom.com · 88+ pts on HN · 39h ago (~13:12 UTC+8, Nov 13)
- **Tags:** `postscript` `interpreters` `forth` `programming-languages`

Devin Weaver 的文章（beyondloom）用刻意精简的 JavaScript 构建了一个极简 PostScript 解释器——正则分词、双全局栈（操作数栈 + 字典栈）、运算符即按元数弹参的普通函数——小到能印在一两页纸上，且每个示例在 Ghostscript 中运行结果一致。文章最漂亮的技术点是 PostScript 的古怪角落：`[` 与 `]` 不是语法而是 **mark** 协议（`[` 压入标记，`]` 收集其上所有元素，让括号数组成为可组合的列表推导）；字典栈带来的是**动态作用域而非词法作用域**——这正是高阶函数别扭、真实 `bind` 运算符存在的原因。全文的框架是"人类尺度的语言"：一个人能构建并完全理解的工具。

**Why it matters:** PostScript 是部署最广却几乎没人主动书写的栈语言，而这是理解其后代（PDF 的成像模型、Forth 风格的嵌入式工具）为何长成那样的最干净的入口——外加一个一晚可完成、每行都有真材实料的解释器项目。

[`🔗 Let's Write a PostScript Interpreter`](https://beyondloom.com/blog/postscript.html) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50478632)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-14T20:25:31Z |
| Items | 20 |
| Sources tracked | 17 (Hacker News, GitHub Trending, Google Research, NVIDIA, PyPI, Project Zero, CBC, Reuters, U-Mich, vendor blogs and project repos) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[Previous day](2026-11-14.md) · [Raw .md](latest.md) · [Archive](../archive/index.md)
