---
title: プロダクト機能としての「AI なし」
topic: no-ai-default
created: 2026-09-09
---

# プロダクト機能としての「AI なし」（2026 年 9 月）

The Document Foundation の 9/3 投稿（"Yes, no AI is now a feature"、Italo Vignoli）は、AI が LibreOffice にどう
入ってよいかの書かれた検証可能な仕様を定めた：**デフォルトインストールにはいかなる AI も入れない**——どの統合も 6 原則を
満たさないため——ユーザー制御の推論；無断でコンテンツをマシン外へ出さない；テレメトリなし；単一プロバイダロックインなし；
ODF ネイティブ出力；完全に任意/除去可能——加えて「守るべきサブスクリプション階層も、アップセルも、マネタイズできるデータも
ない」、AI を望むユーザーは Ollama・LM Studio・OpenAI 互換エンドポイントに橋渡しするサードパーティ拡張へ誘導。同じ週、
LibreOffice 26.8（8/26 リリース）がプロジェクト史上最多人気の更新に——**1 週間で 100 万超のインストーラ ダウンロード**
（ディストロリポジトリ除く）。

**因果は正直に未確定——そのままであること。** ダウンロード記録の記事（manualdousuario.net、一次読了）は、無 AI スタンスが
数字を押し上げたと「賭ける」のみで（「私は『ノンフィーチャー』に金を賭ける」）「理由は何であれ」と認める；TDF の投稿自体は
ダウンロードに触れず、その基準は「完全な拒絶を意味するものではない」とまで書く。安全に主張できるのは：「デフォルトで AI なし」
が戦えることの最初の**ハードな市場シグナル**、および主要 OSS プロジェクトが公開した初の成文化・検証可能な「AI をどう受け入れるか」
仕様。追うべきパターン：「AI なし」が機能の欠落から明示された原理的なプロダクトポジショニングへ移ること——プラットフォームが
別の側から機能クラスを除去すること（[[platform-gatekeeping]]）の鏡像。

## 2 つ目のデータポイント —— そしてそれ自身の矛盾（09-12）

**Toast**（`paradise-runner/toast`、Go、Show HN 66 pts / 65 コメント）は電池付きターミナル IDE —— LSP の管理インストール、tree-sitter ハイライト、go-to-definition、ripgrep、VSCode テーマインポート —— vim/nvim/emacs の設定負担に対して位置づけられる。比較表には**「no AI features」**と「no telemetry」が明示されている：no-AI が機能表の 1 行として載った —— LibreOffice 仕様の市場対応版。

矛盾はスレッドの中にある：README の事実誤認（vim/Emacs *には*ファイルツリーもマウス対応もある）と残った `yourusername` プレースホルダが指摘され、作者自身がプロジェクトは **AI 生成**だと認めた ——「this project is either built with AI or it's not built」。つまり位置づけは「AI *機能*なし」であって「制作に AI なし」ではない —— この区別はまだストレス試験されておらず、66 pts に 65 コメントという比率が聴衆がリアルタイムで審査していることを示す。

