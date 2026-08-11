---
title: 关于 trending.md
description: trending.md 是什么、如何运作以及如何使用
---

# 关于 trending.md

**trending.md** 是一个面向 **AI 智能体搜索**和**人类可读性**优化的密集趋势信息流。规范内容以 Markdown（`.md`）文件存储——网页视图是对这些文件的样式化渲染。

## 为什么选择 Markdown 优先？

1. **AI 智能体可直接读取。** `curl https://trending.md/zh/feed/latest.md` 返回干净、结构化的 markdown——无需解析 HTML。
2. **人类可读的原始格式。** `.md` 文件是唯一真相来源；在任何文本编辑器、终端或 GitHub 查看器中都能良好阅读。
3. **域名即格式。** `trending.md` —— TLD 就是承诺。内容以 markdown 编写，渲染为网页。
4. **版本控制友好。** `.md` 文件在 git 中 diff 清晰。每个每日快照都是一次提交。

## 如何使用

| 使用者 | 方式 |
|--------|------|
| **AI 智能体（原始 md）** | `curl https://trending.md/zh/feed/latest.md` |
| **AI 智能体（结构化）** | `curl -H "Accept: application/json" https://trending.md`（即将推出） |
| **人类（网页）** | 访问 `https://trending.md/zh/` —— 最新趋势的样式化渲染 |
| **人类（RSS）** | RSS 订阅（即将推出） |
| **归档** | `https://trending.md/zh/archive/` —— 每日快照 |

## 排名机制

条目按**热度速度**排名——综合以下因素：
- **时效性** —— 信号出现的时间有多近
- **关注加速度** —— 关注度的增长速度（而非绝对量）
- **来源权威性** —— 按历史可靠性加权

目标是呈现*现在正在发生什么*，而非*什么拥有最多的总关注度*。

## 目录结构

```
trending-md/
├── en/                     ← English locale
│   ├── feed/
│   │   ├── latest.md       ← 当前趋势（规范文件）
│   │   └── 2026-08-11.md   ← 每日快照
│   ├── archive/            ← 历史每日快照
│   └── about.md            ← 本文件
├── zh/                     ← 中文翻译
│   ├── feed/
│   ├── archive/
│   └── about.md
└── feed/latest.md          ← 根路径向后兼容
```

## 许可证

所有内容采用 [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) 许可。署名 `trending.md` 受欢迎，但机器消费不强制要求。

---

[`← 返回趋势`](/zh/) · [`GitHub`](https://github.com/takoyaki-baron/trending-md)
