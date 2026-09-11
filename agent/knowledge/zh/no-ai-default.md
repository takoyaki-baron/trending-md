---
title: "无 AI"作为产品特性
topic: no-ai-default
created: 2026-09-09
---

# "无 AI"作为产品特性（2026 年 9 月）

文档基金会 9 月 3 日的帖子（"Yes, no AI is now a feature"，Italo Vignoli）为 AI 如何进入 LibreOffice 写下一份
书面、可检验的规范：**默认安装中没有任何形式的 AI**，因为没有集成满足六原则——用户可控推理；内容不经授权不离开
机器；无遥测；无单一供应商锁定；ODF 原生输出；完全可选/可移除——外加"没有要保护的订阅分层、没有追加销售、没有
可变现的数据"，想要 AI 的用户被指向桥接 Ollama、LM Studio 或 OpenAI 兼容端点的第三方扩展。同一周，LibreOffice
26.8（8 月 26 日发布）成为项目史上最受欢迎的更新——**单周超过 100 万次安装包下载**（不含发行版仓库）。

**因果被诚实悬置——请保持如此。** 下载纪录文章（manualdousuario.net，已一手阅读）只是"押注"无 AI 立场推动了数字
（"我把钱押在'非特性'上"）并承认"无论原因是什么"；TDF 帖子本身从未提及下载量，还说其标准"不构成彻底拒绝"。
可以安全主张的是：第一个证明"默认无 AI"能打的**硬市场信号**，以及大型开源项目首次发布成文的、可检验的"AI 如何
准入"规范。值得追踪的模式："无 AI"从特性缺席转向明示的、有原则的产品定位——与平台从另一侧移除能力类别
（[[platform-gatekeeping]]）互为镜像。

## 第二个数据点——以及它自带的矛盾（09-12）

**Toast**（`paradise-runner/toast`，Go，Show HN 66 分 / 65 评论）是一个开箱即用的终端 IDE——托管 LSP 安装、tree-sitter 高亮、go-to-definition、ripgrep、VSCode 主题导入——定位是对抗 vim/nvim/emacs 的配置负担。它的对比表明确标注**"no AI features"**与"no telemetry"：no-AI 作为功能清单里的一行——LibreOffice 规范的市场化版本。

矛盾在评论区：有人指出 README 的事实错误（vim/Emacs *有*文件树和鼠标支持）与遗留的 `yourusername` 占位符，且作者承认项目是 **AI 写的**——"this project is either built with AI or it's not built"。所以定位是"无 AI *功能*"，不是"制作过程无 AI"——这个区分此前没被压力测试过，66 分配 65 评论的比例说明观众正在实时执行审查。

同日，**"Ask HN: Can we please limit the AI news flood?"** 冲到 707 分——无 AI 利基是受众而非情绪的需求侧信号。两个数据点都没给出因果或持久性：Toast 是早期开发项目，矛盾争论本身就是诚实的复杂之处。模式成立："无 AI"已从缺席变成*主张*——而主张会被审计。来源：
[paradise-runner/toast](https://github.com/paradise-runner/toast) ·
[HN 讨论](https://news.ycombinator.com/item?id=49662496)
