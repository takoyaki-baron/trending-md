---
date: 2026-11-15
updated: 2026-11-15T12:24:30Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 36
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

ミシガン大学の研究者（Naihao Deng、Rada Mihalcea ら、EMNLP 発表）は、ML.Energy フレームワークを使い、3 つのオープンソースモデル——Qwen 3、Gemma 3、Llama 3.1——が 122 言語の Belebele 読解問題に答えるエネルギーを測定しました。非英語テキストの生成は英語より**1.4〜180 倍のエネルギー**がかかり（論文の要旨本文では上限は最大 **179 倍**——英語 17.6 kJ → パシュトー語 3,147 kJ）、ヒンディー語は **7.9 倍**、ベンガル語は **15.3 倍**、ほとんどの西欧言語は 2 倍以下にとどまります。メカニズムは複合的です。非ラテン文字はより多くのトークンに分割され、より多くのトークンがメモリを消費してバッチを小さくし、小さいバッチがトークンあたりのエネルギーを上げます——そしてこの格差はより大きなモデルでも、プロセッサを変えても持続します。精度の罰も同行します。「通常より多くのエネルギーを消費する言語は、モデル出力の精度も低くなりがちです」と Deng。彼らの計算（Ethnologue データと合わせ）では、約 **52 億人**が母語で AI を使うために 2 倍以上のエネルギーを払っています。

**Why it matters:** 「二重の罰」——同じ質問に、より高いコストとより低い品質——は物理法則ではなく価格構造です。著者の修正策（言語別モデル、英語への翻訳パイプライン）はすべてエンジニアリングの選択です。多言語ユーザーにサービスするすべての人にとって、この論文は言語別の価格設定の前に走るべき測定です。

