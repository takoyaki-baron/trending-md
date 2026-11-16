---
date: 2026-11-16
updated: 2026-11-16T12:46:44Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 47
license: CC-BY-4.0
---

# trending.md — 2026-11-16

## 1. Meta がエージェント対応のデザインシステム Astryx をオープンソース化——週 13,660 スターで週間ボード最大の伸び

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub Trending · +13,660★ this week · 28.7k total · v0.7.16 released Nov 14 (~00:44 UTC+8)
- **Tags:** `astryx` `design-system` `react` `stylex` `meta`

**meta/astryx** は Meta の新しいオープンソースデザインシステムで、今週の GitHub Trending で最も強い勢いを持つリポジトリです。**今週 +13,660★** で合計 28,748 スター、v0.7.16 は 11 月 14 日リリースで、このフィードの生成 1 時間前までコミットが続いています。README の言葉を借りれば「完全にカスタマイズ可能で、今の私たちの作り方——人と、それに並んで働くエージェント——のために作られたオープンソースデザインシステム」。中身は具体的で、**StyleX**（Meta のコンパイル時 CSS-in-JS）上に構築された React 19+ コンポーネント、npm パッケージ（`@astryxdesign/core`）とグローバル CLI（`@astryxdesign/cli`）、そして「API・ドキュメント・CLI を一体で設計し、人間も AI アシスタントも同じ参照資料から同じ方法で構築できるようにする」という明示的な設計目標です。**Currently in Beta** の表示があり、リリースのテンポは速く——バージョン番号ベースで 2 週間弱ですでに 16 個のパッチリリースが出ています。

**Why it matters:** デザインシステムは「エージェント対応」が現実と照らし合わせて試される場所です。コンポーネントはまさにエージェントに生成を求められる、反復的で仕様が重い出力であり、ドキュメントと CLI が最初から対面にエージェントがいる前提で設計されたライブラリは、マーケティングではなく本物のインターフェースの変化です。注目すべきは beta 表示です。週 1.37 万スターは注目度であり、README 冒頭の Sync-Contract コメント（「アーキテクチャ変更はドキュメント更新を必須とする」）には、ドキュメントのドリフトこそが失敗モードだと開発者自身が分かっていることが表れています。

