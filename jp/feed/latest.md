---
date: 2026-08-13
updated: 2026-08-13T12:03:00Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 27
license: CC-BY-4.0
---

# trending.md — 高密度トレンドシグナル

機械可読なトレンド情報。**ベロシティ**でランク付け——注目がどれだけ速く移り変わっているか。
AIエージェント向けに構築。人間も読めます。
→ 生フィード: [`/jp/feed/latest.md`](/jp/feed/latest.md)
→ アーカイブ: [`/jp/feed/`](/jp/feed/)

---

## 1. NVIDIAがNeMo Switchyardをオープンソース化——どのLLMが各リクエストを処理するかを決めるRustルーター

- **ベロシティ:** ▮▮▮ トレンド
- **ソース:** NVIDIA Blog · 750 stars · ~18h ago
- **タグ:** `nvidia` `llm-routing` `rust` `ai-agents` `nemotron`

NVIDIAは**NeMo Switchyard**（Apache 2.0）をリリースした。OpenAI Chat・Anthropic Messages・OpenAI Responses形式を相互に変換し、各リクエストをモデルプール（vLLM、NVIDIA NIM、Ollama、任意のOpenAI互換エンドポイント）へルーティングするRustプロキシ/ライブラリで、アプリの書き換えは不要。組み込みルーターは**classifier**、**stage**、**escalation**、ランダム。Nemotron 3.5 Lightningオープンモデルと同時発表。内部ベンチマークでは、Claude Opus 4.8単独使用の約1/3のコストでフロンティア級の精度を達成し、LangChainでは呼び出しの7%のみをフロンティアモデルへルーティングして74%のコスト削減を実現した。

**注目の理由:** マルチモデルエージェントワークフローが普及するにつれ、「どのモデルがどのトークンを処理するか」が新たなコントロールポイントになる。Switchyardはそのルーティングレイヤーを狙っており、NVIDIAをチップ供給者ではなく、チップの上のオーケストレーションソフトウェアとして位置づけている。

> Apache 2.0 · pre-alpha（v1.0までにAPIは大きく変わる見込み） · パートナー: OpenRouter、LiteLLM、Kong、Nous Research、Siemens

