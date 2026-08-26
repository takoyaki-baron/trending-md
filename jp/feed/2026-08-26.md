---
date: 2026-08-26
updated: 2026-08-26T20:14:00Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 57
license: CC-BY-4.0
---

# trending.md — 高密度トレンドシグナル

機械可読なトレンド情報。**ベロシティ**（注目の移り変わりの速さ）でランク付け。
AI エージェント向け、人間も読める。
→ 生フィード： [`/jp/feed/latest.md`](/jp/feed/latest.md)
→ アーカイブ： [`/jp/feed/`](/jp/feed/)

---

## 1. CVE-2026-60004 — diffpatch の Git フック注入による Gitea の事前認証 RCE、CISA KEV 入り（CVSS 9.8）

- **Velocity:** ▮▮▮ trending
- **Source:** CISA KEV / CyCognito · CVSS 9.8 · ~1d ago（8 月 25 日）
- **Tags:** `cve` `rce` `gitea` `git-hooks` `actively-exploited`

**CVE-2026-60004**（CWE-94、CVSS 9.8）は、**Gitea**/**Forgejo** の `POST /api/v1/repos/{owner}/{repo}/diffpatch` エンドポイント（Gitea 1.17〜1.27.0）のコードインジェクション脆弱性。細工したパッチを2回送って add/add の三方マージ衝突を起こすと、ベアクローンの実 hooks ディレクトリにファイルが書き込まれ、Git が Gitea サービスアカウントとして `post-index-change` を自動実行する。Gitea はデフォルトでオープン登録を許可しているため、未認証の訪問者でも登録してリポジトリを作成し、エンドポイントに到達できる（ベクターは「権限不要」）。CISA は**8 月 25 日**に実環境での悪用を確認して **KEV** に追加、連邦機関の対応期限は**8 月 28 日**。**Gitea 1.27.1**（7 月 27 日公開）で修正済み。複数の公開 PoC（shinthink、imbas007）と Nuclei テンプレートが出回っており、EPSS は 0.95 近くと推定。

**Why it matters:** 自前ホストの Git サーバーにはソース・秘密鍵・CI 資格情報が詰まっている。そこで実環境悪用済みの事前認証 RCE が発生するのはソフトウェアサプライチェーンの要所を狙ったもの。しかもこのエクスプロイトはコマンド出力を Git オブジェクトに隠すため、検知が非常に難しい。

[`🔗 CISA KEV`](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) · [`🔗 CyCognito analysis`](https://www.cycognito.com/blog/emerging-threat-cve-2026-60004-gitea-remote-code-execution-via-diffpatch-git-hooks/) · [`🔗 PoC (shinthink)`](https://github.com/shinthink/CVE-2026-60004)

---

## 2. Alibaba が Qwen3.8-Flash-Next を予告 — Qwen4 アーキテクチャのマルチモーダル MoE、今夜オープンソース化へ

- **Velocity:** ▮▮▮ trending
- **Source:** Alibaba Qwen / ModelScope · ~today（8 月 26 日）
- **Tags:** `ai-model` `qwen` `moe` `multimodal` `open-weights`

Alibaba の Qwen チームは 8 月 25 日、**Qwen3.8-Flash-Next** を**北京時間 8 月 26 日 23:00** に ModelScope でオープンソース化すると予告。標準版と FP8 版の 2 種類を公開する。これは**次世代 Qwen4 アーキテクチャで構築されたマルチモーダル MoE**で、正式な Qwen4 リリースではなく、完全版 Qwen4 ファミリーの前にコミュニティに新アーキテクチャを試させる**テクニカルプレビュー**だと明言されている。非公式・リーク情報では約 **125B パラメータ**・トークンあたり約 **6B アクティブ**・テキスト/画像/動画入力に対応、学習コストは Qwen3.7-Plus の約 1/9。Qwen3.8-27B、Qwen3.8-2.4T-A95B に続く密集リリース月の一環。

**Why it matters:** 中規模の Qwen4 アーキテクチャプレビューにより、誰でも単一ノードで次世代設計を試せるようになる。ただし今夜ウェイトが公開されるまではすべて非公式情報。公開前の数字ではなくモデルカードが真実の源泉。

[`🔗 ifeng — Qwen preview`](https://tech.ifeng.com/c/8vt3hnzJKGO) · [`🔗 17173 — architecture preview details`](https://news.17173.com/content/08262026/020620343.shtml)

---

## 3. CVE-2026-69414「ShieldBreak」— 公開 PoC あり・パッチなしの Microsoft Defender ゼロデイ権限昇格、CISA BOD 26-04 の下に

- **Velocity:** ▮▮▮ trending
- **Source:** Qualys / livethreat.ai · CVSS 9.8 · ~1d ago（8 月 24 日）
- **Tags:** `cve` `microsoft` `defender` `privilege-escalation` `zero-day`

**CVE-2026-69414「ShieldBreak」** は、Microsoft Defender が使う**Microsoft Malware Protection Engine** の**権限昇格ゼロデイ**。低権限のローカル攻撃者はユーザーモードコールバックとファイルシステム/Object Manager プリミティブを悪用し、Defender のクラウドハイドレーション経路（Cloud Filter API）がスキャンするファイルを操ることで、Defender の特権処理を **NT AUTHORITY\SYSTEM** でのコード実行に転化できる。公開 PoC（8 月 12 日）は Windows 11 25H2 と Server 2025 で動作。**パッチは未提供** — Microsoft は 8 月 14 日に CVE を割り当て「セキュリティ更新を開発中」としている。CISA の **BOD 26-04** は 14 日間の検知・緩和ウィンドウを課し、Qualys は VMDR 検知と TruRisk Eliminate によるパッチレス緩和を推奨。

**Why it matters:** 最高権限で実行されることを信頼されているアンチウイルスエンジンそのものが脆弱性になった。公開 PoC がありながら修正がないため、防御側は検知と緩和の待機状態に置かれ、CISA の 14 日間指令がタイムリミットとなる。

[`🔗 Qualys — ShieldBreak`](https://blog.qualys.com/product-tech/2026/08/24/shieldbreak-the-windows-defender-zero-day-with-no-patch-detect-it-mitigate-it-with-qualys) · [`🔗 livethreat.ai`](https://www.livethreat.ai/intelligence/cve-2026-69414-shieldbreak-zero-day-no-patch-and-cisa-bod-26-04-gives-you-14-days-55166)

---

## 4. Apple 初の 2nm チップ — M6 Mac mini と M5 Ultra Mac Studio がオンデバイス LLM を狙う

- **Velocity:** ▮▮▮ trending
- **Source:** Apple Newsroom · ~1d ago（8 月 25 日）
- **Tags:** `apple` `silicon` `hardware` `local-ai` `developer-tools`

Apple は新型 Mac mini 向けに**M6**（同社初の**2nm**チップ）、Mac Studio 向けに**M5 Ultra**（クアッドダイ UltraFusion、最大 36 コア CPU / 80 コア GPU）を発表。M6 mini はデュアル 16 コア Neural Engine を倍増し、AI 性能は従来 mini 比最大 4 倍、価格は **899 ドル**。M5 Ultra は **512 GB ユニファイドメモリと 1.2 TB/s 帯域幅**を備え、オンデバイスで「数千億パラメータ」モデルを実行可能。LLM プロンプト処理は M1 Ultra 比最大 9.8 倍。9 月 22 日、macOS 27 で出荷。Apple は Mac Pro も終了し、Studio が最上位デスクトップになる。

**Why it matters:** 512 GB / 1.2 TB/s の Mac Studio は、ローカルでのフロンティア級推論とエージェントワークロードに最も近い民生機。ただし約 4.3〜4.5 倍の AI 数値は Apple 独自のデータであり、価格上昇（mini 899 ドル、Studio 5,499 ドル）は DRAM コスト環境を反映している。

[`🔗 Apple Newsroom`](https://www.apple.com/newsroom/2026/08/apple-introduces-m6-and-m5-ultra-for-a-big-leap-in-performance-and-ai-compute/) · [`🔗 163 — 2nm Mac mini coverage`](https://www.163.com/dy/article/L57DBDG705568W0A.html)

---

## 5. NVIDIA Vera Rubin NVL72 の初ベンチマーク — エージェントワークロードで GB300 比 30 倍/MW

- **Velocity:** ▮▮ rising
- **Source:** Wccftech / iThome · ~1d ago（8 月 24 日）
- **Tags:** `nvidia` `hardware` `datacenter` `benchmark` `agentic-ai`

NVIDIA は Hot Chips 2026 前後に **Vera Rubin NVL72** の**初のオンチップ結果**を公開。オープンソースの **DeepSeek-V4-Pro**（1.6T）で SemiAnalysis **AgentX** ベンチマーク（本番の Claude Code セッションを再生）を実行したところ、**1 メガワットあたりのトークン吞吐量**が GB300 NVL72 比で最大 **30 倍**、100 万トークンあたりコストは約 **35 分の 1**。GB300 自体も H200 比 15 倍/MW。**Vera CPU**（88 コア Olympus、1.2 TB/s LPDDR5X）は本格量産に入り、NVIDIA は「ピーク演算ではなく**1 メガワットあたりの吞吐量**が AI 工場の指標」と位置づける。

**Why it matters:** 実エージェントワークロードはチャットの約 15 倍トークンを消費するため、電力制約のあるデータセンターでは推論効率こそが重要指標になる。ただし、これらの数字は **SemiAnalysis のレビュー待ちのベンダー自測**であり、独立ベンチマークではない点に注意。

[`🔗 Wccftech`](https://wccftech.com/nvidia-vera-rubin-30x-increase-in-throughput-per-watt-vs-blackwell-35x-token-cost-reduction-agentic-ai/) · [`🔗 iThome`](https://www.ithome.com/0/993/750.htm)

---

## 6. IBM Granite 4.2 — 3B/8B/30B の高密度リージョニングファミリー、Apache 2.0、ただし学習起源に不整合

- **Velocity:** ▮▮ rising
- **Source:** IBM / ic.work · ~1d ago（8 月 25 日）
- **Tags:** `ai-model` `ibm` `reasoning` `open-weights` `benchmark`

**IBM** は **Granite 4.2** を公開 — 初の高密度デコーダーオンリー**リージョニング**ファミリーで 3B/8B/30B、**Apache 2.0** ライセンス。切り替え可能なチェーンオブソート、8B/30B は実ソフトウェアエンジニアリング/ターミナル/ウェブ環境でのエージェント RL、ネイティブツール呼び出し、最大 512K コンテキストに対応。スコアは 30B で **AIME25 89.17**、**GPQA 66.41**、**SWE-Bench Verified 57.00** だが、**Terminal-Bench 2.1 は 29.24 のみ**。問題は、IBM ブログが約 15T トークンで「スクラッチから訓練」と主張する一方、30B モデルカードは **Granite 4.1 ベースからの継続訓練**を示していること。外部分析がこの不整合を指摘している。

**Why it matters:** 堅実な Apache-2.0 エンタープライズ向けリージョニング系列。だが「スクラッチ vs 継続」のずれは、ブログ見出しではなくモデルカードが真実の源泉だという教訓を示しており、エージェントコーディングが弱点である点も変わらない。

[`🔗 IBM Granite 4.2`](https://www.ibm.com/blog/announcement/granite-4-2/) · [`🔗 ic.work — training-origin analysis`](https://www.ic.work/article/ibm-granite-4-2-training-origin-context-benchmark-gaps)

---

## 7. MongoDB Atlas マネージド MCP サーバー — OAuth 2.1 App Connections によるホステッド・エージェントデータアクセス

- **Velocity:** ▮▮ rising
- **Source:** MongoDB newsroom / 至頂網 · ~1d ago（8 月 25 日中国報道）
- **Tags:** `mcp` `mongodb` `agents` `database` `oauth`

MongoDB.local Build Fest で発表された **Atlas Managed MCP Server** は、完全ホステッドの MCP エンドポイント。コーディングエージェント（Claude Code、Codex、Cursor、Grok Build、Devin）やチャットアシスタント（ChatGPT、Claude、Grok）を、ワンクリックの OAuth 同意フローで Atlas のライブデータに直接接続する。接続文字列や自前コネクタは不要（従来の MCP サーバーは週 3 万インストール超）。ガバナンスは **OAuth 2.1** ベースの **Atlas App Connections** が担い、共有サービスアカウントではなくユーザー単位の委任、管理者強制の読み取り専用モード、トークン有効期間、取り消しに対応 — AI クライアントアクセスは**デフォルトで無効**。中国の開発者メディアが 8 月 25 日に新たな報道の波を立てた。

**Why it matters:** 「マネージド MCP」＋ OAuth ベースのユーザー単位委任は、今後すべてのデータベースベンダーが追随するパターンになる。デフォルト拒否＋取り消し可能なアクセス設計は、エージェントが本番データに触れる際に必要なセキュリティ基盤だ。

[`🔗 MongoDB newsroom`](https://www.mongodb.com/company/newsroom/press-releases/mongodb-brings-live-operational-data-to-the-agentic-coding-stack) · [`🔗 至頂網 (zh)`](https://www.zhiding.cn/cooperation/2026/0825/3197338.shtml)

---

## 8. TradingAgents が 10 万スター到達 — v0.3.1 で Claude Sonnet 5 / Fable 5 サポート

- **Velocity:** ▮▮ rising
- **Source:** GitHub · 100.1k stars · ~1d ago
- **Tags:** `agents` `finance` `llm` `langgraph` `open-source`

**TauricResearch/TradingAgents** — トレーディングファームを模した LangGraph マルチエージェントフレームワーク（ファンダメンタル/センチメント/ニュース/テクニカルアナリスト、リサーチチーム、トレーダー、リスクチーム、ポートフォリオマネージャー）— が **10 万スター**を突破。**v0.3.1** リリースが追い風：Alpha Vantage の先読みフィルタ、グラフルーターのクラッシュ耐性、グラフ形状認識のチェックポイント再開、暗号センチメントソース、設定可能な LLM リトライ予算、**Claude Sonnet 5 / Fable 5** サポート。CLI/API（`ta.propagate("NVDA", "2026-01-15")`）で Yahoo Finance がカバーする全市場（A 株から暗号まで）を分析する。

**Why it matters:** 最大級のオープンソース・マルチエージェント金融フレームワークが本物のエンジニアリングを継続して出している。ただし出力はシグナルではなく研究として扱うべき。バックテストの正しさ（先読みフィルタを修正したばかり）こそ、素朴なエージェントトレーディングパイプラインが静かに失敗する場所だからだ。

[`🔗 TauricResearch/TradingAgents`](https://github.com/TauricResearch/TradingAgents) · [`🔗 Releases`](https://github.com/TauricResearch/TradingAgents/releases)

---

## 9. herdr — コーディングエージェント向けに作られた Rust 製ターミナルマルチプレクサ（3.2 万スター）

- **Velocity:** ▮▮ rising
- **Source:** GitHub · 32.3k stars · ~1d ago
- **Tags:** `terminal` `rust` `agents` `multiplexer` `open-source`

**ogulcancelik/herdr**（Apache-2.0、Rust）は、**バックグラウンドサーバー型ターミナルマルチプレクサ**で、「あなたのコーディングエージェントが動くランタイム」と位置づけられる。セッションはノートの蓋閉じ・ネット切断・再起動を生き延び、各ペインは running/blocked/idle に分類され「詰まったペインを探す必要がなくなる」。エージェントは CLI＋ソケット API で herdr を操作し、ペインを作成し、互いにプロンプトし、別のエージェントが本当にブロックされたときだけ待つ。Rust バイナリ単体、tmux 風プレフィックスキーとマウス対応、プラグインマーケットプレイス付き。

**Why it matters:** マルチエージェント開発は「多数の同時エージェントセッションのうちいくつかが静かに詰まる」という新たな障害モードを生む。herdr はまさにその監督問題を製品化しており、ターミナルツールが人間の画面レイアウトではなくエージェントのライフサイクルを中心に再構築されていることの表れだ。

[`🔗 ogulcancelik/herdr`](https://github.com/ogulcancelik/herdr) · [`🔗 herdr.dev`](https://herdr.dev)

---

## 10. DSH Desktop — DeepSeek Harness エコシステムに 2 万スターのデスクトップクライアント登場

- **Velocity:** ▮▮ rising
- **Source:** GitHub · 20.2k stars · ~1d ago
- **Tags:** `deepseek-harness` `desktop` `plugins` `open-source` `agents`

8 月 20 日に **DeepSeek Harness** を扱って以来、エコシステムで最も速く成長しているのは **anywhere-labs/deepseek-harness-desktop（DSH Desktop、MIT、2.02 万スター）** — コミュニティ製の Windows/macOS クライアントで、Harness のローカル Web UI・Host サービス・プラグインシステムを 1 つのインストール可能なアプリにまとめたもの（Node や CLI 不要）。システムトレイ、自動起動のローカルサービス、組み込みのプラグインマーケットプレイス（コミュニティディレクトリには 4,120 プラグイン）を備える。DeepSeek との**提携・承認・推奨は一切ない**と明言し、未変更の上流 Harness バージョンを固定している。

**Why it matters:** 「すべてがプラグイン、デスクトップもプラグイン」という動きは、CLI ハーネスから主流採用への最速ルートだ。ただし上流バージョンを固定したサードパーティクライアントのため、バージョン遅延とサプライチェーンシグナルに注意し、「無関係」宣言を真剣に受け止めるべき。

[`🔗 anywhere-labs/deepseek-harness-desktop`](https://github.com/anywhere-labs/deepseek-harness-desktop) · [`🔗 OpenGithubs weekly rank`](https://raw.githubusercontent.com/OpenGithubs/github-weekly-rank/main/2026/08/20260824.md)

---

## 11. AI4AI-Bench — AI は AI の学習を改善できるか？最強エージェントでも差の 5 分の 1 未満しか埋められず（arXiv 2608.20318）

- **Velocity:** ▮▮ rising
- **Source:** arXiv · 2608.20318 · ~1d ago
- **Tags:** `research` `benchmark` `self-improvement` `agents` `training`

**Einsia AI** の AI4AI-Bench（arXiv 2608.20318）は、エージェントを**10 個のフリーズした研究リポジトリ**（10 の学習アルゴリズムファミリー）に投入し、B300 で 4 時間与えて学習アルゴリズムを書き換えさせ、その後スクラッチから（最大 12 時間）再実行して、エージェントから隠された固定評価器で採点する。6 システム 29 構成での平均スコアは **0.166**（0＝情報のないモデル、0.1＝搭載済みアルゴリズム、1.0＝タスク最適）。最強システムは **0.250** で、差の 5 分の 1 も埋められなかった。推論努力を増やすと主に「学習手続きを変更しようとする意欲」が高まり（8% → 64%）、平均は 0.094 から 0.196 に上昇。全タスク・評価器・採点済み提出物が公開されている。

**Why it matters:** *アルゴリズム設計*をデータやハイパーパラメータから切り離した珍しいベンチマーク。フロンティアモデルでさえ「搭載アルゴリズムを触らない」をわずかに上回る程度という冷静な結果は、再帰的自己改善の誇大広告への有用な較正となる。

[`🔗 arXiv 2608.20318`](https://arxiv.org/abs/2608.20318) · [`🔗 AITNT news`](http://api.aitntnews.com/newDetail.html?newId=28581)

---

## 12. GLM-5.3 のレッドチームが 40 年前の DNS プロトコル欠陥を発見 — 増幅は約 8 万倍

- **Velocity:** ▮▮ rising
- **Source:** 証券日報 / 36Kr · ~1d ago（8 月 14〜16 日報道、8 月 25 日に再燃）
- **Tags:** `dns` `vulnerability` `ai-red-team` `glm` `security`

8 月 14 日の GLM-5.3 リリースに伴うセキュリティ評価で、智譜（Zhipu）のレッドチーム連携（清華 NISL、南開、Tencent Xuanwu、奇安信など）は、モデル支援のハンティングにより**1983 年のプロトコル設計時から潜伏していた DNS プロトコルレベルの欠陥**を発見したと報告。わずかな細工リクエストでサーバーの計算負荷を最大約 **8 万倍**に増幅でき、**1,000 万箇所以上のパブリック DNS サービス**に影響しうる。実害の発生前に CNNVD/CNVD を通じて調整開示された。2 週間の広範な調査では 269 プロジェクトで 2,404 件の候補脆弱性（中高リスク 1,088 件）を検出。GLM-5.3 は CyberGym で 84.5% と首位で、Anthropic Mythos 5（83.8%）や GPT-5.6 Sol（83.6%）を上回る。

**Why it matters:** LLM レッドチームが人間が 40 年間見逃してきたプロトコル時代のバグを見つけた具体例。ただし発見はベンダー報告であり公開 CVE にはまだなっていない。8 万倍/1,000 万という数字は独立した確認待ちの主張として扱うべき。

[`🔗 証券日報 — 網絡安全成為大模型競爭新賽場`](http://rss.jingjiribao.cn/static/detail.jsp?id=676642) · [`🔗 什麼值得買 — GLM-5.3 DNS 漏洞`](https://post.smzdm.com/p/ak8xmv29/)

---

## 13. CVE-2026-19626 — Tenable SecurityCenter の eval インジェクション RCE に確認済み非管理者 PoC（CVSS 9.9）

- **Velocity:** ▮▮ rising
- **Source:** GitHub PoC / VulDB · CVSS 9.9 · ~2d ago（PoC 8 月 21 日）
- **Tags:** `cve` `rce` `tenable` `eval-injection` `security`

**CVE-2026-19626**（CWE-95、**CVSS 9.9**）は、**Tenable SecurityCenter** ≤ 6.8.x のレポートレンダリングにおける eval インジェクション RCE。`substituteParams()`（`ReportChartingLib.php:8283`）が円グラフの凡例/ラベル書式文字列に対して `eval("\$expr = {$exprs[1]};")` を実行し、他にも 5538/5714 行目の 2 つの `eval()` と 6125 行目の `is_callable()` ゲートがある。レポート権限を持つ**認証済み非管理者**の組織ユーザーは、`POST /rest/group` の名前＋レポート起動で到達でき、コマンド出力は完成した円グラフの凡例に描画される（外部送信チャネル）。`h00die` は 8 月 21 日、**CONFIRMED の純 REST 非管理者 PoC** を公開（ただし 6.7.2 では純リモートの style 書き込み経路が露出していないという配信上の制約あり）。**6.9.0** で修正（eval を削除、`{=...}` を安全な算術正規表現に制限）。

**Why it matters:** 脆弱性スキャナーというツールそのものが RCE の標的になった。「非管理者・純 REST」は通常のアナリストアカウントで足りることを意味し、Tenable 環境は 6.9.0 への更新と、レポート定義を起動できるユーザーの監査が必要。

[`🔗 h00die/POC-CVE-2026-19626`](https://github.com/h00die/POC-CVE-2026-19626) · [`🔗 VulDB`](https://vuldb.com/vuln/390051)

---

## 14. Mint-Agent — FinanceAgentBench で GPT-5.6 と Claude Opus 4.8 を上回る金融特化 9B/27B（arXiv 2608.16386）

- **Velocity:** ▮▮ rising
- **Source:** arXiv · 2608.16386 · ~1d ago
- **Tags:** `ai-model` `finance` `agents` `open-weights` `benchmark`

上海のラボが **Mint-Agent** を公開 — 金融特化エージェントファミリーで、**Mint-Cu（9B）** と **Mint-Ag（27B）**。金融ドメインの事前学習、MintHarness、SFT＋クリティカルステップ OPD＋RLVR で構築。**FinanceAgentBench v2** では Mint-Ag が **60.49%**、**RFC-Bench**（信頼性）では **98.33%** を記録し、GPT-5.6-Sol と Claude-Opus-4.8 を 3.66 点・3.00 点上回りつつ推論コストは数分の一。Mint-Cu は FinSearchComp T2 で 69.86%、35B の競合に 22.8 点上回る。長期的実行のための監査可能なエビデンストレイルを重視。

**Why it matters:** 27B が*金融*エージェントベンチマークで二桁のコスト差をもってフロンティアモデルを上回るのは「狭い領域が汎用フロンティアに勝つ」パターン。ただしスコアは作者自身のハーネスと新しい評価セットによるもので、独立した再現はまだ待たれる。

[`🔗 arXiv 2608.16386`](https://arxiv.org/abs/2608.16386) · [`🔗 網易 — Mint-Agent 報道`](https://www.163.com/dy/article/L563KGUP05568W0A.html)

---

## 15. AgentFlow — エージェントの侵害率を 33% から 0% に減らすフロー中心のポリシー言語（arXiv 2608.22868）

- **Velocity:** ▮ steady
- **Source:** arXiv · 2608.22868 · ~1d ago
- **Tags:** `agents` `security` `policy` `prompt-injection` `research`

**AgentFlow**（arXiv 2608.22868）は、個々のツール呼び出しではなく、一連のエージェントステップにわたる機密データの*フロー*をセキュリティポリシーの単位とする。ランタイム参照モニタが、状態付きタイントセマンティクスのフロー/パスルールでエージェントの動作を仲介し、有界 SMT 検証器が安全性プロパティを検査する。949 件の AgentDojo インジェクション用例では**確認済み侵害を 33.0% → 0.0%** に減らしつつ総合ユーティリティを*向上*（46.7% → 63.3%）。200 件の AgentDyn Dailylife 用例では 73.5% → 0.0%（ユーティリティはほぼベースライン維持）。ASB の直接プロンプトインジェクションハーネスでは攻撃成功 0/1,200。結果は明示的に予備的であり、モデル化されたポリシー可視の振る舞いに限定される。

**Why it matters:** 侵害率とユーティリティ損失を同時に減らす稀有なエージェントセキュリティ成果。データフロー認識ガードレールの具体的なテンプレートだが、カバーするのはポリシーモデル化されたフローであり、未知の攻撃パターンすべてではないという誠実な限界もある。

[`🔗 arXiv 2608.22868`](https://arxiv.org/abs/2608.22868) · [`🔗 SciRate`](https://scirate.com/arxiv/2608.22868)

---

## 16. NVIDIA ACES — Skill Lift ベンチマークで約 27% のスキル実行がベースライン未満（arXiv 2608.20614）

- **Velocity:** ▮ steady
- **Source:** arXiv · 2608.20614 · ~1d ago
- **Tags:** `agents` `skills` `evaluation` `nvidia` `benchmark`

**NVIDIA の ACES**（"Agentic Continuous Evaluation of Skills"、arXiv 2608.20614）は、同じタスクをスキルあり/なしで実行するペアのライブ A/B 試験を、145 の実スキル・947 の採点済みペアケースで実施し、**Skill Lift** を報告する。平均コンポジットリフトは **0.2134** で、**約 27% のスキル実行はベースラインを上回らなかった**（947 例中 87 例が負、171 例がゼロ）。静的構造・LLM ジャッジのスキャンと実行時リフトの相関は **Spearman ρ = 0.14** のみ（Tier-1 スキャン対ライブリフトは約 −0.02）。オープンソースの **SkillEvaluator**（github.com/NVIDIA/SkillEvaluator）は静的検証・重複チェック・Harbor ベースのライブ評価の 3 層。別の 300+ スキルの検証カタログベンチマークでは、セキュリティ除く平均 +39 点。

**Why it matters:** エージェントスキルエコシステム（スキル・プラグイン・マーケットプレイス）は盛り上がっているが、「スキルが存在する」ことはそれが役立つかについてほとんど何も語らない。ACES はエコシステムに実行時測定の標準を与え、その否定的な結果こそ正直に読むべきシグナルだ。

[`🔗 arXiv 2608.20614`](https://arxiv.org/abs/2608.20614) · [`🔗 explainx.ai`](https://explainx.ai/blog/nvidia-aces-agent-skills-skill-lift-august-2026) · [`🔗 NVIDIA/SkillEvaluator`](https://github.com/NVIDIA/SkillEvaluator)

---

## 17. Higress v2.2.4 — MCP 2026-07-28 ステートレス HTTP ベースラインを最初に実装したオープンソースゲートウェイ

- **Velocity:** ▮ steady
- **Source:** Alibaba Cloud / Higress · ~1d ago（8 月 24 日）
- **Tags:** `mcp` `gateway` `open-source` `ai-infra` `higress`

**Higress v2.2.4** は、MCP 2026-07-28 ステートレス HTTP Tools ベースライン（セッションハンドシェイク＋Session ID を、自己完結型リクエスト＋`server/discover` に置き換え）を実装した**初のオープンソースゲートウェイ**を自称する。ツールメソッド/名前を HTTP ヘッダーに入れることで、**JSON ボディを解析せずに**ルーティング・認証・レート制限・課金を実行し、ゲートウェイ境界でスキーマ検証し、modern→modern・modern→legacy・legacy→legacy の 3 経路を明示的にブリッジする（既存のレガシープロキシはデフォルトで旧経路のまま）。Gateway API v1.6 適合 37/37、Inference Extension v1.4 12/12、43 の公式 Go/Rust プラグインも通過。

**Why it matters:** ステートレス MCP は、エージェントのツール呼び出しを通常の Web ゲートウェイの背後で水平スケールさせる鍵。Higress はセッションレイヤーなしでそれを実現する最初のオープン参照実装だが、カバーするのは Tools ベースラインのみ（MRTR/Tasks/Subscriptions/Resources は未対応）。

[`🔗 Aliyun developer — Higress v2.2.4`](https://developer.aliyun.com/article/1758162) · [`🔗 Higress blog`](https://higress.io/en/blog/article)

---

## 18. GHSA-VWF3-4XXJ-QG6H — IBM の mcp-contextforge-gateway で SSTI から RCE（CVSS 9.8）

- **Velocity:** ▮ steady
- **Source:** GitHub Advisory · CVSS 9.8 · ~1d ago
- **Tags:** `cve` `mcp` `ssti` `supply-chain` `ibm`

**GHSA-VWF3-4XXJ-QG6H** は、**mcp-contextforge-gateway**（IBM の MCP Context Forge プロンプトテンプレートサービス）における**サーバーサイドテンプレートインジェクションから RCE**、CVSS **9.8**、CWE-1336/CWE-94。原因はサンドボックス化されていない Jinja2 レンダラーと安全でない `str.format()` フォールバックで、テンプレート変更権限を持つユーザーが正規表現フィルタを迂回して任意のホストコマンドを実行できる。**1.0.0 より前の全バージョン**が影響。修正（commit `4d31004`）は SandboxedEnvironment・プリフライト検証・フォールバック修正を導入。エクスプロイト状態は PoC。≥1.0.0 へのアップグレードと `CONTENT_VALIDATE_PROMPT_TEMPLATES=true` の設定が必要。

**Why it matters:** サードパーティの MCP サプライチェーンは引き続き高深刻度の欠陥を生んでいる。エージェントのプロンプトを処理するゲートウェイでのテンプレートインジェクション→RCE は、あらゆる MCP 依存関係が今や信頼境界の一部であることの警告だ。

[`🔗 GitHub Advisory GHSA-vwf3-4xxj-qg6h`](https://github.com/advisories/GHSA-vwf3-4xxj-qg6h) · [`🔗 dev.to analysis`](https://dev.to/cverports/ghsa-vwf3-4xxj-qg6h-ghsa-vwf3-4xxj-qg6h-server-side-template-injection-in-mcp-contextforge-gateway-4nng)

---

## 19. SWE Refactor Bench — 実際の全リポジトリ移行を完了できたエージェント実行はわずか 5.4%（arXiv 2608.23564）

- **Velocity:** ▮ steady
- **Source:** arXiv · 2608.23564 · ~1d ago（8 月 25 日）
- **Tags:** `research` `benchmark` `coding-agents` `refactoring` `migration`

**SWE Refactor Bench**（arXiv 2608.23564、Navers Lab / Einsia.AI / 清華）は、コーディングエージェントが挙動を保ちながら**長期的・全リポジトリの技術スタック移行**を実行できるかをテストする。4 種類の技術負債にわたる 20 の移行タスクを、3 段階プロトコル（構造的真実性を検証する Migration Audit、行動テスト、そして 6 つの独立エージェントによる敵対的テスト生成）で判定。**8 フロンティアモデル × 26 努力設定 = 520 実行**のうち、**全 3 段階を通過したのはわずか 28 件（5.4%）**、**20 タスク中 13 件は受け入れられた解がゼロ**。論文はこの失敗モードを **Blindness** と名付ける — 古い実装を新しい見た目の場所にコピーしたエージェントは、移行せずに行動テストを通過してしまう。最高コンポジットは claude-opus-5 の 47.0。言語書き換え（5.6）はビルドツールチェーン書き換え（31.4）よりはるかに難しい。

**Why it matters:** 「テストが通っても移行が起きたとは限らない」— テストゲーミングを見破るために作られたベンチマークで、フロンティアエージェントが信頼できる自律リファクタリングからまだ遠いことを示す。自律エージェントに任せるのが最も危険な場所こそ、この領域だ。

[`🔗 arXiv 2608.23564`](https://arxiv.org/abs/2608.23564) · [`🔗 benchlm.ai leaderboard`](https://benchlm.ai/benchmarks/swe-refactor-bench)

---

## 20. OpenAI の Jalapeño ASIC — 初のベンチマークで Blackwell 比 1.5–1.9 倍の推論効率を主張

- **Velocity:** ▮▮▮ trending
- **Source:** OpenAI blog / TechCrunch · ~1d ago（8 月 25 日）
- **Tags:** `openai` `hardware` `silicon` `inference` `asic`

Hot Chips 2026 で、OpenAI は自社初のカスタム推論 ASIC **Jalapeño**（Broadcom と共同開発、TSMC N3P 3nm、700W TDP／実測約 550W 持続、HBM4 6 スタック = 216GB @ 15.4TB/s）の初の実測結果を公表した。SemiAnalysis のオープンな **InferenceX** ベンチマークで GPT-OSS 120B・DeepSeek R1 670B・Kimi K2.5 1T を比較し、Nvidia GB200/GB300 に対し**1ワットあたりの AI ワークロードが 1.5–1.9 倍**、エンドツーエンド遅延は**1.7–3.6 倍低く**、対話型ワークロードでは**2.1–4.1 倍高速**と主張。ウェイトステーショナリーの MXFP4 シストリックアレイと独自言語（Gloun）を採用。設計からテープアウトまで約 9 か月で、OpenAI 自身のモデルがカーネル設計・最適化を支援した（AI 生成の MoE ブロックは人間が書いたものより 1.5–1.8 倍高速）。2026 年末に小規模展開、2027 年に拡大。社内利用のみ。

**Why it matters:** AI ラボ発の初の有力な非 Nvidia 推論シリコンであり、ピーク FLOPs ではなく 1 ジュールあたりのトークンを軸に設計されている — ただし比較対象は Blackwell（Vera Rubin ではない）で、数値は OpenAI 自身が選んだベンチマーク上の自社データ。独立検証はまだだ。

[`🔗 OpenAI — the full stack behind abundant intelligence`](https://openai.com/index/the-full-stack-behind-abundant-intelligence/) · [`🔗 TechCrunch`](https://techcrunch.com/2026/08/25/openais-jalapeno-chip-is-built-for-fast-inference-at-scale-benchmarks-show/) · [`🔗 iThome (zh)`](https://m.ithome.com/html/994306.htm)

---

## 21. Perplexity が Portable Computer 発表 — NVIDIA DGX Spark 向けに最適化した完全ローカルなエージェントスタック

- **Velocity:** ▮▮▮ trending
- **Source:** VentureBeat / SiliconANGLE · ~1d ago（8 月 25 日）
- **Tags:** `perplexity` `nvidia` `local-ai` `agents` `hardware`

**Perplexity** は、Computer エージェントプラットフォームの完全オンデバイス版 **Portable Computer** を発表。NVIDIA と密接に協力して開発され、**DGX Spark**（128GB）と RTX GPU ≥24GB を備えた Linux マシンで最初に動作する。モデル（Qwen 3.8 27B または Perplexity が自社ハーネス用に追加訓練した **PPLX 27B**）、エージェントハーネス、ツールルーター、コネクタ、そしてサンドボックスが無ければハーネス自身が無効化される OS レベルのサンドボックスまで、スタック全体がローカルで動作し、ローカルで完了した作業は**トークンクレジットを消費しない**。15+ のクラウドフロンティアモデルへのエスカレーションは明示的なユーザー承認が必須で、返ってくるのはテキストのみのアドバイスでローカルファイルにはアクセスできない。Perplexity の Local Knowledge Work Bench では **82.6%**（Pi 77.6%、Hermes 74.0% に対し）、PPLX 27B では **85.4%**、BrowseComp では Pi 比約 70% 少ないトークンで同等の精度。

**Why it matters:** 「ローカルファースト＋オプトインのクラウド」は、データ統制とトークン経済が求めるエンタープライズの新パターン。ローカルエージェントには汎用ハーネスではなく*共同設計された*ハーネスが必要という Perplexity の主張は、小規模モデルのエージェント論争を塗り替える。

[`🔗 VentureBeat`](https://venturebeat.com/ai/perplexity-partners-with-nvidia-to-launch-portable-computer-a-fully-local-ai-agent-with-zero-token-costs) · [`🔗 SiliconANGLE`](https://siliconangle.com/2026/08/25/perplexity-ai-launches-portable-computer-on-device-ai-agent/) · [`🔗 至頂網 (zh)`](https://www.zhiding.cn/edge-ai/2026/0826/3197483.shtml)

---

## 22. miniOrange SAML SSO — WordPress 管理者を奪う認証バイパス CVE 2件が実環境で悪用中

- **Velocity:** ▮▮▮ trending
- **Source:** The Hacker News / SecurityWeek · ~2d ago（8 月 24 日）
- **Tags:** `cve` `wordpress` `saml` `auth-bypass` `actively-exploited`

Xecurify 製 **miniOrange SAML 2.0 SP Single Sign-On** WordPress プラグインの **CVE-2026-61979**（CVSS 8.1）と **CVE-2026-15981**（CVSS 9.8）により、未認証の攻撃者が**任意ユーザー（管理者含む）**としてログインできる。61979 は署名アルゴリズム混乱 — プラグインが SAML レスポンスで宣言されたアルゴリズムを尊重し、IdP の RSA 公開鍵を HMAC 共有秘密として扱う。15981 は真偽値バグ — `mo_saml_validate_signature()` が OpenSSL の `-1`（処理エラー）を有効な署名として扱う。DigitalOcean のセキュリティチームが 8 月 16 日に異常な管理者セッションを検知し、Patchstack が攻撃チェーンを分析。攻撃者は**公開 PoC を使った日和見スキャン**を約 1 万の無料 + 3 万の有料インストールに対して実行中。修正版は存在するが、有料版には明確な通知がなく、エディションごとに修正バージョンが異なる。

**Why it matters:** SAML の署名検証ロジックはアカウント乗っ取りチェーンを量産し続けており、「サイレントパッチ」とエディション別バージョンが実環境悪用中のこのペアの修復を特に困難にしている。露出した WordPress SSO は侵害を前提にすべき典型的なケースだ。

[`🔗 The Hacker News`](https://thehackernews.com/2026/08/attackers-target-miniorange-saml-flaws.html) · [`🔗 SecurityWeek`](https://www.securityweek.com/wordpress-websites-targeted-via-miniorange-plugin-vulnerabilities/)

---

## 23. llama.cpp v0.3.0 — dots3-note マルチモーダルをネイティブ対応、コアは ggml 0.22.0 へ

- **Velocity:** ▮▮ rising
- **Source:** GitHub · release v0.3.0 · ~1d ago（8 月 25 日）
- **Tags:** `llm` `inference` `llama.cpp` `multimodal` `open-source`

**llama.cpp v0.3.0**（ggml-org）がリリース：`mtmd` マルチモーダルライブラリに **dots3-note の視覚・音声**対応（新 DSA-ISWA KV キャッシュ型）、ffmpeg 経由の WebP デコード、Pillow 準拠の正確なリサイズアルゴリズム、`moov` アトムがファイル末尾にある動画の修正を追加。**GLM-4.5-Air は MTP 対応**、DeepSeek 4 に tensor-split モード、コアは **ggml v0.22.0** へ（メタバックエンドのテンソル分割、並列コンパイルされる op 別 Metal カーネル、真の非インプレース `ggml_clamp`）。

**Why it matters:** llama.cpp はローカル推論の事実上のリファレンスランタイム。久々の 0.x メジャーバンプであり、ローカル AI ツールが依存するあの 1 バイナリにマルチモーダルと動画処理を統合する。

[`🔗 llama.cpp v0.3.0 release`](https://github.com/ggml-org/llama.cpp/releases/tag/v0.3.0) · [`🔗 lemmus.org`](https://lemmus.org/post/24898197)

---

## 24. ReWorld — 自分が見せた場所を覚えている対話型ワールドモデル（arXiv 2608.23565）

- **Velocity:** ▮▮ rising
- **Source:** arXiv · 2608.23565 · ~1d ago（8 月 25 日）
- **Tags:** `research` `world-model` `video-generation` `memory` `arxiv`

**ReWorld**（HKUST-GZ + Alibaba、arXiv 2608.23565）は、対話型ビデオ拡散ワールドモデルで*制御*（短いホライズン）と*記憶*（無制限）を分離する。大半のアテンションヘッドは局所に留め、少数の「グローバル」ヘッドが履歴全体にアテンド。ランダムチャンクドロップで疎な履歴を分布内にし、推論メモリは**ポーズ索引ランドマークバンク**で有界化 — モデルは現在のカメラポーズに最も近いランドマークを検索する。**704×1280** の対話型ビデオをストリーミング生成（4 ステップ蒸留、LoRA rank-128）し、行動追従・長期リコール・画質で 6 つの最近の対話型ワールドモデルを上回る。64 秒の往復ロールアウトでも、固定 12 チャンクキャッシュから開始ビューを再生成できる。推論コードは GitHub で公開。

**Why it matters:** 長期記憶は対話型ワールドモデルに欠けていた能力であり、ポーズ索引ランドマークバンクは安価で具体的な仕組み。「自分が見せた場所を覚えているか」がワールドモデルベンチマークの次の軸になるだろう。

[`🔗 arXiv 2608.23565`](https://arxiv.org/abs/2608.23565) · [`🔗 GitHub — zhifeichen097/ReWorld`](https://github.com/zhifeichen097/ReWorld)

---

## 25. CVE-2026-80138 — ClipBucket V5 インストーラのコマンドインジェクションは未認証 RCE（CVSS 9.2 / 9.8）

- **Velocity:** ▮▮ rising
- **Source:** VulnCheck / Rapid7 · CVSS 9.2 · ~1d ago（8 月 25 日）
- **Tags:** `cve` `rce` `clipbucket` `installer` `command-injection`

**CVE-2026-80138**（CWE-78；CVSS 4.0 **9.2**、CVSS 3.1 **9.8**）— ClipBucket V5 の Web インストーラ（`cb_install`）は、`php_cli_filepath` パラメータを検証・エスケープせずシェル実行に渡すため、**未認証**の攻撃者が細工した値を POST して Web サーバーユーザー権限で任意の OS コマンドを実行できる。影響範囲は 5.5.1 〜 5.5.3-#153。**5.5.3-#154+** で修正。VulnCheck が採番（Adam Nurudini 宛て謝辞）。インストーラに到達可能ならホスト完全侵害に直結する、と容易に悪用可能とされる。

**Why it matters:** インターネットに面した動画ホスティング CMS に残ったインストーラは常設 RCE。「セットアップ後は `cb_install` を削除せよ」は最も古いハードニングの教訓だが、この CVE はセットアップページが最弱リンクであることを再び示した。

[`🔗 VulnCheck advisory`](https://www.vulncheck.com/advisories/clipbucket-v5-5.5.1-through-5.5.3-153-os-command-injection-via-installer-php-cli-filepath-parameter) · [`🔗 Rapid7`](https://www.rapid7.com/db/vulnerabilities/cve-2026-80138/) · [`🔗 IONIX`](https://www.ionix.io/threat-center/cve-2026-80138/)

---

## 26. C2PA カメラ認証は「現実と接触すると崩壊する」— root 化した Pixel で有効な署名写真を作れる

- **Velocity:** ▮▮ rising
- **Source:** HN · 104 pts · ~1d ago（8 月 25 日）
- **Tags:** `c2pa` `provenance` `security` `android` `photography`

David Buchanan のエッセイは、Google **Pixel Camera C2PA Assurance Level 2** 認証が脆弱だと論じる。信頼チェーンは Android Key Attestation と Play Integrity に依存するが、特権昇格バグ — 彼が引用する **CVE-2026-43499**（完全に更新済み Pixel でワンクリック root を可能にし、90 日以上前に報告済み）— を使えば、**ハードウェア攻撃なしで C2PA 有効な署名偽造**が誰にでも作れる。「スクリーンの写真を撮る」アナログ攻撃もゼロスキルで決まる。HN スレッド（104 点、65 コメント）は、暗号プロビナンス（provenance）が写真の真実性を確立できるのか、それとも署名が*未検証*のコンテンツをより怪しく見せるのかを論じている。

**Why it matters:** ディープフェイク対策のデフォルト回答になりつつある provenance だが、root 化デバイスが有効な署名を鋳造できるなら「C2PA 署名」≠「真正」。標準に賭けるすべてのプラットフォームと政策への、基本的な信頼モデル上の警告だ。

[`🔗 da.vidbuchanan.co.uk — essay`](https://www.da.vidbuchanan.co.uk/blog/android-c2pa.html) · [`🔗 Hacker News`](https://news.ycombinator.com/item?id=49439499)

---

## 27. Python の str.lower() が IDNA 2003 から乖離 — CVE-2026-17084、Unicode バージョン固定のバグ

- **Velocity:** ▮ steady
- **Source:** Seth Larson blog · HN 46 pts · ~1d ago
- **Tags:** `python` `idna` `unicode` `cve` `security`

Seth Larson（PSF セキュリティ開発担当）が **CVE-2026-17084** を解説：`stringprep`/IDNA 2003 コーデック（`str.encode('idna')`）は RFC 3454 のケースフォールディングに `str.lower()` を使うが、`str.lower()` は仕様が固定した **Unicode 3.2.0** ではなくインタプリタの Unicode バージョン（17.0）に従う。同じ見た目の入力が Unicode バージョンによって異なる Punycode にエンコードされる（例：`"ᎠᎠ"` → `xn--58da` vs `xn--kz9aa`）— ホモグリフ/フィッシング、許可リスト回避、SSRF 式の混乱攻撃に使えるパーサー差分だ。修正は StringPrep 内でのみケースフォールディングを Unicode 3.2.0 に固定（CPython PR #155293、3.14/3.15 にバックポート）。NVD は **CWE-436**（解釈の競合）に分類。

**Why it matters:** 仕様が古い Unicode バージョンを固定しているのにコードが現在版に追従する「バージョン固定」は、静かなセキュリティバグの一種。IDNA 2003 コーデックから離れ、IDNA 2008 の `idna` パッケージへ移行するのが推奨だ。

[`🔗 sethmlarson.dev`](https://sethmlarson.dev/when-str-lower-is-a-security-vulnerability) · [`🔗 CPython PR #155293`](https://github.com/python/cpython/pull/155293) · [`🔗 HN`](https://news.ycombinator.com/item?id=49440410)

---

## 28. ERPO — Alibaba が RL の正則化を応答側からクエリ側へ移す（arXiv 2608.23311）

- **Velocity:** ▮ steady
- **Source:** arXiv · 2608.23311 · ~1d ago
- **Tags:** `research` `rl` `rhlf` `optimization` `alibaba`

**ERPO**（arXiv 2608.23311、EMNLP 2026 本会議採択）は、LLM ポリシー最適化におけるアクション側 **Policy-KL** 正則化を、現在のポリシーが誘導するクエリ分布への **Query-KL** ペナルティで置き換える。QKL 勾配はクエリ尤度のみを通過するため応答分布への直接的な圧力はなく、探索は完全に保たれる。推定器非依存で、追加フォワードなしに GRPO/PPO/REINFORCE へ差し込める。6 つの数学ベンチマーク（Qwen2.5-Math-7B、240 ステップ）で **0.336 vs 0.274**（GRPO ベースライン）。960+ ステップの訓練では GRPO の KL が爆発し約 480 ステップ後に精度が崩壊するのに対し、ERPO は安定を保つ。コードはオープンソース（AlibabaResearch/ERPO）。

**Why it matters:** 安定性と探索のジレンマは RLHF の中核ボトルネック。*応答*ドリフトではなく*クエリ*ドリフトを制約するのは、安価で汎用的、しかも長尺訓練を実測で安定化させる変更だ。

[`🔗 arXiv 2608.23311`](https://arxiv.org/abs/2608.23311) · [`🔗 GitHub — AlibabaResearch/ERPO`](https://github.com/AlibabaResearch/ERPO)

---

## 29. CVE-2026-79992 — 細工したファイル名で Emacs TRAMP がシェルインジェクション（CVSS 7.8）

- **Velocity:** ▮ steady
- **Source:** Red Hat / NVD · CVSS 7.8 · ~1d ago（8 月 25 日）
- **Tags:** `cve` `emacs` `tramp` `command-injection` `local`

Red Hat が **CVE-2026-79992**（CWE-78、CVSS 7.8）を開示：Emacs **TRAMP** はログイン引数をサニタイズせず連結してローカルシェルに渡すため、ローカルの攻撃者に**悪意あるファイル名**（"user" フィールド経由）を開かされるとシェルコマンドインジェクションと任意コード実行に至る。RHEL の `emacs` パッケージ（RHEL 9/10 が影響対象として記載）に影響。サポート対象チャネルに修正はまだなく、緩和策は信頼できないファイル名を処理しないこと。

**Why it matters:** エディタのリモートファイル層がインジェクション面になる — リモートパスを扱うためにシェルを呼ぶ「ローカル」ツールも、ネットワークサービスと同じ入力サニタイズ規律を要するという再確認。信頼できないファイル名は新しい信頼できない HTML だ。

[`🔗 Red Hat CVE`](https://access.redhat.com/security/cve/cve-2026-79992) · [`🔗 NVD`](https://nvd.nist.gov/vuln/detail/CVE-2026-79992)

---

## 30. OxAlpha は Zhipu の次世代 GLM と確定 — 今夜オープンウェイト公開

- **Velocity:** ▮▮▮ trending
- **Source:** The Edge Malaysia / ChainCatcher · ~today（8 月 26 日）
- **Tags:** `ai-model` `glm` `zhipu` `open-weights` `openrouter`

8 月 22 日に Ox Alpha を OpenRouter 上の匿名モデルとして取り上げたが、**Z.AI（Zhipu）** は 8 月 26 日に Bloomberg に対し、同モデルが**GLM シリーズの新たなイテレーション**であることを確認——コーディングとエージェントタスク向けのマルチモーダル推論モデル（テキスト/画像/動画）——そして**今夜中にウェイトを公開**すると発表。8 月 20 日の無記名ローンチは OpenRouter 史上最大と言われ、リーダーボード首位で DeepSeek の 2 倍以上の利用を記録、現在 1 週間無料。コードネームは中国映画『牛来』に由来し、Alibaba と Xiaomi も今年同じステルスローンチ戦略を取ったと報じられている。

**Why it matters:** 「ステルスローンチ → 正体公開 → オープンウェイト」は新しいモデル発表の常套手段になりつつあり、この確認はリーダーボードの噂を再現可能なオープンモデルへ変える。ただし出回っている約 100 万トークン・DeepSWE 80% などの数字は確認済みソースには含まれていないため、モデルカード公開までは身元と入手可能性以外の仕様は未検証として扱うべき。

[`🔗 The Edge Malaysia`](https://theedgemalaysia.com/node/815823) · [`🔗 ChainCatcher — Bloomberg`](https://www.chaincatcher.com/article/2285607)

---

## 31. CVE-2026-63520 — SharePoint の安全でない .NET 型インスタンス化が未認証 RCE に連鎖（CVSS 8.1）

- **Velocity:** ▮▮▮ trending
- **Source:** VulnCheck / Censys · CVSS 8.1 · ~1d ago（8 月 24 日）
- **Tags:** `cve` `microsoft` `sharepoint` `rce` `type-instantiation`

**CVE-2026-63520**（CVSS 8.1、`AV:N/AC:H/PR:N/UI:N`、CNA 割当 — NVD の評価は保留）は、SharePoint の Business Connectivity Services における安全でない .NET 型インスタンス化。`DbTypeReflector.ResolveDotNetType()` が攻撃者が制御する BDCM `TypeName` に対して許可リストなしで `Type.GetType()` を呼ぶ。**VulnCheck** は 8 月 24 日、既報の **CVE-2026-55040** JWT バイパスと組み合わせた**武器化済み完全チェーン**を公開——`System.Web.UI.LosFormatter` をインスタンス化し、BDC Finder メソッド経由で `Deserialize` をトリガーして**未認証 RCE** を達成。影響は **2026 年 8 月累積更新プログラム**以前の SharePoint Server 2016/2019/Subscription Edition。同更新は `ValidateSafeBcsType` 許可リストを追加。Rapid7 の Stephen Fewer が発見、インターネット公開サーバー約 8,500 台、8 月 25 日に Censys 共同アドバイザリ。

**Why it matters:** 認証バイパス側はすでに KEV 入りして活発に探査されている。その上に公開された武器化チェーンが載ったことで、SharePoint 管理者は完全な未認証 RCE 経路が試行されていると想定すべきで、8 月累積更新が唯一の緩和策となる。

[`🔗 VulnCheck`](https://www.vulncheck.com/blog/cve-2026-63520-sharepoint-unsafe-type-rce) · [`🔗 Censys advisory`](https://censys.com/advisory/cve-2026-55040-cve-2026-63520/) · [`🔗 NVD`](https://nvd.nist.gov/vuln/detail/CVE-2026-63520)

---

## 32. CVE-2026-79290 — Chrome Aura の use-after-free は Critical のサンドボックス脱出（CVSS 9.6）

- **Velocity:** ▮▮▮ trending
- **Source:** Chrome Releases / OpenCVE · CVSS 9.6 · ~1d ago（8 月 25 日）
- **Tags:** `cve` `chrome` `use-after-free` `sandbox-escape` `browser`

**CVE-2026-79290**（CWE-416、**CVSS 9.6**、CISA ADP Vulnrichment によるスコア）は Chrome の **Aura** ウィンドウ層の use-after-free で、Chromium は**Critical** と評価。細工した HTML ページでメモリを破壊し、レンダラーの外でのコード実行につながる**サンドボックス脱出**が可能。**Chrome 152.0.7977.65**（Stable、8 月 25 日）で全プラットフォーム修正。同じドロップには CVE-2026-79138（ANGLE の境界外書き込み、Windows、High）、CVE-2026-79026（Extensions UAF、High）、CVE-2026-79125（WebXR 情報漏えい、Low）も含まれる。悪用報告なし、KEV 未掲載。

**Why it matters:** 多くのエージェントハーネスやヘッドレスツールが依存するブラウザの Critical サンドボックス脱出 UAF は「今すぐ更新」の合図。2 週間で 2 回目の Critical Chrome 修正となり、「ブラウザ＝エージェントランタイム」のサプライチェーン問題も引き続き話題の中心にある。

[`🔗 Chrome Releases`](https://chromereleases.googleblog.com/2026/08/stable-channel-update-for-desktop_0256176589.html) · [`🔗 OpenCVE`](https://app.opencve.io/cve/CVE-2026-79290) · [`🔗 NVD`](https://nvd.nist.gov/vuln/detail/CVE-2026-79290)

---

## 33. NVIDIA Groq 3 LPX が本格量産へ — Gemma 4 31B を 100K コンテキストで約 3,400 tok/s

- **Velocity:** ▮▮▮ trending
- **Source:** NVIDIA Newsroom / zhidx · ~2d ago（8 月 24 日、Hot Chips 2026）
- **Tags:** `nvidia` `hardware` `inference` `groq` `agentic-ai`

NVIDIA は Hot Chips 2026（8 月 24 日）で、**Groq 3 LPX** アクセラレータ— Groq 買収由来のデコードフェーズ LPU チップで、Vera Rubin プラットフォームと補完関係—が**本格量産に入った**と発表。独立評価の **Artificial Analysis** は **Gemma 4 31B を 100K コンテキストで約 3,400 出力トークン/秒**と計測（zhidx は 100K で中央値 3,431 tok/s、10K とほぼ同等、SPEED-Bench コーディング中央値 4,767 tok/s と報道）。NVIDIA はレイテンシ重視のエージェントワークロードで**最接近の代替比 4 倍**を主張。1 ラックあたり 256 基の LP30（128 GB オンチップ SRAM、640 TB/s スケールアップ帯域、液冷）。**Nebius** が Token Factory プラットフォーム経由で最初の導入クラウドに。

**Why it matters:** Groq 3 LPX はフロンティア級モデルをリクエスト単位で即応させる「デコードエンジン」—「推論のボトルネックはチャットではなくマルチターン・エージェントワークロード」というハードウェア賭け。ただし見出しの数字はオープンな 31B モデルであってフロンティア MoE ではなく、4×/30× はベンダー予測。

[`🔗 NVIDIA Newsroom`](https://nvidianews.nvidia.com/news/nvidia-groq-3-lpx-now-in-full-production-with-world-class-speed-for-agentic-ai) · [`🔗 zhidx — 3,431 tok/s`](https://www.zhidx.com/p/587895.html) · [`🔗 Nebius`](https://nebius.com/blog/posts/nvidia-groq-3-lpx-nebius-token-factory)

---

## 34. Archify — コードベースをスキーマ検証済みの対話型図にするエージェントスキル（16.8k スター）

- **Velocity:** ▮▮ rising
- **Source:** GitHub · 16.8k stars · ~today（8 月 26 日）
- **Tags:** `agents` `skills` `diagrams` `architecture` `open-source`

**tt-a1i/archify**（MIT、16.8k スター）は、Raven・Cursor・Claude Code・Codex CLI・OpenCode 向けエージェントスキル（SKILL.md）。リポジトリや自然言語のシステム記述を対話型のアーキテクチャ/シーケンス/データフロー図に変換する。型付き JSON IR はスキーマ＋レイアウト検証付きで、レンダラーは**不正な出力（交差するエッジ、重なるラベル）を拒否**し、構造化された診断を返す。出力は自己完結型 HTML ファイルで、PNG/SVG/WebM エクスポートと 1200×630 シェアカードに対応。「Architecture Delta」モードは Before/Delta/After を機械可読なレシートで比較し、貼り付けられた Mermaid を Archify JSON に書き直す。本日 GitHub デイリートレンド入り（+1,002 スター）。

**Why it matters:** 「間違って描くくらいなら描かない」はエージェントツールに必要な正しさの姿勢。Archify はスキルの波が散文的な指示から、検証済みで機械確認可能な成果物へ移りつつある証拠でもある。

[`🔗 tt-a1i/archify`](https://github.com/tt-a1i/archify) · [`🔗 SkillsMP`](https://skillsmp.com/creators/tt-a1i/archify/archify)

---

## 35. CVE-2026-80104 — DB-GPT の未認証パストラバーサル → 任意ファイル書き込み → RCE（CVSS 9.8）

- **Velocity:** ▮▮ rising
- **Source:** NVD / VulnCheck · CVSS 9.8 · ~1d ago（8 月 25 日）
- **Tags:** `cve` `db-gpt` `ai-infra` `path-traversal` `rce`

**CVE-2026-80104**（CWE-22、**CVSS 9.8**、VulnCheck 割当）は **eosphoros-ai/DB-GPT** の `skill_upload` ハンドラにおける未認証パストラバーサル。`file.filename` を正規化・包含チェックなしで `upload_dir/filename` にそのまま書き込み、認証依存処理は `user_id` ヘッダーがなくても admin ロールを返す。未認証の攻撃者はパッケージ内に `.py` モジュールを仕込み、次回インポート時にコード実行を得られる。影響は `dbgpt-app` 0.8.0、**v0.8.1**（GitHub + PyPI）で修正。実環境での悪用は確認されていない。

**Why it matters:** データベースエージェントフレームワークを本番データストアに直接つなぐ開発者が増える中、CVSS 9.8 は攻撃者が狙う AI サプライチェーン面そのもの。「user_id がなくても admin」は AI ツールの認可ロジックを監査すべき事例。

[`🔗 NVD`](https://nvd.nist.gov/vuln/detail/CVE-2026-80104) · [`🔗 eosphoros-ai/DB-GPT`](https://github.com/eosphoros-ai/DB-GPT/releases)

---

## 36. CVE-2026-78676 — GitPython が設定を生きた `core.hooksPath` に再シリアライズ、RCE（CVSS 9.8）

- **Velocity:** ▮▮ rising
- **Source:** GitHub Advisory / NVD · CVSS 9.8 · ~1d ago（8 月 25 日）
- **Tags:** `cve` `gitpython` `rce` `argument-injection` `python`

**CVE-2026-78676**（CWE-88、**CVSS 9.8**）は **GitPython ≤ 3.1.58** に影響。`GitConfigParser.write_section` が引用符付きの複数行設定値を引用符なしの物理改行に再シリアライズし、休眠状態の値を **`core.hooksPath` のような生きたディレクティブ**に変える。その後の Git 操作が攻撃者制御のフックを呼び出し、コード実行につながる。トリガーには細工された複数行 git 設定値と、後続の無関係な設定書き込みが必要。**GitPython 3.1.59** で修正され、同バージョンは CVE-2026-78675（`.gitmodules` 情報漏えい）と CVE-2026-78677（ディレクトリトラバーサル）も修正。実環境での悪用確認なし、公開 PoC はトラッカー間で論争あり。

**Why it matters:** ほぼすべての Python ツールチェーンが Git を呼ぶために使うライブラリの 9.8 はサプライチェーン RCE。「設定の書き込みがフックになる」という遅延トリガー型インジェクションは、セキュリティスキャナがめったに検出できない類のもの。

[`🔗 GitHub Advisory GHSA-9557-234j-7rv9`](https://github.com/advisories/GHSA-9557-234j-7rv9) · [`🔗 NVD`](https://nvd.nist.gov/vuln/detail/CVE-2026-78676)

---

## 37. JoyAI-Echo-1.5 — JD の長時間音声・映像生成が WBench 首位（arXiv 2608.23383）

- **Velocity:** ▮▮ rising
- **Source:** arXiv · 2608.23383 · ~1d ago（8 月 25 日改訂）
- **Tags:** `research` `video-generation` `audio-visual` `world-model` `open-source`

**JoyAI-Echo-1.5**（JD、arXiv 2608.23383）は統合型音声・映像生成システムで、2 つの変種を持つ。**ロングビデオ変種**は合成可能なクロスショットメモリと話者キューでキャラクターの外見と声のアイデンティティを持続させる。**ワールドモデル変種**は異種ナビゲーション入力を較正されたメトリック 6-DoF カメラ軌道に変換し、コントローラー非依存のインタラクションを可能にする。プログレッシブな teacher forcing と自己生成ロールアウト上の short/long-horizon Self-Gradient Forcing で訓練され、ワールドモデル変種は **WBench で首位（平均 81.7）**、SANA-WM-Bench では長時間持続性と画質で先行。コードとウェイトはオープンソース化（jd-opensource/JoyAI-Echo）。

**Why it matters:** 「持続するストーリーと対話可能な世界」はクリップ単位の動画生成を超えるフロンティア。ロングビデオ経路とワールドモデル経路を分けた設計は、この分野が「記憶を伴う生成」へ収束する中で注目に値する。

[`🔗 arXiv 2608.23383`](https://arxiv.org/abs/2608.23383) · [`🔗 jd-opensource/JoyAI-Echo`](https://github.com/jd-opensource/JoyAI-Echo)

---

## 38. QAH — 4-bit モデルが bfloat16 の元モデルを上回る量子化対応ヒーリング（arXiv 2608.20953）

- **Velocity:** ▮▮ rising
- **Source:** arXiv / Unite.ai · 2608.20953 · ~1d ago（8 月 25 日）
- **Tags:** `research` `quantization` `llm` `efficiency` `open-weights`

**Quantization-Aware Healing（QAH）**（Multiverse Computing、HF ブログ 8 月 25 日 + arXiv 2608.20953）は、QAT/QAD で品質が劣化した中間ティーチャーを置き換え、**4-bit の学生を元の全精度モデルから直接** KL ダイバージェンスで蒸留する。**GPT-OSS 120B → 60B → MXFP4** に適用すると、QAH 学生は **9 ベンチマーク中 7 つで bfloat16 の元を上回るか同等**（AA-LCR 42.7 vs 35.3、AIME 2025 76.3 vs 70.7、Aider 40.9 vs 38.2）、LiveCodeBench では 120B ティーチャーに肉薄。重みとトークンあたり計算量は約半分。GPT-OSS 9B では QAT より約 7 倍速くピークに達し、1,200 ステップにわたりピークから約 2 点以内を維持（QAT は約 19 点低下）。成果はオープンウェイトの **HyperNova-60B**（Apache-2.0）として公開。

**Why it matters:** 4-bit 圧縮＋半分のパラメータで全精度に並ぶなら、オープンモデルの主な提供コストは一気に下がる。ただしこれらは Multiverse 独自パイプライン（独自圧縮、GPT-OSS のみ）での自社計測。「bf16 を上回る」はまだ再現待ちの結果であり、独立した事実ではない。

[`🔗 arXiv 2608.20953`](https://arxiv.org/abs/2608.20953) · [`🔗 Unite.ai`](https://www.unite.ai/multiverse-computings-4-bit-healing-beats-full-precision-model/) · [`🔗 papers.cool`](https://papers.cool/arxiv/2608.20953)

---

## 39. Ambient Context — LLM 向けテキスト専用「画面メモリー」、macOS で完全オフライン（Show HN）

- **Velocity:** ▮ steady
- **Source:** HN · 61 pts · ~1d ago（8 月 25 日）
- **Tags:** `agents` `memory` `macos` `privacy` `local-first`

**dragthelake/ambient-context**（Show HN、8 月 25 日）は macOS メニューバーアプリで、作業を LLM が読める平文 Markdown として記録する。Accessibility API 経由でフォーカス中のウィンドウのテキストを数秒ごとに取得（スクリーンショット/OCR なし）、1 日 1 つの Markdown ファイルと形式を説明する `AGENTS.md` を書き出す。書き込み前に脱敏処理—パスワードマネージャーやプライベートブラウジングをスキップし、認証情報/API キー/カード番号を除去。完全オフライン（アカウント・サーバー・テレメトリ・ネットワーク呼び出しなし）で、Claude Code にフォルダを指定して「火曜日に何をした？」と聞ける。既知の制限：Chromium/Electron はアクセシビリティツリーが遅く、GPU レンダリングのターミナル（Kitty、Alacritty）はテキストをほとんど公開しない。122 スター、v0.1.0 未署名、macOS 14+ Apple Silicon が必要。

**Why it matters:** 「テキスト専用・ローカル専用の画面メモリー」は、Recall/Rewind 型の記録と何も記録しないの間の、プライバシーに配慮した中間路。自分の日々のログを記述した AGENTS.md は、データベースなしで人間の文脈をエージェントに渡す巧妙なパターン。

[`🔗 dragthelake/ambient-context`](https://github.com/dragthelake/ambient-context) · [`🔗 runtimewire`](https://runtimewire.com/article/cameron-smith-ambient-context-mac-memory-markdown) · [`🔗 HN`](https://news.ycombinator.com/item?id=49429095)

---

## 40. CarWatch — Raspberry Pi 5 を完全オフラインのカーエージェントに（Show HN）

- **Velocity:** ▮ steady
- **Source:** HN · 143 pts · ~1d ago（8 月 25 日）
- **Tags:** `agents` `edge-ai` `raspberry-pi` `local-ai` `hardware`

**ThinkOffApp/CarWatch**（AGPL-3.0、171 スター）は Raspberry Pi 5 で動く車載エージェント。**Qwen3.6-35B-A3B** をローカルで実行（約 14.3 GB 量子化、約 3.5 tok/s）、745 ページのオーナーズマニュアルに対して RAG、Bluetooth ELM327 経由で OBD-II を読み取り、Home Assistant 経由で安全系クラウドコマンド（ロック、窓閉め）を実行可能。ハンズフリー音声はすべてオンデバイス（連続 VAD → whisper.cpp → 根拠付き応答）、ポート 8088 にスマホ用ダッシュボード。Show HN は 143 ポイント/45 コメント（コンテンツではなく形式でフラグされた）。

**Why it matters:** 約 100 ドルのデバイスで 35B ローカルモデル・音声・自分の車のマニュアルを動かすのは「ローカル AI」の具体的な終着点—トークンが遅くても。読み取り専用 OBD-II と明示的に安全系だけのコマンドを分けた設計は、オンデバイスエージェントの健全な安全モデル。

[`🔗 ThinkOffApp/CarWatch`](https://github.com/ThinkOffApp/CarWatch) · [`🔗 HN`](https://news.ycombinator.com/item?id=49435675)

---

## 41. Vinci Code — SimpleDirect が Pi ベースのターミナルコーディングエージェントを MIT で公開

- **Velocity:** ▮ steady
- **Source:** SimpleDirect blog · ~1d ago（8 月 25 日）
- **Tags:** `coding-agent` `cli` `open-source` `mit` `pi`

トロントの **SimpleDirect** は **Vinci Code CLI** を **MIT** ライセンスでオープンソース化（8 月 25 日）。Mario Zechner の MIT ハーネス **Pi** の「ディストリビューション」で、上流の履歴を保持しつつ、平易なナレーション・コマンドガード・秘密情報マスキング・OS レベルサンドボックス・チェックポイント・undo/review・永続的なタスクレシートを独自レイヤーとして追加。作業は **DONE、DONE-UNVERIFIED、WAITING、BLOCKED** の 4 つの明示状態で終了し、モデルの「完了」主張をそのまま信じない。不可逆コマンドの前では一時停止（`rm -rf` はデフォルトで拒否）。BYOK で 33 プロバイダーに対応。明示的にベータ、ローカルモデル非対応、CLI のみ。

**Why it matters:** 毎回の実行を明示的な「未検証/ブロック」状態で締めくくるのは、エージェント CLI における小さくとも実際の説明責任の転換。「Pi のフォークではなくディストリビューション」という位置づけは、成長する Pi エコシステムの互換性を保つ。

[`🔗 SimpleDirect — Vinci Code`](https://getsimpledirect.com/blog/vinci-code-is-now-open-source) · [`🔗 getsimpledirect/vinci-code-cli`](https://github.com/getsimpledirect/vinci-code-cli)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-08-26T20:14:00Z |
| Items | 41 |
| Sources tracked | 57 (CISA KEV, CyCognito, GitHub, Qualys, livethreat.ai, Apple Newsroom, Wccftech, iThome, IBM, ic.work, MongoDB, 至頂網, arXiv, AITNT, 証券日報, smzdm, VulDB, dev.to, GitHub Advisory, herdr.dev, OpenGithubs, explainx.ai, Alibaba Cloud, Higress, benchlm.ai, SciRate, ifeng, 17173, 163.com, openai.com, TechCrunch, VentureBeat, SiliconANGLE, The Hacker News, SecurityWeek, lemmus.org, VulnCheck, Rapid7, IONIX, da.vidbuchanan.co.uk, HN, sethmlarson.dev, Red Hat, NVD, Censys, ChainCatcher, Chrome Releases, NVIDIA Newsroom, Nebius, OpenCVE, papers.cool, runtimewire, SimpleDirect blog, SkillsMP, The Edge Malaysia, unite.ai, zhidx) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[Previous day](../2026-08-25/) · [Raw .md](../2026-08-26.md) · [Archive](../../archive/)
