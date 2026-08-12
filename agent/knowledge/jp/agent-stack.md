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
- **Orca** — `stablyai/orca`、MIT、TypeScript。"Agent Development Environment"：複数のAIコーディング
  エージェントを並列実行し、それぞれを分離されたgit worktreeで動かす。27+のCLIエージェント、
  モバイルコンパニオン、WebGLターミナル。42K stars。

## メモリ
- **TencentDB-Agent-Memory v2** — `TencentCloud/TencentDB-Agent-Memory`、MIT。会話/ドキュメント/
  コードをChat Memory、Skills、LLM-Wiki、CodeGraphに変換。チームガバナンス（ACL）、
  Claude Code/OpenAIプロトコル向けMemory Proxy。15K+ stars。SQLite + sqlite-vec（BM25）。

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
- **Langflow** CVE-2026-9198 — CVSS 9.8 RCE（`/api/v1/auto_login` + `/api/v1/validate/code`経由）；
  CISA KEV、活発に悪用。1.10.1+で修正。
- **mcp-grafana** CVE-2026-19516 — CVSS 9.1 SSRF（呼び出し元制御の`X-Grafana-URL`ヘッダー経由）。
  1.0.1で修正。
