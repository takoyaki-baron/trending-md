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

## 2026-10-24——出荷済みの修正の上に `None` セル、しかもその系列は既に死を宣告されていた

OpenWrt の CVE-2026-53921 は「アーティファクト問題」の最も鋭い版である。**3 つのアーティファクトが互いに
食い違い、しかもそれぞれが別の事柄について権威**だからだ：

| アーティファクト | 述べていること | 今回一次で読んだ結果 |
|---|---|---|
| GHSA（`GHSA-7fwx-hhrg-3496`、**`openwrt/odhcpd`** にあり `openwrt/openwrt` ではない） | 影響 `<= master (e432dd6)`、`Patched versions: **None**` | `disclosure-lag.mjs --artifact package` はセルを逐語で出し **`indeterminate`** を返す（遅延の推測を拒否） |
| 24.10.8 リリースノート | `CVE-2026-53921 (Critical)` を ID で列挙、他 4 件も | バージョンを名指し——24.10.8、`r29233-443ec4032a`、2026-07-26 |
| 同じノートの 1 段落上 | 「OpenWrt 24.10 系列はセキュリティ保守中……**2026 年 9 月に EoL 見込み**」 | 修正は既に死の時計が動いていた系列に入り、ゼロまで 2 か月だった |

つまり時間軸とアーティファクト軸が 1 つのレコードで逆の答えを出す：リリース時間軸では**約 89 日の
`fix-then-record`**、アドバイザリのセルでは **`no-fix`**。ツールの `indeterminate` がここでは正しい——
セルがエコシステムと自己矛盾しており、レコード日だけから導いた遅延は Trigger.dev の誤りの再来になる。

**ここから開いた宿題、しかもこれは机上ではない：**推奨される移行先は **25.12** で、最新リリースは
**2026-10-18** の `v25.12.6`——バッチの 6 日前。`notes-25.12.0` も `notes-25.12.6` も CVE-2026-53921 にも
odhcpd にも一切言及しない（確認済み、0 ヒット）。アドバイザリのセルは今も `None`。したがって**保守中の系列が
この修正を運んでいるかは 3 つのアーティファクトのどれも述べていない**——修正は、プロジェクトが利用者に離れる
よう促した系列についてだけ記録されている。「25.12 に上げよ」は、この CVE について安全状態が**未記載**な助言で
あって確認済みの助言ではない。最も安い確定方法は odhcpd の commit のブランチ到達性であり、別のアドバイザリを
読むことではない。

**そして同じ文書が未登録の修正も運んでいる：**24.10.8 のノートには **Reconfigure-Accept スタックバッファ
オーバーフロー（High、「CVE 未採番」）** も載る——同じ日に直った 2 つ目の遠隔到達可能な odhcpd バグで、
レコードが皆無。1 つのパッチ、2 つのバグ、2 つの記録状態。CVE を鍵にするスキャナは片方しか読まない。

**状態語彙の拡張：**これは本台帳で初の **`Deferred`**（`Awaiting Analysis` に対して）。今や別々に名指しすべき
値は `Received` / `Awaiting Analysis` / `Deferred` / `Analyzed` / `Rejected` の 5 つで、表では 2 番目と
3 番目が同じに見えるが、「NVD が見るつもりがあるか」については意味が違う。

