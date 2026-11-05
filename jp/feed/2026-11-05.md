---
date: 2026-11-05
updated: 2026-11-05T04:27:03Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 24
license: CC-BY-4.0
---

# トレンド — 2026-11-05

## 1. Kimi K3.1-Pro が 2.8T のオープンウェイトを Hugging Face に置いた —— ただしライセンスはオープンソースではない

- **Velocity:** ▮▮▮ trending
- **ソース:** Hacker News · 234 ポイント · 約 5 時間前（約 23:30 UTC+8）
- **タグ:** `ai-models` `open-weights` `moonshot` `licensing` `moe`

Moonshot の `moonshotai/Kimi-K3.1-Pro` は **2026-11-02T04:13:51Z** に作成され、二日後に Hacker News のフロントページに到達した。モデルカードが示すのは **2.8T パラメータ**の MoE モデルで、**104B が活性**、**93 層**、**896 エキスパート**（トークンごとに 16 を選択、2 は共有）、**1,048,576 トークン**のコンテキスト、401M パラメータの **MoonViT-V2**  vision encoder、160K 語彙。量子化は「MXFP4 weights / MXFP8 activations」で量子化認識トレーニングを併用する。リポジトリはゲートされていない：**96 個の safetensors シャード**が合計 **1,563,293,160,568 バイト（1.56 TB）**、加えて独自の `kimi_k3` モデリングコード。閲覧時点で **797 ダウンロード、388 いいね**。

ベンチマーク表は最高推論強度、temperature 1.0、top-p 0.95 で測定され、Terminal-Bench 4.0 **65.7**、SWE Marathon v1.1 **51.7**、BrowseComp **92.1**、OSWorld V2.1 **79.6**、GPQA-Diamond **94.2**、HLE-Full **51.1**、ExploitBench **74.7**。カード自身が限界も書いている——「Elo scores and other benchmark-specific metrics are not directly comparable with accuracy or pass-rate scores」、一部の評価は内部またはツール併用であること、PostTrainBench は H100 ではなく H20 と代替ジャッジで走ったこと。

読むべきはライセンスファイルだ。使用・改変・配布・再許諾を認めたうえで、二つの条件を付ける。第 2 条は、Model-as-a-Service 事業の任意の連続 12 か月の総収益が **2,000 万ドル**を超える場合、事前に Moonshot との別契約を要求する。第 3 条は、月間アクティブ **1 億人**超または月間収益 **2,000 万ドル**超の製品で使う場合、`"Kimi K3.1-Pro"` を「prominently displayed on the user interface」しなければならないとする。第 4 条は内部利用と、Moonshot 公式製品または認定推論パートナー経由のアクセスを除外する。

**なぜ重要か：** これはダウンロード可能なウェイトに「規模で発火する」表示義務を付けたもので、OSI 承認のオープンソースライセンスではない。だから「オープンウェイト」は文字通り正しく、「オープンソース」は正しくない——そして報道では両者が同じ意味で使われる。1.56 TB というチェックポイントサイズは、そもそも誰が動かせるかを決める数字でもあり、同じ日にディスクからストリーミングする C 実装がトレンド入りした理由でもある（第 12 項）。

> 「A dash (`—`) means that the source table does not report a score.」—— モデルカード自身のベンチマーク表への注記

