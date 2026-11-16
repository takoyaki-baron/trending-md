---
date: 2026-11-17
updated: 2026-11-16T20:29:19Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 23
license: CC-BY-4.0
---

# trending.md — 2026-11-17

## 1. 米大手5行で同時障害——BofA、Chase、U.S. Bank、Wells Fargo、Zelle が一斉にダウン報告、Microsoft障害週間の余波が残る中

- **Velocity:** ▮▮▮ trending
- **Source:** apnews.com · 289+ pts on HN · 1.5h ago (~02:31 UTC+8)
- **Tags:** `outage` `banking` `zelle` `reliability`

月曜夜、米国の5つの大手金融機関でオンライン口座へのアクセス困難が相次いで報告された：**Bank of America、Chase、U.S. Bank、Wells Fargo、Zelle** が同時に Downdetector の障害ボードに登載された。Chase が最も早く性格付けを行い、広報は「a technical bug issue, not a cyber issue」（技術的バグの問題であり、サイバー攻撃ではない）と述べ、「Due to a technical issue, some transactions are taking longer than usual to complete but customers still have access to their accounts and funds.」（技術的問題のため、一部の取引の完了が通常より長くかかっているが、顧客は依然として口座と資金にアクセスできる）と説明した。AP の記事はこの瞬間を明示的に今週の文脈に置いた：金曜日に始まり Outlook・Teams・Copilot を数時間落とした Microsoft 障害に続くものだ。まだどの銀行も根本原因報告書を出していないが、決済レールの Zelle が報告されたサービスに含まれているのが最も影響範囲の広いディテールだ。

**Why it matters:** 4日の間に、異業種で2波のシステミック障害——読者が内面化すべきパターンはこれだ：集中度そのものが脆弱性であり、2026年のインシデントのテンポ（Microsoft、FAA の地上停止、そして今は銀行）は、レジリエンスエンジニアリングをニッチな関心事から調達判断へ変えつつある。各銀行の事後分析が同じベンダーを指名するか注視したい——5行が同時に落ちるのでなければ、それは驚くべき偶然だ。

