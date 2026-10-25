---
title: データセンター シリコンと AI ファクトリ ラック
topic: datacenter-silicon
created: 2026-10-14
---

# データセンター シリコンと AI ファクトリ ラック

演算供給の層：内部トークン需要のために hyperscaler が自社製アクセラレータを作ること、そしてそうした
システムが公開されていくラック / トレイ / ファブリック / 電力の標準。隣接ファイル：
[[edge-inference]]（ローカル＋コモディティ ハードウェア推論）、[[model-hardware-standard]]（メモリ
コントローラと物理 MCP の問い）、[[frontier-models]]（訓練経済とベンダー実施ベンチマーク）。

## 2026-10-14 — レンタル経路を持たない推論ファーストのアクセラレータ；ラック設計がオープンになる

**Microsoft Maia 300（Open Compute Project Summit、10 月 12 日発表；The Next Platform のアーキテクチャ
解説、10 月 13 日）：** Microsoft 自社 XPU の第 3 世代。Microsoft 自身の主張：Maia 200 は現在
本番ワークロードを処理している；**96 アクセラレータ**構成の Maia 300 は**ラック規模のトークン
スループットで Maia 200 の最大 7 倍**を出す；そして「**主要な GPU ベース システム比で 1 メガワット
あたり 40% 多いトークン**」を提供する——比較対象システムは**名指しされていない**。The Next Platform が
補う Microsoft の言わなかった部分：8 スタックで **288 GB の HBM4**、約 18 TB/s、パッケージは実質
**インターポーザ上の 7 チップ＋8 HBM スタック**（コンピュート チップレットは TSMC N2P、I/O と HBM
コントローラは分離）、12 タイルずつの 4 タイル クラスタ、そして再設計された ATL Ethernet ファブリックが
より大きな agentic ワークロード向けに一貫ドメイン内へより多くの XPU を詰める——**1 ラックに 96 XPU で
約 167 kW**。生産は **2027 年**予定で、Azure Maia はマルチギガワット配備へ拡大；GitHub Copilot と
Microsoft Foundry は今年末までに Maia 200 へ移る。Google の TPU や AWS の Trainium と違い、
Microsoft は **Maia の容量を外部クラウド顧客へレンタルしない**、そして訓練用には依然 NVIDIA と AMD の
シリコンを買う。読み：ビジネス ケースが Microsoft 自身のトークン需要（Copilot、Foundry、OpenAI）で
ある推論ファーストのアクセラレータが、名前のないベースラインに対して測った 2 つの倍数とともに
出荷される。

**NVIDIA が Vera Rubin ラックとコンピュート トレイを MGX 経由で OCP へ寄贈（10 月 12 日、サンノゼ）：**
AI ファクトリ向けのオープン アーキテクチャを拡張する更新版 **MGX 1.2** 仕様；AI ファクトリ設計と
**グリッド耐性**のオープン標準を hyperscaler とともに公開；**DSX AI Factory** 向けの新オープン
ソース ソフトウェア コンポーネント；**Meta と NVIDIA** が Spectrum-X Ethernet SuperNIC と
Spectrum-6 を軸にオープンな AI ネットワーキングを進める；**Visionbay** が Vera Rubin 時代向けの
800V DC AI ファクトリ設計を提示；**NVIDIA と Cisco** が Ultra-Dense Small Form Factor Pluggable
（USFP）標準を発表、400Gb/s ベースのネットワーク ファブリック向けとして業界初のモジュールと説明；
**NVIDIA と Google** が将来の ConnectX-10 SuperNIC と BlueField DPU での Falcon Transport 対応を
発表；そしてオープンな液冷の取り組み（MQD、MQDB）も同じ流れに畳み込まれた。

**このファイルが追跡するために存在する主張——筐体はコモディティ化するが、シリコンはしない。**
ラックとコンピュート トレイの設計を公開すること（Hopper と Blackwell に対する MGX と同じ動き）は、
アクセラレータが単一ソースのまま*シャーシ*のセカンドソース市場を作る；プロプライエタリなラック規模
設計から最も得るものが多いベンダーこそが、それを標準化しているベンダーだ。反例は同じ週にある：
Maia 300 のシリコンはプロプライエタリであると同時に**売り物でもない**ので、唯一の買い手は
Microsoft 自身のサービスだ。オープンなチェック 2 つ：7 倍 / メガワットあたり 40% という数字が
2027 年の生産後に独立したラック測定を生き延びるか、そしてグリッド耐性標準が hyperscaler 以外の
誰かに採用されるか——実際にそれを読まねばならなくなる当事者は電力会社だ。

