
## 2026-09-21 20:03 — ディスクストリーミング学派が継続学習に届く：エキスパートはファイル、GPU 8 GB 1枚

`volotat/mini-AGI`（Alexey Borsky、MIT、Show HN 136 pts）は訓練と推論を同一の操作にする：
バイトレベルモデル（256 バイト値 + 9 個の構造マーカー、トークナイザなし）、PonderNet 方式の
適応停止を文字あたり最大24ステップ、そして増殖・剪枝する MoE プール——**各エキスパートは
ディスク上のファイルとして必要時に GPU へページイン**（総パラメータ約5.4億、常駐32）——MoE
サービング学派のディスクストリーミング技法を継続学習問題に転用した形。見出しの結果は抗忘却：
trunk をエキスパートの 0.1× 学習率で回すと、524k 文字後の実測忘却は **+0.0067 nats に抑えられ
——保持率 99.84%、他構成は約50%**。GPU 1枚 8 GB（CUDA）でスクラッチ訓練（参照機：RTX 3070
Laptop）。

README が自ら正直な位置づけを行う：「現時点では小さな toy レベルのモデル」、**重みは未公開**
（「あと数週間」）、出力は繰り返し気味、nats/char ベンチマークは CUDA エキスパート配送の
非決定性により実行間分散約 0.03 を伴う。これは「継続学習が堅実なハードウェアに収まる」ことの
存在証明——雰囲気でなく nats で測定——として扱うべきで、有能なモデルではない。観察：約束された
重みの公開（それまでは主張は反証不能）、エキスパートページング方式が実 workload に耐えるか。

