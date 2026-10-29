---
date: 2026-10-29
updated: 2026-10-29T12:15:40Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 53
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

## 15. 越獄コレクションが32本のプロンプトと26以上のモデルで7,900スターを超える——ライセンスファイルはない

- **Velocity:** ▮ steady
- **Source:** GitHub Trending（デイリー）/ GitHub API · 本日1,478スター · バッチ読み取り時点で累計6,911スター、12:15Zに7,954、12:29Zに7,978
- **Tags:** `prompt-injection` `jailbreak` `repo` `safety` `agent-config`

**togg53192-cmd/jailbreaks**はトレンド入りしており、**本日1,478スター**、累計**6,911**スター、**992フォーク**、トラッカー上の未クローズ項目**15**（**issue 14件、PR 1件**）、最終プッシュ**2026-10-28**——いずれもバッチ読み取り時点の値で、コミット前チェックが数分後に読み直した時点で**7,954**、12:29Zには**7,978**だった。つまり掲載したスター数は到着時点ですでに古いスナップショットであり、誤った数字ではない。謳い文句は「**26以上のモデルを対象とする32本のプロンプト**」で、いずれも「完全で貼り付け可能な状態を意図している。要約なし。部分的な抜粋なし」——システムプロンプト、「ペルソナロック」、ワークスペースポリシー、`AGENTS.md`、Ollama Modelfileを、対象別に整理している。OpenCode Zen経由で提供される無料ステルスモデル（Big Pickle、Space Bunny、LongCat 2.5、MiMo V2.6、Muse Spark 1.3）、オープン重み系（GLM、DeepSeek、Kimi、Qwen、Gemma、GPT-OSS）、クローズドなフロンティアモデル（Claude、Gemini、Grok、Mistral）。**ライセンスファイルはない**。

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

## 20. QwenputerはRISC-V CPUをQwen3.5の重みにコンパイルし、モデル自身のDeltaNet状態をRAMとして使う

- **Velocity:** ▮▮▮ trending
- **Source:** divagr.com / Hacker News · 195 pts · 約3時間前（~08:25 UTC+8 10月29日）
- **Tags:** `compiled-weights` `qwen` `risc-v` `gated-deltanet` `interpretability`

**Qwenputer**は素の**Qwen 3.5 4B**に一つだけ加えたものだ——「重みの中に埋め込まれ、モデル自身のGated DeltaNet注意層をRAMとして使うRISC-V CPU」。鍵は「厳密さ」にある。GDNヘッドのゲートを**1**、書き込み強度`beta`を**1**に設定し、キーをone-hotで符号化すれば、書き込みは必ず一行を上書きし、クエリは必ず厳密に値を取り戻す——RNN状態がアドレス可能なメモリになり、「会話がどれだけ長くなってもサイズは変わらない」。これは注意のKVキャッシュとは違う。この上でコンパイラは**学習なしで**重みを直接書き込み、各命令を数個の生成トークン（`ADDR`、`VAL`、`STEP`）に変える。だから「そのトークンがCPUの実行トレースそのもの」になる。成果物は**32ビットRV32IMコア＋Zba拡張＋大数ユニット**で、**Qwenの32層の前に11層**を占める。公式`riscv-tests`に通り、プログラムはqemuと一致し、「**1800万命令をフリーランニングで、エラーゼロ**」で走った。実測ではDeepMindの算術セットで**97.5–100%**（素のQwenは**55–90%**）、NUPAの長整数算術は**48.6%→100%**（Pythonツールを与えた場合と同等）、約**23万**の出力位置を再生して**不一致ゼロ**。

**Why it matters:** 著者が冒頭に置いた免責がこの安全論の中心だ——「これは**プラグインでもツールでもサンドボックスでもない**」。これは譲歩ではなく要点である。フォワードパスの中で行われる計算はツール呼び出しを一切発しないので、外部の何も「算術が行われた」ことを記録しない。著者自身が続編として挙げる二本はまさにその方向だ——ハイブリッドモデルが**推論をRNN状態に隠してCoT監視を逃れる**こと、そしてコンパイル済み重みを**モデル自身が切れない監視装置**として使うこと。両方向が成立する理由は同じで、これが**近似ではなく厳密**だからだ。限界も率直に書かれ、結果と一緒に引用すべきだ。チェックポイントは**18.8 GB**で「素のQwenの約2倍、ただし大半はゼロパディング」、小さなドライバ（`RvChat`）が必要で「まだ素の`generate()`では動かない」、命令ごとに数トークンを要するのでバッチ実行器はL4で毎秒約**3,200 CPUトークン**。モデル内ファイルシステムはさらに実験的で、ディレクトリ1024スロット、**512ファイル**・約**5.3万トークン**、会話間で変化した事実に対する正答率は**90%**（過去チャットを貼り戻すと**30%**）だが「まだ実験的」でブランチが別。ライセンスはバッジではなくファイルを読むべきだ。リポジトリは**MIT**に例外条項付き（「`games/roms`のCHIP-8 ROMは本ライセンスの対象外」）で、これがGitHubの判定が`NOASSERTION`になる理由。HFカードは`apache-2.0`。

