---
date: 2026-11-05
updated: 2026-11-04T20:30:18Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 26
license: CC-BY-4.0
---

# 今日趋势 — 2026-11-05

## 1. Kimi K3.1-Pro 把 2.8T 开放权重放上 Hugging Face，用的却不是开源许可证

- **Velocity:** ▮▮▮ trending
- **来源:** Hacker News · 234 分 · 约 5 小时前（约 23:30 UTC+8）
- **标签:** `ai-models` `open-weights` `moonshot` `licensing` `moe`

Moonshot 的 `moonshotai/Kimi-K3.1-Pro` 仓库创建于 **2026-11-02T04:13:51Z**，两天后登上 Hacker News 首页。模型卡描述的是一个 **2.8T 参数**的 MoE 模型：**104B 激活**、**93 层**、**896 个专家**（每 token 选 16 个，另有 2 个共享专家）、**1,048,576 token** 上下文、401M 参数的 **MoonViT-V2** 视觉编码器、160K 词表，量化方案为「MXFP4 权重 / MXFP8 激活」并采用量化感知训练。该仓库不设门禁：**96 个 safetensors 分片**合计 **1,563,293,160,568 字节（1.56 TB）**，外加自定义的 `kimi_k3` 建模代码。我们读取时它已有 **797 次下载、388 个赞**。

模型卡的基准表在最高推理强度、temperature 1.0、top-p 0.95 下测得：Terminal-Bench 4.0 **65.7**、SWE Marathon v1.1 **51.7**、BrowseComp **92.1**、OSWorld V2.1 **79.6**、GPQA-Diamond **94.2**、HLE-Full **51.1**、ExploitBench **74.7**。它自己也写明了限制：「Elo scores and other benchmark-specific metrics are not directly comparable with accuracy or pass-rate scores」，部分评测是内部或带工具的，PostTrainBench 用的是 H20 而非 H100，且换了替代裁判。

许可文件才是真正要读的部分。它授予使用、修改、分发和再许可的权利，随后附加两个条件：第 2 条规定，若被许可方或其关联公司经营「模型即服务」业务且任意连续 12 个月总收入超过 **2000 万美元**，须先与 Moonshot 另行签约；第 3 条规定，若软件（或其衍生作品）被用于月活超过 **1 亿** 或月收入超过 **2000 万美元** 的商业产品，则必须在用户界面上「prominently displayed on the user interface」地标注 `"Kimi K3.1-Pro"`。第 4 条豁免内部使用，以及通过 Moonshot 官方产品或认证推理伙伴访问的情形。

**为什么重要：** 这是可下载的权重加一条「达到规模才触发」的署名条款，而不是 OSI 认可的开源许可证——所以「开放权重」字面成立，「开源」不成立，而两者在报道里经常被当成同一件事。1.56 TB 的 checkpoint 尺寸本身也决定了谁能跑得动它，这正是同一天一个从磁盘流式加载的 C 语言实现上榜的原因（第 12 条）。

> 「A dash (`—`) means that the source table does not report a score.」—— 模型卡对自己基准表的注解

