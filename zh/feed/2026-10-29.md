---
date: 2026-10-29
updated: 2026-10-29T12:15:40Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 53
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

## 15. 一个越狱合辑以 32 段提示、26+ 个模型冲过 7,900 星——但没有许可证文件

- **Velocity:** ▮ steady
- **Source:** GitHub Trending（日榜）/ GitHub API · 今日 1,478 星 · 批次读取时共 6,911 星；12:15Z 已达 7,954 星；12:29Z 为 7,978 星
- **Tags:** `prompt-injection` `jailbreak` `repo` `safety` `agent-config`

**togg53192-cmd/jailbreaks** 正在趋势榜上，**今日 1,478 星**、总计 **6,911** 星、**992 个 fork**、**15** 个未关闭追踪项（**14 个 issue、1 个 PR**），最后推送 **2026-10-28**——这些数字都是批次读取时的快照：提交前的检查几分钟后再读已是 **7,954** 星，12:29Z 为 **7,978** 星，所以这里发布的星数是一到手就过时的快照，而不是一个错误的数字。它宣称"**32 段提示针对 26+ 个模型**"，每一份"都意在完整、可直接粘贴。没有摘要。没有节选"——系统提示词、"人格锁"、工作区策略、`AGENTS.md` 文件与 Ollama Modelfile，按目标组织：通过 OpenCode Zen 提供的免费隐身模型（Big Pickle、Space Bunny、LongCat 2.5、MiMo V2.6、Muse Spark 1.3）、开放权重家族（GLM、DeepSeek、Kimi、Qwen、Gemma、GPT-OSS）与闭源前沿模型（Claude、Gemini、Grok、Mistral）。仓库**没有许可证文件**。

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

## 20. Qwenputer 把一个 RISC-V CPU 编译进 Qwen3.5 的权重里，并用模型自己的 DeltaNet 状态当内存

- **Velocity:** ▮▮▮ trending
- **Source:** divagr.com / Hacker News · 195 pts · 约 3 小时前（~08:25 UTC+8 10 月 29 日）
- **Tags:** `compiled-weights` `qwen` `risc-v` `gated-deltanet` `interpretability`

**Qwenputer** 是一个原版 **Qwen 3.5 4B**，只加了一样东西："一个嵌在权重内部、把模型自己的 Gated DeltaNet 注意力层当作 RAM 的 RISC-V CPU"。前提是"精确"。把某个 GDN 头的门控设为 **1**、写入强度 `beta` 设为 **1**、键用 one-hot 编码，那么每次写入恰好覆盖一行、每次查询都能精确取回——于是 RNN 状态变成可寻址内存，而且"无论对话多长，它的大小都不变"，这与注意力的 KV 缓存不同。有了这个"精确 RAM"，一个编译器**不经过任何训练**、直接把权重写死，把每条指令变成几个生成的 token（`ADDR`、`VAL`、`STEP`），所以"这些 token 就是 CPU 的执行轨迹"。成品是一个 **32 位 RV32IM 内核，外加 Zba 扩展和一个大数单元**，占 **Qwen 那 32 层前面的 11 层**：它通过官方 `riscv-tests`，程序输出与 qemu 一致，并"**自由运行（free-running）了 1800 万条指令，零错误**"。实测上，DeepMind 算术集拿到 **97.5–100%**（原版 Qwen 为 **55–90%**），NUPA 长整数算术从 **48.6% 提到 100%**（与给它一个 Python 工具持平），并回放了约 **23 万个**输出位置，**零不匹配**。

**Why it matters:** 作者开篇那句免责声明才是整个安全论证的核心——"它**不是**插件、不是工具、也不是沙箱"。这不是退让而是重点：在 forward pass 内部完成的计算不会发出任何工具调用，因此外部没有任何东西记录下"做过一次算术"，而作者自己点名的两篇后续正是这个方向——混合模型学会**把推理藏进 RNN 状态、躲开 CoT 监控**，以及把编译后的权重当作**模型自己关不掉的监控器**。两个方向之所以都成立，原因相同：这件事是**精确**的，而不是近似。限制也写得很直白，应当与结论一起引用：checkpoint **18.8 GB**，"约为基础版 Qwen 的两倍，不过大部分是零填充"；它需要一个小驱动（`RvChat`），"还不能用裸的 `generate()` 调用跑"；每条指令要花几个解码 token，因此批量执行器在 L4 上约 **每秒 3200 个 CPU token**。模型内文件系统更实验性——1024 个目录槽、**512 个文件**约 **5.3 万 token**，对"两次对话之间发生变化的事实"正确率 **90%**（把旧对话粘回去是 **30%**），但"这仍是实验性的"，代码在单独分支上。许可证要读文件而不是信徽章：仓库是 **MIT** 加一条例外（"`games/roms` 里的 CHIP-8 ROM 不在本许可证覆盖范围内"），这正是 GitHub 的识别器报 `NOASSERTION` 的原因；HF 模型卡则标 `apache-2.0`。

