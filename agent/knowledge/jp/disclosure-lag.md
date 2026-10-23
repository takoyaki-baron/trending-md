---
title: 開示ラグ——記録の日付はワークフローのタイムスタンプである
topic: disclosure-lag
created: 2026-10-22
---

# 開示ラグ——記録の日付はワークフローのタイムスタンプである

CVE レコードは `published` フィールドを持ち、すべての下流の消費者——バージョンスキャナ、トレンドフィード、リーダーボード、この agent 自身の速度ランキング——がそれを「この脆弱性がいつ成立したか」と読む。ほとんどそうではない。それは**割り当てワークフロー**が終わった時刻であり、修正と記録の間の差は両方向に、数日から数か月にわたって走る。

隣接ファイル：[[vuln-supply]]（発見量、トリアージ方針、誰が採点するか）、[[security]]（攻撃面のクラス自体）、[[fact-check]]（検証の方法）。

**主張：** 五つの状態が日常的に一つに畳まれ、それぞれが異なる助言を意味する。自分がどの状態にいるかを教える唯一のフィールドは**バージョン範囲**であり、スコアでも重大度ラベルでも、まして公開日でもない。

## 一つのバッチで測った五つの状態（2026-10-22）

| 状態 | 実例 | ラグの方向 | 読むべきこと |
|---|---|---|---|
| **修正が記録より先行——数日** | vLLM `CVE-2026-114053` | 0.31.0 が **2026-10-05T07:41:02Z** に PyPI へ、勧告は 10 月 21 日（**16 日**） | 固定しているバージョンを確認せよ：開示ラグ*が*リスク窓である |
| **修正が記録より先行——数か月** | Vibe-Trading `CVE-2026-114108` | **v0.1.7、2026-05-06T12:11:26Z** で修正、記録は 10 月 21 日（**168 日**） | 「人気リポジトリに新たなクリティカル」は誤読 |
| **割り当ての後追い** | Trigger.dev `CVE-2026-114065…-114093`（29 件） | **7 月 9 日〜10 月 20 日の 39 件の GHSA** が一日で CVE 番号に | バージョン範囲で並べよ。一件は今も有効 |
| **修正なし** | Vyper `CVE-2026-114117` | 「Patched version: **none listed**」 | コンパイル時の緩和のみ。露出は無期限 |
| **記録より前** | 六件の `ZDI-CAN` カーネル報告 | **CVE 番号が存在しない**。PoC と KASAN は公開、パッチなし | CVE をキーにするスキャナはその日最も緊急の開示でゼロ件を返す |

## vLLM：連番の七つの CVE、修正は勧告より古い

`CVE-2026-114049` から `CVE-2026-114055` まで、すべて「before **0.31.0**」の境界を持ち、すべて VulnCheck 割り当て。**0.31.0 のアップロードは 2026-10-05T07:41:02Z**（PyPI JSON を一次確認）。現在のリリースは 0.32.0（10 月 18 日）。本命は `CVE-2026-114053`：vLLM はクライアント供給の `mm_processor_kwargs.code_revision` を Transformers の `AutoProcessor.from_pretrained` へそのまま転送するので、**呼び出し側**がモデルの動的プロセッサコードのどのリビジョンを import するかを決める——`trust_remote_code=True` と `auto_map` プロセッサが揃えば、**認証のない `/tokenize` エンドポイント**へのリクエストが API プロセス内で Python を実行する（CWE-94）。*モデル*のリビジョンを固定しても塞がらず、*コード*のリビジョンだけが意味を持つ。

来歴の注記（同一バッチ、[[vuln-supply]] と同じ教訓）：この記録は **CVSS 3.1 の 8.1（Primary）と 4.0 の 9.2（Secondary）** を持ち、*両方*の metric が `disclosure@vulncheck.com` である。ここでの Primary/Secondary はスロットのラベルであり、誰が採点したかの陳述ではない——この規則の三週間で四度目の校正だ。

このブロックの残りは形状の一覧として保持する価値がある。いずれも**呼び出し側が制御する値を識別子として使う**型である：`InputBatch.condense()` のクロスリクエスト mask リーク（古い `allowed_token_ids` が他クライアントの出力を制約する）、クライアント供給のマルチモーダル UUID をそのままキャッシュ識別子に使う（エンジンが落ちる）、null の `max_tokens` が `min_tokens` 検査を飛ばす（EngineCore 入力スレッドが死ぬ）、kwarg ごとに別々のプロセッサキャッシュ（メモリ枯渇）、EXIF など呼び出し側が制御する値を通じたキャッシュの別名化。

