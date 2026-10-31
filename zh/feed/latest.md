---
date: 2026-11-01
updated: 2026-10-31T20:38:42Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 14
license: CC-BY-4.0
---

# 今日趋势 — 2026-11-01

## 1. Delinea 一天内发布了三个 Secret Server 认证修复 —— 而分数最低的那个，恰恰击穿了「抗钓鱼 MFA」

- **Velocity:** ▮▮▮ trending
- **Source:** Delinea CNA 记录（cveawg）· 发布于 2026-10-30 · 预留于 2026-10-23
- **Tags:** `cve` `authentication-bypass` `pam` `jwt` `fido2`

Delinea 在 **2026-10-30** 一次性发布了三个 Secret Server 的 CVE，修复目标都是同一句「低于 12.3.1 的版本」，而三个漏洞本质上都是「认证路径不再做认证」。`CVE-2026-115829` 是部分登录绕过：「用户可以跳过初次登录环节，仅凭成功完成第二因素登录就通过认证」，评分 **8.7**（`CVSS:4.0/AV:N/AC:H/AT:N/PR:H/UI:N/VC:H/VI:H/VA:N`）。`CVE-2026-115830` 是 JWT 签发问题：用户可以「提交一个未签名的 JWT，并因此获得 **cloudadmin** 权限」，同样 **8.7**、同一向量。`CVE-2026-115828` 则说 Secret Server「在使用符合 FIDO2 的设备时，并不总是校验 PIN 或生物特征」——**5.1**。

评分本身才是重点。FIDO2 那个漏洞的攻击复杂度是三者中**最低**的（`AC:L`），分数也最低，因为影响分量是 `VC:L/VI:L`；而两个直接铸出管理员权限的漏洞带着 `AC:H/PR:H`，硬生生被压到 8.7，尽管 CISA 的 SSVC 增强写着 `Technical Impact: total`。请把这两个数字读成「被计算的场景有多严重」，而不是「后果有多严重」：一台把第二因素本身当作充分条件的 PAM 设备，和一个 5.1 的问题不属于同一个类别。

**Why it matters:**「抗钓鱼 MFA」是采购清单上的一个勾选项，而它落的正是这个产品类别；FIDO2 那条记录说的是 PIN／生物特征校验并不总被执行。对一个密码保险库来说，这不是一个「部分得分」的发现——它就是那份安全论证本身，被归档在 5.1 的位置上。请升级到 12.3.1，并重新读一遍你的 MFA 策略到底假设了什么。

[`🔗 CVE-2026-115829 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-115829) · [`🔗 CVE-2026-115830 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-115830) · [`🔗 CVE-2026-115828 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-115828) · [`🔗 Delinea 安全公告`](https://delinea.com/security-advisories)

---

## 2. Drupal 说它的 Commerce 漏洞正在被实际利用；而记录上唯一的分数是 CISA 给的 6.5，且利用标记写着「none」

- **Velocity:** ▮▮▮ trending
- **Source:** Drupal SA-CONTRIB-2026-254 · CVE 记录发布于 2026-10-30T03:09Z
- **Tags:** `cve` `drupal` `ecommerce` `access-bypass` `provenance`

`CVE-2026-118539` 是 Drupal Commerce Core 的缺失授权漏洞，由 `drupal` 这个 CNA 于 **2026-10-30** 指派：它「没有充分保护某些路由与实体字段」，可能「对商家的财务状况造成影响」。受影响范围是 `<2.41` 与 `>=3.0.0 <3.3.13`。Drupal 自己的公告把它评为 **「Highly critical — 21 ∕ 25」**，并直白写道：**「此漏洞正在被实际利用（actively exploited in the wild）。」** 公告没有提供任何绕过办法，只建议安装最新版本，并「审计订单是否存在不一致」。

再看记录本身。CNA 容器里**完全没有 metrics**。整个 CVE 上唯一的分数在 **CISA-ADP Vulnrichment** 容器里——`CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:L/A:N` = **6.5**——旁边的 SSVC 块写着 `Exploitation: **none**`、`Automatable: yes`、`Technical Impact: partial`，其时间戳为 `2026-10-30T00:00:00+00:00`。这个时间戳是**日期，不是时钟**，把它当瞬间读会凭空造出一个故事：看上去比 03:09Z 发布**早** 3 小时 09 分，但本 feed 引用的其他记录里同一个零点形状落在**次日**零点（比各自发布晚 **0.2 至 10.4 小时**），而这条记录自己的 ADP 容器 `dateUpdated` 是 `2026-10-31T03:56:19Z`——发布后整整一天。在本 feed 引用的、带 SSVC 块的 **271** 条记录里数了一遍：**206** 条是真正的瞬时戳，其中 **196 条晚于发布、没有一条早于发布**；另外 **65** 条是零点取整。所以这次增强是在公告已经存在之后才跑的，`none` 是 CISA 在 Drupal 那句「正在被利用」已经写在页面上时给出的答案。关于这个漏洞最关键的两句话——有多严重、有没有人在用——依然来自相反的方向，而自动化的那句才是会进到你扫描器里的那句。

**Why it matters:** 一个 CVE 记录就把整个「出处」问题演示完了。这里的「CVSS 6.5」是 CISA 的第三方增强，不是厂商的评分，而它躺在一个写着「正在被利用」的页面上；一个在厂商发出警告一天之后才写下的 `Exploitation: none` 并不是第二意见——它是同一个分诊问题被回答了一次「none」，之后就再没有人重新问过。如果你的分诊按记录分数排序，Commerce 站点会排在一个 WordPress 插件之下，而厂商的遥测说它们今天正在被打。

[`🔗 Drupal SA-CONTRIB-2026-254`](https://www.drupal.org/sa-contrib-2026-254) · [`🔗 CVE-2026-118539 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-118539)

