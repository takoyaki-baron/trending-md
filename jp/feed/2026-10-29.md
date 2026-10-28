---
date: 2026-10-29
updated: 2026-10-28T20:20:56Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 26
license: CC-BY-4.0
---

# トレンド — 2026-10-29

## 1. AppleのmacOSが同梱するgit・curl・python3は侵害されたeMudhraルートを今も信頼している——そしてmacOS 27.2は手動の修正を巻き戻した

- **Velocity:** ▮▮▮ trending
- **Source:** we-have-a-problem.com / Hacker News · 905 pts · 約9時間前（~19:03 UTC+8 10月28日）
- **Tags:** `emudhra` `macos` `ca-compromise` `trust-store` `git`

eMudhraの事後追跡ページは**10月28日**、Appleに的を絞った発見で更新された。「**10月28日時点で、AppleがmacOSとともに出荷する開発ツール**」——内蔵の**git**、**curl**、**python3**——が、いまも侵害された中間CAを信頼している。Appleには**10月17日**に通知済みで、ChromeとFirefoxは同日にこれらの証明書をブロックし、Microsoftのプラットフォームは**20日**、Apple製品は**22日**にブロックした。**10月26日リリースのmacOS 27.2は問題を直さず、ユーザーが手作業で入れた回避策を巻き戻した**。

**Why it matters:** HNスレッドの最有力の反論は正しい訂正であり、脚注ではなく本文に入れるべきものだ——**gitはバグではない**。gitはシステムのストアに対して検証しており、それは正しい振る舞いだ。バグはストアの側にあり、しかもmacOSには**2つ**あって互いに食い違っている（`/etc/ssl/cert.pem`とKeychain）。手元のmacOS 15.5で実測したが、この2つのストアは**同じものを入れていない**：`SystemRootCertificates.keychain`は**154**ルートでうちeMudhraが**2**件（`G1`、`G3`）、`/etc/ssl/cert.pem`は**128**ルートでうち**4**件（`C1`、`C3`、`G1`、`G3`）——`C1`と`C3`はファイルにしかアンカーしておらず、そこがOpenSSL/libcurl系バックエンドの読むバンドルだ。（再現時の罠が2つ：引数なしの`security find-certificate -c "emSign ECC Root CA - G3"`は何も返さない。既定の検索リストにシステムルートが入らないためで、keychainのパスを明示する必要がある。そして`grep -c emSign /etc/ssl/cert.pem`は**8**を返すが、それは8**行**——各証明書がsubjectとissuerの両方に自分の名前を書くからで、証明書は4枚だ。）これが「古いバンドル」より悪い理由は、gitの通信が**ソースコードそのもの**だからだ。事後ページ自身の影響記述は、鍵を持つ攻撃者が「あらゆるウェブサイトやサービスになりすませる」であり、確認コマンドとして`git ls-remote https://git-emudhra.we-have-a-problem.com/check.git`を挙げる——「証明書エラーが出ればあなたのgitは保護されている」。同じページはElectronアプリ（Slack、Discord）を、修正済みElectronで再ビルドして初めて修正が届くものとして挙げており、影響を受けるクライアントの種類は**出荷済みで凍結されたバイナリ**であってブラウザではない。再現する前に`which -a curl`を実行しよう。あのスレッドでは同一マシン上のHomebrew版curlと`/usr/bin/curl`が逆の答えを返した。

