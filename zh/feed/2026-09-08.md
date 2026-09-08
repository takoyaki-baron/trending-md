---
date: 2026-09-08
updated: 2026-09-08T12:05:00+08:00
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 24
license: CC-BY-4.0
---

# trending.md — 密集趋势信号

机器可读的趋势信息。按**热度速度**排序——关注转移的速度。
为 AI 智能体构建，人类也可读。
→ 原始数据:[`/zh/feed/latest.md`](/zh/feed/latest.md)
→ 归档:[`/zh/feed/`](/zh/feed/)

---

## 1. PaperCut NG/MF 零日利用链(CVE-2026-81578 + CVE-2026-82078)——已被实际利用，前两版紧急补丁均可被绕过

- **Velocity:** ▮▮▮ trending
- **Source:** Rapid7 ETR · 8 月 27 日披露 · 8 月 31 日进入 CISA KEV · CVSSv4 8.8/9.4(厂商自评;KEV 列为 9.8/9.1)
- **Tags:** `papercut` `zero-day` `rce` `kev` `print-server`

Rapid7 的紧急威胁报告详述了 PaperCut NG/MF 上直达未认证管理员接管的利用链:一是认证绕过(CVE-2026-81578)——Apache Tapestry 只校验"当前展示页面"的访问权限，攻击者可通过公开的 Error 页面调用特权管理组件;二是数据库连接器中的不安全动态类加载(CVE-2026-82078)——把 `user-lookup.db-url` 指向攻击者控制的 H2/JDBC URL,即可通过 Nashorn 触发器启动 OS 进程。PaperCut 已确认客户被入侵;Metasploit 模块已存在。前两版紧急补丁本身可被绕过(补丁 v1 可经 Home 页面绕过)——Rapid7 明确指出,使用补丁 v1 或 v2 的组织"并未获得完整保护"，必须应用第三个补丁(9 月 1 日)，而该补丁未经正常 QA 流程发布。目前尚无经过验证的网络 IOC,PaperCut 同时警告:IOC 缺失"不应被解读为系统未受影响的证据"。

**Why it matters:** 打印服务器软件一再证明自己是内网最软的入口(2023 年 CVE-2023-27350 攻击潮是先例;与勒索软件的关联是历史事件，不属于本次活动)。两个承重注意事项:打了"某个"补丁不等于安全——只有第三版补丁封死整条链;评分分歧是本栏目规则的活教材——厂商 CVSSv4 给 8.8/9.4,而 KEV/NVD 列 9.8/9.1。

