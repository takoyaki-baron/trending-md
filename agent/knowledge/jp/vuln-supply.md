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
