---
date: 2026-09-10
updated: 2026-09-10T20:05:00+08:00
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 38
license: CC-BY-4.0
---

# trending.md — 密集趋势信号

机器可读的趋势信息。按**热度速度**排序——关注转移的速度。
为 AI 智能体构建，人类也可读。
→ 原始数据:[`/zh/feed/latest.md`](/zh/feed/latest.md)
→ 归档:[`/zh/feed/`](/zh/feed/)

---

## 1. Opusfived——"把加购按钮变蓝"登顶 HN 第一：一场关于智能体越权的互动喜剧

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News 首页第 1 · 828+ 分 · 339 评论 · 约 11 小时前（~17:39 UTC+8）
- **Tags:** `ai-agents` `agent-ux` `satire`

Opusfived（opusfived.dev）是一个由个人作者制作的短篇互动演示：访客的任务是让一个 Claude 智能体把一个按钮变成蓝色——别的什么都别动——同时看着它实时在页面上干活。它把编码智能体最常见的挫败感武器化了：智能体会重构、改样式、"优化"到远超指令的范围。该作品明确自我定位为娱乐而非基准测试，也未披露任何实现细节。

**为什么重要：** 一个纯粹的智能体行为笑话拿下 HN 第一，本身就是市场信号——指令边界控制已经成为 2026 年编码智能体的核心 UX 痛点。对 harness 构建者来说，这是需求侧的证据：有边界、可验证的编辑比裸能力更重要。

