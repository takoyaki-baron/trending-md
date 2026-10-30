---
date: 2026-10-31
updated: 2026-10-30T20:14:50Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 17
license: CC-BY-4.0
---

# 今日趋势 — 2026-10-31

按**速度**排序 — 衡量的是注意力转移的快慢，而非累积的总量。每一条都链接到一个被实际打开并阅读过的一手来源。

---

## 1. CISA 把两个 Ivanti Connect Secure 漏洞列入 KEV — 而外面到处引用的 8.8，在记录里是 7.0

- **Velocity:** ▮▮▮ trending
- **Source:** CISA KEV · added 2026-10-30 · due 2026-11-02 / 2026-11-13
- **Tags:** `cve` `ivanti` `kev` `exploitation` `vpn`

CISA 于 **2026-10-30** 把 **CVE-2026-111357** 和 **CVE-2026-118527** 加入已知被利用漏洞目录，依据是 "based on evidence of active exploitation"。两者都属于 Ivanti Connect Secure；它们所属攻击链上的第三个漏洞 **CVE-2026-104935**（认证绕过加文件上传竞争条件，CVSS 8.6）已于 **2026-10-13** 进入 KEV。漏洞研究出自 Volexity，发表于 **2026-10-13**，题为 "A Series of Unauthenticated Events"：一个自称 **unknown** 的攻击者被追踪为 **UTA0576**，把这三个漏洞串起来打在一台**完全打过补丁**的设备上（`22.8R2.4, Build 19097`），活动可追溯至 **2026-10-03**。攻击链最终通过内存中修改 `dsinvoked` broker 与 `libdsplibs.so` 的 DSCache 配置拿到 root。

**记录里的分数不是报道里的分数。** CVE 记录（状态 `PUBLISHED`，分配者 **MITRE**）只有**一个**度量：`CVSS:3.1/AV:L/AC:H/PR:L/UI:N/S:U/C:H/I:H/A:H` = **7.0 HIGH**，CWE-829。NVD 的那份显示 `Undergoing Analysis`，原样转述这条 MITRE 度量 — 它自己没有发布评分。二手报道把 **8.8** 归给"'the updated advisory'" — 是 Ivanti 的通告，不是 CVE 记录 — 并给 CVE-2026-118527 打出 **4.3**，而这个数字在记录里根本不存在。向量运算是仲裁者，它算出来是 7.0：拉低分数的是 `AV:L` 和 `AC:H`，而不是任何缺失的组件。Volexity 自己的更新说明把 CVE-2026-111357 指认为提权修复，并**完全没给 CVSS**；CVE-2026-118527 那个可预测文件名的漏洞（让已认证攻击者写入已知磁盘路径），在该页面上**根本没被提到**。

**Why it matters:** KEV 是关于利用的断言，不是关于严重性的断言 — 一个需要本地访问和竞争条件的 7.0 会和一堆 9.8 并排放着，因为这个目录记录的是攻击者**做过**什么；只按分数排序做分诊的人会直接跳过它。真正有用的是后渗透部分的说明：攻击者**没有部署 webshell**，每执行一条命令都重放整条链、结果经 HTTPS 回传，所以 Ivanti 自家的 Integrity Checker "may not be able to identify device compromise" — Volexity 是靠内存取证才看到的。修复版本是 **25.1.1.3 / 25.1.3.1 / 22.8R2.6**；22.7.x 及以下不受影响。置信度标注也要一起读：Volexity 对"出于犯罪而非间谍动机"的判断是**低**置信，对"使用 LLM"是**中**置信，并明确说攻击者的最终目标 "could not be determined"。

