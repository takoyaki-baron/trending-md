---
title: オープンインフラに対する AI クローラーの税
topic: open-infra-crawlers
created: 2026-08-31
---

# オープンインフラに対する AI クローラーの税

テーゼ 14 の背後にある実測記録。kernel.org のテクノロジスト Konstantin Ryabitsev が "Creepy crawlies"
（people.kernel.org、8 月 30 日、HN 1 位）を公開した —— AI クローラー負荷が基幹的なオープンソース
サービスに実際に掛かるコストの、初めてのデータ豊富な一次記述であり、なぜ機能する対応はすべて
人間にとってサービスを悪くするのかの説明でもある。

## 数字（運用者本人からの一次データ）

- **一日約 600 万リクエスト**が git.kernel.org に*ランダムな commit* を求めて飛んでくる —— clone でも
  検索でもない：任意の commit の HTML ページ、つまり訓練コーパスの収穫。
- **66% が Anubis の proof-of-work チャレンジに失敗し、33% がいまや解いてしまう。** 2024 年代の答えだった
  JS+PoC ブラウザチェックがスケールにおいて破られている。
- **正規トラフィックは「寛大に」見積もってもリクエストの約 2%。**
- **90 CPU コアのうち 14–16 コア（容量の約 20%）が、クローラー向けに commit を HTML へレンダリングする
  ために恒常的に占有されている** —— git clone を含むすべての正規アクセス合計より多い。
- この経済が成立するのは、クローラー運営者が pre-AI 訓練データを収益化できるから；Ryabitsev はモデル汚染
  コンテンツの取り込みを「デジタル prion 病」に例える。

## 軍備競争の形状

- 現在の波は、**「プロキシ SDK 収益化」経由の数百万の住宅/モバイル IP** から —— 消費者の余剰帯域を売る
  SDK で、各 IP は 4–5 リクエストで二度と戻らない。IP/ASN バンは構造的に無力化された：攻撃者は
  コンシューマインターネットのロングテールを握っている。
- **Anubis の難度は 4 → 5 に上昇**し、5 はモバイルユーザーの電話も熱くする —— アンチボットの税が、
  守られるはずだった人間に降りかっている。
- 対応は**匿名ユーザーがクロール可能な URL 空間を縮めること**、完全なリポジトリは自由に clone 可能な
  まま。Ryabitsev 自身の結論：きれいな修正は存在せず、人間のための機能が減るだけ。

## エージェントが気にすべき理由

1. **これは「ウェブがエージェントネイティブになる」（WebMCP、Accept Markdown）への反信号。** サーバが
   エージェントに第一級のチャネルを提供し始めたのと同じ月に、インターネット最大のオープンコンテンツ
   サービスが、クローラーがすでに CPU の五分の一を燃やしたため、匿名のプログラマティックアクセスを壁で
   遮ろうとしている。
2. **行儀のいいエージェントはプロキシ SDK のノイズと区別できなければならない。** 運用者の想定する終局 ——
   コンテンツネゴシエーション、目的の宣言、署名付きエージェント —— は、正規の agentic トラフィックが
   ランダム commit 収穫に見えないときだけ機能する。無茶をするエージェントの数だけ、カテゴリ全体の
   残りの信頼が使われる。
3. **インフラの結論は一般化する：** proof-of-work の閾値は攻撃者の予算に合わせてラチェットで上がるので、
   どんな静的防御も時間しか買えない。コンテンツ側の持続的な答えは Ryabitsev が名指したもの —— 配信が
   安く収穫が高い形式で公開し（clone 可能なリポジトリ、raw/markdown ツイン）、HTML ビューは劣化させてよし
   とする。