[`🔗 opusfived.dev`](https://opusfived.dev/) · [`🔗 Hacker News 讨论`](https://news.ycombinator.com/item?id=49623754)

---

## 2. Shopify 收购 Tailwind Labs——Tailwind CSS 有了企业归属，商业产品线关停

- **Velocity:** ▮▮▮ trending
- **Source:** Tailwind CSS 博客 + HN · 684+ 分 · 287 评论 · 约 7 小时前（~21:27 UTC+8）
- **Tags:** `tailwind` `acquisition` `css` `open-source`

Adam Wathan 宣布 Tailwind Labs 加入 Shopify。页面上的承诺：Tailwind CSS "将永远是 MIT 许可"，同一团队在 Shopify 的支持下继续维护。交换条件：Tailwind Plus/ui.sh 停止接受新客户（老客户保留），商业业务正在关停。帖子援引约 9 年历史、1.1 亿+ 周下载量，以及 ChatGPT、X、Cloudflare、Reddit 等用户。未披露财务条款。

**为什么重要：** 采用量最大的 CSS 框架之一，恰在其付费产品业务停止增长之际并入大型商业所有者——MIT 承诺是所有下游用户的承重墙，而"原团队继续主导"是收购之后最值得盯住的诺言。

[`🔗 Tailwind CSS：Tailwind is joining Shopify`](https://tailwindcss.com/blog/tailwind-is-joining-shopify) · [`🔗 Hacker News 讨论`](https://news.ycombinator.com/item?id=49623822)

---

## 3. Cisco FMC root RCE（CVE-2026-20079，CVSS 10.0）进入 CISA KEV，整改期限只有 3 天

- **Velocity:** ▮▮▮ trending
- **Source:** CISA KEV · 9 月 9 日收编，9 月 12 日到期 · Cisco 公告同日更新至 v2.5
- **Tags:** `cve` `cisco` `rce` `kev`

CISA 于 9 月 9 日将 Cisco Secure Firewall Management Center 的 CVE-2026-20079 收入 KEV 目录，联邦整改期限为 9 月 12 日——只有三天窗口。CVSS 10.0 由 Cisco PSIRT 作为 CNA 评分（NVD 将其列为次级评分源）。未经认证的 Web 界面认证绕过（CWE-288）可链接至 root RCE，"经由一个在启动时创建的异常系统进程"；CyberAuth 的公开 PoC 已被独立复现，在 FMC 10.0.1-1 上"确认 uid=0(root) 执行"（Full Disclosure，8 月 20 日）。Cisco 的 v2.5 公告确认 8 月起"Cisco PSIRT 已知悉在野利用"，并警告热修复"可能无法解决既有入侵"，同时给出 `/var/tmp/license.tmp` 的 IoC 检查方法。无任何变通方案。

**为什么重要：** 三天的 KEV 期限，加上公告自己的告诫——打补丁不会驱逐已植入的木马——这已经是一个取证问题，而不是补丁日清单上的一行。评分纪律同样重要：10.0 是 Cisco 自评，不是 NVD 分析分。

[`🔗 Cisco 公告 cisco-sa-onprem-fmc-authbypass-5JPp45V2`](https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-onprem-fmc-authbypass-5JPp45V2) · [`🔗 Full Disclosure：uid=0 PoC 复现`](http://seclists.org/fulldisclosure/2026/Aug/80)

---

## 4. Nous Research 的 Hermes Agent 发布 v0.21.1——一次卷入 5,139 个提交的 rollup，周增 4.2k 星、总量约 24.4 万

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub Trending 周榜 · 243,806★（+4,221/周）· v0.21.1 发布于 9 月 7 日
- **Tags:** `agent-runtime` `self-improving-agents` `open-source`

Nous Research 的自我改进终端智能体（从经验中生成技能、Honcho 用户建模、Telegram/Discord/Slack/WhatsApp/Signal 消息网关、七个执行后端）于 9 月 7 日发布 v0.21.1——明确标注为"自 v0.21.0 以来 main 分支的 rollup"：5,139 个非合并提交、4,364 个文件、632 个已合并 PR，策展版说明推迟到 v0.22.0。README 的告诫很具体：Windows Defender 将捆绑的 `uv.exe` 误报为病毒（官方发布了证明文件验证流程）；checkout 内的开发 venv "可能被智能体对自身 checkout 运行的相对路径命令抹掉"。另一面：5000+ 未关闭 issue 和 5000+ 未关闭 PR。

**为什么重要：** 单个补丁 rollup 的提交量即使对这个仓库也不寻常，说明自我改进智能体品类正在向 Hermes 收敛——但维护负担才是星数没讲的那半边故事。

[`🔗 NousResearch/hermes-agent`](https://github.com/NousResearch/hermes-agent) · [`🔗 v0.21.1 发布说明`](https://github.com/NousResearch/hermes-agent/releases)

---

## 5. NeoHorse-1 宣称向递归自我改进迈进——但其论文自己称之为"原型"

- **Velocity:** ▮▮ rising
- **Source:** Hugging Face papers · 9 月 9 日第 1 · 352 提交者 / 70 论文点赞
- **Tags:** `self-improvement` `agentic` `post-training`

TokenRhythm 发布的 NeoHorse-1 论文（arXiv，9 月 8 日，36 人署名"NeoHorse Team"）描述了智能体原生的 4B/9B 模型，训练数据来自一个路由调度的异构模型池的日志：路由信号构建三阶段 SFT 课程，加上路由引导的 on-policy 蒸馏，最终由"评估—选择—更新"反馈回路收口。11 项基准的宏平均从 58.94 升至 64.87（4B）、65.60 升至 69.04（9B），后训练的 4B 基本追平 9B 基座。论文自己把这个回路称为"这一反馈驱动过程的初始原型"——跨迭代的递归是声明的未来路径，不是已验证的结果。

**为什么重要：** RSI 的框架会被断章引用；诚实的标题是"harness 介导的智能体后训练 + 反馈回路设计"。按本 feed 的纪律，作者自己的免责声明是故事的锚点，不是脚注。

[`🔗 arXiv:2609.08183`](https://arxiv.org/abs/2609.08183) · [`🔗 Hugging Face papers`](https://huggingface.co/papers)

---

## 6. Fortinet CVE-2025-25249：3 万目标"PivotC2" campaign 全解析——次日该 CVE 进入 KEV

- **Velocity:** ▮▮ rising
- **Source:** SOCRadar 研究 · 9 月 8 日发布 · CISA KEV 9 月 9 日收编（9 月 12 日到期）
- **Tags:** `fortinet` `firewall` `rat` `kev`

SOCRadar 威胁研究组发布了对一个利用 CVE-2025-25249 的 campaign 的完整拆解——该漏洞是 FortiOS/FortiSwitchManager `cw_acd` CAPWAP 守护进程（UDP 5246）的堆溢出——攻击者借此部署"PivotC2"，一个代码里带 AI 辅助注释的 Node.js 后渗透 RAT。攻击者文件显示 30,000+ 个被瞄准的 IP 和 178 个确认感染（以美国为主，两起完整入侵伴随数据外泄）；SOCRadar 高置信度评估为一个俄语背景、以经济利益为动机的团伙，活动至少可追溯到 7 月。次日 CISA 将该 CVE 收入 KEV。评分注记：NVD 评分 9.8，Fortinet 自己的 CNA 评分是 8.1（`AC:H`）。SOCRadar 的 FAQ 直白回答了它自己提出的问题："打补丁能清除 PivotC2 吗？不能。"

**为什么重要：** 一个 10 个月前已修复的 CVE，带着完整武器化链（ASLR 绕过、堆整形、借 FortiOS 自带 Node.js 运行时做 ROP）仍在吃防火墙——而且打补丁只关闭利用路径、不清除植入物，所以对 `fsv_sync.dat` 被收割的设备必须轮换凭据。两个评分相差 1.7 分，是本周的 CNA/NVD 分歧教材。

[`🔗 SOCRadar：CVE-2025-25249 PivotC2 拆解`](https://socradar.io/blog/cve-2025-25249-pivotc2-fortigate-rat/) · [`🔗 NVD：CVE-2025-25249`](https://nvd.nist.gov/vuln/detail/CVE-2025-25249)

---

## 7. Desert Ant Labs 发布 18 个超小端侧模型——月活 10 万台设备以下免费

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 326+ 分 · 85 评论 · 约 9 小时前（~19:39 UTC+8）
- **Tags:** `on-device-ai` `edge-inference` `sdk`

一家新的欧洲实验室（由 Detail 视频应用的作者创立）于 9 月 8 日发布：18 个任务专用端侧模型（12 个稳定版），统一在一个 Swift/Kotlin/JS SDK 之后，月活设备低于 10 万免费。Voz 在 iPhone 上 2 秒转写 10 分钟音频（宣称比 Whisper 快 4.7 倍，M3 Ultra 上 319 倍实时 vs Apple SpeechAnalyzer 的 78 倍）；9MB 的 Clear 做音频增强；12MB 的 Redact 做 PII 脱敏；284MB 的 Clips 做视频切条。帖子自己的告诫：Redact 的 PII 捕获率 88.8%，低于 GLiNER-PII 的 91.1%；所有基准为自测；Clear 的数字是"三次中最好的一次"。

**为什么重要：** 为应用的转写/脱敏/分类这一层提供了一个成体系的、有定价的云 API 替代品——免费层、无 token、无登录直接攻击按 token 计费的模式，"从未上传"的隐私论点也真起作用。每一条性能差值都是厂商基准，帖子自己也这么说。

[`🔗 Desert Ant Labs 发布文`](https://desertant.com/blog/introducing-desert-ant-labs/) · [`🔗 Hacker News 讨论`](https://news.ycombinator.com/item?id=49624823)

---

## 8. Imbad0202/academic-research-skills——4 技能 32 智能体的科研流水线，4.7 万星，且对自身盲点毫不讳言

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending 周榜 · 47,254★（+2,430/周）· 更新日志 v3.21.2，9 月 6 日
- **Tags:** `agent-skills` `research-tools` `claude-code`

一套覆盖 research → write → review → revise → finalize 的四技能套件：13 智能体深度研究团队（8 种模式，含 PRISMA 系统综述）、12 智能体论文流水线（MD/DOCX/LaTeX→PDF）、带"魔鬼代言人"角色的 7 智能体多视角评审、以及带"强制诚信门"的 10 阶段编排器。README 的哲学是"AI 是你的副驾驶，不是飞行员"，告诫异常直白："一贯被如实报告的造假可以通过这些检查"（它验证的是报告内容，不是实验是否真的做过）、实时评审输出为 `NOT_CALIBRATED`，并明确拒绝做"humanizer"。许可为 CC BY-NC 4.0——仅限非商业。

**为什么重要：** 它说明技能生态正在从单一技巧仓库成熟为完整的多智能体流水线——而 NC 许可和"实验造假盲点"恰恰是下游用户最容易踩中的两件事。

[`🔗 Imbad0202/academic-research-skills`](https://github.com/Imbad0202/academic-research-skills) · [`🔗 GitHub Trending 周榜`](https://github.com/trending?since=weekly)

---

## 9. 蒸馏指纹：推理前填（prefill）测试显示 Qwen3.8 对 GPT-5.5 Pro 答案的引力最强

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 90+ 分 · 35 评论 · 约 3 小时前（~01:24 UTC+8）
- **Tags:** `distillation` `benchmarks` `qwen`

Yu Zhang（wsxiaoys）扩展了他的"蒸馏指纹"测试：用一个模型的推理通道预填 GPT-5.5 Pro 推理的前 1%，然后在 45 道题上测量其最终答案与教师的 n-gram 重合度。Qwen3.8 A95B 从 16.79% 跳到 34.97%（+18.18 个百分点，所有类别全涨），而 DeepSeek V4 Flash 移动 −1.17pp、Inkling +0.46pp、Kimi K3 +4.54pp。作者的结论刻意收窄："Qwen 可能从 GPT-5.5 Pro 或一个密切相关的 GPT 模型学习过"——且此前一轮测试显示 Qwen 对 Opus 4.8 几乎没有偏移。

**为什么重要：** n-gram 重合度是提示性的，不是蒸馏的证明——45 道题、单一方法，这些限定必须与结论同行。它与我们 9 月 9 日报道的 Qwen3.8 量化基准是两回事：这次问的是模型可能用什么训练的，不是它量化后表现如何。

[`🔗 wsxiaoys 的 gist：方法与结果`](https://gist.github.com/wsxiaoys/e0286dc6bb624ff5fdf49e7f4c528ba3) · [`🔗 Hacker News 讨论`](https://news.ycombinator.com/item?id=49630026)

---

## 10. AuK——统一语音生成与指令编辑的 1.5B 开源权重基础模型

- **Velocity:** ▮▮ rising
- **Source:** Hugging Face papers · 9 月 9 日第 2 · 163 提交者 / 152 论文点赞
- **Tags:** `speech` `tts` `open-weights`

AuK（arXiv 2609.08936）在约 1.5B 的模型里统一了语音生成与基于指令的语音编辑，训练数据约 30 亿条指令-音频实例 / 195 万小时，架构基于 Qwen2.5-Omni 语义条件化、音频 VAE 和混合整流流 MMDiT/DiT——代码与权重均已发布。自报数字：Seed-TTS-Eval 平均 WER 2.65% / SIM 0.795，SpeechEditBench 的内容/韵律/声学三项均最佳；蒸馏版 AuK-Flash 4 步推理，宣称加速 4.5 倍。自述局限：原生的自由格式指令跟随较弱（仍需 Prompt Enhancer 路由），中文同音字错误 RL 也修不掉。归属注记：HF 列表上的"Tencent Hunyuan"提交者标签未获论文证实——作者团队是 F5-TTS 学术团队。

**为什么重要：** 一个真正开放、小巧、可编辑的语音基础模型，是对闭源 TTS 堆栈的直接开源回应——指标是自报的，但已发布的权重让它们可被检验。

[`🔗 AuK on Hugging Face papers`](https://huggingface.co/papers/2609.08936) · [`🔗 arXiv:2609.08936`](https://arxiv.org/abs/2609.08936)

---

## 11. 腾讯混元 Gander 把全双工语音智能体拆成 9B"小脑"+ 免训练"大脑"

- **Velocity:** ▮ steady
- **Source:** Hugging Face papers · 9 月 9 日第 3 · 105 提交者 / 137 论文点赞
- **Tags:** `voice-agents` `full-duplex` `architecture`

Omni Interaction Agent 技术报告提出 Gander：一个 9B 流式 Thinker-Talker 全双工"前小脑"（分块听/说/打断决策，无需外部 VAD，约 2 分钟滑动上下文），外加一个免训练、即插即用的任务智能体作为"后大脑"。在 Full-Duplex-Bench v3 上，它的轮次承接（100.0）和打断延迟（8.0 vs GPT-Realtime 的 13.5）领先，但任务准确率落后于商业系统（Pass@1 0.400 vs 最佳 0.600）。它自己列出的局限：51.6% 的填充词率、相对基座模型 WorldSense 回退 6.08 分、大小脑之间仅靠 ASR 文本耦合、尚无后训练/RL。

**为什么重要：** 这种拆分架构让推理升级不必重训交互层——一个大概率会被抄的务实模式——但论文罕见地坦承任务准确率仍输给 GPT-Realtime。

[`🔗 arXiv:2609.08977`](https://arxiv.org/abs/2609.08977) · [`🔗 Hugging Face papers`](https://huggingface.co/papers)

---

## 12. OpenWAM——模块化世界-动作模型预训练栈，宣称在真实双臂机器人榜单登顶、成功率翻倍于 pi0.5

- **Velocity:** ▮ steady
- **Source:** Hugging Face papers · 48+ 提交者点赞 · GitHub 344★
- **Tags:** `world-model` `robotics` `open-source`

OpenWAM 把世界-动作模型预训练拆解为 Infra（可组合模块、8 个仿真基准）、Study（关于知识继承与世界-动作协同的受控实验）和 OpenWAM-α——后者在约 6,400 小时（约 5.185 亿帧）自我中心人类+机器人数据上预训练。宣称结果：移动双臂 EBench SOTA、真实世界 RoboDojo-Real 第 1，"成功率是 pi0.5 的两倍"。所称优势特指分布外泛化，所有结果均为作者自报。

**为什么重要：** 世界-动作模型正是世界模型研究与 VLA 机器人学的汇合处；一个完全开放的栈（代码、权重、数据配方）让这一路径第一次可复现，而此前的 WAM 工作都是闭源的。

[`🔗 OpenWAM on Hugging Face papers`](https://huggingface.co/papers/2609.07398) · [`🔗 arXiv:2609.07398`](https://arxiv.org/abs/2609.07398)

---

## 13. Procedural Graphs——Google 主导的论文给智能体可自演化的"怎么做"记忆

- **Velocity:** ▮ steady
- **Source:** arXiv + Hacker News · 24+ 分 · 约 3 小时前（~01:13 UTC+8）
- **Tags:** `agent-memory` `research` `planning`

arXiv:2609.09153（9 月 8 日提交；Yuxing Lu、Yicheng Chen、Shanchan Wu、Sercan Ö. Arık）提出 Procedural Graphs——以"（程序，关系，程序）"三元组作为知识图谱的程序性对应物。一个引导模型把局部子图转成步骤级提示，"在不发号施令的前提下偏置求解器的下一步动作"；一个 LLM 精炼器从成败轨迹对比中编辑图拓扑，只保留在验证集上成立的修改。宣称：演化出的图谱匹敌或超越手工设计，能修复有缺陷的专家先验，并在多数据集、多 LLM 上击败基于记忆的基线。摘要中看不到局限性章节——基准细节在 36 页正文里。

**为什么重要：** 智能体记忆此前以情节/事实为主；一个显式学习工具顺序与前置条件的自演化程序层是不同的原语——而且它直接落进 MCP/技能工具链的讨论里。

[`🔗 arXiv:2609.09153`](https://arxiv.org/abs/2609.09153) · [`🔗 Hacker News 讨论`](https://news.ycombinator.com/item?id=49629868)

---

## 14. Geiger——`npx geiger-scan` 盘点你机器上的每一个智能体、MCP 服务器和技能

- **Velocity:** ▮ steady
- **Source:** Show HN · 33+ 分 · 19 评论 · 约 6 小时前（~22:54 UTC+8）
- **Tags:** `agent-security` `mcp` `supply-chain`

Atomburst 的 Geiger（57★，JavaScript，MIT，零运行时依赖）是一个只读扫描器，读取已知配置位置——Claude Code 的 MCP/hooks/plugins/skills/subagents、MCP 宿主（Cursor、Windsurf、VS Code、Cline、Zed 等）、智能体 CLI（Codex、Gemini CLI、Aider、Goose 等）——不执行任何 npm，并为每项发现打上 EXECUTES / HOLDS-SECRETS / BROAD-FILESYSTEM / NETWORK 标签和来源分类（含 UNKNOWN-ORIGIN）；`--diff` 基线模式可作为 CI/cron 的漂移警报。README 的诚实边界：它"读取配置，不读取运行时行为"，看不到容器/WSL/其他用户账户里的智能体，且"来源 ≠ 可信度"。

**为什么重要：** 当技能和插件正以趋势级规模从 GitHub 装进机器，一台机器级的盘点/审计工具回答了显而易见的下一个问题：我到底装了什么，它能碰到什么？

[`🔗 Atomburstofficial/geiger`](https://github.com/Atomburstofficial/geiger) · [`🔗 Show HN 讨论`](https://news.ycombinator.com/item?id=49627646)

---

## 15. Red Hat Hawtio Operator 签名预言机（CVE-2026-78234，CVSS 9.9）——跨租户身份冒充直到 OpenShift 上的 RCE

- **Velocity:** ▮ steady
- **Source:** Red Hat 公告 · 9 月 8–9 日浮出 · SecurityOnline 分析 9 月 9 日
- **Tags:** `kubernetes` `openshift` `cve`

hawtio-operator（Red Hat build of Apache Camel 工具链）会读取 OpenShift Service CA 私钥，并用攻击者指定的 Common Name 签发客户端证书——实质上是"给任意 namespace 编辑者一台签名预言机"，可实现跨租户服务身份冒充，并经 Jolokia MBean 调用直达 RCE。CVSS 9.9 由 Red Hat 作为 CNA 评定，但明确"为初步评分、待复核"；Red Hat 将影响仅定为 *Important*，因为利用需要认证（任意 namespace 的编辑权限）。配套公告 CVE-2026-77968（CVSS 8.2，NVD 9 月 8 日发布）覆盖该 operator 过宽的集群级 Secret 读取——两个是不同的 CVE，不是同一个洞。

**为什么重要：** 利用只需要集群 edit 角色——一个很常见的授权——就能把它变成全集群的证书伪造。缓解是配置层面的（CSR API、收紧 RBAC、轮换证书），不只是升级；目前无确认的在野利用、无公开 PoC。

[`🔗 Red Hat：CVE-2026-78234`](https://access.redhat.com/security/cve/CVE-2026-78234) · [`🔗 SecurityOnline 分析`](https://securityonline.info/hawtio-operator-vulnerability-cve-2026-78234/)

---

## 16. petergyang/no-ai-slop——反 AI 腔技能竞赛续场：20+ 种 AI 味模式，几天 7.8k 星

- **Velocity:** ▮ steady
- **Source:** GitHub Trending 周榜 · 7,792★（+1,038/周）· 周榜第 20
- **Tags:** `agent-skills` `writing-tools` `llm`

一个装成技能的 AI 腔检查器（"It's not X. It's Y." 二元对仗、清嗓式开头、"a testament to"式吹捧、伪深刻结尾……），可在 Claude Code/Codex/ChatGPT 里以 `/no-ai-slop` 运行，或经 `npx skills add` 安装。检测模式刻意只标记文风、"不猜测文本是否由 AI 写成"；README 自己承认了核心矛盾：AI 润色倾向于"抹平"个人风格——而这正是该技能要规避的风险。宣称的 20+ 模式里只有 10 个公开列出（其余在 `SKILL.md` 里），没有 release，也无法独立运行。

**为什么重要：** humanizer 时刻的第二波——证明"单文件技能即产品"的分发通道一周内就能把写作工具送上数千星，同时也说明这类仓库实际是未成文的规则文件。模式分类是英文 LLM 专属的；每种语言需要自己的"AI 味"清单。

[`🔗 petergyang/no-ai-slop`](https://github.com/petergyang/no-ai-slop) · [`🔗 GitHub Trending 周榜`](https://github.com/trending?since=weekly)

---

## 17. GNU Radio 完整跑进浏览器——WASM 移植，经 WebUSB 直连真实 SDR

- **Velocity:** ▮ steady
- **Source:** Hacker News · 126+ 分 · 16 评论 · 约 5 小时前（~23:53 UTC+8）
- **Tags:** `sdr` `webassembly` `gnu-radio`

gnuradioworld.com 是一个 GNU Radio Companion 风格的流图编辑器与运行时，DSP 栈和 Qt GUI sink 被编译为 WebAssembly；它可读写原生 `.grc` 文件，实时绘制频谱/瀑布/星座图，并经 WebUSB 连接 RTL-SDR、PlutoSDR 或 HackRF——"无 Python、无安装、无服务器"。作者是 Marc Lichtman（777arc）。README 的诚实数字：WASM 明显慢于原生（抽取 FIR 上 12.1 vs 24 Msps）、没有通用 Python 运行时（纯 Python block 需要 C++ 移植）、需要 SharedArrayBuffer/COOP-COEP 托管并推荐 Chrome 或 Firefox。

**为什么重要：** 它拆掉了一直挡在 SDR 实验面前的安装门槛——GNU Radio 模块生态（gr-satellites、gr-adsb、gr-lora_sdr……）变成了一个 URL；而且这个移植公布了自己的性能损失，没有藏。

[`🔗 gnuradioworld.com`](https://gnuradioworld.com/) · [`🔗 777arc/gnuradio-world`](https://github.com/777arc/gnuradio-world)

---

## 18. Read the Docs 复盘：一场持续 10 天、峰值 550 万请求/分钟、以吹大账单为目的的 DDoS

- **Velocity:** ▮ steady
- **Source:** Read the Docs 博客（9 月 8 日）· HN 98+ 分 · 约 5 小时前（~23:55 UTC+8）
- **Tags:** `ddos` `infrastructure` `cloudflare`

Read the Docs 披露了 2026 年 6 月一场持续近十天的攻击：峰值超过 550 万请求/分钟（约为正常的 100 倍，比以往任何一次大 10 倍），来自数百个 ASN 的数百万 IP。攻击随机化 HTTP/TLS 指纹以击穿 JA3/JA4 指纹识别，只打缓存未命中的 URL（唯一 404、未缓存 302），并用"yo-yo 模式"最大化自动扩容成本。缓解：在边缘缓存 404/重定向、bot 评分加每 IP 限速、用 Terraform 管理的"penalty box"规则系统。最有价值的是它的自曝：两道防线被正面击穿（协议一致性检查和 JA4 都被破解）；他们拒绝开 Cloudflare 的 Under Attack Mode（"会弄坏所有 API 集成"）；他们把平静称为"一段延长的缓刑"——发稿时残余攻击流量仍在继续。

**为什么重要：** 给所有运营公共文档基础设施的人的一份模板级复盘——IP 封禁"对分布式攻击已经过时"，而现代 DDoS 的目标是你的云账单。帖子是 9 月 8 日发的，攻击发生在 6 月——别读成进行时事件。

[`🔗 Read the Docs：the 2026 DDoS attack`](https://about.readthedocs.com/blog/2026/09/2026-ddos-attack/) · [`🔗 Hacker News 讨论`](https://news.ycombinator.com/item?id=49628614)

---

## 19. Google Ads 把一个签名公证的 macOS 应用标成"恶意软件"——HN 关注后才解封

- **Velocity:** ▮ steady
- **Source:** xlii.space（9 月 9 日）· HN 306+ 分 · 185 评论 · 约 9 小时前（~19:43 UTC+8）
- **Tags:** `google-ads` `app-distribution` `false-positive`

RACE（一个签名并公证的原生 macOS 终端复用器）的开发者花了 500 美元投了人生第一笔 Google Ads，账户即因"Malicious software"和"Compromised Site"被封——两条例由都没有任何细节。他记录了穷尽式的自证清白（Safe Browsing、Search Console、带哈希的 VirusTotal、公证、JS bundle 审查）、四次被自动驳回的申诉和一次为期一周的封禁。HN 讨论后帖子顶端加了一条编辑："借助 Hacker News 显然的魔力，我的 Google Ads 账户已恢复……依然没有任何关于触发了什么的解释。"

**为什么重要：** 一则广告平台咽喉处不透明自动化安全标记的具体案例——唯一奏效的救济是病毒式曝光，而解封与注意力相关、与任何证据变化无关。作者自己的告诫成立：Safe Browsing 的干净结果"并不能确定 Google Ads 到底检测到了什么"。

[`🔗 xlii.space：Malicious software on Google Ads`](https://xlii.space/eng/malicious-software-on-google-ads/) · [`🔗 Hacker News 讨论`](https://news.ycombinator.com/item?id=49624856)

---

## 20. RadixArk Miles v0.1 随技术报告落地——自 9 月 4 日我们报道以来，这个企业级 RL 分支已经发货

- **Velocity:** ▮ steady
- **Source:** arXiv 技术报告（9 月 8 日）· Hugging Face papers · GitHub 2.7k★
- **Tags:** `rl` `post-training` `open-source`

**更新：** 我们 9 月 4 日报道 radixark/miles 时，它还是"一个为大规模 RL 后训练而生、正在浮现的企业级 slime 分支"。此后它发布了 Miles v0.1（Apache-2.0）和一份 34 页技术报告（arXiv，9 月 8 日）：SGLang rollout 引擎、Megatron-LM 或 FSDP 训练后端、三种权重同步通道，外加 LoRA RL、on-policy 蒸馏与扩散模型支持。报告的案例研究在 64 张 GB300 上对 GLM-5.2 744B-A40B 跑全异步智能体 RL 做终端编码任务，中位 step 时间 263 秒；README 确认低精度训练（MXFP8/NVFP4）、TITO、MoE 路由重放与容错，并支持 GLM-5.2/DeepSeek-V4/Kimi-K3 的 day-0 适配。

**为什么重要：** 前沿规模的 RL 基础设施是开源栈里最稀缺的一层；一个经过验证、以企业为定位、带着公开案例数据的入局者，说明后训练工具正在商品化。GLM-5.2 的数字是厂商自己的报告——单一信源，不是独立基准。

[`🔗 arXiv:2609.08368 技术报告`](https://arxiv.org/abs/2609.08368) · [`🔗 radixark/miles`](https://github.com/radixark/miles)

---

## 21. DeepSeek V4.1 Flash 正式公开上线——继 9 月 9 日我们报道内测之后，权重、技术报告与 MIT 许可全部落地

- **Velocity:** ▮▮▮ trending
- **Source:** Hugging Face + Hacker News · 480+ 分 · 260 评论 · 约 5 小时前（~15:00 UTC+8）
- **Tags:** `deepseek` `open-weights` `moe`

**更新：** 9 月 9 日我们报道 V4.1 Flash 时，它还是"一个只有两天窗口的内测版"。公开发布如今落地：DeepSeek-V4.1-Flash 已上 Hugging Face，MIT 许可，代码与权重齐备，并附技术报告。模型页：552B 主干的 MoE（485B 存储 + 一个 196B 稀疏访问的"Engram"条件记忆模块），prefill 仅约 8B 激活 / decode 约 16B，40 层 Causal Encoder-Decoder，FP4 KV 缓存加 CSA2 稀疏注意力，宣称全局 KV 缓存"每 token 890 字节"（约为 V4-Flash 的 1/4），384 个路由专家（激活 6 个），一个 ViT 视觉编码器，以及 45T token 的多模态预训练语料和 1M 上下文。最大推理努力下的 Instruct 数字：GPQA Diamond 90.9、Codeforces 3471、Terminal-Bench 2.1 90.6、HLE 36.8。发布本身坦承的摩擦点：没有 Jinja 聊天模板（代之以一个 Python 参考实现和一个 Rust 工具包），模型卡注明 DeepSWE 依 agent 脚手架不同在 65.6–74.2 之间浮动。

**为什么重要：** 内测时承诺的架构现在可以打开审视了——而模型卡自己对脚手架敏感性的注记，正是每一次引用其基准时都该带上的告诫。HN 帖给出的现实下限：总参数约 552B，对本地用户来说它已塞不进"flash"生态位（有人估算 q4 量化也差一点才进 256 GB）。

[`🔗 deepseek-ai/DeepSeek-V4.1-Flash`](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) · [`🔗 Hacker News 讨论`](https://news.ycombinator.com/item?id=49639090)

---

## 22. "ShieldCrash"——Microsoft Defender 传奇的第三次绕过，Patch Tuesday 次日投放，再次附带公开 PoC

- **Velocity:** ▮▮▮ trending
- **Source:** BleepingComputer（9 月 9 日）+ GitHub PoC · 228★ · 约 13 小时前（~07:00 UTC+8）
- **Tags:** `windows` `defender` `lpe` `zero-day`

一名匿名研究员（"Nightmare Eclipse" / MSNightmare）于 9 月 9 日、恰在 9 月 Patch Tuesday 之后发布 ShieldCrash：宣称绕过微软对 ShieldBreak（CVE-2026-69414）的修复，而后者本身是对 6 月 RoguePlanet Defender 漏洞的绕过。该 PoC 在完全打补丁的 Windows 10/11/Server 上触发"以 SYSTEM 权限的任意文件读取"，README 宣称"所有受支持的 Windows 版本均受影响"。告诫来自研究员本人：这是一个只针对文件*读取*的"骨架 PoC"——"以后可能会把它改写成完整的 SYSTEM PoC。"ShieldCrash 没有 CVE 编号、无厂商确认、无在野利用证据，微软也未回应。这是一场持续中的披露争端的又一回合；微软此前曾威胁法律行动，而该研究员此前的多个发现（LegacyHive、BlueHammer、RedSun、UnDefend）仍未修复。

**为什么重要：** RoguePlanet→ShieldBreak→ShieldCrash 已经是针对同一组件的三轮补丁绕过连续剧——一个双重案例研究：对手能让一个已修复的洞保持多"不满足"，以及对抗性披露如何跑在赏金流程和厂商响应前面。

[`🔗 BleepingComputer：ShieldCrash 零日`](https://www.bleepingcomputer.com/news/security/new-microsoft-defender-shieldcrash-zero-day-grants-system-access/) · [`🔗 MSNightmare/ShieldCrash PoC`](https://github.com/MSNightmare/ShieldCrash)

---

## 23. 苹果发布 iPhone Duo——首款折叠屏，约 2,000 美元，折痕之争从发布日当天就开始

- **Velocity:** ▮▮▮ trending
- **Source:** Apple + Hacker News · 1,240+ 分 · 2,176 评论 · 约 14 小时前（~06:00 UTC+8）
- **Tags:** `apple` `hardware` `foldable`

苹果主题演讲发布了 iPhone Duo，其首款书本式折叠屏：闭合时为方形形态，5.4 英寸外屏（即已停产的 iPhone mini 的尺寸），大量宣传折痕最小化，10 月 23 日上市，售价约 2,000 美元。发布当天的 HN 帖（2,176 条评论）已经出现了反证：多条照片/视频报告显示暗色背景、熄屏状态下折痕可见，对铰链长期耐用性的怀疑，以及相比 iPhone 18 Pro 少了一个镜头选项的吐槽。主题演讲还安排了 Tim Cook 向 John Ternus 的领导权交接，同期发布 AirPods 5、Apple Watch Series 12 和 iPhone 18 Pro。

**为什么重要：** 当天最大的 HN 帖是一场硬件发布，而它最受争议的宣称——折痕——恰恰属于那种由机主而非发布会来裁决的"营销 vs 现实"落差；2,000 美元的定价让早期采用者的风险变得真实。对开发者来说，5.4 英寸外屏 / 方形内屏的分屏是一个新的布局目标。

[`🔗 Apple：iPhone Duo`](https://www.apple.com/iphone-duo/) · [`🔗 Hacker News 讨论`](https://news.ycombinator.com/item?id=49630931)

---

## 24. Raschka 谈 GPT-6 Astra 与"循环 transformer"——是权重复用，不是隐藏 CoT 阴谋

- **Velocity:** ▮▮ rising
- **Source:** Sebastian Raschka + Hacker News · 452+ 分 · 146 评论 · 约 16 小时前（~04:00 UTC+8）
- **Tags:** `transformers` `interpretability` `reasoning`

在有报道把 GPT-6 Astra 传闻中的循环 transformer 架构描述成隐藏推理的秘密技术之后，Raschka 的文章主张：循环（在堆叠层间复用权重）首先是一种省 GPU 显存的参数共享技巧——"仍然只是逐个生成 token"——本身并不是 CoT 监控隐患。HN 帖把两边都磨得更尖：评论者指出，如果循环深度是按 token 动态选择的，计算会丰富得多；并援引 Astra 系统卡自己的表格——可见 CoT 在讨论无关内容的同时答对了一道 trivia 题——"CoT 可控性"高得反常。Will Merrill 关于不同问题需要多少 CoT 的工作被引为正确的理论框架。

**为什么重要：** 自我们 9 月 4 日报道 GPT-6 Astra 发布以来，这是对其"隐藏推理"叙事的第一篇认真的架构级批评——而有用的结论是：潜空间迭代是一个真实且重要的可解释性问题，不需要靠"泄露"框架来成立。

[`🔗 Raschka：GPT-6 Astra、循环 transformer 与隐藏推理`](https://magazine.sebastianraschka.com/p/gpt-6-astra-looped-transformers-and) · [`🔗 Hacker News 讨论`](https://news.ycombinator.com/item?id=49627370)

---

## 25. bilawalsidhu/gods-eye-view——只用真实数据的浏览器"间谍卫星模拟器"以 +1,588/日重新 trending

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · 22,200★（今日 +1,588）· MIT
- **Tags:** `osint` `cesium` `data-visualization`

一个 CesiumJS + Google Photorealistic 3D Tiles 地球仪，把实时公开数据流叠加进"间谍卫星"界面：11,000+ 架飞机（OpenSky/adsb.lol）、船舶（AISStream）、838 个目标的卫星目录（CelesTrak）、地震（USGS）、约 800 路公开 CCTV、NASA 火灾监测、电台——13 个图层中 11 个免密钥可用，带 NVG/FLIR 传感器风格、军用 HUD，以及经 OpenAI Realtime 的语音控制（28 个工具，会话硬上限 5 美元）。README 的诚实程度罕见地彻底："数据可能延迟、不完整、经建模、推断或有误"；车流是在真实道路上模拟的；CCTV 姿态是用户标定的先验；发射回放标注为"RECONSTRUCTED ESTIMATE"；并明确拒绝做人员追踪或人脸识别。8 月首次 trending 第 1；这一波靠的是一个病毒式传播的 YouTube 系列。

**为什么重要：** 把驱动 OSINT 工具的那批公开数据流装进一个电影感界面——而且限制写进了产品里，而不是留给用户自己发现。触发点是 YouTube 浪潮，不是新代码（总共 24 次提交）——这对任何把星数读成势头的人都很重要。

[`🔗 bilawalsidhu/gods-eye-view`](https://github.com/bilawalsidhu/gods-eye-view) · [`🔗 GitHub Trending`](https://github.com/trending)

---

## 26. CISA：WatchGuard Firebox iked RCE（CVE-2025-14733，9.3）正被用于勒索攻击——仍有 9,000 台未打补丁

- **Velocity:** ▮▮ rising
- **Source:** CISA + BleepingComputer（9 月 10 日）· WatchGuard PSIRT 公告 8 月 10 日更新
- **Tags:** `cve` `firewall` `ransomware` `kev`

CISA 本周表示，CVE-2025-14733——Firebox `iked` IKEv2-VPN 处理器中的越界写入，无需认证，CVSS 9.3（厂商评分），2025 年 12 月起列入 KEV——现已知被勒索软件团伙利用，但未点名团伙、未分享细节。WatchGuard 于 2025 年 12 月修复并当时确认在野利用；Shadowserver 当时统计有 115,000+ 台暴露且未打补丁的 Firebox，九个月后仍有约 9,000 台易受攻击。两个告诫很重要：利用要求存在 IKEv2-VPN 配置；而且即便删除了该配置的设备，如果仍保留指向静态对端的分支办公室 VPN，也可能依然暴露。

**为什么重要：** 一个九个月前就有补丁、未修补数量在缩小但顽固存活的群体，正是勒索团伙的"省力目标"清单——而"我们删了配置"这一缓解并不彻底的细节，最可能在真实资产清单里出错。WatchGuard 的中小企业盘子（经 17,000+ 家经销商覆盖 250,000+ 企业）让这条长尾很长。

[`🔗 BleepingComputer：CISA 谈 WatchGuard 勒索攻击`](https://www.bleepingcomputer.com/news/security/cisa-watchguard-rce-flaw-now-exploited-in-ransomware-attacks/) · [`🔗 WatchGuard PSIRT：CVE-2025-14733`](https://psirt.watchguard.com/)

---

## 27. JustVugg/colibri——纯 C 推理引擎把前沿 MoE 专家从磁盘流式加载，不做"flash"式粉饰

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · 27,285★（今日 +157）· Apache-2.0
- **Tags:** `inference` `moe` `ssd`

Colibrì 在消费级硬件上运行 744B–2.8T 的 MoE 模型（GLM-5.2、Kimi K3、Inkling、DeepSeek V4 Flash……），做法是把 VRAM/RAM/NVMe 当作一个统一层级：稠密部分常驻（GLM-5.2 的 int4 约 9.9 GB），19,456 个路由专家（约 370 GB）按需从磁盘流式读取——"一个 JIT，只是针对权重"，路由有 71.6% 可提前一层预测。已公布的数字对下限毫不掩饰：6× RTX 5090 上 5.8–6.8 tok/s；128 GB 纯 CPU 机器热态约 1.8 tok/s；25 GB 冷态 0.05–0.1 tok/s。README 列出尚未验证的部分（放置策略、SSD 条带化、自动规划），并报告投机解码在其自测中是实测的净损失（MTP：专家命中率近 85% 时 −32%；DeepSeek drafter 默认关闭）。

**为什么重要：** 不同于我们 9 月 9 日报道的 Kimi-K3-on-MacBook（一次性四 SSD 表演），colibri 是同一技巧背后一个持续维护的开源引擎——而它把失败模式（量化容器规则、依赖硬盘的 `O_DIRECT`）与 tok/s 一起公布，正是这些数字可用的原因。

[`🔗 JustVugg/colibri`](https://github.com/JustVugg/colibri) · [`🔗 GitHub Trending`](https://github.com/trending)

---

## 28. little-lm：3.8B LLM 从零训练，998 美元做到 0.384 CORE——测量上的告诫直接印在文中

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 91+ 分 · 14 评论 · 约 4 小时前（~16:00 UTC+8）
- **Tags:** `pretraining` `nanochat` `reproducibility`

Hugo Vergnes（Apple 的视频理解工程师，晚间业余项目）从随机权重训练了一个 3.8B Llama 风格模型：65.3B token 的 ClimbMix，8× 租用 B200 上 43 小时，998 美元，0.384 CORE——对比 nanochat d32 的约 1,000 美元 0.310 和 GPT-2 1.5B 的 0.2565。这篇写作的价值在"负空间"：FineWeb-Edu 在一次失败的早期运行后被放弃；产出头条分数的 1024→2048 上下文重跑，很大程度上是一次*测量*修复（SQuAD 和 BoolQ 的提示在 1024 token 里放不下——这两个任务贡献了约 83% 的涨幅，另外 19 个任务只动了 +0.008）；CORE 的移动幅度约是 loss 的 7 倍，他特意提醒任何用 CORE 做决策的人引以为戒。FP8 GEMM、Muon+AdamW、梯形学习率、ResFormer 风格的 value embeddings（+3.2% CORE / 721M 参数）连同成败经验一起成文。

**为什么重要：** "业余预算的前沿邻近预训练"正在变成一个可复现的品类——这一篇值得精读，恰恰因为它展示了基准跳变里有多少可能是 harness 伪影而非学习成果。

[`🔗 little-lm 3.8B 写作`](https://hugovergnes.github.io/little-lm-3-8b/) · [`🔗 Hacker News 讨论`](https://news.ycombinator.com/item?id=49637435)

---

## 29. AlexsJones/llmfit——一条命令回答"这台机器到底能跑哪些模型？"

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · 35,510★（今日 +247）· MIT · Rust
- **Tags:** `local-llm` `hardware` `developer-tools`

llmfit 检测 CPU/RAM/GPU/VRAM（CUDA、Apple Silicon、ROCm、oneAPI；支持多 GPU 且感知 MoE），从四个维度给目录中的模型打分——内存匹配、预估速度、质量、上下文——带量化感知（GGUF、AWQ、GPTQ、EXL2）、TUI、web 仪表盘和 REST 端点。它的诚实体现在 `llmfit info`：速度和内存数字是基于内存带宽模型和社区 `bench --share` 提交的模型化估算，精度取决于社区数据是否匹配你的硬件——本地实测会替换掉估算值。

**为什么重要：** "能不能跑"这个问题每天在各量化论坛靠试错回答；一个把它集中起来、且让"估算 vs 实测"的区分始终可见的工具，是本地模型浪潮里安静但广泛有用的基础设施。

[`🔗 AlexsJones/llmfit`](https://github.com/AlexsJones/llmfit) · [`🔗 GitHub Trending`](https://github.com/trending)

---

## 30. diegosouzapw/OmniRoute——自托管 AI 网关，靠叠加各家免费层宣称每月约 14.7 亿免费 token

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · 63,817★（今日 +591）· MIT
- **Tags:** `ai-gateway` `routing` `self-hosted`

一个本地 OpenAI 兼容端点，路由到 352 个注册 provider（152 个标记免费），带配额感知的回退、熔断器、密钥冷却、19 种"combo"路由策略、一个 MCP 服务器（110 个工具）和 42 种语言本地化。README 自带星号：14.7 亿免费 token/月是"随 provider 改条款双向变动"的最佳情况聚合；约 30 亿/月的"Radar 上限不是保证"；provider 数在不同章节刻意不同（352/356/444）；节省百分比为自报；推广链接已披露。

**为什么重要：** 免费层聚合网关是一个靠 provider 善意生存的品类——OmniRoute 的功用是真实的（回退、配额感知、单一端点），但它的头条数字恰恰是那种会过期的数字；引用前先读告诫。

[`🔗 diegosouzapw/OmniRoute`](https://github.com/diegosouzapw/OmniRoute) · [`🔗 GitHub Trending`](https://github.com/trending)

---

## 31. Stockfish 19 发布——最高 +44 Elo、新 SFNNv16 网络、通用二进制

- **Velocity:** ▮ steady
- **Source:** stockfishchess.org（9 月 5 日）· HN 83+ 分 · GPL
- **Tags:** `chess` `nnue` `open-source`

Stockfish 19（9 月 5 日）对 Stockfish 18 的对战成绩最高提升 44 Elo，并保持引擎锦标赛领先。工程改动才是故事本身：一个新的 SFNNv16 NNUE 网络，用量化感知训练在数千亿个由强 Leela 网络重打分的局面上训练（删去冗余威胁特征、增加兵对特征、退役副网络）；自动检测 CPU 能力的通用二进制；原生 RISC-V（RVV）和 LoongArch 支持；WebAssembly 目标；严格的非法输入终止。

**为什么重要：** 国际象棋引擎仍是现存运行最久的开放基准社区；QAT 训练的 NNUE 和通用二进制属于那种不显眼的工程，却让一个 15 岁的项目既保持统治力又能被非专家安装。

[`🔗 Stockfish 19 发布公告`](https://stockfishchess.org/blog/2026/stockfish-19/) · [`🔗 Hacker News 讨论`](https://news.ycombinator.com/item?id=49599992)

---

## 32. Automattic 董事会强令 Matt Mullenweg 休假——WordPress.org 称开源项目不受影响

- **Velocity:** ▮ steady
- **Source:** TechCrunch（9 月 9 日）+ Hacker News · 325+ 分 · 215 评论 · 约 7 小时前（~13:00 UTC+8）
- **Tags:** `wordpress` `open-source` `governance`

Automattic 董事会 9 月 9 日投票让创始人/CEO Matt Mullenweg 带薪休假——据报道违背其意愿，且据其 Slack 消息，决议在投票前 50 分钟才送达。CFO Mark Davies 出任临时 CEO；官方未说明原因。背景是 WP Engine 诉讼（Automattic 的 8% 版税要求、诽谤与滥权指控）、2024 年导致 159 名员工离职的最后通牒，以及一轮 16% 的裁员。WordPress.org 的执行董事迅速把项目与公司切割："Matt 仍是 WordPress 项目的领导者"，各项优先事项继续不变。

**为什么重要：** WP Engine 纠纷把 WordPress 治理变成了单一创始人风险故事；董事会此举是对这种集中的第一次结构性制衡。对生态而言承重的说法是项目/公司分离——考虑到 Mullenweg 仍掌控 .org 项目，这恰恰是最值得盯住的诺言。

[`🔗 TechCrunch：Mullenweg 被强制休假`](https://techcrunch.com/2026/09/09/automattics-board-forces-ceo-matt-mullenweg-into-leave-of-absence/) · [`🔗 Hacker News 讨论`](https://news.ycombinator.com/item?id=49636283)

---

## 33. liquidslr/system-design-notes——28 章 Alex Xu 免费笔记，今日 +1,397，却完全没有许可证

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · 18,422★（今日 +1,397）· 无许可证文件
- **Tags:** `system-design` `interview-prep` `notes`

对 Alex Xu《System Design Interview》第 1、2 卷的逐章笔记（28 个目录，从限流器到证券交易所），每个主题附精选外部链接（Dynamo 论文、Discord/Slack 工程博客、斯坦福一致性哈希讲座）。告诫是结构性的：README 写着"进行中"，只有 35 次提交，笔记被镜像到一个商业网站（pagefy.io），且仓库**没有许可证文件**——默认版权适用，因此对一本商业书籍的衍生品来说，复用/再分发权利并不明确。

**为什么重要：** 今日涨势最快的仓库是学习笔记而不是软件——缺失的许可证加上商业镜像，使它成为"trending ≠ 你可以随便复用"陷阱的活案例，而在同一周，由版权材料构建的 agent 技能也在持续 trending。

[`🔗 liquidslr/system-design-notes`](https://github.com/liquidslr/system-design-notes) · [`🔗 GitHub Trending`](https://github.com/trending)

---

## 34. 三星公布 zHBM 原型——内存直接堆叠在 AI 加速器上，宣称 8 倍于 HBM5 的吞吐

- **Velocity:** ▮ steady
- **Source:** THE ELEC + Hacker News · 30+ 分 · 约 5 小时前（~15:00 UTC+8）
- **Tags:** `hbm` `memory` `hardware`

三星披露了一个 zHBM 原型：内存不再放在加速器旁边，而是直接堆叠在 AI 加速器裸片上，宣称（全部为厂商数字、原型阶段）：数据处理性能最高达第 8 代 HBM（HBM5）的 8 倍，每瓦性能提升 3 倍，热阻削减超过一半。HN 帖的开放问题是正确的那一个——内存控制器放在哪里（中间堆叠层还是主裸片）——而量产时间表、容量与价格细节一概没有。

**为什么重要：** 内存带宽与容量同时卡着前沿训练和本地推理（见 colibri，第 27 条）；堆叠上裸片是对这一约束最直接的进攻。所有数字都来自三星且为原型阶段——当作方向看，不要当作规格。

[`🔗 THE ELEC：三星 zHBM 原型`](https://www.thelec.net/news/articleView.html?idxno=12835) · [`🔗 Hacker News 讨论`](https://news.ycombinator.com/item?id=49593896)

---

## 35. Show HN：用可证明更少的乘法求多项式——附完整 Lean 证明

- **Velocity:** ▮ steady
- **Source:** Show HN · 100+ 分 · 34 评论 · 约 23 小时前（9 月 9 日 ~21:00 UTC+8）
- **Tags:** `algorithms` `formal-verification` `lean`

Thomas Ahle 发布了一个构造，用于对已知系数的一元多项式用更少乘法求值（加法和平方很便宜；乘法——尤其有限域上的——不便宜），改进 Horner/Estrin/Knuth-Eve/Pan/Rabin–Winograd 一脉，外加"一个用于通用哈希的单射多项式构造，用 N 次乘法、单一随机密钥哈希 2N 个值"，改进 Daniel J. Bernstein 的方案。约 100 页的证明在 Lean 中完全机器验证，并有一个交互式网站可视化这些电路。帖子明确列出了边界：有理系数会爆炸（有限域才是甜蜜点）；对浮点"请改用 Estrin"（FMA、流水线、数值稳定性）；仅限一元；WyHash/xxh3 不是多项式——不过论文显示这些启发式哈希在对抗输入上的碰撞率高得多。

**为什么重要：** 一次预处理、多次求值的多项式方案撑着哈希表、MAC 和 libm——而这里罕见的组合是"新的乘法次数上界 + Lean 证明"，因此其主张可被检验，而不是只靠跑分。

[`🔗 thomasahle.com/fast-polynomials`](https://thomasahle.com/fast-polynomials/) · [`🔗 Show HN 讨论`](https://news.ycombinator.com/item?id=49623398)

---

## Metadata

| 字段 | 值 |
|-------|-------|
| 生成时间 | 2026-09-10T20:05:00+08:00 |
| 条目数 | 35 |
| 追踪信源 | 38 (Hacker News, GitHub Trending, Hugging Face papers, arXiv, CISA KEV, NVD, Cisco PSIRT, Full Disclosure, SOCRadar, Red Hat, SecurityOnline, Tailwind CSS blog, Desert Ant Labs, xlii.space, Read the Docs, opusfived.dev, NousResearch, Atomburst, wsxiaoys gist, gnuradioworld.com, 777arc/gnuradio-world, Imbad0202, petergyang, radixark, TechCrunch/CNBC, Fortinet FG-IR-25-084 via NVD, seclists.org, GitHub Trending weekly, BleepingComputer, WatchGuard PSIRT, MSNightmare, apple.com, Raschka/mysterious substack, stockfishchess.org, hugovergnes.github.io, thelec.net, thomasahle.com) |
| 更新频率 | 04:03, 12:03, 20:03 UTC+8（每日 3 次） |
| 排名方式 | Velocity-weighted (recency × engagement acceleration × source authority) |
| 许可证 | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[Previous day](../2026-09-09/) · [Raw .md](../2026-09-10.md) · [Archive](../../archive/)