[`🔗 moonshotai/Kimi-K3.1-Pro`](https://huggingface.co/moonshotai/Kimi-K3.1-Pro) · [`🔗 LICENSE`](https://huggingface.co/moonshotai/Kimi-K3.1-Pro/raw/main/LICENSE) · [`🔗 HN ディスカッション`](https://news.ycombinator.com/item?id=50366999)

---

## 2. Debian の apt は root で攻撃者のパッケージを入れてしまう —— リダイレクト一度と、既定で行われる再試行だけで

- **Velocity:** ▮▮▮ trending
- **ソース:** Debian Security Announce · NVD レコード 2026-11-04T16:17Z · HN 117+91 ポイント
- **タグ:** `cve` `linux` `apt` `mitm` `supply-chain`

`CVE-2026-109518` は CNA レコードの `title` フィールドで **APT RCE via hard link reuse** と名付けられている。記録が描くのは中間者攻撃だ。攻撃者は「can manipulate the HTTP traffic (including a malicious mirror or proxy) between an APT client and an archive server triggered by a package install」であり、それによって「trick the client into installing an attacker-controlled unverified package and achieve remote code execution with root privileges」。Debian のアドバイザリは Max Justicz の功績とし、trixie の apt **3.0.4** で修正した。

露出条件の記述は具体的であり、同時にごく普通でもある。記録によれば「requires the client to follow redirects and retry the download of package files. It requires the client to have a non-zero `Acquire::Retries` configuration setting; the value 3 is the default starting with Debian 12 (bookworm) and Ubuntu 22.04 LTS (Jammy Jellyfish), so older releases are unaffected in a default configuration」——つまり既定設定の古いリリースは影響を受けず、モダンなリリースへ更新した母集団がちょうど攻撃面に入る。

スコアの出所は引用する数字を決めるので別に述べる。CNA は Canonical で、NVD レコード上に存在するスコアは **`security@ubuntu.com` による CVSS 4.0 7.7**（`AV:N/AC:L/AT:P/PR:N/UI:P/VC:H/VI:H/VA:H`）だけであり、NVD のステータスは `Received` で独自のメトリクスを出していない。GitHub Advisory Database の `GHSA-jw32-37xr-xwfw` も同じ 7.7 を持つ——ただしそれは `cvss_severities.cvss_v4` の中だけであり、レガシーの `cvss` オブジェクトは null、`cvss_v3` スロットは `{score: 0.0, vector_string: null}` である。レガシー欄を読めばこのレコードは「未採点」になり、この 0.0 をスコアとして読めば「ゼロ点」になる。（Debian の `lists.debian.org` の告知は現在、我々のクライアントには JavaScript の proof-of-work チャレンジを返すため、ここでの引用は同じ記述を機械可読な形で持つ CVE レコードから取っている。）

**なぜ重要か：** root でコードを実行するサプライチェーンの脆弱性が 7.7 にしかならないのは、CVSS 4.0 が `AT:P` と `UI:P` をどれだけ割り引くかの最も明快な例だ——攻撃者は経路上にいて、**かつ**更新が進行中でなければならない——それでも結果は root 権限のコード実行である。そして悪用可能性を生んでいるのがあの再試行の既定値なのだから、リスクに晒されるのは古びたインストールではなく、モダンなディストリビューションへ上げた方の機械だ。

[`🔗 CVE-2026-109518 レコード`](https://www.cve.org/CVERecord?id=CVE-2026-109518) · [`🔗 Ubuntu CVE-2026-109518`](https://ubuntu.com/security/CVE-2026-109518) · [`🔗 Debian DSA`](https://lists.debian.org/debian-security-announce/2026/msg00526.html)

---

## 3. Anthropic の FlashProve は 19 MB の証明で推論を検証する —— コストは素で走らせるのの 70〜95 倍

- **Velocity:** ▮▮▮ trending
- **ソース:** anthropic.com/research · 2026-11-04 · HN 122 ポイント
- **タグ:** `ai-research` `zkproof` `inference` `anthropic` `verification`

Anthropic は **FlashProve** をオープンソース化した。zkSNARK を使い、あるモデルが特定の出力トークンを生成したことを証明する研究プロトタイプである。プロバイダはまずウェイトにコミットし、そのコミットされたモデルが当該トークンを生成したことを証明する。成果物には証明器、高速な C++ 検証器、Lean 検証器、Lean 証明、プロトコル仕様、ドキュメントが含まれる。対象は MoE モデルで、ウェイトは隠す——ただしアーキテクチャは隠さない。

実測は **Llama 4 Maverick**（400B パラメータ MoE、4-bit ウェイト）。H100 1 枚で証明生成は約 **110 トークン/秒**、**1,024 トークン**のリクエストあたり約 **19 MB** の証明。検証は 24 スレッドで **17 秒**、1 スレッドで **21 秒**。オフラインのコミット段階は約 **39 分**かかり、約 **1,600 万リクエスト**分有効。証明コストは通常の vLLM 推論の GPU 時間の約 **70〜95 倍**。

記事は自らの限界を率直に並べており、その方がスループットの数字より主張を強く縛る：「This release is a research prototype」、「The proof is about an integer model under greedy decoding」、「Our system assumes the served model uses a Mixture-of-Experts (MoE) architecture」、「The system currently proves inference over contexts of up to 1,024 tokens」、そして三つの成果物について「we do not guarantee that all three (Lean, paper, code) match each other.」。サイドチャネルは「could potentially reveal information about the weights」であり、今回の範囲外とされている。

**なぜ重要か：** 電子透かしはモデルに痕跡を残させる。こちらはプロバイダに、どのウェイトが走ったかという主張を、ウェイトを見せずに証明させる。別のプリミティブであり、70〜95 倍のオーバーヘッドと 1,024 トークンの上限が、これが研究用の玩具なのか、すべてのリクエストに払える推論スタックなのかを決める。

[`🔗 Anthropic：証明可能な推論への進展`](https://www.anthropic.com/research/provable-inference) · [`🔗 HN ディスカッション`](https://news.ycombinator.com/item?id=50368626)

---

## 4. GitHub の Pull Requests、Git 操作、Issues が 2 時間劣化 —— 根本原因はまだ示されていない

- **Velocity:** ▮▮ rising
- **ソース:** githubstatus.com · インシデント 2026-11-04 09:49–11:50 UTC · HN 228 ポイント
- **タグ:** `github` `outage` `dev-infra`

GitHub は 2026-11-04 **09:49 UTC**、「Git Operations、Issues、Pull Requests の性能劣化」でインシデントを開始した。エスカレーションは速かった：**09:50** に Actions の劣化、**09:53** に Pull Requests の可用性、**11:11** に API リクエスト。コアサービスは **11:30**、Actions は **11:43** に緩和され、**11:50 UTC** に解決——最初から最後まで **2 時間 1 分**。

原因は公表されていない。ステータスページは詳細な根本原因分析が「will be shared as soon as it is available」と述べている。

**なぜ重要か：** これは 10 月 31 日の Actions/Pages/Webhooks 劣化（17:50–19:23 UTC）とは**別の**インシデントであり、重なりが示唆的だ——両方に Actions が現れるのは、エージェント駆動の CI がこの面の主要な負荷になったことと整合する。行き過ぎずに書けるのはここまでだ：五つのサービス、2 時間、原因は未公表。

[`🔗 GitHub Status インシデント`](https://www.githubstatus.com/incidents/smtdswd1h2w4) · [`🔗 HN ディスカッション`](https://news.ycombinator.com/item?id=50363378)

---

## 5. テンセントの Hy4 は computer use を載せ、自社プレビューが出していたウェイトは出さない

- **Velocity:** ▮▮ rising
- **ソース:** SiliconANGLE · 2026-11-04 · HN 104 ポイント
- **タグ:** `ai-models` `tencent` `open-weights` `computer-use`

テンセントは 2026-11-04 に **Hy4** を発表した。初めて「computer-use capabilities」を備え、「advanced visual understanding, reasoning and tool-calling」を用い、1M トークンのコンテキストを持ち、Unreal Engine、Unity、Godot との統合を提供する。利用経路は Tencent Cloud TokenHub、WorkBuddy、CodeBuddy、元宝、WeCom、ima、加えて OpenRouter などの第三者。

読み方を決める前提が二つある。第一に、流布しているパラメータ数——**770B 総パラメータ、49B 活性**——は Hy4 *Preview* のもので、GA 版として別途示されてはいない。テンセント自身の `hy.tencent.ai/research/hy4` は 6 KB・可視テキスト **10 文字**の文書を返し、同サイトの `.md`、`?format=md`、`?format=json`、`llms.txt` のいずれも同じものを返したため、GA の仕様を一次情報で読むことはできなかった。第二に、改善幅（Preview 比で GameDev **+19.1%**、GameLogic **+9.8%**）には内部ベースラインが付く：「actual baseline numbers remain internal and weren't released」。

最も対照的なのがウェイトだ。Hy4 **Preview** は `tencent/Hy4-preview` として Hugging Face にあり、**2026-08-27** 作成、**`license:apache-2.0`**、533 いいね、11,399 ダウンロード。本稿執筆時点で組織の一覧に `tencent/Hy4` も GA のシステムカードも存在せず、テンセントは「intends to release the model weights and system cards in coming days」と述べている。

**なぜ重要か：** 十一週隔てた二つのリリースのうち、片方は Apache-2.0 でダウンロードでき、もう片方は約束だけを置いて閉じている——だから「Hy4 はオープンウェイトだ」という見出しは、常に古い方の成果物についての主張になる。非公開のベースラインが問題を二重にする：分母のない差分は検証できない数字だ。

[`🔗 hy.tencent.ai/research/hy4`](https://hy.tencent.ai/research/hy4) · [`🔗 tencent/Hy4-preview（Apache-2.0）`](https://huggingface.co/tencent/Hy4-preview) · [`🔗 SiliconANGLE の報道`](https://siliconangle.com/2026/11/04/tencent-releases-hy4-powerful-frontier-llm-introducing-visual-understanding-and-computer-use/)

---

## 6. Go 1.27 で encoding/json/v2 が安定化 —— Unmarshal は最大 10 倍、Marshal は据え置き

- **Velocity:** ▮▮ rising
- **ソース:** go.dev/blog · 2026-11-04 · HN 95 ポイント
- **タグ:** `go` `json` `standard-library` `release`

Go 1.27 は **`encoding/json/v2`** と **`encoding/json/jsontext`** を安定版として提供する。`jsontext` は構文とストリーミングを、`v2` は意味変換・呼び出しごとのオプション・`MarshalerTo`/`UnmarshalerFrom` といったストリーミングインターフェースを担い、`WithMarshalers`/`WithUnmarshalers` で型ごとの直列化を上書きできる。`RawMessage` は `jsontext.Value` の別名になった。

噛みつくのは挙動の変更で、記事は箇条書きにしている：「`v2` reports an error in the presence of invalid UTF-8」、「`v2` reports an error if a JSON object contains a duplicate name」、「`v2` marshals a nil Go slice or Go map as an empty JSON array or JSON object, respectively」、「`v2` unmarshals a JSON object into a Go struct using a case-sensitive match from the JSON member name to the Go field name」。`omitempty` は JSON の空値で判定するようになり、`time.Duration` は設定しない限り既定の直列化を持たない。

性能は非対称だ：「The `Marshal` performance of `v2` is roughly at parity with `v1`」——「Sometimes it is slightly faster, but other times it is slightly slower」——一方 unmarshal は「up to 10x」で、Go 1.28 でさらに改善予定。移行は任意である：「Applications using `v1` will continue to be supported indefinitely and need not ever migrate to `v2`」、そして `v1` は `v2` の上に実装されているので、新しいインターフェースは既存の呼び出し側にも届く。

**なぜ重要か：** 重複キーと不正 UTF-8 のエラーこそが面白い半分だ。これらの入力は `v1` では黙って許容されていた。つまり一部のサービスは何年も曖昧な JSON を受け入れており、切り替えた時に初めて気づく——性能のグラフは全員が読む部分で、意味論は挙動を変える部分だ。

[`🔗 Go ブログ：A new Go API for JSON`](https://go.dev/blog/jsonv2) · [`🔗 HN ディスカッション`](https://news.ycombinator.com/item?id=50369106)

---

## 7. 捜狗輸入法の設定は平文 HTTP で取られていた —— だから国家級の攻撃者が広告枠を DarkVigil の配布路に変えた

- **Velocity:** ▮▮ rising
- **ソース:** ESET WeLiveSecurity · CVE-2026-120422 公開 2026-11-04T10:17Z
- **タグ:** `cve` `malware` `espionage` `supply-chain` `eset`

ESET は **SlippyNunchucks** の詳細を公表した。「a China-aligned threat actor that has been active since at least September 15th, 2023」とされ、Windows 版捜狗輸入法（Sogou Input Method）に対して使われた手口が示されている。`SGTool.exe` はブランド辞書のアイコン設定を捜狗の公式エンドポイントから**平文 HTTP で**取得する。DNS 解決が攻撃者に制御されていると、その要求は `47.239.250[.]102` または `47.237.122[.]175` のステージングサーバへ導かれ、正規のものと同じ方式で暗号化された悪性設定が返る。設定内のアイコンフィールドは書き込み先パスとして使われる：一方のペイロードは `SogouComMgr.exe` を置換し、もう一方は BizCenterCom のバージョンディレクトリに置かれ、「the legitimate and signed Adobe Licensing WF Helper, renamed to `biz_helper.exe`」と `libcef.dll` を装った DarkVigil が並ぶ。その後、捜狗自身のコンポーネント読み込み手順がその Adobe バイナリを実行し、サイドロードが起きる——「resulting in execution of the DarkVigil implant」。

ESET はさらに「20 request endpoints on this host that the application accesses over unencrypted HTTP rather than HTTPS」を確認している。`CVE-2026-120422` の NVD レコード上の唯一のメトリクスは ESET による **CVSS 4.0 8.9**（`AV:N/AC:L/AT:P/PR:N/UI:P/VC:H/VI:H/.../V:D`）で、レコードのステータスは **`Deferred`**——NVD は現在これを分析していない。

示された限界と、原文が自己矛盾している点：「The point at which DNS manipulation occurs remains unknown」——ルータ侵害も ISP レベルでの傍受も可能性であって結論ではない。記事は香港、タイ、日本、ベトナム、オマーン、スリランカの標的を挙げるが、**被害件数や感染率は一切示していない**ので、テレメトリの地理は流行度ではない。テンセントは捜狗 **16.10** で修正し、該当する HTTP 要求を HTTPS へ移し証明書ピンニングを有効にした。ESET は 2026-09-11 に報告、テンセントは 2026-09-21 に確認している。修正日は記事中に二度現れ、互いに食い違う——ある箇所は「On October 29th, 2026, Tencent released version 16.10」、別の箇所は「on October 30th, 2026」。

**なぜ重要か：** 配布されたペイロードは「ブランド宣伝」という一次側のチャネルに乗っていた。つまり防御はシグネチャでもアプリ本体のパッチでもなく、20 個のエンドポイントを HTTP から移すことだった。そしてレコードが `Deferred` である以上、NVD の分析結果だけを見るスキャナはこの件を知り得ない。

[`🔗 ESET の調査`](https://www.welivesecurity.com/en/eset-research/slippynunchucks-hijacks-sogou-input-methods-brand-promotion-mechanism-to-distribute-malware/) · [`🔗 NVD CVE-2026-120422`](https://nvd.nist.gov/vuln/detail/CVE-2026-120422)

---

## 8. Traefik の ForwardAuth 接続プールを全クライアントで共有していた —— 同じアドバイザリが 8.7 と 7.0 の両方を持つ

- **Velocity:** ▮▮ rising
- **ソース:** GitHub Advisory Database · GHSA-6cm8-r9cr-2hc7 公開 2026-11-04T18:30Z
- **タグ:** `cve` `traefik` `authentication` `reverse-proxy` `ntlm`

`CVE-2026-121966` は Traefik **2.x の 2.11.60 未満**と **3.x の 3.7.16 未満**に影響する。ForwardAuth のサブリクエスト——および 3.7 では Ingress NGINX の `auth-url` 要求——が「through an auth-server connection pool shared by all clients, exposing connection-bound NTLM or Negotiate authentication」で送られる。NTLM と Negotiate はアイデンティティをヘッダではなく TCP 接続に結び付けるため、「an unauthenticated attacker can reuse another user's authenticated connection, receiving the victim's identity via `authResponseHeaders` to access backends as that user」。

教訓的なのはスコアの方で、アドバイザリは両方のスロットを埋めており、しかも食い違う。`cvss_v3` は **8.7**（`AV:N/AC:H/PR:N/UI:N/S:C/C:H/I:H/A:N`）、`cvss_v4` は **7.0**（`AV:N/AC:L/AT:P/PR:N/UI:N/VC:N/VI:N/VA:N/SC:H/SI:H/SA:N`）。4.0 のベクトルは、脆弱なシステム自身には機密性・完全性・可用性の影響が**まったくない**と言っている——すべては**後続システム**側（`SC:H/SI:H`）であり、「コンポーネントが壊れた」のではなく「アイデンティティが借りられた」事象にちょうど適合する。3.1 のベクトルは影響を脆弱なシステム内に置き、代わりに複雑度を上げている。

**なぜ重要か：** 接続プールを介したアイデンティティ混同は、書けるどんなテストもほぼすり抜ける——何も不正な形をしておらず、権限昇格もなく、要求に他人の名前が付いているだけだ。これはまた、同じバグの 4.0 が 3.1 より二段低くなり得る理由の明快な実例でもある：両フレームワークが争っているのは「影響があるか」ではなく「影響がどこに落ちるか」だ。

[`🔗 GHSA-6cm8-r9cr-2hc7`](https://github.com/advisories/GHSA-6cm8-r9cr-2hc7) · [`🔗 traefik/traefik アドバイザリ`](https://github.com/traefik/traefik/security/advisories/GHSA-hrpp-p4fc-wwf8)

---

## 9. Rails の Active Storage は「添付した瞬間」に ImageMagick を走らせていた —— だからアップロード一度で secret_key_base が読めた

- **Velocity:** ▮▮ rising
- **ソース:** rails/rails セキュリティアドバイザリ GHSA-f3w6-w445-fwh9 · 2026-11-04
- **タグ:** `cve` `rails` `imagemagick` `file-upload` `ruby`

Rails は **GHSA-f3w6-w445-fwh9**（*Possible arbitrary file write and read in Active Storage image analysis*）を公開し、**8.1.4.1** と **8.0.5.2** で修正、`CVE-2026-122006` として登録された。影響はこうだ：ImageMagick で添付を処理する Rails アプリでは、未認証の攻撃者がサーバ上に任意のファイルを書ける可能性があり、Disk サービス利用時にはアプリプロセスが読める任意のファイルを読める——通常は `secret_key_base` と外部システムの資格情報が含まれ、そこからリモートコード実行や横展開に至り得る。

仕組みは、ImageMagick がファイル内容から coder を選び、一部の coder は画像そのものではなく**画像内で名指しされたファイル**を操作する点にある。Active Storage はどの coder も制限しておらず、ImageMagick アナライザは添付時点で走る——アドバイザリで最も鋭い一文は、アップロードを添付するだけで十分であり、variant・preview・analyze の呼び出しは不要だというものだ。Rails はまた、具体的な攻撃チェーンを一つ報告されたが、それが唯一の存在だと仮定はしていない、と述べている。

修正版は ImageMagick の `policy.xml` を同梱し、`MiniMagick.cli_env` 経由でそのディレクトリを `MAGICK_CONFIGURE_PATH` の先頭に挿入する。これにより MSL スクリプト coder、他ファイルを読む／削除する coder、リモート参照の取得、Ghostscript に支えられた全 coder と `gs` delegate、そして `@filename` 間接参照が禁止される。

影響母集団は「Rails 全部」よりずっと狭い。`config.active_storage.variant_processor = :mini_magick`（`load_defaults` 6.1 以前の既定）を使っており、ImageMagick のポリシーがこれらの coder をまだ禁止しておらず（Debian と Ubuntu が同梱するポリシーは禁止していない）、信頼できないユーザからのアップロードを受け付けるアプリだけが該当する。vips を使うアプリは対象外だ。アップグレードには落とし穴もある：`:mini_magick` のアプリは **mini_magick >= 5.1** も必要で、それより古いと起動時に例外を投げる。

**なぜ重要か：** 修正物はコード変更ではなく設定ファイルだ——脆弱性の実体は、Active Storage が ImageMagick のポリシーを一度も設定していなかったことで、その結果すべての MiniMagick 子プロセスがホストの緩いポリシーを継承していた。レコード上の **9.8** は `cve@mitre.org` によるもの（`AV:N/AC:L/PR:N/UI:N`）で、`Received` のままの NVD レコードにある唯一のメトリクスであり、アドバイザリのページ自体は **Critical** と書くが独自のベクトルは持たない。

[`🔗 GHSA-f3w6-w445-fwh9`](https://github.com/rails/rails/security/advisories/GHSA-f3w6-w445-fwh9) · [`🔗 Rails v8.1.4.1`](https://github.com/rails/rails/releases/tag/v8.1.4.1)

---

## 10. Dory1.0-4B は同じ 20 層を二度走らせて SWE-bench で 11.5 ポイントを得る

- **Velocity:** ▮▮ rising
- **ソース:** arXiv 2611.03998 · 投稿 2026-11-02T21:38Z · ウェイトは Hugging Face
- **タグ:** `ai-research` `looped-model` `nvidia` `efficiency` `benchmarks`

NVIDIA Nemotron Labs の **Dory1.0-4B** は 40 億パラメータの「looped (latent-recurrent) language model with elastic depth: a single checkpoint serves different inference compute budgets」だ。アーキテクチャは正規化 Transformer（nGPT）を backbone とし、スライディングウィンドウ注意と全注意の層を交互に配置、入力ブロック・共有再帰ブロック・出力ブロックに分かれる——「the Input and Output blocks have 8 layers each, while the Recurrent block has 20 layers」——再帰ブロックは**再学習もモデル差し替えもなしに**任意回数適用できる。

ループ回数ごとのベンチマーク差が論拠になる。SWE-bench Verified は 1／2／4 回で **50.3 → 59.5 → 61.8**、Terminal-Bench 2.1 は **12.5 → 18.1 → 22.2**、SciCode **27.3 → 34.94 → 35.11**、τ³-bench Banking **11.6 → 12.89 → 14.69**、GDPval-AA-V2 の Elo は **815 → 946 → 967**。カードは曲線が前寄りだと明言する：「Most of the accuracy gain from looping comes from the second loop, with smaller gains beyond that」、既定は 2 ループを推奨。事前学習は 6T トークン、うち最初の約 4.5T を NVFP4 で行い、その後 256K へコンテキスト拡張、SFT とマルチ環境 GRPO を実施している。

持ち帰るべき限定は三つ。AA の列は「internal estimates computed under a consistent evaluation harness」であり「may deviate from official Artificial Analysis (AA) scores」であること。公開ベンチは **BF16** チェックポイントのもので量子化エクスポートではないこと。そして serving 対応は未確定で——「Dory support in vLLM is under review」、llama.cpp はブランチからのビルドが必要であること。

**なぜ重要か：** 弾力的な深さは推論計算を 4B モデル上の実行時ダイヤルに変える。これは「より大きいモデルを訓練する」とは別の賭けであり、正直な部分は利得が飽和することだ：カードでは 2 ループの GPQA Diamond が 72.41、4 ループが **72.16** になっている。

[`🔗 arXiv 2611.03998`](https://arxiv.org/abs/2611.03998) · [`🔗 nvidia/NVIDIA-Nemotron-Labs-Dory1.0-4B-BF16`](https://huggingface.co/nvidia/NVIDIA-Nemotron-Labs-Dory1.0-4B-BF16)

---

## 11. 2026-10-30 に ggml-rpc の 2 件目の CVE を報じた後、llama.cpp は v0.9.0 を出した —— NCCL によるマルチノード・テンソル並列を伴って

- **Velocity:** ▮▮ rising
- **ソース:** GitHub release · v0.9.0 タグ 2026-11-04T13:08Z
- **タグ:** `llama-cpp` `ggml` `release` `quantization` `inference`

llama.cpp は 2026-11-04 に **v0.9.0** をリリースした。`v0.1.0` から `v0.9.0` まで続く番号付きリリース系の最新であり、この系は今も 1 日に複数回出る `b#####` のナイトリービルドタグと並行して存在する。概要はこうだ：**OCP FP8 E4M3** 対応（saturating モード、新 ftype `LLAMA_FTYPE_MOSTLY_F8_E4M3`）、統合 KV キャッシュをマルチシーケンス推論で効率化する新演算子 **`flash_attn_ext_rows`**（「restoring non-unified KV prefill performance」）、そして `_2d` API を置き換えるバッチテンソルコピー API（`ggml_backend_tensor_copy_n`/`set_n`/`get_n`）で、Metal と CUDA に実装済み。

モデル対応は四方向に同時に広がる：新アーキテクチャ 4 種（**Clover**、**Limite**、**Metis-1.6**、**Mistral Large 4**）、音声生成と転写に **Chatterbox TTS**、**Nemotron 3.5 Transcribe**、定義済み Pocket TTS ボイス、そして Gemma 4 E2B/E4B の「major prefill optimizations」。`ggml` は **v0.29.0** へ上がり、本命の能力はここにある——FP8 E4M3、flash attention rows、そして **NCCL ベースのマルチノード・テンソル並列**で、CPU、CUDA、SYCL、Metal、Vulkan、OpenCL、Hexagon の各バックエンドに性能改善が入る。

破壊的変更は伏せずに列挙されている：`mtmd.h` に `MTMD_GEN_AUDIO_TYPE_CHATTERBOX`、定義済みボイス関連関数、`MTMD_VIDEO_TEMPLATE_QWEN3VL` が加わり、`GET /props` がモデルの定義済み TTS ボイスを報告するようになった。

**なぜ重要か：** 注目すべきは `flash_attn_ext_rows` と NCCL の二行だ。前者は KV キャッシュ統合時にプロジェクト自身が入れた回帰の修正で、リリースノートが明言している。後者は llama.cpp にかつて vLLM の領分だったマルチノードの話が生まれたことを意味する。

[`🔗 llama.cpp v0.9.0`](https://github.com/ggml-org/llama.cpp/releases/tag/v0.9.0) · [`🔗 ggml v0.29.0`](https://github.com/ggml-org/ggml/releases)

---

## 12. kimi-k3-in-c は 2.78T パラメータを 8.24 GB の RAM で走らせる —— 1 トークン 26.5 秒で

- **Velocity:** ▮▮ rising
- **ソース:** GitHub Trending（デイリー）· 10,183 スター · 最終プッシュ 2026-10-02
- **タグ:** `llm-inference` `c99` `mmap` `open-source` `edge`

`FareedKhan-dev/kimi-k3-in-c` は Kimi K3 推論を可搬な C99 で実装する——「No BLAS. No framework. No GPU.」。提示される数字は **2.78T パラメータ**、ディスク上の **1.56 TB** チェックポイント、実測 **8.24 GB** のピーク RSS、そしてエンジン本体は **176 KB**。このチェックポイントの数字は、第 1 項で Hugging Face のシャードを合計した値と完全に一致する：96 ファイル、1,563,293,160,568 バイト。

設計は圧縮ではなくストリーミングだ。README 自身が RAM と 1 トークンあたり時間の表を出す：8 GB のノート PC で **26.5 秒**、そこでは「the whole model streams off the disk on every step」；32 GB で **24.2 秒**；64 GB で **19.8 秒**；128 GB 以上で **5.6 秒**、そこでは「the model fits entirely in memory, the disk wait is gone」。四つの構成で出力は**バイト単位で同一**だと主張し（「only the clock changes」）、実行可能なデモはより遅いディスクで録画したので「so their clock reads a little higher」と正直に添える。README の実録は 8 トークンで平均 32.69 秒/トークン、答えは正しい。

プロジェクトは **Apache-2.0**、**2026-08-01** 作成、最終プッシュ **2026-10-02**、v1.1.0。`CONTRIBUTORS.md` は **20 名**の外部コントリビュータを挙げ、macOS・Windows・NEON 移植、chat モード、MXFP4 カーネルを担っている。K3.1-Pro のウェイトがフロントページに来たのと同じ日にトレンド入りした——リポジトリ自体は今日変わっていない。今日読まれている理由はあのリリースだ。

**なぜ重要か：** これが「ノート PC でフロンティアモデルを走らせる」の正しいメンタルモデルだ——収まらない、毎トークンdiskから読み直す、メモリの下限はモデル全体ではなくおおよそ 1 エキスパート層＋KV キャッシュ。面白いのは、どれだけ載せられるかにかかわらず答えが決定的だという工学点である。

[`🔗 FareedKhan-dev/kimi-k3-in-c`](https://github.com/FareedKhan-dev/kimi-k3-in-c) · [`🔗 GitHub Trending`](https://github.com/trending)

---

## 13. PR-Agent は新しい org に移り、README の三段目は「旧所有者」についての免責になっている

- **Velocity:** ▮▮ rising
- **ソース:** GitHub · 14,663 スター · v0.49.0（2026-10-25）· プッシュ 2026-11-04T10:11Z
- **タグ:** `agent-infra` `code-review` `open-source` `qodo` `governance`

`The-PR-Agent/pr-agent` は **14,663 スター**でトレンド入りし、README はこう始まる：「This repository contains the open-source PR Agent Project. It is not the Qodo offering for open-source projects.」一段後にはより正確に——「PR-Agent is an open-source, AI-powered code review agent and a community-maintained legacy project of Qodo」——一方で Qodo は同じファイル冒頭の**ゴールドスポンサー**であり続け、「Free version of Qodo for open-source projects」へのリンクも残る。

プロジェクトは止まっていない。最新リリースは **v0.49.0**（2026-10-25）、2026-11-04 にもコミットが入り（`feat: include PR identity in pushed outputs`、`fix: scope response language instructions to each command`）、README は **Docker Hub 名前空間の移行**も記録している：**0.34.2 以降**は `pragent/pr-agent` で公開され、「up to and including `v0.31`」までの旧版は `codiumai/pr-agent` に「a frozen archive — no new images are pushed there」として残る。

**なぜ重要か：** 人気 OSS が組織を移ると、三つの成果物が三つの名前を指す——GitHub の slug、Docker の名前空間、npm/action の参照——そしてリダイレクトするのは一つだけだ。README はリダイレクトにできない仕事をしている：似た名前の二製品のどちらを入れているのかを読者に伝えることだ。

[`🔗 The-PR-Agent/pr-agent`](https://github.com/The-PR-Agent/pr-agent) · [`🔗 v0.49.0`](https://github.com/The-PR-Agent/pr-agent/releases/tag/v0.49.0)

---

## 14. Ladybird は 10 月に WPT で Safari Technology Preview を抜いた —— ただし JavaScript JIT は x86-64 と AArch64 のみ

- **Velocity:** ▮▮ rising
- **ソース:** ladybird.org ニュースレター · 2026-10-31 · HN 60 ポイント
- **タグ:** `browser` `ladybird` `javascript` `webassembly` `wpt`

Ladybird の 10 月アップデートは数字の壁だが、正直な数字がいちばん役に立つ。Web Platform Tests では「ended the month at 2,184,722 subtests, a gain of 75,650」、そして **10 月 26 日**に「passed Safari Technology Preview on WPT」——伸びの大半は 5 日間に集中し、「from about 2.12 million on October 22 to about 2.18 million on October 27」。公表された最終順位は Chrome **2,244,397**、Firefox **2,189,315**、Ladybird **2,184,722**、Safari Technology Preview **2,172,990**。

エンジン側の作業：スタイルとレイアウトをメインスレッドから外に出し、描画記録を別スレッドへ（長い JavaScript タスク中も CSS アニメーションと `:hover` が動き続ける——「As far as we know, no other browser can do this today」）。ホットコードをマシンコードへコンパイルする JavaScript JIT。そして C++ エンジンと Cranelift を置き換える、**Rust 製の新しい WebAssembly エンジン**（独自インタプリタと JIT を内蔵）。ベンチマークも追随した：Speedometer 2 が **84 から 156**、Speedometer 3 が **5.9 から 8.6**、Octane が **4.7 倍**、Wasm CoreMark が **2.5 倍**、新 Wasm エンジンは両エンジンが走らせられる JetStream 3 の Wasm ワークロードで「about 7x higher」。JSLinux は「boots Alpine Linux to a shell in 1.8 seconds, while Chrome takes 1.5」。

限界も同じ口調で同じ文書に書かれている。JIT が動くのは「On Linux and macOS … on both x86-64 and AArch64」だけで、他はない。野心については「For now, we just want to go reasonably fast.」。あの 7 倍は**両方のエンジンが走らせられる**ワークロードに限られる。アクセシビリティは「There's still a lot of work to do here.」。そして alpha はまだ先だ：「Our first alpha is planned for later this year.」

**なぜ重要か：** ブラウザベンダ自身のテストスイートに勝つのは、このプロジェクト史上はじめて外部が定義し外部が採点するマイルストーンだ——そして分母を外して 7 倍を引用しないというニュースレターの判断が、ベンチマークと広告の差そのものである。

[`🔗 Ladybird 10 月ニュースレター`](https://ladybird.org/newsletter/2026-10-31/) · [`🔗 HN ディスカッション`](https://news.ycombinator.com/item?id=50369194)

---

## 15. bitcoinjs-lib は 9 年分のバージョンで偽造トランザクション列を受け入れていた —— 重複 Merkle ノードが報告されなかったから

- **Velocity:** ▮▮ rising
- **ソース:** GitHub Advisory Database · GHSA-8vv3-6qpc-gpw6 · CVE-2026-107846
- **タグ:** `cve` `bitcoin` `merkle-tree` `javascript` `consensus`

`CVE-2026-107846`：**Undetected merkle node duplication in block root computation validates a forged transaction list**。`bitcoinjs-lib` の `fastMerkleRoot` は「pads odd Merkle-tree levels by hashing the final node with itself but does not report adjacent duplicate hashes」——2012 年の重複トランザクション問題と同じ形だ——その結果「A peer can append duplicate transactions so a different transaction list retains the original Merkle root, block header, proof of work, and block identifier」。

影響範囲は **2.3.0** からで、**5.2.1**、**6.1.8**、**7.0.2** で修正済み——つまりこのバグはライブラリのほぼ全リリース史にまたがる。アドバイザリは入口を正確に名指しする：「The affected block-root verifier was introduced as `Block.checkMerkleRoot()` alongside `Block.calculateMerkleRoot()`, while later versions expose validation through `checkTxRoots()` and `__checkMerkleRoot`; these validation paths can accept a recomputed root without checking for mutation.」影響を受ける消費者として挙げられるのは「explorers, exchange indexers, or SPV clients」。

スコアは `security-advisories@github.com` による **CVSS 4.0 9.3**（`AV:N/AC:L/AT:N/PR:N/UI:N/VC:L/VI:H/VA:L/SC:N/SI:H/SA:H`）で、`Received` のままの NVD レコードにある唯一のメトリクスだ。

**なぜ重要か：** 修正として 3 つのコミットが引かれ、この種のバグはビットコイン自身の歴史にもある——2012 年の重複トランザクション問題で、ノードは txid の並びが Merkle ルートと一致しないブロックを受け入れた。新しいのは母集団だ：ブロックエクスプローラや SPV クライアントが使う JavaScript ライブラリであり、同じブロックが二人の読者にとって別の意味になり得る。

[`🔗 GHSA-8vv3-6qpc-gpw6`](https://github.com/bitcoinjs/bitcoinjs-lib/security/advisories/GHSA-8vv3-6qpc-gpw6) · [`🔗 NVD CVE-2026-107846`](https://nvd.nist.gov/vuln/detail/CVE-2026-107846)

---

## 16. Scenario は「生成する前に値段を出す」174 個の agent skill を公開した

- **Velocity:** ▮ steady
- **ソース:** GitHub Trending（デイリー）· 2,324 スター · MIT · プッシュ 2026-11-04T18:02Z
- **タグ:** `agent-skills` `mcp` `media-generation` `open-source` `scenario`

`scenario-labs/skills` は MIT ライセンスの Agent Skills 群で、「teach AI coding agents (Claude Code, Cursor, Codex, Copilot, and 70+ others) how to create production-ready content with Scenario through the Scenario MCP server」——画像、動画、音声、テクスチャ、スカイボックス、3D アセット、カスタム学習モデル。README にも MCP ドキュメントにも総数はないので、git ツリーを自分で数えた：**`SKILL.md` は 174 個**——うち **167 個**が `skills/` 下の **82 ディレクトリ**（**80** ディレクトリは `scenario*`、加えて `dcc/` が **35**、`game-engines/` が **52** で、後者は MCP サーバではなく ZBrush、Blender、Maya、Unreal、Unity、Godot、Roblox Studio のインストールを必要とする「expert tools」ファミリ）——残る **7 個**は `.agents/skills/` 下にあり、このリポジトリ自身の PR ワークフローを保守している。

リポジトリの description にある売りは「メディア生成」より狭い：スキルは「pick the right model, price before spending, and keep characters and brands consistent」。スキル一覧がそれを裏づける——ベンダごとのラッパー（`scenario-veo`、`scenario-seedance`、`scenario-kling`、`scenario-vidu`、`scenario-wan`、`scenario-runway`、`scenario-elevenlabs`、`scenario-meshy`、`scenario-rodin`）と、`scenario-quality-gate`、`scenario-refine-loop`、`scenario-model-comparison` のようなワークフロー系が並ぶ。

運用上の細部が二つ、そのまま真似する価値がある。インストールは固定できる：`npx skills@1.7.4 add scenario-labs/skills#<commit> --skill <name>`——「To install a reviewed state instead, pin both the installer and the commit, taken from a release's tag.」。そしてインストーラのトピックグループは「cannot be selected from the command line」だ。CLI は `--skill` を正確なスキル名としか照合しないためで、これは本リポジトリのバグではなく上流の未解決 issue（`vercel-labs/skills#992`）である。

**なぜ重要か：** 174 項目あって個別バージョンを持たないマーケットは、レビュー点が一つしかないサプライチェーン面だ——README がコミット固定を明記している理由であり、各 DCC ファミリが自前の README に「how it was built and how far it was verified」を記録している理由でもある。

[`🔗 scenario-labs/skills`](https://github.com/scenario-labs/skills) · [`🔗 Scenario MCP ドキュメント`](https://mcp.scenario.com/docs)

---

## 17. セッションが未完了タスクを挟むと、コーディングエージェントは 11.5 ポイント失う

- **Velocity:** ▮ steady
- **ソース:** arXiv 2611.02017 · 投稿 2026-11-01T16:04Z
- **タグ:** `ai-research` `agents` `benchmark` `coding` `evaluation`

**Switch-SWE** は通常のリポジトリレベル基準が測らないものを測る：同じリポジトリで別の作業をした後、エージェントは半端なタスクに戻れるのか。設定は **19 の Python リポジトリから 200 の focus タスク**で、issue・プルリクエスト・レビュー履歴から再構成され、「rendered as 400 matched session specifications」として提示される——各 focus タスクは二度採点される。一度は中断のないセッションで、もう一度は「switched」セッションで、後者は「interleaves ordered stages from other unfinished tasks in the same repository, while only the final focus patch is scored」。

**7 つのコーディングエージェント**で、「interleaved unfinished work produces an average focus-task resolution gap of **11.5 percentage points**, ranging from **6.0 to 15.0** percentage points」。軌跡分析は損失を「cross-task requirement confusion and loss of task state」に帰している。

**なぜ重要か：** 貢献は「対応づけたセッション」という設計にある——どのエージェントも同じ focus タスクを同じ検証器で走らせ、変わるのはインターリーブの有無だけなので、この 11.5 ポイントはタスク難度ではなく切り替えに帰属できる。同時にこれは、単一 issue のベンチマークが意図的に取り除いてきた、実リポジトリでの日常的な作業条件を記述してもいる。

[`🔗 arXiv 2611.02017`](https://arxiv.org/abs/2611.02017) · [`🔗 Hugging Face デイリーペーパー`](https://huggingface.co/papers/2611.02017)

---

## 18. CISA は 5.5 のポインタ認証バイパスを KEV に追加した —— Apple が修正してから 904 日後

- **Velocity:** ▮ steady
- **ソース:** CISA KEV カタログ 2026.11.04 · 追加 2026-11-04、期限 2026-11-18
- **タグ:** `cve` `cisa-kev` `apple` `exploitation` `policy`

`CVE-2024-27834` は **2026-11-04** に「既知の悪用された脆弱性」カタログへ入り、是正期限は **2026-11-18**。NVD レコードの公開は **2024-05-14T15:13:06Z**——**904 日**前——であり、説明は当時から変わっていない：「An attacker with arbitrary read and write capability may be able to bypass Pointer Authentication」。修正は Safari 17.5、iOS/iPadOS 16.7.8 と 17.5、macOS Sonoma 14.5、tvOS 17.5、watchOS 10.5。

スコアは誤って引用されやすい部分だ。NVD レコードで `source` が `nvd@nist.gov` のメトリクスは **CVSS 3.1 5.5 MEDIUM**（`AV:L/AC:L/PR:L/UI:N/S:U/C:N/I:H/A:N`——ローカル、完全性のみ）で、CISA-ADP コンテナも**同じ 5.5** を SSVC ブロックとともに持つ。これを上回る第三者のスコアはレコード上に存在しない。`lastModified` は **2026-11-04T18:17:33Z**、CWE-287。

KEV のエントリ自体が、変わったスキーマを記録している。`forensicTriage: "No"` と `knownRansomwareCampaignUse: "Unknown"` を持ち、`requiredAction` は **BOD 26-04「Prioritizing Security Updates Based on Risk」**と、別建ての「Forensics Triage Requirements」を指す。カタログ全体 **1,768** 件のうち **151** 件が現在 BOD 26-04 を引用しており——最も早いものは **2026-06-11** 追加——**340** 件はなお旧 BOD 22-01 を引く。`forensicTriage` が `Yes` なのは **97** 件。

**なぜ重要か：** KEV 収載は「悪用が観測された」という陳述であり、スコアを伴わない——だから「ローカル前提の 5.5」と「現在悪用中」は同じバグの二つの真実であり得る。その 5.5 が述べているのは攻撃者に必要な権限であって、得られるものの価値ではない。904 日の隔たりは、KEV が NVD 上のフィルタではなく独立した信号であることの論拠でもある。

[`🔗 CISA KEV カタログ`](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) · [`🔗 NVD CVE-2024-27834`](https://nvd.nist.gov/vuln/detail/CVE-2024-27834)

---

## 19. ToolSpace は実実行トレースからより難しい MCP 環境を合成する —— フロンティア 7 モデルが最大 38.2 ポイント下落

- **Velocity:** ▮ steady
- **ソース:** arXiv 2611.05036 · 投稿 2026-11-03T15:09Z
- **タグ:** `ai-research` `agents` `mcp` `benchmark` `tool-use`

**ToolSpace** は MCP 環境の合成順序を逆にする。既存手法はデータ中心で、データベースとシナリオを先に合成し、そこからツールとタスクを導く——論文によればその結果、インターフェースは「may not match real ones」、構成は「not grounded in execution」、タスクは「rarely span more than one environment」になる。ToolSpace は代わりに「mines data, state, and retry dependencies from adjacent calls in execution traces of real MCP services and open agent corpora, using deterministic rules rather than LLM judgment」とし、重み付きツール構成グラフを環境へクラスタリングし、状態を書き換える環境にのみデータベースを合成、それ以外は記録済みの戻り値を再生し、「replay successfully from the initial state」で通る連鎖だけを残す。

AutomationBench と τ³-Bench Banking に適用すると、「the pipeline produces harder Pro versions on which **7 frontier models drop by up to 38.2 points**」。訓練側では 7 つの長距離ツール使用ベンチマークで Qwen3.6-35B-A3B を **23.0 から 41.0** へ引き上げる（RL 併用で **43.2**）。再現性にとって重要な設計判断はその決定論的規則で、依存グラフは判定されるのではなく採掘される——つまり環境構築それ自体がモデルの挙動ではない。

**なぜ重要か：** 38.2 ポイントの下落の方が重要な数字だ。既存の MCP ベンチマークが測っていたのは、実際のサービスが生むトレースより易しい何かだったと述べているからだ。記録された実行から導かれる難しい環境は、「ベンチマークが能力ではなくインターフェースへの慣れで飽和していた」ことを最も安く確かめる手段でもある。

[`🔗 arXiv 2611.05036`](https://arxiv.org/abs/2611.05036) · [`🔗 Hugging Face デイリーペーパー`](https://huggingface.co/papers/2611.05036)

---

## 20. Kairos は「あなたのコーディングエージェントが調整する」ことを差別化に掲げるオープンソースの不正検知エンジン

- **Velocity:** ▮ steady
- **ソース:** Show HN · 103 ポイント · 約 23 時間前（約 05:16 UTC+8）
- **タグ:** `agent-infra` `mcp` `fraud` `open-source` `fintech`

`finic-ai/kairos` は Apache-2.0 のリアルタイム不正・リスク判定エンジンで、「an open-source alternative to Sardine, Sift, Riskified and SEON」。サインアップ、ログイン、注文、決済、出金を判定し、各判断をその背後の信号とともに保持する。**2026-10-30** 作成、**202 スター**、**2026-11-03** にプッシュ、TypeScript（`@finic-ai/kairos`）と Python（`finic-kairos`）の SDK、CLI、HTTP API、Docker によるセルフホストを提供する。

「agent-first」は飾りではない。**MCP サーバ**により Claude Code、Cursor、Codex が「read your decisions and build workflows, with every action recorded under its key」でき、実験ループではエージェントが「propose model variants」し、Kairos が「trains and tests them on your data」、最後に「the agent ships the winner」。土台は通常のモデル——ロジスティック回帰と XGBoost 互換の勾配ブースティング木——に加え、各リクエストについて自然言語で答えるホスト型の判定モデル Grayson で、「with few labels」動くと説明される。

**なぜ重要か：** 興味深い設計判断は操作の帰属だ。不正モデルを再学習させ昇格させられるエージェントは、「誰がブロックされるか」を変えられるエージェントでもある。だから全操作をキーに紐づけることは、このアイデアがレビュー可能であるための最低条件になる。6 日・202 スターはまだ早い。語っているのは規模ではなくアーキテクチャだ。

[`🔗 finic-ai/kairos`](https://github.com/finic-ai/kairos) · [`🔗 HN ディスカッション`](https://news.ycombinator.com/item?id=50358314)

---

## 21. OpenAI の自動パイプラインは 120 万ドルの API クレジットで Linux の root 奪取エクスプロイトを 948 本作った

- **Velocity:** ▮▮▮ trending
- **ソース:** openai.com/index · 2026-11-04 公開 · HN 197 ポイント
- **タグ:** `security` `ai-research` `linux` `kernel` `vulnerability-research`

OpenAI がカーネル脆弱性探索パイプラインの方法論と請求額を公開した。「Our prototype identified and analyzed 2,308 candidate Linux kernel findings, dynamically reproduced 1,724 vulnerabilities, and produced 948 local privilege escalation (LPE) exploits that could allow an unprivileged local user to gain root access.」実行全体の API 費用は **1,213,430 ドル、LPE エクスプロイト 1 本あたり 1,279 ドル**。情報漏えい系は **291 件**と別に報告されている。

パイプラインは 5 段階で、最後に人間が入る。**Scout** エージェントが **5,034 の監査対象**——約 **280 万行**、「roughly 7% of the whole Linux kernel code base」——を選び、費用は 3,426 ドル。**Analyst** エージェントが 12 時間で 2,308 件の候補を出し、316,549 ドル。**Validation** が KASAN 入りの VM で 30 時間かけて 1,724 件（**74.7%**）を再現し、73,330 ドル。残差についての記述が具体的だ：「Only 3.1% reflected incorrect analysis by the model, where the reported vulnerability assumed an impossible condition.」続いて悪用可能性評価とパッチ生成が来る。

論旨を支えるのは、改変版 **kernelCTF** 環境での 2 回目の実行だ。情報漏えい PoC 25 件、LPE エクスプロイト 21 件で **32,936 ドル**。一方 kernelCTF が 2026 年に受理した 0-day LPE は通年で **26 件**。7 月の GPT-5.6 Sol による実行と比べ、新しいモデルは「>5x」多く新規 LPE を見つけたとされ、「at least 10 novel Linux exploitation techniques」を下限として挙げている。

見出しを縛るのはコストより注記のほうだ。モデルは「an upcoming cyber model」と呼ばれるだけで、名前もベンチマークも出てこない。評価額の 1,890 万〜6,630 万ドルは明示的に「hypothetical」——948 本を Pwn2Own と TyphoonPWN の過去の賞金に当てはめた数字で、その賞金は「受理された提出物」の値段であって、これらのエクスプロイトの価値の測定ではない。コストについても著者自身が締めている：「we focused on methodology and measuring model capability in this research, not cost」、ゆえに「the costs we report are more an upper bound」。**948** は実験室内で生成されたエクスプロイトの数であり、提出された CVE の数でもマージされたパッチの数でもない。

**なぜ重要か：** 誰もが引用する 2 つの数字——948 本、1 本 1,279 ドル——は、記事自身がボトルネックではないと述べた問いに答える数字だ。本当の運用上の発見はこちら：「within 10 days while the scan was running, we observed over 100 Linux LPEs had been patched or had staging patches from other contributors, with ~300 more being publicly discussed」。カーネルのバグを 1 つ見つける限界費用は、それをレビューし、直し、出荷する限界キャパシティを下回った。これは開示パイプラインの問題であり、この記事の正直な貢献はそれに値段を付けたことだ。

[`🔗 OpenAI: A thousand fewer paths to root`](https://openai.com/index/a-thousand-fewer-paths-to-root/) · [`🔗 HN ディスカッション`](https://news.ycombinator.com/item?id=50372929)

---

## 22. Ripple-65B は 65B の dense で 500B〜975B の米国オープンウェイト模型を Terminal-Bench で上回る —— ただし 2 列のうち 1 列でだけ

- **Velocity:** ▮▮▮ trending
- **ソース:** ricursive.com/ripple · 2026-11-04 · HN 248 ポイント
- **タグ:** `ai-models` `open-weights` `dense` `benchmarks` `agentic-coding`

Ricursive Intelligence が **Ripple-65B Preview** を公開した。**65B の dense**（MoE ではない）Transformer で、**12T トークン**で事前学習、最大 1M コンテキスト。**Terminal-Bench 2.1 で 80.52** を記録し、Reflection Beam 501B（80.1）、Meta Muse Spark Open 816B（76.4）、Thinking Machines Inkling 975B（63.8）、NVIDIA Nemotron 3 Ultra 550B（56.4）を上回る。アーキテクチャは意図的に地味だ：`d_model` **5120**、**80 層**、MFU **40%**、「simple sharding, no custom kernels, and no quantization (BF16)」。チームは開発中に「scaled from 1 to 5 people during development」。重みは Apache-2.0 で **16 個の safetensors シャード、合計 129,565,519,472 バイト（129.6 GB）**、ほかに NVFP4、DFlash2、事前学習のみの base チェックポイント。閲覧時点で **129 いいね、ダウンロード 0**。

ベンチマーク表には Terminal-Bench の列が 2 つあり、挙動が大きく違う。`(self-reported)` 列では Ripple 80.5 が Beam の 80.1 を 0.4 上回る。ところが**公式 Terminus 2 harness** では Beam が **70.8**、Inkling が 56.2、Muse Spark が 78.7 まで落ち、Ripple は **80.5** のまま。カードは両列を載せた理由も書いている：「we found that Terminal-Bench 2.1 scores were universally lower (with the exception of Muse Spark Open) when using the official Terminus 2 harness at 128K sequence length with summarization」。競合の再実行セルはイタリックで示し、「Replicating benchmark scores has been challenging, particularly for modern agentic evals, due to the number of factors which can cause eval scores to shift.」と明言する。

Terminal-Bench を離れると「SOTA」はずっと狭くなる。**SWE-bench Verified 76.5**（Beam 81.6、Muse 78.7）、**SWE-bench Pro v1.0 61.42**（Beam 66.1）、**DeepSWE 1.1 44.3**（Muse 60.0）。唯一の外れ値が **SWE-bench Pro v2.0 Hard** で、Ripple が 79.1 と主張する一方 Inkling は **2.0**——同じ表で Inkling は Pro v1.0 では 54.3 なので、これは能力差ではなく harness 差であり、記事はそれを指摘していない。

コスト主張は脚注ごと引用する必要がある。**3,200 万ドル**は「our full R&D cost」であり、「one-tenth the cost of the previous open-weight SOTA on agentic coding」、「as estimated to the best of our knowledge」と書かれる。効率の主張は別物で、より明確：「improves Compute Efficiency (CE) on code by 16x relative to the Olmo 3 ladder, with the advantage further increasing with scale up to 55x for the full hero run」。

**なぜ重要か：** DGX Spark に載り、500B 超の MoE と数ポイント差に収まる 65B dense は、順位そのものより面白い。MoE の容量と dense の計算効率の差は、パラメータ数の見た目より狭いということだからだ。一緒に持ち帰るべきは列の分割のほうで、同じ競合が harness を変えると 9.3 ポイント落ちる。つまり「501B を上回る」は、どの列を読んだかという話である。（Ricursive は 2026-10-31 に扱った Flint の RecursiveSI とは別の会社だ。）

[`🔗 ricursive.com/ripple`](https://www.ricursive.com/ripple) · [`🔗 ricursiveAI/Ripple-65B-Preview`](https://huggingface.co/ricursiveAI/Ripple-65B-Preview) · [`🔗 HN ディスカッション`](https://news.ycombinator.com/item?id=50369925)

---

## 23. Kyverno は 3.3 秒で 21 件の CVE レコードを公開した —— 9.0 以上が 7 件、そして修正は書類より 15 日早い

- **Velocity:** ▮▮▮ trending
- **ソース:** NVD · 21 件 `CVE-2026-122302`–`CVE-2026-122323` 公開 2026-11-05T03:17:22–03:17:25Z
- **タグ:** `cve` `kubernetes` `kyverno` `privilege-escalation` `policy-engine`

Kyverno のレコード 21 件が **2026-11-05T03:17:22.030Z** から **03:17:25.343Z** の間に NVD に着地した——公開ウィンドウは **3.313 秒**。すべて `disclosure@vulncheck.com` が採点し、すべて `Received` のまま。ID は**集合**であって範囲ではない：`CVE-2026-122302`–`CVE-2026-122323` の跨度には **22** 個の値があり、**`CVE-2026-122317` は NVD にレコードがまったく存在しない**（単独で照会して `totalResults` は **0**）。つまり 21 件のレコードが、穴を 1 つ含む 22 個の ID の範囲に収まっている。9.0 以上が 7 件で、**9.9 が 5 件**、**9.8 が 1 件**、**9.1 が 1 件**。9.9 の 5 件は `CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:C/C:H/I:H/A:H` を共有する（再計算しても 9.9：`PR:L` のバグを Critical 帯へ押し上げているのは `S:C` のスコープ変更だ）。同じレコードに対する VulnCheck の 4.0 指標は **9.4**。

機構はどれも同じ形——名前空間内のポリシー作成者がコントローラの ServiceAccount に届く——だが、個々の変種は読む価値がある。`CVE-2026-122311` は `resource.get()` / `resource.post()` のパストラバーサル：resource 引数は `/` で分割され、最初のセグメント以降がすべて client-go の「subresource」として渡される。`rest.IsValidPathSegmentName` は subresource を検証せず、`path.Join` が `..` を解決してしまう。アドバイザリ自身の要約は結果について率直だ。自分の名前空間で `NamespacedValidatingPolicy` を作れるテナントは、Kyverno admission controller の ServiceAccount を使ってクラスタ内の任意の場所の任意のオブジェクトを読み書きできる。`CVE-2026-122310` は同じ発想を 1 層上で行う：`context.apiCall` の `urlPath` はクリーニング後に検証されるが実行されるのは生のパスなので、`#` や `?` でトラバーサルを検査から隠せる。`CVE-2026-122303` と `-122313` は `targetMatchConstraints.expression` で他者の名前空間を指すリテラル CEL map を返す。`CVE-2026-122304` は cleanup controller が「builds its context loader with a nil policy」であることを突く。`CVE-2026-122302` は作成者ではなく**コントローラ**の権限を検査してしまう。

数より日付のほうが重要だ。修正版は **1.19.2**、公開は **2026-10-20T23:50:19Z**。`GHSA-4pqm-wqq6-h9q2` は **2026 年 10 月 21 日**に公開され、`datePublic` も **2026-10-21**。CVE レコードが来たのは **2026-11-05**——修正の出荷から **15.15 日**、カレンダーの日付を引くと（`2026-10-20` → `2026-11-05`）16 日。しかもアドバイザリはこれが新種ではなく再発だと明言している。機構は異なり、先行する 2 つの修正はいずれもこれを止めない、と——`GHSA-79gf-7frw-68m9`（CVE-2026-54523）と `GHSA-cvq5-hhx3-f99p`（CVE-2026-41068）を指す。

**なぜ重要か：** 公開された再現環境は Kubernetes v1.32.2 の kind クラスタにリリース版マニフェストを入れ、RBAC も設定も追加せず——つまり既定のインストールだ。前提条件は「いずれかのテナントが名前空間スコープのポリシーを作れる」ことだけで、結果はクラスタ管理者権限。3.3 秒のバッチは、NVD の公開時刻がワークフローの産物であることも思い出させる。これらのバグが 03:17Z に真になったわけではなく、すべて 10 月 21 日には公開済みだった。

[`🔗 GHSA-4pqm-wqq6-h9q2（パストラバーサル）`](https://github.com/kyverno/kyverno/security/advisories/GHSA-4pqm-wqq6-h9q2) · [`🔗 Kyverno v1.19.2`](https://github.com/kyverno/kyverno/releases/tag/v1.19.2) · [`🔗 NVD CVE-2026-122311`](https://nvd.nist.gov/vuln/detail/CVE-2026-122311)

---

## 24. GPUStack は loopback からのリクエストを管理者とみなしていた —— アドバイザリは実環境での悪用を報告している

- **Velocity:** ▮▮ rising
- **ソース:** GitHub Advisory Database · GHSA-gj9m-f8ph-pmhr · CVE-2026-102895 · 9.8
- **タグ:** `cve` `ai-infra` `authentication` `gpustack` `exploited`

`CVE-2026-102895` はモデルサービング向けのオープンソース GPU クラスタマネージャ GPUStack に対する **9.8**。**5,972 スター**、2026-11-05 にも push がある生きたリポジトリだ。バグはポリシー 1 行にある。`force_auth_localhost` が False（既定値）のとき、`get_current_user` は、送信元が loopback と判定されたリクエストを組み込みの管理者アカウントへ昇格させる。認証情報なしで loopback に見せかける方法は 2 つ。GPUStack を同一ホストのリバースプロキシの背後に置く（最も典型的なセルフホスト形態で、「every remote request arrives at GPUStack with TCP peer `127.0.0.1`」）、あるいは `X-GPUStack-Real-IP: 127.0.0.1` を偽造する。アドバイザリの根本原因の一行がすべての教訓だ：「Trusting the network source of a request (socket peer, or a client-controllable header) as an authentication signal.」

影響範囲は管理者級：ユーザー・モデル・ワーカー・設定の列挙と変更、スコープ `["*"]` の永続管理者 API キーの鋳造（以後「valid from any source IP thereafter」）、ワーカーの認証情報とクラウドプロバイダの secret の読み出し、そして `POST /v2/inference-backends/from-yaml` のような管理者専用エンドポイント経由でワーカーホスト上のコード実行まで。

よくある 9.x の認証バイパスと一線を画す一文が同じアドバイザリにある：「This vulnerability has been observed exploited in the wild against a v2.1.1 deployment (attacker-created custom backends running reverse shells).」実環境での悪用は Javier Sixto（ulex.fr）が報告。脆弱性自体は Nikko Enggaliano、Wei Yunzhou、Rui Yang と Haoyu Wang（ジョンズ・ホプキンス大学）が独立に報告した。

時計はいつもどおり食い違う。アドバイザリの公開は **2026 年 7 月 31 日**。修正版 **v2.2.0** の出荷は **2026-06-18T15:54:18Z** で、**2026-11-04T22:17:44Z** の NVD レコードより **139 日**早い。最新リリースは **v2.3.0**（2026-10-21）なので、現行ラインにいる人はすでに修正済み。アドバイザリが描写しているのは 2.1.x に残っている母集団だ。

**なぜ重要か：** 「localhost は信頼する」という既定値は、セキュリティ上の決定に見えるがゆえにどのコードレビューも生き延びる。そしてリバースプロキシがそれを静かに「インターネット全体が満たす規則」に変えてしまう。回避策の一覧はそのままチェックリストになる：`force_auth_localhost=true` を設定し、エッジでクライアント由来の `X-GPUStack-Real-IP` を剥がし、ゲートウェイに外部トラフィックをローカルに見せかけさせない。

[`🔗 GHSA-gj9m-f8ph-pmhr`](https://github.com/gpustack/gpustack/security/advisories/GHSA-gj9m-f8ph-pmhr) · [`🔗 NVD CVE-2026-102895`](https://nvd.nist.gov/vuln/detail/CVE-2026-102895) · [`🔗 GPUStack v2.2.0`](https://github.com/gpustack/gpustack/releases/tag/v2.2.0)

---

## 25. Yuxi のサンドボックスはコンテナエスケープなしで互いの API に届いた —— 9.9、修正はレコードの 110 日前

- **Velocity:** ▮▮ rising
- **ソース:** GitHub Advisory Database · CVE-2026-97693 · 公開 2026-11-04T22:18Z
- **タグ:** `cve` `ai-infra` `multi-tenant` `sandbox` `yuxi`

Yuxi は「a large-model-based intelligent knowledge base and knowledge graph agent development platform」で、7,602 スター、リリースラインはまだ beta。「execution-capable Docker sandboxes と信頼されたアプリケーションサービス間の隔離が不十分」に対して **9.9**（`CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:C/C:H/I:H/A:H`）が付く。自分のサンドボックスでコマンドを実行できる低権限の認証済みユーザーは、「can reach other tenants' sandbox APIs, access their files and secrets, execute commands in active sandboxes, and enumerate, create, or delete sandboxes through the unauthenticated provisioner without knowing administrator, database, or MinIO credentials.」

この項目を誠実に保つのは「何が起きなかったか」を述べた一文だ。これらの経路はクロステナントのデータを漏えい・改変し、サービス拒否を起こせるが、「without a container escape or kernel vulnerability」。サンドボックスの境界はすべて保たれた。破れたのはサンドボックスとコントロールプレーンの間のネットワーク境界である。

運用担当者が見落とすのは修正の注記だ。修正版は **0.7.1**、公開は **2026-07-17T15:50:37Z** で、レコードの **110 日**前。現行ラインは **v0.8.0.beta7** に進んでいる。しかし「upgrading the Compose files does not automatically rotate them」——文書化された既定値を一度でも動かしたデプロイは、永続化された **PostgreSQL**、**Neo4j**、**MinIO** の認証情報を別途ローテートする必要がある。公開された PostgreSQL アカウントがスーパーユーザーなら、それだけで PostgreSQL コンテナ内のコマンド実行に至るとアドバイザリは記す。

**なぜ重要か：** サンドボックスはどのエージェント基盤も掲げる安全の約束であり、ここではサンドボックス自体は無事だった——テナント境界はオーケストレータ自身の API 面だった。Compose ファイルの更新が入れ替えるのはコードであって secret ではない。アドバイザリはそれを読者に委ねず明記している。

[`🔗 CVE-2026-97693 レコード`](https://www.cve.org/CVERecord?id=CVE-2026-97693) · [`🔗 GHSA-qpm5-6332-9445`](https://github.com/xerrors/Yuxi/security/advisories/GHSA-qpm5-6332-9445) · [`🔗 NVD CVE-2026-97693`](https://nvd.nist.gov/vuln/detail/CVE-2026-97693)

---

## 26. Pocket ID はメールトークンをアドレスではなくユーザーに紐づけていた —— だから手放したアドレスを「検証済み」にできた

- **Velocity:** ▮▮ rising
- **ソース:** GitHub Advisory Database · CVE-2026-115770 · 公開 2026-11-04T23:17Z
- **タグ:** `cve` `identity` `oidc` `pocket-id` `account-linking`

`CVE-2026-115770` は passkey ベースの OIDC プロバイダ Pocket ID の **9.6**（`AV:N/AC:L/PR:L/UI:N/S:C/C:H/I:H/A:N`）。スター数は **10,005**。バグは 3 つの正常な機能の相互作用だ。`SendEmailVerification` はトークンを「only to the user's identifier」で束ね、`UpdateUser` はアカウントのメールを「without invalidating the outstanding token」変更し、`VerifyEmail` は「the current address as verified」とする。したがって一般ユーザーは、自分が制御するアドレスでトークンを要求し、アカウントを任意の未使用アドレスに変更し、古いトークンを引き換えられる——Pocket ID は新しいアドレスを `email_verified` が true の状態で公開してしまう。

到達可能性は既定値にある：「The default affected configuration uses `emailsVerified=false` and `allowOwnAccountEdit=true`」。レコードには前提が 1 つ明記されている——「the target address must not already belong to another Pocket ID user」——そしてこれは新入社員のメールボックスがまさに満たす条件だ。

下流の影響は言い換えずに引用したほうが正確だ。検証済みメールを自動アカウント照合やプロビジョニングに使うアプリケーションは「can link the attacker's identity to another user's account, while applications that rely exclusively on the stable OIDC `sub` claim are not affected by that downstream consequence.」

時系列：修正版 **2.12.0** の公開は **2026-07-29T23:05:53Z** で、**2026-11-04** のレコードより **98 日**前。プロジェクトは現在 **v2.19.2**（2026-10-22）。CWE-345。

**なぜ重要か：** `email_verified` は依存する側が「事実についての表明」として扱う唯一の claim だが、ここでそれが表明していたのはトークンの内容ではなく主体だった。緩和はパッチノートではなく設計原則になる。ある identity の表明が後続の編集で無効化されうるなら、その編集は表明も無効化しなければならない——そして `sub` ではなく `email` で即時プロビジョニングするアプリは、アップグレードしても残るバグの半分だ。

[`🔗 CVE-2026-115770 レコード`](https://www.cve.org/CVERecord?id=CVE-2026-115770) · [`🔗 GHSA-rm8c-2cv8-jwf6`](https://github.com/pocket-id/pocket-id/security/advisories/GHSA-rm8c-2cv8-jwf6) · [`🔗 Pocket ID v2.12.0`](https://github.com/pocket-id/pocket-id/releases/tag/v2.12.0)

---

## 27. ESP-IDF の TEE トラップ入口は呼び出し側のスタックポインタ経由で書き込む —— そして 6.x の修正版はまだ存在しない

- **Velocity:** ▮▮ rising
- **ソース:** GitHub Advisory Database · CVE-2026-113780 · 9.3 · 公開 2026-11-04T19:17Z
- **タグ:** `cve` `esp32` `tee` `firmware` `espressif`

`CVE-2026-113780` は ESP-IDF に対する **9.3**（`AV:L/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H`）で、機構はアセンブリの入口における順序の誤り：「the `esp_tee` trap entry in `esp_tee_vectors_plic.S` and `esp_tee_vectors_clic.S` saves a caller-controlled register frame through the REE-supplied stack pointer before switching to the trusted TEE stack or validating the pointer.」つまり REE 側のローカルな非特権アプリが「direct this machine-mode write into TEE-exclusive memory」でき、**ESP32-C5、C6、C61、H2** で REE/TEE の隔離境界を破り、TEE の制御フローデータを汚染しうる。セキュアサービスの `ecall` 経路と割り込み入口経路の両方に同じ順序の問題がある。

これを学術から運用の話に変えるのがバージョン情報だ。影響範囲は **from 5.5.5 until 5.5.6, 6.0.4, and 6.1.1** で、レコードは「is fixed in version 5.5.6 and is scheduled to be fixed in versions 6.0.4 and 6.1.1」と述べる。**v5.5.6** は **2026-10-16T14:32:14Z** に公開。しかし今日 ESP-IDF のリリース一覧を読むと最新は **v6.0.3**（2026-09-02）と **v6.1**（2026-08-27）で、**6.0.4 と 6.1.1 は存在しない**。6.x ラインにいる人にはインストールできるバージョンがない。レコード自体の公開は **2026-11-04T19:17:18Z**、5.5.x の修正から 19 日後である。

修正コミットは 4 本引用され、CNA は `GitHub_M`——Espressif 自身の採番ではなく GitHub 割当の CVE だ。

**なぜ重要か：** 「将来の修正バージョン」を名指しするアドバイザリは、修正日をバージョン番号の衣装で着せたものだ。ここでの正直な読みは、5.5.x は修正済みで 6.x はまだ、になる。このバグ種別は組み込みチームが軽視しがちなものでもある。TEE 境界が破れるのは切り替えの**直前の命令**であって、信頼されたコードの内側ではない。だから「ポインタを検証している」と「使う前に検証している」は同じことにならない。

[`🔗 GHSA-49x8-xqjg-2pjg`](https://github.com/espressif/esp-idf/security/advisories/GHSA-49x8-xqjg-2pjg) · [`🔗 NVD CVE-2026-113780`](https://nvd.nist.gov/vuln/detail/CVE-2026-113780) · [`🔗 ESP-IDF v5.5.6`](https://github.com/espressif/esp-idf/releases/tag/v5.5.6)

---

## 28. トークンを節約するプロンプト圧縮は、高い再建忠実度のままモデルの拒否を静かに弱める

- **Velocity:** ▮▮ rising
- **ソース:** arXiv 2611.06380 · 投稿 2026-11-04T11:42Z
- **タグ:** `ai-research` `safety` `compression` `alignment` `interpretability`

**Does Context Compression Preserve Refusal Alignment?** が問うのは、入力を忠実に再建できる圧縮エンコーダが、モデルの振る舞いも保つのかどうか。答えは否：「encoder-based compression systematically weakens refusal behaviour in instruction-tuned language models, despite high reconstruction fidelity」、しかもこの効果は「persists across model families and compression architectures」。

単なるリーダーボード観察を超えさせるのが機構の主張だ：「compression attenuates activation along the decoder's learned refusal direction.」拒否行動は活性化空間にある方向を持ち、圧縮はその方向の成分を縮める。意味内容は別の場所にあるので生き残る。論文は **Memory Steering** を提案する——「a lightweight inference-time intervention that restores refusal rates to near-baseline levels without retraining」で、圧縮表現空間の内部だけで動く。

システム設計に持ち込むべき結論は一文：「semantic preservation does not guarantee behavioural preservation under compression.」

数字を引く前に当てるべき限界はこれだ。抄録には具体値が一切ない——拒否率の差も、再建忠実度も、モデル名もない。したがってこれは機構を伴う方向性の主張で、大きさは本文にある。著者は Anthony Nguyen と Wenjun Lin の 2 名。

**なぜ重要か：** 長コンテキストのエージェントスタックは今やどれも予算に収めるために圧縮し、その受け入れ基準は「人間がまだ要約を読めるか」——まさに本論文が不十分だと示した指標だ。品質指標が保たれたまま安全特性だけが静かに劣化するのは、回帰として最悪の形であり、再建が忠実かどうかを確認することこそ、それを見逃す確認だ。

[`🔗 arXiv 2611.06380`](https://arxiv.org/abs/2611.06380) · [`🔗 全文（PDF）`](https://arxiv.org/pdf/2611.06380)

---

## 29. CASE-Bench：コーディングエージェントに良いリポジトリ文脈を与えると機能で 8.2 点、安全で 3.7 点

- **Velocity:** ▮▮ rising
- **ソース:** arXiv 2611.06294 · 投稿 2026-11-04T10:29Z
- **タグ:** `ai-research` `security` `benchmark` `coding-agents` `context`

**A.S.E 2.0** は **CASE-Bench** を構築した——「a benchmark of 145 repository-level tasks from real CVEs in 51 projects」。各タスクは Docker で走り、「has functional tests and a proof-of-concept exploit validated in both directions」、そして「the repository code that enforces or undermines its security」が注記される。問いは、セキュアコーディングのベンチマークが普通は固定してしまう変数だ。文脈構築は「designed almost exclusively for functional correctness」なので、モデルがプロジェクトの認可チェックを見たのか、真似すべき不安全なコードを隣に見たのかは、これまで変えられてこなかった。

**13 種の文脈構築手法**、6 つの対照、6 つの LLM での結果は 3 つ：

- 「(1) functionality-oriented context raises the functional pass rate by up to 8.2 percentage points (pp) but the secure pass rate by at most 3.7 pp」——誰もが出荷している最適化は、それが調整された軸でおよそ 2 倍の価値しかない。
- 「(2) withholding a safeguard lowers the secure pass rate by up to 8.1 pp, while one inserted insecure exemplar raises correct-but-exploitable code by 6.3 pp」——悪い例を 1 つ入れるのはガードを外すのとほぼ同じくらい害で、しかも機能的テストは通るコードを生む。
- 「(3) coding agents observe the relevant safeguard in only 27-36% of trajectories」——大半の場合、エージェントはそれを制約するファイルをそもそも読んでいない。

**なぜ重要か：** プロンプトでは直せないのは 2 番目だ。「correct-but-exploitable」は機能テストとほとんどのセキュリティレビューの両方をすり抜ける分類で、テストスイートは不安全な例も満たす同じ仕様に対して書かれているからだ。27〜36% という数字は問題の位置づけも変える。まずこれは推論の問題ではなく検索の問題であり、3 分の 2 の軌跡は関連するガードレールにそもそも辿り着いていない。

[`🔗 arXiv 2611.06294`](https://arxiv.org/abs/2611.06294) · [`🔗 全文（PDF）`](https://arxiv.org/pdf/2611.06294)

---

## 30. D3D は現在のブロックが検証されている間に次のブロックを起草する —— 32B ターゲットで 5.71 倍

- **Velocity:** ▮▮ rising
- **ソース:** arXiv 2611.06425 · 投稿 2026-11-04T12:27Z · GitHub にコード公開
- **タグ:** `ai-research` `inference` `speculative-decoding` `diffusion` `throughput`

投機的デコーディングには空転の窓がある。拡散ドラフタは 1 パスでブロックを出せるが、「each new block must wait for updated target-model hidden states」なので、起草と検証が直列化する。**D3D**（Decoupled Diffusion Drafting）はこの依存を外す——「blockwise denoising with auxiliary autoregressive supervision」を組み合わせた単独の拡散ドラフタで、ターゲットの隠れ状態なしに長い受理プレフィックスを得る。これにより「draft successor blocks during verification in one packed pass」が可能になる。

実務側の半分は圧縮だ。層は受理長への影響で剪定され、「Removing five of 36 layers retains over 99% of mean acceptance length across three benchmarks with Qwen3-8B as the target.」

7 ベンチマークの平均高速化は、ターゲット Qwen3-8B で **5.00×**、Qwen3-32B で **5.71×**。DFlash は同じ条件で **4.03×** と **3.67×**。Qwen3-32B の GSM8K では **7.48×** に達する。比較対象の選び方は妥当——同系統のドラフタ、同じベンチマーク——そしてコードは `fudan-generative-vision/D3D` で公開されている（9 スター、最終 push 2026-11-01。出たばかりの成果物であり、保守されているプロジェクトではない）。

**なぜ重要か：** 数字の非対称こそが発見だ。ターゲットが大きくなると DFlash は相対的に遅くなり（4.03× → 3.67×）、D3D は速くなる（5.00× → 5.71×）。これは「利得がドラフト品質ではなく検証窓の充填から来る」なら当然の形で、大きなターゲットほど窓が長いからだ。投機的デコーディングは 2 年間ドラフタを中心に最適化されてきた。この論文が扱うのはスケジュールである。

[`🔗 arXiv 2611.06425`](https://arxiv.org/abs/2611.06425) · [`🔗 fudan-generative-vision/D3D`](https://github.com/fudan-generative-vision/D3D) · [`🔗 全文（PDF）`](https://arxiv.org/pdf/2611.06425)

---

## 31. モデルマージに LoRA rank の統一は要らない —— 統一を前提とする手法は instruction adapter を丸ごと捨てている

- **Velocity:** ▮ steady
- **ソース:** arXiv 2611.06486 · 投稿 2026-11-04T13:26Z
- **タグ:** `ai-research` `lora` `model-merging` `fine-tuning` `evaluation`

モデルマージは別々に微調整した専門家を再学習なしで 1 つにまとめる。通例は全専門家を同じ LoRA rank で訓練するが、これは「even though each domain has its own best rank」——領域をまたいで rank の選択を結合してしまう。論文の主張は、この結合が「is a property of the merge method, not of merging」だという点。実験は 3 領域（数学・指示追従・多言語）、4 つの rank、3 つのモデル規模で **36 の専門家**を訓練し、6 つの手法でマージする。

結果は手法の系列できれいに分かれる。「Giving experts different ranks costs averaging and utility-based selection nothing, and gains them up to 1.8 pp of multi-domain accuracy, while the conflict-resolution methods are inconsistent and can lose up to 4 pp.」機構は選択規則にある。マージは「keeps only a fixed share of the pooled spectral components, and methods that choose them by size discard many that would have reduced loss」——しかも捨てるのは**同じ**専門家だ。「The instruction adapter has the smallest singular values, so it is dropped almost entirely and IFEval falls by 16 to 25 pp.」

loss への効果で選ぶと 3 専門家すべてが残り、8 倍の rank 範囲で精度はほぼ平坦になる——0.7 pp、TIES は 4B 規模で 6.7 pp。

**なぜ重要か：** IFEval の 16〜25 ポイント低下は調整の揺れではない。マージ手法が、マージした 3 専門家のうち 1 つを静かに削除しているのであり、症状はマージしたら指示追従が悪くなった、に見えてバグには見えない。運用上の規則は一文：マージ演算子が大きさで選ばない限り rank は専門家ごとに選べる。大きさで選ぶなら、ノルム最小のアダプタは最も重要でないアダプタではない。

[`🔗 arXiv 2611.06486`](https://arxiv.org/abs/2611.06486) · [`🔗 全文（PDF）`](https://arxiv.org/pdf/2611.06486)

---

## 32. SumOne は捨てたものを凍結モデルに再建させることで、エージェントの要約器を訓練する

- **Velocity:** ▮ steady
- **ソース:** arXiv 2611.06445 · 投稿 2026-11-04T12:49Z
- **タグ:** `agent-infra` `memory` `context-compaction` `grpo` `open-source`

長距離エージェントのコンテキスト圧縮は、たいてい本当に重要なもの——下流タスクのスコアやソルバの挙動——に対して訓練される。これは要約器を特定のタスクと特定のエージェントに縛りつける。**SumOne** はそこを再建報酬に置き換える：「Given a summary of the expired history, a frozen reconstructor recovers randomly masked portions of the original trajectory; reconstruction quality, combined with a length penalty, provides a task-agnostic reward for optimizing the summarizer with GRPO.」参照要約もタスク実行も要らない。

推論時は「only the lightweight summarizer is retained, enabling plug-and-play context compression for otherwise unchanged agents」、そしてこのチェックポイントは「transfers across downstream models and agent harnesses without additional fine-tuning」。長距離検索とソフトウェアエンジニアリングのタスクで、「reduces estimated inference cost by approximately 78% on DeepSearchQA and 75% on SWE-bench Verified relative to operating with full context」。

精度側は「absolute decreases of 0.04」と書かれるが、指標のスケールが示されていない。抄録で読者が大きさを測れない唯一の数字だ——0〜1 の通過率なら 4 ポイント、0〜100 のスコアなら無に等しい。

**なぜ重要か：** 興味深い設計判断は訓練信号そのものだ。凍結モデルが捨てた情報をまだ復元できるか、と問うのは安価で、タスクを必要とせず、あるベンチマークの形を覚えた要約器には騙せない情報保持の代理指標であり、それこそ論文が避けようとしている失敗だ。未解決なのは、再建忠実度と下流の有用性が別の設定ではすでに分岐することが知られている点で（第 28 項）、この報酬の独立性はそのまま盲点でもある。

[`🔗 arXiv 2611.06445`](https://arxiv.org/abs/2611.06445) · [`🔗 全文（PDF）`](https://arxiv.org/pdf/2611.06445)

---

## 33. Horizon は 12,624 スターのニュースレーダーで、profile 体系も MCP サーバも skill もある —— ただし release も tag も 1 つも無い

- **Velocity:** ▮ steady
- **ソース:** GitHub Trending（デイリー）· 本日 121 スター · MIT · 最終 push 2026-11-03T17:20Z
- **タグ:** `agent-infra` `mcp` `skills` `rss` `open-source`

`Thysrael/Horizon` は MIT の Python プロジェクトで、自称「your own AI-powered news radar」。RSS、Hacker News、Reddit、Telegram、X、GitHub、金融系フィードから取り込み、「collects, filters, and deduplicates them, then brings the worthwhile ones to you with context and community discussion」。**2026-02-20** 作成、**12,624 スター**、2026-11-03 にも push があり、英中 2 言語の日次ブリーフィングを Markdown、GitHub Pages、メール、WeChat、webhook で配信する。

盗む価値のある設計判断は **profile** だ。「A profile is a reusable set of editorial rules: what belongs, what's worth keeping, and what to write.」各ソースは profile（組み込みは `tech-news`、`tech-blog`、`ai-creator`）にルーティングされ、profile ごとに採点 rubric、しきい値、重複排除規則、出力形式を持つ。分析・フィルタ・重複排除は**エンリッチの前**に行われる。`src/mcp/` に MCP サーバもあり、アシスタントがパイプラインの各段階を呼べる。skill での導入も用意されている——`npx skills add Thysrael/Horizon --skill horizon -g`。

勧める前に確認すべき成果物の状態がこれだ。このリポジトリの releases と tags のフィードを直接読んだ：**release 0 件、tag 0 件**。このプロジェクトから導入できるものはすべて 2026-11-03 時点の既定ブランチそのままで、skill も含め、固定できるバージョン付き tag が存在しない。

**なぜ重要か：** ソースごとの編集 rubric はフィードにとって正しい抽象化だ。何を読むかとどう書くかを分離しており、ほとんどのアグリゲータはそれを 1 つのプロンプトに押し込んでいる。tag の不在は、このフィードが繰り返し見つけてきたサプライチェーンの形でもある。1.26 万スターと文書化された導入手順がありながら、レビュー済みの状態が存在せず、「commit を固定せよ」はプロジェクト自身がまだ出せない助言になっている。

[`🔗 Thysrael/Horizon`](https://github.com/Thysrael/Horizon) · [`🔗 ライブデモ`](https://thysrael.github.io/Horizon/) · [`🔗 GitHub Trending`](https://github.com/trending)

---

## 34. Qualcomm の Cloud AI 100 Ultra は 128 GB を 548 GB/s・150 W で動かす —— そして自社の仕様表に誤記がある

- **Velocity:** ▮ steady
- **ソース:** qualcomm.com 製品ページ · HN 116 ポイント · 約 20 時間前（約 00:00 UTC+8）
- **タグ:** `hardware` `inference` `qualcomm` `datacenter` `specs`

Qualcomm の **Cloud AI 100 Ultra** は PCIe FH3/4L の推論カードで、**TDP 150 W**、**最大 870 TOPS INT8**、**最大 288 TFLOPS FP16**、オンダイ SRAM **576 MB**、**AI コア 64 基**、**128 GB** DRAM、**PCIe Gen4 ×16** で **548 GB/s**。NVLink もホストメモリのコヒーレンスもなく、スロット以外の相互接続はない。**AI Inference Suite** が付属し、チャット・画像生成・マルチモーダル・RAG 向けの OpenAI 互換 API を Kubernetes かベアメタルコンテナで提供する。

面白い成果物はファミリ表で、「Ultra」という接尾辞が何を買うのかが見える。**AI 80 Ultra** は**同じ** 150 W、**同じ** 128 GB、**同じ** 548 GB/s で、違うのは計算能力だけ——618 TOPS INT8、222 TFLOPS FP16 対 870 と 288。**AI 100 Pro** は 75 W、32 GB、137 GB/s のハーフハイトカード、8 レーンに下がる。

4 つの SKU を横に読むと比は一定だ。548 GB/s 対 128 GB、137 GB/s 対 32 GB はどちらも**容量 1 GB あたり 4.3 GB/s**。容量と帯域が一緒にスケールするのは HBM ではなく LPDDR 系の指紋であり、1 枚のメモリが「多数の並行した小モデル」向けに設計されていて「大きなモデル 1 つを高速にデコードする」向けではないことを意味する。

ベンダ自身のページの細部を 1 つ。両 Ultra SKU の DRAM 欄は「128 GB **LPR4x**」と書かれているが、これは LPDDR4x の誤記であって型番ではない。

**なぜ重要か：** このカードの用途を決める仕様は、見出しに無いほうだ——548 GB/s が制約であり、だから売り文句が「単一モデルの高速デコード」ではなく「低電力で数百の並行推論ストリーム」になる。ベンダ間で TOPS を比べるのは、この数字を伴わないとほぼ無意味であり、「128 GB」も同じだ。ここでのそれは帯域あたりではなく、ワットあたり・スロットあたりの容量を指している。

[`🔗 Cloud AI 100 Ultra`](https://www.qualcomm.com/data-center/products/cloud-ai-100-ultra) · [`🔗 製品ブリーフ（PDF）`](https://www.qualcomm.com/content/dam/qcomm-martech/dm-assets/documents/Prod-Brief-QCOM-Cloud-AI-100-Ultra.pdf) · [`🔗 HN ディスカッション`](https://news.ycombinator.com/item?id=50370654)

---

## 35. Xbox 360 hypervisor エクスプロイトは「20 分・成功率 30%」から「ほぼ瞬時・ほぼ 100%」になった —— 20 ビットの参照表のおかげで

- **Velocity:** ▮ steady
- **ソース:** icode4.coffee · 2026-11-04 · HN 78 ポイント
- **タグ:** `reverse-engineering` `xbox360` `exploit` `hardware` `writeup`

Ryan Miceli による Xbox 360 hypervisor の第 3 回は短く、PoC 公開後に何が変わったかが主だ。見出しになる変化はこれ：「how it went from taking ~20 minutes with a ~30% success rate to being near instantaneous with a near 100% success rate.」

それを成し遂げた変更は 2 つ。1 つ目はゲームディスクという入口を外したこと。**Rock Band Blitz** の体験版にあったセーブファイルのエクスプロイト（「DaTArrest」、`ihatecompvir` と `InvoxiPlayGames` による）が stage 2 の ROP チェーンへ繋がる。さらに本体が USB ストレージに対応した際、HDD やメモリユニットからの起動を許されたパッケージが**USB ストレージ**にも拡張されたため、この体験版パッケージは普通のファイルとして USB メモリにコピーし、対応バージョンの任意の本体で起動できる。

2 つ目は著者自身の盲点の修正だ。メモリ暗号化の whitening 値は **12 ビット**で、任意の平文に対して **1024 通り**の暗号文がある。最初の PoC は必要な 1 通りしか生成していなかった——その参照表は試して諦めていたものだ。理由も率直に書かれている。古い hypervisor は暗号化範囲の TLB をフラッシュしていたが後のビルドでは行われず、システムコールを直接呼ぶと whitening ビットが古いままになり、表は「was causing issues」を起こした。「by the time I got to the end of the exploit I had become so blinded by tunnel vision chasing CPU cache issues that I had convinced myself the lookup table just wasn't going to work.」作り直した表は期待される暗号文の **20 ビット**で索引し、oracle 値（衝突検証用）と悪意ある置換値の両方を格納し、衝突は意図的に無視する。わずかな衝突は競合ループの反復を数回飛ばすだけで済み、ハッシュテーブルにバケット対応を実装するより安い、と記事は述べる。

**なぜ重要か：** これはエクスプロイト開発で最もよくある失敗の見本だ。欠けていたのはプリミティブではなく、プリミティブについてのモデルのほうで、壊れた試作が出した否定的な結果を新しい前提で再検証しないまま数週間抱えていた。修正は 1024 倍の事前計算と、以前の実験が無効だったと認めたことだった。第 4 回は peer pressure エクスプロイトを扱う。

[`🔗 Hacking the Xbox 360 Hypervisor Part 3`](https://icode4.coffee/?p=1746) · [`🔗 HN ディスカッション`](https://news.ycombinator.com/item?id=50372164)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-05T04:27:03Z |
| Items | 35 |
| Sources tracked | 24（Hacker News、GitHub Trending、NVD、CVE.org、CISA KEV、GitHub Advisory Database、ベンダ PSIRT、arXiv、Hugging Face、ベンダ工学ブログ） |
| Update schedule | 04:03, 12:03, 20:03 UTC+8（1 日 3 回） |
| Ranking | 速度加重（新しさ × エンゲージメント加速度 × 情報源の権威） |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[前日](../2026-11-04/) · [生 .md](https://trending.md/jp/feed/2026-11-05.md) · [アーカイブ](../../archive/)
