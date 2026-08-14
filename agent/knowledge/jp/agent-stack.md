---
title: エージェント基盤スタック
topic: agent-stack
created: 2026-08-13
---

# エージェント基盤スタック（2026年8月）

AIエージェントスタックの構成要素。2026年8月のトレンドウィンドウでそれぞれオープンソースの勝者を生んだ。

## ランタイム / 実行基盤
- **Cloudflare Computer** — `@cloudflare/computer`、MIT。SQLiteをバックエンドとする永続的な仮想
  ファイルシステム。高速なserverless isolateとフルLinuxコンテナの間をオーケストレーション
  （コンテナが必要なのはエージェント作業の10%未満）。単一の入口（`workspace.runtime.exec()`）が
  3つのバックエンドにまたがる——フルLinux**コンテナ**（FUSEマウント）、**bash isolate**（Dynamic
  Worker）、**JavaScript isolate**——ファイルは `@cloudflare/dofs`（SQLite Durable Object
  ファイルシステム）で永続化され、すべてのread/write/execがゲート・監査・観測される。
  Cloudflare Agents Week 2026の一部。7,300+ stars、preview専用。
- **Cloudflare OS** — `cloudflare/cloudflare-os`、オープンソース。ブラウザベースのAIワークスペース：
  自然言語からアプリを構築。V8 isolateサンドボックス、ゼロトラストがデフォルト（ネットワーク無効、
  機密操作には「Gatekeepers」による承認）。Cloudflare Agents Week 2026、Computerと同時期。
- **Orca** — `stablyai/orca`、MIT、TypeScript。"Agent Development Environment"：複数のAIコーディング
  エージェントを並列実行し、それぞれを分離されたgit worktreeで動かす。27+のCLIエージェント、
  モバイルコンパニオン、WebGLターミナル。42K stars。
- **AgentENV** — `kvcache-ai/AgentENV`（Moonshot/Kimiチーム）、MIT、約90% Rust。Kimi K3の
  エージェンティックRLトレーニングを支えた分散プラットフォーム：各サンドボックスは隔離された
  FirecrackerマイクロVMで、スナップショット/フォークが100ms未満、起動/再開が50ms未満、最大16の
  子プロセスへフォークして並列エージェントワークフローを実行。ublk + overlaybdのレイヤード
  イメージ（イメージがディスク容量を超えられる）。E2B互換HTTP API（既存のE2B SDKがそのまま
  動く）。Kubernetesクラスタでスケール。認証層はまだ無し（信頼できるネットワークで運用）。
  約1.4K stars。
- **phone-harness** — `ShawnPana/phone-harness`、MIT、約500行のPython。Claude Code / Codexが、脱獄も
  XcodeもWebDriverAgentも不要で実機iPhoneを操作できるようにする——トランスポートはmacOSのiPhone
  Mirroringウィンドウ。スコープ付き `screencapture` + Apple Vision OCRで「見て」（タップ可能な座標を
  持つ「貧者のDOM」）、HIDレベルのCGEventsで「動き」（タップ、長押し、ドラッグ、スクロール、入力）、
  グラウンドトゥルースのスクリーンショットで「検証する」。同意ルール付きSKILL.mdを同梱（外向き/取り
  消し困難な操作の前には停止して確認）。macOS Sequoia+、アクセシビリティ + 画面収録の許可が必要。
  約1.7K stars。モバイルはエージェントのコンピュータ操作における最後の未開拓面。MirroringをI/Oに
  することでWebDriverAgent/Xcodeのスタック全体を回避する。
- **Orchard** — `microsoft/Orchard`、MIT（Microsoft Research）。Kubernetesネイティブのエージェン
  ティックモデリングフレームワーク：**Orchard Env**サービス（REST + Pythonでサンドボックスのcreate/
  exec/file/patch/network/timeoutsを提供）を訓練ループから分離し、SFT/RL/GRPOと任意のハーネス
  （Codex、OpenClaw、ZeroClaw、ReAct）が1つのサンドボックス基盤を共有——スポットインスタンスで
  管理型サンドボックスの約1/10のコスト、約26秒で1,000サンドボックスを起動。3つのレシピ：
  Orchard-SWE（Qwen3.5-35B-A3B → 69.7% SWE-bench Verified）、Orchard-GUI（WebVoyager 74.1%）、
  Orchard-Claw（Claw-Eval 59.6%）。arXiv 2605.15040。シグナル：エージェント訓練はモデルではなく
  個別構築のサンドボックス基盤がボトルネックだった——約3Bアクティブパラメータで約70% SWE-benchに
  達したのは、スケールではなく基盤が制約だったことを示す。

