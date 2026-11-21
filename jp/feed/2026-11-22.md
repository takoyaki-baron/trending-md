---
date: 2026-11-22
updated: 2026-11-21T20:30:36Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 22
license: CC-BY-4.0
---

# Trending — 2026-11-22

## 1. 昨日報じたGRH宣言のその後:Lean証明が認証済み1,700万行のライブラリに——独立実装のカーネルがエクスポート証明を受け入れ

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 569+ pts · ~5.5h ago (~22:40 UTC+8)
- **Tags:** `mathematics` `lean` `riemann-hypothesis` `ai-assisted-proof` `formal-verification`

昨日は相互に競合するGRH主張——Alpögeによる「Leanのみ」の発表(「私はClaudeと共に働き、証明を発見したと信じています」)と、Masulloの全人間ドラフト——を報じた。その後、構造の要となる部分が実際に起こった。LeanコミュニティとMathlibコミュニティが11月21日付の共同認証を発行し、「リーマン仮説のステートメントと証明の両方が正しいことをここに証明する」と宣言したのだ。証明は約1,700万行・175,187モジュールのライブラリで、Andrew Sutherland(MIT)の検証ファイルページ——「チェックはClaude Codeで実行」——にその監査が記録されている。全モジュールがLean v4.33.1でエラーゼロでコンパイルし、5つの主要定理が3つの標準公理(propext、Classical.choice、Quot.sound)のみに依存すること、そしてエクスポートされた証明全体が独立実装の2つのカーネルに受け入れられた——nanoda(Rust、80スレッドで27分42秒)とcon-leche(verifiedモードで1,468,418宣言)であり、その`--compare`モードが公開チャレンジに対して5定理すべてを確認した。lean4leanは175,187モジュールすべてをパスし、エクスポートのsha256はDeicyde/riemann-hypothesisリポジトリが公開したファイルと一致する。2つのチェック(Leanのparanoidカーネル、lake comparator)はまだ実行中で、コミュニティは**数学そのものがまだ理解されていない**ことを明示している。「この証明の新しいアイデアを説明する助けとなるすべての活動を楽しみにしている」。

**なぜ重要か:** 「これは本物か?」という問いの形がこの瞬間に変わった。主張はもはや誰も読めないPDFではなく、独立実装の2つのカーネルが受け入れた成果物(アーティファクト)であり、これは別種の、はるかに強い「真」である。ただし警告は同行する。Scott AaronsonはLeanカーネルに歴史的に0=1の証明を許したバグがあったと指摘し(「これらの問題は緊急に修正されるべきだ」)、認証の数時間後にはgoogle-deepmind配下に`math-horizon`リポジトリが出現し、1日以内に消えた(404)——内容が読めるほど公開されていた期間はなかった。

> 検証ページ自身の誠実な注記:結果は11月21日12:55 UTC更新「時点」のもので、paranoidカーネルとcomparatorの実行はその時点で進行中だった。

