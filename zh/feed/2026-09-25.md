---
date: 2026-09-25
updated: 2026-09-25T12:15:00+08:00
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 27
license: CC-BY-4.0
---

## 1. F-Droid 2.0：十年来最大的一次更新，重建开源应用商店

- **Velocity:** ▮▮▮ trending
- **Source:** F-Droid · HN 622+ pts · 187 comments · ~9小时前 (~19:30 UTC+8)
- **Tags:** `f-droid` `android` `open-source` `release`

F-Droid 发布 2.0（9 月 24 日宣布，经 14 个测试版本后于未来数周陆续推送）——客户端十年来最大的一次更新：Kotlin/Jetpack Compose 全面重写、简化为三个区域（发现 / 搜索 / 我的应用）、类别大幅扩展，并通过索引描述与翻译内容大幅改善了中日韩搜索。旗舰功能是基于 Android 新的预批准 API 构建的统一安装器——部分得益于欧盟《数字市场法》的压力——用户可以在下载完成前确认安装，自动后台检查更新也成为默认。公告对功能回退毫不讳言：不再支持 Android 6、Privileged Extension 被忽略、恐慌触发的应用清除（Ripple）暂时缺失、计算器伪装被简化、附近分享未随首发推出。开发由 NLnet 的 Mobifree 基金和 OTF 资助；OTF Security Lab 的安全审计已完成，报告待发布。

**为什么重要：** 欧盟应用商店之争通常只讲商业商店——这次是 DMA 也在悄悄改善志愿者运营的开源商店的处境，而且更新日志诚实地列出了这次重写在无障碍功能上付出的代价。