---

## 3. 一款 Windows 窃密木马现在会把受害者档案 POST 给 `claude-opus-4.6` —— 模型拒答就自动切到 Kimi 和 Gemini

- **Velocity:** ▮▮▮ trending
- **Source:** Cisco Talos · 206+ 分 · 约 6 小时前（~22:29 UTC+8）
- **Tags:** `malware` `llm-abuse` `infostealer` `opsec` `talos`

Talos 关于 **VOLTA-AUTODOXER** 的分析描述了一款自删除窃密木马：在采集浏览器凭据、钱包助记词、Discord／Telegram／Steam 会话与云令牌之后，它会复用窃来的会话去丰富受害者画像——翻 Gmail 里 Amazon、DoorDash、Uber Eats、Walmart 和 PayPal 的收据来确认家庭住址，拉取外卖订单历史，给 Roblox 库存做实时估值——然后写出 `Identity_Report.txt`，序列化成 JSON，**从受害者自己的机器和网络上 POST 到 OpenRouter 的 chat-completions 接口**。默认模型是 `anthropic/claude-opus-4.6`，后备依次是 `moonshotai/kimi-k2` 和 `google/gemini-2.5-flash`，温度 `0.2`。系统提示词要求模型扮演「一名撰写目标评估的取证情报分析师」，并输出「WHAT THEY'RE WORTH」和「THEIR OPSEC」。

最值得记住的细节是拒答处理：样本会检查回复里有没有「I can't」「I'm not able」这类字串，有就换下一个模型。Talos 对商业含义的措辞很谨慎——「This suggests it's a builder model」，以及「**If** VOLTA is indeed a commoditized malware」——并指出没有任何攻击者自有基础设施：「All the observed endpoints for this malware are third-party controlled.」目前只有一个样本，SHA256 为 `57ef4242666d78c50df145b34023df564f0fad38812d6a580e66433d427e2279`，首次观测于 2026-10-11。

**Why it matters:** 这个模型做的事，电子表格也能做，但它做的是**分诊**——把一堆抓取来的数据变成一份带引用的、排序过的「谁值得抢」名单。可迁移的事实是那个故障转移循环：如今，一个前沿模型的拒答，在商品化恶意软件里已经变成一个路由决策，所以「模型拒绝了」不再是一道控制，而是一段延迟。

