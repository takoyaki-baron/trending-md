---
date: 2026-11-09
updated: 2026-11-09T05:12:07Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 24
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

## 16. 从车牌到解锁车门：一条联网汽车攻击链，WAF 绕过是 LLM 在人类放弃之后找到的

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 139+ pts · 4.7h ago (~08:10 UTC+8)
- **Tags:** `security` `automotive` `llm`

Assetnote 联合创始人 Shubham Shah 与 Sam Curry 发布了针对同一车企联网汽车平台的成对研究（品牌刻意匿名；全部测试均在 "我们明确拥有或获准交互的汽车" 上进行）。澳大利亚链路：一个暴露的 `admintool.*` 子域，其管理 API 的认证仅靠 "硬编码在 JavaScript bundle 里的 API key"；经公开登记查询从车牌拿到 VIN；VIN→订阅者 GUID→个人身份信息；一个厂商 JS bundle 里内嵌的 ForgeRock OpenIDM 管理员凭据 — 本该只用于预发环境 — 在生产环境同样有效。然后是那堵墙：所有 `/openidm/` 路径都被 WAF 拦截，显眼的穿越路径（`/XUI%2f..%2fopenidm/`）直接 403，而 OpenIDM 自身的 servlet 路由拒绝含穿越字符的路径 — 哪怕它已经签发了管理员 JWT。人工尝试数日之后："我们把最接近目标版本的 OpenIDM 源码抓下来，让 GPT 5.6 Sol Ultra 在上面花了整整六个小时。它成功了。" — `/static%2f..%2fopenidm/` 这个前缀不在 WAF 覆盖范围内。再叠加一个 MFA 绕过（ROPC 令牌经 `IDTokenROPC` 服务换取），`POST /v1/remote/route/command {"command":"door-unlock"}` 即可落地："对这家车企在澳大利亚、美国和加拿大的任何车辆发送解锁、启动引擎等远程指令。" 页面同时写明：无 WAF 拦截的 `getUser` 端点泄漏 PBKDF2-SHA512 密码哈希、PIN 哈希、推送 token 与个人信息；而车企恰恰在这些端点上 "投入了大量 WAF 规则"。

**Why it matters:** ForgeRock 身份基础设施正在成为高价值攻击链里反复出现的那张多米诺 — 上周是 OpenAM 10.0 WebSocket 令牌窃取，这次是完整的车辆控制链 — 而这篇博文干净地记录了新的分工：人类完成系统测绘、撞上路由/WAF 之墙，LLM 的穷举搜索找到了那个未被覆盖的前缀。"作为人类，我们以为那个 403 适用于所有前缀" — 这正是自动化搜索要消灭的失败模式。

