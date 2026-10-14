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
