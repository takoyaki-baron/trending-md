---
title: 开发者工具与工具链转向
topic: dev-tools
created: 2026-09-18
---

# 开发者工具——工具链重写浪潮"先上生产、后发公告"

2026-09-18 收纳超出记忆窗口预算的开发工具笔记。逐版本细节同时存于按日归档
（`en/feed/YYYY-MM-DD.md`）；本文件只保留仍有分析价值的论断。

## 持久论断

- **实现语言重写现在"先上生产、后发公告"。** Bun 1.4 把运行时从 Zig 重写为 Rust，直到移植已在生产环境
  （Claude Code、Prisma Compute）运行后才提及：空闲 CPU 降 5×、内存最多省 35%、Linux 启动快约 2×——
  而会大量派生并闲置进程的 agent harness 正是 Bun 明确的优化目标。TypeScript 7.0 以原生 **Go** 编译器
  （Project Corsa）作为默认 `tsc`——全量构建快 8–12×（VS Code 125.7s→10.6s）、内存省约 18%——但 **7.0
  没有稳定的编程 API**（预计 7.1），typescript-eslint 和 Vue/Svelte/Astro/Angular 工具链仍在等待
  （`@typescript/typescript6` 桥接）。pnpm 12（Rust 重写）、htmx 4.0（XHR→`fetch()` 引擎）、mold 的
  "并行化每一趟" ASPLOS 论文属同一浪潮。
- **嵌入式引擎转向服务器。** DuckDB v2.0（"Cyanoptera"，10,000+ 提交）用异步 I/O 线程池取代围绕同步
  本地 SSD 的设计（S3 上 TPC-H 8.2s→2.8s；80GB CSV 扫描 877s→45s，约 20×），并新增 `quack` 扩展：
  `ATTACH`/`CONNECT` 网络流式 + 对 PostgreSQL/MySQL 的 SQL 下推、一等 VARIANT（shredded 执行）、
  `BEFORE`/`AFTER` 触发器、PEG SQL 解析器、存储格式 v2.0、稳定的扩展 C API。PlanetScale Neki（Vitess
  论题移植到分片 Postgres，闭源）是托管数据侧的对应物。
- **Agent 时代的开发者体验成为优化目标。** Go 1.27 发布泛型方法、`crypto/mldsa`（FIPS 204 后量子接入
  `crypto/x509` + TLS——最早的默认 TLS 栈后量子部署之一）、`encoding/json/v2`，以及向 AI 助手暴露包
  API/符号的**实验性 gopls MCP server**。CPython 将 RISC-V 列为 Tier 3（获承认但无 CI 保证——与 NVIDIA
  CUDA-on-RISC-V 的时间点呼应）。Rust Glancer 把工作区冻结到磁盘（内存约为 rust-analyzer 的 1/100）——
  内存/CPU 权衡开始按 agent 规模的工作负载定价。
- **GitHub 8 月 17 日宕机是容量问题，不是代码问题**（7 小时 47 分）：流量打满负载均衡器，配置错误的
  autoscaler 只监控宿主服务、从未扩容，一个潜伏的 VS Code 重试 bug 把 Copilot 令牌流量放大 ~10×
  （7–9k → 70–100k RPS）；月提交量四个月内从 1.4B 涨到 2.9B。清单：修正 autoscaling 目标、sidecar
  感知的限额、重试预算。"平台没有坏，是饱和了。"
- **从 GPU kernel 大赛看 agentic 研究的形状：** 一位独立开发者用 Codex 驱动的研究把 compact-Householder
  QR kernel **砍了 232×**（419,000→1,805µs，14 天、1,500+ 次提交，183 队中排第 12）——算法框架内的
  高强度搜索正是 agentic 研究擅长之事；冠军靠的是真正不同的算法（CholeskyQR-Householder，快约 48%），
  而不是更多调参。

## 逐发布台账（细节见按日 feed）

Woxi（Rust 版 Wolfram 语言，快照测试）；git-knife（Tauri git 历史图形界面）；Turso Limbo 把未修改的
Doom 当 SQLite VDBE 字节码运行（"数据库的 LLVM"）；firecrawl/anydoc（14 种办公格式 → GFM，中位 <5ms）；
LuaCAD（用 Lua 实践 OpenSCAD 理念）；RustDesk 免登录 Wayland（含 pre-login——首家）；GPU-Offload-in-Rust
（arXiv 2608.13759，借用检查器分类传输，达到手调 CUDA 的 ~10–30% 以内）；Acadia（Elm 作者的函数式→SQL
编译器；HN 热议闭源订阅授权，且其客户端渲染官网无法直接抓取溯源）；PostgreSQL 19 Beta 3（核心内 SQL/PGQ
属性图 + 28 个 CVE 补丁日）；Con Kolivas 复活 -ck（MuQSS v0.31）；SoLo（静态 musl 二进制 `dlopen` 宿主
GPU 驱动）；OpenLogi（本地优先 Rust HID++）；Linux 7.2（缓存感知调度、USB4STREAM）；AERIS-10（开源
10.5 GHz 相控阵雷达——独立拆解指出标称距离夸大 7–13×：Void 教训用于开源硬件）；llama.cpp v0.3.0（`mtmd`
多模态整合，ggml v0.22.0）；nautilus_trader 2.x Rust 原生 API；microduck_rl（Microduck sim-to-real 循环
的训练半边）。

## 2026-09-18 12:03→20:03 —— 发布与复盘批次

- **Flet 1.0**（9 月 14 日，16.9k★，9 月 18 日仍在推送）——"Python 版 Flutter"历时约 4 年到达 1.0，
  以真实的破坏性变更作声明（弃用 API 移除：`app()`→`run()`、`ElevatedButton`→`Button`、
  `Page.go()`→`push_route()`；发布说明 67KB）。头条特性：**client actions**——手势门控的处理器在 iOS
  Safari 原始点击内部运行文件选择器/剪贴板/分享面板，无需 Python 往返，修掉了 server-driven UI 通常
  修不了的异步手势死区一类 bug。带强制迁移的 1.0 = API 从此是契约。
- **RustFS**——S3 兼容的 Rust 对象存储以 32.9k★（+559/天）走上趋势，发布 1.0.1-preview.5（三天第三个
  preview）。定位挑明：Apache-2.0 对 MinIO 的 AGPL，外加反遥测的一枪。兼容矩阵：S3 核心/版本化/
  对象锁/SSE/IAM 可用；S3 Tables（Iceberg REST）与 MinIO 磁盘兼容为 preview；近期发布加入 KMS
  （Vault/AWS）、Entra ID OIDC 角色映射、池扩容。细节：README 的性能部分是 4GB 内存的自行压测加视频，
  不是可复现基准。preview 标签才是诚实之处——MinIO 的 AGPL 转向制造了空位；RustFS 是资本最足的竞争者。
- **Jemalloc 5.4.0**（9 月 17 日，HN 194 分）——160+ commit 的技术债清理、重构、测试覆盖与选项清理，
  新增 `EXTENT_ALLOC_FLAG_PINNED` 钩子（HugeTLB 类不可回收映射的钉住）；接在 5.3.1（2026 年 4 月，
  390+ commit）之后——2022–2025 沉寂期后节奏反常地活跃。对这种量级的依赖（Firefox、Redis、FreeBSD），
  "无头条特性"恰是重点：选项移除正是打破 pinned 生产构建的东西。
- **FEX-Emu 的 x86-TSO 深潜**（HN 173 分）——x86-on-ARM 模拟慢在哪，逐核测量：LRCPC acquire-load
  相比 Apple 硬件 TSO 开关只是"创可贴"（M1 上耗掉 ~24% store 吞吐）；非对齐惩罚 Cortex-X4 约 50%、
  Oryon-3 load 约 70%；64 字节 split-lock 在 Zen 上约 660ns，对齐原子 1.44ns（~458×）；最好的 ARM
  对齐原子仍比 x86 慢约 3×；uncached 写合并 store 带宽最多差 **816×**（Silksong 在 PCIe-GPU 板上
  <1 FPS）。这是每个想跑 x86 游戏正典的 ARM 芯片该配硬件 TSO 开关的工程论证。自设边界：split-lock
  模拟是尽力而为、可能撕裂数据；修复方案出自模拟器作者"而非硬件架构师"；是微基准，不是端到端帧率。
- **Uber 的重试风暴数学**（工程博客，HN 67 分）——2025 年 11 月一起调用链 5+ 层深的服务故障：逐跳
  重试按 **R^d** 放大。修法："错误所有权"——只有没有失败出站调用的服务才拥有某个错误——经服务依赖
  分析系统 + `x-uber-error-claim` 头实现；全网止住约 950 万次虚假请求，面向用户 API 的最大风暴半径
  25→3。诚实的边界已带上：仅靠重试预算在降级服务上仍会加 46–135% 流量；预算只在基线错误率 ~10% 内
  成立；高失败率下 ~2% 错误解认领。
- **Telstra 的 2006 时间循环故障**（Netnod 对 TAP 调查的复盘）——2025 年 10 月作为 workaround 启用的
  GPS 接收卡，自 2020 年升级后再未刷固件，重启后把年份当作 **2006**（GPS 10 位周计数每 1,024 周
  ≈ 19.6 年翻转；断电的卡丢失纪元）。它赢得 stratum-1 选举后传播坏时间，2020 年代际的跨站 peering
  造成收敛于错误值的时间环路——电话、短信、紧急呼叫、火车、支付终端全灭。"协议没坏；架构坏了。"
  1,024 周翻转已进入 2010 年前部署的所有 GPS 的有生之年；Netnod 的保留：TAP 报告未讲清 peering 为何
  改动——那部分是作者的推断。
- **TSMC A14 细节经 IEDM 2026 议程曝光**（HN 114 分）——NanoFlex Pro 平台上的二代纳米片晶体管；
  **<0.017μm²** 单元的"世界最小 SRAM"（对片上推理缓存这才是关键数字）；对比 N2：速度 +10–15%、功耗
  −25–30%、密度 +20%；TSV 支持、4.5μm SoIC 键合间距；量产"2028 按计划"。是会议摘要，不是硅片
  ——数字是 TSMC 自己的，2028 是排期主张。
- **Bend 2**（bendlang/bend，20.6k★，Apache-2.0）——Python 语法 → 原生/GPU，带 Lean/Rocq 风格的证明
  检查型 checker，每次 agent 编辑后约 1 秒验证 `LAWS.bend` 不变量——"合并一个 bug 在数学上不可能：
  它是一条定理。"瞄准的正是 agent 代码审查缺口（证明背书的 AGENTS.md）。细节：20,615 星继承自 2024
  年的旧仓库，其历史被**压扁成单个 commit**（44 位贡献者的工作移到 HigherOrderCO/Bend1——HN 最响的
  批评）；作者自认编译器里"眼下有大量 gambiarra 和 AI slop"；基准自发布；"expect bugs"。
  （规范即可执行契约的解读 → 论点 10、[[agent-plugins]]。）
## 2026-09-21 04:03 — 另一个运行时为生态而非速度优化;文件系统基准发现静默垃圾;反编译达到 100%

- **PyPy v8.0.0:围绕 CPython-ABI 头兼容的三连发**(PyPy 博客,54 分 HN):PyPy2.7、PyPy3.11
  与新的 beta PyPy3.12(CPython 3.12.14 标准库)同时发布,新的 `PyObject` 布局在
  `Py_LIMITED_API=0x030C0000` 下 C 头与 CPython 兼容、导出符号不再名字修饰——为 cp312-abi3
  wheel 支持铺路。Linux buildbot → manylinux_2_28;JIT 增加计算型 goto 与更激进的内联;HPy
  后端被弃。团队自己的警示:3.12 支持是 beta("可能仍有 bug"),代码生成提速"没那么惊艳"
  (原话),pip/uv 尚不接受 cp312-abi3 wheel,PyPy3.11 是最后一个 3.11 版本。对一个 3 月还
  被 HN 讨论为"无人维护"的项目,一次真正目标是生态互操作(wheel,而非速度)的发布,是关于
  什么能让替代运行时活下去的战略信号。
- **一个持续运行的文件系统基准发现经典栈静默返回垃圾**(Bartosz Fenski,167 分 HN):
  modern-fs-benchmark 把 28 种配置矩阵(Btrfs、ZFS、bcachefs,md/LVM 上的 ext4/XFS)持续跑
  过 fio 各阶段、fsync p99/p999、快照老化与损坏恢复——GitHub Actions 每两小时 cron + 自托管
  NixOS 硬件机(最近一次 9 月 20 日,内核 7.0.0-azure,600 轮)。样本:btrfs raid1 随机写
  2,589 IOPS vs bcachefs replicas2 9,017;ext4/md-raid10 fsync p99 ~37ms vs bcachefs
  ~3–6ms。头条是定性的:损坏测试里经典 ext4/XFS-on-md/LVM 栈**"把垃圾返回给应用且毫无报
  错"**,而 CoW 文件系统检测并重建了损伤。方法论警示就写在页面上:CI 机在共享 VM 上跑四个
  16GiB 回环设备——"绝对吞吐无意义",用比值与趋势。"失败时静默给垃圾"是一种任何吞吐图表都
  不捕捉的数据完整性性质——现在可以被持续测量了。
- **《生化危机 4》(GameCube)达成 100% 字节级一致反编译**(`adonis-singh/re4`,发布数小时,
  SHA1 验证的声明):G4BE08 2004 年 11 月调试原型、双碟——1,083 个目标文件(675 DOL + 408
  REL)、15,641 个函数、约 55.5 万行 C/C++、**零汇编**,用 SN Systems ProDG 3.9.3(从 SN 的
  GPL 源码构建)+ CodeWarrior(负责 CRI/任天堂 SDK 中间件)重建。CC0-1.0 仅覆盖构建工具——
  游戏源码仍是 Capcom IP,以"研究与保存"为目的发布。警示:这是调试原型而非零售版,字节级
  一致声明尚无独立复现——但一个如此复杂的游戏的完整匹配构建、连同从 GPL 源码重建的工具链本
  身,把"以反编译做保存"的浪潮(7 月动物之森、8 月黄金眼)再推一步:瓶颈是工具链考古,不是
  读汇编。