[`🔗 Leanコミュニティ認証`](https://leanprover-community.github.io/blog/posts/riemann-hypothesis/) · [`🔗 検証ファイル(Sutherland、MIT)`](https://math.mit.edu/~drew/grh/) · [`🔗 Alpögeの発表(PDF)`](https://alpo.ge/remark.pdf) · [`🔗 Scott Aaronson:確率的オウムはリーマン仮説を証明したらしい`](https://scottaaronson.blog/?p=10344) · [`🔗 HNディスカッション(436コメント)`](https://news.ycombinator.com/item?id=50589618)

---

## 2. Inkling-2-Miniはすでに5.4 GBで動く——量子化コンパイラがメモリ41%減で9.1 GBのGGUFをGSM8KとHumanEvalで上回る

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 160+ pts · ~2.2h ago (~02:00 UTC+8)
- **Tags:** `quantization` `inkling` `local-llm` `apple-silicon`

昨日朝にThinking MachinesのInkling 2 Miniを報じたばかりだが、ShinMegamiBosonのLookAtMyQuant——モデルの各保存部分が出力にどれだけダメージを与えるかを測り、サイズ予算に収まるよう部分ごとに符号を選ぶ量子化コンパイラ——が夜のうちにこの新しい26.4B総パラメータ/5.4B活性のループドMoEを処理した。18.89 GBのBF16オリジナルは**5.38 GB(1.63 bits/weight)**と8.87 GB(2.69)に圧縮され、UnslothのロービットGGUFとの比較が公開されている:5.4 GB版はGSM8Kで134/200、HumanEvalで60/164を記録し、メモリ41%減でUnslothの9.14 GB UD-Q2_K_XL(127と46)を上回る。8.9 GB版はGSM8KでBF16教師モデルに並んだ(148/200)。量子化ファイルはいずれもHugging Faceに公開され、プロジェクトのApple Silicon Metalランタイムで動作し、READMEは179 MBのdrafter併用時のM5 Maxでシリアル73.2 tok/s(中央値125.2、prefill 1,037 tok/s)を報告している。

**なぜ重要か:** リリース週の真新しいオープンウェイトモデルにサードパーティ量子化が追いつくのは、ローカルAIエコシステムが設計通りに機能している証拠だ。そして誠実な表(KL差分、未チューニングのベースライン、教師スコア)は、ありがちなFP16同等を謳うマーケティングより良いテンプレートになる。昨日のノートPC推論の話に、5 GBのエントリポイントが加わった。

[`🔗 LookAtMyQuant(リポジトリと完全レシピ)`](https://github.com/ShinMegamiBoson/lookatmyquant) · [`🔗 Inkling-2-Mini 5.4 GB量子化(Hugging Face)`](https://huggingface.co/shinmegamiboson/Inkling-2-Mini-LookAtMyQuant-5.4GB) · [`🔗 HNディスカッション`](https://news.ycombinator.com/item?id=50591853)

---

## 3. Upload2Shell:Ghostscriptの-dSAFER脱獄、CUPS・Roundcube・WordPressでRCEを確認——研究ページは本日公開、CVEレコードは12日前

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 10+ pts · ~1.8h ago (~02:30 UTC+8)
- **Tags:** `security` `ghostscript` `rce` `cve` `disclosure`

**CVE-2026-125396**に関するpwn.aiの研究ページが本日公開された。これはバグの概説ではなく完全な開示台帳だ。GhostscriptのType 1フォントローダにおけるuse-after-free(`gs_fonts.ps`の`.putgstringcopy`が特権オペレーター`.forceput`をオペランド型のチェックなしに呼ぶ)により、細工した文書が-dSAFERを越え、カスタムエラーハンドラで`.forceput`を再取得し、レンダリングプロセスの権限で攻撃者の選んだコマンドを実行できる。タイムラインが本質だ。7月27日発見、7月30日にGoogleのドキュメントレンダラーで実証、8月12日にWordPressコア修正(CVE-2026-65640)、9月2日に上流Artifex bug 709684を報告、9月8日にGhostscript 10.08.0として修正出荷——その後の下流での確認が続く。Debian 13のCUPSは未認証のIPPジョブを`lp`として実行し、Roundcubeは閲覧メールの添付サムネイル生成時に`www-data`としてコード実行、PleskとDropboxの文書処理経路も確認済み。NVDレコード(2026-11-10公開、`Awaiting Analysis`)にはVulnCheckのCVSS 4.0 **8.5** / 3.1 **7.8**(Secondary)と、CISA-ADP SSVCのexploitation: noneが付く。

**なぜ重要か:** スコアは「High」だが、確認された経路はそれ以上を物語る。Ghostscriptはプリントサーバー、メールスキャナー、画像パイプライン(ImageMagickデリゲート類)の下に見えずに居座っている。つまり露出人口は「Ghostscriptをインストールした人」ではなく「信頼できないファイルをレンダリングするスタックすべて」だ。上流修正は5週間前、下流は数ヶ月遅れ。レコードが今になって出たのは、このフィードが記録し続けているCVE時計の遅延そのものだ。

[`🔗 Upload2Shell研究ページ(pwn.ai)`](https://pwn.ai/upload2shell) · [`🔗 NVDレコード CVE-2026-125396`](https://nvd.nist.gov/vuln/detail/CVE-2026-125396) · [`🔗 HNディスカッション`](https://news.ycombinator.com/item?id=50592097)

---

## 4. モニターがダウンロード速度を75%も削っていた——「ケーブル1本」デスク環境をフレーム単位でデバッグする

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 357+ pts · ~9.8h ago (~18:30 UTC+8)
- **Tags:** `networking` `debugging` `hardware` `usb`

Oscar Molnarの2.5ギガビット対称回線は、Studio Display XDRのイーサネットパススルー経由では600 Mbpsに落ちていた(アップロードは2.4 Gbpsで無傷)。調査は「推測ではなく計測」の模範だ。アダプタとケーブルはMac直挿しでは正常(iperf3で2.3 Gbps)。ディスプレイ経由ではpingが10%失敗するのに、macOSのログにはドロップフレームのエラーが一切ない——「アダプタがコンピュータの知る前にフレームを捨てていた」。答えは二層ある。Realtek RTL8156BをAppleの汎用USBドライバからRealtek公式ドライバに替えると600 Mbps → 1.1 Gbps。さらにUniFiスイッチでフローコントロール(pauseフレーム)を有効にすると約2 Gbpsまで上がる。チップ自身のカウンタによれば、ディスプレイ経由では毎秒約168,000フレーム(約2 Gbps)超で黙ってフレームを捨てており、直挿しなら損失0%だ。著者はそれでもフローコントロールをオフにしたままにしている。バーストを送信側でバッファし、ゲームPCのレイテンシを増やすからだ。

**なぜ重要か:** モニタードックがネットワークのボトルネックになる障害は構造的に無音だ。フレームドロップを記録するログはどこにもなく、ただ回線の4分の1のまま暮らすことになる。この記事は、ほとんどのエンジニアが読める中で最も明快なイーサネットフローコントロールの短い解説にもなり、その手法(固定レートUDP、チップ自身のカウンタを読む)はあらゆる転送が遅い理由を突き止める調査に転用できる。

[`🔗 調査の全文(Tymscarブログ)`](https://blog.tymscar.com/posts/studiodisplayethernet/) · [`🔗 HNディスカッション`](https://news.ycombinator.com/item?id=50587875)

---

## 5. 18日のGPT-6.2報道の続き:AstraとSolがSimpleBenchで人間ベースラインを下回る——一方で5つのライバルは超える

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 144+ pts · ~7.2h ago (~21:05 UTC+8)
- **Tags:** `benchmarks` `gpt-6` `evaluation` `ai-models`

SimpleBenchのリーダーボードに11月18日のリリースが反映され、数字は苛烈だ。**GPT-6.2 Astra Pro 79.2%**(16位)、**GPT-6.2 Astra 77.3%**(17位)、**GPT-6.2 Sol 69.9%**(30位)——GPT-6.2の全バリアントがベンチマークの83.7%という非専門人間ベースラインを下回った。一方、上位の新規エントリはClaude Fable 5.2(94.9%)とGoogleのGemini 4 Neon(94.4%)、Carbon・Argon・Hydrogenが91.7〜92.6%で、人間サンプル9名を超えるモデルが5つになった。SimpleBenchの200問超は空間時間推論、社会的知性、そして「言語的敵対的ロバストネス」を狙う——記憶したパターンが裏切るひっかけ問題だ。ページ自身の興味深い詳細:導入文には「今日の最高モデルであるClaude Fable(81.9%)を含め、テストされたすべてのLLMを上回る」という古い主張が残っており——取り消し線付きだ。新しい波が来る前の化石である。

**なぜ重要か:** 同一リリースに対して2つのベンチマークが正反対の判定を下した。GPT-6.2は公開日にプロバイダアダプタ付きでARC-AGI-3の100%を取り、4日後にはSimpleBenchで高校生以下だ。この乖離は現在の評価危機の縮図であり、ベンチマーク勝利はハーネスの形をしており、「言語的敵対的ロバストネス」は推論ハーネスが測らない何かを測っている。

[`🔗 SimpleBenchリーダーボード`](https://simple-bench.com/) · [`🔗 HNディスカッション(138コメント)`](https://news.ycombinator.com/item?id=50588916)

---

## 6. ロイター:SECのNvidia調査は会計問題の疑いに焦点——2.7兆ドルの下落の中で株価約12%急落

- **Velocity:** ▮▮ rising
- **Source:** Reuters(HN経由)· 298+ pts · ~24h ago(11月21日 ~04:20 UTC+8)
- **Tags:** `nvidia` `regulation` `sec` `industry`

ロイターが関係者2名の話として報じたところによると、Nvidiaに対するSECの執行調査は**会計問題の疑い**に焦点を当てている——調査官が実際に何を調べているかについての初の報道で、CEO ジェンスン・フアングの辞任(11月13日報道)の数日後、FTがNvidiaが四半期売上1040億ドル突破とともにシンガポール売上の開示を止めたと記録した(11月18日報道)翌日にあたる。報道を受けてNvidia株は約12%下落し、Yahoo Financeの試算では下落規模は2.7兆ドル。ナスダックは2026年の上げをすべて消し、WSJはこのより大きな動きを4兆ドル規模のAI縮小と描き、Anthropic IPOの失敗がその節目を画したとしている。SEC側もNvidia側も調査の焦点を確認していない——これは「関係者によれば」の記事であり、本フィードもその通りに表記する。

**なぜ重要か:** AIキャピックスペンドサイクルの鍵を握る企業への会計監査は、株を売買しない開発者にとっても開発に関わる出来事だ。先週BaiduとXiaomiのCEOが提起したリターンはどこにあるのかという問いの売上計上側であり、業界全体のチップ調達計画がこれで再価格化している。注目すべきは調査範囲が製品会計ではなくGPU配置取引(CoreWeave型の循環取引)に及ぶかどうかだ。

[`🔗 ロイター:Nvidiaの会計がSEC調査の焦点`](https://www.reuters.com/world/us-secs-nvidia-probe-is-examining-potential-accounting-issues-sources-say-2026-11-20) · [`🔗 HNディスカッション(162コメント)`](https://news.ycombinator.com/item?id=50581438)

---

## 7. AlibabaのOpenCodeReviewが週間+4,457星でトレンドに——v1.14.0は昨日リリース

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · 今週 +4,457星 · v1.14.0 ~13h ago
- **Tags:** `code-review` `alibaba` `developer-tools` `open-source`

OpenCodeReview——Alibabaのコードレビュープラットフォームで、自らを「安全、高速、効率的。Alibabaの規模で実戦鍛錬済み。ハイブリッドアーキテクチャのコードレビューツール」と述べる——は55,047星で今週のGitHubトレンド伸び率第4位に付き、昨日(15:17 UTC+8)にv1.14.0をリリースした。今年5月創設のリポジトリはnpmパッケージを公開し、自動チェックと人間の承認が混在するエンタープライズレビューパイプラインを狙う。agent-skillsの波と同じ週に週間ボードに乗ったのは、機械が書いたPRを人間が注意を割く前にツールが門番するという、AIレビューループを作っているのと同じ読者が向かっている証拠だろう。

**なぜ重要か:** コードレビューはエージェントコーディング時代の文書化されたボトルネックだ(ハーバードの企業レベル研究は承認までの時間が56%増と計測)。ハイパースケーラーの本番レビューシステムが広くオープンソースになるのは、そのボトルネックが直接必要とするツールだ。注目点:ハイブリッド(ルールベース+モデル)の配分比率と、npm配布がポータルではなくエージェントパイプラインへの組み込みを可能にするかどうか。

[`🔗 alibaba/open-code-review`](https://github.com/alibaba/open-code-review) · [`🔗 v1.14.0リリース`](https://github.com/alibaba/open-code-review/releases/tag/v1.14.0) · [`🔗 プロジェクトサイト`](https://open-codereview.ai)

---

## 8. Plannotator:エージェントの計画に注釈を付け、diffをレビューする受信箱——14k星で上昇中

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · 今週 +3,555星 · v0.29.1(11月19日)
- **Tags:** `agent-infra` `code-review` `planning` `developer-tools`

Plannotator(backnotprop)は自らを「エージェントのループに留まり、注釈を付けるために必要なすべて」と位置づける。計画・仕様・markdown・HTMLなどのインタラクティブな成果物のための受信箱サーフェスで、diff/PRレビューとエージェントへのフィードバック経路を備える。一次サポートはAmp、Claude Code、Codex、Copilot CLI、Droid、Gemini CLIに及び、READMEにはさらに多くのエージェントアイコンがある——「計画→承認→実行」のエージェントループが求め続けてきた人間の承認UI層だ。v0.29.1は11月19日リリースで、リポジトリは毎日pushされている。14,123星で今週最速の伸びの一つ。

**なぜ重要か:** すべてのエージェントフレームワークは同じ choke ポイントに収束する——エージェントが午後を燃やす前に、人間が計画を読むこと。チャットログのコメントではなく、専用のエージェントネイティブな注釈サーフェスこそ、そのループに欠けていた部品であり、マルチエージェント対応リストは、特定ベンダーのハーネスではなくワークフロー自体に生態系が標準を作りつつあることを示す。

[`🔗 backnotprop/plannotator`](https://github.com/backnotprop/plannotator) · [`🔗 v0.29.1リリース`](https://github.com/backnotprop/plannotator/releases/tag/v0.29.1)

---

## 9. Show HN:Zero C#——ランタイムもGCもないC#、386 DOSバイナリまでコンパイル

- **Velocity:** ▮ steady
- **Source:** Show HN · 74+ pts · ~4.6h ago (~23:40 UTC+8)
- **Tags:** `csharp` `compilers` `native` `runtime-free`

Onur GumusのZero C#はbflatのフォークで、C#を小さなネイティブプログラムへ直接コンパイルする。.NETランタイムなし、ガベージコレクタなし、実行環境にインストールするものは何もない。言語は保たれる——C# 15構文、型チェック、型ごとに特殊化されたジェネリクス、レコード、小さなライブラリによるLINQ風ラムダ、さらには`Parallel.For`まで。ただしランタイムのサービスは諦める:メモリは一括で解放するアリーナから来て、`throw`はプログラムを終了させ(エラーはunionで返す)、リフレクションもasyncもない。hello worldはWindowsで11 KB、Linuxで40 KB。同じソースがLinux、macOS、Windows、WebAssembly、そして386上のDOS向けにビルドでき、同一のテストスイートが全ターゲットで通ることを要求する。

**なぜ重要か:** 「ランタイムなし」というニッチ(Go・Rust・Zigユーザーの潜在移行先)は、C#——人が実際に知っている言語——を常に締め出してきた。アリーナのみのメモリ管理に本物の型システムを組み合わせるのは、それ自体が興味深い安全性の取引だ:借用検査ではなく構造によってuse-after-freeの自由を手放す。386/DOSをサポートターゲットにするのは、先週ClawDOSエージェントが押したレトロコンピューティングの境界と同じ線だ。

[`🔗 Zero C#ガイド`](https://onurgumus.github.io/zero-csharp/index.html) · [`🔗 OnurGumus/zero-csharp`](https://github.com/OnurGumus/zero-csharp) · [`🔗 HNディスカッション`](https://news.ycombinator.com/item?id=50590279)

---

## 10. gopgext:素のGoでPostgreSQL拡張を書く——TinyGoがサーバー内へコンパイル

- **Velocity:** ▮ steady
- **Source:** Hacker News · 70+ pts · ~3.1h ago (~01:10 UTC+8)
- **Tags:** `postgresql` `golang` `tinygo` `extensions`

Jespinoのgopgextは、TinyGo経由で通常のGoコードからPostgreSQL拡張をビルドする。関数に`//gopgext:function`の注釈を付ければ、ツールチェーンがCグルーコード、インストールスクリプト、controlファイルを書いてくれる。標準ライブラリはサーバー内で動く(`fmt`、`regexp`、JSON、crypto、ジェネリクス、defer/recover)。文字列/数値/配列/JSONはSQL型へマップされ、表面は関数を超える:トリガー、集約、GiST/GIN/SP-GiST/BRIN演算子クラス、FDW、クエリフックだ。プロジェクトは上流の本拠地で実力を証明している——contribモジュール(pgcrypto、hstore、pg_stat_statements、cube)の移植が上流のテストスイートを通過——そしてREADMEはリスクについて率直だ。生成コードやGoランタイムのバグは「サーバー内部で動くため、クラッシュさせたりデータを壊したりできる」。リポジトリはわずか4日、16星。

**なぜ重要か:** PGXS/Cレベルの拡張作者は小さな専門ギルドだ。Goの経路(README自身がサンドボックスの話は未展開と認める)は、Postgres——今やほとんどのエージェントスタックが載っているデータベース——を拡張できる人を広げる。「実験的」ラベルは誠実に掲げられている。本番前にはメモリモデルの話を注視したい。

[`🔗 gopgextドキュメント`](https://jespino.github.io/gopgext/) · [`🔗 jespino/gopgext`](https://github.com/jespino/gopgext) · [`🔗 HNディスカッション`](https://news.ycombinator.com/item?id=50591260)

---

## 11. 決定論的シミュレーションテストはみんなのもの——分散システムの技を普通のアプリまで論じ下ろす

- **Velocity:** ▮ steady
- **Source:** Hacker News · 56+ pts · ~31h ago(11月20日 ~21:20 UTC+8)
- **Tags:** `testing` `deterministic-simulation` `reliability` `essay`

Outdataの11月20日のエッセイは、決定論的シミュレーションテスト(DST——世界ごと種付きで再生し、障害が再現するまで回す)がFoundationDB/Antithesis型の専門技術のままであるべきでないと論じる。エッセイのエンジンは「なぜテストするのか」の分類法だ。反応的なリグレッションテスト、防御的なガードレール、そして「義務」のテスト——その規律が唱道者の退場とともに消えるTDDは、「数多く、脆く、数多くの」テストを置き去りにする。疑念の除去こそが実際の製品だという主張(「この依存関係は削除できるか?このモジュールは再配置できるか?」)、そして決定論的で種でアドレス可能な障害だけが、チームメイトに——このフィード付け加えればエージェントに——渡せる障害報告なのだと。

**なぜ重要か:** DSTに2度目のHNブームが来るのには理由がある:エージェントはコードを速く書き、テストこそが管理である。あらゆる障害が種から再現できるテストモードは、エージェントが書いた変更が最も必要とするものだ。Antithesis/Turso型ツールに威圧感を覚えたチームに、入口レベルの論証を与える枠組みでもある。

[`🔗 決定論的シミュレーションテストはみんなのもの`](https://outdata.net/blog/261120) · [`🔗 HNディスカッション`](https://news.ycombinator.com/item?id=50574264)

---

## 12. マシンコードプログラミング:16進ダンプだけを与えられ、LLMが実行ファイルをバイト単位で読み書きする

- **Velocity:** ▮ steady
- **Source:** Hacker News · 133+ pts · ~3.4日前
- **Tags:** `llm` `reverse-engineering` `machine-code` `malware-analysis`

「LLMは現在、マシンコードを理解し書くことができる。逆アセンブラもコンパイラもツールも一切なしで、16進ダンプだけを与えて」。これがGeorge XenosとSotiris Giannopoulosが検証した主張で——先週このフィードが報じたweight-space programmingの結果の、コンパイル済みコードにおける姉妹編として明示的に位置づけられている(彼らはTakehi et al.を引用)。GPT-6.1 Solは1バイト約2.4トークンのxxd出力を与えられ、渡された5つのバイナリすべてを説明した——その中にはストリップされた統計ツールが含まれ、上流コードの実際のバグを発見した。未知のマルウェアサンプルをIOCまで正しく分析し、バイトを直接編集して3つのバイナリに機能を追加し、説明だけから3つの動作するプログラムをゼロから書いた。DeepSeek V4.1 Flashはそのマルウェアについて同じ結論に達した——これがクローズドモデル限定でないことの証拠として彼らは提示している。

**なぜ重要か:** Weight-space programmingは学習済み重みがアドレス可能な成果物になりつつあると言い、こちらはコンパイル済みバイナリもそうだと言う——すべてのセキュリティチームが不透明として扱うあの成果物だ。短期の用途はツールチェーンなしのリバースエンジニアリングとマルウェアトリアージ、長期のそれはソースが存在しない場所で出荷済み成果物をパッチするモデルだ。ただし注意点は彼ら自身のセットアップにある:1バイト約2.4トークンでは、制約は能力ではなくコンテキストだ。

[`🔗 Programming in the Machine Code Space`](https://sgiannopoulos.github.io/blog/machine-code-programming/) · [`🔗 HNディスカッション(96コメント)`](https://news.ycombinator.com/item?id=50546587)

---

## 13. 同じ公開日の9+ CVEレコード3件:Google Cloud Dataformのパストラバーサル、Net::DNSの予測可能なクエリID、Go PKCS#11のノンス欠陥

- **Velocity:** ▮ steady
- **Source:** NVD · 11月20日公開 · 3件すべて`Received`、CNA採点
- **Tags:** `security` `cve` `gcp` `dns` `cryptography`

NVDの11月20日バッチには、KEVゼロという地位以上の注目に値するレコードが3つある。**CVE-2026-126054**(CVSS 4.0 **9.3**、Google CNA):Google Cloud Dataform、BigQuery Studio、Colab Enterpriseにまたがるワークスペースディレクトリ処理とGit統合におけるパストラバーサルで、認証済みリモート攻撃者が「テナントリポジトリを横断してプライベートファイルを読み、任意のファイルを作成」できる。**CVE-2026-101340**(CVSS 4.0 **9.1**、NLnet Labs):Net::DNSは1.57まで、16ビットのDNSクエリIDをPerlの組み込み`rand()`から導出しており、IDシーケンスを観測できる攻撃者はPRNGの内部状態を晒してIDを「送信前に予測」できる——DNSキャッシュポイズニングの背後にある偽レスポンスのプリミティブで、レコードは1.57の重複排除キャッシュでは攻撃が成立すると明記する。**CVE-2026-115407**(CVSS 4.0 **9.1**、Eclipse CNA):GoのPKCS#11ラッパー`crypto11`は、`SecretKey.NewGCM()`が返すAEADにおいて与えられたGCMノンスを`NonceSize()`との長さチェックなしに`CK_GCM_PARAMS`へ直通させ、空ノンスを受け入れる。SoftHSM2では空ノンスでのすべての`Seal`が同じIVで暗号化し、「キーストリームを再利用してGHASH認証キーを露出し、偽造を可能にする」。修正コミットとGHSAアドバイザリはレコードにリンク済みだ。

**なぜ重要か:** 3件ともまだ`Received`のままで、NVDはいずれも分析しておらず独自スコアも付けていない——上の数字はすべてCNA自身のもの(Google、NLnet Labs、Eclipse)で、各レコードにはCISA-ADPのエンリッチメントコンテナが付いている。眠り姫はNet::DNSの方だ:PerlのDNSリゾルバはまだ予想外の場所で稼働しており、予測可能なクエリIDは攻撃マニュアル最古のページの一つだ。

[`🔗 CVE-2026-126054(NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-126054) · [`🔗 CVE-2026-101340(NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-101340) · [`🔗 CVE-2026-115407(NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-115407)

---

## 14. SoK:運転自動化スケールでLLMの脆弱性研究能力を評定する——2026年の制限付きフロンティアモデルより前に、エージェントはすでに完全自律だった

- **Velocity:** ▮ steady
- **Source:** arXiv · 2611.26601 · 11月19日提出
- **Tags:** `ai-research` `security` `sok` `vulnerability-research`

Amine LbathによるSystematization-of-Knowledge論文は、エージェントが脆弱性研究を変えているという類の主張に欠けていた測定層を作った。運転自動化(SAE J3016型のレベル)をモデルにした自律性スケールでLLMセキュリティ能力を評定し、公開されている各主張を正しさ・入手可能性・証拠の強さで限定する。3つの発見が際立つ。エージェントは「2026年の制限付きフロンティアモデルより前に、人間の介入なしで実世界のソフトウェアの脆弱性を発見・検証・修正していた」。その後オープンウェイトモデルが発見と検証において同等の自律性に達した。そして10年分の公開脆弱性レコードの測定では——2026年の開示数は**2倍以上**に増え、Critical/Highの割合が増え、10年以上生き延びた重大バグの報告が数倍に——一方で「報告から修正へ、開示から攻撃へ」の時間は「これまでのところ顕著には変わっていない」。論文は文献が提案する緩和策を明示的なルーブリックで評定し、最も裏付けの強いものからステークホルダー別の指針を導く。

**なぜ重要か:** 開示量2倍で修正レイテンシ不変というのは、このフィードのセキュリティトラックのテーゼの定量化だ:AIは業界がパッチするより速くバグを見つけ、ボトルネックは修復側に移った。セキュリティエージェントへの自動化レベルスケールは、現在のベンダー主張に欠けた共通言語を調達と政策に与える。

[`🔗 arXiv: 2611.26601`](https://arxiv.org/abs/2611.26601) · [`🔗 Hugging Face papers`](https://huggingface.co/papers/2611.26601)

---

## 15. sure:内蔵AIアシスタント付きのセルフホスト家計管理アプリが17k星を突破

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · 今週 +2,476星 · v2026.11.20-alpha(11月21日)
- **Tags:** `finance` `self-hosted` `ai-assistant` `open-source`

we-promise/sure——「すべての人のための(すべての人による)家計管理アプリ」——は今週の静かなトレンド話題だ:17,105星、今週+2,476、そして毎日出航するアルファリリースの定期船(v2026.11.20-alpha / v0.7.7-alpha.8が昨日到着)。ダッシュボードはキャッシュフロー、純資産、支出・流出に、あなた自身の数字について質問に答えるAIアシスタントを並べる——このフィードが追い続けているローカルAIパターン(Platypushの音声パイプライン、Foolscapの読み取り専用ライティングアプリ)が、最もセンシティブな個人データに適用された形だ。17k星のプロジェクトとしては注目すべきことに、リリースはsemverのstableではなく暦日のアルファで名付けられている——成熟度の主張ではなく、明示的な「進行中」の合図だ。

**なぜ重要か:** 経済データはあなたのデータは外に出ないことが好みではなく機能であるカテゴリで、ローカルデータ上で11月の支出が跳ねた理由を説明できるアシスタントは、すべてのセルフホストAI統合が手を伸ばしているデモだ。毎日アルファのペースは、ユーザーが事実上mainブランチに乗っていることを意味する——10年分の明細をインポートする前に知っておきたいことだ。

[`🔗 we-promise/sure`](https://github.com/we-promise/sure) · [`🔗 リリース`](https://github.com/we-promise/sure/releases)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-21T20:30:36Z |
| Items | 15 |
| Sources tracked | 22 (Hacker News, GitHub Trending, NVD, CISA KEV, Reuters, arXiv, Hugging Face, simple-bench.com, pwn.ai, leanprover-community, math.mit.edu, scottaaronson.blog, blog.tymscar.com, outdata.net, sgiannopoulos.github.io, jespino.github.io, onurgumus.github.io, github.com, yahoo.com, wsj.com) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[Previous day](../2026-11-21.md) · [Raw .md](https://trending.md/jp/feed/2026-11-22.md) · [Archive](../archive/)
