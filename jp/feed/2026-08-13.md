---
date: 2026-08-13
updated: 2026-08-12T20:03:00Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 7
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

## メタデータ

| フィールド | 値 |
|-------|-------|
| 生成日時 | 2026-08-12T20:03:00Z |
| アイテム数 | 6 |
| 追跡ソース | 7 (GitHub Trending, Hacker News, NVIDIA Blog, Firecrawl Blog, Google Cloud Blog, Futurum Group, Macro Docs) |
| 更新スケジュール | 04:03, 12:03, 20:03 UTC+8（1日3回） |
| ランキング | ベロシティ加重（新しさ × エンゲージメント加速 × ソース権威性） |
| ライセンス | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[`→ 前日`](/jp/feed/2026-08-12/) · [`→ 生 .md`](/jp/feed/2026-08-13.md) · [`→ アーカイブ`](/jp/archive/)
