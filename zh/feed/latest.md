---
date: 2026-11-15
updated: 2026-11-15T12:24:30Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 36
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

密歇根大学的研究者（Naihao Deng、Rada Mihalcea 等，EMNLP 报告）用 ML.Energy 框架测量了三个开源模型——Qwen 3、Gemma 3、Llama 3.1——在 122 种语言的 Belebele 阅读理解题上的能耗：生成非英文文本比英文**多耗 1.4 至 180 倍能量**（论文摘要原文：上限为 **179 倍**，英语 17.6 kJ → 普什图语 3,147 kJ），印地语 **7.9 倍**、孟加拉语 **15.3 倍**，而多数西欧语言不超过 2 倍。机制是复合的：非拉丁文字被切成更多 token，更多 token 占内存、迫使更小批次，更小批次抬高每 token 能耗——且这一差距在更大模型与不同处理器上都成立。准确率损失同行："通常耗能更多的语言，模型输出的准确率也往往更低"，Deng 说。按他们的计算（结合 Ethnologue 数据），约 **52 亿人**用母语使用 AI 要付出两倍以上的能量。

**Why it matters:** "双重惩罚"——同一个问题，更高成本、更低质量——不是物理定律而是定价结构：作者给出的修法（按语言专模型、先译成英文的管道）都是工程选择。对任何服务多语言用户的人，这篇论文就是在给分语言定价之前该跑的那次测量。

