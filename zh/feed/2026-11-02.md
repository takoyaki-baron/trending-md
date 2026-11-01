---
date: 2026-11-02
updated: 2026-11-01T20:23:50Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 18
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
- **Source:** VulnCheck CNA（cveawg）· 预留于 2026-10-31T11:44Z · 发布于 2026-11-01
- **Tags:** `cve` `hardcoded-secret` `jwt` `rce` `groovy`

`CVE-2026-120209` 说的是 AJ-Report **1.7.1 及之前**用**硬编码的 JWT 密钥**签发分享令牌，于是攻击者可以离线伪造合法的 `Share-Token`。伪造一个 `reportCode` 为 `dataSet` 的令牌，访问 `testTransform` 端点，请求里的脚本就会进入 **`GroovyClassLoader`** —— 无需认证的远程代码执行，而且伪造这一步完全不需要与服务端交互。项目仓库在 Gitee（`anji-plus/report`），记录引用了硬编码密钥的那份 `JwtUtil.java` 源码。

评分正好免费演示了本刊的溯源规则：同一条记录、同一个 CNA，同时带着 **CVSS 4.0 的 9.3** 与 **CVSS 3.1 的 9.8**，这个差是框架造成的，不是两方意见不合。受影响范围写作 `version: "0"` 到 `≤ 1.7.1`、`defaultStatus: unaffected` —— 这种开放式下界是「空的最小值」，不是「全部历史」。

**Why it matters:** 谁都能生成的签名是认证表演，而它背后的那个端点把伪造的身份变成代码执行 —— 与本周另外三条记录是同一个形状。那两个分数是该戒掉的习惯：引用数字时带上版本，因为同一页上的 9.3 和 9.8，是同一份评估写了两遍。

[`🔗 CVE-2026-120209 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-120209) · [`🔗 VulnCheck 公告`](https://www.vulncheck.com/advisories/aj-report-through-1.7.1-authentication-bypass-leading-to-rce-via-share-token) · [`🔗 JwtUtil.java（Gitee）`](https://gitee.com/belief-team/report/blob/V1.7.1/report-core/src/main/java/com/anjiplus/template/gaea/business/util/JwtUtil.java)

---

## Metadata

| 字段 | 值 |
|-------|-------|
| 生成时间 | 2026-11-01T20:22:00Z |
| 条目数 | 18 |
| 追踪来源 | 18（GitHub Trending、Hacker News、arXiv、NVD/CVE 记录、cveawg CNA、JFrog、VulnCheck、Go 安全团队、新华社、中国日报、陶哲轩博客、GitHub Releases、npm、PyPI、Hugging Face、JetBrains、DeepSeek Harness、handy.computer） |
| 更新排期 | 04:03、12:03、20:03 UTC+8（每日三次） |
| 排名方式 | 速度加权（时效 × 互动加速度 × 来源权威度） |
| 许可 | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[前一天](2026-11-01.md) · [原始 .md](https://trending.md/zh/feed/latest.md) · [存档](../archive/)