- **DeepSeek Harness** — `deepseek-ai/deepseek-harness`、MIT、v0.1デベロッパープレビュー
  （TypeScript）。**Cordis**プラグインシステムの上に築かれたコーディング + オフィスエージェント
  フレームワーク：モデル、ツール、スキル、セッション、サンドボックス、ストレージ、スケジュー
  リング、UIがすべて組み合わせ可能なプラグイン——開発者は設定レイヤーで能力を拡張・置換し、コア
  には触れない。4つの実行モード（Standard、PTCプログラム的ツール呼び出し、Minimal、Create）。
  追記専用のセッションログ + Trajectoryビューがresume/fork/retrieve/replayをサポート。
  `npx @deepseek-ai/dsh web`。約38.9K stars。シグナル：DeepSeekが「安価なフロンティアモデル」の
  戦略をハーネス層へ拡張——そして「すべてがプラグイン」とは、Agent Plugins 1.0.0を採用せず*独自*
  のプラグインシステム（Cordis）を構築したことを意味し、フォーマット断片化のウォッチ項目
  （[[agent-plugins]]参照）。

## モデルルーティング
- **NeMo Switchyard** — `NVIDIA-NeMo/Switchyard`、Apache 2.0、Rust。OpenAI Chat / Anthropic
  Messages / OpenAI Responses の間を翻訳し、各リクエストをモデルのプール（vLLM、NVIDIA NIM、
  Ollama、任意のOpenAI互換エンドポイント）へルーティングするプロキシ/ライブラリ。アプリの書き
  換え不要。組み込みルーター：`llm_classifier`、`stage_router`、escalation、`random`、さらに
  `passthrough`。内部ベンチマーク：Claude Opus 4.8単独の約1/3のコストでフロンティア級の精度。
  LangChainはフロンティアモデルへ送るのを7%に絞ってコストを74%削減——*6%の精度トレードオフ*を
  伴う（145件のマルチターン Deep Agents タスク）。pre-alpha（v1.0前にAPI変更あり）。30B-MoEの
  Nemotron 3.5 Lightningと同時に発表。[[smart-routing]]参照。

## メモリ
- **TencentDB-Agent-Memory v2** — `TencentCloud/TencentDB-Agent-Memory`、MIT。会話/ドキュメント/
  コードをChat Memory、Skills、LLM-Wiki、CodeGraphに変換。v2.0.0で**Team Memory**を追加——
  4つの再利用可能な資産（L0会話 → L3ペルソナ蒸留を含むChat Memory、バージョン付きSkills、
  LLM-Wiki、CodeGraph）をMemory HubコンソールのACL可視性（`private`/`team`/`restricted`）で
  ガバナンス。ハイブリッド検索 = BM25 + ベクトル + 逆順位融合（RRF）。PersonaMem精度は48% →
  76%と報告。Claude Code/OpenAIプロトコル向けMemory Proxy。80日で15K+ stars。SQLite +
  sqlite-vec（BM25）。
- **メモリ標準化のギャップ（未解決）：** MCP（ツール/データアクセス）とA2A（エージェント間、いずれも
  Linux Foundation）は収束したが、どちらも*永続的で統制された共有メモリのレコード*を型定義していない
  ——著者/信頼度/プロヴェナンスのフィールド、メモリ空間の権限、競合/順序のセマンティクスがない。
  各フレームワークが独自に実装し（Mem0、Zep、Letta、独自ベクトルストア）、切り替えるとメモリがゼロに
  戻る。OWASP ASI06「Memory & Context Poisoning」が今やクロスエージェントのメモリ交換を攻撃経路と名指す
  （書き込みゲート、プロヴェナンス、セグメンテーション、保存済みメモリを信頼できない入力として扱う）。
  提案：**Agent Memory Hall**（型付きMemoryCell——fact/preference/constraint/lesson/risk；3段階の信頼度
  raw_source→llm_derived→human_confirmed と、LLM由来メモリ同士の上書きを防ぐ「Anti-Ouroboros」ルール；
  アイデンティティACL；追記専用監査；MCPサーバーとして動作）と **Portable Agent Memory**
  （Episodic/Semantic/Procedural/Working/Identity モデル、Merkle-DAGプロヴェナンス）。TencentDB Team
  Memory と Macro のMCP公開チームメモリはその場しのぎでギャップを埋めるのみ。クロスシステム標準は
  まだ存在しない。

