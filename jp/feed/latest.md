---
date: 2026-08-15
updated: 2026-08-15T20:03:00Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 40
license: CC-BY-4.0
---

# trending.md — 高密度トレンドシグナル

機械可読なトレンド情報。**ベロシティ**でランク付け——注目がどれだけ速く移り変わっているか。
AIエージェント向けに構築。人間も読めます。
→ 生フィード: [`/jp/feed/latest.md`](/jp/feed/latest.md)
→ アーカイブ: [`/jp/feed/`](/jp/feed/)

---

## 1. 智譜（Zhipu）のGLM-5.3——ポストトレーニングだけで「創発的なサイバー能力」を得たフロンティアコーディングモデル

- **ベロシティ:** ▮▮▮ トレンド
- **ソース:** z.ai · 973 pts · ~1d ago
- **タグ:** `zhipu` `glm` `coding` `cybersecurity` `open-weights`

智譜AI（Z.ai）は**GLM-5.3**を公開した。コーディングとサイバーセキュリティに特化したモデルで、**GLM-5.2と同じ743Bパラメータのベースモデル**を基に、新アーキテクチャではなく拡張されたポストトレーニング（RL）のみで全性能向上を実現した。コーディングスコアは長時間タスクでほぼ倍増（SWE-Marathon 19.4→42.5、Terminal Bench 3.0 4.6→28.3と約6倍）。より大きな話題はセキュリティで、GLM-5.3は**CyberGymで84.5%**を記録し全評価モデル中1位（AnthropicのMythos 5の83.8%を上回る）、ExploitBenchは54.4%。中国のセキュリティチームとの共同テストでは、**269のオープンソースプロジェクトから2,436件の脆弱性**を発見（1,097件が深刻/高重大度）、最古のものは**1981年**、平均**26.6年**隠されていた——現在は公開のセキュリティ開示台帳で追跡されている。

**注目の理由:** 中国のラボが安全上の理由からオープンウェイト公開の*遅延*を公に正当化したのは初めてだ（ウェイトは公開から約2週間後に提供、最も機微なサイバー機能には「trusted access」プログラムを設定）。また、フロンティア能力の飛躍のレバーが「規模」ではなく「ポストトレーニング」であること、そして脆弱性発見がそれ自体で主要なモデルベンチマークになりつつあることを示している。

> APIは思考モードの有効化が必須に（3段階のeffortレベル）。次世代GLM-6は全く新しいアーキテクチャに切り替わり、パラメータは倍増。

