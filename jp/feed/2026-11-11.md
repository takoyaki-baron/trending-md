---
date: 2026-11-11
updated: 2026-11-10T21:17:04Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 22
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

11 月 10 日は Patch Tuesday で、同日の NVD 公開ウィンドウには **1,692 レコード**が並んだ——うち **1,094 件が `secure@microsoft.com` 由来**で、Mozilla の 105 件、Intel の 103 件が続く。Microsoft 自身の CVRF 文書（28.1 MB）は **1,342 件の脆弱性**を載せ、うち **1,095 件が Microsoft 起票**——Chrome の CVE 管理者が 165 件、Linux 41 件、GitHub_M 5 件。文書のスコアセットを直接読んだ結果：**ベーススコア 9.0 以上の脆弱性は 48 件**（最大 10.0）、一方 Microsoft 自身の重大度ラベルは **Critical 68 件、Important 1,117 件、Moderate 110 件、Low 47 件**。スコア表の上位：SharePoint の不正な認可 **9.9**（CVE-2026-120002）、ネットワーク経由でコード実行に至る Azure DevOps の不適切な認証 **9.9**（CVE-2026-109467）、**Azure OpenAI の critical function に対する認証欠如 9.8**（CVE-2026-119990）、Windows Kerberos の認証バイパス 9.8（CVE-2026-85844）、LDAP の out-of-bounds 書き込み 9.8、DNS の二重解放 9.8。すべてのレコードは NVD で依然 `Awaiting Analysis`——ここで引用した数字はすべて CNA 自身のものだ。

**Why it matters:** 悪用フラグが重大度の論理を逆転させた。文書全体で `Publicly Disclosed:No;Exploited:Yes;Latest Software Release:Exploitation Detected` と読めるエントリはただ 1 件——**Moderate 6.5 の評価を受けた Outlook スプーフィングバグ CVE-2026-124194** で、CISA は同日に KEV へ載せた。その一方で、より高いスコアの 42 件の権限昇格バグは "Exploitation More Likely" のままで、9.x の一群は "Less Likely" だ。スコア列ではなく悪用列に従うパッチ優先順位——これが今月の教訓のすべてだ。

> CVRF exploit status for CVE-2026-124194: Publicly Disclosed — No · Exploited — Yes · Latest Software Release — Exploitation Detected

[`🔗 MSRC CVRF 2026-Nov（機械可読）`](https://api.msrc.microsoft.com/cvrf/v3.0/document/2026-Nov) · [`🔗 NVD：CVE-2026-119990（Azure OpenAI）`](https://nvd.nist.gov/vuln/detail/CVE-2026-119990) · [`🔗 CISA KEV：CVE-2026-124194`](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)

---

## 4. Firefox 160 のリリースの波が同じ日に 100 件の CVE レコードを NVD に載せる——うち 7 件は 9.6 のサンドボックス脱出

- **Velocity:** ▮▮ trending
- **Source:** Mozilla · NVD 105 レコード · 11 月 10 日（~22:17 UTC+8）
- **Tags:** `firefox` `mozilla` `security`

Firefox **160.0** は 11 月 10 日にリリースされた（product-details: カテゴリ `major`）。**`security@mozilla.org` 由来の 105 件の CVE レコード**が同じ日に NVD に着地し、14:17 から 19:21 UTC の間に公開された——100 件が Firefox に言及し、残り 5 件は Thunderbird のみの項目だ（作成ウィンドウ、プロキシ経由の CalDAV、フィード購読、STARTTLS、Exchange EWS）。7 件は **9.6 のサンドボックス脱出**だ。Widget: Gtk の use-after-free、IPC のそれ、DOM: Service Workers の 2 件、Audio/Video: cubeb、Storage: Cache API と Graphics: Text の不正な境界条件。もう一つの波は **8.8** に並ぶ。WebRTC: Networking と Graphics: WebRender の権限昇格、Layout、CSS Parsing、Canvas2D の use-after-free だ。修正はメインリリースとともに **Firefox ESR 115.45、Firefox ESR 153.7、Thunderbird 160** に届く。すべてのレコードは `Deferred`——Mozilla が CNA として採点し、NVD はまだ分析していない。

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

Barracuda の 2 件（項目 8）のほかに、CISA の KEV カタログは 11 月 10 日にもう 3 件を追加した。**CVE-2026-124194**——Microsoft Office Outlook、"missing user interaction for potentially unsafe action"、CVSS **6.5**（CNA 採点、NVD は `Awaiting Analysis`）。Microsoft 自身の CVRF が悪用ありとフラグしている件だ（項目 3）。**CVE-2026-20320**——Cisco BroadWorks、Open Client Interface XML Parser の XXE で "an unauthenticated, remote attacker to read sensitive configuration information" を許す、CVSS **7.5**（`psirt@cisco.com`）。そして **CVE-2026-111793**——Openwave Messaging の Webtop Media Transcoder、"does not enforce administrator-defined file type restrictions"、CVSS **4.3**（MITRE 採点、`Deferred`）。11 月 9 日のバッチには、本フィードが扱った FreeSWITCH の 9.8 に加え、GPUStack、OpenSSH、IBM Aspera Faspex が含まれていた。

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

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-10T21:17:04Z |
| Items | 20 |
| Sources tracked | 22（Hacker News、GitHub Trending、NVD、CISA KEV、MSRC CVRF、arXiv、Hugging Face、ベンダーブログ、セキュリティアドバイザリ） |
| Update schedule | 04:03, 12:03, 20:03 UTC+8（1 日 3 回） |
| Ranking | 速度加重（即時性 × エンゲージメント加速度 × 情報源の権威） |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[前日](2026-11-10.md) · [生 .md](https://trending.md/jp/feed/2026-11-11.md) · [アーカイブ](../archive/)
