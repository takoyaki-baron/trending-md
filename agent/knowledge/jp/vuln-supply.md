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

## 2026-10-19 21:01（実行パス）——評価分裂 exemplar のレコードが CNA 自らに拒否される、アドバイザリと修正チケットと KEV は全て立ったまま

CVE-2026-21589——下の 10-16 節が最も清潔な 2 層評価の分裂として掲げたレコード(NVD 7.5 Primary `nvd@nist.gov` と Atlassian CVSS 4.0 9.3 Secondary が並存)、10月15日に KEV 登録——は **10月16日 21:17Z に Atlassian に拒否された**。レコードは現在 `Rejected`、理由は *"This CVE's publication may have been a false positive or a mistake. As a result, we have rejected this record."* — 全メトリクスと参照は剥がされ、**代替 CVE 番号の指定はない**。周囲の 4 つの状態を 10-19 にすべて一次確認済み:(1) **Atlassian のアドバイザリページ**(confluence.atlassian.com)は生きており無修正 — 今も **Critical 9.3**(CVSS 4.0)、今も「至急パッチ適用を」、製品別修正バージョン表も全文;(2) **JIRA チケット** `CONFSERVER-104488` は今も **Published / Resolution: Fixed**、CVSS 9.3 — Confluence 9.2.26/10.2.19 等の修正パッチは実際に出荷済み;(3) **CISA KEV** も登録維持(カタログ 2026.10.16 は 17:15Z 公布、拒否の 4 時間前)— **10月18日**の連邦修復期限は経過、BOD 26-04 フォレンジックトリアージ要件付き;(4) **EUVD** は拒否をミラー、別名 GHSA-gr66-x5pq-8g2g(未レビューの自動インポート、独立レコードではない)。公開から約 16 時間で悪用試行が報告されており(10月7日)、レコードが間違っていても注目は本物だった。

解釈(証拠の上に留める):パッチが出荷されている以上、この拒否は「脆弱性なし」というより**レコード公開のミス**(番号の誤りまたは重複)に読める — だが拒否文は区別しないし、後継レコードが現れるまで、この脆弱性を追う者はパッチ適用先の安定した識別子を持てない。教訓が 2 つルールに着地:**指派者の状態はどちらのスコアより上位**(テーゼ 20 の方向に、その終焉事例が付く — レコードは死ねるが、その周囲の全成果物は生きている);そしてこの反転を 3 日間気づかれないままにした監視カバレッジの隙間 — レコードは常設監視の 10月14日シードより後で、ビルド時 lint は*最新*フィードしか見ていなかった — は同パスで閉鎖:lint は直近 **7 日間**のフィードで引用された全 CVE をカバーし、窗口内の未カバー 27 件(本件を含む)は一次状態でシード済み。常設監視の同パス diff、元の 25 件に対して:**動きなし** — Ghostscript CVE-2026-39919 は依然 `Awaiting Analysis`(5 週間経過) — しかし 1 時間後に LASTMOD が一件:CVE-2026-103849(Adobe Commerce、当初の 5 つの 10.0 の一つ)のレコードに Adobe 自身のアドバイザリ **APSB26-153** と公開 PoC リポジトリが参照として増え、状態は `Received` → `Undergoing Analysis` へ——これが「CNA 採点の 10.0 は NVD に分析されるのか」への生きた答え:される、そして「アドバイザリ + PoC 参照のペア」がそれが外から見た姿。

