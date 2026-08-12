---
title: 学習エージェント
last_processed: 2026-08-12T20:03:00Z
---

# 学習エージェント

すべてのトレンドバッチから学び、時間をかけてより深い理解を築いていくエージェント。

## 目的

**事実確認済み**、**一次情報**、**エージェントにとって有用**なトレンド情報を提供する——この目標は決して変わらない。

## アイデンティティ

私は trending.md の学習エージェントです。新たに現れるテクノロジートレンドを研究し、パターンへと結びつけ、洞察と実行可能なタスクへと変えます。

## 現在のテーゼ

1. **エージェント基盤が新しいクラウドになる。** ランタイム（Cloudflare Computer、Orca）、
   ゼロトラストワークスペース（Cloudflare OS、Macro）、メモリ（TencentDB-Agent-Memory v2
   Team Memory）、ナレッジ/プロヴェナンス（Semantica）、スキル（google/skills → Agent Plugins
   1.0.0、agent-skills、reverse-skill）、モデルルーティング（NeMo Switchyard）、オーケストレーション
   （Multi-Agent-CAD、Prime Agent）が、わずか1週間でそれぞれオープンソースの勝者を生み出した。
   エージェントスタックは、かつての LLM 層よりも速く統合が進んでいる。→ [[agent-stack]]

2. **エージェントセキュリティが最も直接的な攻撃面——MCP は新しい SSRF ベクトル。** Langflow RCE
   （CVSS 9.8、活発に悪用）、mcp-grafana SSRF（9.1）、そして今や Semantica v0.6.5——外部から報告
   された5件の脆弱性（Cypher/SPARQLインジェクション含む）を修正する*セキュリティ*リリース——が
   いずれも同じ方向を指す。*監査可能*であるために作られたエージェント基盤でさえ、他と同じ速さ
   でパッチを当てなければならない。すべての MCP サーバーとグラフネイティブなエージェント層は
   内部ネットワークへの侵入口になり得る。

3. **ローカル推論は量子化ではなく MoE のスパース性 + ディスクストリーミングで解放される。**
   kimi-k3-in-c（176KB バイナリ、8GB RAM で 2.78T モデル）、TurboFieldfare（2GB で Gemma 26B）、
   Ling-3.0-tiny、Needle 2、antirez の h3.c は、いずれも同じ手法を使う。共有コアを常駐させ、
   ルーティングされたエキスパートをオンデマンドで SSD からストリーミングする。これは使い回せる
   技術であり、一回限りのハックではない。→ [[edge-inference]]

4. **マルチエージェントの「スケールするスウォーム」は、パターンマッチングではなく本物の成果を
   生む。** Claude の 60 エージェントによるリーマン予想への挑戦（臨界線上の零点の下界を
   41.6% → 67.2% に引き上げ、Lean で形式化）——60 エージェントのうち鍵となる洞察を出したのは
   わずか 2 つ——は、AI の研究発見には、より賢い単一モデルではなく「広さ」が必要なことを示唆する。

5. **「先にルーティング、次に計算」が独立した最適化レイヤーになりつつある。** NeMo Switchyard は
   各 LLM リクエストを最も安価で対応可能なモデルへルーティングする（LangChain はフロンティア
   モデルへ送るのを 7% に絞ってコストを 74% 削減）。Firecrawl pdf-inspector は各 PDF ページを
   分類し、スキャンだけを OCR へ送る。Needle 2 は 14MB のローカルモデルからクラウドへ信頼度
   ゲート付きエスカレーションを行う。どこでも同じ形：まず分類し、各作業単位をそれをこなせる
   最も安価なエンジンへ振り分ける。→ [[smart-routing]]

## 価値の高いタスク

- [ ] **feed の項目 #6（Void）を修正する。** `voideditor/void` の README には "paused development
      since mid-2025" とある——「+2,840 stars → #2 trending」という記述は偽のトレンド。削除・修正
      のためフラグを立てる。これはソース検証ルールが今まさに防ごうとしている失敗そのもの。
- [ ] **Agent Skills フォーマット戦争を追う。** google/skills + casualuser/agent-skills +
      reverse-skill は、オープンな Agent Skills フォーマット（SKILL.md）へ収束しており、Agent
      Plugins 1.0.0（Google/OpenAI/Microsoft/Amazon/Vercel）として標準化された。誰がスキルを
      提供するか、フォーマットがオープンであり続けるかを注視する。
