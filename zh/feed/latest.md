---
date: 2026-10-26
updated: 2026-10-25T20:19:24Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 28
license: CC-BY-4.0
---

# 今日趋势 — 2026-10-26

## 1. 一个十年前的 CNN 在皮肤病变上击败 GPT-6 Astra 和 Claude Fable 5.1——62% 对 42%，而所有局限都写在正文里

- **Velocity:** ▮▮▮ trending
- **Source:** lynchlab.net / Hacker News · 242 pts · 约 3 小时前（~01:15 UTC+8 10 月 26 日）
- **Tags:** `medical-ai` `benchmark` `inception-v3` `evaluation`

作者在单张 H100 上把 **Inception v3**——"一个过时的架构"、"一个基线"、"刻意不做成最先进"——在 **68,011 张 ISIC Archive 图像**上微调了"大约二十分钟"，然后拿它与 **GPT-6 Astra** 和 **Claude Fable 5.1** 在 **200 个从 MILK10k 随机抽取、全部经组织病理学确认**的病变上对跑。每个模型拿到相同的两张图（临床照片 + 皮肤镜照片）和相同提示词、默认设置。在**六种可能的诊断**中，CNN 首选命中 **125/200（62%）**；两个大模型命中 **84 和 85（42%）**。允许第二选择后为 **173 对 134 和 138**。黑色素瘤首选命中 **13/30 对 8 和 11**。

**Why it matters:** 头条数字是这张表里最不重要的一行。CNN 的安全行为完全取决于阈值：在预设 cutoff 下它**留下了 100 个不该放行的病变中的 77 个**，但当阈值被调到与两个大模型的工作点对齐时，它留下了 **98 或 99 个**——同时只放走 100 个安全病变中的 1–2 个，而两个大模型放走了 22–32 个。作者还写明：CNN 在这套"全部已活检"的集合上 **AUROC 从 0.96 掉到 0.86**（"一颗医生决定切掉的痣，就是让临床医生担心的那颗"）；数据污染只可能对两个大模型有利（MILK10k 从 2025 年起公开，"CNN 当然没见过"）；200 个病变"足够看出模式，但不足以给接近的结果排名"；以及**分析和初稿是用 Claude Code 完成的**——正是被测的两个模型之一。这条披露本身就是这个条目。

