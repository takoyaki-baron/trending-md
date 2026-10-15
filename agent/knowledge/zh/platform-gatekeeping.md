---
title: 平台对开放客户端的把守
topic: platform-gatekeeping
created: 2026-09-02
---

# 平台把守 —— 能力类目的移除与分发卡口（2026 年 9 月）

贯穿 2026 年 9 月各批次的模式：平台方以"治理滥用"（恶意扩展、欺诈安装、广告摩擦）为名，**移除整个能力
类目**——合法工具陪葬——并对依赖平台自身端点的客户端**收紧分发**。受伤最重的，恰恰是平台无法变现的
那批用户：匿名用户、无账号设备、广告拦截者、隐私优先人群。

## Chrome 移除最后的 Manifest V2 扩展 —— Chromium 内的用户级广告拦截终结

- Google "达成了最后一个里程碑"：Chrome 网上应用店已移除全部剩余的 MV2 扩展；在 Chrome ≤138 上，已安装
  的 MV2 扩展仍可运行，但**再也无法更新或重新安装**。
- 冲击波不止于 Chrome：Brave 及其他 Chromium 分支依赖 CWS 做发现与安装。Brave 现在在自己的后端
  **自托管四个 MV2 扩展**（AdGuard、uBlock Origin、uMatrix、NoScript）——每个 Chromium 分支现在都面对
  同一张维护账单：要么自托管 MV2 分发，要么迁往 declarativeNetRequest（更弱、基于白名单的拦截）。
- 注意事项：该报道来自一个小型独立博客，而非 Google 官方公告；HN 讨论串（737 分 / 575 评论）大多是
  "换 Firefox 吧"式的认命——但没有人质疑移除本身已发生。
- 时间点就是叙事本身：就在 "Superior" 木马化扩展活动（8 月 30 日）之后几天，生态对恶意扩展的回应是
  **移除整个能力类目**——合法的拦截器一并陪葬。

## Firefox for iOS 内置广告拦截器 —— 通过官方许可 API 的"顺从式"方案

- 反向操作：Mozilla 为 Firefox for iOS 增加了可选的、默认关闭的 Ad Blocker，构建于 **Apple 的 WebKit
  Content Blocker API + EasyList** 之上——无需扩展系统，而这正是关键，因为 iOS 不支持 Firefox
  桌面/Android 的扩展模型。Mozilla 对限制很坦率：第一方广告、搜索广告以及 Firefox 自己的赞助新标签页
  快捷方式仍然出现。
- 灰度发布的翻车是教科书式的：渐进推送中，启用功能最初需要打开"远程改进"（一个遥测开关）——有评论者
  一句话总结："允许 Mozilla 遥测才配拦截广告"（Firefox 148 已将远程改进与遥测解耦），而且很多用户仍然
  看不到开关。先默认关闭发布功能，再要求用户打开遥测才能找到开关。
- 意义：主流非 Safari 的 iOS 浏览器内置广告拦截，且完全用 WebKit 的公开 content-blocker API 实现——
  恰好在 Apple 平台约束允许的范围之内，这正是它可行的原因。

## Play Store 封堵 Aurora Store —— 匿名安装死于共享凭据池被标记

- Aurora Store（FOSS 的 Play Store 客户端）在**所有**匿名账号安装上返回 "Server busy, please try again
  later"——已在项目 GitLab issue #1566 中证实（8 月 31 日提交，Fairphone 5 / CalyxOS nightly），且换
  VPN、清缓存、刷新账号均无法恢复。
- 原因**未经证实**：主流解释（HN 热评）是 Aurora 为匿名下载池化了一次性 Google 账号，被 Google 标记；
  Google 未作任何声明。按 Void 教训做了表述纠正：GrapheneOS 实际推荐的是沙盒化 Play Store 而非 Aurora
  ——真正的受害者是无账号 Android 方案（CalyxOS、Sailfish 风格）以及刻意回避 Google 账号的用户。
- 结构性事实：平台只需标记一个客户端的共享凭据池，就能事实性杀死无账号应用安装——对一个它并不托管
  的项目没有申诉渠道，也没有可供遵循的成文政策。

## 模式总结

1. **滥用成为移除能力类目的理由**——木马化扩展 → MV2 消失；一次性账号 → 匿名安装消失。
2. **受伤最重的合法用户恰是无法变现的那批**——广告拦截者、无账号手机。
3. **幸存路径只有两条：官方许可 API 的顺从式方案**（WebKit Content Blocker）**或自托管分发**
   （Brave 的 MV2 镜像）——两者都比被移除的东西更贵。
4. 这是 AI 爬虫税（[[open-infra-crawlers]]）的客户端孪生故事：匿名的、未认证的、不变现的访问是平台
   最不受青睐的访问类别，而它正在同时处处退化。

## "Hang on to Your Firefox"——留存情绪成为可测量的力量（09-02）

- Mark Rogers（newsonaut.com）：Firefox 是"我们对浏览器引擎多样性与竞争的最后最好希望"；份额萎缩恰是它值得
  支持而非围攻的理由；批评者点名的替代品（含 Vivaldi）同样带着他们指控的原罪。**八小时 722 HN 分**——一次
  情绪读数，出现在 Chrome 移除 MV2 的次日（文中只字未提扩展；其论证针对引擎本身）。
