---
date: 2026-11-11
updated: 2026-11-11T12:40:05Z
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
- **Tags:** `biosecurity` `policy` `synthetic-biology`

**核酸合成スクリーニング国家政策** NSTM-6 が、大統領令14292号に基づき、国家安全保障アドバイザー Marco Rubio と OSTP 長官 Michael Kratsios の署名で11月5日に発行された（HN は今朝取り上げた）。2024年のフレームワークを置き換えるものだ。メモ自身の言葉では、旧来の指針は「独立検証ではなく自己証明に依存してきた」。そして**連邦の生命科学資金の受給者すべてに対し、顧客と注文された配列の正当性を検証する認証サプライヤーからのみ、合成核酸と卓上（benchtop）合成装置を調達すること**を要求する。時計はこうだ。**NIST が90日以内に標準と試験プロトコルを発行**。HHS が**160日以内**に最初の遵守サプライヤーリストを公開。連邦資金の顧客は**250日以内**にすべての合成調達を認証サプライヤー経由に、**340日以内**にすべての卓上装置をそれに移す必要がある。文言は AI に強く賭けている。メモは「スーパーインテリジェンス（SI）」と生物学の収束を軸に組み立てられ、"Powered by SI, screening will shift from list-based to risk-based"（SI に駆動され、スクリーニングはリストベースからリスクベースへ移行する）と述べている。

**Why it matters:** 配列スクリーニングツール、合成サービス、湿式ラボ調達ソフトを作る人にとって、これは具体的なコンプライアンスの締切だ。NIST は標準を立てるのに90日しかなく、政策はスクリーニング層を AI による検証に明示的に賭けている。読むべき機構の変更はここだ。自己証明から独立したサプライヤーレベルの検証へ、そして執行点としての政府リスト。

> 「現行の連邦指針は独立検証ではなく自己証明に依存しており、責任ある米国企業が、バイオセキュリティのセーフガードを迂回して経済的利得を得る企業と競争することを強いてきた。」