[`🔗 shubs.io — 澳大利亚链路`](https://shubs.io/unlocking-any-car-from-x-brand-in-most-of-the-world/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50419215)

---

## 17. NVIDIA 董事会就 "外国情报行动" 对黄仁勋启动独立调查 — 并声明未发现泄露证据

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 440+ pts（两条帖） · 8.5h ago (~04:26 UTC+8)
- **Tags:** `industry` `nvidia` `governance`

NVIDIA 董事会 11 月 8 日声明："鉴于近期关于创始人兼 CEO 黄仁勋成为外国情报行动目标的报道，董事会正启动独立调查。一个由独立董事组成、并聘请外部独立法律顾问的委员会将监督调查。" 同一声明里承重的那句是："虽然董事会没有理由认为国家安全或 NVIDIA 机密已被泄露，但董事会的调查将审视所有可用信息。" 数小时后，黄仁勋的全员信（《A Message to Our Company》）承认了引发报道的私人行为，并承诺配合审查；HN 上两份文件均在数小时内冲破 440 分。其背后的原始报道来自 Bloomberg（付费墙）。

**Why it matters:** 让整个 AI 算力栈所依赖的公司的 CEO 接受治理调查，无论最终是否发现泄露，都是一条连续性新闻。董事会自己的措辞 — 预防性、无泄露证据、"对 Jensen 及其领导团队抱有信心" — 才是应当引用的句子；在原始文件之前做出的任何 "泄露" 定性都是猜测。

[`🔗 NVIDIA 董事会声明`](https://nvidianews.nvidia.com/news/statement-from-nvidia-board-of-directors) · [`🔗 A Message to Our Company`](https://nvidianews.nvidia.com/news/a-message-to-our-company)

---

## 18. KetchUp 在 HN 发布、发布途中改名 BenchUp — Rust + WebGPU 的开源 SketchUp 替代品

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 309+ pts · 6.3h ago (~06:35 UTC+8)
- **Tags:** `cad` `rust` `webgpu`

昨晚最大的 Show HN（309 分）是一款面向木工的免费开源 3D 建模器：Push/Pull、精确尺寸、组与组件、可移植的项目文件 — 既作为 Windows/macOS/Linux 原生应用运行，"也通过 WebAssembly 在桌面浏览器中运行"，浏览器构建 "优先使用 WebGPU，回退到 WebGL2"。它可导入 SketchUp 的 `.skp`、导出 `.obj`；最新版本 v0.6.6，仓库 10 月 23 日创建（目前 198 星 — HN 的热度给了网页版应用），今天 04:12Z 还有推送。这次发布的一个现场插曲：HN 标题仍写着 **KetchUp**，但站点与仓库已改名 **BenchUp**（"formerly KetchUp"），README 还在引用旧版 `.ketchup` 项目 — 公告发布一天之后的改名。

**Why it matters:** 自 SketchUp 易主之后，工坊级 CAD 这个细分一直缺少可信的自由软件答案，而这是迄今最认真的一次尝试 — 一套 Rust 代码同时产出原生应用与浏览器版本。这场中途改名也是本 feed 反复度量的 "公告 vs 工件" 落差的活体标本：引用仓库现在的名字，而不是发布标题里的那个。

[`🔗 BenchUp3D/editor`](https://github.com/BenchUp3D/editor) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50418176)

---

## 19. Dux Modular Shell 2.1：一个 QML shell 取代 waybar 加五个守护进程的 Wayland 桌面 — HN 225 分

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 225+ pts · 9.7h ago (~03:08 UTC+8)
- **Tags:** `linux` `wayland` `desktop`

DMS 2.1（"Stormborn"，11 月 4 日发布；当前 v2.1.2）是一个 Quickshell 上的 QML 加 Go 后端的 monorepo，提供面板、小部件、启动器、锁屏、空闲管理、通知与 polkit — 明确要取代 waybar/swaylock/swayidle/mako/fuzzel 那套组合 — 覆盖 niri、Hyprland、Sway、labwc、MangoWC、Scroll 与 Miracle WM。2.1 新增界面密度预设（Spacious 到 Dense）、"DMS Classic" 风格、带同步歌词的播放器、视频壁纸，以及安装器对 Fedora Atomic 的支持。项目 8.9k 星，已进入 Arch 的 `extra` 官方仓库（不只是 AUR），最后一次提交在 11 月 8 日。HN 标题把它低估成 "desktop shell with file manager"；实际套件还包括 Dux Files、日历与 Greeter。

**Why it matters:** 后 GNOME/KDE 时代的 Wayland 世界缺的那块拼图就是 "组装好的桌面层"，而一个跨合成器的 shell 进入发行版官方仓库，是把 "自选合成器、自选 shell" 从折腾爱好变成受支持配置的里程碑。

[`🔗 duxlabs.dev — v2.1 发布说明`](https://duxlabs.dev/blog/v2-1-release) · [`🔗 duxlabs-dev/dux-shell`](https://github.com/duxlabs-dev/dux-shell) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50416053)

---

## 20. RAM Altman：一个每天把你空闲内存数字邮件发给 Sam Altman 的 cron 脚本 — DRAM 涨价成了梗

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 216+ pts · 11.5h ago (~01:20 UTC+8)
- **Tags:** `humor` `hardware` `dram`

这个项目（仓库 11 月 5 日创建，821 星）是一个跑在定时器上的 shell 脚本：当空闲内存超过 10% 时，就把机器真实的 `MemTotal − MemAvailable` 数字放进一组轮换的文案里发给 Altman，`--dry-run` 可以只预览不发送。它玩的是 Altman 的那些言论 — 家用 PC 的 DRAM "可能只有 5% 的时间在被使用"、在个人机器里囤 DRAM "相当糟糕" — 而这些话正落在今年 AI 驱动的内存涨价潮上。该项目值得称赞的是自带更正：站点注明 Altman 已说这些话被断章取义，他发帖称 "i want you to have so much ram"，还一度在 X 上把自己改名为 Ram Altman；项目自标签为恶搞、无任何关联。

**Why it matters:** 一个玩笑拿到 200+ 分是一支温度计 — 内存涨价的痛感已经在这个受众里梗化了。而一个在自己的站点上同时保留 "刺" 与 "更正" 的梗，比大多数正经报道同一言论的媒体更讲究信源卫生。

[`🔗 ram-altman.lol`](https://ram-altman.lol/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50415172)

---

## 21. 继 2026-11-04 报道 C++26 DIS 否决之后：Herb Sutter 的复盘称决定因素不是契约 — "the language's creator and its owners disagree"

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 91+ pts · 5.4h ago (~07:28 UTC+8)
- **Tags:** `cpp` `standards` `iso`

P4454R0（日期 2026-10-31；isocpp.org 上九页 PDF）的 tl;dr 开门见山："The core decisive issue that caused the DIS to fail is that the language's creator and its owners disagree." Sutter 的三个事实：WG21 对契约有强共识（2026-03 克罗伊登 114–12）；"For the first time since WG21 was formed 36 years ago, C++'s creator is siding with the minority" 反对 DIS；而各国标准 body 选择给 Bjarne Stroustrup 的异议更大权重 — 游说使 "more than doubled the numerical NB opposition"，且票数接近到一票倒戈加一票弃权就能通过。针对程序性抱怨，他为共识数字做了辩护：EWG 主席 "quietly counted every contracts poll twice" 以按公司去重。他为 C++26 列出六个选项，从完全跳过 ISO 发布（选项 A）到把标准化挪进某个国家团体或 Linux 基金会（选项 E/F）— 并有一条编者注：Bjarne 在审阅该文时表示，选项 B（移除契约重新投票，理想情况下六周内产出新 DIS）"is the outcome he most wants to see"。

**Why it matters:** 本周的投票被报道成契约设计之争；而第一手复盘认为技术辩论是次要的，真正起作用的是每个标准组织迟早会遇到的治理问题 — 创始人的异议相对委员会共识到底该占多大权重。并且它点出一种仍然活着的可能性：C++26 在没有契约的情况下发布。

[`🔗 P4454R0（PDF，isocpp.org）`](https://isocpp.org/files/papers/P4454R0.pdf) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50418818)

---

## 22. Keycloak 令牌交换签名绕过的公开公告比修复晚了 130 天 — CVE-2026-11800，8.1

- **Velocity:** ▮▮ rising
- **Source:** GitHub Advisory DB · GHSA-j97h-3f8r-mrjr · Nov 3 (~6d ago)
- **Tags:** `security` `cve` `identity`

CVE-2026-11800（CVSS 3.1 8.1，Red Hat CNA `secalert@redhat.com`；NVD 记录为 `Analyzed`，Red Hat 分数是唯一指标 — 属于 NVD 背书但未自行发布分数的形态 — 另有 CISA-ADP SSVC 容器）："This JWT algorithm confusion vulnerability in the JWT Authorization Grant flow allows an attacker with valid client credentials to bypass signature verification"，伪造断言铸造未授权访问令牌 — 这是身份供应商所能出现最深的一道口子，门槛只是持有有效的客户端凭据（`PR:L`）。修复随上游 **26.6.4 于 2026-06-26 发布**；记录它的 GHSA 则到 **2026-11-03** 才落地 — 晚了 130 天。当前 26.8.2 线（11 月 5 日）已带修复；Red Hat 的 RHBK 容器在 26.6.4-2/26.6-8。

**Why it matters:** 全球部署最广的身份供应商之一的令牌交换被绕过，这是凭据铸造原语，不是数据泄漏 — 而披露时钟才是故事本身：按公告发布时间打补丁的人，在代码修复之后还带着漏洞跑了四个月。查查你的身份供应商六月修了什么，而不是十一月公告了什么。

[`🔗 CVE-2026-11800 on NVD`](https://nvd.nist.gov/vuln/detail/CVE-2026-11800) · [`🔗 GHSA-j97h-3f8r-mrjr on OSV`](https://osv.dev/vulnerability/GHSA-j97h-3f8r-mrjr)

---

## 23. IBM Qiskit 一次两条 8.4 — 量子检查点反序列化 RCE，以及一条把自己的修复版本写进受影响范围的记录

- **Velocity:** ▮▮ rising
- **Source:** NVD · 2 条记录 · Nov 8 17:16Z (~01:16 UTC+8)
- **Tags:** `security` `quantum` `deserialization`

CVE-2026-116499 — "IBM Qiskit SDK 1.4.2 through 2.6.2 could allow a local attacker to execute arbitrary code due to deserialization of untrusted data"：格式版本低于 13 的 QPY 文件在反序列化时内部使用 SymPy，构造的 `.qpy` 检查点在加载时即可执行代码。CVE-2026-116501（2.4.0–2.6.1）是损坏酉矩阵导致的越界写。两条均为 8.4 CVSS 3.1（IBM CNA `psirt@us.ibm.com`，Secondary 槽位），NVD `Awaiting Analysis`，带 CISA-ADP SSVC（利用：无；可自动化：否；技术影响：total）。两者都已在 **v2.6.2** 修复（PyPI 2026-11-05 — 比记录早三天）。而范围怪象就写在记录自己的描述里："1.4.2 **through** 2.6.2"，公告的修复建议却是 "升级到 2.6.2" — 修复版本落在其声称的受影响范围之内（姊妹记录的 "2.4.0 through 2.6.1" 是干净的）。

**Why it matters:** 模型文件加载即执行的类已经抵达量子栈 — `.qpy` 文件是 notebook 和课件里共享的工件，这里的 "本地" 是指任何打开你检查点的人。而 "through 到修复版本" 的范围算术正是版本扫描器会照字面执行的东西；引用公告的升级行，别引用记录的范围。

[`🔗 IBM 安全公告（CVE-2026-116499）`](https://www.ibm.com/support/pages/node/7295238) · [`🔗 CVE-2026-116499 on NVD`](https://nvd.nist.gov/vuln/detail/CVE-2026-116499)

---

## 24. Stanford Stanza：藏在 bytes 字段里的 pickle 绕过 `torch.load(weights_only=True)` — CVE-2026-115878

- **Velocity:** ▮▮ rising
- **Source:** NVD · 1 条记录 · Nov 3 21:17Z (~6d ago)
- **Tags:** `security` `ai` `pickle`

CVE-2026-115878（CVSS 3.1 7.8，GitHub CNA `security-advisories@github.com`；NVD `Received`）："From 1.14.0 until 1.15.0, loading an attacker-supplied lemmatizer checkpoint" 可执行任意代码 — stanza 把词形还原器的 `pos_dict` 存成 gzip 压缩的 pickle，塞进检查点的 `dicts` 字段（一个 **`bytes`** 值），而 `torch.load(weights_only=True)` 把 `bytes` 当作基本类型，白名单根本看不到内层 pickle（向量 `AV:L/PR:N/UI:R` — 以加载模型的人的身份运行）。已在 **1.15.0** 修复（PyPI 2026-10-01，比公告早 32 天；PR #1649）。

**Why it matters:** 加载检查点时大家默认伸手去拿的安全开关就是 `weights_only=True`；这是一个已修复的反例，展示它的盲区 — 一种携带序列化载荷的基本类型 — 就藏在那些大管道经常包裹的小 NLP 库里。检查点供应链的故事，总是比防护栏深一层。

[`🔗 GHSA-gh9r-c94j-cmp5 on OSV`](https://osv.dev/vulnerability/GHSA-gh9r-c94j-cmp5) · [`🔗 CVE-2026-115878 on NVD`](https://nvd.nist.gov/vuln/detail/CVE-2026-115878)

---

## 25. 微信 WeLM-Image 宣称开源图像生成第一 — 一份没有权重支撑的 31.7B MoT 报告

- **Velocity:** ▮▮ rising
- **Source:** arXiv · 2611.07392 · Nov 5（HF papers ~42 赞）
- **Tags:** `research` `image-generation` `tencent`

微信视觉团队的技术报告：统一图像基础模型（理解、生成、指令编辑、多参照合成）采用 Mixture-of-Transformers 骨干 — 共享注意力、独立的理解/生成参数 — 每条路径各配 MoE：**存储参数 31.7B，每个目标 latent token 激活约 5.4B 生成参数**，以 1.5K 原生分辨率训练，再经 rubric/清单奖励 RL 与噪声感知在线策略蒸馏。摘要的头条：1536 分辨率模型 "ranks first among the evaluated open-source models"，横跨 PRISM-Bench 与另外两个基准。Turbo 变体（MeanFlow 少步蒸馏）在单张 H20 上 **4.98 秒** 生成 1024×1024。论文还自建了编辑基准 WeGenEditBench（2,740 条精选样本），理由是既有编辑基准缺少逐样本的核验标准。而决定性的注意事项：**没有公开权重** — Hugging Face 搜索一无所获，论文也没有发布计划。

**Why it matters:** "在受评的开源模型中排名第一" 是关于作者自己选定的比较集的声明，出自一个尚未发布模型的实验室 — 它确实是腾讯生产栈走到哪了的真信号，但目前既不是你能跑的模型，也不是你能复核的榜单。

[`🔗 arXiv:2611.07392`](https://arxiv.org/abs/2611.07392) · [`🔗 Hugging Face papers`](https://huggingface.co/papers/2611.07392)

---

## 26. Vercel 的 json-render 把带校验的生成式 UI 流式送进 Chat SDK 智能体 — 19.5k 星与一份约束 AI 生成 UI 的规范

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · +149 today · 19.5k stars
- **Tags:** `agents` `generative-ui` `frontend`

11 月 7 日的 changelog 把 json-render 接进 Chat SDK 智能体：智能体输出一份类型化 JSON 规范，渲染成 Slack Block Kit 或 Teams Adaptive Cards 卡片；编辑以流式送达、变更节流至最多每 500 毫秒一次；`toCard` 按组件 schema 校验每个元素的 props，抛出带逐条诊断的 `CardSpecError`，设计上可直接回喂给模型。Apache-2.0 的核心带 React、Vue、Svelte、Solid、React Native、ink（终端）、react-three-fiber、react-pdf、remotion 与 email 适配器；v0.22.0 于 11 月 4 日发布。

**Why it matters:** 让 AI 写 "constrained to your catalog" 的 UI 是所有 agent-UI 产品正在收敛的形态，而这个实现把校验-重试放进了协议 — 卡片要么通过你的 schema 类型检查，要么模型收到精确的违规清单 — 而不是靠提示词祈祷模型乖巧。

[`🔗 vercel-labs/json-render`](https://github.com/vercel-labs/json-render) · [`🔗 Vercel changelog`](https://vercel.com/changelog/json-render-and-chat-sdk-agents)

---

## 27. Paradev 在转向 MIT 数小时后发布 Desktop Canary：每个 CLI 智能体一个工作区、每个任务一个 worktree — 16.1k 星

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · +39 today · 16.1k stars
- **Tags:** `agents` `devtools` `worktrees`

Paradev 是一个编排 Claude Code、Codex、OpenCode、Gemini CLI 与 Cursor Agent 的桌面应用：每个任务拥有自己的 git worktree、分支与终端，内置评审/PR 面板与每工作区的 dev-server 预览 — "不是编码智能体本身……不代理模型调用"。desktop-v2.0.6（11 月 8 日）加入了 Bring-Your-Own-Cloud 指南与 MIT 许可变更；**Desktop Canary** — 2026-11-09T00:53Z 发布的 main 自动构建、标注为内部测试且可能不稳定 — 是桌面线下一版的首次亮相。支持 macOS（Apple Silicon/Intel）与实验性 Linux AppImage；没有 Windows 版。CLI 仍叫 `superset`，与 Apache Superset 明确无关。

**Why it matters:** CLI 智能体的指挥层正在快速整合，而 Paradev 的站位 — 不持有任何模型关系、MIT、自带云 — 直接挥向 Conductor/Codex 应用形状的在位者。值得盯的赌注是：没有模型厂商锁定的编排，能否扛住在位者的捆绑。

[`🔗 ParadevAI/Paradev`](https://github.com/ParadevAI/Paradev) · [`🔗 releases`](https://github.com/ParadevAI/Paradev/releases)

---

## 28. kortix-ai/CompanyOS：常驻智能体加服务端 Goals，只有校验会话能关单 — v0.15.1，20.6k 星

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · +72 today · 20.6k stars
- **Tags:** `agents` `open-source` `automation`

CompanyOS 是一个事件驱动的多智能体 "公司操作系统"，构建于 pi 运行时之上：智能体按计划、webhook、工具事件与团队消息启动，各自运行在带持久状态的云端计算机上，宣称接入 3,000+ 应用。v0.15.1（11 月 7 日）把 Goals 迁到 API 并改为服务端状态 — "only a verifier session can mark a goal done" — 并新增 Proactive Spaces：一个读取 "Space 事件流、只在真正要紧时才开口" 的监视器。

**Why it matters:** 常驻智能体的技术栈正在开源世界成形，而它的难题是信任。一个不能给自己关单的智能体 — 必须由另一个校验会话来 — 是第一批把 "谁来检查智能体的作业" 变成架构事实而非提示词指令的开源设计之一。

[`🔗 kortix-ai/CompanyOS`](https://github.com/kortix-ai/CompanyOS) · [`🔗 releases`](https://github.com/kortix-ai/CompanyOS/releases)

---

## 29. Muir：Google 发现门控 delta-rule 注意力的擦除门可以低秩 — 并拿到 2,560× 长度外推

- **Velocity:** ▮ steady
- **Source:** arXiv · 2611.08376 · Nov 5（HF papers ~9 赞）
- **Tags:** `research` `linear-attention` `architecture`

Gated DeltaNet-2 在写入新值前会衰减其 KV 状态并擦除对 incoming key 的预测。Muir 的出发点是 "state updates are far less sensitive to erasure than to writes" — key 激活与单位归一化把 key 的能量集中到稀疏的通道子集 — 因此擦除门可以是**低秩**的。Muir 把所有门融合进一个按敏感度分配的低秩投影，加入匹配滤波式读出门，把省下的参数投给更宽的 FFN，并以并行形式保证大 chunk 下的数值稳定。在 166M–1.34B 参数区间：困惑度较 GDN-2 降 1.8–2.0%、较 Transformer 降 2.5–3.6%；1.34B 规模上赢得多跳与多针检索，并实现 **2,560×** 外推 — 从 4K 训练长度到 1000 万 token 的流。论文自述的局限：在固定门秩预算下，静态与动态读出在单视野保持与多滞后适应之间做取舍；Splash Attention 在短上下文（约 11K 以内）仍然更快，因为它有融合的 Pallas 内核而 XLA 要在 HBM 里物化 chunk 临时量。

**Why it matters:** 这是在 flash-linear-attention 从业者真正训练的规模上、对门控 delta-rule 家族的一次带测量结果的化简 — 引用外推头条之前，先带上那句短上下文回退的诚实注脚。

[`🔗 arXiv:2611.08376`](https://arxiv.org/abs/2611.08376) · [`🔗 Hugging Face papers`](https://huggingface.co/papers/2611.08376)

---

## 30. 潜空间通信的收益真来自通信吗？PLatour 的对照实验说有时不是 — 并把抓这类问题的测试一并开源

- **Velocity:** ▮ steady
- **Source:** arXiv · 2611.06976 · Nov 4（HF papers ~15 赞）
- **Tags:** `research` `multi-model` `evaluation`

PACT（prefill 到自回归的跨模型迁移）把大型冻结模型的提示表示与小型模型的廉价生成拼在一起。PLatour 是它的开源框架 — 零初始化线性桥接，报告称优于开源基线、并以更小的发送端在共享的数学/编码基准上超过既有系统 — 然后论文真正的贡献落地："controlled experiments show that the gains on some tasks can be reproduced by uninformative sender signals, self-communication, or receiver-only training。" 也就是说，可训练的桥接可以只作为参数高效微调起作用，完全没有利用发送端信息。论文同时发布 **PACT-Check**：一个量化训练后系统的收益里有多少是真实通信的测试。

**Why it matters:** 潜空间通信与跨模型压缩的论文报告的都是端到端任务增量；这篇提供了能把 "小模型真的在用大模型" 与 "桥接只是一个伪装成通信的小 LoRA" 区分开的阴性对照。在下一个头条数字面前，先跑它。

[`🔗 arXiv:2611.06976`](https://arxiv.org/abs/2611.06976) · [`🔗 zhenyi4/platour`](https://github.com/zhenyi4/platour)

---

## 31. SAE Interprets MoE：精确到专家的特征归因 — 每个 latent 的预激活都能按专家分解，无需计数

- **Velocity:** ▮ steady
- **Source:** arXiv · 2611.08089 · Nov 5（HF papers ~7 赞）
- **Tags:** `research` `moe` `interpretability`

既有的 MoE 分析 "count how often an expert is selected on domain-labeled corpora, an instrument that … records selection rather than contribution"。ByteDance Seed 的替代方案：MoE 层输出是专家输出的路由加权和，而 SAE 编码器是仿射的，所以**每个 latent 的预激活都能对专家做精确分解** — 是贡献，不是被选次数。在 Qwen3-30B-A3B（第 4/30/46 层）上：贡献 "far more concentrated than gating"，多数 latent 只有一两个主导专家，且自动解读的主导集合呈现子域专精 — Java 与前端 web 代码分属不同专家，几何与算术/多项式亦然。代码已开源（Bytedance-Seed/SAE-Interprets-MoE）。论文自己的注意事项：粗粒度域之间的专家数 "very unequal"，谈集中度时要把这个基准率记在心上。

**Why it matters:** 一个精确（而非相关性）的归因方法，带代码，跑在大家真的在用的模型上 — 而 "被选 vs 贡献" 的区分，是任何审计路由模型专家真实行为的人都能复用的部分。

[`🔗 arXiv:2611.08089`](https://arxiv.org/abs/2611.08089) · [`🔗 Bytedance-Seed/SAE-Interprets-MoE`](https://github.com/Bytedance-Seed/SAE-Interprets-MoE)

---

## 32. Agentero：让智能体写修订校验的实验记录表、渲染只读 UI 块的研究工作区 — v0.15.3

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · +145 today · 2.1k stars
- **Tags:** `agents` `research-tools` `chinese-oss`

Agentero（MIT，中文优先附英文 README，2.1k 星，今日 +145）是一个人类与智能体共享同一上下文的桌面研究工作区。v0.15.3（11 月 8 日 23:58Z）新增在智能体回复内渲染的只读结构化 UI 块 — 从 `openui-lang` 代码围栏解析（layout/text/state/data/paper-reading 组件）— 以及可拖拽的 PDF 翻译悬浮卡与共享桌面抓取管线的 CLI feed 命令。v0.15.2 加入智能体经 `table_query`/`table_upsert` 以修订校验写入的实验记录表，以及 Papers-with-Code 集成。

**Why it matters:** 这个设计的分工才是重点：给模型干净、结构化、带修订校验的可写上下文，把人留在舒服的 PDF 世界里、只接收只读渲染回来。这是对中国开源圈持续出货的这类工具给出的、针对智能体上下文碎片化的具体答案。

[`🔗 poco-ai/Agentero`](https://github.com/poco-ai/Agentero) · [`🔗 releases`](https://github.com/poco-ai/Agentero/releases)

---

## 33. microduck：一只全身大脑都开源的 800 克 双足鸭 — MuJoCo 训练的 RL 策略，按小时出验证构建

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · +599 today · 13.6k stars
- **Tags:** `robotics` `reinforcement-learning` `open-source`

pollen-robotics 的 microduck 是一台约 25 cm / 800 g 的双足机器人，Rockchip RK3566 上的 50 Hz 控制环驱动 15 个舵机，策略来自姊妹仓库 `microduck_rl` 训练的 RL — MuJoCo + PPO、sim2real、ONNX 导出 — 具备行走、滚轮、喙部拾取与自我扶正等模式，固件更新 "verified, health-gated and reversible"（daemon 0.18.9-dev 构建今天刚盖时间戳；整機经 pollen-robotics.com 出售）。一句诚实的备注：本周的涨幅（+599 星/天）没有找到公开触发点 — 没有 HN 帖、没有媒体报道。可核验的是仓库本身、持续不断的发布节奏，和已经出货的整套栈。

**Why it matters:** 便宜玩具价位的机器人几乎都带着封闭的控制栈；这一台公开了完整训练工具链，让 "自己复现" 成为可检验的声明而不是营销话术。真正要盯的是那个找不到的触发点 — 引用热度之前先调查。

[`🔗 pollen-robotics/microduck`](https://github.com/pollen-robotics/microduck) · [`🔗 releases`](https://github.com/pollen-robotics/microduck/releases)

---

## 34. Aphyr 悼念 Harvest：Bending Spoons 把他的记账月费从 $13.32 提到 $133.98

- **Velocity:** ▮ steady
- **Source:** Hacker News · 75+ pts · 2.9h ago (~09:58 UTC+8)
- **Tags:** `saas` `pricing` `industry`

Kyle Kingsbury — Jepsen 的作者 — 写 Harvest：这款时间追踪/开票 SaaS 于 2025 年被 Bending Spoons 收购（用他的话说，"the company that gutted Vimeo"）：他的套餐从 **$13.32/月 涨到 $133.98/月**，方式是强制迁往 "enterprise" 套餐和一套 "unlimited" 用量计费 — 用他的原话说，"as far as I can tell, exactly what I had before"；$12.65/月的 "flex" 套餐在常规 ~3% 卡费之上再抽 2%；而支持邮件现在由大模型回复 — "they don't read customer emails any more." 注意事项：这是单个客户的叙述 — 他自己的套餐价格、他自己对条款的定性。

**Why it matters:** 自由职业者的基础设施（开票、计时）正在被收购方以约十倍重新定价，而且套路眼熟 — 把所有人迁到同一个套餐、把既有用量改名为计费项、把支持货币化。务实的做法是在迁移邮件到达之前就为续约定价，而不是之后。

[`🔗 aphyr.com — RIP Harvest`](https://aphyr.com/posts/427-rip-harvest) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50420035)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-09T05:12:07Z |
| Items | 34 |
| Sources tracked | 24 (Hacker News, GitHub Trending, NVD, CISA-ADP enrichment, VulnCheck advisories, IBM security bulletins, WPScan, GitHub Advisory DB, OSV Advisory DB, arXiv, Hugging Face Papers, NVIDIA Newsroom, isocpp.org, shubs.io, duxlabs.dev, vercel.com changelog, aphyr.com, ram-altman.lol, ketchup3d.github.io, The Decoder, MailRoute, linebender.org, packethound.app, hamza.se) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[Previous day](2026-11-08.md) · [Raw .md](https://trending.md/zh/feed/latest.md) · [Archive](../archive/index.md)
