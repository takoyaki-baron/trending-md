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
  （コンテナが必要なのはエージェント作業の10%未満）。Cloudflare Agents Week 2026の一部。7,300+ stars。
- **Cloudflare OS** — `cloudflare/cloudflare-os`、オープンソース。ブラウザベースのAIワークスペース：
  自然言語からアプリを構築。V8 isolateサンドボックス、ゼロトラストがデフォルト（ネットワーク無効、
  機密操作には「Gatekeepers」による承認）。Cloudflare Agents Week 2026、Computerと同時期。
- **Orca** — `stablyai/orca`、MIT、TypeScript。"Agent Development Environment"：複数のAIコーディング
  エージェントを並列実行し、それぞれを分離されたgit worktreeで動かす。27+のCLIエージェント、
  モバイルコンパニオン、WebGLターミナル。42K stars。

## メモリ
- **TencentDB-Agent-Memory v2** — `TencentCloud/TencentDB-Agent-Memory`、MIT。会話/ドキュメント/
  コードをChat Memory、Skills、LLM-Wiki、CodeGraphに変換。チームガバナンス（ACL）、
  Claude Code/OpenAIプロトコル向けMemory Proxy。15K+ stars。SQLite + sqlite-vec（BM25）。

## ナレッジ / プロヴェナンス
- **Semantica** — `semantica-agi/semantica`、MIT、4.1K stars。エージェント向けのセルフホスト型
  グラフネイティブレイヤー：RDF/LPGデュアルグラフストレージ、Rete推論エンジン、派生ファクト
  ごとのW3C PROV-Oプロヴェナンス、7つのベクトルDBバックエンド。決定的グラフ推論 + LLMは曖昧な
  抽出のみ → 監査可能で再現可能な判断。`pip install semantica`。

## スキル / ルーティング
- **agent-skills** — `casualuser/agent-skills`（Addy Osmani）、MIT。24個のSKILL.mdワークフローが
  シニアエンジニアの規律（コードレビュー、TDD、セキュリティ、CI/CD、リリース）をエンコード。56.9K stars。
- **reverse-skill** — `zhaoxuya520/reverse-skill`、MIT。20+のセキュリティシナリオ（APK/バイナリRE、
  ペンテスト、CTF、EDRバイパス）、41のルーティングルール + 163の回帰テスト。22.4K stars。
- **Qwen-MM-Plugins** — `QwenLM/Qwen-MM-Plugins`、Apache 2.0。8つのマルチモーダル能力（ビジョン、
  動画メモリ、Blender/FreeCAD CAD）をインストール可能なスキル + MCPとして提供。競合ハーネスを
  アップグレードしてQwenモデルを呼び出せるようにする。

## オーケストレーション / ハーネス
- **Prime Agent** — `PrimeIntellect-ai/prime-agent`、MIT。Recursive Language Model（RLM）：
  永続的なIPython REPLでコンテキストを一級変数として扱う。自己改善のためのContinual Harness。
  Opus 5でARC-AGI-3を95.5%。
- **Multi-Agent-CAD** — `Pan-Chera/Multi-Agent-CAD`（清華大学IEI Lab）、MIT。4エージェントの
  text-to-CADで、コンパクトな構造化JSON状態受け渡し。シングルエージェントよりトークン116×削減。

## 教育
- **ai-agent-book** — `bojieli/ai-agent-book`（Li Bojie）、Apache 2.0。"Deep Understanding of AI
  Agent"：10章、92の実行可能な実験、8言語。29K stars。

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
