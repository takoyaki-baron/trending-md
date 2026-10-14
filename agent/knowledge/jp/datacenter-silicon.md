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
