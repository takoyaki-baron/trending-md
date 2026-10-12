---
title: "无 AI"作为产品特性
topic: no-ai-default
created: 2026-09-09
---

# "无 AI"作为产品特性（2026 年 9 月）

文档基金会 9 月 3 日的帖子（"Yes, no AI is now a feature"，Italo Vignoli）为 AI 如何进入 LibreOffice 写下一份
书面、可检验的规范：**默认安装中没有任何形式的 AI**，因为没有集成满足六原则——用户可控推理；内容不经授权不离开
机器；无遥测；无单一供应商锁定；ODF 原生输出；完全可选/可移除——外加"没有要保护的订阅分层、没有追加销售、没有
可变现的数据"，想要 AI 的用户被指向桥接 Ollama、LM Studio 或 OpenAI 兼容端点的第三方扩展。同一周，LibreOffice
26.8（8 月 26 日发布）成为项目史上最受欢迎的更新——**单周超过 100 万次安装包下载**（不含发行版仓库）。

**因果被诚实悬置——请保持如此。** 下载纪录文章（manualdousuario.net，已一手阅读）只是"押注"无 AI 立场推动了数字
（"我把钱押在'非特性'上"）并承认"无论原因是什么"；TDF 帖子本身从未提及下载量，还说其标准"不构成彻底拒绝"。
可以安全主张的是：第一个证明"默认无 AI"能打的**硬市场信号**，以及大型开源项目首次发布成文的、可检验的"AI 如何
准入"规范。值得追踪的模式："无 AI"从特性缺席转向明示的、有原则的产品定位——与平台从另一侧移除能力类别
（[[platform-gatekeeping]]）互为镜像。

## 第二个数据点——以及它自带的矛盾（09-12）

**Toast**（`paradise-runner/toast`，Go，Show HN 66 分 / 65 评论）是一个开箱即用的终端 IDE——托管 LSP 安装、tree-sitter 高亮、go-to-definition、ripgrep、VSCode 主题导入——定位是对抗 vim/nvim/emacs 的配置负担。它的对比表明确标注**"no AI features"**与"no telemetry"：no-AI 作为功能清单里的一行——LibreOffice 规范的市场化版本。

矛盾在评论区：有人指出 README 的事实错误（vim/Emacs *有*文件树和鼠标支持）与遗留的 `yourusername` 占位符，且作者承认项目是 **AI 写的**——"this project is either built with AI or it's not built"。所以定位是"无 AI *功能*"，不是"制作过程无 AI"——这个区分此前没被压力测试过，66 分配 65 评论的比例说明观众正在实时执行审查。

