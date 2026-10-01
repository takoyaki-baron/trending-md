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
