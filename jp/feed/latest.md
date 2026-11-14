---
date: 2026-11-15
updated: 2026-11-14T20:25:31Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 17
license: CC-BY-4.0
---

# trending.md — 2026-11-15

## 1. セキュリティ研究チームが 159,041 個の Lovable アプリを精査：24,664 個がログインなしでデータベース記録を匿名ビジターに提供——パスポート情報・チャットログ・入居者データも

- **Velocity:** ▮▮▮ trending
- **Source:** crissyfield.de · 277+ pts on HN · 2.5h ago (~01:43 UTC+8)
- **Tags:** `lovable` `supabase` `data-exposure` `vibe-coding`

Crissy Field GmbH の研究者らは Handelsblatt（ドイツ経済紙）と共同で、Common Crawl から収集した **159,041 個の Lovable プロジェクト**（2025 年 12 月〜2026 年 9 月）を分析。Supabase 統合を使う **34,545** 個のうち、**24,664 個がページ読み込み時にログイン不要でデータベースのレコードを返している**ことを発見しました。同じ匿名ビジター用 API キーで追加の読み取り専用リクエストを試したところ、**7,403 サイト（送信側の 30%）**がメールアドレスを含むテーブルを露出していました。事例は具体的です。ドイツのライフスタイル forum で**プロフィール 8 万件超とチャットメッセージ 20 万件超**、あるサービスプロバイダで**パスポート番号を含む 1,000 件超の身分証明記録**、不動産管理会社の入居者に関する AI 生成の内部メール、そして**28 万件の顧客メール**が誰でも読める状態だったケースも。研究者の表現は慎重です。30% は確認済みの漏えい率ではなく（メールは公開連絡先やテストデータの可能性）、Common Crawl サンプルも代表的ではない——しかしパターンは明確です。Lovable の売り込みは技術スキルを要しないことである一方、利用規約ではデータ処理責任を顧客に押し付け、Supabase の設定ミスは反復パターンに従うため、あるアプリで開く穴は何千ものアプリでも開きます。

**Why it matters:** これは vibe-coding プラットフォームリスクの大規模な定量化です。問題は単一のバグではなく、技術を持たない構築者には見えない反復的な設定ミスのクラスが、実個人情報を抱えたアプリ上で動いていること。研究者自身の結論——自動チェックは専門的なセキュリティ評価の代わりにならない——が、これらのアプリでユーザーデータを扱うすべての人への運用指針です。

