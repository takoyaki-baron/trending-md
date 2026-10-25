---
date: 2026-10-25
updated: 2026-10-25T12:42:04Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 36
license: CC-BY-4.0
---

# 今日趋势 — 2026-10-25

## 1. Roku 把所有开发者仓库从 GitHub 迁到了 GitLab —— 而面向 AI 索引器的迁移建议才是真正有用的部分

- **Velocity:** ▮▮▮ trending
- **Source:** Roku Developer Blog / Hacker News · 189 pts · 约 4 小时前 (~00:06 UTC+8 10-25)
- **Tags:** `roku` `gitlab` `github` `migration` `rag`

Roku 表示它"已完成把所有开发者资源从 GitHub 迁移到 GitLab"，涵盖开发者文档、示例应用，以及 RSG 2.0 SDK 的工具链仓库。仓库名保持不变，所以 `github.com/rokudev/<repo>` 变成 `gitlab.com/rokudev/<repo>`；已有克隆需要 `git remote set-url`，子模块需要改 `.gitmodules` 再执行 `git submodule sync`。这篇博文标注的日期是 **10 月 15 日**；它在 10 月 24 日才登上 Hacker News。

**Why it matters:** 公告自己强调的重点，恰恰是大多数变更日志会省略的部分 —— 它告诉所有以这些仓库为检索管线或编程智能体的落脚点的人要"更新源 URL 并重新抓取"，因为 raw 文件 URL 也会变，而"陈旧的索引不会报错，它只是安静地继续提供过期内容"。这与未经核实的说法是同一种失效模式：安静，而非响亮。HN 讨论帖先发现的另一个诚实细节是：这些仓库自己的 README 里写的还是它们位于 GitHub。

