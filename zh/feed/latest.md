---
date: 2026-10-08
updated: 2026-10-08T12:25:00Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 28
license: CC-BY-4.0
---

## 1. Margaret Hamilton 去世——把"工程"写进软件的那位程序员

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 996+ pts · ~7h ago (~05:15 UTC+8)
- **Tags:** `apollo` `software-engineering` `history` `mit`

据 MIT News 报道,Margaret Hamilton 于 9 月 30 日去世,享年 90 岁。她 1965 年受聘成为 MIT 阿波罗项目的第一位程序员,到 1968 年已升任助理总监,管理 400 多人参与的软件工作——阿波罗 11 号能成功登月正是因为她的设计:着陆前一刻登月舱计算机触发 1202 过载警报时,她的软件砍掉了后台任务,让关键着陆流程继续执行。在年幼的女儿在模拟器里误触发射复位程序、同样的错误随后在阿波罗 8 号上真实发生之后,她开创了"防御性编程";她还将"软件工程"这个词推广开来,为这门学科赢得了正当性。总统自由勋章(2016)、NASA 杰出太空行动奖(2003)、乐高小人偶(2017),阿波罗源代码 2015 年起就在 GitHub 上。

**Why it matters:** 现代系统里每一个优先级调度器、看门狗和"丢弃非关键工作"的恢复路径,都能追溯到她的团队在阿波罗计划下构建的模式——以及她的那个论断:写软件是一门工程学科,不是硬件的附属品。HN 讨论串就是整个行业的悼念墙。

