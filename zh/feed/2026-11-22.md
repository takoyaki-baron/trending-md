---
date: 2026-11-22
updated: 2026-11-21T20:30:36Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 22
license: CC-BY-4.0
---

# Trending — 2026-11-22

## 1. 昨日报道的两项 GRH 宣告之后:Lean 证明已成经认证的 1700 万行代码库——独立内核正在接受导出证明

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 569+ pts · ~5.5h ago (~22:40 UTC+8)
- **Tags:** `mathematics` `lean` `riemann-hypothesis` `ai-assisted-proof` `formal-verification`

昨天我们报道了两项相互竞争的 GRH 主张——Alpöge 的"仅 Lean"宣告("我相信,在与 Claude 的合作中,我发现了一个证明")与 Masullo 的全人工草稿。此后,承重的那一半真的发生了:Lean 与 Mathlib 社区于 11 月 21 日发布联合认证,声明"我们特此证明黎曼假设的陈述与证明均属正确"。该证明是一个约 1700 万行、共 175,187 个模块的代码库,而 Andrew Sutherland(MIT)的验证文件页——"使用 Claude Code 运行检查"——记录了这场审计:全部模块在 Lean v4.33.1 下零错误编译,五个头条定理只依赖三条标准公理(propext、Classical.choice、Quot.sound),完整导出证明被两个独立实现的内核接受——nanoda(Rust,80 线程 27 分 42 秒)与 con-leche(verified 模式下 1,468,418 个声明),其 `--compare` 模式对照公开挑战确认了全部五个定理。lean4lean 通过了全部 175,187 个模块;导出文件的 sha256 与 Deicyde/riemann-hypothesis 仓库发布的文件一致。两项检查仍在运行(Lean 的 paranoid 内核与 lake comparator),并且社区明确表示**数学内容本身尚未被理解**:他们"期待所有……有助于解释这一证明中新思想的工作"。

**为什么重要:** "这是真的吗?"这一问题在此刻改变了形态——这个主张不再是没人读得懂的 PDF,而是一个被两个独立内核实现接受的工件,这是另一种、也强得多的"真"。但警告与之同行:Scott Aaronson 指出 Lean 内核历史上出现过允许证明 0=1 的 bug("这些问题能够而且必须被紧急修复");而在认证发布数小时后,google-deepmind 名下出现了一个 `math-horizon` 仓库,一天之内即消失(404)——内容从未公开到足以被人阅读。

> 验证页自己的诚实说明:结果"截至"其 11 月 21 日 12:55 UTC 的更新,paranoid 内核与 comparator 运行在该时间点仍在进行中。