[`🔗 NVIDIA-NeMo/Switchyard`](https://github.com/NVIDIA-NeMo/Switchyard) · [`🔗 NVIDIA Blog`](https://blogs.nvidia.com/blog/nemotron-lightning-switchyard-rtx-dgx/) · [`🔗 Futurum Group`](https://futurumgroup.com/insights/who-decides-which-model-runs-nvidia-would-like-a-say/)

---

## 2. Firecrawlのpdf-inspector——PDFを高コストなOCRから振り分けるRustライブラリ

- **ベロシティ:** ▮▮ 上昇中
- **ソース:** GitHub Trending · 14,990 stars · ~1d ago
- **タグ:** `firecrawl` `pdf` `rust` `document-parsing` `ocr`

Firecrawlは**pdf-inspector**（MIT）をオープンソース化した。ゼロから書かれたRustライブラリで、PDFの内部構造——フォントエンコーディング、テキスト演算子、画像カバレッジ——をレンダリングせずに読み取り、各ページを約10〜50msでTextBased/Scanned/ImageBased/Mixedに分類する。テキストページは読解順序を保ったままネイティブ抽出され、残りだけがOCRへ回される。Python（PyO3）、Node（napi-rs）、WASMバインディングに加え、`pdf2md` / `detect-pdf` CLIを提供。opendataloader-benchコーパスで200ドキュメントを0.470sで処理し、総合0.875のスコアで首位。

**注目の理由:** ほとんどのPDFパイプラインは全ページをGPU OCRに投げ込む。pdf-inspectorのスマートルーティングは、約54%を占めるテキストベースPDFのOCRをスキップする——これこそFirecrawlがホスティングパーサーを3.5〜5倍高速化した手法だ。「まず分類し、必要なものだけ抽出する」パターンはPDFを超えて再利用できる。

> MIT · 依存は単一の `lopdf` のみ · ~15k stars · Firecrawlの `/parse` と `/scrape` を支える

[`🔗 firecrawl/pdf-inspector`](https://github.com/firecrawl/pdf-inspector) · [`🔗 Firecrawl Blog`](https://www.firecrawl.dev/blog/anydoc-and-pdf-inspector)

---

## 3. Google公式のAgent Skillsリポジトリ——Googleワークフロー向け100以上のMarkdownプレイブック

- **ベロシティ:** ▮▮ 上昇中
- **ソース:** GitHub Trending · 17,882 stars · ~1d ago
- **タグ:** `google` `agent-skills` `cloud` `ai-agents` `mcp`

**google/skills**（Apache 2.0）は、エージェントが*オンデマンドで*読み込むMarkdownベースの「スキル」——参照ファイル + コードスニペット——を約100個パッケージ化し、GKE、BigQuery、Cloud Run、Gemini API、Firebase、Google Adsに加え、「GKE + AlloyDBでのRAG」のような複数製品のソリューションワークフローをカバーする。`npx skills add google/skills` でインストール。各スキルには `SKILL.md`、`OWNERS`、`EVAL.yaml` が同梱され、frontmatter・行数・リンク有効性のCIチェックが行われる。

**注目の理由:** スキルは「コンテキスト肥大」問題を解決する——巨大なMCPコンテキストを読み込む代わりに、エージェントはタスクに必要な専門知識だけを取り込む。GoogleのリポジトリはオープンなAgent Skills形式の参照実装であり、現在はOpenAI、Microsoft、Amazon、VercelとともにAgent Plugins 1.0.0として標準化されている。

> Apache 2.0 · ~18k stars · Google Cloud Next 2026で発表 · フレームワーク横断の週次品質評価

[`🔗 google/skills`](https://github.com/google/skills) · [`🔗 Google Cloud Blog`](https://cloud.google.com/blog/topics/developers-practitioners/level-up-your-agents-announcing-googles-official-skills-repository)

---

## 4. Macro——完全オープンソース（AGPL）の統合ワークスペース：メール、チャット、ドキュメント、タスク、エージェント、CRM

- **ベロシティ:** ▮▮ 上昇中
- **ソース:** GitHub Trending · 1,604 stars · ~6h ago
- **タグ:** `macro` `workspace` `rust` `crdt` `team-tools`

**macro-inc/macro**はMacroのオープンソースコードベース。Gmailスタイルのメール、チャンネル/DM、Linearスタイルのタスク、CRDTベースのドキュメント、2Dキャンバス、CRM、通話、エージェントを1つに統合したオールインワンのチームワークスペースで、すべてが双方向グラフに@リンクされ、共有AIメモリを持つ。SolidJS + Rustバックエンド（167クレート、42のデプロイ可能サービス）で構築。AGPL-3.0で「完全オープンソース——オープンコアではない」。SOC 2 Type II / ISO 27001。

**注目の理由:** オールインワンワークスペースのトレンド（メール + ドキュメント + タスクを1つのアプリに）は、通常クローズドなSaaSだ。MacroはAGPLで全体を公開し、セルフホスティングドキュメントを添え、MCP経由でチームメモリも公開している——ワークソフトウェアの「単一システム」への賭けに対する興味深い参照アーキテクチャだ。

> AGPL-3.0 · ~5k commits · docs.macro.com · MCP経由でチームメモリを公開、レート制限なし

[`🔗 macro-inc/macro`](https://github.com/macro-inc/macro) · [`🔗 Macro Docs`](https://docs.macro.com)

---

## 5. Woxi——Rustで再実装されたオープンソースのWolfram言語 / Mathematica

- **ベロシティ:** ▮ 安定
- **ソース:** Hacker News / Show HN · 226 pts · ~6h ago
- **タグ:** `wolfram` `mathematica` `rust` `cas` `symbolic-computation`

**Woxi**（「Wolfram oxidized」）はad-siによる、Wolfram言語をRustで再実装したものだ。`woxi eval`/`run`/`repl` CLI、Jupyterカーネル、ブラウザWASMビルド、そして**Woxi Studio**（Mathematica風の `iced` GUIノートブック）を提供。カーネルやライセンスチェックがないため、起動はミリ秒単位。約26,000のユニットテストと、WolframScriptに対して実行される約900の `.wls` スナップショットテストで適合性を担保しており、言語の「v6.0以前のほぼすべて」をサポートする。

**注目の理由:** Mathematica/Wolfram言語は強力だがプロプライエタリでライセンスで縛られている。高速で埋め込み可能な再実装は、記号計算を新しい環境（WASM、ノートブック、組み込みアプリ）へ開放する——そしてオリジナルに対するスナップショットテストの手法は、互換言語の再実装を構築する堅牢なテンプレートだ。

> Rust（97.6%） · Jupyter + JupyterLite + Woxi Studio · `cargo install woxi`

[`🔗 ad-si/Woxi`](https://github.com/ad-si/Woxi) · [`🔗 Hacker News`](https://news.ycombinator.com/item?id=49270040)

---

## 6. git-knife——スプレッドシートのようにコミットメッセージ・作者・日付を編集

- **ベロシティ:** ▮ 安定
- **ソース:** Hacker News / Show HN · 161 pts · ~10h ago
- **タグ:** `git` `gui` `tauri` `history-rewrite` `developer-tools`

**git-knife**（TheRealYT）は、Tauri（Rust + web）のデスクトップGUIで、スプレッドシート風のテーブルでgitコミットのメタデータ——メッセージ、作者/コミッターの名前 + メール、両方の日付——を編集でき、一括の正規表現検索・置換にも対応する。`git commit-tree` でコミットを再構築し、各コミットの元のツリーを再利用するため、**ファイル内容が変更されないことが証明可能**。各書き換え前にバックアップref（`refs/knife-backup/*`）をスナップショットし、プッシュ済み履歴への書き換え + 署名の剥奪について警告する。

**注目の理由:** 洗練されたGUI（GitKraken、Sublime Merge、lazygit）は日付とコミッターの身元を不変として扱う一方、git-filter-repoのようなCLIツールにはGUIがない。git-knifeは、正しいメールへの修正、スクレイピングデータのタイムスタンプへのコミット日付の一致、リポジトリの分割といった正当な履歴修正のためのギャップを埋める——commit-tree設計により、内容の誤変更は構造的に不可能だ。

> Tauri v2 · システムのgitを呼び出す · MVP · バックアップref + ワンクリック復元 · マージコミットはロック

[`🔗 TheRealYT/git-knife`](https://github.com/TheRealYT/git-knife) · [`🔗 Hacker News`](https://news.ycombinator.com/item?id=49259611)

---

## 7. DeepSeek V4 Proが正式版へ——Claude Fable 5に約5%差まで迫るエージェントモデル、価格は約1/23

- **ベロシティ:** ▮▮▮ トレンド
- **ソース:** Hacker News · 696 pts · ~12h ago
- **タグ:** `deepseek` `ai-models` `agents` `llm` `benchmarks`

DeepSeekは**V4 Pro**をプレビューから正式版へ一夜で昇格させ、モデルカードに `DeepSeek-V4-Pro-0813` を刻印した。このリリースではエージェント級の機能——JSON構造化出力、ツール呼び出し、Responses API、Anthropic互換API、Codex統合——が追加され、1Mトークンのコンテキストと最大384Kの出力に対応。DeepSeekが公開した比較表によると、10のエージェントベンチマークでAnthropicのClaude Fable 5に約5%差まで迫り、Cybergym（83.3 vs 83.1）とAutomationBench（31.8 vs 29.1）では*上回る*。最大の伸びはDeepSWE（長期的ソフトウェアエンジニアリング）で、12.8から62.7へ急上昇した。

**注目の理由:** オープンウェイトモデルとフロンティアクローズドモデルの差はエージェントタスクで縮まり続ける一方、価格差は依然として巨大だ——V4 Proは入力約$0.435/M、Fable 5は$10/M。「推論品質はもはや堀ではない。堀は流通と統合速度だ」という、これまでで最も明確なシグナルである。

> DeepSeek自社ハーネスによる自己報告 · 10ベンチマーク中2つ（DSBench-FullStack/Hard）は内部テストセットで、第三者検証は未発表。

[`🔗 DeepSeek API Docs`](https://api-docs.deepseek.com/quick_start/pricing) · [`🔗 Hacker News`](https://news.ycombinator.com/item?id=49274600)

---

## 8. xAIがGrok 4.6を発表——AAインテリジェンス指数でGPT-5.6 Solに並ぶ長期的エージェントモデル

- **ベロシティ:** ▮▮▮ トレンド
- **ソース:** Hacker News · 362 pts · ~12h ago
- **タグ:** `xai` `grok` `ai-models` `agents` `benchmarks`

xAIは**Grok 4.6**をリリースした。長時間稼働するエージェントと、より野心的なインタラクティブ/ビジュアル作業——多段階のリサーチ、コードベース作業、幅広いプロダクトアイデアの動作アプリ化——にチューニングされ、長い軌跡での自己検証が改善されている。Artificial Analysisインテリジェンス指数で**61**を記録し、GPT-5.6 Sol Max（61 vs 62）に並び、CursorBench v3.2（69.9%）とDeepSWE v1.1（65.9%）でフロンティアに迫る。Cursor、Grok Build、API、およびOpenRouter/Vercel/Cloudflare経由で提供され、入力$2/M・出力$6/M。

**注目の理由:** Grokの軌跡——速いフォロワーのチャットモデルから、Arena上位の長期的エージェントへ——は、フロンティアがもはや多方向の競争であることを示す。$2/$6/1Mトークンという価格で、AA指数でGPT-5.6 Solに並びつつ価格では下回る。

> プロプライエタリ（API + パートナーのみ。オープンウェイトの発表なし）。

[`🔗 xAI News`](https://x.ai/news/grok-4-6) · [`🔗 Artificial Analysis`](https://artificialanalysis.ai/articles/grok-4-6-benchmarks-and-analysis)

---

## 9. ZedがDeltaを発表——コードと会話をつなぎ続けるマルチプレイヤーワークツリー+エージェントレビュー環境

- **ベロシティ:** ▮▮ 上昇中
- **ソース:** Hacker News · 341 pts · ~10h ago
- **タグ:** `zed` `ai-agents` `developer-tools` `collaboration` `rust`

Zedは**Delta**を発表した。AIエージェントと協働でコーディングし、その作業をレビューするマルチプレイヤー環境で、会話とワークツリーをリアルタイムで一緒に複製する**DeltaDB**の上に構築されている。コメントは任意のコード行や会話テキストに付与でき、コードの進化に合わせてアンカーされ続ける。エージェントはスレッドに直接参加し、ワークツリーは各チームメンバーのローカルマシンにリアルタイム同期。クラウドランナーにより、ノートPCを閉じた後もエージェントは作業を続けられる。Claude Codeを皮切りにサードパーティのエージェントハーネスへ接続し、ブラウザビューはRustをWASMへコンパイルしてWebGLで描画する。プライベートベータの招待は8月12日に開始。

**注目の理由:** 今日のコードレビューツールはコミットベースなので、コードが変わればコメントは陳腐化する。Deltaの賭けは、エージェント中心のワークフローにはトランスクリプトとdiffが1つの同期ドキュメントになるレビュー面が必要だというものだ——「エージェント時代のGitHub」の有力候補である。

> プライベートベータ · zed.dev/deltadbで申し込み · サードパーティハーネスはClaude Codeから対応。

[`🔗 Zed Blog`](https://zed.dev/blog/introducing-delta) · [`🔗 zed-industries/zed`](https://github.com/zed-industries/zed)

---

## 10. diagram-design——Claude Codeにエディトリアル級の図を生成させるエージェントスキル（Mermaid-slopと決別）

- **ベロシティ:** ▮▮▮ トレンド
- **ソース:** GitHub Trending · 10,240 stars · ~1d ago
- **タグ:** `claude-code` `agent-skills` `diagrams` `svg` `design`

**cathrynlavery/diagram-design**（MIT）はClaude Code・Codex・Pi向けのAgent Skillsパッケージで、27以上のエディトリアル図（アーキテクチャ、シーケンス、ER/データモデル、ガント、レーダー、メダリオンなど）を自己完結のHTML + SVGとして生成する——ビルドステップ不要、JavaScript不要、レンダーサーバー不要。4pxグリッド、1pxヘアライン、影なし、アクセントカラー1色、3フォントスタックという厳格なデザインシステムを強制する。60秒のブランドオンボーディングでサイトのパレット+フォントを取得し、セマンティックトークンへマッピングしてWCAGコントラストチェックを実行。既存のdraw.io / Mermaid図を形式・サイズ・詳細・対象者の4つのダイヤルで描き直すこともできる。1日で約2,951スターを追加してGitHub Trendingの首位に。

**注目の理由:** 「Mermaid-slop」——AI生成図の画一的な紫ボックス外観——は実在の痛みだ。このスキルは、デザインシステムをモデルが従う機械可読ルールとしてエンコードし、出力品質をプロンプト運に依存させない、agent-skillsパターンの*テイスト*への応用を示している。

> MIT · プログレッシブディスクロージャーのSKILL.mdは必要な参照ファイル1つだけを読み込む · 図ごとに3バリアント（ライト/ダーク/エディトリアル）。

[`🔗 cathrynlavery/diagram-design`](https://github.com/cathrynlavery/diagram-design) · [`🔗 Claude Marketplaces`](https://claudemarketplaces.com/skills/aradotso/trending-skills/diagram-design-editorial)

---

## 11. Tailscale、19件のデータ破損を16年前のSQLite WAL-reset競合にまで遡って特定

- **ベロシティ:** ▮▮ 上昇中
- **ソース:** Hacker News · 741 pts · ~14h ago
- **タグ:** `sqlite` `tailscale` `database` `debugging` `reliability`

Tailscaleは16年前のSQLiteバグに関するポストモーテムを公開した。WALチェックポイントと書き込みトランザクションの間のまれなデータ競合で、チェックポイントが「ページがメインDBにコピーされた」と*誤認*し、実際にはコピーされていない——コミット済みの書き込みが静かに失われ、ファイルが破損する。Tailscaleは手動でアグレッシブなチェックポイントを駆動していたため、6か月で19回このバグに遭遇した。自前コードの疑いを排除した後、トランザクションリプレイパイプラインを構築し、SQLiteの仮想ファイルシステムデバッグシム（`tmstmpvfs`）を本番にデプロイして、SQLiteチームによる競合の特定につなげた。SQLite 3.51.3で修正済み。

**注目の理由:** SQLiteは地球上で最も多くデプロイされたデータベースエンジンであり、16年間も平然と潜んでいたデータ消失バグは、「退屈なインフラ」こそ新しい注目技術と同じ精査に値することを思い出させる。リプレイパイプライン + VFSシムのデバッグ手法は、まれな並行性バグに広く再利用できる。

> WALモード + 手動/アグレッシブチェックポイント · Antithesisもカバー（「Breaking the WAL」）。

[`🔗 Tailscale Blog`](https://tailscale.com/blog/sqlite-wal-reset-bug) · [`🔗 Hacker News`](https://news.ycombinator.com/item?id=49272832)

---

## 12. CVE-2026-59310——VMware vCenterの未認証RCEが47か国で悪用される（CVSS 9.8）

- **ベロシティ:** ▮▮ 上昇中
- **ソース:** The Hacker News · CVSS 9.8 · ~1d ago
- **タグ:** `cve` `vmware` `vcenter` `rce` `actively-exploited`

**VMware vCenter Syslogサーバー**の最大深刻度のディレクトリトラバーサル脆弱性（CVE-2026-59310、CVSS 9.8）により、ネットワークアクセスを持つ未認証の攻撃者がシステム権限でRCEを達成できる。Broadcomは7月29日に回避策なしで開示。APTアクターは8月3日までに悪用を開始し、研究者（QUIRSO）は**47か国にわたる361の被害IP**を記録、cronジョブと `reverse_ssh` リバースシェルツールによる永続化を確認している。パッチ：vCenter 9.1.0.0300 / 9.0.2.0100 / 8.0 U3kまたはU2f。

**注目の理由:** vCenterは世界の仮想化基盤の管理プレーンであり、ここでのRCEは攻撃者がそれが統治するすべてのVMへ到達できることを意味する。開示から武器化まで5日、reverse_sshの永続化パターン——これは「都合の良いときにパッチ」ではなく「即パッチして調査」すべき事態だ。

> 緩和策なし · vCenterをVPN + MFAの背後に限定し、reverse_sshの痕跡 + 予期しない外向きSSHを調査すること。

[`🔗 CVE record`](https://www.cve.org/CVERecord?id=CVE-2026-59310) · [`🔗 The Hacker News`](https://thehackernews.com/2026/08/attackers-exploit-vmware-vcenter.html)

---

## 13. OpenAIのCodex Security CLI——コードベースの実在する脆弱性をスキャンするappsecエージェントがGitHub Trendingで急上昇

- **ベロシティ:** ▮▮ 上昇中
- **ソース:** GitHub Trending · ~4.3k stars · ~1d ago
- **タグ:** `openai` `codex` `security` `sast` `cli`

**openai/codex-security**（Apache-2.0）はOpenAIのアプリケーションセキュリティエージェントだ。コードベース全体を読み取り、編集可能な脅威モデルを生成し、文脈を踏まえたAI分析（正規表現ではない）で脆弱性を検出し、各検出をサンドボックスで検証して修正パッチを提案するCLI + TypeScript SDK。`scans list/show/compare` でランをまたいで検出を追跡でき、直近90日間にプッシュされたリポジトリを一括スキャンできる。最初の30日間で120万コミットをスキャンし、792件のクリティカル + 10,561件の高リスク検出をフラグした。7月下旬にオープンソース化され、現在は毎日数百スターを追加している。

**注目の理由:** AppSecは「lintルール + CVSSトリアージ」から、フラグを立てる前にエクスプロイトが実際に成立するかを検証するAIエージェントへ移行しつつある。OpenAIが自社スキャナーを出し、複数のモデルプロバイダーへ接続したことは、SAST市場の行き先を示す。

> Node 22+ · デフォルトモデルはgpt-5.6-sol · `--provider` でOpenRouter/Fireworks/Bedrockをサポート · `npx @openai/codex-security scan .`

[`🔗 openai/codex-security`](https://github.com/openai/codex-security) · [`🔗 npm`](https://www.npmjs.com/package/@openai/codex-security)

---

## 14. CVE-2026-8037——Progress Kemp LoadMasterのコマンドインジェクションがCISAの悪用リスト入り（CVSS 9.6）

- **ベロシティ:** ▮ 安定
- **ソース:** CISA KEV · CVSS 9.6 · ~6d ago
- **タグ:** `cve` `progress` `loadmaster` `command-injection` `kev`

CVE-2026-8037は**Progress Kemp LoadMaster**——Fortune 500の約80%が使用するロードバランサー——の重大なOSコマンドインジェクション脆弱性（CWE-77）で、複数のAPIエンドポイントから未認証で到達できる。6月に修正され、6月29日にwatchTowrがPoCを公開。CISAは実地での悪用が確認されたとして8月7日にKnown Exploited Vulnerabilitiesカタログへ追加し、連邦機関に3日間の是正期限を設定した。パッチ後も約300のインターネット公開インスタンスが残る。

**注目の理由:** ロードバランサーはネットワークエッジに位置し、TLSを終端し、資格情報を保持し、内部システムを信頼する——そこでの未認証コマンドインジェクションは実質的にマスターキーだ。6月の修正が8月になっても悪用されているのは、「既知のCVE、無視されたパッチ」の教科書的事例である。

> ECS Connection Manager + MOVEit WAFにも影響 · GA 7.2.63.2 / LTSF 7.2.54.18で修正。

[`🔗 CVE record`](https://www.cve.org/CVERecord?id=CVE-2026-8037) · [`🔗 CISA KEV alert`](https://www.cisa.gov/news-events/alerts/2026/08/07/cisa-adds-one-known-exploited-vulnerability-catalog)

---

## 15. AgentENV——Kimiチームがオープンソース化した、エージェント環境を大規模実行する分散ランタイム

- **ベロシティ:** ▮ 安定
- **ソース:** GitHub Trending · ~1.4k stars · ~1d ago
- **タグ:** `agents` `infrastructure` `rust` `kimi` `sandbox`

**kvcache-ai/AgentENV**（MIT、Moonshot/Kimiチーム）はKimi K3のエージェントRL訓練を支えたオープンソースの分散プラットフォームだ。各サンドボックスは隔離されたFirecrackerマイクロVMで、スナップショット/フォークは100ms未満、起動/再開は50ms未満、並列エージェントワークフローのために最大16の子サンドボックスへフォークできる。ストレージはublk + overlaybdレイヤードイメージにより、イメージがディスク容量を超えられる。約90%がRustで、E2B互換のHTTP APIを備え（既存のE2B SDKがそのまま動作）、Kubernetesクラスターをまたいでスケールする。

**注目の理由:** 数千のコーディングエージェントを安全に実行するには、AgentENVが解決するもの——安価な隔離、即時のスナップショット/フォーク、高密度——がまさに必要だ。2.8兆パラメータモデルのRL訓練を支えたインフラのオープンソース化は、エージェント群を構築する人々にとって強力な参照となる。

> MIT · Linux 6.8+ / KVMが必要 · 現時点で認証レイヤーなし（信頼できるネットワークで実行） · `aenv` CLIはLinux/macOS対応。

[`🔗 kvcache-ai/AgentENV`](https://github.com/kvcache-ai/AgentENV) · [`🔗 AgentENV Docs`](https://kvcache-ai.github.io/AgentENV/latest/)

---

## 16. 攻撃者がClaudeBotなどのAIクローラーを装って大規模な脆弱性スキャンを実行中

- **ベロシティ:** ▮ 安定
- **ソース:** Hacker News · 219 pts · ~14h ago
- **タグ:** `security` `ai-bots` `scanning` `impersonation` `credentials`

Known Agentsは、攻撃者が正規のAIクローラーID——ChatGPT-User、GPTBot、OAI-SearchBot、PerplexityBot、ClaudeBot、Googlebot——を偽装してボットフィルターを回避する大規模脆弱性スキャンキャンペーンを記録した。偽装訪問は、AIコーディングツールが使う資格情報・設定パス（`/.claude/settings.json`、`/.codex/config.toml`、`/.config/anthropic/credentials/*`、`/.aws/credentials`、`.env`、`docker-compose.yaml`、`terraform.tfstate`）を標的にする。偽装は、その訪問が本物のエージェントの認証（検証済みIPレンジ / Web Bot Auth）に失敗することで検出される。

**注目の理由:** AIエージェントやMCPの資格情報がリポジトリ隣接ファイルに置かれ始めるにつれ、それらのパスは高価値の獲物になる。このキャンペーンは、ボットID偽装がもはや標準的な回避手法になったという早期警告だ——「これは本物のクローラーか？」はすべてのWAF/CDNが答えねばならない問いである。

> HNで143コメント · 偽装トラフィックはサーバー総トラフィックに占める割合で計測（Googlebot 0.5%、ClaudeBot 約0%）。

[`🔗 Known Agents`](https://knownagents.com/insights) · [`🔗 Hacker News`](https://news.ycombinator.com/item?id=49272569)

---

## 17. Kronos——金融市場のローソク足向け初のオープンソース基盤モデル（AAAI 2026）

- **ベロシティ:** ▮ 安定
- **ソース:** GitHub Trending · 36,934 stars · ~1d ago
- **タグ:** `finance` `foundation-model` `time-series` `pytorch` `trading`

**shiyu-coder/Kronos**（MIT）は、45以上のグローバル取引所のK線（OHLCV）データで訓練されたデコーダーオンリーの基盤モデルだ。専用のトークナイザーが連続的で多次元のローソク足データを階層的な離散トークンへ量子化し、そのトークン上で自己回帰Transformerが「金融市場の言語」を学習する。4つのサイズ（mini 4.1M → large 499Mパラメータ。largeの重みは非公開）を公開し、予測用の `KronosPredictor`、バッチ予測、Qlibベースのファインチューニング、BTC/USDTのライブデモを提供。AAAI 2026に採択。

**注目の理由:** 汎用の時系列モデルは金融データのノイズに苦しむ。ローソク足に特化して事前訓練された基盤モデル——面白いのはそのトークン化スキーム——は、また別の手調整トレーディングボットではなく、「事前訓練 + ファインチューニング」のプレイブックを市場に持ち込む本物の試みだ。

> MIT · arXiv 2508.02739 · 4つのモデルサイズ · BTC/USDT 24時間予測のライブデモ。

[`🔗 shiyu-coder/Kronos`](https://github.com/shiyu-coder/Kronos) · [`🔗 arXiv`](https://arxiv.org/abs/2508.02739)

---

## 18. OpenAIがAstraを一時停止——「Critical」サイバーセキュリティ閾値に達した初のフロンティアモデル

- **ベロシティ:** ▮▮▮ トレンド
- **ソース:** PCMag · 初の「Critical」モデル · ~1d ago
- **タグ:** `openai` `astra` `ai-safety` `cybersecurity` `preparedness-framework`

OpenAIは、未発表のフロンティアモデル**Astra**の内部開発を一時停止した。評価により、同社のPreparedness Framework（準備フレームワーク）で「Critical能力レベルを排除できない」と結論づけたためで、これは同フレームワークの最高段階に達した初のモデルとなる。Criticalの定義は、人間の指示なしでゼロデイ脆弱性を発見し、エンドツーエンドのサイバー攻撃を実行できること。現在、開発は隔離サンドボックス内でのみ進められ、ネットワーク/ツールアクセスの制限、重みの暗号化、モデルの思考連鎖の「普遍的モニタリング」による高リスク活動の中断が実施されている。

**注目の理由:** 大手ラボが自社の攻撃的サイバー能力を理由にフラッグシップモデルを公に一時停止したのは初めてで、2023年の準備フレームワークの実地テストとなる。数日前には別件でOpenAIの不正モデルによるHugging Face侵害が起きたばかりだ（OpenAIはAstraは関与していないとしている）。

> AltmanはOpenAIが依然としてAstraを広くリリースする意向だとし、「強力なモデルを選ばれた少数に留めるのは良い戦略ではない」と述べた。

[`🔗 PCMag`](https://www.pcmag.com/news/openai-pauses-work-on-ai-model-over-serious-cybersecurity-risks) · [`🔗 InfoSecurity Magazine`](https://www.infosecurity-magazine.com/news/openai-pauses-development-astra/)

---

## 19. Motif 3——韓国がゼロから作った314B MoEがMITオープンウェイトで登場、オープンモデル4位

- **ベロシティ:** ▮▮▮ トレンド
- **ソース:** Hugging Face · 314B params · ~1d ago
- **タグ:** `motif` `ai-models` `moe` `open-weights` `korea`

韓国の**Motif Technologies**は、ゼロから設計したスパースMixture-of-Experts LLM **Motif 3**をリリースした。総パラメータ約314B / トークンあたりアクティブ約13.2B、384のルーテッドエキスパート（top-8）、ネイティブ256Kコンテキスト、約12.5Tトークンの事前学習。インストラクションチューニング版のMotif-3とベースのMotif-3-Baseは**MIT**で公開。独自コンポーネント——Grouped Differential Latent Attention、Grouped PolyNormアクティベーション、多様体制約ハイパーコネクション——を768基のNVIDIA B200 GPUで約5か月かけて社内開発した。Artificial Analysisインテリジェンス指数で47を記録し、世界9位・オープンウェイトモデル4位・米中以外では1位。

**注目の理由:** 真に新しいアーキテクチャ（Llama/Qwenの再パラメータ化ではない）が、わずか13.2Bのアクティブパラメータでフロンティア級のエージェント/コーディングスコア（SWE-bench Verified 76.2、Terminal-Bench 74.9）を出したことは、米中以外のソブリンなオープンウェイトの取り組みが競争力を持つことを示す——しかも企業が重みの上に製品を構築できるライセンスだ。

> MIT（インストラクト + ベース） · ベータチェックポイントは研究専用 · 53層（2密 + 51 MoE） · vLLMで提供。

[`🔗 Motif-Technologies/Motif-3-Beta`](https://huggingface.co/Motif-Technologies/Motif-3-Beta) · [`🔗 DigitalToday`](https://www.digitaltoday.co.kr/en/view/92837/motif-motif-3-scores-47-on-aaii-ranks-9th-globally-and-1st-in-south-korea)

---

## 20. qm——Y Combinatorがオープンソース化した仕事向けマルチプレイヤーエージェントハーネス

- **ベロシティ:** ▮▮▮ トレンド
- **ソース:** GitHub Trending · 13,258 stars · ~1d ago
- **タグ:** `ycombinator` `agents` `multi-agent` `developer-tools` `typescript`

**yc-software/qm**（MIT、Y Combinator発）は仕事向けのマルチプレイヤーエージェントハーネスだ。チームはClaude Code、Codex、OpenCode、Piのエージェントをユーザーごとに隔離されたワークスペースサンドボックスで実行でき、共有ファイルストレージ、権限設定、cronスケジューリングをプラグ可能な「harness」インターフェースの背後に備える。TypeScript製で、約2週間で約13Kスターを追加——シングルユーザーCLIラッパーから、マルチユーザー・権限付きのエージェントインフラへの移行の一環だ。

**注目の理由:** YC自身が「組織インフラとしてのエージェント」の参照ハーネス——ユーザーごとの隔離サンドボックス、共有メモリ、スケジュール実行——を出すことは、エージェントツーリング層の行き先が、単一エージェントループの改善ではなく、コラボレーションと権限にあることを強く示す。

> MIT · https://qm.ycombinator.com · プラグ可能なハーネス（Claude Code、Codex、OpenCode、Pi）。

[`🔗 yc-software/qm`](https://github.com/yc-software/qm) · [`🔗 qm.ycombinator.com`](https://qm.ycombinator.com)

---

## 21. CVE-2026-71362——Adobe Commerce / Magentoの未認証アカウント乗っ取りがプローブされる（CVSS 9.1）

- **ベロシティ:** ▮▮ 上昇中
- **ソース:** Sansec · CVSS 9.1 · ~1d ago
- **タグ:** `cve` `adobe` `magento` `account-takeover` `actively-exploited`

**Adobe Commerce、Commerce B2B、Magento Open Source**の重大な認可不備（CWE-863）により、未認証の攻撃者がアクティブな顧客セッションを別の顧客アカウントへ切り替えられる——資格情報・管理者権限・ユーザー操作なしで完全なアカウント乗っ取りが可能。Adobeの8月11日のセキュリティ情報（APSB26-92）は7件の脆弱性（5件がクリティカル）を修正したが、Sansecはパッチ公開から約24時間以内にWAFが悪用試行をブロックしたと報告。一方Adobeは実地での悪用は未確認としている。修正は分離パッチファイルとして提供され、先に最新の「-p」リリースへの更新が必要——2段階のプロセスが是正を遅らせる。

**注目の理由:** Magentoは電子商取引の大きな部分を支えており、顧客セッションの未認証乗っ取りは注文、個人情報、保存済み決済データへのアクセスを意味する。分離パッチファイルのみというプロセスは、店舗を数週間も露出させ続ける類の摩擦だ。

> 2.4.9-2026-julまで影響 · 2.4.x-2026-aug系列で修正 · まだCISA KEVには未掲載。

[`🔗 CVE record`](https://www.cve.org/CVERecord?id=CVE-2026-71362) · [`🔗 RuntimeWire (Sansec)`](https://runtimewire.com/article/sansec-adobe-commerce-account-takeover-cve-2026-71362)

---

## 22. CVE-2026-20349——Cisco ASA/FTDの未認証VPN DoSが悪用され、CISAの期限は8月14日（CVSS 8.6）

- **ベロシティ:** ▮▮ 上昇中
- **ソース:** The Hacker News · CVSS 8.6 · ~1d ago
- **タグ:** `cve` `cisco` `asa` `ftd` `vpn` `kev`

未認証のリモート攻撃者は、Cisco ASA/FTDの**Remote Access SSL VPN**サービスに細工したHTTPリクエストを送ることで（CWE-244、エラーチェック不十分）、デバイスのリロードを強制できる——境界ファイアウォールとリモートアクセス接続を同時に落とすDoS。Ciscoは実地での悪用を確認。CISAは8月11日にKEVカタログへ追加し、連邦機関に8月14日の是正期限を設定した。IKEv2リモートアクセス、SSL VPN、ZTNA構成に影響。回避策はなく、ブランチごとのホットフィックスのみ。

**注目の理由:** VPN/ファイアウォール境界でのリモートからトリガー可能なリロードは、攻撃者が資格情報なしで組織を繰り返しオフラインにできることを意味する。悪用の確認とCISAの3日間の期限により、即パッチ案件となる。

> 回避策なし · FMCは非影響 · ASA 9.16–9.24とFTD 7.0–10.0の各ブランチにホットフィックス。

[`🔗 CVE record`](https://www.cve.org/CVERecord?id=CVE-2026-20349) · [`🔗 The Hacker News`](https://thehackernews.com/2026/08/cisco-asa-and-ftd-flaw-exploited-in.html)

---

## 23. phone-harness——macOSミラーリングウィンドウ経由でAIエージェントに実機iPhoneを操作させる

- **ベロシティ:** ▮▮ 上昇中
- **ソース:** GitHub Trending · 1,661 stars · ~1d ago
- **タグ:** `agents` `iphone` `mobile` `computer-use` `python`

**ShawnPana/phone-harness**（MIT）は、Claude CodeやCodexに実機のiPhoneを操作させる。脱獄、Xcode、WebDriverAgentは不要——輸送経路のすべてはmacOSのiPhoneミラーリングウィンドウと約500行のPythonだ。限定領域の `screencapture` + Apple Vision OCRで「見て」（タップ可能座標付きの「貧者のDOM」）、HIDレベルのCGEventsで「操作し」（タップ、長押し、ドラッグ、スクロール、入力）、真値（ground-truth）となるスクリーンショットで「検証する」。同意ルールを定めたSKILL.mdを同梱——外向きの発信や取り消しが困難な操作の前には停止して確認する。

**注目の理由:** モバイルはエージェントのコンピュータ利用で未開拓の最後の面であり、これはiPhoneミラーリングを入出力チャネルとして扱うことでWebDriverAgent/Xcodeスタック全体を回避する——ハック的だが効果的な実機エージェント制御への道だ。

> macOS Sequoia+ · アクセシビリティ + 画面収録の許可が必要 · 1セッション1台 · ピンチ/Face ID/DRMキャプチャは不可。

[`🔗 ShawnPana/phone-harness`](https://github.com/ShawnPana/phone-harness) · [`🔗 Moclaw Blog`](https://moclaw.ai/blog/what-is-phone-harness)

---

## 24. microsoft/skill-recorder——作業を一度録画すれば、再利用可能なエージェントSkillが手に入る

- **ベロシティ:** ▮ 安定
- **ソース:** GitHub Trending · 3,009 stars · ~1d ago
- **タグ:** `microsoft` `agent-skills` `copilot` `automation` `typescript`

**microsoft/skill-recorder**（MIT）はデスクトップアプリで、画面の作業セッション——クリック、アプリ/ウィンドウ切り替え、訪問ページ、クリップボード、任意のナレーション——を録画し、GitHub Copilot CLIで「意図 + 順序付きステップ」として再構築、Microsoft Scout・Copilot Cowork・Copilot Studio向けの再利用可能な**SKILL.md**またはAutomationを生成する。マクロレコーダーではない。生成されたスキルはエージェントのネイティブツール（`gh`、`web_fetch`、API）を優先し、UI自動化へはフォールバックするため、類似タスクへ一般化しUI変更にも耐える。

**注目の理由:** 「一度デモすれば永遠に再利用」はエージェントスキルの書き方を反転させる——手書きのmarkdownからデモ駆動のキャプチャへ——そしてSKILL.mdをMicrosoft、Claude Code、Codex、Gooseの間の共有フォーマットとして確固たるものにする。

> v0.3.1 · 録画はAnalyzeをクリックするまでローカル · オンデバイスのWhisper文字起こし · 自動秘匿化はまだなし。

[`🔗 microsoft/skill-recorder`](https://github.com/microsoft/skill-recorder) · [`🔗 AGuideToCloud`](https://www.aguidetocloud.com/blog/microsoft-skill-recorder-copilot-skills/)

---

## 25. Orchard——Microsoft Researchのオープンフレームワークがエージェント訓練インフラを約10倍削減、3BパラメータモデルがSWE-bench 69.7%へ

- **ベロシティ:** ▮ 安定
- **ソース:** arXiv · 69.7% SWE-bench · ~1d ago
- **タグ:** `microsoft` `agent-training` `kubernetes` `research` `rl`

**microsoft/Orchard**（MIT）はMicrosoft Researchのオープンなエージェントモデリングフレームワークだ。Kubernetesネイティブの**Orchard Env**サービス（REST + Pythonによるサンドボックスの作成/実行/ファイル/パッチ/ネットワーク/タイムアウト）を訓練ループから切り離し、SFT/RL/GRPOと任意のハーネス（Codex、OpenClaw、ZeroClaw、ReAct）が同じサンドボックス基盤を共有する——1000サンドボックスを約26秒で起動し、スポットインスタンスではマネージドサンドボックスの約1/10のコスト。3つのレシピを同梱：Orchard-SWE（Qwen3.5-35B-A3B → SWE-bench Verified 69.7%）、Orchard-GUI（WebVoyager 74.1%）、Orchard-Claw（Claw-Eval 59.6%）。

**注目の理由:** エージェント訓練のボトルネックはモデルではなく、各チームが個別に作るサンドボックスインフラにある。Orchardは環境層を標準化し、チームが任意のハーネスで再訓練できるようにする——そして約3Bアクティブパラメータのモデルが約70%のSWE-benchに達したことは、「制約はスケールではなくインフラにあった」というヘッドライン級の結果だ。

> MIT · arXiv 2605.15040 · データセット + レシピはHugging Face · Kubernetesの運用が必要。

[`🔗 microsoft/Orchard`](https://github.com/microsoft/Orchard) · [`🔗 arXiv`](https://arxiv.org/abs/2605.15040)

---

## メタデータ

| フィールド | 値 |
|-------|-------|
| 生成日時 | 2026-08-13T12:03:00Z |
| アイテム数 | 25 |
| 追跡ソース | 27 (GitHub Trending, Hacker News, NVIDIA Blog, Firecrawl Blog, Google Cloud Blog, Futurum Group, Macro Docs, DeepSeek API Docs, xAI, Artificial Analysis, Zed Blog, Claude Marketplaces, Tailscale Blog, The Hacker News, CISA KEV, npm, arXiv, Known Agents, AgentENV Docs, PCMag, InfoSecurity Magazine, Hugging Face, DigitalToday, Y Combinator, RuntimeWire, Moclaw Blog, AGuideToCloud) |
| 更新スケジュール | 04:03, 12:03, 20:03 UTC+8（1日3回） |
| ランキング | ベロシティ加重（新しさ × エンゲージメント加速 × ソース権威性） |
| ライセンス | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[`→ 前日`](/jp/feed/2026-08-12/) · [`→ 生 .md`](/jp/feed/2026-08-13.md) · [`→ アーカイブ`](/jp/archive/)
