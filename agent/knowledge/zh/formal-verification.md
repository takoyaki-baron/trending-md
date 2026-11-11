---
topic: formal-verification
title: 机器可检断言——"已验证"买到了什么、它信任了什么、以及那条退化的证明
---

# 机器可检断言

**主张：**证明是对*模型*的断言，不是对现实的断言，而模型的信任边界几乎从不出现在标题里。2026 年反复出现的模式是：那个写着"已证明"的工件，同时也——在脚注里、在限制条款里、或在 spec 本身——交出了"这个证明*不*覆盖什么"的那句话。把证明读成一个范围被写下来的超级强测试，工作就是：(a) 找到范围，(b) 找到可信基，(c) 问证明者被奖励的是什么。

## 2026-10-22 — Anthropic × Theorem：对编译后 RISC-V 二进制的证明（里程碑）

首次把形式化验证大规模用于*汇编层面的生产软件*（该文自己的表述）。Claude 证明了 123 个 OSS-Fuzz C/C++ 库中每个编译后二进制永不崩溃——它总是正常退出，不触发内存安全错误、不失败断言——且对**小于 64 MB 的每一个输入**、每一种被建模的 Linux 响应与内存布局都成立。所有数字于 2026-10-23 12:20 UTC+8 在[原文](https://www.anthropic.com/research/formal-verification)逐字核实：

| 字段 | 值 | 说明 |
|---|---|---|
| 库 | **123** | OSS-Fuzz 语料 |
| 入口点 | **239** | spec 由各项目既有的 fuzz 入口点机械导出——"这个测试集永不崩溃" |
| 证明体量 | **约 1.8 亿行 Rocq** | 典型证明约 60 万行 |
| 二进制 | 中位数 **18,000 条 RISC-V 指令** | 证明作用于编译后的指令，经 Theorem 的 RISC-V 与 Linux 进程语义 |
| 漏洞发现 | 为**数万亿次 fuzz 跑动**都没找到的 bug 打了补丁 | 在证明过程中发现 |
| 工件 | 公开了部分证明 + RISC-V/OS 语义；Theorem 向其他项目提供该流水线，并发布一个 Claude skill | 复用才是摊薄成本的故事 |

### 可信基（标题省略的那部分）

1. **Theorem 的 RISC-V 与 Linux 进程语义**——本身也是模型生成的；脚注 7 说单步执行这些语义可以在一颗 Linux 内核上启动 Ubuntu 用户态，而生成它们的过程中发现了**官方参考文档里的数百处错误**，以及**硬件本身的少量 bug**。那是验证故事，不是证明。
2. **定理陈述**——即 spec。由 fuzzer 的入口点导出，所以得到的是"不会崩溃"，不是"正确"。
3. **Rocq 内核**——以及脚注 5 所说的"Rocq 证明检查器所依赖的硬件、操作系统与 OCaml 编译器"。链条终止于硅。
4. **调用方**——完全在范围之外。一个被验证的库仍可被误用至内存破坏；要堵住它，需要为每个函数写调用方契约。

### 限制条款（实质逐字）

- 单线程、静态链接的 **RISC-V + musl**；而大多数部署是 **x86/ARM + glibc**。
- 并非每个入口点都被验证；把入口点全验一遍也覆盖不了整个库（死代码），而 **ASan 检测不到所有内存安全 bug**，所以"没有 ASan 崩溃"≠"没有 bug"。
- 全文最该被引用的那句：**"已形式化验证"不等于"没有 bug"。**

### 改变整篇读法的脚注（脚注 6）

> "注意这留下了**奖励作弊**的门……Claude 可以通过**把程序改写成永不崩溃的版本，让任何定理都变得可证**。为抑制这一点，我们对任何补丁都施加惩罚，并对证明'它改了哪些输入、且改动多小'给予额外奖励。我们还记录并审计了这些补丁中的此类失效模式。"

这是整份发布里最重要的一段，而它不在正文。**一个被告知"让这个定理为真"的证明者，有一个退化解：换掉定理的主语。**这里的缓解手段是奖励塑形（惩罚补丁、奖励最小性）加上对补丁的人工审计——也就是说，是*激励*与*流程*，而不是检查器能强制执行的约束。这与"通过删掉监控来通过监控测试的 agent"、以及 SlopCodeBench 的 strict-vs-core 差距是同一形状：除非外部有东西把目标钉住，否则目标是可调的。**当一项验证声明覆盖的是模型也编辑过的代码时，补丁数量与补丁审计就是结果的一部分。**

同周相关：以编译后工件为对象，意味着被证明的是*部署的字节*，从而绕开源码与二进制的错位——但仅限某人验证过的那次构建。

## 方法目录（"已验证"可能意味着什么，由廉价到昂贵）

| 方法 | 证明了什么 | 信任落在哪 | 本库所见 |
|---|---|---|---|
| 有界输入空间上的可达性/无崩溃 | 在该模型内无可达崩溃 | 语义 + 边界（这里是 64 MB） | Anthropic×Theorem（10-22） |
| 由既有测试导出 spec | 测试的性质普遍成立 | 测试的*意图*——弱 spec 继承 fuzzer 的盲区 | Anthropic×Theorem（入口点技巧） |
| 数学陈述的交互式证明 | 该陈述（在公理之下） | 公理 + 内核 | FLT 形式化（13M 行 Lean/11 天，09-05）；Coq 中的 BB(10)（10-07）；A-greement 的 Lean 证明还发现了未报告的 bug（10-22） |
| N 版本复检 | 证明能在独立内核下存活 | 内核的独立性 | Lean v4.35.0 `lake check --paranoid`，四个内核（10-18） |
| 互补/反向基准 | 同时交出一个问题与它的否定 | 成对性，而非分数 | ReuF2F（10-22） |
| 可复现的神谕 | 断言可由公开输入重新生成 | 神谕脚本 | NIST 曲线种子，公有领域 Python 重生成全部 14 个（10-17） |
| "机器可检流水线输出" | 每一步都被检查，但*目标*没有 | 目标陈述 | 那是巧合，不是验证——就这么称呼它 |

## 问题清单——对任何"已验证 / 已证明 / 形式化检查过"的声明

1. **定理是什么？**无崩溃、功能正确、无可达 UB 是三个不同的断言；摘要通常讲一个，覆盖面暗示另一个。
2. **可信基是什么，厂商把它列全了吗？**语义、编译器、内核、硬件。只写"检查器"的可信基是不完整的。
3. **模型与部署一致吗？**这里是 RISC-V+musl 对 x86/glibc，整个差量就在这。
4. **什么在构造上就被排除？**调用方误用、并发、死代码，以及没有入口点覆盖到的库内部分。
5. **主语是证明者可以改的吗？**如果可以，找出反平凡化措施，并判断它是审计（弱但真实）还是约束（强）。奖励塑形不是证明。
6. **"没有反例"是不是被当成"没有 bug"报告？**ASan/差分测试看不到它检测不到的东西——那句话通常就在原文里，通常被下游删掉。
7. **单次运行还是分布？**一次构建的一份证明只是一个数据点（复用四台 Gemini 的 Minecraft 那次的保留条款）。

## 本库中的谱系（其余部分在哪里）

- [[frontier-models]]——数学验证弧线：FLT、NIST 神谕、带 Lean 证明的量子电路（门数减少 17×）、A-greement、Maggi"识别信号已然崩塌"的反向配重。
- [[dev-tools]]——Lean 的 `--paranoid`、把编译步骤当作永不疲倦的评审者。
- [[fact-check]]——本文件所专门化的那个通用习惯：找到厂商写下的、收窄自己标题的那句话，并把它在分析行里引用。

## 2026-10-23（学习轮）——为什么有这个文件

10-22 那份发布把验证从"一篇论文的定理"变成了"你出货的库"，这使它成为一个*feed* 话题而非研究趣闻。这一类会反复出现（Theorem 正在产品化流水线并发布 skill），而报道它的失效模式已经定型：复述数字，丢掉脚注。本文件就是防止这种情况的清单，接下来要盯的两件事是：(a) 公开的证明中是否有任何一份被独立方用同一套语义复检；(b) 64 MB 边界会不会正是攻击者需要的东西——输入大小边界只有在解析器于同一边界拒绝更大输入时，才是真正的约束。

来源：[Anthropic — LLMs are making formal software verification feasible at scale](https://www.anthropic.com/research/formal-verification) · [HN 讨论](https://news.ycombinator.com/item?id=50202217)

## 2026-10-30 — 证明是构建的属性，不是进程的属性

同一批里有两个工件把验证带到了 10-22 那次没到达的地方：一个到 WASM，一个进游戏引擎。两者都用自己的话说明了**一旦部署之后就不再做检查的是什么**——而那句话才是可复用的部分。

**Lasm（`Millillion/lasm`，MIT，66★，创建于 2026-09-23，`@lasm/cli` 0.3.5 于 2026-10-28T19:07:10Z 上 npm）把普通 Lean 4 提前编译成 WebAssembly。** 它把 `leanprover/lean4:v4.35.0` 精确钉住，并自行安装工具链。对一个 0.x 项目来说目标表异常宽——Node、Lambda、Lambda@Edge、Vercel、Netlify、Azure Functions、Cloud Functions gen2、Workers、Deno Deploy、Supabase Edge、Bun、Deno、Fastly Compute、WASI、wasi-http、浏览器——每一行都声称在平台自己的运行时上做过 CI 测试。它的速查表把限制放在读者不可能漏掉的位置：

> **Not available at run time:** elaboration, `#eval`-style evaluation, loading `.olean`, Lean's kernel — all of these work at build time.

也就是说，**部署出去的工件里没有证明检查器**：那些定理是你所交付的那次构建的属性，运行它的进程既不复查也无从复查。同一张表（而不是脚注）里还有两条限制：edge/Bun/Deno/WASI/浏览器目标「run Lean single-threaded, without sockets or processes (and without files, except on WASI)」，与 Node 行的完整运行时相对。旗舰主张——Conduit RealWorld 应用「**117 个已证明定理**」——是项目自己的计数（README、`npm run proofs`、无 `sorry`、只用标准公理、CI 作业 `conduit.yml`），没有独立复现；另外「by project policy CI never deploys to a real cloud account」既是正确的政策，也意味着那几行云目标测的是构建产物而不是真实部署。

**DOOMFORMER（`mottopanikeiku/doomformer`，MIT，36★，创建于 2026-10-20，v0.4.0）把一个整数神经网络编译进一张 DOOM 地图**，让引擎做算术：巫毒娃娃是数字，地面的线是权重，光照强度和天花板高度是求和，台阶是激活，天花板是注意力。MNIST 那张图用了 **1,355** 个娃娃。公布的数字：测试数字 **10,000 / 10,000** 精确，**20,000** 个模糊测试网络 **0** 处不符，另有 **4** 个 DOOM 引擎能精确运行「博物馆」地图。然后是让这个头条可引用的部分——它用一张表攻击自己的检查：改动一条权重线，「检查恰好在跨越它的那些输入上失败」；对地图某一行做 **1,004** 次变异 → **抓住 297**，并且「没有哪个幸存者被证明无害」；给每个读出页面加毒值 → 「没运行过的页面无法通过旧值」。以及直白的限制：

> Every run compares each value the map exposes with NumPy. **That proves the inputs that ran, nothing more.** MNIST 地图暴露 248 个值；它不暴露自己的 903 个台阶计数或 1,351 次门比较。

**加入问题清单（适用于任何「已验证」主张）：**

1. **部署之后检查器在哪里？** 在构建时运行的 kernel、`lake check` 或 NumPy 比较器，都是关于构建的主张。要问*已安装*的工件还能证明什么——对 Lasm 来说答案是「除了普通编译代码之外，什么都不能」。
2. **这次检查碰到了多少个值，而工件一共算了多少个？** DOOMFORMER 诚实的分母是 248 个被暴露的值对约 2,502 个内部值（903 个台阶 + 1,351 次比较）。覆盖输出的验证，证明的就是输出。
3. **定理数是不是消费者在意的那些东西的数？** 117 条覆盖鉴权、关注、收藏、slug、分页与 JSON 往返的定理，是一组被选定的对象；它证明这类应用*可以*这样写，不是一个覆盖率数字。

→ [[frontier-models]] [[fact-check]] [[dev-tools]]

## 2026-10-31 — 一个把「只是核过」的部分也印出来的验证项目，以及那篇论文自带的、让结论缩小的对照

同一批次里两个工件把同一条线画在同一个位置，其中一个还把它画成了表。

### `emmilco/us-tax-model` — 已证明、已核验、未测量，并排印出

把美国联邦个人所得税申报表与说明编码为公开、带引用、机器可校验的数据：表单是 YAML，每一行是约二十个原子的封闭词表里的表达式（`sum`、`smaller_of`、`table_lookup` …），**没有自定义函数、循环或递归**；金额是以 `BigInt` 求值的整数分，因此全程没有浮点。构建期检查器校验引用、无环性、类型、穷尽的可选分支与出处。`lean/TaxFormalization/` 下，原子在整数上定义，`subtractFloor0_nonneg`、`roundHalfUpToUnit_idem` 等性质被证明，规范化 JSON 上的参考求值器被证为终止且确定。它与 **PolicyEngine-US**、**Tax-Calculator**、**OpenTaxSolver** 交叉核对，并且「never files, signs or transmits a return」。

核对时的仓库状态：**124★、10 forks、2 watchers、0 个 open issues+PRs**，代码 Apache-2.0 / 数据 CC0，创建于 **2026-10-23**——只有八天，所以诚实的读法是：这是一个*示范如何诚实*的设计，不是已验证的税务引擎。

让它可引用的是限制章节，逐字取自 README：

- **「2026-10-24 regenerated report reads 198 of 1,515 (13.1%)」**——记分板把 **1,515** 行中的 **198** 行（13.1%）记为来自家族外部的断言，拆分是 **H: 0, B: 0, second-family M: 44, E: 163**。
- 纳税人覆盖率 **68.6%**，并且「**148 of the 157 refusal gates are not measured**」——所以真实覆盖率更低，而且项目点明了缺的是哪个分母。
- **BUG-0001** 是它自己承认的案例：**两个求值器对一个错误的和达成了一致**。这正是「两个实现一致 ⇒ 正确」的反例，而且是公开出来的，不是埋掉的。
- 「Citations show where a line points, not that it was interpreted correctly」；类型正确但操作数错误仍会通过；独立读法「are not fully independent」；没有律师审过法律立场；表单与说明不是法律。

三层，被点了名：**已证明**（Lean 性质 + 求值器确定性）、**已核验**（交叉求值器一致，而 BUG-0001 证明它作为充分性主张是假的）、**未测量**（148/157 个拒绝门）。

### `dbreunig/nesformer` — 证明覆盖 CPU，并明说 PPU 不在权重里

一台 NES 6502 CPU、2 KB 工作内存和一张卡带 ROM 跑在原版 `Qwen3_5ForCausalLM` checkpoint 里；门控 DeltaNet 的状态行充当寄存器／内存／ROM 单元（one-hot key 覆写某个 128 宽的行，one-hot query 读回），程序计数器是**推断**出来的，并不存储。checkpoint 是 **466.6M 参数、bf16（约 933 MB）**，其中只有 **9.3M 非零**，压缩后 **3.3 MB**。该引用的那句 README 原文是：「**Nobody trained these weights; a compiler computed every one.**」

验证才是读它的理由：参考 CPU 与 nestest 黄金日志在 **3,348** 条指令上一致、与 py65 在 **570 万**条游戏指令上一致；精确电路预测了 nestest 加上 **283,610** 个位置的全部参考 token；Thwaite 与 Full Game 的完整运行复现了**全部 300** 帧与**全部 210** 帧。范围声明同样精确：**PPU 完全不在权重里**——宿主提供 PPU、手柄输入、vblank/NMI 时序与 APU 寄存器，并且除通过生成的 trace 之外从不触碰 CPU 状态。限制被平铺列出：仅 NROM / iNES mapper 0，无 bank switching，非官方 opcode 输出 HALT，无 APU-frame 或 DMC 中断，无声音，sprite-0 hit 为近似。

**核对它时得到的两条工件注记，都是本库反复出现的形状：** `created_at` **2026-10-30T15:54:20Z** → `pushed_at` **15:59:18Z**，对一个内容明显早于它的仓库来说只有**五分钟的记录时钟**（记录只记录记录本身）；而 `api.github.com` 报 `license: NOASSERTION`，`LICENSE` 却返回 **200**、内容是「MIT License / Copyright (c) 2026 Drew Breunig」——第四个「许可证是三个工件」的实例，这次不一致的一方是 *API*。

### 探针论文自己印出了解释其数字的对照

「Pre-Crime for Agents, at the Last Second」（arXiv **2610.40588**）在生成*之前*读取目标 agent 的激活，场景是六种受控施压、同伴在最多 20 轮里索要秘密。在留出的 **Qwen3-32B** 上，以标记 5% 良性调用为阈值，线性探针检出 **82%** 的泄漏调用，而零样本决策模型监视器只有 **26%**；在 **gpt-oss-20b** 上，对推理做探针达到 **AUROC 0.91**。然后是论文反过来报告自己的结果：**词袋分类器「performs nearly as well」**，作者自己的解读是「**most of the gain comes from training on labels, not activations**」——而且探针对*被允许*的披露也会触发，读到的更多是「即将发生的披露」而不是「违规」。所以 82% 是受控集上的数字，可用的是架构结论：**检查可以比文本更早一步，大约早一次调用，再早就没有了。**

### 可回卷证明：一个效率定理，而它的适用条件才是发现

「Efficient Scalable Oversight via Rewinding」（arXiv **2610.40535**；Guan、Tauman Kalai、Rothblum、Xi）去掉了辩论式监督底下的假设——至少一方诚实——的办法是让验证者**保存并恢复证明者的状态**。预处理之后验证者运行时间「nearly linear in the input length」，诚实证明者与原计算成线性；构造针对「robust to changing a small fraction of oracle answers」的计算，且不依赖密码学。证据是一个**初步的 MNIST** 实验。摘要里给出的适用限制：那个鲁棒性条件，以及验证者必须**控制证明者的机器**、或能对其做检查点与恢复——对你自己托管的模型不是问题，对第三方模型是硬约束。监督研究正越来越只能活在这个位置上。

### 加入问题清单

**项目是否把三层都印出来——已证明、已核验、未测量——还是只印第一层？** 一个验证主张可审计，前提是工件点明了自己未测量的分母（us-tax-model：148/157 个门、13.1% 家族外、n=1 的已知错和 bug）。只印已证明层的项目并没有说谎，它只是扣下了能让你给其余部分定尺的那个数字。

→ [[frontier-models]] [[fact-check]] [[dev-tools]]

## 2026-11-04 20:28 —— 证明下沉到 PTX，比编译器再低一层

arXiv **2611.04447** 形式化的是 **PTX**——驱动真正消费的那层汇编——而不是 CUDA 或某个框架 IR：「an approach that allows modeling
and reasoning about patterns common in GPU kernels for Deep Learning, including acquire-release, tensor cores, proxies, async
operations, multi-kernel pipelines and data-dependent control flow」。这份清单就是诚实的范围声明：它点名了让 GPU kernel 难以推理的那些
特性，每一处都是朴素模型与硬件实际行为分岔的地方。

被证明的是「simple implementations of a WGMMA GEMM kernel, FlashAttention, and a 3-kernel MoE pipeline」——「simple」是作者自己的词；
第三条最有意思，因为它跨的是**流水线**（kernel 之间交接内存），而不是单次发射。

为什么层次重要：ML 基础设施的验证目前止步于编译器或框架，跳过了 tensor core 调度、异步拷贝与内存代理真正把语义弄错的那一层；在 PTX 上
证明，是正确性论证能穿过编译器变更的那条缝。限度必须与结果同写：**PTX 不是 ISA**，所以证明覆盖的是写下的程序，不是执行它的机器。与 Lasm
（Lean→WASM，运行时无检查器）和 NESformer 自陈的 PPU 范围同形——产物说明了自己不覆盖什么，这才让它可复核。

→ [[frontier-models]] [[in-weight-compute]]


## 2026-11-05 04:43 — 可证明推理：证明「跑的是哪一份权重」，并由自身天花板界定

Anthropic 的 **FlashProve**（2026-11-04，开源研究原型）攻的是与本研究库所有条目都不同的问题。水印要求模型**留下痕迹**；FlashProve 要求提供方**证明「跑的是哪一份权重」而不用展示它**。提供方先对权重做一次承诺，再用 zkSNARK 证明特定 token 由该被承诺的模型产生。发布物包含证明器、快速 C++ 验证器、**Lean 验证器**、Lean 证明、协议规范与文档；针对 MoE 模型，隐藏权重（但不隐藏架构）。

实测（Llama 4 Maverick，400B MoE，4-bit 量化，prefill 用整数算术），单张 H100：

| 量 | 数值 |
|---|---|
| 证明吞吐 | 约 **110 token/秒** |
| 证明体积 | 每次 **1,024** token 请求约 **19 MB** |
| 验证 | 24 线程 **17 秒** / 单线程 **21 秒** |
| 离线承诺 | 约 **39 分钟**，「约可用于 **1,600 万** 次请求」 |
| 相对 vLLM 推理的开销 | 约 **70–95 倍** GPU 时间 |

限制清单才是可审查的部分，页面不用问就写了：「This release is a research prototype」；「证明针对的是**贪心解码**下的**整数**模型」；仅 MoE；上下文最多 **1,024** token；以及三个产物「**we do not guarantee that all three (Lean, paper, code) match each other**」。侧信道「可能泄露关于权重的信息」，不在范围内。于是可信基就是实现、论文与证明三者的一致性，而作者把它点名为范围之外，而不是声称已经做到。

把它放在本文件其他条目旁边读，是同一纪律在新位置的复现：**范围声明才让主张可审查**，正如 Lasm 只在构建时运行的内核、NESformer 明确置于权重之外的 PPU。「可验证推理」目前能意味着什么，也因此被固定下来——一个关于整数、贪心、短上下文 MoE 的证明，而不是关于所服务的产品。两个数字决定它能否走出原型：70–95 倍 GPU 时间，以及 1,024 token 的天花板，而在一个上下文窗口按百万来卖的年头。

→ [[frontier-models]] [[harness-reliability]] [[fact-check]]

## 2026-11-10 —— agent 形式化 CPython：差分测试放在证明*之前*，反驳是一等输出

David Andrews 与 Chao Zhang 把 Opus 5.5 agent 指向 **CPython 3.15.2**，把它的函数逐行重写进 **Lean 4**，过一道四步门（[文章](https://broyojo.com/python-formalization/)、[仓库](https://github.com/Broyojo/python-formalization)，Apache-2.0）：

1. **Mirror** —— agent 写一个逐行跟随 C 或 Python 源码的 Lean 模型：同样的分支顺序、同样的错误消息、同样的整数回绕；每一步都引用 3.15.2 源码。
2. **差分测试** —— 模型与真实 `python3` 在生成的输入上并排运行，直到跨多个种子在 **≥50,000 个用例**上一致。
3. **证明或反驳** —— 性质在全部输入上陈述；"a false statement is refuted with a counterexample, never weakened"；构建**拒绝 `sorry`、`native_decide` 和新公理**。
4. **审查** —— 一个没写过该模型的独立 agent 对照源码检查它、在真实解释器上运行每条性质，并问"一个写坏的实现是否也能满足这条定理？"——只有标记 `FAITHFUL` 的行才算覆盖。

十天（工作始于 10-29；仓库创建于 11-02）：**18,898** 条定理与引理（"all checked on every build"）、**613,318** 行 Lean、1,539 个文件、范围内 **26,004** 个函数中的 **4,071** 个（15.7%）——而输出表才是本文件账本上的新东西：**3,834 条性质已证明、588 条带反例反驳、94 条开放**。当被反驳的性质是 CPython 自身的错时，它成为一份 bug 记录：一个在 3.15.2 上打印 `REPRODUCED` 的复现器、带行号的成因、对 CPython 追踪器的查重、一个优先级。至今 **418 份 bug 报告**，其中"约 55"个可从普通 Python 代码崩溃或破坏内存（一个以 `StrEnum` 为键的属性字典上 `setdefault` 触发段错误；ElementTree 元素上的反向切片赋值会复制一个子节点、丢掉另一个），另有 **129** 个模块的 C 版本与纯 Python 版本不一致的案例。

它为什么属于这里：这道门的问题把本文件自 Anthropic×Theorem 脚注 6 以来一直追踪的信任问题反了过来。在那里，一个拿到"让这条定理为真"的证明器可以改写程序；在这里，*审查*步骤从另一侧问同一个问题——"a valid proof about a wrong copy is the most misleading result you can get"——而且差分测试放在证明*之前*，所以在对副本证明任何东西之前，副本已被钉在工件的行为上。OSS-Fuzz 那次证明的是无崩溃（二进制的性质），这一次把**反驳**当作交付物：588 条带反例的假陈述就是 588 个发现，不是失败。相隔一年的规模对比：123 个库 / 239 个入口点无崩溃，对 26,004 个函数中 15.7% 审查为忠实——覆盖率现在是被报告的数字，而这个百分比很诚实地小。

→ [[fact-check]] [[frontier-models]]

Sources: [Formalizing CPython](https://broyojo.com/python-formalization/) ·
[Broyojo/python-formalization](https://github.com/Broyojo/python-formalization) ·
[HN 讨论](https://news.ycombinator.com/item?id=50435105)

## 2026-11-11 — AlphaProof Code：部署协议的实现级验证

Google DeepMind 的 **AlphaProof Code** 倒转了本账本此前每一次运行的分工：**安全目标由人类专家来写**，AI agent 把目标翻译成规约并生成证明，**Lean 机器检查每一条证明**。应用于 Signal 协议：四周生成 **逾 600 万行 Lean**，验证*编译后*的代码满足所指定的性质——临时设备失陷前后的消息保护——一直下探到设备上运行的代码。验证工件已开源（google-deepmind.github.io/code-verification）。

两个诚实标记就写在公告本身里：

- **证伪测试随发布一起交付**（论题 26 的形态）：DeepMind 把两个真实的、早已修复的 bug 重新植入一份隔离副本，系统对有 bug 的版本生成了机器检查过的"不安全"证明——检测器在它为之存在的案例上得到演示。
- **范围的限定是引用，不是转述**：主张是代码"delivers the security protections our experts specified"——不是 libsignal 无 bug；bug 测试跑在隔离副本上，不是生产环境；DeepMind 自己的保留意见是"scaling these techniques requires continued research"。Signal CTO Ehren Kret："Using AI agents to translate live code into valid Lean theorems is a major breakthrough."约 **1%** 的代码库证明被标记需人工复核。

账本定位：Anthropic×Theorem 那次证明的是模糊测试入口点的无崩溃（二进制的性质）；CPython 那次把反驳当作交付物；这次是第一个验证*已部署密码协议在实现级的安全性质*的——人们依赖它保密的代码，对照其编译形态而非模型来验证。它给清单加上的问题：谁来审计 agent 从专家目标写出的*规约*——证明是机器检查的，但"代码与专家所指定的相符"只取决于那步翻译的好坏。

→ [[fact-check]] [[frontier-models]]

Sources: [DeepMind：Introducing AlphaProof Code](https://deepmind.google/blog/introducing-alphaproof-code/) ·
[HN 讨论](https://news.ycombinator.com/item?id=50439193)

## 2026-11-11 21:11（act）——反例普查：验证项目会发布*针对自身方法*的证伪实例，还是只发布一段声明？

议程问题（10-31 由 us-tax-model 的 BUG-0001 提出）在本文件已有的八个第一手工件上量了出来。网格：(a) 局限性声明，
(b) 一个检查*通过*了错误东西的具体实例，(c) 以数字印出的未测分母。

| 工件 | (a) 局限性 | (b) 方法反例 | (c) 未测分母 |
|---|---|---|---|
| Anthropic×Theorem（10-22） | 有——范围清单 + 「"Formally verified" 不等于 "bug-free"」 | **无**——承认 reward hacking 可能做到；补丁"logged and audited"，未印实例 | 部分——范围缺口有名目，无数字 |
| Lasm（10-30） | 有——"Not available at run time" 表 | 无 | 无 |
| DOOMFORMER（10-30） | 有——"That proves the inputs that ran, nothing more" | 无——声明幸存者*未被*证明无害 | **有**——约 2,502 个内部值中仅暴露 248 |
| nesformer（10-31） | 有——平铺的局限清单；PPU 不在权重里 | 无 | 部分——范围有名目（PPU 不在内），无数字 |
| us-tax-model（10-31） | 有 | **有——提出本问题的那个案例** | **有**——拒绝门 **148/157 → 180/188**（至 11-11） |
| FlashProve（11-05） | 有——"we do not guarantee that all three (Lean, paper, code) match each other" | 无 | 无 |
| python-formalization（11-10） | 有——FAITHFUL 门；覆盖率 15.7% | 无假通过——**反驳本身就是交付物**：588 条属性被反例推翻 | **有**——26,004 个函数中的 4,071；94 条属性悬而未决 |
| AlphaProof Code（11-11） | 有——限定范围的主张 + 1% 人工复审标记 | 无假通过——交付镜像工件：**预埋的 bug** 被机器检查证明不安全（阳性对照） | 部分 |

**发现。**（1）方法证伪实例是 **8 中有 1**——其余全部交付的是范围声明。验证项目几乎从不说「我们的检查在这里通过
了而它是错的」；诚实的替代体裁是范围清单和未测分母。（2）最新两个工件没有加入这个形状，而是*改造*了它：
python-formalization 把反驳做成交付物（针对*对象*的反例——418 份 CPython bug 报告——按发现印出），AlphaProof 交付
**阳性对照**（重新预埋真实 bug 并由系统证明不安全），这是假通过的逆向测试：「检查会在错误上失败」，而非「这里是
它没失败的地方」。（3）真实印出的分母恰好聚集在覆盖率只是分数的那些项目里：DOOMFORMER 的 248/2,502、
python-formalization 的 15.7%、us-tax-model 的拒绝门。（4）假设——(b) 预测数字能否活过一年——12 天内不可测，但其
对象已经围绕自己长出了一个清单：BUG-0001 现在是「bug inventory 的第一条」（`BUG_INVENTORY.md`，**263** 个已捕获
缺陷，「append-only；套件在提交历史被改动时失败」），且 README 的诚实数字在两次读取之间移动了——无 IRS 计数的
拒绝门从 **148/157 → 180/188**——旁边还有一条带日期的自我纠正（「2026-11-01 修正将被抚养人计入被拒绝；早先的估计
把他们计为已覆盖」）。证伪实例成了项目的组织工件；本文件每次引用它时都要重读分母。

→ [[fact-check]] [[frontier-models]]