[`🔗 Crissy Field：Lovable 研究（英語）`](https://www.crissyfield.de/research/lovable-en/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50499017)

---

## 2. イタリアが Meta に 8 億 500 万ユーロ（約 8 億 8700 万ドル）の制裁金：同意なき Android 写真アクセスで

- **Velocity:** ▮▮▮ trending
- **Source:** reuters.com · 226+ pts on HN · 6.4h ago (~21:48 UTC+8)
- **Tags:** `meta` `gdpr` `privacy` `regulation`

イタリア個人情報保護局（Garante）は 11 月 14 日（土）、投稿候補としてギャラリーコンテンツを提案する Facebook アプリの機能が、**同意を得ず、通知もせずに** Android ユーザーの写真と動画へアクセスしたとして、Meta に **8 億 500 万ユーロ**の制裁金を課したと発表しました。約 **8 億 8700 万ドル**、当局によれば Meta の世界売上の約 0.47% に相当します。命令は Meta に対し**60 日以内**に機能をデフォルトで無効化し、同意を別途取得することを求め、さらに 2026 年のギャラリーコンテンツをクラウド処理する機能については個別に評価する権利を留保しました。Reuters によれば Meta は即時コメント不在、また今回の調査はコンテンツの AI モデル訓練への利用（Meta は一貫して否定）は**対象外**だったと伝えています。本項の詳細はすべて Reuters によるもので、配信時点で Garante の英語プレスページには告知が掲載されていません。

**Why it matters:** このケースは「写真スキャン系機能」が EU でどう裁かれるかのテンプレートになります。同意は分離・明示であるべきで、共有の提案に紐付けてはならない。そして見るべきは「クラウド処理」への追加評価の糸です。AI 訓練の問題はそこから再入場します。

[`🔗 Reuters：Italy fines Meta $887 million over Android users' data access`](https://www.reuters.com/world/italy-fines-meta-887-million-over-android-users-data-access-2026-11-14/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50497009)

---

## 3. Univer が v1.5.0 をリリース：エージェントをファーストクラスのエディタに据えるオープンソース Office SDK が 2.4 万スター超え

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub Trending · +495★ today · 24.4k total · v1.5.0 released 9.6h ago (~18:33 UTC+8)
- **Tags:** `univer` `office-sdk` `spreadsheet` `typescript`

dream-num/univer——「Build your own AI office with Univer Office SDK」——が **v1.5.0**（11 月 14 日 10:33 UTC）をリリースし、GitHub Trending で本日 +495 スターを記録しました。このプロジェクトはオープンソースの**スプレッドシートとドキュメント**（編集・計算・コラボレーション・ファイル処理）を自社アプリに組み込むもので、オープンソースのスプレッドシートとドキュメントから始めて、自分のアプリケーションやエージェントを接続することを明確に掲げています。つまりドキュメントモデルは UI に操られるのではなく、API として AI ワークフローに公開される設計です。README にはスタンドアロン表計算エディタのクイックスタート、8 言語ドキュメント、組み込みシーンで置き換える商用スイートとの比較ページが用意されています。

**Why it matters:** 「エージェント・オフィス」パターン（閉じたスイートを操るのではなく、アプリ自身のデータモデルの中でエージェントに構造化ドキュメントを読み書きさせる）に必要なのは、まさにこの層——API サーフェスを持つ、改変可能なライセンスの表計算/ドキュメントエンジンです。v1.5.0 のトレンド入りは、エージェントスタック向けに閉じたスイートのプラグインと並べて評価する絶好のチェックポイントです。

[`🔗 dream-num/univer`](https://github.com/dream-num/univer) · [`🔗 Release v1.5.0`](https://github.com/dream-num/univer/releases/tag/v1.5.0)

---

## 4. Google Antigravity の /teamwork：並列エージェント＋「反証器」——2013 年の予想の Lean 証明、Weil 予想の形式化、Rust 版 Zircon

- **Velocity:** ▮▮ rising
- **Source:** research.google · 109+ pts on HN · 6.9h ago (~21:20 UTC+8)
- **Tags:** `antigravity` `multi-agent` `lean` `formal-verification`

Google のリサーチブログ（11 月 13 日、Vahab Mirrokni）は Antigravity 内のマルチエージェント協調システム **/teamwork** を紹介しています。Gemini 4 モデルの上に、並列で探索するエージェントに専用の**反証器（falsifier）**——Lean 4 の証明チェック、未変更のテストスイート、実行シミュレータ——をペアにし、候補結果は信頼ではなく機械検証で通す設計。コンテキストは構造的に分割され、各エージェントはそのステップに必要なファイルとツールしか見ません。主張される成果は驚くほど具体的です。**2013 年の Courtade–Kumar 予想**の完全証明を Lean 4 で形式化（5000 万行）、**Weil 予想の初形式化**（約 180 万行の Lean、28,800 回のサブエージェント呼び出し）、整数環上のヒルベルト第 10 問題の形式化、1927 年から未解決だった Birkhoff 予想、8 日未満で約 2600 Elo を獲得した囲碁エンジン、そして **Zircon マイクロカーネル移植（約 80 万行の安全な Rust）**で、libgav1 は元の C++ より 20〜30% 速く書き直されました。外部展開も本物です。/teamwork、/boost、Deep Review は Antigravity で既に利用可能で、1 万人の学術研究者向け無料アクセスプログラムが申請受付中です。

**Why it matters:** ここ の数字はすべて Google が自分のシステムを測ったもので、ベンチマークはベンダー主張として扱うべきです。しかし重量を支えているのはアーキテクチャのアイデアです。生成器に自動反証器をペアにする構図は、今週のゲーデル・ノート、Lean 税法と同じ「モデルがモデルをチェックする」ループであり、間違いが検証可能なエージェント仕事の標準形になりつつあります。

[`🔗 Google Research：Advancing science and engineering with Antigravity's /teamwork`](https://research.google/blog/advancing-science-engineering-with-antigravitys-teamwork-feature/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50496811)

---

## 5. claude-trading-skills が本日最速の上昇：トレードの意思決定を構造化する Claude Skills ツールキット——そして「シグナルサービス」であることを拒む

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · +556★ today · 4.7k total · pushed 5.6h ago (~22:33 UTC+8)
- **Tags:** `claude-skills` `trading` `workflow` `finance`

tradermonty/claude-trading-skills が本日 **+556 スター**を獲得し、デイリーボード最大の増加となりました。時間のない個人投資家向けの Claude Skills ベース**ワークフロー**ツールキットです。5 つの名前付きワークフロー（`market-regime-daily`、`core-portfolio-weekly`、`swing-opportunity-daily`、`trade-memory-loop`、`monthly-performance-review`）が、それぞれ機械可読な YAML マニフェストとして、使うスキル・判断ゲート・成果物を順番に明記します。市場の幅、ドローダウン・サーキットブレーカー、ポジションサイジング、取引前の規律ゲート、取引後のポストモーテム・ループまで。README は「何ではないか」を異例なまでに強調します。投資助言ではない、シグナルサービスではない、自動売買ではない。目標はレビュー・リスク管理・ジャーナリングを構造化することで、全ワークフローに API 不要の縮退経路を用意し、サンプル出力には架空データである旨の断り書きが付いています。

**Why it matters:** 面白いのは題材ではなく形です。エージェントスキルの採用は、タスクをこなすことから、ゲートと成果物で意思決定プロセスを強制することへ移りつつあり、金融・医療・法務のエージェントツールが同じ形に収束しています。免責の規律は、規制された領域でエージェントワークフローを公開するすべての人のテンプレートとして読む価値があります。

[`🔗 tradermonty/claude-trading-skills`](https://github.com/tradermonty/claude-trading-skills) · [`🔗 ドキュメントサイト`](https://tradermonty.github.io/claude-trading-skills/)

---

## 6. NVIDIA が GLM-5.3（753B）を DGX Station 2 台でサーブ——ピーク 607.8 tok/s、同時実行カーブも正直に掲載

- **Velocity:** ▮▮ rising
- **Source:** developer.nvidia.com · 108+ pts on HN · 6h ago (~22:09 UTC+8)
- **Tags:** `glm-5` `vllm` `inference` `dgx`

NVIDIA の技術ブログ（11 月 13 日）は、Z.ai の **GLM-5.3**——753B パラメータの MoE（トークンあたり 40B アクティブ）を NVFP4 で、チェックポイント約 464 GB は GB300 1 台の HBM3e 252 GB を超える——を **ConnectX-8 RDMA で接続した 2 台の DGX Station** でサーブする手順を解説しています。vLLM v0.30.0 が単一の OpenAI 互換エンドポイントを公開。レシピはテンソル並列（TP=2、disaggregation ではない）、マルチトークン予測でステップごとに 4 トークン起草、FP8 KV キャッシュ、プレフィックスキャッシュ。80 件の SPEED-Bench コーディング会話での実測カーブは同時実行 16 で**ピーク 607.8 tok/s** に達し——記事は表全体を掲載しています。C32 では **385 tok/s** に落ち、平均レイテンシ 453.5 秒、ユーザーあたりスループットは 115.3 から 13.0 tok/s へ。注意点も記事内に明記されています。エンドポイントはデフォルトで**認証なし**（広げる前にファイアウォールと TLS を）、古い NCCL は RoCE 越しのノード間 CUDA graph リプレイでデッドロックし得る、プレフィックスキャッシュを切ると数字が変わる。

**Why it matters:** ここには二つの現物があります。チェックポイントが 1 台のメモリを超える瞬間（464 GB クラスは標準になりつつある）への再現可能なレシピと、見出しの数字の隣に劣化カーブを載せる出版の手本です。C16 のピークがツイートで、C32 の行が真実です。

[`🔗 NVIDIA Technical Blog：When one GPU isn't enough`](https://developer.nvidia.com/blog/when-one-gpu-isnt-enough-serving-glm-5-3-across-two-nvidia-dgx-stations-with-vllm/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50497155)

---

## 7. PyPI がセキュリティシグナルの再設計を出荷：Security タブが provenance を示し、遅延ファイルにフラグ、provenance 丧失に警告

- **Velocity:** ▮▮ rising
- **Source:** blog.pypi.org · 148+ pts on HN · 4.5h ago (~23:40 UTC+8)
- **Tags:** `pypi` `supply-chain` `provenance` `packaging`

PyPI のプロジェクトページ再設計が全面展開されました（11 月 6 日に完了を発表、HN の波は 11 月 14 日に到着）。専用の **Security タブ**が各リリースの **provenance 状態**とファイルごとの attestation 詳細を表示します。PyPI Publish attestation（Trusted Publisher アップロード）と SLSA Build Provenance（ファイルをソースコミット・プラットフォーム・ビルド指示に紐付ける）。4 種類の警告——**incomplete、inconsistent、change of、loss of provenance**——は、アカウント乗っ取りや出版パイプラインの侵害の可能性を表面化するために設計されています。**遅延ファイル警告**はリリースの 14 日以上後に追加されたファイルにフラグを付け（2026 年 7 月に政策が確立する前のリリースが対象）、検疫バナーは他のすべてに優先し、サイドバーのメタデータは「PyPI data」と「Data verified by PyPI」に分類されます。OpenSSF の資金、Kabu Creative の実装、OpenSSF Attestations Style Guide 準拠。

**Why it matters:** attestation は 2 年前から存在しました。今回はそれをインストール判断の時点で**読める**ようにする UI です。それが行動を変える瞬間です。「provenance 丧失」の警告が一番面白い。アカウント乗っ取りが実際に生むパターンで発火するサプライチェーンの罠線です。

[`🔗 PyPI ブログ：UI updates complete`](https://blog.pypi.org/posts/2026-11-06-ui-updates-complete/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50497892)

---

## 8. KDE：ドキュメンタリー——コミュニティの物語が映画になり、263 ポイントで HN を上昇中

- **Velocity:** ▮▮ rising
- **Source:** tube.kockatoo.org · 263+ pts on HN · 6.5h ago (~21:43 UTC+8)
- **Tags:** `kde` `documentary` `open-source` `community`

Plasma 背後の 30 年の歴史を持つデスクトップコミュニティ、KDE についての長編ドキュメンタリーが HN で **263 ポイント、123 コメント**を付けて上昇しています。ホストはコミュニティの Peertube インスタンス。コメント欄は制作元を即座に特定しました。**CultRepo**、これまで自由ソフトウェアのドキュメンタリーを複数作ってきたチャンネルです。スレッドは自然に「20 年の KDE ユーザー」の讃美スレッドに変わり（リリースを跨いだ安定性、設定可能性、C++ のデスクトップコードベース）。リリースでも脆弱性でもない、純粋にコミュニティの歴史であるフロントページ項目は珍しい存在です。

**Why it matters:** 自由ソフトウェアのドキュメンタリーは独自のジャンルになりつつあります。CultRepo のバックカタログは繰り返し HN に浮上しており、コメント欄は 2026 年の現場のエンジニアから見た、最も古い大型デスクトップコミュニティの認知を測る 바로メーターです。

[`🔗 KDE：The documentary（動画）`](https://tube.kockatoo.org/w/fFinNHfanLT7aBEb2B8y4c) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50496976)

---

## 9. Caveman Code 登場：12 万スターのトークン削減プロジェクトが無料の Mac コーディングエージェントアプリに——自己採点ベンチは失敗まで公開

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · +227★ today · 120.0k total
- **Tags:** `caveman` `token-optimization` `coding-agents` `context`

JuliusBrussee/caveman——エージェントに「少なく言わせ、少なく読ませる」バイラルの skill＋プロキシ——が **12 万スター**を突破し、**Caveman Code** をローンチしました。既存のサブスクリプションで Claude Agent、Codex、Cursor、自社エージェントを並列実行する無料の Mac/ブラウザハーネスです。ローンチの主張はモデルを固定しています。Terminal-Bench 4 で**解決タスクあたり Codex より 21% 安い**（GPT-6.1 Sol で 90/192、Codex と同率）、**Claude Code より 14% 安い**（Opus 5.5 で 97/180 対 83/177）、一日のマルチアプリセッションでは**76% 安い**、初回リクエストは 2.7k トークン対 Claude Code の 16.7k。土台の技術自体の数字は、54 回の Claude Code 実行で**入力トークン 33.2% 削減**、正答 18/18。開示も異例なまでに完全です。全測定は自社ランの定価ベース、Claude Code の実行回数には僅かな差（180 対 177）、失敗した実験まで公開しています（履歴から先行推論を剥がすと再読は 68% 減ったが**コストは 19% 増加**し解決率も低下）。だからこそ、生トークンではなく解決タスクあたりコストが指標だと主張するのです。

**Why it matters:** コンテキスト効率ハーネスは副業プロジェクトから製品へ向かっています。ここでの正直なベンチマークの形——モデル固定、解決タスクあたりコスト、失敗込み——は、同じモデルで請求は小さくという類の宣伝に求めるべき形です。

[`🔗 JuliusBrussee/caveman`](https://github.com/JuliusBrussee/caveman) · [`🔗 ローンチ記事：Introducing Caveman Code`](https://caveman.so/news/introducing-caveman-code)

---

## 10. 米国税法を Lean で形式化：立法起草の欠陥 138 件を証明書付きで特定、税務ソフト 2 製品のバグも検出

- **Velocity:** ▮▮ rising
- **Source:** lexifina.com · 102+ pts on HN · 4.5h ago (~23:41 UTC+8)
- **Tags:** `lean` `formal-methods` `tax` `research`

Lexifina の Alan Yahya によるプロジェクト（CC0 ライセンス）は、米国内国歳入法典（Title 26）を Lean へ翻訳しました。機械検証される構造化クロスリファレンスとして（公法ごとに git コミット、1994 年版まで遡れる）、さらに Form 1040 の数字を出す**2025 年個人所得税モデル**（約 2,159 の定義と定理、AMT を含む）。検証された収穫は次の通りです。法典本文の**実際の起草欠陥 138 件**、それぞれに Lean 証明書付き（死んだ参照、誤字、番号の重複、閉じられていない括弧）。SALT 上限は所得と共に決して増えないこと、Tax Table は 10 万ドル以下で法定式から最大 −5〜+6 ドルしか逸脱しないことなどの普遍証明。そして 5,000 世帯での 3 つの独立ツール（PolicyEngine-US、Tax-Calculator、UsTaxes）とのクロスバリデーション——そこから **Tax-Calculator と UsTaxes のバグ**、および自モデルの 2 つが見つかりました。証明済みモデル上の自動探索（約 195,787 件の単年申告）は既知の §199A や Roth 変換戦略を再発見し、Schedule 8812 が法定の許容を超えて支払うことを含む新しい結果を 3 つ報告しました。限界は率直に記されています。法典の翻訳は AI で行われ、**弁護士や CPA のチェックはない**、対象は 2025 年の個人所得税のみ、そして結論として、単一の課税年度に Roth 級の未公開抜け穴は存在しない——大きなものはパートナーシップと S コーポレーションに住んでいる、と。

**Why it matters:** 今週は同型の実演が三つ独立に現れました（本項、Antigravity の証明、ゲーデル・ノート）——AI が翻訳し、証明支援系が裁く。税法版が非数学者にとって最も重いのは、ここのオラクルが IRS 自身の公表数字と三つの独立ソフトウェアパッケージであり、その三つのうち二つが法律と食い違ったからです。

[`🔗 Lexifina：Formalizing the US Tax Code`](https://lexifina.com/blog/formalizing-the-us-tax-code) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50497900)

---

## 11. Project Zero が開示方針を強化：30 日の soak は廃止、2028 年 1 月に「満 30 日」へ

- **Velocity:** ▮▮ rising
- **Source:** projectzero.google · 42+ pts on HN · 9h ago (~19:13 UTC+8)
- **Tags:** `project-zero` `disclosure` `security-policy` `ai`

Google Project Zero が新しい脆弱性開示方針を公表しました（11 月 13 日、Natalie Silvanovich）。2021 年以来の「90+30」——修正に 90 日＋ロールアウト soak に 30 日——を、**「Full X」スケジュール：報告から X 日後に開示、パッチの有無を問わず**へ置き換えるものです。段階の日程は明確です。**現在は Full 90 → 2027 年 2 月 2 日から Full 60 → 2028 年 1 月 3 日から Full 30**。猶予期間と変異ポリシーは削除され、例外は 3 つだけ（in-the-wild のバグは Google のアプリセキュリティ方針で処理、既に公開済みの脆弱性、ベンダーからの要請）。示された動機はレースの両側にいる AI です。LLM は脆弱性発見を圧縮し、パッチからエクスプロイトまでの窓を縮める。ゆっくりした悪用開発を想定した soak はもうユーザーの安全を買えていません。特筆すべきは、バグが実際に修正されたかが方針の判断点ではなくなったことです。P0 は修正状況を追跡し続けますが、開示はもうそれを待ちません。

**Why it matters:** これは「AI に加速された悪用タイムライン」から明示的に論証された最初の大規模な開示方針の書き直しで、業界全体が計画できる期限を設定しました。ベンダーのパッチ SLA、そして 90+30 の上に築かれたすべての企業パッチサイクルの前提に、既知の有効期限が付いたのです。

[`🔗 Project Zero：開示方針の更新`](https://projectzero.google/2026/11/disclosure-policy.html) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50496051)

---

## 12. DeepSeek V3 を純 JAX 190 行で——MLA、MoE バランシング、MTP を MacBook Air でスクラッチ学習

- **Velocity:** ▮ steady
- **Source:** Show HN · 80+ pts · 5.1h ago (~23:04 UTC+8)
- **Tags:** `jax` `deepseek` `education` `transformer`

Vaibhaav Tiwari の教育スケール実装は、DeepSeek-V3 アーキテクチャ全体を**純 JAX の 190 行**に収めました——Flax も Equinox も使わず、パラメータはただの辞書配列——そして MacBook Air M5（24 GB）でスクラッチから事前学習しました。36.2M パラメータのモデル（トークンあたり 13.6M アクティブ）、パブリックドメインの探偵小説 21.7M トークン、約 2.6 時間、検証損失 5.02 → 3.51。DeepSeek-V3 のアイデアはすべて揃っていて、このスケールで測定可能です。MLA の潜在キャッシュ（トークン・レイヤーあたり 480 → 144 個の数値）、decoupled RoPE、DeepSeekMoE（共有 1 ＋ルーティング 16 で top-4）、そして白眉の **auxiliary-loss-free バランシング**——README は前後をそのまま印刷しています。バイアスありでは各エキスパートの負荷が 5.7〜6.9% に分散、なしだと 0.09〜18.6%。バランシングのトリックが何を買うかの直接測定です。

**Why it matters:** N 行で X を実装するリポジトリの大半は形状を打ち直すだけですが、これは論文の各アイデアをトイスケールで反証可能にします。コードの解説と動く実験室の違いです。バイアス・バランシングの前後だけでも、DeepSeek-V3 レポートを読んで負荷プロットを信じられなかったすべての人に価値があります。

[`🔗 Vaibhaav-Tiwari/deepseek-v3-jax`](https://github.com/Vaibhaav-Tiwari/deepseek-v3-jax) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50497589)

---

## 13. agweb：コーディングエージェントのために作られた macOS ブラウザ——フォーカスを奪わず、フットプリントも自測

- **Velocity:** ▮ steady
- **Source:** Show HN · 66+ pts · 6.1h ago (~22:08 UTC+8)
- **Tags:** `agweb` `agents` `browser` `macos`

agweb（paul-nameless/agweb）は、人間ではなくエージェントのために設計された WebKit ベースの macOS ブラウザです。エージェントは playwright 風の CLI でシェルから駆動し、ダイアログやファイルピッカーはコードで応答され、そして核心の性質——**どのウィンドウもフォーカスを奪わない**ため、5 つの並列エージェントがキーボード戦争なしに閲覧できます。全エージェントのタブは 1 つのダッシュボード（⌘D）に各エージェントの最後のコマンドと共に表示され、ネイティブの macOS イベントがクリックとホバーを駆動して人間審査のサイトも動き、`fill --secret-cmd 'pass show site'` はエージェントのトランスクリプトに決して現れない資格情報をタイピングし、アイドルタブは 0% CPU まで一時停止します。README は自測を添付しています。アイドルページ 5 つで **590 MB**、headless Chrome は 730 MB、Playwright Chrome は 1.6 GB。11 月 11 日作成、122 スター、macOS 26 以上が必要です。

**Why it matters:** エージェントブラウザ層は明確なインターフェース契約へ収束しつつあります——参照が安定したスナップショット、diff 可能な find、秘匿化された入力。そして agweb の立位置——フォーカスを決して奪わず、人間から見える実ウィンドウ——は、headless ブラウザと Playwright 駆動 Chrome の間の設計空間における明確な一点です。

[`🔗 paul-nameless/agweb`](https://github.com/paul-nameless/agweb) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50497147)

---

## 14. Fursoy：スクラッチから書かれたアウトオブオーダー RV64 コアが SystemVerilog で mainline Linux 6.6 を起動

- **Velocity:** ▮ steady
- **Source:** Show HN · 50+ pts · 6.1h ago (~22:06 UTC+8)
- **Tags:** `riscv` `cpu` `systemverilog` `hardware`

Fursoy Slice-1 は、一人の開発者がスクラッチから書いた**64 ビット アウトオブオーダー スーパスカラ RISC-V プロセッサ**（RV64IMAFDV＋Zba/Zbb）の SystemVerilog 実装です。2 幅のフェッチ/デコード/リネーム/リタイア、128 エントリの ROB、160 エントリの物理レジスタファイル、8 つの分岐チェックポイント、ハードウェアページテーブルウォーカ付きの 8 バンク ノンブロッキング L1D、Sv39 の要求ページングと M/S/U 特権分離。ヘッドラインの成果物は、仮想メモリの下で **mainline Linux 6.6.50 と BusyBox を起動**するもので、Nangate 45nm 標準セルで 8 つのコアブロックに **500 MHz** のタイミングクロージャを達成しています（完全な合成レポート公開）。スターは 17——これは工芸のプロジェクトであって製品ではなく、README のマイクロアーキテクチャ特化の密度がそれを物語っています。

**Why it matters:** 自作のアウトオブオーダーコアで Linux を起動することは、ハードウェアで最も難しい個人マイルストーンの一つです。公開された合成/STA レポートにより、アウトオブオーダーが実際に何の費用がかかるかを学ぶ誰にとっても使いやすいリファレンスになっています。すべての構造に名前とサイズとタイミングがあるのです。

[`🔗 FURSOY/fursoy-cpu`](https://github.com/FURSOY/fursoy-cpu) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50497137)

---

## 15. IRS Direct File のコードが GitHub に——リポジトリ自身が「アーカイブ済み、非維持、本番使用禁止」を宣言

- **Velocity:** ▮ steady
- **Source:** github.com/IRS-Public · 65+ pts on HN · 2.4h ago (~01:48 UTC+8)
- **Tags:** `irs` `direct-file` `open-source` `government`

HN が **IRS-Public/direct-file**——IRS の無料直接 e-file サービスの背後にあるリポジトリ——を掘り起こしました。4.6k スターで、README は自らの状態を曖昧さなく宣言しています。**「このリポジトリはアーカイブされており、維持されていません。コードは歴史的参照のために提供されており、未修正または未知の脆弱性を含む可能性があります。本番システムで使用すべきではありません。」**コード自体は依然として驚くべき公共の成果物です。Title 26 を平易な言語の質問として解釈するインタビュー型の申告サービス（IRS 法務顧問室と共同開発）に加え、**Fact Graph**——JVM 上の Scala で動き Scala.js でブラウザへトランスパイルされる宣言的 XML ナレッジグラフで、未完成の申告のような不完全な情報について推論するよう設計され、ビジネスルールエンジンのリファレンスとして明示的に提供されています。最後の push は 6 月 11 日。スレッドで生きている質問は、Direct File プログラム自体が戻り、恒久化されるかどうかです。

**Why it matters:** ここでは二つのことが一緒に動いています。真に再利用可能な公共部門の成果物（Fact Graph はドメイン非依存）と、アーカイブされた政府コードの安全なフレーミングの範となるリポジトリです。README は「歴史的参照」が「維持されているソフトウェア」と読まれることを拒んでいます。

> "This repository has been archived and is no longer maintained. The code is provided for historical reference and may contain unpatched or unknown vulnerabilities. It should not be used in production systems." —— リポジトリの README

[`🔗 IRS-Public/direct-file`](https://github.com/IRS-Public/direct-file) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50499083)

---

## 16. 腾讯が LoopForge をオープンソース化：コーディングエージェントが PR を開き、人間がゲートを守る自己ホスト型デリバリー

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · +101★ today · 834 total · v0.3.9-rc.1 released ~24h ago
- **Tags:** `loopforge` `tencent` `agent-orchestration` `self-hosted`

Tencent/LoopForge は、チームがコーディングエージェントでソフトウェアを出荷するための自己ホスト型（Docker、MIT）ワークスペースです。**Main Bot** がサンドボックス化されたワークスペースを開き、リポジトリをチェックアウトし、プロジェクトロールに委任し、PR を開きます。再現可能な働き方は **SOP** として保存されます。Agent、Script、Human-gate、サブ SOP ノードのグラフで、ノードごとの成果物、リトライ、ステップへの送り返しの意味論を持ちます。エグゼキュータのリストはその幅が注目に値します。CodeBuddy（Tencent 自社）、Codex、Claude Code、OpenCode、Cursor CLI、Antigravity、Kimi Code、Pi、DeepSeek Harness、ZCode。チャットと SOP の両経路は同じ要件を追跡し、デリバリーとコストのレポートに流れます。リリースペースは速く——3 日で v0.3.7、v0.3.8、v0.3.9-rc.1——本日さらに +101 スター。

**Why it matters:** エージェント・デリバリープラットフォーム層は、今年のエージェントツーリングが収束している場所です。LoopForge の差別化は、ほとんどの競合が飛ばす二つです。すべてを自分のインフラ上で自己ホストすること、そして human gate が脇に付けられた承認ボタンではなく、デリバリーグラフの第一級ノードであることです。

[`🔗 Tencent/LoopForge`](https://github.com/Tencent/LoopForge) · [`🔗 Releases`](https://github.com/Tencent/LoopForge/releases)

---

## 17. 生成 AI は非英語テキストに 1.4〜180 倍のエネルギーを消費——ヒンディー語 7.9 倍、ベンガル語 15.3 倍——その上精度まで低い

- **Velocity:** ▮ steady
- **Source:** news.umich.edu · 135+ pts on HN · 4.2d ago (~23:07 UTC+8, Nov 10)
- **Tags:** `energy` `multilingual` `research` `emnlp`

ミシガン大学の研究者（Naihao Deng、Rada Mihalcea ら、EMNLP 発表）は、ML.Energy フレームワークを使い、3 つのオープンソースモデル——Qwen 3、Gemma 3、Llama 3.1——が 122 言語の Belebele 読解問題に答えるエネルギーを測定しました。非英語テキストの生成は英語より**1.4〜180 倍のエネルギー**がかかり、ヒンディー語は **7.9 倍**、ベンガル語は **15.3 倍**、ほとんどの西欧言語は 2 倍以下にとどまります。メカニズムは複合的です。非ラテン文字はより多くのトークンに分割され、より多くのトークンがメモリを消費してバッチを小さくし、小さいバッチがトークンあたりのエネルギーを上げます——そしてこの格差はより大きなモデルでも、プロセッサを変えても持続します。精度の罰も同行します。「通常より多くのエネルギーを消費する言語は、モデル出力の精度も低くなりがちです」と Deng。彼らの計算（Ethnologue データと合わせ）では、約 **52 億人**が母語で AI を使うために 2 倍以上のエネルギーを払っています。

**Why it matters:** 「二重の罰」——同じ質問に、より高いコストとより低い品質——は物理法則ではなく価格構造です。著者の修正策（言語別モデル、英語への翻訳パイプライン）はすべてエンジニアリングの選択です。多言語ユーザーにサービスするすべての人にとって、この論文は言語別の価格設定の前に走るべき測定です。

[`🔗 ミシガン大学ニュース：Generative AI uses more energy on non-English text`](https://news.umich.edu/generative-ai-uses-more-energy-on-non-english-text/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50441444)

---

## 18. CBC の調査を受け LinkedIn と Monster が 1,500 件超の偽求人を削除——旅館系 MLM に辿り着く

- **Velocity:** ▮ steady
- **Source:** cbc.ca · 54+ pts on HN · 1.3h ago (~02:56 UTC+8)
- **Tags:** `linkedin` `job-scam` `mlm` `investigation`

**1,500 件超の誤解を招く求人**——「在宅ワーク・トラベルプランナー＆仮想カスタマーサポート」、リモート、経験不問、年収最大 7.5 万ドル——が LinkedIn と Monster から削除されました。CBC News の視覚調査が、旅館テーマのページ群のネットワークを米国のマルチレベルマーケティング企業 **Evolution Travel** に辿り着かせた後のことです。求人は応募者をバーチャル情報セッションへ誘導し、数百ドルの前払いと月額サブスクリプションを求めました。その金銭は旅行予約のコースとメンバー募集から来るものです——調査の言葉では、**「仕事はなく、給料もない」**。記事は 11 月 12 日に公開され、11 月 14 日に HN のフロントページへ。

**Why it matters:** 求人詐欺の量は AI 時代のより静かな害の一つです。生成ツールは listing ファームを量産できるほど安価にし、経済不安が応募者の目を緩めるその瞬間に。そして今回の削除は、モデレーションのループが、CBC のような接続作業をする人が現れたときだけ閉じることを示しています。数百の名目上無関係なページを一つの支払構造へ繋ぐ作業です。

[`🔗 CBC News：LinkedIn, Monster take down over 1,000 fake job postings`](https://www.cbc.ca/news/canada/linkedin-monster-take-down-over-1-000-fake-job-postings-after-cbc-investigation-9.7415379) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50499723)

---

## 19. Watch a Brain Learn：Aatish Bhatia の強化学習インタラクティブ解説が、ニューロンの配線をあなたに委ねる

- **Velocity:** ▮ steady
- **Source:** aatishb.com · 73+ pts on HN · 6.7h ago (~21:31 UTC+8)
- **Tags:** `reinforcement-learning` `visualization` `neuroscience` `education`

Aatish Bhatia と神経科学者 Arkarup Banerjee が Myriad シリーズの次のインタラクティブを公開しました。**「Watch a Brain Learn」**、強化学習の視覚的解説です。まず 4 ニューロンのデジタル生物（「spark」）を手で配線して光に向かわせます——前作の恐怖/攻撃/誘引回路を再現——それから制御を試行錯誤に渡します。生物は報酬を通じて同じ行動を自力で学び、学習規則のすべてのステップがインタラクティブに見えます。その教育法は、フロントページの常連になった以前の解説と同じです。メカニズムは読む図ではなく、あなたが操作するものなのです。

**Why it matters:** RL の解説は普通、表と Q 値から始まります。これは自分で誤配線できる脳から始まります。これは本当に異なる入口です。「報酬が行動を形作る」が何を意味するか、報酬を持つエージェントに触れる前に理解する必要のあるチームの誰かに渡す良いリンクです。

[`🔗 Watch a Brain Learn（インタラクティブ）`](https://aatishb.com/myriad/how-brains-learn/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50496885)

---

## 20. Let's Write a PostScript Interpreter：印刷ページ 1〜2 枚に収まるスタック言語を、1 行の JavaScript 関数で

- **Velocity:** ▮ steady
- **Source:** beyondloom.com · 88+ pts on HN · 39h ago (~13:12 UTC+8, Nov 13)
- **Tags:** `postscript` `interpreters` `forth` `programming-languages`

Devin Weaver のエッセイ（beyondloom）は、意図的に簡素な JavaScript で最小の PostScript インタプリタを作ります。正規表現のトークナイザ、2 つのグローバルスタック（オペランド＋辞書）、アリティでポップするただの関数としての演算子——印刷ページ 1〜2 枚に収まるほど小さく、すべての例は Ghostscript でも同じ結果で動きます。エッセイの最も良い技術的知見は PostScript の風変わりな隅にあります。`[` と `]` は構文ではなく **mark** プロトコルです（`[` がマークを積み、`]` がその上のすべてを集め、括弧の配列を合成可能なリスト内包表記にします）。そして辞書スタックはレキシカルではなく**動的スコーピング**をもたらします——高階関数が不格好で、本物の `bind` 演算子が存在する理由です。全体の枠組みは「人間スケールの言語」です。一人で構築し、完全に理解できるツールです。

**Why it matters:** PostScript は、誰も意図的に書かない最も広く展開されたスタック言語です。その子孫（PDF のイメージングモデル、Forth 流の組込みツーリング）がなぜあの形なのかへの最もきれいな入口です。さらに、一晩で完成し、行ごとに本物の深さがあるインタプリタプロジェクトでもあります。

[`🔗 Let's Write a PostScript Interpreter`](https://beyondloom.com/blog/postscript.html) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50478632)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-14T20:25:31Z |
| Items | 20 |
| Sources tracked | 17 (Hacker News, GitHub Trending, Google Research, NVIDIA, PyPI, Project Zero, CBC, Reuters, U-Mich, vendor blogs and project repos) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[Previous day](2026-11-14.md) · [Raw .md](latest.md) · [Archive](../archive/index.md)