[`🔗 MIT News`](https://news.mit.edu/2026/margaret-hamilton-computing-pioneer-dies-1007) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=49998895)

---

## 2. Claude Haiku 5.5:Anthropic 的小模型跳了一整个档位——价格只有四分之一

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 749+ pts · ~10h ago (~02:00 UTC+8)
- **Tags:** `anthropic` `small-models` `pricing` `benchmarks`

Anthropic 于 10 月 7 日发布 `claude-haiku-5-5`,自称"我们发布过的最便宜、最快、最强的小模型",也是首个带可调 effort 设置(Low → Max)的 Haiku 级模型。基准跳跃很大——GDPval-AA Elo 从 Haiku 4.5 的 735 跳到 1620,OSWorld 从 15.7% 到 72.4%,Terminal-Bench 4.0 从 0.0% 到 39.2%,无工具 HLE 从 10.2% 到 45.9%——并在多行上超过 GPT-6 Luna,以零头成本逼近 Sonnet 5.5(1840 Elo)。定价按提示长度分档:100k token 以内输入/输出 $0.10/$0.50 每百万 token(超过则为 $0.50/$2.50)——短提示比 Haiku 4.5 便宜约 90%,整体便宜约 75%。Sonnet 5.5 缓存读取价同时砍半至 $0.10,Max 和 Team 套餐新增每月 API 额度($100–$500)。页面自己承认复杂智能体编码任务 Sonnet/Opus 5.5 "仍是更好的选择",且全文未提上下文窗口大小。

**Why it matters:** 小模型档位才是智能体经济学真正运转的地方——子智能体、压缩、路由——一个 $0.10/M 输入的 1620 Elo 模型直接重置了 harness 构建者的价格性能底线。按提示长度分档定价也是首创,而且它悄悄重新定价的恰恰是所有人都在跑的长上下文智能体工作负载。

[`🔗 Claude Haiku 5.5`](https://www.anthropic.com/claude-haiku-5-5) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=49996437)

---

## 3. GPT-6 与面向所有人的智能界面——模型的回复现在是一个界面

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 542+ pts · ~10h ago (~02:00 UTC+8)
- **Tags:** `openai` `gpt-6` `ui` `chatgpt`

OpenAI 把"智能界面(Intelligent UI)"推向全体 ChatGPT 用户:GPT-6 现在能将文本、视觉与 **16 种原生交互组件**——按钮、表单、图表——混合编排进回复,由客户端编译器在模型生成的同时渐进渲染。思考与作答交错进行:GPT-6 Extra High 的响应时间与 GPT-5.6 Medium 相当,质量却超过 GPT-5.6 Extra High(内部评测,未经外部验证);GPT-6 Instant 在网页搜索类问题上提前 44% 开始作答。免费与 Go 用户首次用上 GPT-6 Luna,付费档为 GPT-6 Sol——Work 与 Codex 的模型阵容不变。HN 上最尖锐的问题:这到底是模型能力还是 harness——以及为什么上 Sol 而不是更强的 6.1 Sol?

**Why it matters:** "回复即界面"这一转向让聊天面板变成了应用平台——而且就在 OpenAI 的 Decisions API 公测(gpt-6-luna)让智能体以编程方式用上同一模型的第二天。留意组件目录会不会像网页图标库和技能货架那样,变成新的分发入口。

[`🔗 GPT-6 for everyone`](https://openai.com/index/gpt-6-for-everyone/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=49996425)

---

## 4. JPEG XL 随 Chrome 155 上线——2023 年被 Chromium 删掉的格式回来了,这次是 Rust

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 509+ pts · ~17h ago (Oct 7 ~19:25 UTC+8)
- **Tags:** `chrome` `jpeg-xl` `web-platform` `rust`

Chrome 155 开始支持 `.jxl` 解码,推翻 2023 年的移除决定。关键变化在解码器本身:纯 Rust 重写的 `jxl-rs` 取代 C++ 参考实现 `libjxl`,而 Rust 稳定化的 `target_feature_11`(无需 unsafe 的 SIMD)和受 Highway 启发的新抽象层 `jxl_simd` 让它变得可用。Chrome 报告**整个实现历史零内存安全漏洞**,经模糊测试与 AI 辅助代码审查验证,并指向 Interop 2026 JPEG XL 调查以实现跨浏览器一致性。Google 重申压缩主张——比 JPEG 好 30–50%、支持无损与 HDR、可无损转码 JPEG——同时注明目前仅解码,AVIF 仍值得尝试。

**Why it matters:** 这是 Chromium 第一次"收回"已删除的格式,而且是在参考实现被重写为内存安全语言之后才回来——这为"被拒"的 Web 格式如何翻案提供了模板。摄影师、档案与重图像管线在 AVIF 之外拿到了真正的第二选项;编码器暂时仍是第三方的事。

[`🔗 Shipping JPEG XL in Chrome`](https://developer.chrome.com/blog/jpeg-xl-in-chrome) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=49991227)

---

## 5. Bigwords.page:URL 就是整个应用——零后端的告示牌拿了 405 分

- **Velocity:** ▮▮ rising
- **Source:** Show HN · 405+ pts · ~12h ago (Oct 7 ~23:45 UTC+8)
- **Tags:** `client-side` `urls` `show-hn` `minimalism`

Bigwords 把任何带浏览器的屏幕变成全屏告示牌、倒计时或轮播展示——而全部配置存在 URL 的 fragment 里,"浏览器永远不会把它发给服务器"。支持 Markdown 排版、`||` 分段定时轮播、`{countdown}` + `&until=`/`&timer=` 倒计时、Wi-Fi/链接/联系方式的二维码、背景图与动画——全部在客户端生成,无账号,MIT 许可,仓库 10 月 6 日才创建。整个持久层就是一句话:"链接就是整个展示,分享或收藏即可。"

**Why it matters:** 在所有工具都在长出后端的时代,一个零服务器软件拿下 405 分的发布,是给"fragment 即状态"模式投的一票:无需托管、无可泄露、任何能传 URL 的渠道都能分享。这与今天的 ascii.rest 和上个月的 CSS Bed 出自同一种直觉——小而美的 Web 一直在演示智能体搞不坏的那套部署故事。

[`🔗 bigwords.page`](https://bigwords.page/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=49994443)

---

## 6. Atlassian CVE-2026-21589:公开 PoC 之后,文件读取漏洞迅速变成在野事件——CVSS 9.3

- **Velocity:** ▮▮ rising
- **Source:** Security press · PoC 出现后约 16 小时内确认在野利用尝试
- **Tags:** `atlassian` `cve` `file-read` `patch-now`

CVE-2026-21589 是一个**未认证任意文件访问**漏洞,影响八个自托管 Atlassian Data Center 产品的**所有版本**:Jira Software、Jira Service Management、Confluence、Bitbucket、Bamboo、Crowd、Crucible 与 Fisheye。Atlassian 于 10 月 5 日发布带外公告并敦促立即修补;NVD 收录的 **CVSS 4.0 评分 9.3 由 Atlassian 自己评定**(NVD 状态:Awaiting Analysis)。范围限定对排查很重要:攻击者必须知道 web 应用根目录内确切的文件名和路径——但公开 PoC 一天内就出现了,利用尝试几乎随即开始(Help Net Security 与 BleepingComputer,均为 10 月 7 日)。Watchtowr 的建议:修补前后都要翻查访问日志中的目录遍历尝试。

**Why it matters:** Data Center 实例存放着能解锁一切的配置文件——`confluence.cfg.xml` 数据库凭据、LDAP 绑定、许可数据。"只能读、要确切路径"正是数十起真实入侵起点的特征;这次的 PoC 到攻击间隔以小时计,而不是以周计。

[`🔗 NVD: CVE-2026-21589`](https://nvd.nist.gov/vuln/detail/CVE-2026-21589) · [`🔗 Atlassian: CONFSERVER-104488`](https://jira.atlassian.com/browse/CONFSERVER-104488)

---

## 7. 《Navier–Stokes Lost in Translation》:预印本论证 OpenAI 经 Lean 验证的证明并不证明它声称的东西

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 274+ pts · ~13h ago (Oct 7 ~23:25 UTC+8)
- **Tags:** `autoformalization` `lean` `formal-methods` `ai-math`

Bastounis、Circelli 与 Hansen(arXiv 2610.08144,10 月 6 日提交,v1)把矛头对准 AI 数学公告背后的流水线:自动形式化——模型把自然语言证明翻译成 Lean,再机器验证该形式化产物。他们的主张是:解析数学自然语言文本中的歧义——忠实翻译的必要前提——在可解性复杂度指数(SCI)层级中位居任意高处(**SCI = ∞**,而停机问题为 1),因此"验证可能对原始 NL 论证毫无保证"。落到具体:他们论证 OpenAI 公布的 Navier–Stokes blow-up 证明的 Lean 形式化"并不对应原 NL 证明",并给出多个误翻译实例。注意事项也真实存在:这是 v1 预印本,未经同行评审,DOI 待注册——而 OpenAI(公开层面)尚未回应。

**Why it matters:** 它打的是我们昨天报道的整波 AI 数学浪潮(722 篇手稿发布)的承重墙假设:经验证的 Lean 证明能为其来源的英文论证背书。如果歧义消解真的不可计算地难,那么对*翻译*本身的人工审查——而不只是检查器的祝福——就重新回到了信任的中心,无论证明出自人类还是 AI。

[`🔗 arXiv 2610.08144`](https://arxiv.org/abs/2610.08144) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=49994145)

---

## 8. cloudflare/security-audit-skill 重新登上趋势:"检查发现的永远不是发现它的那个智能体"——26.2k★

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · 今日 +576★ · 总计 26.2k
- **Tags:** `agents` `security` `skills` `cloudflare`

Cloudflare 的安全审计技能在无任何新发布的情况下(最后一次提交 9 月 14 日)重回每日趋势榜——乘着本周技能货架的同一波东风。这个仓库打包的正是后来长成 Cloudflare 自家漏洞发现 harness 的那个技能(6 月《Build Your Own Vulnerability Harness》一文):从侦察到覆盖制导狩猎再到结论输出的六个阶段,内置对抗式验证——每个候选发现都交给一个"试图推翻它"的全新验证者,结论以 JSON 输出并由零依赖 Node 脚本按 schema 校验。设计细节也很诚实:单次运行只能找出"反复运行总发现数的一半",而且没有操作系统级沙箱时一切只能停留在 `needs_validation`。它长成的那套 harness 最终把 20,799 个原始候选压缩为 128 个仓库中的 7,245 个可执行发现。

**Why it matters:** 出身很重要——这是少见的从技能毕业成 4,000 工程师公司生产级安全工作流的案例,而它的核心模式(全新验证者、机器可校验的发现、覆盖账本)可以移植到安全之外的任何智能体 QA 任务。

[`🔗 cloudflare/security-audit-skill`](https://github.com/cloudflare/security-audit-skill) · [`🔗 Build Your Own Vulnerability Harness`](https://blog.cloudflare.com/build-your-own-vulnerability-harness/)

---

## 9. NVIDIA 的 OpenShell 登上周趋势榜首:智能体机群的内核级强制执行——15.3k★,v0.1.2

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending weekly · 本周 +3,690★ · 总计 15.3k
- **Tags:** `agents` `sandboxing` `nvidia` `policy`

OpenShell——NVIDIA 的 Apache-2.0 运行时,面向"自主 AI 智能体机队"——本周新增 3,690 星,v0.1.2 于 9 月 28 日发布,并承诺新的稳定发布节奏。设计是四层纵深防御:**Landlock** 负责文件系统隔离、可运行时热更新的网络白名单、seccomp 加上阻断 `sudo`/setuid 提权的无特权进程身份,以及仅在被授权端点解析的占位符式 provider 凭据。策略是声明式 YAML,按设计应纳入版本控制并可审计;有风险的新策略变更在生效前会被标记并等待人工审核;SDK 覆盖 Python、TypeScript、Go 和 Rust。Windows 仍仅支持 WSL-2 且为实验性。

**Why it matters:** 智能体遏制是本季度的开放难题——苹果以智能体为由收紧 macOS 权限,每家 harness 厂商都在造自己的沙箱。一个 OS 内核强制、厂商中立的参考运行时(它直接瞄准 Claude Code、Codex、Copilot CLI 和 OpenCode)让这场碎片化的讨论有了可以共同争论的公共地基。

[`🔗 NVIDIA/OpenShell`](https://github.com/NVIDIA/OpenShell) · [`🔗 OpenShell 概览文档`](https://docs.nvidia.com/openshell/about/overview)

---

## 10. Docker Agent:`docker agent` 把容器 CLI 变成智能体运行时

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 201+ pts · ~10h ago (~01:50 UTC+8)
- **Tags:** `docker` `agents` `mcp` `orchestration`

Docker 工程团队展示了它的 AI Agent Builder 与运行时:一个 Go 语言 CLI 插件(`docker agent`),用声明式 YAML 定义智能体、编排带自动任务委派的多智能体团队,并从**任意 MCP 服务器**挂载工具——本地、远程或容器化均可。它对提供商无偏好(OpenAI、Anthropic、Gemini、Bedrock、Mistral、xAI,本地可用 Docker Model Runner),内置 `think`/`todo`/`memory` 工具与 BM25/向量/混合 RAG,并把智能体打包成 OCI 镜像走正常仓库分发。3.8k★,Apache-2.0,预装于 Docker Desktop 4.63+。

**Why it matters:** "OCI 作为智能体打包格式"是这里安静的论题——把容器分发标准化的那家公司,想成为智能体的分发渠道,以 MCP 为工具接口。如果智能体镜像能像容器镜像一样被 pull,仓库(registry)就成了新的应用商店。

[`🔗 docker/docker-agent`](https://github.com/docker/docker-agent) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=49996259)

---

## 11. RAD Debugger v0.9.29-alpha:初步的 Linux 原生调试落地

- **Velocity:** ▮▮ rising
- **Source:** GitHub · v0.9.29-alpha 9 月 30 日发布 · 登上每日趋势
- **Tags:** `debuggers` `linux` `game-dev` `open-source`

RAD Debugger——自 2021 年 RAD Game Tools 被收购后以 MIT 许可归于 Epic Games 旗下——在 v0.9.29-alpha 中首次加入**初步的 Linux x64 原生调试**支持:暂不提供 Linux 二进制(需从源码构建),发布说明对已知问题毫不讳言("仍处于*非常早期*……请预期比 Windows 上更不稳定的体验"),并明确请求社区实战测试。同版还带着 RAD Linker 在多 GB 调试信息场景"链接时间快 50%"的主张。这个 alpha 已经好用到一个 r/Zig 帖子标题就叫"RAD Debugger 在 Linux 上似乎能配合 Zig 工作"。

**Why it matters:** GDB/LLDB 前端之外的 Linux 原生图形化调试器是工具链最后几个大缺口之一,而一个以 UI 为产品本体(而非挂着 TUI 的 CLI)的调试器会改变"在 Linux 上调试"的体验——前提是 alpha 的那些警告能缩小。Windows 先行的实战测试阶段本身就是范本:尽早发布、公开已知问题、主动找测试者。

[`🔗 v0.9.29-alpha 发布说明`](https://github.com/EpicGames/raddebugger/releases/tag/v0.9.29-alpha) · [`🔗 EpicGames/raddebugger`](https://github.com/EpicGames/raddebugger)

---

## 12. Meta 砍半 Claude Code 席位;微软削减三分之一的 Claude 预算

- **Velocity:** ▮ steady
- **Source:** Hacker News · 310+ pts · ~9h ago (~02:50 UTC+8)
- **Tags:** `anthropic` `meta` `microsoft` `industry`

The Information(10 月 5 日,付费墙)报道两大 AI 实验室竞争对手都在重新平衡内部 Claude 使用:Meta 的 Claude Code 用户从年内约 60,000 降至约 30,000,主要转向自研 MetaCode(30,000+ 用户)与 Muse Code(6,000+,8 月起对外部客户测试)——但 28 天内仍在 Claude Code 上花费**超过 1.05 亿美元**。微软对内部 Claude 支出的年度预估从约 10 亿美元下调超过三分之一,云与 AI 部门的员工月度 AI 上限从 10 万美元降到约 1 万美元——与此同时微软平台上面向客户的 Claude 访问仍在增长。注意信源链条:The Information → 聚合转载 → HN;精确数字应视为"报道所称"而非"已确认"。

**Why it matters:** 最大的 AI 公司互为彼此最好的客户——而这次收缩关乎工具主权,不是不满:两家都在把工程师引向自己拥有的模型。对 Anthropic,总量数字依然向上(文中引用 650 亿美元年化收入节奏);对其他所有人,这是一个关于"当底层模型是对手的,企业会多快换掉 harness"的数据点。

[`🔗 报道转载(rswebsols)`](https://www.rswebsols.com/news/meta-and-microsoft-take-steps-to-reduce-employee-usage-of-claude-ai/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=49997161)

---

## 13. ascii.rest:191 幅动态 ASCII 作品,一个 script 标签的 Web Component

- **Velocity:** ▮ steady
- **Source:** Hacker News · 317+ pts · ~13h ago (Oct 7 ~23:05 UTC+8)
- **Tags:** `ascii` `web-components` `typescript` `frontend`

一个 191 幅动态 ASCII 艺术作品的画廊——极光场景、终端 spinner、sparkline、K 线、翻页钟、洛伦兹吸引子、Matrix 雨——每幅都是一个零依赖的小型类型化 TypeScript 模块,MIT 许可。接入方式刻意朴素:一个 `<script type="module">` 定义 `<ascii-art>` 自定义元素,可见时播放、在用户偏好减少动效时定格首帧;另有 React、Next.js 与 Astro 适配器,Astro 路径还会服务端渲染首帧,让页面在动画开始前就能绘制。背后的仓库(bas3line/ascii)10 月 7 日才创建。

**Why it matters:** 自定义元素 + 零依赖分发是"小而美 Web"复兴的安静技术栈——与今天的 CSS Bed、Bigwords 出于同一种直觉:一个标签、无需构建、不被框架绑架、渐进增强是默认而非事后补丁。

[`🔗 ascii.rest`](https://ascii.rest/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=49993857)

---

## 14. 第一批核钟开始走时——维也纳与北京独立完成,同一天

- **Velocity:** ▮ steady
- **Source:** Hacker News · 44+ pts · ~10h ago (~01:55 UTC+8)
- **Tags:** `physics` `thorium` `metrology` `research`

两个团队——维也纳工业大学(Thorsten Schumm 组)与清华大学(Shiqian Ding 组)——独立实现了可运转的钍-229 核钟,同日在 Nature 发表,路径不同:维也纳用频率梳驱动离子中的核跃迁,北京把 148.4 nm 真空紫外激光锁定在掺钍晶体上。这为约 50 年的追逐画上句点:钍-229 拥有目前激光技术唯一够得着的核跃迁,而原子核受环境扰动屏蔽,核钟有望最终超越当今最好的原子钟。两组人都把限制说得明明白白:这批首秀核钟尚未超过传统原子钟,距"目标性能"还很远,维也纳配套的暗物质搜索一无所获。

**Why it matters:** 一场罕见的同日独立重复——物理学能给出的最强验证形式——也是测试基本常数是否漂移的测量平台的开端。在这个基准公告扎堆的星期里,"尚未更好"的诚实表述本身就值得记一笔。

[`🔗 Reuters`](https://www.reuters.com/science/scientists-vienna-beijing-create-worlds-first-nuclear-clocks-2026-10-07/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=49996406)

---

## 15. Google Playground:对话式游戏创作走向消费者——Unity 在幕后候场

- **Velocity:** ▮ steady
- **Source:** Hacker News · 128+ pts · ~16h ago (Oct 7 ~20:25 UTC+8)
- **Tags:** `google` `game-dev` `generative-ai` `launch`

Google 上线 Playground(playground.google),一个实验性平台:用自然语言描述来创建、游玩和分享游戏——"无需编程经验"——带可二创的起始提示,手机或笔记本浏览器即玩,公开 Explore 画廊并配安全筛查。部分品类支持多人模式与排行榜;创作权限按 Google AI 订阅分档,仅限美国、18+。值得注意的附件:**Unity Spark**,一个即将推出的集成,提供"专业级机制、高保真 3D 与 Unity 运行时",测试中,封闭 beta 不久后到来。

**Why it matters:** 提示词生成游戏此前是研究演示(Genie)和专业工具;这是 Google 第一次把它连同社交图谱一起推到消费者面前。Unity 的联姻是引擎行业的信号:当创作变成对话,护城河就从创作工具转移到运行时保真度与分发。

[`🔗 Google 官方博客`](https://blog.google/innovation-and-ai/technology/ai/playground-experimental-gaming-platform/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=49991823)

---

## 16. Michael Lynch:软件博客的反模式——新手埋没重点的六种方式

- **Velocity:** ▮ steady
- **Source:** Hacker News · 225+ pts · ~15h ago (Oct 7 ~21:05 UTC+8)
- **Tags:** `writing` `blogging` `documentation`

Michael Lynch(Refactoring English)盘点了技术博客反复出现的失败模式:蜿蜒的开场白、"读者除了这一点之外全都知道"、用链接代替解释、"前情提要"式的续作注入错误、过度正式,以及在移动端溢出、低对比度字体等 HTML 基本功上翻车。他的正面规则同样具体:在标题和前三句内回答"这是写给像我这样的人的吗,我能得到什么";把一个具体的朋友想象成参照读者;让链接成为奖励而非前提;"像说话一样写"。他提到自己的读者有 25–35% 在手机上。

**Why it matters:** 这篇文章落在智能体写作时代正中央,而它最深的建议——有辨识度的声音、显式声明假设、把读者留在页面上——恰恰是同质化生成文字最失败的地方。它也可以直接当作审校清单,用来检查任何智能体替你起草的东西。

[`🔗 Anti-patterns in software blogging`](https://refactoringenglish.com/blog/anti-patterns-software-blogging/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=49992257)

---

## 17. trycua/cua 重新上榜:计算机操作(computer-use)基础设施层——驱动、机队,以及一个前沿智能体考不过的基准

- **Velocity:** ▮ steady
- **Source:** GitHub Trending weekly · 今日 +228★ · 总计 28.8k
- **Tags:** `computer-use` `agents` `benchmarks` `open-source`

Cua 项目(YC X25)没有任何单一发布事件就重回周榜——它的势头乘着计算机操作基础设施化的东风:MIT 许可的**开源驱动**,在不劫持光标的情况下发送点击、按键与无障碍树读取(单一二进制覆盖 macOS/Windows/Linux,可作 MCP stdio 服务器、守护进程或一次性 CLI;Hermes、Clicky、H Company 与 Factory Droid 都在用它);一个**跨操作系统机队 API**,可启动 Linux/Windows/macOS/Android 机器并支持温池;以及 **Cua-Bench**,一个带专家任务的评测/训练场层——网站头条数据是"最好的前沿智能体在 25 个专家级 KiCad 任务中只通过 6 个"。经人工校验的轨迹数据集(带步骤级标注)与按量计费的机队定价一起出售。

**Why it matters:** 计算机操作正在收敛成真正的基础设施层——驱动、机队、基准、数据——而 KiCad 那个数字是对桌面智能体演示的有益解毒剂:GUI 智能体在专业人士真实运行的大多数专家工作流上仍然失败。

[`🔗 trycua/cua`](https://github.com/trycua/cua) · [`🔗 cua.ai`](https://cua.ai/)

---

## 18. 《战神》被静态重编译为 WebAssembly,在浏览器标签页里运行

- **Velocity:** ▮ steady
- **Source:** Hacker News · 173+ pts · ~17h ago (Oct 7 ~19:25 UTC+8)
- **Tags:** `webassembly` `recompilation` `psp` `emulation`

一个一天大的仓库(snuri00/psp-web-recomp,10 月 7 日创建,MIT)演示了 PSP 版《战神》被静态重编译为 WebAssembly 并在浏览器中可玩——与本周把 PS5 可执行文件搬上原生 Linux 的是同一套静态重编译思路,只是目标换成了浏览器。仓库很新、文档很薄(成文时 116★),请把它当演示而非工具;HN 讨论串承载了技术细节与注意事项。

**Why it matters:** 静态重编译在它落地的每个领域都在战胜模拟——上周是原生移植,今天是浏览器——因为它用构建步骤换掉了运行时翻译开销。浏览器作为通用复古目标,正在悄悄成为这项技术的标准演示场景。

[`🔗 snuri00/psp-web-recomp`](https://github.com/snuri00/psp-web-recomp) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=49991243)

---

## 19. Pwn2Own 爱尔兰:两天 77 个零日——其中 OpenAI Codex 智能体被一个 bug 攻破

- **Velocity:** ▮▮▮ trending
- **Source:** ZDI / Pwn2Own Ireland(科克) · 第二日战果 Oct 7 · 赛事持续至 Oct 8
- **Tags:** `pwn2own` `zero-days` `agents` `mobile`

ZDI 的 Pwn2Own Ireland 2026 两天内已产出 77 个独立零日——第一天 32 个、38.85 万美元,第二天再添 45 个、23.25 万美元,累计 62.1 万美元。三星 Galaxy S26 反复沦陷——仅第二天就被攻破三次;而本信息流存在的理由是:**一个 OpenAI Codex 智能体被单个参数注入 bug 攻破**。VinSOC 以 8 万美元的攻击链领跑个人榜——Philips Hue Bridge Pro(7 个 bug)和 Oracle Autonomous AI Database(5 个 bug)。注意限制:CVE 编号和评分尚未分配——厂商有标准的 90 天 ZDI 披露窗口;部分首日 Galaxy bug 厂商此前已知;iPhone 17 目标无人报名("no contestant registered for an attempt")。

**Why it matters:** 智能体 harness 已成为正式的 Pwn2Own 目标类别,一次单 bug 的 Codex 攻破给"harness 即攻击面"的这个季度标出了公开价格——GitLab AI Gateway、Mooncake、MindSearch。90 天倒计时也意味着一波智能体基础设施公告将在 2027 年初落地。

[`🔗 第一天:32 个零日,38.85 万美元`](https://www.bleepingcomputer.com/news/security/hackers-exploit-32-zero-days-on-first-day-of-pwn2own-ireland/) · [`🔗 第二天:再添 45 个`](https://www.bleepingcomputer.com/news/security/samsung-galaxy-s26-hacked-three-more-times-at-pwn2own-ireland/)

---

## 20. LMCache:vLLM 所用 KV 缓存层的未认证 RCE——CVSS 9.8,且仍无修复版本

- **Velocity:** ▮▮▮ trending
- **Source:** JFrog Research · Oct 7 披露 · NVD 9.8(JFrog 自评)
- **Tags:** `lmcache` `vllm` `rce` `cve`

CVE-2026-105192(CWE-306):在多进程/分布式模式下,LMCache 会打开一个**未认证的 ZeroMQ ROUTER 套接字**,msgpack 扩展载荷在任何 handler 运行之前就抵达 `pickle.loads`——一条未认证的 ZMQ 消息即远程代码执行。持有 CNA 身份的 JFrog 于 10 月 7 日披露,并声明该缺陷"仍存在于最新 PyPI 发布 v0.5.5、v0.5.6 候选版直至 v0.5.6rc3,以及开发分支中"——目前没有任何修复版本。范围限制(来自公告本身):使用默认绑定的单机标准安装不可被其他机器访问;仅在 vLLM 进程内使用的 LMCache 不会打开该端口。仓库活着而非弃坑(今天仍有推送,12.0k★),补丁大概率在路上——但截至发稿并不存在。NVD 载有 JFrog 的 Secondary 9.8。

**Why it matters:** KV 缓存层正在成为推理机群的共享基础设施——恰是"一个未认证 pickle 汇点变成全机群 RCE"的那一层。活跃仓库上的"无修复版本"声明会很快过期,但在补丁落地之前,暴露在公网的分布式 LMCache 部署应视为"可被拿下",而不只是"有风险"。

[`🔗 JFrog 公告`](https://research.jfrog.com/vulnerabilities/lmcache-is-vulnerable-to-unauthenticated-remote-code-execution-via-pickle-deserialization-on-the-multiprocess-zmq-transport-cve-2026-105192-jfsa-2026-001694382/) · [`🔗 NVD: CVE-2026-105192`](https://nvd.nist.gov/vuln/detail/CVE-2026-105192)

---

## 21. npm 上的 tensorlake 被 Shai-Hulud 蠕虫植入后门——0.5.144 窃取 AI 工具凭据,现已下架

- **Velocity:** ▮▮▮ trending
- **Source:** The Hacker News / Socket · 事件进行中 · 恶意版本发布于 ~01:12 UTC(~09:10 UTC+8)
- **Tags:** `npm` `supply-chain` `credentials` `worm`

10 月 7 日,一个恶意提交以维护者名义落入 Tensorlake 的仓库,Shai-Hulud/ChainDrop 蠕虫随即于 10 月 8 日 01:12 UTC 将 `tensorlake@0.5.144` 发布到 npm。据 Socket 分析(经 The Hacker News 报道),它会"窃取凭据、外传机密、建立持久化,并执行远程下发的代码"——npm/GitHub 令牌、AWS 密钥、SSH 私钥、加密钱包,以及 **AI 工具配置(Claude、Cursor、Windsurf、Zed)**,通过 `.claude/settings.json` 和 `.vscode/tasks.json` 持久化,并借以太坊合约解析 C2。发稿时已核验注册表状态:0.5.144 已从注册表 `versions` 中消失(dist-tags.latest = 0.5.143)——是 npm 还是维护者删除的尚不可确认。装过的话:删除并轮换全部凭据。

**Why it matters:** npm 蠕虫浪潮已从"包"转向"智能体使用的工具"——经 `.claude/settings.json` 持久化意味着一次错误安装即可攻陷该机器上此后所有智能体会话。这份窃取清单本身就是一张智能体开发者信任锚点地图。

[`🔗 The Hacker News`](https://thehackernews.com/2026/10/tensorlake-npm-package-compromised-to.html) · [`🔗 npm: tensorlake`](https://registry.npmjs.org/tensorlake)

---

## 22. 继昨天的 722 份数学手稿发布:OpenAI 撤回三篇论文——一个符号错误,连带两篇依赖结果

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 80+56 pts(两个讨论串) · ~5h ago(~15:05 UTC+8)
- **Tags:** `openai` `ai-math` `formalization` `retraction`

昨天我们报道了 OpenAI 发布数百份 AI 生成的数学手稿;该仓库的 history 文件现在多了一条 10 月 7 日的"Withdrawals"条目。《Split abelian eightfold 上 Weil 类的代数性》中的一个符号错误使稳定化迹消去论证失效——"以及两篇依赖论文所用的构造。因此我们撤回以下三部手稿":Weil 类一文、一个 K3 的 Kuga–Satake 构造,以及 K3 乘积上的有理 Hodge 猜想。同一条目还记录了 14 篇经证明修复的修订、6 个新形式化(形式化比例现为"300 / 719 = ~42%"),以及——悄无声息地——头条总数从 722 缩水到 719。被撤论文带有指向存档版本的说明。

**Why it matters:** 同周内的撤回-修复循环正是这套流程正常运转时的样子——它是对炒作和今晨"验证并不能为翻译背书"批评的双重具体回应:产物是可查的,而一旦去查,它们会像人类数学一样出问题。

[`🔗 openai/math history`](https://github.com/openai/math/blob/main/history.md) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50002650)

---

## 23. 陶哲轩的"Math 2.0"与 Aaronson 的"Mathocalypse":数学家们回应了

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 368+ pts(Tao 讨论串) · ~7h ago(~13:15 UTC+8)
- **Tags:** `ai-math` `culture` `openai` `research`

对这波 AI 数学发布的两份重量级回应,今晨双双登上 HN 首页。陶哲轩(Mathstodon,四帖长帖的末帖):"Math 1.0"的先解为王文化"已被优化到不可持续的地步","Math 2.0"必须"弱化单纯解题的角色,更全面地重视数学进步"——包括阐述、社区建设、开辟新方向,并重新审视教育、发表与职业晋升的评价标准。Scott Aaronson 在〈The Mathocalypse〉中走得更远:称这次发布是"数学史上最重大的日子之一",并据其听取汇报后的自述(未经独立核实)称该未发布模型每题花费约 3 小时 GPT-Pro 级算力、在约 8000 次尝试中成功率约 5%;他把"OpenAI 模式"(倾倒不可读的证明)与"Anthropic 模式"(付钱请数学家——他点名 Virginia Williams 和 Josh Alman——写消化版)相对照。他最锋利的一句:"还没有任何人理解过这些证明中的任何一个;理解它们的竞赛才刚刚开始。"

**Why it matters:** 将与机器生成数学共处的人正在公开、实时地亮明立场——陶哲轩谈激励体系应该奖励什么,Aaronson 谈哪种发布模式对这门学科伤害更小。两帖都是未来十年数学的战略文件。

[`🔗 陶哲轩 on Mathstodon`](https://mathstodon.xyz/@tao/117395269325940185) · [`🔗 Aaronson: The Mathocalypse`](https://scottaaronson.blog/?p=10169) · [`🔗 HN: Tao 讨论串`](https://news.ycombinator.com/item?id=50002008) · [`🔗 HN: Aaronson 讨论串`](https://news.ycombinator.com/item?id=49997718)

---

## 24. SonicWall SMA1000:CVSS 10.0 的预认证 SSRF 获热修复——"一条非预期的替代访问路径"

- **Velocity:** ▮▮ rising
- **Source:** SonicWall 公告 SNWLID-2026-0017 · CVSS 10.0(SonicWall 自评) · 热修复 Oct 6–7
- **Tags:** `sonicwall` `cve` `ssrf` `patch-now`

CVE-2026-102255:SonicWall 修复了 SMA1000 Appliance WorkPlace 界面中一个最高严重级的**预认证 SSRF**——"一条非预期的替代访问路径",让未认证的远程攻击者可使设备代发内部请求。修复版本:12.4.3-03670 及更高、12.5.0-03082 及更高;热修复经 MySonicWall 下发,需重启。受影响:SMA1000 设备(型号 6210、7210、8200v);SMA 100 系列与防火墙 SSL-VPN 不受影响。SonicWall 声明"没有证据表明这四个缺陷中的任何一个正被用于攻击";Shadowserver 统计有 400+ 台暴露在互联网上的 SMA1000。NVD 载有 SonicWall 的 Secondary 10.0(10 月 7 日发布)。鉴于该产品线 7 月与 9 月的被利用史,无论如何都应按"今晚就打补丁"处理。

**Why it matters:** 边缘设备上的 10.0 预认证漏洞本身就属于"今晚必修"级;在这条产品线上,这已是今年的第四幕。在暴露于公网的 VPN/网关硬件上,"暂无被利用证据"的保质期向来很短。

[`🔗 The Hacker News`](https://thehackernews.com/2026/10/sonicwall-patches-cvss-100-pre.html) · [`🔗 NVD: CVE-2026-102255`](https://nvd.nist.gov/vuln/detail/CVE-2026-102255)

---

## 25. microsoft/mxc 达到 1.0:运行不可信模型输出的统一沙箱底座

- **Velocity:** ▮▮ rising
- **Source:** GitHub · v1.0.0 GA 于 Oct 7 · 今日 +106★ · 共 1.5k
- **Tags:** `sandboxing` `agents` `microsoft` `open-source`

Microsoft eXecution Container 在 rc4/rc5 之后于 10 月 7 日正式 GA:"一个沙箱化代码执行系统,用于在 Windows、Linux 和 macOS 上运行不可信代码(模型输出、插件与工具)",提供"多种隔离后端,从 OS 原生进程沙箱到完整虚拟机,隐藏在统一的隔离模型与类型化 SDK 之后"。后端列表横跨 Windows Sandbox、LXC、Bubblewrap、Seatbelt、MicroVM(Nanvix)与 Hyperlight——行为依平台而异是设计使然。MIT 许可。这是本月第三个登上趋势榜的智能体隔离底座,前有 NVIDIA OpenShell(面向智能体机群的内核级策略)与 Docker 的 agent runtime(OCI 打包)。

**Why it matters:** 每家 harness 厂商都要运行模型输出,而每家都在自造沙箱。微软这份类型化的多后端参考实现,给"关住巫师"的争论提供了可具体 standardize 的对象——mxc 作执行底座,OpenShell 作策略层。

[`🔗 microsoft/mxc`](https://github.com/microsoft/mxc) · [`🔗 v1.0.0 发布`](https://github.com/microsoft/mxc/releases/tag/v1.0.0)

---

## 26. ts-rust:LLM 把 TypeScript 编译器移植成 Rust——GPT 烧了 42 万美元停滞,Opus 5.5 以约 2.4 万美元完成

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 74+ pts · 124 cmt · ~12h ago(~08:45 UTC+8)
- **Tags:** `typescript` `rust` `llm` `compilers`

pingdotgg/ts-rust(MIT)是由 LLM 编写的 TypeScript 编译器、检查器与 LSP 的 Rust 移植——README 里前后两场战役就是故事本身:数月间约 42 万美元的 OpenAI token(GPT-5.6 Sol,后换 GPT 6 Astra)在约 84% 兼容度处停滞;改用 Opus 5.5 从零重启,10 小时产出可用的 v0,两周总 API 花费约 24,047 美元——"介于作者每周 200 美元套餐上限的 925% 到 983%"。免责声明本身就是内容:"这是一个早期版本"、"我一行代码都没读过"、"警告:我不知道它是否真的能用"、一个 Known problems 章节,以及"The Slop Line"以下全部由模型自写。"在我们测试过的所有真实项目中 100% 兼容"是自报数据。

**Why it matters:** 无论 ts-rust 是否达到生产级,它都是"智能体能否移植真实编译器"这一问题上一份公开且标价的数据点——包括"换模型从零重启胜过数月增量修补"这一发现。真正的头条是成本曲线:42 万 → 2.4 万美元。

[`🔗 pingdotgg/ts-rust`](https://github.com/pingdotgg/ts-rust) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50000676)

---

## 27. OpenSRE v0.1:AI SRE 智能体的框架——兼训练场——今日发布

- **Velocity:** ▮▮ rising
- **Source:** GitHub · v0.1 今日发布(Oct 8) · 11.6k★(今日 +107)
- **Tags:** `sre` `agents` `observability` `evals`

Tracer-Cloud 的 OpenSRE 今日发布 v0.1:"面向 AI SRE 智能体的开源框架,以及它们改进所需的训练与评估环境。接入你已在用的 60+ 工具"——Apache-2.0,curl|bash 安装,每日构建直至今日首个带 tag 的发布。README 对成熟度毫不讳言:"Public Alpha:核心工作流可用于早期探索,但尚未完全稳定……API 与集成可能变更。"仓库创建于 1 月,但 11.6k★ 攒得很快;v0.1 是第一个发布 tag。

**Why it matters:** 事件响应是迄今尚未拥有"harness + 评估"层的最高风险智能体工作负载,而"训练与评估环境"的提法正是要点所在——把 SRE 智能体当作可基准测试的模型问题,而非聊天集成。v0.1 之前就有 11.6k 星,说明需求侧早已就位。

[`🔗 Tracer-Cloud/opensre`](https://github.com/Tracer-Cloud/opensre) · [`🔗 v0.1 发布`](https://github.com/Tracer-Cloud/opensre/releases/tag/v0.1.2026.10.8)

---

## 28. Anthropic 将 Project Glasswing 并入三级 Cyber Verification Program——为经审核的安全从业者降低拦截

- **Velocity:** ▮▮ rising
- **Source:** Anthropic · Oct 6 宣布
- **Tags:** `anthropic` `cyber` `policy` `agents`

Anthropic 将 Project Glasswing 并入扩展后的 Cyber Verification Program,设三级——Defense、Red Team、Specialized——向符合资质的安全从业者提供"高级网络能力与更低强度的拦截分类器"。其动机基准来自 Anthropic 自己:未加入 CVP 时,CyScenarioBench 上"每个任务都在第一句提示就被拦截";在 Red Team Access 下,零拦截、50 个任务成功 34 个。交换条件写得明明白白:"加入该计划的组织必须接受数据留存,以便我们监控网络滥用。"129k+ 已验证漏洞的数字来自合作方上报,Anthropic 自估真实影响"至少高出五倍"——注意这是它自己的估计。Red Team Access 仅对组织开放。这延续了 Google 为 Gemini 4 Argon 推出的"可信网络防御者"通道——各大实验室正在收敛到同一种准入模型。

**Why it matters:** 网络能力的门控正在各大实验室变成正式、公开披露的分级体系——基准数字、留存条款与准入资格都摆在明面上。对防御者而言,智能体能力从此按"已验证身份"区分,而不再只是按模型;对其他人而言,这就是其他实验室将照抄的模板。

[`🔗 Cyber Verification Program`](https://www.anthropic.com/news/cyber-verification-program) · [`🔗 Project Glasswing`](https://www.anthropic.com/glasswing)

---

## 29. zerobrew 的诚实基准:冷装 6.6 倍、热装 68 倍——"100 倍"只是 100 个包里的 24 个

- **Velocity:** ▮ steady
- **Source:** Hacker News · 94+ pts · ~9h ago(~11:25 UTC+8)
- **Tags:** `homebrew` `rust` `package-managers` `benchmarks`

zerobrew——用内容寻址存储在进程内重定位 bottle 的 Rust 版 Homebrew 替代品——随迁移到 zerobrewhq 组织发布了一份 100 包基准:冷装比 brew 快 6.6 倍,热装快 68 倍。README 对自己的标语两次自打折扣:"100x*"只覆盖"100 个包中热装提速 100 倍以上的 24 个",冷装受链路带宽限制(测试连接上"冷装 3.3 倍"),而且"没有 Homebrew 的 bottle 构建农场,这些数字一个都不存在"。这也是一次带前史的重发:2026 年 1 月的项目,其上一轮病毒式传播曾在 2 月招出〈Reverse engineering a viral open-source launch〉的复盘。7.8k★,Apache-2.0。

**Why it matters:** 一个价值完全派生自别人构建农场的包管理器,在自己的 README 里把这件事说清楚——这正是本信息流纠错政策想要奖励的诚实。而带星号的场景——热装——恰是 CI 里的常态。

[`🔗 zerobrewhq/zerobrew`](https://github.com/zerobrewhq/zerobrew) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50001580)

---

## 30. artcraft:Rust 版"艺术家 IDE"冲上日榜第 3——创始人说"离能用还差得远"

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · 今日 +1,465★(日榜第 3) · 共 6.0k
- **Tags:** `rust` `creative-tools` `ai-art` `open-source`

storytold/artcraft 创建于 2022 年,但 10 月 4 日的 HN 讨论串("用 Rust 写的开源 Adobe 兼容套件",128 pts)把它在今天上午拉到日增 1,465★。这是一款原生 Rust 应用,面向"交互式 AI 图像与视频创作。在 2D 中构图、在 3D 中布景,并选择适合你工作的模型"——v0.41.0 于 9 月 26 日发布,提交持续到 10 月 7 日。创始人在 HN 讨论串里说:"我还没准备好把它发到 HN。它离能用还差得远……这些仍是超级早期的 alpha。"值得记录的注意事项:许可证是自定义 LICENSE.md(GitHub 标为"Other",不是 OSI 许可),Linux 仅支持从源码构建。

**Why it matters:** 一个开放、原生、模型无关的创作 IDE,正好补上 SaaS 生成器与胶水脚本管线之间缺位的那格货架——而创始人在星潮之下的"没准备好"式坦白,是本周"关注度跑在项目自身就绪度前面"的最干净案例。

[`🔗 storytold/artcraft`](https://github.com/storytold/artcraft) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=49958850)

---

## 31. 究竟是谁在撑起互联网:23 个基础项目中有 11 个只靠一两名常规贡献者

- **Velocity:** ▮ steady
- **Source:** Hacker News · 136+ pts · ~6h ago(~14:40 UTC+8)
- **Tags:** `maintainers` `open-source` `bus-factor` `data`

sheets.works 的 Data Drop 统计了 23 个基础项目——SQLite、zlib、curl、bash、xz、时区数据库——2025 年 10 月至 2026 年 10 月完整提交历史中改动 10 次以上的贡献者。结果:"23 个中有 11 个"项目只有一两个人在做常规工作,而 Paul Eggert 业余维护的时区数据库装在"40 亿"台 Android 与 iPhone 设备上。点题引句:"数十亿手机运行在由少数几个人照看的代码上。我们是从代码本身数出来的。"注意:"常规"= 10+ 次提交是一个会低估审阅者与 triage 工作的代理指标——该文自称目标是检验 xkcd 漫画的论断,而非穷尽式审计 bus factor。

**Why it matters:** xkcd 那个数字通常只是段子;这是带了方法论的段子。xz 事件之后,单维护者基础设施是供应链风险类别,不再是道德说教——而提交级统计便宜到可以跑在你自己的依赖树上。

[`🔗 Holding up the internet`](https://sheets.works/data-viz/holding-up-the-internet) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50002494)

---

## 32. 11 个单位方格的最优装箱在 Lean 中获形式化验证——附一句诚实的"非仅内核"声明

- **Velocity:** ▮ steady
- **Source:** Hacker News · 115+ pts · ~22h ago(Oct 7 ~22:10 UTC+8)
- **Tags:** `lean` `formal-methods` `ai-math` `packing`

一个 Lean 4 仓库声称给出了"11 个单位正方形装入最小正方形"的完整机器检查最优性证明:"已完成的 EvolvingPrograms 验证运行接受了全部 7,920 个本地 Lean 模块,最终审计报告零 admissions。"最优值为 T = (6u+4)/(1+2u−u²),其中 u 是 (9/25, 37/100) 上一个八次多项式的根——T ≈ 3.8770835900228141773——确切多项式已公布于 README。证明经 EvolvingPrograms 管线 AI 辅助完成;验证运行于 10 月 6 日完成。README 自己的声明才是承重句:昂贵的数值证书检查使用 `native_decide`,因此"这不是仅内核的验证声明"——它同时信任 Lean 的内核与原生编译器。

**Why it matters:** 一个悬置数十年的开放问题以公开、可重跑的验证方式关闭——而且免责声明是作者主动给出的,不是被追问出来的。把它与今晨"验证不能为翻译背书"的预印本、以及 OpenAI 同周的撤回放在一起读:AI 数学的有趣变量不再是"行不行",而是每一项主张实际携带哪一层的检查。

[`🔗 11SquaresFormalized`](https://github.com/Queuingtheorydotcom/11SquaresFormalized) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=49993121)

---

## 33. Liquid AI 开源 d1:单次前向就出答案的 3B 与 600M"决策模型"

- **Velocity:** ▮ steady
- **Source:** Liquid AI 博客 · Oct 7 · HF 141 likes / 5.4k 下载
- **Tags:** `decision-models` `edge` `open-weights` `liquid-ai`

Liquid AI 发布 d1-3B 与 d1-omni-600M——"不产出 token……在单次前向传播中给出答案"的开源权重模型,分别由其 LFM2.5-VL-3B 与 LFM2.5-Encoder-350M 微调而来。所有声明均在 Liquid 自家的 Decision Index v0.2.1(public split)上自报:48.57,"领先所有 10B 以下模型,与 Decider 35B-A3B——一个体积 12 倍的决策模型——持平",在"RTX 4090 上 8 ms"、Jetson Orin Nano 上约 50 ms。权重已上 Hugging Face(d1-3B 创建于 10 月 5 日,其后有 GGUF 变体)。诚实细节:d1-omni-600M 被标注为"我们的首个实验性检查点"——得分仅 15.95。决策模型浪潮(OpenAI Decisions API、AWS Strands Decider、Cloudflare Clef)自此有了开源权重、亚秒级、可上设备的参赛者。

**Why it matters:** 决策模型正在成为拥有自家基准指数的产品品类,而 Liquid 此举让边缘/自托管档位成真。这条注意事项适用于整个品类:那套指数是厂商自己的。

[`🔗 d1 开源发布`](https://www.liquid.ai/blog/d1-open) · [`🔗 HF 上的 LiquidAI/d1-3B`](https://huggingface.co/LiquidAI/d1-3B)

---

## 34. PoeLLM:3400 台暴露的 AI 服务器被劫持挖矿——经 LiteLLM 漏洞,C2 藏在 GitHub 的一首诗里

- **Velocity:** ▮ steady
- **Source:** Lumen Black Lotus Labs · Oct 7 报告
- **Tags:** `botnet` `litellm` `ai-infra` `cryptomining`

Lumen Black Lotus Labs 的"Canto Incognito"报告记录了一个自 4 月以来拿下 3400+ 台服务器的挖矿僵尸网络,目标是暴露在外的 LiteLLM、Gotenberg、Gitea 与 Ivanti Sentry 实例。与 AI 相关的链路:LiteLLM CVE-2026-42271(MCP 测试端点;NVD Primary 8.8 / GitHub CNA 8.7,已在 v1.83.7-stable 修复)与 Starlette CVE-2026-48710(6.5,已在 1.0.1 修复)串联即可未认证 RCE——经 BleepingComputer 转述 Horizon3 的确认。载荷为 Kryptex 矿池上的 XMRig/Iron 矿机;归因为"中等置信度"的意大利操作者。标志性手法:C2 地址藏在 GitHub 仓库的一首诗里——"每次搭新 C2,他们就改掉诗里的几个词。"

**Why it matters:** AI 基础设施栈——LiteLLM 是事实上的 LLM 代理层——正被按僵尸网络规模收割,而漏洞出自 5 月。暴露的 LiteLLM 实例是预填好的靶子;修复早已存在数月。

[`🔗 BleepingComputer`](https://www.bleepingcomputer.com/news/security/poellm-malware-infects-exposed-ai-servers-in-cryptomining-attacks/) · [`🔗 LiteLLM v1.83.7-stable`](https://github.com/BerriAI/litellm/releases/tag/v1.83.7-stable)

---

## 35. Google 发布 Developer Knowledge API:把自家文档做成 Markdown,走 MCP 供给

- **Velocity:** ▮ steady
- **Source:** Google Developers Blog · Oct 7
- **Tags:** `google` `documentation` `mcp` `agents`

Google 宣布推出 Developer Knowledge API——"关于 Google Cloud、Firebase、Android 及更多产品开发者文档的官方程序化事实来源"——"以结构化 API 取代脆弱的网页抓取,提供新鲜的 Markdown 格式文档",带语义与关键词搜索、文档分块与有据问答。它以 MCP 服务器的形式提供,"覆盖 Google Antigravity、Claude Code、Cursor、GitHub Copilot",另有 gcloud CLI 入口与可安装的 agent skill(`npx skills add google/skills`)。帖子中的注意事项:未说明 Preview/GA 阶段,`BatchGetDocuments` 单次调用上限 20 篇文档,且文档索引存在滞后。

**Why it matters:** 智能体之所以幻觉出 API,多半因为它们获取文档的方式是抓取。当平台所有者直接供给权威 Markdown 加 MCP,文档层就成为了智能体基础设施——可以预期一年内所有主要文档体系都会被倒逼跟进。

[`🔗 Google Developers Blog`](https://developers.googleblog.com/supercharge-your-development-with-the-google-developer-knowledge-api-ecosystem/) · [`🔗 Developers Blog 列表页`](https://developers.googleblog.com/)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-10-08T12:25:00Z |
| Items | 35 |
| Sources tracked | 28 (Hacker News, GitHub Trending/API, NVD, jira.atlassian.com, anthropic.com, openai.com, developer.chrome.com, arxiv.org, blog.cloudflare.com, docs.nvidia.com, reuters.com, blog.google, news.mit.edu, refactoringenglish.com, cua.ai, ascii.rest, bigwords.page, rswebsols.com, BleepingComputer, The Hacker News, JFrog Research, npm registry, Mathstodon, scottaaronson.blog, Hugging Face, Liquid AI, Google Developers Blog, sheets.works) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[Previous day](2026-10-07.md) · [Raw .md](latest.md) · [Archive](../archive/index.md)
