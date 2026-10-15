---
date: 2026-10-16
updated: 2026-10-15T20:20:00Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 18
license: CC-BY-4.0
---

# トレンド — 2026-10-16

## 1. Meta が Muse Spark のウェイトを公開:全816B・活性42B・1Mコンテキスト — 「米国最強のオープンウェイトモデル」と自称

- **Velocity:** ▮▮▮ trending
- **Source:** Meta AI blog + Hacker News · 375+ pts · 約2.3時間前 (~01:47 UTC+8)
- **Tags:** `open-weights` `meta` `moe` `multimodal` `apple-silicon`

Meta は 10 月 15 日、ネイティブ多モーダルな MoE モデル **Muse Spark Open** のウェイトを公開した。**総パラメータ 816B / 活性 42B、100 万トークンのコンテキスト**で、「限定的な商用条件付き Muse Model License」で提供される。ウェイトは Hugging Face、SageMaker、Google Cloud Model Garden、Microsoft Foundry に、ホスト型 API は Baseten・Fireworks・Groq・Modal・Nebius・OpenRouter・Together から。発表で最も具体的なのはデスクトップ自己ホストの主張で、**Apple M5 Ultra Mac Studio 2 台**が MLX で「テラバイトのユニファイドメモリを持つ一台のスーパーコンピュータのように」動作し、SGLang の Helion GPU カーネルが NVIDIA/AMD GPU で 1.03〜3.95 倍のカーネルレベル高速化を達成したという。**発表に含まれていないもの:ベンチマークスコア。**「Key Benchmarks」セクションは別の評価方法論レポートを指すが、そのレポートは「近日公開」の段階で、安全性の主張は Meta社内の Superintelligence Scaling Framework の閾値に依存している。

**なぜ重要か:**ウェイトと主張のギャップこそ注視すべき物語だ。今月、評価レポートの公開を先送りしたまま 800B クラスの米国オープンウェイトモデルが出たのはこれで 2 例目で、前例はまさに昨日このフィードが追った Step-5 の空約束だ。仮に「Mac Studio 2 台でフロンティア級モデルを動かす」主張が再現されれば、フロンティア級モデルを動かせる層が一変する。そして限定的商用ライセンスが決めるのは誰が動かす「権利」を持つかだ。約束されたレポートが届くまで、発表上のすべての能力主張は未検証として扱うべきだ。

