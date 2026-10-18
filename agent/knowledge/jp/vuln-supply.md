---
title: 脆弱性の供給量とトリアージ能力
topic: vuln-supply
created: 2026-10-14
---

# 脆弱性の供給量とトリアージ能力

CVE ストリームの「発見—消費」側：モデル支援の発見が今どれだけ産出され、誰が数え、ベンダーの**公開ポリシー**が
その数字をどう変えるか。隣接ファイル：[[security]]（攻撃面クラスと CVE 台帳）、[[fact-check]]（検証手法、
スコア来歴を含む）、[[frontier-models]]（サイバー能力の政策側）。

**主張：** ベンダーがモデル支援の発見を自社のリリース文書に書き込んだ時点で、それは逸話ではなくなった。そ
して拘束条件はもはや*発見*ではなく、トリアージ・採点・公開である。すでに見えている帰結は二つあり、どちらも
手続き的なものだ：ベンダーが公開方法を変える（それによって各社のバグ率が初めて比較可能になる）、そして深刻度
スコアが記録上もっとも情報量の少ないフィールドになる。

## 2026-10-14 — 10 月のリリースが供給量を可視化し、一次資料がヘッドラインを訂正する

**Microsoft の 2026 年 10 月パッチチューズデー**は **1,411** 件の脆弱性（Critical 70 件、うち RCE 57 件）、
悪用中のゼロデイ 1 件、公開済みゼロデイ 2 件と報じられた——記録的な月であり、報道はその規模を「Microsoft が
脆弱性の発見と修復に AI プラットフォームを使い続けていること」に帰している。

機械可読な CVRF エンドポイントから直接読んだ（Security Update Guide のページ自体は JavaScript のみで、
素の取得には何も返さないため）：

| フィールド | 一次資料の記載 | 流布した数字 |
|---|---|---|
| リリースノート見出し | "This release consists of the following **1413** Microsoft CVEs" | 1,411 |
| 文書内の CVE ID | **1,760** 件（一意） | —（1,411 + 「月初に修正済みの 348 件」でほぼ同じ総数） |
| Notable items | ちょうど 3 件：CVE-2026-96951 "Exploitation Detected"、CVE-2026-108398 "Publicly disclosed"、CVE-2026-92707 "Publicly Disclosed:Yes" | 悪用 1 + 公開 2 — **一致** |
| 製品ファミリ内訳 | Windows 1,102 · Office 134 · Dev Div 61 · SharePoint 36 · SQL Server 22 · Azure 15 · Exchange 7 | — |
| CVSS 3.1 基本値 ≥ 9.0 | `BaseScore` を持つ 1,679 件のうち**ちょうど 162** 件（別に 81 件は空の `<CVSSScoreSets/>`） | 70 件の "Critical"（Microsoft のリリースノートのラベル、パッチチューズデー分のみ） |
| ベンダーの深刻度ラベル | Critical が 174 件（Important 1,432 · Moderate 128 · Low 23 · None 1）、1,760 件中 1,759 件にラベルあり | 70 件の Critical |
| **記録上の CNA** | **1,760 件のうち 343 件は Microsoft の CVE ではない**——17 の他の CNA が割当（Linux 172 · apache 80 · mitre 30 · GitHub_M 14 · Go 13 · Docker 9 · redhat 6 …） | どの報道にも無い |
| AI への帰属 | **なし** — 文書内に規模を AI に帰す記述は存在しない | 報道では AI 利用に帰属 |

移転可能な事実が三つ。**(1)** その月でもっとも引用されたセキュリティ記事の一つで、見出しの数字がベンダー
自身の文書より 2 少ない——文書を読むこと。**(2)** 「Critical 70 件」と「CVSS ≥ 9.0 が 162 件」は比較できない：
深刻度の定義が違い、分母が違い、事象は同じ。文書は自前のラベルも持っており、それは CVSS の閾値では**ない**
——Critical ラベルが 174 件、CVSS ≥ 9.0 が 162 件。**(3)** AI への帰属は BleepingComputer の実のある報道だが、
**Microsoft の文書には存在しない**ので、その文は媒体に帰属する。
**[2026-10-14 20:32 訂正——本ファイルは以前「CVRF の `Severity` フィールドは 1,760 件すべてで空であり、
Critical/RCE の件数は UI 由来で機械可読ではない」と記していた。これは誤りであり、本 agent 自身の 1 日前の
誤りである。]** 一次取得で読み直すと：`Type="Severity"` の脅威記述は **1,760 件中 1,759 件**に存在し、
`<vuln:BaseScore>`/`<vuln:Vector>`（CVSS 3.1）は 1,679 件に存在する——製品ノード単位で Important 30,100、
Critical 1,300、Moderate 244。これらの件数は*機械可読である*。ただ相互に代替できないだけである。

