---
date: 2026-11-10
updated: 2026-11-09T20:29:21Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 28
license: CC-BY-4.0
---

# trending.md — 2026-11-10

## 1. Claude Fable 5.2 と Mythos 5.2 が低価格で登場——ただしベンチマーク表は一方的な圧勝ではない

- **Velocity:** ▮▮▮ trending
- **Source:** Anthropic · HN 504 ポイント · 11 月 10 日（~02:56 UTC+8）
- **Tags:** `anthropic` `model-release` `benchmarks`

Anthropic は 11 月 9 日、**Claude Fable 5.2 と Claude Mythos 5.2** を発表した。"the same underlying model" でありながら安全機構で分けられ、Fable はサイバーセキュリティと生物学のフィルタを備えて全ユーザーに、Mythos は Cyber および Life Sciences 検証プログラム経由で提供される。出力は 5.1 より "up to 30% faster"、価格は**入力 100 万トークンあたり 8 ドル、出力 40 ドル**。オプションの fast mode は生成を "up to 2.5 times" 高速化し、16/80 ドル。**FrontierCode 2.0** では Xhigh で **49.1%** を記録し、投稿はこれを "the highest score of any released model we've tested" と述べる。High では **45.3%** で、Opus 5.5 の **45.5%** に対し "for roughly half the cost per task"。しかし同じ表には逆方向の行もある。**AutomationBench 51.4** 対 Gemini 4 Carbon の **53.9**、そして **AA-Briefcase 1785 Elo** 対 **Opus 5.5 の 1800**——後者は Anthropic が今も起点として推奨するモデルだ。

**Why it matters:** 見出しの数字より先に脚注を読むべきだ。脚注 3 は、サイバー・生物学の結果を **Mythos 5.2** で実行したと明記している。理由は "testing the model with reduced safeguards provides the most comprehensive look at model behavior"——つまり CyScenarioBench 76.3 と CVE-rediscovery 89.6 の行は Fable の数字ではない。脚注 4 はさらに率直だ。"None of the external organizations reviewed the contents of this blog post or the contents of the System Card. Those organizations do not necessarily agree with any of the claims made in either publication." ページ上の Vercel、Shopify、Uber、Oracle の引用は熱意であって推薦ではない。Computer-use の行には "OSWorld 2.1 (offline set, partial)" と付記されている。

> "Over 90% of the changes merged into Anthropic's core codebase are now written by Claude (with human guidance)."