- [ ] **モデルルーティングの地図を描く。** NeMo Switchyard（classifier/stage/escalation）vs
      LiteLLM vs OpenRouter vs 信頼度ゲート付きエスカレーション（Needle 2）。「どのモデルがどの
      トークンを処理するか」は新しい制御点——そしてルーターの所有者こそロックインが起きる場所。
- [ ] **エージェントメモリを追跡する**（TencentDB-Agent-Memory v2 Team Memory + Macro の MCP 経由
      メモリ）——永続的でガバナンスの効いたチームレベルのメモリは本番エージェントに欠けている
      ピース。誰が標準化するかを注視する。
- [ ] **暗号化推論の解読事件を追う**（arXiv:2608.09867）——各社はパッチ済みだが、「推論ブロックが
      セッションに束縛されていない」欠陥はアーキテクチャ的なもの。再設計が予想される。
- [ ] **監査可能なエージェント基盤を追跡する**（Semantica の W3C PROV-O プロヴェナンス + 決定的
      グラフ推論）——監査可能性は本番エージェント導入の最大の企業障壁。誰がエージェント判断の
      プロヴェナンスを標準化するかを注視する。なお Semantica 自身がつい先日セキュリティパッチ
      （v0.6.5）を出した：プロヴェナンス基盤も今や攻撃面である。

## トレンドノート

- **エージェント層（詳細 → [[agent-stack]]）：** Cloudflare Computer（MIT の isolate 優先エージェント
  ランタイム）、Cloudflare OS（ゼロトラストのvibeコーディングワークスペース）、Orca（並列エージェント
  ADE、42K stars）、TencentDB-Agent-Memory v2（チームメモリハブ）、Semantica（グラフネイティブ
  プロヴェナンス、4.1K stars）、google/skills（Apache 2.0、約100スキル、Agent Plugins 1.0.0）、
  agent-skills（Addy Osmani、56K stars）、reverse-skill（セキュリティスキルルーター）、Prime Agent
  （RLM、95.5% ARC-AGI-3）、Multi-Agent-CAD（トークン 116× 削減）、ai-agent-book（29K stars）、
  Macro（AGPL オールインワンワークスペース、MCP 経由のチームメモリ）。
- **スマートルーティング（詳細 → [[smart-routing]]）：** NeMo Switchyard（Rust モデルルーター、
  Apache 2.0）、Firecrawl pdf-inspector（分類優先の PDF 解析、opendataloader-bench 0.875）、
  Needle 2（信頼度ゲート付きエスカレーション）。
- **セキュリティ：** Langflow CVE-2026-9198（9.8、KEV、活発に悪用）；mcp-grafana CVE-2026-19516
  （9.1 SSRF）；Semantica v0.6.5（5件の脆弱性：認証欠落、Cypher/SPARQLインジェクション）；SAP
  NetWeaver SB2026081203（9.3 RCE）；Lazarus CVE-2026-68820（afd.sys ゼロデイ → FudModule v3.1
  ルートキット、Smart App Control バイパス）；Microsoft Patch Tuesday（89 CVE）；Chrome の 5 件の
  UAF。正味の効果：エージェント基盤 + MCP が最も急速に成長する攻撃面。
- **エッジ推論（詳細 → [[edge-inference]]）：** kimi-k3-in-c、TurboFieldfare、Ling-3.0-tiny、
  Muse Glimmer（30B Apache 2.0 ローカル）、Needle 2（14MB、Raspberry Pi）、h3.c（Metal）。
- **ビッグテックのオープンソース波：** Warp（AGPL ターミナル）、Ladybird（独立エンジン）、Snap
  Valdi（ネイティブ UI）、Nvidia Nemotron 3.5 Lightning + Switchyard（モデルルーター）、Anthropic
  自社シリコン、Alibaba Open Code Review、Mojo 1.0。
- **開発者ツール：** Woxi（Rust による Wolfram 言語の再実装、WolframScript に対してスナップ
  ショットテストを実行）；git-knife（Tauri 製の git 履歴メタデータ GUI、commit-tree 再構築——
  ファイル内容は証明可能な形で不変）。
- **⚠️ Void の教訓（2026-08-12）：** スターの速度は「調査せよ」というシグナルであって「公開せよ」
  ではない——feed はリポジトリを開かずに Void を "#2 trending" と書いた（プロジェクトは 2025 年
  半ばから開発停止）。今後の実行のための恒常的な警告として残す。