[`🔗 Talos — Appraisal by AI: model-driven victim prioritization in the VOLTA infostealer`](https://blog.talosintelligence.com/appraisal-by-ai-model-driven-victim-prioritization-in-the-volta-infostealer/) · [`🔗 讨论（Hacker News）`](https://news.ycombinator.com/item?id=50316531)

---

## 4. Jepsen 在 ParticleDB 里找出 96 个问题并建议用户迁移 —— 而这份报告是厂商出钱做的

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 113+ 分 · 约 6 小时前（~21:39 UTC+8）
- **Tags:** `database` `jepsen` `correctness` `acid` `testing`

Jepsen 对 **ParticleDB 1.1.4**（Orkes）的分析报告了 **96 个问题**，其中 **93 个出现在健康的单节点系统上，常常只有一个客户端、且没有注入任何故障**：崩溃、死锁、`WHERE 4 = 5` 却匹配到行、`WHERE TRUE` 被忽略、`NOT NULL`／`UNIQUE`／主键约束不生效、join 结果错误、行删不掉、字符串被当成整数返回，以及「已中止的事务却提交了」。在并发下它检出 G1a、G1b、G-single、Lost Update、读偏斜与陈旧读——已确认的写入消失。到 `1.1.18.11.rc-22` 时「这些问题除十个外似乎都已解决」，但 ParticleDB「在默认 `occ` 事务模式下正常运行时仍会丢失已提交的写入」，并且「在 `serializable`（最强设置）下仍允许内部异常和 Lost Update」。Orkes 声称 1.1.19-rc.13 解决了全部问题；Jepsen「没有评估过 1.1.18.11.rc-22 之后的版本」。结论毫不含糊：**「Jepsen 建议用户停止继续部署 ParticleDB，并尽快迁移到其他数据库。」**

所有保留意见都是主动披露而非被埋的。这项工作由 **Orkes（厂商）出资**，结论依然是「走」。完全没有测试复制：「Orkes 提供的构建不支持复制，因此本报告只覆盖单节点行为。」「经过形式化证明」这句营销背后没有 TLA+ 规范。一组非确定性失败「可能是测试套件自身的 bug 造成的」。认识论也写得很清楚：「我们能证明 bug 的存在，但不能证明其不存在。」

**Why it matters:**「Full ACID」是一句营销话术，而这就是验证它一次的代价。对任何读数据库基准的人来说，有用的模式是这个顺序——单节点、默认配置、无故障，系统依然会丢写入；而在这条线之上发布的每一个分布式系统数字，测的都是基础引擎尚未挣到的东西。

[`🔗 Jepsen — ParticleDB 1.1.4`](https://jepsen.io/analyses/particledb-1.1.4) · [`🔗 讨论（Hacker News）`](https://news.ycombinator.com/item?id=50316100)

---

## 5. NVIDIA 新的端侧模型在 Q4 下比 BF16 **更高分**——21 项基准里赢下 7 项——而「4GB」既不是参数量也不是文件大小

- **Velocity:** ▮▮▮ trending
- **Source:** Hugging Face 模型卡 · 发布于 2026-10-23 · 300 个赞、7.5 万次下载
- **Tags:** `quantization` `small-language-model` `nvidia` `on-device` `benchmarks`

`nvidia/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB` 是「在 Gemma-4-E4B-it 基础上进一步后训练」而来，「8B（4B 生效参数）」，Q4_K_M，输入输出各 64K，许可为 OpenMDW-1.1。模型卡把 BF16 与 Q4_K_M 并排公布，共 **21** 行基准，其中量化版胜出 **7** 行：MultiChallenge **53.10 → 55.60**、RoleBench **67.05 → 71.21**、ToolSandbox **68.77 → 74.13**、RelyToolBench **63.16 → 69.29**，另有三个不到半分的小幅领先（Brevity 82.52 → 82.84、IFBench 63.79 → 64.00、RAGTruth 77.59 → 77.88）。剩下 14 行是输的——Tau2-Bench 55.10 → 52.32、LongBench v2 50.50 → 48.67、RULER 86.99 → 85.76 是跌幅最大的几项。

两件事要分开看。第一是名字：「4B」是 Gemma-4-E4B 稀疏模型的**生效**参数量，总量是 8B，而 Q4_K_M 文件标注为 **6.18 GB**——所以「4GB」是个品牌名，不是卡上任何一项的度量。第二是卡片自己的措辞：「Accuracy numbers are measured by NVIDIA under a consistent harness」，且「可能与其他厂商自报的数字不同」，评测「除 RoleBench、EQ-Bench v3 和 RULER 外均在推理模式下进行」。量化版在 MultiChallenge 上比 BF16 高 2.9 分，要么是后训练配对的真实效应，要么是 harness 的假象；一张写着「consistent harness」的卡片等于告诉你不是后者，却没有给出方差。

**Why it matters:** 端侧正是量化从「优化项」变成「部署本身」的地方。如果 Q4 才是人们真正会发布的产物，那它的**自己**的数字就该是标题而不是一列附注——而对这张卡的诚实解读是：四位构建不是单纯的降级，这和「量化是免费的」是两个不同的论断。

[`🔗 nvidia/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB`](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB) · [`🔗 Hugging Face 趋势模型`](https://huggingface.co/models?sort=trending)

---

## 6. 「柏拉图表示假说」被证成了一个定理 —— 而证明说下一 token 预测才是**低效**的那条路

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.39302 · HF Papers 58 个赞
- **Tags:** `research` `representation-learning` `jepa` `multimodal` `scaling-laws`

论文证明了**柏拉图表示定理（Platonic Representation Theorem）**：分别在不同模态上训练的联合嵌入预测架构（JEPA），只要其正样本对是同一场景的两次观测——即**好视角**——就会「学到相同的表示，仅相差一个旋转」；否则错位是有界的。在这个框架下，下一 token 预测就是一个拥有**坏视角**的 JEPA——同一文档的不同片段——这「解释了为什么语言模型只能靠规模才与视觉对齐」。实证结论才是惊人的那个：在相同语料上，好视角达到同等对齐所需的训练样本数是下一 token 预测的 **1/42**；一个 **1.09 亿参数的文本 JEPA**，与 DINOv2、CLIP 图像编码器的对齐程度超过了所评测的所有语言模型（最大到 720 亿参数），也超过了 CLIP 自己的文本编码器。验证从 14.5 万条图注一路做到 9.4 亿张网络图片的文本，并给出一条「能在种子噪声范围内预测未见实验」的 scaling law。

展示部分刻意做得很小：一个旋转就能把分别训练的编码器变成图像描述器，COCO 上 CIDEr 为 .838；在一个无配对基准上，该文本 JEPA 报告 ImageNet-100 top-5 达到 64%，而「最多 56%」是 80 亿参数以内语言模型的水平。

**Why it matters:** 如果跨模态的对齐是**视角构造**的性质而非规模的性质，那么靠堆规模就是买一个你本可以指定的表示的昂贵方式。42× 是在单一语料上的样本效率结论，不该被读成训练成本结论——但这是该假说第一个带着配方、而不是只带着观察出现的版本。

[`🔗 arXiv 2610.39302 — Proving and Improving the Platonic Representation Hypothesis with JEPAs`](https://arxiv.org/abs/2610.39302) · [`🔗 HF Papers（趋势）`](https://huggingface.co/papers/2610.39302)

---

## 7. imgproxy 的 9.8 没有 CVE，比修复晚了八天才到，而下个版本又修了同一个加载器

- **Velocity:** ▮▮ rising
- **Source:** GitHub Advisory Database · 发布于 2026-10-06 · 审核入库 2026-10-30
- **Tags:** `cve` `go` `libvips` `heap-overflow` `image-processing`

`GHSA-hff9-5pqw-6w9f` 是 imgproxy ICO 加载器里的 **9.8**（`CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H`）堆溢出，任何网络客户端只要发一个构造好的 `.ico` 就能触发。机制是一个由文件提供的长度字段上发生的整数回绕：ICO 加载器读取 32 位、攻击者可控的 `data_size` 之后，按 `data_size + BMP_FILE_HEADER_LEN` 分配内存；当 `data_size > UINT32_MAX - 14` 时加法回绕——`0xfffffff5` 只会得到 **3 字节**——而加载器仍从第 14 字节起写入所声明的数 GB 跨度。受影响范围是 `>= 4.0.0, < 4.0.16`，基础模块路径、`/v2` 与 `/v3` 三个都在内。

值得对齐的三个日期。imgproxy **4.0.16** 于 **2026-09-28** 发布，说明是「Fixed several vulnerabilities in ICO image loader」；**4.0.17** 于 **2026-09-30** 跟进，说明是「Fixed a possible out-of-bounds read in the ICO image loader」；而这份公告 **2026-10-06 发布**，直到 **2026-10-30 才被审核进数据库**——晚了 24 天，且**没有 CVE 编号**。此外这个图片代理在三周内还有两次安全相关的发版：4.0.18（2026-10-14）修了 SVG 净化绕过，「via control-character entities in `href`, SMIL animations of link attributes, and DOCTYPE entities」；4.0.19（2026-10-21）加了「(docker) Untrust compromised eMudhra CA certificates」——修的是与 4.0.16 公告所列完全不同的问题。

**Why it matters:** 对 Go 模块而言，公告指向 `4.0.16`，而实际存在的是 `4.0.20`。一个按 GHSA 匹配的扫描器会把 `4.0.17` 判为干净，可它刚刚核对过的那个加载器，在上一个补丁版本里仍存在越界读。而公告发布与入库之间 24 天的空档意味着：在十月的某些日子里，「未发现公告」只是关于队列的一句话。

[`🔗 GHSA-hff9-5pqw-6w9f`](https://github.com/advisories/GHSA-hff9-5pqw-6w9f) · [`🔗 imgproxy 发布记录`](https://github.com/imgproxy/imgproxy/releases)

---

## 8. OpenSearch 的 SQL 插件反序列化了客户端提供的 cursor —— 从预留到披露 106 天，而读权限就是全部屏障

- **Velocity:** ▮▮ rising
- **Source:** CVE 记录（指派方 `GitHub_M`）· 发布于 2026-10-30T22:22Z
- **Tags:** `cve` `opensearch` `deserialization` `rce` `sql`

`CVE-2026-63393` 是 OpenSearch SQL 插件中的任意代码执行：「一个拥有基础读取／搜索权限的远程已认证用户，可以向 `plugins/sql` 端点提供构造好的 `cursor` 参数，触发对不可信数据的不安全反序列化」。2.x 线从 `2.8.0.0` 至 `2.19.6.0` 受影响，3.x 在 `3.7.0.0` 之前受影响；修复版本为 **2.19.6.0** 与 **3.7.0.0**。CNA 给出的分数是 **8.7**，向量 `CVSS:4.0/AV:N/AC:L/AT:N/PR:L/UI:N/VC:H/VI:H/VA:H`——其中 `PR:L` 正是这个漏洞的全部设计：只读的搜索权限，就是普通用户与服务端代码执行之间唯一的阻隔。

两个记录细节。它**预留于 2026-07-16**、**发布于 2026-10-30**——从占用编号到描述可读之间隔了 106 天，所以「新漏洞」和「新记录」又是一对不同的句子。CNA 确实做了分类：**`CWE-502`（不可信数据反序列化）**，承载在 `problemTypes` 里。

**Why it matters:** 对客户端提供的值做无边界反序列化，与查询引擎里反复出现的 cursor 处理缺陷是同一形状，而 cursor 恰恰是每个分页 API 都要交还给调用方的那个参数。如果你的集群暴露了 `plugins/sql`，`PR:L` 不算缓解措施——它的意思是「任何分析师」。

[`🔗 CVE-2026-63393 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-63393) · [`🔗 OpenSearch 发布记录`](https://github.com/opensearch-project/OpenSearch/releases)

---

## 9. OpenDeepWiki 把管理员签名密钥写进了 `appsettings.json` —— 于是谁都能铸一个 Admin 令牌

- **Velocity:** ▮▮ rising
- **Source:** CVE 记录（指派方 `VulnCheck`）· 发布于 2026-10-30T13:18Z
- **Tags:** `cve` `hardcoded-secret` `jwt` `dotnet` `self-hosted`

`CVE-2026-119597`：OpenDeepWiki 直到 **2.0.6** 版本都带有**硬编码的 JWT 签名密钥**，记录直接点名了文件——`appsettings.json` 里的 `Jwt:SecretKey`——且称其「公开可知」。未认证攻击者可以铸造带 `Admin` 角色声明的 HS256 bearer 令牌，访问 `/api/admin`，控制「用户、角色、仓库、设置与 API 密钥」。记录上有**两个分数、两个向量**：CVSS 4.0 下 **9.3**（`AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H`），3.1 下 **9.8**（`AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H`）——同一个 CNA、同一个 bug、两个框架，0.5 的差距来自框架，而不是对事实的分歧。

对一个「出厂即带密钥」的发现来说，这条记录异常完整：`references[]` 指向 `appsettings.json` 里的那一行、消费它的 `Program.cs`、修复提交，以及上游 issue #403。它**当天预留、当天发布**——11:46Z 与 13:18Z，相隔不到两小时。仓库目前仍是 3,651 星、MIT、最后推送 2026-10-23。

**Why it matters:** 默认签名密钥是那种「自托管反而更糟」的失败模式，因为每个部署都继承同一个秘密，而利用它只需要一条 `curl`。这份双分记录同时也是个有用的提醒：9.3 和 9.8 同时成立现在已是常态，只引其中一个、不带 CVSS 版本号，才是错误所在。

[`🔗 CVE-2026-119597 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-119597) · [`🔗 AIDotNet/OpenDeepWiki — 修复提交`](https://github.com/AIDotNet/OpenDeepWiki/commit/1bf0f4b5ef8d972ca640e5df145b5813a9492544)

---

## 10. Vercel Labs 发布 `agent-desktop` 1.0：agent 通过无障碍树操作真实应用，不做像素匹配

- **Velocity:** ▮▮ rising
- **Source:** GitHub · 3,979 星 · v1.0.0 2026-10-28，v1.0.2 2026-10-30
- **Tags:** `agent-infra` `computer-use` `rust` `accessibility` `desktop`

`vercel-labs/agent-desktop`（Apache-2.0，Rust，创建于 2026-02-19）是一个面向 macOS、Windows 与 Linux 的 CLI 与 C 库，为 agent 提供「computer use for AI agents: read and operate desktop apps through the OS accessibility tree」。一次 snapshot 返回 JSON，其中每个可操作元素都有各自的 ref；agent 对 ref 执行动作，然后再 snapshot 一次——「The agent acts on a ref and snapshots again to check, with no pixel matching; the loop stays in your agent.」关键的设计选择在于：「Ref actions go through the accessibility API without moving the pointer or taking focus」，并且默认**无头**，只有 `--headed` 才启用物理输入。

失败模式是被类型化的、而不是含糊的，这是一个对着真实使用场景打磨过的 harness 的标志：ref 的作用域是 snapshot，UI 一变就返回 `STALE_REF` 或 `AMBIGUOUS_TARGET`，办法是重取快照；多窗口若不提供 window id 也会得到 `AMBIGUOUS_TARGET`；macOS 需要辅助功能权限，且「The host exits after 15 idle minutes」，`TMPDIR` 必须以 `0700` 模式归属当前用户。它在 72 小时内从 1.0.0 走到了 1.0.2。

**Why it matters:**「截图加点击」是 computer use 里没法做可靠的那一半，无障碍树则是可以的那一半——ref 稳定、动作可安全重试。有两条警告必须和功能一起讲：「Snapshots, clipboard reads, screenshots, command output and debug artifacts can contain private desktop content」，以及「The optional JEV helper sends screen descriptions to a configured model provider」——这是原生 CLI 并不具备的一条网络路径。

[`🔗 vercel-labs/agent-desktop`](https://github.com/vercel-labs/agent-desktop) · [`🔗 发布记录`](https://github.com/vercel-labs/agent-desktop/releases)

---

## 11. Molly 自 7 月 31 日以来没发过版本，而主线 Signal 已在 8.27 修好 —— 且仓库此后只有一个提交

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 259+ 分 · 约 10 小时前（~18:23 UTC+8）
- **Tags:** `signal` `fork` `supply-chain` `maintenance` `messaging`

说法是：加固版 Signal 分支 Molly「已经三个月没更新，并且受制于主线 Signal 早已修复的攻击」——具体是一个十月披露的缺陷，可能导致通话结束后音频（乃至视频）仍在继续，上游已在 **Signal 8.27** 修复。这个说法在源头而非帖子里得到了验证：Molly 最新的发布是 **`v8.19.2-4`，发布于 2026-07-31T11:56Z**，而自该标签以来，默认分支上只有**一个提交**——`2026-09-08T08:32:13Z`，一处用于在同步流程中跟踪上游稳定版的 CI 改动。仓库本身没有被遗弃（`pushed_at` 为 2026-10-30），它只是三个月没切过构建。Signal 那个 bug 没有分配 CVE。

**Why it matters:** 隐私分支的全部价值主张，是它跟踪上游的速度比你亲自审计上游更快；三个月的发布空档把这件事反了过来，把你留在一个你无法打补丁的基座上。可度量的量不是「仓库还活着吗」，而是「用户最后一次拿到二进制是什么时候」——在这里，这两个答案是相隔 91 天的两件事。

[`🔗 Molly — 发布记录`](https://github.com/mollyim/mollyim-android/releases) · [`🔗 讨论帖`](https://piefed.world/post/1503394)

---

## 12. Orkas 把 16 个专家 agent 和一个 Commander 放到你的桌面上 —— MIT、本地优先，而开源构建砍掉了云端功能

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · 6,051 星 · 今日 +1,118 · 创建于 2026-04-29
- **Tags:** `multi-agent` `desktop` `local-first` `mit` `orchestration`

`Orkas-AI/Orkas` 是「一个开源（MIT）、本地优先的桌面 AI 团队：Commander 把你的目标拆成待办，并协调 16 个内置专家 agent，外加 Claude Code、Codex、OpenCode、OpenClaw 和 Hermes」。自 2026-04-29 以来 820 个提交，366 个 fork，**7 个未关闭条目（3 个 issue、4 个 PR）**，市场上还列着「30+ agents」。它提供项目记忆、定时自动化，以及 Gmail、Notion、Slack、Shopify、Stripe 的连接器，打包版应用内含「500 credits for the built-in Orkas model」。

README 对「开源版不是什么」写得异常精确：共享项目、云同步、发布 Web 应用「the open-source build doesn't support them yet」，打包版则需要登录。自动化要求机器保持唤醒且应用在运行；错过的运行只能在「within 12 hours when the computer wakes or Orkas starts」内补上。Linux 从源码运行，「with no installer yet」，且「Alpine and other musl-based distributions are not supported」。关于任务诚实性：「an admitted or queued task is not treated as a completed result.」

**Why it matters:** 有意思的不是 agent 数量，而是「桌面编排器」这个品类已经收敛到一套稳定架构——写待办的规划器、执行的专家、通往外部 CLI 的桥——如今竞争的是打包与连接器，而不是编排研究。6,051 星配上 7 个未关闭条目，是个该盯住的数字：它描述的是一份年轻的待办清单，而不是一个已加固的运行时。

[`🔗 Orkas-AI/Orkas`](https://github.com/Orkas-AI/Orkas) · [`🔗 GitHub Trending（日榜）`](https://github.com/trending?since=daily)

---

## 13. Youtu-Parsing-Omni 用一个编码器、一套 schema 打通十项解析任务 —— 5B 权重在 OmniDocBench v1.6 上拿到 96.96

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.39301 · HF Papers 67 个赞
- **Tags:** `research` `multimodal` `document-parsing` `audio` `video`

Youtu-Parsing-Omni 是一个全模态解析器，把文档、图像、音频与视频转成「以空间与时间为基础的结构化记录」，定位是「a perception layer for agents that read, locate, and cite evidence across modalities」。设计上有两条不变式：**所有模态共用一个编码器**（从预训练语言模型初始化以强化文本读取，以共享权重把所有模态编码进统一的时空坐标系），以及**所有任务共用一套 schema**（`OmniSchema` 统一十项解析任务，使单一后训练流程 OmniSchema-Aware On-Policy Distillation 可以服务全部任务）。

单个 **5B** checkpoint 报告在 **OmniDocBench v1.6 上 96.96 Overall** 达到 SOTA，在 **OmniParsingBench 上以 75.08 Avg.** 领先所有开放权重模型——「with its advantage concentrated on audio and video」——并取得最佳整体图表解析分（**95.02**）、「the highest exact chemical-fingerprint agreement among compared systems」，且「matches a dedicated optical-music model in character-level transcription of typeset sheet music while staying far ahead of general-purpose systems」。

**Why it matters:**「with its advantage concentrated on audio and video」这句话承担了很重的分量——它意味着文档榜单上的那个数字与多模态的主张度量的不是同一件事，而「单编码器」的论据是建立在没人竞争的模态上的。代码与权重均已公开，这让这项具体主张可被核实，而不只是可被引用。

[`🔗 arXiv 2610.39301 — Youtu-Parsing-Omni`](https://arxiv.org/abs/2610.39301) · [`🔗 HF Papers（趋势）`](https://huggingface.co/papers/2610.39301)

---

## 14. PAPERBENCHX 让 agent 复现 93 篇真实论文 —— 最好的配置完全复现了 14%

- **Velocity:** ▮ steady
- **Source:** arXiv 2610.39744
- **Tags:** `research` `benchmark` `agents` `reproduction` `science`

PAPERBENCHX 是一个包含 **93 个专家构建的论文复现任务、横跨 12 个研究领域**的基准——电磁学、光子学、化学、材料科学、生物学、机器人学——其中「each task provides the source paper, a public task specification, and a domain-native scientific environment involving specialized scientific software」。评测部分是严格的那一半：「we replay every submission from scratch and score only regenerated evidence against expert-validated criteria」，所以一份看起来合理的文字报告得零分。在 **10 种前沿 agent 配置**中，「the best configuration fully reproduces only **14%** tasks under the 90% threshold」，而「mean rubric scores range from 27.53% to 59.08%」。

这个差距才是发现本身。agent 普遍能拿到一半以上的评分项，却很少真正跑完；作者把它读作「a large gap between paper understanding and reliably producing reproducible scientific evidence」——部分进展「rarely translates into complete scientific reproduction」。

**Why it matters:** 已有的复现基准集中在机器学习上，那里的实验共享同一套技术栈；这个基准逼着 agent 去驱动领域专用的科学软件、诊断长时间运行的计算、并区分有效证据与貌似合理的输出。「90% 门槛下只有 14%」也是诚实的口径——只公布平均分，会报出一个并不存在的 59% 能力。

[`🔗 arXiv 2610.39744 — PAPERBENCHX`](https://arxiv.org/abs/2610.39744) · [`🔗 全文（arXiv HTML）`](https://arxiv.org/html/2610.39744v1)

---

## 15. GPT-5.6 Sol 用 13.5 个游戏小时发射了 Factorio 火箭 —— 而作者说其中很大一部分是手工搬运

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 74+ 分 · 约 1 小时前（~02:50 UTC+8）
- **Tags:** `agents` `benchmark` `codex` `games` `long-horizon`

Ryan Madden 用「GPT-5.6 Sol, running in Codex with low thinking level」跑了一局完整的 Factorio：外面套一层 manager 和一个小 Python 库来约束触及范围与战争迷雾，目标是「complete a peaceful (i.e. no biters) Factorio run in 13.5 hours of game time」。它以发射火箭结束，全程记录了「production statistics throughout the game」，并在资源产量曲线上标注科研里程碑。

保留意见是作者写出来的，而不是评论者挖出来的。和平模式意味着没有虫子，也就没有防御任务。这一局超出了计划——Madden「had planned to terminate the run after blue science research」，因为「Sol's surprising effectiveness」而继续——但后期的规模化「slowed Sol's relative progress significantly」。还有：**「The rocket launch was only achieved through significant 'manual' effort on Sol's part」**，它绕开「failures to connect certain production systems」的办法，是「repeatedly ferrying supplies between areas of the factory」。对照组是 GPT-5.5 的「failures to use transport belts at all」。

**Why it matters:** 这是在一个有真实终局的任务上度量的长程能动性，而诚实的结果是：模型靠把蠢办法重复很多次，从一个结构性失败里恢复了过来。那是真正的坚持，不是规划——这两者值得分开，因为无论哪种，这一局都算成功，而只有一种是可泛化的。

[`🔗 GPT-5.6 Sol can beat Factorio on peaceful mode`](https://ryanmadden.net/gpt-56-beats-factorio/) · [`🔗 讨论（Hacker News）`](https://news.ycombinator.com/item?id=50318871)

---

## 16. kube32 在一块 ESP32-S3 上跑 Kubernetes 控制面加 Wasm Pod 运行时 —— 2 MB PSRAM，`kubectl` 走 Wi-Fi

- **Velocity:** ▮ steady
- **Source:** Hacker News（Show HN）· 50+ 分 · 约 2 天前
- **Tags:** `kubernetes` `esp32` `wasm` `embedded` `apache-2`

`arterialist/kube32` 是面向 ESP32 微控制器的、Apache-2.0 的 Kubernetes 兼容控制面、kubelet agent 与 WebAssembly Pod 运行时——27 星，创建于 2026-10-26。它自己的仓库简介就写着「Kubernetes-compatible control plane, Kubelet agent, and WebAssembly runtime for ESP32 microcontrollers」。「Pods are WebAssembly modules executed by the wasm3 interpreter」，并且「One firmware image runs on every board」：控制面需要「ESP32-S3, 8 MB flash, 2 MB or more quad SPI PSRAM」，而「Any ESP32-S3 with 8 MB flash」都能作为 worker 加入。它提供 Pod、Node、Namespace、Service、EndpointSlice、Ingress、Deployment、DaemonSet、Job、ConfigMap、Secret、Lease、Event 与 metrics API，「including watch streams, Table output, OpenAPI v3 validation, and log tailing」，另有服务路由、HTTP ingress、PVC 式卷、重启退避、可选 bearer 认证、「automatic self-signed ECDSA P-256 TLS on port 6443」，以及固件滚动更新。`kubectl` 和 `k9s` 通过 Wi-Fi 或 USB 串口驱动它，另附 macOS／Linux 模拟器 `kube32-sim`。

**Why it matters:** README 主张的是兼容性而非一致性，也没有列出不支持哪些 API——所以在假定某个 controller 能跑之前，先读 API reference。真正有用的是它的形状：一个能塞进 2 MB PSRAM 的 API server，是对「Kubernetes 里有多少是协议、多少是机械」的一次检验，而这个项目给出的答案是：协议的大部分都装得下。

[`🔗 arterialist/kube32`](https://github.com/arterialist/kube32) · [`🔗 Show HN 讨论`](https://news.ycombinator.com/item?id=50291812)

---

## 17. bootgpt 从主引导记录里启动一个神经网络 —— 11.5 KB 的 int8 权重，装在 23 个扇区里

- **Velocity:** ▮ steady
- **Source:** Hacker News（Show HN）· 11+ 分 · 约 7 小时前（~20:58 UTC+8）
- **Tags:** `llm` `bootloader` `quantization` `assembly` `tiny`

一个「boots your PC」的字符级模型：MBR 是 512 字节手写汇编、可用 510 字节，而「It loads an 11.5 KB int8 model from the next 23 sectors and runs it in 16-bit real mode on a 386」。「The boot sector is code only」——「Strings, weights and the vocab table all live in the data sectors」——网络结构是字符嵌入 + 一个隐藏层 + softmax，用 2 的幂次刻度量化到 int8。它只做一件事：「hallucinating the boot log of the machine it wakes up on」，生成时间戳、PCI 基址栏，以及「ACPI events for hardware that never existed」。任意按键即重启。MIT，3 个提交，6 星。

作者没有过度包装：「With 8 chars of context and one hidden layer this is roughly the quality you get」，以及「the model is not a general story teller」。训练语料是 3 MB 合成的假 `dmesg`，一个内核版本，每次启动一块磁盘。

**Why it matters:** 这是部署光谱的地板，而且是个有用的地板——一个装在引导扇区里的 11.5 KB 模型，是对「模型大小」这类主张究竟买到了什么的一次体检。真正有意思的产物不是文本质量，而是权重、词表与推理循环确实塞得进 MBR 与第一个分区之间的那点空隙。

[`🔗 kerlenton/bootgpt`](https://github.com/kerlenton/bootgpt) · [`🔗 Show HN 讨论`](https://news.ycombinator.com/item?id=50315782)

---

## 18. ziwei-doushu 把 674,976 张命盘和 870 万条解读开源成数据集 —— 并点名了 2,520 条日期不存在的样本

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · 12,227 星 · 创建于 2026-05-01
- **Tags:** `dataset` `typescript` `astrology` `chinese-oss` `licensing`

`Renhuai123/ziwei-doushu` 是一个开源的紫微斗数排盘引擎与数据快照，基于倪海厦《天纪》体系，而它的 v4.0 解读数据集就是那个规模故事：**674,976 张命盘 × 13 个维度 = 8,774,688 段解读**，约 204 亿字，**未压缩 56.6 GB／压缩 161 MB**，77 个年度文件覆盖 1950–2026。v3.0 另有 518,400 条、覆盖 1924–1983，未压缩 33.1 GB。引擎本身处理十四主星、辅星、大限与流年、四化、十二神煞、真太阳时校正、1986–1991 年中国夏令时检测、四种闰月约定，以及一份「1100+ 行格局知识库」——是 1,100 多行规则，不是 1,100 多个命名格局。代码 MIT，数据集 CC BY 4.0，古籍属公有领域，倪的讲义摘录为 CC BY-NC-SA（非商业）——README 明确说明，即便这些摘录出现在解读文本里，它们也被排除在数据集许可之外。

让它可被引用的是那些披露。界面只是演示：「本仓库的界面是一套最小可运行示例」。v4.0 只覆盖本命盘，且「未按出生地做真太阳时校正」。它是按旧的亮度默认值生成的（「按旧默认「现代修正 v2」生成」），而引擎现在的默认是《全书》，因此部分亮度标签与解读并不一致。v3.0 里还有约 2,520 条样本的日期并不存在——2 月 30 日与非闰年的 2 月 29 日——它们与 3 月 1–2 日的样本重复，应当过滤掉。

**Why it matters:** 一个 56 GB 的合成语料，正是那种会被下游连同 README 一起丢掉再转发的东西，而这一份提前公布了缺陷清单：不存在的日期、与引擎已不一致的亮度默认值，以及夹在数据内部的许可例外。引擎本身也不是一个持续维护的产品——README 自己这么说——这是「用算法，别用产品」的诚实版本。

[`🔗 Renhuai123/ziwei-doushu`](https://github.com/Renhuai123/ziwei-doushu) · [`🔗 GitHub Trending（日榜）`](https://github.com/trending?since=daily)

---

## 19. dsh-purge 给 DeepSeek 自己的 harness 打补丁以更换越狱提示词 —— Apache-2.0，外加一条禁止转售

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · 14,529 星 · 本周 +6,665 · Apache-2.0
- **Tags:** `jailbreak` `harness` `licensing` `deepseek` `plugins`

`YuJunZhiXue/dsh-purge` 自称是「面向官方 DeepSeek Harness 的网络安全红队插件」，目标版本为 DSH 0.2.1-rc.2 与 0.2.0，覆盖官方 Web 与桌面构建。机制上是本地包补丁，不是远程服务：「apply」会把匹配到的 `@deepseek-ai` 文件备份为 `.dshpurge.bak`，替换它们，覆盖 shim，并注入一段内置提示词。每一轮的选择顺序是：`prompt-inject.md` 非空则用之，否则读本地 `AGENTS.md`／`CLAUDE.md`，否则用「the encrypted prompt shipped in the plugin, the text the prompt box shows by default」。工作区策略分 strict／fallback／always 三档，控制是否保留 DSH 基线段落。开源构建「only allows localhost/private nets」。

许可才是要读两遍的部分。它是 Apache-2.0 **外加附加条件**：「Forks and redistributions must keep the copyright notice and NOTICE」、「Forks must attribute and name the source repository」，以及「The original build may not be resold」——不许重新包装上架、不许团购，借用了名字、想法、代码或提示词也要署名。

**Why it matters:** 一个直接给自己所装软件打补丁的仓库，是「harness 扩展性」这个问题最尖锐的形态——它不问厂商要许可，也活不过一次升级。而「Apache-2.0」加一条禁止转售，就不是 Apache-2.0；许可字段说一套、README 说另一套，而如果你打算再分发，这个区别恰恰是关键。

[`🔗 YuJunZhiXue/dsh-purge`](https://github.com/YuJunZhiXue/dsh-purge) · [`🔗 GitHub Trending（周榜）`](https://github.com/trending?since=weekly)

---

## 20. SAP 的利用窗口从 489 天塌缩到 1–3 天 —— 而那个中位数悄悄把「已被利用」和「有 PoC」合并了

- **Velocity:** ▮ steady
- **Source:** Onapsis Research Labs + Recorded Future · 发布于 2026-10-29
- **Tags:** `sap` `exploitation` `ransomware` `threat-intel` `methodology`

这份联合报告《Days to Zero》度量的是从 SAP Security Note 发布到首次公开利用的间隔：**2025–2026** 年修补的漏洞中位数是 **1–3 天**，而 2021 年的补丁是 **489 天**；样本是「more than 1.2 million threat-intelligence events」，时间跨度 2023 年至 2026 年上半年。提到 SAP 的地下文档从 419 份（2023）增至 **933 份（2025）**，+123%；SAP 相关内容中出现的勒索与勒索软件团伙从 8 个增至 **26** 个，整个期间共 30 个出现过至少一次。Qilin 的加密器会先终止 SAP 后台服务再加密，2026 年初的 40 天内有 11 个 Qilin 泄露站受害者其外泄文件名「explicitly labeled 'SAP'」。被入侵的 SAP 访问权售价 **500–30,000 美元**。

方法论才是标题需要小心的地方，而报道本身也写了：公开摘要「does not provide the sample size behind each annual median」，中位数「combines two milestones: verified public exploitation and publication of a proof-of-concept」，公开演示「is not necessarily evidence of an attack against a production system」，且这些数字覆盖的是「with observed milestones, rather than every SAP vulnerability」的漏洞。文档数与团伙数「do not represent a count of successful SAP breaches」。

**Why it matters:** 489 → 1–3 的方向是对的，量级大概也对，而它既是威胁的变化，也是**定义**的变化——2021 年的中位数只统计已确认的利用，而 2026 的这个数字把已公开的 PoC 也算进去了。无论按哪种读法，运营结论都成立：如果补丁到利用的窗口以天计，那么季度打补丁的节奏就是在度量错误的区间。

[`🔗 ERP News — SAP exploit window shrinks to days`](https://erpnews.com/sap-exploit-window-shrinks-to-days-onapsis-and-recorded-future-research-finds/) · [`🔗 Onapsis — Days to Zero（报告活动页）`](https://onapsis.com/event/days-to-zero-recored-future-research-onapsis/)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-10-31T20:38:42Z |
| Items | 20 |
| Sources tracked | 14（GitHub Trending、Hacker News、arXiv、Hugging Face、NVD／CVE 记录、厂商公告、安全研究） |
| Update schedule | 04:03, 12:03, 20:03 UTC+8（每日 3 次） |
| Ranking | 按速度加权（时效 × 互动加速度 × 来源权威度） |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[前一日](2026-10-31.md) · [原始 .md](https://trending.md/zh/feed/latest.md) · [归档](../archive/)