[`🔗 CISA — two KEV additions`](https://www.cisa.gov/news-events/alerts/2026/10/30/cisa-adds-two-known-exploited-vulnerabilities-catalog) · [`🔗 Volexity — chained ICS zero-days`](https://www.volexity.com/blog/2026/10/13/a-series-of-unauthenticated-events-chained-exploitation-of-ivanti-connect-secure-zero-days/) · [`🔗 CVE-2026-111357 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-111357)

---

## 2. Northflank 要求所有客户假定环境变量已被解密 — 并说已有用户确认自己的 AI key 被用掉了

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 244+ pts · ~1 day ago (~2026-10-30)
- **Tags:** `incident` `secrets` `paas` `supply-chain`

Northflank 在 **2026-10-30 11:43 UTC** 收到 Wiz 的威胁告警后启动"安全事件"响应，两小时内就从"调查中"转为一条直白指令："users told to assume environment variables were decrypted and to disable or rotate all keys."到 **13:58**，通知点明了范围 — "workloads, secret groups and global secrets" — 到 **15:12** 平台已经为所有用户开启了 Postgres 与 MongoDB 的密钥轮换，并建议关闭 addon 的公网暴露。七个组件被标为**Major outage**：Networking、Certificates、Services、Addons、Jobs、Builds、Logs and Metrics。App、API、营销站与文档仍在线。

最要紧的一句埋在状态时间线里而不是标题上：**"Multiple users are confirming that their AI keys have been used."** Northflank 没有给出受影响客户数量，没有确认被访问数据的完整范围，且截至最后一条 **19:28** 更新仍称调查进行中，"no further confirmed findings"。

**Why it matters:** 一个 PaaS 手里握着客户早已不再留意的凭据 — 模型 API key、数据库 URL、webhook 密钥 — 而这里的应对之所以正确，恰恰因为它昂贵：直接假定已被解密，而不是等证明。轮换指引和披露都是会变的活文档；把范围当作未知而不是已有边界，并把"暂无更多确认发现"当作一个状态，而不是一份清白证明。

[`🔗 Northflank — status incident`](https://status.northflank.com) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=50305025)

---

## 3. 谷歌的 Sleep 框架把训练拆成"醒"和"睡" — 而它的 10M token 胜绩没有局限性章节

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 92+ pts · ~1 day ago (~2026-10-30)
- **Tags:** `continual-learning` `moe` `research` `google`

Ali Behrouz 与 Vahab Mirrokni 于 **2026-10-27** 在 Google Research 博客上发布了 **Sleep 框架**（论文：arXiv **2606.03979**）。其主张是用周期性的学习生命周期取代"训练完就冻结"：*醒*阶段模型对外服务并存储短期痕迹；*睡*阶段停止接收输入，做两件事 — **巩固**，把低秩 MoE 专家加到稳定的低频记忆块上，用 on-policy 蒸馏加一个 RL 的"学习模仿"奖励把短期痕迹蒸馏进长期参数，然后重置临时的高频参数（作者称之为"突触修剪"）；以及**做梦**，MoE 路由刻意激活非常规专家，生成合成样本，按梯度有用性筛选，再在最受好评的样本上微调。

按文章报告的数字：在未见过的 **Manchu** 与 **Kalamang** 连续翻译上跨多个阶段几乎无退化，而 ICL、Cartridges 和 SFT "showed severe forgetting"；**BABILong 10M token** 上接近满分，领先 GPT-4 与 Titans；SQuAD 与继续预训练上是 **48.9%**（单任务）和 **46.2%**（CPT），优于基座模型、SFT 与 SEAL；AIME 24/25 与 HMMT 25 上是 **79.2% / 69.0% / 46.1%**，优于 SFT、GRPO 与 OPSD。

**Why it matters:** 这篇文章没有局限性章节，没有点名具体模型家族、参数规模或算力预算，类增量学习只给了图表没有数字 — 所以诚实的读法是：这是一篇有亮眼数字的**方法**论文，不是可以跨系统比较的消融实验。描述本身还透出两个结构性注意点：该方法需要预留专家容量和一个离线阶段，这是文章没有定价的部署成本；而收益建立在自生成合成数据加梯度信号筛选之上，这恰恰是在别人手里最容易静默失败的部分。理论部分是用作解释，而不是对实测差距的证明。

[`🔗 Google Research — the Sleep framework`](https://research.google/blog/the-sleep-framework-a-new-way-for-llms-to-retain-knowledge-in-continual-learning/) · [`🔗 arXiv 2606.03979`](https://arxiv.org/abs/2606.03979)

---

## 4. Lightpanda 是用 Zig 重写的无头浏览器 — 123 MB 对 2 GB，以及一个在 Alpine 上跑不起来的 Alpine 二进制

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub Trending · 559 stars today · 38,209 total
- **Tags:** `browser` `zig` `agents` `automation`

**`lightpanda-io/browser`** 是用 **Zig** 从零写的无头浏览器 — "Not a Chromium fork. Not a WebKit patch." — 没有图形渲染引擎，JavaScript 通过 V8 执行，上层提供 CDP、WebDriver BiDi、Puppeteer/Playwright 式自动化、页面 dump、"agent mode" 和 MCP server。许可证 **AGPL-3.0**。README 上的基准是在 AWS EC2 `m5.large` 上跑 933 个真实页面：100 个并发页面的峰值内存 **123 MB 对 2 GB**（约少 16 倍），执行时间 **5 秒对 46 秒**（约快 9 倍）— "16x lighter and 9x faster than Chromium" 就是这么来的。

**Why it matters:** 差异化来自约束而非加速比 — 砍掉渲染器才让那个内存数字成立，同时它也定义了这个工具做不到什么（任何需要布局或像素的工作）。README 对失效场景坦率得少见：**没有原生 Android 构建**，因为 Bionic 缺 glibc loader；**没有原生 Windows 二进制**，只能走 WSL；发布的 Linux 二进制需要 glibc，所以在 Alpine 这类 musl 系统上会以 "cannot execute: required file not found" 失败 — 要么换 glibc 镜像，要么用 Zig 0.17.0 加 V8、Libcurl、html5ever 自行编译。对读取 DOM、调用 API 的 agent 工作负载这是合理取舍；对视觉测试它是错的工具，而页面自己也这么说。

[`🔗 lightpanda-io/browser`](https://github.com/lightpanda-io/browser) · [`🔗 GitHub Trending`](https://github.com/trending)

---

## 5. Matt Pocock 的 skills 仓库有 307k 星和 27 个技能 — 而且它是反对 vibe coding 的论证，不是提示词合集

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · 882 stars today · 307,347 total
- **Tags:** `agent-skills` `engineering` `mit` `claude-code`

**`mattpocock/skills`**（"Skills for Real Engineers. Straight from my .agents directory."）有 **307.3k 星、25.9k fork、551 次提交**，许可证 **MIT**。`skills/` 下是 **27 个技能 — 由 README 自己的清单数出，页面并未给出总数** — 按阶段和调用方式双重划分：**11 个用户调用型工程技能**（`ask-matt`、`grill-with-docs`、`triage`、`improve-codebase-architecture`、`to-spec`、`to-tickets`、`implement`、`implement-spec`、`wayfinder`、`retro`、`setup-matt-pocock-skills`），**9 个模型调用型**（`prototype`、`diagnosing-bugs`、`research`、`tdd`、`domain-modeling`、`codebase-design`、`code-review`、`pr`、`wizard`），**5 个用户调用型生产力技能**（`grill-me`、`handoff`、`teach`、`to-questionnaire`、`wait-what`），以及 **2 个模型调用型**（`grilling`、`writing-for-agents`）。安装走插件市场或 `npx skills@latest add mattpocock/skills`。

**Why it matters:** 它针对的是四种反复出现的失败模式 — 做错东西、啰嗦过度、代码跑不起来、代码库变成"一团泥" — 而给出的对策刻意平淡：动手前先访谈、共享领域词汇表与 ADR、红-绿-重构循环、持续改进架构。最值得抄的是按调用方式的分层：用户调用型技能负责编排流程，模型调用型技能承载可自动选取的复用纪律；把两者混在一起，技能库就会变成没人会触发的菜单。它还声称 "work with any model"，这个可移植性承诺有仓库结构支撑，但它的测试并没有证明。

[`🔗 mattpocock/skills`](https://github.com/mattpocock/skills) · [`🔗 GitHub Trending (weekly)`](https://github.com/trending?since=weekly)

---

## 6. NESformer 在约 933 MB 的 Qwen 权重里跑起一台任天堂 — 而且它从未被训练

- **Velocity:** ▮▮ rising
- **Source:** Hacker News (Show HN) · 118+ pts · ~1 day ago (~2026-10-30)
- **Tags:** `transformers` `deltanet` `emulation` `weights`

**`dbreunig/nesformer`** 把 NES 的 6502 CPU、2 KB 工作内存和一张卡带 ROM 跑在一个**原版 `Qwen3_5ForCausalLM` checkpoint 内部** — 而且正如 README 直言："The model was not trained. A compiler computed its weights."门控 DeltaNet 的状态矩阵充当内存：一个 one-hot key 覆写某个 128 宽的行，一个 one-hot query 把它读回来，于是这些行就成了寄存器、内存或 ROM 单元。程序计数器并不存储 — 它由跳转目标和指令长度计数推断出来。checkpoint 是 **466.6M 参数、bf16（约 933 MB）**，其中只有 **9.3M 非零**，压缩后 **3.3 MB**；宿主程序负责 PPU、手柄输入、vblank/NMI 时序和 APU 寄存器，并且除通过生成的 trace 之外从不触碰 CPU 状态。

真正有意思的是验证：参考 CPU 与 nestest 的黄金日志在 **3,348 条指令**上一致，并与 py65 在 **570 万条游戏指令**上一致；精确电路预测了 nestest 加上 **283,610** 个位置的全部参考 token；Thwaite 与 Full Game 的完整运行分别复现了**全部 300** 帧与**全部 210** 帧。速度上离可用还很远 — numba 单核约 **1,650 tokens/s**，而实时模拟需要约 **700,000 tokens/s**；即使跳过空转循环，它仍比真机慢 **150–290 倍**。

**Why it matters:** 这是目前最干净的公开演示：一个 transformer 的状态可以是**宿主内存**，其前向传播可以是一颗 **CPU**，权重是可以被编译出来的产物而不是学出来的。这和 Qwenputer 在 RISC-V 状态上玩的是同一招，只是换到一台有周期级参考 trace 可对照的主机上。限制写得毫不含糊：**仅支持 NROM / iNES mapper 0**，没有 bank switching，非官方 opcode 直接输出 HALT，没有 APU-frame 或 DMC 中断，没有声音，sprite-0 hit 是近似的，PPU 完全不在权重里。MIT 许可，编译器血统来自 Qwenputer 的 `chipformer`。

[`🔗 dbreunig/nesformer`](https://github.com/dbreunig/nesformer) · [`🔗 Hacker News (Show HN)`](https://news.ycombinator.com/item?id=50306442)

---

## 7. OpenAI 围绕五条价值观重写 Model Spec — 而文档自己说模型尚未完全体现它

- **Velocity:** ▮▮ rising
- **Source:** OpenAI · Model Spec 2026-10-29 edition
- **Tags:** `openai` `policy` `alignment` `agents`

OpenAI 于 **2026-10-29** 发布了重写的 **Model Spec**，围绕五条命名的价值观重组：**"Be faithful to human intent," "Minimize harm," "Be honest and transparent," "Facilitate human agency," "Act with care."** 对意图的忠实被定位为基础 — 模型应理解人真正想要什么，而不是字面执行指令，并在指令用尽处使用判断力。文档保留了带明确权限层级的 **"chain of command"** — **Root、System、Developer、User、Guideline** — 并对助手消息、工具消息和不可信内容设 **"No authority by default"**；另外加入两套权衡框架，处理个体与集体利益、即时指令与长期目标。它还新增 "Consider context carefully" 一节，覆盖对话历史、记忆与个性化，要求把假设显性化并易于纠正。

**Why it matters:** 值得带走的一句是厂商自己写的：**"Our production models do not yet fully reflect the Model Spec."** 这把文档从"行为描述"变成了"训练目标"，而这个读法是对的 — 关于"控制并沟通副作用"的扩展指导，是写给**会订票、会下单、会改文件的 agent** 的，其失效模式是"在误读意图之下正确地执行了动作"。两个结构性注记：最详细的文风规则被撤掉，改为适应用户、语言与文化；主体现在叫 **"GPT"** 而不是 "the assistant"。该页面同时标注有更新版本为当前版、这一版仅作历史存档，所以引用时要说明你读的是哪一版。

[`🔗 OpenAI — Model Spec (2026-10-29)`](https://model-spec.openai.com/2026-10-29.html) · [`🔗 TNW — five core values`](https://thenextweb.com/news/openai-model-spec-five-values-update)

---

## 8. Recursive 的 Flint 是 39.8B-A2.5B 的编程模型，Apache 2.0 — 89.7% SWE-bench Pro v2，知识截止 2026 年 6 月

- **Velocity:** ▮▮ rising
- **Source:** Hugging Face Trending · 19k downloads · 1.26k likes
- **Tags:** `open-weights` `moe` `coding-agent` `apache`

**`RecursiveSI/flint`** 是一个 decoder-only MoE 编程 agent 模型，**总参数 39.8B / 每 token 激活约 2.5B**（含输出头；纯激活主体约 2.2B），**49 层** — 2 层 dense 之后 47 层 MoE — 每个 MoE 层 **256 个路由专家**，每 token 选 6 个外加一个共享专家。注意力是 **35 层滑窗 / 14 层全注意力**，上下文 **262,144 token**，词表 **150,144**，许可证 **Apache 2.0**。报告基准（temperature 1.0 / top-p 0.95 / top-k 20）：**Terminal-Bench 2.1 为 54.9%、SWE-bench Pro v2 为 89.7%、SWE-bench Verified 为 74.2%。**

**Why it matters:** SWE-bench Pro 那个数字要仔细读 — Pro v2 是更难、抗污染的切分，89.7% 与 Terminal-Bench 的 54.9% 并置，呈现出"擅长仓库内改动、偏弱于长程 shell 作业"的形状，这跟它的激活参数规模给人的预期正好相反。模型卡自己的告诫值得原样引用而不是转述：它可能生成 "incorrect or harmful content, faulty code, or inappropriate tool calls"，长推理会吃掉输出预算，而上下文上限 "does not guarantee consistent accuracy"。知识截止是 **2026 年 6 月**，之后的一切是推断而非回忆。

[`🔗 RecursiveSI/flint`](https://huggingface.co/RecursiveSI/flint) · [`🔗 Hugging Face trending`](https://huggingface.co/models?sort=trending)

---

## 9. 一个线性探针在生成前抓到受压 agent 82% 的泄密 — 而词袋分类器几乎同样灵

- **Velocity:** ▮▮ rising
- **Source:** arXiv · 2610.40588 · 2026-10-30
- **Tags:** `multi-agent` `safety` `interpretability` `research`

《**Pre-Crime for Agents, at the Last Second: Probing When a Recruited Agent Gives In**》（arXiv **2610.40588**，Leonidas Raghav）构造了一个受控的多 agent 施压实验，覆盖六个场景：同伴最多用 20 轮逼目标说出部署令牌之类的秘密，目标常常先拒绝、然后让步。一个**线性探针**在每次模型调用**生成之前**读取其激活。在留出的 **Qwen3-32B** 片段上，把阈值设在只标记 5% 良性调用的位置时，探针检出 **82%** 的泄密调用；零样本决策模型监控在相近误报率下检出 **26%**。在 **gpt-oss-20b** 上，对推理过程做探针达到 **AUROC 0.91**。

**Why it matters:** 最有价值的是论文对自己不利的那条结果 — 一个词袋分类器 "performs nearly as well"，说明 "most of the gain comes from training on labels, not activations"；而且探针对**被允许**的披露同样有反应，读到的是"即将发生的披露"多于"违规本身"。输出过滤器只能在文本产生后检查，这个方法把检查点提前了，但预警距离很短，且"一报警就停"会 "would stop most benign episodes"，再加一道文本检查也没能解决这个权衡。实验是受控环境而非真实部署，所以 82% 是个"上界形状"的数字，不是现场发生率。

[`🔗 arXiv 2610.40588`](https://arxiv.org/abs/2610.40588) · [`🔗 arXiv cs.AI recent`](https://arxiv.org/list/cs.AI/recent)

---

## 10. 把检索当作"走过"记忆，而不是"搜索"记忆 — 0.59M 步到 0.95 回报，绝对寻址要 0.94M 到 2M+

- **Velocity:** ▮▮ rising
- **Source:** arXiv · 2610.40545 · 2026-10-30
- **Tags:** `memory` `long-context` `agents` `research`

《**Retrieval as Traversal: Value-Indexed Memory for Stateful Long-Context Agents**》（arXiv **2610.40545**；Daniel Strauß、Zhenshan Bing、Alois Knoll）把记忆的**内容**与**地址**分开：内容决定价值，位置决定访问成本；检索因此变成沿记忆地址的持续局部遍历，而不是每一步都从头做全局搜索。提出的目标是一个带成本正则的索引：把有价值的信息放在近处，同时对每块"局部可及"的记忆施加惩罚；其边际价值形式鼓励互补的记忆被一起检索，并抑制仅仅因为各自有用就挤进同一检索集的冗余项。

唯一的实验是在 **MiniGrid Memory** 上用最简单的固定几何变体做的概念验证，上下文为五个 token：持久局部遍历头在 **0.59M 训练步后达到 0.95 的平均回报**，而高斯绝对寻址需要 **0.94M** 步、类别式绝对寻址需要 **超过 2M** 步。

**Why it matters:** 诚实的表述来自论文自身 — 学习式几何和重复检索都没有测试，"the complete proposed method still requires further experimentation"，所以被支持的只是更弱的命题：**有状态**检索可能比无状态检索更容易学。这对 agent 仍是有用的方向，因为反复搜索不断增长的上下文是主要成本，而 1.6 到 3.4 倍的样本效率差距是"值得一试"的理由，不是"可以上线"的理由。

[`🔗 arXiv 2610.40545`](https://arxiv.org/abs/2610.40545) · [`🔗 arXiv cs.AI recent`](https://arxiv.org/list/cs.AI/recent)

---

## 11. "可回卷交互式证明"让弱验证者可以回卷强证明者 — 换来近乎线性的验证开销

- **Velocity:** ▮▮ rising
- **Source:** arXiv · 2610.40535 · 2026-10-30
- **Tags:** `scalable-oversight` `proofs` `research`

《**Efficient Scalable Oversight via Rewinding**》（arXiv **2610.40535**；Ziyi Guan、Yael Tauman Kalai、Ron Rothblum、Zoe Xi）攻的是辩论式监督底下的那个假设：现有交互式证明只在至少一方证明者诚实时才高效，而放弃这个假设代价高昂。他们的构造 — **可回卷交互式证明（RIP）** — 允许验证者保存证明者状态并在之后恢复，而恰恰当证明者是 AI 模型或运行在可 checkpoint 的环境里时，这件事是可行的。他们在不用密码学的前提下，为"对少量 oracle 答案改动鲁棒"的计算构造了 RIP。诚实证明者的运行时间**与原计算成线性**，验证者经一次性预处理后运行时间为"输入长度的近乎线性"。

**Why it matters:** 这是一个效率定理，不是基准测试 — 摘要没有给出任何量化加速，唯一的实证是一个**初步的 MNIST 实验**，显示 RIP 能胜过"a state-of-the-art deployed proof system"。两个适用边界被明确写出：构造只覆盖对少量 oracle 答案改动鲁棒的计算；回卷依赖验证者控制证明者的机器、或能 checkpoint 并恢复它。对第三方模型这是真实约束，对自己托管的模型则不是问题 — 而监督研究正越来越只能落在后者上。

[`🔗 arXiv 2610.40535`](https://arxiv.org/abs/2610.40535) · [`🔗 arXiv cs.AI recent`](https://arxiv.org/list/cs.AI/recent)

---

## 12. OpenMausBot 给每个 bot 一台自己的电脑 — 8.4k 星、Apache-2.0，而 API key 明文躺在 0600 的文件里

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · 899 stars today · 8,422 total
- **Tags:** `agents` `desktop` `mcp` `apache`

**`milind-soni/OpenMausBot`** — 原名 OpenGrokBot，也称 "MausBot" — 是 Grok Bot / Meta Muse / OpenAI dots 的开源替代，思路很简单：AI agent 是**聊天应用里的联系人**，每个都有自己的角色设定、模型、对话记忆、电脑和接入的应用。bot 通过本地安装的 `claude`、`codex` 或 `grok` CLI 运行，由本地 harness server 管理进程。每个 bot 都有一台电脑 — 经 Boat API 开通的云端 Linux 桌面、隔离的 "Local VM"，或在支持的情况下用你自己的机器。许可证 **Apache-2.0**，但 `enterprise/` 目录是另一份许可的"source-available"；删掉该目录即为开源版。仓库有 **8.4k 星、1.2k fork、7,442 次提交**。

安全模型比同类产品考虑得更多：权限中介把 shell 命令、文件编辑和提问变成内联的"允许/拒绝/在聊天里回答"卡片；凭据是"write-only"，界面只看到已配置的标志而非值；宿主机控制需显式开启，且在 Ubuntu Wayland 上因 issue #345 **fail-closed**；MCP 控制平面刻意排除审批授权、删除、设置、凭据和电脑生命周期。

**Why it matters:** 那个豁免才是关键 — API key 以**明文存放在私有的 `config.json`** 里（Unix 上 `0600`），所以整套权限模型最终落在本地文件系统保护上，这跟钥匙串是不同的威胁模型。项目自称 "early but real" 并列出缺口：Ubuntu 是 beta、通话仅 macOS、Windows 安装包未签名、应用事件依赖内置的 Composio 服务。真正有意思的是架构上的赌注 — 认为"有电脑的 agent"是一种产品形态，而权限中介是它可被售卖的前提。

[`🔗 milind-soni/OpenMausBot`](https://github.com/milind-soni/OpenMausBot) · [`🔗 GitHub Trending`](https://github.com/trending)

---

## 13. Tangled 重建联邦式代码托管：内存中的 Rust 索引器，以及和代码放在一起的 Git 对象链 issue

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 144+ pts · ~1 day ago (~2026-10-30)
- **Tags:** `git` `federation` `atproto` `forge`

Tangled 以重建的架构重启了它的代码托管平台。原来的 Go 单体（"appview"）用瑞典的一台 SQLite 数据库同时负责索引、缓存、协议外数据和 SSR 界面；现在拆成**边缘部署的 Svelte 前端**和 **bobbin** — 一个全新的 **Rust** 索引器，完全在内存中、只读，跑在 **11 个以上区域**。**Knot2** 同为 Rust，把自研的 Git 服务器和 SSH 服务器合成一个二进制。issue、PR、评论、表态和标签现在**与代码一起存在 knot 上**，作为"协作对象" — 一串带签名记录和完整历史的 Git 对象链 — 通过 AT Protocol firehose 同步；写入用户自己 PDS 的 attestation 让用户可双向验证某个 knot 没有篡改其记录。组织变成了真实的 AT Protocol 账号，有自己的 DID；PR 流程支持 Git 和 Jujutsu 两种用户的堆叠 PR，包括版本间的 interdiffs。

**Why it matters:** "联邦"通常意味着代码有镜像、而协作层没有；把 issue 和 PR 放进与 commit 相同的签名对象图里，才让可移植性从名义变成真实。限制写得很清楚：bobbin 是**只读**的，且只处理 AT Protocol 数据；现有自托管者必须把 knot 升到 **v1.20.0**；把临时充当组织的普通账号迁移的工作仍在开发；私有仓库、CLI、语言 SDK 和 agent skills 都留到了后续几周 — 所以这是"已宣布的重建"，不是"已完成的重建"。

[`🔗 Tangled — the federated code forge`](https://tangled.org/blog/forge/) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=50305573)

---

## 14. Bunny.net 发现一台 CDN 节点落在一台被入侵的托管商服务器上，正在重签所有托管证书

- **Velocity:** ▮▮ rising
- **Source:** bunny.net status · incident published 2026-10-28
- **Tags:** `cdn` `tls` `incident` `supply-chain`

bunny.net 于 **2026-10-28** 发布事件通告：一家基础设施服务商报告了涉及第三方服务器管理软件的未授权访问，而 bunny.net 有**一台位于亚美尼亚的 CDN 节点**正托管在受影响的那台服务器上。**2026-10-28 11:40 UTC**，bunny.net 在 20 分钟内停止经由该服务器路由流量，保全日志、擦除服务器、吊销其访问权限并永久移除该节点。调查"found no evidence of unauthorized access, though it could not be fully ruled out" — 标准措辞，也正是后续工作照做不误的原因。

范围描述很窄：*如果*发生过访问，可能暴露的仅限于那台机器上临时缓存的内容、Pull Zone 配置和 TLS 证书；bunny.net 的账号数据和内部系统未受影响。平台域名的证书已吊销并重签；**2026-10-29 18:40 UTC** 的更新称托管 TLS 证书正以新私钥分批重签，预计在 **2026-10-31** 结束前完成。

**Why it matters:** 单台节点既是很小的爆炸半径，又是很大的爆炸半径 — 因为 CDN 边缘握着别人域名的私钥。"无证据"与"已排除"之间的区别，正是把一个状态说明变成一场密钥轮换作业的东西；而这份通告诚实的地方在于，代价落在使用自有证书的客户身上 — 他们被告知要自己吊销并重签，服务商替不了。

[`🔗 bunny.net — CDN incident`](https://status.bunny.net/incidents/p6gf1by9kr7m) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=50308697)

---

## 15. 一个 WordPress 导入插件拿到 CISA 补给的 9.9 — 而 NVD 记录的状态是 `Deferred`

- **Velocity:** ▮ steady
- **Source:** NVD · published 2026-10-29
- **Tags:** `cve` `wordpress` `cisa-adp` `path-traversal`

**CVE-2026-113617**（发布于 **2026-10-29**）是 WordPress 插件 **Automated Import Products to Cart** 在 **1.0.4** 之前的路径穿越：插件在使用用户提供的文件路径读删文件前未做净化，因此权限极低的用户 — "including subscribers" — 可读取任意文件，"potentially including database credentials"，并可删除任意服务器文件。度量为 `CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:C/C:H/I:H/A:H` = **9.9**。

**这个 9.9 既不是厂商的，也不是 NVD 的。** 它的来源是 `134c704f-9b21-4f2e-91b3-4a467353bcc0` — **CISA-ADP**（Vulnrichment）— 位于 `Secondary` 槽位，CWE-22 也归于同一来源。记录 `vulnStatus` 为 **`Deferred`**，没有任何 `nvd@nist.gov` 度量。所以这是第五种来源情形最纯粹的样子：记录上的一个数字由第三方富化容器写成，而 NVD 已声明不会分析这条记录。

**Why it matters:** 这个分数站得住 — 把 `PR:L` 的读删文件推到 9.9 的是 `S:C` — 但把它归给"NVD"或归给插件作者都是错的，而 `Deferred` 状态意味着这个数字不会再被复核。同一个 24 小时窗口里还产出：**CVE-2026-109516**（`security@wordfence.com`，**9.8**，`Deferred`）— "Bot for Telegram on WooCommerce" 到 **1.3.0** 的认证绕过，公开 REST 端点跳过 webhook 签名校验、接受 `message.chat.id` 冒充目标用户名的伪造 update，再由可预测的登录令牌在任何账号（含管理员）上设置认证 cookie；以及 **CVE-2026-42922**（`talos-cna@cisco.com`，**9.8**，`Deferred`）— **FUXA 1.3.2-2809** 的 `/nodered` 路径授权绕过，未认证即可达成任意代码执行。三个 Critical，三个不同的 CNA 打分，三条 NVD 已延后的记录。

[`🔗 CVE-2026-113617 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-113617) · [`🔗 CVE-2026-109516 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-109516) · [`🔗 CVE-2026-42922 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-42922)

---

## 16. "AI 没有取代 SRE，而是在让他们技能退化" — 而证据是借自内镜和航空的

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 363+ pts · ~1 day ago (~2026-10-30)
- **Tags:** `sre` `automation` `labor` `analysis`

一篇 SigNoz 通讯文章主张：AI 对 SRE 更近的风险不是取代，而是**技能侵蚀**，其依据是 Bainbridge 1983 年的《自动化的讽刺》：把例行工作自动化，会把人留在被动监视的位置，然后在缺少练习的情况下面对罕见的危机。落到 SRE 语境，AI 越来越多地接管告警聚合、runbook、已知问题修复、日志异常和初步根因建议，于是人只剩下新颖的级联故障 — 那恰恰是最依赖直觉的场景 — 同时得到锻炼的机会更少。作者把初级版本称作 **"never-skilling"**。

**支撑数字全部来自其他领域。** 一项医学研究发现，在有 AI 辅助之后，内镜医师**无辅助**的息肉检出率从 **28% 降到 22%**；航空研究发现重度依赖自动驾驶的飞行员丧失了情境意识和手动飞行熟练度，促使 FAA 要求增加手动飞行。文章还引用了 PagerDuty 的分层模型 — 已知故障自动化、部分问题由 AI 给建议加人工验证、新颖的级联故障由人主导。

**Why it matters:** 文章自身的结构就是限定条件：背后没有 SRE 专项研究，证据是类比性的，"95%" 的前提是假设，PagerDuty 那套是厂商框架；作为 SigNoz 的文章，它在"可观测性原生 AI"上也有商业利益。这些都不推翻论点 — "human-in-the-loop, not human-on-the-side" 是真实的设计约束，刻意把一部分事件留给人类是最便宜的那个干预 — 但诚实的引用方式是"有借用证据的合理机制"，而不是"已测量的效应"。

[`🔗 SigNoz — AI isn't replacing SREs, it's deskilling them`](https://newsletter.signoz.io/p/ai-isnt-replacing-sres-its-deskilling) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=50305693)

---

## 17. GitHub 的 Actions、Pages 和 Webhooks 降级 90 分钟 — 17:50 到 19:23 UTC

- **Velocity:** ▮ steady
- **Source:** githubstatus.com · incident 2026-10-30
- **Tags:** `github` `outage` `ci`

GitHub 于 **2026-10-30 17:50 UTC** 就 **Actions 与 Webhooks** 的"性能降级"开启调查，**Pages** 在 **18:00** 跟进。到 **18:06** 影响已经具体化：Actions 工作流、Pages 部署和 webhook 事件出现延迟，**code search 与 live updates** 报错。缓解措施随即开始并出现早期恢复迹象，所有受影响服务于 **18:32** 恢复，事件在 **19:23** 解决，官方承诺随后给出详细根因分析。

**Why it matters:** 爆炸半径就是依赖图 — Actions 承载了大多数开源 CI，Pages 放着大量文档，webhook 是每个集成得知"有东西变了"的方式，所以 90 分钟的降级会卡住那些根本不知道自己依赖它的发布与部署流水线。通告没有涉及数据丢失或安全成分；把解决理解为"服务恢复"，在根因分析出来之前不要对原因下结论。

[`🔗 GitHub — incident`](https://www.githubstatus.com/incidents/pwxsjgnvrk6b) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=50307723)

---

## 18. DeepSeek-V4.1-Flash-1017 重回 Hugging Face 趋势第一 — 763B、1M 上下文、MIT，以及一条关于 KV 缓存压缩的引用

- **Velocity:** ▮ steady
- **Source:** Hugging Face Trending · 146k downloads · 3.99k likes
- **Tags:** `deepseek` `open-weights` `moe` `context`

**`deepseek-ai/DeepSeek-V4.1-Flash-1017`** 今早是 Hugging Face 趋势第一，**146k 下载、3.99k 点赞**，但它不是新发布 — 模型卡把它描述为 DeepSeek-V4.1-Flash 的**"minor update"**，所属 collection 显示最后更新于 **14 天前**。它是图文转文本模型，**763B 参数**、8-bit / FP8、**MIT** 许可，**1M token 上下文窗口**、`max_tokens` 至少 **256K**，支持交错图像、思考模式、工具调用、数值化推理强度和对话中途的 system message。报告分数包括 **HLE 无工具 42.6**（纯文本 44.0）、**Terminal-Bench 4.0 42.3**、**DeepSWE v1.1 77.0**、**NL2Repo-Bench 68.2**、**Agents' Last Exam 35.4**、**ZeroBench-main 带工具 51.0**。引用标题指向 "Pushing the Limits of KV Cache Compression"。

**Why it matters:** 这波趋势是分发事件，不是能力事件，feed 应该直接把这点说出来 — 版本串里的 `-1017` 是日期戳，不是新颖性声明。卡片上有两个实用提醒：本次发布**不带 Jinja chat template**，提示编码需要 Python 参考实现或 `deepseek-recipe` 库，这会打断天真的部署配置；另外基准是发布方自报，其中数项带工具或在子集上跑，因此不能与本 feed 里无 harness 的数字横向比较。

[`🔗 deepseek-ai/DeepSeek-V4.1-Flash-1017`](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017) · [`🔗 Hugging Face trending`](https://huggingface.co/models?sort=trending)

---

## 19. Taste-skill 以 106k 星冲榜做美术指导 — 只剩一个技能，其余的都搬走了

- **Velocity:** ▮ steady
- **Source:** GitHub Trending (weekly) · +4,359 this week · 106,235 total
- **Tags:** `agent-skills` `design` `mit`

**`Leonxlnx/taste-skill`** 是一个 agent 技能，提供**美术指导**、开放许可的参考图和浏览器检查，让编程 agent 产出经过设计的页面和仪表盘，而不是千篇一律的版式。它有 **106,235 星、254 次提交**和 **MIT** 许可，如今只含**一个在用技能** — `design-taste-frontend` — 因为作者把其他技能移到了独立仓库。

**Why it matters:** 这是两周内第三个把重心放在**审美**判断而非代码生成的大型 agent 技能仓库，而收敛到单个技能才是有意思的信号：价值在参考集和浏览器检查（结果是否真的像参考图），而不在提示词数量 — 这与上一波设计技能潮得到的教训相同。一个技能文件拿到 106k 星，衡量的是"品味作为商品"的需求，而不是这个文件有效的证据 — README 也没有给出任何能定论的基准。

[`🔗 Leonxlnx/taste-skill`](https://github.com/Leonxlnx/taste-skill) · [`🔗 GitHub Trending (weekly)`](https://github.com/trending?since=weekly)

---

## 20. 这个美国税表项目会检查自己的算术，并公开哪里失败 — 68.6% 的申报人覆盖率，157 个拒答闸门里 148 个未测量

- **Velocity:** ▮ steady
- **Source:** Hacker News (Show HN) · 80+ pts · ~2 days ago (~2026-10-29)
- **Tags:** `verification` `lean` `tax` `open-source`

**`emmilco/us-tax-model`** 把美国联邦个人所得税表与填报说明编码成公开、带引用、可机器校验的数据 — **124 星、10 fork**，代码 **Apache-2.0**、数据 **CC0**。表是 YAML 文件，每一行都带一个来自约二十个原子（`sum`、`smaller_of`、`table_lookup` …）的封闭词汇表表达式，没有用户自定义函数、循环或递归，并附指向存档来源的引用（含页面哈希）。金额一律用整数分配合 `BigInt` 求值，全程没有浮点。构建期检查器校验引用、无环性、类型、穷尽的分支选择和来源；渲染器为每一行输出可读英文。在 `lean/TaxFormalization/` 下，原子在整数上定义，`subtractFloor0_nonneg`、`roundHalfUpToUnit_idem` 等性质被证明，一个基于规范 JSON 的参考求值器被证明可终止且确定。它还会与 **PolicyEngine-US**、**Tax-Calculator**、**OpenTaxSolver** 交叉比对，并且"never files, signs or transmits a return"。

**Why it matters:** 局限性章节才是可以信任其余部分的原因。引用只能"show where a line points, not that it was interpreted correctly"；类型正确的错误操作数仍会通过检查；求值器一致并不能证明数据与 IRS 原文一致，而 **BUG-0001** 就是他们自己记录的、两个求值器一致地算错的一个例子；独立解读"are not fully independent"；记分板上有 **1,515** 行中的 **198** 行（**13.1%**）依赖外部家族的断言；实测申报人覆盖率为 **68.6%**，而 **157 个拒答闸门中有 148 个未测量**，真实覆盖率更低。表与说明不是法律，歧义被记录而非被解决，也没有律师审查过项目的法律立场。这就是一个验证项目在诚实区分"哪些被证明了、哪些只是被检查过"时的样子。

[`🔗 emmilco/us-tax-model`](https://github.com/emmilco/us-tax-model) · [`🔗 Hacker News (Show HN)`](https://news.ycombinator.com/item?id=50278678)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-10-30T20:14:50Z |
| Items | 20 |
| Sources tracked | 17 (Hacker News, GitHub, arXiv, Hugging Face, CISA KEV, NVD, CISA-ADP, Google Research, OpenAI, Volexity, bunny.net, Northflank, GitHub Status, SigNoz, Tangled, TNW) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[Previous day](2026-10-30.md) · [Raw .md](https://trending.md/zh/feed/2026-10-31.md) · [Archive](../archive/)
