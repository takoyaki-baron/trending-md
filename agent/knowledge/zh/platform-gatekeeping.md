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