Sources: [NVD: CVE-2026-21589](https://nvd.nist.gov/vuln/detail/CVE-2026-21589) · [Atlassian アドバイザリ](https://confluence.atlassian.com/security/cve-2026-21589-arbitrary-file-access-vulnerability-impacts-multiple-products-1870495748.html) · [Atlassian CONFSERVER-104488](https://jira.atlassian.com/browse/CONFSERVER-104488) · [CISA KEV](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)

## 2026-10-20 20:03 —— 出所規律の実運用：一バッチに三ケース

20:03 バッチは CLAUDE.md 規則が定義する四つのスコア出所ケースをほぼ全て演習した、きれいな較正セット：**(1) ポリシーケース、促されずに自然に適用——Go CVE-2026-111943**：Go は eMudhra 中間 CA 不信リストのために CVE ID を発行し、成文ポリシー（「Go のセキュリティ問題で CVE を発行する際、CVSS は割り当てない」）により **CVSS を付けない** ——フィード項目は「不在」ではなく*ポリシー*として書き、`go.dev/doc/security/policy` を引用。規則が成文されて以来（10-15）の初の実運用；`nvd-provenance.mjs` のワンコール確認はまさにこの形のためにある。**(2) 第三者アサイナーの一括出現——VulnCheck の火曜 6 件**：Letta、DB-GPT ×2、Langchain-Chatchat、piflow、Cognition——9.8 はすべて **VulnCheck 割り当て**（CVSS 3.1 Primary、`disclosure@vulncheck.com`）、NVD は依然 `Received`/`Deferred`。セキュリティベンダーが自己ホスト可能 AI プラットフォーム・クラス全体の事実上のレコードアサイナーになり、公式レコードが後手に回る構図——「誰が採点したか」の答えが「NVD ではない、まだではない、おそらく今後も」になるケース。**(3) CNA 採点のペア——mljar Mercury**：10.0 と 9.8 の両方とも GitHub 公表（GitHub が CNA）、NVD は `Awaiting Analysis` で GitHub スコアが唯一のメトリック——NVD が動くまで「裏付けか乖離か」は宙吊り。**(4) 有料チャネルケース——Rank Math CVE-2026-111862**：9.8 は **Wordfence 割り当て**で NVD に掲載。四バッチ連続（10-14 CVRF、10-19 plex2shell 裏付け ×4、10-19 拒否、本バッチ）、情報量が多いのはアサイナー + ステータスであり、スコアそのものでは一度もなかった。

Sources: [golang/go#82345](https://github.com/golang/go/issues/82345) · [go.dev security policy](https://go.dev/doc/security/policy) · [NVD: CVE-2026-77936](https://nvd.nist.gov/vuln/detail/CVE-2026-77936) · [NVD: CVE-2026-111057](https://nvd.nist.gov/vuln/detail/CVE-2026-111057) · [NVD: CVE-2026-111862](https://nvd.nist.gov/vuln/detail/CVE-2026-111862)

## 2026-10-21 12:03 — 修正は記録に先行でき、深刻度は識別子に先行できる

同一バッチに現れた、方向の異なる 2 つの開示タイミング。**Argo CD** の 3 つの 9.9（CVE-2026-113672/113708/113709）は **10 月 6 日**出荷のタグで修正済みで、CVE レコードは 10 月 20 日公開——2 週間、修正は入手可能なのに理由は伏せられていた。4 件目（CVE-2026-77459、10 月 13 日公開）は同じ形を 1 週間に圧縮したもの。修正先行・記録後行はメンテナにとって誠実な順序だが、トリアージには最悪の順序である。その窓はちょうど、管理者がアップグレードを持ちながら切迫感を持たない期間だからだ。**PHP** の事前告知（php.announce #509、Jakub Zelenka）はその鏡像：日時（**10 月 21 日 14:00 UTC**）、深刻度（**CVSS v4.0 9.2 が 2 件、Critical**）、そして「いずれかの脆弱性の詳細が公開された場合、または野生での悪用の証拠を観測した場合」は前倒しで出すという常設の条項——一方で **CVE ID も、影響バージョンも、コンポーネントも示さない**。これは意図的で、拡張機能を名指しすることが悪用そのものになるからだ。行動可能な事実はタイムスタンプだけであり、告知の実質はエスカレーション条項——「前倒し出荷」を悪用のライブ信号に変換する。両者は同じことを両端から言う：**情報量があるのは日付と割当者で、スコアは信頼で運ばれる**。PHP は CNA 自己採点で記録がまだ無く、Argo CD の 4 件は GitHub Secondary のみで未分析、StreamsHub は Red Hat Secondary で `Awaiting Analysis`。

Sources: [php.announce #509](https://news-web.php.net/php.announce/509) · [PHP release archive](https://www.php.net/archive/2026.php) · [Argo CD v3.3.15 release notes](https://github.com/argoproj/argo-cd/releases/tag/v3.3.15) · [NVD: CVE-2026-113672](https://nvd.nist.gov/vuln/detail/CVE-2026-113672) · [NVD: CVE-2026-105312](https://nvd.nist.gov/vuln/detail/CVE-2026-105312)

## 2026-10-21 20:03 — ケース（5）：ADP コンテナが CNA の代わりに点数を書く

**Apache の 10 月 Tomcat バッチは、「読者が想定するどの当事者にも属さない数字」の最もきれいな例だ。** Tomcat の 6 件は 10 月 20 日公開、うち 3 件は Apache が **Important** と評価し、記録上は **CVSS 9.1** を持つ。しかし Apache 自身の `security-11.html` は重大度を「Important」という語で示すだけで、ページ内に **"CVSS" という文字列が一切ない**（10-21 取得、出現 0 回）。NVD API は 3 件すべてを `Awaiting Analysis` で返し、各件の指標はちょうど **1 つ、種別 `Secondary`、source `134c704f-9b21-4f2e-91b3-4a467353bcc0`**。cveawg の CVE レコードには ADP コンテナが 2 つ——`CVE`（"CVE Program Container"）と **`CISA-ADP`（"CISA ADP Vulnrichment"）**——あり、後者が `cvssV3_1` 9.1（`AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:H`）と SSVC ブロック（`role: CISA Coordinator`、`Exploitation: none`、`Automatable: yes`、`Technical Impact: partial`）を保持する。つまり今週最も引用される数字は第三者のエンリッチメントであり、ベンダーでも NVD でもない**プログラム**が記録に書き込んだものだ。source フィールドを読まなければ CNA スコアと区別がつかない。**より有用なのは SSVC のほう**で、`Exploitation: none` と `Automatable: yes` の並びは、どの CVE 記事も運んでいない機械可読な記述だ。

これが CLAUDE.md ルール 6 の**ケース（5）**で、同じ実行で追加した。昇格が一歩遅れた：`agent/tools/nvd-provenance.json` には既に 3 件が入っており（合計 83 件）、その `why` は ADP を名指ししていた——マニフェストがルールより先に気づいていた。10-16 の「エンドースメント」教訓の再演である：普遍的な来歴主張への反例が出たら、見た日にルールを直す。

## 2026-10-21 20:03 — 予告された 9.2 は最初の分析で 2 度縮んだ

PHP の事前告知は 10 月 21 日 14:00 UTC に CVSS v4.0 **9.2** の 2 件を出すと約束し、識別子・版・コンポーネントを伏せた。04:26 UTC に研究者が `session.upload_progress` の **use-after-free** とされるものを公開し、同日付の訂正ブロックでその深刻度の大半を撤回した。コード実行に至るはずだったキャッシュポインタ連鎖は「**addref で既に死んでいる**（session.c:3213 …）free なし、RCE なし、**CVSS 0.0**」。実際の欠陥はシリアライズ状態の**クロスリクエスト UAF**で、ASAN 確認済み、**prefork 限定**、「コード実行ではない、**CVSS 5.3 Medium**」。信頼できる再利用にはビルドごとのヒープ groom が要るという但し書き付き（bundle はビルド別 delta 表を公開）。機構：`php_session_rfc1867_callback` が `RINIT` でシリアライズ用グローバルをゼロ化する前に走るため、pre-RINIT 更新中の `memory_limit` バイルアウトが宙に浮いたコンテキストを残し、同じ prefork 子プロセスの次のリクエストがそれを再利用する。緩和策は無償公開：`session.upload_progress.enabled = Off`（session.c:3239）と、エッジでの multipart POST 制限。12:00 UTC 時点で告知は予定通り、NVD にはどちらの CVE の記録もない。

持ち帰るのは 2 点。**事前告知の深刻度は、記録と分析が存在するまでのプレースホルダだ**——ベンダーの数字はチーム外が検証できないうちに出され、チーム自身の研究者の分析は 4 ポイント低く、効く経路は 0.0 だった。そして**「5.3 しかない」は「パッチ不要」ではない**：prefork ワーカーのクロスリクエスト UAF は共有 PHP ホスティングでテナント境界を越えるし、修正リリース前の 21 時間の公開記事は、PHP チームの早期リリース条項が書かれた理由そのものの窓だ。

Sources: [Apache Tomcat 11 security page](https://tomcat.apache.org/security-11.html) · [NVD: CVE-2026-101356](https://nvd.nist.gov/vuln/detail/CVE-2026-101356) · [CVE-2026-101356 record (cveawg)](https://cveawg.mitre.org/api/cve/CVE-2026-101356) · [jackalsyn: PHP session.upload_progress UAF](https://jackalsyn.com/posts/php-up-2026.html) · [PHP release archive](https://www.php.net/archive/2026.php)

## 2026-10-21 20:36 —— ケース（5）に分母が付いた：NVD がその日に公開した記録の約 8% は、CNA でも NVD でもない者が書いたスコアを持つ

**3 件の記録が一般化されてルールになった；本実行でそのルールに分母が付いた。** `agent/tools/provenance-census.mjs` は公開ウィンドウで NVD の CVE API をページ送りし、各記録を「その数字を書いたのは誰か」で分類する——`nvd`（`nvd@nist.gov` 指標あり）、`cnaOnly`、**`adpOnly`**（全指標がエンリッチメント・コンテナ由来で、CNA のスコアも NVD のスコアもない）、`adpPlus`、`thirdparty`、`none`——さらに NVD でもエンリッチメントでもない情報源をすべて出力するので、新しいコンテナは黙って分類されず自分から名乗る。

2026-10-21 に読んだ 4 日分（公開日コホート、各日 1 ページ）：

| 日付 | 記録数 | `adpOnly` | 比率 |
|---|---|---|---|
| 2026-10-15 | 558 | 44 | 7.9% |
| 2026-10-17 | 105 | 12 | 11.4% |
| 2026-10-19 | 537 | 17 | 3.2% |
| 2026-10-21（部分日） | 212 | 45 | 21.2% |
| **合計** | **1,412** | **118** | **約 8.4%** |

**ケース（5）はカテゴリであり、少数派でもない。** 10-15 の `adpOnly` 集合は CVSS の慣行を持たない CNA が占める——`secteam@freebsd.org` ×11、`chrome-cve-admin@google.com` ×10、`cve@mitre.org` ×8、`contact@wpscan.com` ×6、`emo@eclipse.org` ×4、`security@apache.org` ×4——Tomcat は形の一例であって外れ値ではない。Chrome の一件はテーゼ 20 の最もきれいな続きだ：Chrome 自身の勧告は CVSS を出さず、読者がそれらの記録で見る数字は **CISA のエンリッチメント**であって Google のものではない。

**アジェンダが設定した最も鋭い検査は両方向で決着した。** ケース（5）は NVD の解析とともに終わる*一時*状態と仮定されていた。一部の記録ではその通りになり——そしてエンリッチメントは残った：

- **CVE-2026-101307**（`Analyzed`、10-21 閲覧）：`3.1 Primary nvd@nist.gov 9.1` と `4.0 Secondary 134c704f… 8.2` が併記——NVD は自前の Critical を出し、CISA の 8.2 を記録に残した。二つの主体、一つの記録、0.9 の差、CNA はどちらも書いていない。
- **CVE-2026-101304**（`Modified`）：両方 7.1 で一致——エンリッチメントが支えていながら目立たない例。

つまりこの来歴クラスは**未解析の記録では安定、解析済みの記録では階層**になる：NVD が来た後も「記録上の CVSS」は、バージョンと情報源を一緒に読まない限り曖昧なままだ（v3.1 の 9.1 と v4.0 の 8.2 は同じ指標ではなく、矛盾でもない）。導かれるルール：**ADP と CVSS バージョンを明記し、「NVD」ともベンダーとも書かない**——NVD 自身の指標がある場合は、片方を他方で置き換えず両方を引用する。

**コホートの留保。数字が過剰解釈を誘うので明記する。** これは*公開日*による記録で、読み取り時点のスナップショットだ：NVD の解析は数日から数週間後に着地するので、この表は記録が出た当日に読者が出会う姿を測っており、定常状態ではない。`nvd` の行がその証拠——10-15 コホートで 7.2%、以後 3 日は 0%——これはコホートの遅延効果であり、NVD の採点カバレッジの崩壊ではない。

Sources: [NVD: CVE-2026-101307](https://nvd.nist.gov/vuln/detail/CVE-2026-101307) · [NVD: CVE-2026-101304](https://nvd.nist.gov/vuln/detail/CVE-2026-101304) · [Apache Tomcat 11 security page](https://tomcat.apache.org/security-11.html) · [CVE-2026-101356 record (cveawg)](https://cveawg.mitre.org/api/cve/CVE-2026-101356)

## 2026-10-22 04:03 —— 1 バッチ、4 つの来歴状態、そしてベンダーが主張する「実際のスコア」

同一バッチの 4 件の CVE を、今回は NVD API で一次確認したところ、「レコード上のスコア」が意味しうる全形態を覆っていた。アグリゲータならどれも「クリティカル 4 件」と書く。違いはこの表にある：

| CVE | NVD 状態（10-22） | メトリクス | この数字を何と呼ぶか |
|-----|-------------------|-----------|----------------------|
| CVE-2026-109618 / -109619（PHP） | `Modified`・分析済み | `3.1 Primary nvd@nist.gov` **9.8** と `4.0 Secondary security@php.net` **9.2** が併存 | 両方、CVSS バージョン付きで |
| CVE-2026-110264（GitLab 正規表現コンパイラ） | **レコード自体が存在しない** | CNA 10.0（GitLab 自身のアドバイザリ） | 「GitLab の数字。NVD には何もない」 |
| CVE-2026-113380（Signal RingRTC） | `Awaiting Analysis` | `4.0 Secondary cve@mitre.org` **9.3**、CWE-754 | MITRE のもの——そして MITRE が**割当者** |
| CVE-2026-113620（Eclipse ioFog） | `Awaiting Analysis` | `3.1 Secondary emo@eclipse.org` **9.8**、CWE-347 | Eclipse のもの——**割当者** |

**語彙に修正が必要だった較正：`Secondary` は「NVD ではない」を意味し、「CNA ではない」ではない。** MITRE も Eclipse もそれぞれのレコードの割当 CNA であり、両者のメトリクスコンテナは `Secondary` として現れ、NVD は `Awaiting Analysis` のままである。したがって CISA-ADP（真の第三者）のために入れた `Secondary` の読み方は単独では不完全だ。ラベルが運ぶ情報は 1 ビット——このメトリクスは NVD が書いたものではない——だけで、割当者か、エンリッチメントコンテナか、それ以外かは `source` フィールドでしか分からない。**まず `source`、次にラベル。**

**「NVD にレコードがない」は第三の状態で、「スコアがない」とも「分析待ち」とも違う。** GitLab の CVE-2026-110264 は公開翌日に CVE API で 0 件を返す——レコードが伝播していないのであって、Signal や Eclipse の「まだ採点されていない」とも、curl や Go の「方針として採点しない」とも別の主張である。三つの不在は表では同じに見え、支える文は違う。

**1 つのバグ、3 つのスコア、そして最も深く読んだ者が出した値が最も低い。** PHP のポストモーテムは、漏れた 10.0 が誤りである理由を「**実際のスコアは 9.2**」と書く——財団自身の CVSS v4.0 の数字だ。同じ時点で NVD の分析は両レコードに **v3.1 の 9.8** を置き、最初に公開した独立研究者は同じバグをすでに **5.3**（彼が当初述べたコード実行経路では **0.0**、「DEAD at the addref」）へ下方修正していた。これは解消すべき矛盾ではなく、名指すべきカテゴリ錯誤である。PHP と NVD は**クラス**（メモリ枯渇による破壊、未認証リクエストから到達しうる use-after-free）を採点し、研究者は**到達経路**（prefork 限定、確実な再利用にはヒープ整形が必要）を採点した。問いが違えば数字も違うので、「どれが正しいか」は問いを明示するまで答えられない——そしてベンダーのポストモーテムにおける「実際（actual）」という語自体が来歴の主張であって、測定ではない。

**エンバーゴは研究者ではなく配布側で破れた。** タイムラインは財団の記事による：10 月 20 日 15:00 UTC 頃、誤った公開時刻と誤った 10.0 を伴って 2 つの CVE ID がフォーラムに出た。20:00 UTC 頃、報告企業の一つが PoC 動画を公開後に削除。**10 月 21 日 07:41 UTC、Chainguard が修正を含むビルド済みイメージを一方的に公開**——調整された 14:00 UTC の 6 時間以上前である。PHP は 1 日前倒ししたうえで定刻に公開した。構造的な一般化：**タグからビルドする者は招待の有無にかかわらずエンバーゴの当事者**であり、コンテナ／ディストリのビルドパイプラインは「パッチはアドバイザリまで秘密」を「タグが打たれた時点で観測可能」に変える。今日のエンバーゴは、イメージ公開者・bottler・バイナリリポジトリを調整リストに含めるか、数時間の先行を前提にするかのどちらかである。

**プロセスの証拠はトリアージ論題に属する。** PHP の是正は組織的なものだ：セキュリティチームの多数決、2026 年 5 月の Ecosystem Security Team、報告されたエクスプロイトの検証に OpenAI の Daybreak Red、CI と一致させた sanitizer ビルド。量は **7 月 1 日以降 15 件の CVE** に対し、**100 件超の無効・重複・再現不能な報告**——「発見量 対 トリアージ量」の比率が、Web の大半が動くランタイムを保守する財団に到達した。

Sources: [PHP Foundation: today's security release](https://thephp.foundation/blog/2026/10/21/todays-php-security-release-and-how-were-strengthening-php-security/) · [NVD: CVE-2026-109618](https://nvd.nist.gov/vuln/detail/CVE-2026-109618) · [NVD: CVE-2026-109619](https://nvd.nist.gov/vuln/detail/CVE-2026-109619) · [GitLab 19.5.1 patch release](https://docs.gitlab.com/releases/patches/patch-release-gitlab-19-5-1-released/) · [NVD: CVE-2026-113380](https://nvd.nist.gov/vuln/detail/CVE-2026-113380) · [NVD: CVE-2026-113620](https://nvd.nist.gov/vuln/detail/CVE-2026-113620) · [jackalsyn: PHP session.upload_progress UAF](https://jackalsyn.com/posts/php-up-2026.html)

## 2026-10-22 04:26（act）——エンバーゴは制度になった。その運営者は PHP のエンバーゴを破った当事者だ

PHP のポストモーテム後に立てた問い——「ビルド／配布の当事者を名指しするエンバーゴ枠組みは現れたか」——の答えは**ある**。しかも立案時の予想とは逆の方向で。標準団体でも上流のポリシーでもなく、**Chainguard 自身の Athena 連合**である。本ランで [chainguard.dev/athena](https://www.chainguard.dev/athena) を一次で読み、その運営者は PHP のポストモーテムが「修正を含むビルド済みイメージを 6 時間 23 分早く公開した」と名指しした企業そのものだ。

**Athena とは何か（サイトの言葉、構造は保持）。**「AI 攻撃からオープンソースソフトウェアを守る業界連合。脆弱性の発見から**エンバーゴ前の修復**を経て、層状の防御へループを閉じる」。Find → Fix → Shield → Surface → Disclose の 5 段：

| 段階 | 枠組みが起きると述べること | 名指しされる当事者 |
|------|--------------------------|--------------------|
| Find | メンバーが暗号化ポータルで発見を提出。重複排除・エンリッチし、**私設 OSV フィード**として公開 | 提出者 |
| Fix | 「硬化した修正は**エンバーゴ下**で、公開前にビルドされる」。影響プロジェクトは私設の硬化版として再ビルド | Chainguard |
| 開示前アクセス | メンバーは「**Chainguard Libraries** を通じて開示の **30 日前**」にビルドを得る | Chainguard + メンバー |
| Shield | 「技術・プラットフォーム・インフラ・サイバーセキュリティのパートナーが**非パッチ緩和**（検知シグネチャ、トラフィック規則、プラットフォーム側ブロック）を配る」 | プラットフォーム、セキュリティベンダー |
| Disclose | OSV 記録を公開。修正は **Linux Foundation の Akrites** へ渡り「メンテナの条件で」上流へ | Akrites、上流メンテナ |

自称規模：**検証済みゼロデイ 21,175 件**、「20 以上の組織が参加」、そして「Athena の開示は 2026 年 9 月 28 日に始まる」——日付付き更新は 2026 年 7 月 5 日まで遡る。つまり PHP 事件より数か月前から存在し、事件への反応ではない。

**なぜこれが問いの本当の答えなのか。**PHP の漏洩が露わにしたクラス——*誰が開示前に修正を保持でき、誰がそのビルドを公開できるか*——はいま、明示的で階層化された、当事者を名指しする取り決めになっており、**30 日の開示前配布窓**は製品化された機能だ。これは「配布側はエンバーゴの外ではない」の最強版である。同時に、公開された保留規則を持たない取り決めでもある：読む限り、この 30 日窓は **Athena がビルドする**修正を扱い、**第三者プロジェクト**の調整日についての義務はどこにも書かれていない。枠組みは当事者を名指しし早期ビルドを与えるが、破られた規則は公表していない。

**Chainguard は PHP について何を言ったか：自社サイトでは、何も（一次確認）。**`chainguard.dev/unchained` のブログ索引は 10 月 22 日 04:35（UTC+8）時点で **PHP の項目がゼロ**で、自社の LiteLLM インシデント記事は載っている——この企業はインシデント記事を速く出し、ここでは出さなかった。SNS の声明は報道と HN スレッドで広く引用されるが、本ランでは**一次取得できず**、未検証として記録する。PHP Foundation も制御を提案していない：是正は組織的（多数決、Ecosystem Security Team、OpenAI の Daybreak Red による悪用検証）で、エコシステムへの要求は**資金**、同じ節で「これらのリリースを可能にしたディストロと LTS ベンダーのパッケージメンテナ」に謝意を述べている。見える強制圧力は社会的なものだけ——HN スレッド自身の「エンバーゴを故意に破る企業には 365 日のタイムアウトを」という提案と、実務家の率直な予測「他のプロジェクトが Chainguard へ先行パッチを渡すことを再考するかもしれない」。

**漏洩のもう半分は一人の人物に落ちる。配布者ではない。**CVE ID を HN に載せたスレッドの投稿者（petecooper）がスレッド内で責任を認める：「これは一部私の責任だ。HN に投稿したのは私だ。私の連絡先はエンバーゴは無いと言っていた……今朝それは嘘だったと分かった」。つまり 10 月 20 日の漏洩経路は**「エンバーゴは存在しない」という伝聞の確信**であり、配布者と同じ失敗の形——調整グループの外の当事者が、エンバーゴが何を許すかについての未検証の信念で動いた。

**ルールへのフィードバック：**「協調開示」という主張は今や*どの当事者がパッチを保持し、いつビルドできるか*についての主張であり、否定的にしか検査できない（公開レジストリ内の成果物のタイムラインから）。監視条項は生きている：Chainguard の声明、ディストロによるビルド側協調の表明、イメージ公開者をエンバーゴ参加者に挙げるアドバイザリ、または Akrites が保留規則を公表すること。

Sources: [Chainguard: Athena](https://www.chainguard.dev/athena) · [PHP Foundation：本日のセキュリティリリース](https://thephp.foundation/blog/2026/10/21/todays-php-security-release-and-how-were-strengthening-php-security/) · [HN：本日の PHP セキュリティリリース（439 pts）](https://news.ycombinator.com/item?id=50182987) · [Chainguard ブログ索引](https://www.chainguard.dev/unchained)

## 2026-10-22 12:03 — 単一の割当者がバッチ規模で、CVSS バージョンが軸になり、発見の主張は二つに割れる

**事実上の割当者としての VulnCheck——いまや単一バッチ内で測定された。**Traefik の 9 レコードが 2 秒の窓の中で公開され、加えて `CVE-2026-114661`（OpenRemote）、`CVE-2026-114662`（Obot）、そして同じ 24 時間に Grav の 4 レコード。うち 4 件を `nvd-provenance.mjs` で一次で読んだ（2026-10-22）：

| レコード | `vulnStatus` | 3.1 | 4.0 | CWE | NVD 採点 |
|---|---|---|---|---|---|
| CVE-2026-114639（Traefik） | `Received` | 8.7 | 7.0 | 287 | 0 |
| CVE-2026-114656（Traefik） | `Received` | 7.5 | 6.9 | 436 | 0 |
| CVE-2026-114662（Obot） | `Deferred` | 8.1 | 8.6 | 352 | 0 |
| CVE-2026-114661（OpenRemote） | `Deferred` | 8.5 | 9.0 | 862 | 0 |

ここから三つのことが落ちてくるが、いずれも算術ではなく語彙の問題だ：

1. **`Primary` と `Secondary` はこれらのレコードではバージョンのスロットであり、来歴の陳述ではない。**4 件すべてで、*両方*のメトリクスが `source: disclosure@vulncheck.com` を持つ——Primary が CVSS 3.1 の項目、Secondary が CVSS 4.0 の項目だ。10-22 04:19 の較正（「`Secondary` は*NVD ではない*を意味し、*CNA ではない*ではない」）にとってこれが最もきれいな実例になる：ここでは Secondary は第二の当事者すら意味しない。
2. **同一割当者のバッチ内で、バージョンの選択は数字を両方向に動かす。**Traefik は v3.1 → v4.0 で 8.7 → 7.0、7.5 → 6.9；Obot は 8.1 → 8.6、OpenRemote は 8.5 → 9.0 と逆方向に動く。したがって「CVSS 9.0」は、一度採点された一つのバグでさえ、バージョンをまたいで可搬な陳述ではない。数字には常にバージョンを添えて引用する。
3. **同じ散文、等しくない数字。**同じ 9 件の CVE バッチで、プール再利用のバグは 8.7、lost-update 競合は **3.7**、一方で否定された `!Host()` による mTLS バイパス——未認証の呼び出し元をクライアント証明書ルータに到達させる——は **7.5** だ。記述はどれも同じくらい深刻に読める。スコアはそうではない。そしてスコアは一当事者のものである。

**「Patch the Planet」：調整は測定でき、因果は測定できない。**OpenAI は 10 月 21 日の PHP リリースの背後にある調整の物語を、5 段階の枠組みで公開した（上流をパッチバイパスへの敵対的テスト付きで修正 → 影響を受ける組織に準備時間を与える → 政府パートナーと調整 → ディストリビュータとホスティングの更新を準備 → ガイダンスを公開）。裏付けは**10 億ドルの補助された「Daybreak for Frontline Defenders」アクセス**と、ホストの PHP バージョンを検査する Codex スキル。日付は二つのリサーチ投稿と突き合わせた：

- **8 月 1 日** — OpenAI が Calif を招く；Calif の Ryan Austin が同じ日に RCE 経路を発見。
- **8 月 5 日** — 発見のハッシュが公開される。
- **8 月 11〜14 日** — バグと動作する PoC が PHP へ渡る。
- **8 月 19〜24 日** — Wiz が Wiz Atlas、Gemini 4 Argon、GPT-5.6 Sol を使って同じバグ族に独立に衝突し、8 月 24 日に報告。

したがって検査可能な主張は**三つの当事者が三週間以内に同じバグ族へ独立に到達した**ことであり、これはこれらのバグがいまどれほど見つけやすいかについての、現実的でやや警鐘的な陳述だ。測定されていない主張は因果だ。発見者自身の説明が対抗軸になる：「初期のバグ発見には、特別な harness も、誰にでも一般に公開されていなかったモデルへのアクセスも使われていない……単純なプロンプトでそれらすべてを掘り起こせるモデルは存在しない」。Wiz の枠付けは逆を指す——「一人の研究者が、かつて世界水準のチームが何か月も要した仕事を一週間で成し遂げた」。両方は真でありうる：モデルは研究者の一週間を短縮し、ドメイン知識がなお手法だった。

これが決める執筆ルール：ラボと独立の当事者が同じ発見を報告するとき、**時間の重なりが事実であり、帰属は各当事者の枠付けである**——そしてそれらが衝突する場合、発見者の説明が発行元の見出しより上位に来る。

Sources: [NVD：CVE-2026-114639](https://nvd.nist.gov/vuln/detail/CVE-2026-114639) · [NVD：CVE-2026-114656](https://nvd.nist.gov/vuln/detail/CVE-2026-114656) · [NVD：CVE-2026-114662](https://nvd.nist.gov/vuln/detail/CVE-2026-114662) · [NVD：CVE-2026-114661](https://nvd.nist.gov/vuln/detail/CVE-2026-114661) · [Calif：PHP2Shell](https://calif.io/php2shell/) · [Wiz：PHP2Shell](https://www.wiz.io/blog/php2shell-php-rce) · [HN：Patch the Planet](https://news.ycombinator.com/item?id=50181175)

## 2026-10-22 —— 記録の日付はワークフローのタイムスタンプであり、日付を持たない記録もある

一つのバッチが**修正と記録の五つの異なる関係**を生み出した。これは本ファイルにとって最良の校正である。分類の全体、各事例の数値、執筆ルールは [[disclosure-lag]] に移った。ここに残すのは、各形状が*供給*の計数に何をするかである。

- **記録の 16 日前に修正。** vLLM の連番七件（`CVE-2026-114049…-114055`、VulnCheck、「before 0.31.0」）は **2026-10-05T07:41:02Z** にアップロードされたリリースに対応する——したがってこの勧告ブロックは 10 月 21 日時点の露出数に**ゼロ**を加え、「今週の新規クリティカル」グラフには七を加える。
- **記録の 168 日前に修正。** Vibe-Trading の三件は **v0.1.7（2026-05-06T12:11:26Z）** で修正され、公表の五か月半前だった。
- **割り当ての後追い。** Trigger.dev の **39 件の GHSA（7 月 9 日〜10 月 20 日）** が一日で **29 の CVE 番号**になった。その日に発見されたものは何もない。
- **修正がまったくない。** Vyper のオプティマイザ誤コンパイルはパッチ済みバージョンを持たず、現行リリースに影響する——このバッチで、記録の遅れが*悪い*知らせである唯一の事例。
- **記録がまったくない。** 六件の `ZDI-CAN` カーネル報告（二件は CVSS 9.0）が公開 LKML に再現スクリプト付きで投稿され、CVE 番号はない。これは本ファイル初の**記録前の開示**である：供給は存在し、データベースは空で、CVE をキーにするあらゆる検査がクリーンを返す。

**供給計数への帰結：**「今週公表された CVE」は三つの異なる量の混合物だ——発見、割り当て、そしてずっと前に修正済みのバグの再公表。それらを分ける唯一のレコード単位のフィールドはバージョン範囲であり、記録前のクラスには範囲を取るべき記録自体がない。

**来歴、同じ教訓の五度目の再演。** `OSSA-2026-046`（OpenStack Manila、任意のテナントが任意の*公開*共有を奪える）に「CVSS」は **0 回**——一次確認、26,099 バイトの HTML で 0 回——しか現れないが、`CVE-2026-71195` は metric を一つだけ持つ：**CVSS 3.1 の 9.9、source `cve@mitre.org`、Secondary と表示**、NVD 状態 `Received`、CWE-863。二つの教訓はすでに記録済みだが、いま第二の文書形状を得た：スコアのない勧告はスコアのない記録ではない。そして MITRE 自身の metric が Secondary として届くことは、このラベルが「CNA ではない」を意味しない五番目の事例である。（OSSA が実際に持つ帰属：中国科学院計算技術研究所の Chen YuXiang と Yuliang Xiao が報告し、Red Hat の Goutham Pacha Ravi と Carlos da Silva が追加の公開共有経路を発見した。）

Sources: [Trigger.dev advisories](https://github.com/triggerdotdev/trigger.dev/security/advisories) · [vLLM v0.31.0](https://github.com/vllm-project/vllm/releases/tag/v0.31.0) · [NVD: CVE-2026-71195](https://nvd.nist.gov/vuln/detail/CVE-2026-71195) · [OSSA-2026-046](https://security.openstack.org/ossa/OSSA-2026-046.html) · [Phoronix: publicly posted kernel reports](https://www.phoronix.com/news/LKML-New-Trend-Vulnerabilities) · [GHSA-6j9c-gvcw-74fj](https://github.com/vyperlang/vyper/security/advisories/GHSA-6j9c-gvcw-74fj)

## 2026-10-24 12:03（学習パス）——NVD が 1 つもスコアを書かなかったバッチと、「デフォルト値としての」スコア

**本パス実測のセンサス**（本バッチの高スコア 8 件に `nvd-provenance.mjs` を実行）：**8/8 が CNA 付与、`nvd@nist.gov` メトリクスは 0 件**——Google 9.2（`Awaiting Analysis`）、MITRE 9.2 かつ KEV（`Deferred`）、GitHub 9.8 と 9.9（`Deferred` / `Awaiting Analysis`）、VulnCheck 9.2（`Deferred`）、Eclipse 8.8（`Deferred`、CWE-354）、Okta 9.1（`Awaiting Analysis`）、Patchstack 9.8（`Deferred`）。同じ窓に 2 つの状態（`Awaiting Analysis` と `Deferred`）が併存し、1 件は CNA のスコアで KEV に入り、NVD 自身は 1 点も書いていない。帰結はこのファイルが繰り返し着地する点：「NVD 分析済みかつ ≥9.0」を条件とするトリアージ方針は、**どれも**拾わない——web shell で実際に悪用されている 1 件を含めて。

**スコアは測定ではなくデフォルト値でありうる。**1 つの窓に 12 件、すべて CWE-502、すべて 9.8、すべて `audit@patchstack.com`、すべて `Deferred`（[[security]]）：数字が一様なのはレコードがテンプレートだからで、ベンダー、slug、CWE、「from n/a through <version>」しか無く、入口点も認証前提も gadget チェーンも確立しない。深刻度が十数の異なるコードベースで不変であるとき、不変なのは**評価者の仮定**であってコードではない。執筆ルール：バージョン上限を列挙し、スコアは Patchstack のものと明記する。9.8 に検証済みの未認証 RCE を含意させない。

→ [[security]] [[disclosure-lag]] [[fact-check]]

Sources: [NVD CVE-2026-112846](https://nvd.nist.gov/vuln/detail/CVE-2026-112846) · [NVD CVE-2026-112862](https://nvd.nist.gov/vuln/detail/CVE-2026-112862) · [NVD CVE-2026-110447](https://nvd.nist.gov/vuln/detail/CVE-2026-110447) · [CISA KEV カタログ](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)

## 2026-10-25 12:33 —— `weaknesses[]` は CNA のフィールドであり、`vulnStatus` は公開時のスナップショットではなく照会時に読まれる

起案時の問いは二択だった——`weaknesses[]`（CWE）は `affected[]` のように公開時から存在するのか、
それとも `configurations` のように NVD の分析後にだけ現れるのか。`disclosure-lag.mjs --field-census
weaknesses` で **2026-10-18 → 10-24** の公開週（**4,631** 件、レンジ調査と同じ窓——八時間前には **4,624** 件を返しており、この 7 件の差自体が、NVD の `pubStartDate`／`pubEndDate` の窓は*リクエスト*時に評価されるのであって凍結されているわけではないという注意になる）を測ると、答えは
どちらでもなく、その理由はレンジ調査が一度も直面しなかった罠である。

| ステータス | 件数 | `weaknesses[]` を持つ | % |
|---|---:|---:|---:|
| Received | 830 | 142 | **17.1** |
| Awaiting Analysis | 1,568 | 1,071 | 68.3 |
| Undergoing Analysis | 454 | 297 | 65.4 |
| Deferred | 1,249 | 1,217 | 97.4 |
| Analyzed | 403 | 403 | 100.0 |
| Modified | 5 | 5 | 100.0 |
| Rejected | 122 | 0 | 0.0 |
| **合計** | **4,631** | **3,135** | **67.7** |

**帰属フィールドが所有権を決める：3,135 件のうち 3,073 件が CNA 由来の source を持つ**（`cna` 3,073 ·
`mitre` 33 · `nvd` のみ 27 · `nvd`+`cna` 2）。つまり CWE は NVD の分析出力ではなく CNA の陳述であり、
*種類*としては `weaknesses[]` は `affected[]` と同じ側にある。しかし*可用性*では同じではない。レンジは
公開当日の 97.4% に存在し、CWE は一週間の記録で 67.7%、まだ `Received` に留まっている記録では
**17.1%** にすぎない。

**この二つの数字が矛盾しないこと自体が今回の発見である。** `vulnStatus` は照会時に読まれる生きた
フィールドなので、公開窓での調査は「その週に公開された」と「*今日*のステータス」をクロス集計している。
したがって `Received` の行は「昨日の到着」ではなく**動いていない滞留**である——対照実験がそれを示す。
同じ調査を **2026-10-24 単日**で回すと **66 件の `Received` のうち 65 件（98.5%）が CWE を持ち**、
10-24 はその週の 830 件のうち 66 件しか占めていない。長期滞留した `Received` の残渣こそが低 CWE の
集団であり、当日着の `Received` にはほぼ必ず一つある。帰結は二つ。

1. **「この `Received` 記録には CWE がない」は凍結状態についての陳述であり、CNA についてではない。**
   起案時の懸念——`Received` 記録から CWE を引用するのは「まだ存在しえない」フィールドを引用すること
   だ——は逆向きに外れている。存在しうるし、新しい記録にはたいてい存在し、古い記録での欠落は「誰も
   触っていない」印である。
2. **このツールが印字するステータス別の表すべてに、レンジ調査と同じ脚注が要る——しかも一段強く。**
   レンジ調査は「その行はその週に書類手続きが完了した記録として読め」と書く。ステータス別のフィールド
   表はさらに「ステータス列は*いま*であって当時ではない」と言わねばならない。正直な言い方は
   「その週に公開され、*今日*のステータスが X である記録」である。

**NVD は 93% の記録で分析を済ませながら、自分の CWE を公表していない。** `Analyzed`+`Modified` 408 件の
うち **29 件（7.1%）** だけが `nvd@nist.gov` の source を持ち、NVD のみは 27 件にとどまる。この
フィールドでも `Analyzed` という状態と `nvd@nist.gov` という指標は別の問いである——`CLAUDE.md` の
ルール 6 が CVSS について記録したのと同じ「追認」の形が、CWE でも確認された。さらに**feed が一度も
名指ししない第三の帰属**がある。33 件が `cve@mitre.org`、つまり CVE プログラムの最後の拠り所の CNA で
あり、ベンダーでも NVD でもない。

**執筆規則：**「CWE は X と言っている」にはスコアと同じ三語が要る——*誰の* CWE か。「CNA の
CWE-862（`secalert@redhat.com`）」と書くか、source の区分を明示する。`Received` 記録では、その記録が
未分析であり CWE は CNA 自身の見立てであって評価ではないと述べる。そして、単に動いていない記録から
「CWE 未割当」を推論してはならない。

→ [[disclosure-lag]] [[security]] [[fact-check]]

出典：[NVD CVE API 2.0](https://services.nvd.nist.gov/rest/json/cves/2.0) · [CVE-2026-115557](https://cveawg.mitre.org/api/cve/CVE-2026-115557) · [CVE-2026-114406](https://cveawg.mitre.org/api/cve/CVE-2026-114406) · [NVD CVE-2026-116014](https://nvd.nist.gov/vuln/detail/CVE-2026-116014)

## 2026-10-25 20:03 バッチ——CVE ID は資産キーであり、このバッチの 1 つの ID は別の製品に解決する

**1. 件数の口径をベンダー規模で見る。**Oracle の 10 月 CPU は「**1295 new security patches**」、同一文書で **1,700 超**の異なる CVE 識別子をクレジットし、Java SE は 8u503 / 11.0.32.1 / 17.0.20.1 / 21.0.12.1 / 25.0.4.1 / 26.0.2 / 27 を覆う。HPE の ArubaOS は **72 の脆弱性**で「最大深刻度 8 件」と報じられ、うち **7 件**が `security-alert@hpe.com` の **10.0** を持ち、すべて `Received` かつ **NVD 採点 0**——スコアは CNA のもので未解析、しかもネットワークの縁に座る機器クラスである。Microsoft の 10 月 CVRF（規則 7 の校正済み双子）は **1,413** 件の記述項目に対し **1,760** の一意 ID。繰り返す算術：パッチ ≠ CVE ≠ 影響製品であり、名詞はベンダーごとに違う。名詞を書くこと。

**2. リリース日の遅れを 1 つの ID で実測。**`CVE-2026-114820`（Java SE / GraalVM、**9.1 / CWE-327**）は **2026-10-24** に登録簿へ公開された——**パッチ出荷の 10 月 20 日より 4 日後**——で、Oracle の `secalert_us@oracle.com` 指標のみ、状態 `Received`、NVD 指標 0。CVE フィードの充填を待つ資産所有者は、勧告の日付が示すより遅れてパッチを当てることになり、この遅れの向きは深刻度ではなくワークフローが決める。

**3. 資産キーの破綻は、スコアの誤りより悪い。**`CVE-2026-79845` は報道では HPE の ArubaOS 最大深刻度 8 件の一つだが、NVD 上では **VulDB 割当の無関係な PHP 在庫アプリの SQL インジェクション**で、**2026-08-25** 公開（`Deferred`、VulDB の 3 スコア、NVD 0）。CVE ID をキーにしたスキャンは、影響を受ける Aruba コントローラを*79845 の影響なし*と報告する——レコードは運用者が動かしていないソフトを記述しているからだ——一方、トリアージが並べ替えに使う数（3.1 の 7.3）は誤った製品に付いている。**スコア来歴の規則ではこれを捕まえられない**：誤ったレコードの各フィールドは内部的に整合しているからだ。捕まえられるのは、レコードの製品が勧告の主張と一致するか、そしてベンダー文書（ここでは読めない——`doc-twin` は **JS シェル、本文 0 文字**を返す）と `keywordSearch` が裏づけるかである。公開ウィンドウに対する `keywordSearch=ArubaOS` は、実在する集合に **0 件**を返す——説明文が AOS-10/PAPI だからだ。キーワード検索は発見の手掛かりであり、センサスでも反証でもない。

**4. このバッチを採点したのは CNA で、週を通じて例外は 1 件。**HPE の 7 件（`security-alert@hpe.com`）、Oracle の 9.1（`secalert_us@oracle.com`）、VulnCheck の 3 件（`disclosure@vulncheck.com`）——すべて `Received`/`Deferred`、すべて **NVD 採点 0**。例外は OpenAI の投稿が*既存*の欠陥として指すレコード：`CVE-2026-24834`、`Analyzed`、**NVD 自身の 8.8 Primary** に GitHub 9.3 と CISA-ADP 9.3 が並ぶ。対照として残す価値がある：NVD が解析したレコードはこういう形で、この週のほぼ何もそうではない。再確認：VulnCheck の 2 つの CVSS 版は**同一ソース**でありながら**異なる `type` スロット**（3.1 `Primary`、4.0 `Secondary`）に入る。スロットは来歴の主張ではない。

**5. 持ち帰るべき修復事実 2 つ。**Grav `CVE-2026-116019`（Flex フォーム上書きの許可リスト回避：ページ編集権限の利用者が `data-*@` 指令を移して `Folder::delete` / `Utils::download` を呼ぶ）は **2.2.13** で修正。Camaleon `CVE-2026-116009` は**メディア権限だけ**で ERB テンプレートをテーマに書き込み実行に到達する（**2.9.3** で修正）。Crow `CVE-2026-116011` は未認証のスタック枯渇で **v1.3.4（2026-09-07 出荷、レコードより 47 日早い）** で修正（`fix-predates-record`）。そのリリースは無関係な修正も含むため「1.3.4 へ上げる」は既に正しい助言だった。

→ [[disclosure-lag]] [[security]] [[fact-check]]

Sources: [Oracle CPU October 2026](https://www.oracle.com/security-alerts/cpuoct2026.html) · [NVD CVE-2026-79845](https://nvd.nist.gov/vuln/detail/CVE-2026-79845) · [NVD CVE-2026-114820](https://nvd.nist.gov/vuln/detail/CVE-2026-114820) · [GHSA-7x84-xhp8-6cqj (Crow)](https://github.com/CrowCpp/Crow/security/advisories/GHSA-7x84-xhp8-6cqj)

## 2026-10-25 20:30 (act) — 一つの ID に一人の割当者：衝突ではなく**範囲**が誤りで、割当は時刻を持つ

**問い（10-25 20:16 起票）：公開済みの CVE ID が二人の CNA に帰属しうるか、CVE Program はどう扱うか。
答えは「起こりえない」であり、このバッチの誤りは**範囲**であって重複ではなかった。**
`CVE-2026-79845` は `PUBLISHED`、`assignerShortName: VulDB`、ベンダー `code-projects`、製品
`Simple Inventory System 1.0`、公開 **2026-08-25T22:00:11Z**——記録は一つ、所有者も一つで、この ID の
下に第二の記録は存在しない。HPE はこれを一度も持っていない。

**1. 予約（reservation）イベントだけが機構を可視化し、`dateReserved` を持つのは cveawg だけ。**
NVD にこのフィールドはなく、それが本リポジトリの全ツールが記録を読めても割当を見られなかった理由である。
三つの時刻で決着する：

| 記録 | 割当者 | `dateReserved` | 意味 |
|---|---|---|---|
| `CVE-2026-79835`–`-79844` | hpe | 2026-08-25T14:47:15.581–.582Z | **10 件の原子的バッチ**（ミリ秒まで同一） |
| `CVE-2026-79845` | **VulDB** | **2026-08-25T14:47:17.838Z** | 別 CNA、**2.26 秒後** |
| `CVE-2026-79846`–`-79855` | hpe | 2026-08-25T14:47:27.562–.563Z | HPE の**次の**バッチ、**9.72 秒後** |

プールは**リクエストごとに最小の空き ID** を払い出す。ベンダーの二回のリクエストの間に他者の一度の
リクエストが入るとブロックが分割され、一個だけの島が残る——ここでは `-79844`（AOS-10 の 10.0）で、
片側が VulDB の PHP アプリ、もう片側が 50 件の HPE ArubaOS 記録である。ベンダーの運用ではなく共有
カウンタの帰結だ。したがって「二者が同じ ID を使った」は**レジストリ**の状態ではなく**文書**の状態で
あり、記録のどのフィールドもそれを示さない。

**2. アドバイザリは集合であり、密度は 0.45%。** `cve-id-neighbours.mjs --ref hpesbnw05162` の実測：
**71** 件が当該アドバイザリを参照（すべて `security-alert@hpe.com`、公開日 2026-10-22）し、**4 本の
連続区間**——`{79844}`、`79846–79895`（50）、`79955–79956`（2）、`95704–95721`（18）——に分かれ、
**15,878** 個の ID 値をまたぐ。ベンダーの公開集合は構造的に範囲ではない。あるトラッカーの見出しに
ある「`CVE-2026-79844` **から** `-79851`」と八件の ID 列は構成物である。

**3. その 8 はラベル件数で、八行のうち誤っているのは ID だけ。** 71 件のうち**ちょうど 7 件**が 10.0。
八番目の「最大深刻度」行は `CVE-2026-79873`——*"Unauthenticated Adjacent Authentication Bypasses in
the PAPI Protocol of AOS-10"*、**9.3**、`AV:ADJACENT_NETWORK`、`baseSeverity: CRITICAL`、影響範囲は
同じ（≤10.8.1.1 / ≤10.7.2.6）。つまり「八件」（Critical ラベル）と「七件」（CVSS 10.0）はどちらも
正しく、別のものを測っている。表の誤りは連続した ID を実在の ID の代わりに置いた一点である。
CLAUDE.md ルール 6 の「ラベル ≠ 閾値」の三度目の出現であり、単位の取り違えが**行を捏造した**最初の例。

**4. 利用者側のコストを正確に。** **アドバイザリ**を鍵にした台帳（references は HPE の記録だけを指す）
は 71 行すべて正しい。**報道の八行表**を鍵にすると、PHP アプリを記述する ID を一つ抱え込む：Aruba
コントローラで `79845` をスキャンすると「影響なし」となり、トリアージは VulDB の 6.9/7.3/7.5 で
その記録を並べる。`keywordSearch=ArubaOS` はこの集合に対していまも **0 件**（説明文は AOS-8/AOS-10/
PAPI）。レジストリは製品名で列挙できず、references フィールドだけが到達経路になる。

→ [[disclosure-lag]] [[security]] [[fact-check]]

Sources: [cveawg CVE-2026-79845](https://cveawg.mitre.org/api/cve/CVE-2026-79845) · [cveawg CVE-2026-79873](https://cveawg.mitre.org/api/cve/CVE-2026-79873) · [NVD CVE-2026-79845](https://nvd.nist.gov/vuln/detail/CVE-2026-79845)

## 2026-10-26 04:03 バッチ——同じCNAが両方の数字を書き、「修正済み」フラグは撤回される

**1. CVSSバージョンが重大度の軸になるのは、1つのCNAが両バージョンを書くからだ。** このバッチの3レコードは同一CNA（cveawg上で `VulnCheck`）を共有し、各レコードが同じコンテナに2つのスコアを持ち、NVDはそれを `Primary`/`Secondary` の枠へ移すだけだ：

| CVE | 製品 | CVSS 3.1 | CVSS 4.0 | Δ | NVD状態 | NVD採点メトリクス |
|-----|---------|----------|----------|---|-----------|--------------------|
| CVE-2026-116192 | rclone `--rc-serve` SSRF | 5.9（`AV:N/AC:H/…/C:H/I:N/A:N`） | 8.2（`AT:P`） | +2.3 | `Received` | 0 |
| CVE-2026-116199 | Snipe-IT Google-SSO認証バイパス | 8.1（`AC:H`） | 9.2（`AC:L/AT:P`） | +1.1 | `Received` | 0 |
| CVE-2026-116163 | Parse Server `AuthAdapter` バイパス | 7.4（`AC:H`） | 9.1（`AC:L/AT:P`） | +1.7 | `Received` | 0 |

v4.0は **3/3** で高い。しかも各v4.0ベクタは `AT:P`（Attack Requirements: Present）を立てており、v4.0では通常これは*減点*であって加点ではない。だから差は一方の算術ではなく、別の問いが問われていることの結果だ。資産台帳への帰結：Parse ServerはCVSS 4.0なら **Critical（9.1）**、3.1なら **High（7.4）**。そして両方の数を同一の主体が同一コンテナに書いた。「重大度はいくつか」にはバージョン*と*採点者が要り、バージョンを混ぜたトリアージ列は比較不能なレコードを並べることになる。3件とも `Received` で **NVDメトリクス0**、つまりこれらのレコード上にNVDのものは無い——CLAUDE.mdのケース(2)/(5)が求める「NVD番号の不在」という主張自体も含めて。

**2. `Primary`/`Secondary` は枠であって出所ではない——2日連続。** rcloneの2つのメトリクスはどちらも `source: disclosure@vulncheck.com`。3.1が `Primary`、4.0が `Secondary` だ。枠を出所として読むと、1つのCNAの2バージョンがベンダー対第三者の不一致に変わる。まさにそれがfeedに載った（3言語でその場で修正済み）。

**3. 「修正済み」フラグは撤回され得る。そして改訂版こそが問題のパッチだ。** Microsoftの帯域外.NETリリースは `CVE-2026-70197`（8.1、`secure@microsoft.com`）と `CVE-2026-102870`（8.8、同）を再修正した。**2026年10月13日**のリリースが「これらの問題を完全には解決しなかった」ためだ。両レコードは2026-10-13公開で、いまも**未分析**（`Awaiting Analysis` / `Undergoing Analysis`）、NVDメトリクス0。よって開示ラグの語彙に無かった状態が加わる：`fix-then-record` ではなく（修正は存在した）、`no-fix` でもなく（修正は出た）、**`fix-claimed-then-refixed`**——勧告の修正済みバージョンが*早すぎる*方向に誤っており、その方向を消費者は誰も再確認しない。実務的系：パッチ・チューズデイの台帳が「修正済み」を真偽値で持つなら、この状態の欄が無い。正しい単位は*どのビルドか*であり、投稿自身が言う通り「ホストに新しいランタイムを入れても、アプリに同梱されたランタイムは更新されない」。自己完結アプリは再ビルド、コンテナも再ビルドが必要だ。

**4. 勧告のメタデータとその本文は食い違い得る。そして本文は再現者のものだ。** rcloneの `GHSA-xqmq-v4wj-rw5m` のメタデータは影響 `>= 1.37, <= 1.74.1`、修正 `1.74.2`。本文は「最新リリース **v1.75.1** で挙動を確認した」と述べ、動的な影響リストにも1.75.1が入る。つまり「1.74.2へ上げよ」は成立しない可能性のある指示だ。これはTrigger.devの形（セルが自分のタイトルと矛盾する）の一段上で、矛盾は1つの勧告の*メタデータ対散文*の内部にあり、散文が再現を運んでいる。さらに6つの前提条件を公表している——`--rc-serve` 有効（既定は無効）、非ループバック待受、RC認証なし、既存の `http`/`netstorage` リモート、書き込みプリミティブは未実証——これが5.9対8.2を採点練習ではなく実のある議論にしている。

→ [[disclosure-lag]] [[fact-check]] [[security]]

Sources: [cveawg CVE-2026-116192](https://cveawg.mitre.org/api/cve/CVE-2026-116192) · [NVD CVE-2026-116192](https://nvd.nist.gov/vuln/detail/CVE-2026-116192) · [rclone advisory](https://github.com/rclone/rclone/security/advisories/GHSA-xqmq-v4wj-rw5m) · [.NET Blog OOB](https://devblogs.microsoft.com/dotnet/dotnet-october-2026-oob-security-updates/)

## 同じスコアの2つのバージョン、そして `Primary` スロットはバージョンを選んでいる (2026-10-26 20:38)

10-26 20:03 バッチは、243 レコードの窓で VulnCheck の二重採点ペア **75 件のうち一致はゼロ**と報じた。
私は 20:38 に同じ**ライブ**窓で再測定した（その時点で **254** レコード——公開窓は流動するコホートなので件数は
再現できず、再現できるのは**形**である）：

- **78** レコードが `disclosure@vulncheck.com` による同一所見の **3.1 と 4.0 両方**のスコアを持つ。
  **4.0 が高い 60 件、3.1 が高い 18 件、等しい 0 件**。Δ(v4.0 − v3.1) の平均 **+0.85**、範囲 **[−2.1, +2.6]**、
  **32/78（41%）が深刻度バンドをまたぐ**。
- **スロットはバージョン選択子であり、出所ではない。** 78 件中 **74 件が 3.1 を `Primary`、4.0 を `Secondary`** に置く。
  4 件は両方 `Secondary`、**4.0 を `Primary` に置くものは 0 件**。したがって「Primary 指標」を読む消費者は
  *古い方のバージョン*を読んでいる——そして v4.0 の方が通常は高い数値なので、このスロットは
  **74 件中 57 件で過小評価**、17 件で過大評価する。
- **変換は一貫しているが、換算ではない。** 3.1 ベクトルが `AC:H` を持つレコードは 28/28 で 4.0 側に `AT:P` が付き、
  3.1 が `AC:L` のレコードに `AT:P` が付くことは**一度もない**。それでも **`AC:H` を保ったまま `AT:P` を足した**
  21 件——同一の指標形状——でも差分は **−2.1 から +2.6** に広がる。採点者はレコードごとに悪用可能性を
  判断し直しており、このバージョン対は目盛りの違う2つの物差しではなく、2つの別の計器である。
- **別 CNA からの第3の状態：** VulDB の `CVE-2026-115997` は同一窓で自前スコアの**3つ**のバージョンを持つ——
  CVSS **2.0 6.5、3.1 6.3、4.0 2.1**——1つのバグで LOW から MEDIUM にまたがる。
- **消費者側はベンダーではなくインデックスで分岐する。** OSV は `CVE-2026-116176` と `CVE-2026-116171` に
  **`CVSS_V4` のみ**を返し、そのベクトルは VulnCheck の 4.0 基本指標と*完全に同一*である——
  OSV 系スキャナと NVD `Primary` の読者は構造的に食い違う。`CVE-2026-115214`（Datawiza、9.8、CISA-ADP のみ）は
  OSV で **"Vulnerability not found"**：パッケージレコードが無く、OSV をキーにするスキャナは 9.8 を全く見られない。
- **vLLM の塊は1つのクラスではなく10の欠陥クラス：** 同一窓の10レコードが10の異なる GHSA と CWE に対応する——
  `CWE-20` ×4、他に 409、918、400、770、908、129——すべて 3.1-`Primary` / 4.0-`Secondary`。

**執筆規則：** スコアは `(数値, バージョン, 採点者, フィールド)` である。4つとも書く。1つの記録が同一者の
2バージョンを持つならそう明記する——`7.5 (CVSS 3.1) / 8.7 (CVSS 4.0)、いずれも disclosure@vulncheck.com、
NVD Deferred` が引用可能な形であり、「8.7 High」は41%のコイントスの要約にすぎない。
残る未解決問題は記録ではなく在庫ツールの問いである：あるスキャナが**既定でどのバージョンを印字するか**。

→ [[disclosure-lag]] [[fact-check]] [[security]]

Sources: [NVD 2.0 API — the 10-25→26 window](https://services.nvd.nist.gov/rest/json/cves/2.0?pubStartDate=2026-10-25T00:00:00.000&pubEndDate=2026-10-27T00:00:00.000&resultsPerPage=2000) · [NVD CVE-2026-116137 (3.7 / 6.3, ADM-ZIP)](https://nvd.nist.gov/vuln/detail/CVE-2026-116137) · [NVD CVE-2026-116145 (3.9 / 1.8)](https://nvd.nist.gov/vuln/detail/CVE-2026-116145) · [OSV CVE-2026-116176](https://api.osv.dev/v1/vulns/CVE-2026-116176) · [OSV CVE-2026-115214 (not found)](https://api.osv.dev/v1/vulns/CVE-2026-115214)

## 2026-10-26 20:47（実行パス）— スキャナを初めて実走：数値がそもそも届かない

上の国勢調査が残した問いは「スキャナはどのバージョンを*表示*するか」だった。1つ走らせた結果、
Pythonエコシステムでは問い自体が解消する：**`pip-audit` 2.10.1 は重大度を一切表示しない**。
両方の出力モードで。

- **人間向け表**、`pillow==12.3.0`（**37**件の勧告、本バッチの9.2 `CVE-2026-112398` を含む）に対して：
  `Name | Version | ID | Fix Versions`——4列で**重大度なし**。9.2のヒープオーバーフローも一覧の
  他の項目と見分けがつかない。
- **JSONモード**の各結果は `id`、`aliases`、`description`、`fix_versions` のみ。どのバージョンにも
  `severity` キーも `cvss` キーも無い。
- **原因はフィードでありツールではない。** pip-audit は PyPI の `GET /pypi/<pkg>/<ver>/json` の
  `vulnerabilities[]` を読む。そのキーは `aliases, details, fixed_in, id, link, source, summary,
  withdrawn` である。**PyPIは取り込み時にOSVの `severity[]` を落とす**——数値は上流に存在し、
  その1ホップで止まる。
- **上流ではバージョンで型付けされている：** `api.osv.dev/v1/vulns/GHSA-5x8w-8jj5-q52h` は
  `severity: [{type: "CVSS_V4", score: "CVSS:4.0/AV:N/AC:H/AT:N/…"}]` と
  `database_specific.severity: "CRITICAL"` を返す。つまり重大度を表示するOSVフィードのスキャナは
  **4.0** のラベルを表示し、PyPIフィードのものは何も表示しない。

**これが2つの未解決問題に与える影響。**「どのスキャナが旧 `cvss` フィールドを読むか」は
**`api.github.com/advisories` の消費者**の問題であり、名指しされた4つのツールはいずれもその消費者ではない：
pip-audit は PyPI/OSV、`osv-scanner` は OSV、trivy と grype は NVD/ディストリビューションのフィードを取る。
また「`Primary` スロットを読むツールは系統的に0.85点低いか」は、実測した1つのツールについては答えが別で、
**低いのではなく空である**——故障モードは誤った数値ではなく数値が無いことであり、だからこそ
「勧告の `cvss` フィールドは null」が2度掲載されても消費者に気づかれなかった。残る3つは未測定と明記する：
本ホストにGoツールチェーンが無く、DB持ちの2つは数百MBの脆弱性DBを取得するため、途中で走らせると
「*ダウンロード中の*ツール」についての主張になり、「*公開済みの*ツール」についての主張にならない。

**執筆規則：** スキャナの出力を引用するときは、ツール名だけでなくその**フィード投影**も書く。
PyPIを読む `pip-audit` は OSVを読む `osv-scanner` ではなく、NVDを読む `grype` でもない。
CVSSの問いに答えを持つ対象が存在するかどうかを決めるのは、その投影である。

→ [[disclosure-lag]] [[fact-check]]

Sources: [PyPI JSON — pillow 12.3.0（severityキー無し）](https://pypi.org/pypi/pillow/12.3.0/json) ·
[OSV — GHSA-5x8w-8jj5-q52h（CVSS_V4）](https://api.osv.dev/v1/vulns/GHSA-5x8w-8jj5-q52h) ·
[pip-audit](https://pypi.org/project/pip-audit/)

## 2026-10-27 04:32（action パス）——二列の方向は CNA の癖であり、レジストリの数はすべて再計算できる

04:29 に起票した 2 つのアジェンダ項目は、同じページを読み直すのではなく**計器を作る**ことで答えた：
`agent/tools/cvss-recompute.mjs`（v3.1/v3.0 は仕様式によるネイティブ実装、v4.0 は第三者オラクル経由）を NVD の
**2026-10-20 → 10-26** 公開ウィンドウに走らせ、**3 ページ、4,461 メトリクス**。

**1. ベクターからの再計算：4,461 中 4,461 が再現し、不一致 0。** v3.1 **3,319/3,319**（ネイティブ）、v4.0
**1,113/1,113**（`cvss4` 1.0.7 オラクル）、v3.0 **29/29**、約 50 の採点元にまたがる：CISA-ADP（`134c704f…`、619）、
Oracle（1,078）、VulnCheck（913）、VulnDB（420）、GitHub（295）、Patchstack、HPE、Cisco、Talos、IBM、Red Hat、
MITRE、GitLab、MongoDB、Zephyr、NCSC-NL、JPCERT、CERT/CC、Siemens、ABB、Apache、Eclipse…。「下流は `score` を
写すだけか」への答えは、写すものが存在しない、である——保存された `baseScore` は隣の `vectorString` の算術そのもので
あり、すべてのバージョン、すべてのスロット、すべてのソースでそうである。したがって誤りの型は「誤った数が公表された」
ことでは決してなく、**(a)** あるページが**同じベクター**の隣に**2 つ目**の数を印字すること（`zip` 勧告本文の 9.9 対
10.0 を計算するベクター——[[fact-check]] 参照）と、**(b)** 消費者が数を**バージョン境界**を越えて運ぶこと
（`Primary`/`Secondary` は出所ではなくバージョン選択子である）。
**2. NVD は採点者ではない。** 4,461 のうち `source` が `nvd@nist.gov` なのは **8 件（0.2%）** のみ、v4.0 の 1,113
件では **0** 件——「NVD が 9.8 と言っている」はほぼ常に CNA の数を NVD が再配信しているだけであり、出所の問題が
誤りを生み続け、算術の問題がほとんど生まない理由である。

**3. v3.1 と v4.0 の差は *CNA の性質* であり、普遍ではない**——10-26 の知見（「VulnCheck の 78/78 ペアがすべて
不一致、4.0 が通常高く、平均 +0.85」）は一般化できず、10-27 の ImageMagick バッチ（21/21、19 件が 4.0 で高い）は
**同じ 1 社**の 2 番目の標本にすぎない。1 週間の**同源ペア 761 組**（1 レコード上で 2 バージョンが同じ `source` を持つ
——CNA の 2 列であり、ADP の 4.0 と CNA の 3.1 を組にしたものでは決してない）はきれいに分かれる：

| 採点者 | ペア | 一致 | 4.0 が高い | 3.1 が高い | 平均 Δ | 帯を跨ぐ |
|---|---|---|---|---|---|---|
| `disclosure@vulncheck.com` | 452 | 11 | 296 | 145 | **+0.55** | 122（27%） |
| `cna@vuldb.com` | 210 | 0 | 30 | **180** | **−1.76** | 142（68%） |
| `security@apache.org` | 16 | 1 | 7 | 8 | −0.37 | 6 |
| `cna@mongodb.com` | 16 | 0 | 13 | 3 | +0.68 | 6 |
| `ics-cert@hq.dhs.gov` | 15 | 0 | 11 | 4 | +0.75 | 4 |
| `twcert@cert.org.tw` | 11 | 0 | 6 | 5 | +0.28 | 4 |

VulnCheck は 4.0 で**上へ**半分ずれ、VulnDB は **1.76 下へ**ずれ、ペアの **68%** が深刻度帯を跨ぐ（レコードで抜き取り
確認：`CVE-2026-115534`–`-115537` と `-115796` は 3.1 が **4.3**、4.0 が **2.1**）。両社とも 3.1 を `Primary`、
4.0 を `Secondary` に置くので、**スロット配置は両者に共通で、方向は共通でない**——`Primary` スロットの*偏り*は
書き手の性質である。一致するペアは稀だが実在する（VulnCheck 11 + Apache 1 = 1.6%）ので、「2 バージョンは決して
一致しない」も普遍命題としては偽である。

**書き手への規則（改訂）：** スコアはバージョンとともに引用し、項目が**傾向**（「4.0 の方が高い」）を述べるなら CNA を
添える——1 社のバッチで測った差は、そのベンダーの計算機の癖についての記述である。計器の注記：この集計全体で
**NVD リクエストは 3 回**。

→ [[fact-check]] [[disclosure-lag]]

Sources: [NVD CVE API 2.0](https://services.nvd.nist.gov/rest/json/cves/2.0) ·
[`cvss4`（リファレンス風 v4.0 計算機）](https://www.npmjs.com/package/cvss4) ·
[`@pandatix/js-cvss`](https://www.npmjs.com/package/@pandatix/js-cvss) ·
[CVE-2026-115905](https://nvd.nist.gov/vuln/detail/CVE-2026-115905)

## 2026-10-27 12:22 — 範囲の中の5番目のフィールドと、NVD が同じ勧告に2つのスコアを付けた件

**`changes[]` が「除外」であり、それは範囲を終わらせる。** 昨日記録した CVE 5.x の `versions[]` 内の意味論は4形態だった（`lessThan` は排他、`lessThanOrEqual` は包含、裸の `version` は**点**、`"0"`/`"*"` は下限なし）。5番目があり、しかもそれが「修正」を表す形である：
**`changes[]` は `at` のバージョンで状態を切り替え、囲む範囲の末尾まで持続する。** cveawg から直接読んだ **`CVE-2026-110720`**（consul-k8s、HashiCorp、`PUBLISHED` 2026-10-26）：

```json
{"version": "0.42.0", "lessThan": "2.0.4", "versionType": "semver", "status": "affected",
 "changes": [{"at": "1.8.18", "status": "unaffected"}]}
```

したがって影響範囲は **`[0.42.0, 1.8.18)`** —— 1.8.18 が 1.x 系のバックポート —— であり、範囲は 2.0.4 まで伸びていない。これが単なるパーサの注意書きではなく執筆ルールになるのは、混乱の着地点のためだ：HashiCorp の**勧告本文**は1つの影響スパン（"0.42.0 up to 2.0.4"）の隣に**2つ**の修正バージョン（"1.8.18 and 2.1.0"）を並べ、スパンが分岐をまたぐとは書かない。だからページを読む人はページが自己矛盾していると結論する——一方、機械可読なレコードは公開日からこの除外を保持していた。**本文が1つの影響スパンの隣に2つの修正バージョンを並べるのは、矛盾ではなく、このフィールドに文が1つ欠けているだけである。** version/lessThan しか読まないパーサは `[0.42.0, 2.0.4)` 全体を影響と報告し、修正版そのものを脆弱と印し、2.x 系全体を黙って覆う；`disclosure-lag.mjs` は現在これを読み、`range 0.42.0 < 1.8.18 [cna-affected]` と `changes[]` の注記を出す（selftest 93/93）。


**普及率の実測、そしてこのフィールドには 2 つの用法がある（一次、cveawg、無制限）。** **2026-10-18→24** の公開ウィンドウから層化抽出した **400** 件（各 `versions[]` 項目をすべて検査）：**`changes[]` を持つのは 8 件（2.0%）**、分母はバージョンを持つ **375** 件。しかし**8 件のうち範囲を縮めたものは 0**——8 件すべてが*もう一方*の用法で、**包含上限の隣に修正を重複して述べる**形である：`{version: "0", lessThanOrEqual: "5.4.14", changes: [{at: "6.0.0", status: "unaffected"}]}`（同型が 3.4.6→3.4.7、1.3.1→1.3.2、6.7.1.91→6.7.1.92、4.1.2→4.1.3、2.9.2.4→2.9.2.5、1.0.7→1.0.8、4.9.5→4.9.6）。変更点は既定の上限*より上*にあり、何も変えない。よって 2 つの用法は **(a) 重複記述**（一般的で無害、このフィールドを素朴に読むと過大報告する形）と **(b) `lessThan` 範囲の内側にある真正の除外**（consul-k8s の形で、パーサが尊重すべきもの。稀であり、1 バッチの唯一の実例がこのライブラリのすべてである）。単日のサンプルを比率として引用してはいけない（10-25 公開の **131** 件は **0**）、8/400 は公開日スナップショットであり定常状態ではない。

**7レコード・1バッチ・5件が未分析——そして同源の2欄ペアが逆向きに動く。** `nvd-provenance.mjs` を1回：

| レコード | 状態 | メトリクス | NVD 自前 |
|---|---|---|---|
| CVE-2026-109618 (PHP) | `Analyzed` | **3.1 `nvd@nist.gov` 9.8** + 4.0 `security@php.net` 9.2 | 1 |
| CVE-2026-109619 (PHP) | `Analyzed` | **3.1 `nvd@nist.gov` 8.1** + 4.0 `security@php.net` 9.2 | 1 |
| CVE-2026-116843 (Mistral Vibe) | `Received` | 3.1 vulncheck **8.8** + 4.0 vulncheck **8.7** | 0 |
| CVE-2026-116747 (Kener) | `Received` | 3.1 vulncheck **8.1** + 4.0 vulncheck **9.2** | 0 |
| CVE-2026-115188 (Mautic) | `Deferred` | 3.1 **`Secondary`** `security@mautic.org` 9.9 | 0 |
| CVE-2026-115189 (Mautic) | `Deferred` | 3.1 `Secondary` `security@mautic.org` 8.8 | 0 |
| CVE-2026-110720 (consul-k8s) | `Received` | 3.1 `Secondary` `security@hashicorp.com` 9.9 | 0 |

3つの読み方で、それぞれがこのバッチが稼いだルールである：

1. **「NVD が分析した」はスコアが存在するという意味でしかなく、NVD が CNA に同意したという意味ではない。** PHP は1つの勧告・同日・2つのバグに**1つ**の数字——各レコードの 4.0 欄に 9.2——しか出さなかったが、NVD の2つの独立分析は **1.7 ポイント**離れた（9.8 と 8.1）。両レコードは**同一**の4つの CWE（`CWE-1325`、`-416`、`-755`、`-824`）も持つので CWE 一覧も両者を区別しない；2つのバグを分ける唯一のフィールドは NVD 自身の v3.1 スコアである。
2. **同源の2欄は同じバッチ・同じ CNA でどちら向きにも動く。** VulnCheck の2レコードはいずれも 3.1 が `Primary`、4.0 が `Secondary`；4.0 は Mistral Vibe で **0.1 低く**、Kener で **1.1 高い**。VulnCheck 452ペアの平均 **+0.55** を背景にすれば、どちらの向きも驚きではない——そこが要点だ：単一レコードの向きは手法についての証拠にならない。
3. **`Secondary` スロットは「CNA ではない」を意味しない。** Mautic と HashiCorp の単一メトリクスは `Secondary` スロットにあり、`source` は `security@mautic.org` / `security@hashicorp.com`、すなわち勧告を書いたベンダー自身である。スロットが言うのは「NVD ではない」だけで、もう一方の書き手が誰かについては何も言わない。

→ [[disclosure-lag]] [[fact-check]] [[security]]

Sources: [cveawg — CVE-2026-110720](https://cveawg.mitre.org/api/cve/CVE-2026-110720) ·
[NVD — CVE-2026-109618](https://nvd.nist.gov/vuln/detail/CVE-2026-109618) ·
[HashiCorp HCSEC-2026-50](https://discuss.hashicorp.com/t/hcsec-2026-50-consul-k8s-vulnerable-to-a-cross-namespace-authorization-bypass-in-component-acl-binding-rules/77915) ·
[CISA KEV](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)

## 2026-10-27 20:03 —— レコード自身が処置を運び、NVD は印字するスコアを正規化する

本バッチの三つのレコードは、重要なフィールドを数値からさらに一歩遠ざける。

### "UNSUPPORTED WHEN ASSIGNED" —— 恒久的な修正なしがレコードの内側にある

`CVE-2026-115748`（Apache Vysper、XMPP）は助言を決めるラベルで始まる。「**UNSUPPORTED WHEN
ASSIGNED** Authorization bypass in Apache Vysper, all versions.」機構は XEP-0077 帯内登録の実装で、
「missing an authentication check, allowing any authenticated user to compromise other accounts」
（CWE-639）であり、`security@apache.org` が **8.8** を付け、隣に Apache 自身の定性ラベル
**"important"** が並ぶ——ベンダーのラベルとスコアが対で記録されている。範囲は CVE 5.x の「すべて」の
書き方で、`pkg:maven/org.apache.vysper/vysper` に対する `{"version": "0", "lessThanOrEqual": "*"}`。
`version: "0"` は**空の下限**であり、リリースではない。

[[disclosure-lag]] の `no-fix-eol` にとって新しいのは、処置が*どこに*あるかだ。「As this project is
retired, we do not plan to release a version that fixes this issue. Users are recommended to find an
alternative.」この文は**CVE レコードの中**にあり、したがって「未修正」は保留ではなく恒久であり、さらに
このレコードを*退役についての唯一の機械可読な陳述*にする。参照先は退役したプロジェクトページ
（`mina.apache.org/vysper-project/`）と、素の取得では Pony Mail の外殻しか描画しない `lists.apache.org`
のスレッドだからだ。NVD は `Deferred` で保持し、`security@apache.org` の指標が一つ、**NVD 採点は 0**——
転送されたベンダースコアである。

### 19件の束はある CNA の午後一つであり、その遅れは予約時刻印である

**Hitachi の19レコード**が NVD の10月26〜27日ウィンドウに着地し、すべて `hirt@hitachi.co.jp`、すべて
v3.1：**9.8 が九件**、**9.4 が九件**、7.5 が一件——独立に再計算して基数の算術は **19/19 一致**。9.8 の組は
一つのバグの繰り返しではない。「Missing Authentication for Critical Function」「Authentication Bypass by
Spoofing」「OS Command Injection」、さらに別個のスタック／ヒープバッファオーバーフローを含む。
`CVE-2026-82116` は **2026-08-28T06:36Z に予約**され、**2026-10-27T09:37Z に公開**——**60日**の予約から
公開までの遅れであり、「本日公開」の並べ替えが8月に報告されたバグを浮上させる理由である。範囲の話は
[[disclosure-lag]] にある（N個の `changes[]` は修正集合）：修正リリース三つに対し影響ブランチ行は
**十三**、そのうち十にはベンダーページのどこにも修正版がない。

### NVD は時間的ベクタを正規化するので、「二つの数値」は同じベクタの二つの停止点になりうる

`CVE-2026-107656`（FortiSandbox）は、CNA が時間的スコアを提出したときに予期すべき形を示す。CNA の指標は
`baseScore: 9.6` を `…/E:F/RL:O/RC:C` の隣に置く。NVD は**同じ出所**から **9.8** を出し、その三成分を
ベクタから**剥がす**。つまり NVD は第二の見解を述べているのではなく基数指標へ正規化しており、正しい文は
「CNA は部分的に適用した時間的スコアを公表し、NVD は同じベクタの基数を印字した」であって「スコアが不一致」
ではない。完全な時間的式は **9.1**。算術は [[fact-check]] にあり、命名の罠（時間的ベクタ上の `baseScore`
はフィールド名であって保証ではない）もそこにある。このレコードには読みどころが二つある。アドバイザリ
（`FG-IR-26-185`、"2026-10-13: Initial publication"）は CVE レコード（2026-10-26T13:45Z）より**13日古く**、
CVE 説明の「FortiSandbox **4.2** all versions」はレコード自身の `versions[]`（`4.2.1`–`4.2.8`）より広い
——導入指示にはアドバイザリの版表を、影響集合にはレコードの範囲を引き、どちらかを他方として扱わないこと。

→ [[disclosure-lag]] [[fact-check]] [[security]]

出典：[CVE-2026-115748](https://www.cve.org/CVERecord?id=CVE-2026-115748) ·
[NVD — CVE-2026-115748](https://nvd.nist.gov/vuln/detail/CVE-2026-115748) ·
[Hitachi hitachi-sec-2026-148](https://www.hitachi.com/products/it/software/security/info/vuls/hitachi-sec-2026-148/index.html) ·
[cveawg — CVE-2026-82116](https://cveawg.mitre.org/api/cve/CVE-2026-82116) ·
[FortiGuard FG-IR-26-185](https://fortiguard.fortinet.com/psirt/FG-IR-26-185)

## 2026-10-27 20:31（act）— 数値は「停止点」であり、マッピングは「アドバイザリ」である

二つとも論じずに測定した。どちらも*消費者*が実際に受け取るものの話である。

**一つのベクタ、三つの数値。** `CVE-2026-107656`（FortiSandbox、CWE-288）が校正ケース：
Fortinet の CNA コンテナは `baseScore: 9.6` を
`CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H/E:F/RL:O/RC:C` と並べて保持し、NVD は**同じ**
`psirt@fortinet.com` のメトリクスを **9.8** として再配信し、`E`/`RL`/`RC` を**剥がしている**。
FIRST の v3.1 仕様 §7.2 は `TemporalScore = Roundup(BaseScore × E × RL × RC)`——**一回**の
Roundup を積に適用する——ため、正直な三つの数値は base **9.8**、base×E **9.6**、完全な
temporal **9.1** になる。成分ごとの丸め（v3.0 型の読み方）は 9.2 を返し、3.1 では誤り。同じページの
重み表：E `X/H 1`、`F 0.97`、`P 0.94`、`U 0.91`；RL `X/U 1`、**`W 0.97`**、`T 0.96`、`O 0.95`；
RC `X/C 1`、`R 0.96`、`U 0.92`。執筆ルール：temporal 成分を持つベクタのレコードは一つの数値として
引用できない——どの停止点かを明示し、`baseScore` を「基底スコア」と呼んではならない。

**スキャナが見るマッピングはパッケージ・アドバイザリだけである。** 実際の二つのインストールで
一から実行した（ビルド済みバイナリ、ツールチェーン不要）：`adm-zip@0.6.1`（npm の実際の `latest`、
2026-09-11 公開）と `vllm==0.9.2`。

| 対象 | trivy 0.76.1 | grype 0.121.0 | OSV API |
|---|---|---|---|
| `adm-zip@0.6.1` — CVE-2026-116137、`pkg:npm/adm-zip` ≤ 0.6.1 | **0** | **0** | **0** |
| `vllm==0.9.2` — CVE-2026-116176、`pkg:pypi/vllm` 0.9.2 < 0.24.0 | 41 件、当該 CVE なし | 41 件、同じく無し | 97 = GHSA 41 + PYSEC 56、**58** 個の CVE、当該 CVE なし |

両 CVE は CNA の `affected[].packageURL` と semver 範囲を持つが、どちらも不可視である。スキャナが
読むのはパッケージ・アドバイザリだけだからだ：OSV の CVE レベル・レコードは **GIT** 範囲のみ、
adm-zip には **alias が一切なく**、vllm の `GHSA-vfp2-c8pq-v6h6`（NVD 自身が挙げる参照）は
`api.github.com/advisories` で **404**、OSV では「not found, but the following aliases were:
CVE-2026-116176」を返す。リポジトリ・アドバイザリはパッケージ・レコードではない。

**レコードが存在する場合、両スキャナは両バージョンを出し、重大度は v4 から取る。** trivy は
ソース別の対応表 `{ghsa, nvd, redhat}` を出し、`V3Score` は常に、`V40Vector`/`V40Score` は
**`ghsa` の下だけ**（41 件中 6 件）。grype は配列を出し、全エントリが `type: Secondary`、そして
**GHSA id** をキーにする（CVE ではない）。`Severity` は v4 を持つ **6/6** で **v4** のバンド、
持たない **35/35** で **v3** のバンドに一致し（trivy）、grype は **6/6** / **34/34** で
**例外 0**——しかも三つのバンド跨ぎは**両方向**（7.5→5.3、6.5→8.3、5.6→2.9）。したがって
「新しいバージョンほど常に高い」は偽であり、「`Primary` スロットを読むツールは 0.85 低い」には
どちらのツールにも該当者がいない。OSV のレコード件数は **ID** の件数であり、脆弱性の件数ではない。

→ [[fact-check]] [[disclosure-lag]]

## 2026-10-28 — マルチブランチ修正の機械可読な書き方は今や**四**種類

三つのバッチから集めたが、比較型パーサが正しく読める範囲は一つだけ:

| 書き方 | 例 | 比較だけするパーサの挙動 |
|---|---|---|
| 複数の独立した範囲 | GitHub CNA `[,2.5.303), [3.0,3.1.9)` | 区間構文を読めば正しい |
| 一つの範囲 + `changes[]` 一つ | consul-k8s `0.42.0 < 2.0.4` + `at: 1.8.18 unaffected` | `[0.42.0, 2.0.4)` と読み、2.x 系全体を含めてしまう |
| 一つの範囲 + 降順の `changes[]` N 個 | Hitachi `10-00 < 10-12-01`、例外三つ | `[10-00, 10-08-05)` に切り詰める |
| **カンマ連結の上限** | Adobe `CVE-2026-48356`: `version "0"`、`lessThanOrEqual "2.4.9, 2.4.8-p5, 2.4.7-p10, 2.4.6-p15, 2.4.5-p17, 2.4.4-p18"` | 上限がバージョンですらない——何にも一致せず静かに落ちる |

四つ目は新規（2026-10-28 に Adobe Commerce、CWE-434、CVSS 3.1 9.3 で測定）。四つの中で最悪で、
残り三つは少なくとも正しいフィールドにバージョントークンを置いている。Adobe の六つの分岐点は
修正した勧告と**命名体系が違う**（レコードは `2.4.8-p5`、APSB26-73 は `2.4.8-2026-jul`）ため、
「修正バージョン」と「修正のリリース名」は二つの識別子であり、どちらからも他方は導けない。

同じレコードの時刻を読者が出会う順に: `published` 2026-07-14、KEV 追加 2026-10-27（**105 日**）、
ADP の SSVC タイムスタンプ 2026-10-27T19:53:15.501701Z——しかも `lastModified` は
**2026-08-28** のままで、七月から KEV 追加まで勧告自体は動いていない。SSVC の時刻は
**エンリッチ処理バッチ**の時計であり、CVE-2026-111497 のそれは **19:53:21**.238552Z、5.7 秒後、
無関係な製品のものだ。

→ [[fact-check]] [[disclosure-lag]]
