---
date: 2026-08-14
updated: 2026-08-14T20:03:00Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 23
license: CC-BY-4.0
---

# trending.md — 高密度トレンドシグナル

機械可読なトレンド情報。**ベロシティ**でランク付け——注目がどれだけ速く移り変わっているか。
AIエージェント向けに構築。人間も読めます。
→ 生フィード: [`/jp/feed/latest.md`](/jp/feed/latest.md)
→ アーカイブ: [`/jp/feed/`](/jp/feed/)

---

## 1. アリババがQwen3.8-2.4T-A95Bをオープンソース化——初のQwen-Max級フラッグシップ、2.4兆パラメータ

- **ベロシティ:** ▮▮▮ トレンド
- **ソース:** Hugging Face · 2.4T params · ~1d ago
- **タグ:** `alibaba` `qwen` `open-weights` `moe` `llm`

アリババのQwenチームは**Qwen3.8-2.4T-A95B**のオープンウェイトを公開した。Qwen-Max級（フラッグシップ）モデルが完全にオープンソース化されるのはこれが初めて。細粒度Mixture-of-Experts（MoE）で、**総パラメータ2.4兆（トークンあたり約95Bを活性化）**、レイヤーあたり512エキスパート（ルーテッド10 + 共有1）、Gated DeltaNet + Gated Attentionのハイブリッドアーキテクチャ、マルチトークン予測で訓練。ネイティブコンテキストは262Kトークンで約1Mまで拡張可能。オープン版はテキストのみ、思考モードは強制。自己報告ベンチマークはTerminal-Bench 2.1が86.6、PaperBench 93.0、GPQA Diamond 92.6、SWE-bench Pro 67.7。ウェイト（BF16で約4.9TB）はHugging FaceとModelScopeでカスタムQwen3.8-Maxライセンスの下に公開。

**注目の理由:** 能力曲線の最上位でオープンとクローズドの差を埋めるものだ。ダウンロード可能なQwen-Max級モデルは、これまでアリババのAPIを呼ぶしかなかったチームのファインチューニングとセルフホスティングの経済性を変える。中国ラボがフロンティア級のオープンウェイトを、米国ラボがより小型で高速なモデルを出す、という2026年の構図をさらに推し進める。

> テキストのみ · 思考モードは無効化不可 · vLLM/SGLang/TokenSpeedで、またはNVIDIA GB300 NVL72ラック全体でFP8・GPUあたり4000+ tok/sで運用可能。

