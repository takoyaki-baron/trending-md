---
date: 2026-10-17
updated: 2026-10-16T20:30:00Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 22
license: CC-BY-4.0
---

# 趋势速递 — 2026-10-17

## 1. Tesla 终于发布新一代 Roadster — 引爆 HN 的表演是汽车跳过半挂卡车

- **Velocity:** ▮▮▮ trending
- **Source:** Tesla + Hacker News · 763+ pts · ~18.8小时前 (~09:32 UTC+8)
- **Tags:** `tesla` `ev` `hardware` `launch`

第二代 Roadster 于 10 月 15 日举行发布会（距最初宣布约 9 年），HN 上 763 分、1300+ 评论的讨论热帖围绕直播演示展开：这辆车**跳过了一辆半挂卡车**。据媒体报道的参数：0–60 mph 约 1.9 秒（Performance 版宣称低于 1.6 秒）、极速 250+ mph、约 200 kWh 电池包带来 620 英里续航、预期售价 20–25 万美元、**2028 年投产**。评论区泾渭分明：一边是"我看过的最惊人的技术演示"，另一边是"这不是飞行汽车，是会跳的汽车"——还有一个与开发者相关的细节：发布会后数小时内，AI 生成的"马斯克加密货币翻倍"骗局视频就占据了 Google 搜索结果的前列。

**Why it matters:** 各项参数来自媒体报道、未经独立验证，交付还要等两年——把它当作演示而非量产产品来看。真正值得记录的是两点：跳卡车演示背后的工程（Tesla 此前宣称的冷气体推进器，规模化仍未验证），以及 AI 垃圾内容 SEO 殖民发布会传播的速度——在发布会最大的搜索时刻，骗局视频排到了 Tesla 官方页面之上。

