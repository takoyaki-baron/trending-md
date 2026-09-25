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