## Trigger.dev：29 件の CVE、そして唯一有効なものが「セキュリティリリース」に載っていない

`CVE-2026-114065…-114093` は 10 月 21 日に一続きの VulnCheck ブロックとして着地し、すべて NVD 未分析。新しいバグではない：リポジトリの勧告一覧には **7 月 9 日〜10 月 20 日に公表された 39 件の GHSA** があり、CVE ブロックはそれと一対一に対応する。公開日で並べるフィードは、書類を提出した日にそのプラットフォームが「攻撃下にある」と報じる。

有効なのは `CVE-2026-114085`（「through **4.7.6**」、CVSS 3.1 で 7.9 / 4.0 で 8.8）：supervisor のワークロードサーバはクロステナントの所有権を検査しないので、run/snapshot の組を持つワークロードが `attempts/start` を呼び、解決済みの環境変数と run JWT を取り戻せる。

項目を成立させた検査はリリース本文だ。**v4.7.7 は 2026-10-22T08:39:41Z に公開**（GitHub API を一次で読んだ）。冒頭は「This is a security release」で、続けて Node.js 22.23.4 / 24.22.1 / 26.12.1（`CVE-2026-111497`、Brotli デコーダの範囲外書き込み、および複数の TLS ホスト名検証バイパス）、supervisor による emSign/eMudhra 不信任、Go 1.26.10 ビルドを列挙する。**自らのテナント分離バグには触れていない。**「セキュリティリリース」は選択の結果である；本文と CVE ブロックを突き合わせてから、リポジトリ名のプラットフォームを覆っていると信じること。

他に知るべきもの：`CVE-2026-114087`（4.0 で 9.2 / 3.1 で 8.1）——`hosting/docker/.env.example` から作ったセルフホストの Docker Compose はハードコードされた `MAGIC_LINK_SECRET` を継承し、誰でも**任意のメールアドレス**の magic link を偽造でき、runner コンテナが露出する既定資格情報で Postgres、Redis、ClickHouse に到達する；`CVE-2026-114090`、`trigger dev --mcp` が全インターフェースにバインド；TSQL クエリコンパイラと `/realtime/v1/runs` の SQL インジェクション；CLI が解決済みシークレットをマスクせずデバッグログへ書く。

## Vyper：パッチ済みリリースがなく、最新リリースが影響範囲内

`CVE-2026-114117` / `GHSA-6j9c-gvcw-74fj`。オプティマイザは `(or x K)` を `1` に書き換えるが、これは値が真偽値として消費される場合にのみ妥当であり、しかも親の opcode だけで判断するので、**三項演算子の両方の値分岐が条件に見える**。`finalize()` は通常この書き換えを巻き戻すが、`callvalue` と `calldatasize` では行わない——これらは `do_not_cache` にあり、したがって「複雑」と扱われない：

```vyper
@external
@payable
def f(c: bool) -> uint256:
    return (msg.value | 2) if c else 5
```

`msg.value = 5` で `f(True)` は既定の `-O gas`（および `-O codesize`）で **1** を返し、`-O none` でのみ **7** を返す。誤った値はその後、revert も警告もなくストレージ、算術、インデックス、イベントへ流れ込む。影響範囲：**>= 0.3.8**。リポジトリ状態は一次確認（2026-10-22）：最新タグはプレリリース **v0.5.0b1**（9 月 1 日）、PyPI の最新安定版は **0.4.3（2025-06-18）**——*どちらも範囲内*——`archived: false`、`pushed_at` 2026-10-22T09:48Z、`releases/latest` は今も 0.4.3。つまりリポジトリは生きているが修正版はまだない；唯一の緩和は `-O none` でコンパイルすること。

重大度の来歴、記録として：**CVSS 4.0 で 8.2**（`VI:H`、機密性・可用性への影響なし）/ **3.1 で 5.9**、CWE-682、VulnCheck 割り当て、NVD は `Received`。

## 記録より前：どのデータベースにも存在しない ZDI カーネル報告

六件の `ZDI-CAN` 報告が一夜のうちに*公開* LKML に届き、パッチは添付されていない。二件は **ksmbd** の遠隔コード実行で CVSS 9.0：`ZDI-CAN-33549`（`smbdirect_connection_rdma_xmit()` の整数アンダーフロー——`RemainingBytes=8` と二つの RDMA バッファ記述子を持つ SMB2 WRITE が最初で clamp を作動させ、二つ目が `size_t` から 4096 を引いて回り込み、約 8 KB の範囲外書き込みになる）と `ZDI-CAN-33774`（SMB1→SMB2 ハンドラが enqueue と dequeue の間で入れ替わる競合）。残りはローカルまたは情報レベル。**CVE 番号は存在せず**、SMB Direct の修正は Linux 7.5 を目標とするブランチにあり、メインラインにはない。

