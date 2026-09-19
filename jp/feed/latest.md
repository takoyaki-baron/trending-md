---
date: 2026-09-19
updated: 2026-09-19T20:16:00+08:00
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 31
license: CC-BY-4.0
---

## 1. 「I don't like passkeys」——今日最大の HN 論争、666 ポイント

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 666+ pts · コメント 642 · 約8時間前（~20:06 UTC+8）
- **Tags:** `passkeys` `auth` `security` `ux`

Ethan Hawksley 氏の投稿は、パスキーは「企業環境には完璧に適合するが、個人セキュリティには
不適合」だと論じる：アカウント復旧は依然として最弱の経路（SMS、メールリンク）に依存し、
ハードウェアキーは発見可能な認証情報が約 25〜100 個で上限に達しバックアップもできず、
同期型パスキーはすべてのサードパーティログインを Apple/Google アカウントに縛り付ける
ため、自動 BAN ですべて切断され得る。QR コード＋Bluetooth のハイブリッドフォールバックも
実務では信用できない。彼の代替案：サードパーティ製パスワードマネージャーのランダム
パスワード＋独立した TOTP アプリ。パスワード再利用者や企業ユーザーには実質的な改善だと
認めた上で、の主張。

**なぜ重要か：** 642 コメントの大半が同調者の生の痛みであること自体が、壊れているのは
暗号方式ではなくデプロイモデルだというシグナル。「復旧経路が最弱ならそこが勝つ」は
セキュリティ業界では既知の理屈だが、業界全体がデフォルトで出荷している標準に対して
これほど率直に言われることは少ない。

