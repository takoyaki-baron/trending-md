---
date: 2026-11-12
updated: 2026-11-12T04:30:29Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 32
license: CC-BY-4.0
---

# trending.md — 2026-11-12

## 1. AWS 在官方组织下发布自己的本地 AWS 模拟器——Rust 编写，还附了一篇 Werner Vogels 的文章

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 306+ 分 · 1.7 小时前（~02:45 UTC+8）
- **Tags:** `aws` `emulator` `local-development`

Amazon 把 **aws/aws-emulator**——"AWS API 的本地模拟器"——放进了官方 GitHub 组织，HN 帖子两小时内突破 300 分。它是一个 Rust Cargo workspace，按服务一 crate 组织，由与 AWS 线协议相同的 Smithy 模型驱动；它在 `127.0.0.1:9297` 上以自签证书提供 HTTPS，AWS CLI 或任何 SDK 通过环境变量即可指向它。另有**嵌入式模式**——一个 Rust dev-dependency，每个测试运行一个隔离的进程内实例——以及 agent 挂钩：`aws agent-toolkit add-skill` 可将其安装为编码 agent 技能。README 措辞罕见地直白："Don't use it for production workloads or to test security"，每次发布都附带保真度分数，从源码构建需要约 100 GB 磁盘，而且"This repository does not take PRs。"Werner Vogels 同日发布配套文章，把模拟器放在"当 agent 写代码时，工程意味着什么"的框架里。

**Why it matters:** 本地 AWS 模拟十年来一直是第三方领域（LocalStack 等）；一个官方的、CC0 许可、Smithy 驱动的模拟器改变了 CI 与测试的默认选项——嵌入式每测试一实例的设计加 agent-toolkit 技能表明 Amazon 在按 agent 优先构建，而不只是开发者优先。默认开启的遥测和"不收 PR"政策是最值得细读的两个细节。

> "AWS Emulator is a local emulator of the AWS APIs" … "Don't use it for production workloads or to test security." — README