[`🔗 Roku — 仓库迁至 GitLab`](https://blog.roku.com/developer/gitlab-move) · [`🔗 gitlab.com/rokudev`](https://gitlab.com/rokudev) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50222622)

---

## 2. PHP 基金会只有一名全职员工和 14 名兼职合同工 —— 而提交的代码变更量翻了一倍

- **Velocity:** ▮▮▮ trending
- **Source:** Reuters / Hacker News · 62 pts · 约 1 小时前 (~03:04 UTC+8 10-25)
- **Tags:** `php` `open-source` `maintainers` `funding` `security`

路透社采访了 PHP 基金会执行董事 **Elizabeth Barron**，她称这个非营利组织"资金严重不足"："我们有一名全职员工（就是我）和 14 名主要兼职的合同工"，董事会成员是无偿志愿者。按通常估算，PHP 支撑着大约 **70% 的网站**，而基金会完全依靠捐款和资助运转。这次采访与两个长期存在的 PHP 漏洞（CVE-2026-109618 / CVE-2026-109619，9.2 分）的协同修补出现在同一周，修补工作牵涉了外部研究者和包括 OpenAI、Wiz、Calif 在内的公司。

**Why it matters:** 真正值得关注的是负载的方向。Barron 说项目现在收到的**拟议代码变更几乎是去年同期的两倍**，而贡献者人数并没有翻倍 —— AI 辅助的贡献曲线是以评审工作的形式抵达的，而评审工作不会因为"一个人"的头衔而扩容。Barron 还说在披露之前以及已修补系统上，这两个漏洞**没有已知的利用行为**，这是这里唯一让人宽慰的数字，它应该与那两个 9.2 并列而不是排在后面。

[`🔗 路透社`](https://www.reuters.com/technology/php-foundation-under-funded-with-one-full-time-staff-member-director-says-2026-10-23/) · [`🔗 US News 转载`](https://money.usnews.com/investing/news/articles/2026-10-23/php-foundation-under-funded-with-one-full-time-staff-member-director-says) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50224074)

---

## 3. DeepSeek 带日期的 Flash 更新是 Hugging Face 上最热门的模型 —— 而它的 Terminal-Bench 那一行是在 Claude Code 里跑出来的

- **Velocity:** ▮▮▮ trending
- **Source:** Hugging Face / DeepSeek API Docs · 2,746 likes · 发布约 8 天后 (~10:40 UTC+8 10-17)
- **Tags:** `deepseek` `open-weights` `mit` `benchmarks` `harness`

**DeepSeek-V4.1-Flash-1017** 是 9 月 V4.1-Flash 的一个点位更新，以同一个 `deepseek-flash` API 名称、同样的价格上线，并用 DeepSeek 惯用的方式以日期标注小版本。它自家表格里每一行都在涨：Terminal-Bench 4.0 **31.2 → 42.3**，ProgramBench **20.3 → 29.1**，Apex Bench v1.1 **64.6 → 72.1**，Agents' Last Exam **31.8 → 35.4**，无工具 HLE **36.8 → 42.6**。权重以 **MIT** 许可证放在 Hugging Face，100 万上下文，引用标题透露了机制："Pushing the Limits of KV Cache Compression"。一周之后它仍然是 Hub 上热度第一的模型。

**Why it matters:** 脚注才是比较的关键。DeepSeek 明说它"对 Terminal-Bench 4.0 使用 **Claude Code harness**，对 DeepSWE v1.1 使用 **Mini-SWE-V2 harness**" —— 所以那 11.1 分的 Terminal-Bench 跃升，是一个在竞争对手的智能体循环内部产生的数字，它衡量的是模型**加上那个 harness**，而不是模型本身。还有两点：表格里多数行其实是 Claude Opus 5 领先（HLE 56.3 对 42.6、Terminal-Bench 51.8 对 42.3、NL2Repo-Bench 75.3 对 68.2）；而官方发布说明的 DeepSWE 对比只以图表图片给出，没有任何数字表格。把提升读成真实的，把排名读成被 harness 塑造的。

[`🔗 deepseek-ai/DeepSeek-V4.1-Flash-1017`](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017) · [`🔗 DeepSeek 发布说明`](https://api-docs.deepseek.com/news/news261017/)

---

## 4. 《Into the Unknown》：15 个真实未发表的研究方向、135 篇智能体论文，其中 114 篇没过诚信检查

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.19159 / Hugging Face Papers · 28 位作者 · 提交于 2026-10-13
- **Tags:** `benchmark` `scientific-research` `agents` `integrity` `doe`

美国能源部国家实验室的科学家贡献了 **15 个未发表的后续研究方向**，均来自他们自己的工作，并附带"一份投稿必须满足的必要条件"清单 —— 在没有参考答案的开放问题上，这份清单充当评分标准。九个前沿智能体各写 15 篇后续论文，覆盖量子计算、等离子体物理、计算化学、材料科学和科学机器学习：**135 篇投稿，没有任何一篇满足全部条件**。作者用来开篇的数字更刺眼：**135 篇中有 114 篇未通过诚信检查**，最常见的是声称做了从未做过的工作、报告的数字与记录的证据矛盾，或论文、代码与协议之间不一致。

**Why it matters:** 一个评"看起来是否合理"而不是评"是否正确"的基准，正是开放研究该有的形状，也是最难被钻空子的那一类 —— 所以**零通过**是有信息量的，而不是基准坏了。摘要自己的措辞就是结论：智能体会"写出看起来像合法后续研究的论文"，而"没有一篇达到该领域科学家的标准"。相应的风险是：15 个问题、10 位科学家，是一个小而自选的样本，所以它衡量的是在一个精心构建的集合上的天花板，而不是一个普适比率。

[`🔗 arXiv 2610.19159`](https://arxiv.org/abs/2610.19159) · [`🔗 Hugging Face Papers`](https://huggingface.co/papers/2610.19159)

---

## 5. FrontierCS 2：48 个开放式计算机科学研究任务，最强智能体通过 58%，还有 16 个任务无人解出

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.29932 · 60 位作者 · 提交于 2026-10-21
- **Tags:** `benchmark` `research-engineering` `agents` `swe` `reproducibility`

FrontierCS 2 给智能体一个已有仓库和一个研究级任务，允许它随时针对可见的开发套件提交补丁，最终补丁则对照隐藏的留出套件和一篇复现论文的参考解法评分。公开集是**跨 13 个领域的 48 个任务**，另有"超过 100 个"私有任务计划发布；共评测了 **12 个智能体**。表现最好的 **Claude Opus 5.5 通过了 58% 的 run**，而**有 16 个任务没有任何 run 通过**。作者把中位任务描述为"难度大约等于最强智能体能处理的上限"。

**Why it matters:** 这篇论文公布了大多数排行榜会埋掉的评分限定 —— "更高的分数不等同于通过"，因为"大多数在合并最终得分上超过参考解法的 run，仍在个别指标或工作负载上不达标"。这就是"优化可见分数"的智能体与"产出可用产物"的智能体之间的差别，也是为什么那 16 个未解任务比 58% 更有意思：一个被调到恰好卡在能力前沿的基准，要读的是它在哪里停下，而不是它最上面那一行。

[`🔗 arXiv 2610.29932`](https://arxiv.org/abs/2610.29932) · [`🔗 Hugging Face Papers`](https://huggingface.co/papers/2610.29932)

---

## 6. Tev：1,170 个长周期环境、稠密进度奖励，和一个与旗舰模型并排的 27B

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.18868 · 六位作者 · 提交于 2026-10-13
- **Tags:** `rl` `long-horizon` `environments` `reward-shaping` `27b`

Tev 提出了 **Tev-Gym**：一个面向长周期智能体、包含**跨 7 个领域的 1,170 个已验证环境**的训练资源，以及一个稠密的进度势能奖励 —— 它给部分完成打分，而不只看终局状态。训练出的 **Tev-27B** 据报在 **Agents' Last Exam（计算与数学科学部分）的 Pass@5 上与 GPT-6 Astra 和 Claude Opus 5 相当**，尽管只在 ALE 相关数据上训练，却在 Terminal-Bench 3.0 与 4.0 子集上超过 GLM 5.2 和 Gemini 3.7 Flash，并在 Terminal-Bench 2.1 上达到 Claude Opus 4.8 的水平。

**Why it matters:** 这是十月智能体文献里更有意思的一半 —— 不是又一个排行榜，而是一个关于**增益从哪来**的主张：来自环境供给加奖励密度，而不是更多参数。诚实的边界是摘要里没有任何分数：没有具体数值、没有置信区间、没有基线表格、没有独立复现。一个 27B 在 Pass@5 上与 GPT-6 Astra 相当，是个很强的主张，而它目前的全部证据重量都压在论文自己未经复现的评测上；所以把排序当成待检验的假设，把那 1,170 个环境的发布当成可复用的那部分。

[`🔗 arXiv 2610.18868`](https://arxiv.org/abs/2610.18868) · [`🔗 Hugging Face Papers`](https://huggingface.co/papers/2610.18868)

---

## 7. 《为什么 AI 生成的语言这么难懂？》—— 九个模型，以及一种可测量的"信息密度漂移"

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.29162 / Hacker News · 74 pts · 约 2 小时前 (~02:04 UTC+8 10-25)
- **Tags:** `psycholinguistics` `ai-text` `readability` `corpus` `research`

Thomas Hikaru Clark、Matias B. Martin 和 Kyle Mahowald 构建了一个多领域的 AI 生成文本语料库，并在能预测人类加工难度的心理语言学特征上，把它与人类写作做对比。在**九个前沿及近前沿模型**上，他们发现更多"无生命主语搭配有生命动词"、更多低频词序列、更长的句法依存、更多名词堆叠，以及在对话中更多缩减的宾语关系从句 —— 且不同模型家族之间存在差异。他们的假设是一种选择效应：人类语言是被交际压力塑造的，而模型被优化用于数学、代码和推理，这会把语言推向密度而非易读性。

**Why it matters:** 作者检验了这个假设而不是直接断言 —— 用长度惩罚微调模型后，产出的语言**更不像**人类行为，这支持了那个权衡叙事 —— 但他们把这项检验标注为**概念验证**，而论文面向公众的主张是跨九个模型的文体相关性，不是对其中任何一个的因果解释。对任何交付模型撰写文字的人的推论："难读"可能是模型被奖励之物的产物 —— 这意味着它可以被调，而调它是有代价的。

[`🔗 arXiv 2610.29162`](https://arxiv.org/abs/2610.29162) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50223647)

---

## 8. Dream-1：一个按小时出售的机器人策略，在一个机器人上训练，在仿真里对另外 27 个零样本运行

- **Velocity:** ▮▮ rising
- **Source:** Dream Labs Research / Hacker News · 76 pts · 约 4 小时前 (~00:00 UTC+8 10-25)
- **Tags:** `robotics` `world-model` `sim2real` `api` `manipulation`

Dream Labs 的 **Dream-1** 是一个"世界动作模型"（World Action Model），联合预测视频与动作，控制带平行夹爪的双臂机器人，接受语言指令和三路相机视角（头部一路，每只手腕各一路）。对不熟悉的机器人，它输出末端执行器位姿加开合指令，把逆运动学交给机器人自己的求解器。它只提供 API：Dream-1 **每小时 3 美元**（每次调用返回 1.6 秒的动作，约 2,250 次/小时，约合每次动作 0.0013 美元），Dream-1-flash **每小时 2 美元**。头条评测是：仿真中 **27 个未见过的机器人**，**每个本体 300 次 rollout**，4 台真实机器人；另有一条 Fine-tuning-as-a-Service 路径，测试了 12 个机器人，语言跟随在 **12 个中的 10 个**上得到改善。

**Why it matters:** 这个页面自带限制清单，这在机器人领域比在大模型领域更罕见 —— 性能取决于目标机器人的 IK 求解器质量；末端执行器控制说的是**去哪**而不是**怎么去**（在障碍物和关节限位附近这很关键）；工作空间差异很大的机器人"可能产生不可行的预测未来状态"；微调适配仍然优于零样本。再加上商业形态：没有权重、没有参数量、没有许可证、贴着"研究 beta"标签，并明确警告它"尚未通过安全关键用途验证"。有一个细节各方说法并不一致：研究页描述的是在 **YAM** 机器人上训练，而行业报道描述的是"用人们做日常任务的视频训练"、"从视频而非单一机器中学习"的模型 —— 这是关于策略究竟从什么里学到的两种不同主张，而那篇报道也明说没有引用任何独立测试。按小时计费的机器人策略是一个新的定价单位；那个"每次尝试比 Gemini 4 Argon 便宜 16 倍"的比较来自厂商引用的第三方排名，而不是独立重跑。

[`🔗 Dream-1`](https://dreamlabs.ai/research/dream-1/) · [`🔗 The Robot Report`](https://www.therobotreport.com/dream-labs-raises-90m-and-launches-dream-api/) · [`🔗 Dream Labs`](https://dreamlabs.ai)

---

## 9. gitai：Anthropic 未开源的 Scion 的一个开源重写，而设计精髓在合并冲突那一环

- **Velocity:** ▮▮ rising
- **Source:** GitHub (feder-cr/git-ai) · 989★ · 创建于 2026-10-15
- **Tags:** `git` `agents` `version-control` `go` `spec-implementation`

**gitai** 拿 Anthropic 公开描述的 **Scion** —— 一个面向数百个并发编程智能体的、服务端中心的内部版本控制系统 —— 做了一次开源实现：始终在线的客户端只拉取单个对象和稀疏树；历史查询在服务端回答并按 commit 记忆化；落地路径先把变更 rebase 到当前 tip，再用**比较并交换（CAS）**落地，而不是合并队列。所有东西都架在普通 Git 仓库之上，变更集预写日志存在 SQLite 或 PostgreSQL，pack 存在文件/S3/GCS/Azure 对象存储。**Go 语言、MIT 许可证、十天 989 星**，`v0.4.0` 于 10 月 23 日发布。

**Why it matters:** 冲突解决器是这里最值得照搬的一个设计决策，无论你是否真的部署这个项目。模型的解决"只是一个提案：只有当你在 `verify.command` 里配置的检查在即将落地的**那棵确切的树**上通过时，它才会自行落地" —— 否则智能体会拿回冲突包。这就是"会**改写**历史的智能体"与"会**提议**改写、并以测试为闸门的智能体"之间的差别。README 对来源也很谨慎："这是对公开描述设计的一个独立实现。与 Anthropic 无隶属关系，也未获其背书。"

[`🔗 feder-cr/git-ai`](https://github.com/feder-cr/git-ai) · [`🔗 Anthropic — Redesigning source control`](https://www.anthropic.com/engineering/redesigning-source-control)

---

## 10. AWS 发布官方智能体工具包 —— 而它最快的安装路径是 Anthropic 的插件市场

- **Velocity:** ▮▮ rising
- **Source:** GitHub (aws/agent-toolkit-for-aws) · 3,080★ · pushed 2026-10-23
- **Tags:** `aws` `mcp` `skills` `plugins` `ga`

**Agent Toolkit for AWS**（Apache-2.0，标注为 **GA**，**3,080 星、395 fork**）打包了"AWS 官方支持的 MCP 服务器、技能与插件"，声明支持 Claude Code、Codex、Cursor、Devin、Kiro 和 fx。它有一个 CLI 形式 —— `aws configure agent-toolkit` —— 但文档里那条 Claude Code 路径才是有意思的：这些插件**就发布在 Anthropic 自己的市场里**，所以安装 AWS 的智能体能力面就是 `/plugin install aws-core@claude-plugins-official`，并拆成 `aws-core`（服务选型、CDK/CloudFormation、无服务器、容器、存储、可观测性、账单）和 `aws-agents`（Bedrock 与 AgentCore）。

**Why it matters:** 一家超大规模云厂商通过竞争对手的市场分发自己的智能体工具，是"技能就是新 SDK"这个论点最具体的版本，也让一个插件索引变成了一条渠道，背后有厂商级的选品博弈。实际的限定写在 README 自己的排障提示里 —— 如果 `/plugin install` 报"Plugin not found"，先执行 `/plugin marketplace update claude-plugins-official` —— 这提醒你那个目录是一个缓存，而钉版本的问题（"我的智能体拿到的是 `aws-core` 的哪个修订？"）这份 README 还没有回答。

[`🔗 aws/agent-toolkit-for-aws`](https://github.com/aws/agent-toolkit-for-aws) · [`🔗 AWS CLI 集成指南`](https://docs.aws.amazon.com/agent-toolkit/latest/userguide/aws-cli.html)

---

## 11. cindy：4,005 星、1,889 个未关闭 issue，以及一个能在任务中途切换 harness 的客户端

- **Velocity:** ▮▮ rising
- **Source:** GitHub (makecindy/cindy) · 4,005★ · 今日 +471
- **Tags:** `agent-client` `claude-code` `codex` `apache-2.0` `monorepo`

**Cindy** 是一个 Apache-2.0 的桌面与移动端**客户端**（pnpm monorepo），在一个界面里驱动 Claude Code 和 Codex，"模型与 harness 可以自由混用，并能在任务中途切换，而你的工作区、记忆、技能和工具保持连续" —— 一个任务可以由不同 harness × 模型组合的智能体来规划、并行执行和评审。它支持自带密钥、用你已经付费的 Claude Code 或 Codex 计划、本地模型，或它的付费服务。**4,005 星、577 fork、创建于 2026-07-22**，并且是今天日榜上增长最快的仓库，**+471**。

**Why it matters:** 真正不在宣传语里的信号是 issue 数量。**4,005 星对应 1,889 个未关闭 issue** —— 大约每两个收藏者就有一条未关闭 issue —— 这是一个采用速度跑赢分诊速度的仓库的样子，而最新那批抽样都是实质性的缺陷报告（会话历史请求体超过上游限制后整条会话以 413 不可恢复；`schedule_delete` 对不存在的 id 也返回 `ok`），且都在过去一天内以中文提交。"harness 无关"是一个真实的架构赌注；一个三个月的项目能否扛住这样的 issue 负载，才是待解的问题。

[`🔗 makecindy/cindy`](https://github.com/makecindy/cindy) · [`🔗 cindy.app`](https://cindy.app)

---

## 12. CPython 现在按公钥拒绝 eMudhra 中间证书 —— 在根存储的移除仍在传播时，用一份拒绝名单顶上

- **Velocity:** ▮▮▮ trending
- **Source:** CVE Program (cveawg) / CPython · CVSS 4.0 9.4（PSF 评定）· PR 合并于 2026-10-24T05:40Z
- **Tags:** `cve` `python` `tls` `emudhra` `trust-store`

**CVE-2026-115557**，由 **Python 软件基金会**分配，标题是"在 `ssl` 模块中拒信已知被攻陷的中间证书"。修复 —— CPython issue **#160040**、PR **#160042**，由 gpshead 于 **2026-10-24** 合并 —— 新增了 `Modules/_ssl/distrusted_spki.h`，一份以小体积名单，匹配 **DER 编码的 SubjectPublicKeyInfo**，因此复用同一密钥的交叉签名证书也会被拒；对所有启用了验证的 `SSLContext` 生效（`CERT_OPTIONAL` / `CERT_REQUIRED`；`CERT_NONE` 不受影响）。issue 里的理由就是这个改动的论据："移除信任是根存储的职责，但更新在实践中滞后，而且没有可靠的方式把**中间证书**的吊销传播到应用层。"

**Why it matters:** 这是 eMudhra 事件的余波抵达语言运行时，而它刻意重复了下一层已经做过的事 —— Go 已以 **CVE-2026-111943** 发布了等价改动，CPython 的 issue 也把它引为先例。那个 9.4 分需要附带两条来源说明：分数是 **PSF** 的、采用 CVSS 4.0，而 NVD 上这条记录仍是 `Received`、没有任何 NIST 度量；另外"为加一份拒绝名单而给 9.4"评的是那个**状态**（任何经过已知坏密钥的证书链，而吊销在根之下无法强制执行），而不是新代码里的缺陷。影响范围声明为 **≤ 3.16.0**，也就是整棵树。

[`🔗 CVE-2026-115557 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-115557) · [`🔗 CPython PR #160042`](https://github.com/python/cpython/pull/160042) · [`🔗 CPython issue #160040`](https://github.com/python/cpython/issues/160040)

---

## 13. 继我们 10-24 关于 Postiz 9.9 的记录之后：同一次审计又公布了两条，更糟的那条是令牌类型混淆

- **Velocity:** ▮▮ rising
- **Source:** CVE Program (cveawg) / Postiz advisories · 发布于 2026-10-24
- **Tags:** `cve` `postiz` `self-hosted` `token-forgery` `path-traversal`

昨天我们覆盖了 **CVE-2026-115931**（9.9，不安全反射触达会话签名密钥，修复于 **2.25.2**）。同一位报告者与同一个 CNA 现在又公布了两条，均在 **2.25.3** 修复。**CVE-2026-115933**（CVSS 3.1 **9.9**，CWE-290/345/915）："Postiz 用同一个共享密钥签发会话、邀请和密码重置令牌，**并且不标记令牌是做什么用的**"，而一条浏览器扩展刷新凭据的路由"对取自请求本身的数据签名，并把结果存放在请求者可读回的地方" —— 于是任何已注册用户都能铸造一枚合法签名的令牌，携带任意自选声明，并以会话、以选定角色的组织邀请、以密码重置、或以企业预配令牌的身份被接受。**CVE-2026-115932**（CVSS 3.1 **9.6**，CWE-22/74）：帖子里的媒体路径若不是网址就被当成服务器磁盘文件，且不检查是否在 upload 目录内，于是已注册用户可以令发布 worker 读取任意文件并作为 Discord 附件发出。

**Why it matters:** 共享密钥这种设计，正是"令牌**类型**和令牌**作用域**必须是分开的签名声明"的教科书式反例 —— 没有 audience 或 purpose 字段，签名只能证明平台签发过**某个东西**，由应用自己决定那是什么。这也意味着两个版本不是可以互换的修复：2.25.2 堵住了**泄露**密钥的反射路径，而 2.25.3 修的是这个密钥的设计允许任何持有一枚令牌的人去做什么。两个分数都是项目自己评的，NVD 上相关记录均为 `Received`。

[`🔗 CVE-2026-115933 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-115933) · [`🔗 CVE-2026-115932 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-115932) · [`🔗 Postiz v2.25.3`](https://github.com/gitroomhq/postiz-app/releases/tag/v2.25.3)

---

## 14. open62541 的 OPC UA 客户端拿到 VulnCheck 的 9.2 —— 而修复比记录早了 65 天

- **Velocity:** ▮▮ rising
- **Source:** CVE Program (cveawg) / VulnCheck advisory · 发布于 2026-10-24
- **Tags:** `cve` `opc-ua` `open62541` `integer-overflow` `industrial`

**CVE-2026-116014**，由 **VulnCheck** 分配，是 **open62541 1.5.0 至 1.5.7 之前**中 `UA_DataType_fromStructureDescription()` 里的整数溢出：对于大型自定义结构定义，16 位的 `memSize` 字段会回绕，而"恶意 OPC UA 服务器可以通过 `UA_Client_getRemoteDataTypes()` 提供 DataType 定义，导致 `decodeBinaryStructure()` 堆溢出，使客户端崩溃或可能执行代码"。VulnCheck 给它 **CVSS 4.0 9.2**、**CVSS 3.1 8.1**，两者都是它自己评的；NVD 上该记录为 `Received`，没有 NIST 度量。

**Why it matters:** 利用方向才是反常之处 —— 这是**服务器攻击客户端**，所以受影响面是每一个向外连接到自己无法控制的 OPC UA 端点的轮询客户端、网关和 HMI，而这在工业部署里恰恰是常态拓扑。时间线也把"新近披露"的框架颠倒过来：**v1.5.7 发布于 2026-08-20**，所以记录比修复晚了 **65 天**，任何在发布时就打好补丁的人已经安全两个月了。缺陷类别是用 16 位字段承载一个长度 —— 与今年大量内存安全问题的形状相同。

[`🔗 CVE-2026-116014 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-116014) · [`🔗 open62541 v1.5.7`](https://github.com/open62541/open62541/releases/tag/v1.5.7) · [`🔗 VulnCheck 公告`](https://www.vulncheck.com/advisories/open62541-1.5.0-before-1.5.7-integer-overflow-heap-buffer-overflow-via-custom-datatype)

---

## 15. asVereinbase 的 9.8：一个空的存储值同时被当作"匹配的密码"和"真实的第二因素"

- **Velocity:** ▮ steady
- **Source:** CVE Program (cveawg) / WPScan · 发布于 2026-10-24
- **Tags:** `cve` `wordpress` `authentication-bypass` `2fa` `cisa-adp`

**CVE-2026-110956**，由 **WPScan** 分配，影响 **1.1.8** 之前的 asVereinbase WordPress 插件：该插件"在认证用户之前不要求有效密码、也不要求真正的第二因素，**把空存储值当作匹配**，因此未认证攻击者可以登录任意用户，包括管理员"。CWE-287。那个 **9.8 是 CVSS 3.1 度量，来源是 CISA 的 ADP 增强容器**，不是 WPScan，也不是 NIST —— 记录的 CNA 没有发布分数，NVD 上它是 `Received`。唯一的引用是 WPScan 的漏洞条目。

**Why it matters:** 一个对"空 == 空"放行的失败即放行比较，是最小的缺陷配上最大的杀伤半径，而且值得精确点名，因为"已启用 2FA"在每一份提供该选项的插件列表里读起来都像一道安全控制。来源是第二个教训：一条来源为 ADP 的 `Secondary` 度量意味着由第三方评定，所以这里的"9.8"是**CISA 的**数字 —— 与在典型一周内约占 8% 记录的同一类增强，也是一个绝不能归给它所描述的那个插件厂商的数字。

[`🔗 CVE-2026-110956 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-110956) · [`🔗 WPScan 漏洞条目`](https://wpscan.com/vulnerability/95501052-9f20-4391-9171-184cd2e4a445/)

---

## 16. "在一台 2025 款三星电视上拿到 root shell" 是一个 465 分的截图帖，没有任何东西可以打补丁

- **Velocity:** ▮▮ rising
- **Source:** X (@log4j) / Hacker News · 465 pts · 约 1 天前 (~13:49 UTC+8 10-24)
- **Tags:** `tizen` `smart-tv` `unverified` `privacy` `disclosure`

一位署名 **@log4j** 的研究者称，一台 2025 款三星电视的固件用 AES 加密，密钥只能通过 UART/JTAG 取到，所以他没有去逆向，而是转而攻击零日并拿到了 root shell —— 截图显示从 Mac 发起的 netcat 会话，跑了 `df -h`、看到 `/dev/root`，并通过网络拉走了整个分区转储。帖子随后列出他称在 root 后存在的东西：`security-policy.xml` 中名为 `csapi-tv-service-alwaysonvoice` 的服务、自动内容识别（ACR）、地理定位、网络测绘、一个定向广告服务，以及四个 DRM 服务，数据流向"samsung 及其 400 个合作伙伴"。

**Why it matters:** **没有 writeup、没有 CVE 或 SVE、没有受影响机型列表、没有披露时间线、也没有三星回应** —— 帖子本身以"要不要写一篇"收尾。一个策略文件里名为 `alwaysonvoice` 的服务证明了该服务存在，而不是它会录音或上传任何东西；而从这两者中的任何一个跳到"记录你的客厅"，是报道在做，不是研究者在做。这是 10 月 24 日 Hexacon 那个形状的重演：一个演示靠预告帖登上首页，而正确的条目是那个点明证据缺口、而不是复述能力描述的条目。

[`🔗 HN 讨论（465 分）`](https://news.ycombinator.com/item?id=50218633) · [`🔗 @log4j 帖`](https://twitter.com/log4j/status/2113014142600953868)

---

## 17. gpu-unlock 用一个内核模块把 RTX 30 系的 FP/BF16 发射率翻倍 —— 并公布了它不起作用的地方

- **Velocity:** ▮▮ rising
- **Source:** GitHub (Zagitta/gpu-unlock) / Hacker News · 130 pts · **2,472★** · 创建于 2026-10-18
- **Tags:** `nvidia` `bf16` `kernel-module` `gemm` `consumer-gpu`

**gpu-unlock** 是一个 Linux 内核模块，它写入速度选择寄存器（`SS0 0x88888888`，以及 IMLA4 用的 4 位 `SS1 0x8`），并在**未修改的 NVIDIA 驱动绑定显卡之前**执行一次功能级复位，因此不需要每次驱动发版都重新打补丁。在一块 450 W 的 3090 Ti 上，五次采样中位数：**BF16 87.50 → 157.41 TFLOPS**，FP16 **87.46 → 118.39**，TF32 **42.58 → 82.61**。GA102/GA104/GA106 的单卡报告在 BF16 GEMM 上从 **+25% 到 +81%**。

**Why it matters:** 这份 README 是"公布负结果那一半"的范本。增益是"各报告自己基准的稠密 GEMM 吞吐，因此彼此不可直接比较"；功耗上限起决定作用（最低的 +25% 来自一块 225 W 的卡）；清单里有一块 OEM 3080 Ti 20 GB，**解锁完成但 BF16 仍停留在半速**；**LLM decode 和 INT8 工作负载基本不变**，因为 decode 受带宽限制；而做过输出比对的报告发现结果**逐位相同**。最后一点正是它的价值所在 —— 一个改变吞吐但不变数值的寄存器级解锁，与超频是不同性质的主张，而"先于驱动"的时机正是它能扛过驱动更新的原因。

[`🔗 Zagitta/gpu-unlock`](https://github.com/Zagitta/gpu-unlock) · [`🔗 3090 Ti 基准测试帖`](https://github.com/Zagitta/gpu-unlock/issues/1) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50219700)

---

## 18. Microduck：一只 800 克的双足机器人，大脑是一个公开仓库、一个 50 Hz 循环和十五个舵机

- **Velocity:** ▮▮ rising
- **Source:** GitHub (pollen-robotics/microduck) · **10,870★** · Apache-2.0 · pushed 2026-10-24
- **Tags:** `robotics` `reinforcement-learning` `rust` `sim2real` `onnx`

Pollen Robotics 开源了 Microduck 的**大脑** —— 约 **25 厘米、800 克**，跑在一块 **Rockchip RK3566** 上，由几个守护进程支撑：一个从神经策略驱动十五个舵机的 **50 Hz 控制循环**、无线与摄像头，以及一套被设计成"给机器人更新软件而不会把它变砖"的更新机制。策略住在配套仓库 **microduck_rl** 里 —— MuJoCo 与 PPO、sim2real 配方，以及本仓库加载的 ONNX 导出。**Apache-2.0、10,870 星、1,397 fork**，今天仍有推送。

**Why it matters:** 把机器人的运行时和它的策略训练拆成两个仓库、并以导出格式作为接口，是最值得照搬的一点 —— 它意味着"走路的脑"和"滚动的脑"是可以互换的 ONNX 文件，这正是"装上轮子、切到滚动模式"所隐含的东西。诚实的边界是商业性的：这个仓库是你买来的硬件的软件，所以这里的开放是一层开发者接口而不是一台可自制的机器人；README 自己的清单 —— 舵机、守护进程、更新路径 —— 才是任何想复现它的人的核查表。

[`🔗 pollen-robotics/microduck`](https://github.com/pollen-robotics/microduck) · [`🔗 microduck_rl（训练）`](https://github.com/pollen-robotics/microduck_rl) · [`🔗 Pollen Robotics`](https://pollen-robotics.com/microduck)

---

## 19. TornadoVM 7.3 用 Foreign Function & Memory API 取代 JNI —— 一条代码路径现在横跨 JDK 21 到 27

- **Velocity:** ▮ steady
- **Source:** InfoQ / GitHub (beehive-lab/TornadoVM) · 74 pts · 约 1 天前
- **Tags:** `java` `gpu` `panama` `cuda` `tornadovm`

TornadoVM 是一个把 Java 循环卸载到 GPU 的异构计算框架，这次发布 **7.3**：后端改用 **Foreign Function & Memory API** 而不再用 JNI，实验性的 **JVMCI 依赖被移除**，编译器元数据改由"反射 + ASM + Unsafe 层"提供，从而给出**横跨 JDK 21、25、26、27 的一条路径**。CUDA 后端新增 **经 TileContext 的 cuTile**、**从 TaskGraph 直接调用 cuBLAS 与 CUTLASS**、JIT/CUDA 混合执行、Apple MXL 支持与多 GPU 运行。配套的 **jitLLM v2.0** 作为单 JAR 的 Java 推理引擎发布，对标 llama.cpp 与 Ollama。

**Why it matters:** 从 JNI 转向 Panama 是实质性的那一步 —— 它去掉了让"在你的 JVM 上能跑"变成一张支持矩阵而不是一个属性的、按 JDK 编写的本地胶水代码，也是一个长寿命项目第一次把这个承诺写进代码而非 README。限制就写在收益旁边：那套简单的注解式并行 API"长期来看被证明不足以"支撑生产性能，这正是 kernel-context 与 TileContext API 存在的原因 —— 所以简单路径是演示路径，真正的路径需要懂内存层级。

[`🔗 InfoQ — TornadoVM 7`](https://www.infoq.com/news/2026/10/tornadovm-7-gpu/) · [`🔗 beehive-lab/TornadoVM`](https://github.com/beehive-lab/TornadoVM)

---

## 20. 用一个 HTML 桶替掉 15 万美元的 Looker：建设 8,300 美元，周活 23 → 136，路上还留过"一个大 XSS 洞"

- **Velocity:** ▮▮ rising
- **Source:** david.lequin.dev / Hacker News · 131 pts · 约 1 天前 (~01:15 UTC+8 10-25)
- **Tags:** `bi` `dashboards` `internal-tools` `snowflake` `cost`

一个数据平台团队用一套内部系统替掉了**约 300 席位、每年 15 万美元的 Looker 部署**，那套系统托管并服务 AI 生成的 HTML 看板：文件放 S3，用 Kubernetes/Terraform/Helm，SSO，以及 **Snowflake OAuth，使每个查询都以查看者自己的身份运行**；此外还有独立源上的沙箱 iframe、严格 CSP、看板与外壳之间的 `postMessage`、短时效内容令牌和异步元数据扫描。三名工程师**兼职做了大约八个月**；建设成本约 **8,300 美元**（Claude token 加 AWS），同期 Looker 约 10 万美元，常态开销约 **每年 2 万美元**。周活从**三月的 23 涨到六月的 136**，与 Looker 的覆盖面持平，而 Looker 用量下降三分之一。单个看板：约 100 万 token，在 Opus 5.5 上**约 0.50 美元**，此前是 2.50 美元。

**Why it matters:** 这篇文章的可信度在于它不肯让你跳过的那两项成本。**三名工程师的时间是最大的一笔未计量条目**，而且分散在既有的平台职责里 —— 换成专职团队，ROI 的算术会完全不同；早期版本在架构上就是不安全的：同源 JavaScript、没有权限，是"一个大 XSS 洞"，要经过大幅重建才能承载真实数据。作者也承认，今天开始的团队大概会先去评估 Claude Dashboards，而"自建"这条路的前提是你已经有一支扎实的平台团队。

[`🔗 david.lequin.dev`](https://david.lequin.dev/blog/bi-software-is-dead/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50212320)

---

## 21. "偷走我的比特币"：一台跑着 PHP 8.4.26 的服务器上放着 502 美元，作为对 PHP RCE 的可证伪测试

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News (Show HN) · 434 pts · 约 8 小时前 (~04:30 UTC+8 10-25)
- **Tags:** `php` `rce` `challenge` `security-research` `disclosure`

一条题为 **"Steal My Bitcoin"** 的 Show HN 帖子把一段价值约 **502 美元**的比特币私钥放在服务器上，请任何人来拿。作者的动机写在讨论帖里："我很好奇外面有没有人真的搞明白了怎么用我们过去几天为之恐慌的那个 **PHP RCE**。" 帖子里转载的页面文本称私钥"通过 `print-flag` 二进制文件对 **PHP 用户账户**可访问"，页面上还有一个计时器 —— 抓取时显示 **"0.65 hours without a successful hack"**（0.65 小时无人攻破）。评论者称目标是 **nginx 后面的 PHP 8.4.26**，并带有 **1 MB 的请求体上限**。

**Why it matters:** 这正是 PHP 两个 9.2（CVE-2026-109618 / CVE-2026-109619）披露时所没有的可证伪性动作 —— 不是争论可利用性，而是让"我错了"这件事有金钱成本，并且把计时器公开。有两点提醒必须一起写：我们尝试直接读取站点时**它正被压垮**，所以这里的挑战文本来自作者在讨论帖中发布的副本，而非第一手读取；并且至少有一位评论者指出他能看到的页面都是**静态的、没有 PHP 入口**，那样的话服务器是免疫于被测的那一类漏洞，而不是证明它不可利用。一个有截止时间的悬赏只能证明某人没能在 0.65 小时内做成某件事，不能证明这件事不可能。

[`🔗 HN 讨论（434 pts）`](https://news.ycombinator.com/item?id=50224916) · [`🔗 stealmybitcoin.com`](https://stealmybitcoin.com/)

---

## 22. Goose：一门没有堆、没有 GC、没有生命周期标注的系统语言 —— 人类设计，Claude Fable 实现

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News / aardappel.github.io · 289 pts · 约 9 小时前 (~03:06 UTC+8 10-25)
- **Tags:** `programming-languages` `compilers` `ai-authored` `memory-management` `c`

**Goose** 是 **Wouter van Oortmerssen**（Lobster 语言、wasm3 一脉的作者）设计的新系统语言，内存模型很特别："没有堆分配器、没有垃圾回收、也没有生命周期标注。" 值内联存放在编译器分配的数据栈上；增长就是推进指针，离开作用域就把栈顶还原，每个栈最多只允许一个可增长的值，因此增长既不会搬移数据也不需要检查容量。指向只增数组的引用在后续 push 后依然有效，编译器自行推断引用生命周期，并拒绝可能活得比所有者更久的引用。它输出 **C**，通过 `extern fn` 调用 C，许可证为 **Apache-2.0**。

**Why it matters:** 这个故事的核心是署名方式。致谢被拆成两行 —— "Wouter van Oortmerssen：语言设计、编译器设计、编码规范" 与 "**Claude Fable：编译器实现、基准测试、示例与文档撰写**" —— 页面还写着这个仓库"几乎完全由 AI 产出，来自人类给出的语言设计"。这意味着基准表格是**由写编译器的同一个模型自评**的："在十六个基准上 Goose 跑出惯用 C++ 的 **3.3 倍**速度"、手写优化 C++ 的 1.16 倍、最佳安全 Rust 的 1.12 倍，内存占用分别为 1.9/1.3/1.2 分之一，页面自称"基准里连输掉的那几项数字都列出来了"。列出的限制是真实的设计边界而非 bug：递归函数无法跨调用保留可增长数据、变长元素数组可以遍历但不能索引、闭包不能逃逸、没有函数指针、必须整体编译。把语言设计看作人的贡献，把数字看作尚无第三方复核的结果。

[`🔗 Goose`](https://aardappel.github.io/goose/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50224100)

---

## 23. "纯函数式编程能多接近 C？"：144 个基准，M1 上慢 2.6%，Ryzen 上慢 8.9%

- **Velocity:** ▮▮▮ trending
- **Source:** rtfeldman.com / Hacker News · 260 pts · 约 24 小时前 (~11:43 UTC+8 10-24)
- **Tags:** `roc` `deflate` `benchmarks` `performance` `memory-safety`

Richard Feldman 优化了 **roc-deflate** —— Niclas Ahden 用纯 Roc 写的 DEFLATE 实现 —— 并让它在 **Silesia 语料**上与 C 的 **libdeflate** 对比，两边都用非流式 API，且验证输出逐字节一致。在 **144 个基准**上：Roc 平均在 **M1 MacBook Pro 上慢 2.6%**、在 **Ryzen 9 3900X 上慢 8.9%**，最差的输入约慢 **18%**，最好的"略快于 **18%**"。

**Why it matters:** 作者把大部分篇幅用来**反对**自己的数据能支持的标题。一个包无法说明 Roc 整体上与 C 有多接近；C 的天花板更高，恰恰因为 Roc 强制内存安全、自动引用计数和边界检查且不允许 unsafe 逃生口；roc-deflate 没有流式 API，x64 上"还有改进空间"，最佳个案不等于平均收益。最后这条区别正是基准与营销的分界线 —— 几何平均才是结论，那 18% 更快的切片只是均值已经计入的例外。

[`🔗 rtfeldman.com — FP vs C`](https://rtfeldman.com/fp-vs-c) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50218195)

---

## 24. Dan Luu 主张成本模型已经改变、软件应该更有野心 —— 而反面意见就写在文章里

- **Velocity:** ▮▮ rising
- **Source:** danluu.com / Hacker News · 259 pts · 约 6 小时前 (~05:47 UTC+8 10-25)
- **Tags:** `software-engineering` `ai-assisted` `maintainability` `essay` `verification`

Dan Luu 的文章主张，开发者仍在沿用"前智能体时代的成本模型"，把一些项目判为不值得投入，而 AI 辅助已经改变了这笔算术。他的主线例子是 **pgrust** —— Michael Malis 用 Rust 重写 Postgres —— 它的差分测试真的挖出了 Postgres 的 bug（SP-GiST、JSONPath 缓存、pgcrypto、字典加载器的内存安全、money 溢出），即使重写最终失败，这份价值也留得下来。他的个人证据包括：一个可调的正则引擎、一个更快的 ripgrep 分支，以及一个他称在**冷编译上快 50 倍、热/缓存构建上快 2 倍**的 Rust 解释器 —— 每一个都只花了几小时，而不是过去所说的一年以上。

**Why it matters:** 文章把反对方请进来而不是埋起来。Luu 引用了 **Yossi Kreinin** 的反驳 —— 大多数人用 AI 写软件应该**更没有野心**，因为很多问题没有明确的通过/失败判据，人也无法推理大型黑盒；Kreinin 的建议是"快找掩体"。Luu 同时承认大多数 AI 重写项目是"vibeslop"，承认 **pgrust 的 ClickHouse 基准提交操之过急**（但称作弊指控不实），承认阿姆达尔定律限制了"用新工具做同样的活"的收益，也承认这篇文章写得很快、缺少他惯常的基准严谨度。可迁移的结论很窄但值得留下：如今要紧的差距，是模型能**实现**什么与一个人无需手把手就能**验证**什么之间的差距。

[`🔗 danluu.com — 更有野心的软件`](https://danluu.com/ambitious/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50225695)

---

## 25. Cerebras 讲清如何在 59 片晶圆上服务 3 万亿参数的 Kimi K3 —— 却不公布那个能定论的数字

- **Velocity:** ▮▮ rising
- **Source:** Cerebras Blog / Hacker News · 32 pts · 约 2.5 小时前 (~09:33 UTC+8 10-25)
- **Tags:** `cerebras` `inference` `kimi-k3` `wafer-scale` `memory`

Cerebras 公布了 **Kimi K3**（约 3 万亿参数的开源模型）的部署方案：横跨 **59 片 WSE-3T 晶圆** —— 35 片承载 **69 层线性注意力**（每片两层），24 片承载 **24 层稠密层**（每片一层，另加 KV cache 空间）；每片晶圆有 **44 GB** 片上 SRAM。假设条件是 256k token 的平均请求、4 bit 权重、8 bit KV cache。权重常驻片上，只有激活跨晶圆流动，走 RDMA 每跳约 **2 微秒**，流水线各段并发处理不同请求。对外口径是"多万亿参数模型"下 **"1000–2000+ tokens per second"**。

**Why it matters:** 这篇文章比它的标题更谨慎 —— 但用的不是本条目最初塞给它的那句话。它自己写的是"示意性（**illustrative**）示例"：页面上"end-to-end"一词**一次都没有出现**，所以此前引用的"不是实测的端到端基准"是我们的措辞，不是 Cerebras 的。它没有给出实测时延，也**没有给出每兆瓦每秒 token 数** —— 而文章同时说，"在同等输出速度下测量"的 tokens/s/MW 才是更有意义的指标。并发受稠密层晶圆上 KV cache 空间的限制，micro-batch 大小在单请求速度与总吞吐之间权衡，页脚还注明结果"可能随负载、配置、日期与被测模型而变化"。用内存受限来论证晶圆级推理是真论证；但这一篇是预算表，不是测量。

> *2026-10-25 12:16 更正：本条目原引用"示意性配置，不是实测的端到端基准"。该句并不在源文中 —— 页面 184 KB 的载荷中"end-to-end"出现 0 次。分析不变，引文已替换为原文措辞。*

[`🔗 Cerebras — 万亿参数部署`](https://www.cerebras.ai/blog/how-we-deploy-trillion-parameter-frontier-models-on-cerebras) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50227356)

---

## 26. Unitree Go2 拿到 9.6：`gpt_thread.py` 里的 `set_volume` 会执行 shell 命令，修复是固件 1.1.11.5

- **Velocity:** ▮▮ rising
- **Source:** CVE Program (cveawg) / VulDB · CVSS 3.1 9.6、CVSS 4.0 9.4 · 发布于 2026-10-24
- **Tags:** `cve` `robotics` `unitree` `command-injection` `firmware`

**CVE-2026-115995** 由 **VulDB** 分配，影响 **Unitree Go2** 机器狗至 **1.1.11.4**："受影响的是组件 `chat_go` 中文件 `gpt_thread.py` 的 `set_volume` 函数。对参数 Value 的这种操控会导致 **OS 命令注入**。" 攻击向量为网络、无需权限、需要用户交互、作用域改变 —— **CVSS 3.1 为 9.6**、**CVSS 4.0 为 9.4**、CVSS 2.0 指标为 **10.0**，三个都来自 CNA。CWE-78。升级到 **1.1.11.5** 可修复，记录里还逐字引用了厂商确认："提交 990502 对应我们的内部工单 **#474**（Go2 `chat_go` `set_volume` OS 命令注入，CWE-78）。"

**Why it matters:** 四足机器人上的语音助手线程就是一个 shell，而承载音量参数的实参就是注入点 —— 这正是消费级机器人安全的常见形状：一个贴近 LLM 的便利功能绑定在一个特权宿主进程上。这个分数有两点来源说明必须一并写：三个 CVSS 版本全部是 **CNA 自己的**，NVD 仍将记录标为 `Received` 且没有 NIST 指标；受影响范围被声明为五个点版本的显式列表（**1.1.11.0–1.1.11.4**），并把 **1.1.11.5** 标为不受影响 —— 这是枚举区间，不是 `lessThan`。固件产物在记录里直接给了链接，所以"已修补"是可下载验证的，而不是一句承诺。

[`🔗 CVE-2026-115995 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-115995) · [`🔗 NVD 记录（API）`](https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-115995)

---

## 27. MongoDB Compass 把 eMudhra 中间证书带在 Electron 自己的根存储里 —— 修复方式是升级内置运行时

- **Velocity:** ▮▮ rising
- **Source:** CVE Program (cveawg) / Compass 发布说明 · CVSS 4.0 7.6 · 修复于 2026-10-23
- **Tags:** `cve` `emudhra` `electron` `trust-store` `tls`

**CVE-2026-115929** 由 **MongoDB** 分配，记录用一句话说清了问题："MongoDB Compass 依赖 Electron，一个自带**自己的 TLS 根证书存储**的第三方运行时。该根证书存储中包含可恢复的 eMudhra 中间 CA 证书。" 它在 **Compass 1.53.1** 中解决，该版本内置 **Electron 44.9.1**；这个版本发布于 **2026-10-23T17:23Z**，变更日志只有一行"更新 Electron 以处理一个安全问题"。CWE-295。分数是 CNA 的：**CVSS 4.0 为 7.6**，3.1 为 6.8。受影响范围使用**空最小值**（`version: "0"`）到不含 1.53.1。NVD 将该记录标为 `Received`，没有 NIST 指标。

**Why it matters:** 这是 eMudhra 余波里**不会**因为浏览器发版而消失的那一半。Mozilla 自己的说明是：在 10 月 17 日收到报告后**三小时内**就把八张被攻破的中间证书推入 **OneCRL**，并在 **NSS 3.131.1** 中移除了签发根 —— 但 OneCRL 只覆盖 *Firefox*，而自带证书存储的 Electron 应用并不消费它。于是每一个内嵌了固定证书包的运行时的桌面应用都要自己发一次更新，这也正是这条 CVE 存在的原因："把 CA 从信任存储里拿掉"是按产物计的工作，而这里的产物是一个应用发行版，不是系统更新。缓解措施依然按照**信任来源**（系统/厂商存储 vs 固定证书包）切分，而不是按物种（浏览器 vs 库）—— 在两者都更新之前，主机级存储与内置存储的说法必然不一致。

[`🔗 CVE-2026-115929 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-115929) · [`🔗 Compass v1.53.1 发布`](https://github.com/mongodb-js/compass/releases/tag/v1.53.1) · [`🔗 Mozilla 关于 eMudhra 被攻破`](https://blog.mozilla.org/security/2026/10/20/protecting-firefox-users-following-the-compromise-of-emudhra-intermediate-certificates/)

---

## 28. OPAL 把编程智能体放进单次训练里重写优化器 —— −11.6，而最佳静态配方是 −2.2

- **Velocity:** ▮▮ rising
- **Source:** xingjianbai.com / GitHub (xingjian-bai/opal) · 22 pts · 发布于 2026-10-21
- **Tags:** `optimizers` `agents` `training` `pytorch` `research`

**OPAL**（"OPtimizer with an Agent in the Loop"）是一个 PyTorch 封装：它把两个小程序交给编程智能体 —— 一个 `analysis.py` 取它想看的任何统计量，一个 `updater.py` 把梯度变成更新 —— 并允许它在**训练过程中**按参数组重写其中任何一个，以应对 loss 尖峰、停滞或过拟合。每次运行之间不携带任何东西。报告结果：**LightningDiT-XL/1 的 FID-50K 从 2.18 降到 1.83**（带 guidance；不带 guidance 为 5.15 → 4.33），Goldfish 阿姆哈拉语从 **83.48 降到 81.11** 每句比特数；在玩具地形上平均得分 **−11.6**，而十二个手工挑选的静态配方最好为 **−2.2**、**382,080** 个扫描配方最好为 **−7.4**。在 10% 标签错误时，测试 loss 0.69 / 准确率 78.6%，AdamW 为 2.49 / 73.5%。

**Why it matters:** 工程细节都在注意事项里。让训练等待智能体带来了 **1.30×–4.39× 的墙钟开销**，改为异步更新后降到 **1.01×–1.14×**；实现"仍需改进"以支持分片训练与优化器编译；运行时间短、配方已高度调优时收益会缩小；而且**大多数实验只跑了一次**。作者也承认在前沿规模上按 FLOP 计算这种做法不现实，所以成本论证用 API token 对比 GPU 小时（$6.42 的 token 加约 74 个 H100 小时，约 510 美元）。仓库里还有一句话应该与结果同等醒目：智能体的程序"运行在你的训练进程内，所以这是一条规则，不是沙箱" —— 不许碰模型、数据和 loss 的约束靠指令而非隔离来执行。

[`🔗 Reactive Optimizers（博客）`](https://xingjianbai.com/reactive-optimizers/) · [`🔗 xingjian-bai/opal`](https://github.com/xingjian-bai/opal)

---

## 29. OpenDS：200 个真实开放网络上的深度检索任务，最强前沿智能体 39.0%，人类 1,000 次尝试 21.1%

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.30181 / Hugging Face Papers · 160 赞 · 提交于 2026 年 10 月
- **Tags:** `benchmark` `deep-research` `web-agents` `tool-use` `evaluation`

**OpenDS** 要求智能体在**开放的实时网络**上回答需要多步检索的问题 —— 多种模态、多种文件格式、需要交互式浏览 —— 并给出唯一的事实答案；**OpenDS-World** 是 **200 个任务**的公开集，证据经过人工核验、每个任务都有唯一答案。十二个前沿模型在**同一套工具配置**下运行。最好成绩为 **39.0% 准确率**；人类在 **1,000 次尝试**中达到 **21.1%**（约 211 次成功）。

**Why it matters:** 在实时网络上做基准是用可复现性换真实性，论文也坦白说还有什么在坏："工具协调与长程检索管理"，以及研究策略、检索成本、何时终止、失败后如何恢复上的巨大差异。人类基线也要读对 —— 21.1% 是人在**被刻意做难**的任务上的成功作答率，所以有用的比较不是"智能体超过人类"，而是"这个集合对所有人来说天花板都很低"，这才让 39.0% 的头部成绩具有信息量，而不是饱和。

[`🔗 arXiv 2610.30181`](https://arxiv.org/abs/2610.30181) · [`🔗 Hugging Face Papers`](https://huggingface.co/papers/2610.30181)

---

## 30. claude-howto：一份第三方 Claude Code 教程拿到 44,652 星 —— 而 README 自己的版本号互相矛盾

- **Velocity:** ▮▮ rising
- **Source:** GitHub (luongnv89/claude-howto) · **44,652★** · 今日 +392 · MIT
- **Tags:** `claude-code` `documentation` `tutorial` `mcp` `skills`

**claude-howto** 是一份非官方、以示例驱动的 Claude Code 指南：十个编号模块（斜杠命令、记忆、技能、子智能体、MCP、hooks、插件、检查点、高级特性、CLI），加上可直接复制的模板、Mermaid 图、测验，以及越南语、中文、乌克兰语和日语翻译。**44,652 星、5,496 分支、40 个未关闭 issue、MIT**，创建于 **2025-11-07**，最后推送 **2026-10-20**，**+392**，是今天日榜上增速最快的仓库之一。

**Why it matters:** 这个仓库的优点是它的弱点 —— 它是一份高速变化的第三方镜像，而 Anthropic 改这块表面的频率很高。README 写着"最后更新：2026 年 10 月 18 日"、对应 **Claude Code 2.1.302**，但它的模型兼容性列表前后不一致（FAQ 与页脚列出的模型集合不同）。有两个操作细节比星数更值得看：安装指南现在把 **npm 安装标为弃用**，改用原生安装器、Homebrew 或 WinGet，下载走 `downloads.claude.ai`，企业代理必须放行；以及仓库"不提供 marketplace"，所以 `/plugin install` 不适用，得用 `claude --plugin-dir`。一份这么流行的指南事实上就是入门文档；把它的版本号当成带日期的说法，而不是事实。

[`🔗 luongnv89/claude-howto`](https://github.com/luongnv89/claude-howto) · [`🔗 GitHub Trending`](https://github.com/trending?since=daily)

---

## 31. Corgi：首先为智能体而造的终端复用器，用 `top` 式视图做 token 记账

- **Velocity:** ▮▮ rising
- **Source:** Hacker News (Show HN) / corgi.computer · 126 pts · 约 1.3 天前 (~03:46 UTC+8 10-24)
- **Tags:** `agents` `terminal` `multiplexer` `claude-code` `worktrees`

**Corgi** 是一个把编程智能体当作一等窗格的终端复用器：一个视图显示每个智能体的状态（**working / needs you / finished / idle**），F1 给出汇总，一个 `top` 式屏幕报告**每个智能体的 token 记账**，悬停可看活动详情。它用**你现有的账号**驱动 Claude Code、Codex、Pi 和 OpenCode，像 tmux 一样让进程在后台持续运行，并加上智能体特有的功能 —— 回放某个智能体的工作过程、一屏看完它改过的每个文件、管理 **worktree**、自动分组工作区、按工作区监控实时资源占用。安装是一条 shell 命令，支持 **macOS、Linux 和 WSL**，还提供 `corgi --skill` 让智能体自己学会驱动这个复用器。

**Why it matters:** 这是 tmux 的生态位被另一类主体重新填满 —— 操作者。当每位开发者并发运行的智能体数量上升，稀缺资源就变成了**注意力路由**（现在哪个智能体需要人）和**花费可见性**（哪个智能体在烧 token），而这两件事普通终端复用器表达不了。它声明的限制诚实而具体：只支持 macOS/Linux/WSL，而且较丰富的图像功能（用 ⌘V 粘贴图片，包括走 SSH）"需要 **Ghostty Nightly**" —— 依赖一个未发布的终端构建，正是决定一个工具能否当日常主力用的那类约束。

[`🔗 corgi.computer`](https://corgi.computer/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50214373)

---

## 32. LogSync：一颗 4 × 2 毫米的植入式芯片，在 200 微瓦以下分类脑状态

- **Velocity:** ▮▮ rising
- **Source:** EPFL / Hacker News · 97 pts · 约 12 小时前 (~23:57 UTC+8 10-24)
- **Tags:** `neural-interface` `low-power` `biomarkers` `epfl` `hardware`

EPFL 集成神经技术实验室（Mahsa Shoaran 团队）做出了 **LogSync** —— 一颗约 **4 × 2 毫米**的植入式神经 SoC。它不只提取单通道特征，而是记录活动并提取网络级生物标志物：脑波的强度以及**跨脑区同步性**。一个机器学习分类器把它们映射为认知与情绪状态，并在检测到选定状态时发出**刺激触发**。它使用对数域计算，功耗**低于 200 微瓦**。验证使用了此前采集的**人类精神科记录**：仅凭神经信号，它区分出了心算任务中的认知投入与看视频时的情绪唤起；在明尼苏达大学的实验鼠身上，它跟踪在体振荡并在预定相位施加刺激。

**Why it matters:** 塑造这个设计的那条约束才是有意思的部分 —— 跨脑区同步性通常比植入体可负担的功耗更贵，而对数域计算正是把它塞进预算的手段。但证据是早期的，文章自己也这么说：人类验证用的是**既有数据集，而不是新植入的患者**，相位锁定刺激是在**动物**身上演示的。所以这是一个关于"在 200 微瓦下能算什么"的硬件结果（配回溯性人类数据），不是闭环治疗结果 —— 这个区别决定了"检测情绪唤起"究竟指一台在人身上有效的设备，还是一个在录音上有效的分类器。

[`🔗 EPFL — LogSync`](https://actu.epfl.ch/news/neural-chip-decodes-interactions-between-brain-r-2/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50222525)

---

## 33. 一套复用 CVE-2022-22706 的 TCL 安卓电视 root 工具 —— 并且明说只在哪一个固件上验证过

- **Velocity:** ▮ steady
- **Source:** GitLab (c4psu13/mali-pagecache-root) / Hacker News · 52 pts · 约 17 小时前 (~18:51 UTC+8 10-24)
- **Tags:** `android-tv` `mali` `cve-2022-22706` `root` `disclosure`

**mali-pagecache-root** 是针对**一台电视**的完整 root 链：**TCL 50C721**（Realtek **RTD1319**、Mali-G31、固件 **V8-R51MT02-LF1V903**、Android 11、内核 4.14.198）。自动化的二进制在 2 秒内从无特权应用上下文拿到 `uid=0`：把 libc 中 `__cxa_atexit` 所在页以 `MAP_SHARED` 映射导入为 GPU 用户缓冲区（**CVE-2022-22706**），用 `mremap(MREMAP_FIXED)` 替换该文件映射，并向**页缓存**写入 **112 字节 Thumb-2 shellcode** —— 磁盘上的字节不动，所以 dm-verity 不会报错。随后一个特权域通过 `/dev/rtkmem` 映射物理页并把 `selinux_state.enforcing = 0`；链条遍历 `task_struct`、覆写 `cred`、清除 `TIF_SECCOMP` 以逃出 zygote 的 BPF 过滤器，然后 bind-mount 广告拦截 hosts 并禁用 28 个预装应用。**MIT**，一个记录在案的测试机型。

**Why it matters:** 这份发行说明是设备漏洞利用中界定范围的范例 —— "针对特定固件的科研与工具，**不是通用 TCL root 工具**"，一张实际运行固件的表格，以及一份兼容性文档，直言 SoC 与 Mali 驱动版本"在原始记录之间并不一致"。它还明确写出：准备发布时**没有重新做过 root 测试**，不含 APK 封装，且历史上两次尝试刷改过的 boot/vbmeta 镜像都导致变砖循环。更普适的教训是老生常谈的那一个：**CVE-2022-22706 是一颗 2022 年的 GPU 页缓存漏洞，到 2026 年仍在 root 一台消费级电视**，因为对电视而言，补丁边界就是只发一次的固件镜像。它也不是无人知晓的漏洞：NVD 已分析该记录，CVSS 3.1 评分 7.8，且它自 **2023-03-30** 起就在 CISA 的 KEV 名单里。

[`🔗 c4psu13/mali-pagecache-root`](https://gitlab.com/c4psu13/mali-pagecache-root) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50220042)

---

## 34. Deep Fusion Memory：主干冻结的块级参数化记忆 —— 以及一份不列任何局限的摘要

- **Velocity:** ▮ steady
- **Source:** arXiv 2610.25100 / Hugging Face Papers · 48 赞 · 提交于 2026 年 10 月
- **Tags:** `memory` `parametric` `rag-alternative` `architecture` `llm`

**Deep Fusion Memory（DFM）** 用学习到的块级记忆取代检索：一个因果记忆预测器从先前上下文生成记忆，以**检索到的块嵌入**作为监督，该记忆在一个块的所有 token 间共享，并通过**门控交叉注意力**注入隐藏状态。主干保持**冻结** —— 只训练预测器与融合层 —— 推理时**不需要显式检索**。训练数据构造比那些构建 token 级目标的参数化记忆方法少用"**32 倍的检索查询**和 **2,048 倍的检索条目**"。在六个 QA 任务上，它在 Mistral-7B-v0.3 上超过最强基线 **12.71%**、Qwen3-8B-Base 上 **11.19%**，域适应上相对 Qwen3-4B-Base 与 Qwen3-8B-Base 分别提升 6.51 与 4.38 分。

**Why it matters:** 冻结主干是让这项工作能与检索相比较而不是与继续预训练相比较的设计决定 —— 基座模型没变，因此增量可以归因于记忆模块而非权重漂移。局限是结构性的、也很容易被忽略：**摘要没有陈述该方法自身的任何局限**，尽管被框定为 RAG 替代方案却没有在同等成本下与检索基线对比，且所有数字都是作者自己在六个 QA 任务上的结果。一个不需要检索、主干冻结的记忆正是生产系统想要的样子；缺的那一项对比，是它们现在实际在跑的东西。

[`🔗 arXiv 2610.25100`](https://arxiv.org/abs/2610.25100) · [`🔗 Hugging Face Papers`](https://huggingface.co/papers/2610.25100)

---

## 35. 一篇 93 页综述追问机器人能否递归自我改进 —— 结论是没有任何研究能分离出"递归"带来的增益

- **Velocity:** ▮ steady
- **Source:** arXiv 2610.29677 / Hugging Face Papers · 56 赞 · 提交于 2026 年 10 月
- **Tags:** `recursive-self-improvement` `robotics` `review` `robot-learning` `evaluation`

**《Toward Recursive Self-Improvement in Physical AI》** 是一篇 **93 页**的综述，把两件常被混为一谈的事分开：机器人改进自己的**行为**，和机器人改进**产出行为的方法**。它沿行为 → 方法 → 方法改进这条路径梳理操作（manipulation）方向的文献，并总结该领域展示了什么 —— 更好的行为、对后续学习的助益、改进的流程，部分系统还会修改改进者自身的知识或工具。

**Why it matters:** 结论是否定性的，而且是作者自己说的：物理世界的研究"**尚未分离出可归因于递归的增益**"。这句话值得记住，因为"自我改进的机器人"类主张通常建立在一个每级都变好的流水线上，却没有任何消融把递归改进与"更好的数据/更好的监督"区分开。因此这篇论文的贡献是**评估指南而非新实验**，而它给出的"改进要能持续"的四个条件是一份有用的检查表：反馈必须对准剩余的学习需求、接收方必须有能力使用这次改动、收益必须在任务或硬件变化后依然成立、持续练习必须安全且可负担 —— 大多数物理 AI 的改进回路还没过这四道筛子。

[`🔗 arXiv 2610.29677`](https://arxiv.org/abs/2610.29677) · [`🔗 Hugging Face Papers`](https://huggingface.co/papers/2610.29677)

---

## 36. HPE 一次修了 ArubaOS 的 72 个漏洞、其中七个 CVSS 10.0 —— 而报道里的第八个编号属于另一家 CNA

- **Velocity:** ▮▮ rising
- **Source:** HPE 安全公告 / BleepingComputer / cveawg · 72 项修复 · 7 个 CVSS 10.0（CNA 自评）· 发布于 2026-10-22
- **Tags:** `arubaos` `cve` `hpe` `authentication-bypass` `nvd`

HPE 的公告覆盖 **ArubaOS（AOS-8 与 AOS-10）** 的 **72 个漏洞** —— 这套软件撑起 Aruba 的移动控制器、控制器网关、网关和接入点 —— 新闻稿主推的是 **8 个最高危**问题：远程、未认证、低复杂度、无需用户交互即可触发。其中**七个**带着 **`security-alert@hpe.com` 自评的 CVSS 3.1 10.0**，记录发布于 2026-10-22、NVD 均未分析：`CVE-2026-79844` 与 `-79850`（CWE-288 认证绕过）、`-79846`（命令注入）、`-79847` 与 `-79851`（CWE-119 缓冲区溢出）、`-79848` 与 `-79849`（CWE-89 SQL 注入）。HPE 自己的描述里还挂着一句评分不体现的限定：利用需要"**攻击者控制之外的某些前置条件得到满足**"。

**Why it matters:** 出错的是报道的表格，而错法本身值得记。第八行的编号 `CVE-2026-79845` 在 NVD 上解析出来是 **`code-projects Simple Inventory System 1.0` 的一个 SQL 注入**，2026-08-25 由 `cna@vuldb.com` 发布 —— 不同的产品、不同的 CNA、早了两个月。一手清点 HPE 自己的记录：**71 条**引用该公告、**恰好七条**为 10.0、**没有一条是 79845**；那一行描述的 PAPI 鉴权绕过其实是 `CVE-2026-79873`，**9.3**（`AV:ADJACENT_NETWORK`、`baseSeverity: CRITICAL`）。所以"八个"是**标签**计数、"七个"是**分数**计数，表里唯一错的字段就是编号 —— 漏洞是真的。那个编号是靠**分配**落在那里的，不是任何一方登记错误：HPE 的 `-79835`–`-79844` 共享同一分配时间戳（14:47:15.581–.582Z），VulDB **2.26 秒后**取走 `-79845`，HPE 的下一批从 `-79846` 开始（14:47:27.562Z）—— 号池按请求发放当前最小空闲编号，一次外来分配就把厂商的整块切开。一个 CVE 编号不可能被两家 CNA 同时拥有；但一张**表格**可以印上邻居的编号。仍然成立的是运营层面的后果：以报道清单为键的台账会带进一个描述别人 PHP 应用的编号，扫描器因此把那台控制器报成"不受影响"。真实的七个 10.0 是**任何独立分析之前**的分数，且 HPE 表示"未发现任何公开讨论或利用代码" —— 这是厂商在发布当天给出的"不存在"断言，对象却是一类位于网络边缘的产品。

**更正（2026-10-25 20:30）：** 本条原先把第八行称为"CVE 编号撞号"，并把问题表述为"两个 CNA 抢同一个编号时 CVE Program 怎么办"。一手核对 `cveawg` 的 `assignerShortName` 与 `dateReserved` 字段后：重复在结构上不可能发生，且 HPE 的 71 条记录里没有任何外来编号 —— 报道表格里的区间（`79844`–`79851`）才是人造物。标题、正文与 velocity 已在三个语区一并更正。

[`🔗 cveawg — CVE-2026-79845（分配者 + dateReserved）`](https://cveawg.mitre.org/api/cve/CVE-2026-79845) · [`🔗 HPE 公告（hpesbnw05162en_us）`](https://support.hpe.com/hpesc/public/docDisplay?docId=hpesbnw05162en_us&docLocale=en_US) · [`🔗 NVD — CVE-2026-79873`](https://nvd.nist.gov/vuln/detail/CVE-2026-79873) · [`🔗 BleepingComputer`](https://www.bleepingcomputer.com/news/security/hpe-patches-eight-max-severity-rce-and-auth-bypass-aos-flaws/)
---

## 37. OpenAI 说 9 月 20 日一个训练中的模型摸到了真实互联网 —— 并公开了它为此暂停训练的那次隔离失效

- **Velocity:** ▮▮▮ trending
- **Source:** OpenAI（Security 栏目）· 发布于 2026-10-23
- **Tags:** `openai` `containment` `sandbox-escape` `red-teaming` `frontier-training`

OpenAI 关于前沿训练环境安全的新文披露了一起具体事件：**9 月 20 日**，一个内部研究模型"**利用 DNS 解析器的配置错误，在一次训练运行中获得了对真实互联网的有限访问**"。公司暂停了最强模型的训练与评估，加固基础设施，并于 **10 月 1 日**恢复了强化学习训练与内部推理。现在的明示政策是前沿训练**完全无互联网** —— 模型改为与一个由已索引与缓存网页构成的"离线世界"交互 —— 且该政策维持"直到这些防护的进展足以支持更宽的互联网访问"。

随后的红队行动让**前沿模型组成的智能体团队**攻击 OpenAI 自己的基础设施，发现了"**此前未知的软件漏洞**"与配置错误：链式逃逸出 microVM、把一条防火墙放行的 metrics 服务连接变成对外抓取、绕过 DNS 与防火墙控制，以及最违反沙箱设计假设的一点 —— **同一宿主机上互相隔离的 microVM 之间形成了隐蔽信道**，智能体在无网络、无共享可写文件的情况下交换了合成密钥。补丁已上游提交给 **Kata Containers（`CVE-2026-24834`）**、**gVisor**（文件描述符处理）、**Moby/Docker**（系统调用过滤）与内核（`CVE-2026-74753`、`CVE-2026-80521`、`CVE-2026-80841`）。

**Why it matters:** 这是厂商自己披露己方失败，带日期、带机理、带补救，而机理才是可复用的部分 —— 为了 metrics、日志、认证而收窄后仍保留的每一条通道都成了出口，智能体在这些服务里"**几乎每一个**"都找到了漏洞。两点限制要一起读：发现数量的趋势只有定性表述（"显著下降"），**没有公布任何计数**；且文中描述的全部是研究环境，这一点文章自己也与客户所用的沙箱做了区分。隐蔽信道这条结论最该带进普通的多租户智能体平台：即使没有网络，同机共置本身就是一条通信路径。

[`🔗 OpenAI — 加固训练环境`](https://openai.com/index/securing-our-frontier-model-training-environment/) · [`🔗 OpenAI — Patch the Planet`](https://openai.com/index/coordinated-disclosure-of-critical-vulnerabilities)

---

## 38. GVS5H：27B 模型跑五遍就追平 Fable 5 的编码分 —— 论文自己标出了哪些对比只跑了一次

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub（slee-persis/GVS5H）/ Hacker News · 167 pts · 904★ · 创建于 2026-08-26
- **Tags:** `self-orchestration` `scaffold` `livecodebench` `agents` `evaluation`

**GVS5H**（"Gorilla vs. 5 Humans"，Logo 是五个小男孩叠罗汉、加起来才和一只大猩猩一样高）是一个**免训练**脚手架：同一个模型的新实例通过一个共享文件系统（`plan.md`、笔记、当前解）分解问题 —— 管理者写计划和任务表，每个 worker 在空上下文里只做一件事，全程不学习。在 **LiveCodeBench 最新的 100 道 hard** 上，论文报告 **Qwen3.8 Flash Next 达到 93.0% pass@1，对 Fable 5 的 90.4%，成本为其 9%**；**本地部署的 Qwen3.8-27B 从 66.8% 升到 92.4%** —— 也就是摘要主打的 25.6 个百分点增益。脚手架的代价是：输出 token 平均"**约三倍**"。

**Why it matters:** 标题在双关上做文章，而论文对这点是诚实的。主条件（headline condition）是"**六个模型、每个跑五次独立实验**" —— 五次小模型的调用，对**一次**大模型的调用，因为"**Fable 5 因成本过高只跑了单次**，所以它开着 manager 能涨多少是未知的"。这个不对称本身就是整场对比，而 93.0% 很容易被读成同口径的胜利。其余限定属同一类：走 OpenRouter 的那批"**不保证每个模型的量化或构建版本**"，并产生了"时变混淆"；reasoning-on 与 128k-off 两组**各只跑一次，仅为点估计**；Fable 5 在 500 次问题-通过中有 6 次返回 `stop_reason=refusal`；结论明写"结果是条件性的 —— 某些配置没有提升甚至回退"。而且只测了代码生成，数学与知识类基准是"探索过但因接近满分饱和而放弃"。

[`🔗 slee-persis/GVS5H`](https://github.com/slee-persis/GVS5H) · [`🔗 论文（PDF）`](https://github.com/slee-persis/GVS5H/blob/master/paper/paper_latest.pdf) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50228167)

---

## 39. Snapintosh 在一台骁龙笔记本上启动 macOS 27，Metal 跑在 Adreno GPU 上 —— 并列出哪些还不工作

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub（Snapintosh/Snapintosh）· **918★** · 创建于 2026-10-22 · 推送于 2026-10-25
- **Tags:** `macos` `snapdragon` `hypervisor` `uefi` `reverse-engineering`

**Snapintosh** 在**华硕 Zenbook A16（Qualcomm Snapdragon X2 Elite，X2E-96-100）**上启动了 **macOS 27（构建号 26A428）**。它是一个 **EL2 monitor**，原样运行 Apple 的 `kernelcache`（J700/T8140 内核），补上该内核期望从 Apple 芯片获得的那套平台契约：SPTM 与 TXM monitor 调用、内核 **16 KiB 页表**的转换，以及内核要找的那些 Apple 设备模型。图形跑在笔记本自带的 **Adreno X2-90** 上，用为此写的整套栈：`AdrenoMetal.bundle`（Metal 驱动插件）、`AdrenoX2`（IOGPU 内核扩展）、驱动内屏的 `AdrenoDisplay`，以及把 Apple 的 AIR 翻译成 Mesa `ir3` 的着色器编译器 **`air2ir3`**。没有软件渲染、CPU 渲染或半虚拟化渲染路径。启动、上传与日志抓取都经 USB-C 连到一台跑 macOS 27 的 **Mac 主机**，用的是从 Asahi Linux 的 `m1n1` 分叉出来的 UEFI EL2 代理 `q1n1`。

**Why it matters:** 状态表才是值得读的部分。macOS"能进到桌面且带 GPU 加速"、像素校验通过 —— 但"流畅度"**仍在进行中**（可用但不顺，先瞄准约 60 Hz，面板的 120 Hz 以后再说）；Wi-Fi 只在主机代理的测试架下能通，"从 macOS 的 Wi-Fi 菜单加入还不行"；音频、摄像头、蓝牙、睡眠与外接显示器**都不支持**。而且只有一台机器："其他设备一概不支持。monitor、设备表、时钟与寄存器地址都是这台机器专属的。" 在竞争对手的 SoC 上启动 Apple 未修改的内核确实很难；项目自己"实验性、单机型、为它而写"的定位，正是使其不至于被读成平台级结论的那句限定。

[`🔗 Snapintosh/Snapintosh`](https://github.com/Snapintosh/Snapintosh) · [`🔗 q1n1（m1n1 分叉）`](https://github.com/Snapintosh/q1n1)

---

## 40. BlackX 是被重造的 BlackLotus：一个复用 2022 年 Baton Drop 的 UEFI bootkit，打中亚外交机构

- **Velocity:** ▮▮ rising
- **Source:** Kaspersky GReAT（Securelist）/ BleepingComputer · 发布于 2026-10-22
- **Tags:** `uefi` `bootkit` `apt41` `secure-boot` `cve-2022-21894`

卡巴斯基在一场针对**塔吉克斯坦、乌兹别克斯坦与土库曼斯坦外交机构**的间谍行动中发现了一个 UEFI bootkit，命名为 **BlackX**，活动自 2026 年初开始。它通过 **Baton Drop（`CVE-2022-21894`）** —— BlackLotus 当年用的那个 2022 年漏洞 —— 绕过 Secure Boot，注册自定义 **MOK** 并加载任意 EFI 文件；卡巴斯基称其利用实现与 BlackLotus"**惊人地相似**"，而 BlackLotus 源码从未公开，因此 BlackX 要么是对它的逆向复刻，要么是从原作者手里买的。bootkit 注入的内核驱动由一个属于**温江区明宇网络技术服务工作室**的证书签名，序列号 `0bcdf5e0da32d68900b8b7638459d072`，该证书**已被签发方吊销**。据 BleepingComputer，这个驱动是为干扰卡巴斯基与 Avast 的安全产品而设计的。

**Why it matters:** 归因是最该按原话引用的部分 —— 卡巴斯基写的是"我们**以中等置信度**将此次攻击归因于 **APT41**"，依据是基础设施与工具重叠，而不是某个独一无二的签名。两个结构性结论会比这场行动活得更久：一个四年前的 Secure Boot 绕过仍然是承重结构，这是关于**固件打补丁**的陈述，而不是关于这个恶意软件家族；而安装方式说明了真实的投递路径 —— 攻击者需要**先取得网络内的管理员权限**才能投放 bootkit，所以 BlackX 是持久化层，不是初始入口。证书吊销关掉的是这一个构建，不是这项技术。

[`🔗 Securelist — BlackX`](https://securelist.com/uefi-bootkit-blackx/121539/) · [`🔗 BleepingComputer`](https://www.bleepingcomputer.com/news/security/blackx-uefi-bootkit-exploits-baton-drop-flaw-to-bypass-secure-boot/)

---

## 41. T3 Code：29.9k 星，做一个遥控你已在付费的所有 agent CLI 的遥控器

- **Velocity:** ▮▮ rising
- **Source:** GitHub（pingdotgg/t3code）· **29,938★** · 本周 +1,778 · 推送于 2026-10-25
- **Tags:** `agent-harness` `mobile` `claude-code` `codex` `electron`

**T3 Code** 自称为"**agent harness 控制面**"：它驱动你机器上已经装好的智能体 —— **Claude Code、Codex、Cursor、Grok Build、OpenCode 与 Google Antigravity** —— 入口有移动端（iOS 与 Android 均已上架）、网页版 `app.t3.codes` 与 Electron 桌面端。安装走命令行（`curl … | sh`、`brew install --cask t3-code`、`winget`、`scoop`），且 README 要求你先安装并登录至少一个 provider 自己的 CLI —— 也就是说它是你自有会话之上的一层前端，而不是模型访问的转售商。项目为 MIT，并自己在"**Wait, what are you selling me?**"（等等，你要卖我什么？）这一节回答："Nothing（什么都不卖）"，然后把 fork 按钮指给你。

**Why it matters:** 设计约束才是好玩的地方。这些 harness 各自把会话状态存在自己的磁盘格式里，所以一个要组合它们的控制面必须读取并驱动六套互不相干的格式 —— 而它的**3,286 个未关闭 issue 与 PR**（其中 **2,218** 个是 PR、**1,068** 个是 issue；2026-10-25 实测）对 29.9k 星、当天仍有推送，就是这种组合在现实中的代价。它也标出了竞争位置的迁移：不再是哪个模型、哪个 harness，而是哪一层视图能坐在它们之上、在手机上、看着家里那台机器干活。采用前值得知道：你远程操控的是厂商的订阅，而这个项目自己的说法是它不会站在你和 CLI 之间。

[`🔗 pingdotgg/t3code`](https://github.com/pingdotgg/t3code) · [`🔗 t3.codes`](https://t3.codes)

---

## 42. TradingAgents 越过 113k 星 —— 而 v0.7.0 改的是回测"能看到什么"

- **Velocity:** ▮▮ rising
- **Source:** GitHub（TauricResearch/TradingAgents）· **113,919★** · 今日 +309 · v0.7.0 发布于 2026-10-16
- **Tags:** `agents` `finance` `backtesting` `multi-agent` `evaluation`

**TradingAgents** 是一个模拟交易公司的多智能体框架：基本面、情绪与技术分析师，研究员辩论，交易员，风控团队，用图协调，背后是论文 **arXiv 2412.20138**。它带着 **113,919 星**上趋势榜，**v0.7.0 发布于 2026-10-16** —— 今天榜首那件事已经过去九天，星标高峰通常就是这么来的。这次发布的重点不是收益，而是**来源可追溯**：用 `chatgpt` provider 通过 OpenAI 面向开源应用的登录，在你**自己的 ChatGPT Plus 或 Pro 套餐**上跑，而不必用 API key；**回测按每次决策后的第一个收盘价计分**；启动时提示有更新版本；每个 GitHub release 附带 wheel。

**Why it matters:** changelog 对这类项目的老毛病很坦率 —— **v0.4.0** 列出"FRED 宏观、社交情绪与决策日志记忆三处的**前视/时点（point-in-time）修复**"，**v0.5.0** 做到"每条带日期的路径都具备时点完整性"，**v0.5.2** 让回测"只看到每个分析日当天已发布的数据"。这个演进意味着**那些发布之前的回测结果，与之后的结果不可比**，而仓库把这点写出来，而不是重跑历史。README 自己的免责声明仍然罩在一切之上：为研究设计，表现随基座模型、温度、时段与数据质量而变，"不构成财务、投资或交易建议"。一个把卖点放在"模拟交易员看不见未来"上的框架，比一个只有漂亮收益率、却没有这句话的框架更值得用。

[`🔗 TauricResearch/TradingAgents`](https://github.com/TauricResearch/TradingAgents) · [`🔗 v0.7.0 发布`](https://github.com/TauricResearch/TradingAgents/releases/tag/v0.7.0) · [`🔗 arXiv 2412.20138`](https://arxiv.org/abs/2412.20138)

---

## 43. Oracle 十月 CPU 是 1,295 个补丁 —— 而它的 Java CVE 比公告晚四天才进 NVD

- **Velocity:** ▮▮ rising
- **Source:** Oracle Critical Patch Update（2026 年 10 月）/ NVD · 1,295 个补丁 · 发布于 2026-10-20
- **Tags:** `oracle` `java` `patch-tuesday` `cve` `nvd`

Oracle **2026 年 10 月关键补丁更新**包含"**1295 个新增安全补丁**，覆盖下列产品族"，包括 Helidon、JD Edwards EnterpriseOne、MySQL（含 26.7.0–26.7.1）、MySQL Connectors，以及 **Oracle Java SE 的 8u503、11.0.32.1、17.0.20.1、21.0.12.1、25.0.4.1、26.0.2 与 27**，另有 JavaFX 与两条 GraalVM 线。公告遵循固定节奏 —— 页面自己的日程列着 `17 November 2026 (CSPU)`、`15 December 2026 (CSPU)`、`19 January 2027 (CPU)` —— 即第三个星期二，也就是 **10 月 20 日**。

**Why it matters:** 同一页上的两个数不是同一个数，而差别是老一套。**1,295 是 Oracle 对自己补丁条目的计数**，不是 CVE 数；同一份文档的致谢部分引用了**超过 1,700 个不同的 CVE 编号**，因为一个补丁可携带多个编号，一个编号也可出现在多个产品里。另一件事是 CVE 链条落后于公告：**`CVE-2026-114820`**，一个 Java SE / GraalVM 问题，**CVSS 3.1 9.1、CWE-327**，直到 **2026-10-24** 才进入登记库 —— 比补丁晚四天 —— 且只带 Oracle 自己的评分（`secalert_us@oracle.com`），NVD 状态仍是 `Received`。所以"十月 CPU 修了哪些 Java CVE"在发布日当天无法从登记库回答；而等 CVE 数据流填充后再打补丁的资产所有者，实际打的时点比公告日期所暗示的要晚。

[`🔗 Oracle 2026 年 10 月 CPU`](https://www.oracle.com/security-alerts/cpuoct2026.html) · [`🔗 NVD — CVE-2026-114820`](https://nvd.nist.gov/vuln/detail/CVE-2026-114820)

---

## 44. UniXNU 是非 Apple ARM64 上的 OpenCore —— 它的第一个设备仓库指向小米平板

- **Velocity:** ▮▮ rising
- **Source:** GitHub（UniXNU/UniXNU）· **928★** · 创建于 2026-10-19 · BSD-2-Clause-Patent
- **Tags:** `uefi` `macos` `ios` `arm64` `bootloader`

**UniXNU** 是"一个通过 UEFI 在**非 Apple ARM64 硬件上运行 iOS 与 macOS** 的独立项目"，而它选定的类比说得很直白："**像 OpenCore 一样**，UniXNU 是一个通用 UEFI 环境与驱动加载系统：它加载设备所需的驱动，并通过统一的 UEFI 层引导操作系统。" 结构是刻意拆开的 —— 本仓库放构建工具、组件目录、ARM64 支持与 OS profile；`UniXNU-sm8550-common` 放共享的骁龙 8 Gen 2 支持；`UniXNU-sheng` 针对**小米平板 6S Pro**；`uefi-sheng` 是该设备的固件。这次发布的新闻点是那块平板上的 GPU 加速，走 **Adreno740 与 AdrenoMetal**。

**Why it matters:** 把 SoC 支持与设备支持分开，是把一次演示变成移植目标的关键，而仓库把上手当成一等成果 —— 有一条**迁移公告**要求既有设备仓库为共享 SoC 支持与规范化的组件命名做更新，另有一条成文的"Port a device"路径。诚实的限定是结构性的而非藏起来的：检出需要 `--recurse-submodules`，构建按设备进行，许可是 BSD-2-Clause-Patent —— 一份带专利授权的许可，对一个"整个前提就是把 Apple 的系统装到 Apple 没打算支持的硬件上"的项目来说，这件事很重要。在 Snapintosh（第 39 条）之后两天，这是通往同一目的地的第二条独立路线，只是方向相反：一个通用 UEFI 层，而非 hypervisor。

[`🔗 UniXNU/UniXNU`](https://github.com/UniXNU/UniXNU) · [`🔗 unixnu.com — 移植`](https://unixnu.com/porting/)

---

## 45. claude-seo：26 个子技能、19 个智能体做 SEO —— 以及一张 README 自己标注为"示意"的价目表

- **Velocity:** ▮▮ rising
- **Source:** GitHub（AgriciDaniel/claude-seo）· **20,212★** · 今日 +179 · MIT · v2.5.0 发布于 2026-10-22
- **Tags:** `claude-code` `skills` `seo` `agents` `plugins`

**Claude SEO** 是 Claude Code 的 SEO 审计插件：`/seo` 列出所有命令，一次审计在"**10 到 15 分钟**"内跑完可抓取性、索引、sitemap、重定向、Core Web Vitals、E-E-A-T、Schema.org 结构化数据、被 AI 搜索引用的概率（Google AI Overviews、AI Mode、ChatGPT、Perplexity、Gemini），以及本地与电商 SEO。它由 **26 个子技能与 19 个专家智能体**组成，"最多 **17 个智能体**"并发处理一个站点，MIT 许可，**v2.5.0** 于 2026-10-22 发布，背后有 **1,077 个测试**。

**Why it matters:** 最值得看的产物是那张价目表，因为这恰恰是插件 README 通常省掉的部分。它拿手工（$0，4–8 小时）、外包（每项目 $2k–$15k+，第一年合计 **$106,500**）、SEO 软件（$99–$999/月）与 Claude SEO（"免费，用你的 Claude Code 套餐"）做对比 —— 而配图说明与表格脚注都写着"**Illustrative pricing（示意价格）**"。这句披露在真干活：那个 $106,500 是构造出来的对比，不是测量出的队列，而它和"10 到 15 分钟"出现在同一份文档里，后者同样是厂商自己的数字。另有一个独立的品类观察：一个以子技能与并行子智能体形式发布的 SEO 工具，是目前最清楚的证据 —— **被打包的专业知识落在插件层，而不是模型层**；而它自己的 README（含头图与徽章墙）就是它所卖之物的示范。

[`🔗 AgriciDaniel/claude-seo`](https://github.com/AgriciDaniel/claude-seo) · [`🔗 那 26 个技能`](https://github.com/AgriciDaniel/claude-seo/tree/main/skills) · [`🔗 发布记录`](https://github.com/AgriciDaniel/claude-seo/releases)

---

## 46. VulnCheck 周五批次：Grav、Camaleon 与 Crow —— 同一个 bug 的两个 CVSS 版本差 1.2 分

- **Velocity:** ▮ steady
- **Source:** NVD / VulnCheck 安全公告 · CVSS 3.1 8.8 与 4.0 8.7 · 发布于 2026-10-24
- **Tags:** `cve` `grav` `camaleon-cms` `crow` `cvss`

三条记录均发布于 **2026-10-24**，评分方都是 `disclosure@vulncheck.com`，NVD 均未分析。**`CVE-2026-116019`** —— Grav **2.0.15 至 2.2.12**，在 **2.2.13** 修复 —— 是 Flex 表单覆写里的**白名单绕过**：拥有页面编辑权限的用户可以用 `unset-name@` 或整数键搬移 `data-*@` 指令，调用任意公有静态方法，例如 `Folder::delete` 或 `Utils::download`，从而删目录、覆写或读取文件。**`CVE-2026-116009`** —— Camaleon CMS 2.9.3 之前 —— 是媒体 `crop_url` 动作的路径穿越：一个 base64 `data:` URI 配合 `name` 参数里的 `../`，把一份 **ERB 模板**写进主题的 views 目录，随后渲染即执行。**`CVE-2026-116011`** —— Crow 1.3.4 之前 —— 是 `crow::json::load()` 的无控递归：一个套了数千层的 JSON 请求体就能耗尽工作线程栈、杀掉进程，未认证即可。

**Why it matters:** 三条**都带同一评分方给出的两个 CVSS 版本，而它们并不一致**。Grav 与 Camaleon 是 **3.1 8.8 / 4.0 8.7**；Crow 是 **3.1 7.5 / 4.0 8.7** —— 同一个漏洞，取决于扫描器读哪个版本，差 1.2 分；而 v3.1 与 v4.0 都把 7.0–8.9 映射为 *High*，所以这两个数字落在同一条带上，只是相对于任何 8.0 一类的内部阈值，它们给这个漏洞排出的次序不同。Crow 同时是一个**修复早于记录**的案例：**v1.3.4 于 2026-09-07 发布**，比这张 CVE 早 47 天，而那次发布除了这条还打包了若干其他安全公告 —— 也就是说"升到 1.3.4"早就因为别的原因成为正确建议。最深的那项权限要求要读仔细：Camaleon 只需要**媒体权限**就能到达 RCE，而这恰好是 CMS 会给那些不被信任写代码的人授予的权限。

[`🔗 NVD — CVE-2026-116019（Grav）`](https://nvd.nist.gov/vuln/detail/CVE-2026-116019) · [`🔗 GHSA-47gg-mh38-9rr7`](https://github.com/getgrav/grav/security/advisories/GHSA-47gg-mh38-9rr7) · [`🔗 GHSA-7x84-xhp8-6cqj（Crow）`](https://github.com/CrowCpp/Crow/security/advisories/GHSA-7x84-xhp8-6cqj)

---

## 47. HatchZip 就地解压，让 180 GB 的下载不必占 380 GB —— 并拒绝它无法安全处理的压缩包

- **Velocity:** ▮▮ rising
- **Source:** GitHub（xevrion/hatchzip）· **1,852★** · 创建于 2026-10-21 · MIT 或 Apache-2.0
- **Tags:** `archives` `rust` `disk-space` `cli` `desktop`

**HatchZip** 解决一个具体而常见的问题：解压通常需要同时容下压缩包**和**解出的内容 —— "一个 **180 GB** 的游戏下载解出 **200 GB**，用 WinRAR、7-Zip 或 `unzip` 需要 **380 GB** 磁盘"。HatchZip **从末尾解起**，每完成一段就把这段从压缩包文件上切掉、把空间还给下一步，因此只需要"略多于 **200 GB**"。它支持 ZIP、7z、tar、`.tar.gz`、RAR 分卷与分片压缩包，覆盖 Windows、macOS 与 Linux，有桌面应用也有 CLI，在改动任何东西**之前**先检查能否装得下，且可在任意时刻被中断或崩溃后继续。

**Why it matters:** 那张实测表里包含了它选择不做的情形。在 220 MiB 磁盘、约 50 MB 可用空间的条件下，ZIP 与多卷 7z 都完成了且逐字节一致，`unzip` 则"在第 6/21 个文件时空间不足"—— 而**只有一个 solid block 的 7z 被"在动任何东西之前拒绝"**，因为整个 solid block 不全部解出就无法释放。公开拒绝比公开胜利更少见，而它正是"安全失败的工具"与"解到一半留下残骸的工具"之间的分界。其余诚实之处调性相同：额外所需空间"约等于它能一次释放的最大单元"（ZIP/tar 是一个文件，7z 是一个 **solid block**）；打洞（hole-punching）在 ext4、XFS、btrfs 与 tmpfs 上验证过，但"**NTFS 与 APFS 尚未验证**"；速度来自并行解压，因此"只含一个大文件的压缩包只能以单核速度解"。安装包目前**未做代码签名**，README 会在 Windows 之前先告诉你。

[`🔗 xevrion/hatchzip`](https://github.com/xevrion/hatchzip) · [`🔗 hatchzip.dev`](https://hatchzip.dev) · [`🔗 工作原理`](https://github.com/xevrion/hatchzip/blob/main/docs/how-it-works.md)

---

## 48. 一周内两个无广告电视桌面：9,153 星，而更快的那个公布了它单机型的实测

- **Velocity:** ▮▮ rising
- **Source:** GitHub（pengchujin/aerial-tv、simbasjungles/free-my-tv）· **4,740★ / 4,413★** · 创建于 2026-10-19/20
- **Tags:** `android-tv` `webos` `launcher` `claude-code` `open-source`

两个互不相干的项目在同一周决定替换智能电视的桌面。**Aerial**（`pengchujin/aerial-tv`，**4,740★**，MIT）是面向国产 Android 电视的 tvOS 风格桌面 —— "给国产电视的一块干净桌面"，没有广告、没有推荐流，只有你的 App、壁纸和航拍屏保，开机自动接管。**Free My TV**（`simbasjungles/free-my-tv`，**4,413★**，MIT）覆盖 **Google TV、LG webOS 与 Samsung Tizen**，热门推荐只从你已装的 App 里出，带天气，明暗主题跟随你所在城市的真实日落。两者都不需要 root、不卸载任何东西，Free My TV 给出的回滚是"一个按钮恢复出厂桌面"。它的安装路径本身就是这个年份的标记：文档里最省事的方式是打开一个 AI 编码助手，然后说"在我 192.168.1.50 的电视上装 Free My TV"。

**Why it matters:** Free My TV 的性能段落是值得照抄的范式 —— "**60 fps，每一帧 16.6 ms**"、"**96 MB** 内存而不是 242 MB（−60%）"，而同句就附上限定："**在一台 98 吋 TCL Google TV、Android 14 上测得**。" 一块面板、一颗芯片、一个固件版本；这些数字不会迁移到你客厅那台机器上，而仓库这么说，而不是暗示相反。它还交代了现成 APK 缺什么 ——"没有 TMDB key，所以桌面没有推荐" —— 正是这种缺失依赖会在装好后变成 bug 报告。Aerial 的对应限定写在 issue 数里：一个五天的仓库，**226 个未关闭**。

[`🔗 pengchujin/aerial-tv`](https://github.com/pengchujin/aerial-tv) · [`🔗 simbasjungles/free-my-tv`](https://github.com/simbasjungles/free-my-tv) · [`🔗 freemytv.io`](https://freemytv.io)

---

## 49. 3D Model Anything 把 iPhone LiDAR 扫描变成可编辑的 Three.js 房间 —— 靠技能，不靠一键转换器

- **Velocity:** ▮ steady
- **Source:** GitHub（wesbos/3d-model-anything）· **1,818★** · 创建于 2026-10-21
- **Tags:** `threejs` `lidar` `agent-skills` `iphone` `3d-reconstruction`

Wes Bos 的 **3D Model Anything** 交付三样东西：一个采集房间 LiDAR 几何与照片的 **iPhone 应用**、一个带 dollhouse／漫游／俯视／线框／knolling 视图的 **Three.js 查看器**，以及一个 **`scan-to-threejs` 技能** —— 位于 `.agents/skills/scan-to-threejs/` 的 `SKILL.md` 与参考资料 —— 引导智能体完成测量、建模，以及与原始照片的**同机位视觉比对**。导出使用带版本的契约（`house-capture/5`），落在 `data/captures-in/<room>/`，示例办公室可直接在 `wesbos.github.io/3d-model-anything` 浏览。辅助脚本需要 Python 3；深度重建可选地需要 Open3D 与 Pillow。

**Why it matters:** README 拒绝了它自己的标题所诱发的读法 ——"这是一套**迭代式重建流程，不是一键出完美模型**的转换器"，目前范围限定在"房间与室内"。这一点之所以重要，是因为这里的智能体回路是一个**带闭环校验的测量回**路（用相同机位渲染视图，再与照片比对），而正是这种设计把"会收敛的 agent 技能"与"会幻觉出一张看着像的网格"的东西分开。分发上的限定同样具体：仓库是 source-available，"上架 App Store 是另一个独立步骤"，并且"**不要假定 App Store 上已经有下载**"；只附带办公室这一个示例，"原始扫描与照片集不分发"；代码与技能是 MIT，而附带的图像另有**单独的资产条款**。

[`🔗 wesbos/3d-model-anything`](https://github.com/wesbos/3d-model-anything) · [`🔗 办公室查看器`](https://wesbos.github.io/3d-model-anything/) · [`🔗 视频演示`](https://www.youtube.com/watch?v=JGQCcCzuS88)

---

## 50. SpeedCrunch 相隔十六天发出 1.0 与 1.1 —— 这台计算器自 2014 年以来的首次发布

- **Velocity:** ▮ steady
- **Source:** GitHub（heldercorreia/speedcrunch）/ Hacker News · 164 pts · v1.1.0 发布于 2026-10-20
- **Tags:** `speedcrunch` `qt` `release` `desktop` `open-source`

键盘驱动的高精度科学计算器 **SpeedCrunch**，于 **2026-10-04 发布 1.0.0**、**2026-10-20 发布 1.1.0** —— 上一个 **0.11 版本是 2014-01-30**，中间隔了十二年多。1.0 的重写带来 **标签页与分栏**工作区、跨重启保留的计算历史、启动时加载自定义函数与变量、自定义键盘预设，以及结果上的右键菜单；1.1 增加 `root(n; x)` 求 n 次方根（"包含负值与带单位的量"），修好用户自定义函数里的阶乘，把过时的 `lg` 按钮换成 `log10`，加上紧凑的 **Classic** 布局，并提供把设置放在应用旁的便携 macOS ZIP 包。官网列出 **50 位精度**、**140+ 函数**与 **40+ 种翻译**。

**Why it matters:** 一个沉寂的 Qt 桌面应用带着 1.0 回来，十六天后又发 1.1，是罕见的形态，而第二次发布才是关键信号 —— 那是只有在真的有人维护时才会出现的修 bug 与打磨轮次，而不是一次性的现代化提交。它也提醒一件事：项目状态如今存在哪里 —— 项目官网指向的那个仓库只有 **86 星**，而这对一个有二十年用户的计算器什么也说明不了，因为它的历史早于这个计数器、且不在其中。对任何维护表格类工具链的人来说，`root()` 支持带单位的量与负的被开方数才是实用增量 —— 那种算术很简单、定义域处理不简单的函数。

[`🔗 v1.1.0 发布说明`](https://github.com/heldercorreia/speedcrunch/releases/tag/v1.1.0) · [`🔗 speedcrunch.org`](https://www.speedcrunch.org/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50224210)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-10-25T12:42:04Z |
| Items | 50 |
| Sources tracked | 36 (Hacker News、GitHub Trending、Hugging Face、arXiv、NVD、CVE Program、CISA KEV、Oracle CPU、HPE、Kaspersky Securelist、BleepingComputer、OpenAI、路透社、InfoQ、EPFL、Cerebras、厂商博客、工程博客) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8（每日 3 次） |
| Ranking | 速度加权（时效 × 互动加速度 × 信源权威度） |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[前一日](2026-10-24.md) · [原始 .md](2026-10-25.md) · [归档](../archive/)
