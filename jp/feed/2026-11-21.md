---
date: 2026-11-21
updated: 2026-11-21T12:46:45Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 27
license: CC-BY-4.0
---

# トレンド — 2026-11-21

## 1. 同日に2つのGRH証明主張――1つは「Claudeと共に」、1つは「すべて人間」――さらにNavier–Stokesの blow-up 主張まで

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 1,941+ pts · ~6h 前 (~22:15 UTC+8)
- **Tags:** `mathematics` `ai-assisted-proof` `lean` `grh` `navier-stokes`

2026年11月20日は、数年ぶりに数学がおかしな日になった。Levent Alpöge がリーマン予想とその一般化の証明を主張した――"I believe I have, working with Claude, discovered a proof"――しかも読める論文はない。論証は Lean 形式化として存在し、14個の tar 分割ファイルで公開されている。Tao はこれを"an (enormous) Lean-only proof of the Generalized Riemann Hypothesis"と紹介する。同じ発表は3つの結果を同時に含む。Tao の記事は"in decreasing order of how 'digested' the results currently are"の順に並べる――3次元非強制 Euler 方程式の有限時間 blow-up 証明（Alpöge、Buckmaster、Coiculescu、 heav AI assistance、Lean 形式化済み）、非強制 Navier–Stokes の blow-up（Alpöge & Buckmaster、79ページの論文と約60万行の Lean ライブラリ、[リポジトリ](https://github.com/tristanbuckmaster/navier-stokes)は昨日作成）、そして GRH。さらに脚本家でも書けないどんでん返しがある。スタンフォードの Ravi Vakil が*もう一つの独立した* GRH 主張――Alessandro Masullo の草稿――を公表した。"this is urgent"のため会議の合間に発表した形で、"It is all human, with no AI"と強調し、Brian Conrad が"for months"検証していて"so far looking good"という。

**Why it matters:** AI 支援という問いはもはや仮定の話ではない。ミレニアム級の主張の一つは Claude を名指しし、もう一つは AI を明示否定する。両者が同日に到着し、どちらも*信じる*のではなく*検証できる*状態にする重荷を Lean 形式化が担っている。Tao の言い方が正直なのだ。消化されるまで何も証明されていない。Navier–Stokes のリポジトリ自体、論文がハッシュを示す証明書について"is not in this repository; the paper says that it will be released."と明記している。

> 見出しを引用する前に、リポジトリ自身の注意書きを。パッチ適用後の Lean パッケージは"was not rebuilt when this repository was assembled"。Tao は Navier–Stokes について"more work needs to be done to create a proper, professionally written proof"と書いている。

[`🔗 Alpöge の発表（PDF）`](https://alpo.ge/remark.pdf) · [`🔗 Navier–Stokes 論文 + Lean 形式化`](https://github.com/tristanbuckmaster/navier-stokes) · [`🔗 Terry Tao：3つの主張を消化度順に`](https://terrytao.wordpress.com/2026/11/20/unforced-euler-singularity-unforced-navier-stokes-singularity-and-the-generalized-riemann-hypothesis/) · [`🔗 Vakil が Masullo 主張を公表`](https://math216.wordpress.com/2026/11/20/hurried-announcement-alessandro-masullo-grh/)

---

## 2. "I'll never buy Framework hardware again" が700点超え――その直後、著者が本文を削除し"ENODRAMA"だけを残した

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 713+ pts · ~4h 前 (~00:15 UTC+8)
- **Tags:** `hardware` `framework` `support` `consumer`

OpenSMTPD の作者 Gilles Chehade が Framework ノートPCのサポート紛争について長文の不満を投稿したのは昨夜。瞬く間にこの日の HN で2番目に大きなスレッドになった（713点、460コメント）。今朝には本文が消えていた。元のURLに残るのは4行の TL;DR だけだ。"This post ended up on Hacker News and got a lot more attention than I expected. I'm not trying to hurt Framework beyond repaid (pun intended); I want them to fix their support. I want them to give us what we paid for, a working laptop."――その後に"ENODRAMA. Move along, there's nothing to see here anymore."

**Why it matters:** 紛争の詳細は今やスレッド内の引用とキャッシュにしか存在しない。ハードウェア愛好者コミュニティで最も共有された批判が、バズから数時間で取り下げられる過程の小さな事例研究だ。460コメントの議論こそが記録を保持している。この話を引用するならスレッドを。元記事はもう担い手ではない。

[`🔗 現在の状態の投稿`](https://poolp.org/posts/2026-11-20/ill-never-buy-framework-hardware-again/) · [`🔗 HN 議論（460コメント）`](https://news.ycombinator.com/item?id=50576855)

---

## 3. 昨日の weight-space programming に続き：オープンな27Bモデルが*自らの*重みを書き換える――勾配なし、学習なし

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 237+ pts · ~4h 前 (~00:15 UTC+8)
- **Tags:** `ai-research` `weight-space-programming` `self-improvement` `arxiv`

昨日の項は weight-space programming のベンチマークと Edit-Ready Training を扱った。この波の2本目の論文はさらに奇妙だ。arXiv 2611.21885（Jiajun Fan ら、v1 は11月16日）、"Language Models Can Rewrite Their Own Weights"は、著者らが *self-rewriting* と呼ぶものを報告している――"the model is its own optimizer"。オープンな27Bモデルが、自身の重み・採点済みの回答・自己実行の能力を与えられ、失敗を診断しその背後の重みを書き換える。"6.6 points more accurate on problems it never saw"を達成し、8回連続のセッションで精度が上がり続け、元の重みを読まずに破損した自分のコピーを元の精度の80%超まで修復する。要旨で最も鋭い観察は、この能力が"emerges with scale"すること――同じモデル族で小型モデルは"make no edit or break themselves"。

**Why it matters:** 2日で3つの成果物――ベンチマーク、学習レシピ、そして自己編集するモデル。研究分野はこう組み上がる。昨日の項が指摘した安全上の問いも鋭くなる。重み編集がモデルが*自ら*行うことになれば、"Weight Space Misfolding"脅威モデル（11月14日）の対象は外部攻撃者だけではなくなる。

[`🔗 arXiv: Language Models Can Rewrite Their Own Weights`](https://arxiv.org/abs/2611.21885) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50577265)

---

## 4. CISA の最新 KEV バッチ：vCenter 認証バイパスと Expressway の root RCE――4件すべて期限は11月23日

- **Velocity:** ▮▮ rising
- **Source:** CISA KEV Catalog · 4 entries added 2026-11-20 · deadlines 2026-11-23
- **Tags:** `security` `kev` `vmware` `cisco` `ransomware`

11月20日、既知の悪用される脆弱性カタログ（KEV）に4件が追加され、各項目に11月23日の3日間の連邦政府修復期限が付いた。筆頭は **CVE-2026-123890**――VMware vCenter の Directory Service における認証バイパス（9.8、VMware が CNA として採点。レコードは本実行の 11-21 再読時点で`Analyzed`、lastModified 2026-11-21T05:18Z――11-20 20:16Z の読み取りでは`Undergoing Analysis`で、約 36 分後に分析が完了した）。修正版は 9.1.1.0200、9.0.2.0200、8.0 U3m、5.2.5 で、Telco Cloud Platform のビルドも影響を受ける。並ぶのは **CVE-2026-76466**。Cisco Expressway Series で、データベースサービスのハードコードされた資格情報とクライアント証明書検証の欠如により、未認証の攻撃者が"execute arbitrary operating system commands as root"できる（9.8、Cisco が CNA として採点）。残り2件は **CVE-2026-129448**――Apache Roller の XML-RPC 逆シリアル化 RCE（9.8）。11月17日に新しいアドバイザリとして扱ったばかりのものが KEV 入り――と **CVE-2025-42884**、SAP NetWeaver Enterprise Portal の JNDI インジェクション（6.5）。

**Why it matters:** vCenter のディレクトリサービス・バイパスに72時間の期限が付くのは、すべての VMware 環境で週末の緊急パッチ適用を駆動するタイプの登録だ。BOD 22-01 の運用者は公開日ではなく11月23日を期限として扱うべきだ。

[`🔗 CISA KEV Catalog`](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) · [`🔗 NVD: CVE-2026-123890`](https://nvd.nist.gov/view/vuln/detail?vulnId=CVE-2026-123890) · [`🔗 NVD: CVE-2026-76466`](https://nvd.nist.gov/view/vuln/detail?vulnId=CVE-2026-76466)

---

## 5. Signal が OS の AI エージェントによる画面読み取りをブロック開始――iOS 27 と Android で、macOS は対象外

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 360+ pts · ~10h 前 (~18:15 UTC+8)
- **Tags:** `privacy` `signal` `ai-agents` `mobile`

Meredith Whittaker の記事は、Microsoft Recall に対する Signal の手法を、OS レベルの画面読み取りエージェントを搭載し始めた2つのモバイルプラットフォームに拡張する。iOS 27 では Signal がスクリーンショット防止を有効にし、Siri の"Onscreen Awareness"がメッセージを取得できないようにする。Android では Google Gemini のようなアシスタントが画面を読もうとすると、Signal が自動的に"Screen security"設定をオンにする。記事は穴にも率直だ。信頼できるスクリーンショット防止 API がないため macOS は保護できず、一部の Android ベンダービルドもカバーできず、アクセシビリティ権限を悪用するサードパーティ製エージェント――"a skeleton key"――として Meta の Muse を名指しする。Signal は最後に Apple・Google・Microsoft への2つの要求を置く。開発者が AI によるデータアクセスをオプトアウトできる文書化された方法と、エージェントがデータにどうアクセスし処理するかの真正的な文書化だ。

**Why it matters:** アプリ層と OS 層はデフォルトで敵同士になった。Signal はこの傾向を"an existential threat to privacy at the application layer"と呼ぶ。プライベートな内容を持つすべてのアプリが同じ決定を迫られる。Signal の技術力も交渉力も持つアプリはほかにない。

> "Signal is the canary in the coal mine, but this affects the entire ecosystem."

[`🔗 Signal ブログ：Protecting Your Privacy`](https://signal.org/blog/protecting-your-privacy/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50572348)

---

## 6. Mozilla：DMA から3年、iOS で非 WebKit ブラウザは依然ゼロ――"the open door feels more like a trap door"

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 257+ pts · ~5h 前 (~23:15 UTC+8)
- **Tags:** `browsers` `apple` `regulation` `mozilla`

Mozilla のポリシー記事は代替ブラウザエンジンの成績表を作った。EU の条件はほぼ3年、日本の同等規則は約1年経つが、iOS に非 WebKit ブラウザを投入した開発者はいない。反実仮像は数字にある。DMA の選択画面以降"millions have picked Firefox, and daily use on iOS has doubled"。しかし Apple の条件は、Firefox に別の第2アプリを強制し、ブックマーク・パスワード・履歴の手動移行を求めるものだ。Apple 自身のアプリなら決して受け入れない摩擦だ。記事の結論は"The reason is simple: Apple's conditions remain unworkable."。

**Why it matters:** 規制されたアクセスが実アクセスなのかを試すケーススタディだ。条文上は満たし、結果として進入者ゼロというコンプライアンス体制の実例。ブラウザエンジンの多様性は今や AI ポリシーの問いでもある。エージェントがどのエンジンで動くかが、どのルールが適用されるかを決める。

[`🔗 Mozilla：Why there are still no non-WebKit browsers on iOS`](https://blog.mozilla.org/en/mozilla/internet-policy/apple-ios-browser-engine-rules/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50575644)

---

## 7. crun コンテナランタイム：共有ボリュームのコンテナがホストのファイルを上書きできる――`/proc/sys` を含む（7.8、RHEL 全線で未修正）

- **Velocity:** ▮▮ rising
- **Source:** NVD · CVE-2026-133553 · published ~16h 前 (~12:17 UTC+8)
- **Tags:** `security` `containers` `crun` `tocbou`

Red Hat の CNA が、Podman の土台である OCI ランタイム crun の欠陥を公開した。`tmpcopyup` でマウントされた tmpfs にファイルをコピーする際、crun は"opens the destination a second time by name"。生成中のコンテナと書き込み可能なボリュームを共有するコンテナが、2回のルックアップの間でそのパスを差し替えられると、crun は"copies image files onto host files, including files under /proc/sys"。レコードは7.8（`Secondary`、CNA 自己採点。NVD は`Awaiting Analysis`）。Red Hat 自身の修正状態データは crun を RHEL 8・9・10 の全線で`Affected`とし、OpenShift Container Platform 4 と 5 は`Under investigation`のまま。crun の最新リリース（1.31、11月12日）はレコードより前で、レコードにも Red Hat のデータにも修正版はまだ示されていない。

**Why it matters:** この種の欠陥はコンテナ/ホスト境界を*内側から*破る。カーネルのエクスプロイトは要らない。共有ボリュームとレース条件だけでいい。修正リリースが出るまでの実務的な緩和は、信頼境界をまたぐ書き込み可能ボリュームの共有を止め、2回目のルックアップを閉じる crun リリースを監視することだ。

[`🔗 NVD: CVE-2026-133553`](https://nvd.nist.gov/view/vuln/detail?vulnId=CVE-2026-133553) · [`🔗 Red Hat CVE データ`](https://access.redhat.com/security/data/cve/CVE-2026-133553) · [`🔗 containers/crun`](https://github.com/containers/crun)

---

## 8. "If you stop writing code, you also get worse at reviewing it"――スキル萎縮のエッセイが HN フロントページに

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 277+ pts · ~7h 前 (~21:15 UTC+8)
- **Tags:** `craft` `ai-coding` `career` `essay`

Christian Ekrem の投稿は、言われてみれば当然のことを言う。他のすべての分野では練習なき技能の劣化が自明の前提なのに、エンジニアだけはエージェント出力のレビューを一日中していても腕が鈍らないと自分を説得してきた、と。彼の論証：レビューは練習ではない――"you're not really reading half of it, are you"――より深いコストは、LLM への重度の依存が努力そのものの回避を訓練することだ。"Repeated LLM usage for problem solving pounds the following premise into our brain's wiring: If something is hard, tricky or requires effort, you shouldn't even try."これは彼が批判する前提であって、主張ではない。

**Why it matters:** 今週のハーバードの企業レベル研究（11月18日）と同時着地だ。コード出力は76%増、最終成果物は9〜11%増、ボトルネックはレビュー――この記事はその差を生むメカニズムを名指しする。エージェントコードをレビューする人が、レビューに必要なまさにその技能を失いつつあるのだ。

[`🔗 If you stop writing code, you also get worse at reviewing it`](https://cekrem.github.io/posts/if-you-stop-writing-code-you-also-get-worse-at-reviewing-it) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50573886)

---

## 9. Google 従業員が経営陣に請願：Gemini を拒む学校から Search を切るな

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 123+ pts · ~3h 前 (~01:15 UTC+8)
- **Tags:** `google` `ai-in-education` `policy` `labor`

11月14日に Google の"AI or nothing"ポリシー（Gemini/AI Overviews を無効にした学校は Search を失う）を扱ったが、内部からの反応が届いた。数百人の Alphabet Workers Union メンバーが経営陣に撤回を求める請願を出したのだ。ポリシーは2週間前の投票日に発表された。Mother Jones はそれ以降各地で抗議が起きたことを報じ、経営陣の見方を Google スタッフの言葉で伝える。彼らは"convinced that resistance to AI"は学校が"don't see the vision"だけだと。請願は、Search という代替不可能なインフラを AI 導入と結びつけるのをやめるよう求めている。

**Why it matters:** 2026年の二つの動力学が1つの枠に収まっている。AI の配布が代替不可能なインフラとのバンドルで売られること、そして規制者が成し遂げられなかった監視を労働力が担うこと。このバンドルが次にどこへ着地するか（より多くの州？裁判所？）が、例外で終わるか型になるかを決める。

[`🔗 Mother Jones：Google Workers Tell Their Employer Not to Punish Schools`](https://www.motherjones.com/politics/2026/11/google-alphabet-union-school-ai-protest-gemini-workers-petition/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50577901)

---

## 10. Epic Games が Unreal Engine を AI エージェント中心に再設計――Blueprints が退場し、Verse と Scene Graph が登場

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 54+ pts · ~8h 前 (~20:15 UTC+8)
- **Tags:** `game-engines` `unreal` `ai-coding` `epic`

IEEE Spectrum の深掘り記事（11月18日）はエンジンレベルの賭けを描く。Unreal Engine 6 は Blueprints を廃止する――"AI doesn't handle Blueprints very well"とあるスタジオ創業者は言う。バイナリとして保存されているからだ。代わりに厳格なテキスト言語 Verse を使い、OOP の actor フレームワークをエンティティコンポーネント方式の Scene Graph で置き換える。UE6 はより多くのシステムを API で公開し、"so that AI tooling can get at them without needing to fall back to slow computer use"（開発担当 EVP Marcus Wassmer）。エディタ全体をスクリプト可能にする社内計画は"Python All The Things"と呼ばれ、より多くのアセットがエージェントが直接編集できるテキストとして保存される。COO Daniel Vogel のエディタ観："You're not going to move stuff visually in the editor. Those times are gone."11月9日の UE 5.9 開発者プレビューがその最初の一口を届ける。Miro から着想を得たエージェント作業用キャンバス Unreal Canvas だ。

**Why it matters:** 最も使われているゲームエンジンが*非人間のオペレーター*のために再設計されている。記事の最も鋭い一点は逆向きにも刺さる。Unreal をスクリプト可能にしたのと同じ AI が Godot への乗り換えを"trivial"にする。Epic の堀はこれからはロックインでなく速度でなければならない。（"This is why we are pivoting hard towards velocity."）

[`🔗 IEEE Spectrum：Epic Games Turns to AI Coding for the Unreal Engine`](https://spectrum.ieee.org/epic-games-unreal-engine-ai) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50573681)

---

## 11. HippoMaps：OpenStreetMap 上の決定論的自然言語検索――ループに LLM なし

- **Velocity:** ▮ steady
- **Source:** Hacker News · 112+ pts · ~29h 前
- **Tags:** `openstreetmap` `search` `nlp` `maps`

伸び続けている Show HN。HippoMaps は OpenStreetMap 上の完全な地図・ナビアプリで、カスタム Overpass API エンジンを持つ。だが真の主題はクエリパーサーだ。作者いわく"I started working on a deterministic (as in no LLMs used) parser of queries that translates them to the Overpass QL"。クエリはトークン化され、"何"と"どこ"は既知ブランド・スポーツ・OSM タグなどの語彙リストから解決される。モデルではない。"cafes by the Limmat 100 m from the lake in Zurich"と入力すれば構造化された Overpass クエリにコンパイルされ、即座に返ってくるほど速い。

**Why it matters:** あらゆる検索面が LLM で包まれている一週間に、Google Maps 級の最後の機能――自然言語による場所検索――が決定論的にできることを示す動くデモは、工学の成果であると同時にコストとレイテンシの議論でもある。スレッドは OSM コミュニティのウィッシュリストのように読める。難しい部分（クエリ理解）こそ、それが解いた部分だ。

[`🔗 HippoMaps`](https://hippomaps.ch/) · [`🔗 Show HN 議論`](https://news.ycombinator.com/item?id=50561199)

---

## 12. floppy3.5：3.5インチフロッピードライブが WiFi NAS になる――Sony Mavica のために

- **Velocity:** ▮ steady
- **Source:** Hacker News · 114+ pts · ~30h 前
- **Tags:** `hardware` `retro` `raspberry-pi` `nas`

手のひらサイズのデバイス。1.44 MB FAT12 のフロッピーをスリムドライブに挿すと WiFi 経由で供給する。RP2354A フロッピーコントローラが Greaseweazle プロトコルで動き、ESP32-S3 がブリッジを務め、写真はブラウザの `floppy.local` で見えて microSD にコピーできる。90年代にフロッピーに写真を保存した Sony Mavica のようなデジタルカメラから写真を救い出すために作られた。両チップは OTA 更新に対応し、ハードウェアは1枚の自作 PCB。v1.1.0 は11月17日に品質修正付きでリリースされた。

**Why it matters:** 半分はノスタルジア、半分は本当に役に立つアーカイブツール。Mavica ユーザーはみな、読めない機械とディスクの箱を抱えている。設計の見本でもある。RP2350 ファミリの1チップが Greaseweazle でフラックスレベルのフロッピー IO をこなし、1.44 MB の上に全部を載せている。

[`🔗 bigcrimping/floppy3.5`](https://github.com/bigcrimping/floppy3.5) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50560595)

---

## 13. tamserve：動画トラッキングの vLLM 流サービング――SAM 2 のコピー1つで 1 GPU に64カメラ

- **Velocity:** ▮ steady
- **Source:** Hacker News · 122+ pts · ~95h 前
- **Tags:** `computer-vision` `inference` `sam` `serving`

tamserve は SAM 2/EdgeTAM が持たなかったサービング層だ。公式コードは録画済み動画を1本ずつ追跡するため、多カメラ運用ではカメラごとにモデルのコピーを置くことになり、メモリが積み上がる。tamserve は全カメラを単一の共有コピーへバッチ処理する――"what LLM servers such as vLLM do for chat"。README 自体の表が証拠を出す。8カメラで GPU メモリは 8.6 GB から 2.2 GB へ、1カメラは 177 から 219 フレーム/秒へ、8カメラは 323 フレーム/秒、64カメラ――旧方式では約 70 GB――が 5.7 GB で 321 フレーム/秒。精度は"unchanged on DAVIS 2017"。Apache-2.0、Colab クイックスタート、6つのライブカメラが9つの物体を追うデモ動画付き。

**Why it matters:** 継続的な世界監視はエージェント時代の vision が向かう作業負荷であり、2023年にチャットがぶつかったのと同じ壁に当たる。リクエストごとのモデルコピーはスケールしない。LLM からトラッキングへバッチ共有パターンが移植されること、そこが一般化できる部分だ。

[`🔗 aryamandarda/tamserve`](https://github.com/aryamandarda/tamserve) · [`🔗 Show HN 議論`](https://news.ycombinator.com/item?id=50523377)

---

## 14. Dettato：20M パラメータの音声→MIDI モデルが 1.3B に勝つ――学習には著作権録音を一切使わず

- **Velocity:** ▮ steady
- **Source:** Hacker News · 183+ pts · ~91h 前
- **Tags:** `audio` `midi` `music-ai` `open-source`

Kobi の Dettato（11月16日発表、まだ伸びている）は 20M パラメータで SOTA の音声→MIDI 転写を報告する。"roughly 65x smaller than muscriptor"（composite 47.4）。Mirelo 独自の公開ベンチマークで、そのクローズドソースの A2M v1.1 Pro（56.1）を少し上回る composite 60.8。セットごとの F1 表も全文公開されている。見出しより価値のある正直さが2つある。モデルは"trained on absolutely no copyrighted recordings"であり、disclaimer が自ら弱点を名指しする。"one thing my model performs poor on for instance, is splitting instruments correctly"――楽譜を求める人には Songscription と Klangio を勧めている。

**Why it matters:** 65倍小さいオープンモデルが相手の自宅ベンチマークで勝つ、セットごとの数字と失敗モードの明示付き――ベンチマーク合戦はこうあるべきだ。転写はデータ権利でも健全な話だ。学習音声は著作権素材ゼロ、商用利用可。

[`🔗 Dettato：モデルカードとベンチマーク`](https://kobi.music/research/dettato) · [`🔗 Show HN 議論`](https://news.ycombinator.com/item?id=50526023)

---

## 15. Thinking Machines が Inkling 2 Mini を公開——重み公開の「ループした transformer」、ラップトップで動くサイズ

- **Velocity:** ▮▮▮ trending
- **Source:** Thinking Machines · 780+ pts · ~8h 前 (~04:15 UTC+8)
- **Tags:** `ai-models` `looped-transformer` `open-weights` `local-inference` `monitorability`

Thinking Machines が重み公開の Inkling 2 Mini をリリースした。"a looped transformer, running the middle layers of the model three times for every token"——total 26.4B / active 3.4B の MoE で、保存は 24 层・トークンごとに 48 回適用する。"Looping allows the model to reason longer without writing its reasoning down"。目玉の主張はこれだ："leads every open-weights model with less than 100B total parameters on benchmarks such as DeepSWE v1.1 (48.2%) and Vals Index v2.2 (46.5%)"。SWE-bench Pro v2 Hard は 77.9%（表には各評価の harness が明記してある）。スタンフォード Hazy Research の「ワットあたり知能」実測は DGX Spark 上で 0.703——測定した 4 つのローカルモデルの最高で、2 番手は 0.430。"The total memory footprint of Inkling 2 Mini is ~20GB"。学習もデプロイもネイティブ NVFP4（最後の 4 层は MXFP8）で "no conversion loss from quantization"。Ollama なら 32GB+ RAM の Mac で動く——公開デモは MacBook Pro の機内モードでオフラインのままフライトシミュレータを組み上げるというもの。同時に TML-d24-varloop-research（可変ループの研究用モデル、Hugging Face 公開）も出した。ループが直接突きつける問いのためだ：no-CoT タイムホライズンは "from 16 seconds at one pass to 37 seconds with three" に伸びたが、思考連鎖は "grew shorter with more loops but stayed legible throughout"。

**Why it matters:** ループ構造は CoT モニタリングの懸念に真っ向から挑む——トークンあたりの内部計算が増えるほど、テキスト化されない推論が増える——なのに Thinking Machines は測定をモデルと一緒に出した：このスケールでは有意なモニタリング劣化は見られず、agentic 破壊テストもループ数とともに上昇しなかった。ベンチマークの前に限界節を読むべきだ：マルチターン対話と多制約指示は依然 Qwen3.8-27B に後れを取っている。

> "Inkling 2 Mini is not the strongest small model for multi-turn chat or for instructions with many constraints: it scores 50.0% on MultiChallenge and 33.4% on ComplexConstraints v1.1, behind Qwen3.8-27B on both."

[`🔗 Thinking Machines：Introducing Inkling 2 Mini`](https://thinkingmachines.ai/news/inkling-2-mini/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50581260)

---

## 16. 「We promoted developers into architects without informing them」——vibe coding 反発に、ようやく職務記述書が届いた

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 335+ pts · ~10h 前 (~02:15 UTC+8)
- **Tags:** `craft` `ai-coding` `architecture` `essay` `career`

Google Forms アドオン開発者の投稿（335+ ポイント、200+ コメント）は、15 秒かかるウェルカム画面から始まる。同僚がインストールロギングを vibe coding し、Google の同意制限に対する AI の答えが三重の try/catch フォールバックだった——"all of these are one line of code, but internally each of these makes multiple API calls to Google servers"——しかも描画より先に実行される。診断はこうだ："AI is great at writing code. But it doesn't know if you are launching the app or have millions of users"。そして "it is also sycophantic and tries to execute your requirements exactly without pushing back"。エッセイの一手は仕事の改名だ："if you generate code by specifying your requirements instead of specifying your architecture, AI will decide the architecture on your behalf"——だからデータモデルを先に定義し、agent を自分のアーキテクチャに拘束し、後方互換のために重複テーブルを残すかを自分で決め、"the way an architect reviews a developer's code" レビューしろという。

**Why it matters:** 今バッチのスキル萎縮エッセイ（第 8 項）の建設的な対だ。あちらは喪失を名指しし、こちらは誰も告げなかった昇進を名指す——"You got promoted. Nobody told you, so I am telling you."。ハーバードの企業レベル研究（11 月 18 日）がメカニズムを補う：レビューがボトルネックなら、コードが存在する前に要件に「ノー」と言える人が希少な役割になる。

[`🔗 We promoted developers into architects without informing them`](https://manidoraisamy.com/developer-to-architect.html) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50579331)

---

## 17. DreamCoder：Mastering Emacs の作者が 15 か月かけてブラウザネイティブのコーディングハーネスを作った

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 140+ pts · ~8h 前 (~04:10 UTC+8)
- **Tags:** `coding-harness` `emacs` `agent-tools` `ide`

Mastering Emacs の作者 Mickey Petersen が DreamCoder を発表した。"a frontier coding harness with a tiling window manager that runs in your browser on all 3 platforms"。2025 年 5 月に手書きで始め、掛かったのは "15 months of work"。設計は agent 時代への Emacs の翻訳だ：すべてのペインに minimum/comfortable/maximum サイズがあり "a sophisticated constraint satisfaction solver" が解く。workspace は仮想デスクトップとして振る舞い、workspace ごとのミニマップは agent の稼働中に脈打ち、詰まったものを浮かび上がらせる。avy 式ジャンプと Helm 的パレットが tab 循環を置き換え、`Alt+x` がグローバルコマンドを呼ぶ。フロンティアハーネスのチェックリストは埋まった——"MCP, backgroundable sub agents and shell commands, terminal windows, skills, hooks, 99% cache hit, it runs for days"——Pi・OpenCode・Codex 設定のインポーター付きで、オープンウェイトモデルを一等公民で支える（"Qwen 3.8 27B, for example, is fantastically good for its size"）。エッセイの転換点：Emacs で書き始めたのに、"only to see DreamCoder write itself… in DreamCoder today" になった。

**Why it matters:** "Taste is a scarce, human resource." が論点で、ハーネスというカテゴリはその検証場だ——競合はみな同じチャットサイドバー形に収束する。味覚だけはモデルが供給しないからだ。彼が次に DreamCoder 内で作ると宣言しているのはペネストレートスイートで、"built for humans. The AI does the work."

[`🔗 Announcing DreamCoder`](https://www.masteringemacs.org/article/announcing-dreamcoder) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50581110)

---

## 18. NINLIVE：ファン運営の Nine Inch Nails ライブアーカイブ 1,210 公演——1988 年からストリーミング可能に

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 160+ pts · ~5.5h 前 (~06:35 UTC+8)
- **Tags:** `archives` `music` `streaming` `fan-projects`

フロントページの伏兵はファン運営の Nine Inch Nails ライブアーカイブだ：1,210 公演、1,949 録音、4,675 の写真とメディア、363 曲をトラッキング、46 か国・373 都市をカバー。スレッドの引き金になったのは 11 月 16 日の更新 "The Future Is Here - ninlive Streaming 1988-2026" だ："You are now able to stream all of your favorite NIN live recordings from 1988-2026"。お気に入り保存には Discord ログイン。更新ログはアーカイブ管理を生きがいにした人の日誌のように読める——1994 年 LA 公演に未流通の DAT マスターが現れ（"First recording available from the third and final night!"）、同じ taper のために "200 DAT tape project" を仕上げたばかり、チケットの半券とセットリストのスキャンが公演ごとに撮影されている。フッターは簡潔だ："Fan run, not affiliated with the band."

**Why it matters:** 今週の Salon 保存や Apple フォーラム救出と同じ本能だ：耐久物はアーカイブであり、地味な工学——テープの世代トレーサビリティ、ストリーミング基盤、公演ごとのメタデータ——は、一つのバンドのテープの系譜のためにボランティアが無償でやっている。

[`🔗 NINLIVE`](https://ninlive.com/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50583274)

---

## 19. 推論チップを vibecoding する：FPGA が LLM を 213 tokens/s で実行——その前に agent が約 300 万行書いた

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 120+ pts · ~10h 前 (~02:15 UTC+8)
- **Tags:** `fpga` `ai-coding` `inference` `hardware`

Ankit Gupta の実録：AWS F2 FPGA インスタンス（16 GB HBM）を借り、クラウド agent を DeepGrove の ternary ウェイト設計に向け、数日後にハードウェア上の bit-exact な LLM 推理を得た——"increased its speed by 33× from the first full-model bit-exact baseline to get it to a real-time relevant speed"。6 → 213 tokens/s は 14 段の複利型最適化の積み重ね（burst attention、並列 MoE ルーター、ドラフトモデル付きの正確な投機デコード、可損 5-trit ウェイトパッキング）。請求書："roughly 3M lines across the experiment history and parsing 30M lines of output files, burning only $10,000 in Claude and OpenAI tokens."。彼のプロンプトはたいてい励ましだった——"you're a superintelligent model, time to be more creative"——そしてベテランの FPGA 設計ガイドを貼り込んだとき、agent 自身の回顧はこうだった："Its biggest design ideas were already in my plan before you pasted it."

**Why it matters:** 移植可能なのは検証の規律だ——CPU リファレンスに対する bit-exact 契約を貫き、シミュレーション、タイミング、実ボードの結果を別々に保管——そして Gupta の結論が分業を正確に名指す："the humans are still useful at defining how to iterate fast and what correctness looks like, and the agents are great to manage the exploration."

[`🔗 Vibecoding an inference chip`](https://ankitg.me/blog/vibecoding-inference-chip/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50579297)

---

## 20. Winedroid：本物の Android APK がブラウザで動く——「essentially replicates Android」な Rust ランタイム

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 115+ pts · ~8.5h 前 (~03:35 UTC+8)
- **Tags:** `android` `wasm` `rust` `emulation`

Show HN のデモが F-Droid の APK——OpenCalc、瞑想タイマー、ファイルエクスプローラ、天気アプリ——を Android なしでブラウザ上で動かしている。FAQ によれば Winedroid は "written completely in Rust and it essentially replicates Android so it works everywhere"。ブラウザがロードするランタイムは "12MB right now"。リポジトリ（本日作成、読み取り時 86★）の対象は "Web, Linux, macOS and Windows"。弱点も先に自白してある：JIT は web ターゲットで動かないためブラウザデモはネイティブより遅く、アプリ対応は "still improving day by day"。

**Why it matters:** Wine の元祖の技——機械ではなく API サーフェスを再実装する——を Android に適用すると、アプリを Google のランタイムから切り離せる。かつて Wine が Windows ソフトを Windows から切り離したように。まだ早いが、ブラウザネイティブというターゲットが面白い賭けだ：アプリストアなしの配布。

[`🔗 winedroid デモ`](https://winedroid.soham.sh/demo/) · [`🔗 sohzm/winedroid`](https://github.com/sohzm/winedroid)

---

## 21. Slopstrap：誠実なウェブサイトを「雑に vibe coded した風」に見せる CSS フレームワーク

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 110+ pts · ~12.5h 前 (~23:15 UTC+8)
- **Tags:** `satire` `css` `vibecoding` `design`

Mike Lacher のパロディフレームワークは、2026 年の生成系ランディングページの破綻パターンをすべてコピペ部品にした：点滅するステータスドット（"All Systems Operational"、"0 Real Incidents"）、太い彩色左ボーダー、"low-contrast slate-400" の本文に載るグラデーション見出し、"one arbitrary italic serif word"、"fracture any simple paragraph into an asymmetrical grid of glowing rounded boxes" な bento グリッド、自動生成の推薦文（"Sarah Chen has used your product and can't stop talking about it"）、スクロールで数字を数え始める統計カード。デモは "Bob's Local Plumbing & Pipe Repair"——1998 年から Springfield で営業、"we actually pick up the phone when your basement is flooding"——に `Slopstrap.slopify('#plain-demo')` を実行し、ワンクリックで光るカードグリッドに変える。

**Why it matters:** パロディが分類学の仕事をしている：このキットは「どの視覚シグナルが今や機械生成と読まれるか」のチェックリストそのもので、`/agents` ページまで備える——"Why use an agent if people can't tell an agent made your site?"——オチは、slop ルックが agent がオンデマンドで再現するジャンルになった、ということだ。

[`🔗 Slopstrap`](https://slopstrap.mikelacher.com/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50576012)

---

## 22. pip に 9.3 が：26.2.2 未満がバンドルする certifi に漏えいした eMudhra 証明書が入ったまま

- **Velocity:** ▮▮ rising
- **Source:** NVD · CVE-2026-133949 · 11 月 20 日公開 (~19:18 UTC, ~03:18 UTC+8)
- **Tags:** `security` `pip` `python` `supply-chain` `emudhra`

PSF の CNA が CVE-2026-133949 を公開した："pip prior to v26.2.2 the certifi bundled with pip contains the compromised eMudhra certificates." 評価は 9.3 Critical（CVSS 4.0、PSF 自身の CNA スコア；CVE-2026-133949 は本実行の読み取り時点で NVD ではまだ `Received`）。レコードの救済手順には順番がある："either by first upgrading Python to a version that rejects the compromised intermediates (CVE-2026-115557) or use hash pinning with a known-secure version of pip." 状況を耐えられるものにしている一文："pip is not vulnerable when using a Python version that rejects the compromised certificates." PSF のユーザー向け説明スレッドと pip PR #14371 に運用詳細がある。

**Why it matters:** 10 月の eMudhra/emSign CA 漏えい事件はまだツールチェーンの下流へ伝播していて、この一手は古い pip でパッケージを入れる全マシンに届く。「Python が先に中間証明書を拒絶する」という依存関係を二度読むべきだ——pip だけ直しても閉じない可能性がある。

[`🔗 NVD：CVE-2026-133949`](https://nvd.nist.gov/view/vuln/detail?vulnId=CVE-2026-133949) · [`🔗 PSF：Python ユーザーへの説明`](https://discuss.python.org/t/information-for-python-users-regarding-emudhra-emsign-ca-certificate-security-incident/109576) · [`🔗 GHSA-6q48-6c7w-9gw2`](https://github.com/advisories/ghsa-6q48-6c7w-9gw2)

---

## 23. 昨日の NGINX RCE 2 件に続報：同じリリースは実は 10 件を修えていた——リポジトリは今日 trending に

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending + nginx.org · リリース 11 月 18 日、開示 11 月 19 日
- **Tags:** `security` `nginx` `patching` `http2` `mtls`

昨日の項の 2 つの RCE（CVE-2026-123633、CVE-2026-123007）を閉じた 1.31.9 mainline と 1.30.7 stable は、実際には一度に **10 個の CVE** を修めていた。nginx のアドバイザリは CVSS スコアではなく言葉のラベルで重大度を表す："major" が 3 つ——HTTP/2 フロー制御のメモリ破壊（CVE-2026-123007）、"Infinite loop while reading client request body over TLS 1.3"（CVE-2026-118899）、"Use-after-free in mail proxy module"（CVE-2026-113425）——残りは medium/minor で、"SNI bypass when using client certificate validation in stream"（CVE-2026-120967）と "Insufficient validation in stream ssl_preread module"（CVE-2026-123640）を含む。nginx リポジトリは今日 GitHub の trending ボードに乗っている——パッチ波そのものがトラフィックだ。

**Why it matters:** RCE 2 件の見出しはリリースを過小評価していた。stream モジュールの SNI バイパスは静かな雷だ：nginx で mTLS を終端する者にとって、クライアント証明書検証が誤った SNI に一致しうるのはアクセス制御の欠陥であってクラッシュではない——しかも RCE と同じアップグレードで直る。

[`🔗 nginx セキュリティアドバイザリ`](https://nginx.org/en/security_advisories.html) · [`🔗 release-1.31.9`](https://github.com/nginx/nginx/releases/tag/release-1.31.9)

---

## 24. MCP サーバー層にさらに 2 つの CVE：Tapo の DNS リバインディングによるデバイス操作、SSH マネージャの cron 永続化

- **Velocity:** ▮▮ rising
- **Source:** NVD · 11 月 20 日公開の 2 レコード · いずれも GitHub_M が CNA
- **Tags:** `security` `mcp` `agents` `dns-rebinding` `command-injection`

両レコードとも 11 月 20 日公開、CNA は GitHub、両方 8.8、両方修正済み。**CVE-2026-77329**（CVSS 4.0、tapo-mcp 0.5.0 で修正）：TP-Link スマートホーム向け Rust/Python の Tapo MCP サーバーは "calls disable_allowed_hosts() without replacement Host or Origin validation"。"a malicious website can use DNS rebinding to send same-origin browser requests to the victim's local or LAN Tapo MCP listener when it runs without an API key"——届くのは "control_device for smart-device actuation and take_snapshot for configured cameras"。**CVE-2026-129995**（CVSS 3.1、3.8.5 で修正）：mcp-ssh-manager のバックアップツールは "build remote shell commands from caller-controlled values" し "without neutralizing shell metacharacters"。細工した引数で "execute arbitrary OS commands on managed remote servers as the configured SSH user" ができ、"ssh_backup_schedule can persist execution through cron"。

**Why it matters:** 先週の agent スタック CVE の波（Phoenix、CubeSandbox、MCP Python SDK）は続いていて、型は変わらない：危険なのはモデルではなく、localhost/LAN に束縛され、誰も設定しない「任意の」認証フラグの後ろにいるツールサーバーだ。物理デバイスを操作しカメラを読めるリスナーは、賭け金が上がったことを意味する。

[`🔗 tapo アドバイザリ GHSA-2cwc-6wwp-62q6`](https://github.com/mihai-dinculescu/tapo/security/advisories/GHSA-2cwc-6wwp-62q6) · [`🔗 mcp-ssh-manager アドバイザリ GHSA-qwwm-vrm9-4mw8`](https://github.com/bvisible/mcp-ssh-manager/security/advisories/GHSA-qwwm-vrm9-4mw8) · [`🔗 NVD：CVE-2026-77329`](https://nvd.nist.gov/view/vuln/detail?vulnId=CVE-2026-77329)

---

## 25. OpenComputer：Digger のオープンソース Devin 代替——Slack で @Computer、セッションは rootless Podman

- **Velocity:** ▮ steady
- **Source:** Show HN · 75+ pts · ~7.5h 前 (~04:30 UTC+8)
- **Tags:** `ai-agents` `devtools` `slack` `self-hosted`

Digger チームの Show HN ローンチ："Mention `@Computer` in a Slack thread with a task, it works on its own computer, you & your team can watch and steer it as it goes, and the result lands as a pull request." スタックは意図的に退屈だ： outbound-only ネットワークの 1 台の VM が Calvin というゲートウェイを走らせ、Slack スレッドごとに Claude Code・Codex・OpenCode のセッションを起動する——"each session is isolated with rootless Podman"——コントロールプレーンは Cloudflare Workers と Durable Objects。ローンチのフックはベンチマークだ："in our benchmark it opens PRs 3.3x faster than Devin"、ローカル Claude Code との並走レース（32.0s vs 36.2s）を添えて。"We built it to feel as fast as Claude Code on your laptop."

**Why it matters:** 「agent が自分のコンピュータで働く」カテゴリは、Slack をオーケストレーションに使い自分のクラウド計算資源を使う形へ収束しつつある——"from the compute layer up" のオープンソース化が Devin への差別化の売りで、隔離のプリミティブ（rootless コンテナ、outbound-only VM）はセキュリティチームが実際に審査できる類のものだ。

[`🔗 diggerhq/opencomputer`](https://github.com/diggerhq/opencomputer) · [`🔗 Show HN 議論`](https://news.ycombinator.com/item?id=50581403)

---

## 26. Poste.io が 9.2 を修めて 2.5.22 をリリース：DMARC レポート添付経由の未認証 root RCE

- **Velocity:** ▮ steady
- **Source:** NVD · CVE-2026-127027 · CERT-PL アドバイザリ · 11 月 20 日公開
- **Tags:** `security` `email` `rce` `mail-server`

CERT-PL が Poste.io（オールインワンの Docker メールサーバー）に CVE-2026-127027 を公開した（9.2 Critical、CVSS 4.0、CNA スコア；2.5.22 で修正）。"Email sent to dmarc-reports@<domain> is saved without sender verification." そして "Script that runs as root unpacks the attachments using unsafe shell commands, allowing command injection through crafted attachments (e.g. file names or archive contents)"。結果："a remote unauthenticated attacker who can send an email to the server's port 25 can execute arbitrary commands as root within the Poste.io container."

**Why it matters:** 攻撃者に必要なのはあなたのドメインにメールを送れることだけ——資格情報もユーザー操作も要らない。メールサーバーとしてはほぼゼロクリックのリモート root だ。Poste.io を動かしているなら、2.5.22 が今日のアップグレード；コンテナ境界が攻撃者とホストの間の唯一の壁になる。

[`🔗 CERT-PL アドバイザリ`](https://cert.pl/en/posts/2026/11/CVE-2026-127027) · [`🔗 NVD：CVE-2026-127027`](https://nvd.nist.gov/view/vuln/detail?vulnId=CVE-2026-127027)

---

## 27. GitHub がユーザーアカウントを通知なしで 404 に——数時間後に復旧

- **Velocity:** ▮ steady
- **Source:** Hacker News · 50+ pts · ~4.5h 前 (~07:35 UTC+8)
- **Tags:** `github` `platform-risk` `moderation`

小さい話、しかし縁が鋭い（50+ ポイント、46 コメント）：ある開発者の GitHub アカウント（`0n4t3`）が停止され——プロフィールは 404、"all my personal projects are gone"——"not so much as a pop up notification or email on what happened." だった。スレッドが伸びるとアカウントは戻り、投稿は今 "Update — I'm back!" で始まり "whoever undid my (prob automated?) deletion and/or ban on Github." に感謝している。残るのはこの二文だ："I still have no idea what got me banished or if it'll happen again. Still not so much as a pop up notification or email on what happened, lol, just a random banishment then unbanishment." 彼は今ローカルミラーを作り、移行も考えている。

**Why it matters:** 11 月 18 日の Codeberg レジストラ停止をアカウント側から見た版だ：アイデンティティごとオフラインにするモデレーションが通知経路なしで届き、解決は「たまたま見た誰かによる解除」——それはプロセスではない。リポジトリをミラーせよ。プラットフォームの申し立て経路とは、バズるスレッドのことだ。

[`🔗 Help github just deleted me`](https://nate.mecca1.net/posts/2026-11-20_help/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50583911)

---

## 28. Backblaze の新しいプライバシー通知、ターゲット広告目的で個人情報を「販売・共有」しうると明記――それがバックアップ企業で

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 201+ pts · ~9h 前 (~11:20 UTC+8)
- **Tags:** `privacy` `backup` `data-rights` `industry`

Backblaze――「あなたのデータは何年もここで安全」という売り文句一本で勝負してきたバックアッププロバイダー――が新しい "Notice at Collection and Privacy Policy" を公開し、それを受けて立ったスレッド（201ポイント）が事実上の信任投票になった。通知によれば、個人情報――カテゴリ一覧は "Internet or Other Similar Network Activity; Commercial Information; Geolocation Data" を含む――が "cross-context behavioral advertising" のために販売・共有されうる。オプトアウトの道も明記されている："You have the right to direct us to stop selling or sharing your personal information for cross-context behavioral advertising"。経路は "Your Privacy Choices" リンクか Global Privacy Control シグナル。正確に読むべき点が2つある。この通知はバックアップ**ファイルの中身**が売られるとは言っていない――対象カテゴリはアカウントや利用行動に関する個人情報で、"We do not sell or share sensitive personal information" と、正確な位置情報の欄は "No" と同時に明記している。そしてそれはオプト**アウト**だ――別の設定フォームへの誘導であり、既定で無効にはならない。スレッドはこれをダークパターンと読んだ。

**Why it matters:** スレッドの代表的なまとめを借りれば "Backup is a trust business. The entire product promise is 'your data is safe with us for years'"。同じ顧客関係を広告データ共有で収益化するのは、約束の逆方向だ。やるべきことは具体的：次のバックアップ前に設定を見直すか GPC を有効にし、更新の前にバックアップ業者の通知を読む。

[`🔗 Backblaze Notice at Collection and Privacy Policy`](https://www.backblaze.com/company/policy/privacy) · [`🔗 HNディスカッション（201ポイント）`](https://news.ycombinator.com/item?id=50585593)

---

## 29. GnuPG が GPGME の重大なダブルフリーを開示――署名メール経由のデータ持ち出し、RCE "can't be ruled out"――開示を前倒し

- **Velocity:** ▮▮▮ trending
- **Source:** gnupg-announce · HN 43+ pts · ~3.6h 前 (~16:35 UTC+8)
- **Tags:** `security` `gnupg` `cve` `memory-safety`

Werner Koch が GPGME 2.3.1 を発表した。全先行バージョンに存在する "a critical security bug found in all prior versions" の修正である。CVE-2026-129975（内部番号 T8557）。"a crafted very long user id" を持つ OpenPGP 鍵が引き金になるダブルフリーだ。メカニズムは stale ポインタ型の古典：再割り当て後のバッファポインタは "is only assigned back to the context object at the end of the function"、つまり読み込みエラーでの早期リターン時にコンテキストが解放済みメモリを保持し続け、最終的に二度目の free が起きる。しかも "due to other allocations in between"、アロケータのダブルフリー検査に引っかからない場合がある。影響の連鎖は実用的だ："This double free can be used exfiltrate data from applications by sending for example signed data"。さらに "Exploiting this bug to mount an Remote Code Execution attack (RCE) can't be ruled out. Thus an immediate update is highly suggested."。影響範囲は OpenPGP デスクトップ世界の大半――Gpg4win、GnuPG Desktop と VS-Desktop、"Most mail clients"、多くの XMPP クライアント、Samba、Flatpak。開示自体にも物語がある。研究者 Johan Carlsson の発見は GitLab 経由で 2026-11-25 の調整済み開示を予定していたが、"due to the new Ruby2Shell bug GitLab had to update earlier"――昨日の Ruby 緊急リリースと同じ波で 11月20日に前倒しされた。今回の実行時点（12:09Z）で NVD のレコードはまだ存在しない。

**Why it matters:** GPGME はアプリケーションと gpg の間のライブラリだ。つまりこれは悪意ある鍵が普通の署名メールで届けられる、アプリケーション側のメモリバグである。パッチの難所は依存ツリー側：静的リンクされたバイナリは 2.3.1 での再ビルドが必要で、ディストリの更新は発表から数日遅れる。

[`🔗 GnuPG セキュリティ勧告（gnupg-announce）`](https://lists.gnupg.org/pipermail/gnupg-announce/2026q4/000517.html) · [`🔗 HNディスカッション`](https://news.ycombinator.com/item?id=50587208)

---

## 30. アイスランド最大のホスティング業者が攻撃を受け全サービスを停止――常務取締役は「tens of millions in artificial intelligence costs」を焼いた攻撃だと

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 94+ pts · ~12.7h 前 (~07:30 UTC+8)
- **Tags:** `security` `hosting` `iceland` `ai-powered-attack`

1984 ehf――常務取締役いわく "probably by far the largest provider of website and email hosting services in Iceland"――はフロントエンド系システムへのサイバー攻撃を受け、全サービスを停止した。影響は数万人規模の顧客に及び、CERT-IS とアイスランド電子通信局が対応に参加している。広く引用された細部は、常務取締役 Mörður Áslaugarson による攻撃者の描写だ。"These are professionals, and this was probably an enormously well-funded attack. We're talking about tens of millions in artificial intelligence costs. It happened at a speed unlike anything anyone has ever even heard of." 復旧は段階的で、まずメールと DNS から――状況は同社の公開ステータスページで追える。彼はさらに "There are certain theories about which groups were behind this, but none of them has been confirmed." と付け加えている。

**Why it matters:** "tens of millions in artificial intelligence costs"という数字が精査に耐えるかは別の話として、この主張自体が今週のセキュリティ連鎖の縮図だ。巨大な計算予算だけが買える実行速度で、国が実際に載っているインフラが狙われた。国家規模のホスティング業者が完全停止を選んだのは、今月の一連の障害譚の防御側の鏡像だ。

[`🔗 RÚV：Serious cyberattack thought backed by wealthy operators`](https://www.ruv.is/english/2026-11-20-serious-cyberattack-thought-backed-by-wealthy-operators-493411) · [`🔗 1984 ステータスページ`](https://status.1984.is/status/public) · [`🔗 HNディスカッション`](https://news.ycombinator.com/item?id=50583856)

---

## 31. FBI が犯罪データベース（NCIC）への侵入を調査か――同時に USDA の農家支払いシステムもサイバー攻撃を受けていた

- **Velocity:** ▮▮ rising
- **Source:** BBC + France24（NBC、CNN 経由）· HN 40+ pts · ~1.6h 前 (~18:35 UTC+8)
- **Tags:** `security` `fbi` `breach` `ncic`

米メディアが関係者2人の話として伝えるところでは、FBI は "an apparent breach of its criminal information database" を調査中だ。NCIC――連邦と地方の法執行機関が逮捕状やバックグラウンドチェックの情報を共有するシステムである。今秋これで2件目になる。9月には ShinyHunters グループが FBI 職員全員約38,000人分のデータ窃取を主張した。別件として、USDA は職員に農家への支払いシステムが "had been targeted" と伝えた（NBC、元 USDA 職員2人の話）。同省はまだコメントしていない。両件は、障害後の議会追及の真っ只中に落ちてきた――同じ週、ホワイトハウスは国家サイバー担当ディレクター Sean Cairncross を解雇している。CNN は FBI が "hacked for the second time since September" だと伝え、2件の関連性と犯人は依然不明としている。

**Why it matters:** NCIC のレコードは逮捕と警察官の安全確認に直結する。ここの漏えいは統計の漏えいではない。そして背景はどちらの事件と同じくらい重要だ。「公式にはサイバー攻撃ではない」障害が一か月続いた後、連邦の侵入調査が同時2件となれば、「今回はどうか？」が今後すべての障害への既定の問いになる。

[`🔗 BBC：FBI reportedly investigating apparent hack of its criminal database`](https://www.bbc.com/news/articles/cvze7de86pk3o) · [`🔗 France24：US Agriculture Department and FBI hit by cyberattacks`](https://www.france24.com/en/americas/20261121-us-agriculture-department-fbi-hit-by-cyberattacks-media-report) · [`🔗 HNディスカッション`](https://news.ycombinator.com/item?id=50587859)

---

## 32. ClawDOS：DOS 用の AI コーディングエージェント――本物の 1981 年 IBM PC XT で動く

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 84+ pts · ~6.5h 前 (~13:40 UTC+8)
- **Tags:** `ai-agents` `dos` `retro` `coding-agent`

名前の通りの Show HN だ。オリジナルのハードウェア――IBM PC 5160、 "an 8088 at 4.77 MHz, 640K of RAM, a CGA card"――で動く DOS 用チャット＆コーディングハーネス。HARNESS.EXE は 176 KB の DOS プログラムで、Claude Messages API を自力で話す。リクエストを書き、ストリーミングされる応答を解析し、ツールを実行し、会話ごとに独立ディレクトリへ保存する。セッションをまたぐノートも維持し、エージェントは "picks up where it left off"。ディスク上のファイルを読み書きし、プログラムを書き、Turbo C でコンパイルし、実行して "looks at what they draw on the screen"。TLS は別の "bridge" PC にオフロードされる。8088 では無理だからだ。作者の注記は率直だ："100% of this repo is written by Claude, with the exception of the text within this box"。サイト自体もエージェントの次の課題だった："can that something it built then build other somethings?"

**Why it matters:** 制約駆動のハーネス工学は、この職人の技が進歩する道だ。ここにあるアイデア（ストリーミングパーサ、ファイルシステム単位のワークスペース、セッション横断のメモリ）はすべて 640K のマシン向けに作り直された。エージェントループに本当に必要なものは何か、という圧力テストになる。「エージェントがエージェントを書く」シリーズの今年のベストエントリでもある。

[`🔗 ClawDOS`](http://ricapar.net/ClawDOS/) · [`🔗 Ricapar/ClawDOS`](https://github.com/Ricapar/ClawDOS) · [`🔗 HNディスカッション`](https://news.ycombinator.com/item?id=50586292)

---

## 33. Apple のチームが Depth Pro 2 を公開：画像*と*動画のメトリック深度が鋭さと時間一貫性を両立――コードと重みは初日から

- **Velocity:** ▮▮ rising
- **Source:** arXiv · 2611.26603 · コードと重みは 11月20日リリース
- **Tags:** `computer-vision` `depth-estimation` `open-weights` `apple`

Depth Pro 2（11月19日提出、Vladlen Koltun らのチーム）は、単眼深度の決定的なトレードオフを攻撃している。マルチフレーム方式は時間一貫性を買い、境界の鋭さを失う。シングルフレーム方式はその逆だ。チームは "a single, scalable network that processes both images and video and predicts depth maps at native resolution" を訓練し、メトリック精度・鋭さ・時間一貫性を "all at once, outperforming prior work in all of these dimensions" と主張する。モデル群は "a new Pareto frontier in terms of metric accuracy, sharpness, temporal consistency, and runtime" を定めるという。コードと重みはリリースと同時に、新しい `apple-aiml-research` org に公開された（旧 `apple/ml-depth-pro` の URL はリダイレクトされる）。エコシステムは一日で動いた。11月20日には ComfyUI ノードと ONNX/TensorRT ポートが現れている。

**Why it matters:** メトリックな動画深度は、ロボティクス、AR、エージェントの知覚のためのインフラだ。この公開は今後みんなが向かって構築するオープンウェイトのベースラインになる。翌朝にはもう ComfyUI/ONNX ポートが出ていた、というのも「オープンリリースがどれだけ速く再パッケージされるか」の小さな事例研究だ。

[`🔗 arXiv：Depth Pro 2`](https://arxiv.org/abs/2611.26603) · [`🔗 apple-aiml-research/ml-depth-pro-2`](https://github.com/apple-aiml-research/ml-depth-pro-2)

---

## 34. 「AI is giving everyone the same advice」：65モデルに127,918回の質問でデフォルト回答を測り、その出所を突き止めた

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 92+ pts · ~19h 前 (~00:50 UTC+8)
- **Tags:** `ai-research` `homogenization` `evaluation`

Cody Collier の独立実験は、人々が実際に尋ねる質問――"65 AIs from 30 companies… 127,918 times"――を投げて、その均質さを測った。"Recommend one book that will change my life" には 100回中73回 『Man's Search for Meaning』が返る。起業案は 100回中76回がサブスクボックス。何を学ぶべきか→コンピュータサイエンスが90%。1万ドルの投資先→インデックスファンドが98%。際どい細部："3,151 people the AIs made up" の69%がちょうど34歳。各社には看板の名前がある（"Claude invents Marisol, Gemini invents Elena"）。無害な質問だけでも "59% of AIs answer most like another AI from the same company, against 4% by chance"。メカニズムの主張が一番使える部分だ。学習の各段階を測れるオープンモデルでは、お気に入りの答えは "when it's taught to be an assistant" の一歩で現れる。そしてデフォルトは現実に漏れ出している（"Elena Vance… is named in 684 new GitHub projects this year. Before 2025: none"）。

**Why it matters:** 均質化は主張されてきた。これは測定であり、原因をプレ学習データではなくアシスタントチューニングに局所化している。実用の助言も検証に耐える：「be original」と頼んでも無駄。文脈を渡すことだ。

[`🔗 AI is giving everyone the same advice`](https://a90.com/experiments/same-advice/) · [`🔗 HNディスカッション`](https://news.ycombinator.com/item?id=50577872)

---

## 35. 「The gig economy has arrived for cardiologists」：Scale AI の Outlier は医師に時給180ドルを提示――その後、データワーカーの型を適用する

- **Velocity:** ▮ steady
- **Source:** Rest of World · HN 146+ pts · ~43h 前
- **Tags:** `labor` `data-work` `gig-economy` `industry`

Julián Posada（イェール大学、『Platform Extractivism』の著者）が記録したのは、AI の労働力供給の次の層だ：データ作業に勧誘される医師、弁護士、博士たち。Scale AI が運営する Outlier は "up to $180 an hour for physicians in the U.S. to design complex cardiac scenarios, review artificial intelligence-generated reports, and rank model outputs" を広告しながら、同じ仕事を "up to $7.50 an hour for Tagalog work in the Philippines"、"up to $12.50 an hour for Swahili in Tanzania" で提示する。論点はレートではなくパターンだ。グローバルのデータ労働者で記録されてきた手口――減給、タスク不足、突然のアカウント停止、音信不通――が、自分には関係ないと思っていた資格職にそのまま適用されている。

**Why it matters:** フロンティア労働市場は、地域係数つきの一枚の世界レート表に収束しつつある。プレミアムな役割がプレミアムなのは、まさに自分たちを値付けから追い出すモデルを訓練しているからだ。「AI 評価」を副収入に考えている人には、この記事がそのデューデリジェンスだ。

[`🔗 Rest of World：AI isn't replacing your job. It's turning it into low-paid gig work`](https://restofworld.org/2026/ai-jobs-skills-gig-work/) · [`🔗 HNディスカッション`](https://news.ycombinator.com/item?id=50562500)

---

## 36. 顔認識の一致だけでの逮捕――AI に判断を委ねた刑事に裁判所が qualified immunity を認めず――"the Fourth Amendment does not permit an individual to be arrested based on nothing more than an uncorroborated conclusion by AI"

- **Velocity:** ▮ steady
- **Source:** Techdirt · HN 69+ pts · ~37h 前 · 判決は DocumentCloud
- **Tags:** `policy` `facial-recognition` `fourth-amendment` `law-enforcement`

判決の背景は、崩れた小切手詐欺の逮捕だ。ケンタッキー州 Florence 警察の Ryan Kilmer 刑事は銀行 CCTV の静止画を顔認識に通し、判決文の言葉を借りれば "Relying solely on the AI identification… concluded that 'Yony' was actually Alain Vizcay Osorio"――Facebook のアカウントを "for an unknown reason" 被告人と結びつけた。Osorio は勾留され、事件発生時にネブラスカにいたことを証明して起訴は取り下げられた。その後の民事訴訟で裁判所は qualified immunity を否認し、"The Fourth Amendment to the United States Constitution does not allow a detective to delegate to AI the task of assessing probable cause"、かつ "no reasonable detective in the Defendant's position could conclude otherwise" と述べた。判決はさらに、Florence 警察自身の方針がすでに顔認識単独では probable cause を構成しないと定めていたことも指摘する。Techdirt が波及半径の読み方でバズった理由はここだ。同じ論理は予測ポリシングや AI 生成の警察報告書にも届く。

**Why it matters:** 検証されていないモデルの出力が国家権力の根拠として失敗する判例法だ。法執行機関に AI トリアージを売るベンダーは全員、これを超えなくてはならない。immunity の否認は、静かな和解ではなく上訴への道を意味する。

[`🔗 判決文（DocumentCloud PDF）`](https://www.documentcloud.org/documents/28909866-ai-isnt-pc/) · [`🔗 Techdirt 解説`](https://www.techdirt.com/2026/11/19/court-tells-cops-that-the-4th-amendment-doesnt-cover-ai-generated-probable-cause/) · [`🔗 HNディスカッション`](https://news.ycombinator.com/item?id=50567735) · [`🔗 判決文 PDF（CourtListener/RECAP ミラー）`](https://storage.courtlistener.com/recap/gov.uscourts.kyed.110774/gov.uscourts.kyed.110774.26.0.pdf)

---

## 37. Twice-Told Critiques：ICLR のレビュー間における主張レベルの重複率が1年で 12.0% → 21.3% に上昇

- **Velocity:** ▮ steady
- **Source:** arXiv · 2611.26286 · 11月19日提出
- **Tags:** `peer-review` `llm-detection` `ai-research`

単著の測定研究（Ilya Gusev）が、ピアレビューを巡る議論が断言してきたことを数字にした：同じ論文のレビューは、同じ問題を見つけるようになってきている。"in reviews from the same stage of the review process" の条件で主張レベルの重複を測ると、ICLR は 12.0%（2026）から 21.3%（2027）へ上昇。NeurIPS、ICML、F1000 と PLOS のジャーナルでも年々上昇している。2027年の ICLR で、3本目のレビューが最初の2本に対して新たに追加した問題は 5.46件で、2026年の 6.12件から減った。MELD（LLMテキスト検出器）とのクロスチェック："two reviews that MELD flags overlap more than two unflagged reviews: by 3.0 points at ICLR in 2024-2025, by 4.5 points in 2026-2027, and by 5.4 points across five journal sources"。フラグされたレビュー同士は "less distinct from each other" という証拠だ。

**Why it matters:** 11月18日の「Can Peer Review Survive AI-Generated Text?」提案に、最初の具体的な数字を与えるものだ。AI っぽいテキストではなく、一人のレビュアーが書いたかのように振る舞うレビュー集合の話である。レビュアー割り当て、リファラル制度、メタレビューがすべてこの問題を引き受けることになる。

[`🔗 arXiv：Twice-Told Critiques`](https://arxiv.org/abs/2611.26286) · [`🔗 Hugging Face papers`](https://huggingface.co/papers/2611.26286) · [`🔗 Fernández-Villaverde：Can Peer Review Survive AI-Generated Text?（PDF）`](https://www.sas.upenn.edu/~jesusfv/Peer_Review.pdf)

---

## メタデータ

| Field | Value |
|-------|-------|
| Generated | 2026-11-21T12:46:45Z |
| Items | 37 |
| Sources tracked | 40 (Hacker News, GitHub Trending, CISA KEV, NVD, Red Hat security data, nginx.org, CERT-PL, PSF/discuss.python.org, Thinking Machines, vendor blogs, arXiv, gnupg-announce, backblaze.com, ruv.is, status.1984.is, bbc.com, france24.com, a90.com, restofworld.org, techdirt.com, documentcloud.org, ricapar.net, github.com, huggingface.co) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[前日](../2026-11-20.md) · [Raw .md](https://trending.md/jp/feed/2026-11-21.md) · [アーカイブ](../archive/)