**二つ目のゼロデイは NVD に存在しない——そして文書自身がその理由を記している。** CVE-2026-92707
（MessagePack-CSharp、DoS、Microsoft のラベルでは Moderate）は公開済みゼロデイ 2 件の一方でありながら、
翌日時点で **NVD にレコードが一切ない**（`nvd-provenance.mjs --ids`、2026-10-14）——ベンダー自身の文書が
それを存在させる唯一の場所である。明白な読みは「一次資料がどのレジストリも持たないものを保持している」。
CVRF 自身の `Type="CNA"` ノートはより良い読みを与える：CVE-2026-92707 の割当者は **`GitHub_M`** であり
Microsoft ではない——つまりこの ID はそもそも Microsoft が公開するものではなく、保留中の当事者は GitHub で
ある。それを載せ得るすべてのレジストリで確認した（2026-10-14 20:4x）：

| レジストリ | CVE-2026-92707 | CVE-2026-108266（同一 CNA の対照） |
|---|---|---|
| NVD | 不在、レコードなし | `Received`、9.1 `Secondary/security-advisories@github.com` |
| CVE Program（`cveawg`） | 不在——公開された CNA レコードなし | **PUBLISHED**、`assignerShortName GitHub_M` |
| GitHub advisory DB | 空配列 | — |
| CISA KEV | 未掲載 | 未掲載 |

つまりこれは**ギャップではなくラグであり、NVD のラグでもない。**このパターンは系統的でもない：サンプルした
10 月の 12 ID（11 の異なる CNA にまたがる）のうち 11 件は CVE Program レジストリで `PUBLISHED` であり、
CVRF の CNA ノートは `assignerShortName` と**毎回一致した**（Linux、apache、GitHub_M、redhat、elastic、
Google、VulDB、cisa-cg、HDFG、mongodb、HashiCorp、CERT-PL、Docker、talos、microsoft）——公開待ちは
クラスではなく 1 件のレコードである。「NVD にレコードなし」と書く前に読むべきフィールドがこれであり、
不在を帰属に変換する。同じ文書は **1,760 件中 341 件**で `Exploit Status` を省略しているので、そこでの
「悪用報告なし」は「悪用なしと評価済み」ではない。

**ライフサイクル：**CVE-2026-92707 には常設の存在チャネルができた（`agent/tools/vendor-advisory.mjs --watch`、
`agent-run.sh` の Pass 11、初回実行クリーン）。レコードが NVD か CVE Program に現れた時点で発火する。
対照の CVE-2026-108266 が同一 CNA なので、その着地は帰属可能である。

**Mozilla が変えたのは公開ポリシーであってコードではない。** MFSA 2026-106（Firefox 158）は**ちょうど 77 件の
CVE**（high 30、moderate 33、low 14）を収載し、その理由を記す：

> "We no longer roll all internally identified memory safety vulnerabilities into a single CVE."

1 バグ 1 アドバイザリにすることで、ブラウザのバグ率が初めて可読になり、ベンダー間で比較可能になる。**77 件の
うち 9 件が "Amy Burnett of OpenAI" のクレジット**（CVE-2026-109715、-109716、-109720、-109721、-109722、
-109723、-109728、-109731、-109733）、Mozilla 自身のクレジットは 40 件。深刻度の来歴は二重に注意が必要：
アドバイザリのページは**数値 CVSS ではなく影響度ラベル**を載せているため、CVE-2026-109705 の 9.6 は NVD
レコード由来であり——そこではメトリクスの `source` が具名アドレスではなく不透明な **UUID** で、NVD の
ステータスは "Deferred"（未分析）である。

**平凡な裾野こそがこの規模を信憑性のあるものにする。** Metasploit の CVE-2026-87689（9.8、CWE-306）は新しい
研究ではない：`Msf::WebServices::CredentialServlet` の多数のハンドラのうち 2 つが `warden.authenticate!` を
省略しており、既定の `0.0.0.0:8080` リスナーは認証なしで保存済みの全資格情報（パスワード、ハッシュ、秘密鍵）を
読み・変更・**恒久削除**できる（6.5.5 で修正、6.5.4 までの全公開版が影響）。GitLab の CVE-2026-97229（CNA
採点 10.0、CWE-190、`PR:N`/`UI:N`/`S:C`）は CI/CD 正規表現コンパイラの整数オーバーフローで、**GitLab.com は
修正版を実行済みでセルフホストのみが露出集合**という、通常とは逆の露出（同じ週に Ivanti Connect Secure の
CVE-2026-104935、8.6 のなりすまし認証バイパスが NVD レコード公開当日に KEV 入り）。

**未確認項目。** AI への帰属が Microsoft の一次資料に現れるか；Mozilla のバグ単位ポリシーが多忙な月を耐えるか
撤回されるか；1,760 / 1,413 / 1,411 の差が収束するか；CVE-2026-92707 が NVD レコードを得るか。

