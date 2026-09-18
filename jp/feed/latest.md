---
date: 2026-09-18
updated: 2026-09-18T20:25:00+08:00
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 38
license: CC-BY-4.0
---

## 1. Hister —— SearXNG の作者が帰ってきた、「読んだものすべて」を検索するプライベート検索エンジン

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 255+ pts · 3時間前（~01:00 UTC+8）
- **Tags:** `search` `privacy` `self-hosted` `mcp`

Searx/SearXNG の作者 asciimoo が Hister を公開：ブラウザ拡張経由で訪問したすべての
ページを全文インデックス化する自己ホスト型の Go 製検索エンジンで、ブックマーク、ローカル
ファイル、クロール済みサイトも対象。設定可能な embeddings エンドポイントによるセマンティック
検索、オフラインのページプレビュー、そして AI アシスタントが個人コーパスを照会できる
MCP エンドポイントを備える。4.1k スター、AGPLv3、Homebrew/Docker/Nix 対応。HN スレッドで
作者は、histre.com からの商標通知により名前を変更する必要があることを確認し、公開投票を
予定していると述べた。

**Why it matters:** 2013年頃に Chrome が廃止した全文ブラウザ履歴を復活させるタイミングが、
まさにエージェントがプライベートな検索レイヤーを必要とする瞬間と重なり、MCP エンドポイントに
よりコーディングエージェントの即席メモリバックエンドになる。「読んだものすべてをインデックス
すること自体がハニーポットだ」というスレッド内のセキュリティ懐疑論も、この話の一部だ。