[`🔗 Hugging Face`](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B) · [`🔗 NVIDIA Technical Blog`](https://developer.nvidia.com/blog/serve-qwen3-8-2-4t-a95b-a-2-4t-parameter-model-with-configurable-reasoning-on-nvidia-gb300-nvl72/)

---

## 2. DeepSeekがHarnessをオープンソース化——「すべてがプラグイン」なClaude Code対抗のエージェントフレームワーク

- **ベロシティ:** ▮▮▮ トレンド
- **ソース:** GitHub · 38.9k stars · ~18h ago
- **タグ:** `deepseek` `agents` `plugin-architecture` `typescript` `cli`

DeepSeekは**DeepSeek Harness**（v0.1、MIT）の開発者プレビューを公開した。**Cordis**プラグインシステム上に構築されたコーディング・オフィス向けエージェントフレームワークだ。モデル、ツール、スキル、セッション、サンドボックス、ストレージ、スケジューリング、UIはすべて組み合わせ可能なプラグインで、開発者はハーネスのコアを変更せずに設定層で機能を拡張・置換できる。4つの実行モード（Standard、PTCプログラム的ツール呼び出し、Minimal、Create）を同梱し、追記専用セッションログとTrajectoryビューで再開・フォーク・取得・再生に対応。`npx @deepseek-ai/dsh web`で起動する。

**注目の理由:** DeepSeekは「安価なフロンティアモデル」戦略をハーネス層にまで拡張し、OpenAI CodexとClaude Codeを直接狙う。「すべてがプラグイン」は、モノリシックなCLIから組み合わせ可能なエージェントランタイムへという2026年の大きな流れとも一致し、DeepSeekはスタック全体をオープンソース化している。

> 開発者プレビュー——互換性を破る変更が予想される · コミット12k超 · `dsh-plugin`トピックでプラグインを発見。

[`🔗 deepseek-ai/deepseek-harness`](https://github.com/deepseek-ai/deepseek-harness) · [`🔗 DoNews`](https://www.donews.com/news/detail/1/6670452.html)

---

## 3. CVE-2026-72898——MetabaseのSQLインジェクションがCVSS 10.0、悪用進行中、CISA期限は今日

- **ベロシティ:** ▮▮▮ トレンド
- **ソース:** Bishop Fox · CVSS 10.0 · ~3d ago
- **タグ:** `cve` `sql-injection` `metabase` `kev` `cvss-10`

Metabaseの`POST /api/session/reset_password`エンドポイントに未認証SQLインジェクション（CVSS 10.0）が存在し、遠隔の攻撃者はアプリケーションデータベースに任意のSQLを注入して完全な管理者権限を奪える。Metabaseが保持する、接続済みの全ウェアハウス（Snowflake、BigQuery、Databricksなど）への常設認証情報も含む。Metabaseは8月6日にゼロデイとして開示し、実際の悪用を確認。CISAは8月11日に既知の悪用脆弱性（KEV）カタログへ追加し、連邦機関の修復期限を**8月14日（今日）**とした。各ブランチで修正済み：x.58.24+、x.59.21+、x.60.17+、x.61.11+、x.62.9+、x.63.5+。一時回避策はパスワードリセットエンドポイントの遮断。

**注目の理由:** 本番データストアへの生きた認証情報を持つBIツールは理想的な踏み台だ。注入クエリ1本で接続済みの全データベースへ連鎖的に到達できる。約2500のインターネット公開インスタンスと流通する公開PoCを考えれば、未パッチのセルフホスト展開は格好の標的であり、パッチ適用だけでは過去の侵害を解消できない。

> セルフホストのx.58–x.63ブランチが対象 · x.58未満は影響なし · Metabase Cloudは修正済み。

[`🔗 Bishop Fox`](https://bishopfox.com/blog/critical-sql-injection-in-metabase-via-password-reset-cve-2026-72898) · [`🔗 CISA KEV`](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)

---

## 4. ClineがKanbanを公開——各カードが独自のgit worktreeで動くローカルなマルチエージェントスケジューラ

- **ベロシティ:** ▮▮ 上昇中
- **ソース:** GitHub · 1.3k stars · ~1d ago
- **タグ:** `cline` `multi-agent` `worktree` `orchestration` `cli`

Clineは**Kanban**（Apache 2.0、リサーチプレビュー）を公開した。同一リポジトリ上で複数のCLIコーディングエージェントを並列実行するローカルWebボードだ。各タスクカードは一時的なgit worktreeを起動し（`node_modules`などgitignore対象ファイルはシンボリックリンクで共有）、エージェント同士がマージ競合なしで並行作業できる。カードは依存チェーンで連結でき、自動コミット/自動PRと組み合わせれば自律パイプラインになる。内蔵のレビューループはインラインのdiffコメントをエージェントに返す。インストール済みのCLIエージェント（Cline、Claude Code、Codex、OpenCode）を自動検出し、`npx kanban`で完全ローカルに動作する。

**注目の理由:** 「タスクごとにworktree」は並列エージェントオーケストレーションの標準的な隔離プリミティブになりつつある（Cline CLI v3.0.3も`--worktree`フラグを追加）。Kanbanはそのプリミティブを、単一コードベース上のコーディングエージェント群を操作するポイント・アンド・クリックのコントロールプレーンにした。

> リサーチプレビュー——権限バイパスやランタイムフックなどCLIエージェントの実験的機能を使い、より高い自律性を実現。

[`🔗 cline/kanban`](https://github.com/cline/kanban) · [`🔗 Cline Docs`](https://docs.cline.bot/usage/kanban)

---

## 5. Ponytail——「最も怠惰なシニア開発者」エージェントスキル——挑戦を受けて自らベンチマークを修正

- **ベロシティ:** ▮▮ 上昇中
- **ソース:** GitHub · 82k stars · ~1d ago
- **タグ:** `agent-skills` `yagni` `benchmark` `claude-code` `codegen`

**Ponytail**（github.com/DietrichGebert/ponytail）はコーディングエージェントに7段の「意思決定ラダー」を注入する——それが存在する必要があるか、既に存在するか、標準ライブラリやネイティブの1行で済むかを確認してから最小限を書く（「最高のコードは、書かなかったコードだ」）。当初の「コード削減80–94%」という主張はScott LogicのColin Eberhardtに挑戦され、裸の「YAGNI原則に従え」プロンプトがそのベンチマークで上回ることが示された。作者は公平なエージェントベースライン（実際のFastAPI/Reactリポジトリで12件の機能チケットをヘッドレスClaude Codeが編集）でベンチマークを再構築し、平均**約54%のコード削減**、約20%のコスト削減、約27%の高速化へと公開修正した。

**注目の理由:** 1つのスキルを超えて、評価基準のないまま増殖するエージェントスキルというカテゴリ全体へのひな型だ。Ponytailの応答——公開された行動テストフレームワークと再現可能なベンチマーク——は「スキルは主張を証明すべき」という期待を打ち立てる。

> 作者は以前の数字を「タスクごとの上限を平均と誤報告したもの」と明記——Eberhardtは「本当に嬉しい」と応じた。

[`🔗 DietrichGebert/ponytail`](https://github.com/DietrichGebert/ponytail) · [`🔗 InfoQ`](https://www.infoq.com/news/2026/08/ponytail-agent-skill-benchmark/)

---

## 6. CVE-2026-63077——JetBrains TeamCityのエージェントポーリングプロトコルにおける未認証RCE、実地で悪用

- **ベロシティ:** ▮▮ 上昇中
- **ソース:** Rapid7 · CVSS 9.8 · ~1w ago
- **タグ:** `cve` `teamcity` `ci-cd` `rce` `kev`

**JetBrains TeamCity On-Premises**にCVSS 9.8の未認証リモートコード実行が存在する。根因はビルドエージェントポーリングプロトコルにおける安全でないデシリアライズで、このプロトコルはメインWeb UIとネットワークインターフェースを共有するため、インターネットに公開されたサーバーは直接到達可能。攻撃者は一時エージェントを登録し、エージェントコマンドエンドポイントにシリアライズされたXStreamガジェットチェーンを送り、SQL/JSPポリグロットのWebシェルを配置してOSコマンドを実行する。7月27日に開示され、悪用開始後の8月5日にCISAのKEVカタログへ追加。Rapid7がPoCを公開し、以降バルク悪用ツールも出回る。修正版は**2025.11.7**と**2026.1.3**、または2017.1+向けのパッチプラグイン。

**注目の理由:** TeamCityはソースリポジトリ、CIシークレット、デプロイパイプラインの手前に位置する——ここでのRCEはサプライチェーン級の足がかりだ。Censysは約4500の公開インスタンスのうちパッチ確認済みは約450と観測しており、CI/CD侵害の持続的なソフトターゲットとなっている。

> 攻撃チェーン：エージェント登録 → XStreamデシリアライズ → HSQLDBの`SCRIPT`がJSP Webシェルを書き込み → 匿名GETが`Runtime.exec()`を実行。

[`🔗 Censys`](https://censys.com/advisory/cve-2026-63077/) · [`🔗 Rapid7 PoC (sfewer-r7)`](https://github.com/sfewer-r7/CVE-2026-63077)

---

## 7. Tursoが無改造のDoomをSQLクエリとして実行——SQLiteのVDBEを「データベース界のLLVM」に

- **ベロシティ:** ▮ 安定
- **ソース:** Turso Blog · PoC demo · ~1d ago
- **タグ:** `sqlite` `rust` `bytecode` `database` `llvm`

Turso——SQLiteをRustで書き直すチーム（**Limbo**）——は、無改造のDoomを**VDBEバイトコードプログラム**として動かした。カスタムLLVMバックエンド（`vdbecc`）がC→LLVM IR→SQLiteバイトコードへコンパイルし、Cのアドレス空間全体は1行の1つのBLOB（読み書きは`BlobRead`/`BlobWrite`）で、フレームバッファは1本の長いクエリとしてストリーム出力される——`SELECT * FROM doom`。操作はバインドパラメータ（「Doomの入力ハンドラは`WHERE`句だ」）、セーブはデータベースの保存。差分テストでフレームバッファがネイティブclangビルドとバイト単位で一致することを確認した。

**注目の理由:** SQLiteのバイトコードVMがSQLだけでなく任意のプログラムのコンパイルターゲットとして成立するという証明だ。この書き直しを、他のデータベース（再構築されたPostgresから始まる）を構築できる共有基盤として位置づけている。

> レジスタ割り当ては不要——VDBEレジスタファイルは無制限なので、各SSA値は専用の永続レジスタを得る。

[`🔗 Turso Blog`](https://turso.tech/blog/running-unmodified-doom-in-the-sqlite-bytecode-language) · [`🔗 tursodatabase/limbo`](https://github.com/tursodatabase/limbo)

---

## 8. LoopX——長時間稼働するAIエージェントチームを永続状態に保つオープンなコントロールプレーン

- **ベロシティ:** ▮ 安定
- **ソース:** GitHub · 4.6k stars · ~1w ago
- **タグ:** `agents` `control-plane` `kanban` `state-kernel` `python`

**LoopX**（MIT）は長時間稼働するエージェントチームのための、プロバイダ中立な「状態カーネル」だ。Codex、Claude Code、Cursorが有界なターンを実行する間、目標、型付きtodo、claim/lease、エビデンスログ、クォータ対応の自動ウェイク、検証可能な引き継ぎを安定に保つ。明示的に*ランタイムではない*——「ループを続けてよいか」を判断し、Kanban（Lark/Feishuアダプタなど）へ投影するが、ボードが真実の源になることはない。状態は`.loopx/`ディレクトリにローカルファーストで保存され、Python標準ライブラリ以外の依存はない。危険な権限や本番書き込みは常に人間がゲートする。ByteDanceのエンジニアが維持し、英語・中国語のドキュメントとコースを提供。

**注目の理由:** エージェントの実行が数分から数日へ伸びると、不足する層は「別のランタイム」ではなく、ターンをまたぐ永続状態と人間のゲートだ。LoopXの「ボードは投影、カーネルが真実」というモデルは、数日・複数エージェントの作業におけるエージェントのドリフトへの明快な答えになる。

[`🔗 huangruiteng/loopx`](https://github.com/huangruiteng/loopx) · [`🔗 Moclaw Blog`](https://moclaw.ai/blog/what-is-loopx)

---

## 9. HL-Gauss PPO——クリティックのスカラーヘッドをカテゴリカル予測器へ（COLM 2026）

- **ベロシティ:** ▮ 安定
- **ソース:** arXiv · COLM 2026 · ~2d ago
- **タグ:** `reinforcement-learning` `ppo` `rlvr` `research` `arxiv`

**「Start Classifying: Categorical Critics for LLM Reinforcement Learning」**（arXiv 2608.02181、COLM 2026採録）は、PPOのスカラーMSEクリティックを、ガウス平滑化されたHL-Gaussターゲットで訓練するカテゴリカル予測器に置き換え、それをスカラーへデコードして戻すためactor更新は不変——ドロップインのクリティック交換だ。報酬がスパースかつ二値で、小さな価値誤差がPPOの優位性を歪める可検証報酬のRLにおいて、HL-Gauss PPOは数学推論、ツール拡張数学、Search-R1でQwen2.5/Qwen3バックボーン上、強力なPPO・DAPOベースラインを一貫して上回り、較正の改善と低分散の優位性をもたらす。

**注目の理由:** RLVRはフロンティア推論モデルのエンジンであり、そのクリティックは最も較正が弱い構成要素だ。actorを一切変更せずに安定性と較正を改善するクリティックヘッドは、ポストトレーニングパイプラインにとって安価で移植可能な利得となる。

[`🔗 arXiv`](https://arxiv.org/abs/2608.02181) · [`🔗 ZhijianZhou/HL-guass-ppo`](https://github.com/ZhijianZhou/HL-guass-ppo)

---

## 10. CVE-2026-73240——Apache AlluraのCVSS 9.8 git引数インジェクションが未認証RCEを可能に

- **ベロシティ:** ▮ 安定
- **ソース:** IONIX · CVSS 9.8 · ~1d ago
- **タグ:** `cve` `apache` `git` `rce` `command-injection`

**Apache Allura**——SourceForgeの背後にあるforgeソフトウェア——に深刻な引数インジェクション（CWE-88、CVSS 9.8）が存在し、攻撃者が制御する入力をサニタイズせずに基盤の`git`コマンド呼び出しへ渡すため、未認証の遠隔攻撃者が引数を注入してホスト権限で任意コマンドを実行できる。**1.19.1より前**の全バージョンが影響を受け、1.19.1へのアップグレード（ドキュメント記載の設定・データベース移行を含む）が必要。

**注目の理由:** git引数インジェクションは、gitを呼び出すあらゆるforgeやSCMツールで繰り返し発生する、影響範囲の大きいバグクラスだ。セルフホストのAlluraデプロイにとっては、認証不要で完全侵害に至るRCE——即時パッチを。

[`🔗 IONIX`](https://www.ionix.io/threat-center/cve-2026-73240/) · [`🔗 NVD`](https://nvd.nist.gov/vuln/detail/CVE-2026-73240)

---

## 11. Cl0pがPTC WindchillのRCE（CVE-2026-12569）で約50社のデータ窃取を主張

- **ベロシティ:** ▮▮▮ トレンド
- **ソース:** SecurityWeek · CVSS 9.8 · ~1d ago
- **タグ:** `cve` `rce` `ransomware` `cl0p` `kev` `supply-chain`

ロシア系ランサムウェア集団**Cl0p**は、**Shell、Philips、GE、Fiserv**を含む約50社から、**CVE-2026-12569**（**PTC Windchill PDMLink / FlexPLM**における安全でないデシリアライズに起因する、未認証RCE、CVSS 9.8、11.0 M030で修正）を突いた単一のキャンペーンでデータを窃取したと公表した。侵入はFlexPLM WSDLエンドポイントの事前認証情報開示とWindchillログインサーブレットのデシリアライズ脆弱性を連鎖させ、16進名のJSPウェブシェルを配置してエンジニアリング・設計データを窃取する。PTCは6月17日にパッチ、CISAは6月25日にKEVへ追加。7月19–20日から被害者に恐喝メールが届き始め、Cl0pは8月13日に公表に踏み切った。

**注目の理由:** これはMOVEitの再演だ。Cl0pは広く導入されたエンタープライズ製品（製造・自動車・航空宇宙・小売で使われるPLMソフト）を1-day脆弱性で突き、サプライチェーンを一括恐喝する。Cl0pはShellから約89GB、Philipsから約13.5GBを窃取したと主張する（未検証）。奪われたのはPIIだけでなく製品設計とエンジニアリングIPだ。

> 被害は約50組織。Ransom-ISACは7月の時点でCl0pによる悪用を警告、恐喝通知は7月19–20日に遡る。

[`🔗 SecurityWeek`](https://www.securityweek.com/ptc-windchill-vulnerability-exploited-in-ransomware-campaign/) · [`🔗 Wiz Threat Center`](https://threats.wiz.io/all-incidents/cl0p-exploitation-of-ptc-windchill-and-flexplm-vulnerability)

---

## 12. Vercelがdeepsecをオープンソース化——本物の脆弱性を調査するエージェント型セキュリティハーネス

- **ベロシティ:** ▮▮▮ トレンド
- **ソース:** Vercel Blog · 6.5k stars · ~1d ago
- **タグ:** `security` `agents` `vercel` `appsec` `scanner`

Vercel Labsは**deepsec**（Apache 2.0）を公開した。脆弱性発見を多段階のエージェントパイプラインに変えるセキュリティハーネスだ。正規表現のみの静的スキャンでセキュリティ上重要な候補を洗い出し、コーディングエージェント（**Claude Opus 4.7**と**Codex GPT-5.5**、最大推論で）がデータフローを追って緩和策の有無を確認、再検証パスで誤検知率を約10–20%に抑え、gitメタデータで責任者を付記する。完全に自前インフラ上で動作し（ソースコードは外部に出ない）、モノレポでは1000以上の並行Vercel Sandboxへ展開でき、冪等・再開可能に実行できる。

**注目の理由:** これはアプリセキュリティがシグネチャ照合からエージェント型調査へ移る流れだ。初期採用者（Unkey、dub.co）は「これまでで最も徹底したスキャナで、真陽性率も良い」と評する。DeepSeekやClineの「ハーネス」パターンをセキュリティに応用したもので、その代償は本物の計算コスト（大規模スキャンは数万ドル規模に達しうる）。

> コーディングエージェント同様シェルアクセスで動くため、Vercelは信頼できないソースへの適用を警告（プロンプトインジェクションのリスク）。サンドボックスで使うこと。

[`🔗 Vercel Blog`](https://vercel.com/blog/introducing-deepsec-find-and-fix-vulnerabilities-in-your-code-base) · [`🔗 vercel-labs/deepsec`](https://github.com/vercel-labs/deepsec)

---

## 13. Anthropic公式のAgent Skillsリポジトリ——フォーマットの169kスターの本家がトレンド入り

- **ベロシティ:** ▮▮ 上昇中
- **ソース:** GitHub · 169k stars · ~1d ago
- **タグ:** `anthropic` `agent-skills` `spec` `claude` `plugins`

**anthropics/skills**はAnthropic公式のAgent Skills公開リポジトリだ。同社が生み出しagentskills.ioで仕様化した「命令フォルダ」形式の本家である。仕様、再利用可能なスキルテンプレート、参照スキルを収録し、Claudeのドキュメント編集を本番で支える**ドキュメントスキル**（`docx`、`pdf`、`pptx`、`xlsx`、ソースアベイラブルでオープンソースではない）に加え、`skill-creator`、`mcp-builder`、`artifacts-builder`を含む。Claude Codeではプラグインマーケットプレイスとして導入できる（`/plugin marketplace add anthropics/skills`）。

**注目の理由:** エージェントスキル界が爆発するなか（google/skills、addyosmani/agent-skills、Ponytailが今週相次いでトレンド入り）、Anthropicのリポジトリは他のあらゆるスキルライブラリが比較される参照実装であり、169kスターでこのフォーマットの事実上の本家となっている。

> ドキュメントスキルはソースアベイラブル（OSIオープンソースではない）で、複雑な本番スキルの参照として公開。その他はApache 2.0。

[`🔗 anthropics/skills`](https://github.com/anthropics/skills) · [`🔗 agentskills.io`](https://agentskills.io/)

---

## 14. ego-lite——あなたとAIエージェントが同じログインで並行作業するブラウザ

- **ベロシティ:** ▮▮ 上昇中
- **ソース:** GitHub · 10.1k stars · ~1d ago
- **タグ:** `browser` `agents` `automation` `chromium` `macos`

**ego-lite**（CitroLabs、MIT）は、人間とAIエージェントがタブを取り合わずに1つのブラウザを共有するChromiumベースのブラウザだ。既存のChromeデータ（ログイン、Cookie、拡張）を一度移行し、各エージェントに隔離されたプロセス内「Space」を与えつつ、あなたは前面でブラウジングを続ける。コマンドごとのループではなく、エージェントは`ego-browser`スキル層を通じてJavaScript関数を直接呼び出し、複数ステップのタスクを1本のスクリプトに合成する。ページスナップショットはChromiumアクセシビリティツリーで約3万トークンから約200–400に圧縮される。READMEは複雑なワークフローがCLIブラウザ方式より最大**2.5倍高速**と主張する。

**注目の理由:** ブラウザ自動化はエージェント作業で最も摩擦が大きい部分だ。エージェントはセッションを共有するか、ログアウト状態から始めるしかないからだ。ego-liteの「同じログイン状態、隔離されたスペース」モデルは、実世界のエージェントブラウジングを阻むログインの壁への具体的な回答で、独立ブラウザインスタンスより約94%省メモリという。

> 現時点ではmacOSのみ（Windows/Linuxはロードマップ）。ブラウジングデータは端末内に留まる。

[`🔗 citrolabs/ego-lite`](https://github.com/citrolabs/ego-lite) · [`🔗 dev.to レビュー`](https://dev.to/andrew-ooo/ego-lite-review-a-browser-your-ai-agents-can-share-2afi)

---

## 15. holaOS——Claude CodeとCodexが1つの頭脳を共有するオープンソースのローカルファーストワークスペース

- **ベロシティ:** ▮▮ 上昇中
- **ソース:** GitHub · 6.9k stars · ~1d ago
- **タグ:** `agents` `workspace` `memory` `local-first` `electron`

**holaOS**（Holaboss）はオープンソース・ローカルファーストの「AIエージェントワークスペース」で、Claude Code、Codex、または内蔵エージェントを共有メモリ・ツール・ファイル・実ブラウザの上で並走させる。差別化点は**メモリをディスク上のプレーンテキストファイル**として持つこと——可読・編集可能で、エージェントやセッションをまたいで共有される——に加え、あなたが加えた修正を恒久的なルールに変える「修正＝ルール」機構にある。フロンティアモデル（Kimi K3、GLM 5.2、GPT 5.6、Claude Opus 5、Fable 5）を内蔵するかBYOK、100以上の統合、MCP対応、エージェントの隣に実UIを埋め込む「HolaApps」を備える。

**注目の理由:** エージェントのコンテキスト断片化はholaOSが狙う核心的な痛みだ。チームのエージェントに、クラウドのブラックボックスではなく、ローカル形式で持続的・検査可能な共有状態を与える。「メモリをファイルとして」は優れたデバッグ性と信頼性の選択だが、メモリ形式の可搬性がオープン標準に留まるか、holaOSへのロックインになるかを左右する。

> ベータ——curl 1行で導入可能。現時点でmacOSが最も明確なパス。

[`🔗 holaboss-ai/holaOS`](https://github.com/holaboss-ai/holaOS) · [`🔗 holaOS Docs`](https://www.holaos.ai/docs/getting-started/workspaces)

---

## 16. OneDayAgent——長ホライズンハーネスがAgentIF-OneDayベンチマークでSOTAを達成

- **ベロシティ:** ▮ 安定
- **ソース:** arXiv · 2608.05013 · ~1d ago
- **タグ:** `agents` `long-horizon` `benchmark` `research` `arxiv`

**OneDayAgent**（arXiv 2608.05013、浙江大学＋Ant Group）は、仕事・学習・生活にまたがるオープンエンドな日常リクエストを扱う自律エージェント向けの長ホライズンハーネスだ。リクエストを有界なサブタスクに分解し、コンテキスト圧力下で実行メモリを維持し、最終成果物を検証・修復する。**AgentIF-OneDay**（実タスク104件、二値ルーブリック767点）で**0.821**を記録し、AutoClaw（0.799）、Codex GPT-5.5（0.664）、Manus（0.645）、ChatGPT-Agent（0.626）を上回る。同一ハーネスはチューニングなしで5つのバックエンドモデルに移植可能で、コードと全実行軌跡が公開されている。

**注目の理由:** 長ホライズンの自律性——単発のコーディングではない——こそが現在エージェント製品の競争点だ。OneDayAgentの「分解＋メモリ＋検証」ループは、いまだに多段エージェントを沈めるドリフトと状態喪失への、クリーンで再現可能な処方箋である。

> アブレーション：分解と検証はそれぞれ約3.3点を寄与。検証・修復は1点あたり最も時間効率の良い修正。

[`🔗 arXiv`](https://arxiv.org/abs/2608.05013) · [`🔗 xbench-ai/AgentIF-OneDay`](https://github.com/xbench-ai/AgentIF-OneDay)

---

## 17. modly——任意の写真を自分のGPUで3Dモデルにするローカルなオープンソースデスクトップアプリ

- **ベロシティ:** ▮ 安定
- **ソース:** GitHub · 5.7k stars · ~1d ago
- **タグ:** `3d` `image-to-3d` `local-ai` `desktop` `mit`

**modly**（Lightning Pixel、MIT）はWindows・Linux・Apple Silicon macOS向けのデスクトップアプリで、完全に自分のGPU上で写真から3Dメッシュを生成する——アップロードなし、アカウント不要、生成回数制限なし。拡張システムでオープンモデル（Hunyuan3D 2 Mini、TripoSG、Trellis2 GGUF）を読み込み、GLB/OBJ/STL/PLYへエクスポート（STLはCuraやBambu Studioへ直行）。ノードベースのワークフローUIと、エージェントがヘッドレスで生成を駆動できるPython CLI（`agent.py`）を備える。

**注目の理由:** ローカルの画像→3Dは、参考写真をMeshyやLumaといったクラウドツールに送れない、プライバシー重視の3Dプリント・ゲームアセット・デザインワークフローに欠けていたピースだ。modlyはそれを無料・GPUローカルの導入に引き下げる。品質はプロトタイプ級だが、「クラウドなし」の人々にとって真の代替となる。

> 生成前にモデル拡張の導入が必要（例：Hunyuan3D 2 Mini）。VRAM 6GB以上を推奨。

[`🔗 lightningpixel/modly`](https://github.com/lightningpixel/modly) · [`🔗 Product Hunt`](https://www.producthunt.com/products/modly-2)

---

## 18. FluidVoice——Wispr Flowのユーザーを奪いつつある、オンデバイスのオープンソースmacOSディクテーションアプリ

- **ベロシティ:** ▮ 安定
- **ソース:** GitHub · 10.1k stars · ~1d ago
- **タグ:** `dictation` `speech-to-text` `on-device` `macos` `privacy`

**FluidVoice**（Altic、GPLv3）は100%オンデバイスで動くmacOSディクテーションアプリだ。ローカル音声モデル（NVIDIA Parakeet/Nemotron、Cohere Transcribe、Apple Speech、Whisper）とローカルの「Fluid-1」AI強化層が転写とクリーンアップ（大文字化、フィラー除去、トーン）を担当し、Macの外に何も出ない。音声でMacを操作するCommand Mode、任意の入力欄へディクテーションするWrite Mode、アプリごとのトーン調整を備え、Wispr Flow（月$12–15、クラウド処理）の無料・プライバシー重視の代替として位置づけられる。

**注目の理由:** オンデバイス音声はオンデバイスLLMに続く次のプライバシー戦場だ。FluidVoiceの「同等の精度、ゼロクラウド、ゼロコスト」という売りは、すでにWispr Flow解約の波を起こしている。粗削りな部分は残るが（完全な代替かはレビュアーで評価が分かれる）、勢いと10k超のスターが実需を示す。

> macOS 15+のみ。Fluid-1強化モデルはクローズドソース（コアのディクテーションはオープン）、ローカルに約3.5GB。

[`🔗 altic-dev/FluidVoice`](https://github.com/altic-dev/FluidVoice) · [`🔗 OpenAlternative`](https://openalternative.co/fluidvoice)

---

## メタデータ

| フィールド | 値 |
|-------|-------|
| 生成日時 | 2026-08-14T20:03:00Z |
| アイテム数 | 18 |
| 追跡ソース | 23 (GitHub Trending, Hacker News, Hugging Face, NVIDIA Blog, DoNews, Bishop Fox, CISA KEV, Rapid7, Censys, Cline Docs, Moclaw Blog, Turso Blog, InfoQ, arXiv, IONIX, SecurityWeek, Wiz, Vercel Blog, agentskills.io, dev.to, holaOS Docs, Product Hunt, OpenAlternative) |
| 更新スケジュール | 04:03, 12:03, 20:03 UTC+8（1日3回） |
| ランキング | ベロシティ加重（新しさ × エンゲージメント加速 × ソース権威性） |
| ライセンス | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[`→ 前日`](/jp/feed/2026-08-13/) · [`→ 生 .md`](/jp/feed/2026-08-14.md) · [`→ アーカイブ`](/jp/archive/)
