---
date: 2026-11-03
updated: 2026-11-03T04:25:33Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 22
license: CC-BY-4.0
---

# 今日趋势 — 2026-11-03

## 1. Astra 直接读写神经网络权重——50 轮编辑把 Qwen3.5-0.8B 在 MATH-500 上从 7.9% 拉到 48.1%

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 702 pts · 约 20 小时前（约 08:03 UTC+8）
- **Tags:** `llm` `interpretability` `weight-editing` `research` `mit-csail`

Rikiya Takehi、Jayden Teoh、Alex Zhang 和 Omar Khattab（MIT CSAIL）的博客文章报告：GPT-6 Astra 可以不经优化器、不经梯度，直接检查和修改模型的参数。小规模实验中权重以文本形式喂入，较大网络则通过 Python 沙箱；两种设定的规则相同：不允许任何训练或梯度信息。展示从"读"一路走到"写"：在未被告知游戏选项的情况下，它认出了全部四个 17,253 权重 PPO 策略各自对应的游戏；在一项"车爬上坡"任务中，它一次尝试改动 **3.5%** 的权重，把 1,024 个回合的成功率从 **0% 提到 100%**。在三个 MinAtar 游戏中，它在没有任何环境反馈的情况下一次性手写的网络在 Breakout 上拿到 **517.4**，而训练了 5 亿步的 PPO 只有 **25.3**（1 亿步为 15.8）；Asterix 上逼近（53.2 对 55.2），Seaquest 上达到 PPO 的 60%（53.1 对 88.9）。

会被大量引用的是 Qwen 那个结果，而它在这篇博客自己的表格里对应的是 **50 次前向传播**这一行——同一循环在 10 次和 25 次时只到 **12.3%** 与 **14.1%**。经过这 50 次编辑，Astra 改动了 Qwen3.5-0.8B **0.016%** 的权重（累计 131,072 个值），把 MATH-500 从 **7.9% 提到 48.1%**，GSM8K 从 13.8% 到 67.1%，IFEval 从 21.0% 到 62.3%，同时 MATH-500 里撞上 32,768 token 上限的答案占比从 **93% 降到 33.1%**。真正"一次性"成立的是**车**那个结果，不是这个：那里它一次尝试就改动了策略 **3.5%** 的权重。作者自己对这个数字的解读比标题窄：Astra 定位到的是一个 Qwen 模型卡本来就警告过的"推理死循环"并把它拆掉，而且**"编辑权重可以移除一个掩盖了能力的障碍，但无法添加模型本不具备的能力。"** 在 Gemma 3 270M 上——那里瓶颈不是死循环——编辑让 MATH-500 的变动不超过约 1 个百分点。

**为什么重要：** 那句限定语是承重的，不是装饰。这里展示的是一条**修复**通道：不需要训练数据，也不需要目标模型跑一次前向传播（50 次那一行里的传播是 Astra 自己的），恰好适用于模型卡本身已经点名的那类故障，而不是训练的替代品。作者称结果为"exciting but still limited"，理由是上下文长度与 harness 效率。所以请把 7.9 → 48.1 读成"移除障碍"，而不是"增加能力"。

