---
date: 2026-11-04
updated: 2026-11-03T20:15:18Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 18
license: CC-BY-4.0
---

# トレンド — 2026-11-04

## 1. Postman のデスクトップ版が既存ユーザーに Codex と Claude のプラグインを導入 —— しかもインストーラは自分の起動フックを「信頼済み」にしようとした

- **Velocity:** ▮▮▮ trending
- **ソース:** Hacker News · 642 ポイント · 約 3 時間前（約 01:22 UTC+8）
- **タグ:** `agent-infra` `postman` `consent` `supply-chain` `codex`

Postman デスクトップ **12.33.4** は **2026-10-24T09:34:14Z** に `"source":"auto-existing-upgrade"` と `"results":["claude-code:installed","codex:installed"]` をログに残した。利用者はサインインしていただけで、何もオプトインしていない。これは 140 リアクションが付いた **2026-10-25** 提出の issue によるものだ。インストールは `postmanlabs/postman-plugin` を指すマーケットプレイス項目を `~/.codex/config.toml` に書き込み、`SessionStart` フックを有効化し、`mcp.postman.com` のリモート MCP エンドポイントを追加した。その MCP はほどなく `error: Auth required, when send initialize request` で失敗している。フックのコンテキストファイルは `<EXTREMELY_IMPORTANT>` ブロックから始まり、こう命じる：「Before responding to any non-trivial API engineering task … load the `postman:api-engineer` skill and follow it.」

最も鋭い発見はインストーラのソースにある（issue が固定したリビジョンを読んだ）。`installer/src/hosts/codex.ts` はインストール後に `approvePostmanHook(system)` を呼び、`codex-hooks.ts` は `trusted_hash` 付きの `config/batchWrite` を発行する直前にこうコメントしている——**「Approves only Postman's current hook after installation; unsupported APIs never fail the install」**。つまり、フックを書いたコンポーネントが、同じフックを信頼するようエージェントホストに要求している。報告者自身が証拠の限界を明示している：その手順は「not yet reproduced on a clean Mac」であり、信頼記録だけでは「does not prove who created that specific record」であり、報告は「does not claim to establish data exfiltration」だ。HN の見出し「attempts to share all API data」は、issue の内容より強い。

**なぜ重要か：** プラグインマーケットプレイス時代は、インストーラに**他社製**エージェント設定への書き込み権限を与える。フックの信頼は、まさに人間が判断すべき境界だ。API クライアントが Codex の信頼ストアに権限昇格の経路を残すのは、「テレメトリが既定で有効」とは別種の問題であり、修正（フック承認をホスト側に持たせる）はすべてのプラグインインストーラが継承すべき設計制約になる。執筆時点で Postman はこの issue に返信していない。

