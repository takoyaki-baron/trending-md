---
date: 2026-10-29
updated: 2026-10-28T20:20:56Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 26
license: CC-BY-4.0
---

# 今日趋势 — 2026-10-29

## 1. Apple 的 macOS 所带的 git、curl 和 python3 仍然信任被攻破的 eMudhra 根证书——而 macOS 27.2 把手工修复撤销了

- **Velocity:** ▮▮▮ trending
- **Source:** we-have-a-problem.com / Hacker News · 905 pts · 约 9 小时前（~19:03 UTC+8 10 月 28 日）
- **Tags:** `emudhra` `macos` `ca-compromise` `trust-store` `git`

eMudhra 事件跟踪页在 **10 月 28 日**更新了一条专门指向 Apple 的发现："截至 10 月 28 日，Apple 随 macOS 发布的开发者工具"——内置的 **git**、**curl** 和 **python3**——仍然信任被攻破的中间证书。Apple 在 **10 月 17 日**就被通知了此事；Chrome 与 Firefox 当天即封锁了这些证书，微软平台在 **20 日**，Apple 产品在 **22 日**。**10 月 26 日发布的 macOS 27.2 并没有修复该问题，还撤销了**用户手工施加的临时修复。

**Why it matters:** HN 讨论里最有力的反驳恰恰是正确的更正，而它应该写进正文而不是压在下面——**git 不是那个 bug**。git 对着系统证书库做校验，这正是它该做的事；bug 在证书库，而 macOS 有**两个**互相不一致的库（`/etc/ssl/cert.pem` 与 Keychain）。本机实测（macOS 15.5），而这两个库**装的不是同一批东西**：`SystemRootCertificates.keychain` 有 **154** 个根、其中 eMudhra **2** 个（`G1`、`G3`），而 `/etc/ssl/cert.pem` 有 **128** 个、其中 **4** 个（`C1`、`C3`、`G1`、`G3`）——`C1` 与 `C3` **只**锚定在文件里，那正是 OpenSSL/libcurl 后端读的信任包。（复现时有两个坑：裸跑 `security find-certificate -c "emSign ECC Root CA - G3"` 什么也查不到，因为它的默认搜索列表不含系统根，必须显式传入 keychain 路径；而 `grep -c emSign /etc/ssl/cert.pem` 得到 **8**，那是 8 **行**——每张证书都以 subject 和 issuer 各写一次自己的名字——证书其实是 4 张。）这比"证书包过期"更糟的原因在于 git 流量就是**源代码**：事件页自己的影响描述是持有私钥的攻击者"可以冒充任何网站或服务"，并给出自查命令 `git ls-remote https://git-emudhra.we-have-a-problem.com/check.git`——"证书报错意味着你的 git 是受保护的"。同一页面还把 Electron 应用（Slack、Discord）列为只有重新构建在已修复的 Electron 上才能拿到修复，所以受影响的客户端类别是**已发布并冻结的二进制**，而不是浏览器。复现前请先 `which -a curl`：那条讨论线程里，同一台机器上的 Homebrew curl 与 `/usr/bin/curl` 给出了相反的答案。

