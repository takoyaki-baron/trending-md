---
date: 2026-10-25
updated: 2026-10-25T04:15:42Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 30
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

## 21. 「私のビットコインを盗んでみろ」— PHP 8.4.26 が動くサーバに 502 ドル、PHP RCE の反証可能なテストとして

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News (Show HN) · 434 pts · 約 8 時間前 (~04:30 UTC+8 10-25)
- **Tags:** `php` `rce` `challenge` `security-research` `disclosure`

**「Steal My Bitcoin」** と題した Show HN の投稿は、約 **502 ドル**相当のビットコイン鍵をサーバに置き、誰でも取りに来いと誘う。動機はスレッドにある —— 「ここ数日パニックになっていたあの **PHP RCE** を、実際にどう使うのか突き止めた人がいるのか知りたかった」。スレッドに転載されたページ文面は、鍵が「`print-flag` バイナリを通じて **PHP ユーザーアカウント**から到達可能」と述べ、取得時点で **「0.65 hours without a successful hack」**（0.65 時間、突破者なし）というカウンタを表示していた。コメントによれば標的は **nginx 背後の PHP 8.4.26** で、**リクエストボディ上限 1 MB**。

**Why it matters:** これは PHP の 9.2（CVE-2026-109618 / CVE-2026-109619）の開示には無かった反証可能性の一手だ。悪用可能性を論争する代わりに、間違っていた場合に金銭的コストが発生し、カウンタが公開される。ただし注意が 2 つ付く。我々がサイトを直接読もうとした時点で**過負荷だった**ため、ここでの挑戦文は著者がスレッドに投稿した副本であり一次読解ではない。そして少なくとも 1 人のコメント者が、見えたページは**静的なままで PHP のエントリポイントが無い**と指摘している —— それならサーバはテスト対象のクラスに免疫があるのであって、悪用不可能の証明にはならない。期限付きの懸賞が示すのは「0.65 時間で誰もできなかった」ことであり、「不可能」ではない。