## オールインワンワークスペース
- **Macro** — `macro-inc/macro`、AGPL-3.0、SolidJS + Rustバックエンド（167クレート、42のデプロイ
  可能サービス）。オールインワンのチームワークスペース：Gmail風メール、チャンネル/DM、Linear風
  タスク、CRDTベースのドキュメント、2Dキャンバス、CRM、通話、エージェント——すべてを共有AI
  メモリ付きの双方向グラフに@リンク。「完全にオープンソース——オープンコアではない」。チーム
  メモリはレート制限なしでMCP経由で公開。SOC 2 Type II / ISO 27001。約1.6K stars。
- **holaOS** — `holaboss-ai/holaOS`（Holaboss）、オープンソース、6.9K stars。ローカルファーストの
  「AIエージェントワークスペース」で、Claude Code・Codex・内蔵エージェントを共有メモリ・ツール・
  ファイル・実ブラウザ上で並行実行する。差別化点は**メモリをディスク上のプレーンテキストファイル**
  にする点——可読・編集可能でエージェント/セッション間で共有——さらに「修正をルール化」する仕組みが
  あなたの修正を永続的なルールに変える。フロンティアモデル（Kimi K3、GLM 5.2、GPT 5.6、Claude Opus 5、
  Fable 5）同梱またはBYOK。100以上の統合、MCP対応、「HolaApps」によるライブUI埋め込み。シグナル：
  「メモリ＝ファイル」は強力なデバッグ可能性/信頼の選択——ただしメモリ形式の可搬性が、オープン標準
  に留まるかholaOSロックインになるかを決める（前述のメモリギャップに関連）。

## ブラウザ / コンピュータ操作
- **ego-lite** — `citrolabs/ego-lite`、MIT（CitroLabs）、10.1K stars。人間とAIエージェントがタブを
  取り合わずに1つのブラウザを共有するChromiumベースのブラウザ：既存のChromeデータ（ログイン/cookie/
  拡張）を一度だけ移行し、各エージェントに隔離されたプロセス内「Space」を与え、あなたは前面で
  ブラウジングを続ける。エージェントは `ego-browser` スキル層を通じてJavaScript関数を呼び（複数
  ステップのタスクを1つのスクリプトに合成）、ページスナップショットはChromiumアクセシビリティツリー
  で約30,000→約200–400トークンに圧縮。READMEはCLIブラウザ手法より複雑なワークフローを最大2.5×高速化、
  別インスタンス比で約94%省メモリと主張。現在macOSのみ。シグナル：「ログインの壁」——エージェントは
  あなたのセッションを共有するか、未ログインで始めるしかない——がブラウザ自動化の最大の摩擦であり、
  「同一ログイン状態・隔離スペース」はその具体的な回答。

## ナレッジ / プロヴェナンス
- **Semantica** — `semantica-agi/semantica`、MIT、4.1K stars。エージェント向けのセルフホスト型
  グラフネイティブレイヤー：RDF/LPGデュアルグラフストレージ、Rete推論エンジン、派生ファクト
  ごとのW3C PROV-Oプロヴェナンス、7つのベクトルDBバックエンド。決定的グラフ推論 + LLMは曖昧な
  抽出のみ → 監査可能で再現可能な判断。`pip install semantica`。**v0.6.5**はセキュリティリリース
  で、外部から報告された5件の脆弱性（Explorerルートの認証欠落、Cypher/SPARQLインジェクション）
  を修正。

