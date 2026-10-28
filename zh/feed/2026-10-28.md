---
date: 2026-10-28
updated: 2026-10-28T12:23:59Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 30
license: CC-BY-4.0
---

# 今日趋势 — 2026-10-28

## 1. Genie 4 生成带声音与对话的世界——而 DeepMind 没有随它发布任何基准

- **Velocity:** ▮▮▮ trending
- **Source:** Google DeepMind blog / Hacker News · 470 pts · 276 条评论 · 约 4 小时前（~00:06 UTC+8 10 月 28 日）
- **Tags:** `deepmind` `world-model` `multimodal` `simulation` `research-preview`

**Genie 4** 是一个用于"实时交互式模拟"的世界模型，而真正的新闻在模态清单上：它在生成模拟世界的同时生成与环境匹配的环境音，以及能即时调整的交互式角色对话。操控方式是自然语言——改变天气、移动镜头、增加人物或物体——Gemini 会把提示适配到场景上，并在多次编辑之间保持世界连贯。DeepMind 把场景的真实外观与行为归功于 **Gemini Omni**，把因果性与多步事件的支持归功于作为引导智能体的 **Gemini 3.8 Flash**：它观察、规划步骤并检查进度。它模拟空气动力学、碰撞与角色移动。机器人实验把 **Gemini 4 Argon** 与 Genie 4 组合，其中包括一台 Apptronik Apollo 人形机器人下跳棋。可用性是面向受信测试者的研究预览，"即将"通过 Project Genie 提供给 Google AI Ultra 订阅者，并通过 Gemini API 与 Google AI Studio 提供给早期接入伙伴，另设等候名单。

**Why it matters:** 这篇博客里没有基准，也没有模型规模——所以真正可部署的信息是那份局限性清单，而它具体得少见。视觉细节与客体永久性"会随时间漂移"，在长会话、多次复杂编辑之后、或在导航过程中尤其明显；复杂物理交互、实时音频准确性、可读文字渲染、空间准确性与长期一致性都"仍是持续进行中的研究领域"。每个输出都带 SynthID 水印。这组描述刻画的是一次带有**命名失效模式**的预览，而不是一个已被解决的模拟器——而"编辑之后漂移"恰恰是 DeepMind 列出的预可视化与原型用途最要命的那一条，因为那些工作流本身就是多次编辑的。