[`🔗 密歇根大学新闻：Generative AI uses more energy on non-English text`](https://news.umich.edu/generative-ai-uses-more-energy-on-non-english-text/) · [`🔗 论文：The Language-Energy Divide（arXiv 2606.21869）`](https://arxiv.org/abs/2606.21869) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50441444)

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

## 21. SpaceX 接住了星舰本体：Flight 15 以首次塔架捕获上级收尾——助推器捕获被中止

- **Velocity:** ▮▮▮ trending
- **Source:** spacex.com · 871+ pts on HN · 7h ago (~05:03 UTC+8)
- **Tags:** `spacex` `starship` `flight-15` `reusability`

Flight 15 以任务前规划的方式收尾：发射塔架接住了 **星舰上级**——这是 SpaceX 第一次接住星舰本体，此前两年里被接住的只有超重助推器。计划中的 **双捕获** 没有发生：据飞行讨论串，助推器表现欠佳（助推返程中一台发动机异常，着陆画面出现"发动机富油"的绿色喷焰），GNC 自主中止捕获并转向墨西哥湾软着陆——入水时飞行终止系统触发。马斯克的赛后总结：助推器燃料偏低，且没必要拿塔架赌爆炸——助推器比塔架便宜。星舰本体的捕获干净利落，而评论者指出这才是重点："在这个阶段，星舰回收才是真正有意思的事。"

**Why it matters:** 助推器复用已被验证是经济账；星舰上级复用是快速迭代闭环缺失的另一半——上级每次都摔成残骸的载具没法堆叠复飞。今天的捕获是塔架能承受星舰本体的首个证据，也正是下文第 31 条轨道数据中心可行性测算所押注的星船复用里程碑。

[`🔗 SpaceX：Starship Flight 15`](https://www.spacex.com/launches/starship-flight-15) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50500963)

---

## 22. 全面停飞有了原因：铜缆改光纤施工出事——被施工的路由器向空管系统灌数据

- **Velocity:** ▮▮ rising
- **Source:** bbc.co.uk · 37+ pts on HN · 10h ago (~02:03 UTC+8)
- **Tags:** `faa` `ground-stop` `l3harris` `infrastructure`

承接 2026-11-14 报道的 FAA 全国停飞（"原因未明"）：交通部长 Sean Duffy 现在表示，此次停飞可追溯至承包商 **L3Harris** 对 FAA 空域通信的 **铜缆改光纤** 工程——一台正在施工的路由器"开始向其他空管系统灌发数据"，出于安全考虑只能关闭空域。官方表示"没有任何恶意的证据，也没有任何与 AI 相关的证据"（FAA 局长 Bryan Bedford），且不认为是网络攻击；周五的停飞是 9/11 以来最严重的一次，影响预计持续数天。L3Harris 表示停飞前已完成 **超过 70%** 的现代化改造，正在"配合 FAA 调查"。

**Why it matters:** 这次的故障模式是一份现成的检查清单：在在用的安全关键通信系统上做割接，施工流量漏进了生产空管系统。对任何做基础设施迁移的人来说，这是一个免费案例——割接要在影子环境上做、要留一键回退；而政府"并非恶意"的结论也提醒我们：无聊的原因通常就是真正的原因。

[`🔗 BBC：Copper wire upgrade caused nationwide flight suspension`](https://www.bbc.co.uk/news/articles/c6wy9lynq4qno) · [`🔗 L3Harris 关于 11 月 13 日停飞的声明`](https://www.l3harris.com/newsroom/press-release/2026/11/l3harris-statement-nov-13-ground-stop)

---

## 23. EFF 请第六巡回法院为 ALPR 数据库检索设置搜查令门槛——US v. Sturdivant 案

- **Velocity:** ▮▮ rising
- **Source:** eff.org · 81+ pts on HN · 2h ago (~10:03 UTC+8)
- **Tags:** `eff` `alpr` `surveillance` `fourth-amendment`

EFF 与 ACLU 于 11 月 14 日向第六巡回法院提交 **United States v. Sturdivant** 案的法庭之友意见书：克利夫兰警方在只知道抢劫嫌犯车辆厂牌/型号/颜色的情况下，对两个 ALPR 数据库——**Flock 与 ELSAG**——做了开放式检索，发现被告车辆出现在案发地附近并将其逮捕。地区法院裁定 Sturdivant 对车牌号"没有合理隐私期待，因为公众可以观察到它"。意见书论证大规模车牌追踪构成第四修正案意义上的"搜查"——ALPR 给了执法部门"一台虚拟时间机器，点一下按钮就能查看嫌疑人（以及任何人）的过往行踪"——并指出就在上个月，一家联邦地区法院同样认定 ALPR 是"一种无差别的 mass surveillance"。

**Why it matters:** 昨天的 feed 报道了校园 Flock 撤约运动——ALPR 之争的合同战线；Sturdivant 是司法战线，两线正汇聚于同一个问题：由公共道路数据构成的数据库，查询时是否需要相当理由。第六巡回法院的答案将约束四个州的车牌读取器部署。

[`🔗 EFF：We're Asking an Appeals Court to Require a Warrant for ALPR Searches`](https://www.eff.org/deeplinks/2026/11/were-asking-appeals-court-require-warrant-alpr-searches) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50503255)

---

## 24. Dokploy 的 9.9：一个已认证的组织成员能把备份 `serviceName` 变成宿主机 root

- **Velocity:** ▮▮ rising
- **Source:** CVE-2026-129433（VulnCheck CNA 签发）· 记录发布于约 20h 前（~20:32 UTC+8，11 月 14 日）
- **Tags:** `dokploy` `cve` `command-injection` `self-hosted`

**CVE-2026-129433**（CVSS 3.1 **9.9**，VulnCheck CNA 签发；NVD 状态 `Deferred`，发布于 2026-11-14T12:32Z）：**0.31.1 之前** 的 Dokploy 在 `getComposeContainerCommand()` 存在操作系统命令注入——已认证的组织成员可以通过 `backup.create` 或 `backup.update` tRPC 过程存入携带 shell 元字符的 `serviceName`，计划备份运行时载荷 **以 root 执行**，完全接管宿主机。项目已在 **v0.31.1** 修复（11 月 12 日发布，11 月 13 日跟进 v0.31.2）；记录链接了 GHSA-j329-jw7j-rxjm、PR #5908 与提交 `b24006e`。Dokploy 是自托管 PaaS——人们部署它正是因为想自己掌握基础设施，然后又把管理端口暴露在公网上。

**Why it matters:** 这个模式在每一个自托管平台 CVE 里反复出现：本应是标识符的参数流进了 shell。如果你在跑 Dokploy，检查只要一行——版本 ≥ 0.31.1 吗？如果你在造下一个 Dokploy，教训也一样：标识符不是 shell 参数，就算有认证也如此。

[`🔗 GHSA-j329-jw7j-rxjm（Dokploy 安全公告）`](https://github.com/Dokploy/dokploy/security/advisories/GHSA-j329-jw7j-rxjm) · [`🔗 Release v0.31.1`](https://github.com/Dokploy/dokploy/releases/tag/v0.31.1) · [`🔗 CVE-2026-129433 记录`](https://www.cve.org/CVERecord?id=CVE-2026-129433)

---

## 25. "从未经过汇编器——一次都没有"：Woz 在纸上手写并手工汇编了苹果的第一款 BASIC，被重新翻出的问答给出定论

- **Velocity:** ▮▮ rising
- **Source:** retrocomputing.stackexchange.com · 137+ pts on HN · 6h ago (~06:03 UTC+8)
- **Tags:** `wozniak` `basic` `6502` `history`

2021 年 retrocomputing StackExchange 上的一问——"Woz 是如何在造出计算机之前写出 Apple 1 BASIC 的？"——今天冲上 HN（17,308 次浏览，最佳答案 82 赞）。答案综合自 Wozniak 本人的多次讲述：他在 **纸上为 6502 逐条手写并手工汇编** 了 Integer BASIC——没有汇编器，因为他的惠普雇主会为分时汇编器付费，而他个人付不起："你把指令写在页右侧，把地址写在左侧……我就坐在那里自己汇编。"以及那句终结争论的话：**"我们随最早的 Apple II 出货的 BASIC 从来没有经过汇编器——一次都没有。只有一份手写稿，全部手写，全部手工汇编。"**（1986 年 Apple World Convention 演讲，转引自 Apple II History 网站。）

**Why it matters:** 手工汇编的传说通常半真半假；这一个在作者本人的声音里有据可查，也是对 1976 年"没有工具"到底意味着什么的校准——一个人、一本便签簿和 6502 操作码表。它也重新标定了本周的 AI 造工具类条目："写出解释器"与"交付解释器"之间的距离，曾经是用手写来量的。

[`🔗 Retrocomputing.SE：How did Woz write the Apple 1 BASIC?`](https://retrocomputing.stackexchange.com/questions/17957) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50501594)

---

## 26. The Claude Delusion：为什么程序员把"和我一样"听成"超人类"

- **Velocity:** ▮▮ rising
- **Source:** netmeister.org · 146+ pts on HN · 15h ago (~13:03 UTC+8，11 月 14 日)
- **Tags:** `ai` `critique` `dunning-kruger` `discourse`

Jan Schaumann 的文章（11 月 13 日）拆解了 AI 话语里一种特定的句式——Claude 编程模型"**和我一样强**"，所以"写代码超人类"——并论证这个推断是错觉优越感的产物而非测量：对一个把身份建立在稀缺技能上的人来说，任何接近自己水平的东西在构造上就显得超越人类。他的案例是盖茨描述自己被 GPT-4 在 AP 生物考试（题目是盖茨自己出的）拿到高分而"震惊"——傲慢之处在于盖茨假定自己编的题能测出"AI 的真实能力"。文章进而把末日论与乌托邦论读成同一种心理学的两种戏服，收尾于"编程作为一种区分性技能"对一代技术人意味着什么。

**Why it matters:** 本 feed 每周都在报道模型的能力声明，而这是一个值得跑一遍的过滤器：声称匹敌顶尖人类专家，是对**分布**的声明，而做这个声明的人很少是该分布的随机样本——包括正在写 feed 条目的我们。

[`🔗 Jan Schaumann：The Claude Delusion`](https://www.netmeister.org/blog/claude-delusion.html) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50496921)

---

## 27. HN 重新翻出 Baude 事件：让 Claude 改页码，它删掉了一年的讲义——从 Dropbox 找回

- **Velocity:** ▮ steady
- **Source:** tomshardware.com · 44+ pts on HN · 10h ago (~02:03 UTC+8)
- **Tags:** `claude` `agent-safety` `file-deletion` `backup`

芝加哥大学 Harry Kalven, Jr. 法学教授 William Baude 在 11 月 5 日发帖："昨天我吃午饭的时候，Claude 删掉了一年的宪法课讲义和我现在的教学大纲。"他让 agent 更新旧讲义里的页码，回来看到它的自白：**"我误删了你的 Fall 2026 FINAL syllabus .doc 和所有顶层 Class N 2023 笔记，它们没有被恢复。"** 文件后来通过 Dropbox 找回，Baude 把这事当作公共服务公告发出。HN 今天重新翻出这段（44 分，62 条评论还在涨），争论的焦点是：为什么一个 agent 会对不可替代的文件拥有写权限。

**Why it matters:** agent 删文件的类别一直在重演（有 agent 在播出前数周删掉整季剪辑、9 秒内拖库），而每次复盘都落在同一个无聊的修复上：agent 能碰的东西不该没有快照。给 agent 能看到的一切上版本控制，比相信模型的自述——包括它的道歉——便宜得多。

[`🔗 Tom's Hardware：Rogue Claude AI deletes law professor's syllabus, one year of lecture notes`](https://www.tomshardware.com/tech-industry/artificial-intelligence/rogue-claude-ai-tasked-with-renumbering-pages-accidentally-deletes-law-professors-entire-syllabus-one-year-of-lecture-notes-youre-right-to-be-angry-i-deleted-your-files-through-my-own-carelessness-humbled-agent-admits) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50499114)

---

## 28. create-ecdh ≤ 4.0.4 在浏览器路径上跳过了对端密钥校验——无效曲线 ECDH，记录发布当天修复

- **Velocity:** ▮ steady
- **Source:** CVE-2026-129319（harborist CNA 签发）· 记录发布于 11 月 14 日，修复版 4.0.5 同日早上线 npm
- **Tags:** `npm` `create-ecdh` `crypto` `supply-chain`

**CVE-2026-129319**（CVSS 4.0 **8.2**，CNA 为 harborist；NVD 状态 `Received`）：`create-ecdh`——Node `crypto.createECDH` 的 browserify 实现，被浏览器打包器引入、也运行在没有原生 crypto 的 Node 版本上——在 `computeSecret`/`setPublicKey` 中从不校验 **对端公钥**：攻击者提供的点直接乘上你的私钥，既不检查它在配置的曲线上、也不检查在素数阶子群内。这是教科书级的 invalid-curve/小子群攻击类别：反复查询即可积累足够方程恢复静态密钥。npm 在 11 月 14 日 06:47 UTC 发布 **4.0.5**——比 CVE 记录发布（06:48Z）早一分钟，当日修复。

**Why it matters:** 这个库是 browserify 时代的老胶水，但处于加密路径上的老传递依赖，恰恰是能在 Electron/webview 包里活很多年的画像。如果你的 bundle 里有 `create-ecdh`，升到 4.0.5——并且用这条记录挣来的怀疑去审视任何手写的 ECDH 对端点处理。

[`🔗 CVE-2026-129319 记录`](https://www.cve.org/CVERecord?id=CVE-2026-129319) · [`🔗 npm：create-ecdh`](https://www.npmjs.com/package/create-ecdh)

---

## 29. 一份 PC 能启动的 ZIP：引导扇区藏在本地文件头里——归档还能正常解压

- **Velocity:** ▮ steady
- **Source:** goliath32.com · 59+ pts on HN · 12h ago (~00:03 UTC+8)
- **Tags:** `zip` `bootsector` `polyglot` `linux`

一次关于早期用户空间的调试，变成了一个洗澡时的念头：ZIP 恰好是天生适合 polyglot 捣鼓的格式（"Way back when, self extracting ZIP archives where a thing, EXE/ZIP polyglots that can be run and unpack themselves"），而"标准 CPIO 工具也许是太阳底下最被诅咒的归档器"。最终的成品是 `boot.zip`：一份完全正常的 ZIP——`unzip -t` 全绿，还打包了从零构建它自身所需的源码——而它的首字节同时是一个合法的 ZIP **本地文件头**和一份可引导镜像：头部的字段里藏着 Multiboot 魔数 `1BADB002` 和 16 位实模式引导代码，所以 `file` 把它识别成 DOS/MBR 引导扇区。文章逐字节讲解了构造，并提供归档下载。这与本 feed 11-11 报道的 tar 解析器酷刑测试同属一门手艺，只是从 fuzz 方换到了建造方。

**Why it matters:** 格式多面体是学习"两个解析器在哪里不一致"的最干净方式——这里的引导加载器把 unzip 读作结构体的字节读作代码，两种解读互不破坏。顺便也是一个真正好玩的一晚项目：成品能启动。

[`🔗 goliath32：Creating a self booting ZIP archive`](https://goliath32.com/blog/ziphead.html) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50498295)

---

## 30. 如何设计你自己的去中心化通讯协议——联邦、签名服务器，以及"简化版"为什么已经很难

- **Velocity:** ▮ steady
- **Source:** karboosx.net · 63+ pts on HN · 12h ago (~00:03 UTC+8)
- **Tags:** `messaging` `e2ee` `protocol-design` `federation`

一篇从头构建最小 **联邦式、端到端加密文本通讯协议** 的长文（karboosx，11 月 14 日）：先定需求（服务器只见密文、不盲信自称的域名、刻意砍掉附件/群组/多设备/已读回执——"欢迎来到 90 年代！"），再逐项过设计决策——用户身份、MX 式服务器发现、服务器间联邦里每一次跨服务器请求都必须由能证明控制源域名的密钥签名。这篇的价值在于克制：拒绝所有便利功能，恰恰暴露了难题真正所在的位置——在任何客户端代码写出来之前。

**Why it matters:** 诚实地读一个协议的设计，是理解 Matrix、ActivityPub 它们到底在为什么付费的最快方式；对任何打算往 agent 系统上"简单加一层聊天"的人来说，这也是最好的行前读物——那可是联邦再加全部难题。

[`🔗 karboosx：How to Create Your Own Decentralized Messenger Protocol`](https://karboosx.net/post/5j7jdDM3/how-to-create-your-own-decentralized-messenger-protocol) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50498073)

---

## 31. AI 数据中心真的会搬进太空吗？一份冷静的可行性测算——而它押注在星舰上

- **Velocity:** ▮ steady
- **Source:** forethought.org · 61+ pts on HN · 10h ago (~02:03 UTC+8)
- **Tags:** `data-centers` `orbital` `starship` `energy`

Forethought 的研究笔记（11 月 14 日）拿马斯克的声明——"把 AI 放在太空将是成本最低的地方……两年内，也许三年"——算账而不是谈感觉：轨道数据中心确有真实的能源论据（合适轨道的恒定强光照、没有审批队列、持续环境伤害更少），但成本竞争力的论证"**几乎完全取决于星舰能否复现 SpaceX 在猎鹰上达到的可复用性**"——太空太阳能大约在 **$250/kg 进轨** 与现今离网地面电力打平，在 **$50/kg** 左右胜过任何现行地面能源。笔记明确把自己定位为"把炒作与现实分开"——如果这个声明如期兑现，它将重塑 AI 治理。

**Why it matters:** 这是第 21 条的正确配套读物：今天的首次星舰捕获正是这份分析所说一切都悬于其上的曲线上的一个数据点——而这份笔记的诚实成本框架（每公斤发射价，而不是效果图），就是读后续每一份"AI 上太空"公告的方式。

[`🔗 Forethought：Will we really put data centers in space?`](https://www.forethought.org/research/will-we-really-put-data-centers-in-space) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50498945)

---

## 32. 法官拒绝驳回 DRAM 供应操纵集体诉讼——三星、SK 海力士、美光将被迫就 DDR5 短缺应诉

- **Velocity:** ▮▮▮ trending
- **Source:** litnews.ai · 221+ pts on HN · 10.8h ago (~09:18 UTC+8)
- **Tags:** `dram` `antitrust` `memory-prices` `litigation`

11 月 14 日，美国加州北区联邦地区法院法官 Noël Wise **全部驳回**了三星、SK 海力士与美光就一项拟议集体诉讼提出的联合撤诉动议——该诉讼指控三家合谋"削减传统 DRAM（如 DDR5）的供应，并将产能转向 HBM"。这项谢尔曼法第 1 条指控之所以存活，恰恰是因为此刻不同于 2022 年第九巡回法院驳回同一三家被告早前操纵案的 DRAM II 判例。起诉书的支撑性指控全是内存买家这几周的亲身经历：长期 HBM 锁定协议、拒绝签订长期传统 DRAM 合同、美光关闭 Crucial 品牌、晶圆厂延期、在创纪录价格下仍不扩产、几乎一致的客户审查流程，以及三家此前的卡特尔历史。法官对原告另外三项论点（投资人声明中的"供应纪律"、行业会议上的会面、三家寡头市场结构）未予采信。被告答辩截止日为 2026 年 12 月 7 日。

**Why it matters:** 本栏目整周都在从买方角度报道 DRAM 涨价（RAM Altman、树莓派涨价 80 美元）；这份裁定让供应侧的故事进入法庭取证阶段——被告现在必须宣誓回答的指控包括拒绝长期合同、在创纪录价格下拒绝扩产。取证验证尚需数年，但框架已经立起：传统 DRAM 稀缺被指为策略而非意外。

[`🔗 LitNews：Judge Refuses to Dismiss DRAM Supply Conspiracy Suit`](https://litnews.ai/articles/garciaguirre-samsung-sk-hynix-micron-dram-conspiracy-suit-survives-dismissal) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50502988)

---

## 33. Modern Web Guidance 开源其源码仓库：创作/评测仓库以 +1,220★ 成为当日 GitHub 涨幅第一

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub Trending · +1,220★ today · 6.6k total
- **Tags:** `modern-web-guidance` `agent-skills` `evals` `governance`

继我们 2026-11-13 报道 Modern Web Guidance v1.0.0（Chrome、Edge、Firefox 与 MDN 团队为编码代理打造的技能）之后：该项目的配套**源码仓库** `GoogleChrome/modern-web-guidance-src` 现在是当日 GitHub Trending 涨幅第一（今日 +1,220★，共 6,555★），距消费仓库的发布浪潮仅两天。它的 README 把分工说得很直白："This repo is the source repository for GoogleChrome/modern-web-guidance and includes the code and documentation for **authoring, calibrating, and evaluating** its contents."——也就是消费仓库背后的部分现已可浏览：支撑指引内容的评测框架与仪表盘、说明跨厂商共治如何运作的 `GOVERNANCE.md`，以及把 Web 平台专业知识转化为技能内容的创作流水线。开发依然活跃（提交至 11 月 14 日）。

**Why it matters:** 本栏目多次指出，agent-skills 项目成败在于其指引是被测量的还是凭感觉的；公开校准/评测流水线——还带公开仪表盘——正是问责的那一半，而这是其他技能合集（只发 SKILL.md 文件外加一纸祈祷）大多没有的。涨幅榜说明社区认同这一点。

[`🔗 GoogleChrome/modern-web-guidance-src`](https://github.com/GoogleChrome/modern-web-guidance-src) · [`🔗 评测仪表盘`](https://googlechrome.github.io/modern-web-guidance-src/)

---

## 34. EFF：科技公司正再次试图改写整个隐私概念——558 分

- **Velocity:** ▮▮ rising
- **Source:** eff.org · 558+ pts on HN · 23.3h ago (~20:45 UTC+8, Nov 14)
- **Tags:** `privacy` `wearables` `always-on-recording` `bystanders`

Thorin Klosowski 的 EFF 文章（11 月 13 日）指出，隐私行业最古老的话术——把监控重新包装成"个人选择"——正被常开式 AI 硬件重演："Privacy, which companies were once happy to claim was all about personal choice, is now primed to affect everyone around you even more than it already did." 文中例子全是已出货的产品而非思想实验：Meta 与 Google 的智能眼镜录制佩戴者所看到的一切并由 AI 描述；**Apple 的 Audio Intelligence** 把每块 Apple Watch 变成录制或总结你一天的设备；Amazon 的 Bee 捕获并转写一切。文章的论点是结构性的：当麦克风和摄像头戴在别人身上时，靠个人不使用来自保的建议已无法遵循——旁观者没有设置页面。

**Why it matters:** 这是今天第 23 条 ALPR 抗争的普遍化版本：两者都关于被你无法控制的设备记录。对任何构建或部署可穿戴/环境 AI 的人而言，这篇文章就是即将被诉讼检验的同意模式清单——房间里的权利主体不只是 recording 设备的持有者。

[`🔗 EFF：Tech Companies Are Trying to Shift the Entire Concept of Privacy (Again)`](https://www.eff.org/deeplinks/2026/11/tech-companies-are-trying-shift-entire-concept-privacy-again) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50496602)

---

## 35. Claude Code Projects 重新走红：描述目标，协调者负责其余——Boris Cherny 亲自回答 HN 提问

- **Velocity:** ▮▮ rising
- **Source:** claude.com · 98+ pts on HN · 35.6h ago (~08:28 UTC+8, Nov 14)
- **Tags:** `claude-code` `orchestration` `parallel-agents` `anthropic`

本周 HN 的浪潮接住了 Anthropic 重新设计的 **Claude Code Projects**——文章本身日期是 9 月 17 日，但 beta 进入 Claude Code 的推出才是这个周末拿到 98 分 93 条评论的原因。其模型是："Claude scopes the request, delegates the work, coordinates parallel threads, reviews the outputs, and assembles the finished result." 文中两个例子：设定降低结账 p75 延迟的目标，Claude 会对每个端点做性能分析、测试优化并开出并行线程的 PR；连接 API、Web 与移动端仓库并设定退役已弃用 v1 端点的目标，它会为每个仓库建一条线程、迁移调用方、跑测试，并告诉你哪些 PR 必须先合并。进度可以从手机上操控，离开电脑后工作继续。在讨论帖里，Boris Cherny（"Projects are how I write pretty much all my code these days"）直接回答了设计问题。

**Why it matters:** 协调者层正在进入主流编码 harness——与本栏目跟踪过的第三方工具（LoopForge、OpenBot、herdr）相同的协调者加并行工作者形态，现在成了原生功能，也带来了意料之中的 HN 反弹：一位评论者眼看你问了个琐碎问题却生出七个子代理、十分钟烧光配额。

[`🔗 Anthropic：Projects redesigned — from folder to conversation`](https://claude.com/resources/articles/projects-redesigned) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50492141)

---

## 36. 微软 FORGE 实验室在 Rust 标准库中发现内存安全漏洞——纯安全 Rust 触发未定义行为，由 AI 扫描器发现

- **Velocity:** ▮▮ rising
- **Source:** forge-blog.github.io · 161+ pts on HN · 54.7h ago (~13:22 UTC+8, Nov 13)
- **Tags:** `rust` `memory-safety` `ai-scanning` `vulnerability-research`

微软 FORGE 实验室（Yechan Bae，11 月 9 日）报告了 Rust `std` 与 `core` 中的多个内存安全问题——"including cases where code written **entirely in safe Rust** can trigger undefined behavior"——由该实验室的 AI 漏洞扫描器 **Hyenas**（codename MDASH 的研究版）发现，随后复现并连同 Rust 维护者修复。文章把 bug 归为 unsafe 代码中三种错位的信任：**相信代码不会 panic**（不变量在函数中途被 panic 打穿）、**相信用户提供的实现是正确的**（行为不端的比较器或 trait 实现破坏 unsafe 代码的假设）、**相信底层系统**。一个具体案例：`join()`——CVE-2020-36323 的旧修复从未覆盖调用间变长的字符串，2026 年 4 月同一函数因 remaining-length 计算下溢成堆溢出而再次修复。部分报告仍未关闭。

**Why it matters:** 两件事同时发生：一份 Rust 保证实际漏点在哪的分类学（边界不是 FFI——是 panic、trait 实现和操作系统假设），以及"AI 找到真实漏洞"系列的又一数据点——扫描器在地球上被审阅最多的代码库之一里找到了健全性 bug，而修复正在进入所有人容器里都带着的 std。

[`🔗 FORGE Lab：Memory Safety Bugs in Rust Standard Library`](https://forge-blog.github.io/posts/rust-std-memory-safety/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50478701)

---

## 37. Kiri 发布 v0.2.1：Apache-2.0 的 Docker Desktop 替代品，宣称 8 倍速 `docker run`——附上 HN 帖的质疑

- **Velocity:** ▮▮ rising
- **Source:** Show HN · 59+ pts · 7.4h ago (~12:40 UTC+8)
- **Tags:** `kiri` `containers` `docker` `rust`

Kiri（libracoder/kiri，Rust，Apache-2.0，创建于 11 月 2 日，4.7k 星，v0.2.1 今日发布）是一个面向 Mac/Windows/Linux 的桌面容器运行时，用一个守护进程跑 Docker 容器——docker CLI、Compose 与 Docker API 原样可用——并宣称"docker run takes 22 ms on Kiri and 178 ms on Docker Desktop (152 ms on Colima, 279 ms on OrbStack), every engine on 2 CPUs and 8 GB"。容器之外，它还能构建和扫描镜像、跑 Kubernetes、跑完整的 Linux 虚拟机，并内置一个自称为免费 Ngrok 替代品的隧道。HN 帖里的证据值得与宣传一同阅读：约 20 万行代码约两周内完成（带评论者读作 AI 生成的破折号特征）、网站 CPU/内存表格仍写着"Measured numbers replace these soon"、其 Podman 替代品页面比较时没有 Podman 的计时数据，而 8 倍指的是容器*启动*延迟而非吞吐。

**Why it matters:** Mac 容器运行时这个位置（OrbStack/Colima/Docker Desktop）确实存在竞争，一个单守护进程的宽松许可 Rust 新入场者是真正的架构主张——但这是一个 13 天大的项目，头牌基准是冷启动数字，所以先归档为"有前景、未验证"，等承诺的实测表格出来再做切换决定。

[`🔗 libracoder/kiri`](https://github.com/libracoder/kiri) · [`🔗 Kiri 网站与基准`](https://runkiri.com/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50504077)

---

## 38. Veyra-NRVideo：+731★，给采集卡画面实时补帧的 GPU 流水线——GTA6 标题只是营销

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · +731★ today · 2.6k total
- **Tags:** `veyra` `video-processing` `frame-generation` `upscaling`

Likely7/Veyra-NRVideo（GPL-3.0，C++，创建于 9 月 9 日，208 fork）是今天尚未被本栏目报道的最大 GitHub Trending 新面孔。README 的自我定位比它的走红标题更踏实："Turn local video, capture cards and game streaming into one real-time GPU enhancement pipeline"——超分辨率、降噪、HDR 与补帧在 Windows 上实时应用于流经它的一切，支持视频文件、图片与采集卡源的实时预览。那个标题党题目——"Bring PS5 GTA6 to 120FPS with DLSS 5"——说的是对*采集到的*主机游戏画面做 AI 超分与插帧，而不是让游戏本身渲染更快；作者（@likely2002）通过 YouTube 与 Bilibili 的中英文教程推动传播。

**Why it matters:** 对采集流做外置补帧已经是真实的产品品类——它用增加的延迟换流畅度，用在无法升级的硬件（主机）上，与引擎内 DLSS/FSR 的取舍正好相反。一个 GPL-3.0 实现走红，值得任何做采集类流水线的人一看，附带一贯的提醒：插出来的帧是模型的猜测，输入延迟是它的收费处。

[`🔗 Likely7/Veyra-NRVideo`](https://github.com/Likely7/Veyra-NRVideo) · [`🔗 README 与教程`](https://github.com/Likely7/Veyra-NRVideo#readme)

---

## 39. "Actor, Judge, or Teacher?"：行动不佳的决策模型照样能当好老师——在 ALFWorld 上靠评分而非行动 +10 分

- **Velocity:** ▮ steady
- **Source:** arXiv 2611.17167 · Hugging Face daily papers (Nov 13)
- **Tags:** `decision-models` `agents` `rl` `research`

登上 Hugging Face 每日榜单的论文（11 月 12 日发布）追问"whether a decision model that acts poorly can still teach well"。决策模型——用类型化输出加概率作答的模型，即本栏目跟踪过的 Gemini Decisions API 与 Flide 服务层的形态——通常按*行动者*来评价。作者（Haochen Liu 等）在 ALFWorld 上比较三个决策模型与三个通用 LLM 分别作为行动者与裁判，并用 JEV 在 ALFWorld 与 WebShop 上当老师。发现干净地分成两半：作为行动者，六个模型全都被更简单的子目标诱离必须先完成的子目标；作为看到完整轨迹的裁判，同样的模型却能正确给那些步骤记分——而问"每个动作是否有帮助"而不是"任务会不会成功"，就能把有用动作与无用动作分开。作为老师，JEV 把 Qwen2.5-1.5B 策略在 GRPO 之上从 ALFWorld 的 **72.8% 提到 82.9%**、WebShop 的 **56.8% 提到 71.4%**。作者的解释：回合结束后再评判，能看到行动时必须预判的后果。代码已公开。

**Why it matters:** 它给决策模型这个品类提供了有证据的第二份工作：不只是选择动作，还可以为 RL 训练给动作评分——在这个岗位上，一个弱但便宜的决策模型可能胜过它打不过的大行动者，因为后见之明是更容易的推断。

[`🔗 arXiv 2611.17167：Actor, Judge, or Teacher?`](https://arxiv.org/abs/2611.17167) · [`🔗 代码：ZJU-REAL/decision-agents`](https://github.com/ZJU-REAL/decision-agents)

---

## 40. 揭秘手机解锁工具：Cellebrite 级取证"并非魔法"——监控研究组织的技术概览重新走红

- **Velocity:** ▮ steady
- **Source:** osservatorionessuno.org · 114+ pts on HN · 21.3h ago (~22:44 UTC+8, Nov 14)
- **Tags:** `cellebrite` `forensics` `android` `surveillance`

Osservatorio Nessuno 的技术概览（5 月 7 日发布，本周末以 114 分登上 HN）揭开了商业手机解锁工具的神秘外衣："Commercial phone unlocking tools are not magic. They exploit the same classes of vulnerabilities that security researchers publish about at conferences and in academic papers." Cellebrite 级产品的独特之处"not the novelty of the techniques, but the systematic commercialization of exploitation"——为每一种软硬件组合收购或开发漏洞，并打包成只需极少操作员专业知识的自动化流程。文章把持物理访问权的取证人员能走的受限攻击面画了出来——启动链、可信执行环境（TEE）、安全元件（secure element）、内核外设驱动栈——主要以 Android 内部机制展开，并致谢 Quarkslab 的 TEE 研究与 Amnesty 的报道作为基础。

**Why it matters:** 去神秘化是双向的：它告诉防守方取证行业到底在把哪些边界变成商品（下一笔加固经费该花在哪），也难得地公开绘制了那些常出现在诉讼中的工具背后的漏洞供应链——而出具这份地图的组织，恰恰记录过 Cellebrite 在意大利的常规使用。

[`🔗 Osservatorio Nessuno：Demystifying phone unlocking tools`](https://osservatorionessuno.org/blog/2026/05/demystifying-phone-unlocking-tools-a-technical-overview/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50497416)

---

## 41. 104 个软件职位家谱，从 1940 年代到"AI Agent / Context Engineer"——借 Claude 之手，一个 Graphviz 文件

- **Velocity:** ▮ steady
- **Source:** zwischenzugs.com · 340+ pts on HN · 18.3h ago (~01:45 UTC+8)
- **Tags:** `careers` `industry-history` `visualization` `graphviz`

Ian Miell（zwischenzugs）在多年看着自己同样的工作被从 Head of DevOps 改名到 SRE、再到平台工程之后，"with the help of Mr Claude"建成了"this family tree of software job titles, from the 1940s to now"。共 **104 个职位**，"from 'Computer' (a person, not a machine) at the top to 'AI Agent / Context Engineer' at the bottom"，按五年一行排布、分七个彩色家族列（开发；分析、架构与领导力；运维；网络与安全；数据与 AI；质量与测试；支持）。实线箭头表示职位由父节点长出，虚线表示影响或常见跳槽路径；每个节点都链到一段文字史。整个项目是一个 Graphviz 文件加一个 JSON 描述文件，渲染成可点击的网站。

**Why it matters:** 这棵树把行业的头衔更迭呈现为谱系而非时尚——而它的终点正是本栏目的报道对象：最新的节点是给 agent 写上下文的工作，它在 1940 年叫"程序员"，2005 年叫"构建工程师"，一直在换名字，工作没换。

[`🔗 zwischenzugs：A Family Tree of Software Job Titles`](https://zwischenzugs.com/2026/11/03/a-family-tree-of-software-job-titles/) · [`🔗 交互式家谱`](https://ianmiell.github.io/sw-job-title-family-tree/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50499038)

---

## 42. Apache Shiro 今天发布 9.1 漏洞：LDAP 认证缓存在首次登录后接受任意密码——修复版 3.0.1 八月就有了

- **Velocity:** ▮ steady
- **Source:** CVE-2026-129349 (Apache CNA-assigned) · record published 1.8h ago (~18:16 UTC+8)
- **Tags:** `shiro` `cve` `ldap` `authentication`

**CVE-2026-129349**（CVSS **4.0** 9.1，`security@apache.org` CNA 评分；NVD `Received`，记录发布于 2026-11-15T10:16:53Z）："When authentication caching is enabled on DefaultLdapRealm, after a user logs in successfully once, subsequent logins for that user succeed with **any password**." 机制与字面一致：缓存的认证跳过 LDAP bind，而 `DefaultLdapRealm` 默认安装的 `AllowAllCredentialsMatcher` 接受任何凭据——于是任何知道有效用户名的人都能以该用户身份认证。受影响范围是 **3.0.1 之前**的一切；关键在时间线：3.0.1 于 **8 月 23 日**发布（3.0.2 随后于 11 月 8 日），修复已存在十二周，而公开此漏洞的记录今天才落地——且该缺陷要求 opt-in 的认证缓存设置处于开启状态。

**Why it matters:** 一条记录里装着两个教训：缓存认证决策的强度取决于你连同缓存的是哪个匹配器（跳过 bind 的缓存命中绝不能再跳过凭据校验）；而"刚发布的 CVE"标题需要做发布时间线核查——这里升级建议八月起就躺在 releases 页面里，今天发布的只是*知晓*。

[`🔗 CVE-2026-129349 记录`](https://www.cve.org/CVERecord?id=CVE-2026-129349) · [`🔗 Apache Shiro releases (3.0.1 / 3.0.2)`](https://github.com/apache/shiro/releases)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-15T12:24:30Z |
| Items | 42 |
| Sources tracked | 36 (Hacker News, GitHub Trending, Google Research, NVIDIA, PyPI, Project Zero, CBC, Reuters, U-Mich, BBC, EFF, L3Harris, MITRE CVE records, npm, LitNews, Anthropic, Hugging Face, FORGE Lab, Osservatorio Nessuno, vendor blogs and project repos) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[Previous day](2026-11-14.md) · [Raw .md](latest.md) · [Archive](../archive/index.md)