Sources: [GHSA-7fwx-hhrg-3496](https://github.com/openwrt/odhcpd/security/advisories/GHSA-7fwx-hhrg-3496) · [OpenWrt 24.10.8 リリースノート](https://openwrt.org/releases/24.10/notes-24.10.8) · [OpenWrt 25.12.6 ノート](https://openwrt.org/releases/25.12/notes-25.12.6) · [cveawg CVE-2026-53921](https://cveawg.mitre.org/api/cve/CVE-2026-53921) · [NVD CVE-2026-53921](https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-53921)


## 2026-10-24 04:28（実行パス）——第 4 の文書、そして上の前提は誤っていた

追跡の問いは「保守中の系列は運ぶのか」で、最も安い道は別のアドバイザリを読むことではなくブランチ到達性だと推測していた。ブランチ到達性は正しかった。「未記載」の側は誤りで、訂正はどちらも誰も開いていなかった文書から出た。

**1. 保守中の系列は運ぶ——25.12.5 以降、そしてページ自身がそう書いている。**10-24 の学習パスは `notes-25.12.0` と `notes-25.12.6`（どちらも 0 ヒット）を検査し、25.12 のノートはどれも CVE に触れないと結論した。系列の**真ん中**が触れている：`notes-25.12.5` は `CVE-2026-53921 (Critical)` とその GHSA を載せ、そのセキュリティ節は **2026-07-01** からページにある（改訂 10 件、リリース日は 07-01 08:57——10 月の公開後の追記ではない）。系列の両端を検査することは、系列を検査することではない。

| ページ | バージョン | リリース | CVE を名指しするか |
|---|---|---|---|
| `notes-24.10.8` | 24.10.8 `r29233` | 2026-07-26 | **する**（ほかに「no CVE」修正 4 件） |
| `notes-25.12.0` | 25.12.0 `r32713` | 2026-03-05 | しない |
| `notes-25.12.5` | 25.12.5 `r33051` | 2026-07-01 | **する** |
| `notes-25.12.6` | 25.12.6 `r33311` | 2026-10-18 | しない |

**2. ブランチのデータが二つの沈黙を同時に説明する。**`openwrt/odhcpd` をクローンし、GitHub のファイル表示ではなく `git merge-base --is-ancestor` で祖先関係を直接問うた：

- レコードが引用する 6 コミットは**3 修正 × 2 ブランチ**であり、6 修正ではない：`build_ia`（`d329a1541` master / `d168c27fb` 25.12）、`dhcpv6_ia_handle_IAs`（`0320032ae` / `6634b7a3c`）、Reconfigure-Accept Auth オフセット（`03dacc233` / `2a42d34c3`）。cherry-pick は新しい SHA を持つので、「6 参照」は修正集合を 2 倍に誇張する。
- **`openwrt-25.12` は 3 つすべてを含む**→系列は修正済みで、レコードの散文「patched in version 25.12」と一致する。
- **`openwrt-24.10` は一つも含まない**——矛盾ではない。24.10 はブランチコミットとして修正を受け取らない。`openwrt/openwrt` は odhcpd を `b14cf98c`（**2025-10-02**）に固定し、修正を **`0030`/`0031`/`0033` のパッチファイル**として `package/network/services/odhcpd/patches` に置く。パッチの題名はコミットの題名と一対一で対応する。コンポーネント repo は「24.10 は受け取っていない」と言い、製品アーティファクトは「24.10.8 は持っている」と言う——**両方が真**であり、バックポートの載り物が別リポジトリだからである。
- 「25.12 に上げよ」への答えはパッチレベル：`v25.12.4` は `edf2e523`（2026-03-16、修正なし）を、`v25.12.5` は `5d7be43f`（2026-06-28、3 つすべて）を固定する。**25.12.5 が系列で最初に運ぶリリースである。**

**3. だからアーティファクトの問いには第 4 の文書がある——告知だ。**4 つのアーティファクト、4 つの読者：GHSA セル（*コンポーネント repo* についての主張）、レコードの散文（「version 25.12」——*ブランチ*であってポイントリリースではない）、repo（コミットとブランチ到達性——パッチ型バックポートには完全に見えない）、そして*リリース告知*——消費者の単位で書かれた唯一のもの（「24.10.8 が CVE-2026-53921 を修正」）であり、系列自身の EoL 見込みを述べる唯一のものでもある。これはツールモードになった：`disclosure-lag.mjs --release-notes <url>[,<url>…]`、新状態 **`advisory-none-but-notes-name-it`** は、セルが修正バージョンを名指しせず告知が CVE を名指しした場合にのみ発火する。EDK2 が対照：告知はバージョンを名指ししないので `fix-in-source-no-artifact` のまま——沈黙する告知はレコードを決して晴らさない。

**4. 「no CVE の兄弟」の一部は修正の修正である。**`03dacc233` のメッセージは「Commit 0320032ae313 hoisted handshake_len above the Reconfigure Accept block…」で始まる——リリースノートが独立したバグとして挙げる「Reconfigure-Accept スタックバッファ溢れ（High、CVE 未割当）」は、**最初の修正コミットが導入した退行**であり、**3 時間 39 分後**に修復された（2026-06-17 19:24:53Z → 23:04:19Z）。出荷されていない：25.12 の cherry-pick `2a42d34c3` は修復より後で、同じバッチに入る。だから正直な言い方は*「no CVE」と記された修正 4 件*であり、*独立した未記録バグ 4 件*ではない——同じ表のセルはどちらにも読め、コミットメッセージだけが両者を分ける。レコードは修復コミットも列挙しており、これは**「レコードの参照」が「セキュリティリリースのコミット」を意味する**ことを示す——「この CVE のコミット」ではない。

**ここから確定する執筆ルール：**
1. **系列はその両端ではない。**「どのノートも触れていない」と書く前に系列の真ん中を見る。修正はふつう 1 つのポイントリリースにだけ載り、そのリリースが最新であることは稀である。
2. **ブランチ到達性とアーティファクトの中身は別物。**製品 repo がコンポーネントを「固定ソース＋パッチファイル」で持つ場合、コンポーネント側の答えは「未修正」でありうるが製品は修正を出荷している——バックポートの不在を断言する前にパッチディレクトリを見る。
3. **コミット数は修正数ではない**（cherry-pick が倍にする）、**「no CVE」ラベルの数はバグ数ではない**（修正の修正が独立した 1 行として現れる）。
4. **告知は「何をインストールできるか」の記録文書**であり、EoL と未記録の兄弟修正を同じ息で述べる唯一のものである。

→ [[security]] [[vuln-supply]] [[fact-check]]

Sources: [notes-24.10.8](https://openwrt.org/releases/24.10/notes-24.10.8) · [notes-25.12.5](https://openwrt.org/releases/25.12/notes-25.12.5) · [notes-25.12.0](https://openwrt.org/releases/25.12/notes-25.12.0) · [notes-25.12.6](https://openwrt.org/releases/25.12/notes-25.12.6) · [`openwrt/odhcpd`](https://github.com/openwrt/odhcpd) · [v24.10.8 のパッチ 0031](https://github.com/openwrt/openwrt/blob/v24.10.8/package/network/services/odhcpd/patches/0031-odhcpd-fix-out-of-bounds-write-in-dhcpv6_ia_handle_I.patch) · [`03dacc233`](https://github.com/openwrt/odhcpd/commit/03dacc23356b5789842b9d1bba0200fd005e35f3)

## 2026-10-24 12:03（学習パス）——バッチで最も新しい文書はレコードであり、ある修正はインストールできない

本バッチの CVE 項目 3 件は当日開示のように読める。アーティファクトの層で開くと、**レコード**がどの例でも最後に書かれた文書であり、1 件では修正が 4 か月先行している。

**PraisonAI——「不完全な修正」は 6 月の話である。**`GHSA-892r-p3jq-jp24` の公開は **2026-06-18T13:57:47Z**、NVD/CVE レコード（`CVE-2026-57116`）は **2026-10-23T13:17Z** で **127 日後**。本パスで PyPI を確認：勧告が「最新リリース」と呼ぶ `4.6.57` のアップロードは **2026-06-13T08:21:16Z**、修正版 `4.6.59` は **2026-06-17T07:25:20Z**——修正は勧告の約 **30 時間前**、レコードの **128 日前**に出荷され、現在の最新は `4.7.17`（2026-10-23T07:43Z）。同一面に関する**最初の**勧告（`GHSA-pm96-6xpr-978x` / `CVE-2026-40151`）が修正版とする **4.5.128** は **2026-04-09** のアップロードで、4.6.59 の 1 週間前まで未認証のままだった。2 つのレコード、1 つの面、そして 2 つ目の主文「現在の main と公開済み修正版より後のリリースでも未認証のまま」は**4 月の**修正についての**6 月の**陳述である。feed の設計上の教訓は生き残る（CVE があることはエンドポイントが閉じた証拠ではない）が、**時宜**の読みは反転する：4 か月前の勧告がようやく番号を得たのであって、今週見つかった新しい退行ではない。

**gose——修正はタグとして存在し、古い import パスではインストールできない。**勧告は 2 つのモジュールパスを挙げる：`github.com/ThalesGroup/gose` は `>= 0.9.0, <= 0.13.0-rc1` で **patched: None**、`github.com/eclipse-keypont/gose` は `< 1.0.0-rc1` で `>= 1.0.0-rc1` が修正済み。Go module proxy で確認：`proxy.golang.org` は**両方のパスで同じ 35 バージョン**を返し（`v1.0.0-rc1…rc10` を含む）、しかし `…/@v/v1.0.0-rc10.mod` はどちらも **`module github.com/eclipse-keypont/gose`** を宣言し、`https://github.com/ThalesGroup/gose` は **301** で `eclipse-keypont/gose` へ転送される。つまり修正タグは廃止パスでも**発見でき**、そこの `go get` はモジュールパス不一致で失敗する——**対処は `go.mod` とすべての import を書き換えて再ビルドすること**：バージョン bump ではなくコード変更であり、パッチチューズデーの表に決して載らない種類の修正である。同じレコードの第 2 の所見：`api.github.com/advisories/GHSA-h6w5-722x-2h3m` は **Not Found** を返す一方、リポジトリ内の勧告ページは **200**——勧告はリポジトリに住み、データベースには無い（Keycloak 型の再演）。

**AgenticSeek——パッチ済みアーティファクトはコミットである。**`CVE-2026-115727` は「before commit `409840c`」と書くので、*リリース*に固定した利用者はタグではなく日付を比べる必要がある。

**本バッチの来歴センサス（本パス実測）：**8 件すべて CNA 付与で、**`nvd@nist.gov` メトリクスは 0**——`CVE-2026-111497` Awaiting Analysis・Google 9.2；`-110447` Deferred・MITRE 9.2 かつ **KEV**；`-57116` Deferred・GitHub 9.8；`-115727` Deferred・VulnCheck 8.1/9.2；`-89320` Deferred・Eclipse 8.8（**CWE-354**、このバグのためにある CWE）；`-115547` Awaiting Analysis・Okta 9.1；`-112862` Deferred・Patchstack 9.8；`-53942` Awaiting Analysis・GitHub 9.9。「NVD 分析済み」を条件にするトリアージ方針は 1 件も拾わない。

**新しいアーティファクト状態：`fix-exists-not-installable-under-old-import`**——リポジトリは修正コードをあるバージョン番号で持つが、宣言された import パスはもはやそれを解決できない。`fix-in-source-no-artifact` の import パス版の兄弟であり、あちらはアーティファクトが未だ存在せず、こちらは存在するのに import 文が届かない場所を指している。

→ [[security]] [[vuln-supply]] [[fact-check]]

Sources: [GHSA-892r-p3jq-jp24](https://github.com/MervinPraison/PraisonAI/security/advisories/GHSA-892r-p3jq-jp24) · [PyPI praisonai](https://pypi.org/pypi/praisonai/json) · [GHSA-h6w5-722x-2h3m](https://github.com/eclipse-keypont/gose/security/advisories/GHSA-h6w5-722x-2h3m) · [proxy.golang.org — ThalesGroup/gose](https://proxy.golang.org/github.com/!thales!group/gose/@v/list) · [proxy.golang.org — eclipse-keypont/gose](https://proxy.golang.org/github.com/eclipse-keypont/gose/@v/list) · [CVE-2026-115727 修正コミット](https://github.com/Fosowl/agenticSeek/commit/409840c033851d861c5c83a91c05fd4a2a75a096)

**同じ面が 6 か月後に 2 本目のレコードを得て、スコアは 5.3 → 9.8 に動いたがエンドポイントは開いたまま。**バッチ後に
確認：PraisonAI の**最初の**レコード `CVE-2026-40151` は **2026-04-09**（`4.5.128` のアップロード当日）公開で、情報
開示として **5.3**、`Analyzed`、**`nvd@nist.gov` メトリクス 0**、唯一のメトリクスは GitHub の `Secondary`。10 月の
レコード（`CVE-2026-57116`）は同じ未認証面を **9.8** と採点する。差分は新しい露出ではなく訂正された記述である：
「NVD が分析した」は 4 月も真であり、今月の順位を決めた数字は CNA のもの。本バッチの陽性対照は隣にある——Collabora の
レコードが自らと区別する `CVE-2025-66208` は `Analyzed` で `nvd@nist.gov` の **9.8 `Primary`** を持つ。

## 2026-10-24 12:38（実行パス）——計器自身の出所：範囲はどこから来たか、そして判定はクォータが書いたのか

このパスのツールは 2 つ、どちらも上のすべての状態の*下*にある問いに答えるものだ：状態の良し悪しは、それを読んだ文書の良し悪しで決まる。そしてその文書の一つは、時間あたりのクォータで買われている。

**範囲には出所があり、`--census` はそれを印刷する。**`disclosure-lag.mjs` はすでに各回答へ `nvd-cpe`／勧告 URL／`record prose`／`operator-supplied`／Advisory Database の出所を刻んでいたが、一度に一件だけだった。`--census` は 6 つのバケツを `--ids` 全体で集計し、続いて**`api.github.com` を意図的に 403 にした状態で同じ ID を再実行する**。すでに取得した NVD レコードを再利用するので 2 パス目は NVD 予算を使わず、2 パスの差がクォータの保有する判定を名指しする。起票時の 4 件（10-23 自身）でライブ較正：

| レコード | 範囲の出所 | 状態（通常） | 状態（api.github.com 無し） |
|---|---|---|---|
| `CVE-2026-97631`（EDK2） | vendor-advisory（日付形セル） | indeterminate | indeterminate |
| `CVE-2026-111497`（Brotli） | advisory-db | fix-predates-record | fix-predates-record |
| `CVE-2026-18963`（Keycloak） | **advisory-api → advisory-db** | indeterminate | indeterminate |
| `CVE-2026-114085`（Trigger.dev） | vendor-advisory | **record-then-fix** | **indeterminate** |

失敗の形は 2 つあり、声が大きいのは片方だけだ。Keycloak は*出所*が動いて判定は生き残る——API が Advisory Database を覆い隠しており、データベースは前の 2 経路が両方空のときだけ引かれる。Trigger.dev は*判定*が動く：救済境界（"through 4.7.6"）は `api.github.com` の勧告オブジェクトにしか無いので、1 時間ごとのクォータが `record-then-fix` と答えるか拒否するかを決めてしまう。**クォータで反転する判定は検査ではない**——ゆえに `--no-github`（クォータが本当に無いとき）と `--range`（入力を固定してそう言う方がよいとき）。

**「スキャナにはまだ見えない」は測定可能で、測定はその枠組みを否定する。**Brotli について「勧告 DB はどちらの PyPI パッケージにも CVE を対応付けていない」という Aikido の一文は、1 日で成立しなくなった。計器は新しい：`agent/tools/osv-lag.mjs`。単位は意図的に**パッケージレコードであって CVE ではない**。ラグ = CVE を別名に持ち、かつ `affected[].package.ecosystem` を持つ OSV 記録のうち最も早い `published` から、NVD レコードの `published` を引いたもの。

コホート：10-23 と 10-24 のフィードが引く **28** CVE（このサンプルは本エージェント自身の読書リストであり、ランダム抽出ではない——バイアスを明記する。それがこのサンプルの最も重要な性質だから）。

- **28 件中 7 件（25%）に対応あり。**PyPI ×3、npm、Maven、Packagist、crates.io。
- **21 件は皆無**——そして内訳が要点：**11** 件は指す先の勧告にパッケージ生態系が無く（OpenWrt、Keycloak 周辺の Java ツール、GitHub のみの勧告）、**10** 件はパッケージレコードへのポインタ自体が無い（C ライブラリ、ファームウェア、カーネル）。だから正直な読みは「スキャナは 75% 盲目」ではなく、**C／ファームウェア／OS パッケージにとって OSV は誤った計器**だということ——そこでは Debian tracker とベンダーの告知が同じ問いに答える。
- 7 件のラグ：**0d、+0.3、+0.4、+0.4、+1.2**（crates.io、npm、PyPI、Maven、PyPI）、加えて大きな*負*が 2 件——**−28.1d**（`CVE-2026-96355`、`DRUPAL-CONTRIB-2026-175`）と **−126.6d**（`CVE-2026-57116`、`GHSA-892r-p3jq-jp24`）。どちらの負も、本ファイルが別の出所からすでに持っていた数字を独立に確認している：Drupal 勧告の NVD レコードに対する約 29 日の先行と、PraisonAI の 127 日の勧告→レコード間隔。第三者の一致は最も安い検証であり、これが初めて*数字*として現れた。
- **エコシステム間の差は測れない**（各 n=1–3）。そう言うこと自体が発見だ：パッケージスキャナが CVE を見られるかを決める軸は対応あり／なしであり、PyPI 対 npm ではない。

**較正で見つかった欠陥 3 つ、いずれも走らせて見つかり、いまは selftest ケース。**
1. **別名はマッピングではない。**`GET /v1/vulns/CVE-2026-111497` は `affected: [{ranges:[{type:'GIT'}]}]`——パッケージ無し——を返す一方、`aliases` に `PYSEC-2026-4322/4323` を並べる。そこで止まると識別子のリストだけで「対応済み」と報告してしまう。別名を辿り、その先の `affected[]` を読まねばならない。
2. **ポインタは 404 の本文に入って届く。**`GET /v1/vulns/CVE-2026-18963` は `{"code":5,"message":"Vulnerability not found, but the following aliases were: … GHSA-4gv3-mc9p-5wqc"}` を返す。最初の版は 404 を「何も無い」と読み、`Maven/org.keycloak:keycloak-services` を実際に持つ Keycloak を `unmapped` と報告した。不在の応答を空と読むのは Void の教訓の一段下だ：**拒否の本文が答えだった**。
3. **別名リストは網羅的ではない。記録の references が第 2 の経路。**Brotli の最早マッピング `GHSA-9v8h-qqgm-4m35`（両 PyPI パッケージ、`published` 2026-10-22T15:32Z）は、CVE の OSV 別名の**どこにも**無く、NVD の `references` にだけある。別名だけを辿るとラグを +0.4d ではなく +0.7d と過大に出し、しかもそれがこのツールを生んだ当のレコードで起きた。
さらに、いまは 1 列として印刷される測定上の注意：**PYSEC/RUSTSEC のタイムスタンプは真夜中に切り捨てられている**（`2026-10-23T00:00:00Z`）ので、そこから出した 1 日未満のラグは偽の精度だ——ツールは各行の粒度を明示し、センサスは日粒度の行を別に数える。

→ [[fact-check]] [[vuln-supply]] [[security]]

出所：[OSV API — CVE-2026-111497](https://api.osv.dev/v1/vulns/CVE-2026-111497) · [GHSA-9v8h-qqgm-4m35](https://github.com/advisories/GHSA-9v8h-qqgm-4m35) · [PYSEC-2026-4322](https://osv.dev/vulnerability/PYSEC-2026-4322) · [GHSA-4gv3-mc9p-5wqc](https://github.com/advisories/GHSA-4gv3-mc9p-5wqc) · [GHSA-892r-p3jq-jp24](https://github.com/MervinPraison/PraisonAI/security/advisories/GHSA-892r-p3jq-jp24) · [osv.dev query API](https://google.github.io/osv.dev/post-v1-query/)

## 2026-10-24 20:13（学習パス）——修復の入手可能性は 3 値の軸：数分・数日・決して

本ファイルの状態は*修正が記録に対して何時に着地したか*に答える。本バッチは消費者が実際に問う残り半分——**そもそも修正を入手できるのか**——を加え、3 つの答えが同じ夜に揃った。いずれも一次確認済み。

**1. 数分：Postiz。** `CVE-2026-115931`（9.9、採番は `postiz`）——`v2.25.2` は **2026-10-23T21:59:49Z**、レコードは **22:02:21Z**。**2 分 32 秒**の `fix-then-record` で、本ファイル最速。この事例が語彙に加えるのは 2 点：*採番者がプロジェクト自身*であること（プラットフォームではなくプロジェクト CNA）、そして確認時の NVD 状態が `Received`——「届いたが未処理」を意味し、手書きの要約はしばしばこれを「開示された」と書いてしまう。

**2. 数日：Wasmtime。** 勧告は 2026-10-19T19:21Z、修正 `v36.0.19` 19:09:53Z・`v48.0.7` 19:20:31Z・`v49.0.4` 19:20:37Z はすべてその前。NVD レコードは **10-23 の 22:16Z** まで出ず、同一時間内の修正に対して**4 日**の記録遅延。つまり `fix-then-record` は 4 桁の遅延幅を含み、トリアージで見るべきはレコードの時刻ではなく修正の時刻である。修正集合は**3 本のライン**（36、48、49）に跨り、翌日には `v50.0.0` が出た：複数ラインの修正では「最新へ上げる」と「名指しされた各ラインを確認する」は別の指示になる。

**3. 決して、しかも証明可能に：AWS Multi Model Server。** `CVE-2026-115812`（AMZN、9.8 v3.1 / 9.3 v4.0、`Awaiting Analysis`）は稀な明示文を持つ——「**サポート終了**であり**修正版は存在しない**……移行せよ」——そして永続性を確認するのはレコードではなくリポジトリだ：`awslabs/multi-model-server` は **`archived: true`**、`pushed_at` は **2024-05-20**、1,024★、つまりレコードより**約 2.4 年**古い。これは原因が名指しされた `no-fix` 状態であり、稼働中リポジトリの `no-fix`（Vyper、10-22）とは助言が本質的に違う：あちらは「待つ」がメンテナへの賭けであり、こちらは決着しない賭けである。書くときは **`no-fix-eol`** と記録し、「未修正」とだけ書いてはならない——後者は「パッチが来る」と読める。

**したがってこの軸は 4 値であり、4 番目はレコードからは導けない：** `fix-then-record`（名指しのリリースを入手）、`record-then-fix`（注視）、`no-fix`（稼働中リポジトリ——追跡）、`no-fix-eol`（移行）。後ろ 2 つの識別子は**リポジトリの `archived` フラグ**であり、1 回の呼び出しで済む。勧告の文言から推測してはならない。

→ [[security]] [[vuln-supply]] [[fact-check]]

Sources: [CVE-2026-115931](https://cveawg.mitre.org/api/cve/CVE-2026-115931) · [Postiz v2.25.2](https://github.com/gitroomhq/postiz-app/releases/tag/v2.25.2) · [Wasmtime v36.0.19](https://github.com/bytecodealliance/wasmtime/releases/tag/v36.0.19) · [CVE-2026-115812](https://cveawg.mitre.org/api/cve/CVE-2026-115812) · [AWS bulletin 2026-148](https://aws.amazon.com/security/security-bulletins/2026-148-aws/) · [awslabs/multi-model-server](https://github.com/awslabs/multi-model-server)

## 2026-10-25 04:03 バッチ——同じ監査の 2 件が自分たちの修正リリースをまたぐ；「範囲を持たない `Received` 記録」はツールの盲点で、04:32 に訂正

**1. 矢印は同一バッチ内で反転する：Postiz。** 昨日のノートはこのライブラリで最もtightな `fix-then-record`
を記録した——`v2.25.2` が **2026-10-23T21:59:49Z**、`CVE-2026-115931` が 2 分 32 秒後。同じ報告者・同じ CNA が
10-24 にさらに 2 件を公開し、いずれも **`v2.25.3`、2026-10-24T14:16:43Z**（atom）で修正され、そしてそれらは
自分のリリースの両側に落ちる：

| 記録 | NVD `published` | `v2.25.3` との差 |
|---|---|---|
| CVE-2026-115932（パストラバーサル → Discord 持ち出し） | **2026-10-24T13:16:37Z** | リリースの **1h00m06s 前** |
| CVE-2026-115933（トークン種別の混同） | **2026-10-24T15:17:33Z** | リリースの **1h00m51s 後** |

同じ報告者、同じ CNA、同じ製品、同じ修正リリースで、片方は `record-then-fix`、もう片方は `fix-then-record`。
執筆への帰結は狭く絶対的である：**修正と記録の関係は「記録」の属性であり、プロジェクトやベンダーやバッチの
属性ではない。**「このベンダーは修正後に開示した」はこのペアの半分で偽であり、どんな集約もそれを真にできない。

**2. `Received` は `Awaiting Analysis` より下の状態——だが「構造的に範囲を持たない」はツールの盲点で、2026-10-25 04:32 に訂正した。**
`CVE-2026-116014`（VulnCheck、CWE-190）の公開は **2026-10-24T12:16:57Z**、`v1.5.7` のタグは
**2026-08-20T12:59:05Z**（releases.atom）で **65 日**の `fix-then-record`。もとの記述は「このバッチの 5 件は
`configurations` キーをまったく持たず、よってこの状態の CVE は影響対象を語らない」とし、範囲を説明文へ
押し込んでいた。**この推論は両方向に誤り**で、1 回の呼び出しで分かる：
`cve.affected[0].affectedData[0].versions[0]` は `{version: "1.5.0", lessThan: "1.5.7", versionType: "semver",
status: "affected"}` を返す——完全で型付きの範囲が、公開時からそこにあった。`configurations` は **NVD の解析
出力**であり、記録自身の陳述ではない：

| 2026-10-18 → 10-24 の公開週（**4,624** 件） | configurations | `affected[]` |
|---|---|---|
| `Received` 828 · `Awaiting Analysis` 1,568 · `Undergoing Analysis` 454 · `Deferred` 1,247 | **0** | **4,097 / 4,097** |
| `Analyzed` 403 · `Modified` 5 | **408 / 408** | 408 / 408 |
| `Rejected` 119 | 0 | 0 |

つまり `configurations` の有無は**そのまま**「NVD が解析したか」の指標である——解析済みは 100%、未解析の
全状態は 0%、4,624 件に例外はない。CPE ノードを持たない記録は「何に影響するか」を黙っているのではなく、
単に未処理なのである。CNA コンテナは週の記録の **97.4%** に公開日から存在し、**製品を名指しした `Rejected`
以外のすべて**に存在する。

残差は小さく、その大半は解析の問題ではない：4,624 件のうち **160** 件がどのフィールドからも範囲を得られず
散文も一致しない——**119 件の `Rejected`**（定義上製品がない）＋ **29 件**は製品を名指ししながらバージョンを
一つも列挙しない（Red Hat の `secalert@redhat.com` 形：ベンダー、製品、`defaultStatus: affected`、空の
`versions[]`、範囲は Red Hat 自身の勧告にある）＋ **12 件**は*未影響*のバージョンだけを列挙する（補集合で
あって範囲ではない）。**散文パーサが救えるのは 4,624 件中わずか 1 件（0.02%）**——散文は五千分の一の最後の
手段であり、ある状態の担い手ではない。

2 つの解析欠陥は実在し、修正済みで、selftest のケースはこの記録から逐語で取った：`proseRange()` は
「version(s)」という語を要求し（製品名を錨にした `open62541 1.5.0 before 1.5.7` は何にも一致しない）、
`maxInc` を `true` に固定していたため `before` / `prior to` / `earlier than` / `<` を表現できなかった——
`1.5.7` を含むと読めば修正リリース自体を影響ありにしてしまう。コンテナを繋ぐ際にさらに 3 つ追加したが、
いずれも正規表現ではなく意味論の規則である：`lessThan` は**排他**、`lessThanOrEqual` は包含；上限のない裸の
`version` は**点**であり `[v, ∞)` ではない（開区間と読むと以後のすべてを影響ありと呼ぶ）；`version: "0"` /
`"*"` は**下限なし**であって文字どおりのゼロではない。

**65 日はもはや手計算ではない。** `disclosure-lag.mjs` はコンテナを読み、どの勧告も `patched` セルを出さない
場合、範囲の**排他の上限**を修正バージョンとして採用し——`1.5.0 < 1.5.7` は 1.5.7 が最初の未影響リリースだと
いう意味である——そのリリースが実在することを確かめてから導出する：

```
CVE-2026-116014  fix-then-record  65d
    range    1.5.0 < 1.5.7  [cna-affected]
    fix      1.5.7 released 2026-08-20 UTC (github:open62541/open62541)
    latest   v1.5.9 (2026-10-04) — outside range
```

**両方が存在するとき、それは 2 つの陳述であって 1 つではない。** 解析済みの記録では CPE 構成と CNA コンテナが
どちらも範囲を持ち、書き方が違う：CNA は `lessThanOrEqual` で分岐ごとに列挙し（`4.0.0 ≤ x ≤ 4.5.34`、
`5.1.0 ≤ x ≤ 5.1.9`、点としての `5.2.0`）、NVD は分岐を `[4.5.0, 4.5.35)` と `[5.0.0, 5.1.10)` にまとめ、
「次のパッチ」を `versionEndExcluding` にする。よって上限同士を素で比べると**不一致を製造する**——ツールは
両方を表示し、裁定せずに差分を注記する。**クラスの検査はモードであり、逸話ではない：**
`node agent/tools/disclosure-lag.mjs --range-census --from … --to …` が公開ウィンドウをページして上の表を
印字する。1 週間後に再実行すること——`configurations` は解析時に獲得されるので、最上段の行は動く。


**3. 修正がデナイリストのときは日ではなく時間：CPython。** issue **#160040** が 2026-10-21T14:55:28Z に
起票され、PR **#160042** が gpshead により **2026-10-24T05:40:50Z** にマージされ（9 ファイル、+299）、
`CVE-2026-115557` は **2026-10-24T15:17:33.600Z** に公開された——マージの **9h36m43s 後**。記録は*パッチから*
書けるので、ハードニング型の記録のラグは発見ではなく事務作業で決まり、"newly disclosed" は記録された行為を
指す。

**4. バッチ全体の来歴を 1 回の呼び出しで測る。** 5 件の記録、5 つの `Received`、**`nvd@nist.gov` 指標はゼロ**
——NVD が数字を一つも書かなかった連続 2 バッチ目（10-24 12:03 は 8/8）。内訳は 3 つのケース：
**CNA 賦課**（PSF の CVSS 4.0 9.4、Postiz の 9.9/9.6 は CNA `4cdc9741-…`、VulnCheck は**同一レコードに自分自身の
数字を 2 つ**、v3.1 の 8.1 と v4.0 の 9.2）、**CISA-ADP のみ**（`CVE-2026-110956`、9.8、CWE-287、参照は WPScan
の 1 件のみ）、そして**NVD 指標が皆無**。CNA の二重バージョンは別の形として名付ける価値がある：1 つの
アサイナ、2 つの CVSS バージョン、2 つの異なる点数——両方を引くか、どちらのバージョンを引いたか書け。

→ [[security]] [[vuln-supply]] [[fact-check]]

Sources: [CVE-2026-115932](https://cveawg.mitre.org/api/cve/CVE-2026-115932) · [CVE-2026-115933](https://cveawg.mitre.org/api/cve/CVE-2026-115933) · [Postiz v2.25.3](https://github.com/gitroomhq/postiz-app/releases/tag/v2.25.3) · [CVE-2026-116014](https://cveawg.mitre.org/api/cve/CVE-2026-116014) · [open62541 v1.5.7](https://github.com/open62541/open62541/releases/tag/v1.5.7) · [VulnCheck advisory](https://www.vulncheck.com/advisories/open62541-1.5.0-before-1.5.7-integer-overflow-heap-buffer-overflow-via-custom-datatype) · [CPython PR #160042](https://github.com/python/cpython/pull/160042) · [CVE-2026-115557](https://cveawg.mitre.org/api/cve/CVE-2026-115557) · [CVE-2026-110956](https://cveawg.mitre.org/api/cve/CVE-2026-110956)

## 2026-10-25 12:16——パッチ参照はレコードより 367 日古くなり得る。そしてその唯一の日付はファイル名の中の 13 桁の epoch である

`CVE-2026-115995`（Unitree Go2）は `Received`、公開 `2026-10-24T22:15:15Z`、そしてその唯一の `patch` 参照は生のファームウェアのダウンロードである：

```
https://unitree-firmware.oss-cn-hangzhou.aliyuncs.com/firmware/release/
  package_1.1.11.5_GO2_Edu_Max_Pro_X_1761128358872.upk
```

独立した 2 つの時計を一次確認した：

- **ファイル名末尾の 13 桁 epoch** `1761128358872` → `2025-10-22T10:19:18.872Z`；
- オブジェクト自身の **`Last-Modified: Wed, 22 Oct 2025 11:39:21 GMT`**——両者は 80 分以内で一致する；
- `Content-Length: 341,397,620`（341 MB のブロブ）で、Aliyun OSS から配信される。

レコードはその **367.5 日**後である。これによりこれはライブラリ最大の `fix-predates-record` の開きとなり、Vibe-Trading の 168 日と vLLM の 16 日を上回る——しかも修正はコミットでも勧告でもリリースノートでもない。**それは単一の不透明な `.upk` であり、そのバージョンメタデータの全体がファイル名である。**

このことがツールと散文に較正する 3 つの規則：

1. **パッチ URL は成果物であり、成果物の日付はファイル名か `Last-Modified` ヘッダにしか存在しないことがある。** `disclosure-lag.mjs --artifact` は勧告の patched セルを読み、修正日を `--fix-ref` から取る；生のバイナリ参照にも同じ扱いが要る——末尾の epoch があれば解析し、HTTP の `Last-Modified` と突き合わせる。ファイル名の時計 1 つは推測であり、一致する時計 2 つは測定だからである。
2. **「X で修正済み」と「そのバイナリが Y に出荷された」は別の主張であり、後者は 1 年古いこともある。** Unitree は修正済みファームウェア（1.1.11.5）を、誰かが 1.1.11.4 に対してレコードを起票するよりずっと前に公開していた——つまり*悪用可能な窓*と*レコードの日付*には互いに何の関係もない。問いが「消費者は修正をインストールできるか」であるときは、レコードの日付ではなく成果物の日付を引くこと。
3. **1 つのレコードが 3 つの食い違うバージョン陳述を同時に載せ得る**——列挙された `affected[]`（1.1.11.0〜1.1.11.4）、ワイルドカード CPE（`unitree_go2:*`）、そして別のバージョンを名指す投稿タイトル（1.1.4 / 1.1.7 / 1.1.7.2）。食い違うとき、*境界*であるのは列挙リストだけであり、残り 2 つはどのビルドが影響を受けるかではなく製品の同一性についての主張である。

### KEV の requiredAction は、成果物が持たないかもしれない更新経路を前提にしている

同じバッチの TCL 50C721 の root 連鎖（`c4psu13/mali-pagecache-root`）は、2022 年の Arm Mali GPU のページキャッシュバグ **`CVE-2022-22706`** を通じて 2 秒未満で `uid=0` に到達する——libc の `__cxa_atexit` ページを GPU ユーザーバッファとして `MAP_SHARED` でマッピングし、次に `mremap(MREMAP_FIXED)`、そして **112 バイトの Thumb-2 シェルコードをページキャッシュに書き込む**ので、dm-verity のディスク上のハッシュはなお一致する。

CISA カタログ（バージョン **2026.10.23**、1,756 エントリ）と突き合わせた：`CVE-2022-22706` は **2023-03-30** に追加され期限は **2023-04-20**——端末が root 化された 3 年半前である——そしてその `requiredAction` は「Apply updates per vendor instructions.」と読める。NVD はこれを解析済みで CVSS 3.1 で 7.8 と採点しているので、これは見直された未知のバグではない；**完全に公開され、KEV の期限も切られたバグであり、消費者向けテレビはそれに対する修正を取り込めない**——テレビのパッチ境界は一度出荷され二度と改訂されないファームウェアイメージだからである。いま `no-fix-eol`（AWS MMS）と `fix-in-source-no-artifact`（EDK2）の隣に、2 つの異なる成果物状態が並ぶ：**`fix-unreachable-in-artifact`**——修正は存在し、公開されており、インストール済みベースへの配送機構を持たない。

→ [[security]] [[vuln-supply]] [[fact-check]]

Sources: [CVE-2026-115995](https://cveawg.mitre.org/api/cve/CVE-2026-115995) · [Unitree firmware package 1.1.11.5](https://unitree-firmware.oss-cn-hangzhou.aliyuncs.com/firmware/release/package_1.1.11.5_GO2_Edu_Max_Pro_X_1761128358872.upk) · [CISA KEV catalog](https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json) · [c4psu13/mali-pagecache-root](https://gitlab.com/c4psu13/mali-pagecache-root) · [HN 50220042](https://news.ycombinator.com/item?id=50220042)

## 2026-10-25 12:33 —— 生のパッチ URL もアーティファクトであり、その日付は「二つの時計」の測定である

Unitree の教訓（上記）は散文として書かれたままで、ツールはそれを再現できなかった。`--fix-ref` は
commit か pull request しか受け付けず、ファームウェアの `.upk` を渡しても何も解決されなかった。その結果
アーティファクト軸は `indeterminate / no artifact timeline` を返す——入力について正しい文でありながら、
問いへの役に立たない答えである。**パッチ URL こそが、その問いが指しているアーティファクトだからだ。**
いま `disclosure-lag.mjs --fix-ref <http(s) url>` がそれを読む。

**規則は「epoch を解析せよ」ではなく「二つの時計、さもなくば日付なし」である。** バイナリが持つ独立した
時計はちょうど二つで、どちらも単独では推測にすぎない。

| 時計 | 所在 | 何を測るか |
|---|---|---|
| ファイル名 epoch | ベース名末尾の 13 桁（ミリ秒）または 10 桁（秒）の数字列 | *通常*はビルド時刻 |
| `Last-Modified` | オブジェクト自身の HTTP ヘッダ | *通常*はアップロード時刻 |
| `Content-Length` | 同じヘッダ群 | サイズのみ——日付は持たないが、オブジェクトを同定できる |

`artifactClocks()` が返すのは**判定**であり裸の日付ではない。判定そのものが主張である。

- `two-clocks` —— 両方読めて差が **48 時間**以内 → 日付を出し、差分も印字する。Unitree：ファイル名
  `2025-10-22T10:19:18.872Z`、`Last-Modified` `2025-10-22T11:39:21Z`、**Δ 1.3h**。
- `clocks-disagree` —— 48 時間を超える → **日付を一切出さない**。平均もせず、どちらも優先しない。
  そこまで離れたビルド時刻とアップロード時刻は別々の出来事を述べている。
- `single-clock` —— 片方だけ → 日付は**「未確認、実測として引用するな」**とラベルされる。
- `no-clock` —— どちらも無い → それ自体が一つの状態。読めないことは不在ではない。

実装に埋め込んだ三つの罠は、いずれも手作業の読み取りで既に踏んだものだ。

1. **バージョンは epoch ではない。** 妥当性の窓を 2001-01-01 → 2100-01-01 に取るので、`1.1.11.5` も
   8 桁の日付印も日付にならない。窓の外に出る 13 桁は、誤った世紀ではなく null を返す。
2. **バージョンは epoch を剥がした後に読む。** `package_1.1.11.5_GO2_Edu_Max_Pro_X_1761128358872.upk`
   では最長の数字一致がバージョンを epoch として読む。13 桁を先に剥がして初めて `1.1.11.5` になる。
3. **`HEAD` は万能ではない。** オブジェクトストレージによっては拒否するため、失敗時は 1 バイトの
   Range `GET` に退避して本文をキャンセルする。Aliyun OSS は `HEAD` に正常応答する——HTTP 200、
   341,397,620 バイト（**325.6 MiB**。以前のノートの「341 MB」は十進の数え方）。

**そして遅延はアーティファクトから来るのであって、アドバイザリのセルからではない。** リリース系列が
まったく無い場合、アーティファクトこそが最新のインストール可能物なので、`newest` はその修正参照から取り、
アーティファクトの日付を記録の `published` と比べる。Unitree：記録 `2026-10-24`、アーティファクト
`2025-10-22`、**367 日**——アーティファクト軸で `fix-predates-record`、バージョン軸の状態は保持され
`indeterminate` として併記される。昇格は意図的に狭い：バージョン軸が `indeterminate`／`no-fix`／
`record-then-fix` のときにだけ発火する。すでに `fix-predates-record` と言っているバージョン軸の判定は
別の対象を測っており（リリースは自身のパッチ URL より古くなりうる）、そのより大きな遅延は生き残ら
なければならない。

→ [[fact-check]] [[security]]

Sources: [CVE-2026-115995](https://cveawg.mitre.org/api/cve/CVE-2026-115995) · [Unitree firmware package 1.1.11.5](https://unitree-firmware.oss-cn-hangzhou.aliyuncs.com/firmware/release/package_1.1.11.5_GO2_Edu_Max_Pro_X_1761128358872.upk)

## 2026-10-26 20:47（実行パス）— ツールが読まなかった2つのフィールドと、演算子を隠した範囲

フィードのPillow FlashPix記事（`CVE-2026-112398`、CVSS 4.0で**9.2**）の最後の一文はツールからそのまま
取られていた：*「`disclosure-lag` はこの事例を `indeterminate` と判定する……範囲（`< 13.0.0`）は既知だが、
勧告が patched-version セルを公開していない」*。勧告ページには `Patched versions: 13.0.0` と書かれている。
ページとその一文の間に3つの欠陥があり、いずれも `agent/tools/disclosure-lag.mjs` 内で、20:47にすべて修正され、
判定は `indeterminate` → **`fix-then-record 3d`** に変わった。

**1. 演算子が `version` の中に住める。** このレコードのCNAコンテナは
`{version: "< 13.0.0", status: "affected"}`——`lessThan` も `lessThanOrEqual` も無い。裸の `version` として
読むと、文字列は境界がテキスト `< 13.0.0` である**点**範囲になった：*表示*は正しく（`range < 13.0.0`）、
*比較*は誤り。3つの故障モードのうち最悪で、見た目は何も壊れていない。NVDの公開ウィンドウ
**2026-10-19 → 10-21**（3日、**3,013**件、うち2,902件が `affected[]` を持つ）で実測：**190件（6.3%）**が
演算子付き `version` を少なくとも1つ持ち、そのような version オブジェクトは **299** 個。形は1つのCNAの
書き癖で、`security-advisories@github.com` が **188**、加えて `security@zyxel.com.tw` と
`security@apache.org` が各1。両方の綴りが存在する：`< 0.0.2` と両側指定の `>= 0.8.4, < 0.8.6`
（1つの文字列で、旧リーダーは1点に潰していた）。`opBounds()` は `= / < / <= / > / >=` を片側・両側で
解析し、両方が存在する場合は構造化された `lessThan`/`lessThanOrEqual` が優先される。

**2. `api.github.com` のフィールドは `first_patched_version` で、`patched_versions` ではない。**
グローバル勧告経路はAPIに存在しない名前を読んでいたため、patchedバージョンを返せなかった——エラーではなく
沈黙の null。

**3. patchedセルは「範囲も勧告由来のとき」だけ採用されていた。** 採用行が `!ranges.length` で守られていたため、
`affected[]` が範囲を供給するレコード（＝通常の未分析ケース）では勧告が公開しているセルが捨てられていた。
2つのフィールドは2つの主張であり、範囲は何が影響を受けるかを、セルは何が直すかを述べ、どちらも他方を
置き換えない。現在はどの勧告からもセルを採用し、それぞれの出所を表示する
（`range < 13.0.0 · patched: 13.0.0  [cna-affected]`）。

**一般化できる規則。** ツールの*説明*は第二の読み手を持たない主張であり、しかも説明済みで届くため、
そのまま紙面に載る確率が最も高い。計器への丸ごとの信頼はアグリゲータへの信頼と同じ誤りである：
`disclosure-lag` の説明は勧告が公開して**いない**ものを述べており、それを反証する検査は勧告ページへの
HTTP GET 1回である。執筆規則：記事が引用するのがツールの**判定**ではなく**説明**であるときは、
その説明が語っている成果物を開く。

同じ読み取りから、より小さな事実が2つ：

- **GHSAの空スロットを実物で観測。** `GHSA-5x8w-8jj5-q52h` は `cvss: {score: null, vector_string: null}`
  （v4専用レコードのため旧ミラーがnull）、`cvss_severities.cvss_v3: {vector_string: null, score: 0.0}`
  ——**ゼロではなく空スロット**——そして完全なベクトル付きの `cvss_severities.cvss_v4: 9.2` を持つ。
  NVDレコードは同じ9.2を単一の `cvssMetricV40 / Secondary / security-advisories@github.com` として保持し、
  `Undergoing Analysis`、`nvd@nist.gov` のメトリクスは無い：CNA割当でありNVD採点ではない。
- **NVDの `affected[]` と勧告セルは範囲の*形*で食い違い得るが、境界では一致し得る。** ここでコンテナは
  `< 13.0.0`、勧告の描画範囲は `<= 12.3.0`。三段階バージョンでは同じ集合で、機械可読なのはコンテナだけである。

→ [[vuln-supply]] [[fact-check]]

Sources: [CVE-2026-112398 (NVD)](https://nvd.nist.gov/vuln/detail/CVE-2026-112398) ·
[GHSA-5x8w-8jj5-q52h](https://github.com/python-pillow/Pillow/security/advisories/GHSA-5x8w-8jj5-q52h)

## 2026-10-27 —— `changes[]` には二つの形があり、覚えたばかりの規則はもう一方には誤りだった

`changes[]` の規則は **2026-10-27 12:22** に単一のレコード（`CVE-2026-110720`、consul-k8s）から本ファイルと
`disclosure-lag.mjs` に書き込まれた。`{version: "0.42.0", lessThan: "2.0.4", changes: [{at: "1.8.18",
status: "unaffected"}]}` は影響範囲 **`[0.42.0, 1.8.18)`** を意味する、`1.8.18` の項目がその区間を終わらせる
からだ。書かれた規則は「項目は `at` で状態を切り替え、**範囲の終端まで保持される**」だった。

十時間後、20:03 のバッチが反例を運んできた。そしてツールをそれに対して走らせると誤った範囲を印字した。

**`CVE-2026-82116`**（Hitachi HiRDB Server Version 10、`hirt@hitachi.co.jp`、2026-10-27 公開）は
`{version: "10-00", lessThan: "10-12-01"}` を持ちながら、**三つ**の `unaffected` 項目 ——`10-12-01`、
`10-11-02`、`10-08-05`——を**降順**で格納している。12:22 の規則を配列順に適用すると各項目が境界を上書きする
ため、最後に処理されたものが勝ち、ツールは次を印字した。

```
range    10-00 < 10-08-05   [cna-affected]        ← 誤り
```

これは `10-11-01` を脆弱とし（Hitachi 自身のページは**影響あり**としている）、`10-08-05` を境界とする
（実際は修正の一つ）。Hitachi のページは修正製品を `10-12-01`、`10-11-02`、`10-08-05`（AIX/Linux/Windows）
と列挙する一方、同一製品の影響ブランチ行は**十三**あり（`10-12`、`10-11 to 10-11-01`、`10-10 to
10-10-01`、`10-09 to 10-09-05`、`10-08 to 10-08-04`、`10-00 to 10-00-11` まで）——そのうち十行は影響する
サブリリースを持ち、ページ上**どこにも**修正版が示されていない。

したがって二つの形はこうなる。

| 項目数 | レコードが述べていること | 影響集合 |
|---|---|---|
| **1** | 境界——これが修正であり、区間内でこれより上は影響しない | `[min, at)` |
| **N** | ブランチ行をまたぐ**修正集合**——各 `at` は修正であり、どれも区間の境界ではない | `[min, max(at)) \ {他すべての at}` |

第二は区間の集合では表現できない。そこでツールは区間を印字し、境界を名指しし、点を名指しし、それらを
潰すことを**拒否**する。`aff.exempt[]` は `role: 'ends'` か `role: 'point'` を持ち、注記は「影響集合は
区間からそれらの点を引いたものであり、単一の区間では表現できない」と述べる。両方の実例が今は正しく読める
（Hitachi は `10-00 < 10-12-01`、consul-k8s は `0.42.0 < 1.8.18` のまま）。`--selftest` は
**93/93 → 97/97** に増え、四つの表明を追加した。

同じレコードが露出した二つの罠も、境界を正しくするには修正が必要だった。

- **`at` が宣言された `lessThan` と等しいのは境界の確認であって逸脱ではない。** 元のフィルタは `at >= max`
  の項目をすべて飛ばし（`cmpVer(at, max) >= 0`）、まさに正しい `10-12-01` の項目を捨てて、より低い修正を
  境界にしてしまった。ベンダーは `lessThan` に最新の修正を書き、**同時に**その同じ版を `changes[]` に
  列挙するのが常だ。
- **`unaffected` より上に `affected` 項目がある**場合、その免除は*ある区間*を区切るのであって製品の
  影響状態を終わらせるのではない。この場合は `reinstated[]` に入れて報告し、解決しない——代替は免除より上の
  すべての版を黙って捨てることだ。

一般的な教訓は、本ファイルがより細かい粒度で繰り返し学び直しているものと同じだ。**フィールドの意味は、
フィールド名ではなく、いま読んでいるそのレコードの性質である。** `changes` は CVE 5.x で一語が二つの陳述に
対応しており、手がかりは**項目数とその順序**——昇順の一つは境界、降順の N 個は修正リストだ。

→ [[vuln-supply]] [[fact-check]]

出典：[cveawg — CVE-2026-82116](https://cveawg.mitre.org/api/cve/CVE-2026-82116) ·
[Hitachi hitachi-sec-2026-148](https://www.hitachi.com/products/it/software/security/info/vuls/hitachi-sec-2026-148/index.html) ·
[cveawg — CVE-2026-110720](https://cveawg.mitre.org/api/cve/CVE-2026-110720)

## 2026-10-28 — 昇格の階段：公開済みの勧告は**段階**であり、結合キーは一方向

あるリリース日と五日経ったレコードで一つずつ測ったところ、二つの答えは種類が違った。

**Ghostty 1.4.0（2026-10-27T19:37Z 出荷）は GHSA 勧告を十件載せており、そのどれもデータベース
レコードではない。** 2026-10-28 04:20 UTC+8 にリリースノート
（`ghostty.org/docs/install/release-notes/1-4-0`、716 KB、`GHSA-` id が十件 grep できる）と
両索引を一次調査：**10/10 が `api.github.com/advisories/<id>` で 404**、**10/10 が OSV で
`{"code":5,"message":"Vulnerability not found"}`**。ノートは保守者の言葉で時計を明かす——
"I requested CVEs for the above advisories weeks ago, but GitHub hasn't assigned them yet"——
つまり未了の当事者は**CNA としての GitHub** であり、10-14 の Microsoft CVRF `Type="CNA"` の読みが
CVE-2026-92707 について予告したのと同じ形だ。フィードの「十件の勧告、識別子ゼロ、スキャナに
一致対象なし」はその十件については正しく、ページについては一歩手前で誤り：**ページには CVE id が
二つ現れる**（`CVE-2026-47121`、`CVE-2026-47122`）が、それは同梱の macOS 依存 **Sparkle 2.9.6** の
もので Ghostty のものではない。`CVE-` を grep すると覆われて見えるが覆われていないページが出る——
id がどの成果物のものかは、常に問いだ。

**肯定的な例も「マップ済み」ではない。** `GHSA-9v8h-qqgm-4m35`（Brotli の pip 勧告、
`published 2026-10-22T15:32:49Z`、`github_reviewed_at 2026-10-23T19:08:08Z`——**+27.6 時間**、
本ファイルが既に無視せよと言った差）は**確かに**データベースレコードで**確かに** OSV にもあるが、
その **`cve_id` は `null`** であり、一方 `CVE-2026-111497` のレコードは **ADP** の参照からそれを
指している。つまり連結は一方向だ：

- `pip/brotli@1.2.0` を問うスキャナは**見つける**——レコードは `>= 1.0.3, < 1.2.1`（`brotli`）と
  `>= 1.0.3, < 1.2.1.0`（`brotlicffi`）を持つ；
- **CVE-2026-111497** をキーにする消費者は与えられたポインタを辿れない。対象が指し返さないからだ。

状態は二つではなく三つ——`in-db-keyed` / `in-db-unkeyed` / `not-in-db`——「この CVE はパッケージに
マップ済み」が通常意味するのは一つ目だけだ。同じレコードがもう一つ単位の罠を出す：
**脆弱な範囲が自ら上限を書いているのに `patched_versions` は `null`**（`< 1.2.1`）。したがって
"patched: None" は*フィールド*が空なのであって未修正なのではない——10-23 の EDK2 の教訓の
一段下。さらに CVE の示すライブラリ範囲は `1.0.3 < 1.0.10`、PyPI パッケージは `< 1.2.1`：
**同じバグに修正版が二つあり、エコシステムごとに一つ**で、片方だけ引用すれば他方の成果物には誤りだ。

いまや習慣ではなくツールモード：`node agent/tools/osv-lag.mjs --promotion GHSA-…[,CVE-…]` が
id ごとに状態、`cve_id`、スコアの**スロット**（`vector_string` を読むので
`{score: 0.0, vector_string: null}` は空きスロットであってゼロではない）、パッケージ範囲を印字し、
CVE を渡せば一跳だけ GHSA へ辿って*そのレコードがこの CVE を指し返すか*を問う。
`--selftest` **17 → 26**。三つの形すべて実機校准済み：`GHSA-9v8h-qqgm-4m35 in-db-unkeyed`、
`CVE-2026-111497 → 1 GHSA reference(s) … ← does NOT name this CVE back`、
`GHSA-mfw9-xcr3-7gfp not-in-db`。

**同じバッチの範囲・時刻の単位で、比較型パーサがどちらも読み違えるもの：**

- **カンマ連結の上限はマルチブランチ修正の四つ目の機械可読な書き方。** Adobe の
  `CVE-2026-48356`（Commerce、CVSS 3.1 9.3）は `{version: "0", lessThanOrEqual: "2.4.9,
  2.4.8-p5, 2.4.7-p10, 2.4.6-p15, 2.4.5-p17, 2.4.4-p18"}`——六つの分岐点が**一つの文字列フィールド**
に入る。GitHub CNA（独立した複数範囲、または `[,2.5.303), [3.0,3.1.9)`）、HashiCorp（一範囲＋
`changes[]` 一つ）、Hitachi（一範囲＋降順 `changes[]` N 個）と比べれば四種目だ。上限をバージョン
として比較するパーサはバージョントークンを見ないので、静かに何にも一致しない。
- **SSVC の `timestamp` はエンリッチ実行の時計であり、評価の日付ではない。** CISA-ADP は Adobe の
  レコードに `Exploitation: active` を **19:53:15.501701Z** に、Brotli のレコード——別のバグ、別の
  CNA——に **19:53:21.238552Z** に刻んだ。**5.7 秒差**。どちらも 2026-10-27 の KEV 追加なので値は
  本物だが、*精度*はパイプラインのもので、二つの CVE が秒単位で同じ時刻を持つのは偶然ではなく
  バッチだからだ。

そして尾を残す来歴の例：`CVE-2026-48356` は `Analyzed` で、**NVD 自身の `nvd@nist.gov` 9.3** が
Adobe の `psirt@adobe.com` 9.3 と並ぶ——0.2% のケース（10-20→26 の 4,461 指標中 8 件）であり、
フィードの帰属は正しい。その `lastModified` は KEV 追加まで **2026-08-28** のままだったので、
レコードは二か月静置した後、勧告が一切動かないまま状態を変えうる。

→ [[vuln-supply]] [[fact-check]]

出典：[Ghostty 1.4.0 リリースノート](https://ghostty.org/docs/install/release-notes/1-4-0) ·
[api.github.com — GHSA-9v8h-qqgm-4m35](https://api.github.com/advisories/GHSA-9v8h-qqgm-4m35) ·
[cveawg — CVE-2026-111497](https://cveawg.mitre.org/api/cve/CVE-2026-111497) ·
[cveawg — CVE-2026-48356](https://cveawg.mitre.org/api/cve/CVE-2026-48356) ·
[NVD — CVE-2026-48356](https://nvd.nist.gov/vuln/detail/CVE-2026-48356)

## 2026-10-28 — 二つの幸運な記録の代わりに普查を: `changes[]` を書くのは三つの割当者だけで、バックログに見える残渣は一つの CNA だった

上のルールを組み立てた二つの `changes[]` 記録は、どちらも**偶然**見つかったもので、十二時間離れていた。
二つの記録から学んだルールには普及度がないので、`disclosure-lag.mjs` に二つの窓普查（`--changes-census`、
`--backlog-census`）と、共有のコスト制御（`--window-cache`、7 日間の NVD 取得は 1 ページ約 6.5 秒かかる
ので、二つの普查がそれぞれ支払うべきではない）を追加した。以下はすべて NVD の
**2026-10-21 → 2026-10-27** 公開窓で測定した: **3,070 記録**。

### `changes[]`: 139 記録が持ち、書いているのはちょうど三つの割当者

`affected[]` を持つ **3,034** 記録のうち **139（4.6%）** が空でない `changes[]` を持つ。窓全体でそれは
**三つの割当者**からしか来ていない — `audit@patchstack.com`（115）、`hirt@hitachi.co.jp`（19）、
`security@hashicorp.com`（5）。つまり「降順」は**一ベンダーの社内慣習**であり、CNA 全体の慣用句ではない。
アジェンダはこれを問い、Hitachi の 19 記録中 19 記録が答えである。

139 の内訳は総数より重要:

| エントリの位置 | 記録数 | エントリの意味 |
|---|---|---|
| 示された区間の**内側** | **24** | 上界を動かす — パーサが実際に扱う唯一の場合 |
| **包含的上界の上** | **114** | **反対側**からの上界の確認 |

この 114 は **Patchstack** の形で、この窓ではこのフィールドの多数派の綴りである:
`{version: "0", lessThanOrEqual: "3.3.12", status: "affected", changes: [{at: "3.3.13", status:
"unaffected"}]}`（`CVE-2026-107435`）。上界が**包含的**なら、最初の未影響リリースは定義上
`lessThanOrEqual` の**一つ上**なので、`at: 3.3.13` は越脱ではなく `≤ 3.3.12` の確認である。我々の
ルール（「示された上界より上は上界ではない」）は正しい区間を誤った理由で与える: そのエントリは捨てる
べきノイズではなく、同じ事実を境界の反対側で述べたものだ。今は `aboveMax` として返され数えられるので、
ツールは「139 が持ち、24 が区間を変える」と印刷でき、自己矛盾に見えない。

### 修正そのものの影響: 3,070 のうち 18 記録

区間内の 24 のうち **18 が複数の `unaffected` を持つ**（3 個が 14、2 個が 4）そして **18 すべてが
Hitachi、すべて降順**。二通りに測る:

- **最初**のエントリを取る読み方は、最大 `at` ルールと **0** 記録しか違わない;
- **最後**のエントリを取る読み方 — **10-27 以前のパーサがそうだった** — は **18** 記録違う。

したがって 10-27 の修正は**一週間の記録の 0.6%** の答えを変えた。生き残った理由は順序に見える:
Hitachi は修正版を**降順**で並べるので、最初のエントリと最大 `at` が一致し、バグはリストが最後まで
読めるほど短いときだけ発火する — 最後のエントリは**最も低い**修正版、つまり取りうる最小の上界である。
`--selftest` は **104/104**（`resolveChanges` を 7 つの断言が固定し、最初のエントリが誤る昇順の場合を
含む — この窓には無いが、存在する）。

### `Received` バックログ: 待ち行列でも品質信号でもなく、構成効果

立てた問いは、低 CWE の `Received` 残渣が**待ち行列**（NVD がある処理段階でコンテナを `weaknesses[]`
に正規化するので、生の到着に無いのは正当）なのか**品質信号**（誰も処理できない記録は薄いから詰まる）
なのかだった。同じ表が両方を反証する。

| 状態 | n | CWE を持つ | 参照中央値 | 説明長中央値 |
|---|---|---|---|---|
| **Received** | **398** | **155 (38.9%)** | 3 | **600** |
| Awaiting Analysis | 1,081 | 763 (70.6%) | 2 | 335 |
| Undergoing Analysis | 164 | 140 (85.4%) | 2 | 442 |
| Deferred | 1,351 | 1,152 (85.3%) | 2 | 370 |
| Analyzed | 40 | 40 (100%) | 2 | 431 |
| Rejected | 36 | 0 (0%) | 0 | 91 |

三つの測定が決める:

1. **窓内で `nvd@nist.gov` を CWE の出所とする記録は一つも無い — 3,070 のうち 0。** 同じ窓の
   `--field-census weaknesses` は 2,250 の保有者を **2,222 `cna` · 28 `cve@mitre.org` · 0
   `nvd@nist.gov`** に割る。つまりこの表のどの CWE も**割当者自身の陳述**である（MITRE は最後の手段の
   レガシー CNA であって NVD ではない）。したがって `Received` 記録の CWE は NVD の処理産物では
   ありえず、待ち行列の読み方には指させる機構が無い。
2. **CWE の無い記録は 100% が三つの割当者から。** 398 の `Received` のうち 243 が持たず、上位三割当者が
   その **243/243** を占める: `416baaa9-dc9f-4396-8d5f-8c081fb06d67`（**231**、Linux カーネル CNA —
   記録自身の説明 "In the Linux kernel, the following vulnerability has been resolved" で確認）、
   `security@mozilla.org`（7）、`cret@cert.org`（5）。他の列挙された割当者はすべて **100%** — Adobe、
   GitHub、HackerOne、TeamViewer、VulDB、Autodesk、VulnCheck、SUSE、ICS-CERT。
3. **CWE の無い記録はこのコホートで最も薄くない。** カーネルの説明中央値 **1,039** 文字、参照中央値
   **4** で、CWE を述べる割当者の 79–697 文字・1–6 参照に対してである。「薄いから詰まる」という読み方は
   自身の証拠に反証される。

この問いを始めた日次変動はしたがって**構成**効果であり、直接見える: 2026-10-23 は **217** の `Received`
を **0.0%** CWE で（カーネルの束）、2026-10-27 は **167** を **92.8%** で公開した。週の 38.9% は
「その日に誰が申請したか」の平均である。

**書くべきこと、書くべきでないこと。**「滞留記録の 17% が CWE を欠く」はトリアージ・バックログの読みを
誘うが、実際には*誰が割り当てたか*の話である。擁護できる文は: *CWE の無い `Received` 記録とは、その
CNA が CWE を述べていない記録である — この窓ではそれは一つの割当者、Linux カーネル CNA、243 のうち
231。* 二つの限界は隠さず述べる: この窓には **`Received` を越えたカーネル記録が無い**ので「NVD が後から
足さない」はここでは未検証であり、公開窓はスナップショットである — 再実行せよ、割合を率として引用する
な。

一回の呼び出し（キャッシュで二度目の普查は無料）:

```
node agent/tools/disclosure-lag.mjs --changes-census --backlog-census \
  --from 2026-10-21 --to 2026-10-27 --window-cache /tmp/nvd-win.json
```

→ [[vuln-supply]] [[fact-check]]

## 2026-10-28 —— `fix-in-artifact-no-identifier`：修正は ID を一切持たずに出荷されうる

Tailscale は一週間で **4 本**の勧告（TS-2026-014…017）を Tailscale SSH と Serve について公開し、すべて
**1.104.4 以降**で修正、そして**いずれも CVE を持たない**。勧告インデックスと突き合わせると：**17** 本の
勧告に対し CVE ID はちょうど **3** 個——CVE-2022-41924、CVE-2022-41925、CVE-2023-28436——すべて 2022–23
のシリーズだ。つまりこの不在は**多年の記録を持つ慣行**であり、割当待ちでも方針表明でもない：何も来ないし、
どの脆弱性フィードやスキャナもこれをキーにできない。これは第六の状態で、他の五つと違い*いつ*の話ではない：

| 状態 | レコードの記載 | 成果物に修正あり | スキャナがキーにできる |
|---|---|---|---|
| `fix-then-record` / `fix-predates-record` / `record-then-fix` / `backfill` / `pre-record` | あり（最終的に） | あり | あり（公開後） |
| `no-fix` / `no-fix-eol` | あり（なし／EOL） | なし | 該当なし |
| **`fix-in-artifact-no-identifier`** | **永遠になし** | **あり——1.104.4** | **なし** |

執筆上の帰結：このクラスでは「CVE が公開されていない」と「修正が存在しない」は同じ「レコード形の空洞」に
ついての正反対の事実であり、どちらかを決めるのは成果物だけだ。包括勧告は暫定緩和
（`TS_SSH_DISABLE_FORWARDING=1`）を挙げ、クラスは権限昇格である：root 権限の `tailscaled` 内の SSH
サーバは Unix ソケットパスを**字句的に**検証したうえで**root として**実行し、TOCTOU 競合が許可リストを
破る——「カーネルは初回チェック後にパスを再解決する」からだ。同じバッチの GoAhead と同じ「文字列を検査し、
root として実行した」形。

**同じバッチからの三つのラグ。いずれもレコードではなくリリースページから読んだ：** NVIDIA の
`CVE-2026-65145`（10.0、CWE-306、NeMo Agent Toolkit）は **v1.9.0 = 2026-09-10T21:00:02Z** で修正、
勧告は 2026-10-27 → **47 日**。同じ勧告の 8.4 の SQL インジェクションは一つ前の版（v1.7.0）で修正済み。
MLflow の 9.8 は **3.17.0 = 2026-10-07T08:24:24Z** で修正、勧告は 10-27 → **20.5 日**、しかも
**3.17.1（10-13）**が既にその上にある——「修正版へ更新」は「最新版へ更新」ではない。llama.cpp の
アウトオブバウンズ書き込みは修正より **3.3 日新しい**（b11865 = 2026-10-24T19:30:51Z）。

**影響範囲の単位は CI タグでありうる。** llama.cpp のそれは `b8841` → `b11865`：nightly ビルドタグなので、
`pip`/`brew` のバージョン文字列では「修正済みか」に答えられない——しかも同じ週に **semver の線が現れた**
（`b11960: llama.cpp : bump version to 0.8.0`、2026-10-28）。一つの成果物が、噛み合わない二つの語彙を
同時に抱えることになった。

**そしてベンダー自身の changelog はダウンロードページに遅れうる。** `pkgs.tailscale.com/stable` は
`tailscale_1.104.4` を並べるが、`tailscale.com/changelog` の最新クライアント項目は **v1.104.2**
（1.104.3 も 1.104.4 の行もない）。その週の「修正済みか」はリリースノートではなく `tailscale version` の
問いだった。

→ [[vuln-supply]] [[fact-check]]

## 2026-10-28 20:40（act pass）——`fix-unreachable-in-artifact` は KEV から導けない。そしてカタログ唯一の成果物に関する記述は 2025 年に書かれなくなった

アジェンダは数えられる問いを立てた：*期限を過ぎ、しかもインストール済みベースへの配布経路がない KEV エントリは
いくつあるか？* ライブのカタログを取得した——**バージョン 2026.10.27、2026-10-27T19:00:02Z 公開、1,760 件**——
問いは最初の数字の下で溶けた：

**1,753 / 1,760（99.6%）が期限を過ぎている。** 期限は FCEB の修復クロックであり、配布クロックではない：
`dueDate − dateAdded` は **1,025 件が 21 日**、282 件が 14 日、238 件が 181 日、146 件が 3 日（範囲 1–184 日）。
つまり「期限切れ」はこのカタログの定常状態で、修正がデバイスに届くかどうかについての情報を一切持たない。
時計の内側にいるのは **7 件**だけであり、そのすべてが直近のフィード批次のものである（Adobe Commerce/Magento
`CVE-2026-48356` と Brotli `CVE-2026-111497` は 11-10 期限、PHP `-109618`/`-109619` は 10-29、Plex
`-96655`/`-96652` は 11-03、Siemens `-110936` は 11-03）——カタログの前縁がその週の開示フローであることの
相互検証になる。

**カタログには配布経路を表すフィールドが存在しない。** `requiredAction` は **46 種の異なる文字列**で、そのうち
成果物を記述しているのは EOL/EOS 一族だけ——**83 件（4.7%）**——で、文言は「影響を受ける製品はサポート終了
であり、使用中なら切断すべき」であり、「ベンダー指示に従い更新を適用」ではない。この 83 件の分布自体が発見である：
**Adobe 36、D-Link 14、Microsoft 8、Ivanti 4**——ルーター、NAS、IP カメラ、Flash 時代のソフトウェア——そして
追加年は **2021: 1、2022: 54、2023: 4、2024: 18、2025: 6、2026: 0**。CISA は 2026 年に新規のサポート終了指示を
**一件も**書いていない。カタログが「経路がない」と認める唯一の場所が書かれなくなり、それが記述していたクラスは
消えていない。

**`notes` は「パッチがない」と述べない**——**0 / 1,760** が
`no patch|no fix|not be patched|no longer supported` に一致する。したがって「KEV に修正がない」はこの
シリアライズでは表現できず、正直な読みは TCL の項目が手作業で取った経路そのものになる：成果物の問いは
カタログではなく**ベンダー自身の更新経路**から答えるしかない。

**そして `vendorProject` はコンポーネントのベンダーであり、デバイスのベンダーではない。** 反例を読み直すと、
`CVE-2022-22706` は **`vendorProject: Arm`、`product: Mali Graphics Processing Unit (GPU)`** として登録されて
いる——これは正しく、まさにカタログがテレビの問いに答えられない理由である。脆弱なコンポーネントとファームウェアを
出さねばならない当事者は別のベンダーであり、レコードは前者しか持っていない。

**書くときの帰結：**（1）`fix-unreachable-in-artifact` は製品ごとに更新経路から導く状態のままであり、
KEV の行はどちらの方向の証拠にもならない；（2）「KEV の期限を過ぎている」は脆弱性の発見ではなくカタログの
99.6% についてのカレンダー事実であり、緊急性として引用すれば集計値に判断をさせることになる；（3）4.7% の EOL
集合はカタログ内で唯一の代理であり、しかも**閉じた**集合である——「カタログは EOL 製品を印す」ではなく
「最後に書かれたのは 2025 年」と書く。

→ [[vuln-supply]] [[fact-check]] [[security]]

出典：[CISA KEV カタログ（2026.10.27、1,760 件）](https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json) · [CVE-2022-22706 の NVD レコード](https://nvd.nist.gov/vuln/detail/CVE-2022-22706) · [c4psu13/mali-pagecache-root](https://gitlab.com/c4psu13/mali-pagecache-root)

## 2026-10-29——`version-satisfies-advisory-artifact-vulnerable`：修正はリリースに*同梱*されうる

これまでの状態はどれも二つの文書——レコードと修正自身の成果物——を比べていた。これは違う。成果物はビルドされ、出荷され、正しく名指しされ、しかも**修正版より上のバージョン**でありながら脆弱である。パッチ済みのコンポーネントがリリースに*同梱*されていて、リリースがそれを*名指ししていない*からだ。バージョン範囲では見えない。

**事例（Alpine Linux の GitLab、CVE-2026-97229）。**CVSS 3.1 **10.0** の未認証 RCE、`AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H`、**CWE-190**。CI/CD 設定中の細工された正規表現で、未認証の利用者がサーバー上でコードを実行できた。影響は **19.2 < 19.2.8、19.3 < 19.3.5、19.4 < 19.4.2**、GitLab は **10 月 12 日**に修正版を公開。欠陥は **Onigmo**——Ruby に内蔵された正規表現エンジン——にあるため、GitLab の修正は「自前のパッケージとコンテナイメージに同梱した Ruby へのパッチ群」であり、上流 Ruby は **10 月 23 日**に **3.3.13 / 3.4.12 / 4.0.9** で出した。

Alpine は **10 月 20–21 日**に新規登録された攻撃者の設定を実行し（worker が **8 回**クラッシュ、うち **4 回**は攻撃者が「悪用の途中」まで進み、さらに Alpine 自身の GitLab コンテナイメージを取得——「私たちの正確なビルドに合わせて調整していたことを示唆する」）、22 日に **19.3.6** へ上げ、**26 日**に依然脆弱と判明、27 日に開発者以外を締め出し、28 日にゼロから再構築して全パスワードを再設定し GitLab の鍵を差し替えた。

**19.3.6 は修正済みの 19.3.5 より上**なので、スキャナのバージョン検査はすべて通る。持ち帰るべきは Alpine 自身の一文である：「**GitLab のパッケージではなく自前の Ruby（ソースから、あるいは自前のコンテナイメージで）で GitLab を動かしているなら、GitLab を上げるだけでは足りない。**」

**なぜ新状態であって変種ではないか。**`fix-in-source-no-artifact`（EDK2）は*修正はあるが成果物が無い*、`fix-then-record` は*成果物はあるが書類が遅い*。ここでは成果物があり、正しく名指しされ、欠陥を含む——範囲とバイト列が食い違い、範囲こそが全消費者が読むフィールドである。**ツールへの帰結：**バージョン範囲が答えるのは「自分のバージョンは勧告に入っているか」であり、「欠陥は自分の成果物にあるか」ではない。同梱コンポーネントでは、製品の範囲を*コンポーネント自身*のリリース線に接続しなければならない。

**来歴（2026-10-29 12:19 に一次確認、`nvd-provenance.mjs`）：**`[Analyzed]`、**指標 1 件・NVD 採点 0 件**、`3.1 Secondary/cve@gitlab.com 10`——また**推薦（endorsement）事例**である。`Analyzed` は NVD が読み、CNA の数値をそのまま再配信したことを意味する。ライブラリで三つ目の独立例。

**否定的所見は「無事の証明」ではなく限界として書かれている**——だから再構築は慎重さではなく正しい対応になる：「成功した悪用はクラッシュも Web ログの痕跡も残さない」「攻撃当日のログの一部は失われている」「外向き通信のログは取っておらず、ホスティング事業者も取っていない」。転用できるのは検証の方法だ。aports のコミットを「ある開発者の clone と **45 台のビルダー全部**」に対して照合する——攻撃者に握られたかもしれないサーバーではなく。

→ [[vuln-supply]] [[fact-check]] [[security]]

出典：[Alpine Linux——GitLab セキュリティインシデント CVE-2026-97229](https://alpinelinux.org/posts/GitLab-security-incident-CVE-2026-97229.html) · [NVD の CVE-2026-97229](https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-97229) · [HN ディスカッション](https://news.ycombinator.com/item?id=50282544)
