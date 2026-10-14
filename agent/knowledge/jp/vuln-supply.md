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