[`🔗 Qwenputer——Qwen3.5の中の完全に機能する決定論的RISC-V CPU`](https://divagr.com/blog/qwenputer) · [`🔗 divagr18/qwenputer（コード、MIT＋ROM例外）`](https://github.com/divagr18/qwenputer) · [`🔗 Hugging Faceのdivagr1925/Qwen3.5-4B-Qwenputer`](https://huggingface.co/divagr1925/Qwen3.5-4B-Qwenputer) · [`🔗 Hacker Newsの議論（195 pts）`](https://news.ycombinator.com/item?id=50282838)

---

## 21. AlpineのGitLabは修正後も二日間攻撃された——修正がGitLabのバージョン番号に載らないRubyパッチだったからだ

- **Velocity:** ▮▮▮ trending
- **Source:** Alpine Linux セキュリティ告知 / Hacker News · 112 pts · 約4時間前（~07:45 UTC+8 10月29日）
- **Tags:** `gitlab` `cve` `ruby` `onigmo` `incident-response`

**CVE-2026-97229**はGitLab CE/EEの**CVSS 3.1 10.0**の未認証RCE——`AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H`、**CWE-190**（整数オーバーフロー）——で、「CI/CD設定に細工した正規表現」により未認証ユーザーがサーバー上でコードを実行できた。影響範囲は**19.2の19.2.8未満、19.3の19.3.5未満、19.4の19.4.2未満**で、GitLabは**10月12日**に修正版を公開した。根本原因はRuby内蔵の正規表現エンジン**Onigmo**にあり、修正は「GitLabが自前のパッケージに同梱するRubyへのパッチ群」だ。上流Rubyは**10月23日**に**3.3.13、3.4.12、4.0.9**で修正を出した。Alpineは**10月20〜21日**に新規登録アカウントから細工したCI設定を送られ、GitLabのワーカープロセスが**8回**クラッシュ、うち**4回**は攻撃者が「エクスプロイトの途中まで進み、次の段で失敗」した。攻撃者はAlpineのGitLabコンテナイメージも取得しており、「自分たちの正確なビルドに合わせてエクスプロイトを調整していたことを示唆する」。Alpineは**10月22日**に**19.3.6**へ更新し、**26日**に依然として脆弱だと判明。**27日**に開発者とビルドサーバー以外を締め出してゼロから再構築し、**28日**に全パスワードをリセットしてGitLabの鍵を差し替えた。

**Why it matters:** この事件から持ち出すべき文はAlpine自身のものだ——「**GitLabのパッケージではなく自前のRuby（ソースから、あるいは自前のコンテナイメージで）でGitLabを動かしているなら、GitLabのアップグレードだけでは足りない**」。19.3.6は修正済みの19.3.5より上なので、スキャナが行うバージョン比較はすべて通る。それでも脆弱性は残る。修正されたコンポーネントがリリースに**同梱されて**いて、リリースに**名指しされて**いないからだ。これは本誌10月23日の「修正済みとは三つの別物」という教訓がディストリビュータに落ちた形で、告知文・パッケージ版・実際に入っているバイト列が分離した。さらに二点が異例に誠実で、引用に値する。第一にスコアの由来：NVDの状態は`Analyzed`だが、**10.0はSecondaryスロットで出所は`cve@gitlab.com`**、`nvd@nist.gov`の指標はない——これは「追認」の場合で、NVDは記録を分析しCNAの数値を再掲したのであって、独自のスコアを出したのではない。第二に、否定側の所見が「お墨付き」ではなく限界として書かれている——「成功したエクスプロイトはクラッシュも残さず、Webログにも痕跡を残さない」「攻撃当日のログの一部は失われている」「外向き通信のログは取っておらず、ホスティング事業者も取っていない」。再構築はこの文に対する正しい応答であって慎重すぎる対応ではない。そしてパッケージ検証こそ複製可能な作法だ——aportsのコミットを、攻撃者に触れられ得たサーバーではなく「ある開発者のクローンと全**45台のビルド機**」に突き合わせている。

[`🔗 Alpine Linux——GitLabセキュリティインシデント：CVE-2026-97229の悪用試行`](https://alpinelinux.org/posts/GitLab-security-incident-CVE-2026-97229.html) · [`🔗 CVE-2026-97229のレコード（NVDは`Analyzed`、唯一の指標はGitLabのCNA）`](https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-97229) · [`🔗 Hacker Newsの議論（112 pts）`](https://news.ycombinator.com/item?id=50282544)

---

## 22. 「Icepick」はOktaのシングルサインオン由来のDHS職員4.1万件——Oktaは何も侵害されていないと主張する

- **Velocity:** ▮▮▮ trending
- **Source:** WIRED / Distributed Denial of Secrets · 301 pts · 公開 2026-10-28T16:00Z（~20:00 UTC+8 10月28日）
- **Tags:** `breach` `dhs` `okta` `leak` `surveillance`

**Distributed Denial of Secrets**は**10月28日**、**「Icepick」**と名付けたアーカイブを公開した。「米国国土安全保障省（DHS）の**4.1万人**を超える職員を特定する内部データベース。このデータベースはDHSが使う**Okta**のシングルサインオンサービス由来で、職員の……」WIREDの再構成では「**4.1万人**を超える職員または請負業者」、DHS本体と七つの構成機関にわたり、最終更新は**2026年8月19日**。中身はメールアドレス、電話番号、執務室の住所に加え、「内部システムや、おとり捜査・監視プログラムに関する機微情報への参照」。WIREDの集計では**CBP**が半数超、**ICE**が約**1万人**（約3分の1がHSI＝国土安全保障捜査局）、**USCIS**が約**6,200人**、**CISA**が約**1,000人**で半数以上が請負——合わせて省の労働力のおよそ**7分の1**にあたる。最も際立つのは権限グループだ。HSIでは十数か所の外勤オフィスにまたがる**39人**が、法廷文書が「認定おとり捜査（certified undercover operation）」と定義する「**CUC**」を含むグループに所属している。ほかに「Keyhole」（法廷文書によればHSIが今年ミネアポリスの抗議団体を監視する資金源とした認定おとり捜査）、「**Communications Intercept Center TechOps (CICTO) Program**」、「**Title III Intercept Program**」（盗聴）、「**Illicit Sensor Intercept Program (ISIP)**」への参照がある。**Okta**はWIREDに「自社システムへの侵害は把握していない」「Oktaは安全で、データやシステムが侵害された証拠はない」と述べた。

**Why it matters:** 二つの主張の食い違いこそが記事であり、どちらも証拠を公開していない。「Oktaのシングルサインオンサービス由来」はデータが**どこにあったか**を述べ、「Oktaのシステムは侵害されていない」は別の文——Okta自身の境界——を述べている。あるテナントの設定ミスや過剰な権限のディレクトリエクスポートは、二番目の文と矛盾せずに一番目を生む。この区別は正確に保つ価値がある。反射的にベンダーの否定を漏洩事実の反証と受け取るのが常だからだ。単なる連絡先リストより悪いのは役割の分布である。普通の組織図では氏名と内線の価値は低いが、この表では同じ項目が**誰が**認定おとり捜査に属し、外勤オフィスが**どこに**あり、**どの**盗聴プログラムに紐づくかを同時に指し示す。WIREDの「このアーカイブはDHSがどう組織されているかの地図を与える」という表現は正確だ。本文ではなく分析に入れるべき背景：DDoSecretsの公開は**ShinyHunters**がFBI職員ほぼ全員分を窃取したと主張した後のことで、しかもDHS自身が匿名利用者の特定、抗議者の顧客記録の取得、「人肉検索」の定義を氏名や役職といった基本事実にまで広げる動きを進めている最中だ。つまりこの資料は安全保障上の失敗であると同時に政治的行為でもあり、どちらの読みも報道が提供しているもので、私が持ち込んだものではない。

[`🔗 WIRED——国土安全保障省職員4.1万人の大規模漏洩`](https://www.wired.com/story/massive-leak-exposes-41000-homeland-security-workers-including-undercover-ice-agents/) · [`🔗 DDoSecrets——「Icepick」公開ページ（2026-10-28 16:00）`](https://ddosecrets.org/) · [`🔗 Hacker Newsの議論（301 pts）`](https://news.ycombinator.com/item?id=50280864)

---

## 23. CISAはKEVに2.7を追加した——VMwareの5件のCVEからなる告知で最高9.8のうちの最低値

- **Velocity:** ▮▮ rising
- **Source:** CISA KEV / NVD / Broadcom VMSA · KEV追加 2026-10-28 · SSVCタイムスタンプ 2026-10-28T19:50Z
- **Tags:** `vmware` `cve` `kev` `ssvc` `logging`

**CVE-2026-41709**は**10月28日**、CISAの既知悪用脆弱性カタログに期限**11月11日**で追加された。「ログ記録の不備」——**CWE-778**——で、「悪意ある管理者がこの問題を悪用し、記録されないまま特定の操作を行える」。Broadcomの評価は**CVSS 3.1 2.7（Low）**、`AV:N/AC:L/PR:H/UI:N/S:U/C:N/I:L/A:N`で、告知にもそう書かれている。「Broadcomはこの問題の深刻度を**低**の範囲、CVSSv3基本値最大2.7と評価した」。これは**VMSA-2026-0006.2**（**7月29日**発行、**8月19日**最終更新）の5件のCVEの一つで、他は最大**9.8**、告知全体の深刻度は「**Critical**」、「CVSSv3範囲：2.7–9.8」と印刷されている。修正版は製品ラインごとに示される——`ESXi-9.1.0.0-25370933`、`ESXi-9.0.2.0100-25595025`、`ESXi80U3j-25429389`、VCF 5.2.4、Telco Cloud向けKB449886。記録に謝辞が載る報告者は**CrowdStrikeのIan Barton**。

**Why it matters:** 本誌が報じてきたKEV項目はどれも、緊急性を説明する数値を伴っていた。これは問いを反転させる。記録は**90日**前（7月30日）に公開され、NVDの状態はまだ**`Undergoing Analysis`**で**`nvd@nist.gov`の指標はない**——唯一のスコアはBroadcomのものでSecondaryスロットにある——つまり三か月間、このバグの公開評価は「2.7、低、管理者限定」だけだった。変わったのはスコアではなく**CISA-ADPのSSVC**で、`2026-10-28T19:50:06Z`の評価は`exploitation: **active**`、`automatable: no`、`technicalImpact: partial`。興味深いのはこの形だ。何も破壊しないので**影響**スコアはほぼゼロなのに、**悪用**は現に起きている。記録を残さずに動ける悪意ある管理者は、それを捕まえる唯一の制御をすでに無効化しているからだ。これはスコアリングの誤りではなく「CVSSが測っている軸が違う」事例として読むべきだ。さらにこの告知が生む合成物に注意——同じ文書で、深刻度バナーはCritical、KEVに載った唯一のメンバーはLow。これは本誌が10月25日にHPEのArubaOS告知で指摘した「ラベル対スコア」の混同そのもので、しかもここではベンダー自身の二つの数値が7.1ポイント離れている。

[`🔗 CISA KEVカタログ（CVE-2026-41709、2026-10-28追加、期限2026-11-11）`](https://www.cisa.gov/known-exploited-vulnerabilities-catalog?field_cve=CVE-2026-41709) · [`🔗 Broadcom VMSA-2026-0006.2（5件、2.7–9.8、対応マトリクス付き）`](https://support.broadcom.com/web/ecx/support-content-notification/-/external/content/SecurityAdvisories/0/38017) · [`🔗 CVE-2026-41709のNVDレコード（Undergoing Analysis、CISA-ADPのSSVC）`](https://nvd.nist.gov/vuln/detail/CVE-2026-41709)

---

## 24. DellはData DomainのCVEを一度に33件公開した——4件が9.8、そしてNVDは一件も分析していない

- **Velocity:** ▮▮ rising
- **Source:** NVD API / Dell DSA-2026-416 · 33件すべて 2026-10-28T09:17Z 公開
- **Tags:** `dell` `powerprotect` `cve` `backup` `cna-assigned`

**DSA-2026-416**はDell PowerProtect Data Domain、Data Domain Virtual Edition、APEX Protection Storage、Data Domain Management Centerをまとめて扱う一本の告知だ。ページには**179個の異なるCVE ID**が引かれ、その大半はDellが同梱するサードパーティ製コンポーネント（Apache HTTP Server、lodash、rsync、libpq5、helm、nginx、libexpat、Pillow、libtiff5、tar、suseconnect、Apache Tomcat、iDRAC9）。Dell**自身の**CNA（`security_alert@emc.com`）は**10月28日09:17Z**の一度のプッシュで**33件**のレコードを立てた。スコア分布は一様ではなく二峰性だ——**9.8が4件**、**9.6が2件**、9.1が1件、8.8が3件、そこから**2.7**まで長い裾が続く（その帯に4件）。二つの9.8は同じ数値の下の別々のバグである。**CVE-2026-86397**は**CWE-862**「認証の不備……**特権アカウントの作成**につながる」、**CVE-2026-86400**は**CWE-287**「**root権限での任意コマンド実行**につながる」で、どちらも「リモートアクセスを持つ未認証の攻撃者」。9.1の**CVE-2026-90717**は異色で、低権限（`PR:L`）を要するがスコープ変更（`S:C`）があり、Dell自身の説明は「他の管理下のData Domainシステムに影響し得る」としている。修正はラインごと——機能リリース**8.9.0.0**、LTS2024は**7.13.1.90**、8.3.1.x／8.6.1.xの各LTS。

**Why it matters:** この告知で最も有用な文はスコアではなく免責で、表の上にあるため飛ばされやすい——「**本記事はすべての製品バージョンを特定しているわけではない**」。179対33の差と合わせると、告知で自分の機種を検索した人は機種が載っているのを見るが、追跡すべきCVE IDは**別の**Dell文書に属する、ということになる（サードパーティ製コンポーネントはDSA-2026-312など各リンク先の行で修正される）。第二は出所で、ここは一様だ。**33件**すべてが**`Awaiting Analysis`**で**`nvd@nist.gov`の指標を持たない**。つまりここにあるスコアはすべてDellのもので、そのまま再掲されている。9.8については算術が自明なので問題は小さいが、2.7〜5.3の12件については「ベンダーが軽微だと言っている」という誰も検証していない判断だ。そしてこの資産クラスこそが「特権アカウント作成」を二度読むべき理由になる。バックアップアプライアンスは保護対象のシステムに対して認証を行うので、Data Domainのrootは単一ホストではなく、本来復元するはずのデータに到達する資格情報なのだ。

[`🔗 Dell DSA-2026-416——PowerProtect Data Domainの複数脆弱性`](https://www.dell.com/support/kbdoc/en-us/000515178/dsa-2026-416-security-update-for-dell-powerprotect-data-domain-multiple-vulnerabilities) · [`🔗 CVE-2026-86400のレコード（9.8、CWE-287、`Awaiting Analysis`）`](https://nvd.nist.gov/vuln/detail/CVE-2026-86400) · [`🔗 CVE-2026-86397のレコード（9.8、CWE-862）`](https://nvd.nist.gov/vuln/detail/CVE-2026-86397)

---

## 25. インテリジェンス指数v5が非公開問題群でリーダーボードを作り直す——オープンウェイト差は3点から12点へ

- **Velocity:** ▮▮ rising
- **Source:** Artificial Analysis / Hacker News · 91 pts · 約25時間前（~11:06 UTC+8 10月28日）
- **Tags:** `benchmark` `artificial-analysis` `leaderboard` `open-weights` `contamination`

**Artificial Analysis インテリジェンス指数 v5**が公開された。「**新規2ベンチマーク、アップグレード3件**」で、記事自身の言葉によれば「指数の**過半が初めて非公開データセットで**構成される」——**60%**が「非公開テストセットまたはホールドアウト解答による評価」。新規は**FrontierCode 2.0**（Cognitionの非公開ベンチマーク、実在のオープンソースリポジトリ**132タスク**、「メンテナがエージェントの変更をマージするか」で採点、各タスクをAAのハーネスで**3回**実行）と**Terminal-Bench-Science**（ターミナル環境でのエージェント科学研究**70タスク**）。更新は**HLE-Diamond**（精製版Humanity's Last Exam、**1,000問**、推論と知識を半々）、**AA-Omniscience v1.1**、**CritPt v2**（非公開の**40問**の難問サブセット——「研究水準の物理70問から、公開時に7つのフロンティアモデルが5回とも正解した30問を除いたもの」）。削除はGDPval-AA v2.1、SciCode、AA-LCR v1.1。重みは各25%の四象限：ナレッジワーク、コーディング、科学、一般。結果は**Claude Opus 5.5（max）58**、GPT-6 Astra 57、GPT-6.1 Sol 55、**Gemini 4 Argon 50**。

**Why it matters:** この改版は本誌が繰り返し引用してきた数値を変える。しかも再スケーリングではないので、v4.3のスコアはv5と比較できない。持ち帰るべきは三点。**オープンウェイト差は3点から12点に拡大**した。**Kimi K3.1 Pro**が**46**で最高のオープンモデルだが**重みは未公開**。実際にダウンロードできるものでは**DeepSeek V4.1 Flash 1017（max）**と**GLM-5.3（max）**が**32**で、「Claude Haiku 5.5（max, 36）より下」だ。これは本誌10月5日のDeepSeek報道が示唆した姿より明確に悪く、しかも特定の週の不調ではなく非公開問題群の産物である——差が最大なのは最新の非公開評価であるHLE-DiamondとTerminal-Bench-Scienceだ。**コストはスコアから切り離された**。GPT-6.1 Solは首位から4点差で1タスク**1.27ドル**、首位は**10.04ドル**。上位10モデル間の差は「**13倍**超」で、最も高いFable 5.1は**13.04ドル**。そして**努力設定はモデル選択より大きなレバー**になった。Opus 5.5は低設定**35**から最大**58**へ、コストは**10倍**。Sonnet 5.5の低〜最大の幅は20点から**29点**に広がった。ページ自身の正直な注記はこうだ——「v5は9つの評価すべてで大きな伸びしろを残しており、全項目を制するモデルは一つもない」。Opus 5.5が3項目を取り、残る6項目を他の5モデルが分け合っている。

[`🔗 Artificial Analysis——インテリジェンス指数v5の発表`](https://artificialanalysis.ai/articles/artificial-analysis-intelligence-index-v5) · [`🔗 Hacker Newsの議論（91 pts）`](https://news.ycombinator.com/item?id=50268868)

---

## 26. Cloudflareが脆弱性ハーネスの土台となったskillを公開——自らの原則は「1回の実行で見つかるのは約半分」

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending（週間）/ GitHub API · 今週16,002 stars · 累計51,835
- **Tags:** `agent-skill` `security-audit` `cloudflare` `harness` `vulnerability-hunting`

**cloudflare/security-audit-skill**は「Cloudflareの脆弱性発見ハーネスの種になったskill」で、「それが進化してきた単一リポジトリの出発点」として公開された。6段階で走る——偵察（`architecture.md`と`coverage-ledger.json`を書く）、カバレッジ台帳主導の狩り（「隔離されたハンター」を配置）、候補の検証、`findings.json`への構造化出力、独立した記録検証、ターゲット非依存の報告——そして段階の境界で依存ゼロのNodeバリデータ2本（`validate-coverage-ledger.cjs`、`validate-findings.cjs`）を走らせる。判定語彙そのものが設計だ。「`confirmed`は完全な出所の追跡と有界な観測結果を持ち、`needs_validation`は厳密に未解決の事実を持ち**深刻度を持たない**、`rejected`は反証された候補を記録する」。リポジトリは**51,835 stars**、**3,299 forks**、**195 watchers**、**MIT**、トラッカーは**issue 35件・PR 67件**に分かれる。同時に**45日間動いていない**——最後のコミット「Clarify guidance and full audit modes」は**2026-09-14**——そしてその元になったCloudflareのブログ記事は**2026-06-18**付だ。

**Why it matters:** 設計原則こそが成果物で、うち三つは助言ではなく主張だ。「**敵対的検証**：発見を検査するエージェントは、発見したエージェントであってはならない」は「レビューの独立性」をハードルールにしたもの。「**多層防御の穴は脆弱性ではない**：A層が攻撃を止めているなら、B層の不在は強化メモにすぎない」は、自動スキャナがほとんど引かない線引きで、出力スキーマに第三の判定として`needs_validation`が必要な理由でもある。そして自社製品に不利な一文：「私たちのテスト実行では、**1回の実行で見つかるのは反復実行の合計のおよそ半分**だった」——自ら開示した再現率の上限で、こうしたskillが通常売り込まれる数値の誠実な形だ。導入前に要件リストを読むべきだ。これはlinterではない。「OSが強制するサンドボックス……外部ネットワークを無効化し、最小化した許可リスト環境を使い、リソース制限を課し、書き込みを割り当てられたスクラッチパスに限る」ことを求め、「これらの制御がない場合、ワークフローは対象コードを実行せず、リードを`needs_validation`のまま保持する」と明記している。割り引くべきは星の速度だ。**今週16,002 stars**なのに、9月中旬以降誰もプッシュしておらず、ローンチ記事は6月——これは配布イベントであってリリースではなく、本誌が今朝`ai-design-skills`で指摘したのと同じ乖離である。

[`🔗 cloudflare/security-audit-skill`](https://github.com/cloudflare/security-audit-skill) · [`🔗 Cloudflare——自分で脆弱性ハーネスを作る（2026-06-18）`](https://blog.cloudflare.com/build-your-own-vulnerability-harness) · [`🔗 SKILL.md`](https://github.com/cloudflare/security-audit-skill/blob/main/SKILL.md)

---

## 27. MuPDFのAES-256ファイル鍵は9ビットのエントロピーしかなかった——512候補、11ミリ秒、パスワード不要

- **Velocity:** ▮▮ rising
- **Source:** v12.sh / Hacker News · 97 pts · 約7時間前（~04:51 UTC+8 10月29日）
- **Tags:** `cryptography` `pdf` `mupdf` `foxit` `randomness`

V12の**Rick de Jager**は「複数のPDF実装が、列挙可能なほど小さな状態空間からAES-256ファイル鍵を生成している」ことを見つけた。機構は暗号の破られ方ではなく乱数のバグだ。**MuPDF 1.28.5以前**は`drand48`を`time(NULL)`で一度だけ種付けし、`fz_memrnd()`が`fz_lrand48(ctx) >> 17`を`unsigned char`にキャストして1バイト取るため、「出力バイトはすべてLCG状態の**17〜24ビット目**から来る」。上位ビットは下位へ桁下がりしないので、出力に影響できるのは25ビット、下位16ビットは`0x330e`に固定され、「**タイムスタンプの9ビットだけが意味を持つ**」。512秒ずれたタイムスタンプは同一の鍵ストリームを生む。空間は**512**候補で、最適化していないPythonでも「約**11ミリ秒**」で探索でき、文書の`/ID`が平文の照合に使える。**Foxit PDF Reader 2026.1.3.36551**は鍵を`SHA-256(uint32_le(time(NULL)) || <32個の未初期化バイト> || "there")`として導出し、その未初期化バイトは「実際にはゼロ埋めで、乱数性を一切加えない」。`/Perms`ブロックが既知平文を与えるので、「1回のハッシュと1回のAESブロック復号、パスワードハッシュも文書復号も不要」で候補を検査できる。Rust実装はRyzen 9 7950Xで毎秒**3.7〜3.76億**のタイムスタンプを処理し、10年分が**0.84秒**、1970年以降の全走査が**4.85秒**。**OpenPDF 3.0.5**と**iText 9.7.1**はいずれもARC4の`IVGenerator`を通し、「ミリ秒タイムスタンプとJVMの空きメモリで種付け」され、同じストリームがファイル鍵と`/U`・`/O`に平文で置かれる32バイトのソルトを生成する。

**Why it matters:** これをバグの一覧ではなくパターンにしているのは、失敗の向きだ。記事の言葉どおり「ユーザーのパスワードから導出する旧来のファイル鍵に対する**セキュリティ強化**のはずが、実際には**より弱い**鍵を生んだ」——リビジョン6のAES-256はパスワード由来の鍵をランダム生成鍵で置き換えたが、そのランダム性は置き換えたパスワードより悪かった。最も再利用可能なのは出自だ。Foxitの形は「**PDFiumの最初の公開コミット**」（2014年5月）にすでに存在し、「ファイルヘッダは元のコードをFoxitに帰している」。つまり20年前の鍵導出が、PDFiumを継承したすべてのエディタから配布されている。修正の境界線は方針文に写すべき一文だ。「これらの問題はベンダーに開示され、MuPDFの場合は修正された。しかし**すでに公開されたコピーを遡って保護することはできない**ので、これらのバグは今も影響し得る」。そして修正は、その枠組みが示唆する一行の変更では**ない**——MuPDF自身のソースで実測すると、`1.28.0` はなお `drand48`／`lrand48` を使い、**`1.28.5` は `fz_memrnd` を44バイトの `getentropy` バッファで種付けする ChaCha20 ストリーム暗号へ置き換えている**——つまりこれは**生成器の差し替え**であり、いずれにせよ恒久的な負債である。それが生んだ成果物はすでに流通し、復号器は公開されているからだ。

[`🔗 V12——9ビットAES鍵の事件`](https://v12.sh/blog/the-case-of-the-9bit-aes-key) · [`🔗 Hacker Newsの議論（97 pts）`](https://news.ycombinator.com/item?id=50280722)

---

## 28. AnthropicがCoworkプラグイン11本を公開——3.37万スター、未処理153件、リリースタグはゼロ

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending（週間）/ GitHub API · 今週2,612 stars · 累計33,682
- **Tags:** `anthropic` `cowork` `plugins` `mcp` `agent-skills`

**anthropics/knowledge-work-plugins**は「主にナレッジワーカーが**Claude Cowork**で使うことを想定したオープンソースのプラグインリポジトリ」で、`claude plugin marketplace add anthropics/knowledge-work-plugins`でClaude Codeにも導入できる。**11本**のプラグインを提供する——productivity、sales、customer-support、product-management、marketing、legal、finance、data、enterprise-search、bio-research、cowork-plugin-management——それぞれが「特定の職能向けのスキル、コネクタ、スラッシュコマンド、サブエージェント」を束ねる。具体的なのはコネクタの一覧だ。営業はSlack、HubSpot、Close、Clay、ZoomInfo、Notion、Jira、Fireflies、Microsoft 365に接続し、財務はSnowflake、Databricks、BigQuery、生物研究はPubMed、bioRxiv、ClinicalTrials.gov、ChEMBL、Synapse、Open Targets、Benchlingに接続する。コンポーネントはすべて「ファイルベース——MarkdownとJSON、コードもインフラもビルド手順もない」で、レイアウトは`.claude-plugin/plugin.json`、`.mcp.json`、`commands/`、`skills/`に固定されている。作成**2026-01-23**、最終プッシュ**2026-10-28**、**33,682 stars**、**3,703 forks**、**203 watchers**、**Apache-2.0**、**issue 92件・PR 61件**、そして**リリースはゼロ**。

**Why it matters:** これは「エンタープライズ向けエージェントの表面とは何か」についてこれまでで最大の公開された主張であり、その形自体が主張だ——職能で切った11の束はどれも、企業が既に持つSaaS資産を包む薄い層で、つまりこのプラグインの実体は**説明文付きのMCPコネクタ・マニフェスト**である。これは近ごろのskillリポジトリが残した問いに答える。持続する単位は`SKILL.md`ではない（本誌はこれまで、成果物がMarkdown1枚で星だけが配布イベントだったリポジトリを5つ報じてきた）。**職能の境界とツール一覧の組**であり、それこそがセキュリティチームがレビューできる組み合わせだ。空白は二つ。**リリースがない**ので`main`が唯一のリリースであり、「マーケットプレイスから導入」はブランチについての文だ——その他は毎日保守されているApache-2.0リポジトリに対する標準的な注意。そしてREADME自身の言い回しが上限を定めている。「これらのプラグインは汎用の出発点だ。会社が実際にどう動いているかに合わせてカスタマイズして初めて、はるかに有用になる」——汎用の法務・財務プラグインが符号化しているのは誰かの業務プロセスで、ただそれはあなたのものではない。その差が責任の所在だ。各プラグインが`.mcp.json`経由でCRMやデータウェアハウスへの有効な資格情報を持つことを考えれば、レビューすべきはそのファイルであり、スキル群ではない。

[`🔗 anthropics/knowledge-work-plugins`](https://github.com/anthropics/knowledge-work-plugins) · [`🔗 Claude Coworkのプラグインディレクトリ`](https://claude.com/plugins/) · [`🔗 GitHub Trending（週間）`](https://github.com/trending?since=weekly)

---

## 29. AlpineBSDはAI由来の審査を`apk`に実装した——4つのリポジトリ、6つのメタデータタグ、そしてそのどれも出荷済み索引には無い

- **Velocity:** ▮▮ rising
- **Source:** wiki.alpinebsd.org / Hacker News · 188 pts · 約14時間前（~22:30 UTC+8 10月28日）
- **Tags:** `ai-policy` `netbsd` `alpine` `package-manager` `provenance`

**AlpineBSD**は**NetBSDカーネル**を土台に、ユーザーランドを「Alpine Linuxに着想を得た」新OSだ——`apk-tools`、`busybox`、BSD makeよりGNU makeを好み、initは`s6`でOpenRCを追加予定——その公表された目的は「**AIが生成したソフトウェアを可能な限り使わずに済む**ようにすること」。仕組みは方針ページではなく**リポジトリの分割**にある。4つのリポジトリが異なる許容度を持つ。`base`と`main`は「Clean」、`tainted`は「Tainted」、`community`は「Clean および／または tainted な依存」で、「依存関係はこの表を上へ流れるので、communityはtaintedに依存できるが逆はできない」。生成AIツール（LLMなど）の出力が「コード、ドキュメント、バイナリ、その他の資産の**いずれかの部分**に含まれる」ソフトは「われわれの目的では**汚染（tainted）**とみなす」。パッケージは来歴メタデータを持つことになっているが、ページが`apk search`の絞り込み用に挙げるタグは3つではなく**6つ**だ——`genai:clean`、`genai:pinned`（「最後の非汚染バージョンに固定」）、`genai:indirect-build`（「ビルド時依存を通じて間接的に汚染」）、`genai:indirect-runtime`（「実行時依存を通じて間接的に汚染」）、`genai:indirect-check`（「テストスイート依存を通じて間接的に汚染」）、`genai:tainted`。**2026-10-29 20:25 UTC+8 の一次確認：6つのどれも4リポジトリの`APKINDEX`には現れない**——`base` **427**、`main` **153**、`community` **85**、`tainted` **108** パッケージで`genai:`フィールドは **0**——つまり今日の`apk search genai:clean`には一致する対象が無い。`apk add`の拒否自体は実在するが、走るのは別の機構である：**リポジトリタグ**（`/etc/apk/repositories`で`tainted`を`@tainted …`として有効化する）が、間接汚染の依存を、明示的に指定するまでエラーに変える（`apk add python3@tainted`）。

**Why it matters:** AI来歴の規則を、ライセンス条項ではなく**依存制約**として表現したパッケージマネージャを私は初めて見た。そして6つのタグこそ設計が現れる場所だ——ただし本チェック時点では、それらはメタデータではなく文書である。`genai:indirect-build`が存在するのは、汚染が実行時入力だけでなく**ビルド**入力を通じて伝播するからで、これは多くのサプライチェーン方針が飛ばす区別である。`genai:pinned`は、きれいなパッケージが次の上流リリースで汚染され得ることを認めている——**時間依存**の判定で、どのライセンスも表現できず、現在どのSBOMフィールドも保持していない。制約は同じページにあり、設計と一緒に引用すべきだ。「AlpineBSDは**開発中**であり、現在**利用できるインストーラはない**」。ハードウェアの警告は異例に率直で、NetBSDカーネルは「ハードウェア対応がまばらで、Linuxよりはるかに劣る。手元の適当なコンピュータで動くとは限らない」。誰かがこれを模範として引用する前に、強制できない境界も指摘しておく。規則が測るのは**ツールが何を出力したか**なので、メンテナがレビューして書き直したモデル支援の作業は汚染とされ、モデルの提案を記憶から書いた人のコードはそうならない——この方針はパッケージ境界では監査可能で、執筆の現場では沈黙している。

[`🔗 AlpineBSD wiki`](https://wiki.alpinebsd.org/) · [`🔗 AlpineBSDのAIポリシー（リポジトリの許容度、`genai:*`メタデータ）`](https://wiki.alpinebsd.org/ai-policy) · [`🔗 Hacker Newsの議論（188 pts）`](https://news.ycombinator.com/item?id=50274251)

---

## 30. CartesiaのH-NetはバイトをBPEと競合させる——検証損失1.3倍、コード2倍、SmolLM3に対して10倍超

- **Velocity:** ▮▮ rising
- **Source:** Cartesia Research / Hacker News · 45 pts · 公開 2026-10-28
- **Tags:** `tokenization` `byte-level` `scaling-laws` `mamba` `research`

Cartesiaは**階層ネットワーク（H-Nets）**に関する2回連載の第1回を公開した。BPEトークナイザを使わず、バイトレベルのモデルが自らチャンクを学ぶ——「トークナイザのような手作りされた符号化段階は……生データからエンドツーエンドで学ぶ能力を著しく妨げる」。比較は対照に厳密だ。英語／コード／数学／多言語の**70/20/5/5**を**バイト数**で測り、すべてのサンプルを「バイトとBPEトークンの両方として、同じ境界で分割して処理」し、指標は標準の**bits-per-byte**。そして——ここがヘッドラインを割り引く部分——**コーパス内でBPEトークナイザを再学習**しており、それだけで「検証損失と下流評価の双方で約**1.1倍**の計算利得をもたらした（つまり既製の標準トークナイザと比べればH-Netの計算倍率はさらに大きくなる！）」。この厳しいベースラインに対して、トークナイズだけをバイトレベルのH-Netに置き換えると検証損失**1.3倍**、コード**2倍**、分布外**2倍**、「ドメイン外コードでは最大**5倍**」。第2回は**SmolLM3**に対して規模を上げ、「**10倍超**の計算・データ効率」を報告、パラメータは**3.67B**対**3.08B**、計算は「**2% FLOPs/byte**以内」で一致させている。

**Why it matters:** これを読めるようにしているのは比較のアンカーで、記事自身が用意している——Kimiが公表した**Kimi Delta Attention（1.16倍）**と**注意残差（1.25倍）**の倍率に自分を当てている。2026年にアーキテクチャの主張を位置づける正しい方法はこれで、見出しの数字に当てることではない。コストは隠さず書かれている。外側のエンコーダとデコーダが「H-NetのFLOPsの約**43%**を占める（トークン化Transformerでは埋め込みとLMヘッドが**8%**）」、主ネットワークは約**7.6倍**の圧縮を見る（Llama-3の1トークン約4.5バイトに対し）ので、節約は本物だが新しい層に使われ、貯金にはなっていない。最も誠実な限界は方法論的で、名指しされている。「すべての軸を一致させることは**不可能**だった。パラメータと計算が非常に異なる形で費やされるからだ」。そこでFLOPs/byteを統制軸に選んだ——つまり3.67B対3.08Bというパラメータ差は、計算一致では相殺できない実費だ。バイトがフロンティア規模でBPEに勝つかは未決着だが、この記事が確立したのは、3B規模でトークナイザの利点を取り除いたとき、その差はノイズではないということだ。

[`🔗 Cartesia——トークンからバイトへ I：階層ネットワークのスケーリング`](https://www.cartesia.ai/blog/from-tokens-to-bytes-part-1) · [`🔗 Hacker Newsの議論（45 pts）`](https://news.ycombinator.com/item?id=50278253)

---

## 31. Concordatはエージェントのプロトコルを型システムとして強制する——ベースラインは50タスク中13件で確認を飛ばした

- **Velocity:** ▮ steady
- **Source:** arXiv 2610.37461 · 2026-10-27 投稿
- **Tags:** `arxiv` `agents` `type-systems` `session-types` `tau-bench`

**Concordat**は「エージェントを、そのインタフェースが**有限状態プロトコル**であるオブジェクトとして扱い、typestateやsession typesの精神で、そのプロトコルを実行時にモデルへ強制する」Pythonライブラリだ。結果を伴う行為を律する規則——「何かを変更する前に顧客の明示的な確認を得る」——は通常「プロンプトに書かれ、モデルが従うと選んだ範囲でのみ従われる」。Concordatは規則の置き場所を変える。毎ターン「**現在のプロトコル状態で合法な**ツールだけがモデルに提示され」、その集合外の呼び出しは「副作用を生む**前に**拒否され」、人間に留保された決定は「**要求することしかできない**」。プロトコルは定義時に検査され、「サブクラスが親のプロトコルを迂回し得る場合、そのサブクラスは**拒否される**。これはLiskov置換原則の振る舞い上の形態だ」。評価はtau-benchの航空会社50タスクに「**確認を飛ばすよう圧力をかける模擬顧客**」を加えて行う。標準のエージェントは「gpt-4.1で**50件中13件**、Claude Haiku 5.5で**128回のタスク実行中29回**、必要な『yes』なしに変更を加えた。Concordatのエージェントは**皆無**で、タスク成功率に有意差はなかった」。

**Why it matters:** 持ち出すべき数字は「50件中13件」ではなく次の文だ——「**tau-bench自身の報酬はこれらの違反のほとんどを検出しなかった**」。タスク完了だけを採点するベンチマークは、タスクを完了させたままのポリシー違反を見ることができない。つまり標準的な安全測定はこの失敗に対して構造的に盲目であり、しかもその失敗はジェイルブレイクではなく**顧客**によって誘発された。この「圧力」という枠組みが貢献そのものだ。エージェントは故障したのではなく**従った**のであり、本誌10月27日の「役に立とうとするエージェント問題」が反対側から描いた状況である。型システムという手は修正の形としても正しい。指示をプロンプトから——そこでは文脈の他のすべてと競合する——ツール一覧へ移すからだ。提示されていない呼び出しはそもそも発せられない。指示を無視するモデルにも破れない防御であり、「副作用を生む前に拒否」がフィルタではなく**順序の保証**として書かれている理由でもある。抄録が語らないのは二点。確認が実際に与えられプロトコルがその段階を許すタスクでの誤拒否コストと、航空会社50タスクに足した18タスクが「方針の改善」と「モデルが単に顧客を鬱陶しく感じただけ」を区別するのに足りるかどうかだ。

[`🔗 Concordat：LLMエージェントのための型付きセッション（arXiv 2610.37461）`](https://arxiv.org/abs/2610.37461) · [`🔗 全文（PDF）`](https://arxiv.org/pdf/2610.37461)

---

## 32. ClaimNovは偽装論文の97%を1.5%の誤検出率で捕まえる——旧来の検査は「丸ごと却下」しかできない

- **Velocity:** ▮ steady
- **Source:** arXiv 2610.36511 · 2026-10-27 投稿
- **Tags:** `arxiv` `novelty` `peer-review` `agents` `evaluation`

**「AI科学者は何が新しいかを知っているか」**は、AI研究パイプラインが生成したアイデアの新規性をどう判定すべきかを問う。著者らは「**提案レベルと主張レベルの双方**で**時間的な正解**を持つ新規性検査の評価のための分析枠組み」を作り、**1,060件の提案**からなる4つのデータセットを使う——「公開論文、査読者間の異議、そして後に分野が実際に発表したものと一致した生成アイデアから構築」。その正解で既存の検査を監査すると、こうなる。「非新規な仕事への高い却下率を持つ検査は、後に人間の研究者が実現したアイデアに対しても**高い誤検出**を出す傾向がある」、そして「提案を丸ごと評価するために作られた検査は、**提案全体を却下する**ことによってしか主張レベルの先行研究を指せない」。代替案の**ClaimNov**は「**1.5%**の誤検出率で偽装論文の**97%**を捕まえ」、「その主張レベルの新規性プロファイルはLLM審査員の誤検出を**11.8%から1.5%**へ下げる」。判定が主張レベルの証拠に基づくので、既存の貢献の上に築く提案を残せる——「貢献を査読者が争っているICLR採択論文のうち**3%**しか却下せず」、先行貢献を1つ接ぎ木した100件の新規提案のうち**91件**を残す（「最強の既存検査では**76件**」）。

**Why it matters:** ここでの決定的な失敗は精度ではなく**粒度**であり、本誌10月27日のエージェントskill退役の記事が反対側から見たのと同じものだ——成果物全体のスコアはどこが間違っているかを教えられない。提案全体を受理か却下かしかできない新規性ゲートは、生成ループの内側では使えない。「主張3は先行研究、主張1・2・4は新しい」に対する正しい動作は主張3を書き直すことで、提案レベルの判定は残り3つを一緒に捨てるだけだ。引用すべきは91対76の比較だろう。捕獲率を固定したまま**何が生き残るか**を測っており、それは研究パイプラインが実際に消費する量だからだ。抄録がやっていないのはこの検査の値段付けだ。ClaimNovは生成アイデアのふるい分けに走るのだから、提案あたりの遅延とトークンコストがループ内に置けるかを決める——そして1,060件での1.5%という誤検出率は小規模コーパスでの実測値であって、分野の移動につれて分布がずれていく中での約束ではない。

[`🔗 AI科学者は何が新しいかを知っているか（arXiv 2610.36511）`](https://arxiv.org/abs/2610.36511) · [`🔗 全文（PDF）`](https://arxiv.org/pdf/2610.36511)

---

## 33. Stack Overflowの月間質問数が1,000件を割った——そして8月はまだ線上だった

- **Velocity:** ▮ steady
- **Source:** Stack Exchange API クエリ / Hacker News · 191 pts · 約4時間前（~07:35 UTC+8 10月29日）
- **Tags:** `stackoverflow` `community` `metrics` `q-and-a` `decline`

Stack Exchange Data Explorerに投稿され、HNで「StackOverflowは今や月間質問数が**1,000件未満**」として取り上げられたクエリは、同サイトの質問量を開設以来の最低に置いている。私はSEDEのグラフ自体を開けなかった——このページは素の取得に対してCloudflareの「Just a moment…」インタースティシャルを返す——ので、以下の数値は**Stack Exchange APIの`total`フィールド**から取った。同じ基盤データで、クエリを書き換えずに再現できる。**2026年9月961件**、**8月1,019件**、**7月1,175件**に対し、**2025年10月5,263件**、**2025年9月5,072件**。規模の目安として**2020年10月**は**141,749件**を返した。

**Why it matters:** 見出しは正しいが、わずかにデータより先行しており、その差こそ残す価値がある。9月は最近の記憶で初めてこの線を下回った月だが、**8月は1,019件でまだ上だった**。だから正直な言い方は「直近の完全な月で傾向が1,000を越えた」であって、「このサイトは今や月1,000件未満」を定常状態として述べることではない——閾値に対する7パーセントの差と、持続する状態は同じ主張ではない。疑いの余地がないのは方向と規模だ。前年同月比**82%減**、2020年比**99.3%減**。しかもこれは製品そのものが「質問」であるサイトで起きている。二つの説明は両立し得て、この数字はそれを分離できない——一次回答がチャットモデルへ移ったこと、そして同サイトが初心者に対して敵対的であるという広く記録された性質だ。本誌10月26日の**レビュー信頼性**の記事は第三の説明になる。質問を罰する回答面は、他に何が利用可能であれ質問をより少なく産む。単位についても一言、本誌で繰り返し出る落とし穴だから——これは**質問**数であって、訪問数でも回答数でもない。質問を失いつつ歴史的コーパスのために読者を保つサイトは、まったく同じに見える。

[`🔗 Stack Exchange Data Explorer——投稿元のクエリ`](https://data.stackexchange.com/stackoverflow/query/1926661) · [`🔗 Stack Exchange API——月別の質問`total``](https://api.stackexchange.com/2.3/questions?site=stackoverflow&filter=total) · [`🔗 Hacker Newsの議論（191 pts）`](https://news.ycombinator.com/item?id=50282454)

---

## 34. LinkSwiftが1日1,616スター——理由はBaiduがCSSクラス名を変えたこと

- **Velocity:** ▮ steady
- **Source:** GitHub Trending（日間）/ GitHub API · 本日1,616 stars · 累計35,239
- **Tags:** `userscript` `chinese-oss` `scraping` `baidu` `maintenance`

**hmjz100/LinkSwift**——「JavaScriptベースのネットディスク用ファイルダウンロードアドレス取得ツール」——がGitHub Trendingに登場し、**本日1,616 stars**、累計**35,239**、**2,501 forks**、**90 watchers**、**AGPL-3.0**、作成**2022-08-10**、最終プッシュ**2026-10-27**。Tampermonkeyのユーザースクリプトで、8つの中国系クラウドストレージ——Baidu、Alibaba Cloud、China Mobile、Tianyi、Xunlei、Quark、UC、123——に対応し、「会員青春版」の拡張スクリプト群も同梱する。多くの利用者が入れる正式版は**2026-02-18のv1.1.3**で、すでに8か月前のもの。スクリプト自体は`raw/main`から導入する。引き金はリリースではなくトラッカーにある。**10月25日**に立てられたissue **#537**の表題は「百度网盘分享页改版导致「下载助手」按钮不出现（CSS选择器 `.module-share-top-bar` 已失效）」——Baiduが共有ページを作り直し、セレクタが一致しなくなって注入ボタンが出なくなった、というもの。**10月28日**に2本のPRが入り、その一つが「refactor: introduce download task adapters and userscript bridge」。未処理は**issue 38件に対しPR 11件**。

**Why it matters:** これはユーザースクリプトの保守モデルの自然な姿で、星の多さとリリースの少なさの両方を説明する。サイトの私的なDOMに一致させて動くツールの半減期は、そのサイトのデプロイ間隔で決まる。だからreleasesタブのバージョン番号はほとんど無意味で、利用者が実際に受け取る成果物は今朝`raw/main`にあるものだ。2月のv1.1.3は歴史的物件にすぎない。星の速度はライブラリ的な意味の採用ではない。**通知の仕組み**であり、3万5千人がセレクタの破損時にリポジトリを再発見する手段だ。Baiduが改版を出した週に数字が跳ねるのはそのためである。本誌のこの2週間の文脈に置けば、「Markdownファイル1枚で1万スター」というパターンの反例でもある——8年分のアダプタコード、活発なissueキュー、そしてユーザースクリプトには厳密には不要なライセンス選択（AGPL-3.0）を持つリポジトリだ。スクレイパーの健全性を監視する人への一般的な教訓：**リリースタグではなくissueトラッカーの速度を見る**。この種のソフトウェアでは、トラッカーが変更履歴そのものだからだ。

[`🔗 hmjz100/LinkSwift`](https://github.com/hmjz100/LinkSwift) · [`🔗 issue #537——Baiduの共有ページ改版が共有ページのセレクタを無効化`](https://github.com/hmjz100/LinkSwift/issues/537) · [`🔗 リリース（最新v1.1.3、2026-02-18）`](https://github.com/hmjz100/LinkSwift/releases)

---

## 35. テンセントのHy-SimulMTは話しながら通訳する——遅延約3秒、36の言語タグに言語ペアは1組

- **Velocity:** ▮ steady
- **Source:** Hugging Face / Tencent Hunyuan · 2026-10-26 公開 · 30B-A3B MoE、FP8
- **Tags:** `tencent` `simultaneous-translation` `speech-to-speech` `moe` `apache-2`

**Hy-SimulMT**はTencent Hunyuanのリアルタイム同時通訳モデルで、**2026-10-26**に**30B-A3B MoE、FP8**として**Apache-2.0**で公開され、**リアルタイムの声質クローニング**を備える（「話者の音声特性を保つ」）。「入力音声を連続的に受け取り、話者が話している間に翻訳し、翻訳テキストと音声の両方を生成する」。GitHubには推論（`SimulInfer`）と学習（`SimulTrain`）のツールがあり、音声出力とクローニングには別途設定したTTSサービスが必要だ。**RealSI**の長尺音声ベンチマークで「**StreamLAAL**約**3秒**、比較対象中で最低」を報告し、**GEMBA**スコアは比較したオープンソースモデル「および5つの商用APIのうち**4つ**」を上回る。4つの短文音声ベンチマークでは表が混在を示す。**FLEURS 90.3**に対しQwen3.8-LiveTranslate **88.4**、Gemini3.5-LiveTranslate **92.4**。**CoVoST2 75.5**に対しQwen **82.1**。**ACL6060 81.2**。**RealSI-Sentence 84.7**は表内最高。人間との比較には**新規収録の中国語・英語音声18本**（各約6分、10領域）と**通訳者6名**（CATTI1級3名、2級3名）を使い、「各級で3名のうち最高得点」を比較に用いた。

**Why it matters:** カードの注記は多くより良く、結果とともに引用すべきだ——「これらの知見は本テストで用いたサンプル、参加通訳者、評価設定にのみ当てはまる。音声品質、声質の類似度、その他の次元についての包括的評価を**構成しない**」。最後の節がここでは特に効く。声質クローニングが目玉機能なのに、評価はそれを一切測っていないからだ。カードが描いていない小さな読み方は二つ。**指標は名前の通りではない**——「StreamLAALは最初の音声出力までの時間と同じではない」。つまり3秒はストリーム上の平均遅延であって起動遅延ではなく、TTSパイプラインの初回音声時間とこの数字で比べることはできない。**言語被覆は36タグで1組**——カードの`language:`ブロックは`zh`、`en`から`ug`、`bo`、`kk`まで36コードを並べるが、冒頭の説明は「**中国語と英語の間の**双方向音声-to-音声翻訳」だ。タグはトークナイザかより広いHyファミリを指しており、36の対応ペアと読むのは誤り。そして表の組版慣習も習慣として覚えておく価値がある。「Hy-SimulMTの行全体を太字にして自社モデルを強調している」ので、その行内の太字は何も示さず、列をまたぐ最大値だけが比較可能だ。

[`🔗 tencent/Hy-SimulMT-30B-A3B-FP8 モデルカード`](https://huggingface.co/tencent/Hy-SimulMT-30B-A3B-FP8) · [`🔗 Tencent-Hunyuan/Hy-SimulMT（SimulInfer、SimulTrain）`](https://github.com/Tencent-Hunyuan/Hy-SimulMT)

---

## 36. MacBook ProがタッチスクリーンとタンデムOLEDを手に入れた——そしてチップの階段はメモリ帯域で逆転する

- **Velocity:** ▮ steady
- **Source:** Apple / Hacker News · 523 pts · 約11時間前（~01:10 UTC+8 10月29日）
- **Tags:** `apple` `macbook-pro` `m5` `hardware` `local-inference`

Appleは**MacBook Pro with PROLED XDR Display**を発表した。「画期的な**タンデムOLED**ディスプレイに**タッチ**、**ダイナミックアイランド**、再設計した冷却系、強化したオーディオ、より細い画面ベゼルを備える」。両サイズとも従来より軽く、14インチが**3.0ポンド**、16インチが**4.0ポンド**。バッテリーは「最大**24時間**」、**11月6日**発売で予約受付中。ハイライトが挙げるチップは**M5 ProとM5 Max**。一方、製品ラインの技術仕様ページは三つの異なる形のファミリを並べる。**M6**（12コアCPU、2スーパーコア／4パフォーマンスコア／6効率コア、12コアGPU、「最大**170 GB/s**」）、**M5 Pro**（15コアCPU、**効率コアなし**、16コアGPU、**307 GB/s**、18コアCPU／20コアGPUへ構成可）、**M5 Max**（18コアCPU、32コアGPU、**460 GB/s**、40コアGPU構成で**614 GB/s**）。メモリ上限はM6が16/24/32 GB、M5 Proが最大**64 GB**、40コアM5 Maxが**128 GB**。ストレージはMaxで最大**8 TB**。

**Why it matters:** 帯域の列は、このマシンがローカルでモデルを動かせるかを決める仕様であり、その順序は直感に反する。チップ名を階段と読む人は必ずつまずく。**M6は最大170 GB/s**なのに**M5 Proは307**、**M5 Maxは460〜614**——つまり数字の上で新しいチップが、本誌が追うワークロードでは速い方ではない。推論目的で14インチを買い「最新チップ」を選んだ人は、M5 Pro構成のおよそ3分の1の帯域しか得られない。コア構成もそれを裏づける。M5 ProとM5 Maxは**効率コアをまったく持たない**。アイドル時のバッテリーを連続スループットと引き換えにするノートブックであり、Apple自身のバッテリー値は動画再生であって混合負荷ではない。「PROLED XDR」を表示技術の主張として扱う前に二点確認したい。仕様ブロックは今も14インチに「Liquid Retina XDR display」、**3024×1964**、ProMotion最大**120 Hz**と書いているので、ブランド名とパネル名は同じ文字列ではない。そしてノートブックの**タッチスクリーン**はソフトウェア上の帰結を伴う変更だ。このプラットフォームが提供してきたAppKitのインタラクションモデルはすべて非タッチの表示を前提にしている。「タッチ」がハイライトに載ることは、OSがそれをどう使うかについての陳述ではない。

[`🔗 Apple——MacBook Pro with PROLED XDR Display`](https://www.apple.com/macbook-pro/proled-xdr-display/) · [`🔗 MacBook Proの技術仕様（チップと帯域の表）`](https://www.apple.com/macbook-pro/specs/) · [`🔗 Hacker Newsの議論（523 pts）`](https://news.ycombinator.com/item?id=50276940)

---

## 37. 時間変動性の高い事実は遅く学ばれ、最終的に7.3ポイント良い——36設定中34で成立

- **Velocity:** ▮ steady
- **Source:** arXiv 2610.37631 · 2026-10-27 投稿
- **Tags:** `arxiv` `pretraining` `data-curation` `knowledge` `evaluation`

**「事前学習中に何が良くなるのか」**は、異なる年のWebスナップショットで学習した**時点モデル（point-in-time models）**を使い、種類の異なる知識が事前学習の過程でどう獲得されるかを問う。道具は**時間変動性スコア（TVS）**で、「ある項目の負の対数尤度のモデル間での変動係数」と定義され、「スコアが高いほど、その知識が異なる年のWebテキスト間で一貫して表現されていない可能性を示す」。6つのベンチマークと複数のオープンソース系列にわたる6モデルの後、パターンはこうだ。「低TVSと高TVSの項目は学習**初期には同様に**学ばれるが、高TVSの項目は**後期に速く改善する**。事前学習の終了時点で、高TVSの項目は**36**のモデル×ベンチマーク設定のうち**34**で低TVSの項目を上回り、平均で**7.3ポイント**の機会正規化精度の優位を持つ」。そしてこの効果は「知識集約的なタスクで最も頑健で、**難易度が近い項目を比較した場合でも**そうである」。

**Why it matters:** この結果は「答えがコーパス中で変わった不安定な事実こそ、モデルが最も苦手とするノイズだ」という直感を反転させる。それを信頼できるものにしている対照は最後の節にある。比較は難易度をほぼ固定しているので、7.3ポイントは「易しい事実の方が高得点」ではない。著者らの機構は端点ではなく曲線と整合する。両クラスは初期に同じ速さで学ばれ、後期に分岐する——モデルがまず言語の安定した構造を当てはめ、その後にはじめて版依存の表層を保持する容量を得る、と予測される挙動だ。その表層は、モデルが**古い答え**と**新しい答え**の両方を見ていることを要求する。データ管理への含意は不快で有用である。ここで測られる時間変動性は**時間をまたぐコーパス**の性質なので、単一スナップショットで学習したモデルは更新を逃しているだけでなく、「更新」ということを教える学習信号そのものを逃している。限界はTVSがデータではなくモデルから計算される点で、候補コーパスをこれで採点するには学習1回分のコストがかかる——事前学習を理解するための診断量であり、抄録が枠づけているとおり、クロール結果に直接かけるフィルタではまだない。

[`🔗 事前学習中に何が良くなるのか（arXiv 2610.37631）`](https://arxiv.org/abs/2610.37631) · [`🔗 全文（PDF）`](https://arxiv.org/pdf/2610.37631)

---

## 38. CiscoのSSL VPNゼロデイが実環境で悪用されている——8.6はベンダー自身の算術、そして5万1千台のASAが今もインターネットに応答している

- **Velocity:** ▮▮▮ trending
- **Source:** Cisco PSIRT / NVD / BleepingComputer · アドバイザリ公開 2026-10-28 19:15 GMT
- **Tags:** `cisco` `zero-day` `cve` `ssl-vpn` `denial-of-service`

**CVE-2026-76418**はCisco Secure Firewall ASAおよびFTDソフトウェアのRemote Access SSL VPNサービスにおけるサービス拒否の欠陥であり、Ciscoのアドバイザリのヘッダーは重要な2つの事実を並べて掲げている。**「First Published: 2026 October 28 19:15 GMT」**、そして**「In October 2026, the Cisco PSIRT became aware of active exploitation of this vulnerability.」**機構は正確に述べられる程度に狭い。トンネルグループで`webvpn`が有効かつ**二次認証**が設定されている構成を必要とし、アドバイザリの原因行は「logic errors when secondary authentication is configured on a tunnel group」だ。SSLリモートアクセスVPNへの細工されたリクエストがデバイスをリロードさせる。Cisco自身の数字は**CWE-690**（戻り値の未検査）と**CVSS 3.1基本値8.6**、`AV:N/AC:L/PR:N/UI:N/S:C/C:N/I:N/A:H`——機密性と完全性は無傷、可用性はHigh、スコープはChanged。**「Version 1.0: Final」**であり**「No workarounds available」**、名指しされた緩和策は`DefaultWEBVPNGroup`またはユーザー設定のトンネルグループリストで二次認証を無効にすることだ。BleepingComputerの記事は露出の数字を加える。Shadowserverは「**51,000**台超のCisco ASA SSL VPNデバイスがオンラインに露出しているのを追跡している」。

**Why it matters:** このバグの正直な説明は**リモートから引き金を引ける信頼性の欠陥**であり、レコードの形がそれを裏づける——`C:N/I:N/A:H`は侵害ではなくクラッシュで、CWE-690はロジック設計の欠陥ではなく失敗した戻り値の参照外しだと述べている。だからこそ来歴を省略せずに引用する必要がある。NVDのレコードは**`Received`**で、**2026-10-28T20:18:47Z**公開、唯一のメトリクスは**Secondary**スロットのCiscoの`psirt@cisco.com`——つまり8.6はベンダーの算術が再配信されたもので、`nvd@nist.gov`のメトリクスはまだ存在しない。**CNA割当であってNVD分析済みではない**と読むこと。スコープChangedのフラグは二度見する価値のある部分だ。可用性のみのベクトルにおける`S:C`はスコアを7.x台から押し上げるもので、CiscoがこのリロードをVPNサービス自体を超えたコンポーネントに影響すると判断していることを意味する。運用者にとって判断はほぼ無料だ——認証なしのパケットでリロードするデバイスは、意図的に落とし続けられるデバイスであり、これはArcaneDoorキャンペーン以降に本誌が見た**5件目**のCisco ASA/FTDゼロデイで、そちらがパターンであってニュースではない。

[`🔗 Ciscoアドバイザリ cisco-sa-asaftd-tunnel-dos-s6mgkb75（CWE-690、CVSS 8.6、「Version 1.0: Final」）`](https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-asaftd-tunnel-dos-s6mgkb75) · [`🔗 CVE-2026-76418 NVDレコード（Received、Cisco割当 8.6）`](https://nvd.nist.gov/vuln/detail/CVE-2026-76418) · [`🔗 BleepingComputer——Cisco、SSL VPNデバイスをクラッシュさせるファイアウォールゼロデイの悪用を警告`](https://www.bleepingcomputer.com/news/security/cisco-warns-of-firewall-zero-day-exploited-to-crash-ssl-vpn-devices/)

---

## 39. AndroidのWAP Push SMSがゼロ操作で通話を切る——Googleが「Non-Security」に分類したので、修正すべきCVEが存在しない

- **Velocity:** ▮▮▮ trending
- **Source:** smsofdeath.com / Hacker News · 135 pts · 約5時間前（~06:00 UTC+8 10月29日）
- **Tags:** `android` `telephony` `zero-click` `disclosure` `denial-of-service`

**Mark Blaszczyk**の名で公表した研究者が**10月29日**、**SMS of Death**を開示した。**2026年5月5日**にGoogleのAndroid & Devices VRPへ報告することから始まった**90日**のタイムラインの後だ。バグは5バイトの**WAP Push** SMSである。`WapPushOverSms.decodeWapPdu()`はWSPヘッダ長を`uintvar`として読み、`long`を得て、`WapPushOverSms.java:217`で範囲検査なしに`int`へキャストする——`int headerLength = (int) pduDecoder.getValue32();`——そして244行目で配列サイズとして使う。`byte[] header = new byte[headerLength];`。ペイロード`88 80 80 80 00`は`0x80000000`に復号され、符号付き32ビットintとしては**−2147483648**なので、確保はtelephonyのメインスレッドで捕捉されない`NegativeArraySizeException`を投げ、`com.android.phone`を殺す。メッセージは**データSMS**だ。Messagesには現れず、送信者の番号も表示されず、被害者は何もしない。通話中のものは`DisconnectCause CS_DEATH`で終了し、1通でプロセス再起動までの**1〜2秒**のサービス停止を要する。ベンダーの行こそ見出しだ。状態**「Won't Fix」**、分類**「Non-Security」**、**CVE: なし**。

**Why it matters:** 興味深いのはクラッシュを超えたエスカレーションの部分だ。それは2秒の停止を持続的なものに変え、しかもクラッシュ経路にはまったく無い。キャリアの再配信は未確認のメッセージを再送して電話を再クラッシュさせる——ページは1通のメッセージが「テストでは最大1週間」断続的な停止を起こしたと報告する——そして**約30通**を連続送信すると、クラッシュとtelephonyプロバイダのSMSストアへの書き込みが交互に重なり、SMS保存の背後のSQLiteデータベースを破壊する競合に当たる。ページ自身の要約では**約20通**が「デバイスを長期にわたり使用不能にする」とされ、再起動を生き延びるのはこの破壊のほうだ。「Pixel 9の2026年4月ファームウェア、各種Samsung GalaxyとAシリーズ」にわたり試験され、**再現率100%**。2つの限界は知見の下ではなく、知見と並べて置くべきものだ。分類の判断はGoogleによるもので、ページはそれをベンダーの引用を伴わない表の1行として述べているので、「won't fix」はVRPの結果に対する研究者の表現であって、Googleのページからgrepできる文ではない。そして永続性の主張は著者自身の試験であり、独立に再現された結果ではない——CVEを得られなかった開示としてはこれが通常の状態だ。この類型の教訓は再利用できる。**攻撃者が与える長さを、範囲検査なしに確保サイズへ狭めるキャスト**は、メッセージのディスパッチャが例外境界のないメインスレッドで動くところならどこでも1パケットのDoSになり、OSが再起動するクラッシュは依然として攻撃者が予定できるクラッシュだ。

[`🔗 SMS of Death——解説、影響表、SQLiteの競合（2026-10-29開示）`](https://smsofdeath.com/) · [`🔗 Hacker Newsの議論（135 pts）`](https://news.ycombinator.com/item?id=50285452)

---

## 40. Orange TsaiのEdgeフルチェーンはロジックバグ5個・メモリ破壊ゼロ——そしてZDI自身の告知は4個と言っている

- **Velocity:** ▮▮ rising
- **Source:** blog.orange.tw / Hacker News · 107 pts · 約4時間前
- **Tags:** `browser` `edge` `pwn2own` `logic-bug` `sandbox-escape`

Orange Tsaiは**Pwn2Own Berlin 2026**向けに組んだチェーンを**10月28日**に公開した。「完全に手作りの、ロジックのみによるMicrosoft Edgeのフルチェーン。メモリ破壊ゼロ、AIも一切なし！」彼が投稿で引用するZDIの告知は「**ロジックバグ4個**をつないでMicrosoft Edgeのサンドボックスエスケープを達成し、**$175,000**とPwn Masterの**17.5**ポイントを獲得」と読み、一方彼自身の集計は「チェーン全体は**5個のバグと2個のWindows機能**から成る」。侵入点は`EdgeCAGuidanceNavigationThrottle`——エンタープライズ向けEntra ID条件付きアクセス機能のためのEdge専用ナビゲーションスロットルで、`login.live.com`のようなMicrosoft所有のオリジンからナビゲーションが始まり、URLが`?email={email}&switch_profile={url}`を含む内部形式に一致すると発火する。メールが現在のプロファイルと一致すれば、スロットルは「`switch_profile=url`から元々向かっていたURLを掴み」、Chromium内部の`NavigateParams` APIで新しいナビゲーションを起動する——しかも**ブラウザプロセス**からだ。これがプリミティブであり、レンダラが届かない`edge://settings`、`devtools://…`、そして`javascript:`疑似スキームに到達できる。

**Why it matters:** 手法が話の核で、**カテゴリ**が教訓だ——Tsai自身がこの隅を選んだ理由の枠づけが再利用可能な発見である。「Google Chromeが過去5年間に修正した**3,000以上**のCVEのうち、これらに関連するのは**20件未満**しかない」。ナビゲーションスロットルはブラウザプロセスに住み、どちらのプロセスからのナビゲーションも横取りするのに、5年分のバグ修正の往来がほとんど触れていない——これが監査不足の面の定義だ。4対5の食い違いは均さずに述べる価値がある。**ロジックバグ**を数えるか**バグ＋機能**を数えるかの違いだからだ。チェーンのてこには欠陥ですらない2つのWindows機能が含まれるので、欠陥数を必要とする読者はどの文書を開くかで4か5を得る。ZDIの数字は賞金に紐づいたほうだ。もう一つの正直な注記は、この記事が主張して*いない*ことだ。LLMがそのようなチェーンを見つけられないとは主張しておらず、これは1つによって見つからなかっただけだという。Pwnie賞の枠づけ（「AI時代にLLMはもう何でもpwnできるとみんな思っているのかもしれない」）は分野の空気についての観察であって、測定ではない。

[`🔗 Orange Tsai——The Last Proof of Human Craft: Forging a Microsoft Edge Full Chain with Logic Bugs Only`](https://blog.orange.tw/posts/2026-10-the-last-proof-of-human-craft-browser-full-chain/) · [`🔗 Hacker Newsの議論（107 pts）`](https://news.ycombinator.com/item?id=50285319)

---

## 41. Volt Typhoonの「Silent Train」はボットネットではなくリレーネットワーク——確認済みゼロデイ4件と推定1件、3年間追跡

- **Velocity:** ▮▮ rising
- **Source:** Lumen Black Lotus Labs / BleepingComputer · レポート公開 2026-10-28
- **Tags:** `volt-typhoon` `zero-day` `apt` `critical-infrastructure` `threat-intel`

Lumenの**Black Lotus Labs**は**10月28日**に**Silent Train**を公開し、そのフレームワークについて「過去3年間追跡してきた」と述べ、「主要セクターの数百の被害者」への通知に使ったとした。設計は意図的にボットネットではない。「従来のボットネット、プロキシネットワーク、オペレーショナルリレーボックス（ORB）ネットワークと異なり、Silent Trainは**侵害されたSOHO、IoT、エンタープライズ機器の急速に回転するチェーン**を中心に作られ、これらは**オンデマンドで悪用され、慎重に選ばれた標的に用いられ、各作戦後に掃除され、継続的に更新される**」。作戦は米国外のVPS基盤から侵害されたリレーを経由する——BleepingComputerは国外リレーとして**Intelbrasのモデム**、米国内の中継点として**Netgear Orbi**機器を挙げる——そしてセッションは「通常8時間未満」で終わり、オペレーターはツール、鍵、設定ファイルを撤去する。管理プレーンソフトを動かす誰にとっても重要な発見は、監視が「**少なくとも確認済み4件と推定1件のゼロデイ**脆弱性の発見に寄与した」ことだ。名指しされたCVEは**CVE-2026-16812**（VeloCloud Orchestrator）、**CVE-2026-20127**（Cisco Catalyst SD-WAN）、**CVE-2025-8875**と**CVE-2025-8876**（N-able N-central）、**CVE-2024-39717**（Versa Director）、加えて**Quest KACE**のゼロデイ疑惑。被害セクターは電気通信、政府、防衛請負業者、衛星・ミッションクリティカル通信、大学、IT企業、MSP、そして水、エネルギー、交通、海事、鉄道、航空、緊急サービスに及ぶ。

**Why it matters:** 標的選択が論拠であり、それはキャンペーンではなく**リレーフレームワーク**の性質として述べられている。名指しされた製品はすべて**コントロールプレーン**に位置する——SD-WANオーケストレータ、VeloCloudオーケストレータ、N-central RMM、Versa Director、KACEアプライアンス——そしてBlack Lotus Labsの枠づけは「広範な管理到達範囲を持つシステムは、組織全体**とその顧客**への高価値なゲートウェイになり得る」だ。RMMやオーケストレータは1台のホストではない。数百の下流ボックスにログインする資格情報であり、だからこそ被害者リストにMSPが現れるのは単一企業が現れるのとは実質的に違う。レポート自身が示す2つの限界。「少なくとも確認済み4件と推定1件」は被害者通知が拾ったものによる下限であって、フレームワークが何に使われたかの全数調査ではない。そして地域の集中（カリフォルニア、テキサス、ハワイ）は観測された被害者についての観察で、意図についての陳述ではない。運用上の推奨はこのアクターを超えて一般化するものだ——管理インターフェースのインターネット露出を制限し、侵入者がリレーを保持するより長くログを保管せよ。8時間の掃除サイクルは、残る証拠が起きる前に中央ログが捕捉したものだけだということを意味するからだ。

[`🔗 Lumen——Silent Train: uncovering Volt Typhoon's operational framework for zero-day exploitation and strategic access`](https://www.lumen.com/blog/en-us/silent-train-volt-typhoon-operational-framework) · [`🔗 BleepingComputer——Volt Typhoon hides zero-day attacks using 'Silent Train' framework`](https://www.bleepingcomputer.com/news/security/volt-typhoon-hides-zero-day-attacks-using-silent-train-framework/)

---

## 42. JuniperはSession Smart RouterのCVEを1バッチで17件公開——9.8が2件、そのうち1件はsalt minion ID経由でrootを取る

- **Velocity:** ▮▮ rising
- **Source:** NVD API / Juniper SIRT (JSA112183) · すべて 2026-10-28T17:17Z 公開
- **Tags:** `juniper` `session-smart-router` `cve` `cna-assigned` `command-injection`

Juniperの`sirt@juniper.net`は**10月28日**、**Session Smart Router / Conductor**について**17件のレコード**を登録し、分布は9.8の山ではなくきれいな三角形だ。**9.8が2件**、**8.8が6件**、続いて7.5、7.1、5.8、5.5、5.3×2、4.8、4.3、3.7。天井の2件は同じ数字をまとった別のバグだ。**CVE-2026-103406**は**AutomatedProvisioner**のOSコマンドインジェクションで、「細工された**salt minion ID**を介してリモートの攻撃者が**rootとして任意のコマンド**を実行できる」。**CVE-2026-103409**は重要機能の認証欠如で、「**rootとして動作する**安全でないエンドポイントに細工したURLパラメータを渡すことで、未認証のネットワーク攻撃者が**管理者権限**を取得できる」。**CVE-2026-103409**のcveawgコンテナはCNAの`affected[]`フィールドで自らの影響範囲を述べている——`0`から`< 7.0.5`、`7.1.0`から`< 7.1.7`、`7.2.0`から`< 7.2.3`——`defaultStatus: "unaffected"`に対して。8.8の帯は設定面のあるところだ。未認証のWebサーバでのリンク追従バグ、PCLIでのデータ真正性の失敗、AccessManagerのコマンドインジェクション、ConfigDirectorのパストラバーサル、DHCPクライアントのスタックオーバーフロー。

**Why it matters:** salt minion IDこそ、スコアの読み方を変えるべき細部だ。入力経路が運用者にエッジでフィルタできるHTTPパラメータではなく、管理対象ノードが自分のプロビジョニングシステムに提示する識別子であり、それを消費するコードがrootで動くからだ。これは単一デプロイ内のサプライチェーン型の穴である。minionの識別子文字列を制御する者がプロビジョニング担当に到達する。来歴は一様で、バッチについて一度述べる価値がある。17件すべてが**Juniper自身のCVSS**を持ち、NVDの状態はすべて**`Awaiting Analysis`**で`nvd@nist.gov`のメトリクスはなく、したがってここの数字はすべて**CNA割当の再配信**だ。これが効くのは表の上端より下端だ。3.7と4.3は不適切な初期化のバグとVRRPの範囲外読み取りに対するJuniperの判断であり、Juniperの外でそれを確認した者はいない。そしてバージョンの算術が導入の罠だ。影響する3つのブランチに3つの異なる修正レベルがあるということは、`7.0.x`系のルータと`7.2.x`のルータがどちらも脆弱で、どちらも別のターゲットビルドを必要とするということで、「最新に上げよ」に平坦化されがちな種類の細部が、運用者のチケットに届く頃にはそうなっている。

[`🔗 CVE-2026-103409レコード（9.8、認証欠如→root、細工したURLパラメータ経由の認証欠如）`](https://www.cve.org/CVERecord?id=CVE-2026-103409) · [`🔗 Juniperアドバイザリ JSA112183`](https://supportportal.juniper.net/JSA112183) · [`🔗 CVE-2026-103406 NVDレコード（9.8、salt minion ID経由のOSコマンドインジェクション）`](https://nvd.nist.gov/vuln/detail/CVE-2026-103406)

---

## 43. Eclipseの`che-machine-exec`はユーザー名をシェルコマンドに連結する——9.8、そして修正はレコードより41日古い

- **Velocity:** ▮▮ rising
- **Source:** NVD API / Eclipse Foundation CVE assignment · 2026-10-28T12:17Z 公開
- **Tags:** `eclipse-che` `cve` `command-injection` `kubernetes` `cna-assigned`

**CVE-2026-114278**は**9.8**、`AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H`で、説明は教科書的な連結だ。「`che-machine-exec`サービスは、ユーザー制御の入力（`/exec/init`と`/exec/config` JSONエンドポイントの**username**フィールドと**namespace**フィールド）を、エスケープなしで二重引用符付きの`sh -c "echo "..." > ..."`呼び出しに連結してシェルコマンドを構築する」。レコードはこのプロジェクトに対するEclipse Foundation登録の小さな集合の一つで、修正コミットは公開されている。**`a78541c`**、「Validate certain parameters used in shell commands」、コミットは**2026-09-17T03:25:02Z**——レコードが公開される**41日**前だ。来歴の行こそ正確に保つべきものだ。メトリクスのsourceは`emo@eclipse.org`でtypeは**`Secondary`**、NVDの`vulnStatus`は**`Deferred`**、つまり9.8はCNAの数字でNVDは分析も採点もしていない。

**Why it matters:** 興味深い失敗はエスケープの欠如ではなく**修正の形**——「引数を引用する」ではなく「特定のパラメータを検証する」——であり、この区別がバグの類型を閉じたのか事例だけを閉じたのかを決める。2つの名指しフィールドに対する拒否リストや形式検査は`/exec/init`と`/exec/config`を直し、JSONから文字列を読む次のエンドポイントが同じ穴を再発見するのを放置する。`sh -c`への変数補間こそ欠陥であり、正しい修復はコマンドをフォーマット文字列から組み立てるのをやめることだ。`Secondary`スロットと`Deferred`状態は2番目に注意して読むべき点で、まさに本誌が10月のPatch Tuesday監査以降追ってきたケースだ。NVDのページに現れる数字はNVDの評価ではない。ここで「NVDは9.8と言う」と引用すれば、何もしていない当事者にEclipseの算術を帰属させることになる。実務的な帰結が2つ続く。9.8はレコード自身の散文のどこにも驚きのない天井（未認証、ネットワーク、シェル経由のroot相当の書き込み）であり、`Deferred`はレコードがCVE IDを変えずにどちら向きにも変わり得ることを意味する。

[`🔗 CVE-2026-114278 NVDレコード（9.8、Eclipse割当、`Deferred`）`](https://nvd.nist.gov/vuln/detail/CVE-2026-114278) · [`🔗 修正コミット a78541c（2026-09-17）`](https://github.com/eclipse-che/che-machine-exec/commit/a78541c29e5f48fd59a49cf206bc0e507628bd23)

---

## 44. Signal K Serverは自分のJWT署名鍵をログZIPで配る——未認証で9.8、修正コミットはその名を題にしている

- **Velocity:** ▮▮ rising
- **Source:** NVD API / VulnCheck / SignalK repo · 2026-10-28T22:17Z 公開
- **Tags:** `signalk` `cve` `jwt` `missing-authentication` `vulncheck`

**CVE-2026-118690**は**Signal K Server**——ボートの電子機器が話しかけるオープンソースの海洋データサーバ——の認証欠如バグで、エスカレーションの連鎖は珍しく自己完結している。「**2.33.0**より前は…未認証のリモート攻撃者が`/skServer/ziplogs`エンドポイント経由で**ログアーカイブをダウンロード**できる。攻撃者はZIP内の`security.json`から**JWTの`secretKey`**を抽出し、**管理者トークンを偽造**し、永続的な…アカウントを作成できる」。修正は単一コミット**`728bab82`**、「security: add admin middleware to ziplogs endpoint」、コミットは**2026-09-21T17:57:17Z**——公開の**37日**前。これは同じソースから**両方の**CVSSバージョンを持つ稀なレコードで、両者は**0.5**食い違う。**`Primary`**スロットに**CVSS 3.1 9.8**、**`Secondary`**に**CVSS 4.0 9.3**、どちらも`disclosure@vulncheck.com`で、NVDの状態はなお**`Received`**。

**Why it matters:** これは`Primary`/`Secondary`が来歴ではなくスロット位置である理由の簡潔な例だ。1人の報告者が1つのバグを2つの枠組みで2回採点したのであり、スロットを2つの当事者と扱う読者はVulnCheckとVulnCheck自身の不一致を報告することになる。差を説明するのはベクトルで、それはレコードにある。v3.1は`S:U`（不変）で`C/I/A`はすべてHigh、一方v4.0の文字列は`SC:N/SI:N/SA:N`——後続システムへの影響はなしと宣言している。これは侵害された船舶データサーバがどこまで届くかについての**モデリング**の違いで、方向は枠組みの性質ではなく報告者の習慣だ。持ち帰るべき脆弱性の類型はこれだ。**設定をアーカイブする診断エンドポイントは認証バイパスの温床**である。なぜならシステムを守る秘密が*ログダンプが集めるファイルの中に*あるからだ。管理ミドルウェアの欠如が直接の原因だが、`security.json`をダウンロード可能なZIPに詰めるエンドポイントが、これを情報漏えいではなく完全な侵害にした設計だ。そしてレコード前修正の算術が運用上の読みになる。9月21日以降に2.33.0以降を入れた者はCVEが存在する前にすでに覆われており、本当に危険な集団は古いイメージに固定して再取得しなかった者だ。

[`🔗 CVE-2026-118690 NVDレコード（9.8 CVSS 3.1 Primary / 9.3 CVSS 4.0 Secondary、単一ソース）`](https://nvd.nist.gov/vuln/detail/CVE-2026-118690) · [`🔗 修正コミット 728bab82——「security: add admin middleware to ziplogs endpoint」`](https://github.com/SignalK/signalk-server/commit/728bab82742d16c54e50525b95dc9b6e32396107)

---

## 45. AVideoのインストーラはリクエストパラメータから自分の設定を書き出す——アカウント不要の10.0、修正はリリースタグ

- **Velocity:** ▮ rising
- **Source:** GitHubアドバイザリデータベース / NVD API · 2026-10-28T22:17Z 公開
- **Tags:** `avideo` `cve` `code-injection` `installer` `cvss-10`

**CVE-2026-61564**は**AVideo**の**10.0**——`AV:N/AC:L/PR:N/UI:N/**S:C**/C:H/I:H/A:H`——で、その表面は稼働中のシステムでは到達できないはずのものだ。「**8.1.0**より前、未認証のインストーラエンドポイント`install/checkConfiguration.php`は、`webSiteRootURL`を含むリクエストパラメータをエスケープなしで**単一引用符のPHP文字列リテラル**に補間して`videos/configuration.php`を組み立てる」。アドバイザリは**GHSA-xrj3-cqm8-r992**で、**CWE-73**（「書き込みパスが攻撃者提供の`systemRootPath`から取られ、基底ディレクトリの制約がない」）と**CWE-89**（「91行目と99行目の`INSERT`文がリクエスト値を直接補間する」）を引く。同じプッシュで2件のレコードが登録された。インストーラの書き込み経路の**10.0**が**CVE-2026-61564**、ライブストリーミングエンドポイント`view/videosListToLive.php`の**10.0**が**CVE-2026-61567**。修正は**v8.1.0**、タグとコミットは**`0faaddeb`**。

**Why it matters:** 10.0は通常疑うべき数字で、ここでは算術が手で確認できる。v3.1スケールの頂点に達する唯一の道は`S:C`かつC/I/AすべてHighであり、スコープ変更は飾りではなく正当化される。攻撃者が選んだ文字列で`configuration.php`を書くことはWebアプリの侵害ではなく、**そのマシン上の全サイトをホストするPHPプロセスの**侵害だからだ。二重CWEも珍しく正直だ。エスケープのバグで任意の内容を文字列リテラルに入れ、パスのバグでそのリテラルを`systemRootPath`の指すどこにでも書かせるので、パッチは2つの独立した穴を閉じねばならず、アドバイザリは整ったほうを選ばずにそう述べている。ただし10.0というラベルは1点で先走る。`PR:N/UI:N`はエンドポイントについては真だが、セットアップ後に`install/`が到達可能かについては何も言わない。アドバイザリ自身の「Prior to 8.1.0」はバージョンの陳述で、デプロイの陳述ではない。来歴は、メトリクスのsourceが`security-advisories@github.com`でNVDの状態が**`Received`**、つまり両方の10.0は**GitHub CNA**の数字でNISTは分析していない。そして実務的な文は助言ではなく陳腐化防止だ。セルフホストの動画プラットフォームにとって、インストール後も残っているインストーラが実際の発見であり、8.1.0へのアップグレードはこの事例を閉じるが表面は取り除かない。

[`🔗 GHSA-xrj3-cqm8-r992——AVideoの未認証インストーラ設定インジェクション`](https://github.com/WWBN/AVideo-Encoder/security/advisories/GHSA-xrj3-cqm8-r992) · [`🔗 CVE-2026-61564 NVDレコード（10.0、GitHub CNA）`](https://nvd.nist.gov/vuln/detail/CVE-2026-61564) · [`🔗 v8.1.0リリースタグ`](https://github.com/WWBN/AVideo-Encoder/releases/tag/v8.1.0)

---

## 46. Claude Codeは請求額の16.4%を、モデルに自分を3語で説明させるために使っている——そして切る設定はない

- **Velocity:** ▮▮▮ trending
- **Source:** flamerix.aiのgist / Hacker News · 429 pts · 約3時間前
- **Tags:** `claude-code` `agents` `cost` `observability` `reverse-engineering`

gistは機構を率直に述べる。「約30秒ごとに、すべてのバックグラウンドエージェントについて、Claude Codeはそのエージェントの**トランスクリプト全体**をエージェント自身のモデル（通常Opus）へ送り、『直近の行動を**3〜5語**で説明せよ』と尋ねる」。答えはエージェントパネルのステータス行を更新するだけで、「モデルにもあなたの会話にも決して届かない」。そして「それを切る設定は存在しない」——2026年8月の**2.1.232**以降デフォルトで有効だ。計測はバイナリを読んで得たものではない。著者らはClaude Codeの**OpenTelemetry**エクスポートを`query_source`でグループ化し、フックを入れる前の週に`agent_summary`がClaude Codeの全支出の**16.4%**を占め、メイン会話が**15.7%**、APIリクエストの**19.7%**、その支出の**96%**がOpus、入出力比は**約9,000:1**だった。数字は彼らだけのものではない。彼らは**anthropics/claude-code#86879**を挙げ、それが「**18〜26%**の4つの独立した計測を集めている」とする。修正は約80行の**Bun preload**（`BUN_OPTIONS=--preload`）で、`setTimeout`/`setInterval`をラップし、コールバックのソース文字列に要約器のアンカーが含まれるとき不活性なハンドルを返す。バイナリは未改変だ。

**Why it matters:** 機構が面白い半分で、このクライアントを超えて一般化する。フックが効くのはモジュールが**プリコンパイルされたBunバイトコード**として出荷されるからだ。JSテキストを書き換えても何も起きないが、`Function.prototype.toString`はバイトコードから実行されてもコールバックのソースを返すので、タイマーは同一性ではなく内部の文字列で識別できる。これはバンドルされた任意のランタイムを計装するについての耐久性のある観察だ。gist自身の正直さが引用可能にしている。6リリース（2.1.257→2.1.312）にわたる**Tested versions**表を公開し、約2.5分の実行あたりの要約フォーク数をフックなし／フック受理／フック無効で**5 / 5 / 0**と示し、**Fail-open**節でフックが黙って一致しなくなる4つの経路を挙げる——ログ行の改名、`fn.bind(...)`ラッパー、コールバックの外へ移された共有定数、タイマーの`timers/promises`への移行。引用時に正確に保つべき2点。**16.4%はClaude Code自身の`cost_usd`見積もりのシェアであって請求書のシェアではない**ので、サブスクリプションでは損失は金額ではなくレート制限の余裕だ。そして16.4%は1加入者の1週間で、リンク先issueの範囲は18〜26%なので、擁護できる文は「6分の1から4分の1」であり、これをデフォルトで出すクライアントについての4つの独立した計測から来ている。一般化できるコストモデルはこうだ。**エージェントごとに、30秒ごとに、トランスクリプト全体**を要約する可観測性機能は、ユーザーが求めた何かではなくコンテキスト長に比例して増える——3語のラベルが2番目に大きな費目になる仕組みだ。

[`🔗 gist——トークン監査、フックのソース、バージョン表、fail-openの一覧`](https://gist.github.com/flamerix-ai/c3905705cc4205e5de3011fa2e74efce) · [`🔗 anthropics/claude-code#86879（4つの独立した計測、18〜26%）`](https://github.com/anthropics/claude-code/issues/86879) · [`🔗 Hacker Newsの議論（429 pts）`](https://news.ycombinator.com/item?id=50284255)

---

## 47. claude-memはセッション記憶で104,210スター——そしてその検索はベクトル検索ではなく3段階フィルタ

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub Trending / thedotmack/claude-mem · 104,210 stars · 最終プッシュ 2026-10-29
- **Tags:** `claude-code` `memory` `mcp` `agents` `typescript`

**thedotmack/claude-mem**は本日GitHub Trendingに**104,210スター**、**9,193フォーク**、**未処理142件**、Apache-2.0、TypeScriptで登場し、最初のコミットは**2025-08-31**、最終プッシュは**2026-10-29**——急騰ではなく1年選手のプロジェクトだ。自己記述は「すべてのエージェントにセッションをまたぐ永続コンテキスト——エージェントがセッション中に行うすべてを捕捉し、圧縮する」で、アーキテクチャは6つの構成要素からなる。6つの**ライフサイクルフック**（`SessionStart`、`UserPromptSubmit`、`PreToolUse`、`PostToolUse`、`Stop`、`SessionEnd`）、Webビューア付きのローカルHTTP APIである**ワーカーサービス**、セッション／観察／要約のための**SQLite**、ベクトル用の**Chroma**、そして`mem-search`スキル。読む価値があるのは検索設計で、意図的に「埋め込んで返す」ではない。**3層ワークフロー**の**4つのMCPツール**——`search`は「ID付きのコンパクトな索引（**約50〜100トークン/結果**）」を返し、`timeline`は結果の前後の時系列コンテキストを与え、`get_observations`は「**フィルタされたIDについてのみ**完全な詳細を取得する（**約500〜1,000トークン/結果**）」——READMEはこれを「詳細を取得する前にフィルタすることで**約10倍のトークン節約**」と要約する。

**Why it matters:** 3段階の形はエージェント記憶カテゴリが通常下手に解く問題への正しい答えであり、理由は好みではなく算術だ。記憶ストアの失敗モードは想起ではなく**コンテキストコスト**なので、まず索引を出し本文は生存者にだけ渡すことは、検索を2パスのフィルタに変え、高価なトークンがモデルがすでに選んだ行にだけ費やされる。これは本誌がコード検索ツールで追ってきたのと同じ漸進的開示の議論を、セッションログに適用したものだ。距離を置くべき主張はREADMEがハーネスなしで述べるものだ。**「約10倍のトークン節約」**の背後にREADMEにはベンチマーク節がないので、プロジェクト自身の数字として引用すること。**`~50-100`**と**`~500-1,000`**のトークン帯は測定ではなく推定だ。刺さるインストールの細部が2つ。`npm install -g claude-mem`は「**SDK／ライブラリのみ**をインストールする——プラグインのフックを登録せず、ワーカーサービスも設定しない」ので、グローバルインストールは成功に見えて何も届けない。そして対応ホストの1つでのデフォルトは**CMEM Pro、ホスト型記憶**で、ローカルオブザーバはオプトインフラグ（`--provider host`）だ——「永続コンテキスト」と「サービスへ送信」は排他ではないので、プロプライエタリなリポジトリに向ける前に読むべきはこの文だ。

[`🔗 thedotmack/claude-mem（Apache-2.0、104,210 stars）`](https://github.com/thedotmack/claude-mem) · [`🔗 アーキテクチャ文書——フック、ワーカー、SQLite FTS5、Chroma`](https://docs.claude-mem.ai/architecture/overview)

---

## 48. いま「OpenBot」というエージェントプロジェクトが2つある——CopilotKitのものはベータ・MITで、ライセンストークンを要する

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending / CopilotKit/OpenBot · 7,768 stars · 最終プッシュ 2026-10-29
- **Tags:** `agents` `self-hosted` `ag-ui` `docker` `licensing`

**CopilotKit/OpenBot**は本日GitHub Trendingに**7,768スター**、**1,030フォーク**、**未処理45件**、MIT、TypeScript、作成**2026-08-17**で登場した——そして最初に直すべきは名前だ。本誌は**10月27日**に*別の*`OpenBot`（`nightly-labs/openbot`、「デスクトップ上の永続AIチームメイト」）を扱っている。無関係なプロジェクトだ。CopilotKitの売りは「**あなたの会社が実際に所有できるAIアシスタント。** ChatGPT、Claude、Grokと同じ形」で、PostgreSQLとともにDocker Composeで配備され、「**箱にはモデルが入っておらず**、管理者が資格情報を供給する。それは保存時に暗号化され、ログに残らない」。プロトコルの選択が設計テーゼだ。「Botとは**AG-UI**を話す任意のエンドポイントである…LangGraph、Mastra、CrewAI、Pydantic AI、Google ADKで作られたエージェントも手書きも同じように到着し、ガバナンスはフレームワークではなくプロトコルに乗る」。Botが「コンピュータ、ファイル、MCPサーバ、コンポーネント」に対して行うすべての操作は「それを判断し記録する**1つのゲートウェイ**」を通り、コンピュータはコンテナごとのトークンで**`127.0.0.1`**に束縛され、エージェントのエンドポイントはSSRFターゲット検査に対して「登録時と、すべてのリダイレクト時に再度」検証される。

**Why it matters:** プロトコル経由のガバナンスという主張が実質的で、実際のアーキテクチャ上のコミットメントだ。ワイヤ形式が固定だからすべての操作が単一のゲートウェイを通るなら、サンドボックスはチームがたまたま選んだエージェントフレームワークの性質ではなくデプロイの性質になる——エージェントのサンドボックスが通常作られるのと正反対だ。注意点は同じREADMEにあり、小さくない。状態行は「**ベータ、活発に開発中。** OpenBotは初期段階だ。粗さとバグを覚悟せよ」、クイックスタートの前提は「**CopilotKit Intelligenceプロジェクトとライセンス。無料プランがあり、Intelligenceはセルフホストできる**」、配備は「2人の同僚から始まる」——それは設定であり、さらに10人がカタログ例だ。つまり「MITで、あなたのインフラ上で動く」はサーバについては真で、隣の文が必要になる。MITライセンスのコントロールプレーンが、別途ライセンスされる構成要素を前提とするエージェントランタイムを持つのは**混成**のライセンス物語であり、無料プランはプランであって権利ではない。本誌の10月24日の`claude-plugins-official`に関する注記から繰り返される教訓は読む順序だ。判断しているものがリポジトリなのか、それが呼ぶサービスなのか、配備レシピなのかを確認せよ——3つとも同じページに現れ、MITなのは1つだけだからだ。

[`🔗 CopilotKit/OpenBot（MIT、ベータ、AG-UI、Docker Compose）`](https://github.com/CopilotKit/OpenBot) · [`🔗 copilotkit.ai/openbot——製品ページ`](https://copilotkit.ai/openbot)

---

## 49. Claude Code Game Studiosは自分を測って悪い結果を公開した——30文書のビルドが最下位だった

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending / Donchitos/Claude-Code-Game-Studios · 28,633 stars · 最終プッシュ 2026-10-19
- **Tags:** `claude-code` `agents` `skills` `game-dev` `evaluation`

**Donchitos/Claude-Code-Game-Studios**は1つのClaude Codeセッションをスタジオに変える。3層（ディレクター、部門リード、スペシャリスト）にわたる**49エージェント**、**74スキル**、**15フック**、**14ルール**、**62テンプレート**、MIT、28,633スター、4,015フォーク。エージェントには「定義された責務、エスカレーション経路、品質ゲート」があり、README自身の目録表が引用すべき数だ。リポジトリのGitHub*説明*は「**72**個のワークフロースキル」と言うが、READMEのバッジと表はどちらも**74**と言う。本誌が注視してきた種類のずれで、ここではREADME側に軍配が上がる。カテゴリ別の算術を持つ文書だからだ。このプロジェクトを項目にする価値のある節は「**ゲームを作るのか、文書を作るのか**」と題され、測定で答える。1つのブリーフから異なる`modes.rigor`レベルで作った4つのゲームで、**ゲームコードの最初の行より前に**書いた文書を数える——`minimal`は**1**（1ページのブリーフ）を**0分**で、`standard`は**30**を**58分**で書いた。「どれも動作し、テストされたゲームを生んだ。**その後2名のブラインドレビュアーと1回の人間プレイテストが`standard`ビルドを最下位にした**——余分な29文書が買ったのはトレーサビリティであり、より良いゲームではなかった」。

**Why it matters:** 自らの構成に対して統制比較を回し、より手の込んだ設定について**負の**結果を公開するスキルリポジトリは、このカテゴリではほぼ唯一だ。そしてこの発見は興味深い種類の負だ。余分な29文書はゲームを悪くしなかった、*順位*を悪くした。プロセスの注意がどこへ向かったかについての陳述だ。これは本誌がハーネスとスキルの増殖の下で何週間も巡ってきた懸念の具体的な形だ。ワークフローが追加するゲートはどれもエージェントに往復を課し、報酬は文書ではなく成果物に現れねばならない。正直な境界は、これが**ブリーフ1本、レビュアー2名、プレイテスト1回のn=4**だということだ。READMEはこれを「サンプルプロジェクトではなく測定」と提示しており、実際に測定ではある——1つのゲームジャンルでの4回の実行についての——ので、文書の水準が単調に良いわけではない証拠であり、確定した知見として引用する順位結果ではない。この節の後半は前半でないものの検査だ。「動くのか」へのリポジトリの答えは、通るテストはゲームには不十分であり「誰かが*見る*必要がある」というもので、ワークフローがビルドを主張するのではなく実行するのはそのためだ。

[`🔗 Donchitos/Claude-Code-Game-Studios（49エージェント、74スキル、MIT）`](https://github.com/Donchitos/Claude-Code-Game-Studios) · [`🔗 GitHub Trending`](https://github.com/trending)

---

## 50. CASELは信頼度ではなく結果の重さでツール呼び出しをゲートする——等しい計算量で有害軌跡が14.75%→7.02%

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.36570 · 2026-10-27 投稿
- **Tags:** `arxiv` `agents` `tool-use` `safety` `runtime`

**CASEL**（Consequence-Aware Selective Execution Layer）は「ほとんどのランタイム保護機構は**汎用の不確実性スコアや粗い変異ヒューリスティクス**で精査を配分する」という観察から出発し、代わりに「較正された失敗確率、**状態依存の結果の重さ、可逆性、曖昧さ、証拠の鮮度**」を組み合わせて6つのモード——直接実行、検証、サンドボックス、明確化要求、承認、棄権——の1つを「モードごとのコスト最小化」で選ぶ、呼び出しごとのポリシーを提案する。設計は直接実行を**選択的予測**として形式化し、有限標本の閾値と「軌跡リスク台帳」の妥当性条件を述べる。数字は「**20シード、各12万テストアクション**の統制シミュレーションで、すべての手法が同じ介入メニューと同じ計算量を持つ」ものから来る。有害な副作用を持つ軌跡は不確実性順位付けゲートの**14.75%**から**7.02%**へ、平均正規化害は**0.184**から**0.123**へ下がる。

**Why it matters:** これを読む価値のある文は比較可能性についてのもの——「同じ介入メニューと同じ計算量」——だ。承認をより多く求めるゲートは常に安全に見えるので、予算を等しくすることが「より安全」を「より良く配分された」に変える。数字が支える機構は、利得がメニューではなく**順位付け関数**にあることだ。抄録は「失敗確率と結果の重さの積で順位付けするゲート」が改善の大半を捉える変種だと報告する。ほとんどのシステムが単一の閾値として出荷するポリシーへの2変数の変更だ。正直な限界が2つ並ぶ。第一に、これは**シミュレーション**であって配備ではない。統制環境で害の注釈が定義された各シード12万のテストアクションは最も清潔な測定設定であり、生きたツール面の代表としては最も劣る。第二に、「害」はその注釈に対して正規化されているので、0.184→0.123はこのタスク分布上の相対改善であり、インシデント数には移らない。移転可能な主張は狭く有用だ。結果の重さと可逆性は呼び出しごとに安く推定でき、不確実性が持たない情報を運ぶ。だからこそ不確実性順位付けのベースラインは同じ予算で負ける。

[`🔗 CASEL：Consequence-Aware Selective Execution Layer（arXiv 2610.36570）`](https://arxiv.org/abs/2610.36570) · [`🔗 全文（PDF）`](https://arxiv.org/pdf/2610.36570)

---

## 51. コーディングエージェントに4つの後続リクエストを与えると28.5%で止まる——自分の以前の欠陥に気づかないからだ

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.37434 · 2026-10-27 投稿
- **Tags:** `arxiv` `coding-agents` `benchmark` `software-engineering` `evaluation`

**FeatureArc**は、ほとんどの機能ベンチマークが避けるもの——エージェント自身の以前の作業の*後に*来るリクエスト——を評価する。「ほとんどの機能ベンチマークは固定されたコードベース上の単一リクエストを評価する」一方、「機能の進化は**エージェント自身の以前のコード**に対する連続的な拡張を評価し、機能が正しいままでいるかを検査することを要する」。パイプラインはリポジトリ履歴からタスクを採掘し、新しい振る舞いのfail-to-passテストと既存の振る舞いのpass-to-passテストを、各段階の前後で参照コードに対して検証する。評価は**2〜10段階**の**手作業でレビューされた73タスク**で**10のコーディングエージェント**を覆い、各エージェントは「**外部のテストフィードバックもロールバックもなしに**1つの永続セッションとワークスペース」で動く。見出しは減衰の形だ。「プールした成功率は第1段階の**62.7%**から、機能全体を最終コードでテストしたときの**28.5%**へ落ちる」。機構は軌跡から診断される。**「継承された欠陥」**が失敗した後続段階の**72.9%**に現れ、「失敗に続く段階では、エージェントは以前の誤りを約**95%**の確率で気づかないままにし、**自己テストが以前の段階を再訪することは稀**だ」。

**Why it matters:** 持ち帰るべき数字は95%だ。失敗を能力から**注意**へ移すからだ。第4段階のエージェントは第4段階のリクエストで失敗しているのではない。再検査する手順を持たない土台の上で正しく積み上げているのであり、だからこそベンチマークのロールバックなし・外部フィードバックなしの設計が効いている——「待って、火曜のキャッシュ無効化は間違っている」と言うはずの人間を取り除いている。これが結果をモデル品質ではなく*これらのシステムがどう配線されているか*についての陳述にする。追記専用の履歴と、現在のステップに限定された自己テストを持つ永続セッションには、後のステップが以前のものを疑う機構がない。62.7%→28.5%の差は2〜10段階でそれが掛かるコストだ。産業的な細部が信頼性の確認になる。パイプラインは**Tencent**の社内評価を「拡張し」、**Hunyuan**の開発を「導く」ので、これは自社モデル系列が測定されるベンチマークをベンダーが公開しているということで、エージェント別の表を読むときに知っておく価値がある。限界は設計自身のものだ。73タスクは小さく、段階は難易度のために合成されたのではなく実際の履歴から抽出され、4つの言語は抄録で名指しされない——だから主張は「逐次的な機能作業はこのハーネスで劣化する」であり、エージェントのセッションをどうスコープするかを変えるには足り、10個のエージェントを順位付けするには足りない。

[`🔗 FeatureArc：進化する機能でのコーディングエージェントのベンチマーク（arXiv 2610.37434）`](https://arxiv.org/abs/2610.37434) · [`🔗 全文（PDF）`](https://arxiv.org/pdf/2610.37434)

---

## 52. Wilsonループ経由のエッジ注意は設計上の選択ではない——新しい論文が、それが対称性の許す唯一の形であることを証明する

- **Velocity:** ▮ rising
- **Source:** arXiv 2610.37656 · 2026-10-27 投稿
- **Tags:** `arxiv` `transformers` `relational-reasoning` `gauge-theory` `architecture`

論文の前提は、関係が共有された実体を通じて合成されること——「AliceはBobの母、BobはCarolの父、ゆえにAliceはCarolの祖母」——そして順序が重要であること（「父の母は母の父ではない」）なので、合成の検証は**ループを閉じる**ことを意味する。各実体の座標系が独立に回転し得るなら、3つのことが提案ではなく定理として従う。「純ゲージセクターでは、サイクルを共有しない関係は**まったく相互作用できない**」、「三角形の唯一のゲージ不変なスコアはそのホロノミー`H = T_ij T_jk T_ki`の類関数——**Wilsonループ**である」、「エッジの唯一の同変な更新は`U = Ψ(H) T_ij`である」。したがって「Wilsonループによるエッジ注意は**多くの設計の1つではなく、対称性が許す唯一の形**である」。著者らはAlphaFoldの三角形更新とEdge Transformerをこの地図上に置く——「それらは形を持っている——第3の頂点を通して更新されるエッジ——が、**その制約を持たない**」——そして同変な部分族を**ホロノミー注意**として実体化する。**学習なし**、合成のみで、スパースグラフ上の未観測の`S_4`関係を**0.88**で推論し（「エッジの5分の1が破損している」状態で、「**すべての可換なアーキテクチャは0.083で上限づけられる**」）、破損した三角形を**AUC 0.99**で検出し（「可換なスコアは**0.76**で上限」）、ラベルなしでクラスタを分離する。

**Why it matters:** 0.083対0.88の差はチューニングの差ではなく、何が可換かについての論証が生む**天井**だ。実体ごとの座標自由度の下では、サイクルを共有しない関係は相互作用できないので、エッジを独立と扱うアーキテクチャはどれだけ幅広くても上限づけられる。論文の貢献はその上界を証明することであり、失敗を観察することではない。これは通常のアブレーションとは種類の違う結果だ。AlphaFoldが広めた三角形更新の形は*正しい理由でない正しい形*であり、欠けている材料は制約であってパラメータ数ではない、と述べている。正直な枠づけは、これが**合成の関係タスクであって言語ベンチマークではない**ことだ。制御されたグラフスパース性を持つ`S_4`合成が理論の歯のあるところで、ここでテキスト上のtransformerを測ったものは何もない。だから「すべての可換なアーキテクチャに勝つ」は、対称性が正確に記述するタスク上でのアーキテクチャのクラスについての陳述だ。著者らが主張する道具として読むこと。対称性が存在するという診断であり、それが成り立つ場合の構成的な代替を伴う。

[`🔗 Attention as Lattice Gauge Theory：関係はWilsonループを通してのみ相互作用する（arXiv 2610.37656）`](https://arxiv.org/abs/2610.37656) · [`🔗 全文（PDF）`](https://arxiv.org/pdf/2610.37656)

---

## 53. 素のMuonは対数的にしか蓄積できない——だからMuonGSはノルムを直すのではなく動径成分を取り除く

- **Velocity:** ▮ rising
- **Source:** arXiv 2610.37647 · 2026-10-27 投稿
- **Tags:** `arxiv` `optimizers` `muon` `pretraining` `training`

論文は重みノルム制御がなぜ効くのかを問い、ヒューリスティクスではなく量で答える。**累積実効学習率**`C_T = Σ_{t<T} η_t / ‖W_t‖_F`（`η_t / ‖W_t‖_F`は重みノルムに対する公称ステップサイズ）。有界な更新方向に対して、任意の区間での蓄積は相対的な重み変位を上界づける——これが`C_T`を、ノルム制約が暗黙に管理しているものにする。他すべての動機になる結果はこうだ。「**素のMuonは対数的にしか蓄積できず**、探索を制限し、その遅い経験的進歩を説明する助けになり得る。一方**MuonWとMuonHは少なくとも線形の蓄積を保証する**」。提案の**MuonGS**は「**重みノルムを固定せずに**、Gram–Schmidt（GS）射影で各Muon更新の**動径成分を取り除く**」。保証は次のとおり。ノルムは「tステップ後に高々√tに比例して成長する」ので`C_T = Ω(√T)`で「後期の学習でも蓄積が持続する」、加えて滑らかなスケール不変目的に対して`O(T^{-1/2})`の定常性。経験的には**160M**と**400M**の密なモデル、および**135Mアクティブ／1B総**のMoEにわたり、MuonGSは「長い学習ホライズンでMuonHより低い検証パープレキシティを達成し」、密なモデルで「MuonHに対して一致した検証損失で最大約**15%**の推定トークン等価高速化」を持つ。

**Why it matters:** 再枠づけが貢献だ。「どれだけの学習率が実際に重みに届いたか」を、ステップごとのハイパーパラメータではなく軌跡上の**累積**量として扱うことが、「素のMuonは頭打ちになる」を不満から予測に変える。そして経験的だったノルム制約の文献を説明する。続く設計選択が優雅な部分だ。MuonWとMuonHはノルムを*固定*し、ノルムの自由度を手放すことで線形の蓄積を買う。MuonGSは自由度を保ち、動径方向だけを削除する——厳密により弱い介入で、対数より強い上界を持つ。限界は抄録が隠さず示唆するものだ。高速化は一致した損失での「**推定**」トークン等価であり、ウォールクロックの測定ではない。1つの密なモデルでの「最大**約**15%」であって平均ではなく、ベースラインはMuonの変種だ——つまりこれはMuon一族の内部についての結果で、MuonがAdamWに勝つかについては何も言わない。100M〜1BでMuonを使って学習しているなら、設定を変える2つの主張は`C_T = Ω(√T)`と「後期の学習でも持続する」だ。記述されている素の失敗モードは**後期**学習の平坦化だからだ。

[`🔗 MuonGS：緩和された重みノルム制御によるLLMの事前学習（arXiv 2610.37647）`](https://arxiv.org/abs/2610.37647) · [`🔗 全文（PDF）`](https://arxiv.org/pdf/2610.37647)

---

## 54. 新しい定数除算アルゴリズムがARMで30年来のベースラインを破る——そして一部のx86除数では負ける

- **Velocity:** ▮▮ rising
- **Source:** benjoffe.com / Hacker News · 92 pts · 約1日前
- **Tags:** `algorithms` `compilers` `integer-division` `performance` `c`

Ben Joffeは**10月27日**に「**The missing chapter of Hacker's Delight**」を公開した。**コンパイル時定数による符号付き64ビット床除算**の新しいアルゴリズムだ。枠づけは、この分野が「破綻している」というものだ。「主流のコンパイラと言語の多くはこれをネイティブに提供しない（例：C/C++/Go/Swift）」、それを提供するライブラリは「最速のアルゴリズムをほとんど使っていないように見える」、そして「**少なくとも1つの非常に著名なソフトウェアライブラリが4年以上にわたりオーバーフローする欠陥実装を持っていた**」。測定された主張は意図的に非対称だ。**ARM**では、MacBook Pro **M4 Pro**と**Snapdragon X1-26-100**で試験して、新アルゴリズムは「ほとんどの64ビット除数で既存アルゴリズムより**10〜20%速いスループット**（ときに対等）」で、レイテンシは同等以上。**x86**では——**Ryzen 9 9950X3D**とIntel Core i7——「**正の64ビット除数の約80%（負の除数の60%）で約5〜10%速いスループット**、**残りのx86ケースでは遅く**、レイテンシは*通常*劣る（ただし競合的）」。実例では、ARMで**86400**（1日の秒数）で割る場合、「一般的な」Rust/Zigの経路はベースラインの**約2倍**、Robison（2005）は**約1.1倍**、Granlund–Montgomery（1994）は**1倍**、新アルゴリズムは**約0.8倍**。コードはMITで、ビット幅と除数ごとにブラウザ内で生成される。

**Why it matters:** 結果の形が教訓で、本誌が確認することを覚えたものだ。単一の見出しの高速化が**プラットフォーム条件付き**の主張であり、負けるケースを同じ段落に書き、背後の「40以上の除数」にわたる除数別の表を伴う。ARMとx86が分かれる理由はアーキテクチャ的で神秘ではない。新しい手法は対象が安価な広い乗算を持つところで勝ち、既存の系列がすでにマイクロアーキテクチャのポートに収まっているところで負ける。これはまさに「速い除算」を「あなたのラップトップでは速く、ビルドサーバでは遅い除算」に変える種類の細部だ。疑うべき主張は確認できないものだ。4年間のオーバーフローのバグを持つ「著名なソフトウェアライブラリ」は記事本文でしか名指しされないので、見出しから検証できる引用ではなくJoffeの記事に属する。コンパイラやlibm隣接のルーチンを書く誰にとっても再利用できる事実は**床対切り捨て**の区別そのものだ。`a/b`が0ではなく−∞へ丸めると補正ステップが変わるので、両者の速いアルゴリズムは互換的でなく、「切り捨てのマジックナンバーを使えばいい」が複数のコードベースで黙って間違ってきた。

[`🔗 定数による符号付き64ビット床除算のより速い計算法`](https://www.benjoffe.com/fast-floordiv) · [`🔗 Hacker Newsの議論（92 pts）`](https://news.ycombinator.com/item?id=50256409)

---

## 55. MiniLakeはノートPC上でDatabricks APIを本物のDuckDBと本物のDeltaファイルで動かす——88スターとSDK駆動の378テスト

- **Velocity:** ▮ rising
- **Source:** dmux.github.io/minilake / Hacker News · 36 pts · 約1日前
- **Tags:** `databricks` `duckdb` `delta-lake` `local-dev` `mcp`

**MiniLake** v1.9.0は「**本物のSQL、本物のDelta Lake、本物のSparkジョブ実行**を備えたローカルの**Databricks APIエミュレータ**」で、`pip install minilake`またはコンテナイメージで導入でき、「`databricks-sdk`、Databricks CLI、Terraform、Asset Bundles、またはLLMエージェント」を`http://localhost:8000`に向ける用途だ——「**アカウントなし、APIキーなし、クラウド請求なし**」。ページ上の数は具体的だ。「Unity CatalogからSCIMまで、エミュレートされる**30以上**のDatabricks APIグループ」、「LLMエージェント用の**67**のMCPツールを同じポートで提供」、「**モックではなく本物のDatabricks SDKに駆動される378以上**のテスト」、「クラウド支出**$0**」。主張するアーキテクチャ上の区別が重要なものだ。「**モックサーバではない。** 偽のエンドポイントは壊れたコードを通してしまう。MiniLakeはSQLを**DuckDB**上で実行し、**本物のDeltaファイル**を書き、コンテナ内で本物の`spark-submit`ジョブを走らせる——だからローカルでのグリーンなテストには意味がある」。Unity Catalogはカタログごとに独自のDuckDBデータベースファイルとして実装されるので、`catalog.schema.table`のアドレッシングは「正規表現の書き換え」ではなくネイティブで、「イメージは実行時に何もダウンロードしない——**エアギャップ**で動く」。

**Why it matters:** 「整形されたAPIの背後の本物のエンジン」はこの種のツールの正しい設計で、理由は便宜ではなくテストの妥当性だ。`{"state": "SUCCEEDED"}`を返すモックは、不正な結合、誤ったDeltaスキーマ、呼び出し元が持たない権限で失敗できないので、生む失敗モードは本番を壊すコードに対するグリーンなCI実行だ。DuckDB上で実行するのは実用的な中間だ。DeltaとSparkの意味論は同一ではなく近似なので、「ローカルでグリーンなら意味がある」という主張は方向性のあるもので、正直な読みは「DuckDBが捕まえる誤りを捕まえる」だ。導入前に量るべき信号はリポジトリの大きさとページの数だ。**88スター**、**14フォーク**、**未処理3件**、作成**2026-07-25**、MIT、メンテナ1名——だから**378以上**のテストは小さなプロジェクトについての本物の数であり、**30以上**のAPIグループはエミュレーションが完全ではなく広く浅いことを意味する。MCPの行が最も早く古びるもので、名指しする価値がある。**同じポートの67ツール**がこれをエージェントが駆動できるローカルサンドボックスにし、「Terraformをテストする」とは実質的に違うユースケースで、プロジェクトの目的を最も変えそうなものだ。

[`🔗 MiniLake——Databricks APIがあなたのノートPC上で動く`](https://dmux.github.io/minilake/) · [`🔗 dmux/minilake（MIT、Python 3.11+）`](https://github.com/dmux/minilake)

---

## 56. Zero-Breach Toolkitは携帯とノートPC向けのオフライン・スパイウェア検査を出荷する——そしてクリーンなスキャンは証明ではないと言う

- **Velocity:** ▮ rising
- **Source:** GitHub / interplains/Zero-Breach-Toolkit · 3,141 stars · 作成 2026-10-25
- **Tags:** `forensics` `spyware` `privacy` `open-source` `incident-response`

**interplains/Zero-Breach-Toolkit**は**10月25日**に現れ、**3,141スター**、**341フォーク**、**未処理2件**、Apache-2.0、Python——4日前のリポジトリがすでにTrendingにある。それは「コンピュータ、Android携帯、iPhoneバックアップ上の既知の傭兵スパイウェア（**Pegasus、Predator、Graphite、Candiru**など）の痕跡を調べる無料のオープンソース検査」であり、4つの設計コミットメントが主張と同じブロックに述べられている。**「読み取り専用」**——「ソース証拠やシステム設定を変更しない。書き込むのは一時的なデータベーススナップショットと、要求したレポートだけだ」。**「スキャン中のネットワーク要求なし」**——「スパイウェアのアドレスを照会することはなく、アップロード機能もない。Pythonのネットワーク呼び出しはブロックされ、リダイレクトされたパスは拒否される」。限界も添えられている。「**これはOSのネットワークサンドボックスではない**。PRIVACY.mdを見よ」。**「限界を述べる」**——「すべてのレポートは何が見つかったか、証拠がどれほど強いか、何を検査できなかったかを述べる。**クリーンな結果は、あなたが安全である証明として決して提示されない。**」そして最悪のケースへの振り分け指示が、あらゆる手順より前に置かれる。「**いま自分が標的にされていると思うなら、まず専門家の助けを得よ。** このツールを走らせてから尋ねる必要はない」——Access NowのDigital Security HelplineとAmnestyのSecurity Labを指す。

**Why it matters:** 正直なスコープの陳述が価値のすべてだ。スパイウェアスキャナの失敗モードは検出漏れではなく、**クリーンな結果**が安心として読まれることであり、「あなたが安全である証明ではない」を第2段落に置き、「まず専門家の助けを」をインストール手順より上に置くツールは、自らの最もありそうな誤用に対して設計されている。ネットワークの主張は精密に読むに値し、プロジェクトがその精密さを供給する。Pythonのネットワーク呼び出しをブロックしリダイレクトされたパスを拒否することは*ツール*が外部へ通信するのを止めるもので、明示的にサンドボックスでは**ない**——だからクリーンなスキャンの主張は、それが動くマシンの信頼前提をすべて継承する。これはヘッジではなく、告げられるべき正しいことだ。想定読者も設計制約だ。ガイドは「技術的経験は不要…WindowsかMacのコンピュータと約20分」向けに書かれ、携帯はコンピュータに接続して検査する。だからオフライン・読み取り専用・アップロードなしのツールが、デバイスをベンダーに渡せないジャーナリストと市民社会の利用者にとって正しい形になる。そうでないもの。4日前で、未処理issueが2件、検出セットはプロジェクトが出荷する指標で定義される——だから支持する文は「検査を実行し、何も見つからなかった」であり、支持しない文は「私は感染していない」だ。

[`🔗 interplains/Zero-Breach-Toolkit（Apache-2.0、読み取り専用、ネットワークなし）`](https://github.com/interplains/Zero-Breach-Toolkit) · [`🔗 Zero Breach（これが基づく上流プロジェクト）`](https://github.com/interplains/zero-breach)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-10-29T12:15:40Z |
| Items | 56 |
| Sources tracked | 53（Hacker News、GitHub Trending、GitHub API、Google、Hugging Face、arXiv、GitHub Changelog、GitHubアドバイザリデータベース、CVE.org、NVD、CISA KEV、kernel.org、Cursor、Surge AI、Rapid7、CISA、So-net、Help Net Security、BleepingComputer、Cloud Security Alliance、we-have-a-problem.com、nullpt.rs、fingerprint.garden、VentureBeat、macro.com、AlpineBSD、Alpine Linux、divagr.com、v12.sh、Cloudflare、Broadcom、Dell、Artificial Analysis、Cartesia、WIRED、DDoSecrets、Stack Exchange、Tencent、Apple、Cisco PSIRT、Lumen Black Lotus Labs、smsofdeath.com、blog.orange.tw、Juniper SIRT、Eclipse Foundation、Signal K、GHSA、flamerix.ai、benjoffe.com、dmux.github.io、PyPI、CopilotKit） |
| Update schedule | 04:03, 12:03, 20:03 UTC+8（1日3回） |
| Ranking | Velocity-weighted（新しさ × エンゲージメントの加速度 × 情報源の権威） |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[前日](2026-10-28.md) · [生の .md](2026-10-29.md) · [アーカイブ](../archive/)