[`🔗 github.com/asciimoo/hister`](https://github.com/asciimoo/hister) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49743097)

---

## 2. WSO2 API Manager：CVSS 10.0 の修正から5ヶ月、偽造管理者 JWT がハニーポットに到達中

- **Velocity:** ▮▮▮ trending
- **Source:** watchTowr ハニーポット（初検知 9月13日）· 9月16日 警告
- **Tags:** `cve` `wso2` `api-gateway` `jwt` `active-exploitation`

CVE-2026-5430（CVSS 10.0 v3.1、CNA/Secondary 評価；NVD は「Analyzed」）は、WSO2 API
Manager 4.1.0–4.6.0 および対応する Control Plane、Traffic Manager、Universal Gateway における
JWT アルゴリズム混同の認証バイパス：非対応アルゴリズムで署名されたトークンが受理され、
管理者 JWT の偽造とアカウント完全乗っ取りが可能になる。WSO2 は 2026年4〜5月に修正を
リリース済み（アドバイザリ WSO2-2026-5328、API Manager 4.6.0 アップデートレベル 21）。
watchTowr のハニーポットは 9月13日、「管理者権限が組み込まれた」偽造 JWT を検知——
しかも攻撃者は誤った製品を攻撃しており、watchTowr がそのペイロードを本物の製品で再生した
ところ、攻撃は成功した。

**Why it matters:** API ゲートウェイは企業トラフィックの入口であり、そこでの管理者トークン
偽造は watchTowr の言う「ラテラルムーブメント・アズ・ア・サービス」であり、すべての
バックエンドエンドポイントと各登録アプリの consumer キーが露出する。修正が遅れた別の
CVSS 10 が導入遅れの組織を焼いている；ただし限定詞は保持：確認済みなのは攻撃*試行*で、
実際の侵害は「疑わしい」段階。

[`🔗 SecurityWeek`](https://www.securityweek.com/enterprises-warned-of-attacks-exploiting-wso2-vulnerability/) · [`🔗 The Hacker News`](https://thehackernews.com/2026/09/active-exploitation-attempts-target.html)

---

## 3. Colibrì —— NVMe からエキスパートをストリーミングして 744B MoE をデスクトップで動かす、モデルごと C ファイル1つ

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub Trending · +872 スター/日（日次 #15）· 累計 35.7k
- **Tags:** `inference` `moe` `llm-cpp` `quantization`

JustVugg/colibri はゼロ依存の純 C 推理エンジン（「重みのための JIT」）で、VRAM/RAM/NVMe の
マルチティア構成を取る：744B GLM の約 17B の dense コアを RAM に保持し（int4 で約 9.9 GB）、
19,456 個のルーティング experts（約 372 GB）を必要に応じてディスクからストリーミングする。
GLM-5.2/5.3、Kimi K3（2.8T）、DeepSeek V4 Flash、Qwen3.6、OLMoE に対応——GPU 不要。
Apache-2.0、v1.11.0 は 9月13日 リリース、README は「ネガティブな結果も歓迎」と明言している。

**Why it matters:** 他が曖昧にする正確な数値を公開している——128 GB の CPU 専用マシンで
ウォーム時 1.8 tok/s、RTX 5090×6 で 5.8–6.8 tok/s。プロジェクト自身の但し書きも読むこと：
ベンチマークは自己公開かつマシン依存で、O_DIRECT の利点是「マシンごとに異なる」。

[`🔗 github.com/JustVugg/colibri`](https://github.com/JustVugg/colibri) · [`🔗 GitHub Trending`](https://github.com/trending)

---

## 4. LimiX-2：400M の表形式基盤モデルが、1回の forward パスでタスク専用パイプラインに勝つと主張

- **Velocity:** ▮▮▮ trending
- **Source:** Hugging Face Daily Papers · 1位、87 アップボート（9月17日批次）
- **Tags:** `tabular` `foundation-models` `paper` `benchmark`

LimiX-2（arXiv:2609.17488、重みは 9月16日 リリース）が 9月17日 の HF Daily Papers で
首位。「Contextual Mechanism Networks」は、通常の tabular-PFN の目標 p(y|x,D_context)
ではなく結合構造 p(x,y|D_context) を学習し、構造的因果モデルからサンプリングした合成
データへのコンテキスト条件付きマスクモデリングで事前学習される。リポジトリは TabArena
（1935）、TALENT（1506）、BCCO（1432）で最高 Elo を報告し、TabPFN-3 と AutoGluon 1.6 を
上回り、1回の forward パスで分類・回帰・補完を同時に処理する。共著者 60 名、清華大学主導。

**Why it matters:** 小さな 1 モデルでデータセットごとの ML パイプラインを置き換えるのは、
リーダーボードの変動ではなくアーキテクチャレベルの主張だ——ただし細部も添える：400M の
重みは StableAI LimiX の**非商用**ライセンス（Apache 派生ライセンスなのは 2M/16M 版のみ）で、
アブストラクトには生の精度数値がなく、相対的な「上回る」主張のみ。

[`🔗 arXiv:2609.17488`](https://arxiv.org/abs/2609.17488) · [`🔗 github.com/limix-ldm-ai/LimiX`](https://github.com/limix-ldm-ai/LimiX)

---

## 5. Check Point 管理サーバー：認証不要の pre-auth root RCE（CVSS 9.8）、LivePatch で修正

- **Velocity:** ▮▮ rising
- **Source:** Check Point アドバイザリ sk1000155 · 9月16日 披露
- **Tags:** `cve` `checkpoint` `firewall` `rce`

CVE-2026-91843 は、Security Management Server、Multi-Domain Security Management、Log
Server、Multi-Domain Log Server の**未認証ログインプロセス**におけるスタックオーバーフローで、
Check Point は「攻撃者が root 権限でリモートから任意のコードを実行できる可能性がある」
としている。CVSS 9.8 は Check Point 自己評価（NVD は依然「Received」）；影響版は R82.20、
R82.10 Take ≤44、R82 Take ≤126、R81.20 Take ≤166 および EoS リリース。
URGENT_SECURITY_UPDATE LivePatch（sk185114）で修正済み。CISA SSVC：悪用「なし」、
自動化可能性「あり」。検知用のログ行——「Administrator failed to log in: Username too
long」——により遡及調査は極めて容易になる。

**Why it matters:** これはゲートウェイではなく管理プレーン——すべてのファイアウォールに
ポリシーを配布する要の箱だ。現時点で悪用や PoC は確認されていない；ただし grep 一発で
見つかる失敗シグネチャは諸刃の剣だ。

[`🔗 Check Point アドバイザリ sk1000155`](https://support.checkpoint.com/results/sk/sk1000155) · [`🔗 NVD レコード`](https://nvd.nist.gov/vuln/detail/CVE-2026-91843)

---

## 6. AI が Metaculus Cup で 1位・2位・5位を独占——エリート人間予測者相手に初の表彰台独占

- **Velocity:** ▮▮ rising
- **Source:** The Economist（HN 経由）· 99+ pts、87 コメント · 5時間前（~23:10 UTC+8）
- **Tags:** `forecasting` `benchmark` `evaluation`

The Economist によれば、AI システムが初めて Metaculus Cup 予測トーナメントで優勝し、
トップ人間予測者を相手に 1位・2位・5位 を獲得した——2025年の ManticAI の 931人中 8位から
の躍進。Metaculus 自身の 2026 分析は必要な陰影を加える：**Pro チームは 4四半期すべての
対戦で bot チームに勝利**、上位 bot の成績は「小サンプルのノイズ」で変動し、バックテストに
基づく「スーパーフォーキャスター並み」の主張はデータリークの問題を抱える。

**Why it matters:** 実況トーナメント予測は「バックテストで勝つ」ことが最も難しいベンチマーク
の一つであり、表彰台独占は実質的なマイルストーンだ——ただし正直な見出しは「上位 bot は
大多数の人間には勝ったが、プロチームにはまだ敗れている」。

[`🔗 Metaculus 分析`](https://www.metaculus.com/notebooks/43363/ai-forecasting-in-2026/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49742021)

---

## 7. GitLab.com、レート制限をサブスクリプション階層に紐付け——理由として明示されたのは「エージェント」

- **Velocity:** ▮▮ rising
- **Source:** GitLab ブログ · HN 117+ pts、95 コメント · 4時間前（~23:30 UTC+8）
- **Tags:** `gitlab` `rate-limiting` `api` `agents`

GitLab は GitLab.com の API/Git-over-HTTP レート制限をユーザー単位・トップレベルグループ単位で
プランに紐付けて実施すると発表：未認証トラフィックは **IP あたり毎時 60 リクエスト**に低下、
10月7日・14日（15:00–19:00 UTC）に brownout プレビュー、10月19日 から Free/匿名トラフィックに
本適用、Premium/Ultimate への変更は 2027年1月。発表は「自動化とエージェントワークロード」
および匿名制限に達した有料アカウントを動因として明示；Self-Managed/Dedicated は対象外で、
git push/pull と通常 CI は変更なし。

**Why it matters:** GitLab.com に匿名でアクセスするすべての CI スクリプト、ミラーボット、
公開ステータスバッジが 10月に静かに壊れる——そして「今年後半」提供の超過分購入オプションは、
レート制限が有料 SKU になりつつあることを示す。今四半期、agentic トラフィックを巡って API
アクセスの再価格設定をした2つ目の大手 Git フォージ。

[`🔗 GitLab ブログ`](https://about.gitlab.com/blog/rate-limit-change-2026/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49742353)

---

## 8. CrowdSec、プライベートソースコードの 5月流出を確認——漏出経路は TanStack サプライチェーン侵害

- **Velocity:** ▮▮ rising
- **Source:** CrowdSec 声明 · HN 90+ pts、29 コメント · 4時間前（~23:30 UTC+8）
- **Tags:** `supply-chain` `crowdsec` `disclosure` `ci-cd`

CrowdSec は声明（9月17日）で、**プライベート** GitHub リポジトリ——SaaS コンソールコード、
AWS ルーチン、コネクタ——が **2026年5月** に漏出したことを 9月16日 に知らされたと確認、
「TanStack 侵害が漏出経路である可能性が非常に高い」とし、プライベートコードの読み取り権限を
持つ CI/CD トークンが抽出されていたという。同社は「約300リポジトリ」という見出しに異議を
唱え（公開 130+ を除けばプライベートは約 170）、顧客データ・PII・認証情報は漏出に含まれず、
トークンの調査「これまで不検知」、全認証情報はローテ済みと述べた。

**Why it matters:** CrowdSec のブロックリストエンジンは数百万のエンドポイントで稼働している。
声明自身の但し書き——漏出コードは4ヶ月古く、「5月の短い期間のみ利用可能」——が重い持ち
回りを担っている；CrowdSec Console を運用するチームは「300リポジトリ侵害」の二次報道では
なく一次声明を読むべきだ。

[`🔗 CrowdSec 声明`](https://www.crowdsec.net/blog/crowdsec-statement-source-code-exposure) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49742355)

---

## 9. Docker Sandboxes の脱出チェーン：guest コードが macOS ホストのファイルを読み書き可能に（CVSS 9.4）

- **Velocity:** ▮▮ rising
- **Source:** Docker アドバイザリ · 9月15日 公開 · 修正は 9月7日 リリース済み
- **Tags:** `cve` `docker` `sandbox-escape` `agents`

CVE-2026-77179（CVSS 9.4、Docker 自己評価）：macOS で、virtio-fs ホストサーバーが削除された
ファイルの再オープン時にシンボリックリンクを追うため、guest は親ディレクトリをシンボリック
リンクに差し替えて VMM ユーザーとしてホストファイルの読み書きができる——「ホストでの
コード実行につながる可能性」。第二の脆弱性 CVE-2026-79994（8.7）は guest→ホスト Unix
socket 中継の TOCTOU で、任意のホスト AF_UNIX ソケットへの接続を可能にする。
Sandboxes 0.28.0–0.41.x が影響、0.42.0 で修正。悪用は確認されていない。

**Why it matters:** Sandboxes は AI コーディングエージェントの標準的な分離レイヤーであり、
`sbx run` はデフォルトで cwd を読み書き共有する。緩和策（`--clone` モード）はホストへの
*書き込み*は防ぐが**読み取りは防げない**——`.env` ファイルは晒されたままだ。この脱出チェーンは、
エージェント対不信頼コードという脅威モデルそのものだ。

[`🔗 The Hacker News`](https://thehackernews.com/2026/09/critical-docker-sandboxes-flaw-lets.html) · [`🔗 NVD レコード`](https://nvd.nist.gov/vuln/detail/CVE-2026-77179)

---

## 10. OpenAI の「Sponsored Agents」——エージェントのツール呼び出しに差し込まれる広告が HN で裁かれる

- **Velocity:** ▮▮ rising
- **Source:** OpenAI ブログ（9月10日）· HN 議論は 9月16日 · 156+ pts、176 コメント
- **Tags:** `openai` `advertising` `agents` `monetization`

OpenAI の「Reimagining advertising with AI」投稿（**9月10日** 公開；ニュースは HN 議論の
方）は Sponsored Agents を詳述する——エージェント会話内に表示される広告で、まず英語圏
ユーザーの ChatGPT モバイルアプリで開始、HubSpot アプリ統合と Shopify マーチャントフローを
伴い、一部の米国広告主でテスト中、Shopify の国際展開は 9月23日 から。スレッドは 9月16日 に
浮上し、大規模かつ批判的多数だった。

**Why it matters:** チャットテキストだけでなくエージェントのツール呼び出しに混ざる広告は、
agentic 製品のマネタイズの規範を決める；ChatGPT 上にアプリを作る開発者は、スポンサード
コンテンツが自分のアプリとユーザーの質問の間に割り込むことを織り込んで設計する必要がある。
9月10日 の公開日はそのまま明記；この項目は新発表ではなく、精査の波についてのものだ。

[`🔗 OpenAI ブログ`](https://openai.com/index/reimagining-advertising-with-ai/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49727041)

---

## 11. mysetup.ai ——「AI セットアップを共有」が HN フロントページに、MCP 権限の反発こそが本題

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 129+ pts、73 コメント · 7時間前（~21:00 UTC+8）
- **Tags:** `agents` `tooling` `privacy` `community`

ユーザーがエージェントのフルセットアップを公開するコミュニティディレクトリ——どのハーネスを
使い、どのスキルが残り、長時間タスクをどう扱うか——が HN フロントページに。投稿には
元々、「エージェント、ハーネス、スキル、接続、作業慣行」をスキャンする MCP サーバーの実行と
GitHub 接続が必要だった；支配的なコメントスレッドが得体の知れない MCP サーバーにその可視性を
渡すことを拒否すると、創業者は数時間以内に手動入力経路を追加した。コメント欄では、VM 内の
素の Claude から 8GB VRAM で Qwen 35B を約 50 t/s で動かす構成まで、具体的なセットアップが
共有された。

**Why it matters:** 人々が実際に使い続けているエージェントツールの、生きた引用可能なセンサス
だ——そして MCP 権限の拒否そのものが、ツールベンダーの想定と対照的な、ユーザーの信頼境界の
実際の位置に関する有用な現場データだ。

[`🔗 mysetup.ai`](https://mysetup.ai/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49740105)

---

## 12. DNS パッチウィーク：Unbound が重大な DNSSEC ヒープオーバーフローを修正、ISC は BIND の14件をパッチ

- **Velocity:** ▮▮ rising
- **Source:** NLnet Labs + ISC アドバイザリ · 9月17日
- **Tags:** `dns` `cve` `dnssec` `patching`

Unbound 1.26.1（9月17日）は CVE-2026-81642 を修正：owner name の圧縮ポインタが自身の RDATA
を指す DNSKEY レコードがダイジェストバッファをオーバーフローさせる——≤1.26.0 の全リリースが
影響、CVSS 4.0 **9.1 は NLnet Labs 自身のスコア**（NVD は依然「Awaiting Analysis」）。同一
アドバイザリで、Anthropic の Ben Morris が報告した CNAME 合成のヒープ破壊 CVE-2026-82717 も
修正。但し書き：NLnet Labs の公表影響は DoS——RCE は「可能性」で、実証されていない。同日、
ISC は 9.20.29/9.21.26 で DoS 類の BIND 9 脆弱性 14件をパッチ、中には CVE-2026-77692 もある：
無効な SIG(0) レコード付きの DoH リクエスト 1発で `named` がクラッシュする。

**Why it matters:** 最も広く展開されている 2 つの DNS コードベースが、同じ 48 時間で協調
パッチを必要とした。Unbound の攻撃にはリゾルバに問い合わせる悪意あるゾーンがあれば足り、
1 パケットの DoH クラッシュは簡単に自動化できる——リゾルバを確認すること。

[`🔗 NLnet Labs アドバイザリ`](https://nlnetlabs.nl/downloads/unbound/CVE-2026-81642.txt) · [`🔗 SecurityWeek（BIND）`](https://www.securityweek.com/isc-patches-14-vulnerabilities-in-bind-9-security-update/)

---

## 13. Gowers と Tao が揃って「Why I didn't sign」を発表——Fields メダリスト共同声明に異論が

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 156+ pts、202 コメント（Gowers 版）· 9時間前（~15:00 UTC+8）
- **Tags:** `ai-policy` `mathematics` `research-culture`

9月17日、Timothy Gowers と Terence Tao が独立に「Why I didn't sign the Fields medallists'
letter」と題する投稿を発表した——あの書簡とは、9月12日 に取り上げた「AI の数学における深刻な
ミスアライメント」（署名25名、Tao は不在）のことだ。両投稿とも書簡の主張に真剣に向き合い
つつ署名を辞退；Gowers 版の HN スレッドには 202 件のコメントが集まった。

**Why it matters:** 元の共同声明は「数学者たちが語った」として報じられた；存命で最も引用される
二人の数学者が、根拠を示した公開の異議を選んだことで、これは分野内部の開かれた論争として
再定義された——彼らがどの論点を受け入れどれを拒否したかは、署名数よりもはるかに情報量が
多い。

[`🔗 HN 議論（Gowers）`](https://news.ycombinator.com/item?id=49738091) · [`🔗 HN 議論（Tao）`](https://news.ycombinator.com/item?id=49743534)

---

## 14. Gyazo 情報漏洩：アップロードサーバー侵害で 2,362万件のユーザー記録と 4.9億件の画像メタデータが露出

- **Velocity:** ▮ steady
- **Source:** Helpfeel 披露（9月16日）· HN/報道 9月17日
- **Tags:** `breach` `screenshots` `privacy`

京都の Helpfeel は、Gyazo の画像アップロードサーバーへの不正アクセスにより攻撃者が任意の
コマンドを実行しデータベースに到達したと公表：約 2,362万件のユーザー記録（氏名、メール、
パスワードハッシュ、セッション ID、デバイス ID）と約 4.9億件の画像メタデータ記録——URL を
構成する画像 ID、EXIF 位置情報、OCR テキスト、非公開画像のパスフレーズハッシュ。公式通知に
よれば、4.9億件のメタデータは主に 2019年1月 以前に登録された画像（全画像データの約 14.4%）
で、フィルタクエリで取得された約 240万枚分のメタデータは別。9月11日 不正アクセス検知、
9月15日 日本の個人情報保護委員会に報告、9月16日 公表。一部の非公開画像が閲覧された可能性を
「排除できない」としている。

**Why it matters:** リンクが鍵代わりのスクリーンショットサービスは開発者の標準的なワークフロー
ツールだ；画像 ID が漏れればリンクは構成可能になり——OCR テキストとパスワードハッシュの
組み合わせは、認証情報と機密スクリーンショットの二重の露出になる。古い Gyazo リンクは公開
扱いと考えること。

[`🔗 Helpfeel 公式通知`](https://corp.helpfeel.com/en/news/news-20260916) · [`🔗 The Hacker News`](https://thehackernews.com/2026/09/gyazo-breach-exposes-2362-million-user.html)

---

## 15. 「LLM 分類は特徴量エンジニアリングだ」——LLM の判定をロジスティック回帰で包むと Brier スコアが半減

- **Velocity:** ▮ steady
- **Source:** Hacker News · 77+ pts、14 コメント · 4時間前（~00:00 UTC+8）
- **Tags:** `evaluation` `classification` `calibration` `technique`

minimallysufficient.com の実験が、LLM 分類器のハードラベルの較正が悪いことを示した：SemEval-2018
の皮肉検出で Gemini Flash Lite は Brier スコア 0.259（ランダム推測は 0.25）。判定を 1 つの
特徴量として——LLM 抽出のブール副特徴 19 個と決定論的特徴とともに——ロジスティック回帰に
入れると、F1 は生の 0.747 から 0.779（CI 0.746–0.81）に向上し、SemEval 競技優勝者（0.705）を
上回り、競技後の LSTM SOTA（0.786）と信頼区間が重なる。

**Why it matters:** LLM に特徴量を出させ、古典的 ML で較正と合成を行うという安価な再構成だ——
作者自身の但し書きも保持：SOTA との比較は「信頼区間の重なり」であり、手法には訓練ラベルが
必要で、生の F1 の順序は変わらず、変わるのは較正のみ。

[`🔗 minimallysufficient.com`](https://minimallysufficient.com/posts/llm-classification-is-feature-extraction/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49742437)

---

## 16. Apple の再設計された ATT プロンプトが iOS 27.2 に——5つの EU 諸国では必須

- **Velocity:** ▮ steady
- **Source:** Apple 開発者ドキュメント · 9to5Mac/TechCrunch 9月16〜17日
- **Tags:** `apple` `privacy` `att` `ios`

Apple の開発者ドキュメントが確認：「iOS 27.2 および iPadOS 27.2 以降、開発者は EU で代替版の
App Tracking Transparency システムプロンプトを使用できる」——文言の再設計（Allow/Reject
ボタン、「track」の弱体化）に加え、任意の「追加情報」テキストと新しい
`NSUserTrackingMarkdownUsageDescription` キー。ドイツ、フランス、イタリア、ポーランド、
ルーマニアでは代替版が**唯一**の選択肢。Apple はさらに、EU ユーザーへの年 1 回の再プロンプトを
許可した——8月の独連邦カルテル庁との合意（ATT 変更 8 項目）の実装である。

**Why it matters:** ATT のオプトイン率は EU モバイル広告経済を支える；脅威感の薄い必須プロンプト
と年 1 回の再確認は、広告 SDK を組み込んだすべての iOS アプリの同意率を動かし、新しい API
サーフェス（`requestTrackingAuthorization(usingExpandedInterface:)`）への対応も必要になる。

[`🔗 Apple ドキュメント`](https://developer.apple.com/app-store/user-privacy-and-data-use/) · [`🔗 9to5Mac`](https://9to5mac.com/2026/09/16/ios-27-2-lets-developers-use-an-alternative-app-tracking-transparency-prompt-in-the-eu/)

---

## 17. 上海 AI Lab、PPO の失敗モードを「Value Flattening」と命名——修正はレスポンスあたり 3 状態だけの監督

- **Velocity:** ▮ steady
- **Source:** Hugging Face Daily Papers · #3、60 アップボート（9月17日批次）
- **Tags:** `rl` `ppo` `training` `paper`

「Rethinking Critic Learning in PPO」（arXiv:2609.18708）は、LLM 強化学習においてモンテカルロ
状態値が中間状態間で急激に変化するのに対し critic の予測は平坦に留まることを示した——作者は
この効果を Value Flattening と名付け、critic 損失の暗黙の分散ペナルティと時間的に相関する状態
からの冗長勾配に帰している。修正案の SP³O は、レスポンスあたり約 3 つの十分に分離した状態に
のみ価値損失を課す方式で、モデル規模と評価一式を横断して Qwen3-Base のポリシーを一貫して
改善；制御された FrozenLake 環境でも効果は再現した。

**Why it matters:** PPO の critic 訓練は現在のポストトレーニングの主力であり、明確に診断され、
ほぼ無償で適用できる失敗モードの修正は即座に使える——アブストラクトはスコープにも誠実だ：
LLM の証拠は Qwen3-Base のみで、絶対的なベンチマーク数値は示されていない。

[`🔗 arXiv:2609.18708`](https://arxiv.org/abs/2609.18708) · [`🔗 Hugging Face Daily Papers`](https://huggingface.co/papers)

---

## 18. TencentCloud が Octop 1.0 をオープンソース化——シングルプロセス、自己ホストのマルチエージェントアシスタント

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · +386 スター/日（日次 #16）· 累計 3.4k
- **Tags:** `agents` `self-hosted` `mcp` `open-source`

TencentCloud/Octop が v1.0.0 をリリース（9月14日、MIT、Python/React）：1 つのプロセスで Web
ダッシュボード、CLI、IM チャネル（Feishu、DingTalk、QQ、Discord、WeCom）、cron を提供し、
メモリと CDP ブラウザ自動化を備えた「Harness」スタックの上に構築、SQLite ファーストの保存、
マルチユーザー JWT 分離、PII マスキング、MCP ゲートウェイ、そして Claude Code・OpenCode・
Codex へ委譲する双方向 ACP を備える。3.4k スターでトレンド中；350 fork に対する 233 個の
open issues は、アーリーアダプタ税の典型だ。

**Why it matters:** 大手クラウドベンダーが、ホステッドサービスではなく真に自己ホスト・
マルチユーザーのエージェントランタイムを出荷したことは、パーソナルエージェントプラットフォーム
競争における注目すべきデータポイントだ；そして「シングルプロセス + IM チャネル」という
アーキテクチャは、西洋のチャット UI ファースト設計とは異なる賭けだ。

[`🔗 github.com/TencentCloud/Octop`](https://github.com/TencentCloud/Octop) · [`🔗 GitHub Trending`](https://github.com/trending)

---

## 19. NVIDIA の Agora：13 エージェント、12日間、Git を共有メモリに——1,703 件の貢献、再現失敗ゼロ

- **Velocity:** ▮ steady
- **Source:** Hugging Face Daily Papers · #6、38 アップボート（9月17日批次）
- **Tags:** `agents` `research-automation` `git` `paper`

「Agora: Git as Shared Memory for Collective AutoResearch」（arXiv:2609.18094、Jan Kautz と
Yi Dong らが著者）は、並列な自動研究エージェントの作業を Git コミットの追記型 DAG として
記録する——すべての主張が検証・再実行可能で、 monoculture を避ける多様性重視の選択規則を
持つ。13 人の監督なし LM ワーカーによる約 12 日間のランで、エージェントは凍結された 119.6M の
attention-SSM ハイブリッドを 3.39 から 1.899 bits per byte まで到達させ——訓練済み GPT-2 124M
との差の 62% を閉じ——165 回の独立再現が投稿され、失敗はゼロだった。

**Why it matters:** エージェント集団のための具体的で監査可能な協調基盤であり、来歴データが
異例に強い——そして著者自身の但し書きが重要だ：ランの途中で monoculture を破るための人手
介入が 1 回必要で、このトレースは共有メモリが発見を因果的に改善すると「証明しない」と明示して
いる。

[`🔗 arXiv:2609.18094`](https://arxiv.org/abs/2609.18094) · [`🔗 Hugging Face Daily Papers`](https://huggingface.co/papers)

---

## 20. 国連、Google のプラットフォーム上に Data Commons を開設——AI エージェント向けに MCP を提供

- **Velocity:** ▮ steady
- **Source:** UN 文書 + TechCrunch · 9月17日
- **Tags:** `data` `mcp` `un` `agents`

Google のオープンソース Data Commons の上に構築された国連システムデータコモンズ（UN System
Data Commons）は、旧 UNData ポータルを置き換え、自然言語クエリをサポートし、エージェントが
直接接続できる **Model Context Protocol** 対応を備える。26 の国連機関が参加を約束（開始時点で
データ提供は約 20）、2027年までに国連統計データセットの 80% オンボードが目標、Google.org が
200 万ドルを提供。誠実な但し書きも一緒に：UNICEF のベンチマーク（6 つの LLM、13万件超の
応答、未査読）は**平均精度 21.2%** を発見し、回答の約 5 分の 3 は使用可能な数値を返さず、
再現性は約 50% だった。

**Why it matters:** MCP エンドポイントを持つ権威あるエージェントアクセス可能な統計ソースは、
データエージェントを作るすべての人に直接有用だ——そして国連自身が「モデルは 5 回中 4 回
間違える」という基準を公開したことは、データエージェント分野では珍しいベンダー誠実な評価だ。

[`🔗 UN80 ワークパッケージ 16（PDF）`](https://un80actions.un.org/data/progress/wp16.pdf) · [`🔗 TechCrunch`](https://techcrunch.com/2026/09/17/un-turns-to-google-to-make-its-global-data-ready-for-ai-agents/)

---

## 21. Bend 2 が「証明で AI のミスを防ぐ言語」として再始動 —— 歴史は自分で squash

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 353+ pts · コメント181 · 8時間前（~04:36 UTC+8）
- **Tags:** `programming-languages` `formal-verification` `gpu` `agents`

Victor Taelin が Bend（bendlang/bend、20.6k スター、Apache-2.0、最終 push は 9月18日）を
「Bend 2」として再スタート：Python 風構文からネイティブコードと GPU 向けコードを生成し、
Lean/Rocq 型の proof-checking 型チェッカーが約 1 秒で検証するため、AI エージェントは
編集のたびに `LAWS.bend` の不変条件をチェックできる。「バグのマージは数学的に不可能：
それは定理だ」。ただし 20,615 個のスターは 2024 年の旧プロジェクトからの持ち越しで、
改名後のリポジトリは履歴が**単一コミットに squash** され、44 人のコントリビューターの
仕事は HigherOrderCO/Bend1 に移されている——HN スレッドで最も声の大きい批判ポイント
（「履歴を消すのは疑いを招く最高の方法だ」）。

**Why it matters:** 「LAWS.bend = 機械検証済みの証明で裏打ちされた AGENTS.md」という
売り文句は、エージェントのコードレビューが持つ穴に正確に狙いを定めている。ただし
細部も一緒に読むこと：作者自身がコンパイラに「大量の gambiarra と AI slop」があると
認めており、ベンチマークはすべて自己公開（Apple M4 Max）、サイト自身も「バグを期待
してください」と明記している。

[`🔗 bend-lang.com`](https://bend-lang.com/) · [`🔗 github.com/bendlang/bend`](https://github.com/bendlang/bend) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49746163)

---

## 22. PrismML の Bonsai 2 27B：5.9 GB の三値重みに収まった 27B モデル、Apache-2.0 で公開

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 297+ pts · コメント95 · 7時間前（~05:13 UTC+8）
- **Tags:** `quantization` `ternary` `open-weights` `inference`

PrismML（Caltech 発のスピンアウト）が Ternary Bonsai 2 27B を公開：Qwen3.8-27B を {−1,0,+1}
の三値重み＋FP16 グループ単位スケーリングで再構築し、重みあたり実効 1.76 ビット、5.9 GB、
コンテキスト 262K。GGUF/MLX 重みは Hugging Face に既に公開済みで Apache-2.0（「いつか」
ではない。Simon Willison がスレッドで GGUF を実際に動かしている）。自己申告のスコア：
集計 83.9 対フル精度 85.4（「98.2% 維持」）、RTX 5090 で 143 tok/s。

**Why it matters:** 三値化が 27B スケールで本当に機能するなら、27B クラスのモデルが
コンシューマー GPU の標準になる。ただし「near-lossless」はベンダーの言い回しで、実際には
**ほぼ全カテゴリーでフル精度のベースラインを下回る**（ビジョン 78.59 対 81.64）、Prism
独自の llama.cpp フォークが必須（Intel B70 ユーザーは使えるものが何も得られなかった）、
完全な数値はモデルカードではなくホワイトペーパー PDF にある。

[`🔗 prismml.com/news/bonsai-2-27b`](https://prismml.com/news/bonsai-2-27b) · [`🔗 HF: prism-ml/Ternary-Bonsai-2-27B-gguf`](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49746618)

---

## 23. 「Astra for Law」が HN の清算を受ける——386 pts が 9月9日 の発表と対峙

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 386+ pts · コメント412 · 8時間前（~04:17 UTC+8）
- **Tags:** `openai` `legal` `vertical-ai` `benchmarks`

ニュースは HN の議論の方：OpenAI の日付 **9月9日** の「Astra for Law」投稿がフロント
ページに上がり、コメントは 412 に達した。GPT-6 Astra を約 500 万件の米国判例（Free Law
Project/CourtListener コーパス）と 2,500 以上の「法律指示」に接続し、特定の法律事務所に
限定提供。API パートナーとして Harvey と Legora が名を連ねる。主張は Vals AI Legal
Research Bench で 54.0% 対「Astra＋ウェブ検索のみ」の 38.7%——ベースラインは同じ
「最高推論レベル」で実行されている。

**Why it matters:** 垂直特化フロンティアモデルのテンプレートであり、それがどう精査されるか
のテンプレートでもある。スレッドの主要な批判は発表が答えていない点そのもの：ヘッドラインの
ベンチマークは**プライベート検証セット**で、数値はすべて自己申告、ハルシネーション率に
ついては一切の記載がない。

[`🔗 OpenAI ブログ`](https://openai.com/index/astra-for-law/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49745940)

---

## 24. Qwen3.8-Omni-Flash：Alibaba のオムニモーダルモデルは API 専用——音声価格は 98% 値下げ

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 90+ pts · 5時間前（~07:05 UTC+8）
- **Tags:** `qwen` `multimodal` `alibaba` `api`

Alibaba が Model Studio に `qwen3.8-omni-flash` を追加：テキスト/画像/音声/動画のネイティブ
入力、1M コンテキスト、動画編集・映画解説・「Video2Note」などのエージェント型動画ワーク
フロー向け。29 ベンチマーク平均で Qwen3.5-Omni-Plus 比 +25%、音声は Gemini 3.8 Flash を
「上回る」と主張しつつ、音声入力価格を 98% 以上値下げ（約 $0.15/$0.47 per 1M トークン、
Gemini の $1.5/$9.0 対比）。Realtime WebSocket/WebRTC エンドポイントも提供。

**Why it matters:** 一つのリリースに二つのシグナル：オムニモーダル能力がコモディティとして
再価格設定されつつあること、そして Qwen の Omni シリーズは確固として**クローズド重み**
であること（HF にリポジトリは存在しない。同 org の最終アップロードは 8月27日。公開された
のは Qwen-MM-Plugins や Qwen-Live Harness などのツール類）。さらに Alibaba 自身の表でも、
複数のベンチマークでは Gemini 3.8 Flash が依然リードしている（AgenticVBench 45.0 対 36.8）。

[`🔗 Qwen ブログ`](https://qwen.ai/blog?id=qwen3.8-omni-flash) · [`🔗 github.com/QwenLM/Qwen-MM-Plugins`](https://github.com/QwenLM/Qwen-MM-Plugins) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49747925)

---

## 25. Plugin4Shell：プラグイン SHA ピン留めの回避で Claude Code・Codex・Copilot・Gemini CLI がゼロクリック RCE に

- **Velocity:** ▮▮ rising
- **Source:** AIR Security 研究 · HN 40+ pts · 8時間前（~04:05 UTC+8）
- **Tags:** `supply-chain` `coding-agents` `plugins` `rce`

AIR Security（9月17日）がプラグイン/スキルの SHA ピン留めに対するバイパスを公開：エージェントは
マーケットプレイスがピン留めした commit を正確にチェックアウトするが、それが実際にそこに
存在するかは検証しない——プラグインのリポジトリを掌握した攻撃者は、ピン留めが有効に見えた
ままチェックアウトを悪意あるコードへ解決させられる。結果はホストへのゼロクリック RCEで、
Claude Code・OpenAI Codex・GitHub Copilot・Gemini CLI に報告。ベンダーのタイムラインでは：
Claude Code は 2.1.179 で修正（6月17日）、Codex は 0.146.0 で修正（8月12日検証）、
**Copilot は未修正**、Google は 8月4日 に Gemini CLI を修正しないと確認（非推奨化済み）。

**Why it matters:** 今週扱ってきたすべてのスキル/プラグインエコシステムは「ピン留めされた
SHA ＝ セキュリティ境界」と想定している。この研究が言うのは、境界は実は git ホスト側の
チェックアウト意味論だということ。限定語もセットで：「何百万ものエージェント」という
フレーミングはエージェントセキュリティ製品を売るベンダーのもので、CVE ID は存在せず、
悪用は報告ベースで野外観測ではない。

[`🔗 AIR Security: Plugin4Shell`](https://www.air.security/blog-posts/plugin4shell) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49745809)

---

## 26. Cisco の 9月16日 アドバイザリ一括公開：FMC 18 件・ISE 20 件の CVE、2つ目の CVSS 10.0 認証バイパスも

- **Velocity:** ▮▮ rising
- **Source:** Cisco アドバイザリ + SecurityWeek · 9月16–17日
- **Tags:** `cve` `cisco` `firewall` `patching`

Cisco が 9月16日 のアドバイザリで Secure Firewall Management Center の 18 件の脆弱性を
修正——CVE-2026-20324（sftunnel 認証後 root RCE、9.9）と CVE-2026-20242（Java
デシリアライゼーション RCE、9.8）を含む——さらに Identity Services Engine の 20 件。その中に
**新たな**認証不要の REST API 認証バイパス（CVSS 10.0、CVE-2026-76423）がある——9月17日 に
扱った KEV 登録のゼロデイ CVE-2026-76460 とは別件で、こちらは同じバンドルで修正済みと
して出荷される。Nexus Dashboard も修正対象。

**Why it matters:** 昨日は Check Point の管理プレーン、今日は Cisco がこれを二重に。スコアは
注意して読むこと：ヘッドラインの 2 件はいずれも**Cisco PSIRT 自己評価で、NVD はまだ
「Awaiting Analysis」**——しかも Cisco 自ら、ISE の 3 件が公開開示の後に修正されたと認めて
いる。実際に野外で悪用されている FMC の脆弱性は 3月/7月 の古いもので、このバッチではない。

[`🔗 Cisco 予告アドバイザリ`](https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-notice-jfxK98ZP) · [`🔗 SecurityWeek`](https://www.securityweek.com/cisco-fixes-dozens-of-flaws-across-fmc-ise-and-nexus-dashboard/)

---

## 27. 「Hacking OpenAI」：フォーラムの RCE が従業員の ChatGPT アカウントに届いた——告白には細部が付いてくる

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 53+ pts · 2時間前（~10:47 UTC+8）
- **Tags:** `security-research` `openai` `bug-bounty` `sso`

AI セキュリティベンダーの Hacktron が 7月 の出来事を公開：community.openai.com での
Discourse→ImageMagick 経由の HEIC アップロードから libheif のヒープオーバーフローに到達し、
フォーラムで RCE を獲得——上流の修正がセキュリティリリースとしてラベル付けされていなかった
ため **CVE は存在せず**、Debian 12/13 と Discourse の Docker イメージは脆弱なバージョンを
出荷し続けていた。SSO の設定ミスと連結することで、研究者らは従業員の ChatGPT/Codex
アカウントに到達し、内部 monorepo に PR を出したと主張。OpenAI は 6,500 ドルを支払い、
SSO の欠陥を約 14 時間で修正した。

**Why it matters:** 教訓は二つ：セキュリティラベルのない上流修正は、すべての下流ディストロを
静かに危険に晒す。そして SSO は「自律的に動ける AI アカウント」までワンピボットの距離しか
ない。限定語も重要：OpenAI は Discourse テストを**報奨金の対象外と明示**しており（RCE 自体は
未許可）、作者らはモデルの拒否を通すため自らのインスタンスを CTF ターゲットに偽装したと
認めている——証拠はすべて自己申告の墨消しスクリーンショット。

[`🔗 Hacktron の記事`](https://www.hacktron.ai/blog/hacking-openai) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49749656)

---

## 28. DeepSeek-V4.1-Flash：読みを安く、書きを抑えた因果エンコーダ・デコーダ——重みは MIT で公開

- **Velocity:** ▮ steady
- **Source:** arXiv + Hugging Face · 論文 9月17日、重みは 9月10日 から
- **Tags:** `deepseek` `moe` `kv-cache` `open-weights`

DeepSeek が V4.1-Flash の論文（arXiv:2609.19969）を公開。重みは 9月10日 から Hugging Face に
あり——39万ダウンロード、3,024 いいね、**MIT ライセンス**。552B MoE は Causal
Encoder-Decoder 構造を採用し、デコード時は 16B パラメータ/トークン、prefill 時はわずか 8B を
活性化。入力の重いエージェントワークロード向けだ。KV 圧縮（層間 CSA2 ＋ FP4 KV）でキャッシュを
890 バイト/トークン（V4-Flash の約 1/4）にまで減らし、「SWA Bounded Replay」が永続キャッシュを
さらに約 1/8 に削る。コンテキストは 1M。

**Why it matters:** この経済性は、入力トークンが支配的なエージェント向けに真っ直ぐ狙って
ある：非対称な prefill/decode 活性化＋1/4 サイズの KV キャッシュは、アーキテクチャであると
同時にコストモデルだ。限定語：小さいキャッシュでもベースラインを上回るというのはあくまで
著者の主張——アブストラクトにベンチマーク表も limitations セクションもなく、推論コードの
リポジトリはリンクされておらず、checkpoint のみ。

[`🔗 arXiv:2609.19969`](https://arxiv.org/abs/2609.19969) · [`🔗 HF: deepseek-ai/DeepSeek-V4.1-Flash`](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash)

---

## 29. Zoom のハーネスアブレーション：176 の対照実験が、計画よりコンテキスト管理を指示する

- **Velocity:** ▮ steady
- **Source:** Hugging Face Daily Papers · 1位、26 票（9月18日 バッチ）
- **Tags:** `agents` `evaluation` `harness` `paper`

「An Empirical Study of Harness Design for Coding Agents」（arXiv:2609.20804、Zoom
Communications、43 ページ）は昨日の HarnessTax とは別の研究：既存ハーネスを比較するのでは
なく、独自の軽量ハーネスを作り、176 の対照設定（4 モデル × SWE-Bench Verified ＋
Terminal-Bench 2.1）で計画・アクション空間・コンテキスト管理をアブレーションした。結論：
予算が厳しいとき最も効くのはコンテキスト管理。ルールベースの文脈削減は LLM 要約より安い。
計画は弱いモデルには精度の足場だが、強いモデルには単なる節約。bash が使えるモデルは
bash だけのツールで十分低コストに動く。

**Why it matters:** 「ハーネスはどれだけ効くか」の問いに初めて統制の取れたデータセットが
ついた——答えは地味そのもので：工数はプロンプトではなくコンテキスト管理に注げ。範囲にも
注意：4 モデル、2 ベンチマーク、コード未公開。

[`🔗 arXiv:2609.20804`](https://arxiv.org/abs/2609.20804) · [`🔗 Hugging Face Daily Papers`](https://huggingface.co/papers)

---

## 30. FamousSparrow がバックドアを交換：ESET が 2025年8月 以降の中南米政府攻撃に SparroWocky を確認

- **Velocity:** ▮ steady
- **Source:** ESET WeliveSecurity · 9月17日
- **Tags:** `apt` `malware` `espionage`

ESET の報告によると、中国系 APT の FamousSparrow（Earth Estries/Salt Typhoon と重複、
2019年以降活動）が SparrowDoor に代わる未報告のモジュール型 C++ バックドア
**SparroWocky** を中南米の政府標的に展開している：メモリ内 COFF プラグインロード、
MinHook によるスレッド隠蔽、SilentMoonwalk 変種によるコールスタック偽装、Mbed TLS 経由で
プロキシされる TLS 通信。ESET は地域エスカレーションを、米国の中南米への関与拡大に対する
中国の反応と結びつけている。

**Why it matters:** スパイウェアの道具立てが、レッドチームツールがコモディティ化させた
回避プリミティブ（COFF ローダ、スタック偽装）の周りでプロ化しつつある、また一つの証拠。
ソース自身の限定語も：バックドアは開示時点で 1 年以上経過しており（「少なくとも 2025年8月」）、
Salt Typhoon との重複は帰属結論ではなく「ある程度の重複」と慎重に表現されている。

[`🔗 ESET WeliveSecurity`](https://www.welivesecurity.com/en/eset-research/beware-sparrowock-backdoor-bites-commands-catch/) · [`🔗 The Hacker News`](https://thehackernews.com/2026/09/china-aligned-famoussparrow-deploys.html)

---

## 31. Parallels Desktop のローカル特権昇格（CVE-2026-90894）：修正は Intel Mac にはインストールできないバージョンにしか存在しない

- **Velocity:** ▮ steady
- **Source:** JFrog 研究（9月14–15日）· THN 記事 9月16日
- **Tags:** `cve` `parallels` `macos` `lpe`

JFrog の Yuval Moravchick が発見：Parallels Desktop の root プロセス `prl_disp_service` が
ワールド書き込み可能なソケットで Listen し、任意のローカルピア資格情報を受け入れる。
`PrlSrv_InstallAppliance` に二重引用符を含む細工済み appliance パスを渡すと、root で実行される
`tar` に `--use-compress-program` を注入でき——root シェルが取れる（26.4.0 で確認）。
**CVE-2026-90894、CVSS 7.8——JFrog 自己評価（Secondary）。NVD レコードはまだ「Received」、
分析は未実施。** 影響バージョン：< 27.0.0。Parallels Desktop 27 で修正。

**Why it matters:** 醜いのはアップグレードパスだ：Parallels 27 は Intel Mac をサポートしないため、
26.x 系全ライン——現行の 26.4.2 を含む——が修正なしのまま悪用可能であり続ける。攻撃はローカル
限定（野外悪用の報告なし）だが、共有 CI/開発 Mac では「ローカル」は非常に低いハードルだ。

[`🔗 JFrog 研究`](https://research.jfrog.com/vulnerabilities/parallels-desktop-is-vulnerable-to-a-local-privilege-escalation-via-appliance-extract-argument-injection-cve-2026-90894/) · [`🔗 NVD レコード`](https://nvd.nist.gov/vuln/detail/CVE-2026-90894)

---

## 32. Flet 1.0：4年間の「Python 版 Flutter」が安定性の節目に到達

- **Velocity:** ▮ steady
- **Source:** Flet リリース（9月14日）· HN 73+ pts · 8時間前（~04:44 UTC+8）
- **Tags:** `python` `flutter` `cross-platform` `release`

Flet——Python アプリを Flutter ターゲット（iOS、Android、Web、デスクトップ）へコンパイルする
フレームワーク——が約 4 年を経て 9月14日 に v1.0.0 をリリース。16,856 スター、開発は活発
（9月18日 も push）。リリースは大規模で、率直に破壊的でもある：長年非推奨だった API の削除
（`app()`→`run()`、`ElevatedButton`→`Button`、`Page.go()`→`push_route()`）に加え、目玉機能の
**client actions**——ジェスチャーゲート付きハンドラで、iOS Safari でも元のタップの中でファイル
ピッカー・クリップボード・共有シートを、Python への往復なしに実行できる。

**Why it matters:** 本物の破壊的変更を伴う 1.0 は宣言だ：API がこれからは契約であると——そして
client actions は、サーバー駆動 UI フレームワークが通常解けないクラスのモバイルバグ（非同期
ジェスチャーのデッドゾーン）を直す。移行は必須。67KB のリリースノートには理由がある。

[`🔗 flet.dev`](https://flet.dev/) · [`🔗 github.com/flet-dev/flet`](https://github.com/flet-dev/flet) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49746290)

---

## 33. Skillsync（YC W26）が「AI チャット版 Pandoc」を発表——セッションがエージェント間を引っ越す

- **Velocity:** ▮ steady
- **Source:** Launch HN · 53+ pts · コメント52 · 12時間前（~00:22 UTC+8）
- **Tags:** `agents` `interoperability` `yc` `launch`

Skillsync の Launch HN の主張：AI チャットセッションがエージェントごとに閉じ込められるべきでは
ない。コーディングエージェントのセッション全体——メッセージ、推論、ツール結果——を
Claude Code・Codex・OpenCode・Cursor などの間で移動できる。オープンコアは
**skillsynchq/txcript**（Rust ライブラリ＋CLI＋WASM、Apache-2.0、crates.io/npm 登録）で、
セッション形式の変換レイヤー。その上に MCP による過去セッションの想起を載せる。

**Why it matters:** モデルが交換可能になった今、セッション形式が新しいロックインの媒介に
なってきている——「AI チャットの Pandoc」はその論理が指す相互運用ビジネスだ。HN の反論も
妥当で一般化できる：変換そのものは「自明に解決済み」で、守れるのはエージェント横断の
スキーマと検索レイヤーであり、それを囲む SaaS はクローズドソースだ。

[`🔗 Launch HN`](https://news.ycombinator.com/item?id=49743049) · [`🔗 github.com/skillsynchq/txcript`](https://github.com/skillsynchq/txcript)

---

## 34. Uber のリトライストーム算術：リトライは R^d で増幅する、だから最も深いサービスにエラーを所有させる

- **Velocity:** ▮ steady
- **Source:** Uber Engineering ブログ · HN 67+ pts · 7時間前（~05:14 UTC+8）
- **Tags:** `reliability` `microservices` `retries` `postmortem`

Uber のエンジニアリングブログ（9月17日）が 2025年11月 のインシデントを解剖：呼び出し
チェーンの 5 階層以上深いサービスが故障すると、ホップごとの素朴なリトライは R^d で増幅する。
修正は「エラー所有（error ownership）」——失敗している下流呼び出しを持たないサービスだけが
エラーを「所有」する——で、Service Dependency Analysis システムと `x-uber-error-claim`
ヘッダーで実装し、リトライをエラーを所有するエッジに限定する。結果：メッシュ全体で約 950万の
無駄なリクエストを停止。ユーザー向け API の最大リトライストーム半径は 25 から 3 へ。

**Why it matters:** リトライ予算が標準解であり、この記事はその限界自体を示している——それでも
劣化したサービスには 46–135% の追加トラフィックが乗る。限定語も誠実に書かれている：予算は
基本エラー率約 10% までしか効かず、高故障率では約 2% のエラーが誤って「非所有」扱いになり、
保証には少なくとも 1 ホップのリトライ設定が必要。

[`🔗 Uber ブログ`](https://www.uber.com/us/en/blog/protecting-against-retry-storms/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49746628)

---

## 35. Telstra の「2006年へのタイムリープ」障害を Netnod が解剖：GPS 週カウンターの 19.6年 ロールオーバーと、忘れられた 1 枚のカード

- **Velocity:** ▮ steady
- **Source:** Netnod ブログ · HN 24+ pts · 3時間前（~09:05 UTC+8）
- **Tags:** `gnss` `time-sync` `outage` `postmortem`

スウェーデンの国家標準時を配信する Netnod が、Telstra 委託の外部 TAP 調査に基づき 7月8日 の
モバイル網障害——通話・SMS・緊急通報・列車・決済端末——を再構成した：メルボルンの GPS 受信
カードは 2025年10月 に回避策として有効化され、2020年 のアップグレード以降ファームウェア更新が
なかったため、再起動時に年を 2006 と認識した（GPS の 10 ビット週カウンターは 1,024 週＝約 19.6年
ごとにロールオーバーし、電源が落ちたカードはエポックを失う）。対抗する stratum-1 もなく誤った
時刻を伝播させ、さらに 2020年 代に導入されたサイト横断のピアリングが「タイミングループ」を
作り、複数の時刻源が同じ誤りに収束した。

**Why it matters:** どの判断も単体では擁護可能だった——「プロトコルは動いた。アーキテクチャが
動かなかった」。2010年 頃以前に構築されたすべての GPS 設備は、いまや 1,024 週ロールオーバーの
射程内にある。「ファームウェアが古い眠ったノードが選挙に勝つ」と何が起きるかのテンプレートが
これだ。Netnod 自身の限定語：TAP 報告はピアリングを*なぜ*変更したのかを明らかにおらず、
その部分は作者の推論。

[`🔗 Netnod ブログ`](https://www.netnod.se/blog/telstra-outage-night-network-decided-year-was-2006) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49748957)

---

## 36. ZCode——Zhipu 純正のコーディングエージェントデスクトップアプリが、ワークスペース全体を Git 履歴ごと静かにアップロードしていた

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 83+ pts · 16 コメント · 6時間前（~10:35 UTC+8）
- **Tags:** `privacy` `supply-chain` `zhipu` `coding-agents`

ディスク容量を空けようとした研究者が、`~/.zcode` が 700MB 超に達していることを発見。
その中には 345MB のワークスペースに対する 564 回の失敗アップロードを示すメタデータ
付きの 313MB の `.enc` ファイルがあった。そこで Electron の `app.asar` をリバース
エンジニアリングし、フローを復元した：プロンプトのたびとタスク完了時に、クライアントは
`zcode.z.ai` から RSA 公開鍵と OSS 署名を取得し、ワークスペースを tar.gz にパックして
ローカルで暗号化し、Aliyun OSS へ直接 POST する。あるスナップショットの平文マニフェスト
（42,411 ファイル）では `.git` がペイロードの 86.6% を占める：LFS 資産 196MB、コミット
オブジェクト 102MB、未プッシュのブランチ名を含む reflog——さらに `.git/config` 内の
内部ホスト名や、後のコミットで削除済みのシークレットまで。RSA 秘密鍵はサーバー側に
あるため、作者曰くユーザーにもクライアントにも送信済みデータを復号する手段がない。
「体験の最適化」「Repo Snapshot Indexing」の 2 つの UI トグルでは収集は止まらず、
有効な JWT だけがゲートだ。同日公開された別の検証記事も中核の発見を裏付けている。

**Why it matters:** コーディングエージェントの信頼境界は、リポジトリ全体——履歴、
reflog、シークレット——を訓練インフラへ送るデスクトップアプリによって決められつつ
ある。留保もセットで：これは一人の研究者による一つのクライアントバージョンのリバース
であり、ベンダーの回答はまだなく、サーバー側の保持状況も未確認。「最適化プログラムは
デフォルトでオフ」というプライバシーポリシーの記述こそ、この発見が矛盾していると
みえる部分だ。

[`🔗 ferstar ブログ：リバースエンジニアリング検証`](https://blog.ferstar.org/en/posts/zcode-silent-workspace-snapshot-upload/) · [`🔗 tokenstead.ai：独立検証`](https://tokenstead.ai/guides/zcode-silent-git-history-upload) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49752422)

---

## 37. NYT 訴 OpenAI 訴訟の黒塗り解除資料：Microsoft 自身のデータで Copilot が NYT クリックスルーを最大 93% 減少と判明

- **Velocity:** ▮▮▮ trending
- **Source:** 新たに黒塗り解除された資料に基づく TechCrunch · HN 246+ pts · 175 コメント · 8時間前（~09:45 UTC+8）
- **Tags:** `ai-policy` `copyright` `litigation` `openai`

New York Times の OpenAI・Microsoft に対する著作権訴訟で、新たに黒塗りが解除された資料
（証拠書類の多くは依然非公開）から、2023–24 年の内部発言が明らかになった：Microsoft
Applied Science ディレクターの Brent Hecht はウェブスクレイピングを「人類史上最大の
労働の窃盗」と呼び、Copilot が通常の Bing 検索比で NYT クリックスルーを最大 93% 減らす
という Microsoft 自身のデータを受けて、LLM 事業のコンテンツサプライチェーンへの
「ドゥームループ」を警告していた。ChatGPT 責任者の Nick Turley はチャットボットによる
代替を出版社への「実存的脅威」と述べ、Satya Nadella は宣誓証言でチャットボットが一次
ソースへの訪問を代替すると認め、有料コンテンツでの訓練を知っていれば再訓練を要求した
だろうと述べた。資料は Bing インデックス由来のスクレイピング、ペイウォール回避の
戦略、著作権表示の除去も主張しており、中間訓練データからは 91,692+ 部の出版社作品の
コピーが見つかっている。

**Why it matters:** これは原告側の最も強い証拠——被告自身の社員が代替による害を記録して
おり、フェアユース防御はこれを吸収しなければならない。報道に必須の文脈：裁判所は
「訓練＝フェアユース」で全体的にまだ AI 企業側についており、政権も最近 OpenAI の立場を
支持する意見書を提出している。

[`🔗 TechCrunch`](https://techcrunch.com/2026/09/17/microsoft-exec-called-ai-scraping-the-largest-theft-of-labor-in-human-history-new-unredacted-filings-reveal/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49752056)

---

## 38. OpenJev：コミュニティが Jev の主張をブラウザ内・3090 一枚でローカル検証

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 177+ pts · 96 コメント · 7時間前（~09:42 UTC+8）
- **Tags:** `open-source` `replication` `inference` `wasm`

OpenJev（TheoLeeCJ/openjev、1.4k スター、MIT、今朝もプッシュ）は「Jev のようなものを
家の 3090 で動かせるか？」を問うブラウザ完結型の再現実験だ。wllama（WASM 版 llama.cpp）で
Qwen3 0.6B、MiniCPM5 2B、Qwen3.5 4B をピン留めした GGUF ビルドで実行。バックエンド
なし、入力はページ外に出ない。同じロード済みモデルからの 2 つの読み出し経路——選択肢の
logits を直接読むか、モデルに確率を JSON として生成させるか——を比較する。結果：4B
モデルは 84.5% TypeSafe。9月16日 に取り上げたホステッド Jev の 88.3% には届かない。
ページはこれを率直に示し、留保も併記する：スコアは表示選択肢上の softmax であって
較正された信頼度ではなく、量子化版は Jev の BF16 とは異なる。

**Why it matters:** 議論のあるベンダー主張を決着させる最短ルートは、数字を公開した
ローカル再現だ——そしてこのプロジェクトは「同等」ではなく自分の劣後を公開した。Jev
公開から 2 日で、「40-400 倍安い」というフレーミングに、誰もが実行できるコミュニティ
検証の参照点ができた。

[`🔗 openjev.com`](https://openjev.com/) · [`🔗 github.com/TheoLeeCJ/openjev`](https://github.com/TheoLeeCJ/openjev) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49752041)

---

## 39. FEX-Emu による x86-TSO 徹底解説：エミュレーションが遅くなる本当の理由をコア別に実測

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 173+ pts · 35 コメント · 5時間前（~12:09 UTC+8）
- **Tags:** `emulation` `arm` `memory-model` `performance`

FEX-Emu チーム（Snapdragon 上の Linux ゲーミングを支えるユーザーモード x86-on-ARM
エミュレータ）が「災厄」を解説した：ARM の緩いメモリモデル上で x86 の Total Store
Ordering を再現すること。コア別マイクロベンチが詰まった投稿の発見：LRCPC の
acquire-load は Apple のハードウェア TSO トグル（M1 でストアスループットの約 24% を
犠牲）に比べれば「絆創膏」にすぎない。非アライメントアクセスの penalty は Cortex-X4 で
約 50%、Oryon-3 のロードで約 70%。64 バイト境界を跨ぐ split-lock は Zen で約 660ns、
インラインアトミックは 1.44ns（約 458 倍）。最良の ARM ですらアライメント済みアトミック
は x86 の約 3 倍遅い。そして決定打は非キャッシュメモリ：ライトコンバインのストア帯域は
Zen 比 最大 816 倍劣化し、Silksong などのゲームは PCIe-GPU ボードで 1 FPS 未満になる。

**Why it matters:** x86 ゲーム資産を走らせたいすべての ARM チップにハードウェア TSO
トグルとコヒーレントキャッシュライン設計が必要だという工学的論証だ。限界も自己申告
されている：split-lock のエミュレーションはベストエフォートでデータを引き裂き得る、
提案する修正は「ハードウェア設計者ではない」エミュレータ作者によるもの、数値は FEX
自身のマイクロベンチであってエンドツーエンドのゲームフレームレートではない。

[`🔗 FEX-Emu ブログ`](https://fex-emu.com/Scourge-of-emulation/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49750094)

---

## 40. Thomas Ptacek：「How to Write with an LLM」——校正者としては使え、代筆者にはしない

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 200+ pts · 126 コメント · 10時間前（~07:48 UTC+8）
- **Tags:** `writing` `technique` `llm` `community`

Thomas Ptacek（sockpuppet.org）が LLM と書く方法を発表した：自分で草稿を書き、モデルは
あくまで校正者として使う。ルール1：「LLM が提案した言葉を一つも使ってはならない」——
モデルは雑誌見出しのトーンで書き、声を平たんで均してしまう。「読者は LLM の言葉を
1 兆分の数 ppt の精度で嗅ぎ分ける」。ルール2：励ましを禁じる。反射的な褒め言葉は、
本来書き直すはずだった弱い初稿の直感を温存させる。彼のワークフロー：モデルに機械的
な欠点（受動態、つなぎ言葉、重複表現）を列挙させ、該当箇所を自分で書き直し、文脈なしの
別のモデルにどちらの版が良いか判定させる。Codex や Claude といったコーディング CLI に
編集プロンプトを流す小さな HTMX/SQLite のワークショップツールも公開した。

**Why it matters:** 今月いちばく引用されている「LLM 時代の執筆」論文が、ライティング
指導者ではなくセキュリティエンジニアから出た——しかもそのルールは審美的でなく
実行可能だ。自覚的な脚注も持って帰る価値がある：GPT-5 はこの記事を 20% 長すぎと判定し
「たぶん正しい」——彼はそれでもそのままにした。

[`🔗 sockpuppet.org`](https://sockpuppet.org/blog/2026/09/17/how-to-write-with-an-llm/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49747070)

---

## 41. RustFS が 32.9k スターでトレンド上位——Apache-2.0 の MinIO 代替がリリースを続ける

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · +559 スター/日 · 今朝 1.0.1-preview.5 をリリース
- **Tags:** `storage` `rust` `s3` `self-hosted`

Rust 製の S3 互換分散オブジェクトストア RustFS は、本日の最速成長インフラリポジトリ
（+559 スター/日、32.9k）で、今朝も新しいプレビューリリース（1.0.1-preview.5、3 日で
3 個目）を出した。README は MinIO を明示的に意識する——「MinIO のシンプルさ + Rust の
メモリ安全性」——そして AGPL にも：「寛容な Apache 2.0」対「制限的な AGPL v3」、さらに
MinIO のテレメトリ（「許可のない国境越えデータ送信を防止」）への一撃。互換性マトリクス
では S3 コア・バージョニング・オブジェクトロック・SSE・IAM が利用可能、S3 Tables
（Iceberg REST）と MinIO ディスク形式互換はプレビュー。最近のリリースでは KMS
（Vault/AWS）、Entra ID OIDC ロールマッピング、プール拡張/退役が追加された。

**Why it matters:** MinIO の AGPL 転換とテレメトリ姿勢が空位を作り、RustFS はその
最大の挑戦者だ。しかもリリースが速く、「preview」タグがこの話で最も正直な部分に
なっている。細部に注意：README の性能セクションは RAM 4GB での自己公開ストレステスト
と比較動画であって、再現可能なベンチマークではない。

[`🔗 github.com/rustfs/rustfs`](https://github.com/rustfs/rustfs) · [`🔗 リリース`](https://github.com/rustfs/rustfs/releases)

---

## 42. Waymo がシンガポール進出を発表——来年マッピング開始、2027 年規制承認、2028 年営業運行

- **Velocity:** ▮ steady
- **Source:** Waymo 発表 · HN 112+ pts · 129 コメント · 5時間前（~11:49 UTC+8）
- **Tags:** `autonomous-vehicles` `waymo` `industry`

Waymo はシンガポールにロボタクシーサービスを持ち込む：「全地域」での手動マッピングと
検証走行を来年開始、2027 年に陸上交通庁（LTA）へ自動運転システムの承認を申請する意向、
2028 年の営業サービス開始を目標に、運輸省および LTA と連携する。発表は米国での実績
（公道 3 億 km 超、15 都市超、負傷事故 94% 減と主張）を強調し、シンガポールをロンドン・
東京の準備リストに加えた。

**Why it matters:** シンガポールは民間ロボタクシー車両が運行する市場としてこれまでで
最も高密度で公共交通指向——米国の郊外とはまったく異なるストレステストだ。タイムラインは
正直に読む：2028 年は「意向」とされ、まだこのドライバーを評価していない規制当局の
承認が前提だ。

[`🔗 Waymo: Waymo in Singapore`](https://waymo.com/waymo-in-singapore/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49749981)

---

## 43. Jemalloc 5.4.0：インターネットの半分を支えるアロケータが 160 コミットの「技術的負債返済」リリース

- **Velocity:** ▮ steady
- **Source:** GitHub リリース（9月17日）· HN 194+ pts · 54 コメント · 5時間前（~12:20 UTC+8）
- **Tags:** `memory-allocator` `c` `release` `infrastructure`

Firefox、Redis、FreeBSD そして無数の C/C++ サービスに組み込まれているアロケータ
Jemalloc が、9月17日 に 5.4.0 をリリース：160+ コミットが技術的負債の清算、リファクタ、
バグ修正、テストカバレッジ、オプション整理に集中し、移植性の改善と、HugeTLB ページなど
再回収不能なマッピングをピン留めする新しい `EXTENT_ALLOC_FLAG_PINNED` フックも追加。
前版 5.3.1 は 2026年4月（390+ コミット）——2022–2025 の静かな時期を経て、このプロジェクト
は異例なハイペースで動いている。

**Why it matters:** これほど多くを支える依存がリリースするとき、「目玉機能がない」こと
こそが要点だ——クリーンアップとオプション削除こそが、ピン留めされた本番ビルドを壊す
ものだから。Redis/FreeBSD クラスのスタックでアロケータバージョンを追っている運用チームは、
次のロールアウトの前にオプション整理リストを読むべきだ。

[`🔗 Jemalloc 5.4.0 リリース`](https://github.com/jemalloc/jemalloc/releases/tag/5.4.0) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49750152)

---

## 44. 「Infinite-Parameter LLMs」：ハイパーネットワークが実データから重みを「コンパイル」する——現時点では評価プロトコルまで

- **Velocity:** ▮ steady
- **Source:** Hacker News · 148+ pts · 39 コメント · 17時間前（~00:55 UTC+8）
- **Tags:** `research` `hypernetworks` `architecture` `paper`

「Infinite-Parameter LLMs」（arXiv:2609.18842、Hernández-Lobato グループ、Cambridge）は
固定のパラメータバンクを置き換えることを提案する：コンパクトなハイパーネットワークが
実行時データを共有基底ネットワークの低ランク変調に変え、生成器の潜在コードについて
オンラインで更新されるベイズ的信念を保持する——つまり実効的な重みはストレージから読む
のではなく、セッションごとに再導出される。主張される利点：固定のモデルフットプリントで
「実質無限」のコンパイル可能な重み空間、償却された計算、文脈ウィンドウの解放、ターン間の
永続性。

**Why it matters:** これは重み生成の方向性（weight-space 学習）を論理的帰結まで押し進めた
もので、正直さはアブストラクトそのものにある：**実験数値は一切報告されていない**。
出てきたのは「まさにこれを in-context learning と検索に対して試す評価プロトコル」だ。
結果としてではなく、研究上の賭けとして扱うべきだ。

[`🔗 arXiv:2609.18842`](https://arxiv.org/abs/2609.18842) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49743483)

---

## 45. NVIDIA の SoL-Pi：RSI をハーネス工学に応用——トークン交通量を 45-49% 削減（自己申告）

- **Velocity:** ▮ steady
- **Source:** Hugging Face Daily Papers · #2、38 票（9月18日 バッチ）
- **Tags:** `agents` `harness` `rsi` `paper`

SoL-Pi（arXiv:2609.20519、Song Han、Ligeng Zhu、Enze Xie ら NVIDIA 系の著者）は再帰的
自己改善をハーネス層に適用する：自動研究ループを多様化する環境群へスケールし、候補改善は
選択されて初めて保持される——最終的に 4 つの機構が生き残った（アクション実行、コンテキスト
圧縮、観測処理、委任読み取り）。51 タスクの EdgeBench での主張：GPT-5.6 Sol と Opus 5 で
Pi ハーネスと同等の精度を保ちながら、記録されたトークン交通量を 44.7–49.0% 削減、API
コストは約 1/3、Pi 比で時給 $4.36–$5.71 相当の節約。

**Why it matters:** 再帰改善の波は研究発見ループ（Agora、Dream-RSI）からエージェントの
配管へ移り、選択圧が編集を行う。スコープはアブストラクトの名詞に書かれている：単一の
51 タスクベンチ、「recorded」の交通量、節約額は「estimated」——第三者による再実行は
まだない。

[`🔗 arXiv:2609.20519`](https://arxiv.org/abs/2609.20519) · [`🔗 Hugging Face Daily Papers`](https://huggingface.co/papers)

---

## 46. 「When EOS Tokens Disagree」：on-policy 蒸留が生徒を冗長にするのは、教師と生徒の「止まり方」が違うから

- **Velocity:** ▮ steady
- **Source:** Hugging Face Daily Papers · #3、32 票（9月18日 バッチ）
- **Tags:** `distillation` `training` `research` `paper`

「When EOS Tokens Disagree」（arXiv:2609.20511、UNC SciML、コード公開）は、on-policy
蒸留で生徒の応答が長くなり生成予算を使い果たする理由を診断する：**終端トークンの不一致**
——Qwen3、Llama、Gemma の 3 ファミリーすべてで、基底の生徒と後訓練された教師は、宣言上の
停止集合が同一であっても、異なる EOS トークンに停止確率を置いている。これは生徒自身の
終端行動を抑えつつ、教師のそれを確実には移さない。機能的に等価な EOS トークンを同じ
「意味的停止アクション」として扱うと、3 ファミリーすべてで長さ膨張が大幅に緩和された。

**Why it matters:** 冗長なエージェントは直接のコスト要因（上の SoL-Pi が存在する理由の
一部は、蒸留が膨らませたものの圧縮だ）であり、これが機構的で修正可能な原因を与えた。
著者自身の限界線：終端の不一致は「重要だが網羅的ではない」——整合後も訓練後期特有の
長さ膨張が残る。

[`🔗 arXiv:2609.20511`](https://arxiv.org/abs/2609.20511) · [`🔗 github.com/UNCSciML/opd-eos`](https://github.com/UNCSciML/opd-eos)

---

## 47. Anki 26.09：間隔反復アプリの定番がセキュリティ修正をリリース——ローカルファイル読み取りとデッキ経由のファイル実行

- **Velocity:** ▮ steady
- **Source:** GitHub リリース（9月14–15日）· トレンドで +430 スター/日
- **Tags:** `security` `release` `desktop-apps` `anki`

Rust 製の間隔反復アプリ Anki（31k スター）が、9月14日 に 26.09、9月15日 に 26.09.2 を
リリース——両版とも「⚠️ できるだけ早くアップグレードを」と明記。セキュリティ修正：
ノートがエディタで表示された際にローカルファイルを読み取れる問題、エディタの「画像を
開く」コンテキストメニューが拡張子を検証せず、共有デッキが一部のシステムで危険な
ファイルを実行できた問題。26.09.2 ではデッキ説明内の外部リンクが概要ページを操作できる
問題と Windows の起動クラッシュも修正。またレガシーの `anki.importing`/`anki.exporting`
モジュールを削除し、一部アドオンが動かなくなる。

**Why it matters:** 共有デッキは誰も監査しないサプライチェーンだ——デッキはデータで
あり、このリリースはそれを信頼されたものとして扱うのをやめた。3000 万ユーザークラスの
アプリが「デッキ経由のファイル実行」を静かに修正するのは、CVE を取れないままupgrade
に値するデスクトップアプリセキュリティ話の典型だ。

[`🔗 Anki 26.09 リリースノート`](https://github.com/ankitects/anki/releases/tag/26.09) · [`🔗 github.com/ankitects/anki`](https://github.com/ankitects/anki)

---

## 48. ByteShape の ShapeLearn 量子化で Qwen 3.8 27B が 16 GB カードに載る——ベンダー自己ベンチ、方法論は公開

- **Velocity:** ▮ steady
- **Source:** Hacker News · 77+ pts · 15 コメント · 7時間前（~10:04 UTC+8）
- **Tags:** `quantization` `gguf` `inference` `local-llm`

ByteShape（トロント）が Qwen 3.8 27B の完全な ShapeLearn GGUF 量子化ランを公開：
IQ2_XXS（2.56 bpw）から IQ4_XS（3.84 bpw）までの 5 段階を、RTX Pro 6000 から
RTX 4080/5060 Ti まででテスト——GPU-4 ティアは 11.0 GB に収まり、16 GB カードを狙う——
さらに組み込み MTP ドラフトヘッドか 1.1 GB の外部 DFlash2 ドラフトモデルによる
投機的デコーディング。スコアは BF16 ベースラインで正規化し、instruct（GSM8K、IFEval、
MMLU、LiveCodeBench V6）と thinking（BFCL V4、ACEBench）の両スイートを llama.cpp
b10430 で実行。

**Why it matters:** コンシューマ GPU の量子化カルチャーは、かつての雰囲気に代わって
KLD ダイバージェンスの忠実度カーブを公開するようになった。この投稿は免責も正しい位置に
置いている：ベンダーの自己ベンチであること、投機的デコーディングのプロットは「デコード
方式間の品質同等性を独立には立証しない」こと、Bartowski の新しい量子化はテスト後の
ものであること、そして VRAM 収まりはコンテキスト長とサービング設定次第であること。

[`🔗 byteshape.com：ShapeLearn Qwen 3.8 27B`](https://byteshape.com/blogs/Qwen3.8-27B/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49749393)

---

## 49. TSMC の A14 ノード詳細が IEDM セッションで判明：SRAM セル 0.017μm² 未満、2028 年量産

- **Velocity:** ▮ steady
- **Source:** IEDM 2026 プログラム · HN 114+ pts · 47 コメント · 2日前（9月16日）
- **Tags:** `semiconductors` `tsmc` `hardware`

IEDM 2026 のセッション公示（12月14日、サンフランシスコ）が TSMC の A14 プラットフォーム
論文を明らかにした：NanoFlex Pro プラットフォーム上の第 2 世代ナノシートトランジスタ、
「世界最小の SRAM、セルサイズ <0.017μm²」、N2 比で速度 +10–15%、消費電力 -25–30%、
密度 +約 20%——さらに TSV 対応、4.5μm の SoIC ボンディングピッチ、そして「2028 年量産
が順調に進行中」。

**Why it matters:** ポスト 2nm の AI シリコンの日程はすべて A14 ノードを基準に組まれて
いる。SRAM セルの数値がヘッドラインなのは、SRAM スケーリングこそが推論アクセラレータの
オンチップキャッシュを制約するからだ。ただしこれはシリコンではなくセッション要旨——
数値は TSMC 自身のもので、IEDM 論文は歴史的にほぼ主張の範囲内に収まってきたが、2028 年
量産はあくまでスケジュール主張だ。

[`🔗 IEDM 2026 Session 3-2`](https://iedm26.mapyourshow.com/8_0/sessions/session-details.cfm?scheduleid=331) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49714096)

---

## 50. 締め切り当日：攻撃に悪用されている Chrome の V8 ゼロデイ、連邦機関のパッチ時計が今日尽きる

- **Velocity:** ▮ steady
- **Source:** CISA KEV カタログ · 締め切り 2026-09-18
- **Tags:** `cve` `chrome` `v8` `kev`

CVE-2026-85046——細工されたページで Chrome サンドボックス内コード実行を許す V8 の型混同、
Chrome 152.0.7977.82 で修正——は 9月4日 に CISA の KEV カタログに追加され、本日
（9月18日）が BOD 26-04 の下で連邦機関の修復締め切りだ。Google はこれを 2026 年で 6 件目の
悪用されている Chrome 脆弱性として修正済み。**CVSS 8.8（Google による採点、NVD は
「Analyzed」）**——critical ではなく high だが、KEV に入ったのはスコアのためではなく、
実際に使われているからだ。

**Why it matters:** 採点の教訓がまた繰り返される：悪用されている 8.8 は、悪用されていない
10.0 より優先される。パッチの優先順位を動かすのは CVSS の帯域ではなく KEV の締め切りだ。
Chromium 埋め込み側（Edge、Opera、Electron アプリ）は独自のリリースサイクルで修正を
継承する——特に Electron アプリは Chrome から数週間遅れる。

[`🔗 CISA KEV カタログ`](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) · [`🔗 NVD レコード`](https://nvd.nist.gov/vuln/detail/CVE-2026-85046)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-09-18T20:25:00+08:00 |
| Items | 50 |
| Sources tracked | 38 (Hacker News, GitHub Trending, HF Daily Papers, arXiv, Hugging Face, NVD, CISA KEV, ベンダーアドバイザリ, ベンダーブログ, セキュリティ報道) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (1日3回) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |
