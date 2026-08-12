---
title: エッジ / ローカル推論エンジン
topic: edge-inference
created: 2026-08-13
---

# エッジ / ローカル推論エンジン（2026年8月）

極小のハードウェアで巨大モデルを動かすプロジェクト群。共通の手法：MoEのスパース性を活用——
小さな共有コアをRAMに常駐させ、ルーティングされたエキスパート重みを必要に応じてディスクから
ストリーミングする——モデル全体を量子化する代わりに。

## パターン
MoEモデルはトークンごとのアクティブパラメータ数が小さく、大部分のエキスパートは遊休状態。
それらのエキスパートをSSD/NVMeからストリーミング（LRU/LFUキャッシュ付き）することで、数兆
パラメータモデルを消費者向けハードウェアのワークロードに変える。「ゼロ量子化、ゼロ蒸留」が
共通のうたい文句。

## プロジェクト
- **kimi-k3-in-c** — `FareedKhan-dev/kimi-k3-in-c`、Apache 2.0。176KBのC99バイナリが8.24GB RAMで
  Moonshot Kimi K3（2.78Tパラメータ）を実行。MXFP4パックされたエキスパートをNVMeからストリーミング、
  16/896エキスパートがアクティブ、O_DIRECTトランクストリーミング、エキスパートLRUキャッシュ。
  PyTorch参照実装とバイト単位で同一。
- **TurboFieldfare** — `drumih/turbo-fieldfare`、Apache 2.0。Swift+Metalエンジンが~2GB RAM
  （Apple Silicon）でGemma 4 26B-A4Bを実行。~1.35GBの共有コア常駐、レイヤーごとの16スロット
  LFUエキスパートキャッシュ。
- **Ling-3.0-tiny** — `inclusionAI/Ling-3.0-tiny`（Ant Group Bailing）、MIT。7.9B MoE（1.3Bアクティブ）、
  KDA:MLA 3:1ハイブリッドアテンション、128エキスパート。M4 Pro MacBookで~90 tok/s、<100msファーストトークン。
- **Muse Glimmer** — `meta-models/Muse-Glimmer-30B`（Meta）、Apache 2.0。Muse Spark 1.2から蒸留した
  30B、~17GB 4-bit量子化、RTX 5090でDFlash投機的デコーディングにより233 tok/s。
- **Needle 2** — `cactus-compute/needle`（Cactus Compute）、Apache 2.0。45Mパラメータ → 14MB C++
  バイナリ。MLP層なし（Walsh-Hadamard変換）、ハッシュ化n-gramテーブル。Raspberry Pi 5で500–800 tok/s。
  Pebble Index 01スマートリングに搭載。
- **h3.c** — `antirez/h3-metal`、MIT。Apple SiliconでMiniMax H3オムニモーダルを動かすC/ObjC + Metal
  エンジン。safetensorsからのmmapロード、`--ssd-streaming`がDiTメモリを36.5→2.0 GiBに削減。
