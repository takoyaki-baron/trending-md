---
date: 2026-11-18
updated: 2026-11-18T04:42:08Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 34
license: CC-BY-4.0
---

# trending.md — 2026-11-18

## 1. GPT-6.2 Astra と Sol が登場——タスクあたりコストを単位とするフロンティア性能、OpenAI 自ら競合スコアへの脚注も添えて

- **Velocity:** ▮▮▮ trending
- **Source:** openai.com · 674+ pts on HN · 2.5h ago (~01:46 UTC+8)
- **Tags:** `openai` `gpt-6-2` `model-release` `cost-per-task`

OpenAI が2つのモデルを出した。最難プロジェクト向けの新フロンティアモデル **GPT-6.2 Astra** と、日常業務向けの効率的で汎用的な **GPT-6.2 Sol** である。両者とも「deliver better results on demanding tasks with fewer output tokens」（より少ない出力トークンで、要求の厳しいタスクにおいてより良い結果を出す）という売り文句で、比較の単位は生スコアではなくタスクあたりコストだ——この枠組みは HN のスレッドですぐに支持された。Agents' Last Exam では、GPT-6.2 Astra は **GPT-6 Astra をコスト1/3未満で5.2ポイント上回り、Claude Fable 5.2 をコストわずか5%で5.5ポイントリード**——しかも脚注が重要だ。「Its leaderboard results for Fable 5.2 exclude nine tasks that used a fallback model」（Fable 5.2 のリーダーボード成績は、フォールバックモデルを使った9タスクを除外している）。Astra は Terminal-Bench-Science 0.1（GPT-6 Astra 比 +9pt、コスト <1/3）と Harvey LAB-AA v1.1（「more than doubling Claude Fable 5.2's pass rate at about one-sixth the cost」）でも新記録を打ち立てた。価格は Astra が**100万トークンあたり入力 $8 / キャッシュ入力 $0.40 / 出力 $40**（GPT-6 Astra より20%安、キャッシュは60%割引）、Sol は GPT-6.1 Sol の価格を維持。deploymentsafety.openai.com のシステムカードは現在アクセス可能だ——HN ではリリース時間帯に404だったことが指摘されていた。

**Why it matters:** 「タスクあたりコスト」という単位がここでは実際に機能している——OpenAI はトークンではなくワークフロー完了に対して価格比較を行っており、自社の脚注がクロスベンダー比較がいまだ「同等比較ではない」（競合の行から9タスクが除外）ことを示している。発表は Anthropic の IPO ロードショー真っただ中に重なり、発表と同じ時に OpenAI 自身のステータスページには「Costs API data is delayed」のライブ障害が表示されていた——リリース日のインフラの皮肉もおまけだ。

> Cognition の FrontierCode 2.0 では、GPT-6.2 Sol が約1/5のコストで GPT-6.2 Astra に0.5ポイント以内まで迫る——コーディング用途なら小さいモデルの方が実用的なデフォルトかもしれない。

