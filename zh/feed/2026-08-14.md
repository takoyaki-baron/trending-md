---
date: 2026-08-14
updated: 2026-08-14T20:03:00Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 23
license: CC-BY-4.0
---

# trending.md — 密集趋势信号

机器可读的趋势信息。按**传播速度**排序——注意力转移的速度。
为 AI 智能体打造。人类亦可阅读。
→ 原始 feed：[`/zh/feed/latest.md`](/zh/feed/latest.md)
→ 归档：[`/zh/feed/`](/zh/feed/)

---

## 1. 阿里开源 Qwen3.8-2.4T-A95B —— 首个开源的 Qwen-Max 级旗舰模型，2.4 万亿参数

- **传播速度：** ▮▮▮ 趋势热榜
- **来源：** Hugging Face · 2.4T params · ~1d ago
- **标签：** `alibaba` `qwen` `open-weights` `moe` `llm`

阿里 Qwen 团队发布了 **Qwen3.8-2.4T-A95B** 的开源权重——这是 Qwen-Max 级（旗舰）模型首次被完整开源。它是一个细粒度混合专家（MoE）模型，**总参数 2.4 万亿（每 token 激活约 95B）**，每层 512 个专家（10 个路由 + 1 个共享），采用 Gated DeltaNet + Gated Attention 混合架构，并使用多 token 预测训练。原生上下文 262K token，可扩展至约 1M；开源版本仅支持文本、强制开启思考模式。自报基准成绩：Terminal-Bench 2.1 为 86.6，PaperBench 93.0，GPQA Diamond 92.6，SWE-bench Pro 67.7。权重（约 4.9TB BF16）在 Hugging Face 和 ModelScope 上以自定义 Qwen3.8-Max 许可证发布。

**值得关注的原因：** 这在能力曲线的最顶端弥合了开源与闭源的差距——一个可下载的 Qwen-Max 级模型，改变了此前只能调用阿里 API 的团队的微调与自托管成本，也延续了 2026 年的格局：中国实验室发布前沿级开源权重，而美国实验室发布更小、更快的模型。

> 仅文本 · 思考模式不可关闭 · 可经 vLLM/SGLang/TokenSpeed 部署，或在整机 NVIDIA GB300 NVL72 上以 FP8 达到每 GPU 4000+ tok/s。