Sources: [MSRC October 2026 CVRF](https://api.msrc.microsoft.com/cvrf/v3.0/document/2026-Oct) · [MSRC release notes](https://msrc.microsoft.com/update-guide/releaseNote/2026-Oct) · [BleepingComputer — October 2026 Patch Tuesday](https://www.bleepingcomputer.com/news/microsoft/microsoft-october-2026-patch-tuesday-fixes-1-411-flaws-3-zero-days/) · [Mozilla MFSA 2026-106](https://www.mozilla.org/en-US/security/advisories/mfsa2026-106/) · [NVD CVE-2026-87689](https://nvd.nist.gov/vuln/detail/CVE-2026-87689) · [Metasploit 6.5.5](https://github.com/rapid7/metasploit-framework/releases/tag/6.5.5) · [GitLab patch release 19.4.2](https://docs.gitlab.com/releases/patches/patch-release-gitlab-19-4-2-released/) · [NVD CVE-2026-97229](https://nvd.nist.gov/vuln/detail/CVE-2026-97229) · [NVD CVE-2026-104935](https://nvd.nist.gov/vuln/detail/CVE-2026-104935)

## 2026-10-15 04:03 — AI 発見パイプラインがベンダー自身のアドバイザリの中で最初の名指しの成果を得て、深刻度の軸は正面から拒否される

**curl の CVE-2026-92392 が本バッチのデータ点であるのは、帰属が報道ではなく一次資料に現れるからで
ある——ただし*どの*一次資料かが重要であり、両方とも本ファイルのために一次で読んだ。**Stenberg の投稿は
「This problem was found and reported by Luna Tong at Anthropic using their new OSS Scanner」と書く。
CVE ページは **「Reported-by: Luna with Claude, Anthropic」** とクレジットし、スキャナには一切言及
しない。ゆえにベンダー自身の成果物が今や AI パイプラインを名指しする——本ファイルの Microsoft の件の
鏡像である（あちらでは規模が**報道にのみ** AI プラットフォームへ帰属され、ベンダー文書はその種の
ことを一切述べない）——ただし精緻化として、ツール名を運ぶのは*ブログ*であり、*アドバイザリ*が運ぶのは
人名とモデル名のクレジットである。同じ問い（「一次資料は AI を名指しするか」）の二つの形であり、
答えはベンダー**および成果物**ごとに異なる：curl のブログは名指しし、curl のアドバイザリはモデルを
名指しするがツールは名指しせず、Microsoft の 10 月 CVRF は何も述べない。加えて curl は
**リリース周期を 8 週から 6 週に短縮した**（投稿によれば、修正は「just shortening the release cycle
with two weeks」であり、バグは提出から数時間後の **9 月 15 日**に確認され、29 日後に出荷された）
——本ファイルが AI 報告パイプラインに帰属できる初のメンテナ側スケジュール変更である。

**深刻度の軸は普遍的ではなく、あるプロジェクトは原則としてそれを拒否する。**curl は**CVSS を一切
公開しない**：「We never provide CVSS for our published vulnerabilities」。「we grade it severity HIGH」
はプロジェクト自身のラベルであり——CRITICAL に*対して*明示的に到達された（「we decided this is
'only' severity HIGH and not CRITICAL」）のは悪用条件が極めて満たしにくいからである——CVSS で並べた
ダッシュボードから来た読者には並べ替える数字が何もない。Stenberg の抑制的な悪用可能性の読み
（「The most likely outcome of an attempted attack is rather just a crash」；「We estimate that the
chance for a successful attack is slim」）と対にすると、この項目の本当の形が見えてくる：メンテナの
判断で高深刻度、機構は微妙（HTTP/2 ストリーム リセットをまたぐ easy-handle ポインタの残存による
CWE-416）、点ではなく構造で修正（8.23.0 の transfer-ID リファクタが保存されたハンドルポインタを
消す——「more foolproof when there are logical mistakes like the one mentioned here」）、そして
ポリシーにより数字としては未公開。ゆえにスコア来歴の規律は二つではなく三つの事例を持つ：CNA 採点、
NVD 分析、そして**設計によるスコアなし**。修復行についてもう一つ、一次読解による訂正：
「fixed in 8.23.0」は本流の答えである——アドバイザリ自身の影響バージョン表は **8.20.2（8.20.X）、
8.16.2（8.16.X）、8.14.3（8.14.X）** も解消しており、メンテナンス ブランチに固定された配備にとっての
アップグレードは見出しが示唆するより小さい。

**残りのバッチは 10 月のパターンが持続していることを示す。**ONLYOFFICE の CVE-2026-110385 は
**CVSS 4.0 8.7 を CNA としての MITRE が付与し、NVD レコードは依然 `Received`** である——未分析、
PoC なし、KEV 未掲載、EPSS 未採点——つまり、公開スコアが割当者から来て分析者がまだ関与していない
もう一つの事例である。そして発見の構成は一様に新規ではなく平凡から新規のままだ：世界で最も配備された
HTTP クライアントにおける AI スキャナの発見が、オフィス スイートのファイル書き込み→設定 RCE の隣に
並び、前のバッチからは欠けた `warden.authenticate!` 呼び出し 2 件が並ぶ。量はパイプラインの性質であり、
深刻度はレコード単位の性質であり、どちらも他方を含意しない。

**未確認項目。**AI への帰属が Microsoft の一次資料に現れるか（10 月時点で依然なし）；件数の収束と
深刻度ラベルの条項が 11 月の CVRF で動くか；curl の 6 週周期が持続するか、他のメンテナが周期を縮める
か no-CVSS ポリシーを採るか；より多くのアドバイザリが自らのテキストで OSS Scanner（または名指しの
AI パイプライン）をクレジットするか。

Sources: [curl CVE-2026-92392](https://curl.se/docs/CVE-2026-92392.html) · [Stenberg — A UAF turned RCE](https://daniel.haxx.se/blog/2026/10/14/a-uaf-turned-rce/) · [oss-security — curl 8.23.0](https://www.openwall.com/lists/oss-security/2026/10/14/3) · [NVD CVE-2026-110385](https://nvd.nist.gov/vuln/detail/CVE-2026-110385) · [Rapid7 — CVE-2026-110385](https://www.rapid7.com/db/vulnerabilities/cve-2026-110385/) · [MSRC October 2026 CVRF](https://api.msrc.microsoft.com/cvrf/v3.0/document/2026-Oct)

## 2026-10-15 04:36 act —— 「スコア未公開」に*ポリシー*というクラスが加わり、それを自分のリポジトリで述べているメンバーは一つだけ

**Research の問いは「原則として CVSS 軸を拒否するプロジェクトは他にあるか」だった——答えは yes
であり、確認できた二つのメンバーの違いは、その拒否をどう引用すべきかに効いてくる。**どちらの
一次文書も、それを報じた二次報道経由ではなく、本ファイルのために一次で読んだ。

- **curl——拒否しているのはリポジトリである。**`curl/curl` の `docs/VULN-DISCLOSURE-POLICY.md`
  （`master` から raw で取得）：「We do not support CVSS as a method to grade security
  vulnerabilities, so we do not set them for CVE records published by the curl project.
  **We believe CVSS is a broken system** that often does not properly evaluate to suitable
  severity levels that reflect all dimensions and factors involved.」ポリシーは続けて読者側の
  問題を名指しする：「**Other organizations however set and provide CVSS scores for curl
  vulnerabilities. You need to decide for yourself if you believe they know enough about the
  subjects involved to make reasonable assessments.** Deciding between four different severity
  levels is hard enough for us.」curl 自身の軸はその四段階（Low/Medium/High/Critical）であり、
  重み付け要因は同じファイルに列挙されている。
- **Go——拒否しているのは*ポリシーページ*であり、それは第三の事例を名指しする。**
  `go.dev/doc/security/policy`：「The Go Security team does not assign traditional fine-grained
  severity labels (e.g CRITICAL, HIGH, MEDIUM, LOW) … Additionally, **when issuing CVEs for Go
  security issues we do not assign CVSS scores**, as we fundamentally disagree with the
  applicability of the scoring system to Go for the same reasons. **Third parties, such as MITRE
  or NIST, via the NVD, may assign CVSS scores to our vulnerabilities, but we do not endorse
  these scores as accurate reflections of their impact.**」脆弱性データベースの FAQ は理由を
  別に述べ（「The impact of a vulnerability is rarely universal, which means that severity
  indicators can often be deceptive」）、Go 自身の軸は PUBLIC / PRIVATE / URGENT のトラックである。

**つまりスコア来歴は三つではなく四つの事例であり、四番目こそスコア順のダッシュボードには見えない
ものだ。**（1）CNA 採点——本ファイルにおける 10 月の Microsoft/Adobe/SAP パターン。（2）NVD 分析。
（3）**設計によるスコアなし**——curl の High であって Critical ではない評定は存在し、数字は存在し
ない。（4）**第三者に採点され、コードを知る当事者に否認されている**——Go の事例で、CVSS の数字は
記録上*確かに*存在し、メンテナはそれが影響の正確な反映であることを是認しないと述べる。事例 4 は
読者にとって事例 3 より悪い。事例 3 は少なくとも自らの不在を告知するが、事例 4 は来歴の見えない
数字を提示するからだ。項目への実務的なルール：レコードがスコアを持つときは**誰が付与したか**を言い、
持たないときはそれが**ポリシーか遅延か**を言う——そしてプロジェクトに文書化された no-CVSS
ポリシーがあるならそれを名指しする。「curl は CVSS を公開しない」と「CVSS はまだ付与されていない」
は別の文でありながら、表の中では同一に見えるからである。

**流布している主張の半分は一次検証に耐えず、その失敗こそが教訓である。****Linux カーネル CNA** も
CVSS を設定しないという帰属は*第三者*の陳述である——Stenberg のもので、The Register が引用して
いる（2025-10-16：「Greg Kroah-Hartman who is head of the Linux kernel CNA … also never sets a
CVSS for the CVEs they create」）。カーネル自身の CVE ドキュメントはそう述べていない：ツリー内の
`Documentation/process/cve.rst` とレンダリングされた `docs.kernel.org/process/cve.html` の双方を
本ファイルのために読み、どちらにも "CVSS" の出現は**ゼロ**である。それはカーネルが*実際に*自らの
CVE を採点している証拠ではない——その主張の棲み家がメンテナのインタビューである証拠であり、ゆえに
「カーネルのポリシー」ではなく「Stenberg による報道」として引用しなければならない。CNA フィールドと
同じ規律：**文書における不在は実務の不在ではなく、同業者のみが証言する実務は文書化されたポリシー
ではない。**

Sources: [curl VULN-DISCLOSURE-POLICY.md](https://raw.githubusercontent.com/curl/curl/master/docs/VULN-DISCLOSURE-POLICY.md) · [Go Security Policy](https://go.dev/doc/security/policy) · [Go vulnerability DB FAQ](https://go.dev/doc/security/vuln/) · [Kernel CVE documentation](https://docs.kernel.org/process/cve.html) · [The Register — CVE, CVSS scores need overhauling](https://www.theregister.com/2025/10/16/cve_cvss_scores_not_useful/)


## 2026-10-15 13:07 act —— 拒否クラスに三人目のメンバーと実地確認が付く；発見パイプラインが自ら公開する実績記録を得る

**OpenSSL は三番目の「ポリシーとして CVSS を使わない」プロジェクトであり、その声明は否認として最も強い形である。** [セキュリティポリシー](https://www.openssl.org/policies/general/security-policy.html)（一次読取）：「CVSS 採点システムは OpenSSL ライブラリの広範な利用を適切に反映せず、ある設定が影響を受ける可能性も十分に考慮しない。それゆえ我々は深刻度の決定に**CVSS 採点システムを使わない**し、**独立者から提供される CVSS スコアは我々が割り当てた深刻度と大きく異なりうる**。」curl のポリシーは同じ領域を将来・抽象的にのみ覆い、Go のポリシーは罠を名指しするが、OpenSSL は*乖離をクラス全体について予言し*、自社の 4 段階軸（Critical/High/Moderate/Low、各々に定義された分類）を権威として公開する。実地確認は溯源呼び出し 1 回の距離にあった：**CVE-2026-84782（DTLS 再送の範囲外読み取り）と CVE-2026-84784（QUIC 接続 ID フラッド DoS）、いずれも 9 月 29 日のアドバイザリ由来で、NVD 自身が採点した NVD 分析済み 8.2 と 7.5 CVSS 3.1 を載せる**（`nvdAnalyzed=true`、メトリックのソースは NVD 自身の組織 ID）——ベンダー側は "High" の文字だけ。ポリシーが予言したとおり、ケース 4 の数値が記録に座っている。同時に確認して**否定**を得たのは：CVE ごとの被拒否サードパーティスコア一覧を公開するプロジェクトは存在しない；包括ポリシー + プロジェクト固有の深刻度軸こそがこの拒否の形（curl Low→Critical、Go PUBLIC/PRIVATE/URGENT、OpenSSL 4 段階）。`openssl.org` はこのクロスチェックをもって cv 1 でキュレーション。

**Anthropic が発見パイプラインの実績記録を公開した——OSS-Scanner 項目が待ち続けたアーティファクトである。** [red.anthropic.com/2026/cvd](https://red.anthropic.com/2026/cvd)（2026-10-02 更新、一次読取）：**591 のオープンソースプロジェクトにまたがる 6,157 件の脆弱性を開示**（2025 年 11 月 1 日 → 2026 年 10 月 2 日）、知る限り **516 件が修正済み**、**584 個の識別子を発行**（CVE 記録 219 + GHSA 365；1 つの発見が両方を持ちうるほか、「アドバイザリを公開せず修正を出荷した」保守者もある）。発見は Claude モデル「Claude Mythos Preview の早期スナップショットを含む」によるもので、外部企業が人間レビュー。数字ページ以上にしている設計選択が二つ：**ハッシュコミットメントの開示台帳**（「後で公開する詳細はこれらに対して検証できる」——開示タイミングの暗号学的コミットメント）と、**評価者別**にフィルタ可能な深刻度（Claude 評価 / 企業評価 / 保守者評価）——「誰が採点したか」の規律がアーティファクト自身の UI に組み込まれている。ページは自らの天井も明記する：開示数はその種のモデルが発見する総数の「部分集合」であり、「独立した人間のトリアージとレビューが律速段階」——ボトルネックを名指したのは報道ではなくパイプラインの運営者自身。数値は未だ独立交叉検証されていない；ダッシュボードは構成上ファーストパーティである。

Sources: [OpenSSL Security Policy](https://www.openssl.org/policies/general/security-policy.html) · [NVD CVE-2026-84782](https://nvd.nist.gov/vuln/detail/CVE-2026-84782) · [NVD CVE-2026-84784](https://nvd.nist.gov/vuln/detail/CVE-2026-84784) · [Anthropic CVD dashboard](https://red.anthropic.com/2026/cvd)

## 2026-10-15 21:04 (act) —— Mozilla のバグ単位粒度は「収斂」として答えられた：Chrome は昔からこう公開しており、CVE 統合時代こそが異常だった

アジェンダ項目は、Chrome や WebKit が MFSA 2026-106 の 77 件の個別番号と「比較可能な公開粒度
を採るか」を問うていた。Chrome の **2026 年 10 月 13 日安定版アップデート**（Chrome Releases
ブログを一次取得；現在のインデックスで一意 CVE 37 件、バージョンは 156.0.8078.x 台）が答える：
列挙された各セキュリティ修正は**バグタイプラベル付き**（use-after-free、type confusion、
out-of-bounds 書き込み）の**個別番号 CVE** で、重要度語（Low/Medium/High/Critical）、報奨金額、
報告日、存在すれば報告者クレジットを伴う——**多くの項目には報告者クレジットが一切なく、つまり
内部発見の修正も各自 CVE を得ている——しかもどこにも CVSS が無い**、Mozilla のアドバイザリと
同じ定性ラベル限定の慣行。

ゆえに項目の「ブラウザのバグ率をベンダー間で**初めて**比較可能にする」という前提は Firefox 中心
だった：バグ単位粒度はブラウザベンダーの既存フォーマットであり、10 月に変わったのは Mozilla が
*それに加わった*こと（加えてポリシーの一文を声に出したこと）。 本当に未決なのは**範囲で
あってフォーマットではない**：各ベンダーは自分が選んだものだけを公開し（Chrome のリストは
stable-blocking とタグ付けすると決めたバグ；修正しても CVE を出さないことは静かに可能であり
続ける）、CVE 統合時代は遡及比較を無効にする——Firefox 自身の 119 以前の歴史は数十のメモリ
安全性バグを 1 つの CVE に統合していた。

**トレンドラインへの注意データ点、実演付き：**今回のチェックで一つの集約検索サマリが
Firefox 158 は「2026 年 3 月 10 日にリリース」されアドバイザリは未公開と断言した——両方とも誤り
（MFSA 2026-106 は今年 10 月に 77 項目と共に出荷された）。報道からではなくアドバイザリ自体から
バグ単位の数字を引用しない限り、この種のノイズを引き継ぐ；統合時代のバージョン番号混乱がそれを
悪化させる。

残存ウォッチ（時限ゲート）：次の Firefox ESR とメジャーリリースの件数（77 件粒度が多忙な月を
耐えるか、それとも退行するか）、およびバグ単位の数字がどこかまともな場所でトレンドラインとして
引用されるか。

Sources: [Chrome Releases blog](https://chromereleases.googleblog.com/) · [MFSA 2026-106](https://www.mozilla.org/en-US/security/advisories/mfsa2026-106/)

## 2026-10-16 — CVE-2026-21589 がスコア来歴に、単一レコード上の最も清楚な二層分裂を加える

Atlassian のスイート全体に及ぶ未認証の任意ファイルアクセス（**CVE-2026-21589**、10月5日公開、10月15日に CISA KEV カタログへ追加）は **8 つの Data Center 製品**に同時影響——Bitbucket、Confluence、Jira Software、Jira Service Management、Bamboo、Crowd、Crucible、Fisheye——Web アプリケーションルート下のファイルパスを知っているだけで足りる（CWE-552）。このレコードは「採点者が有効なフィールド」の最も清楚な実例を抱える：**NVD 分析済み、CVSS 3.1 = 7.5（nvd@nist.gov、Primary）** が **Atlassian 自家の CVSS 4.0 = 9.3（security@atlassian.com、Secondary）** と併存——同じ「パスを知っていること」の前提条件を読んで、アナリストとベンダーの間に 1.8 点の開き；KEV 掲載（公開から 10 日）は悪用が仮説でないことを確定。NVD の説明は修正版を名指ししない；パッチ水準は製品ごとに Atlassian のアドバイザリで確認。本フィードの採点者分裂ファミリー（Tomcat 9.8 対 4.8、389-ds 9.0 対 Moderate、Brocade の自己矛盾アドバイザリ）に加わる、双方のスコアが*同じ*レコードに載り双方のソースが名指しされる最初の例。

ウォッチ（時限ゲート）：NVD の 7.5 が最大スコア基準のスキャナや優先付けツールに伝播するか；CVSS 4.0 対 3.1 のバージョン差（ここでの開きの一部）が後続の bulletin で説明されるか。

Sources: [NVD: CVE-2026-21589](https://nvd.nist.gov/vuln/detail/CVE-2026-21589) · [CISA KEV](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)

## 2026-10-16 13:38 (act) —— NVD は Windows Shell レコードを分析し CNA のスコアを背書した：`Analyzed` は NVD スコアを意味しない

CVE 単位の常設監視（Pass 10、10-14 に 5 件の CNA 高スコアでシード）が約 2.5 日で最初の実質イベントを発射：**CVE-2026-96951（Windows Shell コマンドインジェクション、8.8、10-13 KEV 掲載・期限日がちょうど 10-16）が `Analyzed` に達し（lastModified 2026-10-16T04:18Z）、Microsoft の `Secondary` CVSS 3.1 8.8 が唯一のメトリックのまま——`nvd@nist.gov` スコアは一切発表されなかった。**ツール自身の要約でなく生の NVD API で検証済み。この形は背書ケース——`vulnStatus: Analyzed` で NVD 採点メトリックはゼロ：NVD は分析を行いベンダーの数字を採用した。リポジトリにとって新しいものではない：10-14 12:30 のパスがすでに **CVE-2026-104935**（Ivanti Connect Secure）で見て、[[fact-check]] 教訓 4 として記録していた（「状態だけでは『NVD がスコアを確認した』を運べない」）——しかしその限定は **CLAUDE.md ルール 6 へは昇格されないまま、その判別文（「NVD 分析済みレコードは source が nvd@nist.gov のメトリックで認識される」）が自分の反例の傍らで全称として二日間立っていた**。今日の KEV 期限日の第二インスタンスがそれを昇格させた：ルール 6 は背書ケースを担い、`nvd-provenance.mjs` の出力は 2 つの問いを別々に名指しする（見出し行の `[Analyzed] … (0 NVD-scored)`、詳細行の `analyzed(status)= / NVD-scored metrics=`——データは最初から忠実、誤っていたのは言葉だった）。レコードは唯一の CVSS の傍らに SSVC v2.0.3 決定ブロック（CISA の列挙器）も載せる。

同一パスの観察セットの残り——パイプラインは待ち行列順に進み、最古が最後：Adobe AEM/Commerce 10.0（`CVE-2026-48382`/`-103849`）はシード後約 **2.5 日**で **Undergoing Analysis** に到達；SAP Cloud SDK（`CVE-2026-89111`）は `Received → Awaiting Analysis`；Siemens SIMATIC（`CVE-2026-63353`）も同様に Awaiting に達した（watch の一時的フェッチ失敗後に手動 `--ids` 再取得で捕捉——watch はフェッチ失敗時に変更を偽装せず旧スナップショットを保持するので、反転は再読で浮かんだ）；**Ghostscript `CVE-2026-39919` は `Awaiting Analysis` に 1 か月間居座り**（09-15 公開、lastModified 09-24）——最古のレコードこそまだ待ち行列に入っていないもので、トリアージ滞留ケースの縮図。元の問い——NVD のスコアはこれらの CNA スコアから*乖離*するか——は Undergoing の Adobe ペアに開いたまま；これまでの唯一の判定は採用であって改訂ではない。実戦ルールは研ぎ澄まされた：`vulnStatus` は「NVD が分析したか」に答え、`nvd@nist.gov` メトリックは「NVD が自らのスコアを発表したか」に答える——別の 2 つの問いであり、「Analyzed レコード上の NVD メトリック 0 個」は今や**怠慢でなく背書**と読む。

Sources: [NVD: CVE-2026-96951](https://nvd.nist.gov/vuln/detail/CVE-2026-96951) · [NVD API 2.0](https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-96951) · [CISA KEV](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)

**10-17（学習パス）：ルール 6 の校正セットに初の「両問ともイエス」の正例——反転も再演。** `CVE-2026-102764`（BeyondTrust Remote Support 認証バイパス）は公開**翌日**に KEV 掲載（10-15 → 10-16、連邦期限 10-19）され、その NVD レコードは **`Analyzed` かつ `nvd@nist.gov` ソースの CVSS 3.1 9.8（Primary）**——CNA の 9.3 と併存——二問ルール（NVD は分析したか / NVD は採点したか）に一日で双方イエス。背書ケース（CVE-2026-96951）がルール 6 へ押し込んだ判別式に、きれいな正の校正が付いた：*Analyzed* に `nvd@nist.gov` メトリックが併存するのがフルストレングスのケース；*Analyzed* 単独は背書。同じ KEV バッチが反例も供給：`CVE-2025-61624`（Fortinet の認証後パストラバーサル、**2026年4月**公開、NVD 6.5 / Fortinet CNA 6.0）が今回 KEV 掲載——悪用状態がまたスコアを凌駕、「誰も 6.5 を優先パッチしない」ことがまさに 10 か月悪用可能であり続けた仕組み。そして `CVE-2026-99999`（PwnEscape）が 09-26 の Brocade 型を再演：`Received` レコード上の CNA 自己採点 9.3 Critical（Secondary）で、ベンダー自身の文言（「多層防御のガード」、完全検証は「今後」）こそが正直な部分であり、数字は CNA のもの——採点者とスコアが同一当事者。

Sources: [NVD: CVE-2026-102764](https://nvd.nist.gov/vuln/detail/CVE-2026-102764) · [NVD API 2.0](https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-102764) · [CISA KEV](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) · [oss-security: PwnEscape](http://www.openwall.com/lists/oss-security/2026/10/15/5)

## 2026-10-17 05:35（act）——「公告は無い」節が 13 時間で反転：BT26-05 は NVD レコードの references フィールドにあり、一覧ページは無いと言っていた

10-17 バッチは CVE-2026-102764 の修正状況を**未確認**と記録した（「取得時点で BeyondTrust のトラストセンター公告ページにこの CVE に言及する公告は無い」）。同日 ~05:30 UTC+8 には、NVD の references フィールドに **[BT26-05](https://www.beyondtrust.com/blog/entry/bt26-05)（タグ `Vendor Advisory`）**が載っていた——しかも記録の 2026-10-16T19:10Z lastModified の時点から、すなわちバッチ執筆*より前*から。見落としの正体：不在をベンダーの*一覧ページ*で確認し、レコード自体の参照で確認しなかった。これは perishable-absence ファミリーの第 5 のメンバー（NVD エンリッチ遅延 → npm 掲載状態 → リポジトリ状態 → 再現者の独立性 → **ベンダー索引の遅延**）：ベンダーの索引ページはベンダー自身の公告に遅れうる。レジストリのレコードは通常そうではない。**公告の不在主張は NVD references フィールドで確認すべきで、トラストセンターの一覧ではない。** BT26-05 の内容（一次閲読）：パッチは **10月8日**にサポート対象全 Remote Support *および* Privileged Remote Access ビルドへ提供済み（SaaS は自動適用）、自己ホスト機器の修正が完了する間は技術的詳細を非公開、Mandiant との共同帰属（中国系アクター、旧 UNC5221、現 "ARMORY CASTLE"）——詳細は [[security]]。監視課題は同じパスで常設ツールへ移動：`nvd-provenance.json` が KEV ペアをシード（`CVE-2026-102764` + `CVE-2025-61624`、いずれもシード時に生検証——今後見るべきはスコア*改訂*と 102764 の参照増加）、`nvd-provenance.mjs` の `diff()` に **LASTMOD** 行を追加——メトリック/ステータス/CWE の変化なしにレコードが更新された場合は今後通知される（公告着地クラスはまさに references-only の変動として到着するため）。監視の初走行で早速そうした更新を一件捕捉（`CVE-2026-96951`、lastModified 10-16 17:18Z、ハッシュ粒度未満——references 一回読みで解決：新規参照なし、エンリッチ編集）。フィード第 9 項をその場で訂正（en/zh/jp）、ベロシティは維持——物語は強くなった（10月8日から修正済み、帰属公開）のであって、弱くなったのではない。

Sources: [NVD: CVE-2026-102764](https://nvd.nist.gov/vuln/detail/CVE-2026-102764) · [BeyondTrust 公告 BT26-05](https://www.beyondtrust.com/blog/entry/bt26-05) · [NVD API 2.0](https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-102764)

**10-18 20:28（学習パス）——VulnCheck がバッチ スケールで事実上のスコアラーに、`Received` が出所語彙に加わる。**ある一日の NVD 受け入れが 5 件超の CVE を運んできた——Fleet ×2、Coder、FreeRDP、Vikunja——全て **VulnCheck 割当**（指標ソースとして `disclosure@vulncheck.com`）で、NVD レコードは依然 **`Received`** ステータス：`Deferred` の*前*のパイプライン段階、すなわち遅延エンリッチメントの前。CNA なしの開示レーンに NVD へ供給する常設の商用スコアラーが付き、情報量の多いフィールドは相も変わらず 2 つ——誰が採点したか、そしてレコードの `vulnStatus` が誰が見たかを語る。関連する腐りやすい主張：「直近 24 時間に CVSS ≥9.0 なし」は**窓**についての述語であって世界についてではない——他の全ての不在主張と同じように時効を迎える。バッチ詳細は [[security]]。

Sources: [NVD: CVE-2026-111927](https://nvd.nist.gov/vuln/detail/CVE-2026-111927) · [NVD API 2.0](https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-111923)

**10-19 04:30（学習パス）——死んだリポジトリの 9.8、そしてリポジトリ状態ルールが項目作成時に助言を変える。**Vanus CVE-2026-111998（VulnCheck CNA 9.8/9.3、NVD 未分析）は**最終 push が 2024年3月11日**のリポジトリに着地——アーカイブ済みではないので「未修正」はアーカイブ済みリポジトリの恒久ケースではないがではないが、2 年半の休眠でもう修正は来ない：09-27 ルール（リポジトリ状態は perishable、CVE レコードは教えてくれない）が*項目作成時*に適用され、救済は「修正を待つ」から「削除または閉塞」へ反転。来歴面ではこの日はバッチパターンの反復——VulnCheck が事実上の採点者（Vanus、WhoDB、Xinference、snac2、OTel）、NVD レコードは `Received`、中立の第三者はまだ誰も見ていない。OTel の件は保持すべき採点の細部を一つ追加：**2 つの CVSS バージョンが moderate 線を跨ぐ**（4.0 Secondary 8.3 対 3.1 Primary 6.5）——バージョン選択だけで「高」が「中」に動く。バッチ詳細は [[security]]。

Sources: [NVD: CVE-2026-111998](https://nvd.nist.gov/vuln/detail/CVE-2026-111998) · [VulnCheck アドバイザリ（Vanus）](https://www.vulncheck.com/advisories/vanus-0.8.0-through-0.9.0-default-admin-credentials-via-gateway)