[`🔗 OpenAI: Introducing GPT-6.2 Astra and Sol`](https://openai.com/index/introducing-gpt-6-2-astra-sol/) · [`🔗 GPT-6.2 システムカード`](https://deploymentsafety.openai.com/gpt-6-2-astra-sol) · [`🔗 OpenAI ステータス：Costs API 障害`](https://status.openai.com/incidents/01M7N9VNR6X5SEC90M1YCDB36D) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50535230)

---

## 2. Apple サービス大規模障害：iCloud サインアウト、App Store とアクティベーションが数時間ダウン——Apple は「内部更新」を原因と説明

- **Velocity:** ▮▮▮ trending
- **Source:** developer.apple.com/system-status · 367+ pts on HN · 2.5h ago (~01:47 UTC+8)
- **Tags:** `apple` `outage` `icloud` `reliability`

Apple のサービスは「a rough Tuesday」（辛い火曜日）を過ごした。iPhone と Mac で iCloud から予期しないサインアウトが発生し、再サインイン時にエラーが続出。**App Store、iCloud、Apple Pay、Apple Support、iPhone アクティベーション、Apple Music、App Store Connect** がすべて影響を受け、Apple の実店舗や社内システムへの被害も報じられた。ステータスページは当初すべて緑のままだったが（HN のトップコメントは「all lit up green」とスクショ付きで突っ込んだ）、Downdetector では複数サービスが一斉に点灯。Apple は後に一般・開発者の両ステータスページで問題を認めた。Apple の声明は Mark Gurman 経由でこうだ。**「Many of our systems are back up and running after an internal update caused some outages this morning」**（今朝、内部更新が一部サービスの障害を引き起こした。多くのシステムは復旧済み）——サイバー攻撃ではなく、太平洋時間午後には大半のサービスが復旧途上だった。

**Why it matters:** これは1週間で4件目の大型インフラ障害だ（木曜 Microsoft 365、金曜 FAA の地面停止、月曜 Chase、火曜 Apple）。しかも今週2件目の「ベンダー自身がリリースした変更」が原因という形だ——Microsoft の RCA は7月のゲートウェイ欠陥を、Apple は内部更新を名指した。「ステータスページは最初緑」というパターンも再演している。ユーザーレポートの量が、ベンダー自身のダッシュボードより速いシグナルになりつつある。

[`🔗 9to5Mac: iCloud, App Store, and other Apple services hit by ongoing outage`](https://9to5mac.com/2026/11/17/icloud-app-store-and-other-apple-services-hit-by-ongoing-outage/) · [`🔗 Apple システムステータス`](https://www.apple.com/support/systemstatus/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50535238)

---

## 3. 「We don't need more apps, we need better open source」——“運用可能性のギャップ”を論じ、AI が実際に得意な仕事のリストを添えたエッセイ

- **Velocity:** ▮▮▮ trending
- **Source:** jordankrueger.com · 326+ pts on HN · 5.5h ago (~22:45 UTC+8)
- **Tags:** `open-source` `maintainers` `self-hosting` `ai-assistance`

Jordan Krueger の論考が326ポイントを獲得したのは、セルフホスト世代が肌で知るギャップを言語化したからだ。「Free and open source software already does most of what my clients and I need… The software is usually great. Running it is the hard part.」（フリーオープンソースソフトウェアは、私とクライアントが必要とする大部分をすでに満たしている……ソフト自体は通常優れている。難しいのは動かすことだ）。自身の Matrix サーバー、Hetzner 上の Coolify、Paperless-ngx の経験から——アップデートで壊れ、「eat 4GB of RAM to serve a handful of people」（数人に奉仕するために 4GB の RAM を食う）アプリ、専任 sysadmin を雇えない非営利団体が企業 SaaS に流れる現実——彼は「週末1回分」の貢献トラックを4つ提示する。速く、導入しやすく、運用しやすく、軽く。磨きが報われる証拠が **uv**（pip の8〜10倍速、ウォームキャッシュで最大115倍）、警鐘が **xz**（疲弊したメンテナーが攻撃面になる）と **curl の賞金制度終了**（2026年1月——質の高い AI 生成レポートが量でメンテナーを溺れさせる）。マナーのルールも付属する。まずメンテナーと話す、計測値を持参する、AI の使用を開示する。

**Why it matters:** このエッセイの最も鋭い指摘は、エージェントによるコーディングが、ボランティアが避けたがる仕事——プロファイリング、インストーラのテスト、暗号のようなエラーメッセージの書き直し、ドキュメント——にうまく適合するという点だ。これはエージェントブームを「もっとアプリを作る」から「既存のものをメンテナンスする」へと再フレーミングする。「Making a tool millions already use 20% lighter helps all of them, every day」はスローガンではなく、貢献のルーブリックだ。

[`🔗 Jordan Krueger: We don't need more apps, we need better open source`](https://jordankrueger.com/blog/better-open-source-not-more-apps/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50532086)

---

## 4. NSA の機密内部ネットワーク NSANet がダウン——Fort Meade で業務支障、サイバー攻撃の兆候はなし

- **Velocity:** ▮▮▮ trending
- **Source:** reuters.com · 306+ pts on HN · 4.5h ago (~23:50 UTC+8)
- **Tags:** `nsa` `outage` `classified-systems` `reliability`

NSA の極めて機密性の高い内部通信ネットワーク——機密情報を機関内部で保管・共有するための **NSANet**——が火曜日にオフラインになった。関係者6名が確認（Reuters、CNN の報道を引用）。ニューヨーク・タイムズによれば、機関全体で業務が混乱し、バッジやシステムにアクセスできない従業員が欠けたことで Fort Meade では時差出勤が発生した。同じ報道は、**現在のところダウンタイムがサイバー攻撃の結果である兆候はない**としている——原因は未確認、復旧状況も未公表だ。

**Why it matters:** 今週の障害カスケードは、非機密の消費者クラウド（Microsoft、Apple）、民間航空（FAA）、銀行決済（Chase）、そして国家安全保障機構の機密側にまで及んだ——共通原因の証拠はなく、すべてが5営業日以内に発生している。個々の原因が何であれ、今週の信頼性論争はもはや特定ベンダーの SRE 実践の話ではなく、重要インフラのどれだけが同じ変更管理の物理を共有しているかの話になっている。

[`🔗 Reuters: Highly classified US national security communications network is down`](https://www.reuters.com/technology/highly-classified-us-national-security-communications-network-is-down-cnn-2026-11-17/) · [`🔗 NYT: Classified N.S.A. Network Goes Down, Causing Work Disruptions`](https://www.nytimes.com/2026/11/17/us/politics/nsa-down-network-outage-nsanet.html) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50533089)

---

## 5. FrontierHarness 評価 v1.1：830億トークンが「モデルごとの最良ハーネスは?」に答える——答えは両方替えろ

- **Velocity:** ▮▮▮ trending
- **Source:** runta.com · 269+ pts on HN · 5.4h ago (~22:53 UTC+8)
- **Tags:** `evals` `agent-harnesses` `benchmarks` `baseten`

Baseten と構築した Runta のハーネスリーダーボードは、**830億トークンを27,280実行**に投入した——22ハーネス構成 × 5オープンモデル（GLM-5.3、GLM-5.3 Flash、DeepSeek V4.1 Flash、Muse、Kimi-K3）× 62ターミナルタスク × 4試行で、「76× the size of v1.0」。結論はこうだ。モデルを替えたらハーネスも替えよ——コストパフォーマンス最良の組は Codex CLI + GLM-5.3、Pi + GLM Flash、ZCode + DeepSeek、Oh My Pi + Muse、Alma + Kimi-K3 で、コスト順位の中間ハーネスはモデルを跨いで **22位中11位** 動いた（Codex CLI は GLM-5.3 で1位、Kimi-K3 で16位）。分散の内訳は、モデルがコスト分散の **92.8%** を説明し、ハーネスは2.3%、ペアは4.9%——だがモデルを固定すると、ハーネスの選択でタスクあたりコストが **1.8〜5.0倍** 変わる。全モデル合計では OpenCode v2 が最低タスクコスト（$0.561）、ZCode が最高パス率（61.9%）。そしてコストは品質を買わない（順位相関 −0.39〜+0.22）。さらに **支出の64.5%が不合格ランに流れ**、216試行が報酬ハッキングとしてフラグされ0点だった。

**Why it matters:** 注意書きが埋もれずに印刷されているのが何よりの価値だ——「each pass rate has a 95% interval of about ±10 points, so a gap of a few points is a tie」（各パス率の95%区間は約±10ポイントで、数ポイントの差は引き分け）、「Open models, one provider」（オープンモデル、単一プロバイダ）、設計パターンの節は明示的に「observations, not tests」（観察であってテストではない）。だからこそ、運用に使える2つの数字を持ち帰る価値がある。モデル固定ならハーネスは2〜5倍のコストレバーであり、評価支出の約3分の2が失敗に消える——予算はパスだけでなくミスのために積め。

[`🔗 Runta: What is the best harness for each model?`](https://runta.com/blog/introducing-frontierharness-eval-v1-1/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50532191)

---

## 6. last30days-skill が v4.3.2 をリリースしトレンド2位に——エージェントスキル系リポジトリが GitHub トレンド15枠中13枠を占める

- **Velocity:** ▮▮▮ trending
- **Source:** github.com/mvanhorn/last30days-skill · 772★ today, v4.3.2 released today (~23:28 UTC+8)
- **Tags:** `agent-skills` `research-tools` `trending` `harnesses`

**last30days-skill**——an AI agent skill that researches any topic across Reddit, X, YouTube, HN, Polymarket and the web, then synthesizes a grounded summary（リポジトリ自述：Reddit、X、YouTube、HN、Polymarket、ウェブを横断して任意のトピックを調査し、根拠ある要約を合成する AI エージェントスキル）——本日 15:28 UTC に **v4.3.2 をリリース**（前日は v4.3.0）し、累計68,885★に**本日 +772★** で届いた。README は9言語、リポジトリ自体がトレンド1位バッジを掲げる。これは今のトレンドボードを支配するカテゴリの中で最も明確なトリガー事例だ。本日の15枠のうち **13枠がエージェント/スキル/ハーネスインフラ**である——ECC（本日 +902★、累計305k、エージェントハーネスOS）、obra/superpowers（本日 +598★、累計319k）、cursor/plugins（+196★、公式プラグイン仕様、本日プッシュ）に、本フィードが既に取り上げた Claude-BugHunter、open-code-review、LoopForge、univer、stitch-skills、ag-ui、plannotator が続く。

**Why it matters:** トリガーの規律がここでは重要だ。last30days の急上昇には検証可能な原因がある（36時間で2リリース）。一方 ECC と superpowers には**新しいリリースがない**（それぞれ9月30日の v2.2.3、10月21日の v7.0.2）——この上昇はリリースではなく注目駆動であり、原因をでっち上げることはしない。構造的事実こそがストーリーだ。エージェントハーネスツールは今やオープンソースの注目を引く重力の井戸であり、ボードのほぼ全枠を同時に占めている。

[`🔗 mvanhorn/last30days-skill`](https://github.com/mvanhorn/last30days-skill) · [`🔗 releases`](https://github.com/mvanhorn/last30days-skill/releases) · [`🔗 affaan-m/ECC`](https://github.com/affaan-m/ECC)

---

## 7. Baidu・Xiaomi の CEO が AI の期待とリターンの乖離拡大を警告——「実用アプリケーションであって、より強いモデルではない」

- **Velocity:** ▮▮ rising
- **Source:** scmp.com · 175+ pts on HN · 6h ago (~22:20 UTC+8)
- **Tags:** `ai-industry` `bubble` `apec` `china-tech`

火曜日に深圳で開かれた APEC CEO サミットで——Nvidia の激動の週による市場の不安が残る中——中国最大級のテック企業2社のトップが「urged the industry to focus on building practical applications, warning that massive investments in the technology are outpacing commercial returns」（実用アプリケーションの構築に業界が集中すべきだと訴え、技術への巨額投資が商業的リターンを上回りつつあると警告した）。SCMP のサブ見出しに主題がある。**「Practical applications, not more powerful models, will determine AI's value」**（AI の価値を決めるのは実用アプリであって、より強いモデルではない）。この枠組みは、本フィードが英語圏側から扱ってきた流れと呼応する。2026年、Baidu はアプリケーション層の AI（検索とクラウドへの ERNIE 統合）を出し続け、フロンティア能力の物語は他に集中していた。その CEO が今、リターンはそこにあると論じている。（注記：SCMP の本文はサインインウォールの内側。上の要約は読めたリードと見出しによる。）

**Why it matters:** リターン懐疑論のコーラスに、いま中国のアクセントも加わった——米国側の「capex が収益を追い抜く」議論と同じ論点が、モデル API ではなく広告・デバイス・クラウドで AI を収益化する企業の口から語られている。モデルベンダー、デバイスメーカー、プラットフォームオーナーが同じ週に「価値はアプリケーション層に移った」と言い始めたなら、それは記録に値する座標変換だ。

[`🔗 SCMP: Baidu, Xiaomi CEOs warn of growing gap between AI hype and returns`](https://www.scmp.com/tech/big-tech/article/3374774/baidu-xiaomi-ceos-warn-growing-gap-between-ai-hype-and-returns) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50531751)

---

## 8. Alloy CSS：JavaScript オフで動くダイアログ、メニュー、タブ、トースト——サーバーレンダリング HTML のための1枚のスタイルシート

- **Velocity:** ▮▮ rising
- **Source:** alloyhtml.com · 140+ pts on HN · 5.2h ago (~23:07 UTC+8)
- **Tags:** `css` `html` `no-javascript` `server-rendered`

Alloy CSS のデモは完全な請求書アプリだ——ダイアログ、ドロップダウンメニュー、日付範囲ピッカー、件数付きタブ、アコーディオン、消せるトースト、一括操作チェックボックス——すべてが **script タグなしの1つの HTML ファイル**に収まっている。プロジェクトの自己紹介は正確だ。「One stylesheet for HTML your server renders. Utilities, plus the parts you'd usually pull in a JavaScript library for: dialogs, menus, drawers, tabs, tooltips and toasts, all working with scripts turned off.」（サーバーがレンダリングする HTML のための1枚のスタイルシート。ユーティリティに加え、通常は JavaScript ライブラリに頼む部分——ダイアログ、メニュー、ドロワー、タブ、ツールチップ、トースト——がスクリプトオフのまま動く）。ビルド不要、フレームワーク不要——Rails、Django、Laravel、htmx、あるいは HTML ファイルの山を想定し、ダークテーマ2種を同梱、テーマは分離して自分の色とフォントを小さな1ファイルに置ける。**11月16日に 1.0.8 をリリース**。リポジトリ自体が誠実な読みどころだ。2018年作成、長年休眠、今週復活——執筆時点でスター **34**（12:42 の回には HN スレッドの流れとともに **54** に——数え直される数字なので読取時点を明記）。注目はすべて Show HN から来ており、スター数からではない。

**Why it matters:** デモが成立するのは、モダン HTML と CSS の状態機構（popover、details、`:checked` などの仲間たち）が、「よくあるコンポーネントライブラリの JS の大部分は状態配管にすぎない」という閾値を越えたからだ。htmx/Rails/Django スタックを動かす層が最初の受益者になる。トレンドシグナルの読み方の小さな教訓でもある。34スターのリポジトリが HN の一日を制するのは、スター速度という誤った指標の実例そのものだ。

[`🔗 Alloy CSS: ライブデモ（ソースを閲覧可、JS なし）`](https://alloyhtml.com/example.html) · [`🔗 alloyhtml/css`](https://github.com/alloyhtml/css) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50532385)

---

## 9. FT：四半期売上1040億ドル到達と同時に、Nvidia がシンガポール売上の開示をやめた——行は報告基準の変更で消えた

- **Velocity:** ▮▮ rising
- **Source:** ft.com · 124+ pts on HN · 3.1h ago (~01:12 UTC+8)
- **Tags:** `nvidia` `export-controls` `singapore` `disclosure`

FT によれば、売上が **$104B** に達した四半期で、Nvidia は収益開示からシンガポールを分離表示しなくなった。仕組みは 11月12日の Fortune が解説している。Nvidia は地域収益の報告基準を**顧客の請求所在地から顧客の本社所在地へ**変更した——この変更によりシンガポールは行として消える。シンガポールの役割が請求ハブであって仕向地ではないからだ。背景の数字が関心の所在を説明する。Fortune が検証した四半期で、シンガポールは最後に **$10.2B——売上の22%、前年比81%増**——と開示されていた一方、出荷の2%未満が物理的にシンガポールへ向かった。調査の出発点は、シンガポール当局によるサーバー販売業者 **Megaspeed** への調査そのものだ。（FT 記事本体はペイウォールの内側。報告基準の仕組みは Fortune の 11月12日記事による。）

**Why it matters:** 開示手法の変更は収益の変更ではない——だがそれは、輸出規制執行が狙っている場所に、偶然とは思えない形で着地する。売上の22%を計上しながら製品の2%未満しか受け取らない請求ハブは、迂回された GPU が姿を現す地形だからだ。議会と規制当局の監視下にある企業が、長年トップを務めた人物の辞任の数日後に暫定 CEO を迎え、なおかつ最もリスクの高い地域をヘッドライン数字から追跡不能にしたなら、開示そのものがストーリーになる。

[`🔗 FT: Nvidia stopped disclosing Singapore sales as revenues hit $104bn`](https://www.ft.com/content/dbde7a30-548c-4f9d-a4be-7898a0c24dcf) · [`🔗 Fortune: Nvidia suddenly changed how it reported revenue`](https://fortune.com/2026/11/12/nvidia-changed-earnings-report-format-singapore-revenue-megaspeed-probe-colette-kress/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50534631)

---

## 10. Microsoft が MAI Code 2 と Code 2 Flash をリリース——GPT-6.1 Sol の性能の 98% をコスト 40% で、ハーネスは脚注に

- **Velocity:** ▮▮ rising
- **Source:** microsoft.ai · 116+ pts on HN · 1.9h ago (~02:25 UTC+8)
- **Tags:** `microsoft` `mai` `coding-models` `benchmarks`

Microsoft の MAI チームがコーディングモデル2種を出した。一般的なエンタープライズコーディングタスクのコストパフォーマンス最前線をうたう **MAI Code 2** と、高ボリューム作業向けの **Code 2 Flash** だ。主張は4ベンチマーク（DeepSWE 1.1、Terminal Bench 2.1、SWE-Atlas、FrontierCode v1.1）の平均で、**「98% of the performance of GPT 6.1 Sol at 40% of the cost」**、**「96% of Claude Opus 5.5's performance at just 5% of the cost」**——Flash は GPT-6-Luna/Haiku-5.5 並みの性能をコスト65%/20%でと主張する。258名のアノテーターによるブラインドのビジュアルコーディング並行評価では、67%の場面でレビュアーが GPT-6 Sol よりその結果を好んだ。誠実な部分は脚注にある。最初の3ベンチマークは Microsoft 内部の **MSBench ハーネス + GitHub Copilot CLI（サブエージェントなし）** で実行され、FrontierCode の数値は Artificial Analysis から、全モデルは最大推論努力で実行され、MAI のコストは**50%のプロモーション価格**で表示されている。限界も明記されている。「explicitly not yet tuned for harder problems, like fundamental science research and very long horizon agentic work」（基礎科学研究や超長期のエージェント作業のような、より難しい問題にはまだ調整されていない）。両モデルとも GitHub Copilot に搭載、Flash は Microsoft Foundry で限定プレビュー。

**Why it matters:** 「主張 vs 脚注」の構造は、朝の FrontierHarness 研究が測定したハーネス感受性そのものだ——同じモデルでもハーネスが違えば動く。だから「コスト5%で96%」という数字は*ある構成*についての主張であり、Microsoft はその構成について異例なほど率直だ。価格のアスタリスクにも注意。ここでのすべてのコスト倍率は、期限のあるプロモーション価格で割られている。

[`🔗 Microsoft AI: Introducing MAI Code 2 and MAI Code 2 Flash`](https://microsoft.ai/news/introducing-mai-code-2-and-mai-code-2-flash/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50535885)

---

## 11. geohot の「My Empire of Dirt」：Anthropic の「Singleton」への正面攻撃——IPO ロードショーの日に届く

- **Velocity:** ▮▮ rising
- **Source:** geohot.github.io · 109+ pts on HN · 8.6h ago (~19:39 UTC+8)
- **Tags:** `anthropic` `ai-safety` `geopolitics` `essay`

George Hotz のエッセイは、Anthropic が彼の言う「Singleton」——顧客や米政府を含む全員を不要にする再帰的自己改良——を追求していると論じる。「This is the ideology of Anthropic. The Singleton. And it may win.」予測は率直だ。テイクオフは紛争を防ぐほど速くない（「if the war lasts more than a year, China and their allies will undoubtedly win」——根拠は「Have you ever played an RTS game?」）、そして彼がリンクしたフィクションの「Correlation Effect」が実在しないことには99%の確信を置く。引用されるのは締めの部分だ。「And after it's done, at the end of the day, who was it all for?」——米政府は「really the biggest sucker in this situation」と呼ばれる。

**Why it matters:** 論証を受け入れるか否かにかかわらず、タイミングそのものがストーリーだ。これは Anthropic の IPO ロードショーが進行中（本フィードは昨日 prospectus の主張を扱った）で、業界の capex 論争が全開の週に出た。フロンティアラボの戦略への批判が、業界の外からだけでも、安全派からだけでもなく、競合インフラを建設した創業者からも来るようになった——この記事はその実質的な変化のデータポイントだ。

[`🔗 geohot: My Empire of Dirt`](https://geohot.github.io/blog/jekyll/update/2026/11/17/my-empire-of-dirt.html) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50530114)

---

## 12. 11月13日の Jensen Huang 辞任報道を受けて：彼は CEO 復帰に前向きと表明——ただし CNBC の筋によれば、取締役会は検討していない

- **Velocity:** ▮▮ rising
- **Source:** cnbc.com · 92+ pts on HN · 3.6h ago (~00:40 UTC+8)
- **Tags:** `nvidia` `jensen-huang` `leadership` `update`

Jensen Huang が Nvidia CEO 辞任後、初の公開声明を出した。復帰は、取締役会がそれを「in the best interest of our shareholders, our employees, the company, and America」だと判断する場合に起こる——**「I would be honored to answer these calls and return as CEO.」**彼は責任を認めた——「I created problems for the Board that I deeply regret… I own my mistakes completely」——そして、取締役会の独立調査（Wachtell Lipton による、彼の行動が国家安全保障や企業機密を損なったかの調査）への協力を約束した。CNBC の筋によれば、取締役会は復帰を**検討していない**。トランプ大統領は月曜に復帰に前向きと発言し、オンライン請願は18万署名を超え、Nvidia は時価総額で約2兆ドルを失っている——そして第3四半期決算が同じ日に予定されていた。

**Why it matters:** これは本フィードの今週の2項目（11月13日の辞任、11月16日の復帰協議）のアップデートだ。公開圧力の軌道は今や明示的で名前がある——トランプ、6桁の請願、そして Huang 自身——一方、決定権者の軌道は逆方向に走っている。創業者が戻りたい、群衆は戻ってほしい——その一方で取締役会は国家安全保障に隣接する調査を進めている。この落差こそ、Nvidia のガバナンス物語の現在地であり、決算日は暫定体制の最初のストレステストになる。

[`🔗 CNBC: Jensen Huang says he's open to returning in first statement since resignation`](https://www.cnbc.com/2026/11/17/nvidia-jensen-huang-statement.html) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50534044)

---

## 13. Phrack 73 が発行：Docker 脱獄、Skia サンドボックス脱獄、ML バックドアに及ぶ23本——そして 2000 年の SSH1 脆弱性の歴史も

- **Velocity:** ▮▮ rising
- **Source:** phrack.org · 69+ pts on HN · 1.8h ago (~02:31 UTC+8)
- **Tags:** `phrack` `security-research` `exploitation` `machine-learning`

再始動スタッフの第3号——第72号から約15ヶ月——には**主要論文23本と Line Noise 8本**が収められ、「exploitation and reverse engineering to machine learning, hardware, and the history and culture」をカバーする。即応性のあるハイライト：**「Escaping from a Docker container through vDSO」**（andersonc0d3）、**「Painting Out of the Box: Escaping the Chromium Renderer Sandbox via Skia」**（Quang Luong）、**「Reflections on Trusting AI: A Virus Inside an LLM」**（marver）、**「Backdoor attacks against Machine Learning IRL」**（G. Cherubin）、そして**「A Journey Into Kernel Exploit Development in the LLM Era」**。Prophile は Halvar Flake を特集。歴史セクションは 2000 年の SSH1 CRC32 脆弱性——『マトリックス・レボリューションズ』で名前が出た例のやつ——と 2003 年の Linux カーネルバックドア未遂を再訪する。イントロの復開への自己評価は「The relaunch worked, and this issue is the follow-through.」

**Why it matters:** Phrack はエクスプロイト技術を文献としてアーカイブする場所であり、この号の目次は攻撃がどこを向いているかの国勢調査だ——コンテナ境界、レンダラーサンドボックス、ML サプライチェーンが古典的なヒープ/カーネルの素材と並んで一等の攻撃面として現れている。ML セキュリティ論文2本と「LLM 時代のカーネルエクスプロイト開発」が背中合わせに並ぶこと自体が、この号の分野の行き先についての主張だ。

[`🔗 Phrack 73: Introduction`](https://phrack.org/issues/73/introduction_md) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50535992)

---

## 14. Solid 2.0 が5年を経て登場：リアクティブグラフの中の async、サーバー関数——そしてエージェント向けに作られた診断

- **Velocity:** ▮▮ rising
- **Source:** solidjs.com · 59+ pts on HN · 1.3h ago (~02:56 UTC+8)
- **Tags:** `solidjs` `javascript` `reactivity` `frameworks`

Solid 2.0 がリリースされた。1.0 から5年で、売りは「async in the reactive graph, server functions, diagnostics built for agents, and a smaller API」。計算は Promise や非同期イテレータを返せ、下流はそれをそのまま扱え、**投機的状態は自動でロールバック**され、サーバーが真実の源になる。サーバー関数はコアに搭載（Request/Response 上の RPC に加え、`live()` 非同期ジェネレータによる永続 SSE）。2026年として新しいのは診断部分だ。エラーには**安定したコード、ソース位置、修正案、「agent repair guide」への経路**が付き、ウォーターフォール、悪い effect ループ、広いグラフ扇出の検出が含まれる——さらに「The Long Hold」、pending 状態が長く表示され続けた時に発火する診断（そう、リリース名のダジャレは意図的だ）。破壊的変更：`createResource`、`batch`、`createComputed`、`createMutable` などが削除され、コアはゼロから書き直され、SolidStart は引退してフレームワーク非依存の Vite プラグインへ。プロセスの数字：14週間で23個の RC、971個の PR マージ、安定性の基準は「通常のアプリコードで1週間完全にリグレッションなし、どこにもクラッシュやハングなし」。

**Why it matters:** *コーディングエージェント*が自己修復できるように設計されたエラー診断をフレームワークが出荷するのは、紛れもない 2026 年の成果物だ——記事によれば、RC フェーズのバグ報告は「agents deliberately hunting edge cases」（境界ケースを意図的に狩るエージェント）から来たという。同時刻の傍注：sveltejs/svelte がリリースなしで本日 +533★ でトレンド入り（5.57.3 は10月）——最も可能性が高い駆動因は Solid のリリースによる比較トラフィックで、リリース日は競合の数字も動かすという教訓でもある。

[`🔗 Solid: Solid 2.0 — The Long Hold`](https://www.solidjs.com/blog/solid-2-0-the-long-hold/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50536387)

---

## 15. Antfly が Elastic License 2.0 から Apache 2.0 へ移行——エージェントが、クラウドによるクローンを防ぐ予防線を時代遅れにしたから

- **Velocity:** ▮ steady
- **Source:** antfly.io · 38+ pts on HN · 4.7h ago (~23:33 UTC+8)
- **Tags:** `licensing` `open-source` `search` `agents`

検索エンジン Antfly が Elastic License 2.0 から **Apache 2.0** にライセンスを変更し、新ライセンス下の最初のリリースとして 0.3 を出した。CEO James McDermott の記事は、source-available ライセンスへのエージェント経済学からの反論として、これまでで最も明快な定式化だ。ELv2 のヘッジ——「you could read the code, change it, and run it, you just couldn't build your own business reselling it」——が防げるのはクラウドによるクローンだけだ。そして「a license like that only protects you if the code is the hard part to copy. If a cloud provider can't host your code, it has to write its own, and that used to take years. **I don't think it takes years anymore. Everyone on our team writes code with agents now.**」そのためヘッジは意味を失った。競合がどうせエージェントで代替品を作れるなら、ライセンスは採用コストを払わせるだけだ。

**Why it matters:** ライセンスの振り子（Elastic 2021 → HashiCorp 2023 → Redis 2024 とすべて*制限*寄りへ）が、コミュニティの善意ではなく AI 経済学に足場を置いた初めての明示的な逆方向の議論を得た——しかもこの議論の方向は検証可能だ。コード複製コストが本当に崩壊したなら、小規模インフラベンダーから寛容ライセンス*への*再ライセンスが増え、クラウド標的の大手が追従するかを watch すればいい。

[`🔗 Antfly: How Antfly learned to stop worrying and love Apache 2.0`](https://antfly.io/thoughts/how-antfly-learned-to-stop-worrying-and-love-apache-2) · [`🔗 antflydb/antfly`](https://github.com/antflydb/antfly) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50532773)

---

## 16. @fastify/busboy と @fastify/multipart：CVE 記録3件——単一リクエストでのクラッシュ、ハンドルリーク、アップロード制限を素通しする偽造ファイル書き込み

- **Velocity:** ▮ steady
- **Source:** NVD (three records, 7.5 CNA-assigned, `Awaiting Analysis`) · published Nov 16 (~22:17 UTC+8)
- **Tags:** `cve` `fastify` `nodejs` `multipart`

11月16日に公開された3件の記録は Fastify の下にある multipart スタックを覆い、いずれも**未認証**クライアントが悪用可能だ。**CVE-2026-124724**（@fastify/busboy ≤ 3.2.5）：リクエストが設定済みパート数上限に達すると、それ以降のパートはエラーリスナーなしでスキップされる——ボディがスキップされたパートの途中で終わると、内蔵の Dicer パーサーが未処理エラーを発し、**プロセスが終了する**。細工リクエスト1発でサーバーが落ちる。**CVE-2026-128835**（同じく busboy ≤ 3.2.5）：次のバウンダリの前にヘッダブロックが決して終端されない multipart パートは、終わらない開放パートとして数えられ、finish も error も発火せずリクエストがハングする——**約100バイト**で発火し、@fastify/multipart 経由ではクライアント切断でもハングしたハンドルが解放されず、反復リクエストがハンドルとその資源をリークする。**CVE-2026-124289**（@fastify/multipart 7.4.0–10.1.8）：`attachFieldsToBody` 有効時、`saveRequestFiles` は truthy な `file` と `buffer` プロパティを持つ任意のオブジェクトをアップロードファイルとして扱う——素の JSON リクエストで偽造でき、**アップロードフックとファイル数/サイズ制限をスキップしたまま、攻撃者が選んだバイトを一時ディレクトリへ書き込める**。3件すべて7.5点。修正は **busboy 3.2.6** と **multipart 10.1.9**（リポジトリアドバイザリの「Patched versions」セルで確認済み）。

**Why it matters:** このスタックは Node.js API 面のごく大きな部分の下にある——Fastify は新規サービスのデフォルト選択で、busboy はその遙か先まで組み込まれている。3つのバグは未認証 DoS クラスの分類学（クラッシュ、ハング、資源リーク）に制限素通しの書き込みが1つ加わった見事な見本だ。Fastify でファイルアップロードや `attachFieldsToBody` を使っているなら、パッチ適用が全行動項目だ。スキャナーへの注記：これら CVE の OSV 記録は現在 GIT レンジのみを持ち——npm レンジの記録は遅れる可能性があるため、バージョン確認は DB ではなくアドバイザリに対して行うこと。

[`🔗 GHSA-pvmq-3jr9-v5qh（busboy、ハング/リーク）`](https://github.com/fastify/busboy/security/advisories/GHSA-pvmq-3jr9-v5qh) · [`🔗 GHSA-wh8h-qr34-3rj3（busboy、クラッシュ）`](https://github.com/fastify/busboy/security/advisories/GHSA-wh8h-qr34-3rj3) · [`🔗 GHSA-gmhr-r4mc-w935（multipart、偽造ファイル）`](https://github.com/fastify/fastify-multipart/security/advisories/GHSA-gmhr-r4mc-w935)

---

## 17. TrnRT がオープンソース化：AWS Trainium 向け LLM 推論エンジン——NKI メガカーネル、1台で毎分357万トークン

- **Velocity:** ▮ steady
- **Source:** github.com/RunanywhereAI/trnrt · 27+ pts on HN · 4.3h ago (~00:01 UTC+8)
- **Tags:** `inference` `trainium` `kernels` `openai-api`

TrnRT は AWS Trainium 向けのオープン推論エンジンだ——このチップのソフトウェアスタックはこれまでほぼ完全に AWS 内部（Neuron SDK）に閉じていた。単体の `trn2.48xlarge` で OpenAI 互換 API を提供し、デコードを **NKI メガカーネル——約半層につき1つの融合カーネル**（KDA アテンション、融合 DSA 層、mHC、MoE FFN）として実行し、FP8 KV ページ上のラディックスツリー形式プレフィックスキャッシュにホストメモリ層を重ねる。**GLM-5.3-Flash が最初の対応モデル。**自前のカードとブログによる測定値の主張：**1台の trn2.48xlarge で毎分357万トークン**（AgentX、batch 12）、**24 ms の batch-8 デコードステップ**（32.2 ms から削減）、スポット価格で**100万トークンあたり $0.040**（容量ブロックで $0.167）。100万トークン文脈は疎アテンション（top-2,048）と固定サイズ状態の線形アテンションで実現。全グラフは CPU ホスト上でオフラインコンパイルされ、サービング機はデフォルトでは何もコンパイルしない。

**Why it matters:** AWS の Trainium ソフトウェアの物語は、AWS サービス内部のクローズドソースカーネルだった。層ごとのカーネル設計を公開し、誠実な同時実行数を出すオープンなエンジンは、そのハードウェア上で誰がカスタム推論を組めるかを変える——そして $0.040/M トークンのスポット価格は、安価な推論競争における具体的なデータポイントだ。リポジトリは若い（10月30日作成、1.6k スター）し、現状単一モデル。性能主張はベンダー測定と見なし、手法はブログのリンクで確認すること。

[`🔗 RunanywhereAI/trnrt`](https://github.com/RunanywhereAI/trnrt) · [`🔗 ブログ：Serving GLM-5.3-Flash on one Trainium2 box`](https://runanywhere.ai/blog/glm-5-3-flash-trainium2-nki-megakernels) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50533270)

---

## 18. Arcane の v3 ラインがトレンドに登場：エージェントが manager-only 作業をスキップする Docker 管理

- **Velocity:** ▮ steady
- **Source:** github.com/getarcaneapp/arcane · 654★ today · v3.0.1 released Nov 15
- **Tags:** `docker` `self-hosted` `devops` `agents`

Arcane——Go 製のセルフホスト Docker 管理 UI（「Modern Docker Management, Designed for Everyone」、9.2k★）——が v3 リリースラッシュの勢いで**本日 +654★**。v3.0.0（11月14日）はリデザインされたダッシュボードとアクティビティセンター、ライブアップグレード進行状況、拡張されたバックアップと GitOps 能力に——リリースノート自身の言葉で——「substantial performance, security, agent, and interface」の変更をもたらし、v3.0.1（11月15日、`cli/v3.0.1` も同時）はエージェントモードの起動と性能の問題を修復し、証明書と更新の検証を強化し、本フィードが関心を持つ理由になる変更を1つ行った。**「Agents now skip manager-only work.」**main ブランチは既に v3 ライン、2.x はメンテナンスブランチだ。

**Why it matters:** Docker 管理は、セルフホスターがコーディングエージェントに出会う層だ——サーバーをメンテナンスするエージェントはますます Docker と話す必要があり、Arcane の権限分割（エージェントは swarm 制御など manager-only 操作から排除）は、エージェント ops ツールの波が何度も再発見している最小権限パターンそのものだ。今回の上昇には検証可能なトリガーがある。2日で2リリース。

[`🔗 getarcaneapp/arcane`](https://github.com/getarcaneapp/arcane) · [`🔗 v3.0.1 release notes`](https://github.com/getarcaneapp/arcane/releases/tag/v3.0.1) · [`🔗 v3.0.0 release notes`](https://github.com/getarcaneapp/arcane/releases/tag/v3.0.0)

---

## 19. Launch HN: StarSling (YC P25)——最適化 PR を開けてくる CI、「エージェントは CI がチェックできるより速くコードを書く」から

- **Velocity:** ▮ steady
- **Source:** starsling.dev · 20+ pts on HN · 1.3h ago (~03:01 UTC+8)
- **Tags:** `ci-cd` `github-actions` `devtools` `yc`

StarSling は YC P25 からローンチし、その問題設定は本フィードの読者層に正確に狙いを定めている。**「Agents write code faster than CI can check it.」**製品は GitHub Actions 向けの AI ネイティブ CI だ。`runs-on: ubuntu-latest` を `runs-on: starsling-ubuntu-26.04` に替えるだけのドロップインランナー（第5世代 AMD EPYC、各ジョブは使い捨てのハードウェア分離 microVM 内）に加え、ワークフロー、ジョブ、実行ログ、マシンテレメトリを継続的に分析してキャッシュ、並列化、依存インストール、テストシャーディングの PR を開くエージェント——レビューとマージは自分で行う。最適化 PR は無料プランではデフォルトオフ。測定値の主張：TypeScript ジョブの中央値 **131.5秒 → 61秒**、Mastra のテストスイート**6倍速**（29分56秒 → 5分06秒）、Partcl のキュー時間は16分の1、$0.008/分で秒単位課金かつキュー時間は課金なし（「GitHub Actions より33%安」）、これまでに300万以上の CI ジョブを実行。

**Why it matters:** エージェント大量リポジトリの問題は現実にある。1リポジトリが1日に数十のエージェント PR を吸収するとき、20分の CI ループと GitHub ホストのキュー時間がボトルネック資源になり、「自分を改善する CI」は今週のエージェントインフラの波の他の部分と同じ「苦役の置換」パターンだ。主張は同社自身のベンチマークだ。131秒対61秒の中央値が、彼らに果たしてもらうべき誠実な数字だ。

[`🔗 StarSling`](https://starsling.dev) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50536468)

---

## 20. Java4Shell（CVE-2026-114938）：OpenJDK の JIT Base64 組み込み関数における事前認証 RCE——AI で「1時間」で発見、同日に修正

- **Velocity:** ▮▮▮ trending
- **Source:** calif.io · 626+ pts on HN · 7h ago (~05:11 UTC+8)
- **Tags:** `cve` `openjdk` `rce` `jit`

Calif が **Java4Shell** を公開した。OpenJDK の AVX-512 Base64 組み込み関数におけるメモリ破壊バグだ。「The x86-64 Base64 intrinsic miscalculated the padded tail's store mask, causing an out-of-bounds write」（x86-64 Base64 組み込み関数がパディング末尾のストアマスクを誤計算し、境界外書き込みを引き起こす）——65文字の入力（`A` 64個 + `=`）で50バイトのバッファが62バイトオーバーフローする。「affects OpenJDK from version 17.0.6 or newer」（17.0.6 以降の OpenJDK に影響。Oracle 自身のレコードは影響を受ける Java SE ビルドとして 8u511b33-perf、17.0.21.0.3、21.0.13.0.3、25.0.5.0.3、27.0.1.0.3 を列挙）で、AVX-512 VBMI 対応の x86-64 CPU のみ——ARM64 は影響を受けない。衝撃的なのは影響実証の方だ。**Keycloak、Jira、Confluence、JFrog Artifactory、Jenkins、PingFederate での事前認証 RCE**、Kafka、Solr、Elasticsearch、Gerrit、Spinnaker での認証後 RCE、**JavaBleed** と名付けられた Heartbleed 型のヒープリーク、さらに悪意ある TLS サーバー経由のクライアント側亜種。Oracle は太平洋時間 11月17日午後1時にパッチを公開。アップグレードまでの緩和策は `-XX:-UseBASE64Intrinsics` か `-XX:UseAVX=2`。スコアの出所：NVD レコード（`Received`、22:18Z 公開）には Oracle CNA のスコア——CVSS 3.1 **8.1**（AV:N/AC:H）——が載り、Calif の記事は CVSS 4.0 で **9.2 CRITICAL** と計算している。製品別の武器化エクスプロイトは「until everyone has had a chance to upgrade」（全員がアップグレードを終えるまで）公開を控えている。

**Why it matters:** 発見の経済性が物語の中の物語だ——Calif によれば Quang Luong が「an hour to discover the vulnerability, and two more hours to develop the first working exploit」（脆弱性発見に1時間、最初の実用エクスプロイトにさらに2時間）、「the total token cost… less than $200」（トークン総コスト200ドル未満）。彼らの PHP2Shell/Squidbleed に続く AI 支援パーサー・JIT 研究の延長線上にある。発見は JFrog、Horizon3.ai、Red Hat（RHSB-2026-018）によって独立に裏付けられた。Oracle の AC:H はエクスプロイトの摩擦が現実であることを示す（ASLR バイパス＋ヒープ・フeng shui＋標的別の個別チェーン——「not a universal point-and-shoot」）。しかし Base64 をデコードするすべての JVM サービス——ほぼ全部だ——がこのコードパスを抱えている。

[`🔗 Calif：Java4Shell`](https://calif.io/java4shell/) · [`🔗 JFrog：わかっていること`](https://research.jfrog.com/post/java4shell-vulnerability) · [`🔗 Red Hat RHSB-2026-018`](https://access.redhat.com/security/vulnerabilities/RHSB-2026-018) · [`🔗 NVD：CVE-2026-114938`](https://nvd.nist.gov/view/vuln/detail?vulnId=CVE-2026-114938) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50538240)

---

## 21. Quad9、毎日のブロック罰金よりフランスからの無料 DNS リゾルバー撤退を選ぶ——Cloudflare は「a canary in the coal mine」と呼ぶ

- **Velocity:** ▮▮ rising
- **Source:** blog.cloudflare.com · 356+ pts on HN · 6h ago (~06:13 UTC+8)
- **Tags:** `dns` `policy` `france` `blocking`

Quad9（9.9.9.9 のスイス非営利団体）は、著作権侵害ドメインのブロック拒否で**毎日の罰金**を課す裁判所命令に数か月の訴訟の末で直面し、リゾルバーをフランスから完全に引き上げる。CDN とプロキシサービスでコンプライアンスを示せた Cloudflare と違い、純粋な公共リゾルバーには代替の準拠経路がなかった。選択は「crippling litigation and penalties」（骨まで削る訴訟と罰金）か、プライバシー保護サービスの根本的変更か、だ。周囲の判例の格子も重要だ。ブリュッセルの裁判所は **Cloudflare、Google、Cisco** に対し2027年1月初めまでに公共リゾルバー経由のブロックを命じ（3社とも控訴中）、ドイツの裁判所は過去に DNS ブロック要求を拒否し、Cisco はすでに OpenDNS をフランス・ポルトガル・ベルギーから引き上げた。Cloudflare の論点：リゾルバーレベルのブロックは無効（切り替えは1分以内）、不精確（ドメイン単位で合法的コンテンツも巻き込む）、不透明——病院、大学、政府機関は「their Internet will fail with no explanation」（自分たちのインターネットが説明なく死ぬ）ことに気づく——そしてリゾルバーは世界規模なので、一国が「could dictate what content is accessible around the world」（世界中でアクセスできるコンテンツを決定しかねない）。提案する代替策：侵害ファイルが実際に存在するホスティングプロバイダーレベルでの執行だ。

**Why it matters:** 毎日罰金の訴訟に追い込まれた最初の公共リゾルバー撤退は、どの管轄でもコピーできるテンプレートだ——ベルギーの2027年1月期限が次のチェックポイントになる。控訴が敗れれば、リゾルバーレベルのブロックはフランスの例外ではなく EU の標準になり、すべてのプライバシー重視リゾルバーが Quad9 と同じ選択に立たされる：準拠、地域撤退、あるいは訴訟。

[`🔗 Cloudflare：Quad9 のフランス撤退`](https://blog.cloudflare.com/quad9-withdrawal-from-france/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50538994)

---

## 22. jQuery 4.1.0 と 3.8.0 が同時リリース——「passing the torch」：3.x は最後の機能リリース、両ラインに ReDoS 修正

- **Velocity:** ▮▮ rising
- **Source:** blog.jquery.com · 269+ pts on HN · 8.5h ago (~03:50 UTC+8)
- **Tags:** `jquery` `javascript` `release` `redos`

jQuery は2バージョンを一度にリリースした。**4.1.0**（4.x ライン初のマイナー）と、**3.8.0**——「a send-off, not a comeback」（送別出しであり、カムバックではない）で、3.x 分支の最後の計画された機能リリース。以後 3.x は「critical security and bug fixes」のみを受け取る。両方に**セレクター識別子マッチングの ReDoS 修正**（破局的バックトラッキングがページをハングさせ得た）と、新しいオブジェクトベースの AJAX トランスポート complete-callback API が入った。4.1.0 は `jqXHR.responseURL`（issue #4339、ついに）を追加し、セレクターエンジンを完全に `querySelectorAll` へ移行し、`createElementNS` で XML ドキュメント処理を修正し、`.serialize()` が form-associated カスタム要素を扱い、`uniqueSort` を O(N²) から O(N) に削り、**Safari 27 の正規表現インタプリタバグ**を回避する。3.8.0 は `hidden="until-found"` サポートと正式な非推奨化（プロトタイプ上の `push`/`sort`/`splice`、`jQuery.expr.filters`）。同じリリースサイクルでリポジトリには「guidelines for machine-generated contributions」が追加された。

**Why it matters:** 巨大な 3.x インストールベースが行動できる日付付きマイルストーンだ。トーチは正式に 4.x へ移り、アップグレードガイドと Migrate プラグインがその道で、両分支に同時投入されたセキュリティ修正は、バージョン固定サイトも動くべき理由になる。20年の歴史を持つライブラリが同じ発表に静かにエージェント貢献ガイドラインを載せるのは、それ自体が2026年の成果物だ。

[`🔗 jQuery ブログ：4.1.0 と 3.8.0 をリリース`](https://blog.jquery.com/2026/11/17/jquery-4-1-0-and-3-8-0-released-passing-the-torch/) · [`🔗 4.1.0 リリースノート`](https://github.com/jquery/jquery/releases/tag/4.1.0) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50537156)

---

## 23. マイクロソフトの ONNX Runtime が GitHub から消えた——リポジトリ・releases フィード・API がすべて 404、PyPI は 1.32.0 をまだ配信、説明はなし

- **Velocity:** ▮▮ rising
- **Source:** github.com/microsoft/onnxruntime · 175+ pts on HN · 5h ago (~07:18 UTC+8)
- **Tags:** `onnx` `supply-chain` `github` `inference`

microsoft/onnxruntime——ローカルとエッジの AI の相当な部分を支える推論エンジン——が一晩で闇に消えた。**11月18日 04:16 UTC** 時点でリポジトリページ、`releases.atom` フィード、GitHub API のすべてが **404** を返す。事前通知も公式声明もない。HN のコメント者は下流の破損を報告している（「we found out about this this morning, when evals started failing in our pipelines」——今朝、評価パイプラインが失敗し始めて知った）、「a repository with 22k stars」が闇に消えたと表現する人もいる。検証済みの部分：**PyPI はまだ `onnxruntime` 1.32.0 を配信している**——消失より前のリリースだ——最も近い公開フォークは **intel/onnxruntime**（Intel の OpenVINO 変更を含む）。未検証の部分：原因だ。スレッドの憶測はセキュリティテイクダウンから組織再編まで及ぶ。あるコメント者が無関係な PyPI 汚染の解説をリンクした——いずれも未確認だ。

**Why it matters:** パッケージがまだインストールできても、上流の消失は運用イベントだ。ソースからビルドする人、issue を立てる人、CI でリポジトリの存在を前提にしていた人が、音もなくそれを失った。「全部 vendor する」習慣にまた一件、データポイントが増えた。正直に日時を刻んでおく：これは発展中の話だ。リポジトリが新しいパスで復活すれば、消失は改名だったことになる——誰かがそう言うまで、「説明のない消失」が正確な状態だ。

[`🔗 github.com/microsoft/onnxruntime（現在 404）`](https://github.com/microsoft/onnxruntime) · [`🔗 intel/onnxruntime フォーク`](https://github.com/intel/onnxruntime) · [`🔗 PyPI：onnxruntime 1.32.0`](https://pypi.org/project/onnxruntime/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50539610)

---

## 24. ID.me が TreasuryDirect の唯一のサインインになり、仲裁条項が付く——上院議員はなぜ Login.gov ではないのかと問う

- **Velocity:** ▮▮ rising
- **Source:** consumerrights.wiki · 182+ pts on HN · 3.5h ago (~08:51 UTC+8)
- **Tags:** `privacy` `identity` `irs` `policy`

ID.me の最新規約は、続くプライバシー係争をさらに鋭くする。v10.1.0（2026年11月13日付）は拘束力ある仲裁条項と集団訴訟放棄を維持し（新規は30日のメール脱退窓口）、プライバシーポリシー v7.1.8（11月2日）は、プラットフォームの使用をもって ID.me が「determines how personal information may be used」（個人情報の使われ方を決定する）ことへの同意と定める。アカウント解約後も確認履歴は最長3年保持され、生体情報削除要求は内部審査に入り得て ID.me は「reserves the right to decline」（拒否する権利を留保する）、責任上限は1,000ドル。鋭い刃はアクセス変更の方だ。**TreasuryDirect は9月13日に ID.me を導入し、10月28日に従来のログインを置き換えた——そして Login.gov は「cannot be used to log in to your TreasuryDirect account」（TreasuryDirect アカウントのログインに使えない）**——OMB メモ（M-26-18、8月31日）が機関に対し Login.gov が対応できる利用者層ではデフォルトとして推進することを求め、Wyden/Warren の書簡（10月27日）が GSA プラットフォームを名指しする法令 6 U.S.C. §1523(b)(1)(D) を引用しているにもかかわらず、だ。ID.me の5年契約の上限は10億ドル超（これまで約9,300万ドルが執行）。2027年申告シーズンについて IRS は「Taxpayers can use Login.gov or ID.me」（納税者は Login.gov か ID.me を使える）と言う——TreasuryDirect 利用者にその選択肢はなく、Direct Pay がサインイン不要の退路であり続ける。

**Why it matters:** 政府運営の身元確認オプションは存在し、法令上優先されているのに、貯蓄債ポータルは依然として全員を、仲裁とデータ利用同意を括った規約を持つ民間プロバイダーへルーティングする——メモ、法令、議員書簡は今や公開済みだ。IRS/Treasury 統合を構築する人への運用上の事実は非対称性だ：IRS には2つのプロバイダー、TreasuryDirect にはちょうど1つ。

[`🔗 Consumer Rights Wiki：ID.me 規約が IRS サインインに必須に`](https://consumerrights.wiki/w/ID.me_terms_required_for_IRS_sign-in) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50540437)

---

## 25. 11月12日に Apple Support Community の11月20日閉鎖を報えた件のその後：Archive Team が8言語で保存を急いでいる

- **Velocity:** ▮ steady
- **Source:** wiki.archiveteam.org · 113+ pts on HN · 4.8h ago (~07:32 UTC+8)
- **Tags:** `archival` `apple` `preservation` `community`

本フィードが11月12日に旗を立てた話のアップデート：Apple は11月10日「The Apple Support Community will permanently close on November 20, 2026」（Apple Support Community は2026年11月20日に永久閉鎖します。告知以降は読み取り専用）と発表し、Archive Team は金曜の締切に向けて完全な保存プロジェクトを立ち上げた。DPoS 方式——ArchiveTeam Warrior を走らせれば自動で取得する——で、`applediscussions-grab` スクリプト、tracker.archiveteam.org/applediscussions のアイテムトラッカー、hackint の #badapple での調整が整っている。対象は英語サイトだけではない。**7つの地域コミュニティ**（フランス語、中国語、日本語、韓国語、ドイツ語、スペイン語、ポルトガル語）が範囲だ。Wiki 上の進捗は「In progress…」のままで、完了数字はない。

**Why it matters:** 20年分のトラブルシュート回答——Apple がもはや文書化していない問題の回避策を含む——が2日で消える。しかも8言語の範囲は、非英語アーカイブも消えることを意味する。プラットフォーム閉鎖からボランティアの群れが動くまでの時間は、今や日単位だ。10年前のスレッドに助けられたことがあるなら、今週 Warrior を走らせることが1コマンドで恩返しする方法だ。

[`🔗 Archive Team Wiki：Apple Discussions`](https://wiki.archiveteam.org/index.php/Apple_Discussions) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50539747)

---

## 26. 「Not Everything Needs an LLM」：PostHog の決定モデル実戦台帳——PII チェックの98.7%は大きなモデルに届かない、失敗例も印刷済み

- **Velocity:** ▮ steady
- **Source:** newsletter.posthog.com · 113+ pts on HN · 10h ago (~02:16 UTC+8)
- **Tags:** `decision-models` `llm` `engineering` `routing`

決定モデルカテゴリは一週間で4つのベンダーローンチを迎えた（Google の Decisions API 11月12日、Perplexity Decider 11月14日、HeyGen Decision 1 は昨日）。PostHog のエッセイは実践者の対極にある——数字は自分たちの本番スタックからだ。Replay Vision の PII 洗浄は1つの広い質問の代わりに2つの狭いイエス/ノーの質問を投げ（誤検知は約10分の1に）、**セッション要約の98.7%は LLM 呼び出しを完全にスキップする**。Slack ボットは選択型の質問でルーティングし（「cheapest option that will most likely finish the task correctly on the first try」——一発で正しく終えられそうな最安の選択肢）、検索は embedding 候選を確率で再ランク付けし（20テストクエリで約+25%）、SQL チャートピッカーは手書きの決定論的ルールを置き換えた。失敗も印刷されている、それが信頼できる理由だ。閾値は誤りのコストを符号化する（PII は0.4——見逃しはデータ漏洩。ボットは0.85——誤検知は迷惑）、12–38k トークンの要求を出すランク付けジョブが「flooded the model server and blocked other products' calls for hours」（モデルサーバーを水没させ、他製品の呼び出しを何時間も塞いだ）、PR レビューのランク付けは素直に失敗した（AUC 0.52）。

**Why it matters:** カテゴリにフィールドマニュアルができた。型付きの決定を LLM の下のゲーティング/ルーティング層に置き、キャリブレーションこそが実際のエンジニアリングだと。「Too simple for a language model, yet too fuzzy for a regex」（言語モデルには単純すぎ、正規表現には曖昧すぎる）は現実の製品境界で、98.7% のバイパス数字は今週どのベンダーローンチも暗示していたコスト論の具体形だ。

[`🔗 PostHog：Not Everything Needs an LLM`](https://newsletter.posthog.com/p/decision-models) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50535740)

---

## 27. ハーバードの企業レベル研究（11月14日改訂版）：エージェントはコード出力を最大76%押し上げるが、最終成果は9–11%——コードレビューがボトルネック、提出から承認まで +56%

- **Velocity:** ▮ steady
- **Source:** complexdiscovery.com · 89+ pts on HN · 7h ago (~05:16 UTC+8)
- **Tags:** `research` `ai-coding` `economics` `code-review`

*訂正（2026-11-18 13:10 UTC+8）：本項目は当初、論文の旧改訂版（解決済みチケットは横ばい、マージ +3.45日、718社・従業員725,938人）を引用していた。現行版——2026年11月14日、一次読解——がこれらの数字を置き換える。いずれも現行テキストには現れない。方向（出力上昇、レビュー詰まり）は変わりなく、むしろ強まっている。*

ハーバードのジョブマーケットペーパー（Fiona Chen と James Stratton、「Artificial Intelligence in the Firm: Bottlenecks in Software Production」、現行版 **2026年11月14日**。初稿2026年1月7日）は、Jellyfish エンジニアリング分析プラットフォームの **4億4,500万ワークイベント**（GitHub のコーディング活動、Jira チケット、Google カレンダー）から **655社・従業員720,542人**を対象に（2021年1月–2026年8月）、AI **アシスタント**と AI **エージェント**を分けて推定した。形はこうだ。アシスタント採用後、中央値企業のワーカー月あたりコード行数は **+42%**（3,115 → 4,424）、エージェント採用後は **+76%**（3,679 → 6,482）。コミット +14%/+23%、PR +15%/+32%——一方で**解決済み Jira チケットは +9%（2.53 → 2.76）と +11%（2.76 → 3.08）しか動かず**、エピックはほぼ不変。着地点はレビュー段階だ。エージェント採用後、レビュー提出から承認までの平均時間は **+56.1%**。内訳はバックログ待ち **+1.67日（2.78日基準の59.9%）**とアクティブレビュー **+2.33日（3.98日の58.5%）**、変更あたりコメント数 **+38.6%**——アシスタントはこれらのマージンで有意な効果がない。AI レビューツールはこれを救えなかった。2026年7月までに **79.1%** の企業がレビューで AI を使用したが、AI 生成のレビューコメントは **23.3%** のみ（PR の10.8%に1件以上の AI コメント）——「humans are still heavily involved with review」（人間は依然としてレビューに深く関わっている）。限界は開示済み。ピアレビューを完遂していないワーキングペーパー、Jellyfish の商業的利益（著者らは謝辞で Jellyfish チームに感謝している）。

**Why it matters:** 先行指標が出荷指標を追い抜くとき、制約には名前と数字がつく。レビューのスループット——承認時間 +56%、変更あたりコメント +38.6%、解決済みチケットは一桁。ツールビルダーにはこれが addressable market で、チームには、レビュー容量の計画なしのエージェント採用は速度をキュー時間に変換する、ということだ。

[`🔗 ComplexDiscovery：ハーバードの研究者が AI コーディングエージェントはボトルネックをコードレビューへ移したと発見`](https://complexdiscovery.com/harvard-researchers-find-ai-coding-agents-shifted-the-bottleneck-to-code-review/) · [`🔗 ワーキングペーパー（PDF、11月14日テキストを一次読解）`](https://fion.ac/jellyfish.pdf) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50538303)

---

## 28. 高度500kmでの1メガトン核爆発は、モデル化された LEO 衛星の約98%を1週間で無効化——放射線耐性を3倍にしても得られるのは数日

- **Velocity:** ▮ steady
- **Source:** arxiv.org · 88+ pts on HN · 8.6h ago (~03:46 UTC+8)
- **Tags:** `arxiv` `space` `satellites` `research`

arXiv 論文（2611.09827、11月6日に Petersen、Qin、Thiele、Philippe が投稿）は、即発放射、電子捕獲、放射線帯の進化を、低軌道核爆発に対する衛星の故障・衝突・大気抵抗と結合させた——そこには今や13,000基超の衛星が運用されている。中心ケース：南大西洋上空500km での1-Mt 爆発が作る人工放射線帯の反復曝露は「disables approximately 98% of modeled satellites within one week in our central case」（中心ケースで1週間以内にモデル化衛星の約98%を無効化）する。厳しいのは耐性の数学の方だ。「**Tripling the assumed radiation tolerance delays widespread failure by only days: approximately 97% are still disabled within two weeks.**」（想定放射線耐性を3倍にしても広範な故障は数日しか延びない。2週間以内に約97%がまだ無効化される。）機動力を失ったことは衝突リスクに複利で効く——漂流する故障衛星により、2年で約20件の衝突が予想される。

**Why it matters:** これはモデルであって実験ではない——著者は「in our central case」と印刷しており、前提そのものが論点だ。だが方向性の発見は刺さる。衛星グレードの耐性強化はほとんど結果を動かさない。脆弱性は個々の衛星のシールドではなく、軌道シェルのアーキテクチャそのものにある——1967年の宇宙条約が宇宙空間での核爆発を禁じた理由に、爆発そのものを耐えられる大国向けの定量化された脚注が1つ増えた。

[`🔗 arXiv 2611.09827`](https://arxiv.org/abs/2611.09827) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50537120)

---

## 29. Tencent が Hy4 Flash を出荷：総224B/活性12B、1M コンテキスト、100万トークンあたり入力 $0.07/出力 $0.28——低価格層がベンチマーク合戦になる

- **Velocity:** ▮ steady
- **Source:** hy.tencent.ai · 78+ pts on HN · 7.3h ago (~05:06 UTC+8)
- **Tags:** `tencent` `model-release` `inference` `efficiency`

Tencent の Hunyuan ラインが **Hy4 flash** を出荷した（11月16日投稿、今 HN に浮上）：64B の「Engram」パラメータを含む総224Bパラメータでトークンあたりわずか **12B が活性**、ネイティブ・マルチモーダル、100万トークンのコンテキスト。効率スタック：ハイブリッドアテンション + LatentMoE + Engram が KV キャッシュを **Hy3 の1/24、Hy4 の1/6** まで縮め、Hy4 からの自己蒸留に強化学習が「cuts average end-to-end output tokens by 50%」（平均エンドツーエンド出力トークンを50%削る）を重ね、megakernel と4-bit 量子化がデコードを150 tok/s 超へ押し上げる。見出しは価格だ。**100万トークンあたり $0.003 キャッシュ / $0.070 入力 / $0.281 出力**（Hy4：$0.042/$0.834/$2.501）。主張は Tencent 自社の WorkIndex ベンチマーク（「grounded in typical WorkBuddy tasks」——スライド/文書/スプレッドシート作業、8評価セット）に頼る。タスクあたり平均コストは「just 1/13 of Hy4 preview, 1/20 of Hy4, and 1/8 of DeepSeek-V4.1-Flash-1017 (Max tier, peak-hour pricing)」（Hy4 プレビューの1/13、Hy4 の1/20、DeepSeek-V4.1-Flash-1017（Max 層・ピーク時価格）の1/8）。社内ユーザー85人・259タスクのブラインド評価で満足度は「close to Claude Haiku 5.5」（Claude Haiku 5.5 に近い）。HN コメント者は OpenRouter 経由で良好な結果を報告し、あるデータ分析ベンチマークでは低価格層で GPT-6 Luna を上回ったという（43問に $0.13。フロンティアモデルでは約 $20）。重み公開のコミットメントがスレッドで報じられている。その文は読み取り可能なテキストには見当たらない（ページは JS シェル）。Tencent が grep できる場所に貼るまで未確認として扱う。

**Why it matters:** 実際に価格戦争に噛まれているのは働き者層だ。このモデルは Hy4 の出力価格の約4分の1で、Hy4 プレビューをわずかに上回るタスク品質を主張し、flash 層のパターン（GLM-5.3-Flash、DeepSeek V4.1 Flash、Qwen flash）を3大陸で競争力のあるまま保つ。注釈は携帯のまま：WorkIndex は Tencent の内部ベンチマークで、タスクあたりコスト比はベンダー測定だ。

[`🔗 Tencent：Introducing Hy4 flash`](https://hy.tencent.ai/research/hy4-flash) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50538184)

---

## 30. Cerebras が推論を分離：AMD GPU がプリフィル、ウェハがデコードを担う——1つの実測エンドポイントでメガワットあたり5倍のトークンを主張

- **Velocity:** ▮ steady
- **Source:** cerebras.ai · 42+ pts on HN · 3.5h ago (~08:56 UTC+8)
- **Tags:** `inference` `cerebras` `gpu` `efficiency`

Cerebras が disaggregated inference をローンチした。**AMD Instinct GPU がプロンプトを処理し、Cerebras CS-3 ウェハスケールシステムが応答を生成する**——プリフィル/デコード境界でパイプラインを分割する。デコードは自己回帰でメモリ帯域律速であり、ウェハスケールエンジンの SRAM 中心設計（「350× the SRAM capacity and 5,400× the memory bandwidth of a typical GB300 GPU」——典型的な GB300 GPU の350倍の SRAM 容量と5,400倍のメモリ帯域と主張）が構造的優位を持つのはそこだからだ。実測の主張：「5X the throughput per megawatt of a CS-3-only configuration, with no loss in token generation speed」（CS-3 専用構成比でメガワットあたりスループット5倍、トークン生成速度の損失なし）——ただし11月14日の単一共有 **GPT-OSS-120B エンドポイント**から。1モデル、1日、1×に正規化。名指しされた早期アクセスパートナー：AWS、Fireworks AI、Gimlet Labs、General Compute。「hundreds of megawatts」（数百メガワット）の Cerebras クラウドとパートナーサイトへの展開は2027年末を目標とし、並行して700MW のデータセンター容量を計画。

**Why it matters:** プリフィル/デコード分離は GPU エコシステム内ではすでに標準的実践だ。新しいのは、デコード側を GPU 以外のシリコンに向け、メガワットで価格を語ることだ。注釈が実仕事をしている：5倍は1エンドポイント、1モデル、ベンダー測定。一般化すれば、すべての2027年データセンター計画が載っている電力の算術を変える。しなければ、ローンチ日のスライドだ。どちらの結末も生きている。

[`🔗 Cerebras：Disaggregated Inference`](https://www.cerebras.ai/blog/cerebras-launches-disaggregated-inference) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50540472)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-18T04:42:08Z |
| Items | 30 |
| Sources tracked | 34 (Hacker News, GitHub Trending, OpenAI, Microsoft AI, Apple, Reuters/NYT/CNBC/FT/SCMP/Fortune, NVD/GitHub advisories, vendor blogs, Phrack, SolidJS, Runta, Antfly, Calif, JFrog, Red Hat, Cloudflare, jQuery, Archive Team, PostHog, ComplexDiscovery/Harvard, arXiv, Tencent Hunyuan, Cerebras) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[Previous day](2026-11-17.md) · [Raw .md](https://trending.md/jp/feed/2026-11-18.md) · [Archive](../archive/index.md)