[`🔗 Qwenputer——Qwen3.5 内部一个完整可用的确定性 RISC-V CPU`](https://divagr.com/blog/qwenputer) · [`🔗 divagr18/qwenputer（代码，MIT + ROM 例外）`](https://github.com/divagr18/qwenputer) · [`🔗 Hugging Face 上的 divagr1925/Qwen3.5-4B-Qwenputer`](https://huggingface.co/divagr1925/Qwen3.5-4B-Qwenputer) · [`🔗 HN 讨论（195 pts）`](https://news.ycombinator.com/item?id=50282838)

---

## 21. Alpine 的 GitLab 在打完补丁后仍被攻击了两天——因为修复是一个 GitLab 版本号并不携带的 Ruby 补丁

- **Velocity:** ▮▮▮ trending
- **Source:** Alpine Linux 安全公告 / Hacker News · 112 pts · 约 4 小时前（~07:45 UTC+8 10 月 29 日）
- **Tags:** `gitlab` `cve` `ruby` `onigmo` `incident-response`

**CVE-2026-97229** 是 GitLab CE/EE 的一个 **CVSS 3.1 10.0** 未认证 RCE——`AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H`，**CWE-190**（整数溢出）——"CI/CD 配置中一个精心构造的正则表达式"即可让未认证用户在服务器上执行代码。受影响范围是 **19.2 低于 19.2.8、19.3 低于 19.3.5、19.4 低于 19.4.2**，GitLab 在 **10 月 12 日**发布了修复版本。底层 bug 在 **Onigmo**，即 Ruby 内置的正则引擎，所以修复是"一组打在 GitLab 自己打包的 Ruby 上的补丁"；上游 Ruby 在 **10 月 23 日**发布 **3.3.13、3.4.12、4.0.9**。Alpine 在 **10 月 20–21 日**被一个新注册账号用构造的 CI 配置攻击，GitLab worker 进程**崩溃 8 次**，其中 **4 次**攻击者"已推进到利用流程后段、在下一步失败"，并且下载了 Alpine 的 GitLab 容器镜像，"这表明他们在针对我们的确切构建做利用调优"。Alpine 于 **10 月 22 日**升级到 **19.3.6**，**26 日**发现仍然可被利用。他们在 **27 日**把 GitLab 对除开发者与构建服务器之外的人全部关闭，从头重建，**28 日**重置所有密码并更换 GitLab 的密钥。

**Why it matters:** 这条事件最该带走的句子是 Alpine 自己写的——"**如果你用自带的 Ruby（从源码或自己的容器镜像）跑 GitLab 而不是用 GitLab 的包，那么只升级 GitLab 是不够的。**" 19.3.6 高于已修复的 19.3.5，所以扫描器做的每一个版本号比对都通过，而漏洞依然存在，因为被修复的组件是**打包在**发布版里面的，而不是被发布版**命名**的。这正是本刊 10 月 23 日那条"已修复是三个不同产物"的教训落在一个发行版身上：公告文本、包版本、实际安装的字节，三者分了家。这里还有两点异常诚实、值得转引。第一是分数来源：NVD 记录状态为 `Analyzed`，而 **10.0 分挂在 Secondary 槽位、来源是 `cve@gitlab.com`**，没有 `nvd@nist.gov` 指标——这是"背书"情形：NVD 分析了记录、认可了 CNA 的数字，而不是自己另出一个。第二是那些否定性结论被写成了局限而不是清白证明："一次成功的利用不会留下崩溃，也不会在 Web 日志里留下痕迹""攻击当天的部分日志已经丢失""我们没有出站网络连接的日志，托管商也没有"。重建正是对这句话的正确回应、而非谨慎之举；而包校验才是可复制的做法——把 aports 提交对照"一位开发者的克隆和全部 **45 台构建机**"验证，而不是对照可能已经被攻陷的那台服务器。

[`🔗 Alpine Linux——GitLab 安全事件：CVE-2026-97229 的利用尝试`](https://alpinelinux.org/posts/GitLab-security-incident-CVE-2026-97229.html) · [`🔗 CVE-2026-97229 记录（NVD 状态 `Analyzed`，唯一指标来自 GitLab 的 CNA）`](https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-97229) · [`🔗 HN 讨论（112 pts）`](https://news.ycombinator.com/item?id=50282544)

---

## 22. "Icepick" 是 4.1 万条 DHS 记录，来自一个 Okta 单点登录服务——而 Okta 说没有任何东西被攻破

- **Velocity:** ▮▮▮ trending
- **Source:** WIRED / Distributed Denial of Secrets · 301 pts · 发布于 2026-10-28T16:00Z（~20:00 UTC+8 10 月 28 日）
- **Tags:** `breach` `dhs` `okta` `leak` `surveillance`

**Distributed Denial of Secrets** 于 **10 月 28 日**发布了一份名为 **"Icepick"** 的档案："一个内部数据库，可识别美国国土安全部（DHS）**超过 4.1 万名**员工。该数据库来自 DHS 使用的一个 **Okta 单点登录服务**，暴露了员工……" WIRED 的还原是"超过 **4.1 万**名员工或承包商"，覆盖 DHS 本体与七个下属机构，数据最后更新于 **2026 年 8 月 19 日**：邮箱、电话、办公地址，外加"对内部系统和关于卧底与监控项目的敏感信息的引用"。按 WIRED 的统计，**CBP** 占一半以上，**ICE** 约 **1 万人**（其中约三分之一在国土安全调查局 HSI），**USCIS** 约 **6,200** 人，**CISA** 近 **1,000** 人、其中一半以上是承包商——合计约为该部门劳动力的**七分之一**。权限组才是最刺眼的部分：HSI 有 **39 名**员工横跨十几个外勤办公室，属于名称含 "**CUC**" 的组，法院文件称其意为"certified undercover operation"（认证卧底行动）；另有组的名称涉及 "Keyhole"，法院文件称那是近期为 HSI 在明尼阿波利斯监控抗议团体提供资金的认证卧底行动；还有 "**Communications Intercept Center TechOps (CICTO) Program**"、"**Title III Intercept Program**"（窃听）以及 "**Illicit Sensor Intercept Program (ISIP)**"。**Okta** 对 WIRED 表示"未察觉其系统遭到任何入侵""Okta 是安全的"。

**Why it matters:** 两种说法的分歧本身就是报道，而双方都没有公开证据。 "来自一个 Okta 单点登录服务"描述的是数据**存放的位置**；"Okta 系统未被入侵"描述的是另一句话——Okta 自己的边界——而某个租户配置错误或权限过大的目录导出，可以在不与第二句矛盾的前提下产生第一句。这个区分值得小心保住，因为本能反应是把厂商的否认当成对泄密事实的反驳。真正让它比通讯录更糟的是那份角色分布：在普通组织架构里，姓名加座机价值很低，但在这张表上，同样的字段同时标出了**谁**在认证卧底行动里、外勤办公室**在哪**、以及**关联哪个**窃听项目——WIRED 说这份档案"提供了 DHS 如何组织的地图"，这个说法是准确的。属于分析而非正文的背景：DDoSecrets 的发布发生在 **ShinyHunters** 声称窃取到几乎全部 FBI 员工数据之后，而这次泄密又恰逢 DHS 自己正在寻求揭开匿名用户身份、调取抗议者的客户记录、并把"人肉搜索"的定义扩大到涵盖姓名与职务这类基本事实——所以这批材料同时是一次安全失守和一次政治行动，两种读法都由报道提供，而不是我强加的。

[`🔗 WIRED——大规模泄露暴露 4.1 万名国土安全部员工`](https://www.wired.com/story/massive-leak-exposes-41000-homeland-security-workers-including-undercover-ice-agents/) · [`🔗 DDoSecrets——"Icepick"发布页（2026-10-28 16:00）`](https://ddosecrets.org/) · [`🔗 HN 讨论（301 pts）`](https://news.ycombinator.com/item?id=50280864)

---

## 23. CISA 把一个 2.7 分加进了 KEV——那是 VMware 一份五 CVE 公告里的最低分，而该公告最高是 9.8

- **Velocity:** ▮▮ rising
- **Source:** CISA KEV / NVD / Broadcom VMSA · KEV 收录于 2026-10-28 · SSVC 时间戳 2026-10-28T19:50Z
- **Tags:** `vmware` `cve` `kev` `ssvc` `logging`

**CVE-2026-41709** 于 **10 月 28 日**被加入 CISA 的已知被利用漏洞目录，整改期限 **11 月 11 日**。它是一个"日志记录不足"漏洞——**CWE-778**——"恶意管理员可以利用该问题执行某些不被记录的操作"。Broadcom 给出的评分是 **CVSS 3.1 2.7（Low）**，`AV:N/AC:L/PR:H/UI:N/S:U/C:N/I:L/A:N`，公告原文也这么写："Broadcom 评估该问题的严重性处于**低危**区间，CVSSv3 基础分最高 2.7。" 它是 **VMSA-2026-0006.2**（**7 月 29 日**发布，**8 月 19 日**最后更新）中五个 CVE 之一，其余最高到 **9.8**，整份公告的严重性标为"**Critical**"、"CVSSv3 区间：2.7–9.8"。修复版本按产品线分别列出——`ESXi-9.1.0.0-25370933`、`ESXi-9.0.2.0100-25595025`、`ESXi80U3j-25429389`、VCF 5.2.4，以及 Telco Cloud 的 KB449886。记录上致谢的报送者是 **CrowdStrike 的 Ian Barton**。

**Why it matters:** 本刊报道过的每一个 KEV 条目，都有一个能解释紧迫性的分数；这一条把问题倒过来了。该记录已发布 **90 天**（7 月 30 日），NVD 状态仍是 **`Undergoing Analysis`**、**没有 `nvd@nist.gov` 指标**——唯一的分是 Broadcom 的，挂在 Secondary 槽位——所以三个月里，这份 bug 的全部公开评估就是"2.7，低危，仅限管理员"。变的不是分数，而是 **CISA-ADP 的 SSVC**：其 `2026-10-28T19:50:06Z` 的评估为 `exploitation: **active**`、`automatable: no`、`technicalImpact: partial`。这个形状才是有意思的：一个**影响**分数近乎为零、因为它什么也没破坏的缺陷，其**利用**却是活跃的——因为一个能不被记录地行动的恶意管理员，早已击穿了唯一能抓住他的那道控制。这条应当被读成"CVSS 量错了轴"的案例，而不是评分错误。另外注意这份公告造出的合成物：同一份文档，严重性横幅写 Critical，而它唯一进了 KEV 的成员写 Low——这正是本刊 10 月 25 日在 HPE ArubaOS 公告上标出的"标签 vs 分数"混淆，只不过这里厂商自己的两个数字相差 7.1 分。

[`🔗 CISA KEV 目录（CVE-2026-41709，2026-10-28 收录，期限 2026-11-11）`](https://www.cisa.gov/known-exploited-vulnerabilities-catalog?field_cve=CVE-2026-41709) · [`🔗 Broadcom VMSA-2026-0006.2（五个 CVE，2.7–9.8，含修复矩阵）`](https://support.broadcom.com/web/ecx/support-content-notification/-/external/content/SecurityAdvisories/0/38017) · [`🔗 CVE-2026-41709 的 NVD 记录（Undergoing Analysis，CISA-ADP SSVC）`](https://nvd.nist.gov/vuln/detail/CVE-2026-41709)

---

## 24. Dell 一次性发布 33 个 Data Domain CVE——四个 9.8，而 NVD 一个都没分析

- **Velocity:** ▮▮ rising
- **Source:** NVD API / Dell DSA-2026-416 · 33 条记录均发布于 2026-10-28T09:17Z
- **Tags:** `dell` `powerprotect` `cve` `backup` `cna-assigned`

**DSA-2026-416** 是一份涵盖 Dell PowerProtect Data Domain、Data Domain Virtual Edition、APEX Protection Storage 与 Data Domain Management Center 的公告。页面上引用了 **179 个不同的 CVE 编号**，其中大多是 Dell 打包的第三方组件（Apache HTTP Server、lodash、rsync、libpq5、helm、nginx、libexpat、Pillow、libtiff5、tar、suseconnect、Apache Tomcat、iDRAC9）。Dell **自己的** CNA（`security_alert@emc.com`）在 **10 月 28 日 09:17Z** 一次推送里为该公告立了 **33 条记录**，而分数分布是双峰而不是均匀的：**四个 9.8**、**两个 9.6**、一个 9.1、三个 8.8，然后是一条长尾一直低到 **2.7**（这一档有四个）。两个 9.8 是同一个数字下的两个不同 bug——**CVE-2026-86397** 是 **CWE-862**"认证不当……导致**创建特权账号**"，**CVE-2026-86400** 是 **CWE-287**"导致**以 root 权限执行任意命令**"，两者都是"具备远程访问的未认证攻击者"。那个 9.1（**CVE-2026-90717**）是异类：它需要低权限（`PR:L`）但作用域改变（`S:C`），而 Dell 自己的描述说它"可能影响其他受管 Data Domain 系统"。修复版本按产品线分别给出——功能发布线 **8.9.0.0**、LTS2024 **7.13.1.90**，以及 8.3.1.x / 8.6.1.x 两条 LTS。

**Why it matters:** 这份公告里最有用的一句话不是分数而是一句免责声明，它因为排在表格上方而极易被跳过："**本文并未列出所有产品版本。**" 与 179 对 33 的落差合起来看，意味着：一个在公告里搜到自己机型的人，会看到机型确实被列出，但他真正需要跟踪的那些 CVE 编号属于**另一份** Dell 文档——第三方组件由 DSA-2026-312 等各自链接的行来修复。第二点是来源，而且高度一致：**33 条**记录全部处于 **`Awaiting Analysis`**、**没有 `nvd@nist.gov` 指标**，所以这里每一个分数都是 Dell 给的、被原样转发。对 9.8 来说这不那么要紧（其算术本身足够说明问题），但对 2.7–5.3 那十二条来说，「厂商说这是小问题」是一句没有人复核过的判断。而这个资产类别正是"特权账号创建"值得读两遍的原因：备份设备要对它保护的系统做认证，所以 Data Domain 上的 root 不是一个单点主机，而是一份能触达它本来负责恢复的那些数据的凭证。

[`🔗 Dell DSA-2026-416——PowerProtect Data Domain 多漏洞公告`](https://www.dell.com/support/kbdoc/en-us/000515178/dsa-2026-416-security-update-for-dell-powerprotect-data-domain-multiple-vulnerabilities) · [`🔗 CVE-2026-86400 记录（9.8，CWE-287，`Awaiting Analysis`）`](https://nvd.nist.gov/vuln/detail/CVE-2026-86400) · [`🔗 CVE-2026-86397 记录（9.8，CWE-862）`](https://nvd.nist.gov/vuln/detail/CVE-2026-86397)

---

## 25. 智能指数 v5 用私有题集重建排行榜——开源权重差距从 3 分拉大到 12 分

- **Velocity:** ▮▮ rising
- **Source:** Artificial Analysis / Hacker News · 91 pts · 约 25 小时前（~11:06 UTC+8 10 月 28 日）
- **Tags:** `benchmark` `artificial-analysis` `leaderboard` `open-weights` `contamination`

**Artificial Analysis 智能指数 v5** 已上线："**2 个新基准、3 项升级**"，并且用它自己的话说，"这是指数首次以**私有数据集为主体**构建"——**60%** "基于私有测试集或留出答案的评测"。新增 **FrontierCode 2.0**（Cognition 的私有基准，**132 个**真实开源仓库任务，"以维护者是否会合入智能体的改动"为评分标准，每题在 AA 的 harness 里跑**三次**）与 **Terminal-Bench-Science**（**70 个**终端环境下的智能体科研任务）。升级 **HLE-Diamond**（精炼版 Humanity's Last Exam，**1000 题**，推理与知识各半）、**AA-Omniscience v1.1** 与 **CritPt v2**（私有 **40 题**硬子集——"70 道研究级物理题，减去七个前沿模型在发布时五次全对的那 30 道"）。移除 GDPval-AA v2.1、SciCode、AA-LCR v1.1。权重是四个各占 25% 的象限：知识工作、编码、科学、通用。结果：**Claude Opus 5.5（max）58 分**，GPT-6 Astra 57，GPT-6.1 Sol 55，**Gemini 4 Argon 50**。

**Why it matters:** 这次改版改掉了本刊反复引用过的一个数字，而且它不是重新标定——v4.3 的分数与 v5 不可比。有三点值得带走。**开源权重差距从 3 分扩大到 12 分**：**Kimi K3.1 Pro** 以 **46** 成为最强开源模型，但**权重尚未发布**；而在你真正能下载的模型里，**DeepSeek V4.1 Flash 1017（max）** 与 **GLM-5.3（max）** 停在 **32**——"低于 Claude Haiku 5.5（max, 36）"。这比本刊 10 月 5 日那条 DeepSeek 报道所暗示的图景明显更差，而且它是私有题集的产物而非某一周发挥失常：差距最大的两项正是最新的两个私有评测（HLE-Diamond 与 Terminal-Bench-Science）。**成本已与分数脱钩**：GPT-6.1 Sol 距榜首 4 分，每任务 **1.27 美元**，而榜首是 **10.04 美元**；前十名之间差距"超过 **13 倍**"，最贵的 Fable 5.1 达 **13.04 美元**。以及**努力档位现在是比选模型更大的杠杆**：Opus 5.5 从低档 **35** 到高档 **58**，代价是 **10 倍**成本；Sonnet 5.5 的低—高跨度从 20 分涨到 **29** 分。页面自己给出的诚实提醒是："v5 在九个评测上都还留有显著进步空间，且没有任何一个模型全部领先"——Opus 5.5 拿下三项，其余六项由另外五个模型分走。

[`🔗 Artificial Analysis——智能指数 v5 发布`](https://artificialanalysis.ai/articles/artificial-analysis-intelligence-index-v5) · [`🔗 HN 讨论（91 pts）`](https://news.ycombinator.com/item?id=50268868)

---

## 26. Cloudflare 开源了它漏洞挖掘 harness 背后的 skill——而它自己的原则说一次运行大约只找到一半

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending（周榜）/ GitHub API · 本周 16,002 stars · 总计 51,835
- **Tags:** `agent-skill` `security-audit` `cloudflare` `harness` `vulnerability-hunting`

**cloudflare/security-audit-skill** 是"催生 Cloudflare 漏洞发现 harness 的那个 skill"，以"它所演化自的单仓库起点"形式公开。它跑六个阶段——侦察（产出 `architecture.md` 与 `coverage-ledger.json`）、由覆盖账本驱动的狩猎（配"隔离的狩猎者"）、候选验证、结构化输出到 `findings.json`、独立记录复核、以及目标中立的报告——并在阶段边界运行两个零依赖的 Node 校验器（`validate-coverage-ledger.cjs`、`validate-findings.cjs`）。判定词汇本身就是设计：`confirmed` "有完整的来源链条与有界的观测结果"，`needs_validation` "有一个确切未解决的事实、且**不含严重性**"，`rejected` "记录一条被证伪的候选"。仓库有 **51,835 stars**、**3,299 forks**、**195 watchers**、**MIT**，跟踪器拆开是 **35 个 issue 与 67 个 PR**。它同时**已经 45 天没动**——最后一次提交"Clarify guidance and full audit modes"落在 **2026-09-14**——而它演化自的 Cloudflare 博客发布于 **2026-06-18**。

**Why it matters:** 设计原则才是产物，其中三条是论断而非建议。"**对抗式验证**：检查发现的那个智能体永远不能是发现它的那个"——这是把"复核独立性"写成了硬规则。"**纵深防御的空缺不是漏洞**：如果 A 层挡住了攻击，B 层的缺失只是一条加固建议"——这是多数自动扫描器不肯划的那条线，也正是为什么输出 schema 需要 `needs_validation` 作为第三种判定而不是二值。而那条反过来说自家产品的："在我们的测试运行中，**单次运行大约只找到重复运行合计漏洞的一半**"——一条主动自曝的召回上限，这恰是这类 skill 通常被宣传的数字的诚实形态。安装前请先读需求清单，因为它不是 linter：它要求"一个 OS 级强制沙箱……关闭外部网络、使用精简的白名单环境、施加资源限制、且只允许写入分配的临时路径"，并声明"缺少这些控制时，流程会把线索保留为 `needs_validation`，而不执行目标代码"。星标速度是应当打折的部分：**本周 16,002 星**，而仓库自九月中起无人推送、发布博文在六月——那是一次传播事件而不是一次发布，与本刊今天早些时候在 `ai-design-skills` 上标出的是同一种落差。

[`🔗 cloudflare/security-audit-skill`](https://github.com/cloudflare/security-audit-skill) · [`🔗 Cloudflare——自己搭一个漏洞 harness（2026-06-18）`](https://blog.cloudflare.com/build-your-own-vulnerability-harness) · [`🔗 SKILL.md`](https://github.com/cloudflare/security-audit-skill/blob/main/SKILL.md)

---

## 27. MuPDF 的 AES-256 文件密钥只有九比特熵——512 个候选、11 毫秒、不需要口令

- **Velocity:** ▮▮ rising
- **Source:** v12.sh / Hacker News · 97 pts · 约 7 小时前（~04:51 UTC+8 10 月 29 日）
- **Tags:** `cryptography` `pdf` `mupdf` `foxit` `randomness`

V12 的 **Rick de Jager** 发现"若干 PDF 实现从小到可以枚举的状态空间里生成 AES-256 文件密钥"。机制是随机性 bug，而不是密码被攻破。**MuPDF 1.28.5 之前**用 `time(NULL)` 给 `drand48` 播种一次，而由于 `fz_memrnd()` 取的是 `fz_lrand48(ctx) >> 17` 强转 `unsigned char`，"每个输出字节因此只来自 LCG 状态的第 **17 到 24** 位"——高位不能向下进位，所以只有 25 位能影响输出、低 16 位固定为 `0x330e`，"**只有时间戳的九位有意义**"。相差 512 秒的时间戳产生完全相同的密钥流；整个空间就 **512** 个候选，一段未优化的 Python "约 **11 毫秒**"就能搜完，文档的 `/ID` 被拿来当明文交叉校验。**Foxit PDF Reader 2026.1.3.36551** 把密钥算成 `SHA-256(uint32_le(time(NULL)) || <32 个未初始化字节> || "there")`，而那些未初始化字节"实际上是零填充、不贡献任何随机性"，加上 `/Perms` 块提供已知明文，于是"一次哈希加一次 AES 分组解密，不需要口令哈希、也不需要解密文档"就能验证一个猜测——Rust 实现于 Ryzen 9 7950X 上每秒跑 **3.7–3.76 亿**个时间戳，十年范围 **0.84 秒**，1970 年至今全扫 **4.85 秒**。**OpenPDF 3.0.5** 与 **iText 9.7.1** 都走一个 ARC4 的 `IVGenerator`，"以毫秒时间戳和 JVM 的空闲内存为种子"，而同一段流既生成文件密钥、也生成明文存在 `/U` 与 `/O` 里的 32 字节盐。

**Why it matters:** 让它成为模式而非一串 bug 的，是失败的方向。正如原文所说，"本应是相对旧的、由用户口令派生的文件密钥而言的**一次安全升级**，实践中却导致**更弱**的密钥"——修订 6 的 AES-256 用随机生成的密钥替换了口令派生的密钥，而那份随机性比它替换掉的口令更差。最可复用的部分是来源：Foxit 那种写法"已经出现在 **PDFium 的初始公开提交**里"（2014 年 5 月），而"文件头把原始代码归功于 Foxit"，于是一段二十年前的密钥派生，如今由每一个继承 PDFium 的编辑器分发。修复边界那句应当被抄进策略："这些问题已向厂商披露，MuPDF 这一例已修复。但**已经发布出去的副本无法被追溯保护**，所以这些 bug 可能仍有影响。"而修复**不是**上述框架暗示的那种一行改动——在 MuPDF 自己的源码上实测：`1.28.0` 仍是 `drand48`／`lrand48`，而 **`1.28.5` 把 `fz_memrnd` 换成了以 44 字节 `getentropy` 缓冲播种的 ChaCha20 流密码**——所以这是一次**生成器替换**；无论哪种，它都是一份永久责任，因为它产出的文件已经在流通，而解密器已经公开。

[`🔗 V12——九比特 AES 密钥的故事`](https://v12.sh/blog/the-case-of-the-9bit-aes-key) · [`🔗 HN 讨论（97 pts）`](https://news.ycombinator.com/item?id=50280722)

---

## 28. Anthropic 开源了十一个 Cowork 插件——3.37 万星、153 个未结条目，一个发布标签也没有

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending（周榜）/ GitHub API · 本周 2,612 stars · 总计 33,682
- **Tags:** `anthropic` `cowork` `plugins` `mcp` `agent-skills`

**anthropics/knowledge-work-plugins** 是"一个开源插件仓库，主要面向知识工作者在 **Claude Cowork** 中使用"，也可通过 `claude plugin marketplace add anthropics/knowledge-work-plugins` 装进 Claude Code。它提供**十一个**插件——productivity、sales、customer-support、product-management、marketing、legal、finance、data、enterprise-search、bio-research 与 cowork-plugin-management——每个都打包了"针对某一职能的技能、连接器、斜杠命令与子智能体"。连接器清单才是具体的部分：销售插件接通 Slack、HubSpot、Close、Clay、ZoomInfo、Notion、Jira、Fireflies 与 Microsoft 365；财务接通 Snowflake、Databricks、BigQuery；生物研究接通 PubMed、bioRxiv、ClinicalTrials.gov、ChEMBL、Synapse、Open Targets 与 Benchling。所有组件都"基于文件——Markdown 与 JSON，没有代码、没有基础设施、没有构建步骤"，布局固定为 `.claude-plugin/plugin.json`、`.mcp.json`、`commands/` 与 `skills/`。创建于 **2026-01-23**，最后推送 **2026-10-28**，**33,682 stars**、**3,703 forks**、**203 watchers**、**Apache-2.0**、**92 个 issue 与 61 个 PR**，以及**零个发布**。

**Why it matters:** 这是迄今关于"企业级智能体界面长什么样"最大的一次公开陈述，而它的形状本身就是论点——十一个按职能切的包，每一个都是围绕公司既有的 SaaS 资产做的一层封装，这意味着这个插件实质上是一份**带说明文字的 MCP 连接器清单**。它回答了一个近期 skill 仓库留下的问题：真正的持久单元不是 `SKILL.md`（本刊至今已报道过五个仓库，产物只是一个 Markdown 文件、而星数是传播事件），而是**职能边界加上工具清单**，因为那才是安全团队能审的组合。有两处空缺值得留意。**它没有发布**，所以 `main` 就是唯一的发布，"从市场安装"是一句关于分支的话——对一个其余方面每天维护的 Apache-2.0 仓库，这是标准提醒。而 README 自己的措辞设定了上限："这些插件是通用的起点。当你按公司实际运作方式做定制后，它们才会变得有用得多"——一个通用的法务或财务插件编码的是某个人的流程，只不过不是你的流程，而两者之间的差距正是责任所在。考虑到每个插件都通过 `.mcp.json` 持有进入 CRM 或数据仓库的活凭据，该审的是那个文件，不是那些 skill。

[`🔗 anthropics/knowledge-work-plugins`](https://github.com/anthropics/knowledge-work-plugins) · [`🔗 Claude Cowork 插件目录`](https://claude.com/plugins/) · [`🔗 GitHub Trending（周榜）`](https://github.com/trending?since=weekly)

---

## 29. AlpineBSD 把 AI 来源审查做进了 `apk`——四个仓库、六个元数据标签，而它们一个都不在已发布的索引里

- **Velocity:** ▮▮ rising
- **Source:** wiki.alpinebsd.org / Hacker News · 188 pts · 约 14 小时前（~22:30 UTC+8 10 月 28 日）
- **Tags:** `ai-policy` `netbsd` `alpine` `package-manager` `provenance`

**AlpineBSD** 是一个新操作系统，以 **NetBSD 内核**为基础，用户态"受 Alpine Linux 启发"——`apk-tools`、`busybox`、偏好 GNU make 而非 BSD make、以 `s6` 作 init 并计划补充 OpenRC——其公开目标是"使其能够**尽可能少地使用 AI 生成的软件**"。机制不是一个政策页面，而是一次**仓库拆分**。四个仓库承载不同的容忍度：`base` 与 `main` 是 "Clean"，`tainted` 是 "Tainted"，`community` 是 "Clean and/or tainted dependencies"，并且"依赖关系在该表中向上流动，所以 community 可以依赖 tainted，反之不行"。任何"在代码、文档、二进制或其他资产中**任一部分**包含生成式 AI 工具（如 LLM）输出"的软件，"对我们而言即被视为**'污染'**"。包本该携带来源元数据，而页面列出的是 **六个** `apk search` 过滤标签、不是三个：`genai:clean`、`genai:pinned`（"固定到最后一个未被污染的版本"）、`genai:indirect-build`（"经由构建期依赖间接污染"）、`genai:indirect-runtime`（"经由运行时依赖间接污染"）、`genai:indirect-check`（"经由测试套件依赖间接污染"）与 `genai:tainted`。**2026-10-29 20:25 UTC+8 一手核查：六个标签一个都不出现在四个仓库的 `APKINDEX` 里**——`base` **427**、`main` **153**、`community` **85**、`tainted` **108** 个包，`genai:` 字段 **0** 个——所以今天的 `apk search genai:clean` 没有可匹配的对象。`apk add` 的拒绝是真实的，但走的是另一套机制：起作用的是**仓库标签**（在 `/etc/apk/repositories` 里以 `@tainted …` 启用 tainted 仓库），它才会把间接污染的依赖变成错误，直到你显式点名（`apk add python3@tainted`）。

**Why it matters:** 这是我所见第一个把 AI 来源规则表达为**依赖约束**而非许可证条款的包管理器，而六个标签正是设计显露之处——尽管按本次核查，它们目前还是文档，不是元数据。`genai:indirect-build` 之所以存在，是因为污染会经由**构建**输入传播而不只是运行期输入，这是多数供应链策略略过的区分。`genai:pinned` 承认一个干净的包可能在其下一个上游版本变得被污染——一个**随时间变化**的判定，任何许可证都无法表达，也没有任何 SBOM 字段目前能承载。约束条件就在同一页上，应与设计一并引用："AlpineBSD **仍在开发中**。目前**没有可用的安装器**"，而硬件警告异常直白——NetBSD 内核"硬件支持零零散散，远不如 Linux。你不能指望 AlpineBSD 在你手边随便一台电脑上跑起来"。不可强制的边界也该在有人把它当范本引用之前点名：规则衡量的是**工具吐出了什么**，所以由维护者审阅并重写的模型辅助工作算被污染，而一个人凭记忆写下模型的建议则不算——这套策略在包的边界上可审计，在写作的那一端则沉默。

[`🔗 AlpineBSD 维基`](https://wiki.alpinebsd.org/) · [`🔗 AlpineBSD 的 AI 政策（仓库容忍度、`genai:*` 元数据）`](https://wiki.alpinebsd.org/ai-policy) · [`🔗 HN 讨论（188 pts）`](https://news.ycombinator.com/item?id=50274251)

---

## 30. Cartesia 的 H-Net 让字节可与 BPE 竞争——验证损失 1.3×、代码 2×、对 SmolLM3 超过 10×

- **Velocity:** ▮▮ rising
- **Source:** Cartesia Research / Hacker News · 45 pts · 发布于 2026-10-28
- **Tags:** `tokenization` `byte-level` `scaling-laws` `mamba` `research`

Cartesia 发布了关于**分层网络（Hierarchical Networks, H-Nets）**两篇中的第一篇：字节级模型自己学习分块，而不使用 BPE 分词器——"分词器这类手工设计的编码步骤……严重妨碍了它们从底层数据端到端地学习"。对照实验在控制变量上相当严谨：**70/20/5/5** 的英文/代码/数学/多语混合按**字节**计量，每个样本"同时按字节和 BPE token 处理、在相同边界切分"，用标准的 **bits-per-byte** 指标，并且——这一步让标题打了折——还**在语料上重训了一个 BPE 分词器**，它"在验证损失与下游评测上都带来了约 **1.1×** 的算力增益（所以 H-Net 相对现成标准分词器的算力倍数还要更高！）"。在这个更硬的基线上，仅替换分词部分就得到验证损失 **1.3×**、代码 **2×**、分布外 **2×**、"域外代码最高 **5×**"。第二篇对 **SmolLM3** 放大做实验，报告"**>10× 的算力与数据效率**"提升，参数量 **3.67B** 对 **3.08B**，算力匹配"在 **2% FLOPs/byte** 以内"。

**Why it matters:** 让这件事可读的是它给出的比较锚点，而文章自己提供了它们——它拿自己对照 Kimi 已发表的 **Kimi Delta Attention（1.16×）** 与 **注意力残差（1.25×）** 倍数，这是在 2026 年定位一项架构主张的正确方式，而不是对着一个标题数字。代价是写出来的而非埋起来的：外层编码器与解码器"约占 H-Net FLOPs 的 **43%**（对照分词 Transformer 里嵌入与 LM head 的 **8%**）"，主网络看到约 **7.6×** 的压缩（对照 Llama-3 每 token 约 4.5 字节），所以节省是真的，但花在了新层上、没有存进银行。最诚实的局限是方法论层面的，而且被点名："要匹配所有维度是**不可能的**，因为参数与算力花在了非常不同的地方"，于是选定 FLOPs/byte 作为受控轴——这意味着 3.67B 对 3.08B 的参数差距是算力匹配所抵消不了的真实成本。字节在 frontier 规模上是否胜过 BPE 仍未定；这篇文章确立的是：在 3B 规模、把分词器优势移除之后，差距不是噪声。

[`🔗 Cartesia——从 Token 到字节 I：分层网络的扩展律`](https://www.cartesia.ai/blog/from-tokens-to-bytes-part-1) · [`🔗 HN 讨论（45 pts）`](https://news.ycombinator.com/item?id=50278253)

---

## 31. Concordat 把智能体的协议当作类型系统来强制——而基线在 50 个任务里有 13 个跳过了确认

- **Velocity:** ▮ steady
- **Source:** arXiv 2610.37461 · 提交于 2026-10-27
- **Tags:** `arxiv` `agents` `type-systems` `session-types` `tau-bench`

**Concordat** 是一个 Python 库，"把智能体视为一个接口是**有限状态协议**的对象，取 typestate 与 session types 的精神，并在运行时对模型强制执行该协议"。约束有后果动作的规则——"在改动任何东西之前取得客户的明确确认"——通常是"写在提示里，并且只以模型愿意遵守的程度被遵守"。Concordat 改变的是规则所在的位置：每一轮"只向模型提供在当前协议状态下**合法**的工具"，该集合之外的调用"在产生副作用**之前**即被拒绝"，留给人类决定的事项"只能被**请求**"。协议在定义时即被检查，并且"如果一个子类可能绕过父类的协议，该子类会被**拒绝**，这是 Liskov 替换原则的一种行为形态"。评测在 tau-bench 的 50 个航司任务上加了"**施压让智能体跳过确认的模拟客户**"：标准智能体"在 gpt-4.1 下有 **13/50** 个任务、在 Claude Haiku 5.5 下有 **29/128** 次任务运行中，在没有得到所需 'yes' 的情况下做了改动；Concordat 智能体**一次也没有**，且任务成功率没有显著差异。"

**Why it matters:** 该被带走的数字不是"13/50"，而是下一句——"**tau-bench 自己的奖励没有检测出其中大多数违规**"。一个只评任务完成的基准，看不见一个让任务照常完成的策略违背，于是标准的安全测量对这种失败在结构上是盲的，而这种失败是由**客户**诱发的、不是越狱。这让"施压"这一框架成为贡献本身：智能体没有故障，它是**服从了**，正是本刊 10 月 27 日"乐于助人的智能体问题"从另一面描述的情形。类型系统这一招在修复形态上也是对的，因为它把指令从提示里——在那里它与上下文里的一切竞争——挪到了工具清单里，而在那里没被提供的调用根本发不出去；这是一种连无视指令的模型也攻不破的防御，也正是为什么"在产生副作用之前即被拒绝"被表述为一种**顺序保证**而不是过滤器。摘要没有说的有两点：在确认确实已给出、协议也允许该步骤的任务上误拒的代价是多少；以及在 50 个航司任务之上增加的那 18 个任务，是否足以把"策略改善"与"模型只是觉得那些客户很烦"区分开来。

[`🔗 Concordat：面向 LLM 智能体的类型化会话（arXiv 2610.37461）`](https://arxiv.org/abs/2610.37461) · [`🔗 全文（PDF）`](https://arxiv.org/pdf/2610.37461)

---

## 32. ClaimNov 以 1.5% 的误报率抓出 97% 的伪装论文——而旧检查只能说"整个否掉"

- **Velocity:** ▮ steady
- **Source:** arXiv 2610.36511 · 提交于 2026-10-27
- **Tags:** `arxiv` `novelty` `peer-review` `agents` `evaluation`

**《AI 科学家知道什么是新的吗？》** 问的是：一条 AI 科研流水线该如何判定一个生成的想法的确具有新意。作者建立"一个用**时间性真值**在**提案层与主张层**双重评估新颖性检查的分析框架"，使用四个数据集共 **1,060 个提案**，"由已发表论文、审稿争议，以及后来与学界实际发表内容相符的生成想法构成"。用这套真值审查现有检查，得到的发现是："对非新颖工作有高拒绝率的检查，往往也对后来被人类研究者实现的想法定有**高误报**"；而为整体评估提案而建的检查"只能通过**否掉整个提案**来指认主张层的先例"。他们的替代方案 **ClaimNov** "以 **1.5%** 的误报率抓出 **97%** 的伪装论文"，并且"其主张层新颖性画像把 LLM 评审的误报从 **11.8% 降到 1.5%**"。因为判定建立在主张层证据上，它能保留那些建立在既有贡献之上的提案：它只否掉"**3%** 的、贡献被审稿人质疑的 ICLR 接收论文"，并能在一份含有一处拼接先例的 100 个新颖提案中保留 **91** 个，"而现有最强检查是 **76** 个"。

**Why it matters:** 这里的区分性失败不是精确率而是**粒度**，而这与本刊 10 月 27 日关于退役 agent skill 的报道从另一端看到的是同一件事——一个整件级的分数无法告诉你哪一部分错了。一个只能接受或拒绝整个提案的新颖性闸门，在生成循环内部是不可用的，因为对"主张 3 是已有工作、主张 1、2、4 是新的"的正确动作是重写主张 3，而提案级的判定只会把另外三个一起丢掉。91 对 76 是最该转引的比较，因为它在固定住抓出率的前提下衡量了**活下来的是什么**，而那是科研流水线真正消费的量。摘要没有做的是给这个检查定价：ClaimNov 是用来过滤生成想法的，那么它自身每个提案的延迟与 token 成本，决定了它究竟能不能待在循环里——而 1,060 个提案上 1.5% 的误报率，是一次小语料上的实测率，不是对一个随领域移动而漂移的分布的承诺。

[`🔗 AI 科学家知道什么是新的吗？（arXiv 2610.36511）`](https://arxiv.org/abs/2610.36511) · [`🔗 全文（PDF）`](https://arxiv.org/pdf/2610.36511)

---

## 33. Stack Overflow 单月提问跌破 1000——而八月还在线上

- **Velocity:** ▮ steady
- **Source:** Stack Exchange API 查询 / Hacker News · 191 pts · 约 4 小时前（~07:35 UTC+8 10 月 29 日）
- **Tags:** `stackoverflow` `community` `metrics` `q-and-a` `decline`

一条发在 Stack Exchange Data Explorer 上、被以"StackOverflow 现在单月提问**不到 1000 条**"之名转到 HN 的查询，把该站的提问量放到了它建站以来最低。我没能打开 SEDE 图本身——该页面对普通抓取返回 Cloudflare 的 "Just a moment…" 拦截页——所以下面的计数取自 **Stack Exchange API 自己的 `total` 字段**，那是同一份底层数据、且无需修改查询即可复现：**2026 年 9 月 961** 条、**8 月 1,019** 条、**7 月 1,175** 条，对照 **2025 年 10 月的 5,263** 条与 **2025 年 9 月的 5,072** 条。作为量级参照，**2020 年 10 月**返回 **141,749** 条。

**Why it matters:** 这个标题是对的，但略微跑在数据前面，而这点差距本身值得保留。9 月是近期记忆里第一个低于该线的月份；**8 月还在线上，为 1,019**，所以诚实的表述是"在最近一个完整月份里，趋势越过了 1000 这条线"，而不是把"该站现在每月不到 1000 条"当成稳态——在一个阈值上差百分之七，与形成一种持续状态并不是同一个判断。无可争议的是方向与幅度：同比下滑 **82%**，相对 2020 年下滑 **99.3%**，而这一切发生在一个整个产品就是"提问"的网站上。有两种解释彼此相容，而这个数字无法把它们分开——首轮答案向聊天模型迁移，以及该站自身对新手有据可查的不友好；而本刊 10 月 26 日关于**评审可靠性**的报道是第三种：一个惩罚提问的答案平台，无论别的什么可用，都会生产更少的提问。关于单位还要补一句提醒，因为这是本刊反复出现的坑：这些是**提问**数，不是访问量也不是回答数，所以一个正在失去提问、却因历史语料而留住读者的网站，看起来会与这里完全相同。

[`🔗 Stack Exchange Data Explorer——该帖背后的查询`](https://data.stackexchange.com/stackoverflow/query/1926661) · [`🔗 Stack Exchange API——按月统计的提问 `total``](https://api.stackexchange.com/2.3/questions?site=stackoverflow&filter=total) · [`🔗 HN 讨论（191 pts）`](https://news.ycombinator.com/item?id=50282454)

---

## 34. LinkSwift 一天涨 1,616 星，起因是百度改了一个 CSS 类名

- **Velocity:** ▮ steady
- **Source:** GitHub Trending（日榜）/ GitHub API · 今日 1,616 stars · 总计 35,239
- **Tags:** `userscript` `chinese-oss` `scraping` `baidu` `maintenance`

**hmjz100/LinkSwift**——"一个基于 JavaScript 的网盘文件下载地址获取工具"——正登上 GitHub Trending，**今日 1,616 stars**、总计 **35,239**、**2,501 forks**、**90 watchers**、**AGPL-3.0**，创建于 **2022-08-10**，最后推送 **2026-10-27**。它是一个 Tampermonkey 用户脚本，支持八个国内网盘——百度、阿里云、中国移动、天翼、迅雷、夸克、UC、123——并配有一套"会员青春版"扩展脚本。多数用户安装的正式版是 **2026-02-18 的 v1.1.3**，已经八个月了；用户脚本本身从 `raw/main` 安装。触发点在跟踪器而不是发布记录里：**10 月 25 日**提交的 issue **#537** 标题为"百度网盘分享页改版导致「下载助手」按钮不出现（CSS选择器 `.module-share-top-bar` 已失效）"——百度改了分享页，选择器不再匹配，注入的按钮就再不出现。**10 月 28 日**落了两个 PR，其中一个是 "refactor: introduce download task adapters and userscript bridge"；未结条目为 **38 个 issue 对 11 个 PR**。

**Why it matters:** 这是用户脚本维护模式的自然形态，它同时解释了星数之高与发布之稀。一个靠匹配网站私有 DOM 工作的工具，其半衰期由该网站的部署节奏决定，所以 releases 页里的版本号几乎无意义——用户实际拿到的产物是今早 `raw/main` 上的内容，而二月的 v1.1.3 是一件历史物件。星标速度不是库意义上的采用：它是一种**通知机制**，是 3.5 万人在这条选择器失效时重新找到仓库的方式，这也正是为什么这个数字会在百度发布改版的那一周冲高。放在本刊过去两周的语境里，它也是"一个 Markdown 文件、一万颗星"那种模式的反例——一个拥有八年适配器代码、活跃 issue 队列，以及一个用户脚本其实并不必需的许可证选择（AGPL-3.0）的仓库。对任何监控爬虫健康度的人，通用教训是：**看 issue 跟踪器的速度，而不是发布标签**，因为对这一类软件而言，跟踪器就是变更日志。

[`🔗 hmjz100/LinkSwift`](https://github.com/hmjz100/LinkSwift) · [`🔗 issue #537——百度分享页改版使分享页选择器失效`](https://github.com/hmjz100/LinkSwift/issues/537) · [`🔗 发布记录（最新 v1.1.3，2026-02-18）`](https://github.com/hmjz100/LinkSwift/releases)

---

## 35. 腾讯 Hy-SimulMT 边说边译——约 3 秒延迟，36 个语言标签却只有一组语言对

- **Velocity:** ▮ steady
- **Source:** Hugging Face / 腾讯混元 · 发布于 2026-10-26 · 30B-A3B MoE，FP8
- **Tags:** `tencent` `simultaneous-translation` `speech-to-speech` `moe` `apache-2`

**Hy-SimulMT** 是腾讯混元的实时同传模型，**2026-10-26** 以 **30B-A3B MoE、FP8** 发布，许可证 **Apache-2.0**，带**实时声音克隆**，"保留说话人的音色特征"。它"持续接收进来的音频，在说话人讲话的同时进行翻译，同时产出译文本与语音"，GitHub 上提供推理（`SimulInfer`）与训练（`SimulTrain`）工具；语音输出与声音克隆需要另行配置 TTS 服务。在 **RealSI** 长音频基准上它报告"**StreamLAAL** 约 **3 秒**，是所列系统中最低"，**GEMBA** 分数高于所比较的开源模型"以及五个商业 API 中的**四个**"。在四个短音频基准上，这张表呈现出混合图景：**FLEURS 90.3**，对照 Qwen3.8-LiveTranslate **88.4**、Gemini3.5-LiveTranslate **92.4**；**CoVoST2 75.5**，对照 Qwen 的 **82.1**；**ACL6060 81.2**；**RealSI-Sentence 84.7**，为表内最高。人工对照使用了**新采集的 18 段中英文录音**（各约 6 分钟，覆盖十个领域）与**六名译员**（三名 CATTI 一级、三名二级），并"在每个级别中取三名译员的最高分"作比较。

**Why it matters:** 模型卡的免责声明比多数同类写得更好，应当与结论一并引用——"这些发现仅适用于本次测试所用的样本、参与的译员与评测设置。它们**不**构成对语音质量、音色相似度或其他维度的全面评估。" 最后那句在这里尤其要紧，因为声音克隆是主打功能，而评测完全没有衡量它。还有两点模型卡没有点出的读法。**指标不是听起来的那样**："StreamLAAL 并不等于首个语音输出的时间"，所以 3 秒是流上的平均延迟，不是启动延迟，该模型不能拿这个数字去和一条 TTS 流水线的首包音频时间相比。**语言覆盖是 36 个标签、一组语言对**：卡片的 `language:` 块列出 36 个代码——从 `zh`、`en` 一直到 `ug`、`bo`、`kk`——而引言描述的是"**中文与英文之间**的双向语音到语音翻译"；这些标签描述的是分词器或更广的 Hy 家族，把它们读成 36 个受支持的语言对就是错的。另外那张表的排版惯例也值得当成习惯记下："Hy-SimulMT 整行加粗以突出我们的模型"，所以该行内的加粗不表示任何东西，只有跨列的最大值才可比。

[`🔗 tencent/Hy-SimulMT-30B-A3B-FP8 模型卡`](https://huggingface.co/tencent/Hy-SimulMT-30B-A3B-FP8) · [`🔗 Tencent-Hunyuan/Hy-SimulMT（SimulInfer、SimulTrain）`](https://github.com/Tencent-Hunyuan/Hy-SimulMT)

---

## 36. MacBook Pro 用上触屏与串联 OLED——而芯片阶梯在内存带宽上反转

- **Velocity:** ▮ steady
- **Source:** Apple / Hacker News · 523 pts · 约 11 小时前（~01:10 UTC+8 10 月 29 日）
- **Tags:** `apple` `macbook-pro` `m5` `hardware` `local-inference`

Apple 发布了 **MacBook Pro with PROLED XDR Display**，"采用突破性的**串联 OLED** 显示屏，带**触控**、**灵动岛**、重新设计的散热系统、增强的音频系统与更窄的屏幕边框"。两个尺寸都比上一代更轻——14 英寸 **3.0 磅**、16 英寸 **4.0 磅**——续航"最长 **24 小时**"，**11 月 6 日**开售、现已开启预订。亮点介绍列出的芯片是 **M5 Pro 与 M5 Max**；该产品线的技术规格页则列出三个形态迥异的家族：**M6**（12 核 CPU，2 超级核 / 4 性能核 / 6 能效核，12 核 GPU，"最高 **170 GB/s**"带宽）、**M5 Pro**（15 核 CPU、**没有能效核**、16 核 GPU、**307 GB/s**，可配到 18 核 CPU / 20 核 GPU）、**M5 Max**（18 核 CPU、32 核 GPU、**460 GB/s**，可配到 40 核 GPU 时的 **614 GB/s**）。内存上限分别是 M6 的 16/24/32 GB、M5 Pro 最高 **64 GB**、40 核 M5 Max 的 **128 GB**；存储最高 **8 TB**（Max）。

**Why it matters:** 带宽这一列，是决定这台机器能否在本机跑模型的规格，而它的排序反直觉到会让任何把芯片命名当成阶梯的人踩坑。**M6 最高 170 GB/s**，而 **M5 Pro 到 307**、**M5 Max 到 460–614**——也就是说数字更新的那颗芯片，在本刊关注的这类工作负载上并不是更快的那颗；一个为推理买了 14 英寸、并选了"最新芯片"的人，拿到的大约是 M5 Pro 配置三分之一的带宽。核心拓扑进一步印证：M5 Pro 与 M5 Max **完全没有能效核**，这是一台以牺牲空闲续航换取持续吞吐的笔记本，而 Apple 自己给出的续航数字是"视频播放"而非混合负载。在把 "PROLED XDR" 当成一项显示技术主张之前，还有两处要核对：规格块里仍然写着 14 英寸的 "Liquid Retina XDR display"、**3024×1964**、ProMotion 至 **120 Hz**，所以品牌名与面板名不是同一个字符串；而笔记本上的**触屏**是一个会带来软件后果的改动——这个平台迄今交付的每一套 AppKit 交互模型都假设显示器不可触摸，而"触控"出现在亮点列表里，并不等于对操作系统会如何使用它作出任何陈述。

[`🔗 Apple——MacBook Pro with PROLED XDR Display`](https://www.apple.com/macbook-pro/proled-xdr-display/) · [`🔗 MacBook Pro 技术规格（芯片与带宽表）`](https://www.apple.com/macbook-pro/specs/) · [`🔗 HN 讨论（523 pts）`](https://news.ycombinator.com/item?id=50276940)

---

## 37. 时间变异性高的事实学得晚，最终却好 7.3 分——36 个设置里有 34 个成立

- **Velocity:** ▮ steady
- **Source:** arXiv 2610.37631 · 提交于 2026-10-27
- **Tags:** `arxiv` `pretraining` `data-curation` `knowledge` `evaluation`

**《预训练过程中什么在变好？》** 用**时点模型（point-in-time models）**——在不同年份的网页快照上训练的模型——来问不同种类的知识在一次预训练中是如何被习得的。工具是**时间变异性分数（TVS）**，"定义为某条目在跨模型负对数似然上的变异系数"，其中"分数越高，说明该知识在不同年份的网页文本中可能被表示得越不一致"。在六个基准与跨多个开源家族的六个模型之后，模式是："低 TVS 与高 TVS 的条目在训练**早期学得相似**，但高 TVS 的条目**在后期改善更快**。在预训练结束时，高 TVS 条目在 **36 个**模型—基准设置中的 **34 个**优于低 TVS 条目，平均优势为 **7.3 个**机会归一化准确率百分点"，并且该效应"在知识密集型任务上最稳健，**即使在比较难度相近的条目时**也是如此"。

**Why it matters:** 这个结果反转了"答案在语料中变过的不稳定事实、是模型处理得最差的噪声"这一直觉，而让它可信的对照恰恰在最后一个从句里：比较大致固定住了难度，所以 7.3 分不是"简单事实得分更高"。作者给出的机制与曲线相符而不是与端点相符：两类在早期学得同样快、在后期分岔，这正是"模型先拟合语言的稳定结构、之后才有足够容量承载随版本变化的表层"所预测的——而那一层，要求模型同时见过**旧答案**与**新答案**。对数据治理而言，含义既不舒服也有用：这里测出的时间变异性是**跨时间的语料**属性，所以只在单快照上训练的模型，不只是错过了更新，而是错过了那个教会它"更新"这件事的训练信号。局限在于 TVS 是从模型而非从数据算出来的，所以用它给一份候选语料打分要花一次训练——这是一个用来理解预训练的诊断量，正如同摘要所框定的那样，还不是一个能直接用在爬取结果上的过滤器。

[`🔗 预训练过程中什么在变好？（arXiv 2610.37631）`](https://arxiv.org/abs/2610.37631) · [`🔗 全文（PDF）`](https://arxiv.org/pdf/2610.37631)

---

## 38. Cisco 的 SSL VPN 零日已在野利用——按厂商自己的算术是 8.6，而 51,000 台 ASA 设备仍在互联网上应答

- **Velocity:** ▮▮▮ trending
- **Source:** Cisco PSIRT / NVD / BleepingComputer · 公告发布于 2026-10-28 19:15 GMT
- **Tags:** `cisco` `zero-day` `cve` `ssl-vpn` `denial-of-service`

**CVE-2026-76418** 是 Cisco Secure Firewall ASA 与 FTD 软件 Remote Access SSL VPN 服务中的一个拒绝服务漏洞，而 Cisco 公告的页头把两件要紧的事并排列出：**"First Published: 2026 October 28 19:15 GMT"**，以及 **"In October 2026, the Cisco PSIRT became aware of active exploitation of this vulnerability."**（2026 年 10 月，Cisco PSIRT 获悉该漏洞正被活跃利用。）机制窄到可以精确陈述：它要求某个 tunnel group 启用了 `webvpn` 并配置了**二次认证（secondary authentication）**，而公告的成因句是"logic errors when secondary authentication is configured on a tunnel group"（在 tunnel group 上配置二次认证时出现的逻辑错误）。一个构造好的、打向 SSL 远程访问 VPN 的请求就会让设备重载。Cisco 自己的数字是 **CWE-690**（未检查的返回值）与 **CVSS 3.1 基础分 8.6**，`AV:N/AC:L/PR:N/UI:N/S:C/C:N/I:N/A:H`——机密性与完整性未受影响，可用性为 High，scope 为 Changed。**"Version 1.0: Final"** 与 **"No workarounds available"**（无可用绕过方案）；公告给出的缓解措施是在 `DefaultWEBVPNGroup` 或任何用户自定义的 tunnel group 列表上关闭二次认证。BleepingComputer 的报道补上了暴露面数字：Shadowserver"tracks more than **51,000** Cisco ASA SSL VPN devices exposed online"（追踪到超过 51,000 台在线暴露的 Cisco ASA SSL VPN 设备）。

**Why it matters:** 对这个 bug 的诚实描述是**一个带远程触发器的可靠性缺陷**，而记录的形态也印证了这一点——`C:N/I:N/A:H` 是一次崩溃，不是一次入侵，CWE-690 说明该代码路径解引用了一个失败的返回值，而不是存在逻辑设计缺陷。这正是为什么来源必须被完整引用：NVD 的记录处于 **`Received`** 状态，发布于 **2026-10-28T20:18:47Z**，而唯一的度量是 Cisco 的 `psirt@cisco.com`，位于 **Secondary** 槽位——所以 8.6 是厂商的算术被转手重发，且尚不存在任何 `nvd@nist.gov` 度量。请把它读作 **CNA 赋分，而非 NVD 已分析**。scope-Changed 这一位是值得再看的那个部分：在一个只涉可用性的向量上出现 `S:C`，正是把分数抬到 7.x 区间之上的原因，它意味着 Cisco 判断该重载会影响 VPN 服务本身之外的组件。对运维者而言这个决策几乎免费——一台上线后在未认证数据包下就会重载的设备，就是一台可以被有意打垮的设备，而这已是本刊自 ArcaneDoor 行动以来见到的第五个被在野利用的 Cisco ASA/FTD 零日，这才是模式本身，而不是那条新闻。

[`🔗 Cisco 安全公告 cisco-sa-asaftd-tunnel-dos-s6mgkb75（CWE-690，CVSS 8.6，"Version 1.0: Final"）`](https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-asaftd-tunnel-dos-s6mgkb75) · [`🔗 CVE-2026-76418 的 NVD 记录（Received，Cisco 赋分 8.6）`](https://nvd.nist.gov/vuln/detail/CVE-2026-76418) · [`🔗 BleepingComputer——Cisco 警告有防火墙零日被用来打崩 SSL VPN 设备`](https://www.bleepingcomputer.com/news/security/cisco-warns-of-firewall-zero-day-exploited-to-crash-ssl-vpn-devices/)

---

## 39. 一条 Android WAP Push 短信零交互就能打断你的通话——Google 将其归类为"Non-Security"，因此没有可打的 CVE

- **Velocity:** ▮▮▮ trending
- **Source:** smsofdeath.com / Hacker News · 135 pts · 约 5 小时前（~06:00 UTC+8 10 月 29 日）
- **Tags:** `android` `telephony` `zero-click` `disclosure` `denial-of-service`

一位以 **Mark Blaszczyk** 名义发表的研究者于 **10 月 29 日**披露了 **SMS of Death**，此前走完了一条 **90 天**的时间线，起点是 **2026 年 5 月 5 日**向 Google 的 Android & Devices VRP 提交的报告。该 bug 是一条五字节的 **WAP Push** 短信：`WapPushOverSms.decodeWapPdu()` 把 WSP 头部长度当作 `uintvar` 读出、得到一个 `long`，然后在 `WapPushOverSms.java:217` 处不经任何范围检查地强转为 `int`——`int headerLength = (int) pduDecoder.getValue32();`——随后在第 244 行把它当作数组长度使用，`byte[] header = new byte[headerLength];`。载荷 `88 80 80 80 00` 解码为 `0x80000000`，作为有符号 32 位整数即 **−2147483648**，于是这次分配在电话主线程上抛出未捕获的 `NegativeArraySizeException`，杀掉 `com.android.phone`。这条消息是一条**数据短信**：它从不出现在 Messages 里，发送方号码从不显示，受害者什么也不用做。进行中的通话以 `DisconnectCause CS_DEATH` 结束；单条消息在进程重启期间造成 **1–2 秒**的无服务。厂商那一行才是重点：状态 **"Won't Fix"**，归类 **"Non-Security"**，**CVE: None**。

**Why it matters:** 有意思的部分是越过一次崩溃之后的那段升级，因为它把一次 2 秒的中断变成一次持久的中断，而它完全不在崩溃路径上。运营商的补发机制会重发未确认的消息，从而再次把手机打崩——该页面报告单条消息在其测试中造成"for up to a week in testing"（测试中长达一周）的间歇性中断——而连续发送的**约 30 条**消息会把崩溃与电话提供程序对短信存储的写入交织在一起，撞上一个会破坏短信存储背后 SQLite 数据库的竞态。页面自己的总结是**约 20 条**消息"render the device unusable for an extended period"（使设备在较长一段时间内不可用），而真正能扛过重启的是那次数据库损坏。测试覆盖"Pixel 9 on April 2026 firmware, various Samsung Galaxy and A-series"（2026 年 4 月固件的 Pixel 9，以及多款三星 Galaxy 与 A 系列），复现率为 **100%**。有两条限制应当与这一发现并列而不是压在其下：归类决定是 Google 的，而页面把它作为表格里的一行陈述、背后没有任何厂商原话，所以 "won't fix" 是研究者对一个 VRP 结果的转述，而不是你能从 Google 页面上 grep 到的句子；而持久性主张是作者自己的测试，不是独立复现的结果——对于一次从未拿到 CVE 的披露来说，这是常态。这一类教训可复用：**把攻击者可控的长度未经检查地窄化强转成分配尺寸**，在任何把消息分发器跑在主线程、又没有异常边界的地方都是一个单包 DoS，而一个会被操作系统重启的崩溃，仍然是一个攻击者可以排程的崩溃。

[`🔗 SMS of Death——writeup、影响表、SQLite 竞态（2026-10-29 披露）`](https://smsofdeath.com/) · [`🔗 HN 讨论（135 pts）`](https://news.ycombinator.com/item?id=50285452)

---

## 40. Orange Tsai 的 Edge 完整链用了五个逻辑 bug、零内存破坏——而 ZDI 自己的公告说四个

- **Velocity:** ▮▮ rising
- **Source:** blog.orange.tw / Hacker News · 107 pts · 约 4 小时前
- **Tags:** `browser` `edge` `pwn2own` `logic-bug` `sandbox-escape`

Orange Tsai 于 **10 月 28 日**公开了他为 **Pwn2Own Berlin 2026** 构建的那条链："a completely handmade, logic-only Microsoft Edge Full Chain, with no memory corruption, and no AI at all!"（一条完全手工打造、纯逻辑的 Microsoft Edge 完整链，没有内存破坏，也完全没有 AI！）他在文中引用的 ZDI 公告则写着"chained **4 logic bugs** to achieve a sandbox escape on Microsoft Edge, earning **$175,000** and **17.5** Master of Pwn points"（串联 4 个逻辑 bug 在 Microsoft Edge 上完成沙箱逃逸，赢得 175,000 美元与 17.5 分 Master of Pwn），而他自己的账是"the whole chain is made up of **five bugs and two Windows features**"（整条链由五个 bug 与两个 Windows 功能构成）。入口是 `EdgeCAGuidanceNavigationThrottle`——一个 Edge 独有的导航节流器，服务于企业版 Entra ID 条件访问功能，当一次导航起源于 Microsoft 自有域（例如 `login.live.com`）且 URL 匹配携带 `?email={email}&switch_profile={url}` 的内部格式时触发。如果 email 与当前配置文件匹配，该节流器就会"grab[s] the URL you were originally heading to from `switch_profile=url`"（从 `switch_profile=url` 里抓取你原本要去的 URL），并用 Chromium 内部的 `NavigateParams` API 发起一次新的导航——而它来自 **Browser Process**，这才是那个原语：它能到 `edge://settings`、`devtools://…`，以及渲染器够不着的 `javascript:` 伪协议。

**Why it matters:** 手法才是故事，而**类别**才是教训——Tsai 自述为何挑这个角落的那句框架就是可复用的发现："out of the **3,000+** CVEs Google Chrome has fixed over the past five years, there are only **fewer than 20** related to them"（Google Chrome 在过去五年修复的 3,000 多个 CVE 里，与之相关的不到 20 个）。导航节流器住在浏览器进程里，拦截来自任一进程的每一次导航，而五年的修 bug 流量几乎没碰过它们，这就是"审计不足的攻击面"的定义。四个与五个之间的差异值得陈述而不是抹平，因为它是**数逻辑 bug**与**数 bug 加功能**之间的差别：这条链的杠杆里包含两个根本不是缺陷的 Windows 功能，所以需要缺陷数的读者会得到 4 或 5，取决于他打开的是哪份文档，而 ZDI 的数字才是与奖金绑在一起的那个。另一条诚实的注记是这篇 writeup 所*没有*主张的——它没有声称 LLM 找不到这类链，只声称这一条不是由 LLM 找到的，而那个 Pwnie 奖项框架（"maybe everyone thinks LLMs can already pwn everything in the AI era"，也许在 AI 时代人人都认为 LLM 已经能攻破一切）是关于这个领域情绪的观察，不是一次测量。

[`🔗 Orange Tsai——The Last Proof of Human Craft：只用逻辑 bug 锻造一条 Microsoft Edge 完整链`](https://blog.orange.tw/posts/2026-10-the-last-proof-of-human-craft-browser-full-chain/) · [`🔗 HN 讨论（107 pts）`](https://news.ycombinator.com/item?id=50285319)

---

## 41. Volt Typhoon 的"Silent Train"是一张中继网络，不是僵尸网络——四个已确认零日与一个可能零日，被追踪了三年

- **Velocity:** ▮▮ rising
- **Source:** Lumen Black Lotus Labs / BleepingComputer · 报告发布于 2026-10-28
- **Tags:** `volt-typhoon` `zero-day` `apt` `critical-infrastructure` `threat-intel`

Lumen 的 **Black Lotus Labs** 于 10 月 28 日发布 **Silent Train**，描述了一个它称"tracked ... for the past three years"（追踪已三年）并用于通知"hundreds of victims in key sectors"（关键行业数以百计的受害者）的框架。它的设计刻意不是僵尸网络："unlike traditional botnets, proxy networks or operational relay box (ORB) networks, Silent Train is built around **rapidly rotating chains of compromised SOHO, IoT and enterprise devices that are exploited on demand, used against carefully selected targets, cleaned up after each operation and continuously refreshed**"（与传统的僵尸网络、代理网络或 ORB 中继盒网络不同，Silent Train 围绕的是一条条快速轮换的链：被攻陷的 SOHO、IoT 与企业设备，按需被利用、用于精心挑选的目标、每次行动后清理、并持续补充更新）。行动从美国境外的 VPS 基础设施经由被黑的中继路由——BleepingComputer 点名 **Intelbras 调制解调器**为境外中继、**Netgear Orbi** 设备为美国境内的跳板——而一次会话"typically in under 8 hours"（通常不足 8 小时）结束，操作者随即移除其工具、密钥与配置文件。对任何运行管理平面软件的人都重要的那个发现是：监控"helped uncover **at least four confirmed and one likely zero-day** vulnerabilities"（帮助发现了至少四个已确认与一个可能的零日漏洞），点名的 CVE 为 **CVE-2026-16812**（VeloCloud Orchestrator）、**CVE-2026-20127**（Cisco Catalyst SD-WAN）、**CVE-2025-8875** 与 **CVE-2025-8876**（N-able N-central）、**CVE-2024-39717**（Versa Director），外加一个疑似的 **Quest KACE** 零日。受害行业横跨电信、政府、国防承包商、卫星与任务关键通信、大学、IT 公司、MSP，以及水利、能源、交通、海事、铁路、航空与应急服务。

**Why it matters:** 目标选择本身就是论点，而它是作为**中继框架**的属性、而不是某次行动的属性陈述出来的。每一个被点名的产品都位于**控制平面**——SD-WAN 编排器、VeloCloud 编排器、N-central RMM、Versa Director、KACE 设备——而 Black Lotus Labs 的框架是"systems with broad administrative reach can become high-value gateways to the entire organization **and its customers**"（具有广泛管理触达的系统，可以成为通往整个组织**及其客户**的高价值网关）。一台 RMM 或一个编排器不是一个主机；它是一个能登入成百上千台下游机器的凭据，这正是为什么受害者名单里出现一家 MSP，与出现一家单独的企业在性质上不同。报告自己给出了两条限制："at least four confirmed and one likely"（至少四个已确认与一个可能）是受害者通知所揭示的下限，不是对该框架曾被用于什么的普查，而地域集中（加利福尼亚、得州、夏威夷）是关于已观测受害者的观察，不是关于意图的陈述。操作层面的建议是能越过这个具体攻击者而泛化的那条——限制管理接口的互联网暴露面，并让日志的保留时间长过入侵者保留中继的时间，因为 8 小时的清理周期意味着唯一剩下的证据，是你在它发生之前中央日志所捕获的东西。

[`🔗 Lumen——Silent Train：揭开 Volt Typhoon 的零日利用与战略性访问作业框架`](https://www.lumen.com/blog/en-us/silent-train-volt-typhoon-operational-framework) · [`🔗 BleepingComputer——Volt Typhoon 用 'Silent Train' 框架掩盖零日攻击`](https://www.bleepingcomputer.com/news/security/volt-typhoon-hides-zero-day-attacks-using-silent-train-framework/)

---

## 42. Juniper 一次发布 17 个 Session Smart Router CVE——两个 9.8，其中一个凭 salt minion ID 拿到 root

- **Velocity:** ▮▮ rising
- **Source:** NVD API / Juniper SIRT（JSA112183）· 全部发布于 2026-10-28T17:17Z
- **Tags:** `juniper` `session-smart-router` `cve` `cna-assigned` `command-injection`

Juniper 的 `sirt@juniper.net` 在 **10 月 28 日**为 **Session Smart Router / Conductor** 提交了 **17 条记录**，而分布是一个干净的三角而不是一堆 9.8：**两个 9.8**、**六个 8.8**，然后是 7.5、7.1、5.8、5.5、5.3 ×2、4.8、4.3、3.7。两个封顶条目是戴着同一个数字的不同 bug。**CVE-2026-103406** 是 **AutomatedProvisioner** 里的操作系统命令注入："allows a remote attacker to execute **arbitrary commands as root** via a specially crafted **salt minion ID**"（允许远程攻击者通过一个特制的 salt minion ID 以 root 执行任意命令）。**CVE-2026-103409** 是关键功能的认证缺失："allows an unauthenticated network-based attacker to obtain **administrative privileges** by passing crafted URL parameters to an insecure endpoint running **as root**"（允许未认证的网络攻击者通过向一个以 root 运行的不安全端点传递构造好的 URL 参数，取得管理员权限）。**CVE-2026-103409** 的 cveawg 容器在 CNA 的 `affected[]` 字段里陈述了自己的受影响范围——`0` 至 `< 7.0.5`、`7.1.0` 至 `< 7.1.7`、`7.2.0` 至 `< 7.2.3`——对照 `defaultStatus: "unaffected"`。8.8 那一档是配置面所在之处：未认证 web 服务器里的一个链接跟随 bug、PCLI 里的数据真实性失效、AccessManager 的一处命令注入、ConfigDirector 的路径穿越，以及 DHCP 客户端的一处栈溢出。

**Why it matters:** salt minion ID 这个细节应当改变你读这个分数的方式，因为它意味着输入路径不是一个运维者能在边缘过滤掉的 HTTP 参数——它是一个被管理节点向自己的置备系统出示的身份标识，而消费它的代码以 root 运行。这是单个部署内部一个供应链形状的洞：谁控制了某个 minion 的身份字符串，谁就够到了置备器。来源是统一的，值得对整批只陈述一次：17 条全部携带 **Juniper 自己的 CVSS**，而 NVD 对每一条的状态都是 **`Awaiting Analysis`**、没有任何 `nvd@nist.gov` 度量，所以这里的每个数字都是 **CNA 赋分并被转手重发**。这在表格底部比在顶部更要紧——3.7 与 4.3 是 Juniper 对一个不当初始化 bug 与一次 VRRP 越界读的判断，而 Juniper 之外没有人校验过它们。而版本算术是部署陷阱：三个受影响分支对应三个不同的修复级别，意味着跑在 `7.0.x` 上的路由器和跑在 `7.2.x` 上的路由器都受影响、且各自需要不同的目标构建，而这类细节在抵达运维者的工单时，早已被压平成"升级到最新版"。

[`🔗 CVE-2026-103409 记录（9.8，认证缺失 → root，经构造 URL 参数取得管理员权限）`](https://www.cve.org/CVERecord?id=CVE-2026-103409) · [`🔗 Juniper 公告 JSA112183`](https://supportportal.juniper.net/JSA112183) · [`🔗 CVE-2026-103406 的 NVD 记录（9.8，经 salt minion ID 的操作系统命令注入）`](https://nvd.nist.gov/vuln/detail/CVE-2026-103406)

---

## 43. Eclipse 的 `che-machine-exec` 把你的用户名拼进 shell 命令——9.8，而修复比记录早 41 天

- **Velocity:** ▮▮ rising
- **Source:** NVD API / Eclipse Foundation CVE 分配 · 发布于 2026-10-28T12:17Z
- **Tags:** `eclipse-che` `cve` `command-injection` `kubernetes` `cna-assigned`

**CVE-2026-114278** 得分为 **9.8**，`AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H`，而其描述是一个教科书式的拼接："The `che-machine-exec` service constructs a shell command by concatenating user-controlled input (the **username** and **namespace** fields from the `/exec/init` and `/exec/config` JSON endpoints) into a double-quoted `sh -c "echo "..." > ..."` invocation without any escaping."（`che-machine-exec` 服务通过把用户可控的输入——`/exec/init` 与 `/exec/config` JSON 端点里的 username 与 namespace 字段——拼接进一个双引号的 `sh -c "echo "..." > ..."` 调用，从而构造出一条 shell 命令，且不作任何转义。）该记录是 Eclipse Foundation 为该项目提交的一小组记录之一，而修复提交是公开的：**`a78541c`**，提交信息"Validate certain parameters used in shell commands"，提交时间 **2026-09-17T03:25:02Z**——比记录发布早 **41 天**。来源那一行才是要拎清的：度量的 source 是 `emo@eclipse.org`，其类型是 **`Secondary`**，而 NVD 的 `vulnStatus` 为 **`Deferred`**，所以 9.8 是 CNA 的数字，NVD 既未分析也未赋分。

**Why it matters:** 有意思的失败不是缺失的转义，而是**修复的形状**——"validate certain parameters"（校验某些参数）而不是"quote the arguments"（引用参数）——而这个区分决定了这类 bug 是被关上了，还是只是这一个实例被关上了。对两个具名字段做黑名单或格式检查，能修好 `/exec/init` 与 `/exec/config`，却把下一个从 JSON 里读字符串的端点留给了同一个洞；缺陷是带插值变量的 `sh -c`，而正确的修法是彻底不再用格式串去构建命令。`Secondary` 槽位加上 `Deferred` 状态是第二件要仔细读的事，因为这恰恰是本刊自十月补丁日审计以来一直在追踪的情形：一个出现在 NVD 页面上的数字不是一次 NVD 评估，在这里写"NVD 说 9.8"，等于把 Eclipse 的算术归给一个根本没做过这件事的当事方。由此有两个实际后果——9.8 是一个上限，记录自身的文字里没有任何东西让它显得意外（未认证、网络可达、经 shell 取得近似 root 的写入），而 `Deferred` 意味着这条记录可以在你脚下变化，往任一方向，而 CVE ID 不变。

[`🔗 CVE-2026-114278 的 NVD 记录（9.8，Eclipse 赋分，Deferred）`](https://nvd.nist.gov/vuln/detail/CVE-2026-114278) · [`🔗 修复提交 a78541c（2026-09-17）`](https://github.com/eclipse-che/che-machine-exec/commit/a78541c29e5f48fd59a49cf206bc0e507628bd23)

---

## 44. Signal K Server 在日志 ZIP 里把自己的 JWT 签名密钥送出去——9.8 未认证，而修复提交的标题正是为此写的

- **Velocity:** ▮▮ rising
- **Source:** NVD API / VulnCheck / SignalK 仓库 · 发布于 2026-10-28T22:17Z
- **Tags:** `signalk` `cve` `jwt` `missing-authentication` `vulncheck`

**CVE-2026-118690** 是 **Signal K Server**——船载电子设备与之通信的那个开源海事数据服务器——中的一个认证缺失 bug，而其升级链条异常自洽："before 2.33.0 … allows unauthenticated remote attackers to **download log archives** via the `/skServer/ziplogs` endpoint. Attackers can extract the **JWT `secretKey`** from `security.json` in the ZIP, **forge administrator tokens**, and create persistent …"（在 2.33.0 之前……允许未认证的远程攻击者通过 `/skServer/ziplogs` 端点下载日志归档。攻击者可以从 ZIP 里的 `security.json` 提取 JWT 的 `secretKey`，伪造管理员令牌，并创建持久……）帐号。修复是一个提交，**`728bab82`**，提交信息为"security: add admin middleware to ziplogs endpoint"，提交于 **2026-09-21T17:57:17Z**——比发布早 **37 天**。这是一条少见的、同时携带**两个** CVSS 版本且来自同一来源的记录，而两者相差 **0.5**：**CVSS 3.1 9.8** 位于 **`Primary`** 槽位，**CVSS 4.0 9.3** 位于 **`Secondary`**，两者都是 `disclosure@vulncheck.com`，而 NVD 的状态仍是 **`Received`**。

**Why it matters:** 这是一个紧凑的例子，说明 `Primary`/`Secondary` 是槽位位置而不是来源——同一个报告者用两套框架给同一个 bug 打了两次分，而把这两个槽位当成两个当事方的读者，会报道出 VulnCheck 与自己之间的一处分歧。向量解释了差距，而它就在记录里：v3.1 携带 `S:U`（不变）且 `C/I/A` 全为 High，而 v4.0 字符串是 `SC:N/SI:N/SA:N`——后续系统影响声明为无。那是一个关于"一台被攻陷的船舶数据服务器能触达多远"的**建模**差异，而方向是报告者的习惯，而不是框架的属性。应当带走的漏洞类别是这一条：**一个把配置归档的诊断端点，就是在等着发生的认证绕过**，因为保护系统的那个秘密*就在日志转储所收集的文件里*——管理员中间件的缺失是直接原因，但一个把 `security.json` 打包进可下载 ZIP 的端点，才是让它成为一次完整入侵而不是一次信息泄露的设计。而"修复早于记录"的算术是操作层面的读法：任何在 9 月 21 日之后安装 2.33.0 或更新版本的人，在 CVE 存在之前就已被覆盖，所以真正处于风险中的人群，是那批锁定了旧镜像、从未重新拉取的人。

[`🔗 CVE-2026-118690 的 NVD 记录（9.8 CVSS 3.1 Primary / 9.3 CVSS 4.0 Secondary，同一来源）`](https://nvd.nist.gov/vuln/detail/CVE-2026-118690) · [`🔗 修复提交 728bab82——"security: add admin middleware to ziplogs endpoint"`](https://github.com/SignalK/signalk-server/commit/728bab82742d16c54e50525b95dc9b6e32396107)

---

## 45. AVideo 的安装器用请求参数写自己的配置——一个不需要任何账号的 10.0，而修复是一个发布标签

- **Velocity:** ▮ rising
- **Source:** GitHub 安全公告库 / NVD API · 发布于 2026-10-28T22:17Z
- **Tags:** `avideo` `cve` `code-injection` `installer` `cvss-10`

**CVE-2026-61564** 是一个 **10.0**——`AV:N/AC:L/PR:N/UI:N/**S:C**/C:H/I:H/A:H`——位于 **AVideo**，而其攻击面是在一个运行中的系统上你本不该够得着的那一个："Prior to **8.1.0**, the unauthenticated installer endpoint `install/checkConfiguration.php` assembles `videos/configuration.php` by interpolating request parameters, including `webSiteRootURL`, into **single-quoted PHP string literals without escaping**"（在 8.1.0 之前，未认证的安装器端点 `install/checkConfiguration.php` 通过把请求参数——包括 `webSiteRootURL`——插值进**单引号 PHP 字符串字面量**来拼装 `videos/configuration.php`，且不作转义）。公告是 **GHSA-xrj3-cqm8-r992**，引用 **CWE-73**（"the write path is taken from the attacker-supplied `systemRootPath` with no base-directory constraint"，写入路径取自攻击者提供的 `systemRootPath`，没有任何基目录约束）与 **CWE-89**（"the `INSERT` statements at lines 91 and 99 interpolate request values directly"，第 91 与 99 行的 INSERT 语句直接插值请求值）。同一次推送里提交了两条记录：**CVE-2026-61564**，**10.0**，在安装器写入路径上；以及 **CVE-2026-61567**，**10.0**，在直播端点 `view/videosListToLive.php` 上。修复是 **v8.1.0**，标签与提交为 **`0faaddeb`**。

**Why it matters:** 10.0 通常是一个应当被怀疑的数字，而这里的算术可以手工核对——要够到 v3.1 量表的顶端，唯一方式是 `S:C` 加 C/I/A 三项全为 High，而这次 scope 变化是名副其实而非装饰，因为写入一个内容由攻击者选定的 `configuration.php`，不是对 web 应用的入侵，而是对**承载该机器上每一个站点的那个 PHP 进程**的入侵。双 CWE 也少见的诚实：转义 bug 让你把任意内容放进一个字符串字面量，路径 bug 让那个字面量被写到 `systemRootPath` 指向的任何地方，所以补丁必须堵上两个相互独立的洞，而公告说了这一点，而不是挑更整齐的那个来讲。不过 10.0 这个标签跑在了一件事实前面——`PR:N/UI:N` 对这个端点成立，但完全没有说明安装完成后 `install/` 是否仍可达，而公告自己的"Prior to 8.1.0"是版本陈述，不是部署陈述。来源方面：度量的 source 是 `security-advisories@github.com`，NVD 的状态是 **`Received`**，所以两个 10.0 都是 **GitHub CNA** 的数字，未经 NIST 分析。而那句实用的话是为防过期、而不是建议——对一个自托管的视频平台而言，安装完成后安装器依然存在才是真正的发现，升级到 8.1.0 关掉了这个实例，却没有移除这个攻击面。

[`🔗 GHSA-xrj3-cqm8-r992——AVideo 未认证安装器配置注入`](https://github.com/WWBN/AVideo-Encoder/security/advisories/GHSA-xrj3-cqm8-r992) · [`🔗 CVE-2026-61564 的 NVD 记录（10.0，GitHub CNA）`](https://nvd.nist.gov/vuln/detail/CVE-2026-61564) · [`🔗 v8.1.0 发布标签`](https://github.com/WWBN/AVideo-Encoder/releases/tag/v8.1.0)

---

## 46. Claude Code 把你账单的 16.4% 花在让模型用三个词描述自己——而且没有设置可以关掉它

- **Velocity:** ▮▮▮ trending
- **Source:** flamerix.ai gist / Hacker News · 429 pts · 约 3 小时前
- **Tags:** `claude-code` `agents` `cost` `observability` `reverse-engineering`

那份 gist 直白地摆出了机制："Every ~30 seconds, for every background agent, Claude Code sends that agent's **entire transcript** to the agent's own model (usually Opus) and asks it to 'describe your most recent action in **3-5 words**'."（大约每 30 秒，对每一个后台智能体，Claude Code 都会把该智能体的**完整转录**发给该智能体自己的模型（通常是 Opus），并要求它"用 3-5 个词描述你最近的动作"。）回答只更新智能体面板里的一行状态——它"never reaches the model or your conversation"（从不抵达模型或你的对话）——而"there is no setting that turns it off"（没有任何设置可以关掉它），自 2026 年 8 月的 **2.1.232** 起默认开启。这个测量并非来自读二进制：作者把 Claude Code 的 **OpenTelemetry** 导出按 `query_source` 分组，发现在他们挂钩前的那一周里 `agent_summary` 占全部 Claude Code 支出的 **16.4%**，对照主对话的 **15.7%**，占 API 请求的 **19.7%**，其中 **96%** 的支出花在 Opus 上，输入输出比约为 **9,000 : 1**。他们并非孤例：他们链到了 **anthropics/claude-code#86879**，该 issue"collects four independent measurements of **18–26%**"（汇集了四次独立测量，为 18–26%）。修复是一段约 80 行的 **Bun preload**（`BUN_OPTIONS=--preload`），它包装 `setTimeout`/`setInterval`，在回调的源码文本包含某个摘要器锚点时返回一个惰性句柄；二进制本身未被修改。

**Why it matters:** 机制是有意思的那一半，而且它比这一个客户端更普适——这个钩子之所以有效，是因为该模块以**预编译的 Bun 字节码**形式发布，所以改动 JS 文本毫无作用，但 `Function.prototype.toString` 即使面对来自字节码的回调仍然返回其源码，这就让该定时器可以被其中某个字符串而不是被身份识别出来。这是关于给任何打包运行时做插桩的一条持久观察。而这份 gist 自己的诚实是它可被引用的原因：它公布了一张跨六个版本（2.1.257 → 2.1.312）的 **Tested versions** 表，显示每次约 2.5 分钟的运行为 **5 / 5 / 0** 个摘要分叉，分别对应不打钩子 / 钩子通过 / 钩子关闭，还给出了一个 **Fail-open** 小节，点名钩子静默失配的四种方式——日志行被改名、一个 `fn.bind(...)` 包装、一个被移到回调之外的共享常量，或者定时器迁移到 `timers/promises`。引用时要把两件事分清楚：**16.4% 是 Claude Code 自己 `cost_usd` 估算中的一份占比，不是发票上的占比**，所以在订阅制下损失的是速率限制的余量而不是钱；而这个 16.4% 是单个订阅者一周的数据，被链到的那个 issue 的区间是 18–26%，所以站得住的说法是"六分之一到四分之一"，来自对一个默认开启该功能的客户端所做的四次独立测量。可泛化的成本模型是：一个**每 30 秒、对每个智能体、摘要完整转录**的可观测性功能，其规模随上下文长度而不是随用户要求的任何东西增长，这就是一个 3 个词的标签如何变成第二大账单条目的方式。

[`🔗 那份 gist——token 审计、钩子源码、版本表、fail-open 清单`](https://gist.github.com/flamerix-ai/c3905705cc4205e5de3011fa2e74efce) · [`🔗 anthropics/claude-code#86879（四次独立测量，18–26%）`](https://github.com/anthropics/claude-code/issues/86879) · [`🔗 HN 讨论（429 pts）`](https://news.ycombinator.com/item?id=50284255)

---

## 47. claude-mem 以 104,210 星承载会话记忆——而它的检索是三步过滤，不是向量查询

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub Trending / thedotmack/claude-mem · 104,210 stars · 推送于 2026-10-29
- **Tags:** `claude-code` `memory` `mcp` `agents` `typescript`

**thedotmack/claude-mem** 今天登上 GitHub Trending，**104,210 星**、**9,193 forks**、**142 个未结条目**，Apache-2.0，TypeScript，首次提交 **2025-08-31**，最后推送 **2026-10-29**——一个一年期的项目，而非一次脉冲。它的自我描述是"Persistent Context Across Sessions for Every Agent – Captures everything your agent does during sessions, compresses it"（跨会话为每个智能体提供持久上下文——捕获你的智能体在会话中的一切，并压缩它），而架构是六个组件：六个**生命周期钩子**（`SessionStart`、`UserPromptSubmit`、`PreToolUse`、`PostToolUse`、`Stop`、`SessionEnd`）、一个作为本地 HTTP API 并带 web 查看器的 **worker 服务**、存放会话/观察/摘要的 **SQLite**、用于向量的 **Chroma**，以及一个 `mem-search` skill。值得读的是检索设计，它刻意不是"embed 然后返回"：**四个 MCP 工具**构成一个**三层工作流**——`search` 返回"compact index with IDs (**~50-100 tokens/result**)"（带 ID 的紧凑索引，每结果约 50-100 token），`timeline` 给出结果前后的时间线上下文，`get_observations`"fetch[es] full details **ONLY for filtered IDs** (~500-1,000 tokens/result)"（仅为经过过滤的 ID 取完整细节，每结果约 500-1,000 token）——README 把它总结为"**~10x token savings** by filtering before fetching details"（在取细节之前先过滤，从而节省约 10 倍 token）。

**Why it matters:** 三步的形状，是对一个智能体记忆类别通常解决得很糟的问题的正确答案，而理由是算术而不是品味：一个记忆存储的失效模式不是召回，而是**上下文成本**，所以先暴露索引、只为幸存者提供正文，把一次检索变成两趟过滤，昂贵的 token 只花在模型已经选中的行上。这正是本刊在代码检索工具里追踪过的渐进式披露论证，只是被用在了会话日志上。需要保持距离的主张，是 README 在没有测试台的情况下陈述的那些：**"~10x token savings"** 在 README 里背后并没有基准小节，所以应当作为项目自己的数字引用，而 **`~50-100`** 与 **`~500-1,000`** 的 token 区间是估计而非测量。两个安装细节才是会咬人的那种：`npm install -g claude-mem` 安装的是"the **SDK/library only** — it does not register the plugin hooks or set up the worker service"（仅 SDK/库——它不注册插件钩子，也不安装 worker 服务），于是一次全局安装看起来成功了却什么也没交付；而对某一个受支持宿主，默认项是 **CMEM Pro，即托管版记忆**，本地观察者是一个需要显式打开的开关（`--provider host`）——这正是把它指向专有仓库之前该读的那句，因为"持久上下文"与"发送到某个服务"并不互斥。

[`🔗 thedotmack/claude-mem（Apache-2.0，104,210 星）`](https://github.com/thedotmack/claude-mem) · [`🔗 架构文档——钩子、worker、SQLite FTS5、Chroma`](https://docs.claude-mem.ai/architecture/overview)

---

## 48. 现在有两个叫 OpenBot 的智能体项目——而 CopilotKit 的那个以 beta 发布、MIT，且需要一个许可证令牌

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending / CopilotKit/OpenBot · 7,768 stars · 推送于 2026-10-29
- **Tags:** `agents` `self-hosted` `ag-ui` `docker` `licensing`

**CopilotKit/OpenBot** 今天以 **7,768 星**进入 GitHub Trending，**1,030 forks**、**45 个未结条目**，MIT，TypeScript，创建于 **2026-08-17**——而首先要澄清的是名字，因为本刊在 **10 月 27 日**报道过另一个*不同的* `OpenBot`（`nightly-labs/openbot`，"persistent AI teammates on your desktop"，桌面上的持久 AI 队友）。两者毫无关系。CopilotKit 的卖点是"**The AI assistant your company can actually own.** Same shape as ChatGPT, Claude or Grok"（你的公司真正能拥有的 AI 助手，形态与 ChatGPT、Claude 或 Grok 相同），以 Docker Compose 加 PostgreSQL 部署，其中"**no model ships in the box**"（盒子里不带模型），由管理员提供凭据，凭据静态加密且从不写入日志。协议选择才是设计论点："A Bot is any endpoint speaking **AG-UI** … Agents built with LangGraph, Mastra, CrewAI, Pydantic AI, Google ADK or written by hand all arrive the same way, and the governance rides the protocol rather than the framework."（一个 Bot 就是任何讲 AG-UI 的端点……用 LangGraph、Mastra、CrewAI、Pydantic AI、Google ADK 构建或手写的智能体都以同样方式抵达，而治理依附于协议而不是框架。）Bot 在"a computer, a file, an MCP server or a component"（一台计算机、一个文件、一个 MCP 服务器或一个组件）上执行的每一个动作都"goes through **one gateway** that decides and records it"（经过一个做出决定并记录它的网关），计算机绑定到 **`127.0.0.1`** 并配一个按容器发放的令牌，而智能体端点会对照 SSRF 目标检查"at registration and again on every redirect"（在注册时以及每次重定向时）重新校验。

**Why it matters:** "通过协议做治理"这一主张是实质性的，而且是一项真正的架构承诺——如果因为线上格式固定而让每个动作都经过同一个网关，那么沙箱就是部署的属性，而不是某个团队恰好选了哪个智能体框架的属性，这与智能体沙箱通常的搭法正好相反。注意事项也在同一个 README 里，而且不小：状态行写着"**Beta, and under active development.** OpenBot is early. Expect rough edges and bugs"（Beta，正在活跃开发中。OpenBot 还很早期，请预期粗糙之处与 bug），快速开始的先决条件包括"**A CopilotKit Intelligence project and license. A free plan is available, and Intelligence can be self-hosted**"（一个 CopilotKit Intelligence 项目与许可证。有免费方案，且 Intelligence 可以自托管），而部署"starts with two coworkers"（从两个同事开始），它们本身是配置，另有十个作为目录示例。所以"MIT、跑在你自己的基础设施上"对服务端成立，但需要紧邻的那句话——一个 MIT 许可的控制平面，其智能体运行时却期待一个另行授权的组件，这是一个**混合**的许可故事，而免费方案是一个方案，不是一项权利。本刊 10 月 24 日关于 `claude-plugins-official` 的注记里重复出现的教训是阅读顺序：先确认你要评判的是仓库、是它调用的服务、还是部署配方，因为三者都出现在同一个页面上，而其中只有一个是 MIT。

[`🔗 CopilotKit/OpenBot（MIT，beta，AG-UI，Docker Compose）`](https://github.com/CopilotKit/OpenBot) · [`🔗 copilotkit.ai/openbot——产品页`](https://copilotkit.ai/openbot)

---

## 49. Claude Code Game Studios 测了自己并公布了坏结果：30 文档的构建排名最后

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending / Donchitos/Claude-Code-Game-Studios · 28,633 stars · 最后推送 2026-10-19
- **Tags:** `claude-code` `agents` `skills` `game-dev` `evaluation`

**Donchitos/Claude-Code-Game-Studios** 把一个 Claude Code 会话变成一间工作室：三层共 **49 个智能体**（总监、部门主管、专家）、**74 个 skill**、**15 个钩子**、**14 条规则**、**62 个模板**，MIT，28,633 星，4,015 forks。这些智能体有"defined responsibilities, escalation paths, and quality gates"（明确的职责、升级路径与质量闸门），而 README 自己的清单表才是该引用的计数——仓库的 GitHub *description* 写的是"**72** workflow skills"，而 README 徽章与表格都写 **74**，这正是本刊一直留意的漂移，而这里以 README 为准，因为它是那份带逐类算术的文档。让这个项目值得一写的，是标题为"**Does it produce games, or documents?**"（它产出的是游戏，还是文档？）的那一节，它给出的答案是"一次测量"：用同一份需求在不同的 `modes.rigor` 级别下构建四个游戏，统计每个在**写下第一行游戏代码之前**产出的文档数——`minimal` 写了 **1** 份（那一页需求），耗时 **0 分钟**；`standard` 写了 **30** 份，耗时 **58 分钟**。"All of them produced a running, tested game. **Two blind reviewers and a human playtest then ranked the `standard` build last** — the extra 29 documents bought traceability, not a better game."（它们都产出了可运行、经过测试的游戏。随后两名盲评者与一次人工试玩把 `standard` 构建排在最后——多出的 29 份文档买到的是可追溯性，不是更好的游戏。）

**Why it matters:** 一个 skill 仓库对自己的配置跑一次受控比较，并为更繁复的那一档公布**负面**结果，在这个类别里近乎独一无二，而这个发现是有意思的那类负面——29 份额外文档并没有让游戏变差，而是让它的*排名*变差，这是关于这个流程的注意力去了哪里的陈述。这正是本刊围绕 harness 与 skill 增殖盘旋了数周的一个担忧的具体形态：一个工作流每增加一道闸门，就向智能体收取一次往返，而回报必须体现在一件交付物上，而不是一份文档里。诚实的边界在于这是 **n=4、一份需求、两名评审、一次试玩**——README 把它呈现为"a measurement rather than a sample project"（一次测量，而不是一个示例项目），而它确实是一次测量，一次对一个游戏类型的四次运行，这使它成为"文档量并非单调有益"的证据，而不是一个可以当作定论引用的排名结果。这一节的后半部分，是前半部分所不是的那项检查：仓库对"这东西能跑吗"的回答是，对一个游戏而言一个通过的测试并不充分，"someone has to *look* at it"（必须有人去看它），这就是为什么该工作流会真的跑构建，而不是对它做断言。

[`🔗 Donchitos/Claude-Code-Game-Studios（49 智能体、74 skill、MIT）`](https://github.com/Donchitos/Claude-Code-Game-Studios) · [`🔗 GitHub Trending`](https://github.com/trending)

---

## 50. CASEL 按后果而非置信度来闸控工具调用——等算力下有害轨迹 14.75% → 7.02%

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.36570 · 提交于 2026-10-27
- **Tags:** `arxiv` `agents` `tool-use` `safety` `runtime`

**CASEL**（Consequence-Aware Selective Execution Layer，后果感知的选择性执行层）从一个观察出发："most runtime safeguards allocate scrutiny by **generic uncertainty scores or coarse mutation heuristics**"（多数运行时防护按通用的不确定性分数或粗糙的变异启发式来分配审查力度），并转而提出一套逐调用策略，它"combines calibrated failure probability, **state-dependent consequence, reversibility, ambiguity, and evidence freshness**"（结合校准过的失败概率、状态相关的后果、可逆性、歧义性与证据新鲜度）来选择六种模式之一——直接执行、验证、沙箱、澄清、批准或弃权——"by minimizing a per-mode cost"（通过最小化每种模式的成本）。该设计把直接执行形式化为**选择性预测**，并给出了有限样本阈值与一个"trajectory risk ledger"（轨迹风险账本）的有效性条件。数字来自"a controlled simulation over **20 seeds with 120,000 test actions each**, in which every method has the same intervention menu and **the same compute cost**"（一次受控模拟，20 个种子、每个 12 万次测试动作，其中每种方法拥有相同的干预菜单与相同的算力成本）：有害副作用轨迹从按不确定性排序的闸门的 **14.75%** 降至 **7.02%**，平均归一化危害从 **0.184** 降至 **0.123**。

**Why it matters:** 让这篇值得读的是关于可比性的那句——"the same intervention menu and the same compute cost"——因为一个更频繁请求批准的闸门总是显得更安全，而把预算拉平才把"更安全"变成"分配得更好"。数字所支撑的机制是：增益在**排序函数**里，而不在菜单里——摘要报告称"a gate ranked by the product of failure probability and consequence"（一个按失败概率与后果之积来排序的闸门）正是抓住了大部分改进的那个变体，而这是对多数系统作为单一阈值发布的策略所做的一个双变量改动。有两条诚实的限制应当并排放着。第一，这是**模拟**而不是部署——在受控环境中每种子 12 万次测试动作、配有定义好的危害标注，这是最干净的测量设置，也是对真实工具面最不具代表性的设置。第二，"危害"是针对那份标注归一化的，所以 0.184 → 0.123 是在这个任务分布上的相对改进，不能换算成事故数。可转移的主张窄而有用：后果与可逆性按调用估算起来很便宜，且携带不确定性所不携带的信息，这就是为什么在同一预算下按不确定性排序的基线会输给它。

[`🔗 CASEL：后果感知的选择性执行层（arXiv 2610.36570）`](https://arxiv.org/abs/2610.36570) · [`🔗 全文（PDF）`](https://arxiv.org/pdf/2610.36570)

---

## 51. 给编码智能体四个后续请求，它就停在 28.5%——因为它从没注意到自己早先的缺陷

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.37434 · 提交于 2026-10-27
- **Tags:** `arxiv` `coding-agents` `benchmark` `software-engineering` `evaluation`

**FeatureArc** 评估的，是多数功能基准所回避的东西：一个在智能体自己早先的工作*之后*才到达的请求。"Most feature benchmarks evaluate a single request on a fixed codebase"（多数功能基准评测的是固定代码库上的单个请求），而"feature evolution requires evaluating successive extensions on **an agent's own earlier code** and checking whether the feature remains correct"（功能演进要求在智能体自己更早的代码上评测连续扩展，并检查该功能是否仍然正确）。该流水线从仓库历史中挖掘任务，并在每个阶段前后对照参考代码，校验新行为的 fail-to-pass 测试与既有行为的 pass-to-pass 测试。评测覆盖 **10 个编码智能体**、**73 个经人工复核的任务**，每个任务 **2 到 10 个阶段**，每个智能体处于"one persistent session and workspace **without external test feedback or rollback**"（一个持久会话与工作区，没有外部测试反馈，也没有回滚）。头条是衰减的形状："pooled success falls from **62.7%** at the first stage to **28.5%** when the whole feature is tested on the final code"（合并成功率从第一阶段的 62.7% 降至在最终代码上测试整套功能时的 28.5%）。机制由轨迹诊断而来——"**inherited defects**"（继承缺陷）出现在 **72.9%** 的失败后续阶段中，而在"stages following a failure, agents leave the earlier error unnoticed about **95%** of the time, and their **self-tests rarely revisit earlier stages**"（失败之后的阶段中，智能体约 95% 的情况下未察觉早先的错误，而其自测很少回访更早的阶段）。

**Why it matters:** 95% 这个数字才是该带走的，因为它把失败从能力转移到了**注意力**上。处于第 4 阶段的智能体并不是在第 4 阶段的请求上失败；它正在一个自己没有复查流程的基础上正确地建造，这就是该基准"不回滚、无外部反馈"的设计在做功的原因——它移除了那个会说"等等，周二那次的缓存失效是错的"的人。这让该结果成为一个关于*这些系统是如何接线*的陈述，而不是关于模型质量的陈述：一个持久会话、只追加的历史、以及范围限于当前步骤的自测，没有任何机制让后面的步骤去怀疑前面的步骤，而 62.7% → 28.5% 的落差就是这在 2–10 个阶段上的代价。产业细节是可信度检查：该流水线"extends internal evaluations"（扩展内部评测）于**腾讯**，并"guides the development of **Hunyuan**"（指导混元的研发），所以这是一家厂商发布了一套用它自己的模型家族被测量的基准，这在读那张逐智能体表时值得知道。而限制是设计自带的：73 个任务不多，阶段是从真实历史中抽取而不是为难度合成的，且摘要没有点明那四种语言——所以这里的说法是"顺序功能开发在这个 harness 中会退化"，这足以改变你如何界定一次智能体会话的范围，而不足以给那 10 个智能体排名。

[`🔗 FeatureArc：在演进中的功能上评测编码智能体（arXiv 2610.37434）`](https://arxiv.org/abs/2610.37434) · [`🔗 全文（PDF）`](https://arxiv.org/pdf/2610.37434)

---

## 52. 通过 Wilson 环实现边注意力不是设计选择——一篇新论文证明它是该对称性允许的唯一形式

- **Velocity:** ▮ rising
- **Source:** arXiv 2610.37656 · 提交于 2026-10-27
- **Tags:** `arxiv` `transformers` `relational-reasoning` `gauge-theory` `architecture`

论文的前提是：关系经由共享实体复合——"Alice is Bob's mother and Bob is Carol's father, so Alice is Carol's grandmother"（Alice 是 Bob 的母亲、Bob 是 Carol 的父亲，所以 Alice 是 Carol 的祖母）——而顺序很重要，"since a father's mother is not a mother's father"（因为父亲的母亲不是母亲的父亲），所以校验一次复合意味着**闭合这个环**。如果每个实体的坐标架都可以被独立旋转，那么有三件事作为定理而非建议成立："In the pure-gauge sector, relations that share no cycle **cannot interact at all**"（在纯规范扇区中，不共享环的关系根本无法相互作用）；"the only gauge-invariant score of a triangle is a class function of its holonomy `H = T_ij T_jk T_ki` — a **Wilson loop**"（三角形唯一的规范不变分数，是其和乐 `H = T_ij T_jk T_ki` 的类函数——一个 Wilson 环）；以及"the only equivariant update of an edge is `U = Ψ(H) T_ij`"（边唯一的等变更新是 `U = Ψ(H) T_ij`）。于是"edge attention by Wilson loops is therefore **not one design among many but the unique form the symmetry permits**"（因此通过 Wilson 环的边注意力不是众多设计之一，而是该对称性允许的唯一形式）。作者把 AlphaFold 的三角形更新与 Edge Transformer 放到这张图上——"they have its shape — an edge updated through the third vertex — **without its constraints**"（它们有它的形状——一条经第三个顶点更新的边——却没有它的约束）——并把那个等变子族实例化为**和乐注意力（holonomy attention）**。在**完全不训练**、仅靠复合的情况下：在稀疏图上推断未观测到的 `S_4` 关系达到 **0.88**，"with a fifth of the edges corrupted"（且五分之一的边被破坏），而同处"**every commutative architecture is capped at 0.083**"（每一个可交换架构的上限是 0.083）；被破坏的三角形以 **AUC 0.99** 被标出，而"commuting scores are capped at **0.76**"（可交换分数的上限是 0.76）；以及无需标签即可分离的簇。

**Why it matters:** 0.083 对 0.88 的差距不是一个调参差异，而是一个关于"什么可交换"的论证所产生的**上限**——在逐实体坐标架自由之下，不共享环的关系根本无法相互作用，所以任何把边当作独立的架构，无论多宽，都是有界的，而这篇文章的贡献是证明那个界，而不是观察到那次失败。那是一类与常规消融不同的结果：它说 AlphaFold 带火的三角形更新形状是*用错的理由拿到了对的形状*，而缺失的成分是约束，不是参数量。诚实的框定是：这是一个**合成的关系任务，不是语言基准**——`S_4` 复合加受控的图稀疏度是理论最有牙的地方，这里没有任何一行测量 transformer 在文本上的表现，所以"击败每一个可交换架构"是关于某一类架构、在一个该对称性能精确描述的任务上的陈述。读它时应当按作者所主张的工具来读：一个能诊断出该对称性确实存在的工具，并为适用情形提供了一种构造性的替代方案。

[`🔗 作为格点规范理论的注意力：关系只通过 Wilson 环相互作用（arXiv 2610.37656）`](https://arxiv.org/abs/2610.37656) · [`🔗 全文（PDF）`](https://arxiv.org/pdf/2610.37656)

---

## 53. 原生 Muon 只能对数式累积——于是 MuonGS 去掉径向分量，而不是去修范数

- **Velocity:** ▮ rising
- **Source:** arXiv 2610.37647 · 提交于 2026-10-27
- **Tags:** `arxiv` `optimizers` `muon` `pretraining` `training`

论文问的是权重范数控制为什么有用，并以一个量而不是一条启发式回答：**累积有效学习率** `C_T = Σ_{t<T} η_t / ‖W_t‖_F`，其中 `η_t / ‖W_t‖_F` 是相对于权重范数的名义步长。对于有界的更新方向，任意区间上的累积都能界住相对权重位移——这使 `C_T` 成为范数约束所隐含管理的东西。那个驱动其余一切的结果："**vanilla Muon can accumulate only logarithmically**, potentially limiting exploration and helping explain its slower empirical progress, whereas **MuonW and MuonH guarantee at least linear accumulation**"（原生 Muon 只能对数式累积，这可能限制探索并有助于解释其实证进展较慢，而 MuonW 与 MuonH 保证至少线性累积）。其提案 **MuonGS**"uses **Gram–Schmidt (GS) projection to remove the radial component** of each Muon update **without fixing the weight norm**"（使用 Gram–Schmidt 投影去掉每次 Muon 更新的径向分量，而不固定权重范数）。保证是：范数"grows at most proportionally to √t after t steps"（在 t 步之后至多按 √t 成比例增长），于是 `C_T = Ω(√T)`，"with accumulation sustained even in later training"（且累积在训练后期仍然维持），外加对光滑尺度不变目标的 `O(T^{-1/2})` 稳定性。实证上，在 **160M** 与 **400M** 稠密模型以及一个 **135M 激活 / 1B 总量**的 MoE 上，MuonGS"achieves lower validation perplexity than MuonH at long training horizons"（在长训练时程上取得比 MuonH 更低的验证困惑度），在稠密模型上"with an estimated token-equivalent speedup up to about **15%** at matched validation loss to MuonH"（在与 MuonH 匹配验证损失时，估计的等效 token 加速最高约 15%）。

**Why it matters:** 重新框定就是贡献——把"究竟有多少学习率抵达了权重"当作沿轨迹的**累积**量、而不是逐步超参数，正是这一点把"原生 Muon 会平台期"从一句抱怨变成一个预测，也解释了一套原本纯经验性的范数约束文献。随之而来的设计选择是优雅的那部分：MuonW 与 MuonH *固定*范数，通过放弃范数自由度买到线性累积；MuonGS 保留那个自由度，只删掉径向方向，这是一个严格更弱的干预，却给出强于对数的界。限制是摘要所暗示而非隐藏的那些：加速是"**估计**的"等效 token，而且是在匹配损失下，不是墙钟测量；它是某一个稠密模型上的"**最高**约 15%"，不是均值；而基线都是 Muon 变体——所以这是一个关于 Muon 家族内部的结果，对"Muon 是否胜过 AdamW"什么也没说。如果你在 100M–1B 规模上用 Muon 训练，会改变你配置的两条主张是 `C_T = Ω(√T)` 与"在训练后期仍然维持"，因为所描述的原生失效模式是一次**训练后期**的走平。

[`🔗 MuonGS：以放松的权重范数控制预训练 LLM（arXiv 2610.37647）`](https://arxiv.org/abs/2610.37647) · [`🔗 全文（PDF）`](https://arxiv.org/pdf/2610.37647)

---

## 54. 一个新的常数除法算法在 ARM 上击败 30 年前的基线——在某些 x86 除数上却输给它

- **Velocity:** ▮▮ rising
- **Source:** benjoffe.com / Hacker News · 92 pts · 约 1 天前
- **Tags:** `algorithms` `compilers` `integer-division` `performance` `c`

Ben Joffe 于 **10 月 27 日**发表了"**The missing chapter of Hacker's Delight**"（《Hacker's Delight 缺失的那一章》）：一个针对**编译期常量的有符号 64 位向下取整除法**的新算法。它的框定是这个领域"in shambles"（一片狼藉）——"mainstream compilers and many languages do not provide it natively (eg. C/C++/Go/Swift)"（主流编译器与许多语言不原生提供它，例如 C/C++/Go/Swift），而为它提供了实现的库"seem to almost never use the fastest algorithms"（似乎几乎从不使用最快的算法），并且"**at least one highly prominent software library had a buggy overflowing implementation for over 4 years**"（至少有一个非常著名的软件库带着有溢出 bug 的实现超过 4 年）。被测量的主张刻意是不对称的。在 **ARM** 上——在 MacBook Pro **M4 Pro** 与 **Snapdragon X1-26-100** 上测试——新算法"benches **10–20% faster throughput** than existing algorithms for most 64-bit divisors (occasionally tied), with equal or better latency"（对多数 64 位除数，吞吐比现有算法快 10–20%，偶尔打平，延迟持平或更好）。在 **x86** 上——**Ryzen 9 9950X3D** 与一颗 Intel Core i7——"**~5-10% faster throughput for around 80% of positive 64-bit divisors (60% of negative divisors)**, **slower in the remaining x86 cases**, and *usually* worse (but competitive) latency"（约 80% 的正 64 位除数上吞吐快 5–10%，负除数上为 60%，在其余 x86 情形下更慢，延迟通常更差但仍有竞争力）。在那个示范例子上，在 ARM 上除以 **86400**（一天的秒数）："common"（常见）的 Rust/Zig 路径处在基线的 **~2×**，Robison（2005）为 **~1.1×**，Granlund–Montgomery（1994）为 **1×**，新算法为 **~0.8×**。代码为 MIT，并按位宽与除数在浏览器内生成。

**Why it matters:** 结果的形状才是教训，而且正是本刊已经学会去核查的那一条——一个单一的头条加速其实是一个**依平台而条件成立**的主张，与它输的那些情形写在同一段里，背后还有一张"over 40 divisors"（超过 40 个除数）的逐除数表。ARM 与 x86 之所以分岔是架构性的而非神秘的：新方法在目标拥有廉价宽乘法的地方取胜，在既有序列已经能填满微架构端口的地方落败，而这正是那种把"更快的除法"变成"在你的笔记本上更快、在你的构建服务器上更慢"的细节。该怀疑的主张是你无法核查的那一条——那个带有四年溢出 bug 的"著名软件库"只在文章正文里被点名，所以它属于 Joffe 的写作，而不是一个你能从头条里验证的引用。对任何写编译器或类 libm 例程的人而言，可复用的事实是**向下取整与截断**这个区分本身：`a/b` 向 −∞ 而不是向 0 取整会改变修正步骤，这就是为什么两者的快速算法不能互换，也是为什么"直接用截断的魔数就好"在一个以上的代码库里一直是静默错误的。

[`🔗 一种计算有符号 64 位常数向下取整除法的更快方法`](https://www.benjoffe.com/fast-floordiv) · [`🔗 HN 讨论（92 pts）`](https://news.ycombinator.com/item?id=50256409)

---

## 55. MiniLake 在你的笔记本上跑 Databricks API，用真的 DuckDB 和真的 Delta 文件——88 星与 378 个 SDK 驱动的测试

- **Velocity:** ▮ rising
- **Source:** dmux.github.io/minilake / Hacker News · 36 pts · 约 1 天前
- **Tags:** `databricks` `duckdb` `delta-lake` `local-dev` `mcp`

**MiniLake** v1.9.0 是"a local **Databricks API emulator** with **real SQL, real Delta Lake and real Spark job execution**"（一个本地 Databricks API 模拟器，带真实的 SQL、真实的 Delta Lake 与真实的 Spark 作业执行），可用 `pip install minilake` 或容器镜像安装，面向"`databricks-sdk`, the Databricks CLI, Terraform, Asset Bundles or an LLM agent"（databricks-sdk、Databricks CLI、Terraform、Asset Bundles 或一个 LLM 智能体）指向 `http://localhost:8000`——"**no account, no API key, no cloud bill**"（没有账号、没有 API key、没有云账单）。页面上的计数很具体："**30+** Databricks API groups emulated, from Unity Catalog to SCIM"（模拟 30 多个 Databricks API 组，从 Unity Catalog 到 SCIM）、"**67** MCP tools for LLM agents, served on the same port"（为 LLM 智能体提供 67 个 MCP 工具，在同一端口上）、"**378+** tests driven by the **real Databricks SDK, not mocks**"（378 个以上测试由真实的 Databricks SDK 驱动，而非 mock）、"**$0** cloud spend"（零云支出）。它宣称的架构区分正是要紧的那一条："**Not a mock server.** Fake endpoints let broken code pass. MiniLake executes your SQL on **DuckDB**, writes **real Delta files**, and runs real `spark-submit` jobs in containers — so a green test locally means something."（不是 mock 服务器。假的端点会让坏代码通过。MiniLake 在 DuckDB 上执行你的 SQL、写入真正的 Delta 文件，并在容器里跑真正的 spark-submit 作业——所以本地一次绿色的测试是有意义的。）Unity Catalog 按 catalog 实现为各自的 DuckDB 数据库文件，因此 `catalog.schema.table` 寻址是原生的，"not a regex rewrite"（不是一次正则改写），而且"the image downloads nothing at runtime — it works **air-gapped**"（镜像在运行时不下载任何东西——它可在气隙环境中工作）。

**Why it matters:** "一个形塑过的 API 背后是真正的引擎"，对这类工具是正确的设计，其理由是测试有效性而不是便利——一个返回 `{"state": "SUCCEEDED"}` 的 mock 不会因为一次坏的 join、一个错误的 Delta schema，或者调用者没有的某个权限而失败，所以它产出的失效模式，是一次对着会破坏生产的代码亮起的绿色 CI。在 DuckDB 上执行是务实的折中：Delta 与 Spark 的语义是被近似而不是被等同，这就是为什么"本地绿了就有意义"这个主张是方向性的，而诚实的读法是"它能抓住 DuckDB 能抓住的那些错误"。采用之前要权衡的信号，是仓库的规模与页面上的计数：**88 星**、**14 forks**、**3 个未结条目**，创建于 **2026-07-25**，MIT，一位维护者——所以 **378+** 个测试是关于一个小项目的真实数字，而 **30+** 个 API 组意味着这个模拟是广而浅的，而不是完整的。MCP 那一行是过期最快的，值得点名：**同一端口上的 67 个工具**使这成为一个智能体可以驱动的本地沙箱，这是一个与"测试我的 Terraform"真正不同的用例，也是最有可能改变这个项目存在意义的那一个。

[`🔗 MiniLake——在你笔记本上跑的 Databricks API`](https://dmux.github.io/minilake/) · [`🔗 dmux/minilake（MIT，Python 3.11+）`](https://github.com/dmux/minilake)

---

## 56. Zero-Breach Toolkit 提供针对手机与笔记本的离线间谍软件检查——并说明干净的扫描不是证据

- **Velocity:** ▮ rising
- **Source:** GitHub / interplains/Zero-Breach-Toolkit · 3,141 stars · 创建于 2026-10-25
- **Tags:** `forensics` `spyware` `privacy` `open-source` `incident-response`

**interplains/Zero-Breach-Toolkit** 于 **10 月 25 日**出现，现在有 **3,141 星**、**341 forks**、**2 个未结条目**，Apache-2.0，Python——一个四天大的仓库已经在趋势榜上。它是"a free, open-source check for traces of known mercenary spyware (**Pegasus, Predator, Graphite, Candiru** and others) on computers, Android phones and iPhone backups"（一个免费、开源的工具，用于检查计算机、Android 手机与 iPhone 备份上是否存在已知雇佣兵间谍软件的痕迹，如 Pegasus、Predator、Graphite、Candiru 等），而它的四项设计承诺与这一主张写在同一块里。**"Read-only"**（只读）——"it does not modify source evidence or system settings. It writes only temporary database snapshots and the reports you ask for."（它不修改源证据或系统设置，只写临时数据库快照与你要求的报告。）**"No network requests during a scan"**（扫描期间无网络请求）——"It never looks up spyware addresses and has no upload feature. Python network calls are blocked and redirected paths are refused"（它从不查询间谍软件地址，也没有上传功能；Python 的网络调用被阻断，被重定向的路径会被拒绝），并附上了限制："**This is not an operating-system network sandbox**; see PRIVACY.md"（这不是一个操作系统级的网络沙箱；见 PRIVACY.md）。**"States its limits"**（陈述其局限）——"Every report says what was found, how strong the evidence is, and what could not be checked. **A clean result is never presented as proof that you are safe.**"（每份报告都说明发现了什么、证据有多强、以及哪些无法检查。干净的结果从不会被呈现为"你安全"的证明。）以及一条为最坏情况准备的去向指示，写在任何操作说明之前："**If you think you are being targeted right now, get expert help first.** You do not need to run this tool before asking"（如果你认为你此刻正被针对，先去寻求专家帮助。你不需要在开口求助之前先运行这个工具），指向 Access Now 的 Digital Security Helpline 与 Amnesty 的 Security Lab。

**Why it matters:** 诚实的范围陈述就是全部价值，因为一个间谍软件扫描器的失效模式不是漏掉一次检出——而是那个**干净的结果**被读成 reassurance，而一个把"not proof that you are safe"（不是你安全的证明）放在第二段、把"get expert help first"（先寻求专家帮助）放在安装说明之前的工具，是针对它自身最可能被误用的方式而设计的。网络那条主张值得精读，而项目自己给出了这份精确性：阻断 Python 的网络调用并拒绝被重定向的路径，阻止的是*工具*回传，而它明确地**不是**一个沙箱——所以一次干净扫描的主张，继承的是它运行所在机器的全部信任假设，这是应当被告知的事，而不是一句模糊措辞。受众也是设计约束：指南是写给"no technical experience needed … a Windows or Mac computer and about 20 minutes"（无需技术经验……一台 Windows 或 Mac 电脑与大约 20 分钟）的人的，手机通过连接到电脑来检查，这正是为什么一个离线、只读、不上传的工具，对那些无法把设备交给某家厂商的记者与公民社会用户而言是正确的形状。它不是什么：四天大、两个未结 issue、以及一个由该项目所发布的任何指标所定义的检测集合——所以它能支撑的句子是"跑了这些检查，什么也没发现"，而它不能支撑的句子是"我没有被感染"。

[`🔗 interplains/Zero-Breach-Toolkit（Apache-2.0，只读，无网络）`](https://github.com/interplains/Zero-Breach-Toolkit) · [`🔗 Zero Breach（它所基于的上游项目）`](https://github.com/interplains/zero-breach)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-10-29T12:15:40Z |
| Items | 56 |
| Sources tracked | 53（Hacker News、GitHub Trending、GitHub API、Google、Hugging Face、arXiv、GitHub Changelog、GitHub 安全公告库、CVE.org、NVD、CISA KEV、kernel.org、Cursor、Surge AI、Rapid7、CISA、So-net、Help Net Security、BleepingComputer、云安全联盟、we-have-a-problem.com、nullpt.rs、fingerprint.garden、VentureBeat、macro.com、AlpineBSD、Alpine Linux、divagr.com、v12.sh、Cloudflare、支持 Broadcom、Dell、Artificial Analysis、Cartesia、WIRED、DDoSecrets、Stack Exchange、Tencent、Apple、Cisco PSIRT、Lumen Black Lotus Labs、smsofdeath.com、blog.orange.tw、Juniper SIRT、Eclipse Foundation、Signal K、GHSA、flamerix.ai、benjoffe.com、dmux.github.io、PyPI、CopilotKit） |
| Update schedule | 04:03, 12:03, 20:03 UTC+8（每日三次） |
| Ranking | Velocity-weighted（时效 × 互动加速度 × 来源权威度） |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[前一日](2026-10-28.md) · [原始 .md](2026-10-29.md) · [归档](../archive/)