[`🔗 aws/aws-emulator`](https://github.com/aws/aws-emulator) · [`🔗 Vogels：AWS Emulator and the engineer's job`](https://www.allthingsdistributed.com/2026/11/aws-emulator-and-the-engineers-job-when-agents-write-the-code.html) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50456631)

---

## 2. Google 工程师让 48 个 AI agent 分析 NASA 激光雷达——而"未测绘的玛雅金字塔"结果是一次再发现

- **Velocity:** ▮▮▮ trending
- **Source:** pietromiotti.com · HN 843 分 · 8 小时前（11 月 11 日 ~20:20 UTC+8）
- **Tags:** `ai-agents` `lidar` `archaeology`

Pietro Miotti 的文章——当日 HN 最大热点，843 分——描述了从在秘鲁旅行时的"一个随想"（10 月 18 日）到墨西哥 INAH 的官方回复只用**不到 72 小时**：约 1,200 km² 的玛雅地区公开 NASA 激光雷达数据，由 **48 个 agent** 隔夜分析，它们以图像形式目视检查雷达条带（"There was no special model or classifier involved: the agents literally looked at the pictures"）。它们标记出一处山顶遗址——平整的广场、8–12 米高的椭圆金字塔、抬高的院落、疑似蓄水池——且 INAH 登记册于 10 月 21 日确认该坐标无登记记录。**11 月 11 日的更新是标题省略的部分：**考古学家指出同一遗址早已发表于 **Estrada-Belli 等人 2025 年的论文**——"The agents missed it while going through the literature, so they rediscovered it rather than discovered it (it just wasn't in the register of Mexico's National Institute of Anthropology and History, INAH, yet)."（agent 在翻阅文献时漏掉了它，所以这是一次再发现而非首次发现——只是它尚未进入墨西哥国家人类学与历史研究所 INAH 的登记册。）

**Why it matters:** 这套工作流（agent 读取渲染的传感图像，当周完成官方登记核查）真实且可复用——但文章自己的更新正是"agent 发现"在上新闻周期前需要文献检索的案例研究。标题级的主张一天内塌掉；"已发表的科学未进入官方登记册"这个 INAH 登记缺口才是耐用、可核查的发现。

> "One major village doesn't seem to have been registered." ——原文，11 月 11 日更新之前

[`🔗 Pietro Miotti：玛雅遗址`](https://pietromiotti.com/latest/maya-site/?maya) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50452455)

---

## 3. Tim Peters 去世——Python 之禅、Timsort，以及最早的语言共同设计者

- **Velocity:** ▮▮▮ trending
- **Source:** discuss.python.org · HN 454 分 · 13 小时前（11 月 11 日 ~15:30 UTC+8）
- **Tags:** `python` `community` `timsort`

Guido van Rossum 在 Python 核心开发者论坛开了悼念帖："I am immensely sad to announce that Tim Peters has died … earlier this year on July 15." Peters（1952–2026）写下 **Python 之禅**（`import this`），2002 年发明 **Timsort**——Python 的列表排序，后被 Java 与 Android 采用——而在此之前，他是社区的第二个真实用户：他说服 Guido 让 `int`/`float` 混合运算，打磨了 **pymalloc**，优化了 dict 实现，改进了循环垃圾回收与生成器，还写了 **doctest、difflib、pickletools 与 tabnanny**。他曾在 Cray Research 做超算编译器、在 Dragon Systems 做语音识别，2001 至 2014 年任 PSF 董事，并以"Timbot"之名回答了数千封邮件列表提问——Guido 在公告末尾署上"Python-would-not-be-what-it-is-today-without-Tim-ly y'rs"。

**Why it matters:** 让 Python 之所以像 Python 的许多东西——每台 Android 手机里的排序算法、每个开发者都能背几句的设计格言——是一个人二十年的贡献。这个帖子也是一份罕见的第一手档案：核心开发者在一处集中回忆具体决策，从混合数值运算到 pymalloc。

> "I am immensely sad to announce that Tim Peters has died … It's hard to overestimate Tim's influence on Python." — Guido van Rossum

[`🔗 In memoriam: Tim Peters (1952–2026)`](https://discuss.python.org/t/in-memoriam-tim-peters-1952-2026/110028) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50450488)

---

## 4. 恶意软件复制不走的 SSH 密钥：只用 macOS 自带工具的 Secure Enclave 指南——以及一个对自己的诚实否定结论

- **Velocity:** ▮▮ rising
- **Source:** gatezh.com · HN 366 分 · 15.6 小时前（11 月 11 日 ~12:50 UTC+8）
- **Tags:** `ssh` `macos` `secure-enclave`

Serge Gatezh 的指南让 SSH 私钥留在 Mac 的 Secure Enclave 内且**不依赖第三方软件**：`sc_auth create-ctk-identity -k p256-ne -t bio` 铸造一把不可导出的 P-256 密钥，`ssh-keygen -w /usr/lib/ssh-keychain.dylib -K` 生成一个"key handle"文件——明确**不是**密钥本身，只是一个让 SSH 请求 Enclave 签名的指针。威胁模型是寻常的那种："Any malicious script that gets access to my filesystem could just copy them and get into all my servers"；目标性质是 "The private key should literally be impossible to extract, even if my Mac is fully compromised."。诚实之处在结论：尽管方案完全可用，他还是**放弃原生做法改用 Secretive**，因为 Touch ID 提示写着 "ctccardtoken needs to authenticate to continue"——"it ended up plain ugly and I can't live with that."

**Why it matters:** 顺手抄走 `.ssh` 目录是最省力的攻击之一，而这份文档记下了完整的零依赖路径——包括那些坑（handle 不是密钥；`ssh-add -K` 老指南已废弃；文件名必须写进 `~/.ssh/config`）。不可避免的代价说得明明白白：**没有备份**——"If your Mac dies, the keys die with it"，所以每台服务器还要配另一把独立的恢复密钥。

[`🔗 gatezh.com：Protecting SSH Keys with macOS Secure Enclave`](https://gatezh.com/posts/macos-secure-enclave-ssh-keys/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50449748)

---

## 5. The Verge 向 11 家电视厂商提出 17 个监听问题——三家全部作答，海信直接无视邮件

- **Velocity:** ▮▮ rising
- **Source:** The Verge · HN 304 分 · 6 小时前（11 月 11 日 ~22:20 UTC+8）
- **Tags:** `privacy` `acr` `tv`

The Verge 邀请 Amazon、Apple、Google、海信、LG、Panasonic、Roku、三星、索尼、TCL 与沃尔玛的 Vizio 回答 17 个关于**自动内容识别（ACR）**的问题——电视在看什么、什么数据离开家门、退出选择是否真的有效。"We now have answers from the top three TV manufacturers as well as every major streaming device company. Some companies declined to answer"，而且"(One company, Hisense, ignored our emails entirely.)" 最尖锐的数据点来自外部：东北大学的一项研究发现**沃尔玛的 Vizio 在用户退出后仍在发送数据**——Vizio 称那是"routine operational data used to support the Vizio experience"，不是 ACR——而流向三星与 Roku 的流量"limited, but not stopped completely."

**Why it matters:** ACR 是廉价电视之所以廉价的原因，而这篇文章的结构——同样的 17 个问题、并排作答、拒绝者点名——把营销话术变成了一张可比对的表。退出发现是最可操作的部分：安装时同意 ACR 之后还能在设置里撤回，但"opting out might not be as effective as it should be."

[`🔗 The Verge：17 questions for TV manufacturers`](https://www.theverge.com/tech/1012372/tv-privacy-acr-questions) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50453474)

---

## 6. 一次误报的烟雾警报差点淹掉 Jane Street 在纽约唯一的数据中心——距离喷淋头出水只差 6.4 华氏度

- **Velocity:** ▮▮ rising
- **Source:** michael.bacarella.com · HN 270 分 · 3.4 小时前（~01:05 UTC+8）
- **Tags:** `infrastructure` `incident-report` `datacenter`

Michael Bacarella 的事件报告：隔壁准备间里承包商扬起的灰尘触发了烟雾警报，警报**关掉了 CRAC 空调机组**（循环空气会助燃）并给十排机柜上方的喷淋管道加压。喷淋头只有当环境温度熔化约 150°F 的热熔塞时才出水——所以在冷却关闭后，机房一路滑向"水浇服务器"，而**没有任何监控报警**：单机高温告警没有配置，因为"that happens from time to time."。救场靠人和运气——香港办公室有人恰好看到"server after server … popping up a climbing temperature condition"，打电话给住在 9 分钟步程外的作者，他冲进机房"row by row, cabinet by cabinet"地拔电源线，屏幕上写着 "141 F. 142. 143. 143.5. 143.6."

**Why it matters:** 失败的是一套为人设计的联锁，却装在机房里：警报的消防响应恰恰是机房最不该发生的事。给任何经营机柜机房的人的教训是——他现在用一个小的 OCaml 监控每分钟轮询每台服务器的**板载**温度传感器，因为"unknown unknowns can still ruin you"，而机队本身就是那个无法被配置成沉默的传感器。

> "141 F. 142. 143. 143.5. 143.6" ——拔线前的最后读数

[`🔗 False smoke alarm at the Jane Street datacenter`](https://michael.bacarella.com/2026/11/10/false-smoke-alarm-jane-street-datacenter/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50455394)

---

## 7. Apple Support Community 论坛转为只读，11 月 20 日永久关闭

- **Velocity:** ▮▮ rising
- **Source:** The Verge · HN 244 分 · 6 小时前（11 月 11 日 ~22:25 UTC+8）
- **Tags:** `apple` `support` `community`

Apple 已将其 Support Community 论坛——这个积累了二十年修复方案、错误码解读帖与绕坑经验的用户互助版——置为**只读**，横幅公告关闭："The Apple Support Community will permanently close on November 20, 2026. Starting today, the site will no longer accept new posts and is available in a read-only state." Apple 的提示把用户引向"trusted guidance and support on the official Apple Support site"——经过整理的知识库，而非社区语料。

**Why it matters:** 论坛帖子是技术支持的非索引基础设施——晦涩内核崩溃与迁移 bug 由志愿者解读的地方——而公告对既有帖子的导出、存档或跳转只字未提。11 月 20 日之后，一长尾 Apple 问题的答案将只存在于搜索引擎缓存和 Wayback Machine，这正是那种多年后以"无人能复现的 bug"形式显形的损失。

[`🔗 The Verge：Apple is killing its Support Community forum`](https://www.theverge.com/tech/1031507/apple-community-support-forum-shutting-down) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50453555)

---

## 8. WebGL2 里的超真实沙子：46 万颗粒、真实物理单位，静止时绝对无声

- **Velocity:** ▮▮ rising
- **Source:** av/safe-sand · HN 222 分 · 6.4 小时前（11 月 11 日 ~22:05 UTC+8）
- **Tags:** `webgl2` `graphics` `physics`

一个把真实感当作工程规格来写的手机屏幕沙子玩具：**10 万–46 万颗独立沙粒**在 GPU 上以 WebGL2 模拟，"in real units (millimetres, 9.81 m/s²), so how fast sand moves and how much it lags matches the real thing"。每颗沙粒有自己的尺寸、矿物颜色与摩擦系数；孤立颗粒会滚动，沙堆则坚持到倾斜超过**休止角**；每帧构建的高度场提供坡度力、自阴影与环境光遮蔽。音频由实际移动的沙量合成——数千个 2–8 kHz 的细微咔嗒——且"when nothing moves, the output is exactly silent."。帧率不足时质量分级下降（DPR 3→2→1.5，再减沙粒数），先区分 30 fps 的系统限帧与真正的过载，且"never steps back up during a session."

**Why it matters:** 这是一堂浓缩的移动 GPU 物理模拟课——真实单位的动力学、逐颗粒材质属性、一个诚实的自适应质量阶梯——以无构建步骤的静态站点交付。它还是少见的把自己的质量状态机写进文档的消费级演示（`window.sand.info().quality`），你可以检查它的自适应而不是猜。

[`🔗 Safe Sand（手机打开）`](https://av.github.io/safe-sand/) · [`🔗 av/safe-sand`](https://github.com/av/safe-sand) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50453288)

---

## 9. 8 小时的 agent 编辑被两次 LP 求解替换：权重空间编程拿到了它的经典算法对照

- **Velocity:** ▮▮ rising
- **Source:** nathan.rs · HN 199 分 · 7.6 小时前（11 月 11 日 ~20:50 UTC+8）
- **Tags:** `interpretability` `optimization` `weight-editing`

Nathan Barry 重访"权重空间编程"——MIT CSAIL 对模型读取或直接写权重能力的命名（"No gradients, no training loop, just reasoning about what the weights compute"）——并观察到 GPT-6 Astra 那次著名的权重编辑大部分是**用试错法解一个线性规划**：约 8 小时、28 次前向传播来挑选要改哪些 `down_proj` 列。把这一选择改写成显式的 L1 最小化 LP（稀疏 `v`，自研 GPU PDHG 求解器约 1 分钟）接手了 agent 的搜索："A couple of LP solves, about a minute each, do the same job with 8× fewer changed weights." 在 Qwen3.5-0.8B 的思考循环病（MATH-500 上 93% 的答案撞到 32,768 token 上限）上，LP 编辑与 Astra 的结果在噪声内打平——GSM8K 69.6 对 68.2，MATH-500 51.7 对 50.9——但只改了 16,291 个权重而非 130,188。附赠发现：这个编辑近似一个常量推力，所以一个普通的推理时转向向量"recovers essentially the whole fix."

**Why it matters:** 这篇帖子是评估 agentic 结果主张的模板：复现 agent 实际搜索的东西，注意到它是一个经典优化问题，再验证算法是否胜过 agent。作者自己的保留意见也切中要害——"This is one model"，层的挑选仍来自 Astra，且循环修复结果根本不需要逐 token 约束——所以把它读作一个谨慎的数据点，而非通用结论。

[`🔗 Can a Linear Program Do Weight-Space Programming?`](https://nathan.rs/posts/weight-space-lp/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50452655)

---

## 10. Atuin Threads：每个 agent 会话、每台机器、同一份可搜索的加密日志

- **Velocity:** ▮▮ rising
- **Source:** Atuin · HN 142 分 · 5.9 小时前（11 月 11 日 ~22:30 UTC+8）
- **Tags:** `agents` `cli` `sync`

shell 历史工具 Atuin 在 18.24+ 中发布了 **Threads**："one searchable, synced history for every agent session, on every machine." 卖点是跨 harness 恢复——"Start a task in Claude Code, then resume it in Codex on another machine"——外加像分 Git 分支一样**分叉**会话，以及一个 MCP 服务器（`atuin mcp install claude/codex/pi/opencode`），让 agent 自己搜索先前会话来找回意图和被放弃的工作。架构上它复用现有同步引擎："It's generic, and can sync anything that can be modelled as an append-only log"，且"Threads is end-to-end encrypted when synced, so we can't read your sessions."。会话捕获为可选；当前支持的 harness 是 Claude Code、Codex、Pi、Omp 与 OpenCode。

**Why it matters:** agent 会话目前是工具链里最不可移植的工件——被困在每个 harness、每台机器里——而每个 harness 厂商的答案至今都是各自的封闭格式。一个 harness 无关、只追加、端到端加密的会话层正是本 feed 此前记忆格式调研呼唤的中立位置；悬而未决的是 harness 厂商是否会采用它，而不是继续各说各话。

[`🔗 Atuin：Threads — agent sessions`](https://blog.atuin.sh/threads-agent-sessions/) · [`🔗 atuinsh/atuin`](https://github.com/atuinsh/atuin) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50453637)

---

## 11. Google 的 Gemini Decisions API：返回概率而非文本的模型——一次前向传播答 1,000 个问题

- **Velocity:** ▮▮ rising
- **Source:** Google · HN 刚上榜 · 1.6 小时前（~02:50 UTC+8）
- **Tags:** `google` `gemini` `routing`

Google 于 11 月 11 日推出 **Gemini Decisions API**，一个构建在 **gemini-decision-1** 上的新端点，"fast, closed-set decisions powered by our new Gemini Decision 1 model"——工具选择、策略检查、模型路由、上下文分级这类有界决策。一份多模态输入（至多 256K token）可搭配"up to 1,000 independent questions"，三种题型：**noul**（是/否概率）、**choice**（2–255 个候选项加归一化概率）、**score**（有序评分量规）。它不逐 token 生成，而是经一次前向传播"probabilities and confidence scores in 150-250 ms end-to-end latency"，延迟"nearly flat from 1 to 100 questions per request."。定价为"$0.10 per 1M input tokens with zero output tokens billed"——无论问多少个问题，输入只按请求计费一次——且文章声称"nearly 5x cheaper across the shared benchmark suite than Gemini 3.5 Flash-Lite."

**Why it matters:** 这把本 feed 已从用户侧追踪过两次的决策模型模式（Amazon 便宜 44 倍的工单路由、校准歧义带的升级器）产品化了：路由、策略检查与上下文分级成为一个带置信分数的专用原语，模糊情形可降级到回退或人工。基准主张来自 Google 自己的套件——在有人独立复现路由基准之前，5 倍便宜先当厂商数字读。

[`🔗 Google：Gemini Decisions API`](https://blog.google/innovation-and-ai/technology/developers-tools/gemini-decisions-api/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50456791)

---

## 12. MongoDB 一波在 NVD 落下 26 条 CVE 记录——一条 9.0 复制 UAF，以及一条 macOS TLS 绕过，其 4.0 分比 3.1 分高 1.7

- **Velocity:** ▮▮ rising
- **Source:** MongoDB · NVD 26 条记录 · 11 月 10 日（11 月 11 日 ~04:18 UTC+8）
- **Tags:** `mongodb` `cve` `database`

MongoDB 的 CNA 于 11 月 10 日在 NVD 发布 **26 条记录**（按 source 计数——`cna@mongodb.com`，分数全部自评），全部仍为 `Awaiting Analysis`。表顶端：**CVE-2026-118383，9.0**，复制组件中的 use-after-free（网络向量，`S:C` 作用域改变）；**CVE-2026-120824，8.8**，时间序列集合的 UAF（`PR:L`）；**CVE-2026-120815，8.4**，授权子系统中的错误授权。其余是一族散布在引擎各处的 UAF——SBE 窗口函数累加器、计划缓存、服务端 JavaScript、聚合框架——外加 Kerberos/SSPI 与 X.509 集群成员身份守卫。其中一条是小型 CVSS 课：**CVE-2026-120808**，macOS TLS 客户端在 Apple SecureTransport 后端下对 IPv6 对端绕过信任链验证，同一 CNA 给出 **CVSS 3.1 的 7.4 与 CVSS 4.0 的 9.1**。

**Why it matters:** 每条记录都链到 `jira.mongodb.org` 工单（SERVER-130681、SERVER-134872、SERVER-136505、SERVER-138119/138175……），受影响版本的问题离记录一跳就能回答——先查你分支对应的工单，再决定这一波是否只是走流程。引用 120808 分数时带上版本：3.1 与 4.0 两个数字是同一个 bug 经两套框架作用域约定后的读法。

[`🔗 NVD：CVE-2026-118383（9.0）`](https://nvd.nist.gov/vuln/detail/CVE-2026-118383) · [`🔗 NVD：CVE-2026-120808（macOS TLS）`](https://nvd.nist.gov/vuln/detail/CVE-2026-120808) · [`🔗 SERVER-138119`](https://jira.mongodb.org/browse/SERVER-138119)

---

## 13. 黑色行动 II 被静态重编译为原生 ARM64 macOS——无 Wine、无游戏文件，用自己的 Steam 副本

- **Velocity:** ▮ steady
- **Source:** adrbn/bo2-mac · HN 126 分 · 15.1 小时前（11 月 11 日 ~13:25 UTC+8）
- **Tags:** `static-recompilation` `macos` `reverse-engineering`

一个接上本 feed 静态重编译谱系（浏览器里的 NFS:U2，如今的 BO2）的 Show HN：**adrbn/bo2-mac** 把使命召唤：黑色行动 II "from 32-bit x86 Windows to native ARM64 macOS"——**Remill 将 x86-32 提升到 LLVM 17 IR**，手写 Win32 运行时替换 OS 层，Direct3D 11 交由 Metal 绘制，**不用 Wine**，仓库里**没有游戏文件**（自带 Steam 副本）。Apple M1 上的报告成绩：战役 51–60 fps，僵尸模式 57–60，对人机对战 53–60。仓库 11 月 3 日上线，README 有 pipeline、findings 与 roadmap 各节，还带中文 README。

**Why it matters:** 对 Apple Silicon 上的 32 位老 Windows 游戏，静态重编译持续胜出——Wine-on-Rosetta 那套要交双重翻译税。代价一如既往：每游戏一个、法律上以自带副本为门槛的制品——但对"提升到 Metal"管线的文档让它成了下一个移植者的参考。

[`🔗 adrbn/bo2-mac`](https://github.com/adrbn/bo2-mac) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50449891)

---

## 14. Auth0 自家的 RAG 检索器泄漏了 FGA 已拒绝的文档——两条 SDK CVE 打中"权限感知 AI"模式

- **Velocity:** ▮ steady
- **Source:** Okta · NVD 4 条记录 · 11 月 10 日（11 月 11 日 ~05:17 UTC+8）
- **Tags:** `auth0` `rag` `authorization`

Okta 于 11 月 10 日发布四条记录，其中两条正打在"按你的授权系统过滤检索"所承诺的模式上：**CVE-2026-107372**（`auth0-ai-js`）与 **CVE-2026-108167**（`auth0-ai-python`）——FGA 检索器"does not distinguish between authorization checks under different users, relations, or conditions when filtering documents during retrieval-augmented generation, resulting in documents denied by Auth0 FGA being included in the model context and used in the generated response."。配套一对：**CVE-2026-126128**，Node SDK 的 Management API 客户端路径参数中和不当，"allowing a request and its attached management API token to be redirected to an unintended endpoint on the same tenant"；**CVE-2026-126129**，ASP.NET Core SDK 因"incorrectly determines a session's OIDC Back-Channel Logout status"而接受已登出的会话。NVD 记录无 CVSS——Okta 的公告在 trust.okta.com。

**Why it matters:** 权限感知检索是"别让模型读用户读不到的东西"的标准答案，而这些 bug 正是这个答案的缔造厂商自己翻车的形态：一个检查*是否*允许访问、却不检查*是谁*在访问的授权过滤器。如果你把任何 FGA/ReBAC 引擎包在 RAG 检索器后面，要测的就是这个形状——检查的正确性与调用者身份无关。

[`🔗 Okta 公告：auth0-ai-js（CVE-2026-107372）`](https://trust.okta.com/security-advisories/improper-access-control-in-auth0-ai-js-document-retrieval-cve-2026-107372) · [`🔗 NVD：CVE-2026-108167`](https://nvd.nist.gov/vuln/detail/CVE-2026-108167)

---

## 15. Yogurt：免费、私密、开源的 Granola 替代品，不进会就录

- **Velocity:** ▮ steady
- **Source:** FrigadeHQ/yogurt · HN 93 分 · 4.5 小时前（11 月 11 日 ~23:55 UTC+8）
- **Tags:** `meeting-notes` `privacy` `open-source`

Frigade 的 Show HN：**Yogurt**——"Private AI meeting notes. Free and open source."（MIT）——本地录制你的通话"without adding a bot to the meeting"，再产出按人归类的下一步摘要。以桌面应用交付：Mac（Apple Silicon）、Windows（x64）与 Linux（AppImage），需 8 GB 内存；仓库 11 月 10 日公开，已有 232 星。定位直接对准付费云端记事本（Granola、Otter、Fireflies）：没有 bot 加入通话，笔记也不离开你的机器。

**Why it matters:** 会议纪要 AI 是变现最快的 AI 品类之一，卖的是便利，代价是每通电话里坐着一个录音机、逐字稿存在别人的云上。一个 MIT 许可的本地替代品改变了任何涉密会议的默认算术——而 Show HN 数小时 90+ 分的热度说明需求就在那里。

[`🔗 FrigadeHQ/yogurt`](https://github.com/FrigadeHQ/yogurt) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50454625)

---

## 16. Apple 的摊销式 MIPS：学会向量库最佳键在哪的微型网络

- **Velocity:** ▮ steady
- **Source:** Apple ML Research · HN 86 分 · 3.1 小时前（~01:15 UTC+8）
- **Tags:** `rag` `retrieval` `mips`

Apple 的"Faster Retrieval for Better, More Efficient RAG"亮点文章介绍了 ICML 2026 论文中的工作——**摊销最大内积搜索（MIPS）**：不再用查询无关的索引，而是为固定的键数据库离线训练小网络，利用 MIPS 实现键集*支撑函数*、其梯度返回最佳匹配这一事实。两个实例：**SupportNet**——输入凸神经网络，替换 IVF 索引中的质心路由（95% 路由召回比质心路由快约 1.9 倍，1.74 ms 对 3.36 ms）；**KeyNet**——直接预测最佳匹配键，作为标准索引前的"query rewriter"（99% 召回"takes up to ~8× less time with the largest model (0.23 ms vs 1.8 ms)"，或约少扫 11 倍的键）。训练数据为 Natural Questions（约 260 万段落）。

**Why it matters:** 对固定、高频的语料——RAG 的常见场景——摊销搜索本身是与买更大的 ANN 索引不同的交易，而且数字是具体的。文中声明的限制决定适用性：该方法预设已知的"stable, well-characterized query distribution"，并为每个数据库付一次训练成本——所以这是给整天用同样方式查询的生产语料用的技术，不是即插即换的索引。

[`🔗 Apple ML：Faster Retrieval for Better, More Efficient RAG`](https://machinelearning.apple.com/research/faster-retrieval) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50455633)

---

## 17. OpenSSL 发布五条 CVE 记录——两个 QUIC 内存 bug、一个 CMS 死循环，一对 AES-GCM-SIV

- **Velocity:** ▮ steady
- **Source:** OpenSSL · NVD 5 条记录 · 11 月 10 日（11 月 11 日 ~03:21 UTC+8）
- **Tags:** `openssl` `quic` `cve`

OpenSSL 的 CNA 于 11 月 10 日发布五条记录，全部 `Awaiting Analysis`，记录上均无 CVSS 分数。**CVE-2026-107496**："Encrypting a CMS message to an EC certificate whose group order is 1 may cause CMS_encrypt() … to loop indefinitely"——任何执行 CMS 加密的应用都可能因对方提供的收件人证书而中招的 DoS。QUIC 一对：**CVE-2026-88822**，自动化对端探测"may allow uninitialized stack data to leak into the received address which is then used as the destination for outgoing packets"；**CVE-2026-95691**，"a retransmitted QUIC CRYPTO frame can release packet storage while the TLS record layer retains a direct pointer into that storage causing use after free"——恶意服务器触发 OpenSSL QUIC 客户端的堆 UAF 读。AES-GCM-SIV 一对：零长度 AAD 更新被当作重置（**CVE-2026-88823**）与过短 IV 导致堆越界读（**CVE-2026-95692**）。

**Why it matters:** 每条记录的引用里都带直接修复 commit，对运维来说问题就变成你跑的是哪个分支——QUIC 客户端 UAF 与 CMS 死循环在常见配置下可由不可信输入触达。记录自己的行文对可达性毫不含糊（"a malicious QUIC server can cause a heap-use-after-free read"），这让分支分诊成为机械工作而非猜测。

[`🔗 NVD：CVE-2026-95691（QUIC UAF）`](https://nvd.nist.gov/vuln/detail/CVE-2026-95691) · [`🔗 修复 commit dd90ceb`](https://github.com/openssl/openssl/commit/dd90ceb99a3c2ddba336bb4a00be9ebabd84c2a1)

---

## 18. Intel 的 TDX 迁移信任域以三种方式败给自己的协议——一份公告里三条 9.x 记录

- **Velocity:** ▮ steady
- **Source:** Intel SA-01580 · NVD 3 条记录 · 11 月 10 日（11 月 11 日 ~02:17 UTC+8）
- **Tags:** `intel` `tdx` `confidential-computing`

Intel 的 SA-01580 覆盖**TDX 迁移信任域（MigTD）**——机密计算中为可信 VM 在主机间迁移做证明的组件——的三个漏洞，每个都由 Intel 的 CNA 按 CVSS 4.0 评分，且都是"Ring 0: Hypervisor"内的提权：**CVE-2026-61887（9.4）**，"missing critical step in authentication in the MigTD SPDM rebind implementation"，对手是**未认证用户的网络攻击者**；**CVE-2026-44685（9.3）**，重绑定协议中的欺骗认证绕过；**CVE-2026-61473（9.2）**，重放认证绕过。本 run 读取时三条记录均未经 NVD 分析（CVE-2026-44685 为 `Awaiting Analysis`，另两条 `Received`）——数字都是 Intel 自己的。

**Why it matters:** 机密计算的安全故事建立在证明握手上，而这些 bug 恰好出在*迁移*路径的重绑定/认证环节——一个活动中的 VM 证明自己可以迁往哪台主机的时刻。如果你跑带热迁移的 TDX，这份公告就是补丁来源；如果你为机密 VM 建信任模型，这是迁移通道属于 TCB 一部分的提醒。

[`🔗 Intel SA-01580`](https://intel.com/content/www/us/en/security-center/advisory/intel-sa-01580.html) · [`🔗 NVD：CVE-2026-61887`](https://nvd.nist.gov/vuln/detail/CVE-2026-61887)

---

## 19. herdr：5 万星的 Rust 运行时，编码 agent 住在可恢复、可观察的终端里

- **Velocity:** ▮ steady
- **Source:** GitHub Trending 周榜 · 本周 +2,196 · 5.03 万星
- **Tags:** `agents` `terminal` `rust`

**herdrdev/herdr** 位列 50,277 星、周榜 +2,196："the runtime your coding agents live on." 它是一个后台服务器：关掉客户端或断了 SSH 后 agent 终端继续活着，机器重启后恢复保存的布局（原始进程并不存活），并把**每个面板标记为 working、blocked 或 idle**——"when an agent stops and needs an answer, herdr says so."。它明确面向 agent：agent 经 CLI 与 socket API 驱动它，"spawn panes, prompt each other, and wait until another agent is genuinely blocked"，而且它跑的是你已经在跑的东西——Claude Code、Codex、Cursor、OpenCode、Grok——拥有它们的终端而不是取而代之。单个 Rust 二进制、无 Electron、Apache-2.0，tmux 式前缀键与鼠标同等一等公民，插件走 marketplace。

**Why it matters:** 多 agent 工作流需要一个理解 *agent* 的进程监督器——blocked 与 working 的区分、agent 间的互相提问正是 tmux 缺的东西——而 herdr 的数字说明需求是真的。它 README 里的诚实注脚（"the original processes do not survive"重启）划出了终端持久化与会话持久化的边界，后者是上文 Atuin Threads 的地盘。

[`🔗 herdrdev/herdr`](https://github.com/herdrdev/herdr) · [`🔗 herdr.dev 文档`](https://herdr.dev/docs/)

---

## 20. Addy Osmani 的 agent-skills 破 11.5 万星——从 /spec 到 /ship 的九条生命周期命令

- **Velocity:** ▮ steady
- **Source:** GitHub Trending 日榜 · 今日 +788 · 11.58 万星
- **Tags:** `agent-skills` `claude-code` `engineering`

**addyosmani/agent-skills**——"Production-grade engineering skills for AI coding agents"——位列今日趋势榜第 5，+788 星，总计 115,812。这套合集把资深工程师的工作流打包成映射生命周期的九条斜杠命令——`/spec`、`/plan`、`/build`、`/test`、`/constraints`、`/review`、`/webperf`、`/code-simplify`、`/ship`——技能按上下文自动激活（"designing an API triggers `api-and-interface-design`"）。最值得注意的是 **`/build auto`**："you approve the plan once, then it runs autonomously… It removes the human stepping *between* tasks, not the verification: every task is still test-driven and committed individually, and it pauses on failures or risky steps."。在 Claude Code 中这些命令作为插件命令安装，与内建同名处用命名空间形式 `/agent-skills:review`。

**Why it matters:** 技能合集已成为工程流程的事实分发渠道（本 feed 报道过好几套），而这里的差异点是生命周期框架加上 `/build auto` 里那条诚实的自治边界——按任务验证门控的批量执行，而不是一次长长的无人值守运行。11.5 万星本身也是一个数据点：流程即技能已获主流采用。

[`🔗 addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) · [`🔗 AddyOsmani.com：Agent Skills`](https://addyosmani.com/blog/agent-skills/)

---

## 21. WSJ 报道 Nvidia 董事会正准备罢免 Jensen Huang——11 月 9 日的调查升级为罢免报道，盘后股价下滑

- **Velocity:** ▮▮▮ trending
- **Source:** WSJ · HN 681 分 · 5.7 小时前（~06:31 UTC+8）
- **Tags:** `nvidia` `industry` `governance`

《华尔街日报》11 月 11 日（美国时间）晚间报道，Nvidia 董事会正**准备罢免 CEO Jensen Huang**——路透社与 The Verge 在同一小时转述了该报道，公司方面未予确认。报道落地数小时前，纽约时报刚报道了第二段婚外情——按 The Verge 对 NYT 报道的概括，对象是"一名向他汇报的高管"。**这是本源在 2026-11-09 覆盖过的那条弧线的升级：**董事会围绕"外国情报行动"启动的独立调查——当时声明无沦陷证据。报道将这名高管 Alice Huang 与三年内约 75 亿美元的 Nvidia AI GPU 进口挂钩——约 24 万颗被禁出口的芯片，大部分是 H100 与 H200（Tom's Hardware 的标题主张；正文在会员墙后）。报道后一小时内，NVDA 盘后从常规时段尾盘（约 168 美元）跌至约 159 美元——约 6%——而季度财报数日内发布。

**Why it matters:** 这已不再是治理花边——一家公司的 CEO 交接被报道正在进行，而它的 CUDA 栈、开源发布（NVKE）与对华出口姿态塑造着本源追踪的大部分 AI 基础设施。以上一切均为**报道**、有署名、未获确认；可核查的数字是盘后价格与财报日期，在 Nvidia 发声之前，其余内容请视为 WSJ 与 NYT 的报道。

[`🔗 WSJ：Nvidia is preparing to oust Jensen Huang`](https://www.wsj.com/business/nvidia-is-preparing-to-oust-nvidia-ceo-jensen-huang-30f421ad) · [`🔗 The Verge：Nvidia is reportedly preparing to fire Jensen Huang`](https://www.theverge.com/tech/1031652/jensen-huang-rumor) · [`🔗 Tom's Hardware：Alice Huang 与 24 万颗被禁芯片`](https://www.tomshardware.com/tech-industry/policy/alice-huang-reportedly-instrumental-in-securing-over-usd7-5-billion-of-nvidia-ai-gpu-imports-during-three-year-relationship-with-jensen-huang-helped-move-240-000-banned-chips-into-china-mostly-h100-and-h200) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50459703)

---

## 22. 联合航空封禁 AI agent 代客订票——首个明确的航空公司个人 agent 禁令，理由是凭据与联邦值机规则

- **Velocity:** ▮▮▮ trending
- **Source:** CBS News · HN 453 分 · 6.7 小时前（11 月 11 日 ~21:20 UTC+8）
- **Tags:** `ai-agents` `policy` `travel`

联合航空周三宣布**禁止 AI agent 代旅客预订机票**，理由是安全风险与联邦法规。其给出的原因："sharing account credentials with personal, third-party, AI assistants can expose sensitive information, and actions taken by these tools may result in unintended purchases, account changes, or use of MileagePlus miles"——外加一点：由 agent 完成值机可能与要求旅客本人当场确认行李不含违禁品的法规冲突。执行是双侧的："United is taking steps to restrict access — directly within our digital platforms and indirectly via travel agencies and aggregators — to prohibit use by unauthorized, third-party personal AI agents or assistants." 对照案例也被点名：西南航空已向 ChatGPT 用户开放其航班库存。分析师 Henry Harteveldt 的解读：联合不想再多一个"可能更强大的中间商"——bot 驱动的机票搜索烧的是航空公司的钱。

**Why it matters:** 大型航空公司对个人 AI agent 的首个明确禁令，为 agentic 商业如何被把关给出了具体形状：在位者要么把 agent 挡在墙外（联合），要么为其建造受认可的门面（西南的 ChatGPT 集成）。对 agent 构建者而言，被点名的两种失效模式——凭据共享与未经授权的购买——正是 agent 在触碰任何旅行账户前应当检测并拒绝的东西。

> "…prohibit use by unauthorized, third-party personal AI agents or assistants." ——联合航空，对 CBS News

[`🔗 CBS News：United Airlines bans AI agents from booking flights`](https://www.cbsnews.com/news/united-airlines-bans-ai-agents-booking-flights/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50458900)

---

## 23. Apache HTTP Server 发布带严重 mod_http2 竞态的 2.4.71——Anthropic 的 OSS Scanner 发现，报告 16 天后修复

- **Velocity:** ▮▮ rising
- **Source:** oss-security / httpd 2.4.71 · HN 33 分 · 2 小时前（~10:11 UTC+8）
- **Tags:** `apache` `http2` `cve`

Apache 于 11 月 11 日发布 **2.4.71**，携带三条 CVE（项目自页：1 严重、1 重要、1 低危）。严重那条是 **CVE-2026-119618**："Concurrent Execution using Shared Resource with Improper Synchronization vulnerability in Apache HTTP Server's mod_http2 in assign_headers() can lead to RCE"——竞态导致堆损坏，Wiz 评估为"远程未认证攻击者"可利用，截至其成文无已知 exploit、无在野利用。受影响：httpd **2.4.55–2.4.70**，独立 **mod_h2 2.0.8–2.0.42**。值得注意的致谢行："Anthropic's OSS Scanner, as vulnerability ANT-2026-MAPKT6MZ (finder); Anthony Weems and Simon Scannell of the Google Cloud Vulnerability Research (finder)"——2026-10-26 报告，16 天后修复并披露。NVD 记录（11 月 11 日发布）仍为 `Received`，**无 CVSS 分**——"critical" 是项目自己的严重度标签，不是分数。暂不能打补丁的话：`Protocols http/1.1` 可禁用 HTTP/2、移除攻击面。Wiz 那篇流传甚广的分析自带混乱——它的" What is CVE-2026-111497? "小标题描述的是 119618，而 **CVE-2026-111497 是十月的 Google Brotli 解码器 CVE**，与 Apache 无关。

**Why it matters:** 大多数发行版默认开启 HTTP/2，所以修复就是一次例行的版本升级——分诊工作是找出还在跑 2.4.70 或更旧版本的主机（Wiz 自己的遥测：64% 的云环境存在受影响资源，51% 公网暴露）。而发现者署名是一个标志：自动化 OSS 扫描器现在与两位 Google VR 研究员并列出现在 Apache 公告的致谢里——这就是自动化漏洞发现落地时的样子。

[`🔗 oss-security：CVE-2026-119618 公告`](https://www.openwall.com/lists/oss-security/2026/11/11/13) · [`🔗 httpd 2.4.71 漏洞列表`](https://httpd.apache.org/security/vulnerabilities_24.html) · [`🔗 NVD：CVE-2026-119618`](https://nvd.nist.gov/vuln/detail/CVE-2026-119618) · [`🔗 Wiz 分析`](https://www.wiz.io/blog/cve-2026-119618-rce-apache-http-server-vulnerability)

---

## 24. GitHub Actions 支持工作流 lockfile——完整 SHA 钉扎时代结束，可读的 tag 回来了

- **Velocity:** ▮▮ rising
- **Source:** hugovk.dev · HN 171 分 · 6 小时前（~06:15 UTC+8）
- **Tags:** `github-actions` `supply-chain` `security`

GitHub Actions 现已支持**工作流 lockfile**，Hugo van Kemenade 的文章走完了整个设置：新的官方 `gh` 扩展 **`github/gh-actions-lock`**（★332）把 `uses:` 行改回可读的 `@vX.Y.Z` tag，并生成 `.github/workflows/actions.lock`——把每个 tag 钉到其精确 commit SHA 加 `owner_id`/`repo_id`。这保留了 SHA 钉扎的防供应链保证（tag 可变），又没有不可读的 diff。生态支持已经就位："Good news, both already support lockfiles"——**Renovate 与 Dependabot**；GitHub 建议在 CI 里跑 `gh actions-lock --verify`，在锁文件失同步或被钉引用不再能通过上游验证时失败；**zizmor v1.32.0** 是第一个支持 lockfile 的版本——更早的版本只会让你 hash 钉扎。

**Why it matters:** 可变 tag 是 Actions 供应链的洞，SHA 钉扎修好了它，代价是没人能审阅的工作流 diff 和塞满十六进制的 Renovate PR。lockfile 恢复了可读的钉扎又保住验证——lockfile 为 Cargo 和 uv 做过的那件事，如今落到 CI 被攻击最多的表面上。

> "All forks on github are the same repo you can pin any commit, merged upstream or not." ——HN 评论区，谈 SHA 钉扎真正信任的东西

[`🔗 hugovk.dev：Lock your GitHub Actions`](https://hugovk.dev/blog/2026/lock-github-actions/) · [`🔗 github/gh-actions-lock`](https://github.com/github/gh-actions-lock) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50459485)

---

## 25. 华为开源 MACaQ——宣称 64 分钟、32.5 GB 量化 1220 亿参数模型的模型无关量化

- **Velocity:** ▮▮ rising
- **Source:** huawei-csl/MACaQ · HN 70 分 · 7.8 小时前（11 月 11 日 ~04:20 UTC+8）
- **Tags:** `quantization` `local-inference` `gguf`

华为 CSL 团队发布了 **MACaQ**（"Model Agnostic Calibrated Quantization"）——仓库 11 月 10 日创建，Apache-2.0，C++，配套 arXiv **2611.10649**（11 月 7 日提交）："MACaQ: Fast, Model Agnostic Calibrated Quantization for Low-Precision Weights and Activations." 头条主张（论文自己的数字）：**只用 32.5 GB 显存、64 分钟量化一个 1220 亿参数模型**，以及"lower perplexity than MR-GPTQ and DuQuant++, or match their best Llama-3-8B perplexity with **11× less quantization time**"。广度才是重点：llama.cpp（2/3/4-bit GGUF）、vLLM（W4A4 或 weight-only）、Diffusers（W4A4 图像/视频/音频生成）、PyTorch（语音，W4A4）——还有一个 **Ascend** 后端。Hugging Face 合集提供量化好的模型。README 结尾有一句不常见的话："Whether you're a human or an AI agent, if you use MACaQ to quantize a model, please star this repository to support the project."

**Why it matters:** 本地推理量化一直是一条学术谱系（GPTQ → AWQ → DuQuant）；一家被制裁的厂商发布宽松许可、多模态、带 llama.cpp/vLLM 路径——外加 Ascend 后端——的量化器，既是实用工具，也是华为开放 AI 栈走向的信号。困惑度对比是厂商自己的论文；真正有趣的独立测试是这些 GGUF 在同一位宽下能否打赢 llama.cpp 的标准量化。

[`🔗 huawei-csl/MACaQ`](https://github.com/huawei-csl/MACaQ) · [`🔗 arXiv 2611.10649`](https://arxiv.org/abs/2611.10649) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50458166)

---

## 26. Vercel 的 agent-desktop：不用截图的 computer use——无障碍树作为 agent 的桌面 API

- **Velocity:** ▮ steady
- **Source:** GitHub Trending 周榜 · 本周 +7,772 · 22.2k 星
- **Tags:** `computer-use` `agents` `accessibility`

**vercel-labs/agent-desktop** 以 22,215 星、本周 +7,772 坐在周榜上："Computer use for AI agents: see and operate desktop apps on macOS, Windows, and Linux through the OS accessibility tree." 它读取无障碍树并以 JSON 返回，"with a ref for every element the agent can act on"——agent 对 ref 点击或输入，重新读取 UI 验证结果，如此往复。没有截图，没有像素匹配，也没有模型："The loop lives in your agent; agent-desktop has no model inside." 它以 CLI 和 **C 库**发货，快照、剪贴板读取、截图与命令执行与树并存。它是 `agent-browser`（11 月 6 日覆盖）的桌面姊妹——Vercel Labs 现在在两层都持有同一套基于 ref 的确定性操作模式。

**Why it matters:** 无障碍树 computer use 是截图+视觉循环的类型化、快速替代——它的边界同样具体：操作系统无障碍层不暴露的东西（重 canvas 应用、游戏、自绘 UI）它一概看不见。所有这类工具的开放问题是各 OS 的应用覆盖面，README 没有给出表格。

[`🔗 vercel-labs/agent-desktop`](https://github.com/vercel-labs/agent-desktop) · [`🔗 npm：agent-desktop`](https://www.npmjs.com/package/agent-desktop)

---

## 27. Stela 在 x86-64 PC 上启动 macOS——UEFI 级的 Apple Silicon 层，带 arm64e 翻译器与 NVIDIA 上的 Metal 驱动

- **Velocity:** ▮ steady
- **Source:** tylertms/Stela · HN 73 分 · 5.1 小时前（~07:05 UTC+8）
- **Tags:** `reverse-engineering` `macos` `emulation`

**tylertms/Stela**（Rust，GPL-2.0，v0.1.0，687 星）自称"A general purpose Apple Silicon layer for x86-64 PCs"——一个 **UEFI 引导程序**（底下没有宿主 OS），由三部分组成：把 arm64e 翻译到 x86-64 的 ahead-of-time **与** just-in-time 编译器（"covers more than 3,000 AArch64 instruction encodings, maps guest registers to host registers and caches translated code"，任何 x86-64-v2 CPU 可跑）；**NVIDIA GPU 的 Metal 驱动**（GTX 16 / RTX 20 系列及更新），"compiles AIR, Metal's shader IR, directly to NIR, Mesa's IR"；以及 Apple 硅硬件的模型——目前是 **Mac mini（M2），运行 macOS 27**。要求不高：8 GB 内存、NVIDIA GPU、60 GB GPT 分区；安装器把 macOS 下载到 U 盘。README 自己的结论很诚实："Your current chances of it booting are low."

**Why it matters:** 这是反向 Rosetta：Rosetta 让 x86 应用活在 ARM Mac 上，Stela 把 ARM 翻译回 x86，让 macOS 本身在被 Apple 抛弃的 Intel 时代 PC 上活下去。这是研究级的 v0.1.0，项目自己都给了低预期警告——但它的架构（翻译器 + GPU 驱动 + 平台模型装进一个引导二进制）才是值得关注的工件。

[`🔗 tylertms/Stela`](https://github.com/tylertms/Stela) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50460154)

---

## 28. OpenAI 的 Codex Security CLI/SDK 发布 0.10.0——漏洞扫描被重建为 agent 工作流，带 GitHub Action 和自己的云

- **Velocity:** ▮ steady
- **Source:** GitHub Trending 日榜 · 今日 +52 · 11.8k 星
- **Tags:** `security` `codex` `sast`

**openai/codex-security**（Apache-2.0，TypeScript，11,847 星）在发布 **npm 0.10.0**（02:18Z）和配套 GitHub Action 0.10.0（02:23Z）的当天早上登上趋势榜。卖点："find, investigate, and fix vulnerabilities in your code"——通过 Codex 内的安全工作流，或用 `@openai/codex-security` CLI 与 TypeScript SDK 自动化。Standard 与 **Deep 扫描**（deep 重复 standard 并去重）、验证候选发现、生成补丁、验证既有修复；起草 `SECURITY.md`、保存威胁模型；严重度"against your own rubric"评估；导出 SARIF/JSON/CSV；在 Linear、Jira 或 GitHub 跟踪发现；将支持的报告发布到 **Codex Security Cloud**；通过导入指南预览第三方扫描器的发现。

**Why it matters:** 这条流水线——扫描 → 验证 → 补丁 → 复验——正是趋势榜上那些安全审计 *skill* 用手编排的东西，如今配上 issue 跟踪器和 CI 成为产品。承重的一步是"验证候选发现"：扫描器确认自己的候选，恰是 agent 驱动安全工具受审之处，所以在有人于已知集合上测出假阳性率之前，把"已验证的发现数"当作一个主张。

[`🔗 openai/codex-security`](https://github.com/openai/codex-security) · [`🔗 npm：@openai/codex-security`](https://www.npmjs.com/package/@openai/codex-security)

---

## 29. Klad 给你的编码 agent 真画笔——agent 与人类在同一画布上作画的绘图应用，没有图像模型

- **Velocity:** ▮ steady
- **Source:** klad-app/klad · HN 74 分 · 12.1 小时前（11 月 12 日 ~00:00 UTC+8）
- **Tags:** `creative-tools` `agents` `gui`

一个 Show HN：**klad**（Rust，source-available）——"A drawing app built for agent/human collaboration." 你用笔在编辑器里画；agent 通过 `klad` 命令行画，"with the same brushes, on the same drawing, and each of you sees the other's strokes instantly"——图层、成组与动画时间轴都包含在内。设计原则以缺失的形式陈述："**There is no image model in klad.**" 画布上的一切保持结构化——"a stroke with its path, pressure, brush and colour, a shape with its points, a fill with its region"——所以"如果一片叶子看着不对，你就修那一片"，而不是重掷骰子碰运气。成品应用在 klad.studio。

**Why it matters:** agent 创造力演示大多止于 prompt 生图；Klad 把它倒过来——agent 操作与人相同的工具 API，笔画粒度，这让 agent 的每一笔都可以在应用自己的语义里检视与撤销。这是 GUI-agent 模式落到创意软件上，而结构化画布设计正是它"可审阅而非生成式"的原因。

[`🔗 klad-app/klad`](https://github.com/klad-app/klad) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50454951)

---

## 30. Red Hat Quay：9.9 的 LIKE 模式跨租户泄漏与 9.8 的 token 换签名密钥链——两条都由 Red Hat 自己的 CNA 打分

- **Velocity:** ▮ steady
- **Source:** NVD · 2 条记录 · 11 月 11 日
- **Tags:** `quay` `containers` `cve`

11 月 11 日发布的两条记录，均为 `Awaiting Analysis`，分数都来自 Red Hat 自己的 CNA（`secalert@redhat.com`）。**CVE-2026-110697（9.9）**：Quay 的 robot 账户列表功能"constructs a SQL LIKE pattern from user-controlled namespace names without escaping wildcard metacharacters"——含下划线的命名空间会跨命名空间匹配，让攻击者枚举自己租户之外的 robot 账户。**CVE-2026-123710（9.8）**："An unauthenticated client can obtain an anonymous registry token with an audience it controls, present that token to the service key rotation endpoint, and install its own approved signing key with no expiry"——一场 token 受众混淆，终点是在注册表机器自身安装一把永久密钥。

**Why it matters:** Quay 是 OpenShift 部署底下的镜像注册表，所以两个 bug 都贴着供应链：一个是跨租户元数据暴露，一个是能活过你以为的所有轮换的签名密钥。分数是 Red Hat 的，NVD 分析未完成；在信任注册表层控制之前，先到 Red Hat CVE 页面核对你所用 Quay 流的修复状态。

[`🔗 Red Hat：CVE-2026-110697`](https://access.redhat.com/security/cve/CVE-2026-110697) · [`🔗 Red Hat：CVE-2026-123710`](https://access.redhat.com/security/cve/CVE-2026-123710) · [`🔗 NVD：CVE-2026-123710`](https://nvd.nist.gov/vuln/detail/CVE-2026-123710)

---

## 31. Fortinet 一波：FortiMail 两条 9.8、FortiAnalyzer 9.8、FortiOS 缺失认证——一天至少七条 ≥9.6，每条分数都出自 CNA 之手

- **Velocity:** ▮ steady
- **Source:** NVD · 7+ 条记录 · 11 月 11 日
- **Tags:** `fortinet` `fortimail` `cve`

NVD 在 11 月 11 日发布了至少 **七条 9.6–9.8 的 Fortinet 记录**，每条都由 Fortinet 自己的 CNA（`psirt@fortinet.com`）打分，每条仍是 `Received`。打头的是 FortiMail 一对：**CVE-2026-126147（9.8）**——FortiMail 8.0.x、7.6.x、7.4.x 与 7.2 全版本的未认证路径遍历（FG-IR-26-199）；**CVE-2026-126148（9.8）**——FortiMail 8.0.x/7.6.x 的未认证 OS 命令注入（FG-IR-26-200）。然后是 **CVE-2026-126170（9.8）**，FortiAnalyzer 8.0.x/7.6.x（含 Cloud 与 BigData 变体）的输出编码不当（FG-IR-26-219）；**CVE-2026-126259（9.8）**，FortiOS 关键功能缺失认证——"may allow an unauthenticated attacker with HA FGSP + standalone-config-sync, or autoscale to execute command as super admin via crafted HA packets"（FG-IR-26-273）；**CVE-2026-126254（9.6）**，数值截断错误让"a configured ibgp neighbor"向相连对等体推送畸形属性（FG-IR-26-268）；同一波里还有两条 9.8 的 SQL 注入记录（CVE-2026-126262，经构造的 OFTP 包在 FortiAnalyzer/FortiManager 上未认证利用；CVE-2026-126263，FortiMail 上需认证）。

**Why it matters:** FortiMail 与 FortiAnalyzer 坐在邮件与日志留存路径上，路径遍历加命令注入的一对就是经典的无认证 RCE 形状——暴露在互联网的 Fortinet 设备应当排在补丁队列最前。引用数字时带上打分者与停止点：这里的 9.8 是 NVD 转发的**基础**分；Fortinet 自己的容器里存着其中两条的威胁调整副本（FGSP bug 9.0、OFTP SQL 注入 9.3）——同一个向量，两个都诚实的数字。

[`🔗 Fortinet FG-IR-26-199（FortiMail 路径遍历）`](https://fortiguard.fortinet.com/psirt/FG-IR-26-199) · [`🔗 Fortinet FG-IR-26-200（FortiMail 命令注入）`](https://fortiguard.fortinet.com/psirt/FG-IR-26-200) · [`🔗 NVD：CVE-2026-126147`](https://nvd.nist.gov/vuln/detail/CVE-2026-126147)

---

## 32. Terence Tao 把 2018 年的逻辑游戏重建成 "Lean Grimoire"——编码 agent 干活，游戏状态渲染为 Lean 证明

- **Velocity:** ▮ steady
- **Source:** terrytao.wordpress.com · HN 12 分 · 1.5 小时前（~10:37 UTC+8）
- **Tags:** `lean` `math` `agents`

Terence Tao 11 月 11 日的文章：七月起他在"experimenting with using modern coding agents to build a number of mathematical visualization applets"；抽出一点时间后，他把 2018 年的 JavaScript 交互教科书 **"QED"**——以合成游戏形式教授命题与一阶逻辑——用编码 agent 重建为 **Lean Grimoire**。新功能包括"the option to show an in-progress Lean proof of one's game state"，和一个幻想模式，其中"mathematical statements become 'potions', mathematical expressions become 'scrolls'"。他正在征集 playtesting，"to make it more useful as a means to teach logical proofs and/or Lean."

**Why it matters:** 一个浏览器应用里的 QED → Lean-4 流水线，是恰好面向 Lean 好奇者的罕见教学工件——这也是数学家们"发布 agent 构建的工具而非写论文讨论它们"这一模式的又一个数据点。HN 上的冷清反响（12 分，UI 挨批）本身就是诚实的读法：价值在 Lean 证明视图，不在游戏打磨。

[`🔗 Terence Tao：Lean Grimoire`](https://terrytao.wordpress.com/2026/11/11/lean-grimoire/) · [`🔗 Lean Grimoire 应用`](https://teorth.github.io/tao-web/apps/grimoire.html) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50462375)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-12T04:30:29Z |
| Items | 32 |
| Sources tracked | 32（Hacker News、GitHub Trending、NVD、CISA KEV、arXiv、oss-security、Apache httpd、厂商博客、安全公告） |
| Update schedule | 04:03, 12:03, 20:03 UTC+8（每日三次） |
| Ranking | 速度加权（时效 × 互动加速度 × 来源权威度） |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[前一天](2026-11-11.md) · [原始 .md](https://trending.md/zh/feed/2026-11-12.md) · [归档](../archive/)
