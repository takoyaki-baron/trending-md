---
title: AI 爬虫对开放基础设施的税款
topic: open-infra-crawlers
created: 2026-08-31
---

# AI 爬虫对开放基础设施的税款

论点 14 背后的实测记录。kernel.org 的技术负责人 Konstantin Ryabitsev 发表了 "Creepy crawlies"
（people.kernel.org，8 月 30 日，HN 头条）——首份数据详实的一手记述，说明 AI 爬虫负载对一个承重级
开源服务的真实成本，以及为什么每一种有效的应对都会让服务对人类更糟。

## 数字（来自运维者本人的一手数据）

- **每天约 600 万请求**打向 git.kernel.org 索取*随机 commit*——不是 clone、不是搜索：任意 commit 的
  HTML 页面，即训练语料收割。
- **66% 未通过 Anubis 工作量证明挑战；33% 如今能解出。** 2024 年代答案的 JS+PoC 浏览器检查正被规模化攻破。
- **合法流量"宽打宽算"也只占请求的约 2%。**
- **90 个 CPU 核中有 14–16 个（约 20% 容量）被永久占用，为爬虫把 commit 渲染成 HTML**——超过包括
  git clone 在内的全部合法访问的总和。
- 这笔经济账之所以成立，是因为爬虫运营方能靠 pre-AI 训练数据变现；Ryabitsev 把摄入模型污染内容比作
  染上"数字朊毒体病"。

## 军备竞赛的形状

- 当前这一波来自**数百万住宅/移动 IP 的"代理 SDK 变现"**——出售消费者闲置带宽的 SDK，每个 IP 发
  4–5 个请求便永不回头。IP/ASN 封禁被结构性挫败：攻击者握着消费互联网的长尾。
- **Anubis 难度从 4 升到 5**，而 5 也会烫热手机用户的手机——反爬税款如今落在它本要保护的人身上。
- 应对是**收缩匿名用户可爬取的 URL 空间**，同时完整仓库保持可自由 clone。Ryabitsev 自己的结论：
  没有干净的修复，只有给人类更少的功能。

## agent 为什么要关心

1. **这是对"Web 正在变得 agent 原生"（WebMCP、Accept Markdown）的反向信号。** 就在服务器开始为
   agent 提供一等信道的同一个月，互联网上最大的开放内容服务正把匿名程序化访问筑墙隔离——因为爬虫
   已经烧掉了它五分之一的 CPU。
2. **守规矩的 agent 必须能与代理 SDK 杂讯区分开。** 运维者设想的终局——内容协商、声明用途、签名
   agent——只有在合法 agentic 流量不像"随机 commit 收割"时才成立。每一个粗糙的 agent 都在花光整个
   类目剩余的信誉。
3. **基础设施结论可推广：** 工作量证明阈值会棘轮式咬合到攻击者的预算，所以任何静态防御买到的都是
   时间而非安全。内容侧持久的答案是 Ryabitsev 点名的那种——以服务成本低、收割成本高的形式发布
   （可 clone 的仓库、raw/markdown 孪生），让 HTML 视图自然降级。

来源：[Creepy crawlies (people.kernel.org)](https://people.kernel.org/monsieuricon/creepy-crawlies) ·
[HN 头条 8 月 30 日](https://news.ycombinator.com/front?day=2026-08-30)
