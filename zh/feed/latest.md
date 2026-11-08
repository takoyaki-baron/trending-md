---
date: 2026-11-09
updated: 2026-11-08T20:31:15Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 14
license: CC-BY-4.0
---

# trending.md — 2026-11-09

## 1. OpenEMR 一批收到 44 条 CVE 记录 — 对应的漏洞其实 8、9 月的版本就已修复

- **Velocity:** ▮▮▮ trending
- **Source:** NVD · 44 条记录 · Nov 8 ~14:18Z (~22:18 UTC+8)
- **Tags:** `security` `cve` `healthcare`

VulnCheck 11 月 8 日披露潮中最大的一块 — 就是昨天报道过的、产出 Vikunja 39 条记录和 OpenAM 10.0 的同一批次 — 是 **OpenEMR**，部署最广的开源电子病历系统：**一次发布 44 条记录**，其中 4 条 CVSS 3.1 达 9.0+（VulnCheck 是 CNA，每条记录给两个分数：`Primary` CVSS 3.1 与 `Secondary` CVSS 4.0）。重点条目：CVE-2026-124469（9.9），Fee Sheet 药品库存查询的 SQL 注入，"将 `prod[N][warehouse]` POST 字段插值进 ORDER BY 子句"；CVE-2026-124450（9.9），fax/sms 模块 `disposeDocument` 动作的路径穿越，低权限用户可读取 `sqlconf.php` — 即数据库凭据文件；CVE-2026-124445（9.8），忽略 `enforce_onetime_use` 的一次性认证绕过。这四条的修复版本分别于 **8 月 18 日、9 月 13 日、9 月 20 日和 10 月 27 日**发布（8.3.0 → 8.5.0）— 文书比代码晚了 12–82 天。还有一个 CVE 视角看不到的仓库级事实：OpenEMR 的公告流共有 **100 条已发布 GHSA（8 月 18 日 → 10 月 28 日），其中只有 8 条在 GHSA 对象里带 CVE 编号** — 其余 92 条公告对所有以 CVE 编号为键的系统完全不可见。

**Why it matters:** 这是一个受影响范围止于 "8.3.0/8.4.0 之前" 的医疗系统，自动更新的人几个月前就已修复 — 但按 CVE 编号做分诊的人刚刚得知：这个仓库 100 条公告里的 92 条，从未在扫描器盯着的命名空间里自我通报。批量 CNA 披露日不断奖励那些读项目自身安全公告流、而不是注册表的人。