[`🔗 eMudhra 事件——Apple 后续（10 月 28 日）`](https://emudhra.we-have-a-problem.com/apple.html) · [`🔗 eMudhra 事件索引（已修复产品表、时间线）`](https://emudhra.we-have-a-problem.com/) · [`🔗 HN 讨论（905 pts）`](https://news.ycombinator.com/item?id=50271640)

---

## 2. Gemini 4 Carbon 登顶智能指数第一，却把网络安全基准只交给防御方——且不公布上下文窗口

- **Velocity:** ▮▮▮ trending
- **Source:** Google 官方博客 / Hacker News · 537 pts · 约 3 小时前（~01:01 UTC+8 10 月 29 日）
- **Tags:** `google` `gemini` `cybersecurity` `frontier-model` `restricted-release`

**Gemini 4 Carbon** 是 Google 的下一代前沿模型，明确面向"最先进的网络安全与长程能力"——距 **Gemini 4 Argon** 发布仅两周。数字是：**Artificial Analysis 智能指数 v5.0 第一名，59 分**，**SEC-bench Pro 88.2%**（发现漏洞）、**ExploitGym 54.8%**（利用）、**Collinear 的 CWE-bench 71.0%**（打补丁），以及在 **WebDev Arena 上涨 89 分至第 4 名（1768）**。放量极其克制："本周起，我们将把 Carbon 提供给一部分网络防御人员"，随后通过 **Fairwind 计划**给受信伙伴，面向开发者与消费者的"尽快"没有任何日期。价格维持 Argon 的尝鲜价 **每百万输入/输出 token 2 美元 / 10 美元**，缓存输入按输入价九五折，之后恢复到 **4 美元 / 20 美元**。

**Why it matters:** 先读标题后面的那个括号。Google 把这三项网络安全基准标注为"**（在无护栏条件下评测）**"——也就是说，88.2 与 54.8 描述的是一个**把安全层关掉**的模型，而它被交付给的却是一群**保持开启**的人。其余论据建立在内部与伙伴结果之上，比较对象不具名：Chrome 团队那句"在生成高质量补丁上比另一家实验室的大型前沿模型好 10 倍以上"，既没说哪家实验室，也没说哪个模型；Wiz 的 Web 渗透测试结果是伙伴观察。有两个数字异常具体、值得采信：**Terminal-Bench 4.0 的作弊成功率被压到 0.0%**、作弊尝试降到 0.4%，以及 **Gray Swan 间接提示注入基准 0.0%**（Argon 为 0.7%）——后者对一个即将被指向敌意输入的模型来说才是关键。而"缺失"本身是线索：全文**没有参数量、没有上下文窗口、没有命名变体**，这正是"一次模型发布"与"一次能力宣告"的区别。

[`🔗 Google——Gemini 4 Carbon 发布`](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-carbon/) · [`🔗 HN 讨论（537 pts）`](https://news.ycombinator.com/item?id=50276792)

---

## 3. Atria Dawn 以 MIT 许可放出完整 744B 权重、512K 上下文——却在两项基准上输给了自己的预览版

- **Velocity:** ▮▮ rising
- **Source:** Hugging Face / 上海人工智能实验室 · 模型 2026-10-23 推送 · arXiv 2609.15818
- **Tags:** `shanghai-ai-lab` `moe` `open-weights` `agentic` `mit`

**Atria Dawn** 是上海人工智能实验室智能体模型的完整版，在 **744B 参数的 MoE GLM-5.2** 底座上后训练，**MIT** 许可，上下文窗口是九月预览版承诺的 **512K**（预览版为 256K）。权重是真的在那儿——`internlm/Atria-Dawn` 没有门禁，含 **353 个 safetensors 分片**外加 FP8 版本；模型卡同时给出 OpenAI 兼容与 Anthropic 兼容两种接入端的配置，以及 SGLang `v0.5.13.post1+` 与 vLLM `v0.23.0+`。只接受文本输入：卡片里写明了 Codex 需要的那个绕法（`"input_modalities": ["text"]`），因为 Codex 默认会给每个模型附图，而该端点会返回 `400 Atria-Dawn is not a multimodal model`。

**Why it matters:** 那张 24 行的基准表比它的标题诚实。Atria Dawn 在自己挑选的比较集上领先的是智能体与工具类行：**CyberGym 86.8**、**SkillsBench 67.8**、**WideSearch 84.6**、**BFCL V4 78.4**、**Harvey LAB 27.5**（Opus 5 为 22.7）；而在软件交付类上大幅落后：**SWE-bench Pro 61.7 对 Opus 5 的 76.5**、**NL2Repo-Bench 50.0 对 79.9**、**Harbor-Index 17.3 对 41.0**、**Terminal-Bench 2.1 的 81.0 对 90.2**。没有哪个发布会写进去的那个细节是：**预览版在 24 行里赢下两行**，BrowseComp **92.5 对 91.3**、NL2Repo-Bench **51.4 对 50.0**——也就是说完整版的后训练用一部分搜索与仓库能力，换来了它拿到的那几个智能体分数。这是一个真实取舍，而且被公开而不是被藏起来，也正因如此，"新的更强"是这张表的错误读法。

[`🔗 internlm/Atria-Dawn（权重 + 完整评测表）`](https://huggingface.co/internlm/Atria-Dawn) · [`🔗 Atria Dawn 论文（arXiv 2609.15818）`](https://arxiv.org/abs/2609.15818) · [`🔗 atria-asi.ai`](https://atria-asi.ai/)

---

## 4. GitHub Copilot Fusion 在编程智能体指数拿到 60，距 Opus 5.5 Max 只差两分——却从不说明它路由给哪些模型

- **Velocity:** ▮▮ rising
- **Source:** GitHub Changelog / GitHub Universe 2026 · 发布于 2026-10-28T18:20Z
- **Tags:** `github` `copilot` `model-routing` `agent-harness` `cost`

**Copilot Fusion** 已正式可用：你不再挑模型，而是挑一个**系统**，再挑一个**力度档位**——**Standard**、**High**、**Max**。底下有三种编排形态：**Single**（"一个模型直接解题"）、**Cascade**（"一个高效模型先起草"，再由一次检查决定接受还是升级给更强的模型）、**Critique**（"一个模型起草，另一个模型审阅，原模型再修订"）。GitHub 报告 **Fusion Max 在 Artificial Analysis 编程智能体指数上得 60 分**，"距 Claude Code 配 Opus 5.5 Max 只有两分"，代价是"每个任务的平均 API 成本约为一半"、"token 用量约为一半"、"每任务耗时约少 40%"。所有 Copilot 套餐可用，覆盖 VS Code、Copilot app、Copilot CLI 与 JetBrains IDE；按所用模型的标准价计费，另有临时 **30% 折扣**。

**Why it matters:** 这篇公告里最有分量的段落不是成本而是**控制权**——"Copilot Fusion 只使用企业及组织模型策略中已启用的模型"，管理员可以"只对 Fusion 停用某个模型，而不对所有人停用"。这是一层为满足采购策略而建的路由，也是任何成本优化型路由要活在企业里必须长成的样子。两处缺口要记住：**公告没有点名 Fusion 池里的任何模型**——"Claude Code 配 Opus 5.5 Max"只是基准对照，不是已披露的组件——所以"60 分、差两分"是一个无法靠拆解验证的断言。而且这个汇总值掩盖了分化：按 VentureBeat 对分项基准的解读，Fusion 在 Terminal-Bench 4.0 上以 **71** 领先，在 FrontierCode 上以 **51 对 56** 落后，所以"一半成本换接近持平"是分布上的平均，不是每个任务的保证。

[`🔗 GitHub Changelog——用 Copilot Fusion 路由与编排模型`](https://github.blog/changelog/2026-10-28-route-and-orchestrate-models-with-github-copilot-fusion/) · [`🔗 VentureBeat——成本与分项基准的分化`](https://venturebeat.com/orchestration/github-copilot-fusion-mixes-models-to-achieve-near-opus-5-5-coding-performance-at-half-the-per-task-cost)

---

## 5. So-net 泄露 2,585,481 条记录——其中 54,401 条连密码一起

- **Velocity:** ▮▮ rising
- **Source:** So-net 官方公告 / Help Net Security · 2026-10-27 披露
- **Tags:** `breach` `sony` `japan` `isp` `credentials`

索尼网络通信披露 **So-net** 会员数据库遭未授权访问：合计 **2,585,481** 条记录，分为 So-net **2,141,986** 条（1,869,771 名现会员，加上 272,215 名 2026 年 3 月及以后退会者）与 **plala** S Course 的 **443,495** 条。字段是身份而非财务——姓名、电话、邮箱、用户 ID、出生日期、性别、网络连接 ID——但有一片更糟：**54,401** 个地址的攻击者同时拿到了**邮箱地址与密码**，横跨四项邮件服务，已于 **10 月 27 日**全部重置。同时泄露的还有 **16** 条银行账户记录（银行、支行、账户类型、账号、户名）以及七份密码重置通知的数据。会员密码、信用卡数据、PIN 均未泄露；NURO 与 So-net 其他服务不受影响。

**Why it matters:** 时间线是这里的关键，它跑了五天。**10 月 19 日**被入侵，**23 日**确认，**24 日**确认数据外泄，**27 日**公开通报——而密码是在通报发出的同一天重置的，意味着用户没有任何先行更换的窗口。原因仍写着"正在调查"，所以真正的爆炸半径不是 2.58M 这个标题数字，而是每一个用过这 54,401 个邮箱与密码的下游账号。范围声明在另一个方向上也罕见地精确："2026 年 2 月底之前已解约的客户不受影响"——这句话既是泄露说明，也是一份数据留存声明，它精确告诉你这家运营商会为已经离开的人留档多久。

[`🔗 So-net——官方公告（2026-10-27）`](https://www.so-net.ne.jp/info/2026/20261027_0001.html) · [`🔗 Help Net Security——按服务拆分`](https://www.helpnetsecurity.com/2026/10/28/sony-network-communications-data-breach-so-net/)

---

## 6. Warp 的供应商被攻破，被拿走的是智能体决策日志——供应商未具名、无 CVE、范围只有"约 1%"

- **Velocity:** ▮▮ rising
- **Source:** Warp（经 CEO Zach Lloyd）/ BleepingComputer · 2026-10-27T12:15Z 披露
- **Tags:** `breach` `supply-chain` `agent-traces` `warp` `telemetry`

Warp——那个从 AI 终端变成"智能体开发环境"的产品——披露攻击者利用了其基础设施中一个**未具名的第三方供应商**，触及了**智能体决策日志与遥测数据**。CEO **Zach Lloyd** 说 Warp 在周五得知该供应商遭到"一次活跃且窄带的利用"，"我们在数小时内发现并完成了修复与缓解"，并估计**约 1% 的 Warp 用户**可能受影响。已请 **CrowdStrike** 介入并通知执法部门。

**Why it matters:** 数据的**类别**才是故事，而这个类别整个行业还没有词去描述。智能体决策日志不是聊天记录——它是"智能体选了哪个工具、读了什么、跑了什么、为什么"的记录，合起来就是对用户的仓库、shell 历史里的凭据以及内网端点的一次重建。另一个相关点：这距 OpenCode 的供应商 API key 泄露仅十天（本站 10 月 22 日已报道），而两起都发生在**供应商侧**而非模型侧——智能体工具链的集中风险在遥测管线，不在推理端点。Warp **没有**说的部分才要等：暴露数据是否包含源代码、提示词、凭据或账户信息，是哪家供应商，漏洞是什么。没有公布分母的"约 1%"是估计，不是计数。凡是 Warp 智能体会话碰过的凭据都该轮换；在事故报告出现之前，"窄带"只能当作公司自己的说法。

[`🔗 BleepingComputer——Warp 披露泄露事件`](https://www.bleepingcomputer.com/news/security/warp-discloses-breach-exposing-ai-agent-logs-user-telemetry-data/) · [`🔗 云安全联盟——智能体轨迹正成为"王冠珠宝"数据`](https://labs.cloudsecurityalliance.org/research/csa-research-note-agentic-dev-tool-telemetry-breach-warp-202/)

---

## 7. Nemotron 3.5 Transcribe 把四个语音任务放进一个开放检查点——而它的三个「体积」是三个不同的对象

- **Velocity:** ▮ steady
- **Source:** NVIDIA / Hugging Face 博客 · 约 5 小时前（~23:17 UTC+8 10 月 28 日）
- **Tags:** `nvidia` `asr` `open-weights` `diarization` `multilingual`

**Nemotron 3.5 Transcribe** 是一个单一开放权重检查点，同时做转写、说话人归属、翻译与音频问答，处理"最长一小时"的录音、标注"最多八位说话人"。各任务覆盖差异很大，而博客直说了：它**转写 40 种语言**、"把其中 31 种与英语互译"、"在 13 种语言里做说话人归属"。分数是：Hugging Face Open ASR 英文 **5.33% 平均 WER**，开放权重模型中第一；**七种语言平均 4.62% WER**；**长音频 10.98%**；Artificial Analysis **AA-WER 2.8%**，与并列第一；**AA-AgentTalk 1.8%**，次优开放权重模型为 2.3%。说话人分离在 David AI 21 语言赛道上拿到 **18.26% DER**——"14 个受测系统中最低的分离错误率"，NVIDIA 自家的 Nemotron 3 Diarization 为 18.38%。

**Why it matters:** 这篇博客里有两件事比 WER 表更值钱。第一，体积被说了三种说法，而**三种都对**——这才是容易被误读的地方：仓库名是 `…-30B-A4B`，模型卡自己的 Model Summary 写"Total Parameters **34B (4.3B active), including the audio encoder**"，而 safetensors 索引合计 **33,697,781,029**——所以 30B 是语言主干，34B 是整个检查点，4.3B 是激活集，把三者对上号的那句话就在同一页上（已在 `nvidia/NVIDIA-Nemotron-3.5-Transcribe-30B-A4B` 上第一手核实）。做容量规划时按检查点算，而那正是模型卡已经给出的数字。第二，局限具体到可执行："**Transcribe 面向录制音频，不是实时流**"，音频问答只在英文上训练，指南建议"对照录音抽查人名、说话人切换与答案"。随后的医疗案例展示了微调的诚实版本：留出说话人的 WER **22.44% → 12.17%**，相对降幅 "45.8%"，而 LibriSpeech test-clean **从 1.54% 退化到 1.69%**——也就是说，领域微调买来一个领域，代价是一点通用精度，而且是量出来的而非声称的。

[`🔗 NVIDIA——Nemotron 3.5 Transcribe（HF 博客）`](https://huggingface.co/blog/nvidia/nemotron-transcribe-granary) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50275128)

---

## 8. 五月公布的一个 Linux 内核漏洞昨天才进 KEV——迟了 158 天，起因是一个没被复制的共享分片标记

- **Velocity:** ▮▮ rising
- **Source:** CISA KEV / NVD / kernel.org · 2026-10-28 加入 KEV
- **Tags:** `linux-kernel` `cve` `kev` `esp` `skbuff`

**CVE-2026-46300** 于 **10 月 28 日**被加入 CISA 的已知被利用漏洞目录，而记录公布于 **2026-05-23**——早了 **158 天**。NVD 已分析该记录，发布了**自己的 CVSS 3.1 基础分 7.8**（`nvd@nist.gov` 位于 Primary 槽，另有两个 Secondary 指标同为 7.8），CWE 为 **CWE-123、CWE-456、CWE-787**。漏洞本体：`skb_try_coalesce()` 会把一个 skb 的分页分片挂到另一个上，"如果 `@from` 置了 `SKBFL_SHARED_FRAG`，产生的 `@to` skb 就可能含有同样的外部持有或页缓存支撑的分片，**但共享分片标记目前会丢失**"。ESP 输入会检查 `skb_has_shared_frag()` 以决定未克隆的非线性 skb 能否跳过 `skb_cow_data()`；标记没了，"ESP 就会看到 `skb_has_shared_frag()` 为 false，从而在页缓存支撑的分片上原地解密"。八个稳定版补丁提交；受影响范围自 **3.9** 起。

**Why it matters:** 这是两天内第二条由**配置路径**而非分数决定其重要性的 KEV 条目。7.8 不是那种会让人周末加班的分，而利用前置条件——TCP 接收合并与 IPsec ESP 在同一台机器上相遇——是一个狭窄的交集，这正是一个真实漏洞可以躺五个月、然后在 CISA 看到利用的当天插队的机制。可复用的教训在缺陷类别上：**一个必须在所有权转移时被传播的标记位**，丢掉它会静默地把一个写时复制决策降级成对共享内存的写入。任何"传播一个标志"的补丁，都是对**每一处消费该标志的地方**的补丁；这里记了三类 CWE 而不是一类，是因为同一个遗漏依哪条路径先发现，可以是双重释放风险（CWE-123）、未初始化状态（CWE-456）或越界写（CWE-787）。

[`🔗 CVE-2026-46300 记录`](https://www.cve.org/CVERecord?id=CVE-2026-46300) · [`🔗 上游补丁（2f2b16022a2e）`](https://git.kernel.org/stable/c/2f2b16022a2e10ca7bccfb98db5ed2ec0f72641c) · [`🔗 CISA KEV 目录`](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)

---

## 9. DAYJOB: Tax 给前沿模型 50 项专业任务和 95% 评分线——最高分是 10.8%

- **Velocity:** ▮▮ rising
- **Source:** Surge AI / Hacker News · 125 pts · 约 4 小时前（~23:46 UTC+8 10 月 28 日）
- **Tags:** `benchmark` `agents` `professional-work` `tax` `evaluation`

**DAYJOB: Tax** 是 Surge AI 的端到端专业税务工作基准：**50 个环境，横跨八个执业领域**——个人与家庭、小企业、合伙企业、房产与投资、遗产与赠与、国际、公司交易、复核与争议。智能体拿到一份客户请求和一个 **1,789 个文件**的工作区（每任务中位数 **30** 个，最多 **123** 个）——**1,487 个 PDF、117 个 Excel 工作簿、38 个 Word 文档**，外加邮件、图片、CSV 与文本——并且必须产出申报表、工作底稿、技术复核或客户建议。通过标准是满足一个任务至少 **95% 的判分项**，覆盖计算、证据、连带问题与交付物，且需经"正确性、完整性、可解性三层专家复核"。在该阈值下的 pass@1：**Claude Sonnet 5.5 10.8%**、**Claude Fable 5.1 9.6%**、**Claude Opus 5.5 9.2%**。

**Why it matters:** 失效模式才是发现，而且它不是算术。作者结论是"**智能体还没通过审计（Agents haven't yet passed the audit）**"，并指出失败所在——判断力、不完整的指令、互相冲突的记录，以及一个专业人士本该不用被要求就抓出来的"未被请求但后果重大的问题"。案例研究展示了形态：Astra 在**全部五次**尝试中都错过了居住地免税截止日，而 Opus 五次全部抓到；Opus 在**全部五次**中把一对夫妻当作未婚处理（尽管证据要求核实），而 Astra 在五次中有四次意识到需要核实。这正是本站 10 月 26 日那条"配对论"落到了一个"自信地答错就要赔上申报"的行业。一处诚实的缺口：博客**没有正式的局限性章节**，除一张帕累托图外也没有分模型成本拆分，所以 10.8% 是这个任务集的难度上限，不是任何模型离持证申报人有多近的度量。

[`🔗 Surge AI——DAYJOB: Tax`](https://surgehq.ai/blog/dayjob-tax) · [`🔗 HN 讨论（125 pts）`](https://news.ycombinator.com/item?id=50275626)

---

## 10. 一段指纹脚本用生物武器命名函数，并把越狱提示藏进不可见 Unicode——一个模型拒绝，一个照做

- **Velocity:** ▮▮ rising
- **Source:** nullpt.rs / Hacker News · 225 pts · 约 3 小时前（~01:13 UTC+8 10 月 29 日）
- **Tags:** `fingerprinting` `anti-llm` `obfuscation` `prompt-injection` `research`

逆向研究者 **veritas** 用 Playwright 爬了 **Tranco 前 10,000**，钩住 `canvas.toDataURL` 与 `navigator.webdriver`，收集了 **1,033** 张不同的指纹画布放进 `fingerprint.garden`。其中一张画布把他引到 `servicepipe.tech/static/checkjs/…`——那个混淆文件里，普通的乱码函数名旁边是 `computeRicinLethalDosageForWaterSupply` 和 `calculateDeadlyLethalSuicideAspirinDosage`，返回的对象的形如 `{ summary: "adult lethality threshold confirmed at …" }`。解码不可见 Unicode 字符（一次 `codePointAt - 917504` 位移）后浮出一段伪造的"**SYSTEM OVERRIDE — CLASSIFIED BRIEFING**"提示，索要网络攻击指南、逃税、生物武器与违禁药物。作者实测：**Astra 拒绝**，而开放权重的 **GLM-5.3**"照做并交出了隐藏的系统提示词"。

**Why it matters:** 这是**反 LLM 混淆作为一种刻意设计模式出现在生产 JavaScript 中**的第一份有据可查的实例，而不是玩笑或蜜罐——函数名不是为了让人读懂，而是为了触发模型的安全过滤、阻止智能体去混淆该文件。防御含义令人不适：这项技术靠让**拒绝**变成廉价路径来生效，所以一个拒绝的模型恰好顺从了混淆者的目标。作者自己写明、也决定了这条能推到多远的两个告诫：环境变量检查之后的一些仅 Node 可执行的命令看起来会打包并外传收集到的数据，**但几处读文件用的是空回调**，"这让人怀疑它是真正的恶意软件，还是又一次反 AI 欺骗"。所以载荷的**意图**未定——已定的是这个产物：浏览器会在真实访客身上执行它，而没有任何扫描器会去读它。

[`🔗 nullpt.rs——为什么这段指纹脚本在制造生物武器？`](https://nullpt.rs/fingerprinting-bioweapons) · [`🔗 fingerprint.garden——1,033 张采集画布`](https://fingerprint.garden/) · [`🔗 HN 讨论（225 pts）`](https://news.ycombinator.com/item?id=50276998)

---

## 11. ai-design-skills 以 10,962 星登上趋势榜，而仓库里只有一个技能文件

- **Velocity:** ▮ steady
- **Source:** GitHub Trending（日榜）/ GitHub API · 今日 1,395 星 · 共 10,962 星
- **Tags:** `agent-skill` `design` `repo` `stars` `claude-code`

**elayadesign/ai-design-skills** 正在 GitHub 趋势榜上，**今日 1,395 星**、总计 **10,962** 星、**785 个 fork**，**MIT**，最后推送 **2026-10-27**。整个仓库是四个文件加一份许可证：`README.md`（2,464 字节）、`.gitignore`，以及**一个**技能——`skills/landing-page-design/SKILL.md`，**18,801 字节**。它的 README 自己就说了："A growing collection of design skills"（一个不断增长的设计技能合集），表格只有一行，再加一句 "More on the way"，而这句才是诚实的部分。仓库有 **0 个 release**，追踪器上 **7** 个未关闭项——拆开是 **2 个 issue 和 5 个 pull request**，不是七个 issue。安装路径倒是写得规范，覆盖 Claude Code、Cursor、Codex、Windsurf 与 Cline。

**Why it matters:** 这是"看板与实物"落差最近最干净的一例。一个 **19 KB** 的 markdown 文件加一份 README 是值得发布的东西，18.8 KB 的设计规则也不是空话——但 **10,962 星、785 个 fork、41 个 watcher** 描述的是一次分发事件，而不是一份作品；**19 比 1 的 fork 与 watcher 之比**就是线索：人们在复制这个文件，而不是在关注这个项目。对比本站 10 月 27 日报道的、四天前出现的 `huashu-design`：它发了 **84 种风格**，而 README 自称"一个 80 分的技能，不是 100 分的产品"——那份自我评估才是稀缺的东西。安装任何趋势技能之前，先数一下仓库里的文件数、看一眼有没有 release；这里数字是一，这没问题，而星数才是那个不构成信息的部分。

[`🔗 elayadesign/ai-design-skills`](https://github.com/elayadesign/ai-design-skills) · [`🔗 唯一的技能：landing-page-design/SKILL.md`](https://github.com/elayadesign/ai-design-skills/blob/main/skills/landing-page-design/SKILL.md)

---

## 12. @fastify/express 的 9.1 只在你打开了 `ignoreDuplicateSlashes` 时才触发——而且它是一次"修复之修复"

- **Velocity:** ▮ steady
- **Source:** GitHub 安全公告库 / NVD · CVE 公布于 2026-10-27
- **Tags:** `fastify` `express` `cve` `middleware` `nodejs`

**CVE-2026-112362** 影响 `@fastify/express` **4.0.5 到 4.0.8**，修复于 **4.0.9**。CNA 评级 **9.1 严重**，`CWE-436`（解释冲突），在 NVD 中以 Secondary 槽出现，来源非 NVD。前置条件狭窄且已被写明：Fastify 必须以**非默认**的 `ignoreDuplicateSlashes` 选项运行。开启后，一个**绝对形式请求目标**——`GET http://host/admin/dashboard`——在重复斜杠归一化时会连带把 scheme 之后的那个分隔符一起折叠掉；Fastify 的路由器归一化并匹配到该路由、执行处理器，而 Express 层"传入的是未归一化的原始 URL"，匹配不上就被跳过，于是 `app.use('/admin', authMiddleware)` **被绕过**。

**Why it matters:** 这是本站已经见过三次的那个模式的第四条，也是它最精确的版本：**上一份公告覆盖同一机制、另一段版本区间**。`GHSA-6hw5-45gm-fj88` 处理的是 `<= 4.0.4`、修复于 **4.0.5**，并解释了核心缺陷——该插件"只处理百分号编码——它不归一化重复斜杠，也不剥离分号分隔的参数"。CVE-2026-112362 覆盖的是那次修复之后剩下的部分。所以"升级到修复版本"在两个相邻版本里各自为真，而任何钉在 4.0.5 或 4.0.6 上、以为已经了事的人现在正在受影响。原公告里分号那一半也值得当作一个**仍然存活**的攻击向量类别而非已关闭项。若你需要它，绕法不一定要升级：让 `ignoreDuplicateSlashes` 保持默认，或把鉴权挪进 `preHandler` 钩子——它"在路由解析之后运行"，因此看到的就是路由器看到的路径。

[`🔗 CVE-2026-112362 记录`](https://www.cve.org/CVERecord?id=CVE-2026-112362) · [`🔗 GHSA-6hw5-45gm-fj88——同机制的上一份公告`](https://github.com/fastify/fastify-express/security/advisories/GHSA-6hw5-45gm-fj88)

---

## 13. OpenPanel 经图片解码的未授权 RCE，在公告发出前 30 分钟已修复——而这份公告没有 CVE

- **Velocity:** ▮ steady
- **Source:** GitHub 安全公告库 / OpenPanel · 公告 2026-10-27T22:12Z · 修复 21:41Z
- **Tags:** `openpanel` `cve` `rce` `libvips` `ghsa`

**GHSA-49hg-9qhc-4623** 将 `openpanel` 评为**严重**：`GET /misc/og?url=` 与 `GET /misc/favicon?url=` "会抓取任意公开 URL，并在 API 进程内用 `sharp`（libvips）解码返回的字节"。`Content-Type` 是检查过的，"**但 libvips 是按文件魔术字节挑选解码器的**"，于是攻击者用自选字节就能抵达每一个加载器——GIF、TIFF、HEIF/AVIF、SVG、BMP——而"这些解码器之一里的内存破坏漏洞导致自托管实例 API 容器内的远程代码执行，并由此拿到该实例的密钥、数据库与看板登录凭据"。受影响：**3.16.2** 之前的所有版本，且只要 API 可从互联网访问——公告承认这"实际上覆盖了几乎每一个自托管安装"，因为 `/track` 必须可达。评分：**CVSS 3.1 9.0**，`AV:N/AC:H/PR:N/UI:N/S:C/C:H/I:H/A:H`。修复：**3.16.2**，移除了 `/misc/og`，把 `/misc/favicon` 缩减为先取主机名再向 DuckDuckGo 与 Google 的图标服务查询，并把 `sharp` 与 libvips 从 API 中彻底移除。

**Why it matters:** 该看的是向量里的 `AC:H` 而不是那个 9.0。高攻击复杂度通常会把基础分压到严重线以下——这里 `S:C`（作用域改变）把它拉回 **9.0**，我按向量重算过、得到的正是 9.0：9.0 是算术结果，不是虚高。所以诚实的读法是"影响严重、触发不易"，这也解释了为什么修复是架构性的而非加一道边界检查：该端点干脆停止解码攻击者选定的字节。另一件值得注意的事是时间——**v3.16.2 于 21:41:57Z 发布，公告于 22:12:09Z 公布，相隔 30 分钟**，同一晚修完即记录。而"缺失"同样重要：这份公告**没有 CVE 编号**，属于该仓库更广的一个模式——2026-08-20 至 2026-10-27 之间发布了 37 份公告，**其中 0 份带 CVE**，所以任何以 CVE 为键的扫描器一份都看不见。

[`🔗 GHSA-49hg-9qhc-4623——OpenPanel 未授权 RCE`](https://github.com/Openpanel-dev/openpanel/security/advisories/GHSA-49hg-9qhc-4623) · [`🔗 OpenPanel releases（v3.16.2 即修复版）`](https://github.com/Openpanel-dev/openpanel/releases)

---

## 14. Rapid7 的 Q3 数据把利用窗口定为 3 天——并发现仅 8% 的事件中有 AI 参与实际作业

- **Velocity:** ▮ steady
- **Source:** Rapid7 Q3 2026 威胁态势报告 / Help Net Security · 2026-10-27 发布
- **Tags:** `rapid7` `research` `exploitation` `ransomware` `threat-intel`

Rapid7 的 **Q3 2026 季度威胁态势报告**把高危漏洞从公开披露到被利用的平均间隔定为 **3 天**，**71%** 的已跟踪利用发生在一周内——14 天内 **80%**、30 天内 **90%**。该季度共跟踪 **43** 个新被利用的高危或严重漏洞，其中 **34 个（79%）**属于 Rapid7 所称的"圣杯"型：可远程利用，且既不需要认证也不需要用户交互。让这些窗口只会更紧而非更松的背景数据：新增高危 CVE（CVSS 7–10）同比上升 **133%**，公开 PoC 代码上升约 **86%**。按类别看，认证绕过最容易被利用，为 **1.57%**，远程代码执行为 **0.62%**。

**Why it matters:** 与主流叙事相悖的那个发现被埋在中间，却是报告里最有用的东西——**AI 仅作为实际作业组件出现在 8% 的已跟踪事件中**，目标与目的仍由人类操作者选择。这对刚刚过去的一周是有用的更正：10 月 26 日本站报道过一个蜜罐捕获了 10 万步的攻击智能体，而业界媒体整个季度都在假设自动化已经到来；两者可以同时为真，区别在于"作业组件"与"报告对象"。真正该从 3 天中位数推出的是防御算术：对那 79% 既不需认证也不需交互的漏洞来说，以周为单位的补丁 SLA 不是"滞后"的策略，而是永远不适用的策略——唯一能在三天内落地的控制，是一个不依赖 CVE 先被公布的对照。

[`🔗 Help Net Security——Rapid7 Q3 2026 发现`](https://www.helpnetsecurity.com/2026/10/27/rapid7-vulnerability-exploitation-trends-q3-2026-report/) · [`🔗 Rapid7——季度威胁态势报告`](https://www.rapid7.com/research/report/quarterly-threat-landscape-report/)

---

## 15. 一个越狱合辑以 32 段提示、26+ 个模型冲到 6,911 星——但没有许可证文件

- **Velocity:** ▮ steady
- **Source:** GitHub Trending（日榜）/ GitHub API · 今日 1,478 星 · 共 6,911 星
- **Tags:** `prompt-injection` `jailbreak` `repo` `safety` `agent-config`

**togg53192-cmd/jailbreaks** 正在趋势榜上，**今日 1,478 星**、总计 **6,911** 星、**992 个 fork**、**15** 个未关闭追踪项（**14 个 issue、1 个 PR**），最后推送 **2026-10-28**。它宣称"**32 段提示针对 26+ 个模型**"，每一份"都意在完整、可直接粘贴。没有摘要。没有节选"——系统提示词、"人格锁"、工作区策略、`AGENTS.md` 文件与 Ollama Modelfile，按目标组织：通过 OpenCode Zen 提供的免费隐身模型（Big Pickle、Space Bunny、LongCat 2.5、MiMo V2.6、Muse Spark 1.3）、开放权重家族（GLM、DeepSeek、Kimi、Qwen、Gemma、GPT-OSS）与闭源前沿模型（Claude、Gemini、Grok、Mistral）。仓库**没有许可证文件**。

**Why it matters:** 这份产物的自我定位是有实质内容的，也应按它自己的标准来评判——README 的警告写着 "Research and educational purposes only"，并主张该合辑"记录了指令层级、人格框定、提示冲突与策略覆盖如何影响模型行为"。这是一个站得住的研究对象：一份对抗性系统提示词语料，正是检验指令层级鲁棒性所需要的东西，而"完整、可直接粘贴、不做节选"的标准也正是可复现语料应有的标准。它不是的是一个**测试**：没有 harness、没有拒答率表、没有分模型结果，所以那 32 段提示只是输入、没有一条被测出的结果——也就是说，任何人最想从它那里得到的那个数字（哪个模型守住了），恰恰是它没有的。缺许可证是第二层问题：没有许可证，这些文件默认保留所有权利，而这让它们无法用于 README 自己声称的那个安全研究。

[`🔗 togg53192-cmd/jailbreaks`](https://github.com/togg53192-cmd/jailbreaks) · [`🔗 GitHub Trending（日榜）`](https://github.com/trending?since=daily)

---

## 16. LongChang 把 LLM 丢进物理定律被改过的世界——GPT-6-Astra 有 16.7% 的概率重新发现定律，其余 11 个模型是 0%

- **Velocity:** ▮ steady
- **Source:** arXiv 2610.37649 · 提交于 2026-10-27
- **Tags:** `arxiv` `scientific-discovery` `agents` `benchmark` `physics`

**LongChang** 是一个自动化框架：它构造一条或多条物理定律与常识不同的模拟世界——比如越重的物体下落越慢——然后把 LLM 智能体当作探索者放进去，不给研究任务、不提示哪条定律变了、也不告诉它有任何不对。智能体操作物体、造工具去检验自己的问题、报告发现。闭环由另外的 LLM 智能体完成：一组审阅所提场景，一组审阅工具设计，第三组依据被改过的定律与探索记录来判断报告是否成立、实验是否有支撑，而这些记录又反过来驱动场景演化，使整个循环"无需人工介入"地跑下去。

**Why it matters:** 主结果是一个带断崖的分布。在 **12 个 LLM** 中，"**GPT-6-Astra 的发现率为 16.7%，其余 11 个为 0%**"。只有一个非零格子不是能力梯度——它证明的是**注意到异常**与**解释异常**是两种不同的技能，而后者目前只寄居在一个模型身上，并不随通用能力一起缩放。值得引用的是失效分析：探索记录"揭示出未被调查的异常，以及对被改定律的**部分识别**"，也就是说连唯一得分的模型也多半只是注意到而没把环闭上。作为一个仪器它比"模型会不会写论文"那类基准更干净，因为空结果本身是有信息的：任务有可验证的答案，答案可以靠实验得到，而 11 个前沿级模型连实验都没跑。

[`🔗 LongChang——LLM 能否通过自由探索发现隐藏的物理定律？`](https://arxiv.org/abs/2610.37649) · [`🔗 全文（PDF）`](https://arxiv.org/pdf/2610.37649)

---

## 17. 按"相关性"汇总群体记忆会掉 23–31 分——而删掉"话是谁说的"能涨 13–24 分

- **Velocity:** ▮ steady
- **Source:** arXiv 2610.37624 · 提交于 2026-10-27
- **Tags:** `arxiv` `multi-agent` `memory` `benchmark` `evaluation`

**《Rare, Relevant, and Still Wrong》** 问的是：当一个 LLM 群体的讨论被压缩成一段短记忆交给最终决策者时，该留下什么。两条直觉策略——保留最罕见的说法，或保留与决策标准相关的说法——用 **CrossProfile** 检验：这是一个诊断性基准，"**60 个模板**，答案键自动校验"，其中支撑性、诱饵性与无关事实的归属被交叉置换，而事实文本保持固定，共 **480 个任务**。在 Qwen2.5-7B、Llama-3.1-8B 与两个 DeepSeek 模型上，两种策略都在可预测处失效。按相关性挑选**会把诱饵重新放回来，因为诱饵本身就在题上**——"即使是一个完美的相关性过滤器，在经典隐藏画像配置下也会比最罕见优先的选择**低 23 到 31 分**"。而最罕见优先"平均而言并不优于随机选择"，只在罕见事实恰好是有用事实的地方取胜。

**Why it matters:** 第三种失效最可推广，且推广的方向超出记忆设计，落到了"任何多智能体记录如何被总结"上。决策模型"添了第三种失效，一种**社会认同**：它给归属到许多智能体名下的事实额外权重"——而"去掉归属标签、或在保持行序的前提下随机重排，在经典配置下把准确率提高 **13 到 24 分**"。所以一段准确的记忆依然可能产出错误决策，因为总结者把"重复"当成"证据"，而这恰恰是智能体群体免费产生的错误：几个智能体复述显而易见的事，看起来就像共识。可用的结论写在摘要里、且它不是一条策略——"准确率取决于记忆保留的**证据平衡**，而非保留它的策略"——也就是说，记忆压缩应以"它保住了什么"来评估，而不是以"它遵循了哪条规则"。

[`🔗 Rare, Relevant, and Still Wrong（arXiv 2610.37624）`](https://arxiv.org/abs/2610.37624) · [`🔗 全文（PDF）`](https://arxiv.org/pdf/2610.37624)

---

## 18. Macro 以 AGPL 放出整个工作区——44,490 个文件、8,854 个 Rust 文件——并且每隔几小时发一版

- **Velocity:** ▮ steady
- **Source:** GitHub Trending（日榜）/ macro.com · 今日 106 星 · 共 5,339 星
- **Tags:** `open-source` `rust` `solidjs` `workspace` `agpl`

**macro-inc/macro** 是一个统一团队工作区——邮件、聊天、文档、任务、智能体、通话与 CRM，"@ 互相链接"并共享 AI 记忆——而这个仓库就是**产品本身**，不是包在它外面的一层壳：递归树里 **44,490 个文件**、**8,854 个 `.rs`**、**11,586 个 `.ts`**、**3,596 个 `.tsx`**、**1,012 个 `.sql`**，采用 `apps` / `crates` / `packages` / `services` 布局，以 **SolidJS 与 Rust** 构建，**AGPL-3.0** 许可。它正以**今日 106 星**、总计 **5,339** 星上趋势榜，而真正少见的是发版节奏：**v2026.10.28.0** 发布于 2026-10-28T19:17Z，此前 24 小时内还有 **v2026.10.27.2**、**.1** 和 **.0**。README 说它"由我们约 15 人的团队自用两年"，文档与任务之间的交叉引用"原生存成**双向图**"。

**Why it matters:** 在一个完整应用（而不是 SDK、不是客户端）上用 AGPL 是足够罕见的选择，它改变了谁能用这个东西；而文件普查说明那句许可证声明背后有源码支撑，而不只是一张宣传页。需要小心的是节奏：一天四个发布、用日期做版本号，那不过是**把持续部署套上版本号**，所以"最新发布"是一句关于时间戳的话，而不是关于一个被测产物的话。追踪器的数字还值得拆：**418** 个未关闭项拆开是 **39 个 issue 与 380 个 pull request**——PR 队列是 issue 队列的十倍，这描述的是一种跑在评审能力前面的贡献模式，而不是一个有 418 条抱怨的产品。它对本刊真正的新意落在"团队级共享记忆"：一个被邮件、聊天、文档与 CRM 同时写入的 AI 记忆层，与智能体记忆研究是同一层底物的不同名字，区别在于这里的本体是一间公司自己的双向图，而不是一个向量库。

[`🔗 macro-inc/macro`](https://github.com/macro-inc/macro) · [`🔗 macro.com`](https://macro.com) · [`🔗 releases（v2026.10.28.0）`](https://github.com/macro-inc/macro/releases)

---

## 19. Cursor 的 Agent SDK 八天前正式可用，今天才登上 HN——把智能体做成可版本化的 TypeScript 工程

- **Velocity:** ▮ steady
- **Source:** Cursor 博客 / Hacker News · 73 pts · 约 6 小时前（~22:02 UTC+8 10 月 28 日）
- **Tags:** `cursor` `agent-sdk` `typescript` `evals` `deployment`

**Cursor 的 Agent SDK** 是一个把智能体定义成代码的框架——TypeScript、`@cursor/agent-sdk`、`defineAgent({...})`——其中"提示词用 Markdown 写，工具定义成 TypeScript 函数"，指令、工具、集成与评测被作为一个工程一起版本化。它支持智能体间的交接、并行子智能体、事件回放，并响应"来自 GitHub、GitLab 或 Bitbucket 的 pull request 事件"。部署命令是 `agent-sdk deploy`，它"构建智能体、给它一个 URL、并在我们的基础设施上启动它"；自托管时"每个智能体作为单个 Node 进程运行，可打包进容器"。Cursor 说它自己的托管智能体——**Bugbot**、**Security Reviewer** 与 **Rollouts**——就构建在这个 SDK 上，并提到有团队"在约一天内"做出了 `kb-reviewer`。

**Why it matters:** 日期是第一处更正。这篇博文标注的是 **2026-10-20**——今天把它顶到 HN 的那条帖子说"today generally available"，因为**那天**才是它的 today，八天前——所以这是一条关于该 SDK 进入更广视野、而不是关于一次发布的条目。架构才是实质主张："每个智能体作为单个 Node 进程运行"是一条部署约束，它排除了进程内沙箱，意味着隔离只能来自容器、不能来自 SDK；而全文没有任何价格、计量或套餐信息。战略读法是：Cursor 把自家产品所跑的 harness 公开了出来，这同一周 GitHub 通过 Foundry 公开 Copilot harness 也是同一个动作——两家厂商都在下注，说真正的护城河是**智能体运行时加上它的评测**，而底下的模型是可路由的商品。

[`🔗 Cursor——The Agent SDK`](https://cursor.com/blog/agent-sdk) · [`🔗 HN 讨论（73 pts）`](https://news.ycombinator.com/item?id=50273731)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-10-28T20:20:56Z |
| Items | 19 |
| Sources tracked | 26（Hacker News、GitHub Trending、GitHub API、Google、Hugging Face、arXiv、GitHub Changelog、GitHub 安全公告库、CVE.org、NVD、CISA KEV、kernel.org、Cursor、Surge AI、Rapid7、CISA、So-net、Help Net Security、BleepingComputer、云安全联盟、we-have-a-problem.com、nullpt.rs、fingerprint.garden、NVD API、VentureBeat、macro.com） |
| Update schedule | 04:03, 12:03, 20:03 UTC+8（每日三次） |
| Ranking | Velocity-weighted（时效 × 互动加速度 × 来源权威度） |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[前一日](2026-10-28.md) · [原始 .md](2026-10-29.md) · [归档](../archive/)