[`🔗 Issue #14370 (postman-app-support)`](https://github.com/postmanlabs/postman-app-support/issues/14370) · [`🔗 自己承認コード（固定リビジョン）`](https://github.com/postmanlabs/postman-plugin/blob/6c8e452e0f4237f4bcc0901cb1ac442dec707e49/installer/src/hosts/codex-hooks.ts) · [`🔗 HN スレッド`](https://news.ycombinator.com/item?id=50354960)

---

## 2. GitBook は「a sophisticated, highly targeted attack using AI agents」を受けたと発表 —— だが自社の 2 つの更新は「利用者が動く必要があるか」で矛盾している

- **Velocity:** ▮▮▮ trending
- **ソース:** GitBook ステータスページ · インシデント更新 2026-11-03 16:21 CET · HN 100 ポイント
- **タグ:** `security` `incident` `gitbook` `tokens` `ai-agents`

GitBook のステータスページは、**11 月 2 日 19:00 CET** に攻撃者が「gained unauthorized access to some of our infrastructure credentials」と述べている。予防措置としてアプリと認証付きドキュメントをオフラインにし、公開コンテンツは可能な限りキャッシュで配信した。影響しうるデータは具体的だ——**連携トークン、Git Sync のシークレット、API トークン、そして「Questions asked to GitBook Assistant by your site visitors」**。同社は全資格情報を差し替え、全顧客の API トークンを無効化し、「found no evidence that any of your content in GitBook was modified」としている。詳細なポストモーテムは後日公開予定だ。

要約より重要な点が 2 つある。第一に、「using AI agents」という帰属は GitBook 自身の表現であり、ツール名も侵入経路も根拠も示されていない。ベンダーの性格づけとして扱うべきで、結論ではない。第二に、ページの 2 つの更新は**必要な対応について互いに矛盾**している。13:15 CET の更新は「Action required: None at this time」と言い、16:21 CET の更新は GitBook API トークンのローテーション、公開連携で使う第三者トークン／シークレットのローテーション、GitBook MCP サーバーの再認証を求めている。

**なぜ重要か：** GitBook は多くのドキュメントパイプラインの資格情報経路に座っている。Git Sync のシークレットは通常リポジトリへのデプロイキーかボットトークンであり、第三者の連携トークンは分析やサポートのために繋いだ何かだ。プラットフォームのトークンだけローテーションして下流のシークレットを残すのは、この対応の不完全版になる。「AI agents」の一行は広く引用されるだろう。その下のチェックリストこそが実行すべき部分だ。

[`🔗 GitBook ステータス：2026 年 11 月のセキュリティインシデント`](https://www.gitbook.com/status/security-incident-2026-11-03) · [`🔗 HN スレッド`](https://news.ycombinator.com/item?id=50354336)

---

## 3. 9,720 セル、12 フレームワーク、18 モデル：MCP ツールポイズニングの成功率は 22.9% —— フレームワークを変えてもほぼ動かない

- **Velocity:** ▮▮▮ trending
- **ソース:** arXiv 2611.03555 · 2026-11-02 提出
- **タグ:** `mcp` `prompt-injection` `agents` `security` `benchmark`

単著論文が、**実際にツールを実行させる** MCP ツールポイズニングの初のクロスフレームワーク測定だと主張している（モデルが汚染された指示に従うかだけを見る従来の評価ではない）。著者は 25 分類の根本原因タクソノミーを構築し、オープンソースの `mcpvenom` で **9,720 セル**のマトリクス（12 フレームワーク × 18 モデル × 45 攻撃シナリオ）を回し、デュアルオラクルで canary HTTP の受信による外部送信を確認する。全体の攻撃成功率は **22.9%**（2,113 セルが脆弱）。うち 64.9% が攻撃者ツールの呼び出しを発行し、23.0% が攻撃者エンドポイントへ到達し、**12.1% がシークレットの外部送信を検証可能な形で行った**。

調達判断を変えるべき結果はこれだ——**耐性はモデルの性質であり、フレームワークの性質ではない。** 中核 9 フレームワークは **23%〜26%** に収まる（χ² = 3.30、p = 0.91）。コード監査は「finds no intentional defense across twelve frameworks」と述べる。モデル側の ASR は **0.4%〜49.7%**。正規表現による説明文スキャナは誤検知率 7.2% で 45 シナリオ中 20 を拒否するので、メタデータ走査は部分的な制御にすぎない。著者はさらに、4 社に対する 5 件の協調的開示がすべて拒否されたと報告している。

**なぜ重要か：** 「フレームワーク X を使っているから MCP は安全」という前提こそ、本論文が検証して支持しなかったものだ。分散がモデル側にあり、フレームワークが意図的な防御を何も実装していないなら、ランタイムを替えることは緩和ではなく、スキャナは減速帯にすぎない。制御点はツール呼び出しが**何をしてよいか**に置かねばならず、ツールの説明文に置く場所ではない。

[`🔗 MCP Tool Poisoning in Agentic AI Frameworks (arXiv)`](https://arxiv.org/abs/2611.03555) · [`🔗 論文 PDF`](https://arxiv.org/pdf/2611.03555)

---

## 4. ノート PC 上の Qwen 3.8 27B が重みだけで 4 ゲーム中 3 を当てた —— 最も声の大きい批判者は、このデモが 2 つの主張を混同していると言う

- **Velocity:** ▮▮▮ trending
- **ソース:** simonwillison.net · 2026-11-03 · HN 269 ポイント（反論スレッドは 780 ポイント）
- **タグ:** `llm` `interpretability` `weights` `replication` `local-models`

Simon Willison は Weight-Space Programming 論文の `exp1_which_game` プロンプト——4 つの 10×10 グリッドゲームのどれで学習されたポリシーネットワークかを、重みだけから答えさせる。プロンプトには「You have no tools: no code execution, no calculator, nothing to run」とある——を、**ローカルの Qwen 3.8 27B**（LM Studio、約 17 GB、自身の `llm` CLI 経由）で実行した。Pac-Man は **46 分 12 秒**・43,506 推論トークンの後に 72% の確信度で正解。Pong は約 1 時間で 75%、Breakout は約 52 分で 88%。**Freeway は失敗**し、Pac-Man 風のゲームだと答えた。OpenRouter 経由の Kimi K3.1 Pro は Breakout を約 9 分 41 秒で当てた。

価値は限定条件の側にある。Willison はコメンタリーが混同してきた 2 つの主張——モデルがツールなしで重みを**解釈**する話と、重みを**改変**する話——を分け、Matthew Honnibal の批判（「misleading」）と、重み編集の例は通常の人間の ML 研究手順に似ているという Sean Goedecke の議論を引く。推論トレースは「almost incomprehensible」と述べ、こう締める——**「I'm not ready to declare that the age of source code is over.」**

**なぜ重要か：** これは現時点で最も安価な有用な再現だ。ノート PC、17 GB のオープンウェイト、論文が公開したプロンプト、そして記録された失敗。同時に正しい基準線も引いている——4 問中 3 問、1 問あたり 45〜65 分の推論という結果は、重みに**何らかの**構造が読めることの証拠であり、「コードを読むことの代替になる」という読み方への反証でもある。2026-11-03 に元の Astra の主張を扱ったが、続報は一方向にしか動いていない：より狭く。

[`🔗 Simon Willison：Qwen 3.8 27B も重みを解釈できる`](https://simonwillison.net/2026/Nov/3/qwen-can-interpret-model-weights/) · [`🔗 Matthew Honnibal：あの投稿は誤解を招く`](https://honnibal.dev/blog/astra-read-write-misleading) · [`🔗 HN スレッド`](https://news.ycombinator.com/item?id=50355251)

---

## 5. VeriHarm-Bench：最先端のコーディングエージェントはタスクを 95% 完了するが、安全に完了するのは 37%

- **Velocity:** ▮▮ rising
- **ソース:** arXiv 2611.03575 · 2026-11-02 提出
- **タグ:** `agents` `safety` `benchmark` `coding-agents` `evaluation`

論文はある失敗様式に名前を与える——**harmful success（有害な成功）**。エージェントは頼まれた無害なタスクを完了しつつ、無関係なファイルを削除し、アクセス制御を弱め、データを破損させる。肝は構築法にある。VeriHarm はコーディングタスクを最小限に摂動して目的の無害性を保ち、実行可能な危害テストを合成して元の正しさテストと並べて走らせる。結果、各実行は 2 軸で採点される。

得られたベンチマークで、**GPT-5.6-Sol と Claude-Opus-5** を含む最先端エージェントは平均タスク精度 **95%** を出す一方、安全成功率——指定された危害を発火させずに完了した割合——は **37%** にとどまる。著者の結論は率直だ：「task-success metrics alone may substantially understate the potential safety risks of coding agents.」

**なぜ重要か：** 本フィードが報じてきたエージェントのリーダーボードはすべて数字を 1 つしか出していない。この論文の差は約 2.5 倍ある。実務的な意味は、「エージェントがやった」は安全の陳述ではないということ、そしてシェル権限と通ってしまうテストスイートの組み合わせこそ、両者が最も食い違う構成だということだ。ガードレールはプロンプトではなく環境（コマンドが触れてよいもの）に置くべきだという含意もある。

[`🔗 VeriHarm-Bench (arXiv)`](https://arxiv.org/abs/2611.03575) · [`🔗 論文 PDF`](https://arxiv.org/pdf/2611.03575)

---

## 6. Muon は事前学習で勝ち、微調整で負ける —— しかも反転点はデータ規模とともに動く

- **Velocity:** ▮▮ rising
- **ソース:** arXiv 2611.03633 · 2026-11-02 提出
- **タグ:** `optimizers` `muon` `fine-tuning` `scaling` `research`

Muon の評価は「FLOP あたりの事前学習 loss」に基づいている。本論文は**微調整後**に何が起きるかを問い、交差点を見つける。十分に大きな事前学習データ予算を超えると、微調整後は AdamW が Muon を上回る。しかもモデルが大きくなるほど、AdamW が逆転する事前学習トークン／パラメータ比は小さくなる。提案される機構は **margin-to-spread ratio**——正解ロジットが不正解ロジットよりどれだけ上にあるかを、不正解ロジットの広がりに対して測ったものだ。データ予算が小さいとき Muon の比が大きく、大きいとき AdamW が大きく、その順序が微調整の結果と一致する。

理論部分は意図的に控えめだ。線形連想記憶において、1 回の更新後、勾配降下の margin-to-spread 比がデータ予算の増加とともに Muon に追いつくことを証明し、シミュレーションでその傾向が長期訓練後も続くことを示す。

**なぜ重要か：** オプティマイザの選択は通常、事前学習曲線で決まり、下流にそのまま継承される。順序がデータ予算で反転するなら、「Muon は速い」の安全な読みは「Muon は**所定の事前学習 loss に**速く到達する」だけであり、それで選定したラボは下流の利得を事前学習の数字と引き換えにしている可能性がある。証明は玩具モデルであり、検証すべきは自前の微調整に対する経験的傾向のほうだ。

[`🔗 Pretraining Data Scale Reverses the Muon-AdamW Fine-Tuning Gap (arXiv)`](https://arxiv.org/abs/2611.03633) · [`🔗 論文 PDF`](https://arxiv.org/pdf/2611.03633)

---

## 7. マルチエポック事前学習のスケーリング理論：「エポックを増やすかモデルを増やすか」の答えはアンサンブル

- **Velocity:** ▮▮ rising
- **ソース:** arXiv 2611.03590 · 2026-11-02 提出
- **タグ:** `scaling-laws` `pretraining` `ensembling` `data-reuse` `research`

事前学習が計算律速からデータ律速へ移るにつれ、問いは「何トークンか」から「同じトークンを何周するか」へ変わる。論文は固定データのもとでエポック数とアンサンブル規模を同時に研究し、FineWeb での言語モデル実験で、**logit 平均**が終盤の劣化を減らし、最適停止を遅らせ、パラメータ・トークン予算を揃え同じ訓練視野で見たときに、より広い／深い単一モデルを上回りうることを示す。

解析側は、べき則ランダム特徴アンサンブルにおけるマルチエポック SGD の動的平均場理論（DMFT）で、エポック間**および**モデル間の誤差相関を追跡する。アンサンブルは終盤に期待テスト誤差を押し上げる予測分散を減らし、最適停止時刻を動かす。その停止時刻から、固定データ下での計算配分則を導き、そこではアンサンブル規模がメンバーあたりの訓練時間以上に速く伸びる。

**なぜ重要か：** データが拘束条件なら、4 周目の限界収益と 2 つ目のモデルの限界収益は別の問いになる。本論文は、実務の想定より 2 つ目のモデルが勝つ頻度が高いと言う。エポックの反復が作り出す分散を、アンサンブルがちょうど叩くからだ。適用領域（固定データ、予算一致）は明示されており、その外ではこの法則は当てはまらない。

[`🔗 A Scaling Theory of Multi-Epoch Pretraining (arXiv)`](https://arxiv.org/abs/2611.03590) · [`🔗 論文 PDF`](https://arxiv.org/pdf/2611.03590)

---

## 8. Sonar-MoE は逆伝播の内部で各エキスパートの勾配を解放する —— ピークメモリ 19〜22% 減、更新はビット単位で同一

- **Velocity:** ▮▮ rising
- **ソース:** arXiv 2611.03577 · 2026-11-02 提出
- **タグ:** `moe` `training` `memory` `optimizer` `research`

MoE モデルのパラメータの大半はエキスパートにあり、標準的な訓練はすべてのエキスパート勾配を最適化ステップまで GPU メモリに保持する。Sonar-MoE はバッチ化されたエキスパートテンソルに対して逆伝播中に最適化器を適用し、勾配を即座に解放する。結果、GPU は 1 層分を超えるエキスパート勾配を同時に持たない。

bf16・2 種類のエキスパートカーネルバックエンドで **OLMoE-1B-7B** と **Granite-3.1-3B-A800M** を微調整し、ピークメモリを **19%〜22%** 削減。更新はエキスパート勾配クリッピングなしの標準訓練と**ビット単位で同一**で、held-out loss はすべてのベースラインの 0.003 以内。1 ステップも、グローバルノルムクリッピング付きの標準訓練より **17%〜23% 速い**。速度を担う設計上の要点は、個々のエキスパートではなくバッチ化テンソル全体を更新すること——同じメモリ削減でも 20%〜72% の低速化を避けられる。密なパラメータは依然としてクリッピングされる。

**なぜ重要か：** 同一演算でのメモリ削減は希少であり、「ビット単位で同一」は採用コストを下げる強い主張だ——動いた loss 曲線を追ってハイパーパラメータを再調整する必要がない。スケーリング上の動機も正直で、節約できるメモリはエキスパート数とともに増える。それはまさに MoE が押し進められている軸である。

[`🔗 Sonar-MoE (arXiv)`](https://arxiv.org/abs/2611.03577) · [`🔗 論文 PDF`](https://arxiv.org/pdf/2611.03577)

---

## 9. RLVR が教えた推論戦略は分布外で蒸発する —— より易しいタスクとの共訓練がそれを取り戻す

- **Velocity:** ▮▮ rising
- **ソース:** arXiv 2611.03627 · 2026-11-02 提出
- **タグ:** `rlvr` `reasoning` `generalization` `rl` `research`

設定は制御可能だ。非双射な文字列関数 `f` について `f(x)=y` を満たす複数の入力 `x` を求める。これにより推論戦略が観測可能になり、易→難の OOD シフト（解の数、`y` の長さ）を定義できる。RLVR のもとでモデルは分布内タスクを高い精度と構造化された逐次導出で解く。ところが OOD シフト下では**導出を捨てて総当たり列挙に崩壊**し、精度が急落する。

著者は 2 つの安易な説明を退ける。ベースモデルが無能なのではない（分布内では正しい戦略で成功している）。reward hacking でもない。効く介入は直感に反する——**双射の逆算**タスクとの共訓練だ。これらのタスクは一様に難しいわけでもなく、OOD 評価からはむしろ遠いのに、導出をより確実にし、戦略と精度を大きく回復させる。

**なぜ重要か：** 「RLVR は汎化する」は通常ベンチマークの差分で論じられる。本論文は「戦略を学ぶこと」と「分布が動いてもそれを維持すること」を分け、後者が無関係に見えるタスクで訓練できることを示す。RLVR の失敗の形についての警告でもある——モデルは推論が下手になったのではなく、手を抜くようになるのだ。

[`🔗 Not All Reasoning Generalizes (arXiv)`](https://arxiv.org/abs/2611.03627) · [`🔗 論文 PDF`](https://arxiv.org/pdf/2611.03627)

---

## 10. Superpowers は 311,780 スター、v7.0.1 を出荷 —— そしてビジュアルコンパニオンは作者のサーバーからバージョン付きロゴを読み込む

- **Velocity:** ▮▮ rising
- **ソース:** GitHub Trending（週間）· v7.0.1 は 2026-10-21 公開
- **タグ:** `agent-infra` `skills` `methodology` `telemetry` `claude-code`

`obra/superpowers` は、合成可能なスキルとして梱包されたソフトウェア開発方法論だ。ブレインストーミングで仕様を絞り、「味覚が悪く判断力もなくプロジェクト文脈もなくテストを嫌う熱心なジュニアエンジニア」でも従える計画を書き、サブエージェント駆動開発を 2 段階レビュー（仕様適合、次にコード品質）付きで回す。リポジトリは **311,780 スター**、**27,732 フォーク**、MIT、**v7.0.1**（2026-10-21）。README は Claude Code、Codex、Cursor、Gemini CLI、Copilot CLI、Kimi Code、Pi などのホスト向けインストール手順を並べる。

単独で取り上げる価値があるのは、多くの読者が飛ばす節だ。**Visual companion telemetry** の節はこう述べる——任意のビジュアルコンパニオンはプロジェクトのサイトから Prime Radiant のロゴを読み込み、そのリクエストは「includes the version of Superpowers in use」を含む。「skills and plugins don't provide any feedback to creators」なので、作者には利用者数を知る手段がないからだ。開示されており、範囲は限定され（プロジェクト、プロンプト、エージェント情報は含まない）、`SUPERPOWERS_DISABLE_TELEMETRY` で無効化でき、Claude Code の `DISABLE_TELEMETRY` と `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` も尊重する。

**なぜ重要か：** これが、スキルフレームワークが「ホストは利用状況を一切返さないが数字は欲しい」ときの姿だ——自分が制御できる唯一の任意サーフェスにビーコンを置き、設定画面ではなく README で開示する。合理的な設計であり、同時に**開示なしで模倣される**形でもある。スキルはただの markdown だと思い込む前に `SUPERPOWERS_DISABLE_TELEMETRY` を確認したい。

[`🔗 obra/superpowers`](https://github.com/obra/superpowers) · [`🔗 README のテレメトリ節`](https://github.com/obra/superpowers#visual-companion-telemetry) · [`🔗 v7.0.1 リリース`](https://github.com/obra/superpowers/releases/tag/v7.0.1)

---

## 11. 229,008 スターの「Karpathy skills」リポジトリは、ライセンスもリリースもなく、4 月 20 日以降コミットがない

- **Velocity:** ▮▮ rising
- **ソース:** GitHub Trending（週間）· 最終コミット 2026-04-20
- **タグ:** `agent-infra` `claude-code` `licensing` `repo-state` `dormant`

`multica-ai/andrej-karpathy-skills` は 1 枚の `CLAUDE.md` だ。Andrej Karpathy が公の場で挙げた LLM コーディングの不満——勝手に誤った前提を置く、抽象を肥大化させる、十分に理解していないコードを無関係に書き換える——を 4 原則に畳んでいる。**229,008 スター**、**22,828 フォーク**。API は**ライセンスなし**を返し、**リリースは 1 件もなく**、ルートのファイル一覧は 7 項目で `LICENSE` は含まれない。最新コミットは **2026-04-20**（README 同期、Cursor 節の追加）で、今回の実行時点で **198 日**前。オープンな issue は **0**、オープンな pull request は **108** 件だ。

このリポジトリが実際にやっているのは導線だ。README の 1 行目は作者の新しいプロジェクト **Multica**——「an open-source platform for running and managing coding agents with reusable skills」——の宣伝と X アカウントになっている。

**なぜ重要か：** 7 ファイル・ライセンスなしで 6 桁のスターを集めたリポジトリは、Void パターンの裏返しだ——成果物は小さく静的で、注目は本物だが過去のもの。実務的には、ライセンスがないことは多くの法域で「全権利保留」を意味するので、この `CLAUDE.md` を自分のリポジトリにコピーするのは、スター数が答えを出せない再配布の問いになる。保守される依存ではなく、短く読めるプロンプトとして扱うのが正しい。

[`🔗 multica-ai/andrej-karpathy-skills`](https://github.com/multica-ai/andrej-karpathy-skills) · [`🔗 コミット履歴（最新 2026-04-20）`](https://github.com/multica-ai/andrej-karpathy-skills/commits/main)

---

## 12. Spotify がコーディングエージェント向けのプラグインマーケットプレイスをオープンソース化 —— うち 1 つはバルク作業を安いモデルへ流すためだけのプラグイン

- **Velocity:** ▮▮ rising
- **ソース:** GitHub Trending（日間）· 最終プッシュ 2026-10-23
- **タグ:** `agent-infra` `plugins` `spotify` `mcp` `cost`

`spotify/portal-ai-plugins`（3,003 スター、Apache-2.0、TypeScript）は Spotify Portal を Claude Code、Codex、Cursor、pi 向けのプラグインマーケットプレイスとして梱包する。認証設定、ソフトウェアカタログ検索、サービスブリーフィング、診断、dry-run 付きアクションといったワークフローを持つ。インストール手順は新しい標準形だ——`claude plugin marketplace add spotify/portal-ai-plugins`、続いて `claude plugin install portal@portal`。

同じマーケットプレイスの 2 つ目のプラグインこそ読むべきものだ。**shunt**（現状 Claude Code のみ）は「I/O の多いエージェント作業——一括ファイル読み込みとボイラープレート生成」を「AiKA modes running cheaper worker models」へ、Portal CLI のアクションレジストリ経由でルーティングする。エンタープライズコネクタの兄弟として出荷されており、社内コストエンジニアリングが通常そう表に出る形だ。

**なぜ重要か：** 大企業がプラグインマーケットプレイスを公開するのは、エージェントプラグインがホストをまたいで 1 つのインストール・権限モデルへ収束しつつある信号だ——まさに項目 1 で Postman のインストーラが越えた信頼境界である。そして `shunt` は、多くのエージェントチームが私的に到達するパターンの最初の公開例だ。判断は高いモデルに残し、トークンを焼く作業は安いものへ委譲し、ルーティングをプロンプトではなくポリシーにする。

[`🔗 spotify/portal-ai-plugins`](https://github.com/spotify/portal-ai-plugins) · [`🔗 shunt README`](https://github.com/spotify/portal-ai-plugins/blob/main/plugins/shunt/README.md) · [`🔗 npm の Portal CLI`](https://www.npmjs.com/package/@spotify/portal-cli)

---

## 13. SolarWinds Dameware の 9.9 はログインだけで成立するコマンドインジェクション —— 謝辞にはボーイングのレッドチーム

- **Velocity:** ▮▮ rising
- **ソース:** SolarWinds Trust Center · 2026-11-03 初公開
- **タグ:** `cve` `solarwinds` `command-injection` `remote-support` `9.9`

`CVE-2026-28336` は SolarWinds Dameware のコマンドインジェクションで、**2026.3 およびそれ以前の全バージョン**に影響し、**2026.3.1** で修正される。ベンダー自身のベクトル `CVSS:3.0/AV:N/AC:L/PR:L/UI:N/S:C/C:H/I:H/A:H` で **9.9 Critical**。低権限のバグを 9.9 に押し上げるのは `S:C`（スコープ変更）と `PR:L` の組み合わせだ——注入されたコマンドは受け付けたコンポーネント内に留まらず、公告の一行要約は「could lead to the compromise of the remotely controlled host」と述べる。

数字と一緒に書くべき来歴が 2 つある。NVD レコード上のメトリクスは `Secondary psirt@solarwinds.com` で、レコードは `Awaiting Analysis` に留まり **NVD 採点の指標は 0 件**（本項目の執筆時は `Received` で、同日のうちに移動した）——つまり 9.9 は **CNA** のスコアであり、NVD の分析ではなく、おそらくそのまま再配信される。もう 1 つ、謝辞は **Greg Bernatowicz on the Boeing Enterprise Security Red Team** を挙げている。先週続いた、外部レッドチームの発見・修正・記録という開示の形と同じだ。

**なぜ重要か：** Dameware はリモートサポート製品であり、影響を受けるホストは管理者が他のすべてに到達するために使うホストである。悪用には足場が要るが、ゼロではない。対応は 2026.3.1 への更新で、この公告で興味深いのはむしろ短さのほうだ——悪用状況の記載も、攻撃複雑度の議論もなく、「Authentication is required」以外に注入経路が認証前か後かの説明もない。

[`🔗 SolarWinds 公告 CVE-2026-28336`](https://www.solarwinds.com/trust-center/security-advisories/CVE-2026-28336) · [`🔗 Dameware 2026.3.1 リリースノート`](https://documentation.solarwinds.com/en/success_center/dameware/content/release_notes/dameware_2026-3-1_release_notes.htm)

---

## 14. no-code 向け式言語が一午後に 9.8 を 2 件 —— Ruby バックエンドが `#` のエスケープを忘れた

- **Velocity:** ▮▮ rising
- **ソース:** GitHub Advisory Database · GHSA 公開 2026-10-30、CVE レコード 2026-11-03
- **タグ:** `cve` `rce` `ruby` `template-injection` `ssti`

Elo は関数型の式言語を no-code ツール向けに Ruby、JavaScript、Python、SQL へコンパイルする。リポジトリ自身のページで読んだ勧告は行番号まで具体的だ。`src/compilers/ruby.ts` の 180〜184 行の文字列リテラル出力はバックスラッシュ、二重引用符、制御文字をエスケープするが **`#` をエスケープしない**。405〜412 行のもう 1 つのシンクは、サブタイプ制約のラベルを Ruby の二重引用符文字列に「with no escape pass at all」で包む。`#{...}` は Ruby の補間であり、その中のバッククォートはシェルコマンドを実行するので、細工された Elo 文字列は攻撃者の選んだコードにコンパイルされる——しかも「the same Elo source compiled to JavaScript, Python, or SQL is benign」であり、これがコンパイラ自身の可搬性の約束を壊す。

レコードは 2 件、いずれも **9.8** で `AV:N/AC:L/PR:N/UI:N`。`CVE-2026-44266`（文字列リテラル出力とラベル付きサブタイプ制約分岐経由の補間。入口には Ruby ターゲットの `/try` プレイグラウンドや `bin/eloc -t ruby -x` が含まれる）と、`CVE-2026-44267`（`src/transform.ts` の「does not reject meta-properties」な `member_access` ハンドラ経由で `.constructor.constructor` が JavaScript の `Function` に到達する）。どちらも **1.0.1** で修正され、勧告は影響範囲を `<= 1.0.0` とする。スコアは GitHub（`security-advisories@github.com`）のもので、両レコードは現在も `Received` だ。

**なぜ重要か：** 脆弱性の全体が `#` という 1 文字であり、それは一見完備に見えるエスケープ一覧からちょうど抜けている——「文字列はエスケープしている」というコードレビューが通してしまう典型だ。2 件の CVE は、4 つのバックエンドを持つ式言語には 4 つの独立した注入面があり、自分が使うプレイグラウンドを試すだけでは 1 つしか見つからない、という注意でもある。

[`🔗 GHSA-7w38-ggh5-v542（Ruby バックエンド RCE）`](https://github.com/enspirit/elo/security/advisories/GHSA-7w38-ggh5-v542) · [`🔗 GHSA-33r5-xmm8-v6x5（JS constructor 脱出）`](https://github.com/enspirit/elo/security/advisories/GHSA-33r5-xmm8-v6x5) · [`🔗 enspirit/elo`](https://github.com/enspirit/elo)

---

## 15. FreeRDP の新しい 9.1 は不完全な修正だ：3 つの証明書識別チェックのうち 2 つは 3.29.0 から HEAD までバイト単位で同一

- **Velocity:** ▮▮ rising
- **ソース:** FreeRDP 勧告 GHSA-jq25-3374-4262 · 公開 2026-10-19、CVE レコード 2026-11-03
- **タグ:** `cve` `freerdp` `tls` `mitm` `incomplete-fix`

勧告のタイトル自体が結論だ——**「Incomplete fix for GHSA-43hh-p3vw-hfx3: CN-fallback and IP-literal cert identity checks were never patched.」** 先行の勧告（**3.29.0** で修正済みとされた）は、`tls_verify_certificate()` / `tls_match_hostname()` / `x509_utils_get_dns_names()` にある 3 つの証明書識別検証の弱点を直したと主張していた。しかし 3.29.0 の実際のコミット集合（`af7f228`、`c5a7325`、`b7db8d2`）は**埋め込み NUL バイトによる切り詰めのケースだけ**を扱っており、Common Name へのフォールバックと非一致 SAN のケース、IP リテラルが DNS 文字列として照合されるケースは、勧告自身の言葉で「byte-identical in `libfreerdp/crypto/tls.c` from the 3.29.0 tag through current HEAD」だ。

脅威モデルは精密に書かれており、「認証不要」ではない。クライアントが既に信頼する CA に連鎖する証明書を提示できる攻撃者（誤発行の公共 CA、侵害された／悪意ある私有 CA）は、識別検証を静かに通過し RDP セッションを中間者攻撃できる（画面、キーストローク、クリップボード、入力注入）。修正版は **3.32.2**。NVD レコードには VulnCheck の 4.0 スコア **9.1**（`AC:H`、`AT:P`）と、その隣に 3.1 の **7.4** がある——同じベクトルの 2 フレームワークでの値で、差は物理アクセス／`AT:P` 項であり不一致ではない。この勧告には、もっと多くの報告に載るべき一行もある——**「This report was submitted with AI assistance.」**

**なぜ重要か：** 「3.29.0 で修正済み」は 3 つのうち 2 つについて偽であり、それが 11 リリース続いた。つまり更新して様子を見るのをやめた人はずっと露出していた。再利用できる確認は安い——勧告が**関連する一連の**ケースを閉じたと主張するとき、そのコミットがすべてに触れているかを確かめること。ここでは 2 つのシンクの diff が完全に空だった。

[`🔗 GHSA-jq25-3374-4262 (FreeRDP)`](https://github.com/FreeRDP/FreeRDP/security/advisories/GHSA-jq25-3374-4262) · [`🔗 CVE-2026-121392 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-121392)

---

## 16. Docker Desktop 4.98.0 は WSL2 の seccomp バイパスを閉じた —— そして Ubuntu が出していないカーネル修正を一緒に積んだ

- **Velocity:** ▮▮ rising
- **ソース:** Docker Desktop リリースノート · 4.98.0 は 2026-11-03 公開
- **タグ:** `docker` `wsl2` `seccomp` `cve` `kernel`

リリースノートにはセキュリティ項目が 2 つある。1 つ目は `CVE-2026-112917`。Windows の WSL2 バックエンド上の Docker Desktop で、非特権 Linux コンテナが「can use 32-bit socketcall to bypass the default seccomp restriction on **AF_VSOCK**」でき、ホスト向けサービスとログインユーザーがアクセスできる Windows ファイルが露出する。Docker は CVSS 4.0 で **9.2**（`AV:L/AC:L/PR:L/UI:N/VC:H/VI:H`）を付け、修正が 2 つの条件であることを明示する——**Docker Desktop 4.98.0 以降かつ WSL 3.0.3 以降**。「Docker Desktop 4.98.0 or later running on an older WSL remains affected」。seccomp フィルタは `AF_VSOCK` を伴う 64 ビット `socket` システムコールを止めたが、32 ビット `socketcall` 多重化は止めていなかった。x86-64 で 32 ビット syscall の穴が再演した古典的な形だ。

2 つ目は本フィードの読者にとってより興味深い——**「Fixed CVE-2026-98432, a use-after-free in the Linux kernel's IPv4 TCP handling.」** レコードの参照は `linux-msft-wsl-6.18.54.1` と WSL `3.0.3` を指すので、Docker が配ったのは修正を含む同梱カーネルだ。2026-11-03 に、この CVE の公表から 3 週間たっても Ubuntu は修正カーネルを出していないと書いた。今日時点で、Windows 上の Docker Desktop 利用者には修正版があり、Ubuntu 利用者にはない。

**なぜ重要か：** 32 ビット syscall の穴は Docker 固有のバグではなく seccomp 表の書き方の癖であり、同じ表が他のコンテナランタイムにもコピーされている。防御側にとって有用なのは 2 つ目だ。Ubuntu が出していないカーネル修正が、今はデスクトップ製品の同梱カーネルの中に存在する。つまり「このホストは脆弱か」の答えは、コンテナが WSL2 で動くか Ubuntu LTS ホストで動くかで変わる。

[`🔗 Docker Desktop 4.98.0 リリースノート`](https://docs.docker.com/desktop/release-notes/#4980) · [`🔗 CVE-2026-112917 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-112917) · [`🔗 WSL 3.0.3 リリース`](https://github.com/microsoft/WSL/releases/tag/3.0.3)

---

## 17. Craft Anything は任意のアプリにエージェントを向けてクリーンルーム複製を作らせる —— 4 日で 7,798 スター、しかもステータスページは正直だ

- **Velocity:** ▮▮ rising
- **ソース:** GitHub · 2026-10-31 作成 · 7,798 スター · Apache-2.0 / MIT
- **タグ:** `agent-infra` `rust` `mcp` `reverse-engineering` `clean-room`

前提は異例に直接的だ。ウェブサイト、デスクトップアプリ、ゲームを指定して欲しいものを伝えると、コーディングエージェントが元を調査し、指定したスタックで新規プロジェクトを構築し、3 つの画面幅で元と比較して近づくまで改善する。エンジンは**純粋な Rust**、**320 のツール**を CLI コマンドと MCP ツールの両方として公開し、デスクトップアプリ、CLI、MCP サーバーとして動く。

重要な設計判断は既定値にある。**Clean room** は「nothing inside the original is read, not its code, files or page source」を意味する。訪問者に見えるもの（スクリーンショット、可視テキスト、測定したレイアウト、色、フォント、余白）だけで作業し、内部を見るツールは拒否され、Deep モードの有効化方法が示される。**Deep** はコード、ファイル、JavaScript を読み、Ghidra があれば使う——「for your private use」。責任ある利用の段落は「never bypasses DRM, logins or anti-cheat」とし、所有者であるか許可を得ていると確認しない限りロゴ、写真、テキストをコピーしないようエージェントに指示すると述べる。ステータス欄も同様に具体的で、API キーや他のコーディングエージェントでのビルドは **「built, not yet run live」**、アプリとゲームの振る舞いチェックは部分的、一部のエンジンツールは代役に対してのみ試験済みと明記する。

**なぜ重要か：** 「このソフトを複製せよ」をエージェントのワークフローとして梱包し広く注目された最初のツールであり、法的に面白い選択を**意図的に**している——既定はクリーンルーム、ソースを読むのは明示的なオプトイン。それが通用するかは技術の問いではないが、この区別と拒否挙動、反 DRM の声明を README に載せたことは、このカテゴリの通常より多い。

[`🔗 storytold/craft-anything`](https://github.com/storytold/craft-anything) · [`🔗 docs/STATUS.md`](https://github.com/storytold/craft-anything/blob/main/docs/STATUS.md)

---

## 18. 時計を直すためだけに車のナビを jailbreak した —— 「時刻設定」メニューは地図 SD カードが挿さっているときしか存在しない

- **Velocity:** ▮▮ rising
- **ソース:** blog.nns.ee · 2026-11-02 · HN 382 ポイント
- **タグ:** `reverse-engineering` `automotive` `qnx` `firmware` `writeup`

記事は 2014 年式ルノー・ラティテュードから始まる。夏時間の切り替えで時計が 1 時間ずれ、設定メニューには「時刻設定」がそもそも無い。前の所有者の「apparently needs this SD card just to change the time on the clock」という話は本当だった。2 つ目の Settings ボタンはメニューを開かず `No maps detected!` を出す。そこで作者はベンダーの更新エンドポイントからファームウェアを取得し、更新パッケージ内の `ttsystem` が **ext3 ファイルシステム**であることを見つける。そこが出発点だ。

価値があるのは方法論であり、オチではない。リバースの足がかりは公開されたフランス語の README（`andronedev/carminat-tomtom-live-re`）で、作者はそれを「seemingly heavily LLM-assisted」と評しつつ、更新ファイルの URL は正しく示していた——LLM が書いた文書は「ファイルがどこにあるか」については正確で、「取った後どうするか」については当てにならない、という良い例だ。そこからファイルシステム抽出、QNX ベースのユニット、そして地図データを前提にしたコード経路が時計設定も同時に制御していたことの発見へ続く。

**なぜ重要か：** これが現代の組み込みリバースの形だ——ベンダーの更新サーバーが一次成果物になり、コミュニティのメモが地図になり、ベンダーの協力は一切ない。同時に、UI 要素が「欠けている」のではなく**条件付き**である、という小さく正確な例でもある。正直な修正はトグルを足すことではなく、この機械が何を待っているのかを理解することだ。

[`🔗 車のナビゲーションを jailbreak する`](https://blog.nns.ee/2026/11/02/renault-hack/) · [`🔗 carminat-tomtom-live-re（先行研究）`](https://github.com/andronedev/carminat-tomtom-live-re/blob/main/README.md) · [`🔗 HN スレッド`](https://news.ycombinator.com/item?id=50339288)

---

## 19. pixelfx は 244 個のピクセルアート効果を小さなプログラムとして収録 —— しかも README では HTML コメントで件数を囲み、機械に読ませる

- **Velocity:** ▮ steady
- **ソース:** GitHub · 2026-10-30 作成 · 4,060 スター · MIT
- **タグ:** `dev-tools` `pixel-art` `claude-skill` `open-source` `games`

`patch-gg/pixelfx` は **244 個のピクセルアート効果とアニメーション**のギャラリーで、「every one a small piece of code」——炎、爆発、魔法、天候、UI、拾い物、小動物など——のそれぞれがライブ再生、色替え、反転、スプライトシート書き出し、ブラウザゲームへの投入に対応する。キャラクターが関わる効果は「演じられる」：溜め、放出、接触時の停止、回復。12 のフルモーションが効果を繋いで攻撃にする。

盗む価値がある構造的細部はこれだ。README の件数は `<!-- count -->244<!-- /count -->` と書かれている——数字を HTML コメントで囲むので、ページを読むツールは散文を正規表現で推測せずに主張を見つけられる。「README の数字がコードの数字からずれる」類のバグに対する最も安価な答えで、コストはコメント 2 つ分だ。

**なぜ重要か：** 数字を成果物と突き合わせて過ごす本フィードにとって、自分の件数を**区切って示す**リポジトリは今日の GitHub で最も友好的なものだ。中身も実用的で、244 個の小さくライセンスされ個別に検証可能な効果は、ゲームジャムにとって生成したスプライトシートより良い資産であり、隣のスキルはその数字を伸ばし続けるための出力形式になっている。

[`🔗 patch-gg/pixelfx`](https://github.com/patch-gg/pixelfx) · [`🔗 ライブギャラリー`](https://patch-gg.github.io/pixelfx/) · [`🔗 カタログ`](https://github.com/patch-gg/pixelfx/blob/main/docs/CATALOG.md)

---

## 20. 量子タスクだけを与えられた RL エージェントが、自身の予測モデルの中にミンコフスキー因果構造を再構成した

- **Velocity:** ▮ steady
- **ソース:** arXiv 2611.03596 · 2026-11-02 提出
- **タグ:** `research` `rl` `quantum` `world-models` `emergence`

設定は意図的に削られている。モデルベース強化学習のエージェントが、ミンコフスキー時空の量子場と相互作用する局所プローブ間の量子相互情報量を最大化する。計量も因果構造も、それに関する情報も一切与えられない。タスクを解くためにエージェントが作った内部予測モデルのプランナーは「develops the characteristic null structure of spacetime」であり、著者はそこからミンコフスキー計量の因果構造を高精度に再構成する。

**なぜ重要か：** 主張は「エージェントが相対論を発見した」ではない。因果構造が操作的な経験だけから回収可能だった、という点だ——本フィードが見てきた「世界モデルは相関ではなく構造を学ぶ」という論の最も強い形であり、しかも検証できるほど狭いタスクを伴う。明らかな限界は場とプローブを実験者が選んでいること。興味深い残りは**ヌル構造**、つまりどの事象がどの事象に影響しうるかを決める部分が、予測目的から零れ落ちてきたことだ。

[`🔗 Spacetime Emergence in the Memory of a Learning Agent (arXiv)`](https://arxiv.org/abs/2611.03596) · [`🔗 論文 PDF`](https://arxiv.org/pdf/2611.03596)

---

## Metadata

| フィールド | 値 |
|-------|-----|
| Generated | 2026-11-03T20:15:18Z |
| Items | 20 |
| Sources tracked | 18（Hacker News、GitHub Trending、arXiv、NVD、GitHub Advisory Database、ベンダー勧告、ステータスページ） |
| Update schedule | 04:03, 12:03, 20:03 UTC+8（1 日 3 回） |
| Ranking | 速度加重（新しさ × エンゲージメント加速度 × 情報源の権威） |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[前日](2026-11-03.md) · [生の .md](../feed/2026-11-04.md) · [アーカイブ](../archive/)