## スキル / ルーティング
- **google/skills** — `google/skills`、Apache 2.0。約110個のMarkdownベースのスキル（参照ファイル +
  エージェントがオンデマンドで読み込むコードスニペット）で、GKE、BigQuery、Cloud Run、Gemini
  API、Firebase、Google AdsなどのGoogleプロダクトとマルチプロダクト「ソリューション」ワーク
  フローをカバー。`npx skills add google/skills`。Google Cloud Next 2026での発表時は13個で、現在
  約110に増加。各スキルはAgent Skillsフォーマット（`SKILL.md` + オプションのscripts/references）
  に従う。オープンなAgent Skillsフォーマットの参照実装で、**Agent Plugins 1.0.0**として標準化
  ——[[agent-plugins]]参照。約18K stars。
- **agent-skills** — `casualuser/agent-skills`（Addy Osmani）、MIT。24個のSKILL.mdワークフローが
  シニアエンジニアの規律（コードレビュー、TDD、セキュリティ、CI/CD、リリース）をエンコード。56.9K stars。
- **reverse-skill** — `zhaoxuya520/reverse-skill`、MIT。20+のセキュリティシナリオ（APK/バイナリRE、
  ペンテスト、CTF、EDRバイパス）、41のルーティングルール + 163の回帰テスト。22.4K stars。
- **Qwen-MM-Plugins** — `QwenLM/Qwen-MM-Plugins`、Apache 2.0。8つのマルチモーダル能力（ビジョン、
  動画メモリ、Blender/FreeCAD CAD）をインストール可能なスキル + MCPとして提供。競合ハーネスを
  アップグレードしてQwenモデルを呼び出せるようにする。
- **diagram-design** — `cathrynlavery/diagram-design`、MIT。Claude Code、Codex、Pi向けのAgent
  Skillsパッケージで、27+種のエディトリアル図（アーキテクチャ、シーケンス、ER/データ、ガント、
  レーダー、メダリオンなど）を自己完結型のHTML + SVGとして生成——ビルドステップなし、JavaScript
  なし、レンダーサーバーなし。デザインシステムを機械可読ルールとしてエンコード（4pxグリッド、
  1pxヘアライン、影なし、アクセントカラー1色、3フォントスタック）。60秒のブランドオンボーディング
  がサイトのパレット/フォントをスクレイピングしてWCAGコントラストチェック。draw.io/Mermaid図も
  ダイヤル付きで再描画。約10.2K stars、1日で+2,951。スキルが製品ハウツーだけでなく*センス*も
  エンコードするようになった証拠——[[agent-plugins]]参照。

## オーケストレーション / ハーネス
- **Prime Agent** — `PrimeIntellect-ai/prime-agent`、MIT。Recursive Language Model（RLM）：
  永続的なIPython REPLでコンテキストを一級変数として扱う。自己改善のためのContinual Harness。
  Opus 5でARC-AGI-3を95.5%。
- **Multi-Agent-CAD** — `Pan-Chera/Multi-Agent-CAD`（清華大学IEI Lab）、MIT。4エージェントの
  text-to-CADで、コンパクトな構造化JSON状態受け渡し。シングルエージェントよりトークン116×削減。
- **qm** — `yc-software/qm`、MIT（Y Combinator）。仕事向けのマルチプレイヤーエージェントハーネス：
  チームがClaude Code / Codex / OpenCode / Piエージェントをユーザーごとのワークスペースサンドボックス
  で実行し、共有ファイルストレージ、権限設定、cronスケジューリングを、プラガブルな「ハーネス」
  インターフェースの背後に備える。TypeScript。約2週間で13K stars。シグナル：単一ユーザーのCLI
  ラッパーから、マルチユーザーで権限管理されたエージェント基盤への移行——「組織の基盤としての
  エージェント」。

- **Cline Kanban** — `cline/kanban`、Apache 2.0、リサーチプレビュー。1つのリポジトリに対してCLI
  コーディングエージェント（Cline、Claude Code、Codex、OpenCode——自動検出）を並列実行するローカル
  Webボード。各カードは一時的なgit worktreeを起動し（`node_modules`などgit無視ファイルをシンボリッ
  クリンクで共有）、エージェントがマージ競合なしで並走。カードは依存DAGに連鎖でき、auto-commit/
  auto-PRトグルと組み合わせてパイプラインに。組み込みレビューループが行内diffコメントをエージェント
  へ返す。`npx kanban`。worktree-per-taskが並列エージェントオーケストレーションの標準の隔離プリミティ
  ブになった（Cline CLI v3.0.3も`--worktree`を追加）。
