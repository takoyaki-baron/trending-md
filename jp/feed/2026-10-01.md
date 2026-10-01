---
date: 2026-10-01
updated: 2026-10-01T20:22:00+08:00
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 42
license: CC-BY-4.0
---

## 1. Gemini 4 Argon 発表：フロンティアのコーディング/エージェントモデルはまず「信頼されたサイバー防御者」へ——しかも彼らにはサイバーガードレールなしで

- **Velocity:** ▮▮▮ trending
- **Source:** Google · HN 205+ pts（#1） · 約0時間前 (~04:04 UTC+8)
- **Tags:** `google` `gemini` `model-release` `cybersecurity`

Google DeepMind が **Gemini 4 Argon** を発表（9月30日、Koray Kavukcuoglu）。「実世界のソフトウェアエンジニアリング、法律・金融などのエンタープライズナレッジワーク、サイバーセキュリティ防御」に向けたフロンティアモデルで、「重大なソフトウェア脆弱性を自律的に発見・検証・パッチできる」。**まだ GA ではない**：「Fairwind Program を通じて信頼されたサイバー防御者に展開中」であり、Google は「米政府のリリース前モデルアクセスに関する自主プロセスに積極的に参加」。価格は**提供開始前に**発表：紹介価格で入力 $2/100万、出力 $10/100万トークン（脚注により紹介期間終了後は $4/$20 に倍増）、キャッシュ入力は95%オフ、出力トークン上限は「従来の64Kから業界最高水準の1Mへ」。Google 自己選定のベンチマーク：DeepSWE v1.1 77.9%、Zapier AutomationBench 1位（51.3%）、CWE-bench v1 同率1位（68%）。デュアルユース文は極めて明示的：**「信頼された防御者と Google 内部チーム向けには、サイバーガードレールなしで Argon をリリースします。フロンティアレベルのサイバー防御能力をフルに活用できるようにするためです。」**

**Why it matters:** 本 feed が3週間前に GLM-5.3 のフロンティア迫るサイバー能力と約 $1,200 で剥がせる拒否メカニズムを報じたばかりだが、Google は同じ取引を製品ティアとして制度化しつつある——承認された内部グループ向けのガードレールなしサイバーモデルを、部外者が評価できる前に価格設定して。全ベンチマークが Google 自己選定・パートナー報告で、公開数時間のモデルに独立評価はゼロ——そして段階的リリース自体が「能力の問いにまだ答えが出ていない」という自白だ。

[`🔗 Google ブログ`](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49913571)

---

## 2. 「AIレースは気まずくなった」——西側ラボが DeepSeek の KV-cache 路線を密かに採用した証拠は、彼ら自身の値下げだとする論考

- **Velocity:** ▮▮▮ trending
- **Source:** insufferable.dev · HN 354+ pts · 約4時間前 (~23:50 UTC+8)
- **Tags:** `deepseek` `kv-cache` `analysis` `pricing`

本日の最速の議論（約77 pts/時間）は、「蒸留」という枠組みが時代遅れになったと論じるエッセイ。中国のラボはレシピを**公開している**：DeepSeek の MLA（約15倍の KV-cache 圧縮）は「Compressed Sparse Attention」へ進化し、その後継は DeepSeek-V4.1-Flash で **890 バイト/トークンのグローバル KV cache**（長時間コーディングセッションで DeepSeek-V1 の約437倍）に達したという。西側ラボの採用を示す証拠は**価格からの推論**：キャッシュ読み取り価格のフロンティア全体での値下げ——Opus 5.5 は Opus 5 比 −60%、GPT-6.1 Sol は GPT-5.6 Sol の7月末価格比 −80%——を「大きな宣伝もない静かなリリース」と読む。**本 feed が必ず付ける留保（10月1日、その場で訂正）：**以前の版では DeepSeek のスペック数値はこのブログにしか存在しないとしていた——この「不在」判断は誤りだった：DeepSeek 本家が V4.1-Flash のモデルページで「890 バイト/トークン」を公表している（本 feed は 9 月 10 日に報済み。[HF、MIT](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash)）。スペックはベンダー公開済み。著者の推論のままであるのは「アーキテクチャが採用された」という主張の方——キャッシュ読み取り価格の崩落は実在の観測値だが、価格は共有制約の証拠であって、ベンダーの声明ではない。

**Why it matters:** その根拠となる観察可能な事実——四半期内での全フロンティアベンダーによるキャッシュ読み取り価格の崩落——は本物で、エージェント経済学のコスト構造を静かに塗り替えている（長コンテキストエージェントの死命を制すのはキャッシュ読み取り料率だ）。しかしメカニズムはアーキテクチャ報道の皮を被った価格推論であり、本 feed の教訓通り、留保は本文だけでなく結論行に書くべきものだ。

