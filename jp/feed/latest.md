---
date: 2026-11-13
updated: 2026-11-12T20:33:45Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 18
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

**Why it matters:** 小さなデバイスでLLMを動かす系の投稿の大半は見栄えの良いベンチマークを選ぶ。これは自らの失敗(密度9Bは0.27 tok/s)と正直な横断品質指標を公開しており、「bigger only helps on this box when the model is also better(このボックスでより大きいことが効くのは、モデル自体がより良いときだけ)」という発見こそ、世界が実際に所有する30ドルデバイス群における最先端だ。

> "Every claim is measured on the hardware itself." — smolmaxxing README

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

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-12T20:33:45Z |
| Items | 20 |
| Sources tracked | 18 (Hacker News, GitHub Trending, NVD, vendor advisories, vendor blogs, research pages) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[Previous day](2026-11-12.md) · [Raw .md](latest.md) · [Archive](../archive/index.md)
