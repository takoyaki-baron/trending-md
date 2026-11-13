---
date: 2026-11-13
updated: 2026-11-13T04:29:26Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 26
license: CC-BY-4.0
---

# trending.md — 2026-11-13

## 1. ジェンスン・フアンがNvidia CEOを辞任——CFOのColette Kressが暫定CEOに、株価は始値で13%下落

- **Velocity:** ▮▮▮ trending
- **Source:** CNBC live blog · 2,156+ pts on HN · 6.2h ago (~21:50 UTC+8)
- **Tags:** `nvidia` `industry` `leadership`

昨日のフィードで報じたWSJの解任報道:現実になった。Nvidiaを33年前に共同創業し、4兆ドル企業に育てたジェンスン・フアンが**11月12日**、社長・CEO・取締役を辞任した。前日にはNYTがVPのKimberly Powellとの不倫を報じ、数時間後にはReutersが2人目の関係を伝えていた。取締役会は**CFOのColette Kressを暫定CEOに指名**(CFO職は兼務)し、1993年から取締役を務める**Harvey C. Jones**をNvidia史上初の取締役会議長に任命した。NVDAは始値で**13%超**下落し、時価総額は4兆ドルを割り込み、金曜終値からは7,400億ドル超が消失。Q3決算は予定通り**11月17日**のままだ。取締役会は情報機関疑惑の調査にWachtell Liptonを(フアンはPaul Weissを)雇用し、下院外交委員会のBrian Mast委員長はフアンが感謝祭前に「has agreed to come」証言すると述べた。

**Why it matters:** AIインフラ投資全体の資金源である会社のCEOが不在となった。3日間の報道が24時間以内に辞任に至り、今後のカレンダー(11月17日の決算、議会証言)は「Nvidiaの勢いはロードマップ由来か、それとも人物由来か」を試すストレステストそのものになる。KressがCFOとCEOを兼任する暫定时の細部が最大の注目点だ。

> "The Board has full confidence in Colette and the leadership team." — Nvidia初の取締役会議長 Harvey C. Jones