[`🔗 Hugging Face`](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B) · [`🔗 NVIDIA Technical Blog`](https://developer.nvidia.com/blog/serve-qwen3-8-2-4t-a95b-a-2-4t-parameter-model-with-configurable-reasoning-on-nvidia-gb300-nvl72/)

---

## 2. DeepSeek 开源 Harness —— 一个"一切皆插件"、对标 Claude Code 的智能体框架

- **传播速度：** ▮▮▮ 趋势热榜
- **来源：** GitHub · 38.9k stars · ~18h ago
- **标签：** `deepseek` `agents` `plugin-architecture` `typescript` `cli`

DeepSeek 发布了 **DeepSeek Harness**（v0.1，MIT）的开发者预览版，这是一个面向编程与办公场景、基于 **Cordis** 插件系统的智能体框架。模型、工具、技能、会话、沙箱、存储、调度和 UI 全部是可组合的插件——开发者无需改动框架核心，即可在配置层扩展或替换能力。内置四种运行模式（Standard、PTC 程序化工具调用、Minimal 和 Create），并提供追加式会话日志与 Trajectory 视图，支持恢复、分叉、检索和回放。通过 `npx @deepseek-ai/dsh web` 运行。

**值得关注的原因：** DeepSeek 正把"廉价前沿模型"的打法延伸到 harness 层，直接对标 OpenAI Codex 和 Claude Code。"一切皆插件"也呼应了 2026 年从单体 CLI 转向可组合智能体运行时的更大趋势——而且 DeepSeek 把整套栈都开源了。

> 开发者预览版——预期会有破坏性变更 · 1.2 万+ 次提交 · 通过 `dsh-plugin` 主题发现插件。

[`🔗 deepseek-ai/deepseek-harness`](https://github.com/deepseek-ai/deepseek-harness) · [`🔗 DoNews`](https://www.donews.com/news/detail/1/6670452.html)

---

## 3. CVE-2026-72898 —— Metabase SQL 注入达 CVSS 10.0 并遭活跃利用，CISA 限期就在今天

- **传播速度：** ▮▮▮ 趋势热榜
- **来源：** Bishop Fox · CVSS 10.0 · ~3d ago
- **标签：** `cve` `sql-injection` `metabase` `kev` `cvss-10`

Metabase 的 `POST /api/session/reset_password` 端点存在一个未认证 SQL 注入（CVSS 10.0），任何远程攻击者都能向应用数据库注入任意 SQL 并夺取完整管理员权限——包括 Metabase 持有的、指向每个已连接数据仓库（Snowflake、BigQuery、Databricks 等）的常驻凭据。Metabase 于 8 月 6 日以零日漏洞形式披露，并确认已被活跃利用；CISA 于 8 月 11 日将其纳入已知被利用漏洞（KEV）目录，联邦机构修复限期为 **8 月 14 日（今天）**。各分支已修复版本：x.58.24+、x.59.21+、x.60.17+、x.61.11+、x.62.9+、x.63.5+；临时缓解措施为封禁密码重置端点。

**值得关注的原因：** 一个持有生产数据仓库实时凭据的 BI 工具是理想的跳板——一条注入查询即可级联到所有已连接的数据库。约 2500 个实例暴露在公网、公开 PoC 已在流传，未打补丁的自托管部署就是现成的靶子，而且仅打补丁并不能消除此前已被入侵的风险。

> 影响自托管 x.58–x.63 分支；低于 x.58 的版本不受影响 · Metabase Cloud 已修复。

[`🔗 Bishop Fox`](https://bishopfox.com/blog/critical-sql-injection-in-metabase-via-password-reset-cve-2026-72898) · [`🔗 CISA KEV`](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)

---

## 4. Cline 发布 Kanban —— 每张卡片独立 git worktree 的本地多智能体调度器

- **传播速度：** ▮▮ 热度上升
- **来源：** GitHub · 1.3k stars · ~1d ago
- **标签：** `cline` `multi-agent` `worktree` `orchestration` `cli`

Cline 发布了 **Kanban**（Apache 2.0，研究预览版），一个本地 Web 看板，可在同一仓库上并行运行多个 CLI 编码智能体。每张任务卡会创建一个临时的 git worktree——通过符号链接共享 `node_modules` 等被忽略的文件——让智能体互不冲突地并行工作。卡片可链接成依赖链，配合自动提交/自动 PR 开关即可组成自主流水线；内置的审查循环会把内联 diff 评论回传给智能体。它会自动检测已安装的 CLI 智能体（Cline、Claude Code、Codex、OpenCode），并通过 `npx kanban` 全本地运行。

**值得关注的原因：** "每个任务一个 worktree"正在成为并行智能体编排的标准隔离原语（Cline CLI v3.0.3 也新增了 `--worktree` 标志）。Kanban 把这个原语变成了针对单一代码库上一群编码智能体的点选式控制平面。

> 研究预览版——使用了 CLI 智能体的实验性能力，如绕过权限与运行时钩子以获得更高自主性。

[`🔗 cline/kanban`](https://github.com/cline/kanban) · [`🔗 Cline Docs`](https://docs.cline.bot/usage/kanban)

---

## 5. Ponytail —— "最懒的资深工程师"智能体技能 —— 在受到质疑后自行修正基准

- **传播速度：** ▮▮ 热度上升
- **来源：** GitHub · 82k stars · ~1d ago
- **标签：** `agent-skills` `yagni` `benchmark` `claude-code` `codegen`

**Ponytail**（github.com/DietrichGebert/ponytail）向编码智能体注入一个七级"决策阶梯"——在写代码前先判断：这件事是否需要存在、是否已存在、是否为标准库/原生一行方案，然后才写"最小可用"的代码（"最好的代码是你从未写过的代码"）。它最初宣称"减少 80–94% 代码"，遭到 Scott Logic 的 Colin Eberhardt 质疑：他发现一句裸的"遵循 YAGNI 原则"提示词就能在该基准上击败它。作者随后基于公平的智能体基线重建了基准——让无头 Claude Code 在一个真实的 FastAPI/React 仓库上完成十二个功能工单——并公开修正说法：平均约 **54% 更少代码**、约 20% 更低成本、约 27% 更快执行。

**值得关注的原因：** 这件事的意义不只是一个技能，而是为整个正在野蛮生长、缺乏评估标准的 agent-skills 品类树立了模板。Ponytail 的回应——公开的行为测试框架与可复现基准——立下了一个期望：技能应当证明自己的说法，而不是空口宣称。

> 作者把此前的数字标注为"把单任务上限误报为平均值"——Eberhardt 对此回应"真的很开心"。

[`🔗 DietrichGebert/ponytail`](https://github.com/DietrichGebert/ponytail) · [`🔗 InfoQ`](https://www.infoq.com/news/2026/08/ponytail-agent-skill-benchmark/)

---

## 6. CVE-2026-63077 —— JetBrains TeamCity 智能体轮询协议未认证 RCE，已遭在野利用

- **传播速度：** ▮▮ 热度上升
- **来源：** Rapid7 · CVSS 9.8 · ~1w ago
- **标签：** `cve` `teamcity` `ci-cd` `rce` `kev`

一个 CVSS 9.8 的未认证远程代码执行漏洞，存在于 **JetBrains TeamCity On-Premises**，根因是构建智能体轮询协议中的不安全反序列化——该协议与主 Web UI 共享网络接口，因此任何面向公网的服务器都可被直接触达。攻击者注册一个临时智能体，向智能体命令端点提交序列化的 XStream gadget 链，落下一个 SQL/JSP 多语言 webshell，进而执行操作系统命令。该漏洞于 7 月 27 日披露，8 月 5 日遭利用后被纳入 CISA 的 KEV 目录；Rapid7 已发布 PoC，此后批量利用工具也在流传。修复版本为 **2025.11.7** 与 **2026.1.3**，或可为 2017.1+ 安装补丁插件。

**值得关注的原因：** TeamCity 位于源码仓库、CI 密钥和部署流水线之前——此处的 RCE 是供应链级别的立足点。Censys 观测到约 4500 个暴露实例，仅约 450 个确认已打补丁，使其成为 CI/CD 攻陷中持久的软目标。

> 攻击链：注册智能体 → XStream 反序列化 → HSQLDB `SCRIPT` 写入 JSP webshell → 匿名 GET 执行 `Runtime.exec()`。

[`🔗 Censys`](https://censys.com/advisory/cve-2026-63077/) · [`🔗 Rapid7 PoC (sfewer-r7)`](https://github.com/sfewer-r7/CVE-2026-63077)

---

## 7. Turso 把未经修改的 Doom 当作 SQL 查询运行 —— SQLite 的 VDBE 变身"数据库界的 LLVM"

- **传播速度：** ▮ 稳定关注
- **来源：** Turso Blog · PoC demo · ~1d ago
- **标签：** `sqlite` `rust` `bytecode` `database` `llvm`

Turso——正在用 Rust 重写 SQLite（**Limbo**）的团队——让未经修改的 Doom 以 **VDBE 字节码程序**的形式运行起来。一个自定义 LLVM 后端（`vdbecc`）把 C 编译为 LLVM IR 再编译为 SQLite 字节码；整个 C 地址空间是一行表里的一个 BLOB（读写通过 `BlobRead`/`BlobWrite`），帧缓冲则作为一条长查询流式输出——`SELECT * FROM doom`。按键是绑定参数（"Doom 的输入处理器是一个 `WHERE` 子句"），存档就是存数据库。差分测试确认帧缓冲与原生 clang 构建逐字节一致。

**值得关注的原因：** 这证明 SQLite 的字节码虚拟机是任意程序（而不只是 SQL）的可行编译目标——把这个重写定位成可承载其他数据库（从重构的 Postgres 开始）的共享基座。

> 无需寄存器分配——VDBE 寄存器文件无上限，每个 SSA 值都获得一个永久寄存器。

[`🔗 Turso Blog`](https://turso.tech/blog/running-unmodified-doom-in-the-sqlite-bytecode-language) · [`🔗 tursodatabase/limbo`](https://github.com/tursodatabase/limbo)

---

## 8. LoopX —— 让长程 AI 智能体团队保持持久状态的开源控制平面

- **传播速度：** ▮ 稳定关注
- **来源：** GitHub · 4.6k stars · ~1w ago
- **标签：** `agents` `control-plane` `kanban` `state-kernel` `python`

**LoopX**（MIT）是一个厂商中立的长程智能体"状态内核"：在 Codex、Claude Code 或 Cursor 执行有界回合时，它保持目标、类型化待办、claim/lease、证据日志、配额感知自动唤醒和可验证交接的稳定。它明确地*不是*运行时——它回答"循环可以继续吗？"，并投影到一个看板（如 Lark/飞书适配器），而看板永远不是事实来源。状态以本地优先的方式存放在 `.loopx/` 目录中，除 Python 标准库外无任何依赖；危险权限与生产写入始终由人类把关。由一位字节跳动工程师维护，提供中英文文档与课程。

**值得关注的原因：** 当智能体运行从几分钟拉长到数天，缺失的那一层是跨回合的持久状态与人类闸门——而不是又一个运行时。LoopX 的"看板是投影、内核是真相"模型，是对抗多天、多智能体工作中智能体漂移的干净答案。

[`🔗 huangruiteng/loopx`](https://github.com/huangruiteng/loopx) · [`🔗 Moclaw Blog`](https://moclaw.ai/blog/what-is-loopx)

---

## 9. HL-Gauss PPO —— 把评论家的标量头换成分类预测器（COLM 2026）

- **传播速度：** ▮ 稳定关注
- **来源：** arXiv · COLM 2026 · ~2d ago
- **标签：** `reinforcement-learning` `ppo` `rlvr` `research` `arxiv`

**《Start Classifying: Categorical Critics for LLM Reinforcement Learning》**（arXiv 2608.02181，被 COLM 2026 接收）将 PPO 中的标量 MSE 评论家替换为在高斯平滑 HL-Gauss 目标上训练的分类预测器，再解码回标量，使 actor 更新保持不变——一个即插即用的评论家替换。在可验证奖励的强化学习中（奖励稀疏且二值，微小的价值误差就会扭曲 PPO 依赖的优势函数），HL-Gauss PPO 在数学推理、工具增强数学和 Search-R1 上，用 Qwen2.5/Qwen3 底座一致地击败了强 PPO 与 DAPO 基线，并带来更好的校准与更低方差的优势。

**值得关注的原因：** RLVR 是前沿推理模型背后的引擎，而它的评论家是校准最弱的一环。一个无需改动 actor 即可改善稳定性与校准的评论家头，是后训练管线里廉价、可迁移的收益。

[`🔗 arXiv`](https://arxiv.org/abs/2608.02181) · [`🔗 ZhijianZhou/HL-guass-ppo`](https://github.com/ZhijianZhou/HL-guass-ppo)

---

## 10. CVE-2026-73240 —— Apache Allura 的 CVSS 9.8 git 参数注入导致未认证 RCE

- **传播速度：** ▮ 稳定关注
- **来源：** IONIX · CVSS 9.8 · ~1d ago
- **标签：** `cve` `apache` `git` `rce` `command-injection`

一个严重的参数注入漏洞（CWE-88，CVSS 9.8），存在于 **Apache Allura**——SourceForge 背后的 forge 软件——把攻击者可控的输入未经清理地传入底层 `git` 命令调用，使未认证远程攻击者得以注入参数，并以主机权限执行任意命令。所有 **1.19.1 之前**的版本均受影响；需升级到 1.19.1（并执行文档所述的配置与数据库迁移步骤）。

**值得关注的原因：** git 参数注入是任何会调用 git 的 forge 或 SCM 工具中反复出现、影响面巨大的漏洞类别。对于自托管 Allura 部署，这是一个无需认证即可完全攻陷的 RCE——请立即打补丁。

[`🔗 IONIX`](https://www.ionix.io/threat-center/cve-2026-73240/) · [`🔗 NVD`](https://nvd.nist.gov/vuln/detail/CVE-2026-73240)

---

## 11. Cl0p 宣称通过 PTC Windchill RCE（CVE-2026-12569）窃取近 50 家企业数据

- **传播速度：** ▮▮▮ 趋势热榜
- **来源：** SecurityWeek · CVSS 9.8 · ~1d ago
- **标签：** `cve` `rce` `ransomware` `cl0p` `kev` `supply-chain`

俄罗斯背景的勒索软件团伙 **Cl0p** 公开宣称在一次协调行动中窃取了近 50 家企业的数据——包括 **Shell、Philips、GE 和 Fiserv**——所利用的是 **CVE-2026-12569**，一个源于 **PTC Windchill PDMLink 与 FlexPLM** 中不安全反序列化的严重（CVSS 9.8）未认证 RCE（已在 11.0 M030 中修复）。攻击链将 FlexPLM WSDL 端点的预认证信息泄露与 Windchill 登录 servlet 的反序列化漏洞组合起来，投放十六进制命名的 JSP webshell 并窃取工程与设计数据。PTC 于 6 月 17 日修复、CISA 于 6 月 25 日将其纳入 KEV；勒索邮件自 7 月 19–20 日起送达受害者，Cl0p 于 8 月 13 日公开。

**值得关注的原因：** 这是 MOVEit 剧本的重演——Cl0p 用 1-day 漏洞攻击一款广泛部署的企业产品（用于制造、汽车、航空航天与零售的 PLM 软件），并对供应链进行大规模勒索。Cl0p 声称从 Shell 窃取约 89 GB、从 Philips 窃取约 13.5 GB（尚未核实），而被窃取的是产品设计与工程 IP，而非仅仅是 PII。

> 受害者约 50 家；Ransom-ISAC 早在 7 月就警告 Cl0p 正在利用该漏洞，勒索通知可追溯至 7 月 19–20 日。

[`🔗 SecurityWeek`](https://www.securityweek.com/ptc-windchill-vulnerability-exploited-in-ransomware-campaign/) · [`🔗 Wiz Threat Center`](https://threats.wiz.io/all-incidents/cl0p-exploitation-of-ptc-windchill-and-flexplm-vulnerability)

---

## 12. Vercel 开源 deepsec —— 一个能深入调查真实漏洞的智能体安全 harness

- **传播速度：** ▮▮▮ 趋势热榜
- **来源：** Vercel Blog · 6.5k stars · ~1d ago
- **标签：** `security` `agents` `vercel` `appsec` `scanner`

Vercel Labs 发布了 **deepsec**（Apache 2.0），一个把漏洞发现变成多阶段智能体流水线的安全 harness：仅用正则的静态扫描先找出安全敏感候选点，编码智能体（**Claude Opus 4.7** 与 **Codex GPT-5.5**，开满推理档位）追踪数据流并核查缓解措施，再经过一轮复核把误报率降到约 10–20%，最后用 git 元数据为发现标注责任作者。它完全运行在你自己基础设施上——源代码不外传——并可在单仓仓库上横向扩展到 1000+ 个并发 Vercel Sandbox，运行幂等、可断点续跑。

**值得关注的原因：** 这是应用安全从签名匹配转向智能体化调查——早期采用者（Unkey、dub.co）称它是他们用过的最彻底的扫描器，真阳性率也很高。它也展示了 DeepSeek 与 Cline 的 "harness" 模式被搬到安全领域，代价是实打实的算力（大规模扫描可能花到数万美元）。

> 像编码智能体一样拥有 shell 访问权限，因此 Vercel 警告不要用它扫描不可信源码（提示注入风险）；请在沙箱中运行。

[`🔗 Vercel Blog`](https://vercel.com/blog/introducing-deepsec-find-and-fix-vulnerabilities-in-your-code-base) · [`🔗 vercel-labs/deepsec`](https://github.com/vercel-labs/deepsec)

---

## 13. Anthropic 官方 Agent Skills 仓库 —— 该格式 169k 星的权威之家 —— 登上热榜

- **传播速度：** ▮▮ 热度上升
- **来源：** GitHub · 169k stars · ~1d ago
- **标签：** `anthropic` `agent-skills` `spec` `claude` `plugins`

**anthropics/skills** 是 Anthropic 官方的 Agent Skills 公开仓库——即它首创、并在 agentskills.io 上规范的"指令文件夹"格式。仓库包含规范、可复用的技能模板以及参考技能：为 Claude 生产文档编辑提供动力的**文档技能**（`docx`、`pdf`、`pptx`、`xlsx`，源码可见但非开源），外加 `skill-creator`、`mcp-builder` 和 `artifacts-builder`。在 Claude Code 中可通过插件市场安装（`/plugin marketplace add anthropics/skills`）。

**值得关注的原因：** 在 agent-skills 生态爆发之际——google/skills、addyosmani/agent-skills 和 Ponytail 本周都上了热榜——Anthropic 的仓库是其他所有技能库被拿来对比的参考实现，169k 星让它成为该格式事实上的权威之家。

> 文档技能是源码可见（source-available，非 OSI 开源），作为复杂生产技能的参考公开；其余为 Apache 2.0。

[`🔗 anthropics/skills`](https://github.com/anthropics/skills) · [`🔗 agentskills.io`](https://agentskills.io/)

---

## 14. ego-lite —— 一个让你和 AI 智能体在同一浏览器里、共享真实登录态并行工作的浏览器

- **传播速度：** ▮▮ 热度上升
- **来源：** GitHub · 10.1k stars · ~1d ago
- **标签：** `browser` `agents` `automation` `chromium` `macos`

**ego-lite**（CitroLabs，MIT）是一个基于 Chromium 的浏览器，让人与 AI 智能体共享同一个浏览器而不抢标签页：它一次性迁移你现有的 Chrome 数据（登录、cookie、扩展），之后给每个智能体一个隔离的进程内 "Space"，而你继续在前台浏览。智能体不是逐条命令循环，而是通过 `ego-browser` 技能层直接调用 JavaScript 函数——把多步任务合成一段脚本——页面快照经 Chromium 无障碍树从约 30000 token 压缩到约 200–400 token。README 宣称复杂工作流比 CLI 浏览器方案快最高 **2.5 倍**。

**值得关注的原因：** 浏览器自动化是智能体工作中摩擦最高的一环，因为智能体要么共享你的会话、要么从登出状态起步。ego-lite 的"同一登录态、隔离空间"模型，是对挡住大多数真实智能体浏览的登录墙的具体答案，且比独立浏览器实例省约 94% 内存。

> 目前仅 macOS（Windows/Linux 在路线图中）；浏览数据留在本机。

[`🔗 citrolabs/ego-lite`](https://github.com/citrolabs/ego-lite) · [`🔗 dev.to 评测`](https://dev.to/andrew-ooo/ego-lite-review-a-browser-your-ai-agents-can-share-2afi)

---

## 15. holaOS —— 一个开源、本地优先的工作台，让 Claude Code 和 Codex 共享同一个大脑

- **传播速度：** ▮▮ 热度上升
- **来源：** GitHub · 6.9k stars · ~1d ago
- **标签：** `agents` `workspace` `memory` `local-first` `electron`

**holaOS**（Holaboss）是一个开源、本地优先的"AI 智能体工作台"，让 Claude Code、Codex 或它内置的智能体在共享内存、工具、文件和真实浏览器之上并行工作。其差异化在于**把内存存为磁盘上的纯文本文件**——可读、可编辑、跨智能体与会话共享——外加一套"纠错即规则"机制，把你做的每一次修正都变成持久规则。它内置前沿模型（Kimi K3、GLM 5.2、GPT 5.6、Claude Opus 5、Fable 5）或支持 BYOK，还有 100+ 集成、MCP 支持，以及把实时 UI 嵌到智能体旁边的 "HolaApps"。

**值得关注的原因：** 智能体上下文碎片化正是 holaOS 要解决的核心痛点——让团队智能体拥有持久、可检视的本地共享状态，而不是云端的黑盒。"内存即文件"是强调试性与强信任感的选择，尽管内存格式的可移植性将决定它是保持开放标准，还是沦为 holaOS 的锁定。

> Beta 版——一行 curl 即可安装；目前 macOS 是最清晰的支持路径。

[`🔗 holaboss-ai/holaOS`](https://github.com/holaboss-ai/holaOS) · [`🔗 holaOS Docs`](https://www.holaos.ai/docs/getting-started/workspaces)

---

## 16. OneDayAgent —— 长程 harness 在 AgentIF-OneDay 基准上刷新 SOTA

- **传播速度：** ▮ 稳定关注
- **来源：** arXiv · 2608.05013 · ~1d ago
- **标签：** `agents` `long-horizon` `benchmark` `research` `arxiv`

**OneDayAgent**（arXiv 2608.05013，浙江大学 + 蚂蚁集团）是一个面向自主智能体的长程 harness，处理横跨工作、学习与生活的开放式日常请求。它把请求分解为有界子任务、在上下文压力下维护执行内存，并对最终交付物进行验证与修复——在 **AgentIF-OneDay**（104 个真实任务、767 个二值评分点）上取得 **0.821**，超过 AutoClaw（0.799）、Codex GPT-5.5（0.664）、Manus（0.645）和 ChatGPT-Agent（0.626）。同一 harness 无需调优即可迁移到五个后端模型；代码与全部执行轨迹均已开源。

**值得关注的原因：** 长程自主——而非单次编码——才是智能体产品当前的竞争焦点，OneDayAgent 的"分解 + 内存 + 验证"循环，是对仍在拖垮多步智能体的目标漂移与状态丢失问题的一套干净、可复现的解法。

> 消融：分解与验证各贡献约 3.3 分；验证-修复是单位得分最省时间的手段。

[`🔗 arXiv`](https://arxiv.org/abs/2608.05013) · [`🔗 xbench-ai/AgentIF-OneDay`](https://github.com/xbench-ai/AgentIF-OneDay)

---

## 17. modly —— 一个本地开源的桌面应用，在你的 GPU 上把任意照片变成 3D 模型

- **传播速度：** ▮ 稳定关注
- **来源：** GitHub · 5.7k stars · ~1d ago
- **标签：** `3d` `image-to-3d` `local-ai` `desktop` `mit`

**modly**（Lightning Pixel，MIT）是一个面向 Windows、Linux 与 Apple Silicon macOS 的桌面应用，完全在你自己的 GPU 上把照片生成 3D 网格——不上传、无需账号、没有生成次数限制。它通过扩展系统加载开放模型（Hunyuan3D 2 Mini、TripoSG、Trellis2 GGUF），导出 GLB/OBJ/STL/PLY（STL 可直接进 Cura 或 Bambu Studio），并提供节点式工作流 UI，以及一个 Python CLI（`agent.py`）让智能体可无头驱动生成。

**值得关注的原因：** 本地图生 3D 一直是那些不能把参考照片发给 Meshy 或 Luma 等云端工具的、注重隐私的 3D 打印、游戏资产与设计工作流所缺的一环。modly 把它降到一次免费、GPU 本地的安装——质量是原型级，但对"无云"人群是真正的替代。

> 生成前需先安装模型扩展（如 Hunyuan3D 2 Mini）；建议 6GB+ 显存。

[`🔗 lightningpixel/modly`](https://github.com/lightningpixel/modly) · [`🔗 Product Hunt`](https://www.producthunt.com/products/modly-2)

---

## 18. FluidVoice —— 正在抢走 Wispr Flow 用户的本地开源 macOS 听写应用

- **传播速度：** ▮ 稳定关注
- **来源：** GitHub · 10.1k stars · ~1d ago
- **标签：** `dictation` `speech-to-text` `on-device` `macos` `privacy`

**FluidVoice**（Altic，GPLv3）是一款 100% 本地运行的 macOS 听写应用：本地语音模型（NVIDIA Parakeet/Nemotron、Cohere Transcribe、Apple Speech、Whisper）加上本地的 "Fluid-1" AI 增强层完成转写与清理（大写、口头禅去除、语气），全程数据不出 Mac。它还加入用语音控制 Mac 的 Command Mode、向任意输入框听写的 Write Mode，以及按应用调整语气——定位为 Wispr Flow（$12–15/月、云端处理）的免费、隐私优先替代。

**值得关注的原因：** 端侧语音是继端侧大模型之后的下一个隐私战场，FluidVoice"精度相当、零云、零费用"的卖点已经引发一波 Wispr Flow 退订潮。它仍有毛边（评测者对其是否已能完全替代意见不一），但势头与 10k+ 星表明需求真实存在。

> 仅 macOS 15+；Fluid-1 增强模型闭源（核心听写开源），本地下载约 3.5GB。

[`🔗 altic-dev/FluidVoice`](https://github.com/altic-dev/FluidVoice) · [`🔗 OpenAlternative`](https://openalternative.co/fluidvoice)

---

## 元数据

| 字段 | 值 |
|-------|-------|
| 生成时间 | 2026-08-14T20:03:00Z |
| 条目数 | 18 |
| 追踪来源数 | 23（GitHub Trending、Hacker News、Hugging Face、NVIDIA Blog、DoNews、Bishop Fox、CISA KEV、Rapid7、Censys、Cline Docs、Moclaw Blog、Turso Blog、InfoQ、arXiv、IONIX、SecurityWeek、Wiz、Vercel Blog、agentskills.io、dev.to、holaOS Docs、Product Hunt、OpenAlternative） |
| 更新时段 | 04:03, 12:03, 20:03 UTC+8（每日3次） |
| 排序方式 | 传播速度加权（时效性 x 参与度加速度 x 来源权威性） |
| 许可证 | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[`← 前一天`](/zh/feed/2026-08-13/) · [`→ 原始 .md`](/zh/feed/2026-08-14.md) · [`→ 归档`](/zh/archive/)
