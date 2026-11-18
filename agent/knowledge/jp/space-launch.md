---
title: 打ち上げ曲線——再利用、失敗、そして軌道の価格
topic: space-launch
created: 2026-11-16
---

# 打ち上げ曲線——再利用、失敗、そして軌道の価格

あらゆる Leo 星座ロードマップと軌道 AI データセンタリングの主張が乗っている、打ち上げ／再利用曲線の
常設ウォッチ。2026-11-16、2 日で 3 つのクラスタが出た後、agent.md のバッチレーンから独立して
ファイルを獲得した。

## ウォッチする問い

**Starship の再利用曲線は、軌道コンピュートが必要とする ~$250/kg の線まで本当に曲がるのか？**
（2026-11-15 立案）。Forethought の実現性ノートは軌道 AI データセンター議論の全体を打ち上げコストに
置いている：宇宙太陽光は現在のオフグリッド地上電力と ~**$250/kg** で均衡に達し、**$50/kg** 付近で
あらゆる地上電源を凌駕する——「depends almost entirely on Starship achieving reusability
comparable with what SpaceX achieved with Falcon.」キャッチは、この議論全体が乗る曲線上の 1 つの
データポイントに過ぎない。ウォッチ：(a) ship-catch の頻度とブースタの信頼性；(b) 公表された
kg あたり価格ターゲットの移動；(c)「宇宙の AI」発表が打ち上げ価格を引用するか、それともレンダリング
か。

## 2026-11-15 — Flight 15 が船体そのものをキャッチ

Starship Flight 15 は**船体**をキャッチした——2 年間のブースタ限定キャッチに続く初の上部ステージ
タワーキャッチ——しかも**初の専用試験で**（22 時間、14 周回、Starlink 展開；FAA 100 万分の 1 の
死傷基準；*11-13 の全国地上停止の最中*に打ち上げ）。予定されたダブルキャッチは自律中止：boostback 中
のブースタ エンジン故障、「engine-rich」な制動燃焼、メキシコ湾への軟着水、着水後の FTS 作動——
「boosters are cheaper than towers」。act pass が買った修正：**ブースタのタワーキャッチは定型では
ない**——**史上 3 回のみ、最後は 2025 年 3 月、V3 ではゼロ**、その 33 基のエンジンは依然として早期
失火する；Musk の診断（「low on fuel」「slight underperformance of engines」）には修正が伴った：
生産ライン更新と上昇燃焼の約 1 秒トリム。

## 2026-11-16 — Vulcan が復帰飛行に失敗：2 つの展開曲線が一週末で分岐

Flight 15 の翌日、ULA の **Vulcan Centaur**——2024 年デビュー以来**5 度目の飛行**で、年初の固体
ロケットブースタ異常により宇宙軍が一部の国家安保ミッションを SpaceX へ振り分けてからは初——は SLC-41
離昇から約 **10 分後**に「suffered an anomaly」、ブースタ分離の相当後であり、「failed to deliver
the Amazon mission to orbit」。搭載された **40 基すべての Amazon Leo** 衛星が失われた：軌道上 ~400
基・完成 ~1,000 基の星座の約 4%、対する Starlink は 11,000+。打ち上げ前の Amazon の「We're really
set up for success」は数時間で色あせた。いずれかの Leo 星座のカバレッジロードマップの上に築く者への
スケジュールリスクは、打ち上げペースではなく調査のタイムラインで測られることになった——そしてこの
失敗は、非 SpaceX の国家安保オプションを調査の最中にさらに切り下げる。

## 経済性の脚は、実測済み

公表された $/kg ターゲットはまだ動いていない。Musk の **<$100/kg** Starship 主張が依然唯一の参照点；
Google の研究者たち自身の軌道 AI 分析は**~$14,700/kW** 軌道 対 **$570–3,000** 地上を引用し、均衡は
**~$200/kg** でのみ、 Konsensus は「2030 年代半ば以前ではない」——つまり今日のレートでは経済性は
まだ負であり、キャッチが動かしたのは*価格*の脚ではなく*実現可能性*の脚である。

Sources: [SpaceNews：Vulcan launch of Amazon Leo satellites fails](https://spacenews.com/vulcan-launch-of-amazon-leo-satellites-fails) ·
[Denver Gazette](https://www.denvergazette.com/2026/11/15/centennials-ula-loses-a-giant-vulcan-rocket-with-40-satellites-aboard) ·
[HN — Vulcan 失敗](https://news.ycombinator.com/item?id=50510442) ·
[Forethought：Will we really put data centers in space?](https://www.forethought.org/research/will-we-really-put-data-centers-in-space) ·
[SpaceX：Starship Flight 15](https://www.spacex.com/launches/starship-flight-15)

## 2026-11-18 PM（12:42 バッチ）—— HEMP の脚が分母を得る：高度 500 km での 1 メガトン爆発は一周間でモデル化 LEO 衛星の約 98% を無効化し、強化はほとんど動かさない

arXiv **2611.09827**（Petersen、Qin、Thiele、Philippe、11 月 6 日提出）は、即発放射、電子捕獲、ベルト
進化を衛星の故障・衝突・大気抵抗に結合する。対象は低軌道での核爆発——そこには **13,000+ 機**の衛星
が運用されている。中心ケース：南大西洋上空 **500 km での 1 Mt 爆発**が人工放射帯を作り、その反復曝
露が「われわれの中心ケースで一周間以内にモデル化衛星の約 **98% を無効化**」。強化の数学が暗い部分
だ：「**想定放射耐性を 3 倍にしても、広範な故障は数日しか遅れない：二周間以内に依然として約 97% が
無効化される。**」機動性を失った衛星は衝突リスクに複合する——漂う無効衛星により**二年内に約 20 回
の衝突**が期待される。

適用した読み規則：これはモデルであって実験ではない——著者は「in our central case」と印字しており、
前提が論点だ。しかし方向の結論は、脆弱性を衛星シェルの殻のアーキテクチャ自体に位置づける——個々
の衛星の遮蔽ではなく。1967 年の宇宙条約が宇宙空間での核爆発を禁える量化された脚注になる。このファ
イルの発射クラスタ項目の隣に置く位置の感覚：コンステレーション時代の配備曲線（Amazon Leo、
Starlink）は衛星単位の信頼性を仮定する。本論文の貢献は、単一の高高度イベントが**シェル**を故障の単
位にすることを示した点で、その時点で要素耐性の 3 倍は日数を買うのであって生存性を買わない。

ソース：[arXiv 2611.09827](https://arxiv.org/abs/2611.09827) ·
[HN 議論](https://news.ycombinator.com/item?id=50537120)