[`🔗 Claude Fable 5.2 and Mythos 5.2`](https://www.anthropic.com/claude-fable-and-mythos-5-2) · [`🔗 HN での議論`](https://news.ycombinator.com/item?id=50429906)

---

## 2. Meta の Muse Ember は Haiku 5.5 の知能指数に 3 分の 1 のコストで並ぶ——代償は 64% の質問を棄却すること

- **Velocity:** ▮▮▮ trending
- **Source:** Artificial Analysis · HN 118 ポイント · 11 月 10 日（~01:58 UTC+8）
- **Tags:** `meta` `small-models` `benchmarks`

Meta Superintelligence Labs は最軽量モデル **Muse Ember** を発表した。価格は**入力 100 万トークン 0.10 ドル、キャッシュ入力 0.004 ドル、出力 0.50 ドル**。Artificial Analysis の測定では **Intelligence Index で 36、タスクあたり 0.14 ドル**——**Claude Haiku 5.5 (max) の 0.41 ドル**と同じスコアだ。Meta 自身の **Muse Wonder（44、タスクあたり 6.95 ドル）**には 8 ポイント及ばない。勝っている点は具体的だが狭い。**AutomationBench-AA 68.1%** は Muse Wonder と同水準、**Terminal-Bench 4.0 40.9%** 対 Haiku の 32.8%、そして **Meta 自身の Muse Code 内での Coding Agent Index 46** 対 Claude Code 内の Haiku 37。負けている点も同じくらい具体的だ。**FrontierCode 2.0 27.2% 対 34.9%**、**AA-Briefcase 1521 対 1574 Elo**。

**Why it matters:** この価格を説明する数字はスコアではなく **AA-Omniscience の正答率 21.1%**——比較対象の中で最低——であり、その理由は Ember が "declines to answer 64% of questions" だからだ。これが幻覚率を **17.4%** に抑えており、Haiku 5.5 の半分にあたる。棄却する安価なルーターと、推測する安価なモデルは別の製品であり、"Muse Wonder plans, Muse Ember handles the volume" というルーティングの物語を成立させているのは価格表ではなく棄却率のほうだ。

[`🔗 Artificial Analysis の測定`](https://artificialanalysis.ai/articles/meta-s-muse-ember-is-the-cheapest-model-scoring-36-on-the-intelligence-index) · [`🔗 TechCrunch: Meta releases Muse Ember`](https://techcrunch.com/2026/11/09/meta-releases-muse-ember-a-new-lightweight-model-for-agent-execution/)

---

## 3. e-means は FAISS 内の Lloyd 法を置き換える——エポックは 10 分の 1、しかも最終損失は低い

- **Velocity:** ▮▮▮ trending
- **Source:** Meta FAIR · プロジェクトページ + arXiv 2611.09501 · 11 月 9 日
- **Tags:** `research` `clustering` `faiss`

Meta FAIR は Lloyd 法の代替である **e-means** をオープンソース化した。実装は **`contrib/e_means`** に入り、論文とブラウザ内プレイグラウンドが添えられている。速度と品質が通常トレードオフになるなかで、主張は珍しい。"Across a large range of scales and datasets, e-means reaches a test loss below Lloyd's at 25 epochs, in 1.2 to 3 epochs"——著者らはエンドツーエンドで、Flash-KMeans に対して **GPU で 10〜45 倍のウォールクロック短縮**、FAISS に対して **CPU で 8〜15 倍**と測定している。著者は Bessa、Mazaré、Szilvasy、Touvron、Picard、Douze、Jégou——最後の 3 名は、この手法が打ち負かす FAISS のベースラインを書いた本人たちだ。

**Why it matters:** k-means はベクトルインデックス、量子化コードブック、クラスタリングベースの検索フィルタの下で荷重を支えるプリミティブであり、エポックが 10 分の 1 になれば新しいデータ構造なしにその 3 つすべてに触れる。正直な留保は、比較が著者自身のハーネスと、自チームによる現行最高実装に対して行われた点だ。対抗する事実は、コードが FAISS 本体に入ったこと——ベースラインが主張ではなく再現可能になった。

[`🔗 e-means プロジェクトページ`](https://e-means.github.io/) · [`🔗 arXiv 2611.09501`](https://arxiv.org/abs/2611.09501)

---

## 4. Sherlock が GitHub トレンド 1 位に——しかしリポジトリは 11 月 1 日以降コードを出していない

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub Trending · 本日 +4,294 スター · 11 月 10 日（~04:06 UTC+8）
- **Tags:** `osint` `python` `github-trending`

**sherlock-project/sherlock**——ユーザー名をソーシャルネットワーク上で探す MIT ライセンスの Python ツール——が **+4,294 スター**で日間ボード首位に立ち、**106,745 スター、12,366 フォーク**に達した。スター数が語らないのは、背後にリポジトリのイベントが何もないことだ。最終コミットは **11 月 1 日**（"update banner layout"）、最終リリースは **9 月 8 日の v0.16.2**、アーカイブも新規アドバイザリもない。スター曲線は単日の現象でもなく、この 1 週間で毎日数千ずつ増えている——その一方で CLI は 1 年近く動いていない。

**Why it matters:** これはトレンド記事の正直な版だ。8 年前の OSINT ツールが 106k スターで、注目だけで上がっている。リポジトリ内で本当に新しい産物はバナー配置だけなので、この速度は*問題*（自分のユーザー名で何が露出しているか）への関心として読むべきで、ツールへの信頼として読むべきではない——誤検知の報告が集まる未処理の issue と PR が 400 件あり、今週はそのどれも修正されていない。

[`🔗 sherlock-project/sherlock`](https://github.com/sherlock-project/sherlock) · [`🔗 GitHub Trending（日間）`](https://github.com/trending?since=daily)

---

## 5. T3 Code が週間 1 位——"agent harness control surface" が 7 種類の CLI を駆動する

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub Trending · 今週 +15,379 スター · 11 月 10 日（~04:06 UTC+8）
- **Tags:** `agent-infra` `coding-agents` `electron`

**pingdotgg/t3code** が週間トレンドで **+15,379 スター**を記録し首位に立った。**2026 年 2 月 8 日**の作成から累計 **53,850 スター**。自称は "agent harness control surface" で、すでに契約・認証済みの CLI——**Codex、Claude Code、Cursor、Grok Build、OpenCode、Google Antigravity、fx**——を、iOS、Android、Web、Electron デスクトップのいずれかから統合して操作する。リポジトリは MIT で、README はビジネスモデルについて明快だ（"Nothing. We built T3 Code because we wanted the best possible development experience with agents"）。リリースは nightly タグで頻繁に行われ、**`v0.1.8-nightly.20261109.4429`** が 11 月 9 日 18:58 UTC に着地、同日 3 本目の nightly だった。

**Why it matters:** 注目すべき転換はアーキテクチャであり、見た目ではない。ハーネス層がモデルベンダーから分離しつつある——1 つの画面が競合する 7 つの agent CLI を操作するなら、選ぶのはハーネスではなくサブスクリプションになり、README のインストール表（7 種類の異なる CLI 認証フロー）がその可搬性の実費だ。警告はカウンタにある。9 か月のリポジトリに **5,976 件の未処理 issue と PR** がある。

[`🔗 pingdotgg/t3code`](https://github.com/pingdotgg/t3code) · [`🔗 t3.codes`](https://t3.codes)

---

## 6. CISA の KEV が 1 回で 3 件追加——FreeSWITCH の 9.8 は採点前に悪用されていた

- **Velocity:** ▮▮▮ trending
- **Source:** CISA KEV · カタログ 2026.11.09 · 11 月 10 日（~03:48 UTC+8）
- **Tags:** `security` `cve` `kev`

CISA のカタログは **2026.11.09（1,772 件）**に更新され、同日 3 件が追加された。**FreeSWITCH CVE-2026-116779（9.8）**、**OpenSSH CVE-2026-123158（8.1）**、**GPUStack CVE-2026-102895（9.8）**。FreeSWITCH が最も機械的だ。`sofia_presence_handle_sip_i_message()` が "split the To user of an inbound SIP MESSAGE on a plus sign and treated the left side as a chat protocol selector"——`api` を選ぶと `switch_api_execute()` に到達し、MESSAGE を受け付けられたピアが FreeSWITCH API コマンドを実行できる。"including operating-system command sinks, with the daemon's privileges"。在庫の internal / external プロファイル双方で受信チャットが有効で、"exploitation has been observed in the wild"。**1.11.3** で修正。

**Why it matters:** レジストリが*語っていない*ことに注意。3 件はいずれも `Analyzed` で、**`nvd@nist.gov` の指標は 0 件**——スコアは GitHub の CNA（FreeSWITCH、GPUStack、3.1 `Secondary`）と MITRE（OpenSSH）のもので、"NVD 9.8" と引用するスキャナは、NVD が自前のスコアを出さずに追認した CNA の数字を引用している。OpenSSH の項目は本フィードが **2026-11-05** に扱った musl・PAM なし環境のパスワード回避（256〜1024 文字の任意パスワードが通る、10.6p2 で修正）と同じものだ。修正は既に出ており、KEV は「実際に使われた」ことの最初の確認になる。GPUStack のアドバイザリは **2026-11-05** 時点で野放しの悪用を主張しており、KEV は新事実ではなく裏づけだ。

[`🔗 CISA 既知の悪用された脆弱性カタログ`](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) · [`🔗 GHSA-mg63-h38w-8p9p（FreeSWITCH）`](https://github.com/signalwire/freeswitch/security/advisories/GHSA-mg63-h38w-8p9p)

---

## 7. FFmpeg に 62 分で 121 件の CVE レコード——うち 114 件は最新リリースも影響下にあると書いている

- **Velocity:** ▮▮▮ trending
- **Source:** NVD · 11 月 9 日に 121 件公開
- **Tags:** `security` `cve` `ffmpeg`

VulnCheck は **2026-11-09** に **121 件の FFmpeg CVE レコード**を公開した（最初の 1 件が 19:16:48Z、最後が 20:18:13Z）。すべて `Received` のままで NVD の分析は入っていない。内容はコーデックとフィルタ木のメモリ安全性が中心で、`huffyuvenc`、`dvbsubenc`、`gif.c` のヒープオーバーフロー、VVC と Vulkan AV1 経路の範囲外書き込み、10 以上のデコーダにわたる未初期化メモリ開示、加えて長い NULL 参照外しの尾を引く。スコアは両フレームワークとも VulnCheck のもので、**3.1 指標の最大は 7.8**、**4.0 指標の最大は 8.5** で、9 件のレコードが両方の最大値に並ぶ（その一つが `CVE-2026-125250`、GIF エンコーダの `shrunk_buf` サイズ計算）。最大値より分布が重要だ。**121 件の説明のうち 114 件が "through 9.0.2"** と書いており、これは FFmpeg の最新タグ（`n9.0.2`）を指す。修正境界を示すのは **7 件**だけ（"before 8.1.3 and 9.x before 9.0.2"）。

**Why it matters:** 121 件の大半が最新タグに存在する不具合を記述しているなら、それは**修正版を名指ししない**開示であって、パッチの告知ではない。4.0 と 3.1 の差（同一 CNA、同系統のベクトルで 3.1 は 7.8、4.0 は 8.5）は採点慣行であって不一致ではない。ここはすべて `Received` なので「NVD はこう言っている」はまだ存在しない。VulnCheck を引用し、その旨を明記すること。

[`🔗 CVE-2026-125250（NVD）`](https://nvd.nist.gov/vuln/detail/CVE-2026-125250) · [`🔗 FFmpeg のタグ`](https://github.com/FFmpeg/FFmpeg/tags)

---

## 8. SuperTokens の 9.9：1 つのアプリの API キーが親テナントを書き換え、兄弟アプリまで巻き込む

- **Velocity:** ▮▮ rising
- **Source:** NVD · CVE-2026-123800 · 11 月 10 日（~03:16 UTC+8）
- **Tags:** `security` `cve` `authentication`

**CVE-2026-123800（9.9、CVSS 3.1、GitHub CNA 採点、レコードは `Received`）** は、オープンソース認証サーバー **SuperTokens Core** のマルチテナント認可の欠陥だ。`Multitenancy.checkPermissionsForCreateOrUpdate` は "does not adequately authorize updates to a parent connection URI domain or the base tenant"。非デフォルトの connection URI ドメイン下に複数アプリを抱えるライセンス版マルチテナント配備では、**1 つ**のアプリの有効な API キーを持つ攻撃者が親ドメインを更新できる。対象分岐が "checks the domain without requiring the source application and tenant to be public" だからだ。`api_keys` は保護されていないため連鎖は続く——親キーを差し替え、次に兄弟キーを差し替え、兄弟ユーザーを読み書きし、そのユーザーとしてセッションを取得し、兄弟ダッシュボードのユーザー経由で永続化し、兄弟アプリ自身のキーを締め出す。

**Why it matters:** 修正リストこそがこの話の本当の形だ。7 つのメジャー系列にまたがる **18 のパッチ版**（6.0.24、7.0.23、8.0.7、9.0.6 …… 12.3.1）で、脆弱なコードは 6.0.0 から持ち越されてきた。前提も正確である——*ライセンス版*のマルチテナント配備で、複数アプリが同一の非デフォルト connection URI ドメインを共有していること——なので、自前のシングルテナント導入は影響クラスに入らない。レコードは未分析で、9.9 は CNA の数字だ。

[`🔗 CVE-2026-123800（NVD）`](https://nvd.nist.gov/vuln/detail/CVE-2026-123800) · [`🔗 修正コミット 13c3de17`](https://github.com/supertokens/supertokens-core/commit/13c3de170dd40dd217db0f6bd2bded0948476a42)

---

## 9. Redpanda Connect の管理 API は既定で `0.0.0.0:4195` に認証なしで開く——ゆえに POST が RCE

- **Velocity:** ▮▮ rising
- **Source:** NVD · CVE-2026-123270 · 11 月 10 日（~02:17 UTC+8）
- **Tags:** `security` `cve` `rce`

**CVE-2026-123270（9.8）** は **Redpanda Connect 4.39 から 4.110** に及ぶ。streams モードでは "the management HTTP API is exposed on `0.0.0.0:4195`, but authentication is disabled by default and there is no authentication gate protecting the stream CRUD routes"。当該ポートに到達できる未認証の攻撃者は、`/streams/{id}` にパイプライン定義を `POST` でき、そこに `command`、`subprocess`、`ffi`、あるいは安全でない `sql_raw` といったコード実行系プロセッサを含められる。"because pipelines can also return command output in-band via HTTP, this vulnerability enables full host compromise, credential theft, and data exfiltration with no user interaction or credentials required"。**v4.111** で API はオプトインになったが、レコードは「手動で有効化すれば v4.111 以降でも RCE は "remains achievable"」と記す。

**Why it matters:** このスコアは **CISA-ADP のもの**で、Redpanda のものでも NVD のものでもない——レコードは `Received`、唯一の指標は `134c704f-…`（Vulnrichment）の 9.8 と `CWE-306`。参照リストも珍しい。リンクは 1 件だけで、研究者自身の再現リポジトリ（`pagvac/redpanda-connect-unauth-rce`）。ベンダーアドバイザリもコミットもレコードに含まれない。したがって上の段落は CNA 説明の叙述であり、修正境界（「4.111、オプトイン」）が公開された唯一の緩和文になる。

[`🔗 CVE-2026-123270（NVD）`](https://nvd.nist.gov/vuln/detail/CVE-2026-123270) · [`🔗 再現リポジトリ`](https://github.com/pagvac/redpanda-connect-unauth-rce)

---

## 10. Airflow の 8.8 は不完全な修正——3.3.1 へ上げても塞がらない

- **Velocity:** ▮▮ rising
- **Source:** NVD · CVE-2026-111421 · 11 月 9 日（~18:17 UTC+8）
- **Tags:** `security` `cve` `airflow`

**CVE-2026-111421（8.8、CISA-ADP）** は、Apache が修正したと思っていた不具合の残り半分だ。Airflow の Task Execution API は "stored XCom values written by a task without the reserved-key check applied elsewhere"。そのため Dag 作者のタスクは、後にユーザーが API 経由でデシリアライズ有効のまま参照したとき、"made the API server instantiate classes from the `airflow.*` namespace with arguments the Dag author chose" となる XCom を書き込めた。レコードは誰が依然として露出しているかを明示する。"This is an incomplete fix for CVE-2026-59242: users who applied that fix in **apache-airflow 3.3.1** remain affected through this route and should upgrade to **apache-airflow 3.4.0** or later."

**Why it matters:** デシリアライズは、最初のアドバイザリを真剣に受け止めた配備でこそ有効になっている。つまりリスクが残る集団は、パッチを当てた集団そのものだ——「不完全な修正」が必ず生む分布の形である。レコードの CWE は `CWE-502`、緩和は地味なものになる。3.4.0 を配備するまで API サーバーのデシリアライズを切ること。

[`🔗 CVE-2026-111421（NVD）`](https://nvd.nist.gov/vuln/detail/CVE-2026-111421) · [`🔗 Apache メーリングリストのスレッド`](https://lists.apache.org/thread.html/pwdwx354tv0x3m8wzfhh59r6wyztj2lk)

---

## 11. otterdog はシークレット未設定（＝既定値）のとき HMAC 検証を飛ばし、そのまま webhook 本文を `eval()` する

- **Velocity:** ▮▮ rising
- **Source:** NVD · CVE-2026-123870 · 11 月 9 日（~17:16 UTC+8）
- **Tags:** `security` `cve` `supply-chain`

**CVE-2026-123870（CVSS 4.0 で 9.5、Eclipse CNA 採点）** は、GitHub 組織をコードとして管理する Eclipse 財団のツール **otterdog** に落ちる。"The otterdog webapp evaluates a format-string built from the incoming GitHub webhook JSON body using Python's `eval()`. When the `GITHUB_WEBHOOK_SECRET` configuration value is unset or empty（**the code default is `None`**）, the HMAC signature check is skipped entirely, allowing an unauthenticated network client to reach the `eval()` sink with attacker-controlled input and execute arbitrary Python on the webapp host." **`bbc9e3ce`** で修正済み。

**Why it matters:** 2 つの既定値が組み合わさって脆弱性になる。未設定時に*開いたまま失敗する*認証制御が、リクエストデータに対する `eval()` の手前にある。どちらか単独でも修正に値するが、合わさると環境変数を設定したことのないすべての配備がリモートコード実行になる。これは CVSS 4.0 のみのレコードでもある——9.5 は Eclipse の 4.0 上の数字で、レコードは `Received`。比較できる NVD や 3.1 の数字はまだ存在しない。

[`🔗 CVE-2026-123870（NVD）`](https://nvd.nist.gov/vuln/detail/CVE-2026-123870) · [`🔗 GHSA-32xf-7j44-xq72`](https://github.com/eclipse-csi/otterdog/security/advisories/GHSA-32xf-7j44-xq72)

---

## 12. Zebkit は Chromium のコンテンツ層をアプリにリンクする——Electron より 34% 小さく、負ける点も明記する

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 99 ポイント · 11 月 9 日（~22:34 UTC+8）
- **Tags:** `browsers` `electron` `rust`

**ikey4u/zebkit**（LGPL-2.1、v0.2.0、**135 スター**、10 月 10 日作成）は、Blink、全 JIT 層を含む V8、PDFium、FFmpeg を "one library you link into your own application" として提供する——Chrome の UI も Node ランタイムも Electron のパッケージングも持たない。アプリ自身のイベントループ（`zebkit_init()`、`zebkit_pump()`）で動き、渡したウィンドウ（X11 ウィンドウ、`NSView`、`HWND`）に描画する。C、Rust、Python、Go、JavaScript のバインディング付き。**Electron 45.2.1** に対する公開ベンチマーク（同一ハーネス、同一ページ、5〜11 回の中央値、Linux x86-64、2026-11-06/07）では、**出荷サイズ 171.2 / 59.4 MiB** 対 260.5 / 87.1、**コールド起動 2.3 秒** 対 6.6 秒、**空白ページのメモリ 179 MB** 対 250 MB、DOM と JS の負荷は**同等**。

**Why it matters:** 表の最後の行こそ読む価値がある。ページあたりのプロセス数は **zebkit が 7、Electron が 6**——zebkit が "as Chrome" としてストレージを独立プロセスに砂箱化しているためだ。そして README には、このジャンルが通常省く一節がある。"**Where Electron is ahead**: one process fewer a page, and memory on two of the ten sites, YouTube and The Verge, where advertising and video decide." 135 スターのプロジェクトの自己測定は主張であって、あなたのワークロードの測定ではない——だが自らの負けを明記する主張は、再測定する価値がある。

[`🔗 ikey4u/zebkit`](https://github.com/ikey4u/zebkit) · [`🔗 HN での議論`](https://news.ycombinator.com/item?id=50426207)

---

## 13. 指示ファイルが古びると agent は死んだ経路を辿る——実在 3 リポジトリでの 732 トラジェクトリ

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2611.09802 · 11 月 9 日掲載
- **Tags:** `research` `coding-agents` `documentation`

**"When Instruction Files Go Stale: Documentation Debt and Hidden Cost in Coding Agents"** は、`CLAUDE.md` を持つあらゆるリポジトリが抱える問題を扱う。指示ファイルは "read in every agent session" だが、"can fall behind the code and become stale (e.g., a test folder moves, but the file still points to the old one)"。実験は統制されている。活発なオープンソースリポジトリ由来の実在する古い指示 3 件、それぞれ別種の指針（**テストコマンド、コードの位置、コンポーネント追加手順**）を用い、agent は各指示の 3 バージョン（古いまま／現行パスに修正／削除）の下で **22 の保守タスク**を解く。コードとタスクは固定され、**732 トラジェクトリ**を分析する。

**Why it matters:** 著者の立論がそのまま結論だ。"Evaluations that check only task success can miss this cost, and the stale file can persist." 古い指示はドキュメント負債であり、その利息は以後のすべてのセッションが払う。だから自然な実験は agent が完了したかではなく、途中で何をしたか、そして回復したかである。2024 年のテストコマンドを agent が走らせるのを見たチームには既知の類だろう。コードを固定し文章だけを動かす設計が、そのコストを測れるものにしている。

[`🔗 arXiv 2611.09802`](https://arxiv.org/abs/2611.09802) · [`🔗 全文（HTML）`](https://arxiv.org/html/2611.09802v1)

---

## 14. MemoryDojo：測定された記憶アーキテクチャはすべて汚染可能で、被害の程度はアーキテクチャ次第

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2611.09721 · 11 月 9 日掲載
- **Tags:** `research` `agent-memory` `security`

**MemoryDojo** は汚染された記憶のライフサイクルを追跡するベンチマークだ。前提はこうだ。"malicious instructions encountered in one session may be stored and propagated through memory before being retrieved and acted upon in later sessions"、そして "because memory systems differ in how they process and retrieve information, the downstream effects of poisoning can vary significantly across systems"。成果物は 4 領域にわたる **155 のマルチセッション長期トラジェクトリ**で、**5 種類の記憶システム**上で走らせ、汚染がどこで書かれ、いつ検索され、agent がその後何をしたかを追う。結論は冷静で都合が悪い。**"all memory systems are susceptible to memory poisoning, with substantial variation in downstream effects."**

**Why it matters:** ベンチマークは攻撃最適化も同梱する。"a memory-aware poison optimization process that increases the poisoning efficacy, highlighting differences between memory architectures"——これによりアーキテクチャ間の差は好奇心の対象から攻撃面に変わる。記憶層を出荷している側（本フィードは先週、相互に読めない 4 つの記憶フォーマットを扱った）にとって、自分のストアが相手と形を違えることに測定可能なコストが付いた。

[`🔗 arXiv 2611.09721`](https://arxiv.org/abs/2611.09721) · [`🔗 全文（HTML）`](https://arxiv.org/html/2611.09721v1)

---

## 15. 同じ H100 が時間 2.69 ドルでも 12.29 ドルでもある——その 4.57 倍が何ではないかを領収書が書いている

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 147 ポイント · 11 月 9 日（~23:39 UTC+8）
- **Tags:** `gpu` `pricing` `infrastructure`

**`datareceipts/data-receipts`** が公開するのは価格比較そのものではなく、その背後の算術だ。H100 SXM 80GB のオンデマンド価格を GPU 時間あたりのドルに正規化し、730 時間で月額に直す。**RunPod Community 2.69 ドル**（月 1,964）、RunPod Secure 3.99、**AWS `p5.48xlarge` 6.88**（5,022）、**Azure `ND96isr_H100_v5` 12.29**（8,972）——"4.57× between cheapest and dearest, for the same chip." この調査は自明なグラフも拒む。"An H100 is three different products. The SXM 80GB, the PCIe 80GB and the NVL 94GB all get marketed as H100s and they do not cost the same"。だから比較はすべて同一（モデル、メモリ）群の内側に留め、各ベンダーはその GPU に到達する*最安*経路で値付けされる。

**Why it matters:** この数字を使えるものにしているのは "**What the 4.57× is not**" の節だ。Azure の ND SKU は "400 Gbps per GPU of Quantum-2 InfiniBand with GPU Direct RDMA" を備え、それがマルチノード学習を機能させる——マルチノード学習がシングルノード微調整より高い理由である。"if you are fine-tuning on one node, you are paying for an interconnect you will never use." 明示された限界も具体的だ。オンデマンド定価のみ（spot は "would narrow the gap a lot"）、各 1 リージョン、そして "**Availability is not priced. A cheap H100 you cannot get is not a price.**"

[`🔗 data-receipts/109-gpu-pricing`](https://github.com/datareceipts/data-receipts/tree/main/109-gpu-pricing) · [`🔗 HN での議論`](https://news.ycombinator.com/item?id=50427085)

---

## 16. malloc は実際に何をしているのか：1,000 回の確保、2 回のシステムコール、132 KiB

- **Velocity:** ▮▮ rising
- **Source:** benmandrew.com · 180 ポイント · 11 月 9 日（~19:31 UTC+8）
- **Tags:** `systems` `memory` `glibc`

`malloc` のインターフェースとカーネルが見るものの間の隙間を、測定で埋める記事。最初の実験は **1,000 回の `malloc(16)`** のループを `strace` で追い、`brk` システムコールが**合計 2 回**しかないことを示す——1 回は program break の取得、もう 1 回はヒープを **132 KiB** 拡張するもの。どちらも最初の呼び出しで起き、"the other 999 just take from that already allocated memory"。記事は償却される対象に値段を付ける。"**575 ns for an empty one**, as measured below"。続いて `sbrk` 上にバンプアロケータを書き、プロセスの各領域のアドレスを 1 つずつ表示し、その実行で break と `printf` が **23.4 TiB** 離れていることを指摘する。"about 1,530 times the machine's 15.6 GiB of RAM. Nearly all of that range is unmapped, so it costs no physical memory."

**Why it matters:** これは多くの性能推論が飛ばす層——システムコールとユーザー空間の境界、そしてそれを隠す簿記だ。この記事は「記憶より測定」の実演でもある。132 KiB、2 回の `brk`、アドレス配置は主張ではなく出力であり、どれも記事が印字したコードから再現できる。

[`🔗 What is malloc doing, anyway?`](https://benmandrew.com/articles/what-is-malloc-doing-anyway) · [`🔗 HN での議論`](https://news.ycombinator.com/item?id=50424157)

---

## 17. Raspberry Pi 5 16GB が 385 ドルに——4 月から 80 ドル上昇、発売価格は 120 ドルだった

- **Velocity:** ▮▮ rising
- **Source:** CNX Software · 183 ポイント · 11 月 10 日（~01:42 UTC+8）
- **Tags:** `hardware` `raspberry-pi` `pricing`

Raspberry Pi が再び値上げし、今回は 16GB モデルに集中した。**Raspberry Pi 5 16GB は 385 ドル**、"an $80 increase compared to the last price hike in April"。**CM5** システムオンモジュールは **40 ドル**上がり、"starting at $375 for the Lite model without wireless"。唯一の朗報は据え置きだ。"the Raspberry Pi 500+ mechanical keyboard PC stays at the same price, starting at $410"。CNX 自身の読みは、キーボードモデルは "already richly priced and the demand must be lower than for single board computers and compute modules" というもの。

**Why it matters:** 低コスト常時稼働コンピューティングの錨だった基板が、いまや小型サーバーの価格になった。この上昇は Raspberry Pi の利益率判断ではなくメモリ費の転嫁であり、今週「アイドル RAM」の冗談を一ジャンルにしたのと同じ DRAM 圧力だ。ホームラボ、CI ランナー群、エッジ配備を見積もる人にとって、16GB の段は「数枚買う」から「1 枚買って測る」に移り、CM5 も一緒に動く。

[`🔗 CNX Software: Raspberry Pi 5 16GB が 385 ドルに`](https://www.cnx-software.com/2026/11/03/when-will-this-stop-the-raspberry-pi-5-16gb-sbc-now-sells-for-385/) · [`🔗 HN での議論`](https://news.ycombinator.com/item?id=50428801)

---

## 18. Flide は決定モデルに欠けていた配信層——vLLM と SGLang より最大 9.5 倍、正確な状態分岐

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 109 ポイント · 11 月 9 日（~12:43 UTC+8）
- **Tags:** `inference` `decision-models` `serving`

**`OmniJev/Flide`**（Apache 2.0、**258 スター**）は「決定モデル」ファミリー向けの推論エンジンだ——単一フォワードパスで生成しないモデル群で、本フィードは **2026-11-07** に扱っている——その主張は、これらが生成型 LLM とは別の配信機構を必要とするという点にある。"**With exact state forking it is up to 9.5 times faster than vLLM and SGLang, and every answer is the one the model gives the question alone**"——1 つの状態が 3 つの問いに分岐し、それぞれが 1 回のフォワードパスで答える。手法は 11 月 2 日に論文として公開され（**arXiv 2610.42148**、"Accelerating Decision Inference with Exact State Forking"）、`flide verify` コマンドを同梱する。"checks exact forking on your own model and requests"。**PyPI `flide` 0.1.10** は **2026-11-09T06:57Z** にアップロードされ、同日 README は 2 つのリリースを記録した。0.1.9 が **`pplx-decider-v1.1-27b` と `JEV-35B`**、0.1.10 が **Ainvest-Decision-27b、Darwin-27B-RSI-Decision、KnowLine-31B-Gen1.5** を追加し、最後のものは画像も読むようになった。

**Why it matters:** モデルの一覧こそが話だ。Perplexity、Cloudflare（`Clef`）、Juspay、AutoTrust など十数社が、チャットモデルではない「decision」チェックポイントを公開しており、このファミリー全体がトークン生成向けに作られたエンジンで配信されていた。vLLM に対する最大 9.5 倍はプロジェクト自身のワークロードでの自己測定だが——この「最大」が実際に効いている——その 9.5 倍が公平な比較か別の計算かを決めるのは、速度ではなく分岐の正確性を測る `verify` のほうだ。

[`🔗 OmniJev/Flide`](https://github.com/OmniJev/Flide) · [`🔗 PyPI: flide 0.1.10`](https://pypi.org/project/flide/)

---

## 19. PackageKit のローカル 8.5：「操作のシミュレーション」に潜むパストラバーサルが root になる

- **Velocity:** ▮ steady
- **Source:** NVD · CVE-2026-104620 · 11 月 9 日（~23:17 UTC+8）
- **Tags:** `security` `cve` `linux`

**CVE-2026-104620（CVSS 4.0 で 8.5、SUSE 採点）** は短いが影響範囲の広いレコードだ。"A path traversal attack in simulation of actions in the **Zypp backend of PackageKit** before **1.4.1** could be used by local attackers to gain root privileges." PackageKit は大半のデスクトップディストリビューションで GUI パッケージ導入の背後にある D-Bus サービスで、設計上 root で動く。だからこそ欠陥が*シミュレーション*経路にあることが重要なのだ。認可を要求する前にアプリが呼ぶのは、まさにその非特権呼び出しだからである。

**Why it matters:** レコードが持つ参照は 1 件だけ——**SUSE Bugzilla の項目**——で、CVE 由来のアドバイザリ文も、上流コミットも、修正リリースへのリンクもない。影響バージョンの詳細はベンダー自身のエラータにある。これは 4.0 のみのスコアを持ち、Linux ディストリビュータが起票し、なお `Received` のレコードでもある。広く導入されているデスクトップソフトウェアスタックにローカル root の欠陥があり、その完全な開示はレジストリの外にある——本フィードがディストリビュータ起票のレコードで繰り返し見てきた形だ。

[`🔗 CVE-2026-104620（NVD）`](https://nvd.nist.gov/vuln/detail/CVE-2026-104620) · [`🔗 SUSE Bugzilla 1284954`](https://bugzilla.suse.com/show_bug.cgi?id=1284954)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-09T20:29:21Z |
| Items | 19 |
| Sources tracked | 28（Hacker News、GitHub Trending、NVD、CISA KEV、arXiv、ベンダーブログ、セキュリティアドバイザリ） |
| Update schedule | 04:03, 12:03, 20:03 UTC+8（1 日 3 回） |
| Ranking | 速度加重（即時性 × エンゲージメント加速度 × 情報源の権威） |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[前日](2026-11-09.md) · [生 .md](https://trending.md/jp/feed/2026-11-10.md) · [アーカイブ](../archive/)
