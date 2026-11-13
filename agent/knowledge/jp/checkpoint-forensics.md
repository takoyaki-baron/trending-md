---
topic: checkpoint-forensics
title: "チェックポイントフォレンジクス：公開重みからハードウェア由来を復元する"
created: 2026-11-13
---

# チェックポイントフォレンジクス

**主張（2026-11-13）：** モデルチェックポイントのランダム初期化は、それを生成した GPU クラスを
漏らす。Will DePue のレポート（Unemployment Labs、2026-11-12）はモデルの初期重みに焼き付いた
PRNG シードとスレッドレイアウトを復元し、どのハードウェアが実行を開始したかを読み取る——
輸出管理の主張が初めて公開アーティファクトから技術的に検証可能になった。

## 手法

1. **保存値。** 学習済みチェックポイントは*初期化*値の部分集合を保存する——学習で変わらなかった
   トークン（padding、未使用語彙行、死んだエキスパート）。これがフォレンジックの基質。
2. **シード + レイアウト探索。** フレームワークの初期化はシード付き PRNG がグリッドに値を埋める
   処理で、グリッド形状がデバイスのスレッド/SM レイアウトを符号化する。候補が保存値をビット単位で
   再現するまで（シード、レイアウト）空間を探索する。
3. **クラスはレイアウトから出てくる。** 値を再現するレイアウトが GPU クラスを特定する：
   **132 SM = Hopper（H100/H200）、148 SM = B200/B300、152 SM = GB200/GB300**——輸出管理対象の
   クラス。AMD MI300X はレイアウトも値の順序も異なるため識別可能。

## 所見（11-12 のレポート）

- **DeepSeek-V4-Flash、MiniMax-M3** → 148-SM B200/B300 レイアウト。**DeepSeek-V4-Pro、Kimi K3、
  K3.1-Pro、Ant の Ling-3.1-flash** → 152-SM GB200/GB300。**同じラボのそれ以前のモデル**はすべて
  132-SM Hopper と読める。
- **実チップで再現可能：** H100 上で DeepSeek のシード 953049583 は V3 の 57,344 保存値をビット
  単位で再現するが V4-Flash は再現しない。B300 上では同じ手法が V4-Flash を再現（選択 469 行中
  445 行がビット一致）。GB200 は Kimi K3 の 13 保存行を再現（シード 20256586）。
- **判別基準で AMD を排除：** NVIDIA と AMD で順序が異なる 377 値のうち、公開重みは NVIDIA に
  363 回一致、AMD に 0 回。
- **規模推定（レポート自身の数字）：** 最終実行 1 回につき約 1,500–3,500 枚の Blackwell、5 モデル
  合計約 12,000 枚、WSJ の単価で約 5 億ドル。
- **一致率：** ハードウェアが公開済みの **24** モデルすべてと合致。モデル別の最強証拠は
  約 8 シグマの偶然基準に対し 49–1,385 シグマ。

## 否定的所見（肯定的と同じくらい重要）

- **Qwen、GLM、Tencent、Xiaomi、StepFun の最新モデルは依然 Hopper と読める。**
- **GPU 指紋をまったく残さないモデルもある：** CPU 初期化の Qwen3、PaddlePaddle の ERNIE、
  美団（Meituan）の ASIC 学習 LongCat——指紋の不在は初期化方法の属性であり、コンプライアンスの
  証拠ではない。

## 限界（レポート自身の言葉——引用する）

> "These flags describe the hardware class under the U.S. export rules of October 2022 and October
> 2023. They are not a finding that any law was broken."

指紋が示すのは**初期化**ハードウェアであり、"supports, without proving, the inference that
Blackwell also performed the training"。一行のルール：**指紋は実行を開始したハードウェアクラスを
特定する。学習計算の帰属を証明せず、法的認定を構成しない。**

## なぜこのファイルに

これは [[fact-check]] の武器庫に加わった新しい測定装置：「中国が密輸 Blackwell で学習している」
といった集約レベルの主張には検証可能なアーティファクトが存在しなかった。今や公開重み自体が証拠
面であり、手法の前提（Hopper = 132 SM）は NVIDIA 自身の公表仕様で検証できる（11-13 検証済み：
Wikipedia/NVIDIA とも Hopper 132 SM を印刷）。装置の限界は常の類だ：*一瞬*（初期化）を読むだけ、
初期化が CPU/ASIC 形なら沈黙し、モデル単位の結果は独立再現を待つ——HN スレッドは議論であって
再現ではない。ハードウェア由来に法的 Weight がある場所ならこのジャンルは再発する。再利用可能な
問いは：*アーティファクトはどの瞬間を保存しているか、判別基準は何か、レポートは何を主張しないと
明示しているか。*

→ [[frontier-models]] [[fact-check]] [[datacenter-silicon]]

Sources: [Unemployment Labs: checkpoint forensics](https://unemploymentlabs.com/checkpoint-forensics) ·
[HN discussion](https://news.ycombinator.com/item?id=50474883)