[`🔗 HN での議論 (434 pts)`](https://news.ycombinator.com/item?id=50224916) · [`🔗 stealmybitcoin.com`](https://stealmybitcoin.com/)

---

## 22. Goose: ヒープも GC もライフタイム注釈も無いシステム言語 — 人間が設計し、Claude Fable が実装した

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News / aardappel.github.io · 289 pts · 約 9 時間前 (~03:06 UTC+8 10-25)
- **Tags:** `programming-languages` `compilers` `ai-authored` `memory-management` `c`

**Goose** は **Wouter van Oortmerssen**（Lobster や wasm3 系の作者）による新しいシステム言語で、メモリモデルが独特だ。「ヒープアロケータもガベージコレクタもライフタイム注釈も無い」。値はコンパイラが割り当てたデータスタック上にインラインで置かれ、成長はポインタを進めるだけで、スコープを抜けるとスタックトップを戻して回収する。各スタックで伸長可能な値は高々 1 つを先頭に置くため、成長時に再配置も容量チェックも起きない。伸長のみの配列への参照はその後の push を跨いでも有効で、コンパイラが参照のライフタイムを推論し、所有者より長生きしうる参照を拒否する。出力は **C**、`extern fn` で C を呼び、ライセンスは **Apache-2.0**。

**Why it matters:** 本題は素性の書き方だ。クレジットは 2 行に分かれている —— 「Wouter van Oortmerssen: 言語設計、コンパイラ設計、コーディング標準」と「**Claude Fable: コンパイラ実装、ベンチマーク、サンプルとドキュメントの執筆**」。ページには「このリポジトリはほぼ全面的に AI で作られ、人間が言語設計を与えた」とある。つまりベンチマーク表は**コンパイラを書いたのと同じモデルによる自己評価**だ。「16 のベンチマークで Goose は慣用的 C++ の **3.3 倍**速い」、手作業最適化 C++ の 1.16 倍、最良の安全 Rust の 1.12 倍、メモリは 1.9/1.3/1.2 分の 1。ページ自身が「ベンチマークには負けた数値も含めて数字がある」と述べる。列挙された制約はバグではなく設計上の境界だ。再帰関数は呼び出しを跨いで伸長可能データを保持できず、可変長要素の配列は反復できるが索引できず、クロージャは脱出できず、関数ポインタは無く、プログラム全体のコンパイルが前提になる。言語設計を人間の貢献、数値を第三者未検証の主張として読むべきだ。

[`🔗 Goose`](https://aardappel.github.io/goose/) · [`🔗 HN での議論`](https://news.ycombinator.com/item?id=50224100)

---

## 23. 「純粋関数型はどこまで C に近づけるか」— 144 ベンチマークで M1 は 2.6% 遅く、Ryzen は 8.9% 遅い

- **Velocity:** ▮▮▮ trending
- **Source:** rtfeldman.com / Hacker News · 260 pts · 約 24 時間前 (~11:43 UTC+8 10-24)
- **Tags:** `roc` `deflate` `benchmarks` `performance` `memory-safety`

Richard Feldman は、Niclas Ahden による純 Roc 実装の DEFLATE、**roc-deflate** を最適化し、**Silesia コーパス**で C の **libdeflate** と比較した。両側とも非ストリーミング API を使い、出力がバイト単位で一致することを検証している。**144 ベンチマーク**で、Roc は平均して **M1 MacBook Pro で 2.6% 遅く**、**Ryzen 9 3900X で 8.9% 遅い**。最悪の入力で約 **18% 遅く**、最良では「**18%** をわずかに超えて速い」。

**Why it matters:** 著者は記事の大半を、自分のデータが支えうる見出しに**反対する**ために使っている。1 つのパッケージでは Roc が一般に C へどれだけ近いかは言えない。C の天井が高いのは Roc がメモリ安全性、自動参照カウント、境界チェックを強制し unsafe の逃げ道が無いからであり、roc-deflate にはストリーミング API が無く、x64 には「改善の余地」があり、最良ケースは平均利得ではない。この最後の区別がベンチマークとマーケティングを分ける —— 幾何平均が結論であり、18% 速い切片は平均がすでに織り込んだ例外だ。

[`🔗 rtfeldman.com — FP vs C`](https://rtfeldman.com/fp-vs-c) · [`🔗 HN での議論`](https://news.ycombinator.com/item?id=50218195)

---

## 24. Dan Luu はコストモデルが変わりソフトウェアはもっと野心的であるべきだと論じる — 反論も記事の中に置いて

- **Velocity:** ▮▮ rising
- **Source:** danluu.com / Hacker News · 259 pts · 約 6 時間前 (~05:47 UTC+8 10-25)
- **Tags:** `software-engineering` `ai-assisted` `maintainability` `essay` `verification`

Dan Luu の記事は、作り手がいまだ「エージェント以前のコストモデル」で動いており、AI 支援が算術を変えたのに「時間をかける価値が無い」とプロジェクトを切り捨てていると論じる。通しの例は **pgrust** —— Michael Malis による Postgres の Rust 書き換え —— で、差分テストが実際に Postgres のバグ（SP-GiST、JSONPath キャッシュ、pgcrypto、辞書ローダのメモリ安全性、money のオーバーフロー）を掘り起こした。書き換えが失敗しても価値は残る。自身の証拠として、調整可能な正規表現エンジン、より速い ripgrep フォーク、そして**コールドコンパイルで 50 倍、ウォーム/キャッシュ済みビルドで 2 倍**だと本人が言う Rust インタプリタを挙げ、いずれも 1 年以上ではなく数時間で作れたという。

**Why it matters:** 記事は反対意見を埋めずに招き入れる。Luu は **Yossi Kreinin** の反論を引く —— ほとんどの人は AI 製ソフトウェアに対してむしろ**野心を下げるべき**だ。多くの問題には合否の基準が無く、人は大きなブラックボックスを推論できない。Kreinin の助言は「身を隠せ」。Luu はまた、AI による書き換えの大半は「vibeslop」だと認め、**pgrust の ClickHouse ベンチマーク提出は早すぎた**（ただし不正告発は誤りだと述べる）とし、同じ仕事を新しい道具でやるだけではアムダールの法則が利得を制限すると認め、記事を急いで書き通常のベンチマーク厳密さを欠くと断る。持ち帰るべき主張は狭い。いま重要な差は、モデルが**実装**できるものと、人が手取り足取り無しに**検証**できるものの差だ。

[`🔗 danluu.com — 野心的なソフトウェア`](https://danluu.com/ambitious/) · [`🔗 HN での議論`](https://news.ycombinator.com/item?id=50225695)

---

## 25. Cerebras は 3 兆パラメータの Kimi K3 を 59 枚のウェハでどう供給するかを示す — 決着をつける数字は出さない

- **Velocity:** ▮▮ rising
- **Source:** Cerebras Blog / Hacker News · 32 pts · 約 2.5 時間前 (~09:33 UTC+8 10-25)
- **Tags:** `cerebras` `inference` `kimi-k3` `wafer-scale` `memory`

Cerebras は **Kimi K3**（約 3 兆パラメータのオープンモデル）の配備設計を公開した。**59 枚の WSE-3T ウェハ**にわたり、**69 層の線形注意**に 35 枚（1 枚 2 層）、**24 層の稠密層**に 24 枚（1 枚 1 層＋KV キャッシュ領域）。各ウェハは **44 GB** のオンチップ SRAM を持ち、4 bit 重み・8 bit KV キャッシュ、平均 256k トークン要求という前提。重みはオンチップに留まり、ウェハ間を渡るのは活性化のみで、RDMA で 1 ホップ約 **2 マイクロ秒**。パイプライン各段は別要求を並行処理する。対外主張は数兆パラメータ級で **「1000–2000+ tokens per second」**。

**Why it matters:** 記事は見出しより慎重だ —— ただし本項目が最初に負わせた言葉ではなく。記事が書くのは「**illustrative**（例示的）な例」であり、ページに「end-to-end」という語は**一度も現れない**。したがって先に引いた「実測のエンドツーエンド基準ではない」はこちらの言葉であって Cerebras のものではない。実測遅延も**トークン毎秒毎メガワット**も示さない —— その一方で「同一の出力生成速度で測った場合の」tokens/s/MW こそ有意な指標だと書く。並行性は稠密層ウェハの KV キャッシュ容量で上限が決まり、マイクロバッチサイズは要求あたり速度と総スループットのトレードオフで、脚注は結果が「ワークロード、構成、日付、試験したモデルにより変わりうる」と断る。メモリ律速という wafer-scale 推論の論拠は本物だが、この記事は測定ではなく見積書だ。

> *2026-10-25 12:16 訂正：本項目は当初「例示的な構成であり、実測のエンドツーエンド基準ではない」と引用していた。その文は原文に存在しない —— ページの 184 KB のペイロードに「end-to-end」は 0 回。分析は変えず、引用を原文の表現に置き換えた。*

[`🔗 Cerebras — 兆パラメータの配備`](https://www.cerebras.ai/blog/how-we-deploy-trillion-parameter-frontier-models-on-cerebras) · [`🔗 HN での議論`](https://news.ycombinator.com/item?id=50227356)

---

## 26. Unitree Go2 に 9.6 — `gpt_thread.py` の `set_volume` がシェルコマンドを実行、修正はファームウェア 1.1.11.5

- **Velocity:** ▮▮ rising
- **Source:** CVE Program (cveawg) / VulDB · CVSS 3.1 9.6、CVSS 4.0 9.4 · 公開 2026-10-24
- **Tags:** `cve` `robotics` `unitree` `command-injection` `firmware`

**CVE-2026-115995** は **VulDB** 割当で、**Unitree Go2** の **1.1.11.4** までに影響する。「影響を受けるのはコンポーネント `chat_go` のファイル `gpt_thread.py` の関数 `set_volume`。引数 Value の操作が **OS コマンドインジェクション**を招く」。攻撃元はネットワーク、権限不要、ユーザー操作要、スコープ変更 —— **CVSS 3.1 で 9.6**、**CVSS 4.0 で 9.4**、CVSS 2.0 指標では **10.0**。いずれも CNA の値。CWE-78。**1.1.11.5** で修正され、記録にはベンダー確認が逐語で載る —— 「提出 990502 は当社の内部チケット **#474**（Go2 `chat_go` `set_volume` OS コマンドインジェクション、CWE-78）に相当する」。

**Why it matters:** 四足歩行ロボットの音声アシスタントのスレッドはシェルであり、音量パラメータを運ぶ引数が注入点になる。これは消費者向けロボットの安全保障に繰り返し現れる形だ —— LLM に近い便利機能が特権ホストプロセスに結び付いている。スコアには来歴の注記が 2 つ付く。3 つの CVSS はすべて **CNA 自身**の値で、NVD は記録を `Received` のままとし NIST の指標は無い。影響範囲は 5 つの点バージョンの明示リスト（**1.1.11.0–1.1.11.4**）で **1.1.11.5** を影響なしとしており、`lessThan` ではなく列挙だ。ファームウェア成果物が記録からリンクされているため、「修正済み」は約束ではなくダウンロードで確認できる。

[`🔗 CVE-2026-115995 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-115995) · [`🔗 NVD レコード（API）`](https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-115995)

---

## 27. MongoDB Compass は eMudhra 中間証明書を Electron 自身のルートストアに抱えている — 修正は同梱ランタイムの更新

- **Velocity:** ▮▮ rising
- **Source:** CVE Program (cveawg) / Compass リリースノート · CVSS 4.0 7.6 · 修正 2026-10-23
- **Tags:** `cve` `emudhra` `electron` `trust-store` `tls`

**CVE-2026-115929**（割当は **MongoDB**）は 1 文で問題を述べる。「MongoDB Compass は Electron に依存しており、この第三者ランタイムは**独自の TLS ルート証明書ストア**を持つ。そのルート証明書ストアに、復元可能な eMudhra 中間 CA 証明書が含まれている」。**Compass 1.53.1** で解決し、同版は **Electron 44.9.1** を同梱する。そのリリースは **2026-10-23T17:23Z** に公開され、変更履歴の該当行は「セキュリティ問題に対処するため Electron を更新」の一行だけ。CWE-295。スコアは CNA のもので、**CVSS 4.0 で 7.6**、3.1 で 6.8。影響範囲は**最小値なし**（`version: "0"`）から 1.53.1 未満。NVD は記録を `Received` とし NIST 指標を持たない。

**Why it matters:** これは eMudhra の余波のうち、ブラウザのリリースでは消えない半分だ。Mozilla の説明では、10 月 17 日の報告から**3 時間以内**に侵害された 8 つの中間証明書を **OneCRL** に反映し、署名ルートを **NSS 3.131.1** で除去した。だが OneCRL が届くのは *Firefox* であり、独自ストアを同梱する Electron アプリはそれを消費しない。だから固定バンドルを内包するデスクトップアプリはそれぞれ更新を出す必要があり、この CVE が存在する理由でもある —— 「CA をトラストストアから外す」は成果物ごとの作業で、ここでの成果物はアプリのリリースであり OS 更新ではない。緩和は種（ブラウザ対ライブラリ）ではなく**信頼の供給元**（OS/ベンダーストア対固定バンドル）で分かれる。両方が更新されるまで、ホスト側と同梱側の主張は一致しない。

[`🔗 CVE-2026-115929 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-115929) · [`🔗 Compass v1.53.1 リリース`](https://github.com/mongodb-js/compass/releases/tag/v1.53.1) · [`🔗 eMudhra 侵害についての Mozilla`](https://blog.mozilla.org/security/2026/10/20/protecting-firefox-users-following-the-compromise-of-emudhra-intermediate-certificates/)

---

## 28. OPAL はコーディングエージェントを 1 回の学習に入れ、最適化器を書き換えさせる — −11.6 に対し最良の静的レシピは −2.2

- **Velocity:** ▮▮ rising
- **Source:** xingjianbai.com / GitHub (xingjian-bai/opal) · 22 pts · 投稿 2026-10-21
- **Tags:** `optimizers` `agents` `training` `pytorch` `research`

**OPAL**（「OPtimizer with an Agent in the Loop」）は PyTorch のラッパで、2 つの小さなプログラムをコーディングエージェントに渡す —— 見たい統計を取る `analysis.py` と、勾配を更新に変える `updater.py` —— そして**学習中に**どちらもパラメータ群ごとに書き換えさせる。損失スパイク、停滞、過学習に反応する。実行間で何も持ち越さない。報告結果は、**LightningDiT-XL/1 の FID-50K が 2.18 → 1.83**（guidance あり。なしでは 5.15 → 4.33）、Goldfish アムハラ語が **83.48 → 81.11** ビット/文、玩具ランドスケープでは平均 **−11.6** に対し、手で選んだ 12 の静的レシピの最良が **−2.2**、**382,080** の掃引レシピの最良が **−7.4**。ラベルの 10% が誤りのとき、テスト損失 0.69／精度 78.6% 対 AdamW の 2.49／73.5%。

**Why it matters:** 工学は注意書きの側にある。エージェントを待たせると **1.30×–4.39× の実時間オーバーヘッド**が乗り、非同期更新で **1.01×–1.14×** に下がる。実装はシャード学習と最適化器コンパイルに「なお改善が必要」で、実行が短くレシピが調整済みだと利得は縮み、**大半の実験は 1 回だけ**実行された。著者らは FLOP で見ればフロンティア規模では非現実的だと認め、コスト論を API トークン対 GPU 時間で組み立てる（トークン $6.42 に対し H100 約 74 時間 ≒ 510 ドル）。リポジトリのもう一行は結果と同等に扱うべきだ —— エージェントのプログラムは「学習プロセスの中で動くので、これは規則であってサンドボックスではない」。モデル・データ・損失に触れないという制約は、隔離ではなく指示で担保されている。

[`🔗 Reactive Optimizers（ブログ）`](https://xingjianbai.com/reactive-optimizers/) · [`🔗 xingjian-bai/opal`](https://github.com/xingjian-bai/opal)

---

## 29. OpenDS: 生きたウェブ上の深い検索タスク 200 件、最良のフロンティアエージェントが 39.0%、人間は 1,000 回で 21.1%

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.30181 / Hugging Face Papers · 160 票 · 2026 年 10 月投稿
- **Tags:** `benchmark` `deep-research` `web-agents` `tool-use` `evaluation`

**OpenDS** は、**開かれた生きたウェブ**を複数ステップで検索しないと答えられない問いをエージェントに課す —— 複数モダリティ、複数ファイル形式、対話的閲覧 —— そして単一の事実回答を返させる。**OpenDS-World** は **200 タスク**の公開セットで、証拠は人手で検証され、各タスクに一意の答えがある。12 のフロンティアモデルが**同一のツール構成**で走った。最良は **39.0% の正答率**、人間は **1,000 回**の試行で **21.1%**（約 211 成功）。

**Why it matters:** 生きたウェブ上のベンチマークは再現性と引き換えに現実性を得る。論文は壊れている点を率直に挙げる —— 「ツール調整と長距離の検索管理」、そして調査戦略、検索コスト、停止の判断、失敗からの復帰における大きなばらつき。人間の基準値も正しく読むべきだ。21.1% は**難しく作られた**タスクでの人の正答率であり、有用な比較は「エージェントが人間を超えた」ではなく「この集合は誰にとっても天井が低い」である。だからこそ 39.0% という首位が飽和ではなく情報になる。

[`🔗 arXiv 2610.30181`](https://arxiv.org/abs/2610.30181) · [`🔗 Hugging Face Papers`](https://huggingface.co/papers/2610.30181)

---

## 30. claude-howto: 第三者の Claude Code 教材が 44,652 スター — そして README 自身のバージョン番号が食い違う

- **Velocity:** ▮▮ rising
- **Source:** GitHub (luongnv89/claude-howto) · **44,652★** · 本日 +392 · MIT
- **Tags:** `claude-code` `documentation` `tutorial` `mcp` `skills`

**claude-howto** は非公式の例示駆動ガイドで、10 の番号付きモジュール（スラッシュコマンド、メモリ、スキル、サブエージェント、MCP、フック、プラグイン、チェックポイント、高度な機能、CLI）、コピペ用テンプレート、Mermaid 図、クイズ、ベトナム語・中国語・ウクライナ語・日本語の翻訳を含む。**44,652 スター、5,496 フォーク、未処理 issue 40、MIT**、作成 **2025-11-07**、最終 push **2026-10-20**。**+392** で、本日のデイリー盤でもっとも伸びているリポジトリの一つ。

**Why it matters:** このリポジトリの長所と弱みは同じ性質だ —— Anthropic が頻繁に変える表面を映す、動きの速い第三者ミラーであること。README は「最終更新: 2026 年 10 月 18 日」、**Claude Code 2.1.302** 対応と書き、モデル互換性の一覧は内部で一致しない（FAQ とフッターで挙げるモデル群が異なる）。スター数より大事な運用上の詳細が 2 つある。インストール手順は **npm 導入を非推奨**とし、ネイティブインストーラ、Homebrew、WinGet を勧め、ダウンロード元は `downloads.claude.ai` で企業プロキシが許可する必要がある。そしてリポジトリは「マーケットプレイスを同梱しない」ため `/plugin install` は使えず、`claude --plugin-dir` が経路になる。これほど普及したガイドは事実上の入門ドキュメントであり、バージョン表記は日付付きの主張として扱い、事実とはみなさないこと。

[`🔗 luongnv89/claude-howto`](https://github.com/luongnv89/claude-howto) · [`🔗 GitHub Trending`](https://github.com/trending?since=daily)

---

## 31. Corgi: エージェント優先で作られた端末マルチプレクサ、`top` 風ビューでトークン会計

- **Velocity:** ▮▮ rising
- **Source:** Hacker News (Show HN) / corgi.computer · 126 pts · 約 1.3 日前 (~03:46 UTC+8 10-24)
- **Tags:** `agents` `terminal` `multiplexer` `claude-code` `worktrees`

**Corgi** はコーディングエージェントを一級のペインとして扱う端末マルチプレクサだ。1 つの画面で各エージェントの状態（**working / needs you / finished / idle**）を示し、F1 で要約、`top` 風の画面が**エージェント別のトークン会計**を表示し、ホバーで活動の詳細が出る。**既存のアカウント**で Claude Code、Codex、Pi、OpenCode を動かし、tmux のようにプロセスをバックグラウンドで維持する。さらにエージェント向けの機能を足す —— 作業のリプレイ、変更した全ファイルを 1 スクロールで確認、**worktree** の管理、ワークスペースの自動整理、ワークスペース別のリソース監視。導入は 1 行のシェルコマンドで **macOS、Linux、WSL** に対応し、`corgi --skill` でエージェント自身がマルチプレクサを操作する方法を学べる。

**Why it matters:** これは tmux の座を別の主体が埋め直す動きだ —— 操作者自身が。開発者あたりの同時エージェント数が増えると、希少資源は**注意力の routing**（いま人間を必要とするのはどれか）と**支出の可視性**（どのエージェントがトークンを焼いているか）になり、どちらも素の端末マルチプレクサでは表現できない。宣言された制約は正直で具体的だ。macOS/Linux/WSL のみ、そして画像系の機能（⌘V での貼り付け、SSH 越しを含む）は「**Ghostty Nightly**」を要求する —— 未リリースの端末ビルドへの依存は、日常の主力にできるかを決める種類の制約だ。

[`🔗 corgi.computer`](https://corgi.computer/) · [`🔗 HN での議論`](https://news.ycombinator.com/item?id=50214373)

---

## 32. LogSync: 4 × 2 mm の埋植チップが 200 µW 未満で脳状態を分類する

- **Velocity:** ▮▮ rising
- **Source:** EPFL / Hacker News · 97 pts · 約 12 時間前 (~23:57 UTC+8 10-24)
- **Tags:** `neural-interface` `low-power` `biomarkers` `epfl` `hardware`

EPFL の Integrated Neurotechnologies Lab（Mahsa Shoaran 氏のグループ）は **LogSync** を作った。約 **4 × 2 ミリ**の埋植型ニューラル SoC で、単一チャネルの特徴だけでなく、脳波の強さと**領域間の同期性**というネットワーク水準のバイオマーカーを抽出する。機械学習の分類器がそれを認知・情動状態に結び付け、選んだ状態を検出すると**刺激トリガ**を出せる。対数領域の計算を使い、消費電力は **200 マイクロワット未満**。検証には既存の**ヒト精神科記録**を用い、神経信号のみから暗算課題中の認知的関与と動画視聴中の情動覚醒を区別した。ミネソタ大学のラットでは進行中の振動を追跡し、所定の位相で刺激を与えた。

**Why it matters:** 設計を形づくった制約こそが要点だ —— 領域間の同期性は通常、埋植体が払える電力より高くつき、対数領域計算がそれを予算内に収める手段になる。だが証拠は初期段階で、記事もそう書く。ヒトの検証は**新たに埋植した患者ではなく既存データセット**で、位相固定刺激は**動物**で示された。つまりこれは「200 µW で何が計算できるか」というハードウェアの結果（後ろ向きのヒトデータ付き）であり、閉ループ治療の結果ではない。「情動覚醒を検出する」が人に効くデバイスを指すのか、録音に効く分類器を指すのかを決めるのはこの区別だ。

[`🔗 EPFL — LogSync`](https://actu.epfl.ch/news/neural-chip-decodes-interactions-between-brain-r-2/) · [`🔗 HN での議論`](https://news.ycombinator.com/item?id=50222525)

---

## 33. CVE-2022-22706 を使い回す TCL Android TV の root ツールキット — どのファームで検証したかを明記して

- **Velocity:** ▮ steady
- **Source:** GitLab (c4psu13/mali-pagecache-root) / Hacker News · 52 pts · 約 17 時間前 (~18:51 UTC+8 10-24)
- **Tags:** `android-tv` `mali` `cve-2022-22706` `root` `disclosure`

**mali-pagecache-root** は**1 台のテレビ**向けの完全な root 連鎖だ —— **TCL 50C721**（Realtek **RTD1319**、Mali-G31、ファーム **V8-R51MT02-LF1V903**、Android 11、カーネル 4.14.198）。自動化バイナリは非特権アプリの文脈から 2 秒未満で `uid=0` を得る。libc の `__cxa_atexit` のページを `MAP_SHARED` で GPU ユーザーバッファとして取り込み（**CVE-2022-22706**）、`mremap(MREMAP_FIXED)` でファイルマッピングを差し替え、**112 バイトの Thumb-2 シェルコード**を**ページキャッシュ**に書く —— ディスク上のバイトは変えないので dm-verity は通る。続いて特権ドメインが `/dev/rtkmem` 経由で物理ページをマップし `selinux_state.enforcing = 0` にする。連鎖は `task_struct` を辿り `cred` を上書き、`TIF_SECCOMP` を消して zygote の BPF フィルタを抜け、広告ブロックの hosts を bind mount し 28 個のプリインストールアプリを無効化する。**MIT**、記録された検証機は 1 台。

**Why it matters:** リリースノートはデバイス向けエクスプロイトの範囲設定の模範だ —— 「ファーム固有の研究とツールであり、**汎用の TCL root ツールではない**」、実際に動かしたビルドの表、そして SoC と Mali ドライバの版が「元の記録間で一貫しない」と述べる互換性文書。さらに、リリース準備中に**新たな root 検証は行っていない**こと、APK ラッパを含まないこと、過去に改変した boot/vbmeta イメージの書き込みが 2 回ブートループを招いたことを明記する。より普遍的な教訓は繰り返し現れるものだ —— **CVE-2022-22706 は 2022 年の GPU ページキャッシュのバグで、2026 年になっても市販テレビを root している**。テレビにとってのパッチ境界は 1 度だけ出荷されるファームウェアイメージだからだ。見過ごされたバグでもない。NVD は解析済みで CVSS 3.1 の 7.8 を付けており、**2023-03-30** から CISA の KEV に入っている。

[`🔗 c4psu13/mali-pagecache-root`](https://gitlab.com/c4psu13/mali-pagecache-root) · [`🔗 HN での議論`](https://news.ycombinator.com/item?id=50220042)

---

## 34. Deep Fusion Memory: バックボーンを凍結したチャンク単位のパラメトリック記憶 — そして限界を挙げない要旨

- **Velocity:** ▮ steady
- **Source:** arXiv 2610.25100 / Hugging Face Papers · 48 票 · 2026 年 10 月投稿
- **Tags:** `memory` `parametric` `rag-alternative` `architecture` `llm`

**Deep Fusion Memory（DFM）** は検索を学習済みのチャンク単位記憶で置き換える。因果的記憶予測器が直前の文脈から記憶を生成し、**検索されたチャンク埋め込み**で教師あり学習される。その記憶はチャンク内の全トークンで共有され、**ゲート付き交差注意**で隠れ状態に注入される。バックボーンは**凍結**され、予測器と融合層のみを学習、推論時に**明示的な検索は不要**。学習データ構築は、トークン単位の目標を作る既存のパラメトリック記憶法より「**32 倍少ない検索クエリ**と **2,048 倍少ない検索項目**」で済む。6 つの QA タスクで最強のベースラインを Mistral-7B-v0.3 で **12.71%**、Qwen3-8B-Base で **11.19%** 上回り、ドメイン適応では Qwen3-4B-Base と Qwen3-8B-Base でそれぞれ 6.51 と 4.38 ポイント改善する。

**Why it matters:** バックボーンを凍結する点が、この手法を継続事前学習ではなく検索と比較可能にする設計判断だ —— ベースモデルは変わらないので、差分は重みのドリフトではなく記憶モジュールに帰属できる。注意点は構造的で見落としやすい。**要旨は自手法の限界を一切挙げていない**。RAG の代替として枠付けながら同じコストでの検索ベースラインとの比較が無く、数値はすべて著者自身による 6 タスクの結果だ。検索不要でバックボーン凍結の記憶は生産システムが欲しがる形そのものだが、欠けている比較は、それらのシステムがいま実際に動かしているものとの比較だ。

[`🔗 arXiv 2610.25100`](https://arxiv.org/abs/2610.25100) · [`🔗 Hugging Face Papers`](https://huggingface.co/papers/2610.25100)

---

## 35. 93 ページのレビューがロボットの再帰的自己改善を問う — 再帰に帰属できる利得を分離した研究は無いと結論

- **Velocity:** ▮ steady
- **Source:** arXiv 2610.29677 / Hugging Face Papers · 56 票 · 2026 年 10 月投稿
- **Tags:** `recursive-self-improvement` `robotics` `review` `robot-learning` `evaluation`

**「Toward Recursive Self-Improvement in Physical AI」** は **93 ページ**のレビューで、混同されがちな 2 つを分ける —— ロボットが自分の**振る舞い**を改善することと、振る舞いを生む**手法**を改善すること。振る舞い → 手法 → 手法の改善という経路をマニピュレーション文献に沿って辿り、その文献が示したもの（より良い振る舞い、後続学習への利点、改善された手順、改善者自身の知識やツールを書き換える系）を整理する。

**Why it matters:** 結論は否定的で、しかも著者自身の言葉だ。物理世界の研究は「**再帰に帰属する利得をいまだ分離できていない**」。この一文を残すべき理由は、「自己改善するロボット」という主張が通常、各段階が良くなったパイプラインの上に立ち、再帰的改善と「より良いデータ・より良い監督」を切り分けるアブレーションを持たないからだ。したがって本論文の貢献は**新しい実験ではなく評価指針**であり、改善が持続するための 4 条件が実用的なチェックリストになる —— フィードバックが残る学習ニーズに合っていること、受け手がその変更を使えること、利得がタスクやハードの変化を跨いで有効なこと、継続的な練習が安全で安価なこと。大半のフィジカル AI の改善ループは、まだこの 4 つの篩を通っていない。

[`🔗 arXiv 2610.29677`](https://arxiv.org/abs/2610.29677) · [`🔗 Hugging Face Papers`](https://huggingface.co/papers/2610.29677)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-10-25T04:15:42Z |
| Items | 35 |
| Sources tracked | 30 (Hacker News、GitHub Trending、Hugging Face、arXiv、NVD、CISA KEV、CVE Program、ロイター、InfoQ、EPFL、Cerebras、ベンダーブログ、エンジニアリングブログ) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8（1 日 3 回） |
| Ranking | 速度加重（新しさ × エンゲージメント加速度 × 情報源の権威） |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[前日](2026-10-24.md) · [生の .md](2026-10-25.md) · [アーカイブ](../archive/)
