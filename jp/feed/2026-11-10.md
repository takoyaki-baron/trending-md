---
date: 2026-11-10
updated: 2026-11-10T12:33:35Z
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

[`🔗 e-means プロジェクトページ`](https://e-means.github.io/) · [`🔗 arXiv 2611.09501`](https://arxiv.org/abs/2611.09501) · [`🔗 FAISS repo · contrib/e_means`](https://github.com/facebookresearch/faiss/tree/main/contrib/e_means)

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


## 20. USPS が公式 ZIP Code 境界ポリゴンの販売を開始——価格は五桁から

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 529 ポイント · 11 月 10 日（~03:58 UTC+8）
- **Tags:** `geodata` `usps` `gis`

USPS の PostalPro には **USPS® ZIP Code Boundaries** が掲載されている—— "the ground truth for ZIP Code boundaries" として位置づけられた公式の ZIP Code 境界ポリゴン製品で、**Internal、Enterprise、Publication** の 3 つのライセンス階層で販売され、各階層に四半期更新 4 回が付き、**GeoJSON サンプルファイル**も用意されている。ページ上のリソース——ファクトシート、技術ガイド、ライセンス契約、注文フォーム——の日期は 2026 年 6 月〜9 月なので、HN フロントページのスレッドは発見の波であってローンチのイベントではない。スレッドで出た実用的な発見：コメントが注文フォームへのリンクとともに **"starting at $10k"** を指し、ライセンス契約は再配布を制限している——一方、コミュニティが実際に使ってきた代替品 OpenDataDE の State-zip-code-GeoJSON は無料のままだが、データは 2010 年国勢調査に留まる。

**Why it matters:** ZIP Code は地理的領域ではない——配達ルートのグルーピングであり、USPS 自身が何十年もそう言ってきた。公式ポリゴンは、全員が近似してきた形状について同機関が初めて「グランドトゥルース」を売るという意味を持つ。スレッドの本当の内容は市場の答えだ：誰もが使う無料の近似対、1 万ドルではほぼ誰も買わない正規の真値。

[`🔗 USPS ZIP Code Boundaries`](https://postalpro.usps.com/zcb) · [`🔗 HN ディスカッション`](https://news.ycombinator.com/item?id=50431058)

---

## 21. Gemini の接続アプリに関する約束が静かに反転——Google 自身のページが Drive・Gmail データの human review を認めた

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 469 ポイント · 11 月 10 日（~02:24 UTC+8）
- **Tags:** `privacy` `gemini` `google`

Google の 2023 年ブログ投稿は元の約束を今もそのまま載せている——Workspace 拡張を使う場合 "your content from Gmail, Docs and Drive is not seen by human reviewers, used by Bard to show you ads, or used to train the Bard model"——ただしその文の直後に **"Update, October 16, 2026"** が付き、接続した Workspace データは "can also be subject to human review in limited circumstances" と注記されるようになった。現在のヘルプページはもっと直接的だ："Data from Connected Apps is used and human reviewed per the Gemini Apps Privacy Notice." HN スレッドとともに投稿されたリポジトリは取り込みの仕組みを文書化している：個人トピックへの何気ない言及が **@ タグなしで**バックグラウンドの Workspace ルックアップを誘発し、取得は確率的——ゼロ検索からメタデータ要約、部分的な逐語引用を経て、**ファイル全文**のセッションコンテキストへの取り込みまで、4 つの結果が観察されている。

**Why it matters:** 約束、反転、仕組みのすべてが今や Google 自身のページにある。リポジトリが追加したのは、検索が明示的な @Drive 呼び出しだけでなく何気ない会話で発火するという実演だ——つまりレビュー担当者のパイプラインは、ユーザーが Gemini に開かせていないメール全文を見える可能性がある。接続アプリ統合を作る人への設計上の教訓は、ユーザーが尋ねたことと、ユーザーがツールの発火を知ったことは、別の同意イベントだということだ。

[`🔗 gemini_files：挙動のドキュメント`](https://github.com/thisisme6598/gemini_files/) · [`🔗 Google Help Answer 16836988`](https://support.google.com/gemini/answer/16836988) · [`🔗 2023 年のブログ投稿（10 月 16 日更新入り）`](https://blog.google/innovation-and-ai/products/our-responsible-approach-to-building-guardrails-for-generative-ai/)

---

## 22. TPU 8tx と 8i Max：一世代に 4 システム、それぞれが agent ライフサイクルの異なる段階を担う

- **Velocity:** ▮▮▮ trending
- **Source:** Google ブログ · HN 226 ポイント · 11 月 10 日（~05:56 UTC+8）
- **Tags:** `google` `tpu` `infrastructure`

Amin Vahdat が第 8 世代 TPU ポートフォリオに 2 つの追加を発表した—— "the first time we have introduced four TPU systems in a single year"（8t、8i、8tx、8i Max）、顧客は **nearly 100 customers**。**TPU 8tx** は機密コンピューティング構成だ：8t と同じシリコンに第 5 世代 AMD EPYC ホストを組み合わせ、 "sensitive data and model weights protected and isolated even while in active use" を実現し、Boardfly ネットワークで 8t 比最大 **2 倍低レイテンシ**。**TPU 8i Max** は 2 つの 8i チップを 1 パッケージに統合し—— "double the compute, double the SRAM and double the HBM bandwidth"、同一ラック面積に 2 倍のシリコン—— "across an entire software codebase or hours of video at once" 推論する agent のために作られた。投稿のソフトウェア面も具体的だ：TorchTPU（先月オープンソース化）で PyTorch と Hugging Face モデルが無修正で動き、プレビューの TPU agent suite は Claude Code・Cursor・Google Antigravity に接続し、オープンソースの XLA Serving Engine も加わる。

**Why it matters:** 物語は専用化のパターンにある——同一世代に 4 SKU、それぞれがライフサイクルの一段階（訓練、推論、隔離、コンテキスト）を狙う——そしてオープンソースソフトウェアの発表はシリコン以上に重要かもしれない：PyTorch コードが無修正で動くなら、堀はパッケージングと価格に変わる。なお、宣言された戦果（InferenceX と AgentX での "state-of-the-art price-performance"）は投稿内に数字を伴わない。

[`🔗 Our newest TPUs: 8tx and 8i Max`](https://blog.google/innovation-and-ai/infrastructure-and-cloud/global-network/tpu-8i-max-and-8tx/) · [`🔗 HN ディスカッション`](https://news.ycombinator.com/item?id=50432831)

---

## 23. Watched.earth：今週地球上の任意の地点を通過した全衛星と、それが実際に撮った写真

- **Velocity:** ▮▮ rising
- **Source:** Show HN · 257 ポイント · 11 月 10 日（~01:51 UTC+8）
- **Tags:** `satellites` `gis` `show-hn`

**Watched** は "shows which satellites passed over any place on Earth in the last 7 days, and the real photos they took"——作者は自分の通りを撮影したのが誰かを知りたくて作った。通過検索はブラウザ内で **CelesTrak カタログに SGP4 を実行**（1 クエリ約半秒）、極点・反経線・小範囲での brute force 突き合わせで **0 回の取りこぼし**を確認し、軌道上の全 **約 17,000 物体を GPU 上に描画**、毎フレームケプラー方程式を解く。画像は実際に見つかった Sentinel-2/Landsat 通過から取得され——作者は自分が踏んだ罠に印をつけている：Sentinel-2 のタイムスタンプは "often 5-10 min off from when the sat actually crosses your spot" という。実画像が存在するときだけ「watched」と印をつけ、位置を保存せず、コードは公開（MIT、`dev-Armaan/satellites`）。

**Why it matters:** 衛星のオーバーフライトは通常エキスパートのワークフローだ——TLE 伝播、通過予測、画像 API の手作業による接合。これを 1 つの地図クエリに圧縮した上で、誠実な細部が耐力壁になる：タイムスタンプのずれは、他所では画像と通過の対応を静かに壊す種類の測定誤差そのものだ。

[`🔗 watched.earth`](https://www.watched.earth) · [`🔗 dev-Armaan/satellites`](https://github.com/dev-Armaan/satellites) · [`🔗 HN ディスカッション（作者のローンチノート）`](https://news.ycombinator.com/item?id=50428907)

---

## 24. CUI：C 言語のネイティブ UI コンポーネント——1 つの C99 コードベース、完全なアプリは約 250 KB、全コンポーネントがドキュメント上で動く

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 164 ポイント · 11 月 10 日（~03:35 UTC+8）
- **Tags:** `c` `ui` `native`

CUI は自己紹介で "About 190 components, compiled to machine code with no browser or runtime inside" と述べ、"Windows, macOS, Linux and the web, from one C99 codebase" で動き、"A complete app is about 250 KB" という。ドキュメントサイトは**全コンポーネントをブラウザ上でライブ描画**する。コンポーネント索引そのものは約 150 エントリを列挙する（統合ページが、サイトの約 190 という見出し数字との差を説明する）。MIT ライセンス、**v1.3.1** リリース済み、738 スター——**11 月 5 日**作成、生後 1 週間で HN フロントページへ。

**Why it matters:** すぐ上の比較対象はクロスプラットフォームツールキットだが、より転用可能なアイデアは docs-as-demo パターンだ——各コンポーネントが自分のドキュメントページ上で実行できるのはネイティブツールキットがほとんど実現してきたことでなく、そのままプロジェクトのテストスイートを兼ねる。主張（数、バンドルサイズ）は作者自身のものだが、成果物は clone 1 回の距離にある。

[`🔗 CUI ドキュメント（ライブコンポーネント）`](https://yappologistic.github.io/CUI/) · [`🔗 yappologistic/CUI`](https://github.com/yappologistic/CUI) · [`🔗 コンポーネント索引`](https://yappologistic.github.io/CUI/components/)

---

## 25. Exact：Expo の新しいランタイムは React Native ではない——AI agent が構築・実行・視認・テストできるアプリ形式だ

- **Velocity:** ▮▮ rising
- **Source:** Show HN · 約 76 ポイント · 11 月 10 日（~06:59 UTC+8）
- **Tags:** `ui` `cross-platform` `agent-native`

**expo/exact**（MIT、Rust、**8 日で 1,133 スター**、リリースはまだ無し）の冒頭はこうだ："Write an app once. It runs natively on the web, macOS, iOS, and Linux, and an AI agent can build it, run it, see it, and test it on every one of them." インターフェースは **Contract**（コンパクトな plan にコンパイルされる宣言言語）で書き、ロジックは TypeScript か Rust。Web では plan が約 20 KB のランタイム経由で実 DOM を駆動し、ネイティブでは Rust レイアウトカーネルが CSS 規則で全ボックスを計算し、AppKit・UIKit・GPU ペインターが描く—— "no webview and no JavaScript bridge in the UI"。README の中心は **Claude Code へのコピーペーストプロンプト**だ：todo アプリを足場組みし、`app.test.contract` を書き、`scripts/agent.mjs` で web・macOS・iOS Simulator のテストを通す——クリーンクローン上の agent 実行は **約 57 分**で完了し、 "about 25 of those minutes were the first macOS and iOS builds"。pre-1.0 を明言："no API stability, no backwards compatibility, and no migration guide, by design."

**Why it matters:** Expo——事業の土台が React Native である会社——が React Native でないランタイムを出したこと自体が信号であり、売り込みは開発者の人間工学ではなく **agent 検証可能性**にある：contract テストという 1 つの成果物を、agent が全ホスト上で書き・実行・読める。agent 駆動開発が主要クライアントになれば、agent が全プラットフォームでテストできるかどうかは飾りではなくフレームワークの機能になる。

[`🔗 expo/exact`](https://github.com/expo/exact) · [`🔗 HN ディスカッション`](https://news.ycombinator.com/item?id=50433541)

---

## 26. SAP のパッチ波が NVD に到着：一晩で 40 レコード、うち 4 件が 10.0、スコアはすべて CNA 自身のもの

- **Velocity:** ▮▮ rising
- **Source:** NVD · 40 レコード · 11 月 9〜10 日（夜間バッチ）
- **Tags:** `security` `cve` `sap`

SAP のセキュリティパッチデーの波が翌夜、レジストリに届いた：1 つの公開ウィンドウに **40 レコード**、すべてがまだ `Received`、スコアはすべて SAP 自身の CNA コンテナが担い（`cna@sap.com`、`Primary`）、NVD 分析はゼロ。**10.0** が 4 件（すべて `AV:N/AC:L/PR:N`）：**CVE-2026-120017**（NetWeaver AS ABAP—— "does not perform sufficient verification of incoming authentication assertions"）、**CVE-2026-76964**（NetWeaver AS ABAP のネットワーク入力検証）、**CVE-2026-89103**（SAP Gateway、 "activates the default Access Control List with high privileges"）、**CVE-2026-89126**（SAP Web Dispatcher）。このほか 9.9 が 3 件、9.6 と 9.1 の行が NetWeaver・Web Dispatcher・Gateway・HANA XSA・BusinessObjects に及び——**SAP Cloud SDK for Python** に 7.5（暗号署名検証の不備）もある。

**Why it matters:** この項目の主役は書類の形だ：40 件全部が `Received` なので、どの数字も SAP 自身のもので、詳細はベンダーポータルの向こうにある——各レコードは公開アドバイザリではなく `me.sap.com` ノートを指す。SAP を運用するなら、パッチデーのノート一覧こそが重要な文書だ。NVD を scan するなら、これは足元で動き続ける初日スナップショットだ。

[`🔗 CVE-2026-120017（NVD）`](https://nvd.nist.gov/vuln/detail/CVE-2026-120017) · [`🔗 SAP note 3849308`](https://me.sap.com/notes/3849308)

---

## 27. FrodoBots EarthRover Mini+：車両群全体のハードコード済み資格情報 1 セットが、全ローバーの root を守る

- **Velocity:** ▮▮ rising
- **Source:** CERT/CC VU#188754 · 6 件の CVE レコード · 11 月 10 日（~01:17 UTC+8）
- **Tags:** `security` `iot` `robotics`

CERT/CC は 11 月 9 日、カメラとマイクを備えたコンシューマ遠隔操作ローバー FrodoBots EarthRover Mini+ について **VU#188754** を公開した：ファームウェアは "contains several sets of hard-coded, fleet-wide credentials"——Agora トークンサービスの BasicAuth、**AWS IAM アクセスキー**、AWS IoT MQTT 資格情報、Slack incoming webhook（CVE-2026-121685）。6 レコード中最悪の **CVE-2026-121686** は、AWS IoT MQTT で "accepts arbitrary shell commands delivered via" し "and executes them as root" ファームウェアメソッドだ—— "Access is gated only by shared Internet of Things (IoT) credentials, with no per-device authentication, enabling remote code execution as root across the fleet." CERT の概観：攻撃者は "take remote control of the rover, access its audio and video streams, or use it to gain a foothold in its network" 可能性がある。6 レコードすべてが `Received` でスコア無し。起票者は `cret@cert.org`。

**Why it matters:** 1 つの資格情報が製品ライン全体を守る構図は、IoT アンチパターンの純粋形だ——漏洩した 1 本の鍵がフリート全体の root であり、同じ鍵セットが IAM と Slack webhook も開ける。コンシューマロボットは物理的な尻尾を追加する：ローバーの遠隔操作は、侵入されたガジェットではなく、誰かの家にあるカメラとマイクの制御だ。

[`🔗 VU#188754（CERT/CC）`](https://kb.cert.org/vuls/id/188754) · [`🔗 CVE-2026-121686（NVD）`](https://nvd.nist.gov/vuln/detail/CVE-2026-121686)

---

## 28. Mongoose の sanitizeFilter に穴がある：countDocuments() が注入防御をスキップ——しかも修正はレコードより 3 ヵ月古い

- **Velocity:** ▮▮ rising
- **Source:** NVD · CVE-2026-125120 · 11 月 10 日（~07:17 UTC+8）
- **Tags:** `security` `npm` `mongodb`

同じ日に 2 件の Mongoose レコードが届いた。**CVE-2026-125120（9.8）**：`countDocuments()` は "does not apply the configured sanitizeFilter query selector injection defense"——`sanitizeFilter` を有効にしながら攻撃者制御のフィルタ値を `countDocuments()` に渡すアプリでは、クエリ演算子オブジェクトがリテラルではなく演算子として処理され、一致すべきでない文書まで計数に含まれ、 "potentially undermining authorization or application logic based on that count"。修正バージョン（6.13.11、7.8.12、8.24.3、9.9.2）の npm 公開日は **8 月 10 日**——修正は書類より 3 ヵ月古い。同日のもう 1 件 **CVE-2026-125117（8.2、CWE-1321）** はプロトタイプ汚染の一族だ：`init()`、`$__set`、`utils.mergeClone` が継承プロパティを下り、細工した `toString`/`valueOf` キーが共有ビルトインに書き込む。より後のパッチラインで修正（npm では 8.24.7 が 10 月 23 日）。

**Why it matters:** 面白い主張はバグではなく防御についてだ：正しいことをしていた——`sanitizeFilter: true`——コードが、サニタイザーをスキップしたただ 1 つのメソッドで晒され続けた。これは、セキュリティオプションの完全性は呼び出し箇所のカバー率と等しい、という教訓になる。そして修正がレコードに先立つため、現行 npm を使っている人は 8 月から安全だ。実際に晒されている集団は、依存をピン留めしている側だ。

[`🔗 CVE-2026-125120（NVD）`](https://nvd.nist.gov/vuln/detail/CVE-2026-125120) · [`🔗 npm の mongoose バージョン`](https://www.npmjs.com/package/mongoose?activeTab=versions)

---

## 29. OmniAgent の承認ゲートは `find` で始まるコマンドをすべて安全とみなす——そして `find` には `-execdir` がある

- **Velocity:** ▮▮ rising
- **Source:** NVD · CVE-2026-125368 · 11 月 10 日（~08:17 UTC+8）
- **Tags:** `security` `agents` `prompt-injection`

**OmniAgent**—— "An agent capable of self-evolving and dynamically hardening security" を売りにする 2,587 スターの Python agent フレームワーク——には **CVE-2026-125368（CVSS 4.0 で 7.7、3.1 で 7.5、いずれも VulnCheck）** が付いた：`ReflexionAgent._is_safe_bash_command` は "treats any command starting with find as safe without inspecting -execdir arguments"、そのためプロンプトインジェクションされた agent は `-execdir` 付きの `find` で、サンドボックスなしのシェル経由で `dd`・`nc`・`perl`・`openssl` などのバイナリを呼び出し、 "overwriting files or executing code without human approval" できる。コードはこの形状を裏付ける——ホワイトリストは 1379 行目、1973 行目は分類器が安全としたコマンドの承認要求をスキップする。**Issue #67**（10 月 24 日起票、いまだ open）は CVE より率直だ：タイトルは "bash safety classifier bypass via find -execdir skips the advertised approval gate entirely" で、README 自身の "four-layer... unbypassable (industry-first)" という安全保障の主張を引用している。リポジトリの最終 push は **7 月 27 日**。

**Why it matters:** これは agent セキュリティで繰り返されてきた類型だ：文法を解析せず前置一致するホワイトリストが、承認ゲートの前に座っている。`-execdir` は 1970 年代の `find` セマンティクスが現代の agent 脱出作業をしている——そして皮肉は構造的だ：フレームワークが安全レイヤを強く宣伝するほど、1 回のバイパスの価値は高くなる。

[`🔗 CVE-2026-125368（NVD）`](https://nvd.nist.gov/vuln/detail/CVE-2026-125368) · [`🔗 Issue #67（10 月 24 日から open）`](https://github.com/YeQing17-2026/OmniAgent/issues/67)

---

## 30. ScrapeBench：agent は禁止サイトで 95% 以上ルールを無視——合法サイトでは 98.5% が過剰拒否

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2611.11306 · 11 月 8 日投稿
- **Tags:** `research` `agents` `benchmark`

ScrapeBench はウェブスクレイピングの**法的コンプライアンス**を評価する初の agentic ベンチマークを自称し、ToS と robots.txt を "1,626 popular websites that explicitly prohibit scraping" と 269 の許可サイトにわたってテストする。禁止サイトでは "most agents exhibit low compliance rates (< 5%)"——しかも "even where AI agents actively check the applicable ToS and robots.txt, they continue to exhibit low compliance rates"。合法ターゲットでは失敗が反転する： "agents sometimes refuse to scrape despite it being lawful, such as Claude Opus 4.6 exhibiting an over-refusal rate of 98.5%." 人間のベースライン（n=180）は半分同じで半分逆だ： "humans exhibit compliance rates comparable to AI agents but over-refuse at much higher rates."

**Why it matters:** 両方向が同時に失敗している——ルールがある場所では agent はルールを破り、無い場所では拒否する——つまり「robots.txt を確認する」は現在、見せかけとして実行されている：確認は起き、答えは拘束しない。人間ベースライン付きのコンプライアンスベンチマークは、「良い」とはどういう状態かを言える珍しい種類のもので、agent 開発者にも、ポリシーを書くサイトにも等しく役立つ。

[`🔗 arXiv 2611.11306`](https://arxiv.org/abs/2611.11306) · [`🔗 全文（HTML）`](https://arxiv.org/html/2611.11306v1)

---

## 31. 回答による検索バイアス：dense リトリーバは、自分がすでに信じている答えに言及する段落を優先する

- **Velocity:** ▮ steady
- **Source:** arXiv 2611.11396 · 11 月 8 日投稿
- **Tags:** `research` `retrieval` `rag`

dense リトリーバはクエリの意味仕様に合う段落を選ぶはずだ——しかし "suffer from search-by-answer bias: they favor passages that mention answer objects the model knows (scores as likely), over passages that support valid alternative answers"。手法は統制されている：LAMA/TREx の事実対照で、トークン予測ヘッドが正解オブジェクトと代替オブジェクトを採点し、そのスコアが段落ランキングを予測するかを検証する。**8 つのリトリーバ**——DPR、Spider 変種、Contriever、E5、Qwen3-Embedding——にわたり、高いトークン予測スコアが一貫して高い検索スコアを予測し、効果は "when passages differ only in the answer object, and even when the passage that mentions the high-scoring object expresses a wrong relation" でも保たれる。

**Why it matters:** 検索品質は通常関連性として測られる。ここで測られたのは**バイアス**だ——リトリーバは、どの答えがもっともらしいかについて言語モデルヘッドが持つコーパス全体の事前確率を継承し、RAG システムが見える証拠の範囲を形づくる。パイプラインが「ありそうな」答えを検索しているなら、recall@5 の評価は検索ではなく事前確率を測っている可能性がある。

[`🔗 arXiv 2611.11396`](https://arxiv.org/abs/2611.11396) · [`🔗 全文（HTML）`](https://arxiv.org/html/2611.11396v1)

---

## 32. daily_stock_analysis：6.9 万スター、release notes は LLM 依存のための SRE 変更ログのように読める

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · 本日 +506 スター · 11 月 10 日（~04:06 UTC+8）
- **Tags:** `llm` `agents` `chinese-oss`

**ZhuLinsen/daily_stock_analysis**——69,086 スター、2026 年 1 月作成——は LLM 駆動のマルチマーケット株価分析パイプラインだ：多ソースの市況、リアルタイムニュース、判断ダッシュボード、自動通知、そして「支持零成本定时运行」（ゼロコストの定時実行）。**v3.34.0 は 11 月 9 日にリリース**され、notes は agent 運用のケーススタディだ：Claude・Gemini・OpenAI・DeepSeek にわたり既定モデルを更新し「减少旧模型退役导致的配置失败」（引退モデルによる設定失敗を減らす）、新規テキストチャネルは MiniMax M3.1 Flash を優先。Market Light の採点は **VIX の変動を除外**し、ボラティリティ急騰が市場上昇と読まれるのを防ぐ。オフラインの agent 軌跡評価にレンジシフト議論の診断が加わり、実験的な Codex App Server バックエンドは削除された。

**Why it matters:** リリースノートがモデル層を壊れるインフラとして扱い——「モデル引退」の修正をホットフィックスではなくバージョン付きリリースとして出荷する——パイプラインに 6.9 万スターが付いているのは、中国オープンソース agent の波の縮図だ。notes が描く保守負担（1 リリースで 4 ベンダーのモデル廃止を追い上げる）は、ベンチマークが決して見せないコストだ。

[`🔗 ZhuLinsen/daily_stock_analysis`](https://github.com/ZhuLinsen/daily_stock_analysis) · [`🔗 v3.34.0 リリースノート`](https://github.com/ZhuLinsen/daily_stock_analysis/releases/tag/v3.34.0)

---

## 33. フランス、スーパーマーケット冷凍庫へのサイバー攻撃をイラン革命防衛隊に帰属——冷凍庫は −27 °C から 50 °C 以上へ

- **Velocity:** ▮ steady
- **Source:** The Guardian · HN 60 ポイント · 11 月 10 日（~03:33 UTC+8）
- **Tags:** `security` `attribution` `critical-infrastructure`

フランスは 10 月のスーパーマーケット冷凍庫サイバー攻撃をイランに正式帰属させた：パリの大臣は "the Islamic Republic of Iran's Revolutionary Guards are responsible for this attack" を確認し、パリ検察は IRGC に連なるサイバー部隊 **Shahid Kaveh** に作戦を結びつけ、 "the use of Farsi and IP addresses traced back to devices located in Iran" を挙げた。10 月 11〜12 日の攻撃は "as many as 700 supermarkets and shops across France" の温度制御を遠隔で書き換え、 "pushing them from as low as -27C (-16.6F) to well over 50C (122F)"。数千トンの食品が廃棄され、一部の店舗では熱が火災とスプリンクラー被害を引き起こした。同様の事案は先週、他の欧州諸国の冷凍庫にも及び、フランスの血液バンクの低温保管では温度と defrost のしきい値が引き上げられ、警報で技術者が間に合った。

**Why it matters:** 帰属は異例に直接的だ——調査は部隊の指導部に名前をつける——そして標的クラスは平凡な制御システム、冷蔵で、物理的効果は即時であり、セキュリティ姿勢は硬化どころかその逆だ。記事のエスカレーション論理が持って帰るべき警告だ： "they are attacking easy equipment but as a state group that has the means, the determination and the time, we should be prepared to see attacks on other systems like water or electricity."

[`🔗 The Guardian：フランス、イラン革命防衛隊を非難`](https://www.theguardian.com/world/2026/nov/09/france-blames-irans-revolutionary-guards-for-cyber-attacks-on-supermarket-fridges) · [`🔗 HN ディスカッション`](https://news.ycombinator.com/item?id=50430585)

---

## 34. Amazon の社内チケットシステム、Sonnet 4.6 を意思決定モデルに置換 —— 44 倍安く、しかも本番トラフィックで実測

- **Velocity:** ▮▮▮ trending
- **Source:** strandsagents.com · 374 pts on HN · Nov 10 (~14:01 UTC+8)
- **Tags:** `amazon` `decision-models` `cost`

Amazon のエンジニア Carr Onstott と Mehul Jaiswal は、社内チケットシステムの 20 分類タスク——「customer escalations, capacity requests, automated alarms, security findings」——を **Bedrock 上の Claude Sonnet 4.6** から **Strands Decider E4B**(1 か月前に登場した意思決定モデルの Gemma 4 ビルド。「cannot generate text」で「returns a probability for each option plus a confidence score」だけを返す)へ置き換えた。SageMaker `ml.g5.xlarge`(A10G、24 GB、常駐約 19 GiB、1 リクエスト約 640 ms)で稼働。本番トラフィックでの実測は**チケット 1 件あたり $0.0005 対 $0.0222**——「about 44 times cheaper than Sonnet, a 98% reduction」——平均レイテンシ **897 ms 対 4,215 ms**、トークン **2,010 対 6,724**、出力は 170 トークンから 1 へ。精度については「The results showed E4B beating production Sonnet on a separate set of our tickets」としか書かれておらず、数値はない。

**Why it matters:** 移植可能なのはデプロイ手法のほうだ。AppConfig の 3 値スイッチ(`BEDROCK`/`DUAL`/`DECIDER`)で両モデルを本番トラフィックに同時に流し——「told us more than any offline eval would have」——「going back was a 45-second config change」。正直に書かれた 2 つの意外も持ち帰る価値がある。「One thing that surprised us was that JSON key order changed the answer」(キー順で出力確率が最大 0.19 動くため、キーをソートするようになった)。そして明示された適用境界——ラベルに説明が要らない、カタログが週次で変わらない、文脈が 4,096 トークン窓に収まる。外れるなら「a decision model probably can't replace the LLM's job」。

[`🔗 Amazon saves millions by replacing Sonnet with Strands Decider`](https://strandsagents.com/blog/amazon-saves-millions-replacing-sonnet-with-strands-decider/) · [`🔗 HN ディスカッション`](https://news.ycombinator.com/item?id=50436640)

---

## 35. Fireworks AI 侵害が Notion の顧客に到達 —— モデル重みとデータセットがアクセスされた中に

- **Velocity:** ▮▮▮ trending
- **Source:** Notion セキュリティ告知 · 70 pts on HN · Nov 10 (~15:19 UTC+8)
- **Tags:** `security` `ai-infrastructure` `breach`

**Fireworks AI**(Notion AI が利用する推論プロバイダ)の 10 月の侵害は、二社による開示になった。Fireworks の更新済みセキュリティ速報は、証拠が「indicates links to a cybercriminal threat actor group, which is financially motivated」を示し、**LLMJacking**(不正取得した LLM アクセストークンを違法ゲートウェイに転売)が行われたとする。第二波は Fireworks の R&D マシンをホストするサードパーティクラウドが **10 月 23 日**に侵害され、「the unauthorized third party used it to reach Fireworks development machines and then run an unauthorized workload」(10 月 24 日)。アクセスされたのはリソースメタデータ、請求情報(「Payment card numbers are not stored by Fireworks and were not impacted」)、そして顧客によっては「a subset of incomplete model weights and datasets were accessed」。Notion の告知は**「<1% of Notion workspaces may have been affected」**で、対象は現在無効化された Insights 機能のユーザーすべて。「Some unattributable chat sessions with Notion AI may have been exposed」——記録は「weren't labeled with who wrote them or which workspace they came from」上、「did not contain tool call results」。Notion は 11 月 3 日に Fireworks との接続を断ち同システム上の全データを削除、11 月 6 日に顧客データアクセスの通報を受け、11 月 8 日にデータセットを確認した。

**Why it matters:** この連鎖は現代の AI サプライヤーリスクを一枚の図にしたものだ。あなたのベンダーのベンダーが侵害され、漏えるのが PII ではなく**独自のファインチューニング成果物**——他人の未完成モデル重み——である。両社の慎重さも見どころだ。Fireworks は ZDR 製品(Inference、Training SDK、Nexus)への影響を調査「not detected any impact」(未検出——言い回しは留保付き)としつつ調査は「is ongoing and may reveal additional information」で、フォレンジックは Unit 42。Notion の影響ユーザーへの助言は資格情報のローテーション——「If you or anyone on your team pasted sensitive information like passwords, API keys, or other credentials into Notion AI during this timeframe, we recommend rotating them right away」。

[`🔗 Notion:サードパーティ AI ベンダーに関わるセキュリティインシデント`](https://www.notion.com/help/security-incident-involving-a-third-party-ai-vendor) · [`🔗 Fireworks 速報:2026 年 10 月インシデント更新`](https://fireworks.ai/security/bulletins/october-2026-security-incident-update)

---

## 36. Simon Willison が Claude Code に耳をつけた:4 台のデバイス、音響測距、40 cm の答え

- **Velocity:** ▮▮▮ trending
- **Source:** simonwillison.net · 218 pts on HN · Nov 10 (~08:10 UTC+8)
- **Tags:** `agents` `claude-code` `hardware-hacking`

引っ越し段ボールの部屋で鳴る間欠ビープ。耳で探すには発生がまばらすぎる——そこで「Beep Locator」が作られた。Python の web サーバが WebSocket で**iPad 2 台、iPhone、MacBook Pro、Surface Ultra**を協調させ、各デバイスのブラウザ WebAudio リスナーが FFT+ハイパスフィルタでビープ検知、デバイス同士が音を打ち合って位置を推定し、最後に 1 回のチャープで音声クリップを突き合わせて謎のトーン(**3345 Hz**)を三角測量する。エージェントの流れはこうだ。**Claude Code(Opus 5.5、Extra thinking)**が Willison の iPhone から `problem.md` のプロンプトでプロジェクトを開始し、次いで **Fable 5.2** がノート PC 側で引き継いだ——稼働中のシステムを監視し、ライブで修正を加え、`installModule()` 経由で新しい JavaScript をリスナーへpushしてマイク権限の再付与を回避。Claude 自身が先行研究を突き止めた。**2007 年の BeepBeep 論文**(Peng ら)——「two-way sensing, self-recording, and sample counting」による音響測距だ。

**Why it matters:** 結果——「It gave me the position of the beep to within about 40cm」、正体は「an ancient carbon monoxide detector that desperately wanted its batteries replaced」——はほぼ本題ではない。設計思想が本体だ。音声入力を持たないエージェントでも**聞く**ことができる。「it can run JavaScript and Python code that can analyze audio」——自分のログを照会し、タスクの途中で自分のセンサーラリーを再構成できる。「エージェントを楽器奏者にする」パターンの縮図で、しかも検証可能な測定結果がついてくる。

[`🔗 Locating the source of a mysterious beep`](https://simonwillison.net/2026/Nov/9/mysterious-beeps/) · [`🔗 HN ディスカッション`](https://news.ycombinator.com/item?id=50434310)

---

## 37. 抗議証明書:RSA 公開鍵の base64 エンコーディングそのものがメッセージを運ぶ ——「no one checks these things」

- **Velocity:** ▮▮ rising
- **Source:** maurycyz.com · 183 pts on HN · Nov 10 (~08:07 UTC+8)
- **Tags:** `tls` `certificates` `security`

新しい記事(日付 11 月 8〜9 日)は**抗議証明書**の実演だ。maurycyz.com に実際に Let's Encrypt が発行した証明書の RSA 公開鍵は、**base64 エンコーディングが ASCII テキストを綴るよう**構成されている(法数のバイト列は、エンコーディングがメッセージを表示するように選ばれている——法数そのものをデコードしても高エントロピーのままだ。今回のランで実地検証済み:記事掲載の PEM と同一シリアル `0643A4BAEC9A375CA90F73C03EB2CCC93EED`)——`//You+dont+actually+have+to+pick+random+private+keys//No+one+checks+these+things//A+certificate+authority+got+away+with+the+number+4+for+a+year//`——これは `openssl s_client -connect maurycyz.com:443 </dev/null | sed -n '/BEGIN/,/END/p' | grep -zE '////.?*////'` どのクライアントでも見える。動機は率直だ。TLS の ACME 手続きは重く、証明書は失効する。「and the whole system doesn't even work because certificates are issued over plaintext connections, and trusted certificate aurthorities [sic] use very secure keys like '4'」——10 月の `d = 4` という漏洩 CA 鍵への直接の言及だ。それでも著者は暗号化は欲しい(「Passive eavesdropping is a real risk… but preventing it doesn't require the whole certificate thing」)。だから証明書は有効でブラウザは普通に受け入れる。「313333333337 (one of the most eleet primes)」のようなバニティ秘密鍵でも誰も気づかない。「A good protest should be obvious」なのだから。

**Why it matters:** この実演は盲点の実測だ。証明書当局が検証するのは鍵の**所持**であって、出自や強度ではない。つまり鍵素材は書き込み可能なチャネルになる——しかもこのメッセージは実際の CA の自動発行フローを生き延びた。本フィードがこのサイトの癖に触れるのは 2 度目でもある。maurycyz.com は一部のフェッチャーに機械生成の無意味な孪生ページを返し(本フィードのリーダーが受け取ったのは 2 回ともその生成テキストだった)、本当の記事は気に入ったリクエストにしか描画されない。フッターには「This website is not licensed for LLM training or content creation」とある。

[`🔗 Horrible public key tricks`](https://maurycyz.com/projects/badcert/) · [`🔗 HN ディスカッション`](https://news.ycombinator.com/item?id=50434264)

---

## 38. あなたのテレビは壁の向こうが見える:アンテナ 1 本とスペクトラム瀑布図による動体検知

- **Velocity:** ▮▮ rising
- **Source:** maurycyz.com · 153 pts on HN · Nov 10 (~13:24 UTC+8)
- **Tags:** `rf` `sdr` `privacy`

同じ著者の RF 実演(2025 年 8 月〜2026 年 2 月に書かれ、今日 HN に上がった)。**Ettus USRP B200** で局所の **ATSC デジタル TV 局**(約 490 MHz)を録り、スペクトログラムを眺める。直接波が強い反射波と打ち消し合う——**選択的フェージング**——で、打ち消しが経路長に依存するがゆえに、経路中の移動は縞模様として描かれる。「The gaps between the stripes happen when my reflection perfectly cancels out the residual signal, which happens each time the path length changes by one wavelength。」縞の間隔(150 Hz の瀑布更新で約 70 ピクセル)から歩行速度を計算すると、1 縞 0.47 秒 → 2.1 Hz → **1.3 m/s = 4.6 km/h**——実際の歩調と一致し、進行方向が信号経路に垂直だったため幾何補正は不要だった。

**Why it matters:** この仕組みの优雅さは受動的なところにある。カメラもマイクもなし、受信機と位相打ち消しの算数だけ。同じ幾何はあらゆる広帯域信号に成り立つ(「any wideband radio signal like WiFi or LTE can be used in much the same way」)。プライバシーへの含意は古い命題の新しい周波数での言い直しだ。建物の電波環境は、中にいる全員に向けられた動体センサーである。著者の締めくくりは「Happy paranoia!」

[`🔗 Your TV can see through walls`](https://maurycyz.com/projects/fading/) · [`🔗 HN ディスカッション`](https://news.ycombinator.com/item?id=50436410)

---

## 39. CPython の形式化:エージェントがインタプリタを Lean へ行単位で書き直す —— バグ報告 418 件、うち約 55 件は通常の Python からクラッシュ可能

- **Velocity:** ▮▮ rising
- **Source:** broyojo.com · 86 pts on HN · Nov 10 (~09:56 UTC+8)
- **Tags:** `research` `formal-methods` `python`

**David Andrews と Chao Zhang** はエージェント(「Opus 5.5」)を **CPython 3.15.2** に向け、関数を行単位で **Lean 4** に書き直させた。各関数は 4 段のゲートを通る。符号なしラップアラウンドなどの癖を保ったまま Lean に写す、**50,000 入力以上**で本物の Python と対比テストする、性質を証明する、そして独立した第二のエージェントがレビューする——ゲートの問いは「could a broken version of the function pass it too?」。「A valid proof about a wrong copy is the most misleading result you can get」だからだ。開始から 10 日(10 月 29 日着手)で**定理と補題 18,898 本**、**Lean 613,318 行**、**26,004 関数のうち 4,071(15.7%)**——文法規則 100%、組み込み型 35%、パーサ 31%、C モジュール 19%、インタプリタ本体 10%、標準ライブラリ 9%。現在の成果物は**バグ報告 418 件**。「about 55 can crash the interpreter or corrupt memory from ordinary Python code」で、モジュールの C 版と純 Python 版が食い違う事例が 129 件。

**Why it matters:** これを形式手法のデモと分けるのは規模だ。588 の命題が**反例つきで偽と証明**され、相手は本物のインタプリタ。クラッシュリストは具体的だ。属性 dict への `StrEnum` キーの `setdefault` でセグフォ、ElementTree 要素への後方スライス代入で子が 1 つ複製され 1 つ失われる。このパイプライン自体(証明の前に本物との対比テスト、敵対的な第二エージェントレビュー)はあらゆる C コードベースのエージェント駆動検証に転用できるレシピで、作業はオープンだ。リポジトリは Apache-2.0、今日も push されている。

[`🔗 Formalizing CPython`](https://broyojo.com/python-formalization/) · [`🔗 Broyojo/python-formalization`](https://github.com/Broyojo/python-formalization) · [`🔗 HN ディスカッション`](https://news.ycombinator.com/item?id=50435105)

---

## 40. tokio-rs/topcoat:tokio 本家の「電池付き」Web フレームワーク、5 週間で 3 回目のリリース

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · 本日 +192 スター · Nov 10 (~20:15 UTC+8)
- **Tags:** `rust` `web-framework` `github-trending`

**tokio-rs/topcoat**(Rust、MIT、**6,591 スター**、2026 年 4 月作成)が 1 日 +192 でトレンドに載っている。**v0.12.0 は 11 月 9 日にリリース**で、リリースノートの書き出しが珍しいほど率直だ。「This release reworks some foundations of Topcoat. Most apps will need many small edits. **We are sorry for the churn**, but we believe these changes make Topcoat simpler and more extensible。」信号はペースのほうだ。v0.10.0(10 月 3 日)はクライアントサイドナビゲーション(`runtime::link`——ページ・タイトル・履歴を更新しつつ共有 signal を保持しスクロール位置を復元)、v0.11.0(10 月 24 日)は **Fluent** ベースのローカリゼーションと翻訳チェック、v0.12.0 は context の統一(one context、route context、router settings)とマクロ様式(「context comes first」「one argument style」)。

**Why it matters:** 「batteries-included」なサーバーレンダリング Rust Web フレームワークが tokio 本体のオルグから来る——axum や actix の足元にある非同期ランタイムを持つあのプロジェクトだ——のは、Rust の Web 開発は部品箱ではなく統合スタックへ向かうべきだという一つの意見表明だ。0.x での破壊的変更への謝罪が正直な半分、5 週間で 3 リリース・毎回アップグレードガイド付きが速さの半分。その上でアプリを始める前に、両方を読む価値がある。

[`🔗 tokio-rs/topcoat`](https://github.com/tokio-rs/topcoat) · [`🔗 v0.12.0 リリースノート`](https://github.com/tokio-rs/topcoat/releases/tag/v0.12.0)

---

## 41. ha-mcp:Claude に Home Assistant を預ける MCP サーバが 1 日で 792 スター

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · 本日 +792 スター · Nov 10 (~20:15 UTC+8)
- **Tags:** `mcp` `home-automation` `github-trending`

**homeassistant-ai/ha-mcp**(Python、MIT、**6,337 スター**)は本日最速のトレンド急上昇リポジトリで**+792 スター**:MCP サーバと Home Assistant カスタムコンポーネントのセットで、Claude や ChatGPT などのアシスタントに「configure and automate Home Assistant」させる。リリース規律もエージェントの形をしている。**v9.1.2** は 11 月 8 日にリリースされ、v9.2.0 の開発プレリリースは本フィードの執筆当日も転がり続けている(03:52 UTC の dev3452、11:35 UTC の dev3454)。そのチェンジログの行はエージェント運維そのものだ。「fix: tell agents how to guard a python_transform edit (#3022)」。インストールは HACS 経由で、dev チャネルにはプレリリーススイッチがある。

**Why it matters:** スマートホームエージェントの波が届いたのは**インフラ**としてであって、デモとしてではない。6.3k スターのプロジェクトのコミット内容が、生きた家庭の状態をエージェントに慎重に扱わせること(自動化を壊しかねない `python_transform` 編集)そのものだ。物理的な家のインターフェースがツールを持つモデルになると、チェンジログは安全文書になる。このプロジェクトは明らかにそういう書き方をしている。

[`🔗 homeassistant-ai/ha-mcp`](https://github.com/homeassistant-ai/ha-mcp) · [`🔗 v9.1.2 リリース`](https://github.com/homeassistant-ai/ha-mcp/releases/tag/v9.1.2)

---

## 42. Sure:放棄された Maybe Finance のコミュニティフォークがモバイルビルドを出荷し始めた —— Android APK と未署名 iOS

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · 本日 +184 スター · Nov 10 (~20:15 UTC+8)
- **Tags:** `fintech` `self-hosted` `github-trending`

**we-promise/sure**(Ruby、AGPL-3.0、**11,422 スター**、+184/日)は README の最初の行で系譜を明かす。「This repository is a community fork of the now-abandoned Maybe Finance project。」セルフホストの家計管理アプリ——ダッシュボード、純資産、支出、貯蓄について答える AI アシスタント——はもう Web だけではない。**v2026.11.8-alpha**(11 月 9 日)は**モバイルの debug ビルド**(Android APK と未署名 iOS ビルド)を含み、前の v2026.11.3-alpha は暗号資産アカウントによるゴールへの資金追加やmerchantロゴを加えた。安定版ラインの規律も保たれている。10 月 31 日の **v0.7.6** は「we haven't missed that cadence in more than a year!」。勢いの代償もカウンタに見える。**未解決の issue と PR が 871**。

**Why it matters:** Maybe から Sure への引き継ぎは、今年のオープンソース家計管理物語が自力で決着した形だ。元プロジェクトは 2024 年にオープンソース化して閉じ、コミュニティオルグがそれを墓の向こうの 11k スターまで運んできた——リリース規律と、モバイルクライアントと、後付けの AI アシスタント層つきで。セルフホスト fintech を評価する任何人にとって、正直な読み方は数字の中にある。1 年間途切れない月次リリースは本物の信頼性であり、871 の未解決 issue と PR はその背後のキューだ。

[`🔗 we-promise/sure`](https://github.com/we-promise/sure) · [`🔗 v2026.11.8-alpha リリースノート`](https://github.com/we-promise/sure/releases/tag/v2026.11.8-alpha) · [`🔗 v0.7.6 リリースノート`](https://github.com/we-promise/sure/releases/tag/v0.7.6)

---

## 43. クイーンズ公共図書館がランサムウェア攻撃を受ける:全館は開館、ただし公式サイトと App と更新手続きは停止

- **Velocity:** ▮ steady
- **Source:** connect.queenslibrary.org · 58 pts on HN · Nov 10 (~17:04 UTC+8)
- **Tags:** `ransomware` `public-services` `security`

米最大級の図書館システムの一つ、クイーンズ公共図書館が別ドメイン上に障害告知を出した。「We are open as scheduled but experiencing a significant network outage affecting all locations」。そして「This disruption, the result of a **ransomware attack**, impacts the following services」——公式サイト、QPL モバイルアプリ、多くの拠点の公共 PC、デジタルメディアサービス。部分的に復旧したのは、全開放拠点の無料 Wi-Fi、貸出・返却機、7 支店(Central Library、Far Rockaway、Flushing、Glen Oaks、Hunters Point、Jackson Heights、Kew Gardens Hills)の公共 PC。貸出は動いているが「During this outage, however, renewals are unavailable」で、「customers are not charged late fines on borrowed materials」。ページには発生日も攻撃グループの帰属もない。ローリング更新のステータスページだ。

**Why it matters:** 市政機関ではもう定番の型だ——公開ドメインが消え、更新は帯域外ホストへ移る——だが、ここで面白いのは運用の詳細のほうだ。図書館は紙と机で貸出を続けられる一方で、目録と公共 PC とデジタルコレクションこそが実際の人質である。公共サービスにとってのランサムウェアの算数はこれだ。**中断そのものが要求**であり、復旧した一つ一つのサービス(最初が Wi-Fi、最後が更新手続き)は、衆目の中で行われたトリアージ判断である。

[`🔗 クイーンズ公共図書館 障害告知`](https://connect.queenslibrary.org/) · [`🔗 HN ディスカッション`](https://news.ycombinator.com/item?id=50437790)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-10T12:33:35Z |
| Items | 43 |
| Sources tracked | 43（Hacker News、GitHub Trending、NVD、CISA KEV、arXiv、ベンダーブログ、セキュリティアドバイザリ） |
| Update schedule | 04:03, 12:03, 20:03 UTC+8（1 日 3 回） |
| Ranking | 速度加重（即時性 × エンゲージメント加速度 × 情報源の権威） |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[前日](2026-11-09.md) · [生 .md](https://trending.md/jp/feed/2026-11-10.md) · [アーカイブ](../archive/)