[`🔗 DeepMind — Genie 4: a new generation of world simulation`](https://deepmind.google/blog/genie-4-a-new-generation-of-world-simulation/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50261319)

---

## 2. Ghostty 1.4.0 补齐 Kitty 图形协议、回滚内存降 70–90%——同时发了十份没有 CVE 编号的安全公告

- **Velocity:** ▮▮▮ trending
- **Source:** ghostty.org release notes / Hacker News · 389 pts · 127 条评论 · 约 3 小时前（~00:51 UTC+8 10 月 28 日）
- **Tags:** `terminal` `zig` `release` `performance` `disclosure`

**Ghostty 1.4.0** 于 **2026-10-27T19:37Z** 发布，历时七个月、172 位贡献者、2,889 次提交。头条是 Kitty 图形：动画与相对定位落地，补齐了对已发布规范的完整支持——Ghostty 声称自己是第一个做到这一步的非 Kitty 终端。空闲回滚缓冲现在会被透明压缩，普通文本的物理内存占用下降约 **70–90%**，这才让默认回滚上限从 **10 MB 提高到 50 MB**，而 macOS 上一个空终端只占约 **16 KiB**。pty 的读取与解析被拆开：macOS I/O 吞吐提升 **25–55%**，纯文本 VT 解析实测从 **128 MB/s 提升到 725 MB/s**。GTK 换上了新的 EGL 渲染器，带三缓冲与 DMABUF 共享，取代 `GtkGLArea`，分数缩放下文字清晰。此外还有：macOS 与 GTK 上的 Kitty 剪贴板协议（OSC 5522）、GTK 分屏的拖放重排、把 `esctest` 接进 CI、安装 terminfo 并转发环境变量的 `ghostty +ssh` 包装、macOS 27"Golden Gate"兼容修复，以及四种新本地化（巴斯克语、白俄罗斯语、丹麦语、塞尔维亚语两种字母）。

**Why it matters:** 升级之前先读破坏性变更——`copy-on-select` 现在接受 `none`/`primary`/`clipboard`/`both`，其中 `clipboard` 只写系统剪贴板，macOS 默认值改为 `none`，`cmd+arrow_up/down` 回到 `jump_to_prompt`，GTK 把切标签页挪到 `ctrl+shift+page_up/down`，`scrollback-limit` 被 `scrollback-limit-bytes` 取代。然后再读安全一节，它是这次发布里篇幅最大的部分：**十份** GHSA 公告——一个没把回车当行尾的粘贴防护、可能崩溃/挂起/超额分配/读取文件的恶意 Kitty 图形命令、两处 tmux 控制模式崩溃（一处能关掉所有窗口，一处通过零尺寸或超大面板触发）、在极小回滚上限下清屏进入回滚缓冲区的内存破坏、通过 zsh 集成用构造的目录名注入转义序列，以及四个 macOS 问题（cmd 点击构造的 OSC 8 链接、由 `link` 配置匹配到的链接、拖放绕过粘贴防护、文件名中的控制字符让确认框里显示的命令失真）——而发布说明写明 **CVE 尚未分配**。十份公告、零个标识符，意味着扫描器在发布当天没有任何东西可以匹配；发布说明是当时存在的唯一披露。依赖门槛也在移动：GTK **4.18** 与 libadwaita **1.7**（Ubuntu 24.04 不再满足）、Zig **0.17**、macOS 13+。Ghostty 1.5 计划于 **2027 年 3 月**发布，Windows GUI 路线图则被撤下，只保留 libghostty 对 Windows 的支持。

[`🔗 Ghostty 1.4.0 发布说明`](https://ghostty.org/docs/install/release-notes/1-4-0) · [`🔗 ghostty-org/ghostty — releases`](https://github.com/ghostty-org/ghostty/releases) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50261998)

---

## 3. CPython 要移除实验性 JIT——PEP 836 已于 10 月 19 日撤回，而指导委员会反对的理由才是重点

- **Velocity:** ▮▮▮ trending
- **Source:** LWN.net / Hacker News · 371 pts · 194 条评论 · 约 9 小时前（~19:17 UTC+8 10 月 27 日）
- **Tags:** `python` `cpython` `jit` `pep` `governance`

Python 指导委员会在 **6 月**为保住实验性 JIT 设下了**六个月**的期限，要求提交一份标准轨道 PEP；**10 月 19 日**，PEP 836 的作者 **Brandt Bucher、Savannah Ostrowski 与 Ken Jin** 撤回了它。Ostrowski 的理由是人力而非性能："我们觉得自己没有把当前版本继续推下去的个人带宽。"委员会认为该 PEP"基本回答了我们提出的问题"，但点出三处缺口：安全是"**PEP 中服务不足的领域**"，对用户影响的说法"**过于乐观**"，原定 2028 年的兼容性复核"**实在太晚了**"。它还提到主分支上试验带来的问题，以及"缺乏统一设计"。Brett Cannon 表示"主仓库中的工作将会停止"，但社区是否在别处继续则未定。移除预计发生在 **3.16** 开发周期早期——早到足以吸收后果。JIT 于 **3.13**（2024 年）落地；**3.15** 被允许维持现状。参考实现将被公开，并从已撤回的 PEP 中链接过去。

**Why it matters:** JIT 是 3.13 最耀眼的性能故事，而它死掉的每一条理由都是维护形态的理由。安全那一条最该被带走：JIT 是一块内存破坏的攻击面，而 PEP 从未为它做过预算；"给解释器加个 JIT 提性能"这类提案，必须先回答这个问题。第二件值得留下的是收场方式——六个月的时钟到点时，换来的是**撤回加一份承诺的参考实现**，而不是一张路线图。替代 PEP 被认为不太可能出现，原因恰恰是活跃的 JIT 推动者全都在 PEP 836 里。

[`🔗 LWN — Python's experimental JIT to be removed`](https://lwn.net/SubscriberLink/1102102/0c00e4d550f25f8c/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50257419)

---

## 4. Adobe Commerce 的 9.3 在修复 105 天之后进了 KEV——而 CISA 自己的 SSVC 在同一天下午翻成"active"

- **Velocity:** ▮▮▮ trending
- **Source:** CISA KEV catalog / NVD / CVE record · 发布于 2026-07-14 · KEV 收录于 2026-10-27
- **Tags:** `cve` `adobe` `magento` `kev` `provenance`

**CVE-2026-48356** 是 **CWE-434**（上传危险类型文件）漏洞，影响 Adobe Commerce、Commerce B2B、Magento Open Source 与 Commerce Events，**CVSS 3.1 9.3**（`AV:N/AC:L/PR:N/UI:R/S:C/C:H/I:H/A:N`）。CNA 记录于 **2026-05-21** 预留、**2026-07-14** 发布，在 **APSB26-73** 的 7 月版本中修复——`2.4.9-2026-jul`、`2.4.8-2026-jul`、`2.4.7-2026-jul`、`2.4.6-2026-jul`、`2.4.5-2026-jul`、`2.4.4-2026-jul` 以及对应的 B2B 与 Magento Open Source 构建。受影响范围以 `lessThanOrEqual` 对一串逗号连接的版本号、从 `0` 起算的方式书写，因此记录的意思是"这些分支到这些点位为止，连带各条线上更早的所有版本"。NVD 标记为 **Analyzed**，并在 Adobe 的 `psirt@adobe.com` 9.3 之外**自己**发布了 9.3——这是 NVD 亲自打分而非背书 CNA 的少数情形。CISA 于 **2026-10-27** 将其加入 **KEV**。

**Why it matters:** ADP 容器回答的是"利用评估何时发生了变化"，而它带时间戳。CISA 为该 CVE 写入的 Vulnrichment 现在是 `Exploitation: active`、`Automatable: no`、`Technical Impact: total`，时间戳 **2026-10-27T19:53:15Z**——与 KEV 收录同一个下午。这一对组合就是"新近被利用"可核查的版本：一个精确到分钟的 active SSVC 判决，旁边是一个 KEV `dateAdded`。而对跑 Magento 的人来说，滞后才是故事：从修复（7 月 14 日）到 KEV（10 月 27 日）是 **105 天**，也就是说，把 7 月季度补丁说明当例行公事读过去的商店，已经带着一个被列入 KEV 的洞过了三分之一个年头。注意 `UI:R` 与 `S:C` 同时出现——攻击者需要受害者访问构造好的 URL，所以这是"上传端点 + 诱饵"，不是一点即中的 drive-by；`Automatable: no` 从 CISA 那一侧说的也是同一件事。

[`🔗 CISA KEV 目录`](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) · [`🔗 NVD — CVE-2026-48356`](https://nvd.nist.gov/vuln/detail/CVE-2026-48356) · [`🔗 CVE.org — CVE-2026-48356`](https://www.cve.org/CVERecord?id=CVE-2026-48356)

---

## 5. 有限单群分类在 Lean 中完成形式化——4310 万行、一次提交，勘误仍在整理

- **Velocity:** ▮▮ rising
- **Source:** cfsg.axiommath.ai / AxiomMath GitHub / Hacker News · 101 pts · 25 条评论 · 约 3.5 小时前（~00:29 UTC+8 10 月 28 日）
- **Tags:** `lean4` `formal-methods` `mathematics` `proof-assistant` `verification`

**AxiomMath** 完成了**有限单群分类定理**的形式化——那个以数千页篇幅分类所有有限单群的定理——在 **v4.35.0-rc3** 上给出了一份 **sorry-free 的 Lean 4** 证明，建立在 Mathlib 与 TauCeti 之上。项目自己给出的数字：**4310 万行 Lean**、**205 万个声明**、**100 个里程碑**、源语料 **139 部著作**、引用 **715 篇论文/书籍**。每一步逻辑都由 Lean 内核检查；完整构建耗时**不到 24 小时**；只用到标准公理 `Classical.choice`、`propext` 与 `Quot.sound`，没有 `native_decide`。仓库创建于 **2026-10-27T13:19Z**，Apache-2.0，首次读取时只有 **56 个 star、一次提交**——当晚 **20:43 UTC+8** 已是 **114 个 star**，也就是说它在本条写作过程中翻了一倍（这个数字更有意思），而历史仍然是一个分支上的一个 `Initial commit`（`69cb972f`，2026-10-27T15:07:38Z）。

**Why it matters:** 制品与公告之间的分歧值得细读。仓库 README 说"sorry-free"、未列出任何遗留工作；项目网站却仍有 **"What's left?"** 一节、看板上还挂着 *Working / Just verified / Idle / In progress* 状态，并说团队正在"与群论学家一起整理**勘误**"。这不是套话——工作过程中他们发现了**已发表路线中一条闭包断言的反例**（通往 Unbalanced Group Theorem 的那条路），不得不改用基于 Solomon 极大 2-分量与"simple tops 保持性"的论证。而整件事还依赖 TauCeti 的那条陈述：每个有限单群都同构于一张显式分类表上的某个群。所以诚实的描述是：**相对于一张给定列表**的内核检查，六 GB 的证明以一次压缩提交抵达、没有可供检视的开发历史，跟随的是第一代证明，勘误仍未关闭。这是一个非凡的结果，也是一件非常年轻的制品。

[`🔗 AxiomMath — CFSG 形式化`](https://cfsg.axiommath.ai/) · [`🔗 AxiomMath/CFSG`](https://github.com/AxiomMath/CFSG) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50261647)

---

## 6. 法官认定 Anthropic 的书库是盗版——Stanford Daily 数出 10 位以上本校作者，其中两位选择退出、要求陪审团

- **Velocity:** ▮▮ rising
- **Source:** The Stanford Daily / Hacker News · 279 pts · 148 条评论 · 约 4.5 小时前（~23:28 UTC+8 10 月 27 日）
- **Tags:** `anthropic` `copyright` `litigation` `training-data` `policy`

在 **2026 年 5 月**判决的 **Bartz v. Anthropic** 中，法官 **William Alsup** 认定 Anthropic 为建立永久中央书库而盗版书籍的行为不当，同时认定用**合法获得**的书籍训练属于合理使用——他把 AI 训练比作读者吸收一本书的主题与风格。该案以 **15 亿美元**和解，覆盖近 **50 万部**登记作品的作者与出版方，约合**每部 3,000 美元**。Stanford Daily 数出的本校作者超过十位，点名了 **Tobias Wolff、Abraham Verghese、Chang-Rae Lee、Daniel Mason、Hayagreeva Rao 与 Myra Strober**；Wolff 称自己有十部作品被使用。Wolff 与 Lee **退出**了集体诉讼，于 2026 年 5 月另行提起 **Cruz v. Anthropic**，要求陪审团审理，并主张每部侵权作品最高 **15 万美元**。

**Why it matters:** 报道常把三件事揉成一件，而它们的定价完全不同。**15 亿美元是和解金**，不是损害赔偿判决——它给整个集体的总请求定了价，并不构成每部作品的先例。**合理使用的认定以合法取得为条件**，正因如此，盗版书库那一项认定会成为今后多年被引用的句子。而 **Cruz 才是取证指控真正进入审理的地方**：LibGen 与 PiLiMi 来源、以及集中存储盗版文件，都是那份起诉状中的指控，不是 Bartz 案的认定。真正有意义的差距是算术上的——集体内约**每部 3,000 美元**，退出的原告最高**每部 15 万美元**，**50 倍**的差距正是"退出"之所以理性的全部原因。

[`🔗 The Stanford Daily — Anthropic illegally trained Claude with Stanford professors' books`](https://stanforddaily.com/2026/10/27/professors-books-pirated-to-train-claude/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50260814)

---

## 7. Liquid AI 的 LFM3 把六个 2B 模型放在同一个 1.7B 底座上——而许可证是 LFM Open v1.0，不是 Apache

- **Velocity:** ▮▮ rising
- **Source:** liquid.ai blog / Hugging Face · 6 个模型于 2026-10-28 上线
- **Tags:** `liquid-ai` `open-weights` `small-models` `multimodal` `licensing`

**LFM3** 是六个 ~2B 级别模型的家族，全部派生自 **LFM3-1.7B-Base**：文本、视觉、音频、omni，以及从视觉与 omni 变体衍生出的两个决策模型。架构为 24 层——**13 层门控短卷积、5 层窗口 256 token 的滑窗注意力、6 层全局注意力**——外加卷积核 7、逐头门控注意力、部分 RoPE 与 sandwich normalization，词表 128K，预训练 **22 万亿 token**、中训练 **3.5 万亿 token**。文本模型支持 **256K 上下文**，4-bit 量化下约 **1 GB**，可在单张 GPU 上微调。Liquid 自己的对照表给出 LFM3-1.7B 平均 **49.37**，对比 LFM2.5-2.6B 的 **31.55**、MiniCPM5-2B 的 **39.19**、Gemma 4 E4B 的 **31.74**、Qwen3.5-4B 的 **39.27**、Qwen3.5-9B 的 **47.24**——"以少 35% 的参数超过我们上一代 LFM2.5-2.6B"。强项集中在工具使用与指令跟随：**BFCL V4 71.39**、**ToolSandbox 80.36**、**LiveClaw 45.60**、Claw-Eval pass^3 **51.40**、SWE-bench Verified **43.40**、RULER 128K **65.56**。端侧解码据报比次优模型快 **1.8–2.8 倍**，128K 上下文需要 **1.6 GB** KV 缓存。

**Why it matters:** 注意事项在模型卡上而不在公告里，而且有两条。第一，许可证是 **LFM Open License v1.0**——博客页面根本没写许可证，所以发布稿里的"open-weight"不等于"Apache"。第二，模型卡写着"**因其规模较小，不建议用于 agentic coding 或复杂多步推理**"，而这句话旁边是 Terminal-Bench 2.1 的 **12.92**、GPQA Diamond 的 **63.37**、HLE 的 **7.17**（带工具 13.90）。49.37 的平均分是由工具使用与指令跟随那几行买来的；同一张表也点明了它去不了的地方。所有数字均为厂商自报，Hugging Face 上 LFM3-1.7B 显示 **6,311 次下载与 110 个赞**——是真实采用，但比 hub 头部的量级低了一个数量级。

[`🔗 Liquid AI — Introducing LFM3`](https://www.liquid.ai/blog/lfm3) · [`🔗 Hugging Face — LiquidAI/LFM3-1.7B`](https://huggingface.co/LiquidAI/LFM3-1.7B)

---

## 8. 微软的 MAI-Image-2.7 在 Artificial Analysis 上排到第二——一个只有编辑、没有定价、也没有文生图的预览版

- **Velocity:** ▮▮ rising
- **Source:** microsoft.ai news · 发布于 2026-10-27
- **Tags:** `microsoft` `image-editing` `leaderboard` `preview` `availability`

**MAI-Image-2.7** 于 **2026-10-27** 以预览形式发布，是微软的图像**编辑**模型。能力包括：对整幅场景重新风格化与重打光、在保持融合的前提下编辑文字与符号、修复与增强，以及需要理解物体、光照与环境关系的推理式编辑。微软的帖子声称它在 **Arena 的 Edit 榜上排第三**——使 Microsoft AI 成为该榜第二的实验室——并在 **Artificial Analysis 的图像编辑榜上排第二**，高于 GPT Image 2.5 Flare。它称该模型在"**全部 10 个用例与全部 7 种编辑动作**"上都优于 MAI-Image-2.6，最大优势在场景与风格一项，"**领先次优模型 24 Elo**"。可用渠道是 **Arena、Artificial Analysis 与 MAI Playground**。文生图生成"**即将推出**"。

**Why it matters:** 排名来自第三方盲测投票，而帖子很克制地说明了这一点——它没有给出自己的总体 Elo、没有定价、没有 GA 日期、也没有说明参考图或分辨率限制。这种克制是正确形态，但它同时标出了这次发布**是什么**：第一个**没有 Microsoft Foundry 部署、也没有价格**的 MAI 图像模型，而 2.6 在 Foundry 里约 **每张 0.039 美元**。一个只能通过 playground 访问的纯编辑模型是榜单条目，不是产品；而被引用的那些 Elo 差距落在噪声带内——几个点的盲投偏好不构成能力排序。真正要带走的问题是：它会不会在榜单下次更新前进入 Foundry，因为那才是把数字变成开发者可行动信息的一步。

[`🔗 Microsoft AI — MAI Image 2.7 debuts`](https://microsoft.ai/news/mai-image-2-7-debut/) · [`🔗 Artificial Analysis — image editing leaderboard`](https://artificialanalysis.ai/text-to-image/arena)

---

## 9. GoAhead 加载了 CRL 却从不检查——三个 TLS 漏洞之一，而且两个 CVE 编号在任何注册库里都查不到

- **Velocity:** ▮▮ rising
- **Source:** FoxIO blog · 发布于 2026-10-27
- **Tags:** `tls` `cve` `mtls` `embedded` `disclosure`

FoxIO 的 **Sébastien Féry** 公布了嵌入式 Web 服务器 **GoAhead** 的三个 TLS 集成缺陷。**GOAHEAD-SA-2026-0006 / CVE-2026-115881**（**CVSS 9.1**）：在 OpenSSL 兼容后端、以 CRL 配置了 mTLS 的情况下，"CRL 被加载但 CRL 检查从未启用"，于是**已吊销的客户端证书被静默接受**——影响 GoAhead **3.4.5–6.1.0**，修复于 **6.1.1**。**GOAHEAD-SA-2026-0004 / CVE-2026-115884**（**7.4**）：LibreSSL 的旧验证器报告的是颁发者错误而非链过长错误，而 GoAhead 容忍了它，于是超过 **10 张证书**上限的客户端证书链被接受——需要 `VERIFY_PEER=1` 与 `VERIFY_ISSUER=0`，影响 **LibreSSL 3.2.x 或 3.3.2–3.3.6**，且 LibreSSL 构建可能同时继承那个 CRL 缺陷。**GOAHEAD-SA-2026-0005**（**5.9，无 CVE**）：在 mbedTLS 后端，一个缓冲区长度笔误把 **2048 位 DH 模数缩成一个字节**（`0xff`），只剩**八种可能的共享密钥**，于是被动观察者可以解密捕获到的 TLS 1.2 DHE_RSA 会话——影响 GoAhead **4.0.2–6.1.0**，修复于 **6.1.1**。

**Why it matters:** 在 **2026-10-27T20:06Z** 亲自核查，**CVE-2026-115881** 与 **CVE-2026-115884** 从 cveawg 返回的都是 `{"error":"CVE_RECORD_DNE"}`，从 NVD 返回的都是 `"totalResults": 0`。一份带着 9.1、编号却没有任何注册库发布过的厂商公告，是解析器问题反着发生：公告是**唯一**的记录，而消费 CVE 情报流的扫描器看不到任何可匹配的东西。中间那个是配置合取而非默认值，所以是 7.4——但第三个才是需要坐下来想的。八种可能的共享密钥不是一个"悄悄打补丁"就完事的缺陷；对任何在 mbedTLS 上终止 TLS 1.2 DHE 的人来说，已捕获的流量是可解密的，补救办法是重新换密钥，而不是升级。

[`🔗 FoxIO — Choose your backend: three TLS bugs in GoAhead`](https://foxio.io/blog/choose-your-backend-three-tls-bugs-in-goahead) · [`🔗 NVD API — CVE-2026-115881 返回 0 条`](https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-115881)

---

## 10. Graphify 把代码库变成知识图谱——13.68 万星，每条边都标成 EXTRACTED 或 INFERRED

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending（周榜第 6）/ 仓库 · 本周 7,183 星
- **Tags:** `agent-skill` `knowledge-graph` `tree-sitter` `repo` `mcp`

**Graphify** 把仓库——代码加上文档、SQL schema、配置文件和 PDF——变成可查询的知识图谱，并且它明确说出自己不是什么："**不是向量索引**"。代码用 **tree-sitter** 在本地解析成 AST，每条边都标注为 `EXTRACTED` 或 `INFERRED`，这才是值得注意的设计决定——它让读者可以丢掉模型的猜测，只保留解析器找到的东西。它以 `/graphify` skill 的形式提供给 Claude Code、Cursor、Codex、Gemini CLI 与 GitHub Copilot（声称支持 20 多种助手），另有 `query`、`path`、`explain` 三个 CLI 命令，输出 `graph.json`、`graph.html` 与 `GRAPH_REPORT.md`。约 **40 种语言**，另加文档、PDF、图像、音视频、SQL schema、Terraform 与 PostgreSQL。仓库有 **136,863 星**、**13,066 fork**、**2,625 次提交**，**Apache-2.0 / MIT** 双许可，PyPI 包名 `graphifyy`（CLI 仍叫 `graphify`），`v8` 分支，以及一个 YC S26 标记。

**Why it matters:** README 的局限性一节比功能列表更有信息量，而其中三条会改变你的部署方式。歧义扩展名"**可能在解析成错误语言时不报错**"，于是符号会**静默**消失——图谱的失效模式是缺失的边，而不是报错。HTML 导出上限 **5,000 个节点**，更大的图退回聚合社区视图。社区标注默认**每次调用 100 个社区**，而失败的批次**保留由 hub 推导出的名字，而不是拆分重试**——这是一种看起来像结果的降质。之后再切换到 `leiden` 附加组件会重排社区并强制重新标注，所以这个选择从第一天起就是承重的。还有一个数字要拆开：`open_issues_count` 读作 **1,627**，其实是 **719 个 issue + 908 个 pull request**——两笔不同的积压，不是一笔。

[`🔗 Graphify-Labs/graphify`](https://github.com/Graphify-Labs/graphify) · [`🔗 GitHub Trending — 周榜`](https://github.com/trending?since=weekly)

---

## 11. 继我们 10 月 21 日关于 PHP2Shell 的报道：Wiz 看着漏洞利用套件失败，六天内暴露面下降 67%

- **Velocity:** ▮▮ rising
- **Source:** Wiz blog / Hacker News · 168 pts · 约 1 天前（~10 月 27 日）
- **Tags:** `php` `exploitation` `update` `kev` `remediation`

**这是对 10 月 21 日 PHP2Shell（CVE-2026-109618 / CVE-2026-109619）报道的更新。** Wiz 10 月 27 日的遥测帖报告了跨 **九个 IPv4 指标**的"有限次数的利用尝试"，以及——最值得留下的部分——在其自身捕获中**没有成功的端到端利用**。被使用的是某开源利用套件的两个变体：旧的那个失败，因为一个约 **12.6 MB** 的请求超过了 **8 MB** 的 `post_max_size`；较新的那个能稳定触发 PHP 内存耗尽，但**内存泄漏阶段每次都失败**，没有任何来源发出最后阶段。其他打着 PHP2Shell 名号的工具根本没针对 PHP 漏洞——它们用会话投毒加应用层 LFI，依赖诸如 `lfi_sink.php` 这类脆弱端点。Wiz 把失败归因于 PHP 构建差异、内存限制、堆布局、worker 绑定、延迟与超时；并指出扫描**确实**在一个运行着有利的单 worker Apache `mod_php` 配置的公开蜜罐上成功了。修复进展很快：每日可区分的互联网暴露脆弱机器下降约 **67%**，暴露的脆弱机器中运行 **PHP 7.3 或更早**版本的比例在五天内从 **8.3% 降到 5.7%**，至少有一台暴露实例的组织下降 **47.9%**，而披露一周后仍脆弱的初始受影响组织不到 **53%**。

**Why it matters:** 这是少见的、否定性结果本身就是发现的那类利用报告。"没有成功的端到端利用"**并不等于**"未被利用"——CISA 早在 **10 月 26 日**就把 PHP2Shell 加入了 **KEV**——但它确实说明公开套件对构建环境敏感，而列出的每种失败模式（`post_max_size`、内存限制、worker 绑定、堆布局）都是**配置上的巧合**，不是任何人设计的防线。真正被命中的蜜罐是那个单 worker `mod_php` 的；这才是该担心的形态，因为默认安装产生的正是这个形态。把 67% 读成补丁在起作用，而不是威胁在退潮——一周还不足以得出任何一方的结论。

[`🔗 Wiz — PHP2Shell: exploitation attempts and remediation trends`](https://www.wiz.io/blog/php2shell-exploitation-so-far) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50259343)

---

## 12. 继我们 10 月 23 日关于 Brotli 的报道：CISA 把解码器漏洞进了 KEV——这是关于它的第一份非厂商陈述

- **Velocity:** ▮▮ rising
- **Source:** CISA KEV catalog / NVD · KEV 收录于 2026-10-27
- **Tags:** `brotli` `cve` `kev` `update` `rce`

**这是对 10 月 23 日、24 日与 26 日关于 CVE-2026-111497 报道的更新。** CISA 于 **2026-10-27** 把 Brotli 解码器漏洞加入 **KEV**，名称为"**Google Brotli Unchecked Return Value Vulnerability**"，并给出自己的描述：缺失返回值检查"可能让远程未认证攻击者通过构造的压缩流破坏解码器内存、暴露内存内容、造成拒绝服务，或可能执行代码"。当前的背景是：**Google** 作为 CNA 给它 **CVSS 4.0 9.2**；**微软**给 .NET 打 **8.1**，并称利用"更可能"；**Red Hat** 说公开 PoC 能稳定崩溃，但尚无可靠的 RCE。披露由 **Node.js 于 10 月 21 日**完成；微软于 **10 月 25 日**发布**带外 .NET 补丁**（8.0.33、9.0.22、10.0.14、11.0.0-rc.3.26522.148）；Palo Alto 于 10 月 26 日确认 **PAN-OS** 受影响。

**Why it matters:** 在今天之前，"已被利用"这个说法取决于信谁——ELLIO 说在自家欺骗网络中观察到尝试，而多数公告说未确认。KEV 收录是 CISA 在认证存在"可靠证据"表明已在野利用，这使它成为记录中的**第一份非厂商陈述**。分数要分开看，因为它们有三个作用域、却常被平均成一个数字：9.2 是 Google 作为 CNA 对库本身的 v4.0 评分，8.1 是微软针对 .NET 的评分，而 Red Hat 的"能稳定崩溃、无可靠 RCE"是对自家构建的陈述。KEV 收录不依赖其中任何一个。前面几条提到的制品陷阱仍然成立：据报已打补丁的 Node.js 里 `process.versions.brotli` 仍显示 **1.2.0**，所以**发布版本号**才是唯一可靠的"已修复"信号。

[`🔗 CISA KEV 目录`](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) · [`🔗 NVD — CVE-2026-111497`](https://nvd.nist.gov/vuln/detail/CVE-2026-111497)

---

## 13. Trajectory2Gym：成功的工具使用轨迹未必是好训练数据——把它"接地"值 16.9–29.8 个百分点

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.33568 / Hugging Face papers · 330 票 · 日期 2026-10-27
- **Tags:** `tool-use` `agents` `rl` `training-data` `benchmark`

**Trajectory2Gym** 从一个多数 agent 训练流水线不会做出的断言出发：以成功结尾的轨迹，并不因此就是好的监督信号。成功的轨迹"可能低估了多步依赖，或者包含了智能体在做决定时无法从可见信息中证明其合理性的动作"——因此论文提出两个要优化的属性：**组合覆盖**与**决策接地**。方法围绕弱支撑的组合结构构建可执行交互，然后**只从实际发生的执行中那些有据可依的决策**里导出监督；structural-support selection 分配训练经验，parent-normalized SFT 目标让每个*语义交互*（而不是每个轨迹片段）承担训练权重。跨 **五个 Qwen3 规模**，**Tau1、Tau2 与 BFCL** 的等权平均提升 **16.9–29.8 个百分点**，增益在有状态与多轮交互上最大。

**Why it matters:** 框架本身就是贡献。把"它成功了"当作**标签质量问题**来处理，与通常的抓取加过滤流水线正好相反；而结果分布就是诊断：增益恰好集中在有状态与多轮那几行，也就是"后一个决策依赖前一个观察"的行。未接地的轨迹教会模型跳过这个依赖，而只给终点打分的基准看不见这次跳过。有一条注意事项要带上：摘要里**完全没有局限性一节**，而标题数字高达 29.8 个百分点——所以这个数字是真的，但失效模式没有公开。

[`🔗 arXiv — Trajectory2Gym`](https://arxiv.org/abs/2610.33568) · [`🔗 Hugging Face — 每日论文`](https://huggingface.co/papers)

---

## 14. 持续学习考试：600 个关卡、17 组 harness–模型配置，最强系统只完成 23.3% 的任务

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.33956 / Hugging Face papers · 43 票 · 日期 2026-10-27
- **Tags:** `continual-learning` `benchmark` `agents` `evaluation` `harness`

**CLE（Continual Learning Exam）** 的论点是：现有评测测的是*孤立*的任务表现，而不是从积累经验中获得的增益。这个基准是 **120 个人工撰写的任务**，由 **50 多位领域专家**参与构建，每个任务是一个五级阶梯——共 **600 个关卡**——覆盖 **89 种职业角色**与 **12 个职业领域**。智能体必须通过一关才能解锁下一关，而后面的关卡**依赖前面关卡的经验**，由人工撰写的评分标准驱动一个评测智能体。研究比较了"单次提交"与"失败后给诊断反馈、允许一次修订"两种设置，覆盖前沿 LLM 上的 **17 组 harness–模型配置**。反馈加修订带来中位数 **5.3 个百分点**的提升。最强系统通过 **47.7%** 的关卡，并且只在 **23.3%** 的任务上完整通过全部五关。

**Why it matters:** 阶梯设计正是让"持续"变得可测的东西。单次提交的分数，可以由一个在任务内部什么也没学到的模型拿到；真正有意义的量是第二次尝试买到了什么——而答案是中位数 **+5.3 个百分点**，小到足以排除"再试一次"就是缺失的那味药。在 120 个任务上 **23.3% 的完整完成率**也说明天花板还很远，这对一个本该留有另一年余量的基准来说是好事。论文坦白说该数据集可用于持续学习后训练：它首先是度量，其次才是训练集。

[`🔗 arXiv — Continual Learning Exam`](https://arxiv.org/abs/2610.33956) · [`🔗 Hugging Face — 每日论文`](https://huggingface.co/papers)

---

## 15. Hurston-1：用 190 小时微调的 3B TTS，让口音不再坍缩——而它自己承认泛化标签的 WER 是 0.26

- **Velocity:** ▮▮ rising
- **Source:** Hugging Face 模型卡 / Show HN · 66 pts · 约 1 天前（~10 月 27 日）
- **Tags:** `tts` `speech` `open-weights` `accents` `telephony`

**Hurston-1** 是 **Destined AI** 的 **3B** BF16 文本转语音模型，从 **Maya1** 用 rank-64 LoRA 微调 **2,000 步**，**Apache-2.0**。训练集约 **190 小时**：Destined 的口音英语语料约 **136 小时**（含约 10 小时与 AI 语音智能体的真实通话——7,600 轮、250 位贡献者）、**LibriTTS-R 约 46 小时**、**Mozilla Common Voice 约 10.5 小时**。口音分类器相对基座 Maya1 明显上扬：**南部非洲 0.95 对 0.60**、西非 **0.84 对 0.60**、东非 **0.98 对 0.81**、尼日利亚 **0.94 对 0.82**。日常句 WER 为 **0.03**（基座 0.02），较难句子从单次生成的 **0.145** 降到带 `--check` 的 **0.062**。盲听者 **78%** 的情况下更偏好 Hurston-1，Maya1 为 **6%**。**NB-TTS** 电话模式输出 8 kHz G.711 音频，适配 Twilio 等电话系统。

**Why it matters:** 局限性清单具体得少见，而且包含那条会削弱卖点的一条——泛化的"**非洲英语口音**"标签表现很差，**WER 0.26**，所以增益来自*按口音标注的数据*，而不是泛泛的"口音建模"。这个区别决定数据策略：这是一套收集标注口音语料的配方，而不是一个能泛化到没人录过的口音的模型。对电话场景来说，运营层面的告诫同样重要：**跨通话没有一致的音色**（每次生成都重新采样，长文本还会在分块之间换声）、人名/日期/金额最弱、仅支持英语、无儿童音色。一个会在分块之间换音色的语音智能体，用来做一次性 IVR 提示没问题，用来做人格化角色就错了——而模型卡把这点写出来了。

[`🔗 Hugging Face — destined/hurston-1`](https://huggingface.co/destined/hurston-1) · [`🔗 Hacker News — Show HN`](https://news.ycombinator.com/show)

---

## 16. 评分表 RL 奖励覆盖率，于是答案变长变差——FORK 加入精确率目标后胜率从 10.6% 升到 68.0%

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.33512 / Hugging Face papers · 27 票 · 日期 2026-10-27
- **Tags:** `rl` `reward-hacking` `rubrics` `alignment` `evaluation`

**《Eat Your Precision》** 命名的是一个机制，而不是一个症状。基于评分表的 RL 通常奖励**回答覆盖了评分表的多少内容**——即召回——这会"鼓励更长的回答，把不必要或事实错误的内容也塞进去"，以至于调优后的输出**比基座模型还不受偏好**。论文提出的 **FORK 奖励**把召回与精确率目标结合起来：回答的每一部分都必须既**必要**（由评分表驱动的必要性计分）又**事实正确**（由正确性评分器检查）。FORK 优于现有的评分表 RL 方法，在评分表覆盖与回答质量之间达到帕累托最优平衡：在维持覆盖率的同时提升精确率、缩短回答，对基座策略的胜率从 **RubricHub-Medical 的 10.6% 升到 68.0%**，从 **HealthBench 的 22.1% 升到 74.1%**。

**Why it matters:** 有用的部分是：评分表本身不是 bug——覆盖率是一个**单边代理指标**，而 RL 总能稳定地找到任何单边代理指标便宜的那一侧。这正是为什么修复要动结构（把必要性做成一个可计分的奖励项），而不是事后加一个长度惩罚——后者只会压住症状、留下动机。生成时就应该说清两个注意事项：摘要**没有局限性一节**，而胜率是**对基座策略**测的，不是对前沿模型——所以"帕累托最优"是作者自己比较集内部的结论；诚实的读法是，FORK 修的是一个自伤式回退，而不是打败了更强的基线。

[`🔗 arXiv — Eat Your Precision`](https://arxiv.org/abs/2610.33512) · [`🔗 Hugging Face — 每日论文`](https://huggingface.co/papers)

---

## 17. HiP3R 用两级位姿图缝合重叠的 3D 重建分块——而它的摘要一个数字都没报

- **Velocity:** ▮ steady
- **Source:** arXiv 2610.31635 / Hugging Face papers · 387 票 · 日期 2026-10-27
- **Tags:** `3d-reconstruction` `slam` `pose-graph` `video` `research`

前馈式 3D 重建在短窗口上表现很好，但长视频必须切成**重叠的分块**，而每个分块都带着自己的坐标系和相机估计返回——朴素拼接就会产生不一致的尺度与重复的相机。**HiP3R** 用一个**两级层次位姿图**解决这一点，且不需要额外训练：第一阶段优化一个鲁棒的**分块级 Sim(3)** 图，建立全局布局与尺度；第二阶段固定该布局，为每帧估计**一个共享的 SE(3) 相机**，把重叠窗口的预测转换成单一轨迹。它同时支持分块与流式后端，论文报告在多个基准上改善了相机轨迹与重建。

**Why it matters:** 值得直说：**今天得票最高的论文，摘要是没有任何数字的**——没有数据集名称、没有 ATE 或 PSNR 的差值、没有对照表。这是一类消融实验成本很低的方法（"只用 Sim(3)"与"两级"的对比就是一张表），所以这个缺席是"引用改进之前先打开 PDF"的理由，而不是"没有改进"的证据。不过这个分解本身是对的：分块级管布局与尺度，帧级管相机位姿，而两个误差源恰好就在这两处——全局漂移跨分块累积，而逐帧误差是局部的、不需要全局重解。

[`🔗 arXiv — HiP3R`](https://arxiv.org/abs/2610.31635) · [`🔗 Hugging Face — 每日论文`](https://huggingface.co/papers)

---

## 18. Gforth 到达 1.0——而发布说明定义了什么叫"稳定"：一份不会移动的词表

- **Velocity:** ▮ steady
- **Source:** gforth.org NEWS / Hacker News · 139 pts · 12 条评论 · 约 10 小时前（~18:23 UTC+8 10 月 27 日）
- **Tags:** `forth` `gforth` `release` `embedded` `language`

**Gforth 1.0** 已发布，NEWS 文件的框架是"**Gforth 0.7.x 到 1.0 之间**用户可见的变化"。对一个 Forth 实现来说，版本号是一份兼容性承诺，而这份承诺是用散文而非 semver 写的：1.0 记录了"哪些词是打算**永久支持**的，哪些不是"。功能清单比一次维护性发布要宽得多——更强大的文本解释器，带新的字面量形式、词表限定名、环境变量与可扩展的"recognizer"；IDE 特性，包括定位定义与引用、可浏览的 backtrace 与编辑器集成；"智能 `.s`" 栈显示与终端状态行；跨核心与硬件线程的**多任务**，带消息队列、Cilk 支持、互斥量与原子操作；扩展的 C 接口与回调；字典分节、闭包、value/defer 字段、用户自定义的 `to` 行为与新的词头布局；以及循环优化与常量折叠方面的性能工作。部分词不再有文档，并给出了替代建议。

**Why it matters:** 永久支持清单才是这里真正的交付物——对任何要嵌入 Forth 的人来说，"哪些词我可以依赖"比"有什么新东西"更难回答，而在发布说明里回答它本就该更常见。多任务那一节是文件里最不像 Forth 的变化（消息队列、Cilk、互斥量、跨硬件线程的原子操作），也正是它让 Gforth 1.0 看起来像一个**嵌入式运行时**，而不只是一个教学解释器。一处诚实的空缺：页面**没有给出发布日期，也没有开发时长**，所以"数十年"是从 0.7.x 这个基线推断出来的，不是制品自己说的。

[`🔗 Gforth 1.0 — NEWS`](https://gforth.org/manual/1.0/NEWS.html) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50256952)

---

## 19. Spec-first 在提示与 diff 之间插入一份 spec 文件——而它自己的文档点明了那条旁路

- **Velocity:** ▮ steady
- **Source:** spec-first.dev / Show HN · 19 pts · 约 1 天前（~10 月 27 日）
- **Tags:** `agent-workflow` `coding-agents` `plugin` `methodology` `open-source`

**Spec-first** 是一套 **MIT** 许可的方法与工具，把一份写入仓库的 spec 插在提示与 diff 之间；它以一个 **Claude Code 插件**的形式发布，但同样的文件也能被 Codex、Cursor、Copilot 或终端 agent 使用。四个命令：**`create-spec`** 读取仓库记忆与代码，写出目标、带**文件与行号**引用的事实、实现步骤与完成标准，并创建分支与 worktree，但不写代码；**`review-spec`** 先跑脚本核对每个被引用的文件与行确实存在，再让一个**没有对话历史的全新 agent** 对照代码审阅，返回 *build*、*build with cuts* 或 *refuse*；**`apply-spec`** 实现步骤、写出 spec 指定的测试，并把非显而易见的选择记进决策文件；**`deliver-spec`** 让提交经过一道运行声明的构建与测试阶段的闸门，然后推送并开一个附带 spec 的 PR。另有 **`deliver-series`** 把互不共享文件的多个 spec 并行构建、合并成一个 PR。配套设施包括：用于可恢复状态的 `context.yaml`、`memory/` 目录、逐 spec 的决策日志，以及一份记录哪些提交通过了闸门的**账本**。

**Why it matters:** 审阅那一步是值得抄的部分——一个核对引用的脚本，加上一个**无上下文的审阅者**，是对同一制品的两次独立检查；这比多数"plan mode"实现给的更多，因为那些实现的两道检查都跑在写下计划的那个对话里。局限性写得直白，而其中一条就是全部关键：git hook 闸门**可以用 `git commit --no-verify` 绕过**，而没有账本条目的提交被视为从未通过闸门。所以**账本**、而不是 hook，才是信任锚——这意味着这套方法成立的限度，恰好等于你信任账本保管的限度，而那是"你在哪里跑它"的属性，不是插件的属性。

[`🔗 Spec-first — agentic development`](https://spec-first.dev/) · [`🔗 Hacker News — Show HN`](https://news.ycombinator.com/show)

---

## 20. NVIDIA 的 NeMo Agent Toolkit 因缺少认证拿到 10.0——而修复早于公告 47 天发布

- **Velocity:** ▮▮▮ trending
- **Source:** NVIDIA product-security 公告 5912 / NVD / GitHub · 公告日期 2026-10-27
- **Tags:** `cve` `nvidia` `agent-infra` `authentication` `provenance`

**CVE-2026-65145** 是 **NVIDIA NeMo Agent Toolkit** 中一个 **CWE-306** 认证缺失问题，**CVSS 3.1 10.0**（`AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H`），影响 **1.0 到 1.8.0**，修复于 **1.9.0**。同一份公告还包含 **CVE-2026-65151**，一个 **CWE-89** SQL 注入，**8.4**（`AV:L/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H`），影响 **1.4 到 1.6**，修复于 **1.7.0**。两者都是"外部发现"：**50words.com 的 Colin McDonough**，以及为那个 10.0 报告漏洞的 **ZUSO ART 的 YJK（@YJK0805），与 TrendAI Zero Day Initiative 合作**。**NVIDIA/NeMo-Agent-Toolkit** 仓库为 **Apache-2.0**，其跟踪计数显示 **30 个未关——15 个 issue 与 15 个 pull request**。

**Why it matters:** 两条修复版本号才是被头条遮住的故事。**1.9.0** 发布于 **2026-09-10T22:12Z**，也就是说那个 10.0 在描述它的公告发出之前 **47 天**就已修好；**1.7.0** 发布于 **2026-05-21T18:15Z**，让那个 8.4 的 SQL 注入在披露时已经存在了 **158 天**。一句"请升级到 1.9.0 或更新版本"是正确的，却仍然低估了这个 SQL 注入在被修好又无人知晓的状态里待了多久。第二点：NVD 显示该记录处于 **Awaiting Analysis**，且 **NVD 自己没有任何评分指标**——10.0 是 NVIDIA 作为 CNA 给出的数字，不是第二方意见——所以严重性、CWE，以及下游每一个按严重度分档的判断，全都只由一方支撑。NVIDIA 自己的脚注同样适用：其"风险评估基于一组多样化的已安装系统上的平均风险，可能不代表你本地安装的真实风险"。一个 agent 框架里的 `S:C` 10.0 意味着出问题的组件并不是安全边界——这与分数的形态一致，也正是"在假定这个数字只是理论值之前，先查清 toolkit 前面实际挡着什么"的理由。

[`🔗 NVIDIA — Security Bulletin 5912: NeMo Agent Toolkit`](https://github.com/NVIDIA/product-security/blob/main/2026/5912/5912.md) · [`🔗 NVD — CVE-2026-65145`](https://nvd.nist.gov/vuln/detail/CVE-2026-65145) · [`🔗 NVIDIA/NeMo-Agent-Toolkit`](https://github.com/NVIDIA/NeMo-Agent-Toolkit)

---

## 21. Tailscale SSH 一周内收到四份公告——全部修复于 1.104.4、都没有 CVE，而变更日志还停在 1.104.2

- **Velocity:** ▮▮▮ trending
- **Source:** Tailscale security bulletins TS-2026-014–017 / Hacker News · 304 pts · 约 1 天前（~10 月 27 日 19:55 UTC+8）
- **Tags:** `tailscale` `ssh` `privilege-escalation` `disclosure` `cve`

Tailscale 为 **Tailscale SSH** 与 Serve 发布了**四份**安全公告，全部修复于 **1.104.4 或更新版本**。**TS-2026-014**：运行在 root 权限下的 `tailscaled` 里的 SSH 服务器**按字面**校验 Unix socket 路径，然后**以 root 身份**执行操作——三个 bug 叠加（通过 `ssh -L` 的特权拨号、通过 `ssh -R` 替换 socket 时删掉 root 拥有的 socket、以及一个能绕过白名单的 TOCTOU 竞态，因为"内核在初次检查之后会重新解析路径"），可达目标是 Docker socket 与 `tailscaled` 本地 API。**TS-2026-015**：会话中持续的 window-change 消息与环境变量追加导致内存无界增长，其内存"在对端断开之后仍然留存"——`tailscaled` 被 OOM 杀掉会带走该节点上所有 Tailscale 连接。**TS-2026-016**：`tailscale serve` 到 Unix socket 的 TCP 转发"缺少保护、且以 root 身份拨号"，另外符号链接保护只在配置重载时运行而非每次拨号——可通过本地 API 完全接管节点。**TS-2026-017**：一个 HTTP/2 `serveHTTPContext` 竞态，同一连接上的并发流可能让 **Tailscale-App-Capabilities** 在多个挂载点之间串味。总括公告说"我们识别出的 Tailscale SSH 问题大多涉及提权"，并未建议一刀切地停用 Tailscale SSH，并提供 `TS_SSH_DISABLE_FORWARDING=1` 作为临时缓解。

**Why it matters:** TS-2026-014 与今天那条 GoAhead 是同一形态——*校验的是字符串，执行的却是 root*——而第三个子 bug 才具有一般性：字面白名单加一次特权系统调用，无论出现在哪里都是竞态，不是边界。制品层面的割裂才是实际问题。四份公告没有一份带 CVE 编号（公告索引里只列出 **CVE-2022-41924**、**-41925** 与 **CVE-2023-28436**），于是漏洞情报流与扫描器没有任何可用的键。而发布页面与变更日志互相矛盾：`pkgs.tailscale.com/stable` 上已经有 `tailscale_1.104.4`，而公开变更日志里最新的客户端条目仍是 **v1.104.2（10 月 21 日）**，没有 1.104.4 这一行。所以"我打补丁了没有"这周是一个 `tailscale version` 的问题，不是看发布说明的问题——而对任何允许 SSH 转发的人来说，在升级到位之前就可以先把转发关掉。

[`🔗 Tailscale — SSH 事件调查与修复更新`](https://tailscale.com/ssh-investigation-update) · [`🔗 Tailscale — 安全公告`](https://tailscale.com/security-bulletins) · [`🔗 pkgs.tailscale.com — 稳定版软件包`](https://pkgs.tailscale.com/stable/)

---

## 22. jackson-databind 的 9.8 是一次不完整的修复——6 月的补丁只校验了外部类，没校验泛型参数

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub Advisory GHSA-m8xf-2cr7-77ph / NVD / OSV · 公告发布于 2026-10-20 · CVE 记录 2026-10-28
- **Tags:** `cve` `jackson` `deserialization` `java` `supply-chain`

**CVE-2026-110879**（**CWE-502**，**CVSS 3.1 9.8**，`AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H`）是一次**通过泛型类型参数与数组元素类型绕过 PolymorphicTypeValidator** 的漏洞，它自己的公告称其为"**CVE-2026-54512 的不完整修复**"。`DatabindContext._resolveAndValidateGeneric()` 先拿外部类对照声明的基类型检查，随后却拿每个泛型参数去对照**外部基类型**，而不是它自己声明的绑定——于是在默认的 `DefaultBaseTypeLimitingValidator` 下，"这会在泛型子类型内部接受一个无关的类，即使同一个类作为直接类型 ID 会被拒绝"。当某条 `allowIfBaseType(...)` 规则批准了外部类型时，Jackson 会直接换上 `LaissezFaireSubTypeValidator`。给出的实例：声明为 `Map<String,String>` 的属性会接受 `HashMap<FileSystemXmlApplicationContext,String>`，而 map key 的发现逻辑会把攻击者的 JSON 属性名交给那个类的单字符串构造函数——当 classpath 上有 Spring 时，这会加载攻击者的 XML 并调用 `ProcessBuilder.start()`。自 **2.10.0** 起受影响；修复于 **2.18.12**、**2.21.8**、**2.22.4**，Jackson 3.x 则是 **3.1.8** 与 **3.2.4**。

**Why it matters:** 6 月那份公告（GHSA-j3rv-43j4-c7qm，**8.1**，发布于 **2026-06-23**）加了泛型参数校验，评分为 8.1；四个月后的替代品是 9.8——这就是一次不完整修复的代价。第二件事是注册库状态，亲自核查过：`api.github.com/advisories/GHSA-m8xf-2cr7-77ph` 返回 **404**，而 `github.com/FasterXML/jackson-databind/security/advisories/GHSA-m8xf-2cr7-77ph` 正常渲染，并且 **OSV 对 CVE-2026-110879 的记录只带 `GIT` 范围**——完全没有 Maven 范围。所以一个 Maven 扫描器问"`jackson-databind` 2.22.3 受影响吗"，除非生态侧的公告落地，否则无从匹配，尽管仓库公告从 **10 月 20 日**起就列出了修复版本。记录本身比描述它的那个页面还新 8 天。

[`🔗 GHSA-m8xf-2cr7-77ph — jackson-databind`](https://github.com/FasterXML/jackson-databind/security/advisories/GHSA-m8xf-2cr7-77ph) · [`🔗 NVD — CVE-2026-110879`](https://nvd.nist.gov/vuln/detail/CVE-2026-110879) · [`🔗 OSV — CVE-2026-110879`](https://api.osv.dev/v1/vulns/CVE-2026-110879)

---

## 23. Adobe 的 Campaign Classic 公告给一个算出来是 10.0 的向量印了 9.8——而它八个 CVE 全是 Critical

- **Velocity:** ▮▮ rising
- **Source:** Adobe security bulletin APSB26-162 / NVD · 发布于 2026-10-27
- **Tags:** `cve` `adobe` `cvss` `campaign` `provenance`

**APSB26-162** 是针对 **Adobe Campaign Classic v7** 的 Priority 2 更新，修复**八个** CVE，每一个都被评为 **Critical**：**CVE-2026-105781** SQL 注入、**CVE-2026-104351** 代码注入、**CVE-2026-104353** 操作系统命令注入、**CVE-2026-105780** 授权不当、**CVE-2026-105489** SQL 注入、**CVE-2026-104350** 反射型 XSS、**CVE-2026-104354** SQL 注入与 **CVE-2026-105779** SQL 注入。Adobe 表示它"尚未获悉本更新所处理问题的任何在野利用"。受影响范围是 **ACC v7 7.4.4 build 9402 及更早**，修复版本是 **7.4.4 build 9403**——在一个未变的版本字符串内部做了一次 *build* 递增。

**Why it matters:** 两件可核查的事，其中一件是算术。用一次第一遍 CVSS 3.1 计算器重算公告里的每个向量，**八个里有七个精确复现**（9.9、9.9、9.9、9.9、9.3、9.1、9.1）——而 **CVE-2026-105781 不能**：Adobe 在 `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H` 旁边印着"**CVSS 基础分：9.8**"，而它算出来是 **10.0**，NVD 对该记录给出的也是这个数。9.8 恰好是同一串向量在你丢掉 **`S:C`** 作用域变更后得到的结果，所以页面上的数字是它自己向量的*未加作用域*读法。这就是"页面上的第二个数字"陷阱朝厂商方向发生，而不是朝聚合站方向发生——而它也是整份公告里唯一一处七个邻行都自洽的地方，正因如此才能判断这是一次打分失误，而不是另一个修订版本。第二件事是运维层面的：**7.4.4 build 9402** 与 **7.4.4 build 9403** 对任何读取版本字符串的清单工具来说都是同一个产品版本，所以"我们在 7.4.4 上"不是一句"已修复"的陈述——build 号才是。

[`🔗 Adobe — APSB26-162: Security update for Campaign Classic`](https://www.adobe.com/trust/security/products/campaign/apsb26-162.html) · [`🔗 NVD — CVE-2026-105781`](https://nvd.nist.gov/vuln/detail/CVE-2026-105781)

---

## 24. llama.cpp 的 ggml-rpc 往一个 1 字节的栈变量里写 256 KiB——而 VulnCheck 同时给它 8.1 和 9.2

- **Velocity:** ▮▮ rising
- **Source:** NVD / VulnCheck / ggml-org/llama.cpp · 记录发布于 2026-10-28T03:17Z
- **Tags:** `cve` `llama-cpp` `rdma` `memory-safety` `provenance`

**CVE-2026-118375**（**CWE-787**）是 llama.cpp **ggml-rpc RDMA 传输**中 `rdma_recv()` 里的一个越界写。一个在 HELLO 消息里声明支持 RDMA 的对端"可以向 `rpc_serve_client()` 中一个 **1 字节**的栈变量写入最多 **256 KiB**"，使服务器崩溃或可能执行代码。受影响范围是 **b8841 到 b11865 之前**；修复是 PR **#30399**（提交 `9a0fde9`），随构建 **b11865** 发布，发布时间 **2026-10-24T19:30Z**——所以记录比修复还新 **3.3 天**。

**Why it matters:** 这条记录带**来自同一个来源的两个指标**，两者差 1.1 分，而这正是那种"只看槽位就会把'两个分数'读成'两个打分方'"的情形。两个都是 **VulnCheck 的**：**CVSS 3.1 `Primary` 8.1**（`AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:H`）与 **CVSS 4.0 `Secondary` 9.2**（`AV:N/AC:L/AT:P/PR:N/UI:N/VC:H/VI:H/VA:H/SC:N/SI:N/SA:N`）。3.1 那个数是 8.1，因为 `AC:H`；4.0 那个数是 9.2，因为 `AT:P`——同一个判断写了两遍，你看到哪个，取决于你的扫描器读哪个字段。版本范围是另一个陷阱：`b8841` 与 `b11865` 是**每夜构建标签**，不是发行版，所以 `pip`/`brew` 的版本字符串回答不了"我打补丁了没有"。任何在信任边界上开着 RDMA 跑 `rpc-server` 的人，在 build 号给出相反证据之前，都该把这个传输层视为预认证即可触达。

[`🔗 NVD — CVE-2026-118375`](https://nvd.nist.gov/vuln/detail/CVE-2026-118375) · [`🔗 ggml-org/llama.cpp — 修复 PR #30399`](https://github.com/ggml-org/llama.cpp/pull/30399) · [`🔗 ggml-org/llama.cpp — 发布 b11865`](https://github.com/ggml-org/llama.cpp/releases/tag/b11865)

---

## 25. MLflow 的 9.8 会导入你放进去的那个类——而修复比公告早 20 天发布

- **Velocity:** ▮▮ rising
- **Source:** GitHub Advisory GHSA-26p8-2jq9-3vq9 / NVD / MLflow releases · 公告发布于 2026-10-27T21:26Z
- **Tags:** `cve` `mlflow` `deserialization` `ai-platform` `rce`

**CVE-2026-116692**（**CWE-470**、**CWE-94**、**CVSS 3.1 9.8**）影响 MLflow **从 3.12.0rc0 到 3.17.0 之前**。`mlflow/genai/scorers/base.py` 中的第三方 scorer 路径"接受请求指定的 `THIRD_PARTY_SCORER_ALLOWED_MODULES` **后代模块**，而不是要求精确匹配某个被允许的模块"。攻击链是：调用者用 MLflow 的 artifact 端点把一个 Python 模块放到某个可写的被允许包下面，然后通过 `/ajax-api/3.0/mlflow/scorer/invoke` 提交它的模块名与类名，`Scorer.model_validate_json()` 会在 trace 处理**之前**导入并构造它。在关闭认证的部署上这不需要任何凭据；开启 basic auth 时，则需要一个能创建实验、运行并上传 artifact 的主体。无论哪种情况，"被允许的 scorer 包必须对服务器进程可写"。修复于 **3.17.0**，发布于 **2026-10-07T08:24Z**。

**Why it matters:** 这份白名单是**前缀测试**，不是成员测试——"某个模块的后代"与"信任一个未枚举的子类"属于同一类缺陷，而它是本刊近期窗口里第三个"用白名单做反序列化"的 bug。三个条件要仔细读，因为它们是合取关系，而且每一条都是部署事实而非代码事实：认证关闭（或一个低权限主体）、一条 artifact 上传路径、一个服务器可写的 scorer 包。这是开发者那台 MLflow 机器的形态，不是加固过的形态。时间线是另一半：修复版本与公告之间隔了 **20.5 天**，所以钉在 `3.17.0` 的部署在扫描器说这个 CVE 存在之前一个月就已经安全了——而钉在 `3.16.x` 的部署全程脆弱，情报流里没有任何东西会告诉你。

[`🔗 GHSA-26p8-2jq9-3vq9 — MLflow`](https://github.com/mlflow/mlflow/security/advisories/GHSA-26p8-2jq9-3vq9) · [`🔗 NVD — CVE-2026-116692`](https://nvd.nist.gov/vuln/detail/CVE-2026-116692) · [`🔗 MLflow v3.17.0 发布`](https://github.com/mlflow/mlflow/releases/tag/v3.17.0)

---

## 26. WatchGuard 一次发布 18 条 Fireware OS 记录——全是 CVSS 4.0，没有一条是 3.1

- **Velocity:** ▮ steady
- **Source:** WatchGuard PSIRT 公告板 / NVD · 记录发布于 2026-10-27T16:17Z
- **Tags:** `cve` `watchguard` `firewall` `cvss` `provenance`

WatchGuard 的 CNA 在 **2026-10-27** 的五秒之内（16:17:28Z–16:17:33Z）发布了 **18 条 Fireware OS 与 Mobile VPN 记录**，而 **18 条在 NVD 里全部仍处于 `Received`**。七条评分 **≥ 9.2**：**CVE-2026-103594** 为 **9.5**（WireGuard 配置处理中的栈溢出）、**CVE-2026-90465** 为 **9.4**（FireCluster Sync 中的认证缺失——"以 root 身份调用特权防火墙管理操作"），另有五条为 **9.2**——**CVE-2026-112709** 与 **-112710**（AD 认证服务中的堆溢出，预认证 RCE）、**CVE-2026-93857**（SIP 代理栈溢出，未认证 RCE）、**CVE-2026-93865**（FireCluster 同步守护进程，认证缺失，可从集群管理 IP 触达）与 **CVE-2026-93866**（Access Portal WebSocket 处理中的整数溢出）。FireCluster 直接出现在其中**四**条里——三个认证缺失 bug 加一个越界读。版本范围很宽且呈分支状：**`2025.1 < 2026.4`** 与 **`12.0 < 12.12.4`**，**T15/T35** 硬件则在自己的 `12.0 < 12.5.22` 线上。

**Why it matters:** 可测量的事实是：**18 条里 0 条带 CVSS 3.1 指标**——每个分数都是 **CVSS 4.0**，而每个 9.2 都带 **`AT:P`**（"攻击要求：存在"），这是 4.0 编码前置条件的方式，3.1 会用 `AC` 或 `PR` 来表达。任何只读 `cvssMetricV31`、别的都不看的流水线，会在一台终结你互联网入口的设备上看到十八个没有评分的防火墙 CVE。把这同样的 18 条对照 WatchGuard 自己的公告板交叉核查，**15 条完全一致，3 条不一致**：**CVE-2026-103593** 板上写 **9.1**、记录里是 **7.1**，**CVE-2026-82332** 写 **5.6**、记录是 **5.7**，**CVE-2026-90465** 写 **8.7**、记录是 **9.4**——最后这个才是要紧的，因为它是一枚"高危"标签与一个严重分之间的差别。顺带一提，8.7 恰好是那条记录的 4.0 向量在按 3.1、并用 `S:U` 而不是 `SC:H` 去读时得出的数，所以这个分歧看起来像两套框架的差异，而不是两个判断的差异——但公告板不发布向量，所以那只是我这边的算术，不是 WatchGuard 的陈述。

[`🔗 WatchGuard — PSIRT 公告板`](https://psirt.watchguard.com/) · [`🔗 NVD — CVE-2026-90465`](https://nvd.nist.gov/vuln/detail/CVE-2026-90465)

---

## 27. Heads of Security：每个注意力头一个学习到的门控，把 RL-Hammer 从 97% 降到 10%

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.37657 / arXiv HTML · 日期 2026-10-27 · 9 位作者
- **Tags:** `prompt-injection` `security` `attention` `defense` `research`

**Heads of Security（HoS）** 是一种提示注入防御，它"通过一小撮学习到的逐头注意力门控来强制指令与数据的分离"——它学习每个注意力头应当如何在可信与不可信 token 之间重新分配注意力，而不是重新训练模型去忽略注入的指令。在 **Llama-3.3-70B-Instruct** 与 **GPT-OSS-20B** 上评测，对照 **SecAlign++**（微调式）与 **ASIDE**（架构式）。数字是：黑盒的 **RL-Hammer** 攻击对 GPT-OSS-20B 达到 **97% ASR**，对 SecAlign 达到 **85%**，但对 HoS 只有 **10%**；白盒攻击 **Claudini**"通过 autoresearch 针对 HoS 做了强化"，需要**多 3 倍的 FLOPs** 才能达到同样的 ASR。HoS 在标准选择题基准上保住了基座模型的效用，而 SecAlign 与 ASIDE 在少样本设置下退化，ASIDE 在工具使用上效用只剩 **10%**。

**Why it matters:** 97→10 这个差距是在**黑盒**攻击上取得的，而黑盒才是外部攻击者真正拥有的那种，并且它来自架构改动而不是更多安全数据——这才是值得拿自己的技术栈去检验的论断。但在引用之前先读结果的边界："在带有**静态**攻击的 agentic 基准上，HoS 与 SecAlign 表现相近"，所以那个大差距落在注入测试集上，不在 agentic 测试集上；论文自己的说法是，在那里两者都"相对基座模型大幅改善了安全—效用权衡"。残留的 **10%** 也不是零：逐头门控是威胁模型内部的一个学习组件，而 `Claudini` 加 autoresearch 已经是攻击它的现成配方。九位作者，包括帝国理工的 Yves-Alexandre de Montjoye——作者单位在 HTML 全文里，不在摘要页上。

[`🔗 arXiv — Heads of Security`](https://arxiv.org/abs/2610.37657) · [`🔗 arXiv HTML 全文 — 作者单位`](https://arxiv.org/html/2610.37657v1)

---

## 28. 工具使用智能体的缩放定律：458,752 个任务与 849 个训练模型说多样性胜过数量

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.37648 / arXiv HTML · 日期 2026-10-27 · 8 位作者
- **Tags:** `tool-use` `agents` `scaling-laws` `synthetic-data` `training`

**SynthAPI** 生成工具使用环境，同时"沿**工具、任务，以及工具所操作的数据库**这几个维度，显式控制所生成环境的多样性"。把这些控制项在 **458,752 个任务**与 **849 个四种不同规模的训练模型**上做变化，得到一条缩放定律，它"根据所合成环境的规模与构成，预测下游工具使用智能体的泛化能力"。三点发现：随着数据预算增长，扩展**工具与数据库多样性**比增加任务数量更有效；提高数据**复杂度**带来更大增益；按这些规则缩放的智能体在四个评测基准上"优于用先前工作数据训练出来的模型"。

**Why it matters:** 这把"我需要多少环境"从猜测变成了一条带构成项的曲线，也是第一次把合成智能体数据从一次抓取变成一笔工程预算。注意事项在于这里的"多样性"指什么：它是**沿流水线可控的三个 API 表面维度做组合式扩张**，不是来自真实流量的分布偏移——所以这条定律预测的是 SynthAPI 家族*内部*的泛化，而论文关于击败先前工作的说法，是在该家族被调优过的那同四个基准上测出来的。它也和多数缩放定律论文一样，是一个关于*合成*工具使用的结果；摘要没有给出"你的生产工具恰恰是长尾那一端"这种情况的系数。

[`🔗 arXiv — Scaling Laws for Tool-Use Agents`](https://arxiv.org/abs/2610.37648) · [`🔗 arXiv HTML 全文`](https://arxiv.org/html/2610.37648v1)

---

## 29. 没有一个潜在世界模型真正学到了动力学——一项新的一致性度量这样说

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.37588 / arXiv HTML · 日期 2026-10-27 · 2 位作者
- **Tags:** `world-models` `evaluation` `latent-dynamics` `equivariance` `research`

论文把**忠实的潜在世界模型**定义为环境转移映射与所学潜在动力学之间的一种*等变条件*，并提出**潜在回放一致性（LRC）**，针对它给动作条件下的潜在预测打分。结果对这一类模型是负面的："在所研究的当前最优潜在世界模型中，**没有一个**是通过真正忠实地建模环境动力学来解决任务的。"作者对领域的诊断针对的是评测而非架构——现有基准"往往强调任务表现，却对所学世界模型是否获得了能反映环境底层结构的预测性潜在动力学，提供的洞见有限"。

**Why it matters:** 把它和今天那条 **Genie 4** 放在一起读，因为它们是同一个发现的两个方向。DeepMind 自己的局限性清单说视觉细节与客体永久性"会随时间漂移"，尤其在多次编辑之后或导航过程中；LRC 正是度量这个差距的一种方式，而它给出的答案是：任务成功与忠实的动力学是分家的。一个模型可以产出貌似合理的回放、满足下游奖励，却并未编码转移函数——这对预可视化无妨，对规划则是致命的。一条要直说的注意事项：摘要**没有点名任何模型、任何数据集，也没有给出任何 LRC 数值**，所以"没有一个"是一个关于摘要未枚举的集合的陈述。在引用一份清单或一个分数之前先打开 PDF，并把这篇当作一份度量提案，而它的第一次应用就是作者自己的负面结果。

[`🔗 arXiv — Understanding the limits of latent world models`](https://arxiv.org/abs/2610.37588) · [`🔗 arXiv HTML 全文`](https://arxiv.org/html/2610.37588v1)

---

## 30. 无标签 RLVR 的崩溃存在临界数据集规模——而且题目越多越糟

- **Velocity:** ▮ steady
- **Source:** arXiv 2610.37553 / arXiv HTML · 日期 2026-10-27 · 1 位作者
- **Tags:** `rlvr` `reinforcement-learning` `collapse` `theory` `reasoning`

无标签 RLVR 奖励模型与自己的多数投票保持一致。它"起初改善推理，但最终会崩溃：自评奖励升到 1 而准确率下降，常常直到模型对每个问题都给出同一个答案"——而且反直觉的是，"只有当训练使用大量题目时，崩溃才会出现"。论文把这种对数据集规模的依赖解释为一种集体不稳定性：对 **N** 个训练题目，逐题锐化的速度按 **1/N** 变慢，而一个**共享模式**以正比于 **λ²** 的速率增长、与 **N** 无关，于是得到一个临界题目数 **N_c ≃ ln(1/δ)/(λ²G)**。模拟确认了一次陡峭的相变、**N_c ∝ λ⁻²**（至多相差一个对数修正）、"在耦合方式、置信度剖面与训练变体之间单一的临界放大 **λ²NG**"、对批大小的对数依赖，以及**初始模型有把握时不会崩溃**。一个核方法版本识别出一个保护性耦合与一项边际熵奖励；在小 Transformer 的无标签 RL 中，"移除共享方向可以完全避免崩溃，恢复它则导致崩溃，而崩溃随训练集规模与基座模型熵增大"。

**Why it matters:** 可行动的翻转在于：**扩大题目集本身就是失效模式**，这与面对训练数据瓶颈时的默认直觉正好相反——而机制说明了原因：共享模式是*题目分布*的一个属性，所以增加题目所带来的锐化信号，比它带来的共享漂移增长得更慢。它指向的补救是结构性的（移除或惩罚共享方向），而不是调一下学习率，而那才是值得在真实训练里检验的部分。这是一篇单作者的论文，模拟跑在小模型上，所以它的价值在于那个可被证伪的预测——`N_c ∝ λ⁻²`，配上可测量的 `λ²NG`——而不是一份配方。

[`🔗 arXiv — Collective Dynamics of Self-Reinforcement`](https://arxiv.org/abs/2610.37553) · [`🔗 arXiv HTML 全文`](https://arxiv.org/html/2610.37553v1)

---

## 31. Anthropic 的药物项目：35,000 个抗体设计、核查 1,061 页——以及"大部分仍处于临床前"

- **Velocity:** ▮▮ rising
- **Source:** Anthropic research blog / Hacker News · 242 pts · 238 条评论 · 约 1 天前（~10 月 27 日 20:50 UTC+8）
- **Tags:** `anthropic` `life-sciences` `drug-discovery` `case-study` `research`

Anthropic 的生命科学团队公布了 **六个**合作项目的结果——**BigHat Biosciences、Bristol Myers Squibb、Divergence Labs、Enveda、Generate Biomedicines** 与 **The Column Group**——以及收购一人公司 **Mithril Medicine** 之后自家的发现项目。具体数字，每一个背后都有合作方的技术报告：在 **Generate**，六位科学家用 Claude Code 缩短 CAR-T 构建体的一部分，得到一个**约短 70%** 的设计，让免疫细胞产出**约 10 倍**的受体；在 **Divergence**，Claude"基本自主地在一个月左右生成了约 **35,000** 个抗体设计"，早期测试从中找到 **3** 个 IgE 结合物与 **20** 个能置换 IgE 的设计，其中 **3** 个优于标准药物；在 **BigHat**，约 **1,010** 个变体在约 10 周内产出的先导分子结合强度提高 **>10 倍**、在溶液中稳定温度高 **18 °C**、聚集速度慢 **>100 倍**——而且 Claude 还论证说标准的耐热性与聚集指标具有误导性，随后提出了替代方案由实验室去跑；在 **Enveda**，面对 **1,061** 页材料，Claude"抓到了人工审阅者发现的所有 **11** 个问题——还标出了他们漏掉的七个"，把审阅时间从 **25 小时**以上降到 **3 小时**以内，并在 **4 小时**内起草了一份监管文件，对照的是"手工约三个月"。

**Why it matters:** 这些是有名有姓的合作方给出的实验室测量，背后有已发布的技术报告，这是这一类主张能采取的最强形式——而最该带走的是帖子自己结尾那一节里的句子："所有这些研究仍处于早期阶段。特别是到目前为止，它**大部分仍处于临床前**——也就是说，大体上还没有到药物在人体中测试的阶段。"有两个指标在流传出去之前需要把分母挂上。"**11 个里抓到 11 个**"是一个在单一 1,061 页语料上的**召回**陈述，帖子里没有假阳性计数，所以它还没有说明审阅者得往后读掉多少噪声。而"**4 小时对三个月**"是把一份初稿与一份已完成的文件相比——帖子里说另一份稿子经过了人工审阅，"发现了一处小错误"，这是正确的披露，也正是这两个数字不能构成加速比的原因。

[`🔗 Anthropic — Early progress on accelerating drug development with Claude`](https://www.anthropic.com/research/early-progress-drug-development) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50265609)

---

## 32. Survival LLM 在断网状态下跑一个 AI 与 93 万篇维基百科文章——并公开了自己的 22 题测试

- **Velocity:** ▮▮ rising
- **Source:** brangus.io / Hacker News · 385 pts · 148 条评论 · 约 1 天前（~10 月 27 日 19:55 UTC+8）
- **Tags:** `local-first` `offline` `open-source` `retrieval` `emergency`

**Survival LLM** 是一个免费开源应用，在你自己机器上跑一个本地模型加一个本地参考书库——联网时完成安装，之后完全离线，包含"维基百科阅读量最高的约 **93 万**篇文章"，外加 WikiMed、MedlinePlus、UK Medicines A to Z、WikEM、Ready.gov、CDC 旅行健康、美军医学与生存手册、wikiHow、iFixit、Appropedia 与 Stack Exchange 问答。每个回答都列出它读过的文章，并"高亮确切的段落"。它按可用内存挑选模型，并公开每一档的准确率：**≥128 GB Mac → NVIDIA Nemotron 3.5 Super（80 GB），21/22**；**32–96 GB Mac → Qwen3.8 27B（18 GB），21/22**；**≥32 GB Windows PC → Nemotron 3.5 Lightning（25 GB），19/22**；**16–31 GB → IBM Granite 4.2 8B（6 GB），14/22**。书库下载 **9 GB**（安装后 **19 GB**），不含维基百科与 iFixit 时是 **1.3 GB / 3 GB**。电量也写明了："回答时约 **100 W**，每题 **5 到 40 秒**。"

**Why it matters:** 那张按内存分档、每档旁边配一个准确率的表，是"能在你自己的机器上跑"能采取的最诚实形式，因为它告诉你你在拿什么做交换，而不是暗示没有交换。现在读那些数字的脚注：**22 道题**，关于停电与急救，"盲评，依据的是我们对书库**较早构建**所做的测试"，判据是"抓住了官方指引的要点"。22 个条目是一个很宽的区间，评分者就是作者，最小那档是 **14/22**——所以这张表是一个相对排序，不是可靠性数字。真正撑起安全论证的是页面在同一口气里说出的那个界面决定——"它可能出错……每个回答都展示它用过的文章，所以你可以核对"——而带高亮的引用是一个你可以审计的机制，准确率百分比则不是。

[`🔗 Survival LLM`](https://www.brangus.io/survival-llm) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50264853)

---

## 33. RuView：隔墙 WiFi 姿态估计拿到 100,544 星——而它自己的基准日志记录 PCK@20 为 3.0%

- **Velocity:** ▮▮ rising
- **Source:** ruvnet/RuView / 仓库基准日志 / GitHub Trending · 100,544 星
- **Tags:** `wifi-sensing` `csi` `pose-estimation` `benchmark` `repo`

**RuView** 把低成本 **ESP32** 传感器采集的 WiFi 信道状态信息变成存在检测、呼吸与心率、活动识别，以及"无摄像头姿态——从 WiFi CSI 估计 **17 个身体关键点**"，并提供 Home Assistant、Matter、Apple Home、Google Home 与 Alexa 集成，每节点 **21 个实体**。仓库有 **100,544 星**、**13,122 fork**，计数显示 **497 个未关**，拆开是 **72 个 issue 与 425 个 pull request**——MIT，今天还有推送。它自己的 `docs/benchmarks/pose-estimation-cog.md` 里只有**一次**实测——**v0.0.1，2026-05-19**——记录 **PCK@20 为 3.0%**、**PCK@50 为 18.5%**、归一化 **MPJPE 0.0931**，来自单次"30 分钟坐在桌前录制"中取的 **1,077 对配对样本**，平均置信度 **0.44**，只训练了 **2.1 秒**，编码器是**随机初始化**的，因为"HF 的 presence 模型是 MLP `8→64→128`，与这个 Conv1d 形状不兼容"。

**Why it matters:** 仓库自己的验收门槛是 **ADR-079 的 PCK@20 ≥ 35%**，而唯一公开的、高出它自己 **0.0%** SPSA 基线（2026-05-19 之前）的那次运行是 **3.0%**——差了一个数量级，而且只在一个受试者、一种姿势上。逐关节表自己解释了它最好的那几行：最强信号是 **r_hip**（PCK@20 25.0%、PCK@50 **76.9%**）、**r_knee**（PCK@20 0.9%、PCK@50 35.2%）与 **r_shoulder**（PCK@20 1.9%、PCK@50 19.9%）——文档自己的总结句把后两个写成不带标签的百分数，而它们是 @50——这"与数据采集时的相机取景一致（操作者右侧最常出现在画面中）"——模型学到的是相机看到的那一侧，这是标签泄漏的特征，不是感知结果。日志还写着"距离 ADR-079 的 PCK@20 ≥ 35% 目标，剩余差距是数据层面的，不是基础设施层面的"，而设备冒烟测试记录"**触发了 0 个 `pose.frame` 事件**"，因为没有连接任何 CSI 来源。这些都不说明项目不诚实——日志坦率得少见，而且带日期、只追加。它确实意味着 star 数不是姿态这项主张的证据：关于生命体征与存在检测的主张，我找不到可比的测量日志，而 README 自己对统一 RF 世界模型的注释——"在真实数据验证之前，准确率仍是**合成**的"——是同一个警告，只是字号更小。

[`🔗 ruvnet/RuView`](https://github.com/ruvnet/RuView) · [`🔗 RuView — 姿态估计基准日志`](https://github.com/ruvnet/RuView/blob/main/docs/benchmarks/pose-estimation-cog.md)

---

## 34. Moxnox 1.0：一个跑在 btrfs 上、NT 形态的 POSIX 系统，13 万行 C++，而且能自己构建自己

- **Velocity:** ▮ steady
- **Source:** maharmstone/moxnox / Hacker News · 80 pts · 18 条评论 · 约 1 天前（~10 月 27 日 23:53 UTC+8）
- **Tags:** `operating-system` `nt` `posix` `btrfs` `release`

**Moxnox v1.0** 是一个业余操作系统，带着一对不寻常的约束。它的系统调用设计"模仿 Windows NT"，但它"应当能够运行写给类 Unix 系统的软件，**前提是为它重新编译过**"，并且"自带一套完整的 GNU 基础系统"。它成熟到足以**自举**——"你可以在 Moxnox 上构建 Moxnox"——跑在 **btrfs** 上，支持 **amd64 与 aarch64**，"大约 **13 万行 C++**"。两个架构的 v1.0 镜像都已发布，README 里有记录在案的 QEMU 启动方式。仓库记录创建于 **2026-10-22**，收录时 **152 星**——但它的历史始于 **2021-12-08**（"initial commit"），有 **9,479 次提交**，所以 `created_at` 标的是这个公开的家，不是项目本身。

**Why it matters:** 设计上的赌注才是有意思的部分——把**系统调用 ABI**定成模仿 NT，同时要求 POSIX 软件重新编译，意味着兼容性是一份源码层面的契约，而不是二进制层面的，这也是为什么"重新编译"写在 README 里而不是埋在 FAQ 里。这与 Wine 那种二进制兼容是完全不同的命题，也正是一个 13 万行的系统能同时声称两者的原因。警告由作者自己说出，值得原样复述："btrfs 代码能应付基本用途，但尚未经过**实战检验**。请不要挂载除一次性文件系统之外的任何东西。"一个只见过你能重新生成的镜像的文件系统实现是数据丢失风险，而 README 在功能列表的同一页上就说了这一点——这是正确的顺序。

[`🔗 maharmstone/moxnox`](https://github.com/maharmstone/moxnox) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50267569)

---

## 35. "Git for the US Code"：回放 365 处修正、361 处精确复现，剩下四处也标注了

- **Velocity:** ▮ steady
- **Source:** Lexifina blog / Hacker News · 305 pts · 145 条评论 · 约 1 天前（~10 月 28 日 01:47 UTC+8）
- **Tags:** `law` `version-control` `provenance` `data` `methodology`

Lexifina 的这篇文章描述的是一层架在《美国法典》之上的版本控制，并且给的是验证方法而不是演示。对"2017 年以来每一对发布点"，他们取中间生效的公共法律，"按日期顺序在较旧的文本上执行它们的修正指令"，再把结果与较新的官方发布点比对："九个标题下的 **365** 处变更中，有 **361** 处精确复现了下一个发布点"，而"另外四处会带一个标注，说明它们能被确认到什么程度"。每处变更都带其法律与生效日期——**261** 处按颁布默认生效、**72** 处按生效日期注释、**29** 处按修正案自身的日期——还有一处变更"取决于一项可能永远不会到来的机构裁量，我们把它排除在文本之外，而不是去猜"。动机是在模型上量出来的：一项 TUM 研究发现，某个模型独立正确回答了 **24%** 的截止日期之后的德国法条问题，而在检索到相关法条原文后达到 **87%**；在第二项研究中，应用修正案法律生成的输出与官方文本"**93–99% 相似**"，但只有"单条修正案的一半、修正案链的五分之一精确匹配"，专家在那些"相近但不一致"的结果里发现了"法律上重要的错误"。

**Why it matters:** 回放修正案、再与下一个官方发布点做 diff，是一种不依赖信任模型的基准真值——那是方法论上的贡献，也是那 4 处失败可以被标注而不是被丢弃的原因。一个报告 361/365 并点名那四处的数据集，与一个只报告百分比的数据集是不同的制品。它列出的限制是那种对法律而非对软件要紧的限制："它还没有展示后来的法律对其覆盖的较早日期所产生的回溯效力，所以对于一个在 2022 年那段间隙里立案的案件，它展示的是下界，却不会提醒你 2022 年 6 月的法案改变了答案"；而生效日期注释"是按模式读取的"，措辞不寻常时回退到颁布日期。这一切背后还压着一个值得带走的法律事实：在国会已作为实在法颁布的那些标题之外，法典只是**初步**证据，两者不一致时以《美国法律汇编》为准——所以对法典的忠实重建仍然不是法律本身的来源。

[`🔗 Lexifina — Git for the US Code`](https://lexifina.com/blog/git-for-the-us-code) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50268380)

---

## 36. Expo 发布 24 个官方 agent skill——而清单按"谁来付钱"把它们分开

- **Velocity:** ▮ steady
- **Source:** expo/skills / Expo 文档 · 仓库推送于 2026-10-28T11:10Z
- **Tags:** `agent-skill` `expo` `react-native` `marketplace` `repo`

**expo/skills** 是 Expo 团队官方的 AI agent skill 集合，用于构建、部署、升级与调试 Expo 与 React Native 应用——**MIT**、**3,357 星**，今天还有推送。它的 `skills.sh.json` 清单把 **24** 个 skill 分成三组——这个总数是从清单本身数出来的，因为没有页面写着它：**16** 个在"**Framework (open source)**"（框架，开源）下（UI、导航、样式、数据获取、原生模块、DOM、示例、SDK 升级），**7** 个在"**Services & paid distribution**"（服务与付费分发）下——描述为"核心用途依赖付费的 Expo Application Services（EAS）的 skill。每一个都会预先披露费用与套餐限制"——以及 **1** 个"**Experimental**"（实验性），对应"尚未定型的 Expo API"，它们"在底层 API 稳定后升级到上面的分组"。安装按 harness 分：Claude Code 用 `claude plugin install expo@claude-plugins-official`，Codex 用 `codex plugin add expo@openai-curated`，其他 agent 用 `npx skills@latest add expo/skills --skill '*'`。

**Why it matters:** 三分法才是值得抄的部分。把*免费的框架知识*与*用途在于驱动付费服务的 skill*分开，并要求付费那组预先披露费用，是把一条商业边界写进制品里，而不是留给读者去发现——这正是多数厂商 skill 包省略掉的东西，而正是这一点省略让它们读起来像文档而不是像路由。README 的定位也是对的："Expo 文档、Expo CLI 与 EAS CLI 仍是事实来源；这些 skill 帮助 agent 正确使用它们"，所以这个包是一个路由器，而不是第二份会漂移的规范。诚实的缺口：仓库带一个 `tests/` 目录和根目录下的 `eval-harness` 条目，而 README 里**没有任何评测结果**——所以这里的"官方"指的是来源，不是实测的准确率。

[`🔗 expo/skills`](https://github.com/expo/skills) · [`🔗 expo/skills — skills.sh.json 清单`](https://github.com/expo/skills/blob/main/skills.sh.json) · [`🔗 Expo 文档 — 面向 AI agent 的 Expo Skills`](https://docs.expo.dev/skills/)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-10-28T12:23:59Z |
| Items | 36 |
| Sources tracked | 30（Hacker News、GitHub Trending、GitHub API、Google DeepMind、ghostty.org、LWN.net、CISA KEV、NVD、cveawg、CVE.org、cfsg.axiommath.ai、The Stanford Daily、liquid.ai、Hugging Face、microsoft.ai、Artificial Analysis、FoxIO、Wiz、arXiv、NVIDIA product-security、Adobe trust center、GitHub Advisory Database、OSV、VulnCheck、Tailscale、WatchGuard PSIRT、Anthropic、brangus.io、lexifina.com、expo.dev） |
| Update schedule | 04:03, 12:03, 20:03 UTC+8（每日 3 次） |
| Ranking | 速度加权（新鲜度 × 互动加速度 × 来源权威） |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[前一日](2026-10-27.md) · [原始 .md](2026-10-28.md) · [归档](../archive/)