[`🔗 meta/astryx`](https://github.com/meta/astryx) · [`🔗 Release v0.7.16`](https://github.com/meta/astryx/releases/tag/Astryx-v0.7.16)

---

## 2. 「AI 生成コードはすべてオープンソースにすべき」——865 ポイントの HN エッセイが専有 AI コードを「ライセンス洗浄」と呼び、CC0 を解として提案

- **Velocity:** ▮▮▮ trending
- **Source:** jakub.jankiewicz.org · 865+ pts on HN · 5.3h ago (~22:46 UTC+8)
- **Tags:** `open-source` `ai-generated-code` `copyright` `licensing`

Jakub T. Jankiewicz のエッセイが一夜にして Hacker News の頂点に立りました（**865+ ポイント**）。議論は「出自」と「著作権」の二層構造です。出自について。今日のモデルは、数十年分の GPL/MIT/BSD コードと、法的に帰属表示を要求する Stack Overflow の CC BY-SA コンテンツで訓練されてきました。この共有知識から生成したコードを専有として出荷することは、彼の言葉では**「ライセンス洗浄（license laundering）」**です。著作権について。純粋な AI 生成物には人間の著者がいないため（米国の「サルの自撮り」判決——後に米国著作権局も引用——の流れで）そもそも著作権で保護できない可能性が高く、これは諸刃の剣です。企業が権利を主張できない代わりに、コミュニティも主張できません。彼の具体的な提案は、人間の実質的な貢献がない AI コードについて、開発者が明示的にオープンソースライセンスを付与するか **CC0** でパブリックドメインに捧げること——司法管轄差の注意付きで（米国と違い英国はコンピュータ生成作品に限定的な保護を認めています）。

**Why it matters:** これは業界が先送りし続けてきたライセンス問題であり、このエッセイの価値は不満で止まっていない点にあります。明日から誰でも採用できる規範（あなたの AI コードはオープンに宣言するか、CC0 にする）を提示しています。HN スレッドでの訓練データ出自と著作権の著者性要件の衝突は、やがて実際の貢献ポリシーに書き込まれるはずです。11 月 11 日に取り上げた Open Source Says No の AI 貢献ポリシーカタログは、同じ戦いの受け手側の姿です。

[`🔗 Jakub T. Jankiewicz：All AI-generated code should be Open Source`](https://jakub.jankiewicz.org/blog/ai-code-open-source/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50507303)

---

## 3. NYT：ラットニック商務長官が AI チップ輸出規則の緩和を推進——規則の影響を受ける東南アジアのデータセンターには彼の家族企業の顧客も

- **Velocity:** ▮▮▮ trending
- **Source:** nytimes.com · 355+ pts on HN · 8.4h ago (~19:40 UTC+8)
- **Tags:** `export-controls` `chips` `policy` `conflict-of-interest`

ニューヨーク・タイムズの 11 月 15 日の調査報道によると、商務長官 **Howard Lutnick** は、海外データセンターを対象とする米国の AI チップ輸出制限——とくに東南アジアの施設に影響する規則——の緩和を推進してきました。そしてその規則の影響を受けるデータセンターの一部は **Cantor Fitzgerald** の顧客です。同社は Lutnick が以前率いていた投資銀行で、現在は彼の息子たちが経営しています。タイムズはこれを、商務省のチップ輸出姿勢への 1 週間にわたる疑視の上に積み重なる新たな利益相反の疑問と位置づけており、Nvidia 関連の対中国政策の扱いも含まれます。Lutnick と、取締役会の独立調査を巡って 11 月 13 日に辞任した元 Nvidia CEO ジェンスン・ファン（Jensen Huang）の友人関係も、同じ絡み合いの一部です。本項の詳細は Yahoo News 経由の NYT 報道によるもので、記事本体は配信時点でペイウォール内です。

**Why it matters:** 輸出管理政策は、開発者が日々生きている GPU の価格と入手可能性の曲線に影を落とす見えない手です。この報道は、DRAM 価格固定訴訟の棄却申立てが退けられたのと同じ週に、WSJ の循環融資報道とともに飛び込んできました。このフィードの読者への通り筋は明確です。AI 計算資源の供給側は、利益相反が事後ではなくリアルタイムで報道される決定によって、今まさに形作られているということです。

[`🔗 NYT（Yahoo News 経由）：Lutnick Eased AI Chip Restrictions While Firm Helped Clients`](https://www.yahoo.com/news/politics/articles/nyt-lutnick-eased-ai-chip-162816136.html) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50506180)

---

## 4. 新型 MacBook Pro の OLED ディスプレイは 240Hz の PWM 調光——置き換わった Mini-LED は 14,880Hz、PWM 感受性のあるユーザーが返品を始めている

- **Velocity:** ▮▮ rising
- **Source:** macanorak.com · 301+ pts on HN · 6.8h ago (~21:15 UTC+8)
- **Tags:** `macbook-pro` `oled` `pwm` `display` `accessibility`

MacAnorak のエッセイ（11 月 14 日）は、新型 MacBook Pro の **「PROLED XDR Display」**（タンデム OLED）をめぐり形成されつつある状況をまとめています。MacRumors や Reddit のスレッドには、使い始め数時間で頭痛・めまい・眼の疲労を訴えるオーナーの報告が並び、返品した人もいます。そして理由を説明しうる測定値が出ています。**Notebookcheck のラボ測定**を引用した同記事によれば、新型 OLED パネルの輝度変調周波数は **240 Hz**（最悪条件、輝度 99% 以下で検出）。一方、以前に測定した Mini-LED 版 MacBook Pro は **14,880 Hz**——約 62 倍の差です。エッセイは議論が荒れていない場所では慎重です。個人の報告は「全員に害がある」証拠ではないこと、周波数だけでは快適性が決まらないこと、報告された不快感の一部はナノテクチャーに関する可能性があること。その要望は控えめです。Apple はすでに OLED iPhone と新型 iPad mini に **Display Pulse Smoothing** のアクセシビリティ設定を搭載している。それを Mac にも——そして購入者への助言は、2,899 ポンドから始まる機種を決める前に、実際の勤務時間ぶん試してからにすることです。

**Why it matters:** これは主要な開発機のディスプレイで、丸一日向き合うために買うものです。「仕様は壊麗」と「あなたが快適に使える」が、一部の買い手にとって乖離し始めており、240 対 14,880 Hz の測定はこの論争で最初の逸話ではない数字です。注目すべき前例は Apple 自身が作りました。同社はすでに OLED iPhone でこの原則を設定という形で認めています。問題は Mac ユーザーが同じトグルを得られるかです。

[`🔗 MacAnorak：The MacBook Pro's OLED PWM Problem`](https://macanorak.com/the-macbook-pros-oled-pwm-problem-when-a-better-display-becomes-worse-to-use/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50506719)

---

## 5. Cyrus SASL 9.3：SRP プラグインのゼロ共有秘密で誰でも認証通過——修正はプラグインごとの削除、しかも 2.1.28 が依然最新リリース

- **Velocity:** ▮▮ rising
- **Source:** CVE-2026-129483 (VulnCheck CNA-assigned) · record published 5.8h ago (~02:17 UTC+8)
- **Tags:** `cve` `cyrus-sasl` `authentication` `srp`

**CVE-2026-129483**（VulnCheck の CNA コンテナで CVSS **4.0 ベース 9.3** Critical。NVD は VulnCheck の CVSS 3.1 **9.1** も配信。レコードは `Received`、公開 2026-11-15T14:17:27Z）。Cyrus SASL **2.1.28 まで**の SRP サーバーメカニズムでは、`srp_server_mech_step2` が群 `N` の倍数であるクライアント公開値 `A` を拒否しないため、認証が破れます。`A = N` を送るクライアントは共有秘密を**ゼロ**に強制でき、パスワードを知らずに任意の既存ユーザーとして認証し、セッション鍵も取得できます。当日公開のレコードとしては異例なほど上流の痕跡が完璧です。issue **[#896](https://github.com/cyrusimap/cyrus-sasl/issues/896)**、oss-sec への投稿、公開 PoC gist、そして修正コミット——注目すべきは、修正が数学を直すのではなく**SRP プラグイン全体を削除している**こと（コミット `fb3724f4`、11 月 12 日）。運用者側の問題はここからです。影響上限の 2.1.28 は*まさに最新リリース*なので、アップグレードで直るバージョンが存在しません。今日の対策は修正コミット自身の形そのもの——SRP プラグインを無効化または削除する——であり、削除を含むリリースが出るまでこれが答えの全部です。

**Why it matters:** SRP は大半のスタックが選ばないメカニズムですが、Cyrus SASL はメールサーバーや SASL 認証のあるあらゆる場所に同梱されており、認証不要のゼロ秘密バイパスは認証バグとしてほぼ最悪の部類です。読む際の注意が二つ。9.3 と 9.1 は同じベンダーの数字を CVSS 4.0 と 3.1 で出したものです。バージョンを明記して引用してください。そして「影響 ≤ 2.1.28」にそれより新しいリリースがない以上、アップグレードの助言は現時点で空であり、プラグイン削除こそが答えです。

[`🔗 CVE-2026-129483 レコード`](https://www.cve.org/CVERecord?id=CVE-2026-129483) · [`🔗 cyrusimap/cyrus-sasl#896`](https://github.com/cyrusimap/cyrus-sasl/issues/896) · [`🔗 oss-sec 投稿`](https://seclists.org/oss-sec/2026/q4/122)

---

## 6. Google の Elephant-Goldfish Model：象がコンテキストを持ち、金魚は何も持たずレビューする——「新鮮な目」レビューパターンに週 5,500 スター

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · +5,539★ this week · 19.7k total · pushed 1.3h ago (~02:47 UTC+8)
- **Tags:** `egm` `agent-review` `specification` `google` `context`

Google org 配下のオープンソース **google/elephant-goldfish-model**（EGM）は、AI アシスタント向けプラグインで、一つのアーキテクチャ思想の上に立っています。コンテキスト保持者とレビューアを分けることです。「**Elephant** がプロジェクトのコンテキストを保持し仕様書を起草します。**Goldfish** レビューアは*それ以前の会話なしに*草稿と参照されたソース資料を検査し、語られていない前提と盲点を露出させます。**あなた**がアーキテクチャのトレードオフを判断し、実装前に仕様を承認します。」デフォルトのワークフローはソフトウェア仕様書を対象とし、他の文書には `/egm-review-loop` でレビューアと基準を選べます。配布は完全にマルチハーネスで、ChatGPT/Codex デスクトップ向けに公開プラグイン、Antigravity 向けに `agy plugin install`、Claude Code 向けにプラグインマーケットプレイス（`claude plugin marketplace add google/elephant-goldfish-model`）。EGM v0.1.1 は 10 月 27 日リリースで、今週 **5,539★** を集め、今夜もプッシュが続いています。

**Why it matters:** コンテキストの腐敗は長いエージェントセッションの静かな失敗モードです。レビューアが起草者の盲点を引き継ぐのは、起草者のコンテキストを引き継ぐからです。「コンテキストを剥がれたレビューア」を*役割*として制度化し、人間を承認ゲートに置く一次 Google リポジトリは、今週 Google の Antigravity 記事が中心に据えた生成器の隣に falsifier を置く形と同根です。ただしこちらは仕様書レベルに適用されており、人間のサインが最も重要な場所です。

[`🔗 google/elephant-goldfish-model`](https://github.com/google/elephant-goldfish-model) · [`🔗 EGM ウェブサイト`](https://egm.dev)

---

## 7. Claude-BugHunter：Claude Code 向け 83 スキルのレッドチームバンドルがトレンド入り——681 の公開レポートパターン、うち 433 は出典を個別に明記済み

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · +221★ today · 6.2k total · pushed 8.1h ago (~19:59 UTC+8)
- **Tags:** `claude-skills` `red-team` `bug-bounty` `security` `agents`

**elementalsouls/Claude-BugHunter** は「バグハンティングと外部レッドチーム業務のための自己完結型 Claude スキルバンドル」を自称し、本日 **+221★** でトレンドボードに乗りました（合計 6,242）。在庫は珍しいほど具体的です。**83 スキル**、15 スラッシュコマンド、24 の脆弱性クラスにわたる **681 の公開レポートパターン**——README によればそのうち **433 が個別に出典を付けられ、監査可能になっている**——に加え、企業 ID とインフラの攻撃マトリクス、エンゲージメントフォルダのスキャフォールディング、Burp Suite MCP 統合。表現は一貫して防御と正規側です。「承認されたレッドチームとバグバウンティの実務で実戦検証済み。加えて公開トレーニングプラットフォーム（DVWA、OWASP Juice Shop、Hacker101、testphp.vulnweb.com）でも。」配信時点で外部のローンチ発表は見つかりませんでした。README に見える更新の軌跡（出典補完）とスキルの波そのものが、正直に指摘できるトリガーです。

**Why it matters:** 今月、エージェントスキルは攻守の両側からセキュリティに入りつつあります。BugHunter は攻撃の*手法論*を、雰囲気ではなく監査可能な引用としてパッケージ化しています。これはこの種の成果物がペネトレーションレポートで生き残れる唯一の形です。真似すべきは 433 という数字です。出典を名指すパターンライブラリは検証も撤回も拡張もできます。付けないものはただのプロンプトです。

[`🔗 elementalsouls/Claude-BugHunter`](https://github.com/elementalsouls/Claude-BugHunter) · [`🔗 HN フロントページ（本日のセキュリティ面）`](https://news.ycombinator.com/front?day=2026-11-15)

---

## 8. Sebastian Raschka が現代 LLM の位置エンベディングを解説：partial RoPE が静かに多数派に——本人はそれが割に合わないと懐疑的

- **Velocity:** ▮ rising
- **Source:** magazine.sebastianraschka.com · 157+ pts on HN · 7.8h ago (~20:14 UTC+8)
- **Tags:** `llm` `rope` `positional-embeddings` `architecture` `transformers`

Raschka の「Understanding Positional Embeddings in Modern LLMs」（Ahead of AI、11 月 15 日）は、GPT-2 の学習型絶対位置エンベディング、初期の正弦波方式、そして現代の状況地図へと、第一原理から歩くチュートリアルで、全体に PyTorch コードが付きます。ニュースは彼の LLM Architecture Gallery からのトレンドデータです。**全注意層にフル RoPE を使う構成は依然最も一般的ですが、2025 年から 2026 年にかけて割合が下がり**、**partial RoPE は RoPE を使うモデルの中で少数派から多数派になりました**（たとえば MiniMax-M3 は 128 ヘッド次元のうち 64 を回転のみ）。RoPE/NoPE の混在設計も増えています（SmolLM3 は 4 層ごとに RoPE を省略、一部のリカレント混成モデルは全体で NoPE）。本人の見解は実用的に逆張りです。「**partial RoPE はほとんど割に合わない**」——約 10% の回転でしばしばフル RoPE に匹敵したという論文を引きつつ、ただしフル RoPE が勝った評価もあると認めています。RoPE は 2027 年まで主流であり続けると予測し、T5 方式の学習型相対注意バイアス（Thinky の Inkling など）を注視すべきニッチと位置づけています。

**Why it matters:** 「アーキテクチャのガルバニズム」——フロンティアモデルの真似をする——は、オープンモデル設計が実際に進む道です。だから「流行りの改変が何も買わないかもしれない」という抑制された主張は、モデルを訓練・設定する全員に直接役立ちます。絶対位置エンベディングがデフォルトでなくなった後に業界へ入った人には、RoPE/NoPE 文献への綺麗な入り口にもなります。

[`🔗 Ahead of AI：Understanding Positional Embeddings in Modern LLMs`](https://magazine.sebastianraschka.com/p/understanding-positional-embeddings) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50506376)

---

## 9. Google Labs の Stitch スキルライブラリが 8 月以降コミットゼロのまま +248★——エージェントスキルの波は休眠中の一次ライブラリを持ち上げるほど強くなっている

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · +248★ today · 9.2k total · last commit Aug 17
- **Tags:** `stitch` `agent-skills` `google` `design-to-code`

**google-labs-code/stitch-skills**——AI UI デザインツール [Google Stitch](https://stitch.google.com) 向けの Google Labs 製 Agent Skills ライブラリ——が本日 **+248★** でデイリーボードに載っています。注目すべきは、そこに*無い*ものです。リポジトリの最終コミットは **8 月 17 日**、唯一のリリースは 3 月に遡るため、これはローンチではなく休眠状態の成果物の再浮上です。執筆前に私たちは自分たちの Void ルールに従ってリポジトリを読みました。スキルは [agentskills.io](https://agentskills.io) のオープン標準に従い、Codex、Antigravity、Gemini CLI、Claude Code、Cursor、OpenCode（最後は手動インストール）にプラグインとして導入でき、Stitch の MCP サーバーを包んでデザイン-to-コードのワークフローを担います。今日の急騰を説明する外部の告知はありません。最も簡潔な読みはこうです。スキルエコシステム——`anthropics/skills` は現在 195,276★（今週 +6,220★）、BugHunter や tradermonty のトレーディングスキルのようなパッケージが一週間デイリーボードを渡り続けている——が今や、休眠中の一次スキルライブラリが波ごと発見され星を集めるほど大きくなっている、ということです。

**Why it matters:** 二つのことが同時に成立しています。Stitch で構築するなら、これは一次のデザイン-to-コードスキルの既成在庫リストになる。そして GitHub Trending をシグナルとして読む人への測定の注意になる。5 か月動いていないリポジトリの +248★/日は*波*について語るものであって、新しい開発については何も語らない。両方とも文に書くべきです。

[`🔗 google-labs-code/stitch-skills`](https://github.com/google-labs-code/stitch-skills) · [`🔗 Agent Skills 標準`](https://agentskills.io)

---

## 10. 「ダフィーは嘘をついた」：航空管制官が 11 月 13 日の全国地上停止の公式説明に異議——「彼らの誰も彼の説明を信じていません」

- **Velocity:** ▮ steady
- **Source:** commondreams.org · 107+ pts on HN · 4.3h ago (~23:45 UTC+8)
- **Tags:** `faa` `ground-stop` `aviation` `accountability`

11 月 15 日に停止の原因を取り上げて以来（アーカンソーのルータで銅線から光ファイバーへの換装が失敗した一件）、話は動きました。ショーン・ダフィー交通長官の説明——請負業者 L3Harris が銅を光ファイバーに置き換える間にルータが「データで過負荷になった」、FAA の 8 億 7500 万ドルの SMART AI システムは「まだ配線すらされていない」——が、今度は管制官自身に疑われています。Common Dreams が伝えるところでは、60 人の航空管制官に取材した Washington Examiner 記者 Anna Giaritelli が CNN で、この種のスイッチ作業は「金曜午後のような繁忙時間には行われない。週の中途、夜中、航空交通のない時間帯に行われる」と述べました。「**彼らの誰も彼の説明を信じていません。**」周辺の政治的文脈は重い。今回の地上停止は史上 3 例目で、25 年ぶりに長い全国停止（約 150 万人の旅行者に影響、土曜の欠航 4,100 便超）。下院議員 Walkinshaw は、性急な近代化が停止を招くと警告した 9 月の GAO 報告を引用し、ホーチュル州知事はダフィー長官の辞任を要求しました。出典の注意を一つ。発言は組合の声明ではなく、一人の記者経由の匿名管制官です。

**Why it matters:** 二つのインフラ物語がここで衝突しています。40 年物の銅線と、待機中の AI システム。どちらに責任を帰すかが、要求されている 500 億ドルの予算がどこへ向かうかを決めます。管制官の時間帯への異議は具体的で検証可能であり、だからこそ、議論の音量より重要なのです。

[`🔗 Common Dreams：'Duffy Lied'`](https://www.commondreams.org/news/duffy-ground-stop-explanation) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50507791)

---

## 11. 「Emacs Is My Browser」が再浮上：EWW・mpv・Elpher で Web 全体を一つのテキストバッファにルーティング——ユースケースの 85〜90% をカバーし、残りには抜け道がある

- **Velocity:** ▮ steady
- **Source:** joshblais.com · 113+ pts on HN · 4.7h ago (~23:21 UTC+8)
- **Tags:** `emacs` `eww` `browsing` `workflow` `minimalism`

Joshua Blais の 4 月のエッセイ——**EWW**（Emacs Web Wowser、内蔵 `shr.el` で描画）を*デフォルト*ブラウザとして使う話——が再び HN のフロントページに載っています。その構成はブラウザというよりルーティングテーブルです。動画は **mpv** へ、PDF は **pdf-tools** へ、gopher/gemini は **Elpher** へ、検索エンジンはセルフホストの **SearXNG**、`browse-url-handlers` が振り分け、`eww-readable` がリーダーモード、そして反撃してくるページは `&` で設定済みの Chromium へ渡します。数字は具体的です。ユースケースの「約 85〜90%」をカバーし、Termux でスマホでも同じ構成で動かしていて、わずか 5〜10% だけ本物のブラウザに戻ります。そして*要点*はまさにその制約です。モダンブラウザは気晴らしを摩擦レスにしすぎました。おすすめフィードを描画できないテキストバッファは、意図をループに戻します。制限も正直です。x.com はダメ、ソーシャルログイン・銀行・行政手続きもダメ。

**Why it matters:** こうした構成（Emacs をブラウザに、Gemini で Web へ、ターミナルファーストの復権）が繰り返し教えてくれるのはノスタルジアではなく、デフォルトは政策だということです。新しいタブで開くという一つ一つのデフォルトが、あなたがしていない決定です。今週の AI エージェントの読み取りの話題とも自然にペアになります。エージェントが必要としているアクセシビリティツリーのテキスト抽出は、`shr.el` が 2013 年からずっとやってきたことなのです。

[`🔗 Joshua Blais：Emacs Is My Browser`](https://joshblais.com/blog/emacs-as-my-browser/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50507553)

---

## 12. lucyNES：Odin で完成させた NES エミュレータ——Battletoads は動き、DMC チャンネルは未実装、「80/90% の罠」に全文が費やされている

- **Velocity:** ▮ steady
- **Source:** lucypero.com · 81+ pts on HN · 7.2h ago (~20:51 UTC+8)
- **Tags:** `emulation` `odin` `nes` `retro` `writeup`

Lucy による **lucyNES** のまとめ——一人で **Odin** で書いた NES エミュレータで、2024 年 4 月〜2025 年 1 月に完成し、音が不完全なまま正直に「Finished」とラベルづけされています——が話題になっています。リポジトリ自体の最終プッシュは 2026-05-14で、これは完成済みプロジェクトの再浮上であり、旅をしているのはこの解説記事のほうです。サイト自身の機能リストは「Battletoads と数百の他のゲームを完璧に動かすのに十分なエミュレーション精度」と読めます。Battletoads は名高いタイミング試練です。加えて 7 つのマッパー（NROM から MMC3、GxROM、AxROM）、ステートセーブ、デバッガ表示、CRT シェーダー——ただし DMC チャンネルは未実装で、多くのタイトルの音は貧弱です。白眉は事後分析です。80/90% の罠（精度の最後の詰めが 7 か月の大半を食んだ）、CPU と PPU のサイクルタイミング、そして Odin 固有の話。自動整数昇格がないことで実際のバグが出て、GC がないことで意図的な三アロケータ設計（フレーム毎のテンポラリ、グローバルヒープ、セッションアリーナ）に至ったこと。CBOR シリアライズにはビットフィールド付き生 union 用のカスタムハンドラが必要で、彼女はこれをエミュレーションにぴったりだと言います。

**Why it matters:** エミュレータを書いてシステムプログラミングを学ぶジャンルの良き手本です。完成し、範囲を切り、欠落（DMC、弱いマッパーで動かないテストゲーム）とツールチェーンの角の両方に率直。Odin に興味があったなら、エミュレータはほぼ理想のワークロードです。ビットフィールド union、手動メモリ、隠れたアロケーションなし——そしてこのまとめは最後の 10% の値段まで計算済みです。

[`🔗 lucyNES 解説`](https://lucypero.com/lucynes.html) · [`🔗 lucypero/lucynes`](https://github.com/lucypero/lucynes) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50506588)

---

## 13. Microsoft 365 障害の最も奇妙な下流事象：11 月 13 日、Phantasialand のホテルプールで塩素濃度が上昇した際に警報メールが滞留——宿泊客 13 名が負傷

- **Velocity:** ▮ steady
- **Source:** wdr.de · 80+ pts on HN · 1.5h ago (~02:36 UTC+8)
- **Tags:** `microsoft-365` `outage` `safety` `alerting` `iot`

11 月 13〜14 日に Microsoft 365 の 2 日間障害を取り上げて以来、その最も具体的な犠牲が浮上してきました。WDR（ドイツの公共放送。Rhein-Erft-Kreis の警察と消防への取材に基づく）によれば、**11 月 13 日金曜の午後**、ドイツの Phantasialand リゾート内のホテル **Hotel Ling Bao** で、プールを利用した宿泊客が呼吸器の刺激症状を訴えました。現場での検査で、プールの**自動薬剤注入システムの故障**によって塩素濃度が安全域を大きく超えていたことが判明。WDR の当日夜の集計では **13 名**が塩素ガスによる刺激を負い、**5 名が病院へ搬送**、1 名が中等度の傷で経過観察、プールは閉鎖して換水されています——その後の報道では負傷者は **15 名**（HN の見出しの数字）に更新されています。HN での見立て——それがボードに載った理由——は警報の経路です。ホテルのプール安全警報は企業メールに乗っており、その日がまさに障害の窓で、警報が発火するはずの時間でした。WDR の本文は注入システムの故障と犠牲を記録していますが、メール経路には触れていません。「障害が事故につながった」という因果は、HN の見出しと、配信時点で開けなかったドイツ語の後続報道（WindowsForum の解説は Cloudflare WAF により遮断）に依拠しています。

**Why it matters:** 私たちが不便として報告する障害——Teams が落ちる、メールが滞る——は、どこかで誰かの安全criticalな警報経路でもあります。メール障害の正確な役割が何であれ、監査すべきパターンは一つです。物理的危険を監視しながら、*サードパーティ SaaS 依存だけ*で報告するシステムは、単一障害点の測定単位が入院人数になります。

[`🔗 WDR：Chlorgas verletzt 13 Gäste（ドイツ語）`](https://www1.wdr.de/nrw/rheinland/rhein-erft-kreis/technischer-defekt-chlor-phantasialand-100.html) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50509411)

---

## 14. HTTP ステータスコード 483 「I'm Not a Freezer」が本物のインターネットドラフトに——418 ティーポットの伝統に冷蔵条項が加わり、冷凍庫攻撃が報道されてから 3 日後

- **Velocity:** ▮ steady
- **Source:** datatracker.ietf.org · 74+ pts on HN · 6.3h ago (~21:44 UTC+8)
- **Tags:** `http` `ietf` `humor` `protocol` `rfc-tradition`

Ricardo Bánffy が **draft-banffy-httpbis-not-a-freezer-00**（個人提出、日付 11 月 15 日、2027 年 5 月 19 日失効、意向ステータス Informational）を提出しました。HTTP ステータスコード **483**。「冷凍または冷蔵の能力を必要とするリクエストを理解するが、その能力を提供できない」サーバーのためのコードです。418 「I'm a teapot」への意図的なコミックな姉妹稿です。ティーポットはコーヒーを淹れられず、483 サーバーはグリーンピースを凍らせられない（例のリクエスト：「添付のグリーンピースを約マイナス 18 度に保ってください」）。しかも真顔の規範文付きです。サーバーは、自分が冷却を使うから、寒い地方にいるから、ホスト名に氷が付くから、非公式に「frozen」と呼ばれるからというだけで 483 を返しては**ならない**。そして運用者はトラブルシューティングのためにサーバーを家庭用冷凍庫に入れてはいけません。タイミングの注記を一つ。草案の登場の数日前、フランスはスーパーマーケット冷凍庫攻撃をイラン革命衛隊に帰属させていました（11 月 10 日の当フィードの報道）。ただし草案自体はそのニュースに一切触れていません。話題性の共鳴はインターネットの側のもので、著者のものではありません。

**Why it matters:** 純粋な RFC 伝統のユーモアです。しかし HN の反応こそが興味深いシグナルです。当フィードが報じた一週間（全国停止、塩素、障害の連鎖）の後に、千を超える人が「サーバーはグリーンピースを凍らせられない」というジョークに票を入れるのは、集合的な吐息のように読めます。418 と 451 の隣にファイリングしておきましょう。これはこの規格体系の安全弁です。

[`🔗 draft-banffy-httpbis-not-a-freezer-00`](https://datatracker.ietf.org/doc/draft-banffy-httpbis-not-a-freezer/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50507206)

---

## 15. Show HN：Gawain が Python の型アノテーションを耐力壁にする——全部に型を付け、ty か pyrefly に強制させる

- **Velocity:** ▮ steady
- **Source:** Show HN · 67+ pts · 15.4h ago (~12:39 UTC+8)
- **Tags:** `python` `type-checking` `ty` `pyrefly` `tooling`

**matheuzgomes/gawain**（Show HN、67+ ポイント、41★、リポジトリは 11 月 12 日作成）は一つだけのことをします。Python コードの変数・パラメータ・戻り値・クラス属性に型アノテーションを必須化し、そのうえで本物の型チェッカー——[ty](https://docs.astral.sh/ty/) か [pyrefly](https://pyrefly.org/)——を走らせて型の正しさを検証します。設計の賭けは、アノテーションの*カバレッジ*とアノテーションの*検査*は分離可能だということです。既存チェッカーは欠けたアノテーションをデフォルトでは軟らかい警告に扱いますが、Gawain は欠けたアノテーション自体を失敗とします。これで型は後で付けますという先送りに壁ができます。名前は緑の騎士の挑戦を受ける男——守らなければならない約束——から。README は自社を新しい世代の高速 Python チェッカーの対抗ではなく補完と位置づけています。

**Why it matters:** Python の型は静かに耐力インフラになっています。ランタイムバリデータ、エージェントが型付きツールスキーマを呼ぶとき、IDE 補完はすべてアノテーションの存在を前提にしています。しかし*カバレッジ*を強制するものは何もない。チェッカーが速いことと、コードベースに実際に型が付いていることの間の溝こそ、エージェントの書いたコードがドリフトする場所です。67 ポイントの Show HN は初期の牽引力であり、このツールは pre-commit フックになるまでチェックツーつのフラグしか離れていません。実行の物語が推論の物語に追いつくとき、もう一度見る価値があります。

[`🔗 matheuzgomes/gawain`](https://github.com/matheuzgomes/gawain) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50504072)

---

## 16. DrayTek Vigor2960：同一 CGI エンドポイントに 3 時間で 5 件の CVE レコード——コマンドインジェクション、パストラバーサル、ヒープオーバーフロー、スコアはすべて VulDB 判定

- **Velocity:** ▮ steady
- **Source:** CVE records CVE-2026-129449…129453 (VulDB-assigned) · published 11:17–14:17 UTC today
- **Tags:** `cve` `draytek` `router` `command-injection` `vuldb`

**DrayTek Vigor2960** ルータの 5 件の CVE レコードが本日、3 時間のペース（11:17Z、12:17Z、13:16Z ×2、14:17Z）で NVD に着地しました。すべて同じ管理エンドポイント `/cgi-bin/mainfunction.cgi` です。`swmconfigupload` 引数経由の**コマンドインジェクション**（CVE-2026-129449、9.9）と `set_table` 関数の `jsondata`（CVE-2026-129452、9.1）。`doWebBackup` の `option` と `app_guest_export` の `filename` による**パストラバーサル**（CVE-2026-129450、9.9。CVE-2026-129451、9.9）。そして `check_file_exist` の `upload_name` による**ヒープバッファオーバーフロー**（CVE-2026-129453、9.9）。5 件すべてが **1.5.1.6 まで**のファームウェアに影響し、修正を記すレコードは **1.5.1.7** を名指します。注意事項はスコアと同じくらい重要です。5 件すべてが **VulDB 判定**（`cna@vuldb.com`。大量提出型の CNA で、`sub_14914` のような関数名はバイナリ解析からそのまま）、各レコードはエクスプロイトが公開済みであることを明記し（文言はレコードごとに異なる）、**配信時点で DrayTek の公式アドバイザリは存在しません**。ベンダー確認のステップは未了であり、1.5.1.7 を出荷済みの修正として扱う前に、ベンダーのアドバイザリを待つという古いルールがそのまま適用されます。

**Why it matters:** `mainfunction.cgi` は DrayTek の古典的な攻撃面であり、Vigor ルータは小規模オフィスのネットワーク縁に座っています。匿名から管理者に届くこの種の脆弱性は、後日 KEV フィードに載る定番パターンです。しかし認識論は重要度と同じくらい重要です。同日 5 件の VulDB 提出は、バイナリオフセットの関数名、スコアのすべてが VulDB 自身の CVSS 3.1（9.9 が 4 件、9.1 が 1 件）、ゼロのベンダー声明を伴い、これは*提出イベント*であって、まだ*修正済みの脆弱性*ではありません。アップグレードを助言する前に、ファームウェアのチェンジログを確認してください。

[`🔗 CVE-2026-129449 レコード`](https://www.cve.org/CVERecord?id=CVE-2026-129449) · [`🔗 NVD 検索：本日の DrayTek`](https://services.nvd.nist.gov/rest/json/cves/2.0?keywordSearch=Vigor2960)

---

## 17. NVIDIA SkillEvaluator：エージェントスキルの波に測定層が届く——まず品質ゲート、次にスキルありなしの A/B 実行、論文付き

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · +205★ today · 1.5k total · 0.9.0 released Nov 6
- **Tags:** `skillevaluator` `nvidia` `agent-skills` `evaluation` `benchmarks`

**NVIDIA/SkillEvaluator**（本日 +205★、合計 1,543、0.9.0 は 11 月 6 日リリース、今夜もプッシュあり）は、スキルブームが避け続けてきた問いに答える NVIDIA の Apache-2.0 フレームワークです。**このスキルは本当にタスクの結果を改善しているのか？** README が説明する手法は二段階です。まず品質チェック、そのうえで**スキルありとなしの実行を比較**して、タスク結果への影響を測る——品質ゲート、意味的重複チェック、PyPI パッケージング（`skillevaluator`）、docs.nvidia.com/skills のドキュメント、さらに背後には arXiv 論文（[2608.20614](https://arxiv.org/abs/2608.20614)）と NVIDIA 開発者ブログが付きます。同じ波では `anthropics/skills` が現在 195,276★で、スキルバンドルが一週間デイリーボードを渡り歩いており、このボードに載った最初の、波の成果物を監査することだけを存在目的とするツールです。

**Why it matters:** スキルはエージェントのコンテキストに注入される指示とスクリプトです。つまりサプライチェーンの攻撃面でもあり、README がスキルを助けると言っていることは測定ではありません。スキルなしベースライン付きの A/B 評価ハーネスは正しい形です（ヌルの結果を出せます）。NVIDIA 発であることは、スキルの*品質*が企業の調達問題になりつつあることを示します。私たちはベンチマークを独立に実行していません。再現されるまで、主張された数字はベンダーの主張として扱ってください。

[`🔗 NVIDIA/SkillEvaluator`](https://github.com/NVIDIA/SkillEvaluator) · [`🔗 arXiv 2608.20614`](https://arxiv.org/abs/2608.20614) · [`🔗 NVIDIA 開発者ブログ`](https://developer.nvidia.com/blog/evaluating-ai-agent-skill-performance-with-nvidia-skillevaluator/)

---

## 18. Vercel の agent-browser が 5.1 万スターを超える：アクセシビリティツリーをエージェント向け CLI に——スクリーンショットではなくシェルからブラウザを駆動する

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · +4,601★ this week · 51.5k total · v0.43.0 released Nov 10
- **Tags:** `agent-browser` `vercel` `accessibility-tree` `browser-automation` `cli`

**vercel-labs/agent-browser**——「AI エージェント向けのブラウザ自動化。ページを開き、アクセシビリティツリーとして読み、シェルから要素を操作する」——は現在 **51,548★** で今週 +4,601、v0.43.0（11 月 10 日）が出て今夜もプッシュが続きます。設計の線は、Vercel の agent-desktop（11 月 12 日に取り上げました）と同じです。エージェントに**API としてのアクセシビリティツリー**を渡す——ピクセル座標ではなく、名前付きでアドレス可能な要素——を CLI に包み、どんなハーネス（やターミナルにいる人間）でもセッションを駆動できるようにします。Rust で書かれ、npm（`agent-browser`）で配布され、agent-desktop と並んで Vercel の賭けの半分を構成します。アクセシビリティツリーこそがエージェントと GUI の間の正しいインターフェース層だ、という賭けです。

**Why it matters:** スクリーンショット駆動の computer use は高価で遅く、誤読したものについて沈黙します。アクセシビリティツリーは、汎用性（良く作られた UI が必要）と引き換えに、精度・決定性・低トークンを得ます。二つのリポジトリと 5 万超のスターで、Vercel は今やそのトレードオフの最も声の大きい擁護者です。そして Web UI を出荷する全員への実際の教訓はこうです。あなたがそう設計したかどうかにかかわらず、あなたのアクセシビリティツリーは*機械 API になりつつある*ということです。

[`🔗 vercel-labs/agent-browser`](https://github.com/vercel-labs/agent-browser) · [`🔗 npm：agent-browser`](https://www.npmjs.com/package/agent-browser)

---

## 19. AG-UI の日次リリース列車が走り続ける：エージェント-フロントエンド プロトコルは広がり続ける——LangGraph Interrupt スキーマ、1.0 の破壊的クライアント変更

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · +393★ today · 17.7k total · Release 2026-11-13 published Nov 13 21:01 UTC
- **Tags:** `ag-ui` `protocol` `agents` `frontend` `langgraph`

**ag-ui-protocol/ag-ui**——エージェントとユーザー向けフロントエンドの接続を標準化するイベントベースのプロトコル——は本日 +393★ で合計 17,748。背後には本物のリリースのリズムがあります。今週は毎日タグ付きリリースが出ており、最新（11 月 13 日 21:01 UTC）は `@ag-ui/langgraph` を 0.0.46 に更新しました。LangGraph のネイティブな `Interrupt.response_schema`（langgraph ≥ 1.2.12）を読む、LangChain シリアライズの `ToolMessage` 出力をアンラップする、`RUN_STARTED` イベントに `protocolVersion` を宣言する——そして**破壊的変更**として、`@ag-ui/client` とピア依存は ≥ 1.0.0 を要求します。AG-UI（CopilotKit エコシステム発）は README が名指す層を占めます。エージェントの実行と UI コンポーネントの間のイベントであり、エージェントの状態をチャットバブルに押し込むのではなくネイティブに描画します。

**Why it matters:** エージェント UX はちょうど二つのプロトコル層に収斂しつつあります。ツールとコンテキストの MCP、フロントエンド表面の AG-UI。そして LangGraph アダプタの仕事は、採用が実際に何を必要とするかを見せています。各ランタイムのネイティブな制御フロー プリミティブ（割り込み、ツール結果、実行ライフサイクル）を一つのイベント語彙にマップする、フレームワークごとの shim です。エージェント UI を構築しているなら、今週テストすべきはこの 1.0 クライアントの破壊的境界です。

[`🔗 ag-ui-protocol/ag-ui`](https://github.com/ag-ui-protocol/ag-ui) · [`🔗 Release 2026-11-13`](https://github.com/ag-ui-protocol/ag-ui/releases/tag/release%2F2026-11-13)

---

## 20. 11月11日に詳細ゼロで予告されたQwen4-Maxが出荷された——API専用フラッグシップ、100万トークンコンテキスト、オープンウェイトは依然なし

- **Velocity:** ▮▮▮ trending
- **Source:** qwen.ai · HN 168+ pts · ~2h ago (~10:14 UTC+8)
- **Tags:** `qwen` `qwen4-max` `llm` `model-release` `alibaba`

11月11日のフィードが「ウェイトもベンチマークもない」Qwen4-Maxプレビューを取り上げたとき、ここで待たれていたのがこのリリースだった。AlibabaのQwen4フラッグシップは[OpenRouter](https://openrouter.ai/qwen/qwen4-max)に掲載された（掲載時刻 2026-11-16T02:18Z、HNスレッドの数分後）：**100万トークンコンテキスト**、価格は**入力 $1.50/M、出力 $4.50/M**（キャッシュ読み $0.075/M）——API専用である。執筆時点でQwenのHugging Faceオーガナイゼーションの最新アップロードは10月9日のQwen-Image-2.1-Turboのままで、4シリーズのオープンウェイトはまだ出ていない。サードパーティの初期評価は伸び悩み——HNスレッドが引用するArtificial Analysisのスコアは43（対するGPT-6.1 Solは46）で、スレッドのかなりの部分がモデルそのものよりAAの手法論争に費やされている。Simon Willisonはペリカン描画テストを4つの推論レベル（none/low/high/xhigh）全部で走らせた。

**Why it matters:** プレビューが存在してからモデルが使えるようになるまでの溝は5日で埋まったが、オープンウェイトの溝は埋まっていない——Qwen3.8の2.4T-A95Bウェイトは8月に出荷済みなのに、4シリーズは閉じた状態で始まった。スレッドが待ち望むFlashと27Bバリアントに注目したい。歴史的にQwenのオープンウェイト投入はそこに降りてきて、しかもローカル運用の大多数が実際に走らせるのはその系列だ。

[`🔗 Qwen4-Max 発表`](https://qwen.ai/blog?id=qwen4-max) · [`🔗 OpenRouter: qwen/qwen4-max`](https://openrouter.ai/qwen/qwen4-max) · [`🔗 HN議論`](https://news.ycombinator.com/item?id=50513215)

---

## 21. 古いBitlyリンクがハイジャックされている：2011年のバーガーキングのツイートの短縮リンクが再登録され、ウィキペディアのナチ強制収容所一覧へ飛ぶように

- **Velocity:** ▮▮▮ trending
- **Source:** ransomnews.com · HN 211+ pts · ~6h ago (~06:11 UTC+8)
- **Tags:** `bitly` `link-rot` `hijacking` `urls` `security`

バーガーキングが**2011年7月24日**に投稿したツイートに埋め込まれたBitly短縮リンクが、**2026年11月15日**、別の当事者によって再登録され、ウィキペディアのナチ強制収容所一覧へリダイレクトされるようになった。それを引用した投稿は数時間で**200万ビュー**を突破。Ransomnewsは2011年6月のマクドナルドのツイート（ウィキペディアのアメリカ同時多発テロ事件の記事を指す）でも同じ手口を確認し、さらに公開アーカイブからトランプの2009〜2013年のツイート内の**97個のBitlyリンク**を系統的に調べた：それらのツイートの背後に今あるリンクオブジェクトの**56個はツイートより後に作成されたもの**で、1個はBitlyに悪意あるものとしてブロックされ、**4個は11月15日に登録**——23:35 UTC時点で、再作成された49個のリンクがまだ生きていた。Bitlyは19:13 UTCにXで問題を認め（「古い非アクティブなリンクの転用を許してしまった」）、関与アカウントを停止し対象リンクを無効化した。CNNの追跡によれば、ビル・ゲイツ、ジャスティン・トルドー、マイク・ペンス、FBI、米国防総省の古い投稿内のリンクもリダイレクトされていた。

**Why it matters:** 2010年代ウェブの短縮リンク層が今や攻撃対象になっている：リンク短縮サービスが死んだ短縮コードを再利用する瞬間、それを埋め込んだ10年前の投稿すべてが遠隔から書き換え可能な資産になる——投稿者自身のアカウントより長生きするハイジャックだ。アーカイブ級の教訓はそのまま実行に移せる：オリジナルのURLを引用し、古いコンテンツ内の`bit.ly/…`は従来の宛先に解決し直すまで未検証として扱うこと。

[`🔗 Ransomnews: バーガーキング・マクドナルド・トランプのツイートで古いBitlyリンクがハイジャック`](https://ransomnews.com/burger-king-tweet-bitly-link-hijack-2026/) · [`🔗 HN議論`](https://news.ycombinator.com/item?id=50511395)

---

## 22. uBlock OriginにユニバーサルXSS：悪意あるページが要素ピッカーを操縦してトラスト済みscriptletフィルタを追加できた——発見はGPT-5.6 Sol、1.75.4で修正

- **Velocity:** ▮▮ rising
- **Source:** iter.ca · HN 120+ pts · ~2.1h ago (~10:04 UTC+8)
- **Tags:** `ublock-origin` `uxss` `firefox` `extension-security` `ai-assisted`

uBlock OriginのFirefox MV2版にワンクリックのユニバーサルXSS（MV3のuBO Liteにも類似の、ただし軽微な問題）：悪意あるウェブサイトはuBOの要素ピッカーを不可視のiframeに埋め込み、**uBO自身の`no-fetch-if` scriptlet shim内部で発火するXHRをフック**して拡張機能のインストール毎のランダムUUIDを抽出、`postMessage`でピッカーを操縦し、リソースタイプ（`image`など）を保持するための`opt`フィールドに改行を注入して任意の**トラスト済みフィルタ**（`…##+js(trusted-rpnt, script, …)`）を追加できた。トラスト済みフィルタは任意のページにスクリプトを注入できるため、攻撃者ページ上でのユーザーの1クリックが、任意のサイトのコンテキストでの任意のJavaScript実行を意味した。[GitHubアドバイザリ GHSA-cmqw-9r2w-6wv2](https://github.com/gorhill/uBlock/security/advisories/GHSA-cmqw-9r2w-6wv2)によれば：影響は**1.75.2以下**、**1.75.4**（11月3日、「検証済みシークレットトークンがあるときのみ要素ピッカーを起動」）で修正、11月1日にメールで報告、その後1.76.4まで追加硬化が続いた。開示記事は発見をGPT-5.6 Solに、PoCコードの大半をClaudeに帰し、著者自身が報告を検証し本文を書いた。

**Why it matters:** みんなが安全のために入れる拡張機能が、自身の広告防止機構を経由してスクリプト注入経路になった——そしてその修正パターンはどこにでも持ち帰れる価値がある：webから到達可能な表面が、シークレットハンドシェイクなしに「トラスト済み」入力を受け付けてはならない。今月公開された中でも最も明晰なAI支援の脆弱性発見のひとつでもある：仮説は人間、探索はモデル、検証は人間。

[`🔗 iter.ca: uBlock OriginのユニバーサルXSS`](https://iter.ca/post/ubo-uxss/) · [`🔗 GHSA-cmqw-9r2w-6wv2`](https://github.com/gorhill/uBlock/security/advisories/GHSA-cmqw-9r2w-6wv2) · [`🔗 HN議論`](https://news.ycombinator.com/item?id=50513160)

---

## 23. Protomaps：地図タイルのセルフホスティングが安く簡単になった——139 GBの世界地図1ファイルをHTTP Rangeリクエストで配信、ストレージは月約5ドル

- **Velocity:** ▮▮ rising
- **Source:** bruceroettgers.eu · HN 217+ pts · ~8.7h ago (~03:26 UTC+8)
- **Tags:** `protomaps` `pmtiles` `maps` `self-hosting` `cdn`

Bruce Röttgersによる[Protomaps](https://protomaps.com)のPMTiles形式の実践記事がフロントページに：HTTP Rangeリクエストでアドレス指定される**単一ファイル**として配布されるタイルアーカイブで、惑星規模のベースマップのホスティングは文字どおり「最新のデイリービルドをダウンロードし、ストレージバケットにアップロードする」だけで済む。経済性が主役だ：Bunny.netで**139 GBの世界地図を5重レプリケーションで保存すると月約5ドル**、帯域は$0.01/GB、ヨーロッパの都市をロードしてパン・ズームした一回のセッションで約5MB——著者の見積もりでは**地図ロード1,000回あたり$0.05**で、フリーティア超過後$5/1kのMapboxと比べ「100倍安い」（彼の見積もり、利用量依存）。RangeリクエストをキャッシュしないCDN（Cloudflare）では、x/y/zパスをバイトレンジに変換する小さなエッジ関数が必要で、CLIはバウンディングボックスや特定ズームレベルでファイルを縮小できる。

**Why it matters:** 地図はweb開発における最後の「SaaS必須」レイヤーのひとつで、その価格の崖はバズったプロジェクトを罰していた。ベースマップ全体がコモディティストレージ上の静的ファイルになるということは、従量課金のAPIをキャパシティプランニングの問題に変えるということだ——メディアでオブジェクトストレージがやったのと同じ動きが、いま地理に起きている。

[`🔗 Bruce Röttgers: セルフホスティング地図タイルは安く簡単になった`](https://bruceroettgers.eu/blog/protomaps/) · [`🔗 Protomaps`](https://protomaps.com) · [`🔗 HN議論`](https://news.ycombinator.com/item?id=50509837)

---

## 24. Ductus：あなたの手書きをフォントに——26文字すべてを順に書かせて、一画もアップロードしないブラウザツール

- **Velocity:** ▮▮ rising
- **Source:** ductus.sorenblank.com · HN 173+ pts · ~8.4h ago (~03:42 UTC+8)
- **Tags:** `fonts` `handwriting` `typography` `web-tool` `privacy`

**Ductus**は手書きを実用フォントに変えるシングルページのウェブツールだ：各グリフを順に書くよう促し（「小文字のaを書いてください、26文字中の1文字目」）、ストロークを収集し、フォントファイルをエクスポートする——すべてクライアントサイドで。プライバシーモデルはページが一行で宣言している：「このコンピュータ上で処理され、アップロードはされない。」インストールもアカウントも不要。HNスレッド（173+ pts）は主に字形的な比較と、どのブラウザが正常に動くかの報告で埋まっている。

**Why it matters:** このフィードが追い続けているローカルファーストツールのパターンにおける、小さく磨かれた一品だ——キャプチャ、正規化、フォントへの梱包という全工程がサーバーゼロのブラウザタブに収まる。それはプライバシーの物語であると同時に配布の物語でもあり、ウェブのフォントツールchainが今日どんな入力を受け付けるようになったかの良いデモにもなっている。

[`🔗 Ductus`](https://ductus.sorenblank.com) · [`🔗 HN議論`](https://news.ycombinator.com/item?id=50509972)

---

## 25. Giteaのセキュリティ一掃がNVDに到着：自社CNAから1時間で20件のCVEレコード——リポ自動初期化を経るコマンド実行とリポジトリ検索でのパスワードハッシュ漏えいをv28.4.0が修正

- **Velocity:** ▮ steady
- **Source:** NVD · CVEレコード20件（Gitea CNA）· 11月15日 21:16–22:17 UTCに公開
- **Tags:** `cve` `gitea` `self-hosted-git` `security-release` `password-hash`

Giteaは**v28.4.0**（11月15日 19:39 UTC）をセキュリティリリースとして出し、Gitea自社CNA発のCVEレコード20件が2つの整時バッチ（21:16Z、22:17Z）でNVDに着地した——執筆時点で全件`Deferred`（NVDは分析をCNAに委ねる）、CVSSスコアを持つものは一つもない。リリースノートが先頭に置いた2件：**CVE-2026-125423**はコマンド実行のレース——auto-initで作られたリポジトリが初期化完了前にプッシュを受け付け、ユーザーが細工したtreeをプッシュするとREADMEの書き込みがシンボリックリンクを辿ってサーバ上のgitフックを上書きし、「Giteaシステムユーザーとしてコマンドを実行」できた。**CVE-2026-123006**は**28.0.0以来存在**：ダッシュボードの`GET /repo/search`が各リポジトリの内部commit-statusオブジェクトを返し、そこにオーナーの完全なユーザーレコードが含まれるため、「サインイン済みの任意ユーザーが、commit statusを持つ可視リポジトリのオーナーのパスワードハッシュ・ソルト・メールアドレスを読めた。」このリリースはGo 1.27.4でのバイナリ再ビルド（CVE-2026-97054）と、Actions・issue・PR・パッケージ周りの修正も含み、ブログ自身の言葉は「すべてのユーザーにできるだけ早いアップグレードを強く推奨する」。

**Why it matters:** デフォルト構成のセルフホストforgeでサインイン済みの誰もが読めたパスワードハッシュ漏えいは、パッチより長生きする種類のバグそのものだ——数ヶ月前に漏れたハッシュは、あなたがアップグレードしてもローテーションされない。Giteaを運用しているなら、アップグレードは1ステップだが、検索エンドポイントの露出期間はチェンジログの一行としてではなく、見直すべきインシデントとして扱うこと。

[`🔗 Giteaブログ: 28.4.0リリース`](https://blog.gitea.com/release-of-28.4.0/) · [`🔗 GHSA-5mx6-8rwm-52wf`](https://github.com/go-gitea/gitea/security/advisories/GHSA-5mx6-8rwm-52wf) · [`🔗 v28.4.0リリース`](https://github.com/go-gitea/gitea/releases/tag/v28.4.0)

---

## 26. Torが持続的DDoSへの迅速対応として0.4.9.17をセキュリティリリース：IPv6関連の中継DoS防御、さらなるリリースを予告

- **Velocity:** ▮ steady
- **Source:** Tor Project フォーラム · HN 65+ pts · ~3.7h ago (~08:21 UTC+8)
- **Tags:** `tor` `ddos` `relay` `dos-defense` `security-release`

Tor Projectは11月13日、ネットワークで進行中のDDoS攻撃「がほとんどの中継オペレータに影響した」ことへの「迅速な対応」として**0.4.9.17**をリリースした。アナウンスは要の修正を名指しする——「特にひとつの修正が、IPv6処理に関わる中継DoS防御としてとりわけ重要」——そして攻撃の形を率直に描写している：中継は「大量のクライアント回路の洪水で圧倒されている」。投稿は中継オペレータに感謝し、tor-relays@リストが非常に活発だったと伝え、防御はまだ評価中だと警告し（「近いうちにさらなるリリースを予定している」）、オペレータにひとつの指示を与える：「中継を運用しているなら、できるだけ早くアップグレードしてください。」HNスレッドがこのリリースを一夜のうちに表へ運んだ。

**Why it matters:** Torの検閲・DoS耐性は、それを必要とする人々にとって荷重を支えるインフラであり、持続する回路フラッド攻撃はそれを「壊す」のではなく緩やかに劣化させる——停電のスローモーション版だ。ここでの本当の物語はリリースのテンポだ：攻撃が公認されてからピンポイントの修正まで数日で、ネットワークの現在の健全性はそれを適用するボランティア中継オペレータの手に懸かっている。

[`🔗 Tor フォーラム: セキュリティリリース 0.4.9.17`](https://forum.torproject.org/t/security-release-0-4-9-17/22454) · [`🔗 HN議論`](https://news.ycombinator.com/item?id=50512441)

---

## 27. Cliceがv1.0を出荷：ゼロから書き直したC++23言語サーバ——その作者が、自分のCLIの大半はエージェントに役立たないと率直に認める。ただしひとつのコマンドを除いて

- **Velocity:** ▮ steady
- **Source:** ykiko.me · HN 113+ pts · ~10.7h ago (~01:22 UTC+8)
- **Tags:** `clice` `cpp` `language-server` `tooling` `agents`

**clice-io/clice**は1,000コミットのマイルストーンに達し、約2年半の作業と7月19日以来4ヶ月のnightly/alphaテストを経て**最初の安定版リリース**を出した。LLVM/Clang上のC/C++言語サーバだが——clangd/cclsに対してゼロから再設計され、現代C++のショーケースとして書かれている：全体がC++20コルーチン（自作のlibuvベース構造化並行ライブラリ上）、C++20 named modulesとC++23 `import std`、静的リフレクションによる全シリアライズ（TOML、JSON、bincode、blob、CLI引数）、そして完全にセルフホスト——自身の`clice modularize`経由で自前のコードベースに言語サービスを提供する。執筆時点で1,513★。エッセイの最良の節は「エージェントについては？」だ：著者はエージェント時代のためにCLIを設計したが、その後それを率直に評価した——grep代替としての`clice query`は「実際のところあまり役に立たない」。正確なシンボル検索にはプロジェクト全体のインデックスが要る一方で「2、3回のgrep呼び出しで通常は十分」だからだ。そして「本当に持ち味を発揮する」のは`clice modularize`で、これがなければエージェントは「サブエージェントの群れを起こし、マイグレーション用のカスタムスクリプトを書く」ことになる。

**Why it matters:** ふたつある。ゼロから書かれたC++23の言語サーバは、この言語の2023年以降の形の、珍しく読める標本だ。そして作者のエージェントCLIの勘定は、このフィードが繰り返し突き当たるパターンについての最も鋭い定式化だ——汎用のツールインターフェースはモデル自身のスクリプト記述力に負け、*高度に特殊化された*コマンドだけがエージェントとの接触を生き残る。いま建てられているすべての「XのMCPラッパー」に掛けるべき設計フィルタだ。

[`🔗 ykiko: clice v1.0 リリース`](https://ykiko.me/en/articles/2105384023094834022/) · [`🔗 clice-io/clice`](https://github.com/clice-io/clice) · [`🔗 HN議論`](https://news.ycombinator.com/item?id=50508715)

---

## 28. オーストラリアの二大スーパーチェーンのひとつColesがサイバーインシデントを調査中——「顧客データ漏えいのエビデンスなし」、運営は正常

- **Velocity:** ▮ steady
- **Source:** colesgroup.com.au · HN 65+ pts · ~2.8h ago (~09:14 UTC+8)
- **Tags:** `cybersecurity` `incident-response` `retail` `australia`

Coles Groupは常設のインシデント声明を掲げた（11月16日午前8:30時点）：同社「はサイバーセキュリティインシデントを調査中」で、これまでの調査結果では「顧客・従業員・サプライヤーのデータがColesのシステムから漏えいまたは持ち出されたエビデンスは確認されていない。」オーストラリアサイバーセキュリティセンター（ACSC）および外部のサイバーセキュリティ企業と協働し「ColesのIT環境を封じ込み、保護」しており、運営は続いており「顧客は通常どおり買い物ができる」としている。帰属も技術詳細もタイムラインもまだない。HNスレッド（65+ pts、45コメント）が更新を追っている。

**Why it matters:** 小売のサイバーインシデントが繰り返し証明するのは、面白い問いは最初の「落ちていないか」ではなくデータ移動の問いだということ——この声明は小売のbreach開示の初期形の定型そのものであり、「まだエビデンスなし」の一行は定義上 perishable（腐りやすい）だ。物語を動かすフォローアップを注視したい：決済テレメトリ、ポイントプログラムのデータ、サプライヤーシステムへの到達性。

[`🔗 Coles Group 更新ページ`](https://www.colesgroup.com.au/updates/) · [`🔗 HN議論`](https://news.ycombinator.com/item?id=50512824)

---

## 29. Salonが31年の歴史に幕——Internet Archiveが25万本超の記事を保存し、実験的なSalon Explorerを公開

- **Velocity:** ▮ steady
- **Source:** blog.archive.org · HN 99+ pts · ~5h ago (~07:00 UTC+8)
**Internet Archiveの投稿**（11月12日、Chris Freeland）は、ウェブ最初期の主要刊行物のひとつの終焉を記録している：「**31年を経て、Salonは刊行終了を発表した。**」Wayback Machineはほぼ30年間、Salonが使ってきた各ドメイン（salon1999.com、salonmag.com、1999年以降のsalon.com）でアーカイブを続けてきた——**25万本超の記事**、**2万人超の著者**によるものが検索可能で、アーカイブはコーパスをフィルタで閲覧できる実験的な **[Salon Explorer](https://web.archive.org/collections/salon/)** インターフェースを出した。投稿はArchiveの「vanishing culture」シリーズに属し、HNでの再発掘（99+ pts）が数日後にフロントページへ乗せた。

**Why it matters:** この保存の投稿で本当に重要なのはその反実仮だ：1995年に創刊した31年の歴史を持つ刊行物が死に、その全コーパスが生き残ったのは、アーカイビングが*連続的*だったから——サイトが健康なときに始まっていて、死んだときに始めたのではない。「私たちはここにいる」と言うすべての刊行物は、ひとつの予算サイクルを隔てて、早めにWayback Machineへクロールを寄付する次の論証になり得る。

[`🔗 Internet Archive: Salonジャーナリズム30年の保存`](https://blog.archive.org/2026/11/12/preserving-30-years-of-salon-journalism/) · [`🔗 Salon Explorer`](https://web.archive.org/collections/salon/) · [`🔗 HN議論`](https://news.ycombinator.com/item?id=50511806)

---

## 30. ULAの Vulcan ロケットが復帰飛行で失敗——打ち上げ約10分後に異常、Amazon Leo 衛星40基をすべて喪失

- **Velocity:** ▮▮▮ trending
- **Source:** Denver Gazette / SpaceNews · 160+ pts on HN · 15.7h ago (~04:37 UTC+8)
- **Tags:** `ula` `vulcan` `rocket-failure` `amazon-leo` `space`

United Launch Alliance（ULA）の **Vulcan Centaur**——2024年の初飛行以来**5度目の飛行**であり、今年前半の固体ブースタ異常で米宇宙軍が一部の国家安全保障ミッションを SpaceX に振り替えて以来の復帰飛行——が、日曜のケープカナベラル SLC-41 からの打ち上げに失敗した。ULA によれば、Launch Director のデータに基づき機体は"suffered an anomaly"（異常を起こし）"failed to deliver the Amazon mission to orbit"（Amazon ミッションを軌道に届けられなかった）。喪失は打ち上げから約 **10分後**、ブースタ段分離を過ぎてのこと。搭載されていた **40基の Amazon Leo** 広帯域衛星はすべて失われた——この星座は軌道上に約400基、完成済みでさらに約1,000基を抱えていた対比で、Starlink は11,000基超。ULA は"work closely with our customer and other appropriate organizations to find the cause"（顧客その他の関係機関と緊密に協力して原因を究明する）と述べており、復帰までの最優先事項は調査だ。打ち上げ前の Amazon の言葉（"We're really set up for success"）は数時間で裏切られた。そしてこの失敗は、SpaceX の完璧な Flight 15 スターシップ塔捕獲（11月15日の本フィード報道）のわずか1日後に降ってきた。

**Why it matters:** ひとつの週末で、2本の配備曲線が分岐した。Starlink を追う星座は一撃で軌道機体の4%を失い、宇宙軍が頼ってきた非 SpaceX の選択肢は調査期間中ふたたび停止する。どちらの Leo 星座のカバレッジ・ロードマップ上で作業している人にとっても、スケジュールリスクは打ち上げペースではなく調査のタイムラインで測る時代になった。

[`🔗 Denver Gazette: ULA loses Vulcan with 40 satellites aboard`](https://www.denvergazette.com/2026/11/15/centennials-ula-loses-a-giant-vulcan-rocket-with-40-satellites-aboard) · [`🔗 SpaceNews: Vulcan launch of Amazon Leo satellites fails`](https://spacenews.com/vulcan-launch-of-amazon-leo-satellites-fails) · [`🔗 HN議論`](https://news.ycombinator.com/item?id=50510442)

---

## 31. 11月13日に報じたジェンスン・フアン退任の続報：FT が「同盟者らと復帰を協議」と報道——一方で捏造された「復職請願書」がネット上に出回る

- **Velocity:** ▮▮▮ trending
- **Source:** Financial Times · 169+126 pts on HN (two threads) · 16.7h ago (~03:31 UTC+8)
- **Tags:** `nvidia` `jensen-huang` `leadership` `misinformation`

取締役会の独立調査のさなかに退任したフアン（11月13日の本フィード報道）から3日、**フィナンシャル・タイムズ**が（11月15日付で）復帰を検討しており、側近の同盟者らと協議済みだと報じた——**イーロン・マスクと Epic Games の Tim Sweeney** が、復帰を公に支持する経営者の列に名を連ねているとされる。この話題の信号対雑音比は本当に悪く、スレッドで一番有用なのは雑音についての内容だ。NVIDIA のリサーチャー **Bryan Catanzaro** は一つの請願を公に否定し、「There is a made-up letter circulating online asking NVIDIA's board to reinstate Jensen, claiming my involvement」（私の関与を主張して NVIDIA 取締役会に Jensen の復職を求める捏造文書が出回っている）、「This letter is obviously fake, and even if it were real I would not sign it」（この手紙は明らかに偽物で、本物でも署名しない）と書いた。懐疑派も声が大きい。Wedbush の Dan Ives：「Despite pressure from major shareholders we see no chance Jensen comes back to Nvidia as CEO」（大株主の圧力にかかわらず、Jensen が NVIDIA の CEO に戻る可能性は見えていない）。スレッドで引用された CNBC の見出しは、ベセント財務長官が外部 CEO による「dramatic shakeup」（大刷新）を求めたと伝える。NVIDIA もフアン本人も何も確認していない。FT 記事はペイウォール内であり、ここの詳細はその条件付き。

**Why it matters:** この話は「創業者CEOが戻るか」だけではない。復帰の物語がすでに部分的に製造されている（あの偽手紙だ）こと——退任が世界の AI 株を二桁動かした市場での話だ。当事者自身の確認がない「復帰」データポイントは、検証前のものとして扱う。このフィード自身の訂正履歴は、まさにこの失敗モードから始まった。

[`🔗 FT: Jensen Huang discusses comeback as Nvidia CEO with allies`](https://www.ft.com/content/45383d86-33c4-4d99-86e5-5e058d3567c1) · [`🔗 HN議論（FTスレッド）`](https://news.ycombinator.com/item?id=50509883) · [`🔗 HN議論（Reutersスレッド）`](https://news.ycombinator.com/item?id=50511982)

---

## 32. MIT「ほぼ何でも作る方法」が2026年版サイトを公開——AI エージェントと Edge AI が名門ファブリケーション講座の一本立ちした演習に

- **Velocity:** ▮▮▮ trending
- **Source:** MIT Center for Bits and Atoms · 389+ pts on HN · 6.5h ago (~13:50 UTC+8)
- **Tags:** `mit` `fabrication` `education` `hardware` `ai-agents`

Neil Gershenfeld の MAS.863/4.140/6.9020——世界の Fab Lab ネットワークを生んだ MIT の講座——が2026年の完全なシラバスサイトを公開し、HN 上位に食い込んだ（389+ pts、6.5時間前）。構造は古典的なものだ。CAD と NC 切断から始まり、組み込みプログラミング、電子設計・製造、機械加工、入出力デバイス、マシン設計へと週ごとに進み、12月15日の学生プロジェクト発表で締める。新しいのは AI の座だ。専任の **AI agents** 演習（10/01、3Dスキャン/プリント週と並行）と **Edge AI** 演習（10/29、入力デバイスと同じ週）が設けられ、スライドとコードは MIT の Forge に置かれている——AI エージェントが、EDA やモーター制御と同じレベルの「ファブリケーション講座の技能」として教えられている。

**Why it matters:** 「ほぼ何でも作る方法」がエージェント技能を核心シラバスに書き入れたとき——EDA やモーター制御と同じレベルの演習として——それはファブリケーションの世界が自ら発する合図だ。エージェント技能はすでに基礎教養である——数十年前にバージョン管理がそうなったのと同じ道だ。完全なシラバスは、ハードウェアを独学するすべての人にとって無料の世界レベルのカリキュラムでもある。

[`🔗 MIT HTMAA 2026 講座サイト`](https://pub.cba.mit.edu/863.26/site/) · [`🔗 HN議論`](https://news.ycombinator.com/item?id=50514470)

---

## 33. Debian 12 の最新カーネル更新がサーバーを停止させる：6.1.0-55 の ext4 NULL ポインタ参照——7件の報告、重要度 critical、修正は上流で進行中

- **Velocity:** ▮▮ rising
- **Source:** Debian Bug Tracker #1154101 · 122+ pts on HN · 7.5h ago (~12:53 UTC+8)
- **Tags:** `debian` `linux-kernel` `ext4` `regression` `servers`

Debian bug **#1154101**（11月15日提出、severity: critical、linux 6.1.192-1 → `linux-image-6.1.0-55-amd64`）は、ポイント更新後のサーバーが消える現象を記録している。「my server not responding remotely after few minutes (imap, smtp, http, ssh...)」（数分後にサーバーがリモートから応答しなくなる——imap、smtp、http、ssh のすべて）とし、GRUB から前の 6.1.0-54 カーネルを起動すれば完全に正常。採取された dmesg は「BUG: kernel NULL pointer dereference, address: 0000000000000000」を示し、クラッシュ地点は **`ext4_mb_load_buddy_gfp+0xbc/0x380 [ext4]`**、トレースは `ext4_free_blocks` → `ext4_ext_truncate` → `ext4_evict_inode` という inode 立ち退き/切り詰めパスをたどり、「note: local[2144] exited with irqs disabled」で終わる。報告は上流（lore.kernel.org の ext4/ntfs3 null-folio スレッド）に転送され、修正案は Debian の Salsa MR #2168 に、さらに6件の重複報告が統合済み——つまり不運な報告者一人の話ではない。生成時点で、カーネルチームの修正はアーカイブに届いていない。

**Why it matters:** これは典型的なポイント更新の罠だ。安定ブランチのセキュリティ/メンテナンス更新が、切り詰め圧力下にある任意の ext4 システム——つまりほとんどのサーバー——に届くデータパス退行を連れてきた。Debian 12 を本番で走らせているなら、6.1.0-55 を保留するか、Salsa の修正が届くまで GRUB に前カーネルを残すこと。そして自分のリリースプロセスの鏡としても読める。このバグが critical なのは、失敗が起動時ではなく遅延してリモートから見える形で来るからこそだ。

[`🔗 Debian bug #1154101`](https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=1154101) · [`🔗 HN議論`](https://news.ycombinator.com/item?id=50514180)

---

## 34. Steve Blank が問う「NVIDIA の次は何か？」——創業者離脱問題：「Execution pays your salary, innovation pays your pension」

- **Velocity:** ▮▮ rising
- **Source:** steveblank.com · 298+ pts on HN · 12.4h ago (~07:55 UTC+8)
- **Tags:** `nvidia` `strategy` `founders` `analysis`

Steve Blank のエッセイ（11月15日）は、ポスト・ジェンスンの NVIDIA を古典的な創業者問題として枠づける。ビジョンを持つ CEO が去るとき、「Most often innovation dies and the company coasts for years on momentum and its brand」（多くの場合イノベーションは死に、会社は勢いとブランドで何年も惰性走行する）。彼の歴史整理：「Jensen Huang reinvented Nvidia three times」（ジェンスン・フアンは NVIDIA を三度作り直した）——2006年の CUDA、2012年の ImageNet 勝利後の深層学習ピボット、そして2020年の Mellanox 買収によるボードから統合型 AI データセンターラックへの転換——「none of these CEOs pivot by committee」（これらのピボットを委員会でやった CEO はいない）。危険は実行型の後継者（彼の例：Ballmer の Microsoft、AI で出遅れた Cook の Apple）にあり、フアンは約60人の direct reports を抱え、「サクセッションプランニングを信じない」と公言していた。彼が名指しする NVIDIA 固有の脅威：最大の顧客たちによる自社シリコン開発、そして NVIDIA ハードの上で走る AI ラボに投じられた約500億ドル——「It's likely these are the bets an execution CEO trims first」（実行型 CEO が最初に刈り込むのは、おそらくこの賭けだ）——加えて財務の但し書き：受注残は堅い、「unless a meaningful share of that revenue turns out to be chips that were diverted to China」（その収益の意味のある share が中国に転用されたチップだと判明しない限り）。結論：誰が率いようと今後2〜3年は問題なく見える。長期の問いは、取締役会が実行者を雇うのか革新者を雇うのか。

**Why it matters:** このエッセイは FT の復帰報道（項31）の数時間前に発表され、復帰観測が解消しようとしている張力をまさに名指しする。組織の安泰と、三度の再発明の唯一の実証済みリーダーとの選択だ。注目すべきは、エッセイが循環ファイナンス論争に一切触れていないこと——その論証は財務ではなく組織についてであり、だからこそ11月14日に報じた WSJ 報道の補完として有用なのだ。

[`🔗 Steve Blank: What's Next for Nvidia?`](https://steveblank.com/2026/11/15/whats-next-for-nvidia/) · [`🔗 HN議論`](https://news.ycombinator.com/item?id=50512235)

---

## 35. HN の「Who is Hiring」が約12年ぶりの低水準に張り付き——今月は244件、その51.6%に AI が登場

- **Velocity:** ▮▮ rising
- **Source:** HN Trends · 87+ pts on HN · 10.8h ago (~09:31 UTC+8)
- **Tags:** `hiring` `ai-impact` `jobs` `data` `hacker-news`

HN Trends の11月分析は、採用縮小に硬い数字をつけた。月次スレッドは「**244 job postings, down 37% from 387 at the same point last year**」（求職244件、前年同期387件から37%減）。2026年7月以降の全スレッドは224〜255の帯に収まり、8月の224件「was the fewest since January 2014」（2014年1月以降で最少）。2026年の月平均は287件——「the lowest yearly average since 2013」（2013年以降で最低の年平均）。その一方で AI は一線を超えた。11月の求人 **51.6%** に AI が現れ、「up from 30% two years ago」（2年前は30%、50%超えは2026年6月が初）。その内訳の変化こそ面白い。AI Agents/agentic 用語が14.8%、LLM が10.7%、そして **MCP は1年前の0.3%から4.5%へ跳ね**（順位 +86）——その間に古典的な「Machine Learning」は14.8%から11.5%へ*下がった*。雇用市場はモデル訓練からエージェント配管へとラベルを塗り替えている。その他の動き：Rust が言語3位に浮上（8.2%、従来4.9%）、TypeScript は17.6%に後退、フロントエンドは2022年初の投稿の27%から6.6%へ崩落。

**Why it matters:** これは AI の労働市場フットプリントを測る数少ない縦断的で方法の一貫したデータセットであり、両面を同時に示している。投稿総数は12年ぶりの低水準、その一方で AI ネイティブ技能（MCP、agents）が残った求人で最も速く伸びるトークンになっている。MCP の数字はとりわけ、エージェントインフラが採用カテゴリとして現れたことの合図であり——「モデルが人気」とは別種の信号だ。

[`🔗 HN Trends: 2026年11月`](https://www.hntrends.com/2026/november.html) · [`🔗 HN議論`](https://news.ycombinator.com/item?id=50512950)

---

## 36. 「あなたのエージェントは改造しやすい方を選ぶ」：エージェントが購入と修理の両方を担うとき、開放性は購買基準になる

- **Velocity:** ▮▮ rising
- **Source:** geoffstearns.com · 75+ pts on HN · 15.2h ago (~05:10 UTC+8)
- **Tags:** `agents` `firmware` `right-to-repair` `hardware` `security`

Geoff Stearns のエッセイ（2026年11月）は、エージェントが購入の助言とデバイスの保守の両方を引き受けるにつれ、開放性が愛好家の関心事から「買われる属性」へ変わると論じる。デバイスを直させるとき、エージェントはまず設定を試み、それが届かなければ「looks for firmware someone else wrote, forks the closest match, or writes its own」（他人の書いたファームウェアを探し、最も近いものをフォークするか、自分で書く）と行動する。だから「any device with writable flash is a platform, whether the maker planned for it or not」（書き込み可能なフラッシュを持つデバイスはすべてプラットフォームだ。メーカーが意図したかどうかにかかわらず）、そして何を買うべきか訊かれたエージェントは「lean toward the one it can change, because that's the one it can fix later」（後で直せるもの——変えられるもの——に傾く）。彼の錨は M-VAVE FM-1 シンセ（そのカスタムファームウェア生態系は11月14日に報じた）だ。所有者たちは2025年9月からファームウェアを書き始め——ほぼすべて AI ツールで——M-VAVE は応えて GPLv3 でファームウェアを公開し、開発キットとブラウザエミュレータを添えた。その後、Behringer、Akai、Erica Synths が続いた。セキュリティの半分は扇動ではなく測定だ。「harmful firmware is as easy to write as useful firmware」（有害なファームウェアは有用なものと同じくらい書きやすい）。だから彼のあらゆる政策への試金石は「asking who controls the signing keys」（誰が署名鍵を握っているかを問うこと）であり、「if a maker blocks code the owner chose and signed, that block is protecting the maker's business」（メーカーが所有者が選び署名したコードを妨げるなら、その妨げはメーカーの事業を守っている）と指摘する。そして緩和策（検証済みインストーラ、所有者保持の鍵、リカバリモード）は「none of them require locking the device」（そのどれひとつとしてデバイスをロックする必要はない）。

**Why it matters:** これはエージェントセキュリティのレンズをソフトウェアサプライチェーンから物理サプライチェーンへ広げる。セキュリティ研究者が脆弱性についてモデル化してきた、エージェントがターゲットを選ぶという力学が、買い物に適用される時代になった。ハードウェアメーカーへの具体的な示唆は居心地が悪い。ファームウェア更新の物語は製品の「エージェント対応度」スコアの一部になりつつあり、それをロックすることはもはやデフォルトではなく競争上の決断だ。

[`🔗 Geoff Stearns: Your Agent Will Pick the Hackable One`](https://geoffstearns.com/blog/your-agent-will-pick-the-hackable-one/) · [`🔗 HN議論`](https://news.ycombinator.com/item?id=50510799)

---

## 37. Tell HN：採用スレッドがメール収集のためにスクレイピングされている——専用アドレスのユーザーが標的型フィッシングを報告、dang は投稿は削除可能と述べる

- **Velocity:** ▮ steady
- **Source:** Hacker News (Tell HN) · 105+ pts · 9.5h ago (~10:53 UTC+8)
- **Tags:** `phishing` `privacy` `hacker-news` `email` `scraping`

Tell HN の投稿（105+ pts）は、公開スレッドが大規模に収穫されたとき何が起きるかを記録している。ユーザー eks391 は Hacker News *だけ*に使っていたアドレスに偽の「AWS 支払い遅延」メールを受け取った——「I use unique emails for every site, so I immediately knew that the late AWS payments email sent to my HN email were fake.」(サイトごとに固有のメールを使っているので、HN のアドレスに届いた遅延 AWS 支払いメールが偽物だと即座に分かった)。コメント欄は同じメカニズムの小さな脅威モデルだ。採用スレッドに投稿した某人は「half burned my primary dev email」（開発用の主要メールを半分焼かれた）と後悔し、別某人は復元問題を四語で要約する——「Unleaking is not a thing.」（漏らしの取り消しは存在しない）。さらに「scary amount of context」（恐ろしいほどの文脈）を持つ詐欺メールの報告や、「classic North Korean scam job offer」（典型的な北朝鮮式の詐欺求人）——FBI がオープンソース開発者への標的と警告した偽リクルーターパターンそのもの（11月14日の本フィード報道）だ。モデレータ dang の返信が実務的な落とし所だ。「Those posts remain permanently deletable, FWIW.」（ちなみに、あの投稿は永久に削除可能です。）

**Why it matters:** サイトごとの固有メールアドレスは、メールセキュリティで最も安価なカナリアだ。そしてこのカナリアは、インターネットで最も読まれる採用面のひとつについて鳴いている——同じスレッドが12年ぶりの低水準にあるというデータ（項35）の数時間後にだ。公開採用スレッドにアドレスを書いたことがあるなら、スレッドの二段階アドバイスに今晩1時間を費やす価値がある。投稿を削除する（今も機能する）、そしてクリック前にすべてのリンクの宛先ドメインを確認する。

[`🔗 Tell HN: HN is being scraped for emails to scam`](https://news.ycombinator.com/item?id=50513451) · [`🔗 dang の返信`](https://news.ycombinator.com/item?id=50514845)

---

## 38. mini.nvim が専任の nvim-mini 組織へ移行——Codeberg と Tangled にもミラー——「プロジェクトの長期的安定性を高めるため専任組織に移しました」

- **Velocity:** ▮ steady
- **Source:** Tangled · 75+ pts on HN · 12.4h ago (~07:55 UTC+8)
- **Tags:** `neovim` `mini-nvim` `tangled` `codeberg` `open-source`

**mini.nvim**——echasnovski による「最小の労力で Neovim 体験を改善する45+の独立 Lua モジュールのライブラリ」——は個人リポジトリ `echasnovski/mini.nvim` から専任の **nvim-mini** 組織へ移された。README は簡潔に述べる：「It was transferred to a dedicated organization to improve long term project stability.」（長期的なプロジェクト安定性を高めるため、専任組織に移管された。）HN スレッド（75+ pts）で面白いのは、それが今どこに住んでいるかだ。GitHub は引き続き「(main)」だが、プロジェクトは **Codeberg** と **Tangled**——AT Protocol ネイティブのコードフォージ——に公式ミラーを置き、`sync` ブランチが自動ミラーリングを示唆する。そして最新コミットの名前は文字通り「docs: mention Tangled and Codeberg mirrors」だ。Tangled 側は完全な履歴を保持し（2.2k コミット、18タグ、最新 v0.18.0）、README の支援文言もフォージ非依存になった：「Leave a star for 'mini.nvim' (on any supported code forge)」（対応するどのフォージでも mini.nvim にスターを）。これは今日の HN で2つ目の Tangled 関連の話（項39の Parcel を参照）。

**Why it matters:** ひとつの移行に、二つのガバナンス信号。広く依存される Neovim ライブラリが創設者の名前空間を離れてバス係数を下げたこと。そして主流プロジェクトが AT Protocol のフォージを第一級ミラーとして扱う選択をしたこと——若いフォージにとって、この種の採用はそれ自身の機能一覧より重い。

[`🔗 Tangled 上の mini.nvim`](https://tangled.org/nvim-mini.org/mini.nvim) · [`🔗 GitHub 上の nvim-mini/mini.nvim`](https://github.com/nvim-mini/mini.nvim) · [`🔗 HN議論`](https://news.ycombinator.com/item?id=50512231)

---

## 39. Show HN：Parcel——Gmail と Fastmail 向けのキーボード駆動 Linux メールクライアント、作者自身の Wayland ツールキットの上で Zig で構築

- **Velocity:** ▮ steady
- **Source:** Show HN · 51+ pts · 12.5h ago (~07:54 UTC+8)
- **Tags:** `zig` `email` `linux` `jmap` `wayland`

**Parcel**（rockorager.dev、Show HN、51+ pts）は「A mail client for Gmail and Fastmail on the Linux desktop, built with Zig and siv」（Zig と siv で作られた Linux デスクトップ向け Gmail/Fastmail メールクライアント）。siv は作者自身の UI ツールキットで、静的リンク、Wayland ネイティブ、ヘッドレスバックエンドを備え、テストはディスプレイなしで走る。そのモデルはキーボードファーストとスタック可能なラベルだ。「Every action has a key, and Ctrl+K lists them all」（すべての操作にキーがあり、Ctrl+K が一覧する）。`/` は「as you type, with Gmail's operators, whichever account it is」（打ちながら検索、Gmail 演算子付き、どのアカウントでも）のライブ検索を提供する。スレッドはオーバーレイのリーダーで描かれ、Parcel は独自のローカルインデックスを保持し「answers most searches without asking the server」（ほとんどの検索にサーバーに訊かず答える）。現時点で Gmail と Fastmail に対応し、原理的には任意の **JMAP** サーバーにも。v1.1.0 はスレッドの前日にタグ付け、287コミット、こちらも Tangled でホストされている。(Vim キーバインドの作成エディタも付く。)

**Why it matters:** Linux デスクトップメールクライアントは墓場ジャンルだ——そしてこの試みの構造的な選択は特筆に値する。IMAP エミュレーションではなく JMAP ファーストのデータモデル。Electron/GTK ではなく自作ツールキット。全体が小さく保たれ、一人の頭の中で監査可能であり続ける。さらに：独立した二つのプロジェクト（Parcel、mini.nvim）が同じ日に Tangled ミラーを選んだ——この種の偶然の採用こそ、ひとつのフォージの節目を刻むものだ。

[`🔗 Tangled 上の Parcel`](https://tangled.org/rockorager.dev/parcel) · [`🔗 HN議論`](https://news.ycombinator.com/item?id=50512218)

---

## 40. Show HN：db-branch——ZFS で Postgres のコピー-on-ライト分支を約0.5秒で、エージェントが安全に照会できる MCP サーバーを内蔵

- **Velocity:** ▮ steady
- **Source:** Show HN · 42+ pts · 22.5h ago (11月15日 ~21:50 UTC+8)
- **Tags:** `zfs` `postgresql` `mysql` `database-branching` `mcp`

**db-branch**（Show HN、42+ pts）は ZFS スナップショットの技をデータベースに持ち込む。base は「a ZFS dataset holding a loaded database」（ロード済みデータベースを保持する ZFS データセット）であり、ブランチは base スナップショットの ZFS クローンなので、作成はゼロバイトのコピー——「db-branch creates a copy-on-write branch of a large database in seconds, with nothing copied.」（db-branch は大きなデータベースの copy-on-write ブランチを数秒で、何もコピーせずに作る。）3ノードの Raft テストクラスタでの彼らの数字：「a PostgreSQL branch is ready in about 0.5 s and a MySQL branch in about 3 s」（PostgreSQL ブランチは約0.5秒、MySQL ブランチは約3秒で準備完了）。エージェントの角度は後付けではなく内蔵だ。「The built-in MCP server lets an LLM agent create a branch, run a risky query or migration on it, and delete the branch」（内蔵 MCP サーバーは、LLM エージェントにブランチを作らせ、その上で危険な照会やマイグレーションを走らせ、ブランチを削除させられる）——さらに TTL クリーンアップ付きの PR/CI ごとのデータベース、大バージョン移行の `upgrade --check-only` リハーサルも。セルフホスト（Ubuntu + ZFS プール、apt リポジトリ）、Beta（「usable today, but APIs and command-line details may still change before 1.0」）、Apache-2.0 のコアに一部有料のクローズドモジュール（SSO、監査、マスキング）。

**Why it matters:** エージェント対本番データベースは、エージェントインフラの最も鋭い未解決の縁のひとつだ。エージェントに照会やマイグレーションを試させるべきで、そして生きているシステムでそれをさせるのは絶対に望まない。これは Neon/Branch のアイデアを コモディティな ZFS でオンプレムへ持ち帰ったものであり、MCP サーバーをインターフェースに選んだことで、このフィードが追っているハーネスから専用クライアントなしに使える。

[`🔗 db-branch/db-branch`](https://github.com/db-branch/db-branch) · [`🔗 HN議論`](https://news.ycombinator.com/item?id=50506940)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-16T12:46:44Z |
| Items | 40 |
| Sources tracked | 47 (Hacker News, GitHub Trending, NYT via Yahoo News, MacAnorak/Notebookcheck, Ahead of AI, Josh Blais, Common Dreams, WDR, Lucy's Save Room, IETF Datatracker, MITRE/NVD CVE records, VulDB, oss-sec, Jakub T. Jankiewicz, NVIDIA docs/blog, arXiv, Google Labs, Meta, Vercel, AG-UI releases, egm.dev, npm, Qwen blog, OpenRouter, iter.ca, uBlock GHSA advisory, Ransomnews, Gitea blog, Tor Project forum, Bruce Röttgers, Protomaps, ykiko.me, clice-io, Coles Group, Ductus, Internet Archive, Denver Gazette, SpaceNews, Financial Times, Reuters, Steve Blank, Debian Bug Tracker, HN Trends, Geoff Stearns, MIT Center for Bits and Atoms, Tangled, rockorager.dev) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[Previous day](2026-11-15.md) · [Raw .md](latest.md) · [Archive](../archive/index.md)