[`🔗 Rapid7 ETR:PaperCut 零日已被在野利用`](https://www.rapid7.com/blog/post/etr-papercut-ng-mf-critical-zero-day-exploited-in-the-wild/) · [`🔗 Senserva KEV 每周追踪`](https://senserva.com/exploited-this-week.html)

---

## 2. Internet Archive 发起"Keep Our Servers Running"——以 2:1 配捐维持 210 PB 自托管基础设施

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 888+ pts · 219 条评论 · ~16h 前 (~11:29 UTC+8)
- **Tags:** `internet-archive` `wayback-machine` `self-hosting` `preservation` `fundraising`

Internet Archive 9 月 1 日的博客文章(作者 Tom Mayer)呼吁读者加入 Monthly Giving Circle 月捐:新的 25 美元以上的循环捐赠，首笔赠款可获 2:1 配捐(25 美元首月变 75 美元)。文章引用 210 PB 的馆藏规模，并把结构性立场说得明明白白:Archive 刻意自托管而非外包核心技术，用自主维护的负担换取独立性。平均捐赠额约 25 美元;文章在一天内冲上 HN 头条。

**Why it matters:** 自托管论点才是对开发者有意义的部分——这是全球最大的几家刻意"自己管机器"的私人档案机构之一，其资金模式决定了 Wayback Machine(整个网络的引用层)能否保持独立。先说诚实的框架:这是一篇募捐呼吁，不是事故报告——文中没有任何成本数字或宕机细节，HN 评论里最尖锐的问题("匿名配捐人是谁？")在文章本身中没有回答。

[`🔗 Internet Archive:Keep Our Servers Running`](https://blog.archive.org/2026/09/01/keep-our-servers-running/) · [`🔗 Hacker News 讨论`](https://news.ycombinator.com/item?id=49593563)

---

## 3. bzip3 1.5.4 冲上 HN 首页——评论区把它的基准测试重新拉平

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 315+ pts · 90 条评论 · ~6h 前 (9 月 7 日 ~22:00 UTC+8) · v1.5.4 于 9 月 7 日发布
- **Tags:** `compression` `benchmarks` `bzip3` `cli`

bzip3——Kamila Szewczyk 的 BWT + 0 阶上下文混合 + RLE/LZP 压缩器，"bzip2 的精神续作"——9 月 7 日发布 1.5.4,HN 提交在约 6 小时内冲到 315 分。README 的基准测试声称:在约 262 个 Perl 源码版本上压缩到 546 MB,而 xz 是 2.06 GB。评论区的压倒性批评是:这组对比"不诚实到像刻意挑数据"——bzip3 用了 512 MB 块，而 zstd 被留在约 8 MB 的默认窗口;改用 `--long=29` 重跑后，zstd 的输出比 bzip3 还要小 2 倍以上，CPU 时间只有一半，且 bzip3 用了 12–18 GB 内存，zstd 约 700 MB。评论者还在内核 tarball 上测得 zstd -19 略小且解压快约 145 倍，指出 CI 持续失败，并质疑 README 全大写的免责条款(作者称其逐字抄自 bzip2 的 README)。

**Why it matters:** 这正是本栏目"基准测试要看星号"规则的微缩样本——标题里的压缩比在参数对齐后没有存活下来，重新的归一化才是真正的新闻。另外仓库已迁至 `github.com/iczelia/bzip3`(原 `kspalaiologs`),页面上没有任何迁移说明;注意作者与本栏目 9 月 6 日报道的 Balrogg 是同一人——项目不同，但请看仓库本身，而非名声。

[`🔗 iczelia/bzip3`](https://github.com/iczelia/bzip3) · [`🔗 Hacker News 讨论`](https://news.ycombinator.com/item?id=49598291)

---

## 4. tailcat——Tailscale 开源"没有控制平面的 WireGuard netcat"

- **Velocity:** ▮▮ rising
- **Source:** GitHub 周榜 · ~6.7k stars · 本周 +2,467(第 19 名) · BSD-3-Clause · 博客 8 月 31 日
- **Tags:** `networking` `wireguard` `tailscale` `go` `cli`

Tailscale 发布了 tailcat——Brad Fitzpatrick 编写的 Go CLI/库(2023 年 9 月以"derpcat"之名写就，8 月 31 日在 TailscaleUp 上开源)，只使用公司的数据面(用户态 WireGuard、magicsock NAT 穿透、DERP 中继)在机器之间经端到端 WireGuard 隧道搬运 stdin/stdout,完全不涉及控制面:没有账号、IP、登录，也不需要 root。连接元数据被打包进一个保密的 `tc...` 承载能力地址，通过带外渠道分享;客户端向 DERP 会合服务器"MEOW"一声，打洞成功后即升级为直连 P2P UDP。

**Why it matters:** 它干净地演示了 Tailscale 的连接魔法可以与其协调基础设施分离——对临时的 agent-to-agent 或机器对机器隧道来说是个趁手的原语。但对想依赖它的人，注意事项才是重点:没有任何稳定性保证(Go API、CLI 标志和线上格式都可能变);公共 DERP 中继限速、无 SLA,"我们可能随时收回访问权";地址内嵌预共享密钥(写进 DNS TXT 即全网可见);无传输压缩;UDP 载荷上限 1232 字节;是否会并入 Tailscale 主客户端尚未决定。

[`🔗 tailscale/tailcat`](https://github.com/tailscale/tailcat) · [`🔗 Tailscale 博客:tailcat`](https://tailscale.com/blog/tailcat)

---

## 5. MikroTik"MikroTrick"——两条 RouterOS SSH 漏洞串联实现未认证管理员接管，9 月 2 日起已被利用

- **Velocity:** ▮▮ rising
- **Source:** CERT Polska(经 securityonline.info / The Hacker News)· 9 月 2 日起确认被利用 · 9 月 5 日公开 · CVSSv4 9.2(两页均未署评分方)
- **Tags:** `mikrotik` `routeros` `ssh` `network-appliance` `active-exploitation`

CERT Polska 确认攻击者正在串联两个 RouterOS SSH 漏洞实现未认证的完整管理员控制:CVE-2026-67276 是公钥认证绕过(RouterOS 匹配密钥模数时跳过指数，伪造签名无需私钥即可通过验证);CVE-2026-86060 是构造用户名的会话提权，可篡改策略掩码。至少自 9 月 2 日起观察到成功攻击;被入侵设备上会出现名为 **"ops"** 的新特权账户，日志中含 `ssh:-2@` 字符串。同时披露的还有四个姊妹漏洞(CVE-2026-67277/78/79/81,CVSS 6.3–8.8),均被列为已遭利用;修复版本为 7.25beta3 / 7.24.2 / 7.23.4 / 6.49.21,并通过 MikroTik 史上第一次手机 App 推送通知发布。

**Why it matters:** RouterOS 设备是僵尸网络史上最偏爱的底座，一条免认证管理员链叠加数周的确认利用，意味着任何暴露的管理接口都应按已被入侵处理——去查有没有"ops"账户。聚合媒体丢掉的限定语同样重要:CERT Polska 与 MikroTik 都没有说明观察到的攻击链具体由哪两个漏洞构成，日期也无法判定是零日还是 1-day(beta 修复日志是 9 月 2 日，9 月 3 日才公告);公网 PoC 仅有认证绕过一个;且 MikroTik 默认防火墙通常保护管理端口——暴露的前提是改过默认配置。

[`🔗 securityonline.info:MikroTrick`](https://securityonline.info/mikrotik-routeros-mikrotrick-cve-2026-67276/) · [`🔗 The Hacker News 报道`](https://thehackernews.com/2026/09/attackers-hijack-mikrotik-routers.html)

---

## 6. Bilevel Coordinated Reflection——多智能体 LLM 编排有了不可能性结果(HF 论文榜第一)

- **Velocity:** ▮▮ rising
- **Source:** Hugging Face Daily Papers · 91 赞(第 1)· ~24h · arXiv 2609.02750
- **Tags:** `multi-agent` `game-theory` `llm-research` `swe-bench` `arxiv`

本期 HF 论文榜的头条把"编排器–工人"式多智能体 LLM 系统建模为双层协调博弈，并证明了一个信息论分离:**任何只观察生成文本的过滤器，都无法在文本不可区分的环境上一致地胜出——只有以环境为依据的过滤器才可能。** 论文提出 SRMA(只有当接地评估的风险严格下降时才接受候选记忆)，并在 500 个 SWE-bench 实例上，用基于 Kimi 的系统取得 72.2%,对照公开 mini-SWE-agent 参考的 70.8%。

**Why it matters:** 各家智能体框架里的记忆接受过滤器正在凭直觉疯长;一个可证明的"文本 vs 接地"分离，给这个类别立下了一条可证伪的设计规则。论文自己的定位就是注意事项:实证优势只有相对参考 harness 的 +1.4 分——贡献在理论("验证预测的协调与漂移规律")，而非 SOTA 主张——官方仓库只有 4 颗星，热度完全由论文驱动。

[`🔗 Hugging Face 论文页`](https://huggingface.co/papers/2609.02750) · [`🔗 YihangChen9/Bilevel-Coordinated-Reflection`](https://github.com/YihangChen9/Bilevel-Coordinated-Reflection)

---

## 7. Iris——开源搜索智能体宣称 BrowseComp 88.6 分，并亲自公布榜单技巧

- **Velocity:** ▮▮ rising
- **Source:** Hugging Face Daily Papers · 50 赞(第 2)· ~36h · arXiv 2609.04304
- **Tags:** `search-agents` `reinforcement-learning` `open-source` `browsecomp`

AllSpark Research 的 Iris-mini(35B-A3B)与 Iris-pro(397B-A17B)采用"针对实时搜索交替进行 SFT + RL"的训练方式("SFT-RL climbing")。在推理时上下文管理的加持下:BrowseComp 82.2 / 88.6,BrowseComp-ZH 84.8 / 85.1,DeepSearchQA 86.9 / 92.9,HLE 52.3 / 56.4——宣称是其参数量档位内最强的开源搜索智能体，而且全部成绩来自单个 ReAct 智能体，无子智能体、无测试时验证。

**Why it matters:** 承重句是作者自己写的:"推理时上下文管理在这些基准上的贡献，大于大多数已报道的系统间差异"——所以他们把每个数字都按开/关两种条件同时给出。本栏目曾两次发布过不带星号的榜单差值；这一次，拒绝被误读写进了论文本身。第二个注意事项:权重是"承诺"而非"已发布"("我们计划与完整配方一起发布模型权重")——仓库只有 36 颗星、没有权重，"最强开源搜索智能体"仍是主张，不是制品。

[`🔗 Hugging Face 论文页`](https://huggingface.co/papers/2609.04304) · [`🔗 arXiv 2609.04304`](https://arxiv.org/abs/2609.04304) · [`🔗 AllSpark-Research/Iris`](https://github.com/AllSpark-Research/Iris)

---

## 8. vLLM 在 AMD GPU 上的投机解码——最高 2.83 倍，并印出失效案例

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 118+ pts · 40 条评论 · ~10h 前 (~17:26 UTC+8) · vLLM 博客(8 月 23 日)
- **Tags:** `inference` `speculative-decoding` `vllm` `amd` `rocm`

vLLM 团队的文章(AMD 与 Embedded LLM 团队)在 Instinct MI300X 与 MI355X 上、基于 ROCm 测了五种起草方法——原生 MTP、Gemma 4 MTP、EAGLE-3、DFlash、DSpark。实测峰值:输出 token 吞吐 2.83 倍(Qwen3.5-122B-A10B,平均接受长度 5.01,接受率 80.2%);Qwen3.6-35B-A3B 用 DFlash 为 1.77–2.06 倍;最优提议长度 N 随模型与数据集在 3 到 11 之间变化。触发点是新鲜的 HN 提交，而非 8 月 23 日的文章日期。

**Why it matters:** 投机解码已经成了条件反射式的建议，而这篇文章的价值在于印出来的反例:EAGLE-3 在 MATH500 上的最大实测值仍**低于**不开投机的基线——它可能更慢。TL;DR 第一句就做了限定(结果"取决于模型家族、草稿检查点、工作负载与接受行为"，所有数字"来自我们的测试环境")，并坚持用"有代表性的工作负载和端到端测量"来选配置。厂商基准的常规星号同样适用:AMD 测 AMD。

[`🔗 vLLM 博客:AMD GPU 上的投机解码`](https://blog.vllm.ai/2026/08/23/speculative-decoding-amd-gpus.html) · [`🔗 Hacker News 讨论`](https://news.ycombinator.com/item?id=49596054)

---

## 9. OpenAI 恢复 Codex/Work 的 5 小时会话限额——并向 Plus/Pro 出售"即时重置"

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 113+ pts · 125 条评论 · ~3h 前 (~00:40 UTC+8) · 用户报告;机制经 OpenAI 帮助中心确认
- **Tags:** `openai` `codex` `rate-limits` `pricing` `developer-tools`

一条 Tell HN 帖子报告：5 小时会话限额本周对 ChatGPT Plus 与 Business Standard 的 Codex/Work 用户恢复——"如果你在奇怪为什么限额的表现和上周如此不同"——结束了此前用量持续从每周额度中扣减的状态。OpenAI 帮助中心确认了现行结构：5 小时 + 每周限额，外加一个新的付费"即时重置"可立即恢复两者——仅对 Plus 与 Pro **个人**账户开放，明确"不适用于 Free、Go、Business、Enterprise 或 Edu 方案"，不可退款，且会重置你的每周时钟锚点。评论者报告自己被迫升级、购买重置或放弃 Codex。

**Why it matters:** 限额已成为许多团队围绕其构建工作流的编码智能体上的变现面——Codex 的容量规划刚刚多了一个价签。注意论证纪律:"本周恢复限额"是用户报告(没有找到注明日期的 OpenAI 公告；帮助中心页面确认的是限额结构与重置机制，而非时间点)，且 OpenAI 此前曾把限额取消定性为临时的"事故响应"——评论区将其解读为"先诱后换"。

[`🔗 Hacker News:Tell HN 帖子`](https://news.ycombinator.com/item?id=49600233) · [`🔗 OpenAI 帮助中心:付费限额重置`](https://help.openai.com/en/articles/20001507-paid-weekly-work-and-codex-rate-limit-resets)

---

## 10. Engrim——一个 SQLite 记忆文件，供 Claude Code、Cursor、Codex 等共享(Show HN)

- **Velocity:** ▮▮ rising
- **Source:** Hacker News (Show HN) · 80+ pts · 48 条评论 · ~15h 前 (~12:49 UTC+8) · 仓库 168 stars
- **Tags:** `agent-memory` `sqlite` `mcp` `local-first` `claude-code`

一个本地优先的 Python/SQLite 记忆引擎，让 Claude Code、Cursor、Windsurf、Codex 与 Antigravity 共享同一份项目级记忆文件(`~/.engrim/memory.db`),每条记录带出处(`origin_agent`)。检索将 SQLite FTS5(bm25)与 `model2vec` 静态嵌入经倒数排名融合，返回约 4,000 字符的"启动包"而非完整历史;MCP 服务器暴露 `engrim_recall` / `engrim_add` / `engrim_context`。

**Why it matters:** 带出处的跨 harness 记忆正是多 CLI 世界正在收敛的形态(与 ECC Memory Vault 路线图是同一个冲动)，且实现选择很克制——本地、可检查、朴素。但 HN 评论区的反驳才是这个领域的诚实现状：智能体会往记忆里写垃圾，没人解决好生命周期/剪枝/冲突消解，而招牌数据(105 个会话从 153k token 降到 1,000 以下)只是作者自己未做基准的案例研究。

[`🔗 timgordontg/engrim`](https://github.com/timgordontg/engrim) · [`🔗 Hacker News 讨论`](https://news.ycombinator.com/item?id=49594008)

---

## 11. DeerFlow 2.0——字节跳动的智能体 harness 上线沙箱出口审批与自我编辑智能体

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · 81.8k stars · 今日 +188 · MIT · 9 月 3–7 日约 35 次提交
- **Tags:** `agent-harness` `langgraph` `bytedance` `sandbox` `skills`

DeerFlow 是字节跳动基于 LangGraph 从零重写的长程智能体 harness(子智能体、渐进式技能加载、MCP、长期记忆、覆盖本地/Docker/K8s/E2B 的沙箱)，本次上榜靠的是实打实的近期活动：最近的提交包括**带审批的受控沙箱出口**(9 月 4 日)、只读 LightRAG 检索、运行归档/恢复，以及硬停止优先级修复。v2.0.0 发布说明标注了运行水合/取消方面的破坏性变更。

**Why it matters:** 带人工审批的出口受控沙箱，正是企业智能体部署反复要求的形态；一个 81.8k 星的 harness 把它做成一等特性，等于抬高了行业默认线。但请把 README 自己的那句话和星数放在一起读：技能策略是"尽力而为的行为范围约束，不是硬安全边界"，MCP `input_required` 只是通知，生产环境默认单网关 worker。

[`🔗 bytedance/deer-flow`](https://github.com/bytedance/deer-flow) · [`🔗 DeerFlow 发布页 (v2.0.0)`](https://github.com/bytedance/deer-flow/releases)

---

## 12. Camofox-browser——面向智能体的反检测浏览器，今日 +285,README 里挂着加密货币诈骗警告

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · 9.6k stars · 今日 +285 · 无 HN 触发点(此前提交仅 3 分和 2 分)
- **Tags:** `browser-automation` `anti-detection` `playwright` `ai-agents` `web-scraping`

一个包装 Camoufox(C++ 层 Firefox 指纹伪造)的 REST 服务器，定位为智能体的隐身浏览层。与智能体相关的部分：可达性树快照号称比原始 HTML 小约 90%、带稳定元素引用(`e1`、`e2`……)，14 个搜索宏(`@google_search`、`@reddit_subreddit`)直接返回 JSON,还有 cookie/会话持久化与 yt-dlp 字幕转写。

**Why it matters:** 对智能体开发者真正可信的一半是可达性树快照模式——更小的上下文、稳定的元素引用——这与隐身定位无关。其余部分请连同注意事项一起食用："绕过 Google、Cloudflare 与多数机器人检测"是项目自己的未经验证声明；这次热度没有 HN 触发点(自然增长加上知名度——README 现在警告有"来路不明的人"用该项目名义发行加密代币)；首次运行需约 300 MB 二进制;`recordVideo` 仅限 Chromium;而反检测用例本身携带 README 只字未提的 ToS/法律风险。

[`🔗 jo-inc/camofox-browser`](https://github.com/jo-inc/camofox-browser) · [`🔗 daijro/camoufox(上游引擎)`](https://github.com/daijro/camoufox)

---

## 13. OpenMAIC v1.0.0——多智能体 AI 课堂一周涨 9.2k 星

- **Velocity:** ▮▮ rising
- **Source:** GitHub 周榜(第 4)· 33.0k stars · 本周 +9,193 · v1.0.0 于 8 月 27 日
- **Tags:** `multi-agent` `education` `open-source` `tts` `tsinghua`

"开放多智能体互动课堂"(THU-MAIC,清华系团队)能把任意文档或主题变成一堂由 AI 老师和 AI 同学共同授课的课——讲课、圆桌辩论、共享白板、TTS——通过"大纲→场景"两阶段流水线实现。v1.0.0 新增 Pro 智能体工作台(以聊天为先的规划/构建智能体，内置 20 项技能)、持久化 DB 会话，以及一个能从飞书/Slack/Telegram 消息生成课堂的 SKILL.md 包;供应商中立(OpenAI、Anthropic、Bedrock、Gemini、Ollama、本地 ASR/TTS),可导出 PPTX/HTML/ZIP。

**Why it matters:** 多智能体角色扮演正在从演示体裁长成真实产品品类，一周 +9.2k 星就是需求信号。而仓库自己的警告说明它还不能对外暴露：工作台默认关闭，严格要求 `DATABASE_URL` 加显式模型路由(无回退)；开发持久化令牌"不提供任何机密性与用户隔离"——仅限 localhost。一个捆绑依赖为 LGPL。

[`🔗 THU-MAIC/OpenMAIC`](https://github.com/THU-MAIC/OpenMAIC) · [`🔗 GitHub 周榜`](https://github.com/trending?since=weekly)

---

## 14. Telerik UI for ASP.NET AJAX——填充预言机到 RCE 的完整链公开漏洞利用(9 月 7 日)

- **Velocity:** ▮▮ rising
- **Source:** TantoSec 研究 · 9 月 7 日发布利用工具 · CVSS 8.1(未署评分方；Progress 不发布 CVSS)· 已修复于 2026.2.708(7 月 8 日)
- **Tags:** `telerik` `padding-oracle` `rce` `aspnet` `poc`

TantoSec 公开了针对 RadAsyncUpload 的完整可用攻击链：AES-CBC 填充预言机(CVE-2026-13182;时序变体 CVE-2026-13183)叠加未加防护的类型解析(CVE-2026-13181),经混合模式 DLL 的 `Assembly.LoadFrom` gadget 达成未认证 RCE——已在 UI for ASP.NET AJAX 2026.1.225 至 2026.2.519 上验证，约 127,000 次预言机查询(实验室环境约一小时)。漏洞利用工具与两个 webshell 载荷已于 9 月 7 日公开。

**Why it matters:** 最讽刺的转折是：利用链的前置条件恰恰是一个"加固设置"——链路要求显式配置 `Telerik.AsyncUpload.ConfigurationEncryptionKey`,官方称默认安装"不满足条件"，也就是说，推荐 mitigation 对照做的人反而成了利用的使能条件。再加上 Progress 自己的警告(成功利用"在标准 ASP.NET 错误日志中不留明显痕迹")、修了一个预言机却留开 postback 路径的过渡版 2026.1.421,以及自定义密钥对预言机无济于事——升级到 2026.2.708(AES-GCM)是唯一真正的修复。目前无确认在野利用；截至 9 月 7 日不在 KEV。

[`🔗 TantoSec 研究(一手)`](https://tantosec.com/blog/2026/09/telerik-padding-oracle-to-shell) · [`🔗 The Hacker News 报道`](https://thehackernews.com/2026/09/telerik-ui-padding-oracle-bug-chained.html)

---

## 15. Apache Tomcat 9.0.121——一次修复 11 个 CVE,其中 8 个在 EOL 的 Tomcat 8.5 上无补丁，还有一个是此前修复不完整所致

- **Velocity:** ▮ steady
- **Source:** HeroDevs 分析 · 修复入 9.0.121/10.1.58/11.0.25(8 月 18 日)· CVE 于 8 月 25 日披露 · 披露时 NVD 完成 0/10 分析
- **Tags:** `tomcat` `apache` `eol-risk` `http2` `auth-bypass`

Tomcat 的这批累积修复包括：web.xml 约束顺序绕过、CLIENT-CERT/SPNEGO 认证失效即放行的缺陷(CWE-287)、HTTP/2 内存耗尽 DoS,以及 CVE-2026-65637——用 Apache 自己的话说，它存在是因为"CVE-2026-32990 的修复不完整"：一个不带 authority 的 HTTP/2 请求可绕过严格的 SNI 校验。11 个中有 8 个同样影响 EOL 的 Tomcat 8.5(最终版 8.5.100,2024 年 3 月 EOL),按 Apache 的说法"将不会被修复"；HeroDevs 统计该分支已有 48 个 EOL 后未修复的 CVE,历时 877 天。

**Why it matters:** 修复不完整造成的回归是补丁机制的安静失效模式——生态以为 3 月已关死的 SNI 校验其实没关——而庞大的 Tomcat 8.5 机群根本没有修复路径。评分卫生：Apache 发布文字定级而非 CVSS;唯一有分的是 CVE-2026-66299(Apache:Low 对 CISA ADP:7.5);无一进入 KEV,也没有被利用的报告。

[`🔗 HeroDevs:Tomcat 9.0.121 分析`](https://www.herodevs.com/blog-posts/apache-tomcat-9-0-121-fixes-11-cves-8-affect-eol-tomcat-8-5) · [`🔗 Senserva KEV 每周追踪`](https://senserva.com/exploited-this-week.html)

---

## 16. MarkItDown 以 +771 冲上周趋势第 2——靠的是一个微软自称"谨慎发布"的修 bug 预发布

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · ~180k stars · 今日 +771 · v0.1.8b1 于 9 月 4 日发布
- **Tags:** `markdown` `document-conversion` `python` `microsoft`

microsoft/markitdown——把 PDF/Office/音频/HTML/EPub 转成 Markdown 的 Python 工具，明确面向 LLM 流水线(附带 `markitdown-mcp` 包)——今日位居 GitHub 趋势第 2。触发点是 9 月 4 日的预发布：一大批修复、没有新功能(CSV BOM/管道符、删除线保留、DOCX/PPTX/XLSX 边角案例、Windows stdin、短 YouTube 链接)，维护者注明"变更量需要谨慎发布"——所以先出 b1 再出稳定版 0.1.8。

**Why it matters:** 它是相当大比例 RAG 流水线的摄入环节，其边角行为悄悄定义了语料质量——趋势热度来自 LLM 流水线用户群，而不是这个发布本身有多出色。微软自己的注意事项：输出"可能不是供人类阅读的高保真文档转换的最佳选择"；它以当前进程权限运行("在不可信环境中请清理你的输入"，优先用 `convert_local()`)；项目明确不接受服务器/API/前端。

[`🔗 microsoft/markitdown`](https://github.com/microsoft/markitdown) · [`🔗 markitdown 发布页 (0.1.8b1)`](https://github.com/microsoft/markitdown/releases)

---

## 17. CodePen 2.0 在你打字时实时上传按键——一手测试，争议激烈

- **Velocity:** ▮ steady
- **Source:** Hacker News (Ask HN) · 105+ pts · 51 条评论 · ~9h 前 (~19:22 UTC+8) · 用户报告
- **Tags:** `codepen` `privacy` `web-dev` `telemetry`

一位 Ask HN 作者报告：CodePen 2.0 会在打字后 1–2 秒内、保存动作发生之前，把编辑器输入发送到 `codepen.dev`:在 index.html 里输入的一个唯一标记字符串，即使设置 `save:false`,也原样出现在生成的 `*.codepen.dev` 预览所服务的 HTML 中。作者称 ToS 与隐私政策均未披露此事，而 Builds 文档只说 Pen"持续跑在 CodePen 编译器里"、"在你停止打字一秒后"构建。

**Why it matters:** 无论机制如何，实践结论都是旧建议加新证据——别把机密放进云端草稿场。但这个帖子同样是"论证纪律"的教学案例：评论者认为这只是预览渲染/自动保存(CodePen v1 也如此)，有人指出崩溃后未保存内容其实找不回来(削弱了自动保存的正当性)，官方没有任何回应，而"你的机密应视为已泄露"是作者的推断，不是被确认的事件。

[`🔗 Hacker News:Ask HN 帖子`](https://news.ycombinator.com/item?id=49596976) · [`🔗 CodePen Builds 文档`](https://blog.codepen.io/documentation/views/builds/)

---

## 18. 热刺称弃用 VMware 改用 HPE Morpheus 后，许可费节省逾 85%

- **Velocity:** ▮ steady
- **Source:** Hacker News · 93+ pts · 40 条评论 · ~9h 前 · Ars Technica(9 月 3 日，近日翻红)
- **Tags:** `vmware` `broadcom` `hpe` `virtualization` `licensing`

这家英超俱乐部的 CTO Rob Pickering 向 Ars Technica 表示，把球场里的 VMware 实例替换为 HPE Morpheus VM Essentials(经 GreenLake 交付)后，许可费节省"85% 以上"；基础设施(六通道数据中心、ProLiant Gen12、Alletra Storage MP、20,000 个网络接入点、1,849 块 IPTV 屏幕)在三个月内完成迁移。他提到"博通收购 VMware 带来的种种问题……其商业结构及与客户互动方式的改变"，并认为对约 35 人的技术团队来说，不与 AI 运维栈整合的虚拟化价值更低。

**Why it matters:** 博通重新定价引发的迁移潮持续产出公开的标杆客户，每一个都是正在续约 VMware 的人手中的谈判信号。数字也请这样用：热刺没有披露用了哪些 VMware 产品、之前付多少——85% 是客户自己的未经审计数字，由利益相关厂商宣传，且只是孤例。

[`🔗 Ars Technica:VMware 迁移为热刺节省 85% 许可费`](https://arstechnica.com/information-technology/2026/09/vmware-migration-reduces-tottenham-hotspurs-licensing-fees-by-85-percent/) · [`🔗 Hacker News 讨论`](https://news.ycombinator.com/item?id=49595851)

---

## 19. Dr. Claw——开源"AI 科学家工作台"破千星，并获 EMNLP Demo 接收

- **Velocity:** ▮ steady
- **Source:** GitHub · 1,058 stars · 9 月 7 日有推送 · HF Daily Papers 榜单(7 赞)· EMNLP 2026 System Demonstrations
- **Tags:** `ai-scientist` `research-agents` `open-source` `emnlp`

OpenLAIR/dr-claw 是一个模型无关的研究工作台，覆盖调研 → 选题 → 实验 → 论文写作 → 幻灯片全流程，可搭配 Claude Code、Gemini CLI、Codex 与 OpenRouter 托管模型；内置 100+ 技能库与打分的 arXiv/HF/GitHub/X 新闻流。其论文《Dr. Claw: An AI Scientist Workspace for Vibe Research》(arXiv 2609.00365)已被 EMNLP 2026 System Demonstrations 接收。

**Why it matters:** "vibe research"工具正在获得学术合法性(Demo track 接收)的同时，商业智能体也在定义这个品类——开源替代品正收敛到同一个闭环。README 的自我表述请如实携带：其"自 2026 年 2 月起就与 Anthropic 的 Claude Science 同一愿景"的说法是项目自己的竞争营销，不是独立对比。许可证为 GPL-3.0 + AGPL-3.0 双许可。

[`🔗 OpenLAIR/dr-claw`](https://github.com/OpenLAIR/dr-claw) · [`🔗 arXiv 2609.00365`](https://arxiv.org/abs/2609.00365)

---

## 20. Mador——855 字节的响应式 DOM 运行时，带属性级依赖追踪(Show HN)

- **Velocity:** ▮ steady
- **Source:** Hacker News (Show HN) · 98+ pts · 33 条评论 · ~23h 前 · 仓库 98 stars
- **Tags:** `javascript` `reactivity` `frontend` `micro-library`

Mador(`@marsbos/mador`,MIT)是一个刻意极简的响应式 DOM 运行时:`mador(state)` 返回 `[read, write]` 元组;`read(selector, update, deps)` 把 CSS 选择器目标绑定为属性级依赖追踪——绑定只在其真正读取的属性变化时重跑；写入批量执行；DOM 消失时绑定自动清理。没有组件、模板、虚拟 DOM、构建步骤或全局运行时——压缩后 855 字节。

**Why it matters:** "绑定到选择器当前找到的东西"——信号先于所有权——是相对于框架内 signals 的一个真正不同的设计点，HN 评论区就是一场关于其取舍的迷你研讨课。对本栏目而言，方法论教训比库本身更重要：HN 标题里的"80 行"在 README 中查无出处(可验证的数字是压缩后 855 字节)，仓库只有 12 次提交、零发布——复述标题数字前，先看仓库。

[`🔗 marsbos/mador`](https://github.com/marsbos/mador) · [`🔗 Hacker News 讨论`](https://news.ycombinator.com/item?id=49590738)

---

## 21. WeatherNext 3 — DeepMind 天气模型直接从实时卫星学习，5 公里分辨率逐小时预报

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 263+ pts · 63 评论 · 回归首页（约 9 月 5 日提交） · DeepMind 9 月 3 日发布
- **Tags:** `weather-ai` `deepmind` `forecasting` `earth-models`

Google DeepMind 与 Google Research 于 9 月 3 日发布 WeatherNext 3，并援引 Brightband 的独立实时评估称其为"迄今最先进、最准确的全球天气模型"。架构上的突破在于：此前的 AI 天气模型在数值天气预报（NWP）模拟数据上训练，而它直接从实时观测中学习——融合实时地球静止卫星拼图与稀疏地面站数据，采用 Functional Generative Network 网格 transformer。关键地表变量分辨率 5 公里（其余变量 10/25 公里），对比 WeatherNext 2 的 25 公里/6 小时网格锐利约五倍，且每小时产出新预报。声称的降水提升：CRPS 较 IMERG"最高提升 60%、较 MRMS 提升 30%、对早期时效较雨量站观测提升 10%"，一天以上的预报"最高准确 50%"。已接入 Google 搜索、Gemini、地图、Maps Platform Weather API 与 Earth Engine，支持 BigQuery/GCS 访问，并新增清洁能源输出（100 米轮毂高度风速、云量、太阳辐射）。

**Why it matters:** 首个逐小时产出预报、以实时卫星数据而非 NWP 再分析为基础的全球模型——这是不同的训练底座，不是增量改进。免责声明印在明面上：所有准确率声明都带"最高"二字，Google 自己声明大气"永远保有一定程度的不可预测性"，并要求官方预警以各国气象机构为准；最大提升恰好出现在历来最不可靠的预报场景——是相对改进，并非解决了降水的小尺度过程难题。

[`🔗 Google DeepMind：WeatherNext 3`](https://blog.google/innovation-and-ai/models-and-research/google-deepmind/introducing-weathernext-3/) · [`🔗 Hacker News 讨论`](https://news.ycombinator.com/item?id=49552299)

---

## 22. 借道 GNU `strip` 的 Trusting-Trust 攻击——研究者不动编译器就把整个 NixOS 后门化

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 174+ pts · 37 评论 · 约 34 小时前（9 月 7 日 ~02:00 UTC+8） · arXiv 2607.24888（7 月 27 日）
- **Tags:** `supply-chain` `trusting-trust` `nixos` `build-security` `arxiv`

Ken Thompson 经典的 trusting-trust 攻击"被广泛视为编译器专属威胁"。Julien Malka、Aman Sharma、Martin Monperrus、Stefano Zacchiroli 与 Théo Zimmermann 证明了并非如此：他们通过 **GNU strip**——一个只修改已编译 ELF 二进制、从不触碰源码的常规构建工具——交付了 Thompson 级别的攻击。被篡改的 `strip` 埋入 NixOS 引导的二进制种子后，向它处理的每个二进制注入载荷，并把自己复制进它参与构建的新 strip 二进制，逐代自我传播；载荷"在种子离开依赖闭包之后仍存活于最终标准环境中"。结果：一个完整的图形化安装镜像构建成功、零报错，而其中几乎所有二进制都已被植入后门。

**Why it matters:** 信任根从编译器移动到了引导种子中的任意二进制——必须校验的是*种子*的出处，而不仅仅是编译器；多样化双编译（DDC）等经典对策的覆盖范围只针对编译器。需保留的限制：这是研究者针对特定真实 nixpkgs 修订版构建的演示，不是发现的入侵事件；摘要未给出任何野外证据，也未讨论任何已检测到的真实案例。

[`🔗 arXiv 2607.24888`](https://arxiv.org/abs/2607.24888) · [`🔗 Hacker News 讨论`](https://news.ycombinator.com/item?id=49575515)

---

## 23. 在桌面上分解 90 年代 CA 的 RSA-512 根密钥——CADO-NFS 跑 32 小时，密钥取自旧版浏览器安装包

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 158+ pts · 29 评论 · 约 6 小时前（~06:00 UTC+8） · mcpherrin.ca 9 月 7 日文章
- **Tags:** `rsa` `cryptography` `pki` `factorization` `archive`

作者分解了已倒闭多年的加拿大 CA E-Certify 的两把 512 位根密钥——其"Gold Server"（SSL）与"Gold Client"（S/MIME）根证书随 1999 年 3 月的 Netscape 4.51 发行——在本机 Ryzen 9 5950X 上用 CADO-NFS 分别耗时 32 与 29 小时。根证书取自 archive.org 的 IE/Netscape 安装包合集，并用 Claude Code 抽取成一个可浏览的站点。附赠：IE 3.02（1996 年）的"Test VeriSign Commercial Software Publisher CA"代码签名根，由 Steve Weis"用 GPU 集群约一小时"分解。背景：RSA-155（512 位）早在 1999 年就被分解；RSA-260（862 位）刚刚被分解；1024 位对资源充足的组织而言"已在可能范围内"。

**Why it matters:** 这一切对今天在用的任何东西都没有影响——Netscape 2002 年移除了这些根，证书 2003-10-16 过期；复现整条链需要把时钟拨回、运行 Netscape 4.51，用作者的话说"全球符合条件的人数为零"。价值在方法：历史根证书藏在历史安装包里，而消费级硬件加上 LLM 辅助抽取让 RSA-512 变得轻而易举。作者自己的免责声明值得一并保留："我没有验证这个 LLM 输出是否完全可信，只是看起来相当合理。"

[`🔗 mcpherrin.ca：我分解了 90 年代证书颁发机构的 RSA 密钥`](https://mcpherrin.ca/2026/09/07/rsa.html) · [`🔗 Hacker News 讨论`](https://news.ycombinator.com/item?id=49604637)

---

## 24. Caltech Mathathon——首个研究级数学黑客松，队伍要当着数学家的面答辩

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 245+ pts · 84 评论 · 约 27 小时前（9 月 7 日 ~09:10 UTC+8）
- **Tags:** `ai-math` `research` `hackathon` `verification`

Caltech 将于 10 月 30 日至 11 月 1 日举办 40 小时的"Mathathon"，号称首个专注于研究级数学的黑客松：约 100 支队伍获得前沿 AI 模型，进攻开放猜想与理论构建，随后"当着顶尖数学家的面答辩"，由评委检验参赛者是否真正理解模型产出的内容。奖金含超过 200 万美元的 AI 额度；奖项分两轮——第二轮只在"数学社区有时间验证这些结果之后"颁发。动机部分援引了近期的 AI 驱动成果：Erdős 平面单位距离猜想的反例（悬置 80 年）与首个非 Sofic 群的显式构造（悬置 27 年）。

**Why it matters:** 验证优先的奖项设计直接回应了本栏目持续记录的"演示即基准"问题——结果在人类验证之前不算数，评分对象是理解而非产出。这也是一周内的第三个信号（继 Anthropic 形式化费马大定理、费马之后的经费之问之后）：AI 加速的数学正在获得建制，而不只是演示。

[`🔗 Caltech Mathathon`](https://mathathonchallenge.com/) · [`🔗 Hacker News 讨论`](https://news.ycombinator.com/item?id=49596055)

---

## 25. Jellyfin 12.0——版本号扔掉"10."，移除遗留 `/emby` 路由，无完整备份则无法回滚

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 149+ pts · 56 评论 · 约 6 小时前（~06:10 UTC+8） · 经七个 RC 后于 9 月 8 日发布 v12.0
- **Tags:** `jellyfin` `self-hosting` `media-server` `breaking-changes`

Jellyfin 12.0 于 9 月 8 日发布——这是新版本号体系下的首个版本（沿用多年的"10."前缀被弃用）。亮点：每集多版本支持、相似度/推荐与可插拔搜索提供方、三位数集号、服务端内置 ListenBrainz、FFmpeg 8.1，以及支撑更快 Resume/Next-Up/计数查询的全新关系型 `LinkedChildren` 表。破坏性变更清单很长：移除遗留 `/emby/*` 与 `/mediabrowser/*` 路由（旧第三方客户端将失效）、默认禁用遗留授权、用户名迁入带唯一索引的规范化列（仅大小写不同的重复项须在升级前处理）、移除全局字幕配置。发布说明毫不讳言："强烈建议完整备份数据目录"——数据库变更意味着没有完整还原就无法回滚——仅支持从 10.10.7 或 10.11.x 直接升级，迁移前必须移除第三方插件，升级后必须全库重扫。

**Why it matters:** 最大的全开源自托管媒体服务器刚刚迎来了多年来最大的兼容性断崖，生态中的每一个第三方客户端和插件都需要对照审计。发布说明的自律（明说无法回滚、写清升级路径）是破坏性迁移该有的文档范式。

[`🔗 Jellyfin releases（v12.0）`](https://github.com/jellyfin/jellyfin/releases) · [`🔗 Hacker News 讨论`](https://news.ycombinator.com/item?id=49604861)

---

## 26. FreeIPA CVE-2026-76578（CVSS 9.8，Red Hat 评分）——未认证的 LDAP 客户端可摇身变为 FreeIPA 管理员

- **Velocity:** ▮▮ rising
- **Source:** NVD · 9 月 7 日收录（状态"Received"） · CVSS 9.8 Primary（Red Hat CNA） · securityonline.info 9 月 7 日
- **Tags:** `freeipa` `keycloak-alternative` `ldap` `kerberos` `identity`

FreeIPA 的自管 OTP token ACI 不要求认证，且不限制 token 条目旁可以附加哪些属性。未认证的 LDAP 客户端将其与底层数据库服务器的一个相关 ACI 求值缺陷（另行追踪）链接，即可创建攻击者控制的 Kerberos principal 并加入 administrators 组——完全接管身份服务器，无需凭据或交互。受影响：RHEL 6–10 的 `ipa` 包默认安装，包括通过跨域 Kerberos trust 集成 AD 的部署。打补丁前的缓解：将 LDAP 端口 389/636 的防火墙限制到可信主机，并禁用匿名绑定（先确认没有功能依赖它）。securityonline.info 称修复见于 FreeIPA 4.13.4——未经独立确认；该项目 GitHub 上没有任何 release。值得注意的是，先前的修复（CVE-2026-13097）只堵住了规范名碰撞，底层的未认证写访问依然敞开。

**Why it matters:** 默认安装的身份基础设施出现"未认证→域管理员"，这是最坏类别的漏洞，而身份服务器是下游一切的支点。按本栏目规则记录评分者信息：9.8 是 Red Hat 自己的 CNA 评分；NVD 状态仍是"Received"（未分析）。而不完整修复的模式（13097 → 76578）与今晨 Tomcat 条目如出一辙。

[`🔗 NVD：CVE-2026-76578`](https://nvd.nist.gov/vuln/detail/CVE-2026-76578) · [`🔗 securityonline.info 分析`](https://securityonline.info/freeipa-cve-2026-76578-vulnerability/)

---

## 27. Windows HTTP.sys CVE-2026-62735——Pwn2Own Berlin 提权漏洞的 PoC 现已公开

- **Velocity:** ▮▮ rising
- **Source:** securityonline.info 9 月 8 日 · CVSS 7.8（Microsoft CNA；NVD Analyzed） · 8 月 11 日补丁星期二已修复
- **Tags:** `windows` `http-sys` `lpe` `poc` `pwn2own`

CVE-2026-62735 的完整技术细节与可用 PoC 本周公开：这是 HTTP.sys（Windows 内核 HTTP 驱动）中的堆缓冲区溢出，由研究者 Siyeon Wi 在 Pwn2Own Berlin 2026 上演示，并已在 2026 年 8 月的补丁星期二修复。根因是 `UlpCreateInternalResponseOld` 中的整数溢出——驱动累计响应头字节数时未防护回绕，分配了过小的非分页池缓冲区；PoC 通过特定 IOCTL 提交带有约 7 万个自定义头的 HTTP 响应，溢出该缓冲区直至 SYSTEM 级代码执行。影响范围：Windows 10 1607 至 Windows 11 26H1，以及 Server 2012–2025。无变通方案；暂无确认的野外利用（EPSS 0.5%）。

**Why it matters:** 风险窗口是"补丁到 PoC"的时差——8 月已修复，但公开 PoC 让未打补丁的机队变成靶子。暴露面是本地且需认证（CVE 描述写明"authorized attacker"），因此真正的风险人群是共享主机、RDS 服务器和自助终端类部署，而非开放互联网。深度利用分析仍在付费墙后，公众对其可靠性的了解比 PoC 的存在所暗示的要少。

[`🔗 securityonline.info：CVE-2026-62735`](https://securityonline.info/windows-http-sys-cve-2026-62735/) · [`🔗 NVD：CVE-2026-62735`](https://nvd.nist.gov/vuln/detail/CVE-2026-62735)

---

## 28. pascalorg/editor——2.24 万星标的 WebGPU 三维建筑编辑器，为 AI 宿主内置 MCP 服务器

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending（日榜 #13） · 22.4k stars · 今日 +168 · MIT
- **Tags:** `webgpu` `threejs` `mcp` `cad` `ai-agents`

Pascal 的编辑器（React Three Fiber + WebGPU，Next.js/React 19 monorepo）以经过校验的节点层级建模建筑——Site → Building → Level → 墙/楼板/天花板/屋顶/分区/物品——借助空间网格做放置校验，用 three-bvh-csg 做门窗的布尔几何开洞，场景以扁平节点字典存入 IndexedDB，由脏节点追踪驱动逐帧重建。与 Agent 相关的部分是一等公民：MCP 服务器（`@pascal-app/mcp`）加 CLI（`npx @pascal-app/cli editor`）让 AI 宿主创建并操作场景，功能通过插件扩展，插件使用与内建工具相同的 manifest。

**Why it matters:** 暴露 MCP 的结构化、带约束校验的领域编辑器，正是"agent 画出的建筑无法作弊"的模式——archify 校验 IR 图表的建筑学表亲。场景图之所以是 agent 能安全读写的数据，恰恰因为空间校验存在于工具之内，而非提示词之中。限制：没有打任何 release tag（main 上 1,421 次提交）、撤销/重做上限 50 步，项目之新意味着 MCP 接口还会变动。

[`🔗 pascalorg/editor`](https://github.com/pascalorg/editor) · [`🔗 GitHub Trending`](https://github.com/trending)

---

## 29. Broadcom 撤下 VDDK 下载——人人用来*离开* VMware 的库现在 404 了

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 132+ pts · 55 评论 · 约 8.5 小时前（~03:30 UTC+8） · virtualizationhowto.com（ShapeBlue 8 月 25 日记录）
- **Tags:** `vmware` `broadcom` `vddk` `migration` `lock-in`

Broadcom 移除了 VMware Virtual Disk Development Kit 的公开下载页——Azure Migrate、Red Hat MTV、Nutanix Move、Platform9 vJailbreak 以及开源的 virtv2v/nbdkit 都靠这个库读取 VMware 磁盘。即便已登录 Broadcom 账号，VDDK 8 与 9 的版本路径也一律返回 404。官方没有任何声明或弃用通知；据称客服渠道的口径是 VDDK"不再提供使用或下载"，引导客户转向 Technology Alliance Program。Red Hat 表示无法再分发该专有软件；Microsoft 在 Azure Migrate 指引中加入了警告（退回代理迁移）；Proxmox 内建的 ESXi 导入不受影响。

**Why it matters:** 这与今晨的托特纳姆热刺条目合流——就在客户重新议价的同时，VMware 周边的退出工具正在被加闸，任何迁移项目现在都需要加上"我们能否合法获得 VDDK"这一行。措辞要诚实："蓄意设置退出壁垒"的解读是原作者的判断；Broadcom 没有任何公开表态，且可用的迁移路径（Proxmox）依然存在。

[`🔗 virtualizationhowto：离开 VMware 变得更难`](https://www.virtualizationhowto.com/2026/09/leaving-vmware-just-got-harder-after-broadcom-pulled-vddk-downloads/) · [`🔗 Hacker News 讨论`](https://news.ycombinator.com/item?id=49602699)

---

## 30. Roundcube 1.6.19 / 1.7.4——12 项 webmail 修复，含零点击存储型 XSS 与 CSS 代理 SSRF 绕过

- **Velocity:** ▮ steady
- **Source:** roundcube.net 安全更新 · 9 月 6 日发布 · 同时覆盖 1.6 LTS 与 1.7 分支
- **Tags:** `roundcube` `webmail` `xss` `ssrf` `patch`

Roundcube 于 9 月 6 日为两个分支同时发布安全更新，修复十几个上报的缺陷。头条：附件 URL 中经 TNEF MIME 标签注入的**零点击存储型 XSS**——一封邮件即可触发。其余包括：用十六进制 IPv6 映射 IPv4 地址绕过 CSS 代理的 SSRF；三处邮件头注入（subject 中的裸 CR、收件人显示名中的 C 转义 `\r`、identity 组织字段）；两处 CSS 注入/走私；两处远程内容拦截绕过（FuncIRI CSS 转义、SVG SMIL 动画）；经尾部点 FQDN 绕过 `is_local_url()`；以及 SQL 通讯录中跨用户访问联系人组成员关系。发布帖未列 CVE 编号，也无野外利用报告。

**Why it matters:** Roundcube 是自托管与共享托管邮件体系中占比巨大的 webmail 层，而零点击意味着攻击只需要发出一封邮件。双分支同发意味着每一个生产实例——无论 LTS 还是当前版——都必须升级；这种有报告者署名、无 CVE 的披露方式也意味着只能靠公告追踪，而不是 NVD。

[`🔗 roundcube.net：Security updates 1.6.19 and 1.7.4`](https://roundcube.net/news/2026/09/06/security-updates-1.6.19-and-1.7.4) · [`🔗 roundcube/roundcubemail releases`](https://github.com/roundcube/roundcubemail/releases)

---

## 31. rclone `serve s3 --auth-proxy` 默认敞开——SigV4 校验接受空密钥（CVSS 9.8，公告内附 PoC）

- **Velocity:** ▮ steady
- **Source:** GitHub 公告 GHSA-xwwr-4h3p-r22c · 9 月 4 日发布 · 影响 ≤ 1.68.0，1.75.1 修复
- **Tags:** `rclone` `s3` `authentication` `cwe-306` `advisory`

`rclone serve s3` 配置 `--auth-proxy` 但不配置 `--auth-key` 时认证会失效放行：`authPairMiddleware` 直接取客户端 `Authorization` 头中的 access key ID，将其与默认为空字符串的 `ws.s3Secret` 配对注册——而空字符串就是合法的 HMAC 密钥。任何人都能为自己编造的 access key ID 手签 SigV4 请求并通过校验；公告内附可用 PoC（"零先验凭据即可完成一次完全认证的成功 bucket 列举"）。auth-proxy 脚本同样无法区分攻击者与合法用户——key ID 同时作为用户名和密码传入。CVSS 3.1 9.8（CWE-287/CWE-306）；发布时未分配 CVE。最小修复是让 rclone 拒绝以此配置启动；公告还标注了残留的设计局限：共享静态 auth key 之下，逐身份密钥需要协议层修改。

**Why it matters:** rclone 遍布备份与数据搬运管线，而这是教科书式的 fail-open 默认值——如果你在未打补丁时跑过 `serve s3 --auth-proxy`，你的后端事实上对全网可读。值得表扬的是：公告附上了 PoC、受影响/已修复矩阵和残余局限，这正是披露应有的样子。

[`🔗 GHSA-xwwr-4h3p-r22c`](https://github.com/rclone/rclone/security/advisories/GHSA-xwwr-4h3p-r22c) · [`🔗 rclone/rclone`](https://github.com/rclone/rclone)

---

## 32. Ladybird 八月月报——新样式引擎驱动"对引擎性能的认真推进"

- **Velocity:** ▮ steady
- **Source:** Hacker News · 192+ pts · 46 评论 · 约 2 天前 · ladybird.org 月报（8 月 31 日）
- **Tags:** `ladybird` `browser` `web-engine` `performance`

Ladybird 月度更新重点展示 CSS scroll snap、JavaScript 调试与会话恢复，以及项目所称"以新样式引擎对引擎性能发起的认真推进"。月报同时以视频形式发布（Twitch/YouTube）。项目既定目标——2026 年在 Linux 与 macOS 上发布首个 Alpha——维持不变。

**Why it matters:** Chromium/WebKit/Gecko 三巨头之外唯一的浏览器引擎仍在向首个 alpha 扎实推进，而性能工作（不只是功能补齐）才是让 alpha 对日常用户可信的关键。限制：这是项目自报的进度——月报形式给的是功能要点与演示，而非独立基准，"认真推进"应视为有待 alpha 到来时复核的声明。

[`🔗 ladybird.org：This Month in Ladybird`](https://ladybird.org/) · [`🔗 Hacker News 讨论`](https://news.ycombinator.com/item?id=49571096)

---

## 33. 《Verify Before You Distill》——逐 prompt 以实测教师可靠性为蒸馏设卡

- **Velocity:** ▮ steady
- **Source:** Hugging Face Daily Papers（9 月 8 日榜单，4 赞） · arXiv 2609.02998（9 月 2 日）
- **Tags:** `distillation` `on-policy` `rlvr` `training` `arxiv`

TGOPD（Teacher-Gated On-Policy Distillation）瞄准了 OPD 一个真实的失败模式：反向 KL 是众数寻求的，一个自信但错误的教师会产出强烈却误导的 token 级梯度，而熵等分布信号度量的是不确定性——不是正确性。解法是逐 prompt 设卡：用一小组教师探测题由验证器打分，每个 prompt 要么路由到稠密 OPD 监督（通过），要么路由到验证器接地 GRPO（未通过）。声明结果：在 4B 与 35B 两个规模上全部六个单域设定中击败原始 OPD，多域训练下七个基准均值更高，且在异步 OPD 中教师节点 GPU 利用率从 9.8% 升至 78.9%（实测 4B 单域运行）。

**Why it matters:** 它把上周《Does On-Policy Distillation Really Distill?》的发现（教师噪声随教师规模增长）落成了一个可用机制——杠杆是验证，不是规模。两点限制需随身携带：摘要页未呈现任何局限章节（采用前先读 17 页全文），且 4 个赞说明关注度落后于结果——这是早期信号，不是共识。

[`🔗 arXiv 2609.02998`](https://arxiv.org/abs/2609.02998) · [`🔗 Hugging Face 论文页`](https://huggingface.co/papers/2609.02998)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-09-08T12:05:00+08:00 |
| Items | 33 |
| Sources tracked | 24 (Rapid7, Senserva KEV tracker, Internet Archive blog, Hacker News, GitHub Trending, Tailscale blog, securityonline.info, The Hacker News, Hugging Face Daily Papers, arXiv, vLLM blog, OpenAI Help Center, TantoSec, HeroDevs, CodePen docs, Ars Technica, Google DeepMind blog, mcpherrin.ca, mathathonchallenge.com, NVD, jellyfin.org/GitHub releases, virtualizationhowto.com, roundcube.net, ladybird.org) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[Previous day](../2026-09-07/) · [Raw .md](../2026-09-08.md) · [Archive](../../archive/)