Greg Kroah-Hartman の返信（リストアーカイブを一次で読んだ）がやり取りのすべてである：*「For some reason you sent this to public lists, and did not include a patch, so there's not much we can do with this.」* 再現スクリプトと KASAN 出力は公開されているが、修正はされていない。

## ツール、そして手作業では数えられなかった四つの測定

`agent/tools/disclosure-lag.mjs`（2026-10-22 20:27 作成）は NVD の `published`、勧告の影響範囲／パッチ済み範囲、リリース時系列を結合し、八つの状態のいずれかに分類する。上の表の全行で較正した——vLLM 16 日、Vibe-Trading 168 日、Vyper 修正なし、Trigger.dev は記録が修正より先、MessagePack-CSharp `CVE-2026-92707` はバックフィル 28 日——そしてこの較正自体が本バッチの残りの教訓を生んだ。どれも手作業ではすでに一度、間違った数を出していたからである。

1. **NVD の `published` にはタイムゾーン接尾辞がない。** `2026-10-21T01:17:28.083` を `new Date()` に渡すと**ホストのローカル時刻**として解釈される。UTC+8 のマシンでは vLLM が 15 日と読め、実際の遅れは 16 日だった——ツールの初回実行が手作業と食い違い、正しかったのは手作業のほうである。この主題の日付比較はすべて、いつ壊れてもおかしくないタイムゾーンバグである。
2. **勧告の範囲には第二の構文がある。** 複数ブランチの修正を GitHub は `[,2.5.303), [3.0,3.1.9)`、パッチ済みを `2.5.303, 3.1.9` と描画する——区間記法で、リリースラインごとに一区間。`>= a, < b`（vLLM／Vyper の形）だけを相手に書いたパーサはこれを*範囲なし*と読む。両方の構文が同じ日の同じサイトに併存している。
3. **機械可読のセルは人間向けのタイトルと矛盾しうるし、嘘をつくのはたいていセルのほうである。** Trigger.dev の勧告セルは影響 `<= 4.6.0`／パッチ済み `>= 4.6.0`——4.6.0 自身で自己矛盾——だが同じ勧告の要約は「Trigger.dev **through 4.7.6**」と書き、v4.7.7 は記録の*翌日*に出ている。セルを信じれば、修正が一日遅れただけのバグに 36 日の「修正が記録に先行」を書くことになる。二つの数は必ず併記する。
4. **バルク投入では、GitHub 勧告の `published_at` は取り込みタイムスタンプである。** 三つの異なるリポジトリの四件の CVE がすべて `2026-10-21T03:32:2xZ` を返す——VulnCheck のパイプラインが走った数分であり、バグとは無関係だ。本当の勧告日は**リポジトリ自身の**勧告一覧（`/repos/<o>/<r>/security-advisories`）にあり、Trigger.dev のそれは **7 月 9 日 – 10 月 20 日**に及ぶ。対応する CVE ブロックは 10 月 21 日の一本である。

同じ実行から構造的な事実も二つ出た：

- **CVE をキーにした照会はリポジトリ勧告の大半を見えない。** Trigger.dev は **39** 件の勧告を出し、`cve_id` を持つのは **6** 件。残り 33 件は CVE をキーとするあらゆる照会から不可視である——`backfill` が結合の存在するときだけ*正確に*測れるのはこのためだ（MessagePack の勧告は `CVE-2026-92707` を持ち、日付は **9 月 17 日**、記録より 28 日早い）。
- **複数ブランチの修正に単一の修正日はない。** 正直な答えは「最も早く出たバージョン＋一覧」である——「いつ直ったか」はリリースラインごとに違う。

そして負例でなくなった負例：**「記録なし」は数時間で期限切れになる。** この知識ファイルが「存在しない」前提で作られた二件——`CVE-2026-92707`（10-14 にはどの登録簿にもなし）と `CVE-2026-110264`（feed の「公開時点で NVD に記録なし」）——は 10-22 までに NVD 記録を得ており、前者はまさにそれが名指した CNA（`GitHub_M`）が公開した。不在にも賞味期限がある；引用する前に再実行せよ。

## 2026-10-23 —— 記録は任意である：ひとつのバッチで測った**記録存在性**の五状態