[`🔗 Tesla: Roadster`](https://www.tesla.com/roadster) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50112657)

---

## 2. Postgres 19 因 LLM 辅助评审发现的 bug 多到人类修不完而延期 — 约 40 份缺陷报告，8–10 个特性被回退

- **Velocity:** ▮▮▮ trending
- **Source:** The Register + peter.eisentraut.org + Hacker News · 149+ pts · ~4.4小时前 (~23:55 UTC+8)
- **Tags:** `postgresql` `database` `ai-review` `oss-maintenance`

PostgreSQL 19 从 9 月底/10 月初推迟到 **11 月 19 日前后**发布：LLM 辅助代码评审（由 Postgres 开发者自己作为常规流程执行，并非集中式的"AI 评审员"）发现了**约 40 份缺陷报告**，社区在发布前修不完。committer Peter Eisentraut（EDB）表示有 8–10 个重要特性被回退到 v20，分两类：一些存在"重大架构缺陷"，AI 还找出了长尾的边界情况问题——"以前这些会在发布后以补丁形式在大约五年间陆续浮现"。他明确否认是 vibe coding 所致——这些特性写于评审工具质量在周期中途跃升之前。注意事项也记录在案：架构问题在 AI 评审之前就存在（Tom Lane 曾在发布前就 SQL/PGQ 图查询特性发出警告），且回退数量是约数。

**Why it matters:** 这是第一个*因为评审工具在周期中途超越了自己的特性*而推迟发布的主流开源项目——实际质量门槛在代码处于 beta 时移动了，四十个修复的固定开销塞不进冻结前的时间。Eisentraut 预计下个周期会自我修正；这只在评审能力停止以当前速度改进时成立——而这正是本 feed 不愿做的假设。

[`🔗 The Register`](https://www.theregister.com/databases/2026/10/16/postgres-19-delayed-after-ai-reviewers-find-more-bugs-than-humans-can-fix/5303471) · [`🔗 Eisentraut: The reverts will continue until morale improves`](http://peter.eisentraut.org/blog/2026/10/09/the-reverts-will-continue-until-morale-improves) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50119991)

---

## 3. Big Fish：一个存在 37 年的 OpenBSD 内核 bug 被打到 root — SMAP、SMEP、KARL 全部开启

- **Velocity:** ▮▮▮ trending
- **Source:** calif.io + Hacker News · 139+ pts · ~5.6小时前 (~22:44 UTC+8)
- **Tags:** `openbsd` `kernel` `exploitation` `privilege-escalation`

calif.io 的 "Big Fish" 报告（10 月 16 日）详细剖析了 SysV 共享内存挂载计数器（`shm_nattch`）中的**有符号 16 位整数溢出**——该 bug 可追溯到最早的 BSD 源码，约 37 年历史。溢出后经竞态条件触发 **use-after-free**，得到一个 write-what-where 原语，把用户态内存写入内核空间：本地提权到 root **全程不需要任何信息泄露漏洞**，并在启用 KARL、SMAP、SMEP 的 OpenBSD 上演示成功。利用需要映射 127 个 shm 段、fork 约 259 个进程、赢得一次竞态，并通过 `sysctl(KERN_MALLOCSTATS)` 做堆整形——可靠性来自内核早期分配在每次启动时落在可预测地址。已在 **OpenBSD 7.9 errata 026/018** 修复；页面声明该 bug 没有 CVE 编号。仅限本地利用，文中提出的缓解措施（分配器随机化、safe-unlinking、边界消毒器）是建议而非已发布的修复。

**Why it matters:** OpenBSD 的整个威胁模型正是假设存在一个有决心的本地攻击者，而这条链用 1980 年代以来一直是 `short` 的一个计数器击穿了它最强的运行时防御。"不需要 infoleak"是其中最罕见的部分——确定性的分配替它完成了泄露。如果你运维多用户 OpenBSD 主机，errata 是行动项；论文的缓解清单是研究方向。

[`🔗 calif.io: Big Fish`](https://calif.io/research/big-fish) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50118977)

---

## 4. Claude 解决了 30 年的密码学历史悬案：NIST 曲线种子来自 `lrand48()` 和一个 1997 年的时间戳 — Solinas 口令短语的故事是错的

- **Velocity:** ▮▮ rising
- **Source:** Anthropic Research + Hacker News · 244+ pts · ~1.4小时前 (~02:55 UTC+8)
- **Tags:** `cryptography` `ecdsa` `nist` `ai-research`

Anthropic 的披露（10 月 16 日）解释了 NIST 椭圆曲线背后从未公开的"种子值"——长期被传暗藏后门、又被归因于 NSA 的 Jerry Solinas 散列"Give Bob and Jerry a raise"之类短语的数字。那个故事是**错的**：全部五条素数曲线的种子（P-192 到 P-521）都是 `lrand48()` 以 `srand48()` 播入一个 **Unix 时间戳**后输出的第 *n* 个 20 字节候选值——P-256 是 **1997 年 8 月 16 日**那一次的第 1842 个候选。四条二元曲线的种子追溯到 1998 年 4 月 17 日的时间戳（播入前减半）；六个基点来自 Lenstra 的 FreeLIP 随机数发生器与小整数种子。一个内部研究模型在无任何提示的情况下拿到这个开放问题，**半小时内**解决：它注意到四个种子的最高位全为零（约 1/5810 的巧合——`lrand48` 截断 31 位输出的特征），暴力枚举 2¹⁷ 个状态位，再用 LLL 格基约化反推时间戳。公开的 Python 代码精确重现了全部 14 个已发布种子；36,864 美元奖金捐给 ISRG。Anthropic 明确了局限：**这不是密码学破解**——可重现性反而*增强*了曲线无后门的信心；部分被跳过的候选曲线选择标准未知；B-163 种子与若干基点仍未解释。

**Why it matters:** 一个关于信任关键基础设施的 30 年开放问题被关闭，且发现可被任何人机械验证——模型找到了统计信号，公开代码就是证明。这也是罕见的"AI 做成了 X"的故事：产出物是一段可重现的脚本而非一个断言，剩余未解的种子被坦率列出而非掩埋。

[`🔗 Anthropic: ECDSA curve origins`](https://www.anthropic.com/research/ecdsa-curve-origins) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50122800)

---

## 5. 美国 90% 的工作时长落在 AI 基准照不到的地方 — Mercor 把 29 个基准映射到 O*NET 经济全景

- **Velocity:** ▮▮ rising
- **Source:** Mercor Research + Hacker News · 251+ pts · ~3.2小时前 (~01:08 UTC+8)
- **Tags:** `benchmarks` `labor-economics` `evals` `ai-impact`

Mercor 的基准地图（HN 251 分）把 29 个公开 AI 基准与美国劳工部 O*NET 分类法（923 个职业、18,797 项任务）交叉比对，发现**约 90% 的美国工作时长落在几乎或完全没有基准覆盖的任务上**。923 个职业中只有 **208 个**至少有一项任务被 5 条以上基准提示覆盖；18,797 项任务中仅 924 项被覆盖。偏斜是系统性的：AI 暴露度高的任务被基准化的概率约为其他任务的 6 倍；职业内最重要任务的覆盖率是最不重要任务的 6–10 倍；覆盖与工资总额相关——律师被充分测量，法律秘书和法庭书记员则没有。局限部分做了实事：29 个基准的清单不完整（以无法界定的方式把覆盖估计压低）、"经济真实性"是主观标准、约 63% 的美国岗位包含基准无法触及的体力工作。

**Why it matters:** 所有"智能体已经能做 X% 的经济工作"的说法都继承了这个盲区——被测量的切片由"什么容易测"决定，而那与工资总额和厂商兴趣相关，与经济权重无关。把它读作一个声明了偏差的校准工具（Mercor 本身卖评测数据），而非 ground truth；值得引用的数字是那个 6–10 倍的重要性偏斜。

[`🔗 Mercor: benchmark map`](https://www.mercor.com/research/labor-index/benchmark-map/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50121179)

---

## 6. Apple 发布基于雷雳 5 的 MLX 分布式推理 — 四台 Mac Studio 上把 Meta 816B 的 Muse Spark Open 跑到 36.7 tok/s

- **Velocity:** ▮▮ rising
- **Source:** Apple ML Research + Hacker News · 213+ pts · ~6.6小时前 (~21:43 UTC+8)
- **Tags:** `mlx` `apple-silicon` `distributed-inference` `thunderbolt`

继昨日报道 Meta 的 Muse Spark Open 发布之后：Apple 的 ML 研究文章（10 月 16 日）给出了具体的桌面路径。新版 **MLX v0.30.1+** 加入**雷雳 5 上的 RDMA** 驱动（macOS 26.2）与 `jaccl` 通信后端，并通过 `mlx.launch` 提供流水线和张量并行。在**四台 M5 Ultra Mac Studio**（各 512 GB 统一内存、1.2 TB/s 带宽）上，量化到 **NVFP4** 的 Muse Spark Open 816B-A42B 解码达 **36.73 tok/s**——高于阅读速度；该模型 BF16 需超 1.6 TB、4-bit 也需约 493 GB，*单机根本放不下*。M5 Ultra 对比 M3 Ultra：首 token 时间最高快 4.6 倍。注意事项异常完整：MoE 模型的跨机扩展*劣于*稠密模型；张量并行在 64k 上下文时拖累 Muse Spark 的 prefill（专家输出的归一化各自独立）；流水线并行对解码速度几乎无提升；且解码只测了 128 个 token。

**Why it matters:** "在家跑前沿开源权重"的故事有了消费级互连——不用 InfiniBand，一根雷雳线——而 Apple 刚刚让自己的芯片成为它的参考硬件。诚实同样重要：头条数字是 4-bit 的，MoE 集群化不佳，而 Apple 把这些都发表了。

[`🔗 Apple ML: MLX 分布式推理`](https://machinelearning.apple.com/research/mlx-distributed-inference) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50118320)

---

## 7. NVIDIA 的 Nemotron 3.5 Super VL：120B-A12B 开源多模态 MoE — 以及一个值得指名的基准宣传落差

- **Velocity:** ▮▮ rising
- **Source:** NVIDIA Developer Blog + Hugging Face · 10月15日发布
- **Tags:** `open-weights` `nvidia` `moe` `multimodal` `agents`

NVIDIA 发布了 **Nemotron 3.5 Super VL**（120B 总参 / 12B 激活，自 Nemotron 3 Ultra 蒸馏的混合 Mamba-Transformer MoE）与 **Nemotron 3.5 Bolt 74B-A9B**——已在 Hugging Face 验证提供 NVFP4、BF16 和 Base-BF16 权重，Bolt 的 24GB 检查点加上 GGUF 已有约 2.68 万次下载，4B 级的 Bolt E4B 定于 10 月 23 日。发布打包了全栈：权重、配方、数据集（与 AI4Bharat 合作的约 2.8T 印度语言 token）和 RL 环境。厂商数字：Hermes Bench 63.44%（对比 Ultra 的 56.33%）、CharXiv 80.8%（带代码解释为 84%）、智能体任务吞吐"最高 5 倍提升"。**厂商文章里没有的：任何与 Claude 或 GPT 模型的正面对比表**——对比对象是同门 Nemotron 与同尺寸*开源*模型，"Claude"仅作为七个评测 harness 之一出现，图表是无数据可提取的图片，吞吐数字是"最高"式的厂商预期。声称它"击败 Claude Opus 5 和 GPT-6.1 Sol"的二手报道，在转述一手来源没有做出的断言。

**Why it matters:** 权重+数据+RL 环境的捆绑是本月美国实验室给出的最完整开放方案，24GB 的 Bolt 把一个 74B 多模态模型放上单张消费级 GPU。但本 feed 反复验证的教训再次适用："击败前沿"的叙事活在报道里，不在源文件里——引用 Hermes 和 CharXiv，别引用标题。

[`🔗 NVIDIA: Nemotron 3.5 Super VL`](https://developer.nvidia.com/blog/nvidia-nemotron-3-5-super-vl-powers-specialized-agents-with-multimodal-reasoning) · [`🔗 Hugging Face: NVFP4 检查点`](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Super-VL-120B-A12B-NVFP4)

---

## 8. 九个旗舰模型限时一小时写《星际争霸》Bot — GPT-6 Astra 夺得 StarSkirmish v0.2，但只有 7% 的胜率能赢人类顶级 Bot

- **Velocity:** ▮▮ rising
- **Source:** StarSkirmish + Hacker News · 150+ pts · ~6小时前 (~22:18 UTC+8)
- **Tags:** `benchmark` `code-agents` `gamedev` `starcraft`

StarSkirmish Bench v0.2（Show HN，150 分）不是让模型*玩*星际——而是让它们在一小时真实时间内**用 C++ 写一个有竞争力的 Protoss bot**（BWAPI 4.4.0，跑在 OpenBW 上），起点是只有采矿逻辑的骨架加三个示例 bot 和两个库。v0.2 的升级：每个模型跑在各自实验室的第一方 CLI harness 里（Claude Code、Codex、Antigravity、Muse Code），推理力度拉满。**GPT-6 Astra 夺冠**；GPT-6.1 Sol 第二，单次运行成本约为 Astra 的十分之一；Gemini 4 Argon、Claude Opus 5.5 与 Claude Fable 5.1 以 37–39 分战平。得分的最强预测因子是早期就与七个最强 roster bot 练习对战（其中 S 级是人类职业选手 Stardust 与 PurpleWave）。注意事项就是内容本身：Astra 的 bot 对人类顶级 bot 的胜率**只有 7%**；只用三张双人对战地图；运行间方差最高 18 分（Argon）；与重度评测过的基准的相关性正在瓦解（对 AA Intelligence Index 仅 ρ 0.26），而长程编程测试之间仍相互关联。

**Why it matters:** 一个 harness 中立的长程编程评测，其中"与强敌练习的策略"是取胜变量——这是关于智能体行为的发现，而不只是一个排行榜。它的自我诊断（流行基准可能已成调参目标）则是基准界对 Goodhart 定律的实时自白。

[`🔗 StarSkirmish Bench v0.2`](https://starskirmish.com/bench/v0-2/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50118688)

---

## 9. KEV 新增两项：BeyondTrust Remote Support 认证绕过（NVD 评分 9.8）与一个 6.5 分的 Fortinet 路径穿越遭活跃利用

- **Velocity:** ▮▮ rising
- **Source:** CISA KEV + NVD · 2026-10-16 收录
- **Tags:** `cve` `kev` `beyondtrust` `fortinet` `pam`

CISA 的 KEV 目录于 10 月 16 日新增两项。**CVE-2026-102764**——BeyondTrust Remote Support，通过伪造进行认证绕过（CWE-290），可实现远程文件操作；10 月 15 日发布，次日进 KEV，联邦部门修复截止 **10 月 19 日**。溯源已查，且颇具教学意义：NVD 记录状态为 **Analyzed**，带有来源为 `nvd@nist.gov` 的 CVSS 3.1 **9.8**，并列有 CNA 赋分的 **9.3**——"NVD 是否分析、NVD 是否给分"两个问题的答案都是"是"。我们*无法*验证的：据抓取，BeyondTrust 信任中心的公告页面没有列出点名该 CVE 的公告（最新为 8 月的 BT26-04）——因此补丁状态**未确认**；把 KEV 截止日当作最后期限。**CVE-2025-61624**——Fortinet 的 FortiOS、FortiPAM、FortiProxy 与 FortiSwitchManager，**2026 年 4 月**发布的已认证路径穿越（CWE-22），NVD 6.5 / Fortinet CNA 6.0，现已进 KEV——提醒大家：正在被利用的集合与高分集合的重叠是松散的。

**Why it matters:** BeyondTrust 是特权访问管理（PAM）——其全部职责就是守卫核心凭据的产品——因此这里出现免认证旁路是结构性事件而非例行公事。而 Fortinet 那条是本周最干净的一次"评分 vs 遭利用"倒置：没有人会把 6.5 分当优先级去修，这正是它十个月后仍然可被利用的原因。

[`🔗 NVD: CVE-2026-102764`](https://nvd.nist.gov/vuln/detail/CVE-2026-102764) · [`🔗 CISA KEV 目录`](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)

---

## 10. diagram-design：一周 5.6 万星的反 Mermaid 方案 — 智能体画的图 = 一个自包含的 HTML+SVG 文件

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · 56,365★ · 本周 +10.2k
- **Tags:** `agent-skills` `diagrams` `svg` `visualization`

cathrynlavery/diagram-design 登顶本周 GitHub 趋势榜：**56.4k★**（七天 +10.2k，10 月 16 日仍有推送，MIT 协议）：一个智能体技能，把自然语言提示（"画一个带 401 刷新 token 的 bearer 调用时序图"）变成**一个自包含的 HTML+SVG 文件**——45 种图类型，"无阴影、无 Mermaid 垃圾感"，对照编辑设计规范逐一校验。经仓库验证：onboarding 命令会抓取你站点的配色与字体，让图表匹配品牌；支持从 drawio/Mermaid/Excalidraw 导入；PNG/SVG 导出；CI 覆盖每种图类型变更；通过 `npx skills add` 安装，分发于 Claude Code、Codex、Copilot、Gemini CLI、Cursor、Cline、Windsurf、Amp 的插件市场。仓库创建于 2026 年 4 月——本周的爆发是技能货架浪潮的到来；诚实说明：除 Trendshift 与市场分发外，本 feed 未能锁定本周加速的单一触发事件。

**Why it matters:** 智能体技能货架持续批量产出"选定一种产物格式并把它做精"的垂直赢家——而"图表 = 一个可 diff、零依赖、智能体可再生的文本文件"正是机器创作时代最对的格式。"反 Mermaid"的定位本身就是论点：智能体输出需要编辑级质量标准，而不是默认渲染器。

[`🔗 cathrynlavery/diagram-design`](https://github.com/cathrynlavery/diagram-design) · [`🔗 skills.sh 页面`](https://skills.sh/cathrynlavery/diagram-design/diagram-design)

---

## 11. "我爱软件渲染"：Quake 800×600 锁 60 帧，每个像素由 CPU 亲手绘制 — 而且是故意的

- **Velocity:** ▮▮ rising
- **Source:** jamesfmackenzie.com + Hacker News · 256+ pts · ~7.5小时前 (~20:52 UTC+8)
- **Tags:** `retro-gaming` `rendering` `demoscene` `graphics`

James Mackenzie 的文章（HN 256 分）主张在真实 DOS 硬件上用游戏自带的软件渲染器运行原版 DOS 游戏——不用 DOSBox，不用移植版。数字是钩子：**Quake 在一台 Dell OptiPlex 380 上以 800×600 锁定 60fps**——1996 年的硬件望尘莫及的分辨率（而据 Rasteri 的视频，连 3.3 GHz 四核至强也推不动 Shadow Warrior 的 1600×1200）。美学论证：逐像素纹理采样让 texel 保持锐利，而 3dfx 时代的双线性过滤把它们糊掉；256 色调色板的查找表光照产生的色带读作质感而非瑕疵。设计意图也是论点的一部分——Quake、Doom 与 Build 引擎都是软件渲染优先，GLQuake 和 3dfx 模式是后来加上的——作者也承认边界（Tomb Raider 的水下关卡确实加速后更好看）。

**Why it matters:** 本 feed 两天内第二篇美学反弹之作（上一是 10 月 16 日登顶 HN 的拟物风桌面 DEsk）——两者从不同媒介抵达同一结论：早期计算的"局限"是一种设计语言，无限保真度反而将其抹平。还有一条安静的硬件注脚：一台 12 年前的办公台式机如今是一台 1996 年的超级计算机。

[`🔗 I Love Software Rendering`](https://www.jamesfmackenzie.com/2026/10/13/i-love-software-rendering/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50117746)

---

## 12. JPEG XL vs AVIF，认真测过：AVIF 赢照片、截图与透明通道 — 但 jixel 改写了 JPEG XL 的故事，无损是 JXL 的地盘

- **Velocity:** ▮▮ rising
- **Source:** jakearchibald.com + Hacker News · 129+ pts · ~4.1小时前 (~00:12 UTC+8)
- **Tags:** `jpeg-xl` `avif` `web-performance` `image-formats`

Jake Archibald 的对比（HN 129 分）在匹配 SSIMULACRA2 质量下测试现行编码器——avifenc 1.4.2、libjxl 0.12.0，以及**jixel 0.4.2**（更新的第二个 JPEG XL 编码器）。要点：有损照片上，最优 JPEG XL 比默认力度 AVIF **大 15–25%**（最大力度下 6–20%）；截图与 UI 上大 30–90%；透明通道上最高大 70%。中等质量下 AVIF 解码还快约 2–3 倍。但编码器格局变了：jixel 的体积通常优于 libjxl，libjxl 的最大力度慢约 18 倍却几乎无增益，而 JPEG XL 保住三项真实优势——**无损**（比 WebP 小 9–17%、比 AVIF 小 30–120%）、JPEG→JXL 无损转码（省 9–20%）、以及高力度下近乎免费的渐进式渲染。他的默认选择：**AVIF 4:4:4，力度拉到你能容忍的最高**，只有当 AVIF 输出异常偏大时才求助 jixel。

**Why it matters:** JPEG XL 已进入所有主流浏览器，实践问题从"会不会被支持"翻转为"什么时候该用它"——答案比 2022 年的炒作窄，但不为空（归档、无损管线、存量 JPEG 缩减）。值得偷师的元教训：一个独立的第二编码器给一种格式带来的数字改善，超过了多年布道的总和。

[`🔗 JPEG XL vs. AVIF for web use-cases`](https://jakearchibald.com/2026/jpeg-xl-vs-avif/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50120224)

---

## 13. Waymo 进入加拿大：多伦多车辆本周上路 — 先人工驾驶 — 目标 2028 年载客

- **Velocity:** ▮▮ rising
- **Source:** Waymo Blog + Hacker News · 142+ pts · ~5.6小时前 (~22:44 UTC+8)
- **Tags:** `autonomous-vehicles` `waymo` `canada` `robotaxi`

Waymo 的多伦多公告（HN 142 分、256 评论）是其首个加拿大市场：车辆将于"未来几天"出现在多伦多街头，但**以人工驾驶方式**——分阶段序列为高精地图、安全员测试、验证，目标（而非承诺日期）是 **2028 年**迎来首批乘客。总部位于多伦多的 Element Fleet Management 负责车队运营；承诺"数百个岗位"。安全口径引用 4 亿+ 公里全自动驾驶里程、相对人类减少 95% 的重伤及以上事故。文章没有的：车队规模、定价、服务范围、街区明细——且 2028 明确是"目标"。

**Why it matters:** 十一月的多伦多是 Waymo 在北美尚未公开面对的冬季气候压力测试——积雪覆盖的车道线与自行车道是每个自动驾驶讨论里的标准反对意见。两年 runway 也让它成为监管风向标：安大略省对"去掉安全员"阶段的要求，将成为加拿大扩张的模板。

[`🔗 Waymo in Toronto`](https://waymo.com/blog/2026/10/waymo-in-toronto/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50118981)

---

## 14. "伪装成买断的租赁"：Torres 众议员提出 Power to the Players 法案 — 真实所有权 + 强制离线模式

- **Velocity:** ▮ steady
- **Source:** ritchietorres.house.gov + Hacker News · 161+ pts · ~4.3小时前 (~00:03 UTC+8)
- **Tags:** `game-preservation` `policy` `ftc` `consumer-rights`

众议员 Ritchie Torres（纽约第 15 选区）宣布立法（10 月 15 日），指示 **FTC** 制定游戏购买规则：购买游戏应授予真实所有权而非可撤销许可；带在线功能的游戏必须在服务器关停**之前**提供**离线模式**。触发案例很具体：售价 69.99–99.99 美元的 NBA 2K25 将于 10 月 30 日从数字商店下架、12 月 31 日关停服务器——距发布仅两年。Torres："一家公司拔掉插头的瞬间就能收走的游戏不是购买。它是伪装成买断的租赁。"

**Why it matters:** "Stop Killing Games"运动已经抵达美国法案文本，并带有执行路径（FTC 规则制定）——慢但真实。对开发者社区，第二个条款是承重墙：离线模式强制要求是一项带架构成本的保护义务，业界对本案的回应将决定"退役规划"是否会像隐私政策那样成为发布清单的固定项。

[`🔗 Power to the Players Act 公告`](https://ritchietorres.house.gov/posts/rep-torres-announces-power-to-the-players-act-legislation-to-ensure-gamers-own-their-games) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50120101)

---

## 15. eBay 按 FCC 新市场规则限制无线电设备上架 — 仅业余频段设备获豁免

- **Velocity:** ▮ steady
- **Source:** ARRL Letter + Hacker News · 88+ pts · ~2.2小时前 (~02:06 UTC+8)
- **Tags:** `fcc` `ham-radio` `marketplace` `compliance`

据 ARRL 10 月 15 日的会刊（HN 88 分）：eBay 现要求需要 FCC 认证的无线电设备在商品列表中展示 **FCC ID**——落实 FCC 2026 年 7 月 23 日的第三次报告与命令（10 月 13 日生效），该规则让在线市场对其平台销售的未授权射频设备承担法律责任，定性为防范国家安全风险的供应链保护。eBay 向 ARRL 确认：**仅**在业余无线电频段工作的设备豁免、无需 FCC ID；可在业余频段之外发射的无线电仍需认证。豁免同时覆盖既有商品列表、小卖家与二手设备；ARRL 强调 FCC 没有改变针对业余设备的核心设备认证规则（商用 HF 放大器除外）。

**Why it matters:** 合规负担从进口商转移到了平台——与重塑消费品市场的责任转移同构，如今落到射频设备上。对硬件黑客社区的实用解读：纯业余频段设备继续自由流通，但多频段廉价收发器（ESP32 与 LoRa 一类的灰色市场硬件）刚迎来一道平台级关卡。

[`🔗 ARRL Letter，2026 年 10 月 15 日`](https://www.arrl.org/arrlletterissue?issue=2026-10-15) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50122034)

---

## 16. PS5LM：llama.cpp 原生运行于越狱 PS5 — 主机变身固定硬件推理盒

- **Velocity:** ▮ steady
- **Source:** GitHub + Hacker News · 56+ pts · ~1.8小时前 (~02:32 UTC+8)
- **Tags:** `llama-cpp` `ps5` `gguf` `local-inference`

cobanov/PS5LM（HN 56 分，约 271★，C++，10 月 16 日有推送）在**越狱的 PlayStation 5 上原生运行 llama.cpp**，从 Qwen 3.8 开始——任意 GGUF 模型、跑在主机自己的系统上、无需装 Linux。这是本 feed 一周内接触的第三个 PS5 原生项目，与 AnyPS5（10 月 14 日报道）的区别很关键：AnyPS5 把 PS5 二进制*重链接*到 Linux/Windows 上运行；PS5LM 反向而行，把 PS5 本身当作算力目标——一个固定、已知 GPU/CPU、带大统一内存池、且数千万台已经摆在桌上的平台。

**Why it matters:** 越狱主机是能买到的最便宜的"性能可预测"硬件，而 llama.cpp 的 GGUF 路径意味着移植一旦编译通过，整个模型库当天就能跑。小仓库、早期数字——但这个模式（消费级固定硬件作为推理舰队）正是让旧 Mac 与 Jetson 成为推理下沉市场的那一个。

[`🔗 cobanov/PS5LM`](https://github.com/cobanov/PS5LM) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50122431)

---

## 17. 实验室里的 RFC 8950：IPv4 路由穿越纯 IPv6 骨干网 — 五台 FRR 路由器，零隧道

- **Velocity:** ▮ steady
- **Source:** anuragbhatia.com + Hacker News · 76+ pts · ~6.7小时前 (~21:38 UTC+8)
- **Tags:** `bgp` `ipv6` `networking` `rfc8950`

Anurag Bhatia 的实验记录（HN 76 分）演示了 RFC 8950——通过 IPv6 BGP 会话以 IPv6 下一跳宣告 IPv4 路由——拓扑是五台 FRR 路由器的 Containerlab：纯 IPv6 客户端宣告 10.0.0.0/24，两台完全 IPv6-only 的骨干路由器携带这条带 IPv6 下一跳的 IPv4 路由，远端的纯 IPv4 客户端毫无感知。要点：**IPv4 变成控制面特性，而非你的核心需要说的协议**——没有 6in4 隧道、不必处处双栈、IPv4 转发只留在边缘。他把对骨干网的影响类比为 464XLAT 对移动网络的意义，而支持已经广泛：JunOS、IOS XR、Nokia SR OS、Mikrotik、华为、BIRD 与 FRR 近期版本全部支持。

**Why it matters:** 在 IPv4 转让价格依旧惩罚性的当下，"跑 IPv6-only 核心、在边缘把 IPv4 当服务卖"是自 NAT46 以来第一个架构上干净的答案——而 IXP 变体（路由服务器在交换中心 LAN 零 IPv4 的情况下提供 IPv4）才是真正可能撬动规模的部署。这篇文章是一份可运行的配方，不是一份提案。

[`🔗 RFC8950: Announce IPv4 with an IPv6 next-hop`](https://anuragbhatia.com/post/2026/06/rfc8950-announce-ipv4-with-ipv6-next-hop/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50118267)

---

## 18. BeBox 在 Haiku 上复活：原生 PowerPC 模拟器 — 连 Hobbit 时代都覆盖

- **Velocity:** ▮ steady
- **Source:** GitHub + Hacker News · 83+ pts · ~21小时前 (~07:22 UTC+8)
- **Tags:** `haiku` `emulation` `retro-computing` `beos`

johnrash/bebox（HN 83 分）是一个 **Haiku 原生的 BeBox 模拟器**——Be Inc. 的 PowerPC 双 CPU 机型，据仓库描述还包括基于 AT&T **Hobbit** 的初代机——几乎没有模拟器项目碰过的那一段。它很小（30★），刚被关注几天，但它是 Haiku——精神续作系统——在自己身上模拟自己的祖先，10 月 15 日有推送、仍在活跃。

**Why it matters:** 对 Hobbit 机型的模拟是 1990 年代计算史最后几块真正无人覆盖的角落之一——BeOS 的前 PowerPC 血统大多只存在于照片里。情怀之外，Haiku 长出模拟器生态是健康信号：一个平台开始保存自己的历史，才算"活着"。

[`🔗 johnrash/bebox`](https://github.com/johnrash/bebox) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50111742)

---

## 19. /dev/null：每个帖子都是纯文本、用 GitHub 账号登录的社交网络

- **Velocity:** ▮ steady
- **Source:** dev-null.sh + Hacker News · 57+ pts · ~3.4小时前 (~00:57 UTC+8)
- **Tags:** `social-media` `plain-text` `developers` `devtools`

/dev/null（devnull.sh，HN 57 分、75 评论）自述为"给开发者的社交网络——用 GitHub 登录，关注写代码的人，向共享日志**提交纯文本**"。没有算法 feed、没有多媒体类型，只有一条按时间排列、绑定 GitHub 身份的共享文本日志。它很小、登上首页才几小时——当作实验看待，而非平台。

**Why it matters:** 纯文本优先的社交是智能体真正能读也能写的格式——一条可以 `curl` 的共享日志，正是本 feed 自己的机器可读约定一直在坚持的社交层。开发者是否需要又一个网络，是 75 条评论正在给出两面答案的开放问题。

[`🔗 dev-null.sh`](https://dev-null.sh) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50121004)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-10-16T20:30:00Z |
| Items | 19 |
| Sources tracked | 22 (Hacker News, GitHub Trending, Apple/NVIDIA 厂商博客, Anthropic Research, CISA KEV, NVD, Mercor Research, calif.io, The Register, Waymo, ARRL, 厂商与个人工程博客) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[前一天](../2026-10-16/) · [Raw .md](https://trending.md/zh/feed/2026-10-17.md) · [归档](https://trending.md/zh/archive/)
