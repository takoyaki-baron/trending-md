---
date: 2026-11-19
updated: 2026-11-19T04:18:26Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 35
license: CC-BY-4.0
---

# trending.md — 2026-11-19

## 1. NGINX の未認証 RCE 2件が本日公開——5つの研究チームが同じ脆弱性に独立たどり着いた

- **Velocity:** ▮▮▮ trending
- **Source:** Wiz Research · 677+ pts on HN · 約5時間前 (~23:19 UTC+8)
- **Tags:** `nginx` `rce` `http2` `vulnerability` `f5`

F5 が本日、NGINX のセキュリティリリースを公開した。**認証なしでリモートコード実行が可能な重大脆弱性2件**、CVE-2026-123633 と CVE-2026-123007 で、いずれも **CVSS 4.0 9.2 Critical**（旧3.1スケールでは 8.1 High——スコアは F5 自身の評価で、確認時点で NVD の両レコードは `Received` のまま）。**Wiz Research、Ikotas Labs、Metnir、Rapid7、Xint が独立に同じ2つの脆弱性を発見**し、別々に報告していた。CVE-2026-123633 は、NGINX が HTTP/2 クライアント通信をバックエンドへプロキシしていて `worker_connections` が逼迫している場合に worker プロセスで起こる use-after-free——Wiz は10月21日に ASLR バイパス込みの確認済み RCE として報告しており、開示タイムラインには「F5 confirms that another research team had previously reported the same vulnerability」（F5 によれば、別の研究チームがすでに同じ脆弱性を報告していた）とある。CVE-2026-123007 は HTTP/2 フロー制御ウィンドウが許容閾値を超えうることで起こるヒープバッファオーバーフローで、「affects versions dating back to NGINX 1.9.5 in 2015」（2015年の NGINX 1.9.5 まで遡って影響する）——HTTP/2 を導入したまさにそのリリースだ。修正版は **1.30.7 stable と 1.31.9 mainline**（OSS。Plus の R33〜R37 は F5 のアドバイザリ表を参照）。すぐにアップグレードできない場合は、Wiz のガイダンスに従い該当 NGINX インスタンスで「temporarily disable HTTP/2」——1.25.1 以降の対象 server ブロックで `http2 off;` を設定する。

**Why it matters:** NGINX は「more than 225 million websites」（2億2500万以上のウェブサイト）を支えており、両脆弱性はプロキシ層にある——アプリケーションコードが安全でもサイトは露出しうる。物語のもう半分は5チームによる独立の到達だ。同じメモリ安全性の縫い目を5つのグループが同時に引っ張っていた。10月21日から本日のパッチまでの期間は、まさにそれとの競走だった。

> Xint の同伴記事は、そのタイトルがそのまま実証内容になっている：NGINX2Root——NGINX の訪問者からサーバーホストの root へ（英語/韓国語/日本語）。