[`🔗 AP News: Customers at major banks report difficulty accessing accounts online`](https://apnews.com/article/bank-outage-chase-wells-fargo-truist-50fee2693c22f597fa6ca51a97ef2cda) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50521045)

---

## 2. 「w2rt6byl5nf1opmc-a.com とは何か？」——デタラメなドメインが Majestic Million で github.com を上回り、答えは Majestic 自身の実験だった

- **Velocity:** ▮▮▮ trending
- **Source:** jack.cab · 297+ pts on HN · 6.2h ago (~21:51 UTC+8)
- **Tags:** `seo` `web-trust` `ranking-data` `investigation`

Jack Cabral の調査は虚栄心チェックから始まった：彼のサイトは siterate.org で #783,052 位——5つのベトナムのカジノスパムサイトの後ろ——だったが、そこで彼は **w2rt6byl5nf1opmc-a.com が第8位**にランクしているのに気づいた。googletagmanager.com、microsoft.com、github.com より上だ。しかもこのドメインはブラウザで全く解決しない。ランキングの基盤である Majestic Million を掘り下げると：約274,833の被リンク サブネット、約853,298の被リンク IP、**241,085,378の nofollow バックリンクに対してわずか6の follow リンク**（5,163,708の参照ドメインに分布）——一方 Ahrefs は53バックリンクしか示さず、証明書の初出は11月11日で、ほとんどのリンク*より後*だった。追更新で決着がついた：Majestic 自身の Steve Pitchford が返信——「Some internal experimentation. Choose a domain, make it esoteric, do some experiments. However, looks like we forgot to add a filter to avoid reporting it.」（内部実験です。ドメインを選び、風変わりにして、実験をしました。ただレポートに入らないフィルターを付け忘れたようです。）著者の教訓：本番環境でテストするな。

**Why it matters:** Majestic Million や Tranco のようなランキングデータセットは、セキュリティ調査、広告の詐欺検出、あらゆるドメイン人気ヒューリスティックを静かに支えている——そして一つのフィルター漏れした内部実験で、トップ10の座が数週間汚染され得る（Tranco は早くも10月5日に #38 と記録していた）。サードパーティの Web 信頼データを消費する者は皆、供給側の衛生状態を引き継ぐ。

[`🔗 jack.cab: What the fuck is w2rt6byl5nf1opmc-a.com?`](https://jack.cab/blog/siterate) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50517602)

---

## 3. FBI フラッシュ勧告：AI ペネトレーションテストプラットフォーム Artex が「3時間以内」にネットワーク侵入——ConnectWise、Barracuda、韓国銀行業が被害者

- **Velocity:** ▮▮▮ trending
- **Source:** techcrunch.com · 18+ pts on HN · 1.9h ago (~02:12 UTC+8)
- **Tags:** `artex` `fbi` `ai-offense` `pentesting` `storm-0940`

FBI のフラッシュ勧告（11月13日発行、Zack Whittaker が11月16日报道）は、**Artex**——Anthropic と OpenAI のホスト型フロンティアモデルを接続でき、オープンウェイトのモデルも使えるオープンソースの AI ペネトレーションテストプラットフォーム——を使った実攻撃を記録している。FBI によれば、Artex 駆動の侵入は標的特定から実際の侵害まで「in under three hours」——動きはうるさいが、人間の防御者の応答より速い。名指された被害者：**ConnectWise**、サプライチェーン攻撃で突破され、最低2,250社の顧客の Microsoft 365 環境が暴露（Microsoft は中国関連の **Storm-0940** と帰属）；**Barracuda**、11月11日、失効させていなかった露出したサードパーティ資格情報を突かれて侵入；そして複数の**韓国の金融機関**、脆弱な防御と MFA 未整備の背後で、最低68,000人分の個人情報が盗まれた。開発者は攻撃後にソースをクローズドにしたが、FBI は旧オープンソース版が依然「widely accessible」と指摘——さらに研究者たちは、パスワードなしの Artex サーバーが数百台インターネットに露出していたのを発見している（TechCrunch、11月6日）。

**Why it matters:** これは AI ツールが名指された侵入の攻撃チェーンに現れた、これまでで最も明確な帰属の一つだ——「モデル犯罪」の一般論ではなく、具体的なハーネス、具体的な速度指標、具体的な被害者。防御側の読み取りは心地よくない：それが突くボトルネックは応答レイテンシであり、それはまさにエージェント型防御ツールが解決すると謳っているものだ。

[`🔗 TechCrunch: FBI says Artex AI open-source hacking tool used to breach networks in "under three hours"`](https://techcrunch.com/2026/11/16/fbi-says-artex-ai-open-source-hacking-tool-used-to-breach-networks-in-under-three-hours) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50520796)

---

## 4. Kevin Buzzard が「Lean で検証済み」に4つのテストを立てた——OpenAI 定理ダンプ290件のうち約38件は論文の主定理すら述べていない

- **Velocity:** ▮▮ rising
- **Source:** xenaproject.wordpress.com · 252+ pts on HN · 8.4h ago (~15:38 UTC+8)
- **Tags:** `lean` `formal-verification` `ai-math` `proof-assistants`

Xena Project（Kevin Buzzard の帝国工科大学形式化グループ）が、AI 数学時代に最も有用なチェックリストを発表した：コンパイルは必要条件だが十分ではない、検証すべきは4つある。**ステートメントの忠実性**——Lean のステートメントは論文の定理と同じことを言っているか？Lean コード付きの OpenAI ダンプ定理290件のうち約38件は「have the property that the Lean code does not even state, let alone prove, the main theorem of the paper. And OpenAI never claimed that it did!」（その Lean コードは論文の主定理を述べてすらいない、証明は言うに及ばず。そして OpenAI はそれを主張したことはない！）；Buzzard がここで批判しているのは、「論文に付随するコード」を「証明済みの論文」に格上げする読者の方だ。**コンパイル**（Anthropic の1300万行 FLT 形式化には96コア・500 GB のマシンが必要；OpenAI の64万行 Navier–Stokes はラップトップでビルド可能）；**証明とステートメントの一致**（隠れたトリック対策——彼らの `lake comparator` が、信頼されるステートメントと信頼されない証明が標準公理の下で一致することを検査）；そして **kernel soundness バグ**（Lean の複数の独立カーネル——一つはアセンブリレベルまで形式検証済み——で緩和）。投稿はまた、ダンプから3本の論文が符号エラーで撤回されたことに触れ、運用上の警告で締める：信頼できない AI 生成 Lean コードは、サンドボックスなしでは決して実行するな。

**Why it matters:** 「Lean で検証済み」は AI 数学発表の信用通貨になりつつある——今週だけでも、機械検証された Signal プロトコル証明や Gödel ノートブックを本フィードは扱った——そして Buzzard のポイントは、そのフレーズが4つの異なる主張であり、その大半は現状どこも実行していない、ということだ。`lake comparator` のワークフローは、どんなチームも明日から採用できる部分だ。

[`🔗 Xena Project: …and the proof is checked in Lean`](https://xenaproject.wordpress.com/2026/11/12/and-the-proof-is-checked-in-lean/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50515058)

---

## 5. Jiff 1.0：BurntSushi の Rust 日時ライブラリが安定性を確約——uv、Cargo、AWS LLRT が既に使用中

- **Velocity:** ▮▮ rising
- **Source:** burntsushi.net · 188+ pts on HN · 3.2h ago (~00:53 UTC+8)
- **Tags:** `rust` `datetime` `timezones` `libraries`

Andrew Gallant（BurntSushi——ripgrep の作者）が彼の Rust 日時ライブラリ **Jiff 1.0** 安定版を発表し、確約は率直だ：「Unless some significant defect is found in Jiff's API, my plan is to commit to Jiff 1.0 indefinitely.」（Jiff の API に重大な欠陥が見つからない限り、Jiff 1.0 に無期限にコミットする計画だ。）設計はタイムゾーンを機能フラグではなくコア API の関心事にしている——DST の折り畳みと空白付近の曖昧な暦日時は、明示的な disambiguation 戦略で解決される（デフォルトの `compatible` に加え、`earlier`、`later`、そしてエラーを出す `unambiguous`）；型システムは階層化され（`civil::Date/Time/DateTime`、`Timestamp`、`ZonedDateTime`）、期間はデュアルモデル（カレンダー認識の `Span` と物理時間の `SignedDuration`）。採用リストが、なぜ今 1.0 なのかを説明する：Jiff は既に **uv、Cargo、Starship、fd、Nushell、Jujutsu、uutils/coreutils、AWS LLRT の Temporal 実装**に搭載されている。JavaScript の Temporal に強く影響を受けており、RFC 3339/9557/2822 をサポート、ICU4X ローカライズは feature の背後に。

**Why it matters:** Rust の標準ライブラリには依然日時型がなく、Jiff はこの空白をエコシステムのスケールで埋めた——採用リストは、実質的に開発者が毎日触るツールの世論調査だ。ripgrep で培った API 安定性の実績が、「無期限のコミット」という約束を、たいていの 1.0 より信頼できるものにしている。

[`🔗 burntsushi.net: Jiff 1.0`](https://burntsushi.net/jiff/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50519744)

---

## 6. 11月13日の Microsoft 365 障害報道の続き：Microsoft は7月のゲートウェイ更新で埋め込まれた欠陥を原因と説明——負荷テストは「コアの少ない弱いハードウェア」で回していた

- **Velocity:** ▮▮ rising
- **Source:** theregister.com · 70+ pts on HN · 6.8h ago (~21:18 UTC+8)
- **Tags:** `microsoft-365` `outage` `rca` `reliability`

11月12〜13日の Exchange Online 崩壊に関する Microsoft の暫定 RCA は、根本原因を**2026年7月に展開されたゲートウェイサーバー更新に潜んでいた欠陥**に遡る——本番環境で3か月間眠っていた。この欠陥は「lock contention inside an internal Windows process which caused the machine's resources (CPU & memory) to be exhausted」（内部 Windows プロセス内のロック競合がマシンのリソース CPU とメモリを枯渇させた）もの——しかも新しい多コアマシンでのみ顕在化した。これが負荷テストに見過ごされた理由だ：「Our load testing tended to focus on weaker hardware with fewer cores.」（我々の負荷テストは、コアの少ない弱いハードウェアに集中しがちだった。）2つの同時イベントが引き金を引いた：Teams のプライマリゲートウェイへのフェイルオーバー（11月12日 01:07 UTC）と、約14%のゲートウェイ容量のオフライン。カスケードは凄惨だった——トラフィックは健全なサーバーへ再ルーティングされ、そのサーバーも落ち、「at its lowest」の2時間以内に80%超のサーバーが無応答に。Exchange Online は「scale reasons」でゲートウェイ層からフェイルアウトできず、だからメールが最後まで戻らなかった（07:20 UTC に緩和適用、16:10 UTC に健全確認）。最終の事後報告は11月20日予定。

**Why it matters:** Microsoft のスケールで繰り返される古い教訓：一つの変更は、世界中に展開され、負荷テストを通過し、それから四半期眠って、正しいハードウェアとトラフィックの組み合わせが来て爆発することがある。レイテンシ敏感なサービスは最大のハードウェアでテストし、カスケードに予算を割け——この RCA から今日盗める処方箋はこの2つだ。

[`🔗 The Register: Microsoft blames monster email outage on software defect introduced in July fix`](https://www.theregister.com/saas/2026/11/16/microsoft-blames-monster-email-outage-on-software-defect-introduced-in-july-fix/5310026) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50517321)

---

## 7. VulnCheck が1日で75件の CVE レコードを着地——認証バイパスの波が npm 時代の CMS フレームワークを襲い、大半にはアップグレード先の修正版がない

- **Velocity:** ▮▮ rising
- **Source:** NVD (disclosure@vulncheck.com CNA) · 75 records published Nov 16 (~12:17–15:17 UTC)
- **Tags:** `cve` `auth-bypass` `npm` `vulncheck`

NVD の11月16日コホートには**VulnCheck の CNA からの75件の CVE レコード**が載っている——この日最大の単一ソースの波で、Samsung の39件、GitHub の30件を大きく上回る。ヘッドラインはセルフホスト Web フレームワークにおける認証バイパスのクラスタだ：**Tensei ≤ 0.11.5** は `JWT_SECRET` 未設定時にハードコードされた JWT 署名鍵 `auth-secret-key` にフォールバック（9.8）；**NodePress ≤ 8.5.1** は2つの独立した 9.8 認証バイパスを抱える；**Prime CMS ≤ 0.4.0-beta.0** は `isAuthenticated()` ガードがコメントアウトされ、`createAbility()` が全ロールを admin にハードコード（9.8）。その周囲に：Kalmia、REBUILD（4件）、DeepAudit（5件）、thirdweb Dashboard、Contentlayer の 8.8 コードインジェクション、さらに SeaweedFS、LimeSurvey、wallabag、GitBucket、PrestaShop、Sandboxie-Plus、Axigen。スコアはすべて VulnCheck 自身のもの（CVSS 3.1、`Secondary` 由来）。運用上の要点：そのうち数個は、影響上限*こそが*最新リリースだ——Prime CMS は2023年1月からコミットがなく、Tensei の最後のプッシュは2026年2月——アップグレードすべき修正版が存在しない。

**Why it matters:** この波は npm 時代のロングテールの国勢調査だ：プロダクショングレードに見えたフレームワークが休眠し、同じ調査機関に体系的に監査されている。スコアよりもレメディの言語が重要だ——上限が最新リリースであるとき、「アップグレード」は空アドバイスで、誠実な緩和は廃止か fork だ。

[`🔗 VulnCheck advisory: Tensei auth bypass via hard-coded JWT secret`](https://www.vulncheck.com/advisories/tensei-through-0.11.5-authentication-bypass-via-hard-coded-jwt-secret-in-tensei-auth) · [`🔗 CVE-2026-129552 record`](https://www.cve.org/CVERecord?id=CVE-2026-129552)

---

## 8. ダッソー 3DEXPERIENCE に 10.0：Station Launcher App の逆シリアル化で事前認証 RCE、脇には9.9のコマンドインジェクションが2件

- **Velocity:** ▮▮ rising
- **Source:** CVE-2026-93664 (3DS CNA-assigned) · record published Nov 16 (~13:17 UTC)
- **Tags:** `cve` `3ds` `deserialization` `rce`

Dassault Systèmes 自身の CNA が11月16日に CVSS **10.0** を発行した：**CVE-2026-93664**、3DEXPERIENCE プラットフォームの **Station Launcher App**（リリース R2023x〜R2026x）における信頼されていないデータの逆シリアル化の欠陥で、「could lead to an unauthenticated remote code execution」（認証なしリモートコード実行につながり得る）。同じ波に2つの兄弟が乗った——**CVE-2026-77033** と **CVE-2026-19732**、同じコンポーネント内の OS コマンドインジェクションで、各9.9。アドバイザリページには修正リリースの記載がない；レメディはダッソーのサポートナレッジベース（文書 QA00000522688）にあり、カスタマーポータルの内側だ。NVD では3件すべてがまだ `Received` で、スコアはすべてベンダー CNA 自身のもの。

**Why it matters:** 3DEXPERIENCE は航空宇宙と製造業の PLM/CAD インフラだ——まさに「10.0の事前認証 RCE が、準エアギャップに近いネットワークと遅いパッチサイクルの中に着地する」クラスの展開だ。公開修正版がないこの形は、先週このフィードが Cyrus SASL で指摘したのと同じ形だ：アドバイザリがサポートポータルへ誘導してくるときは、修正はバージョンアップではなくサーバー側モジュールのインストールだと想定すべきだ。

[`🔗 3DS security advisory: CVE-2026-93664`](https://www.3ds.com/trust-center/security/security-advisories/cve-2026-93664) · [`🔗 CVE-2026-93664 record`](https://www.cve.org/CVERecord?id=CVE-2026-93664)

---

## 9. MuJoCo 初の 4.x：speculative contacts と弾塑性が着地——その後 4.0.1 が 4.0.0 自身が持ち込んだソルバーバグを修正

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · +1,922★ this week · 18.2k total · v4.0.0 Nov 6, v4.0.1 Nov 11
- **Tags:** `mujoco` `physics-simulation` `robotics` `reinforcement-learning`

Google DeepMind の物理シミュレータが、長年で初のメジャーバージョン変更を果たした：**MuJoCo 4.0.0**（11月6日）は **speculative contacts**（高速で動く凸ジオムが1タイムステップ内で薄い障害物を貫通しなくなる）、**elasto-plasticity**（`mjData.plastic` に状態を持つ塑性変形、連続体 flex には von Mises J₂ リターンマッピング）、Python パッケージ分割（`mujoco-core` / `mujoco-studio` / `mujoco`）、そして flex モデルで1.4〜3倍高速化された疎 Newton ソルブを追加。**4.0.1**（11月11日）はその後、4.0.0 が持ち込んだ疎 Cholesky 分解バグを修正——supernode の誤統合により Newton ソルバが不正な Hessian 因子を受け取り、収束の遅れと発散を招いていた（#3767）——さらにプラットフォーム非依存の `mujoco-studio-wasm` wheel で MuJoCo Studio web viewer を Windows に届けた。週間ボードはリリース効果を映す：今週 +1,922★。

**Why it matters:** MuJoCo はロボット学習研究のかなりの割合にとってデフォルトの物理バックエンドで、このうち2つの変更——貫通防止接触と塑性——は「シミュレート可能」の境界そのものを広げる（変形可能体、高速マニピュレータ）。そして 4.0.1 の物語は正直なもう半分だ：フラッグシップシミュレーションリリースにおける数値ソルバの退行は、まさにベンチマーク数字が隠す種類のバグだ。

[`🔗 MuJoCo 4.0.0 release notes`](https://github.com/google-deepmind/mujoco/releases/tag/4.0.0) · [`🔗 MuJoCo 4.0.1 release notes`](https://github.com/google-deepmind/mujoco/releases/tag/4.0.1)

---

## 10. Coral：エージェントが自らの TypeScript ツールを書く——Rust ゲートウェイが V8 isolate で実行し、34タスクでトークン37%削減

- **Velocity:** ▮▮ rising
- **Source:** Show HN · 50+ pts · 5.8h ago (~22:14 UTC+8) · withcoral/coral at 5.0k★
- **Tags:** `mcp` `agent-infrastructure` `tooling` `rust`

本日の Show HN：**Coral** はセルフホスト・Apache-2.0 のゲートウェイ（「execution rails for agents」）で、エージェントはツールを呼ぶだけではない——複数のツール呼び出しを連鎖させる短い **TypeScript プログラム**を書き、そのプログラムは真新しい **V8 isolate** で実行される：ネットワークアクセスなし、資格情報なし、import なし。すべての基盤ツール呼び出しは、資格情報が接続される前にワークスペースポリシーゲート（Allow / Ask / Block）を通る；実行は必要時に人間の承認で一時停止し、開始者（人またはエージェント）に帰属する。成功したプログラムは再利用可能なカスタムツールとして `coral.private` または `coral.shared` に保存され、どんな MCP クライアントからも呼び出せる（`claude mcp add --transport http coral <url>`）。README 自身のベンチマーク：GitHub/Linear/Slack の34タスクで、カスタムツールは**トークン37%、コスト31%、時間29%を削減**、「Opus 5.5 accuracy at Haiku 5.5 cost」を謳う。Enterprise Edition ディレクトリ（SSO/SCIM、RBAC、監査ログ）は別ライセンスで「coming soon」。

**Why it matters:** ツールの氾濫は MCP エコシステムのスケーリング税になりつつある——何百もの狭いツールのほとんどは、任意のタスクにとって無関係だ。エージェントにポリシーゲートの下でプリミティブから自前のツールを*コンパイル*させるのは、この問題への最も具体的な答えであり、isolate ベースのサンドボックスはそれにふさわしい信頼境界だ。

[`🔗 withcoral/coral`](https://github.com/withcoral/coral) · [`🔗 Show HN 議論`](https://news.ycombinator.com/item?id=50517803)

---

## 11. ffmpeg-skill が新リリースに乗ってトレンドに：42のローカル動画ツールと自己検証 MCP コントラクト——npm 3.10.1 は昨夜リリース

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · +475★ today · 6.5k total · npm 3.10.1 published 2026-11-15 23:39Z
- **Tags:** `ffmpeg` `mcp` `video-editing` `agent-skills`

**kajisho5/ffmpeg-skill**（「Give your coding agent a video editor」）は **npm 3.10.1** 公開の翌日に +475★ を跳ね上げた——release と registry の両軸が一致し、このスパイクは解釈可能だ。ツールキットは42の Python 標準ライブラリスクリプトでローカル FFmpeg をラップする（カット、結合、無音除去、字幕/カラオケ、ラウドネス、HDR→SDR、プラットフォーム書き出し）、各スクリプトに `--dry-run` と `--json`、クラウドなし、API キーなし。面白いのは契約だ：MCP サーバーは各ツールの schema をスクリプト自身の argparse パーサーから導出する——プロジェクトはこのパターンを **SPEC（Self-Producing Execution Contract）** と呼ぶ——契約とコードがドリフトしたら CI が落とす。全ツールに `mutates_input: false` をマークし、ハッシュテストで強制；ワークフローは probe → edit → check → verify、エージェント側のコンタクトシート視覚検査込み。README の報告数値：10ファイルの実映像コーパスで 92/92 検証ステップ、40/40 の同期オフセットが10 ms 以内、シーン検出 F1 0.97——そして「verification-driven coding」に関するポジションペーパーが、プロジェクト自身のその規律への適合を*部分的*と採点している。

**Why it matters:** 動画はコーディングエージェントが最も苦手なメディア型で、この repo の賭けは：規律（契約、dry-run、検証）がモデルの知性に勝つ、というものだ。自らの規律に100%適合していないと公表する skill は、100%を謳う skill より希少だ。

[`🔗 kajisho5/ffmpeg-skill`](https://github.com/kajisho5/ffmpeg-skill) · [`🔗 npm: ffmpeg-skill`](https://www.npmjs.com/package/ffmpeg-skill)

---

## 12. HeyGen が Decision 1 を発表：デシジョンモデルのカテゴリが動画 AI に到達——1リクエスト400の名前付き質問、確率付きの型付き回答

- **Velocity:** ▮▮ rising
- **Source:** developers.heygen.com · release trackers date it Nov 13 · surfaced on OpenRouter
- **Tags:** `decision-models` `heygen` `api` `classification`

アバタービデオの HeyGen が、**Decision 1** をドキュメント化した——「turns text, images, and video into decisions your application can use」（テキスト・画像・動画をアプリが使える決定に変える）API だ。呼び出し側は `state`（テキストまたは JSON）に1〜400の名前付き質問を POST する。質問は3型：`noul`（はい/いいえ判定、真の確率を返す）、`choice`（1〜255の名前付きオプションから選択、オプション別確率の合計は1）、`score`（1〜10の順序付きレベルで、確率重み付きの小数スコア）。ベースのコンテキストは128k、1リクエストにつき画像4枚・動画1本まで；**Turbo** 変種は256k、画像100枚・動画10本に拡張。応答は同期で `output_tokens` は常に0、ドキュメントには珍しく率直な注意書きがある：confidence は「**not a calibrated probability that the answer is correct**」（回答が正しいことのキャリブレーションされた確率ではない）。Perplexity の Decider と Google の Decisions API（11月10〜12日）以来このフィードが追いかけてきたカテゴリの、最新の参入者だ：モデルのプロダクト*が*決定そのものであり、散文ではない。

**Why it matters:** アバタービデオベンダーでさえチャットモデルではなくデシジョンモデルを出荷するとき、このカテゴリは研究の珍品からデフォルトの製品形態へ越えた——ルーティング、ランキング、人のレビューへのエスカレーション閾値が、それ自体推論ワークロードになりつつある。「confidence は未キャリブレーション」の注意書きは、すべてのインテグレータが自社ドキュメントに引用すべき部分だ。

[`🔗 HeyGen docs: HeyGen Decision`](https://developers.heygen.com/docs/models/heygen-decision) · [`🔗 OpenRouter: heygen-decision-1`](https://openrouter.ai/heygen/heygen-decision-1)

---

## 13. Google Research が paper-orchestra を公開：5つのエージェントがアイデアと実験ログを投稿可能な LaTeX に——「not an officially supported Google product」

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · +306★ today · 1.3k total · 8 commits · arXiv preprint
- **Tags:** `paper-writing` `multi-agent` `google-research` `llm`

**google-research/paper-orchestra**（Yiwen Song、Yale Song、Tomas Pfister、Jinsung Yoon）は、「unconstrained pre-writing materials (ideas and experimental logs)」（制約のない執筆前素材：アイデアと実験ログ）を投稿可能な LaTeX 論文に変換するマルチエージェントパイプラインだ。5つの専門エージェントが分業する——**Outline、Literature Review**（関連研究を検索・優先順位付け・統合）、**Section Writing、Content Refinement、Plotting**（コードから図を生成、概念図も）——対象テンプレートは同梱の CVPR 2025 のような会議形式で、自動評価のための `autoraters/` ディレクトリが付く。README は境界に率直だ：「**This is not an officially supported Google product**」、評価データセットはリポジトリに含まれず別途公開予定、Semantic Scholar/OpenAI/Vertex のキーは自己手配。引用は arXiv:2604.05018 を指す。

**Why it matters:** 自動化された論文*執筆*は、エージェントの波と出版インセンティブが衝突する場所だ。この repo が珍しいのは、地味な部分（文献トリアージ、図表生成、テンプレート適合）をデモではなく検査可能なパイプラインとして出荷している点だ。著者自身の「公式サポート対象外」ラベルは、その産物を読むときに輸入すべき慎重さの適量だ。

[`🔗 google-research/paper-orchestra`](https://github.com/google-research/paper-orchestra) · [`🔗 arXiv:2604.05018`](https://arxiv.org/abs/2604.05018)

---

## 14. 11月15日の地上停止原因報道の続き：FAA の新 AI ツール SMART に疑問が集まる——停止の数日前に全センターへ展開、当局は関連を否定

- **Velocity:** ▮ steady
- **Source:** faa.gov Q&A (dated Nov 15) · AP via ABC News · updated Nov 16
- **Tags:** `faa` `ai-in-safety-critical` `ground-stop` `policy`

11月13日の全国地上停止に関する FAA の Q&A には、いま4つ目の問いに答える必要がある：停止の数日前、FAA は新ツール **SMART** をすべての航空路交通管制センターに展開したばかりだった——9月にワシントン DC 周辺で初お披露目されていた。SMART——Strategic Management of Airspace, Routes and Trajectories——は9月、ショーン・ダフィー長官と FAA 局長 Bryan Bedford が「a cutting-edge tool that centralizes 200 data streams — including weather patterns, flight paths, traffic flow, and controller staffing metrics — into one platform」（200のデータストリーム——気象、飛行経路、流量、管制員の人員指標を含む——を一つのプラットフォームに集約する最先端ツール）として発表し、AI サポートのエンジンはそれをトラフィックの「comprehensive visualization」に統合する。これは人間への推薦を行うものであり、AP によれば「is not — at least not yet — set up for AI to be in charge of flight control」（少なくとも現時点では、AI に飛行管制を任せる設定にはなっていない）。関係各所はいずれも関連を否定：FAA の Q&A は停止を「out of an abundance of caution」（高度な注意の念から）としたとし、ベンダーの **Air Space Intelligence** は事故は「the SMART system, any product of ASI or our integration with FAA and ATC」によるものではないと述べた。確認された原因は、従来報道のルーター作業——銅から光への転換工事が ATC システムにフラッドしたもの——のままだ。

**Why it matters:** タイミングの問いは自ずと書けるが、より実質的な点は静かだ：AI の意思決定サポート層が、安全クリティカルなインフラの最初のシステミック障害の数日前に全量展開され、業界の本能は「それが関係したのか」をまず問うた。注視すべきはこの展開パターンだ——今日は「制御ではなく推薦」であり、その文の「not yet」は多くの仕事を背負っている。

[`🔗 FAA: Nationwide Ground Stop — Questions and Answers`](https://www.faa.gov/newsroom/nationwide-ground-stop-questions-and-answers) · [`🔗 AP (via ABC News): Questions around FAA's new SMART AI system`](https://abcnews.com/US/wireStory/questions-swirl-faas-new-smart-ai-system-officials-138170875)

---

## 15. 「ソフトウェアはシステムレベルで壊れ始めている」——Breck-McKye のエッセイが2026年の障害カスケードに共通の形状を名指す

- **Velocity:** ▮ steady
- **Source:** breck-mckye.com · 137+ pts on HN · 1.8h ago (~02:17 UTC+8)
- **Tags:** `essay` `reliability` `ai-debt` `complexity`

Jimmy Breck-McKye のエッセイ（11月15日）は、今年の一連のインシデント——Microsoft 障害、FAA 地上停止、PHP2Shell、eMudhra 証明書侵害、Shai Hulud npm 攻撃——には単一の原因はないが単一の形状があると論じる：「a highly complex system made of low quality parts」（低品質部品でできた高度に複雑なシステム）、誰も全体を理解していない。AI はこのより長い腐敗において**原因であり同時に症状**でもある：クラウドと OSS への依存（チームは「stopped knowing the details」）、文化的な専門性の希薄化（ジェネラリスト化が left-pad や XZ のような初期警報を聞き逃させた）、そして——Kristen Maevyn の *The Decoherence Trap* を引いて——AI の本当の危険は幻覚コードではなく、「locally valid but mutually incompatible」（局所的には有効だが相互に非互換）な変更がシステムスケールで整合性を破壊することだ。終着点は「meat proxies」へのスキル退廃、そして全てのチケット・文書・要約それ自体が生成されるときの組織的認知の喪失。結びは冷たい：「The internet is at a breaking point」、そしてこれは「the new normal」だ。

**Why it matters:** これは本フィードが1か月間経験的に積み上げてきた障害報道の、エッセイ版だ——そして最も価値のある貢献は decoherence フレーミングだ：変更ごとの品質指標がグリーンでありながらシステムが壊れる理由を、これが説明する。論文が掲載された同じ日に5行が一緒に倒れた——偶然か、それとも裏付けか。

[`🔗 Breck-McKye: Software is breaking down at a systemic level`](https://www.breck-mckye.com/blog/2026/11/software-is-breaking-down-at-a-systemic-level/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50520866)

---

## 16. TRMNL Frame：31.5インチカラーエペーパーディスプレイが手作り木枠で——E Ink Spectra 6 にオープンソースのカラーエンジン、初回約470台

- **Velocity:** ▮ steady
- **Source:** trmnl.com · 116+ pts on HN · 3.7h ago (~00:23 UTC+8)
- **Tags:** `epaper` `hardware` `eink` `dashboard`

TRMNL の3製品目 **Frame** は、E Ink の **Spectra 6** プラットフォームを基盤とする31.5インチフルカラーエペーパーディスプレイで、木枠はジョージア州 Pine Mountain にある会社自前の木工工房で作られた。色彩品質の賭けはソフト側だ：**Lazarus** という新しい色変換エンジン——TRMNL はこれが「the best color matching on the market for any Spectra 6 display」（市場のあらゆる Spectra 6 ディスプレイの中で最良の色マッチング）をもたらすと主張し、そして**オープンソースになる予定**だ。新しい Clock Sync 機能はリフレッシュ動作を変え、1日の定められた瞬間に更新する（フリッカー減、バッテリー長寿命）；microSD ポートで完全オフライン動作に対応し、Local Art プラグインでユーザーが自分の作品を投稿し、販売することすらできる。予約は受付中：初回バッチは約 **470台**で米国・カナダ・メキシコ・オーストラリア限定、数台は2026年末までに、大半は2027年初頭に到着する。

**Why it matters:** 大型カラーエペーパーは何年も「展示会デモ」の域を出てこなかった；小さなハードウェア会社が自前の木工工房とオープンソースのカラーパイプラインの両方を賭けるこの垂直統合は、ユースケースを開くか、面白く失敗するかのどちらかだ。オープンソース化される Lazarus エンジンは、他の Spectra 6 ベンダーが初日から再利用できる部分だ。

[`🔗 TRMNL: Introducing Frame`](https://trmnl.com/blog/introducing-frame) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50519354)

---

## 17. 「Active Directory の時代はついに終わった」——Infisical のエッセイがマシンアイデンティティを論じる：AD は「短命のクラウドリソースを自動承認」し、セキュリティシアターになった

- **Velocity:** ▮ steady
- **Source:** infisical.com · 89+ pts on HN · 5.8h ago (~22:15 UTC+8)
- **Tags:** `identity` `active-directory` `secrets-management` `zero-trust`

Infisical のエッセイ（11月13日、11月16日更新）は、Active Directory が成功したのは3つの問いに一つの場所で答えたからだ、と論じる——どんなアイデンティティが存在し、何がそれを保証し、どこで有効か——そしてマシンが管理者が登録する物理サーバーではなくなったとき、それは壊れた。現代のインフラは短命だ（Kubernetes pod、CI ランナー、クラウドデータベース）、ドメイン参加の自動化は今やしばしば短命のクラウドリソースを自動承認する——すべてのテストデータベースや pod を AD にミラーする自動化を全部作ったとしても、それは依然「**security theater**」だ：統合ディレクトリは「would exist on paper, but lack authority」（紙の上には存在するが、権威を欠く）。証拠は日常レベルだ：ある防衛組織の公開露出した Lambda 関数、そのポリシーは `iam:*`；`.env` ファイルの平文資格情報；ディレクトリアイデンティティを拒む GitHub 自動化。結論：「**Active Directory is the new mainframe: great for its time, but you'd never choose to start from scratch.**」（Active Directory は新しいメインフレームだ：その時代には偉大だったが、ゼロから選ぶことは決してない。）2つの置換案——アイデンティティフェデレーション（プラットフォーム横断の OIDC attestation）とクレデンシャルブローカリング（Infisical 自身のモデル）——はどちらも単一ディレクトリなしで3つの答えを復元する。締めの論証は本フィードの読者にまっすぐ向く：AI エージェントは自らのアイデンティティとポリシーを必要とする、マシンアイデンティティはこれからずっと多くを背負う。

**Why it matters:** ほとんどのクラウド資産で、非人間アイデンティティはすでに人間を一桁上回り、エージェントワークフローはそれをさらに倍増させる。このエッセイはベンダー記述で、そう名乗ってもいるが、その診断は今月の Auth0 RAG や otterdog インシデントが機械的に示したものと一致する：破れる境界は、人間が一度も承認しなかった側だ。

[`🔗 Infisical: The Active Directory Era Is Finally Over`](https://infisical.com/blog/active-directory-machine-identity) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50517815)

---

## 18. jiangshan-map：手描きの中国2400年史インタラクティブ地図帳——198の領域スナップショット、MCP サーバー、正直なデータ出典の注記

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · +285★ today · 6.6k total · trending Repository of the Day badge (#2)
- **Tags:** `history` `maps` `visualization` `chinese-oss`

**DeanChensj/jiangshan-map**（江山時序、英名 Chronicles of the Realm）は依存ゼロの静的サイトで、**紀元前403年から現在まで**のタイムラインを自由にスクラブできる——18の歴史時代、198の領域スナップショット——「ghost boundary diffs」とともに国境の変遷を眺め、どの都市でもクリックすれば2400年の行政譜系が読め、秦の始皇帝、諸葛亮、玄奘らをイベントストーリーラインで追える。MCP サーバー（npm 依存ゼロ）、すぐ使える agent skill、`window.atlasAPI` ブラウザ API、Leaflet/MapLibre/QGIS 互換の GeoJSON 書き出しを同梱。データ出典の注記が殊のほか誠実だ：輪郭は aourednik/historical-basemaps を起点にその後**手描きで再描画**；郡レベルの境界は CHGIS V6 と Hartwell China Historical GIS に由来し、ライセンスは学術非商用に限られる；README は領域が「schematic approximations of broad jurisdictions, not surveyed borders」（広い管轄の模式近似であり、測量された国境ではない）と明確に警告している。

**Why it matters:** 歴史地図プロジェクトは通常、データライセンスの段階で死ぬ；このプロジェクトはどのレイヤーが自由でどれが制限付きかを明確に書き記した——これはどんなクローンも間違える部分だ。MCP サーバーと skill のパッケージングも、教育ビジュアライゼーションの行き先を示している：ブラウザだけでなく、エージェントが地図帳を操作できるように作られている。

[`🔗 DeanChensj/jiangshan-map`](https://github.com/DeanChensj/jiangshan-map) · [`🔗 ライブデモ`](https://deanchen.me/jiangshan-map/)

---

## 19. S2 が Spanner 上に独自のオーソリティティブ DNS サーバーを構築——Route53 が書き込みを毎秒約5件に絞り、攻撃者がそれに気づいたから

- **Velocity:** ▮ steady
- **Source:** s2.dev · 62+ pts on HN · 10.8h ago (~17:19 UTC+8)
- **Tags:** `dns` `infrastructure` `spanner` `postmortem-adjacent`

S2 のエンジニアリングポスト（Cristian Caciuc、11月16日）は、このストリーミング企業がマネージド DNS を自前のオーソリティティブサーバーに置き換えた理由を説明する：彼らの各「basin」にはサブドメインが割り当てられ、作成時に**即座に**解決されなければならないが、Route53 はレコード API をおよそ毎秒5 UPSERT に絞る——かつて攻撃者が数万の basin を作成し、割り当てを使い果たし、解消に数時間かかるバックログを残した（これが旧100-basin 上限の由来だ）。解法：**Go** と `miekg/dns` によるオーソリティティブ DNS サーバーで、**Google Cloud Spanner 上のライブ SELECT** から応答する——彼らがすでに運用している強一貫性の basin データベースだ、だからドリフトしうる同期システムは存在しない。NXDOMAIN 攻撃の経済性（全ての偽クエリが DB ルックアップになる）は前面の Cloudflare DNS Firewall が処理し、オリジンは Cloudflare IP に限定、SOA/NS 応答でのオリジン漏洩を防ぐ `ns-leak-test` 付き、2つの GKE リージョンに展開。数週間運用して安定——作者は最近のコミットが「mostly CVE fixes, dependency bumps and cost savings」だと付け加える。

**Why it matters:** 「It's always DNS」は通常、DNS は他人のものという意味だ；ここでの割当て悪用ループへの誠実なエンジニアリングの答えは、自ら DNS オペレーターになることだった。投稿はすべてのトレードに率直だ（Rust ではなく Go、キャッシュではなく Spanner の一貫性、濫用の盾としての Cloudflare）。ネームサーバーを運用しない人にとっても、良いアーキテクチャの読み物だ。

[`🔗 s2.dev: It's always DNS, so why are we running our own?`](https://s2.dev/blog/dns-server) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50515616)

---

## 20. 2007年の「ThinkPad 秘密の電源ボタンコード」が回帰：10回押して30秒長押し——サポート担当者自身の説明は「dude, you know as much as I do」

- **Velocity:** ▮ steady
- **Source:** masnick.com · 257+ pts on HN · 8.4h ago (~19:39 UTC+8)
- **Tags:** `retro` `hardware` `thinkpad` `folklore`

Mike Masnick の2007年の投稿がフロントページに戻ってきた：真っ新しい ThinkPad z61t がカンファレンス講演の前に完全に死に、IBM のサポート担当者が彼を儀式に案内した——AC を抜き、バッテリーを外し、**電源ボタンを1秒間隔で10回押し、それから30秒間押し続ける**、バッテリーを戻し、電源オン。マシンは瞬時に復活した。担当者の公式説明は「static discharge」（静電気放電）；問い詰められたときの正直な答えは：「dude, you know as much as I do… but your machine is working.」（兄弟、君は僕と同じくらい知ってるよ……でも君のマシンは動いてる。）コメント欄の成功報告は2008年から2015年に及び、z61t をはるかに超えて——T/X/R シリーズの ThinkPad に加え、Acer、IdeaPad、S10 ネットブックまで——異論者は1回の長押しで同じだと主張し、別の人々は RAM の打ち直しや CMOS 電池を信奉する。

**Why it matters:** これはもっともらしいメカニズム（残留電荷を排出し、スタックした電源状態のラッチを解く）を持つ民間療法であり、民間療法をまとったもっともらしいメカニズムであり、消えない18年分の現場データだ。古いハードウェアを生かし続ける誰にとっても——概ね本フィードの読者だ——この儀式は、ペーパークリップの隣の引き出しに入れておくに値する。

[`🔗 masnick.com: The Secret ThinkPad Powerbutton Code (2007)`](https://masnick.com/posts/the-secret-thinkpad-powerbutton-code-to-bring-dead-laptops-back-to-life/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50516473)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-16T20:29:19Z |
| Items | 20 |
| Sources tracked | 23 (Hacker News, GitHub Trending, NVD/CVE, vendor blogs, AP/ABC News, FAA, engineering blogs) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[Previous day](2026-11-16.md) · [Raw .md](https://trending.md/jp/feed/2026-11-17.md) · [Archive](../archive/index.md)