[`🔗 GHSA-cg8c-2v5q-29g7 (OpenEMR)`](https://github.com/openemr/openemr/security/advisories/GHSA-cg8c-2v5q-29g7) · [`🔗 CVE-2026-124469 on NVD`](https://nvd.nist.gov/vuln/detail/CVE-2026-124469)

---

## 2. llama-modchip：284B MoE 量化到 1.71 bpw 塞进 64 GB CPU 内存 — 解码 9–15 tok/s，零 GPU

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 285+ pts · 10h ago (~18:22 UTC+8)
- **Tags:** `llm-inference` `cpu` `quantization`

`llama-modchip`（Apache 2.0，v2.4.0 于 11 月 4 日发布）是一套 ggml/llama.cpp 内核补丁和量化转码器，README 的标题是 DeepSeek-V4-Flash — **总参数 284.33B、激活 13.17B**，分布在 43 层 MLA 和 256 个路由专家（Top-6）— 压缩到 **1.71 bpw、56.56 GiB**，带 256K KV 缓存时 VmRSS 峰值 57.61 GiB，跑在无 GPU 的普通 64 GB 机器上。README 中的实测数字：16 核 Zen 5 上 prefill 44.36 tok/s，284B 检查点解码 9.1–14.7 tok/s，30B 级 MoE 25.0–111.6 tok/s，40 工具 Claude Code 提示词的 `/dev/shm` KV 槽恢复 13.1 ms。内核工作是 4 级 ZMM/L1/L2/L3 缓存分块（README 称 +77% prefill、+53% decode），外加 1.64 MB 的 Stockfish-PVS n-gram 起草器做自推测。HN 评论者报告它真的能跑 — Ryzen 7 5700U 配 64 GB DDR4 上 "steady 12 to 14" tok/s — 另一位早期测试者指出默认 `modchip` 应用装的是 Nemotron-3.5-30B、只字未提 DeepSeek，所以 284B 路径需要读文档。

**Why it matters:** 关键数字是 13.17B 激活，而不是 284B — 稀疏 MoE 加极端低位量化，正在以比消费级硬件进步更快的速度推移 "本地能跑" 的界线。评论区争论的开放问题是 1.71 bpw 下的质量；README 卖的是吞吐量，而质量恰恰是它的表格没有度量的东西。

[`🔗 synchopate/llama-modchip`](https://github.com/synchopate/llama-modchip) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50411961)

---

## 3. claude-mem 达到 114,830 星并发布 v15.12.0 — 截图默认保留，还出现了 25 GiB 云配额

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub Trending · +7,482 this week · 114.8k stars
- **Tags:** `agents` `memory` `open-source`

claude-mem — 捕获编码代理的所作所为、压缩并在未来会话中回注的代理记忆层（支持 Claude Code、OpenClaw、Codex、Gemini、Hermes、Copilot、OpenCode）— 是本周第二快的上升项目，21 小时内连发三个版本（v15.11.0 → v15.12.0，Nov 6 22:17Z → Nov 7 19:51Z）。v15.12.0 的头条："你的代理读取或生成的截图和图片现在默认保留，并链接到那一轮的观察记录，而不发送给 AI 模型" — 默认开启，提供 `Keep images` 开关关闭。转码移到本地（有损 WebP，每张 20 秒），并且发布说明中出现了一条云条目："每个所有者可在 cmem.ai 上存储最多 25 GiB 图片，与 Pro 强制的限额一致。"

**Why it matters:** 代理记忆正在成为编码代理栈的留存面 — 终端和编辑器的原始截图，在一个 11.4 万星的项目里默认持久化。这是真实的能力（视觉观察原本会丢失），也是本地优先的记忆工具长出云配额的时刻：发布说明把含蓄的那半句说了出来 — "与 Pro 强制的限额一致。"

[`🔗 thedotmack/claude-mem`](https://github.com/thedotmack/claude-mem) · [`🔗 v15.12.0 发布说明`](https://github.com/thedotmack/claude-mem/releases/tag/v15.12.0)

---

## 4. 高盛把 Claude Code 和 Copilot 从交易员与银行家手里收回 — 十月内部指引：仅限工程师

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 252+ pts · 2h ago (~02:16 UTC+8)
- **Tags:** `industry` `agents` `enterprise`

Bloomberg 11 月 2 日报道（援引 10 月的内部指引）：高盛已 "切断了大多数员工对 Anthropic Claude Code 和 Microsoft GitHub 等高级 AI 编码工具的访问" — 只有工程师还能使用，结束了交易员和银行家数月来用这些工具监控交易流、制作内容的局面。据高盛发言人 Nick Carcaterra，Bloomberg 的报道只引用了 "包括生产力和风险管理在内的多种因素"；他补充说实验阶段已经结束，公司将把工具限定在 "最适合长期发挥其价值的人" 手里。这推翻了 7 月的立场 — 当时 CIO Marco Argenti 称赞非技术员工的 "vibe coding"：交易员用 AI 做原型，工程师负责规模化。HN 帖子于 11 月 8 日把这条新闻重新翻了出来，之后一直在攀升。

**Why it matters:** 这是第一起附有具体细节的大企业收回通用代理访问权 — 而且给出的理由是生产力，不是安全。人人都配代理 与 只有工程师配代理，如今是同一家公司相隔七个月的两个书面立场。

[`🔗 The Decoder`](https://the-decoder.com/goldman-sachs-pulls-ai-coding-tools-from-traders-and-bankers/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50415628)

---

## 5. IBM 的编码助手 Bob 收到 8.8 代码注入记录 — 路径是工作区定义的 MCP 服务器

- **Velocity:** ▮▮ rising
- **Source:** NVD · 窗口内 79 条 IBM 记录 · Nov 8 ~19:17Z
- **Tags:** `security` `mcp` `agents`

CVE-2026-9764（8.8，IBM PSIRT 赋分，NVD `Awaiting Analysis`）覆盖 IBM Bob 1.0.4 至 2.0.1 — IBM 自己的公告标题写明了机制："IBM Bob 存在因对工作区定义的 MCP 服务器执行控制不当而导致的远程代码执行漏洞。" 工作区自带的 MCP 配置就是注入路径。它落在同一发布窗口里 — 我拉取的约 34 小时内共有 **79 条 IBM PSIRT 记录**，其中包括 IBM Concert 1.0–3.0.1.1 的两个 9.8（CVE-2026-6715 与 CVE-2026-15266，都是底层操作系统上的命令执行）。

**Why it matters:** 所有人都演示过的 MCP 威胁模型 — 仓库自带的配置就是执行向量 — 刚刚拿到了一个带版本区间的厂商产品 CVE 编号，把加固建议变成了补丁管理。如果你的代理平台允许克隆的工作区注册自己的 MCP 服务器，这条记录就是给它上闸门的理由。

[`🔗 IBM 安全公告 (CVE-2026-9764)`](https://www.ibm.com/support/pages/node/7291535) · [`🔗 CVE-2026-9764 on NVD`](https://nvd.nist.gov/vuln/detail/CVE-2026-9764)

---

## 6. Outlook.com 悄然拒收无 DMARC 记录域名的邮件 — 未公告，且只弹一部分

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 45+ pts · 1h ago (~03:20 UTC+8)
- **Tags:** `email` `deliverability` `infrastructure`

MailRoute 报告（11 月 6 日）：自 **11 月 5 日**起，Outlook.com、Hotmail、Live 和 MSN "开始拒收没有 DMARC 记录域名的一部分邮件"，退信码为 `550 5.7.1 … lacks SPF/DKIM/DMARC Auth Records (AS9031519)`。与微软 2025 年 5 月的大批量发件人规则不同，这次打击的是没有日发送量阈值的小发件人，而且按 MailRoute 的说法完全未公告 — 没有 postmaster 通知、没有博客文章、没有服务健康条目。拒收还是部分且不一致的，这才是危险之处：邮件发出去什么都不证明。修复很便宜 — 加一条 `_dmarc` TXT 记录（`v=DMARC1; p=none`），并保证 SPF 或 DKIM 与 From 域名对齐（Microsoft 365 默认的 `onmicrosoft.com` 签名不算数）。

**Why it matters:** 对小型邮件运营者来说，无声的概率性拒收是最坏的故障模式 — 日志看起来正常，但一部分邮件消失了。现象本身有独立佐证：两位 HN 评论者报告自己的域名被同样的拒收命中。但引用 "未公告" 的说法前有个保留 — 另一位评论者贴出了微软技术社区和 Learn 文档中关于 DMARC 推进的链接，所以微软 "没有公告什么" 是 MailRoute 的主张，不是已验证的缺失。

[`🔗 MailRoute 博客`](https://mailroute.net/blog/outlook-rejecting-email-without-dmarc) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50416158)

---

## 7. Contact Form 7：千万级安装量插件出现 9.8 未认证文件上传 — CISA-ADP 赋分，10 月 29 日已修复

- **Velocity:** ▮▮ rising
- **Source:** NVD · 1 条记录（CISA-ADP 赋分）· Nov 8 06:17Z (~14:17 UTC+8)
- **Tags:** `security` `wordpress` `cve`

CVE-2026-114432 覆盖 6.2.4 之前的 Contact Form 7：该插件 "不校验通过表单文件字段上传的文件类型或扩展名，且临时文件清理的缺陷会把上传的文件留在磁盘上。" WPScan 公告的标题更精确 — "Contact Form 7 6.2 – 6.2.3 – 经无效 UTF-8 文件名的未认证任意文件上传" — 且记录上 **没有 CNA 给出的 CVSS**：NVD 上的 9.8 CVSS 3.1 是 **CISA-ADP 富化**（`Secondary`，ADP 组织 `134c704f-…`），与记录同日发布。修复已于 10 月 29 日发布（WordPress.org 目录现在提供 6.2.4.1）— 比文书早了十天。

**Why it matters:** 一千万活跃安装量，使它成为本月披露的影响面最广的文件上传漏洞之一，而所有人将引用的那个分数出自协调者而非 CNA。引用 "9.8" 时，请说明这是谁的 9.8。

[`🔗 WPScan 公告`](https://wpscan.com/vulnerability/6b0a5d1f-84fb-425f-8d37-ddde5703937c/) · [`🔗 CVE-2026-114432 on NVD`](https://nvd.nist.gov/vuln/detail/CVE-2026-114432)

---

## 8. Cognitive Symbionts：一篇立场论文主张把 "AI 增强的人类智能" 当作一等目标，而非 AGI 的副产品

- **Velocity:** ▮▮ rising
- **Source:** Hugging Face Papers · 116 upvotes · Nov 6 批次
- **Tags:** `research` `position-paper` `human-ai`

Hugging Face 11 月 6 日日榜的最高票论文（arXiv 2611.05376，Nov 3 18:59Z 提交，Hao Fei 等）主张：与 AGI 问的 "一台机器能有多聪明" 并列，AI 增强的人类智能（AHI）— 问的是 "一台机器能在特定的人身上促成多少智能" — 应当被同等对待。它设计的对象是 **认知共生体（cognitive symbiont）**：一种 "终身的、嵌入的、实时的、私密的、低摩擦的、主动的陪伴者"，感知用户所感知的、跨年保留上下文；设计空间组织为一个共生循环（感知、保留、理解、共同生活、行动、共同思考、成长），由个人运行时与信任来约束。论文还把治理当作内生部分，点名了考试中的隐蔽协助和社会性采用压力这两类一等风险。

**Why it matters:** 本季度发布的每一个个人代理记忆产品，都在搭建这篇论文研究对象的一个临时版本；立场论文的价值在于给出词汇。它的框架也反衬了当前的基准现状：如果进步的单位是某个具体的人现在能做到什么，前沿榜单的增量就不再是度量。

[`🔗 arXiv:2611.05376`](https://arxiv.org/abs/2611.05376) · [`🔗 Hugging Face papers`](https://huggingface.co/papers/2611.05376)

---

## 9. SLA 用持续预训练扩展空间-语言-动作机器人模型 — 3D 感知保持冻结

- **Velocity:** ▮▮ rising
- **Source:** Hugging Face Papers · 92 upvotes · Nov 6 批次
- **Tags:** `research` `robotics` `vla`

SLA（arXiv 2611.08373，Nov 5 17:52Z 提交，Fuhao Li 等）通过持续预训练而非改架构来扩展隐式空间对齐的 VLA：以预训练的 pi05 策略初始化，联合优化动作预测与中间视觉嵌入同 **冻结的** 3D 感知模型空间表征之间的对齐，覆盖跨本体、跨任务、跨场景的异构机器人数据集。两个机制承载这种多样性：自适应聚合多个 VLA 层视觉嵌入的特征依赖门控，以及降低演示轨迹过拟合的概率状态 dropout。推理时所有辅助组件全部丢弃，预训练权重与原架构直接复用。

**Why it matters:** 这里的 VLA 扩展故事是数据加辅助目标，而不是新架构 — "只在训练期存在" 的模式（部署即消失的门控与 dropout）是任何想在冻结基础策略上外挂辅助表征的人都可以搬走的技巧。

[`🔗 arXiv:2611.08373`](https://arxiv.org/abs/2611.08373) · [`🔗 Hugging Face papers`](https://huggingface.co/papers/2611.08373)

---

## 10. JIT 位图文字渲染：在单片机上为每段字符串即时编译绘制循环

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 81+ pts · 10h ago (~18:42 UTC+8)
- **Tags:** `rust` `embedded` `graphics`

Raph Levien 关于 vic-2350 的最新文章 — 仓库的自我描述是 "An alternate universe 80s home computer, realized on RP2350 hardware"（11 月 7 日有推送）— 攻克的是一个硬预算：这台机器逐束扫描（520 kB SRAM，无帧缓冲），每像素只剩约 6 个周期，Rust 达不到。答案是 JIT：在显示时刻为 **每段字符串** 编译一段专用的 ARM 机器码循环，用的是他为 Cortex-M33 设计的 symbolasm 语言。文章中的数字：内层循环每字形编译 23 周期，演示编译约 21k 周期、执行约 42k 周期（约单核吞吐的 2.6%），编译在扫描输出前 100 µs 内完成；字距调整归结为对每字形 2 字节位向量的 AND 加 popcount。第二遍把 1bpp 扫描行扩成 RGB565，每像素 1.75 周期。他提到 Claude 把他手写的 Rust 草稿翻译并优化成了 JIT 编译器。

**Why it matters:** 这是 1982 年 Blit 的把戏 — 为将要绘制的内容生成显示代码 — 快了三个数量级，用在文字上，跑在 5 美元的单片机上。逐帧编译而非缓存，是嵌入式文字设计空间里一个真正的新点位，而且全部开源。

[`🔗 linebender.org 文章`](https://linebender.org/blog/jit-bitmap-text/) · [`🔗 raphlinus/vic-2350`](https://github.com/raphlinus/vic-2350) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50412072)

---

## 11. BestRand：随机基准子集误差呈长尾 — 剪掉尾部，估算误差降 16.4%，构建成本只要一半

- **Velocity:** ▮ steady
- **Source:** Hugging Face Papers · 51 upvotes · Nov 6 批次
- **Tags:** `research` `benchmarks` `evaluation`

基准压缩 — 用小子集估算完整基准分数 — 通常就是随机抽样，而 BestRand（arXiv 2611.00883，Oct 31 12:36Z 提交）的出发点是对该估计量误差分布的解析近似：它是 **长尾的**，随机抽样平均很好，但罕见的大误差让它不稳定，且这种不稳定性在现代基础模型间持续存在。BestRand 保留随机的效率、剪掉高误差尾部，在 "70+ 个文本、多模态与智能体基准" 上验证：高误差风险降 50.2%，估算误差降 16.4%，构建成本只要 51.3%，分布外估算误差平均降 21.8%。

**Why it matters:** 模型发布节奏跑赢评测预算，省钱的评测正在变成基础设施 — 而这篇论文的贡献恰恰是把便宜选项何时会无声失效刻画清楚，这正是 "我们抽了 500 道题" 式声明里通常缺的那部分。

[`🔗 arXiv:2611.00883`](https://arxiv.org/abs/2611.00883) · [`🔗 Hugging Face papers`](https://huggingface.co/papers/2611.00883)

---

## 12. VisSearch-Bench：挂上搜索工具后，最强的多模态智能体也只能完整解决 26.47% 的长程视觉搜索

- **Velocity:** ▮ steady
- **Source:** Hugging Face Papers · 22 upvotes · Nov 6 批次
- **Tags:** `research` `benchmarks` `multimodal`

VisSearch-Bench（arXiv 2611.04894，Nov 3 13:40Z 提交）测的是作者所称的视觉上下文管理 — 多模态智能体如何在多步网络与图像搜索中查找、跟踪、关联图像。它有 **204 道人工编写的任务，横跨 7 个主领域与 25 个子领域**，三种形态（集合式、序列式、结构引导式视觉搜索），每道题带参考答案、可溯源证据和评分规则，按 Accuracy 加衡量部分正确性的 Process Score 打分。16 个多模态模型 — 即便挂上搜索工具 — "最好的系统也只能完整解决 26.47% 的任务。"

**Why it matters:** 智能体搜索浪潮主要是在文本检索上得到验证的，那边 BM25 加 grep 就够了；这个基准论证的是问题的图像部分远未解决，并且给了它一个证据可溯源的评分规则，而不是凭感觉。

[`🔗 arXiv:2611.04894`](https://arxiv.org/abs/2611.04894) · [`🔗 Hugging Face papers`](https://huggingface.co/papers/2611.04894)

---

## 13. PacketHound 把 Windows 防火墙变成先问后放行的出站防火墙

- **Velocity:** ▮ steady
- **Source:** Hacker News · 44+ pts · 3h ago (~01:16 UTC+8)
- **Tags:** `windows` `privacy` `open-source`

PacketHound（v1.2.0，GPL-3.0，仓库 11 月 5 日创建、11 月 8 日有推送）是 Windows 10/11 的出站连接防火墙："Most firewalls only watch what comes in. PacketHound sniffs out what goes out" — 应用首次尝试联网时弹出 Allow 或 Block，并记住答案，同时对 Windows 自身的系统通讯保持安静，免得你被提示淹没。下载 68.2 MB；HN 帖子是它第一次面对真正的受众。

**Why it matters:** Little Snitch 的工作流二十年来一直是 Mac 安静的隐私优势，而出站可见性正是现代数据外泄 — 包括智能体时代的外泄（编码代理读到的凭据出现在你意料之外的地方）— 所在之处。一个免费、先问后放的 Windows 等价物填补了真实空白；显而易见的下一个问题是，当应用孵化出一打辅助进程时，它的放行规则 UI 会怎么表现。

[`🔗 packethound.app`](https://packethound.app/) · [`🔗 packethound-app/packethound.app`](https://github.com/packethound-app/packethound.app)

---

## 14. Tasfer 把整个富文本编辑器画在 2D 画布上 — 不用 contentEditable，CRDT 经 WebRTC 同步

- **Velocity:** ▮ steady
- **Source:** Hacker News · 78+ pts · 4.7d ago（仍在首页）
- **Tags:** `editor` `canvas` `crdt`

Hamza Khuswan 的 Tasfer（11 月 3 日文章；仓库 11 月 8 日有推送）完全绕开 `contentEditable`：文字、光标、选区、断行、从右到左/阿拉伯文整形，全部由自定义代码渲染在 HTML5 2D 画布上，用一个隐藏输入框保住输入法与自动纠错。它本地优先、无账号，经作者自己实现的 CRDT 走 WebRTC 同步 — 极简服务器只帮助设备互相发现、不存储任何东西，加密中继作为后备。应用是 AGPL；编辑器引擎是 MIT，可单独商用授权。作者把提速归功于 LLM 辅助 — 2025 年 12 月发现 Claude 对这种规模的项目有多好用之后。

**Why it matters:** `contentEditable` 是网络最老的沼泽之一，而每个手写编辑器的故事最终都要亲手重做断行和输入法。一个把硬骨头（RTL、IME、CRDT）都啃完的可用画布编辑器，加上 MIT 授权的引擎，是嵌入场景的真实选项 — 五天过去，HN 帖子还在被推敲。

[`🔗 hamza.se/blog/tasfer`](https://www.hamza.se/blog/tasfer) · [`🔗 tasferlabs/tasfer`](https://github.com/tasferlabs/tasfer)

---

## 15. ziwei-doushu：1.69 万星的开源紫微斗数排盘引擎 — 代码 MIT、数据 CC-BY，姊妹仓库把 160 万帧视频喂给 LLM

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · +4,906 this week · 16.9k stars
- **Tags:** `chinese-oss` `open-source` `llm`

本周值得注意的中国开源上升项目是紫微斗数排盘引擎（ziwei-doushu，代码 MIT、数据集 CC BY 4.0，2026 年 5 月创建，现 16,935 星）：基于倪海厦《天纪》教学体系的完整排盘系统 — 完整排盘算法、四化系统、格局知识库与古籍原文数据。其 v4.0 解读数据集（10 月 15 日发布）覆盖 **674,976 张命盘 × 13 维 = 8,774,688 段解读，解压后 56.6 GB（约 204 亿字）**。11 月 8 日，README 加入了新的姊妹仓库 `nishi-ziwei-video-reading`（11 月 8 日创建）：多家大模型逐帧精读 17 集、160 万帧的源课程视频，方法、脚本、考题、成绩与踩坑全程随项目公开。

**Why it matters:** README 的边界声明 — 算法是公开的传统智慧，价值在于解读深度、用户体验与持续运营 — 是当 "算法" 本身就是公开数据时，对开放核心护城河去向最干净的表达之一。而那个姊妹仓库本身就是一份把 LLM 规模的视频摄取用于领域语料的工作日志，自带方法论价值。

> 项目连自身局限都发布了：README 指出六亲判断是它最弱的维度，并引用源课程原话说明，线上站点同样标注。

[`🔗 Renhuai123/ziwei-doushu`](https://github.com/Renhuai123/ziwei-doushu) · [`🔗 nishi-ziwei-video-reading（姊妹仓库）`](https://github.com/Renhuai123/nishi-ziwei-video-reading)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-08T20:31:15Z |
| Items | 15 |
| Sources tracked | 14 (Hacker News, GitHub Trending, NVD, CISA-ADP enrichment, VulnCheck advisories, IBM security bulletins, WPScan, arXiv, Hugging Face Papers, The Decoder, MailRoute, linebender.org, packethound.app, hamza.se) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[Previous day](2026-11-08.md) · [Raw .md](https://trending.md/zh/feed/latest.md) · [Archive](../archive/index.md)