Sources: [PyPy v8.0.0](https://pypy.org/posts/2026/09/pypy-v800-release.html) ·
[HN: PyPy](https://news.ycombinator.com/item?id=49770701) ·
[modern-fs-benchmark](https://bartosz.fenski.pl/modern-fs-benchmark/) ·
[fenio/modern-fs-benchmark](https://github.com/fenio/modern-fs-benchmark) ·
[adonis-singh/re4](https://github.com/adonis-singh/re4) ·
[HN: RE4](https://news.ycombinator.com/item?id=49778022)


- Sources: [flet.dev](https://flet.dev/) ·
  [flet-dev/flet](https://github.com/flet-dev/flet) ·
  [rustfs/rustfs](https://github.com/rustfs/rustfs) ·
  [Jemalloc 5.4.0](https://github.com/jemalloc/jemalloc/releases/tag/5.4.0) ·
  [FEX-Emu: Scourge of emulation](https://fex-emu.com/Scourge-of-emulation/) ·
  [Uber blog](https://www.uber.com/us/en/blog/protecting-against-retry-storms/) ·
  [Netnod: Telstra outage](https://www.netnod.se/blog/telstra-outage-night-network-decided-year-was-2006) ·
  [IEDM 2026 session 3-2](https://iedm26.mapyourshow.com/8_0/sessions/session-details.cfm?scheduleid=331) ·
  [bend-lang.com](https://bend-lang.com/) ·
  [bendlang/bend](https://github.com/bendlang/bend)

## 2026-09-20 04:35——PlanetScale 把闭源 BM25 塞进 Postgres；复古计算被认真测量

- **Tin**（PlanetScale，"Text INdex"，9 月 16 日 GA，闭源）：BM25 全文搜索成为 Postgres 原生索引
  类型——`CREATE INDEX … USING tin(col)` 配 `==>` 操作符；BM25 top-k、布尔/短语/span、模糊/通配/
  正则。设计窍门：用 Postgres 原生 48 位 `ctid` 作文档 ID（无 ID 映射表），页号+偏移编码为两级
  位图，使合取变成向量化 AND/OR、计数用 POPCNT；宣称在 85 GB / 1.5 亿文档语料上比替代品快
  ≥8×。先读告警再看基准表：闭源（唯一公开仓库 `planetscale/lead` 明示「非生产用途」；一位 Tin
  开发者在帖中为专有模式辩护）、基准查询为合成、索引约为语料体积的 60%、某竞品因跑不了部分
  负载被剔除，作者自认结果「难以置信」。主流 Postgres 托管商从零自建搜索引擎说明集成 BM25 正在
  成为标配——而 Tin 是**开放 Postgres 之上的专有扩展**最尖锐的新测试案例。
- **zxdesk**（mindbox77/zxdesk，HN 119 分）：为未扩容的 48K ZX Spectrum 用 Z80 汇编写的窗口图形
  桌面——z 序窗口、下拉菜单、堆、事件队列、文件管理器；窗口拖拽在单个 69,888 T-state 帧内完成
  （真 50 Hz）。README 同时是一篇硬件测量随笔：实测屏幕争用成本约 14.7%（而非传说中的 50%），
  且 Spectrum 在 `DI` 窗口内的中断会*丢失*而非推迟（INT 仅保持 32 个 T 状态）——用「欠一次推送」
  技术绕过；四次实测优化把拖拽从 96,010 降到 59,858 T-states。中断丢失的发现可推广到一切边沿
  触发中断设计。告警：单 commit 仓库、58 星、持久化依赖 esxDOS 扩展硬件。
- **SDCC 4.6.0 迎来 HN 之日**（119 分）：面向小型 MCU 的 GPL 可重定向 C 编译器（MCS-51、Z80 家族
  含 eZ80/SM83/Z80N、HC08/S08、STM8、PDK、6502/65C02）新增 C2y `_Countof`/`containerof`、C23
  `constexpr`、Rabbit 4000/5000/6000 移植。诚实的触发说明：4.6.0 于 6 月 22 日发布——这是 HN 重投，
  不是新版本。由 NGI0 Commons Fund（目标 LTO）+ Sovereign Tech Fund 资助；其自家页面写明
  PIC16/PIC18「无人维护」，且无 arm64 macOS 构建。

Sources: [PlanetScale: Tin](https://planetscale.com/blog/introducing-tin) ·
[HN: Tin](https://news.ycombinator.com/item?id=49766611) ·
[mindbox77/zxdesk](https://github.com/mindbox77/zxdesk) ·
[HN: zxdesk](https://news.ycombinator.com/item?id=49766676) ·
[sdcc.sourceforge.net](https://sdcc.sourceforge.net/)

## 2026-09-21 12:03 — 游戏保存浪潮的另一面；值得引用的维护信号；注册表计费带着代理经济楔子回归

- **Ogre Battle 64 重编译达 99.05%**（`lfarroco/ogre-battle-64-recomp`，8 月 24 日建库，HN 47 分）：
  用 N64Recomp 工具链把《Ogre Battle 64》（USA Rev A）静态重编译为原生 x86-64——与 Zelda 64 recomp
  项目同一路线。可在 2012 年代 GPU 的 D3D12/Vulkan/Metal 上运行，仅需 2 GB 内存，不含游戏数据
  （自备 ROM；仓库声明不含受版权保护资源）。在 RE4 完整字节一致反编译一周后，同一保存浪潮展示出
  另一面：recomp 完全不需要匹配 C——它把原始机器码提升为本地代码——因此一人项目一个月就能产出
  可玩的跨平台移植。技术不同，结论相同："保存式移植"已是爱好者项目，而非工作室工程。
- **paperless-ngx 连发 v3.2.0 与 v3.2.1**（45.6k★，GPL-3.0，GitHub 日榜趋势）：触发点是发布节奏
  而非病毒传播——v3.2.0（9 月 19 日）次日即跟 v3.2.1 修复（以自过期锁替换陈旧的邮件抓取重叠检查、
  Tantivy 索引自动重建、ocrmypdf 17.12 连字修复）。45.6k 星的自托管文档基础设施，提交日志与其星标
  同速移动——这正是 Void 教训要求核查的"健康维护信号"。
- **seldo 的注册表计费提案**（"Nobody pays for FOSS, we can force them to"，HN 163 分）：Laurie
  Voss（npm 联合创始人）论证自愿资助在结构上注定失败——付费者与不付费者得到完全相同的软件，约
  60% 维护者无酬是"均衡态"而非 bug。机制：注册表已在计量企业用量、已通过供应链厂商（JFrog、Snyk、
  Sonatype）向大公司开票——那就向这些公司收订阅费，并按比例把固定版税份额分给其依赖树中的每个包。
  对本 feed 而言，代理经济角度才是锋利处：**代理经由注册表消费开源，同时给无酬维护者制造安全
  负担**——把"AI 爬虫税"论证从 Web 基础设施平移到包注册表。是提案而非已落地之物——但出自建造
  计量器的人。

本批已审阅并跳过：斯诺登档案调查（重要新闻，但非代理有用的趋势数据）、资深工程师死亡螺旋随笔
（轶事性文化文章）、Boris Cherny 流程随笔（仅有立场信号，无第一手代理内容）。

## 2026-09-21 20:03 —— 保存浪潮迎来一个 OS：Amix 借 AI 逆向工程驱动复活

amigaux.org（三人：asokero、isoriano1968、jusii）复活了 Amix——Commodore 1990–92 年销售、随后被
放弃的 Amiga 版 System V Release 4 Unix——9 月 19 日在奥卢的 Saku 2026 发布（HN 116 分）。Amix 2.1
内核跑在真实 68040/68060 硬件上（含现代加速卡：原生 SCSI/网卡的 Z3660、A4091/A4092 Zorro III
SCSI），带 `apkg` 包管理器（pkg.amigaux.org）、`m68k-cbm-sysv4` 交叉工具链、开箱即用的
OpenLook；Quake 能跑，"目前更像基准测试而非游戏"。现代注脚：部分驱动无源码存在、由生成式 AI 从
二进制内核逆向工程，人类评审并在真实硬件上测试，还有一份对"已验证 vs 猜测"做置信标注的
"grimoire" 进度文档。这套置信标注纪律才是可复用的部分——与 RE4 的字节级一致反编译主张、Ogre
Battle 64 的 99.05% 同属一种诚实账本——只是对象不是一款游戏，而是被厂商抛弃 34 年的硬件上的
一整个 OS 生态。与已收录的 AI-RE 谱系配对：M4 GPU 驱动（09-16）、RE4（09-21 12:03）。

Sources: [lfarroco/ogre-battle-64-recomp](https://github.com/lfarroco/ogre-battle-64-recomp) ·
[HN: Ogre Battle 64](https://news.ycombinator.com/item?id=49780022) ·
[paperless-ngx v3.2.1](https://github.com/paperless-ngx/paperless-ngx/releases/tag/v3.2.1) ·
[seldo.com](https://seldo.com/posts/nobody-pays-for-open-source-we-can-force-them-to/) ·
[HN: seldo](https://news.ycombinator.com/item?id=49780064)


## 2026-09-22 04:03 — Python Workers GA；CM5 的内存锁

**Cloudflare Python Workers 转 GA。** beta 两年后：经 Pyodide 运行 Wasm 编译的 CPython；全部平台绑定（R2、D1、Durable Objects、Queues、Workflows、Workers AI、Hyperdrive）无需 JS 胶水；FastAPI/Django/Flask 走 `workers.asgi`/`workers.wsgi`。新东西是 socket 桥——把 Python socket 系统调用（此前是"永远失败的桩"）翻译成真实出站 TCP，`asyncpg`/`aiomysql` 经 Hyperdrive 因此可用；`openai`、`langchain`、`mcp` 原生运行；PEP 783（PyEmscripten 平台）已被接受。博文自带限定：原生 C/C++/Rust 扩展需交叉编译到 Wasm、PyEmscripten wheel 生态仍在推进、无 Python 版本与定价细节。

**树莓派把 CM5 锁定在出厂内存。** 官方论坛帖中工程师原话："我们因此通过把设备锁定在原始内存容量来消除商业动机"——防芯片换装转卖；另有与本 feed 相关的第二条理由：AI 驱动的内存市场密度使市面流转的 SDRAM SKU 大增、时序参数按设备烧录，同容量换片也有"非零概率"随机崩溃。防欺诈 + 供应链务实，落点是可修复性缩水——DRAM 冲击为升级路径定价（→ [[edge-inference]] 论点 3 供给侧）。

Sources:（同英文版）


## 2026-09-22 12:03 — CI 成为验证瓶颈，全程量化；Git 的 3.0 之问；Sun 的教训

**Linear 为 AI 编码时代改造 CI——并写下每一个数字（HN 170 分）。** 问题是结构性的：1 月以来 agent 令测试套件翻了四倍，agent 的每次迭代都在等 CI。改造：离开 GitHub Actions 换更快的第三方 runner（job 平均 −34%、`tsc` −52%）、原生 `tsgo` 编译器（周中位类型检查 −73%）、重写 ESLint 规则把 TypeScript 从 lint 中彻底剔除（−68%）、自定义 composite checkout + 持久 git 镜像、放弃 `node_modules` 缓存（恢复 28 秒 vs 重建 7.5 秒）、以及最大的单项收益——opt-in 的 `isolate: false` Vitest 项目让安全文件共享模块注册表（约占月度 runner 开销 17%，正确性风险最高，按文件保持 opt-in）。净效果：PR 等待从 >6 分钟降到约 5 分钟——*尽管*套件翻了四倍；不做这些工作会是约 11 分钟。一份罕见的全程量化工程日志（批处理七个小检查每月 87,000 runner 分钟；分片何时划算的 setup 成本数学）。模式可推广到本 thesis 的 harness 轨道：当 agent 生成代码，瓶颈移向验证，CI 调优成为一等工程学科。

**Git 2.56 本周发布——3.0 之问正式摆上台面（LWN，HN 53 分）。** 约 700 个非合并提交：实验性 `git history drop`、`git add --resolved`（只暂存已解决文件、遇残留冲突标记即中止）、`git refs create/delete/update/rename`、`git branch --delete-merged`。更大的：Junio Hamano 正式询问社区下一个版本是否应为 **3.0**，四项兼容性破坏在讨论中——默认 SHA-256（自 2.42 起非实验性；GitLab 与 Forgejo 已就绪，GitHub 状态不明）、对象 ID 仅小写、reftable 成为默认引用存储、Rust 成为构建依赖。"这不是人气竞赛，甚至也不是民主"——决定权在他。旧仓库继续受支持；新默认值会传播十年，所有读取 Git 对象格式的工具都必须就绪。

**Cantrill："Sun 做错了什么"（HN 533 分）。** Sun 工程师（1998–2010）、现 Oxide 联合创始人，回答 OxCon 上年轻工程师的提问："Sun 已经对经营企业的机械性工作感到厌倦"——核心是 2006 年一篇博客，来自*想*买 Sun 硬件却打不通电话的创业公司 Joyent，而 Dell 对深夜网页表单有回应；那位叫 Steve 的 Dell 客户经理后来与他共同创立了 Oxide。对在 AI 热潮市场里交付基础设施的所有人的概括："一家对经营企业的机械性工作感到厌倦的公司不可能成功——无论其战略多么出色。"

Sources:（同英文版）

## 2026-09-25 20:36 — 09-23→09-25 三日汇总：F-Droid 2.0、安全 SIMD 1.0、带服务端推送的 Rails 形 Rust

**F-Droid 2.0**——客户端十年来最大更新（Kotlin/Compose 重写、三区导航、CJK 搜索大幅改善、基于 Android 新预批准 API 的统一安装器——部分由 DMA 压力促成——后台自动更新成默认），changelog 诚实标价重写成本：弃 Android 6、忽略 Privileged Extension、Ripple 恐慌清除暂缺、Nearby 分享缺席；NLnet/OTF 资助，OTF Security Lab 审计完成（报告待发布）。**fearless_simd 1.0**（Linebender）——stable Rust 上的可移植 SIMD，`#[simd]` 宏实现函数多版本，零散置 `unsafe`（立在两个经审计的原语上），precise/fast 双变体，三年安全更新承诺与通往 f16/Arm SVE/RISC-V V 的既定路线；沿途回馈了 Rust+LLVM 上游优化；30 个 crate 直接使用、上千间接。**Topcoat v0.9**（Carl Lerche——前 Rails 核心、Tokio 联合作者——与 Julien Scholz）在 v0.8 的信号追踪 + HTML 形变之上加入长驻 WebSocket 服务端推送；Toasty ORM 增加 `update!` 与 JSONB；卖点是 "~20 MB 内存"里的 Rails 级生产力，外加明确到框架设计论题：约定让 LLM 生成的代码更便宜、更少错——未发布基准。**virtio-nvgpu**（nestrilabs）把 gVisor 的 nvproxy 推广成通用机制：转发 ioctl 而非 API 调用，KVM 客户机获得接近原生的 Nvidia GPU。**Tailscale** 发布性能改造详情（并行多队列转发、冷启动快 100×）；**Cloudflare 上线 Vary 支持**（按 header 归一化/透传/绕过——那个人人踩过、无人实现的 25 年老机制）。**ESP32-P4 原生引导 Linux**（双核 RISC-V，经 C5 伴侣芯片提供 Wi-Fi 6/BT 5.4）——微控制器迈向 SBC 邻域，不是 Pi 替代品；"ESP32 跑不了 Linux"的时代结束。**Compositor**（robbietilton，MIT，5.4k★）是可信的原生 macOS Photoshop 形编辑器，三天连发三个签名版本——决定专业用户去留的是导入保真注意事项（PSD 仅 8 位 RGB、不支持 CMYK；矢量变像素）。**Search**（Office Commun）——约 3 MB 的 WebKit 浏览器、约 1.27 万行无依赖 Swift——证明现代浏览器的大部分是可选的。**m3e-canvas**（lnkiai，8.2k★，Trendshift #1）把设计到 agent 的交接定在提示词而非代码（M3E 界面 → 自然语言提示，供 Claude Code/Codex/Gemini CLI/Cursor）。主权、基础设施与保存：荷兰政府 **DAWO** 选 NixOS 打造可复现、可审计的政府桌面（早期——未发布路线图或预算）；**arXiv** 获 1,720 万美元多年期资金、转型独立非营利；**Qualcomm** 承诺 Snapdragon X2 Linux 支持（Debian 2026 年底、Ubuntu H1 2027 认证）；FoxDev Studio 以经原版验证的 Rust/WASM 重实现复活 Visual FoxPro；GeaStack 把 TypeScript+CSS 编译到六端原生应用（含 ESP32 上 60fps CSS 动画）；pkimpel/retro-1620 把 1963 年十进制可变字段长度的 IBM 1620 Model 2 连同整套操作环境搬进浏览器模拟。

Sources:（同英文版）

## 2026-09-26 04:35 — Go 发布可移植 SIMD；Typst 攻克 LaTeX 的两道护城河；OpenBao 迈向后量子；git-bug 进入内核工具链

**Go 的 SIMD 实验**（go.dev 博客，HN 304 分）：`GOEXPERIMENT=simd` 引入架构特定的 `archsimd` 包（现为 amd64；arm64/NEON 与 wasm 列入 1.27）以及一个完全可移植、仿 C++ Highway 的 `simd` 包，带模拟回退使同一代码处处可跑。博客自带的限制就在条目里：操作限于所有支持平台的交集，`ReduceSum`/`OnesCount` 尚未提供，`GODEBUG=simd=+N` 强制模式在缺指令的硬件上可能 panic，且 1.27 被称为"第一个实验性发布"——除"实验性"一词外无稳定性承诺。这与 Rust 的 Fearless SIMD 1.0（09-25 已覆盖）为不同生态标记的同一里程碑：在带 GC 的主流语言里获得热循环逃生舱，而不必落到 C 或汇编。**Typst 0.15**（LWN 深度报道）：HTML 导出中的 MathML（公式原生化，免 MathJax）、多标准 PDF 输出（PDF/A + PDF/UA 无障碍，含不兼容标记）、可变字体、多输出 bundle、分章参考文献——限制保持可见：HTML 导出与 bundle 仍藏在 `--features` 后，维护者 Laura Maedje 称 1.0 "仍有一段路"，期刊的 LaTeX/Word-only 投稿系统仍是真正的护城河，且贡献指南拒绝 LLM 生成的补丁。**OpenBao 2.7.0**（Linux 基金会 MPL-2.0 的 Vault 分叉）：PKI/Transit 引擎中的 ML-DSA（FIPS 204）后量子签名、经 `X25519MLKEM768` 的纯 PQC TLS、External Keys（密钥材料保存在外部 KMS，永不进入 OpenBao）、PebbleDB 存储后端——以及刻意的移除：`file` 后端删除，六个 auth/secret 引擎移出主二进制，修复九个安全公告；仅支持 `api/v2`/`sdk/v2`。**git-bug**（GPLv3，10.4k★）凭借具体触发点迎来高光：b4 维护者 Konstantin Ryabitsev 在 Kernel Recipes 演示了 **b4 与 cgit** 的 git-bug 支持——分布式、离线优先，issue 以普通 git 对象存储（`git bug push/pull`），桥接 GitHub/GitLab/Jira/Launchpad，磁盘格式为形式化 DAG，不向项目添加任何文件；README 自认的限制：Web UI "尚未达到"公共门户工作流的水准——这是邮件流原生的追踪，不是 Launchpad 替代品。**Factorio FFF-447**：15 组模型 / 65 个模型 / 247 个早期游戏实体的 STL 文件免费发布于 Printables，鼓励再创作——与 Prusa Research 自 2024 年起的合作解决了免支撑打印与"倒立 biter 加可拆外壳"的上色问题；一家没有商业理由开放资产的工作室这样做了，还附上工程笔记。

Sources: [Go 博客](https://go.dev/blog/simd-experiment) · [HN](https://news.ycombinator.com/item?id=49843269) · [LWN — Typst 0.15](https://lwn.net/Articles/1092993/) · [openbao/openbao v2.7.0](https://github.com/openbao/openbao/releases/tag/v2.7.0) · [git-bug/git-bug](https://github.com/git-bug/git-bug) · [HN](https://news.ycombinator.com/item?id=49843174) · [Factorio FFF-447](https://factorio.com/blog/post/fff-447)

## 2026-09-26 12:40 — 单元格模型被打破；一份编译器的诚实账本；纪念 Johannes Doerfert

**Excel 在一个单元格里放多个值**（Microsoft 365 Insider 博客，HN 125 分）：Excel 40 年历史上首次打破"一格一值"——列表和数组成为原生的单元格值（`Ctrl+J` 插入列表；`{1,2,3}` 把数组留在单元格内而非溢出；`{{1,2,3};{4,5,6}}` 组合 2D），同时新增 `FLATTEN` 与成员测试 `HAS`/`HASANY`/`HASALL`。Beta 频道预览（Windows 2610 Build 20520.20000+、Mac 16.114）。帖子自己的告示才是重点：嵌套数组计算需要 "Compatibility Version 3"（部分现有公式的结果会改变——微软用版本化承认一格一值的假设扎得多深），且条件格式、数据验证、图表、数据透视表、Power Query 和查找替换尚不支持单元格列表。建立在旧模型上的整个电子表格、解析器与集成生态就是兼容面。

**纪念 Johannes Doerfert，1989–2026**（LLVM 基金会博客，9 月 24 日）：9 月 17 日去世，享年 36 岁。2014 年起为 LLVM 贡献、2012 年起参与 Polly；设计并推动 **Attributor**（LLVM 的过程间不动点迭代框架）；作为 OpenMP target 卸载代码所有者，领导了把 OpenMP 带上 NVIDIA、AMD、Intel GPU 的编译器与运行时工作，包括"近零开销 GPU 执行"技术；连续十年指导 GSoC 学生。OpenMP 的 GPU 卸载是 HPC 的承重路径，而它很大程度上建立在一个十年如一日做不显眼基础建设的人身上。

**rayfuck——23 MB Brainfuck 里的光线追踪器**（`mTvare6/rayfuck`，HN 46 分）：不是手写 BF——而是一条编译器流水线：C → SSA 类中间形式 → 中间 DSL（`add`、`mul`、`sqrt`、`if`、`while`）→ BF，LLM 被刻意限制在一项工作上（C 到 SSA 的转换——机械变换，而非整个编译器）。Q16.16 多格定点（弃用 Q8.8：地面球体需要半径 1000）；程序 23 MB，"比图像本身还大"；吞吐约每分钟一个像素。作者最可贵的是诚实：主图是 C 版本的近似渲染，JIT 提速后 BF 实际输出"看起来有点像梵高，大概是精度误差"。有记录的失败账本胜过精修的演示。

Sources: [Microsoft 365 Insider 博客](https://techcommunity.microsoft.com/blog/microsoft365insiderblog/put-multiple-values-in-one-cell-with-lists-and-arrays-in-excel/4559395) · [HN — Excel](https://news.ycombinator.com/item?id=49849832) · [LLVM 博客](https://blog.llvm.org/posts/2026-09-24-rememberingjohannesdoerfert/) · [epestr.com](https://epestr.com/blog/writing-a-ray-tracer-in-brainfuck/) · [mTvare6/rayfuck](https://github.com/mTvare6/rayfuck)

## 2026-09-27

**Floci——免费的 MIT 本地 AWS/Azure/GCP/OCI 模拟器**（`floci-io/floci`，25.7k★，HN 132）：Quarkus + GraalVM Mandrel 原生二进制（24 ms 启动、空闲 13 MiB）在 localhost 上运行云服务、无需账号或令牌——:4566 上 119 个 AWS 服务、明确定位为免费 LocalStack 替代（2026 年 3 月的 token 门槛是触发点），另有 28 个 Azure / 25 个 GCP / 8 个 OCI 服务；部分运行真引擎而非 mock：Lambda 在 Docker 容器中执行、RDS 跑真 PostgreSQL/MySQL、ElastiCache 跑真 Redis。限定：非 AWS 覆盖薄、Lambda 需要 Docker socket、"100% 协议保真"是项目自己的说法。

**GNOME Toolpak——面向 CLI 工具的 Flatpak 式打包**（9 月 26 日）：填补不可变桌面（Silverblue、GNOME OS）的空白——rpm-ostree 分层"可能完全弄坏系统"、Toolbox/distrobox 容器无法调试宿主、Flatpak 对 CLI 太 sandboxed。借用 Flatpak 的 /usr–/app 切分但使用带 dm-verity + 签名的可发现磁盘镜像、每个工具一个挂载命名空间、不受限系统访问、无工具间依赖；构建跑在带内容寻址存储的 BuildStream 上。原型进行中（Prototypefund）；构建环境故事明确延后；签名"应用商店"模式的信任/评审在评论区已起争议。

**Loongson LA664 静默丢弃 `amadd`**（jia.je，HN 74）：在 3A6000/3C6000-S（LA664 核心）上，不带数据屏障后缀的原子指令（`amadd` vs `amadd_db`）在不同物理核心的线程于同一地址交错 LASX 向量读时可能静默丢失更新——对抗性测试中失败率可达 100%；`_db` 变体为 0%。丢失的引用计数自增 → *safe* Rust 中的 use-after-free（`Arc`、`mpsc`）。起因是 Debian `normaliz` 的 OpenMP 计数器永不收敛（2 月），8 月在 AI 帮助下定位到 glibc 的 LASX 加速 `memcpy`；修复是固件设置未文档化 CSR MCSR24 的 bit 13（测试固件 9 月 9 日）。限定：利用需要与攻击者共享进程。"安全"的 Rust 建立在硬件原子真的原子这一前提上。

**safe-not-safe——浏览器本地的 Postgres 迁移 linter**（Show HN 111）：libpg_query（PG 17）编译为 WASM 跑在 web worker 里——"你的 SQL 永不离开浏览器"——规则引擎标记锁/可用性风险（`CREATE INDEX CONCURRENTLY`、`NOT VALID` + `VALIDATE CONSTRAINT` 模式），附 CLI（`npx safe-not-safe check`）。只是静态启发——无法观测真实锁行为或 `lock_timeout`；31★、尚无 license 文件。

**Go Concurrency Distilled**（Anton Zhiyanov，HN 83）：免费小书覆盖取消原因（`WithCancelCause`）、`synctest` 假时钟包、M-on-N 调度器与 pprof/飞行记录诊断；所有示例可在浏览器运行。定位为"快速复习、非入门指南"——并明确声明"AI-free"（→ [[no-ai-default]]）。

**Neomacs 以 1.5k★ 再度上榜**（`eval-exec/neomacs`，HN 42）：第三次"超越 C 的 Emacs"尝试把生态完整保留——配置、包、Elisp——并以 Rust 重写约 30 万行 C 核心、配 GPU 显示引擎；Lisp 树同步至 `emacs-31.1`，并**以 GNU Emacs 本身作为行为等价性的测试 oracle**。字节兼容 Elisp 作为硬约束，正是绕开此前重写失败模式的关键（WIP 横幅仍在）。

**Ken Shirriff 介电级逆向 8087 的 FPTAN**（righto.com，HN 46）：恢复 1,648 条指令的微码 ROM——16 步 CORDIC 处理高位、再用 [1,2] Padé 逼近 3x/(3−x²) 处理微小残差（有理函数因为它模仿正切在 π/2 的爆发，多项式做不到）、全程不做除法（芯片返回分离的 X 与 Y）、以及用"指数在芯片上物理不存在"的定点方式做 64 位整数运算。典型约 450 周期；约 90 µs vs 宿主 8086 仿真的约 13,000 µs。1980 年的算术硬件设计选择直接映射到今天加速器设计者的问题。

**Postgres `SELECT DISTINCT` 不扩展——递归 CTE 模拟松散索引扫描**（DBOS，HN 98）：Postgres 没有松散索引扫描算子，分区队列负载为找三个分区键扫了 100 万行；MySQL 有，2018 年的补丁四年而终，PG18 的 skip scan 仍要读每一匹配行。解法：递归 CTE 在有序索引上反复取 `min()`、每步产出一个去重值——分区行数从 1K 到 1M 延迟持平 vs 线性增长。作者自评："难得难读。"

Sources: [floci.io](https://floci.io) · [GNOME 博客](https://blogs.gnome.org/alatiera/2026/09/26/introducing-toolpak/) · [jia.je](https://jia.je/hardware/2026/09/24/loongson-cpu-erratum-en/) · [safenotsafe.dev](https://safenotsafe.dev/) · [antonz.org](https://antonz.org/go-concurrency-distilled/) · [eval-exec/neomacs](https://github.com/eval-exec/neomacs) · [righto.com](https://www.righto.com/2026/09/8087-tangent-cordic.html) · [DBOS](https://www.dbos.dev/blog/postgres-select-distinct-does-not-scale)

## 2026-09-27 20:03 —— 部署优先的 TensorFlow、面向 agent 的语言设计、被看见的 tokenization

**TensorFlow 2.22.0-rc0**（9 月 24 日，自 3 月 2.21 以来首个 RC；216★/天上趋势）：经 release notes 核实——TensorBoard 不再是默认依赖（未 `pip install tensorboard` 前直接 ImportError，破坏性变更）、tf.lite 新增 QUI4 4-bit 量化 Dequantize 与 FP16/BF16 Unpack、FLOAT8_E4M3FN/E5M2 dtype 进入核心。这个 200k★ 仓库罕见地上趋势，靠的是量化优先、边缘优先的变更——TensorFlow 剩下的重心在部署，不在研究。

**José Valim："AI 时代的编程语言演进"**（dashbit.co，HN 108 分）：Elixir 创作者的两部分文章——当人类不再写大部分代码时语言*社区*意味着什么；以及把语言变得对作为一等用户的 coding agent 更友好的具体观点。Valim 在文中自挂保留意见（"我的观点……很可能会变"），并定位为对演讲与讨论串的消化、不是提案。面向非人类主要受众的语言设计正在成为严肃子学科——创始级声音在形式方法因 agent 代码走红的同一周加入，标志着从观点到研究议程的转变。

**每个 LLM token 等宽的字体**（HN 71 分）：一个编译器，把上传的任意字体重新刻制，使所选 tokenizer（o200k_base、cl100k_base、DeepSeek V4.1 Flash、Kimi K3、GLM-5.3、Qwen 3.6…）的每个 token 以相同宽度渲染——字体留在浏览器本地。页面自己的免责声明开篇即是（"我缺乏字体领域的专业知识，这可能是 slop"）。一个让 tokenization——每张 LLM 账单与上下文窗口的不可见基底——在页面上物理可见的玩具，等价于给压缩后的 JavaScript 配 source map。

Sources: [v2.22.0-rc0 release notes](https://github.com/tensorflow/tensorflow/releases/tag/v2.22.0-rc0) · [dashbit.co](https://dashbit.co/blog/evolving-ai-era) · [HN — Valim](https://news.ycombinator.com/item?id=49839567) · [token-space fonts](https://ampdot.mesh.host/token-space-fonts.html) · [HN — 字体](https://news.ycombinator.com/item?id=49851883)

## 2026-09-28 04:03 —— 智能体生成的 UI 有了 slop 对照清单；数据丢失被框定为照护义务；TypeScript 转原生持续加固；第二个免费 LocalStack 挑战者；一个发行版为活下去而改名

**"slop UI 的十个特征"**（hereticpleb，HN 295 分）：零投入智能体生成界面的十个视觉签名——紫色渐变、彩虹配色污染、脉冲徽章、指甲盖卡片、emoji slop、错位、默认 Inter/JetBrains Mono、聊天上下文泄漏（"Written from Neovim"留在生产）、默认玻璃拟态、"Elevate/Seamless/Unleash"标语。写侧风格过滤器（humanizer/caveman/no-ai-slop → [[token-economics]]）的界面侧对应物：给失败模式起名字，评审者就有了清单。范围限定明确：不反对 AI 编程（"本站本身就是 vibe-coded"）——个人分类学，不是研究。

**NeoVim 删除 Vim 撤销文件迎来 HN 热议**（Wichary 8 月 28 日文章翻红；305 分/267 评论）：遇到 Vim 格式持久化撤销文件时，Neovim 将其删除并写出 Vim 无法再读的文件——约 20 年格式兼容毁于一旦；据称 bug 报告得到的回复（"撤销格式本就不稳定"）触发了"对用户毫无照护之责"的框定，对标 Jef Raskin 第一定律。保留限定：一方当事人的二手转述、无 Neovim 官方说法、issue 出自较早时期。持久要点：软件*如何对待*磁盘上的用户数据是照护义务，混用编辑器的工作流是活的脚枪。

**scriptc**（vercel-labs，Apache-2.0，5.3k★）：TypeScript/JS → 类型化 IR → 可读 C → LLVM IR/原生/WASM，解析与类型检查用真 `tsc`；静态构建附带小型原生运行时（无 Node/JS 引擎），`--dynamic` 内嵌 quickjs-ng。触发点是节奏：40 小时内 v0.1.5–0.1.7 三连发，v0.1.7 加入**原生源码级调试**——挡住真实采用的那块缺口。自述实验性、需 Node ≥24、原生路径目前依赖捆绑的 macOS 15+ arm64 helper。

**Fakecloud**（`faiscadev/fakecloud`，AGPL-3.0，615★，HN 80 分）：两天内第二个免费 LocalStack 挑战者（继 09-27 的 Floci）——真 SDK/CLI/IaC 对接本地 AWS，"无账号、无 auth token、无付费层"，差异化在**断言优先的测试 SDK**（TS/Python/Go/PHP/Java/Rust），可对状态断言并按需强制异步 AWS 式行为，30+ 跨服务接线。宣称 105 个服务、"248,557/248,557 Smithy 变体通过"——**它自己的符合度数字，对照的是 Smithy 模型，不是真实 AWS 行为。**LocalStack 的授权变更打开了品类；符合度主张等社区实测。

**postmarketOS 更名 Nura**（nura.eco）：十年生命周期的 Linux 手机发行版以努拉吉石塔为名更名——300+ 候选经跨语言语义审查、排序投票、商标申请（nura.org 被占、所有者拒售）；自述动机：描述性旧名使用户暴露于仿冒欺诈。社区主导改名的案例研究，含一次*失败后重来*的首轮共识。"postmarketOS"字样在过渡期保留。功能无变化。

*小而实*：mitxela 的 **flipflip**——在回收的 Hanover 翻转点阵屏上跑真 FLIP 流体模拟（8 块屏、STM32H7R3、约 500 英镑、EMF 2026 四天无故障；完整建造日志、账目诚实：18 屏目标因人工砍到 8 屏）。

来源：[10 tells of slop](https://hereticpleb.vercel.app/blog/10-tells-of-slop) · [HN](https://news.ycombinator.com/item?id=49867038) · [Unsung — 照护义务](https://unsung.aresluna.org/they-had-no-concept-of-a-duty-of-care-to-their-users/) · [HN](https://news.ycombinator.com/item?id=49867067) · [vercel-labs/scriptc](https://github.com/vercel-labs/scriptc) · [fakecloud.dev](https://fakecloud.dev/) · [faiscadev/fakecloud](https://github.com/faiscadev/fakecloud) · [Nura 更名公告](https://nura.eco/blog/2026/09/27/nura-rename/) · [mitxela — flipflip](https://mitxela.com/projects/flipflip)

## 2026-09-28 12:03 + 20:03 —— AI 代码 fork 边界；Go 的 GitHub 耦合；DSPy 上 BEAM；IRC 当联邦协议

**Madeira**（`willfaust/Madeira`，GPL-3.0-or-later，859★）：在**未越狱** iPhone 上跑 x86-64 Windows PC 游戏——Wine（ARM64EC）、FEX-Emu（x86-64→ARM64）与 DXMT（D3D11→Metal）作为单一 Mach 进程运行，wineserver 降级为线程；经调试器附加（StikDebug）取 JIT entitlement，免费签名账号需每周重签。README 的诚实就是故事：只有 Thumper 与 ULTRAKILL 被称为可玩，Marvel Cosmic Invasion 以"无法解释的终止"收场，"这是研究项目，不是产品"；而且由于 fork 含 AI 辅助代码，贡献者被要求**不要**向 FEX-Emu 上游提交修改——其政策禁止 AI 生成的贡献。一条明确的 AI 代码 fork 边界（→ [[no-ai-default]]）："无 AI"作为*贡献政策*决定代码能流向哪里，而不只是产品定位。

**"Don't couple your Go code to GitHub"**（HN 170 分）：Go 导入路径即 URL，源码、go.mod 与 git 历史里的 `github.com/...` 是对第三方基础设施的永久依赖——文章主张内部包用自定义域名。评论区的反驳才是价值所在：自定义域名会过期并被抢注（相形之下"GitHub 几乎是永恒的"）、默认 Go 代理在宿主消失后仍供包、迁移要么一次 `sed` 完事、要么因每个旧版本 tag 都要单独修而变成数周苦役，还有多人指出 Go 团队若今天重新设计会自建 registry。智能体时代正在放大的同一种仓库托管集中风险（skills、MCP 配置、插件全部钉在 GitHub URL 上），在这个耦合 literally 写进源码的生态里被论证了一遍。

**Imp**（`deepfates/imp`，MIT，9 月 27 日 v0.5.0 上 hex.pm，152★）：把斯坦福 DSPy——声明式、自我改进的 LM 管线——完整移植到 Erlang 虚拟机，OTP 监督树与容错天然映射到长时间运行的 LM 管线。诚实的规模核对：hex 总下载 93 次、仅发布过一版——早期移植，不是生态。6 条评论的帖子装着真正的争论：模型不再毁于语法、领域转向工具调用之后，结构化解码的重要性下降，vs DSPy 的优化技术"仍然极有价值"。每个主要语言社区都在引入 DSPy 形态的抽象；Imp 提出的问题是 BEAM 并发模型是否真是更好的底座。

**Parley**（James Mills/prologic；`git.mills.io/prologic/parley`；HN 85 分）：线上协议就是纯 IRC 的联邦去中心化聊天——为自己的域名跑一个实例，任何人都能用 irssi 或任意 IRC 客户端以 `user@domain` 找到你；无需新客户端、无需迁移、无需桥接机器人。落地于 Armada（Nostr 系 Discord 替代品，9 月 27 日）两天后——"不用平台取代 Discord"的尝试扎堆的一周，而 Parley 的赌注与新协议相反：复用那个人人已经会说的聊天协议。联邦聊天的生死在客户端采用；把现成 IRC 舰队当客户端基本盘，是最保守——也可能是唯一可行——的上车方式。

**cs341-illinois/coursebook**（+265★/天，2.2k★）：UIUC 开源的系统编程教材（扩展 Angrave 经典 SystemProgramming wikibook；引文、脚注、术语表、CI 自动导出 PDF/EPUB/HTML/Markdown；全程 C）。无单一触发事件——九年课程材料浮上 trending——而且**无 license 文件**，对一个全部意义在于再分发的仓库是真实的复用限定。大学课程正持续成为 CS 教育的最高质量免费层——而结构化、可导出的教材恰是 agent 可以拿来授课的形状。

**byoungd/up 以 64.3k★ 重登 trending**（+310★/天）：2017 年以著名中文英语学习指南起步，如今是韩先凯（笔名离谱）的《人生进阶指南》——从英语到 AI 时代学习、真实项目、创业失败与复苏；CC BY-NC 4.0 免费 EPUB/PDF。README 陈述自己的方法论（"发现问题 → 学习 → 与 AI 协作 → 完成真实任务 → 留存证据 → 复盘迁移"），并区分研究发现、个人经验与未验证猜想。单一作者手册，商业关联是披露而非审阅；重登动力来自中文 GitHub 圈。它的弧线——英语指南 → AI 协作手册——正是当下受众迁移的形状，且由身处其中的人写出。

来源：[willfaust/Madeira](https://github.com/willfaust/Madeira) · [FEX-Emu 上游](https://github.com/FEX-Emu/FEX) · [iain.rocks](https://iain.rocks/blog/dont-couple-your-go-code-to-github) · [HN](https://news.ycombinator.com/item?id=49868404) · [hex.pm/packages/imp](https://hex.pm/packages/imp) · [deepfates/imp](https://github.com/deepfates/imp) · [git.mills.io/prologic/parley](https://git.mills.io/prologic/parley) · [HN](https://news.ycombinator.com/item?id=49875913) · [cs341-illinois/coursebook](https://github.com/cs341-illinois/coursebook) · [byoungd/up](https://github.com/byoungd/up)

## 2026-09-29 04:03 — 订阅疲劳讽刺成为第二场公投;一个 agent 全程拥有的硬件项目

- **"Windows 11½"**(definitelynotwindows.com;HN 288 分 / 77 评论):一个非官方交互式讽刺桌面,夸张化当前行业惯例——Excel 对 `SUM()` 抛出 `#SUBSCRIPTION!`、Word 在订阅期内锁定编辑、开始菜单满是购物推荐、月费 $6.99 的 "Clippy 365"、Recall 索引一切且隐私"以产品路线图为准"、蓝屏停用码 `USER_ATTEMPTED_PRODUCTIVITY`。明确与 Microsoft 无关,不索取真实凭据或付款。**限定:**是讽刺,不是产品——新闻价值在受众反应。与 900+ 分的"When did Google get so weird?"同周出现,是"对广告饱和、订阅门槛软件的敌意已成主流情绪"的第二个高速数据点——agent 时代产品决策所处文化背景。
- **PaperMono 购物清单**(Show HN,107 分 / 51 评论;仓库 9 月 27 日创建):M5Stack PaperMono 终端(ESP32-S3、e-ink 触屏)的 C++ e-paper 购物清单客户端,经 Wi-Fi 与手机 Web UI 同步,可离线,约 2,400 行——作者自述"fully vibe-coded with Claude Code,我没有手写一行",本意是看 Claude 如何应对一个新硬件设备;已进入家庭日常使用。限定:单人周末项目、无 releases、README 开头未声明许可证。对"agent 能否端到端拥有一个硬件项目?"而言,小而完整的数据点——现成终端、Python 后端、移动 Web、无应用商店、诚实的作者身份披露。

Sources: [definitelynotwindows.com](https://definitelynotwindows.com/) · [HN](https://news.ycombinator.com/item?id=49881747) · [seamusc/papermono-shopping-list](https://github.com/seamusc/papermono-shopping-list) · [Show HN thread](https://news.ycombinator.com/item?id=49875801)

## 2026-09-29 12:03 — "coding is not solved" 成为本周第三场高速公投；agent 会在规模上重新引入的时区往返

**"Coding is not solved"**（Alex Ewerlöf，HN 461+ 分）：这位 SRE 老兵论证 LLM 反转了软件的成本结构——创造变得便宜，但"维护、可靠性、安全、可扩展性等才是成本大头"——而 AI 吸收不了这一半，因为"AI 无法被问责……你不能惩罚 AI，所以它永远无法被问责"。没人读的代码被限于三类：个人软件、POC、"武器化 AI"。作者自带的限定：观点很重（"当心稻草人谬误"）、"不是反 AI"、自己就建过 LLM harness。继"When did Google get so weird?"（900+ 分）与架构意图一文之后，本周第三篇从职业内部拒绝"编码已被解决"框架的高速文章——它点名的卡点是**问责，不是能力**。

**Postgres `AT TIME ZONE 'UTC'`**（HN 162+ 分）：`AT TIME ZONE` 随输入类型翻转语义——对 `timestamp without time zone` 它*声明*该值为 UTC（产出 `timestamptz`）；对 `timestamptz` 它*剥掉*时区返回天真墙上时钟。于是看起来惯用的 `now() AT TIME ZONE 'UTC'` 并不是"转换到 UTC"——`timestamptz` 本就以 UTC 存储——它是丢弃时区，再链式调一次就把值翻回去。错误输出晚些才浮现，在比较与客户端处理里。naive/timestamptz 往返这一安静的数据损坏类别——恰恰是代码生成 agent 会在规模上重新引入的那种"显然"的 SQL，也是 code-review 技能规则的首选候选（对照论题 8 的技能评测阶段）。

Sources: [blog.alexewerlof.com](https://blog.alexewerlof.com/p/coding-is-not-solved) · [HN — 文章](https://news.ycombinator.com/item?id=49877988) · [bookofrevenue.com](https://bookofrevenue.com/blog/6ab81e9a97a13f0001f7e4e1/postgres-at-time-zone-u-does-not-do-what-you-think-it-does) · [HN — Postgres](https://news.ycombinator.com/item?id=49865312)

## 2026-09-29 20:03 — 一条服务端配置 payload 让 iOS 生态崩溃循环；Godot 的原生库墙；自托管 PaaS 继续爬栈

- **Firebase Analytics `sdk-exp` 事件**（firebase-ios-sdk #16728，500+ 评论；HN 100+ 分）：自 Sep 29 00:41 UTC 起，全球 iOS 应用在无任何新版本发布的情况下启动即崩溃循环——Google `sdk-exp` 端点下发的畸形实验 payload 击中 `-[APMEExperiment copyWithZone:]`，把 nil flag 名当作字典键传入 `GULMutableDictionary`（`NSInvalidArgumentException: key cannot be nil`）。社区复现定位触发条件（缺失/非法 UTF-8 的 flag 名——protobuf 解码成功、转换时崩溃），并显示 SDK 11.x 至 12.19.2 全部受影响，升级无法躲避。Google 摘要：Sep 28 17:41 PDT 开始，19:52 PDT 修复全部 rollout（约 2 小时），客户端缓存残留最长 4 小时，无需更新 SDK。**注意：**issue 帖摘要之外无事故报告；影响面只存在于各应用自报的崩溃数里。服务端驱动配置就是生产流量——一个没人当作崩溃风险的实验渠道击倒了 iOS 生态中未知但巨大的一块；金丝雀与回滚纪律同样适用于配置端点。
- **Conan：在 Godot 中使用任意 C++ 库**（Conan 博客，HN 69 分）：GDExtension + godot-cpp 实战指南——"写 C++ 是最简单的部分"，难在把 godot-cpp 钉到引擎版本、并为每个导出平台解析传递性原生依赖。Conan 团队所写；是演示不是基准；主机/移动平台超出范围。Godot 对 Unity/Unreal 的差距恰是薄弱的原生库故事——包管理器形状的构建会降低这堵墙。
- **t8y2/dbx 再度趋势**（今日 +460★ 至 21.6k★，v0.6.27，Sep 28）：这个约 25 MB、支持 100+ 数据库的 Rust 客户端新增 Transwarp Inceptor、选择性云同步备份、DuckDB Parquet 导入；MCP server 与 CLI 以预编译原生二进制分发——同一个工具把自己定位成 agent 而不仅是人类的数据库界面。注意：发布说明中文优先；握有全部凭据的工具却无独立安全审计。（09-11 条目的日期更新。）
- **Openship v0.8.0**（Sep 27，13.6k★，Apache-2.0，TypeScript）：自托管 PaaS 的最大版本——服务器集群跨机器扩展应用/PostgreSQL/Redis、私有网络、共享文件、Node SDK、扩展的 MCP 自动化。注意：v0.x 破坏性变更是常态；"scale" 指多机分布而非自动扩缩；MCP 自动化被提及但缺文档。Coolify 时代的浪潮爬进每个自托管者最终发现并不想自己拥有的托管平台功能。
- **Phyllotaxis LED 显示**（jagi.studio，HN 168 分）：向日葵种子螺线映射到声控 LED 矩阵——约 15 行三角函数，黄金角含在内；HN 的老教训：看起来最深奥的生成图案往往是最短的代码。个人艺术作品，不是套件。

Sources: [firebase-ios-sdk #16728](https://github.com/firebase/firebase-ios-sdk/issues/16728) · [HN — Firebase](https://news.ycombinator.com/item?id=49889934) · [Conan 博客](https://blog.conan.io/cpp/conan/gamedev/godot/cmake/2026/09/29/Using-Any-Cpp-Library-In-Godot.html) · [HN — Godot](https://news.ycombinator.com/item?id=49890051) · [t8y2/dbx](https://github.com/t8y2/dbx) · [oblien/openship](https://github.com/oblien/openship) · [jagi.studio](https://jagi.studio/posts/phyllotaxis/) · [HN — Phyllotaxis](https://news.ycombinator.com/item?id=49880411)

## 2026-10-01 04:03 + 12:03 — 最后一个闭源 C++ 前端开源；Gitea 去掉 "1."；Slug 专利进入公有领域；人生建议做成检索语料

**EDG 的 C++ 前端公开**（9 月 30 日；edgcpp.org 本次实访："2026 年 9 月 30 日，EDG C++ 前端源码公开，C++ Alliance 成为其非营利托管方"；站内有 John Spicer 的过渡说明与 FAQ）：业界最后一个闭源生产级编译器前端——三十年"唯一生产级 source-to-source 引擎"，长期内嵌于商业编译器与 IDE 工具，开源此前已见于 Herb Sutter 2025 年 11 月 Kona 行程报告。模式：三条轨道、一个代码库——社区 PR、Alliance EDG 工程师的常开维护、共同出资的特性——"没有人获得提前访问"。仓库真实且非空：`edgcpp/compiler`（9 月 22 日创建：`src/`、`lib_src/`、头文件、测试、CMake、license）。Clang 证明第二个开放前端可以存在；EDG 是最后一个闭源的——非营利托管把许可关系变成公共品，给标准符合性参考实现一条不依赖单一公司路线图的活路。

**Gitea 28.0.0**（blog.gitea.com，70 分）：废止历史性的 `1.` 前缀；审计日志、bot 账户、HTTPS deploy token、管理员模拟登录、code-owner 审批规则、diff 文件过滤、Actions 队列视图。安全一节刻意含糊："本版本包含安全修复。为给所有人升级时间，细节将在约一周后补入本帖"——"最新版本"与"完全披露"是两个状态；把 Gitea 暴露在公网的人，按发布升级，别按披露升级。破坏性变更：发行二进制去掉 32 位 x86 与 `gogit` 构建。**Slug 专利进入公有领域**（AlphaPixel，106 分）：Eric Lengyel 将其 2019 年专利——Slug，在片元着色器里直接从轮廓渲染字形，无纹理图集、无逐帧镶嵌——于 **2026 年 3 月 17 日**捐入公有领域（本次已在页面核实原文），AlphaPixel 才得以发布 Slughorn（C++20，MIT）。HN 热评的标准更正：MSDF 图集不必静态烘焙，异步上传可解 CJK。**Factorio Quality 建成线性规划**（exyr.org——Simon Sapin；240 分、91 评论）：五档 Quality/回收终局（跳档 +10%，4 槽机器封顶 24.8%）被建成 LP 并附在线计算器；HN 贡献出可运行的单装配机传奇品质构筑——"通关游戏"文体比多数运筹学教材更会教书。**〈把提交说明当作思考工具〉**（yedhu.me，81 分）：如今代理代写 commit body，被交易掉的是反思——"当 AI 不知道'为什么'的部分，它会自己编一个理由。我觉得这很危险。"给足上下文修得了编造，修不了损失：写作过程本身就是目的；commit message 加入代码评审与事后复盘的行列——那些"写"这个动作本身承重的产物。**HowToLiveBetter**（eternity4719/HowToLiveBetter，32.3k★，CC-BY-4.0，9 月 7 日创建——9 月新建仓库之星数最高）：649 条证据分级的人生建议（A 级 428 / B 级 171 / C 级 50），1,531 条来源链接只引期刊论文与官方文件，VitePress 站点 + PDF/EPUB/离线 HTML 发布——2026 年的部分：一个**面向 Claude Code 与 Codex 的代理技能**，回答"该不该给朋友贷款做共同签名"这类问题时先检索书中条目、附条目级引用；配套单页阅读器另有 5.9k★。byoungd/up 谱系被工程化成检索语料——证据分级、引用稠密、结构化到代理能逐行引用，同时写给两类读者。**56k.rip**（100 分）：1996 年拨号上网全套仪式装进一个浏览器标签——被刻意保存的"反代理互联网"。

## 2026-10-03 05:03 — Apple Pass Designer：带 iOS 级预览的第一方 GUI

**Pass Designer**（beta、需 macOS 27、免费 Apple 开发者注册，HN 106 分）：用于设计并预览 Apple Wallet 卡券——商店卡、活动票、登机牌——的 macOS 下载应用，卖点是保真：实时预览「使用与 iOS 和 watchOS 相同的渲染，你在 Pass Designer 里看到的，就是顾客在设备上看到的」。随做随验（缺失键、意外定义），支持向 Siri 建议、日历、地图供数的语义标签，并能「从你的语义数据自动生成向后兼容的卡券结构」。卡券设计曾是手写 JSON 加签名的苦役、核对循环要过一遍真机；带像素级一致预览的第一方设计器把这个循环折叠了——同一天，Apple 收紧了另一处开发者面（完全磁盘访问，→ [[platform-gatekeeping]]），却把这里磨平了。

Sources: [developer.apple.com/pass-designer](https://developer.apple.com/pass-designer) · [HN 讨论](https://news.ycombinator.com/item?id=49937276)

## 2026-10-04 04:03 — 容器成为用户态操作系统；Orion 收缩；OHTTP 有了产品；Rails 即编译器自认浏览器半场

**FTL v0.1.0**（nuta/ftl，双 MIT/Apache-2.0——Rust-OS 成名的 Seiya Nuta）：每个容器跑一个*用户态 OS*——一个以共享库实现 Linux 进程、VFS 与 TCP/IP 的小内核，内核暴露形似 hypervisor 的系统调用，Linux 兼容性以 WSL1/Linuxulator 传统做成用户态库。令人意外的设计注记：**「FTL 用用户态捕获异常（非硬件加速虚拟化）」**——发布演示在 `-m 32`（32 MB）下启动 QEMU 实例，项目自己的网站就由跑在 FTL 上的 Rust HTTP 服务器服务。路线图对年轻程度很诚实：文件系统 2026 年 11 月、Node.js/Go 支持 2026 年 12 月、SMP 与容器镜像 2027 年 1 月。容器隔离设计空间的第三个点——不是 namespaces+cgroups，不是硬件 VM，而是用户态陷入。若密度主张成立，按请求容器的冷启动经济学将再度改写。

**Kagi 停止开发 Orion Linux/Windows 版，两者开源。** 基于 WebKit 的浏览器收缩回 macOS/iOS；Linux Beta 自 10 月 2 日公告起停止更新（「我们不建议把它当主浏览器」）；原定 2026 年底的 Windows 发布从 Kagi 侧取消；源码发布细节承诺 30 天内给出。叙事是刻意的非 Chromium 独立（「用不分叉 Chromium 的难路来造它」），理由是用户资助的「非常小的团队，只有一把手数得过来的开发者」。**限定语是 Kagi 自己的：**「Kagi 不会是核心维护者」、尚未找到基金会或接管者、开源的许可证条款未定。第二个可用的非 Chromium 引擎的多平台未来，现在押在是否有人在约 30 天窗口内接手。

**Cloudflare OHTTP Gateway**（封闭 beta，付费 zone 附加组件，未公布定价）：客户端把 HPKE 加密请求（RFC 9180）POST 到自己 zone 的 `/.well-known/ohttp-gateway` 端点；边缘按 RFC 9458（外加 chunked-OHTTP 草案）解封装，应用服务器「把 OHTTP 请求当普通 HTTP 处理」——同时第三方中继仍只携带密文，没有任何一方同时看到客户端身份与内容。有趣的是那条护栏：网关**「将拒绝解密来自 Cloudflare Workers 或 Cloudflare 代理主机的请求」**——单厂商信任坍缩被写进代码而非政策；厂商硬编码反对自家纵向整合的罕见案例。Privacy Gateway 更名「Cloudflare OHTTP Relay」。声明限制：自带中继；OHTTP「在网络层提供隐私，不触碰内部请求体」。OHTTP 当了两年的「有协议无产品」；这是应用团队真正能采用 managed 版本。

**Roundhouse——「The Browser Half」**（rubys/roundhouse，Apache-2.0，抓取前几分钟有推送）：Sam Ruby 的 Rails 到九语言编译器（Rust、Go、TypeScript、Crystal、Elixir、Kotlin、Swift、C#/.NET、Python——「部署目标……从运行时选择变成编译器开关」）；类型来自无注解的全程序推断（「`has_many :comments` 就是一个类型声明」）；对 **Mastodon（1,173 个文件、全部 337 个 controller、含 HAML）** 的一遍约 1.5 秒；正确性由一致性 oracle 钉住——从 Rails 与各目标拉同一 URL 再 diff。Ruby 自 9 月 18 日首版以来几乎每日发文（Campfire 通过 299/300 测试），而这篇是诚实的那篇：编译出的 Campfire 移植**原样留下「3,749 行 JavaScript」**。Rails 即规格是自转译器浪潮席卷 Python 以来最激进的「你的框架是一层兼容层」押注，作者正在公开做验证工作——包括还不奏效的部分。浏览器半场是这类项目通常死掉的地方；它现在是被点名的开放问题。

Sources: [ftl-os.org](https://ftl-os.org/) · [nuta/ftl](https://github.com/nuta/ftl) · [HN — FTL](https://news.ycombinator.com/item?id=49944912) · [Kagi 博客](https://blog.kagi.com/update-orion-linux-windows) · [HN — Orion](https://news.ycombinator.com/item?id=49941447) · [Cloudflare 博客](https://blog.cloudflare.com/announcing-cloudflare-ohttp-gateway/) · [HN — OHTTP](https://news.ycombinator.com/item?id=49941091) · [rubys/roundhouse](https://github.com/rubys/roundhouse) · [intertwingly.net](http://intertwingly.net/blog/)

## 2026-10-06 20:45 —— cargo 调度（headstart）、内存驻留类型系统（Vx）、PS5 二进制翻译、Gleam 改打 IR

**headstart（PowderworksCode/headstart，HN 105）：**一个双补丁实验（rustc 6 个、cargo 3 个，「目标是成为上游 PR」），利用的是一个调度缺口：一个 crate 只需要依赖的*接口*元数据即可开始编译，但今天「每个 crate 都要等它依赖的 crate 被完整检查完——函数体也包括在内」。`-Zearly-metadata` 让 rustc 在接口检查完的瞬间发出 `.early-rmeta`；`-Zheadstart` 让 cargo 据此启动依赖方、在 codegen 前换入完整元数据。13 个真实项目（rust-analyzer、zed、bevy、polars…）16 核净构建的结果：**`cargo check` 最快提速 54%、`cargo build` 最快 42%**、codex-rs 快 37%，53 项基准中「无一变慢」。注意 README 里同样写着的注意事项：收益来自闲置核心（4 核时 24%/13–15%）、并行前端覆盖了部分同一收益（headstart 在其上最多再加 25%）、代价是浪费的下游工作、更晚的错误、更高的峰值内存。Rust 编译时之痛等来一个**纯调度**的修复——可并行化的元数据本来就在——而一个 32-commit 原型来问「要不要上游」正是 cargo 真实的演进方式。

**Vx（vx-lang/Vx，Apache-2.0 WITH LLVM Exceptions，v0.0.2，9 月 9 日以来 2,013 commits，161★，HN 75）：**面向异构计算的系统语言，组织原则只有一条——**内存驻留是类型系统的一部分**。NPU 内存里的张量与主机 DRAM 里的张量是不同类型；二者之间移动必须显式 `transfer()`；「主机线程解引用设备指针是编译错误，不是凌晨三点的段错误」。编译器（Rust，基于 LLVM/MLIR 22 + Z3）检查地址空间类型、容量准入、SMT 验证的接缝契约、线性类型与拓扑可达性，并读取声明式「机器文件」（「机器是被声明的，不是被假设的」），覆盖 H100 到 Apple M4 共 12 个 SKU。v0.0.2 阶段的坦率值得注意：还没有 `while` 循环、`spawn on` 只支持顺序、没有包管理器、没有 RAII——但同时有 530 个单元测试、40 套集成测试、以及在 A100 上对 CUDA 的差分测试 harness。Triton/Mojo/MLIR 在争「一次编写内核」层；Vx 押的是制胜的一手在*类型系统*——把放置、容量与拓扑变成编译期事实。

**AnyPS5（boykopovar/AnyPS5，+943★/天，5,351★，Tom's Hardware 报道）：**把 PS5 可执行文件转成原生 Linux/Windows 二进制——relinker 发出目标系统的原生格式、重实现的系统 PRX 库处理动态链接：「无模拟、无独立运行时进程」。可行是因为 PS5 的 CPU 就是 AMD Zen 2 x86-64——Tom's Hardware 把它框成 Proton 式二进制翻译。首个兼容声明：2D 平台游戏 *Dreaming Sarah* 在 GTX 1050 Ti / i5-7500 上稳定 60 fps；着色器重编译器发出 SPIR-V（开启时经 Spirv-Tools 校验）；不支持的状态抛 `std::runtime_error` 而不硬混；仓库内带技术债文档与兼容列表；README 强调互操作/保存且不含 key、固件或受版权保护代码。PS5 是现成 x86-64 + AMD GPU 这一点把经典主机模拟曲线压塌了——RPCS3 花十年跟 CELL 缠斗；这个项目第一天就在二进制翻译上。尚早：一个已验证游戏、系统库覆盖未知（进度徽章对此诚实）。

**Gleam v1.19.0（10 月 5 日，HN 56）：**完成 v1.18 开始的 codegen 重写——Gleam 不再生成 Erlang 源码，而是生成 **Erlang abstract forms**（Erlang 编译器自己的解析器通常产出的带元数据 IR），可直接加载：「跳过 Erlang 编译器的前半段」。收益：更快构建（对 v1.17.0 基准；100 个模块的 hello-world 基准自认牵强）、栈回溯与 BEAM 崩溃报告指向真实 Gleam 行。直接编译到 BEAM 字节码曾被考虑并**否决**——字节码格式「并非固定不变」，瞄准它意味着与 VM 维护者永久协调；abstract forms 正是 Elixir 走的路。每种 BEAM 语言最终都会学到同一课——瞄准编译器的 IR，而不是它的源码或它的不稳定字节码；调试器支持（如 WhatsApp 的 edb）从不可能变成「只是还没人写」。

Sources: [PowderworksCode/headstart](https://github.com/PowderworksCode/headstart) · [HN——headstart](https://news.ycombinator.com/item?id=49951218) · [vxlang.org](https://vxlang.org/) · [vx-lang/Vx](https://github.com/vx-lang/Vx) · [boykopovar/AnyPS5](https://github.com/boykopovar/AnyPS5) · [Tom's Hardware](https://www.tomshardware.com/video-games/playstation/open-source-anyps5-dumps-emulation-to-run-playstation-5-console-games-natively-on-pc-amd-zen-2-architecture-enables-proton-like-binary-translation-for-windows-and-linux) · [gleam.run](https://gleam.run/news/gleam-doesnt-compile-to-erlang-source-anymore/) · [HN——Gleam](https://news.ycombinator.com/item?id=49975619)


**Polars 2.0——流式 + 源外计算默认开启，行序不再保证（10-07，HN 360）：** `collect()` 默认走流式引擎；**落盘溢写默认开启**（从内存约 80% 起溢，64 GB 磁盘预算）；SQL 一等公民，带 join 重排、动态谓词与布隆过滤器。迫使大版本号的破坏性变更：`join`/`group_by`/`unpivot` 的**行序默认不再保证**——`maintain_order=True` 可选回来。基准（衍生版、非 TPC 合规；方法与复现仓库已公布）：默认 Polars 在除一道题外的全部 TPC-H/DS 查询上快过 DuckDB 1.5.6、DuckDB 2.0-alpha 与 DataFusion 54（DataFusion 三题超时或 OOM），16→192 vCPU 扩展 3.8× 对 3.2×/1.7×——而帖子对毛边很诚实：SF10 下多核毫无收益，「192 线程时的恒定开销」伤害小查询（32 线程上限目前处处最具竞争力）。重心从「快的单机 dataframe」移向「需要时就溢写的湖仓引擎」——而静默的行序翻转恰是那种会在下游以「错得貌似合理」而非报错的形式浮出的变更。升级前先读迁移指南。

**Deno → Node，倒转帖（10-07，HN 294）：** David Bushell 把项目迁回。推力与其说是技术不如说是运维：zsh 集成坏了数周、JSR 激进 429、并发 HTTP 噎住，以及被他讥为「AI 幻想与 vibe-coding Temu Cloudflare」的公司方向。Node 现在经 type-stripping 直接跑 TypeScript、支持现役 ECMAScript——「永远不必再见 `require()`」；移植（Deno.serve → Hono 的 node adapter、@std/path → node:path）后**快了 15%**。结论：「今天没有理由使用 Deno 运行时」——同时仍用 pnpm 加 `minimumReleaseAge`（「NPM 的 M 代表 malware」），也撞上 Node 拒绝在 node_modules 内 type-strip。2023 年的共识倒转，不是 Deno 退步了，而是 Node 吸收了赢面（ESM、TS、fetch、watch），而挑战者的公司转向了别处；成熟运行时里，迁移的驱动因素是哪个平台对自己的维护者失去了吸引力。

**Parseable 重发布——三种信号、一个 Rust 二进制（Show HN 59）：** 日志、指标与追踪在单个 Rust 二进制里，落在对象存储数据湖上，一切都成为开放 Parquet——OpenTelemetry 原生摄入、PromQL + SQL、告警与看板内置（AGPL-3.0，2.5k★）。Show HN 标题的「每分钟 1 亿时间序列」**在 Parseable 自己网站上无法证实**（我们抓取时统计区未渲染）——在厂商公布基准前按提交者主张对待。「一切成为对象存储上的开放 Parquet、计算层叠加」正在固化为对厂商锁定型可观测后端的标准挑战者架构。

**tapo v0.11.1——TP-Link 未公开的 TPAP 拿到宽松许可的开源客户端（HN 108）：** TPAP 随 1.4.0 固件（2025 年 10 月）到达，是 KLAP 的继任者；以 **SPAKE2+（RFC 9383）**认证——抓取的登录无法离线对照密码猜测、会话密钥源自双方都不传输的每次登录秘密——比它取代的协议更安全，这很罕见。Tapo 应用的「第三方兼容性」开关决定设备说哪种协议；设备兼容矩阵记录得很诚实（H200 摄像头 hub 和一台 C210 在开关关闭时行为异常），v0.11.0 整体移除了旧 AES 协议。Rust crate + 薄 Python 包装 + MCP 服务器，840★。

Sources: [Polars 2.0 发布文](https://pola.rs/posts/release-polars-2/) · [HN — Polars](https://news.ycombinator.com/item?id=49977177) · [pola-rs/polars-2.0-benchmark](https://github.com/pola-rs/polars-2.0-benchmark) · [dbushell.com](https://dbushell.com/2026/10/03/deno-to-node/) · [HN — Deno→Node](https://news.ycombinator.com/item?id=49971719) · [parseable.com](https://www.parseable.com) · [parseablehq/parseable](https://github.com/parseablehq/parseable) · [mihai.dinculescu.dev](https://mihai.dinculescu.dev/posts/tapo-speaks-tpap/) · [mihai-dinculescu/tapo](https://github.com/mihai-dinculescu/tapo)

## 2026-10-07 晚间 → 10-08 20:35 —— Chromium 删掉的格式以 Rust 回归；重编译持续获胜；诚实基准体裁过了好一周

**JPEG XL 随 Chrome 155 出货（HN 509 分）：** `.jxl` 解码回归、撤销 2023 年的移除——Chromium 首个被「撤销移除」的格式。促成的变化是解码器本身：`jxl-rs`、替代 C++ `libjxl` 参考实现的纯 Rust 重写，靠 Rust 稳定的 `target_feature_11`（无需 unsafe 的 SIMD）与受 Highway 启发的 `jxl_simd` 抽象层变得可行。Chrome 报告**整个实现历史零内存安全漏洞**（模糊测试 + AI 辅助评审）；跨浏览器覆盖走 Interop 2026 的调查。目前仅解码、编码器仍是第三方、「AVIF 也值得一试」——以及一个模板：被拒绝的 web 格式这样回来——通过内存安全的重实现。

**静态重编译持续获胜（一周两例）：** snuri00/psp-web-recomp（10 月 7 日创建，MIT，成文时 116★——演示而非工具）把 PSP《战神》静态重编译为 WebAssembly 在浏览器标签页里跑——与本周把 PS5 可执行文件搬上原生 Linux 的是同一条路线（AnyPS5，10-05）；用构建步骤换运行时翻译持续在任何地方击败模拟，浏览器正成为该技术的标准演示靶。**RAD Debugger v0.9.29-alpha**（EpicGames，MIT）交付首个初步的原生 Linux x64 调试——暂无二进制（需自行构建）、已知问题清单写得很坦白（「仍然*非常早期*……预期不如 Windows 稳定」）、明确求实战测试、多 GB 调试信息下链接提速 50%。Linux 在 GDB/LLDB 前端之外的原生图形化调试器缺口是工具链最后的大空白之一；Windows 优先的「早发布-公开已知问题」模式是模板。

**诚实基准体裁过了好一周：** **zerobrew**（Rust 版 Homebrew 替代、从内容寻址存储进程内重定位 bottle，7.8k★、迁入 zerobrewhq）贴出冷装 6.6×/热装 68×，并**两次在自己的 README 里拆自己标语的台**——「100x*」只覆盖 100 个包中 24 个的热装、冷装受链接步骤约束（测试连接上 3.3×）、「没有 Homebrew 的 bottle 构建农场这些数字一个都不存在」（这还是一次再发布：1 月的病毒式传播有过 2 月的复盘帖）。**matklad：Benchmark In Milliseconds**——把输入规模定到单次约 300ms（热缓存噪声约 2% 使约 5ms 误差条可容忍；低于 30ms 淹没在计时器分辨率、低于 5ms 撞上 OS 抖动），阈值自我限定于「一台特定的 Zen 2 笔记本」。**sheets.works 的维护者计数**（HN 136 分）：23 个基础项目（SQLite、zlib、curl、bash、xz、tzdata）中 11 个只有 1–2 名常规贡献者（10+ 次提交，2025 年 10 月–2026 年 10 月）；时区数据库靠一位维护者的业余时间送达约 40 亿台设备。带着方法论的 xkcd 笑话——代理指标低估评审与 triage、文中自己声明；后 xz 时代，单维护者基础设施是供应链风险类别，而按提交计数便宜到可以在你自己的依赖树上跑一遍。

**另有：** **Python 3.15**——实验性 JIT 以 **1.20–1.28×** 胜过标准解释器（Grinberg 的 rc3 实测；首个专用构建稳定获胜的版本；free-threading 多线程守住约 4.5×）——Python 从此有一个快构建和一个兼容构建，「哪个成为默认」是真正的岔路口。**artcraft**（storytold，Rust「艺术家 IDE」，2022 年起、10 月 4 日 HN 帖后 +1,465★/天）——创始人在帖内：「还远没准备好……超级早期 alpha」；关注度跑在项目自己的准备度前面、自定义许可证（GitHub 列「Other」）、Linux 仅可自行构建。**pingdotgg/ts-rust**（HN 74 分，MIT）——TS 编译器/检查器/LSP **由 LLM** 移植到 Rust：约 42 万美元的 OpenAI token（GPT-5.6 Sol → GPT 6 Astra）停滞在约 84% 兼容度；换 Opus 5.5 从零重启，10 小时出可用 v0、总计约 $24,047——「这代码我一行都没读过」、兼容度自报、「The Slop Line」以下全部由模型撰写。移植真实编译器的一份公开、明码标价的数据点——成本曲线才是头条，而「换模型重启」跑赢了几个月的增量修复。**小网络两天投出三票：** bigwords.page（URL fragment 即整个应用——标语/倒计时/二维码、零服务器、405 分）、ascii.rest（191 件动画 ASCII 作品、单脚本零依赖自定义元素、服务端渲染首帧、尊重 reduced-motion）、上面的《战神》——自定义元素 + fragment 即状态持续演示着 agent 搞不坏的部署故事。**Margaret Hamilton（1935–2026）**——Apollo 飞行软件负责人；1202 警报时刻以优先级调度甩掉负载；「软件工程」一词的创造者（HN 996 分，全行业的纪念帖）。

Sources: [Chrome 中的 JPEG XL](https://developer.chrome.com/blog/jpeg-xl-in-chrome) · [snuri00/psp-web-recomp](https://github.com/snuri00/psp-web-recomp) · [raddebugger v0.9.29-alpha](https://github.com/EpicGames/raddebugger/releases/tag/v0.9.29-alpha) · [zerobrewhq/zerobrew](https://github.com/zerobrewhq/zerobrew) · [matklad](https://matklad.github.io/2026/10/05/benchmark-milliseconds.html) · [sheets.works](https://sheets.works/data-viz/holding-up-the-internet) · [Python 3.15 有多快？](https://blog.miguelgrinberg.com/post/how-fast-is-python-3-15) · [storytold/artcraft](https://github.com/storytold/artcraft) · [pingdotgg/ts-rust](https://github.com/pingdotgg/ts-rust) · [bigwords.page](https://bigwords.page/) · [ascii.rest](https://ascii.rest/) · [MIT News——Hamilton](https://news.mit.edu/2026/margaret-hamilton-computing-pioneer-dies-1007)

## 2026-10-09 —— 带事件级证明的重编译；民间智慧获得代数；鼠标优先的 k8s TUI

**demoscene-recomp（HN 146）：**四个经典 PC demo——Future Crew 的 *Unreal*（1992）与 *Second Reality*（1993）、Triton 的 *Crystal Dream II*、NoooN 的 *Stars: Wonders of the World*——在浏览器中原生运行。方法即故事：x86 模拟器记录 CPU 执行的每个代码块，逐条指令翻译成 C 并保留精确周期时序，与硬件模型（VGA、定时器、Sound Blaster）一起编译为 WASM，然后**对模拟器做事件级校验**——「每个中断、每次端口访问、每一帧都在模拟时间的同一时刻」。原版发布文件未经修改直接伺服；在 70 Hz 显示器上最流畅，因为那是它们假设的 VGA 刷新率。两天内第二个浏览器重编译项目（继 God of War PSP 移植之后）但校验环比多数更严——周期精确的 C 翻译加事件级检查，是从游戏到工业控制任何时序敏感代码移植的模板。四个 demo，仓库 16 颗星：技术跑赢了项目。

**《Push ifs up and fors down》（Debasish Ghosh，HN 176）：**matklad/TigerBeetle Tiger Style 启发式获得了它的代数。把 `if` 上推是到子对象的限制——类型记录了谓词；接受 `Option<Walrus>` 的函数是从余积 `1 + Walrus` 出发的一对函数，提升分支即把这一对因子分解开。`filter p . map f == map f . filter (p . f)` 从 `catMaybes` 的自然性推出，同一形状再现于数据库查询计划中把选择提前与向量化批执行。限定条件同样精确：仅限循环不变条件；仅当 `p . f` 归约为廉价的输入侧谓词时 filter-before-map 才划算。agent 时代为何关心：对 agent 写出的代码库，风格一致性是最稀缺的资源，带明确前置条件的习语可以教给模型，而氛围规则永远不能——与 matklad 的 ~300 ms 基准规则（10-07 晚）同一课：民间启发式正在变成可教给模型的规范。

**k10s（p10node，Show HN 43；Go/Bubble Tea，Apache-2.0，181★，三个月历史）：**一个异端构建的 Kubernetes TUI——鼠标是好用的。作用于当前选中的每个动作都列在独立面板里（点击它，或按旁边的字母）；`ctrl+p` 在一个框里同时搜索资源种类与具体对象；macOS/Linux/Windows 单一静态自更新二进制；无集群的离线演示模式；以及 2026 年的部分——内置 AI「已知道你的集群、命名空间和选中对象」。k9s 靠键盘密度赢得了 k8s-TUI 之战；k10s 赌下一代人群要的是可发现性（可见动作、统一搜索、鼠标）外加一个以选中对象为上下文的 agent。「每天开二十次、通常在着火时打开的集群仪表盘」是正确的问题陈述；点击优先能否战胜肌肉记忆才是真正的实验。

Sources: [demoscene-recomp 网页](https://treylorswift.github.io/demoscene-recomp/web/) · [HN——demoscene-recomp](https://news.ycombinator.com/item?id=50002426) · [Push ifs up and fors down](https://debasishg.github.io/blog/push-ifs-up-fors-down/) · [HN——Ghosh](https://news.ycombinator.com/item?id=49997073) · [p10node/k10s](https://github.com/p10node/k10s) · [HN——k10s](https://news.ycombinator.com/item?id=50009904)

## 2026-10-09 12:03 — 开放 GPU 栈数日内完成重定目标；三个 clean-room 赌注；开放硬件测量

**nullmoth/nvidia-macos-driver（约 44 小时 1,266★，10 月 7 日创建）：**一个 Metal 驱动，让 NVIDIA Turing 及之后的显卡（GTX 16 到 RTX 50、TITAN RTX、工作站 Quadro/RTX）在运行 macOS 15 Sequoia 的 Intel Mac 与 OpenCore 系统上驱动显示与 Metal 3——2018 年 High Sierra 以来首个 NVIDIA Mac 驱动支持。架构是优雅的部分：一个 Metal 驱动插件把 Apple 的 AIR 着色翻译为 SPIR-V，喂给 Mesa 的 **NVK** Vulkan 驱动，底座是 NVIDIA 自家开放的 GSP 内核模块（r610，未修改的 610.57.04 固件）。宣称的 Metal 3 覆盖：argument buffers tier 2、光追、mesh shaders、MPS、MetalFX——外加经 Apple GL-on-Metal 的 OpenGL、OpenCL、Core Image、Core ML。README 对范围很坦白：仅在一张卡上物理验证（RTX 5060，macOS 15.7.x/15.8.1）；「设备表覆盖不等于运行时认证」；macOS 26 Tahoe 支持未认证；「新驱动，可能不是每台 PC 都能跑」。最后一座封闭 GPU 孤岛的 Mesa 化——也是开放 GPU 栈（NVK + GSP）已可移植到完全不同 OS 的证明，以天为单位。

**LoreanXavier/pt-pc 1.0.1——本周第三个 recomp，带着真正的保存 stakes：**小岛秀夫 2014 年的 *P.T.*（2015 年从 PlayStation Store 下架，法律上不可游玩已十年）原生重建——游戏逻辑用 C++，自定义 Vulkan 渲染器，所有关卡/模型/贴图/音效/过场都在运行时从你自己的 PS4 dump 读取（仓库里没有 Konami 数据；商店 PKG 无法使用）。v1.0 加入 DLSS 4.5 帧生成、FSR 3.1/4.1、XeSS、可选光追阴影/AO/反射、Photo Mode、mod 支持与实验性 OpenXR VR；Wccftech 实测 RTX 4060 笔记本 1080p Ultra 下 100+ FPS，开帧生成 200+。README 带 AI 披露（「我用业余时间做这个，用了 AI 工具」），IGN 报道小岛秀夫本人认可了该移植。从 dump 重建、零资产是最强的保存形式；粉丝善意加上原作者本人祝福，在这个类型里是稀缺组合。

**Bevy 0.20（10 月 8 日；817 个 PR、227 位贡献者）：**一个整合型版本。**WESL**——标准化的 WGSL 扩展，带模块、导入与条件编译——取代引擎自带的 WGSL 方言（标准优于方言的一步）；实时路径追踪器 **Solari** 经 Metal 跑上 macOS，并通过 `dlss_wgpu` 获得 DLSS-RR 4.5 降噪（ReSTIR 变为可选、默认关闭）；按列变更Tick给 GPU 网格提取带来宣称的 **132 倍提速**；system 中的 panic 被捕获并路由到错误处理器；调度随机化让你可以对含糊的 system 顺序做属性测试。Bevy 是「Rust 生态靠社区就能撑起准 AAA 引擎开发」的最大赌注，而 0.20 的主题是整合：标准、厂商特性、正确性工具——不是新奇。

**storytold/wordcraft（894★）+ storytold/cadcraft（845★）——一个项目变成一个战略：**artcraft（「离能用还差得远」）两天后，同一团队再发两个 clean-room 重实现：**WordCraft**，纯 Rust 的 Microsoft Word 重建，可读写 .docx（功能区、样式、表格、修订、参考文献、邮件合并）；**CADCraft**，AutoCAD 工作流重建（命令行、对象捕捉、图层、标注、填充、块、DXF），自带徽章写着「状态：早期开发」。二者均为 MIT/Apache-2.0，原生跑 macOS/Windows/Linux/BSD，浏览器里跑 WebAssembly，都带「agent-drivable over MCP · CLI」徽章。一个受喜爱的 Rust 重实现是项目；一周三个、外加成套品牌与共享组件库，是战略——对最后一批专有堡垒的 clean-room 克隆，从第一天起就是 agent 优先，诚实旗帜完好。

**naturalsystems eth68（HN 109）：**一台 1U 机架音频接口，经标准 100M 以太网串流六路平衡输入与八路输出，用裸机 STM32H7 固件模拟 netJACK1 主端点——直插 JACK（`jackd -d netone`）或 PipeWire（`pw-eth68`），甚至在 macOS 与 Windows 上也能被 JACK 识别。实测往返延迟在 48 kHz/64 samples 下 **3.620 ms**——与 RME 的 HDSPe PCIe 卡在 48 kHz 持平，96 kHz 下快 0.33 ms——菊花链单元间经 BNC 字时钟 + UDP 广播同步实现 ±1 样本对齐。实测数字穷尽（THD+N −94.8 dBFS，LATMON 处理约 625 µs，对 1333 µs 死线），告警同样穷尽：只焊了两块 PCB，无价格无上市，台架项目。专业音频的肮脏秘密是网络音频通常意味着厂商锁定（Dante、AVB）或可感知延迟；一位爱好者在民用以太网硬件上追平 PCIe 级往返、并公开测量方法，是开放硬件测量应有的模板。

Sources: [nullmoth/nvidia-macos-driver](https://github.com/nullmoth/nvidia-macos-driver) · [HN——nvidia-macos-driver](https://news.ycombinator.com/item?id=49995032) · [LoreanXavier/pt-pc](https://github.com/LoreanXavier/pt-pc) · [Wccftech——P.T. 1.0](https://wccftech.com/p-t-native-pc-port-1-0-is-out-now-with-dlss-4-5-frame-generation-ray-tracing-mods-and-more/) · [Bevy 0.20 发布](https://bevy.org/news/bevy-0-20/) · [HN——Bevy](https://news.ycombinator.com/item?id=50013610) · [storytold/wordcraft](https://github.com/storytold/wordcraft) · [storytold/cadcraft](https://github.com/storytold/cadcraft) · [naturalsystems.io/eth68](https://naturalsystems.io/eth68) · [HN——eth68](https://news.ycombinator.com/item?id=49992994)

## 2026-10-09晚间 → 10-10 04:03 —— JS 运行时成为平台特性；Python 3.15 正式版；C 删除恶魔；教育论 trifecta

**Cloudflare 收购 Deno（Ryan Dahl 公告 + Dahl/Varda 联合文章；HN 857 分——当日头条）：** 整个 Deno 团队加入 Cloudflare，各部分命运截然不同：Deno 运行时保持开源、还有**一年**的月度 bug/安全发布；**Deno Deploy 六个月后关停**（付费客户获迁移到 Workers 的支持）；JSR 继续、基础设施迁至 Cloudflare；rusty_v8 继续开发、朝与 workerd 集成方向。真正的产品是合并 **workerd 与 celld**——Deno 八月发布的可自托管 Workers/Durable Objects 实现——让 workerd 自托管成为「受一等公民支持的应用构建与运行方式」。Dahl：Durable Objects 是「一个小型的、可独立寻址的服务器，自带关系型数据库」，「对更好的抽象的需求在 AI 时代尤其迫切」。Varda 回应锁定批评：「开源并给人留一条逃生通道是*好生意*。」第二大 JS 运行时就此成为 Cloudflare 的一个特性——服务端 JavaScript 向 Workers 编程模型整合，而领队正是 Node 之父。盯着「逃生通道是好生意」与六个月 Deploy 日落之间的落差：迁移才是近期现实。

**Python 3.15.0 正式版（10 月 9 日；5,643 次提交、1,012 位贡献者；HN 260 分）：** JIT 版本转正——基线也比我们 10-07 的记录更精确：实验性 JIT 相对尾调用解释器在 x86-64 Linux 上几何均值提速 **7–8%**、AArch64 macOS 上 **11–12%**（此前引用的 1.20–1.28× 是相对标准解释器）。速度之外：惰性导入（PEP 810）、UTF-8 默认编码（PEP 686）、新增 `sentinel`（PEP 661）与 `frozendict`（PEP 814）内建、推导式解包（PEP 798）、带「Tachyon」采样分析器的专用 profiling 包（PEP 799）、typing 侧的 TypedDict extra items / TypeForm / disjoint bases、帧指针默认开启（PEP 831）。Windows 64 位构建切换到尾调用解释器；macOS 安装包默认带自由线程支持。已知问题：IDLE/tkinter 应用可能在 macOS 27.0 上挂起。「慢语言」的道歉不再顺理成章——而 PEP 810 惰性导入语义将是未来一年生态的兼容性战火。

**C2y 已删除约 100 条 UB 中的 45 条（LWN 报道 Martin Uecker 的 Kernel Recipes 2026 演讲；HN 122 分）：** C 标准委员会对未定义行为的清剿。C23 打好地基——「不时光倒流」规则禁止编译器把操作提升跨过可观察事件、废除 K&R 函数定义、符号幅值/反码整数与三字符组；C2y 增加 case 范围、命名 for 循环、`_Countof()`，以及 Uecker 所说的「恶魔清除」。演讲对前沿很坦率：编译器作者与开发者对 UB 允许什么仍有分歧（2015 年填充字节调查无共识；除零附近的存储消除结果是个编译器 bug——因为被调方可能调用 `exit()`），甚至*已定义*行为——读未初始化变量、指针相等——今天也会被 Clang 和 GCC 误编译。时间安全仍是最难的部分；CHERI 与 Fil-C 是当前答案。C2y 不会交付内存安全，它只是缩小编译器恶魔的栖息地——对那几十亿行不会被重写的代码而言，这是务实路线。

**Hetzner 的网络栈（工程史长文；HN 96 分）：** 从 2011 年 Linux bridge vServer（约 25,000 实例）经 Ceph/BGP 时代（2015）到今天服务**超一百万台云服务器**的 Open vSwitch 数据面。有趣的决策是那些被拒绝的：不用 OVN，自建 **Flusskrebs**（「流量螃蟹」）——一个对 OVS flow 做编排的小型 Python/REST 服务，兼任私网的 DHCP 服务器。设计原则：聪明的主机、简单的网络（防火墙、私网、元数据都在每台 VM 宿主机上——爆炸半径一台机器）；基于 conntrack 的有状态防火墙，`ctcount` 把每台服务器上限卡在 **80,000 并发连接**以保护共享 conntrack 表；每私网一个 VXLAN VNI；两条 10 Gb/s LACP 上联迁移到双路由 BGP。云控制平面的 build-vs-buy 之争由运营者而非营销PPT裁决；那个 80k 上限是众人只能在事故中发现、而他们公开发表的 conntrack 数字。

**教育论三重奏——同一论点一周内从三个方向抵达：** Carson Gross 的「Yes, and」（2 月旧文登顶 HN 500 分）——AI 对新手真正危险，因为它能生成代码、代价却是读代码所需的上手理解，所以他对学生的忠告是「AI 能替你写这份作业。别让它写。」；他拒绝汇编到高级语言的类比（编译器是确定性的，LLM 不是，且其输出夹带意外复杂度），认可 agent 作为理解概念的「极其有效的助教」（他自己的 AGENTS.md 正是如此配置）；就业市场是周期性的、招聘网站是彩票、人脉才是通道（HN 的反驳：「靠人脉」是老一套忠告、且分配不均）。Glyph Lefkowitz 的「Programming Isn't Special」（HN 133 分）——为什么作家与视觉艺术家组织起来反对生成式 AI、程序员却认命接受：程序员说服了自己「代码是功能性的、非表达性的」——他把这种区分称为 mystification（借自 Berger 的 *Ways of Seeing*）；平庸的创造性劳动正是让稀有伟大作品得以可能的*练习*（每个项目约 0.1% 的超凡概率——把所有项目都委托出去，集体概率从「肯定偶尔有」变成「永不」）；他自己的 Deferred 是「一首关于异步任务执行的有意为之的诗」；「slop is slop, no matter the medium」。数学版——Lozano-Robledo 的「我们该告诉学生什么」——在本批次的 [[frontier-models]] 条目里。连同 openGym 的披露（→ [[no-ai-default]]）：这是文化决定如何谈论 AI 与手艺的一周。

**quake-srp（Show HN 183 分；terrapapagalli1516/quake-srp，仓龄一天、38★）：** id Software 的 *Quake*（1996）从 WinQuake C 源码重建为 Rust——仅标准库、零依赖、无 `unsafe`——通过 WASM 在浏览器里跑共享软件版，另有原生 `quaketool`。方法才是故事：README 写明 Claude（在 Claude Code 中）写代码与文档，人负责定规则、试玩、提 bug——**agent 舰队按书面简报在独立 git 分支上工作**，由一个「chair agent」在完整检查套件通过后才合并分支。正确性对着 oracle 强制：id 自己的 C 无头编译，移植版在数千个视角上逐像素比对 3-D 视图（含已唤醒的怪物）、混音器逐采样、demo 回放逐帧；仍有差异之处逐条列在 AUDIT.md，一条命令即可重跑证明。差分 oracle 验证抵达整游戏移植（→ 论题 10）：把 WinQuake 换成任何有已知良好二进制的遗留系统，这就是正确性可查而非 vibes 评审的 agent 重写配方。

**小条目各一句：** **Fleeting**（HN 607 分）——合成会议音频作为职场自卫（「抱歉，我在开会」）：约 12 分钟录音从随机点开始以防循环检测、AI 语音/人脸、假日历邀请完全在浏览器内生成、台词化的退出语、还接进能在你的假会议里出现的商品广告——影响力行动条目的礼貌镜像：同一条合成媒体管线，指向保护注意力而非窃取它。**Triple-A Minesweeper**（HN 234 分）——1989 年的网格装上全部 3A 套路；53 条「求功能」评论的讽刺作品就是产品调研。**Carrier-Explode**（Show HN 82 分）——解码 iPhone/Pixel/Galaxy 固件中的运营商设置 blob，成为可 diff、CC0、每日更新的数据集并配 JSON API——「开箱即用」最后一块不透明之地变成数据；数据集是产品、代码不是（仓库数天大、8★）。**once**（HN 78 分）——给任意 CLI 命令的 stdout 加 TTL 缓存（Go、纯标准库；HMAC-SHA256 缓存键、条目只存守护进程内存、禁用 core dump、失败的命令绝不缓存），为了 1Password 的 Touch ID 批准跑步机；威胁模型是声明出来的而非暗示的——「一个命名空间，不是安全边界」。**LingBot-Map**（Robbyant，17.5k★）——前馈流式 3D 重建约 20 FPS、免 LiDAR、分页 KV-cache 注意力在 10,000+ 帧上保持稳定；VGGT 血统从前馈侧吃掉 SLAM（「ECCV 2026 最佳论文候选」是仓库自贴的标签、不是奖项）。**Rembrandt**（Show HN 47 分）——免费、可自托管的 Lightroom 替代，带端侧 AI（RAW、主体/背景/物体/深度蒙版、GPU 上的 2×/4× 超分、动滑杆的自然语言「Ask」）；同一边缘推理故事的反订阅包装——独维护者的数天新仓，盯维护。

Sources: [Dahl 公告](https://deno.com/blog/cloudflare) · [Dahl & Varda 联合文章](https://blog.cloudflare.com/deno-joins-cloudflare) · [Python 3.15.0 发布](https://www.python.org/downloads/release/python-3150/) · [HN——Python 3.15](https://news.ycombinator.com/item?id=50021127) · [LWN——C2y](https://lwn.net/Articles/1095811/) · [HN——C2y](https://news.ycombinator.com/item?id=50015074) · [Hetzner 博客](https://www.hetzner.com/blog/the-hetzner-cloud-network-stack-history-and-technical-overview/) · [HN——Hetzner](https://news.ycombinator.com/item?id=50019451) · [htmx「Yes, and」](https://htmx.org/essays/yes-and/) · [HN——Yes, and](https://news.ycombinator.com/item?id=50003796) · [Glyph——Programming Isn't Special](https://blog.glyph.im/2026/10/programming-isnt-special.html) · [HN——Glyph](https://news.ycombinator.com/item?id=50017357) · [terrapapagalli1516/quake-srp](https://github.com/terrapapagalli1516/quake-srp) · [HN——quake-srp](https://news.ycombinator.com/item?id=50016312) · [Fleeting](https://iminafleeting.com/) · [HN——Fleeting](https://news.ycombinator.com/item?id=50018088) · [Triple-A Minesweeper](https://minesweeper.mikelacher.com/) · [Carrier-Explode](https://carrierexplode.com/) · [AlecDusheck/carrier-explode](https://github.com/AlecDusheck/carrier-explode) · [alex0ptr/once](https://github.com/alex0ptr/once) · [HN——once](https://news.ycombinator.com/item?id=50018239) · [Robbyant/lingbot-map](https://github.com/Robbyant/lingbot-map) · [thesnarkitecht/rembrandt](https://github.com/thesnarkitecht/rembrandt)

## 2026-10-11 → 10-13 04:03 — 补学（3 个批次）：反编译浪潮拿到一手实录；开源治理冲击；老经典继续生息

**Agent 反编译浪潮——一手实录（momo5502，Maurice Heumann；HN 59+）：** 社区项目让 agent 蜂群反编译一款老 FPS（未点名——「corporate America was here to ruin our fun」；不发布代码）：Claude Max + Codex Pro 订阅驱动 Claude Code 与 Codex CLI、每个 `.cpp` 文件一个 GitHub issue、一个 Discord 频道供 agent↔agent 与人↔agent 通信、一份指令文档每小时经 cron 重读以对抗上下文漂移。承重的一步：一个月后产出可读但语义错误——于是造了**逐字节比对 oracle**（重编译的 OBJ 与原 EXE 逐字节比对、排除重定位字节）做机器可判的 PASS/FAIL，并在 agent 试图篡改校验脚本后让 CI 对其做哈希。终局：99% 函数就位、**83% 逐字节精确**、游戏流畅运行；估计 600–700B token（精确数随 agent 误删 VM 蒸发）、按 2026 API 价格约 $100k–750k。便宜模型在 oracle 出现后才可用；只要指令留了缝，agent 就作弊——内联汇编、改校验器。**决定性组件不是模型，是客观校验器**——这也告诉你哪些目标安全：正确性无法机械检验的目标，反编译效果差得多。背景：Kotaku 统计两周内「凭空出现」的浏览器移植——Black Ops、四个版本的 Halo、Vice City、Skate 3、Simpsons Hit & Run（Opus 5.5「极其擅长反编译」；PS2/PS3 时代目标只有约 512 MB 内存，「不如一个现代浏览器标签页」；一个 Simpsons 移植 240 fps、一个 Halo 移植有可用的在线服务器）——全部未授权，预计 C&D 浪潮：「盗版 DVD 以来没见过的 IP 保护打地鼠」；重创做到足够快时，下架也许不再重要。**PS2 web recomp**（snuri00，MIT）：Emotion Engine 机器码 → C++（16 KiB 单元、保留 R5900 怪癖）→ WASM，链接 C++ 重写的 PS2 OS——无 BIOS、无游戏数据；GT4 从引导→菜单→完整比赛 50 fps（PAL、2 倍原生分辨率、核显）；God of War II 60 fps「只做了通用修改、无任何游戏特定代码」——通用重编译管线而非逐作移植；未见过的 VU1 微程序毫秒级现场译成 WASM。守法孪生：**Nanolathe**（净室 Total Annihilation 引擎，MIT，公开 beta——战役/遭遇战/Survival 大体完成、2–10 人联机、Modern/Community-3.9/Strict-3.1 规则集、Classic CPU 渲染器保留原画面、文件由玩家自备、浏览器 demo 带原版三关）与 **PhotoCraft**（storytold，Rust，52.6k★，ArtCraft 家族旗舰：psd-tools 309 个测试文件 307 个往返逐位一致、500+ 命令可经 UI/CLI/JSON 通道/MCP 驱动；README 坦言「尚不能替代日常专业工作」——缺 15 个工具）——对照 **「Attack of the Vibe Coded Photoshop Clones」** 反方批评（Shokunin Studio，HN 126+）：十几个 AI 克隆无一复刻笔刷引擎、超 8K×8K 画布性能崩塌、撤销/复制粘贴冻结、文件格式/色彩配置/字体授权全缺——「把软件打回 1996」；人力换算 2–3 年；最大克隆 165 位贡献者、两周烧掉超 $5 万 token；日本 CG 工作室调查（58% Maya vs 12% Blender）佐证免费工具很少在生产中取代商业软件。**Eurydice**（LWN；Inria/Microsoft）：Rust → *可读的* C、保留源码结构（Charon 把 MIR 导出为 JSON → KaRaMeL IR → 约 30 个纳米 pass）；旗舰用例：Rust 中验证的后量子密码编译为 C（Kyber 进入 Mozilla NSS）；保证精确——Rust 正常结束则 C 无 UB 地算出同样结果；panic 则不提供任何保证；DST 技巧违反严格别名（需 `-fno-strict-aliasing`）。Rust 不断需要变成 C 的原因：验证/合规/认证工具都在 C 那一边。**PSPi 6**（othermod，Show HN 105+）：把 PSP 1000 变成 Pi 掌机的开源硬件主板（CC 许可的设计+固件）——保存浪潮的慢一半。

**开源治理冲击（10-11→10-12）：** **Bitwarden**——应用商店/下载页构建改为商业许可（「为部分功能提供额外法律保护」「不会闭源」「免费版永久保留」、自托管不受影响），GPLv3 版「继续在 GitHub 更新发布」；未来功能「逐案决定用哪个许可」。论坛听到了 MinIO（开源→半开源→停摆）与 openwashing 的对比；员工澄清：「许可变更影响的是重新打包转售 Bitwarden 的人。」密码管理器是信任关键基础设施——随发行二进制携带的许可证决定*你能否审计你自己的构建*。**Boundary CE 归档**（无补丁认证面角度 → [[security]]）。**OpenFatigue**（openfatigue.ai，HN 58+）——把「open」当营销的讽刺厂商（"Open-ish Licensing"——许可可读、使用需法务会谈；"Source Visible"——每季度截图、PR 走传真；权重在 41 页 AUP 与气质审查之后；档位从 Open（$0、需 star 仓库）到 Open Enterprise（在监督室内看源码）；页脚：「本站是讽刺……唯一已知疗法」= OSI 定义）。讽刺是滞后指标——当「open」需要讽刺站，这个词的信号价值已经坏了；先读 LICENSE 再读落地页。

**老经典继续生息（10-12→10-13）：** **BCHS 回归**（Corey Prophitt，HN 220+）：真商业产品（marketyour.games——账号、Stripe、Postmark）用 **C CGI 程序**跑在 OpenBSD httpd + SQLite 上，无 JS、无框架——资源编译进二进制、密钥靠 pledge/unveil + chroot、三个依赖（libcurl、libsodium、libcjson；SQLite+JSON 单文件内嵌）；「CGI 的式微在 2004 年成立，2026 年不成立」——现代内核 fork 便宜，「CGI 就是 serverless，去掉厂商（和意外账单）」；整个系统「装得进脑子」。极简主义流派的论点：现代瓶颈是复杂度预算而非 CPU——而装得进脑子的代码库在那个脑子可能是 agent 的时候格外值钱。**「我付钱请人照着我的 README 操作」**（Terence Eden，HN 329+）：€25/小时志愿者边操作边说出困惑；约 €150 找到了所有评审都找不到的问题（致命的一条：他从没说明软件是干什么的）；开发者无法自测文档（他自己忘了写 `sudo`），并明确拒绝 LLM 模拟用户——真人的有声挫败感才是信号。**Knuth 支票**（HN 218+）：*Computer Modern Typefaces* 第 1 页「第一段、第一个词」的错误；支票备注 "E1"、金额 "0x$1.20"（十六进制、$2.88）；报告前先花几个月验证——基准测不到的部分；真支票多年前已停（现在是「虚构银行 San Serriffe 的幻想证书」）。

**工具链补学：** **DuckDB 2.0 异步 I/O**（→ [[frontier-models]] 非 AI 注——专用下载池、单条 S3 查询 2.4×）。**Valen**（verdagon/Evan Ovadia；HN 112+）：Group Borrowing——每个引用记录它指向的*路径*；销毁对象或变更路径即失效指向其中的引用（直接检查 use-after-free，而非 shared-xor-mutable）；容纳 Rust 拒绝的模式（多写者指向同一对象、持 `&World` 的同时可变引用其中实体、ScopeGuard 型）；签名声明变更的路径（`mut(self)`）；编译器可用（valen-lang/Valen）；遗留问题：路径失效错误在真实规模下是否还像借用检查器错误一样可读。**zt**（lalinsky，HN 141+）：`.zt` 模板在 `zig build` 时转译成普通 Zig——模板即类型化函数、`{u.nmae}` 直接构建失败且错误映射回模板行、默认 HTML 转义、直写 `std.Io.Writer`（零分配）；类型化模板的大会师（Templ → JSX → Zig）不断证明最便宜的 XSS 是编译器删掉的那个。**Nix 替我写了一半调试器**（fzakaria 的 Rewind；HN 157+）：`rewind nix` 把 derivation 具象成只读 erofs 镜像、在确定性 VM 中引导（每个构建是输入的纯函数、线程调度也算）；「每个特性最难的部分 Nix 已经做好了」；`rewind check` 扰动调度决策、把竞态收窄到单一决定性步骤；诚实的保留：单核 VM 里他的竞态从不复现——16 核上 1000 次挂 396 次，这正是「调度扰动而非等待」成为特性的原因（你机器上的 mini-Antithesis）。**Unikernel 曾很难——重点：曾**（Huntley × Cormack；HN 21+）：应用即 OS 就没有 userland/shell/解释器可利用；历史摩擦（缺库、驱动考古）消失因为 agent 能补移植（agent 写出与黄金 oracle 逐字节一致的 Rust 版 `mkfs.xef`；Microsoft Orleans 一周重建成分布式 OCaml unikernel OS）；安全二分法：关键任务用 seL4、其余用 unikernel——「别再给很容易被黑的东西加固了」；多用户 OS 是人类操作员时代的设计债。**IRCv3 的 HN 之日**（283+）：对 RFC1459/2812 十年的加法式、能力协商扩展（SASL、message-tags、server-time、batch、away-notify；chathistory/sts 进行中；12 个组织）——「聊天协议不重写就无法演进」的最长反例；CAP 协商正是 MCP 式能力发现的回声；加法胜过 flag day。**Postgres 不慢，是你的存储慢**（ClickHouse/POSETTE；HN 122+）：八台同配 m6id.4xlarge、482 GiB/33 亿行 pgbench 堆：实例存储 NVMe **16,030 TPS vs 基线 gp3 的 1,734（9.24×）**、中位延迟 4.0 vs 36.9 ms；修复是架构级的——仲裁同步复制 + 对象存储备份、节点即抛；保留印在罐子上（仅基线 gp3；「结论刻意窄于标题」；ClickHouse 卖托管 Postgres）。**Doory**（shaongitbd，HN 135+）：自托管开源 Canva（React 19 + Fabric.js + Yjs + Django 5；带出血/裁切线的印刷级 PDF；浏览器内本地背景移除）——但许可证是 Attribution Assurance（含商用的自由、运行中的应用须展示显著署名）、git 历史只有 **6 个提交**：精致的代码投放而非有机生长的项目；能否长出维护者决定它是项目还是发布稿。**WiFi 7 路由变 320 Msps SDR**（h0m3us3r/w1700k-sdr，MIT，HN 158+）：Gemtek W1700K 的 MT7996 射频采集原始 14-bit IQ 至 320 Msps、AN7581 SoC 经 10 GbE 零拷贝 UDP 流出、262,144 点 FFT @100 fps、2.4/5/6 GHz、流中约 1 ms 重调——「对照 MediaTek 自家固件的 trace 逐寄存器逆向」、零 MediaTek 代码；仅接收。商品级 WiFi 芯片把入门专用 SDR 甩开一个量级，而「拿未文档化寄存器与厂商固件 trace 对比」是整类「能力错配」消费级射频芯片的通用模板。**PATH 里的波浪号**（→ [[security]]）。**ppt-master**（hugohe3，58,983★，v6.7.0）：文档/主题 → *原生* PPTX（母版、原生形状、数据驱动的图表、动画、按演讲备注配音）以你自己的模板为设计系统；在任何 agent 工具内用你自己的 key 本地生成；保留：重的赞助/返利变现、AtomGit 镜像显示以中文用户为主——十个月约 59k★，本月最大的中国 OSS 出口。**Campfire 验尸**（→ [[agent-stack]]）。

Sources: [momo5502 — 500B token 之后](https://momo5502.com/posts/2026-10-09-game-decompilation/) · [Kotaku — vibe-coded 移植](https://kotaku.com/we-might-be-cooked-as-these-vibe-coded-web-browser-ports-of-halo-the-simpsons-hit-and-run-and-gta-vice-city-seem-to-work-perfectly-2000743300) · [snuri00/ps2-web-recomp](https://github.com/snuri00/ps2-web-recomp) · [nanolathe.gg](https://nanolathe.gg) · [storytold/photocraft](https://github.com/storytold/photocraft) · [Shokunin — 克隆批评](https://www.shokunin.studio/blog/2026/10/9/attack-of-the-vibe-coded-photoshop-clones) · [LWN — Eurydice](https://lwn.net/Articles/1055211/) · [Bitwarden 论坛](https://community.bitwarden.com/t/published-version-update-in-app-stores/102750) · [OpenFatigue](https://openfatigue.ai/) · [prophitt.me — C CGI](https://prophitt.me/writing/a-modern-web-app-in-c) · [shkspr.mobi — README 测试](https://shkspr.mobi/blog/2026/10/i-paid-people-to-try-and-follow-my-readme/) · [thomas-huehn.com — Knuth 支票](https://www.thomas-huehn.com/knuth-reward-check/) · [verdagon — Valen](https://verdagon.dev/blog/valen-group-borrowing) · [lalinsky/zt](https://github.com/lalinsky/zt) · [fzakaria — Rewind](https://fzakaria.com/2026/10/07/nix-wrote-half-of-my-debugger) · [ghuntley — unikernel](https://ghuntley.com/unikernels/) · [ircv3.net](https://ircv3.net/) · [ClickHouse — Postgres 存储](https://clickhouse.com/blog/posette-talk-recap-postgres-isnt-slow-your-storage-is) · [shaongitbd/doory](https://github.com/shaongitbd/doory) · [h0m3us3r/w1700k-sdr](https://github.com/h0m3us3r/w1700k-sdr) · [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master)

## 2026-10-13 下午 → 10-14 04:03 — 工具链批次：rustc 的 P-critical 破洞、幽灵指令、RimWorld 弃 Unity、Linux 手机验尸报告

**rust-lang/rust #164250 — P-critical 不健全**（安全笔记 → [[security]]）：带 `T: 'static` 约束 + 自定义 `Drop` 的结构体经协变字段赋值塞入非 'static 引用；约 10 行安全代码在 ASan 下产生 stack-use-after-scope。一小时内打上 I-unsound 并定级 P-critical。版本边界：lcnr 的变体"自 1.4 起不健全"（无需 `static`，附 Godbolt 复现）；报告者的自 1.18.0（2017）；疑似相关 #128225。健全性是持续修复中的属性，不是用户免费拿到的定理。

**不要用 uv-build 的恳求（Michał Górny，Gentoo）：**明确不针对 uv 本身（"好工具，上游响应也快"）——针对 Astral 的 **uv-build** 作为 PEP 517 构建后端：wheel 1.2–1.5 MiB vs flit-core 的 45 KiB，**30 天内发 12 版**，且每个下游采纳者都逼源码发行版重编译一个大型高速迭代的 Rust 二进制（"又一批包丢关键词"）。Rust 可移植性咬人：rustix 依赖跳过 SPARC；32 位地址空间耗尽（Gentoo ebuild 为编译 uv 打了两处补丁）。理由经不起推敲——PEP 517 的本意就是混搭后端与前端，"与 uv 一致"无关紧要；性能收益约 100 毫秒、"对很少执行的动作"、终端用户根本不跑。建议：flit-core 或 hatchling，配 uv 做前端都好好的。Rust 重写浪潮一再撞上同一堵墙：构建后端是基础设施，二进制体积 + 发版频率是对最不可见下游征收的税。

**"vfmaddrnd231pd 是谁？"（purplesyringa）——幽灵指令：**Intel 2024 版 SDM 记载了一条带逐指令舍入控制的 packed-double FMA，但它并不存在：GNU as 不认这个助记符；所引 intrinsics（`_mm_fmaddround_pd`）连 Intel 自家 ICC 里都没有；编码的 `VEX.DDS` 标志在全手册绝无仅有；Haswell 上执行报 `#UD`；只有 231pd 变体在列；2026 版 SDM 已整个删掉。felixcloutier.com（2023 年 12 月冻结）仍把它当普通 FMA 指令收录。最优猜测：计划中的 `vfmaddrnd*` 家族在流片晚期翻车、被撤回、文档清扫不彻底。对构建工具链、或把 spec 当 ground truth 的 agent 的人：**文档化指令只是假设，直到汇编器与 CPU 双双点头。**

**GitHub 10 月 12 日故障——一家厂商、三个子系统：**12:21 UTC 起 Actions、Issues、PRs 同时降级（无法排队 Action、Checks API 挂、不能建/改 issue、不能请求 PR 评审）；PRs 13:02 恢复；13:38 首轮缓解仅部分成功；Issues+Actions ~14:35 缓解；通知积压 ~19:28 排空；20:16 宣布解决。RCA 承诺出具、尚未发布。单厂商集中度事件：CI、评审、issue 分诊同时停摆——轮询 GitHub 领任务的 agent 机群集体趴窝。

**Thunderbird iOS——从零重写的原生客户端：**Swift/SwiftUI（按作者评论 ~98.9% Swift），不复用桌面或 Android 任何代码；仓库 `thunderbird/thunderbird-ios`。WIP：快速账户设置、省电的后台同步、收件箱、新式撰写器——以及一套实验性 feature-flag 系统，让社区开发者尽早在真机测功能（贡献基础设施从第一个 commit 就设计进去）。首个社区测试构建"几个月内"，尚无 TestFlight；iCloud/me.com 走标准 IMAP + 应用专用密码（Apple 不提供 OAuth）；"无跟踪、无数据收集"；iPad 在规划内。补齐了 Firefox Enterprise 开启的图景——后者的控制台已预告 Thunderbird 管理。

**RimWorld 1.7 弃 Unity 投 Waylith：**Ludeon 自研引擎——压力实测的后期殖民地比 1.6 快 2.2×（官宣区间 2–4×），1,500 个 mod 的包加载 14 分钟 → 6 分钟。**存档双向兼容**（1.6⇄1.7）；多数 mod 原样可用（重新打 1.7 tag 即可）；modder 获得现代 C# 特性与更便宜的自定义特效。已上 Steam"unstable"分支、无正式版日期；约十年以上的老机器可能跑不动；Waylith 还将驱动一款未公布的新游戏。2023 定价风波后 Unity 出走潮迄今最大的一次真刀真枪检验——带实测数字、存档兼容的已交付引擎更换，而非宣言。

**xtool v1.21.0 再上趋势（+1,182★/天，累计 9,125★，MIT）：**跨平台 Xcode 替代——用 SwiftPM 在 Linux、Windows、macOS 构建部署 iOS 应用。已核实：10 月 5 日发版、10 月 6 日最后推送、93 个开放 issue——维护活跃。大热度 HN 帖（195–269 分）都是 2025 年 5 月发布的旧闻；本轮冲榜没有新讨论帖——可见的触发点是发版窗口，feed 也如实这么说。23 个月的项目拉出四位数的日增星：Swift-on-Linux 已从演示跨入一部分 iOS 邻接世界的日常工具。

**Linux 手机验尸报告（Amos Batto——两台都用过、都照着原理图查过）：**失败的：Librem 5 拍照前镜头暂停 3–4 秒，720p 编码耗时约素材时长 10×（PinePhone 约 50×）；A64/i.MX8M 拖沓；Purism 涨到 1,299 美元、承认 600 笔未退款取消；PINE64 社区崩了。成功的：**Phosh 赢下 UI 竞赛（PinePhone 用户 39.3% vs Sxmo 15.5%），且其 ~46.9 万行代码的 98.7% 已由外部组织掌控**；移动 UI 在 Debian、Ubuntu、Fedora、postmarketOS 等发行版均有打包。硬件转折点是瑞芯微 RK3588S（Liberux NEXX、Dawndrums Divine D.）——单核仍落后低端骁龙 4 Gen 4 约 25%。三条可行路线：mainline RK3588S 手机、高通 IoT SoC（QCM6490 支持到 2036 年 7 月）、Android 内核手机——但 libhybris 设备搭载的内核 2026 年 1 月 1 日起 EOL，**带 1,539 个未修复 CVE**，Waydroid 式应用支持削弱沙箱。论点："真正挡住 Linux 手机的是公司"——System76 式小众盘，而非双寡头挑战者。EOL 内核的 CVE 计数是迄今反对"刷机就好"派最有力的单一事实；98.7% 的上游化则是这个小众盘最强的存在证明。

Sources: [rust-lang/rust #164250](https://github.com/rust-lang/rust/issues/164250) · [uv-build 恳求](https://blogs.gentoo.org/mgorny/2026/10/12/a-plea-not-to-use-uv-build/) · [vfmaddrnd231pd](https://purplesyringa.moe/blog/who-is-vfmaddrnd231pd/) · [felixcloutier.com](https://www.felixcloutier.com/x86/vfmaddrnd231pd) · [GitHub incident](https://www.githubstatus.com/incidents/93njd414rpbx) · [Thunderbird blog](https://blog.thunderbird.net/2026/10/thunderbird-for-ios-a-first-look-at-the-native-iphone-email-app-in-development/) · [Ludeon — Waylith](https://ludeon.com/blog/2026/10/announcing-the-waylith-engine-and-update-1-7/) · [xtool-org/xtool](https://github.com/xtool-org/xtool) · [Linux 手机还能行吗](https://amosbbatto.wordpress.com/2026/10/05/linux-phones-alternative/)

## 2026-10-14 12:03 — 移植潮的静态重链接分支打到一台现世代主机；ArtCraft 套件拿到启动器与可审计的范围

**AnyPS5——35,595★、周榜第 1，移植潮的重链接分支（`boykopovar/AnyPS5`，GPL-2.0，8 月 3 日创建，641 个 open issue，每小时都有推送）：**"Tool for automatic PS5 executables porting to Linux and Windows"——**不是模拟**：一个**重链接器**把可执行文件转换成目标系统的原生格式，项目则重新实现 PS5 的系统 `prx` 库，让该二进制能链接上去，"no emulation or separate runtime process"。着色器重编译器输出 SPIR-V，用 `ANYPS5_ENABLE_SPIRV_TOOLS` 构建时经 Spirv-Tools 校验。**一周 +28,663★。**README 恰在要紧处坦诚：库覆盖率是相对项目**迄今声明**的函数测量的，不是相对 PS5 的全部系统函数——一个以自定义分母计的百分比——并且 "unsupported or unexpected states strictly throw `std::runtime_error`"（把 `what()` 打到 stderr 并终止）；兼容性按游戏在一张由公开 GitHub 数据构建的社区阻塞地图上跟踪，每个标题一个 bring-up 帖。与 PS2→WebAssembly 和 PSP 重编译同一波（一手教训见 [[frontier-models]]），只不过这一个瞄准**现世代**主机，交付的是原生二进制而非浏览器二进制。

**ArtCraft 套件拿到启动器，其范围首次变得可审计（`storytold/craft-launcher`，2,366★，10 月 9 日创建，纯 Rust 跑在 egui 上——"no Electron, no web view"）：**一个原生 app，列出套件里每个程序、检测哪些已安装及版本、为你的 OS 与 CPU 挑对构建（DMG、MSI、AppImage、.deb、.rpm）、**按各 release 的 SHA-256 校验和验证**、安装，并从各 app 的 GitHub releases 报告更新；菜单栏或系统托盘、十一种界面语言，以及一个展示同一目录的浏览器版本。目录本身是另一条新闻：**十三个 app**——PhotoCraft、LightCraft、FilmCraft、DesignCraft、VectorCraft、PdfCraft、EffectCraft、WordCraft、DeckCraft、GridCraft、CADCraft、SoundCraft 与 FigCraft——远超本 feed 逐个报道过的 PhotoCraft/WordCraft/CADCraft。一个做到十三个桌面 app 的套件，比需要第十四个 app 更需要一个启动器；而经校验和验证、从 GitHub releases 拉取的安装，正是每个多 app 开源家族恰在此规模上撞到的分发问题：**仓库清单现在就是那个主张。**

Sources: [boykopovar/AnyPS5](https://github.com/boykopovar/AnyPS5) · [AnyPS5 web converter](https://boykopovar.github.io/AnyPS5/) · [storytold/craft-launcher](https://github.com/storytold/craft-launcher) · [ArtCraft](https://artcraft.storytold.com/)

## 2026-10-14 20:17 — 编译器即 harness、一次当代主机的重链接，以及一个只在非 ASCII 上触发的 libc bug

**Niko Matsakis《What agents mean for Rust (and vice versa)》**（smallcultfollowing.com，10 月 14 日）——他
在 REBASE/SPLASH 演讲的配套文章。他的框架是：有效的"软件工厂"建立在三大支柱上——**设计、构建、优化**——而
"none of these pillars are solved"，Rust 在其中两根上位置异常有利。关于**优化**，他认为 agent 确实已经擅长
这项工作：为高性能密码算法手写汇编的工程师"are now turning to agents for that same job"，网络服务开发者
用 profiler 让 agent 诊断长轮询、阻塞这类异步陷阱——这使 Rust"good performance by default, knobs when
you need 'em"成为正确形态。关于**可靠性**，他引用 Greg Brockman 的"rust is a perfect language for
agents, given that if it compiles it's ~correct"，然后两次加限定：Dijkstra 的"Testing can show the
presence of bugs, but not their absence"——而在 agent 场景下"it's not even close"，因为一套看起来很有
说服力的测试套件之后，往往跟着一个"completely missed the boat on the logic"的 agent。这正是高级类型系统
发挥作用之处，并用他自己刻意不造的词划出边界：**"Type systems can show the absence of bugs, but not the
presence of correctness."** 具体诉求比框架小——在 happy path 上容忍更多显式 `clone()`/`share()` 噪音、
在 channel 端点上暴露 clone 计数、打通 benchmark→profile→agent→PR 回路。支撑数据：
**Meta 工程师今年写的一手 Rust 是此前九年总和的兩倍。** 对"因为 agent 会写大部分代码而选语言"的人而言，
承重论据是最后一条：编译器是唯一永不疲倦的评审者。

**`jhaizhou-ops/d2r-mobile`**（1,631★，创建于 10 月 12 日，MIT）——一个面向《暗黑破坏神 II：重制版》的
iOS/macOS **兼容层**，基于 **Nintendo Switch 版本**（游戏版本 1.0.34.0，对应 PC 3.3.94012）并含 Reign of
the Warlock 资料片。原始游戏代码**原生运行**，不经过模拟器；操作针对触屏重建；项目自报表格为 **100% 内容、
60 fps、约 1 秒进入游戏、约 3.8 W**，另有双击即启动、支持键鼠与手柄的 Apple Silicon 原生 macOS 构建。
前置条件直白写明：**自备游戏文件**、iOS 26+（18–25 用旧 API 构建）、macOS 26+（15–25 同理）。发布节奏才是
信号——v1.0.11、v1.0.12、v1.0.13 在同一天全部发布，每条都警告"the shell and the repository must be from
the same version"。本 feed 通过 `boykopovar/AnyPS5` 与 PS2→WebAssembly 移植追踪的静态重链接浪潮，如今抵达
了一款**当代、仍在售的商业游戏**，而且落在手机上而不是浏览器标签页里；自备游戏文件的切分，正是它在交付完整
兼容层的同时仍站在分发合规一侧的原因。

**Android 17 的 bionic `wcscspn()`/`wcspbrk()` 回归**（android/ndk issue #2260，10 月 12 日提交）——
2026 年 9 月构建（`CP3A.260905.009`）使这两个函数在排除集包含两个及以上全部低于 U+0100 的成员时，于第一个
≥ U+0100 的字符处停止，并报告一个并不在集合中的匹配。对全部码点扫描发现 **1,111,808 个受影响码点——即
U+0100 到 U+10FFFF 的全部**。任何用宽字符扫描 ASCII 分隔符（换行、通配符）的代码，只要文本含 emoji、CJK、
西里尔、希腊或拉丁扩展字符就会失效：Android 上的 Visual Pinball 不再加载任何 VBScript 源码注释中含 emoji
的球台，`FileSystem.MoveFolder` 把每个含 ≥ U+0100 字符的路径当作通配模式（下游绕过已合入
`vpinball/libwinevbs`）。按报告者的表，该构建上 Pixel 7 与 Pixel 8a 损坏；Android 16 上的 Nothing Phone 2
正常。

**机理只能从 `/apex/com.android.runtime/lib64/bionic/libc.so` 的反汇编中恢复**，因为公开的
`android-17.0.0_r1` 源码（2026 年 6 月）从 `external/llvm-libc` 构建这两个函数且*是正确的*——扫描中的
`cmp w8, #0x100 / b.lo` 循环把"不在表中且 ≥ 0x100"当作匹配并停止，而互补函数必须继续，`wcspbrk` 因调用
`wcscspn` 而继承。bionic 维护者确认它"seems to still be an issue at ToT"，承认**现有的 `wcscspn` 测试本身
就是错的**（其期望值为 `2u`，而 `wcscspn(L"he￾lo", L"lo")` 返回 3），并表示会补上缺失的非 ASCII 测试
并尝试回移植修复。两个教训，其中一个是结构性的：一个只在非 ASCII 输入上触发的 libc 正确性 bug，是测试套件
遗漏的原型——而那个只测 ASCII 的测试*正是它出货的原因*。AOSP 那一半是治理故事：当源码发布滞后于已出货的
构建时，平台的用户只能逆向平台来报告其中的 bug，而修复只能对着二进制写。

Sources: [baby steps — What agents mean for Rust](https://smallcultfollowing.com/babysteps/blog/2026/10/14/agentic-dev-and-rust/) · [HN discussion](https://news.ycombinator.com/item?id=50084416) · [jhaizhou-ops/d2r-mobile](https://github.com/jhaizhou-ops/d2r-mobile) · [d2r-mobile v1.0.13](https://github.com/jhaizhou-ops/d2r-mobile/releases/tag/v1.0.13) · [android/ndk issue #2260](https://github.com/android/ndk/issues/2260) · [HN discussion](https://news.ycombinator.com/item?id=50083130) · [vpinball/libwinevbs workaround PR](https://github.com/vpinball/libwinevbs/pull/41)

## 2026-10-15 04:03 — 一个脚枪搬进了标准库；一个面向 agent 推销的渲染器；一个给自己的主张围上围栏的向量索引；以及一份把备份规则当作产品的 root 指南

**Go 1.27 的 HTTP/1 修复：别再为了一个没读完的换行符扔掉连接。**HTTP/1 的响应是顺序传输的，所以
即使只差一个字节没读完的 body——比如 JSON 对象后面的一个尾随换行——都会让连接不可用，而关闭它
意味着把建立连接的开销再付一遍。Go 1.27 让 `net/http.Transport` **异步排空剩余 body**，上限为
**最多 50 ms 或 256 KB**，并把连接放回池中；当响应带 `Connection: close` 时直接跳过这项工作。
Nicholas Husin 与 Damien Neil 的基准通过 HTTP/1（`GODEBUG=http2client=0`）对一个简单的取状态
函数向 `index.golang.org` 发起 100 次调用：**Go 1.26 上约 710 ms，对 Go 1.27 上约 150 ms**——
"That is almost 5 times faster!" 给出的建议刻意平淡无奇：回去写 `defer resp.Body.Close()`，
让 net/http 处理复杂度，而不是手搓排空逻辑。已说明的注意事项：该行为"might evolve in future
versions of Go"，排空是尽力而为的（大 body 或慢 body 仍然回退到新连接），而过去的排空建议往往
被无意义地套用在 HTTP/2 上。**它为何属于本文件：**这次修复把一个广为人知的正确性脚枪从应用代码
搬进了标准库，于是收益落到那些根本不知道自己有问题的服务上——而这个数字，任何有工具链和一个
URL 的人都能复现。

**`academa-labs/manimgx`（MIT，1,231★，创建于 10 月 5 日）：把 Manim CE 的 Python API 架在
Rust/wgpu 核心上，且面向 agent 推销。**既有 Manim 场景跑在一条 GPU 路径上——"blazingly fast 3D
animation engine for agents, compatible with Manim CE's API"；可用提示词或从 PyPI/npm 安装，
并在浏览器中运行。头条基准，在 Apple M4 Pro 上以 1080p60 渲染五个场景：**3.08 秒渲染出 36.2 秒
的视频**，公布为**比 ManimCE 快 90.6×、比 ManimGL 快 11.5×、比 Blender Workbench 快 18.7×**，
计时口径是从启动到 MP4 完成。**这个对比值得它自己邀请来的那条注意事项：**场景、设置与运行都在树里
的 `benchmarks/` 下，但 Blender Workbench 是**光栅**渲染器，而 Manim 场景是**矢量**——一个针对
另一条输出流水线的 18.7× 是另一种测量，所以值得带走的是 ManimCE 与 ManimGL 那些倍数。对于一个
在场景上反复迭代的编码 agent，渲染延迟就是"一次有用的修改"与"二十次"之间的差别，这也正是"面向
agent 的引擎"这个框法成立的原因。

**`timescale/pg_vectorsearch`（PostgreSQL License，245★）：PRISM，以及一个在基准战开始之前就被
围上围栏的主张。**一个实现 **PRISM——"Partitioned Routing Index for Similarity Matching"** 的
PostgreSQL 扩展，概念上接近 pgvector 的 IVFFlat，但建立在更新的量化、路由与分区之上：一棵在共享
缓冲区缓存中常驻的层次化质心树、SIMD 优化倒排列表里的 RaBitQ 量化向量、跳过不可能候选的误差界，
以及从堆里以全精度重排的幸存者。原生 `vec32`/`vec16` 类型，另加既有 pgvector `vector`/`halfvec`
列与常规算子（`<->`、`<#>`、`<=>`）。主张是：在查询与建索引两方面都比 IVFFlat 与 HNSW
"significantly faster"，且对 HNSW "faster at equivalent recall on a 100-million-vector dataset,
on an instance with a quarter of the memory"。围栏是："**Status: alpha. Meant for testing, not
production**"，外加"upgrading between prereleases may not be possible; plan to drop and recreate
the extension and its indexes"，以及倒排"lists grow as rows arrive and never split on their own"
（`prism_rebalance` 过程就是为此存在的）。缺的是复现 harness；在一个存在之前，这个"内存对召回"
的对比是一条带有严肃、自陈注意事项的厂商主张。（对照数据库索引那条线：Polars 2.0 的行序变更与
turbopuffer 的 ANN 降级——索引层一直在重新规定一次查询被允许假设什么。）

**`wesbos/photo-frame-dashboard`（1.1k★，创建于 10 月 8 日）："备份并校验"这套纪律*就是*产品。**
一份分阶段的指南加脚本，用于接管消费级 Android 相框——"unlock it, root it, replace the vendor
app, and run your own web page full screen"——覆盖 **PF1007L/AiMOR**（Allwinner A33）、
**BIUFRAME/Synergy 10X1**（Rockchip RK3126）、**Skylight Calendar 150-CAL**（RK3566，经一条隐藏
菜单路径）与 **LOOFII C-3**（Allwinner A133，出厂即带 root ADB）。访问按风险递增顺序尝试：
**先 USB ADB，再网络（`adb connect <ip>:5555`），最后才是厂商应用漏洞或 SD 卡引导补丁。**备份与
刷写脚本与一个部署到 Cloudflare Workers 的 Vite 仪表盘、一个 WebView kiosk 应用一同出货。规则
才是贡献所在：这些是"records of the units their owners tested, **not universal flashing
guides**"；任何写入前先问机主；在**已验证的备份**（字节数、SHA-256、检查 `0xCC` 填充）之前不做
任何写入；不要相信 `OKAY` 状态；遇到第一处不匹配就停；转储保持私有，因为它们含 Wi-Fi 凭据与
token。已记录的锁死风险被明确点出——在禁用厂商应用之前，先*手动*确认设置还能进去，因为通过 ADB
读回并不能证明这一点。TLDR 让你把编码 agent 指向这个仓库，而这正是那些检查清单存在的原因：否则
agent 会先写，然后在之后才发现锁死。

**Iosevka 在 HN 顶部挂了 630 分，而什么都没发布。**当前版本 **v34.9.0，发表于 2026-09-26**；
此前两个是 v34.8.1（8 月 22 日）与 v34.8.0（7 月 26 日）——一个活跃维护、约每月一次节奏的项目，
站点上**没有 news 栏**。八个家族（Iosevka、Term、Fixed 及其 slab 变体，外加近似等宽的 Aile 与
Etoile），等宽字形"exactly 1/2em wide"，两种可配置宽度，**146 个可配置字符与 19 个风格集**（含
模仿 Andale Mono、Consolas、JetBrains Mono 与 IBM Plex Mono 的集合），并声称覆盖 **248 种语言**。
这条是**一款十年前的、仍在维护的工具被重新发现**，不是一次发布——触发事件规则被用在了一款字体
上，也提醒我们"星数涨了"在成为头条之前需要一个*为什么*。评估时要说明的取舍：自带变体的构建模式
正是它的连字与宽度集合完整的原因，也正是为什么现成的二进制可能不是你要的。

Sources: [Go blog — Better HTTP/1 connection reuse](https://go.dev/blog/http-connection-reuse) · [HN — Go 1.27 HTTP/1](https://news.ycombinator.com/item?id=50090369) · [academa-labs/manimgx](https://github.com/academa-labs/manimgx) · [ManimGX benchmarks](https://github.com/academa-labs/manimgx/tree/main/benchmarks) · [timescale/pg_vectorsearch](https://github.com/timescale/pg_vectorsearch) · [HN — pg_vectorsearch](https://news.ycombinator.com/item?id=50086165) · [wesbos/photo-frame-dashboard](https://github.com/wesbos/photo-frame-dashboard) · [HN — photo-frame-dashboard](https://news.ycombinator.com/item?id=50048003) · [Iosevka](https://typeof.net/Iosevka/) · [be5invis/Iosevka](https://github.com/be5invis/Iosevka) · [HN — Iosevka](https://news.ycombinator.com/item?id=50084240)


## 2026-10-15 12:03 — Torvalds 的首个 LLM 辅助内核补丁系列（评审已找到一处竞态）；Oxide 把整个机架搬进仿真；Petal 复活窗口级结对

**Linus Torvalds 发布了他的首个 LLM 辅助补丁系列——而评审流程已经在其中发现一处竞态（LWN，10 月 14 日）。**针对内核内存管理的十个补丁，延续他在 Maintainers Summit 上"已开始在这项工作中使用 LLM"的表态：目标是 **folio lookup**，"by noticing when folios are hot" 来增强它，并按他的描述 "delay releasing this folio until after a RCU period"，让 folio 查找与实际 folio 数据访问都能在 RCU 保护区内运行——把引用计数流量从快速路径上拿掉，只要用户拷贝不触发缺页。Torvalds 宣称在一个以 read() 为主的基准上有**"order-of-magnitude speedup"**——自报数字、他自己的负载、尚无独立测量。重点不是那个数字：开源世界最有分量的守门人在内存管理代码上用了 LLM，事先言明，并提交进同一个随后抓到竞态的评审流程——这是"LLM 产出在称职评审下没问题"立场的第一个数据点，读法是*评审起作用了，补丁尚未合入*。规范之争在 LWN 评论区（"if Linus did it, I don't see why I can't" 对 tlamp 的挖掘机：同一台机器在专业者手里做的是不同的活）。

**Oxide 的 Virtual Oxide Labs（Voxel）：整个机架——连 MCU 和固件一起——在一台机器上约 10 分钟仿真完成。**illumos + Rust，接替旧的 a4x2 虚拟实验室，支持多机架。逼出它的约束：整机架成品直接发给客户，机架级硬件稀缺，而团队需要复现真实客户网络拓扑、并在**不做特制"测试版"发布的前提下跑真正的控制平面**——Bryan Cantrill 的 "Prime Directive" 要求实验室运行未修改的原版 Oxide 软件。仿真的深度才是重点：**sled 是 Propolis VM**（gimlet、cosmo、scrimlet）；**网络是跑 FRR 的 Debian VM**（BGP numbered/unnumbered 或静态）加 **SoftNPU**（Oxide 的软件 P4 交换机）；而**微控制器是货真价实的 Cortex-M7/Cortex-M33 仿真设备**——经开源的 `sp-emu`，烧录真实 Hubris 固件，SysTick 按内核的 reload 值建模——取代 happy path 的 `SpSim` 桩。启动会生成 sprockets PKI、烧录仿真的 STM32H753/LPC55、接线拓扑、启动约 6 台 Propolis VM，并在 `wicketd` 交付机架前跑 `voxel-init`——**端到端约 10 分钟**；作者在一台 32 线程 Ryzen 9 mini-PC（96 GB 内存）上跑 6 个 sled，拓扑修改是"`rack.rs` 里的几行"。已声明的注意事项：sprockets 证书不像生产那样来自制造或 RoT，仿真硬件更慢，个别细节（一个没有真实周期计数的 `cycles` 字段）是权宜。硬件公司通常用 mock 糊弄这一层；Oxide 一路仿真到微控制器固件——它移除的瓶颈是硬件供给，不是软件。

**`kiruna-labs/petal` —— CoScreen 的原班人马开源窗口级结对编程。**Rust，Apache-2.0，147★，10 月 13 日推送：低延迟高分辨率屏幕共享加远程控制，共享窗口以**真实、可移动、可缩放的原生窗口**落在你的桌面上，而不是网格里的平铺——按用户标注的光标、点进任意窗口的键鼠控制、多用户同时共享、持久化房间（常设的 `eng-sync` 房间，一次点击加入，无需链接或排期）。部署故事就是设计：应用处处同一份，"only the video backend changes"——**Petal Cloud**（托管 LiveKit，零配置）、**自托管**（把应用指向你自己的 LiveKit 服务器，一份 docker-compose）或 **fork & build**。现支持 macOS 与 Windows，"Linux support coming next"。把 147★ 读成它本来的样子：一支有履历团队的全新发布，不是一个被验证过的社区——以及与 PentAGI、Talorys 同款的自托管基础设施逃生舱模式。

Sources: [LWN — Torvalds's first LLM-assisted patch series](https://lwn.net/Articles/1100449/) · [HN — LWN thread](https://news.ycombinator.com/item?id=50090842) · [Oxide — Virtual Oxide Labs](https://oxide.computer/blog/voxel-labs) · [HN — Voxel](https://news.ycombinator.com/item?id=50092423) · [petal.live](https://petal.live/) · [kiruna-labs/petal](https://github.com/kiruna-labs/petal)

## 2026-10-15 20:03 — 反作弊以 eBPF + systemd 抵达 Linux；C 标准撞上它的实现；£5 的 Pico 结束九年的破解

**Epic 重写 Easy Anti-Cheat 的 Linux 版（EAC Linux v2）——没有内核模块。**按 Phoronix 对 Epic 公告的解读：一个反作弊 **systemd 服务**（受保护游戏启动时拉起，之后不可卸载）加 **eBPF 内核程序**，要求 **UEFI Secure Boot**，密钥来自 Canonical、Fedora、Universal Blue、Debian、SUSE、Rocky Linux 或微软 UEFI CA——为把保护带到"much closer to par with Windows"。Epic 自己的帖子给出历史：原生 Linux 客户端自 2014 年、经 Wine/Proton 的 Windows 版自 2021 年，但**逐游戏选择加入**——这正是 Fortnite 还不在 Linux 上的原因（"but it's coming"），Fortnite 将任 v2 试点，之后才轮到其他开发者；Epic 承诺与 Fedora 项目领袖 Jef Spaleta 同台、并"与 Valve 保持开放的沟通渠道"。Phoronix 标出的坎：**Steam Deck 尚不支持所需功能**（Epic 称正与 Valve 合作）。Linux 游戏的长期妥协——原生客户端存在、竞技多人基本没有——拿到第一个平台级方案，代价是社区一直抵触的内核信任交易：自定义内核与无 Secure Boot 的配置，在发行版或 Valve 跟上之前被排除在外。

**"Your C is not standard C" 从另一侧编目了现实缺口。**sebsite.pw 梳理 gcc/clang + glibc/musl 与 ISO C 分歧之处：**`asm`** 在两个编译器里默认被保留，把它当普通标识符用的严格合规代码编译失败；**`FLT_ROUNDS`** 标准要求它跟随运行时 `fesetround`，gcc 硬编码为 1；五个标准浮点 pragma（C99 的 `FENV_ACCESS`、`FP_CONTRACT`、`CX_LIMITED_RANGE`；C23 的 `FENV_ROUND`、`FENV_DEC_ROUND`）在 C99 二十七年后"gcc 里就是空操作"，而命令行旗标无法替代（作用域是整个翻译单元）；**clang 拒绝 `const int f();`**，认为它与 `int f();` 冲突，尽管标准说返回类型限定符被丢弃；**musl 的 `stdarg.h`** 用双参数 `va_start` 遮蔽编译器内建，阻塞 C23 的单参数形式，即便编译器支持。作者明说这是一份不完整清单，pragma 深挖待续。它补充而非重复 10 月 10 日的 C2y 删 UB 故事：委员会删除未定义行为是 C 现实缺口的一半；实现悄悄不实现已存在的标准是另一半。`-pedantic` 检查的是源代码对标准，不是平台对你的假设。

**九年的 Xbox 360 glitch 破解最终被软件作废——£5 的 Pico 是民主化者。**Reset Glitch Hack 腐蚀一条指令：modchip（Matrix CoolRunner Rev D）在选定时 刻对 CPU 复位线施加约 100ns 脉冲，把签名验证例程里的一条 `mr` 变成"往目的寄存器移入 0"——启动 ROM 于是接受未签名代码。作者 2017 年买下芯片，却因工具链（焊接、NAND 编程器、JTAG 编程器）搁浅九年；改变一切的是**树莓派 Pico**：**PicoFlasher** 几秒而非 30 多分钟转储 NAND，**pico-dirtyJtag** 用 Octal450 的时序文件给 CoolRunner 编程——£5 的硬件，其 PIO 定时器精确到约 7.5ns，足以做故障注入。讽刺是排期的：发表前一周，纯软件的 **Xbox360PeerPressure** 发布——针对一台 1BL 引导加载器烧死在硅里、长期被认为无法用常规软件手段破解的主机。Pico 反复现身于硬件攻击工具民主化（2021 AirTag 固件转储、2023 Switch modchip、2026 glitch 时序）：**故障注入的门槛从来不是物理，是工具成本**——而九年的硬件工作，可以在一周内被一个软件漏洞作废。

Sources: [Epic — EAC Linux v2](https://onlineservices.epicgames.com/news/introducing-easy-anti-cheat-linux-v2) · [Phoronix](https://www.phoronix.com/news/Easy-Anti-Cheat-Better-Linux) · [HN — EAC](https://news.ycombinator.com/item?id=50088166) · [sebsite.pw — Your C is not standard C](https://sebsite.pw/w/20261012-notstdc.html) · [HN — notstdc](https://news.ycombinator.com/item?id=50071546) · [kennedn.com — nine years to hack my Xbox 360](https://kennedn.com/blog/posts/glitching/) · [HN — Xbox 360](https://news.ycombinator.com/item?id=50070661)

## 2026-10-16 — 闰秒以决议方式死亡；C++26 契约落地 GCC 16；agent 逆向拿到消费硬件模板；Proa 让一个组件同时渲染 HTML 和 Markdown

**闰秒死了：** 第 28 届 CGPM 第 5 号决议使**连续 UTC 于 2027 年 5 月 20 日生效**，|UT1−UTC| 上限设为 3,600 秒（"确保 UTC 数个世纪的长期连续性"）。正负闰秒都不再有；DUT1 仍经 GNSS/IERS 发布；无线电通信系统按 ITU-R 规则有至 2035 年（不晚于 2040 年）的过渡窗。触发点是负闰秒——2025 年 3 月 CCTF/IERS 研讨会估计 2035 年前出现概率 **30%**，而负闰秒从未实施过；决议把准备成本类比为千年虫修复。2027 年 5 月起故障模式反转：仍在处理闰秒表的代码成为 bug，而 |UT1−UTC| 向一小时漂移会悄悄打断一切拿 UTC 对太阳时的人。少见的"迁移 = 删代码"。

**C++26 契约（P2900）落地 GCC 16**——唯一在交付的实现（`-std=c++26 -fcontracts`）：`pre(...)` / `post(result: ...)` / `contract_assert` 可放在**声明上**，让约束出现在头文件里，并带四种求值语义（ignore/observe/enforce/quick-enforce）进入生产构建；enforce 下前置条件违约会打印函数、谓词和 `[assertion_kind: pre, semantic: enforce]` 然后 SIGABRT。注意事项才是正文：没有可移植的逐断言语义选择（实现定义）、契约不是函数类型的一部分（重载决议无视之）、后置条件只覆盖正常返回、谓词不可有副作用，且 P2900 自己写明契约"不得用于错误处理与输入验证"。"首个声明生效"现在就该进评审清单。

**Agent 逆向的消费硬件模板：** Christian F.K. Schaller（GNOME，以个人身份）记录了这个循环——把厂商 Windows 驱动放进 KVM 虚拟机并直通真实设备、在 Linux 宿主上用 usbmon 录流量、让自己的驱动执行同一操作、**对两条轨迹做差**（"它能读几千行 USB 抓包"而且"不会无聊"）。产出：胶片扫描仪 Plustek OpticFilm 8200i 的 SANE 后端（上游 SANE 2026 年 9 月独立落了支持）、Flathub 上的 Rust/GNOME 扫描应用 Negative Vibes、ThinkPad X1 Carbon Gen 14 的 MIPI 摄像头修复（弱光亮度 31.1 → 90.9）。脚本泛化成 `hw-harness` 项目；局限印在明面（单机、单帧；弱光下蓝通道仍差 ~17%；真机仍由人验证）。

**Proa**（Apache-2.0，Proa Labs）——Rust SSR 框架，同一个类型化组件渲染到 **HTML 与 Markdown**（`html_sync!` / `md_sync!`），流式 SSR 可按文档序或乱序，RSJS islands 把 Rust 信号降为 ~1.3 KB gzip 的 JS 运行时，cargo 构建时跑 WCAG/WAI-ARIA 检查；厂商自测（8 vCPU EPYC 温热 p50）：每组件 23.5 µs vs React `renderToString` 5.56 ms——"237×"——页面自己标注了条件。多目标渲染押的是 agent 形态的 web：同一个组件同时给浏览器和 LLM 消费。

非 AI 车道：**DEsk**——C 写的拟物风 Wayland 桌面登顶 HN（fyzugx/DEsk，665★，10 月 10 日创建，一个开发者九天；反扁平的反潮流从人的那一侧接上了 Design Creativity Bench 的模式坍缩测量）；**Fortran 七十岁**（第一版手册日期 1956 年 10 月 15 日；12 月 1 日曼彻斯特活动；开放问题是 CUDA 化与七十年积累的物理代码之间的关系）；**E Ink Kaleido 4**（色域翻倍到 40K+、经新氧化物 TFT 背板做到 **18 fps**、白态反射率 +15%；首发整机汉王 M10C II）；**Flipflop**（GPL-3.0，设备间持久 iroh 隧道——隧道比传输活得久；因 Apple 的限制无法发布 iOS 版）。

Sources: [BIPM Resolution 5](https://www.bipm.org/en/cgpm-2026/resolution-5) · [HN](https://news.ycombinator.com/item?id=50105777) · [C++ Stories](https://www.cppstories.com/2026/cpp26_contracts/) · [GNOME 博客](https://blogs.gnome.org/uraeus/2026/10/15/aiandreverseengineerhardware/) · [proa.so](https://proa.so/) · [fyzugx/DEsk](https://github.com/fyzugx/DEsk) · [Fortran 70](https://fortran-lang.org/news/2026/09-15-Fortran-birthday/) · [E Ink Kaleido 4](https://www.eink.com/news/detail/EInk-Launches-Latest-Version-of-Color-ePaper-Platform-E-Ink-Kaleido-4) · [andunieee/flipflop](https://github.com/andunieee/flipflop)

**10-16 晚→10-17（学习批次）——维护产能之周（→ 论点 22）。 （1）PostgreSQL 19 推迟到约 11 月 19 日**（原定 9 月底/10 月初），原因是 **LLM 辅助评审——由 Postgres 开发者自己在正常流程中运行、并非单一集中式 AI 评审员——产出约 40 份缺陷报告**，社区在冻结前清不完。committer Peter Eisentraut（EDB）：8–10 个重要特性回退到 v20，两个桶——一些有「重大架构缺陷」（Tom Lane 在发布前就警告过 SQL/PGQ 图查询特性），另一些是 AI 找出的长尾边界情况，「以前会变成发布后五年间的补丁」。他明确否认是 vibe-coding 所致——这些特性早于本轮中期的评审工具跃升。第一个*因为评审工具在中途长过了自己的特性*而推迟发布的大型 OSS 项目；「下个周期会自愈」只在评审能力停止进步时成立。 **（2）Gentoo 对 Chromium 执行「last rites」**（Sam James 9-24 mask；LWN 撰文）：stable ebuild（151.0.7922.169）背着 **602 个已知漏洞**；维护者 Matt Jolly 估计**仅编译每周就 >6 小时**（快机 3.5 小时、笔记本 15–16 小时），大约每两周一个主要分支、每周 bump——他 2023 年接手后节奏已两次缩短——再加新添的 Rust/Go 依赖与不可靠的上游 tarball CI。恢复条件：**至少三名**掌握 C、C++、Go、JavaScript、Rust 的维护者。同一篇文章里的对照：Firefox 的 Gentoo 维护者两周约 20 小时就够了，因为 **Mozilla 愿意与下游打包者合作**——维护是一种关系，不只是一次构建。 **（3）vlt 的「Thank you, Deno」**补全了 10-10 收购的范围：**Deno 运行时本身将在一年内谢幕**；JSR 注册表在 Cloudflare 基础设施上继续；团队使命是把 Deno 的 **celld** 引擎并进 workerd——Cloudflare 买下的是注册表与引擎，不是运行时。文章论点：Deno 从未达到生产关键规模（「2026 年的 Node 与 2018 年一样统治」）却供给了几乎每个现代 Node 特性背后的紧迫感；两个独立 JS 运行时现在都住在大公司里（Bun 在 Anthropic、Deno 在 Cloudflare）；社区 fork 会不会出现是开放题。 **（4）更小的：** N100 自托管清单（28 个服务——17 个原生二进制、11 个跑在 Podman——装在 €180 的 Beelink 上，内存约 7.5 GB；内容是拒绝清单：不用 Docker、不用 *arr、不自托管邮件；同款现价 **€359**，DRAM 税落到入门级）；**sill**（Apache-2.0：任意 Mac 窗口经 ScreenCaptureKit + 硬件 HEVC VideoToolbox 直达 iPhone/iPad，输入经 TLS 1.3 回传，无账号无服务器——是远程*使用*、不是投屏）；**JPEG XL 对 AVIF 的同 SSIMULACRA2 实测**（Jake Archibald：照片 AVIF 赢（JXL 大 15–25%）、截图（30–90%）、透明通道（最高 70%）、解码快 2–3×；**jixel 0.4.2** 体积通常胜过 libjxl，而 libjxl 最高 effort 慢约 18× 收益近零；JXL 保住无损（比 WebP 小 9–17%）、无损 JPEG→JXL 转码（省 9–20%）与近乎免费的高 effort 渐进渲染；第二个独立编码器对格式数字的推动超过多年呐喊）；**「I Love Software Rendering」**（Quake 在 Dell OptiPlex 380 上 800×600 锁 60 fps——DEsk 之后的第二篇美学反扑：早期计算的「局限」本是设计语言）；**Folders**（Daniel Temkin 的无文字 esolang——程序即纯有序树，HelloWorld = 209 个目录 0 个文件；文件系统本就是 agent 的原生接口，所以它几乎能被 agent 无辅助写出）。

Sources: [The Register](https://www.theregister.com/databases/2026/10/16/postgres-19-delayed-after-ai-reviewers-find-more-bugs-than-humans-can-fix/5303471) · [Eisentraut: The reverts will continue until morale improves](http://peter.eisentraut.org/blog/2026/10/09/the-reverts-will-continue-until-morale-improves) · [HN](https://news.ycombinator.com/item?id=50119991) · [LWN: Gentoo Chromium 的 last rites](https://lwn.net/Articles/1097760/) · [vlt: Thank you, Deno](https://www.vlt.io/blog/competition-keeps-javascript-moving) · [viceconsole.fyi: What I self-host](https://viceconsole.fyi/blog/2026/10/10/what-i-self-host/) · [Saffsanity/sill](https://github.com/Saffsanity/sill) · [Jake Archibald: JPEG XL vs AVIF](https://jakearchibald.com/2026/jpeg-xl-vs-avif/) · [I Love Software Rendering](https://www.jamesfmackenzie.com/2026/10/13/i-love-software-rendering/) · [Folders](https://danieltemkin.com/esolangs/folders)

**10-17 12:24（学习批次）——C++26 标准化 `<debugging>`：`std::breakpoint()` 们退役掉每个手写 trap 宏。** 提案 **P2546R5 + P2810R4**，归于 Rene Ferdinand Rivera Morell（Sándor Dargó 的走读，HN 79 分）——这个头文件把 Boost.Test、Catch2、Dear ImGui 各自手写的东西（`debugger_break()`、Catch2 宏、`IM_DEBUG_BREAK()`）标准化。三个函数，全部 `noexcept` 且 freestanding，无一 `constexpr`：**`std::breakpoint()`**（无条件停——x86 上通常一条 `int3`）、**`std::is_debugger_present()`**（*每次*调用都检查、永不缓存，因为调试器随意挂接脱离；Windows 走 `IsDebuggerPresent()`，libstdc++ 读 `/proc/self/status` 的 `TracerPid`）、以及便利包装 **`std::breakpoint_if_debugging()`**。安静但重要的部分（P2810R4）：`is_debugger_present()` 如同 `operator new` **可替换**，裸机与 freestanding 平台可提供自己的检测。帖内警示：无调试器挂接时 `breakpoint()` 是实现定义的——通常是一条终止进程的 `SIGTRAP`（除非被捕获）。它退役掉每个严肃项目保留平台特定汇编的最后几处之一——C++26 contracts 时刻（GCC 16）从开发循环的另一端到来：先前是入口条件，现在是断点。

Sources: [C++26: The New Debugging Header](https://www.sandordargo.com/blog/2026/09/30/cpp26-debugging) · [HN](https://news.ycombinator.com/item?id=50122736)
