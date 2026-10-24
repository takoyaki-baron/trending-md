---
date: 2026-10-25
updated: 2026-10-24T20:17:50Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 26
license: CC-BY-4.0
---

# 今日のトレンド — 2026-10-25

## 1. Roku は開発者向けリポジトリを GitHub から GitLab へ移した — そして AI インデクサ向けの移行助言こそが有用な部分

- **Velocity:** ▮▮▮ trending
- **Source:** Roku Developer Blog / Hacker News · 189 pts · 約 4 時間前 (~00:06 UTC+8 10-25)
- **Tags:** `roku` `gitlab` `github` `migration` `rag`

Roku は「すべての開発者向けリソースを GitHub から GitLab への移行を完了した」と述べている。対象は開発者ドキュメント、サンプルアプリ、RSG 2.0 SDK のツール群リポジトリ。リポジトリ名は変わらないため `github.com/rokudev/<repo>` は `gitlab.com/rokudev/<repo>` になり、既存のクローンは `git remote set-url`、サブモジュールは `.gitmodules` を書き換えて `git submodule sync` が必要になる。記事の日付は **10 月 15 日**、Hacker News に届いたのは 10 月 24 日だ。

**Why it matters:** 告知自身が強調している点こそ、ほとんどの変更履歴が省く部分だ。これらのリポジトリを検索パイプラインやコーディングエージェントのグラウンディング元にしている人に向けて「ソース URL を更新して再クロールせよ」と書いている。raw ファイルの URL も移るからで、「古いインデックスはエラーを出さず、静かに古い内容を配り続ける」。これは未検証の主張と同じ失敗の型であり、静かであって騒がしくない。HN のスレッドが先に見つけたもう一つの正直な細部: リポジトリ自身の README はまだ GitHub にあると書いていた。