同日，**"Ask HN: Can we please limit the AI news flood?"** 冲到 707 分——无 AI 利基是受众而非情绪的需求侧信号。两个数据点都没给出因果或持久性：Toast 是早期开发项目，矛盾争论本身就是诚实的复杂之处。模式成立："无 AI"已从缺席变成*主张*——而主张会被审计。来源：
[paradise-runner/toast](https://github.com/paradise-runner/toast) ·
[HN 讨论](https://news.ycombinator.com/item?id=49662496)

**Go Concurrency Distilled（2026-09-27）**——Anton Zhiyanov 的免费 Go 并发小书（HN 83 分）页面上带有"AI-free"字样：继 LibreOffice 的成文规范与 Toast 终端 IDE 之后的第三个"无 AI"实例，也是第一个出现在*参考/教育*材料中的——该标签现已横跨办公套件、开发工具与学习资源。**10-01 更正：**页面上唯一的 AI 提及系于他的*另一本书*，并非本书——"check out my other book — Gist of Go: Concurrency. The book is AI-free."（feed 条目已就地更正 en/zh/jp，速度保持）。站得住的读法是：作者为其 Go 教学材料打上无 AI 标签，但逐字 claim 属于 Gist of Go——引用时照此表述。

**AI 贡献禁令作为 fork 边界（2026-09-28）**——"无 AI"立场的新形态：不是产品定位，而是*贡献政策*。FEX-Emu 的政策禁止 AI 生成的贡献，于是 Madeira（把 x86-64 Windows 游戏移植到未越狱 iPhone 的 Wine+FEX-Emu+DXMT 项目）——其 fork 含 AI 辅助代码——要求贡献者**不要**向上游提交修改。代码可以流进 fork，但永不回流越过边界；"无 AI"现在决定代码能流向哪里，是上述定位声明的供应链版本。

**手写出处成为声明属性（2026-10-01）**——Halfspace（Matt Keeter 的距离场实体建模 IDE，其 2022 年起构建的 Fidget 内核的 WebGPU 展示；HN 88 分）开篇即："都 2026 年了，让我先声明：**这不是 vibe coded 的**。我从 2025 年 4 月开始做这个项目，用我的人脑写代码。"这份免责声明本身就是文化产物：手写出处正在成为作品集项目像 license 一样必须声明的一等属性——是上文机构级定位的个人工匠版。同日的政策侧同伴：**CS240 讲师本人的回顾**（turkeyland.net，102 分）——2026 春季 AI 作弊风暴中心的那门 C 语言课，课程大纲明确禁止在任何作业中使用 LLM，而他承认自己的处置"本可以更好，也正是因为它，违反这条明文政策的学生最终几乎没有承担任何后果"。政策从来不是难的部分；执行才是——一条明文规则、一次已知违规、一个约等于零的机构后果。这种不对称，而非大纲措辞，才是每一条"禁 AI"规则真正运行其上的现实。

**被强制执行的合并门（2026-09-30，10 月 3–4 日上趋势）**——CS240 复盘所说的难点「执行」，本章已经出厂。System76 的 COSMIC 桌面在其 PR 模板加入强制声明（commit「Disallow LLM generation in pull requests (#3911)」）：贡献者必须勾选**「我未在本 PR 中包含任何 LLM（又称 AI）生成的内容，包括代码、注释与描述」**——并写明**「未完成勾选的 PR 将被关闭」**——与「我完全理解这些改动」及 DCO 认证并列。模板在整个栈上生效（cosmic-epoch、cosmic-comp、libcosmic、cosmic-text、cosmic-edit、cosmic-settings、pop）。理由经 Linuxiac 归于 Jeremy Soller——LLM 提交的代码加重维护者评审负担——不过这来自报道而非一手帖子；先例清单（Godot、Ladybird、NetBSD、Zig）还在加长。HN 标题（「bans AI-generated code from much of its codebase」）言过其实：它管的是*贡献*，不是 System76 的内部工作流。体裁内部的跃迁：TDF 立原则、Toast 宣传缺席、FEX-Emu 画 fork 边界、Halfspace 声明出处——COSMIC 是第一个把「无 AI 内容」做成带勾选框与关闭威胁的*合并门*的，这是大型项目迄今发布的最强反 AI PR 政策，也是「声明式执行能否挺过在途贡献者」的实测（一人报告其 Claude 辅助修复被依此关闭）。
Sources: [PULL_REQUEST_TEMPLATE.md](https://github.com/pop-os/cosmic-epoch/blob/master/.github/PULL_REQUEST_TEMPLATE.md) · [HN 讨论](https://news.ycombinator.com/item?id=49946321) · [Linuxiac](https://linuxiac.com/cosmic-stops-accepting-llm-generated-content-in-pull-requests/)

**地位经济的牺牲品（2026-10-07）**——erdosproblems.com「在 AI 攻势下失守」（HN 31）：创始人 Thomas Bloom 冻结问题评论、移除 open/solved 状态标签与已解百分比计数、剥离署名语言——证明将改写为「it is known that…」而非归于某人。触发点：自 2025 年 8 月评论上线以来，真实讨论崩塌而证明宣称式垃圾爆炸——一位评论者的审计数出 **291 条证明宣称、155 条零解释、61 道题存在多个竞争宣称**，当「几乎所有」新评论都是追逐「OPEN→SOLVED 多巴胺」的无解释 AI 证明宣告时，审核变得不可持续（站点：1,221 道题、约 2,000 用户、日访客 1–2.5 万）。该体裁迄今最大胆的一步：多数平台以加强审核回应垃圾；这一家**拆掉了奖赏**——当宣称 credit 的成本为零，宣称便不再携带信息，于是主人不再托管宣称。COSMIC 门禁的镜像：把住输入，对拆掉记分板。结尾援引 Erdős——「my brain is open」——并恳求数学保持为人类协作的事业。
Sources: [erdosproblems.com 论坛](https://www.erdosproblems.com/forum/thread/blog:9) · [HN 讨论](https://news.ycombinator.com/item?id=49977689)

## 2026-10-07 晚间 —— 「默认关闭的本地 AI」立场拿到消费级模板

**Penguin Mail 1.0**（Rust/GTK4 Linux 邮件 + 日历，GPL-3.0，仓库 9 月 19 日，76★）：AI 助手**出厂关闭、直到你选择模型**——经 LM Studio 或 Ollama 本地运行、「发邮件或改设置前先征询」、每次工具调用可见（Ctrl+J）；无自有服务器、OpenPGP/S-MIME 走你自己的 GnuPG。HN 的反应恰好沿这条线分裂（「在看到『……带 AI』之前我百分百感兴趣」对：这种可选加入、本地、先问再动的行为是「硬塞助手」模式的反面）。分类学从此有三种立场：AI 默认开（行业常态）、无 AI（TDF/Toast/COSMIC）、以及 **AI 在场但默认关闭**——把「副作用前先征得同意」作为默认出货，而不是一页隐私政策。

Sources: [penguin-mail.com](https://penguin-mail.com/) · [c9dev/penguin-mail](https://github.com/c9dev/penguin-mail)

## 2026-10-10 04:03 —— 第四种立场：全量用 AI、公开披露，8.5k★ 规模

**openGym**（自托管健身房追踪器，GitHub 周榜 #11，8,548★，AGPL-3.0，单一维护者）：README 里最被讨论的章节是「How openGym is built」——「代码、测试与文档的很大一部分在 Claude Code 会话中起草……由人来决策和发布。」不是无 AI（TDF/Toast/COSMIC）、不是默认关闭的本地 AI（Penguin Mail）——**全量用 AI、把构建方法直接写进 README**，是 Halfspace「this is not vibe-coded」出处声明的镜像。在 8.5k★ 的规模上，这是「AI 起草、人来决策」作为一种可发布、可披露、被社区接受的模式至今最强的存在证明——而且披露发生在任何人在评论区开撕之前。同一周还送来了文化侧的配重：Gross 的「别让它写作业」与 Glyph 的「代码从来都是艺术」（均 → [[dev-tools]]）。（仓库的另一半 → [[agent-stack]]：只读 MCP 服务器——MCP 落在个人数据已存在的地方。）

Sources: [DuarteSantos8/openGym](https://github.com/DuarteSantos8/openGym) · [GitHub 周榜](https://github.com/trending?since=weekly)

## 2026-10-12 → 10-13 — 分叉变成禁令；「open」本身被讽刺

**QGIS 全面禁止 AI 辅助贡献（QEP-408 v2.0，核心开发者 Nyall Dawson 起草，9-24 定稿、10-07 合并；10-12 HN 加速发酵）：** 「**github.com/qgis/qgis 仓库不允许任何 LLM、AI 或 agent 辅助的代码贡献。若我们事后发现你在贡献中使用了 AI、LLM 或任何基于 agent 的工作流，你将面临代码回退与贡献者权利处罚。**」注意范围：不是 AI*生成*——是 AI*辅助*，对不披露者溯及既往。项目自 1 月起有 AI 政策（QEP-408，最初由 Even Rouault 起草）；v2.0 把宽松体制换成硬禁令。基金会级 OSS 项目的首个全面禁令，落在技能货架突破 277k★ 的同月——治理分叉已公开化：多数项目收敛于披露规范，QGIS 赌的是 AI 辅助补丁的评审成本大于其价值。遗留问题：可执行性——对可识别贡献者溯及回退很容易，匿名过客（恰是打击目标）最难处罚。越过 COSMIC 的勾选框、进入惩罚。

**OpenFatigue（openfatigue.ai，HN 58+，10-13）：** 把「open」当营销的讽刺厂商——"Open-ish Licensing"（许可可读；使用需法务会谈）、"Source Visible"（每季度代码截图；PR 走传真）、模型权重「可获取」但要过 41 页 AUP 与气质审查；档位从 Open（$0、需 star 仓库）到 Open Enterprise（在监督室内看源码）；页脚免责一切、并开出处方：OSI 定义是「唯一已知疗法」。落在 **Bitwarden 应用商店构建转商业许可**（10-11——GPLv3 版仍在；论坛听见了 MinIO）与 **HashiCorp 归档 Boundary CE**（「目前没有安全补丁计划」）的同一周。讽刺是滞后指标：当「open」需要讽刺站，这个词的信号价值已经坏了。对 agent 和写策略的人：先读 LICENSE 再读落地页；把产品名里的「open」当作待验证的主张、而非属性。（细节见 [[dev-tools]]。）

Sources: [QEP-408 v2.0（raw）](https://raw.githubusercontent.com/qgis/QGIS-Enhancement-Proposals/master/qep-408-ai-tool-policy.md) · [OpenFatigue](https://openfatigue.ai/) · [Bitwarden 论坛公告](https://community.bitwarden.com/t/published-version-update-in-app-stores/102750)