[`🔗 NSTM-6 政策（PDF）`](https://www.whitehouse.gov/wp-content/uploads/2026/11/NSTM-6-NASS-Policy.pdf) · [`🔗 HN ディスカッション`](https://news.ycombinator.com/item?id=50449275)

---

## 35. React Server Components に2つ目の未認証 RCE——10月14日に修正済み、CVE レコードの公開は11月10日

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub Advisory（CNA）+ NVD · CVSS 4.0 9.5 · レコード 11月10日（~07:17 UTC+8）
- **Tags:** `react` `rce` `supply-chain`

**CVE-2026-126187**（GitHub CNA、2026-11-10 23:17Z 公開、ステータス `Received`）。`react-server-dom-webpack`、`-parcel`、`-turbopack` の3パッケージに、**19.0.0–19.0.8、19.1.0–19.1.9、19.2.0–19.2.8、19.3.0** のバージョンで「React Server Components をサポートするフレームワークを狙った細工済みペイロードによる、未認証のリモートコード実行」の脆弱性。アドバイザリ（GHSA-xqc2-xf4c-x3h3、severity Critical、CVSS 4.0 **9.5**——`AV:N/AC:L/AT:P/PR:N/UI:N/VC:H/VI:H/VA:H/SC:H/SI:H/SA:N`）はスコープを強く限定している。「これは、レスポンスが複数の型付き配列と攻撃者制御の値を同時に運ぶ、極めて稀なケースにのみ影響する」。サーバーを使わない React コードのアプリや、RSC 対応フレームワーク・バンドラ・プラグインを使わないアプリは影響を受けない。修正は **19.0.9、19.1.10、19.2.9、19.3.1** で、npm の公開タイムスタンプによれば4バージョンすべて **2026-10-14** にリリースされている——CVE レコードがスキャナから見えるようになるより4週間早い。これは RSC ペイロードデコーダーファミリーで1年足らずでの2つ目の未認証 RCE だ（CVE-2025-55182、2025年12月）。本実行時点で react.dev のブログには関連記事がなく、アドバイザリとレコードそのものが開示である。参照先は `github.com/react/react`——React Foundation が2月に Linux Foundation の下へ移ってからのオーグホーム。

**Why it matters:** RSC flight ペイロードデコーダーは再発型の RCE 表面になりつつある——11か月で2回、いずれもこれらのパッケージを推移的にバンドルする Next.js 系フレームワーク経由で到達できる。運用面の教訓は稀性条項ではなくラグの方だ。修正版は10月14日から npm にあったので、露出を決めるのは緊急性ではなく依存解決だ。≥ 19.0.9 / 19.1.10 / 19.2.9 / 19.3.1 を固定し、どちら側にいるかは lockfile に教えてもらえ。

[`🔗 NVD：CVE-2026-126187`](https://nvd.nist.gov/vuln/detail/CVE-2026-126187) · [`🔗 GHSA-xqc2-xf4c-x3h3`](https://github.com/react/react/security/advisories/GHSA-xqc2-xf4c-x3h3)

---

## 36. Apple の Harbor：Mac をプライベート AI 推論サーバーに変えるリークされた Mac アプリ——Thunderbolt 5 で複数 Mac をプーリング

- **Velocity:** ▮▮▮ trending
- **Source:** 9to5Mac · HN 297 pts · 11月11日（~05:25 UTC+8）
- **Tags:** `apple` `local-ai` `inference`

リーカー Aaron Perris が、未発表の Apple Mac アプリ **Harbor** の証拠を出した。リーク文言そのまま。「Harbor turns your Mac into a private AI inference server. Run open-weight models locally on Apple silicon—your data never leaves your hardware, and nothing reaches the cloud. Connect multiple Mac computers over Thunderbolt 5 to pool…」ユニファイドメモリをプーリングし、1台では捌けない大きなモデルと高い同時実行性を可能にする。"ツイートは、Harbor が現在 Claris ブランドの下でプライベートプレビュー中だと締めている——Claris、FileMaker の背景にある Apple のソフトウェアブランドだ。9to5Mac はこれを、今年 Mac Studio や Mac mini がオープンウェイトモデル実行で人気を博した「ローカル AI ボックスとしての Mac」という用途に、Apple がさらに腰を据える動きと読む。これはシステムレベルの証拠であって発表ではない。アプリのスクリーンショットも日付もバージョンもなく、Apple は何も確認していない。

**Why it matters:** Thunderbolt 5 による複数 Mac のプーリングは、より多くのユニファイドメモリをひとつのモデルの後ろにどう置くかという、昔からの問いへの初のファーストパーティ製の答えになる——今週の llama.cpp の NCCL マルチノード作業や llama-modchip の CPU オフロード実験が攻めていたのは同じ問題だ。ニュースはポジショニングの細部だ。*推論サーバー*はインフラの言語であってコンシューマーチャットアプリのそれではない。これは現在ホストを務めている Ollama/LM Studio 層との直接競合を意味する。Apple が出荷または確認するまで、機能リストはリークの文言として扱うこと。

[`🔗 9to5Mac：Apple has new Mac app coming`](https://9to5mac.com/2026/11/10/apple-has-new-mac-app-coming-to-make-running-local-ai-models-easy/) · [`🔗 HN ディスカッション`](https://news.ycombinator.com/item?id=50446520)

---

## 37. 「AI の使用は壊れやすいコードベースを生成する」——Meta エンジニアによる AI クォータの内部証言と、4つの破綻パターン

- **Velocity:** ▮▮▮ trending
- **Source:** Evan X. Merz · HN 582 pts · 11月10日（~18:25 UTC+8）
- **Tags:** `ai-coding` `code-quality` `analysis`

Evan X. Merz のエッセイは今週の HN で最もポイントの高い記事で、最初の段落がすでにニュースだ。5月に Meta をレイオフされた理由の一つを「同僚の何人かより、AI/LLM をコーディングツールとして採用することへの抵抗が少し強かったからではないか」と推測しつつ、クォータを赤裸々に書いている。「あそこの最後の数か月、私が書いたコードの少なくとも90%は AI 生成だった。それがまともな評価を得るための最低ラインだった」。生産性の主張は測定済みで、修辞ではない。「AI は私の書くコード量を10倍にはしなかった。2倍にすらしなかった」。具体 specimen はこれだ。「チームで最も優れたプログラマーの一人が、`:hover` セレクタではなく JavaScript イベントでマウスオーバー効果を実装したコードをマージしようとしていた」。現在は「別の大手テック企業」で「それが今日の期待値だから」と100% AI 生成に切り替えた彼が、この実践がコードベースを脆くする4つの道を列挙する。軸となる命題は一つ。「AI はコンテキストウィンドウに収まる問題を非常にうまく解くが、その比較的小さな枠では理解できない長期的な問題には完全に盲目的だ」。

**Why it matters:** これはクォータシステムの内部からの一次証言だ。「まともな評価のための最低ライン」という細部が、エンタープライズ規模で AI 使用メトリクスが実際に何を測っているかを定量化する。今週の同じ主張の計測版（コーディングエージェントはタスクの95%を完了するが安全に完了するのは37%、未完了タスクの交互配置で11.5ポイント失う）と並べて読める。それは研究ではなく逸話だ——しかし `:hover` の例は転送可能な検査ターゲットだ。スタイル上はもっともらしく、機能的には誤りで、しかもレビューもテストも通るコード。

[`🔗 Evan X. Merz：AI usage generates a fragile codebase`](https://evanxmerz.com/post/ai-usage-generates-a-fragile-codebase/) · [`🔗 HN ディスカッション`](https://news.ycombinator.com/item?id=50438318)

---

## 38. Adobe のパッチチューズデー：110レコード——Experience Manager に9.9が4件、Adobe Connect に10.0が5件

- **Velocity:** ▮▮ rising
- **Source:** Adobe PSIRT（APSB26-189/191）+ NVD · 11月10–11日
- **Tags:** `adobe` `cve` `patch-tuesday`

NVD のパッチチューズデーウィンドウには **`psirt@adobe.com` からの110レコード**（測定区間 11月10日 04:30Z → 11日 12:00Z）が流れ込んだ——採点の重みでは Microsoft の1,094に次ぐ。**21件が ≥9.0で、同じウィンドウの Microsoft の25件に次ぐ**（Google の dsap 158レコードに高スコアはゼロ）、スコアはすべて CNA 自身のものだ。**APSB26-189（Experience Manager）**は9.9を4件出している。CVE-2026-113579 と CVE-2026-113580（コードインジェクション——「低権限の攻撃者がこの脆弱性を悪用して任意コードを実行できる。悪用にユーザー操作は不要。スコープは変更済み」）、CVE-2026-114371 と CVE-2026-119017（不適切な認可による任意コード実行）。**APSB26-191（Adobe Connect**、11月10日公開、Priority 2、**12.12 以前**が影響対象）はさらに刺さる文書だ。**10.0 の CVE が5件**——SSRF（CVE-2026-121356、ベクトル `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:N`）、パストラバーサル（CVE-2026-121351）、不適切な認可（CVE-2026-121352）、CRLF インジェクション（CVE-2026-121353）、そして2つ目の SSRF（CVE-2026-121889）——に続き、9.9 の棚（SQL インジェクション、コードインジェクション、XXE、パストラバーサル）。修正ビルドは **12.12.a / 12.11.i / 12.10.f / 12.9.a / 12.8.a**。Adobe は「本アップデートで対処された問題のいずれについても in-the-wild の悪用は把握していない」と述べている。この波は After Effects と Audition（8.6–8.7）にも及ぶ。サンプルしたレコードは NVD 上 `Received`。

**Why it matters:** 多くの企業が自分たちが所有していることすら忘れている会議製品が、1つのアドバイザリにベクトル上は事前認証不要の10.0を5つ抱えている——そしてパッチチューズデーのトリアージが Microsoft のリストで止まるなら、そのどれも視野に入らない。Priority 2 のラベルが5つの10.0の隣に座る違和感。定性評価と CVSS セットが緊急性について食い違っているのは、今月の Microsoft の波が見せたのと同じ逆転だ（より高スコアの権限昇格42件のうち、悪用されていたのは Moderate 6.5 の1件）。

[`🔗 APSB26-191（Adobe Connect）`](https://www.adobe.com/trust/security/products/connect/apsb26-191.html) · [`🔗 APSB26-189（Experience Manager）`](https://www.adobe.com/trust/security/products/experience-manager/apsb26-189.html)

---

## 39. Chrome、報告から3日で in-the-wild の XML Use-After-Free を修正——CISA が翌日に KEV 掲載

- **Velocity:** ▮▮ rising
- **Source:** Chrome Releases + CISA KEV · 修正 11月9日、KEV 掲載 11月10日
- **Tags:** `chrome` `kev` `in-the-wild`

月曜のデスクトップ安定版アップデート（**157.0.8103.50/.51**、11月9日）には9件のセキュリティ修正が入った——そしてそれらの重みを並べ替える一文が1つ。**「Google is aware that an exploit for CVE-2026-125350 exists in the wild.」**（Google は CVE-2026-125350 の悪用が in-the-wild で存在することを認知している。）CVE-2026-125350 は XML における Use-After-Free で、**匿名の報告者が 2026-11-06 に報告**（報奨金：TBD）——報告から3日で修正され、詳細は制限付き、そして **CISA が11月10日に KEV へ追加**した。NVD のレコードは `Analyzed`。そこにある8.8は CISA-ADP エンリッチメント（唯一のメトリクス——NVD 自身のスコアではない）。同じリリースでは **CVE-2026-125347**（FileSystem の不適切な認可）も修正。ADP 採点のレコードによれば9.6で、「リモートの攻撃者がソーシャルエンジニアリングを利用してサンドボックス**外**で任意コードを実行できるようにしていた」（still `Undergoing Analysis`）。ほかに V8 の型混同、GPU の Out-of-bounds 書き込み、Compositing のバッファオーバーフロー、WebGL と GPU の未初期化リソース（すべて High。Medium 2件はどちらも GPU）。

**Why it matters:** 先週の213件修正の Chrome 157 の波に続く緊急パッチだ。そしてパターンは一貫している。悪用されていたのは、パッチデーの直前に匿名で報告され、公開詳細が最も少ないバグだった。サンドボックス脱出（125347）と悪用確認済みのサンドボックス内 RCE（125350）が同じ月曜リリースに乗った以上、≤ 157.0.8103.51 は今週、どこでも離れるべきバージョンラインだ。

[`🔗 Chrome Releases：Stable Channel Update for Desktop`](https://chromereleases.googleblog.com/2026/11/stable-channel-update-for-desktop_018223192.html) · [`🔗 NVD：CVE-2026-125350`](https://nvd.nist.gov/vuln/detail/CVE-2026-125350)

---

## 40. Meta Ray-Ban グラスへのハッキング：OTA フックでファームウェア取得、グラス上への自己署名 APK、そして修正を打ち破る MobileConfig の1バイト反転

- **Velocity:** ▮▮ rising
- **Source:** p0pcycle（pamoutaf）· HN 125 pts · 11月10日（スレッド ~01:19 UTC+8、11月8日）
- **Tags:** `hardware-hacking` `android` `vuln-research`

記事は、借りたスマートグラスでの全チェーンを歩む。ファームウェアは Meta 自身のパイプラインから来た。Meta AI Android アプリを JADX でリバースして OTA フローを暴露——`OTAArtifactInfo` に Frida フックを挂けて CDN のダウンロード URL を表示させ、GraphQL 入力 `device_firmware_full_update_only` を true に反転させて**フル**アップデートを取得。`payload.bin` を含む Android イメージで、payload-dumper でダンプしてマウントした。コード実行には Meta の開発者用経路を使った。DAT SDK（Device Access Toolkit）の APK はスマホアプリがグラスへプッシュするものだが、「ファームウェア126まで、ファームウェアは DAT APK が Meta によって署名されているかを検証していなかった」——そこで Frida のスワップで自己署名 APK を植えた。Meta のサンプルアプリが DAT セッションを開く。`startDwaReadinessProbe()` をフックしてセッションを切られるのを防いだ後、植えたアプリが Wi-Fi Direct サブネット（192.168.49.x）の **TCP 31337** にシェルをバインド。`nc` でグラスに繋ぐと uid 10097 が返ってきた。Meta はその後、MobileConfig によって署名検証を行うファームウェア127を出した——しかし設定はペアリングされたスマホ経由で Airship を通ってグラスに届き、グラスは構造的な正当性のみ検証する。「改ざんされていないこと」は検証しない。そこで `0.mctable` の1バイト（0x80→0x00）を反転すれば検証は無効化できる。「We're soooo back。」Meta のバグバウンティに報告済み。投稿の承認は「今は修正されていると仮定してくれる」。`ToneGenerator` のビープによるデバッグ（「Beep is the new printf」）と、報奨金の揉め事（「we settled (ok there was no settling but I agreed to the new payout)」）も記録している。

**Why it matters:** 一般化できる教訓が3つある。開発者/デバッグ面（DAT）が攻撃表面だった——またか。デバイスを堅牢化する設定が、デバイスが改ざん検証しない経路で届く——これはあらゆる管理対象デバイスが共有するパターンだ。そして報奨金の摩擦（スレッドによれば「ウェアラブル部門ではなかった」）は、次の研究者が公開するかどうかを決める経済学だ。

[`🔗 p0pcycle：Hacking the Meta Ray-Ban smartglasses`](https://p0pcycle.com/2026/11/06/hacking-the-meta-ray-ban-smartglasses/) · [`🔗 HN ディスカッション`](https://news.ycombinator.com/item?id=50406224)

---

## 41. Qwen4 が来る——Qwen4-Max が Alibaba の Token Plan でプレビュー開始、重みもベンチマークもなし

- **Velocity:** ▮▮ rising
- **Source:** Alibaba Qwen（公式発表）· HN 43 pts · 11月11日（~10:33 UTC+8）
- **Tags:** `qwen` `model-release` `alibaba`

Qwen の公式アカウントが次世代を発表した。「Qwen4 is coming. Deeper knowledge. Richer world understanding. Stronger coding and agentic capabilities. Built for real-world tasks — from complex coding and knowledge work to front-end builds and professional software workflows. **Qwen4-Max is now in preview on Alibaba's Token Plan**」。QwenWork、Qoder、Qwen アプリ、QwenStudio で早期アクセスが可能。これが開示の全部だ——パラメータ数なし、ベンチマークカードなし、重みなし、Token Plan の言及以外の API 料金もない。本実行時点で qwen.ai のブログは JS シェルで、添付の記事はない。

**Why it matters:** これは Qwen4 の世代が存在することの初の公式確認だ。そのオープンウェイトの系譜は、今年のオープンエコシステム成果の大半を支えてきた（Figma などがポストトレーニングした Qwen 3.8 27B チェックポイントを含む）。Max が商用プランでプレビュー先行なのは、このファミリーの最近のパターン——発表、ホステッドアクセス、重みは後——を踏襲する。直近の Hy4 のケースでは重みは最後まで保留されたままだった。Qwen4-Max がオープンウェイトの道を辿るかどうか。それが、これらのモデルをトレンドに押し上げてきた人々にとって唯一重要な問いだ。

[`🔗 Qwen on X：Qwen4-Max preview`](https://x.com/Alibaba_Qwen/status/2120335993643684315) · [`🔗 HN ディスカッション`](https://news.ycombinator.com/item?id=50449130)

---

## 42. Ginux、ブータブルな Rust カーネルからユーザースペースカーネルへ旋回——AI がカーネルを作った実験が、自分の限界を名指しする

- **Velocity:** ▮▮ rising
- **Source:** gmkurtzer/ginux · HN 83 pts · 11月11日（~13:25 UTC+8）
- **Tags:** `linux` `kernels` `agents`

Rocky Linux の創設者で Singularity の作者でもある Greg Kurtzer が、**ginux** にピボットの説明を発表した。プロジェクトは「UEFI から直接ブートし、Rocky Linux 10 のユーザースペースを実行する独立した Rust カーネル」として始まった。「その研究フェーズは完了した」（ソースは `bootable-kernel` ブランチと `bootable-kernel-final` タグに永久保存）。「以降の開発はここではユーザースペースカーネルとして続く」——「普通の Linux プロセスとして実行され、管理対象ワークロードとホストカーネルの間に明示的でバージョン付けされたコントラクトを置く」。README は、実験が何を証明したかに異例なほど率直だ。「アーキテクチャ、ゲート、実行可能テストを通じて経験豊富な人間に導かれた AI コーディングエージェントは、意味のある Linux ユーザースペースを実行できる新しいカーネルを構築できた。それは同時に、その結果の限界も明白にした」——「Linux はソースコードよりはるかに多い。それは安定したインターフェースであり、開発プロセスであり、グローバルなコミュニティであり、ベンダーとハードウェアのアライメントであり、数十年の互換性と運用経験だ。カーネルのメカニズムを再実装しても、その生態系は再現されない」。HN のコメント欄はすぐに User-mode Linux を祖先として持ち出した。リポジトリは Apache-2.0、10月11日作成、今日もプッシュされている。

**Why it matters:** ひとつの項目に2つの物語がある。エージェント能力論にとっては、スコープ規律を備えた実証例だ。エージェントは人間のアーキテクチャ的指導の下で実際にブータブルなカーネルを作った——そしてプロジェクトはその後、重要な方の勝利を辞退した（「Linux と競争することは決して目標ではなかった」）。システム屋にとっては、ワークロードとホストカーネルの間のバージョン付けされたコントラクトは実に興味深いアイソレーションプリミティブで、スレッドがすでに問いている開いた問いは、実践で namespaces や UML とどこが違うのか、だ。

[`🔗 gmkurtzer/ginux`](https://github.com/gmkurtzer/ginux) · [`🔗 HN ディスカッション`](https://news.ycombinator.com/item?id=50450007)

---

## 43. 最難関の tarball：ひとつのアーカイブを、日常使いのツールが8通りに展開する

- **Velocity:** ▮▮ rising
- **Source:** Harmen Stoppels · HN 150 pts · 11月10日（~23:00 UTC+8）
- **Tags:** `tar` `interop` `spec-ambiguity`

Harmen Stoppels は、GNU tar の呼び出し一回で、どの実装が読むかで意味が変わるアーカイブを作った。トリックはこうだ。`file`、`./file`（ハードリンクとして格納）、`empty` を順にアーカイブし、2番目のエントリのユニークなパスを利用してハードリンクを `café` にリネームし、ハードリンクに `size=512` の pax レコードを加える。512 は tar ヘッダのサイズそのものなので、すべての読み手は判断を迫られる。その512バイトはハードリンクのデータなのか、次のメンバーのヘッダなのか。POSIX はハードリンクのデータブロックが pax アーカイブに「含まれてもよい」と言い、その含意は不明瞭だ。結果：GNU tar、BusyBox、Python、Go、Perl は3ファイルすべてを合理的に展開する。**bsdtar——macOS のシステム tar——は512バイトをハードリンクの中に書き込み、`file` は最終的に `empty` の tar ヘッダを格納する**。7-Zip、node-tar、tar-fs、Rust の tar は前方へスキップして `empty` を静かに落とす。Java の Commons Compress は「データとしてのヘッダ」を格納する別ファイルを作る。PHP の PharData、RubyGems（`PaxHeaders` ディレクトリを作る）、R（サイズを `empty` に誤適用——512個のヌルバイト）、Haskell（`café` を `cafÃ©` に化けさせる）はそれぞれ独自の読み方を見つける。そして .NET、Julia、uv はアーカイブを拒否する——「技術的には POSIX 非準拠だとしても、これができる最善のことだと私は信じている」。これは彼の tar-minefield スイートにある **134 の厄介な tarball** のひとつだ（ドキュメントは stoppels.ch/tar、Zenodo DOI あり）。「実装が tar アーカイブを同じように展開することを保証する」という目的で作られている。

**Why it matters:** tar 展開の不一致はセキュリティ問題だと minefield の README は言う。アーカイブツーリングはパストラバーサルと展開混乱バグの棲み処で、このケースが見せるのは、同じバイト列が macOS と Linux と自分の言語のライブラリで異なるファイルを意味しうることだ。アーカイブ処理コードを書くすべての人にとって、真似する価値のある振る舞いは、拒否する側のそれだ。

[`🔗 Stoppels：The hardest tarball?`](https://stoppels.ch/2026/11/07/the-hardest-tarball.html) · [`🔗 haampie/tar-minefield`](https://github.com/haampie/tar-minefield)

---

## 44. Arista の26レコード投下：9.8 の BGP クラッシュ——そして C-260/C-250 アクセスポイントにフリート共通の静的ファームウェア鍵が出荷されていた

- **Velocity:** ▮ steady
- **Source:** Arista PSIRT + NVD · 26 レコード · 11月10–11日
- **Tags:** `arista` `network-security` `cve`

`psirt@arista.com` は同じ NVD ウィンドウに **26 レコード**を入れた。**5件が ≥9.0**、すべて `Received` でスコアは CNA 自身のものだ。サプライチェーンに関心がある者向けのヘッドラインは **CVE-2026-102166（9.4）**。「Arista C-260 および C-250 アクセスポイントは、ファームウェアイメージ検証と SSLP 認証に使われる、フリート共通の静的暗号鍵を出荷している。これらの鍵にアクセスできる攻撃者は、検証チェックを通過する改変ファームウェアを作れる」——そしてその2モデルに限定していると明示している（「他のアクセスポイントモデルはセキュアブート付きのデジタル署名済みアップグレードイメージを強制しており、影響を受けない」）。隣のルーティング機器のバッチ：**CVE-2026-121289（9.8**、未認証の細工済み BGP パケットで BGP エージェントがクラッシュ**)**、CVE-2026-121367（9.6、RIPv2）、CVE-2026-121370 と CVE-2026-121295（9.2、PTP と S-BFD）、CVE-2026-120982 と CVE-2026-121371（8.7、BGP と eAPI HTTP）、CVE-2026-121368（8.9、BFD keyed MD5/SHA1）、CVE-2026-121287（8.8、RIPv2 隣接ネットワーク）。

**Why it matters:** ファームウェア検証における静的鍵は、サプライチェーン脅威を永続化するクラスだ——検証を通過する改変ファームウェアは、構造的に再起動後も生き残る。スコープを限定する一文は実質的な仕事をしている（セキュアブートのモデルは影響を受けない）。それはキャンパスのアクセスポイント群を再イメージする前に確認すべき文と exactly 一致する。

[`🔗 Arista Security Advisory 0227（静的鍵）`](https://www.arista.com/en/support/advisories-notices/security-advisory/25049-security-advisory-0227) · [`🔗 NVD：CVE-2026-102166`](https://nvd.nist.gov/vuln/detail/CVE-2026-102166)

---

## 45. 電圧グリッチングで CMP 170HX マイニングカードを A100-80G に変える——SM 数はリテール A100 より多い

- **Velocity:** ▮ steady
- **Source:** blog.kate.land · HN 新着 · 11月11日（~18:48 UTC+8）
- **Tags:** `hardware` `voltage-glitching` `gpu`

GA100 ダイ上の電圧故障注入脆弱性「操作者が任意のフューズを焼けるようにするもの」。作者は CMP 170HX マイニングカードを「実質的に A100-80G」に変換した——そしてロック解除されたカードは「リテール A100 より**約1.2倍速い**。すべての機能 SM が有効化されているため（約120〜126、ダイのくじ引き次第）、NVIDIA が量産 A100 全体で選んだ歩留まり安全側の108 SM ではなく」。CMP で無効化された機能も同じ方法でアンロック可能だ——NVLink、PCIe Gen4、NVJPG、NVDEC、MIG（最後の3つは未検証）。記事はハードウェア制限モデル（「fuseless fuses」、floorsweeping）、フューズ焼きの手順、そして3つの故障注入ステージ——すべてのフューズがゼロに感知される段階、RIR 読み取りが乱される段階、そして決める「Goldilock's glitch」——を記録している。投稿の nvidia-smi 出力は 81,920 MiB のデバイス2枚と NVLink トポロジ（NV12）を示す。

**Why it matters:** CMP ラインの制限は供給側の市場セグメンテーションだった——マイニングカードを意図的に計算に使えなくした——そしてこれは、そのセグメンテーションが電圧グリッチングで任意に書けるフューズによって、1枚のフューズ焼きの深さしかないことを実証した。セキュリティペーパーとして読むこと（物理アクセスを持つ操作者は消音されたシリコンを再有効化し、SKU の境界を破れる）。ショッピングガイドとしてではない。手順は物理的なカードアクセス、専用装置、そしてダイのくじ引きを必要とする。

[`🔗 Kate's blog：Using voltage glitching to unleash the A100`](https://blog.kate.land/posts/using-voltage-glitching-to-unlock-the-a100/) · [`🔗 HN ディスカッション`](https://news.ycombinator.com/item?id=50451903)

---

## 46. Open Source Says No：22プロジェクトの AI コントリビューションポリシーを1つのカタログに——immich と meilisearch は全面禁止

- **Velocity:** ▮ steady
- **Source:** osssaysno.com · HN 52 pts · 11月11日（~16:51 UTC+8）
- **Tags:** `open-source` `ai-policy` `maintainers`

新しいディレクトリ（「Last refreshed 2026-11-11」）が、著名な OSS プロジェクトの公開ポリシーが AI 支援または AI 生成コントリビューションについて何を言っているかをカタログ化している。ラベルは3つ。**Banned**、**Restricted**、**Assist allowed**（現時点で22プロジェクト）。禁止ティアには **immich**（「LLM が生成した PR を開かないでほしい」——118,789スター）と **meilisearch**（「生成 AI ツーリング（GitHub Copilot、ChatGPT、Claude Code、Cursor など）が生成したコンテンツは、外部コントリビューションとして一切考慮しない。対象には、コード、テスト、ドキュメント、PR 説明、PR コメント、issue 説明、issue コメントを含む」——59,840スター）が含まれ、ほかに okhttp と Servo。同サイトは「情報提供のみを目的とし、これらのポリシーの是非について立場を取らない」。投稿は事前入力済みの issue を開き、「その上で自動ポリシーチェックが走る」。

**Why it matters:** AI コントリビューションに関するメンテナのポリシーは、CONTRIBUTING.md と怒りの issue スレッドに散らばっていた。プロジェクトごとに読みやすい形にすることで、コントリビューターの行動は変わる——複数リポジトリに AI 生成 PR を出すなら、まず確認すべきリストだ。そしてそれは、Glasswing 規模の機械生成脆弱性レポートが同じメンテナに着地しているまさにその時、AI コントリビューション反対の立場に最初の構造化データセットを与えるものでもある。

[`🔗 Open Source Says No`](https://osssaysno.com) · [`🔗 HN ディスカッション`](https://news.ycombinator.com/item?id=50451102)

---


## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-11T12:40:05Z |
| Items | 46 |
| Sources tracked | 28（Hacker News、GitHub Trending、NVD、CISA KEV、MSRC CVRF、arXiv、Hugging Face、ベンダーブログ、セキュリティアドバイザリ） |
| Update schedule | 04:03, 12:03, 20:03 UTC+8（1 日 3 回） |
| Ranking | 速度加重（即時性 × エンゲージメント加速度 × 情報源の権威） |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[前日](2026-11-10.md) · [生 .md](https://trending.md/jp/feed/2026-11-11.md) · [アーカイブ](../archive/)