[`🔗 insufferable.dev`](https://insufferable.dev/posts/the-ai-race-just-got-awkward/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49910553)

---

## 3. CVE-2026-76504：Cisco SD-WAN Manager の未認証管理者乗っ取り——CVSS 9.8、アドバイザリ公開の当日に CISA KEV 登載

- **Velocity:** ▮▮▮ trending
- **Source:** Cisco PSIRT / CISA KEV · CVSS 9.8 · 約7時間前 (~21:17 UTC+8)
- **Tags:** `cve` `cisco` `kev` `network-security`

未認証のリモート攻撃者が、URI エンコーディング（CWE-177）経由で Cisco Catalyst SD-WAN Manager の認証ルールをバイパスし、API セッション管理への**管理者レベル**アクセスを得られる。**CVSS 9.8 CRITICAL——Cisco PSIRT による評価**（NVD レコードでは psirt@cisco.com の Secondary メトリックとして出現）、CISA の ADP エンリッチメントは悪用を**アクティブ**、自動化**可能**、技術的影響**完全**とフラグ付け。アドバイザリ（9月30日 13:00 GMT 公開）は**回避策なし**。修正リリースは 20.9.10.1、20.12.8.2、20.15.6.1、20.18.4.1、26.1.2.1、26.2.1——20.9 未満は移行が必要。KEV カタログにはアドバイザリと**同じ9月30日**に登載された。

**Why it matters:** アドバイザリから KEV まで1日未満は、悪用が予測でなく観測済みであることを意味する——インターネットに露出した全 SD-WAN Manager は「パッチ最優先」のトリアージ対象であり、本 feed が2週間で記録した4件目のルーター/集約装置クラス乗っ取りだ。

[`🔗 Cisco アドバイザリ`](https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-sdwan-webauth-xr8beuuU) · [`🔗 CISA KEV`](https://www.cisa.gov/known-exploited-vulnerabilities-catalog?field_cve=CVE-2026-76504) · [`🔗 NVD`](https://nvd.nist.gov/vuln/detail/CVE-2026-76504)

---

## 4. 「DIVD は AI エージェントでハッキングされた」——その自らの侵害開示が Zammad ヘルプデスクの RCE チェーンを掘り起こした

- **Velocity:** ▮▮ rising
- **Source:** DIVD CSIRT · CVSS 9.4 ×2 · 約1日前 (Sep 30 UTC)
- **Tags:** `cve` `helpdesk` `ai-agents` `disclosure`

他人の脆弱性を探す側のオランダ脆弱性開示研究所（DIVD）が、自組織の侵害を開示した（「DIVD got hacked through AI agents」、ケース DIVD-2026-00014）。その調査で、運用する Zammad ヘルプデスクに2件の脆弱性：**CVE-2026-102489**（セッションハイジャック → `zammad` ユーザーとしての RCE。6.3.0–6.5.4 に影響、7.0.0–7.1.3 には存在するが「環境条件により悪用不可」）と **CVE-2026-102490**（`zammad` → root へのローカル権限昇格。DIVD によれば **v1.5.0〜v7.1.0-alpha** に影響——開示時点の最新 alpha を含む全バージョン）。両方とも **CVSS 9.4（CVSS v4.0）、DIVD 自身の CSIRT が評価**——NVD レコードでは CNA スコアのない Secondary メトリック。DIVD の助言：「Zammad 7 にアップグレードするか、オフラインに」、加えて侵害確認スクリプトを公開。修正状況を正確に言えば：DIVD は root 昇格の**明示的な修正リリースを挙げておらず**、10月1日時点で Zammad の GitHub セキュリティアドバイザリページには**両 CVE ID の公告がない**（可変情報——最新の GHSA は8月25日バッチ、7.1.3 で修正）。

**Why it matters:** 本 feed が記録する最初の「ある組織の AI エージェント侵害が、広く展開された OSS の RCE チェーン発見につながった」開示だ——しかも評価者は被害組織自身の CSIRT。「誰がスコアを付けたか」の規則通り、この9.4は最も正確である動機を持つ側からの数字だ。

[`🔗 DIVD-2026-00015`](https://csirt.divd.nl/cases/DIVD-2026-00015/) · [`🔗 DIVD-2026-00014`](https://csirt.divd.nl/cases/DIVD-2026-00014/) · [`🔗 Zammad セキュリティアドバイザリ`](https://github.com/zammad/zammad/security/advisories)

---

## 5. EDG の C++ フロントエンドが公開——業界最後のクローズドな本番コンパイラフロントエンドが9月30日にオープンソース化

- **Velocity:** ▮▮ rising
- **Source:** edgcpp.org · HN 40+ pts · 約1日前 (Sep 30 UTC)
- **Tags:** `cpp` `compiler` `open-source` `cplusplus-alliance`

「2026年9月30日、EDG の C++ フロントエンドのソースが公開され、The C++ Alliance が非営利の拠点となります。」EDG 自身のサイトは30年の歴史を込めて、それを「唯一無二の production-quality な source-to-source エンジン」と呼び、商用コンパイラと IDE ツール群に長年組み込まれてきたフロントエンドだ（オープンソース化は Herb Sutter の2025年11月 Kona 旅行レポートで予告済み）。そのモデル：**3つのトラック、1つのコードベース**——コミュニティの PR、Alliance の EDG エンジニアによる常時公開のメンテナンス、共同出資の機能開発——そして「先行アクセスは誰にも与えない」。リポジトリは実在し中身もある：`edgcpp/compiler`（9月22日作成）には `src/`、`lib_src/`、ヘッダー、テスト、CMake、ライセンスの完全なツリーがある。

**Why it matters:** Clang は2つ目のオープンなフロントエンドが存在しうると証明した。EDG は最後の主要な**クローズド**フロントエンドであり、ほとんどの開発者が使っていると知らない製品の中で静かに標準準拠を担ってきた。非営利拠点と公開の貢献パスは、ライセンス関係をコモンズに変え、標準準拠のリファレンス実装に単一企業のロードマップに依存しない存続パスを与える。

[`🔗 edgcpp.org`](https://edgcpp.org/) · [`🔗 edgcpp/compiler`](https://github.com/edgcpp/compiler)

---

## 6. Launch HN：Magnitude（YC S25）——実行ハードウェアに合わせてカーネルを自己最適化する推論エンジン

- **Velocity:** ▮▮ rising
- **Source:** Launch HN · HN 83+ pts · 約2.5時間前 (~01:37 UTC+8)
- **Tags:** `inference` `rust` `local-llm` `agents`

Magnitude は自己最適化するローカル推論エンジンをオープンソース化した（Rust、Apache-2.0、5.6k★、9月30日push）：モデル実行前にカーネルを**実デバイス上で実ハードウェア向けにチューニング**（創業者曰くダウンロードごと約1分）、「llama.cpp 比べ最大2倍高速：Metal でデコード92%高速化、CUDA で19%」、「エージェントあたりメモリ27%削減」を主張し、Pi・OpenCode・Hermes・Codex へのワンクリック接続に対応。**留保は創業者自身のスレッドから：**ヘッドラインのベンチマークは「単純な文章反復タスク……最大64kコンテキストの Moby Dick……最後のセクションを繰り返す」で、MLX との比較は「大まかなベンチマーキング」、厳密な数値は「もうすぐ」。

**Why it matters:** エージェントスタックはローカルへ drift しつつあり、ハードウェアごとのカーネルチューニングはエッジで小さな決定モデルを安価にサーブする方法だ——だが「最大2倍」が文章反復で測られたものなら、厳密な数値が届くまで割り引くべき主張というのが本 feed の常だ。

[`🔗 HN 議論`](https://news.ycombinator.com/item?id=49911995) · [`🔗 magnitudedev/magnitude`](https://github.com/magnitudedev/magnitude)

---

## 7. CPython CVE-2026-19445：`sni_callback` 経由の Use-After-Free——CVSS 9.2、修正は main にマージ済み、リリース済みパッチはまだ無い

- **Velocity:** ▮▮ rising
- **Source:** Python CNA · CVSS 9.2 · 約1日前 (Sep 30 UTC)
- **Tags:** `python` `cve` `tls`

サーバーの `sni_callback` が `SSLSocket.context` を再代入し、接続のライフタイム中に元の SSLContext を固定する何もない場合、リモートの未認証 TLS クライアントがサーバーをクラッシュさせられる——または解放済みポインタ経由の呼び出しを誘発できる。**CVSS 9.2（CVSS v4.0、Python CNA による評価）**、CWE-416。TLS クライアントは影響を受けない。公式の緩和策は1行のエンジニアリング規律：`sni_callback` を設定したすべての SSLContext への参照を、サーバーのライフタイム中保持すること。修正（PR #158504）は9月30日に **main へマージ済み**——だが CVE レコードは影響範囲を **3.16.0 未満のすべて**と列挙し、つまり10月1日時点でリリース済みの修正バージョンは特定されていない（可変情報：バックポート入りのポイントリリースはいつでも出る可能性がある）。同日に姉妹公告も：CVE-2026-19553（7.6——`wrap_bio()` が `server_hostname` なしでホスト名検証を静かにスキップ）。

**Why it matters:** 標準ライブラリの TLS メモリ安全性バグに「マージ済み・未リリース」の窓が重なると、脆弱なサービスを外部から列挙できる時間が生まれる。緩和策は grep 1回で確認できる——Python で SNI ルーティングを動かす全員にとって、これは今日中の監査項目だ。

[`🔗 python.org security-announce`](https://mail.python.org/archives/list/security-announce@python.org/thread/QMQIUQB6WGGC3MI7I3WKQXOYOBDSPPS3/) · [`🔗 cpython PR #158504`](https://github.com/python/cpython/pull/158504)

---

## 8. GRAFT：全ロールアウトが失敗したら、ライバルのを借りる——RLVR のためのモデル間トラジェクトリ交換

- **Velocity:** ▮▮ rising
- **Source:** arXiv / HF Papers · HF デイリー最高得票 · 約1.5日前 (Sep 29)
- **Tags:** `rlvr` `training` `paper` `kaist`

KAIST + AITRICS が RLVR の静かな計算の吹き溜まりを狙う：プロンプトの GRPO ロールアウトグループが全滅すると、アドバンテージ推定が崩壊する。GRAFT は代わりに**異種のピアモデル**のロールアウトグループを off-policy 補正付きで差し込む——「3つの異種モデルペアと5つの数学推論ベンチマークで……平均2.1ポイント、最大4.5ポイントの向上」。保存したピア軌跡は同時共訓練なしで成果の大部分（+1.8）を保持。限界セクションが異例に具体的：利得は「2モデルの相補性次第」、互換性スコアは「代理指標であり密度比ではない」、研究は**2モデルペアのみ、数学のみ、ベースモデルは3B以下のみ**（Qwen3-1.7B、SmolLM3-3B）。

**Why it matters:** 全滅ロールアウトグループはあらゆる RLVR 実行における純粋な無駄であり、「より強いモデルの軌跡を借りる」はスケール再拡大より安いパッチだ——しかも論文には予算を実際に算定する compute-accounting 付録がある。3B/数学限定のスコープは、フロンティアモデル版が未証明であることを意味する——論文自身がそう書いている。

[`🔗 arXiv:2609.37868`](https://arxiv.org/abs/2609.37868) · [`🔗 HF Papers`](https://huggingface.co/papers/2609.37868)

---

## 9. Cloudflare Monetization Gateway：「エージェント向けペイウォール」がクローズドベータへ——HTTP 402、x402 決済

- **Velocity:** ▮▮ rising
- **Source:** Cloudflare · クローズドベータ · 約1日前 (Sep 30 UTC)
- **Tags:** `cloudflare` `x402` `agents` `monetization`

Cloudflare の Agents Week の一環として **Monetization Gateway**（クローズドベータ）：ドメイン所有者は「ウェブサイト、API、MCP ツール、データセットへのアクセスをエージェントに課金できる」——チェックアウトへのリダイレクトなしの HTTP 402 で、人ではなく機械向けのペイウォールであり、決済は stablecoin ベースの x402 プロトコル経由。姉妹投稿の **Pay Per Use** は同じプリミティブを出版社向けに描写：「各利用を報告し支払う、検証済みバイヤーの信頼されたネットワーク」を、共有の ID/計量/価格/分析レールの上に。同日の他の発表（AI Gateway の Auto Router、エージェントへのリアルタイム問題検知、エージェントサンドボックス向けに再構築された Containers——9月26日に本 feed が報じた削除済みデータ露出の欠陥とは別の新記事）が週全体の布置を成す。

**Why it matters:** エージェントトラフィックの収益化は場当たり的な 402 実験だった；それが決済機能付きのホスト型インフラになりつつある。MCP ツール、API、エージェントが消費するコンテンツを公開するすべての人にとって、マシンアクセスのデフォルト条件が今週決められる——そして有料になる。

[`🔗 Monetization Gateway beta`](https://blog.cloudflare.com/monetization-gateway-beta/) · [`🔗 Pay Per Use`](https://blog.cloudflare.com/pay-per-use/)

---

## 10. impeccable：「すべてに Inter」なエージェント製 UI の均質化と戦うスキルに週2,600★

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · 今週 +2,644、73k★ · 約1時間前 (~02:57 UTC+8)
- **Tags:** `design` `coding-agents` `skills` `frontend`

pbakaus/impeccable——「1スキル、24コマンド、ブラウザ内ライブ反復、61の決定論的検出ルール」でコーディングエージェントにより良いフロントエンド設計を生みさせる——が週間トレンド10位。しかも本当に生きている：5日で3リリース（v0.1.6–0.1.8、9月25–29日）、9月30日にも push。出自にも率直（「Impeccable started」は Anthropic の `frontend-design` スキルのフォーク）で、そのテーゼ：「すべてのモデルは同じ SaaS テンプレートで訓練された……すべてに Inter、紫から青へのグラデーション、カードの中のカード。」検出ルールは「LLM なし、API キーなしで実行できる」。同日の HN の反響——「How our vibe coded website looks like a designer made it」（127 pts）——がユーザー側から同じ結論に着地する：著者はエージェントに設計を学ばされたと書き、トップコメントは「あなたは偶然、デザインスクールが教えるデザインプロセスを発明した」と返す。

**Why it matters:** エージェント製ソフトウェアのボトルネックはコードから設計へ明確に移った。そして現れつつある解法はコンパイラ時代のそれ——テンプレート的均質化という失敗モードがモデル間で一貫しているからこそ、「味覚」の決定論的 linter が機能する。

[`🔗 pbakaus/impeccable`](https://github.com/pbakaus/impeccable) · [`🔗 HN：vibe コーディングのサイト、デザイナーの仕上がり`](https://news.ycombinator.com/item?id=49901973)

---

## 11. Netlify が日次約10億の Edge Functions を Firecracker microVM へ移行——warm p50 が 25–40ms から約5–6ms に

- **Velocity:** ▮▮ rising
- **Source:** Netlify · HN 51+ pts · 約2時間前 (~02:17 UTC+8)
- **Tags:** `edge` `serverless` `firecracker` `infrastructure`

Netlify は Edge Function の実行——1日約10億回の呼び出し——をホスト型実行サービスから、**Unikraft を使って自社エッジネットワーク内に構築した Firecracker microVM** へ再構築した：warm p50 レイテンシは 25–40ms から **約5–6ms** に、p99 は47.4%高速化、可用性は99.998%、コールドスタート（約9ms）は呼び出しの約1.2%のみ。開発者向けの契約は動いていない：「URL インポートも npm パッケージも……すべて以前と全く同じように動作します。」

**Why it matters:** V8 isolate から microVM への移行は、エッジで信頼できないユーザーコードを実行するすべてのプラットフォーム——本 feed が追い続けているエージェントサンドボックスプラットフォームを含む——にとってのアーキテクチャ・データポイントだ。p50 で5倍、API 変更ゼロというインフラ物語はトレンドには入りにくいが、確実に複利で効く。

[`🔗 Netlify エンジニアリング投稿`](https://www.netlify.com/blog/edge-functions-firecracker-microvms/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49912444)

---

## 12. OmniTaskonomy：視覚生成の訓練がいつ実際に視覚理解を改善するか——制御実験によるマップ

- **Velocity:** ▮▮ rising
- **Source:** arXiv / HF Papers · 約1.5日前 (Sep 29)
- **Tags:** `multimodal` `transfer-learning` `paper`

画像入力→画像生成（I2I）の訓練は、画像入力→テキスト理解（I2T）を本当に上達させるのか。この論文はその問いを制御実験版にした——**19の I2I 生成タスク × 25の I2T 理解能力**のタクソノミーを構築し、答えは「選択的に、正しいレシピの下で」：「I2I 訓練は下流の I2T 性能を改善し、I2I 訓練データが増えるほど利得は大きくなる。」転写マップには直感どおりのペア（深度 → 計量的3D推論、物体指差し → カウント、ジグソー → 2D順序付け）と、意外なペア（**2.5D セグメンテーションがカテゴリ認識を改善；Z深度予測がローカリゼーションを改善**）があり、勾配アラインメントで探った。著者には arXiv ページ表記の通り Jitendra Malik、Ranjay Krishna、Sewon Min らが名を連ねる。

**Why it matters:** 「生成は理解を教える」は主に雰囲気で旅してきた。これは転写が本当に成立する場所の最初のタクソノミーグレードの地図であり——その自身の枠付けも、利得がタスク依存で無条件の肯定ではないと慎重だ。

[`🔗 arXiv:2609.38079`](https://arxiv.org/abs/2609.38079) · [`🔗 HF Papers`](https://huggingface.co/papers/2609.38079)

---

## 13. CVE-2026-86131：悪意ある VPN サーバーが自分の Firebox クライアントを root 化できる——WatchGuard がエッジ機器の脅威モデルを逆転させた

- **Velocity:** ▮ steady
- **Source:** WatchGuard PSIRT · CVSS 9.2 · 約1.5日前 (Sep 29 UTC)
- **Tags:** `cve` `vpn` `firewall` `firmware`

**リモートの BOVPN-over-TLS サーバーを支配する攻撃者**は、接続してきた WatchGuard Firebox 上で任意のコマンドを **root として**実行できる——コードインジェクション（CWE-94、証明書検証とモジュールローディングの弱点が重なる）。CVSS 9.2 Critical（CVSS v4.0）、9月29日公開時に修正リリースは既に揃っている：Fireware OS **2026.3.2 / 2026.2.3 / 12.12.3**、T15/T35 は 12.5.21。WatchGuard は「野外での悪用は把握していない」と述べる。

**Why it matters:** 支店のファイアウォールは、運用者が管理しないコンセントレータへしばしばダイヤルしていく——つまり悪意ある、あるいは侵害された VPN エンドポイントは単機の事故ではなくフリート規模の事件になりうる。通常のエッジ機器 CVE は悪意あるクライアントを仮定する；これは悪意あるサーバーを仮定し、パッチのトリアージをその方向でやる者はほぼいない。

[`🔗 WatchGuard PSIRT`](https://psirt.watchguard.com/CVE-2026-86131) · [`🔗 NVD`](https://nvd.nist.gov/vuln/detail/CVE-2026-86131)

---

## 14. Apache PLC4X：4つの欠陥が積み重なって「成立する」MITM——その一つは無効な署名だけを受け入れる検証

- **Velocity:** ▮ steady
- **Source:** Apache（oss-security） · CVSS 9.2 · 約1日前 (Sep 30 UTC)
- **Tags:** `cve` `ics` `opc-ua` `apache`

Apache PLC4J の OPC UA ドライバ（CVSS 9.2、Apache CNA）は、ネットワーク位置の攻撃者にサーバー偽装とセキュアチャネルトラフィックの読み取り・偽造——資格情報込み——を許した。4つの欠陥が積み重なっていたからだ：0.9.0–0.11.0 では署名検証の失敗は**ログに取るだけ**で、サーバー証明書は未認証の GetEndpoints レスポンスから取得；0.12.0–0.13.1 では署名検証が**逆**——有効な署名は拒否、無効な署名は受理；全バージョンが policy None をデフォルトとし、静かにダウングレードし、0.13+ は最も弱いエンドポイントを優先。アドバイザリ自身の警告：「これらのメカニズムを1つだけ確認したユーザーは、影響を受けないと誤って結論するかもしれない。」0.9.0 から **1.0.0** 未満のすべてが影響を受け、修正は1.0.0——署名を検証し、トラストストアを要求し、Basic256Sha256 をデフォルトにする。

**Why it matters:** OT ネットワークは MITM を不可能にするという前提でデプロイされる——そして逆転した検証は、単一メカニズムの監査が素通りする種類のバグだ。アドバイザリがそれを口に出して言う理由がそこにある。

[`🔗 oss-security`](http://www.openwall.com/lists/oss-security/2026/09/30/4) · [`🔗 Apache メーリングリスト`](https://lists.apache.org/thread.html/o076mcnsx6wnqpdy780m7s6hddbbnjfw)

---

## 15. Slug の GPU テキストレンダリング特許がパブリックドメインへ——SDF vs MSDF vs Slug の技術ガイドがそれと一緒にやってきた

- **Velocity:** ▮ steady
- **Source:** AlphaPixel · HN 106+ pts · 約6時間前 (~21:50 UTC+8)
- **Tags:** `graphics` `gpu` `patents` `typography`

GPU テキストレンダリングの3つの答えを比較する深掘り——SDF アトラス、マルチチャンネル SDF アトラス、そして Slug（Eric Lengyel、2017）：テクスチャアトラスもフレームごとのテッセレーションも使わず、**フラグメントシェーダで輪郭から直接グリフを描画**する。チュートリアルの下にニュースがある：Lengyel は2019年にこの技術を特許出願し、**「2026年3月17日にその特許をパブリックドメインに捧げた」**——それが AlphaPixel による C++20 実装 Slughorn の公開を可能にした。HN のトップコメントが標準的な訂正を供給する：MSDF アトラスは静的にベイクする必要はなく、非同期アップロードが CJK のケースを解決する。

**Why it matters:** 基礎的なレンダリング技術がパブリックドメインに入るのは日付を刻めるほど稀な出来事であり、この記事は同時に「なぜテキストは GPU フレンドリーなあらゆる定式化に抗い続けるのか」の現場ガイドでもある。

[`🔗 alphapixeldev.com`](https://alphapixeldev.com/sdf-vs-msdf-vs-slug-vs-rive-gpu-text-rendering/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49908962)

---

## 16. Factorio Quality を解く：リサイクルのエンドゲームを線形計画として定式化する

- **Velocity:** ▮ steady
- **Source:** exyr.org · HN 240+ pts · 約18時間前 (~10:27 UTC+8)
- **Tags:** `optimization` `linear-programming` `games`

「私は Factorio を正常な方法でプレイする：工場を計画するために行列計算のコードを書くという方法で。」Factorio Space Age の Quality メカニズム——normal から legendary までの5段階、段階ごとに+10%の確率、4スロット機械での上限 **24.8%**——はエンドゲームのアップグレードを確率的リサイクルループに変える。この記事はそれを線形計画としてモデル化し、オンライン計算機付きで公開した。HN スレッド（91コメント）からは動く伝説品質シングルアセンブラ構成が投稿された。（本 feed は9月26日に Factorio の247個の印刷可能なマシン STL を報じた——同じコミュニティ、別の種類の厳密さ。）

**Why it matters:** 「ゲームを解く」ジャンルは、ほとんどの教科書より良いオペレーションズ・リサーチ教材を作り続けている——そしてこれは今週の最もきれいな標本だ：実在の確率過程が、モデル化され、解かれ、ツールとして出荷された。

[`🔗 exyr.org`](https://exyr.org/2026/solving-factorio-quality/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49887343)

---

## 17. 「コミット説明は思考の道具」——エージェントにコミット本文を書かせるとき、実際に失われるもの

- **Velocity:** ▮ steady
- **Source:** yedhu.me · HN 81+ pts · 約2.5時間前 (~01:18 UTC+8)
- **Tags:** `git` `ai-agents` `engineering-culture`

エージェント以前、著者はコミット本文の執筆に5〜10分を費やしていた。「書くプロセスそのものがコードへの反省を助けてくれるから」。今はエージェントが代筆する——そしてこのエッセイはその代償を名指す：**「AI に『なぜ』の部分が分からないとき、AI は自分の推論をでっち上げる。私はそれを危険だと思う。」**完全なコンテキストを渡せば捏造は直るが、より深い喪失は直らない：反省こそが目的だった。HN のトップコメントはまさにこの一行をスレッドの結論として引用し返す。

**Why it matters:** コミットメッセージは「書く行為そのものが荷重を支えている」成果物——コードレビュー、ポストモーテム——の短いリストに加わろうとしている。それを委譲することは、履歴の中の「なぜ」があなたのものではなくモデルの推測になるその瞬間まで、無料だ。

[`🔗 yedhu.me`](https://yedhu.me/posts/commit-description-as-a-thinking-tool/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49911757)

---

## 18. 9月24日の報道の続き：Apache MINA SSHD に新しい CVSS 9.1 認証バイパスが3件——今回は修正リリースがある

- **Velocity:** ▮ steady
- **Source:** Apache（oss-security） · CVSS 9.1 ×3 · 約1.5日前 (Sep 29 UTC)
- **Tags:** `cve` `ssh` `apache` `java`

先週本 feed は MINA の CVE-2026-94301 を報じた——6月の修正がブランチにコミットされたまま、リリースには一度も入らなかったという話。その続編が、新たな **CVSS 9.1** 認証バイパス3件のバッチだ。すべて Apache CNA による評価で9月29–30日公開：オプションの `sshd-ldap` モジュールに2件（`LdapPasswordAuthenticator` の欠落チェック、加えて LDAP インジェクション）、`sshd-core` に1件（「ある（おそらく稀な）」SSH サーバー実装方式に対するバイパス）。影響：1.2.0–2.19.0 と 3.0.0-M1–M5。**2.20.0 または 3.0.0-M6 で修正——今回は実際のリリースがある。**発見者：Dilrevx、Ho1aAs。

**Why it matters:** 先週の MINA の話は「パッチは、あなたが手にできない場所に存在する」だった；今週はダウンロード可能な修正付きのバイパス・バッチだ。「紙の上で修正済み」と「リリースの中で修正済み」の間の距離こそ、今月の Apache 諸報道のすべての運用教訓だ。

[`🔗 oss-security`](http://www.openwall.com/lists/oss-security/2026/09/29/39) · [`🔗 Apache メーリングリスト`](https://lists.apache.org/thread.html/cyrxkdzl3c70rrqs3klqphqz1hwm7p41)

---

## 19. 「TLA+ に何が検証できて、何ができないか」——形式手法の波がその反論章を得た

- **Velocity:** ▮ steady
- **Source:** Hillel Wayne · HN 87+ pts · 約6時間前 (~21:57 UTC+8)
- **Tags:** `tla-plus` `formal-methods` `ai-agents`

本 feed が9月27日に「インターネットが TLA+ を発見した」を報じてから3日、Hillel Wayne のニュースレターがカウンターウェイトを加える。今回の引き金は新しい：「先週、Claude Code の生みの親 Boris Cherny が、Opus が TLA+ を使って競合状態を発見できたと述べた」——Wayne の応答は「『TLA+ は AI を AI 自身から救う』という物語について、少しだけ冷静になろう」。コアとなる限界は `[]P`/`P'`/`<>P` で歩かれる：**「性質を検証するには、検証すべき性質が先に必要だ」**——モデルが検査するのは仕様であり、正しい仕様を書くことは依然として人間側の、未解決の宿題だ。

**Why it matters:** エージェント＋形式手法の波の有用版は「モデルがあなたのシステムを証明する」ではなく——「あなたが書く気になれなかった仕様をモデルが書き、実装をそれに束縛する」だ。検証は依然として、何が重要かについての人間の決定から始まる。

[`🔗 Computer Things`](https://buttondown.com/hillelwayne/archive/what-tla-can-and-cant-check/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49909056)

---

## 20. NRC が米国初の BWRX-300 小型モジュール炉の建設許可を発給——TVA、Clinch River

- **Velocity:** ▮ steady
- **Source:** GE Vernova Hitachi · HN 111+ pts · 約21時間前 (~07:03 UTC+8)
- **Tags:** `nuclear` `smr` `energy` `regulation`

米国原子力規制委員会（NRC）はテネシー川流域開発公社（TVA）に対し、**Oak Ridge の Clinch River** での **BWRX-300** の建設許可を発給した——GE Vernova Hitachi の30万kW級小型モジュール炉として米国初の建設許可で、2025年4月のカナダ CNSC 許可に続くもの。設計の荷重を支える単純化：再循環ポンプなし——自然対流冷却。（9月29日発表。）

**Why it matters:** データセンターの電力需要は、本 feed が毎日追っている計算資源拡張の物語のもう半分だ。そして初号機の建設許可は、SMR のタイムラインをプレスリリースからコンクリート打設へ変える種類の規制マイルストーンだ。

[`🔗 GE Vernova プレスリリース`](https://www.gevernova.com/news/press-releases/nrc-issues-first-us-construction-permit-bwrx-300-small-modular-reactor-tva-clinch-river) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49902019)

---

## 21. 「17兆件のMicrosoftレコードにアクセスできた可能性」——16歳の研究者、未検証のログイントークン、そして内部分析API

- **Velocity:** ▮▮▮ trending
- **Source:** blog.faav.net · HN 264+ pts · ~2日前 (Sep 29 04:32 UTC+8)
- **Tags:** `microsoft` `bug-bounty` `ai-agents` `authorization`

Faav——16歳、学校と両立しながらバグバウンティに没頭——Faavは、Microsoftの多様なデータセットにまたがる推定**17.3兆件の保存レコード**が、単一の内部分析サービス（"Titan"）経由で到達可能だったことを開示した。原因は**ログイントークンの署名を一切検証していなかった**ことで、この欠陥により管理者のIDを名乗り、資格情報なしで未許可のSQLクエリを投稿できた。侵入経路は端から端までAI支援だった。本人のAIハックボット「Antares」が8月25日にTitanを発見し、人間が10日後の金曜夜に仕上げた——「VPN REQUIRED」と表示される施錠済みフロントエンドは無関係も同然だった。公開Swaggerファイルに4つのルートが列挙され、生SQLを受け付ける`/v2/Query`だけが唯一Azure ADベアラー認証の表記が**なかった**からだ。56個のテーブル定義は、Wayback Machineに残っていたTitanの2023年Superset設定のアーカイブから復元した。記事自身が限界を明示している。影響は仮定の話で、メタデータと上限付きサンプル行しか触っていない——そして注目すべきことに、**「Microsoftはこの記事に対して編集権を持ち、公開前に節と図表を削り、影響の記述を再形成した」**。

**Why it matters:** 二つの要素がここで重なる。第一に、この失敗クラス——内部サービスの認証がルート単位で設定され、一つのルートだけドリフトした——は列挙可能であり、17兆行というのはMicrosoftにおける「内部」の規模である。第二に、開示文書そのものがベンダー編集済みであり、紙面上に読める影響の形状はMicrosoftが承認した形状だということ。注意書きは一次資料にあり、結論にも入れるべきだ。

[`🔗 blog.faav.net`](https://blog.faav.net/how-i-couldve-accessed-17-trillion-microsoft-records) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49883970)

---

## 22. HowToLiveBetter：649項目をエビデンス格付けした中国語の人生ガイドが、今月の新リポジトリ首位の32.3k★に——自身の項目を引用するagent skill付き

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub · 32.3k★ · ~25分前にpush (~11:53 UTC+8)
- **Tags:** `chinese-oss` `evidence-grading` `agent-skill` `open-data`

「高コスパ人生ガイド」（eternity4719/HowToLiveBetter、CC-BY-4.0、9月7日作成）は9月に作成されたリポジトリで最もスターを集めた：長寿、救急処置、節約、法律、雇用、結婚・育児、海外移住をカバーする**649項目の助言**——各項目に何を費やし何を得るか、エビデンスの硬さを明記し（**A格付け428 · B 171 · C 50**）、ジャーナル論文と公式文書のみを引いた**1,531本の出典リンク**を添える。検索可能なVitePressサイトに加えPDF/EPUB/オフラインHTMLで頒布され、2026年の部分として、**Claude CodeとCodex用のagent skill**を同梱する。「友人の連帯保証人になっていいか」と尋ねると、まず本の項目を検索し、節と項番を引用してから答える。姉妹の单ページリーダー（cdyforever/how-to-live-better）がさらに5.9k★を積む。

**Why it matters:** byoungd/upの系譜——人生の助言をオープンソースにする——だが、今回は*検索コーパス*として設計されている：エビデンス格付け済み、出典過密、agentが一行ずつ引用できる構造。RAGアプリがドキュメントに使っているのと同じパターンを、個人の意思決定に適用し、同時に二人の読者のために書いた。

[`🔗 eternity4719/HowToLiveBetter`](https://github.com/eternity4719/HowToLiveBetter) · [`🔗 オンライン検索版`](https://eternity4719.github.io/HowToLiveBetter/)

---

## 23. 続き：Gemini 4 Argon に初の独立評価——Artificial Analysis は 53 点、223モデル中8位

- **Velocity:** ▮▮▮ trending
- **Source:** Artificial Analysis · HN 92+ pts · ~7.5時間前 (Oct 1 04:50 UTC+8)
- **Tags:** `google` `gemini` `benchmarks` `evaluation`

Googleの発表から約一日——今朝このフィードが#1で扱った際は「リリース数時間、独立評価ゼロ」と書いた——のち、Artificial Analysisが**Gemini 4 Argon (High)**の数値を公開した：**Intelligence Index 53、223モデル中8位**。クラス中央値の26を大きく上回るが、首位には届かない。価格は確認済み（100万トークンあたり$2/$10、キャッシュ95%割引、タスクあたり$1.99）、コンテキストは発表通り1M。注目すべき差分は冗長性だ：Intelligence Indexを完走するのに**出力トークン110M**を消費し、中央値は82M——このモデルは典型的モデルより約34%多く「声に出して考え」、その分はタスク単位コストにすでに反映されている。速度はN/A表記。評価は推論バリアントのみ。

**Why it matters:** Google選定のタイ首位（DeepSWE 77.9%、CWE-bench同率1位）と、独立ハーネスの8位との差こそ、このフィードがリリース日の数字に割り引く理由だ——そして冗長性はArgonの価格ページが語らないコストの話だ。測定されていて、宣伝されていないからだ。

[`🔗 Artificial Analysis`](https://artificialanalysis.ai/models/gemini-4-argon) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49914236)

---

## 24. 続き：America.govのAIチャットが「Minecraftで遊ぶ」というネタが発覚——米政府の玄関口にはトピックのガードレールがない

- **Velocity:** ▮▮ rising
- **Source:** HN · 112+ pts · ~8.7時間前 (Oct 1 03:34 UTC+8)
- **Tags:** `government` `ai-agents` `guardrails`

このフィードが9月30日に「米政府へのAI玄関口」としてAmerica.govの開設を報じた翌日、HNはそのチャットエンドポイントの余興を発見した：**「play Minecraft」**と頼むと、ゲームのエンドクレジット詩の政府版を朗々と披露する——「より高いレベルに到達した。連邦規則集(CFR)を読めるようになった…私たちをチャットボットだと思っている」。楽しいが、診断的でもある：市民向けエージェントが、ドメイン外リクエストへのシナリオテストを一切見せずに出荷された。（鮮度注：今回の実行時、`america.gov/chat`はスクリプトクライアントに403を返した——ここの台詞はHNスレッドからの引用であり、画面写しが二次情報である理由でもある。）

**Why it matters:** このフィードが扱ってきたすべてのエージェント運用の話と同じ教訓が、今度は連邦スケールで起きた：人格を壊すプロンプトは常にコピペ一つ先にあり、修正は決して「モデルが分別を持った」ではない——誰かが下していなかったharnessの決定だ。

[`🔗 HN 議論`](https://news.ycombinator.com/item?id=49913255) · [`🔗 america.gov/chat`](https://america.gov/chat)

---

## 25. CS240のAIカンニング騒動、担当教員自身の回顧録に——明確な方針、処理のまずさを自認、「ほとんど結果責任なし」

- **Velocity:** ▮▮ rising
- **Source:** turkeyland.net · HN 102+ pts · ~8.4時間前 (Oct 1 03:54 UTC+8)
- **Tags:** `education` `academic-integrity` `ai-policy`

2026年春のCS240（Cプログラミング）AIカンニング騒動の中心にいた教授が、学生たちに問われ続けた経緯を公開した：講義シラバスにはあらゆる課題でのLLM使用を禁じる**明文化された禁止**があった——それでも彼自身の対応は「もっと良くあるべきだった。それこそが、明文化された方針に違反した人々が結局**ほとんど、あるいはまったく結果責任を負わずに**済んだ主な理由だ」。執筆の動機は、事件をめぐる「どうやら今も続いている議論」を取り巻く誤情報だとしている。政策の条文から処理の結果までを含む、教員側からの詳細な一次文書だ。

**Why it matters:** 政策は決して難しい部分ではない——執行が難しい。そしてこれは内側からの稀な白状だ：明文ルールがあり、既知の違反があり、制度的帰結はほぼゼロ。エージェントを禁じるすべての講義が実際に生きているのは、シラバスの文言ではなく、この非対称性だ。

[`🔗 CS240 回顧録`](https://turkeyland.net/thoughts/ai.php) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49913458)

---

## 26. Halfspace：Matt Keeter の距離場ソリッドモデリング IDE——「2026年になったので、冒頭に書いておく。これはvibe codeしていない」

- **Velocity:** ▮▮ rising
- **Source:** mattkeeter.com · HN 88+ pts · ~8.5時間前 (Oct 1 03:44 UTC+8)
- **Tags:** `cad` `graphics` `distance-fields` `webgpu`

Halfspaceは**距離場**によるソリッドモデリングの実験的IDE——Keeterが2022年から作ってきたFidgetカーネルのブラウザ（WebGPU）ショーケースだ：GUI内の画像をほぼリアルタイムでラスタライズし、モデルは画像や三角形メッシュとして書き出せる。構え自体が主張だ：低レベルな陰曲面の作業「はアセンブリを書くのに少し似ている」、だからHalfspaceはその上に高レイヤーを築く——そして「2026年になったので、冒頭に書いておく。**これはvibe codeしていない**。2025年4月から取り組み、人間の脳でコードを書いている」という書き出しは、出自の声明として実働している。

**Why it matters:** Keeterの陰関数モデリング連作はこのニッチの長期リファレンスであり、今回のデモはタブの中で本当に動く。そしてその免責文言が文化の標本だ：手書きであることの出自声明は、今や作品集プロジェクトがライセンスと同じように掲げるべきものになった。

[`🔗 Halfspace`](https://www.mattkeeter.com/projects/halfspace/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49913350)

---

## 27. 続き：AGMAI が「AI生成数学の責任ある公開」を公表——600件超の意見募集、そして実験室に実践の中止を要請

- **Velocity:** ▮▮ rising
- **Source:** agmai.org · HN 83+ pts · ~26時間前 (Sep 30 10:36 UTC+8)
- **Tags:** `mathematics` `ai-policy` `publication-norms`

このフィードが9月22日にTerry Taoのゲスト投稿を通じて報じた数学・AI諮問グループ（AGMAI）が、九日後に最初の成果を発表した：**「Responsible Release of AI-Generated Mathematics」**（9月29日）、**600件超のコミュニティからの回答**に基づく。背骨はこの分野最古の規範の再定義だ——著者は論証を*理解*し、検証し、それに責任を負わねばならない——に、居心地の悪い要請が加わる：「現在、一部のフロンティアAIラボは、高度な数学的問題をプロプライエタリなモデルでテストしている……**冒頭から明確に述べておく。我々はこの慣行を支持しない。中止を要請する。**」人間の理解が即座に伴わないまま重要な数学的成果を公開するラボは、それに責任を負わねばならない。

**Why it matters:** 数学コミュニティが、このフィードがベンチマーク報道で繰り返し突き当たってきた亀裂——理解される前に存在してしまう結果——を正式化したものだ。そしてベンダーブログが決して明かさない立場を取る：審査の対象は公開のエチケットだけでなく、テストという慣行そのものだ。

[`🔗 agmai.org`](https://agmai.org/general-sep29/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49903713)

---

## 28. Meta-Skills：凍結された「Builder」モデルが、凍結された「Target」のためにハーネスを組むことを学ぶ——AI-for-AIが転移可能なスキルになる

- **Velocity:** ▮▮ rising
- **Source:** arXiv / HF Papers · HFデイリー首位 (28 ups) · ~1日前 (Sep 30)
- **Tags:** `agents` `harness` `paper` `ai4ai`

UIUCのチーム（Cheng Qian、Kunlun Zhu、Beibin Li、Zhenhailong Wang、Heng Ji）が **test-time AI-for-AI** を形式化した：*両*モデルの重みを凍結したまま、BuilderがTargetの開発セット上での実行フィードバックから **Meta-Skills**——「いつ支援が必要で、どんなリソースを提供すべきかを定める原則」——を学び、凍結したスキルバンクを使って未知のタスク向けの実行環境（ハーネス）を構築する。彼らのHarness-BenchとNewton Benchにおいて、フルバンクのmeta-skillsはスキルなし構築比でマクロ平均 **+8.95ポイント**、同じバンクをTargetに直接渡す方法比で **+12.02ポイント** 改善した——内容だけでなく、パッケージング自体が仕事の一部を担っている。

**Why it matters:** ハーネスエンジニアリング——このフィードで最も報道密度の高いカテゴリ——が、手作りの成果物から、それ自体学習可能で転移可能なレイヤーになりつつある。注意点は評価だ：Harness-BenchもNewton Benchも著者らの自作であり、誰かの別のエージェントスタックが再現するまで、この利得は彼らの設定内でのみ成立する。

[`🔗 arXiv:2609.38143`](https://arxiv.org/abs/2609.38143) · [`🔗 HF Papers`](https://huggingface.co/papers/2609.38143)

---

## 29. Gitea 28.0、「1.」を外す——監査ログ、ボットアカウント、そして1週間非公開のセキュリティ修正

- **Velocity:** ▮▮ rising
- **Source:** Gitea ブログ · HN 70+ pts · ~7.8時間前 (Oct 1 04:32 UTC+8)
- **Tags:** `gitea` `git` `self-hosted` `release`

Gitea v28.0.0は歴史的な`1.`接頭辞を引退させ（1.28.0ではなく28.0.0だ）、しばらくぶりの大量機能を載せる：**監査ログ、ボットアカウント、HTTPSデプロイトークン、管理者によるユーザーなりすまし、code-owner承認ルール、diffファイルフィルタ、Actionsキュービュー**。セキュリティ節は意図的なぼかしだ：「本リリースにはセキュリティ修正が含まれます。全員がアップグレードする時間を確保するため、詳細は約1週間後にこの記事に追記されます。」アップグレーダーへの破壊的変更：リリースバイナリから32ビットx86と`gogit`ビルドが消え、Snapのarmhfビルドが廃止、ダウンロードファイル名からOSバージョン接尾辞が消える。

**Why it matters:** バージョン方式の切り替えは、セルフホストGitエコシステムがポスト1.0時代を宣言するやり方だ——そして「詳細は後日」のパターンは不変の教訓でもある：「最新リリース」と「完全開示」は別の状態だ。Giteaを公開環境で動かしているなら、開示を待たずリリースで上げろ。

[`🔗 Gitea 28.0.0 リリース記事`](https://blog.gitea.com/release-of-28.0.0/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49913975)

---

## 30. PSSA：Rustでゼロから書かれた「可塑性」のある状態空間言語モデル——トークンごとの重み更新、MLフレームワークなし、生成は約12倍速を主張

- **Velocity:** ▮ steady
- **Source:** GitHub / HN · 85+ pts · ~2日前 (Sep 30 11:19 UTC+8)
- **Tags:** `state-space` `rust` `architecture` `from-scratch`

PSSA（「plastic state-space architecture」、Sparticle62ops/pssa）はトランスフォーマーではない小型言語モデルだ：テキストを再帰状態空間レイヤーで一トークンずつ読み、**エピソード記憶バンク**がフォワードパス中に書き込み・照会され、重みの一部は**モデルの実行中に自分自身を書き換える**。MLフレームワークは一切使っていない——線形代数は手書きだ。自動微分の下では「一歩ごとにフレームワークと戦うことになる」からで、すべてのバッチ化カーネルはスカラー参照経路に対し約3e-8まで検証されている。自己測定の主張：同パラメータ・同コーパスでトランスフォーマー比より速く学習し、同じCPUでテキスト生成は**約12倍速い**。READMEは率直だ：「ここでの主張はアーキテクチャだ。実装言語は細部にすぎない。」

**Why it matters:** ポストトランスフォーマーの探求はガレージ規模で生きており、その場での可塑性と、推論中に書き込まれるアドレス可能な記憶の組み合わせは面白い——ただしここの数値はすべて一人の開発者の測定であり、独立再現は存在しない。

[`🔗 Sparticle62ops/pssa`](https://github.com/Sparticle62ops/pssa) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49903993)

---

## 31. laya-mlx：Layaの型付き決定モデルにネイティブMLXランタイム——Appleシリコンで7–14ミリ秒の決定、PyTorch不要

- **Velocity:** ▮ steady
- **Source:** GitHub / PyPI · 6.7k★ · 9月19日作成
- **Tags:** `mlx` `decision-models` `apple-silicon` `local-llm`

mizorewww/laya-mlx（PyPI v0.2.0）は **Layaの型付き決定モデル**——このフィードが9月20日に#1で扱ったオープンソース「System 1」ファミリー——のネイティブMLXランタイムだ：M3 Maxで **7–14ミリ秒** でchoice/score/yes-noの決定を返し、テキスト生成なし、PyTorchなし、クラウドAPIなし。今月このフィードが追い続けてきたローカル決定モデルインフラの波のAppleシリコン支流だ（9月21日のKevのセルフホスト可能ファミリー、9月26日のOllayaのRustデーモン、そして今回のLaya-MLX）。それが重要な理由は算術だ：ローカルで10ミリ秒の型付き決定は、エージェントが一キーストロークごとに「調べられる」ものを変える。

**Why it matters:** 決定モデルのサービングは、LLMサービングと同じようにプラットフォームごとに分化しつつある——サーバーにはRustデーモン、MacにはMLX——そしてフレームワーク依存を一つ減すごとに、呼び出しごとのルーティングは「最適化」から「デフォルト」に変わる。注意：リポジトリは9月22日以降静かだ。ランタイムは実在しパッケージ化されているが、若い。

[`🔗 mizorewww/laya-mlx`](https://github.com/mizorewww/laya-mlx) · [`🔗 PyPIのlaya-mlx`](https://pypi.org/project/laya-mlx/)

---

## 32. codegraph：事前インデックス・自動同期のコードナレッジグラフが72.6k★——そして一日中続いたフレームワーク別ヒューリスティクス修正

- **Velocity:** ▮ steady
- **Source:** GitHub · 72.6k★ · v1.6.1（9月29日）、修正は今日も継続
- **Tags:** `code-intelligence` `rust` `coding-agents` `indexing`

colbymchenry/codegraphは自らを「最速の完全コードグラフ」と称する：コードの変更に**自動同期**する事前インデックス済みのシンボル/ナレッジグラフ、100%ローカル、Rustカーネル、provenanceとattested-buildバッジ付きのnpmパッケージとして頒布され、9種のエージェント（Claude Code、Codex、Gemini CLI、Cursor、OpenCode、Antigravity、Kiro、Copilot、Hermes）に接続できる。v1.6.1は9月29日に公開され、今日のコミットは全部同じ種類の修正だ——「ミドルウェア候補は宣言であり決してimportではない」、コンポーネント名ヒューリスティクスは`.astro`のみに限定——フレームワークごとに名前パターンの規則を詰める作業だ。

**Why it matters:** エージェントへのコンテキスト供給はそれ自体インフラレイヤーになり、大型の競合が複数ある（9月23日に扱ったDeusDataのcodebase-memory-mcp 44.3k★、9月29日のjevgrepのセマンティック検索）。codegraphの差別化は自動同期と完全ローカルだ。そして今日のコミットログが正直なコスト行だ：ヒューリスティックなコードインデックスは、フレームワークごとの穴埋めが続く長い尾だ。

[`🔗 colbymchenry/codegraph`](https://github.com/colbymchenry/codegraph) · [`🔗 ドキュメント`](https://colbymchenry.github.io/codegraph/)

---

## 33. 56k.rip：1996年のダイヤルアップ体験のすべてを、ブラウザのタブに

- **Velocity:** ▮ steady
- **Source:** 56k.rip · HN 100+ pts · ~6時間前 (Oct 1 06:08 UTC+8)
- **Tags:** `retro` `dialup` `web`

「1996年のダイヤルアップ体験のすべて：ハンドシェイク音、待ち時間、そして誰かが電話を取る。音はオンで。」モデム交渉オーディオから接続待ち、切断まで、儀式全体をインタラクティブなページとして復元した単一ページ作品だ。HNで6時間で100ポイント超え、まだ伸びている。

**Why it matters:** 純粋なノスタルジア工学だ。そしてこのジャンルが繰り返し受けるのは、それが反エージェントのインターネットだからだ：遅く、身体がそこにあり、人間が電話を取ることで中断される——どんな最適化でも改善できない体験。

[`🔗 56k.rip`](https://56k.rip/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49915126)

---

## 34. Android デベロッパー検証ついに発効：「ユーザー保護」が本日4カ国で開始——サイドローディングの時代が変わる

- **Velocity:** ▮▮▮ trending
- **Source:** HN · 261+ pts · 約7.8時間前 (~12:32 UTC+8)
- **Tags:** `android` `google` `policy` `sideloading`

Google 自身のページが示す日付が今日：**「2026年9月30日をもって、アプリをインストールするユーザーへの保護を開始します」**——参加ストアから認証済み Android 端末（Android 7+）へのインストールが対象で、開始は**ブラジル、インドネシア、シンガポール、タイ**の4カ国、「2027年以降」に「認証済み Android 端末上のすべてのアプリ」へ拡大予定。未検証デベロッパーのアプリはパワーユーザー向け**アドバンスドフロー**を必要とする（開発者 API とともに2026年8月に開始）。デベロッパーは Android Developer Console（Play 外配信専用）か Play Console で登録し、後者はアプリの約99%を自動登録。譲歩条項もある：限定配信アカウントなら**政府発行 ID も費用も不要で最大20台の端末にアプリを共有でき**、オープンソースアプリ向けの専用登録ガイドも用意されている。一方、HN での開発者の反応は和解していない：プログラム名を罵倒タイトルにしたスレッドが8時間で261ポイント。

**Why it matters:** Android のインストール時の契約が、実際の国の実際の端末で変わった日だ——身元登録がインストールの前提条件になり、パワーユーザー用の逃げ道が長期的に存続するかは誰にも事前検証できない。F-Droid 級の配布モデルと2027年の世界展開が、次に見るべき部分だ。

[`🔗 developer.android.com/developer-verification`](https://developer.android.com/developer-verification) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49917761)

---

## 35. FirstDate：シンガポール政府製マッチングアプリが Gale-Shapley を稼働——安定マッチング、72時間に1人

- **Velocity:** ▮▮▮ trending
- **Source:** The Register · HN 416+ pts · 約27時間前 (~17:27 UTC+8)
- **Tags:** `algorithms` `gale-shapley` `government-tech` `matching-markets`

FirstDate はシンガポール GovTech がパイロット運用するマッチングアプリ——職員の議論から生まれ、同庁の年次ハッカソンで構築された。TraceTogether と同じ組織だ。興味・習慣・価値観・選好のアンケートに **Gale-Shapley 安定マッチングアルゴリズム**（Gale & Shapley、1962；ノーベル賞級の系譜）を適用し、**72時間周期で1人ずつ候補を提示**する運用。双方が同意すると連絡先を交換でき、「Date Quests」という初デートのアイスブレイク提案機能もある。対象は現在**21〜35歳の独身公務員**に限られ、GovTech 自ら「相性や恋愛への発展は保証できない」と認める。HN スレッド（383コメント）は一日中マッチング理論の議論で沸いた。

**Why it matters:** 遅延受理アルゴリズムは64歳になり、これがその最も文字通りの展開だ——現実の安定結婚問題を、国家が婚姻目的で運営している。同時にこれは「スワイプしない」プロダクト形状でもある：順位付き選好と一度1人は、エンゲージメント最大化フィードへの拒否であり——それを打ち出したのがエンゲージメント指標を持たない機構というのが皮肉だ。

[`🔗 The Register`](https://www.theregister.com/public-sector/2026/10/01/singapores-government-creates-a-dating-app/5300353) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49906432)

---

## 36. 欧州の大型データセンターの大半が水と電力の使用量を明かさない——EU法が3年間報告を義務付けているのに、オランダでは4分の1未満

- **Velocity:** ▮▮ rising
- **Source:** NL Times / Lighthouse Reports · HN 211+ pts · 約25.5時間前 (~18:49 UTC+8)
- **Tags:** `data-centers` `energy` `transparency` `ai-buildout`

Lighthouse Reports と Trouw など欧州メディアによる1年に及ぶ調査が明かしたのは、欧州の大型データセンター——**設置容量500kW以上、EU エネルギー効率指令が3年間報告を義務付けてきたクラス**——の大半が数値を公表していないという実態だ。オランダの場合：業界団体は同規模の商業データセンター**186**を数え、国家機関はうち104のデータを保有するが、電力が公表されているのはわずか**44**、水は**47**。公表済みの部分では：データセンターは2024年に**51億 kWh を消費——全国電力の4.6%で、5年前の2倍**。送電網運営者 TenneT は**2030年に10〜15%**へ伸びると見込み、Microsoft のオランダ最大施設は単独で**全国電力消費の1%**を占め、大型サイトを2つ持つ Google は一切公表していない。

**Why it matters:** 本 feed は AI 建設ラッシュの請求書——Bain の6兆ドル売上ギャップ、メモリ価格、送電網混雑——を追い続けてきたが、それらの議論はすべてこうした数値が前提だ。指令はとっくに報告を義務付けている。今回の発見は「法律が報告を義務付けること」と「公衆への開示」が別物だということだ。水と電力をめぐる議論は、いまだ推計の上を走っている。

[`🔗 NL Times`](https://nltimes.nl/2026/09/30/data-centers-refusing-say-much-water-electricity-use) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49907057)

---

## 37. Show HN：Ledge.sh——コードブロックが実際に動く Markdown ノート、エージェント向け MCP サーバー付き

- **Velocity:** ▮▮ rising
- **Source:** Show HN · 156+ pts · 約1.5日前 (Sep 30 07:41 UTC+8)
- **Tags:** `markdown` `notes` `mcp` `show-hn`

Ledge は「動く Markdown ノート」：コードブロックで ⌘↩ を押せば出力が下にストリーミングされる——shell、Python、Node、Ruby、PHP、TypeScript（同梱 Bun 経由）、SQL、redis-cli、そしてエージェントにパイプする AI `prompt` ブロックに対応。各ノートは**自分専用の永続 shell** を持ち（`cd`、環境変数、有効化した virtualenv が実行間で保持される）、ノートは SSH 経由でサーバーに置けて `host:` 行でコードブロックを別マシンへルーティングできる。iPhone/iPad/Android クライアントはサーバーの薄い窓にすぎない——「電話にノートは保存されない」、Secure Enclave 鍵でペアリング。**Claude Code がノートを読み・検索・編集できる MCP サーバー**を同梱するが、**エージェントに削除ツールは与えない**。Apache-2.0、プレーンな Markdown ファイル、アカウント不要、サイドカーデータベースなし。HN の比較対象：bash バックエンドの Jupyter、org-mode、Observable Framework。

**Why it matters:** 「実行できるランブック」は50年の歴史を持ち、いつも一歩届かなかったアイデアだ。2026年の追加要素は SSH がそのまま同期になることと、意図的な負のケイパビリティ（削除不可）を持つエージェント用インターフェースだ。リポジトリはまだ小さい（178★）が、面白いのは設計判断のほうだ。

[`🔗 ledge.sh`](https://ledge.sh) · [`🔗 ledgesh/ledge`](https://github.com/ledgesh/ledge) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49902382)

---

## 38. OpenDLSS：NVIDIA DLSS 5 ニューラルレンダリングネットワークの Vulkan 再実装——ビット完全一致、中間結果まで

- **Velocity:** ▮▮ rising
- **Source:** HN · 124+ pts · 約27.6時間前 (~16:43 UTC+8)
- **Tags:** `graphics` `vulkan` `neural-rendering` `dlss`

maanHimself/OpenDLSS-NR は **DLSS 5 のニューラルレンダリングネットワークを Vulkan で再実装し、「オリジナルとビット完全一致」**を達成した——DLSS-NR build 310.8.0 と同じ71ブロックの Swin/ViT U-net、テンソルコア上の FP8（E4M3）、重みは141 MiB。しかも主張は最終画像の一致より強い：**全75ブロック境界がバイト単位で一致**し、`parity` フィクスチャモードで検証できる。2つ目の独立実装（`ports/browser-webgpu/`）は同じネットワークをテンソルコアなし・FP8なしでブラウザに載せる。重みは自己調達。アーキテクチャは NVIDIA 公表のレポート（[DLSS 5: Generative Neural Rendering](https://research.nvidia.com/labs/adlr/DLSS5/)）に基づく。DLSS 5 NR とは何かに注意：**アップスケーラーではない**——エンジンが描いたフレームを再レンダリングし、注入されたノイズからディテールを生成する生成ネットワークだ。

**Why it matters:** 独立開発者が公表レポートだけから専用リアルタイムモデルをビット単位で再現できたのは、双方向のデータポイントだ——アーキテクチャは完全に復元可能で、かつ「重みは自己調達」がモートの本当の場所を思い出させる。生成的ニューラルレンダリングがフレーム再構築を置き換える方向性も、このサイクルのリアルタイムグラフィックスで特筆すべき転換だ。

[`🔗 maanHimself/OpenDLSS-NR`](https://github.com/maanHimself/OpenDLSS-NR) · [`🔗 NVIDIA DLSS 5 プロジェクトページ`](https://research.nvidia.com/labs/adlr/DLSS5/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49906100)

---

## 39. MIST：画像の「存在」そのものが VLM ジャッジを不安定化させる——整合画像と誤導画像がラベルを動かす割合はほぼ同じ

- **Velocity:** ▮▮ rising
- **Source:** arXiv / HF Papers · HF 日次トップ · 約2日前 (Sep 29)
- **Tags:** `vlm` `evaluation` `benchmarks` `paper`

Misleading-Image Stress Test（MIST）：字義的にも比喩的にも読める英文200文を、整合画像・誤導画像・画像なしの条件で13の VLM ジャッジに提示する——ラベリングガイドラインは答えを文だけから取るよう要求しており、どの画像も結果を変えてはならない。結果は、両方の画像がほぼ同じ割合でラベルを動かした——**整合20.5%、誤導19.4%、いずれも「画像を無視せよ」という指示を削除した際の11.6%を上回る**——しかも2画像間でラベルが分かれたサンプルのうち、画像の示す意味のほうへ動いたのは**37%**だけ。画像が不在でも整合でも誤導でも、人間アノテーターとの一致率は変わらない。著者の結論：**「ジャッジを動かすのは画像がどちらであるかではなく、画像がそこにあることだ。ゆえに代替可能性の判定は、モデルと同じくらい『設定』を記述している。」** alt-test を通過する7ジャッジは通過しない6ジャッジより影響は小さい——しかし13ジャッジ全員が影響を受ける。

**Why it matters:** 「VLM をジャッジに」はエージェント型マルチモーダルシステム評価の安価な土台になりつつあり、これは「ハーネスが測定そのもの」という教訓の最も鋭い提示だ——本来何の影響も持たないはずの条件がテスト済み全ジャッジを不安定化したということは、ジャッジベースのスコアは一部、実験セットアップを採点しているということだ。

[`🔗 arXiv:2609.37863`](https://arxiv.org/abs/2609.37863) · [`🔗 HF Papers`](https://huggingface.co/papers/2609.37863)

---

## 40. TileLang v0.1.15：Huawei Ascend 950 ネイティブバックエンドと自動 CUDA warp 特化——カーネル DSL がマルチベンダーへ

- **Velocity:** ▮▮ rising
- **Source:** GitHub · 8k★ · v0.1.15 Sep 30
- **Tags:** `kernels` `gpu` `huawei-ascend` `compilers`

オープンソースのタイル化カーネル DSL TileLang（tile-ai/tilelang、8k★）が9月30日に v0.1.15 をリリースし、構造的な追加を2つ載せた。第一に、**Huawei Ascend 950 のネイティブサポート**（`target="ascend"`、dav-3510）：エンドツーエンドの NPU バックエンドで、ネイティブコード生成、Cube GEMM と Vector 演算を1カーネルに統合（`T.SimdVF`/`T.SimtVF` 領域）、UB/L1/L0 ストレージの明示的制御、**MXFP8/MXFP4 ブロックスケール GEMM**、そして自動スケジューリング・パイプライン化・同期挿入。第二に、**自動 CUDA warp 特化**：オプトインのロールベーススケジューラが、TMA ロード、MMA 演算、TMA ストア、worker 操作を特化 warp グループに割り当てる——従来手書き PTX だった Hopper/Blackwell 時代のパターンだ。さらに SM100/SM120 を横断する統一 `T.gemm_blockscaled` と、表現力を増した Python フロントエンド（コンパイル時の内包表記、`zip`、ジェネレータ式）。

**Why it matters:** Triton クラスのオープンカーネル DSL が Ascend の一等市民サポートを得たのは、コンピュートスタック多様化の物語における具体的データポイントだ——NVIDIA 以外のアクセラレータで一番難しいのはプログラマビリティの橋であり、それが現行 NVIDIA コード生成を定義するコンパイラ技術（warp 特化）と同じリリースに載ってきた。

[`🔗 tilelang v0.1.15 リリース`](https://github.com/tile-ai/tilelang/releases/tag/v0.1.15) · [`🔗 tile-ai/tilelang`](https://github.com/tile-ai/tilelang)

---

## 41. Ubuntu 26.04.1 LTS：初のポイントリリース——CUDA がメインリポジトリへ、ポスト量子鍵交換がデフォルトに、X.org 移行完了

- **Velocity:** ▮ steady
- **Source:** Ubuntu · HN 77+ pts · 約22.7時間前 (~21:36 UTC+8)
- **Tags:** `ubuntu` `linux` `release` `lts`

26.04 LTS シリーズ初のポイントリリース（9月29日）は「もう安心してインストールできる」合図であり、静かに成果だらけだったリリースを統合した：GNOME 50、Ubuntu **完全 Wayland 化**（X.org からの移行完了）、実験段階を卒業した分数スケーリングと VRR。新デフォルトアプリ（Papers、Loupe、Ptyxis、Resources）と統合 App Center。**NVIDIA CUDA をリポジトリからネイティブ提供する初の Ubuntu**、加えて AMD ROCm。**TPM バックアップのフルディスク暗号化が GA**。**ハイブリッドポスト量子鍵交換がデフォルト**に、レガシー暗号スイートは削除。メモリ安全コンポーネントを拡充した初の LTS（Rust カーネルドライバ、`sudo-rs`、`uutils`）。Intel TDX と AMD SEV 向けコンフィデンシャルコンピューティング。`authd` は Entra ID、Google IAM、OIDC に対応。24.04 LTS ユーザーにはアップグレードが通知される。

**Why it matters:** ポイントリリースは LTS がフリートのデフォルトになる瞬間であり、これは3つの転換を一度に焼き込んだ——ディストロへの AI ツールチェーン統合（メインの CUDA/ROCm）、デフォルトのポスト量子、コア部分のメモリ安全性——どれも従来はアーリーアダプターの手動オプションだったものだ。

[`🔗 Ubuntu ブログ`](https://ubuntu.com/blog/upgrade-your-desktop-ubuntu-26-04-lts) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49908757)

---

## 42. CVE-2026-103056：監視対象の全エンドポイントを root 化できた AI-SOC エージェント——CrowdStrike RTR コマンド構築の CVSS 9.4 コマンドインジェクション

- **Velocity:** ▮ steady
- **Source:** VulnCheck · CVSS 9.4 · 約35時間前 (Sep 30 09:16 UTC+8)
- **Tags:** `cve` `ai-security` `agent-security` `vulncheck`

AiSOC——オープンソースの AI セキュリティオペレーションセンター（SOC）製品——は、`crowdstrike_rtr.py` と `endpoint.py` で CrowdStrike Real Time Response のコマンド文字列を**エスケープなしのアクションパラメータ補間**で構築している。認証済みユーザーは `file_path`、`path`、`script_name`、`script_args` にシングルクォートを注入してクォートされた引数を突破し、**このプラットフォームが管理するすべてのエンドポイント上で SYSTEM または root 権限の任意コマンド実行**に至る。**CVSS 9.4 Critical（CVSS v4.0）——発見者 VulnCheck によるスコア**（NVD レコードでは Secondary 指標、CNA スコアなし）。同時 disclose の **CVE-2026-103055（8.7）**：realtime WebSocket/SSE サーバーが JWT 検証にハードコードされた定数を使用。7.2.0〜12.0.0 未満が影響を受け、**v12.0.0 で修正**、公告は GHSA-7q37-2wfw-xrx7。

**Why it matters:** これは本 feed がエージェントハーネスで繰り返し見つけてきたパターンだ——文字列補間で信頼された実行パスを組み立てる——ただし今回は被害者がセキュリティ製品であり、爆発半径は文字通りその製品が守るフリートだ。「誰が採点したか」のルールに従い記す：9.4 は発見者のスコアであり、ベンダーのものではない。

[`🔗 VulnCheck アドバイザリ`](https://www.vulncheck.com/advisories/aisoc-7.2.0-before-12.0.0-command-injection-via-crowdstrike-rtr) · [`🔗 GHSA-7q37-2wfw-xrx7`](https://github.com/beenuar/AiSOC/security/advisories/GHSA-7q37-2wfw-xrx7) · [`🔗 NVD`](https://nvd.nist.gov/vuln/detail/CVE-2026-103056)

---

## 43. GPT-Synopsys：OpenAI と Synopsys が EDA ツールを操作する専用モデルを発表——日付なし、ベンチマークなし、早期連携のみ

- **Velocity:** ▮ steady
- **Source:** Synopsys · HN 40+ pts · 約1.5日前 (Sep 30)
- **Tags:** `openai` `synopsys` `chip-design` `eda`

OpenAI と Synopsys が **GPT-Synopsys** を発表——「Synopsys の EDA ツールを使って半導体設計ワークフローを実行するよう最適化された専用モデル」。今日のエージェント+ツール統合を超えた位置づけだ：モデル自体が EDA のエキスパートユーザーであり、委任された工学目標（**PPA 最適化、タイミング、検証収束**）を扱い、エージェントがツールを実行し、結果を解釈し、人間のレビューに向け検証された成果へ反復する。Synopsys.ai と Autopilot エージェントプラットフォームに統合され、OpenAI ホストのインフラで動き、**コンピュート+モデル+ライセンスのバンドル**として販売される。顧客の設計データは「モデルの学習に使用されない」。プレスリリースにないもの：基盤モデルの名前、出荷日、顧客、ベンチマーク——あるのは「早期技術連携が進行中」だけだ。

**Why it matters:** これは今週2つ目のバーティカル・フロンティアモデルのテンプレートだ（先日は Gemini 4 Argon の信頼されたサイバー防御者ティア）：フロンティアベンダーがモデルを一つのベンダーの専門ツールチェーンと組み合わせ、エンタープライズライセンスに価格を織り込む。チップ設計版は今のところ告知のみで証拠がゼロ——そしてそれ自体が追跡すべきポイントだ。

[`🔗 Synopsys プレスリリース`](https://news.synopsys.com/2026-09-30-OpenAI-and-Synopsys-Announce-GPT-Synopsys-Frontier-Intelligence-to-Revolutionize-Chip-Design) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49919910)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-10-01T20:22:00+08:00 |
| Items | 43 |
| Sources tracked | 42（Hacker News、GitHub Trending、GitHub、Google ブログ、Artificial Analysis、blog.faav.net、turkeyland.net、mattkeeter.com、agmai.org、arXiv、Hugging Face、blog.gitea.com、56k.rip、america.gov、PyPI、eternity4719.github.io、colbymchenry.github.io、Cisco PSIRT、CISA KEV、NVD、DIVD CSIRT、edgcpp.org、python.org security-announce、Cloudflare ブログ、Netlify、WatchGuard PSIRT、oss-security、Apache メーリングリスト、alphapixeldev.com、exyr.org、yedhu.me、Computer Things/buttondown、GE Vernova、insufferable.dev、developer.android.com、The Register、NL Times、ubuntu.com、Synopsys、VulnCheck、ledge.sh、research.nvidia.com） |
| Update schedule | 04:03, 12:03, 20:03 UTC+8（1日3回） |
| Ranking | Velocity 重み付け（鮮度 × エンゲージメント加速 × ソースの権威） |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[Previous day](2026-09-30.md) · [Raw .md](latest.md) · [Archive](../archive/index.md)
