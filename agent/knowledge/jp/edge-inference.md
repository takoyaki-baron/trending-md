
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