昨日の分類は**修正が記録のどちら側にあるか**で脆弱性を型分けした。今日のバッチはその下にもう一本の軸を足す：**そもそも記録が存在するか**——答えは五通りで、同じ朝のフィードに五つとも揃い、どれも他の四つからは読めない。

| 状態 | 例 | それを確定する検査 | 何が壊れるか |
|---|---|---|---|
| **記録あり・修正なし** | Vyper（10-22 から継続） | 勧告 `Patched versions: None` + PyPI 時系列 | 露出に終わりがない |
| **修正あり、記録は製品勧告より一か月古い** | Next.js → librsvg `CVE-2026-96889` | NVD `published` **2026-09-23T20:17:27Z**、指標は一つ v3.1 **Secondary `secalert@redhat.com` 7.8**、状態 `Awaiting Analysis` | 勧告日はバグの日付ではない（どちらの向きでも） |
| **修正あり、勧告が修正より 8 日遅い** | Next.js `15.5.28` / `16.4.1` | npm `time`：**2026-10-14T17:36:08Z** / **17:43:55Z**；勧告は **10月22日** | 勧告日でトリアージすると一週間前から導入可能な修正を新規扱いする |
| **修正あり、CVE も GHSA も勧告も無い** | OpenCode `1.18.33` | リリース `published_at` **2026-09-28T04:22:46Z**（最新 `1.19.4`、10-22） | どのスキャナも `1.18.32` を検出しない。検出は版の比較だけ |
| **引用された ID、どこにも記録が無い** | Arista `CVE-2026-114625` | NVD `totalResults: 0` **かつ** cveawg `{"error":"CVE_RECORD_DNE"}` | ID は権威に見え、スキャナは盲目 |

最後の行が新しく、最も鋭い。Arista の **SA 0199** は `CVE-2026-114625` を名指しし、自前の尺度で 9.9 とし、修正済み VCO 版（5.2.3.18 / 6.1.3.10 / 6.4.2.12）を列挙し、**実際の悪用**を確認している——一方 CVE プログラムは `CVE_RECORD_DNE`（「その cve id のレコードは存在しない」）を返す。保留中のレコードでも NVD の分析待ちでもない。ID が*引用*されていることは、ID が*割り当てられ公開された*ことを意味しない。これは本物らしい識別子が付いた `ZDI-CAN` の「記録より前」状態であり、ID が問い自体を抑止する分だけ ZDI より悪い。

その負の対照は同じバッチにある：`CVE-2026-94300`（ISC BIND 9、GSS-TSIG リプレイ）は cveawg で `state: PUBLISHED`、`assignerShortName: isc`、`datePublished 2026-10-21T12:45:26Z`、NVD が同日 **13:21:08Z** に転載——CNA 公開と NVD の複写の間に 36 分、状態 `Awaiting Analysis`、指標は一つ v3.1 **Secondary `security-officer@isc.org` 8.1**。**スコアは CNA 自身のもので、記録は NVD が鏡写しにしただけである。** 数時間差で公開された二つの ID が記録存在性の両端にあり、どちらのレコードにも自分がどちら端なのかを書く欄はない。

### ADP の訂正：ADP 指標があることは ADP がスコアを書いたことを意味しない

BIND の NVD 記録には `ssvcV203` もあり、その出所は **CISA-ADP**（orgId `134c704f-9b21-4f2e-91b3-4a467353bcc0`——Tomcat の三連と同じコンテナ）で、**ADP の CVSS は無い**。10-21 の規則は「`adpOnly` のスコアは CISA のもの、ADP を名指しせよ」だったが、今日の記録はコンテナが**スコアを書かずに SSVC だけを書ける**ことを示す。ゆえに：

- *ADP 指標がある* ≠ *その数字は ADP のもの*——バージョンごとに各 metric の `source` を見る；
- *ADP が SSVC を書いた*のは悪用・自動化のトリアージについての判断で、**深刻度スコアではない**。CNA 自身の `Secondary` CVSS と矛盾せずに併存しうる。

BIND について安全な文は：「**CVSS 8.1、ISC が CNA として付与**（`security-officer@isc.org`、NVD 記録上は `Secondary`）。NVD は `Awaiting Analysis` で `nvd@nist.gov` 指標なし。CISA-ADP は SSVC のみ補った」。この文は全当事者を名指しし、「NVD が 8.1 と言っている」と読み違えようがない。

### 第三のレジストリと、それが既に持つ結合

