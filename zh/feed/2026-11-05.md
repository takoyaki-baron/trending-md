---
date: 2026-11-05
updated: 2026-11-05T12:26:44Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 31
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

## 21. OpenAI 的自动化流水线用 120 万美元 API 额度换来了 948 个 Linux 提权 exploit

- **Velocity:** ▮▮▮ trending
- **来源:** openai.com/index · 2026-11-04 发布 · HN 197 分
- **标签:** `security` `ai-research` `linux` `kernel` `vulnerability-research`

OpenAI 公开了一条自主挖内核漏洞流水线的方法论和账单：「Our prototype identified and analyzed 2,308 candidate Linux kernel findings, dynamically reproduced 1,724 vulnerabilities, and produced 948 local privilege escalation (LPE) exploits that could allow an unprivileged local user to gain root access.」整轮运行的 API 成本是 **1,213,430 美元，折合每个 LPE exploit 1,279 美元**；文中另报 **291** 个信息泄露类漏洞。

流水线分五段，最后一段是人。**Scout** agent 选出 **5,034 个审计目标**——约 **280 万行**，「roughly 7% of the whole Linux kernel code base」——花费 3,426 美元。**Analyst** agent 在 12 小时内产出 2,308 条候选，花费 316,549 美元。**Validation** 阶段在带 KASAN 的虚拟机里 30 小时内复现了其中 1,724 条（**74.7%**），花费 73,330 美元；文中对残差给得很具体：「Only 3.1% reflected incorrect analysis by the model, where the reported vulnerability assumed an impossible condition.」之后是可用性评估与补丁生成。

真正承载论点的是一次改编版 **kernelCTF** 环境上的对照：25 个信息泄露 PoC、21 个 LPE exploit，成本 **32,936 美元**；而 kernelCTF 在整个 2026 年确认接收的 0-day LPE 是 **26** 个。相对 7 月那次 GPT-5.6 Sol 的运行，新模型的「新发现」LPE 数量是「>5x」，并且文中说「at least 10 novel Linux exploitation techniques」是下限。

限制比成本更能界定这条标题。模型被称作「an upcoming cyber model」，从头到尾没有命名也没有跑基准。估值那一段的 1,890 万–6,630 万美元被明确标注为「hypothetical」——那是 948 个 exploit 按 Pwn2Own 与 TyphoonPWN 历史赏金折算出来的金额，而那些赏金是给「被接收的提交」的价，不是对这些 exploit 价值的测量。成本上作者也自己收口：「we focused on methodology and measuring model capability in this research, not cost」，因此「the costs we report are more an upper bound」。**948** 是实验室内部生成 exploit 的数量，不是提交的 CVE 数，也不是合入的补丁数。

**为什么重要：** 大家会引用的两个数——948 个 exploit、每个 1,279 美元——恰好回答了文章自己认为不是瓶颈的那个问题。它真正的运营发现是：「within 10 days while the scan was running, we observed over 100 Linux LPEs had been patched or had staging patches from other contributors, with ~300 more being publicly discussed」——也就是说，发现一个内核 bug 的边际成本，已经低于审阅、修好并把补丁发出去的边际产能。这是披露管道的问题，这篇文章最诚实的贡献是给它定了价。