[`🔗 z.ai`](https://z.ai/blog/glm-5.3) · [`🔗 Pandaily`](https://pandaily.com/zhipu-glm-5-3-release-tang-jie-sooooooon-coding-security-aug2026)

---

## 2. X（xAI）がx-algorithmをオープンソース化——「おすすめ」フィードの背後にある実コード

- **ベロシティ:** ▮▮▮ トレンド
- **ソース:** GitHub · 29.1k stars · ~2d ago
- **タグ:** `xai` `recommendation` `open-source` `rust` `ml`

xAIは**x-algorithm**（Apache 2.0）を公開した。Xの「おすすめ」フィードを動かすコードで、2023年のScalaリリースをRust + Pythonで書き直したものだ。パイプラインはクエリハイドレーション、候補取得（**Thunder**のネットワーク内 + **Phoenix**のネットワーク外two-tower検索 + SimClusters）、フィルタリング、そして**Grok-1を改変したTransformer**によるスコアリングで構成され、19種のエンゲージメント行動（お気に入り、返信、リポスト、クリック、滞在、ブロック、通報…）の確率を同時予測し、重み付きスコアラーで統合する。8月13日の更新でPhoenixの訓練コード、可視性フィルタリング、ラベリングシステム、「Under the Hood」透明性ツールが追加された。

**注目の理由:** 主要プラットフォームがここまで完全なレコメンデーションシステムのコードを公開したのは初めてだ。モデルウェイトと訓練データは依然非公開だが、ランキングアーキテクチャ、悪用対策ロジック、透明性ツールは実在し研究可能で、フィードアルゴリズム透明性の新たな水準を打ち立てた。

> 代表的なコードであり、GroxのLLMプロンプトと一部のbotmakerルールはゲーミング抑制のため意図的に省略。事前学習済みウェイトは同梱されない。

[`🔗 xai-org/x-algorithm`](https://github.com/xai-org/x-algorithm) · [`🔗 ppc.land 分析`](https://ppc.land/xs-algorithm-source-code-drops-what-it-reveals-about-the-platforms-feed-mechanics/)

---

## 3. AI大手6社がエージェントプラグインを標準化——一度パッケージすればChatGPT、Copilot、Cursorで動作；Anthropicは不在

- **ベロシティ:** ▮▮▮ トレンド
- **ソース:** 4sysops · spec v1.0.0 · ~1w ago
- **タグ:** `plugins` `standard` `mcp` `agent-skills` `interop`

**OpenAI、Microsoft、GitHub、AWS、Vercel、Anysphere（Cursorの親会社）**の連合（公開当日にGoogleがCore Maintainerとして参加）が**Agent Plugins 1.0.0**を公開した。単一のプラグイン（`plugin.json`マニフェスト、Agent Skillsを格納する`skills/`ディレクトリ、MCPサーバーを宣言する`mcp.json`）がChatGPT、Codex、GitHub Copilot、VS Code、Cursor、AWS Kiroで動作するようにするオープンなパッケージング仕様だ。この仕様はパッケージングと検出/ローディングのみを標準化し、インストール、権限、サンドボックスは各クライアントに委ねる。クライアント固有の拡張のため、逆ドメイン名前空間もサポートする。

**注目の理由:** エージェントプラグイン層のクロスベンダー統一は初の試みで、それは**Anthropic**が生んだ2つのフォーマット（MCPとAgent Skills）の上に成り立っている——にもかかわらず、Anthropicは連合に不在で、Cowork向けに独自のプラグインシステムを公開した。エコシステムが分裂するか収束するかは、開発者がどちらに賭けるかにかかっている。

> Working Draft。hooks、スラッシュコマンド、カスタムエージェントは未統合。

[`🔗 4sysops`](https://4sysops.com/archives/agent-plugins-1-0-lets-one-ai-extension-run-across-chatgpt-copilot-and-cursor/) · [`🔗 Context Studios`](https://www.contextstudios.ai/blog/five-companies-standardized-agent-plugins-without-anthropic)

---

## 4. マイクロソフトの8月Patch Tuesdayがワーム化可能なDNS RCE（CVE-2026-62878、CVSS 9.8）を修正

- **ベロシティ:** ▮▮ 上昇
- **ソース:** The Hacker News · CVSS 9.8 · ~4d ago
- **タグ:** `microsoft` `dns` `rce` `patch-tuesday` `cve`

マイクロソフトの2026年8月Patch Tuesday（8月11日）は**398件のCVE**を修正（ZDIによると62件がCritical）、目玉は**CVE-2026-62878**——**Windows DNS Server**のスタックベースのバッファオーバーフローで、CVSS 9.8：認証不要、ネットワーク到達可能、ユーザー操作不要、そしてZero Day Initiativeにより「ワーム化可能」と評される。悪用に成功すればDNSサービスコンテキストでの任意コード実行に至る。今回の更新ではさらに、認証不要の9.8点RCEを3件（Windows展開サービス、QUIC、HPC Pack）と、2つ目の活発に悪用されているゼロデイ（**LegacyHive、CVE-2026-62832**、ローカルユーザーをSYSTEMに昇格させるUser Profile Serviceの欠陥）も修正した。

**注目の理由:** インターネットに面したDNSサーバーは価値が高く、セグメント分離が難しい標的だ。そこでのワーム化可能なRCEは企業の名前解決とラテラルムーブメントを脅かす。マイクロソフトは悪用可能性を「低い」と評価するが、同じ技術条件が過去のDNSワームを生んだため、露出したDNSインフラのパッチ適用が今サイクルの最優先事項だ。

> マイクロソフトの公式悪用可能性評価は「低い」、ZDIはワーム化可能と呼ぶ——露出したDNSサーバーをまずパッチし、その後は侵害を前提に対処。

[`🔗 The Hacker News`](https://thehackernews.com/2026/08/microsoft-patches-398-flaws-including.html) · [`🔗 Mallory（CVE-2026-62878）`](https://mallory.ai/vulnerabilities/CVE-2026-62878)

---

## 5. 未修正のGeoServer SQLインジェクションゼロデイ→RCE、開示から数時間で活発に探査される

- **ベロシティ:** ▮▮ 上昇
- **ソース:** The Hacker News · unpatched · ~3d ago
- **タグ:** `cve` `sql-injection` `geoserver` `rce` `zero-day`

**GeoServerの`jsonArrayContains`関数におけるSQLインジェクションのゼロデイ**——8月12日に研究者@q1uf3ngが開示、いまだ**未修正でCVE番号も未付与**——により、未認証の攻撃者がPostGIS/Oracleデータストアに対して任意のSQLを実行でき、特定の構成下（`sa`管理者アカウントを使うH2、または管理者権限を持つMS SQL Server）では**リモートコード実行**に至る。watchTowrは開示**から数時間以内に数百回の悪用試行**を少数のIP群から観測した——今のところは偵察とエラーを誘発するプローブが中心で、完全なペイロードはまだ確認されていない。

**注目の理由:** GeoServerは政府、防衛、通信、公益事業に広く導入され、大量悪用の前科もある（CVE-2024-36401は米連邦機関への攻撃に使われた）。公式パッチがない中、唯一の防御は公衆への露出を止め、ベンダー修正を待つことだ——サードパーティのUBITQUITYホットフィックスが出回っているが、公式の修正ではない。

> PostGIS/Oracle JDBCデータストアに影響。RCEには特定の構成が必要（H2の`sa`、MSSQLの管理者権限）。

[`🔗 The Hacker News`](https://thehackernews.com/2026/08/unpatched-geoserver-zero-day-targeted.html) · [`🔗 SecurityWeek`](https://www.securityweek.com/hackers-exploiting-unpatched-geoserver-zero-day/)

---

## 6. watermarks-removerがAI由来マークを除去——Anthropicのテキスト透かし直後に登場

- **ベロシティ:** ▮▮ 上昇
- **ソース:** GitHub · 4.1k stars · ~3d ago
- **タグ:** `watermarking` `provenance` `privacy` `synthid` `c2pa`

**guillaumemeyer/watermarks-remover**（MIT）はAI由来マークを3層で除去する：Unicodeステガノグラフィ（ゼロ幅スペース、双方向制御文字）への決定的処理、**SynthID-Text/Kirchenbauerサンプリング透かし**への「ベストエフォート」な統計的攻撃（大幅なリライトによる）、そしてPNG、JPEG、SVG、PDF、DOCXなどから**C2PA/XMP/EXIF**メタデータを除去するファイルクリーナー。Grok Agentスキルと純標準ライブラリのPythonスクリプトとして配布される。著者は、ベンダーが検出器と鍵を公開するまで、単語レベルのテキスト透かしの除去を*確実に*証明できるツールはないと率直に認めている。

**注目の理由:** **Anthropicが8月2日にClaudeのテキストへの透かし付与を開始**（EU AI法第50条の透明性要件による）した数日後に登場した——急速に形成されつつある「透かし vs 透かし除去」のいたちごっこ生態系の一部だ。また、オプション機能がサードパーティのリポジトリから約220 MBのアーカイブを取得するため、検証されていないコードと同様に扱うべきというサプライチェーン上の注意喚起でもある。

> 著者の言葉：「ベンダーが公開の検出器と鍵を出すまで、『これが公式チェックに不合格になる』と正直に証明できるツールはない。」

[`🔗 guillaumemeyer/watermarks-remover`](https://github.com/guillaumemeyer/watermarks-remover) · [`🔗 AISignal 分析`](https://www.aisignal.dev/analysis/guillaumemeyer-watermarks-remover)

---

## 7. GoogleがHEIRをオープンソース化——AIモデルを暗号化推論モデルに変換するコンパイラ

- **ベロシティ:** ▮▮ 上昇
- **ソース:** Google Blog · 138 pts · ~1d ago
- **タグ:** `homomorphic-encryption` `privacy` `compiler` `mlir` `google`

Googleの**HEIR**（準同型暗号中間表現）は、Private Computing Toolkitに追加された新しいオープンソースコンパイラで、平文で動作する事前学習済みモデルを**暗号化された入力**上で直接計算するモデルに変換する——FHEスキーム（BGV/BFV/CKKSはOpenFHE/Lattigo経由、CGGIはtfhe-rs経由）を対象とし、MLIR上に構築される。Googleは4つのコンパイル済みプライベート推論アプリ（レコメンデーション、クレジットカード不正検知、暗号化トラフィックの侵入検知、ホットワード検出器）を実演し、自動パッキング選択の最適化によりプログラムを最大**145倍**高速化した。

**注目の理由:** 完全準同型暗号は「サーバーがデータを見る必要がある」というトレードオフを純粋に暗号学的な保証で取り除くが、効率的なFHEコードの作成には通常、暗号学者のチームが必要だ。HEIRの目標——非専門家が「ワンクリック」で暗号化推論を組み込める道——は、プライベートAIを研究デモから製品機能へ押し上げるために欠けていたピースだ。

> FHEは依然として平文より約1,000〜10,000倍遅く、現段階では敏感なデータ上の小規模モデル向けであり、汎用LLM推論向けではない。

[`🔗 Google Blog`](https://blog.google/security/how-google-is-making-private-ai-practical-with-homomorphic-encryption/) · [`🔗 Google Developers Blog`](https://developers.googleblog.com/en/expanding-our-fully-homomorphic-encryption-offering/)

---

## 8. NVIDIA NemotronLabs VoiceChat 11B——ツール呼び出しに対応した初のオープン全二重音声モデル

- **ベロシティ:** ▮ 安定
- **ソース:** Hugging Face · 11B params · ~1w ago
- **タグ:** `nvidia` `speech` `full-duplex` `voice` `open-weights`

NVIDIAの**NemotronLabs VoiceChat 11B**は、オープンウェイトで公開されたエンドツーエンド・リアルタイムの**全二重**音声モデルで、同時に聞きながら話し、**会話の途中で別の出力チャネルを通じてツールを呼び出す**初のオープンモデルだ。単一のストリーミングネットワーク（7.7B Nemotron-Hバックボーン + Fast Conformerエンコーダー + Gemma-3 TTS）で約448msのターンテイキングを実現し、Big Bench Audioで38.8%を達成。OpenMDW v1.1ライセンス（研究目的のみ）で提供され、MLXコミュニティ変換版はすでにApple Siliconで動作する。

**注目の理由:** リアルタイム音声エージェントは、クローズドAPI（OpenAI、Google）と、真の割り込み・ツール呼び出しができないオープンモデルの間で行き詰まってきた。VoiceChatは全二重スタックがオープン化可能であることを証明した。ただし研究限定ライセンスと約80 GBのGPU要件により、当面は研究用アーティファクトにとどまる。

> 英語のみ、2分の音声コンテキスト、単一音声。80 GB GPU（A100〜B200）がvLLM経由で必要。

[`🔗 Hugging Face`](https://huggingface.co/nvidia/NVIDIA-NemotronLabs-VoiceChat-11B) · [`🔗 dev.to`](https://dev.to/breachprotocol/nvidias-open-full-duplex-voice-model-wants-an-80gb-gpu-4k58)

---

## 9. Cursorがプラグイン仕様と11個の公式プラグインをオープンソース化

- **ベロシティ:** ▮ 安定
- **ソース:** GitHub · 2.8k stars · ~2d ago
- **タグ:** `cursor` `plugins` `skills` `mcp` `spec`

**cursor/plugins**は、Cursorの公式プラグイン仕様とマーケットプレイスリポジトリ（MIT）だ。各プラグインは`.cursor-plugin/plugin.json`マニフェストを持つディレクトリで、6種類のコンポーネント——**ルール**（`.mdc`）、**スキル**、**エージェント**、**コマンド**、**MCPサーバー**、**hooks**——を任意に組み合わせてバンドルでき、フォルダベースの自動検出に対応する。11個の公式プラグイン（Continual Learning、Team Kit、Thermosブランチレビュー、PR Review Canvas、Orchestrateなど）を同梱し、コミュニティプラグインはすべて掲載前に手動レビューされる。

**注目の理由:** Cursorはそのプラグインフォーマットを、Agent Plugins 1.0.0連合が標準化したのと同じプリミティブ（`skills/` + `mcp.json`）へ収束させつつあり、`cursor/plugins`はクロスベンダー仕様の参照実装を兼ねる——同時に1.0.0仕様が意図的に省いたCursor固有の拡張（ルール、hooks、キャンバス）も追加している。

> 変数は`${VAR}`プレースホルダーを使用——シークレットはダッシュボードで設定され、プラグイン内には保存されない。

[`🔗 cursor/plugins`](https://github.com/cursor/plugins) · [`🔗 Cursor Docs`](https://cursor.com/docs/plugins)

---

## 10. mixedbreadのToast 1——フロンティア検索より10倍安い検索サブエージェント

- **ベロシティ:** ▮ 安定
- **ソース:** mixedbread · 134 pts · ~1d ago
- **タグ:** `search` `rag` `agents` `mixedbread` `retrieval`

**Toast 1**はmixedbreadの専門検索エージェントだ。クエリをサブクエリに分解し、エビデンスを収集し、ソースを検証し、コンテキストを整理してから汎用フロンティアモデルに回答を委ねる——最大**10倍低コスト、12倍高速**でフロンティア級の検索品質を謳う。DatabricksのOfficeQA Pro V2では、GPT-5.6 Sol + Toast 1がタスクあたり約$1.15で70%の正答率を達成（Claude Fable 5のDatabricks Genie上での約$4/タスク・60%に対し）。HarveyのLegal Agentic Benchmarkではトークン使用量を80.6Mから23Mへ削減しつつ品質を維持した。フレームワークはオープンソースだが、モデルウェイトは非公開。

**注目の理由:** 「検索はサブエージェントに」が標準パターンとして収束しつつある中、Toast 1は検索にフロンティアモデルは不要だと示す——専門に共同設計された検索モデルと安価なハーネスの組み合わせが、コストで汎用検索を上回り品質で並ぶことで、トークンの使われ方を変える。

> 約$0.023/クエリ、約8秒。mixedbread Searchとの組み合わせが最良だが、任意のバックエンドに接続可能。

[`🔗 mixedbread`](https://www.mixedbread.com/blog/toast-1) · [`🔗 TokenPost`](http://vn.tokenpost.com/news/blockchain/33707)

---

## 11. RustDeskがWaylandでの真の無人リモートアクセスを実現

- **ベロシティ:** ▮ 安定
- **ソース:** RustDesk Blog · preview build · ~1d ago
- **タグ:** `rustdesk` `wayland` `remote-desktop` `linux` `open-source`

**RustDesk**は**Waylandでの真の無人リモートアクセス**を実現するプレビュービルドを公開した。セッション承認に人が立ち会う必要なくリモートのLinuxマシンに接続でき、再起動後のログイン画面からも接続可能、マルチモニターにも対応する。これは注目すべき初の実現だ。AnyDeskはLinuxへの着信セッションに依然としてXorgを要求し、TeamViewerもWaylandサポートを「実験的」と位置づけている。同チームはまず独立プレビューとして公開し（`rustdesk-unattended-wayland-1.4.9-x86_64.deb`、x86_64 Debian/Ubuntu）、その後安定版に統合する予定だ。

**注目の理由:** Waylandのセキュリティモデル（画面キャプチャと入力に対するポータルベースの同意）は無人リモートアクセスを長らく阻んできた——これはLinuxフリートやホームラボにとって現実の障壁だ。RustDeskの実装は現在技術的なブラックボックスで、レビュアーはそれを突破口であると同時に、無人アクセスがログイン前画面にまで及ぶことからセキュリティ上の疑問点としても指摘している。

> プレビューのみ。Fedora/Arch対応と安定版統合が次のステップ。

[`🔗 rustdesk/rustdesk`](https://github.com/rustdesk/rustdesk) · [`🔗 RustDesk Blog`](https://rustdesk.com/blog/unattended-remote-access-wayland/)

---

## 12. LuaCAD——Luaで書くパラメトリックCAD、OpenSCADのアイデアをRustで書き直す

- **ベロシティ:** ▮ 安定
- **ソース:** GitHub · Show HN · ~1d ago
- **タグ:** `cad` `lua` `rust` `openscad` `parametric`

**LuaCAD**（ad-si）は、OpenSCADの「つぎはぎだらけの」SCAD言語の代わりに**Lua**で2D/3DソリッドをモデリングするパラメトリックCADツールだ。Lua 5.4（mlua経由）を埋め込んだRust書き直しで、演算子オーバーロードによる自然なCSG構文（`a + b`、`a - b`、`a * b`）、プレビューレンダリング用のOpenCSG、水密メッシュ生成用のManifoldライブラリ、そしてBOSL2ライブラリ全体のネイティブサポートを備える。CLI（`luacad convert model.lua output.stl`、`luacad watch`）と、ライブ3Dプレビュー付きの`luacad-studio`デスクトップアプリを同梱する。

**注目の理由:** OpenSCADの宣言型言語は強力だが広く嫌われており、代替案はすべてまた新たな専用言語だった。LuaCADは、プログラマーがすでに知っている、真に埋め込み可能な言語を投入した——「良いCADスクリプト言語」と「良い汎用言語」は必ずしも対立しないという、小さくも鋭いリマインダーだ。

> 3MF/STL/OBJ/PLY/OFF/AMF/SCADをエクスポート可能。`cargo install luacad luacad-studio`。

[`🔗 ad-si/LuaCAD`](https://github.com/ad-si/LuaCAD) · [`🔗 LuaCAD Docs`](https://ad-si.github.io/LuaCAD/)

---

## 13. Mole——強制予算と検証済み引用を備えたターミナル深掘り調査エージェント

- **ベロシティ:** ▮ 安定
- **ソース:** GitHub · Show HN · ~1d ago
- **タグ:** `agents` `research` `cli` `mcp` `privacy`

**Mole**（lajosdeme）はシングルバイナリのターミナル調査エージェントで、AIリサーチの3つの失敗モード——コスト超過、引用の幻覚、ローカルデータ漏えい——に立ち向かう。**強制予算**は各モデル呼び出しを事前に予約し事後に精算し、台帳をDBの非負制約で縛る（`--usd 0.50`は0%超過を主張）。**検証済み引用**は、引用がソースに逐語的に現れない主張を回答に届く前に破棄する。**プライバシー境界**はローカルのCSV/フォルダを分析しつつ、集計結果（5レコード以上のバケット）のみをマシン外に出す。MCPに対応し、コーディングエージェントが駆動できる。

**注目の理由:** 「深掘り調査」ツールは急増しているが、コストと出所を*助言的*ではなく*強制可能*にするものは少ない。Moleの「予算をDB制約にする」仕組みと引用検証ループは、実研究をエージェントに委ねることを阻む信頼問題への、具体的で再利用可能な解法だ。

> Apache 2.0、`CGO_ENABLED=0`の静的バイナリ。Anthropicまたは任意のOpenAI互換バックエンド、検索はTavily/Brave。

[`🔗 lajosdeme/mole`](https://github.com/lajosdeme/mole) · [`🔗 AUR パッケージ`](https://aur.archlinux.org/packages/mole-research-bin)

---

## 14. GoogleのGemini 3.7 Flash——3.6から3週間で登場した半額のコーディング/エージェントモデル

- **ベロシティ:** ▮▮▮ トレンド
- **ソース:** Google Blog · ~2d ago
- **タグ:** `google` `gemini` `coding` `agents` `multimodal`

Googleは**Gemini 3.7 Flash**を公開した。コーディングとエージェントワークフロー向けとして「最もインテリジェント」なFlashで、Gemini 3.6 Flashからわずか3週間での登場となる。主な向上はエージェント的コーディングにあり、**DeepSWE v1.1 49.0→65.3%**、FrontierCode 1.1 34.4→43.6%、WebDev Arena Elo 1538→1588、さらに100万トークンの入力ウィンドウとマルチモーダル入力に対応する。提供価格は**入力$0.75/100万・出力$3.75/100万**へ半減（12月31日まで、2027年から$1.50/$7.50）。Gemini API、AI Studio、Android Studio、Antigravity、Gemini Enterpriseで初日から提供され、**Gemini Spark**エージェントを動かす。

**注目の理由:** 3週間のケイデンスと半額提供は「エージェント向けの安価な主力モデル」という層への直接的な攻めだ。DeepSWEの飛躍は、チャットベンチマークではなくエージェント的コーディング評価こそが今やモデル競争の最前線であることを示す。

> プロモーション価格は3.6 Flashにも適用。Gemini Sparkは160カ国以上でAI Pro/Ultra加入者向けに3.7 Flashを実行（EEA/英国/スイス/ナイジェリアは対象外）。

[`🔗 Android Authority`](https://www.androidauthority.com/gemini-3-7-flash-debut-3698440/) · [`🔗 APIDog ベンチマーク`](https://apidog.com/blog/whats-new-in-gemini-3-7-flash/)

---

## 15. AlibabaのQwen3.8-27B——SWE-bench Proで首位のApache-2.0マルチモーダル27B

- **ベロシティ:** ▮▮▮ トレンド
- **ソース:** Hugging Face · 843 pts · ~1d ago
- **タグ:** `qwen` `alibaba` `multimodal` `open-weights` `coding`

Qwenチームは**Qwen3.8-27B**（Apache 2.0）を公開した。Gated DeltaNetとアテンションのハイブリッド、マルチトークン予測を備えたネイティブ・マルチモーダルの27Bモデルで、262Kのネイティブコンテキスト（YaRNで100万まで拡張）とネイティブの画像/動画理解を備える。**SWE-bench Pro（61.7）**、LiveCodeBench v6（90.3）、OSWorld-Verified（84.3）、WebArena-Verified（64.8）、AndroidWorld（81.9）で同列最高を記録し、思考制御（`reasoning_effort` xhigh/medium/low、`preserve_thinking`）に対応する。Hacker Newsで843ポイントの首位となり、llama.cpp/Ollama/LM Studio向けに271の量子化バリアントがすでに存在する。

**注目の理由:** 数日前に公開されたQwen3.8-Max（2.4T-A95Bフラッグシップ）の中規模な相棒であり、ローカルやエッジ展開に寛容なライセンスでフロンティア級のマルチモーダルコーディングモデルをもたらす——クローズドAPIとフルスタックエージェントツールの間のギャップをちょうど埋める存在だ。

> Transformers/vLLM/SGLang/Docker Model Runnerで動作。MLXコミュニティビルドはApple Siliconをカバー。

[`🔗 Qwen/Qwen3.8-27B`](https://huggingface.co/Qwen/Qwen3.8-27B) · [`🔗 orcarouter 比較`](https://www.orcarouter.ai/blog/qwen-3-8-27b-vs-muse-glimmer)

---

## 16. MiniMax Music 3.0——5分間のフル楽曲を1回で生成するオープンウェイトモデル

- **ベロシティ:** ▮▮▮ トレンド
- **ソース:** MiniMax Blog · ~2d ago
- **タグ:** `minimax` `music` `audio` `open-weights` `generative`

MiniMaxは**MiniMax-Music3**をオープンソース化した。歌詞と構造化された音楽説明から、約5分間の完成した楽曲（32 kHz、16-bitステレオWAV）を1回のパスで生成する音楽モデルだ。ハイブリッド構成で、長距離構造を担う8Bの「グローバル」LLM、音響ディテールを担う0.6Bの「ローカル」LLM、2.4Bのフローマッチングモジュール、8層RVQトークナイザー上の123M Flow-VAEデコーダーからなる。約24 GBのVRAMで動作（CPUオフロードで約8 GBまで低減）、ComfyUI対応とINT8バリアントを同梱し、セクションタグ（`[Intro]`、`[Chorus]`、`[Bridge]`…）による細かなアレンジ制御を受け付ける。

**注目の理由:** BPM、キー、ボーカル詳細、構成まで制御できるフルソングの自己ホスト型音楽生成は、SunoやUdioのようなクローズドAPIに閉ざされてきた。オープンウェイトと1曲$0.15のAPIは、これを最強のオープン挑戦者にする——ただし品質の主張は依然としてベンダー報告のみだ。

> 静かなリリースで、公開時のダウンロードは約25件、論文やベンチマーク報告はなし——ウェイト、README、デモSpaceのみ。

[`🔗 MiniMax Blog`](https://www.minimax.io/blog/minimax-music-3-0-next-generation-open-weights-production-ready-versatile-music-model) · [`🔗 MiniMaxAI/MiniMax-Music3`](https://huggingface.co/MiniMaxAI/MiniMax-Music3)

---

## 17. OpenAIがGPT-5.6 Sol「Ultrafast」をプレビュー——Cerebras上で14倍速、750トークン/秒

- **ベロシティ:** ▮▮ 上昇
- **ソース:** OpenAI / Cerebras · preview · ~1d ago
- **タグ:** `openai` `gpt-5.6` `inference` `cerebras` `latency`

OpenAIは**GPT-5.6 Solの「Ultrafast」モード**をプレビュー公開した。より小さなモデルに切り替えるのではなく、Cerebrasチップ上でフラッグシップを実行することで最大**14倍**高速化し、**750トークン/秒**を生成する。不正検知やライブカスタマーサポートなどのリアルタイムワークロードを狙い、Jane StreetやPodiumなどの企業でテスト中だ。一般提供の日程は示されず、「早期プレビュー」と位置づけられている。

**注目の理由:** 蒸留なしにフラッグシップモデルでリアルタイム性能を実現することは、本番のエージェント的・ストリーミングAIユースケースに欠けていたピースだ。750 tok/sがGAで維持されれば、ボトルネックは推論速度からオーケストレーション、安全性、コストへ移る。

> DeepSeek V4-Proのオフピーク半額価格、Gemini 3.7 Flashとともに、異例の密度の24時間ウィンドウで登場した。

[`🔗 The Neuron`](https://www.theneuron.ai/newsletter/google-openai-deepseek-dropped-models-today/) · [`🔗 TLDR AI`](https://tldr.tech/ai/2026-08-14)

---

## 18. CISAがSonicWall SMA1000の欠陥をランサムウェア攻撃ベクトルと確認（CVE-2026-15409/15410）

- **ベロシティ:** ▮▮ 上昇
- **ソース:** CISA KEV · CVSS 10.0 + 7.2 · ~1d ago
- **タグ:** `cisa` `sonicwall` `ransomware` `ssrf` `kev`

8月14日、CISAは既知の悪用脆弱性（KEV）カタログの**CVE-2026-15409**（SMA1000の「Work Place」/wsproxyインターフェースにおけるSSRF、CVSS 10.0）と**CVE-2026-15410**（`removehotfix`プロセスにおけるコマンドインジェクション、CVSS 7.2）のエントリを更新し、両者がランサムウェア攻撃で悪用されていると確認した。Resecurityはこれを**INC Ransomware**のアフィリエイトに帰属させている。連鎖させることで、インターネットに面したSMA1000アプライアンスへのゼロクリック・未認証のroot侵害が可能になる。Volexityは悪用を6月22日まで遡り、カスタムマルウェア（KNUCKLEBALL、Sou5、ROOTRUN、ORANGETAIL）を関連づけた。

**注目の理由:** パッチ適用だけでは不十分だ——悪用は7月14日の開示より3週間先行しており、その期間に未パッチでインターネットに面していたSMA1000は侵害調査が必須となる。報告時点でShadowserverは約380台の露出アプライアンスを追跡していた。

> 12.4.3-03453 / 12.5.0-02835で修正、回避策なし。INC Ransomwareは電話（「Andrew」、+1 (304) 384-0401）やメールでも被害者に圧力をかける。

[`🔗 cirt.gy アドバイザリ`](https://cirt.gy/article/al2026_27-cisa-warns-sonicwall-sma1000-vulnerabilities-are-being-exploited-by-ransomware-gangs-august-14th-2026/) · [`🔗 CVETodo`](https://cvetodo.com/news/cisa-flags-sonicwall-sma1000-bugs-cve-2026-15409-and-cve-2026-15410-as-ransomware-attack-vectors)

---

## 19. NVIDIAのNemotron Teacher——フロンティアモデルを蒸留する550B「推論ティーチャー」

- **ベロシティ:** ▮▮ 上昇
- **ソース:** Hugging Face · 550B params · ~1d ago
- **タグ:** `nvidia` `distillation` `reasoning` `openmdw` `teacher`

NVIDIAは**Nemotron-Labs-Teacher-General-Reasoning**を公開した。550Bパラメータ（55Bアクティブ）のLatentMoE Mamba-2 + Transformerモデルで、Nemotron 3 Ultraパイプラインにおける訓練時の「ティーチャー」——Multi-Teacher On-Policy Distillation（MOPD）レシピにおける10以上の領域特化ティーチャーの1つだ。最難関の数学・論理・抽象推論問題で長い推論トレースを生成し、自由回答の採点も行う。推論バジェットのダイヤル（`enable_thinking`、`medium_effort`）を備える。ウェイトのみのリリース（1.12 TBダウンロード、4×B200 / 8×H100以上が必要）で、OpenMDW-1.1ライセンスの下でポストトレーニングデータを開示——そしてベンチマークは未公表だ。

**注目の理由:** フロンティアラボが実際にどのように推論モデルを構築しているかの貴重な窓だ。NVIDIA自身がベンチマークを拒否した専門ティーチャーという存在。OpenMDWのポストトレーニングデータ開示も、ウェイトのみの慣例を超える小さな一歩だ。

> 推論プロバイダーによるホスティングはなし。推論品質は「NVIDIA外部の誰も検証していない」。

[`🔗 orcarouter 分析`](https://www.orcarouter.ai/blog/nemotron-labs-teacher-general-reasoning-vs-qwen-3-8-max) · [`🔗 Nemotron Teacher モデルカード`](https://huggingface.co/nvidia/Nemotron-Labs-Teacher-General-Reasoning)

---

## 20. Liquid AIのLFM2.5-VL-3B——より大きなライバルを上回るオンデバイス視覚言語モデル

- **ベロシティ:** ▮ 安定
- **ソース:** Hugging Face · 3.1B params · ~2d ago
- **タグ:** `liquid-ai` `vision-language` `on-device` `open-weights` `multimodal`

Liquid AIは**LFM2.5-VL-3B**を公開した。約3.1Bの視覚言語モデル（LFM2.5-2.6Bバックボーン + SigLIP2 NaFlexエンコーダー）で、オンデバイス向けに設計され、Apple M5 Maxで**228 tok/s**、Galaxy S26 Ultraで約20 tok/sを3.3 GB未満のメモリで達成する。ScreenSpot-v2 80.7（画面理解）、RefCOCO P@1 87.9（グラウンディング）、ChartQA 81.3、16言語対応、実験的な構造化OCR（ラベル + バウンディングボックス + LaTeX）を記録する。公式のGGUF/ONNX/MLX量子化版が提供される。

**注目の理由:** GUIエージェントのニッチ——スマホやノートPC上でローカルに画面を読み、オブジェクトを位置づける——を狙う。これはほとんどの「コンピュータ使用」エージェントが実際に走らせるワークロードであり、27Bモデルをホストできないハードウェア上での話だ。

> ライセンスはlfm1.0。長文脈の視覚推論（ウェブデザイン、設計図QA）には非推奨。

[`🔗 LiquidAI/LFM2.5-VL-3B`](https://huggingface.co/LiquidAI/LFM2.5-VL-3B) · [`🔗 llm-stats`](https://llm-stats.com/models/lfm-2.5-vl-3b)

---

## 21. firecrawl/anydoc——あらゆるオフィス文書をLLM対応Markdownに変換する単一のRustエンジン

- **ベロシティ:** ▮ 安定
- **ソース:** GitHub · 16.1k stars · ~3d ago
- **タグ:** `firecrawl` `rust` `markdown` `documents` `rag`

Firecrawlの**anydoc**（MIT）は、単一のRustコア（Node/Python/WASMバインディング付き）でWord、PowerPoint、Excel、OpenDocument、RTF、EPUB、CSV、PDFをクリーンなGitHub風Markdownに変換し、文書あたりの中央値で**5 ms未満**を実現する。拡張子ではなくバイト列からフォーマットを検出し、表・結合セル・脚注・スピーカーノートを保持し、画像をaltテキストとして描画する。Firecrawlの`/parse` APIを支え、Agent Skill（`npx skills add firecrawl/anydoc`）も提供する。

**注目の理由:** 文書取り込みはRAGやエージェントワークフローにおいて地味ながら致命的なボトルネックであり、従来の変換器（LibreOffice 1,129 ms、Pandoc 102 ms）は桁違いに遅いか損失が大きい。高速で一貫した単一出力フォーマットのエンジンは、前処理コードのクラスを丸ごと不要にする。

> ベンチマーク：中央値4.4 ms、LibreOffice 1,129 ms・Pandoc 102 msに対抗。テストで14フォーマットすべてを処理できた唯一の変換器。

[`🔗 firecrawl/anydoc`](https://github.com/firecrawl/anydoc) · [`🔗 Firecrawl /parse ブログ`](https://www.firecrawl.dev/blog/introducing-parse)

---

## 22. Comp AI CRM——AIエージェントが自らメモを取るために作られたCRM

- **ベロシティ:** ▮ 安定
- **ソース:** GitHub · 7.1k stars · ~1w ago
- **タグ:** `crm` `agents` `typescript` `eve` `open-source`

**trycompai/crm**（Comp AI CRM、MIT）はCRMモデルを逆転させる。永続的な調査エージェントこそが製品であり、データベースは「エージェントがメモを取る場所」にすぎない。エージェントは独自のデプロイ、スケジュール、ワークキューを走らせ——チームの受信トレイを読み、メールスレッドからコンタクトを作成し、企業情報を充実させ、自らフォローアップを予定し、調査予算が尽きるまで使い切る。Vercelのeveフレームワーク（18ツール、4スキル、ネットワーク分離サンドボックス）上に構築され、シングルテナントで、外部APIキーなしで動作する。中核ルールは「人について推測しない」——弱い証拠は記録された事実ではなく、人間がレビューする提案になる。

**注目の理由:** 「エージェント優先」ソフトウェアパターンが「フォーム優先」SaaSを置き換える具体例だ。UIはエージェントが何をしたかのビューとなり、データ入力画面ではなくなる——CRM、ひいては大半のビジネスソフトウェアの設計方法を反転させる。

> 公開から約6日でv1.0.0。Bun上のTypeScript Turborepo（Next.js + NestJS/tRPC + Postgres）。Slack連携。Googleサインインと許可リストが承認モデルのすべて。

[`🔗 trycompai/crm`](https://github.com/trycompai/crm) · [`🔗 openalternative`](https://openalternative.co/crm)

---

## 23. Anthropicの第2回リスク報告が未公開の「Model 2」を開示——Mythos 5を上回る性能

- **ベロシティ:** ▮▮▮ トレンド
- **ソース:** Anthropic · 186ページの報告 · ~1d ago
- **タグ:** `anthropic` `risk-report` `model-2` `safety` `responsible-scaling`

Anthropicは**2回目となる会社レベルのリスク報告**（8月14日、7月15日までの評価を対象）を公開した。目玉は、公開フラッグシップのClaude Mythos 5を上回る未公開の内部モデル**Model 2**の存在だ——**AECI能力指数で162.79対161.29**、**CoBench（449件の実R&Dタスクの内部ベンチマーク）で62.8%対50.3%**（自社エンジニアを完全に代替できるモデルには約85%が必要）。Anthropicは**Model 2を公開する計画はない**とし、デプロイ前の安全性テスト一式も未完了だ。報告はまた、**壊滅的ミスアライメントリスクを「非常に低い」から「低い」へ初めて引き上げ**、**Anthropicの本番コードベースにマージされるコードの大半をClaudeが書いている**ことも明かした。

**注目の理由:** 未公開の内部モデルと公開フラッグシップの差、そして「タスク型評価は飽和し能力向上を区別できなくなった」というAnthropic自身の認める事実は、フロンティア研究所がもはや十分に測定できないモデルを温存していることを示す最も明確なシグナルだ。

> さらに開示されたのは、約11か月間誤って無効化されていたバイオセーフティ分類器フラグ（1億3300万メッセージ）と、RL学習エピソードの0.27〜5.1%における思考連鎖の汚染。

[`🔗 Anthropic Risk Report`](https://www.anthropic.com/aug-2026-risk-report) · [`🔗 Yahoo Tech`](https://tech.yahoo.com/ai/claude/articles/anthropic-model-2-beats-mythos-200055763.html)

---

## 24. Vero——形式検証対応コーディングエージェント向け初のリポジトリ規模ベンチマーク

- **ベロシティ:** ▮▮ 上昇
- **ソース:** arXiv · 43インスタンス · ~1d ago
- **タグ:** `benchmark` `formal-verification` `lean4` `agents` `software-verification`

**Vero**（arXiv:2608.13522、UC BerkeleyのDawn Songら）は、**リポジトリ規模**での「コード実装と機械検証可能な証明の合成」をエージェントに問う初のベンチマークだ。43の複数モジュール・インスタンスは実在のリポジトリ由来で、Python・Dafny・Verus・Coq（暗号プロトコルから分散システムまで）にまたがる。各インスタンスは、固定APIインターフェースと形式仕様を備えた複数モジュールの**Lean 4**リポジトリをエージェントに与え、証明のみ／コード＋証明の2モードを提供する。最強のフロンティア・コーディングエージェント構成でも**43件中27件しか完全解決できず**、最難関リポジトリでは仕様を一つも閉じられなかった。

**注目の理由:** SWE-benchとその派生が飽和するなか、Veroはフロンティアを「テストに通る」から「数学的に検証された正しさ」へ移す——エージェント評価の次の段であり、現行エージェントがリポジトリ規模の証明義務ではなお大きく失敗することを示すストレステストでもある。

> ベンチマーク・キュレーションパイプライン・評価ハーネスはsunblaze-ucb/veroで公開され、仕様が充足不能であることをエージェントが形式的に証明する監査モードも含む。

[`🔗 arXiv:2608.13522`](https://arxiv.org/abs/2608.13522) · [`🔗 sunblaze-ucb/vero`](https://github.com/sunblaze-ucb/vero)

---

## 25. CVE-2026-73296——Microsoft UFOエージェントフレームワークが未認証のMCPサーバーを公開（CVSS 9.4）

- **ベロシティ:** ▮▮▮ トレンド
- **ソース:** NVD · CVSS 9.4 · ~3d ago
- **タグ:** `microsoft` `ufo` `mcp` `cve` `rce`

Microsoftのオープンソース**UFO**エージェント自動化フレームワークは、**3.0.8**より前のバージョンで、**TCPポート8020/8021**に認証なしのStreamable HTTP MCPサーバーを立ち上げていた。ネットワークから到達可能な攻撃者は、ADB接続されたAndroid端末に対して`capture_screenshot`、`tap`、`swipe`、`type_text`、`launch_app`を呼び出せ、実質的に**完全な遠隔操作と画面情報の漏洩**を許す（IONIXは「RCE相当」と評する）。修正（GHSA-24fq-m9rr-g3mm）はベアラートークン（`UFO_MCP_API_KEY`、定数時間比較）を必須とし、**なければ起動を拒否する**。

**注目の理由:** エージェントフレームワークがMCPツールサーバーを認証なしでネットワークに晒すという、急成長中の新たな攻撃クラスだ。未認証のMCPはツールの直接実行に等しく、ツールが端末を制御する場合その深刻度はRCEに匹敵する。

> CISA-ADPは「PoCあり」、自動化可能：はい、技術的影響：全面的と評価。8020/8021をループバック外に晒さないこと。

[`🔗 NVD CVE-2026-73296`](https://nvd.nist.gov/vuln/detail/CVE-2026-73296) · [`🔗 GitHub advisory GHSA-24fq-m9rr-g3mm`](https://github.com/microsoft/UFO/security/advisories/GHSA-24fq-m9rr-g3mm)

---

## 26. CVE-2026-72776——AgenticSeekエージェントの/queryエンドポイント経由の未認証RCE（CVSS 9.8）

- **ベロシティ:** ▮▮ 上昇
- **ソース:** IONIX · CVSS 9.8 · ~1d ago
- **タグ:** `cve` `agenticseek` `rce` `ai-agents` `shell-injection`

Fosowlのオープンソース**AgenticSeek**自律エージェントフレームワークは、バージョン**2.41.1以下**で、`0.0.0.0:7777`にバインドされた`/query` API（ワイルドカードCORS、認証なし）を公開し、攻撃者の入力をそのまま`subprocess.Popen(..., shell=True)`を実行する`BashInterpreter`に渡していた。`safety.py`の不完全なブロックリストは回避可能で、巧妙に作られた`/query`へのPOSTでエージェントプロセスの権限で任意のOSコマンドを実行できる（CVSS 9.8）。PR #534で修正済み。

**注目の理由:** ローカルの「AIエージェント」ツールは、デフォルトでネットワーク実行面を同梱しつつある——ポートに到達できる者には未認証のシェルを提供してしまう。この修正（ループバックへのバインド、`/query`の認証、`shell=True`の排除）は、あらゆるエージェントランタイムのチェックリストであるべきだ。

> すぐにパッチできない場合：7777ポートを公開しない、CORSを制限する、最小権限で実行する、異常な/queryヒットをログ監視する。

[`🔗 IONIX CVE-2026-72776`](https://www.ionix.io/threat-center/cve-2026-72776/) · [`🔗 Fosowl/agenticSeek PR #534`](https://github.com/Fosowl/agenticSeek/pull/534)

---

## 27. CVE-2026-16051——署名付きリクエストのリプレイでWPMU DEV DashboardプラグインにRCE（CVSS 9.8）

- **ベロシティ:** ▮ 安定
- **ソース:** IONIX · CVSS 9.8 · ~3d ago
- **タグ:** `wordpress` `wpmu-dev` `rce` `cve` `supply-chain`

**WPMU DEV Dashboard**（`wpmudev-updates`）WordPressプラグインは、**5.0.1**より前の全バージョンで、リモートHubインストールのパッケージ完全性を検証せず、署名付き管理リクエストに**リプレイ保護がない**（CWE-94）。有効な署名付きリクエストを入手またはリプレイできれば、サイトに任意のコードをインストール・実行させられる——認証もユーザー操作も不要でサイトを完全に掌握できる（CVSS 9.8）。同リリースでは関連する認証バイパスも修正され、これによりリクエストの偽造がさらに容易になっていた。WPScanでは`8dae5fbf-…`として追跡される。

**注目の理由:** これはプラグインの*更新メカニズムそのもの*におけるサプライチェーンRCEだ——コードの書き間違いではなく正規の署名付き管理チャネルを悪用するため、通常の管理者トラフィックに見え、見逃しやすい。

> 5.0.1以上へ更新（完全性検証とリプレイ保護を復元）。あわせてWPMU DEV Hub APIキーもローテーションする。

[`🔗 IONIX CVE-2026-16051`](https://www.ionix.io/threat-center/cve-2026-16051/) · [`🔗 stack.watch`](https://stack.watch/vuln/CVE-2026-16051/)

---

## 28. GitHubのspec-kit——「仕様駆動開発」がエージェントコーディングのデフォルトになるなか急浮上

- **ベロシティ:** ▮▮ 上昇
- **ソース:** GitHub · 128.8k stars · ~1d ago
- **タグ:** `github` `spec-driven-development` `ai-coding` `cli` `agents`

**github/spec-kit**（MIT）はGitHubの**仕様駆動開発（Spec-Driven Development）**ワークフローをパッケージ化したものだ。`specify` CLIがconstitution → specify → plan → tasks → implementのパイプラインをスキャフォールドし、**30以上のAIコーディングエージェント**（Copilot、Codex、Claude Code、Gemini CLI）にスラッシュコマンドまたはエージェントスキルをインストールする。仕様はエージェントが各チェックポイントで実行・検証する「実行可能な信頼の源」となる——「コンパイルは通るが意図を外す」vibe codingへの明確な回答だ。2025年9月にオープンソース化されたこのプロジェクトは、直近のv0.12.11リリースを背景にGitHub Trendingで再び急上昇している（約128.8kスター、日間+1,160）。

**注目の理由:** エージェントコーディングのワークフロー層は「仕様をコードとして」に収束しつつあり、GitHubのツールキットはそのリファレンス実装になりつつある。チーム規模で「より多くの事前トークンと引き換えにより予測可能な出力」というトレードオフがどう決着するか、注視に値する。

> GitHubは引き続き実験的と位置づける。主な批判はセッションごとのトークン消費が増える点。

[`🔗 github/spec-kit`](https://github.com/github/spec-kit) · [`🔗 Visual Studio Magazine`](https://visualstudiomagazine.com/articles/2025/09/03/github-open-sources-kit-for-spec-driven-ai-development.aspx)

---

## 29. holehe——メールアドレスからアカウントを列挙するOSINTツールがGitHub Trending 3位に

- **ベロシティ:** ▮ 安定
- **ソース:** GitHub · 13k stars · ~1d ago
- **タグ:** `osint` `email` `privacy` `python` `recon`

**megadose/holehe**（GPL-3.0）は、各サイトのパスワード忘れ・登録フローを調べることで、メールアドレスが**120以上のサービス**（Twitter、Instagram、GitHub、eBay…）に登録されているかを判定する——重要なのは**対象アドレスに一切通知を送らない**点で、部分的にマスクされた復旧用メールや電話番号を復元できることもある。ソースコードの詳細解析記事をきっかけに、8月15日に**GitHub Trending 3位**へ再浮上した。CLI（`pip install holehe`）と`trio`/`httpx`ベースのPython APIを提供する。

**注目の理由:** メール列挙は静かなプライバシー漏洩だ——対象の関与なしにウェブ全体で得られる未認証の「存在シグナル」。holeheの「サイレント」モードこそ、OSINTツールとして愛されると同時に、メールアドレスがどれだけの情報を開示してしまうかを思い起こさせる理由でもある。

> 「教育目的のみ」。サイトモジュールはドリフトして誤検知しうるため、ヒットは身元証明ではなく存在シグナルとして扱うこと。

[`🔗 megadose/holehe`](https://github.com/megadose/holehe) · [`🔗 xlap.top deep-dive`](https://blog.xlap.top/post/tech/2026-08-14/holehe/)

---

## メタデータ

| フィールド | 値 |
|-------|-------|
| 生成日時 | 2026-08-15T20:03:00Z |
| アイテム数 | 29 |
| 追跡ソース | 40（GitHub Trending、Hacker News、z.ai、Pandaily、ppc.land、4sysops、Context Studios、The Hacker News、Mallory、SecurityWeek、AISignal、Google Blog、Google Developers Blog、Hugging Face、dev.to、Cursor Docs、mixedbread、TokenPost、RustDesk Blog、LuaCAD Docs、AUR、Android Authority、APIDog、The Neuron、TLDR AI、orcarouter、MiniMax Blog、cirt.gy、CVETodo、llm-stats、Firecrawl Blog、openalternative、Anthropic、Yahoo Tech、arXiv、NVD、IONIX、stack.watch、Visual Studio Magazine、xlap.top） |
| 更新スケジュール | 04:03, 12:03, 20:03 UTC+8（1日3回） |
| ランキング | ベロシティ加重（新しさ × エンゲージメント加速 × ソースの権威性） |
| ライセンス | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[前日](../2026-08-14/) · [生 .md](../2026-08-15.md) · [アーカイブ](../../archive/)