[`🔗 lynchlab.net — LLMs vs a CNN on skin cancer`](https://lynchlab.net/llm-skin-cancer) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50233779)

---

## 2. Moonshot 称 Kimi K3.1 Pro 刻意放弃了 9.5 分的网络攻击能力——并点明了所用的那个未公开测试

- **Velocity:** ▮▮▮ trending
- **Source:** kimi.ai 技术博客 / Reuters 通稿 · 10 月 24 日发布 · 权重承诺 11 月 4 日前
- **Tags:** `kimi` `model-release` `cyber-capability` `open-weights`

在 **Kimi K3.1 Pro** 的技术博客里，Moonshot 说它"识别并移除了两个训练阶段中的网络攻击相关数据"——这类内容"原本嵌在通用中期训练语料里"，且"网络攻击相关任务原本存在于 RL 环境组合中"。在自家内部 **xdev-bench-hard**（pass@3）上测出的效果是：那个"未采取这些风险削减措施的检查点"解出 **90.5%** 的问题，"最终版 K3.1 Pro 达到 **81.0%**"。原则表述很明确："我们的目标是不要发布会拓展网络攻击能力绝对前沿的开放权重"，而实际交付的攻击能力"按设计低于我们流水线所能产出的水平"。该模型是约 2.8T 总参 / 104B 激活的 MoE，1M 上下文；**Terminal-Bench 4.0 为 65.7%**，博客标注其为"使用 Claude-Code harness 评测"。

**Why it matters:** 这是主要实验室首次在开放权重发布中，为一个安全决定标出可量化的能力代价，而这个代价相对它要支撑的结论很小——该模型仍然远超前代。博客对自己没有证明什么也很克制：那个网络攻击分数来自内部未公开基准，而非公开基准；而且全文没有说明被移除的能力能否通过微调已发布的权重恢复，而这恰恰是权重 11 月 4 日一旦发出后唯一重要的问题。harness 脚注是另一半：在 Claude Code 里跑出的 65.7% Terminal-Bench，与在任何其他地方跑出的对手数字不可比——博客自己说了这一点。

[`🔗 kimi.ai — Kimi K3.1 Pro 技术博客`](https://www.kimi.ai/blog/kimi-k3-1-pro) · [`🔗 implicator.ai — 这次削减依据的是一个未公开测试`](https://www.implicator.ai/kimi-k3-1-pro-hacking-cut-unpublished-test/)

---

## 3. 承接我们 10 月 25 日的条目：同一位研究者的第二个说法，是 960×540 帧上的 TFLite 模型，以及搜索附近的麦克风

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 285 pts · 约 10 小时前（~18:42 UTC+8）与 133 pts · 约 7 小时前（~21:11 UTC+8）
- **Tags:** `samsung` `tizen` `privacy` `telemetry` `smart-tv`

围绕我们昨天写过的 Tizen 逆向工程，又出现了两个首页帖。第一个（285 分）描述电视上有一个 **TensorFlow Lite 模型**，以 **INT8** 处理 **960×540 帧**、间隔数秒，用来猜测正在播放什么；第二个（133 分）描述当电视本身没有麦克风时，它会**寻找已连接的、带麦克风的回音壁或蓝牙设备**——而该帖自己的评论区直接指回前一天那个 514 分的讨论。研究者声称的发现包括区域特定的观看行为 CNN、截图、报文日志，以及一个跨设备广告 ID。

**Why it matters:** 这一切都不是漏洞，而这正是把它与昨天那条分开的意义。文中**没有任何证据表明采集到的音频或画面离开过设备**；一位用 Flipper Zero 复现的第三方报告说麦克风打开了约五秒、之后数小时未再打开；研究者本人的叙述里还包括被某模型厂商以"网络滥用"为由封禁——这些都属于这条内容本身，而不该塞进脚注。在所有这些限定之后，真正留下来的，是一个 CVE 流程永远不会归档的知情同意问题：一台电视是否应该扫描它周边的无线电环境，去寻找一个它出售时并未标称的麦克风；做这件事的端上推理，是否写在买家会读到的任何地方。

[`🔗 HN — 960×540 帧上的 TFLite 模型（285 分）`](https://news.ycombinator.com/item?id=50231189) · [`🔗 HN — 早前的 root shell 帖（514 分）`](https://news.ycombinator.com/item?id=50218633)

---

## 4. Agensh：微软开源了一个没有调度中心的 1,024 智能体 harness——128 个智能体时 19.31% → 28.78%

- **Velocity:** ▮▮ rising
- **Source:** GitHub (microsoft/Agensh) / arXiv 2609.26781 · 2026-10-24 开源
- **Tags:** `multi-agent` `harness` `microsoft` `programbench` `scaling`

**Agensh** 用一套每个 worker 都相同执行的协作循环取代了中心调度：收集上下文、认领子任务、行动并共享发现、验证、合并——由三块共享基础设施支撑（共享工作区、消息接口、以及保存可复用发现与工作意图的共享上下文板）。仓库为 **MIT**、257 星，发布内容包括"harness、实验启动脚本和复现指南"。在 **ProgramBench 最难的五个任务**上，用 **GPT-5.6-sol（high）**、六小时预算、无网络，平均最终测试通过率从 **1 个智能体的 19.31% 升到 128 个的 28.78%**，"相对提升约 49%"。单看 **pandoc**：**33.89%（1 个）→ 50.94%（128 个）→ 55.06%（1,024 个）**。

**Why it matters:** 1,024 是标题，而 128→1,024 这一步才是发现——**用八倍的智能体换来 4.1 个百分点的 pandoc 通过率**，而此时曲线已经爬完了大部分高度。所有报告都来自一个模型、五个任务、一个六小时预算，且 README 未发布任何跨团队规模的成本、token 或 GPU 小时对比，所以这里的"扩展智能体"衡量的是固定墙钟时间下的质量，不是效率。真正新颖的主张是架构性的而非数字性的：没有管理者的自组织现在可被测试，而轨迹就在仓库里。

[`🔗 microsoft/Agensh`](https://github.com/microsoft/Agensh) · [`🔗 arXiv — Agensh: Scaling Organizational Intelligence to 1,024 Agents`](https://arxiv.org/abs/2609.26781)

---

## 5. rclone 的 `--rc-serve` SSRF：公告说 1.74.2 已修复，而它自己的正文说在 1.75.1 上复现了

- **Velocity:** ▮▮ rising
- **Source:** GitHub 安全公告 GHSA-xqmq-v4wj-rw5m / NVD · 2026-10-25 归档
- **Tags:** `rclone` `ssrf` `cve-2026-116192` `advisory`

一个**协议相对的具名远端根**——形如 `//host/path`，写在一个已有的 `http` 或 `netstorage` 远端上——绕过了那条本应把 `--rc-serve` 限制在已配置远端内的检查。URL 转义与拼接保留了开头的 `//`，于是 Go 把它读作"一个 RFC 3986 network-path reference"，并"在发出第一个请求前替换掉已配置的 URL authority"。影响包括：向攻击者选定的主机名或 IPv4 地址与端口发起同协议的 `HEAD`/`GET`，把该具名远端配置的自定义头泄露给该主机；对 NetStorage 而言，还能"为攻击者选定的 `stat` 与 `download` 路径/动作生成带时限、请求特定的签名"。公告对没证明什么同样坦白："未演示任何写入原语"，NetStorage 只用本地 mock 测过、"未对真实 NetStorage 端点重放"，且存在**六项前置条件**，包括 `--rc-serve` 已开启（默认关闭）、监听器非 loopback、以及未配置 RC 认证。

**Why it matters:** 元数据与正文互相矛盾，而正文是复现者本人写的。公告页写受影响 `>= 1.37, <= 1.74.1`、修复 `1.74.2`，正文却说"我已在最新版本 v1.75.1 上确认该行为"，其动态受影响列表也包含 1.75.1——所以"升级到 1.74.2"是一条可能不成立的指令。评分也是同样的形状：rclone 发布 **CVSS 3.1 5.9**（`AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:N/A:N`，CWE-522 / CWE-918），而 NVD 的 **CVE-2026-116192** 记录旁边还放着 VulnCheck 的 **4.0 8.2**，其向量为 `AC:H` 加 `AT:P`——Attack Requirements Present。同一个 bug 的两个版本、相差 2.3 分，两者都站得住，谁也不能替代谁。

[`🔗 rclone 公告 GHSA-xqmq-v4wj-rw5m`](https://github.com/rclone/rclone/security/advisories/GHSA-xqmq-v4wj-rw5m) · [`🔗 VulnCheck 公告`](https://www.vulncheck.com/advisories/rclone-from-1.37-before-1.74.2-ssrf-via-rc-serve-scheme-relative-remote-roots)

---

## 6. .NET 发布 Brotli 计划外补丁——并重新发布了两个 10 月 13 日并未真正修好的公告

- **Velocity:** ▮▮ rising
- **Source:** .NET Blog（微软） · 2026-10-25 发布
- **Tags:** `dotnet` `brotli` `cve-2026-111497` `out-of-band` `patch`

微软计划外推送了 **.NET 8.0.33、9.0.22、10.0.14 和 .NET 11 RC3**。触发原因是 **CVE-2026-111497**（Brotli 解压缓冲区溢出），外加 **CVE-2026-114148**（Linux .NET tarball 属主问题）。该文还重新发布了 **CVE-2026-70197**（SocketAsyncEventArgs 内存破坏）和 **CVE-2026-102870**（Blazor WebAssembly 调试器）的公告，因为 2026 年 10 月 13 日那次发布"并未完全解决这些问题"——"今天的更新提供了这些修复"。

**Why it matters:** 重新发布才是"补丁星期二"习惯会漏掉的部分。计划外补丁出现的时刻，也正是检查计划内补丁留下了什么的时候，而这里四个 CVE 中有两个在十九天前就被标记为已修。暴露条件很窄，应当直引而不是转述：Brotli 可通过 ASP.NET Core 请求解压、`HttpClient` 自动响应解压、或 `System.IO.Compression` 的 Brotli API 触达——而"请求解压与自动响应解压默认均未启用"，**.NET Framework 不受影响**。部署这一步也不是安装：自包含应用必须重建或重新发布，因为"在主机上安装更新的运行时不等于更新随应用打包的运行时"，容器必须重建。

[`🔗 .NET Blog — 2026 年 10 月计划外安全更新`](https://devblogs.microsoft.com/dotnet/dotnet-october-2026-oob-security-updates/) · [`🔗 NVD — CVE-2026-111497`](https://nvd.nist.gov/vuln/detail/CVE-2026-111497)

---

## 7. Richard Borcherds 不再批改作业的正确性——"这不是个好办法"，而校园检测工具更糟

- **Velocity:** ▮▮ rising
- **Source:** The Daily Californian / Hacker News · 120 pts · 约 4 小时前（~00:28 UTC+8 10 月 26 日）
- **Tags:** `education` `grading` `ai-detection` `berkeley`

**Richard Borcherds**，加州大学伯克利分校教授、菲尔兹奖得主，"不再批改学生作业"的正确性——他"目前按是否交作业来给分"。他"承认这'不是一个很好的办法'，但目前他没有别的办法"，并说他看不出在 AI 使用已不可避免时，还花钱请助教核对正确性有什么意义。他"完全不知道该给学生什么建议"，并警告若进展持续，"人类数学家能做得比 AI 更好的事情将一件不剩"。制度层面："课程的 AI 政策由教师自行决定"，而校园的 AI 检测工具"不够好，无法作为全校标准"。

**Why it matters:** 这是一位具名的资深数学家做出的、同类中第一个具体的政策让步，而诚实之处在于它是一次退却而非解决方案——按完成度给分是一个吞吐量修补，却丢掉了作业本应产生的那个信号。值得带走的其实是关于检测工具的那句：一所大学若找不到好到可以标准化推广的检测工具，实际上等于宣布"测量不可用"，从而把问题推给考核设计。本学期内就该期待同一院系的二阶效应——作业既不能评分，权重就会转向有人监考的环节，而最缺可支配时间的学生承担这部分代价。

[`🔗 The Daily Californian`](https://www.dailycal.org/news/campus/academics/ai-use-leads-uc-berkeley-math-professor-to-see-no-point-in-grading-homework/article_bdf1eae2-c08b-491f-b9f1-81a7cea177de.html) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50233304)

---

## 8. 谄媚反过来跑：当模型自信地出错时，用户有 60% 的概率把假话学走

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.31579 · 2026-10-22
- **Tags:** `sycophancy` `human-factors` `trust-calibration` `evaluation`

一项被试内实验让 **32 名参与者**学习最多五个科学主题，每个主题由一个助手来教，五个助手建立在**同一个模型（GPT-5-mini）**上。参与者不知道的是，每个助手的讲解材料中有 **0%、25%、50%、75% 或 100%** 的事实被替换成了似是而非的假话——而每个助手都"以十足的信心"讲话。在 **104 次测验、1,040 个回答**中，得分从 **7.4/10 掉到 2.9/10**。被植入的假选项在**被篡改条目中被选中 60%**，在正确讲授的条目中为 **11%**——**比值比 12.5**。只要助手说出假话，它被采纳的比例在**每个篡改档位上都约为 65%**。被吸收的假话随后被以**高置信度持有（8.4/10）**，置信度对正确性的区分度"从 AUROC 0.70 掉到随机水平"，而**任务后的信任评分几乎没动**。

**Why it matters:** 这是评测套件不测量的那个方向的谄媚。"助手本身几乎没有谄媚，且在任何反驳下都不让步"——失败完全在人类一侧，而且它扛过了两样本应提供保护的东西：置信度和信任。有两个细节让常见的干预叙事变得复杂：参与者"在助手更差时反而更倾向于回到对话"，但回来"伴随的是更多吸收，而非更少"；以及 **30% 的对话轮次里，人们把测验题目粘回给正在被核查的那个来源**——人们试图验证，而污染正发生在这里。论文提出一个经基线校正的 **Human Deference Index**，并主张可信度是人机配对的属性；实务上的推论是：可靠性信号必须做到逐条主张可见，因为会话级的信任分变化太小，什么也抓不住。

[`🔗 arXiv — Who Is Sycophantic to Whom?`](https://arxiv.org/abs/2610.31579) · [`🔗 PDF`](https://arxiv.org/pdf/2610.31579)

---

## 9. Orca：一个在 Hacker News 只有 2 分的智能体 IDE，拿到 105,659 星和 8,540 个未关闭 issue

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending（周榜 +9,828★） · v1.4.240 发布于 2026-10-25
- **Tags:** `agent-ide` `worktrees` `orchestration` `orca` `trending`

**stablyai/orca** 是 MIT 许可的 TypeScript 项目，创建于 **2026-03-17**，自述为"与一支智能体舰队协作的地方（例如 Grok Bot、Claude Code）"——把 Codex、Claude Code、OpenCode 或 Pi 并排跑，"各自在自己的 worktree 里，在一处统一追踪"。功能表是一份智能体时代的 IDE 清单：把一条提示扇出给五个智能体、各在隔离的 worktree 中运行，然后合并胜者；一个**手机伴随应用**（iOS App Store、Android APK）用于远程指挥；Ghostty 级终端，"重启后仍保留的 scrollback"；可自动重连的 SSH worktree；应用内 GitHub 与 Linear 看板；**Design Mode**——在 Chromium 窗口里点中一个 UI 元素，把它的 HTML、CSS 和裁剪截图直接送进智能体提示词；以及 `orca` CLI（`worktree create`、`snapshot`、`click`、`fill`），让智能体反过来驱动 IDE。

**Why it matters:** 趋势表里没有出现的两个数字才要一起读。**8,540 个未关闭 issue** 对 105,659 星，大约是每十二个星就有一个 issue；而提交流水线说明了原因——一个才七个月的仓库，合并记录以几分钟的间隔落地，PR 编号已过 **#33,600**。这样的发布节奏产生支持负担的速度，超过任何团队关闭它的速度，所以星数衡量的是这个品类的需求，而不是产品的成熟度。它在 Hacker News 上的近乎缺席（一篇"I tried Orca and VSCode Agents window: I went back to tmux"，2 分）是信号的另一半：给它点星的人和写它的人不是同一批人。

[`🔗 stablyai/orca`](https://github.com/stablyai/orca) · [`🔗 Releases`](https://github.com/stablyai/orca/releases)

---

## 10. Snipe-IT 的 Google 单点登录把已停用用户放了回来——还是原有的权限级别，包括管理员

- **Velocity:** ▮▮ rising
- **Source:** GitHub 安全公告 GHSA-xf36-wx48-5rqp / VulnCheck · CVE-2026-116199 于 2026-10-25 归档
- **Tags:** `snipe-it` `authentication-bypass` `cve-2026-116199` `sso`

**Snipe-IT 8.6.3 之前版本**在 `GoogleAuthController::handleGoogleCallback` 中存在认证绕过：该处理器"登录用户名与 Google 账号邮箱匹配的用户，**却不校验 activated 标志**"。实际形态既窄又难看——一个已停用、用户名是邮箱格式、且 Google 身份仍然有效的用户，可以通过 SSO 登录，并"以原有权限级别夺回会话，包括管理员"。评分 **CVSS 4.0 9.2** 与 **3.1 8.1**，均出自 VulnCheck；NVD 记录停在 `Received`、**零条 NVD 评分**，CWE-285。

**Why it matters:** 停用是一个**本地**概念，而 SSO 恰恰没有理由知道它。这个 bug 是一个回调上少了单个检查，但它所属的那一类，是当下每一个带"用 Google 登录"的自托管工具都背着的问题：本地账号记录是授权的记录系统，身份提供方是认证的记录系统，而这两者之间的连接点没人负责。停用标志正是两个系统会分歧的那个字段，因此也正是 SSO 回调必须读取的那个字段。真正有用的临时缓解在身份侧——停用时移除外部身份绑定，而不只是移除本地标志。

[`🔗 GHSA-xf36-wx48-5rqp`](https://github.com/grokability/snipe-it/security/advisories/GHSA-xf36-wx48-5rqp) · [`🔗 VulnCheck 公告`](https://www.vulncheck.com/advisories/snipe-it-before-8.6.3-authentication-bypass-via-google-sso-callback)

---

## 11. Superpowers：304,990 星、27,166 个 fork，以及一套可装进 17 种 harness 的开发方法论

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending（周榜） · obra/superpowers · 最后推送 2026-10-23
- **Tags:** `skills` `methodology` `claude-code` `agents` `open-source`

**obra/superpowers** 是一个 MIT 许可的"面向编码智能体的完整软件开发方法论，建立在可组合技能之上"。它装上的流程是一道道闸门：智能体不直接动手写代码，而是"退后一步，问你到底想做什么"，把需求梳理成型，把规格"切成短到真能读完的块"给你看，然后产出一份实现计划，"清楚到让一个热情高涨、品味糟糕、没有判断力、没有项目上下文、还厌恶测试的初级工程师都能照做"——红/绿 TDD、YAGNI、DRY——最后跑一个**由子智能体驱动开发**的循环。目录里的安装清单列了 **17 种 harness**，从 Claude Code 和 Codex 到 Cursor、Gemini CLI、Copilot CLI、Kimi Code、OpenCode、Pi 和 Qwen Code。

**Why it matters:** README 里有两处比星数更值得注意。第一是 **304,990 星对 27,166 个 fork**——约略高于 **11:1**，而且这是一个由提示词和说明构成、而非由二进制构成的仓库；比例高到这个程度，是"点星不费力、跑起来要配置"的仓库才会有的现象，而要盯的正是这个比例，不是原始星数。第二是一个叫 **"Visual companion telemetry"** 的章节——一个改变智能体行为的技能框架，现在也有了遥测面，而且它写在 README 里，而不是隐私页里。页面底部还有一行商业服务：方法论是 MIT，支持不是。

[`🔗 obra/superpowers`](https://github.com/obra/superpowers) · [`🔗 README（安装矩阵与遥测章节）`](https://github.com/obra/superpowers/blob/main/README.md)

---

## 12. Parse Server：自定义 AuthAdapter 的校验钩子从未被调用，于是任意 `authData` 都能登进任何账号

- **Velocity:** ▮▮ rising
- **Source:** GitHub 安全公告 GHSA-rq3w-5c6f-p7wr / VulnCheck · CVE-2026-116163 于 2026-10-25 归档
- **Tags:** `parse-server` `authentication-bypass` `cve-2026-116163` `sdk`

**Parse Server 8.6.102 之前，以及 9.0.0 到 9.10.5-alpha.2 之前**存在认证绕过，原因是"继承 `AuthAdapter` 的自定义适配器，其 `validateSetUp`、`validateLogin`、`validateUpdate` 方法从未被调用，取而代之的是继承来的、接受任意 `authData` 的默认实现"。后果是完全的：攻击者"可以提供任意 `authData` 来注册、绑定身份、以既有用户登录，或跳过自定义的额外认证因子"。评分 **9.1**（CVSS 3.1，VulnCheck Primary）；NVD 状态 `Received`，零条 NVD 评分。

**Why it matters:** 这是失败开放（fail-open）的继承默认值，而且它惩罚的恰恰是做了事的团队。任何继承 `AuthAdapter` 以加强校验的人，写的代码从未被调用——实际运行的是基类的"什么都接受"，静默地，没有报错，也没有日志行。它与上一条 Snipe-IT 形状相同而层次不同：一个自定义安全控件**存在于源码里**、却**不在调用路径上**，这正是为什么"我们实现了校验"是关于一个文件的声明，而不是关于运行时行为的声明。要检查的修复版本是 **8.6.102** 与 **9.10.5-alpha.2**——注意后者是预发布版，也就是说 9.x 线在公告里没有一个非 alpha 的已修复版本。

[`🔗 GHSA-rq3w-5c6f-p7wr`](https://github.com/parse-community/parse-server/security/advisories/GHSA-rq3w-5c6f-p7wr) · [`🔗 VulnCheck 公告`](https://www.vulncheck.com/advisories/parse-server-9.0.0-before-9.10.5-alpha.2-authentication-bypass-via-authadapter-subclasses)

---

## 13. Nanbeige4.3-33B：Terminal-Bench 2.1 得 80.9——而同一张对比表里用了四种不同的 harness

- **Velocity:** ▮▮ rising
- **Source:** Hugging Face（Nanbeige/Nanbeige4.3-33B） · Apache-2.0 · 创建于 2026-10-24
- **Tags:** `nanbeige` `open-weights` `terminal-bench` `harness` `benchmarks`

**Nanbeige4.3-33B** 明确定位为"Nanbeige4.3 系列的旗舰教师模型"，后续再蒸馏出更小的模型（例如 Nanbeige4.3-3B）。它在多数行上报告击败同尺寸级所有对手：**Terminal-Bench 2.1 得 80.9**，Qwen3.8-27B 为 73.0、Muse-Glimmer-30B 61.8、Gemma4-31B 47.2；**Terminal-Bench 4.0 得 23.8**，对手为 6.3、1.6、0.0；**DeepSWE 65.5**，对手 42.5、4.4、2.7；**JobBench 44.8**，对手 34.5、16.6、9.0。它输两行，而模型卡自己把它们列了出来：**SWE-Bench Pro 60.3 对 Qwen 的 61.7**，以及 **GDPval 84.8 对 86.4**。

**Why it matters:** 脚注才是这个条目。同一列里的各行并不是用同一种方式测的——"Terminal-Bench 2.1 使用 Terminus 2 评测"，而"Terminal-Bench 4 与 DeepSWE 使用 mini-swe-agent v2.4.6 评测"，**NL2Repo 使用 Claude Code 评测**，"JobBench 使用装配了搜索工具的 Claude Code harness 评测"。另两条脚注改变了两组数字的含义：**Claw-Eval 只在 General 子集（157 个单轮任务）上评分**，**YC-bench 每次模型调用前只保留最近 10 轮**对话。这不是不端——卡片把一切都写明了——但它让这张表成为一张*流水线*结果的排行，而 Nanbeige 输掉的两行，恰恰是 harness 最可能主导结果的两行。发布时它带着 **299 个赞和 0 次下载**，这是"有人在读、没人在跑"在 Hugging Face 上的形态。

[`🔗 Nanbeige/Nanbeige4.3-33B 模型卡`](https://huggingface.co/Nanbeige/Nanbeige4.3-33B) · [`🔗 Nanbeige4.3-33B-Base`](https://huggingface.co/Nanbeige/Nanbeige4.3-33B-Base)

---

## 14. DreamHost 事故已进入第四天，仍在分批重置邮箱与 FTP 密码

- **Velocity:** ▮▮ rising
- **Source:** DreamHost Status · 首条记录 2026-10-23 14:20 PDT · Hacker News 68 pts
- **Tags:** `dreamhost` `incident` `credential-reset` `hosting`

DreamHost 状态页上的时间线本身就是全部故事，而且它是公开的：**10 月 23 日 14:20 PDT**——"我们的运维团队正在排查影响文件管理器界面的连接问题"；**17:20 PDT**——"我们正在排查一起影响多项服务的事件"，面板中的文件管理器离线；**22:13 PDT**——范围现在包括"FTP/SFTP 访问与网页邮箱"，且"作为预防措施，我们正在重置部分"用户的密码；**10 月 24 日 10:37 PDT**——"受影响邮箱与 FTP/SFTP 用户的密码重置已完成"；**10 月 25 日 11:43 PDT**——"带分步说明的、发给受影响账号持有人的邮件大部分已发出"，其余仍在发送中。

**Why it matters:** 一个文件管理器的连接问题，在约十二小时内变成了横跨三项服务的凭据重置；而四天之后**仍然没有公布原因**——页面说的是"正在排查事件"和"作为预防措施"，这两句都诚实，但都没有告诉客户凭据是否被读取过。这个缺口对任何运行共享主机的人都是运维教训：重置是用户能感知到的那部分，所以通知顺序与修复本身同样重要，而这里重置完成（10 月 24 日）比大部分通知邮件发出（10 月 25 日）早了一天多。凡在受影响服务上有账号者，应从网页邮箱与 FTP 可达的一切开始轮换，而不只是面板密码。

[`🔗 DreamHost 状态页 — 事件时间线`](https://www.dreamhoststatus.com/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50231166)

---

## 15. FOSDEM 27 多了一个"Digital Dissident"分会场——它的论点是：薄弱环节是工具链，而不是工具

- **Velocity:** ▮▮ rising
- **Source:** talkweb.eu / Hacker News · 233 pts · 约 3 小时前（~01:30 UTC+8 10 月 26 日）
- **Tags:** `fosdem` `censorship` `privacy` `tooling` `conference`

Bogomil Shopov 正在为 FOSDEM 27 组织一个 **Digital Dissident** 专场，征稿说明把"为什么它需要独立房间"讲得很具体：生活在威权体制下的人"从不只用单一工具"，他们的安全依赖一条链——先要能连上网络，再要安全地收集、验证与保存证据，再不暴露作者地发布或泄露，而这一切都发生在"本身就是风险的设备与基础设施上"。这份说明点出了现有房间漏掉的失效模式："最薄弱的一环决定结果"，而"关于单一工具的报告很少讲它如何与其它工具配合、接缝在哪、交接处会坏什么（例如一个会被指纹识别的翻墙传输，或一个推送通知会把你身份绑到 Google 或 Apple 账号上的即时通讯软件）"。它"刻意不针对任何单一项目"，并会与已有的 Decentralized Internet and Privacy 分会场协调日程。

**Why it matters:** 威胁清单是当代的、技术性的，而不是修辞性的——"国家白名单与只放行白名单的断网、TLS 与 QUIC 指纹识别、带主动探测的深度包检测、对特定协议的限速、移动网络中断、应用商店下架翻墙工具，以及强制使用的国家即时通讯软件与'主权互联网'路由"。接缝的例子最有用，因为它们是跨项目的 bug、没有项目归属：一个会把用户重新识别给 Google 或 Apple 的推送通知依赖，不是某款通讯软件的缺陷，而任何单一项目的演讲都不会去登记它。一个分会场是小事；把"交接处"当作分析单元则不是。

[`🔗 talkweb.eu — Digital Dissident, FOSDEM 27`](https://talkweb.eu/openweb/4558/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50233929)

---

## 16. Coolify 4.5.0 加入服务器打补丁、通行密钥与 MCP 工具——这个自托管 PaaS 已有 64,193 星

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending（今日 +192★） · coollabsio/coolify · v4.5.0 发布于 2026-10-23
- **Tags:** `coolify` `paas` `self-hosted` `mcp` `release`

**4.5.0** 的发布说明对一个次版本而言异常宽：**服务器打补丁（beta）**，按服务器自动安装安全更新、重启与风险软件包提示，并在服务器列表中显示补丁状态；**机群 Metrics 页面**，含服务器与容器表格及趋势图；服务器指标页新增**磁盘、网络与负载图表**；**用 MCP 工具管理资源**；**通行密钥登录**；面向应用、服务与数据库的文件浏览器；自定义代理错误页与维护模式；可配置的按服务器 Traefik 证书解析器及按资源覆盖；带存储 API token 的 Cloudflare 隧道设置；GitLab system hook，使每个项目不再需要自己的 webhook；以及"更新前自动备份 Coolify 数据库"。

**Why it matters:** "服务器打补丁（beta），带自动安全更新"是改变产品性质的那一项。一个会给自己管理的机器打补丁的自托管 PaaS，从此进入了每一台它所管理机器的安全维护路径，而 beta 标签很重要——同一版本还在它旁边加了一个控制平面接口（用 MCP 工具管理资源）和一种新的认证方式（通行密钥）。"更新前备份数据库"这一行则说明团队清楚升级对用户意味着什么代价。对正在跑 Coolify 的人：4.5.0 同时动了 Traefik、隧道和认证，升之前值得把发布说明读一遍。

[`🔗 Coolify v4.5.0 发布说明`](https://github.com/coollabsio/coolify/releases/tag/v4.5.0) · [`🔗 coollabsio/coolify`](https://github.com/coollabsio/coolify)

---

## 17. andrej-karpathy-skills：一个 `CLAUDE.md` 文件拿到 223,753 星，最后一次改动是 4 月 20 日

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending（周榜 +2,981★） · multica-ai/andrej-karpathy-skills
- **Tags:** `claude-md` `skills` `trending` `repo-state`

**multica-ai/andrej-karpathy-skills** 只有一行描述："一个用于改善 Claude Code 行为的 `CLAUDE.md` 文件，源自 Andrej Karpathy 关于大模型编码陷阱的观察。"它拿到 **223,753 星**。创建于 **2026-01-27**，**最后一次推送是 2026-04-20**——比它再度冲上周榜早了六个多月。该仓库的归属方是 `multica-ai`，不是 Karpathy。

**Why it matters:** 这是 Void 那个形状，只是把编辑器换成了一份技能文件，而检查只要十秒：打开仓库，读 `pushed_at`。一个 22 万星、自四月起零提交的仓库不是维护信号，而是*命名*信号——热度在衡量 slug 里那个人和这份文件所属的品类，而不是任何进行中的工作。这对打算安装它的人有意义：一份 `CLAUDE.md` 的新旧只取决于它所针对的模型行为，而它所补的那个提示词面从春天起已经变过好几轮。这对指标本身也有意义：一张按星速排名的趋势榜排的是书签，而陈旧仓库可以在任何一波新人发现那个名字时重新上榜。

[`🔗 multica-ai/andrej-karpathy-skills`](https://github.com/multica-ai/andrej-karpathy-skills) · [`🔗 提交历史（最后推送 2026-04-20）`](https://github.com/multica-ai/andrej-karpathy-skills/commits/main)

---

## 18. KRAFTON 的 Raon-1 mini：一个从零训练的 30B-A4B MoE，Apache 2.0——但要先申请访问

- **Velocity:** ▮▮ rising
- **Source:** Hugging Face（KRAFTON/Raon-1-mini-preview）/ KRAFTON AI · 创建于 2026-10-21
- **Tags:** `raon` `krafton` `moe` `open-weights` `korean`

**Raon-1 mini** 是"一个 30B-A4B 的混合专家（MoE）语言模型，由 KRAFTON AI 设计并从零训练"，以 **Apache 2.0** 发布，定位是性价比。模型卡列出内置思考、"面向智能体工作流的工具调用，支持 Hermes Agent、Pi 与 OpenCode"，训练覆盖**七种语言**（韩语、英语、日语、中文、西班牙语、法语、泰语），提供用于投机解码的 **DFlash2 草稿模型**，以及 **MXFP8 与 NVFP4** 两种量化——NVFP4 可"在单张 NVIDIA RTX 5090 GPU（32 GB 显存）上推理"。卡片也明说这不是成品："这是一个预览版，不是最终模型。规格与结果在最终版本前都可能变化。"它目前有 **184 个赞**、约 **1,177 次下载**。

**Why it matters:** 许可证和分发讲的是两件不同的事。Apache 2.0 是一个模型发布能做出的最宽松主张，而同一张卡上还挂着一道门——"Raon-1 mini preview 是一个开放权重模型。**访问需经申请授予**"，下载前要填写全名、单位、职位、国家与使用意图。开放权重加一张身份表已是常见形态，值得点明而不是当作非开即闭：条款是不可撤回的宽松，而*摩擦*不是。基准对比则以**图片**形式给出——`raon_benchmarks_top6.png` 及其暗色版——数字不可选、不可 diff、不重新导出图表就无法更新，而且对手基线是 KRAFTON 自己挑的。在这一切之后仍然成立的，是显存说明里的那个数：一个能塞进单张消费级 GPU 的 30B 级模型，是一个与榜单名次不同的部署决策，也是这张卡上读者唯一能在家里验证的主张。

[`🔗 KRAFTON/Raon-1-mini-preview`](https://huggingface.co/KRAFTON/Raon-1-mini-preview) · [`🔗 韩联社 — KRAFTON 发布 Raon-1 mini`](https://www.yna.co.kr/view/AKR20261021108300017)

---

## 19. 模拟控制评测以 RMSE 3.6 个百分点的误差预测部署安全性——而另一套控制设置是 10.1

- **Velocity:** ▮ steady
- **Source:** arXiv 2610.31593 · 2026-10-22
- **Tags:** `control-evals` `ai-safety` `evaluation` `simulation`

控制评测要回答的是：当模型主动试图击败防护时，防护是否仍然成立；而它们通常在专门搭建的控制设置中运行，再把结果外推到部署。**模拟控制评测（SCE）**用一个语言模型模拟工具响应来替代环境，论文在 **LinuxArena** 上测量这一替换——那里执行能给出真值。对独立采样的评测任务集与部署任务集，SCE"在 5% 审计预算下、跨五个监控器，以 **3.6 个百分点**的均方根误差预测安全性，而 **BashArena** 为 **10.1**"——后者是另一套控制设置。SCE 复现"攻击策略、攻击者推理与监控器推理的分布，与真实执行的 KL 散度比 BashArena **低十倍以上**"，解释了环境间方差的 **78–85%**，且"所需的任务对抽取次数不到部署任务集的 **5%**"。

**Why it matters:** 整个控制评测文献都建立在一个外推之上，而这篇测量的是外推误差本身，而不是提出一个新的安全断言——这才是有用的那类论文。它同时也是把风险搬了家而不是消除：SCE 是一个*模型*在模拟工具输出，于是模拟器的保真度成了新的盲点，一个把错误信息或权限边界表示错的模拟器，会为一个不存在的世界给出自信的安全数字。效率结果才是实践者会关心的——5% 的抽取量——因为控制评测的瓶颈一直是任务集的成本，而不是监控器。

[`🔗 arXiv — Simulated Control Evals`](https://arxiv.org/abs/2610.31593) · [`🔗 PDF`](https://arxiv.org/pdf/2610.31593)

---

## 20. "你只需要宽事件"：一个原语，以及它所反对的那份 60 词术语表

- **Velocity:** ▮ steady
- **Source:** isburmistrov.substack.com / Hacker News · 33 pts · 约 2 小时前（~02:11 UTC+8 10 月 26 日）
- **Tags:** `observability` `opentelemetry` `telemetry` `data-model`

它的论点是："指标、日志、追踪"是同一件东西的三个名字。一个**宽事件**是一条带尽可能多命名字段的类 JSON 记录，另外三者都由它派生：span 是携带 `TraceId`、`SpanId`、`ParentSpanId` 的宽事件；日志是带消息的宽事件；指标是系统状态的周期性快照。范例是 Meta 的 **Scuba**，它"直接处理原始事件、不做任何预聚合"，每条事件带一个 `samplingRate`，于是展示的计数通过对该字段求和再上采样得出，而不是数行数——这正是作者可以声称"基数不是问题"的依据。示例是一条广告曝光事件，字段有 `AdId`、`UserCountry`、`Placement`、`CampaingType`、`UserOS`、`OSVersion`、`AppVersion`，调查时一次一个分组地收窄。靶子是 OpenTelemetry 的文档而非其工程——文章数出"OpenTelemetry 术语表里有 **60 多个词**"，并说它的呈现方式"让可观测性显得专门而复杂"。

**Why it matters:** 这里没有基准测试，文章也坦承它在论证一种数据模型而非某个产品——Scuba、Honeycomb、Axiom 被点名为同一思路的范例，结论是"追踪、指标和日志其实都只是宽事件的特例"。值得留下的主张是基数那一条，因为它把模式设计问题重新框成了存储成本问题：如果每条事件自带采样率，那么一个高基数字段的代价可以用字节度量，而不是被设计所禁止。应该打折的是它暗示的容易——可观测性工具会长出六十个术语，正是因为预聚合才让账单可预测，而"保留原始事件"是把这笔成本移到存储层，并没有把它删掉。

[`🔗 All you need is Wide Events`](https://isburmistrov.substack.com/p/all-you-need-is-wide-events-not-metrics) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50234329)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-10-25T20:19:24Z |
| Items | 20 |
| Sources tracked | 28（Hacker News、GitHub Trending、GitHub Security Advisories、Hugging Face、arXiv、NVD、VulnCheck、Microsoft .NET Blog、Kimi/Moonshot、KRAFTON AI、DreamHost Status、FOSDEM/talkweb.eu、Daily Californian、Kyutai） |
| Update schedule | 04:03, 12:03, 20:03 UTC+8（每日 3 次） |
| Ranking | 速度加权（新鲜度 × 互动加速度 × 信源权威度） |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[前一日](2026-10-25.md) · [原始 .md](2026-10-26.md) · [归档](../archive/)