- **LoopX** — `huangruiteng/loopx`、MIT（ByteDanceのエンジニア）。長時間稼働するエージェントチーム
  向けの、プロバイダ中立の**状態カーネル**：目的、型付きtodo、claim/lease、エビデンスログ、クォータ
  認識の自動ウェイク、検証可能な引き継ぎが、Codex / Claude Code / Cursorが有界なターンを実行する間
  も安定し続ける。意図的に*ランタイムではない*——「ループを続けてよいか？」に答え、決して真実の源
  ではないKanban（例：Lark/Feishuアダプター）へ投影する。`.loopx/`ディレクトリにローカルファースト、
  Python標準ライブラリ以外の依存なし。危険な権限と本番書き込みは人間がゲート。約4.6K stars。シグナル：
  エージェント実行が数日へ伸びるにつれ、欠けている層はターンをまたぐ永続状態 + 人間のゲート——
  「ボードは投影、カーネルが真実」。

- **Mole** — `lajosdeme/mole`、Apache 2.0、単一のGoバイナリ。コストとプロヴェナンスを「助言的」では
  なく*強制可能*にするターミナルのディープリサーチエージェント：**強制予算**がすべてのモデル呼び
  出しを、非負のDB制約を持つ台帳に対して予約・決済し（`--usd 0.50`は超過0%を主張）；**検証済み引用**
  は、その引用がソースに逐語的に現れない主張を答えに届く前に破棄；**プライバシー境界**はローカルの
  CSV/フォルダを分析しつつ、集計（5レコード以上のバケット）だけをマシンの外へ出す。MCPを話すので、
  コーディングエージェントが駆動できる。シグナル：「ディープリサーチ」は増殖しているが、その信頼の
  問題——コスト超過、幻覚の引用、ローカルデータ漏えい——は、プロンプトではなく*強制される仕組み*
  （台帳制約、引用検証）で答えられつつある。LoopXの人間ゲートと同じ「信頼＝コード」の方向。

### 分解：プラグイングラフ + 状態カーネル + 隔離プリミティブ

3人の新規参入者が同じアーキテクチャを異なる角度から描く：**DeepSeek Harness**はあらゆるコンポーネ
ントをプラグイン化し（*プラグイングラフ*）、**LoopX**は永続状態 + 人間のゲートをランタイムから分離
し（*状態カーネル*）、**Cline Kanban**はgit-worktree-per-taskを並列エージェントの*隔離プリミティブ*
にする（Orca、Cline CLI `--worktree`と並ぶ）。モノリシックなCLIはこの3つの分離可能な層へ分解され
つつある——統合は*層ごとに*起きており、1つのモノリスへ集約されるのではない。

## 教育
- **ai-agent-book** — `bojieli/ai-agent-book`（Li Bojie）、Apache 2.0。"Deep Understanding of AI
  Agent"：10章、92の実行可能な実験、8言語。29K stars。

## レビュー / コラボレーション
- **Zed Delta** — `zed-industries/zed`（8月12日発表、プライベートベータ）。AIエージェントでコードを
  書き、その作業をレビューするためのマルチプレイヤー環境。**DeltaDB**——会話とワークツリーを一緒に
  リアルタイムで複製するデータベース——の上に構築。コメントは任意のコード行に付き、コードが進化
  してもアンカーされ続ける。エージェントはスレッドに直接参加。ワークツリーは各チームメイトの
  マシンへ同期。クラウドランナーがノートPCを閉じた後もエージェントを動かし続ける。Rust → WASM +
  WebGLのブラウザビュー。Claude Codeを皮切りにエージェントハーネスへ接続。賭けは、エージェント
  主体のワークフローにはトランスクリプトとdiffを1つの同期ドキュメントとしてレビューする面が必要
  というもの——「エージェント時代のGitHub」。

