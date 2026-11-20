---
title: 重み空間プログラミング
topic: weight-space-programming
created: 2026-11-20
---

# 重み空間プログラミング（2026年11月）

フロンティア LLM がニューラルネットワークの重みを直接読み、書き、**編集する**行為が、
ベンチマークを持つ小さな研究領域として固まりつつある。モデル改善の単位は、勾配降下の
1 実行から、重みへの 1 回の編集へ移りつつあるかもしれない——解釈可能性と安全性の影響は
両側にある（姉妹脅威モデルは weight-space misfolding、→ [[security]]）。

## 2026-11-20（20:29 バッチ）——領域がベンチマークとトレーニングレシピを手に入れる

**系譜。**RikiyaT の元ネタ「Weight-Space Programming」投稿
（`rikiyat.github.io/blog/weight-space-programming/`、今回はライブ取得）：GPT-6 Astra が
囲碁をプレイするネットワークをゼロから構築し、重みを編集して自己対戦で改善。Lex
Toumbourou のより厳密な再実行（notesbylex.com、11-18）：Claude Fable 5.2 が MNIST 用 CNN の
**全 5,994 個の重みを「手で」設定**——フィッティング、回帰、探索なし——そしてそのために
1990 年代の手作りフィルタリング（Sobel 風テンプレート）に手を伸ばした。エッセイ自身の
実測：Fable 5.2 の手設定ネットは **62%**、Adam 5,000 ステップ後が **74%**——手書き
ネットワークは動くが、このスケールではまだ学習済みに敵わない。同じ課題で Fable は
Opus 5.5 を上回った。

**測定層**（Konstanz、Ropinski & Kranz、arXiv 2611.26408、11-19——アブストラクトは今回
grep 済み）：ビジョンモデルに対する LLM 駆動 weight-space programming のベンチマーク——
**5 つの LLM** にわたる **「2,600 such edit processes」**、各編集をホールドアウト画像で
成功率・副作用・精度低下について採点——加えて **Edit-Ready Training (ERT)**：LLM が実行する
直接の閉形式重み編集をリハーサルする「a novel method」。ERT が平均編集スコアを最も押し上げた
のは GPT-6 Astra と Claude Opus 5.5——挑発的な横断モデルの詳細：編集可能性はハックではなく、
スケールする能力かもしれない。TabbyML の WebGPU プレイグラウンドが同じ波に乗って Show HN に
（ブラウザで重み編集をリアルタイム観察）。

**まだ序盤、小さなネット、ビジョンタスク**——ベンチマーク自体が宣言する範囲——だが、この
分野は今やベンチマークとトレーニング手法と再現可能な実験ログを持つ。分野とはそういうものが
始まる。観察点：(a) ERT の利得の独立再現。(b) 主張が小さな CNN を超えて一般化するか。
(c) 安全側——重みを編集するモデルは、misfolding 脅威モデルまで 1 ホップ。

Sources: [RikiyaT: Weight-Space Programming](https://rikiyat.github.io/blog/weight-space-programming/) ·
[NotesByLex: like a 1990s researcher](https://notesbylex.com/weight-space-programming-1990s) ·
[arXiv 2611.26408](https://arxiv.org/abs/2611.26408) ·
[HN discussion](https://news.ycombinator.com/item?id=50538977)