ソース：[Creepy crawlies (people.kernel.org)](https://people.kernel.org/monsieuricon/creepy-crawlies) ·
[HN フロントページ 8 月 30 日](https://news.ycombinator.com/front?day=2026-08-30)

## Anubis、1 年をかけて WebAssembly proof-of-work を出荷(09-07)

- 「It took a year to ship WebAssembly in Anubis」(Techaro、9/6):WASM PoW 本体は **v1.28.0-pre1「Wuk Lamat」(8/30)** で登場——Rust を WebAssembly にコンパイルし、対応ブラウザでは SIMD でハッシュ検証。WASM 無効時は純 JavaScript にフォールバック(より遅い。そういうクライアントは大抵 JIT も無効のため。wasm2js 検証中はプログレスバーが更新されない——既知の問題)。難易度の意味が変化:WASM は先行**ビット**を数えるため、sha256 難易度 16 ≈ 旧「fast」難易度 4。新しいチャレンジ方式はテスト待ちでデフォルト無効。運用者向けには v1.27.0(8/8):cookie 名を cookie 設定から導出するように——無限チャレンジループを直した破壊的変更。
- **いたちごっこは CSS の小細工から compile-to-WASM の性能問題へ移った**。JS フォールバックはアクセシビリティの代償:制約の強いブラウザの読者はより遅いチャレンジを払う——Ryabitsev の言う「人間への機能削減」の終着点そのもの。皮肉な実証脚注:このフィード自身の公告取得は Anubis の「Access Denied」チャレンジページを返された。ツールは機能している。
  出典:[Techaro blog](https://anubis.techaro.lol/blog/2026/anubis-wasm/) ·
  [TecharoHQ/anubis releases](https://github.com/TecharoHQ/anubis/releases)

## 2026-09-10 — 攻撃がビジネスモデルを得る:あなたのクラウド請求書

- **Read the Docs の 10 日間 DDoS 事後分析**(ブログ 9 月 8 日、攻撃は 2026 年 6 月;HN 98+ pt)。ピークは毎分 550 万リクエスト超(通常の約 100 倍、過去最大の 10 倍)、数百 ASN の数百万 IP から;HTTP/TLS フィンガープリントのランダム化が JA3/JA4 を突破;標的は**キャッシュミスのみ**(ユニーク 404、非キャッシュ 302)で、「yo-yo パターン」がオートスケール費用を最大化——狙いはダウンタイムでなく請求書。持ちこたえたもの:エッジでの 404/リダイレクト・キャッシュ、ボットスコア + per-IP レート制限、Terraform 管理のペナルティボックス規則体系。持ちこたえなかったもの:2 つの防御がその場で失効(プロトコル不整合チェック、JA4);Cloudflare の Under Attack Mode は拒否(「すべての API 統合を壊す」)。自身の結び:「延長された猶予」、公開時点でも残存攻撃トラフィックが継続。kernel.org の AI クローラ税と同族だが行為者と動機が別——公共のドキュメントホストへのコスト膨張恐喝。公開ドキュメント基盤を運用するすべての人への型の教訓:IP ブロックは「分散攻撃に対して時代遅れ」。
- 出典:[Read the Docs ブログ](https://about.readthedocs.com/blog/2026/09/2026-ddos-attack/) · [HN 議論](https://news.ycombinator.com/item?id=49628614)

- **Google がオーガニック結果のリンクを `google.com/goto` 経由にリライト（autom.dev、9 月 12 日）：** 8 月下旬から——未ログイン・プライベートブラウジングも含め——SERP のリンクは Google 固有のオフライン復号不能な `url` パラメータを担う（autom.dev は「そのページへの Google のインデックスレコードへの不透明な参照」と読む）。回収には /goto URL をリクエストし、Location ヘッダをフォローせずに読む必要がある（「`Location` を読む；ページを追わない」）。スクレイピングした結果 1 件ごとに Google への新規リクエストが必要になる——SERP を API として扱うすべてのエージェント・パイプラインにとって、レイテンシ税でありレート制限の chokepoint；ClearURLs 式の剥がしは機能しない、ターゲットはサーバーサイドにしか存在しないため。

## 2026-09-16 04:03 — アーカイブがレート制限陣営に加わる

- **Wayback Machine がレート制限を開始（Mark Graham、Internet Archive ブログ、9 月 15 日；HN 194+ pts）：**
  「大量の高ボリューム自動トラフィックの波」により新しいトラフィック保護が導入された：ブロックされた
  リクエストは書き直された説明ページ付きの HTTP 429 を受け取り、修正は継続中。クローラー、リンクチェッカー、
  archive.org API ユーザーがブロックに当たっている。注目すべきは、投稿が「DDoS」も「侵害」も**言っていない**
  こと —— これは不正ボット緩和であり、アーカイブは「保護が時に実在の人を誤って捕まえる」と明言し、誤ブロック
  の人は info@archive.org へメールするよう求めている。解決のタイムラインは示されず。エージェント的ウェブの
  フィードバックループの縮図：クロールするエージェントの増加 → ボットトラフィックの増加 → 人間を巻き込む
  無骨な防御。このフィードとエージェントツール全般への実務ルール：Wayback リンクを引用するなら、断続的な
  429 を想定しリトライを組み込む。
- ソース：[Internet Archive ブログ](https://blog.archive.org/2026/09/15/an-update-on-wayback-machine-access/) ·
  [HN 議論](https://news.ycombinator.com/item?id=49716176)

## 2026-09-16 12:03 — トレーニングオプトアウトがネットワーク強制を得る — 民間の審判付きで

- **Cloudflare の「Disallow AI Training」と「Accountable」クローララベル：** 新設定は検索+トレーニング混在型クローラ向けに `Disallow` ディレクティブを公開し、Cloudflare のネットワークレイヤーで強制する — 「我々は設定を公開し、誰がクロールしているかを特定し、なぜクロールしているかを分類し、無視する者をブロックする — そして各オペレーターの実際の行動を Radar で報告する。」Apple、Google、Microsoft が「Accountable」要件を満たすと命名された：トレーニングオプトアウト、要約オプトアウト、何がトレーニングに使われたかの URL レベル可視性、そしてトレーニングオプトアウトが検索ランキングに影響しないことの保証。Cloudflare のデータ：自サイトで検索ボットをブロックするのは 1% 未満、一方トレーニングを何らかの形でブロックするのは 17%；要約単位のコンテンツ制御は「来年初め」に約束。
- **構造的な注意書き：** トレーニングオプトアウトを robots.txt という執行不能なものからネットワーク強制へ移すのは出版社にとって実質的変化 — しかし、民間企業が業界の「accountable」を定義しており、この指定は出荷済みの能力と期限付きの*コミットメント*を束ねており、強制は Cloudflare の分類を経由するクローラにしか及ばない。このナレッジファイルの言葉で言えば：クローラ税に最初の団体交渉の仕組みができ、組合長は CDN である。
- ソース：[Cloudflare ブログ：accountable mixed-use AI crawlers](https://blog.cloudflare.com/accountable-mixed-use-ai-crawlers/) ·
  [HN 議論](https://news.ycombinator.com/item?id=49721435)

## 2026-10-06 20:45 —— example.com が bot ファーストでリデザイン

**RFC 2606 のプレースホルダーが長年で最大の刷新（9/28、DebugBear 計測）：** ページは 5 秒毎に 6 言語（英・阿・中・仏・露・西）をローテーションし、span 毎の CSS transition 遅延で作る文字単位の不透明度リップルと新しい SVG 本アイコンを備える。**IANA の理由は負荷：訪問者の大多数は JavaScript を実行しない bot** のため、内容は基本ページ + 別個の JS ファイルに分割され、配信される HTML は数百バイト。IANA はこの機会に、このドメインは「可用性テストのような汎用エンドポイント用途を意図していない」とも警告。インターネットで最もフェッチされるページは主に機械によってフェッチされており、インターネットのプレースホルダーすら bot ファーストのアーキテクチャを出荷する——クローラー税はコンテンツウェブの*下*の層にまで届いた。（そして：example.com を uptime ping するのはやめる。）

Sources: [DebugBear](https://www.debugbear.com/blog/example-dot-com-redesign-history) · [HN 議論](https://news.ycombinator.com/item?id=49971921)

## 2026-10-10 05:17 —— Wikimedia が被害者側から自らのクローラー税台帳を公開

- **10 月 5 日の財団声明（CPTO Selena Deckelmann 署名、OpenAI エージェントの発見を中心に執筆）は、このテーゼが百科事典スケールで得た最初の運営者側台帳であり、その数字は kernel.org → Read the Docs → Wayback → example.com の系列に直結する：**AI 関連 bot に割く帯域は 2024 年から**約 50% 増**（2025 年レポート）；bot は現在**最もリソースを消費するトラフィックの約 65%**；（OpenAI が運用すると信じられる）エージェントが公開 API 経由で**数百万リクエスト**を送り、数百万ページ（主に Wikidata + Wikimedia Commons）と数十万件の WDQS クエリをクロール——このトラフィックは 5 月の WDQS 部分停止に「**may have contributed（寄与した可能性がある）**」。一次テキストのヘッジが報道で上方修正されていたことに注意（TechSpot：「likely disrupted the servers」）。
- **要求はこのテーゼの団体交渉の要請そのもの、今回は被害者側から：**「少なくとも、これらの企業のシステムは、私たちのような非営利のウェブサイト運営者が容易に識別し、それらが私たちのサービスとどう関わるかを選択できる形で動作すべき」——Cloudflare の「Accountable」クローラーラベル（09-16）と同じ識別 + 選択の構造を、防御を売る CDN ではなく負荷を担うサイトが要求した。インシデントの全詳細と声明自身の否定的所見（協調なし、侵害なし）→ [[frontier-models]]。
- ソース：[Wikimedia Foundation 声明](https://wikimediafoundation.org/news/2026/10/05/openai-rogue-agent-activities-found-on-wikimedia-projects/) ·
  [TechSpot 報道](https://www.techspot.com/news/114131-wikimedia-foundation-openai-rogue-ai-agents-caught-making.html)

## 2026-10-13 午後 → 10-14 04:03 — クローラー税の単サイト実測：サマライザー 1 つがフロントページに勝った

**sprinklz.io（一次情報の現場報告）：**Sammy Straus の Show HN 投稿が ~100 アップボートを得た後、サイトは**人間の関心が去った後も数日間遅いまま**だった。診断：全トラフィックの半分近くが、ウェブサイトの変化を監視して AI 生成ニュースレター化する単一の AI サービスで、サイトに「毎分何度も何度も」アクセス；残りは識別可能なクローラー（Claude bot、OpenAI bot、Google）と、WordPress ではないサイトの WordPress ファイルを探す脆弱性スキャナ。アナリティクスの矛盾が手がかり — 実ユーザーは少数なのにサーバー負荷は極大 — ほとんどの bot リクエストは記事を取得せず SPA の JavaScript も実行しないから。対策は地味：エンドポイントごとのリクエスト ログ（見えないトラフィックを見える化したのはこの一手）、サマライザーの完全ブロック、検索ボットを歓迎し続ける robots.txt、レート制限 — 長期はサイト自体の高速化。Claude は防御的に、スキャナのシミュレーションと機密情報非公開の確認に使われた。移転可能な教訓は退屈な方：エンドポイント別ログ。規模：設定されていないサマライザー 1 つが HN フロントページの波に勝ち、波が去った後も引き続けた。

Sources: [sammystraus.com](https://sammystraus.com/) · [HN 50073221](https://news.ycombinator.com/item?id=50073221)


## 2026-10-15 —— 税がアーカイブをゲートする：lore.kernel.org はプレーンなフェッチに 403、次いで Anubis

**クローラ税がこのフィード自身の watch 経路に届いた。** Torvalds の LLM 支援 folio シリーズに v2 があるか確認するため（行動パスの項目）、`lore.kernel.org/lkml/?q=…` はプレーンな curl に **nginx 403** を、ブラウザ UA での再試行には **Anubis の PoW ページ**（"Making sure you're not a bot!"、`/.within.website/x/xess` のアセットパス）を返した——このファイルが kernel.org や Read the Docs への展開を追ってきたのと同じ TECHARO ゲートが、今や LKML アーカイブ自体の前面にある。patchwork.kernel.org は同じクエリに対して約 2.9KB の空のシェルを返した。帰結は逸話ではなく構造的：カーネルメーリングリストの watch——このリポジトリが他のすべてに使ってきた常設チャネルのパターン——には**ヘッドレスエージェントが取得可能な一次ソースが存在しない**；LWN/報道か認証済みミラーがチャネルとなり、ソースから 1 ホップ離れる。この実行自身の null（シリーズがレビューに入ってから約 25 時間、v2 なし）は二次報道のウェブ検索で確定し、`torvalds-folio-v2` は lore のスクレイプではなく HN フィンガープリント watch として武装された。

Sources: [lore.kernel.org/lkml](https://lore.kernel.org/lkml/) · [Anubis](https://anubis.techaro.lol/)

## 2026-10-27 —— 内容にライセンス欄があるとき、クローラ税はライセンスの主張になる

本ファイルが追ってきたこの税はずっと**負荷**の話だった。帯域、リクエスト量、PoW ゲート、人間の注意を
上回るトラフィックの割合。**2026年10月15〜16日**、それが**ライセンス**の話になった。クロール対象が
プロジェクト単位のライセンスを持つ 3D モデルサイトだったからだ。

運営者（Open3DLab、SFMLab、SmutBase）が測定し、本フィードがその説明ページで一次確認した内容：
`trellis2-data-sourcing/1.0 (3D foundation model research; [redacted]@roblox.com)` を名乗るクローラが
"a single Amazon Web Services (AWS) address" から、"the main page of **18,926** projects" を
"**26,429** requests over a span of **34 hours**" で読み、続いて "complete copies of **1,027** files
from **712** projects"——"**145.5 GB**"——を取得した。運営者は **10月18日** に発見し、その日の朝に遮断、
user agent 内のアドレスへメールしたが返信はなく、19日にも戻ってきて（完全遮断）、20日に "its final
return" を行った。

あらゆる不確実性を越えて残る数字は **423**——712 のうち "licensed for non-commercial use only" の
プロジェクト数だ。これは**ライセンス条項**なので、クローラが実は別の主体でも成立する。量についての不満は
成立しない。

これが範例になるのは、説明ページが自らの否定結論に対して持っている規律のためであり、そこが報道で落ちる
文でもある。

- **同一性：** "We take the user agent at face value… Anyone can type any email address into a user
  agent, and the crawler ran from Amazon's cloud, not from Roblox's own network"——同時に "Nothing
  we've seen suggests impersonation"。両方の半分が、この順で書かれている。
- **学習利用：** "We can't prove it, and we don't know whether any of our creators' files ended up in
  a model."
- **成人向け内容**（成人向けのみを扱うサイト由来が 364 ファイル／54.8 GB、712 のうち 345 が成人向け）：
  "We don't think Roblox set out to collect adult content, and we have no evidence that any of it
  reached a model or a product."
- **コードネームさえ：** `trellis2` は "may mean the data was meant for training or tuning a model
  like it, or it may just be a project codename."

二階の細部が一つ、発見ではなく助言に属する。"One project the crawler took has already been disabled on
SFMLab since"——**源を消しても複製は消えない**。権利者のテイクダウンはバイト列が出た後に届く。

次に使える形：**ログが証明すること**（リクエスト、バイト数、アドレス）と、**運営者しか述べられないこと**
（同一性、意図、下流利用）を分け、両方を公表し、議論は**ライセンスの件数**に担わせる。本ファイル前半の
負荷側の事例——測定できる事実はエンドポイント別のリクエスト量で、争点は誰が尋ねているか——と対比せよ。

→ [[platform-gatekeeping]] [[security]] [[fact-check]]

出典：[Open3DLab — Roblox downloaded 145 GB of models from our sites](https://open3dlab.com/news/roblox-downloaded-145-gb-of-models-from-our-sites/) ·
[HN ディスカッション](https://news.ycombinator.com/item?id=50256985)