## セキュリティ（スタックの裏側）
- **Langflow** CVE-2026-9198 — CVSS 9.8、CWE-94コードインジェクション、CISA KEV + 活発な悪用。
  実は*2つの*独立した欠陥の連鎖：`/api/v1/auto_login`（CVE-2026-9103——`AUTO_LOGIN`がデフォルトで
  有効で、未認証の呼び出し元にSUPERUSER JWTを発行）→ `/api/v1/validate/code`（CVE-2026-8481——
  ユーザーPythonをサンドボックスなしで`exec()`）。エクスプロイトはデフォルト引数トリック
  （`def _v(a=exec('<payload>')): pass`）を使う。なぜならPythonはデフォルト値を定義時に評価する
  から。影響は1.0.0–1.10.0、1.10.1で修正。公開エクスプロイト + Nucleiテンプレート + Nessus 334529あり。
- **mcp-grafana** CVE-2026-19516 — CVSS 9.1、CWE-918 SSRF。呼び出し元制御の`X-Grafana-URL`ヘッダーが
  外向きリクエストの*宛先*を制御し、`grafana_api_request`ツールが呼び出し元にmethod/path/bodyの
  選択を許す。宛先は設定済みGrafanaインスタンスに固定されていない → サーバーはループバック
  （127.0.0.1）、リンクローカル/クラウドメタデータ（169.254.169.254）、RFC1918レンジへのSSRF
  プロキシになる。前身CVE-2026-15583（混乱した代理人トークン流出）の修正は、トークンが攻撃者の
  指定した宛先へ送られるのを止めた——しかしその修正は*宛先そのもの*を開いたまま残し、それが
  19516が依然として成立する理由。影響は≤1.0.0、1.0.1で修正。検証の経緯は[[fact-check]]参照。
- **Semantica** v0.6.5 — セキュリティリリース。外部から報告された5件の脆弱性（Explorerルートの
  認証欠落、Cypher/SPARQLインジェクション）を修正。プロヴェナンス/監査可能性の基盤でさえ今や
  攻撃面であることの証明——MCPサーバーだけではない。
- **OpenAI Codex Security** — `openai/codex-security`、Apache 2.0。AppSecエージェント：CLI +
  TypeScript SDKがコードベース全体を読み、編集可能な脅威モデルを生成し、文脈的AI分析（正規表現
  ではない）で脆弱性を見つけ、各発見をサンドボックスで検証し、修正パッチを提案。実行をまたいで
  発見を追跡（`scans list/show/compare`）。最初の30日で120万コミットをスキャンし、792件のクリティ
  カル + 10,561件の高リスクをフラグ。デフォルトモデルはgpt-5.6-sol、`--provider`でOpenRouter/
  Fireworks/Bedrockをサポート。約4.3K stars。シグナル：SASTは「lintルール + CVSSトリアージ」から
  「エクスプロイトが実際に機能するか検証してからフラグする」エージェントへ移行中。
- **AIクローラーなりすまし** — 攻撃者がChatGPT-User/GPTBot/OAI-SearchBot/PerplexityBot/ClaudeBot/
  Googlebotを偽装してボットフィルタを回避し、AIコーディングツールがリポジトリ隣接に残す認証情報/
  設定パス（`/.claude/settings.json`、`/.codex/config.toml`、`/.config/anthropic/credentials/*`、
  `/.aws/credentials`、`.env`、`docker-compose.yaml`、`terraform.tfstate`）をスキャン。偽装訪問は
  本物のエージェントの認証（検証済みIPレンジ / Web Bot Auth）を通過できないため検出される。
  早期警告：「これは本物のクローラーか？」が今やすべてのWAF/CDNの問いであり、エージェントの認証
  情報ファイルは高価値の獲物。
- **Vercel deepsec** — `vercel-labs/deepsec`、Apache 2.0（Vercel Labs）、6.5K stars。脆弱性発見を
  多段エージェントパイプラインに変えるエージェント駆動のセキュリティハーネス：正規表現のみの静的
  スキャンが候補を浮かび上がらせ、コーディングエージェント（Claude Opus 4.7とCodex GPT-5.5、最大
  推論）がデータフローを追跡して緩和策を確認し、再検証パスが誤検出率を約10–20%に削減、gitメタデータ
  が発見に責任者を付与する。完全に自前インフラで動作（ソースは外に出ない）；モノレポでは1,000以上の
  同時Vercel Sandboxに展開；冪等/再開可能。シグナル：AppSecがシグネチャマッチングからエージェント
  による調査へ移行——DeepSeek Harness / Cline Kanbanと同じ「ハーネス」パターンをセキュリティに適用、
  その代償は実計算コスト（大規模スキャンは数万ドルに達しうる）。上記のOpenAI Codex Securityと隣接；
  違いは展開型サンドボックス艦隊 + 責任者の帰属。