[`🔗 F-Droid 公告`](https://f-droid.org/2026/09/24/f-droid-2.0-a-new-chapter-for-android-freedom.html) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=49831968)

---

## 2. 英国的"两档加密"：被政府挡在门外的 iCloud 用户

- **Velocity:** ▮▮▮ trending
- **Source:** MacAnorak · HN 320+ pts · 328 comments · ~11小时前 (~17:30 UTC+8)
- **Tags:** `encryption` `privacy` `uk` `policy`

一篇详细梳理 2025 年 1 月英国向 Apple 发出技术能力通知（TCN）后续影响的文章：当 Apple 宁愿为英国新用户撤下高级数据保护（ADP）也不肯开后门时，英国人被分成了两个阶层。在 2025 年 2 月撤下之前开启 ADP 的"爱丽丝"仍保有 23 类 iCloud 数据的端到端加密——因为 Apple 刻意把 ADP 设计成只有用户自己的可信设备才能关闭，服务器无法远程关掉它。而新用户"比尔"完全无法开启 ADP，只能停留在默认 14 类端到端加密的标准数据保护上。文章从 Cook 2014 年"没有后门"的表态、圣贝纳迪诺案，一路讲到现状：收窄为仅限英国的通知、Apple 2026 年 7 月向调查权力法庭提起的申诉、以及 9 月 11 日 Wyden 与 Davidson 呼吁法庭公开其保密程序的信函。作者结论：任何允许"授权访问"的机制都是可被发现和利用的机制，不公在于政府的决定，而非 Apple 的选择。

**为什么重要：** 这是"加密还是后门"对峙实际产出的最清晰例证——没有赢家，只有一个在保密中敲定的永久性两档用户体系。

[`🔗 MacAnorak`](https://macanorak.com/two-tier-encryption-in-the-uk/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=49828731)

---

## 3. 一次固件更新变砖三星智能冰箱——食物随之腐烂

- **Velocity:** ▮▮▮ trending
- **Source:** Ars Technica · HN 250+ pts · 244 comments · ~12小时前 (~16:30 UTC+8)
- **Tags:** `iot` `firmware` `samsung` `reliability`

推送到三星智能冰箱的一次 SmartThings 软件更新从 9 月 22 日下午开始变砖大量设备，主要发生在韩国——冰箱彻底停机，内部食物腐烂变质。三星将故障归因于"内部测试中的错误"，并在报告涌入韩国社区论坛后暂停了推送。HN 讨论串（244 条评论）把它变成了本周对家电联网的大讨论：冰箱是一个食品安全设备，而它的故障模式如今是"远程代码推送"；两千美元以上的家电，用户以最惨痛的方式发现更新通道是单一故障点。受影响设备的补偿和"救砖"时间表尚无下文。

**为什么重要：** 这是"本地优先家电固件"最近最有力的论据——当你的冰箱需要云端才能保持低温，厂商的每一次测试失误都会变成物理世界的损失。

[`🔗 Ars Technica`](https://arstechnica.com/gadgets/2026/09/owners-mourn-spoiled-food-after-firmware-update-bricks-samsung-smart-fridges/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=49829960)

---

## 4. GitHub 删除恶意仿冒软件——距它登上 HN 首页仅 10 分钟

- **Velocity:** ▮▮▮ trending
- **Source:** Successful Software · HN 211+ pts · 88 comments · ~7小时前 (~21:30 UTC+8)
- **Tags:** `supply-chain` `github` `malware` `trust-safety`

Andy Brice 的数据处理产品 Easy Data Transform 被 GitHub 上的一个仓库仿冒，名称和 logo 均被照搬；伪造的 Mac .dmg 在 VirusTotal 上触发了多个恶意软件警告，攻击者甚至调换了磁盘映像的背景图，告诉下载者无视恶意软件告警。Brice 于 8 月 31 日举报，只收到自动回复；9 月 10 日提交了 VirusTotal 证据；在 23 天的沉默后他发文《This is pisspoor. Do better GitHub》——帖子登上 HN 首页后约 10 分钟，该仓库即被删除（"纯属巧合，我肯定！"）。评论区有人报告自 6 月起类似的案子至今未处理。作者给用户的建议：直接从厂商官网下载软件，别指望平台主动清理仿冒品。

**为什么重要：** GitHub 上的品牌仿冒恶意软件分发是一个按"热度"而非"危害"扩展的供应链通道——而删除的 SLA 似乎是"登上 Hacker News 首页"。

[`🔗 Successful Software`](https://successfulsoftware.net/2026/09/24/github-has-not-removed-malicious-imitation-software-after-3-weeks/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=49832406)

---

## 5. CVE-2026-61732：自主红队代理里的 CVSS 10.0 提示注入 RCE

- **Velocity:** ▮▮▮ trending
- **Source:** NVD / GitHub advisories · CVSS 10.0 (GitHub CNA, NVD Secondary) · 9 月 24 日发布，1.1.17 修复
- **Tags:** `cve` `prompt-injection` `agent-security` `chatml`

BitterSecurity 的 Decepticon（红队自主攻击代理）把网页抓取结果——它自己侦察行动的输出——包装进 LLM 消息时，未中和 ChatML 特殊字面标记。在 BYOK（用户自带密钥、接入任意 OpenAI 兼容端点）模式下，多数自托管推理服务器（vLLM、SGLang、Ollama、LM Studio、text-generation-webui）默认不过滤用户内容中的特殊字面标记——这些字面量会被解析为结构性角色边界 token，于是目标网页中预埋的字符串即可伪造一条模型视为权威的"操作员"轮次，进而在代理的 Kali 沙箱内实现任意命令执行。已在 1.1.17 修复（NVD 记录引用了修复提交与 GHSA-g5f9-3xfg-p9mf）。CISA 协调的 SSVC 评估在案：利用状态"PoC"，可自动化"是"，技术影响"完全"。

**为什么重要：** 提示注入到 shell 的完整流水线首次被正式编号——这个攻击性代理的 CVE 同时是对所有"把网页内容喂给不滤特殊 token 的自托管模型"的代理工具的警告。

[`🔗 NVD 记录`](https://nvd.nist.gov/vuln/detail/CVE-2026-61732) · [`🔗 GHSA-g5f9-3xfg-p9mf`](https://github.com/BitterSecurity/Decepticon/security/advisories/GHSA-g5f9-3xfg-p9mf)

---

## 6. 最新的 ESP32 真的能跑 Linux 了——离树莓派越来越近

- **Velocity:** ▮▮ rising
- **Source:** XDA Developers · HN 195+ pts · 95 comments · ~8小时前 (~20:30 UTC+8)
- **Tags:** `esp32` `hardware` `linux` `riscv`

ESP32-P4 世代可以原生启动 Linux——这是该家族的第一次，此前只能以非常有限的方式模拟——靠的是双核 RISC-V 内核，Wi-Fi 6 + 蓝牙 5.4 由配套的 ESP32-C5 提供，另有 Thread/Zigbee、以太网、USB 2.0 OTG 和 32–64 MB PSRAM 配置。文章的重点在外设支持：Pi 兼容的 CSI 摄像头接口、microSD，以及已经把 P4 当 Pi 级部件使用的 ESP-KVM 等项目。HN 讨论区的公允评价是：这是微控制器迈向 SBC 的一步，而非 Pi 替代品——内存上限和 GPU 级负载仍是 Pi 的领地——但"ESP32 跑不了 Linux"的时代正式结束了。

**为什么重要：** 5 美元级 RISC-V 微控制器跨过"能启动 Linux"这条线，把联网 Linux 设备的成本下限又压低了一档。

[`🔗 XDA Developers`](https://www.xda-developers.com/newest-esp32-run-linux-close-to-raspberry-pi/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=49828969)

---

## 7. Bastardica："混血字体"铸造厂，靠 OpenType 连字在浏览器里运行

- **Velocity:** ▮▮ rising
- **Source:** Show HN · 185+ pts · 32 comments · ~14小时前 (~14:30 UTC+8)
- **Tags:** `fonts` `typography` `web` `pyodide`

一个在浏览器里制作 Times New Bastard 式"混血字体"的工具：选一个基础字体加若干混入字体，生成的字体会替换指定字形（经典示例："Th"之后全部来自 Comic Sans）。巧妙之处在交付机制——字形替换实现为对每个文字系统都注册的 `liga` 上下文替换，浏览器默认启用，因此该字体在任何做文本排版的地方都能生效，包括设计工具和打印。全部计算通过 Pyodide（WASM 中的 Python）和 fontTools 在本地完成——字体不上传服务器——可导出 TTF/OTF/WOFF2。文档写明的限制：禁用连字的应用看不到混排效果；3 种以上字体可能在共享区间上冲突（建议用质数步长）；许可说明很诚实——混合字体是所有源字体的衍生作品。

**为什么重要：** 一件令人愉悦的字体工程作品，而它真正的启示是：OpenType 上下文替换是一个被严重低估的客户端渲染原语。

[`🔗 Bastardica`](https://bastardica.mitpit.com) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=49823738)

---

## 8. Show HN：Whiteboard（YC W26）——人与代理共同设计软件的开源 IDE

- **Velocity:** ▮▮ rising
- **Source:** Show HN · 114+ pts · 35 comments · ~4小时前 (~00:30 UTC+8)
- **Tags:** `ide` `agents` `developer-tools` `yc-w26`

Whiteboard 是一个 MIT 许可的桌面 IDE，以内置 Code - OSS fork 的方式构建（作者称原版 VS Code 约 45% 是他们不需要的 Copilot 代码），让 Claude Code、Codex 等代理通过 SDK 在代码旁的画布上绘制流程图、时序图和 ER 图。图元素和代理轨迹引用可以跳转到对应代码；基于 Rust 的 AST 感知语义 diff 查看器把大段新函数渲染为伪代码并折叠测试；决策日志让代理链接自己的轨迹，使需求、实现与自主决策可回溯。README 诚实列出局限：尚不支持文件编辑、多仓库审查支持薄弱、分享后的更新不会同步。匿名遥测不包含代码、diff、提示与模型输出，且可关闭。

**为什么重要：** 代理 IDE 的前沿正从"代理改文件"转向"代理与人共享设计面板"——而这个项目连同 diff 与轨迹管道一起交付，而不只是一块画布。

[`🔗 devdotfast/whiteboard`](https://github.com/devdotfast/whiteboard) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=49833867)

---

## 9. Fearless SIMD 1.0：八年耕耘，把 `unsafe` 从 SIMD 中拿掉

- **Velocity:** ▮▮ rising
- **Source:** Linebender · HN 89+ pts · 15 comments · ~2小时前 (~02:00 UTC+8)
- **Tags:** `rust` `simd` `graphics` `release`

Linebender 的 `fearless_simd` 在稳定版 Rust 上迎来 1.0：可移植的 SIMD 抽象、通过 `#[simd]` 宏实现的函数多版本化、零开销安全访问平台 intrinsics，且没有任何临时拼凑的 `unsafe` 块——整个 crate 建立在两个经审计的原语上（使用 target feature 1.1 的 `kernel!` 宏，以及受 `bytemuck`/`zerocopy` 启发的安全 transmute 模块）。对边界情况敏感的操作同时提供跨平台一致的 "precise" 与平台最快的 "fast" 变体，并支持标准库不会覆盖的硬件原生向量宽度。团队在此过程中向 Rust 和 LLVM 上游贡献了优化；30 个 crate 直接使用，逾千个间接依赖。承诺：3 年安全更新，以及在不破坏 API 的前提下支持 `f16`、Arm SVE 与 RISC-V 向量扩展的路径。

**为什么重要：** 安全 Rust 中的 SIMD 是 C++ 与 Rust 图形/音频技术栈之间十年的鸿沟——带稳定性承诺的 1.0 正是生态等待的东西。

[`🔗 Linebender 博客`](https://linebender.org/blog/fearless-simd-1-0/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=49800085)

---

## 10. "薛定谔的代码仓库"：SWE-bench 代理依赖的是背下来的仓库

- **Velocity:** ▮▮ rising
- **Source:** arXiv / Hugging Face 每日论文 · ~70 upvotes，今日趋势第一
- **Tags:** `benchmark` `swe-bench` `memorization` `evaluation`

上海交通大学论文（arXiv:2609.27891）追问：编码代理到底是学会了 SWE-bench，还是背下了它。SchrodingerRepo 把每个测试仓库视为评估时才实例化的潜变量，施加四种渐进式且保行为的变换：问题陈述重构、命名空间重映射、文件内布局重排、保持功能的代码重写——在可执行行为完全一致的前提下剥掉可识别线索。在 SWE-bench Verified 与 SWE-QA 上跨模型的结果：移除仓库线索一致地降低性能并大幅增加交互成本，成本集中在仓库探索与定位环节。摘要保持定性表述——没有宣称某个夸张的百分比降幅——作者的结论措辞谨慎：代理"部分依赖记忆中的仓库侧线索"。

**为什么重要：** 针对 SWE-bench 的记忆化批评如今有了干净的因果方法——而克制的表述（没有夸大的单一数字）让它更难被驳回。

[`🔗 arXiv:2609.27891`](https://arxiv.org/abs/2609.27891) · [`🔗 Hugging Face 每日论文`](https://huggingface.co/papers)

---

## 11. WaveDigger：查询 Apple 未公开 Wi-Fi 定位服务的 Web 界面

- **Velocity:** ▮ steady
- **Source:** Show HN · 67+ pts · 10 comments · ~28小时前 (~00:30 UTC+8)
- **Tags:** `wifi` `geolocation` `privacy` `nextjs`

WaveDigger 通过直接向 Apple 未公开的 WPS 端点（`gs-loc.apple.com/clls/wloc`）发送 protobuf 编码请求（含中国区域端点变体），在交互地图上按 BSSID 定位 Wi-Fi 接入点、按网络参数定位 LTE/5G NR 基站——其实现建立在 apple-corelocation-experiments 项目的逆向工程成果之上（protobuf 定义、坐标编码、请求所需的字节前缀）。技术栈为 TypeScript/Next.js 15 + deck.gl，AGPL-3.0 许可——考虑到该工具暴露的能力，AGPL 的网络服务条款格外切题。真正的故事是隐私含义：Apple 的众包定位数据库实际上是一台公开的 BSSID 搜索引擎，任何实现了该协议的人都能查询。

**为什么重要：** Google 的 WPS 作为地理定位预言机早已广为人知；一个精致、可自托管的 Apple 等价物，让"MAC 地址 → 物理位置"离任何攻击者只差一次 fork。

[`🔗 christianrowlands/wavedigger`](https://github.com/christianrowlands/wavedigger) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=49815370)

---

## 12. 当调试器说谎：J-Link 的内存缓存撞上 DMA 式外设

- **Velocity:** ▮ steady
- **Source:** Daniel Mangum · HN 61+ pts · 17 comments · ~30小时前 (~22:30 UTC+8)
- **Tags:** `embedded` `debugging` `jlink` `hardware`

Mangum 通过 SEGGER J-Link 调试器向 Nordic nRF54L15 的密钥管理单元（KMU）写入密钥时，发现读回的一直是旧值——即使擦除整颗芯片，内存里也只出现第一次推送。根因：KMU 在 CPU 挂起时独立写 RAM（类似 DMA），而 JLinkGDBServer 的内存缓存（`SetEnableMemCache`，默认开启）永远不会失效，因为核心从不前进。直接通过 AHB-AP 访问端口发起 `ReadMemAP` 请求可绕过缓存读到新数据；用 `monitor exec SetEnableMemCache = 0` 关闭缓存或单步执行核心即可修复。他对"为何很少人踩坑"的诊断：只有当外设能在核心挂起时改写内存时缓存问题才会显现——而这恰恰是 MCU 安全工作不断制造的配置。

**为什么重要：** 一个可迁移的调试法则：凡是绕过 CPU 背后写内存的硬件，都会击败任何经由 CPU 视角做缓存的调试器。

[`🔗 When the Debugger Lies`](https://danielmangum.com/posts/when-the-debugger-lies/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=49799306)

---

## 13. FxEmbed 以 +165 星/天重新 trends：X 与 Bluesky 的链接预览修复器

- **Velocity:** ▮ steady
- **Source:** GitHub Trending (daily) · 5.3k★ · +165 今日
- **Tags:** `embed` `bluesky` `twitter` `cloudflare-workers`

FxEmbed——FxTwitter、Fixupx 与 FxBluesky 的所在地——修复 X 和 Bluesky 帖子在 Discord、Telegram 等客户端中损坏的链接预览：真实的视频、多图、投票、引用帖和翻译，只需使用前缀域名（`fxtwitter.com`、`fixupx.com`、`fx` + `bsky.app`）。TypeScript 编写、跑在 Cloudflare Worker 上，并提供 Docker 自托管路径；MIT 许可，4,207 次提交，CI 活跃。此次重回趋势榜，搭上的是 X 自家 embed 支持持续退化的便车——客户端 embed 每退化一次，就有一波新用户涌向前缀域名。仓库注明与 X Corp 无关联——而后者一直在收紧对可嵌入数据的第三方访问。

**为什么重要：** 社区基础设施在悄悄补上平台放弃的活——并且自带"托管实例消失即可自托管"的逃生舱。

[`🔗 FxEmbed/FxEmbed`](https://github.com/FxEmbed/FxEmbed) · [`🔗 GitHub 每日趋势`](https://github.com/trending)

---

## 14. 基于 Web 的 IBM 1620 模拟器——为 1963 年的十进制计算机做软件抢救

- **Velocity:** ▮ steady
- **Source:** Show HN · 42+ pts · 11 comments · ~34小时前 (~18:30 UTC+8)
- **Tags:** `emulation` `retrocomputing` `ibm` `web`

pkimpel/retro-1620 在浏览器中模拟 IBM 1620 Model 2——一台 1960 年代的晶体管、**十进制**、可变字段长度机器，没有软件可访问的寄存器，指令长 12 位——并配有完整的操作环境（SPS 汇编与 FORTRAN II 时代、Monitor 批处理系统、读卡/穿孔机、1443 行式打印机、1311 磁盘机）。Model 2 的内存周期为 10µs，通过内存查找表实现硬件乘法；两个型号合计仅生产约 2,000 台，支持持续到 1970 年。MIT 许可，软件抢救素材来自 bitsavers。小项目（17 星、170 次提交）——HN 帖子是一件真正可运行的计算史保存品的传播载体。

**为什么重要：** 十进制、可变字段长度架构是现代开发者从未接触过的谱系——可在浏览器中运行的模拟器是通往它最容易的一扇窗。

[`🔗 pkimpel/retro-1620`](https://github.com/pkimpel/retro-1620) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=49809935)

---

## 15. 以接近 SNFS 的时间伪造 1024 位 RSA 签名——全程无需分解密钥

- **Velocity:** ▮ steady
- **Source:** IACR ePrint · HN 30+ pts · 2 comments · ~10小时前 (~18:30 UTC+8)
- **Tags:** `cryptography` `rsa` `hsm` `research`

Laura Shea、Miro Haller、Adam Suhl、Nadia Heninger（UC San Diego）与 Emmanuel Thomé（INRIA）将 2007 年的 Joux–Naccache–Thomé 攻击在真实 HSM 上端到端实现：只要临时获得原始 RSA 签名/解密预言机的访问权，攻击者就能为任意消息伪造签名，而自始至终不必分解密钥。1024 位演示耗时五个日历月、1,380 CPU 核年、2³² 次预言机查询；预计算完成后，选定消息的签名可离线以 180 核年伪造。外推到 1024–4096 位密钥：在此攻击模型下 RSA 的实际安全强度比基于分解的标准估计低 15–30 位——连 4096 位 RSA 也可能达不到 128 位安全。适用条件写得明确且关键：这需要原始预言机访问（HSM API、盲签名服务），对"仅考虑分解"的 RSA 场景不适用；大密钥的数字是外推。作者的落点是迁移建议：这是后量子过渡期间弃用 RSA 的又一个理由。

**为什么重要：** "通过 API 伪造、绝不碰密钥"正是 HSM 支撑的 PKI 实际暴露 RSA 的方式——而安全边际的削减幅度大到足以影响长生命期签名。

[`🔗 ePrint 2026/2131`](https://eprint.iacr.org/2026/2131) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=49831098)

---

## 16. Project Suncatcher 首颗 TPU 卫星即将入轨——Google 的"太空机器学习"登月计划迎来发射窗口

- **Velocity:** ▮▮▮ trending
- **Source:** Google Research 博客 · HN 139+ pts · 254 comments · ~14小时前 (~21:53 UTC+8)
- **Tags:** `google` `space` `ml-infrastructure` `tpu`

Google 的 Project Suncatcher——探索可扩展 ML 算力能否部署在近地轨道的登月计划（卫星在轨道上可捕获"最高八倍于地面"的太阳能）——距离首次硬件验证只剩几天：一颗原型卫星将搭乘 SpaceX 即将执行的 Transporter-18 拼车任务升空，与 Planet 合作开发。这篇工程文章对测试内容的交代异常具体：约 10 g 的持续发射载荷（芯片局部达 50–100 g）通过了三轴振动测试；在 UC Davis Crocker 核实验室一边跑负载一边接受质子轰击的 Trillium TPU，总电离剂量扛过了五年任务的当量；而通过热管加辐射板进行的真空散热，目前仅在热真空舱中验证。2027 年的里程碑是两颗卫星测试高带宽短距激光链路。团队自己的告诫毫不客气："有些事情只能在太空里测试"，这次发射是探索性而非验证性的，而且如今的激光系统恰好为相反的场景而造（低带宽、长距离）。

**为什么重要：** 这篇文章给出了"带 TPU 的卫星"与"轨道上的数据中心"之间的真实价差——辐射和发射出乎意料地可生存，而散热与激光互连才是未经证实的承重结构。

[`🔗 Google Research 博客`](https://blog.google/innovation-and-ai/models-and-research/google-research/google-project-suncatcher-facts/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=49830606)

---

## 17. SourceHut 账户接管：CI 构建日志里的 ANSI 转义序列被渲染为活体 XSS，长达 4.5 年

- **Velocity:** ▮▮▮ trending
- **Source:** Arusekk · HN 90+ pts · 13 comments · ~8小时前 (~03:54 UTC+8)
- **Tags:** `security` `xss` `ci` `ansi2html`

Arusekk 的文章还原了 `ansi2html` 的漏洞（CVE-2026-92973）——builds.sr.ht 用它渲染 CI 日志：该库把 ANSI OSC 8 超链接序列转成 `<a>` 标签时，既没能正确处理属性逃逸，也不拦截 `javascript:` URL，攻击者由此可以植入 `onfocus=` 处理器，在任何查看该任务页面的用户会话中执行。注入甚至不需要账户——向启用了 CI 的公开邮件列表发一个补丁，或让任何远程资源被打印进日志，就够了。由于页面携带受害者的 CSRF token，而 builds.sr.ht 又持有 sr.ht 本体的部署密钥，作者将其定为账户接管且可蠕虫化传播。这个缺陷存在了约 4.5 年；builds.sr.ht 于 8 月 4 日上线了自动消毒的临时方案，真正的修复于 9 月 2 日落在 ansi2html 1.9.4。一个意味深长的注脚：作者提出的 CVSS 4.0 向量意在论证"高危或严重，而不只是中等"——而他对 VulnCheck 擅自改动向量的做法直言不讳地恼火。

**为什么重要：** 不可信文本经渲染层到达用户是最古老的 XSS 形态——而 CI 日志在几乎所有代码托管平台上都是攻击者可写入的输入。

[`🔗 blog.arusekk.pl`](https://blog.arusekk.pl/posts/srht-account-takeover/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=49835996)

---

## 18. browser-use 发布 "jev-ultrafast"：把每次页面观察都变成可索引动作空间的 Web 代理——九天 19.9k★

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub · browser-use/jev-ultrafast · 19.9k★ · 9 月 16 日创建，今日有推送
- **Tags:** `agents` `browser-automation` `jev` `system-1`

browser-use 的新仓库把 TypeSafe 的 Jev 决策模型与重构的代理循环结合：每次页面观察变成一张编号元素表，一次 Jev 请求同时选出操作（CLICK / TYPE_TEXT / SELECT / SCROLL / WAIT / DONE / BLOCKED）和目标——目标头只包含兼容元素，因此两个决策只需一次网络往返。只有当选中 `TYPE_TEXT` 时才由小型辅助模型生成文本（录制演示使用关闭推理的 `inception/mercury-2.5`）。仓库自带的测量数据异常诚实：旗舰 Google Flights 演示验证通过耗时 7.073 秒；六轮对照运行的对比显示中位耗时 9.45 秒 → 7.09 秒（降低 25%，浏览器协议调用 1,092 → 101）——但 README 自己写明"三组对照不足以支撑强统计结论（双侧符号检验 p = 0.25）"，且这是"小型受控输入对比，不是广义代理基准"。MIT 许可，附 Browser Use Cloud 候补名单。

**为什么重要：** "System-1 决策模型"模式（每次往返一个打分选择，仅在需要时生成文本）正在成为真实的代理运行时架构——而这个仓库把自己的弱统计数据和头条数字并排发布，这比速度本身更稀有。

[`🔗 browser-use/jev-ultrafast`](https://github.com/browser-use/jev-ultrafast) · [`🔗 性能测量`](https://github.com/browser-use/jev-ultrafast/blob/main/docs/performance.md)

---

## 19. GitLab 的艰难一夜：GitLab.com 宕机 2.5 小时，同日的补丁版本修复两个 CVSS 9.9 RCE

- **Velocity:** ▮▮ rising
- **Source:** status.gitlab.com · HN 58+ pts · 28 comments · ~5小时前 (~07:10 UTC+8)
- **Tags:** `gitlab` `outage` `security-release` `cve`

GitLab.com 于 9 月 24 日 23:02 UTC 开始大面积返回 503，波及网站、API、Git 操作、两个 Registry、Pages、CI/CD Runner 和 SAML SSO；25 分钟后定位原因，至 9 月 25 日 03:36 UTC 全部 23 个组件恢复运营——约 2.5 小时的中断，目前处于监控状态。同日，GitLab 的补丁版本（19.2.7 / 19.3.3 / 19.4.1）修复了两个 CVSS 9.9 的认证后远程代码执行漏洞，均位于 CI/CD 配置解析：一个双重释放（CVE-2026-89078）、一个整数溢出（CVE-2026-93577），都由特制正则触发，都经 HackerOne 报告，都由 GitLab 以 CNA 身份评分。机制上两者无关——但今晚忙着打补丁的自托管管理员，和盯着 503 的 SaaS 用户，收到了关于他们代码托管平台的同一条信息。

**为什么重要：** 任意认证用户都能通过 CI 配置触发的两个 CVSS 9.9 属于"立即升级"级别——而宕机恰好保证了这个发布会被认真阅读。

[`🔗 NVD：CVE-2026-89078`](https://nvd.nist.gov/vuln/detail/CVE-2026-89078) · [`🔗 NVD：CVE-2026-93577`](https://nvd.nist.gov/vuln/detail/CVE-2026-93577) · [`🔗 GitLab 状态页`](https://status.gitlab.com/)

---

## 20. 日本二手书店销量暴涨 5 倍——背后是按"吨"收购、疑似运往海外 AI 扫描销毁设施的买家

- **Velocity:** ▮▮ rising
- **Source:** Tom's Hardware · HN 77+ pts · 122 comments · ~13小时前 (~22:51 UTC+8)
- **Tags:** `ai-training-data` `publishing` `copyright` `japan`

Tom's Hardware 报道了训练数据竞赛的一个惊人副作用：日本二手书店销量约为平日的 5 倍，买家不是读者，而是身份不明的按"吨"收购者——其中包括一批发往美国的 50 吨订单，疑似最终进入先扫描书籍用于 AI 训练、再将其销毁的设施。AI 用途仍是怀疑而非证实，报道也将买家描述为匿名；有据可查的是采购的规模与模式，以及日本社会对印刷品被当作数据集原料物理消耗的文化忧虑。HN 讨论区立刻把它与"AI for research"倡导者反复提及的档案获取瓶颈联系起来：最值得被训练的手稿恰恰是没人数字化的那些——而这条流水线一步完成"数字化加销毁"。

**为什么重要：** 实体书籍正在成为"抓取"目标——而这个"抓取器"是一台碎纸机——一个数据获取故事同时也是文化遗产保护故事。

[`🔗 Tom's Hardware`](https://www.tomshardware.com/tech-industry/artificial-intelligence/japanese-used-bookstores-see-5x-sales-surge-as-books-are-being-bought-by-the-ton-one-50-ton-order-sent-to-the-us-for-ai-scanning-and-destruction-multitude-of-suspicious-bulk-buys-thought-to-end-up-in-foreign-ai-scan-and-shred-facilities) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=49831456)

---

## 21. "AI 实验室该资助历史研究了"：一位历史学家让前沿模型跑遍 17 世纪档案——并写下哪里会翻车

- **Velocity:** ▮▮ rising
- **Source:** Res Obscura（Benjamin Breen）· HN 97+ pts · 14 comments · ~9小时前 (~03:14 UTC+8)
- **Tags:** `llm` `digital-humanities` `research` `history`

历史学家 Benjamin Breen 的文章主张前沿模型已在档案研究上跨过门槛，并附上实据：一个 Opus 代理从 Samuel Hartlib 的数字化档案下载了 5,000 多个文件，并派出子代理搜索 Google Books；GPT-6 Astra 得出 John Dee 的《Liber Loagaeth》大部分是无意义音节而非密码——并通过字符频率分析显示 Edward Kelley 随时间推移越写越敷衍，且与 Dee 的日记交叉验证；还有一个可能全新的发现：Newton 与 Hartlib 对同一种物质（匈牙利矾）使用了**不同**的变位词，且数量吻合。Breen 同时把账算得诚实：Opus 部分破译的查理五世密信早已被破译（一封在 1530 年代，一封在 1916 年）——模型跳过了"文献检索"这一步；Newton 发现只是"看起来"新；真正的瓶颈是绝大多数近代早期手稿尚未数字化。他提出三项建议：数字化并开放档案、给历史学家免费算力、由历史学家提名可解的"千禧年问题"。

**为什么重要：** 一线研究者对"LLM 代理在哪里真正为档案研究增值、又在哪里栽在已被解决的问题上"的克制记录——后者是厂商演示永远不会提的部分。

[`🔗 Res Obscura`](https://resobscura.substack.com/p/ai-labs-need-to-start-funding-historical) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=49835531)

---

## 22. "Dynamic Abliteration"：冻结权重下的运行时拒绝抑制——一个清楚自己是什么的 PoC

- **Velocity:** ▮▮ rising
- **Source:** Madhukar Anand（Solvy Tech 博客）· HN 105+ pts · 40 comments · ~13小时前 (~22:33 UTC+8)
- **Tags:** `alignment` `llm` `steering` `open-weights`

不同于会永久修改权重的传统 abliteration，这篇文章在推理时干预拒绝行为：PyTorch forward hook 在 Qwen3-4B 的第 12–20 层拦截残差流，注入 `门控 × 投影(n-gram 记忆)`，其中受 Engram 启发的模块——动态 sigmoid 门控、O(1) 的四表 n-gram 哈希、可学习的逐层投影——只在出现拒绝触发时激活。训练只用 2,000 条 PKU-SafeRLHF 样本，在单张 A100 上耗时 8.92 分钟，基础权重全程冻结。文章坦陈了动机性失败：alpha 1.2 的单层 steering 依然产出拒绝，因为下游层会重建该行为。而它没有评估的是：任何滥用风险——作者明确表示被 steering 的模型会服从有害请求，整体定位为单一模型上的概念验证，并注明代码由 AI 生成。

**为什么重要：** 冻结权重的运行时 steering 是一项常被当作"破坏"来讨论的技术的可部署版本——而文章对统计与安全限度的坦诚，让它成为可用的参考点。

[`🔗 Solvy Tech 博客`](https://blog.madhukaraphatak.in/non-destructive-refusal-supression-using-engram) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=49831201)

---

## 23. 华沙附近 Starlink 地面站起火，被定性为针对关键基础设施的疑似纵火

- **Velocity:** ▮▮ rising
- **Source:** Notes from Poland · HN 167+ pts · 172 comments · ~18小时前 (~17:52 UTC+8)
- **Tags:** `starlink` `infrastructure` `sabotage` `poland`

周三晚 9 点前后，华沙以南 Wola Krobowska 的一座地面站起火——该设施由波兰国营电信 Exatel 所有，据数字事务部长 Krzysztof Gawkowski 称"为波兰全境提供互联网传输，也通往乌克兰"，与立陶宛的一座站点共同服务中东欧地区。警方与国内安全局（ABW）因涉嫌蓄意点火而介入；Gawkowski 称这是"一场意图冲击关键电信基础设施的纵火袭击"，"作案手法显然是俄式的"——但其他官员保持审慎：安全部门发言人 Jacek Dobrzyński 表示"现在谈原因或动机为时尚早"。归因上的克制是这篇文章诚实的部分；而战略事实并不含糊：Starlink 在战区的地面基础设施正在遭到物理攻击，乌克兰的连接经由波兰的建筑中转。

**为什么重要：** 卫星互联网对地面站的依赖，正不断把"太空基础设施"变回普通的、可燃烧的、政治上可读的地产。

[`🔗 Notes from Poland`](https://notesfrompoland.com/2026/09/24/starlink-ground-station-in-poland-hit-by-fire-in-suspected-arson-attack/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=49828409)

---

## 24. mammoth.js：.docx 样式中的原型污染可串联出本地文件泄露——1.12.2 已修复

- **Velocity:** ▮▮ rising
- **Source:** NVD · CVE-2026-97151 · CVSS 8.4 (CVSS 4.0, MITRE CNA) · 9 月 24 日发布
- **Tags:** `cve` `prototype-pollution` `nodejs` `docx`

被广泛使用的 docx→HTML 转换器 mammoth，在读取特制文档中的样式定义时允许向 `Object.prototype` 写入任意属性。更锐利的是利用链：在 1.11.0 至 1.12.1 中，在同一进程内连续转换多份文档并把转换后 HTML 返回给提交方的应用，可被攻击者污染出 `externalFileAccess: true`，进而向文档提交者泄露服务器本地文件。已在 1.12.2 修复（NVD 引用了两个提交）。受影响的形态——服务器把用户上传的文档转成 HTML 再回传——是互联网上最常见的文档处理模式之一，而原型污染恰是能在框架级消毒之下存活的那类 bug，因为它发生在模板层之下。

**为什么重要：** "顺手转一下 docx"是各地文档流水线的承重基础设施——这是本月第二次提醒：转换环节是攻击面，不是工具函数。

[`🔗 NVD 记录`](https://nvd.nist.gov/vuln/detail/CVE-2026-97151) · [`🔗 mwilliamson/mammoth.js`](https://github.com/mwilliamson/mammoth.js)

---

## 25. SigNoz：空的默认 JWT 密钥让任何人伪造管理员会话——含不可撤销的 30 天刷新令牌

- **Velocity:** ▮ rising
- **Source:** NVD / VulnCheck · CVE-2026-97055 · CVSS 9.2 (CVSS 4.0, VulnCheck) / 8.1 (v3.1) · 9 月 24 日发布，v0.143.0 修复
- **Tags:** `cve` `signoz` `jwt` `observability`

开源可观测平台 SigNoz 出厂时，JWT 签名密钥（`SIGNOZ_TOKENIZER_JWT_SECRET`）默认为空字符串——而 `Config.Validate()` 不会拒绝空值，于是未配置密钥的部署在用空 HMAC 密钥签署和校验会话 token。由于 JWT provider 曾是默认选项，所有此类部署都暴露在外：只要知道某个已有用户的 ID（可从 `/api/v2/sessions/context` 未认证获取，连组织 ID 一起），未认证攻击者即可为该用户——包括管理员——伪造有效 token。在 `/api/v2/sessions/rotate` 兑换的伪造刷新令牌无法撤销，默认有效期 30 天。v0.143.0 在选用 jwt provider 时强制要求密钥，并把默认切换为 opaque token。可观测平台是这类 bug 最糟糕的宿主：它保存着整个技术栈吐出的每一条日志、追踪与指标。

**为什么重要：** "空默认凭据"类 bug 持续落在可自托管的基础设施上——而一个能换来 30 天不可撤销会话的伪造原语，会把可观测工具变成持久化访问。

[`🔗 NVD 记录`](https://nvd.nist.gov/vuln/detail/CVE-2026-97055) · [`🔗 修复提交`](https://github.com/SigNoz/signoz/commit/67895d366d)

---

## 26. m3e-canvas：在浏览器里画 Material 3 Expressive 界面，再以提示词交给编码代理——8.2k★、Trendshift 当日第一

- **Velocity:** ▮ rising
- **Source:** GitHub Trending · lnkiai/m3e-canvas · 8.2k★ · Trendshift 当日第一
- **Tags:** `material-design` `design-tools` `generative-ui` `vibe-coding`

m3e-canvas 是一个完全在浏览器中运行的 Material 3 Expressive 界面拖拽编辑器（Next.js 静态导出、React 19，全部存于 localStorage、无后端）：支持带点击/滑动转场的多屏手机与桌面流程、M3E 四个维度（色彩、形状、字体、动效）的主题化、磁吸连线。真正的设计决策在于：它刻意不生成代码——而是输出自然语言提示词（日语、英语、中文或韩语，目标为 Android 或 Web），由你粘贴进 Claude Code、Codex、Gemini CLI 或 Cursor。可选的 AI 助手使用你自己的 API key，直连提供商。文档写明的限制：移动端编辑仅支持单屏和按钮，分享链接与 AI 起草功能仍为 beta。

**为什么重要：** 从设计到代理的交接正在定型为提示词而非代码——画布负责意图，编码代理负责实现。

[`🔗 lnkiai/m3e-canvas`](https://github.com/lnkiai/m3e-canvas) · [`🔗 在线演示`](https://lnkiai.github.io/m3e-canvas/)

---

## 27. Compositor：免费开源的"Mac 版 Photoshop 替代品"三天连发三个版本

- **Velocity:** ▮ rising
- **Source:** GitHub · robbietilton/Compositor · 5.4k★ · 9 月 23–24 日发布 v1.2.9–v1.2.11
- **Tags:** `macos` `image-editing` `open-source` `native-apps`

Compositor 是一款原生 macOS 图像编辑器（MIT，要求 macOS 26.5+），为合成与后期处理而生：GPU 渲染图层特效的图层系统、剪贴蒙版、调整图层、Photoshop 全套混合模式、非破坏性变换、修图工具（污点修复、仿制图章、内容感知填充）、Camera Raw 滤镜，以及支持 Photoshop 快捷键重映射的 PSD/PSB 导入。作者自述动机：Photoshop 的价格，以及 GIMP 打乱了他合成工作的流程。发布节奏——三天内三个签名、公证的 DMG 版本——与功能清单同等重要。README 对导入保真度很诚实：PSD/PSB 仅支持 8 位 RGB（明确不支持 CMYK），矢量与竖排文字导入即栅格化，只有文件夹、蒙版、混合模式和简单横排文字保持可编辑。

**为什么重要：** 一个可信的原生 Photoshop 形态编辑器是开源创意软件栈最后的大缺口——PSD 往返的这些限制，恰恰将决定它能否转化在职专业人士。

[`🔗 robbietilton/Compositor`](https://github.com/robbietilton/Compositor) · [`🔗 发布页`](https://github.com/robbietilton/Compositor/releases)

---

## 28. Search：一款约 3 MB 的 macOS WebKit 浏览器——没有工具栏、没有账户、没有遥测

- **Velocity:** ▮ steady
- **Source:** Show HN · 62+ pts · 24 comments · ~19小时前 (~17:11 UTC+8)
- **Tags:** `browser` `macos` `webkit` `minimalism`

Office Commun 的 Search（MIT，约 12,700 行 Swift，零第三方依赖）是一款刻意极简、基于 macOS 系统 WebKit 的浏览器：一个地址/搜索栏、标签页，仅此而已——没有工具栏、起始页、侧栏、账户或同步。工程含量高于概念本身：通过 `WKContentRuleList` 实现请求发出前即生效的网络级广告拦截、惰性标签恢复（重新打开的标签在被点击前零开销）、按站点持久化的元素隐藏、独立 Cookie 罐的隐私标签，以及经 WebKit 自带扩展引擎加 API shim 实现的 Chrome 扩展支持。密码保存在 macOS 钥匙串，支持从 Chrome、Arc、Brave、Edge 一键导入。除页面加载外，唯一的对外请求是每日一次的更新检查。

**为什么重要：** 当浏览器不断堆叠代理、工作区和 AI 侧栏，一款原生做好 2010 年核心功能集的 3 MB 浏览器，是对"现代浏览器里有多少其实是可选项"的有力陈述。

[`🔗 driceroland/Search`](https://github.com/driceroland/Search) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=49828120)

---

## 29. Best LLM for every budget：每日刷新的价格/智能前沿图，对自己的局限毫不讳言

- **Velocity:** ▮ steady
- **Source:** Show HN · 167+ pts · 105 comments · ~14小时前 (~22:09 UTC+8)
- **Tags:** `llm` `benchmarks` `pricing` `data-visualization`

terryds/bestvaluemodel 把 Artificial Analysis 智能指数中的每个模型与其混合 API 价格（3:1 输入输出比，按每百万 token）画在对数坐标图上，由 GitHub Actions 定时任务每日刷新，并在相邻快照间给出"发生了什么变化"的差异。核心对象是"价值前沿"：即"没有更便宜者同时更聪明"的模型——计算方式是保留每个得分高于一切更便宜者的模型，每个模型只保留一行（仅最佳 effort 变体），并设最低分过滤以防超便宜的低智模型拉偏前沿线。方法论页面写明自身局限：缓存输入折扣、批量定价和快速模式均被排除，且指数在版本之间会重定基线，因此分数只能在同一快照内比较。

**为什么重要：** 多数 LLM 排行榜回答"哪个最强"；这个回答人们真正预算面对的问题——并且展示前沿的计算过程，而不是一个排名氛围。

[`🔗 bestmodelforyourbudget`](https://bestmodelforyourbudget.terrydjony.com/) · [`🔗 terryds/bestvaluemodel`](https://github.com/terryds/bestvaluemodel)

---

## Metadata

| 字段 | 值 |
|-------|-------|
| Generated | 2026-09-25T12:15:00+08:00 |
| Items | 29 |
| Sources tracked | 27 (Hacker News, GitHub Trending, GitHub repos/advisories, F-Droid, MacAnorak, Ars Technica, Successful Software, NVD, XDA Developers, Bastardica, Linebender, arXiv, Hugging Face, IACR ePrint, danielmangum.com, Google Research, blog.arusekk.pl, status.gitlab.com, Tom's Hardware, Res Obscura, Solvy Tech blog, Notes from Poland, bestmodelforyourbudget.terrydjony.com) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (每日 3 次) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[前一天](../archive/2026-09-24.md) · [Raw .md](./2026-09-25.md) · [归档](../archive/index.md)