[`🔗 OpenAI：A thousand fewer paths to root`](https://openai.com/index/a-thousand-fewer-paths-to-root/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50372929)

---

## 22. Ripple-65B 用 65B 稠密模型在 Terminal-Bench 上压过 500B–975B 的美国开源模型 —— 但只在两列中的一列上

- **Velocity:** ▮▮▮ trending
- **来源:** ricursive.com/ripple · 2026-11-04 · HN 248 分
- **标签:** `ai-models` `open-weights` `dense` `benchmarks` `agentic-coding`

Ricursive Intelligence 发布 **Ripple-65B Preview**：一个 **65B 稠密**（非 MoE）Transformer，**12T token** 预训练、支持最长 1M 上下文，在 **Terminal-Bench 2.1 上得 80.52**，高于 Reflection Beam 501B（80.1）、Meta Muse Spark Open 816B（76.4）、Thinking Machines Inkling 975B（63.8）与 NVIDIA Nemotron 3 Ultra 550B（56.4）。模型卡的架构刻意朴素：`d_model` **5120**、**80 层**、MFU **40%**，「simple sharding, no custom kernels, and no quantization (BF16)」，团队在开发过程中「scaled from 1 to 5 people during development」。权重以 Apache-2.0 发布，**16 个 safetensors 分片合计 129,565,519,472 字节（129.6 GB）**，另有 NVFP4、DFlash2 与一个仅预训练的 base checkpoint。我们读取时：**129 个赞、0 次下载**。

基准表有两列 Terminal-Bench，行为差异很大。`(self-reported)` 列里 Ripple 80.5 比 Beam 的 80.1 高 0.4；而在**官方 Terminus 2 harness** 下，Beam 掉到 **70.8**、Inkling 掉到 56.2、Muse Spark 掉到 78.7，Ripple 仍然是 **80.5**。模型卡解释了为什么两列都印：「we found that Terminal-Bench 2.1 scores were universally lower (with the exception of Muse Spark Open) when using the official Terminus 2 harness at 128K sequence length with summarization」，并且把自家重跑的竞品格子用斜体标出，同时直言「Replicating benchmark scores has been challenging, particularly for modern agentic evals, due to the number of factors which can cause eval scores to shift.」

离开 Terminal-Bench 之后，「SOTA」这个说法就窄了很多：**SWE-bench Verified 76.5**（Beam 81.6、Muse 78.7）、**SWE-bench Pro v1.0 61.42**（Beam 66.1）、**DeepSWE 1.1 44.3**（Muse 60.0）。唯一的离群点是 **SWE-bench Pro v2.0 Hard**：Ripple 自称 79.1，而 Inkling 只有 **2.0**——同一张表里 Inkling 在 Pro v1.0 上是 54.3，这更像 harness 差异而不是能力差异，文中没有点明。

成本主张必须连脚注一起引用：**3,200 万美元**是「our full R&D cost」，被描述为「one-tenth the cost of the previous open-weight SOTA on agentic coding」，并且「as estimated to the best of our knowledge」。效率主张是另一件事，而且写得更好：「improves Compute Efficiency (CE) on code by 16x relative to the Olmo 3 ladder, with the advantage further increasing with scale up to 55x for the full hero run」。

**为什么重要：** 一个能塞进 DGX Spark、又和 500B+ MoE 只差几个点的 65B 稠密模型，比名次本身更有意思——它说明 MoE 的容量优势与稠密的算力效率之间的差距，比参数量暗示的要窄。该一起带走的还有那个列分裂：同一个竞品在换 harness 后掉了 9.3 分，所以「压过 501B」是关于你读哪一列的陈述。（Ricursive 不是 2026-10-31 我们报道过的 Flint 那家 RecursiveSI。）

[`🔗 ricursive.com/ripple`](https://www.ricursive.com/ripple) · [`🔗 ricursiveAI/Ripple-65B-Preview`](https://huggingface.co/ricursiveAI/Ripple-65B-Preview) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50369925)

---

## 23. Kyverno 在 3.3 秒内发布了 21 条 CVE 记录 —— 七条 9.0 以上，而修复比文书早 15 天

- **Velocity:** ▮▮▮ trending
- **来源:** NVD · 21 条记录 `CVE-2026-122302`–`CVE-2026-122323`，发布窗口 2026-11-05T03:17:22–03:17:25Z
- **标签:** `cve` `kubernetes` `kyverno` `privilege-escalation` `policy-engine`

二十一条 Kyverno 记录在 **2026-11-05T03:17:22.030Z** 到 **03:17:25.343Z** 之间落到 NVD——发布窗口 **3.313 秒**——全部由 `disclosure@vulncheck.com` 打分，全部仍处于 `Received`。这些 ID 是一个**集合**而不是一个区间：`CVE-2026-122302`–`CVE-2026-122323` 这段跨度里有 **22** 个编号，而 **`CVE-2026-122317` 在 NVD 上根本没有记录**（单独查询，`totalResults` 为 **0**），所以是 21 条记录落在一个 22 个编号、带一个空洞的跨度里。其中七条在 9.0 及以上：**五条 9.9**、一条 **9.8**、一条 **9.1**。五个 9.9 共用 `CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:C/C:H/I:H/A:H`（重算结果确为 9.9：把它推进 Critical 区间的正是 `S:C` 的 scope 变更），同一批记录的 VulnCheck 4.0 度量给 **9.4**。

漏洞机制是同一个形状——命名空间内的策略作者够到了控制器的 ServiceAccount——但各个变体值得逐个看。`CVE-2026-122311` 是 `resource.get()` / `resource.post()` 的路径穿越：resource 参数按 `/` 切分，第一段之后的一切都被交给 client-go 当作「subresource」，而 `rest.IsValidPathSegmentName` 不校验 subresource，`path.Join` 再把 `..` 解析掉。通告自己的摘要对后果写得很直接：一个能在自己命名空间里创建 `NamespacedValidatingPolicy` 的租户，可以用 Kyverno admission controller 的 ServiceAccount 读写集群里任意位置的任意对象。`CVE-2026-122310` 是同一思路向上一层：`context.apiCall` 的 `urlPath` 是清洗之后才校验、执行的却是原始路径，于是 `#` 或 `?` 就能把穿越藏过检查。`CVE-2026-122303` 与 `-122313` 借 `targetMatchConstraints.expression` 返回一个字面量 CEL map，指到别人的命名空间；`CVE-2026-122304` 利用 cleanup controller「builds its context loader with a nil policy」；`CVE-2026-122302` 校验的是**控制器**的权限，而不是作者的。

日期比数量更重要。修复版本是 **1.19.2**，发布于 **2026-10-20T23:50:19Z**；`GHSA-4pqm-wqq6-h9q2` 于 **2026 年 10 月 21 日**发布，`datePublic` 也是 **2026-10-21**；CVE 记录直到 **2026-11-05** 才到——距修复发布 **15.15 天**，按日历日期相减（`2026-10-20` → `2026-11-05`）则是 16 天。而且通告明说这是复发而非新类：机制不同，且先前那两处修复都拦不住它——指的是 `GHSA-79gf-7frw-68m9`（CVE-2026-54523）与 `GHSA-cvq5-hhx3-f99p`（CVE-2026-41068）。

**为什么重要：** 已公布的复现环境是一个跑 Kubernetes v1.32.2 的 kind 集群，用发布版 manifest 安装，没有改任何配置，也没有给 Kyverno 追加任何 RBAC——就是默认安装。所以前置条件只是「某个租户能创建命名空间级策略」，而结果是集群管理员。3.3 秒的批量发布同时提醒：NVD 的发布时间是工作流产物，这些 bug 没有一条是在 03:17Z 变真的，而它们全部在 10 月 21 日就已经公开。

[`🔗 GHSA-4pqm-wqq6-h9q2（路径穿越）`](https://github.com/kyverno/kyverno/security/advisories/GHSA-4pqm-wqq6-h9q2) · [`🔗 Kyverno v1.19.2`](https://github.com/kyverno/kyverno/releases/tag/v1.19.2) · [`🔗 NVD CVE-2026-122311`](https://nvd.nist.gov/vuln/detail/CVE-2026-122311)

---

## 24. GPUStack 把任何来自 loopback 的请求当成管理员 —— 通告说它已在野被利用

- **Velocity:** ▮▮ rising
- **来源:** GitHub Advisory Database · GHSA-gj9m-f8ph-pmhr · CVE-2026-102895 · 9.8
- **标签:** `cve` `ai-infra` `authentication` `gpustack` `exploited`

`CVE-2026-102895` 是打在 GPUStack 上的 **9.8**——一个面向模型服务的开源 GPU 集群管理器，**5,972 星**，仓库在 2026-11-05 还有推送。漏洞只有一行策略：当 `force_auth_localhost` 为 False（默认值）时，`get_current_user` 会把任何来源被判为 loopback 的请求提升为内置管理员账号。有两种不需要任何凭据就能「看起来像 loopback」的办法：把 GPUStack 放在同机反向代理后面（最典型的自托管形态，此时「every remote request arrives at GPUStack with TCP peer `127.0.0.1`」），或者伪造 `X-GPUStack-Real-IP: 127.0.0.1`。通告里的根因行就是整条教训：「Trusting the network source of a request (socket peer, or a client-controllable header) as an authentication signal.」

影响面是管理级的：枚举并修改用户、模型、worker 与配置；铸造 scope 为 `["*"]` 的持久管理员 API key（此后「valid from any source IP thereafter」）；读取 worker 凭据与云厂商 secret；并借助 `POST /v2/inference-backends/from-yaml` 一类仅管理员可用的接口在 worker 主机上执行代码。

让这条区别于那几十个 9.x 认证绕过的是同一份通告里的一句：「This vulnerability has been observed exploited in the wild against a v2.1.1 deployment (attacker-created custom backends running reverse shells).」在野利用由 Javier Sixto（ulex.fr）报告；漏洞本身由 Nikko Enggaliano、Wei Yunzhou，以及 Rui Yang 与 Haoyu Wang（约翰霍普金斯大学）独立报告。

几个时钟照样对不上。通告发布于 **2026 年 7 月 31 日**；修复版本 **v2.2.0** 发布于 **2026-06-18T15:54:18Z**——比 **2026-11-04T22:17:44Z** 的 NVD 记录早 **139 天**。最新版本是 **v2.3.0**（2026-10-21），所以停留在当前版本线上的人已经修好，通告描述的是仍留在 2.1.x 的那批部署。

**为什么重要：** 「localhost 可信」这个默认值能活过每一次代码评审，因为它读起来像一个安全决定而不是一个 bug，而一个反向代理会悄悄把它变成一条「整个互联网都满足」的规则。缓解清单本身也值得留着：设 `force_auth_localhost=true`、在边缘剥掉客户端自带的 `X-GPUStack-Real-IP`、绝不让网关把外部流量伪装成本地。

[`🔗 GHSA-gj9m-f8ph-pmhr`](https://github.com/gpustack/gpustack/security/advisories/GHSA-gj9m-f8ph-pmhr) · [`🔗 NVD CVE-2026-102895`](https://nvd.nist.gov/vuln/detail/CVE-2026-102895) · [`🔗 GPUStack v2.2.0`](https://github.com/gpustack/gpustack/releases/tag/v2.2.0)

---

## 25. Yuxi 的沙箱之间可以互访对方的 API，并不需要容器逃逸 —— 9.9，修复比记录早 110 天

- **Velocity:** ▮▮ rising
- **来源:** GitHub Advisory Database · CVE-2026-97693 · 发布于 2026-11-04T22:18Z
- **标签:** `cve` `ai-infra` `multi-tenant` `sandbox` `yuxi`

Yuxi 是「a large-model-based intelligent knowledge base and knowledge graph agent development platform」，7,602 星，版本线还在 beta。`CVE-2026-97693` 为「execution-capable Docker sandboxes 与受信应用服务之间隔离不足」给出 **9.9**（`CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:C/C:H/I:H/A:H`）。一个能在自己沙箱里执行命令的低权限已认证用户，「can reach other tenants' sandbox APIs, access their files and secrets, execute commands in active sandboxes, and enumerate, create, or delete sandboxes through the unauthenticated provisioner without knowing administrator, database, or MinIO credentials.」

让这条保持诚实的是那句说明「什么没有发生」的话：这些路径能泄露和篡改跨租户数据并造成拒绝服务，「without a container escape or kernel vulnerability」。沙箱边界一个都没破；破的是沙箱与控制面之间的网络边界。

运维最容易漏掉的是修复说明。修复版本是 **0.7.1**，发布于 **2026-07-17T15:50:37Z**——比记录早 **110 天**——当前线已经走到 **v0.8.0.beta7**。但是：「upgrading the Compose files does not automatically rotate them」，所以任何曾经跑过文档默认值的部署，都必须单独轮换持久化的 **PostgreSQL**、**Neo4j** 与 **MinIO** 凭据；通告还指出，如果暴露的 PostgreSQL 账号是超级用户，仅此一项就能在 PostgreSQL 容器内执行命令。

**为什么重要：** 沙箱是每个 agent 平台都会做的安全承诺，而这里沙箱本身没事——租户边界是编排层自己的 API 面。升级一个 Compose 文件换掉的是代码，从来不换 secret，通告把这句明写了出来，而不是留给读者自己想。

[`🔗 CVE-2026-97693 记录`](https://www.cve.org/CVERecord?id=CVE-2026-97693) · [`🔗 GHSA-qpm5-6332-9445`](https://github.com/xerrors/Yuxi/security/advisories/GHSA-qpm5-6332-9445) · [`🔗 NVD CVE-2026-97693`](https://nvd.nist.gov/vuln/detail/CVE-2026-97693)

---

## 26. Pocket ID 把邮件令牌绑在用户上而不是地址上 —— 于是你可以「验证」一个已不属于你的邮箱

- **Velocity:** ▮▮ rising
- **来源:** GitHub Advisory Database · CVE-2026-115770 · 发布于 2026-11-04T23:17Z
- **标签:** `cve` `identity` `oidc` `pocket-id` `account-linking`

`CVE-2026-115770` 是 Pocket ID 上的 **9.6**（`AV:N/AC:L/PR:L/UI:N/S:C/C:H/I:H/A:N`）。Pocket ID 是一个基于 passkey 的 OIDC 提供方，**10,005 星**。这个 bug 是三个正常特性之间的三方互动：`SendEmailVerification` 把令牌「only to the user's identifier」绑定，`UpdateUser` 修改账号邮箱时「without invalidating the outstanding token」，而 `VerifyEmail` 会把「the current address as verified」。于是普通用户可以为自己控制的地址申请一个令牌，把账号改成任意一个未被占用的地址，再兑现那个旧令牌——Pocket ID 就会以一个 `email_verified` 为 true 的状态发布这个新地址。

可达性来自默认值：「The default affected configuration uses `emailsVerified=false` and `allowOwnAccountEdit=true`」。记录里写了一个前置条件——「the target address must not already belong to another Pocket ID user」——而这恰好是新员工邮箱满足的情形。

下游后果写得比转述更准确：一个信任「已验证邮箱」来做自动账号匹配或开户的应用，「can link the attacker's identity to another user's account, while applications that rely exclusively on the stable OIDC `sub` claim are not affected by that downstream consequence.」

时间线：修复版本 **2.12.0** 发布于 **2026-07-29T23:05:53Z**——比 **2026-11-04** 的记录早 **98 天**——项目现在已到 **v2.19.2**（2026-10-22）。CWE-345。

**为什么重要：** `email_verified` 是依赖方唯一当成「关于事实的断言」的 claim，而这里它断言的其实是令牌的主体，不是令牌的内容。缓解办法是一条设计规则而不是补丁说明：如果一个身份断言能被后续编辑作废，那么那次编辑就必须作废这个断言——而任何拿 `email` 而不是 `sub` 做即时开户的应用，是升级之后仍然留着的那半个 bug。

[`🔗 CVE-2026-115770 记录`](https://www.cve.org/CVERecord?id=CVE-2026-115770) · [`🔗 GHSA-rm8c-2cv8-jwf6`](https://github.com/pocket-id/pocket-id/security/advisories/GHSA-rm8c-2cv8-jwf6) · [`🔗 Pocket ID v2.12.0`](https://github.com/pocket-id/pocket-id/releases/tag/v2.12.0)

---

## 27. ESP-IDF 的 TEE 陷入入口经由调用方的栈指针写入 —— 而 6.x 的修复版本还根本不存在

- **Velocity:** ▮▮ rising
- **来源:** GitHub Advisory Database · CVE-2026-113780 · 9.3 · 发布于 2026-11-04T19:17Z
- **标签:** `cve` `esp32` `tee` `firmware` `espressif`

`CVE-2026-113780` 在 ESP-IDF 上是 **9.3**（`AV:L/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H`），机制是一段汇编入口里的顺序错误：「the `esp_tee` trap entry in `esp_tee_vectors_plic.S` and `esp_tee_vectors_clic.S` saves a caller-controlled register frame through the REE-supplied stack pointer before switching to the trusted TEE stack or validating the pointer.」也就是说，REE 侧一个本地无特权应用可以「direct this machine-mode write into TEE-exclusive memory」，在 **ESP32-C5、C6、C61 与 H2** 上打破 REE/TEE 隔离边界，并可能污染 TEE 的控制流数据。安全服务 `ecall` 与中断入口两条路径都有同样的顺序问题。

版本信息是让这条从学术变成运营的地方。受影响区间是 **from 5.5.5 until 5.5.6, 6.0.4, and 6.1.1**，记录说该问题「is fixed in version 5.5.6 and is scheduled to be fixed in versions 6.0.4 and 6.1.1」。**v5.5.6** 发布于 **2026-10-16T14:32:14Z**。但今天读 ESP-IDF 的发布列表，最新的是 **v6.0.3**（2026-09-02）与 **v6.1**（2026-08-27）——**6.0.4 与 6.1.1 并不存在**，也就是说停在 6.x 线上的人没有可安装的版本。记录本身的发布时间是 **2026-11-04T19:17:18Z**，距 5.5.x 的修复十九天。

通告引用了四个修复提交，CNA 是 `GitHub_M`——GitHub 分配的 CVE 号，不是 Espressif 自己的编号体系。

**为什么重要：** 一份点名「未来修复版本」的通告，是把修复日期包装成了版本号；这里诚实的读法是 5.5.x 已修、6.x 还没有。这类 bug 也正好是嵌入式团队容易低估的：TEE 边界是在切换的**上一条指令**上失守的，不在受信代码里面——所以「校验了指针」和「在使用之前校验指针」不是同一句话。

[`🔗 GHSA-49x8-xqjg-2pjg`](https://github.com/espressif/esp-idf/security/advisories/GHSA-49x8-xqjg-2pjg) · [`🔗 NVD CVE-2026-113780`](https://nvd.nist.gov/vuln/detail/CVE-2026-113780) · [`🔗 ESP-IDF v5.5.6`](https://github.com/espressif/esp-idf/releases/tag/v5.5.6)

---

## 28. 为了省 token 压缩提示词，会悄悄削弱模型的拒答 —— 而重建保真度依然很高

- **Velocity:** ▮▮ rising
- **来源:** arXiv 2611.06380 · 提交于 2026-11-04T11:42Z
- **标签:** `ai-research` `safety` `compression` `alignment` `interpretability`

**Does Context Compression Preserve Refusal Alignment?** 问的是：一个能忠实重建输入的压缩编码器，是否也保住了模型对它的行为。答案是没有：「encoder-based compression systematically weakens refusal behaviour in instruction-tuned language models, despite high reconstruction fidelity」，而且这一效应「persists across model families and compression architectures」。

机制层面的主张，才是让它超越「又一个榜单观察」的部分：「compression attenuates activation along the decoder's learned refusal direction.」也就是说，拒答行为在激活空间里有一个方向，压缩把沿该方向的分量缩小，而语义内容因为存放在别处得以幸存。论文提出 **Memory Steering**——「a lightweight inference-time intervention that restores refusal rates to near-baseline levels without retraining」，完全在压缩表示空间内操作。

它要带进系统设计的结论就一句：「semantic preservation does not guarantee behavioural preservation under compression.」

引数字之前该先套上的限制是：摘要里没有任何具体数值——没有拒答率差值、没有重建保真度、没有点名模型清单——所以这是一个带机制的方向性结论，量级在正文里。作者两人：Anthony Nguyen 与 Wenjun Lin。

**为什么重要：** 现在每一套长上下文 agent 栈都在为了塞进预算而压缩，而通行的验收标准是「人还能不能读懂这段摘要」——恰恰是这篇论文证明不够用的那个指标。一种在质量指标全都保持的同时静默退化的安全属性，是回归里最糟的形态，而「重建结果保真」恰恰是那次会漏掉它的检查。

[`🔗 arXiv 2611.06380`](https://arxiv.org/abs/2611.06380) · [`🔗 全文（PDF）`](https://arxiv.org/pdf/2611.06380)

---

## 29. CASE-Bench：给编码 agent 好的仓库上下文，换来 8.2 点功能分和 3.7 点安全分

- **Velocity:** ▮▮ rising
- **来源:** arXiv 2611.06294 · 提交于 2026-11-04T10:29Z
- **标签:** `ai-research` `security` `benchmark` `coding-agents` `context`

**A.S.E 2.0** 构建了 **CASE-Bench**——「a benchmark of 145 repository-level tasks from real CVEs in 51 projects」，每个任务跑在 Docker 里，「has functional tests and a proof-of-concept exploit validated in both directions」，并标注了「the repository code that enforces or undermines its security」。它要问的正是安全代码基准通常固定住的那个变量：上下文构造「designed almost exclusively for functional correctness」，所以模型到底是看到了项目的授权检查、还是看到旁边一段可模仿的不安全代码，从来没有人去变过。

在 **13 种上下文构造方法**、六个对照与六个 LLM 上，三个结果：

- 「(1) functionality-oriented context raises the functional pass rate by up to 8.2 percentage points (pp) but the secure pass rate by at most 3.7 pp」——大家天天在发的那些优化，在被调优的那条轴上值大约两倍。
- 「(2) withholding a safeguard lowers the secure pass rate by up to 8.1 pp, while one inserted insecure exemplar raises correct-but-exploitable code by 6.3 pp」——一个坏例子几乎和抽掉护栏一样有害，而且它产出的代码能通过功能测试。
- 「(3) coding agents observe the relevant safeguard in only 27-36% of trajectories」——大多数时候，agent 根本没读到那个会约束它的文件。

**为什么重要：** 第二条是提示词里修不掉的那个。「correct-but-exploitable」是一类同时躲过功能测试和多数安全评审的代码，因为测试集是照着不安全范例也满足的同一份规格写的。27–36% 这个数字则把问题重新归了位：与其说是推理问题，不如先说是检索问题——三分之二的轨迹压根没把相关护栏翻出来。

[`🔗 arXiv 2611.06294`](https://arxiv.org/abs/2611.06294) · [`🔗 全文（PDF）`](https://arxiv.org/pdf/2611.06294)

---

## 30. D3D 在当前块还在被验证时就去草拟下一个块 —— 32B 目标上 5.71 倍

- **Velocity:** ▮▮ rising
- **来源:** arXiv 2611.06425 · 提交于 2026-11-04T12:27Z · GitHub 上有代码
- **标签:** `ai-research` `inference` `speculative-decoding` `diffusion` `throughput`

投机解码有一段空转窗口：扩散草拟器一次就能出一整块，但「each new block must wait for updated target-model hidden states」，于是草拟与验证被迫串行。**D3D**（Decoupled Diffusion Drafting）把这个依赖去掉了——一个独立扩散草拟器，把「blockwise denoising with auxiliary autoregressive supervision」结合起来，在不需要目标模型隐状态的情况下获得较长的被接受前缀，从而可以「draft successor blocks during verification in one packed pass」。

工程上的一半是压缩：按层对接受长度的影响剪枝，而「Removing five of 36 layers retains over 99% of mean acceptance length across three benchmarks with Qwen3-8B as the target.」

七个基准的平均加速：目标 Qwen3-8B 时 **5.00×**，目标 Qwen3-32B 时 **5.71×**；DFlash 同条件是 **4.03×** 与 **3.67×**。在 Qwen3-32B 上跑 GSM8K 达到 **7.48×**。对照选得合适——同族草拟器、同基准——代码在 `fudan-generative-vision/D3D` 公开（9 星，最后推送 2026-11-01，所以这是刚出炉的产物，而不是维护中的项目）。

**为什么重要：** 数字之间的不对称才是发现本身。目标变大时 DFlash 相对变慢（4.03× → 3.67×），D3D 反而变快（5.00× → 5.71×）——这正是「收益来自填满验证窗口而不是草拟质量」会呈现的样子，因为更大的目标意味着更长的窗口可填。投机解码被围绕草拟器优化了两年，这篇讲的是调度。

[`🔗 arXiv 2611.06425`](https://arxiv.org/abs/2611.06425) · [`🔗 fudan-generative-vision/D3D`](https://github.com/fudan-generative-vision/D3D) · [`🔗 全文（PDF）`](https://arxiv.org/pdf/2611.06425)

---

## 31. 模型合并不需要统一 LoRA rank —— 而那些坚称需要的合并法会把指令适配器整个丢掉

- **Velocity:** ▮ steady
- **来源:** arXiv 2611.06486 · 提交于 2026-11-04T13:26Z
- **标签:** `ai-research` `lora` `model-merging` `fine-tuning` `evaluation`

模型合并把分别微调出来的专家合成一个模型、无需重训，而通行做法是让每个专家都用同一个 LoRA rank——这就在各领域之间把 rank 选择绑死了，「even though each domain has its own best rank」。论文的主张是这种耦合「is a property of the merge method, not of merging」。实验规模：三个领域（数学、指令遵循、多语）、四个 rank、三个模型尺度，共 **36 个专家**，用六种合并方法。

结果按方法族干净地分开：「Giving experts different ranks costs averaging and utility-based selection nothing, and gains them up to 1.8 pp of multi-domain accuracy, while the conflict-resolution methods are inconsistent and can lose up to 4 pp.」机制在挑选规则上：合并「keeps only a fixed share of the pooled spectral components, and methods that choose them by size discard many that would have reduced loss」——而且丢弃的是**同一个**专家。「The instruction adapter has the smallest singular values, so it is dropped almost entirely and IFEval falls by 16 to 25 pp.」

改成按对 loss 的影响去挑，三个专家都能留下，准确率在 8 倍 rank 区间上几乎持平——0.7 pp，对比 TIES 在 4B 尺度上的 6.7 pp。

**为什么重要：** 16–25 个点的 IFEval 掉分不是调参噪声——它是一种合并方法悄悄删掉了你合并进去的三个专家之一，而现象会表现为合并之后指令遵循就是变差了，不像一个 bug。可操作的规则只有一句：只要合并算子不按幅值挑选，rank 就可以逐专家选；而如果它按幅值挑，范数最小的适配器并不是最不重要的那个。

[`🔗 arXiv 2611.06486`](https://arxiv.org/abs/2611.06486) · [`🔗 全文（PDF）`](https://arxiv.org/pdf/2611.06486)

---

## 32. SumOne 训练 agent 的摘要器的方式：让一个冻结模型去重建被丢掉的部分

- **Velocity:** ▮ steady
- **来源:** arXiv 2611.06445 · 提交于 2026-11-04T12:49Z
- **标签:** `agent-infra` `memory` `context-compaction` `grpo` `open-source`

长程 agent 的上下文压缩，通常是拿你真正在乎的东西去训练——下游任务分数或求解器行为——这会把摘要器绑死在某个任务、某个 agent 上。**SumOne** 换成了重建奖励：「Given a summary of the expired history, a frozen reconstructor recovers randomly masked portions of the original trajectory; reconstruction quality, combined with a length penalty, provides a task-agnostic reward for optimizing the summarizer with GRPO.」不需要参考摘要，也不需要跑任务。

推理时「only the lightweight summarizer is retained, enabling plug-and-play context compression for otherwise unchanged agents」，而且这个 checkpoint「transfers across downstream models and agent harnesses without additional fine-tuning」。在长程检索与软件工程任务上，它「reduces estimated inference cost by approximately 78% on DeepSearchQA and 75% on SWE-bench Verified relative to operating with full context」。

准确率那一侧写的是「absolute decreases of 0.04」，但没说明这个度量的量纲——这是摘要里读者唯一无法估量的数字：在 0–1 的通过率上那是四个点，在 0–100 的分数上那什么都不是。

**为什么重要：** 有意思的设计决定是训练信号本身。让一个冻结模型去重建被丢掉的信息，是一个便宜、不需要任务、也无法被「学会了某个基准形状」的摘要器钻空子的信息保留代理——而后者正是这篇论文要绕开的失败。没解决的部分是：重建保真度与下游有用性在别的场景里已经被证明会分叉（见第 28 条），所以这份奖励的独立性同时也是它的盲点。

[`🔗 arXiv 2611.06445`](https://arxiv.org/abs/2611.06445) · [`🔗 全文（PDF）`](https://arxiv.org/pdf/2611.06445)

---

## 33. Horizon 是一个 12,624 星的新闻雷达，有 profile 系统、MCP server、skill —— 却一个 release、一个 tag 都没有

- **Velocity:** ▮ steady
- **来源:** GitHub Trending（日榜）· 今日 121 星 · MIT · 最后推送 2026-11-03T17:20Z
- **标签:** `agent-infra` `mcp` `skills` `rss` `open-source`

`Thysrael/Horizon` 是一个 MIT 的 Python 项目，自称「your own AI-powered news radar」：从 RSS、Hacker News、Reddit、Telegram、X、GitHub 与财经源抓取，然后「collects, filters, and deduplicates them, then brings the worthwhile ones to you with context and community discussion」。它创建于 **2026-02-20**，**12,624 星**，2026-11-03 仍有推送，产出中英双语的每日简报，可交付为 Markdown、GitHub Pages、邮件、微信或 webhook。

值得抄的设计决定是 **profile**：「A profile is a reusable set of editorial rules: what belongs, what's worth keeping, and what to write.」每个源路由到一个 profile（内置 `tech-news`、`tech-blog`、`ai-creator`），每个 profile 自带打分 rubric、阈值、去重规则与输出形态，而分析、过滤与去重都在富化**之前**完成。此外 `src/mcp/` 下有一个 MCP server 供助手调用流水线各阶段，还有一个 skill 安装方式——`npx skills add Thysrael/Horizon --skill horizon -g`。

推荐之前该注意的产物状态是这一条。我们直接查了这个仓库的 releases 与 tags 两个 feed：**0 个 release、0 个 tag**。这个项目能装的一切都是 2026-11-03 的默认分支快照——包括那个 skill，它没有可钉住的版本化 tag。

**为什么重要：** 「按源配置的编辑 rubric」对信息流是正确的抽象——它把读什么和怎么写拆开，而多数聚合器把它们塞进一个 prompt 里。缺失的 tag 则是这个 feed 反复遇到的同一种供应链形态：1.26 万星、有文档化的安装路径，却没有任何可供审计的状态，「钉住一个 commit」成了一句项目自己还给不出的建议。

[`🔗 Thysrael/Horizon`](https://github.com/Thysrael/Horizon) · [`🔗 在线演示`](https://thysrael.github.io/Horizon/) · [`🔗 GitHub Trending`](https://github.com/trending)

---

## 34. 高通 Cloud AI 100 Ultra 让 128 GB 显存跑在 548 GB/s 上，功耗 150 W —— 而且自家规格表里有个拼写错误

- **Velocity:** ▮ steady
- **来源:** qualcomm.com 产品页 · HN 116 分 · 约 20 小时前（约 00:00 UTC+8）
- **标签:** `hardware` `inference` `qualcomm` `datacenter` `specs`

高通的 **Cloud AI 100 Ultra** 是一张 PCIe FH3/4L 推理卡，**150 W TDP**，**最高 870 TOPS INT8**、**最高 288 TFLOPS FP16**、**576 MB** 片上 SRAM、**64 个 AI core**、**128 GB** DRAM，**PCIe Gen4 ×16** 提供 **548 GB/s** 带宽——没有 NVLink，没有 host 内存一致性，除了插槽之外没有互联。它搭配一套 **AI Inference Suite**，提供兼容 OpenAI 的 API（对话、图像生成、多模态、RAG），以 Kubernetes 或裸金属容器部署。

有意思的产物是那张家族表，因为它显示了「Ultra」这个后缀到底买到了什么。**AI 80 Ultra** 是**同样的** 150 W、**同样的** 128 GB、**同样的** 548 GB/s，差别只在算力——618 TOPS INT8、222 TFLOPS FP16，对 870 与 288。**AI 100 Pro** 则降到 75 W、32 GB、137 GB/s，半高卡、八条 lane。

把四个 SKU 横着读，比值是常数：548 GB/s 对 128 GB、137 GB/s 对 32 GB，都是**每 GB 容量 4.3 GB/s 带宽**。容量与带宽同步缩放，这正是 LPDDR 方案而非 HBM 的指纹——也意味着单卡的显存是为「很多个并发小模型」准备的，不是为「一个高速解码的大模型」准备的。

厂商自己页面上的一处细节：两个 Ultra SKU 的 DRAM 一列都写作「128 GB **LPR4x**」，这是 LPDDR4x 的拼写错误，而不是某个料号。

**为什么重要：** 决定这张卡用途的规格，恰好是标题里没有的那个——548 GB/s 才是约束，也正是它决定了卖点是「低功耗下的数百路并发推理流」而不是「单模型快速解码」。跨厂商比 TOPS 在不带这个数字时几乎无意义，「128 GB」同理：这里它描述的是每瓦、每槽的容量，不是每带宽。

[`🔗 Cloud AI 100 Ultra`](https://www.qualcomm.com/data-center/products/cloud-ai-100-ultra) · [`🔗 产品简介（PDF）`](https://www.qualcomm.com/content/dam/qcomm-martech/dm-assets/documents/Prod-Brief-QCOM-Cloud-AI-100-Ultra.pdf) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50370654)

---

## 35. Xbox 360 hypervisor 利用从「20 分钟、30% 成功率」变成「近乎瞬间、接近 100%」—— 靠的是一张 20 位查找表

- **Velocity:** ▮ steady
- **来源:** icode4.coffee · 2026-11-04 · HN 78 分
- **标签:** `reverse-engineering` `xbox360` `exploit` `hardware` `writeup`

Ryan Miceli 关于 Xbox 360 hypervisor 的第三篇很短，主要在讲 PoC 放出之后改了什么。标题级的变化是：「how it went from taking ~20 minutes with a ~30% success rate to being near instantaneous with a near 100% success rate.」

两处改动做到的。第一是去掉了游戏光盘这个入口：**Rock Band Blitz** 试玩版里的一个存档漏洞（「DaTArrest」，由 `ihatecompvir` 与 `InvoxiPlayGames` 发现）能引导到 stage-2 ROP 链；而当主机开始支持 USB 存储时，原本签名允许从 HDD 或存储单元启动的包被「祖父条款」扩展到 **USB 存储**，于是这个试玩包可以当普通文件拷到 U 盘上，在任何支持该版本的主机上启动。

第二是修掉作者自己的盲点。内存加密的 whitening 值是 **12 位**，对任意明文给出 **1024 个**不同密文，而最初的 PoC 只生成了它需要的那一个——那张查找表他试过、并且放弃了。文章很坦白地讲了为什么：较早的 hypervisor 会为加密区间刷 TLB，后来的构建不再刷，于是直接调用系统调用会留下过期的 whitening 位，表「was causing issues」；「by the time I got to the end of the exploit I had become so blinded by tunnel vision chasing CPU cache issues that I had convinced myself the lookup table just wasn't going to work.」重建后的表用预期密文的 **20 位**做索引，同时存 oracle 值（用于碰撞校验）与恶意替换值，并且刻意忽略碰撞——用文章的话说，少量碰撞意味着在竞态循环里跳过若干次迭代，这比在哈希表里实现桶支持更便宜。

**为什么重要：** 这是一个漏洞工程中最常见失败的标本——不是缺原语，而是对原语的模型错了，并且因为一次坏掉的原型给出的负面结果从未在新前提下重测，就这么抱了几周。修法是多 1024 倍的预计算，加上承认早先那次实验无效；第四篇讲的是 peer pressure exploit。

[`🔗 Hacking the Xbox 360 Hypervisor Part 3`](https://icode4.coffee/?p=1746) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50372164)

---

## 36. OpenSSH 一天之内发布 10.6p2，修 musl 上的密码认证绕过 —— 并称长期禁运期如今主要帮的是攻击者

- **Velocity:** ▮▮▮ trending
- **来源:** OpenSSH 发布说明 · 10.6p2 于 2026-11-05 发布 · 维护者贴文 2026-11-05T09:03Z
- **标签:** `security` `openssh` `musl` `alpine` `coordinated-disclosure`

Portable **OpenSSH 10.6p2** 于 **2026-11-05** 发布。发布说明的安全章节只有一条：`sshd(8)` 应当「avoid password authentication bypass that is exploitable through sshd(8) that affects some Linux systems when built and run with PAM support disabled」。说明随后把责任放到守护进程之外——「We consider the root cause of this bug to be outside sshd, but it is exploitable via sshd and can be avoided there」——并致谢 **Wakefield 的 Özgün Kültekin**（wakefield.co）。

维护者 Damien Miller 当日上午的贴文更具体地界定了受影响人群与紧迫性。该 bug 影响使用 musl libc 且未启用 PAM 的 Linux 系统（举的例子是 Alpine Linux），对这些系统他的建议是立刻停止阅读并设置 `PasswordAuthentication=no`，或直接关闭 SSH。随后他明确排除三种相邻配置：非 Linux 系统不受影响，glibc 的 Linux 系统不受影响，使用 PAM 做密码认证的 Linux 系统也不受影响。这正是受影响集合既小、又恰好等于互联网大量容器基础镜像的原因。（该贴文正文由实例的 status API 提供；网页本身是一个 JavaScript 空壳。）

时间线才是改变实践的部分。Miller 说项目在前一天才得知问题，次日上午就发布，因为近来已多次见到 AI agent 快速重新发现同一 bug、有时只需数小时，因此现在认为长期禁运期是一种危险做法，主要受益的是攻击者。10.6 的发布说明把同样的推理写得更长，包括这一观察：「We have seen a number of cases where a security bug identified by AI tools is subsequently independently discovered by a different researcher」，并承诺「making more frequent releases to get bugfixes into users' hands more quickly rather than batching them until the next planned release」。

构建产物的踪迹很短，值得按顺序读：Alpine `edge` 的 `openssh` 包已是 **10.6_p2-r0**，构建时间 **2026-11-05 09:05:19**——同一个上午，这正是 Miller 感谢 Alpine 维护者在极短时间内提供更新版本所指的事。发布说明里没有任何 CVE 编号，也没有任何一条 bugfix 说明机制。上游库一侧同样看不到对应改动：`musl` master 日志中最新一次提交的日期是 **2026-10-14**。

**为什么重要：** sshd 的密码认证绕过是协议里杠杆最高的 bug 形态——不需要利用链，只需要一次登录尝试——而受影响集合由 libc 的构建开关而非版本号定义，所以「你有没有打补丁」无法从 `ssh -V` 得知。真正持久的是披露政策的变化：当重新发现以小时而非月计，禁运期唯一剩下的功能，就是在同样长的时间里同时让防御方无知，而 OpenSSH 现在把这一点写成了政策，而不是只在私下说。

> 「We have seen a number of cases where a security bug identified by AI tools is subsequently independently discovered by a different researcher.」—— OpenSSH 10.6 发布说明

[`🔗 OpenSSH 10.6p2 发布说明`](https://www.openssh.com/releasenotes.html) · [`🔗 Damien Miller 的公告`](https://hachyderm.io/@damienmiller/117563026759098135) · [`🔗 Alpine edge 的 openssh 10.6_p2-r0`](https://pkgs.alpinelinux.org/package/edge/main/x86_64/openssh)

---

## 37. 百度的 ERNIE 5.5 Flash Base 是 280B-A14B 的预训练检查点 —— 表格在与三个开源 base 模型的 30 行里赢了 24 行

- **Velocity:** ▮▮▮ trending
- **来源:** ERNIE Blog · 2026-11-05 · Hugging Face 仓库创建于 2026-10-21
- **标签:** `ai-models` `open-weights` `moe` `baidu` `pretraining`

百度发布 **ERNIE-5.5-Flash-Base**，一个稀疏 MoE 语言模型，**总参数 280B，每 token 激活 14B**，从零预训练于 **33.5T token**，训练上下文 **128K**，支持 **100 万 token** 的微调与推理。它是严格意义上的 base 检查点——「the checkpoint at the end of pre-training, before any mid- or post-training」——而博客明确说这正是产品本身：一个用于「domain adaptation, instruction tuning and reinforcement-learning research」的起点。后训练版 ERNIE 5.5 Flash 被宣布为后续发布，不是这一次。

对任何为长上下文付费的人来说，架构才是重点。模型有 **43 层 Transformer**、隐藏维度 **4096**、**64 个注意力头**，只有 **七分之一的层**保留对完整上下文的 token 级访问（用 MLA 加 DeepSeek 式稀疏注意力）。其余 **37 层**使用 **Heavily Compressed Attention**：每 128 个 token 压成一个缓存条目，该层再对这些条目加一小段最近未压缩 token 做注意力。头维度按层设定而非全局统一——廉价的 HCA 层用 **512**，昂贵的 MLA 层用 **256**——百度还说测试了显而易见的替代方案（用少量 CSA 层代替少量 MLA 层），结论是在相近 KV cache 预算下「HCA combined with MLA outperforms HCA combined with CSA」。

评测的可比性异常地好，这也是这些数字值得引用的原因：「All four models are evaluated from their publicly released checkpoints with the same evaluation harness, prompts and few-shot examples, and with the same LLM judge for free-form QA.」四个模型是 ERNIE 5.5 Flash Base（**280B-A14B**）、DeepSeek V4 Flash Base（**284B-A13B**）、Hy3-preview-Base（**295B-A21B**）和 MiMo V2.5 Base（**310B-A15B**）。ERNIE 在表格 **30 行中的 24 行**最优，包括 MMLU **93.3**（5-shot）、MMLU-Pro **78.4**、GPQA **60.2**、HumanEval+ **82.3**、LiveCodeBench **40.1**、LongBench-v2 **48.7**。它输了六行：**HELMET-Rerank 56.2** 对 DeepSeek 的 60.0、**InfiniteBench 46.5** 对 48.0，这两行都在表格自己的 **Long Context** 分节里；再加上 **Knowledge** 分节里的 **ChineseSimpleQA 73.0** 对 75.3；剩下三行是 BBH-CoT、INCLUDE-lite 和 FullStackBench。这是一张能看出压缩代价的表格——而且恰好只在该出现的那六行里的两行出现。

权重以 FP8 与 BF16 形式在 Hugging Face 发布，许可证为 **ERNIE 5.5 Flash Base Model License Agreement v1.0**。仓库 `baidu/ERNIE-5.5-Flash-Base` 创建于 **2026-10-21T08:40:58Z**——比博客早十五天——我们打开时读到 **150 个赞、13 次下载**。

**为什么重要：** 发布一个未做后训练的 base 检查点、并附上四模型同一 harness 的对比，是更稀有也更有用的产物——多数「开放」发布都是后训练模型，因此对预训练贡献了什么并不透明。24/30 的结果确实自带对照，但按分节读表，这个对照比标题所示的要弱：六行失利里**两行**在 Long Context 分节（HELMET-Rerank 与 InfiniteBench），其余四行分别是 Knowledge、Reasoning、Multilingual、Code 各一行——也就是说 128 倍压缩只解释得了 **6 行中的 2 行**，剩下四行落在它并不预测的分节里。

[`🔗 ERNIE 5.5 Flash Base`](https://ernie.baidu.com/release/ernie-5-5-flash-base/) · [`🔗 baidu/ERNIE-5.5-Flash-Base`](https://huggingface.co/baidu/ERNIE-5.5-Flash-Base) · [`🔗 BF16 权重`](https://huggingface.co/baidu/ERNIE-5.5-Flash-Base-BF16)

---

## 38. OpenAI 的 Images 2.6 快了 50%、能生成 GIF —— 而公告里一个评测数字都没有

- **Velocity:** ▮▮▮ trending
- **来源:** OpenAI · 发布于 2026-11-04 · HN 322 分
- **标签:** `ai-models` `image-generation` `openai` `api` `product-release`

**Images 2.6** 于 **2026-11-04** 在 ChatGPT、Codex 与 API 上线。API 里有两个模型名——**`GPT-Image-2.6 Flare`** 与 **`GPT-Image-2.6 Sunburst`**——按质量档位分工：Flare 是快速/低档路径，博客说在低质量下它「can generate images in as little as six seconds」；Sunburst 是中/高质量路径，卖点是「even greater image consistency across edits」。

四项能力是新的。**GIF 输出**：模型可产出循环动画与 sprite sheet，博客把它放在最前面（「GIFs are the native language of social media」）。**API 中的 image markup**——ChatGPT 里已有的点选编辑接口——调用方可以指定改哪里，而不必用文字描述。**SVG 导出**，面向网页与印刷。以及 **complexity 参数**，让开发者「adjust how much planning the model does to meet a request」，与质量档位正交：质量控「visual detail and fidelity」，复杂度控「how much goes into the scene」。官方建议编辑用低复杂度，元素多或约束多的场景用中或高。

规模数字是全文唯一的一个：「People around the world now create 4 billion images per week across ChatGPT, Codex, and the API.」速度声明是「**50% faster** than before」——没有说明基线、没有分辨率、没有测量方法。

**为什么重要：** 这是一次没有基准表、没有与 2.5 的并排对比、也没有任何质量指标的模型发布——唯一的比较数字是一个速度增量，而它的参照点是一个代词（「than before」）。对图像模型来说这并不罕见，因为评测本身有争议，但值得点名，因为 GIF 与 SVG 这类能力往往靠一段 demo 就被采纳，之后再无人评测。安全评估指向单独的系统卡，那才是用模型前该读的产物；而定价页才是「六秒」变成账单的地方。

[`🔗 Introducing Images 2.6`](https://openai.com/index/introducing-images-2-6/) · [`🔗 Hacker News 讨论`](https://news.ycombinator.com/item?id=50372945)

---

## 39. Uncle Bob 的 `ub-mode` 是一个 agent skill，规则派给三个质量关卡程序执行 —— 7,054 星、无 release、无仓库描述

- **Velocity:** ▮▮ rising
- **来源:** github.com/unclebob/ub-mode · 创建于 2026-10-25 · 7,054★
- **标签:** `agent-skills` `software-engineering` `tdd` `code-quality` `claude-code`

Robert C. Martin 的 **`ub-mode`** 是 152 行 `SKILL.md`（3,958 字节），让编码 agent 分三阶段工作：**First Make it Work**、**Then Make it Right**、**Follow Practice**。它在十一天里达到 **7,054 星**，而仓库**没有描述**、**没有 release**、**没有 tag**，MIT 许可证，**10 个 open issue 与 PR**，被 fork **394** 次。README 注明规则源自 `@poteto`（`poteto-mode` / `pstack`），并自称是「reduced and paired with deterministic quality-gate tools」。

这个「配对」才是真正的论点。skill 文件里的散文规则对模型只是建议；仓库把其中三道关卡接到会返回数字的独立程序上——[`crapper`](https://github.com/unclebob/crapper)（逐函数计算圈复杂度、测试覆盖率与 CRAP 分数，目标 CRAP `< 10`）、[`dryer`](https://github.com/unclebob/dryer)（结构性重复，报告 `>= 0.8` 相似度的块）、[`mutator`](https://github.com/unclebob/mutator)（变异测试，暴露存活变异体而非覆盖率表演），外加 `uml-viewer` 画组件、覆盖率、CRAP 与依赖方向。「把函数控制在 CRAP 10 以下」可以由类编译器工具检查；「写干净的代码」不行。但这两个数字并不是工具自己的默认值：`crapper` 的 `--threshold` 出厂是 **30**，`dryer` 的是 **0.82**，所以 `CRAP < 10` 与 0.8 相似度是 ub-mode 的目标值，调用者必须自己传进去——关卡是存在的，但在有人设上之前它并不生效。

规则集本身是 Martin 二十年来发表的纪律的压缩版：Laziness Protocol（「One decision lives in one place」「Ship the smallest edit that solves the problem」）、Foundational Thinking（「Get the data shape right before you write the logic」「Do first whatever helps every later phase」）、TDD、Redesign From First Principles、Attack the Premise、Subtract Before You Add，以及后阶段的 Fix Root Causes、Sequence Work into Verifiable Units、Test Behaviour (Not Implementation) 与 Guard the Context Window。安装是一次复制：把 `SKILL.md` 放到 `~/.claude/skills/ub-mode/SKILL.md`（或 Grok、Cursor 的对应目录），用 `/ub-mode` 调用。

**为什么重要：** agent-skill 这一品类已经收敛成散文式人格提示词，而这是第一个广受 star 的作品，其作者对你怎么知道它起作用了的回答，是另一个带退出码的仓库。阈值本身可以争论——CRAP 10 与 0.8 相似度都是十年前的经验法则——但设计选择是可迁移的：一个把检查派给可测量关卡、而不是让模型给自己打分的 skill。

[`🔗 unclebob/ub-mode`](https://github.com/unclebob/ub-mode) · [`🔗 SKILL.md`](https://raw.githubusercontent.com/unclebob/ub-mode/HEAD/SKILL.md) · [`🔗 unclebob/crapper`](https://github.com/unclebob/crapper)

---

## 40. iTerm2 的 `x-man-page:` 处理器把百分号编码的 NUL 变成了空格 —— 同一 URL scheme 的第三次修补

- **Velocity:** ▮▮ rising
- **来源:** NVD `CVE-2026-123014` · 发布于 2026-11-05T06:17Z · 8.7
- **标签:** `cve` `iterm2` `macos` `argument-injection` `nul-byte`

`CVE-2026-123014` 是 iTerm2 `x-man-page:` URL 处理器中的**参数注入**，CVSS 4.0 评分 **8.7**（`AV:N/AC:L/AT:N/PR:N/UI:P/VC:H/VI:H/VA:H`），CWE-88，由 `cve@mitre.org` 分配，NVD 状态仍为 `Received`。机制是两层规范化不一致：「**Percent-encoded NUL characters survive input sanitization and are subsequently converted to whitespace during command-line parsing, allowing injection of additional arguments to `/usr/bin/man`**」。其中一个参数是决定性的——「An attacker can inject the `-P` option to select an attacker-controlled pager command」——于是打开一个构造好的 `x-man-page:` URL，就会以登录用户的权限运行攻击者的程序。记录自己的 `NOTE` 字段就是这段历史：「this issue exists because of an incomplete fix for CVE-2023-46321」。

厂商一侧才是这个条目的价值所在，因为修复早于记录发布，而更新日志用大白话写了。iTerm2 下载页列出 **3.7.7**（稳定版，构建于 **2026-11-03**）与 **3.7.7beta2**（构建于 **2026-10-27**）；CVE 声明的边界是 `3.7.7beta2`，但 3.7.7 自己的更新日志带着同一条：「Hardened the handler for `x-man-page:` URLs so a malicious URL can no longer be crafted to run an unexpected command or make man render an arbitrary local file. Man section and page names are now checked against an allowlist of characters」。记录引用了两个提交——GitLab 仓库中的 `314ba43` 与 `f29420a`。

**为什么重要：** `x-man-page:` 是 macOS 与其他终端用来从链接打开 man page 的 scheme，这意味着攻击面是终端模拟器里一次从不弹窗的点击——向量里的 `UI:P` 就是全部社工预算。更可迁移的教训是消毒边界：放过这个 bug 的检查作用在解码后的字符串上，而消费者解析的是编码后的字符串，而在两步之间从 NUL 变成空格的东西，与参数分隔符无法区分。2023 年的 CVE 已经修过同一个处理器一次，记录把这件事写了出来，而不是留给读者去发现。

[`🔗 NVD CVE-2026-123014`](https://nvd.nist.gov/vuln/detail/CVE-2026-123014) · [`🔗 iTerm2 下载页与更新日志`](https://iterm2.com/downloads.html) · [`🔗 修复提交 314ba43`](https://gitlab.com/gnachman/iterm2/-/commit/314ba43920dbce08808c032e89966918090bdf8e)

---

## 41. TrueNAS 只要 socket 的对端地址是写死的心跳 IP 就授予管理员 —— 包括完全没配 HA 的单机安装

- **Velocity:** ▮▮ rising
- **来源:** TrueNAS 安全公告 · NVD `CVE-2026-123033` · 8.3 · 修复于 25.10.8（尚未发布）
- **标签:** `cve` `truenas` `authentication-bypass` `storage` `middlewared`

`middlewared`——TrueNAS 的中间件——**无条件**注册了 HA 对端认证钩子，「with no failover-licence or heartbeat-interface check」。该钩子仅凭攻击者自己 socket 的两个属性做信任判断：TCP 对端地址必须是写死的 HA 心跳地址之一（**169.254.10.1** 或 **169.254.10.2**），源端口必须 **≤ 1024**。没有伪造、没有签名，连接就被授予「an internal node credential that is treated as a full administrator for every API method」。拿到管理员 API 即等于以 root 执行命令。

适用范围条款正是它不只是「HA 对」bug 的原因：由于钩子与许可证、硬件、配置无关地存在，攻击者「an attacker able to meet those conditions could obtain unauthenticated administrative API access」，适用范围包括「non-HA, single-node Community Edition systems with no HA configuration」。厂商列出 CWE-290（认证绕过/欺骗）与 CWE-306（关键功能缺少认证），并说明该凭据顺带绕过了什么：管理接口的 IP 白名单、API 速率限制，以及审计日志。

TrueNAS 自己的威胁模型把可利用性收窄了一层，而 NVD 的描述没有，两者应当写在同一句里。公告说「Exploitation is not possible from an arbitrary Internet location」——信任判断基于链路本地源地址，而出厂系统「disables IPv4 link-local autoconfiguration and holds no route to the 169.254.0.0/16 range」——并补充「adjacency by itself is not sufficient」，因为系统没有返回路由，「the attacker must additionally alter the return path — either by modifying routing on the TrueNAS system or by controlling the gateway/path」。在这些条件满足处，影响就是未认证管理员。

时钟与修复状态要分开说。公告标题仍写着「**CVE Pending**」，「Fixed in」一栏写的是「**TrueNAS SCALE 25.10.8 (forthcoming)**」——所以目前没有可安装的东西，主要缓解是网络隔离：把管理接口放在可信网段，且该二层网段上没有任何不可信主机。NVD 记录仍然存在（`CVE-2026-123033`，发布于 **2026-11-05T07:17Z**，`Received`，8.3，向量 `CVSS:3.1/AV:A/AC:H/PR:N/UI:N/S:C/C:H/I:H/A:H`），由 `cve@mitre.org` 分配——它比第 46 条里那个不相干的 OPNsense 记录晚 **310 毫秒**发布（`2026-11-05T07:17:26.207Z` 对 `07:17:25.897Z`），旁边还有一个 Wowza Streaming Engine XXE。修复本身是一个想法：信任必须额外要求「that the connection also terminate on the HA heartbeat listener, a local address and port the attacker cannot control」。

**为什么重要：** 这是教科书式的混淆代理，但有意思的另一半是：厂商公布了让 CVSS 的 `AC:H` 站得住脚的返回路径分析，而 CVE 描述把它压缩成了「an attacker on the same network segment」。存储设备的管理 API 是机架里价值最高的凭据，而钩子在所有安装上都注册着，正是把一个双控制器特性变成单机漏洞的那种失败模式。

[`🔗 TrueNAS 安全公告`](https://security.truenas.com/scale/impact-statements/ha-node-auth-bypass/) · [`🔗 NVD CVE-2026-123033`](https://nvd.nist.gov/vuln/detail/CVE-2026-123033)

---

## 42. Ansible 的 `no_log: true` 保留 `exception` 字段 —— 于是失败的任务把本要隐藏的秘密打印了出来

- **Velocity:** ▮▮ rising
- **来源:** NVD `CVE-2026-123036` · 发布于 2026-11-05T10:16Z · Red Hat CNA · 5.5
- **标签:** `cve` `ansible` `secrets` `logging` `regression`

`CVE-2026-123036` 是 Red Hat 针对 `ansible-core` 提交的 **5.5**（`CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:N/A:N`），描述的机制任何读过被审查任务结果的人都熟悉。当一个标记 `no_log: true` 的任务失败时，结果在发出前被审查——「but the `exception` field is retained because it is present in the PRESERVE allow-list in `lib/ansible/_internal/_task.py`」。随后默认 stdout 回调把它打印出来。

代码印证了这个描述。当前 `devel` 树里的白名单是一个名为 `PRESERVE` 的 `frozenset`，包含 `_ansible_no_log`、`attempts`、`changed`、`deprecations`、**`exception`**、`retries` 与 `warnings`，而审查路径在附上「output has been hidden」提示前，恰好用这些键重建结果。其余全部被丢弃，异常字符串没有。

记录点名三条泄漏路径，每条漏出的秘密量不同：「module argument-validation errors echo the argument value」「templating errors print an Origin source snippet (the failing line plus the two preceding lines of the variables file, exposing neighbouring secrets from an `-e @secrets.yml` file)」「`fail`/`assert` messages are printed in full」。后果是运维者会认出的那种——以 extra vars 或变量文件提供的机密「can therefore leak to terminal output, CI logs, and the stdout logs of any automation wrapping `ansible-playbook`, even though every task touching the secrets is marked `no_log: true`」。

回归边界被写明：「This is a regression introduced with the `ansible-core` 2.19 data-tagging/templating rework; the behaviour does not occur on 2.16, where the error text is correctly censored.」NVD 尚未分析该记录——`vulnStatus` 为 `Awaiting Analysis`，唯一指标来自 `secalert@redhat.com` 且类型为 `Primary`。修复边界写在记录的另一处——CNA 的 `affected[]`，而不是 NVD 的分析：`ansible-core` `2.19.0` 起、不含 `2.23.0`，`defaultStatus: unaffected`——而 `2.23.0` 目前在 PyPI 上还不存在（最新是 `2.22.0`，上传于 2026-11-02），所以边界有名字，但仍然没有可安装的东西。

**为什么重要：** `no_log` 是 Ansible 用户被告知要信任的唯一安全控制，而击败它的不是一个解析 bug，而是一份早于该字段语义的白名单——审查逻辑写成时 `exception` 装的是 Python 类名，2.19 的重写让它装下了渲染后的错误文本。三条路径中模板那条最糟，因为「失败行加前两行」是对运维者从未要求求值的机密的引用，而 CI runner 会长期保留 stdout。

[`🔗 NVD CVE-2026-123036`](https://nvd.nist.gov/vuln/detail/CVE-2026-123036) · [`🔗 lib/ansible/_internal/_task.py`](https://github.com/ansible/ansible/blob/devel/lib/ansible/_internal/_task.py) · [`🔗 Red Hat CVE 页面`](https://access.redhat.com/security/cve/CVE-2026-123036)

---

## 43. HakiOS 把苹果的 XNU 内核跑在 POCO 手机上，通过 Adreno 上的 Metal 绘制 —— 并报告了它没达到的帧率

- **Velocity:** ▮▮ rising
- **来源:** github.com/oosexgang/hakios-xnu-kernel · 创建于 2026-10-22 · 2,495★
- **标签:** `osdev` `xnu` `android` `metal` `reverse-engineering`

**HakiOS** 让苹果开源的 Darwin 内核——**XNU `xnu-8796.121.2`**——跑在 Android 手机上，「the way Android is Linux on phones: a boot loader of its own, drivers of its own, a configuration system and a version of its own」。它是研究台而非 ROM：默认从内存运行，「a reboot gives the phone back to Android」，同一个内核也能在 QEMU 中启动（`make qemu-open`），「with nothing of Apple's and nothing of any phone's」。

11 月 4 日的更新是一项图形结果。在 **POCO X5 Pro 5G** 上，项目的窗口服务器通过 **Adreno 642L 上的 Metal** 绘制，且有两种路径。`hakios-metal` 在渲染 828×1792 再拉伸到屏幕时，测得翻页 **110–115 fps**、设置页滚动 **118**、home 键 **106**；在原生 1125×2436 下，同样三项是 **101、约 90、约 90**。作为对照，UniXNU 的 Metal-on-Vulkan 路径翻页 **50–57**、滚动 **41**。

可信度的来源分布在表格两侧：setup 表把面板写成 **1080 x 2400 at 120 Hz**，而文档开头就是「**120 frames a second has not been reached**: not on hakios-metal, not on metal2vulkan, and not on OpenGL ES.」一个 bring-up 项目把没达到的数字写在达到的数字旁边，正是多数同类 README 不做的事。

许可证按目录拆分，复用前值得读：内核部分——`xnu/hakios.patch`、`xnu/files/`、`drivers/`——是苹果 XNU 的衍生作品，仍属 **Apple Public Source License 2.0**；而「everything else that is ours」（`xnuloader/` 里的引导器、`userland/src/`、工具、脚本、文档、`devices/`）是 **MIT**。苹果的操作系统、其 IPSW 固件与手机自身固件都不在仓库里——「every user obtains them from their own device and their own copy of the firmware」。这种拆分也解释了为什么 GitHub 的许可证检测把该仓库标为 `NOASSERTION`，而不是单一标识符。

**为什么重要：** 让非 Linux 内核在手机上启动是个拥挤的爱好，但让窗口服务器通过**另一个操作系统**的厂商 GPU 驱动以 90 帧以上合成，是窄得多的成就，而那句诚实的 120 Hz 告诉你剩下的 5–25% 在哪：不在合成器，而在一条尚未完成的路径上。APSL 的拆分也是个有用的先例——苹果许可下的衍生作品可以公开发布，义务是按文件而非按仓库计的。

[`🔗 oosexgang/hakios-xnu-kernel`](https://github.com/oosexgang/hakios-xnu-kernel) · [`🔗 Adreno 上的 Metal`](https://github.com/oosexgang/hakios-xnu-kernel/blob/main/docs/reference/metal.md) · [`🔗 测量记录`](https://github.com/oosexgang/hakios-xnu-kernel/blob/main/docs/reference/metal-measurements.md) · [`🔗 LICENSE`](https://github.com/oosexgang/hakios-xnu-kernel/blob/main/LICENSE)

---

## 44. 若没有新维护者接手，Mbed TLS 将在 2027 年 4 月停止发布安全修复

- **Velocity:** ▮▮ rising
- **来源:** Mbed TLS announce 邮件列表 · 2026-10-08 · HN 55 分 2026-11-03
- **标签:** `security` `mbedtls` `open-source` `maintenance` `tls`

Mbed TLS 团队在 **2026-10-08** 宣布正在「preparing for a transition in the maintenance of TLS and X.509 libraries (both contained in the Mbed TLS project)」。现有维护者「will continue to develop and maintain TF-PSA-Crypto, which remains an actively maintained part of the project」，并将「cease their involvement in their development and maintenance of Mbed TLS **from April 2027**」。

后果没有任何修饰：「Unless new maintainers have joined the project and ramped up by that time, **security incident response, security fixes, and releases will cease from April 2027**」。未来的维护安排「have not yet been determined」，团队正在寻求「engineering resources, funding, or other forms of support」，并给出了愿意接手者的邮箱。

**为什么重要：** Mbed TLS 不是小众库——它是大量嵌入式与 IoT 固件、RTOS SDK，以及那些「更新方式就是出厂烧一次固件」的产品里的 TLS 栈。一个停止发布安全修复的库并不会停止被依赖；它变成一个永久脆弱的依赖，而其消费者大多无法审计它，2027 年 4 月给了这些消费者一个采购周期去找能在 flash 预算里装下的替代品。这个模式也是生态反复重学的：由基金会核心团队维护的组件，其耐久性只等于该团队的路线图，而 TF-PSA-Crypto 才是这个团队要去的地方。

[`🔗 公告串`](https://lists.trustedfirmware.org/archives/list/mbed-tls@lists.trustedfirmware.org/thread/YPIGCB7WN6GCHOGEGKOJXUYAP7OK527W/) · [`🔗 Hacker News 讨论`](https://news.ycombinator.com/item?id=50349165)

---

## 45. vault-java-driver 在三种「调用方要求校验」的状态下构造了信任一切的 TLS 上下文

- **Velocity:** ▮ steady
- **来源:** NVD `CVE-2026-109408` · 7.4 · 发布于 2026-11-05T08:17Z · 修复于 7.0.0
- **标签:** `cve` `java` `vault` `tls` `secrets`

`CVE-2026-109408` 影响 `io.github.jopenlibs:vault-java-driver` **5.2.0 到 6.2.3**，修复于 **7.0.0**。描述对触发条件异常精确，因为共有三种，而三种都是调用方以为校验开着、实际 `SslConfig.isVerify()` 返回 false 并「the driver installs a trust-all SSLContext」的状态：

1. 传给 `VaultConfig` 的 `SslConfig` **没有调用 `build()`**；
2. 由 **Java 反序列化**恢复的 `SslConfig`；
3. **`VAULT_SSL_VERIFY` 设成 `"true"` 之外的「真值」**——例如 `1`、`yes` 或 `on`。

第三条是最会在生产配置里被找到的，因为 `1`/`yes`/`on` 是布尔环境变量的常规写法，栈里其他工具都接受。影响来自客户端携带的东西：「An attacker on the network path to the Vault server can then read the Vault token and secrets in transit and forge responses」。CWE-295（证书校验不当），**7.4**（`CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:N`）。

同一批归档里还有一条记录覆盖相同版本区间、同一个修复版本释放：`CVE-2026-112072`（**6.5**，CWE-674）——该驱动「parses Vault's JSON responses with a vendored minimal-json parser that has no nesting depth limit」，于是深层嵌套值抛出的 `StackOverflowError`「escapes `catch (Exception)` handlers and kills the reading thread」。写入侧的前提很精巧：「A Vault token that can write but not read a KV v2 path can store such a value there, so every later read of that path through the driver fails」——一个只写凭据被变成持久的读取拒绝服务。它还要求 **Vault 1.19.x 或更早**，因为「1.20 and later reject values nested deeper than 298 levels」。

溯源与时钟：两条记录都发布于 **2026-11-05T08:17:03Z**，来自同一个分配 CNA（source 为 `abd028dc-c042-4c4d-9749-38d0f850af89`），状态均为 `Received`，且各自只带一个指标——CNA 自己的 v3.1 分数，类型为 `Secondary`——还没有 `nvd@nist.gov` 指标。修复早于文书：Maven Central 上 `vault-java-driver-7.0.0.jar` 的时间戳是 **2026-11-04 23:15** UTC，比记录早约 **九小时**。

**为什么重要：** TLS 校验已启用，是对一个可能被四条代码路径设错的布尔值的断言，而这个客户端同时错在三条最容易的地方——必须调用的 builder、跳过它的反序列化器、接受 `yes` 的字符串解析器。第二条 CVE 是更安静的教训：`catch (Exception)` 抓不住 `Error`，所以没有深度限制的解析器是线程杀手，而一个只写 token 就足以把它种下去。

[`🔗 NVD CVE-2026-109408`](https://nvd.nist.gov/vuln/detail/CVE-2026-109408) · [`🔗 NVD CVE-2026-112072`](https://nvd.nist.gov/vuln/detail/CVE-2026-112072) · [`🔗 PR #78`](https://github.com/jopenlibs/vault-java-driver/pull/78)

---

## 46. OPNsense 的 ACME 插件把两个 WebGUI 字段拼进 root shell 命令 —— 9.4，修复早于记录 33 小时

- **Velocity:** ▮ steady
- **来源:** NVD `CVE-2026-123025` · 发布于 2026-11-05T07:17Z · 9.4
- **标签:** `cve` `opnsense` `command-injection` `acme` `firewall`

`CVE-2026-123025` 是 OPNsense `os-acme-client` 插件 **Google Cloud DNS 验证模块**中的 **9.4**（`CVSS:4.0/AV:N/AC:L/AT:N/PR:L/UI:N/VC:H/VI:H/VA:H/SC:H/SI:H/SA:H`），**影响 4.17 及更早**，CWE-78。机制是一个名为 prepare 的方法里少了一次转义：`DnsGcloud::prepare()`「decodes the `dns_gcloud_key` model field and directly interpolates the string fields `gcloud_account` and `gcloud_project` into a shell command passed to `proc_open()` via `LeUtils::run_shell_command()` without any validation or escaping」。所需权限是「a remote authenticated user with privileges to issue or renew certificates through the WebGUI/API」，结果是「arbitrary code execution **as root**」。

权限边界才是要仔细读的。证书续期权限听起来像一项狭窄的委派能力——正是防火墙管理员会交给管 TLS 的人的那种——而在这里它等价于边界设备上的 root shell，而边界设备是终结每条 VPN 与每条跨 VLAN 规则的那台机器。

修复先落地。`opnsense/plugins` **PR #5873**「security/acme-client: release **4.18**」于 **2026-11-03T22:21:57Z** 合并，正文致谢报告者——「Gcloud vulnerability reported by: @cppghoul」。NVD 记录发布于 **2026-11-05T07:17:25Z**，约 **33 小时**之后，`vulnStatus` 为 `Received`，唯一指标来自 `cve@mitre.org` 且类型为 `Secondary`。因此风险人群是仍停留在 4.17 及更早的人，而升级是一次插件发布，不是固件镜像。

**为什么重要：** 「一个被解码的 key、两个相邻字符串字段被拼进 shell」这个三段式形状，和今年这个 feed 在路由器、NAS、备份设备上记录过的是同一个 bug，它能存活是因为这个插件的工作本来就是 shell 出去调 `gcloud`。让它占一格的真正原因是认证故事：在防火墙上，有证书权限的已认证用户是人们很随意就会授予的角色，而记录自己的 `PR:L` 对一个最终导致 root 的 bug 来说，承担了太多分量。

> 「A remote authenticated user with privileges to issue or renew certificates through the WebGUI/API can achieve arbitrary code execution as root.」—— CVE 记录自己的描述

[`🔗 NVD CVE-2026-123025`](https://nvd.nist.gov/vuln/detail/CVE-2026-123025) · [`🔗 opnsense/plugins PR #5873`](https://github.com/opnsense/plugins/pull/5873)

---

## 47. 同策略蒸馏在分布内达到教师的 96–103%，在分布外却比 base 模型还低 2.45–16.25%

- **Velocity:** ▮ steady
- **来源:** arXiv 2611.05609 · 提交于 2026-11-03T20:53Z
- **标签:** `ai-research` `distillation` `rl` `generalization` `post-training`

多教师同策略蒸馏是 RL 之后把多个专精教师折回一个学生的标准做法。这篇论文的发现是：通常的测量方式看不到它丢掉了什么。既有工作报告「near-perfect in-distribution (IND) distillation performance」，而这「can mask incomplete capability consolidation beyond the supervised distribution」。

数字本身就是论证。在 Qwen3 模型上、覆盖数学推理、代码、agent 与长上下文能力的外推设置中，「OPD and MOPD reach **96.04–102.73%** of their teachers' IND scores. Yet their out-of-distribution (OOD) scores remain **2.45–16.25% below the base model's**」。要读两遍：蒸馏出的学生不只是分布外不如教师，而是不如它出发时的**未蒸馏 base 模型**。在三个组合式设置里，MOPD「improves IND performance over the base model, but its performance on composed tasks as OOD remains **18.19–24.34% below that of the best teachers**」。

摘要里还带着一句标题数字不会显示、方向却相反的比较：「(M)OPD also reduces OOD forgetting on average relative to its reinforcement learning (RL) baselines.」所以结论是：蒸馏比它出发时的 base 模型更差，但仍比它所取代的 RL 运行更好——回归是真的，却不是「干脆别蒸馏」的论据。

诊断是两个瓶颈——教师能力与数据覆盖——论文报告「jointly alleviating these bottlenecks eliminates OOD forgetting in our experiments and suggests the potential for generalization beyond the teacher」。机制部分是更可复用的：分析更新几何后发现，(M)OPD 的更新「smaller and more spectrally concentrated updates on average than those of the RL baselines, along with greater shared update structure under MOPD」——一个平滑拟合教师的学生，学到的是更窄的函数，而窄度在分布内评测上不可见。两条补救是 geometry-based patching 与 base-preserving replay，目标都是在匹配 IND 表现的同时保留 base 模型行为的可达性。

**为什么重要：** 蒸馏被当作无损的能力合并来卖，而这篇说代价恰好落在未进入蒸馏集的能力上——也就是学生被部署到教师从未见过的输入时的失败模式。测量教训也超出蒸馏：只有 IND 的表格，无法区分「学会了教师」与「忘掉了其他一切」，而 2.45% 是多数报告从不打印的一个很大的下限。

[`🔗 arXiv 2611.05609`](https://arxiv.org/abs/2611.05609) · [`🔗 Hugging Face daily papers`](https://huggingface.co/papers/2611.05609)

---

## 48. FrontierPhysics 把 42 位物理学家自己的研究交给 22 个模型 —— 没有任何配置通过 168 次 rollout 中的 46 次以上

- **Velocity:** ▮ steady
- **来源:** arXiv 2611.06910 · 提交于 2026-11-04T18:56Z
- **标签:** `ai-research` `agents` `benchmark` `physics` `evaluation`

**FrontierPhysics** 是一个端到端物理基准，共 **56 个任务**，每个由 **42 位物理学家**之一基于自己的研究设计，覆盖理论、计算与实验物理的**九个领域**。论文认为现有物理基准「only evaluate fixed questions, isolated sub-tasks, or paper reproduction with given solutions, and rarely check research quality alongside correctness」。这里的任务要求 agent「review the literature, develop a research plan, conduct research and experiments, and produce structured outputs and scientific manuscripts」，并由「deterministic verifiers with expert-authored rubrics」判定研究是否「correct and publishable」。

结果：「Across **22 models in 26 configurations**, no configuration passes more than **46 of its 168 rollouts**。」即上限 27.4%，每个任务三次 rollout（56 × 3 = 168），而这类数字只有在任务是某人真实问题时才会出现，而不是在蒸馏过的题目上。

值得带走的是失败分析：「Manual review of agent trajectories shows that frontier agents' main weaknesses are **insufficiently rigorous reasoning and limited expert intuition**, rather than gaps in physics knowledge or execution errors」。这不同于常见的那句「agent 跑不了代码」——模型能执行，也懂物理，只是不知道自己什么时候错了。

**为什么重要：** 这个基准用物理学家为自己工作撰写的评分规则，替代了已经饱和的选择题表面，而 27.4% 的上限诚实地描述了端到端研究自动化的现状——不是它会不会做物理，而是它能不能分辨可发表的结果与平庸的结果。它指出的弱点是专家直觉，而这是任何额外工具都修不了的那一个，因此这个基准比又一个 SWE 式分数更能指导该造什么。

[`🔗 arXiv 2611.06910`](https://arxiv.org/abs/2611.06910) · [`🔗 Hugging Face daily papers`](https://huggingface.co/papers/2611.06910)

---

## 49. neuron-explorer 推动一层里每个 MLP 神经元、保留每次 rollout，并用 256 个随机对照给结果排序

- **Velocity:** ▮ steady
- **来源:** github.com/lyramakesmusic/neuron-explorer · 创建于 2026-10-21 · 1,925★
- **标签:** `interpretability` `steering` `qwen` `mcp` `open-source`

**neuron-explorer** 是 **Qwen3.5-4B** 的 steering 优先工作台：「Every MLP neuron in a layer is pushed up and down on a few prompts, every rollout is kept, and the explorer lays the results out over a 3D view of the model」。仓库是 MIT，自 **2026-10-21** 起 **1,925 星**，并且交付的是产物而不只是工具——`explorer/cache/` 带着预计算的布局、连接与 lens 索引，服务器在 MPS、CUDA 或 CPU 上本地加载 Qwen3.5-4B 做实时受控对话。

让它不只是可视化的设计决定在 sweep 脚本里。剂量是「fractions of the median residual norm leaving the layer」——`{who, snake, orange} × {−0.7, +0.5, +0.8}` 加上 `{free} × {+3}`，每个 prompt 一条未 steering 基线——所以一次「推动」是相对模型自身尺度而非任意常数。单元按「by word-cluster mass against random-direction controls」排序（sweep 用 `--random-controls 256`）并给出百分位；`sweep/steer_lens.py` 对**每一个**神经元计算 ±0.8 推动下的下一 token **Δlogprob 与 KL**；`sweep/check_equivalence.py` 检查 HF 与 vLLM 两条 steering 路径与激活捕获是否一致；`sweep/finefineweb.py` 构造「a domain-balanced FineFineWeb sample (about 20M tokens over 66 domains)」，让神经元的触发可以在 sweep 从未碰过的文本上刻画。第 22 层在 **200 万 token** 上扫描；`sweep/run_depth.sh "4 9 13 17" 384 64` 对四层做随机子集扫描。

第四个面板是一个 agent。**Claude** 标签页运行 `claude` CLI，把 explorer 作为 **MCP server**（`explorer/agent_mcp.py`）暴露出来，它可以「reads neurons, cones and lenses, runs the live model (steering, activations, next-token logprobs, ablations), moves the map, list and highlights, and **has file tools and a shell in your home folder**」。README 补了一句边界：「The server answers only pages and tools on this machine」——这是关于监听地址的陈述，不是关于沙箱的，按前者理解才对。

**为什么重要：** 机制可解释性工具通常报告一个发现；这个工具报告的是一个对照——每条关于神经元的断言都带着它相对 256 个随机方向的百分位，而每个剂量都是该层自身残差范数的比例，这才让读者能在没有单位争论的情况下跨层比较。那个 MCP 加 shell 的面板也是这个品类走向的诚实版本：读你可解释性结果的 agent，和你正在解剖的模型跑在同一台机器上，共用同一个文件系统。

[`🔗 lyramakesmusic/neuron-explorer`](https://github.com/lyramakesmusic/neuron-explorer) · [`🔗 README`](https://github.com/lyramakesmusic/neuron-explorer/blob/main/README.md) · [`🔗 Qwen3.5-4B R/J++ lenses`](https://huggingface.co/bubskee/qwen3.5-4b-r-jpp-lenses)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-05T12:26:44Z |
| Items | 49 |
| Sources tracked | 31（Hacker News、GitHub Trending、NVD、CVE.org、CISA KEV、GitHub Advisory Database、厂商 PSIRT、arXiv、Hugging Face、厂商工程博客） |
| Update schedule | 04:03, 12:03, 20:03 UTC+8（每日 3 次） |
| Ranking | 速度加权（新鲜度 × 互动加速度 × 来源权威度） |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[前一天](../2026-11-04/) · [原始 .md](https://trending.md/zh/feed/2026-11-05.md) · [归档](../../archive/)
