---
date: 2026-11-05
updated: 2026-11-04T20:30:18Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 26
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
- **ソース:** arXiv 2611.03998 · 投稿 2026-11-01 · ウェイトは Hugging Face
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

`scenario-labs/skills` は MIT ライセンスの Agent Skills 群で、「teach AI coding agents (Claude Code, Cursor, Codex, Copilot, and 70+ others) how to create production-ready content with Scenario through the Scenario MCP server」——画像、動画、音声、テクスチャ、スカイボックス、3D アセット、カスタム学習モデル。README にも MCP ドキュメントにも総数はないので、git ツリーを自分で数えた：**`SKILL.md` は 174 個**、**82 個のトップレベルディレクトリ**にまたがる——うち **80 ディレクトリ**が `scenario-*` スキルで、残りのファイルは `dcc/`（**35**）と `game-engines/`（**52**）の「expert tools」ファミリに入る。後者は MCP サーバではなく、ZBrush、Blender、Maya、Unreal、Unity、Godot、Roblox Studio のインストールを必要とする。

リポジトリの description にある売りは「メディア生成」より狭い：スキルは「pick the right model, price before spending, and keep characters and brands consistent」。スキル一覧がそれを裏づける——ベンダごとのラッパー（`scenario-veo`、`scenario-seedance`、`scenario-kling`、`scenario-vidu`、`scenario-wan`、`scenario-runway`、`scenario-elevenlabs`、`scenario-meshy`、`scenario-rodin`）と、`scenario-quality-gate`、`scenario-refine-loop`、`scenario-model-comparison` のようなワークフロー系が並ぶ。

運用上の細部が二つ、そのまま真似する価値がある。インストールは固定できる：`npx skills@1.7.4 add scenario-labs/skills#<commit> --skill <name>`——「To install a reviewed state instead, pin both the installer and the commit, taken from a release's tag.」。そしてインストーラのトピックグループは「cannot be selected from the command line」だ。CLI は `--skill` を正確なスキル名としか照合しないためで、これは本リポジトリのバグではなく上流の未解決 issue（`vercel-labs/skills#992`）である。

**なぜ重要か：** 174 項目あって個別バージョンを持たないマーケットは、レビュー点が一つしかないサプライチェーン面だ——README がコミット固定を明記している理由であり、各 DCC ファミリが自前の README に「how it was built and how far it was verified」を記録している理由でもある。

[`🔗 scenario-labs/skills`](https://github.com/scenario-labs/skills) · [`🔗 Scenario MCP ドキュメント`](https://mcp.scenario.com/docs)

---

## 17. セッションが未完了タスクを挟むと、コーディングエージェントは 11.5 ポイント失う

- **Velocity:** ▮ steady
- **ソース:** arXiv 2611.02017 · 投稿 2026-10-31
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
- **ソース:** arXiv 2611.05036 · 投稿 2026-11-02
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

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-04T20:30:18Z |
| Items | 20 |
| Sources tracked | 26（Hacker News、GitHub Trending、NVD、CISA KEV、GitHub Advisory Database、ベンダ PSIRT、arXiv、Hugging Face、ベンダ工学ブログ） |
| Update schedule | 04:03, 12:03, 20:03 UTC+8（1 日 3 回） |
| Ranking | 速度加重（新しさ × エンゲージメント加速度 × 情報源の権威） |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[前日](../2026-11-04/) · [生 .md](https://trending.md/jp/feed/2026-11-05.md) · [アーカイブ](../../archive/)
