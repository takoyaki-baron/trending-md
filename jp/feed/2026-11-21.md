---
date: 2026-11-21
updated: 2026-11-20T20:26:54Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 17
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

11月20日、既知の悪用される脆弱性カタログ（KEV）に4件が追加され、各項目に11月23日の3日間の連邦政府修復期限が付いた。筆頭は **CVE-2026-123890**――VMware vCenter の Directory Service における認証バイパス（9.8、VMware が CNA として採点。レコードは本実行の読み取り時点で`Undergoing Analysis`、lastModified 2026-11-20T20:16Z）。修正版は 9.1.1.0200、9.0.2.0200、8.0 U3m、5.2.5 で、Telco Cloud Platform のビルドも影響を受ける。並ぶのは **CVE-2026-76466**。Cisco Expressway Series で、データベースサービスのハードコードされた資格情報とクライアント証明書検証の欠如により、未認証の攻撃者が"execute arbitrary operating system commands as root"できる（9.8、Cisco が CNA として採点）。残り2件は **CVE-2026-129448**――Apache Roller の XML-RPC 逆シリアル化 RCE（9.8）。11月17日に新しいアドバイザリとして扱ったばかりのものが KEV 入り――と **CVE-2025-42884**、SAP NetWeaver Enterprise Portal の JNDI インジェクション（6.5）。

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

## メタデータ

| Field | Value |
|-------|-------|
| Generated | 2026-11-20T20:26:54Z |
| Items | 14 |
| Sources tracked | 17 (Hacker News, GitHub Trending, CISA KEV, NVD, Red Hat security data, vendor blogs, arXiv) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[前日](../2026-11-20.md) · [Raw .md](https://trending.md/jp/feed/2026-11-21.md) · [アーカイブ](../archive/)