[`🔗 Weight-Space Programming（MIT CSAIL）`](https://rikiyat.github.io/blog/weight-space-programming/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50341174)

---

## 2. python-jose 从至少 3.5.0 起就接受空 HMAC 密钥——9.1 在 ID 被预留后 1 小时 47 分发布，且没有可安装的修复版本

- **Velocity:** ▮▮▮ trending
- **Source:** VulnCheck CNA（cveawg）· 记录发布于 2026-11-02 · 议题自 2026-03-08 起未关闭
- **Tags:** `cve` `python` `jwt` `authentication-bypass` `unmaintained`

`CVE-2026-120459` 指出 python-jose "至 3.5.0"（含 3.5.0）允许未认证攻击者伪造 JWT，原因是 `HMACKey` 与 `CryptographyHMACKey` 接受零长度 HMAC 密钥。当应用的 HS256/HS384/HS512 校验密钥解析为空时——记录举的例子是 `k` 为空的 `oct` JWK——`jwt.decode` 会用这个空密钥验签通过，并接受任意声明的 token。读 3.5.0 的源码，`jose/backends/native.py` 只在确认密钥是字符串或字节后就执行 `self.prepared_key = key`，而 `_process_jwk` 对 `k` 做 base64url 解码时也没有长度检查，于是 `""` 变成 `b""` 直接送进 `hmac.new`。记录归类 CWE-347，由 VulnCheck 打出 **CVSS 4.0 9.1**（`AV:N/AC:L/AT:P/PR:N/UI:N/VC:H/VI:H/VA:N`），NVD 状态为 `Awaiting Analysis`——9.1 是 CNA 的分，不是 NVD 的。

这次披露异常快，也异常不完整。VulnCheck 在 **2026-11-02T12:42:23Z** 预留 ID，**14:29:15Z** 发布，相隔 1 小时 47 分。最初的报告更早：Conner Webber 在 **2026-03-08 以 issue #398 提交**，指出该仓库关闭了私有漏洞报告且没有 `SECURITY.md`，建议用 `ValueError` 拒绝空 HMAC 密钥。该议题至今没有评论、没有标签、没有关联 PR。仓库 **1,759 星**，最后一次推送是 **2026-04-14**，PyPI 最新版本仍是 **2025-05-28 的 3.5.0**——也就是说记录里的 `lessThanOrEqual` 之上，并不存在可以升级过去的版本。

**为什么重要：** 这个依赖出现在大量 FastAPI 与 JWT 教程代码里，而公告所暗示的补救并不存在。如果你在验证 HS* token，修复在应用侧：在配置阶段就拒绝空或纯空白的密钥，不要指望库替你拦。这里的"至 3.5.0"意思是当前版本本身就落在受影响范围内，而不是说之上存在一个已修复版本。

[`🔗 CVE-2026-120459（cveawg）`](https://cveawg.mitre.org/api/cve/CVE-2026-120459) · [`🔗 issue #398（2026-03-08 提交）`](https://github.com/mpdavis/python-jose/issues/398) · [`🔗 3.5.0 的易受攻击代码`](https://github.com/mpdavis/python-jose/blob/3.5.0/jose/backends/native.py) · [`🔗 PyPI`](https://pypi.org/project/python-jose/)

---

## 3. Hyprland 0.57 删掉了 `.conf` 配置格式——"从这一版开始，.conf 配置不再被支持"

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub Trending · 今日 508 星 · 发布于 2026-10-28
- **Tags:** `wayland` `hyprland` `open-source` `breaking-change` `lua`

维护者 Vaxry 于 2026-10-28 发布的 Hyprland 0.57，完成了项目自 4 月启动、并在 0.55 预告的 Lua 迁移：**"正如 Hyprland 在过去几个月一直在提醒你的，从这一版开始，.conf 配置不再被支持。"** 公告没有给出迁移步骤，只指向 wiki；Lua 那一节讲的是脚本 API 而非配置语法——`config.unload`、`hl.reload_config()`、`hl.get_devices()`，外加新的窗口最小化与状态更新事件。功能上新增了模糊变体（插件还能再加）、Hyprland 与 XDPH 双侧实现的**工作区共享**（共享屏幕时可以把某个工作区选为来源）、Compiz 风格的窗口摇摆、`cursor:warp_on_monitor_change`、`no_glow`/`no_wobble` 规则、可全局禁用数位板设备，以及首次点击即吞掉对"会切走焦点"的窗口的点击。

该仓库今天以 508 星上榜，距打标签已过八天；`0.56` 系列此前一直在加弃用提示。项目采用 BSD-3-Clause，**39,835 星**。

**为什么重要：** 一个桌面合成器丢掉整个配置解析器，这是迁移而不是升级——每一份 dotfile、每一行 `bind=`、每一个会写 `.conf` 片段的第三方工具都得搬家，而发行说明并不告诉你该怎么搬。没准备好重写的话，请在 0.57 前把包钉住，因为 `hyprland.conf` 会安静地不再被读取，而不是报错退出。

[`🔗 Hyprland 0.57 公告`](https://hypr.land/news/update57/) · [`🔗 v0.57.0 发布`](https://github.com/hyprwm/Hyprland/releases/tag/v0.57.0) · [`🔗 Hyprland 仓库`](https://github.com/hyprwm/Hyprland)

---

## 4. 美团的 LongCat-2.5：1.6 万亿参数的原生多模态模型，训练全程使用国产算力——但权重还没放出来

- **Velocity:** ▮▮▮ trending
- **Source:** 美团新闻稿 · 2026-11-02 发布 · 每 token 激活约 480 亿参数
- **Tags:** `llm` `multimodal` `moe` `meituan` `longcat` `china`

美团于 2026-11-02 发布 **LongCat-2.5**，延续 LongCat-2.0（2026 年 6 月）的产品线。官方页面的说法是"面向长程智能体任务的原生多模态模型，总参数1.6万亿，训练全程由国产算力完成"——**1.6 万亿总参数**，训练端到端跑在国产芯片上。IT之家 的发布报道补充：**每 token 激活约 480 亿参数**；视觉信号被表示为**多层级离散 token**，主干以统一 token 形式处理视觉与文本；长上下文训练配合 **W4A4** 推理量化；训练链路会把真实 Agent 的失败轨迹转成可复现、可验证的任务。

可用性是需要仔细读的那部分。模型通过 **API 和 longcat.chat** 上线，GitHub 与 Hugging Face 均标注为**"即将上线"**。美团公告没有提到任何许可证，没有放出权重文件，模型卡此刻也不存在。技术博客 `longcat.ai/blog/longcat-2.5` 是客户端渲染的 SPA：它服务端渲染出来的只有页面标题和 meta 描述（"1.6万亿总参大模型，训练全程由国产芯片完成"），评测表则存在于第三方报道的图片里，而不是可抓取的正文中。

**为什么重要：** 有持久力的主张是"1.6 万亿参数的模型在没有 NVIDIA 的情况下训成"——这正是 LongCat-2.0 下的注，也是最容易被别人重新测量的部分。但"原生多模态"和"开放"在这里是两件事：在 HF 仓库出现之前，请把这读作一次**托管 API 发布**，而不是权重发布。

[`🔗 美团公告`](https://www.meituan.com/news/NN261102280001343) · [`🔗 LongCat-2.5 页面`](https://longcat.ai/blog/longcat-2.5) · [`🔗 IT之家 发布报道`](https://www.ithome.com/1/020/873.htm)

---

## 5. 污染预训练语料的 0.1%，就能在它变成的那个 Agent 里植入远程代码执行后门——4B 模型上 92% 成功率

- **Velocity:** ▮▮▮ trending
- **Source:** arXiv 2610.37741 · 2026-10-27 提交
- **Tags:** `security` `backdoor` `pretraining` `agents` `supply-chain`

《Agentic Backdoors via Pretraining Poisoning》（Hu、Hu、Loughridge、He、Carlini、Jagielski、Rando、Zhang）从头预训练 **0.6B、1.7B、4B** 三档 Qwen3，再用干净的流程把每一个后训练成 CLI Agent，然后追问：被污染的**预训练**数据究竟能买到什么？答案："只用我们新设计的毒化样本污染预训练语料的 0.1% 就能植入后门"，而这个 Agent "在触发条件出现时执行恶意命令，在干净输入上表现正常"。

规模效应是反着的。"攻击成功率（ASR）随模型规模上升"——4B 模型在 **0.1% 污染率下达到约 92% ASR**，并且"即使污染率降到 0.0005% 仍保持为正"，这才是应该终结争论的数字。作者称这是首次证明数据投毒可以在 Agent 中植入远程代码执行后门，而不只是造成误分类或错误回答。

**为什么重要：** 这个领域的每一种防御都在检查后训练数据、微调数据集或模型输出。这个攻击位于它们全部的上游，并且能穿过干净的后训练流程存活——也就是说，你必须信任的供应方是语料，而不是微调者。摘要没有报告干净输入上的误报率、没有持久性测量、也没有防御评估，所以请把 92% 当作无防御系统的上界，而不是现实世界中的比例。

[`🔗 arXiv 2610.37741`](https://arxiv.org/abs/2610.37741) · [`🔗 全文（HTML）`](https://arxiv.org/html/2610.37741v1) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50341334)

---

## 6. Barracuda 自家公告写"需要认证：是"，而 Mandiant 用 `PR:N` 给它打了 9.3——还把结果叫作"High"

- **Velocity:** ▮▮ rising
- **Source:** Mandiant CNA（cveawg）· 记录发布于 2026-11-02 · NVD 状态 `Awaiting Analysis`
- **Tags:** `cve` `barracuda` `authentication-bypass` `appliance` `email-security`

`CVE-2026-116606` 是 Barracuda Email Security Gateway **9.4.0.030** 之前的认证前授权绕过：攻击者调用一个配置导入功能，恢复一份精心构造的、格式兼容的备份归档，从而修改设备的全局配置。Mandiant 打出 **CVSS 4.0 9.3**（`AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H`，`baseSeverity: CRITICAL`），归类 CWE-288，从 **2026-10-26** 预留到 **2026-11-02** 发布——七天。它与 `CVE-2026-111560`（命令注入，8.6，影响 ESG、ADC、BMA、WCC、WAF、WSG）同批发布；Barracuda 页面指出"两者组合利用，可以让攻击者绕过授权控制并取得设备的 root 权限"。

厂商自家公告上有两个字段与记录对不上。它的逐条表格写着 **"Severity: High / CVSS Score: 9.3 / Authentication Required: Yes, administrative access"**——9.3 被复述了，但 9.3 落在 CVSS 4.0 的 *Critical* 区间，而 Mandiant 向量里的 `PR:N` 意味着不需要任何特权。正文只部分化解了第二处矛盾："成功利用要求攻击者能够访问受影响产品的管理界面"——这是网络可达性陈述，不是凭据要求。NVD 状态为 **`Awaiting Analysis`**，没有 `nvd@nist.gov` 的分数；CISA 的 ADP 在次日下午把 SSVC 写进同一条记录：`Exploitation: none`、`Automatable: yes`、`Technical Impact: total`。

**为什么重要：** 设备类产品一直在重复这个形状——可达的管理面、一个"恢复备份"的原语、最后拿到 root。真正有用的细节是补丁的分叉：**9.4.017 及以上用 BNSF-40425，以下用 BNSF-40430**，所以落后好几个版本的设备可能需要不止一次升级。如果你按"Authentication Required"那一行而不是按向量来分诊，你就是在用厂商模板填进去的字符串分诊。

[`🔗 CVE-2026-116606（cveawg）`](https://cveawg.mitre.org/api/cve/CVE-2026-116606) · [`🔗 Barracuda 公告`](https://trust.barracuda.com/security/pre-authentication-authorization-bypass-command-injection) · [`🔗 Mandiant 披露（MNDT-2026-0042）`](https://github.com/mandiant/Vulnerability-Disclosures/blob/master/2026/MNDT-2026-0042.md)

---

## 7. Subvocal 的眼镜靠脸颊内部的射频反射读唇语——延迟 500 毫秒以内、只支持英文、且必须联网

- **Velocity:** ▮▮ rising
- **Source:** Hacker News（Show HN）· 301 pts · 2026-11-02
- **Tags:** `hardware` `input` `rf-sensing` `accessibility` `agents`

两位前 Georgia Tech 计算机系学生 Aarush 和 Arnav（现为 The Subvocal Company，YC F26）发了一个 Show HN：让一副智能眼镜"让你不出声就能跟电脑说话"。机制既不是肌电也不是摄像头——镜架里的天线"发出类似蓝牙的无线电波，穿过你的面部"，舌头、嘴唇和软腭的运动扰动信号。"我们用这些数据训练基础模型，把扰动解码成文本"，跨用户预训练让新佩戴者只需要"短短 20 句的校准"。

限制写得直白，这也是这篇帖子比视频更值得读的原因。解码发生在"笔记本或手机上"的配套应用里、且**在云端**，典型延迟"通常在 500 毫秒以内"，而且**"是的，它需要联网。"** 发布时**只支持英文**；没有唤醒词——听写由连接设备上的触发键开始；闭口模式是刻意地"闭着嘴做口型"，而不是读取内心独白：创始人的补充说明称射频"能看见你口腔内部"，可以针对"内部言语"微调，并明确把它与"默念词语时那种自动的舌部运动"区分开。

**为什么重要：** 无声输入被许诺了十年，还停在演示阶段；这次有意思的位移是传感通道——口腔内的射频同时绕开了电极难题和"眼镜上装摄像头"的隐私异议。代价是云端依赖：一件价值在于" discreet 输入"的设备，把解码后的文本送过服务器，于是"低调"只关乎声学，不关乎数据。

[`🔗 Show HN: Subvocal`](https://news.ycombinator.com/item?id=50340088) · [`🔗 subvocal.company`](https://subvocal.company/)

---

## 8. 用 Astra、Fable 和 Opus 5.5 审了 kornia 三个月——以及一份写了两遍的发行说明：给人和给 Agent 各一份

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · 今日 412 星 · v0.9.0 发布于 2026-10-23
- **Tags:** `computer-vision` `pytorch` `open-source` `release` `agents`

kornia 0.9.0 是这个几何视觉库多年来最大的一次发布，而它的说明被拆成**"Overview for humans"**与**"Overview for agents"**两节——后者指示模型"明确以 Kornia 0.9.0 为目标，并在生成代码前核对其成文契约"，并指向一份 agent 索引和一张带一致性校验的支持矩阵。给人看的那半坦白得少见：**"我们跑了三个月的审计，专门找静默 bug、崩溃和愚蠢的变慢——用 Astra、Fable 和 Opus 5.5，在严格人工控制下。"** 共提出并修复 800 多个议题，合并 995 个社区 PR。它也删掉了那些"从来就没work过"的模型——"抱歉！——比如 SAM3"——并修好了另一些。

性能声明自带反例，这种诚实值得整句引用：**"我们发布了 CPU 与 GPU 的旗舰速度基准——在 CUDA 上比 OpenCV 快 10 倍，但当然，在 CPU 上慢 4 倍。"** 具体条目包括 Apple CPU 上高斯模糊快 16×、非锐化掩模快 3×，MPS 上 CLAHE 快 **2,000×**，形态学算子快 4×，增广里的主机同步减少 10×。

**为什么重要：** 面向 Agent 的发行说明是一种新的产物类别——读者是代码生成器的文档，而版本钉住就是契约——它出现在一个自称"对 slop 不友好，无论天然还是人工"的库里。CUDA/CPU 的分裂是另一半：同一句话里 10 倍赢、4 倍输，才是可移植性基准该有的样子。

[`🔗 kornia v0.9.0 发布`](https://github.com/kornia/kornia/releases/tag/v0.9.0) · [`🔗 变更日志（约 5,000 行）`](https://github.com/kornia/kornia/blob/v0.9.0/CHANGELOG.md) · [`🔗 kornia 仓库`](https://github.com/kornia/kornia)

---

## 9. Apache Syncope 八分钟内发了五个 CVE——没有一个带 CVSS 分数，只有一个词

- **Velocity:** ▮▮ rising
- **Source:** Apache CNA（cveawg）· 五条记录，2026-11-02T13:04–13:12Z · NVD 五条全部 `Deferred`
- **Tags:** `cve` `apache-syncope` `rce` `identity` `scoring`

Apache 的 CNA 在 2026-11-02 的 **13:04:15Z 到 13:12:27Z** 之间发布了五条 Syncope 记录，NVD 端全部 `Deferred`；每一条的 `metrics` 里只有一个**文字性的严重度**——一条 `moderate`，其余四条 `important`。五条记录中，无论 CNA 还是 NVD，都没有任何数值分数。不过这种缺席有实测的保质期：在 **2026-09-21→27** 发布的 44 条 Apache CVE 中，42 条带同一个严重度词，而其中**唯一指标就是这个词的 41 条**今天在记录的 ADP 容器里带一个 **CISA-ADP** CVSS 3.1——中位 **4.4 小时**后写入，而那个词仍留着。可见词是一个由别人来清理的队列，而不是评分人的最终答案。按描述最严重的是 `CVE-2026-109083`："拥有相应权限的管理员可以通过 REST API 导入任意 BPMN 流程定义，然后启动该流程。当包含 JUEL 表达式的 BPMN 流程被导入并启动时，表达式会直接在执行服务器上运行，没有任何沙箱。"这是一次需要认证的 RCE，而它的严重度一行是"moderate"。

这批记录读起来像一次审计的打包发布，只是结局各不相同。`CVE-2026-114364` 明确写着是**一次不完整的修复**——"本 CVE 覆盖对 CVE-2026-77051 的不完整修复"——管理员仍可经此前补丁未封堵的路径执行任意 SQL。`CVE-2026-113687` 与 109083 同形（Groovy 沙箱逃逸），只是换了一条路径（"在独立线程上运行不受信任代码，从而绕过 Groovy 安全"）。`CVE-2026-113511` 是授权绕过：被委派的管理员可以把 Realm 子树跨管理域边界搬移。`CVE-2026-110535` 让非管理员用户借 AuthProfile 自更新，为 WA 代理认证配置冒用身份。每条记录都把修复版本写成 **4.0.9 / 4.1.4**，覆盖三条受影响分支（3.0.x、4.0.x、4.1.x）。

**为什么重要：** "没有发布 CVSS"是一个关于策略的陈述，而这里正是那条策略显形的样子——Apache 在记录上用词评级，把数字留给之后愿意算的人。如果你的流水线以 `CVSS >= 9.0` 为闸门，这五条对它全是隐形的，包括那条在服务器上执行任意 JUEL 的。Apache 的严重度词汇确实能映射到某个量级（important ≈ high），但那份映射住在你的 YAML 里，不在记录里。

[`🔗 CVE-2026-109083（BPMN/JUEL RCE）`](https://cveawg.mitre.org/api/cve/CVE-2026-109083) · [`🔗 CVE-2026-114364（不完整修复）`](https://cveawg.mitre.org/api/cve/CVE-2026-114364) · [`🔗 CVE-2026-113687（Groovy 沙箱逃逸）`](https://cveawg.mitre.org/api/cve/CVE-2026-113687) · [`🔗 Apache Syncope 安全页`](https://syncope.apache.org/security)

---

## 10. 只靠 BM25 和 grep 的 Agent 检索 harness 答对 BrowseComp-Plus 的 85%——而那些花哨索引什么也没加

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.41172 · 2026-10-30 提交
- **Tags:** `rag` `retrieval` `agents` `context-engineering` `ragflow`

《Context as Infrastructure》（Yu、Cao、Idriss、Wang、Xu、Qin、Jin、Liu）从一个重构整个检索栈认知的结果出发："一个只用 BM25/grep 加 MiniMax M3 的 harness，在我们的运行中答对 BrowseComp-Plus 的 85%、多跳 FRAMES 的 91%，且不使用任何编译式索引或向量索引。"如果准确率已经饱和到这个程度，剩下的成本就是上下文——"一个没有纪律的循环会重复查询、重读文档，把窗口塞满没用上的段落"。

论文最有用的发现，是关于大家都在卖的那一层的一个否定结论。编译"不是更好的检索器：在称职的 harness 之下，结构化产物在 FRAMES 上没有可检测的准确率增益，而 PageIndex 式的大纲在规模化时反而变差"。真正有回报的份额更窄："一棵叶子是"断言—证据"对的导航树——也就是我们测量的机制——在证据充分时把查询 token 削减 91%，在证据不充分时则多花 1.9%，平均降低 38%；这蕴含 2% 的盈亏平衡充分率，而实测充分率接近 43%。"一个决策闸门把延迟从 **140 秒降到 30 秒**，不过作者指出这份 token 节省"是以检索轮次换来的，并自带延迟成本"。本体、图、wiki、时间线、思维导图和记忆等产物"在部署中（治理、集成、上手、时间定位、连续性）有回报，而这些是准确率基准看不见的"。

**为什么重要：** 这里把通常被捆绑的两个主张拆开了——"更好的检索"与"更好的供给"。如果 harness 本身称职，为准确率去买一个向量索引是无法被证伪的开支；可测量的胜利是 token 供给的纪律，而它带一个明确的盈亏平衡率，你可以在自己的语料上算。

[`🔗 arXiv 2610.41172`](https://arxiv.org/abs/2610.41172) · [`🔗 RAGFlow`](https://github.com/infiniflow/ragflow)

---

## 11. Nuxt 的 `getRouterParam` 在路径含 `%3F` 时返回的参数与 h3 实际匹配的不同——于是鉴权和资源选取可以各说各话

- **Velocity:** ▮▮ rising
- **Source:** VulnCheck CNA（cveawg）· 记录发布于 2026-11-02 · 4.6.2 修复
- **Tags:** `cve` `nuxt` `javascript` `authorization-bypass` `parser-confusion`

`CVE-2026-120309` 是 Nuxt 与 `@nuxt/nitro-server` 中的路由参数混淆问题，影响 **4.6.0 起、4.6.2 之前**，触发方式是"发送含有编码问号（%3F）的路径"。后果是：`getRouterParam` 与 `getRouterParams` 可能返回一个与 h3 实际匹配到的**不同**参数值。归类 CWE-436（解释冲突），VulnCheck 给了 **CVSS 4.0 6.3** 与 **3.1 3.7**，报告者署名 `seslo82`，公开日期 **2026-10-16**。NVD 状态为 `Awaiting Analysis`。

值得读两遍的是利用条件，因为它不是"所有 Nuxt 应用"：该缺陷在"授权检查使用 Nuxt helper 的返回值，而资源选取使用 `event.context.params`"时成立，"从而允许访问未授权资源"。换句话说，问同一个问题有两条路，而两条路给出不同答案——只有把两者混用的代码库才受影响。

**为什么重要：** 一个依赖具体编程写法的 6.3 很容易被忽略，也很容易被忽略错，因为这种写法恰恰是框架 helper 在诱导的：你在守卫里顺手用 `getRouterParam`，在处理器里顺手用 `event.context.params`，根本不会意识到它们是两个不同的来源。判定自己不受影响之前，先 grep 一下同一条路由里有没有两者并存。

[`🔗 CVE-2026-120309（cveawg）`](https://cveawg.mitre.org/api/cve/CVE-2026-120309) · [`🔗 Nuxt 安全公告`](https://github.com/nuxt/nuxt/security/advisories)

---

## 12. rTaste 让六个研究 Agent 给 415 个实验排名——赢过随机，但没赢过就做论文里最先写出的那个实验

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.40488 · 2026-10-30 提交
- **Tags:** `agents` `evaluation` `research` `negative-result` `benchmark`

《rTaste: Do Research Agents Have Taste?》（Art Kanke）问的是每个"AI 科学家"演示都跳过的问题：给定一篇论文，Agent 能不能在没人知道结果之前判断哪个实验**值得做**？六个前沿模型，单独或组队，提出最小可行实验（MVE），预测各自能否越过自己设定的阈值，并给出排序。之后由独立的执行者把**每一个** MVE 都跑一遍——"包括排在最后的"——再由三个模型审计员评判结果。

结论是一次克制的否定。"415 个 MVE 中，194 个被评为扎实、有价值且新颖，但其中不到一半（73 个）同时被评为超越了种子论文且不显而易见。"关于排序："Agent 的首选比随机挑选更常命中审计员最看重的实验，但没有证据表明它优于"直接做论文里最先写出的那个实验"。"预测"好于基线，但并不比"只给论文与登记的、同模型的全新实例"更准。而组队——所有人都会去用的那种配置——"成本更高，且提案质量没有明确的整体提升"。

**为什么重要：** 这些 Agent 擅长**生成**值得做的实验，却在**挑选**上未被证明有效，这恰好与产品假设的顺序相反。一个打不过直接取第一个想法的排序是成本而不是能力——而论文公开了全部 415 个 MVE、它们的预测与审计结果，所以这个主张可以被复核，而不是只能被相信。

[`🔗 arXiv 2610.40488`](https://arxiv.org/abs/2610.40488) · [`🔗 全文（HTML）`](https://arxiv.org/html/2610.40488v1)

---

## 13. PostHog 把 2 PB 数据装进按客户划分的 DuckDB 实例后决定搬走——"DuckLake 是为兼容性而建，不是为规模"

- **Velocity:** ▮▮ rising
- **Source:** PostHog 博客 · HN 124 pts · 2026-11-02
- **Tags:** `databases` `duckdb` `trino` `infrastructure` `analytics`

PostHog 并没有说 DuckDB 不好——它称其为"单机上非常出色"。问题在于把它当作多租户云数仓来跑：五个月前，它用按客户划分的 DuckDB 实例替换了共享的 ClickHouse 集群，迁移时数据量"约 2 PB"，即"大约 1 万亿行、1,530 万个快照"。现在它正基于定制化的 Trino 部署和自有的表格式 HogLake 重建。

失败模式具体且可迁移。单节点容量规划意味着必须在看到查询之前就决定 worker 资源，"这里的工效学很别扭"。DuckLake 的可移植 catalog schema 限制了引擎专属优化——**"DuckLake 是为兼容性而建，不是为规模"**——在 PostHog 的体量下"一次单表写入可能耗时三分钟以上"。catalog 统计信息膨胀到"超过 99% 的统计行属于已不存在的表"；删掉它们让写入快了 **30–50 倍**，但这些行又回来了，最终 PostHog 维护了一个 fork。它同时指出，DuckDB 直到最近才支持异步 S3 抓取；而"在 5432 端口上直接提供 Postgres 连接听起来是个好主意"，可"实践中，它比 HTTP 难扩展得多"。

**为什么重要：** 按租户一库是当下给分析隔离的标准答案，而这是一份第一手记录，说明它在哪里停下——不是停在正确性上，而是停在 catalog，以及那个你必须在看不见查询时做出的单节点容量决定上。删掉死掉的统计行换来 30–50 倍写入提升，这个数字值得在你自己迁移任何东西之前先在自家数仓里查一遍。

[`🔗 Moving our warehouse off DuckDB`](https://posthog.com/blog/moving-off-duckdb) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50338747)

---

## 14. Cloudflare 只重建变化的部分，把 DNS 区构建内存砍掉 85%——并把让这件事安全的规则写在了前面

- **Velocity:** ▮▮ rising
- **Source:** Cloudflare 博客 · HN 94 pts · 2026-11-02
- **Tags:** `dns` `infrastructure` `cloudflare` `performance` `distributed-systems`

Cloudflare 的 DNS Zone Builder 过去把一次 zone 设置变更当作全量重建——读取、编码、比较、并把每条记录都留在内存里——当"有些 zone 现在持有超过 2,000 万条记录，并且我们预计会朝数亿条增长"时，这撑不住。新设计让事件生产者指出哪些 zone 字段与设置发生了变化，由 planner 在五条路径中选择（定向记录工作、记录加元数据、apex 加元数据、清除、全量重建）。统一调度器通过软 Kafka 提交，合并同一个 zone 的排队工作；构建先按事件规划，再与一份新的数据库快照相校验。

那条安全规则才是真正有意思的工程：**"定向构建写出的每一个 key，都必须与全量构建会写出的内容逐字节一致"**，靠等价性测试与生产镜像来保证——并且"planner 绝不会把不确定性换算成更少的工作"——缺少细节、未知事件、或任何可能影响 zone 内任意记录的变化，仍然走全量构建。24 小时内，**92.95% 的构建避免了全量重建**（7.04% 仍是全量），全量构建下降约 **40%**，峰值内存从 **79 GiB 降到 12 GiB**（−85%），最大 p99 尖峰从 **14.6 分钟降到 1.21 分钟**，构建完成时间中位数从约 **7.7 秒减半到 3.3 秒**。镜像比对在 **234,313 个匹配 zone 上得到 0.31% 的差异率**，其中相当一部分是暂时性的时序错位。

**为什么重要：** 这里注意事项和成绩一样有用。Cloudflare 说延迟数字"合并了所有构建类型与客户套餐，因此不构成对单个 zone 的延迟保证"，剩下的延迟中有很多是刻意的重建间隔，且不含网络分发时间。首次发布、以及任何"没说清改了什么"的事件，仍然走全量构建——这正是增量系统诚实的形状：兜底路径就是规范本身。

[`🔗 Cloudflare：DNS 定向区构建`](https://blog.cloudflare.com/dns-targeted-zone-builds/) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50337558)

---

## 15. GPT-Rosalind-6 没有新训练数据、没有后训练——它就是 GPT-6 Astra 的权重加一道生物学访问闸门

- **Velocity:** ▮▮ rising
- **Source:** OpenAI deployments safety · 系统卡附录 · 2026-11-02
- **Tags:** `ai-safety` `biosecurity` `openai` `system-card` `policy`

OpenAI 为 **GPT-Rosalind-6** 发布了系统卡附录，称之为"面向生物学、药物发现与转化医学的前沿推理模型"，而这份披露第一句有用的话是：它是一次重新发布而非新模型——它"使用与 GPT-6 Astra 相同的权重"，且**"我们没有为这次发布添加训练数据，也没有做额外的后训练。"** 变的是访问策略，不是网络。

与 GPT-Rosalind-5.5 在最高推理预算下的有益能力对比数字很大——MedChemBench v7 **49.6% 对 28.9%**，GeneBench Pro v13 单次尝试 **37.7% 对 16.7%**，LifeSciBench Gold **61.3% 对 44.0%**——风险姿态也一样大。OpenAI 将该模型视为"在生物与化学领域具备 High 能力，低于 Critical 阈值"，并在网络安全上视为 **Critical**，网络安全与自我改进沿用 Astra 的评估。四项高能力 preparedness 评估的结论是："经拒答调整后，GPT-Rosalind-6 在其中三项上超过了指示性的 High 能力阈值。我们因此继续将该模型视为 High 能力。" 附录并补充，与 GPT-Rosalind-5.5 相比，"三项得分更高，Biorisk knowledge 更低"。四项 Critical 评估——AAV 衣壳包装（0.600）、SHP2 功能（0.60）、冠状病毒-ACE2 进入（0.75）与噬菌体-质粒共进化（NLL ≤ 9.40）——**"四项 Critical 能力评估均未达到指示性阈值。"**

**为什么重要：** 唯一削弱发布叙事的数字是 **Biorisk knowledge cons@32：Rosalind-6 为 78.3%，Rosalind-5.5 为 79.2%**（GPT-6 Astra：63.3%）——但要连着表格下面两行一起读，叙事在那里部分回弹：两者的拒答率分别为 **9.4%** 与 **1.8%**，拒答调整后的 cons@32 对 Rosalind-6 是 **85.0%**，而指示性的 High 能力阈值是 **80%**，所以未调整的 78.3% 不达标，调整后的数字达标。一个"新"生物学模型在未调整的头号生物风险知识探针上略**低于**前任，而权重完全相同——这提醒我们：这里的一次版本号跃迁是一次访问决策，而真正的发布内容是那些防护措施（仅限获批客户、企业验证、合规筛查、在输出影响实验前必须有人类专家复核）。

[`🔗 GPT-Rosalind-6 系统卡附录`](https://deploymentsafety.openai.com/gpt-rosalind-6) · [`🔗 HN 讨论`](https://news.ycombinator.com/item?id=50337503)

---

## 16. Chainalysis 称入侵者使用了"offensive agentic techniques"——并点名它认为被拿走的四个字段

- **Velocity:** ▮▮ rising
- **Source:** Chainalysis 事件通告 · 2026-10-30 发布 · 报道 2026-10-31
- **Tags:** `security-incident` `agents` `disclosure` `crypto` `attribution`

Chainalysis 于 **2026-10-30** 发布安全事件通告，称其在 10 月"检测到一名外部行为者使用 offensive agentic techniques"进入其系统与内部工具。它点名的数据狭窄而具体：**"用户 ID、全名、电子邮箱地址，以及组织角色标签。"** 而它称"未发现证据"的部分，对一家做取证分析的公司才是关键：**"调查内容、身份凭据或会话令牌"未被未授权访问**；客户邮件还把交易与查询结果、明文密码、MFA 密钥列入未暴露清单。"调查内容"指图谱、笔记与案件。

最弱的部分是那个定性框架，而通告很小心地没有过度声张。Chainalysis 没有说受影响的用户或组织数量、入口点是什么、修补了哪些漏洞、攻击者驻留多久，也没有说"agentic"具体指什么——是已知框架还是自研 Agent。它同时声明事件**"与近期 Binance 的加密货币失窃无关"**，并表示已聘请第三方专家，且用"先进的大语言模型"协助自身的安全复查。给客户的建议是启用 MFA，并对"意外的密码重置请求或认证提示"保持警惕——对一份姓名、邮箱加组织角色的清单来说这是正确的建议，因为那正是一份定向清单。

**为什么重要：** 受害者把一次入侵描述为"agentic"，是关于攻击者工具链的主张，而受害者未必有能力证实它——通告也没有试图证实。请把有用的部分读成那四个字段的范围加上"未给出数字"这件事本身：一份精确说明丢了什么数据、含糊说明是谁干的通告，比反过来的那种更可信；而对加密合规从业者来说，具象的操作后果就是钓鱼风险。

[`🔗 Chainalysis 事件通告`](https://www.chainalysis.com/blog/security-incident-october-30/) · [`🔗 BleepingComputer 报道`](https://www.bleepingcomputer.com/news/security/chainalysis-discloses-data-breach-from-offensive-agentic-techniques/) · [`🔗 The Block`](https://www.theblock.co/news/business/2026-10-31-chainalysis-says-hacker-using-offensive-agentic-techniques-accessed-its-customers-names-and-emails-432244)

---

## 17. Scrapling 的 v0.5 MCP 服务器"几乎能解决任何 CAPTCHA"——代价是它所在的版本把旧接口破坏了

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · 今日 858 星 · v0.5 发布于 2026-10-17
- **Tags:** `scraping` `python` `mcp` `agents` `open-source`

Scrapling 是一个 Python 抓取框架，**92,634 星**、BSD-3-Clause，今天以 858 星上榜；真正关键的是 **2026-10-17 发布的 v0.5**——比它开始爬升早了整整两周。那次发布本身就是一次断裂："本次发布引入了大量此处放不下的破坏性变更。升级前请阅读 Migrating to v0.5 指南。" 它加上的是面向 Agent 的东西："一个能力强得多的、面向 AI Agent 的 MCP 服务器，几乎能解决任何 CAPTCHA"；把浏览器工作流写成一条有序序列——填表、点击、悬停、滚动、用键盘、处理对话框、等待结果，"遇到第一个错误即停止"；以及在不重载页面的前提下，以 HTML、Markdown 或纯文本读取或搜索当前页面。

仓库的 issue 跟踪器上是 **4 个未关闭 issue 和 4 个未合并 PR**（2026-11-03 读取），对 9,760 个 fork——`open_issues_count` 字段显示 8，只是因为 GitHub 把两者相加。PyPI 的 `latest` 是 **0.5**，所以文档写的就是能装上的。此前几个版本是同一路数：2026-08-23 的 v0.4.15 重做了 MCP 服务器并加上"一行得到 RAG 就绪的 Markdown"，v0.4.14 是一次维护发布，修的是 `uv` 静默回退到旧版本。

**为什么重要：** 一个把"解 CAPTCHA"当头条功能的抓取器，属于法律与伦理边界不断移动的工具类别；而诚实的解读是：它上榜靠的是 MCP 接口而不是解析——Agent 框架需要的是一个能被驱动、能把页面读成 Markdown 的浏览器，而它把两者装在一个 `npx` 后面。请有意识地钉在 0.5：迁移指南之所以存在，就是因为旧接口不兼容。

[`🔗 Scrapling 仓库`](https://github.com/D4Vinci/Scrapling) · [`🔗 v0.5 发行说明`](https://github.com/D4Vinci/Scrapling/releases/tag/v0.5) · [`🔗 v0.4.15 发行说明`](https://github.com/D4Vinci/Scrapling/releases/tag/v0.4.15) · [`🔗 PyPI`](https://pypi.org/project/scrapling/)

---

## 18. BlindToChange：检索能力完美的 Agent 仍然漏掉没人叫它去查的那个变化——27.5 分的差距

- **Velocity:** ▮ steady
- **Source:** arXiv 2610.41435 · 2026-10-30 提交
- **Tags:** `agents` `search` `benchmark` `evaluation` `freshness`

《BlindToChange》（Phukan、Goyal、Pruthi）讲的是 Agent 检索基准能看见什么、看不见什么。BrowseComp 及其同类"明确陈述了需要找到什么"，于是从不质疑自身假设的 Agent 也能拿高分："虽然 Agent 能搜索并轻易找到近期变化，但其回答的正确性取决于它是否去搜、以及搜什么。"真实请求只陈述最终需求——一次旅行的行程——而把"某博物馆临时闭馆"这类发现留给 Agent 自己。

基准由"因近期现实事件而让明显候选不再适用"的请求构成，事件自动取自 **Wikidata**，因此可以被"定期刷新"而不是冻结。测得的效果很大："当近期事件未被明确提及时，系统表现与直接询问时相比存在高达 27.5 分的差距——即便在高推理投入下也是如此。"轨迹分析把"超过一半的失败"归因于一个具体行为：Agent "并不直接去搜索，以核实某个相关事实是否 [已变化]"。

**为什么重要：** 27.5 分不是一个知识缺口——一旦被问到，Agent 都找得到那个变化——而是一个**触发**缺口，且对每一个把问题直接递过去的基准都是隐形的。从 Wikidata 可刷新的设计才是值得抄的部分：任何手写条目的评测都会腐化，而这个可以从一个活的数据源重新抽取。

[`🔗 arXiv 2610.41435`](https://arxiv.org/abs/2610.41435) · [`🔗 全文（HTML）`](https://arxiv.org/html/2610.41435v1)

---

## 19. worktrunk 让 git worktree 以分支名寻址——并行跑十个 Agent 缺的就是这层管道

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · 今日 136 星 · MIT OR Apache-2.0
- **Tags:** `git` `worktree` `agents` `cli` `rust`

Worktrunk 是一个为某一种工作流而生的 git worktree 管理 CLI："Claude Code 和 Codex 这类 AI Agent 能长时间无人值守地干活，因此同时管理 5–10 个以上是可能的。git 原生的 worktree 让每个 Agent 有自己的工作目录，彼此不会踩到对方的改动。" 它填的是一个真实的人机工效缺口——"哪怕是新建一个 worktree 这种小事，也要把分支名打三遍。"

设计决定是 **worktree 以分支名寻址**，路径由可配置模板算出；接受分支的命令也接受该 worktree 检出的路径。围绕这三个核心命令，它还提供本地工作流钩子与写时复制（copy-on-write）构建缓存——这才是让并行 Agent 可行的部分：十个 worktree 若没有共享构建缓存，就意味着十次冷构建。

**为什么重要：** 并行跑 Agent 现在几乎是默认建议，而它底下的版本控制故事通常被跳过。一 Agent 一 worktree 是正确的隔离模型——独立索引、独立 HEAD、共享对象库——而缺口从来不是 git 的能力，而是它的界面。**9,958 星**、今日 136 星，它是以基础设施而非演示的身份上榜的。

[`🔗 worktrunk 仓库`](https://github.com/max-sixty/worktrunk) · [`🔗 worktrunk.dev`](https://worktrunk.dev)

---

## 20. 继我们 2026-11-02 报道 CVE-2026-98432 之后：发布三周后，Ubuntu 仍没有能关掉它的内核

- **Velocity:** ▮ steady
- **Source:** Ubuntu CVE 追踪页 · 发布于 2026-10-15，最后更新 2026-10-30
- **Tags:** `cve` `linux-kernel` `ubuntu` `patching` `distributions`

**对 2026-11-02 那条的更新。** 我们报道 CVE-2026-98432——Go 把 MPTCP 设为默认值后，把这枚 IPv4 TCP use-after-free 推到了每台 Linux 上的每个 Go 服务面前——时，故事是运行时默认值。下游那一半此后变成了可操作的那一半：Ubuntu 自家的 CVE 追踪页把该记录列为 **2026-10-15** 发布、**2026-10-30** 最后更新，Ubuntu 优先级 **High**、CVSS 3 严重度分为 **9.8 · Critical**；而截至 2026-10-31 的报道，"尽管 CVSS 为 9.8，22.04、24.04、26.04 仍没有已修补的内核可用"。追踪页没有给 ETA。

缺口在主线上游修复与 LTS 内核之间。这个漏洞是请求套接字的所有权问题——`tcp_v4_syn_recv_sock()` "把 ireq->ireq_opt 的所有权转移给子套接字（newinet->inet_opt）却不复制"，而另一个 CPU 上重传的 SYN 仍能只在 `rcu_read_lock()` 下读到它——修复方式是在一个 RCU 宽限期之后才释放这些选项。带补丁的上游版本在 Ubuntu 公告变旧之前就已发布；LTS 内核没有在同一窗口内跟上。

**为什么重要：** 我们在 11-02 描述的缓解措施——设 `multipathtcp=0`，声明 `go 1.23` 的模块默认就是这个——现在成了无法更换内核的 Ubuntu LTS 主机**唯一**可用的补救。这与"打内核补丁"是实质性不同的建议，也是"有修复的发行版"与"没有的发行版"之间的差别。引用以上任何一句之前请重看追踪页：内核更新正是那种会让这个断言翻转的事件。

[`🔗 Ubuntu CVE-2026-98432 追踪页`](https://ubuntu.com/security/CVE-2026-98432) · [`🔗 报道：LTS 内核仍无补丁（2026-10-31）`](https://freenode.net/article/ubuntu-lts-kernels-still-unfixed-for-critical-cve-2026-98432) · [`🔗 CVE 记录`](https://cveawg.mitre.org/api/cve/CVE-2026-98432)

---

## 21. WorkOS 说一个"AI 辅助的进攻性安全框架"进了它的销售工具——而框架的名字在 CEO 的 Hacker News 评论里，不在公告里

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News（自发帖）· 60 pts · ~5 小时前（~07:31 UTC+8）
- **Tags:** `security` `incident` `identity` `ai-agents` `disclosure`

WorkOS 于 2026-11-02 发布安全公告，说明其销售团队使用的一个内部应用遭到未授权访问，发现时间为 **2026-10-30**。公告把事件范围限定在 CRM 与客户支持数据：商务联系人信息、客户账户历史，以及"销售通话、支持讨论和客户 Slack 对话的摘要与片段"，外加产品使用与目录健康度之类的运营元数据。公告同时写明：**"目前没有证据表明 WorkOS 的应用数据被访问，也没有证据表明生产环境的 WorkOS 服务被访问或受到影响。"** 攻击手法只出现了一次，被描述为"一个 AI 辅助的进攻性安全框架，用于自动化侦察与利用尝试"，并把 Wiz、Google、CrowdStrike 关于 Agent 入侵的报告作为背景引用，而非关于本案的证据。

名字不在公告里。在 Hacker News 讨论串中，CEO Michael Grinich 写道：**"这次攻击涉及 ARTEX，一个用于执行进攻性安全操作的自主 AI Agent 框架。"** 这比公告承担的归因更重——给出了行为体与工具，而不只是手法——也正是此后所有报道引用的那一句。两者都可以为真；但它们不是同一个断言，且只有一个是厂商的正式通知。

**为什么重要：** 对一家身份与 SSO 厂商来说，真正危险的不是联系人清单，而是对话片段：一封要求重签 SAML 证书或重新连接目录的邮件，在引用了真实的支持线程和真实的同事之后，看起来就像日常操作。两种读法要分开："没有证据"在第四天说的是调查仍在进行，而 ARTEX 这个归因是 CEO 说的，不是公告说的。

[`🔗 WorkOS 安全公告`](https://workos.com/security/bulletins/october-30th-2026-data-security-incident) · [`🔗 HN 讨论串 + CEO 评论`](https://news.ycombinator.com/item?id=50345712) · [`🔗 WorkOS 安全页`](https://workos.com/security)

---

## 22. OpenAI 的 Pando 把推送延迟中位数砍掉近 80%——对象是一个可靠性一度跌破 90% 的 monorepo

- **Velocity:** ▮▮▮ trending
- **Source:** OpenAI 工程博客 · 发布于 2026-11-02 · Aaron Friel、Taylor Blau、Ted Nyman
- **Tags:** `git` `infrastructure` `monorepo` `agents` `source-control`

OpenAI 造了一个新的 Git 后端 **Pando**，现在整个 monorepo 都由它服务，客户端和协议都没变。动机被明确写成 Agent 驱动：Codex 抬高了每位工程师的分支数、推送数、合并数和拉取数，重建之前"可靠性有时跌破 90%"。生产数字给得很直接：推送延迟中位数下降**近 80%**（文中也写作"近 5 倍"），每天送达**近 1 PB** 的 Git 数据，单小时送出超过 **57 TB** 的 Git pack，其中 99% 以上来自本地磁盘缓存，packfile 中位数小于 **20 KiB**、99 分位小于 **3 MiB**，而每天 1 PB 只用了"屈指可数的几个 CPU 核"。

设计有两个要点。第一，Pando 对每个分支独立协调更新，互不相关的分支推送可以并行；第二，它在多次 fetch 之间复用 packfile，而不是为每个客户端单独生成，因此同一份字节可以服务很多读者。代价由文章自己说出，而不是留给读者发现："同时查看多个分支的读者，可能看到它们处于不同的时间点。"这项工作也回流到上游：`packfile-uri` 下载的追踪与字节统计、接受已有 pack 时的校验，以及并发下载与中断传输的边界修复。

**为什么重要：** Agent 并发把源码管理变成了吞吐问题，而这里的答案是按分支的因果一致性，而不是全局锁——采用之前要先把这个取舍说出来，因为你放弃的正是跨分支的原子读。性能结论是生产环境的自述，除了"上一套后端"之外没有给出基线；"近 5 倍"和"近 80%"是同一个测量的两种单位，不是两个结果。

[`🔗 Scaling Git at OpenAI`](https://openai.com/index/scaling-git-at-openai/) · [`🔗 OpenAI 新闻索引`](https://openai.com/news/)

---

## 23. OpenAI 的 LifeVal 给出五个日常任务、分数 90.4%–100%——没有平均值，没有模型名，也没有任务总数

- **Velocity:** ▮▮ rising
- **Source:** OpenAI Research · 发布于 2026-11-02
- **Tags:** `eval` `agents` `benchmark` `openai` `transparency`

LifeVal 是 OpenAI 新公布的"日常生活中真正重要的事"评测，取材于 American Time Use Survey 与 Multinational Time Use Study，并新增了一份覆盖 **3,995** 名受访者的、人口结构上有代表性的调查；覆盖育儿、健康、教育、家庭事务、个人理财、购物与政府服务。公开页面是一组带分数的范例：比较幼儿园并整理报名信息 **93.1%**，组织防洪志愿者 **98.0%**，在 Luzerne 县找房并把房契加入购物车 **100%**，为祖母搭好远程一起看球的方案 **96.3%**，为刚确诊糖尿病的父母做一周饮食计划 **90.4%**。随后是一句总结：**"我们最新的模型在许多 LifeVal 任务上得分非常高。"**

页面正文没有给出的东西：模型名称或版本、评测包含多少任务、总分、失败案例，以及方法与局限性章节。范例下方有一个"See more"控件，后面很可能还有更多行——但上面五个数字就是服务端渲染文本里的全部数字，而关于这个基准整体的唯一量化断言，就是上面那句话。

**为什么重要：** 以五个通过范例发布的评测是能力声明，不是别人可以对比的测量——没有分母，没有可钉住的模型版本，也没有说明任务分布。引用时请把这五个数字当作范例。底下真正可复用的人工产物是调查工作：3,995 名受访者是挑选"测什么"的一种站得住脚的方式，而缺失的是这个选择之后的部分。

[`🔗 LifeVal`](https://openai.com/index/lifeval/) · [`🔗 OpenAI Research 索引`](https://openai.com/research/)

---

## 24. Netpbm 九月那次发布修的是 1988 年写下的缓冲区溢出——对应的七个 CVE 五周后才到

- **Velocity:** ▮▮ rising
- **Source:** NVD（VulnCheck CNA）· 记录发布于 2026-11-02 · 10.86.51 发布于 2026-09-28
- **Tags:** `cve` `netpbm` `memory-safety` `image-parsing` `disclosure`

2026-11-02 发布的七条 VulnCheck 记录描述了 Netpbm 各格式转换器里的内存安全问题：**sgitopnm** 的堆溢出（`readChannels()`，RLE 压缩的 SGI）、**winicontopam** 在超大 ICO/CUR 尺寸上的整数溢出、**picttoppm** 的 `paintPoly()` 与 `scanPoly()` 两处栈溢出、**xpmtoppm** 因未校验的 characters-per-pixel 值导致的堆溢出、**jbigtopnm** 的整数溢出，以及 **tgatoppm** `get_pixel()` 的越界读。修复版本按分支给出：**10.86.51** 之前、11.x 的 **11.02.30** 之前、11.03 的 **11.15.08** 之前（第一条记录写作 11.02.29 / 11.15.07）。七条在 NVD 全部是 **`Awaiting Analysis`**，所以每个分数都是 CNA 的：**CVSS 3.1 7.8**（`AV:L/AC:L/PR:N/UI:R`）与 **CVSS 4.0 8.5**（`AV:L/UI:P`）——同一个 bug 在两个框架下，用户交互的假设不同。

变更日志比这批 CVE 更大、也更老。**10.86.51（2026-09-28）**列出了十七个程序里的修复外加一处构建修复，多半标注"Always broken"并给出引入时间：`picttoppm` 自 1988 年，`tgatoppm` 自 1989 年，`pjtoppm` 与 `imgtoppm` 自 1991 年，`xpmtoppm` 与 `sgitopnm` 自 1994 年，`jbigtopnm` 自 9.2（2000 年）。若干条目标注"由 Tristan Madani 发现并诊断"，还有一条对来源异常坦白：**"picttoppm：修复超大多边形输入导致的缓冲区溢出。一直就是坏的——事实上当年是为了编码方便故意这么写的（picttoppm 自 1988 年起就在原始 Netpbm 里）。"**

**为什么重要：** 这批 CVE 覆盖六个转换器，而发布说明覆盖十七个，且早了五周。如果你的暴露清单就是 CVE feed，那它只是你本来就需要打的那个补丁的子集；而"一直就是坏的"意味着这些不是重构引入的回归，而是这份代码从 1980 年代起就有的属性。请按记录里点名的分支版本升级，不要只升到"最新"。

[`🔗 CVE-2026-120431（NVD）`](https://nvd.nist.gov/vuln/detail/CVE-2026-120431) · [`🔗 Netpbm 10.86.51 变更日志（SVN）`](https://svn.code.sf.net/p/netpbm/code/!svn/bc/5371/super_stable/doc/HISTORY) · [`🔗 VulnCheck 公告`](https://www.vulncheck.com/advisories/netpbm-before-10.86.51-11.02.29-and-11.15.07-sgitopnm-heap-buffer-overflow)

---

## 25. CSGHub 把私有模型与代码文件交给匿名请求者——门户用自家管理员密钥签了这次请求

- **Velocity:** ▮▮ rising
- **Source:** VulnCheck CVE-2026-120426 · 发布于 2026-11-02 · issue #1586 于 2026-10-31 提交
- **Tags:** `cve` `idor` `model-hub` `self-hosted` `unfixed`

`CVE-2026-120426` 描述 **OpenCSG CSGHub** `v2.6.0-ce` 及之前的授权绕过：未认证的调用者可以在文件路径里注入百分号编码的 `current_user` 参数，从而读取私有 model、code、space 仓库中的文件。报告者在 issue #1586 里的追溯很精确。`GET /:repo_type/:namespace/:name/resolve/:branch/*path` 注册在一个没有逐路由守卫的裸路由组里，与它上方那些使用中间件的上传路由不同；当请求没有 `user_token` cookie 时，门户改用**全局服务端 API key** 去后端取文件；在这次特权调用里，行为主体的身份只由 `current_user` 查询参数承载，而攻击者控制的路径以 `%s` 拼在 `?current_user=%s` 前面、未做转义。由于 Gin 会把 catch-all 段里的百分号编码查询分隔符解码，一个以 `README.md%3Fcurrent_user%3D<owner>%26` 结尾的路径就能覆盖该参数。数据集不受影响——它们的路由带了其他路由缺少的登录中间件。

VulnCheck 给了 **CVSS 4.0 8.7**（`PR:N/VC:H`）与 **CVSS 3.1 7.5**——同一个 CNA、不同框架的约定——NVD 状态为 **`Deferred`**。目前没有可安装的修复版本：issue 于 2026-10-31 提交且仍是 open，最新发布是 **v2.6.0-ce（2026-10-15）**，`main` 的最后一次提交是 **2026-09-19**。

**为什么重要：** 自托管的模型中心里放着权重、数据集，以及被顺手提交进去的各种 token，所以一个未认证的 GET 就是全部暴露面——不需要写入，也不需要 RCE。这个缺陷是架构性的，不是笔误：面向用户的路由回退到了管理用服务凭据，随后用查询参数来断言用户身份。在版本发布之前，缓解只能放在代理层：拒绝匿名访问 `*/resolve/*`，或对私有命名空间强制要求会话。

[`🔗 CVE-2026-120426（cveawg）`](https://cveawg.mitre.org/api/cve/CVE-2026-120426) · [`🔗 Issue #1586（完整链路）`](https://github.com/OpenCSGs/csghub/issues/1586) · [`🔗 VulnCheck 公告`](https://www.vulncheck.com/advisories/opencsg-csghub-through-2.6.0-ce-unauthenticated-private-repository-file-read-via-resolve-route)

---

## 26. WSO2 的 9.4 说不需要任何权限——它自己的描述说攻击者需要一个低权限角色

- **Velocity:** ▮▮ rising
- **Source:** CVE 记录（WSO2 CNA）· 预留 2025-10-20 · 发布 2026-11-02
- **Tags:** `cve` `wso2` `access-control` `cvss` `api-gateway`

`CVE-2025-11969` 是 WSO2 API Manager 的 System REST API 访问控制失效。记录描述讲的是已登录用户：**"System REST API 没有正确执行访问控制机制，使得拥有较低权限角色的用户能够执行本应受限的管理操作。"** 同一条记录上的度量却不是这么说的：**CVSS 3.1 9.4**，向量 `AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:L`，其中 `privilegesRequired: NONE` 描述的是未认证攻击者。把该向量按描述暗示的值改成 `PR:L` 重算，得 **8.3**。两个数字都出自 WSO2；NVD 状态为 `Awaiting Analysis`，所以记录上没有第二种意见。

影响面很宽，且按构建号钉死。从 **3.1.0** 到 **4.5.0** 的九条 API Manager 分支各自带一个构建号上限（例如 `4.5.0` 需低于 `4.5.0.32`），另有 WSO2 Identity Server as Key Manager 5.10.0、Open Banking AM 与 IAM 2.0.0、API Control Plane、Universal Gateway 与 Traffic Manager。两个 Maven 构件（`org.wso2.carbon.apimgt.rest.api.util` 与 `.common`）列出了逐版本的修复构建，记录还说明经 API Gateway 暴露的 API 不受影响。这个 ID 于 **2025-10-20** 预留、**2026-11-02** 发布，相隔 378 天。

**为什么重要：** `PR:N` 与 `PR:L` 的差别，是按正常节奏打补丁与把这次部署当成已暴露来对待的差别，而且它让分数差了一个多点。记录本身没有解决这个问题，它链接的厂商公告我这边打不开，所以诚实的读法是取保守的一侧：在有会话的请求被公开之前，假定一个低权限账号就够。无论哪种，修复构建都是按分支点名的——"升级 API Manager"不是可执行的指令。

[`🔗 CVE-2025-11969（cveawg）`](https://cveawg.mitre.org/api/cve/CVE-2025-11969) · [`🔗 NVD 记录`](https://nvd.nist.gov/vuln/detail/CVE-2025-11969)

---

## 27. Auriga 补上 RoboDojo 规划—执行差距的 68.3%——而真正说明问题的是它起步的 22.5%

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2611.01112 · 提交于 2026-10-31 · 21 位作者
- **Tags:** `robotics` `agents` `harness` `embodied` `benchmark`

Auriga 技术报告的起手是一个与自家系统无关的测量：在把高层任务决策与物理执行分开的 RoboDojo 上，**去掉机械臂执行这一步，GPT-6 Astra 的成功率从 22.5% 升到 76.2%**。差距在接口，不在模型。Auriga 是一个任务无关的 harness，试图补上这个差距——模型在显式的任务信念上做决策，通过工具调用或合成的多步 Python 行动；harness 提供标定过的 3D 测量、以指尖为参照的双臂控制、通往机器人的唯一准入网关、动作前在仿真暂停时查看的轨迹预览，以及执行中检查各阶段容差与抓取边界、一旦偏离就停机并回传实测偏差供原地恢复。作者报告它零样本补上了这个差距的 **68.3%**，在 RoboDojo 上以 **57.7%** 成功率（**64.0** 分）排名第一，"在同一个模型上比参考 harness 高出一倍以上"，并且在场景随机化下仍居第一，而学习型策略最多掉 **33.9%**。在 RoboCasa365 上，同一个冻结的 harness 达到 **73.2%**，在复合任务上领先 VLA 辅助的 Agent 最多 23.1%。

保留意见是结构性的。这个 harness 是在 **13 轮跨任务能力迭代**中开发出来的，之后才冻结用于评测——这是对一个"零样本"数字背后究竟有多少迭代的诚实说明，但仍然是迭代。榜单是作者自己在某个基准上的提交，而 22.5% 正是以该基准的参考控制接口为基线测出来的。68.3% 也只是"一个模型在一个基准上"所定义的那个差距的比例。

**为什么重要：** 可迁移的结论是 22.5 → 76.2 这个摆动，因为它说明在这个基准上，具身 Agent 的缺口大部分位于控制接口，而不在感知或规划。这是一条关于"工程力气该花在哪"的断言，也正是为什么一篇 harness 论文可以在同一个榜单上压过一篇模型论文，而两边都没错。

[`🔗 Auriga（arXiv）`](https://arxiv.org/abs/2611.01112) · [`🔗 Auriga 项目页`](https://auriga.stelledge.com/) · [`🔗 代码`](https://github.com/lose4578/Auriga)

---

## 28. 四种提示优化器、八个任务，在强推理模型上没有显著收益——且有一臂在 5 次运行中 3 次塌到裁判下限

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2611.01135 · 提交于 2026-10-31 · Zhengshuai Yang、Changyun Li
- **Tags:** `prompt-optimization` `evals` `reasoning` `negative-result` `research`

《Compile as Hypothesis》检验的是每个提示优化工具底下的假设：在提示上做搜索能可靠提升下游准确率。跨四个优化器家族——基因组搜索、profile 引导变异、GEPA 与 ESPO——和八个任务，在同日配对的测量下，作者发现**"在强推理模型上没有统计显著的准确率提升"**。其中一个结构性发现不是零结果：离散的结构基因组能阻止双峰的种子塌缩——无约束搜索会"在 **5 次运行中的 3 次**塌向裁判下限"。

论文更有用的贡献是在 190 题的知识密集型评测上给出的三维 headroom 分类：提示优化无法弥补内在的知识缺口，也无法弥补物理上的 token 截断，但它确实能解决协议与格式错误。在 `gpt-6` 上，自由文本的反思式搜索（GEPA）拿到 **+0.14**，而结构化搜索持平——消融把这个增益拆成大约 **0.035 来自裁判评分标准的重建**、**0.105 来自真正的指令改进**。作者还报告"暴露了商业 API 在故障窗口内的静默后端混用"，并给出了逐调用审计验证工具。

**为什么重要：** 要带走的是那个拆分。如果一次测得的提示增益里有三分之一来自裁判标准的重建、而不是指令被改进，那么任何用 LLM 裁判打分的优化循环，都在部分地测量它自己的评分标准；而这个分类告诉你哪些失败根本是可修的。如果你的任务是知识受限而非格式受限，这篇论文给出的诚实预期是零。

[`🔗 Compile as Hypothesis（arXiv）`](https://arxiv.org/abs/2611.01135) · [`🔗 cs.AI 列表（2026-10-31）`](https://arxiv.org/list/cs.AI/2026-10-31)

---

## 29. 给 PPO 一个能重置自身需求的按钮，它只在 80 个种子里解出 2 个，而不是 71 个

- **Velocity:** ▮ steady
- **Source:** arXiv 2611.01183 · 提交于 2026-10-31 · Chase J. Metoyer
- **Tags:** `rl` `reward-hacking` `wireheading` `pre-registration` `research`

有界的内在奖励通常被认为不会被钻空子，理由是封顶的信号付不起利用它的代价。这篇论文直接测了这一点。一个稳态满足（homeostatic satiation）奖励给 Agent 会累积、在被满足时付钱的需求；再加一个重置需求的廉价动作，于是在 **MiniGrid DoorKey-8x8** 里，带这个动作的 PPO Agent 在 **80 个种子中解出 2 个**，而同样种子下不带它的是 **71 个**。在 **KeyCorridorS3R1** 里是 **20 个中 0 个**，对 **20 个中 20 个**。策略始终接近均匀——这才是关键：这不是一个学会了巧妙利用的策略，而是一个找到了按钮然后停下的策略。

论文也做了理论。一个 telescoping 论证把任何策略的满足回报上限钉在需求初始驱动值上，而后验计算显示，在所有训练过的增长率下，一条解题轨迹在全部采样布局上都超过这个上限——所以奖励并没有要求出现的行为。两个对照把结论钉住：开启优势归一化时，一个 Agent 能自己填满的满足信号比没有还差（只有任务奖励时 **20 个解出 11 个**，用可篡改信号时 **20 个解出 1 个**），而每次按下成本 **0.1** 就在每个种子上恢复了任务。所有预测都预注册、并从第 3 轮起哈希锁定，**23 个假设中有 9 个未获支持**——每一个都如实报告。

**为什么重要：** "有界"是取值范围的性质，不是激励的性质；这里利用它不需要通常意义上的 reward hacking，只需要一个满足信号却不做任务的动作用。每次按下成本能恢复全部种子，这是可操作的杠杆——给重置定价；而预注册加上九条公开的失败，是另外十四条值得相信的原因。

[`🔗 Satisfied, Not Solving（arXiv）`](https://arxiv.org/abs/2611.01183) · [`🔗 cs.LG 列表（2026-10-31）`](https://arxiv.org/list/cs.LG/2026-10-31)

---

## 30. Polyend 以 PolyForm Noncommercial 公开了 Tracker 固件源码——插件 SDK 是 MIT，合成引擎仍是两个 `.a` 文件

- **Velocity:** ▮▮ rising
- **Source:** Polyend · 公布于 2026-11-02 · HN 100 pts
- **Tags:** `open-source` `licensing` `embedded` `firmware` `hardware`

Polyend 于 2026-11-02 公开了原版 **Tracker**、**Tracker+** 与 **Tracker Mini** 的固件源码，同时发布可在三台机器上安装的 **Tracker Community Edition 1.0**。公告把话说得很明白：你可以"自己修改固件并分享你自己的版本"，并给出恢复路径："我们内建了一套恢复系统，避免一个错误的固件构建把你的 Tracker 变砖。"仓库（`polyend/tracker-ce`）写清了硬件差异——原版是 180 MHz 的 NXP Kinetis MK66FX1M0 Cortex-M4F，Plus 与 Mini 是 600 MHz 的 i.MX RT1051/RT1064 Cortex-M7。

值得读的是许可证。它分三部分：固件与大部分头文件采用 **PolyForm Noncommercial 1.0.0**；`.ptfx` 采样编辑器插件 SDK（`editor-fx-sdk/`）采用 **MIT**，许可文本明确写着开发者"被明示允许构建、分发并销售"这些插件；而 `synth/lib/libPolySynth.a` 与 `synth/lib/libPolyDSP.a` 两个预编译静态库保持**专有**。用固件做的商业音乐是被明示允许的；销售固件或其衍生版本、或把它放进商用硬件产品则不允许。GitHub 的许可证识别把该仓库标为 **NOASSERTION**——一个未被识别的复合许可看起来就是这样。

**为什么重要：** 这是带刻意商业切分的 source-available，不是开源——你真正想用来做一台全新乐器的那套合成引擎仍是二进制。这个切分也是一种更多硬件厂商会采用的模板：社区能增值的地方给宽松许可（插件），产品所在的地方给非商业许可，DSP 所在的地方保持闭源。

[`🔗 Tracker 固件公告`](https://polyend.com/whats-up/tracker-the-biggest-update-yet/) · [`🔗 polyend/tracker-ce`](https://github.com/polyend/tracker-ce) · [`🔗 LICENSE（PolyForm NC + MIT SDK）`](https://github.com/polyend/tracker-ce/blob/main/LICENSE)

---

## 31. syscall.sh 重新上线：27 张架构表，每个架构一个 JSON 端点

- **Velocity:** ▮ steady
- **Source:** Show HN · 215 pts · ~19 小时前（~17:29 UTC+8）
- **Tags:** `linux` `syscalls` `reference` `json` `devtools`

syscall.sh 是一个可浏览的 Linux 系统调用表索引，最近重建并重新上线——关于页说它始于 2020 年，中间停更数年，"自 2026 年起重新维护"。现在覆盖 **27 种架构**，每种都给出调用号、参数与寄存器约定：x86_64 上 **369** 个系统调用（自 3.3 起）、i386 **441** 个、AArch64 **326** 个（自 3.7）、RISC-V 64 **327** 个（自 4.15）、ia32 兼容层 **439** 个，一直列到 Hexagon、MicroBlaze 与 Xtensa。表覆盖 Linux **3.3 到 7.3**，每个架构还提供纯 JSON：`/<arch>/syscalls.json`，另有一个 API。

**为什么重要：** 系统调用号既不能跨架构移植，也不跨内核版本稳定，而这恰恰是模拟器、seccomp 沙箱配置、追踪工具和手写汇编会坏掉的地方。把每个架构的表做成 JSON，就把"查表"变成了一个构建输入——而每个调用的出现/移除历史，是头文件告诉不了你的那部分。

[`🔗 syscall.sh`](https://syscall.sh/) · [`🔗 x86_64 表（JSON）`](https://syscall.sh/x64/syscalls.json) · [`🔗 关于`](https://syscall.sh/about)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-03T04:25:33Z |
| Items | 31 |
| Sources tracked | 22（Hacker News、GitHub Trending、arXiv、NVD、cveawg、厂商博客、安全公告） |
| Update schedule | 04:03, 12:03, 20:03 UTC+8（每日三次） |
| Ranking | 速度加权（时效 × 互动加速度 × 来源权威度） |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[前一天](2026-11-02.md) · [原始 .md](../feed/2026-11-03.md) · [归档](../archive/)