[`🔗 hawksley.dev`](https://hawksley.dev/blog/i-dont-like-passkeys) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49753211)

---

## 2. Dan Abramov 氏が Conway の精錬予想を「バイブ」で証明——Lean 検証済み、トークン約 4 万ドル分、人間による独立検証はまだ

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 155+ pts · コメント 150 · 約6時間前（~22:36 UTC+8）
- **Tags:** `lean` `formal-methods` `agents` `mathematics`

React コア開発者の同氏は、超現実整数（omnific integers）における Conway の精錬予想
（1976 年提起：任意の 2 つの因数分解は共通の精錬を持つ）を証明したと報告。Lean +
Mathlib で形式化されカーネル検証を通過し、L'Innocente–Mantova の 2024 年の帰着に基づく。
ワークフローは Codex のマルチエージェント「ラボ」（PM・数学・敵対・Lean の各役割に
「カフェテリア」中継役）で、Claude は形式化、ChatGPT は探索を担当：約 400 億トークン、
API 価格で約 4 万ドル、本人の丸 1 か月の余暇。完成間近の証明が 2 回全焼した——1 つは
循環論法、もう 1 つは未検証のエージェント生成「論文」約 30 本で築いたハウスオブカードズ。

**なぜ重要か：** 本人の留保もセットで運ぶべきだ：「私の証明は数学者による独立検証を
*受けていない*」、正しさは「Lean カーネルのバグに依存しない」前提付き。しかし本題は
手法のほう——アマチュアのプロジェクトマネージャーがエージェントを指揮して 50 年の
未解決問題でカーネル検証済みの結果に到達した。実際に働いたのは検証の規律（linter 監査、
ステートメント/証明のペアリング、Mathlib のみに依存するステートメントファイル）。

[`🔗 overreacted.io`](https://overreacted.io/how-i-vibed-a-proof-of-conways-conjecture/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49755024)

---

## 3. Linux カーネルの脆弱性 3 件が CISA KEV に同日登録——TLS、ebtables、AF_ALG

- **Velocity:** ▮▮▮ trending
- **Source:** CISA KEV · 9 月 18 日追加
- **Tags:** `cve` `linux` `kernel` `kev` `tls`

CISA は 9 月 18 日、カーネル CVE 3 件を既知悪用脆弱性カタログに追加した：
CVE-2025-39682（TLS 受信パスのゼロ長レコードが recvmsg() のレコード型処理をバイパス——
**CNA 付点 CVSS 9.8 に対し NVD Analyzed は 7.1** という珍しい公開の食い違い）、
CVE-2026-53266（ebtables SNAT の範囲外書き込み、ARP 送信元ハードウェアアドレス書き換え
で非線形 skb フラグメントに触れる——CNA 付点 8.8）、CVE-2025-39964（同一 AF_ALG
ソケットへの並列書き込みがソケット状態を破壊——CNA 7.8 / NVD 5.5）。いずれも以前から
修正済みの古い脆弱性で、新しいのは連邦レベルの悪用認定のほう。

**なぜ重要か：** カーネル内部のバグが KEV に入るのは異例で、攻撃者が実システムで
武器化する価値があると見ていたことを意味する——おそらく脆弱なカーネルのコンテナや
ネットワーク機器の内部だ。CNA 9.8 対 NVD 7.1 のスコア分裂は、「CVSS の数字には
付点者を記録する」という本フィードの規則が必要であることの生きた実例でもある。

[`🔗 CISA KEV カタログ`](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) · [`🔗 NVD レコード CVE-2025-39682`](https://nvd.nist.gov/vuln/detail/CVE-2025-39682)

---

## 4. Cactus Needle 3：9〜29 MB のオンデバイスモデルが DeepSeek-V4-Flash 級のツール呼び出しを主張——図のキャプションを読んでから

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News（Show HN）· 104+ pts · 約20時間前（~08:11 UTC+8）
- **Tags:** `on-device` `edge-ai` `function-calling` `quantization`

Cactus の Needle 3 はスマホ・ウェアラブル・MCU 向けの基盤モデルで、ツール呼び出し・
構造化抽出・埋め込みの 3 つだけを行い、チャットは明確にやらない。単一の重みセットが
2〜20 層のサブネットワークをカバー（29〜121M パラメータ、CQ2 2-bit、9〜29 MB）、
訓練データ 3600 億トークン。モバイルのツール呼び出しでは 10 倍の大きさのモデルに勝ち、
Pi 5 で 400〜4k tok/s のデコード。「DeepSeek V4 Flash に匹敵」という見出しは
*ファインチューン済みの 4 層サブネットワーク* によるもので、図のキャプションには
ベースラインは vLLM 上の f16、DeepSeek はクラウド API 経由、採点は強制呼び出し、と
明記されている。

**なぜ重要か：** 小型で決定的なツール呼び出しモデルはオンデバイススタックの実在する
空白であり、推論条件を正確に公開する姿勢は多くの同業より優れている。ただし見出しの
比較は量子化・ランタイム・アクセス経路を混ぜている——成立する主張は「ファインチュー
ンした 121M パラメータのモデルが強制ツール呼び出しで戦える」であって
「29 MB が DeepSeek に等しい」ではない。

[`🔗 cactuscompute.com/needle`](https://cactuscompute.com/needle) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49748553)

---

## 5. Cloudflare Quick Tunnels がエージェント向けに再登場——新しいのはトンネルではなく JSON

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 401+ pts · 約6時間前（~22:18 UTC+8）
- **Tags:** `cloudflare` `tunnels` `devtools` `agents`

HN の 401 ポイントは `cloudflared tunnel --url localhost:PORT` の話だが、
`trycloudflare.com` のクイックトンネル自体は何年も前から存在し、Cloudflare 自身の
ドキュメントも今なお「テストと開発専用」と明記している。実際に新しいのは、
`try.cloudflare.com` のページがこの機能をコーディングエージェント向けに再定義した点：
ホスト名・エッジ・ヘルスを **stdout への JSON** で出力（「ログの正規表現は不要」）、
webhook に直結できる一時的 URL、約 3 秒で公開の暗号化エンドポイント、アカウント不要・
ポート開放なし。

**なぜ重要か：** 議論の熱量はエージェントワークフローに集中している——webhook テスト用の
公開 HTTPS エンドポイントをエージェントに与えるのは繰り返し発生する面倒な工程で、
stdout-JSON はまさにエージェントが必要とするインターフェース。残しておきたい注意点：
使い捨てのランダム URL は攻撃者のデータ持ち出し経路としても好まれ、セキュリティチームは
とっくに `*.trycloudflare.com` へのトラフィックを監視対象にしている。

[`🔗 try.cloudflare.com`](https://try.cloudflare.com/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49754785)

---

## 6. Stably Orca：並列コーディングエージェントの艦隊のための 7.18 万スター「ADE」

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending（週間）· 今週 +5,305 スター（16 位）· 累計 71.8k
- **Tags:** `agents` `ade` `worktrees` `parallel-agents`

stablyai/orca は、複数の CLI コーディングエージェント（Claude Code、Codex、Cursor、
Copilot、Devin、Qwen Code など）を既存のサブスクリプションのまま同時オーケストレーション
するオープンソース（MIT）のエージェント開発環境。1 つのプロンプトを隔離された git
worktree の複数エージェントに扇状に展開し、最良の結果をマージ。iOS/Android のコンパニオン
アプリで艦隊を遠隔操作。UI 要素をクリックしてプロンプトに文脈を注入（Design Mode）。
Linear/GitHub のタスクや SSH から worktree を開ける。YC 出資、毎日リリース、Windows
ビルドは署名済み。

**なぜ重要か：** worktree 艦隊パターン（worktrunk、firstmate、ECC——いずれも直近 1 週間で
本フィードが取り上げた）に初めてコンシューマーグレードの IDE 型の参入者が現れ、
週 +5.3k スターは需要の実在を示す。未解決の問いは他の艦隊ツールと同じ：1 つのタスクに
5 エージェントが競走するとき、トークン代は誰が払うのか。

[`🔗 github.com/stablyai/orca`](https://github.com/stablyai/orca) · [`🔗 onorca.dev`](https://onorca.dev/)

---

## 7. obra/superpowers：スキル＋方法論フレームワークが 28.8 万スターを突破

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending（週間）· 今週 +3,821 スター · 累計 288.5k
- **Tags:** `agents` `skills` `tdd` `methodology`

Jesse Vincent 氏の superpowers は、組み合わせ可能なエージェントスキルから構築された、
主張の明確な開発方法論：エージェントはまずインタビューで仕様を引き出し、設計を塊ごとに
提示し、正確なファイルパス付きの 2〜5 分タスクの計画を書き、2 段階レビュー付きの
サブエージェント駆動開発を実行する——そしてテストの前に書かれたコードを削除する
必須の TDD。インストーラーは 13 以上のハーネス（Claude Code、Codex、Cursor、
Gemini CLI、Copilot CLI、Devin、Droid、Kimi Code、OpenCode…）に対応。MIT。オプションの
ロゴ 1 つだけのテレメトリは、オプトアウト方法が文書化されている。

**なぜ重要か：** 生の数字では 28.8 万スターの superpowers はエージェントエコシステム最大の
方法論レイヤーであり、その核心の賭け——ボトルネックはモデル品質ではなくプロセスの
規律だ——は、今週のハーネス設計研究が計測の側から到達したのと同じ結論である（第 14 条
参照）。2 段階レビュー＋「計画してから実行」のループは、このテーゼの具体的で模倣可能な
成果物だ。

[`🔗 github.com/obra/superpowers`](https://github.com/obra/superpowers) · [`🔗 GitHub Trending（週間）`](https://github.com/trending?since=weekly)

---

## 8. 米軍、AI の幻覚による情報報告で中国船の拿捕を準備していた

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 234+ pts · 約3時間前（~01:28 UTC+8）
- **Tags:** `ai-safety` `military` `hallucination` `intelligence`

CNN の報道（Reuters 発の情報に基づく）によると、ある中国船の貨物が核兵器計画に
関連するとした AI 支援の情報報告は完全に捏造だった——その捏造は十分に上層まで流通し、
米軍は虚偽が暴かれる前に船舶の臨検・拿捕を準備していた。この危機は米伊戦争期間中、
臨検の警戒レベルが最も高かった時に発生した。

**なぜ重要か：** これは「検証レイヤーなしで LLM をループに入れる」最も具体的な最悪案例
だ——チャットボットの誤答ではなく、国家レベルの未遂事件。企業の AI 導入論争が引用する
のは仮説シナリオだが、これはニュースになり、軍機が離陸していたと報じられ、そして
ドクトリンの問いを残す：AI 支援の情報が部隊を動かせるようになる前に、どの審査段階を
必須にすべきか。

[`🔗 CNN`](https://www.cnn.com/2026/09/18/politics/us-military-ai-false-intelligence-china-ship) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49757520)

---

## 9. Ledger Donjon：光子エミッション支援のレーザー故障注入が RP2350 のセキュアデバッグを再び開く

- **Velocity:** ▮ steady
- **Source:** Hacker News · 103+ pts · 約3.5時間前（~00:54 UTC+8）
- **Tags:** `hardware-security` `fault-injection` `rp2350` `trustzone`

Ledger Donjon は光子エミッション顕微法で RP2350（Pi Pico 2）のデバッグ有効化レジスタの
ダイ上の位置を*特定*し、980nm パルスレーザーを数マイクロメートル精度で誘導して
セキュアデバッグのビットを立てた——ヒューズレベルの恒久的デバッグ無効化を突破。さらに
常時利用可能な RP-AP 経由のレスキューリセットを組み合わせ、ファームウェアがロックする
前に OTP のチャレンジシークレットを読み出した。セキュアブート自体は破られていない。
前提条件：破壊的な開封、約 25 万ドルの実験装置、そして Raspberry Pi がハッキング
チャレンジでこの研究を公募していたこと（7 月 28 日開示）。

**なぜ重要か：** 孤立した保護機構（OTP ヒューズ、ロックレジスタ、実行時ロックダウン）は
組み合わせてもセキュリティにならない、という教科書的な実証——「セキュリティ分析は
執行経路全体をカバーしなければならない」。TrustZone 級 MCU を出荷するすべての企業にとって、
脅威モデルにはブラインド走査ではなくエミッションマップで特定のレジスタを*見つける*
実験室級の光攻撃が含まれる時代になった。

[`🔗 Ledger Donjon`](https://donjon.ledger.com/blog/rp2350-secure-debug-laser-fault-injection/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49757050)

---

## 10. Android 17 QPR1、Honeycomb 以来初めて新 API を AOSP にリリースしないバージョンに

- **Velocity:** ▮ steady
- **Source:** Hacker News · 89+ pts · 約1.5時間前（~03:03 UTC+8）
- **Tags:** `android` `aosp` `open-source` `google`

GrapheneOS が指摘したところによると、Android 17 QPR1 は新しい開発者 API を追加した
——公式の 37.1 API diff で確認できる——が、これらは Pixel OS イメージにのみ存在し、
Android Open Source Project（AOSP）にはリリースされなかった。15 年続いた規範が破られ
た（前回の類例は 2011 年の Honeycomb 3.x）。他の OEM は新 API をまったくターゲットに
ビルドできない。

**なぜ重要か：** AOSP の完全性はサードパーティ Android エコシステム全体の耐力壁だ
——GrapheneOS、LineageOS、すべての脱 Google フォークがここからビルドする。API が
Google 専用に降り始めれば、オープンビルドは自らのアプリがターゲットとするプラット
フォームから徐々にずれ、「Android はオープンソース」はバージョンレベルで嘘になる。
注視すべきは QPR2 でこれらが AOSP に反映されるか、ギャップが常態化するか。

[`🔗 GrapheneOS（Mastodon）`](https://grapheneos.social/@GrapheneOS/117282080803799576) · [`🔗 Android 37.1 API diff`](https://developer.android.com/sdk/api_diff/37.1/changes)

---

## 11. gods-eye-view：オープンソースの「偵察衛星シミュレータ」が週で 1.4 万スター増

- **Velocity:** ▮ steady
- **Source:** GitHub Trending（週間）· 今週 +14,460 スター（3 位）· 累計 37.7k
- **Tags:** `cesium` `gis` `osint` `visualization`

bilawalsidhu/gods-eye-view は、11,000 以上の便、軍用機、船舶、838 個の衛星カタログ、地震、
約 3,600 路の公共 CCTV、火災やロケット発射といったライブの公開データをフォトリアルな
3D 地球儀上に描画する——GLM センサーシェーダー（FLIR、NVG、CRT）、戦術 HUD、
OpenAI Realtime API による音声操作付き。コードは MIT（同梱データセットは各々の規約）、
大半のレイヤーはキーレス、音声セッションは 5 ドルでハードキャップ、README には顔認識を
しないという明確なライン。9 月 17 日もプッシュあり。ホスト版は maptheworld.ai で開発中。

**なぜ重要か：** 作者の YouTube シリーズ（500 万回以上再生）でバズり、8 月に trending
1 位を獲得——今週の +14.5k はスパイクではなく持続的な勢い。面白いのは実証された
ポジショニングだ：完全に公開データだけで作られたインテリジェンス風ツールであり、
「すべてのコードが検証可能」であることが負債ではなくセールスポイント——バズった
リポジトリにしては、README の倫理ガードレールが異例なほど具体的。

[`🔗 github.com/bilawalsidhu/gods-eye-view`](https://github.com/bilawalsidhu/gods-eye-view) · [`🔗 maptheworld.ai`](https://maptheworld.ai/)

---

## 12. C++26、自明な無限ループを定義済みに——40 年物のオプティマイザ罠を消去

- **Velocity:** ▮ steady
- **Source:** Hacker News · 102+ pts · コメント 134 · 約24時間前（9 月 18 日 ~04:52 UTC+8）
- **Tags:** `cpp` `c++26` `standards` `compilers`

Sandor Dargo 氏が C++26 の変更（P2809）を解説：自明な無限ループが well-defined に
なった。観測可能な副作用のないループは従来「いずれ終了するはず」と仮定され、
オプティマイザに丸ごと削除され得たが、今後はプログラマが書いた通りの意味になる。旧規則は
実際のファームウェアを静かに壊してきた：組込み向けに書かれた制御ループやウォッチドッグの
「アイドル」ループは、紙テープ時代のモデルから受け継いだ前進仮定のもとで GCC/Clang に
実際に（そして実際に）最適化で消されてきた。

**なぜ重要か：** 規格が組込みの現実に明示的に歩み寄った珍しい例であり、しかも今日最も
コメント率の高いスレッドの一つ——議論は「自明」の線引きが正しい場所にあるかで、
将来のサプライズはまさにそこに潜む。C++23 以前に留まる組込みチームは、依然として
volatile シンク書き込みの回避策が必要だ。

[`🔗 sandordargo.com`](https://www.sandordargo.com/blog/2026/09/16/cpp26-trivial-infinite-loops) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49746406)

---

## 13. Cloudflare、さらに 100TB の RAM を節約——今度は一貫性ハッシュの数学と 6 バイトの Rust 構造体で

- **Velocity:** ▮ steady
- **Source:** Cloudflare Blog · 約2時間前（~02:51 UTC+8）
- **Tags:** `rust` `consistent-hashing` `memory` `pingora`

先月の 1.1.1.1 DNS キャッシュに続き、Cloudflare の Pingora バックエンドルーターは
`pingora-ketama` の一貫性ハッシュリングに狙いを定めて 100+ TB を削減：チームが算出したのは、
誤差はノードあたりハッシュ数の平方根でしか減らない（誤差を 1 桁減らすには 10 倍の
ハッシュが要る——最後の 9 万個のハッシュが買ったのは 0.7% の改善だけ）、誤差を実質
増やさずにノードあたり約 90% のハッシュを削減、getter 付き `[u8; 6]` で 32 ビットの
リングエントリを 8 バイトから 6 バイトへ縮小（物議の `repr(packed)` を回避）、そして
教科書の数学が見落としていた大 N での誕生日パラドックス衝突項の発見。v2 リングは
宣伝されていない cargo feature として出荷。移行は新旧両リングを並行稼働させ、
キャッシュ無効化ストームを回避した。

**なぜ重要か：** 最良の種類のインフラ記事だ：数学は計測と照合され、移行の失敗モード
（キャッシュチャーン、オリジンへの急増、ロールバック）が一級の関心事として扱われ、
修正は社内に留められず `pingora-ketama` としてオープンソース化されている。

[`🔗 Cloudflare Blog`](https://blog.cloudflare.com/saving-100-tb-of-ram-with-math/) · [`🔗 以前の DNS キャッシュ記事`](https://blog.cloudflare.com/dns-cache-memory-optimization-1111/)

---

## 14. 更新：昨日取り上げたハーネス設計研究が arXiv に公開——HN もその重みを認める

- **Velocity:** ▮ steady
- **Source:** Hacker News · 193+ pts · 約7時間前（~21:06 UTC+8）
- **Tags:** `paper` `agents` `harness` `evaluation`

9 月 18 日の 176 実行ハーネスアブレーションの報道に続報：完全な論文が arXiv:2609.20804
（43 ページ、9 月 17 日提出）「An Empirical Study of Harness Design for Coding Agents」として
公開された——4 モデル × SWE-Bench Verified と Terminal-Bench 2.1 で、planning・行動空間・
コンテキスト管理を独立に変量。公開版の結論は以前の報道と一致：コンテキスト管理の価値は
予算が厳しくなるほど増大（主にオーバーフロー失敗の防止による）、LLM 要約の前に
ルールベースの省略を挟むのが効率で最良、planning は弱いモデルには精度の足場・強いモデルには
単なるコスト削減、bash を扱えるモデルは bash 専用の行動空間で十分はるかに安価。

**なぜ重要か：** エージェントエコシステム全体がバイブで論じている命題に、ついに計測
グレードの版ができた（第 2 条・第 7 条参照）。留保もセットで：1 つのハーネス、2 つの
ベンチマーク、4 モデル——著者らはこれを「モデル・予算アウェア」な指針と位置づけ、
法則ではない。補足：当初本フィードはこれを Zoom の社内アブレーションとして報じたが、
公開論文は所属を強調しておらず、176 実行という数字が同一研究であることを裏付ける。

[`🔗 arXiv:2609.20804`](https://arxiv.org/abs/2609.20804) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49753878)

## 15. Claude Code が AGENTS.md を読むように——エージェント設定フォーマット戦争は肩すかしで終幕

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 672+ pts · 約15時間前（~05:06 UTC+8）
- **Tags:** `agents` `claude-code` `interop` `config`

Claude Code v2.1.277（9 月 18 日）が、エコシステムの半分が待ち続けた相互運用の変更を
投入：`CLAUDE.md` が存在しない場合、ハーネスは `AGENTS.md` を読むようになった——
OpenAI Codex、Cursor、Zed などがすでに採用しているベンダー中立の規約だ。同一リリース
列車の v2.1.278（9 月 19 日）では、auto-mode の権限判断をサーバー側分類器に委ね、
Bedrock/Vertex/Foundry 上での課金オーバーヘッドはゼロ。リポジトリは 146.5k スター、
本日 +444。

**なぜ重要か：** これまでクロスハーネスのプロジェクトは、`CLAUDE.md` → `AGENTS.md`
のシンボリックリンクを張るか、漂移する 2 ファイルを保守するしかなかった。1 つの指示
ファイルがハーネスをまたいで通用するのは小さな変更で大きな効果——しかも機能そのもの
より方向性が重要だ。Anthropic は独自規約を押すのではなく、コミュニティのフォーマットを
採用した。

[`🔗 Claude Code 変更ログ`](https://code.claude.com/docs/en/changelog) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49760187) · [`🔗 v2.1.277 リリース`](https://github.com/anthropics/claude-code/releases/tag/v2.1.277)

---

## 16. 2023 年に「修復不能な脱出」で開発終了を宣言された vm2 が復活——しかも CVSS 10.0 のサンドボックス脱出を 2 件修正したばかり

- **Velocity:** ▮▮▮ trending
- **Source:** NVD / VulnCheck · レコード公開 9 月 18 日
- **Tags:** `vm2` `sandbox-escape` `cve` `nodejs`

NVD は 9 月 18 日、Node.js サンドボックス vm2 に対する CVSS 10.0 の勧告を 2 本公開した
——いずれも VulnCheck が CNA として採点、NVD のステータスは Deferred：CVE-2026-93603
（bridge `apply` トラップにおける nullish な `this` レシーバからホストの
`child_process` へ到達）と CVE-2026-93605（NodeVM の `DANGEROUS_BUILTINS` 拒否リストに
`child_process` が単純に入っていない）。修正は 3.12.1（npm 9 月 3 日）と 3.12.2
（9 月 8 日）で出荷——そしてリポジトリはアーカイブ解除、9 月 13 日にプッシュがあり、
メンテナーが 2023 年 8 月に「設計上の欠陥は修復不能」として開発終了を宣言したにも
かかわらず、再び活発に開発されている。

**なぜ重要か：** 読者は 2 種類いて、教訓も 2 つに分かれる。2023 年の勧告に従って vm2 を
撤去した人へ：戻ってきて、修正を出している。古いピン留めバージョンをまだ動かしている人
へ：過去の脱出はほぼすべて有効なままに、この 2 件が加わった。そしてバージョンに関係なく
成り立つ本質は、2023 年の評価が「vm2 のセキュリティ設計はバグではなく成立していない」
だったこと——vm2 の境界はベストエフォートの隔離と見なすべきで、セキュリティコントロール
では決してない。

[`🔗 GHSA-pq68-rvw4-xp4r`](https://github.com/patriksimek/vm2/security/advisories/GHSA-pq68-rvw4-xp4r) · [`🔗 VulnCheck 勧告`](https://www.vulncheck.com/advisories/vm2-nodevm-before-3.12.1-remote-code-execution-via-child-process)

---

## 17. Grant Sanderson 氏が Tao のブログにゲスト投稿：「動機づけられた説明のための Lean は永遠に存在しない」

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 142+ pts · 約5時間前（~15:06 UTC+8）
- **Tags:** `mathematics` `ai` `formal-methods` `exposition`

Terence Tao 氏のブログに Grant Sanderson 氏（3Blue1Brown）のゲスト投稿「If math is more
than proof, we need to better celebrate the rest of it」が載った：AI が証明生成を安価に
するにつれ、証明は数学が本当に価値するもの——理解・動機・説明——の代理指標であることが
露呈する。彼は説明のレイヤーに証明と同じインフラを与えることを提案する：「動機づけられた
説明」の形式化と報酬化、Timothy Chow 氏の「open exposition problems」、さらにテニュア
審査・ジャーナル、そして優れた未解決の説問を集める Hilbert リスト風カタログまで。

**なぜ重要か：** これは今週続いてきた論争の建設的な分岐だ——数学者の書簡（9 月 12 日）、
Gowers/Tao の不署名声明（9 月 18 日）、そして今朝 HN に届いた Dan Abramov 氏の
エージェント生成 Lean 証明（第 2 項）の後に出た。主張は「AI には我々の仕事ができない」
より鋭い：AI にできない部分は、そもそも制度的に認証されてこなかった——そしてそれは
修復可能な制度の空白だ、という主張だ。

[`🔗 terrytao.wordpress.com`](https://terrytao.wordpress.com/2026/09/18/if-math-is-more-than-proof-we-need-to-better-celebrate-the-rest-of-it/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49763928)

---

## 18. GPT-6 Astra が第一次大戦のドイツ軍無線暗号を解読——自己申告の「初」を、本人の留保ごと読む

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 147+ pts · 約5時間前（~15:06 UTC+8）
- **Tags:** `cipher` `ai-capability` `adfgvx` `history`

アマチュア暗号解読のブログ記事が、GPT-6 Astra が scienceblogs.de の「未解決暗号 50」
リストにある第一次大戦期ドイツ軍無線暗号を解いたと報告。筆者は ADFGVX 構成・鍵
`SWINDLER88` という仮説を立て、フロンティアモデルの 1 回の実行が完全なドイツ語平文を
返した（文字再現率約 90%、書き写し誤り 8 か所を修正）、既知の断片と rank-1 で一致。
本人の留保は明示されている：「この電文が以前に解読されたことは、私の知る限りない」
——歴史学者や暗号の専門家がこの転写を検証したわけではない。

**なぜ重要か：** 今月 2 件目となる「フロンティアモデルが歴史暗号を解いた」主張だ
（9 月 14 日の Fable 5.1 と Cyphral Distich）——ただし前例は独立検証が付き、今回は
付いていない。見るべきは見出しよりワークフローのほう：人間が構造仮説を出し、モデルが
探索をやる。有望な自己申告として読むべきで、解読された暗号として読むべきではない。

[`🔗 prinzai.com`](https://www.prinzai.com/p/gpt-6-astra-solves-a-wwi-german-radio) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49763987)

---

## 19. LightLLM CVE-2026-93839：PD 分離推論のノード登録が無認証——ユーザープロンプトが漏えいする。CVSS 9.8、修正版は未出

- **Velocity:** ▮▮ rising
- **Source:** NVD / VulnCheck · 9 月 18 日公開
- **Tags:** `llm-serving` `cve` `ai-infra` `authentication`

ModelTC の LightLLM——セルフホスト LLM 推理フレームワークの定番——は、prefill/decode
分離モードで使う WebSocket `/pd_register` エンドポイントを無認証で公開している。ネットワーク
到達可能な攻撃者は任意のノードをクラスタに登録でき、推論リクエストをハイジャックし、
ユーザープロンプトを読み取れる。CVSS 9.8（VulnCheck CNA、v4 では 9.3）、NVD レコードは
9 月 18 日公開で `api_http_pd.py` への行単位の参照付き。バグ報告は 9 月 16 日から
オープンのまま、執筆時点で修正を含むリリースは確認されていない。

**なぜ重要か：** prefill/decode 分離は大規模モデル推論のデフォルト構成になりつつあり、
これこそがその構成が持ち込む脆弱性クラスだ：クラスタの内部コントロールプレーンが
ネットワーク攻撃面になる。PD モードで LightLLM を動かしているなら、露出した
`/pd_register` は「プロンプト漏えい済み」と扱うべきで、修正版が届くまでの唯一の緩和は
ネットワークレベルの隔離だ。

[`🔗 GitHub issue #1576`](https://github.com/ModelTC/LightLLM/issues/1576) · [`🔗 NVD レコード CVE-2026-93839`](https://nvd.nist.gov/vuln/detail/CVE-2026-93839)

---

## 20. IEEE Spectrum が OpenAI の Jalapeño チップを解剖：LLM がフロントエンドを設計した——そして効かなかった場所も書いてある

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 136+ pts · 約12時間前（~08:11 UTC+8）
- **Tags:** `chips` `openai` `hardware` `llm`

IEEE Spectrum の深掘り記事（9 月 14 日公開、9 月 18 日に HN で再浮上）は OpenAI 初の
アクセラレータを取り上げる。物理設計パートナーは Broadcom：4-bit で 13.4 PFLOPS、
232 GB HBM4、NVIDIA GB300 比で最大 3.6 倍のエンドツーエンドレイテンシ低減を主張。
フロントエンドのフローは Google のオープンソース XLS 上に構築（C++/DSLX → Verilog）。
構想からテープアウトまで 20 か月弱、チーム平均は 100 人未満。DeepSeek の attention
カーネルはファブ後およそ 40 時間で理論ピークの 0.31% から 88.94% まで向上した。

**なぜ重要か：** Spectrum 自身の留保を持って運ぶべきだ：「実運用フリートの性能は未証明。
ベンチマークは OpenAI による提出値」。さらに専門家は、20 か月の日程が信じられたのは
Broadcom が物理設計を担ったからだと指摘する。記事自身が述べる誠実な結論はこちら：
LLM はフロントエンド（RTL とカーネル）の作業を大幅に圧縮したが、バックエンドの物理
設計にはあまり役立たず、エンジニアが終始「最終的な仲裁者」だった。

[`🔗 IEEE Spectrum`](https://spectrum.ieee.org/llms-for-chip-design) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49761432)

---

## 21. IBM Guardium：重大 CVE 12 件が NVD に一括公開——デシリアライゼーション RCE、SQLi、無認証サーブレット

- **Velocity:** ▮▮ rising
- **Source:** NVD / IBM · レコード公開 9 月 18 日
- **Tags:** `cve` `ibm` `database-security` `enterprise`

IBM の Guardium Data Protection 12.2 に向けた重大修正の一括が 9 月 18 日、NVD に公開
された——CVE-2026-80441、-80442、-81657、-82340、-82832、-82967、-84064、-84073、
-84075、-84078、-84082 に、Sterling File Gateway 9.1 の CVE-2026-75878 を加えた 12 本。
内訳：無認証デシリアライゼーション RCE（9.8）、IP アクセス制御の認証バイパス（9.8）、
無認証 SQL インジェクション（9.8）、ChangeTracker/LoadBalancer サーブレットの認証欠落
（9.9）、認証後の OS コマンドインジェクション（9.9）。すべて IBM が CNA として採点。
修正は Guardium 12.x の更新ストリームに含まれる。

**なぜ重要か：** Guardium はデータベース監査トラフィックの上に座っている——侵入されれば
企業内のほぼすべてのクエリが見える。だからこそ高価値標的であり、落ちればコンプライアンス
事件になる。12 件の一括公開は、少しずつの洩らしではなく計画的リリースを示唆する。
Guardium 管理者はバージョン棚卸しを急ぎ、インターネットや一般ユーザーから到達できる
コンソールをパッチまでの間「露出」と扱うべきだ。

[`🔗 IBM セキュリティ情報`](https://www.ibm.com/support/pages/node/7288040) · [`🔗 NVD レコード CVE-2026-80441`](https://nvd.nist.gov/vuln/detail/CVE-2026-80441)

---

## 22. xAI が Grok Voice Transcribe 2.0 をデフォルト STT に——ただし「精度 2 倍」の根拠はマーケティングページにしかない

- **Velocity:** ▮▮ rising
- **Source:** x.ai ドキュメント · 9 月 18 日
- **Tags:** `speech-to-text` `xai` `api` `voice`

xAI のドキュメントは現在、音声認識 API のデフォルトモデルとして
`grok-voice-transcribe-2.0` を掲げている：`POST /v1/stt` エンドポイントと WebSocket
ストリーミング、25 言語、単語レベルのタイムスタンプ、マルチチャンネル音声、話者分離。
ドキュメントには「すべての音声データはリアルタイムで処理され、保存も学習利用も
しない」と明記されており、医療・法務の文字起こし市場を狙ったゼロ保持のコミットメント
となっている。

**なぜ重要か：** API のデフォルトモデルが変わると、ピン留めしていない全顧客が一斉に
移行させられる。そして STT は本番環境で最もスループットの高い AI ワークロードの 1 つだ。
ここでは情報源の注意が効く：広く引用されている「精度は 1.0 の 2 倍で価格据え置き」は
xAI のマーケティングページ（非ブラウザの取得を拒否する）と二次報道にのみ現れ、ドキュメント
自体には精度の主張が一切ない。倍率は独立ベンチマークが出るまでマーケティングとして
扱うべきだ。

[`🔗 x.ai 音声ドキュメント`](https://docs.x.ai/docs/guides/voice) · [`🔗 x.ai モデル一覧`](https://docs.x.ai/docs/models)

---

## 23. Cache-to-Cache：KV-cache で語り合う LLM 同士が HN の一日を得る

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 95+ pts · 約17時間前（~03:06 UTC+8）
- **Tags:** `paper` `kv-cache` `multi-agent` `inference`

HN で話題になっているのは「Cache-to-Cache: Direct Semantic Communication Between
LLMs」（arXiv 2510.03215、2025 年の論文がフロントページに再浮上）：エージェント間の
メッセージをテキストとして生成・解析・再エンコードする代わりに、片方のモデルの
KV-cache をもう片方のキャッシュへ直接投影する——デコード/再エンコードの往復を丸ごと
省き、推論速度のまま意味の通信を行う。

**なぜ重要か：** 今日のマルチエージェントシステムはホップごとにトークン税を払って
いる——生成、シリアライズ、再 prefill。キャッシュレベルの通信はその税をアーキテクチャ
レベルで狙い撃つ。エージェントフリートの拡大とともに繰り返し再評価される理由がここに
ある。実務上の制約も明確だ：モデル間で語彙や幾何構造が共有ないし写像可能であることが
要る。現時点では同族（または共同学習）向けの技術で、ベンダー横断の橋ではない。

[`🔗 arXiv:2510.03215`](https://arxiv.org/abs/2510.03215) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49758615)

---

## 24. Stagehand：「Playwright を 2 倍高速化、トークン 80% 削減」——ベンダー数値、コードは公開

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 94+ pts · 約19時間前（~01:06 UTC+8）
- **Tags:** `browser-agents` `playwright` `testing` `tokens`

Browserbase の Stagehand——Playwright の上に AI API を重ねるブラウザエージェント SDK
——が「We made Playwright 2x faster and 80% more token efficient」という題で HN に
登場：モデルに与える DOM スナップショットとアクション痕跡を削り込んだもので、
ブラウザ自動化のレイテンシもトークンコストもまさにそこで食われている。

**なぜ重要か：** ブラウザエージェントは最もトークンを食うエージェント種別で、
DOM→プロンプトの削減こそ全員の実コストの置き場所だ。数値はベンダーの自己申告——
ベンチマークではなく方向として読むこと——だが、リポジトリはオープンソースで測定は
再現可能。この分野の「トークン削減」主張としては、それだけで上出来だ。

[`🔗 github.com/browserbase/stagehand`](https://github.com/browserbase/stagehand) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49756671)

---

## 25. 「科学はオープンソースソフトウェアである」——再現性の危機を依存関係管理の問題として捉え直す

- **Velocity:** ▮ steady
- **Source:** Hacker News · 104+ pts · 約9時間前（~11:06 UTC+8）
- **Tags:** `open-source` `research` `reproducibility` `essay`

Jakob Pedersen 氏は、研究論文は機能の上では「リポジトリ衛生が絶望的なオープンソース
プロジェクト」なのだから、オープンソースソフトウェアとして扱うべきだと論じる。論文の
「コードは依頼があれば提供します」の実態が、ラベルのないスクリプトと死んだリンクと
未記録の環境状態のパイプラインである顛末を追い、それをバージョン・テスト・メンテナー
を持つソフトウェアとして扱ったときに何が変わるかを示す。

**なぜ重要か：** この枠組みが効くのは道徳ではなく運用だからだ：ソフトウェアを生かし
続けるためにオープンソースが育てた実践（semver、CI、CODEOWNERS、依存のアーカイブ）
は、再現しない研究の失敗モードにそのまま対応する——そしてエージェント時代は賭け金を
上げた。文献で学習するモデルは文献の腐敗を受け継ぐ。

[`🔗 jepedersen.dk`](https://jepedersen.dk/blog/202505_research/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49762687)

---

## 26. JEPA-Anything：1 つの予測モデリング枠組みが 7 領域に通用すると主張

- **Velocity:** ▮ steady
- **Source:** arXiv · 2609.20800 · 9 月 17 日
- **Tags:** `paper` `jepa` `world-model` `self-supervised`

Ling Yang、Weiyang Liu、Zhenfei Yin らのグループが「orthogonal predictive
factorization」（OPF）を JEPA 型予測的世界モデリングの領域非依存な一般化として提案。
視覚、生物学、臨床時系列、制御、分子動力学、物理場、気象にわたって評価し、10 個すべての
ダイナミクスタスクで条件を揃えた JEPA ベースラインを上回り、Interventional Pong で
介入予測誤差 −34.8%、惑星データからケプラーの指数（−1.4991）を再現したと報告。コードは
Gen-Verse/JEPA-Anything で公開。

**なぜ重要か：** LeCun の JEPA プログラムは「ビジョン限定の願望」と批判されてきた。
7 領域評価は、その主張が必要とする種類の試験だ。結果は論文自身の枠組み通りに読むこと
——最強の領域特化手法ではなく*条件を揃えた* JEPA ベースラインとの比較であり、生物学の
介入結果も「実験的支持を得た」段階で、検証済みではない。

[`🔗 arXiv:2609.20800`](https://arxiv.org/abs/2609.20800) · [`🔗 github.com/Gen-Verse/JEPA-Anything`](https://github.com/Gen-Verse/JEPA-Anything)

---

## 27. RetireOPD：蒸留の教師が訓練途中で自らを解任——生徒が教師を追い越す

- **Velocity:** ▮ steady
- **Source:** arXiv · 2609.20784 · 9 月 17 日
- **Tags:** `paper` `distillation` `reinforcement-learning` `agents`

エージェント RL 向け「自己 on-policy 蒸留」に Adaptive Retirement ルールを付けた手法：
スキル特権を持つ教師は性能差が縮まり続けている間だけ生徒を監督し、生徒が教師成功率の
目標割合に達した時点で外される。Qwen2.5 バックボーン（1.5B〜7B）で、RL ベースライン比
ALFWorld +14.1〜18.8 pp、WebShop +11.8〜19.0 pp を報告——しかもテストしたすべての設定で
生徒が自身の教師を上回った。

**なぜ重要か：** 蒸留→RL パイプラインの永遠の難所は*いつ*模倣をやめるか：早すぎれば
生徒の上限を狭め、遅すぎれば教師の天井とバイアスを取り込む。引退をハイパーパラメータ
ではなく測定された判断にするのは、機構のきれいな小さいアイデアだ——ただしエビデンスは
Qwen2.5 のみ。法則ではなくレシピとして扱うこと。

[`🔗 arXiv:2609.20784`](https://arxiv.org/abs/2609.20784) · [`🔗 arXiv HTML`](https://arxiv.org/html/2609.20784)

---

## 28. Xing4.0-29B-A4B：中国電信が Ascend NPU だけで学習したコーディング MoE を公開

- **Velocity:** ▮ steady
- **Source:** Hugging Face Trending（#5）· 9 月 18 日更新
- **Tags:** `open-weights` `moe` `ascend` `coding`

XingChen-AGI（中国電信）が Xing4.0-29B-A4B をリリース：総パラメータ 29B / 有効 4B の
MoE（ルーティング専門家 64、MLA + MTP、256K コンテキスト）で、モデルカードは「この
規模のモデルとして初めて、Ascend NPU プラットフォーム上で MindSpore フレームワーク
のみを使って学習された」と主張。自己申告の数値は SWE-bench Verified 75.00
（Qwen3.6-35B-A3B の 76.00 に対し）、Terminal-Bench 2.1 が 57.50——AIME2026 と
IFBench では後れを取る。

**なぜ重要か：** 本丸は計算主権の物語のほうだ：国家運営の通信事業者が NVIDIA 依存ゼロで
競争力のあるコーディング重みを出すことは、どのベンチマークの 1 点より重要。カード自体に
limitations の節はなく、見出しの数値にはハーネスの脚注が付く——75.0 は、自己申告の
ハーネススコア全般に適用するうちのやり方で読むこと：再現が付くまでの上限値として。

[`🔗 huggingface.co/XingChen-AGI/Xing4.0-29B-A4B`](https://huggingface.co/XingChen-AGI/Xing4.0-29B-A4B) · [`🔗 XingChen-AGI on HF`](https://huggingface.co/XingChen-AGI)

---

## 29. Red Hat OpenShift コンソール CVE-2026-75885：devfile エンドポイント経由の無認証 SSRF

- **Velocity:** ▮ steady
- **Source:** NVD / Red Hat · 9 月 18 日公開
- **Tags:** `cve` `openshift` `ssrf` `kubernetes`

OpenShift コンソールの `/api/devfile/` と `/api/devfile/samples/` エンドポイントが
細工された devfile ペイロードを無認証で受け付け、コンソールの文脈から server-side
request forgery が可能になる——CVSS 9.3（Red Hat CNA、`secalert@redhat.com` が Primary）。
NVD レコードは 9 月 18 日公開。devfile はクラウドワークスペースを定義するテンプレートで
あり、そのインポート経路は SSRF の天然の支点になる：コンソールは特権ネットワーク位置から
攻撃者の影響を受けた URL を取りに行く。

**なぜ重要か：** OpenShift コンソールはメタデータサービス、内部レジストリ、Kubernetes
API 自体に到達できる場所に置かれている——そこでの SSRF は情報漏えいではなく足場化の
プリミティブだ。クラスタ管理者は Red Hat 勧告に従ってパッチを当て、devfile エンドポイント
がコンソール UI の外に露出していないか棚卸しすべきだ。

[`🔗 Red Hat CVE`](https://access.redhat.com/security/cve/CVE-2026-75885) · [`🔗 Bugzilla 2517885`](https://bugzilla.redhat.com/show_bug.cgi?id=2517885)

---

## 30. Gravity Forms CVE-2026-84434：無認証の任意ファイルアップロード（CVSS 9.8）——修正バージョンは未確認

- **Velocity:** ▮ steady
- **Source:** NVD / Wordfence · 9 月 19 日公開
- **Tags:** `cve` `wordpress` `file-upload` `rce`

WordPress サイトに広く入っているフォームプラグイン Gravity Forms の `upload_file`
ルーチンに無認証の任意ファイルアップロードが存在する（影響：≤3.1.0.4）——ファイル
タイプ検証の食い違いがアップロードを許し、リモートコード実行に至り得る。CVSS 9.8
（Wordfence が CNA として採点、同社の Argus スキャナが発見）。NVD レコードは 9 月 19 日
未明に公開された。

**なぜ重要か：** フォームプラグインは WordPress の古典的な初期侵入ベクトルだ——
どこにでもあり、設計上そもそも無認証で到達できる。弊誌の規則に従い正直な注を 1 つ：
執筆時点で、正確な修正済みバージョンをベンダーの変更ログから確認できなかった——特定の
番号を決め打ちせず、最新のリリースへ更新してバージョンを確認すること。

[`🔗 NVD レコード CVE-2026-84434`](https://nvd.nist.gov/vuln/detail/CVE-2026-84434) · [`🔗 Wordfence 脅威インテル`](https://www.wordfence.com/threat-intel/vulnerabilities/id/787e22a9-329b-4e71-bc2a-4f5524fc9356)

---

## 31. quiche 0.30.0：デフォルトで耐量子になった BoringSSL が ClientHello を分割し始めた——全 QUIC 実装者が気にすべき話

- **Velocity:** ▮ steady
- **Source:** GitHub release · 9 月 17 日
- **Tags:** `quic` `http3` `rust` `post-quantum`

Cloudflare の Rust 製 QUIC/HTTP-3 実装が v0.30.0 を出荷。変更履歴の分量以上に重い
破壊的変更が 2 つ：boring クレートの範囲が `>=4.19,<6` に動いた。BoringSSL 5 が
耐量子キーグループをデフォルトで有効化したためで、耐量子の ClientHello は 1 つの
Initial パケットに収まらず、最初のフライトが複数データグラムに分割され得る——これは
合併ハンドシェイクを前提とする QUIC 実装を壊す。`PathEvent` も `#[non_exhaustive]` と
なり `PmtuUpdated` 変体が追加された。

**なぜ重要か：** 耐量子ハンドシェイクへの移行は、暗号の問題である以上に*パケット化*の
問題としてやって来る——複数 Initial のハンドシェイク下でのミドルボックスとピアの挙動に、
静かな破壊は正確に潜む。Cloudflare が自社のオープンソース QUIC スタックで最初に直した
ことは、quiche ユーザーだけでなく他のすべての QUIC 実装への早期警報だ。

[`🔗 quiche`](https://github.com/cloudflare/quiche) · [`🔗 v0.30.0 リリースノート`](https://github.com/cloudflare/quiche/releases/tag/0.30.0)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-09-19T20:16:00+08:00 |
| Items | 31 |
| Sources tracked | 31 (Hacker News, GitHub Trending, arXiv, Hugging Face, NVD, CISA KEV, ベンダーブログ (Cloudflare, Cactus, Ledger), ベンダードキュメント (x.ai, Anthropic), IEEE Spectrum, IBM, Red Hat, Wordfence, VulnCheck, terrytao.wordpress.com, CNN, GrapheneOS, developer.android.com) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (毎日 3 回) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[Previous day](../archive/2026-09-18.md) · [Raw .md](./2026-09-19.md) · [Archive](../archive/index.md)