[`🔗 Lean 社区认证`](https://leanprover-community.github.io/blog/posts/riemann-hypothesis/) · [`🔗 验证文件(Sutherland,MIT)`](https://math.mit.edu/~drew/grh/) · [`🔗 Alpöge 的宣告(PDF)`](https://alpo.ge/remark.pdf) · [`🔗 Scott Aaronson:随机鹦鹉显然证明了黎曼假设`](https://scottaaronson.blog/?p=10344) · [`🔗 HN 讨论(436 条评论)`](https://news.ycombinator.com/item?id=50589618)

---

## 2. Inkling-2-Mini 已能在 5.4 GB 内运行——一个量化编译器以少 41% 的内存在 GSM8K 和 HumanEval 上击败 9.1 GB 的 GGUF

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 160+ pts · ~2.2h ago (~02:00 UTC+8)
- **Tags:** `quantization` `inkling` `local-llm` `apple-silicon`

继我们昨日上午报道 Thinking Machines 的 Inkling 2 Mini 之后:ShinMegamiBoson 的 LookAtMyQuant——一个量化编译器,先测量模型中每块存储权重对输出的损害,再为每块挑选编码以适配体积预算——在夜间交出了对这一全新 26.4B 总参/5.4B 激活循环 MoE 的处理结果。18.89 GB 的 BF16 原始权重被压缩到 **5.38 GB(1.63 bits/weight)** 与 8.87 GB(2.69),并附有对照 Unsloth 低比特 GGUF 的公开比较:5.4 GB 版在 GSM8K 上得 134/200、HumanEval 上 60/164,以少 41% 的内存击败 Unsloth 的 9.14 GB UD-Q2_K_XL(127 与 46);8.9 GB 版在 GSM8K 上与 BF16 原始模型持平(148/200)。两份量化文件均已发布在 Hugging Face,经该项目的 Apple Silicon Metal 运行时执行,README 报告在 M5 Max 上搭配 179 MB drafter 时串行解码 73.2 tok/s(中位数 125.2,prefill 1,037 tok/s)。

**为什么重要:** 一个全新开放权重模型在发布当周就有第三方量化,说明本地 AI 生态在按设计运转——而那些诚实的表格(KL 差值、未微调基线、教师模型得分)比通常自称媲美 FP16 的量化营销更值得作为主张的模板。昨天的笔记本推理故事如今有了 5 GB 的入门档。

[`🔗 LookAtMyQuant(仓库与完整配方)`](https://github.com/ShinMegamiBoson/lookatmyquant) · [`🔗 Inkling-2-Mini 5.4 GB 量化(Hugging Face)`](https://huggingface.co/shinmegamiboson/Inkling-2-Mini-LookAtMyQuant-5.4GB) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50591853)

---

## 3. Upload2Shell:Ghostscript -dSAFER 沙箱逃逸,CUPS、Roundcube 与 WordPress 中确认 RCE——研究页面今日公开,而 CVE 记录已是 12 天前

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 10+ pts · ~1.8h ago (~02:30 UTC+8)
- **Tags:** `security` `ghostscript` `rce` `cve` `disclosure`

pwn.ai 关于 **CVE-2026-125396** 的研究页面今日公开,它是一份完整的披露台账而非一段漏洞简介:Ghostscript Type 1 字体加载器中的 use-after-free(`gs_fonts.ps` 的 `.putgstringcopy` 调用特权算子 `.forceput` 时不检查操作数类型),使精心构造的文档穿越 -dSAFER、通过自定义错误处理器找回 `.forceput`,并以渲染进程的身份执行攻击者选定的命令。时间线才是实质:7 月 27 日发现,7 月 30 日在 Google 文档渲染器上演示,8 月 12 日 WordPress 核心修复(CVE-2026-65640),9 月 2 日上报上游 Artifex bug 709684,9 月 8 日修复随 Ghostscript 10.08.0 发布——然后是下游的确认:Debian 13 的 CUPS 接受一条未经身份验证的 IPP 作业并以 `lp` 身份运行;Roundcube 在查看邮件缩略化附件时以 `www-data` 执行代码;Plesk 与一条 Dropbox 文档处理路径也一并确认。NVD 记录(发布于 2026-11-10,`Awaiting Analysis`)带有 VulnCheck 的 CVSS 4.0 **8.5** / 3.1 **7.8**(Secondary),以及 CISA-ADP SSVC 的 exploitation: none。

**为什么重要:** 分数说的是"High",而已确认的路径说的更糟:Ghostscript 隐形地栖身于打印服务器、邮件扫描器与图像管线之下(ImageMagick 委托这一类),因此暴露人群是"所有渲染不可信文件的栈",而不是"所有安装了 Ghostscript 的人"。上游修复已发布五周,下游则滞后数月;记录直到现在才落地,正是本栏目持续记录的 CVE 时钟滞后。

[`🔗 Upload2Shell 研究页面(pwn.ai)`](https://pwn.ai/upload2shell) · [`🔗 NVD 记录 CVE-2026-125396`](https://nvd.nist.gov/vuln/detail/CVE-2026-125396) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50592097)

---

## 4. 我的显示器让我的下载速度慢了 75%——"一线通"桌面方案被逐帧调试

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 357+ pts · ~9.8h ago (~18:30 UTC+8)
- **Tags:** `networking` `debugging` `hardware` `usb`

Oscar Molnar 的 2.5 Gbit 对称宽带经 Studio Display XDR 的以太网直通后只剩 600 Mbps 下载(上传完好,2.4 Gbps)。这次排查是"用测量代替猜测"的范本:适配器与网线直连 Mac 一切正常(iperf3 2.3 Gbps);经显示器时 ping 丢包 10%,而 macOS 日志里没有任何丢帧错误——"适配器在计算机知情之前就把帧丢了"。答案分两层:Realtek RTL8156B 挂在 Apple 的通用 USB 驱动下,换 Realtek 官方驱动后 600 Mbps → 1.1 Gbps;再在 UniFi 交换机上开启流控(pause 帧)后升到约 2 Gbps——因为芯片自身计数器显示,接在显示器后面时它在每秒约 168,000 帧(约 2 Gbps)以上静默丢帧,直连时 0% 丢失。作者最终还是把流控关掉了:它把突发缓冲移到发送端,给他的游戏 PC 添延迟。

**为什么重要:** 显示器扩展坞成为网络瓶颈这类故障天然无声——没有任何日志记下丢帧,于是你就这样常年只用四分之一的带宽。这篇文章同时是大多数工程师能读到的最清晰的以太网流控短教程,而它的方法(固定速率 UDP、读芯片自己的计数器)适用于每一次排查传输为何变慢的场景。

[`🔗 完整排查过程(Tymscar 博客)`](https://blog.tymscar.com/posts/studiodisplayethernet/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50587875)

---

## 5. 继 18 日 GPT-6.2 发布报道之后:Astra 与 Sol 在 SimpleBench 上跌破人类基线——而五个对手跨过了它

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 144+ pts · ~7.2h ago (~21:05 UTC+8)
- **Tags:** `benchmarks` `gpt-6` `evaluation` `ai-models`

SimpleBench 排行榜收录了 11 月 18 日的发布,数字相当刺眼:**GPT-6.2 Astra Pro 79.2%**(第 16)、**GPT-6.2 Astra 77.3%**(第 17)、**GPT-6.2 Sol 69.9%**(第 30)——所有 GPT-6.2 变体都落在该基准 83.7% 的非专业人类基线之下;而榜首的新面孔是 Claude Fable 5.2(94.9%)与 Google 的 Gemini 4 Neon(94.4%),Carbon、Argon、Hydrogen 在 91.7–92.6%:已有五个模型超过那九位人类样本。SimpleBench 的 200 多道题针对时空推理、社会智能与"语言对抗鲁棒性"——正是记忆模式会误导人的那些陷阱题。页面自身有个耐人寻味的细节:其导语仍保留着过时的说法"优于所有受测 LLM,包括当今顶级模型 Claude Fable(81.9%)"——已被划掉,成了新一波模型登陆前的化石。

**为什么重要:** 同一次发布,两个基准,两种相反的判决:GPT-6.2 在发布当天借供应商适配器拿了 ARC-AGI-3 的 100%,四天后却落在 SimpleBench 的高中生之下。这种分歧正是当下评测危机的缩影——基准胜利带有 harness 形状,而"语言对抗鲁棒性"度量的正是推理 harness 不测的东西。

[`🔗 SimpleBench 排行榜`](https://simple-bench.com/) · [`🔗 HN 讨论(138 条评论)`](https://news.ycombinator.com/item?id=50588916)

---

## 6. 路透社:SEC 对英伟达的调查聚焦潜在会计问题——股价在 2.7 万亿美元回撤中再跌约 12%

- **Velocity:** ▮▮ rising
- **Source:** Reuters(经 HN)· 298+ pts · ~24h ago (11月21日 ~04:20 UTC+8)
- **Tags:** `nvidia` `regulation` `sec` `industry`

据两位知情人士向路透社透露,SEC 对英伟达的执法调查聚焦**潜在会计问题**——这是首篇报道调查者实际在查什么的消息,距 CEO 黄仁勋辞职(11 月 13 日报道)数日,也是 FT 记录"英伟达在季度营收突破 1040 亿美元之际不再单列新加坡销售额"(11 月 18 日报道)的一天之后。消息公布后英伟达股价下跌约 12%,Yahoo Finance 估测本轮回撤规模达 2.7 万亿美元;纳斯达克已抹去 2026 年全部涨幅,WSJ 将这轮更大范围的下跌描述为 4 万亿美元量级的 AI 市值蒸发,而 Anthropic IPO 破发为这一节点画上了句读。SEC 与英伟达均未确认调查焦点——这是"据消息人士"级别的报道,本栏目照此标注。

**为什么重要:** 对 AI 资本开支周期风向标的会计审查,即便对从不炒股的开发者也是与己相关的事件:它是"回报在哪里"这一营收确认侧的问题,正是上周百度与小米 CEO 提出的问题,而全行业的芯片采购计划正在据此重新定价。值得观察的是调查范围是否会触及 GPU 部署类交易(CoreWeave 式的循环交易)而非产品会计。

[`🔗 路透社:英伟达会计问题是 SEC 调查重点`](https://www.reuters.com/world/us-secs-nvidia-probe-is-examining-potential-accounting-issues-sources-say-2026-11-20) · [`🔗 HN 讨论(162 条评论)`](https://news.ycombinator.com/item?id=50581438)

---

## 7. 阿里巴巴 OpenCodeReview 以单周 +4,457 星登上周趋势榜——v1.14.0 昨日发布

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · 本周 +4,457 星 · v1.14.0 ~13h ago
- **Tags:** `code-review` `alibaba` `developer-tools` `open-source`

OpenCodeReview——阿里巴巴的代码评审平台,自述"安全、快速、高效,在阿里巴巴的规模上久经考验。混合架构代码评审工具"——以 55,047 星位居本周 GitHub 趋势榜涨幅第四,并于昨日(15:17 UTC+8)发布 v1.14.0。该仓库创建于今年 5 月,发布 npm 包,定位于自动检查与人工批准混合的企业评审流水线。它与 agent-skills 浪潮同周登榜,暗示受众是同一批人:正在搭建 AI 评审闭环、希望在人类投入注意力之前先由工具把关机器所写 PR 的团队。

**为什么重要:** 代码评审是 agent 编码时代有据可查的瓶颈(哈佛的企业级研究显示提交到批准的时长上升 56%);一家超大规模厂商的生产级评审系统大范围开源,正是这一瓶颈直接需要的工具。值得观察:其混合(规则 + 模型)的权重配比如何,以及 npm 发行方式能否让它嵌入 agent 流水线,而非只做一个独立门户。

[`🔗 alibaba/open-code-review`](https://github.com/alibaba/open-code-review) · [`🔗 v1.14.0 发布`](https://github.com/alibaba/open-code-review/releases/tag/v1.14.0) · [`🔗 项目主页`](https://open-codereview.ai)

---

## 8. Plannotator:一个让你批注 agent 计划、评审其 diff 的收件箱——14k 星仍在攀升

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · 本周 +3,555 星 · v0.29.1(11月19日)
- **Tags:** `agent-infra` `code-review` `planning` `developer-tools`

Plannotator(backnotprop)自述为"批注并跟进你的 agent 所需的一切":一个收件箱界面,承载计划、规格、markdown、HTML 及其他交互式工件,附带 diff/PR 评审与回传给 agent 的反馈通道。一线支持覆盖 Amp、Claude Code、Codex、Copilot CLI、Droid 与 Gemini CLI,README 里还有更多 agent 图标——它正是"计划-批准-执行"这一 agent 回环不断需要的人类审批 UI 层。v0.29.1 于 11 月 19 日发布,仓库每日有推送;以 14,123 星成为本周涨速最快的仓库之一。

**为什么重要:** 每个 agent 框架都汇聚到同一个卡点——在 agent 烧掉一个下午之前,由人读一遍它的计划。一个专属的、agent 原生的批注界面(而不是聊天记录里的评论)正是这一回环缺失的部件,而其多 agent 支持清单说明生态正在为工作流本身、而非任何单一厂商的 harness 制定标准。

[`🔗 backnotprop/plannotator`](https://github.com/backnotprop/plannotator) · [`🔗 v0.29.1 发布`](https://github.com/backnotprop/plannotator/releases/tag/v0.29.1)

---

## 9. Show HN:Zero C#——去掉运行时与 GC 的 C#,编译出 386 DOS 二进制

- **Velocity:** ▮ steady
- **Source:** Show HN · 74+ pts · ~4.6h ago (~23:40 UTC+8)
- **Tags:** `csharp` `compilers` `native` `runtime-free`

Onur Gumus 的 Zero C# 是 bflat 的一个分支,把 C# 直接编译成小型原生程序:无 .NET 运行时、无垃圾回收器、目标机器无需安装任何东西。语言保留——C# 15 语法、类型检查、逐类型特化的泛型、record、经小型库实现的 LINQ 形态 lambda,甚至 `Parallel.For`——而运行时的服务被放弃:内存来自你一次性释放的 arena,`throw` 即结束程序(错误以 union 返回),没有反射与 async。hello world 在 Windows 上 11 KB,Linux 上 40 KB;同一份源码可构建 Linux、macOS、Windows、WebAssembly 与 386 上的 DOS,且同一套测试套件必须在每个目标上通过。

**为什么重要:** "无运行时"这一生态位(Go、Rust、Zig 用户的潜在迁移空间)一直把 C# 挡在门外——而 C# 恰恰是人们真正会的语言。仅用 arena 的内存管理加上真类型系统,也是一笔真正有趣的安全交易:它以构造方式而非借用检查放弃了 use-after-free 的自由。把 386/DOS 列为受支持目标,与上周 ClawDOS agent 推开的复古计算边界如出一辙。

[`🔗 Zero C# 指南`](https://onurgumus.github.io/zero-csharp/index.html) · [`🔗 OnurGumus/zero-csharp`](https://github.com/OnurGumus/zero-csharp) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50590279)

---

## 10. gopgext:用纯 Go 编写 PostgreSQL 扩展——TinyGo 把它们编译进服务器

- **Velocity:** ▮ steady
- **Source:** Hacker News · 70+ pts · ~3.1h ago (~01:10 UTC+8)
- **Tags:** `postgresql` `golang` `tinygo` `extensions`

Jespino 的 gopgext 经 TinyGo 用普通 Go 代码构建 PostgreSQL 扩展:给函数标上 `//gopgext:function`,工具链就会替你写好 C 胶水、安装脚本与 control 文件。标准库可以在服务器内部使用(`fmt`、`regexp`、JSON、crypto、泛型、defer/recover),字符串/数字/数组/JSON 映射到 SQL 类型,而接口远不止函数:触发器、聚合、GiST/GIN/SP-GiST/BRIN 运算符类、外部数据封装器与查询钩子。项目在上游自己的地盘上证明自己——contrib 模块(pgcrypto、hstore、pg_stat_statements、cube)的移植通过了上游测试套件——且 README 对风险的表述毫不含糊:生成代码或 Go 运行时的 bug"运行在服务器内部,可能令其崩溃或损坏数据"。仓库仅四天历史,16 星。

**为什么重要:** PGXS/C 级扩展作者向来是一个小小的专家行会;一条 Go 路径(README 也承认沙箱化故事尚未展开)拓宽了谁能扩展 Postgres——如今大多数 agent 栈都坐在其上的数据库。实验性标签挂得诚实;投产前先盯住内存模型这一环。

[`🔗 gopgext 文档`](https://jespino.github.io/gopgext/) · [`🔗 jespino/gopgext`](https://github.com/jespino/gopgext) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50591260)

---

## 11. 确定性仿真测试属于每个人——把分布式系统的绝招,论证到普通应用

- **Velocity:** ▮ steady
- **Source:** Hacker News · 56+ pts · ~31h ago (11月20日 ~21:20 UTC+8)
- **Tags:** `testing` `deterministic-simulation` `reliability` `essay`

Outdata 11 月 20 日的文章主张,确定性仿真测试(DST——连种子带世界一起回放,直到故障复现)不该继续是 FoundationDB/Antithesis 形状的专家技术。文章的引擎是一套"我们为何测试"的分类法:被动式回归测试、防御性护栏,以及"义务式"测试——那种其纪律随倡导者离开而消散的 TDD,身后留下"数量繁多、脆弱、数量繁多"的测试。文章主张消除疑虑才是真正的产品("这个依赖能删吗?这些模块能重排吗?"),而一个确定性的、可用种子寻址的故障,是唯一能递给同事——本栏目补一句:递给 agent——的故障报告。

**为什么重要:** DST 迎来第二次 HN 热度自有其理由:agent 写代码很快,而测试就是管理,任何故障都能从种子复现的测试模式,恰是 agent 所写改动最需要的东西。对那些被 Antithesis/Turso 式工具吓退的团队,这篇文章给出了一个入门级的论证起点。

[`🔗 确定性仿真测试属于每个人`](https://outdata.net/blog/261120) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50574264)

---

## 12. 机器码编程:只给 LLM 一份十六进制转储,它能逐字节读写可执行文件

- **Velocity:** ▮ steady
- **Source:** Hacker News · 133+ pts · ~3.4天前
- **Tags:** `llm` `reverse-engineering` `machine-code` `malware-analysis`

"LLM 现在能够理解并编写机器码。只给一份十六进制转储,没有反汇编器、没有编译器、没有任何工具。"这是 George Xenos 与 Sotiris Giannopoulos 设题检验的主张——并明确将其定位为上周本栏目报道过的 weight-space programming(他们引用了 Takehi et al.)在编译代码上的姊妹篇。GPT-6.1 Sol 以约每字节 2.4 token 的代价读入 xxd 输出,解释了他们给出的全部五个二进制——其中一个无符号剥除的统计工具里,它找到了上游代码中一个真实 bug;它正确分析了未知恶意样本并提取出正确的 IOC;通过直接改写字节给三个二进制添加了功能;并从零写出三个能运行的程序。DeepSeek V4.1 Flash 对该恶意样本得出同样结论——这是"并非闭源模型独有"的证据。

**为什么重要:** Weight-space programming 说训练好的权重正成为可寻址的工件;这一篇说编译后的二进制也是——正是每个安全团队当作不透明物的那个工件。近期用途是无工具链的逆向工程与恶意样本分诊;远期则是模型能在没有源码之处修补已发布的产物。警告写在他们自己的实验设置里:每字节约 2.4 token,意味着约束是上下文窗口而非能力。

[`🔗 Programming in the Machine Code Space`](https://sgiannopoulos.github.io/blog/machine-code-programming/) · [`🔗 HN 讨论(96 条评论)`](https://news.ycombinator.com/item?id=50546587)

---

## 13. 同一发布日的三条 9+ CVE 记录:Google Cloud Dataform 路径穿越、Net::DNS 可预测查询 ID、Go PKCS#11 nonce 缺陷

- **Velocity:** ▮ steady
- **Source:** NVD · 发布于 11月20日 · 三条均为 `Received`,CNA 打分
- **Tags:** `security` `cve` `gcp` `dns` `cryptography`

NVD 11 月 20 日批次中有三条记录,比其"零 KEV"地位更值得关注。**CVE-2026-126054**(CVSS 4.0 **9.3**,Google CNA):横跨 Google Cloud Dataform、BigQuery Studio 与 Colab Enterprise 的工作区目录处理与 Git 集成中的路径穿越,允许经身份验证的远程攻击者"跨租户仓库读取私有文件并创建任意文件"。**CVE-2026-101340**(CVSS 4.0 **9.1**,NLnet Labs):Net::DNS 直至 1.57 的 16 位 DNS 查询 ID 取自 Perl 内置 `rand()`,能观察 ID 序列的攻击者可恢复 PRNG 状态并在传输前预测 ID——这是 DNS 缓存投毒背后的伪造响应原语,且记录明确指出 1.57 的去重缓存挡不住它。**CVE-2026-115407**(CVSS 4.0 **9.1**,Eclipse CNA):Go 的 PKCS#11 封装 `crypto11` 把调用方给出的任何 GCM nonce 不做长度检查地直传 `CK_GCM_PARAMS`,并接受空 nonce;在 SoftHSM2 上,每次以空 nonce 调用 `Seal` 都在同一 IV 下加密,"复用密钥流并暴露 GHASH 认证密钥,从而允许伪造"。修复提交与 GHSA 公告已在记录中给出链接。

**为什么重要:** 三条仍停留在 `Received` 状态——NVD 尚未分析其中任何一条,也不带 NVD 自己的分数——上述数字均为各 CNA 所给(Google、NLnet Labs、Eclipse),每条记录都挂着 CISA-ADP 富化容器。Net::DNS 那条是沉睡者:Perl DNS 解析器仍在意想不到的地方承重,而可预测查询 ID 是这本攻击手册里最老的一页。

[`🔗 CVE-2026-126054(NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-126054) · [`🔗 CVE-2026-101340(NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-101340) · [`🔗 CVE-2026-115407(NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-115407)

---

## 14. SoK:以驾驶自动化分级为 LLM 漏洞研究能力打分——早在 2026 年的受限前沿模型之前,agent 已实现全程自主

- **Velocity:** ▮ steady
- **Source:** arXiv · 2611.26601 · 提交于 11月19日
- **Tags:** `ai-research` `security` `sok` `vulnerability-research`

Amine Lbath 的系统化知识(SoK)论文为 agent 正在改变漏洞研究这类主张补上缺失的测量层:一个以驾驶自动化分级(SAE J3016 式级别)为蓝本的自主性量表,按正确性、可得性与证据强度对每一条已发表主张进行限定。三个发现最为突出:agent"在 2026 年的受限前沿模型之前,已在真实软件中无人工干预地发现、验证并修补漏洞";此后开源权重模型在发现与验证上达到了相当的自主性;对十年公开漏洞记录的测量显示——2026 年披露量**翻了一倍还多**,危重与高危占比上升,存活十年以上的老 bug 被报告的频率提高了数倍——而"从报告到修复、从披露到被攻击的时间,迄今没有明显变化"。论文以明确的评分细则为文献中提出的缓解措施打分,并从证据最充分的措施中为各方利益相关者导出建议。

**为什么重要:** 披露量翻倍而修复时延不变,正是本栏目安全条线论点的量化版:AI 找 bug 的速度快于行业打补丁的速度,瓶颈已移到修复侧。给安全 agent 一套自动化分级量表,为采购与政策提供了当前厂商主张所缺乏的共同语言。

[`🔗 arXiv: 2611.26601`](https://arxiv.org/abs/2611.26601) · [`🔗 Hugging Face papers`](https://huggingface.co/papers/2611.26601)

---

## 15. sure:带内置 AI 助手的自托管个人理财应用突破 17k 星

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · 本周 +2,476 星 · v2026.11.20-alpha(11月21日)
- **Tags:** `finance` `self-hosted` `ai-assistant` `open-source`

we-promise/sure——"给每个人的个人理财应用(由每个人打造)"——是本周安静的趋势故事:17,105 星,本周 +2,476,以及一班每日发车的 alpha 发布列车(v2026.11.20-alpha / v0.7.7-alpha.8 昨日落地)。仪表盘将现金流、净值、支出与流出,与一个能就你自己的数字答疑的 AI 助手放在一起——正是本栏目持续追踪的本地 AI 模式(Platypush 的语音管线、Foolscap 的只读写作应用)落在最敏感的个人数据上。值得注意的是,对一个 17k 星项目,其发布以日历日期的 alpha 而非 semver stable 命名——是明确的"进行中"信号而非成熟度声明。

**为什么重要:** 理财是你的数据永不外传属于功能而非偏好的一类,而能在本地数据上解释 11 月支出为何飙升的助手,正是每个自托管 AI 集成都在够到的演示。每日 alpha 的节奏意味着用户实际跑在 main 上——导入十年账单之前,值得先知道这一点。

[`🔗 we-promise/sure`](https://github.com/we-promise/sure) · [`🔗 发布页`](https://github.com/we-promise/sure/releases)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-21T20:30:36Z |
| Items | 15 |
| Sources tracked | 22 (Hacker News, GitHub Trending, NVD, CISA KEV, Reuters, arXiv, Hugging Face, simple-bench.com, pwn.ai, leanprover-community, math.mit.edu, scottaaronson.blog, blog.tymscar.com, outdata.net, sgiannopoulos.github.io, jespino.github.io, onurgumus.github.io, github.com, yahoo.com, wsj.com) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[Previous day](../2026-11-21.md) · [Raw .md](https://trending.md/zh/feed/2026-11-22.md) · [Archive](../archive/)
