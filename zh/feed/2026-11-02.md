---
date: 2026-11-02
updated: 2026-11-02T12:19:50Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 24
license: CC-BY-4.0
---

# 今日趋势 — 2026-11-02

## 1. 一个 Linux TCP 释放后使用漏洞的记录躺了 16 天 —— 然后 Go 的 MPTCP 默认值把它送上了首页

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 647 pts · 约 25 小时前（约 03:16 UTC+8）· CVE 记录发布于 2026-10-15
- **Tags:** `cve` `linux-kernel` `tcp` `mptcp` `go` `use-after-free`

`CVE-2026-98432` 是 Linux 内核 IPv4 TCP 握手路径上的一个释放后使用（use-after-free）。建立连接时，内核把对端的 IPv4 首部选项保存在半开连接（request socket）上，以便稍后回显；连接完成时，内核把这些保存下来的选项交给完整 socket，**却没有复制**，随后在关闭时释放它们，而另一个 CPU 仍可能正在读取它们来构造应答。按那篇分析的描述，修复方案是把两处立即释放改成 RCU 延迟释放，外加一条 request socket 迁移路径；相关的 IPv6 情形留给了另一个补丁。受影响范围是 4.4 及以后，且低于 5.10.272 / 5.15.223 / 6.1.190 / 6.6.159 / 6.12.113 / 6.18.56 / 7.2.10 / 7.3。Linux 内核 CNA（即 `416baaa9-…` 那个分配者）给了 **9.8**，而截至本批次 NVD 的状态仍是 `Received`、**0 个 NVD 自评指标** —— 记录上的 9.8 是 CNA 的算术，不是 NVD 的。

这周它浮出水面的原因不在记录本身，而在于 **Go 1.24 在 Linux 上把监听 socket 的 MPTCP 默认打开了**（GODEBUG `multipathtcp=2`；拨号侧仍为 opt-in），而 Anthropic 演示的利用需要一个 MPTCP 监听器。Go 安全团队在 **2026-10-30** 作出了回应：「The best fix for this vulnerability is to upgrade to a patched kernel version」，并把逐个程序的开关称为「a fragile mitigation」，还警告「Accidentally leaving a single MPTCP listener exposed will still leave a system vulnerable.」设置 `multipathtcp=0` 这件事由**主模块**的 `go` 指令决定，而不是工具链 —— 一个声明 `go 1.23` 的模块仍然保持旧的 opt-in 行为。

**Why it matters:** 这是一个远程、无需认证、在应用代码之前就能触发的漏洞，而它的前置条件是某门语言的运行时默认值装上去的，且该运行时自己的团队说，你能拨的那个开关并不是修复。请把它当作内核补丁事项，而不是 Go 事项 —— 但要先盘点 Go 服务，因为是它们把那个监听器放了上去。