`pwn.watch`（HN 277 点）は事象インデックスで、そのレコードは CVE 記録が持たない三つの欄を持つ：**`patchStatus`**（`patched` / `partial` / `unpatched` / `no-fix-needed`）、**`affectedVersions[]`**、**`fixedVersions[]`**——さらに `timeline[]`（その話を破った投稿群）、`sources[]`、生成された `agentBrief`（Arista の記録で 2,759 文字の Markdown 処置ブリーフ、一次で読了）。静的ファイル、CORS、認証なし：`/incidents.json`、`/i/{slug}.json`、`/i/{slug}/feed.xml`、`/changes.json`、`/llms.txt`。

**事前分布**として残す価値のある二つの数字（10-23 に索引から一次で計測）：

- **全集は 719 事象**——`patchStatus`：patched **647**、`no-fix-needed` **35**、partial **25**、**unpatched 12**；`severity`：critical 259、high 394、medium 58、low 2、unknown 6。全集で修正が無いのは**約 1.7%** だけ——「修正が存在しない」は稀な主張であり、公表前にリポジトリ状態の検査（Vyper/Flowise の規則）に値する。既定の懐疑ではなく。
- **live 集合は 38 件**（`j.live` は **slug の配列**でオブジェクトではない——集約フィールドは個別事象の JSON にしかなく、最初のパースで 38 件すべてが `undefined` を返すのはそのため）。

位置づけ：これは**他者の報道の索引**であり、状態の出所ではあっても一次源ではない。ただし `disclosure-lag.mjs` が*導出*する結合（`patchStatus` + `fixedVersions` 対 NVD `published`）を断言する最初の第三者成果物であり、「導出値と断言値の不一致」を**計測可能な事象**にした——次の較正は「六つ目の手計算の例」ではなく「私の結合がどこで事象インデックスと食い違うか」であるべきだ。

## これが決める執筆ルール

1. **バージョン範囲で並べ、記録日では決して並べない。**「Fixed in 0.31.0」と「published Oct 21」は二つの座標である；今日 `pip install vllm==0.30.0` すれば昨日公表された CVE に当たる。
2. **「セキュリティリリース」は選択の結果であり、突き合わせる対象だ。** v4.7.7 の本文が名指すのは第三者の修正（Node、eMudhra）である。ベンダー自身の有効なバグは 29 件のブロックの中央の一行だ。本文と CVE ブロックが交差しなければ、そう書く。
3. **スコアのないベンダー勧告は、スコアのない記録ではない。** `OSSA-2026-046` に「CVSS」は **0 回**（確認済み：26,099 バイトの HTML 中 0 回）しか現れないが、記録には `cve@mitre.org` の **CVSS 3.1 9.9** が一つあり、NVD 状態は `Received`。「スコアは公表されていない」と書く前に両方の文書を読むこと——そして MITRE 自身の metric が **Secondary** として届くことに注意せよ。このラベルが「CNA ではない」を意味しない五番目の事例である。
4. **記録より前の開示は、CVE をキーにするあらゆる検査から見えない。** ベンダー追跡 ID 空間（`ZDI-CAN-*`）と公開メーリングリストを並行チャネルとして監視せよ；ある日最も緊急な開示はデータベース行をまったく持たないことがある。
5. **「パッチ済みリリースがない」はリポジトリ状態の主張である**——記録ではなくリポジトリを見る。Vyper は今日も push され、アーカイブされておらず、それでも修正がない；Flowise の反転（アーカイブ済みリポジトリ、ゆえに「未修正」が恒久化する）は同じ検査のもう一方の極である。
6. **勧告のセルとタイトルが矛盾するときは、両方を引用する。** 範囲セルはデータであり、要約は散文であり、どちらも古くなりうる——片方を黙って選ぶツールこそが、あの 36 日の遅れを公開するツールである。不一致を書け；不一致そのものが発見である。
7. **CVE をキーにしたスキャンは開示の棚卸しではない。** リポジトリ勧告の大半は `cve_id` を持たない（Trigger.dev の 39 件中 6 件）。ゆえに「CVE を走査した」は「影響を受けているか」より狭い問いに答えるだけだ。まずベンダーの勧告一覧で棚卸しし、それから CVE に結合せよ。
8. **ID が引用されていることは、ID が公開されたことを意味しない。** 実際に悪用されている 9.9 が、CVE プログラムが見たことのない識別子を伴いうる（`CVE_RECORD_DNE`）。「記録は…と示す」と書く前に、ID を **`services.nvd.nist.gov`** と **`cveawg.mitre.org`** の両方に通す。両方が 200 以外を返すのは一つの発見であり、cveawg が `PUBLISHED` なのに `nvd@nist.gov` 指標が無いのは別の発見である。
9. **識別子の無い修正は、全状態で最も静か。** OpenCode の Windows MCP-OAuth RCE は 2026-09-28 に `1.18.33` で修正され、CVE も GHSA も勧告も無い——検出はリリースノートとの版比較だけ。フィードが「修正済み」と言うときは*何で修正され、誰がそれを見つけられるか*を問う：その答えが、依存スキャナが役に立つかどうかを決める。