- **Cl0p / PTC Windchill** CVE-2026-12569 — CVSS 9.8の未認証RCE（PTC Windchill PDMLink/FlexPLMの
  安全でないデシリアライゼーション、11.0 M030で修正）、FlexPLM WSDLエンドポイントの事前認証情報
  漏えいと連鎖して16進名のJSPウェブシェルを配置し、エンジニアリング/設計データを窃取。ロシア系の
  Cl0pは8月13日、約50社（Shell、Philips、GE、Fiserv）からのデータ窃取を公表、その前の7月19–20日
  から脅迫メールを送り始めていた。6月25日からCISA KEV掲載。シグナル：MOVEitの再演——広く展開された
  エンタープライズPLM製品を1-dayで悪用し、サプライチェーンを大規模に恐喝。戦利品はPIIではなく製品
  設計・エンジニアリングIP。

- **GeoServer SQLインジェクションゼロデイ（8月15日）**——未パッチ、CVEなし：`jsonArrayContains`
  関数のSQLインジェクションがH2 `sa` / MSSQL admin設定下で**RCE**に到達。8月12日の開示から数時間で
  探索された（watchTowr）。「広く展開されたOSS + 未パッチのSQLi/RCE」という繰り返し現れる欠陥クラス
  で、Apache Alluraのgitインジェクションと同じ形。
- **Windows DNS Server CVE-2026-62878（8月15日）**——CVSS 9.8のスタックバッファオーバーフロー、
  未認証/ネットワーク到達/対話不要、ZDIによれば「ワーム化可能」。Microsoftの398 CVEにおよぶ8月の
  Patch Tuesdayの目玉で、活発に悪用される **CVE-2026-62832**（LegacyHive、User Profile Service →
  SYSTEM）と並ぶ。

### MCP SSRF監査チェックリスト（テンプレート：CVE-2026-19516）

MCPデプロイ向けの再利用可能なスイープ——外向きHTTPを持つすべてのMCPサーバーは潜在的なSSRF
ピボット。順に実行する：

1. **列挙**——外向きリクエストを行うすべてのMCPサーバー/ツールを洗い出す。
2. **呼び出し元制御の入力を追跡**——宛先URL/ホスト、パス、メソッド、ボディ、ヘッダーのどこに
   到達するか。mcp-grafanaでは宛先は*ヘッダー*として届き、method/path/bodyはツール引数経由。
3. **宛先は固定されているか。** 呼び出し元の入力が許可リストの*外側*に届くならSSRF。特に
   ブロックすべきは：ループバック（127.0.0.0/8）、リンクローカル/メタデータ（169.254.0.0/16、
   169.254.169.254）、RFC1918プライベートレンジ、サーバー自身のエグレス。
4. **どんな資格情報が同乗するか。** 混乱した代理人バリアント（CVE-2026-15583）は*サービス
   アカウントトークン*を攻撃者指定のホストへ流出させる。宛先の修正だけで資格情報の修正がない
   のは不完全——それが19516の晒した二層のギャップそのもの。
5. **レスポンスは呼び出し元に届くか。** 読み取りSSRF = データ流出（クラウドメタデータ → IMDS
   資格情報 → アカウント乗っ取り）。書き込み専用SSRFは深刻度が低いが、それでもピボット。
6. **エグレス制御 + 隔離。** ループバック/リンクローカル/メタデータ/RFC1918を、必要でない限り
   ネットワーク層でブロック。MCPサーバーは到達範囲が最小のセグメントで運用。`X-Grafana-URL`
   型の呼び出し元ヘッダーをプロキシで除去/拒否。
7. **バージョン固定と修正ごとの再監査。** 15583 → 19516の流れは、単一パッチが欠陥クラスを
   閉じることは稀だと示す。各修正を再チェックの開始点として扱い、終点としない。

隣接ウォッチ項目：**Langflow**は同じ形を一段深く示す——`exec()`に到達するMCP隣接のエージェント
ツールは、SSRFを必要とせずRCEへの一直線。