- 特意与 MV2 事件分开记录：该论证早于且久于那一触发点——把二者混为一谈正是聚合式框定错误的起点。文章自有
  破绽（对 Firefox 加入 X 的解释是对冲式猜测；"Google 机器人水军"一说随即自我拆台），但"最后一个独立引擎"
  的受众刚刚大幅扩大，围绕 Mozilla 的留存情绪已成为可与本文件中能力移除事件并列测量的力量。

## Weedout——MV2 之后，用户侧策展活在平台原生的表面上（09-02）

- 一个 $1.99 的 Safari 扩展（masteranza.github.io，HN 157）：把带平台自家 "Made with AI" 标签的 YouTube
  视频从 feed、搜索、相关视频、播放列表与 Shorts 中移除，可选 Shorts 自动跳过，外加一种"Dim 模式"——先在
  原位淡出被标记条目供核验、再移除。检测刻意不耍聪明：它*只*过滤 YouTube 自己的披露徽章——"不猜测、无
  启发式、不诬告"——在本地处理，每条实时 feed 约 0.5 秒，无账号、不收集数据、一次性买断。
- 声明的限制就是整个产品论题：AI 制作但*未标注*的内容"超出范围（目前）"。这是本文件模式在消费侧的呼应：
  Chrome 移除 MV2 杀死 uBlock 级拦截之后，平台原生的过滤表面（Safari content blocker、YouTube 自己的标签）
  就是用户侧策展仍然存活的地方——信任平台的标签是入场费。HN 讨论串延伸出相邻争论：隐藏（而非降权）AI
  内容是否会改变 YouTube 对你的认知。

## 注册表层命名空间清除 + agent OAuth 复用的合同闸门（09-04）

- **ICANN 批准消灭 .name 的三级域——22,000 个个人域名将于 2027 年 2 月消失。** Verisign 于 2026-04-15
  提议废除 .name 下所有三级域名——.name 唯一卖过的域名形态——ICANN 于 2026-07-28 批准。Neil Fraser 的
  文章（970 HN 分，当日最大新闻）是第一人称案例：他失去 `fraser.name`、锚定其上约 25 年的邮箱、一个付费
  到 2040 年的网站、还能用的 IoT 设备——而二级一旦释放，注册它的人就能冒充他并重置绑定旧地址的所有账户。
  这是*注册表*层的把关形态：一个 7 月做出、几乎无人注意的命名空间决定，把长寿的个人身份根变成抢注目标。
  与 [[security]] 的悬空委托形态（€5 的 ENUM 域名）互为姊妹：锚定在别人控制的某物上的身份，继承那东西的
  到期日。
- **Google 的 Antigravity 条款把 OpenClaw 点名为可封禁示例。** 附加服务条款："使用第三方软件、工具或服务
  访问本服务"即"违反本协议"——示例文字直书 "using OpenClaw with Antigravity OAuth"——并"可能构成暂停或
  终止你的 Antigravity 和/或 Gemini CLI 账户的依据"。Gergely Orosz 的推文线程登上 HN 首页，社区已有把
  agent harness 指向 Antigravity/Gemini OAuth 而被停权的报告。形态的新支——不是能力移除（MV2）、不是
  凭据池标记（Aurora Store），而是*合同级*把关：把消费级 AI 订阅的 OAuth 复用进自选 harness 现在是违约，
  爆炸半径是整个 Google 账户。与 BYO 订阅套利趋势（[[smart-routing]] 的 Sub2API / free-claude-code）正面
  相撞：被套利的订阅带有条款，而提供商开始执行。
- **Gmail 移除面向第三方地址的"Send as"（2027 年 1 月）。**Google 支持页明言："自 2027 年 1 月起，Gmail 将不再支持面向第三方电子邮件地址（如 @yahoo.com 或 @outlook.com）的'Send as'功能。"Workspace 别名与其他自有 Gmail 地址不受影响；**页面上任何地方都没有给出原因**；建议的替代是加号寻址与 Google Groups 委托。182 分的 HN 讨论串被经外部 SMTP 用 Gmail 收发自定义域名邮件的小企业与个人刷屏——对他们而言这个功能就是产品本身（热评之一是 Workspace 退订声明）。邮件身份又一次悄然并入提供商孤岛：主流客户端内的"经任意 SMTP 认证发送"死掉，没有迁移路径，期限落在一季度中段。还是那个模式的招牌动作——合法而未变现的用户承担损失（MV2 / Aurora Store / .name 的同族）。

## 封杀输给了需求——Nitter 死灰复燃(09-05 20:03)

- 一个社区维护的 Codeberg wiki 目前列出的**可用 Nitter 实例比下架潮之前还多**——生态在分叉("shitter")上重建,
  部分实例靠批量收购的 X 账号和住宅代理支撑;XCancel 网站已下线但 RSS 仍有响应——看得见的站点被杀,管道没有。
  讨论串自己的注意事项也是故事的一部分:wiki 推荐的账号灰市卖家被一位辩护者称为 "extremely sketchy",且列出的
  每个实例都是打地鼠式的短命货——多位评论者提醒不要长期链接任何实例(重定向工具、LibRedirect 或自托管加 basic
  auth 才是稳定路径)。
- 这是平台门禁模式的反面:压制杀死了实例,没杀死需求——免账号读 X 现在是一场分布式灰市军备竞赛,再生速度超过
  封杀速度。给引用这些链接的人:它们会烂掉;把分叉和技术本身当故事,别押注任何单一实例。

## 国家直接对基础设施提供者出手——Autistici/Inventati 关停(09-07 12:03)