[`🔗 CNBC: Nvidia CEO Jensen Huang resigns — live updates`](https://www.cnbc.com/2026/11/12/nvidia-jensen-huang-ceo-live-updates.html) · [`🔗 Reuters live`](https://www.reuters.com/live/nvidia-live-board-meets-fate-ceo-jensen-huang-after-affair-reports-2026-11-12/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50467087)

---

## 2. Gemini 4 Hydrogen 登場——Googleのagenticワークフロー向け高速日常モデル、新たなxhigh思考レベルも

- **Velocity:** ▮▮▮ trending
- **Source:** blog.google · 305+ pts on HN · 2.0h ago (~02:00 UTC+8)
- **Tags:** `gemini` `model-release` `agents`

Googleは**Gemini 4 Hydrogen**をリリースした(11月12日)。フラッグシップのCarbon、Argonと並ぶ高速日常モデルの位置づけで、100万トークンのコンテキストを**均一価格**(入力$1.50/M、出力$7.50/M)で提供。思考レベルはlow/medium/highに新設の**xhigh**を加えた4段階で、AI Studio、Gemini API、Antigravity、Geminiアプリ、Google Searchに展開される。数値:Artificial Analysis Intelligence Indexでhigh設定**51**(xhighでは54、Argonは50)、Terminal-Bench 4.1で**57%**(Gemini 3.8 Flashは18.2%)、捏造クレームは5倍超削減。AntigravityのOrchestratorモードはCarbonに近いTerminal-Bench成功率を「クォータ24%減・所要時間19%減」で達成すると説明。安全性の表では過剰拒否が最大81%減、ミスアラインドアクション12倍減、「20万回超の監査ターン」で96.7%のエージェント誠実性率を主張する。

**Why it matters:** リリース文は明確に控えめだ——「matches or outperforms some of the competing models in its class」であり、2.5倍の速度やトークン節約の数値はパートナーの「早期テスト」由来。したがってフロンティア飛躍ではなく、強力なエージェント用作業馬の更新として読むべきだ。開発者が実際に感じるのは100万コンテキストの均一価格とxhigh設定の部分になる。

> 発表文はHydrogenを、フロンティア兄弟のCarbon・Argonと並ぶ、Googleのagenticワークフロー向け日常の作業馬と位置づけている。

[`🔗 Google: Introducing Gemini 4 Hydrogen`](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-hydrogen/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50471431)

---

## 3. 「正しいソフトウェアを書くことが難しい理由」——2016年の計算量理論エッセイが10年後にHN首位に

- **Velocity:** ▮▮▮ trending
- **Source:** pron.github.io · 314+ pts on HN · 9.6h ago (~18:25 UTC+8)
- **Tags:** `correctness` `complexity` `formal-methods`

Ron Presslerの2016年エッセイ(拡張版はCurry On 2016で発表)が314ポイントで再浮上:正しさが難しいのは道具がないからではなく、計算可能性理論がそう決めているからだ。有界停止問題はΘ(n)(「you can't know what a program will do faster that running it」[sic])、一般的な検証は計算機科学で最難関、そして制限しても無駄だ——total言語でもΩ(|S|)、記号モデル検査はPSPACE-completeのまま、2005年のパラメータ化計算量の結果は「correctness doesn't decompose」を示す。具体的なアンカーも印象的:停止性がZFCから独立な1,919状態のチューリングマシン(約100〜200行のPython)、ゴールドバッハ予想が偽ならばクラッシュする10行のtotalプログラム、そして致命的分散システム障害の92%が非致命的エラーのハンドリングミスに由来した2014年のトロント研究。

**Why it matters:** このエッセイは2026年に読むと2016年とは違う意味を持つ。執筆をエージェントに委譲しても壁は取り除かれない、という理論的根拠だ——検証コストはコードの作者が変わっても消えない。結論も今なお正しい:普遍的な数学的解法は存在せず、人間(と今やエージェント)が実際に生み出すプログラムとバグへの経験的研究あるのみ。

> "There does not exist a generally useful programming language where every program is feasibly verifiable."

[`🔗 pron.github.io: Why Writing Correct Software Is Hard`](https://pron.github.io/posts/correctness-and-complexity) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50465352)

---

## 4. Rust 1.100.0:`!`(never型)とカスタムアロケータが安定化——100番目のマイナーリリース

- **Velocity:** ▮▮ rising
- **Source:** rust-lang/rust · 285+ pts on HN · 1.7h ago (~02:20 UTC+8)
- **Tags:** `rust` `release` `language-design`

Rustのキリ番リリース(11月12日、1.99から5,340コミット)は、長年続いた2つの設計論争を安定化させた:**never型`!`**(`Infallible`は`!`の型エイリアスに)と**`extern "custom"`**。ライブラリ側では**カスタムアロケータが実装**——`std::alloc::Allocator`、`Global`、`System`、さらに`Box::new_in`、`Vec::new_in`、`Vec::allocator`、`Box::map`/`Arc::map`/`Rc::map`。Cargoは独自のlintテーブル(`[lints.cargo]`、例:`cargo::unused_dependencies`)と**依存クールダウン**(RFC 3923に基づく最低公開後経過期間)を獲得——サプライチェーン対策の正式化だ。プラットフォーム:`wasm32-wasip3`がTier 2に昇格、新Tier 3ターゲット`powerpc64-sony-ps3`、`i686-pc-windows-gnu`はホストツールなしのTier 2に降格、標準ライブラリはUnicode 18へ。

**Why it matters:** `!`と`Allocator` APIはエコシステム全体が感じてきた設計制約だった——安定化により10年分の`#[feature]`回避が不要になり、安定版Rustでアロケータ総称コンテナが使えるようになる。cargoクールダウンlintは静かなシグナルでもある:パッケージ年齢チェックがCIハックから一等のサプライチェーン道具になりつつある。

[`🔗 Rust 1.100.0 release notes`](https://github.com/rust-lang/rust/releases/tag/1.100.0) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50471793)

---

## 5. Microsoft 365大規模障害:Outlook、Teams、SharePoint、Copilotが一同に——ステータスページまで

- **Velocity:** ▮▮ rising
- **Source:** mailservices.isc.upenn.edu(MSインシデント抽出)· 262+ pts on HN (Ask) · 1.8h ago (~02:15 UTC+8)
- **Tags:** `outage` `microsoft-365` `exchange-online`

11月12日、進行中のインシデントの波がMicrosoft 365を襲った:**EX1550543**(Outlook on the web、MAPI、EAS、RESTでのExchange Onlineメールボックス接続)が**16:17 UTC**に発行、**MO1550821**が**18:26 UTC**に続いた——「Users may be unable to connect to multiple Microsoft 365 services」で、Exchange Online、Teams、SharePoint、**Copilot 365とDefender XDR**が影響を受ける可能性。Microsoftの更新は、失敗したヘルスチェックを「a specific component on the affected servers」に帰し、「elevated processor usage while handling requests」があったと説明。「a large number of servers being unexpectedly unavailable」により負荷が上昇した後、「paused all deployments and configuration changes」。HNのAskスレッド(262pt)と別のフロントページ投稿はサービスヘルスダッシュボード自体も不調だったと指摘。配信時点でインシデントは still `serviceDegradation`。

**Why it matters:** 影響範囲(メール+会議+ドキュメント+Copilot+XDRが同時)と障害モード(一部サーバーのヘルスチェック失敗、デプロイ全停止)は、先週のGitHubインシデントと同じフリート整合性クラスに読める——そしてステータスページごと落ちる劣化は、劣化時にユーザーが信じるよう言われている唯一の経路自体を奪う。

[`🔗 UPenn: Microsoft incident extract (EX1550543, MO1550821)`](https://mailservices.isc.upenn.edu/computing/email/penno365/alerts/ms-incidents.html) · [`🔗 CRN: Outage hits Outlook, Defender, Purview`](https://www.crn.com/news/cloud/2026/microsoft-outage-hits-outlook-defender-purview-day-after-teams-issues) · [`🔗 HN Ask: Microsoft/Azure outage?`](https://news.ycombinator.com/item?id=50471668)

---

## 6. AppleがMIPSを学習可能なサポート関数に——RAG検索は99%再現率で最大8倍高速に

- **Velocity:** ▮▮ rising
- **Source:** machinelearning.apple.com · 229+ pts on HN · 27.1h ago (~00:55 UTC+8 Nov 12)
- **Tags:** `rag` `retrieval` `research`

AppleのML研究記事(11月5日、ICML 2026論文「Amortizing Maximum Inner Product Search with Learned Support Functions」)は数学的に明晰な観察を出発点にする:ベクトルデータベース検索の中核演算である最大内積探索(MIPS)は凸**サポート関数**であり、小さなニューラルネットで直接予測できる。そこから2つのアーキテクチャが生まれる:**SupportNet**はセントロイド距離ではなく「クラスタ内の最良到達可能マッチ」でクラスタをスコア化するルータ、**KeyNet**は最適マッチのキーベクトルを直接予測して標準のFAISS IVFインデックスを導くクエリリライタ。Natural Questions(約260万パッセージ)で、KeyNetは**99%再現率**を維持したまま最大**8倍高速**(0.23 ms 対 1.8 ms)、または走査キー数を約11分の1に。SupportNetはセントロイドルーティング比で約1.9倍高速に95%ルーティング再現率を達成。

**Why it matters:** これは「力ずく走査」と「近似インデックス」に次ぐ第三の選択肢——検索を、自分自身のクエリ分布で訓練した学習関数に償却する。代償は前提に明記されている:ネットワークはデータベースとクエリ分布ごとの訓練が必要で、RAGが依存する巨大で安定したコーパスには輝くが、コーパスが変動する場所では劣化する。コード公開には言及がない。

[`🔗 Apple ML: Faster Retrieval for Better, More Efficient RAG`](https://machinelearning.apple.com/research/faster-retrieval) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50455633)

---

## 7. 任天堂のDMCA一掃:11月6日付の4通の通知がSwitchエミュレータforkとmodchipファームウェアを一括削除——報道の波は今到着

- **Velocity:** ▮▮ rising
- **Source:** github/dmca · 180+ pts on HN · 3.6h ago (~00:25 UTC+8)
- **Tags:** `dmca` `nintendo` `emulation`

**11月6日**付の任天堂削除通知4通(`2026-11-06-nintendo.md`〜`-4.md`)がgithub/dmcaに登場し、HNの波は11月12日に押し寄せた。通知が援引するのは単なるコピーではなく**回避装置(アンチサーカムベンション)**:任天堂はSwitchのTPMを「the encryption of video game files using certain proprietary cryptographic keys, such as those referred to as prod.keys」と描写し、**リポジトリ全体**を侵害と主張——yuzu forkの`IpwnedU/yuzu-android-master`や、Picofly modchipファームウェア(`Ansem-SoD/Picofly`、エミュレータではなくハードウェアmod用ファームウェア)を含む。各通知にはGitHubの標準的な削除前プロセス(所有者への連絡、カウンターノーティス期間)が記されている。

**Why it matters:** modchipファームウェアの削除は、yuzu/Ryujinxの前例をエミュレータの*コード*からその周辺の*ハードウェアmodエコシステム*へ拡大する——`prod.keys`に触れるすべてに手が届く、より広い回避解釈だ。カウンターノーティス期間を注視すべきだ:リポジトリ全体主張は最も可逆的な種類の削除で、削除されたコードのforkは通常数日で再出現する。

[`🔗 github/dmca: 2026-11-06-nintendo.md`](https://github.com/github/dmca/blob/master/2026/11/2026-11-06-nintendo.md) · [`🔗 github/dmca: 2026-11-06-nintendo-2.md (Picofly)`](https://github.com/github/dmca/blob/master/2026/11/2026-11-06-nintendo-2.md) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50469994)

---

## 8. openQ4 0.14.1がRavenとRitualが未発売のまま終わったQuake 4拡張を搭載——移植版独自エンジンで再構築

- **Velocity:** ▮▮ rising
- **Source:** themuffinator/openQ4 · 197+ pts on HN · 5.8h ago (~22:15 UTC+8)
- **Tags:** `quake4` `game-port` `open-source`

オープンソースのQuake 4ソースポートopenQ4が**v0.14.1**(11月11日)をリリース——「0.13.2以来最大の更新」を自称し、**取り下げられた0.14.0**の代替となる。主役は**The Awakening**:Raven SoftwareとRitual Entertainmentが未発売のまま終えた拡張で、Justin Marshallが回収・公開したもの——「All 13 maps run on openQ4's own engine and game code」で、モンスター・武器・乗り物は再構築済み、ゆえに「never loads the alpha's game DLL」(拡張ファイルは各自用意)。同一リリースにはOpenGL/Vulkan上の安定したキャッシュ付きシャドウマッピング、Remastered HUDを備えた再構築インターフェース、Windowsの既定レンダラとしてのVulkan、実験的な署名済みARM64 **Android** APK、マルチプレイ用ボットとボイスチャット、実験的VRとレベルエディタも含まれる。

**Why it matters:** これは先週のBlack Ops II移植と同じ静的再コンパイルmoddingの波だが、参考になるねじれがある:openQ4は失われたalphaバイナリを梱包するのではなく、拡張のコンテンツを独自エンジン上で再実装した——法と互換性のグレーゾーンを entirely回避する保存戦略だ。リリースノートが0.14.0の取り下げに正直であることも、必要とされる数よりずっと稀だ。

> "Play the recovered Quake 4 expansion beside the original campaign from Single Player → Campaign." — openQ4 0.14.1リリースノート

[`🔗 openQ4 v0.14.1 release notes`](https://github.com/themuffinator/openQ4/releases/tag/v0.14.1) · [`🔗 themuffinator/openQ4`](https://github.com/themuffinator/openQ4) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50467618)

---

## 9. smolmaxxing:RAM 1.9 GBのAndroid TVボックスで16B MoEが5.1 tok/s——全主張をハードウェア上で実測

- **Velocity:** ▮▮ rising
- **Source:** hyperionaidev/smolmaxxing · 172+ pts on HN · 4.7h ago (~23:20 UTC+8)
- **Tags:** `edge-ai` `quantization` `llm-inference`

「I'm making LLMs work on small and old devices」はスコアボード付きの研究ログだ:1号機はXiaomi TV Box(4× Cortex-A55、**RAM 1.9 GB**、非root)で、Qwen3.5-0.8Bが在庫の7.5 tok/sから**16.8**へ。Qwen3.5-2Bは実チャットで**7.7 tok/s**(bits/byte 0.909)。さらにQ2_Kエキスパートのflashページング、キャッシュ認識ルーティング、プリフェッチにより、**16B MoE(Ling-mini-2.0)が5.1 tok/s**で、600語の回答でも一貫性を保つ。2号機は脱獄した2013年製iPad Air(Apple A7、1 GB)で、Safariから1.7Bモデルを**24〜26 tok/s**で実行。技法はボトルネックごとに整理:ベースNEONチップ向け1-bit LUTカーネル、2-bitフィールドに詰め込んだternaryウェイト、MTP投機つきO_DIRECTウェイトストリーミング、エキスパートmissを13%→約2%に圧縮したエキスパートページャ。すべてが実験E1〜E160として書かれ、劣化テスト(劣化長文回答は12/13→1/13)と、トークナイザが異なるモデルを公正比較するbits/byteの品質指標を備える。

**Why it matters:** 小さなデバイスでLLMを動かす系の投稿の大半は見栄えの良いベンチマークを選ぶ。これは自らの失敗(密度9Bは0.27 tok/s)と正直な横断品質指標を公開しており、このボックスでより大きいことが効くのは、モデル自体がより良いときだけ(bigger only helps on this box when the model is also better)という発見こそ、世界が実際に所有する30ドルデバイス群における最先端だ。

> "Every number in this repo was measured on the device itself." — smolmaxxing README

[`🔗 hyperionaidev/smolmaxxing`](https://github.com/hyperionaidev/smolmaxxing) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50468888)

---

## 10. PostgreSQL11月の波:52個のCVEを修正(18.7/17.12/16.16/15.20/14.25)——PostgreSQL 14はEOLへ

- **Velocity:** ▮▮ rising
- **Source:** postgresql.org · 87+ pts on HN · 5.6h ago (~22:25 UTC+8)
- **Tags:** `postgresql` `security` `cve-wave`

PostgreSQLの四半期更新(11月12日)は全サポート分支にわたり**52個のセキュリティ脆弱性と140超のバグ**を修正、しかも重量級だ:type confusionとuse-after-freeの欠陥により攻撃者が任意コードを実行できるものとして**8.8**評価された修正が数十件。`dblink`再入切断UAF(**CVE-2026-120147**、オブジェクト作成者がDBのOSユーザとしてコード実行)、論理レプリケーションによるサブスクライバ側システムカタログへの書き込み(**CVE-2026-120145**)、未検証アーカイブからコード実行する`pg_restore`(**CVE-2026-116314**)、制約名経由の`pg_dump` SQL注入(**CVE-2026-116318**)を含む。このリリースは**PostgreSQL 14の最終更新**でもある——ブランチはEOL——そして宿題つき:破損可能なGINと`pg_trgm` GiSTインデックスの再インデックス、増分バックアップ利用者はフルバックアップの取り直し、パーティションテーブル上の不正な`NOT NULL NO INHERIT`制約の確認。PostgreSQL 19 RC 2は同一修正を載せ、GA目標は11月19日。

**Why it matters:** 1つの累積リリースで52個のCVE——大半がプロジェクト自身のCNAによる8.8評価——は異例に大規模な攻撃面修正で、複数(pg_restore、pg_dump、vacuumdb)は運用者が日常的に実行する管理ツールチェーン内にある。同じ息でPostgreSQL 14のEOLも告げられ、今回のアップグレードは今四半期の必須項目となる。

[`🔗 PostgreSQL 18.7, 17.12, 16.16, 15.20, 14.25 and 19 RC 2 released`](https://www.postgresql.org/about/news/postgresql-187-1712-1616-1520-1425-and-19-rc-2-released-3442/) · [`🔗 PostgreSQL CVE-2026-120147 (dblink UAF)`](https://www.postgresql.org/support/security/CVE-2026-120147/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50467763)

---

## 11. Synologyが2つのアドバイザリで27個のDSM CVEを公開——頂点はAuth APIの認証不要SQLi 9.8

- **Velocity:** ▮▮ rising
- **Source:** Synology advisories · NVD wave published Nov 12 (~4.8h ago)
- **Tags:** `synology` `nas` `security`

Synologyの**SA-26:19**が最重量の2件を収める:**CVE-2026-76954(CVSS 9.8)**はDSMのAuth APIにおけるSQLインジェクションで、「remote attackers … read or write arbitrary files and conduct denial-of-service attacks」が可能、**CVE-2026-85101(8.6)**はrsyncの認証バイパス。**SA-26:18**はさらに25件——Important 8件(うち8.8が3件:ユーザ制御キー経由のSSOAuth認可バイパス**CVE-2026-13672**、Sharing APIのパストラバーサル**CVE-2026-18792**、Auth APIの認証欠落**CVE-2026-74857**)とModerate 17件——で合計**27 CVE**、NVDが11月12日に公開した27件の`security@synology.com`レコードと正確に一致する。両アドバイザリともResolvedで、全ブランチを1つの修正でカバー:DSM **7.4.1-90080-1**、**7.3.2-86009-5**、**7.2.2-72806-10**、または**7.2.1-69057-13**。暫定緩和策の記載はない。

**Why it matters:** NASは家庭や小規模オフィスのインターネット面向けバックアップ端末であり、認証パスの認証不要9.8はランサム集団がスキャンする形状そのものだ。アドバイザリは11月10日公開、NVDレコードは11月12日到着——CVEフィードでパッチを当てているならベンダーに2日遅れていた。今日、DSMの更新チャネルを確認しよう。

[`🔗 Synology-SA-26:19`](https://www.synology.com/en-global/security/advisory/Synology_SA_26_19) · [`🔗 Synology-SA-26:18`](https://www.synology.com/en-global/security/advisory/Synology_SA_26_18) · [`🔗 NVD: CVE-2026-76954`](https://nvd.nist.gov/vuln/detail/CVE-2026-76954)

---

## 12. Mike Clarkと語るZen 6:Zen 6cがフラッグシップに昇格、整数乗算器は2つに

- **Velocity:** ▮ rising
- **Source:** chipsandcheese.com · 144+ pts on HN · 5.9h ago (~22:10 UTC+8)
- **Tags:** `amd` `zen6` `cpu-architecture`

Chips and CheeseのGeorge CozmaがAMD初代ZenアーキテクトのMike Clark(コア設計歴33年)にZen 6/Veniceを聞いたインタビューで、明かされたのは構造的な詳細ばかりだ:**Zen 6cは面積最適化バリアントからフラッグシップへ昇格**——32コア、フル128 MB L3、ファミリー最高IPC——一方クラシックZen 6は高周波モデルになり、Clarkは「we don't want to create a delta between the two architectures that software has to be optimized for」を強調。実行部の変更はスケジューラの分散型回帰に続くものだ(11-11に取り上げたZen 6スケジューラ分析の件):**整数乗算器は3つから2つへ**、**ベクトルロードは2つから4つへ倍増**、VNNIユニット2つは、フロアプランが既に決まった後のプロジェクト終盤に、オーケストレーション級AI向けとしてねじ込まれた(「It's not going to beat a GPU, and that's not the point」)、分岐ミス予測からの復帰は安価になり、ClarkはTAGE分岐予測器テーブルのAI支援チューニングを認め、リダイレクト速度への執着を「monomaniacally focused」と表現した。

**Why it matters:** Zen 6cの昇格は直近3世代のポジショニングを反転させる——密度はもはや低価格オプションではない——そしてインタビュアー自身のSPECint 2026実測(クロック不利でZen 6cがAMD最速のZen 5サーバーチップに並ぶ)は初の測定可能な世代横断チェックポイントだ。

[`🔗 Chips and Cheese: Talking Zen 6 with Mike Clark`](https://chipsandcheese.com/p/talking-zen-6-with-mike-clark-at) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50467460)

---

## 13. Pharo World:完全なPharo SmalltalkイメージがWebAssembly経由でブラウザタブ内で動く

- **Velocity:** ▮ rising
- **Source:** massimo-nocentini.github.io · 131+ pts on HN · 29.7h ago (~22:20 UTC+8 Nov 11)
- **Tags:** `smalltalk` `webassembly` `live-programming`

Massimo Nocentini氏のPharo Worldは、本物のPharoイメージ(`.image`+`.changes`+`.sources`)をページ内のWebAssemblyコンパイル済みVMに読み込み、動作するイメージ内REPL、`.st`ファイルやイメージ一式のドロップイン、そして——ここが面白い部分——設定可能な**Git HTTPプロキシ**経由でのブラウザ内Iceberg/Metacello Git操作を提供する。直接クローンは「このページを通す(CORS)」ホストでしか動かないためだ。代償は率直に書かれている:プロキシは「sees the code and any credentials that pass through it」ゆえ、自分で運用したものを。

**Why it matters:** Smalltalkは元祖ライブプログラミング環境であり、WASM版Pharoはイメージベースのワークフロー全体(何でも検査、実行中に何でも変更)を共有可能なURLにする——Squeak/Pharo系の思想をインストールなしで教えるライブデモ形式だ。CORSプロキシの資格情報警告は、ブラウザ内IDEすべてが突き当たるプラットフォーム境界そのものだ。

[`🔗 Pharo World`](https://massimo-nocentini.github.io/pharo-vm/world.html) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50453763)

---

## 14. Jane Streetの面接変更:LLMが書いたコードを「レビューし、指示する」オンサイトラウンド

- **Velocity:** ▮ rising
- **Source:** blog.janestreet.com · 119+ pts on HN · 6.0h ago (~22:00 UTC+8)
- **Tags:** `hiring` `interviews` `ai-assisted-coding`

Jane Street(Matthew Saffer執筆、11月2日——11月12日にHNで再浮上)は、今年の夏から新卒候補のオンサイトで新しい形式を試験していると説明:「less code-writing」で、ソフトウェア設計、コードの「the quality, structure, and intention」の検証、そして**LLMを使ってコードを生成する**ことへ傾く。大多数のラウンドは従来型のLLM禁止コーディング面接のまま。候補者はどの形式か事前に通知される。安心させ方も雄弁だ:「You shouldn't feel like you need to have a highly worked out methodology for working with agents」「What we care about is that you think clearly about the tools you use.」

**Why it matters:** これはエリート企業の採用が「コードを打つこと」から「指定し、レビューすること」へ加重を移しつつある最も強いシグナルだ——OCamlの基準が長年「本当にプログラムできる」の定義だった会社から発せられた。コード生成が安くなり続けるなら、採点される技能はモデルの誤りを捉えることであり、まさにこの試験ラウンドが測っているものだ。

[`🔗 Jane Street: Our software engineering interviews are changing a little`](https://blog.janestreet.com/software-engineering-interviews-are-changing-a-little/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50467297)

---

## 15. ZigZag:SVGをステッチに変えるRust刺繍エディタ——エージェントがMCP経由で運転もできる

- **Velocity:** ▮ steady
- **Source:** simpsoka/zigzag · 91+ pts on HN (Show) · 3.0h ago (~01:00 UTC+8)
- **Tags:** `rust` `mcp` `hardware`

「3万ドル…ではなく300ドルの刺繍ミシンがサブスクを要求したので、自分のアプリを作った」:ZigZagはオープンソース(Rust)のビジュアル刺繍エディタで、SVGをインポートし(「fill and stroke parts, transforms, text」)、tatamiフィル/サテンカラム/ランニングステッチを生成、**PES、DST、EXP、JEF、VP3**をエクスポート、またはBluetooth経由で**Brother Skitch (PP1)**へ直接送信できる。エージェントの要素はネイティブ:**MCPサポート**内蔵で、コーディングエージェントがあなたと並んでデザインを作成・編集でき、同じエンジンが`zigzag` CLIとしても動く。Mac版は署名・公証済み。Windowsはzip配布で恒例のSmartScreen対応。

**Why it matters:** 「サブスクで縛られた機器」への反逆は一つのジャンルになりつつある(right-to-repairがShow HNと合流)。ZigZagはその見本だ:ファイル形式の対応範囲でベンダーロックを置き換え、MCP界面はエージェント制御の物理製造ツールのテンプレートになる——先週Kladが絵画で見せたのと同じパターンだ。

[`🔗 simpsoka/zigzag`](https://github.com/simpsoka/zigzag) · [`🔗 HN discussion (Show)`](https://news.ycombinator.com/item?id=50470488)

---

## 16. LibreAGI:オープンウェイトモデルを「殺せない状態」にすることを目的としたプライベートBitTorrentトラッカー

- **Velocity:** ▮ steady
- **Source:** libreagi.com · 91+ pts on HN · 5.9h ago (~22:10 UTC+8)
- **Tags:** `open-weights` `preservation` `bittorrent`

LibreAGI(「Open models should outlive the places that host them」)は、safetensors/GGUF/ONNX形式のオープンウェイトモデルをアーカイブするメンバー限定プライベートトラッカーで、Apache-2.0、MIT、Qwenコミュニティライセンスに限定している。経済設計は希少性に向く:「Credit grows with size and time, and a model with one copy earns four times the base rate」。全ファイルが「checked against its source commit」され、モデルごとにスタッフレビューがあり、「every model, hash and source」の**署名付き公開カタログ**が「this site goes away」してもスウォームを再構築できるように存在する。アカウント不要の公開IRCチャンネルも開放中。

**Why it matters:** モデルの削除と静かな取り下げはオープンウェイトの現実の失効モードであり、ハッシュ検証と署名カタログつきのtorrentスウォームは正しいアーカイブの形だ——Hugging FaceよりもLinux ISOミラーに近い。盲点はサイト自身が開示している:運営者は匿名、メンバーシップは招待制で、その耐久性の主張はすべて署名カタログに懸かっている。

[`🔗 libreagi.com`](https://libreagi.com/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50467439)

---

## 17. free-claude-code:6.9万スターのルータ、12のコーディングエージェントハーネスを61プロバイダへ——「1.3B+ free tokens」

- **Velocity:** ▮ steady
- **Source:** Alishahryar1/free-claude-code · 69,145★, +461 today on GitHub Trending
- **Tags:** `claude-code` `llm-routing` `agent-infra`

今週のGitHub日次トレンドの常連は**free-claude-code**(AGPL、Python 3.14、PyPIでは`free-claude-code` 6.19.11——「Local proxy connecting coding agents to OpenAI-compatible AI providers」):1つのプロキシで**12の対応ハーネス**(Claude Code、Codex、Pi、OpenCode、Cline、Aider、Antigravity CLI、VS Code Chatなど)を**61のプロバイダ**へルーティングし、無料枠を合わせて「1.3B+ free tokens per month」を掲げ、自動モデル/プロバイダ/APIキーフォールバック、レート制限、RTK/Headroom統合による「最大90%のトークン使用量削減」を備える。ToS問題への立場は明示的だ:「FCC follows provider TOS and removes integrations if they stop being allowed.」

**Why it matters:** 使う使わないに関わらず、この設計はエージェントインフラの成りつつある姿だ:ハーネスは交換可能、モデルも交換可能、価値はルーティング/フォールバック層に置かれる——だから自前のモデルを持たないプロキシが、ほとんどのモデルリリースよりトレンドする。注視すべき依存は「free」という語だ:主張されたトークンプールはすべてプロバイダのプロモーションで、予告なく終わりうる。

[`🔗 Alishahryar1/free-claude-code`](https://github.com/Alishahryar1/free-claude-code) · [`🔗 free-claude-code on PyPI`](https://pypi.org/project/free-claude-code/)

---

## 18. ManageEngineの自社CNAが管理スイート全体に9.9と8.8のPowerShell注入ペアを公開

- **Velocity:** ▮ steady
- **Source:** NVD records (CNA: Zohocorp) · published Nov 12 (~4.8h ago)
- **Tags:** `manageengine` `enterprise` `security`

ZohocorpのCNAは11月12日、ManageEngineの修正批次を公開した。先頭は**CVE-2026-12591(CVSS 9.9)**——M365 Manager Plusのbuild 4818未満、認証済みテクニシャン到達の欠陥——と、**DDI Centralのbuild 6301未満**へのクラスタ:認証バイパス(**CVE-2026-19422**、9.1)、PowerShell注入(**CVE-2026-19421**、8.8)、認可バイパス+PowerShell注入の併合(**CVE-2026-75869**、8.8)。この波は共有プラットフォームの**CVE-2026-12507(9.1)**もカバーし、ServiceDesk Plusの15290未満、AssetExplorerの7860未満および同系ビルドに影響する。スコアはすべてベンダーCNA自身のもの(執筆時点でNVD分析はまだ、全レコード`Awaiting Analysis`)。

**Why it matters:** ManageEngineスイートは数千の中規模企業のIT管理の背骨であり、その歴史には活発に悪用されたチェーンが含まれる(2022年のManageEngine ADSelfService PlusエントリはKEVに長年居座った)。*認証済みテクニシャン*が到達できる9.9は、侵害されたヘルプデスクアカウント1つが全社イベントになることを意味する——build 4818/6301/15290を今週パッチしよう。

[`🔗 NVD: CVE-2026-12591`](https://nvd.nist.gov/vuln/detail/CVE-2026-12591) · [`🔗 NVD: CVE-2026-19422`](https://nvd.nist.gov/vuln/detail/CVE-2026-19422)

---

## 19. AppleのAttention-to-Mambaレシピ:Transformerを純SSMへ蒸留——困惑度14.01 対 教師13.86

- **Velocity:** ▮ steady
- **Source:** machinelearning.apple.com · 75+ pts on HN · 30.6h ago (~21:30 UTC+8 Nov 11)
- **Tags:** `distillation` `ssm` `mamba`

Appleの研究ページ(TMLR、2026年11月;arXiv 2604.14191)は、Attention教師を**attentionブロックを一切含まないMamba生徒**へ変換する二段階レシピを公開している:まずkernel-trickの適応でTransformerを線形化Attentionバリアントへ蒸留し、次にそれを「principled initialization」付きでMambaへ蒸留する。1B規模(Pythia-1B教師、100億蒸留トークン)で生徒は困惑度**14.01**に達し、教師は**13.86**、利得は下流タスクへもほぼ移行する——ただし「some gaps appear on tasks relying more on in-context recall」。arXiv v2(11月3日)はレシピそのものと同等に重要だ:v2は「fixes an implementation error in v1 that affected the SSM decay gates」し、全実験をMamba-2で再実行した。

**Why it matters:** 朴素なTransformer→SSM蒸留はハイブリッドアーキテクチャなしでは失敗すると知られていた。教師の1.1%以内に収まる再現可能な二段階レシピは、Mambaの線形時間推論が要点そのものであるエッジ展開の換算を変える。v2の訂正は携帯すべき正直注記だ:v1の数値はdecay-gateバグを抱えたまま数か月流通した。

[`🔗 Apple ML: Attention to Mamba`](https://machinelearning.apple.com/research/attention-mamba-distillation) · [`🔗 arXiv:2604.14191`](https://arxiv.org/abs/2604.14191)

---

## 20. ExcalidrawZが再浮上:純SwiftUIネイティブMac/iOS版Excalidraw、ファイルはローカルに

- **Velocity:** ▮ steady
- **Source:** chocoford/ExcalidrawZ · 76+ pts on HN · 4.6h ago (~23:25 UTC+8)
- **Tags:** `excalidraw` `macos` `diagramming`

4日前のHN投稿がchocoford/ExcalidrawZ(1,718★、純SwiftUI、2022年12月作成)を再びフロントページへ押し上げた:macOS/iOS向けネイティブExcalidrawアプリで、お馴染みのキャンバスを保ちつつ図をブラウザのlocalStorageではなく**ローカルファイル**に保存する——エコシステム定番のマルチファイル同期とバージョニングの癖も回避済み。リポジトリ最終pushは10月24日なので、これはリリースイベントではなく再浮上として扱うべきだ。

**Why it matters:** Excalidrawのブラウザファーストなモデルは愛されているが、限界もある:図はタブの中に生きていて、ファイルツリーの中ではない。ネイティブラッパーはWebアプリとフル再実装の中間に位置し、HNスレッドが有用な成果物だ——図ツールがネイティブに感じられるために何をすべきか(file provider、ショートカット、iCloud同期)の実用リストで、フォーマットをforkせずに済む。

[`🔗 chocoford/ExcalidrawZ`](https://github.com/chocoford/ExcalidrawZ) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50468944)

## 21. 中国のフロントエンドモデル6個が、輸出規制対象のBlackwell GPUの初期化フィンガープリントを保持——公開重みそのものから復元

- **Velocity:** ▮▮▮ trending
- **Source:** unemploymentlabs.com · 212+ pts on HN · 6.1h ago (~05:55 UTC+8)
- **Tags:** `checkpoint-forensics` `export-controls` `deepseek`

Will DePue のフォレンジック報告(11月12日)は、モデル初期化時に焼き込まれたPRNGシードとスレッドレイアウトを復元し、どのGPUクラスが学習を開始したかを読み取る:**DeepSeek-V4-Flash と MiniMax-M3 は 148-SM の B200/B300 レイアウトに、DeepSeek-V4-Pro・Kimi K3・K3.1-Pro・アントグループ(Ant)の Ling-3.1-flash は 152-SM の GB200/GB300 レイアウトに一致**——同じ企業のそれ以前のモデルはすべて 132-SM の Hopper と読める。手法は物理チップで再現可能:DeepSeek のシード 953049583 を H100 で使うと V3 の保存値 57,344 個をビット単位で再現するが V4-Flash は再現せず、B300 では V4-Flash を再現(469 抽出行のうち 445 行が完全一致)。GB200 ではシード 20256586 で Kimi K3 の保存行 13 行を再現した。AMD MI300X の代替説明は V4-Flash について排除——両ベンダーの値が異なる 377 個のうち、公開重みは 363 回 NVIDIA に一致し、AMD には 0 回。この手法はハードウェアが公表されている 24 モデルすべてと合致し、最強の証拠は 49〜1,385 sigma に達する(偶然一致の基準線は約 8 sigma)。報告書自身の推定:最終学習1回につき Blackwell GPU 約 1,500〜3,500 枚、5 モデル合計で約 12,000 枚、WSJ の単価ベースで 5 億ドル超。

**Why it matters:** これは輸出規制の疑惑を裏付ける最初の技術的証拠——当局者の主張ではなく——しかも完全に公開重みから導かれている。報告書は天井も明示している:フィンガープリントが示すのは初期化ハードウェアであり、「Blackwell が学習も行ったという推論を支持するが証明はしない」、「法違反の認定ではない」。注目すべきは、Qwen・GLM・テンセント・小米・StepFun の最新モデルは依然としてすべて Hopper と読めること、そして一部のモデル(CPU 初期化の Qwen3、PaddlePaddle の ERNIE、ASIC 学習の美団 LongCat)は GPU フィンガープリントを一切残さないこと。

> "These flags describe the hardware class under the U.S. export rules of October 2022 and October 2023. They are not a finding that any law was broken."

[`🔗 Unemployment Labs: checkpoint forensics`](https://unemploymentlabs.com/checkpoint-forensics) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50474883)

---

## 22. PostgreSQL 52-CVE アップデートデーの裏側:研究者が22年物の複合型プリミティブを root RCE に変えた記録

- **Velocity:** ▮▮ rising
- **Source:** mehmetince.net · 155+ pts on HN · 9.7h ago (~02:25 UTC+8)
- **Tags:** `postgresql` `type-confusion` `exploit-research`

Mehmet Ince のシリーズ第3部(11月9日公開、11月12日に HN で再浮上)は、本日の項目10が扱った修正波の研究者自身の証言:`uuid` フィールドを持つ複合型を作り、それを返すクエリを `PREPARE` し、`ALTER TYPE ... ALTER ATTRIBUTE key TYPE bytea CASCADE` を実行してから `EXECUTE` すると——`record_out()` は保存済みの UUID バイトを `byteaout()` に渡し、接頭辞 `01 02` が展開オブジェクトポインタとして読まれる。偽装したヘッダと methods テーブルで、detoast 処理は間接呼び出しに化ける:`system(H)`。同じプリミティブが ASLR も破る——配列の要素型を `bigint[]` に変えると、`unnest()` はポインタを整数として返す(UUID 3個で 48 バイトの配列ヘッダを偽装)。可変行型の挙動はコミット `077db40fa1f3`(2004年5月5日)にまで遡り、エクスプロイトは 2015 年に追加された展開オブジェクトポインタに依存する。Ince は 21 バリアントを報告し、11月9日リリースの 52 CVE のうち 6 個がこの族だと指摘(**CVE-2026-6460** の包括修正、ほか CVE-2026-120142・-120148・-116329・-116306・-120139)、最小権限のログインロールで発火可能。包括修正の記録そのもの——**8.8**、NVD への公開は 11月12日、CNA は PostgreSQL 自身——は率直に言っている:「PostgreSQL の型混同により、オブジェクトの作成者はデータベースを実行している OS ユーザーとして任意のコードを実行できる」。マネージド Postgres 業界と非公開で調整し——「影響を受けていないベンダーはひとつも見なかった」——Databricks は即検証、Google は AlloyDB を P0 に昇格、AWS・Azure・Supabase には 8 月に動く PoC が渡った。修正コミットの Reported-by は PostgreSQL コア、OpenAI のセキュリティ研究チーム、Anthropic の Nicholas Carlini に及ぶ。

**Why it matters:** 火曜日リリースの抽象的な型混同 8.8 スコアが、ここでは具体的な最悪ケースになる——権限のない SQL ロールがマネージド Postgres のフリートで OS コード実行に達する。agent 支援の脆弱性研究の率直な記録でもある:Ince は Opus 製の「pg_expert」チューターに Datum の内部を学びながら、自分自身でバグを見つけた経緯を明かしている。

> "I gave PostgreSQL a value inside a composite type, changed the type of one of its fields, and asked it to read the value back. That type confusion led to one of the most reliable memory-corruption exploit I have seen."

[`🔗 Mehmet Ince: Part 3/6, CVE-2026-6460`](https://mehmetince.net/part-3-6-how-i-ended-up-turning-a-22-year-old-postgresql-type-confusion-primitive-into-rce-cve-2026-6460) · [`🔗 NVD: CVE-2026-6460`](https://nvd.nist.gov/vuln/detail/CVE-2026-6460) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50471761)

---

## 23. AI 生成アプリの洪水が Apple の審査パイプラインを壊し始めた——シンセ開発者が幻覚された理由でリジェクト

- **Velocity:** ▮▮ rising
- **Source:** synthanatomy.com · 128+ pts on HN · 6.9h ago (~05:05 UTC+8)
- **Tags:** `app-store` `apple` `industry`

Synth Anatomy は iOS 音楽アプリをめぐる両面の AI 失敗を記録している:現在は毎日推定 **10〜20 本の新 iOS 音楽アプリ**が vibe coding で登場し、一方 Apple の審査——ガイドラインは「提出の少なくとも 50% が 24 時間以内、90% が 48 時間以内」と謳う——は数週間に伸びている。Pittsburgh Modular の Microvolt 3901 は 10月27日に VST 版が出たのに iOS 版は 11月12日まで届かなかった。Unfiltered Audio の Michael Hetrick は自社の Sinusoidal Run Rhythm が **4 回リジェクトされた**と報告——「審査担当は 'Polyharmonic' が音響技術の一種だと幻覚し、その用語の使用許諾書を求めてきた」、次に「必要な専用ハードウェア」に接続した動画を要求し、さらに MIDI 版を音声版と類似したスパムと判定——1か月の往復の末、音声のみのリリースに。さらに開発者 Marek Dendes の CRUX Synth は「デザインスパム」、「アプリ生成テンプレートサービス」の産物として 4 連続リジェクトされ、異議申立ては 5 日経っても無回答:提出は「'審査待ち'から'審査中'へ、そして瞬時に'リジェクト'へ」切り替わるという。

**Why it matters:** App Review はプラットフォームの中核的な信頼製品——店にあるものはすべて検査済みという約束——だ。安価な生成がゲートを氾濫させ、自動審査は幻覚したリジェクト理由を生み、異議の道は袋小路に読める。これが続けば、コストはまさに審査制度が守るべき小規模開発者に落ちる。

> "Apple seems to be using AI for automated App Store reviews. SRR got rejected 4 times." — Michael Hetrick, Unfiltered Audio、Loopy Pro フォーラムより

[`🔗 Synth Anatomy: AI is turning Apple's app review into a nightmare`](https://synthanatomy.com/2026/11/ai-is-turning-apples-app-review-process-into-a-nightmare-for-developers.html) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50474311)

---

## 24. Edge0-145B を公開:145B パラメータ、ノート PC でピーク 29 GB・80+ tok/s デコードを主張

- **Velocity:** ▮▮ rising
- **Source:** edge0.ai · 116+ pts on HN · 5.0h ago (~07:05 UTC+8)
- **Tags:** `on-device-ai` `moe` `open-weights`

Edge0 チーム(リポジトリ **Edge0-AI/Edge0**、10.4k★)は Edge0-145B と Edge0-120B の重みと推論フレームワークを公開した。アーキテクチャは行列共有 MoE——64 エキスパートの各グループが 2 つの大きな行列を共有し、各エキスパートは小さな差分のみ保持するため、各ステップで計算するのは 145B のうち約 10B——さらに 3 層ローダー(ホットなエキスパートは GPU メモリ、約 40 GB のエキスパートライブラリはシステム RAM、約 48 GB の語彙データは SSD から必要時に読み込み)と CPU+GPU の協調スケジューリング。主張する数値:**ピークメモリ 29 GB、プリフィル 1,100+ tok/s、デコード 80+ tok/s、約 120 W**、128K〜256K コンテキストまで速度はほぼ一定、Apple Silicon と RTX 4090/5090 を初日からサポート。ベンチマークは Qwen3.8-Flash-Next(Terminal-Bench 2.1 で 86.52 対 83.3)や DeepSeek-V4-Flash-0731 を上回る——ただし投稿自身がこれらの比較は「Edge0 の内部評価による」と明記し、ベースラインのメモリ数値(例:Qwen3.8-Flash-Next の「約 70 GB」)は「測定が待たれる」推定値に星印が付く。同じ投稿は 9 月の Edge0-35B スマホ版(iPhone 18 Pro Max で 37+ tok/s)も振り返る。

**Why it matters:** メモリ数値が第三者の実行に耐えれば、「ノート PC 上のフロンティアエージェント」はマーケのキャッチコピーではなくなる——145B が 29 GB というのは、ラックの話ではなくワークステーションの話だ。誰かが独立にハーネスを走せるまで、比較の各行はベンダーの主張として扱うべき;HN の反応(113 pt かつ上昇中、懐疑色強い)が正しい事前分布だ。

[`🔗 Edge0 blog: Introducing Edge0-145B`](https://edge0.ai/blog/introducing-edge0-145b-frontier-ai-capabilities-on-your-own-computer) · [`🔗 Edge0-AI/Edge0`](https://github.com/Edge0-AI/Edge0) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50475713)

---

## 25. NetScaler の CVE 記録 9 件が一夜で到着——ADC/Gateway のメモリ破壊、修正は 14.1-73.57 と 13.1-64.39

- **Velocity:** ▮▮ rising
- **Source:** NVD records (CNA: Citrix) · published 00:20–03:17 UTC Nov 13 (~08:20–11:17 UTC+8)
- **Tags:** `citrix` `netscaler` `cve-wave`

Citrix の CNA は一夜で **NetScaler ADC/Gateway の 9 件の記録**を公開し、すべてがアドバイザリ **CTX697305** を指し、スコアはすべて CVSS 4.0:CVE-2026-107412 が **9.5**(複数のメモリオーバーフロー)、9.3 が 5 件——パケット処理、SMPP、DNS と DNS-over-HTTPS、NetScaler Push——さらに 8.7 が 3 件(RTSP ALG、SAML、WebAuth)。cveawg コンテナが修正ビルドを明示する:**14.1-73.57**(FIPS は 14.1-73.58)、**13.1-64.39**(FIPS/NDcPP は 13.1-37.293)、これ以上は影響なし。説明文は「メモリオーバーフロー……が……DoS を引き起こしうる」に留まり、執筆時点で 9 件すべて `Received` ステータス。Citrix のアドバイザリページは素の取得には JavaScript シェルとして描画されるため、この項目はアドバイザリ本文ではなく CVE 記録を読んでいる——記録こそ CNA 自身の記述だ。

**Why it matters:** NetScaler のメモリ破壊族にはエッジ機器のエクスプロイトチェーン化の前例がある(Citrix Bleed、2023)、そして ADC/Gateway はまさに管理インターフェースが事前認証偵察を受けやすい境界資産だ。「DoS」の文言に対する 8.7〜9.5 のスコアは「深刻度を決める前にアドバイザリを読め」という意味——だがエッジのパッチは今週、評価のいかんを問わず適用すべきだ。

[`🔗 NVD: CVE-2026-107408 (DNS/DoH memory corruption)`](https://nvd.nist.gov/vuln/detail/CVE-2026-107408) · [`🔗 Citrix advisory CTX697305`](https://support.citrix.com/support-home/kbsearch/article?articleNumber=CTX697305)

---

## 26. AgentRun がエージェントハーネス向けの自己改善型コントロールプレーンをオープンソース化——Pi、Claude Agents、Codex、OpenCode が ACP で接続

- **Velocity:** ▮ rising
- **Source:** Parcha-ai/agentrun · 86+ pts on HN (Show) · 9.8h ago (~02:15 UTC+8)
- **Tags:** `agent-infra` `self-improvement` `acp`

GREP.AI(YC F26)は AgentRun をオープンソース化した(Apache-2.0、npm `@parcha/agentrun`、640★):お気に入りのエージェントハーネスの上に「自己改善、永続実行、コントロールプレーン」を追加し、ACP 経由で任意のハーネスを接続(Pi、Claude Agents、Codex、OpenCode)。サンドボックス、計算機環境、数千のツール、そしてエージェントが何を保持したかを見せる Learning タブを備える——デモのコピーは「回答は 10 秒から 2 秒に、1 実行のコストは $0.05 から $0.0077 に」。ケーススタディが最も誠実な部分だ:コードレビューが 1 件 1 ドルになると請求は月 $180 から $6,451 に膨らみ、彼らは安いモデルを自社 PR でチューニングした独自レビュアーを作った——**レビュー 1 件 18 セント**、30 PR で「捕まえた本物のバグは Greptile の 1.6 倍」と主張;マーチャント分類は「仕事を学んだ後 7 倍安く」。Render へのワンクリックデプロイとホスト型コンソールもある。

**Why it matters:** 注目すべき賭けは、自己改善を記憶機能ではなく測定可能なコスト曲線として扱う点だ——30 PR のサンプルは自社データだが、この形(ハーネス非依存のコントロールプレーン + 複利で効く学習ループ)はエージェントインフラが収束しつつある方向であり、今朝のルーティングプロキシより一段上の層だ。

[`🔗 Parcha-ai/agentrun`](https://github.com/Parcha-ai/agentrun) · [`🔗 HN discussion (Show)`](https://news.ycombinator.com/item?id=50471650)

---

## 27. Lambda Web Functions は最後のリクエスト後も 5〜7 分メモリを課金し続ける——だからあるスタートアップは自社コンピュートを作った

- **Velocity:** ▮ rising
- **Source:** easel.sh · 71+ pts on HN · 11.1h ago (~00:55 UTC+8)
- **Tags:** `aws` `lambda` `cloud-costs`

Easel は AWS の 10 月ローンチされた Lambda Web Functions をベンチマークし、知っておくべき課金形状に当たった:**us-east-1 の 6 環境すべてで、最後のリクエスト後も実行環境が 313〜411 秒生き続けた**(10月26日のデータ)、しかも設定可能なアイドルタイムアウトはない——CPU はアクティブな間だけ課金されるが、メモリは環境の全寿命で課金される。200 ミリ秒のリクエストに 345 秒のアイドルが続くと「課金されるメモリ時間がリクエスト時間の約 1,700 倍」になり、メモリは実験の計算コストの約 88% を占めた。アイドル 10 秒後に環境を自終了させれば課金時間は約 20 分の 1 になるが、AWS は意図的な終了のすべてをランタイム障害として記録した。そこで Easel は実行を自社ホストに移し(11月2日稼働)、Lambda はオーバーフロー専用に——同じ Next.js 16 アプリで:**ウォームな中央値が 1.5〜3 倍速く、コールドスタートは約 3.5 倍速い**(アイドル 12 分後で 216〜250 ms 対 810〜854 ms)、一時停止環境の再開は 14 ms で、Web Functions は 908 ms かかった。投稿は自らの限界も明示:単一リージョン、小さなアプリ一つ、コールドスタートのペア試験は 2 回のみ。

**Why it matters:** サーバーレス経済学には静かな底値がある——バースト型の低トラフィックアプリは、1 ミリ秒の実 work あたり数分のメモリ秒を払い続け、Web Functions はその底値を可視化した。対応も示唆的だ:ホスティング スタートアップが下した結論は「多くのアプリで一台の温かいマシンを共有する方が、アプリごとの隔離環境に勝る」というもの——古い専用ホストモデルが、ミリ秒課金の世界で再浮上している。

[`🔗 easel.sh: Why we chose our own compute over Lambda Web Functions`](https://www.easel.sh/blog/lambda-web-functions-idle-memory) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50470445)

---

## 28. CPython を yk に適応させる:約 450 行でメタトレーシング JIT が 13 基準中 12 個で CPython を上回る

- **Velocity:** ▮ steady
- **Source:** tratt.net · 56+ pts on HN · 15.2h ago (~20:50 UTC+8 Nov 12)
- **Tags:** `cpython` `jit` `interpreters`

Laurie Tratt の yk は C インタプリタにメタトレーシング JIT を追加するツールキット(yklua は PUC Lua の 2 倍)だが、「大きなインタプリタで効くとどうやって知る?」という公正な疑問に答えたのが **ykcpython**——直接の作業 3〜4 日と yk 汎用修正 1.5 週間、変更は約 450 行。示唆的なのは道筋だ:CPython の tier-1 インタプリタの適応(200 行)は素のより*遅く*なった——quickening の特殊化↔非特殊化の遷移がトレースを絶えず捨てたため——そこで tier-2 の uop インタプリタに移行した(わずか 80 行)。30 行の幂等ロードヒント一つで Mandelbrot は 2.7 倍速くなった(11.67 秒 → 5.0 秒)。CPython 3.15.1 と実験的 JIT に対する最終数値:ykcpython は 13 の AWFY ベンチマーク中 12 で素のより速く(DeltaBlue のみ約 2.5% 遅い)、CPython 自身の JIT に対しては 13 中 8 で速い——Mandelbrot 4.20 秒 対 6.94 秒(JIT)対 11.66 秒;Richards 33.18 秒 対 40.56 秒 対 54.80 秒。限界も同じく率直だ:「実用には絶対に使えない」、そして「ベンチスイートの成績は飛び越えるべきハードルであって目的そのものではない」。

**Why it matters:** 使える JIT は書き直しではなく約 450 行のフォークとして主流インタプリタに追加できる、という第三の証拠だ——しかも CPython 自身の tier-2 uop 基盤に依存しており、実験的 JIT が敷いた土台が競合する JIT 設計にも利益を還元していることを意味する。再現可能な実験と生データも公開済み。

[`🔗 Laurie Tratt: Adapting CPython for yk`](https://tratt.net/laurie/blog/2026/adapting_cpython_for_yk.html) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50466410)

---

## 29. Dixell/Copeland XWEB EVO に一波 14 件の CVE 記録——スーパーマーケット冷凍サーバ上の認証前 root コマンドインジェクションとハードコードされたバックドア

- **Velocity:** ▮ steady
- **Source:** NVD records (CNA: VulnCheck) · published from Nov 12 20:18 UTC (~04:18 UTC+8 Nov 13)
- **Tags:** `iot-security` `backdoor` `cve-wave`

VulnCheck の CNA は 11月12日に記録 20 件を公開し、そのうち **14 件が XWEB EVO**——食品小売で広く使われる Dixell(Copeland)冷凍コントローラの Web サーバ——に関するもので、研究者は Valentin Lobstein。上位 3 件はすべて CVSS 3.1 **9.8**:**CVE-2026-124002**、login.lua・cleanout.lua・api.lua の*ユーザー名フィールド*経由の認証前 OS コマンドインジェクション(「パスワード確認の前に」発生)、setuid-root の `wlua` インタプリタと連鎖して root へ;**CVE-2026-124004**、ハードコードされたバックドアパスワードで完全な管理者アクセス;**CVE-2026-124010**、setuid-root CGI `xwconsole.cgi` 経由の root コマンドインジェクション。認証不要の任意ファイル書き込み(CVE-2026-124014、9.1)がクリティカル群を補う。アドバイザリの一文が対応を決める:「この製品ラインは 2026 年 3月にサービス終了日に達しました」——修正経路は存在せず、影響する導入(インジェクションは ≥ 5.2.3、< 5.7.0)は隔離か交換しない限り永久に残る。(VulnCheck 自身のページは同じ記録に CVSS 4.0 で 9.3 を表示し、NVD が提供するのは 9.8/3.1——同じ評価者、二つのフレームワーク。)

**Why it matters:** 露出した PLC/バックドアのパターンは通常カメラとルータを連想させるが、今回はスーパーマーケット冷凍の制御プレーンだ——インターネットから到達可能、認証情報は設計上推測可能、そして EOL。「未パッチ」は恒久的な種類で、対応はパッチのスケジューリングから今日のネットワーク隔離へと移る。

[`🔗 VulnCheck advisory: XWEB EVO pre-auth command injection`](https://www.vulncheck.com/advisories/dixell-copeland-xweb-evo-pre-authentication-os-command-injection-via-username) · [`🔗 NVD: CVE-2026-124002`](https://nvd.nist.gov/vuln/detail/CVE-2026-124002)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-13T04:29:26Z |
| Items | 29 |
| Sources tracked | 26 (Hacker News, GitHub Trending, NVD, cveawg, vendor advisories, vendor blogs, research pages) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[Previous day](2026-11-12.md) · [Raw .md](latest.md) · [Archive](../archive/index.md)