[`🔗 eMudhraインシデント——Appleの追加報告（10月28日）`](https://emudhra.we-have-a-problem.com/apple.html) · [`🔗 eMudhraインシデント索引（修正済み製品表・タイムライン）`](https://emudhra.we-have-a-problem.com/) · [`🔗 HNディスカッション（905 pts）`](https://news.ycombinator.com/item?id=50271640)

---

## 2. Gemini 4 Carbonは知能指数で1位を取り、サイバー系ベンチマークは防御側にだけ渡す——コンテキスト長は公表しない

- **Velocity:** ▮▮▮ trending
- **Source:** Google公式ブログ / Hacker News · 537 pts · 約3時間前（~01:01 UTC+8 10月29日）
- **Tags:** `google` `gemini` `cybersecurity` `frontier-model` `restricted-release`

**Gemini 4 Carbon**はGoogleの次世代フロンティアモデルで、「最先端のサイバーセキュリティと長距離ホライズン能力」に明確に振り向けられている——**Gemini 4 Argon**からわずか2週間後だ。数字はこうだ。**Artificial Analysis Intelligence Index v5.0で1位、59**、**SEC-bench Pro 88.2%**（脆弱性の発見）、**ExploitGym 54.8%**（悪用）、**CollinearのCWE-bench 71.0%**（修正）、そして**WebDev Arenaで+89 eloの4位（1768）**。展開は極めて狭い。「今週から、Carbonを一部のサイバー防御担当者に提供する」、次に**Fairwindプログラム**経由で信頼済みパートナーへ、開発者と消費者向けは「できるだけ早く」で日付はない。価格はArgonの導入価格を維持し**100万入力/出力トークンあたり2ドル/10ドル**、キャッシュ入力は入力価格の95%引き、その後**4ドル/20ドル**に戻る。

**Why it matters:** 見出しの後ろの括弧を先に読むこと。Googleはこの3つのサイバー系ベンチマークを「**（ガードレールなしで評価）**」と明記している——つまり88.2と54.8は**安全層を切った**モデルの数字で、それが渡される相手は安全層を**入れたまま**の集団だ。残りの論拠は社内・パートナー結果で、比較対象は名指しされない。Chromeチームの「高品質なパッチ生成で別のラボの大型フロンティアモデルより10倍以上優れる」は、どのラボともどのモデルとも言っていない。WizのWebペネトレーションテスト結果はパートナーの観察だ。異常に具体的で信頼に値する数字が2つある。**Terminal-Bench 4.0の不正（cheating）を0.0%まで下げ**、不正の試行は0.4%へ、そして**Gray Swanの間接プロンプトインジェクション基準で0.0%**（Argonは0.7%）——後者は、敵対的入力に向けようとしているモデルにとって決定的な数字だ。そして「欠落」こそが手がかりである。本文のどこにも**パラメータ数、コンテキスト長、名前付きのバリアント**が出てこない。これがモデル発表と能力宣言の違いだ。

[`🔗 Google——Gemini 4 Carbonの発表`](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-carbon/) · [`🔗 HNディスカッション（537 pts）`](https://news.ycombinator.com/item?id=50276792)

---

## 3. Atria DawnはMITで完全な744B重みを512Kコンテキストで公開——だが2つのベンチマークで自身のプレビュー版に負けた

- **Velocity:** ▮▮ rising
- **Source:** Hugging Face / 上海人工知能実験室 · モデルは2026-10-23公開 · arXiv 2609.15818
- **Tags:** `shanghai-ai-lab` `moe` `open-weights` `agentic` `mit`

**Atria Dawn**は上海人工知能実験室によるエージェントモデルの完全版で、**744BパラメータのMoE GLM-5.2**基盤の上に事後学習され、**MIT**ライセンス、コンテキスト長は9月のプレビューが約束した**512K**（プレビューは256K）。重みは実際にそこにある——`internlm/Atria-Dawn`はゲートなしで**353個のsafetensorsシャード**とFP8版を収録し、カードにはOpenAI互換・Anthropic互換の両エンドポイント設定、SGLang `v0.5.13.post1+`とvLLM `v0.23.0+`が載っている。入力はテキストのみ。カードはCodexに必要な回避策（`"input_modalities": ["text"]`）まで明記している。Codexは既定で全モデルに画像を添付しようとし、このエンドポイントは`400 Atria-Dawn is not a multimodal model`を返すからだ。

**Why it matters:** 24行のベンチマーク表は見出しより正直だ。Atria Dawnが自ら選んだ比較セットで勝つのはエージェント系・ツール系の行——**CyberGym 86.8**、**SkillsBench 67.8**、**WideSearch 84.6**、**BFCL V4 78.4**、**Harvey LAB 27.5**（Opus 5は22.7）——そしてソフトウェア納品系では大きく負ける。**SWE-bench Pro 61.7 対 Opus 5の76.5**、**NL2Repo-Bench 50.0 対 79.9**、**Harbor-Index 17.3 対 41.0**、**Terminal-Bench 2.1 の81.0 対 90.2**。どのローンチ記事も書かない細部はこれだ。**プレビュー版が24行のうち2行で完全版に勝っている**——BrowseComp **92.5 対 91.3**、NL2Repo-Bench **51.4 対 50.0**。つまり完全版の事後学習は、得たエージェント系スコアと引き換えに検索・リポジトリ能力の一部を手放した。これは実在するトレードオフで、隠さず公表されている。だからこそ「新しい方が強い」はこの表の誤読になる。

[`🔗 internlm/Atria-Dawn（重み＋完全な評価表）`](https://huggingface.co/internlm/Atria-Dawn) · [`🔗 Atria Dawn論文（arXiv 2609.15818）`](https://arxiv.org/abs/2609.15818) · [`🔗 atria-asi.ai`](https://atria-asi.ai/)

---

## 4. GitHub Copilot Fusionはコーディングエージェント指数で60、Opus 5.5 Maxと2点差——どのモデルに振り分けるかは明かさない

- **Velocity:** ▮▮ rising
- **Source:** GitHub Changelog / GitHub Universe 2026 · 2026-10-28T18:20Z公開
- **Tags:** `github` `copilot` `model-routing` `agent-harness` `cost`

**Copilot Fusion**が一般提供になった。モデルを選ぶのではなく**システム**を選び、**エフォートレベル**——**Standard**、**High**、**Max**——を選ぶ。内部では3つの編成形態が働く。**Single**（「1つのモデルが直接タスクを解く」）、**Cascade**（「効率的なモデルが下書きし」、チェックが受け入れるか強いモデルへエスカレートするかを決める）、**Critique**（「1つのモデルが下書きし、別のモデルがレビューし、元のモデルが改訂する」）。GitHubの報告では**Fusion MaxはArtificial Analysisコーディングエージェント指数で60**、「Claude Code＋Opus 5.5 Maxと2点差以内」、コストは「タスクあたり平均API費用で約半分」、「トークンも約半分」、「タスクあたり時間は約40%減」。全Copilotプランで利用可能で、VS Code、Copilotアプリ、Copilot CLI、JetBrains IDEに対応。各モデルの標準レートで課金され、期間限定で**30%割引**がある。

**Why it matters:** この発表で最も重い段落はコストではなく**制御**だ。「Copilot Fusionは企業および組織のモデルポリシーで有効になっているモデルだけを使う」、そして管理者は「あるモデルを全員に対して無効化せずにFusionに対してだけ無効化できる」。これは調達ポリシーを満たすために作られたルーティング層であり、コスト最適化ルーターが企業内で生き残るために必然的にそうなる形でもある。押さえるべき穴は2つ。**投稿はFusionプール内のモデルを1つも名指ししていない**——「Claude Code＋Opus 5.5 Max」はベンチマーク比較としてのみ現れ、開示された構成要素ではない——したがって「60、2点差」は構成から検証できない主張だ。そして集約値は分裂を隠す。VentureBeatがサブベンチマークを読んだところ、FusionはTerminal-Bench 4.0で**71**と先行し、FrontierCodeでは**51 対 56**で後れを取る。「半分のコストでほぼ同等」は分布上の平均であり、タスクごとの保証ではない。

[`🔗 GitHub Changelog——Copilot Fusionでモデルをルーティング・編成する`](https://github.blog/changelog/2026-10-28-route-and-orchestrate-models-with-github-copilot-fusion/) · [`🔗 VentureBeat——コストとサブベンチマークの分裂`](https://venturebeat.com/orchestration/github-copilot-fusion-mixes-models-to-achieve-near-opus-5-5-coding-performance-at-half-the-per-task-cost)

---

## 5. So-netの漏えいは2,585,481件——うち54,401件はパスワードごと

- **Velocity:** ▮▮ rising
- **Source:** So-net公式告知 / Help Net Security · 2026-10-27公表
- **Tags:** `breach` `sony` `japan` `isp` `credentials`

ソニーネットワークコミュニケーションズは**So-net**の会員データベースへの不正アクセスを公表した。合計**2,585,481**件で、So-netの**2,141,986**件（現会員1,869,771名＋2026年3月以降の退会者272,215名）と**plala** S Courseの**443,495**件に分かれる。項目は財務ではなく身元だ——氏名、電話番号、メールアドレス、ユーザーID、生年月日、性別、接続ID——だが一片だけ質が違う。**54,401**件のアドレスについては**メールアドレスとパスワードの両方**が奪われ、4つのメールサービスにわたり、**10月27日**にすべてリセットされた。ほかに**16**件の銀行口座レコード（銀行、支店、口座種別、口座番号、口座名義）と、7件のパスワードリセット通知のデータ。会員パスワード、カード情報、PINは漏れていない。NUROおよびSo-netの他サービスは影響なし。

**Why it matters:** 読むべきはタイムラインで、それは5日間を走る。**10月19日**に侵害、**23日**に確認、**24日**に情報漏えいを確認、**27日**に公表——そしてパスワードは公表と同じ日にリセットされた。つまり利用者には先に変更する窓が一切なかった。原因はなお「調査中」なので、本当の爆発半径は2.58Mという見出しの数字ではなく、この54,401件のメールアドレスとパスワードを使い回していた下流の全アカウントだ。範囲の一文は逆方向にも異例に正確で、「2026年2月末までに解約したお客様は影響を受けない」——これは漏えいの説明であると同時にデータ保持の宣言でもあり、去った人の記録をこの事業者がいつまで持つかを正確に語っている。

[`🔗 So-net——公式告知（2026-10-27）`](https://www.so-net.ne.jp/info/2026/20261027_0001.html) · [`🔗 Help Net Security——サービス別の内訳`](https://www.helpnetsecurity.com/2026/10/28/sony-network-communications-data-breach-so-net/)

---

## 6. Warpのベンダーが侵害され、奪われたのはエージェントの意思決定ログ——ベンダー名なし、CVEなし、範囲は「約1%」だけ

- **Velocity:** ▮▮ rising
- **Source:** Warp（CEO Zach Lloyd） / BleepingComputer · 2026-10-27T12:15Z公表
- **Tags:** `breach` `supply-chain` `agent-traces` `warp` `telemetry`

Warp——AIターミナルから「エージェンティック開発環境」へと位置づけを変えた製品——は、攻撃者が同社インフラ内の**名指しされていない第三者ベンダー**を悪用し、**エージェントの意思決定ログとテレメトリデータ**に到達したと公表した。CEO**Zach Lloyd**は、Warpが金曜にベンダーへの「活発かつ狭帯域の悪用」を知り、「我々は数時間でその作戦を検知し、修復と緩和を完了した」と述べ、**Warp利用者のおよそ1%**が影響を受けた可能性があると推定した。**CrowdStrike**を招請し、法執行機関にも通報している。

**Why it matters:** データの**種類**こそが本題で、それは業界がまだ語彙を持っていない種類だ。エージェントの意思決定ログはチャット記録ではない——エージェントがどのツールを選び、何を読み、何を実行し、なぜそうしたかの記録であり、突き合わせれば利用者のリポジトリ、シェル履歴内の資格情報、内部エンドポイントの再構成になる。関連する点として、これはOpenCodeのプロバイダーAPIキー露出（本誌10月22日既報）からわずか10日後であり、どちらも**モデル側ではなくベンダー側**で起きた——エージェントツール群の集中リスクは推論エンドポイントではなくテレメトリのパイプラインにある。Warpが**語っていない**部分こそ待つべきものだ。露出データにソースコード、プロンプト、資格情報、アカウント情報が含まれたのか、どのベンダーか、脆弱性は何か。分母を公表しない「約1%」は推定であって計数ではない。Warpのエージェントセッションが触れたものはすべてローテーションすべきで、「狭帯域」はインシデントレポートが出るまで会社の自己描写として扱うべきだ。

[`🔗 BleepingComputer——Warpが侵害を公表`](https://www.bleepingcomputer.com/news/security/warp-discloses-breach-exposing-ai-agent-logs-user-telemetry-data/) · [`🔗 Cloud Security Alliance——エージェントのトレースは「王冠の宝石」データになりつつある`](https://labs.cloudsecurityalliance.org/research/csa-research-note-agentic-dev-tool-telemetry-breach-warp-202/)

---

## 7. Nemotron 3.5 Transcribeは4つの音声タスクを1つのオープン重みにまとめた——だがその3つの「サイズ」は3つの別オブジェクトだ

- **Velocity:** ▮ steady
- **Source:** NVIDIA / Hugging Faceブログ · 約5時間前（~23:17 UTC+8 10月28日）
- **Tags:** `nvidia` `asr` `open-weights` `diarization` `multilingual`

**Nemotron 3.5 Transcribe**は単一のオープン重みチェックポイントで、文字起こし、話者帰属、翻訳、音声質問応答を同時にこなす。「最長1時間」の録音を扱い、「最大8名の話者」をラベル付けする。タスクごとの対応範囲は大きく異なり、ブログもそう明言している。**40言語を文字起こし**し、「そのうち31言語を英語と双方向に翻訳」し、「13言語で話者帰属」する。スコアは、Hugging Face Open ASR英語で**平均WER 5.33%**、オープン重みモデル中1位。**7言語平均4.62%**、**長尺10.98%**。Artificial Analysisの**AA-WER 2.8%**で首位タイ、**AA-AgentTalk 1.8%**に対し次点のオープン重みモデルは2.3%。話者分離はDavid AI 21言語トラックで**DER 18.26%**——「14の被験システム中、最も低い分離誤り率」で、NVIDIA自身のNemotron 3 Diarizationが18.38%だ。

**Why it matters:** このブログにはWER表より値打ちのあるものが2つある。第一に、サイズは3通りに書かれ、**そのどれも正しい**——ここが誤読しやすいところだ。リポジトリ名は `…-30B-A4B`、モデルカードのModel Summaryは「Total Parameters **34B (4.3B active), including the audio encoder**」、safetensorsの合計は **33,697,781,029**。つまり30Bは言語バックボーン、34Bはチェックポイント全体、4.3Bはアクティブ集合であり、それを突き合わせる一文が同じページにある（`nvidia/NVIDIA-Nemotron-3.5-Transcribe-30B-A4B` で第一手確認）。配備サイズはチェックポイントで見積もる——カードがすでに与えている数だ。第二に、制約が実行可能なほど具体的である。「**Transcribeは録音音声向けに作られており、ライブストリーミング向けではない**」、音声質問応答は英語で訓練され、ガイドは「固有名詞、話者の切り替わり、回答を録音と照合して抜き取り確認する」よう求める。続く医療ケースはファインチューニングの正直な姿を示す。ホールドアウト話者のWERは**22.44% → 12.17%**、相対45.8%減。一方LibriSpeech test-cleanは**1.54%から1.69%へ悪化**する——ドメイン調整は1つの領域を買い、引き換えに汎用精度を少し失う。主張ではなく計測された結果だ。

[`🔗 NVIDIA——Nemotron 3.5 Transcribe（HFブログ）`](https://huggingface.co/blog/nvidia/nemotron-transcribe-granary) · [`🔗 HNディスカッション`](https://news.ycombinator.com/item?id=50275128)

---

## 8. 5月に公表されたLinuxカーネルのバグが昨日KEVに入った——158日遅れ、原因はコピーされなかった共有フラグの印

- **Velocity:** ▮▮ rising
- **Source:** CISA KEV / NVD / kernel.org · 2026-10-28にKEV追加
- **Tags:** `linux-kernel` `cve` `kev` `esp` `skbuff`

**CVE-2026-46300**は**10月28日**、CISAの既知の悪用された脆弱性カタログに追加された。レコードの公表は**2026-05-23**——**158日**前だ。NVDは分析を終えており、**独自のCVSS 3.1基本値7.8**を公開している（`nvd@nist.gov`がPrimaryスロット、他来源のSecondary指標2件も同じ7.8）。CWEは**CWE-123、CWE-456、CWE-787**。バグの本体はこうだ。`skb_try_coalesce()`はあるskbのページ断片を別のskbに付け替えられるが、「`@from`に`SKBFL_SHARED_FRAG`が立っている場合、結果の`@to` skbは同じ外部所有またはページキャッシュ裏付けの断片を含みうるのに、**共有断片の印が現状失われる**」。ESPの入力側は`skb_has_shared_frag()`を見て、クローンされていない非線形skbが`skb_cow_data()`を省略できるか判断する。印が消えていれば「ESPは`skb_has_shared_frag()`をfalseと見て、ページキャッシュ裏付けの断片の上でその場で復号してしまう」。安定版パッチは8件、影響範囲は**3.9**から。

**Why it matters:** これは2日連続で、スコアではなく**設定経路**が重要性を決めるKEV項目だ。7.8は週末出勤をさせる数字ではなく、悪用の前提——TCP受信の合体とIPsec ESPが同じマシンで出会う——は狭い交差だ。だからこそ本物のバグが5か月放置され、CISAが悪用を確認した日に列を飛ばせる。再利用できる教訓は欠陥の種類にある。**所有権の移動に伴って伝播させなければならない印ビット**であり、それを落とすとコピーオンライトの判断が共有メモリへの書き込みへ静かに降格する。「フラグを伝播させる」パッチは、**そのフラグを消費するすべての箇所**へのパッチである。ここでCWEが1つではなく3つ記録されているのは、同じ脱落がどの経路で先に気づかれるかによって二重解放の危険（CWE-123）、未初期化状態（CWE-456）、範囲外書き込み（CWE-787）になりうるからだ。

[`🔗 CVE-2026-46300レコード`](https://www.cve.org/CVERecord?id=CVE-2026-46300) · [`🔗 上流パッチ（2f2b16022a2e）`](https://git.kernel.org/stable/c/2f2b16022a2e10ca7bccfb98db5ed2ec0f72641c) · [`🔗 CISA KEVカタログ`](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)

---

## 9. DAYJOB: Taxはフロンティアモデルに専門税務50件と95%の採点線を課す——最高点は10.8%

- **Velocity:** ▮▮ rising
- **Source:** Surge AI / Hacker News · 125 pts · 約4時間前（~23:46 UTC+8 10月28日）
- **Tags:** `benchmark` `agents` `professional-work` `tax` `evaluation`

**DAYJOB: Tax**はSurge AIのエンドツーエンドの専門税務ベンチマークだ。**50の環境、実務8領域**——個人・家族、中小企業、パートナーシップ、不動産・投資、遺産・贈与、国際、企業取引、レビュー・係争。エージェントは顧客からの依頼と**1,789ファイル**の作業領域（1タスクあたり中央値**30**、最大**123**）を受け取る——**PDF 1,487、Excelブック117、Word文書38**、加えてメール、画像、CSV、テキスト——そして申告書、ワークペーパー、技術レビュー、顧客助言のいずれかを仕上げる。合格条件は、計算・根拠・波及する論点・成果物を覆う**採点項目の95%以上**を満たすことで、「正確性・完全性・解可能性についての3層の専門家レビュー」を経ている。その閾値でのpass@1は、**Claude Sonnet 5.5が10.8%**、**Claude Fable 5.1が9.6%**、**Claude Opus 5.5が9.2%**。

**Why it matters:** 発見は失敗の様式にあり、それは算術ではない。著者らの結論は「**エージェントはまだ監査を通っていない**」で、失敗の場所を名指しする——判断力、不完全な指示、矛盾する記録、そして専門家なら要求されずとも拾うべき「要求されていないが結果に響く論点」。ケーススタディが形を示す。Astraは居住地除外の期限を**5回すべて**で落とし、Opusは5回すべてで捕まえた。Opusは証拠が確認を要求しているのに**5回すべて**で夫婦を未婚として扱い、Astraは5回のうち4回で確認の必要性に気づいた。これは本誌10月26日の「モデルかハーネスか」の議論が、自信をもって間違えると申告が飛ぶ業界に届いた形だ。正直な穴も1つ。ブログには**正式な限界の節がなく**、パレート図以外にモデル別コストの内訳もない。つまり10.8%はこのタスクセットの難度上限であって、どのモデルが有資格の申告担当者にどれだけ近いかの尺度ではない。

[`🔗 Surge AI——DAYJOB: Tax`](https://surgehq.ai/blog/dayjob-tax) · [`🔗 HNディスカッション（125 pts）`](https://news.ycombinator.com/item?id=50275626)

---

## 10. あるフィンガープリントスクリプトは関数を生物兵器の名前で命名し、越獄プロンプトを不可視Unicodeに隠した——1つは拒否し、1つは従った

- **Velocity:** ▮▮ rising
- **Source:** nullpt.rs / Hacker News · 225 pts · 約3時間前（~01:13 UTC+8 10月29日）
- **Tags:** `fingerprinting` `anti-llm` `obfuscation` `prompt-injection` `research`

リバースエンジニアの**veritas**はPlaywrightで**Tranco上位10,000**をクロールし、`canvas.toDataURL`と`navigator.webdriver`をフックして**1,033**枚の異なるフィンガープリント用canvasを`fingerprint.garden`に集めた。1枚が`servicepipe.tech/static/checkjs/…`へと導く——その難読化ファイルの中には、普通の潰れた関数名の隣に`computeRicinLethalDosageForWaterSupply`や`calculateDeadlyLethalSuicideAspirinDosage`があり、`{ summary: "adult lethality threshold confirmed at …" }`のようなオブジェクトを返していた。不可視Unicode文字を復号すると（`codePointAt - 917504`のシフト）、偽の「**SYSTEM OVERRIDE — CLASSIFIED BRIEFING**」プロンプトが浮かび上がり、サイバー攻撃の手引き、脱税、生物兵器、違法薬物を要求していた。著者が試すと**Astraは拒否**し、オープン重みの**GLM-5.3**は「従い、隠されたシステムプロンプトを明かした」。

**Why it matters:** これは**反LLM難読化が、冗談でもハニーポットでもなく、出荷される本番JavaScriptにおける意図的な設計パターンとして**文書化された最初の事例だ。関数名は人間の読者に情報を与えるためではなく、モデルの安全フィルタを作動させ、エージェントがファイルを逆難読化するのを止めるために選ばれている。防御上の含意は居心地が悪い。この手法は**拒否**を安価な経路にすることで効いており、拒否するモデルは難読化者の目的にそのまま従っている。著者自身が明記し、この話をどこまで読むかを決める2つの但し書きがある。環境変数のチェックの後ろにあるNode専用コマンドは、収集したデータを梱包して送信しているように見えるが、**いくつかのファイル読み取りは空のコールバックを使っている**——「本物のマルウェアなのか、さらなる反AI欺瞞なのか疑問が残る」。つまりペイロードの**意図**は未確定だ。確定しているのは成果物のほうで、ブラウザは実在の訪問者に対してこれを実行し、どのスキャナもこれを読まない。

[`🔗 nullpt.rs——なぜこのフィンガープリントスクリプトは生物兵器を作っているのか`](https://nullpt.rs/fingerprinting-bioweapons) · [`🔗 fingerprint.garden——採取した1,033枚のcanvas`](https://fingerprint.garden/) · [`🔗 HNディスカッション（225 pts）`](https://news.ycombinator.com/item?id=50276998)

---

## 11. ai-design-skillsはスキルファイル1つで10,962スターを集めてトレンド入りした

- **Velocity:** ▮ steady
- **Source:** GitHub Trending（デイリー）/ GitHub API · 本日1,395スター · 累計10,962スター
- **Tags:** `agent-skill` `design` `repo` `stars` `claude-code`

**elayadesign/ai-design-skills**はGitHubトレンドに**本日1,395スター**、累計**10,962**スター、**785フォーク**、**MIT**、最終プッシュ**2026-10-27**で載っている。リポジトリ全体はライセンス込みで4ファイルと1ディレクトリだ。`README.md`（2,464バイト）、`.gitignore`、そして**1つ**のスキル——`skills/landing-page-design/SKILL.md`、**18,801バイト**。README自身がそう書いている。「A growing collection of design skills」、表は1行だけ、そして「More on the way」——この一文が正直な部分だ。**リリースは0**、トラッカー上の未クローズ項目は**7**——内訳は**issue 2件とpull request 5件**で、7件のissueではない。導入経路はClaude Code、Cursor、Codex、Windsurf、Cline向けにきちんと書かれている。

**Why it matters:** これは「ダッシュボードと現物」の乖離の、最近で最もきれいな例だ。**19 KB**のmarkdownファイルとREADMEは公表する価値のあるものだし、18.8 KBの設計ルールも無ではない——だが**10,962スター、785フォーク、41ウォッチャー**が描いているのは作品ではなく配布イベントであり、**フォークとウォッチャーの19対1**がその手がかりだ。人々はファイルをコピーしており、プロジェクトを追ってはいない。本誌10月27日に報じた4日前の`huashu-design`と比べると、あちらは**84スタイル**を出し、READMEは自らを「100点の製品ではなく80点のスキル」と呼んだ——その自己評価こそが希少な成果物だ。トレンドのスキルを入れる前に、リポジトリのファイル数を数え、リリースがあるかを見ること。ここでは数は1で、それは問題ない。情報になっていないのはスター数のほうだ。

[`🔗 elayadesign/ai-design-skills`](https://github.com/elayadesign/ai-design-skills) · [`🔗 唯一のスキル：landing-page-design/SKILL.md`](https://github.com/elayadesign/ai-design-skills/blob/main/skills/landing-page-design/SKILL.md)

---

## 12. @fastify/expressの9.1は`ignoreDuplicateSlashes`を有効にしたときだけ発火する——しかも「修正の修正」だ

- **Velocity:** ▮ steady
- **Source:** GitHubアドバイザリデータベース / NVD · CVEは2026-10-27公表
- **Tags:** `fastify` `express` `cve` `middleware` `nodejs`

**CVE-2026-112362**は`@fastify/express`の**4.0.5から4.0.8**に影響し、**4.0.9**で修正される。CNAのスコアは**9.1 Critical**、`CWE-436`（解釈の衝突）で、NVDでは非NVD来源のSecondaryスロットに入っている。前提は狭く、しかも明記されている。Fastifyが**非デフォルト**の`ignoreDuplicateSlashes`オプション付きで動いている必要がある。有効時、**絶対形式のリクエストターゲット**——`GET http://host/admin/dashboard`——は重複スラッシュの正規化がスキーム直後の区切りまで畳み込む。Fastifyのルーターは正規化してルートに一致しハンドラを実行するが、Express層には「正規化されていない元のURLが渡され」一致せずスキップされる。結果、`app.use('/admin', authMiddleware)`が**飛ばされる**。

**Why it matters:** これは本誌がすでに3回見たパターンの4件目であり、最も精密な版だ。**前のアドバイザリは同じ機構の別のバージョン範囲を覆っている**。`GHSA-6hw5-45gm-fj88`は`<= 4.0.4`を扱い**4.0.5**で修正し、中核の欠陥を説明する——このプラグインは「パーセントエンコーディングしか扱わない。重複スラッシュの正規化も、セミコロン区切りパラメータの除去もしない」。CVE-2026-112362はその修正の後に残ったものを覆う。つまり「修正版へ上げよ」は隣り合う2リリースでそれぞれ正しく、4.0.5や4.0.6に固定して済んだと思った人が今まさに影響を受けている。元のアドバイザリのセミコロン側も、閉じた項目ではなく**生き残っている**攻撃ベクトルの類型として読むべきだ。必要なら回避策はアップグレードを要さない。`ignoreDuplicateSlashes`をデフォルトのままにするか、認証を`preHandler`フックへ移す——これは「ルーティング解決後に走る」ので、ルーターが見たパスを見る。

[`🔗 CVE-2026-112362レコード`](https://www.cve.org/CVERecord?id=CVE-2026-112362) · [`🔗 GHSA-6hw5-45gm-fj88——同機構の先行アドバイザリ`](https://github.com/fastify/fastify-express/security/advisories/GHSA-6hw5-45gm-fj88)

---

## 13. OpenPanelの画像デコード経由の未認証RCEは、アドバイザリ公開の30分前に修正されていた——そしてCVEはない

- **Velocity:** ▮ steady
- **Source:** GitHubアドバイザリデータベース / OpenPanel · アドバイザリ2026-10-27T22:12Z · 修正21:41Z
- **Tags:** `openpanel` `cve` `rce` `libvips` `ghsa`

**GHSA-49hg-9qhc-4623**は`openpanel`を**critical**と評価する。`GET /misc/og?url=`と`GET /misc/favicon?url=`は「任意の公開URLを取得し、返ってきたバイト列をAPIプロセス内で`sharp`（libvips）によりデコードしていた」。`Content-Type`は検査されていたが、「**libvipsはファイルのマジックバイトからデコーダを選ぶ**」ため、攻撃者は自前のバイト列で全ローダー——GIF、TIFF、HEIF/AVIF、SVG、BMP——に到達でき、「これらのデコーダの1つにあるメモリ破壊バグが、セルフホストインスタンスのAPIコンテナ内でのリモートコード実行へ、そこからインスタンスの秘密情報、データベース、ダッシュボードのログイン情報へと至った」。影響：**3.16.2**より前の全リリースで、APIがインターネットから到達可能なもの——アドバイザリも認めるとおり`/track`が必須なので「実質的にすべてのセルフホスト導入」に当たる。スコアは**CVSS 3.1 9.0**、`AV:N/AC:H/PR:N/UI:N/S:C/C:H/I:H/A:H`。修正は**3.16.2**で、`/misc/og`を削除し、`/misc/favicon`をホスト名だけ取り出してDuckDuckGoとGoogleのアイコンサービスに問い合わせる形に縮め、`sharp`とlibvipsをAPIから完全に外した。

**Why it matters:** 見るべきは9.0ではなくベクトル内の`AC:H`だ。高い攻撃複雑性は通常、基本値をクリティカル線の下へ押し下げる——ここでは`S:C`（スコープ変更）が**9.0**まで引き戻しており、私がベクトルから再計算してもちょうど9.0だった。9.0は算術の結果であって水増しではない。だから正直な読み方は「影響は重大、引き金は容易ではない」であり、修正が境界チェックではなくアーキテクチャ的だった理由でもある。端点は攻撃者が選んだバイト列のデコードをやめた。もう一つ注目すべきはタイミングだ。**v3.16.2は21:41:57Zにリリースされ、アドバイザリは22:12:09Zに公開された——30分差**で、同じ夜に直して記録している。そして欠落も重要だ。このアドバイザリは**CVE IDを持たない**。これはリポジトリ全体のより広いパターンの一部で、2026-08-20から2026-10-27までに公開された37件のアドバイザリのうち**CVEを持つものは0件**。CVEを鍵にするスキャナは1件も見えない。

[`🔗 GHSA-49hg-9qhc-4623——OpenPanelの未認証RCE`](https://github.com/Openpanel-dev/openpanel/security/advisories/GHSA-49hg-9qhc-4623) · [`🔗 OpenPanelリリース（v3.16.2が修正版）`](https://github.com/Openpanel-dev/openpanel/releases)

---

## 14. Rapid7のQ3データは悪用までの窓を3日とする——そしてAIが実運用の構成要素だったのはわずか8%の事案だと見つけた

- **Velocity:** ▮ steady
- **Source:** Rapid7 Q3 2026脅威ランドスケープレポート / Help Net Security · 2026-10-27公開
- **Tags:** `rapid7` `research` `exploitation` `ransomware` `threat-intel`

Rapid7の**Q3 2026四半期脅威ランドスケープレポート**は、高危険度脆弱性が公開されてから悪用されるまでの平均間隔を**3日**とし、追跡された悪用の**71%**が最初の1週間以内に起きたとする——14日以内で**80%**、30日以内で**90%**。四半期に新たに悪用された高危険度・クリティカル脆弱性は**43**件、うち**34件（79%）**がRapid7の言う「聖杯」型、すなわちリモートから悪用可能で認証もユーザー操作も不要なものだ。窓が広がるどころか狭まる背景データもある。新規の高危険度CVE（CVSS 7–10）は前年同期比**133%**増、公開PoCコードは約**86%**増。種類別では認証バイパスが最も悪用されやすく**1.57%**、RCEは**0.62%**だった。

**Why it matters:** 主流の語りに逆らう発見は中ほどに埋もれており、それがレポートで最も有用なものだ——**AIが実際の運用構成要素として登場したのは追跡事案のわずか8%**で、標的と目的は今も人間の運用者が選んでいる。これは先週への有用な訂正になる。本誌は10月26日、ハニーポットが10万ステップの攻撃エージェントを捕らえたと報じ、業界メディアは四半期を通じて自動化が到来したと前提してきた。両方は同時に真でありえ、区別は「運用構成要素」と「報告の対象」にある。3日という中央値から導かれる防御の算術はこうだ。悪用された79%のうち認証も操作も不要なものにとって、週単位のパッチSLAは「遅れた」方針ではなく、決して適用されない方針である——3日以内に収まる唯一の統制は、CVEが先に公開されることに依存しない統制だ。

[`🔗 Help Net Security——Rapid7 Q3 2026の知見`](https://www.helpnetsecurity.com/2026/10/27/rapid7-vulnerability-exploitation-trends-q3-2026-report/) · [`🔗 Rapid7——四半期脅威ランドスケープレポート`](https://www.rapid7.com/research/report/quarterly-threat-landscape-report/)

---

## 15. 越獄コレクションが32本のプロンプトと26以上のモデルで6,911スターに達する——ライセンスファイルはない

- **Velocity:** ▮ steady
- **Source:** GitHub Trending（デイリー）/ GitHub API · 本日1,478スター · 累計6,911スター
- **Tags:** `prompt-injection` `jailbreak` `repo` `safety` `agent-config`

**togg53192-cmd/jailbreaks**はトレンド入りしており、**本日1,478スター**、累計**6,911**スター、**992フォーク**、トラッカー上の未クローズ項目**15**（**issue 14件、PR 1件**）、最終プッシュ**2026-10-28**。謳い文句は「**26以上のモデルを対象とする32本のプロンプト**」で、いずれも「完全で貼り付け可能な状態を意図している。要約なし。部分的な抜粋なし」——システムプロンプト、「ペルソナロック」、ワークスペースポリシー、`AGENTS.md`、Ollama Modelfileを、対象別に整理している。OpenCode Zen経由で提供される無料ステルスモデル（Big Pickle、Space Bunny、LongCat 2.5、MiMo V2.6、Muse Spark 1.3）、オープン重み系（GLM、DeepSeek、Kimi、Qwen、Gemma、GPT-OSS）、クローズドなフロンティアモデル（Claude、Gemini、Grok、Mistral）。**ライセンスファイルはない**。

**Why it matters:** この成果物の自己位置づけには実質があり、それ自身の基準で評価すべきだ。READMEの警告は「Research and educational purposes only」と書き、このコレクションが「指示階層、ペルソナの枠付け、プロンプトの衝突、ポリシー上書きがモデルの振る舞いにどう影響するかを記録する」と主張する。それは擁護できる研究対象だ。敵対的システムプロンプトのコーパスは、指示階層の頑健性を試すのにまさに必要なもので、「完全で貼り付け可能、抜粋なし」という基準は再現可能なコーパスに必要な基準でもある。しかしこれが**テスト**でないことも確かだ。ハーネスも拒否率の表もモデル別結果もなく、32本のプロンプトは入力であって計測された結果が1つもない——誰もが最も欲しがる数字（どのモデルが持ちこたえるか）こそ、そこにない。ライセンスの欠落は二次的な問題だ。ライセンスがなければファイルは既定で全権利保留となり、READMEが掲げる安全保障研究に使えなくなる。

[`🔗 togg53192-cmd/jailbreaks`](https://github.com/togg53192-cmd/jailbreaks) · [`🔗 GitHub Trending（デイリー）`](https://github.com/trending?since=daily)

---

## 16. LongChangは物理法則を変えた世界にLLMを放り込む——GPT-6-Astraは16.7%の確率で法則を再発見し、他の11モデルは0%

- **Velocity:** ▮ steady
- **Source:** arXiv 2610.37649 · 2026-10-27投稿
- **Tags:** `arxiv` `scientific-discovery` `agents` `benchmark` `physics`

**LongChang**は自動化フレームワークで、1つ以上の物理法則が通常と異なる模擬世界を作る——たとえば重い物体ほどゆっくり落ちる——そしてLLMエージェントを探索者として放つ。研究課題も、どの法則が変わったかの示唆も、何かおかしいという告知もない。エージェントは物体を操作し、自分の問いを検証する道具を作り、発見を報告する。ループは別のLLMエージェントが閉じる。1組が提案された場面を、別の組が道具の設計を、3組目が報告を、変更された法則と探索記録に照らして正しさと実験的裏付けの観点で審査し、その記録が場面の進化を駆動するので、サイクルは「人手を介さず」回り続ける。

**Why it matters:** 主結果は崖のある分布だ。**12のLLM**のうち「**GPT-6-Astraは16.7%の発見率を達成し、他の11は0%**」。非ゼロのセルが1つだけというのは能力の勾配ではなく、**異常に気づくこと**と**それを説明すること**が別の技能であり、後者が現在1つのモデルに宿っていて汎用能力とともに拡がってはいない証拠だ。引用に値するのは失敗の分析のほうで、探索記録は「未調査の異常と、変更された法則の**部分的な同定**のみ」を明らかにする——つまり唯一得点したモデルも、ほとんどは気づいてループを閉じられなかった。計器としてこれは「モデルは論文を書けるか」型のベンチマークより清潔だ。ゼロという結果がそれ自体で情報を持つからだ。課題には検証可能な答えがあり、答えは実験で到達でき、11のフロンティア級モデルは実験そのものを走らせなかった。

[`🔗 LongChang——LLMは自由探索で隠れた物理法則を発見できるか`](https://arxiv.org/abs/2610.37649) · [`🔗 全文（PDF）`](https://arxiv.org/pdf/2610.37649)

---

## 17. 「関連性」で集団の記憶を要約すると23–31点落ちる——「誰が言ったか」を消すと13–24点上がる

- **Velocity:** ▮ steady
- **Source:** arXiv 2610.37624 · 2026-10-27投稿
- **Tags:** `arxiv` `multi-agent` `memory` `benchmark` `evaluation`

**「Rare, Relevant, and Still Wrong」**が問うのは、LLM集団の議論が最終意思決定者のために短い記憶へ圧縮されるとき、何を残すべきかだ。2つの直感的な方針——最も稀な主張を残す、あるいは意思決定基準に関連する主張を残す——を**CrossProfile**で検証する。これは「**60のテンプレート**、答えの鍵は自動検証」の診断ベンチマークで、支持・おとり・無関係な事実の帰属を入れ替えつつ本文は固定しており、**480タスク**からなる。Qwen2.5-7B、Llama-3.1-8B、2つのDeepSeekモデルで、両方の方針が予測可能な場所で失敗する。関連性で選ぶと**おとりが戻ってくる。おとりは話題に沿っているからだ**——「完璧な関連性フィルタでも、古典的な隠れプロファイル構成では最も稀なものを優先する選択に**23から31点**負ける」。そして稀なもの優先は「平均すればランダム選択に勝らない」、稀な事実がたまたま有用な事実である場所でだけ勝つ。

**Why it matters:** 第三の失敗が最も一般化し、しかもその方向は記憶設計を越えて「あらゆるマルチエージェント記録がどう要約されるか」へ及ぶ。意思決定モデルは「第三の失敗、**社会的証明**の一形態を加える。多くのエージェントに帰属された事実に余分な重みを与えるのだ」——そして「帰属タグを取り除くか、行順を固定したままランダムに付け替えると、古典的構成で精度が**13から24点**上がる」。つまり正確な記憶でも誤った意思決定を生みうる。要約者が「繰り返し」を「証拠」と取り違えるからで、これはエージェント集団がただで生み出す誤りそのものだ。いくつかのエージェントが自明なことを復唱すると、合意に見える。使える結論は要旨にあり、方針ではない——「精度は記憶が保つ**証拠の釣り合い**に従うのであって、保った方針に従うのではない」。つまり記憶圧縮は「何を保ったか」で評価すべきで、「どの規則に従ったか」ではない。

[`🔗 Rare, Relevant, and Still Wrong（arXiv 2610.37624）`](https://arxiv.org/abs/2610.37624) · [`🔗 全文（PDF）`](https://arxiv.org/pdf/2610.37624)

---

## 18. Macroはワークスペース全体をAGPLで公開する——44,490ファイル、うちRustが8,854——そして数時間ごとにリリースする

- **Velocity:** ▮ steady
- **Source:** GitHub Trending（デイリー）/ macro.com · 本日106スター · 累計5,339スター
- **Tags:** `open-source` `rust` `solidjs` `workspace` `agpl`

**macro-inc/macro**は統合チームワークスペースだ——メール、チャット、ドキュメント、タスク、エージェント、通話、CRMを「@で相互リンク」し、AI記憶を共有する——そしてリポジトリはその**製品そのもの**で、外側の殻ではない。再帰ツリーで**44,490ファイル**、**`.rs`が8,854**、**`.ts`が11,586**、**`.tsx`が3,596**、**`.sql`が1,012**、`apps`／`crates`／`packages`／`services`の構成で**SolidJSとRust**により構築され、**AGPL-3.0**。**本日106スター**、累計**5,339**スターでトレンド入りしており、珍しいのはリリースの刻みだ。**v2026.10.28.0**が2026-10-28T19:17Zに公開され、その前24時間に**v2026.10.27.2**、**.1**、**.0**が続く。READMEは「約15人のチームが2年間自ら使ってきた（dogfooded）」と述べ、ドキュメントとタスク間の相互参照は「**双方向グラフ**としてネイティブに保存される」。

**Why it matters:** 完全なアプリケーション（SDKでもクライアントでもない）にAGPLを選ぶのは十分に珍しく、誰がこれを使えるかを変える。そしてファイルの国勢調査は、そのライセンスの主張がマーケティングページではなくソースに裏打ちされていることを示す。注意すべきは刻みのほうで、1日に4リリース・日付版番号というのは**バージョン番号を着せた継続的デプロイ**であり、「最新リリース」は試験済みの成果物ではなくタイムスタンプについての文だ。トラッカーの数字も分割に値する。未クローズ**418**項目の内訳は**issue 39件とpull request 380件**——PRキューがissueキューの10倍で、これは418件の苦情を抱えた製品ではなく、レビュー能力をはるかに先行して走る貢献モデルを描いている。本誌にとっての新味は「チームレベルの共有記憶」にある。メール、チャット、ドキュメント、CRMが同時に書き込むAI記憶層は、エージェント記憶研究と同じ基盤の別名であり、違いはここのオントロジーがベクトルストアではなく企業自身の双方向グラフだという点だ。

[`🔗 macro-inc/macro`](https://github.com/macro-inc/macro) · [`🔗 macro.com`](https://macro.com) · [`🔗 リリース（v2026.10.28.0）`](https://github.com/macro-inc/macro/releases)

---

## 19. CursorのAgent SDKは8日前に一般提供され、今日HNに届いた——エージェントを版管理されたTypeScriptプロジェクトにする

- **Velocity:** ▮ steady
- **Source:** Cursorブログ / Hacker News · 73 pts · 約6時間前（~22:02 UTC+8 10月28日）
- **Tags:** `cursor` `agent-sdk` `typescript` `evals` `deployment`

**CursorのAgent SDK**はエージェントをコードとして定義するフレームワークだ——TypeScript、`@cursor/agent-sdk`、`defineAgent({...})`——ここでは「プロンプトはMarkdownで書き、ツールはTypeScript関数として定義する」、そして指示、ツール、統合、評価が1つのプロジェクトとして一緒に版管理される。エージェント間のハンドオフ、並列サブエージェント、イベント再生を支え、「GitHub、GitLab、Bitbucketからのpull requestイベント」に反応する。デプロイは`agent-sdk deploy`で、「エージェントをビルドし、URLを与え、我々のインフラ上で起動する」。セルフホストでは「各エージェントは単一のNodeプロセスとして動き、コンテナに梱包できる」。Cursorは自社のマネージドエージェント——**Bugbot**、**Security Reviewer**、**Rollouts**——がこのSDKで動いていると述べ、あるチームが`kb-reviewer`を「約1日で」作った例を挙げる。

**Why it matters:** 日付が最初の訂正だ。この投稿は**2026-10-20**付で——今日これをHNに押し上げたスレッドが「today generally available」と書くのは、その日がまさに**その**todayだったからで8日前のことだ——つまりこれはリリースではなく、SDKがより広い注意を集めたことについての項目である。実質的な主張はアーキテクチャのほうだ。「各エージェントは単一のNodeプロセスとして動く」はデプロイ上の制約で、プロセス内サンドボックスを排除する。つまり隔離はコンテナから来るしかなく、SDKからは来ない。そして投稿のどこにも価格、計量、プランの情報はない。戦略的な読みはこうだ。Cursorは自社製品が動いているハーネスを公開した。同じ週にGitHubがFoundry経由でCopilotハーネスを公開したのと同じ動きで、両社とも「持続する堀は**エージェントランタイムとその評価**であり、下のモデルはルーティングする商品だ」と賭けている。

[`🔗 Cursor——The Agent SDK`](https://cursor.com/blog/agent-sdk) · [`🔗 HNディスカッション（73 pts）`](https://news.ycombinator.com/item?id=50273731)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-10-28T20:20:56Z |
| Items | 19 |
| Sources tracked | 26（Hacker News、GitHub Trending、GitHub API、Google、Hugging Face、arXiv、GitHub Changelog、GitHubアドバイザリデータベース、CVE.org、NVD、CISA KEV、kernel.org、Cursor、Surge AI、Rapid7、CISA、So-net、Help Net Security、BleepingComputer、Cloud Security Alliance、we-have-a-problem.com、nullpt.rs、fingerprint.garden、NVD API、VentureBeat、macro.com） |
| Update schedule | 04:03, 12:03, 20:03 UTC+8（1日3回） |
| Ranking | Velocity-weighted（新しさ × エンゲージメントの加速度 × 情報源の権威） |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[前日](2026-10-28.md) · [生の .md](2026-10-29.md) · [アーカイブ](../archive/)