Sources: [The Register / The Next Platform — Maia 300](https://www.theregister.com/compute/2026/10/13/microsofts-clea-maia-300-inference-xpu-is-a-bandwidth-beast/5302874) · [Microsoft Maia](https://news.microsoft.com/maia-2026/) · [Azure Maia 300 architecture deep dive](https://azure.microsoft.com/en-us/blog/deep-dive-into-azure-maia-300-architecture/) · [NVIDIA at OCP Global Summit](https://blogs.nvidia.com/blog/ocp-global-summit-vera-rubin-scale-ai-factories/) · [NVIDIA MGX](https://www.nvidia.com/en-us/data-center/mgx/)

## 2026-10-21 12:03 — Prometheus が goodput と MTBI を公開：訓練が完走するかを決める指標

Meta が **Prometheus**（オハイオ州 New Albany、第 1 フェーズ完了）を公開した：複数の建屋にまたがる数十万 GPU を「1 台のマシン」として接続し、フルスケールで約 **100 万**を目標とする——Muse ファミリー（Muse Wonder を含む）を訓練したクラスタである。残すべき数字は FLOPS ではなく信頼性：事前訓練で **goodput >85%**、Muse Wonder の RL 実行で **>90%**、平均無中断時間は **約 47,000 GPU-hours——全フリートのファームウェア修正後に 54,000 超へ上昇**。プラットフォームは **Catalina**（GB200 NVL72、2 ラック構成 "Ariel" で GPU あたり 800G scale-out、標準の 400G ではない）と **Clemente**（GB300 NVL72、GPU あたり 288 GB HBM、GPU:CPU 2:1、72 GPU ドメインを 1 ラックに収容）、次に Vera Rubin NVL72、加えて閉ループ液冷。持ち帰るべき算術：MTBI 約 47k GPU-hours では、5,000 GPU を使うジョブはおよそ **9 時間ごと**に中断を想定すべき——フロンティア訓練が完走するかを決めるのはピークスループットではなく goodput である理由がここにある。数値はすべて Meta 自身のフリートと自前の計測に基づき、ファームウェア前後の比較も同社のもの。外部監査はなく、goodput の定義も Meta のものである。

Sources: [Engineering at Meta: Inside Prometheus](https://engineering.fb.com/2026/10/19/data-center-engineering/inside-prometheus-meta-gigawatt-scale-supercluster/) · [HN](https://news.ycombinator.com/item?id=50152886)

## 2026-10-24——同じリクエストがスウェーデンで 0.38 g、テキサスで 3.2 g。清潔な電網では排出の主役はハードウェア

Berget AI はストックホルム環境研究所、WattTime、Klimatkollen とともに、典型的な Kimi K3 リクエストの
リクエストあたり CO₂e を公表した：**スウェーデン 0.38 g、アイルランド 1.6 g、ドイツ 2.5 g、
テキサス 3.2 g**——「テキサスはスウェーデンの 8.5 倍」。エネルギーはほぼ同じで「約 **4 Wh**」、違うのはその
構成である。スウェーデンではフットプリントの **89%** が**ハードウェア製造**、テキサスでは **90%** が電力で
「加えて約 6 mL の冷却水」。手法は Green Software Foundation の SCI for AI に従い、MIT ライセンスで GitHub に
公開、計算機も公開されている。

**記事自身の訂正が最も有用な部分。** 以前の数字——アイルランド 1.2 g、ドイツ 2.1 g、テキサス 3.9 g、そして
**10 倍**のテキサス–スウェーデン差——は電網強度の修正（アイルランド約 224、ドイツ約 337、ERCOT 約 333
g CO₂e/kWh）の後に置き換えられ、見出しは 10 倍から **8.5×** になった。自社の見出しを小さくする改訂を公表
するベンダーは、[[fact-check]] のジャンルが持続可能性の主張に働いた例であり、そこではベンチマークより稀である。

**注意点は厳しく、しかし構造的な結論は生き残る：**使っているのは**平均**電網強度で、限界排出率は「スウェーデン
のデータセンターの実測温室効果ガス強度を大きく変え得る」（来月追加予定）。チップ製造の水とエネルギーは除外され、
学習は「自己申告値が ±50% 変動する」ため除外されている。残るのは数字ではなく判断規則である：**低炭素の電網では
内包ハードウェアが支配項になる**ため、「電気がきれいな場所で動かす」は答えの全部ではなくなる——立地は更新周期と
利用率と競合し、清潔な電網で軽く使われるアクセラレータは、汚い電網で高稼働のものに負け得る。測定可能な follow-up
は、事業者がトークンあたりのエネルギーだけでなくトークンあたりの内包排出を公表するかどうかである。

Sources: [Berget AI——リクエストあたり CO₂ プレスリリース](https://berget.ai/en/blog/per-request-co2-press-release) · [berget-ai/co2-calculator（MIT）](https://github.com/berget-ai/co2-calculator)

## 2026-10-25 12:16——ウェハ規模の予算は算術であり、そこで名指しされる指標こそが公表されない指標である

Cerebras は **Kimi K3**——オープンな約 **3T** パラメータモデル——の配備*設計*を **59 枚の WSE-3T ウェハ**にわたって公開した。その算術こそが記事の価値の全体である：

- 各ウェハはオンチップ SRAM を **44 GB** 持ち、重みはオンチップに留まり、ウェハを越えるのは活性だけである——RDMA 上で「ホップあたりおよそ **2 マイクロ秒**」、パイプライン段は異なるリクエストを処理する；
- **線形アテンション層 69** が 1 ウェハあたり 2 層で収まる（**35** 枚、2 × 16 GB = 44 GB 予算のうち 32 GB。線形層はコンテキスト長にかかわらずリクエストあたり小さな固定サイズ状態を保つからである）；
- **dense 層 24** が 1 層 1 枚（**24**）で、残余は **KV キャッシュ**に確保される——よって並行度は計算ではなくそれらウェハ上の KV 空間で上限が決まる；
- 前提は明記されている：平均リクエスト **256k**、重み **4-bit**、KV **8-bit**。

見出しは数兆パラメータモデルで「**1000〜2000+ トークン/秒**」である。

**記事に含まれないもの（一次確認）：** 文字列 **`end-to-end` はページの 184 KB RSC ペイロードに 0 回**しか現れず、実測のエンドツーエンド レイテンシはなく、**トークン/秒/メガワットの数字も無い**——しかも記事自身が、より意味のある指標は「同じ出力生成速度で測ったときの、電力単位あたりの総トークン スループット（例：トークン/秒/メガワット）」だと述べている。脚注には標準的な変動条項（「workload、configuration、日付、テストされるモデルに依存し得る」）が付く。実際に使われている語は「as an **illustrative** example」と「For this illustrative example, we use:」であり、それが弱い方の主張を正直に行ったものである。

**ベンダー一般に名指しする価値のあるパターン：** これは 3 日で 2 つ目の文書であり、*自らの主張を決着させる指標を名指ししながらそれを公表しない*（前者は Prime Intellect の等予算列で、少なくとも数字は印字していた）。ウェハ規模推論に対するメモリ律速の論法は本物の論法である——3T パラメータを 4-bit にすれば重みは約 1.5 TB で、ウェハあたり 44 GB だからウェハ数は強制される——しかし容量計画はベンチマークではなく、欠けている行は記事自身が指名した行である。測定可能な follow-up：誰かが、いずれかのベンダーから、明示された出力速度での数兆パラメータモデルのトークン/秒/MW を公表するかどうか。

→ [[frontier-models]] [[fact-check]]

Sources: [Cerebras — how we deploy trillion-parameter frontier models](https://www.cerebras.ai/blog/how-we-deploy-trillion-parameter-frontier-models-on-cerebras) · [HN 50227356](https://news.ycombinator.com/item?id=50227356)
