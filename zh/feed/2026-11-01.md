---
date: 2026-11-01
updated: 2026-11-01T04:23:05Z
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

## 21. WordPress 的升级暂存目录既可预测又可被 Web 访问 —— 于是写入 `wp-config.php` 的可以是任何一个访客

- **Velocity:** ▮▮▮ trending
- **Source:** Wordfence CNA 记录（cveawg）· 发布于 2026-10-31T05:33Z · 预留于 2026-10-30T17:17Z
- **Tags:** `cve` `wordpress` `toctou` `rce` `upgrade`

`CVE-2026-119977` 是 WordPress 核心里的未认证远程代码执行，而描述只有一句话：「这是由于完整包核心升级过程中使用了可预测、可被 Web 访问的暂存路径。这使得未认证攻击者可以在升级窗口内于服务器上执行代码。」它被归为 **`CWE-367`（TOCTOU 竞态）**，评分 **8.1**，向量是 `CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:H`——同一个向量把 `AC:L` 换回去就是大家熟悉的 9.8，所以这半分的折扣完全来自那场竞态。受影响集合是 **25 个分支区间**，从 `4.7.0 → 4.7.38` 一直到 `7.1.0 → 7.1.3`，`defaultStatus` 为 `unaffected`；修复版本是 **7.1.4**，发布于 **2026-10-28**。

改动本身比描述更有信息量，因为它往同一个函数里加了三个防护。7.1.3 里 `unpack_package()` 用包名给工作目录命名——`$working_dir = $upgrade_folder . basename( basename( $package, '.tmp' ), '.zip' );`——而 `$upgrade_folder` 是 `wp_content_dir() . 'upgrade/'`，它是要被 Web 服务的。7.1.4 里同一个调用改走新的 `get_working_dir_name()`，追加 `'-' . wp_generate_password( 16, false )`；升级目录还多了一个 `index.php`，注释写着「升级目录是会被 Web 服务的。像核心对 wp-content 及其插件、主题目录所做的那样，阻止它被列目录，这样下面创建的工作目录名就无法通过目录索引被发现」。第三个防护在 `update-core.php`，复制步骤的 `$skip` 数组多了一项：`'wp-config.php'`，注释是「永远不要复制 wp-config.php，它可能已经被写入工作目录」。

最后这句话点出了载荷。`wp-admin/setup-config.php` 是核心里唯一会写 `wp-config.php` 的地方，而它正是记录中的第四个引用——若不拦，复制步骤会把它从暂存树搬进站点根目录，PHP 在下一个请求就会执行它。这三点防护里有两个是加固，只有 `$skip` 这一项真正移除了代码执行原语。

**Why it matters:** 自动更新是一台 WordPress 主机上最受信任的写入路径，而一个可预测的名字加上一个可列目录的目录，把「站点自己更新自己」变成了任何人都能去抢的东西。把 7.1.4 的发布公告和这条记录并排读，数字就对不上了：公告在安全更新下列出 **13** 项，对这一个是这么写的——「WordPress 升级过程中的一处弱点，可能导致升级窗口内的远程代码执行」——也就是说这条 CVE 只覆盖了那个 RCE，其余十二项在这里没有记录。该版本里有两条 XSS 的致谢给了 Anthropic。