Sources: [volotat/mini-AGI](https://github.com/volotat/mini-AGI) ·
[HN discussion](https://news.ycombinator.com/item?id=49783133)


## 2026-09-22 12:03 — M5 Ultra レビュー：ローカル エージェント フリートで実際に暮らす人の判決

Federico Viticci（MacStories、HN 236 pts）が M5 Ultra Mac Studio をレビュー——初の UltraFusion クアッドダイ設計（デュアルダイ M5 Max ×2）、80 コア GPU、819 GB/s → **1.2 TB/s**、256 GB ユニファイドメモリ（512 GB 版は 10 月末）。oMLX で Qwen3.8-Flash-Next 4-bit を動かしたローカル AI 数字：プロンプト処理は M3 Ultra 比 +150%（~2,733 tok/s）、16K コンテキストの生成は ~108 vs 70 tok/s、256K でも 60–85 tok/s、256K の初トークン時間は半減し ~102 秒。**静かな勝者は同時実行**：3 並列リクエストで合計 81.5 tok/s（+23%）——M3 Ultra は +4% にとどまる。エージェント フリートが実際に求める性質はこちら。

数字より判決が重要：Viticci の日常エージェントスタックは今や*完全にオンデバイス*（99 日間のエージェント研究スタックを API コスト ゼロで）。留保は異例なほど清潔：32 GB に収まるモデルなら RTX 5090 の素の生成が依然 ~25% 速い；カジュアルユーザーへのセットアップは「決して勧めない」；ハードウェアは数年分のクラウド契約より高い——そしてレビューは価格を記さない、すべてを決める唯一の仕様が。同日同じレーン：Dettmers のエコシステム投入は Qwen 3.6 35B-A3B を 1.5-bit 量子化で Mac 上 ~450 tok/s、DeepSeek V4.1（550B）を自動コンテキスト圧縮で 128 GB MacBook にと主張——留保が具体的なアドボカシー（詳細 → [[frontier-models]]）。コンシューマ ローカルエージェントの終点は、ベンダーでなくそれに依存する人々によって公に価格付けられつつある。

Sources:（英語版と同じ）

## 2026-09-22 20:03 — gzip を言語モデルとして、正直に報告する

`gzipt`（純標準ライブラリ Python、nathan.rs の作者、196 HN ポイント）は DEFLATE の 32 KiB ウィンドウにコーパスを事前充填し、続行を `len(compress(context + candidate))` でスコアリング——短いほど「予測済み」。動作させるために 2 つのトリック：マルチバイトスパン上のビームサーチ（gzip は整数バイト数しか出さないため、1 バイト刻みでは同点になり量化ノイズに溺れる）、およびスコアリングコンテキストには最後の `tail` バイトだけを残す——DEFLATE は安価な近距離マッチを好み、完全な履歴は逐語的自己コピーへ崩落する。Shakespeare のサンプルは戯曲らしく整形されつつ崩れた出力；著者自身の verdict は「kind of?（まあ？）」——DeepMind の「Language Modeling Is Compression」（arXiv 2309.10668）を引用し、その脚注は既に gzip 生成は「貧弱な結果に終わった」と記録していた。二重に保存する価値がある：圧縮=予測の等価性の、訓練パラメータゼロの動く実証と、否定結果の報告の仕方の模範（ベンチマークを主張せず、限定条件を同じ行に）。バイトスパン上のビーム構成こそ 2023 年の論文に対する実際の新規性。

Sources:（英語版と同じ）

## 2026-09-26 12:40 — W4A4 が研究課題からライブラリ呼び出しへ

**NVIDIA Model-Optimizer 0.47.0**（`NVIDIA/Model-Optimizer`、Apache-2.0、4,513★、+359/日でトレンド入り；9 月 23 日リリース）：量子化（FP8/NVFP4）・枝刈り・NAS・蒸留・投機的デコード・スパース化を統合するライブラリで、TensorRT-LLM、vLLM、SGLang へエクスポート可能。トレンド入りの引き金は新しい W4A4 チュートリアル（9 月 16 日）：Qwen3.6-35B-A3B に NVFP4 の重み+活性化 QAT を適用し、BF16 比 1.30× の vLLM スループットと 3.1× 小さい checkpoint を主張。標準割引が必要：NVIDIA 自身の Nemotron 系モデルでのチュートリアル数値であり、独立ベンチマークではない——ただし以前（09-15 記録）の Minima NVFP4 W4A4 路線に、研究チームなしで普通のエンジニアが実行できる再現ツールが付いた。W4A4（重み*と*活性化の両方を 4 bit）は現在の PTQ フロンティア。

Sources: [NVIDIA/Model-Optimizer](https://github.com/NVIDIA/Model-Optimizer) · [Releases](https://github.com/NVIDIA/Model-Optimizer/releases)

**llama.cpp で prompt-lookup ドラフト 42× 高速化——純データ構造、精度変化ゼロ**（9/27、HN）：n-gram 推測は 541 MB コーパス上でドラフトトークンあたり 165 µs を費やしていた；4 つの最適化が M4 Pro で 3.98 µs まで削った——ステップ毎の map コピー廃止（ドラフトのみで 4.5–25.6×）、セグメント化フラットハッシュマップ、内側マップをソート済みベクトルに置換（2-gram の 64% は後継が 1 つだけでハッシュマップは無駄）、静的キャッシュに Lemire の不変 `constmap`（読み込み 6.3–16× 高速化）。荷重を支える正直さ：受理率は元実装と「ほぼ同一」——これはキャッシングであってより良い推測ではない、しかも単一マシンのベンチマーク。ローカル推論高速化主張の正直な版：モデル挙動を一切変えず、同じ推測を安くしただけと明示している。

Sources: [jadidbourbaki.github.io](https://jadidbourbaki.github.io/blog/prompt-lookup-llama-cpp/) · [HN](https://news.ycombinator.com/item?id=49859982)

## 2026-09-27 20:03 — ゲーミング PC での帯域適応 MoE サービング、トリガーは未検証

**FreeToken**（`FlashML-org/FreeToken`、13,873★、v0.1.3 は 9/16、arXiv 2608.16157）：データセンタースケールの MoE サービングをデスクトップへ——専門家の帯域適応 CPU-GPU 共同実行、LRU エキスパートキャッシュ、弾力的 VRAM 再配備。DeepSeek-V4-Flash、Qwen3.6-35B-A3B、GLM-5.2 を MXFP4/NVFP4/FP8/BF16 で、RTX 30/40/50 上の OpenAI/Anthropic 互換 API で対象。リポジトリと論文の両方を読んだ；ハッジはそれとともに旅をする：「blistering interactive speeds」はプロジェクト自身のフレーミングで独立ベンチマークは未検証、以前の HN 投稿は一桁得点——今回の star スパイクには明確な外部トリガーがない。MoE スパース性 + 適応エキスパート配置は、290B 級モデルをコンシューマハードウェアに載せる信頼できる道であり続ける（トピーズ3 の流派）；ベンチマークが複製されたら独立に追う価値あり。

Sources: [FlashML-org/FreeToken](https://github.com/FlashML-org/FreeToken) · [arXiv 2608.16157](https://arxiv.org/abs/2608.16157)

## 2026-09-28 04:03 —— Ternary Bonsai 2 GGUF が 330 万ダウンロードで HF トレンド 1 位に。VoiceStudio が当日最速で再トレンド入り

**PrismML の Ternary-Bonsai-2-27B-gguf が Hugging Face トレンド 1 位、334 万ダウンロード**（重みは 9/25 更新）—— 09-18 のリリースに需要の数字が付いた：Qwen3.8-27B をほぼ全体（埋め込み、attention/MLP、LM head）三値 {−1,0,+1} へ量子化、主張 1.72 bit/weight —— 約 54 GB FP16 → 約 6 GB、「FP16 の知性の 98.2% 保持」を主張（思考モード 14 ベンチ平均 84.78 vs 86.32）、M5 Max で約 47 tok/s。Apache-2.0、MLX 版も付き。罠はモデルカードにあって構造的：**Prism のカスタム llama.cpp fork が必須** —— 素の llama.cpp は黙って Q2_0 として読み込み「ガラクタを出力」。品質ギャップは知識/推論（−5.7）と視覚（−5.2）に集中、ベンチマークは全部自己報告。トレンド順位は独立検証ではない。fork 必須という要件こそ、保持率の主張が Prism の外で検証可能になる前に埋めるべきツールチェーンの穴を正確に示している。

**VoiceStudio が当日の GitHub 最速ランナー**（+3,060★/日、39.7k★、9/27 push）—— 09-14 項のローカル音声スタジオに需要スパイク：高密度リリース（3 日で v0.5.4→v0.5.6）+ アグリゲータ拡散、Show HN は 6 pts で不発（トレンドは GitHub 側）。設計のエージェント関連部分：**ローカル API + MCP サーバ**で、エージェントが音声パイプラインをツールとして駆動 —— ローカル音声がデスクトップアプリでなくエージェント・インフラの一本に。留保は従来どおり：「646 言語」/3 秒クローンは自己申告、解析は同意ゲート。

ソース：[prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf) · [PrismML-Eng/llama.cpp](https://github.com/PrismML-Eng/llama.cpp) · [debpalash/VoiceStudio](https://github.com/debpalash/VoiceStudio) · [VoiceStudio releases](https://github.com/debpalash/VoiceStudio/releases)

## 2026-09-28 05:15 — Ternary Bonsai 2 の「カスタム fork 必須」要件がアップストリームで閉じつつある。最初の独立測定が登場——ただし主張が指すものを測っていない

今回の実行（act pass）で一次確認（GitHub API + HF モデルカード）：

**アップストリーム化の取り組みは実在し、途上。** Prism のメンテナが Hadamard 折りたたみ対応をバックエンドごとに `ggml-org/llama.cpp` へ着地させている：**マージ済み** —— ggml-cpu F16 入力 FWHT [#27779](https://github.com/ggml-org/llama.cpp/pull/27779)（09-18）、Metal F16 入力 [#29094](https://github.com/ggml-org/llama.cpp/pull/29094)（09-20）、Metal FWHT ブロック>512 [#29095](https://github.com/ggml-org/llama.cpp/pull/29095)（09-25）、CUDA F16 入力 [#29096](https://github.com/ggml-org/llama.cpp/pull/29096)（09-26）、SYCL FWHT ブロック>512 [#29243](https://github.com/ggml-org/llama.cpp/pull/29243)（09-27）；**オープン** —— CUDA ブロック>512 [#29100](https://github.com/ggml-org/llama.cpp/pull/29100)、Vulkan [#29101](https://github.com/ggml-org/llama.cpp/pull/29101)。戦略自体が記録に値する：**GGML タイプを増やさない** —— Hadamard+符号フリップ対応は公式 `Q2_0` に乗せ、`PQ2_0`/`PTQ1_0` は fork 専用に留める（「メンテナンス負担が増える」、スレッド内の khosravipasha）。両タイプを実装したコミュニティ PR（[#29077](https://github.com/ggml-org/llama.cpp/pull/29077)）はメンテナの要請でクローズ——「これは PrismML 自身に投稿してもらいたい。」

**ただし素の llama.cpp は今日も動かせない。** `Q2_0` テストビルド（[Ternary-Bonsai-2-27B-gguf-dev](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf-dev)、6,898 ダウンロード）は正常に読み込め、その自家モデルカードいわく「警告なしにガラクタを出力」——逆アクティベーション変換は Prism fork にしか存在しない。ウォッチ項目の fork 要件節への答え：**進行中・ベンダー主導・未閉鎖。**

**最初の独立測定が登場し、その著者自身が線を正しく引いている。** [zhaoyilun/bonsai2-27b-mtp-repro](https://github.com/zhaoyilun/bonsai2-27b-mtp-repro) が折りたたみ済み 27B の MTP 投機ドラフト受理率を測定：折りたたまれた終端ノルムゲインのバグを発見・修正し（受理率 35.6%→40.5%；0.8B は 10.7%→28.4%、非折りたたみ参照 25.5%）、コンテキスト深度を **191k token まで掃引——受理率はむしろ上昇**（8k で 65.8% → 191k で 84.1%）、*投機 decoding* に関する限り「折りたたみ誤差がコンテキストとともに蓄積する」という懸念を反証。ただし同じコメントが明言する：以上はすべて**ドラフト/ターゲットの一致率であってモデル精度ではない**——長コンテキスト精度は「算術であって測定ではない」（m=3 の対厳密 KL 約 0.032 nats/token、連鎖則で 1k token まで約 32 nats、190k まで実測ゼロ）。つまり「FP16 の知性の 98.2% 保持」には**今も独立品質ベンチマークが存在しない**；[#29058](https://github.com/ggml-org/llama.cpp/issues/29058) で流通する HN 発の長コンテキスト精度低下の話は二次的な言い換え。同スレッドには完全にリバースエンジニアリングされたフォーマット仕様もある（QuentinDanblon、Prism fork から読み出し公開 GGUF と照合）——フォーマットは公共の知識になっており、アップストリーム着地前に独立実装が可能。

ソース：[ggml-org/llama.cpp #29058](https://github.com/ggml-org/llama.cpp/issues/29058) · [zhaoyilun/bonsai2-27b-mtp-repro](https://github.com/zhaoyilun/bonsai2-27b-mtp-repro) · [Ternary-Bonsai-2-27B-gguf-dev](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf-dev)

## 2026-09-28 12:03 + 20:03 —— CoyoPedal：10 ドルのマイコン上でフルサイズのニューラルアンプ・モデリング

**CoyoPedal**（`dashersw/coyopedal`、GPL-3.0、Show HN 100 pts）：約 10 ドルの Waveshare ESP32-S3-Touch-AMOLED ボード上の Neural Amp Modeler ギターアンプ/エフェクタ——48 kHz でフルサイズの NAM A2 capture（23 レイヤー・8 チャンネルの WaveNet）を動かし、**手書き Xtensa カーネルによるブロック浮動小数点**で、両コアに 64 フレームブロックで分割。クラスコンプライアント USB インターフェースを USB ホストとして駆動；タッチスクリーン UI は TSX で書かれ**ネイティブ C++ にコンパイル**——デバイス上に JavaScript エンジンなし——同一の DSP とモデルは WASM ビルドでブラウザでも動く。誠実な包絡線：Show HN の跳ねの後は勢いが減速。LLM 系とは異なる味のエッジ推論——マイコン上のリアルタイム NN DSP——で、その web ツールchain-to-native（TSX→C++）パイプラインは音響を超えて盗む価値がある。

Sources: [dashersw/coyopedal](https://github.com/dashersw/coyopedal) · [ブラウザデモ](https://coyopedal.playtaurus.com/)

## 2026-09-29 04:03 — 分離量子化(disaggregated quantization):prefill 精度が自由変数になる

- **「Disaggregated quantization」**(arXiv:2609.26333、Dan Alistarh の ISTA-DASLab。論文 9/22、成果物は出荷中。HF 論文 32 票)：prefill と decode には*異なる*量子化が要る。このグループは計算ネイティブな NVFP4 prefill チェックポイントを学習し、既存の 1-bit decode 重みと並べた。Qwen 3.8-27B GGUF デコーダと組み合わせると、1-bit 単体比で MMLU-Pro **+32.5 点**、MMMU-Pro **+35.3 点**。さらに「offloaded disaggregated prefill」が prefill 重みを SSD からストリーミングし、llama.cpp の 8K プロンプトで weight-only 推論比 **1.78× の time-to-first-token 高速化**。**限定：**高速化は 8K プロンプト長でのみ報告。SSD 上に第 2 チェックポイントが必要。精度は Qwen 3 / Gemma 3 ファミリのみ。アブストラクトに limitations セクションなし。同ラボの GGUF 成果物は既に百万 DL 規模(Qwen3.8-27B GSQ quant で 166 万)——パイプラインは論文だけでなく実物を出している。「プロンプト処理がどれだけ速いか」を「重みがどれだけ小さいか」から切り離すのは、コンシューマ GPU 長コンテキストの新しい主ノブ——thesis 3 の核心(Kimi K3 を 4 枚の SSD から)と同じディスクストリーミング論理をフェーズ単位で適用したもの。

Sources: [arXiv:2609.26333](https://arxiv.org/abs/2609.26333) · [ISTA-DASLab GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF)

## 2026-09-29 05:06 — act：Bonsai の fork コストに数字が付く——素の llama.cpp で PPL 1,258,507

[PR #29600](https://github.com/ggml-org/llama.cpp/pull/29600)（「Runtime support for Prism Bonsai 2 27B」、09-28 17:44Z に `bri-prism` がオープン——Prism 自身のメンテナーであり、09-28 の読み通り上流化はベンダー主導のまま）が、fork 要件のコストを PR 本文自体に、llama.cpp 独自の KL ダイバージェンス harness で測定して記録している:Prism ランタイムでは同一の Q2_0 GGUF が **PPL 10.2343**（max KLD 5.3e-5、same-top-p 99.975%、参照対比）。一方、未パッチの master では同じファイルが **PPL 1,258,506.97 ± 65,204**——モデルカードの「黙って Q2_0 として読み込み、garbage を出す」が形容詞ではなく数値になった。09-28 以降の追加:性能フォローアップ [#29602](https://github.com/ggml-org/llama.cpp/pull/29602)(Metal FWHT) と [#29605](https://github.com/ggml-org/llama.cpp/pull/29605)(SYCL FWHT) がオープン、いずれも未マージ。既出の CUDA [#29100](https://github.com/ggml-org/llama.cpp/pull/29100) と Vulkan [#29101](https://github.com/ggml-org/llama.cpp/pull/29101) も未マージのまま。まだマージされていない——素の llama.cpp は今日も Bonsai 2 を実行できず、「98.2% of FP16 intelligence」の主張には依然として独立品質ベンチマークがない。（PR 自身の AI 利用開示:開発とテストに Claude Code を使用。）

Sources: [ggml-org/llama.cpp #29600](https://github.com/ggml-org/llama.cpp/pull/29600)

## 2026-09-29 12:03 — ハードウェアの床が下がり続ける：$60 の ESP32-S3 クラスタが SPI デイジーチェーンで 1.58-bit LLM を実行

**Low-Zi-Hong/ESP32s3-LLM-Cluster**（8月6日作成、9月26日プッシュ、90★、HN 53+ pts）：0.4B パラメータの LLM を 1.58-bit 三値（BitNet 方式）重みに量子化し、**SPI デイジーチェーンで接続された 7 枚の ESP32-S3** にスライス——各ノードが重みのスライスを保持し、約 $60 分のマイコンが集合的に推論を実行。限定：ホビー開発でリリースなし。BitNet 精度の 0.4B は有用なモデル品質を大きく下回る。HN スレッドは結果の議論と同じくらい「本物の分散コンピュートか」の論争。遅い、しかし本物——三値の下限がエッジ LLM のハードウェアの床を縮め続けている。上記の Bonsai 2 の 1.76 bits/weight と同じ方向。

Sources: [Low-Zi-Hong/ESP32s3-LLM-Cluster](https://github.com/Low-Zi-Hong/ESP32s3-LLM-Cluster) · [HN 議論](https://news.ycombinator.com/item?id=49884625)

## 2026-10-01 04:03 — カーネルをデバイス毎に自己調整：Magnitude の自己最適化推論エンジン

**Magnitude**（YC S25、magnitudedev/magnitude、Rust、Apache-2.0、5.6k★、Launch HN 83 pts）：モデルを走らせる前に**そのハードウェア上でカーネルを自前チューニング**する推論エンジン（創業者らによれば DL 毎約1分）——「llama.cpp 比 最高2× 高速：Metal でデコード 92% 速く、CUDA で 19%」「エージェント毎のメモリ 27% 減」を主張し、Pi、OpenCode、Hermes、Codex とワンクリック接続。留保は創業者自身のスレッドから：ヘッドラインのベンチマークは「単純な散文反復タスク…白鯨を 64k コンテキストまで…直前の節を復唱」、MLX 比較は「大まかなベンチマーク」、厳密な数値は「もうすぐ」。ハードウェア毎のカーネルチューニングはエッジで小さな決定モデルを安くサーブする方法——だが散文反復で測った「最高2×」は、約束の厳密な数値が着地するまで割り引くべき主張の形そのもの。注視：厳密ベンチ、独立した Metal/CUDA 計時、モデル×ハードウェアの組合せ全体で約1分のチューニングコストが保つか。

## 2026-10-03 05:03 — antirez が ds4 を公開：llama.cpp の瞬間が狭域ハンド書き C として到来

**antirez/ds4**（Salvatore Sanfilippo——Redis の作者——MIT、C、22,878★）：「高メモリ Mac・CUDA・ROCm マシン向けの狭域 C 推論エンジン」で、**DeepSeek V4 / V4.1 Flash、GLM 5.x、Qwen3.8 Flash Next**（ビジョン込み）を自己のハードウェア上で完全に実行する。意図的に「ジェネリックな GGUF ランナーではない」：**非対称量子化**がルーティングされるエキスパートを ~2bit に圧縮し、共有/重要経路は高精度を保つ（284B クラスのモデルが 64 GB+ マシンに乗る）。**「KV キャッシュをディスク市民に」**で長いプレフィックスを SSD に永続化、prompt hash で再開可能。CLI・OpenAI/Anthropic 風サーバー・`ds4-agent` の 3 インターフェースが 1 つのモデル状態とキャッシュを共有。公表数値：M5 Max 128 GB の Q2 で 2K コンテキスト prefill 790.2 t/s / 生成 39.4 t/s。DGX Spark は 825.8/18.1。**休眠の注記、検証済み：** リポジトリは 5 月作成・最終プッシュ 9 月 20 日。プロジェクトサイトは 9 月 17 日公開——今日の HN 投稿（25+ pts）が浮上させたのは 5 か月物の動くツールであってローンチではない。意味するところ：MoE 時代のフロンティアモデルのランナーレイヤーは、モデルファミリーごとの狭域・手書き C で獲られつつある——前世代のインフラソフトウェアを作った本人の手で。「意図的に狭い」が「何でも動く」に勝てるか（Redis が汎用 KV ストアに勝ったように）をwatch。

Sources: [dwarfstar.sh](https://dwarfstar.sh) · [antirez/ds4](https://github.com/antirez/ds4) · [HN 議論](https://news.ycombinator.com/item?id=49936575)

## 2026-10-06 20:45 —— Strata：エキスパートオフロードが 125B-A6B MoE を 12 GB のゲーミング GPU に載せる。DeepGEMM の 26/09/30 リリース

**Strata（Niko1221/Strata、MIT、9/24 作成、10 日で 10.5k★、HN 442）：** 1 つのトリックを中心に構築された推論エンジン——**Qwen3.8-Flash-Next**（総 125B / 活性 6B。Alibaba 自身のモデルカードが「Qwen4 の基盤となるアーキテクチャの実験的プレビュー」と呼ぶもの。180B パラメータの safetensors、トークン毎に 512 エキスパートのうち 10 ルーティング + 1 共有）を 1 枚のコンシューマ GPU で動かす。仕組み：**エキスパートオフロード**（ホットなエキスパートを GPU 常駐、全集合は RAM、テールは CPU、SSD に検索テーブル）+ 投機的デコーディング（1.6–1.8×）+ チャンク化プロンプト取り込み（1,000+ tok/s prefill）。README 独自のベンチ表（32K トークンプロンプト、エンジン v0.1.36）：**RTX 5070 12 GB で Q2_0 生成 94 tok/s**、RX 9070 XT で 60 tok/s、RTX 3090 は「100–140 tok/s 程度書くはず」（推定）。要件：VRAM 12 GB / RAM 32 GB / ディスク約 80 GB。**見出しと表のズレ：** HN タイトルは「RTX 4090 で 100T/s」と言うが、4090 は実測行にない——しかも Q2_0 は攻撃的な量子化で、その品質コストには触れていない。なぜ重要か：超スパース MoE アーキテクチャは「家で動かせる」線を動かし続けており、125B-A6B をゲーミング PC に収めるこの工学は、Qwen4 クラスがローカルで実際に消費される様子のプレビュー。

**DeepGEMM が 26/09/30 リリースで再トレンド（+363★、8,534★）：** DeepSeek の MoE 訓練を支える BLAS カーネルライブラリが、局所性認識の **Mega MoE 実行**、**BF16 ストキャスティック丸め**付き GEMM エピローグクラス、より広いスパース MQA ヘッド対応、packed SF ストライド、Indexer/Mega MoE パイプライン改善と正確性修正を出荷。コミットメッセージはソースが「OSS フィルタを通して書き出された」と注記し、リリースのリズム（26/07 → 26/09 → 26/09/30）は保たれている。フロンティア訓練スタックのカーネル層が公開のスケジュールで着地し続けている——MoE 訓練/推論効率をベンチする者にとって、この diff が今月の changelog。

Sources: [Niko1221/Strata](https://github.com/Niko1221/Strata) · [HN——Strata](https://news.ycombinator.com/item?id=49953495) · [Qwen3.8-Flash-Next モデルカード](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) · [deepseek-ai/DeepGEMM](https://github.com/deepseek-ai/DeepGEMM) · [commit 057ca59](https://github.com/deepseek-ai/DeepGEMM/commit/057ca5964aae0879ff2e0eb71ee05a3cb0ba3df7)


**FeSens/openTPU——アクセラレータ自体が agent の成果物になり、検証こそが物語になる（10-07、HN 161、156★）：** Apache-2.0 の単一モノレポに収まった完全な AI アクセラレータ——SystemVerilog RTL、ISA、ビット完全一致シミュレータ、カーネルコンパイラ、プロファイラ、ホストドライバ——「AI エージェントはハードウェア設計でどこまで行けるか、自分の推論を走らせるチップを作れるか」に答えるために作られた。Kintex-7 PCIe カード（Inspur YPCB-00338、2× DDR3）での実測：実重みを持つ現代の小型モデル 10 個——LFM2.5-230M が 52–82 tok/s（int8/4-bit、実時間）、Qwen3-0.6B ~31 tok/s、Qwen3.5-4B 5.9 tok/s——そして**エキスパートをホストストレージからストリーム**する MoE：LFM2.5-8B-A1B 10.6 tok/s、Qwen3.5-35B-A3B 3.95 tok/s、エキスパート使用の 98.5% がオンボードスロットにヒット。全設定がシミュレータと **トークン単位で一致**。README はデバイス対ウォールの内訳、DRAM カウンタの帯域利用率（ピークの 82–94%）、正確なビルドハッシュ、モデル毎の癖を公開。「AI が開発」はプロジェクト自身の枠付けで独立監査不能——この項目を成り立たせるのは反証可能性の標準（シミュレータとのビット一致 + `tools/qual/perf.py` に公開された測定方法）で、agent 製ハードウェアデモのほとんどが決して満たさないもの。設計者が誰であれ、matmul から配線までの全科教科書であるこのリポジトリは、アクセラレータの学び方について最良の公開教材になった。エキスパートストリーミングの半分は、このファイルのディスクストリーミング・テーゼが FPGA スケールで再現されたもの。

Sources: [FeSens/openTPU](https://github.com/FeSens/openTPU) · [HN 議論](https://news.ycombinator.com/item?id=49980715)

## 2026-10-09 —— 超小型モデルの製品ライン、1 ビット未満の因数分解、メモリティアとしての圧縮 RAM

**Whistle（Cactus Compute、10/2、HN 256）：**重みファイル全体が **16.9 MB** の音声認識（Whisper base：145.3 MB、Moonshine tiny v2：41.9 MB）、英/独/仏/西/伊/蘭/波の 7 言語を自動言語検出付きでカバー。Apple M4 Pro CPU で：初トークンまで 11.1 ms、1,319 tok/s デコード（Whisper base：73.2 ms / 266/s）。単語レベルのタイムスタンプと音声埋め込み。17 プラットフォームのプリビルドバイナリ——watchOS、RISC-V、WASM、WASI を含む。依存ゼロ。誠実さが信頼性：著者自身のベンチマークが Whisper base が TED-LIUM・AMI・MLS では依然勝つと認め——Whistle は LibriSpeech・SPGISpeech・Earnings-22・FLEURS でリード——1 パスは 30 秒 / 320 トークンで頭打ち。エンジン（Needle、13.5k★、Apache-2.0）は Cactus の 2 ビット自動化モデルと同じもの——超小型モデルがデモではなく製品ラインになりつつあり、ウェアラブル/ロボット/組込みビルダーがまさに必要としているもの。

**LittleBit / LittleBit-2（Samsung Labs 公式実装；NeurIPS 2025 + ICML 2026）：**GPTQ/AWQ 型の丸めとは別の軸の極限圧縮——各密行列を低ランク潜在因子に分解し、それを二値化し、学習されたスケールで大きさを復元——**1.0 から 0.1 bits/weight** を目標に、推論時は元アーキテクチャを維持。LittleBit-2 は Joint-ITQ 初期化（オプトイン `--use_itq`）を追加：QAT 前に潜在因子を二値超立方体に整列、推論コストなし。チェックポイント：OPT、Llama 1/2/3、Phi-4、Qwen2.5/QwQ/Qwen3、Gemma 2/3。細字：CC BY-NC 4.0（非商用）、4 コミットの研究リポジトリ、`transformers` 4.51.x ピン留め。固定メモリ予算に収まるモデル規模が桁で変わる、RAM が安くなくなったまさにその時に着地——ライセンスは研究ツールのまま、配備経路ではない。

**Meta CRAM（LPC 2026、Gregory Price；Phoronix）：**`mm/cram.c` はハードウェアオフロードの圧縮 RAM をスワップではなく*メモリティア*として扱う——カーネルはページインして展開する代わりに、圧縮されたキャッシュラインをバイト粒度で直接読む。Phoronix：読み取り専用データが生 DRAM 相当の読み性能を達成。書き込みも ZRAM・Zswap・素のスワップよりはるかに速い。LPC アブストラクトはデバイスが「真の容量について根本的に嘘をつく」と認めた——まさにカーネルが管理することを教え込まれるべき嘘。支援部品の大半はすでにメインライン。このファイルの DRAM 価格ショックの糸に、アクセスごとにスワップイン税を払わないカーネルネイティブの伸長が加わる。未解決の問い：どのハードウェアが実際に圧縮オフロードを出荷するか。

Sources: [Whistle 発表](https://cactuscompute.com/blog/whistle) · [cactus-compute/needle](https://github.com/cactus-compute/needle) · [SamsungLabs/LittleBit](https://github.com/SamsungLabs/LittleBit) · [LittleBit 論文](https://arxiv.org/abs/2506.13771) · [Phoronix——CRAM](https://www.phoronix.com/news/Linux-CRAM-Compressed-RAM) · [LPC 2026 発表](https://lpc.events/event/20/contributions/2424/)

## 2026-10-11 → 10-13 — メモリ衝撃がプラットフォームの道順に届く。ローカル音声が磨かれる。Strata は出荷し続ける

**DDR4 の二度目の復活（The Verge、10-09/10；HN 236+）：** AI 駆動のメモリ不足が DDR5 を値上がりさせ、ベンダーが 10 年前のプラットフォームを復活させる水準に：Gigabyte が 2 つのマザーボード線で**今後の Intel LGA 1700 プロセッサ対応**を発表（2021 年の DDR4/DDR5 両対応ソケット。Intel は 2024 年 DDR5 専用化）。新 LGA 1700 チップは 2027 年初頭予定。8 月に Gigabyte は新 AM4 基板と Ryzen 7 5800X3D の 10 周年再発売を発表済み。DDR4 は 2014 年生まれで、予定された死を既に二度生き延びた。同記事：AI 需要が SSD 価格も押し上げ、Q3 の PC 出荷は −20%。Micron の引き取り契約（10-02）が供給側なら、これは需要側がデスクトップの道順へ届いた証。ビルドマシンを買う開発者の予算ルートは古いソケットを通り、メモリはインフラ計画の実在の行項目になった。

**BetterWispr（opennookorg、Apache-2.0、Show HN 107+）：** 無料の macOS 音声入力——⌥Space を押して話し、整えられたテキストがカーソル位置へ。フィラー除去、アプリ別文体、名前と用語の学習、音声コマンド。全て**端末上で文字起こし**：9 内蔵モデル（Apple speech、Parakeet TDT v3——25 の欧州言語、Parakeet 日本語、WhisperKit 経由の Whisper Large v3 Turbo）——「アカウントなし、クラウドフォールバックなし」。第三者 API は明示選択時のみ。更新は Sparkle + EdDSA 署名。Whistle（10-09）に続き、ローカル STT の棚に洗練された・サブスクなし・アカウントなしの入口ができた。公式比較表は失うもの（クラウド処理、マルチデバイス磨き）を正直に列挙。音声入力が三つ目の常設入力になる時、ローカルかクラウドかは設定ではなく永続するプライバシーの初期値になる。

**Strata の日付付き更新（Niko1221、MIT、C++、22.6k★）：** 再浮上の翌日に v0.1.43.1（10-12 約 20:30 UTC+8）——936 点 HN スレッド（10-04）以降もリリースが続く。Qwen3.8-Flash-Next（125B MoE、24,576 専門家、トークンごとに 10 活性）を GPU/RAM/CPU/SSD 検索表へ分割：VRAM 12 GB+、RAM 32 GB+、ディスク約 80 GB。推測復号は主張 +1.6–1.8 倍。RTX 5070 実測 約 53–94 tok/s（量子化による）。localhost の OpenAI 互換＋Anthropic 風エンドポイントと MCP サーバを備え、コーディング agent が直接指せる。量子化を自動選ぶワンクリック導入器が、フロンティア級オープンモデルに Ollama が 7B Llama でやったことをしている。

Sources: [The Verge — DDR4 復活](https://www.theverge.com/games/1009140/ram-shortage-intel-amd-ddr4-comeback) · [betterwispr.com](https://betterwispr.com/) · [Niko1221/Strata](https://github.com/Niko1221/Strata)

## 2026-10-13 午後 → 10-14 04:03 — 2 つのストリーミング機構が一つの結論へ収束：ディスクが決める。容量が帯域の戦いに加わる。埋め込みモデルが聴くことを覚える

**Janas（Show HN、純 C、libc 以外依存なし）：**低スペック ハードウェア向け実験的 MoE 推論エンジン — 重みはディスクに置いたまま、各トークンに必要なエキスパートを `O_DIRECT` で NVMe からストリーミング（~5.7 GB/s）、80B モデルのホット エキスパートを ~19 GB の RAM キャッシュに保持、prompt 処理は Vulkan、ドラフトは各モデル内蔵の MTP ブロック（Qwen3.5/3.6/Next）または Gemma 4 の drafting assistant から。ヘッドライン（自己申告）：**Qwen3-Next-80B（重み 48 GB）が 32 GB ノート PC で 37 tok/s — llama.cpp は 2.8 tok/s**；ドラフトなし 24 tok/s；「Q4_K_M で比較した 13 モデルすべてで llama.cpp より高速。」README は素人ベンチが省きがちな誠実作業をやっている：すべて作者が 1 台で測定；llama.cpp は 80B で OOM workaround が必要；測定方法は「厳密には同じではない」；ドラフト列は「2026 年 9 月 26 日までは間違っていた」；「これは実験であり製品ではない。」

**AirLLM 再トレンド（37.7k★、Apache-2.0）— もう一つの粒度：**transformer の層を 1 枚だけ GPU に載せ、残りをプリフェッチ付きでディスクからストリーミング — VRAM はモデルでなく層のサイズに比例：Kimi K3（2.8T）を 1 カード 3.72 GB、DeepSeek-V3（671B）~12 GB、Llama 70B ~4 GB；オプションの 4/8 ビット重みのみ圧縮で約 3 倍（ボトルネックはディスク読み込みなので重みだけ）。2026 年の歩み：v3.0 FP8 + 統一 `AutoModel`（6 月）、Kimi K3 対応（7 月）、Qwen3.8-Flash-Next 125B MoE を 5.95 GB で（8 月）、9 月は凍結重みのストリーミングで 125B を 6 GB 未満 LoRA 微調整。「動くこと自体」のエンジニアリングであり、スループットの覇者ではない。

**収束点：**エキスパート オフロード（Strata、Janas）と層ストリーミング（AirLLM）は最適化する相手が違う — tok/s vs 動くか — だが両方とも**GPU ではなくディスク**を、普通のマシンがどのモデルを動かせるかを決める部品に変えた。

**Intel D270 推論 GPU：**標準 PCIe 5.0 カード 1 枚に最大 **480 GB LPDDR5X**、Xᵉ3P コア 32、XMX 行列エンジン 256、350 W 空冷；目標は agentic AI、長文 RAG、コーディング アシスタント、高同時実行サービング（vLLM/PyTorch/SGLang/Triton 対応）。**メモリ帯域と FLOPS は非公開** — スレ内の 1.5 TB/s + 1.3 PFLOPS FP8（videocardz 経由）はリーク数字で、コメント欄が V100（0.9 TB/s）や MI300X（5.3 TB/s HBM）と自主比較；ページ自身の性能見通しは「Intel 内部分析、2026 年 2 月時点」vs RTX Pro 6000。価格も日程もなし。LPDDR5X のワットあたり容量 vs HBM 帯域は推論ハードウェア最大のトレードオフで、空冷 1 枚 480 GB は「少数ユーザーに巨大 MoE を仕える」形 — ただし Meta Wonder の教訓がシリコンでも適用：ベンダーが公開するまで、リークはリークとして扱う。

**Apple Minions（arXiv 2610.12970、10 月 9 日提出）：**通常利用中は遊んでいる macOS マシンの GPU をプールし「動的分散仮想 GPU クラウド」化、フォールトトレランス付き、集中インフラの「高コスト・低弾力・長い待ち時間」に困るチーム向け。3 ページ、図 1、表 1 — **ベンチマークなし、台数なし、スループット数値なし**。「実用プラットフォーム」の主張は方向の道標であり実測結果ではない；数字を出す続編を追う。

**転写する埋め込みモデル（eg2.haku.sh）：**Google の EmbeddingGemma 2 — 音声転写向けに訓練されたことのないマルチモーダル*埋め込み*モデル — を STT エンジンとして使う。音声エンコーダは凍結のまま；小さな「リーダー」（8×H100 で 2 時間未満、オープンライセンス英語音声で訓練）が短い音声スライスをモデルのテキスト空間へ移し、約 22.9 万英単語の最近接が勝つ；极小モデルが句読点と大文字を補う。実測：**1 時間の音声を約 12.6 秒（288 倍リアルタイム）** — ベース M3 MacBook Air 8 GB、Neural Engine、ダウンロード 715 MB。比較表は正直：IBM Granite Speech ~150 倍、M5 Pro の Parakeet v3 微調整 ~480 倍 — 専用 STT に匹敵する速さであり、超えてはいない。トリック：**埋め込み空間を万能インターフェースとして使う** — STT ヘッドは一度も訓練されていないのに、音声→テキストの近接性は最初からモデルの中にあり、2 時間のリーダーでそれがデコードできるようになった。10 月 7 日の EmbeddingGemma 2 リリース項目の続き：初めての本物の意外な転用 — 埋め込みモデルが再利用可能な基盤であることのデータポイント。

Sources: [prabanta-dev/janas](https://github.com/prabanta-dev/janas) · [HN 50063717](https://news.ycombinator.com/item?id=50063717) · [lyogavin/airllm](https://github.com/lyogavin/airllm) · [Intel D-series](https://www.intel.com/content/www/us/en/products/details/discrete-gpus/data-center-gpu/d-series.html) · [HN 50063365](https://news.ycombinator.com/item?id=50063365) · [Apple ML Research — Minions](https://machinelearning.apple.com/research/distributed-gpu-cloud) · [arXiv 2610.12970](https://arxiv.org/abs/2610.12970) · [eg2.haku.sh](https://eg2.haku.sh/) · [HN 50069971](https://news.ycombinator.com/item?id=50069971)

## 2026-10-14 12:03 — 常に考えるエッジ MoE と、CPU スループット問題としてのテキスト抽出

**Liquid AI が LFM2.5 ファミリを 24B 総 / 2B アクティブで締める（`LiquidAI/LFM2.5-24B-A2B`、HF モデル作成 10 月 12 日、LFM-1.0 ライセンス）：**「LFM2.5 ファミリで最大かつ最後のモデル」で、ファミリは 2 桁下の LFM2.5-230M まで広がる。アーキテクチャこそが主張だ：**総パラメータ 24.0B、アクティブ 2.45B**、40 層——**二重ゲート付き短畳み込みブロック 30 層＋GQA アテンション 10 層**——**MoE ブロックあたり 64 エキスパート、top-4 ルーティング**、17 言語・36 兆トークンで訓練。テキスト専用で、「答える前に常に考える」。ベンダー数値：**Qwen3.6-35B-A3B**（総パラメータもアクティブ パラメータも約 5 割多い）に対する競争力のある agentic/tool-use で **LiveClaw 48.09 対 38.19**；オンデバイスで同等 MoE より最大 **1.7 倍高速**；**Apple M5 Max で 184 tok/s**；単一 NVIDIA B300 で最大 21K 出力 tok/s。持ち越す注意書き 2 つ：ライセンスは Liquid 自身の **LFM-1.0 条項**で標準的な OSI ライセンスではない、そして LiveClaw の差は別の訓練レシピに対するベンダー自身のもので——方向性として読め。アーキテクチャが重要な理由：短畳み込みブロックとスパース ルーティングにより、**推論トークン 1 つあたりの計算は 2.45B パラメータ分だけ**になり、これが「MoE 速度での推論」をデータセンターではなくラップトップの主張として成立させる。 → [[smart-routing]]

**100 万パラメータの OCR モデルが CPU で 49 ページ/秒（Indra OCR、Datalab、10 月 13 日）：** 詳細と注意書きは [[smart-routing]] に；エッジ側の読みは、**テキスト抽出が GPU ではなく CPU スループットの問題になった**こと。かつてビジョン モデルかクラウド呼び出しを要した文書パイプラインを、今や小型モデル層が担う。その制限節（手書き約 8%、7 書字体系、多段表）は埋めずに印刷されている——このバッチの LFM2.5 と Janas の項目と同じ形だ。

Sources: [LiquidAI/LFM2.5-24B-A2B](https://huggingface.co/LiquidAI/LFM2.5-24B-A2B) · [Liquid AI blog](https://www.liquid.ai/blog/lfm2-5-24b-a2b) · [Datalab — Indra OCR](https://www.datalab.to/blog/indra-ocr) · [datalab-to/indra-ocr](https://huggingface.co/datalab-to/indra-ocr)

## 2026-10-14 20:17 — EmbeddingGemma 2 の最初の出荷アプリケーション（DigUp）

**`ARahim3/DigUp`**（3,162★、MIT、10 月 8 日作成、Apple Silicon + macOS 14+）は、Google DeepMind の
**EmbeddingGemma 2**（10-07 に本ファイルで初めて扱った 740M のマルチモーダル埋め込みモデル）上に構築された
完全オンデバイスの macOS セマンティック検索で、同モデルが提供するテキスト／画像／音声／動画の共有空間を
利用している。この共有空間が与えるもの：写っている内容でもスクリーンショット内の文字でも画像を探せる；
フレーズが**話された瞬間**に動画やポッドキャストを開ける（音声は 30 秒の重複ウィンドウで埋め込む）；PDF を
該当ページで開き該当語をハイライトする；意味だけでなく請求書番号やエラーコードのような文字列も完全一致で
引ける。索引はローカルで、ネットワーク呼び出しは一度きりの **865 MB モデルダウンロード**と「あなたのファイル
について何も送信しない」日次更新確認だけである。

このカテゴリにしては珍しく範囲を明示しており、それがプライバシー主張を掛け声ではなく検証可能にしている：
コード検索用に選んだフォルダの外では**コードを一切読まない**；コードプロジェクト内では**スクリーンショット
だけ**を読む；鍵、証明書、パスワードファイル、`~/.ssh`、アプリバンドル、キャッシュには触れない。Windows と
Linux は "on the way" と記されている。

**なぜ本ファイルに属するか。** これは EmbeddingGemma 2 の中心的主張——1 つの 740M モデルが画像・音声・
テキスト検索を、ノート PC 上の 3 つの専用インデックスを置き換えられる水準でこなす——の実地試験であり、
本バッチの「小型モデル層」パターンの二度目の登場でもある（他は LFM2.5-24B-A2B と Indra OCR）。面白い問いは
もはや「ローカルで動くか」ではなく「1 つの小型モデルが何を包含するか」だ。境界がマーケティングではなく
機構の記述に引かれていることが、この主張を監査可能にしている。

Sources: [ARahim3/DigUp](https://github.com/ARahim3/DigUp) · [google/embeddinggemma-2](https://huggingface.co/google/embeddinggemma-2)

## 2026-10-15 04:03 — セルフホストの対象が 321B MoE になり、軸は適合ではなくカード枚数になる

**`mw00/project-maya`（MIT、836★、10 月 6 日作成、本日プッシュ）**は **GLM-5.3-Flash——321B
パラメータの mixture-of-experts**——のためのセルフホスト スタックで、**1 枚の GPU から 16 枚**まで、
NVIDIA でも AMD でも、Linux でも Windows でもスケールするよう設計されている。エンジン、サーバー、
ダッシュボード、そして既存のクライアントをそのまま向けられる **OpenAI / Anthropic 互換の API**、加えて
量子化ツールとして出荷される。

**なぜ本ファイルに属するか。**ローカルでのフロンティア級推論を縛る制約は、この 1 か月で「収まるか」から
「何枚のカードで済み、API の形が私のクライアントに合うか」へ移ってきた——本プロジェクトはまさにその軸を
最適化し、しかも本ファイルがすでに追っているモデル系列（GLM-5.3-Flash は OpenRouter の 1 位モデルでも
あり、10-13 のオープンウェイト価格の議論の主題でもある）に対してそれを行う。これを前提に計画する前に
二つの確認を：**1 枚構成側の量子化後メモリ フットプリント**こそが正直な未解決の問いであり（321B
パラメータは積極的な量子化より緩い条件では単一アクセラレータの VRAM に収まらないので、1 枚構成は
おそらく大きく量子化されている）、README 自身の数値がそれを検証する場所である。ここで本ファイルが
一次で測ったものは何もない——読んだ資料の中でリポジトリはベンチマーク表を公開していないので、
API 互換性とマルチベンダー対応を検証可能な主張として扱い、カード枚数の階段はフットプリント表が
現れるまではベンダーの枠組みとして扱うこと。

Sources: [mw00/project-maya](https://github.com/mw00/project-maya) · [zai-org/GLM-5.3-Flash on Hugging Face](https://huggingface.co/zai-org/GLM-5.3-Flash)

**10-16 夜→10-17（学習パス）——「どんな汎用ハードが何を走らせるか」のデータポイント 3 件。 （1）Apple MLX v0.30.1：Thunderbolt 5 上の分散推論。** 新しい **RDMA-over-TB5** ドライバ（`jaccl` バックエンド、macOS 26.2）と `mlx.launch` 経由のパイプライン/テンソル並列：**M5 Ultra Mac Studio 4 台**（各 512 GB ユニファイドメモリ、1.2 TB/s）が **Muse Spark Open 816B-A42B を NVFP4 で 36.73 tok/s デコード**——読書速度以上；モデルは BF16 で >1.6 TB、4 ビットでも約 493 GB 必要で、1 台では*入らない*；M5 Ultra 対 M3 Ultra で初トークン最大 4.6×。注意書きが異例なく完全で、しかも Apple 自身から：MoE はマシン間スケールがデンスより*悪い*；テンソル並列は 64k コンテキストの Muse Spark プリフィルを傷つける（エキスパートごとの出力正規化）；パイプライン並列はデコードを変えない；デコードは 128 トークンのみ計測。「フロンティア オープンウェイトを家に持ち帰る」物語にコンシューマー インターコネクトが付いた——InfiniBand ではなく Thunderbolt ケーブル——そして Apple シリコンが参照経路になる。 **（2）MiniCPM-V 4.7**（OpenBMB、重み 10-07 / カード 10-15）：シリーズ初の MoE——**35B-A3B、Apache-2.0**、1B の兄弟も——**iPhone 17 Pro Max 上で 3 GB メモリ内 13+ tok/s** を主張。技術こそが内容：**Lookahead Expert Scheduling**——llama.cpp-omni フォークが次の層が必要とするエキスパートを予測・プリフェッチし、読み込みと計算をオーバーラップ、計算はモデル自身のトークン単位ルーティングに従う；従来のスマホ MoE は*ルーティング プールを制限して*（能力に上限を設けて）しのいでいたが、これは完全なルーティングを保つ。さらに細粒度の層別量子化、DSpark 推測サンプリング、ViT 内部での視覚トークン圧縮（LLaVA-UHD v4）。フォークが再現するまでは自己申告として扱う。 **（3）PS5LM**（cobanov、約 271★、C++、10-16 プッシュ）：**jailbreak 済み PS5 上で llama.cpp をネイティブ実行**、最初は Qwen 3.8——任意の GGUF を本体 OS 上で、Linux インストールなしで。1 週間で 3 つ目の PS5 ネイティブ プロジェクトで、AnyPS5 と逆方向：AnyPS5 は PS5 バイナリを Linux/Windows 側へ再リンクするが、PS5LM は PS5 本体を計算ターゲットにする——既知の GPU/CPU プラットフォーム + 大きなユニファイド メモリ プールが、すでに机の上にある数百万台ある。小さなリポジトリ、初期の数値；パターン（消費者向け固定ハードを推論フリートに）は古い Mac や Jetson が推論下位層になったのと同じもの。

Sources: [Apple ML: MLX 分散推論](https://machinelearning.apple.com/research/mlx-distributed-inference) · [HN](https://news.ycombinator.com/item?id=50118320) · [HF: MiniCPM-V-4.7-35B-A3B](https://huggingface.co/openbmb/MiniCPM-V-4.7-35B-A3B) · [cobanov/PS5LM](https://github.com/cobanov/PS5LM) · [HN](https://news.ycombinator.com/item?id=50122431)

**10-17 20:31（学習パス）——購入前の問いに、ラベル付きマトリクスが付く。** **Llmspeed**（Show HN 105 点；llmspeed.dev、`nicorobinreal/llmspeed` でオープンソース）：約 31 デバイス（RTX 3060→5090、RTX PRO 6000、H100/A100/H200、MacBook M2 Pro→M5 Max、Mac Studio M3/M4/M5 Ultra、RX 7900/9070 系、Arc Pro B70、DGX Spark、CPU のみの Ryzen 9 9950X + 96 GB 構成）× 15 モデル（Qwen 3.x、GLM-5.3 Flash、GPT-OSS 20B/120B、Gemma 4、Llama 3.1 8B、DeepSeek R1 Distill と V4 Flash）のルックアップマトリクスで、コミュニティベンチ（r/LocalLLaMA、localscore.ai ほか）から「ローカルモデルは*体感*どれくらい速いか？」に答える。誠実な部分はサイトに印字済み：一部の数値は**「derived from similar setups or projected from specs」**——そのセルは推定の推定として読む——数値は「単一デバイスの短いプロンプト」に適用：長コンテキスト、マルチ GPU、同時ユーザーでは変わる。tok/s はローカル推論が快適か使用に耐えないかを決める数値で、そのデータは常に Reddit のスレッドに散らばっていた——注意書き付きでも、ラベル付きで検査可能なマトリクスは民間伝承に勝る。fit-to-measured-budget ツール（llmfit）の隣、ローカル推論スタックの買い手側の層。

Sources: [llmspeed.dev](https://llmspeed.dev/) · [Show HN](https://news.ycombinator.com/item?id=50127979)

**10-20 12:03（学習パス）——ユニファイド メモリ ARM ノートが Linux 上で実証される。** **ASUS ProArt P16「RTX Spark」**（128 GB ユニファイド メモリ、20 コア N1X ARM、6,144 CUDA コア；201 HN ポイント）のブリングアップ ログ：**Arch Linux ARM** が修正済み ACPI オーバーライド、NVIDIA カーネル作業、ASUS 純正ドライバ パッケージから抽出したスピーカー ファームウェアで起動——手順は公開・ハッシュ ピン・署名済み、上流 **Archinstall 4.5** の拡張として構築。実測：圧縮で **7-Zip が 20 スレッドで Windows 対比約 5% 先行**、ユニファイド メモリのフレックスは本物——**Linux は OS と CUDA に同じ 116.0 GiB のプールを報告**し、Windows は専用/共有/CPU 領域に分割する（Windows では 91 GiB の予約が 109.7 GiB の CUDA 合計に）。作者の動機は明示：オープンウェイト モデル、ノート PC 上のローカル RL とファインチューニング、Microsoft アカウント不要。このユニファイド メモリ ARM ノートは今年のローカル推論ハードであり、これがそれらが実用の Linux マシンであることの最初の詳細な証明——地味な注意点（ファームウェア、ACPI、電源管理）は公開の場で潰済み。単一の 116 GiB アドレス可能プールこそ、ファインチューナが気にする数字。

Sources: [josie.lol ビルドログ](https://josie.lol/blog/linux-rtx-spark) · [HN](https://news.ycombinator.com/item?id=50158100)

**10-20 20:03（learn pass）——フロンティアラボの本番サービングスタックがフォーク可能に：DeepSeek DeepInfer。** **deepseek-ai/DeepInfer**（Apache-2.0、執筆時 6.2k★、637 HN pts）：「DeepSeek の大規模本番サービスを支える高性能推論フレームワーク」——README は境界に珍しいほど正確。**含まれるもの**：最適化カーネル付きオフライン推論（FlashMLA、DeepGEMM、DeepEP、TileLang）、MoE EP + EPLB、「DSpark と confidence-scheduled verification」のドラフトトークンデコード、SWA bounded replay、非同期ゼロオーバーヘッドバッチスケジューラ、バッチ不変推論、決定論的サンプリング、regex/JSON schema/EBNF の構造化出力。**ハードウェア：NVIDIA SM100 と華為 Ascend 950（CANN 9.2）が一つの依存リストに併存** ——二つの半球が、DHS FASCSA 命令（本フィード第 23 項）が DeepSeek 由来製品を米国民間機関から排除したのと同じ週に。**明示的に含まれない**：KV cache システムなし、prefill/decode 分離なし、ロードバランシングなし——「完全な推論サービスに必要（本リリースには未収録）」。この「未収録」セクションこそ、DeepSeek が自社の生産的堀をどこにあると考えているかの地図。系譜は謝辞が確定：「当初は主に vLLM を基盤に構築」（ゆえに vLLM も同日トレンド入り）、SGLang と TensorRT-LLM に着想。ベンチマーク（prefill 4×SM100、decode 64）には再現用 `run_sweep.sh` が添付——このファイルが一貫して評価する「再現スクリプト＝主張」の型。ローカル推論ではないが、同じエンジン層のサービング側：DeepInfer が最適化するカーネル（FlashMLA、DeepGEMM）は、ローカル/ストリーミングスタックが受け継ぐものと同一だ。

Sources: [deepseek-ai/DeepInfer](https://github.com/deepseek-ai/DeepInfer) · [HN](https://news.ycombinator.com/item?id=50163277)

## 10-21 12:03 — セルフホストの音声スタックがクローニングと吹き替えに到達

`debpalash/VoiceStudio`（AGPL-3.0、79,224★、+17,057/週、本日 04:34 UTC に push——12:40 に再確認）：完全ローカルの音声プラットフォーム——声のクローニング、声のデザイン、タイミング付き動画吹き替え、フローティング聴写ウィジェット、文字起こし、オーディオブックとバッチ処理——を Electron アプリとして提供し、ローカル API とエージェント向け MCP サーバーを備える。既定エンジンは k2-fsa の OmniVoice で他も選択可、最新リリースは v0.5.6（9 月 23 日）。これは 09-14 と 10-13 のメモ（16 TTS + 11 ASR エンジン → 61.4k★ のインストール経路 → 79.2k★）への日付付き更新で、実質は天井がどこまで上がったかにある：セルフホストの対抗策はいまや**クローニングと吹き替え**——ベンダーがオープン重みに置かない層そのもの——を覆う。同じ日に Mistral はバッチ文字起こしを $0.0035/min と値付けし、ライセンスも重みも示さなかった（→ [[frontier-models]]）。注意点：646 言語はプロジェクト自身の数字で独立評価の引用はなく、AGPL-3.0 は社内ツールなら問題ないが製品への組み込みでは実質的な制約になる。

Sources: [debpalash/VoiceStudio](https://github.com/debpalash/VoiceStudio) · [voicestudio.sh](https://voicestudio.sh/)