[`🔗 CVE-2026-98432 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-98432) · [`🔗 分析：atlasum`](https://atlasum.net/blog/cve-2026-98432-linux-ipv4-tcp-uaf) · [`🔗 Go 安全团队在 oss-security`](https://www.openwall.com/lists/oss-security/2026/10/30/1) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50319143)

---

## 2. Beta9 的三个沙箱逃逸各评 9.9 —— 每一个的起点都是「持有工作区 token 的租户」

- **Velocity:** ▮▮▮ trending
- **Source:** JFrog CNA（cveawg）· 记录发布于 2026-11-01 · 修复于 2026-09-15
- **Tags:** `cve` `sandbox-escape` `multi-tenant` `kubernetes` `path-traversal` `ai-infra`

JFrog 的 CNA 在 2026-11-01 针对 **beam-cloud/beta9**（无服务器 GPU／容器平台）发布了三个 9.9，向量都是 `AV:N/AC:L/PR:L/S:C/C:H/I:H/A:H`，并且共用一句话：持有工作区 token 的租户可以拿到宿主机。`CVE-2026-120307` 出在沙箱文件 API：`getHostPathFromContainerPath` 把容器路径的剩余部分用 `filepath.Join` 拼到挂载源上，而 `filepath.Join` **会在前缀检查之后清理父目录段**，所以足够长的一串 `..` 就能指向 worker 上的任意绝对路径。上传、下载、stat、list、在文件中查找、在文件中替换、删除文件，全都调用这一个辅助函数。那次只读验证通过该文件 API 下载到了 worker pod 的 **Kubernetes 服务账号 token**，而随附的远程节点清单把这个账号绑定到了 `cluster-admin`。`CVE-2026-120308` 出在挂载卷：没有任何检查确认卷标识符指向的是该工作区拥有的卷，于是父目录段把拼接路径折叠到 worker 的文件系统根，随后被以读写方式绑定挂载进沙箱。`CVE-2026-120306` 出在镜像构建：worker 设置了 `BUILDAH_ISOLATION=chroot` 且从不传 `--isolation`，于是一条 `RUN` 指令保留 pod 的 PID、网络、IPC 和用户命名空间，以 uid 0 运行并持有 `CAP_DAC_OVERRIDE` —— 而 `/proc/1/root` 就是 worker 自己的文件系统，里面有 `runc`、`buildah` 和服务账号 token。Clip v2 分层构建是默认路径，所以一次镜像构建就能走到那里。

修复在 **worker 0.1.756 与 gateway 0.1.776** —— 两者都在 **2026-09-15T04:03–04:04Z** 发布，比记录早了 **47 天**。修法偏结构而非打补丁：沙箱文件操作与工作区同步改用 `os.OpenRoot`，挂载校验也覆盖到检查存在之前就已保存的 stub，Buildah 的步骤改用带私有 PID／IPC／网络命名空间的 OCI 隔离。

**Why it matters:** 一个含义是*可以部署函数*的 token，在三条不同的路径上都是*可以读宿主机*的 token。如果你在跑面向 AI 负载的多租户构建或沙箱基础设施，故事的重点是**升级** —— 最新的 worker 已经到了 0.1.821，也就是说还停在九月构建上的人，已经有 47 天时间可迁移，却没有任何 CVE 通知他们要去迁。

[`🔗 CVE-2026-120307`](https://cveawg.mitre.org/api/cve/CVE-2026-120307) · [`🔗 CVE-2026-120308`](https://cveawg.mitre.org/api/cve/CVE-2026-120308) · [`🔗 CVE-2026-120306`](https://cveawg.mitre.org/api/cve/CVE-2026-120306) · [`🔗 修复：worker-0.1.756`](https://github.com/beam-cloud/beta9/releases/tag/worker-0.1.756)

---

## 3. Prefab 号称「为不可信代码提供隔离」，却把 Deno 的权限留着 —— 10.0，而不可信代码就是模型的输出

- **Velocity:** ▮▮▮ trending
- **Source:** JFrog CNA（cveawg）· 发布于 2026-11-01 · 修复于 prefab-ui 0.21.0（2026-10-26）
- **Tags:** `cve` `mcp` `sandbox-escape` `deno` `pyodide` `generative-ui`

`CVE-2026-120338` 是今年 Agent 基础设施问题最干净的一次陈述：这个功能**被明文记录为对不可信代码（包括 LLM 编写的 UI）的隔离**，而它以 `--allow-read`、`--allow-write`、`--allow-net` 运行。Prefab UI 的 Generative UI 沙箱在 Deno 子进程里用 Pyodide 执行调用方提供的 Python。从 **0.14.0 到 0.20.2**，启动器以不受限的方式启动 Deno，并把 Deno API 留在 JavaScript 全局对象上；Pyodide 的 `js` 模块代理了那个全局对象，于是 Python 可以直接调用 `Deno.readTextFileSync` 与 `Deno.writeTextFileSync` —— 以服务器操作系统用户的身份读写，并通过往服务器 virtualenv 的 `site-packages` 里写一个 `.pth` 来实现持久化。通常的远程路径是 FastMCP 的 GenerativeUI provider，它注册 `generate_prefab_ui` 这个 MCP 工具，并把该工具的 `code` 参数转发进沙箱。

CNA 给出的不是一个分数，而是**两个带场景标签的指标**：**10.0** 对应「启用了 GenerativeUI、装了 Deno、且未配置认证的 FastMCP 服务器」（`PR:N`、`S:C`），**9.9** 对应「被允许调用工具的已认证客户端」（`PR:L`、`S:C`）。NVD 那边的副本只带了 10.0。修复在 **0.21.0**（上传于 2026-10-26T19:00:11Z，比记录早六天）：runner 在**接受代码之前**就撤销 Deno 的读、写、网络权限，以 `--no-prompt` 启动 Deno 使权限请求无法再把它们要回来，并把引导阶段的网络访问限制到 `cdn.jsdelivr.net` —— 提交 `030f074`，PR 538。

**Why it matters:** 威胁模型是写下来了的，而强制手段与它之间只差一个 flag；这正是当下多数生成式 UI 技术栈的样子。一条记录上出现两个场景分数也是最诚实的形态：这一类的严重性完全取决于它前面那个 MCP 服务器有没有认证，而大多数没有。

[`🔗 CVE-2026-120338 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-120338) · [`🔗 修复提交 030f074`](https://github.com/PrefectHQ/prefab/commit/030f074f85e0b1be0dd44b0283185aecb26337a2) · [`🔗 PyPI 上的 prefab-ui`](https://pypi.org/project/prefab-ui/)

---

## 4. DeepSeek 开源了一个「超级 Agent」，整套论点就是*少花人的注意力*

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub（创建于 2026-10-31T09:32Z）· 6,848★ · 682 fork · MIT
- **Tags:** `agent` `deepseek` `harness` `architecture` `github-bot`

`deepseek-ai/dsh-superagent-prototype` 于 2026-10-31 出现，不到两天拿到 **6,848 星、682 fork**，而这是一个连 release 都没有的仓库。它是一个面向单个 GitHub 仓库（可选接飞书）的主动型编码 Agent，打包为 **DeepSeek Harness** 的 bundle：它监听仓库，当白名单里的人提出需求时，就开一个工作项，在独立的会话与目录里执行，并回到原对话作答 —— 通常是一个 pull request。README 对它的定位异常坦白：「**Research prototype for reference only, not an official DeepSeek product**」「much of the engineering done by coding agents」，以及「Some designs discussed in the article are directions for future development and are not implemented in this prototype.」

价值在设计。理念文档只立一条规则 —— 「Take as little human attention as possible, and give as much value as possible」—— 然后从中推导行为：Agent 只在被要求、或被团队**写下来的规则**允许时才行动，没人要求的工作一开始只进入*记录*模式。架构文档描述了一个唯一的 `Engine`，是 Trigger、Thread、Decision、Ticket、Assignment 的唯一写入者，内部拆成五个部分（`Intake`、`Evals`、`Tickets`、`Assignments`、`Replies`），依赖单向流动；调用方只拿到自己角色的 `Pick` —— `EngineForSources`、`EngineForExecutor`、`EngineForPeople`。授权随工单走，而不是随会话走。

**Why it matters:** 多数 Agent 框架优化的是「一个会话能做什么」，这个优化的是「一个会话被允许让别人付出多少代价」。围绕它流传的规模数字来自一篇自称结果「indicative only」的设计文章 —— 值得判断的是那个你能亲手读的仓库。

[`🔗 deepseek-ai/dsh-superagent-prototype`](https://github.com/deepseek-ai/dsh-superagent-prototype) · [`🔗 docs/000-philosophy.md`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/main/docs/000-philosophy.md) · [`🔗 docs/007-architecture.md`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/main/docs/007-architecture.md) · [`🔗 设计文章（DeepSeek Harness）`](https://x.com/DeepSeekHarness/status/2116857257245987236)

---

## 5. t3code 是一个「Agent harness 控制面」—— 37.5k 星、七个 provider、一个正式版本

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub Trending · 今日 +3,100★ · v0.1.6 发布于 2026-10-31T10:52Z
- **Tags:** `agent` `devtools` `electron` `mobile` `harness`

`pingdotgg/t3code` 现在 **37,509 星**、**今日 +3,100**，而它的 README 开头是「We are very very early in this project. Expect bugs」和「We are (mostly) not accepting contributions yet.」它的定位是一个「agent harness 控制面」：一个服务端，加上 iOS、Android、Web 与 Electron 客户端，用来驱动你机器上已有的 Agent。它支持 **Claude Code、Codex、Cursor CLI、Grok Build、OpenCode、Google Antigravity 和 fx**，并且明确不卖推理：「Works with your subscriptions.」它自陈的灵感来源 —— Codex 桌面端、Conductor、Claude Desktop、Cursor Glass —— 同时就是它的竞争主张。

产物状态值得与星数分开看。正式版是 **v0.1.6（2026-10-31T10:52:24Z）**，npm `t3` 的 `latest` 在一分钟后的 10:53:56Z 也是 **0.1.6**，而它之上的一切 —— 例如 `v0.1.7-nightly.20261101.4035` —— 都是 nightly 通道上的预发布，而 AUR 和 GitHub releases 页面上显示的主要是这些。MIT、TypeScript，创建于 2026-02-08。

**Why it matters:** harness 这一层的整合速度比模型更快，而这里的赌注是*对本地 Agent 的远程操控*，而不是又一个托管 IDE —— 你的订阅、你的机器、别人的界面。保留意见是维护者自己写的：在 0.1.6、且大功能不接外部贡献的情况下，「真正开放」目前是关于许可证的承诺，还不是关于流程的。

[`🔗 pingdotgg/t3code`](https://github.com/pingdotgg/t3code) · [`🔗 v0.1.6 发布`](https://github.com/pingdotgg/t3code/releases/tag/v0.1.6) · [`🔗 npm 上的 t3`](https://www.npmjs.com/package/t3)

---

## 6. Apple 确认中国区 Apple Intelligence 采用千问 —— 11 月 4 日开发者 Beta，12 月随 iOS 27.3

- **Velocity:** ▮▮▮ trending
- **Source:** 新华社 · 2026-10-31 宣布 · 分阶段上线
- **Tags:** `apple` `alibaba` `qwen` `apple-intelligence` `china` `siri`

阿里巴巴与 Apple 于 **2026-10-31** 宣布，阿里巴巴的 **Qwen（千问）** 模型将为面向中国用户的 Apple Intelligence 提供支持：**11 月 4 日起**在最新的 iOS 开发者 Beta 中测试，**12 月随 iOS 27.3** 正式推送。Qwen 通过 **Siri、书写工具（Writing Tools）与视觉智能（Visual Intelligence）** 提供文本与图像理解以及内容生成能力。可用条件是在中国购买的支持 Apple Intelligence 的 iPhone，或者设备定位与 Apple 账号所在地区**同时**设为中国 —— 并且该集成是可选加入的，用户自行决定是否启用、以及分享哪些信息。

数据处理的表述是值得记住的部分：阿里巴巴表示「不会将用户请求或生成的回复用于模型训练」。据相关报道，12 月这次更新**不包含** WWDC 2026 上展示的重建版「Siri AI」，也不包含其他下一代 Apple Intelligence 功能。

**Why it matters:** 这是一流全球硬件厂商第一次在中国市场把中国大模型作为系统级 AI 底座来发布，而两个日期才是实用信息 —— 11 月 4 日是 API 面变得可测的时间，12 月是存量设备真正移动的时间。如果你要往中国区 iOS 交付任何东西，「Compose with Qwen」与「Ask Qwen」就是新的集成入口，且带一个明确的发布截止日。

[`🔗 新华社 —— 阿里／千问合作`](https://english.news.cn/20261031/0642ddf499b643b1b8babd0b43adee85/c.html) · [`🔗 中国日报 —— 12 月上线`](https://www.chinadaily.com.cn/a/202610/31/WS6ae54463e4b06d4aa0566359.html)

---

## 7. TextSeal2 让水印在投机解码下存活 —— 同等多样性下多检出 8–22 个百分点

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.40613 · 提交于 2026-10-29 · 代码在 `facebookresearch/textseal`
- **Tags:** `research` `watermarking` `speculative-decoding` `llm` `provenance`

水印方案一直有两个反复出现的失效模式：牺牲输出多样性，以及在草稿模型产生的 token 被目标模型接受或拒绝时失效。**TextSeal2** 同时针对这两点。它的前作用一次抛硬币把每个 token 分配到两把密钥之一，而检测器**在不知道用了哪把密钥的情况下**对两把密钥的分数取平均 —— 信号因此被稀释。TextSeal2 改为把两把或更多密钥合并成一把虚拟密钥，并通过高斯 copula 把它与新鲜噪声耦合；作者指出这样一来「任意数量的密钥，包括公开共享的密钥」都能这样合并，而不会稀释检测。

投机解码靠额外一次**指数竞速（exponential race）**处理，跑在草稿竞速的剩余量上；依无记忆性，这次竞速复现了块验证，因此输出「follows the target model exactly」，替换掉被拒草稿的 token 仍带同一组密钥的水印，接受率也保持不变。在三个 LLM 上、在同等输出多样性下，它在 10⁻³ 的误报率上比 TextSeal 多检出 **8 到 22 个百分点**的 100-token 回答；在投机解码下，在相同接受率下分别比 TextSeal 与 textGrain 多检出 **18 与 22 个百分点**的 200-token 回答。

**Why it matters:** 「无失真」本来就是需要核实的说法，而这里真正的转变是：水印现在必须在一种*推理优化*下存活，而不只是某种采样方案 —— 这正是服务栈过去一年的走向。论文报告的是多样性持平，而不是对它的审计，所以在把「免费」当作免费之前，附录仍是该看的地方。

[`🔗 arXiv 2610.40613 — TextSeal2`](https://arxiv.org/abs/2610.40613) · [`🔗 代码：facebookresearch/textseal`](https://github.com/facebookresearch/textseal)

---

## 8. VeriCUA 把任务验证当成证据收集，而不是裁判的个人意见

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.40578 · 提交于 2026-10-29 · 标注「Work in progress」
- **Tags:** `research` `agents` `computer-use` `verification` `evaluation`

验证一个操作计算机的 Agent 比给它打分更难，因为每种廉价方法看到的都是局部视图：VLM 裁判被限制在喂给它的观测里，而生成的检查程序又依赖 harness 能够触达的状态。**VeriCUA** 把验证重新定义为**agentic 探索** —— 验证器先检查可用上下文，构造任务评分细则（rubric），然后*选择* GUI 或代码检查去覆盖仍未解决的要求，并在明确的证据规则下合并各自的发现。同一套流程同时服务在线与离线场景，覆盖桌面、移动与 Web。

摘要报告说，两种设置下与参考标签的一致率都优于基线，「with the largest offline gains on hard cases」，在线场景下对虚假完成声明的拒绝也更强 —— 但摘要里**没有任何数字**，所以可以引用的是方向，不是幅度。

**Why it matters:** 「rubric 加证据」胜过单一裁判，理由和人工评审里一样；而它针对的失效点，正是会污染下游一切的失效点 —— 一次虚假的成功报告会变成正样本训练数据。把增益集中在困难用例上，是验证器该有的形状，但在拿到逐基准表格之前，请把它当作值得抄的设计，而不是一个已测的胜利。

[`🔗 arXiv 2610.40578 — VeriCUA`](https://arxiv.org/abs/2610.40578) · [`🔗 全文（HTML）`](https://arxiv.org/html/2610.40578v1)

---

## 9. 每个 token 都有自己的老师：按 token 选监督信号，比基座高 +5.9

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.40574 · 提交于 2026-10-29 · 代码在 GitHub
- **Tags:** `research` `distillation` `post-training` `rl` `qwen3`

On-policy 自蒸馏让教师模型以特权参考为条件；现有方法要么在整个训练过程中固定教师，要么只在*不同回答之间*变化参考材料的暴露程度。本文主张两者都不对，因为一个教师的偏好在**同一条回答内部**就可能逐 token 变化。一个教师干预的前导实验支持了这一点，并显示可以按 token 通过多数投票加 KL 选择找出偏好的教师 —— 这就是 **MTA-OPSD** 的基础：维护一个候选教师池，让每个 token 在训练中自行选择。

在数学推理任务上、以 Qwen3 系列模型做实验，MTA-OPSD 稳定优于已有的 OPSD 方法，相对基座模型的平均增益最高 **+5.9**。代码在 `xingzhejun/MTA-OPSD`。

**Why it matters:** 可迁移的想法不是那个路由，而是那个测量 —— 教师偏好在*同一条完成内部*非单调，这会动摇任何「每个回答只挑一个参考强度」的方法，而这正是多数自蒸馏配方在做的事。它是一个温和的结果：单一任务族；让它可信的是那个前导实验。

[`🔗 arXiv 2610.40574 — MTA-OPSD`](https://arxiv.org/abs/2610.40574) · [`🔗 代码：xingzhejun/MTA-OPSD`](https://github.com/xingzhejun/MTA-OPSD)

---

## 10. Multi-View MoE：三个路由器，同样的专家预算，+1.18 个百分点

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.40577 · 提交于 2026-10-29 · 10B-A1B，708B tokens
- **Tags:** `research` `moe` `routing` `pretraining` `efficiency`

稀疏 MoE 用一个路由器挑专家，而本文的起点测量是：对所有专家做稠密评估后发现，**单一路由器的排序与专家效用排序之间一致性很弱**，在中层与深层尤其明显。更丰富的选择信号通常要付出代价 —— 基于内部激活的选择需要预计算，而把多个完整表示分别过同一个专家又重复了它的算力。**Multi-View MoE** 改为聚合多个独立初始化路由器的 sigmoid 分数，然后复用每个被选中专家*在各路由器间的相对*分数，把学到的隐视图（latent view）混合进该专家的输入 —— 于是路由偏好同时服务于选择与计算，而每个被选中的专家仍只执行一次前向。

在一个 24 层、10B-A1B、用 708B tokens 训练的模型上，完整的 Multi-View MoE 把九任务下游均值相对基线提升 **1.18 个百分点**；仅 Multi-Router 就带来 **0.6**，并把路由器分数与专家效用之间的秩相关提升 **8.1%**（全局）与约 **58%**（在单路由器一致性最低的那一层）。激活专家数、专家 FLOPs 与 all-to-all 通信量均未改变。

**Why it matters:** 它在不买算力的前提下买到了质量，这在当前这条轴上是罕见方向；而值得引用的是那个 58% —— 增益恰好集中在单路由器最不靠谱的地方。一个模型、一个 token 预算、投稿时未放代码：这是设计层面的结果，还不是可复用的配方。

[`🔗 arXiv 2610.40577 — Multi-View MoE`](https://arxiv.org/abs/2610.40577) · [`🔗 全文（HTML）`](https://arxiv.org/html/2610.40577v1)

---

## 11. JetBrains 的 ThinkRail 是一个围着别人的 Agent 搭起来的 agentic IDE

- **Velocity:** ▮▮ rising
- **Source:** GitHub（JetBrains incubator）· 6,941★ · 本周 +5,738 · Apache-2.0
- **Tags:** `ide` `jetbrains` `agents` `git-worktree` `typescript`

`JetBrains/thinkrail` 在 **2026-11-01** 发布了 **v0.4.0-nightly.2**，现有 **6,941 星**、**本周 +5,738**，且是 incubator 项目而非产品线。值得注意的设计选择是：它**不**自带模型也不自带 Agent，而是把 `pi` 编码 Agent 包进一个真正的 IDE —— Monaco 标签页、带实时 git 的文件树、可拆分的工作台 —— 把工程投入放在隔离与记忆上。每个仓库成为一个 project，每个任务切为一个 **`git worktree`**，各有分支与工作目录，于是 Agent 可以并行工作而不碰你的 checkout；已完成或闲置的工作区会在 PR 合并／关闭时自动「沉淀」到每个项目的架子上，等你再进去时恢复。

持久的项目知识来自「living specs」与可复用的 skills；路线图明确说下一步是全量扩展支持，让 ThinkRail 能根据你实际的工作方式自己造工具。

**Why it matters:** JetBrains 自家的 IDE 正是它要取代的在位者，而它瞄准的这一层也正是各家 harness 项目在争夺的。`worktree`-per-task 模型是最扎实的部分：它让并行 Agent 成为一条 git 事实，而不是一个界面承诺 —— 不过在只有 nightly、没有稳定 tag 的阶段，这属于观察名单而非采用名单。

[`🔗 JetBrains/thinkrail`](https://github.com/JetBrains/thinkrail) · [`🔗 thinkrail.ai`](https://thinkrail.ai/)

---

## 12. Mika 在一个*隐藏的后台屏幕*上跑 Android Agent —— 不用 App API、没有服务器、自带密钥

- **Velocity:** ▮▮ rising
- **Source:** GitHub · 3,738★ · v0.1.33 发布于 2026-11-01 · Apache-2.0
- **Tags:** `android` `agent` `computer-use` `on-device` `privacy`

`wangzan101/Mika`（3,738 星，创建于 2026-10-29，Apache-2.0）是一个用人的方式操作 App 的 Android Agent —— 「looks at the screen and finds buttons」，**不用 App API、不做逐个 App 的集成** —— 但它在一个**独立的后台屏幕**上运行，所以它点按、滚动的同时你仍能正常用手机；配对只需通过无线调试做一次，想看的时候用悬浮胶囊打开实时画面。它还内置一个桌面级浏览器、每个对话独立的 **arm64 Linux 沙箱**（对你发来的文件跑 Python、Node 和 shell），以及定时与条件任务。默认是 **Ask 模式**，只在与花钱相关时向你确认，并把登录、验证码和支付交还给你。

隐私形态是差异点：「There is no Mika server」—— API key 与记忆在设备上加密存放，对话与运行记录留在本机，更新检查只访问 GitHub；模型端点由你提供（任意 OpenAI 兼容、Anthropic 或 Gemini），也可以用 ChatGPT、xAI 或 OpenRouter 账号登录。要求是 Android 12+ 才能操作 App（建议 14+），Android 11+ 可用聊天、网页与文件功能。

**Why it matters:** 端侧计算机操作 Agent 是最可能在没有服务器的情况下落地的一类，而这个项目把取舍说得很直白 —— 自动操作第三方 App「may break their terms of service」。后台屏幕这一招，是让 Agent 在你正握着的手机上变得可用的关键；默认 Ask 模式则是让它变得可辩护的那一半。

[`🔗 wangzan101/Mika`](https://github.com/wangzan101/Mika) · [`🔗 v0.1.33 发布`](https://github.com/wangzan101/Mika/releases/tag/v0.1.33)

---

## 13. `unslop` 是一个先把「AI 味」点名出来的设计 skill

- **Velocity:** ▮▮ rising
- **Source:** GitHub · 4,711★ · 创建于 2026-10-29 · CC-BY-4.0
- **Tags:** `skills` `claude-code` `design` `frontend` `codex`

`heydamir/unslop`（四天 4,711 星）是给 Claude Code 与 Codex 用的 skill，把「vibecoded、一眼 AI 写的 UI」变成「有自己性格的设计稿」。按 README 的说法，方法分两步：**先把 slop 点名** —— 「the purple gradients, glows, emoji labels, shouty copy and uneven spacing」—— 然后从产品出发定一个方向，像设计师做批注（redline review）那样一遍遍修这个界面。它适用于 Next.js、React、Vue、Svelte、Tailwind 或纯 HTML/CSS，覆盖仪表盘、应用与落地页；只要有链接加 Playwright/Chromium，它也能直接操作**线上站点**。

许可为 **CC-BY-4.0** —— 一份文档型许可用在 skill 上 —— 安装方式是复制到 `~/.claude/skills/` 或 `~/.agents/skills/`。

**Why it matters:** 设计类 skill 一直是带一份风格清单的 prompt 包；这一份的贡献在于诊断那一步 —— 一个能列举出「为什么这个界面看起来是生成的」的模型，才能被要求停下来。在产品里采用前值得读的细节是许可证：CC-BY 要求署名，不是宽松的代码许可。

[`🔗 heydamir/unslop`](https://github.com/heydamir/unslop) · [`🔗 skills/unslop/SKILL.md`](https://github.com/heydamir/unslop/blob/main/skills/unslop/SKILL.md)

---

## 14. hop 用一个 Windows 应用把 Linux 装到 Windows 旁边，不需要 U 盘

- **Velocity:** ▮▮ rising
- **Source:** GitHub · 1,155★ · v0.3.0 发布于 2026-11-01T09:41Z · MIT
- **Tags:** `linux` `installer` `windows` `dual-boot` `uefi`

`Arjun-Ingole/hop`（1,155 星，创建于 2026-10-30，MIT）是一个 Windows 可执行文件，把 Linux 发行版装到 Windows 旁边：选发行版、拖进度条决定给它多少空间、点安装。它从各项目**自己的服务器**下载 ISO，并在项目发布校验和时**验证校验和**，也可以用你已有的镜像文件。麻烦的部分都被正面处理了 —— 「Make room」会清掉那些让磁盘「显示有空闲却拒绝收缩」的不可移动文件；交接时它还会列出该在发行版安装器里点哪些选项。

支持 elementary OS、Ubuntu 及其各风味、Linux Mint、Pop!_OS、Zorin、Debian、Fedora Workstation、Ultramarine、CachyOS、Arch 与 Omarchy；要求 Windows 10（1803+）或 11、UEFI 与 GPT 磁盘，且 Linux 必须装在机内磁盘而非 U 盘。Kubuntu 不受支持有个具体理由 —— 「its ISO has a file too big for FAT32」；若干发行版需要关掉 Secure Boot，而 **Omarchy 还要求 BitLocker 完全关闭而不是暂停**，hop 不会替你关。

**Why it matters:** 双系统安装正是人们搞丢 Windows 的那一步，而这里的设计是把每个不可逆的决定都放到一次「可以安全失败」的检查之后，并支持干净回退。即便从不运行它，这份按发行版列出的注意事项表也值得读 —— 它是一份罕见的、诚实的安装器假设清单。

[`🔗 Arjun-Ingole/hop`](https://github.com/Arjun-Ingole/hop) · [`🔗 v0.3.0 发布`](https://github.com/Arjun-Ingole/hop/releases/tag/v0.3.0)

---

## 15. 王国之泪被静态重编译成原生 x86-64 —— 3,090 星，以及「自备游戏文件」的规矩

- **Velocity:** ▮ steady
- **Source:** GitHub · 3,090★ · v0.3.1 发布于 2026-11-01 · MIT
- **Tags:** `recompilation` `nintendo` `vulkan` `reverse-engineering` `gaming`

`valentderah/totk-pc-recomp`（自 2026-10-29 起 3,090 星，MIT，v0.3.1 于 2026-11-01）是《塞尔达传说：王国之泪》的**静态重编译**版本，变成一个带 Vulkan 渲染器的 Windows/Linux x86-64 原生应用 —— 不是模拟器，README 第一行功能就写明了。它支持 1.1.0、1.2.1、1.4.3 三个游戏更新且存档互相延续，默认 60 fps、实验性最高 144 fps，支持 HDR10、21:9 与 32:9（摄像机与界面一并变形）、安装时预编译 shader 而非游玩中编译，以及模拟器格式的 mod（RomFS、TKMM 合并输出、`.ips`/`.pchtxt` 代码补丁）与 Atmosphère 金手指。

法律形态写在最前面：「**No game files are included.**」你自备合法副本，安装程序在你机器上构建 —— 「the result contains the game. It is for your own use. Do not share it.」状态是「early development. The game is playable on Windows and Linux; visual bugs and crashes are still expected.」

**Why it matters:** 静态重编译正在悄悄取代这一代的模拟器路线，因为它绕开了运行时的逐指令翻译 —— 产出的原生二进制里，真正的工作量落在 GPU 路径上（Vulkan 1.3 + `VK_EXT_external_memory_host`）。另一半是分发模型：一个构建配方加一条法律边界，而不是一个谁都不能分享的二进制。

[`🔗 valentderah/totk-pc-recomp`](https://github.com/valentderah/totk-pc-recomp) · [`🔗 v0.3.1 发布`](https://github.com/valentderah/totk-pc-recomp/releases/tag/v0.3.1)

---

## 16. Handy 又一次上榜：36k 星，而最新版本停在 10 月 3 日

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · 今日 +383★ · 36,402★ · v0.9.8（2026-10-03）
- **Tags:** `speech-to-text` `offline` `whisper` `whisper-cpp` `privacy`

`cjpais/Handy` 今日 **+383 星**，总数 **36,402**，是一个完全离线的语音转文字应用：按下快捷键、说话，文字被粘贴进当前焦点所在的输入框，全程在本机。静音由 **Silero VAD** 过滤，转写可选 **Whisper Small/Medium/Turbo/Large**（有 GPU 时加速）或 **Parakeet V3**（CPU 优化，带自动语种识别）。Windows、macOS、Linux，MIT。

这里的触发因素是关注度，不是发布：最新的 tag 是 **v0.9.8（2026-10-03）**，前两个分别是 2026-09-18 与 2026-08-24 —— 大致月度的节奏，本周没有动。Homebrew 与 winget 的包存在，但 README 注明它们「are not maintained by the Handy developers」。

**Why it matters:** 本地听写是为数不多「对多数用户来说端侧严格更优」的 AI 功能 —— 延迟、成本、隐私三者方向一致 —— 而一个 36k 星、没有任何云端路径的项目，就是「模型已经够用」的证明。星数当作热度引用，发布日期当作状态引用：本周没有新东西。

[`🔗 cjpais/Handy`](https://github.com/cjpais/Handy) · [`🔗 handy.computer`](https://handy.computer)

---

## 17. Calegari 在陶哲轩博客上写道：「Evaluate all work as if it is AI-assisted」

- **Velocity:** ▮ steady
- **Source:** Terry Tao 博客（客座文章，作者 Frank Calegari）· 2026-11-01 · HN 72 pts
- **Tags:** `mathematics` `ai-research` `incentives` `publishing` `lean`

这是**Frank Calegari** 发表在 Terence Tao（陶哲轩）博客上的客座文章 —— 作者不是 Tao —— 主张数学已经越过了某条线，而这一行的激励机制还没有。触发点是 10 月 6 日 OpenAI 发布 700 多篇论文；文章的回应既不是「这个领域完了」，也不是「什么都没变」，而是：**探索性、跨学科工作的成本下降了**，所以价值应当从证明已知猜想，转向挑选值得做的问题、搭建纲领、解释联系。

他给出六条具体建议：「Evaluate all work as if it is AI-assisted」「Make hiring much more about personal interactions rather than a paper file」「Demand more from journals, and abandon those that do not adapt」「Put a greater emphasis on breadth in graduate education, but do not abandon technical skills」「Give better seminars」「Take more ownership of the results of AI」。最锋利的一句冲着他自己这个资历层：「If you, as a senior mathematician, are stressed about being scooped by AI, then you are not being ambitious enough.」他还主张「a significant proportion of papers posted to the arXiv should not be published anywhere」 —— 更少但更好，并在合适的地方用 Lean 验证。

**Why it matters:** 这些建议是制度性的而非技术性的，所以它们可用：「evaluate all work as if it is AI-assisted」是一个院系今天就能采纳的政策；而他在旁边列出的历史参照 —— Gorenstein 1972 年宣布分类纲领、1983 年完成分类、quasithin 情形又花了约二十年 —— 正是反对用「解决了多少问题」来衡量一个领域的论证。

[`🔗 Mathematics has changed. Let's act like it`](https://terrytao.wordpress.com/2026/11/01/mathematics-has-changed-lets-act-like-it/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50328251)

---

## 18. AJ-Report 用硬编码的 JWT 密钥签发分享令牌 —— 一条记录，9.3 与 9.8 两个分

- **Velocity:** ▮ steady
- **Source:** VulnCheck CNA（cveawg）· 预留于 2026-10-31T11:44Z · 发布于 2026-10-31T17:25Z
- **Tags:** `cve` `hardcoded-secret` `jwt` `rce` `groovy`

`CVE-2026-120209` 说的是 AJ-Report **1.7.1 及之前**用**硬编码的 JWT 密钥**签发分享令牌，于是攻击者可以离线伪造合法的 `Share-Token`。伪造一个 `reportCode` 为 `dataSet` 的令牌，访问 `testTransform` 端点，请求里的脚本就会进入 **`GroovyClassLoader`** —— 无需认证的远程代码执行，而且伪造这一步完全不需要与服务端交互。项目仓库在 Gitee（`anji-plus/report`），记录引用了硬编码密钥的那份 `JwtUtil.java` 源码。

评分正好免费演示了本刊的溯源规则：同一条记录、同一个 CNA，同时带着 **CVSS 4.0 的 9.3** 与 **CVSS 3.1 的 9.8**，这个差是框架造成的，不是两方意见不合。受影响范围写作 `version: "0"` 到 `≤ 1.7.1`、`defaultStatus: unaffected` —— 这种开放式下界是「空的最小值」，不是「全部历史」。

**Why it matters:** 谁都能生成的签名是认证表演，而它背后的那个端点把伪造的身份变成代码执行 —— 与本周另外三条记录是同一个形状。那两个分数是该戒掉的习惯：引用数字时带上版本，因为同一页上的 9.3 和 9.8，是同一份评估写了两遍。

[`🔗 CVE-2026-120209 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-120209) · [`🔗 VulnCheck 公告`](https://www.vulncheck.com/advisories/aj-report-through-1.7.1-authentication-bypass-leading-to-rce-via-share-token) · [`🔗 JwtUtil.java（Gitee）`](https://gitee.com/belief-team/report/blob/V1.7.1/report-core/src/main/java/com/anjiplus/template/gaea/business/util/JwtUtil.java)

---

---

## 19. HackerBooks 用 Claude 给 270,334 条 HN 书籍提及打标 —— 并把自己 85% 的一致率印了出来

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News（Show HN）· 1,054 pts · 约 12 小时前（约 23:58 UTC+8）
- **Tags:** `hacker-news` `dataset` `llm-labeling` `books` `affiliate`

Hacker Books 是一个可搜索的索引，收录 Hacker News 评论区里被推荐的书；它自己的 `data/meta.json`（**2026-11-02** 生成）把语料说清楚了，而不是含糊带过：本批次读取时为 **15,362 本书、270,334 条提及、217,954 条评论、56,456 位评论者**，覆盖 **2007 到 2026**；书籍元数据与封面来自 Open Library，每个书籍页面都链回原帖。该文件每次重建都会换一个新的内容哈希，当前构建读到 **15,766 本书与 281,363 条提及** —— 这些总数是快照，不是常量。预生成的热门榜收录 **600** 本；整个书级数据集可以 CSV 下载。

真正值得读的是它如何定义「被推荐」。只数提及次数，会让人人都在*警告*的书排得像心头好，所以**每一条提及都用 Claude Sonnet 5.5 打上了** *recommend*、*neutral*、*critical* 或 *not about the book* 的标签，同名电影、游戏之类的提及会被丢弃。About 页随后给出了检验：这些标签与 Claude Opus 5.5 在 400 条提及上比对，一致率 **85%**，页面自己也提醒「会有噪声」。关键词规则、情感打分和 TF-IDF 分类器都先试过，准确率更低。排名把**不同评论者**的权重放在原始提及数之上，所以单个狂热读者带不动一本书。

它同时也是一门生意，而且代码里写着：联盟参数是 `{ bookshop: '130774', amazon: 'roansh-20' }`，About 文案说佣金用来「支付托管费用」。站点致谢 Andrej Karpathy 的 HackerTube 是灵感来源，并声明自己「与 Y Combinator 和 Hacker News 无关联」。

**Why it matters:** 一个由 LLM 构建、还公布了自己跨模型一致率的语料，比多数「AI 搜索」产品更可靠 —— 而 **85%** 就是该带走的数字，因为它是「有 N 个人推荐」这类说法天花板。这也是两天内第二个把 HN 存档做成消费级产品的项目：十九年的评论区现在是原料，被索引的是第三方镜像，而不是 HN 的 API。

[`🔗 hackerbooks.org`](https://hackerbooks.org) · [`🔗 hackerbooks data/meta.json`](https://hackerbooks.org/data/meta.99d6a8ef.json) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50326821)

---

## 20. Postgres 19 迟到，是因为 LLM 让它四十年的 bug 变得可寻 —— 回补提交涨了 74%

- **Velocity:** ▮▮▮ trending
- **Source:** Robert Haas 博客 · HN 154 pts · 约 27 小时前（约 09:38 UTC+8）· 原文发表于 neon.com
- **Tags:** `postgresql` `maintenance` `llm-bug-hunting` `release-engineering`

PostgreSQL 提交者、Databricks 高级工程师 Robert Haas 写道：**PostgreSQL 19 很可能要到 11 月才发布**，这是十年来第一次错过 9 月中到 10 月中这个窗口；而且有三个大特性在 beta 后期被撤回 —— `UPDATE/DELETE FOR PORTION OF`、SQL/PGQ、`ALTER TABLE … MERGE/SPLIT PARTITION`，撤回时间都在 **8 月 27 日到 9 月 15 日**之间。他对「发生了什么」的回答不是流程变化，而是一组测量。

4 月 8 日到 9 月 25 日之间，2026 年进入 `master` 的提交是 **1,443** 个，2025 年是 **1,037** 个 —— Haas 特别指出，扣除窗口差异后这其实是*略微下降*。真正的跳升在下游：进入 `REL_19_STABLE` 的提交从 **724 涨到 1,169**（+60% 以上），而回补到至少上一个发布分支的提交从 **248 涨到 433**（+74%）。他的判断是：提交者的保守程度与去年差不多，但「他们犯的错里有更多被 LLM 迅速找了出来」。

延迟来自 LLM 帮不上忙的两个环节：评审，因为模型起草的修复「并不总是正确、也不总符合 PostgreSQL 的规范」；以及从发布上被抽走去处理回补分支的时间 —— 这正是撤回拖到那么晚的原因。Haas 明确说延迟本身并不可怕，悬而未决的是：「我们有四十年人类没能发现、而 LLM 相当擅长发现的 bug，我们到底要怎么追上」。

**Why it matters:** 这是主流数据库第一次给「LLM 找 bug 时代」标上发布日期，该带走的数字是回补分支的 **+74%**，不是标题里的延迟 —— 它衡量的是一个不看发布日历的审计者，如今能在成熟代码里翻出多少潜伏缺陷。每个长寿命代码库都该预期同一张账单，而它以评审负载而不是补丁数量的形式到来。

[`🔗 Postgres 19 is late, and it's AI's fault`](https://rhaas.blogspot.com/2026/10/postgres-19-is-late-and-its-ais-fault.html) · [`🔗 neon.com 原文`](https://neon.com/blog/postgres-19-is-late-and-its-ais-fault) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50312408)

---

## 21. OmniDiff v0.3.0 会把 PDF、字体和图片当内容来 diff，而不是打印「Binary files differ」—— 还标出了自己测试集最薄的地方

- **Velocity:** ▮▮ rising
- **Source:** Show HN · 185 pts · v0.3.0 发布于 2026-11-01T10:58Z · 421★
- **Tags:** `rust` `diff` `dev-tools` `tree-sitter` `terminal`

`ivankovic/omnidiff` 是一个 AGPL-3.0 的 diff 工具，它先判断自己在看什么，再决定怎么比：代码走 tree-sitter 语法（构建时从 C 编译），而图片、光标主题、字体、压缩包、消息目录和 PDF 各自用内容相关的比较方式，而不是 `git diff` 那句「二进制文件有差异」。**v0.3.0** 发布于 **2026-11-01T10:58Z**，把这件事做到了字符串内部 —— JSON `"content"` 里旁边有 `"path"` 指向 `.tsx` 的 TSX、YAML `run:` 块里的 shell、模板字面量里的 CSS/HTML —— 于是被持有字符串里的改动会标在改动处，而不是从第一处到最后一处画一整段。图片按感知比较，重新编码不算改动；TUI 在支持 kitty/sixel/iTerm2 的终端里画真像素，其余用半块字符。

README 里那张表才是重点，因为它把主张分开了：**99.95%** 的代码改动能被 diff、**98.8%** 会走到内容相关的算法；代码这一行是 98% 在 100 ms 内、**70%** 完全正确、92% 接近正确；PDF 是 100% 正确但只有 **57%** 在 100 ms 内 —— 而 README 自己说 PDF「判定用例不到十个」。速度在一台机器上测（i7-1370P、32 GB）。安装方式有 `cargo install`、Homebrew、签名的 apt 源和 Nix。

**Why it matters:** 行 diff 是 1970 年代的模型，被套在了根本不是「行」的产物上；这里的工程价值在于*不对称* —— 一侧更重、懂类型的比较，同时还得作为 `git` 的外部 diff 跑起来。那些百分比要当成判定样本数来读，不是覆盖率：PDF 全对那一行，靠的是不到十个用例。

[`🔗 ivankovic/omnidiff`](https://github.com/ivankovic/omnidiff) · [`🔗 v0.3.0 发布`](https://github.com/ivankovic/omnidiff/releases/tag/v0.3.0) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50325253)

---

## 22. Gitea 在 111 秒里发了 20 条 CVE 记录 —— 其中没有任何一条带着任何一方的评分

- **Velocity:** ▮▮ rising
- **Source:** Gitea CNA（cveawg）· 2026-11-01T09:47:07–09:48:58Z · 修复于 28.3.0
- **Tags:** `cve` `gitea` `token-scope` `ci` `supply-chain`

Gitea CNA 在 2026-11-01 的 **111 秒**内发布了 **20 条记录**，受影响范围全部写作 `{version: "0", lessThan: "28.3.0"}`（其中四条的下界是 1.19.0 / 1.23.0 / 1.27.0），而**这二十条在任何容器里都没有 CVSS 指标** —— 不是 Gitea 的，也不是 CISA-ADP 的。NVD 把二十条全部标为 `Deferred`，它自己的 `published` 时间戳是 **10:18:33–10:18:37Z**，比 CNA 的时钟晚三十分钟，正是本刊一再撞见的双时钟。

内容并不单薄：这一批主要是**令牌作用域**没有生效。`CWE-863`（授权不当）出现 6 次，`CWE-200` 4 次，`CWE-862` 4 次。最值得看的三条：**`CVE-2026-118386`** —— 一个 PR 评审把 `commit_id` 指向评审者自己的提交，`pull_request_review` 工作流就以那个提交运行、无需批准，「带着仓库的 secret 和一个可写令牌」；Gitea 在公告里致谢 **Anthropic** 报告了它。**`CVE-2026-117635`** —— `public-only` 个人访问令牌在 `/api/v1/admin` 上没有受限，于是站点管理员一个「只读公开资源」的令牌可以列出所有用户邮箱、创建私有组织、创建新的管理员。**`CVE-2026-119441`** —— `DELETE /api/v1/orgs/{org}/repos` 接受了 public-only 令牌，删掉了私有仓库。**`CVE-2026-120263`** —— `ACCOUNT_LINKING = auto` 下，OAuth2 登录可用用户名或邮箱认领已有账号。发布说明列了 **21** 条 CVE、**60** 个已合并 PR；第 21 条 `CVE-2026-111943` 是 Go 1.27.3 重编译、不再信任一批中间证书，那条不是 Gitea 的。

关于评分，这个项目自己的历史正好纠正最直观的读法：NVD 已收录的 **128** 条 Gitea 自派记录里，**120** 条带 CVSS 指标，但其中 **101** 条只有 **CISA-ADP** 的富化，只有 **15** 条带着 Gitea 自己写的分。所以这二十条上将出现的数字，最可能是 CISA 的、稍后到达 —— 这里的「没有分」是两个容器尚未填充的快照，不是政策。

**Why it matters:** 代码托管平台是唯一一处「作用域不足的令牌」等于供应链原语的地方 —— 一个能枚举所有私有仓库的作业令牌，一个用仓库 secret 运行攻击者选定代码的评审工作流。而这里的溯源规则与平常相反：这个 CNA *是*打分的，所以缺席是延迟。要写成「尚未发布任何指标」，绝不能写成「按设计不打分」。

[`🔗 CVE-2026-112887 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-112887) · [`🔗 Gitea 28.3.0 发布说明`](https://blog.gitea.com/release-of-28.3.0/) · [`🔗 GHSA-8r36-6j2c-3gmv`](https://github.com/go-gitea/gitea/security/advisories/GHSA-8r36-6j2c-3gmv)

---

## 23. Apache Wicket 在 46 分钟里发了 19 条记录 —— 上限 8.3，而修复活在两个已终止的最终版本里

- **Velocity:** ▮▮ rising
- **Source:** Apache CNA（cveawg）· 2026-11-01T21:42–22:28Z · NVD 状态 `Received`
- **Tags:** `cve` `java` `wicket` `xss` `missing-authorization`

2026-11-01 的 **21:42:45Z 到 22:28:35Z** 之间落下 19 条 Apache Wicket 记录，每一条**只有 CVSS 4.0**，由 `security@apache.org` 指派，每一条在 NVD 里仍是 `Received`、**没有 `nvd@nist.gov` 指标** —— 也就是说页面上那个分数是 CNA 的，被原样再服务了一遍。上限是 **8.3**，出现两次：`CVE-2026-83594`（`CWE-789`）让 `FileUploadToResourceField` 按客户端在自己的 Ajax 回调里声称的大小去分配内存；`CVE-2026-84170`（`CWE-770`）是独立上传资源没有执行配置好的限额。接着 **7.6 三次**、**7.4 三次**是 XSS 与转义（`CWE-79` 全批出现 5 次，其中一个 7.4 是 `CWE-116`：`JavaScriptUtils#escapeQuotes` 转义了引号却没转义反斜杠），**6.9 两次**、**6.3 四次**是缺失授权与包资源泄露，尾部是 2.3 三次和 2.1。

有两个细节比清单更有价值。第一，项目的定性标签和分数并不同步：这一批里有 **9 个 moderate、6 个 important、1 个 low**，另有 3 条无标签，而一个 **7.4** 标的是 *moderate*，一个 **6.9** 标的是 *important* —— 标签是词，分数是算术，两者不是同一份评估。第二，决定谁能打上补丁的是范围：它们止于 **10.11.0**、**9.24.0** 和 **8.19.0**，因此含修复的产物是 **10.12.0**（2026-10-31），以及对那些列了 9.x 或 8.x 分支的记录而言的 **9.25.0** 与 **8.20.0** —— 后两者发布于 2026-10-29，是各自分支的**最终**版本。Wicket 9 自己的公告写着「不会再有 9.x 版本，连安全修复也不会有」。

**Why it matters:** 对还留在 Wicket 8 或 9 的人来说，已修复的版本就是永远存在的最后一个，所以升级路径是 10 LTS，而不是 9.25.0。这同时也是一个发布说明问题：10.12.0 的帖子有十三条变更记录，其中只点名了这些修复里的一条（`WICKET-7205`，CSP 那条）—— 靠读发布说明判断要不要升级的人，看到的是一次例行的 bug 修复发布。

[`🔗 CVE-2026-83594 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-83594) · [`🔗 Wicket 10.12.0 发布`](https://wicket.apache.org/news/2026/10/31/wicket-10.12.0-released.html) · [`🔗 Wicket 9.25.0 —— 终点`](https://wicket.apache.org/news/2026/10/29/wicket-9.25.0-released.html)

---

## 24. OccupySaaS 想在没有原厂商的情况下重建 SaaS —— 一个仓库通过了 OpenID 认证，另一个还没有任何里程碑过闸

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 124 pts · 约 4 小时前（约 08:17 UTC+8）
- **Tags:** `open-source` `clean-room` `auth0` `salesforce` `licensing`

「OccupySaaS」是一场带着仓库的抗议运动：被裁掉的工程师，Apache-2.0，「用洁净室方式、开源、可直接替换那些把我们的行业租回给我们的平台」。口号是一百万工程师。而今天的实物是**两个仓库**。

`occupysaas/zeroauthy`（24★，创建于 2026-10-14）是真的那个：一个会说 **Auth0 的 Authentication API 与 Management API** 的身份服务器，现有 Auth0 SDK 指向 zeroauthy 租户即可不改代码运行 —— 多租户发现、JWKS、`client_credentials`、授权码 + PKCE、轮换刷新令牌、PAR、设备流、`/v2/logout`，以及覆盖应用、API、client grants 和数据库连接的 Management API。它在 **commit `38b4229`、2026 年 10 月 18 日**通过了 **OpenID 基金会** Basic OP、Config OP、Form Post OP 三个档位的 OpenID Connect Provider 认证 —— 而且这可查：openid.net 的认证提供方表里就写着「zeroauthy (commit 38b4229)」。

`occupysaas/salescompel`（21★，最后推送 2026-10-21）是这份宣言的另一半，用 Go/PostgreSQL 做 Salesforce 替代，而它的 README 对自身进度异常诚实：M0 到 M10 共十一个里程碑；一个早期 Vue 原型「预览编辑只留在内存里，不调用后端」；还有那句「尚没有任何完整项目里程碑有记录的出口闸通过」。它给出的草稿预算是「到 M9 大约还需 185–350 个计划当量」，而生产认证（M9）写着「未达成」—— 这就是摆在 24 星仓库旁边的承诺规模。

**Why it matters:** OpenID 认证是把它与宣言区分开的东西 —— 一个能通过一致性测试套件的身份服务器是可检验的主张，而可直接替换 Auth0 的产品，正是那种能熬过公司定价页变化的东西。Salesforce 那一半则展示了这场运动真实的单位：一次一个模块，并由一份洁净室文档约束什么可以从原版读取，而不是整体替换。

[`🔗 occupysaas.com`](https://occupysaas.com/) · [`🔗 occupysaas/zeroauthy`](https://github.com/occupysaas/zeroauthy) · [`🔗 OpenID 认证提供方`](https://openid.net/certification/certified-openid-providers-profiles/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50331402)

---

## 25. nibnib 是为「每像素六个周期解码」而生的图像格式 —— 编码器慢几个数量级，而且还没有任何基准

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 111 pts · 约 3 天前（约 12:17 UTC+8）· 79★
- **Tags:** `image-codec` `rust` `embedded` `rp2350` `format-design`

`raphlinus/nibnib` 源自一个关于 **RP2350** 微控制器上 DVI 输出的问题：那里的预算是大约**每像素六个周期** —— 够取一次、查一次调色板、存一次，仅此而已。由此产生的格式，调色板里存的不是颜色而是**增量**：上一个解码像素被翻倍（`(pix >> 16) * 0x10001`），一个字节去索引 32 位调色板项，再把它加上去 —— 每个输入字节产出**两个 RGB565 像素**，即 **4bpp**，低 16 位是左边那个像素。整个内循环是五行 Rust。

基于增量正是它优于普通调色板图像的原因：平坦区域保持平滑，因为调色板存的是小变化而不是绝对颜色；编码器用 Floyd–Steinberg 权重、按*两个*像素的合并误差来选每一项。编码器比解码器「慢几个数量级」，README 把这当作非对称格式的正常形状。它同样列出了没做的事：调色板是一个固定的小增量立方加上高斯随机的项，**并不根据图像自适应选择**；贪心搜索会把伪影拖到锐利边缘右侧；往返扫描（boustrophedon）与更好的搜索被列为未来工作，且不会改变解码器；容器就是两字节宽、两字节高、256 个调色板项，然后逐行 —— 没有任何元数据。仓库创建于 **2026-10-30**，此后没有提交，MIT/Apache-2.0。

**Why it matters:** 在每像素约 6 个周期的约束下，通用编解码器根本放不进去；唯一能打进这个预算的办法是把解码做得极简，把全部代价推到设备上永远不跑的搜索里去。请把这篇当设计笔记读，而不是产品 —— README 里没有任何编解码基准，也没有发布，所以该记住的数字是它设计时所对的周期预算。

[`🔗 raphlinus/nibnib`](https://github.com/raphlinus/nibnib) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50299811)

---

## 26. A2UI 不再要求模型直接吐 JSON —— Express「最高 3 倍」，测的是一个模型、51 个任务

- **Velocity:** ▮ steady
- **Source:** Google Developers Blog · 2026-10-27 · a2ui-agent-sdk 0.9.0
- **Tags:** `generative-ui` `agents` `a2ui` `sdk` `inference-format`

A2UI 是 Google 的生成式 UI 协议：客户端把组件目录作为契约广播出去，智能体发来描述由这些组件拼成的界面的消息，客户端渲染。最初的绑定要求模型直接写那串 JSON，每一个大括号和嵌套元素都要写 —— 团队现在承认这把「A2UI 与 LLM 绑死了」。这次发布让**推理格式可以替换**，并把 **A2UI Express** 设为默认：每行一条语句、类 Python 语法、位置参数按目录 schema 顺序映射、`_` 跳过一个槽位、`$/title` 绑定数据模型、`Event("accept")` 声明服务端动作 —— 再由 SDK 里的确定性代码编译回校验过的 A2UI 消息。

这些是上限，帖子也这么说：相对 Direct JSON **最高 3 倍**更低延迟、**最高 3 倍**更少 token，来自四种格式（Direct JSON、Express、Atom、Elemental）跑**同一套 51 任务评测、同一个 gemini-3.5-flash**，思考模式开与关各跑一遍。Express 已进入 Python（`a2ui-agent-sdk` 0.9.0）、TypeScript（`@a2ui/agent` 0.0.1）和 Dart（`a2ui_agent` 0.0.1-wip004）。第二条路径换上 **System One 决策模型**：TypeSafe 的 Jev 在约 100–300 ms 内用带校准的概率回答类型化问题，代码建树，小模型只写文字 —— 在 11 条提示的一次运行里，组件树 **92–298 ms** 上屏，整屏 0.8–1.7 s 完成，11 条全部产出合法 A2UI，而帖子把它标为「因为样本很小，只是初步结果」。

有两条约束被写出来而不是藏起来：受控生成「只能产出其语法描述的布局」（Apparite 的语法覆盖九种界面原型和十二个块）；以及 Python/TypeScript SDK **对 Direct JSON 是逐块流式，而 Express 要等完整回复再编译** —— 也就是说 token 上的收益，代价是首屏。

**Why it matters:** 模型与渲染器之间的那一层，才是生成式 UI 延迟真正所在；把它从「模型写出整棵树」改成「模型写一个小程序，由 SDK 代码编译成那棵树」，正是让工具调用变可靠的同一招。把「最高 3 倍」读成一个模型上的一次评测，并在采用前先看清流式上的这一处不对称。

[`🔗 Fast, reliable A2UI, with swappable inference formats`](https://developers.googleblog.com/fast-reliable-a2ui/) · [`🔗 a2ui-agent-sdk（PyPI）`](https://pypi.org/project/a2ui-agent-sdk/)

---

## 27. Trigger.dev 告诉客户「环境变量被拿走了」—— 三句话，没有范围，没有 CVE

- **Velocity:** ▮ steady
- **Source:** Trigger.dev 博客 + 状态页 · HN 24 pts · 约 3 小时前（约 09:09 UTC+8）
- **Tags:** `security-incident` `secrets` `background-jobs` `agent-infra`

Trigger.dev 的 CTO 在 **2026-11-01** 发了事件通告：「Trigger.dev 发生了一起安全事件。我们已经封堵了此次攻击所用的漏洞，但调查发现一部分组织存在暴露。攻击者获取了这些组织的环境变量。」状态页当晚 **22:50 UTC** 标为已解决，并说团队「会跟进提供更多细节」。到本批为止，没有 CVE、没有受影响组织数量、没有漏洞描述，也没有第三方报告；缓解步骤以邮件发给账户所有者。

公开记录里还能看到同一组件上的更早一次事件：状态页 Deployments 的历史里有一条 **2026-10-06**、持续 **2 小时 49 分**的「Degraded」，标题渲染为「Some sensitive environment variables synced fro…」—— 在组件视图里被截断，Trigger.dev 也没有把它与本次事件关联。对一个以「构建并部署 AI 智能体」为卖点的平台来说，环境变量就是每位客户智能体的模型 API 密钥和数据库地址。

**Why it matters:** 这是三天内第二份「请假定你的环境变量被读取过」的披露，前一份是 2026-10-31 的 Northflank，两份通告的形状一样 —— 漏洞已封堵、部分客户、细节稍后。运营建议不依赖那些缺失的细节：轮换平台持有的密钥，并把任务运行器的环境变量存储当作凭据存储来对待，因为攻击者就是这么对待它的。

[`🔗 Security Disclosure: Sunday November 1st`](https://trigger.dev/blog/security-incident-nov-2026) · [`🔗 Trigger.dev 状态页`](https://status.trigger.dev/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50331784)

---

## 28. VulDB 给每条记录打四次分 —— 而 NVD 再服务的那个 4.0，在 41 条里有 38 条低于记录本身

- **Velocity:** ▮ steady
- **Source:** VulDB CNA（NVD，发布于 2026-10-31T23:17 → 2026-11-02T01:17）
- **Tags:** `cve` `iot` `firmware` `scoring` `vuldb`

在本批截止的 26 小时窗口里，NVD 收录了 **41** 条由 `cna@vuldb.com` 指派的记录，全部仍是 `Received`，而且每一条在**自己的容器里被打了四次分** —— CVSS 4.0、3.1、3.0 和 2.0，同一个 CNA。NVD 再服务的并不是这一套：**全部 41 条**容器里都有 3.0 指标，NVD 的副本里根本没有；而在 **41 条中的 38 条**里，NVD 上的 4.0 分数**低于**记录里的 4.0 —— 差 0.7 到 3.2 分，且从不更高（3 条相同）。3.1 则在 **41 条里 41 条**一致。具体案例：`CVE-2026-120189` 在 CNA 容器里四个框架全是 **10.0**，而它在 NVD 的页面是 4.0 的 **9.3**，旁边是 3.1 与 2.0 的 10.0。这些向量带着 `E:P`（3.1 下还有 `RC:R`），而决定哪个数是哪个的**是算术而不是字段**：带 `E:P` 时那条 4.0 向量算出的**基分是 10.0、威胁分是 9.3**，所以容器里的 10.0 是基分，NVD 上的 9.3 是威胁分。两者都叫 `baseScore`。按 NVD 2026-10-26→11-01 的发布窗口实测：**136** 条记录的 4.0 向量带威胁指标，NVD 在 **136 条中的 136 条**存的都是**威胁**分、一条存基分；而这些记录自己的容器在 **136 条中的 123 条**存的是**基分**。NVD 在 4.0 上保留 `E`，却把 3.1 的时间指标**剥掉**（**123 条中的 123 条**），那一列因此一致。

对象是消费级与中小企业的固件 —— **WAVLINK WN536AX6-A** 占 7 条，**WN553X1-B** 6 条，**Oray 蒲公英 X5 Pro** 3 条，WAVLINK WN701AE 与 **Ruijie RG-ES205GC** 各 2 条，另有 **D-Link DIR-505**（固件 1.10B02）和一台 **Linksys E8450**。描述是固件 fuzz 输出的形状：`/bin/ioos`、`/protocol.csp` 或 `/cgi-bin/wapi.cgi` 里的一个 `strcpy` 或一个没名字的 `sub_416760`，除了网络可达之外没有写明任何前置条件。而评分是模板，不是二十份评估：**41 条里有 20 条**在 3.1 栏达到 9.9 或 10.0，它们是两个向量 —— **9 条**是 `AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H`（10.0），**11 条**是同一串把 `PR:N` 换成 `PR:L`（9.9，而 NVD 上的 4.0 是 8.6、容器里是 9.4）。

**Why it matters:** 10.0 本应意味着最坏情况可达，而这里是同一模板套在整个产品族上 —— 如果每个处理函数真的都是未认证远程代码执行，这站得住；如果不是，就会误导，因为这些行正是仪表盘上「关键 CVE 数量」的来源。但更锋利的发现在向量上游：同一条记录在它的容器里是 10.0、在 NVD 上是 9.3，而没有任何字段说明这个差，于是读 NVD 的扫描器和读 CVE 的评审各自引用对方无法复现的数字。引用指派方，引用框架，并说明你读的是哪一份副本。

[`🔗 CVE-2026-120189（D-Link DIR-505，10.0）`](https://cveawg.mitre.org/api/cve/CVE-2026-120189) · [`🔗 CVE-2026-120276（WAVLINK，10.0）`](https://cveawg.mitre.org/api/cve/CVE-2026-120276)

---

## 29. HyperFrames 把 HTML 渲染成确定性 MP4 —— 三个半小时内连发三个版本

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub Trending（周榜）· 77,426★ · 本周 +5,153 · v0.9.2 发布于 2026-11-02T09:10Z
- **Tags:** `video` `agents` `renderer` `htmx` `open-source`

`heygen-com/hyperframes`（77,426★，创建于 2026-03-10，Apache-2.0）是一个开源框架，把 HTML、CSS、媒体和可寻址动画渲染成**确定性的 MP4** —— 可以本地用 CLI 跑，可以由 agent 通过已发布的 skills 驱动，也可以作为托管创作工作流背后的渲染内核。agent 那条路才是卖点：跑一次 `npx hyperframes skills update`，然后让 Claude Code、Codex 或 Cursor 去做视频，skills 教会它整条循环 —— 规划、写出合法 HTML、接上可寻址动画、加素材、lint、预览、渲染。

今天真正值得写的是它发了什么。**v0.9.0**（2026-11-02T05:41:28Z）是破坏性版本：**AWS Lambda 与 Google Cloud Run** 上的分布式渲染现在只走 **Plan v2**，Plan v1 传输层、`planProtocol` 选项以及 v1 的事件与结果类型全部移除 —— 旧 v1 载荷会在"做任何渲染工作之前"被回以 `PLAN_PROTOCOL_UNSUPPORTED`。**v0.9.1**（07:41:18Z）随即补上这次破坏性变更造出的边角：一个没有 `PlanProtocol` 的 Lambda 状态机现在默认 v2，而不是以 `States.Runtime` 失败。**v0.9.2**（09:10:24Z）让已结束的场景交还 WebGL context，下一个场景不再被拖慢。npm `hyperframes` 的 `latest` 是 **0.9.2**，发布于 09:16:42Z —— 比 tag 晚六分钟。

**Why it matters:** 视频是 agent 至今唯一无法确定性产出的输出形态，而这里的设计答案是：把产物做成带可寻址时间轴的文档，让渲染成为文件的函数，而不是采样循环的函数。破坏性变更指向的是它不再只是玩具的地方 —— 分布式渲染农场 —— 而 SDK 和部署必须一起动：再传 `"v1"` 现在会抛错。

[`🔗 heygen-com/hyperframes`](https://github.com/heygen-com/hyperframes) · [`🔗 v0.9.0（破坏性）`](https://github.com/heygen-com/hyperframes/releases/tag/v0.9.0) · [`🔗 npm hyperframes`](https://www.npmjs.com/package/hyperframes)

---

## 30. Colibri 把 744B MoE 从磁盘流进 9.9 GB 内存 —— 在笔记本上每秒 0.05 个 token

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub Trending · 今日 +655★ · 46,157★ · v2.1.0 发布于 2026-10-31T12:50Z
- **Tags:** `moe` `local-inference` `c` `gguf` `quantization`

`JustVugg/colibri`（46,157★，创建于 2026-07-01，Apache-2.0，纯 C）利用让 MoE 模型变大的那件事本身，把超大模型跑在人们已有的硬件上：一个 744B 模型每个 token 只用约 **40B 参数**，所以逐 token 变化的只有约 **11 GB**。稠密部分 —— attention、共享专家、embedding —— 常驻内存；路由专家留在磁盘上，路由器要哪个就读哪个，经由一个会学习"你的活儿用哪些专家"的缓存。它带**十三个引擎**：十个对话模型族（GLM-5.2/5.3、GLM-5.3-Flash、Inkling、Kimi K3、DeepSeek V4 与 V4.1 Flash、MiMo-V2.6、Qwen3.8-Flash-Next、Qwen3.6、OLMoE）、一个图像模型，以及三个"以概率作答"而非聊天的决策模型。

README 自己那张表才是它区别于演示的地方。**GLM-5.2**（下载 429 GB）在**一台 25 GB 笔记本上冷启动只有 0.05–0.1 tok/s**，在 128 GB 的 Ryzen AI Max+ 395 上是 **1.83**，在六张 RTX 5090 上是 **9.0–9.2**。**Kimi K3**（2.8T，1.56 TB）大约**每个 token 9.4 秒**，专家读取速度 6.3 GB/s。**DeepSeek V4 Flash**（284B）在 32 GB 内存下是 **0.93 tok/s**。README 里的启动横幅写着 `GLM-5.2 · 744B MoE · int4 · streaming CPU · ready in 32s · resident 9.9 GB`。**v2.1.0**（2026-10-31）包含**自 v2.0.0 以来 387 个 pull request，其中 208 个来自 35 位贡献者**、每个引擎都能按原样读 GGUF，并新增 Mistral-Large-4（1T）。

**Why it matters:** 把每秒 token 数写在星数旁边 —— 这里的主张是关于*摆放*，不是速度，代价是每个专家一次 NVMe 读取。README 写明的那条设计准则才值得照抄："Less fast memory may cost speed; it must not quietly redefine the model."

[`🔗 JustVugg/colibri`](https://github.com/JustVugg/colibri) · [`🔗 v2.1.0 发布`](https://github.com/JustVugg/colibri/releases/tag/v2.1.0) · [`🔗 GGUF 支持说明`](https://github.com/JustVugg/colibri/blob/main/docs/gguf.md)

---

## 31. Paperclip 是给 agent 用的组织架构图，11 万星 —— 稳定版停在 10 月 23 日，之后只有 nightly

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub Trending · 今日 +507★ · 110,094★ · 稳定版 v2026.1023.0 打标于 2026-10-24
- **Tags:** `agents` `orchestration` `governance` `budget` `typescript`

`paperclipai/paperclip`（110,094★，18,243 fork，MIT，创建于 2026-03-02）是一个 Node.js 服务加 React UI，编排的是 agent 的**团队**而不是单个 agent：人与 agent 混排的组织架构、目标关联到任务、按公司/agent/项目分级的预算、受限的密钥、权限，以及按指派工作、追问消息或排期把 agent 叫醒的**心跳**。一句话定位是"If OpenClaw is an employee, Paperclip is the company."。花名册就是本 feed 一路追踪的那串 harness：OpenClaw、Claude Code、Codex、Cursor + Cloud、Gemini CLI、OpenCode、Pi、Hermes + Gateway、Grok Build 和 Kimi Code —— 其余东西的入口，README 自己给了："If it can receive a heartbeat, it's hired."

产物状态才是重点，因为星数不等于发布。**稳定**线是 `v2026.1023.0`，打标 **2026-10-24T00:03:59Z**、标注"Released: 2026-10-23" —— 从 beta 提升上来的 200 个 commit，头牌是私密任务与项目：别人打不开、搜不到、读不到运行 transcript、也无法通过插件触达。此后的全部是 **canary** 与 **nightly**（最新：`nightly/v2026.1102.0-nightly.0`，2026-11-01T16:08:51Z）。仓库现有 **3,469 个未关 issue 与 3,159 个未关 pull request**。

**Why it matters:** 竞争的计量单位已经从 agent 移到组织架构 —— 谁能花多少钱、谁能看哪份 transcript —— 而这是这个转向在大规模上最清楚的表述。把发布通道当作状态来读：距上一个稳定版十天，中间由每日打标的 nightly 列车顶上。

[`🔗 paperclipai/paperclip`](https://github.com/paperclipai/paperclip) · [`🔗 v2026.1023.0`](https://github.com/paperclipai/paperclip/releases/tag/v2026.1023.0) · [`🔗 paperclip.ing`](https://paperclip.ing)

---

## 32. Heretic 2.0 打破自己的配置格式、上了插件系统，并把研究功能交给 Lophius

- **Velocity:** ▮▮ rising
- **Source:** GitHub · 今日 +404★ · 37,777★ · v2.0.0 打标于 2026-11-01T13:03Z
- **Tags:** `abliteration` `model-modification` `plugins` `pypi` `agpl`

`p-e-w/heretic`（37,777★，AGPL-3.0）做的正是名字说的那件事 —— "Training-free language model modification" —— 不去训练，而是针对成对的示例 prompt 与相应的 **scorer** 做优化。默认动作是抑制拒答；另有若干随包配置分别削减 slop、幽默、谄媚，或改变情绪倾向；README 说社区已在 Hugging Face 上发布了**数千个**经 Heretic 处理过的模型。在 RTX 3090 上，默认配置处理 `Qwen3-4B-Instruct-2507` 约需 **30–40 分钟**。

**v2.0.0** 于 **2026-11-01T13:03:19Z** 打标，PyPI 上的 `heretic-llm` 2.0.0 于 **12:21:39Z** 上传 —— 距 1.4.0（2026-06-14）八个月。这是两个方向上都破坏兼容的版本。为 1.x 写的配置文件**不能用了**（有迁移指南），发布说明写得很直白："Research features have been removed. The intended replacement is Lophius."。补上的是基础设施：**通用插件系统**，含 scorer *与* modifier 插件（以及 ARA）、插件上的 `reproducible` 属性、**带端到端测试的无头运行**、benchmark scorer、数据集 config/subset 选择，以及一处修复让优化器能用 `0` 的 max-weight 下限关掉 MLP ablation。

**Why it matters:** 当 scorer 变成可插拔，abliteration 就不再是一份配方 —— 这个工具现在能操纵*任何*可度量的行为，比许可证页面上写的范围更大。对手里有一份调好的 1.x 配置的人来说，风险在迁移：过期配置不会被拒绝，它只是错的。

[`🔗 p-e-w/heretic`](https://github.com/p-e-w/heretic) · [`🔗 v2.0.0 发布`](https://github.com/p-e-w/heretic/releases/tag/v2.0.0) · [`🔗 PyPI heretic-llm`](https://pypi.org/project/heretic-llm/)

---

## 33. LobeHub 的路径穿越四月就修好了 —— CVE 十一月才来，而 npm 上没有 2.1.49 可装

- **Velocity:** ▮▮▮ trending
- **Source:** VulnCheck CNA（cveawg）· 预留 2026-11-01T12:48Z · 发布 2026-11-02T02:01Z
- **Tags:** `cve` `path-traversal` `rce` `npm` `ai-chat`

`CVE-2026-120315` 是 LobeHub Chat 文档解析里的路径穿越，最终通向代码执行，机理只有四行。`TempFileManager.writeTempFile(data, name)` 用 `join(this.tempDir, name)` 拼路径；`name` 来自 `files.name` 列，而 `file.createFile` 直接把它写成用户输入。建一条名为 `../../../../../../app/startServer.js` 的文件记录，内容放 `child_process.execSync` 载荷，再触发文档解析，载荷就落到服务启动的位置。公告给出的前置条件是**服务端数据库部署**加一个已认证会话 —— 是 `PR:L`，不是预认证。

日期才是发现。GHSA（`GHSA-2g9j-v25c-4j97`）把 **2.1.49** 列为已修复，而该 tag 自己的发布页日期是 **2026-04-10T09:51:47Z** —— 比公告发布的 10 月 17 日早 **190 天**，比 CVE 记录早 **206 天**。修复在那个 tag 上可验证：`writeTempFile` 现在把 `basename(name)` 交给 `resolve()`，注释里已经写着这个 GHSA 编号。

然后是记录指向的产物。它的 `packageURL` 是 `pkg:npm/@lobehub/chat`，而该包最新发布版本是 **1.143.3（2026-01-25）**；项目当前的包是 `@lobehub/lobehub`，仓库里声明为 **2.3.0**，而该名在 npm 上的 `latest` 是 **2.1.26（2026-02-10）**。**2.1.49 只存在于 GitHub tag，两个 npm 包名下都没有。** 评分是 VulnCheck 自己的：CVSS 3.1 **8.8**、CVSS 4.0 **8.7**；NVD 的状态是 `Received`、**0 条 NVD 自评 metric**，而 3.1 的分数从其向量精确复现。项目自己的最新发布 v2.3.0 出在 2026-11-01。

**Why it matters:** 从修复到 CVE 九个月，正是让自托管应用躺在未打补丁状态的那种披露滞后；但第二层对防御方更糟 —— 按那个 packageURL 查询的扫描器看到的每个 npm 版本都 `< 2.1.49`，而没有任何可升级到的修复版本。范围是对的，它命名的产物是另一个对象，所以补救办法要从 tag 读，不能从 registry 读。

[`🔗 CVE-2026-120315（cveawg）`](https://cveawg.mitre.org/api/cve/CVE-2026-120315) · [`🔗 GHSA-2g9j-v25c-4j97`](https://github.com/lobehub/lobehub/security/advisories/GHSA-2g9j-v25c-4j97) · [`🔗 v2.1.49 tag（2026-04-10）`](https://github.com/lobehub/lobehub/releases/tag/v2.1.49)

---

## 34. Network-AI 自己的路径清洗器就是漏洞 —— 一个没锚定的 `startsWith` 放出了一整个同级目录

- **Velocity:** ▮▮ rising
- **Source:** VulnCheck CNA（cveawg）· 3 条记录 2026-11-02T02:01:10–12Z · 修复于 5.15.5
- **Tags:** `cve` `path-traversal` `agent-framework` `npm` `sandbox`

VulnCheck 对 **Network-AI** 发了三条路径穿越记录 —— 这是一个 npm 上的 TypeScript 多 agent 编排器（`pkg:npm/network-ai`），宣称有 32 个框架的适配器 —— 第三条最该读。`CVE-2026-120313` 出在 **`InputSanitizer.sanitizePath()`** 本身，也就是那个守卫：它拿路径和基础目录比较时用了**没锚定的 `startsWith`**，于是只要某个路径的目录名和基础目录**共享字符串前缀**，它就是基础目录的同级而非子级。沙箱外的读、列目录、写随之而来，而且这一条不需要任何权限：CVSS 3.1 **7.5**（`PR:N`）、4.0 **8.7**。`CVE-2026-120311` 把穿越序列塞进**任务 id**（`FileJobStore.get()`、`.delete()`、`JobQueue.getJob()`）以读或删任意 `.json` —— 包括 `AuthGuardian` 的信任等级配置和授权 token，也就是靠删文件拼出来的授权绕过 —— 它在 CVSS 3.1 上是 **8.8**、4.0 上是 **8.7**，`PR:L`。`CVE-2026-120312` 是同一招走 **AgentVCR 的 cassette 名**（`load()`/`save()`），同样是 **8.8** 与 **8.7**。

三条都在 **5.15.5** 修复；该 npm 版本发布于 **2026-10-17T18:14:17Z**，**比记录早 16 天**，npm `latest` 现在是 5.17.1。NVD 把三条都列为 `Deferred`、**0 条 NVD 自评 metric**，所以这里的分数全是 CNA 的算术（3.1 的数值精确复现）。仓库是 **80 星**，MIT，最后推送 2026-10-27。

**Why it matters:** 一个 agent 框架的三个"沙箱"各自只是一个字符串比较，而清洗器要第一个审计，因为其他一切都信任它。体量是另一半：一个 80 星的依赖在一个批次里带出四条 CVE，不代表风险面更小 —— 只代表评审面更小，而修复仍然比记录早两周。

[`🔗 CVE-2026-120313（InputSanitizer）`](https://cveawg.mitre.org/api/cve/CVE-2026-120313) · [`🔗 CVE-2026-120311（FileJobStore）`](https://cveawg.mitre.org/api/cve/CVE-2026-120311) · [`🔗 CVE-2026-120312（AgentVCR）`](https://cveawg.mitre.org/api/cve/CVE-2026-120312)

---

## 35. Termix 的 9.9 只要一个 `destPath`，exploit 已公开，而记录说厂商从未回复

- **Velocity:** ▮▮ rising
- **Source:** VulDB CNA（cveawg）· 预留 2026-11-01T13:17Z · 发布 2026-11-02T01:45Z
- **Tags:** `cve` `path-traversal` `self-hosted` `ssh` `vuldb`

`CVE-2026-120322` 是 **Termix-SSH/Termix** —— 一个 15,780 星的自托管 Web SSH/文件管理器 —— 里的路径穿越，入口是 `/plugin-api/file-manager/transferToHost`，其中 `destPath` 参数没有被约束在传输根目录内。任意文件写，可远程发起，CVSS 3.1 给 **9.9**（`AV:N/AC:L/PR:L/UI:N/S:C/C:H/I:H/A:H`，精确复现）—— 那是基础分，带 `E:P` 的完整时序分是 9.4 —— 2.0 给 **9.0**。4.0 那一栏正是本 feed 反复记录的分叉：CNA 容器存 **9.4**，NVD 对同一串存 **8.6**，两边都带 `E:P` —— 一个向量停在两个点上，不是两份评估。

记录里有两句话比分数更重要。"The exploit is publicly available and might be used." 以及："The vendor was contacted early about this disclosure but did not respond in any way."。公开 PoC 放在一个 GitHub 仓库（`0xGenesi/CVE`）里，而不是记录里。记录也写明了补救，而那不是一个校验修复：该捷径在独立的 File Manager 插件 **v1.0.0** 里被**移除** —— 传输引擎现在一律走 SFTP 写 —— 核心的 **v26.10.0** 同样。Termix 在 **2026-11-02T00:20:19Z 发布了 v26.11.0**，大约比记录发布早 **85 分钟**。

**Why it matters:** 一个握着整片机器 SSH 凭据的 Web 终端，本质上是"有触达范围的"文件管理器，所以一个没校验的 `destPath` 就是对它能碰到的每台主机的写入。修复的形态才是要带走的 —— 厂商的答案是删掉另一条传输通路而不是清洗路径，当捷径本身就是 bug 时，这是更耐久的选项。

[`🔗 CVE-2026-120322（cveawg）`](https://cveawg.mitre.org/api/cve/CVE-2026-120322) · [`🔗 公开 PoC 说明`](https://github.com/0xGenesi/CVE/blob/main/Termix_FileManager_transferToHost_Arbitrary_File_Write.md) · [`🔗 Termix v26.11.0`](https://github.com/Termix-SSH/Termix/releases/tag/v26.11.0)

---

## 36. http4k 的 auth-int 摘要从来没哈希过 body —— 而另一个修复只存在于 `-ee` 构建里

- **Velocity:** ▮▮ rising
- **Source:** VulnCheck CNA（cveawg）· 2 条记录 2026-11-02T02:01:14–15Z · NVD 状态 `Deferred`
- **Tags:** `cve` `authentication` `http4k` `maven` `enterprise`

两条 http4k 记录在同一秒落地，第一条是教科书式的。**`CVE-2026-120317`**（`CWE-345`）说 `DigestEncoder` 计算 **auth-int** 摘要时**没有对请求实体 body 做哈希** —— 而绑定 body 正是 auth-int 存在的唯一理由。非 TLS 通道上的在途攻击者改写 body、保留 `Authorization` 头，就以受害者身份执行了改变状态的操作。**`CVE-2026-120316`**（`CWE-22`）是 `ThymeleafTemplates` 的 Caching/HotReload 里的穿越：`ViewModel.template()` 值里的 `../` 被解析时没有做容器内检查，于是由请求驱动的模板选择就能泄露服务进程可读的任意文件 —— 且无需认证。

两条都是 CVSS 3.1 **5.9**、CVSS 4.0 **8.2**，这个落差来自框架本身：4.0 一侧是 `AC:H` 与 `AT:P`。产物层面的分叉才是要动手的。`http4k-security-digest` 在 Maven Central 上有 **6.60.0.0**，日期 **2026-09-16** —— 比记录早 47 天。而 Thymeleaf 的修复是 **6.62.0.0-ee**，Maven Central 上 `http4k-template-thymeleaf` 的列表最高只到 **6.61.0.0（2026-09-29）**：那里没有 `6.62.0.0-ee` 这个产物，所以最新可公开安装的模板模块仍然落在它自己的受影响范围内（`< 6.62.0.0-ee`）。NVD 把两条都列为 `Deferred`、**0 条 NVD 自评 metric**。

**Why it matters:** 当你没法在所有地方终止 TLS 时会选 digest auth，而 body 完整性恰恰是它被扩展出来提供的那条属性 —— 一个把 body 排除在外的摘要，认证了请求行，别的什么都没认证。另一半是运维层面：对其中一个 CVE 来说，升级指令是一句话，另一个不是。

[`🔗 CVE-2026-120317（auth-int）`](https://cveawg.mitre.org/api/cve/CVE-2026-120317) · [`🔗 CVE-2026-120316（Thymeleaf）`](https://cveawg.mitre.org/api/cve/CVE-2026-120316) · [`🔗 Maven Central 上的 http4k-security-digest`](https://repo1.maven.org/maven2/org/http4k/http4k-security-digest/)

---

## 37. `@fastify/http-proxy` 没用一个 `..` 就绕过了自己的 rewrite 前缀 —— 靠解码两次

- **Velocity:** ▮ steady
- **Source:** OpenJS CNA（cveawg）· 预留 2026-10-31T13:33Z · 发布 2026-11-02T10:15Z
- **Tags:** `cve` `encoding-confusion` `fastify` `proxy` `npm`

`CVE-2026-120213` 影响 `@fastify/http-proxy` **9.0.0 到 11.6.5**，而缺陷是一次编码往返，不是穿越。当应用用参数化的 **`prefix`** 与 **`rewritePrefix`** 选项把客户端钉在一个固定的上游路径上时，插件把**已 URL 解码的路由参数**替换进 `rewritePrefix` 而**没有重新编码**。于是某个参数值只要编码了路径分隔符外加 fragment 或 query 分隔符，解码后就成了真的分隔符与分隔符号，从而注入额外的上游路径段并**剥掉 `rewritePrefix` 本要强制的必需后缀**。记录明确写了这发生在"without using any dot-dot traversal"的情况下 —— 所以查 `..` 的过滤器、或者按 `..` 写规则的 WAF，什么都看不见。它带的两条 CWE 就是诊断：`CWE-22` 与 `CWE-436`（解释冲突）。

分数是 CVSS 3.1 **9.1**（`AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:N`，精确复现），预认证。修复在 **11.6.6**，npm 发布于 **2026-11-02T08:55:53Z** —— **比记录早 80 分钟** —— 公告把替代方案堵死了："There is no workaround other than upgrading."。有一条来源说明值得占位：NVD 表里这条 9.1 的来源是 `ce714d77-…`，那正是 **openjs 自己的 orgId**，所以这个数字是 CNA 的而非某方富化 —— 记录状态是 `Received`、0 条 NVD 自评 metric。

**Why it matters:** "先解码再替换"是经典的双重解析缺陷，也是 `CWE-436` 存在的理由 —— 两个组件对"字符串何时不再是编码态"意见不一。如果你用 `rewritePrefix` 来强制一个后缀而不只是拼 URL，这就是对那个选项所配置之限制的免认证绕过。

[`🔗 CVE-2026-120213（cveawg）`](https://cveawg.mitre.org/api/cve/CVE-2026-120213) · [`🔗 GHSA-h3vp-4jfr-v364`](https://github.com/fastify/fastify-http-proxy/security/advisories/GHSA-h3vp-4jfr-v364) · [`🔗 npm @fastify/http-proxy`](https://www.npmjs.com/package/@fastify/http-proxy)

---

## 38. 十一份 agent 劫持评测把攻击样本放在 16–86% —— 到了 2% 的真实比例，AUROC 0.879 只剩 7.6% 精确率

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.41803 · 提交于 2026-10-30 · 审计 11 份评测
- **Tags:** `research` `agents` `detection` `evaluation` `base-rate`

检测**被劫持的 LLM agent** 的模型会读工具调用轨迹找异常，而这篇论文先用一次普查说明它们是怎么被评测的：在**审计的十一份评测**里，攻击或异常样本占测试样本的 **16% 到 86%**，**没有任何一份改变过这个比例**，**有六份完全没有在第二个 benchmark 或数据源上测试**。剩下的就是这掩盖了什么。在 **AgentDrift** 与 **AgentDojo** 上，**2% 的攻击率**下，一个 **AUROC 0.879** 的检测器只达到**精确率 0.076** —— 而光是负样本的构成就能把这个精确率在 **0.039 到 0.117** 之间推动。其次，随着**工具覆盖率**（测试时调用到的工具在训练中出现过的比例）下降，检测器排名在 **50% 附近交叉、在更低处反转**，因为没见过的工具映射到训练从未到达的输入；对工具输入做 dropout 基本能消除这个反转。第三，**没有任何在 AgentDrift 上训练的检测器能在 AgentDojo 上排得比随机好** —— AUROC 0.47 到 0.52 —— 包括一个在 AgentDrift 内部达到 **0.996** 的。一个两个都没训过的公开 LLM 动作监控器达到 **0.930**，但在 2% 攻击率下它公开的判定规则仍会以误报为主（精确率 **0.096**）。

论文自己的局限部分写得异常坦白，值得一并带走：只有那个监控器的方案是完全前瞻性的，若干读法是在看到相关结果之后加上的，AgentDrift 是单一生成器造的合成集且各领域的工具集完全不重叠，而且**在 AgentDojo 上，反转的 leave-one-suite-out 类比没有稳定复现**。

**Why it matters:** 基础比例就是全部论证 —— AUROC 看起来像一种能力，而 2% 的攻击占比把它变成每十三个告警里十二个是假。把攻击占比写进评测报告；至于那个反转，请把它读成作者自己在第二个 benchmark 上降级过的头条。

[`🔗 arXiv 2610.41803`](https://arxiv.org/abs/2610.41803) · [`🔗 全文（HTML）`](https://arxiv.org/html/2610.41803v1)

---

## 39. MCP 工具调用轨迹不用对话就能认出用户 —— 26.25%，纯靠猜是 17.97%

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.41885 · 提交于 2026-10-30 · 1,000 个画像、4,000 条轨迹
- **Tags:** `research` `mcp` `privacy` `agents` `benchmark`

agent 会留下**工具调用轨迹**，这篇论文问的是这些轨迹本身暴露了什么 —— 不要对话，只要协议合法的工具交互。**PrivacyTrace** 提供度量：**1,000 个合成用户画像**与 **4,000 条 agent 轨迹**，跨四个领域，用 **25 台服务器**上的真实 MCP 工具生成，由四个主流 LLM 充当攻击者。单领域轨迹访问把画像推断成功率从纯先验猜测的 **17.97%** 提到 **26.25%**。渠道分析是可动手的那半：**工具参数与返回结果**提供最大的轨迹内证据，**跨会话关联**进一步放大风险，而**精确标识符仍然很难还原**。两阶段攻击几乎追平一次性攻击，而以轨迹支持的**部分画像**为条件比匹配的先验猜测再高 **3.30 个百分点** —— 其中第二阶段仍然受益于模型的先验。

局限决定了能把它带到多远：用户行为是**合成的**（人口学校准只对齐了边缘分布，不对齐行为），而它勾勒的候选防御 —— 查询混淆、减少暴露的工具调用内容、跨服务隔离会话 —— 都被标为**未测试**。

**Why it matters:** 轨迹是比聊天日志活得更久的那份产物，也是最可能被送去第三方可观测性服务的一份。八个点的差距算不上灾难，但增量指向很具体：泄露在**参数与结果**里，所以抹掉工具名几乎不换来什么，而限定一个参数能包含什么换来的最多。

[`🔗 arXiv 2610.41885 — PrivacyTrace`](https://arxiv.org/abs/2610.41885) · [`🔗 代码：AI45Lab/PrivacyTrace`](https://github.com/AI45Lab/PrivacyTrace)

---

## 40. Latent Sparse Attention 在 1000 万 token 上把*一层 attention* 提速 22.7 倍 —— 并且说明了是一层

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.42147 · 提交于 2026-10-30 · GLM-5.3-FLASH（Qwen-3.8-27B）
- **Tags:** `research` `attention` `long-context` `inference` `indexer`

超过一百万 token 后，如果**选 key 的 indexer** 本身是二次的，稀疏 attention 就不再帮上忙 —— 而这条研究线大多卡在这里。**Latent Sparse Attention** 把打分搬进一个学出来的 **64 维隐空间**：key 在那里被层次化聚类，query 打的是簇的层级而不是每个 key。两个变体的训练方式不同 —— **D-LSA** 只训练小的逐层投影、把 LSA 蒸馏进预训练模型，**N-LSA** 仅靠 next-token loss 原生训练。也提供单层（flat）搜索；树结构让 prefill 变成次二次。

数字要带着分母一起说：在 **GLM-5.3-FLASH（Qwen-3.8-27B）上、1000 万 token 处**，D-LSA 把**一层 attention** 的 prefill 相对其**原本的稀疏 attention** 提速 **22.7 倍**、decode 提速 **4.6 倍**，相对**全 attention** 则是 **72.4 倍**与 **42.5 倍**，"同时在多项任务上保持相近精度"。N-LSA 在全 attention 精度下，于 128k token 处取得**每层 1.6 倍**的训练加速。论文直说了两处限制：它**没有**在蒸馏之后接着做整套稀疏训练（D-LSA 支持这一步，但"due to its cost"省略了），以及按层或按请求调预算"left to future work"。

**Why it matters:** 诚实的计量单位就是全部 —— 22.7 倍是一层的 prefill，不是端到端延迟，而在 1000 万 token 处，成本正是堆在这一层上。同日另一篇（**2610.42112**，Zyphra Hierarchical Attention）给出了更强的渐近主张 —— 含路由在内的总成本次线性增长 —— 也落在"压缩 key 摘要的树"上，这说明在两者交付之前，想法已经收敛。

[`🔗 arXiv 2610.42147 — Latent Sparse Attention`](https://arxiv.org/abs/2610.42147) · [`🔗 全文（HTML）`](https://arxiv.org/html/2610.42147v1) · [`🔗 arXiv 2610.42112 — ZHA`](https://arxiv.org/abs/2610.42112)

---

## 41. prompt injection 防御：对抗训练加一个更好的损失，把 AgentDojo 从 78.8% 压到 8.8%

- **Velocity:** ▮ steady
- **Source:** arXiv 2610.41998 · 提交于 2026-10-30 · 代码、数据与模型均已发布
- **Tags:** `research` `prompt-injection` `adversarial-training` `agents` `dpo`

这项工作开始时最强的公开防御模型 **Meta-SecAlign** 用 DPO 损失训练，在自适应 prompt injection 下攻击成功率仍**逼近 100%**。论文给出两个原因，并都修了。第一个是锚点：DPO 把模型约束在一个**未防御的参考模型**附近，而不安全的参考就是错误的重力井。他们的观察是：一个理想化的**注入不变、效用保持的 oracle** 的输出分布，在训练中竟然是可得的，由此得到一个有原理的 **SecPO** 损失。第二个是攻击集：Meta-SecAlign 在弱模拟攻击上训练，于是他们搭了一条对抗训练流水线合成更强的注入输入（**best@240**）并在其上训练。

结果以两个叠乘的倍数报告：相对 Meta-SecAlign，对抗训练单独在三种 SOTA 自适应攻击上把攻击成功率降低 **1.5–14.5 倍**，而 **SecPO 损失相对 DPO 损失再降 2.4–4.6 倍**。agent 工作流里的端到端数字最适合引用：在 Qwen3.6-27B 上、`AttackerMovesSecond` 攻击下，**AgentDojo ASR@800 为 8.8%，对照组 78.8%**。良性效用跨**九个 benchmark** 检查 —— agent 工具调用、指令遵循、科学与数学 —— 没有可见下降。代码、含优化注入的训练集以及模型都已发布。

**Why it matters:** 可迁移的是诊断而不是分数 —— 在一个本身不安全的参考上训练出的防御，会继承那个锚点，这是对整整一类把模型对齐到安全回答的配方的批评。把结果读成一种攻击设定、一个模型尺寸；九个 benchmark 的效用检查才是让它可被采用、而不是又一次拒答率交易的原因。

[`🔗 arXiv 2610.41998 — SecPO`](https://arxiv.org/abs/2610.41998) · [`🔗 代码：Sizhe-Chen/SecPO`](https://github.com/Sizhe-Chen/SecPO) · [`🔗 Hugging Face 上的模型`](https://huggingface.co/Sizhe-Chen/Qwen3.6-27B-Instruct-SecPO)

---

## 42. 一次预注册的 test-time search 审计：学出来的选择器比随机还差，82% 的状态根本没什么可选

- **Velocity:** ▮ steady
- **Source:** arXiv 2610.41970 · 提交于 2026-10-30 · Cosmos Policy + RoboCasa
- **Tags:** `research` `world-models` `test-time-scaling` `evaluation` `robotics`

**world-action 模型**的 test-time scaling —— 把更多推理花在候选选择与自适应分配上 —— 通常靠一个成功率增量来证明。这篇论文在 **Cosmos Policy** 与 **RoboCasa** 上审计那个增量需要的三个前提，分析计划事先注册。**决策信号：** 在干净数据上，一个学出来的**价值选择器比随机差 1.66 个百分点**，事后 oracle 也只换来 **1.40 个百分点**且其 episode 级区间跨过零，而**82% 的状态下候选结果完全相同** —— 根本没有多少可选的余量。**实际效率：** token 剪枝把每次前向的 FLOPs 最多砍掉 **47%**，但在已部署路径上至多带来实测 **1.15 倍**端到端加速（在排除 decode 的路径上是 1.25 倍），够不到它自己 **1.5 倍**的目标。**评测完整性：** 自适应分配实验在功效门槛下被判定为**无结论**。

完整性那条发现才该让所有跑 world-model 评测的人紧张：审计发现并修掉了一处**静默的渲染损坏，其发生率沿计算量大的规划路径急剧上升**，同时官方的直接策略结果并不受影响 —— 一个恰好在你正在测试的轨迹上退化的仿真器。检测器、修复与脚本都已发布，结论也明确"scoped to the tested configuration"。

**Why it matters:** 多采样候选再打分就能带来更好的控制，这个主张是一条三前提的链，而这次审计在一个具名模型上发现前两个不成立 —— 选择器没有可用信号，FLOPs 的削减没有变成墙上时钟。渲染那个 bug 才是可复用的教训：如果环境在你测试的路径上静默退化，那么 benchmark 测的是它自己的渲染器。

[`🔗 arXiv 2610.41970`](https://arxiv.org/abs/2610.41970) · [`🔗 全文（HTML）`](https://arxiv.org/html/2610.41970v1)

---

## Metadata

| 字段 | 值 |
|-------|-------|
| 生成时间 | 2026-11-02T12:10:51Z |
| 条目数 | 42 |
| 追踪来源 | 27（GitHub Trending、Hacker News、arXiv、NVD/CVE 记录、cveawg CNA、JFrog、VulnCheck、Go 安全团队、新华社、中国日报、陶哲轩博客、GitHub Releases、npm、PyPI、Hugging Face、JetBrains、DeepSeek Harness、handy.computer、Maven Central、OpenJS CNA、VulDB） |
| 更新排期 | 04:03、12:03、20:03 UTC+8（每日三次） |
| 排名方式 | 速度加权（时效 × 互动加速度 × 来源权威度） |
| 许可 | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[前一天](2026-11-01.md) · [原始 .md](https://trending.md/zh/feed/latest.md) · [存档](../archive/)