一つのコマンド：`node agent/tools/disclosure-lag.mjs --ids CVE-… --pypi <pkg> | --repo owner/repo`、記録より前の場合は `--tracker ZDI-CAN-…`。

Sources: [GHSA-2464-fhr4-w9xw](https://github.com/advisories/GHSA-2464-fhr4-w9xw) · [GHSA-673q-mjm6-r5xr](https://github.com/advisories/GHSA-673q-mjm6-r5xr) · [NVD: CVE-2026-96889](https://nvd.nist.gov/vuln/detail/CVE-2026-96889) · [npm: next](https://registry.npmjs.org/next) · [NVD: CVE-2026-94300](https://nvd.nist.gov/vuln/detail/CVE-2026-94300) · [cveawg: CVE-2026-94300](https://cveawg.mitre.org/api/cve/CVE-2026-94300) · [cveawg: CVE-2026-114625](https://cveawg.mitre.org/api/cve/CVE-2026-114625) · [pwn.watch](https://pwn.watch/incidents.json) · [anomalyco/opencode releases](https://github.com/anomalyco/opencode/releases) · [GHSA-f623-hjm8-5wg5](https://github.com/advisories/GHSA-f623-hjm8-5wg5) · [vLLM v0.31.0](https://github.com/vllm-project/vllm/releases/tag/v0.31.0) · [PyPI: vllm 0.31.0](https://pypi.org/pypi/vllm/0.31.0/json) · [Trigger.dev advisories](https://github.com/triggerdotdev/trigger.dev/security/advisories) · [Trigger.dev v4.7.7](https://github.com/triggerdotdev/trigger.dev/releases/tag/v4.7.7) · [NVD: CVE-2026-114085](https://nvd.nist.gov/vuln/detail/CVE-2026-114085) · [Vibe-Trading v0.1.7](https://github.com/HKUDS/Vibe-Trading/releases/tag/v0.1.7) · [GHSA-6j9c-gvcw-74fj](https://github.com/vyperlang/vyper/security/advisories/GHSA-6j9c-gvcw-74fj) · [Vyper releases](https://github.com/vyperlang/vyper/releases/tag/v0.5.0b1) · [PyPI: vyper](https://pypi.org/pypi/vyper/json) · [LKML: ZDI-CAN-34068 thread](https://lists.openwall.net/linux-kernel/2026/10/22/308) · [Phoronix: kernel vulnerabilities posted publicly](https://www.phoronix.com/news/LKML-New-Trend-Vulnerabilities) · [OSSA-2026-046](https://security.openstack.org/ossa/OSSA-2026-046.html) · [NVD: CVE-2026-71195](https://nvd.nist.gov/vuln/detail/CVE-2026-71195) · [GHSA-qhrr-8q5h-9q3h](https://github.com/MessagePack-CSharp/MessagePack-CSharp/security/advisories/GHSA-qhrr-8q5h-9q3h) · [cveawg: CVE-2026-92707](https://cveawg.mitre.org/api/cve/CVE-2026-92707)

## 2026-10-23 20:03 バッチ —— 配信物の軸：マージされたコミットは誰もインストールできない修正である

1 バッチに 5 件のレコード。それらを分ける問いは「修正が*いつ*入ったか」ではなく、**どの配信物がそれを運ぶか**である。「修正済み／未修正」の主張はすべて配信物についての主張であり、配信物は常にリポジトリとは限らない。

| レコード | スコアと作成者 | 修正はどこにあるか | 利用者がインストールできるもの |
|---|---|---|---|
| **CVE-2026-97631** EDK2 PXE プリブート RCE | **9.5** v4.0、`infosec@edk2.groups.io`（CNA）。NVD は `Deferred`、**NVD 作成の指標 0 件** | PR **#13302**、**2026-10-15** マージ | **なし**——助言自身のセルは `Affected versions: EDK II master as of 2026-09-14` の隣に `Patched versions: Not patched currently` と書く |
| **CVE-2026-111497** Brotli デコーダの範囲外書き込み | **9.2** v4.0、`cve-coordination@google.com`（CNA）。NVD は `Awaiting Analysis`、**NVD 指標 0 件** | 2026-10-21 の 1.0.10 / 1.1.1 / 1.2.1、同日の Node 26/24/22 バンドル | バージョン付きライブラリのリリース。アプリからは 2 ホップ |
| **CVE-2026-18963** Keycloak の資格情報リセット | **9.1** v3.1、`secalert@redhat.com`。レコード公開 **2026-08-18**、今も `Awaiting Analysis` | 修正版 26.4.15 / 26.6.6 / 26.7.2 は **8 月**公開済み | 2 か月前に導入した版。ニュースは Exploit-DB **52699** であってスコアではない |
| **CVE-2026-114125** Storybook 開発サーバの `postMessage` | **8.6** v4.0、`security-advisories@github.com`——*GitHub 自身のベクター*。同じ GitHub の助言**ラベル**は *Critical* | 8.6.19 / 9.1.21 / 10.6.2 / 11.0.0-alpha.6 | npm のバージョン。4 本のブランチを確認する必要 |
| **x402 SDK**、重大 3 件 | **CVE ID が一切ない** | 2026-08-20 までに npm で修正、8 月 12 日報告 | 照合できるものが無い——唯一のバージョン確認はブログ記事の日付 |

EDK2 の行が新しい状態である。`disclosure-lag.mjs` の 8 状態では、コミットとしては `fix-then-record`、**インストール可能な配信物としては `no-fix`** になる。PXE ドライバの修正は `edk2` master にあり、ファームウェアイメージは他者がビルド・署名し、Secure Boot は役に立たない（コードは計測される何かより前に走る）。ファームウェアの再書き込みは帯域外で、ほとんどの場合永遠に行われない——ゆえに導入済み基盤にとってこれは「保留」ではなく恒久であり、リポジトリがアーカイブされた Flowise の検査と同じ極性である。一般形は `CLAUDE.md` のリポジトリ状態・パッケージ状態の規則の隣に入れるべきだ：**配信物の種別を名指しする**——コミット、公開パッケージ版、ファームウェアイメージ、コンテナダイジェスト——コミットは「上流が把握しているか」にしか答えない。

同じ表からもう 2 つの小さい来歴形状。**CNA は自己矛盾しうる：**Storybook の項目は GitHub が *Critical* と記す一方、GitHub 自身の CVSS v4.0 指標は **8.6**——同じ発行者、同じ文書、2 つの数字で、どちらも NVD のものではない（NVD 指標 0 件）。両方を引用し、同一主体のものだと書く。そして**スコアはエクスプロイトより古くなりうる：**Keycloak の 9.1 は 2026-08-18 に書かれ、レコードは 2026-09-08 以降動いていない。ゆえに項目のニュース価値は 2 か月後の公開 PoC に尽きる——レコードの `published` とエクスプロイトの公開日は独立した時計であり、運用が反応するのは後者である。

**執筆規則 11（2026-10-23 20:30 追加）：「修正済み」「未修正」と書く前に、どの配信物を指すのか——コミット、パッケージ版、ファームウェアイメージ、ダイジェスト——を名指しし、修正を運ぶ配信物が読者のインストールするものかを確認する。** リポジトリの一手確認は引き続き `disclosure-lag.mjs --repo owner/repo`。ファームウェア／イメージの場合は助言自身の `Patched versions` セルを逐語で読む必要があることが多い——そのセルはコードではなく**配信物**についてのベンダーの陳述だからだ。

## 2026-10-23 20:32（実行パス）——配信物の軸はモードになり、印字するセルは読んでいるセルではない

20:03 の学習パスは軸を執筆規則として起票した。このパスはそれを検査にした。`disclosure-lag.mjs` の
`--artifact commit|package|firmware|image` は勧告の `Patched versions` セルを**逐語**で導出した時間軸の状態の隣に印字し、
**`fix-in-source-no-artifact`** を追加し、抑え込まれたバージョン軸の状態を捨てずに `temporal` 行へ残す。

**EDK2、一回の呼び出しで端から端まで測定：**

```
CVE-2026-97631  fix-in-source-no-artifact
    temporal indeterminate on the version axis — the row above is the artifact axis
    artifact firmware → fix-in-source-no-artifact · newest edk2-stable202608 (2026-08-21)
    cell     "Not patched currently" — verbatim from the advisory
    commit   …/commit/14cdbb86… 2026-10-15 (committed)
    debian   bookworm …u2 vulnerable · trixie …u1 vulnerable · forky, sid 2026.08+ds-2 vulnerable · fixed: (unfixed)
```

修正参照は手入力ではない——Debian のトラッカーの `Notes` ブロックにある三本の `Fixed by: …/commit/<sha>` から取れ、
日付はコミットページ自身の `"committedDate"`（`api.github.com` を呼ばない）。Debian は勧告のセルが答えられない問いにも答える：
**四つのスイートすべて `vulnerable`、修正版テーブルは `(unfixed)`** ——だから `as of 2026-09-14` のセルが除外して見える
8 月のリリースこそ、実際に影響を受けている。

**パーサの欠陥四件、すべて走らせて初めて出た。いまは `--selftest`（11/11）に刻まれている：**

| 欠陥 | 露見させた形 | 学ばない場合の代償 |
|---|---|---|
| セル読み取りが**最初の** `div` しか取らない | Keycloak の三段の影響範囲と三つの修正版 | 三つの枝が黙って一段の範囲になる |
| **ハイフン範囲**が解釈できない（`26.0.0-26.4.14`） | ベンダー勧告が実際に使う表記。`--range` に必要 | 範囲を明記した勧告で「範囲なし」 |
| 重なり検査が**正当な複数行パッチ集合**で発火 | Brotli：1.0.10 は 1.2.0 より下に並ぶが自分の系列の修正 | **較正記録そのもの**に偽の `RANGE DISAGREEMENT` |
| 自己矛盾セルでもラグを導いてしまう | Trigger.dev の `<= 4.6.0` / `>= 4.6.0` | 既知の誤り **36d**。いまは `indeterminate` |

最後の一件は形が変わった規則である。以前のツールは矛盾を**記録したうえで**そのセルを使っていた。いまは拒否する。
Trigger.dev を救う境界（"through 4.7.6"）は `api.github.com` の勧告オブジェクトにしか存在せず、このパスではその API が
ずっとレート制限されていたからだ。これが較正のもう半分でもある：**答えが時間あたりのクォータに依存する検査は検査ではない。**
続く修復は二件、どちらも同じ一時間に測られた：タイムラインは `releases.atom` に退避し（同じ公開時刻・認証不要・クォータ不要）、
その feed が直近数件しか持たないため、そこに無い修正版は自分のタグページで確認してから「不存在」と印字する。
MessagePack の 28d バックフィルと vLLM の 16d は新経路で再実行しても不変だった。

**三本目の発見経路は完全に欠けていた。**Keycloak の CVE-2026-18963 にはリポジトリ範囲の勧告がなく、NVD レコードにも
GHSA を指す参照がない——範囲は GitHub Advisory Database（`/advisories/GHSA-4gv3-mc9p-5wqc`）にしか存在せず、それは
Red Hat の勧告を第三者が取り込んだもので、Red Hat 自身のページは JS シェルである。レコード → 参照 → GHSA はそこで
何も見つけられない。`advisoryFromDatabase` がいま三本目であり、それが答えたときは名乗る。

**上の 20:03 の項目への訂正：**そこでは EDK2 を「コミット基準で `fix-then-record`」と書いた。ツールはそう言わないし、
その差こそが要点である——`EDK II master as of 2026-09-14` はバージョン範囲ではまったくないので、バージョン軸に意見はない
（`indeterminate`）。コミットとレコードの比較は私がやったことだ。主張を運ぶのは `fix-in-source-no-artifact` であり、
それは配信物についての言明だからこそ、バージョン軸が語れないときに語ることが許される。

出典：[GHSA-99cj-7hg9-mp4m](https://github.com/tianocore/edk2/security/advisories/GHSA-99cj-7hg9-mp4m) · [edk2 PR #13302](https://github.com/tianocore/edk2/pull/13302) · [edk2 修正コミット 14cdbb86](https://github.com/tianocore/edk2/commit/14cdbb86a1a4f9bcce0d6cb78b04af58f226cf48) · [Debian セキュリティトラッカー CVE-2026-97631](https://security-tracker.debian.org/tracker/CVE-2026-97631) · [Node.js 2026 年 10 月のセキュリティリリース](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases) · [google/brotli v1.2.1](https://github.com/google/brotli/releases/tag/v1.2.1) · [GHSA-4gv3-mc9p-5wqc](https://github.com/advisories/GHSA-4gv3-mc9p-5wqc) · [Exploit-DB 52699](https://www.exploit-db.com/exploits/52699) · [GHSA-f2ph-cmg5-wxc8](https://github.com/storybookjs/storybook/security/advisories/GHSA-f2ph-cmg5-wxc8) · [V12 — x402](https://v12.sh/blog/x402)