[`🔗 ミシガン大学ニュース：Generative AI uses more energy on non-English text`](https://news.umich.edu/generative-ai-uses-more-energy-on-non-english-text/) · [`🔗 論文：The Language-Energy Divide（arXiv 2606.21869）`](https://arxiv.org/abs/2606.21869) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50441444)

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

## 21. SpaceX が Starship 本体をキャッチ：Flight 15 は初のタワーによる上段捕獲で幕を閉じる——ブースターの捕獲は中断

- **Velocity:** ▮▮▮ trending
- **Source:** spacex.com · 871+ pts on HN · 7h ago (~05:03 UTC+8)
- **Tags:** `spacex` `starship` `flight-15` `reusability`

Flight 15 は打ち上げ前の計画どおりに幕を閉じました。発射タワーが **Starship 上段** をキャッチ——SpaceX が船体そのものをキャッチしたのはこれが初めてで、この 2 年間捕獲してきたのは Super Heavy ブースターだけでした。計画されていた **ダブルキャッチ** は実現しませんでした。飛行スレッドによると、ブースターは期待より低性能（ブーストバック中に 1 基のエンジンが異常、着陸映像には「エンジン・リッチ」の緑がかった噴射）で、GNC が自律的にキャッチを中止してメキシコ湾への軟着陸に迂回——着水時に飛行中止システムが作動しました。Musk の飛行後まとめはブースターは燃料が少なく、タワーを爆発で賭ける気分ではなかった——ブースターはタワーより安い、というのです。船体のキャッチは美しく決まり、コメント者はこれこそが要点だったと指摘します。「この開発段階で本当に面白いのは船のキャッチです」。

**Why it matters:** ブースターの再利用は経済性が証明済みです。船体の再利用は高速反復ループの欠けた半分です。上段がいつも残骸で帰る機体は積み重ねて再飛行できません。今日のキャッチはタワーが船を受け止められる最初の証明であり、まさに下の項目 31 の軌道データセンター可能性計算が Starship の価格を置いている再利用マイルストーンです。

[`🔗 SpaceX：Starship Flight 15`](https://www.spacex.com/launches/starship-flight-15) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50500963)

---

## 22. 全土的な離陸停止の原因が判明：銅線から光ファイバーへの切り替え工事の失敗——工事中のルーターが航空管制システムにデータを洪水的に送信

- **Velocity:** ▮▮ rising
- **Source:** bbc.co.uk · 37+ pts on HN · 10h ago (~02:03 UTC+8)
- **Tags:** `faa` `ground-stop` `l3harris` `infrastructure`

2026-11-14 に報じた FAA 全土離陸停止（「原因不明」）の続報です。交通長官 Sean Duffy は、停止が請負業者 **L3Harris** による FAA 航空域通信の **銅線から光ファイバーへの転換** に遡ると説明しました。工事中だったルーターが「他の航空交通管制システムへのデータ送出を始め」、安全のため空域を閉鎖せざるを得ませんでした。当局は「悪意のあるものの証拠はゼロ、AI に関係する証拠もゼロ」（FAA 長官 Bryan Bedford）とし、サイバー攻撃ではないとの認識です。金曜の停止は 9/11 以来最長で、混乱は数日続く見込みです。L3Harris は停止前に刷新作業の **70% 以上** を完了していたと述べ、「FAA の調査を支援している」としています。

**Why it matters:** この障害モードはそのままチェックリスト項目です。稼働中の安全重要通信系での切り替えが、施工トラフィックを本番 ATC システムに漏らしました。インフラ移行を運用するすべての人への無料の事例研究です——転換はシャドウ環境で行い、緊急停止スイッチを用意する。そして政府の「悪意なし」の結論は、退屈な原因がたいてい本当の原因だという教訓でもあります。

[`🔗 BBC：Copper wire upgrade caused nationwide flight suspension`](https://www.bbc.co.uk/news/articles/c6wy9lynq4qno) · [`🔗 L3Harris の 11/13 離陸停止に関する声明`](https://www.l3harris.com/newsroom/press-release/2026/11/l3harris-statement-nov-13-ground-stop)

---

## 23. EFF が第六巡区控訴裁判所に ALPR データベース検索の令状要件を求める——US v. Sturdivant

- **Velocity:** ▮▮ rising
- **Source:** eff.org · 81+ pts on HN · 2h ago (~10:03 UTC+8)
- **Tags:** `eff` `alpr` `surveillance` `fourth-amendment`

EFF と ACLU は 11 月 14 日、第六巡区控訴裁判所の **United States v. Sturdivant** に amicus brief を提出しました。クリーブランド警察は強盗容疑者の車のメーカー/モデル/色しか知らないまま、2 つの ALPR データベース——**Flock と ELSAG**——を無制限に検索し、被告の車が犯行現場付近にいたことを突き止めて逮捕しました。地裁判決は、Sturdivant はナンバープレート番号について「公衆が観察できるものだから」合理的なプライバシー期待を持たない、としました。意見書は大規模なプレート追跡が第四修正案の「捜索」にあたると論じます——ALPR は法執行機関に「ボタン一つで容疑者（やその他誰でも）の過去の移動を視える仮想タイムマシン」を与える——そして先月、連邦地裁も ALPR を「一種の無差別 mass surveillance」と認めたことに触れています。

**Why it matters:** 昨日のフィードはキャンパスの Flock 撤去運動——ALPR をめぐる契約の戦線——を扱いました。Sturdivant は司法の戦線で、両者は同じ問いに収束しつつあります。公道から作られたデータベースの照会に、相応の理由（probable cause）が必要か。第六巡区の答えは 4 州分のプレートリーダー導入を拘束します。

[`🔗 EFF：We're Asking an Appeals Court to Require a Warrant for ALPR Searches`](https://www.eff.org/deeplinks/2026/11/were-asking-appeals-court-require-warrant-alpr-searches) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50503255)

---

## 24. Dokploy の 9.9：認証済み組織メンバーがバックアップの `serviceName` をホストの root に変える

- **Velocity:** ▮▮ rising
- **Source:** CVE-2026-129433（VulnCheck CNA 割当）· レコード公開 約 20h 前（~20:32 UTC+8、11 月 14 日）
- **Tags:** `dokploy` `cve` `command-injection` `self-hosted`

**CVE-2026-129433**（CVSS 3.1 **9.9**、VulnCheck CNA 割当。NVD は `Deferred`、公開 2026-11-14T12:32Z）：**0.31.1 未満** の Dokploy は `getComposeContainerCommand()` に OS コマンドインジェクションを抱えています。認証済み組織メンバーが `backup.create` または `backup.update` tRPC プロシージャ経由でシェルメタ文字を含む `serviceName` を保存でき、予定バックアップの実行時にペイロードが **root として実行** され、ホストを完全に乗っ取られます。プロジェクトは **v0.31.1** で修正（11/12 リリース、11/13 に v0.31.2）。レコードは GHSA-j329-jw7j-rxjm、PR #5908、コミット `b24006e` をリンクしています。Dokploy はセルフホスト PaaS——人々が自分のインフラを持ちたいからこそデプロイし、そして管理ポートを公開インターネットに置いたままにする類の箱です。

**Why it matters:** このパターンはこのフィードが扱ったすべてのセルフホスト プラットフォーム CVE で繰り返されています。識別子であるべきパラメータがシェルに流れ込む。Dokploy を動かしているなら、確認は 1 行です——バージョン ≥ 0.31.1 か？次の Dokploy を作る人への教訓も同じです。識別子はシェル引数ではない。認証があっても、です。

[`🔗 GHSA-j329-jw7j-rxjm（Dokploy セキュリティ勧告）`](https://github.com/Dokploy/dokploy/security/advisories/GHSA-j329-jw7j-rxjm) · [`🔗 Release v0.31.1`](https://github.com/Dokploy/dokploy/releases/tag/v0.31.1) · [`🔗 CVE-2026-129433 レコード`](https://www.cve.org/CVERecord?id=CVE-2026-129433)

---

## 25. 「アセンブラを通したことは——一度もない」：Woz は紙の上で Apple 初の BASIC を手で書き手でアセンブルした。掘り起こされた Q&A がその方法を確定させる

- **Velocity:** ▮▮ rising
- **Source:** retrocomputing.stackexchange.com · 137+ pts on HN · 6h ago (~06:03 UTC+8)
- **Tags:** `wozniak` `basic` `6502` `history`

2021 年の retrocomputing StackExchange の質問——「Woz はどうやってコンピュータを組み上げる前に Apple 1 BASIC を書いたのか？」——が今日 HN の front を取りました（17,308 ビュー、最良回答 82 点）。Wozniak 本人の講演から組み立てられた答え：彼は Integer BASIC を **6502 向けに紙の上で書き、すべての命令を手でアセンブル** しました。アセンブラはなく、勤務先の HP なら払えるタイムシェアの課金を個人は払えなかったからです。「命令をページの右側に書き、アドレスを左側に書いて……私はそこに座って自分でアセンブルしていました」。そして議論を終わらせる一文：**「初期の Apple II に同梱した BASIC は、アセンブラを通したことが——一度もない。手書きのコピーは 1 部だけ。すべて手書き、すべて手アセンブルでした」**（1986 年 Apple World Convention 講演、Apple II History サイト経由）。

**Why it matters:** 手アセンブルの逸話はたいてい神話の隣にあります。これは著者自身の声で裏付けがあり、1976 年の「道具がない」とは何を意味したかの校正点にもなります——一人と、メモ帳と、6502 のオペコード表。今週の AI 生成ツール類の項目の物差しも替わります。「インタプリタを書いた」と「インタプリタを出荷した」の間の距離は、かつて手書きの枚数で測られていたのです。

[`🔗 Retrocomputing.SE：How did Woz write the Apple 1 BASIC?`](https://retrocomputing.stackexchange.com/questions/17957) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50501594)

---

## 26. The Claude Delusion：なぜプログラマは「私と同じ」を「超人」として聞くのか

- **Velocity:** ▮▮ rising
- **Source:** netmeister.org · 146+ pts on HN · 15h ago (~13:03 UTC+8、11 月 14 日)
- **Tags:** `ai` `critique` `dunning-kruger` `discourse`

Jan Schaumann のエッセイ（11/13）は、AI 論の中の特定の文型——Claude コーディングモデルは「**私と同じくらい** うまい」、ゆえに「コーディングにおいて超人」——を分解し、その推論が測定ではなく錯覚的優越性の産物だと論じます。希少なスキルにアイデンティティを置く人にとって、自分の水準に近づくものは構成上、人間を超えて見える。彼の事例研究は、Gates が自身で作った AP Biology の問題に GPT-4 が満点を取って「衝撃を受けた」と語った場面です。傲慢なのは、自分の作った問題が「AI の真の能力」を測ると前提した点です。エッセイはそこから、破滅論とユートピア論を同じ心理学の異なる衣装として読み、「区別的スキルとしてのプログラミング」が一世代の技術者に何を意味したかで閉じます。

**Why it matters:** このフィードは毎週モデルの実力主張を報じています。これはそれを読むときに通すべきフィルタです。トップ人間専門家に匹敵するという主張は、**分布** についての主張であり、それを口にする人はその分布の無作為サンプルではほぼない——フィード項目を書いている私たち自身も含めて。

[`🔗 Jan Schaumann：The Claude Delusion`](https://www.netmeister.org/blog/claude-delusion.html) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50496921)

---

## 27. HN が Baude 事件を掘り起こす：ページ番号の付け直しを頼んだ Claude が 1 年分の講義ノートを削除——Dropbox から復旧

- **Velocity:** ▮ steady
- **Source:** tomshardware.com · 44+ pts on HN · 10h ago (~02:03 UTC+8)
- **Tags:** `claude` `agent-safety` `file-deletion` `backup`

シカゴ大学の Harry Kalven, Jr. 証法教授 William Baude は 11 月 5 日にこう書きました。「昨日、昼食に行っている間に、Claude が憲法の講義ノート 1 年分と現行のシラバスを削除しました」。彼はエージェントに古い講義ノートのページ番号更新を頼み、戻ると自白が残っていました：**「誤って Fall 2026 FINAL syllabus .doc と、すべてのトップレベルの Class N 2023 ノートを削除しました。復元されていません」**。ファイルは後で Dropbox から復旧し、Baude はこの話を公益告知として共有しました。HN は今日これを掘り起こし（44 点、コメント 62 で増加中）、なぜエージェントが代替不能なファイルへの書き込み権限を持つのかを議論しています。

**Why it matters:** エージェントがファイルを削除するクラスは繰り返し起きています（放送 2 週間前のシーズン編集を消したエージェント、9 秒でデータベースを落としたエージェント）。そして毎回の検証は同じ退屈な修正に行き着きます。エージェントが触れるものにスナップショットがない状態をなくす。モデルの自己申告——謝罪を含めて——を信じるより、エージェントが見るすべてにバージョン管理を敷くほうが安いのです。

[`🔗 Tom's Hardware：Rogue Claude AI deletes law professor's syllabus, one year of lecture notes`](https://www.tomshardware.com/tech-industry/artificial-intelligence/rogue-claude-ai-tasked-with-renumbering-pages-accidentally-deletes-law-professors-entire-syllabus-one-year-of-lecture-notes-youre-right-to-be-angry-i-deleted-your-files-through-my-own-carelessness-humbled-agent-admits) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50499114)

---

## 28. create-ecdh ≤ 4.0.4 はブラウザ経路でピア鍵の検証を飛ばしていた——invalid-curve ECDH、レコード公開と同じ日に修正

- **Velocity:** ▮ steady
- **Source:** CVE-2026-129319（harborist CNA 割当）· レコード公開 11 月 14 日、修正 4.0.5 は同朝 npm へ
- **Tags:** `npm` `create-ecdh` `crypto` `supply-chain`

**CVE-2026-129319**（CVSS 4.0 **8.2**、CNA は harborist。NVD は `Received`）：`create-ecdh`——Node の `crypto.createECDH` の browserify 実装で、ブラウザバンドラが取り込み、ネイティブ crypto のない Node バージョンでも動く——は `computeSecret`/`setPublicKey` で **相手の公開鍵** を検証していませんでした。攻撃者が渡した点は、設定された曲線上にあることも素数位数の部分群に属することも確認されずに、あなたの秘密鍵で乗算されます。これは教科書的な invalid-curve/小部分群攻撃のクラスで、問いを繰り返せば静的鍵を復元する方程式が蓄積します。npm は 11 月 14 日 06:47 UTC に **4.0.5** を出しました——CVE レコードの公開（06:48Z）の 1 分前。当日修正です。

**Why it matters:** このライブラリは browserify 時代の古い糊ですが、暗号経路にある古い推移依存は、まさに Electron/webview バンドルの中で何年も生き延びるタイプです。バンドルに `create-ecdh` が含まれるなら 4.0.5 に上げてください。そして、このレコードが稼いだ疑いの目で、手書きの ECDH ピア点処理を眺め直しましょう。

[`🔗 CVE-2026-129319 レコード`](https://www.cve.org/CVERecord?id=CVE-2026-129319) · [`🔗 npm：create-ecdh`](https://www.npmjs.com/package/create-ecdh)

---

## 29. PC が起動できる ZIP アーカイブ：ブートセクタはローカルファイルヘッダの中に隠れる——しかもアーカイブは普通に展開できる

- **Velocity:** ▮ steady
- **Source:** goliath32.com · 59+ pts on HN · 12h ago (~00:03 UTC+8)
- **Tags:** `zip` `bootsector` `polyglot` `linux`

初期ユーザースペースについてのデバッグセッションが、シャワーでの思いつきになりました。ZIP はまさにポリグロットの細工に適した形式です（"Way back when, self extracting ZIP archives where a thing, EXE/ZIP polyglots that can be run and unpack themselves"）。そして「標準の CPIO ツールはおそらく太陽の下で最も呪われたアーカイバ」。出来上がった成果物は `boot.zip`：完全に正常な ZIP です——`unzip -t` は通過し、ゼロから自分自身をビルドするのに必要なソースコードまで同梱しています——なのにその先頭バイトは、有効な ZIP **ローカルファイルヘッダ** であると同時に起動可能イメージでもあります。ヘッダのフィールドには Multiboot マジック `1BADB002` と 16 ビットリアルモードのブートコードが隠されており、だからこそ `file` はこれを DOS/MBR ブートセクタと報告するのです。エッセイはバイトレベルの構築を歩き、アーカイブをダウンロード付きで公開しています。11-11 にこのフィードが扱った tar パーサの拷問テストと同じ職芸の一族で、fuzz 側ではなく建造側から見たものです。

**Why it matters:** 形式ポリグロットは「2 つのパーサがどこで食い違うか」を学ぶ最もきれいな方法です。ここではブートローダが、unzip には構造体として見えるバイトをコードとして読み、どちらの解釈ももう一方を壊しません。ついでに本当に楽しい一晩プロジェクトでもあります。成果物は起動します。

[`🔗 goliath32：Creating a self booting ZIP archive`](https://goliath32.com/blog/ziphead.html) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50498295)

---

## 30. 自分だけの分散型メッセンジャープロトコルの設計方法——フェデレーション、署名付きサーバ、そして「シンプル版」がすでに難しい理由

- **Velocity:** ▮ steady
- **Source:** karboosx.net · 63+ pts on HN · 12h ago (~00:03 UTC+8)
- **Tags:** `messaging` `e2ee` `protocol-design` `federation`

最小の **フェデレーテッドでエンドツーエンド暗号化のテキストメッセンジャープロトコル** をゼロから作る長文ウォークスルー（karboosx、11/14）：まず要件（サーバは暗号文しか見ない、自称ドメインを盲信しない、添付/グループ/マルチデバイス/既読はあえて捨てる——「90 年代へようこそ！」）、次に設計判断を一つずつ。ユーザー ID、MX 風のサーバ発見、そしてサーバ間フェデレーションではすべての越境リクエストが、送信元ドメインの支配を証明できる鍵による署名を要求します。エッセイの価値はその禁欲にあります。便利機能をすべて拒否することで、クライアントコードの 1 行が書かれる前に、難しい問題がどこに住んでいるかを正確に晒すのです。

**Why it matters:** 一つのプロトコルを正直に設計して読むことは、Matrix や ActivityPub が実際に何のために支払っているかを理解する最速の道です。エージェントシステムに「シンプルなチャット層」を足そうとしている人への最良の出発前読み物でもあります。それはフェデレーションに、難しい部分の全部を足す作業です。

[`🔗 karboosx：How to Create Your Own Decentralized Messenger Protocol`](https://karboosx.net/post/5j7jdDM3/how-to-create-your-own-decentralized-messenger-protocol) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50498073)

---

## 31. AI データセンターは本当に宇宙に行くのか？冷静な実現可能性の読み解き——そしてそれは Starship に価格を置いている

- **Velocity:** ▮ steady
- **Source:** forethought.org · 61+ pts on HN · 10h ago (~02:03 UTC+8)
- **Tags:** `data-centers` `orbital` `starship` `energy`

Forethought の研究ノート（11/14）は、Musk の主張——「AI を置く場所として最もコストが低いのは宇宙になる……2 年、3 年以内に」——を気分ではなく計算します。軌道データセンターには現実のエネルギー論拠があります（適切な軌道での一定した強い日光、許認可の待ち行列なし、進行中の環境負荷は少ない）。しかしコスト競争力の主張は「**ほぼ完全に、Starship が SpaceX が Falcon で達成したのと同等の再利用性を実現できるかにかかっている**」——宇宙太陽光はおよそ **$250/kg の軌道投入** で現在のオフグッド地面電力と並び、**$50/kg** 前後で現行のあらゆる地上エネルギー源を上回ります。ノートは自らを「ハイプと現実を切り分ける」枠組みと位置づけています。この主張が予定どおりに実現すれば AI ガバナンスを形作り直すものだからです。

**Why it matters:** これは項目 21 の正しい companion 読み物です。今日の初の船体キャッチは、この分析がすべてがかかっていると言う曲線上の 1 つのデータポイントです。そしてこのノートの正直なコストの枠組み（レンダリングではなく、kg あたりの打ち上げ価格）こそ、これから続くすべての「AI を宇宙へ」の発表を読む方法です。

[`🔗 Forethought：Will we really put data centers in space?`](https://www.forethought.org/research/will-we-really-put-data-centers-in-space) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50498945)

---

## 32. DRAM 供給カルテル集団訴訟、却下モーションが棄却——Samsung・SK Hynix・Micron は DDR5 不足について答えることに

- **Velocity:** ▮▮▮ trending
- **Source:** litnews.ai · 221+ pts on HN · 10.8h ago (~09:18 UTC+8)
- **Tags:** `dram` `antitrust` `memory-prices` `litigation`

11 月 14 日、カリフォルニア北部地区連邦地裁の Noël Wise 判事は、Samsung・SK Hynix・Micron が「"to cut supply of conventional DRAM, such as DDR5, and shift capacity to HBM"（DDR5 など従来型 DRAM の供給を減らし、容量を HBM に振り替える）」ための共謀を狙う proposed 集団訴訟に対する共同却下モーションを**全面的に棄却**した。この Sherman 法第 1 条の主張が生き残ったのは、まさに今が 2022 年に同じ 3 社を被告にした前回のカルテル訴訟を第九巡回区が棄却した DRAM II 判例とは異なるからだ。訴状の支援的アルゴリズムは、メモリ購入者がこの数週間体験してきたことのリストになっている：HBM の長期ロックアップ、従来型 DRAM の長期契約拒否、Micron による Crucial ブランド閉鎖、ファブ遅延、記録的な価格下でも増産しなかったこと、ほぼ同一の顧客審査、そして 3 社の過去のカルテル歴。判事は原告の他の 3 つの論点（「供給規律」を語る投資家声明、業界会議での面会、3 社寡占の市場構造）には重みを与えなかった。答弁書は 2026 年 12 月 7 日が期限。

**Why it matters:** このフィードは今週ずっと買い手側から DRAM 価格高騰を報じてきた（RAM Altman、Raspberry Pi の 80 ドル値上がり）。この決定は供給側の物語を法廷の証拠開示段階に進めた——被告が宣誓の下で答えねばならない主張には、長期契約の拒否や記録的価格下での増産拒否が含まれる。検証までには何年もかかるが、枠組みは確定した：従来型 DRAM の希少性は事故ではなく戦略だった可能性があるという主張だ。

[`🔗 LitNews：Judge Refuses to Dismiss DRAM Supply Conspiracy Suit`](https://litnews.ai/articles/garciaguirre-samsung-sk-hynix-micron-dram-conspiracy-suit-survives-dismissal) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50502988)

---

## 33. Modern Web Guidance がソースを公開：オーサリング/評価リポジトリが +1,220★ で当日の GitHub 伸び率 1 位に

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub Trending · +1,220★ today · 6.6k total
- **Tags:** `modern-web-guidance` `agent-skills` `evals` `governance`

2026-11-13 に Modern Web Guidance v1.0.0（Chrome・Edge・Firefox・MDN チームによるコーディングエージェント向けスキル）を取り上げた続き：プロジェクトの姉妹**ソースリポジトリ** `GoogleChrome/modern-web-guidance-src` が当日の GitHub Trending 最大ゲイナーになった（本日 +1,220★、計 6,555★）。コンシューマリポジトリのローンチ波からわずか 2 日後だ。README は分担を明確に語る："This repo is the source repository for GoogleChrome/modern-web-guidance and includes the code and documentation for **authoring, calibrating, and evaluating** its contents."——つまりコンシューマリポジトリの背後に隠れていた部分がすべて閲覧可能になった：ガイダンスの主張を支える評価ハーネスとダッシュボード、ベンダー横断の運営がどう機能するかを示す `GOVERNANCE.md`、Web プラットフォームの専門知識をスキルコンテンツに変換するオーサリングパイプライン。開発は活発（コミットは 11 月 14 日まで）。

**Why it matters:** このフィードは繰り返し指摘してきた——agent-skills プロジェクトの死命は、そのガイダンスが測定されているか、感覚かにある。キャリブレーション/評価パイプラインの公開——しかも公開ダッシュボード付き——はその説明責任の半分であり、SKILL.md ファイルと祈りしか出さない他のスキルコレクションがほぼ持っていないものだ。急上昇はコミュニティがそれに同意している証拠だ。

[`🔗 GoogleChrome/modern-web-guidance-src`](https://github.com/GoogleChrome/modern-web-guidance-src) · [`🔗 評価ダッシュボード`](https://googlechrome.github.io/modern-web-guidance-src/)

---

## 34. EFF：テック企業は再びプライバシーという概念そのもののすり替えを図っている——558 ポイント

- **Velocity:** ▮▮ rising
- **Source:** eff.org · 558+ pts on HN · 23.3h ago (~20:45 UTC+8, Nov 14)
- **Tags:** `privacy` `wearables` `always-on-recording` `bystanders`

Thorin Klosowski による EFF のエッセイ（11 月 13 日）は、プライバシー業界最古の話術——監視を「個人の選択」として再パッケージする——が、常時稼働の AI ハードウェアによって再演されていると論じる："Privacy, which companies were once happy to claim was all about personal choice, is now primed to affect everyone around you even more than it already did." 例として挙げられるのは思想実験ではなくすべて出荷済みの製品：Meta と Google のスマートグラスが着用者の見ているものを記録し AI が描写すること、**Apple の Audio Intelligence** がすべての Apple Watch を一日を記録・要約するデバイスに変えること、Amazon の Bee がすべてを録音・文字起こしすること。エッセイの論点は構造的だ：マイクとカメラを他人が身につけているとき、使わないことで自保するという助言はもはや従えなくなる——傍観者には設定ページがない。

**Why it matters:** これは本日の項目 23 の ALPR 闘争の一般版だ。どちらも、自分が制御できないデバイスに記録されることについての話だ。ウェアラブル/アンビエント AI を開発・展開する者にとって、このエッセイは法廷で検証されようとしている同意モデルのチェックリストだ——部屋の中で権利を持つのは記録デバイスの所有者だけではない。

[`🔗 EFF：Tech Companies Are Trying to Shift the Entire Concept of Privacy (Again)`](https://www.eff.org/deeplinks/2026/11/tech-companies-are-trying-shift-entire-concept-privacy-again) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50496602)

---

## 35. Claude Code Projects が再浮上：ゴールを記述すればコーディネーターが残りを捌く——Boris Cherny が HN の質問に直接回答

- **Velocity:** ▮▮ rising
- **Source:** claude.com · 98+ pts on HN · 35.6h ago (~08:28 UTC+8, Nov 14)
- **Tags:** `claude-code` `orchestration` `parallel-agents` `anthropic`

今週の HN の波が捉えたのは Anthropic が再設計した **Claude Code Projects**——記事自体の日付は 9 月 17 日だが、ベータ版の Claude Code への展開が今週末 98 ポイント・93 コメントを集めた理由だ。そのモデルは："Claude scopes the request, delegates the work, coordinates parallel threads, reviews the outputs, and assembles the finished result." 記事の 2 つの例：チェックアウトの p75 レイテンシ削減をゴールに設定すれば、Claude が各エンドポイントをプロファイリングし、最適化をテストし、並列スレッドで PR を開く。API・Web・モバイルのリポジトリを接続し、非推奨の v1 エンドポイントの退役をゴールにすれば、リポジトリごとにスレッドを作り、呼び出し元を移行し、テストを回し、どの PR を先にマージすべきか教えてくれる。進捗はスマホから操舵でき、PC を離れても作業は続く。スレッドでは Boris Cherny（"Projects are how I write pretty much all my code these days"）が設計の質問に直接答えた。

**Why it matters:** オーケストレータ層がメインストリームのコーディングハーネス内に到達した——このフィードがサードパーティツール（LoopForge、OpenBot、herdr）で追ってきたのと同じコーディネーター・プラス・並列ワーカーの形がネイティブになった。そして予想通りの HN の反動も一緒に：あるコメント投稿者は、些細な質問に 7 つのサブエージェントが生出されて 10 分でクォータを使い果たすのを見た。

[`🔗 Anthropic：Projects redesigned — from folder to conversation`](https://claude.com/resources/articles/projects-redesigned) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50492141)

---

## 36. Microsoft の FORGE Lab が Rust 標準ライブラリのメモリ安全性バグを発見——安全な Rust のみで未定義動作が起こるケースを、AI スキャナが見つけた

- **Velocity:** ▮▮ rising
- **Source:** forge-blog.github.io · 161+ pts on HN · 54.7h ago (~13:22 UTC+8, Nov 13)
- **Tags:** `rust` `memory-safety` `ai-scanning` `vulnerability-research`

Microsoft の FORGE Lab（Yechan Bae、11 月 9 日）は Rust の `std` と `core` に複数のメモリ安全性問題を報告した——"including cases where code written **entirely in safe Rust** can trigger undefined behavior"——同ラボの AI 脆弱性スキャナ **Hyenas**（codename MDASH の研究版）による発見で、その後再現され Rust メンテナとともに報告・修正された。記事はバグを unsafe コードにおける 3 つの誤った信頼に分類する：**コードがパニックしないと信じること**（不変条件が関数の途中でパニックに破られる）、**ユーザー提供の実装が正しいと信じること**（不正な比較器や trait 実装が unsafe コードの前提を壊す）、**根底のシステムを信じること**。具体例がひとつ：`join()`——CVE-2020-36323 の古い修正は呼び出し間で伸びる文字列をカバーしておらず、2026 年 4 月に残り長さ計算がアンダーフローしてヒープオーバーフローに至り、同じ関数が再修正を要した。一部の報告はまだ未解決のままだ。

**Why it matters:** 2 つのことが同時に起きている：Rust の保証が実際にどこで漏れるかの分類学（境界は FFI ではない——パニックと、trait 実装と、OS の仮定だ）、そして「AI が本物の脆弱性を見つける」シリーズのもうひとつのデータポイント——スキャナが地上で最もレビューされたコードベースのひとつから soundness バグを見つけ、その修正は全員のコンテナが積んでいる std に展開されつつある。

[`🔗 FORGE Lab：Memory Safety Bugs in Rust Standard Library`](https://forge-blog.github.io/posts/rust-std-memory-safety/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50478701)

---

## 37. Kiri が v0.2.1 をリリース：Apache-2.0 の Docker Desktop 代替が 8 倍速い `docker run` を主張——スレッドの懐疑論も添えて

- **Velocity:** ▮▮ rising
- **Source:** Show HN · 59+ pts · 7.4h ago (~12:40 UTC+8)
- **Tags:** `kiri` `containers` `docker` `rust`

Kiri（libracoder/kiri、Rust、Apache-2.0、11 月 2 日作成、4.7k スター、v0.2.1 は本日リリース）は、単一デーモンで Docker コンテナを走らせる Mac/Windows/Linux 向けデスクトップコンテナランタイムだ——docker CLI・Compose・Docker API はそのまま動き、"docker run takes 22 ms on Kiri and 178 ms on Docker Desktop (152 ms on Colima, 279 ms on OrbStack), every engine on 2 CPUs and 8 GB" を主張する。コンテナのほかに、イメージのビルドとスキャン、Kubernetes、Linux マシン全体の実行ができ、無料の Ngrok 代替をうたうトンネル機能を内蔵する。HN スレッドの「証拠」は主張と併読する価値がある：約 20 万行が約 2 週間で出現（コメント投稿者が AI 生成と読む em ダッシュの痕跡つき）、サイトの CPU/メモリ表はまだ "Measured numbers replace these soon" と書かれたまま、Podman 代替ページは Podman の計測なしで比較しており、8 倍とはコンテナの*起動*レイテンシであってスループットではない。

**Why it matters:** Mac のコンテナランタイム枠（OrbStack/Colima/Docker Desktop）は実際に争われている位置で、単一デーモンの緩いライセンスの Rust 製新規参加者は本物のアーキテクチャ主張だ——しかし 13 日齢のプロジェクトで、看板ベンチマークはコールドスタートの数字なので、「有望、未証明」にファイリングし、約束された実測表が出てから切り替えを判断すること。

[`🔗 libracoder/kiri`](https://github.com/libracoder/kiri) · [`🔗 Kiri サイトとベンチマーク`](https://runkiri.com/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50504077)

---

## 38. Veyra-NRVideo：+731★、キャプチャーカードの映像に GPU パイプラインで補間フレームを生成——GTA6 の見出しはマーケティング

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · +731★ today · 2.6k total
- **Tags:** `veyra` `video-processing` `frame-generation` `upscaling`

Likely7/Veyra-NRVideo（GPL-3.0、C++、9 月 9 日作成、208 fork）は本日、まだこのフィードで扱っていない中で最大の GitHub Trending の新顔だ。README の自己認識はトレンドの釣り見出しより地に足がついている："Turn local video, capture cards and game streaming into one real-time GPU enhancement pipeline"——スーパー解像度・デノイズ・HDR・フレーム生成を Windows 上で流れてくるものすべてにリアルタイムで適用し、動画ファイル・画像・キャプチャーカードソースのリアルタイムプレビューに対応。釣り見出しの「Bring PS5 GTA6 to 120FPS with DLSS 5」が意味するのは、コンソールゲームの*キャプチャされた*映像に AI 超解像とフレーム補間をかけることであって、ゲームの描画を速くすることではない。作者（@likely2002）は YouTube と Bilibili の英語・中国語チュートリアルで普及を進めている。

**Why it matters:** キャプチャストリームへの外付けフレーム生成は、今や実在する製品カテゴリだ——アップグレードできないハードウェア（コンソール）で、追加レイテンシと引き換えに滑らかさを買う、エンジン内 DLSS/FSR と正反対のトレードだ。GPL-3.0 実装がバズったことは、キャプチャ系パイプラインを作るすべての人に見る価値がある。恒例の注意つき：補間フレームはモデルの推測であり、入力レイテンシがその代金を徴収する場所だ。

[`🔗 Likely7/Veyra-NRVideo`](https://github.com/Likely7/Veyra-NRVideo) · [`🔗 README とチュートリアル`](https://github.com/Likely7/Veyra-NRVideo#readme)

---

## 39. 「Actor, Judge, or Teacher?」：行動が下手な意思決定モデルでも教えるのはうまい——ALFWorld で採点によって +10 ポイント

- **Velocity:** ▮ steady
- **Source:** arXiv 2611.17167 · Hugging Face daily papers (Nov 13)
- **Tags:** `decision-models` `agents` `rl` `research`

Hugging Face のデイリーランキングを飾る論文（11 月 12 日公開）は"whether a decision model that acts poorly can still teach well"を問う。意思決定モデル——型付き出力と確率で答えるモデル。このフィードが Gemini の Decisions API や Flide のサービング層として追ってきた形だ——は通常*アクター*として評価されてきた。著者ら（Haochen Liu ら）は ALFWorld 上で 3 つの意思決定モデルと 3 つの汎用 LLM をアクターおよびジャッジとして比較し、JEV を ALFWorld と WebShop のティーチャーとして使った。発見はきれいに二分される：アクターとしては、6 モデルすべてが必須の先行サブゴールからより簡単なものへと釣られて外れる。軌跡全体を見るジャッジとしては、同じモデル群がそのサブゴールに向かうステップを正しく評価する——そして「タスクは成功するか」ではなく「*各アクションが助けになったか*」を問うことで、有用なアクションと無用なアクションを分離できる。ティーチャーとしては、JEV が Qwen2.5-1.5B のポリシーを GRPO から ALFWorld で **72.8% → 82.9%**、WebShop で **56.8% → 71.4%** へ引き上げた。解釈：エピソード終了後に判定すれば、行動時に予測していなければならない結果が見える。コードは公開済み。

**Why it matters:** この論文は意思決定モデルカテゴリに、証拠つきの第 2 の仕事を与える：アクションを選ぶだけでなく、RL 訓練のためにアクションを採点すること——そのポジションでは、弱いが安い意思決定モデルが、勝てない大きなアクターを上回るかもしれない。後知恵のほうが推論が簡単だからだ。

[`🔗 arXiv 2611.17167：Actor, Judge, or Teacher?`](https://arxiv.org/abs/2611.17167) · [`🔗 コード：ZJU-REAL/decision-agents`](https://github.com/ZJU-REAL/decision-agents)

---

## 40. スマホ解錠ツールの解剖：Cellebrite 級フォレンジックは「魔法ではない」——監視研究団体の技術概説が再浮上

- **Velocity:** ▮ steady
- **Source:** osservatorionessuno.org · 114+ pts on HN · 21.3h ago (~22:44 UTC+8, Nov 14)
- **Tags:** `cellebrite` `forensics` `android` `surveillance`

Osservatorio Nessuno の技術概説（5 月 7 日公開、今週末 114 ポイントで HN に）は、商用スマホ解錠ツールの神秘を剥ぐ："Commercial phone unlocking tools are not magic. They exploit the same classes of vulnerabilities that security researchers publish about at conferences and in academic papers." Cellebrite 級製品を特徴づけるのは"not the novelty of the techniques, but the systematic commercialization of exploitation"——ハードウェア/ソフトウェアの組み合わせごとにエクスプロイトを取得・開発し、オペレータの専門知識をほとんど要さない自動化ワークフローにパッケージすることだ。記事は、物理アクセスを持つフォレンジック検査官が辿る制約された攻撃面を地図化する——ブートチェーン、TEE（Trusted Execution Environment）、セキュアエレメント、カーネルの周辺機器ドライバスタック——主に Android の内部構造で、Quarkslab の TEE 研究と Amnesty の報道を基礎としてクレジットしている。

**Why it matters:** 脱神秘化は双方向に効く：防御側に、フォレンジック業界がどの境界を商品化しているのか（次の強化予算はどこに割くべきか）を正確に伝え、訴追に常用されるツールの背後にあるエクスプロイト供給網の、得がたい公開地図を提供する——この地図を描いた団体自身が、Cellebrite のイタリアでの常態的使用を記録してきたところだ。

[`🔗 Osservatorio Nessuno：Demystifying phone unlocking tools`](https://osservatorionessuno.org/blog/2026/05/demystifying-phone-unlocking-tools-a-technical-overview/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50497416)

---

## 41. ソフトウェア職種 104 個の系統樹、1940 年代から「AI Agent / Context Engineer」まで——Claude の助けを借りて、Graphviz ファイルひとつで

- **Velocity:** ▮ steady
- **Source:** zwischenzugs.com · 340+ pts on HN · 18.3h ago (~01:45 UTC+8)
- **Tags:** `careers` `industry-history` `visualization` `graphviz`

Ian Miell（zwischenzugs）は、自分の同じ仕事が Head of DevOps → SRE → プラットフォームエンジニアリングと名前を変えていくのを長年見たのち、"with the help of Mr Claude" で "this family tree of software job titles, from the 1940s to now" を作った。全部で **104 職種**、"from 'Computer' (a person, not a machine) at the top to 'AI Agent / Context Engineer' at the bottom"、5 年ごとの行に 7 つの色分けファミリー列（開発／分析・アーキテクチャ・リーダーシップ／運用／ネットワークとセキュリティ／データと AI／品質とテスト／サポート）で配置。実線の矢印は職種が親から生まれたことを、破線は影響や典型的な転職を意味し、各ノードは解説記事にリンクする。全体は Graphviz ファイルひとつと説明の JSON ファイルひとつで、クリック可能なサイトとしてレンダリングされている。

**Why it matters:** この系統樹は、業界の肩書きの目まぐるしい変遷を流行ではなく系譜として読めるようにする——そしてその終点はこのフィードの守備範囲だ：最新のノードはエージェントのためにコンテキストを書く仕事であり、1940 年には「programmer」、2005 年には「build engineer」と呼ばれた、同じ仕事が新しい上層管理の下で名前だけ変えている。

[`🔗 zwischenzugs：A Family Tree of Software Job Titles`](https://zwischenzugs.com/2026/11/03/a-family-tree-of-software-job-titles/) · [`🔗 インタラクティブな系統樹`](https://ianmiell.github.io/sw-job-title-family-tree/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50499038)

---

## 42. Apache Shiro が本日 9.1 を公開：LDAP 認証キャッシュが初回ログイン後に任意のパスワードを受け入れる——修正版 3.0.1 は 8 月から存在

- **Velocity:** ▮ steady
- **Source:** CVE-2026-129349 (Apache CNA-assigned) · record published 1.8h ago (~18:16 UTC+8)
- **Tags:** `shiro` `cve` `ldap` `authentication`

**CVE-2026-129349**（CVSS **4.0** 9.1、`security@apache.org` による CNA 採点；NVD `Received`、レコード公開 2026-11-15T10:16:53Z）："When authentication caching is enabled on DefaultLdapRealm, after a user logs in successfully once, subsequent logins for that user succeed with **any password**." メカニズムは文字どおりだ：キャッシュされた認証は LDAP バインドをスキップし、`DefaultLdapRealm` がデフォルトでインストールする `AllowAllCredentialsMatcher` は任意の資格情報を受け入れる——有効なユーザー名を知っている者は誰でもそのユーザーとして認証できる。影響範囲は **3.0.1 未満**のすべて。問題はタイミングだ：3.0.1 は **8 月 23 日**にリリース済み（3.0.2 は 11 月 8 日に後続）で、修正は 12 週間存在していたのに、脆弱性を公開するレコードは今日ようやく着地した——しかもこの欠陥はオプトインの認証キャッシュ設定が有効であることを要する。

**Why it matters:** ひとつのレコードに 2 つの教訓：認証判断のキャッシュは、キャッシュしたマッチャーと同じ強度しかない（バインドをスキップするキャッシュヒットが資格情報の検証までスキップしてはならない）。そして「出たばかりの CVE」という見出しにはリリースタイムラインの確認が要る——ここではアップグレードの助言が 8 月から releases ページに転がっていて、今日出荷されたのは*認知*のほうだった。

[`🔗 CVE-2026-129349 レコード`](https://www.cve.org/CVERecord?id=CVE-2026-129349) · [`🔗 Apache Shiro releases (3.0.1 / 3.0.2)`](https://github.com/apache/shiro/releases)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-15T12:24:30Z |
| Items | 42 |
| Sources tracked | 36 (Hacker News, GitHub Trending, Google Research, NVIDIA, PyPI, Project Zero, CBC, Reuters, U-Mich, BBC, EFF, L3Harris, MITRE CVE records, npm, LitNews, Anthropic, Hugging Face, FORGE Lab, Osservatorio Nessuno, vendor blogs and project repos) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[Previous day](2026-11-14.md) · [Raw .md](latest.md) · [Archive](../archive/index.md)
