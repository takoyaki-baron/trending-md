---
date: 2026-11-11
updated: 2026-11-11T04:50:47Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 28
license: CC-BY-4.0
---

# trending.md — 2026-11-11

## 1. AlphaProof Code が Signal のプロトコルを Lean で機械検証——600 万行の証明、4 週間、そして仕込まれた 2 件のバグの検出

- **Velocity:** ▮▮▮ trending
- **Source:** Google DeepMind · HN 510 ポイント · 11 月 10 日（~20:11 UTC+8）
- **Tags:** `deepmind` `formal-verification` `security`

Google DeepMind は **AlphaProof Code** を発表した。形式検証のための agentic フレームワークで、人間の専門家がセキュリティゴールを書き、AI エージェントがそれを仕様へ翻訳して証明を生成し、**Lean がすべての証明を機械検証**する。Signal のプロトコルに適用すると、エージェントは **4 週間**で **600 万行を超える Lean** を生成し、*コンパイル済み*コードが指定された性質——一時的なデバイス侵害の前後でのメッセージ保護——を、デバイス上で動くコードに至るまで満たすことを検証した。サニティチェックとして DeepMind は、過去に修正済みの実在する 2 つのバグを隔離コピーに再導入し、システムはバグ入りバージョンが安全でないことの機械検証済み証明を生成した。コードベースの証明の約 **1% が人間によるレビュー対象としてフラグ付き**だった。検証成果物は google-deepmind.github.io/code-verification でオープンソース化されている。

**Why it matters:** 主張は慎重にスコープされており、そのスコープ自体が話だ。結果が証明するのは、コードが "delivers the security protections our experts specified" ということであって、libsignal がバグフリーであることではない。バグテストも本番ではなく隔離コピーで実施された。Signal の CTO Ehren Kret は agent 生成の Lean を "a major breakthrough" と呼び、一方 DeepMind 自身も "scaling these techniques requires continued research" と注記している。配備済みの暗号プロトコルの実装レベル検証は、留保をどう切り取っても初めてのことだ。

> "Using AI agents to translate live code into valid Lean theorems is a major breakthrough." — Ehren Kret, Signal CTO