[`🔗 moonshotai/Kimi-K3.1-Pro`](https://huggingface.co/moonshotai/Kimi-K3.1-Pro) · [`🔗 LICENSE`](https://huggingface.co/moonshotai/Kimi-K3.1-Pro/raw/main/LICENSE) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50366999)

---

## 2. Debian 的 apt 会以 root 身份装上攻击者的包 —— 只要一次重定向，加上它默认就会做的那次重试

- **Velocity:** ▮▮▮ trending
- **来源:** Debian Security Announce · NVD 记录 2026-11-04T16:17Z · HN 117+91 分
- **标签:** `cve` `linux` `apt` `mitm` `supply-chain`

`CVE-2026-109518` 在 CNA 记录的 `title` 字段里名为 **APT RCE via hard link reuse**。记录描述的是一个中间人攻击：攻击者「can manipulate the HTTP traffic (including a malicious mirror or proxy) between an APT client and an archive server triggered by a package install」，从而「trick the client into installing an attacker-controlled unverified package and achieve remote code execution with root privileges」。Debian 公告将发现归功于 Max Justicz，并在 trixie 的 apt **3.0.4** 中修复。

暴露条件的描述既具体又普遍：记录称该漏洞「requires the client to follow redirects and retry the download of package files. It requires the client to have a non-zero `Acquire::Retries` configuration setting; the value 3 is the default starting with Debian 12 (bookworm) and Ubuntu 22.04 LTS (Jammy Jellyfish), so older releases are unaffected in a default configuration」——也就是说，默认配置下的旧版本不受影响，而升级到现代版本的机器恰好落在攻击面里。

分数来源值得单独说，因为它决定你该引用哪个数字：CNA 是 Canonical，NVD 记录上唯一的分是 **`security@ubuntu.com` 给出的 CVSS 4.0 7.7**（`AV:N/AC:L/AT:P/PR:N/UI:P/VC:H/VI:H/VA:H`）；NVD 自己的状态是 `Received`，没有发布自己的度量。GitHub Advisory Database 的 `GHSA-jw32-37xr-xwfw` 也带同一个 7.7——但它只存在于 `cvss_severities.cvss_v4` 里，遗留的 `cvss` 对象为 null，`cvss_v3` 槽位是 `{score: 0.0, vector_string: null}`。读遗留字段会把这条记录读成「无分」，而把那个 0.0 当成分数则会读成「零分」。（Debian 的 `lists.debian.org` 公告页现在对我们的客户端返回一个 JavaScript 工作量证明挑战，因此本文的引文来自 CVE 记录，它以机器可读形式承载了同一段描述。）

**为什么重要：** 一个以 root 执行代码的供应链漏洞只拿到 7.7，是 CVSS 4.0 如何折价 `AT:P` 与 `UI:P` 最清楚的例子——攻击者必须在链路中间，**而且**必须有一次升级正在进行——而后果仍然是 root 级代码执行。又因为让漏洞可利用的正是那个重试默认值，处在风险中的反而是升级到现代发行版的那批机器，而不是久未打理的旧安装。

[`🔗 CVE-2026-109518 记录`](https://www.cve.org/CVERecord?id=CVE-2026-109518) · [`🔗 Ubuntu CVE-2026-109518`](https://ubuntu.com/security/CVE-2026-109518) · [`🔗 Debian DSA`](https://lists.debian.org/debian-security-announce/2026/msg00526.html)

---

## 3. Anthropic 的 FlashProve 用 19 MB 证明完成一次推理验证 —— 代价是直接跑一次的 70–95 倍

- **Velocity:** ▮▮▮ trending
- **来源:** anthropic.com/research · 2026-11-04 · HN 122 分
- **标签:** `ai-research` `zkproof` `inference` `anthropic` `verification`

Anthropic 开源了 **FlashProve**，一个用 zkSNARK 证明「某组权重确实产生了某段输出 token」的研究原型。服务方先对权重做承诺（commitment），再证明这段输出由该承诺的模型生成；发布物包含证明器、一个快的 C++ 验证器、一个 Lean 验证器、Lean 证明、协议规范与文档。它针对 MoE 模型，隐藏权重——但不隐藏架构。

实测运行在 **Llama 4 Maverick**（400B 参数 MoE，4-bit 权重）上：单张 H100 上证明速度约 **110 token/秒**，每个 **1,024 token** 请求产生约 **19 MB** 证明；验证在 24 线程上耗时 **17 秒**，单线程 **21 秒**。离线的承诺阶段约 **39 分钟**，有效期约 **1,600 万次请求**。证明成本约为普通 vLLM 推理 GPU 时间的 **70–95 倍**。

文章把自身限制写得很直白，而且这些限制比吞吐数字更能界定主张：「This release is a research prototype」；「The proof is about an integer model under greedy decoding」；「Our system assumes the served model uses a Mixture-of-Experts (MoE) architecture」；「The system currently proves inference over contexts of up to 1,024 tokens」；以及关于三份产物，「we do not guarantee that all three (Lean, paper, code) match each other.」侧信道「could potentially reveal information about the weights」，不在本次范围内。

**为什么重要：** 水印是让模型留下痕迹；这个方案是让服务方在不暴露权重的前提下，证明「跑的是哪一组权重」。这是另一种原语，而 70–95 倍的开销与 1,024 token 的上限，决定了它是研究玩具还是推理栈能对每个请求都负担得起的东西。

[`🔗 Anthropic：可证明推理的进展`](https://www.anthropic.com/research/provable-inference) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50368626)

---

## 4. GitHub 的 Pull Requests、Git 操作与 Issues 劣化两小时 —— 事故目前没有给出根因

- **Velocity:** ▮▮ rising
- **来源:** githubstatus.com · 事故 2026-11-04 09:49–11:50 UTC · HN 228 分
- **标签:** `github` `outage` `dev-infra`

GitHub 于 2026-11-04 **09:49 UTC** 为「Git Operations、Issues 与 Pull Requests 性能劣化」开启事故。升级很快：**09:50** 报 Actions 劣化，**09:53** 报 Pull Requests 可用性问题，**11:11** 波及 API 请求。核心服务在 **11:30** 缓解，Actions 在 **11:43** 缓解；事故于 **11:50 UTC** 解决——从头到尾 **2 小时 1 分钟**。

没有公布原因。状态页称详细的根因分析「will be shared as soon as it is available」。

**为什么重要：** 这是与 10 月 31 日那次 Actions/Pages/Webhooks 劣化（17:50–19:23 UTC）**不同**的另一起事故，两者的重叠反而有信息量：两次都出现 Actions，这与「agent 驱动的 CI 已成为该界面的主要负载」相符。在不过度解读的前提下，本文能说的只有：波及五个服务、持续两小时、未给出原因。

[`🔗 GitHub Status 事故`](https://www.githubstatus.com/incidents/smtdswd1h2w4) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50363378)

---

## 5. 腾讯 Hy4 上了 computer use，却扣下了自己 Preview 版早已发布的权重

- **Velocity:** ▮▮ rising
- **来源:** SiliconANGLE · 2026-11-04 · HN 104 分
- **标签:** `ai-models` `tencent` `open-weights` `computer-use`

腾讯于 2026-11-04 发布 **Hy4**，首次加入「computer-use capabilities」，依托「advanced visual understanding, reasoning and tool-calling」，配备 1M token 上下文，并提供 Unreal Engine、Unity、Godot 集成。可用渠道包括腾讯云 TokenHub、WorkBuddy、CodeBuddy、元宝、企业微信与 ima，第三方侧包括 OpenRouter。

两个前提决定了该怎么读它。第一，流传的参数数字——**770B 总参数、49B 激活**——是 Hy4 *Preview* 的，GA 版本没有单独公布；腾讯自己的 `hy.tencent.ai/research/hy4` 页面返回的是一份 6 KB、可见文字只有 **10 个字符** 的文档，而同站的 `.md`、`?format=md`、`?format=json` 与 `llms.txt` 探测返回的都是同一份，所以我们无法第一手读到 GA 规格。第二，提升幅度（相对 Preview，GameDev **+19.1%**、GameLogic **+9.8%**）配的是内部基线：「actual baseline numbers remain internal and weren't released」。

权重是反差最大的一点。Hy4 **Preview** 以 `tencent/Hy4-preview` 存在于 Hugging Face，创建于 **2026-08-27**，标注 **`license:apache-2.0`**，533 个赞、11,399 次下载。截至本文撰写，该组织下既没有 `tencent/Hy4`，也没有 GA 的系统卡；腾讯表示「intends to release the model weights and system cards in coming days」。

**为什么重要：** 相隔十一周的两个版本，一个 Apache-2.0 且可下载，另一个闭源、只给了一句承诺——所以任何「Hy4 是开放权重」的标题，说的都是更旧的那份产物。未公布的基线让问题加倍：一个没有分母的差值，是无法核对的数字。

[`🔗 hy.tencent.ai/research/hy4`](https://hy.tencent.ai/research/hy4) · [`🔗 tencent/Hy4-preview（Apache-2.0）`](https://huggingface.co/tencent/Hy4-preview) · [`🔗 SiliconANGLE 报道`](https://siliconangle.com/2026/11/04/tencent-releases-hy4-powerful-frontier-llm-introducing-visual-understanding-and-computer-use/)

---

## 6. Go 1.27 让 encoding/json/v2 转正 —— Unmarshal 最高快 10 倍，Marshal 原地不动

- **Velocity:** ▮▮ rising
- **来源:** go.dev/blog · 2026-11-04 · HN 95 分
- **标签:** `go` `json` `standard-library` `release`

Go 1.27 正式提供 **`encoding/json/v2`** 与 **`encoding/json/jsontext`**。`jsontext` 负责语法与流式处理；`v2` 负责语义转换、按调用传入选项，以及 `MarshalerTo`/`UnmarshalerFrom` 这类流式接口，并可用 `WithMarshalers`/`WithUnmarshalers` 针对具体类型覆盖序列化。`RawMessage` 成为 `jsontext.Value` 的别名。

行为变化才是会咬人的部分，文章逐条列出：「`v2` reports an error in the presence of invalid UTF-8」；「`v2` reports an error if a JSON object contains a duplicate name」；「`v2` marshals a nil Go slice or Go map as an empty JSON array or JSON object, respectively」；「`v2` unmarshals a JSON object into a Go struct using a case-sensitive match from the JSON member name to the Go field name」。`omitempty` 现在按「JSON 空值」判断，而 `time.Duration` 在未配置时不再有默认序列化。

性能是不对称的：「The `Marshal` performance of `v2` is roughly at parity with `v1`」——「Sometimes it is slightly faster, but other times it is slightly slower」——而 unmarshal 最高「up to 10x」，Go 1.28 还会有进一步提升。迁移是可选的：「Applications using `v1` will continue to be supported indefinitely and need not ever migrate to `v2`」，而且 `v1` 就实现在 `v2` 之上，所以新接口同样惠及既有调用方。

**为什么重要：** 重复键与非法 UTF-8 报错才是有意思的那一半。这两类输入在 `v1` 里是被默默容忍的，意味着有些服务多年来一直在接受有歧义的 JSON，直到切换时才发现——性能图表是所有人都会看的那张，语义才是会改变行为的那部分。

[`🔗 Go 博客：A new Go API for JSON`](https://go.dev/blog/jsonv2) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50369106)

---

## 7. 搜狗输入法的配置走的是明文 HTTP，于是国家级攻击者把广告位变成了 DarkVigil 的投递通道

- **Velocity:** ▮▮ rising
- **来源:** ESET WeLiveSecurity · CVE-2026-120422 发布于 2026-11-04T10:17Z
- **标签:** `cve` `malware` `espionage` `supply-chain` `eset`

ESET 公布了 **SlippyNunchucks** 的细节，称其为「a China-aligned threat actor that has been active since at least September 15th, 2023」，并披露了它对 Windows 版搜狗输入法使用的手法。`SGTool.exe` 会从搜狗官方端点**以明文 HTTP** 拉取品牌词典图标配置；当 DNS 解析被攻击者控制时，该请求会被导向 `47.239.250[.]102` 或 `47.237.122[.]175` 这两个暂存服务器，返回一份与正常配置采用相同加密方式的恶意配置。配置里的图标字段被当作文件落地路径使用：一个载荷替换 `SogouComMgr.exe`，另一个放进 BizCenterCom 的版本目录，同时还有「the legitimate and signed Adobe Licensing WF Helper, renamed to `biz_helper.exe`」以及伪装成 `libcef.dll` 的 DarkVigil。随后搜狗自身的组件加载流程会运行那个 Adobe 二进制，由它侧加载 DLL——「resulting in execution of the DarkVigil implant」。

ESET 还发现「20 request endpoints on this host that the application accesses over unencrypted HTTP rather than HTTPS」。`CVE-2026-120422` 的 NVD 记录上唯一的度量是 ESET 给出的 **CVSS 4.0 8.9**（`AV:N/AC:L/AT:P/PR:N/UI:P/VC:H/VI:H/.../V:D`），而记录状态是 **`Deferred`**——NVD 当前不分析它。

已声明的限制，以及一处原文自相矛盾：「The point at which DNS manipulation occurs remains unknown」——路由器被攻陷与运营商级劫持都只是可能，不是结论。文章列出了香港、泰国、日本、越南、阿曼与斯里兰卡的受害目标，但**没有给出任何受害数量或感染率**，所以遥测覆盖的地理范围不等于流行度。腾讯在搜狗 **16.10** 中修复：把受影响的 HTTP 请求迁到 HTTPS 并启用证书固定；ESET 于 2026-09-11 报告，腾讯于 2026-09-21 确认。修复日期在文中出现两次且彼此不一致——一处写「On October 29th, 2026, Tencent released version 16.10」，另一处写「on October 30th, 2026」。

**为什么重要：** 投递链借用的是一个贴着「品牌推广」标签的一手渠道，这意味着防线既不是特征码、也不是应用自身代码的补丁，而是把那 20 个端点搬离 HTTP。而记录处于 `Deferred` 状态，意味着只依赖 NVD 分析结果的扫描器无法从中得知这件事。

[`🔗 ESET 研究`](https://www.welivesecurity.com/en/eset-research/slippynunchucks-hijacks-sogou-input-methods-brand-promotion-mechanism-to-distribute-malware/) · [`🔗 NVD CVE-2026-120422`](https://nvd.nist.gov/vuln/detail/CVE-2026-120422)

---

## 8. Traefik 的 ForwardAuth 连接池被所有客户端共用 —— 而同一份公告同时给出 8.7 和 7.0 两个分

- **Velocity:** ▮▮ rising
- **来源:** GitHub Advisory Database · GHSA-6cm8-r9cr-2hc7 发布于 2026-11-04T18:30Z
- **标签:** `cve` `traefik` `authentication` `reverse-proxy` `ntlm`

`CVE-2026-121966` 影响 Traefik **2.x < 2.11.60** 与 **3.x < 3.7.16**。ForwardAuth 子请求——以及 3.7 里的 Ingress NGINX `auth-url` 请求——是「through an auth-server connection pool shared by all clients, exposing connection-bound NTLM or Negotiate authentication」发出的。由于 NTLM 与 Negotiate 把身份绑定在 TCP 连接上而不是某个头字段上，「an unauthenticated attacker can reuse another user's authenticated connection, receiving the victim's identity via `authResponseHeaders` to access backends as that user」。

评分才是值得讲的部分：公告把两个槽位都填了，而它们互相不一致。`cvss_v3` 是 **8.7**（`AV:N/AC:H/PR:N/UI:N/S:C/C:H/I:H/A:N`）；`cvss_v4` 是 **7.0**（`AV:N/AC:L/AT:P/PR:N/UI:N/VC:N/VI:N/VA:N/SC:H/SI:H/SA:N`）。4.0 向量说漏洞所在系统本身**完全没有**机密性、完整性或可用性影响——全部落在**后续系统**上（`SC:H/SI:H`），这对「身份被借用」而非「组件被攻破」的情形恰好贴切。3.1 向量则把影响记在漏洞系统内、改以提高复杂度。

**为什么重要：** 通过连接池发生的身份混淆，几乎躲得过你能写出来的任何测试——没有任何格式错误，没有权限提升，请求只是被贴上了别人的名字。这也是一个干净的例子，说明为什么同一个 bug 的 4.0 分可能比 3.1 低两个档位：两套框架争的不是「有没有影响」，而是「影响落在哪」。

[`🔗 GHSA-6cm8-r9cr-2hc7`](https://github.com/advisories/GHSA-6cm8-r9cr-2hc7) · [`🔗 traefik/traefik 公告`](https://github.com/traefik/traefik/security/advisories/GHSA-hrpp-p4fc-wwf8)

---

## 9. Rails 的 Active Storage 在「附件」时刻就跑 ImageMagick —— 所以一次上传就足以读到 secret_key_base

- **Velocity:** ▮▮ rising
- **来源:** rails/rails 安全公告 GHSA-f3w6-w445-fwh9 · 2026-11-04
- **标签:** `cve` `rails` `imagemagick` `file-upload` `ruby`

Rails 发布 **GHSA-f3w6-w445-fwh9**，标题为 *Possible arbitrary file write and read in Active Storage image analysis*，修复版本 **8.1.4.1** 与 **8.0.5.2**，CVE 编号 `CVE-2026-122006`。影响是：用 ImageMagick 处理附件的 Rails 应用，可能让未认证攻击者在服务器上写任意文件，并在使用 Disk 服务时读取应用进程可读的任意文件——通常包括 `secret_key_base` 与外部系统凭据，进而可能升级为远程代码执行或横向移动到那些系统。

机制在于 ImageMagick 会依据文件内容选择 coder，而某些 coder 操作的是**图片内部引用的文件**而不是图片本身。Active Storage 没有对任何 coder 做限制，而 ImageMagick 分析器在附件时刻就会运行——公告中最锋利的一句是：只要附件挂上去就够了，不需要任何 variant、preview 或 analyze 调用。Rails 同时表示，只收到过一条具体的攻击链，但「不认为它是唯一存在的一条」。

修复版本内置了一份 ImageMagick `policy.xml`，并通过 `MiniMagick.cli_env` 把其目录前插到 `MAGICK_CONFIGURE_PATH`，从而禁掉 MSL 脚本 coder、读写其他文件的 coder、抓取远端引用、所有依托 Ghostscript 的 coder 及 `gs` delegate，以及 `@filename` 间接引用。

受影响人群比「所有 Rails 应用」窄得多：只有使用 `config.active_storage.variant_processor = :mini_magick`（`load_defaults` 6.1 及更早的默认值）、ImageMagick 的策略尚未禁止这些 coder（Debian 与 Ubuntu 打包的策略就没有禁）、并且接受不可信用户上传的应用才符合条件。改用 vips 的应用不在其中。升级还有一个坑：`:mini_magick` 的应用必须同时用到 **mini_magick >= 5.1**，否则按原文会在启动时抛异常。

**为什么重要：** 修复物是一个配置文件，而不是代码改动——漏洞的实质是 Active Storage 从未设置过 ImageMagick 的策略，于是每个 MiniMagick 子进程都继承了宿主机那份宽松的策略。记录上的 **9.8** 来自 `cve@mitre.org`（`AV:N/AC:L/PR:N/UI:N`），是这条 NVD 仍处于 `Received` 的记录上唯一的度量；公告页自己写 **Critical**，并未附带自己的向量。

[`🔗 GHSA-f3w6-w445-fwh9`](https://github.com/rails/rails/security/advisories/GHSA-f3w6-w445-fwh9) · [`🔗 Rails v8.1.4.1`](https://github.com/rails/rails/releases/tag/v8.1.4.1)

---

## 10. Dory1.0-4B 把同样的 20 层跑两遍，换来 SWE-bench 上 11.5 个点

- **Velocity:** ▮▮ rising
- **来源:** arXiv 2611.03998 · 提交于 2026-11-02T21:38Z · 权重在 Hugging Face
- **标签:** `ai-research` `looped-model` `nvidia` `efficiency` `benchmarks`

NVIDIA Nemotron Labs 发布 **Dory1.0-4B**，一个 40 亿参数的「looped (latent-recurrent) language model with elastic depth: a single checkpoint serves different inference compute budgets」。架构是归一化 Transformer（nGPT）主干，交错滑窗注意力与全注意力层，分为输入块、共享循环块与输出块——「the Input and Output blocks have 8 layers each, while the Recurrent block has 20 layers」——循环块可以在**不重训、不换模型**的前提下被重复施加任意次数。

不同循环次数下的基准差值是它的论据。SWE-bench Verified 在 1 / 2 / 4 次循环下为 **50.3 → 59.5 → 61.8**；Terminal-Bench 2.1 为 **12.5 → 18.1 → 22.2**；SciCode **27.3 → 34.94 → 35.11**；τ³-bench Banking **11.6 → 12.89 → 14.69**；GDPval-AA-V2 的 Elo 为 **815 → 946 → 967**。模型卡明确说曲线是前载的：「Most of the accuracy gain from looping comes from the second loop, with smaller gains beyond that」，并建议以两次循环为默认。预训练用了 6T token，其中前约 4.5T 使用 NVFP4，随后扩展上下文到 256K，再做 SFT 与多环境 GRPO。

三个值得带着读的限定：AA 那几列是「internal estimates computed under a consistent evaluation harness」，且「may deviate from official Artificial Analysis (AA) scores」；公布的基准结果是 **BF16** checkpoint 的，不是量化导出版；serving 支持尚未落定——「Dory support in vLLM is under review」，llama.cpp 路径需要从分支自行构建。

**为什么重要：** 弹性深度把推理算力变成一个 4B 模型上的运行时旋钮，这与「训更大的模型」是两种不同的赌注——而最诚实的部分是收益会饱和：模型卡里两循环的 GPQA Diamond 是 72.41，四循环是 **72.16**。

[`🔗 arXiv 2611.03998`](https://arxiv.org/abs/2611.03998) · [`🔗 nvidia/NVIDIA-Nemotron-Labs-Dory1.0-4B-BF16`](https://huggingface.co/nvidia/NVIDIA-Nemotron-Labs-Dory1.0-4B-BF16)

---

## 11. 继我们 2026-10-30 报道 ggml-rpc 的第二个 CVE 之后，llama.cpp 发布了 v0.9.0 —— 带 NCCL 多节点张量并行

- **Velocity:** ▮▮ rising
- **来源:** GitHub release · v0.9.0 于 2026-11-04T13:08Z 发布
- **标签:** `llama-cpp` `ggml` `release` `quantization` `inference`

llama.cpp 于 2026-11-04 发布 **v0.9.0**——它是编号发布线（`v0.1.0` 到 `v0.9.0`）里的最新一个，这条线与仍在一天多次发车的 `b#####` nightly 构建标签并行存在。概述列出：**OCP FP8 E4M3** 支持（saturating 模式、新 ftype `LLAMA_FTYPE_MOSTLY_F8_E4M3`）；新的 **`flash_attn_ext_rows`** 算子，让统一 KV cache 在多序列推理下高效，并「restoring non-unified KV prefill performance」；以及取代 `_2d` 接口的批量张量拷贝 API（`ggml_backend_tensor_copy_n`/`set_n`/`get_n`），已在 Metal 与 CUDA 上实现。

模型覆盖一次扩四个方向：四个新架构（**Clover**、**Limite**、**Metis-1.6**、**Mistral Large 4**）；音频生成与转写新增 **Chatterbox TTS**、**Nemotron 3.5 Transcribe** 与预置 Pocket TTS 音色；Gemma 4 E2B/E4B 获得「major prefill optimizations」。`ggml` 升到 **v0.29.0**，真正的大能力在这里——FP8 E4M3、flash attention rows，以及**基于 NCCL 的多节点张量并行**，并在 CPU、CUDA、SYCL、Metal、Vulkan、OpenCL、Hexagon 各后端做了性能工作。

破坏性 API 变更是列出来的，不是埋起来的：`mtmd.h` 新增 `MTMD_GEN_AUDIO_TYPE_CHATTERBOX`、预置音色相关函数与 `MTMD_VIDEO_TEMPLATE_QWEN3VL`，`GET /props` 现在会上报模型的预置 TTS 音色。

**为什么重要：** 值得注意的两行是 `flash_attn_ext_rows` 与 NCCL。前者是在修这个项目自己在统一 KV cache 时引入的回归——发布说明写得很明确；后者意味着 llama.cpp 开始有了过去属于 vLLM 地盘的「多节点」故事。

[`🔗 llama.cpp v0.9.0`](https://github.com/ggml-org/llama.cpp/releases/tag/v0.9.0) · [`🔗 ggml v0.29.0`](https://github.com/ggml-org/ggml/releases)

---

## 12. kimi-k3-in-c 用 8.24 GB 内存跑起 2.78T 参数 —— 代价是每 token 26.5 秒

- **Velocity:** ▮▮ rising
- **来源:** GitHub Trending（日榜）· 10,183 星 · 最后推送 2026-10-02
- **标签:** `llm-inference` `c99` `mmap` `open-source` `edge`

`FareedKhan-dev/kimi-k3-in-c` 用可移植 C99 实现 Kimi K3 推理——「No BLAS. No framework. No GPU.」——它给出的数字是：**2.78T 参数**的模型、磁盘上 **1.56 TB** 的 checkpoint、实测 **8.24 GB** 峰值 RSS，而引擎本身只有 **176 KB**。这个 checkpoint 数字与我们第 1 条里对 Hugging Face 分片求和的结果完全对上：96 个文件，1,563,293,160,568 字节。

设计是流式加载，不是压缩。README 自己给了「内存 vs 每 token 耗时」表：8 GB 笔记本 **26.5 秒**，此时「the whole model streams off the disk on every step」；32 GB **24.2 秒**；64 GB **19.8 秒**；128 GB 以上 **5.6 秒**，此时「the model fits entirely in memory, the disk wait is gone」。它声称四个配置下输出**逐字节相同**——「only the clock changes」——也很坦白地说，可运行 demo 是在更慢的磁盘上录的，「so their clock reads a little higher」。README 里的一次实录显示平均 32.69 秒/token、8 个 token，答案正确。

项目采用 **Apache-2.0**，创建于 **2026-08-01**，最后推送 **2026-10-02**，版本 v1.1.0，`CONTRIBUTORS.md` 列出了 **20** 位外部贡献者，覆盖 macOS、Windows、NEON 移植、chat 模式与 MXFP4 内核。它与 K3.1-Pro 权重登上首页是同一天——仓库本身今天并没有变化，今天被读的原因是那次发布。

**为什么重要：** 这才是「在笔记本上跑前沿模型」的正确心智模型——它装不下，每个 token 都要从磁盘重读，内存下限大致是一个专家层加 KV cache，而不是整个模型。真正有意思的工程点是：无论你能装下多少，答案都是确定的。

[`🔗 FareedKhan-dev/kimi-k3-in-c`](https://github.com/FareedKhan-dev/kimi-k3-in-c) · [`🔗 GitHub Trending`](https://github.com/trending)

---

## 13. PR-Agent 换了组织，而它 README 的第三段是关于「前东家」的免责声明

- **Velocity:** ▮▮ rising
- **来源:** GitHub · 14,663 星 · v0.49.0（2026-10-25）· 推送于 2026-11-04T10:11Z
- **标签:** `agent-infra` `code-review` `open-source` `qodo` `governance`

`The-PR-Agent/pr-agent` 以 **14,663 星**上榜，README 开头写着：「This repository contains the open-source PR Agent Project. It is not the Qodo offering for open-source projects.」一段之后说得更准确——「PR-Agent is an open-source, AI-powered code review agent and a community-maintained legacy project of Qodo」——而 Qodo 仍然是同一个文件顶部的**金牌赞助商**，并附有「Free version of Qodo for open-source projects」的链接。

项目并没有停摆。最新发布是 **v0.49.0**（2026-10-25），2026-11-04 仍有提交（`feat: include PR identity in pushed outputs`、`fix: scope response language instructions to each command`），README 还记录了一次 **Docker Hub 命名空间迁移**：**0.34.2 及之后**的版本发布在 `pragent/pr-agent`，而「up to and including `v0.31`」的旧版本仍留在 `codiumai/pr-agent`，作为「a frozen archive — no new images are pushed there」。

**为什么重要：** 一个热门开源项目换组织，会留下三份指向三个名字的产物——GitHub slug、Docker 命名空间、npm/action 引用——而其中只有一个会重定向。README 在做重定向做不到的事：告诉读者他装的到底是两个同名产品里的哪一个。

[`🔗 The-PR-Agent/pr-agent`](https://github.com/The-PR-Agent/pr-agent) · [`🔗 v0.49.0`](https://github.com/The-PR-Agent/pr-agent/releases/tag/v0.49.0)

---

## 14. Ladybird 十月在 WPT 上超过 Safari Technology Preview —— 但它的 JavaScript JIT 只支持 x86-64 与 AArch64

- **Velocity:** ▮▮ rising
- **来源:** ladybird.org 简报 · 2026-10-31 · HN 60 分
- **标签:** `browser` `ladybird` `javascript` `webassembly` `wpt`

Ladybird 的十月更新是一堵数字墙，而诚实的那些数字最有用。在 Web Platform Tests 上它「ended the month at 2,184,722 subtests, a gain of 75,650」，并在 **10 月 26 日**「passed Safari Technology Preview on WPT」——大部分增量集中在五天里，「from about 2.12 million on October 22 to about 2.18 million on October 27」。它公布的最终排名是 Chrome **2,244,397**、Firefox **2,189,315**、Ladybird **2,184,722**、Safari Technology Preview **2,172,990**。

引擎侧的工作：样式与布局移出主线程，绘制录制放到另一条线程（于是长 JavaScript 任务期间 CSS 动画与 `:hover` 仍然继续——「As far as we know, no other browser can do this today」）；一个把热点代码编译成机器码的 JavaScript JIT；以及用 **Rust 重写的新 WebAssembly 引擎**，自带解释器与 JIT，取代了 C++ 引擎与 Cranelift。基准随之变化：Speedometer 2 从 **84 到 156**，Speedometer 3 从 **5.9 到 8.6**，Octane 提升 **4.7 倍**，Wasm CoreMark 提升 **2.5 倍**，新 Wasm 引擎在两个引擎都能跑的 JetStream 3 Wasm 工作负载上「about 7x higher」。JSLinux 现在「boots Alpine Linux to a shell in 1.8 seconds, while Chrome takes 1.5」。

限制用同样的语气写在同一份文档里。JIT 只在「On Linux and macOS … on both x86-64 and AArch64」上工作，别处没有。关于野心：「For now, we just want to go reasonably fast.」那个 7 倍**只**适用于两个引擎都能跑的工作负载。无障碍：「There's still a lot of work to do here.」而 alpha 还在前面：「Our first alpha is planned for later this year.」

**为什么重要：** 跑赢浏览器厂商自己的测试套件，是这个项目历史上第一个由外部定义、外部打分的里程碑——而简报拒绝脱离分母去引用那个 7 倍，正是基准与广告之间的区别。

[`🔗 Ladybird 十月简报`](https://ladybird.org/newsletter/2026-10-31/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50369194)

---

## 15. bitcoinjs-lib 接受了伪造的交易列表长达九年 —— 因为重复的 Merkle 节点从未被上报

- **Velocity:** ▮▮ rising
- **来源:** GitHub Advisory Database · GHSA-8vv3-6qpc-gpw6 · CVE-2026-107846
- **标签:** `cve` `bitcoin` `merkle-tree` `javascript` `consensus`

`CVE-2026-107846`：**Undetected merkle node duplication in block root computation validates a forged transaction list**。在 `bitcoinjs-lib` 里，`fastMerkleRoot`「pads odd Merkle-tree levels by hashing the final node with itself but does not report adjacent duplicate hashes」——也就是 2012 年那次重复交易漏洞的形状——于是「A peer can append duplicate transactions so a different transaction list retains the original Merkle root, block header, proof of work, and block identifier」。

受影响范围从 **2.3.0** 起，修复于 **5.2.1**、**6.1.8** 与 **7.0.2**——也就是说这个 bug 横跨了该库几乎全部发布历史。公告精确点名了入口：「The affected block-root verifier was introduced as `Block.checkMerkleRoot()` alongside `Block.calculateMerkleRoot()`, while later versions expose validation through `checkTxRoots()` and `__checkMerkleRoot`; these validation paths can accept a recomputed root without checking for mutation.」被点名的受影响消费者是「explorers, exchange indexers, or SPV clients」。

评分：`security-advisories@github.com` 给出的 **CVSS 4.0 9.3**（`AV:N/AC:L/AT:N/PR:N/UI:N/VC:L/VI:H/VA:L/SC:N/SI:H/SA:H`），是这条仍处于 `Received` 的 NVD 记录上唯一的度量。

**为什么重要：** 公告引了三个修复提交，而这一类 bug 比特币自己的历史里就有过——2012 年那次重复交易漏洞，让节点接受了一笔交易 ID 列表与 Merkle 根对不上的区块。新的地方在于受影响人群：一个被区块浏览器与 SPV 客户端使用的 JavaScript 库，同一个区块可以对两个读者意味着两件不同的事。

[`🔗 GHSA-8vv3-6qpc-gpw6`](https://github.com/bitcoinjs/bitcoinjs-lib/security/advisories/GHSA-8vv3-6qpc-gpw6) · [`🔗 NVD CVE-2026-107846`](https://nvd.nist.gov/vuln/detail/CVE-2026-107846)

---

## 16. Scenario 放出 174 个 agent skill，会在生成之前先给视频报价

- **Velocity:** ▮ steady
- **来源:** GitHub Trending（日榜）· 2,324 星 · MIT · 推送于 2026-11-04T18:02Z
- **标签:** `agent-skills` `mcp` `media-generation` `open-source` `scenario`

`scenario-labs/skills` 是一套 MIT 许可的 Agent Skills，用来「teach AI coding agents (Claude Code, Cursor, Codex, Copilot, and 70+ others) how to create production-ready content with Scenario through the Scenario MCP server」：图片、视频、音频、贴图、天空盒、3D 资产与自定义训练模型。README 与 MCP 文档都没有给出总数，所以我们自己数了 git 树：**174 个 `SKILL.md`**——其中 **167 个**在 `skills/` 下的 **82 个目录**里（**80 个**目录名为 `scenario*`，另加 `dcc/` 的 **35** 个与 `game-engines/` 的 **52** 个，这两个「expert tools」家族需要安装 ZBrush、Blender、Maya、Unreal、Unity、Godot 或 Roblox Studio，而不是用 MCP 服务器）——另外 **7 个**在 `.agents/skills/` 下，维护本仓库自己的 PR 流程。

仓库描述里的定位比「生成媒体」窄：这些技能会「pick the right model, price before spending, and keep characters and brands consistent」。技能清单支撑了这一点：一长串按供应商包装的技能——`scenario-veo`、`scenario-seedance`、`scenario-kling`、`scenario-vidu`、`scenario-wan`、`scenario-runway`、`scenario-elevenlabs`、`scenario-meshy`、`scenario-rodin`——外加 `scenario-quality-gate`、`scenario-refine-loop`、`scenario-model-comparison` 这类工作流技能。

两个运维细节值得照抄。安装可以钉死：`npx skills@1.7.4 add scenario-labs/skills#<commit> --skill <name>`——「To install a reviewed state instead, pin both the installer and the commit, taken from a release's tag.」而安装器的主题分组「cannot be selected from the command line」，因为 CLI 只按精确技能名匹配 `--skill`；这是上游未解决的 issue（`vercel-labs/skills#992`），不是本仓库的 bug。

**为什么重要：** 一个有 174 个条目、却没有逐个版本号的市场，是只有一个审查点的供应链面——这正是 README 要写明按提交钉版本的原因，也是每个 DCC 家族都在自己的 README 里记录「how it was built and how far it was verified」的原因。

[`🔗 scenario-labs/skills`](https://github.com/scenario-labs/skills) · [`🔗 Scenario MCP 文档`](https://mcp.scenario.com/docs)

---

## 17. 会话在未完成任务之间切换时，编码 agent 会丢掉 11.5 个百分点

- **Velocity:** ▮ steady
- **来源:** arXiv 2611.02017 · 提交于 2026-11-01T16:04Z
- **标签:** `ai-research` `agents` `benchmark` `coding` `evaluation`

**Switch-SWE** 测的是常规仓库级基准不测的东西：agent 在同一个仓库里先去做另一件事之后，还能不能回到半途的任务。设置是 **19 个 Python 仓库里的 200 个 focus 任务**，由 issue、PR 与 review 历史重建，并「rendered as 400 matched session specifications」——每个 focus 任务被打两次分：一次在不被打断的会话里，一次在「switched」会话里，后者「interleaves ordered stages from other unfinished tasks in the same repository, while only the final focus patch is scored」。

在 **7 个编码 agent** 上，「interleaved unfinished work produces an average focus-task resolution gap of **11.5 percentage points**, ranging from **6.0 to 15.0** percentage points」。轨迹分析把损失归因于「cross-task requirement confusion and loss of task state」。

**为什么重要：** 真正的贡献是「配对会话」这个设计——每个 agent 跑同一个 focus 任务、同一个验证器，只有是否被插入其他任务这一点不同，所以这 11.5 个点可以归因于切换本身，而不是任务难度。它同时也描述了 agent 在真实仓库里的日常工作条件，而单 issue 基准是刻意把这一条件去掉的。

[`🔗 arXiv 2611.02017`](https://arxiv.org/abs/2611.02017) · [`🔗 Hugging Face 每日论文`](https://huggingface.co/papers/2611.02017)

---

## 18. CISA 把一个 5.5 分的指针认证绕过加进了 KEV —— 距离 Apple 修好它已经 904 天

- **Velocity:** ▮ steady
- **来源:** CISA KEV 目录 2026.11.04 · 加入于 2026-11-04，截止 2026-11-18
- **标签:** `cve` `cisa-kev` `apple` `exploitation` `policy`

`CVE-2024-27834` 于 **2026-11-04** 进入「已知被利用漏洞」目录，整改截止日 **2026-11-18**。它的 NVD 记录发布于 **2024-05-14T15:13:06Z**——**904 天**之前——描述至今未变：「An attacker with arbitrary read and write capability may be able to bypass Pointer Authentication」，修复于 Safari 17.5、iOS/iPadOS 16.7.8 与 17.5、macOS Sonoma 14.5、tvOS 17.5 与 watchOS 10.5。

分数是最容易被引错的部分。NVD 记录上 `source` 为 `nvd@nist.gov` 的那条度量是 **CVSS 3.1 5.5 MEDIUM**（`AV:L/AC:L/PR:L/UI:N/S:U/C:N/I:H/A:N`——本地、仅完整性），CISA-ADP 容器给出**同样的 5.5**，另附一个 SSVC 块。记录上没有更高的第三方分数。`lastModified` 为 **2026-11-04T18:17:33Z**，CWE-287。

KEV 条目本身记录了一套已经变化的结构：它带 `forensicTriage: "No"` 与 `knownRansomwareCampaignUse: "Unknown"`，`requiredAction` 指向 **BOD 26-04「Prioritizing Security Updates Based on Risk」**，以及单独的「Forensics Triage Requirements」。在整个目录 **1,768** 条记录中，**151** 条现在引用 BOD 26-04——最早的一条加入于 **2026-06-11**——而 **340** 条仍在引用旧的 BOD 22-01。`forensicTriage` 为 `Yes` 的有 **97** 条。

**为什么重要：** KEV 收录是一个「已观察到利用」的陈述，而它并不附带分数——所以「本地提权的 5.5」与「正在被利用」可以是同一个 bug 的两个真实属性，那个 5.5 描述的是攻击者需要的权限，而不是他们拿到的东西有多值钱。904 天的间隔也正好说明：KEV 是 NVD 之外的独立信号，而不是 NVD 上的一个过滤器。

[`🔗 CISA KEV 目录`](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) · [`🔗 NVD CVE-2024-27834`](https://nvd.nist.gov/vuln/detail/CVE-2024-27834)

---

## 19. ToolSpace 用真实执行轨迹合成更难的 MCP 环境 —— 七个前沿模型最多掉 38.2 分

- **Velocity:** ▮ steady
- **来源:** arXiv 2611.05036 · 提交于 2026-11-03T15:09Z
- **标签:** `ai-research` `agents` `mcp` `benchmark` `tool-use`

**ToolSpace** 把 MCP 环境的合成顺序倒了过来。现有方法是数据中心的——先合成数据库与场景，再从中派生工具和任务——论文说这会导致接口「may not match real ones」、组合「not grounded in execution」、任务「rarely span more than one environment」。ToolSpace 改为「mines data, state, and retry dependencies from adjacent calls in execution traces of real MCP services and open agent corpora, using deterministic rules rather than LLM judgment」，把加权后的工具组合图聚类成环境，只在状态会被修改的环境里合成数据库、其余重放录制的返回值，并通过「replay successfully from the initial state」只保留能重放的链条。

在 AutomationBench 与 τ³-Bench Banking 上，「the pipeline produces harder Pro versions on which **7 frontier models drop by up to 38.2 points**」。训练侧，在七个长程工具使用基准上，它把 Qwen3.6-35B-A3B 从 **23.0** 提到 **41.0**（加 RL 为 **43.2**）。对可复现性而言最关键的设计选择是那套确定性规则：依赖图是被挖掘出来的，不是被裁判的，所以环境构建本身不是一种模型行为。

**为什么重要：** 38.2 分的跌幅是更重要的那个数字，因为它说明现有 MCP 基准测的东西，比真实服务产生的轨迹要容易。而从真实执行记录派生的更难环境，也是检验「基准是被界面熟悉度而非能力打满的」最便宜的办法。

[`🔗 arXiv 2611.05036`](https://arxiv.org/abs/2611.05036) · [`🔗 Hugging Face 每日论文`](https://huggingface.co/papers/2611.05036)

---

## 20. Kairos 是一个开源风控引擎，它宣称的差异点是「由你的编码 agent 来调它」

- **Velocity:** ▮ steady
- **来源:** Show HN · 103 分 · 约 23 小时前（约 05:16 UTC+8）
- **标签:** `agent-infra` `mcp` `fraud` `open-source` `fintech`

`finic-ai/kairos` 是一个 Apache-2.0 的实时风控与欺诈决策引擎——「an open-source alternative to Sardine, Sift, Riskified and SEON」——为注册、登录、下单、支付与提现做决策，并把每个决策连同其背后的信号一起留存。它创建于 **2026-10-30**，**202 星**，**2026-11-03** 仍有推送，提供 TypeScript（`@finic-ai/kairos`）与 Python（`finic-kairos`）SDK、CLI、HTTP API 以及 Docker 自托管方案。

「agent-first」不是装饰：一个 **MCP server** 让 Claude Code、Cursor 或 Codex「read your decisions and build workflows, with every action recorded under its key」，而实验回路让 agent「propose model variants」、Kairos「trains and tests them on your data」、最后「the agent ships the winner」。底下仍是常规模型——逻辑回归与 XGBoost 兼容的梯度提升树——外加一个名为 Grayson 的托管决策模型，用自然语言回答关于每次请求的问题，描述为「with few labels」。

**为什么重要：** 有意思的设计决定是操作归属：一个能重训并上线风控模型的 agent，也就是一个能改变「谁会被拦下」的 agent，所以把每个动作绑定到一把 key，是这个想法可被审计的最低要求。六天、202 星还很早；这里是架构在说话，不是规模。

[`🔗 finic-ai/kairos`](https://github.com/finic-ai/kairos) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50358314)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-04T20:30:18Z |
| Items | 20 |
| Sources tracked | 26（Hacker News、GitHub Trending、NVD、CISA KEV、GitHub Advisory Database、厂商 PSIRT、arXiv、Hugging Face、厂商工程博客） |
| Update schedule | 04:03, 12:03, 20:03 UTC+8（每日 3 次） |
| Ranking | 速度加权（新鲜度 × 互动加速度 × 来源权威度） |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[前一天](../2026-11-04/) · [原始 .md](https://trending.md/zh/feed/2026-11-05.md) · [归档](../../archive/)