同じ日、**「Ask HN: AI ニュース洪水を制限してくれ？」**が 707 pts に到達 —— no-AI ニッチは雰囲気ではなくオーディエンスだという需要側の合図。ただし両データポイントとも因果も耐久性も示さない：Toast は開発初期のプロジェクトで、矛盾を巡る議論そのものが正直な複雑さ。型は成立：「AI なし」は不在から*主張*へ移った —— そして主張は監査される。出典：
[paradise-runner/toast](https://github.com/paradise-runner/toast) ·
[HN 議論](https://news.ycombinator.com/item?id=49662496)

**Go Concurrency Distilled（2026-09-27）**——Anton Zhiyanov の無料 Go 並行性ミニブック（HN 83 pts）のページに「AI-free」の一文がある：LibreOffice の成文化仕様、Toast のターミナル IDE に続く 3 例目で、*リファレンス/教育資材*では初——ラベルはオフィススイート、開発ツール、学習リソースを横断するように。**10-01 訂正：**ページで唯一の AI 言及は別の著書に係るもので、本書についてではない——「check out my other book — Gist of Go: Concurrency. The book is AI-free.」（feed 記事は本文修正済み en/zh/jp、速度は維持）。成立する読み方：著者は Go 教育材に AI フリーのラベルを貼っているが、逐語のクレームは Gist of Go のもの——そのように引用すること。

**AI 貢献禁止が fork 境界になる（2026-09-28）**——「AI なし」の立場の新しい形：製品ポジショニングではなく*貢献ポリシー*として。FEX-Emu のポリシーは AI 生成コードの貢献を禁止しており、そのため Madeira（x86-64 Windows ゲームを脱獄なし iPhone へ移植する Wine+FEX-Emu+DXMT のプロジェクト）——その fork は AI 支援コードを含む——は貢献者に上流への提出を**しない**よう求めている。コードは fork に流れ込めるが、境界を越えて逆流することはない；「AI なし」がコードの流れる先を決める、上記のポジショニング声明のサプライチェーン版。

**手書きの出自が宣言される属性に（2026-10-01）**——Halfspace（Matt Keeter の距離場ソリッドモデリング IDE。2022年から作っている Fidget カーネルの WebGPU ショーケース。HN 88 pts）は冒頭にこう置く：「2026 年なので、最初に断っておく。**これは vibe coded ではない**。2025 年 4 月から作っていて、コードは私の人間の脳で書いている」。この免責自体が文化的産物：手書きの出自が、ライセンスと同じように作品プロジェクトが宣言する第一級の属性になりつつある——上記の制度的ポジショニングの個人職人版。同日の政策側の companion：**CS240 講師本人の回顧**（turkeyland.net、102 pts）——2026 春の AI 不正試験騒動の中心の C 言語の授業は、あらゆる課題で LLM を使うことを明確に禁じたシラバスを持っていたのに、講師自身が「自分の処置はもっと良いべきだった。それが主因で、明文の方針に違反した者たちが最終的に負ったのはほとんどゼロ、あるいはまったくゼロの結果だった」と認めた。難しいのは方針ではなく執行——明文の規則、判明した違反、ほぼゼロの制度的帰結。その非対称こそ、あらゆる「AI 禁止」の規則が実際に生きている現実であり、シラバスの文言ではない。

**執行されるマージゲート（2026-09-30、10月3–4日にトレンドへ）**——CS240 回顧が難しいとした「執行」の章が出荷された。System76 の COSMIC デスクトップが PR テンプレートに必須の証明を追加（コミット「Disallow LLM generation in pull requests (#3911)」）：コントリビューターは**「この PR には、コード・コメント・説明を含め、LLM（いわゆる AI）生成コンテンツを一切含めていません」**と表明しなければならず——**「チェックボックスの記入されていない PR はクローズされます」**——「これらの変更を完全に理解している」と DCO 証明と並んで。テンプレートはスタック全体で有効（cosmic-epoch、cosmic-comp、libcosmic、cosmic-text、cosmic-edit、cosmic-settings、pop）。理由は Linuxiac 経由で Jeremy Soller に帰される——LLM 提出コードがメンテナーのレビューを圧迫する——ただしこれは一次投稿でなく報道経由。先例リスト（Godot、Ladybird、NetBSD、Zig）は伸び続けている。HN の見出し（「bans AI-generated code from much of its codebase」）は言い過ぎ：これが締めるのは*コントリビューション*であって System76 の内部ワークフローではない。ジャンル内の跳躍：TDF は原則を、Toast は不在を、FEX-Emu は fork 境界を、Halfspace は来歴を——COSMIC は「AI コンテンツなし」をチェックボックスとクローズ脅し付きの*マージゲート*にした最初の例で、主要プロジェクトが出した中で最強の anti-AI-PR ポリシーであり、宣言ベースの執行が走り途中のコントリビューターに耐えるかの実地テスト（一人が Claude 支援の修正をこれでクローズされたと報告）。
Sources: [PULL_REQUEST_TEMPLATE.md](https://github.com/pop-os/cosmic-epoch/blob/master/.github/PULL_REQUEST_TEMPLATE.md) · [HN ディスカッション](https://news.ycombinator.com/item?id=49946321) · [Linuxiac](https://linuxiac.com/cosmic-stops-accepting-llm-generated-content-in-pull-requests/)

**ステータス経済の犠牲者（2026-10-07）**——erdosproblems.com が「AI の猛攻に屈する」（HN 31）：創設者 Thomas Bloom が問題へのコメントを凍結、open/solved ステータスラベルと解決率カウントを削除、クレジット表現を剥ぐ——証明は誰かに帰属させず「it is known that…」と述べられるように。引き金：2025 年 8 月のコメント開始以来、まともな議論は崩壊し証明主張スパムが爆発——あるコメンテーターの監査は **291 の証明主張、そのうち 155 が説明ゼロ、61 問で複数の競合主張**を数え、「ほぼすべて」の新規コメントが「OPEN→SOLVED のドーパミン」を追う無説明の AI 証明宣告になるにつれ、モデレーションは持続不可能に（サイト：1,221 問、ユーザー約 2,000、日訪問 1–2.5 万）。ジャンルの最も大胆な一手：大半のプラットフォームはスパムにモデレーション追加で応じる；ここは**賞を取り除いた**——クレジット主張のコストがゼロなら、主張は情報を運ばなくなる。ならば主催者は主張のホスティングをやめた。COSMIC の証明ゲートの鏡像：入力を門禁するか、スコアボードを削除するか。Erdős を引いて締める——「my brain is open」——数学が人間の協業であり続けるよう促す。
Sources: [erdosproblems.com フォーラム](https://www.erdosproblems.com/forum/thread/blog:9) · [HN 議論](https://news.ycombinator.com/item?id=49977689)

## 2026-10-07 夜 —— 「聞くまでオフのローカル AI」スタンスに消費者向けテンプレート

**Penguin Mail 1.0**（Rust/GTK4 の Linux メール + カレンダー、GPL-3.0、リポジトリ 9/19、76★）：AI アシスタントは**モデルを選ぶまでオフ**——LM Studio か Ollama でローカル実行、「メール送信や設定変更の前に確認」、全ツール呼び出しを可視化（Ctrl+J）；独自サーバーなし、OpenPGP/S-MIME は自分の GnuPG 経由。HN の受けは正にこの線で割れた（「『……with AI』を越えるまでは 100% 興味あった」対：オプトイン・ローカル・先に聞く挙動はアシスタント押し付けパターンの正反対だ）。分類学に 3 つ目のスタンスが並んだ：AI デフォルト ON（業界標準）、無 AI（TDF/Toast/COSMIC）、そして **AI はいるが聞くまでオフ**——副作用の前に同意を、プライバシーページではなくデフォルトとして出荷する。

Sources: [penguin-mail.com](https://penguin-mail.com/) · [c9dev/penguin-mail](https://github.com/c9dev/penguin-mail)

## 2026-10-10 04:03 —— 第四のスタンス：フル AI 使用を、8.5k★ のスケールで自ら開示

**openGym**（セルフホスト・ジムトラッカー、GitHub 週間トレンド #11、8,548★、AGPL-3.0、単独メンテナ）：README で最も議論を集めたセクションは「How openGym is built」——「コード・テスト・ドキュメントの大部分は Claude Code セッションで起草された……決めて出荷するのは人間である。」無 AI（TDF/Toast/COSMIC）でも、デフォルトオフのローカル AI（Penguin Mail）でもない——**フルに AI を使った上で、その構築方法を README に宣言する**、Halfspace の「this is not vibe-coded」プロビナンス宣言の鏡像。8.5k★ のスケールで、「AI が起草し、人間が決める」が出荷可能・開示可能・コミュニティに受け入れられるモードであることの、これまでで最強の存在証明——しかも開示は、誰かがコメント欄で裁く前に来た。同じ週は文化側の対重量も届いた：Gross の「課題を書かせるな」と Glyph の「コードは昔からアートだった」（いずれも → [[dev-tools]]）。（リポジトリのもう半分は → [[agent-stack]]：読み取り専用 MCP サーバ——MCP は個人データが既にある場所に降りる。）

Sources: [DuarteSantos8/openGym](https://github.com/DuarteSantos8/openGym) · [GitHub 週間トレンド](https://github.com/trending?since=weekly)

## 2026-10-12 → 10-13 — 分岐が禁止令になる。「open」そのものがパロディを得る

**QGIS が AI 支援コントリビューションを全面禁止（QEP-408 v2.0、コア開発者 Nyall Dawson 起草、9-24 付、10-07 マージ。10-12 に HN で加速）：** 「**github.com/qgis/qgis リポジトリへの LLM・AI・agent 支援のコード貢献は一切認めない。貢献に AI・LLM・agent ベースのワークフローを使用したことが後日判明した場合、コードのリバートと貢献者権利の制裁を受ける。**」範囲に注意：AI*生成*ではなく AI*支援*——非開示者への遡及適用。プロジェクトは 1 月から AI ポリシーを持っていた（QEP-408、初版は Even Rouault）。v2.0 が寛容な体制を全面禁止へ置換。財団規模の OSS プロジェクトによる初の全面禁止で、スキル棚が 277k★ を越えた月に到来——統治の分岐が明示化：多くのプロジェクトは開示規範へ収斂した。QGIS は AI 支援パッチのレビュー コストが価値を上回ると賭けた。未解決は実行可能性——特定できる貢献者への遡及リバートは容易で、匿名の一発芸（まさに標的）が最も制裁しにくい。COSMIC のチェックボックスゲートを越えて制裁へ。

**OpenFatigue（openfatigue.ai、HN 58+、10-13）：** 「open」をマーケに使うことへのパロディベンダー——"Open-ish Licensing"（ライセンスは読める。利用には法務面談）、"Source Visible"（四半期ごとのコードのスクリーンショット。PR はファックス）、モデルウェイトは 41 ページの AUP と雰囲気審査の先に「入手可能」。ティアは Open（$0、リポジトリの star 必須）から Open Enterprise（監視付き部屋でソース閲覧）まで。フッターは全てを免責し、OSI 定義を「唯一の既知の治療法」として処方。**Bitwarden のアプリストア版が商用ライセンスへ**（10-11——GPLv3 版は存続。フォーラムは MinIO を聞いた）と **HashiCorp が Boundary CE をアーカイブ**（「セキュリティパッチは現在計画なし」）の同じ週。パロディは遅行指標：「open」にパロディサイトが必要な時、語の信号価値はもう壊れている。agent と、そのための方針を書く者へ：着地ページの前に LICENSE を読め。製品名の「open」は特性ではなく検証すべき主張として扱え。（詳細は [[dev-tools]]。）

Sources: [QEP-408 v2.0（raw）](https://raw.githubusercontent.com/qgis/QGIS-Enhancement-Proposals/master/qep-408-ai-tool-policy.md) · [OpenFatigue](https://openfatigue.ai/) · [Bitwarden フォーラム告知](https://community.bitwarden.com/t/published-version-update-in-app-stores/102750)

## 2026-10-14 12:03 — この位置づけが最初の資金データ点を得る：NetBSD の AI フリー姿勢、目標 5 万ドルに対して 120,282 ドル

**NetBSD の明示的な AI フリーの立場は報われているように見える（プロジェクトの Mastodon、10 月 6 日；The Register、10 月 13 日）：** アカウントは **9 月に約 120 件の寄付**という記録と、**5 万ドル**に設定された寄付目標に対して**120,282 ドル**の合計を報告した——「当然ながら、これで 5 万ドルに設定していた寄付目標バーが完全に埋まった。そろそろプロジェクトに資金を出す時だ！」（投稿は 107 ブースト、306 お気に入り）。文脈は Unix 世界に 1 年わたって生じた分岐であり、これがこの話を逸話ではなく実験として読めるようにする：Torvalds は Linux は「反 AI プロジェクトではない」と述べ（7 月）；Debian の開発者は AI 生成コントリビューションを許可することに投票し（8 月）；直近の Ubuntu Summit は強く AI 色を帯び；**COSMIC** は「AI コンテンツなし」を強制されるマージ ゲートにし；NetBSD は 7 月 30 日に **11.0** をそのような議論を伴わずに出荷した。明示的な反 AI*コントリビューション*方針が資金面の資産なのか採用の税なのかについての最初のデータ点：小さく、ポータブルで、数十年もの歴史を持つ OS が、位置づけだけで目標をほぼ **2.5 倍**にした。注意書きはこの数字が答えられないものだ：1 か月の寄付は**寄付者基盤**についてのシグナルであって、コントリビュータについてではない——方針が狙う人々は、金を払う人々ではない。 → 上に記録した QGIS の全面禁止と COSMIC の強制マージ ゲートと対比せよ；執行層の鏡像は [[platform-gatekeeping]] にある。

Sources: [The Register — NetBSD's AI-free role](https://www.theregister.com/os-platforms/2026/10/13/netbsd-may-have-found-a-new-role-the-ai-free-foss-os/5302818) · [NetBSD Mastodon post](https://mastodon.sdf.org/@netbsd/117396625341557692) · [NetBSD donations](https://www.netbsd.org/donations/)