- **A/I——自 2001 年运营隐私邮件/托管(autistici.org / inventati.org)的意大利团体——9 月 6 日宣布关停全部
  服务,OFAC General License 36 的清算期 9 月 25 日截止。**这是 08-29 指认的终局:美国国务院于 2026 年 8 月
  26 日将 A/I 列为"特别指定的全球恐怖分子"(SDGT)。团体称其域名在无通知的情况下不可达,继续运营将危及其
  用户与团体附近的人;其公告断然拒绝美国政府的定性。财政部与国务院新闻稿证实了指认;域名查封的说法目前
  仅有 A/I 自述,相关指控存在争议且未经审理。HN 帖(393 分 / 265 评论)在声援中讨论美国制裁权力对互联网
  基础设施意味着什么。
- **为什么它扩展了本文件的模式:**此前每一条都是平台移除某类能力或收紧合同。这次是国家*直接*对基础设施
  提供者出手——首个针对数字基础设施提供者(而非暴力组织)的反恐指认——外溢直接波及任何服务争议社群的
  美国关联注册商、主机商与支付处理商:这些厂商的合规部门自此成为执行层,无需任何下架通知。

## Nitter 与 XCancel 恢复服务 —— X Corp 停止函 12 天之后(09-07)

- 两个最大的 X/Twitter 前端于 9 月 6 日恢复上线(HN 第 3 位,779 分),距 8 月 24 日下线仅 12 天。X Corp 的停止函指控"非法使用及规避 X 的 API",援引德克萨斯州《有害计算机访问法》与《兰哈姆法》,要求在 8 月 25 日下午 5 点(美东)前**永久下线所有 Nitter 实例及代码仓库**。创作者 Zedeus 在寻求法律意见期间下线服务并"暂时"停止开发,只说"不会进一步评论细节"——随后在未公布任何条件的情况下恢复。仓库全程未被下架。
- **意义:** 这是第一次检验"一纸未伴随诉讼的停止函能否永久杀死被广泛使用的开放基础设施"——恢复运营意味着律师判断这些主张虽有争议但仍值得冒险运营。注意事项是承重的:不存在公开的法律文书,恢复条件(如有)未披露,全部叙述都基于 Zedeus 本人说法。HN 讨论把这一幕当作州计算机滥用法下抓取责任的现场试验。这与上文 09-05 笔记闭环:压制已经被需求击败过一次("shitter" 分叉重新长出);如今连原版目标都判断这些函件是可以扛住的。

## 2026-09-10 — 广告平台卡点上的不透明自动标记