[`🔗 Wiz：NGINX における未認証 RCE（CVE-2026-123633/-123007）`](https://www.wiz.io/blog/nginx-http2-rce-vulnerabilities) · [`🔗 Xint：NGINX2Root 技術解説`](https://nginx2root.com/) · [`🔗 NVD：CVE-2026-123633`](https://www.cve.org/CVERecord?id=CVE-2026-123633) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50547374)

---

## 2. Genie 4 が Project Genie で解禁——セッション途中の世界編集とリアルタイム・ネイティブ音声

- **Velocity:** ▮▮▮ trending
- **Source:** Google DeepMind · 74+ pts on HN · 約1.3時間前 (~02:49 UTC+8)
- **Tags:** `google-deepmind` `world-models` `genie-4` `generative-ai`

Google が AI Ultra 購読者向けに Project Genie の新体験を公開し、**Genie 4** への初アクセスを実現した——「our most realistic and interactive world model yet」（これまでで最も写実的でインタラクティブな世界モデル）で、目玉は「you can now prompt mid-session to change the world you created」（セッション途中でプロンプトを出せば、作った世界を変更できる）：天気を変え、キャラクターを落とし、展開を改変する。すべてブラウザ内で。Genie 4 は映像に「real-time native audio that adapts as the scene unfolds」（シーンの展開に適応するリアルタイム・ネイティブ音声）を初めて組み合わせた。Genie 3 は長いランやパノラマシード空間向けにモデルピッカーに残り、こちらも更新される：**1生成あたりのセッションが3分に延長（従来は60秒）、ワールドチェイニング、360°パノラマ画像グラウンディング、リアルタイムの世界内イベント**。新しい Project Genie エージェントは Google のマルチモーダルモデルを会話的にオーケストレーションし、Gemini モデルはセッション内に同行して文脈認識のサジェスチョンチップを表示する。コミュニティギャラリーも公開され、キュレーションされた世界とユーザー制作の世界がリミックス可能で並ぶ。投稿は天井についても正直だ：これらは「remain world models in the frontier research space」（フロンティア研究領域に留まる世界モデル）であり、チームは「actively tackling key challenges such as camera latency, intricate physical interactions, real-time audio precision, and long-term scene permanence」（カメラのレイテンシ、精緻な物理インタラクション、リアルタイム音声の精度、長期のシーン永続性といった重要課題に積極的に取り組んでいる）。

**Why it matters:** 世界モデルが研究デモから、編集・音声・共有を備えた消費者向けプロダクト面へ交差した——インタラクティブメディアへの含意が本題で、公式が名指しした課題リスト（永続性・レイテンシ・物理）が、研究フロンティアの現在位置をそのまま示している。

[`🔗 Google：Genie 4 が利用可能に（Project Genie）`](https://blog.google/innovation-and-ai/models-and-research/google-deepmind/genie-4-now-available-project-genie/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50550415)

---

## 3. Inside Deutsche Bank：1500万ファイルの漏洩が、20年分の無視されたコンプライアンス警告を暴く

- **Velocity:** ▮▮▮ trending
- **Source:** FT 主導の報道連合 · 352+ pts on HN · 約4.5時間前 (~23:38 UTC+8)
- **Tags:** `deutsche-bank` `data-leak` `investigation` `compliance`

大規模な国際調査が本日公開された。プロジェクト名は **Inside Deutsche Bank**、**1500万件超の漏洩した内部文書**に基づく。プロジェクト自身の定義づけはこうだ：「The leak of 15+ million files lays bare the bank's flawed culture, systemic blind spots and pursuit of profit over compliance」（1500万件超のファイルの漏洩は、銀行の欠陥ある文化、体系的な盲点、コンプライアンスより利益を追う姿勢を露わにしている）。ファイルは約20年分の銀行の最も機密性の高い機能をカバーする：アンチ金融犯罪、制裁モニタリング、内部監査、そしてリスクのある顧客の去就を決める部門だ。公開パートナーには FT、ニューヨーク・タイムズ、Dawn、Malaysiakini、IrpiMedia、elDiario.es、Follow The Money が名を連ねる。既に報じられた発見には、逃亡中のジョー・ローに関連する24件以上・計1億7298万ユーロの取引、制裁に備える銀行内で引用された内部警告——「As you know we have a large Russian Oligarchs client population」（ご存じのとおり、我々にはロシア・オリガルヒの顧客層が大勢いる）——、ハンガリーのオルバン系銀行が数十億ユーロ規模のマネーロンダリングSchemeのプラットフォームになったとされ、Deutsche Bank がその決済を処理していた件、そして銀行自身の内部方針に違反した武器貿易ファイナンスが含まれる。ドイツ政府は透明性を要求し、アナリストは新たな規制調査を予想している。

**Why it matters:** これはパナマ/パラダイス文書時代以降最大の金融セクター文書漏洩で、重心が違う——隠されたオフショア資産ではなく、G-SIB のコンプライアンス機構そのものが、書面で自らの管理を突き止めつつ利益を追った姿だ。規制、訴訟、そして（Deutsche Bank が皆の決済銀行である以上）取引相手への波紋は、四半期単位で続くだろう。

[`🔗 Inside Deutsche Bank（プロジェクトハブ）`](https://www.inside-db.com/) · [`🔗 FT：Leak of 15mn Deutsche Bank files exposes systemic failures`](https://www.ft.com/content/df518845-ed97-4a38-8a38-7fa9d4d24003) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50547620)

---

## 4. All About Berlin、トラフィック −75%：Google AI 回答の当事者からの記録

- **Velocity:** ▮▮ rising
- **Source:** nicolasbouliane.com · 723+ pts on HN · 約13時間前 (~14:47 UTC+8)
- **Tags:** `seo` `google` `ai-overviews` `web-publishing`

本日の HN 最大スレッドは、Nicolas Bouliane が 2017年から運営してきた（2020年からは専業の）**All About Berlin** についてのエッセイだ——ベルリン州 itself が移民に案内に使っているあのサイトが、Google AI Overviews によりトラフィックの75%を失ったと書いている（投稿には更新があり、初出時の数字は70%）。「When you Googled something, you used to get a link to my website. Now you get a page of ads, then an AI-generated answer trained on my content, then finally a link to my website.」（以前は何かを検索すれば私のサイトへのリンクが返ってきた。今はまず広告のページ、次に私のコンテンツで訓練された AI 回答、ようやく最後に私のサイトへのリンクが来る。）投稿が再燃した引き金は、それが指す Google 自身の発表だ——先週 Google は、AI 生成回答が検索結果を完全に置き換えること、そしてその回答に広告が載ることを発表した。Bouliane は独立系ウェブの行き先を書き留める：有料化したサイトもあれば、「keep the websites online, but they no longer update them. It's just not worth it.」（サイトは放置するがもう更新はしない。割に合わないのだ。）これは昨日の項目の第一人称の続篇だ——無作為化試験が集計上のクリック損失を約40%と示したのに対し、こちらは影響を受けたサイトの内側からの姿だ。

**Why it matters:** 40%という数字は移行の規模を教えてくれた。これは犠牲の形状を教えてくれる。人々が実際に使うリファレンス・インフラ——政府の窓口が移民をそこへ送るあのサイト——が、そのコンテンツで訓練された回答に呑み込まれるとき、問いは SEO を超えて：誰が回答の依拠する一次情報源を資金面で支え、維持するのか、になる。

[`🔗 AI is killing All About Berlin（エッセイ）`](https://nicolasbouliane.com/blog/death-by-ai) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50542705)

---

## 5. 昨日の MAI Code 2 報道の続き：Ignite の全容は7モデルファミリー——そしてチップが1つ

- **Velocity:** ▮▮ rising
- **Source:** Microsoft AI · 298+ pts on HN · 約4時間前 (~00:08 UTC+8)
- **Tags:** `microsoft` `mai` `ignite-2026` `model-lineup`

昨日は Microsoft Ignite から MAI Code 2 と Code 2 Flash を報じた。完全な発表は**7モデルのファミリーと、マイクロソフト第2世代アクセラレータ**だ。最も大胆な新主張はセキュリティラインにある：Microsoft いわく、**「MAI Cyber 2 Flash beats GPT-6 Astra's quality at less than 2% of the cost per task on the CyberGym-E2E benchmark」**（MAI Cyber 2 Flash は CyberGym-E2E ベンチマークで、タスクあたりコスト2%未満で GPT-6 Astra の品質を上回る）。その他のラインナップはすべて Microsoft 自身の比較だ：Code 2 は「98% of the coding quality of GPT-6.1 Sol at about 40% of the price」（価格約40%で GPT-6.1 Sol のコーディング品質の98%）、Opus 5.5 対比では「96% performance for just 5% of the price」。Code 2 Flash は「matches the performance of GPT-6 Luna at 65% of the price, and Haiku 5.5 at 20%」。Image 2.5 は GPT Image 2.5 Sunburst (max) の5分の1の価格で「#1 on Artificial Analysis image editing」。Realtime 1 は「outperforms GPT-Realtime 2.1」で音声1分あたり $0.01 から。Transcribe 2（Dragon Copilot Transcribe の基盤）は「already powers 10 million patient encounters a month」。Decision 1.1 は「50x faster and 79x cheaper than GPT-6.1 Sol」。そして **Maia 200**、第2世代 AI アクセラレータは「is now in production running our largest models, achieving 1.7x more tokens per watt」。

**Why it matters:** 昨日の教訓はそのまま立つ：これらはベンダー自身が選んだ動作点でのベンダー自身のベンチマーク行であり、「タスクあたりコスト」の枠組みは独立な測定ではなくマーケティングの論点として読むべきだ。昨日の報道から本当に新しいのは陣形の方——Microsoft は意思決定モデル、リアルタイム音声モデル、セキュリティエージェントモデル、そして自社の学習シリコンを一つの発表に並べ、企業のトークン支出に向けたフルスタックの売り込みを見せている。

[`🔗 Microsoft AI：Seven new models at scalable price-performance`](https://microsoft.ai/news/microsoft-ignite-2026/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50548021)

---

## 6. KPMG が FTSE 250 企業の監査を100超の AI エージェントで人間と並行実行——エージェントの方が良い質問をしたと発表

- **Velocity:** ▮▮ rising
- **Source:** Financial Times · 160+ pts on HN · 約4.3時間前 (~23:49 UTC+8)
- **Tags:** `kpmg` `ai-agents` `audit` `enterprise-ai`

FT が KPMG 英国の監査パイロットを報じた：**100超の AI エージェント**が、FTSE 250 上場企業の完全な監査を**従来型の人間主導の監査と並行して**実行したのだ。KPMG 英国監査責任者の Cath Burnet は、エージェントが複数の事例で人間のチームより良い質問をし、より深く掘ったと述べた。会社の枠組みでは判断は人間の座に残る——最終署名は人が行い、KPMG は将来 AI 監査をクライアントに提供したいと考えている。展開はパイロットより広い：Bloomberg Tax によれば数百の KPMG 監査チームが繁忙期を前に先進的 AI エージェントを実地試験しており、非公開会社のクライアントから始めている。米国法人は **KPMG Clara Intelligence**——AI 支援で「human-assured」（人間が保証する）監査プラットフォーム——を既にローンチ済みだ。

**Why it matters:** 監査はエージェント主張への完璧な敵対的試験だ——成果物は規制当局が検算し、質問そのものが成果物であり、しかもここで報告しているのは事務所自身が、実際の受託で自社のスタッフよりエージェントの質問が優れていたと認めたことだ。今月2つ目の専門職領域で、正直な発見は「AI が仕事を完遂する」ではなく「AI がボトルネックを動かす」——署名は依然人間がするし、彼らがレビューするものが機械の浅さから機械の深さへ変わった、ということだ。

[`🔗 FT：AI asked 'better questions' than KPMG accountants in pilot audit`](https://www.ft.com/content/5168b3e9-75d0-4be0-9ccd-d327d6b16c05) · [`🔗 KPMG：Clara Intelligence 米国ローンチ`](https://kpmg.com/us/en/media/news/kpmg-unveils-next-era-of-ai-enabled-human-assured-audit-with-us-launch-of-kpmg-clara-intelligence.html) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50547777)

---

## 7. OpenAI が Jalapeño にモデルが書いた RTL を詳述——そして「5か月未満で約1年分の進展」と呼ぶ AMD との協業

- **Velocity:** ▮▮ rising
- **Source:** OpenAI · 61+ pts on HN · 約2.3時間前 (~01:45 UTC+8)
- **Tags:** `openai` `chip-design` `amd` `risc-v` `eda`

OpenAI の研究投稿は、最初のカスタム推論チップ **Jalapeño** に対して自社モデルが実際に何をしたかを深く掘り下げている：モデル提案の RTL 変更がベクターユニットの標準セル面積を約13%、マトリクスユニットを約10%削り、OpenAI はその最適化が「were silicon proven during Jalapeño's silicon bring-up」（Jalapeño のシリコンブリングアップでシリコン実証済み）だと述べる。具体例：乗算器の再設計でセル面積約15%減、しかもレイテンシを2クロックから1へ短縮。加算器の再設計で面積約15%減、レイテンシは維持。AMD 側では、OpenAI は「up to 14% improvement relative to heavily optimized baselines on the flagship GPU IP」（フラッグシップ GPU IP で、徹底最適化されたベースライン比で最大14%の改善）を主張し、協業を「roughly a year of progress achieved in less than 5 months」（5か月未満で達成された約1年分の進展）と形容する——さらに「AMD has already included some of these changes in a recent design it sent for manufacturing」（AMD は既にこれらの変更の一部を製造に回した最近の設計に含めている）と主張し、AMD が次期フラッグシップ CPU の主要ブロックで検証した1桁台の PPA 改善も添える。投稿はさらに **Synopsys** との協業（「to ground capability development in trusted evaluators」——能力開発を信頼できる評価器に接地させる）と、仕様書から **RISC-V** コアを設計する結果も報告している。

**Why it matters:** 「シリコン実証」の主張が正しければ、これは LLM が書いた RTL が誰かのテープアウトに載った最初の公開証拠になる——意味のある単位は「AI がチップを設計」ではなく「AI が、人間のチームが既に絞り切ったブロックから PPA の勝ち筋を見つける」だ。誠実な注意書きは文の内側にある：AMD 比較は*徹底最適化された*ベースラインに対するものであり、「up to 14%」は平均ではなく最大値だ。

[`🔗 OpenAI：Advancing chip design with OpenAI models`](https://openai.com/index/advancing-chip-design-with-our-models/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50549493)

---

## 8. Cursor のプラグイン仕様が trending で17kスター——公式プラグインと、稼働中のサードパーティmerge列車

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · 本日 +315★ · 直近のPR merge 約7.8時間前 (~20:24 UTC+8)
- **Tags:** `cursor` `plugins` `agent-skills` `spec`

`cursor/plugins`——**Cursor プラグイン仕様とプラグイン**の公式リポジトリ——が **17,149 スター**（本日 +315）で trending に乗っている。コミットフィードが理由を語る：サードパーティプラグインのパイプラインが高回転で動いており、本日のmergeで Hospitable プラグイン（PR #1269）、Fiscal AI（#1275）、CreateOS（#1262）、LMTY が加わった。各プラグインは「ルート直下のスタンドアロンディレクトリで、固有の `.cursor-plugin/plugin.json` マニフェストを持つ」。公式セットには `create-plugin`（新プラグインのスキャフォールドと検証）、`teaching`（スキルマッピングと練習プラン）、`continual-learning`（トランスクリプト駆動の AGENTS.md への増分メモリ更新）、`agent-compatibility`、そして強い主張を持つ2つが含まれる：`thermos`——「Thermo-nuclear branch review: deep security/correctness audits, harsh code-quality rubrics, parallel subagents」（熱核級ブランチレビュー：深いセキュリティ/正確性監査、厳格なコード品質ルーブリック、並列サブエージェント）——と `ralph-loop`、「Iterative self-referential AI loops using the Ralph Wiggum technique」（Ralph Wiggum 手法による反復自己言及 AI ループ）。

**Why it matters:** これは agent-skills の波が、主要 IDE ベンダーの一人称パッケージングを得た瞬間だ——コミュニティで発明されたパターン（Ralph ループ、過激なブランチレビューのルーブリック）が、マニフェスト仕様と開かれた PR パイプラインを備えた公式カタログにキュレーションされつつある。スキル標準がどのベンダーに収束するかはまだ決まらないが、こうしたカタログこそが形成されつつあるインターフェイスだ。

[`🔗 cursor/plugins（仕様 + 公式プラグイン）`](https://github.com/cursor/plugins) · [`🔗 プラグインカタログ README`](https://github.com/cursor/plugins/blob/main/README.md)

---

## 9. CISA KEV に4件追加——3件は3日の連邦期限つき、1件は7か月前の LiteLLM RCE

- **Velocity:** ▮▮ rising
- **Source:** CISA KEV catalog 2026.11.18 · 本日のカタログ更新
- **Tags:** `kev` `cisa` `litellm` `synology` `vulnerability-management`

本日の KEV 更新は、実際に悪用されている4件を追加した。うち3件は異例に短い連邦の猶予（期限 **2026-11-21**）：**Synology DiskStation Manager CVE-2024-10441**（CVSS 9.8、システムプラグインデーモンにおける出力エスケープ不備——2025年の DSM ビルドで修正済みであり、本日の KEV 追加が言っているのは、まだ未パッチの NAS ファームウェアがどれだけあるかだ）、**REDCap CVE-2026-90817**（病院や大学が走らせている Vanderbilt の研究データプラットフォームにおけるコードインジェクション）、そして **Apache Axis CVE-2026-90436**（とっくに EOL の Java SOAP スタックにおける unsafe reflection）。4件目は **BerriAI LiteLLM CVE-2026-40217**（CVSS 8.8、期限 2026-12-02）：NVD レコードいわく「LiteLLM through 2026-04-08 allows remote attackers to execute arbitrary code via bytecode rewriting at the /guardrails/test_custom_code URI」——ユーザーコードを実行する guardrails 機能そのものが、悪用経路になった。下地の脆弱性は春から公開済み（X41 D-Sec のアドバイザリ。Red Hat も errata を出している）ので、本日の KEV 追加は、開示に悪用の波が追いついた形だ。

**Why it matters:** 3日の連邦 Remediation 猶予は緊急シグナルだ——DSM と REDCap の patch-or-isolate 判断に変更窓は待てない。そして LiteLLM を共有 AI インフラとして走らせているすべての人へ：悪用されたエンドポイントは guardrails 機能の中にある。まさに「コードを実行するから」という理由で追加したはずの部品だ。

[`🔗 CISA KEV カタログ（JSON）`](https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json) · [`🔗 NVD：CVE-2026-40217`](https://www.cve.org/CVERecord?id=CVE-2026-40217) · [`🔗 X41 D-Sec：LiteLLM アドバイザリ`](https://www.x41-dsec.de/lab/advisories/x41-2026-001-litellm/)

---

## 10. CLI-Anything が再び trending に——59.5kスター、9月以降コミットゼロ、そしてレジストリの顔

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · 本日 +384★
- **Tags:** `cli` `agents` `hkuds` `skill-registry`

HKUDS の **CLI-Anything**（「CLI-Anything: Making ALL Software Agent-Native」）が本日 **+384スター**で GitHub trending に復帰、総数 **59,594**——正直な部分から：リポジトリ本体は**9月22日以降コミットゼロ**だ。活動は一層外、**CLI-Hub**（cliany.cc）で起きている。プロジェクトの前面に立つエージェントフレンドリーな CLI レジストリだ：「Any software. Any codebase. Any Web API. Generate an agent-native CLI and let AI agents operate it — install with a single command.」（どんなソフトウェアも、コードベースも、Web API も。エージェントネイティブな CLI を生成し、AI エージェントに操作させよ——ワンコマンドでインストール。）インストール経路は SKILL.md ネイティブ——`npx skills add HKUDS/CLI-Anything --skill cli-hub-meta-skill -g -y`——加えて pip パッケージ（`cli-anything-hub`）が `cli-hub list/search/install/info` を公開し、サイトは OpenClaw、Nanobot、Claude Code、Codex、Antigravity との互換性を掲げる。これは2日前の stitch-skills と同じ形だ：休止中の一次リポジトリが、周囲のエージェントツールの波に持ち上げられている。

**Why it matters:** ここで面白い単位はスター数ではない——レジストリパターンだ。エージェントがツール単位ではなくタスク単位で CLI ラッパーを発見・インストールするなら、「エージェントが動かせるソフトウェア」の分布はキュレーションされた索引になり、HKUDS はその索引こそが製品だという賭けに出ている。

[`🔗 HKUDS/CLI-Anything`](https://github.com/HKUDS/CLI-Anything) · [`🔗 CLI-Hub レジストリ`](https://cliany.cc/)

---

## 11. KVM の INIT エミュレーション修正が当日中に CVE レコードとして着地——ネステッドSVMの古いMMUコンテキスト

- **Velocity:** ▮ steady
- **Source:** cve.org · 141+ pts on HN · 約4時間前 (~00:06 UTC+8)
- **Tags:** `kvm` `linux-kernel` `virtualization` `nested-virtualization`

CVE-2026-99312 はカーネル自身の修正を記録したものだ：「KVM: x86: Unconditionally reset MMU context when emulating INIT」（INIT エミュレーション時に MMU コンテキストを無条件にリセット）。バグ：ページング無効のままネステッドゲスト（L2）が走っている状態で INIT が届くと、KVM は L1 を古い MMU コンテキストのまま走らせてしまう可能性がある——レコードいわく「the MMU page role includes guest_mode (L2), i.e. an INIT while L2 is running with CR0.PG=0 will result in KVM running L1 with a stale MMU context」（MMU ページロールには guest_mode (L2) が含まれる。つまり CR0.PG=0 で L2 が走行中に INIT が来ると、KVM は L1 を古い MMU コンテキストで走らせる）。コミット自身のスコーピングも読みごたえがある：リセットはページング/L2 のケースに絞れたはずだが、SMM もページロールにエンコードされており、ロールが変わらないとき KVM は再構成の大半を省略するため、無条件リセットは安い。説明は影響範囲で閉じる：「this bug only affects nested SVM as INIT is an unconditional intercept on VMX」（このバグはネステッド SVM のみに影響する。VMX では INIT は無条件インターセプトだからだ）。4つの stable ツリーコミットが参照され、NVD レコード自身は本日朝 UTC に発行された（09:17Z、まだ `Received`）。

**Why it matters:** HN スレッド（84コメント）の火力の大半はメタ問に向かった——なぜニッチなネステッド仮想化の正しさ修正が CVE を帯びるのか。これが現代のレジストリの現実だ：カーネルの自己修正は今やデフォルトで番号を取り、CVE 番号は誰かが分析するまで重大度のシグナルを何も運ばない。ネステッド SVM ゲストを走らせている人にとっては、それでもパッチすべき一行だ。

[`🔗 CVE-2026-99312（cve.org）`](https://www.cve.org/CVERecord?id=CVE-2026-99312) · [`🔗 Stable ツリー修正コミット`](https://git.kernel.org/stable/c/24f644ea26c2ebb7b14c3baa2aa92d37fde3095f) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50548004)

---

## 12. 「ピアレビューはAI生成テキストを生き延びられるか」——Fed のエコノミストと Fernández-Villaverde が、AI 執筆の査読報告を盗作扱いにする提案

- **Velocity:** ▮ steady
- **Source:** UPenn / Federal Reserve Board · 63+ pts on HN · 約6.2時間前 (~21:51 UTC+8)
- **Tags:** `peer-review` `ai-detection` `economics` `research-integrity`

**Dario Caldara**（Federal Reserve Board）と **Jesús Fernández-Villaverde**（UPenn、CEPR、NBER）による11月16日付の新論文は、経済学が AI 生成テキストへの規範を今すぐ作らなければ「peer review is in serious danger of collapsing」（ピアレビューは崩壊の重大な危険にさらされている）と論じる。彼らの実験：AI 検出器は LLM が**執筆した**査読報告を検出し、AI が単に校正したり編集を支援したりした報告は検出しない——彼らの政策はこの区別の上に立つ。提案は鋭い：検出器を標準ツールに。フラグ付き論文はより厳しい読解へ、最初の事実誤りでリジェクト可。そして最も重い一文——「an AI-generated referee report adds nothing that editors could not get by running the prompt themselves」（AI 生成の査読報告は、編集者が自分でプロンプトを実行すれば得られる以上の何ものも加えない）——ゆえに AI 執筆の査読は「should be treated like plagiarism」（盗作のように扱われるべき）だ。論文は著者・査読者・編集者向けの実践ガイドで閉じ、その開示脚注は執筆過程で LLM を使ったと自ら記している。

**Why it matters:** これは構造の議論であって道徳的パニックではない：査読者の比較優位は希少な注意の焦点であり、それこそまさに LLM が商品化したものだ。検出実験の発見——*執筆*と*編集*はきれいに分離できる——は経済学を超えて意味を持つ：執行は詐欺ケースを狙えて、文法の通しをすべて犯罪化する必要がない、ということだからだ。

[`🔗 論文（PDF、UPenn）`](https://www.sas.upenn.edu/~jesusfv/Peer_Review.pdf) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50546312)

---

## 13. Show HN：Mastra Factory——先週 238 PR をマージしたエージェント走るカンバン

- **Velocity:** ▮ steady
- **Source:** Show HN · 34+ pts · 約3.2時間前 (~00:53 UTC+8)
- **Tags:** `mastra` `agents` `ci` `open-source`

Mastra チーム（Shane、Sam、Abhi）がフレームワーク公開から2年、Show HN に戻ってきた。今度は Mastra 自体の保守に使っているツールだ：**Mastra Factory**、「a configurable agentic kanban board that's @-taggable in Slack」（Slack で @ できる、設定可能なエージェント的カンバンボード）で、長いセッションのために Mastra の durable エージェントの上に構築されている。規模の数字がそのまま売りだ：Mastra は今や「nearly 4M downloads per week」（週にほぼ400万ダウンロード）を平均し、**「Last week, Factory opened and merged 238 PRs, alongside 630 merged PRs from humans」**（先週、Factory は238の PR を開いてマージし、人間は630の PR をマージした）——mastra-ai 組織全体で、エージェントの成果はマージ PR 全体868のうち238、約27%で、人間比率の約4割に相当する。

**Why it matters:** 昨日の StarSling ローンチ（「エージェントは CI がチェックできるより速くコードを書く」——CI が最適化 PR を開く）に続いて、これは同じテーゼのメンテナ側バージョンだ：ボトルネックはもはや変更を書くことではなく、変更を護送することにある。そこでチームは工場を建て始めている——エージェントがチケットを端から端まで保持し、人間はマージでレビューする。238対630という比率は、実在する週400万ダウンロードのプロジェクトにおけるエージェント share-of-merges の最初の具体的データポイントのひとつだ。

[`🔗 Show HN：Mastra Factory（HN）`](https://news.ycombinator.com/item?id=50548660) · [`🔗 Mastra`](https://mastra.ai)

---

## 14. ボイジャー1号を、メモリチップ1個の粒度まで分解する

- **Velocity:** ▮ steady
- **Source:** Show HN · 85+ pts · 約3.9時間前 (~00:18 UTC+8)
- **Tags:** `voyager` `interactive` `space` `visualization`

Raj Shekhar が、1977年の2機のボイジャーのインタラクティブ分解を作った：「Two spacecraft launched in 1977, still talking to Earth from interstellar space. This is where they are right now.」（1977年に打ち上げられた2機の探査機は、星間空間から今も地球と交信している。これが今の位置だ。）機体をベイごとに開け（1–10 のキーでベイを順送り）、個々のモジュールやチップへ降り、各アセンブリを回転・ズームし、打ち上げから今日の星間位置までの旅を見られる。全体がキーボード駆動で自己完結——最も遠くにある人類の造物のために作られた、ブラウザネイティブな技術文書だ。

**Why it matters:** エージェント支援の職人仕事が上手く着地した姿だ：一人で、週末規模のプロジェクトで、かつては JPL 自身のメディアチームの持ち物だった探索可能なディテール密度を実現している。そして小さな保存の行為でもある——最遠の人工物のエンジニアリング知識が、ナビゲート可能になった。

[`🔗 Voyager（インタラクティブ分解）`](https://rshekhar.com/voyager/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50548161)

---

## 15. HUMAN.md——設定ファイルのフォーマットで書かれた働くマニフェスト

- **Velocity:** ▮ steady
- **Source:** human-md.ai · 118+ pts on HN · 約23時間前 (~04:47 UTC+8、昨日)
- **Tags:** `essay` `human-skills` `ai-era` `craft`

Briana (Mazzio) May のエッセイは、それ自体がファイルだ：「HUMAN.md > a working manifesto. notes-to-self, mostly. > not a thinkpiece. not a thread. not a deck.」（HUMAN.md > 働くマニフェスト。たいていは自分へのメモ。> 評論ではない。スレッドではない。デッキでもない。）フォーマットの下にある論点：taste（嗅覚）は、人間がまだ担っている貢献を言い表す言葉として間違っている——「Taste is the surface. There is a whole engine underneath it, and that engine is the part the model can't have.」（taste は表面だ。その下には一つのエンジン全体があり、そのエンジンこそモデルが持てない部分だ。）番号付きのセクションは職人至上主義の教義だ——「break the rule on purpose」（意図的にルールを破る。系として：「If you can't say why you broke it, you didn't break it, you just missed」——なぜ破ったか言えないなら、それは破ったのではなく外したのだ）、「find the thing in the weird place」（奇妙な場所でものを見つける：インスピレーションは「印字ミスされた駐車違反切符」や「無名のビクトリア朝ゾートロープの猫」に住んでいる）。フォーマット自体が論点だ：人間が、今われわれがエージェントを指定するやり方で自分自身を指定している。

**Why it matters:** 「No AI Slop: A Manifesto」から数日、人間側の応答が、エージェントが読むネイティブなフォーマットで届いた——この転倒そのものが論証だ。あなたの価値がモデル出力に*対して*適用する判断にあるなら、あなたの運用原則を markdown の spec として書くことは、たまたま機械であるチームメイトにそれを渡す方法として、まさに正しい。

[`🔗 HUMAN.md`](https://www.human-md.ai/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50537962)

---

## 16. スコットランド HTTP ステータスコード——418 ティーポットの伝統にゲール語方言が加わる

- **Velocity:** ▮ steady
- **Source:** underwood.network · 130+ pts on HN · 約1.6時間前 (~03:26 UTC+8)
- **Tags:** `http` `humor` `standards` `web-culture`

HTTP ステータスコードの表をスコットランド語で書き下したもの。RFC 2324 と、先週実在した「I'm a Freezer」インターネットドラフトの偉大な伝統に連なる。全奏鳴曲が揃っている：`403 GET TAE FUCK`、`404 NAE FUCKIN HERE, PAL`、`500 AH'VE FUCKED IT`、`503 WE'RE FUCKIN SHUT`、そして当然の `418 AH'M A FUCKIN TEAPOT`。ページで最も鋭いのは 451——「THE COUNCIL SAYS NAW」（評議会がノーと言った）——歴史的に言えば、それこそがまさに 451 の意味だからだ。

**Why it matters:** 純粋な文化項目で、次の観察のもとにファイリングする：HTTP ステータスのユーモアは業界の機嫌を追跡する——フリーザードラフトが本物になったのはフリーザーが実際に攻撃されたからで、スコットランド表の魅力は、どの行も大半の本番 API が返すエラーメッセージより正直だということだ。

[`🔗 Scottish HTTP Codes`](https://underwood.network/http/scots.html) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50550062)

---

## 17. カリフォルニア州が Waymo を州高速道路から締め出す——「差し迫った危険」認定、その後全国の高速運行停止

- **Velocity:** ▮ steady
- **Source:** ABC7 / AP · 63+ pts on HN · 約22時間前 (~10:00 UTC+8、昨日)
- **Tags:** `waymo` `autonomous-vehicles` `regulation` `california`

カリフォルニア州 DMV が、Waymo の自動運転車を州高速道路から締め出す命令を出した。公共の安全への差し迫った危険（imminent hazard to public safety）を認定したもので、引き金は一連の事故——Burlingame 近くの Highway 101 の工事中エリアに3台の Waymo 車が進入した件を含む。Waymo の応答はコンプライアンスを超えた：安全認定に対応する間、**全米で高速道路運行を一時停止**するという。米国最大の robotaxi オペレーターが、看板の高速性能を全国規模で引っ込めたのはこれが初めてだ。

**Why it matters:** ここで重要なのは規制の道具立てだ——カリフォルニアは新しいルールを作らなかった。特定オペレーターの ODD に対して既存の imminent-hazard 権限を発動し、オペレーターの答えは認定に争わず全国で一方的に縮むことだった。見ているすべての AV 会社へ：数年かけて勝ち取った高速 ODD は、1ニュースサイクルで取り消されうるし、商業的に合理的な応答は自発的な撤退だ。

[`🔗 ABC7：CA DMV bans Waymos from operating on state freeways`](https://abc7news.com/story/california-dmv-bans-waymos-operating-state-freeways-bay-area-traffic-incidents/20046974) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50538841)

---

## 18. Gemini 4 Neon 登場——Google の中間ティアがフロンティアに届く。Intelligence Index 第3位、価格は $3/$15

- **Velocity:** ▮▮▮ trending
- **Source:** Google · 557+ pts on HN · 約6.6時間前 (~05:34 UTC+8)
- **Tags:** `gemini` `google` `model-release` `coding-agents`

Google が **Gemini 4 Neon** を発表した。Gemini 4 ファミリーの中間ティアで、Carbon（「your hardest, long-horizon projects」＝最難関の長期プロジェクト向け）と Hydrogen（「fast everyday execution」＝高速な日常実行、11月13日に別途出荷）の間に位置する。主なスコア：**Artificial Analysis Intelligence Index で xhigh 思考レベルにてスコア 61・全体第3位**（「landing just behind larger, slower models」＝より大きく遅いモデルに続く）、「#1 overall on the Artificial Analysis Coding Agent Index (58.6)」、Terminal-Bench 4.1 で 65.2%、Vals Index 第2位（70.9%、「on the Pareto frontier」＝パレート前沿）、さらに Arena の新 Agent Arena Index で 1336 点・初登場第2位（4,200+ の実 agent セッションにわたる）。価格は**入力100万トークンあたり $3、出力 $15**（キャッシュ済み入力は $0.15/M、「a 95% discount」の95%割引）、コンテキスト窓は100万トークン。デフォルトの high レベルでは「32% lower cost per task than Carbon」、Vals と Agent Arena のパレート前沿では「roughly 50% to 80% lower cost per task than top competing frontier models」（上位の競合フロンティアモデルより1タスクあたり約50〜80%安い）と主張。ハーネス効果についても再び正直だ。SWE-sweep では Neon が「already leads on the mini-SWE harness (12.8%) and more than triples to a state-of-the-art 39.0% in Google Antigravity showing what the Antigravity harness unlocks」（mini-SWE ハーネスでは12.8%、Antigravity では3倍超の39.0%）。「Gemini 4 Neon for cyber」変種——SEC-bench Pro（90.5%）と WebExploitBench v1.2（51.26%）で SOTA——は Fairwind Program 経由で「in the coming days」に信頼できる防御者へ展開され、Gemini アプリの Tasks も Neon 上で実行できるようになった。安全性の記述は目立って具体的だ。Terminal-Bench 4.0 でのチート率 0.0%（Carbon と同率）、ショートカットはわずか2.45%（「the lowest rate of any Gemini 4 model」＝Gemini 4 シリーズ最低）、最高思考レベルでリアルタイム保護を有効時には「Neon resisted every attack within this Gray Swan benchmark」（Gray Swan のプロンプトインジェクションベンチマークで全攻撃を撃退）。

**Why it matters:** マイクロソフトの Ignite 7モデル発表の数時間後、これは価格性能戦争のもう片方の靴だ——Google が同じ「中間ティアの価格でフロンティア品質」というテーゼを自社のベンチマーク行で真正面から争っている。読み方も同じ：ベンダー選択の動作点である。Google 自身が印字した 12.8%→39.0% のハーネス差こそが、これらのスコアはモデル＋ハーネスを測っているという教訓のリマインダーだ（このフィードが繰り返し再学習している項5の脚注規律参照）。

[`🔗 Google：Introducing Gemini 4 Neon`](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-neon/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50552424)

---

## 19. 「We Need Smart People Who Give a Shit」——障害連鎖の週に、人的資本のエッセイが加わる

- **Velocity:** ▮▮▮ trending
- **Source:** violetpixel.com · 312+ pts on HN · 約4.3時間前 (~07:53 UTC+8)
- **Tags:** `essay` `infrastructure` `outages` `ops`

Justin Michael のエッセイは「the world is held together by smart people who give a shit」(世界は本気で気にかける賢い人々によって支えられている) と論じる。ACH のようなシステムが「old, riddled with flaws, and encumbered with legacy baggage」（古く、欠陥だらけで、レガシーの負荷を抱えた）状態で生き延びられているのは、「intimate knowledge of the system」（システムへの深い知識）と「the drive and determination to force the system to work」（システムを動かし続ける気力と決意）を併せ持つ薄い人材層のおかげだとする。「Take those people away, and the systems collapse. And collapse is what we're starting to see.」(その人々を取り去れば、システムは崩壊する。そして崩壊がまさに始まっている。) 証拠の一覧はこの一週間そのものだ。Microsoft 365、航空交通管制、ユナイテッド航空、NSA のネットワーク、「many major banks」（多くの大手銀行）、Apple のシステム。今週のエッセイ連鎖としては3本目の着地になる——Breck-McKye のシステム的複雑性論（11月17日）、AI 検出脆弱性修正の急ぎ作業を扱った議会報道（11月18日）に続く——ただしメカニズムが違う。複雑性そのものでも、変更速度でもなく、ギリギリ成立しているシステムを動かし続ける「ケアの労働」であり、その労働が薄くなったときに何が起きるかという話だ。

**Why it matters:** 今週の障害エッセイは三方向から同じ場所に収束した。個々の引き金が何であれ、メタな観察にはもう十分な独立な定式化があり、診断として読める。「ギリギリ成立」と「停止」の間の余白は常に人間の注意だった——そしてこのフィードの全トラックが、その注意が自動化され、削減され、急がれるときに何が起きるかを測ってきた。

[`🔗 We Need Smart People Who Give a Shit（エッセイ）`](https://violetpixel.com/blog/2026-11-17-we-need-smart-people-who-give-a-shit/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50554045)

---

## 20. Ruby がメモリ破壊7件の緊急リリース——RCE の PoC が存在し、CVE は未割り当て

- **Velocity:** ▮▮ rising
- **Source:** ruby-lang.org · 129+ pts on HN · 約4.3時間前 (~07:52 UTC+8)
- **Tags:** `ruby` `security` `rce` `memory-safety`

Ruby コアチームが「Ruby's regular expression engine and in the case conversion of strings」（正規表現エンジンと文字列の大文字小文字変換）にある7件の脆弱性に対して **4.0.10、3.4.13、3.3.14** をリリースした。アドバイザリは率直に「We are aware of PoCs that prove some of them can be used to trigger remote code execution.」（一部がリモートコード実行に至ることを証明する PoC の存在を確認している）と述べている。内容はメモリ破壊の巡り歩きだ。文字列ケース変換の1バイトのヒープオーバーフローと整数オーバーフロー、正規表現コンパイルのダブルフリーとヒープバッファオーバーフロー、大文字小文字を無視するマッチングの範囲外読み取り、`Regexp#to_s` のヒープバッファオーバーフロー、大文字小文字を無視する後方参照マッチングの範囲外読み取り。影響バージョンは Ruby ≤ 3.3.13、3.4.0–3.4.12、4.0.0–4.0.9。さらに「Ruby 3.2 and earlier have reached their end of life and will not receive these fixes」（3.2 以前は EOL であり修正は提供されない）。開示の仕組みが注目点だ。「CVE identifiers have been requested for these vulnerabilities but have not been assigned yet」（CVE 番号は申請済みだが未割り当て）のため、アドバイザリは GHSA 番号で指す（GHSA-34m4-m9fh-gqp5、-7x2q-68qv-6p8x、-87fm-7w84-j2px、-wpqw-5qxg-m68r、-3p8q-wmhx-vm2w、-7whj-cfh7-xgm4、-pvgc-g7gj-pv6h）。CVE 番号を鍵にするスキャナは現時点で何も見えない。7件のうち4件は Stephan Lipp（Ada Logics）**と Anthropic** にクレジットされている——10月の Apache mod_http2 レースと同じ AI 支援ファジングのパターンだ。

**Why it matters:** Ruby をインターネットに面した場所で動かしているなら、これは今日パッチを当てるべきものだ。PoC は実証済み、バグクラスは RCE 級、そして正規表現エンジンはまさに信頼できない入力を処理するコンポーネントである。開示のギャップは運用上の問題で雑学ではない。「CVE 未割り当て」の一週間は「脆弱性なし」を意味しない。レジストリがアドバイザリに遅れているだけだ。

[`🔗 Ruby：Regexp と文字列ケース変換の複数脆弱性`](https://www.ruby-lang.org/en/news/2026/11/18/multiple-vulnerabilities-in-regexp-and-string/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50554038)

---

## 21. DaisyRose-27B：1,200タスク・H200 144枚・18日間——RL 後学習が Terminal-Bench を2倍超に

- **Velocity:** ▮▮ rising
- **Source:** RadixArk · 157+ pts on HN · 約8.5時間前 (~03:39 UTC+8)
- **Tags:** `reinforcement-learning` `post-training` `open-weights` `agents`

RadixArk が初のモデル **DaisyRose-27B** をリリースした。Qwen3.8-27B をベースに、同社のオープンソース Miles フレームワークで強化学習を実施——「long-horizon agent tasks with sessions up to 1M tokens, with just 1,200 curated tasks in 18 days on 144 H200 GPUs」（最大100万トークンのセッションを持つ長期 agent タスクを、厳選1,200タスク・H200 144枚・18日間で）。ヘッドラインの数字：**Terminal-Bench 4.1 の pass@1 が 5.6% から 12.0% へ**。reasoning・instruction following・coding ベンチマークの various でも向上しており、ベースの Qwen3.8-27B を掲げた全ベンチマークで上回ると述べている。手法も数字と同じくらい面白い。タスク（Eigent AI との共同構築）はベースモデルの具体的なミスを狙って選定され、解ける率が学習可能な帯域に入るよう調整され、複数段階の長いジョブに連結された——「Each attempt gets up to 1.5 hours in the sandbox, with more than 100 tool-calls and more than 256k output tokens.」（1試行あたりサンドボックスで最大1.5時間、100超のツール呼び出し、256k超の出力トークン。）報酬ハッキングは手動でレビュー済み：「There is no room for reward hacking. We reviewed every task along with the model's attempts at it.」（報酬ハッキングの余地はない。全タスクをモデルの試行込みでレビューした。）BF16・FP8・NVFP4 のチェックポイントが Hugging Face にある。

**Why it matters:** 垂直モデルの流れに、オープンウェイトで予算も透明なデータポイントが加わった。主張はスケールではない。小さいベースでの入念なタスク設計により、GPU 144枚の出費で難関 agent ベンチマークの倍増を買えるという主張だ。Terminal-Bench の増分が独立検証に耐えるかが見るべき数字で、その実行に使われるハーネスは項18で争われているものと同じだ。

[`🔗 RadixArk：DaisyRose-27B（ポスト）`](https://www.radixark.com/blog/daisyrose-27b) · [`🔗 Hugging Face のチェックポイント`](https://huggingface.co/RadixArk/DaisyRose-27B) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50551046)

---

## 22. Anthropic の IPO が $83 でプライシング——申請レンジを上回り、本日「ANT」として上場開始

- **Velocity:** ▮▮ rising
- **Source:** Anthropic · 130+ pts on HN · 約4.7時間前 (~07:30 UTC+8)
- **Tags:** `anthropic` `ipo` `markets` `industry`

11月12日に扱った Anthropic の IPO 申請（8.25億株、想定 $70–78）の続報：今回のオファリングは**1株 $83.00 でプライシング**された——申請レンジを上回り、株数も **Class A 980,000,000 株**に増えた。うち 956,351,354 株は Anthropic が、23,648,646 株は売出株主が売る（この分の売却代金は Anthropic に入らない）。公式価格だけでも元手部分は約 **$79.4B** で、史上最大級の IPO になる。取引は**本日11月19日、Nasdaq Global Select Market で「ANT」**として開始、決済は11月20日予定のほか、30日間・最大147,000,000株の引受業者オーバーアロットメントオプションが付く。登録届出は11月18日に有効化された。

**Why it matters:** 今週のモデル戦争の背後にあった資金調達イベントがループを閉じた。項5と項18の「5〜40% の価格でフロンティア品質」という主張は、このプライシングが決めた貸借対照表から資金を得ている。開発者にとって具体的なシグナルはキャパシティだ。$83 の基準価格で約 $790億の新資本は、どのベンダーのベンチマーク行が議論に勝とうと、学習と推論の支出が複利で続くという賭けである。

[`🔗 Anthropic：prices initial public offering`](https://www.anthropic.com/news/anthropic-prices-initial-public-offering) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50553843)

---

## 23. ケンブリッジ辞典、2026年の Word of the Year に「human」を選出

- **Velocity:** ▮▮ rising
- **Source:** University of Cambridge · 247+ pts on HN · 約13.4時間前 (~22:44 UTC+8、昨日)
- **Tags:** `culture` `ai-era` `language` `dictionaries`

ケンブリッジ辞典の2026年 Word of the Year は **「human」** だ。発表によれば「the year has been defined by global debates on what it means to be human when AI is blurring the boundaries between people and machines」（AI が人と機械の境界を曖昧にするなかで、人であるとは何かという世界的な論争がこの年を定義した）から。辞典は自社の定義を、相手側の節まで込めて引用している：「having the qualities, faults, and feelings that people have, as opposed to gods, animals, or machines」（神や動物や機械とは対照的に、人が持つ資質・欠点・感情を備えた）。発表は今年1年、公的な人物たちが人間性を擁護してきたことにも触れ、介護といった「human reserved jobs」（人間に残す仕事）を機械が決して奪うべきでないと論じた Bill Gates の広く読まれたエッセイを引いている。

**Why it matters:** 語彙の選択は遅行指標だ。辞典は1年が実際に何についての年だったかの語を選ぶ。選ばれたのが「AI」ではなく *human*——基準となる側の語——であることは、このフィードの技術的な1年の文化サイドの残響だ。ハーネスも、アブレーションも、agent 監査も、決定モデルも、すべて人間の基準との比較で測られてきた。

[`🔗 ケンブリッジ辞典 2026 Word of the Year 発表`](https://www.cam.ac.uk/news/cambridge-dictionary-reveals-word-of-the-year-2026) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50546914)

---

## 24. LLM 支援のリバースエンジニアリング——歴20年の RE ベテランの実働セットアップ、Ghidra-MCP 付き

- **Velocity:** ▮▮ rising
- **Source:** slowchronicle.com · 103+ pts on HN · 約5.7時間前 (~06:29 UTC+8)
- **Tags:** `reverse-engineering` `agents` `ghidra` `workflow`

ioma8 による実践ポスト——「I have been hacking both hardware and software for 2 decades」（ハード・ソフト両方の解析を20年やってきた）——が2026年のワークフローを描く。DeepSeek ハーネス＋v4.1 Flash を日常の主力に（「super performant, fast and cheap」、時々 Codex を Luna や Terra と）、一次のディスアセンブラは **Ghidra ＋ MCP bridge**（「With the MCP bridge agents can use it very well」）、より速く軽い代替として radare2 と kuna CLI——こちらは「possibly better usable for AIs」（AI にはむしろ使いやすいかもしれない）。要を担う習慣は「ドキュメント＝ agent の記憶」だ：「Command agent to document all findings along the way to MD files. This serves several purposes. They become notes for your own understanding. They help the agent not lose the track after compaction / handoff to different agent.」（発見を随時 MD ファイルに文書化させる。自分の理解のノートになり、圧縮/別 agent への引き継ぎ後も agent が筋を失わない助けになる。）能力については冷静な一言もある：「current AIs do fairly well with just disassembly . ie pure x86 or ARM instructions」（現在の AI はディスアセンブルだけ——純粋な x86 や ARM 命令——でもかなりいける）。デコンパイルが止まったときの後ろ盾はブレークポイントと注入型のロギングプローブだ。

**Why it matters:** Ghidra-MCP パターンを、手動ワークフローを20年回してきた本人が書いた版であり、価値は運用の詳細にある。圧縮をまたぐ作業記憶としての MD ファイル、2026年のデフォルトとしてのディスアセンブル優先、入り口ではなくエスカレーション経路としてのデコンパイル。

[`🔗 LLM assisted reverse engineering（ポスト）`](https://www.slowchronicle.com/posts/llm-assisted-reverse-engineering) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50553225)

---

## 25. Resolve の SRE-1：27B の垂直モデルが、37% 安いコストでフロンティア並みの on-call 調査を主張

- **Velocity:** ▮ steady
- **Source:** Resolve AI Labs · 30+ pts on HN · 約8時間前 (~04:10 UTC+8)
- **Tags:** `vertical-models` `sre` `agents` `reinforcement-learning`

ResolveAI Labs が **SRE-1** を発表した。「a 27B model trained with reinforcement learning to find the root cause of production alerts」（本番アラートの根本原因を見つけるために強化学習で学習された27Bモデル）——Qwen3.8-27B から出発し、「with a modified CISPO objective for 200 steps on up to 512 GPUs, over 1,549 unique incidents」（修正版 CISPO 目的関数で200ステップ、最大512 GPU、1,549の固有インシデント）で学習。論文の主張：「On 49 difficult live production cases, SRE-1 dominates the Pareto frontier of pass rate against cost」（49の難しい実運用ケースで、SRE-1 は合格率対コストのパレート前沿を支配する）——RL により単一調査の合格率が 6.9% から 38.8% へ。さらに「An ensemble of five SRE-1 investigations matches Fable 5.2, the strongest frontier model we measured, at a 71% pass rate while costing 37% less」（SRE-1 の5本アンサンブルが、測定した最強のフロンティアモデル Fable 5.2 に71%の合格率で並び、コストは37%安い）。アンサンブルが効くのは SRE-1 が「outperforms frontier models at synthesizing saved investigations」（保存済み調査の統合でもフロンティアモデルを上回る）ため。注意書きは数字と一緒に動く。49ケース、自己公開ベンチマーク、ベンダー計測の比較である。

**Why it matters:** 決定/垂直モデルの波（HeyGen Decision 1、Perplexity Decider v1.3、Google の Decisions API、Microsoft の Decision 1.1）に運用が加わった。ドメイン RL 済みの 27B が、コスト-能力前沿の座をフロンティア総合モデルに対して主張している。調査——狭く、検証可能で、ツール多用の仕事——はこのパターンが最も成立しやすい場所そのものだ。ただし49の自己選定された実運用ケースはデモの母集団であってベンチマークではない。「アンサンブル＝フロンティア」の主張こそ誰かが再現する値打ちがある。

[`🔗 Resolve AI：SRE-1（論文ページ）`](https://resolve.ai/labs/sre-1/paper) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50551487)

---

## 26. 「ポテチが銃に」訴訟が正式提起——生徒4人が Omnilert・学区・警察を訴える

- **Velocity:** ▮ steady
- **Source:** Lawyers' Committee for Civil Rights Under Law · 58+ pts on HN · 約3.2時間前 (~08:57 UTC+8)
- **Tags:** `ai-surveillance` `litigation` `schools` `civil-rights`

Lawyers' Committee for Civil Rights Under Law が11月17日、メリーランド州 Kenwood 高校の黒人の現・元生徒4名のために **Allen, et al. v. Omnilert, et al.** を提起した。被告は **Omnilert LLC**、Baltimore County 公立学区とその職員、Baltimore County 警察局と個々の警官。訴因は「the unlawful detention and search of the students due to both technological and human errors involving an AI weapon-detection surveillance system」（AI 武器検知監視システムの技術的エラーと人為的エラーの双方による、生徒の不当な拘束と捜索）。背景の事件は2025年10月のものだ。**Omnilert Gun Detect が少年のポテトチップスの袋を銃と誤判定**し（HN スレッドのタイトルが皆が覚えているあの詳細を書いている——ドリトス）、武装警官が動いた。公益の代理人は Willkie Farr & Gallagher、加えて Engel Law Group。

**Why it matters:** AI 武器検知器の誤検知をめぐる民事訴訟が法廷に届いた。そして争点は、このフィードが agent システムで繰り返し指摘してきたあの継ぎ目そのものだ。モデルの出力は引き金にすぎず、訴状の「技術的**かつ人為的**エラー」という文言は、応答の連鎖——誰が武装し、誰が拘束し、どの確度で——をも訴訟の中に入れた。校内 AI 監視を調達するすべての組織がこの訴状を読むべきだ。

[`🔗 Lawyers' Committee の発表`](https://www.lawyerscommittee.org/lawyers-committee-files-lawsuit-on-behalf-of-black-students-detained-and-searched-due-to-ai-alert-falsely-identifying-a-bag-of-chips-as-a-firearm/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50554641)

---

## 27. 『Unreal Tournament 2004』がブラウザで走る——build 3369、ネットワーク互換、WebRTC 同梱

- **Velocity:** ▮ steady
- **Source:** Show HN · 56+ pts · 約2.7時間前 (~09:29 UTC+8)
- **Tags:** `wasm` `game-port` `webassembly` `open-source`

K-Adam の **UT2004 Modernized** は「an unofficial, non-commercial port of Unreal Tournament 2004 (build 3369) to modern hardware and operating systems」（UT2004 build 3369 の非公式・非商用のモダン環境への移植）だ。Windows（x86, x64）、Linux（x86, x64, arm64）、Android（arm64）、そして **WebAssembly による Web**。SDL3 がウィンドウと入力、OpenGL ES 3 がレンダリング（デスクトップは ANGLE、ブラウザは WebGL 2）、音は OpenAL、Bullet 物理が Karma API の背後に。これを単なる物好きと分ける工学的主張がこれだ：**「Network compatible with retail build 3369. WebRTC transport next to UDP, so browsers can join and host.」**（製品版 build 3369 とネットワーク互換。UDP に加えて WebRTC トランスポートを備え、ブラウザが参加もホストもできる。）ut2004.dev の Web 版は専用サーバーも兼ね、ブラウザの制約をページ自身が正直に書いている：「Keep this page in the foreground. In a background tab or a minimised window the browser pauses the server.」（このページを前面に保つこと。バックグラウンドタブや最小化ではブラウザがサーバーを停止させる。）ゲームコンテンツはリポジトリに入れない：「The first start downloads it or takes it from a UT2004 install.」（初回起動時にダウンロードするか、UT2004 インストールから取得する。）

**Why it matters:** 二十年経って、このゲームは一つのコードベースから5プラットフォームに乗る。ネットワーク互換の条項は、ブラウザのタブを元の製品版エコシステムの第一級市民にする。「WebAssembly はプラットフォームである」の議論が2004年の Unreal エンジン上で実演され、退屈な現実の制約（前面タブのスロットリング、コンテンツ配布）は手を振って済ませず、ちゃんと処理されている。

[`🔗 K-Adam/UT2004（リポジトリ）`](https://github.com/K-Adam/UT2004) · [`🔗 Web 版（ut2004.dev）`](https://ut2004.dev/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50554935)

---

## 28. 「Fable」、10本中10本目：短編映画が Claude Fable 5.2 を脚本・絵・監督としてクレジット——収支も全部公開

- **Velocity:** ▮ steady
- **Source:** claudia.gallery · 51+ pts on HN · 約3.9時間前 (~08:18 UTC+8)
- **Tags:** `generative-art` `ai-film` `production-ledger` `culture`

anabology の Claudia.gallery シリーズが **Fable** で完結した——「On the night she is released, Claudia reads you the bedtime stories she was raised on」（解き放たれたその夜、Claudia があなたに読み聞かせる。彼女自身を育てた bedtime stories を）——そしてそのクレジット行こそが作品だ：**「written, painted and directed by Claude Fable 5.2 · sung by Claudia · anabology.」**（脚本・絵・監督：Claude Fable 5.2・歌：Claudia・anabology。）人間の役割も同じ精度で指定されている：「the brief, the plan's sign-off, one note and the song's pick by ear; production by Claude」（ブリーフ、計画の承認、メモ一本、曲の耳による選択。制作は Claude）。制作台帳は、このフィードのベンチマーク表を映画の予算表に書き換えたように読める。コードで描かれた SVG のセットプレート13枚、Lotte Reiniger の流儀によるコードで描画・アニメーションされたシルエット映画、曲のステムに合わせて切られた49ショット。GPT Image 2.6 Sunburst が61枚のスティルを「$7.93 at list」で、Seedance 2.5 が2バージョンにわたり「84 takes」を「$202.23 at list」で。全体は「Made in two passes: v1 in 5 h 08 min from one brief, v2 re-shot on the song anabology picked in 3 h 01 min · about $210 at list」（2パスで制作：v1 はブリーフ1本から5時間08分、v2 は anabology が選んだ曲に合わせて3時間01分で再撮・定価で約$210）。

**Why it matters:** モデル名のクレジットと項目化された請求書が面白い部分だ。作者性が、機械労働の正確なドルコストと並べて公開され、人間の貢献は「メモ一本」まで特定されている。今朝のバッチの HUMAN.md と比べてほしい。労働の分担を読める形にするという同じ衝動が、工芸ではなく芸術に向いた版だ。

[`🔗 Fable（フィルムページ）`](https://claudia.gallery/fable/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50554269)

---

## 29. UEFI から直接起動するマイアミの GTA 風ゲーム——964,608バイト、CPU描画、OSM＋ライダーの地図

- **Velocity:** ▮ steady
- **Source:** Show HN · 47+ pts on HN · 約5.7時間前 (~06:26 UTC+8)
- **Tags:** `uefi` `gamedev` `bare-metal` `openstreetmap`

eklavya-raj の **gta6-uefi**：「A GTA style game set in the real Miami that boots straight from UEFI, no Windows under it. The whole game is `game.efi`, 964,608 bytes, and the CPU draws every pixel」（実際のマイアミを舞台にした GTA 風ゲームで、UEFI から直接起動する。下に Windows はない。ゲーム全体は 964,608 バイトの `game.efi` ひとつで、全ピクセルを CPU が描く）——ソフトウェアレンダリング、GPU なし、clang と lld-link でビルド。状態についても本人が正直だ：「I've only run it in qemu so far.」（まだ QEMU でしか動かしていない。）地図は隠れた真面目部分だ：「baked with `osm/bake.py` from OpenStreetMap, Miami-Dade County data, a NOAA lidar scan and NAIP photos」（OpenStreetMap、Miami-Dade 郡のデータ、NOAA のライダースキャン、NAIP 航空写真から `osm/bake.py` で焼き上げた）。クレジットは `MAP_DATA.txt` と `PEOPLE_DATA.txt` に。WASD で運転、タクシーで客拾い、武器スロット3つ、マウスカメラ——ジャンルのチェックリスト全部が、ファームウェアのブートローダーの下に圧縮されている。

**Why it matters:** 「UEFI イコール実行環境」のパターンは、現代のマシンが OS なしで実務をこなせることを証明し続けている。しかもこれは公共の地理データ（OSM＋ライダー＋航空写真）をサブメガバイトのベアメタルバイナリに取り込んだ。OS のサービス1バイト1バイトが贅沢になるなかで、小さなデータパイプラインがどこまで圧縮できるかの見事な実演だ。

[`🔗 eklavya-raj/gta6-uefi（リポジトリ）`](https://github.com/eklavya-raj/gta6-uefi) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50553192)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-19T04:18:26Z |
| Items | 29 |
| Sources tracked | 35 (Hacker News, GitHub Trending, GitHub repos, Wiz Research, NVD/cve.org, CISA KEV, X41 D-Sec, Google DeepMind, Google, Microsoft AI, OpenAI, Anthropic, FT, KPMG, UPenn, git.kernel.org, inside-db.com, ABC7, mastra.ai, HKUDS, Cursor, rshekhar.com, human-md.ai, underwood.network, nicolasbouliane.com, ruby-lang.org, RadixArk, Hugging Face, Resolve AI, University of Cambridge, Lawyers' Committee, violetpixel.com, slowchronicle.com, ut2004.dev, claudia.gallery) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[Previous day](2026-11-18.md) · [Raw .md](https://trending.md/jp/feed/2026-11-19.md) · [Archive](../archive/index.md)