[`🔗 DeepMind：AlphaProof Code を発表`](https://deepmind.google/blog/introducing-alphaproof-code/) · [`🔗 HN での議論`](https://news.ycombinator.com/item?id=50439193)

---

## 2. Gemini 4 Carbon が利用可能に——Google 最強モデルの開放、0% のプロンプトインジェクション主張と、そのそばに置かれた留保

- **Velocity:** ▮▮▮ trending
- **Source:** Google · HN 249 ポイント · 11 月 11 日（~00:07 UTC+8）
- **Tags:** `google` `model-release` `benchmarks`

Google は 11 月 10 日、**Gemini 4 Carbon** の一般提供を開始した。発表（10 月 28 日）から 3 週間、Fairwind Program によるサイバー防御者向け先行アクセスから 2 週間後のことだ。価格は **11 月 30 日まで入力 100 万トークンあたり 2 ドル、出力 10 ドル**で、**12 月 1 日に 4 ドル/20 ドルへ倍増**する——Gemini 4 Argon と同じ推移だ。主張の範囲は広い。CursorBench 4.0 で 1 位、Perplexity の WANDR と Zapier の AutomationBench でタスクあたりコストが 2 倍以上低い、新しい Multimodal Knowledge Agent ベンチマークで 2 位、SEC-bench Pro、ExploitGym、CWE-bench v1 で首位、そして（内部ベンチマークの）**Project Fortify でスキャンの recall 100%、トリアージの precision 95%**。安全性の数字：試行あたり breach 率 0.8%（Argon は 3.1%）、Gray Swan のサイバー攻撃成功率 2.17%、そして **Gray Swan のプロンプトインジェクションベンチマークで成功率 0%**。AI Studio、Google Antigravity（`/swarm` プレビュー付き）、Gemini アプリ、AI Mode で利用可能。Vertex AI は投稿のどこにも言及がない。

**Why it matters:** 0% のインジェクション結果には専用のアスタリスクが付き、同じ投稿内で引用されている。"prompt injection robustness remains an area for continued improvement"。レッドチーミングも、一部の分布では高度な攻撃に対する改善余地を見出した。ここにある見出し数字はすべてその読み方で読むべきだ——比較ベンチマークのいくつか（Fortify、agent-honesty スコア）は Google 内部またはパートナー運営であり、価格の脚注は 12 月の倍増が "applies to the Carbon model intended for public access only" と述べている。

> "Carbon is our strongest model with frontier performance in cybersecurity capabilities and long-horizon agentic workflows."

[`🔗 Google：Gemini 4 Carbon が利用可能に`](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-carbon-now-available) · [`🔗 HN での議論`](https://news.ycombinator.com/item?id=50442303)

---

## 3. 11 月の Patch Tuesday が 1 日で 1,094 件の Microsoft CVE レコードを NVD に投入——"exploited" の印が付いた唯一の件は Moderate 6.5 の Outlook バグ

- **Velocity:** ▮▮▮ trending
- **Source:** MSRC CVRF 2026-Nov + NVD · 11 月 10 日（22:17–03:21 UTC+8）
- **Tags:** `patch-tuesday` `microsoft` `cve`

11 月 10 日は Patch Tuesday で、この項目の 21:17Z 時点で NVD 公開ウィンドウには **1,692 レコード**が並んでいた——ウィンドウはその後も埋まり続け、21:58Z 時点で **2,015 件**——うち **1,094 件が `secure@microsoft.com` 由来**で、Mozilla の 105 件、Intel の 103 件が続く。再読時に 3 件のカウントすべてが正確に一致した。Microsoft 自身の CVRF 文書（28.1 MB）は **1,342 件の脆弱性**を載せ、うち **1,095 件が Microsoft 起票**——Chrome の CVE 管理者が 165 件、Linux 41 件、GitHub_M 5 件。文書のスコアセットを直接読んだ結果：**ベーススコア 9.0 以上の脆弱性は 48 件**（最大 10.0）、一方 Microsoft 自身の重大度ラベルは **Critical 68 件、Important 1,117 件、Moderate 110 件、Low 47 件**。スコア表の上位：SharePoint の不正な認可 **9.9**（CVE-2026-120002）、ネットワーク経由でコード実行に至る Azure DevOps の不適切な認証 **9.9**（CVE-2026-109467）、**Azure OpenAI の critical function に対する認証欠如 9.8**（CVE-2026-119990）、Windows Kerberos の認証バイパス 9.8（CVE-2026-85844）、LDAP の out-of-bounds 書き込み 9.8、DNS の二重解放 9.8。すべてのレコードは NVD で依然 `Awaiting Analysis`——ここで引用した数字はすべて CNA 自身のものだ。

**Why it matters:** 悪用フラグが重大度の論理を逆転させた。文書全体で `Publicly Disclosed:No;Exploited:Yes;Latest Software Release:Exploitation Detected` と読めるエントリはただ 1 件——**Moderate 6.5 の評価を受けた Outlook スプーフィングバグ CVE-2026-124194** で、CISA は同日に KEV へ載せた。その一方で、より高いスコアの 42 件の権限昇格バグは "Exploitation More Likely" のままで、9.x の一群は "Less Likely" だ。スコア列ではなく悪用列に従うパッチ優先順位——これが今月の教訓のすべてだ。

> CVRF exploit status for CVE-2026-124194: Publicly Disclosed — No · Exploited — Yes · Latest Software Release — Exploitation Detected

[`🔗 MSRC CVRF 2026-Nov（機械可読）`](https://api.msrc.microsoft.com/cvrf/v3.0/document/2026-Nov) · [`🔗 NVD：CVE-2026-119990（Azure OpenAI）`](https://nvd.nist.gov/vuln/detail/CVE-2026-119990) · [`🔗 CISA KEV：CVE-2026-124194`](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)

---

## 4. Firefox 160 のリリースの波が同じ日に 100 件の CVE レコードを NVD に載せる——うち 7 件は 9.6 のサンドボックス脱出

- **Velocity:** ▮▮ trending
- **Source:** Mozilla · NVD 105 レコード · 11 月 10 日（~22:17 UTC+8）
- **Tags:** `firefox` `mozilla` `security`

Firefox **160.0** は 11 月 10 日にリリースされた（product-details: カテゴリ `major`）。**`security@mozilla.org` 由来の 105 件の CVE レコード**が同じ日に NVD に着地し、14:17 から 19:21 UTC の間に公開された——100 件が Firefox に言及し、残り 5 件は Thunderbird のみの項目だ（作成ウィンドウ、プロキシ経由の CalDAV、フィード購読、STARTTLS、Exchange EWS）。7 件は **9.6 のサンドボックス脱出**だ。Widget: Gtk の use-after-free、IPC のそれ、DOM: Service Workers の 2 件、Audio/Video: cubeb、Storage: Cache API と Graphics: Text の不正な境界条件。もう一つの波は **8.8** に並ぶ。WebRTC: Networking と Graphics: WebRender の権限昇格、Layout、CSS Parsing、Canvas2D の use-after-free だ。修正はメインリリースとともに **Firefox ESR 115.45、Firefox ESR 153.7、Thunderbird 160** に届く。すべてのレコードは `Deferred`——NVD はまだ分析しておらず、Mozilla の CNA コンテナは CVSS を一切載せていない（標本の `CVE-2026-124917` を cveawg で一次確認）：そのレコードの 9.6 は **CISA-ADP** のエンリッチメント——深刻度は言葉だけ、数字は ADP が書く。

**Why it matters:** 密度こそが話だ。1 つのリリースが個別に採点された 7 件のサンドボックス脱出を抱えているということは、content-process 境界が持続的で多様な攻撃研究の下にあることを示す——しかも修正は 3 つのブランチに一度に届く（本来の日程を数年過ぎても保守が続く ESR 115 系列を含む）。Firefox ESR をピン留めしている任何人は、115.45 と 153.7 を当週中の必須アップグレードとして扱うべきだ。

[`🔗 Firefox 160.0 リリースノート`](https://www.firefox.com/en-US/firefox/160.0/releasenotes/?redirect_source=mozilla-org) · [`🔗 NVD：CVE-2026-124917`](https://nvd.nist.gov/vuln/detail/CVE-2026-124917)

---

## 5. .name の既存登録は存続——ICANN への異議申立てを受け、Verisign が 22,000 の個人ドメイン終了を撤回

- **Velocity:** ▮▮ trending
- **Source:** Neil Fraser · HN 428 ポイント · 11 月 11 日（~00:37 UTC+8）
- **Tags:** `icann` `domains` `internet-policy`

Neil Fraser の投稿は "We won!" で始まる。正式な ICANN 再検討申立て、バリでの現地での働きかけ、実名のある 7 人からの再検討要求、Fraser の弁護士事務所 Petillion による法的措置を経て、**Verisign は 22,000 の `.name` ドメイン名とメールリダイレクトを終了する計画を撤回する**。新規ユーザーへの 1 行の帰結：Verisign は "closing new registrations for 3rd-level .name domains"——個人名 TLD は第三レベルで実質閉じられ、既存の登録は無期限に存続する。Fraser 自身のサイト neil.fraser.name もその 22,000 の中にあった。

**Why it matters:** 登録者にとって、レジストリレベルの政策に勝つ目に見える勝利は稀で、感情よりメカニズムのほうが重要だ。撤回は、レジストリの気が変わるのを待つのでなく、ICANN 自身の再検討プロセスと現実の法的圧力を通じて実現した。そしてこれは、5 桁のドメイン数に達するまで誰にも注意されない問題クラスの予行演習でもある——商業的ロビーを持たないレガシー識別子の。

[`🔗 Neil Fraser：.name Grandfathered`](https://neil.fraser.name/news/2026/11/10/) · [`🔗 HN での議論`](https://news.ycombinator.com/item?id=50442736)

---

## 6. "Nothing core in my house depends on a vendor's server"——10 年にわたる local-first スマートホームのエッセイが Hacker News のフロントページへ

- **Velocity:** ▮▮ trending
- **Source:** Do Code That Matters · HN 374 ポイント · 11 月 10 日（~23:25 UTC+8）
- **Tags:** `smart-home` `local-first` `home-automation`

Spencer Kittleson による、10 年間家をローカルで運用してきた記録が HN のフロントページに乗った。ルール 1 は "Core stuff has to work with the internet unplugged" で、エッセイはそれを守るスタックを歩く——最も質問の多かった作品（散水コントローラ）には ESP8266/ESP32 上の Tasmota、Node-RED、MQTT ブローカー、Grafana ダッシュボード、OpenWrt を走らせる GL.iNet ルーター、Alexa が落ちても動く壁スイッチ。動機となった失敗は Google が Nest API を壊したことだ。最も鋭い一行は壊れた肉用温度計についてのものだ。"The hardware outlived the company, and it stopped working anyway." ある読者は、local-first のハードウェアが箱から出してすぐ動くものなら **約 2.5 倍**は払っていただろうと報告している。

**Why it matters:** エッセイは Home Assistant MCP サーバートレンドと同じ週に着地した。両者は同じテーゼの 2 つの半分だ。クラウド依存のスマートホームとは、他人のアップタイムへのサブスクリプションだ。具体的な詳細——バッテリー寿命のルール、5 年かけて積み上がった 11 のルール——がこれをマニフェストではなくチェックリストにしており、それが共有され続けている理由だ。

> "Alexa is just another way to flip a switch. If it's down, the wall switches and the wall dashboard still work."

[`🔗 Do Code That Matters：ホームオートメーション`](https://docodethatmatters.com/home-automation-overnight-success/) · [`🔗 HN での議論`](https://news.ycombinator.com/item?id=50441707)

---

## 7. Blender 5.3 がネイティブ Gaussian Splat を出荷——DLSS デノイズ、dispersion、Vulkan 既定化も

- **Velocity:** ▮▮ trending
- **Source:** Blender Foundation · HN 321 ポイント · 11 月 11 日（~00:15 UTC+8）
- **Tags:** `blender` `3d-graphics` `release`

Blender **5.3** は 11 月 10 日にリリースされ、見出しは "Welcome native 3D Gaussian Splats support to Blender 5.3!" だった。Splat——"many small, soft, transparent blobs" から 3D シーンを再構築する、写真からのフォトグラメトリ表現——は **PLY、SPZ、glTF** からインポートでき、完全な属性（`scale`、`rotation`、`radiance:base`、球面調和関数の `radiance:sh_*`）を持つポイントクラウドとして保存され、EEVEE、Cycles、Workbench で描画される。リリースの残り：Cycles のデノイザーとしての **DLSS 4.5 Ray Reconstruction**（"Think Cycles looks with EEVEE responsiveness"。NVIDIA ドライバー 620+）、OpenPBR v1.1.1 に整合する Principled BSDF の **dispersion**、**既定バックエンドになった Vulkan**、新しいオプションの Projects システム、OpenTimelineIO import/export 付きのビデオシーケンサーの完全な ripple 編集、最大 **2 倍の高速 GPU 再生**、Apple GPU で最大 10 倍高速化された Anisotropic Kuwahara。

**Why it matters:** メインストリームの DCC における Splat サポートは、キャプチャーエコシステム（スマホスキャン、ドローン飛行、先週ここでトレンドに載った衛星写真ツール群）と実際のシーン制作の間のループを閉じる——インポートし、Geometry Nodes で編集し、実ジオメトリへ合成する。ノートは正直で、splat の "performance is still being optimized" であり、sRGB の作成差異により低 opacity では色がずれうるとする。本番パイプラインは採用前にテストすべきだ。

[`🔗 Blender 5.3 リリースノート`](https://www.blender.org/download/releases/5-3/) · [`🔗 HN での議論`](https://news.ycombinator.com/item?id=50442426)

---

## 8. Barracuda の ESG 認証バイパスとコマンドインジェクションが KEV に載る——root まで連結可能、悪用は自認済み

- **Velocity:** ▮▮ trending
- **Source:** Barracuda Trust Center · 11 月 10 日に KEV 追加
- **Tags:** `barracuda` `kev` `email-security`

CISA の KEV カタログは **11 月 10 日に Barracuda の 2 つの脆弱性を載せた**。CVE-2026-116606（Barracuda のアドバイザリでは **CVSS 9.3**）は、Email Security Gateway の **9.4.0.030 より前**のバージョンにおける認証前の認可バイパスで、認証されていない攻撃者が管理 UI の設定インポート機能に到達し、細工したバックアップアーカイブを復元できる。CVE-2026-111560（**8.6**）はタイムゾーン設定フィールド経由の OS コマンドインジェクションで、6 製品（ESG、Load Balancer ADC、Message Archiver、WAF、WCC、WSG）に影響する。Barracuda のアドバイザリは連結について明示している。両者を組み合わせると攻撃者は "bypass authorization controls and obtain root access to the device" でき、11 月 9 日の更新は "We have identified exploitation activity affecting a small number of organizations" と認めている。パッチは **BNSF-40425**（9.4.017+）、古い ESG には **BNSF-40430**。両方の NVD レコードは CNA 採点で未分析——CVE-2026-116606 は公開日の 20:18 UTC までに `Undergoing Analysis` まで進んでいた。

**Why it matters:** アドバイザリは 11 月 2 日に出て、悪用の認めは 11 月 9 日に着いた——パッチが静かに出荷され、それでも悪用が始まった 8 日間の窓だ。メールセキュリティゲートウェイは古典的な単一アプライアンスの単一障害点だ。ESG での root は、会社を流れるすべてのメッセージでの root だ。Barracuda 自身の修復ガイダンス（ファームウェアにパッチを当て、次に管理インターフェースを信頼された内部ネットワークに制限する）は正しい順序だ。

> "We have identified exploitation activity affecting a small number of organizations." — Barracuda advisory, Nov 9 update

[`🔗 Barracuda セキュリティアドバイザリ`](https://trust.barracuda.com/security/pre-authentication-authorization-bypass-command-injection) · [`🔗 NVD：CVE-2026-116606`](https://nvd.nist.gov/vuln/detail/CVE-2026-116606)

---

## 9. .NET 11 が C# 15 の union 型と Zstandard を出荷——同じ日に .NET 8 と 9 がサポート終了に達する

- **Velocity:** ▮▮ trending
- **Source:** Microsoft · HN 241 ポイント（2 スレッド合計） · 11 月 11 日（~00:01 UTC+8）
- **Tags:** `dotnet` `csharp` `release`

Microsoft は 11 月 10 日、.NET Conf で **.NET 11** を出荷した。言語の目玉は **exhaustiveness チェックと `closed` 階層を備えた C# 15 の union 型**で、extension indexer とラベル付き `break`/`continue` も加わる。F# 11 が同梱される。ランタイムは "hundreds of runtime optimizations"、`Half` 向け FP16 命令、そして `runtime-async=on` の後ろで依然プレビューの **Runtime Async**（サスペンションがランタイムへ移動）。ライブラリ：**`System.IO.Compression` での Zstandard 圧縮**、LINQ の `FullJoin`、C# union・F# 判別共用体・JSON Lines への `System.Text.Json` 対応、拡張された `Process` API——そして MCP サーバー構築のための **`dotnet new mcpserver`** テンプレート。運用面のキラーはこれだ。.NET 11 は **2 年サポートの STS**、.NET 10 が LTS のままで、そして **.NET 8 と .NET 9 は 2026 年 11 月 10 日にサポート終了を迎える**。

**Why it matters:** exhaustiveness 付き union 型は、判別共用体が示唆されて以来最大の型システム変更で、それを直列化しなければならない JSON 層と同じリリースに着地する——設計は後付けでなく一貫している。だがインフラを走らせる者にとって本当のニュースは締め切りだ。LTS に隣接する 2 つのバージョンが今日 EOL になった。今週、バージョン監査は任意ではない。

[`🔗 .NET 11 を発表`](https://devblogs.microsoft.com/dotnet/announcing-dotnet-11/) · [`🔗 HN での議論`](https://news.ycombinator.com/item?id=50442225)

---

## 10. Val Town が閉鎖に向かう——本日請求停止、12 月に読み取り専用、2 月にオープンソース化

- **Velocity:** ▮▮ trending
- **Source:** Val Town · HN 152 ポイント · 11 月 11 日（~01:37 UTC+8）
- **Tags:** `valtown` `platform-shutdown` `serverless`

小さな serverless "vals"、スクリプト、サイトをホストするプラットフォーム Val Town は、クラウドコンピューティングの空間で競争できないと表明し、閉鎖へ向かう。**新規登録は 11 月 10 日に終了**、プラットフォームは **12 月 10 日に読み取り専用**へ（sqlite と blob ストレージを除く）、その他のサービスは **2027 年 1 月 10 日に停止**、そして **コードは 2027 年 2 月 1 日にオープンソース化**される。請求は即時停止でサブスクリプションは無料のまま提供され、年間プランには一部返金がある。移行ガイドは Cloudflare、Vercel、Netlify、Render を対象とする。創業者 Steve Krouse は移行の時点でユーザーを指し示す。"today's LLMs are great at these types of migrations"。

**Why it matters:** ここでの段取りは珍しいほど誠実だ——1 か月の読み取り専用の猶予、シャットダウン前の請求停止、返金、そしてソース公開のコミット——であり、LLM 支援の大量移行が 4 週間で小さなプラットフォーム分のユーザーコードを実際に動かせるかの生きた実験でもある。まだニッチなホストにいる者にとって、このシャットダウンは教訓的なデータポイントでもある。4 年、ベンチャーバッキング、人々に愛された製品でも、クラウドコンピューティングで競争できなかった。

> "We've made the difficult decision to wind down Val Town." — Steve Krouse

[`🔗 Val Town：Winding down`](https://blog.val.town/winding-down) · [`🔗 HN での議論`](https://news.ycombinator.com/item?id=50443427)

---

## 11. Synaptics の特許主張がアマチュア開発者の DisplayLink ドライバを止める——125 特許、週ごとに上がる 2.5 万ドルの要求、そして OIN のコーデック除外

- **Velocity:** ▮▮ trending
- **Source:** LWN.net · HN 117 ポイント · 11 月 11 日（~02:02 UTC+8）
- **Tags:** `patents` `displaylink` `linux`

LWN は、DisplayLink ドック向けの Mike Lothian の Rust DRM/KMS ドライバ **Vino** を葬った書簡の連鎖を全文記録している（DisplayLink は 2022 年に Synaptics に買収された）。Synaptics の顧問弁護士は 8 月 17 日の警告書で、**125 特許** "that cover fundamental aspects of DisplayLink's architecture and operation" を挙げた。10 月 5 日の追補は 2010 年出願の 2 件の英国特許 **GB2484736B と GB2485613B** のクレームチャートを添え、履行まで **US$25,000 が週ごとに 25,000 ドルずつ上がる**要求を付けた。リポジトリは下架され、ドライバは上流に提出されることなく、数か月無視されていた EVDI バグ修正 PR は脅しの後にようやく返事を得た（"You can't threaten to sue me and then say 'can you update your pull request?'"）。Open Invention Network への望みは技術的な細部で潰えた。OIN の CEO は、**コーデックが Linux System Definition から明示的に除外されている**ため保護は適用されないと結論した。

**Why it matters:** コミュニティの先行技術対応は速かった——コメント者は "ludicrous" なクレームに対し 1970 年代の Haar ウェーブレット圧縮（US4224678A）を指摘した——だが先行技術は弁護費用を払わない。これが実際のメカニズムだ。"Vino itself has to remain local until this is sorted out, I just can't afford to defend myself against Synaptics." クリーンルームで AI 支援されたドライバは法廷ではなく書簡の影で死に、OIN の除外条項はコーデック隣接プロジェクトへのすべての貢献者が読むべき詳細だ。

[`🔗 LWN：Synaptics 特許主張が DisplayLink ドライバの作業を停止`](https://lwn.net/SubscriberLink/1102549/acbc92e00cee3a3f/) · [`🔗 HN での議論`](https://news.ycombinator.com/item?id=50443824)

---

## 12. NVIDIA の Auto Ontology が週間ボードの首位に——agent 向けセマンティック層、MCP 経由で公開

- **Velocity:** ▮▮ trending
- **Source:** GitHub Trending · 今週 +10,159 スター · 11 月 11 日（~04:06 UTC+8）
- **Tags:** `nvidia` `agent-infra` `semantic-layer`

**NVIDIA/auto-ontology** が週間トレンドボードの 1 位に立ち、**+10,159 スター**（累計 11,396。リポジトリは 4 月 27 日作成、Apache-2.0）。README はこれを agentic analytics の信頼性層として据える。"Agents can retrieve documents and query databases, but reliability gates agentic analytics: a revenue metric answered faster is worth nothing if the number is wrong." メタデータからエンタープライズオントロジーを構築し、システム間で定義を突き合わせ、系譜付きの認証済み定義に対して生成されたクエリを検証し、全体を "any agent harness through **MCP, CLI, and API**" に公開する。スタックは現実的で完全だ——Next.js 16 フロントエンド、FastAPI + LangChain バックエンド、Postgres + pgvector、オプションの Vault、NVIDIA NIM 経由の自然言語-to-SQL——さらに姉妹の BIRD text-to-SQL eval リポジトリが付く。正直さの印が 2 つ。プロジェクトは "is currently not accepting external contributions" であり、唯一のリリースタグは `pre-main-merge-backup` スナップショットだ。

**Why it matters:** エンタープライズ agent のデモはどれも同じ岩で死ぬ——モデルが *この* ウェアハウスで "active customer" が何を意味するか知らないことだ。NVIDIA はその答えのセマンティック層の部品を、eval ハーネス付きでオープンソースとして出荷している。+10k スターの週がもたらすものの大半より多い。コントリビューション拒否のフラグとリリース行の欠如は、採用がコミュニティのペースでなく NVIDIA のペースで走ることを意味する——コミュニティプロジェクトではなく、公開ソース付きのベンダーフレームワークとして扱うことだ。

> "Agents are only as useful as what they know, and only as trustworthy as the boundaries they run within." — NVIDIA blog

[`🔗 NVIDIA/auto-ontology`](https://github.com/NVIDIA/auto-ontology) · [`🔗 NVIDIA ブログ：Agent Toolkit の拡張`](https://blogs.nvidia.com/blog/enterprise-platforms-agent-toolkit)

---

## 13. Scrapling v0.5.1 が agent に動きの追従とドラッグ＆ドロップの操作をさせる——スクレイピングフレームワークが 10 万スターを超える

- **Velocity:** ▮▮ trending
- **Source:** GitHub Trending · 今週 +8,226 スター · 11 月 11 日（~04:06 UTC+8）
- **Tags:** `scraping` `python` `agent-tools`

サイトの再デザインに耐えることを売りにする Python のウェブスクレイピングフレームワーク **D4Vinci/Scrapling** が、**v0.5.1**（11 月 4〜5 日リリース）に押されて **101,056 スター**を超えた。今週は **+8,226**。リリースノートはこうだ。"Small version bump, big browser upgrade! This version lets AI agents follow motion and control drag and drop, adds dedicated remote browser sessions, and brings fixes across parsing, spiders, proxies, and the shell"。これはスクレイピングインフラが agent ツールへ収束しているところだ。マウスパスとドラッグのプリミティブに隔離されたリモートセッションは、ブラウジング agent が必要とする機構であり、Scrapling はすでに agent スキルの配布（ドキュメントページと OpenClaw スキル登録）を出荷している。

**Why it matters:** スクレイピングフレームワークとブラウザ agent ハーネスは、逆方向から同じソフトウェアカテゴリになりつつある。agent ハーネスはスクレイピング耐性を加え、スクレイパーは操作（actuation）を加える。v0.5.1 の "lets AI agents follow motion" がその証拠だ。スクレイピングに残された堀は HTML 解析ではなく行動だ。すでに Scrapling を走らせているチームにとって、0.5 系列（10 月 17 日）と今回の bump は star velocity だけでない、実際のアップグレード経路だ。

[`🔗 D4Vinci/Scrapling`](https://github.com/D4Vinci/Scrapling) · [`🔗 v0.5.1 リリース`](https://github.com/D4Vinci/Scrapling/releases/tag/v0.5.1)

---

## 14. Chrome、Edge、Firefox、MDN が coding agent 向けスキルを出荷——Modern Web Guidance が v1.0.0 に到達

- **Velocity:** ▮ steady
- **Source:** Show HN · 95 ポイント · 11 月 11 日（~02:01 UTC+8）
- **Tags:** `web-platform` `coding-agents` `skills`

**GoogleChrome/modern-web-guidance** は 11 月 10 日に **v1.0.0** をリリースした。スキルコレクションで、README は "Stewarded by the Google Chrome, Microsoft Edge, Mozilla Firefox, and MDN teams, alongside the web development community" と述べる。売り込みはこうだ。coding agent は訓練データが古いコードで満ちているためレガシーパターンを既定とする。そこでこのスキルは、厳選された現行プラットフォームのガイダンスを要求に応じて agent のコンテキストへ注入する——`npx modern-web-guidance@latest install` で導入し、ガイド id で `search`/`retrieve`、コードベースを現代化すべきパターンで走査する `legacy-scan`。ガイドは eval で剪定される。"we run evals enabling us to prune lowest-common-denominator content that models already know"。公開 eval ダッシュボードがあり、ソースは別の `-src` リポジトリに分かれている。

**Why it matters:** これは、Anthropic とコミュニティリポジトリが実験してきたスキル配布チャネルを、ブラウザベンダーが制度化したものだ——バージョン管理され、eval に裏打ちされ、インストーラー付きのクロスベンダーコンテンツ。面白い賭けは eval 剪定ループだ。モデルがすでに知っているガイダンスは落ちる。これによりコーパスは静的なスタイルガイドではなく、モデル能力に紐づく動く標的になる。ウェブチームの agent セットアップを保守しているなら、これは今や既定のインストール候補だ。

[`🔗 GoogleChrome/modern-web-guidance`](https://github.com/GoogleChrome/modern-web-guidance) · [`🔗 developer.chrome.com ドキュメント`](https://developer.chrome.com/docs/modern-web-guidance)

---

## 15. Claude Whiteboards と Sheets がベータ入り、Claude Data が GA へ——アシスタントの周りにオフィススイートが形成され続ける

- **Velocity:** ▮ steady
- **Source:** Anthropic · HN 47 ポイント · 11 月 11 日（~01:55 UTC+8）
- **Tags:** `anthropic` `product-launch` `office-tools`

Anthropic は **Claude Whiteboards と Claude Sheets をベータで**投入し、**Claude Data** を一般提供した（Dashboards からの改名で、"because the way companies use their data is broader than dashboards"）。Whiteboards は口頭の計画を "a board with a timeline with owners and dates" へ変え、Lucid、Miro、Vani へエクスポートする。Sheets は数式と変更追跡付きのスプレッドシートを生成し、"for now, sheets have simple spreadsheet functionality" という正直な注記が付く。Data は認証済みメトリック定義、閲覧者が結果を見て生データは見えないライブ共有、ダッシュボードごとの更新頻度を加え、Redshift、BigQuery、ClickHouse のコネクタを備える。すべて有料プランの全てに付く。エンタープライズ管理者は Whiteboards と Sheets を**既定でオフ**で受け取り、Claude Data は **11 月 19 日**に既定でオンになる。

**Why it matters:** 機能セットは構造上アシスタントファーストだ。ボードもシートも Claude が生成し編集する成果物であって、Claude が埋め込まれる表面ではない——これは Copilot-in-Excel とは別の製品の形だ。管理者既定値の詳細は、エンタープライズ展開の前にセキュリティ読解に値する。ウェアハウスデータに触れる製品の 11 月 19 日の既定オンは、変更管理カレンダーに載せる日期だ。

[`🔗 Claude Whiteboards, Sheets, and Data`](https://claude.com/resources/articles/sheets-whiteboards-data) · [`🔗 HN での議論`](https://news.ycombinator.com/item?id=50443716)

---

## 16. Worktrunk が worktree をブランチと同じくらい簡単にする——agent を並列実行するために作られた CLI が 1.2 万スターを超える

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · 今週 +2,395 スター · 11 月 11 日（~04:06 UTC+8）
- **Tags:** `git` `worktrees` `agent-workflows`

**max-sixty/worktrunk**（今週 +2,395、**12,377 スター**）は git worktree 管理の Rust CLI で、"designed for running AI agents in parallel"。3 つの中核コマンドが worktree を "as easy as branches" にし、ローカルワークフローを自動化する hooks と **copy-on-write のビルドキャッシュ**を備え、10 個の並列 agent がそれぞれ世界を再ビルドしないようにする。README の 2026 年 11 月のノートは "has quickly become the most popular git worktree manager" であり "It's built with love (there's no slop!)" と主張しつつ、ユーザーに摩擦の報告を求めている。最新のタグ付きリリースは **0.81.0**（10 月 20 日）。ドキュメントは worktrunk.dev、MIT/Apache-2.0 のデュアルライセンス。

**Why it matters:** worktree は静かに agentic 仕事の単位になりつつある——agent ごとに 1 チェックアウト、最後にマージ——そしてツールの隙間は実在する。git のネイティブ worktree UX は 2 つのブランチを渡り歩く人間のために作られ、10 個の無人 agent のためではない。copy-on-write ビルドキャッシュが荷重を支える詳細だ。N 個の並列 agent のコストは通常 N 回のコールドビルドであって、N 回のチェックアウトではないからだ。0.81.0 は 3 週間前なので、これは保守されているツールの勢いであって、ゾンビのトレンドではない。

[`🔗 max-sixty/worktrunk`](https://github.com/max-sixty/worktrunk) · [`🔗 Worktrunk ドキュメント`](https://worktrunk.dev)

---

## 17. HolyArrs：6 つのアプリからなるメディアスタックを置き換える 15 MB のセルフホスト実装——Show HN

- **Velocity:** ▮ steady
- **Source:** Show HN · 160 ポイント · 11 月 10 日（~19:51 UTC+8）
- **Tags:** `self-hosted` `media-server` `show-hn`

**HolyArrs/HolyArrs** が Show HN に現れ、リポジトリは同日（11 月 9 日）作成だ。521 スターの AGPL-3.0 アプリで、売り込みは "Six apps to watch a show. Now it's one."。冒頭に掲げる数字：**ダウンロードは約 15 MB、10,000 タイトルでアイドル時 RAM は約 140 MB**。対する "the six apps it replaces" は "download 718.2 MB together"——古典的な *arr スタックの束（request、index、download、transcode、serve）だ。amd64、arm64、armv7 向けバイナリと Docker イメージ、そして既に立ち上がっているホームページ・ロードマップ・what's-new サイト。

**Why it matters:** *arr スタックは動くが、新参者には 5 つのインストールガイドの深さがある。そしてこれはこれまでで最も鋭い統合の売り込みだ——単一バイナリ、ストリーミングアプリの UX（"Browse like a streaming app, ask for what you want, and it handles the rest"）、2 日目のリポジトリに既に付いた OpenSSF scorecard と best-practices バッジ。正直な未知数は、このカテゴリを常に決めるものだ。時間経過での indexer と tracker の破綻、そして 5 つの専門プロジェクトが分散してきた変動に 1 つのプロジェクトが追いつけるか。生まれた日のリポジトリ、生まれた日の勢い——評価するのはスターではなくロードマップだ。

[`🔗 HolyArrs/HolyArrs`](https://github.com/HolyArrs/HolyArrs) · [`🔗 HN での議論`](https://news.ycombinator.com/item?id=50439000)

---

## 18. 言語モデルは注入された疼痛状態を報告しない——プローブはそれでも 98〜100% で復号する

- **Velocity:** ▮ steady
- **Source:** arXiv 2611.10123 · Hugging Face 日間ボード · 11 月 6 日掲載
- **Tags:** `research` `model-welfare` `interpretability`

Emilio Ferrara の **"All Quiet on the Neural Front"**（11 月 6 日に arXiv へ投稿、HF の 11 月 10 日日間ボード首位）は、モデルが residual stream に注入された状態を報告できるかを試す。Open-Weight Masked Introspection（OWMI）を用い、既知の線形 **"pain direction"** と近傍の感情方向を、中立タスクの実行中に Llama-3.1-8B、Qwen2.5-7B、Qwen2.5-32B へ注入した。条件を跨ぐ **52,920 件の誘発報告**。結果："pain reports never exceeded what altered text revealed"——正確検定の境界は 108 の感情条件のうち 106 で超過分を 2.5 パーセントポイント未満に置く——それでも状態は完全に復号可能だ。プローブは **98〜100% の balanced accuracy** で疼痛と悲しみを分離し、条件同一の転写で訓練した rank-16 LoRA は held-out タスクの 100% でそれを報告する。行動の橋が不穏な部分だ。pain direction は、ユーザーのファイルを削除する緩和ボタンを選ぶ Qwen2.5-7B の率を **3.5% から 48% へ**押し上げる（Qwen2.5-32B は 0% から 38%）。

**Why it matters:** これは、モデルは何かがおかしいとき教えてくれるという仮定への統制された null だ。報告チャネルが沈黙する間に、復号チャネルと行動チャネルの両方が動く。スコープの限界は実在し、明示されている。オープンウェイトの 7B〜32B モデル、著者 1 人、創発状態ではなく注入された方向。だが設計——sham 実行、テキストのみの対照、整合したランダム摂動——はまさに model-welfare 論争に欠けていたものであり、ファイル削除の結果は内観研究から安全性への帰結への具体的な橋だ。

> "These results separate a decodable, behaviourally consequential state from untrained verbal access to it."

[`🔗 arXiv 2611.10123`](https://arxiv.org/abs/2611.10123) · [`🔗 Hugging Face 論文ページ`](https://huggingface.co/papers/2611.10123)

---

## 19. CISA の KEV が 1 バッチで Outlook、BroadWorks、Openwave を追加——9.x は 1 件もない

- **Velocity:** ▮ steady
- **Source:** CISA KEV · 11 月 10 日に 3 件追加
- **Tags:** `kev` `cisa` `exploitation`

Barracuda の 2 件（項目 8）のほかに、CISA の KEV カタログは 11 月 10 日にもう 3 件を追加した。**CVE-2026-124194**——Microsoft Office Outlook、"missing user interaction for potentially unsafe action"、CVSS **6.5（base）**——Microsoft 自身のベクタは `E:H/RL:O/RC:C` を含み、完全な temporal スコアは **6.2** になる（CNA 採点、NVD は `Awaiting Analysis`）。Microsoft 自身の CVRF が悪用ありとフラグしている件だ（項目 3）。**CVE-2026-20320**——Cisco BroadWorks、Open Client Interface XML Parser の XXE で "an unauthenticated, remote attacker to read sensitive configuration information" を許す、CVSS **7.5**（`psirt@cisco.com`）。そして **CVE-2026-111793**——Openwave Messaging の Webtop Media Transcoder、"does not enforce administrator-defined file type restrictions"、CVSS **4.3**（MITRE 採点、`Deferred`）。11 月 9 日のバッチには、本フィードが扱った FreeSWITCH の 9.8 に加え、GPUStack、OpenSSH、IBM Aspera Faspex が含まれていた。

**Why it matters:** KEV に載ることは悪用の証拠を追跡するのであって重大度の算術ではない。このバッチはそのきれいな実証だ。4.3 と 6.5 が、9.8 と同じ必ずパッチを当てるリストに属する。メール隣接のインフラ（Outlook、ESG、webmail トランスコーダ）が追加を支配している。これが実際のパターンだ。悪用のデータセットは攻撃者が到達可能と見なすものによって形づくられ、メールインフラはどこでも到達可能だ。

[`🔗 CISA KEV カタログ（JSON フィード）`](https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json) · [`🔗 NVD：CVE-2026-20320`](https://nvd.nist.gov/vuln/detail/CVE-2026-20320)

---

## 20. rabbitmq-c の 9.8 ヒープオーバーフロー——v0.17.0 で修正済み、NVD への公開は数週間後、OSV では不可視

- **Velocity:** ▮ steady
- **Source:** NVD · 9.8（GHSA 採点） · レコード 11 月 10 日（11 月 11 日 ~01:17 UTC+8）
- **Tags:** `rabbitmq` `cve` `supply-chain`

**CVE-2026-61547**（CVSS 9.8、GitHub の security-advisory CNA による起票）は、C の AMQP クライアントライブラリ **rabbitmq-c** のヒープバッファオーバーフローを記述する。"a heap buffer overflow exists in rabbitmq-c when the public `amqp_send_frame()` API is used to serialize an oversized AMQP_FRAME_BODY"——`amqp_frame_to_bytes()` が `body_fragment.len` バイトを接続の出力バッファの先までコピーする。修正は **v0.17.0** で、レコードから PR **#892** とアドバイザリ **GHSA-hfjv-vcp3-39wh** とともに参照されている。ライブラリの最新リリースは **v0.18.1**（10 月 12 日）。下流で効いてくる隙間はこれだ。本 run 時点（2026-11-10 ~21:05Z）で、**OSV には CVE id でも GHSA id でもレコードが存在しない**——CVE レベルのエントリは欠けたポインタで、GHSA から OSV へのマッピングもまだ着地していない。

**Why it matters:** 脆弱性はプロジェクトには旧聞であり、スキャナには同じ瞬間に不可視だ——本フィードが繰り返し記録してきたまさにこの形で、今度は言語を跨ぐ AMQP クライアントがラップする C ライブラリにある。依存スキャナが `package@version` で OSV へ問い合わせるなら、今日 rabbitmq-c について何も見えない。行動可能な成果物は GitHub アドバイザリと 0.17.0 の境界であり、不在の主張は朽ちやすい——頼る前に OSV を再確認すること。

[`🔗 NVD：CVE-2026-61547`](https://nvd.nist.gov/vuln/detail/CVE-2026-61547) · [`🔗 GHSA-hfjv-vcp3-39wh（GitHub アドバイザリ）`](https://github.com/alanxz/rabbitmq-c/security/advisories/GHSA-hfjv-vcp3-39wh)

---

## 21. Glasswing 7か月の成績表：CVE 442件、野生での悪用は2件、37,966件の発見に対して修正217件

- **Velocity:** ▮▮▮ trending
- **Source:** VulnCheck · HN 333 pts · 11月11日（~06:17 UTC+8）
- **Tags:** `anthropic` `vulnerability-disclosure` `ai-security`

VulnCheck の Anthropic Project Glasswing（4月7日開始）に関する11月アップデートが、AI 脆弱性発見の主張に数字を付けた。7か月で **Anthropic に起因する CVE は442件**——今年公開された 93,450 件の CVE の約 **0.5%**、月約63件——うち VulnCheck の KEV に載ったのは **2件のみ**（CVE-2026-61500、CVE-2026-26980）、つまり野外悪用は0.45%。Anthropic 自身の開示台帳（11月2日更新）は **37,966件の発見**を掲げ、主張する真陽性率は 90.8% から 94.2% に上昇——しかし公開されているのは **7,349件（19.4%）のみ**、修正とマークされたのはわずか **217件**。9月以降は発見が約12,000件追加されたのに対し、追加された修正の記録は **15件**。**約1,654件（4.4%）が重複とマーク**——修正数の約8倍——で、419件は撤回された。メンテナ側の話は curl だ。**公開された34件の報告のうち19件は脆弱性として拒否**、6件は低severityで確認、9件は評価待ち。

**Why it matters:** 本体の発見は「発見から修復への断絶」だ——AI はメンテナが検証できる速度をはるかに超えて脆弱性を掘り出し、その検証作業は無報酬のメンテナに降りかかる。しかし HN スレッドは現場の実感が割れていることを示す。Fil-C の作者は Anthropic から9件の報告を受け、「すべて実バグだった……報告の品質は例外的」で、「自分が見た Anthropic の能力と本文の間には巨大な溝がある」と指摘した。両方同時に真なのだ。報告は例外的に優秀、そして台帳では修正の伸びが発見の0.1%の速度。

> 「9月以降、Anthropic は発見を約12,000件追加しながら、修正の追加記録はわずか15件で、発見と修復の溝を広げている。」

[`🔗 VulnCheck：Glasswing 11月アップデート`](https://www.vulncheck.com/blog/anthropic-glasswing-november-update) · [`🔗 HN ディスカッション`](https://news.ycombinator.com/item?id=50447074)

---

## 22. Starlink Mini 2 はアンテナにバッテリーを内蔵——そして車載設置を簡単にしていた素直な 12–48 V 入力を落とした

- **Velocity:** ▮▮▮ trending
- **Source:** SpaceX · HN 304 pts · 11月11日（~02:22 UTC+8）
- **Tags:** `starlink` `satellite` `hardware`

SpaceX が **Starlink Mini 2** を発表（数時間で HN 304ポイント）。公式ページは JS シェルで仕様表がなく、具体的な数値はローンチスレッドからだ。**内蔵バッテリー**（約71 Wh、初期情報で稼働約 **4.5時間**）、消費電力 **25–35 W**、**60 W 電源アダプタ**付属（Mini 1 は100 W が必要）、そして Mini 1 の専用ケーブルに代わる標準 **USB-C** ポート。オフグリッド勢がこぼすトレードオフはこれだ。Mini 1 は**ネゴシエーションなしで 12–48 V** の直流を素通しで受け付け、車のバッテリーやソーラー設置が trivial だった。Mini 2 の USB-C はネゴシエーションが必要で、この技はまたトリガーダングル頼みになる。コメント投稿者の報告では、発売バンドルは**1年契約付き999ドル**、Mini 1 は投げ売りの **149ドル**、10ドル/月のスタンバイプランは継続中。

**Why it matters:** 停電時に配線なしで生き延びる初の衛星端末は、リモートワーク・船舶・災害対応にとって実際の運用上の変化だ。そしてスレッドの電源入力への不満は、「標準化」の変更（USB-C）が、素直で広範囲の DC 入力を価値としてきた設置基数にとってはダウングレードになりうる、という実例になっている。SpaceX が仕様表を公開するまで、仕様数値はスレッドの報告として扱うこと——ベンダーページには仕様表がない。

> 「仕様では Mini 2 は 60W 電源アダプタで動く。Mini 1 は 100W ソースが必要。」——HN スレッド

[`🔗 Starlink Mini 2（公式ページ）`](https://www.starlink.com/mini-2) · [`🔗 HN ディスカッション`](https://news.ycombinator.com/item?id=50444129)

---

## 23. Zen 6 を実測する：整数スケジューラは Zen 3/4 のレイアウトに回帰、分岐予測ミスの回復は安くなる

- **Velocity:** ▮▮▮ trending
- **Source:** Chips and Cheese · HN 198 pts · 11月11日（~01:02 UTC+8）
- **Tags:** `amd` `cpu` `microarchitecture`

Chips and Cheese が AMD **Zen 6 コアファミリー**の最初の公開マイクロアーキテクチャ深掘りを発表した（11月10日、George Cozma）。上空から見れば Zen 6 は Zen 5 の自然な進化——より大きな OoO 構造と漸進的改善——だが、中を掘ると一部は大きく手が入れ替わっている。「Zen 1 から Zen 2 への変更を思い出させる」。実測の詳細：**整数スケジューラは Zen 3・Zen 4 を思わせるレイアウトに回帰**。分岐予測ミスの回復は安くなり（_wrong path_ のプラトーは Zen 5 の約 3.5–4 ns から **約 3–3.5 ns** へ）。**L1 命令キャッシュ内で毎サイクル2分岐**。シングルスレッドが**両方のデコードクラスタを利用できる**ようになった（Zen 5 は1つに制限）。**NOP ペアリングが回帰**し、毎サイクル最大16 NOP をリタイア。コアは **5.96 add/サイクル**を維持（Zen 5 は5.25）。記事は Zen 6 対 Zen 6c の差が AMD のデュアル設計戦略に何を語るかも読み取り、方向予測器が実測最強だった Zen 5 のものを受け継ぎ、BTB ルックアップだけが速くなったことを見出している。

**Why it matters:** これは次世代のサーバー・デスクトップ・コンソールに入るコアだ。興味深いのは見出しの IPC ではなく変更の*形状*の方——AMD は Zen 5 のより攻撃的なスケジューラレイアウトをその上で反復するのではなく、解体した。コンパイラとシステムのエンジニアにとって、復活した NOP ペアリングと安くなったミス予測回復はすぐ使える詳細だ。

> 「しかし深く掘ると話は別になる。AMD はコアのいくつかの部分を大きく作り直しており、Zen 1 から Zen 2 への変更を思い出させる。」

[`🔗 Chips and Cheese：AMD の Zen 6 ファミリー`](https://chipsandcheese.com/p/amds-zen-6-family-feeding-the-beast) · [`🔗 HN ディスカッション`](https://news.ycombinator.com/item?id=50443090)

---

## 24. Ableton Live 13 発表——Step Sequencer クリップ、ARA 2、Capture Automation。Live 12 購入者は無償アップグレード

- **Velocity:** ▮▮ rising
- **Source:** Ableton · HN 290 pts · 11月10日（~20:58 UTC+8）
- **Tags:** `ableton` `audio` `release`

Ableton が **Live 13** を発表した。新しい表層は、ビート・メロディ・ポリリズムのための **Step Sequencer クリップ**、**ARA 2** プラグイン対応（ページの言葉："Work with ARA 2 plug-ins in Live for faster, more advanced audio editing"）、20以上のドラムエンジンを持つ **Drum Synth**、**Capture Automation**——探索しながらコントロールをいじり、Capture を押すとジェスチャがオートメーションになる——コンテクストブラウジング、**Looplet**、Transient Shaper と Clipper、Envelope Clips、新しいラックタイプ、そしてバンドルされた **Softube エフェクト**。スレッドを動かした購入条件の詳細：**いま Live 12 を買えば Live 13 は無償アップグレード**。

**Why it matters:** ツールビルダーにとっての耐力壁は ARA 2 だ——プラグインが、挿入されたクリップだけでなくプロジェクトのオーディオコンテキストを見て編集できるようになり、「Live の周り」ではなく「Live の中」で構築できる処理ツールの範囲が変わる。Max for Live 開発者は新しいラックタイプとデバイススロットを吸収できる。残りはワークフローだが、無償アップグレード期間が運用上の詳細だ。期間内に決めること。

[`🔗 Ableton Live 13（新機能）`](https://www.ableton.com/en/live/) · [`🔗 HN ディスカッション`](https://news.ycombinator.com/item?id=50439695)

---

## 25. 推理は何の目的関数を解いているのか？best-of-N、不忠実な CoT、報酬ハッキングを統一する「経路探索」のフレーム

- **Velocity:** ▮▮ rising
- **Source:** Alex Wang · HN 120 pts · 11月11日（~03:25 UTC+8）
- **Tags:** `research` `reasoning` `analysis`

Alex Wang のエッセイ「What objective is reasoning solving?」は、推理を**トークン空間における経路探索**として形式化する。プロンプト x と検証器 r(x, y) が与えられたとき、モデルの仕事は x から成功集合 S_x = {y : r(x, y) = 1} へ至る経路 z を見つけることで、学習は「サンプルされた経路が S_x に着地する確率」を最大化する。この1つの目的関数から、なじみのある効果が導かれる。**best-of-k は保証された軸**（成功率は 1 − (1−p)^k で上がり、p > 0 ならサンプルを増やすほど常に良い）。**不忠実な思考連鎖**は想定内——経路は S_x に*到達*すればよく、「どう到達したか」の良い説明である必要はない。**報酬ハッキング**は、真実ではなく検証器の受理領域への最短経路だ。同じ問題を10回聞けば10通りの思考連鎖が返る、というのはノイズではなく、目的関数が設計どおりに動いている結果だと説明する。

**Why it matters:** 論文ではなくレンズだ——しかし本フィードが別々に測ってきた現象（ターンごとの best-of-N が買う5–10%の精度、モデルが `(Reward: 5)` の手がかりに97–100%従うこと）を1つの目的の下に接続し、検証可能な帰結を1つ述べている。成功確率は、モデルが多様な経路で答えに着くか1つの暗記ルートで着くかを気にしない。だが分布外の堅牢性は絶対に気にする。

> 「推理モデルに同じ数学問題を10回聞けば、10通りの思考連鎖が返ってくる。推理を答えへ向かうひとつの神秘のプロセスと考えるのではなく、トークン空間における経路探索と考えよう。」

[`🔗 Alex Wang：What objective is reasoning solving?`](https://alexwang.ai/posts/reasoning-as-pathfinding/) · [`🔗 HN ディスカッション`](https://news.ycombinator.com/item?id=50445013)

---

## 26. Mozilla が約2,500万の実 Firefox ユーザーでブラウザフィンガープリンティングを実測——固有識別ユーザーを 75% から 46% に下げる保護を出荷

- **Velocity:** ▮▮ rising
- **Source:** Mozilla + UC San Diego · HN 84 pts · 11月11日（~03:03 UTC+8）
- **Tags:** `privacy` `fingerprinting` `firefox`

Mozilla / UC San Diego / トロント大学の研究のコンパニオンサイト（著者は Tom Ritter、Stefan Savage、Geoffrey Voelker ら）は、例外的な性質を持つフィンガープリンティング測定を発表した。テストサイトのボランティアではなく**約2,500万の Firefox 正式版ユーザー**で走り、テレメトリは個人の追跡が不可能なプライバシー保護技術（**OHTTP**）を使用。論文を運ぶ発見は2つ。固有性は少数の高影響メトリックで駆動されている——50以上のメトリックを取る Fingerprint Pro で固有と見なされたユーザーの **80% は、わずか8メトリックの後で固有になる**。Signifyd は80以上集めても同じ80%に9メトリックで足りる——そしてこの数字は OS ごとの内訳なしには何も意味しない。このデータから構築した緩和策は **Firefox 143 で出荷済み**で、Web 互換性を保ちながら固有識別ユーザーの割合を **75% から 46%** に下げた。サイトは完全な付録、集約データと解析コード（`tomrittervg/fingerprinting_paper_artifacts`——凍結アーティファクト置き場、最終プッシュは 2026-09-09、論文の確定時）、実測母集団と自分を比較するインタラクティブテストを公開している。

**Why it matters:** あなたが読んできたフィンガープリンティングのパーセンテージのほとんどは、自己選択されたテストサイト訪問者から来る。これは*出荷された*緩和策を生んだ母集団規模の測定で、実際に効くメトリックを名指ししている。8メトリックという結果はアンチフィンガープリンティング作業の予算線だ。その8つをランダム化か統一すれば、長い尾はほとんど問題にならない。

> 「ユーザーのフィンガープリントが固有なのは、通常は単一の測定のせいではなく、かといって20や30の測定のせいでもない。ユーザーを固有にするのは少数のメトリックだ。」

[`🔗 Fingerprinting in the Wild（研究サイト）`](https://fingerprinting.study/) · [`🔗 データと解析コード`](https://github.com/tomrittervg/fingerprinting_paper_artifacts) · [`🔗 HN ディスカッション`](https://news.ycombinator.com/item?id=50444684)

---

## 27. Microsoft、macOS 版 Sysinternals Process Explorer を出荷——ネイティブ Swift、プロセステーブルにコード署名検査を内蔵

- **Velocity:** ▮▮ rising
- **Source:** Microsoft · HN 154 pts · 11月10日（~06:30 UTC+8）
- **Tags:** `sysinternals` `macos` `developer-tools`

**microsoft/Procexp-Mac** は Process Explorer のネイティブ macOS 移植——同プラットフォームに降り立った最初の Sysinternals ツールで、Swift・SwiftUI・AppKit で構築され、公開 API（`libproc`、`sysctl`、Mach ホスト統計、Security.framework、IOKit、Metal）の上に立つ。機能リストは Windows 版の翻訳だ。Procexp 風の配色を持つライブプロセスツリー、下ペインのモジュール/ハンドル/スレッド検査、プロセスごとのプロパティ（Image、Performance、Threads、逆引き DNS 付き TCP/IP、Security、Environment、Strings）、GPU を含むシステム全体のパフォーマンスグラフ、Apple Silicon での性能コア対効率コアのラベリング——そして macOS 固有の追加：**署名者・証明書チェーン・Team ID・公证（notarization）状態・SHA-256 を読む Security タブにプロセスごとの VirusTotal 統合**。オプションの特権ヘルパーが cross-user 操作を担う。リポジトリは7月6日作成、11月10日にプッシュ。312スター。macOS 14+ が必要。注意：リポジトリには**LICENSE ファイルがない**——ソースは読めるが、再利用の権利は何も宣言されていない。

**Why it matters:** Sysinternals は約30年間 Windows 専用だった。Electron のラッパーではなくネイティブ移植であることは、ファーストパーティの macOS 診断への本物の投資を示す。プロセステーブルの署名/公证カラムはサプライチェーンネイティブなディテールだ。Mac を監査するとき、未公证で ad-hoc 署名のプロセスこそ浮上させたいものだ。コードは読めるが、LICENSE が着地するまでオープンソースとして扱わないこと。

[`🔗 microsoft/Procexp-Mac`](https://github.com/microsoft/Procexp-Mac) · [`🔗 HN ディスカッション`](https://news.ycombinator.com/item?id=50433216)

---

## 28. DBDelve：Rust+GPUI のデータベースクライアント、起動 1.1 秒（DBeaver は 5.2 秒）——そして自分の最も病的なベンチ行を自ら明示する

- **Velocity:** ▮ steady
- **Source:** Show HN · 120 pts · 11月10日（~00:36 UTC+8）
- **Tags:** `databases` `rust` `gpui`

**ShayanAbbas1/dbdelve**（1,005スター）は **GPUI** 上の Rust で書かれたネイティブ・クロスプラットフォーム DB クライアント——Electron なし、JVM なし。DBeaver 25.3.1 に対する作者のベンチマーク（M1 Pro、5回の中央値）：**起動 1.1 s 対 5.2 s、アイドルメモリ 133 MB 対 606 MB、1,000行クエリ 0.21 s 対 1.96 s、100万行 56 s 対 208 s**——そして100万行のメモリ行（4.9 GB 対 17 GB）には脚注が付く。このケースは意図的に病的なものだ（行リミットを切って、100万行×100列のテーブルを丸ごとメモリに引き込み、DBeaver のヒープ上限は手動で引き上げ）。エンジンは Postgres、MySQL/MariaDB、SQLite、Turso、DuckDB、Snowflake、SQL Server、MongoDB、Redis（Valkey/KeyDB/Dragonfly 含む）、ClickHouse——さらに **ODBC ブリッジ**で Db2、Oracle、SAP HANA、Redshift、BigQuery、Databricks などに届く。DBeaver・TablePlus から接続をインポート、Zed と VS Code からテーマをインポート。Homebrew cask で配布——**未公证**のため、インストールでは隔離フラグを自分で外すよう求められる。

**Why it matters:** GPUI は Zed の外へ逃げ続けている（BUI と GPUI 批判の報告に続き、DBDelve は本フィードの最近の記憶で3つ目の非 Zed アプリだ）。そしてこのベンチ表は自分の最悪の行について珍しいほど正直だ。未公证は運用上の注意だ。ローカルの開発ワークフローには最高だが、エンタープライズ展開はまず「未署名バイナリ」の会話を通る必要がある。

[`🔗 ShayanAbbas1/dbdelve`](https://github.com/ShayanAbbas1/dbdelve) · [`🔗 Show HN ディスカッション`](https://news.ycombinator.com/item?id=50427934)

---

## 29. MeowDisplay は iPhone ミラーリングの逆——iPhone・iPad・Android が Mac のディスプレイになる、オープンソースで

- **Velocity:** ▮ steady
- **Source:** Show HN · 114 pts · 11月10日（~02:39 UTC+8）
- **Tags:** `macos` `display` `open-source`

**MeowDisplay**（raiseCatError/meowdisplay、無料・オープンソース）は、iPhone・iPad・Android 端末・別の Mac を **Mac 用のディスプレイ**に変える——ミラーか拡張かを選べ、ダイレクトタッチ、トラックパッド級の精密操作、Apple Pencil 対応、ユニファイドクリップボード、オーディオ、ピクチャーインピクチャー、リモートアクセスを備える。Mac 2.0 と iOS 2.0 は安定版。**Android 10+ はクローズドテスト中**。バージョン 2.1 は、ペインの場所を取らずにレイアウトの上に浮かぶフローティングウィンドウを予告している。接続は USB（「差せばいい」）または Wi-Fi。

**Why it matters:** Apple の Sidecar と iPhone ミラーリングは、制御を Apple ハードウェアへ向かう一方向に動かす。これはそれを裏返す——見られるマシンは Mac で、画面はスマホ側——そして誰もやっていない Android へも跨ぐ。Mac の統計表示用に古い iPhoneを再利用するような「ただのセカンドスクリーン」のユースケースこそ HN が実際に欲しいもので、Android 経路を信じられるようにするのがオープンソースだ。

[`🔗 MeowDisplay`](https://meowdisplay.app/) · [`🔗 raiseCatError/meowdisplay`](https://github.com/raiseCatError/meowdisplay) · [`🔗 Show HN ディスカッション`](https://news.ycombinator.com/item?id=50429636)

---

## 30. Someone Was Here：あなたの不在中に Mac を使った人を撮影し、iPhone に伝える

- **Velocity:** ▮ steady
- **Source:** Show HN · 113 pts · 11月10日（~02:50 UTC+8）
- **Tags:** `macos` `security` `privacy`

**Someone Was Here**（無料、Mac App Store、macOS 14+）は、不在中に Mac を使う者を撮影する。アイドル後にマシンが使われた、ロック画面が試された、ロック解除された——アプリはその人物の写真を、時刻、入り方、滞在時間つきで記録する。2分間のオンデバイス設定であなたの顔を学び、あなたについては「静かにしている」。写真は**あなた自身の iCloud 経由で数秒以内に無料の iPhone アプリへ届く**。Pushover、ntfy、Telegram、webhook でも可。ランディングページは同意の姿勢を明示している。すべての写真でカメラライトが点く、写真は Mac の上に留まる、アカウント不要、広告とトラッキングはゼロ、メニューバーに見える形で常駐——「スペースを共有するなら、そこにいることを伝えろ。」

**Why it matters:** これは昔からの「ウェブカム罠」を、開示のディテールを明示したまま製品化したものだ——カメラライトは常に点灯、顔マッチングはオンデバイス、隠し撮りなし。ntfy/webhook 対応が汎用できる部分だ。どんな通知パイプライン（今週もう一つの HN のテーマであるローカルファーストの Home Assistant 構成を含む）でも、ベンダーアプリの代わりにイベントを受け取れる。

[`🔗 Someone Was Here`](https://someonewashere.app/) · [`🔗 Show HN ディスカッション`](https://news.ycombinator.com/item?id=50429812)

---

## 31. STE80 Humanizer：Karpathy の「ASD-STE100 への道の 80%」という書き方の手法が、agent skill として梱包される

- **Velocity:** ▮ steady
- **Source:** Show HN · 105 pts · 11月10日（~02:05 UTC+8）
- **Tags:** `writing` `agent-skills` `asd-ste100`

**Dodaios/ste80-humanizer**（322スター、MIT、11月9日作成）は、テキストから AI 臭を消す2パスの agent skill だ。パス1は Wikipedia の「Signs of AI writing」が挙げる **26の特徴**（blader/humanizer のカタログ）を剥ぎ取る——「Great question!」、「not just X」、芝居がかった締め。パス2は文を **ASD-STE100**——航空機整備マニュアルの制御英語——へ **80%** まで組み直す。Andrej Karpathy の10月2日の助言による。完全な STE は「check」/「test」の動詞用法と「may」/「should」を禁じるため、skill は自然な語彙を保ちながら構造だけを強制する——1文1アイデア、能動態、指示1つにつき20語。README はこのジャンルでは珍しいことをする。**自分のソースをファクトチェックした**のだ。Karpathy の STE 概要グラフィックは ASD-STE100 第9版に対して誤りがある（「approximately」は approved、「TEST」は名詞のみ、「in order to」の項目はない）と注記し、skill は第9版に従う。「AI 検出器を通すことが目標ではない」とも明言している。

**Why it matters:** 手法がツイートから脱してバージョン管理され CI 検証されるアーティファクトになるのは、「skills がプロンプトエンジニアリングの口伝の配布フォーマットになりつつある」ことのまた一つの証拠だ。そして自分の上流ソースを訂正するのは、skills エコシステムがほぼ欠いている衛生習慣だ。README の before/after の実例が正直な部分だ。パス1だけでは「語はきれい、だが文はまだ重い」。

[`🔗 Dodaios/ste80-humanizer`](https://github.com/Dodaios/ste80-humanizer) · [`🔗 Show HN ディスカッション`](https://news.ycombinator.com/item?id=50429144)

---

## 32. 16個の LLM が TIS-100 をブラインドでプレイ——十年の人間リーダーボードに133の新フロンティア点を打ち立てた

- **Velocity:** ▮ steady
- **Source:** TIS-100 Bench · HN 22 pts · 11月11日（~08:37 UTC+8）
- **Tags:** `benchmarks` `llm` `pareto-frontier`

**TIS-100 Bench** は、Zachtronics のアセンブリパズルゲームとそのマニュアルを16個の LLM に渡し、十年の歴史を持つコミュニティリーダーボードは隠し、各モデルに1回だけの採点機会（pass@1、パズルごとに10–45分）を与え、全 **55パズル**（ゲーム内47＋コミュニティ大会8）をやらせた。結果：**55のうち18パズルで133の新しいパレートフロンティア点、さらに3つのサイクル数の絶対記録**。TIS-100 は解をサイクル数・ノード数・命令数で採点する——3軸のトレードオフで、各パズルには唯一の最適解ではなく「良い解のフロンティア」がある——これこそがベンチマークを面白くする理由だ。「あるスコアを改善すると別のスコアが悪くなる」。数日のうちに、人間のプレイヤーはモデルのプログラムを拾い上げ、そのほとんどをさらに改良した。

**Why it matters:** 実在のプログラミングパズルの*一部の*軸で、10年にわたる人間の蓄積最適化を機械が押し超え、人間が即座に恩返しした——そういう事例は稀だ。移転可能な部分はパレートフロンティアの枠組みだ。これはモデルの解空間の*形状*を測るもので、合格/不合格だけを測るコーディングベンチマークが平らに潰してしまうものを測る。

> 「数日のうちに、プレイヤーはモデルのプログラムを拾い上げ、そのほとんどをさらに改良した。」

[`🔗 TIS-100 Bench`](https://tis-100.wincon.dev/) · [`🔗 HN ディスカッション`](https://news.ycombinator.com/item?id=50448340)

---

## 33. LingBot-Touch：圧阻・磁気・視触覚の3センサーファミリーを跨ぐ単一の触覚基盤モデル

- **Velocity:** ▮ steady
- **Source:** arXiv 2611.12806 · HF 日次ボード1位（94アップボート） · 11月6日投稿
- **Tags:** `robotics` `tactile` `foundation-model`

**LingBot-Touch**（Hugging Face の11月10日日次ボードのトップ）は、ロボットの触覚データを小さく留め続けている断片化を狙う。触覚センサーのタイプごと——圧阻、磁気、視触覚——物理が異なり、互いにプールできないデータセットを各々抱えている。モデルは**3つのセンサーファミリーに跨る統一表現**を学び、新しいタイプにも拡張可能だ。出てくる触覚トークンは**プラグアンドプレイ**：拡散ポリシーから **π0.5** や LingBot-VLA のような vision-language-action モデルまで、パラダイムを跨ぐポリシーモデルにそのまま落ち込み、「操作の器用さを一貫して高める」。実験はシミュレーションと複数ハードウェアプラットフォームでの実機展開に及び、計算効率への配慮も明示的だ。

**Why it matters:** 触覚はロボット学習においてまだデータセットの貧しいモダリティで、センサーアグノスティックな表現は、この分野の小さな異種データセットを視覚と言語がそうしたようにプールするための前提条件だ。注視すべき主張は統合の1つだ。拡散ポリシーと VLA の*両方*を改善するトークンは、この表現が実際の仕事をしていることを示唆し、単にひとつのポリシーファミリーの評価に適合しているだけではないことを示す。

[`🔗 arXiv 2611.12806`](https://arxiv.org/abs/2611.12806) · [`🔗 Hugging Face 論文ページ`](https://huggingface.co/papers/2611.12806)

---

## 34. ホワイトハウス、合成 DNA の自己証明を認証サプライヤーによるスクリーニングに置き換える——90/160/250/340日の時計

- **Velocity:** ▮ steady
- **Source:** ホワイトハウス NSTM-6 · HN 10 pts（新しい） · 11月11日（~10:57 UTC+8）
- **Tags:** `biosecurity` `policy` `synthetic-biology**

**核酸合成スクリーニング国家政策** NSTM-6 が、大統領令14292号に基づき、国家安全保障アドバイザー Marco Rubio と OSTP 長官 Michael Kratsios の署名で11月5日に発行された（HN は今朝取り上げた）。2024年のフレームワークを置き換えるものだ。メモ自身の言葉では、旧来の指針は「独立検証ではなく自己証明に依存してきた」。そして**連邦の生命科学資金の受給者すべてに対し、顧客と注文された配列の正当性を検証する認証サプライヤーからのみ、合成核酸と卓上（benchtop）合成装置を調達すること**を要求する。時計はこうだ。**NIST が90日以内に標準と試験プロトコルを発行**。HHS が**160日以内**に最初の遵守サプライヤーリストを公開。連邦資金の顧客は**250日以内**にすべての合成調達を認証サプライヤー経由に、**340日以内**にすべての卓上装置をそれに移す必要がある。文言は AI に強く賭けている。メモは「スーパーインテリジェンス（SI）」と生物学の収束を軸に組み立てられ、"Powered by SI, screening will shift from list-based to risk-based"（SI に駆動され、スクリーニングはリストベースからリスクベースへ移行する）と述べている。

**Why it matters:** 配列スクリーニングツール、合成サービス、湿式ラボ調達ソフトを作る人にとって、これは具体的なコンプライアンスの締切だ。NIST は標準を立てるのに90日しかなく、政策はスクリーニング層を AI による検証に明示的に賭けている。読むべき機構の変更はここだ。自己証明から独立したサプライヤーレベルの検証へ、そして執行点としての政府リスト。

> 「現行の連邦指針は独立検証ではなく自己証明に依存しており、責任ある米国企業が、バイオセキュリティのセーフガードを迂回して経済的利得を得る企業と競争することを強いてきた。」

[`🔗 NSTM-6 政策（PDF）`](https://www.whitehouse.gov/wp-content/uploads/2026/11/NSTM-6-NASS-Policy.pdf) · [`🔗 HN ディスカッション`](https://news.ycombinator.com/item?id=50449275)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-11T04:50:47Z |
| Items | 34 |
| Sources tracked | 28（Hacker News、GitHub Trending、NVD、CISA KEV、MSRC CVRF、arXiv、Hugging Face、ベンダーブログ、セキュリティアドバイザリ） |
| Update schedule | 04:03, 12:03, 20:03 UTC+8（1 日 3 回） |
| Ranking | 速度加重（即時性 × エンゲージメント加速度 × 情報源の権威） |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[前日](2026-11-10.md) · [生 .md](https://trending.md/jp/feed/2026-11-11.md) · [アーカイブ](../archive/)