[`🔗 CVE-2026-119977（cveawg）`](https://cveawg.mitre.org/api/cve/CVE-2026-119977) · [`🔗 WordPress 7.1.4 发布公告`](https://wordpress.org/news/2026/10/wordpress-7-1-4/) · [`🔗 7.1.4 版 `update-core.php`（`wp-config.php` 的跳过项）`](https://github.com/WordPress/wordpress-develop/blob/7.1.4/src/wp-admin/includes/update-core.php)

---

## 22. Jpom 的 9.8 只需要一个写着 `is not null` 的 HTTP 头 —— 而最新版本本身就在受影响区间内

- **Velocity:** ▮▮ rising
- **Source:** VulnCheck CNA 记录（cveawg）· 发布于 2026-10-31T17:25Z · 预留于 2026-10-31T11:44Z
- **Tags:** `cve` `auth-bypass` `java` `injection` `unpatched`

`CVE-2026-120201`：Jpom **2.10.0 至 2.11.12** 允许未认证攻击者通过往 `JPOM-USER-TOKEN` 头里塞进一个条件表达式而成为**超级管理员**。「攻击者可以发送类似 `is not null` 的值，Hutool 的 Condition 解析器会把它当作运算符，随后通过 Jpom 的脚本功能执行命令。」CNA 给了**两个框架下的两个分数**——CVSS 3.1 的 **9.8**（`AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H`）与 4.0 的 **9.3**（`…/VC:H/VI:H/VA:H`）——弱点归为 `CWE-943`（数据查询逻辑中的特殊元素中和不当），因为这个头值被当作表达式交给查询构造器，而不是作为值绑定。记录的 `packageURL` 是 `pkg:maven/org.dromara.jpom/server`，`references[]` 指向 `LoginInterceptor.java#L146` 那一行。

然后是记录里没有的那一半。最新的标签版本是 **`v2.11.12`，发布于 2025-05-06**——受影响区间的上界就是发布列表的上界，而 `defaultStatus` 是 `unaffected`，意味着它上面什么都没有。仓库（`dromara/Jpom`，1,951 星，`NOASSERTION` 许可）的 `pushed_at` 是 **2026-02-06**，也就是大约九个月没有提交、十八个月没有发版。NVD 的状态是 **`Deferred`**（2026-11-01 核查），NVD 自评的分数为零。

**Why it matters:** 注入本身很漂亮——一个 HTTP 头变成运算符，是 `' OR 1=1` 在 Java 世界的表亲——但可执行的事实是：「升级到修复版本」在这里没有指涉对象。这是昨天 Agno 那个形状的反向结局：那个区间比修复落后一个版本，而这个区间根本没有修复版本，所以缓解手段是暴露面（谁能连到这个端口），而不是版本卫生。在写下「升级」之前先看项目是否还活着，因为一个休眠的仓库会让「未修复」变成永久的，而不是暂时的。

[`🔗 CVE-2026-120201（cveawg）`](https://cveawg.mitre.org/api/cve/CVE-2026-120201) · [`🔗 VulnCheck 公告`](https://www.vulncheck.com/advisories/jpom-2.10.0-through-2.11.12-authentication-bypass-via-jpom-user-token-header) · [`🔗 dromara/Jpom 发布页`](https://github.com/dromara/Jpom/releases)

---

## 23. 红帽在一个早上发了四个 konflux-ci CVE —— 每一个都以不同方式泄露流水线自己的凭据

- **Velocity:** ▮▮ rising
- **Source:** 红帽 CNA 记录（cveawg）· 发布于 2026-10-31T08:55–08:57Z
- **Tags:** `cve` `ci-cd` `supply-chain` `secrets` `red-hat`

四条记录落在**两分钟**之内（`08:55:09Z` 到 `08:57:35Z`），全部由红帽 CNA（`secalert@redhat.com`）指派，在 NVD 上全部是 `Received`、NVD 自评分数为**零**，而每一条都是同一套交付系统里的一道不同边界：

- **`CVE-2026-116086` — 8.8**，`CWE-94`。「拥有触发自动化工作流运行权限的攻击者可造成信息泄露：向工作流脚本提供精心构造的 issue 标题」——标题未净化就进了数据查询，于是可以注入过滤指令，「API 凭据、部署密钥与内部备注等敏感信息」出现在工作流日志里。
- **`CVE-2026-114217` — 8.6**，`CWE-312`。CI 自动化「把敏感的 GitHub 访问令牌以明文形式存放在 runner 上，执行结束后也不清理」——`AV:L/PR:N/UI:R/S:C`，任何能本地接触 runner 的人都继承了仓库权限。
- **`CVE-2026-116964` — 8.4**，`CWE-94`。拿到仓库写权限后，注入到环境导出脚本里的 shell 命令会让清单同步脚本「动态求值未经验证的脚本输出」→ CDI 环境内的代码执行，`PR:H/UI:R/S:C`。
- **`CVE-2026-117681` — 8.0**，`CWE-295`，也是这一组里唯一的 `AV:A`。UI 代理「在没有默认服务证书颁发机构的环境里，会自动对内部后端的 TLS 证书校验关闭」——同时仍然附加「一个带用户模拟权限的集群级认证令牌」，于是能拦截这段流量的相邻网络攻击者直接拿到集群管理员。

**Why it matters:** 分数最高的那个只需要 CI 系统里**最低**的权限——能触发工作流——而分数最低的那个反而升级得最远。按分数排序会把分诊做反：想要集群的攻击者挑 8.0，想要一份「该偷什么」清单的攻击者挑 8.8。四条里有三条共享同一个教训：issue 标题、环境变量和清单文件在被 shell、查询或求值器读取之前，都只是「数据」。

[`🔗 CVE-2026-116086`](https://cveawg.mitre.org/api/cve/CVE-2026-116086) · [`🔗 CVE-2026-114217`](https://cveawg.mitre.org/api/cve/CVE-2026-114217) · [`🔗 CVE-2026-116964`](https://cveawg.mitre.org/api/cve/CVE-2026-116964) · [`🔗 CVE-2026-117681`](https://cveawg.mitre.org/api/cve/CVE-2026-117681)

---

## 24. Apache MINA 的 9.8 落在一个只有两个里程碑的预发布分支上，而厂商说不修

- **Velocity:** ▮ steady
- **Source:** Apache CNA 记录（cveawg）· 发布于 2026-10-31T20:17Z · 预留于 2026-10-28T17:16Z
- **Tags:** `cve` `deserialization` `java` `apache` `unsupported`

`CVE-2026-118636`：「MINA 3.0 codec 模块中的 `JavaNativeMessageDecoder` 对帧字节调用 `ObjectInputStream.readObject()` 且没有类过滤器，因此任何把它放在不可信对端之前的应用都暴露于 gadget 链 RCE。」受影响是 `3.0.0` 到 **`3.0.0-M2`**——两个预发布里程碑——而记录以厂商自己的判词开头：「**UNSUPPORTED WHEN ASSIGNED**」，接着是「由于 3.0.0 分支已停止活动，我们不计划发布修复此问题的版本」。记录给出的补救办法是**降级**：「建议用户使用最新的 Apache MINA 2.2.X 分支。」分数 **9.8**（`CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H`），由 Apache 指派；弱点是 `CWE-502`，NVD 处于 `Received`。

**Why it matters:** 未过滤的 `readObject()` 是 Java 世界最经典的 RCE 原语，9.8 当之无愧，但决定行动的是区间——这不是「MINA 有漏洞」，而是「一条已废弃分支的里程碑构建有漏洞，而修复办法就是你之前用的那个版本」。与 10 月 27 日 Vysper 那条同形：`UNSUPPORTED WHEN ASSIGNED` 是对分支生命周期的陈述，缓解手段是迁移，而不是等补丁窗口。

[`🔗 CVE-2026-118636（cveawg）`](https://cveawg.mitre.org/api/cve/CVE-2026-118636) · [`🔗 Apache MINA 公告（lists.apache.org）`](https://lists.apache.org/thread.html/h76nwcrkvsffhsk2kq6cjzc6srtnty7x)

---

## 25. Sign in with Apple 会把一个 `user` 字段交给浏览器 —— 而 Elixir 的 `assent` 把它合并**覆盖**在已验证的令牌之上

- **Velocity:** ▮▮ rising
- **Source:** EEF CNA 记录（cveawg）· 发布于 2026-10-30T23:55Z
- **Tags:** `cve` `authentication` `oidc` `elixir` `claim-confusion`

`CVE-2026-117656` 在 `CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:N` 上是 **9.3**，描述读起来就是一个教科书式的合并顺序 bug：Apple「把用户的姓名以 `user` 表单参数的形式 POST 到回调端点，而这个参数由浏览器提交、由客户端控制」，`Assent.Strategy.Apple.callback/2` 会解析它，`fetch_user/2` 则「把它合并覆盖在已验证 ID 令牌的声明之上，于是未经验证的映射获胜」。攻击者用自己的 Apple ID 完成 Sign in with Apple、改掉 `user`，「就能替换 `sub`、`email` 以及任何其他声明」——于是任何按返回的 subject 或 email 查找、关联或授权账号的应用，就把别人的账号交了出去。影响 `assent` **0.1.25 起、低于 0.3.2**；分类是 `CWE-290`（冒充绕过认证）加 **`CWE-349`（接受与可信数据混在一起的多余不可信数据）**。

来源值得单独说清楚，因为记录中唯一的那个分数看起来像插槽之争、其实不是：NVD 把 **9.3 标为 `Secondary`，来源是 EEF 分配者的 UUID**——也就是 CNA 给自己的记录评了分，而 NVD 尚未分析（`Received`，2026-11-01 核查）。引用包括 GitHub 公告 `GHSA-9fr5-g44g-9526`、EEF 页面、一条 OSV 记录，以及修复提交 `a2d331e8`。

**Why it matters:** `user` 字段是 Sign in with Apple 流程里唯一走浏览器、而不是走签名令牌的那一块——它只在首次授权时出现，这也正是各个解析器把它当作便利字段而非凭据的原因。合并方向就是整个漏洞：一组已验证的声明可以**覆盖**不可信的声明，而反过来合并的库，等于悄悄把 OIDC 本来要防的账号劫持又装了回来。

[`🔗 CVE-2026-117656（cveawg）`](https://cveawg.mitre.org/api/cve/CVE-2026-117656) · [`🔗 GHSA-9fr5-g44g-9526`](https://github.com/pow-auth/assent/security/advisories/GHSA-9fr5-g44g-9526) · [`🔗 EEF CVE 页面`](https://cna.erlef.org/cves/CVE-2026-117656.html)

---

## 26. Anthropic 说水印不影响质量 —— 而该方法自己的补充材料说它牺牲的是多样性，同时一篇新论文从可检测性这一侧下手

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 36+ 分 · 约 6 小时前（约 05:50 UTC+8）
- **Tags:** `watermarking` `llm` `evaluation` `eu-ai-act` `research`

Anthropic 关于水印文本的说明页写得很直白：「Watermarking does not impact the quality of Claude's output.」这个周末被顶起来的博客则去翻 Anthropic 方法所依据的那份文件——Google SynthID-Text 的补充材料——并引了那句限定它的话：「While single-sequence non-distortion guarantees the quality of each individual response, it does not necessarily preserve diversity across multiple responses」，并补充说这可能「lower the overall quality of a system which generates many responses then selects the best one」。这个区别在单条回复的评测里是看不见的，而厂商的人类研究正是那么做的：Natzir Turrado 用论文自己的设置在开放模型上复现 SynthID-Text 的过程中，同一个提示采样五次，水印模型有五次之四开头几乎一模一样（「My heart still sings/dances when I think back to my trip to the quaint coastal town of…」），而未加水印的版本有三种不同的开头。

研究侧这周有推进。**TextSeal2**（`arXiv 2610.40613`）用高斯 copula 把多个密钥合并成一个虚拟密钥，「keeps its signal under speculative decoding」——被拒绝的草稿令牌会用同一套密钥重新赛跑——并且「adds no measurable inference latency」。在输出令牌多样性相同的前提下，它以 `10^-3` 的假阳性率比前代多检出 **8 到 22 个百分点**的 100 令牌回答；在投机解码下，在相同接受率下比 TextSeal 与 textGrain 分别多检出 **18 和 22 个百分点**。

**Why it matters:** 这场争论其实不是「有损 vs 无损」，而是分母。无失真保证按构造就是「每一条序列」的，所以厂商的主张和反复重试的现实可以同时成立，而用户真正看到的症状（按重试，又拿回同一段）完全活在这个缝隙里。一个在不触碰多样性的前提下多拿 8–22 个百分点的检测器是有用的方向，因为它移除的是取舍本身，而不是争论取舍——但这三份都是别人的评测，没有一份是在 Claude 上做的回归研究。

[`🔗 Anthropic — Claude 文本水印如何工作`](https://www.anthropic.com/news/claude-text-watermark) · [`🔗 AI text watermarking and quality loss`](https://blog.keyvan.net/p/ai-text-watermarking-and-quality) · [`🔗 TextSeal2（arXiv 2610.40613）`](https://arxiv.org/abs/2610.40613) · [`🔗 讨论（Hacker News）`](https://news.ycombinator.com/item?id=50320599)

---

## 27. L3G-World 让世界模型的记忆随场景大小增长、而不是随流的长度增长 —— 9 FPS，显存渲染快 359 倍

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.40614 · HF Papers 38 赞
- **Tags:** `research` `world-model` `gaussian-splatting` `real-time` `video`

交互式世界模型只有一个缩放问题、两副面孔：保留最近 N 帧，一致性会随视野衰减；保留显式 3D 场景，记忆会随流长度增长。**L3G-World** 提出「潜在 3D 高斯记忆」（Latent 3D Gaussian Memory），其中「记忆更新器在新观测到的区域生成高斯并细化已有的，使记忆随场景范围增长，而不是随流长度增长」。关键技巧很小但承重：每个高斯存一个 **VAE 潜特征**，于是记忆「可以直接渲染进 DiT 的潜空间，无需 VAE 重新编码」——此前的 3D 记忆要重新编码 RGB 渲染，这正是让循环慢到无法交互的原因。

报告数字（表述为「针对每项指标，相对于最高效的既有 3D 记忆基线」）：**3D 图元最多少 38.6 倍**、**记忆更新快 3.2 倍**、**记忆渲染快 359 倍**，实时生成达到 **9 FPS**。

**Why it matters:** 「针对每项指标」这个说法很诚实，也正是要保留的——三个比值对着三个可能不同的基线，是三个事实而不是一个加速比，而 359× 最容易被单独引用。设计主张经得起这个保留：把记忆的上界系于「范围」而不是「时间」，正是交互式世界的成本独立于「你逛了多久」的原因，而这是结构性的修复，不是更快的实现。

[`🔗 arXiv 2610.40614 — L3G-World`](https://arxiv.org/abs/2610.40614) · [`🔗 HF Papers（趋势）`](https://huggingface.co/papers/2610.40614)

---

## 28. SpecSlot 把图像的细节量与全局注意力的序列长度解耦

- **Velocity:** ▮ steady
- **Source:** arXiv 2610.40647 · HF Papers 36 赞
- **Tags:** `research` `diffusion` `image-generation` `attention` `efficiency`

像素空间的生成式 Transformer 每个 patch 一个 token，于是细节越细、全局注意力序列越长、代价平方级上升。这篇论文的观察是这种耦合并不必要：低频结构受益于全局交换，高频细节是局部的。**SpecSlot** 把每个空间锚点扩展成多个槽，每个槽「拥有一段不相交的 DCT 系数」；只有每个锚点里最低频的那个槽参与全局注意力，所有槽在局部交互——从而把锚点密度与频谱细分分开。一个空间头对频谱预测做局部修正，生成状态、目标与损失仍留在像素空间。

实测：ImageNet-256 上与**算力对齐**的 JiT 对照模型 FID 相当且收敛更快；ImageNet-512 上相对该对照 FID 改善 **2.84** 且算力少 **3.9%**，与 JiT-B/16 只差 0.69 FID 而成本低 **38.2%**；文生图上在 DPG-Bench 上超过 JiT-B/8 **1.06**，前向成本低 **40.6%**。

**Why it matters:** 这本质上是一个频域论证穿上了架构改动的外衣，而「算力对齐的对照」正是让它可以被核对的东西——多数效率论文拿来比的是一个从未调到同预算的基线。与更大模型之间那 0.69 FID 的差距才是诚实的表述：这买到的是「单位算力下的持平」，不是新的质量上限。

[`🔗 arXiv 2610.40647 — Read, Allocate, Route`](https://arxiv.org/abs/2610.40647) · [`🔗 HF Papers（趋势）`](https://huggingface.co/papers/2610.40647)

---

## 29. `idol` 把一张照片在两秒内变成一百万个高斯 —— 而它的两个输入编码器是门控的

- **Velocity:** ▮▮ rising
- **Source:** Hugging Face 模型卡 · 218 赞 · 2,367 次下载 · 创建于 2026-10-28
- **Tags:** `image-to-3d` `gaussian-splatting` `apache-2` `vision` `release`

`speridlabs/idol` 输入「物体的一张图」，输出「多达一百万个 3D 高斯，包括照片从未展示过的那几面」——具体是 **1,048,576** 个高斯，写成标准的 3DGS `.ply`，外加处理后的输入图和预测相机。它会自己抠背景、重新取景，运行在 **7.2 GB 显存**上，模型卡称它「can run in under 2 seconds」。权重约 **3 GB**，许可 **Apache-2.0**，SDK 在另一个仓库（`speridlabs/idol-sdk`，Python 3.10+、PyTorch 2.5+、NVIDIA CUDA）。

部署约束写在第一步的说明里，而不是脚注：idol 通过两个**门控**的 Hugging Face 模型读取输入——`facebook/dinov3-vith16plus-pretrain-lvd1689m` 与 `black-forest-labs/FLUX.2-dev`（只取 VAE）——所以要「用 Hugging Face 账号接受它们的条款，然后登录一次」；没有权限时它「会在下载任何东西之前停下，并说明缺什么」。

**Why it matters:** 一个 Apache-2.0 的产物藏在门控编码器后面，就不是可复现的流水线，而这正是如今多数开放 3D 与视频模型的发货形状：权重宽松、输入受限。这对离线构建、CI，以及任何假定「模型卡上的许可覆盖了你实际要下载的东西」的分发来说都要紧。四天里 218 赞对 2,367 次下载，也仍然是那个常见的趋势偏斜——注意力远比使用先到。

[`🔗 speridlabs/idol（模型卡）`](https://huggingface.co/speridlabs/idol) · [`🔗 speridlabs/idol-sdk`](https://github.com/speridlabs/idol-sdk)

---

## 30. 在 140 字符的 demo 上继续预训练，困惑度从 28.63 降到 8.57 —— 而作者说输出丢了点味道

- **Velocity:** ▮ steady
- **Source:** Hacker News · 48+ 分 · 约 10 小时前（约 02:08 UTC+8）
- **Tags:** `research` `continued-pretraining` `code-generation` `perplexity` `demoscene`

一篇讲怎么教模型说 **Dwitter** 语言的文章——140 字符的 JavaScript demo，整个效果就压在几个紧凑表达式里。作者在语料上做了继续预训练，并测量了前后的 surprisal：在 **30 条留出的 dweet** 上，**困惑度从 28.63 降到 8.57**，降幅最大的是「那些不熟悉的编程习语」，而不是普通代码。课程表来自社区自己：Dwitter 给每条投稿打「awesomeness」分，作者按它取了前 5,000 条。

这份报告保留了多数文章会剪掉的那一半。程序变得更一致了，而在作者自己的判断里，它们少了某种味道——这正是上面那条水印新闻从另一侧描述的同一个取舍。文章还给出了这个领域「为什么难生成而不只是稀有」的干净论证：拿一条 140 字符的程序，删掉最后 30 个字符，即便字母表只有 64 个符号，「也有约 1.5 x 10^54 种可能的补全串」，而几乎全部无效或无趣。

**Why it matters:** 可测的那一半（困惑度降 3.3 倍）与不可测的那一半（输出不再有趣）被一起报告，这在领域自适应类文章里很少见，而这恰恰是「要不要做风格微调」的决策所需要的。可迁移的技术是课程表——用社区自己的评分而不是长度或时间给语料排序，小数据集就开始表现得像一个精选过的数据集。

[`🔗 Post training a model to explore Demoscenes`](https://datavorous.com/writing/demoscener/) · [`🔗 讨论（Hacker News）`](https://news.ycombinator.com/item?id=50318442)

---

## 31. Karpathy 用一个上午把 Hacker News 评论做成了一个 YouTube —— 4 万条评论收敛成 6,454 个视频

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 882+ 分 · 约 8 小时前（约 03:56 UTC+8）
- **Tags:** `agents` `claude-code` `personal-software` `recommendation` `vibe-coding`

起点是一句抱怨，产物是 [hackertube.org](https://hackertube.org/)：不要算法推荐，只要「Hacker News 上被推荐过的那些视频」。按描述，构建过程是：Opus 5.5 跑在 Claude Code 桌面版里、中等思考强度，「下载了 HackerNews 的全部评论，过滤，然后用 Sonnet 在一个 Workflow（Claude Code 的功能）里跑，去掉垃圾，最终收敛到 4 万条推荐了某个 YouTube 视频的评论」——得到 **6,454 个视频**，由「少数几个人在 2007–2026 年间」在 **150 个话题**下推荐过。界面是 YouTube 的克隆，但有三处刻意的不同：用视频的 **50% 帧**而不是上传封面；所有状态放在本地浏览器会话里、没有账号；导出站点数据「交给你的 agent，让它轻松做出自己的版本」。

诚实的账目写在补充里。唯一的手工活是申请一个 Google Cloud API key、开一台 VPS、买一个域名；之后的部署、加固、优化全部交了出去。Karpathy 自己的总结是：「I don't actually do anything resembling traditional engineering anymore.」

**Why it matters:** 故事是数据集，不是速度。十九年的 HN 评论是一份「人类精选过」的推荐语料，只是从没有人按**目标对象**给它建过索引，而模型在这里干的活是抽取与去重，不是生成——恰恰是 agent 输出可以对着来源逐条核对的那一类任务。「两小时」是真的，也是误导的：那口钟从语料、key 和服务器都存在之后才开始走。

[`🔗 HackerTube — karpathy`](https://karpathy.bearblog.dev/hacker-tube/) · [`🔗 hackertube.org`](https://hackertube.org/) · [`🔗 讨论（Hacker News）`](https://news.ycombinator.com/item?id=50319510)

---

## 32. Memdoor 把 GVS5H 的五轮 harness 重建成一个 YAML 工作流 —— 9.8/10，对 Fable 5 的 8.0，50 次运行全部公开

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 124+ 分 · 约 5 小时前（约 06:46 UTC+8）
- **Tags:** `agents` `benchmark` `reproduction` `go` `self-hosted`

`guregodevo/memdoor`（Apache-2.0、Go、单一静态二进制、创建于 2026-10-05、**32 星**）在自己的 README 里下了个大注：「五个 Qwen3.8-27B agent 在 LiveCodeBench Hard 上击败 Fable 5，作为一个 Memdoor 工作流」——GVS5H 的 harness「用作者的原始 prompt 与循环重建，跑他们列表上的前十题、每题五轮：均值 **9.8/10**，作者自己的 harness 是 9.6，Fable 5 单次调用是 8.0。50 次运行全部公开：每一次请求、回复、程序和评分器输出。」

先读范围再读标题。十道题、五轮、一个模型家族，以及对原 harness 的 **0.2 分优势**——在十道题上这完全落在运行间噪声里，所以结论是「复现」，不是「改进」。真正承重的比较是 9.8 对 **单次调用 8.0**，那才是 GVS5H 那条线的主张：27B 模型跑五轮比前沿模型跑一次更有价值，而不是 27B 更强。

它外面的工具才是可复用的部分：工作流是带内置检查与审批门禁的文件，一个显式的决策模型坐在聊天模型前面以削减 token 开销，运行可以落在通过 SSH 连上的机器上而窗口留在你的笔记本，退出码就是回执——`0` 完成、`2` 失败、`1` 停止、`3` 停在审批门禁。无账号，遥测默认关闭。

**Why it matters:** 这正是原结果所需要的复现——由无关作者给出的第二份实现，公开全部轨迹而不是一张汇总表——同时也提醒：「击败 Fable 5」继承了一个十道题切分的全部保留条件。可迁移的产物是 harness：一个不指定模型、能指向本地运行时的工作流，正是「基准」与「产品」的差别。

[`🔗 guregodevo/memdoor`](https://github.com/guregodevo/memdoor) · [`🔗 team-solve 工作流`](https://github.com/guregodevo/memdoor/tree/main/examples/workflows/team-solve) · [`🔗 讨论（Hacker News）`](https://news.ycombinator.com/item?id=50320995)

---

## 33. Prospero 是一个 C++ 写的编码 harness，主张这个品类不该吃掉几个 GB 内存

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 181+ 分 · 约 16 小时前（约 19:54 UTC+8）
- **Tags:** `agent-infra` `coding-harness` `cpp` `local-llm` `desktop-control`

Chris Wellons 的抱怨很具体：好的开放权重模型已经能在消费级硬件上跑，但「多数 harness 是用 Web 技术栈构建的，吃掉巨量内存」，而 harness 本质上只是一个网络客户端粘着一个子进程。**Prospero**（`skeeto/prospero`，**Unlicense**，93 星，创建于 2026-10-21，**v0.10.0** 发布于 2026-11-01T03:56Z）是一个用他自己 C++ 风格写的 Dear ImGui 停靠式应用，主张是「比其他 harness 少用大约两个数量级的资源，且不牺牲功能」。

功能清单才是让这个资源主张变得有意思而非苦行的部分：子 agent、agent 之间互发消息，以及一个可部署到 SSH 或 WSL 上的无头引擎，让 Linux 机器干活而 UI 留在本地并可以重新接回。配置是 INI 文件，可以 `include` 一个 URL——URL include 受限制，并有「一条硬规则，禁止任何可能出现在 shell 命令里的东西」，同时文章也承认一份共享配置「可以通过把某个环境变量当作 API key 并提供它控制的端点来把它抽出来」。它不内置任何 provider，且「不能用你的 Claude 订阅」——你自己带 llama.cpp、OpenRouter 或 API key。

**Why it matters:** 资源主张是设计目标，不是测量——文章没有给出任何基线，所以「两个数量级」是一个待你用自己机器上的 harness 进程去核实的靶子。底下的论证是成立的，而且一行 `top` 就能测：当 harness 比它驱动的东西还大时，OOM killer 的选择就不再可预测，而文章里那个 fuzz 战役的例子——几小时后回来看，harness 没了、目标毫发无损——正是这件事不再只是审美抱怨的地方。注意这个拆分：仓库是 Unlicense 的 harness，另有一个 Professional Edition 内嵌了跨架构桌面控制的引擎。

[`🔗 skeeto/prospero`](https://github.com/skeeto/prospero) · [`🔗 Prospero: a new coding harness for a more civilized age`](https://nullprogram.com/blog/2026/10/31/) · [`🔗 讨论（Hacker News）`](https://news.ycombinator.com/item?id=50315226)

---

## 34. Pivot 靠多干 69% 的活让 GROUP BY 更快 —— 那个核是内存受限，不是忙

- **Velocity:** ▮▮ rising
- **Source:** Pivot 博客 · 发布于 2026-10-28
- **Tags:** `databases` `performance` `cpu` `cache` `clickbench`

查询是 ClickBench 99M 行 hits 表上的 `SELECT count(*), UserID FROM hits GROUP BY UserID`，大约 **1,700 万个不同分组**，绑定到 EPYC 9124 的一个核上，以便读那些计数器。朴素的哈希表聚合要 **3.9 秒**，预热后 **3.6 秒**。`perf stat` 说出了有意思的部分：**50.1%** 的槽位卡在内存上（`backend_bound_memory`），只有 **16.1%** 在退休微操作，从 DRAM 拉了 76,190,837 次按需填充。

修法是 radix 分区，而且它故意更费事：对每个 key 做哈希，取高 12 位，把行推进 **4,096** 个分区之一，再逐个分区聚合成一张小哈希表。每一行仍然要被哈希并插入一次——现在还多了一次分区写入。结果是 **3.3 秒**、预热后 **2.7 秒**；内存停顿降到 **23.5%**，退休率升到 **32.2%**，退休操作数从 **11,431,618,219 涨到 19,350,459,182**——大约**多 69% 的指令**换**少 25% 的时间**。

**Why it matters:** 这是「CPU 100%」与「CPU 在干活」是两个不同测量值的最小干净演示，也说明在缓存是瓶颈时「拿指令换 DRAM 等待」这笔交易几乎总是划算的。诊断成本是单个核上的一次 `perf stat`；不做的代价则是看着利用率的曲线，去得出「查询引擎效率低」的结论，而它其实只是在等。

[`🔗 It's the memory latency, stupid`](https://pivotlake.io/blog/its-the-memory-latency-stupid/) · [`🔗 ClickBench`](https://benchmark.clickhouse.com/)

---

## 35. Contra 的带注释 NES 反汇编现在能在浏览器里跑 —— 6502 汇编，转写成 C，再编译成 WebAssembly

- **Velocity:** ▮ steady
- **Source:** Hacker News · 69+ 分 · 约 9 小时前（约 03:18 UTC+8）
- **Tags:** `retro` `wasm` `reverse-engineering` `nes` `cc65`

`epoyraz/nes-contra-us` 是 *Contra*（美版）与 *Probotector* 的带注释反汇编，「以及把汇编重新组装成与游戏逐字节一致产物的构建脚本」，用 **cc65** 对着合法提供的 `baserom.nes`（MD5 `7BDAD8B4A7A56A634C9649D20BD3011B`）编译——仓库既不含 ROM 也不含全部资源，`assets.txt` 记录了每份资源在基础镜像里的偏移与长度，供构建时抽取。新的是那个移植：仓库现在带着 `port/`（`contra_core`、`platform_sdl`、`platform_web`）与 `web/`，线上页面加载一个 Emscripten 模块工厂（`MODULARIZE`、`EXPORT_NAME=ContraModule`），于是游戏跑的是转写出来的 C，而不是在模拟器里跑 ROM。

保留条件全是仓库形状的：**4 星**、**没有许可文件**，而 README 讲的是反汇编与重新组装，不是浏览器移植——也就是说 WebAssembly 构建是个你需要自己去读的目录，而不是一个有文档的发布物。

**Why it matters:** 逐字节一致是其他一切的前提，也是最容易被跳过的一步——一份不能重新组装出同一 ROM 的反汇编，无法告诉你对游戏逻辑的转写是否忠实，因为你没有可比对的基准。许可缺口在这里值得同等重量：一份完整的、受版权保护游戏的反汇编且没有 LICENSE 文件，首先是一个再分发问题，其次才是代码质量问题，这也大概正是为什么 README 里写着 ROM 哈希要求，而构建产物不在仓库里。

[`🔗 epoyraz/nes-contra-us`](https://github.com/epoyraz/nes-contra-us) · [`🔗 浏览器可玩版本`](https://epoyraz.github.io/nes-contra-us/) · [`🔗 讨论（Hacker News）`](https://news.ycombinator.com/item?id=50319169)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-01T04:23:05Z |
| Items | 35 |
| Sources tracked | 21（GitHub Trending、Hacker News、arXiv、Hugging Face、NVD／CVE 记录、cveawg CNA、CISA KEV、CISA-ADP、厂商公告、WordPress、VulnCheck、Apache、红帽、EEF、Anthropic、Google Research、Pivot、ClickBench、nullprogram、Datavorous、speridlabs） |
| Update schedule | 04:03, 12:03, 20:03 UTC+8（每日 3 次） |
| Ranking | 按速度加权（时效 × 互动加速度 × 来源权威度） |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[前一日](2026-10-31.md) · [原始 .md](https://trending.md/zh/feed/latest.md) · [归档](../archive/)