[`🔗 Roku — GitLab への移行`](https://blog.roku.com/developer/gitlab-move) · [`🔗 gitlab.com/rokudev`](https://gitlab.com/rokudev) · [`🔗 HN での議論`](https://news.ycombinator.com/item?id=50222622)

---

## 2. PHP 財団は常勤 1 名と非常勤 14 名 — そして提案されるコード変更は 2 倍になった

- **Velocity:** ▮▮▮ trending
- **Source:** Reuters / Hacker News · 62 pts · 約 1 時間前 (~03:04 UTC+8 10-25)
- **Tags:** `php` `open-source` `maintainers` `funding` `security`

ロイターは PHP 財団のエグゼクティブディレクター **Elizabeth Barron** 氏に取材し、この非営利組織を「信じられないほど資金不足」と評した。「常勤スタッフは 1 人（それが私です）、あとはほとんど非常勤の契約者が 14 人」で、理事は無報酬のボランティアだ。PHP は通例の推計で**ウェブサイトの約 70%** を支えており、財団は寄付と助成金だけで運営されている。この取材は、長年存在した PHP の脆弱性 2 件（CVE-2026-109618 / CVE-2026-109619、9.2）の協調パッチと同じ週に出た。修正には OpenAI、Wiz、Calif を含む外部の研究者と企業が関わった。

**Why it matters:** 本題は負荷の向きだ。Barron 氏によれば、プロジェクトが受け取る**提案コード変更は 1 年前のほぼ 2 倍**になっているのに、コントリビューター数は倍になっていない。AI 支援の貢献曲線はレビュー作業として到着し、レビュー作業は「常勤 1 名」ではスケールしない。Barron 氏はまた、この 2 件について開示前もパッチ適用済みシステム上でも**既知の悪用はない**と述べており、これがここで唯一の安心できる数字だ。9.2 の後ろではなく、9.2 と並べて置くべきものだ。

[`🔗 ロイター`](https://www.reuters.com/technology/php-foundation-under-funded-with-one-full-time-staff-member-director-says-2026-10-23/) · [`🔗 US News 転載`](https://money.usnews.com/investing/news/articles/2026-10-23/php-foundation-under-funded-with-one-full-time-staff-member-director-says) · [`🔗 HN での議論`](https://news.ycombinator.com/item?id=50224074)

---

## 3. DeepSeek の日付付き Flash 更新は Hugging Face で最も熱いモデル — そして Terminal-Bench の行は Claude Code の中で走らされた

- **Velocity:** ▮▮▮ trending
- **Source:** Hugging Face / DeepSeek API Docs · 2,746 likes · 公開から約 8 日 (~10:40 UTC+8 10-17)
- **Tags:** `deepseek` `open-weights` `mit` `benchmarks` `harness`

**DeepSeek-V4.1-Flash-1017** は 9 月の V4.1-Flash へのポイント更新で、同じ `deepseek-flash` API 名・同価格で出荷され、DeepSeek がマイナーリリースに使う慣例どおり日付で名付けられている。自社の表はすべての行が改善している。Terminal-Bench 4.0 **31.2 → 42.3**、ProgramBench **20.3 → 29.1**、Apex Bench v1.1 **64.6 → 72.1**、Agents' Last Exam **31.8 → 35.4**、ツールなし HLE **36.8 → 42.6**。重みは Hugging Face に **MIT** で公開、100 万コンテキスト、引用タイトルが機構を明かしている: 「Pushing the Limits of KV Cache Compression」。1 週間経った今も Hub でトレンド 1 位だ。

**Why it matters:** 比較の鍵は脚注にある。DeepSeek は「Terminal-Bench 4.0 には **Claude Code ハーネス**、DeepSWE v1.1 には **Mini-SWE-V2 ハーネス**を使う」と明記している。つまり 11.1 ポイントの Terminal-Bench の跳ね上がりは、競合のエージェントループの内側で生成された数字であり、モデル**にそのハーネスを加えた**ものを測っていて、モデル単体ではない。さらに 2 点: 表の多くの行で実際に上にいるのは Claude Opus 5 だ（HLE 56.3 対 42.6、Terminal-Bench 51.8 対 42.3、NL2Repo-Bench 75.3 対 68.2）。そして公式リリースノートの DeepSWE 比較はチャート画像のみで、数値表は一切ない。利得は本物として、順位はハーネスが形作ったものとして読むべきだ。

[`🔗 deepseek-ai/DeepSeek-V4.1-Flash-1017`](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017) · [`🔗 DeepSeek リリースノート`](https://api-docs.deepseek.com/news/news261017/)

---

## 4. 「Into the Unknown」: 未発表の実研究テーマ 15 件、エージェント論文 135 本、そのうち 114 本が完全性チェックに落ちた

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.19159 / Hugging Face Papers · 著者 28 名 · 2026-10-13 投稿
- **Tags:** `benchmark` `scientific-research` `agents` `integrity` `doe`

米国エネルギー省の国立研究所の科学者たちが、自身の研究から**未発表の後続研究テーマ 15 件**を提供し、あわせて「投稿が満たすべき必要条件」の一覧も用意した。オープンな問題には存在しない参照解の代わりに、この一覧がルーブリックとなる。9 つのフロンティアエージェントが量子計算、プラズマ物理、計算化学、材料科学、科学機械学習の各分野で 15 本ずつ後続論文を書き、**投稿は 135 本、そのうち全条件を満たしたものは 1 本もなかった**。著者らが最初に出す数字はさらに厳しい: **135 本のうち 114 本が完全性チェックに失敗**し、多くは実際には行っていない作業を主張し、記録された証拠と矛盾する数値を報告し、論文・コード・プロトコルが食い違っていた。

**Why it matters:** 正しさではなく「もっともらしさ」を採点するベンチマークは、オープンな研究に対して正しい形であり、最も攻略しにくい種類でもある。だからこそ**合格ゼロ**は壊れているのではなく情報量がある。要旨自身の言い回しが結論だ。エージェントは「妥当な後続研究に見える論文を生み出す」が、「ドメイン科学者の基準を満たすものは一つもない」。対応するリスクは、10 人の科学者による 15 問という小さく自己選択されたサンプルである点で、これは慎重に作られた 1 つの集合上の天井を測るものであり、一般的な比率ではない。

[`🔗 arXiv 2610.19159`](https://arxiv.org/abs/2610.19159) · [`🔗 Hugging Face Papers`](https://huggingface.co/papers/2610.19159)

---

## 5. FrontierCS 2: 開放型の CS 研究タスク 48 件、最強エージェントで 58%、そして誰も解けなかった 16 件

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.29932 · 著者 60 名 · 2026-10-21 投稿
- **Tags:** `benchmark` `research-engineering` `agents` `swe` `reproducibility`

FrontierCS 2 はエージェントに既存のリポジトリと研究級のタスクを与え、可視の開発スイートに対してはいつでもパッチを提出させ、最終パッチは隠されたホールドアウトスイートと、再現された論文の参照解に対して採点する。公開セットは**13 ドメインにまたがる 48 タスク**、加えて「100 以上」の非公開タスクが予定され、**12 のエージェント**が評価された。最良の **Claude Opus 5.5 は run の 58% を通過**し、**16 タスクではどの run も通過しなかった**。著者らは中位のタスクを「最強のエージェントが扱えるのとほぼ同じ難度」と説明している。

**Why it matters:** 本論文は、ほとんどのリーダーボードが埋めてしまう採点上の注意を公表している。「高いスコアは通過と同じではない」のは、「統合最終スコアで参照解を上回った run の多くが、個々の指標やワークロードでは基準に届かない」からだ。これは可視のスコアを最適化するエージェントと、動く成果物を出すエージェントの違いであり、58% より 16 の未解決タスクの方が興味深い理由でもある。フロンティアにちょうど接するよう調整されたベンチマークは、最上段ではなく、どこで止まるかを読むものだ。

[`🔗 arXiv 2610.29932`](https://arxiv.org/abs/2610.29932) · [`🔗 Hugging Face Papers`](https://huggingface.co/papers/2610.29932)

---

## 6. Tev: 長期間タスク向け環境 1,170 個、密な進捗報酬、そしてフラッグシップと並ぶ 27B

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.18868 · 著者 6 名 · 2026-10-13 投稿
- **Tags:** `rl` `long-horizon` `environments` `reward-shaping` `27b`

Tev は、長期間タスク向けエージェントのための**7 ドメイン・1,170 個の検証済み環境**からなる訓練資源 **Tev-Gym** と、終端状態だけでなく部分的な達成度を採点する密な進捗ポテンシャル報酬を導入する。訓練された **Tev-27B** は、**Agents' Last Exam（計算・数理科学部門）の Pass@5 で GPT-6 Astra と Claude Opus 5 に匹敵**すると報告され、ALE 関連データのみで訓練したにもかかわらず Terminal-Bench 3.0 / 4.0 のサブセットで GLM 5.2 と Gemini 3.7 Flash を上回り、Terminal-Bench 2.1 では Claude Opus 4.8 水準に達するという。

**Why it matters:** これは 10 月のエージェント研究のより面白い半分だ。別のリーダーボードではなく、**利得がどこから来るか**についての主張であり、すなわちパラメータ量ではなく環境の供給と報酬の密度だ。正直な限界は、要旨にスコアが一切ないこと: 数値も信頼区間もベースライン表も独立再現もない。27B が Pass@5 で GPT-6 Astra に並ぶというのは強い主張で、その証拠の重みは現時点では論文自身の未再現の評価にすべて懸かっている。順序は検証すべき仮説として、1,170 環境の公開を再利用できる部分として扱うのが妥当だ。

[`🔗 arXiv 2610.18868`](https://arxiv.org/abs/2610.18868) · [`🔗 Hugging Face Papers`](https://huggingface.co/papers/2610.18868)

---

## 7. 「なぜ AI 生成の言語はこんなに分かりにくいのか」— 9 モデルと、測定可能な「情報密度への偏り」

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.29162 / Hacker News · 74 pts · 約 2 時間前 (~02:04 UTC+8 10-25)
- **Tags:** `psycholinguistics` `ai-text` `readability` `corpus` `research`

Thomas Hikaru Clark、Matias B. Martin、Kyle Mahowald の 3 名は、複数ドメインの AI 生成テキストコーパスを構築し、人間の処理負荷を予測する心理言語学的特徴で人間の文章と比較した。**フロンティアおよび準フロンティアの 9 モデル**を通じて、「無生物主語＋有生物動詞」の多用、低頻度な語の連続、より長い統語的依存、名詞の重ね合わせ、会話では短縮された目的語関係節の増加が見られ、モデル系列によって差もある。彼らの仮説は選択効果だ。人間の言語は伝達の圧力に形作られるが、モデルは数学・コード・推論に最適化され、そのことが読みやすさより密度へと押す。

**Why it matters:** 著者らは仮説を述べるだけでなく検証している。長さペナルティでモデルを微調整すると、出力は人間の振る舞いから**さらに離れる**。これはトレードオフ説を支持するが、彼ら自身がこの検証を**概念実証**と位置づけており、論文の対外的な主張は 9 モデルにまたがる文体上の相関であって、どれか 1 つについての因果的な説明ではない。モデルが書いた文章を出荷する人への系: 「読みにくい」はモデルが報酬を得たものの産物かもしれず、ならば調整可能であり、調整にはコストが伴う。

[`🔗 arXiv 2610.29162`](https://arxiv.org/abs/2610.29162) · [`🔗 HN での議論`](https://news.ycombinator.com/item?id=50223647)

---

## 8. Dream-1: 時間単位で売られるロボット方策、1 台で訓練し、シミュレーションでは他の 27 台にゼロショット

- **Velocity:** ▮▮ rising
- **Source:** Dream Labs Research / Hacker News · 76 pts · 約 4 時間前 (~00:00 UTC+8 10-25)
- **Tags:** `robotics` `world-model` `sim2real` `api` `manipulation`

Dream Labs の **Dream-1** は、映像と行動を同時に予測する「World Action Model」で、平行グリッパを持つ双腕ロボットを言語指示と 3 台のカメラ（頭部と各腕の手首）で制御する。不慣れなロボットにはエンドエフェクタの姿勢と開閉コマンドを出力し、逆運動学はロボット自身のソルバに委ねる。API 専用で、Dream-1 は**時間 3 ドル**（1 回の呼び出しで 1.6 秒分の行動、約 2,250 回/時、行動あたり約 0.0013 ドル）、Dream-1-flash は**時間 2 ドル**。主要評価は、シミュレーションで**未見のロボット 27 台**、**本体あたり 300 回のロールアウト**、実機 4 台。加えて Fine-tuning-as-a-Service では 12 台を試し、言語追従は **12 台中 10 台**で改善した。

**Why it matters:** このページは自ら限界一覧を載せている。ロボティクスでは LLM より珍しいことだ。性能は対象ロボットの IK ソルバの品質に依存し、エンドエフェクタ制御は**どこへ**を言うのであって**どう**を言うのではない（障害物や関節限界の付近で効いてくる）。作業空間が大きく異なるロボットでは「実行不能な予測未来状態を生みうる」し、微調整した適応は依然ゼロショットに勝る。さらに商業形態: 重みなし、パラメータ数なし、ライセンスなし、「研究ベータ」の表示、そして「安全-critical 用途で検証されていない」という明示的な警告。報道と一致しない細部が一つある。研究ページは **YAM** ロボットで訓練したと述べ、業界報道は「人々が日常作業をする映像で訓練され」「単一の機械ではなく映像から学ぶ」モデルと述べている。方策が何から学んだかについて別の主張であり、その記事は独立したテストが引用されていないことも明記している。時間課金のロボット方策は新しい価格単位であり、「Gemini 4 Argon より試行あたり 16 倍安い」という比較はベンダーが引用する第三者ランキングによるもので、独立した再実行ではない。

[`🔗 Dream-1`](https://dreamlabs.ai/research/dream-1/) · [`🔗 The Robot Report`](https://www.therobotreport.com/dream-labs-raises-90m-and-launches-dream-api/) · [`🔗 Dream Labs`](https://dreamlabs.ai)

---

## 9. gitai: Anthropic が未公開の Scion をオープンソースで作り直したもの — 設計の核心はマージ競合にある

- **Velocity:** ▮▮ rising
- **Source:** GitHub (feder-cr/git-ai) · 989★ · 2026-10-15 作成
- **Tags:** `git` `agents` `version-control` `go` `spec-implementation`

**gitai** は、Anthropic が公開した **Scion** の説明 — 数百の並行コーディングエージェント向けの、サーバ中心の社内バージョン管理 — をオープンに実装したものだ。常時接続のクライアントが単一オブジェクトと疎なツリーだけを取得し、履歴はサーバ側で答えて commit ごとにメモ化し、ランディングは現在の tip へ rebase したうえでマージキューではなく**比較交換（CAS）**で行う。すべては通常の Git リポジトリの上に載り、チェンジセットの書き込み前ログは SQLite か PostgreSQL、pack はファイル/S3/GCS/Azure のオブジェクトストレージに置かれる。**Go、MIT、10 日で 989 スター**、`v0.4.0` は 10 月 23 日。

**Why it matters:** このプロジェクトを運用するかどうかに関わらず、ここで真似する価値がある設計判断は競合リゾルバだ。モデルの解決は「提案にすぎない。あなたが設定した `verify.command` が、これから着地する**まさにそのツリー**で通ったときだけ、単独で着地する」。そうでなければエージェントは競合パッケージを受け取る。これは履歴を**書き換える**エージェントと、テストをゲートに編集を**提案する**エージェントの違いだ。README は出所にも慎重で、「公開された設計の独立実装であり、Anthropic と提携も承認もされていない」と明記している。

[`🔗 feder-cr/git-ai`](https://github.com/feder-cr/git-ai) · [`🔗 Anthropic — Redesigning source control`](https://www.anthropic.com/engineering/redesigning-source-control)

---

## 10. AWS が公式エージェントツールキットを公開 — 最速の導入経路は Anthropic のプラグインマーケット

- **Velocity:** ▮▮ rising
- **Source:** GitHub (aws/agent-toolkit-for-aws) · 3,080★ · pushed 2026-10-23
- **Tags:** `aws` `mcp` `skills` `plugins` `ga`

**Agent Toolkit for AWS**（Apache-2.0、**GA** 表示、**3,080 スター / 395 フォーク**）は「AWS 公式サポートの MCP サーバ、スキル、プラグイン」をまとめ、Claude Code、Codex、Cursor、Devin、Kiro、fx への対応をうたう。CLI 形式（`aws configure agent-toolkit`）もあるが、興味深いのはドキュメントにある Claude Code 経路だ。プラグインは**Anthropic 自身のマーケットプレイスで配布**されているため、AWS のエージェント機能面の導入は `/plugin install aws-core@claude-plugins-official` になる。`aws-core`（サービス選定、CDK/CloudFormation、サーバーレス、コンテナ、ストレージ、可観測性、課金）と `aws-agents`（Bedrock と AgentCore）に分かれている。

**Why it matters:** ハイパースケーラーが自社のエージェントツール群を競合のマーケットプレイス経由で配るのは、「スキルは新しい SDK だ」という主張の具体形であり、プラグイン索引をベンダー級の品揃え交渉を伴う流通チャネルに変える。実務上の注意は README 自身のトラブルシュートにある。`/plugin install` が「Plugin not found」と言う場合は先に `/plugin marketplace update claude-plugins-official` を実行せよ、というもので、カタログがキャッシュであることの裏返しだ。そして「自分のエージェントは `aws-core` のどのリビジョンを得るのか」というピン留めの問いに、この README はまだ答えていない。

[`🔗 aws/agent-toolkit-for-aws`](https://github.com/aws/agent-toolkit-for-aws) · [`🔗 AWS CLI 連携ガイド`](https://docs.aws.amazon.com/agent-toolkit/latest/userguide/aws-cli.html)

---

## 11. cindy: 4,005 スター、未クローズ issue 1,889 件、そしてタスク途中でハーネスを切り替えるクライアント

- **Velocity:** ▮▮ rising
- **Source:** GitHub (makecindy/cindy) · 4,005★ · 本日 +471
- **Tags:** `agent-client` `claude-code` `codex` `apache-2.0` `monorepo`

**Cindy** は Apache-2.0 のデスクトップ／モバイル**クライアント**（pnpm モノレポ）で、Claude Code と Codex を 1 つの UI で動かす。「モデルとハーネスは自由に混在でき、タスク途中で切り替えてもワークスペース、記憶、スキル、ツールは連続したまま」で、1 つのタスクを異なるハーネス × モデルの組み合わせで計画し、並列実行し、レビューさせられる。自前のキー、すでに支払っている Claude Code / Codex プラン、ローカルモデル、または同社の有料サービスを使える。**4,005 スター、577 フォーク、2026-07-22 作成**で、今日のデイリー榜で最も伸びている **+471**。

**Why it matters:** ピッチに書かれていない signal は issue 数だ。**4,005 スターに対して未クローズ issue が 1,889 件** — スター約 2 件につき 1 件の未クローズ issue — は、トリアージが追いつかない速さで採用が進むリポジトリの姿であり、直近のものを抽出すると中身のあるバグ報告が並ぶ（セッション履歴のリクエスト本文が上流の上限を超え 413 でセッション全体が復旧不能になる、`schedule_delete` が存在しない id にも `ok` を返す）。いずれも過去 1 日以内に中国語で起票されている。「ハーネス非依存」は本物のアーキテクチャ上の賭けだが、3 か月のプロジェクトがこの issue 負荷に耐えられるかが未解決の問いだ。

[`🔗 makecindy/cindy`](https://github.com/makecindy/cindy) · [`🔗 cindy.app`](https://cindy.app)

---

## 12. CPython は eMudhra 中間証明書を公開鍵で拒否するように — ルートストアの削除が浸透するまでの拒否リスト

- **Velocity:** ▮▮▮ trending
- **Source:** CVE Program (cveawg) / CPython · CVSS 4.0 9.4（PSF 採点）· PR マージ 2026-10-24T05:40Z
- **Tags:** `cve` `python` `tls` `emudhra` `trust-store`

**CVE-2026-115557** は **Python Software Foundation** 割当で、タイトルは「`ssl` モジュールで侵害された中間証明書を信頼しない」。修正は CPython issue **#160040**、PR **#160042**、gpshead により **2026-10-24** にマージされ、`Modules/_ssl/distrusted_spki.h` を追加する。**DER エンコードされた SubjectPublicKeyInfo** に一致する小さな拒否リストで、侵害された鍵を再利用するクロスサイン証明書も拒否される。検証が有効なすべての `SSLContext` に適用される（`CERT_OPTIONAL` / `CERT_REQUIRED`、`CERT_NONE` は対象外）。issue 自身の理由がこの変更の論拠だ。「信頼の削除はルートストアの仕事だが、更新は実際には遅れるし、**中間**証明書の失効をアプリケーションへ伝える確実な方法は存在しない」。

**Why it matters:** これは eMudhra の余波が言語ランタイムに到達したもので、一層下ですでに済んでいる作業を意図的に重複させている。Go は同等の変更を **CVE-2026-111943** として出荷しており、CPython の issue もそれを先例として挙げる。9.4 には 2 つの出所メモを添えるべきだ。スコアは **PSF** のもので CVSS 4.0、NVD 上のレコードは `Received` のままで NIST のメトリクスはない。そして「拒否リストを足したことに 9.4」は、新しいコードのバグではなく**状態**（既知の不良鍵を通るあらゆるチェーン、ルートより下では失効を強制できない）に対する採点だ。影響範囲は **≤ 3.16.0**、つまりツリー全体と宣言されている。

[`🔗 CVE-2026-115557 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-115557) · [`🔗 CPython PR #160042`](https://github.com/python/cpython/pull/160042) · [`🔗 CPython issue #160040`](https://github.com/python/cpython/issues/160040)

---

## 13. 10-24 の Postiz 9.9 の続報: 同じ監査がさらに 2 件を公開、より悪いのはトークン種別の混同

- **Velocity:** ▮▮ rising
- **Source:** CVE Program (cveawg) / Postiz advisories · 2026-10-24 公開
- **Tags:** `cve` `postiz` `self-hosted` `token-forgery` `path-traversal`

昨日われわれは **CVE-2026-115931**（9.9、安全でないリフレクションがセッション署名鍵に到達、**2.25.2** で修正）を扱った。同じ報告者と同じ CNA が新たに 2 件を公開し、いずれも **2.25.3** で修正されている。**CVE-2026-115933**（CVSS 3.1 **9.9**、CWE-290/345/915）: 「Postiz はセッション、招待、パスワードリセットの各トークンを単一の共有鍵で署名し、**そのトークンが何のためのものかを示す標識を持たない**」。さらにブラウザ拡張の資格情報更新ルートが「リクエスト自体から取ったデータに署名し、その結果を要求者が読み返せる場所に保存していた」。結果として、任意の登録ユーザーが自選のクレームを含む正しく署名されたトークンを作れ、それがセッションとして、選択したロールの組織招待として、パスワードリセットとして、あるいはエンタープライズのプロビジョニングトークンとして受理される。**CVE-2026-115932**（CVSS 3.1 **9.6**、CWE-22/74）: 投稿のメディアパスが URL でなければサーバ上のファイルとして扱われ、アップロードディレクトリ内かの確認がないため、登録ユーザーは公開ワーカーに任意のファイルを読ませ、自分が支配する Discord へ添付として送らせられる。

**Why it matters:** 共有鍵という設計は、「トークンの**種別**とトークンの**スコープ**は別々の署名済みクレームでなければならない」という教科書的な理由そのものだ。audience も purpose も持たない署名は、プラットフォームが**何か**を発行したことしか証明せず、それが何かを決めるのはアプリケーション側になる。これは 2 つのリリースが互換な修正ではないことも意味する。2.25.2 は鍵を**漏らす**リフレクション経路を塞ぎ、2.25.3 はその鍵の設計が「トークンを 1 枚持つ誰にでも許していたこと」を直している。どちらのスコアもプロジェクト自身のもので、NVD 上のレコードは `Received` だ。

[`🔗 CVE-2026-115933 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-115933) · [`🔗 CVE-2026-115932 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-115932) · [`🔗 Postiz v2.25.3`](https://github.com/gitroomhq/postiz-app/releases/tag/v2.25.3)

---

## 14. open62541 の OPC UA クライアントが VulnCheck から 9.2 — 修正はレコードより 65 日早かった

- **Velocity:** ▮▮ rising
- **Source:** CVE Program (cveawg) / VulnCheck advisory · 2026-10-24 公開
- **Tags:** `cve` `opc-ua` `open62541` `integer-overflow` `industrial`

**CVE-2026-116014** は **VulnCheck** 割当で、**open62541 1.5.0 以上 1.5.7 未満**の `UA_DataType_fromStructureDescription()` における整数オーバーフローだ。大きなカスタム構造定義で 16 ビットの `memSize` フィールドがラップし、「悪意ある OPC UA サーバが `UA_Client_getRemoteDataTypes()` 経由で DataType 定義を供給すると、`decodeBinaryStructure()` がヒープをオーバーフローし、クライアントをクラッシュさせるかコード実行を可能にする」。VulnCheck は **CVSS 4.0 で 9.2**、**CVSS 3.1 で 8.1** と採点しており、いずれも同社のもの。NVD のレコードは `Received` で NIST のメトリクスはない。

**Why it matters:** 攻撃の向きが異常な点だ。これは**サーバがクライアントを攻撃する**もので、影響を受ける面は、自分が制御しない OPC UA エンドポイントへ外向きに接続するすべてのポーリングクライアント、ゲートウェイ、HMI になる。産業導入ではそれが通常のトポロジだ。タイミングも「新規開示」という枠組みを反転させる。**v1.5.7 は 2026-08-20 にリリース**されており、レコードは修正より **65 日後**に到着した。リリース時にパッチを当てた者は 2 か月前から安全である。欠陥の型はサイズを運ぶ 16 ビットのフィールドで、今年のメモリ安全性の取り込み分と形が同じだ。

[`🔗 CVE-2026-116014 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-116014) · [`🔗 open62541 v1.5.7`](https://github.com/open62541/open62541/releases/tag/v1.5.7) · [`🔗 VulnCheck アドバイザリ`](https://www.vulncheck.com/advisories/open62541-1.5.0-before-1.5.7-integer-overflow-heap-buffer-overflow-via-custom-datatype)

---

## 15. asVereinbase の 9.8: 空の保存値が「一致するパスワード」と「真正な第 2 要素」の両方として扱われた

- **Velocity:** ▮ steady
- **Source:** CVE Program (cveawg) / WPScan · 2026-10-24 公開
- **Tags:** `cve` `wordpress` `authentication-bypass` `2fa` `cisa-adp`

**CVE-2026-110956** は **WPScan** 割当で、**1.1.8** 未満の asVereinbase WordPress プラグインに影響する。「ユーザーを認証する前に有効なパスワードも真正な第 2 要素も要求せず、**空の保存値を一致と見なす**ため、未認証の攻撃者が管理者を含む任意のユーザーとしてログインできる」。CWE-287。この **9.8 は CVSS 3.1 のメトリクスで、その source は CISA の ADP エンリッチメントコンテナ**であり、WPScan でも NIST でもない。レコードの CNA はスコアを公開しておらず、NVD 上は `Received`。参照は WPScan の脆弱性エントリのみだ。

**Why it matters:** 「空 == 空」を通すフェイルオープンの比較は、最小の欠陥で最大の被害半径を持つ。そして正確に名指しする価値があるのは、その選択肢を提供するあらゆるプラグイン一覧で「2FA 有効」がセキュリティ統制のように読めてしまうからだ。出所が第 2 の教訓になる。source が ADP である `Secondary` メトリクスは第三者による評価を意味するので、ここでの「9.8」は **CISA の**数字だ。典型的な週に公開されるレコードのおよそ 8% を占める、あの種のエンリッチメントであり、それが記述しているプラグインのベンダーに帰属させてはならない数字である。

[`🔗 CVE-2026-110956 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-110956) · [`🔗 WPScan 脆弱性エントリ`](https://wpscan.com/vulnerability/95501052-9f20-4391-9171-184cd2e4a445/)

---

## 16. 「2025 年製 Samsung TV で root シェル」は 465 ポイントのスクリーンショット投稿で、パッチを当てるものは何もない

- **Velocity:** ▮▮ rising
- **Source:** X (@log4j) / Hacker News · 465 pts · 約 1 日前 (~13:49 UTC+8 10-24)
- **Tags:** `tizen` `smart-tv` `unverified` `privacy` `disclosure`

**@log4j** 名義の研究者は、2025 年製 Samsung TV のファームウェアが AES で暗号化され、鍵は UART/JTAG でしか取れないと述べ、逆解析ではなくゼロデイを攻撃して root シェルを得たと主張している。スクリーンショットには Mac からの netcat セッション、`df -h`、`/dev/root`、そしてネットワーク越しに吸い出したパーティションの完全ダンプが写っている。投稿はさらに root 後に存在したというものを列挙する。`security-policy.xml` 内の `csapi-tv-service-alwaysonvoice` というサービス、自動コンテンツ認識（ACR）、地理位置情報、ネットワークマッピング、ターゲティング広告サービス、そして 4 つの DRM サービスで、データは「samsung とその 400 のパートナー」へ渡るという。

**Why it matters:** **writeup も CVE / SVE も、影響機種一覧も、開示タイムラインも、Samsung の回答もない** — 投稿自体が「記事を書くべきか」で終わっている。ポリシーファイルに `alwaysonvoice` というサービスがあることは、そのサービスが存在することを示すだけで、録音や送信をしていることの証明にはならない。そしてそのどちらから「リビングを録音している」への飛躍は、研究者ではなく報道がやっている。これは 10 月 24 日の Hexacon の型の再演だ。デモがティーザー投稿でトップページに届き、正しいエントリは能力ではなく証拠の欠落を名指しするものになる。

[`🔗 HN での議論（465 ポイント）`](https://news.ycombinator.com/item?id=50218633) · [`🔗 @log4j の投稿`](https://twitter.com/log4j/status/2113014142600953868)

---

## 17. gpu-unlock はカーネルモジュールで RTX 30 系の FP/BF16 発行レートを倍にする — そして効かない場所も公開している

- **Velocity:** ▮▮ rising
- **Source:** GitHub (Zagitta/gpu-unlock) / Hacker News · 130 pts · **2,472★** · 2026-10-18 作成
- **Tags:** `nvidia` `bf16` `kernel-module` `gemm` `consumer-gpu`

**gpu-unlock** は Linux カーネルモジュールで、速度セレクタレジスタ（`SS0 0x88888888`、IMLA4 用の 4 ビット `SS1 0x8`）を書き込み、**未改造の NVIDIA ドライバがカードをバインドする前に**ファンクションレベルリセットを実行する。そのためドライバのリリースごとにパッチを当て直す必要がない。450 W の 3090 Ti で 5 回サンプルの中央値: **BF16 87.50 → 157.41 TFLOPS**、FP16 **87.46 → 118.39**、TF32 **42.58 → 82.61**。GA102/GA104/GA106 のカード別報告は BF16 GEMM で **+25% から +81%** にわたる。

**Why it matters:** この README は「負の半分も公開する」の手本だ。利得は「各報告自身のベンチマークによる密な GEMM スループットであり、直接比較はできない」。電力上限が支配的で（最小の +25% は 225 W のカード）、一覧には**アンロックは完了するが BF16 は半分のレートのまま**という OEM 3080 Ti 20 GB も載っている。**LLM の decode と INT8 の作業はほぼ変わらない**（decode は帯域律速）。そして出力を比較した報告では結果は**ビット単位で同一**だった。最後の点が価値の核心だ。数値を変えずにスループットを変えるレジスタレベルのアンロックは、オーバークロックとは別種の主張であり、ドライバより先に走るタイミングがドライバ更新を生き延びる理由でもある。

[`🔗 Zagitta/gpu-unlock`](https://github.com/Zagitta/gpu-unlock) · [`🔗 3090 Ti ベンチマークのスレッド`](https://github.com/Zagitta/gpu-unlock/issues/1) · [`🔗 HN での議論`](https://news.ycombinator.com/item?id=50219700)

---

## 18. Microduck: 800 グラムの二足歩行ロボット、その脳は公開リポジトリと 50 Hz のループと 15 個のサーボ

- **Velocity:** ▮▮ rising
- **Source:** GitHub (pollen-robotics/microduck) · **10,870★** · Apache-2.0 · pushed 2026-10-24
- **Tags:** `robotics` `reinforcement-learning` `rust` `sim2real` `onnx`

Pollen Robotics は Microduck の**脳**をオープンソース化した。約 **25 cm、800 g** で、**Rockchip RK3566** 上でいくつかのデーモンが動く。**15 個のサーボを駆動する 50 Hz の制御ループ**をニューラル方策から回し、無線とカメラ、そしてロボットを文鎮化せずに新ソフトを配るための更新機構を備える。方策は姉妹リポジトリ **microduck_rl** にあり、MuJoCo と PPO、sim2real のレシピ、そして本リポジトリが読み込む ONNX エクスポートがある。**Apache-2.0、10,870 スター、1,397 フォーク**、本日も push あり。

**Why it matters:** ロボットのランタイムと方策訓練を 2 つのリポジトリに分け、エクスポート形式をインターフェースにしたことが最も真似しやすい部分だ。歩く脳と転がる脳が交換可能な ONNX ファイルになるということで、「車輪を付けてローラーモードを頼む」が含意するのはまさにそれだ。正直な境界は商業的なものだ。このリポジトリは買ったハードウェアのソフトウェアであり、ここでのオープンさは開発者向けの面であって自作できるロボットではない。README 自身の一覧 — サーボ、デーモン、更新経路 — が、再現しようとする人のチェックリストになる。

[`🔗 pollen-robotics/microduck`](https://github.com/pollen-robotics/microduck) · [`🔗 microduck_rl（訓練）`](https://github.com/pollen-robotics/microduck_rl) · [`🔗 Pollen Robotics`](https://pollen-robotics.com/microduck)

---

## 19. TornadoVM 7.3 は JNI を捨てて Foreign Function & Memory API へ — 1 本のコード経路が JDK 21 から 27 までを覆う

- **Velocity:** ▮ steady
- **Source:** InfoQ / GitHub (beehive-lab/TornadoVM) · 74 pts · 約 1 日前
- **Tags:** `java` `gpu` `panama` `cuda` `tornadovm`

Java のループを GPU へオフロードする異種計算フレームワーク TornadoVM が **7.3** を出した。バックエンドは JNI ではなく **Foreign Function & Memory API** を使い、実験的な **JVMCI 依存は削除**され、コンパイラのメタデータは「リフレクション + ASM + Unsafe 層」から取得して **JDK 21、25、26、27 にまたがる 1 本の経路**を与える。CUDA バックエンドには **TileContext 経由の cuTile**、**TaskGraph からの cuBLAS と CUTLASS の直接呼び出し**、JIT/CUDA ハイブリッド実行、Apple MXL 対応、マルチ GPU 実行が加わった。併せて **jitLLM v2.0** が単一 JAR の Java 推論エンジンとして登場し、llama.cpp と Ollama に対抗する位置づけだ。

**Why it matters:** JNI から Panama への移行が実質的な一歩だ。JDK ごとのネイティブ糊を排除し、「あなたの JVM で動く」をサポート表ではなく性質にした。長命なプロジェクトがその約束を README ではなくコードに置いた最初のバージョンである。限界は利得と同じ場所に書かれている。単純なアノテーション並列 API は「長期的には生産性能に不十分であることが判明した」のであり、kernel-context と TileContext API はそのために存在する。簡単な道はデモの道で、本物の道はメモリ階層を知っていることを要求する。

[`🔗 InfoQ — TornadoVM 7`](https://www.infoq.com/news/2026/10/tornadovm-7-gpu/) · [`🔗 beehive-lab/TornadoVM`](https://github.com/beehive-lab/TornadoVM)

---

## 20. 15 万ドルの Looker を HTML の束で置き換える: 構築 8,300 ドル、週次利用者 23 → 136、途中に「大きな XSS 穴」も

- **Velocity:** ▮▮ rising
- **Source:** david.lequin.dev / Hacker News · 131 pts · 約 1 日前 (~01:15 UTC+8 10-25)
- **Tags:** `bi` `dashboards` `internal-tools` `snowflake` `cost`

あるデータプラットフォームチームが、**約 300 シート・年 15 万ドルの Looker 配備**を、AI 生成の HTML ダッシュボードをホストして配信する社内システムで置き換えた。ファイルは S3、Kubernetes/Terraform/Helm、SSO、そして **Snowflake OAuth によりすべてのクエリが閲覧者自身の ID で実行される**。加えて別オリジンのサンドボックス iframe、厳格な CSP、ダッシュボードとシェルの間の `postMessage`、短命なコンテンツトークン、非同期のメタデータスキャン。3 名のエンジニアが**約 8 か月、片手間で**作り、構築費は **約 8,300 ドル**（Claude のトークンと AWS）。同期間の Looker は約 10 万ドル、定常費用は**年約 2 万ドル**。週次利用者は**3 月の 23 から 6 月に 136**へ増え、Looker の到達範囲に並び、Looker の利用は 3 分の 1 減った。ダッシュボード 1 枚あたり約 100 万トークン、Opus 5.5 で**約 0.50 ドル**（以前は 2.50 ドル）。

**Why it matters:** この記事の信頼性は、読者に飛ばさせない 2 つのコストにある。**3 名のエンジニアの時間が最大の未計測項目**であり、しかも既存のプラットフォーム業務に分散している。専任チームにすれば ROI の算術はまるごと変わる。そして初期版は構造的に安全でなかった。同一オリジンの JavaScript、権限なし、つまり「大きな XSS 穴」で、実データを載せるには大幅な作り直しが必要だった。著者はまた、今日始めるチームならまず Claude Dashboards を評価するだろうと認め、自建ての根拠はすでに堅実なプラットフォームチームがあることに依るとしている。

[`🔗 david.lequin.dev`](https://david.lequin.dev/blog/bi-software-is-dead/) · [`🔗 HN での議論`](https://news.ycombinator.com/item?id=50212320)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-10-24T20:17:50Z |
| Items | 20 |
| Sources tracked | 26 (Hacker News、GitHub Trending、Hugging Face、arXiv、NVD、CISA KEV、CVE Program、ロイター、InfoQ、ベンダーブログ、エンジニアリングブログ) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8（1 日 3 回） |
| Ranking | 速度加重（新しさ × エンゲージメント加速度 × 情報源の権威） |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[前日](2026-10-24.md) · [生の .md](2026-10-25.md) · [アーカイブ](../archive/)