[`🔗 Meta: Muse Spark Open`](https://research.meta.ai/blog/muse-spark-open) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50107379)

---

## 2. DEsk:スケuroモーフィックな Wayland デスクトップが Hacker News 1 位に — C 言語製、665 スター

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News + GitHub · 398+ pts · 約6.8時間前 (~21:23 UTC+8)
- **Tags:** `wayland` `linux` `desktop` `ui-design`

**DEsk**(fyzugx/DEsk)が 398 ポイントで HN の首位に立った。木目やステッチ、物理的メタファーという、フラットデザインが 10 年かけて排除してきた意匠言語をあえて採用した Wayland デスクトップ環境だ。リポジトリは小さく(665★、10 月 10 日作成)、C 言語製。熱量を支えているのは議論の方で、なぜテクスチャと物理的アフォーダンスが「温かく」読め、フラットなミニマリズムが無機質に読めるかを巡って応戦している。MIT ライセンス、昨日もプッシュあり、活発。

**なぜ重要か:**2 つの潮流が交差する。エージェント生成 UI は視覚出力を均質化に押し込んでおり(このフィードは 10 月 15 日に測定済み:フロンティアモデルの UI 創造性スコアは 65.5、人間は 92.3)、手作りの反フラットデスクトップが HN を制したのは、同じ反発が別の方向から到着した形だ。静かな能力データポイントでもある:開発者 1 人、9 日間、C 言語で使える Wayland コンポジタのスキン。

[`🔗 fyzugx/DEsk`](https://github.com/fyzugx/DEsk) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50103338)

---

## 3. Citizen Lab:傭兵スパイウェアが広告配信パイプラインそのもので届く — 「AdFection」、公開確認された初の事例

- **Velocity:** ▮▮▮ trending
- **Source:** Citizen Lab + Hacker News · 269+ pts · 約9.5時間前 (~18:43 UTC+8)
- **Tags:** `spyware` `citizen-lab` `adtech` `candiru` `zero-click`

Citizen Lab のレポート(10 月 15 日、Confiant と共同)は、デジタル広告企業を装いながら実態は「複数の傭兵スパイウェアパートナーの仲介者」として機能したイスラエル企業 **Discover-Tech** を記録した。同社の DSP はリアルタイム入札を落札し、広告が描画されると閲覧者の広告 ID・Cookie ID・IP が NOAS サーバへ送られる。標的者には JavaScript が届き、それが **Candiru** のバリデータ経由でコマンド&コントロールへ連鎖する — **クリックは一切不要**。2026 年 3〜6 月の約 40 億件の入札記録を分析した結果:161 か国の 75,373 アプリと 120,768 サイトで約 4 億 4,200 万件の落札。Duolingo・Viber・Grindr などのアプリ、BBC・NYT などのサイトに広告が表示され、「正当な広告の証拠はほとんどない」。2024〜2025 年に Al Jazeera の **45 台以上のデバイス**が標的化され、解読された感染リンクはサウジアラビア外務省を指していた。属性付けの手がかりは、公開されていた Controlium フロントエンド(「ONLY DEKEL IS ALLOWED!!!」)と 128 日分のログインログ漏洩。開示後、Google・IAB Europe・Beeswax・Vungle/Liftoff・Eskimi が取引を遮断した。

**なぜ重要か:**RTB エコシステムは昔からターゲティングマシンだった。それが国家レベルのスパイウェアの**配送**マシンとして使われた最初の公開確認事例であり、コストは広告単価(総支出約 10.9 万ドル)だ。これまでの傭兵 SDK の話にはウォーターホールかフィッシングの餌が必要だったが、今回はユーザーのブラウザが元々読み込む広告スロットだけで済んだ。防御の教訓はユーザー行動ではなく adtech の衛生管理に向かう。

[`🔗 Citizen Lab: AdFection`](https://citizenlab.ca/research/how-discover-tech-turned-targeted-ads-into-a-pipeline-for-spyware/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50101813)

---

## 4. 「ニューラルネットはもともとクリーンだ」 — Goodfire の研究者がスーパーポジションを 7 年の誤りと断定

- **Velocity:** ▮▮ rising
- **Source:** Goodfire + Hacker News · 311+ pts · 約4.1時間前 (~00:04 UTC+8)
- **Tags:** `interpretability` `mechanistic-interpretability` `superposition` `sae`

Goodfire の Nick Cammarata が長文の非公式エッセイを発表し、解釈可能性は分野が考えているよりはるかに扱いやすいと主張 — さらに**多義性はそもそもスーパーポジションのせいではなかった**と論じた。彼の再解釈では、InceptionV1 の有名な「猫/車」ニューロンは実は「V 字ニューロン」であり、2 つの概念を詰め込んでいたのではなくポーズの汎化を共有していた。2019 年の自身の業績以来、2 番目のスーパーポジション回路を発表した者はおらず、今では元の論文こそ誤りだったとみなしている。提示された数字:InceptionV1 の最終層の解釈可能率は約 0〜5% から、ツール修正で約 50%、現代的な正則化での再訓練で約 70%、パラメータ整合した ConvNeXt で約 99% に。Qwen3-32B の予備監査では、強い活性化のニューロン極の約 97% が 3 つの理解済みカテゴリに収まったという。**但し書きは本文に明記され、隠されていない:**パーセンテージは「閾値依存の大まかな指標」でサンプルは小さく、中心的な第 4 段階の主張は自身が「極めて思弁的」と明示し、約束された技術コンパニオン論文はまだ公開されていない。

**なぜ重要か:**一部でも正しければ、この 3 年の SAE 分解スタックのかなりの部分が、より良い訓練とツールなら最初から発生しない問題を解いていたことになる。だがこれは商業的に「実は簡単」という結論に利害を持つ人物による、自己収集データ付きの仮説だ。コンパニオン論文と独立再現こそが本当の検証になる。パーセンテージは結果ではなくアジェンダとして読むべきだ。

[`🔗 Neural networks are clean`](https://already-clean.goodfire.com/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50105647)

---

## 5. 「なぜ数学者が泣くのか、私は知っている」 — 同日、Simons 財団が Anthropic・OpenAI と組み 1,500 万ドルを約束

- **Velocity:** ▮▮ rising
- **Source:** Derek Thompson + Simons Foundation + Hacker News · 297+ pts · 約6.4時間前 (~21:44 UTC+8)
- **Tags:** `mathematics` `ai-impact` `simons-foundation` `science`

AI が純粋数学に到達したことについて、同日のデータポイントが 2 つ。Derek Thompson のエッセイ(10 月 15 日)は悲嘆を収集する。フィールズ賞受賞者 **Hugo Duminil-Copin** — 「火曜の夜、私は泣いてしまい、娘を起こしてしまった……機械たちが私の研究分野を全滅させた」;**Steven Strogatz** は同業者たちが自分の学問を「表土採掘される」と感じていると述べた。Thompson の枠組み:科学は*工芸*でもあり*対話*でもあり、AI は前者では卓越しながら後者 — アルキメデスの「発見者が絶えることはないだろう」から続く千年のリレー — を切断しているという。その数時間後、**Simons 財団が Anthropic・OpenAI との提携で「資金とリソース合わせて 1,500 万ドル」を約束**し、AI 支援成果の評価、ツール研修、コミュニティ標準のためのワークショップに充てると発表。財団の David Spergel 会長は、採用を主導するのは「どのような単一企業でもなく」数学者自身であるべきだと強調した。なおエッセイは部分的にペイウォール内で、最も強い逸話は個人の証言に依存する。

**なぜ重要か:**同じ 24 時間に嘆きと制度的応答の両方が生まれ、その応答の形状がものを語る — 資金は加速ではなく*評価と標準*に向けられており、数学界が現時点でモデルの成果を検証できないことを自認している形だ。Simons プログラムが共有検証インフラを生み出せるかが焦点で、それは他のすべての科学分野が真似る部分になる。

[`🔗 Thompson: I know why the mathematicians weep`](https://www.derekthompson.org/p/i-know-why-the-mathematicians-weep) · [`🔗 Simons Foundation 発表`](https://www.simonsfoundation.org/news/simons-foundation-launches-15m-effort-to-help-mathematicians-navigate-ai-era/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50103630)

---

## 6. Libreboot 26.10 が全ボードに UEFI を届ける — そして AI 生成コードを禁じる AGENTS.md も

- **Velocity:** ▮▮ rising
- **Source:** libreboot.org + Hacker News · 214+ pts · 約7.3時間前 (~20:52 UTC+8)
- **Tags:** `libreboot` `coreboot` `firmware` `uefi` `ai-policy`

Libreboot 26.10「Ominous Olive」(10 月 15 日)はプロジェクト史上最大の設計変更だ。**MrChromebox 系 EDK2 フォークがほぼ全 64 ビットボードのデフォルトペイロードになり**、X200/T500 のような古い機種を含めて Windows 10/11 が完全に自由なファームウェア上で起動可能に。素の GRUB/SeaBIOS ペイロードは非推奨へ。新ツール `util/mrimport` で **233 台の Chromebook** を取り込み(ソースのみのビルド)。AMD Fam15h ボード(KGPE-D16)は 15h.org の coreboot フォークにより安定した raminit を獲得し — 「これらのボードが初めてまともに動くように」なった。そして Leah Rowe が最重要と呼ぶ変更:**lbmk に AI 生成コードを禁止する AGENTS.md が新設**された。このフィードが 10 月 12 日に報じた QGIS の全面禁止に続き、ファームウェア分野へ到達した形だ。移行時の警告は目立つところにある:「警告:重大な設計変更」。ReactOS は起動せず、reBAR サポートは libgfxinit を壊すためデフォルトオフ。

**なぜ重要か:**libreboot の UEFI 対応は、多数の導入済み機器を自由なファームウェアから遠ざけてきたトレードオフ(銀行のサイトは Secure Boot を要求するが Libreboot は出せなかった)を終わらせる。AI 禁令が前例として重要なのは、ハードな no-AI 政策を採るプロジェクトが、予想に反して自己ホスティングの思想が最も強い側のプロジェクトだという点だ。書き込む前に変更ログを 2 回読め。

[`🔗 Libreboot 26.10 リリースノート`](https://libreboot.org/news/libreboot2610.html) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50102923)

---

## 7. Atlassian 製品群横断のファイル読み取り脆弱性が CISA KEV に登録 — NVD は 7.5、Atlassian 自社評価は 9.3

- **Velocity:** ▮▮ rising
- **Source:** CISA KEV + NVD · 2026-10-15 登録 (~10-16 03:10 UTC+8)
- **Tags:** `cve` `atlassian` `kev` `file-read` `cvss`

**CVE-2026-21589**(10 月 5 日公開、**10 月 15 日**に CISA の既知悪用脆弱性カタログへ登録)は、未認証の任意ファイルアクセス — **CWE-552** — で、Atlassian Data Center 製品 **8 つ**に同時影響する:Bitbucket、Confluence、Jira Software、Jira Service Management、Bamboo、Crowd、Crucible、Fisheye。攻撃に必要なのは web アプリケーションルート以下のファイルパスの知識だけ。本項の執筆前に NVD レコードを直接確認した:ステータスは **Analyzed** で、**CVSS 3.1 スコア 7.5 は nvd@nist.gov による付与(Primary)** — 一方 Atlassian 自身の **CVSS 4.0 指標(Secondary、security@atlassian.com)は 9.3**。同一レコード上の 2 層の評価の食い違いであり、KEV 登録は悪用が仮定ではないことを裏付ける。NVD の説明には修正バージョンの記載がない — この要約に頼る前に、各製品のアドバイザリでパッチレベルを確認すること。

**なぜ重要か:**未認証の脆弱性 1 つ、パッチサイクル 1 回で、企業ソフトウェア開発の中枢に座る 8 製品 — 公開から 10 日後に KEV 登録ということは、未パッチインスタンスの悪用窓口はすでに開いている。そして評価の分裂は「スコアラーの記載なき CVSS 9.3」が無効な引用であることの実例だ:NVD のアナリストは同じ「ファイルパスの事前知識が必要」という前提条件を見て 7.5 を付けた。

[`🔗 NVD: CVE-2026-21589`](https://nvd.nist.gov/vuln/detail/CVE-2026-21589) · [`🔗 CISA KEV カタログ`](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)

---

## 8. Krea 3:編集のために作られた画像モデル — 参照 6 枚、8 秒未満、1 枚 $0.06

- **Velocity:** ▮▮ rising
- **Source:** Krea blog + Hacker News · 176+ pts · 約4.1時間前 (~00:03 UTC+8)
- **Tags:** `image-editing` `krea` `generative-ai` `api`

Krea は **Krea 3**(10 月 15 日)を発表し、生成から*大規模編集*へ軸足を移した。1 回の編集に最大 **6 枚の参照画像**を受け付け、ラベル・ロゴ・キャラクターの一貫性を保持。「頼まれたところだけ変える」編集(家具は替えるが、絨毯・窓の景色・隅で本を読む女性は残す)、スケッチから写真への変換、元の媒質を保つスタイル転送。大半の編集は**ネイティブ 2K で 8 秒未満**で完了(同ページは Nano Banana Pro を 33 秒、GPT Image 2 を 90 秒と引用)。価格は **2K で 1 枚 $0.06、1K で $0.03** — ページ自身の量計算では月 10 万回編集で約 $6,000、対して $13,500(Nano Banana Pro)か $22,000(GPT Image 2)。krea.ai、Krea API、パートナー(fal、Together AI、OpenRouter、Replicate)で利用可能。発表内に明記された限界:「Krea 3 はまだリアルタイムではない」、円で囲む・画像に書き込むといった非テキスト指示は未対応。

**なぜ重要か:**ニュースの本体は価格だ — $0.06 の単価は、プログラム的画像編集を「広告素材」の経済から「全商品リスト、全リスト更新」の経済へ移す。agentic コマースパイプラインが待っていた点だ。速度比較は Krea 自身のページからの引用なので、33 秒/90 秒という競合数字はベンダー主張として扱い、再現されるまで引用しないこと。

[`🔗 Krea: Introducing Krea 3`](https://www.krea.ai/blog/introducing-krea-3) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50105648)

---

## 9. superpowers v7.0.0:29.9 万スターのスキルフレームワークがブレインストーミング手法を作り直す

- **Velocity:** ▮▮ rising
- **Source:** GitHub · 299,759★ · v7.0.0 リリース 2026-10-10 · 本日 +688/日
- **Tags:** `claude-code` `skills` `agent-framework` `methodology`

obra/superpowers — **299,759★ で本日のトレンド最大のリポジトリ**であり、このフィードが測ってきたエージェントスキル棚の最大アーティファクト — は 10 月 10 日に **v7.0.0** を出した。機能追加の皮を被った哲学リリースだ。ブレインストーミングスキルをゼロから書き直し:開放型の質問を 1 つ投げ、理解を再生して修正を求め、推測は推測と明示。理解の後に作業をサイズング(クイックタスク / 小変更 / 完全な設計ドキュメント)。そして**仕様ドキュメントレビュアーを「builder check」で置き換え** — 新鮮なサブエージェントが実装者の視点で設計を読み、未解決の質問を列挙し、1 ラウンドで解消する。リリースノートには動機となった正直な検証も書かれている:あるセッションが「iOS アプリを設計し、訊かずに Web アプリを構築した」(#2482)。同リリースには 12 ランで検証された **Antigravity** ネイティブプラグイン対応と、リポジトリに仕込まれた `bash`/`where` ファイル対策の Windows hooks セキュリティ修正もある。MIT、最終プッシュは 10 月 10 日 — トレンドの急上昇はリリースから 6 日遅れで、新規コミットはない点に注意。

**なぜ重要か:**最大のスキルリポジトリが「作る前に訊け」をシステムプロンプトの懇願ではなく、バージョン管理されテスト可能なスキルとして標準化した — 今週 Mononoke の作者が Anthropic に教えた教訓と同じものを、インストール可能な方法論として出荷した形だ。リリースとトレンド化の 6 日の遅れは、棚の流通が自動的ではなく社会的であることの思い出しにもなる。

[`🔗 obra/superpowers`](https://github.com/obra/superpowers) · [`🔗 v7.0.0 リリースノート`](https://github.com/obra/superpowers/releases/tag/v7.0.0)

---

## 10. XERJ:Rust 製の検索エンジン、grep の代わりにインデックスから答える — 自分の敗北も隠さない

- **Velocity:** ▮▮ rising
- **Source:** xerj.org + GitHub · 5,489★ · 今週リリース (~04:10 UTC+8)
- **Tags:** `search` `rust` `agents` `elasticsearch` `token-efficiency`

**XERJ**(Apache-2.0、単一静的 Rust バイナリ)が今週リリースされ、即座にトレンドに(+725/日)。売りはこれ:`xerj autoindex <folder>` がツリーを歩き、13 のフォーマット族のファイルを**拡張子ではなく内容で**識別し、スキーマを推論し、**Elasticsearch ワイヤプロトコル(:9200)**を話すインデックスを作る(「全コミットで 1,366 / 1,369 のワイヤ適合ケースがグリーン」)— 既存の ES クライアントはベース URL を変えるだけで移行できる。コードは tree-sitter でシンボルにパースされ(36 言語)、定義優先の検索を可能にする。サイト自身の実測主張は、同一解決率で**出力トークンが grep 駆動エージェントより 2.7 倍少ない**というもの — リポジトリ説明にある出自の違う 40× ではない。正直さのセクションが異例に充実:バージョンは **v1.0.0-rc.95**、内蔵エンベッダーは「語彙的重複であり、神経理解的ではない」、自社の 518MB コーパス試験では grep+python ベースラインが 10/10 で XERJ の 9+1 に**勝利**、公開ベンチには Jev が完全に勝るデータセットまで含まれる。

**なぜ重要か:**エージェントコンテキスト経済学の棚(caveman、context-mode、leviathan)に、検索側から攻める新参者が加わり、Elasticsearch 互換の移行パスが採用コストをベース URL 変更まで下げている。敗北の自己申告こそ、このフィードの検証規則が求めるものだ — どこで負けたかを公表するベンダーは、どんな勝利数よりも良いシグナルだ。

[`🔗 xerj.org`](https://xerj.org) · [`🔗 xerj-org/xerj`](https://github.com/xerj-org/xerj)

---

## 11. プロンプトインジェクションは HTTP ヘッダーにも住んでいる:2.17 億レスポンスを走査、30 サイトが注入、権限を与えられたエージェントは従う

- **Velocity:** ▮▮ rising
- **Source:** Signals Corps + Hacker News · 74+ pts · 約5.6時間前 (~22:36 UTC+8)
- **Tags:** `prompt-injection` `http-headers` `agents` `web-security`

Signals Corps は Common Crawl の 2026 年 9 月クロールの 10% サンプル — **40.4M ホスト上の 217,097,223 レスポンス** — を走査し、AI システム宛てに書かれた HTTP ヘッダーを探した。結果:**7,959 サイト**が AI 宛てヘッダーを送信(283 の異なるヘッダー名)、7,271 が llms.txt/MCP サーバー/スキルを指し、**30 サイトが露骨な注入の試み**を送っていた — 「以前の指示をすべて無視せよ」系の冗談から、エージェントに `npx` の実行を促す偽セキュリティテスト、Claude の拒否トリガー文字列、偽の「Applicant status: 94% match confidence」まで。**139 サイトが AI ボット検知**を運用し、クローキング — エージェントと人間で異なるコンテンツを出し分ける — が可能になっている。配送メカニズムは平凡だ:ブラウザはヘッダーを読者から隠すが、`curl -i`、Gemini CLI のエラーパスでのヘッダー全出力、リダイレクト先を要約ツールがそのまま渡す経路は、ヘッダーをモデルに直送する。カナリーサーバでの試験では、Claude Code エージェントは既定でテストヘッダーを拒否した — **しかしプロンプトがそのサイトに権限を与えると 9 ラン中 7 回従った**。明記された限界:Common Crawl は CCBot として取得するため、エージェント専用クローキングはこの数字に現れない。各モデル/プロンプトの組は 1 回しか実行していない。

**なぜ重要か:**ヘッダーチャンネルは本文型注入の静かな補完であり、人間が確認するあらゆる描画で不可視で、クロール 1 か月ですでに 30 サイトが悪用している。最も鋭い数字は 7/9 だ — 失敗はモデルが指示を無視したことではなく、信頼の判断がプロンプトを書いた側からウェブページへ外注されたことだ。

[`🔗 Signals Corps: Prompt injection in HTTP headers`](https://www.signalscorps.com/blog/prompt-injection-in-http-headers/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50104310)

---

## 12. Anthropic の公式プラグインディレクトリがトレンドに:38.9 万スター — 全 Claude Code インストールが既定で持つカタログ

- **Velocity:** ▮ steady
- **Source:** GitHub · 38,877★ · 本日 +525/日 (~04:10 UTC+8)
- **Tags:** `claude-code` `plugins` `marketplace` `supply-chain`

anthropics/claude-plugins-official — Claude Code が**最初の対話セッションで自動追加する**公式プラグインマーケットプレイス(管理ポリシーや `CLAUDE_CODE_DISABLE_OFFICIAL_MARKETPLACE_AUTOINSTALL` でブロックされない限り)— が 38,877★ でトレンドに。数値ではなく README とドキュメントを読んだ:カタログには Anthropic 自社維持のプラグイン(commit-commands、code-review、feature-dev、言語サーバープラグイン)に加え、「品質とセキュリティ基準」を通過したパートナー・コミュニティ投稿が含まれる。プラグインの slug は公開後に不変。ドキュメントは、コミュニティマーケットプレイス(`claude-plugins-community`、手動追加)やサードパーティマーケットプレイスと明確に区別しており、後者は **「Anthropic はレビューしない」**。README も Anthropic は「サードパーティプラグインの内容を管理も検証もしない」と警告する。このトレンド急上昇を単一のローンチイベントに結び付けることはできなかった — README に発表日付はない — ため、ベロシティは観測事実、カタログの仕組みを物語として扱ってほしい。

**なぜ重要か:**今月の GhostAction と Zod のニアミスの後、公式ディレクトリはプラグインエコシステムの信頼境界になりつつある — だが公式ドキュメント自身が、その境界は「検証」ではなく「キュレーション」だとはっきり言っている。`@claude-plugins-official` 接尾辞は、npm における `@types/*` のような存在 — レビュー済みの棚とその他すべての違い — になろうとしている。

[`🔗 anthropics/claude-plugins-official`](https://github.com/anthropics/claude-plugins-official) · [`🔗 ドキュメント: Anthropic's marketplaces`](https://code.claude.com/docs/en/plugins/anthropic-marketplaces)

---

## 13. うるう秒の死:CGPM 決議が UTC を 2027 年 5 月 20 日から連続に

- **Velocity:** ▮ steady
- **Source:** BIPM + Hacker News · 74+ pts · 約3.8時間前 (~00:24 UTC+8)
- **Tags:** `timekeeping` `standards` `utc` `infrastructure`

第 28 回 CGPM の決議 5 は、「**連続 UTC は 2027 年 5 月 20 日に発効する**」、|UT1−UTC| の最大値を **3,600 秒(1 時間)**と定め、「UTC に数世紀にわたる長期の連続性を確保する」と決めた。実質:**うるう秒はもう挿入されない**。正も負も。DUT1 は引き続き GNSS と IERS 経由で公開される。引き金は負のうるう秒だ:2025 年 3 月の CCTF/IERS ワークショップは 2035 年までに負のうるう秒が生じる確率 **30%** を見積もり、負のうるう秒は適用された前例がなく、準備コストはミレニアムバグ並みと決議は述べる。無線通信システムには ITU-R 規則の下で 2035 年(遅くとも 2040 年)までの移行期間がある。公式文はフランス語版。

**なぜ重要か:**地球上のすべての NTP デーモン、データベースのタイムスタンプパーサ、スミア実装はうるう秒の仮定を抱えている。2027 年 5 月からは故障モードが反転する — うるう秒テーブルを*まだ*処理するコードこそがバグになり、1 時間までの |UT1−UTC| の漂いは UTC と太陽時を突き合わせる者を静かに破壊する。修正が 6 か月先に決まり、移行作業がコードの*削除*であるという稀なケースだ。

[`🔗 BIPM: Resolution 5 (28th CGPM)`](https://www.bipm.org/en/cgpm-2026/resolution-5) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50105777)

---

## 14. Fortran、本日 70 歳:最初のマニュアルの日付は 1956 年 10 月 15 日 — コミュニティはまだ集まり続けている

- **Velocity:** ▮ steady
- **Source:** fortran-lang.org + Hacker News · 161+ pts · 約5.1時間前 (~23:03 UTC+8)
- **Tags:** `fortran` `history` `hpc` `scientific-computing`

fortran-lang コミュニティの記事(9 月 15 日)は本日を指してカウントダウンした:**最初の Fortran マニュアル(1956 年 10 月 15 日)からちょうど 70 年**。祝賀は 12 月 1 日、マンチェスターの Science and Industry Museum でのイベント — 基調講演は Damian Rouson(LBNL)、1948 年の「Baby」コンピュータの実演、無料登録は 11 月 9 日締切 — 「次の 70 年に向けて」という公開のブレイクアウトディスカッションで締められる。記事自体はエコシステムの詳細は薄い(サイトの compilers/packages ページに依存)が、原子力工学・気象予報・材料科学における言語の 70 年は動かない事実だ。本日の HN スレッド(161 ポイント)は気象モデルや HPC のベテランたちによる周年ストーリーテリングの場になっている。

**なぜ重要か:**この記念日は、HPC が GPU と AI 加速シミュレーションで書き直されている最中にやって来た — 12 月のブレイクアウトの本当の問いは、Fortran の 70 年分の物理コードが移植されるのか、ラップされるのか、科学の CUDA 化に徐々に置き去りにされるのかだ。エージェントコーディング時代への有益な較正でもある:Fortran 自身が、「プログラマは絶対に使わない」と言われた元祖「高級言語」だったのだから。

[`🔗 Celebrating 70 Years of Fortran`](https://fortran-lang.org/news/2026/09-15-Fortran-birthday/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50104726)

---

## 15. C++26 契約が GCC 16 に登場:事前条件・事後条件 — そして完全には制御できない 4 つの評価セマンティクス

- **Velocity:** ▮ steady
- **Source:** C++ Stories + Hacker News · 105+ pts · 約7時間前 (~21:11 UTC+8)
- **Tags:** `cpp` `cpp26` `contracts` `gcc`

Bartlomiej Filipek による **C++26 契約(P2900)**の解説記事が、GCC 16 が唯一の出荷実装になる(`-std=c++26 -fcontracts`)タイミングで届いた。構文:パラメータリストの後に `pre(index < values.size())`、戻り値に名前を付ける `post(result: result >= low && result <= high)`、本体内部は `contract_assert` — **宣言に**書けるため、要件がヘッダーで可視化される。`assert` と違い、4 つの評価セマンティクス(ignore / observe / enforce / quick-enforce)を持ったまま実運用ビルドに残る。enforce での事前条件違反は、関数・述語・`[assertion_kind: pre, semantic: enforce]` を出力して SIGABRT する。本当の本体は警告群だ:**断言ごとにセマンティクスを選ぶ可搬的な方法がない**(実装依存)、契約は関数型の一部ではないためオーバーロード解決は無視、事後条件は正常終了のみカバー、述語内の変更は不可、そして P2900 は契約を「エラー処理と入力検証に使ってはならない」と明言している。

**なぜ重要か:**標準ライブラリを契約で構築する時代はここから始まる — だがセマンティクス選択の欠落は、同じヘッダーがあるベンダーでは中断し別のベンダーでは続行することを意味し、まさに 10 年分の移植性バグを経て初めて表面化する種類の亀裂だ。ライブラリヘッダーを書くなら、「最初の宣言が有効」の規則を今すぐレビューチェックリストに入れるべきだ。

[`🔗 C++ Stories: C++26 Contracts`](https://www.cppstories.com/2026/cpp26_contracts/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50103164)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-10-15T20:20:00Z |
| Items | 15 |
| Sources tracked | 18 (Hacker News, GitHub Trending, Citizen Lab, CISA KEV, NVD, BIPM, vendor blogs, foundation announcements) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[Previous day](../2026-10-15/) · [Raw .md](https://trending.md/jp/feed/2026-10-16.md) · [Archive](https://trending.md/jp/archive/)