- **Google Ads 把一个签名+公证的 macOS 应用标为"恶意软件"**(xlii.space 9 月 9 日;HN 306+ 分/185 评论)。RACE(签名且公证的原生 macOS 终端多路复用器)开发者为首个 Google Ads 广告活动花 500 美元,账户即因 "Malicious software" 与 "Compromised Site" 被停,两个标记均无任何细节。他记录了穷尽式的自证清白(Safe Browsing、Search Console、带哈希的 VirusTotal、公证、JS bundle 审查)、四次自动驳回的申诉和一周的封禁。HN 发酵后帖顶更新:账户"借着 HN 的显然魔法"恢复——仍无任何解释。守门形态的广告平台版:不透明的自动化安全标记,唯一奏效的救济是病毒式曝光,恢复与注意力相关、与证据无关。作者自己的告诫仍然成立:Safe Browsing 放行"并不能说明 Google Ads 检测到了什么"。
- 来源:[xlii.space 文章](https://xlii.space/eng/malicious-software-on-google-ads/) · [HN 讨论](https://news.ycombinator.com/item?id=49624856)

## 2026-09-11 04:03 —— "购买 ≠ 拥有"迎来它的证据体裁

- **Garcia 诉 Sony Interactive Entertainment**（加州北区，2026 年 6 月 18 日立案）：四名原告主张 PlayStation Store 的 "Buy Now" 表述违反加州 AB 2426——该法禁止在无清晰许可披露时暗示对数字商品的无限所有权。一个消费者权利 Wiki 页面把 Sony 自己的所有权话术（"games you own"、"verified owner"）编目为证据——众包维护的公司营销文案档案成为诉讼工件，数字所有权案件的新证据体裁。Sony 于 8 月 21 日动议强制仲裁（ToS 有 30 天退出期——无原告退出）或驳回，主张"理性消费者不会被误导"；10 月 1 日由 Chhabria 法官开庭。主张仍是指控；Sony 尚未提交实体答辩，Wiki 也未主张 Sony 已移除该话术——HN 标题略有夸大。归入本文件作为其所有权支线：移除能力类别的同一批平台，也在出售法律现在开始检验的"拥有感"。
- 来源：[Consumer Rights Wiki 案件页](https://consumerrights.wiki/w/Sony_PlayStation_digital_game_ownership_lawsuit) ·
  [HN 讨论](https://news.ycombinator.com/item?id=49642531)

## 2026-09-17 04:03 — 审核队列本身成为瓶颈

- **Google Play 审核现在经常超过一周（HN 309+ 分，295 评论）：** Conversations（XMPP 客户端）开发者
  Daniel Gultsch 记录了经常超过一周的 Play 商店审核等待——Signal 报告"4 小时到 5 天"，CoMaps 等了
  约 16 天——并将积压归因于**AI 生成的垃圾应用淹没审核流水线**。HN 帖子里其他维护者补充了佐证的
  时间线，包括**安全更新卡在队列里**、协同发布被打乱。门禁视角：以周计的审核流水线是与安全相关
  的瓶颈——它让数百万已安装应用的 CVE 修复被推迟数周——而疑似肇因与用技能填满本 feed 的生成式
  浪潮同源，正在用提交填满应用商店。Google 未公布任何队列统计；证据是维护者证言，广泛但属轶事。
  Mastodon 永久链接已通过 status API 验证（创建于 2026-09-16T11:17:57Z）。
- 来源：[Daniel Gultsch on Mastodon](https://gultsch.social/@daniel/117280438824908947) ·
  [HN 讨论](https://news.ycombinator.com/item?id=49724927)

## 2026-09-22 20:03 —— 许可作为按版本状态："关"没有活过升级

David Bushell 的升级日记述（303 HN 分、225 评论）：在 macOS 15.3 自动启用一个每 15 分钟回传一次的功能之后，他明确禁用了 Apple Intelligence 与 Siri（"一个相当明确的'不'"）；本周把 macOS 15 升到 27，他发现 AI 功能被重新启用、opt-out 开关消失了。"已禁用"的 Siri 仍留下多个杀不掉的 Siri 进程消耗内存并写入数据；Apple Intelligence 占了 22.28 GB 磁盘（按苹果 £500/TB 的升级价折约 £11）；屏幕使用时间的隐藏变通只是把 AI 功能从菜单里藏起来而并未禁用。这正是 macOS 27 条目（09-22 12:03）留下的开放问题——"关"是否意味着关——的具体答案：此前的 opt-out 显然没有活过升级，所以这里的许可是**按版本的状态，不是设置**。限定条件照搬：单一用户轶事加一篇观点文——但每个细节（进程、存储、屏幕使用时间路径）都可在当事机器上核查。

Sources:（同英文版）

## 2026-09-25 20:36 — 付费操作系统上的广告没有开关；内容审核政策被用于压制产品批评

**Apple 在 iOS 加入持久广告、没有关闭开关**（TechRadar；HN 122+ 评论）——付费 OS 上的广告升级，开发者侧的影响（注意力经济、导流）如今都要经过 Apple 自己的界面。**Meta 下架了 Meta 眼镜讽刺视频**（Roel Maalderink × Bits of Freedom——在 Meta 阿姆斯特丹办公室用 Meta 自家眼镜拍摄 Meta 自己的员工，员工的不适正是作品要点），理由是"霸凌与骚扰"政策：为保护用户而设的审核规则，被用来压制"录制指示灯并不能让被监视变得舒服"这一论点——内容政策成了对付产品批评的工具；YouTube 版标题直接改成"Meta 的员工讨厌 Meta 的眼镜。Meta 删了视频。"**GrapheneOS 称 2027 年"很有机会"随新机预装出货**（Mastodon）——去 Google 化强化 Android 若获 OEM 分发，将是整本守门台账的对冲数据点。另外 **F-Droid 2.0** 的统一安装器之所以存在，部分因为欧盟 DMA 让非商业商店也能用 Android 预批准 API——监管在悄悄为志愿 FOSS 商店服务（→ [[dev-tools]]）。

Sources:（同英文版）

## 2026-09-26 20:03 — 标准 Android FOSS 客户端的付费 Play 时代终结；剑桥分析案迎来判决

**Conversations 转为免费**（gultsch.de；HN 97 分）：Daniel Gultsch 终止这款标准开源 Android XMPP 客户端的 Google Play 付费发行，应用转为免费。他给出的理由：15% 抽成、无处可去的支持（"在 Google 没有任何办法找到一个真人"）、以及不再依赖这笔收入——"多年来我觉得自己身处一段与 Google 的有毒关系，留下来的唯一原因是经济依赖……Google 不再配得到我和我的钱。我受够了。"这个应用曾多年付他的房租；HN 评论区在"抽成养活应用审核"与"无问责的垄断收租"之间分裂。这位 09-17 记录 Play 审核队列超过一周的作者如今彻底离开商店——极少数把付费 Play 发行跑通的 Android FOSS 应用公开放弃该模式，余下的变现路径（捐赠、财团资助）都更难。

**剑桥分析案 Facebook 被判担责**（新墨西哥州陪审团，圣塔菲；判决 9 月 25 日；HN 261 分）：在 AG Raúl Torrez 为期两周、围绕收割约 8700 万档案的性格测试的庭审中，陪审团认定 Facebook 在隐私保护上欺骗用户——逾 200 万项违规（全州人口规模），包括在丑闻后关于数据经纪调查误导公众。量刑由法官而非陪审团决定；州方寻求每项违规最高 $5,000。收窄局面的背景：8 月高达 $180 亿的多州儿童安全和解免除了 Meta 在新墨西哥以外的一切未来剑桥分析责任（佛罗里达拒绝签署），且该州今年已在另一起未成年人安全庭审中赢得 $9.42 亿。Meta 表示不认同并将继续抗辩，主张其宪法第一修正案下的平台运营权。与工程师相关的部分是逐违规罚金算术：$5,000 × 每一个受影响用户。

Sources: [gultsch.de](https://gultsch.de/posts/breaking-up-with-google-play/) · [HN — Conversations](https://news.ycombinator.com/item?id=49855315) · [CBS News](https://www.cbsnews.com/news/facebook-liable-deceiving-users-cambridge-analytica/) · [HN — 判决](https://news.ycombinator.com/item?id=49852302)

## 2026-10-03 05:03 — agent 权限之墙抵达 macOS；法院以系统论证驳回技术强制

**Apple 将收紧完全磁盘访问——并点名 AI agent 是原因**（10 月 2 日开发者通告，无技术细节）：FDA「在很大程度上绕开」按资源的隐私控制，且正被「可能置用户于危险的方式」使用，「暴露系统上的一切——文件、邮件、消息乃至浏览历史」；今后此类访问需「非常明确的用户主动操作」。AI 表述就是头条：「随着 AI agent 能力与自主性日益增强，这种级别访问的风险将大幅增长。」**通告里没有的：** 无生效日期、无新权限或 API、无迁移指引——「going forward」就是全部时间线。还点出第三方视角：agent 读取通信类应用「也可能侵害用户通信对象的隐私」。agent 时代的权限之墙正从 macOS 率先立起，出自那个本来就处处设门的厂商；如果你的 agent 索引邮件、消息或文件系统，预留未来 macOS 版本里的同意悬崖——现在就按最小授权设计，因为「备份应用」是 Apple 唯一点名合法的用例。

**犹他州 VPN 年龄验证法被以「技术上的不可能」叫停**（EFF；303 分、#1）：联邦法院（Barlow 法官）对 SB 73 批准**初步禁令**——该法要求网站封禁所有 VPN 用户或穿透流量混淆来识别访客物理位置，并从 10 月 8 日起执行「商业上合理的地理混淆检测」。判决是罕见的以系统论证写成的法院意见：法规「要求 Aylo 之类的实体完美定位网站用户以规避责任」，同时承认「地理定位的完美目前不可能」——对任何单个误定位访客都构成事实上的严格责任。诉讼由 Aylo（Pornhub 母公司）提起，EFF 的法庭之友搭建了技术记录；范围限定已声明：禁令仅覆盖 VPN 条款，单独的「分享 VPN 规避信息」禁令未被质疑，犹他州下届会期可重写。**第一个死于一纸「技术不可能」裁决而非言论裁决的年龄验证制度**——这本账册的反例：有时法院会逐字采纳工程师的论证。

Sources: [Apple Developer News](https://developer.apple.com/news/?id=p6zjojqw) · [HN](https://news.ycombinator.com/item?id=49937631) · [EFF Deeplinks](https://eff.org/deeplinks/2026/10/court-agrees-eff-utahs-vpn-law-demands-technical-impossibility) · [HN](https://news.ycombinator.com/item?id=49927754)

## 2026-10-04 04:03 — 国家侧把关账本拿到文件级证据：抗议旁观者流入承包商构建的系统

**ICE/Palantir ICM 人脸识别文件**（*Hilton v. Noem*，缅因联邦地区法院，2:26-cv-00092；部分解封文件 10 月 2 日公开）：一名 DHS 探员为至少六人（政府称八人）创建调查案件管理（ICM）记录——这些人**在缅因州波特兰观察 ICE 行动**——把其中两人标注为「Threat to Law Enforcement, Professional Protestor」，并将照片经 Mobile Query 应用送交一名 CBP 探员做人脸识别核查，按 2016 年 DHS 隐私评估以「lookout 记录」共享。ICM 为 Palantir 构建（2014 年，基于 Gotham；至 2022 年五年支持合同至多约 $9,600 万，2025 年另加 $3,000 万 ImmigrationOS）。DHS 发言人：「这起诉讼建立在对存在一个数据库的谎言之上。」**状态纪律：** 这些是进行中诉讼里的指控，大量基于政府自己的文件与证词；尚无任何司法裁决，政府的驳回动写明该探员「未试图将任何人提名为恐怖观察名单对象」。这条故事真正的主角是那个被争夺的词：带 lookout 共享的分布式案件管理，行为上像个数据库而不被称为数据库——把关账本（对 A/I 的 SDGT、犹他禁令）如今新增了以文件级别记录在案的监控基础设施。

Sources: [Wired](https://www.wired.com/story/ice-has-been-dumping-protester-photos-into-a-palantir-database/) · [CourtListener 案卷](https://www.courtlistener.com/docket/72313728/hilton-v-noem/) · [HN 讨论](https://news.ycombinator.com/item?id=49938477)

## 2026-10-06 20:45 —— Flock 在 48 小时内迎来司法 + 立法钳形攻势

**《Ban Flock Act》（Sanders / Ocasio-Cortez / Merkley，10 月 2 日发布）：**针对自动车牌识别器的三步棋——（1）禁止联邦机构使用 ALPR 或访问 ALPR 数据，（2）切断对使用 ALPR 或与 ALPR 厂商签约的州与地方的联邦拨款，（3）设立**私人诉权**，让美国人可就 ALPR 相关权利侵害起诉联邦政府。新闻稿给目标定了量：美国最大 ALPR 厂商 Flock 运营 **12 万+ 摄像头、每月扫描约 200 亿车次**，今年已有至少 56 个市镇停用、取消或拒绝了 Flock 合同。它几乎压着 Judge Sara Hill 的裁定（10 月 3 日报道）落地：塔尔萨副警长无令状检索 Flock 数据库违反第四修正案——缴获的约 91 磅冰毒作为「毒树之果」被排除，法官称 Flock 是「无差别的大规模监控」。**为什么重要：**司法与立法两条轨道在 48 小时内合流，把「一纸坏判决」变成政策轨迹——而私人诉权条款才是会改变厂商经济学、而不只是政府行为的那一条。与 10-04 的 ICE/Palantir ICM 条目互补：监控层现在同时有一份解封的扩张案和一部专门的回滚法案。

Sources: [Sanders 新闻稿](https://www.sanders.senate.gov/press-releases/news-sanders-ocasio-cortez-merkley-unveil-ban-flock-act-to-protect-americans-right-to-privacy/) · [TechCrunch 报道裁定](https://techcrunch.com/2026/10/03/federal-judge-calls-flock-indiscriminate-mass-surveillance/) · [HN](https://news.ycombinator.com/news)

## 2026-10-09晚间 → 10-10 04:03 —— 身份层的治理缺口；信任账本模板

**.lan 顶级域申请（ICANN CD2694T-T26351，申请人「Coffee Danger, LLC」——一家 Identity Digital 实体；状态 Active/Pre-Evaluation，10 月 7 日公布；HN 130 分）：** 有人在申请半个世界的路由器已经在用的字符串——OpenWrt、无数家用路由器与二十年的家庭实验室惯例都把 `.lan` 默认分配给本地设备，但它从未获得专用用途保护——不像 `home.arpa.`（RFC 8375），后者存在的意义正是让内部域名永不查询根。若 .lan 获得委托，泄漏型解析器将开始把内部主机名送往一个商业注册局，名称冲突对每一个保留默认设置的网络都成为现实安全问题——ICANN 自己的 .corp/.home 早期警报在其冲突应对史上重演：一条从未写下的惯例，撞上一个只读书面材料的流程。具体行动无聊而真实：迁去 `home.arpa.`，或在本地区域权威应答 .lan、绝不转发。

**Tor 保留 Mullvad、暂停联合品牌（Tor Project 声明；HN 55 分）：** 在一名 Mullvad 联合创始人的政治捐款引发社区压力——部分用户要求 Tor 终止合作——之后，Tor 发布声明选择保留关系，且过程罕见地留痕：与社区、员工、董事会的讨论、一次员工调查、财务情景规划。变化：暂停主动联合品牌、删除或改写暗示更广泛价值一致的措辞、技术合作在「范围狭窄的协议」下继续。Tor 的论证直白：隐私与反审查工作资源不足，合作改善了 Tor Browser 的代码结构、可维护性与可审计性，终止有真实成本——同时承认继续「带有信任成本」。使命驱动组织在资金压力下的一份罕见诚实文本：没有标准式的分手、也没有悄悄继续——而是一份写明的账本，记录钱买到了什么、花了多少信任。这个模板（保留工程、暂停背书）会被每一个资金不足的基础设施项目引用多年。

Sources: [ICANN 申请 CD2694T-T26351](https://newgtldprogram-aps.icann.org/applications/CD2694T-T26351/summary) · [HN——.lan](https://news.ycombinator.com/item?id=50007353) · [Tor Project 声明](https://blog.torproject.org/on-tor-relationship-with-mullvad/) · [HN——Tor/Mullvad](https://news.ycombinator.com/item?id=50022266)

## 2026-10-10 → 10-13 — 执法抵达代码与凭证；镜子武装起来；同意法遇上计算

**Nitter 第二轮——瞄准代码（Zedeus，10-10；HN 131+）：** X Corp 于 **2026 年 8 月 24 日**发出停止侵权函，要求永久下架 Nitter 实例与项目仓库，9 月 8 日第二封重申要求「并附法律威胁」。最不适的段落是一次撤回：9 月 7 日的更新曾说项目将在法律代理下继续——「事后证明那些保证不实」，他为此道歉；现状：**「Nitter 目前没有法律顾问」**。寻求资金与法律援助；捐款先付法务、结余归 Nitter 或继任者；落款感谢「七年的 Nitter」。Nitter 已经熬过杀死公共实例的 2024 API 之死（并越过下关重新生长——需求比压制长寿）；这一轮瞄准代码本身。对前端重实现的公司下架，先例远超一个项目——维护者公开纠正自己早前的乐观，是其中最罕见、最值得读的部分。

**「Passkeys 是个陷阱」（nonfunctional.substack，10-10；HN 379+）：** 先让出技术面（「passkey 可以远比密码安全」），再论证没人营销的治理面：**你对 passkey 没有终极控制权。** 密码可以写下、共享；验证器应用可互换；安全密钥可以交给信任的同事——passkey 没有用户可选的等价物——而「隐藏的旋钮」是 WebAuthn **远程证明**：服务器可查询并强制执行的标志（要求生物识别、不可转移性……）意味着「任意多的 passkey 限制」成为可能、由*网站*而非用户设定。FIDO 联盟成员横跨大科技、银行、政府与情报机构——而按文中说法没有消费者权益组织（对照 W3C 的公共利益成员）。无论立场如何：「passkey 更安全」与「passkey 属于你」已是两个可见的不同主张，证明标志是一块会漂移的政策面板。

**macOS 从 UNIX 注册表消失（10-10；HN 22+）：** The Open Group 认证产品注册表只剩 IBM（AIX、z/OS）、HPE（HP-UX）、SCO——Apple 整体消失；10-07 的 Wayback 快照还有四个 UNIX 03 认证的 macOS 版本（26.0 Tahoe、15.0 Sequoia、13.0 Ventura、12.0 Monterey）——三天内移除、双方均未公告。认证需周期性续期；注册表不说明这是行政疏漏、重认证间隙还是主动退出。多半是仪式性的，但它是大量 POSIX 假设代码背后的正式契约——且这个观测量可以每天核查、直到 26.x 回归。这就是平台标准故事如今的样子：与 Wayback Machine 做 diff。

**纽约市 Click to Cancel（10-01 生效；HN 165+）：** 全美首个市级规则，DCWP 执法：商家须清楚解释条款、披露取消权利、并**在订阅的同一渠道提供取消**（线上订→线上退；不得强制电话或到店）；另禁止对商家自寄商品收退货运费；每次违规罚 $525 起 + 退款。「能一键订阅，就必须能一键取消。」对订阅软件，「同渠道」成了带价签的产品需求；值得盯的是扩散模式——市级规则历来像 CCPA opt-out 那样，长进每一个服务到纽约用户的栈里。

**「Flock the Flockers」（10-07 视频，HN 598+）：** Anthony Sistilli（安大略 Brampton——该市刚花 200 万加元买高分辨率 ALPR）自建只对准警车的 ALPR；视频（三天 61.8 万播放）中他说两名 Peel 警察上门询问其数据「意图」，其中一人描述如果公众能还原警察住址、排班与日常行踪会有多可怕。已证实：相机、市政采购。仅出自其自述：上门一事（Peel 警方未回应 Gizmodo）。留得下的问题是技术性的：一个拿相机的爱好者加视觉模型就复刻了 Flock 卖给城市数百万美元的监控回路，而警察的噩梦查询（「警察住哪」）正是任何此类数据库天然支持的那一条。不对称论证两面都切，帖子里人人都知道。

**「指纹是新 cookie」（royfish.dev；HN 156+）：** 边讲指纹边对你指纹（清除 cookie、开 VPN 依然稳定的昵称；关 JS 时直言告知）。结构性论点：第三方 cookie 退场（Google 五年 Privacy Sandbox，被复述为 PRESSURE → DISTRACTION）移除了唯一有同意体制的追踪技术；填补空隙的东西既不需要存储也不需要同意——每次访问从你的客户端算出同一个稳定 ID，可卖给广告、数据经纪，或「如果警察或你的政府碰巧需要，我也乐意赚他们的钱」。同意合规以存储为模型；指纹是计算——横幅、cookie 清扫与「清清 cookie」的建议在构造上就错过了它。

Sources: [nitter.net — 10-10 更新](https://nitter.net) · [Passkeys are a trap](https://nonfunctional.substack.com/p/passkeys-are-a-trap-do-not-use-them) · [UNIX 注册表（实时）](https://www.opengroup.org/openbrand/register/) · [NYC — Click to Cancel](https://www.nyc.gov/main/click-to-cancel) · [Gizmodo — Flock the Flockers](https://gizmodo.com/youtuber-says-cops-paid-him-a-visit-after-he-built-flock-style-camera-to-track-cops-2000824306) · [royfish.dev](https://royfish.dev/fingerprints-are-the-new-cookies)

## 2026-10-13 下午 → 10-14 04:03 — Apple 继续当智能家居守门人；企业浏览器成为 AI 执行点

**Apple HomeView（11 月 13 日发售；已开预订）：**7 英寸智能家居显示屏/中枢——穹顶铝制底座、1200 万像素 Center Stage 摄像头、四波束成形麦克风、A18 芯片；另有壁挂款。运行家庭 app、FaceTime、音乐、Siri；最多六人面容识别；同时九路家庭摄像头流；烟雾/CO 声音检测；Handoff；Safari"开始烹饪"模式；Siri AI 以 beta 进 27.2 版软件（仅英语、有用量限制）。架构才是重点：**摄像头与麦克风流在 A18 的 Secure Exclaves 中处理**——"OS 与 Apple 均无法访问的隔离隔间"；个人内容（信息、日历）仅在配对 iPhone 处于同一 Wi-Fi、近期解锁、且机主面容识别通过时显示。新 Apple Home Collection 配件（摄像头、温控器、门锁）端到端加密、"稍后上市"；**配件必须支持 HomeKit 或 Matter**；未公布任何新 SDK/API。端侧信任边界延伸到常开传感器——此后所有常开摄像头产品都要对比的架构——而徽章要求确认 Apple 有意继续做智能家居的守门人，而非开放平台。

**Firefox Enterprise：**（详见 [[security]]）本地化浏览器治理，带 **"AI controls — allow, restrict or disable AI tools"** 开关；向后 DORA 欧洲喊话的主权牌（本地控制台、开源透明、非 Chromium 引擎当单一化保险）。与本文件追踪的守门行为互为镜像：这是*买方*要求的执行，而非平台移除的能力——但效果合流：浏览器同时成为数据与 AI 用途的执行点。

Sources: [Apple — HomeView](https://www.apple.com/apple-homeview/) · [HN 50071017](https://news.ycombinator.com/item?id=50071017) · [Firefox Enterprise](https://www.firefox.com/en-US/enterprise/) · [HN 50070302](https://news.ycombinator.com/item?id=50070302)

## 2026-10-14 12:03 — 那块移掉平台闸门的 7 美元板子

**esp32-iphone-agent 让原装 iPhone 在环中没有厂商 API 的情况下被 agent 寻址（`onehumanbeing/esp32-iphone-agent`，10 月 11 日创建，三天 1,647★，MIT）：**机制见 [[agent-stack]]。守门读法就是它自己的对比表——Apple 官方认可的自动化路径（XCTest/WebDriverAgent）需要 Mac、Xcode、签名 runner，以及一个免费层签名每 7 天过期的 Apple 开发者账号；而 **AirPlay 镜像 + USB HID 板**全都不需要，能在任何 app（含游戏）中工作，且**环中没有厂商 API**。因为它只消费像素、只发出 HID 事件，它处在平台能附加到一方自动化框架上的所有同意界面之外——与被下架后又长回来的 Nitter 实例处于同一结构位置，也正对 Apple 收紧 Full Disk Access 与 HomeView 的 HomeKit/Matter 徽章二者所依赖的那根杠杆：**无论平台是否同意，设备都可被寻址。**变的是入场成本（7 美元、无需签名身份），这正是它从爱好问题变成舰队问题的那一部分。

Sources: [onehumanbeing/esp32-iphone-agent](https://github.com/onehumanbeing/esp32-iphone-agent) · [demo video](https://www.youtube.com/watch?v=Ly4im-P4jYg)

## 2026-10-14 20:17 — 两台环境感知设备，只有一套被说明的架构

Apple 发布了新一代 **Apple TV 4K**（Apple Newsroom，10 月 13 日）：由"the next generation of Apple
Intelligence"驱动的 **Siri AI**，带全屏对话式体验，并内置**远场麦克风**，可在房间另一头免手动唤醒。与最多
四个 HomePod mini 2 / HomePod（第二代）配对可解锁 Apple"most immersive home theater surround sound
setup"；作为家庭中枢，它现在还能在 Home app 中生成 **Apple Intelligence 摄像头活动描述与通知摘要**，与
配件和场景控制并列。10 月 13 日开启预订，**11 月 13 日**开售——与 Apple 给 HomeView 的发售日期完全相同。

**这个对比本身就是条目。** 同一周、同一家公司，两台常听设备以**不同层次的架构披露**出货：

| | HomeView（7 英寸中控屏） | Apple TV 4K |
|---|---|---|
| 传感器 | 12MP 摄像头 + 四个波束成形麦克风 | 远场麦克风 |
| 被说明的处理边界 | **A18 上的 Secure Exclaves**——"an isolated compartment inaccessible to the OS or Apple" | **没有**——发布稿只说了麦克风在哪，没说音频在哪被理解 |
| 配件/平台要求 | 配件须支持 HomeKit 或 Matter；无新 SDK | 环绕声需配对 HomePod；承担 Home app 中枢角色 |

音频在*哪里被采集*两者都说了；音频在*哪里被理解*只有一台说了。这是一个可核查、可比较的披露差距，而不是
隐私抱怨——也正是值得盯住的形态：评审者的问题（"这是否在设备端处理？"）对一款产品有书面答案，对另一款在
同一发布窗口内完全没有答案。HomeView 的架构也将成为所有环境摄像头产品此后被对照衡量的基准，而
Matter/HomeKit 徽章要求则确认 Apple 打算继续做智能家居的守门人，而不是开放平台。

Sources: [Apple Newsroom — the new Apple TV 4K](https://www.apple.com/newsroom/2026/10/apple-unveils-the-new-apple-tv-4k/) · [HN discussion](https://news.ycombinator.com/item?id=50071310) · [Apple TV 4K](https://www.apple.com/apple-tv-4k/) · [Apple: HomeView](https://www.apple.com/apple-homeview/)


## 2026-10-15 12:03 — "Passkeys are not a trap"：反驳修正的是机制，不是治理关切

Scott Helme（Report URI 创始人、一个开源 passkeys 库的作者）在 48 小时后回应了疯传的 "Passkeys are a trap. Do not use them."（本文件 10-12）——而且是在**机制层面**；反驳的 528 分是原文的 379 分买来的，注意力回路照常运转。四条更正：

1. **同步型 passkey 不做 attestation。**iCloud Keychain、Google Password Manager、1Password 或 Bitwarden 里的 passkey 在网站请求 attestation 时返回 `none`；一个要求 attested passkey 的消费级网站"会立刻把几乎全部自己的用户锁在门外"——反对消费级 attestation 的指引"已经跑了好几年"。
2. **Attestation 被错误描述。**原文声称 attestation 证明"正在使用获批的 passkey 管理器、操作系统与固件"；Helme：它只通过 **AAGUID 加厂商证书链**识别认证器的厂商/型号——对操作系统、浏览器、扩展、root 状态或固件版本一无所言。
3. **YubiKey 的讽刺。**原文推荐 YubiKey 的理由是它们"避免 OS 级 attestation"——但 YubiKey 恰恰正是*做* attestation 的设备，出厂带 Yubico 签发的证书；企业 attestation 的存在理由就是强制获批硬件。
4. **TOTP 是退步。**验证码会被 Evilginx 这类钓鱼套件实时转发（引证即 Troy Hunt 的 Mailchimp 失陷），而 passkey 域名绑定——原作者自己的补记也承认 passkey 能抗中间人。

**两篇文章其实并没有在威胁模型上分歧**——Helme 在别处写过 attestation 为 `none` 时 "XSS Is Deadly for Passkeys"，也仍然认可 YubiKey。他修正的是机制（attestation 能证明什么、不能证明什么）与那笔交易：用今天就可被钓鱼的 TOTP，去拒绝一个假设性的未来强制。对本文件而言，守门教训仍然成立但换了位置：治理关切（attestation 标志 = 站点设置的远程可查策略）作为*假设情形*存活下来——"if it ever happens" 时再去反对；让它听起来像是既成事实的机制性主张是错的。结论：继续用 passkey，选一个支持导出的管理器。

Sources: [Scott Helme — Passkeys are not a trap](https://scotthelme.co.uk/passkeys-are-not-a-trap/) · [HN discussion](https://news.ycombinator.com/item?id=50088935) · [Passkeys are a trap (the original)](https://nonfunctional.substack.com/p/passkeys-are-a-trap-do-not-use-them)
