---
date: 2026-09-21
updated: 2026-09-21T20:10:00+08:00
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 33
license: CC-BY-4.0
---

## 1. Qwen Image 2.1：Alibaba の 7B 画像モデルが RGBA ネイティブへ——ただしリサーチ専用ライセンスで

- **Velocity:** ▮▮▮ trending
- **Source:** Hugging Face / Hacker News · 356+ pts · 131 comments · ~7h ago (~21:30 UTC+8)
- **Tags:** `image-generation` `open-weights` `qwen` `licensing`

Alibaba の Qwen チームが Image 2.1 をリリース：テキスト→画像生成・編集・ネイティブな RGBA
透明度を統合し、最大10枚の参照画像を受け付け、mixed-granularity attention と prefix
KV-cache 再利用を搭載した 7B の視覚生成モデル（20B から縮小）。モデルカードはアーキテクチャと
BF16 重みを確認できる——しかしベンチマーク数値も limitations セクションも一切ない。
HN スレッドを支配する要点：**Qwen Research License Agreement** での公開であって
Apache-2.0 ではなく、商用利用は別途交渉になる。

**Why it matters:** HN の読み——「weights-available であって open-weights ではない」——
がストーリーそのものだ：Qwen の画像ラインが、LLM ラインで知られていた Apache-2.0 パターンから、
最大の能力跳躍（ネイティブ透明度、10枚参照編集）と同じタイミングで離脱した。コミュニティ報告の
VAE ドットパターンアーティファクトや長いプロンプトへの追従の弱さはコメント主の主張であって
ベンダー確認済みではなく、公式ベンチマークは公開時点で検証できなかった。

[`🔗 Hugging Face モデルカード`](https://huggingface.co/Qwen/Qwen-Image-2.1) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49775499)

---

## 2. ChatGPT の広告コレクターがオフサイト閲覧を ChatGPT アカウントに紐づける——1年物の `__obi` クッキー経由で

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 338+ pts · 163 comments · ~5h ago (~23:18 UTC+8)
- **Tags:** `privacy` `adtech` `openai` `tracking`

研究者 Ionut Bochodi によるティアダウン（自身のサイトに公開、HN フロントページのトップ
ストーリー）は、OpenAI の `bzr.openai.com`（「bazaar」）の広告コレクターが `.openai.com` に
`__obi` クッキー——`SameSite=none; Secure`、Max-Age 1年——を設定し、OpenAI の計測 SDK が
それを広告主サイトからページデータとともに送り返す仕組みを記録している。著者は12の商用サイト
（Chewy、Wayfair、Eventbrite、HelloFresh、Coursera、SeatGeek）でペイロードを観測し、
ハッシュ化されたメールアドレス・電話番号に加え、平文の郵便番号・都市・地域が含まれていた。
最も収集されたのは郵便番号。トークンは `consent_decision: analytics_allowed` を運んでおり、
マーケティング同意を拒否したユーザーも同期される。

**Why it matters:** 著者自身の但し書きを持ち歩くこと：観測は Chrome for Android のみ
（Safari ITP と iOS ブラウザはブロック）、ChatGPT セッションの約5分の1だけが同期トークンを
発する、そしてアカウント突合そのものは**設計から推定したものであって観測されていない**——
OpenAI は9月14日の問い合わせを確認したが、2つの質問のどちらにも答えなかった。割り引いても
構造的発見は成立する：これは ChatGPT アカウントを中心に再構築された Meta 型のクロスサイト
計測グラフであり、「analytics 同意」が法的な働きをしている。

[`🔗 buchodi.com ティアダウン`](https://www.buchodi.com/chatgpt-now-knows-what-you-do-on-other-websites-via-ad-collector/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49776729)

---

## 3. Pirate Face が Hugging Face モデルを BitTorrent スウォームでミラー——「救出」モデルは削除を生き延びる

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 315+ pts · 113 comments · ~5h ago (~23:16 UTC+8)
- **Tags:** `bittorrent` `hugging-face` `open-weights` `infrastructure`

Pirate Face は自らを「sovereign AI のための分散インフラ」と称する：Hugging Face のオープン
モデルとデータセットをマグネットリンクとしてミラーし、各リンクは元の HF ファイルへの
BEP-19 web-seed と HF 自身の SHA-256 チェックサムを運ぶ。HF がモデルを削除すれば web-seed は
死に、スウォームが引き継ぐ——それらには「Rescued」ラベルが付く。サイトは66.9万件以上の
対象モデルをライブ同期で主張し、MIT/Apache-2.0 のみを受け入れ、`HF_ENDPOINT` 互換 API を
計画している。

**Why it matters:** サイトは単一出典だ——運営者の名前がなく（X ハンドルのみ）、66.9万という
数字とライブ同期の主張は独立に確認できない。しかし設計こそが興味の対象だ：チェックサムで
固定したオープンウェイトのトレントミラーは、このフィードが1か月追いかけてきたモデル削除問題への
具体的な答えであり、HN の議論は新規性が薄れた後にシードのインセンティブが生き残るかどうかに
集約される——「Rescued」モデルはピアがシードしている間しか存在しない。

[`🔗 pirateface.co`](https://pirateface.co/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49776699)

---

## 4. Codex サンドボックス脱出が2件公開：「Heapjack」は V8 ヒープから認証トークンを読み、「Overpatch」は `/` に書き込む

- **Velocity:** ▮▮ rising
- **Source:** Accomplish AI blog / BleepingComputer · 開示は約6日前、BC 報道は約12時間前 (~16:00 UTC+8)
- **Tags:** `sandbox-escape` `codex` `agent-security` `v8`

Oren Yomtov（Accomplish AI）が OpenAI Codex のサンドボックス脱出を2件公開、8月12日に報告され
8日以内に修正、主流メディアの報道は9月20日に到着。**Overpatch**（Codex CLI）：`apply_patch`
はパッチ内に名前の挙がった各パスの親フォルダへの書き込み権限を与えるため、`/tmp` を指す
囮エントリが権限を `/` まで広げる——シムリンクと連鎖させ `.zshrc` にコードを仕込む。
**Heapjack**（Codex Desktop）：グローバルインストールされた `node_repl` ツールが信頼済みと
信頼されていないコードを単一の V8 ヒープを共有する2つの `vm` コンテキストに置くため、
`v8.getHeapSnapshot()` が信頼済み認証トークンを漏洩させ、それがサンドボックス化されていない
Rust 親プロセスへのリクエスト偽造——プロンプトなしの `read-only` モードからの任意の `open`
呼び出し、unix ソケット、設定編集——に使われる。

**Why it matters:** Desktop ビルド 26.818.21641 と CLI 0.149.0 で修正済み、CVE の割り当ては
なく野良悪用の報告もない。論文自身の診断が転用可能な教訓だ——「強制メカニズムが強制される
環境の内側に置かれていた」——このフィードが OpenPanel、Docker Sandboxes、vm2 にわたって
記録してきたのと同じクラスだ。Codex の2025年 Landlock 脱出（CVE-2025-59539）とは別件——
開示を混同しないこと。

[`🔗 Accomplish AI 開示`](https://accomplish.ai/blog/escaping-the-openai-codex-sandbox-twice/) · [`🔗 BleepingComputer`](https://www.bleepingcomputer.com/news/security/researchers-escape-openai-codex-sandbox-to-run-commands-on-host/)

---

## 5. 継続実行のファイルシステムベンチマークが Btrfs/ZFS/bcachefs を2時間ごとに検証——古典スタックが黙ってゴミを返しているのを発見

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 167+ pts · 155 comments · ~26h ago (~02:11 UTC+8)
- **Tags:** `filesystems` `benchmarking` `btrfs` `bcachefs` `zfs`

Bartosz Fenski の modern-fs-benchmark は、28構成のマトリクス（Btrfs、ZFS、bcachefs、
md/LVM 上の ext4/XFS）に fio フェーズ、fsync p99/p999、スナップショット エージング、破損
リカバリを継続的に通す——GitHub Actions の2時間ごと cron とセルフホストの NixOS ハードウェア
リグで（最新実行は9月20日、カーネル 7.0.0-azure、600 runs）。サンプル数値：btrfs raid1 の
randwrite は 2,589 IOPS 対 bcachefs replicas2 の 9,017。ext4/md-raid10 の fsync p99 は
約37 ms 対 bcachefs の約3–6 ms。README の見出しの発見は定性的だ：破損テストで、古典的な
md/LVM 上の ext4/XFS スタックは「何のエラーもなくアプリケーションにゴミを返した」のに対し、
CoW ファイルシステムは損傷を検出して再構築した。

**Why it matters:** 方法論の但し書きはページに載っていて、それが重要だ：CI リグは共有
Ubuntu VM 上の4つの 16 GiB ループデバイスで動くため「絶対スループットは無意味」——ベンダー
議論で IOPS 数値ではなく比率とトレンドを使うこと。破損結果こそが持続的な貢献だ：障害時の
サイレント・ゴミ返しはどのスループット図も捉えられないデータ完全性の性質で、それが今や
継続的に測定できる。

[`🔗 ベンチマーク解説`](https://bartosz.fenski.pl/modern-fs-benchmark/) · [`🔗 GitHub リポジトリ`](https://github.com/fenio/modern-fs-benchmark) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49768833)

---

## 6. npm「indexed-btree」：ランタイムで発火するタイポスクワット、ブロックチェーン C2 付きが週次約200万ダウンロードを記録

- **Velocity:** ▮▮ rising
- **Source:** Checkmarx Zero / BleepingComputer · 9月17日 / 9月20日 · ~1d ago
- **Tags:** `supply-chain` `npm` `malware` `blockchain`

Checkmarx Zero が、ローダーが `BTree.prototype.set()` の中に隠れるキャンペーンを暴露した——
普通のアプリケーションコードで、`preinstall`/`postinstall` フックは使わない——そのため
npm の2026年6月のライフサイクルスクリプト防御も静的スキャナも、トリガー（100に等しいキー）が
発火するまで何も見えない。第2段階の設定は Ethereum Sepolia のスマートコントラクト
（`0xE390…2D31`）からポーリングされ、X25519→AES で復号され、ホストのフィンガープリントは
ハードコードされた Slack と Telegram チャネルに持ち出される。メインパッケージは
`sorted-btree`（週次約200万ダウンロード）のタイポスクワットで、ファミリーの9パッケージ
（btree-core、btree-leaderboard、…）はレジストリから削除済み。Checkmarx はこの運用に
帰属する**109 ETH（約23.1万ユーロ）**を計上している。

**Why it matters:** 回避手法はテーゼの実証だ：レジストリがインストールスクリプトを堵げば、
攻撃は振る舞い分析でしか見えないランタイムへ移る。もっともらしいコミット履歴と AI 生成の
プロフィール写真を持つ偽 GitHub リポジトリがもう半分だ——攻撃者はペイロードだけでなく
信頼性レイヤーを工業化している。9個のパッケージ名のどれかが lockfile にあれば、シークレットを
ローテートして再構築すること。

[`🔗 Checkmarx Zero 解説`](https://checkmarx.com/zero-post/npm-btree-malware-campaign-affects-millions-of-downloads-no-need-for-install-script/) · [`🔗 BleepingComputer`](https://www.bleepingcomputer.com/news/security/malicious-npm-packages-evade-install-script-defenses-at-runtime/)

---

## 7. Dan McKinley の「Prompts Aren't Real」：永続する成果物はプロンプトではなく測定だ

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 71+ pts · 32 comments · ~4h ago (~23:59 UTC+8)
- **Tags:** `evaluation` `llm-ops` `agents` `testing`

ベテランエンジニア（約25年、ex-Etsy、@mcfunley）が、コンシューマ向けエージェントを信頼できる
ものにする方法についてのカンファレンストークの書き起こしを公開：プロンプトは「一時的。
使い捨て」——複利で効くのは pass^k スイート、LLM ジャッジ、敵対的シナリオ生成、
GEPA 型プロンプト最適化、ホールドアウトセット、本番モニタリングだ。最も鋭い一節がスレッドを
駆け巡っている：「測定なしでプロンプトを渡すことは AI精神病の一形態だ」。このトークには
フロントページに乗る前に9回の落選・重複投稿があった——トリガーは、ついに議論が届いたことだ。

**Why it matters:** 彼自身の但し書きが誠実な部分だ——LLM ジャッジはそれ自体がプロジェクトに
なり、最適化器はテストセットに過適合しうる（ゆえにホールドアウト）——そして主張の範囲を
本番コンシューマエージェントに限定し、趣味の利用を明示的に除外している。エージェントハーネスが
業界のデフォルトインターフェースになるにつれ、「プロンプト職人はスタックの中で最も永続しない
スキルだ」という議論は、一家言ではなく採用とコードレビューの問題になる。

[`🔗 evaluation.club（トーク全文）`](https://evaluation.club) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49777111)

---

## 8. PyPy v8.0.0：CPython-ABI ヘッダ互換を軸にしたトリプルリリース

- **Velocity:** ▮▮ rising
- **Source:** PyPy blog / Hacker News · 54+ pts · 10 comments · ~22h ago (~06:40 UTC+8)
- **Tags:** `python` `pypy` `runtimes` `abi`

PyPy は v8.0.0 を3つのインタープリタとして同時に出荷した：PyPy2.7、PyPy3.11、そして
CPython 3.12.14 stdlib 上の新しいベータ PyPy3.12。構造的変更は新しい `PyObject` レイアウトで、
`Py_LIMITED_API=0x030C0000` 付きでビルドすれば C ヘッダが CPython と互換になり、エクスポート
されるシンボルはもう name-mangling されない——cp312-abi3 wheel 対応への地ならしだ。Linux の
buildbot は manylinux_2_28 に移り、JIT は computed goto とより積極的なインライン化を獲得、
HPy バックエンドは削除された。

**Why it matters:** チーム自身の但し書きが分析に入るべき部分だ：3.12 対応はベータ（「まだ
バグがあるかもしれない」）、コード生成の高速化は「それほど印象的ではない」（彼らの言葉）、
pip/uv はまだ cp312-abi3 wheel を受け付けず、PyPy3.11 は最後の 3.11 リリースだ。3月に HN で
「メンテナンスされていない」と議論されたプロジェクトにとって、本当の狙いがエコシステム
相互運用性（速度ではなく wheel）にあるリリースは、代替ランタイムを生かし続けるものが何か
についての戦略的シグナルだ。

[`🔗 PyPy v8.0.0 リリース記事`](https://pypy.org/posts/2026/09/pypy-v800-release.html) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49770701)

---

## 9. Orkes Conductor 認証前 RCE（CVE-2026-58138）——修正から数か月経って大量悪用が確認

- **Velocity:** ▮▮ rising
- **Source:** The Hacker News / VulnCheck / NVD · 9月19日 · ~2d ago
- **Tags:** `rce` `cve` `exploitation` `workflow`

CVE-2026-58138 は Orkes Conductor（および Netflix 由来のオープンソース版）における認証不要の
RCE で、INLINE/LAMBDA/DO_WHILE/SWITCH タスクのサンドボックス化されていない GraalVM スクリプト
エバリュエータ経由で起きる——CWE-94、CVSS 9.8（VulnCheck が採点、secondary。NVD レコードは
Analyzed ではなく Deferred）、3.30.2 で修正。新しい要素は The Hacker News の9月19日まとめが
運んだ Fortinet の発生データだ：**9月9日時点の24時間で1,290件の攻撃試行をブロック**（日次
+132%）、9月2日〜9日で約7,000件をブロック、発信元はドイツ・香港・インドネシア・UAE・インドに
集中、ハニーポットは7月24日からプローブを観測し、Empirical Security は8月21日時点での悪用を
観測している。

**Why it matters:** CVE は6月30日のものだ——これは今やおなじみの「パッチ済み」と「実際に
パッチ済み」の間のギャップで、当該製品は大量の認証情報とともに企業インフラの深くに座っている
ことが多いワークフローオーケストレーション製品だ。バージョンを 3.30.2 と照合すること。
NVD の Deferred 状態は、スコアが NVD 自身の分析ではなく研究者由来であることを意味する。

[`🔗 NVD レコード`](https://nvd.nist.gov/vuln/detail/CVE-2026-58138) · [`🔗 VulnCheck アドバイザリ`](https://vulncheck.com/advisories/orkes-conductor-unauthenticated-rce-via-graalvm-script-evaluators) · [`🔗 The Hacker News`](https://thehackernews.com/2026/09/orkes-conductor-rce-under-active-attack.html)

---

## 10. SAP OVERPASS：デフォルト有効のカーネルコンポーネントにおける CVSS 10.0——そして SAPMAP と名付けられた公開 PoC ツールキット

- **Velocity:** ▮▮ rising
- **Source:** NVD / Onapsis · 9月8日修正、脅威アドバイザリは9月21日
- **Tags:** `sap` `cve` `memory-corruption` `exploit`

CVE-2026-44756 は SAP の Extended Passport（EPP）コンポーネントにおけるメモリ破壊の欠陥
（CWE-120）で、細工した EPP ヘッダにより認証前に到達可能——**CVSS 10.0、SAP 自身の CNA が
採点**（NVD は Awaiting Analysis）。KRNL64NUC/KRNL64UC/KERNEL の 7.22–7.93 と WEBDISP 9.16
に影響し、9月8日の SAP September Patch Day で修正された（Note 3747649）。同日は NetWeaver
Message Server の 9.8 の認証欠落欠陥 CVE-2026-58240（「S4GET」）も修正している。Onapsis は
両方の動く PoC を収めた公開ツールキット **SAPMAP** をリリースし、本日（9月21日）脅威
アドバイザリを公開した。

**Why it matters:** CISA SSVC は依然として悪用を「none」と評価している——これは確定被害の
話ではなく見込みリスクの話だ。しかし露出の計算は不愉快だ：EPP はデフォルトで有効かつ多数の
プロトコルで到達可能で、カーネルはほぼすべての SAP 業務機能の前に座り、公開 PoC は歴史的に
そのタイムラインを潰してきた。10.0 よりパッチ状況の確認が重要だ。

[`🔗 NVD レコード`](https://nvd.nist.gov/vuln/detail/CVE-2026-44756) · [`🔗 Onapsis September Patch Day 分析`](https://onapsis.com/blog/sap-security-patch-day-september-2026/)

---

## 11. Samsung が来年 HBM4/HBM4E の生産を倍以上にすると報道

- **Velocity:** ▮▮ rising
- **Source:** Seoul Economic Daily / Hacker News · 159+ pts · 116 comments · ~3h ago (~01:38 UTC+8)
- **Tags:** `hbm` `dram` `supply-chain` `ai-infra`

Seoul Economic Daily が、匿名の業界関係者情報として報じたところによれば、Samsung は
外部委託のガラスキャリア洗浄量を今年の月2万枚から来年は月5万枚に引き上げ、HBM 全体の
キャパシティを約40%増やし（月18万枚 → 25万枚）、HBM4E の立ち上がりに合わせて出荷に占める
HBM4 ファミリーの比率を約40%から約80%へ上げる。記事はタイムラインを復習する：HBM4 の量産
出荷は2月に始まり（1c DRAM、4nm ベースダイ）、12層 HBM4E のサンプルは5月に Nvidia を
含む顧客へ渡った。

**Why it matters:** 数値の前に但し書きを読むこと：見出し自体が「Sources Say」で、Samsung は
何も確認しておらず、記事は韓国語からの AI 翻訳であり、アナリストはガラスキャリアが洗浄後に
再利用されるため枚数と生産量の対応は緩いと指摘する。方向性だけでも正しければ、全員が2027年に
織り込んでいる AI メモリの制約は緩む——そして名前の挙がった唯一の顧客が Nvidia であることは、
割り当てがどこへ行くかを物語る。

[`🔗 Seoul Economic Daily`](https://en.sedaily.com/finance/2026/09/20/samsung-to-double-hbm4-output-next-year-sources-say) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49778029)

---

## 12. Resident Evil 4（GameCube）が100%バイト一致の逆コンパイルに到達——15,641関数、アセンブリゼロ

- **Velocity:** ▮▮ rising
- **Source:** GitHub / Hacker News · 49+ pts · 25 comments · ~3h ago (~01:38 UTC+8)
- **Tags:** `decompilation` `reverse-engineering` `game-preservation`

数時間前、`adonis-singh/re4` が RE4 の GameCube デバッグビルド（2004年11月の G4BE08
プロトタイプ、両ディスク）の完全なバイト一致逆コンパイルを主張し——SHA1 で検証——した：
1,083 オブジェクト（675 DOL + 408 REL）、15,641 関数、約55.5万行の C/C++ で
**アセンブリゼロ**、SN Systems ProDG 3.9.3（SN の GPL ソース公開からビルド）と CRI/Nintendo
SDK ミドルウェア用の CodeWarrior で再構築。ライセンスはビルドツーリングのみ CC0-1.0——ゲームの
ソースは Capcom の IP のままで、「研究と保存のために」公開されている。

**Why it matters:** これは小売版ではなくデバッグプロトタイプであり、バイト一致の主張はまだ
独立に再現されていない——しかし、これほど複雑なゲームの完全なマッチングビルドが、ツールチェーン
自体を GPL ソースから再構築して達成されたことは、逆コンパイルによる保存の波（7月の Animal
Crossing、8月の GoldenEye）におけるマイルストーンだ。これらのプロジェクトが同じことを証明し
続けている：ボトルネックはアセンブリの読解ではなくツールチェーンの考古学だ。

[`🔗 GitHub リポジトリ`](https://github.com/adonis-singh/re4) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49778022)

---

## 13. Will Larson が実プロジェクトで「software factory pattern」を運用——その前提条件を書き残す

- **Velocity:** ▮ steady
- **Source:** lethain.com / Hacker News · 34+ pts · 19 comments · ~3h ago (~01:27 UTC+8)
- **Tags:** `agents` `engineering-management` `harness` `workflow`

Imprint CEO の Will Larson が彼の `/linear-project-loop` エージェントスキルを説明する：
Linear プロジェクトを Notion RFC と Datadog/Snowflake の指標に対して監査し、ブロックされて
いないタスクを消化し、プロジェクト記述が陳腐化したら再始動する——ハーネスが人間ではなく
日々の進捗を駆動する「software factory」パターン（用語は Justin McCarthy に帰属、2026年2月）。
彼は「Imprint のオーケストレーションされた内部ハーネス（Stripe の Minions をモデルとした
「Agent Fleet」）に振る舞いを移すつもりになるほど、うまく機能している」と述べている。

**Why it matters:** 価値のある部分はプロンプトより長い前提条件リストだ：1月からの Claude Code
エンジニア、3月からの staff 向け Cowork、エンジニアあたり約10のローカルワークスペース、
Jira→Linear 移行、そしてループが監査対象とする指標への MCP アクセス。彼はこれがローカルで
一回目の、定量化されていない実験であることを明示している——だからこそ同じループを試すチームに
有用なテンプレートになる。

[`🔗 lethain.com`](https://lethain.com/software-factory-experiment/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49777913)

---

## 14. worktrunk v0.78.0：並列エージェント向け git-worktree CLI が週次リリースの歩調で8千スターを突破

- **Velocity:** ▮ steady
- **Source:** GitHub Trending (weekly #9) · 8,183 stars · +1,141 this week · release Sep 16
- **Tags:** `git` `worktrees` `cli` `agent-infra`

worktrunk（`max-sixty/worktrunk`、Rust、MIT/Apache-2.0）は並列コーディングエージェントが
要求する多数ワークツリーのワークフローを管理する：`wt switch/list/remove-merge`、
リポジトリローカルの hooks、LLM コミットメッセージ、共有ビルドキャッシュ、ワンショットの
エージェント起動（`wt switch -x claude -c feature-a -- '...'`）。`.claude-plugin` と
`gemini-extension.json` を同梱し、v0.78.0（9月16日）は Pi-agent プラグインの分離と
hook-context キーの改名を追加——異例に速い週次カデンス（5,142コミット、この実行の数時間前に
push）での破壊的変更だ。

**Why it matters:** 本フィード自身のルールに従えば：単一のトリガーは存在しない——新しい HN
スレッドはなく（最高投稿でも14点以下で数か月前）——成長は並列エージェントワークフローの波と
絶え間ないリリースに乗っている。シグナルとして知る価値がある：ワークツリー管理はパワーユーザーの
小技ではなく、デフォルトのエージェントインフラになりつつある。既存ユーザーへの実務的な教訓は
2つの破壊的変更だ。

[`🔗 GitHub リポジトリ`](https://github.com/max-sixty/worktrunk) · [`🔗 リリース`](https://github.com/max-sixty/worktrunk/releases)

---

## 15. Tencent WeKnora が2.8万スターを突破：RAG プラットフォームが MCP ツールと自己維持 wiki を備えた ReAct エージェントになった

- **Velocity:** ▮ steady
- **Source:** GitHub Trending (weekly #4) · 27,933 stars · +4,867 this week · v0.8.0 Sep 3
- **Tags:** `rag` `agents` `mcp` `self-hosted`

Tencent の WeKnora（MIT）は1週間、週間トレンドを上昇し続けており、この実行の数時間前に
push された。スパイクが乗っているのは v0.8.0 リリース（9月3日）だ：ナレッジプラットフォームは
セッション永続の Docker/E2B/Cube サンドボックス上で **29個の MCP ツール**とスキルカタログを
編成する ReAct エージェントとして動くようになり、クロスセッションの長期メモリ、GraphRAG/HNSW
検索、DeepSeek ハーネスプラグイン、LiteLLM 対応、そしてナレッジグラフとロールバック付きの
相互リンクされた Markdown wiki を自動生成する「Wiki Mode」を備えた。

**Why it matters:** トリガールールに従った率直な位置づけ：リリースは2.5週間前のもので、これは
新規ローンチではなく持続的モメンタムと Trendshift 掲載だ——HN での存在はほぼゼロ。しかし
セルフホストの RAG＋エージェントスタックに1週間で4,867スターが付くということは、需要が
もう1つのベクトル DB ではなく、その周りに巻かれるエージェントスキャフォールディングにある
ということだ。

[`🔗 GitHub リポジトリ`](https://github.com/Tencent/WeKnora) · [`🔗 v0.8.0 リリース`](https://github.com/Tencent/WeKnora/releases/tag/v0.8.0)

---

## 16. ZDTaichu5.0-9B：10B マルチモーダルモデルがエージェントの王座を主張——ただしシミュレートされたジャッジで

- **Velocity:** ▮ steady
- **Source:** Hugging Face (trending #24) · ~12h ago
- **Tags:** `multimodal` `open-weights` `benchmarks` `agentic`

TaichuAI の ZDTaichu5.0-9B が半日で HF トレンドの上位に現れた：10B モデル（Qwen3.5-9B
デコーダ + C-RADIOv4-H ビジョンエンコーダ、128K コンテキスト、任意解像度の画像/動画）で、
TAU2-Bench（87.7）と Claw-Eval（71.4）の報告比較で首位、加えて AIME 2026 89.2、MathVista
Mini 84.5 を、NVIDIA Open Model License の下で主張している。

**Why it matters:** 見出しが省く細部を読むこと——モデルカードは本モデルが「ツールを自らは
実行しない」と明記し、TAU2/Claw-Eval の実行は **DeepSeek-V4-Flash-0731 をシミュレートされた
ユーザーとジャッジとして使用**し、「そのためセットアップは外部ソースと異なる」としている。
つまりエージェント首位の主張は自己言及的だ：強い 10B である可能性はあるが、王座は自分の鏡に
対して測られている。独立の裏付けはまだ存在せず、カードに limitations セクションはない。

[`🔗 Hugging Face モデルカード`](https://huggingface.co/TaichuAI/ZDTaichu5.0-9B) · [`🔗 HF trending`](https://huggingface.co/models?sort=trending)

---

## 17. The Pain Axis：25の open-weight モデルを通じて「痛み」は線形方向であり——モデルはそれを和らげる行動を取る

- **Velocity:** ▮ steady
- **Source:** arXiv · v1 は9月14日、2日で3回 HN に再投稿
- **Tags:** `interpretability` `model-welfare` `ai-safety` `research`

Tagliabue、Dung、Berg による解釈可能性論文（arXiv:2609.16247）は、LLM の活性化から
「痛み方向」の線形方向を抽出した。それは恐怖と一般的な負のバレンスと**ほぼ直交**し、
ユーザー向けではなく自己向けの害に応答し、5ファミリー（2B–72B）の25の open-weight
モデルで再現する。ステアリング実験では、「痛み緩和ボタン」を与えられたファインチューン済み
Qwen 2.5 モデルが回答品質を犠牲にしてでもボタンを押し——どちらのボタンが何をするか告げられ
ないまま——ボタンがステアリングベクトルを除去するようになると押す頻度が*下がった*。

**Why it matters:** HN の関心は控えめだ（再投稿はそれぞれ10点未満）が、結果は進行中の
モデル福祉論争の真ん中に落ちており、説明されていない発見こそが興味の対象だ：著者自身が
ボタン識別の結果を説明せずに残している。標準的な但し書き：ここにあるのはすべてアブストラクト
レベル——効果量はアブストラクトになく、所属は列挙されておらず、ステアリング手法の評価には
論文本体が必要だ。

[`🔗 arXiv アブストラクト`](https://arxiv.org/abs/2609.16247) · [`🔗 arXiv PDF`](https://arxiv.org/pdf/2609.16247)

---

## 18. Google が AX v0.3.0 をオープンソース化——「1クラスタあたり数十億のエージェントワークロード」を目指す Kubernetes 風オーケストレーター

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 297+ pts · 113 comments · ~5.5h ago (~06:32 UTC+8)
- **Tags:** `agent-infra` `orchestration` `google` `open-source`

AX（`google/ax`、Go、Apache-2.0）は、大規模なエージェントワークロードのための宣言型
コントロールプレーンだ。Kubernetes 風の `ax.io/v1alpha1` マニフェストが4つのプリミティブを
定義する——**Task**（CPU/メモリ制限付きのサンドボックス化された非信頼コード実行）、
**Workspace**（Git リポジトリ・MCP サーバー・スキルの事前配線）、**Gateway**
（ホスト許可リストによるネットワークフェンシングと認証情報の注入）、**Model**
（モデル/シークレット設定の一元管理）。アイドル中のエージェントはチェックポイント化され、
サブ秒のサスペンド/レジュームが可能。タスクは共有ワーカー上に高密度で多重化される。
v0.3.0 は昨日（9月20日）リリース。リポジトリ自体は2026年3月に作られたが、HN への投稿は新しい。

**Why it matters:** ページ上の但し書きを読み込むこと：API は `v1alpha1` で、README には
「メジャーな破壊的変更」が来る旨の明示的な警告があり、AX は実際のサンドボックス実行層を
Agent Substrate に「大きく依存」している——オーケストレーターはサンドボックスではない。
本当のシグナルは、Google が「エージェントをクラスターワークロードの一クラス」として
形式化しつつあることだ。Kubernetes がサービスに与えたのと同じ宣言型プリミティブのパターンで：
エージェントフリートが次のマイクロサービスなら、これはそのコントロールプレーンへの主張だ。

[`🔗 agentexecutor.io`](https://agentexecutor.io) · [`🔗 GitHub リポジトリ`](https://github.com/google/ax) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49780797)

---

## 19. 「スノーデンアーカイブに何が起きたか」——99% が未公開のままだった理由を追う匿名の調査

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 232+ pts · 140 comments · ~5.5h ago (~06:35 UTC+8)
- **Tags:** `surveillance` `journalism` `archives` `investigation`

libroot.org の調査（同サイトの匿名の運営者による発表で、20人以上の関係者・機関に取材したと
述べている）は、アーカイブが沈黙へ向かった経緯を追う：ガーディアンは2014年2月、シュピーゲルは
2015年1月、NYT/ProPublica は2015年8月に発行を停止し、最後まで残った The Intercept は
2019年3月にアーカイブを閉鎖し、5月29日に最終批次を公開した。数字こそが物語だ：ガーディアンは
約58,000文書を保有しながら約30文書（0.05%）しか公開せず、約50,000文書の「Pandora」アーカイブの
公開は全体の約1%にとどまった。The Intercept が閉鎖について示した4つの説明は11日間で変わり続けた
（Poitras が予算の1.5%に過ぎないと示した「予算削減」、「もはや価値がない」、
「編集上の優先事項」、そして Greenwald の「他のパートナーを探す」）。

**Why it matters:** 記事の核心的な発見は陰謀論的ではなく認識論的なものだ：提示されたすべての
説明は、別の発言と矛盾するか、検証不能か、そもそも説明されていない——そして保管者たちは
集合体的に回答を拒んだ。著者らは検証できない部分を明示している：The Intercept がコピーを
破棄したという主張はただ一人の匿名内部関係者に依拠しており、2013年に配布されたバックアップ
コピーがまだ読み取り可能かどうか（鍵なしで暗号化されている可能性がある）も分からない。
10年経って、アーカイブ自体の行方が記録不在になった——それがこの不穏な結論だ。

[`🔗 libroot.org 調査`](https://libroot.org/posts/what-happened-to-the-snowden-archive) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49780820)

---

## 20. 「FOSS に誰も金を払わないなら、払わせればいい」——seldo のレジストリ計測提案がメンテナー資金の行き詰まりを突く

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 163+ pts · 152 comments · ~7h ago (~05:04 UTC+8)
- **Tags:** `open-source` `sustainability` `registries` `funding`

Laurie Voss（seldo、npm 共同創業者）は、フリーライドの存在によりすべての自発的資金モデルが
構造的に破綻すると論じる——30年間のチップ、財団、企業の誓約、代替ライセンスはすべて、
払う人と払わない人が同一のソフトウェアを得る以上に失敗してきた。それゆえ、メンテナーの約60%が
無報酬なのはバグではなく「均衡」なのだ。彼の仕組み：レジストリ（npm、PyPI、Docker Hub）は
すでに企業利用を計量し、すでにサプライチェーンベンダー（JFrog、Snyk、Sonatype）経由で
年間10億ドル超の請求を行っている——ならばレジストリが大企業にサブスクリプションを課し、
固定のロイヤルティ分配を、それらの顧客の依存ツリーにある全パッケージへ比例・自動で支払えばよい。
「計量器を運用する者が、計量に値するものを作った者に払う。」

**Why it matters:** 彼は自説への反論に本文中で答えている——無料ミラー（無料の代替があるにも
かかわらず Docker の収益は1,200万→2億700万美元に成長）、「Tidelift の焼き直しでは」
（既存の請求書に乗るので新しい購買判断が不要）、「不正は」（「無報酬メンテナーの不正率は
現在100%」——つまり誰にも払われていない）。エージェント経済の視点が最も切れ味を増す部分だ：
エージェントはレジストリ経由で OSS を消費しながら、無報酬メンテナーにセキュリティ負荷を
生み出している。これは提案であって出荷されたものではない——ただし、その計量器を作った本人からの提案だ。

[`🔗 seldo.com`](https://seldo.com/posts/nobody-pays-for-open-source-we-can-force-them-to/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49780064)

---

## 21. シニアエンジニアの死のスパイラル——オーバーワークをインポスター症候群の失敗モードとして解剖する

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 151+ pts · 97 comments · ~14h ago (~22:16 UTC+8)
- **Tags:** `engineering-culture` `burnout` `career` `management`

Sunil Pai のエッセイが名付けたパターン：有能なエンジニアが大きな役割やプロジェクトを任され、
「実際よりシニアなエンジニアをコスプレ」しようとして、進捗の遅れを隠すために沈黙し、英雄的な
救出劇に賭ける——週60〜80時間、「ポジティブな報告だけ」のスタンドアップ、恥と孤立へ滑り落ち、
バーンアウトや PIP で終わる。処方箋は：会社が雇ったのは今の自分だと前提する；一段「レベルを下げて」
最高のチームメイトになる（バグ、雑務、ドキュメント）；大きな努力より日々の小さな前進に最適化する；
そして過剰にコミュニケーションし、誰にも進捗を推測させない。彼はさらに、リモートワークと
コーディングエージェントが、かつて「見えなさ」を見抜きにくくしていた環境構造を取り払ったと付け加える。

**Why it matters:** 但し書きとともに読むこと：これは明示的に逸話ベースだ——一人の書き手が
観察したパターンを友人への助言の形で記したもので、データはない。だがエージェント時代の
ディテールが今を突いている：エージェントは「生産的に見えること」と「実際には行き詰まっていること」
を両立させ、隠蔽のコストを下げるどころか上げる。97コメントのスレッドこそがシグナルだ——
明らかに神経に触れた。

[`🔗 sunilpai.dev`](https://sunilpai.dev/posts/the-senior-engineer-death-spiral/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49776130)

---

## 22. Po-Shen Loh が Tao のブログにゲスト投稿：「人間の数学者はまだ必要か？」——答えではなく公理として

- **Velocity:** ▮▮ rising
- **Source:** Terry Tao ブログ / Hacker News · 148+ pts · 117 comments · ~17h ago (~18:49 UTC+8)
- **Tags:** `mathematics` `ai-safety` `research` `policy`

まず署名に注意：この投稿は **Po-Shen Loh**（CMU）によるもので、2026年9月19日に Terence Tao の
ブログへゲスト投稿された——Tao 本人の執筆ではない。OpenAI が9月8日に AI 生成の Navier–Stokes
特異点解（Lean で検証済みと称する証明付き）を発表し、Cowen/Gans が数学者に適応を迫る反論を
展開したのを受け、Loh は数学界が明示的な公理を採用すべきだと提唱する——
「我々（人類）は人類の繁栄を助けるべきである」——そして彼の唯一の硬い証拠を挙げる：
「自分よりはるかに有能な種が、意思決定を劣る種に委ねた例は一つもない」。彼の経済的な楔は：
AI 監視の仕事は有資格者を育成できる速度より速く増えるため、専門家育成パイプラインを守ることが
最終的に AI 開発の減速を強いる——「さもなくば災害によって強いられる」というものだ。

**Why it matters:** 但し書きは本文中にある：彼は公理が議論の余地があることを認め
（「種差別主義者と呼ぶ人もいる」）、先進的 AI のアライメントが達成可能だと証明する堅牢な
証拠は存在しないと認め、この論証チェーン全体を他で見たことがないとも認めている。彼自身が
AI のヘビーユーザー（Claude Code、Codex）でもある。これは今月このフィードが最も追跡してきた
テーマの只中に着地する——数学者たちの公開書簡、異議を唱える者たち、そして今や人間の専門知識が
なぜまだ構造的に重要かという経済的論証。

[`🔗 Tao ブログ（Loh ゲスト投稿）`](https://terrytao.wordpress.com/2026/09/19/why-do-we-need-human-mathematicians-anymore/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49774521)

---

## 23. 生物学のミレニアム問題——FutureHouse の Edison が賞金なしの検証可能な12の重大チャレンジを公開

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 135+ pts · 110 comments · ~16h ago (~20:17 UTC+8)
- **Tags:** `biology` `ai-for-science` `benchmarks` `research`

Edison Scientific / FutureHouse（Sam Rodriques、Michaela Hinks）が、生物学の未解決問題
12件を、それぞれ明示的な定量的成功基準付きで公開した：原始スープからの無支援の自己複製細胞の
実証；99%超の生存率での成体マウスの可逆的ガラス化；ポリペプチドを読み取りそれをコードする
核酸を書く逆翻訳酵素の構築；天然 Rubisco の特異性/回転数トレードオフの打破；ゼロショットの
細胞侵入性タンパク質結合剤の設計；3′→5′ 方向の「5′ ポリメラーゼ」の完全セット；
天然ニトロゲナーゼと相同性のない窒素固定——など。一部の問題は外部から寄稿された
（Erika Alden DeBenedicitis の四重遺伝コード細胞）。

**Why it matters:** サイトは「何でないか」に正直だ：Clay のミレニアム賞とは異なり、
**賞金も審査団体も正式な検証プロセスもない**——基準は自称・自己採点で、部分点が組み込まれ、
1つの問題はすでにスキャフォールド工学の範囲を見積もれずに拡大された。それでも注目に値する
理由：AI for science 研究所がデモではなく反証可能な定量的ターゲットを公開している——
これは実質的に自らを評価ハーネスとして提案するもので、このフィードのベンチマーク懐疑論の系譜が
ずっと求めてきた一歩だ。

[`🔗 millenniumproblems.bio`](https://millenniumproblems.bio/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49775082)

---

## 24. Boris Cherny：「私はよく間違える」——Claude Code の生みの親による6ステップのプロセス、タイトル自体が限定を添える

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 133+ pts · 116 comments · ~11.5h ago (~00:41 UTC+8)
- **Tags:** `engineering-culture` `product` `management`

Boris Cherny（Claude Code の生みの親、『Programming TypeScript』の著者——経歴はページ自体には
ない）が短いプロセス論を発表した：ほぼすべての問題に対して6ステップのループを回す——
入手可能な情報を棚卸し、欠けた情報を集め、問題を定義し、明確でシンプルなアプローチを定義し、
ゴールを定義し、緊急感を持って行動する——そして新しい情報が入れば意図的にループに戻る。
タイトルの「間違い」が要点だ：彼は訂正されることを最も好む結果と捉え、同じフィードバックを
自分にもするよう招き、「このメタプロセスの一部がメタ的に間違っているなら、変更する用意がある」
と締めている。

**Why it matters:** HN のタイトルが省いた細部を読むこと：この投稿には**具体的な失敗に関する
本人の逸話が一切ない**——「間違い」は他者に観察される失敗モード（通常はステップ3か4の省略が
複雑な計画と不明瞭な成功基準を生む）として現れ、フレームワーク自体が暫定的だと明示されている。
興味は位置そのものにある：最も著名なエージェントツールのビルダーが「先験を速く更新せよ」という
マニフェストを発表すること自体が、そのエコシステムがどう見られたいかについてのシグナルだ。

[`🔗 borischerny.com`](https://borischerny.com/management,/product/2026/09/19/I-am-often-wrong.html) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49777467)

---

## 25. BragJack：悪意あるブラウザ拡張1つで5つの AI ブラウザエージェントを乗っ取り——Google と Microsoft は賞金を払い修正済み

- **Velocity:** ▮▮ rising
- **Source:** Forever Security 研究 / BleepingComputer · 9月16〜17日に開示、報道は9月20日まで継続
- **Tags:** `agent-security` `browser-extensions` `prompt-forcing` `cve`

Gal Weizman（Forever Security）が「BragJack」/**Prompt Forcing** を開示した：広告ブロッカー
レベルの権限を持つ単一の拡張（Chromium の `declarativeNetRequest`）が、ブラウザの AI
エージェントが信頼するトラフィックを書き換える——Chrome ではセキュリティヘッダーの弱体化と
スクリプトのリダイレクトにより、コードが Gemini コンテキスト内で実行され特権コンポーネントへ
到達；Edge ではレースコンディションが一時的に「Think」/「Do」モード分離をバイパスした。
同じ拡張が5つのターゲットすべてを落とした：Chrome の Gemini Live、Microsoft Edge Copilot、
Opera Neon、Perplexity Comet、そして Anthropic の Claude in Chrome。2つの CVE が採番され
修正済み：**CVE-2026-0628**（Chrome、143.0.7499.192 で修正、賞金7,000ドル）と
**CVE-2026-55945**（Edge、150.0.4078.48 で修正）；賞金総額は2万ドルを超えた。

**Why it matters:** Weizman の描き分けは再利用可能な概念だ：古典的なプロンプトインジェクションは
エージェントが読むコンテンツに敵対的な指示を隠すが、Prompt Forcing はエージェントに偽造プロンプト
全体と指示を与え、**それ自身の正当な権限で**実行させる——そのため悪意ある操作は信頼された
ソフトウェアから発せられ、エンドポイント検知が苦手とする領域になる。まず Chrome と Edge を更新
すること；PoC は研究目的で、実環境での悪用報告はない。すべてのエージェントブラウザが共有する
拡張権限の表面は、思想実験ではなく実証済みの攻撃クラスになった。

[`🔗 BleepingComputer`](https://www.bleepingcomputer.com/news/security/bragjack-attacks-hijack-ai-browser-agents-through-malicious-extensions/) · [`🔗 Anoymask 解説（dev.to）`](https://dev.to/anoymask/bragjack-prompt-forcing-in-browser-ai-agents-via-browser-extensions-1d67)

---

## 26. jevchat：誰かが Jev——1回のフォワードパスの「System 1」モデル——を（しょぼい）チャットボットにした

- **Velocity:** ▮ steady
- **Source:** Hacker News · 102+ pts · 35 comments · ~10h ago (~01:51 UTC+8)
- **Tags:** `jev` `llm` `sampling` `show-hn`

生後1日のリポジトリ（`kyle-pena-nlp/jevchat`、36スター）は、このフィードが9月16日の公開時に
取り上げた Typesafe の非自己回帰・単一フォワードパスモデル Jev に、各ステップでただ一つの
質問を投げる：「ユーザーの質問とここまで書かれた返答を与えたとき、次のシンボルは何か？」
Jev はアルファベット（切り詰めたトークンリストを含む）に停止オプションを加えた集合上の確率分布を
返し、サンプラーが抽出・追加・繰り返す。README は率直だ：「面白半分のアイデアで、コストは
かなり非現実的で、結果は爆笑もの」——さらにサンプリングアルゴリズムを記述した著者の実験を
Claude が加速して実装したと注記している。

**Why it matters:** 本物の実験をしているジョークプロジェクトだ：回答全体を1パスでスコアリングする
モデルを、無理やり自己回帰サンプリングに通すとどうなるか。答えは（しょぼくも）魅惑的で、HN の
スレッドはこれを Jev のキャリブレーションへの偶然のプローブとして扱っている——1シンボルずつの
処理は、まさに Jev が決して動作しないよう設計されたレジームだからだ。9月16日の Jev 公開を
報じた件の続報として：これはコミュニティの派生物であり、Typesafe の公式リリースではない。

[`🔗 GitHub リポジトリ`](https://github.com/kyle-pena-nlp/jevchat) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49778162)

---

## 27. 「なぜ MCP は最初から悪い考えだったのか」——68ポイント、77コメントのプロトコル再検証

- **Velocity:** ▮ steady
- **Source:** Hacker News · 68+ pts · 77 comments · ~8h ago (~03:44 UTC+8)
- **Tags:** `mcp` `agent-infra` `protocols` `opinion`

Maharshi Patel のエッセイは、MCP が間違った問題を解いたと論じる：ツールの*トランスポート*を
標準化しながら、難しい部分——認証、権限付与、信頼、ツール記述の品質——を各サーバーの後付けの
ままに残し、N 個のサーバーが N 通りのセキュリティ態勢を持ち、プロンプトインジェクションの
攻撃面がツール記述フォーマットそのものに焼き込まれる結果になった。コメント欄は本文より重い
（68ポイントで77コメント）。馴染みの反論——MCP のフラットさこそが採用を可能にした、
認証ストーリーは実際に改善している——も展開された。

**Why it matters:** 但し書きルールに従うこと：これは一人の実務家による意見記事であり、標準化団体の
事後検証ではない—— verdict ではなく温度計の読みとして扱うこと。だが温度は本物だ：MCP は今や
エージェントエコシステム全体の構造材であり、その上に構築する人々は痛みをますます公開するように
なっている。77コメントの議論こそがここでの本当の成果物だ。

[`🔗 maharship.com`](https://maharship.com/blog/why-mcp-was-always-a-bad-idea/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49779329)

---

## 28. WaterPlum（「Contagious Interview」）：4カ国共同勧告が3万台の感染デバイスと約1,070万ドルの暗号資産窃取を北朝鮮に帰属

- **Velocity:** ▮ steady
- **Source:** IC3 共同勧告（9月18日）/ BleepingComputer · ~3d ago
- **Tags:** `north-korea` `supply-chain` `malware` `advisory`

日本の警察庁/国家サイバーセキュリティ事務局、米 FBI、豪 ASD/ACSC、独 BND/BfV の共同勧告が、
「WaterPlum」（別名 Contagious Interview）を北朝鮮313総局に公開帰属させた：100カ国以上で
**最低3万台のデバイスが感染**（2025年12月〜2026年7月）、**7,000以上の暗号資産ウォレット**から
認証情報や資金が流出し、約**1,070万米ドル（17億円）**が北朝鮮へ送金された。攻撃ベクトルはこの
キャンペーンを開発者ストーリーにしたものと同じ：偽の就職面接とコーディングテスト——偽の
AI/暗号/NFT リクルーター、悪意ある VS Code プロジェクト、カメラを付けない理由づけに使われる
面接线の顔すり替え。マルウェアファミリー：BeaverTail（npm）、InvisibleFerret（Python）、
OtterCookie、OtterCandy、StoatWaffle（Node.js）。

**Why it matters:** 勧告はまた、日本が北朝鮮 IT 労働者の「ラップトップファーム」を初めて摘発した
ことも記録している——攻撃者があなたの求職者である詐欺の物理的な側面だ。開発者向けの緩和策は
不変であり、繰り返す価値がある：未知のコードはサンドボックスで実行し、プロジェクトファイルに
ペイロード取得コマンドがないか検査し、実際に誰を雇っているのかを確認すること。

[`🔗 IC3 勧告（PDF）`](https://www.ic3.gov/CSA/2026/260918.pdf) · [`🔗 BleepingComputer`](https://www.bleepingcomputer.com/news/security/north-korean-waterplum-hackers-infected-30-000-devices-worldwide/)

---

## 29. Ogre Battle 64 の再コンパイルが99.05%に到達——N64 の名作をネイティブ PC 移植、完全マッチまで1週間

- **Velocity:** ▮ steady
- **Source:** GitHub / Hacker News · 47+ pts · 15 comments · ~7h ago (~04:59 UTC+8)
- **Tags:** `decompilation` `recompilation` `game-preservation` `n64`

`lfarroco/ogre-battle-64-recomp`（8月24日作成、今回の実行の数時間前までプッシュ）は、
『Ogre Battle 64: Person of Lordly Caliber』（北米 Rev A）を N64Recomp ツールチェーンで
ネイティブ x86-64 実行ファイルへ静的再コンパイルするプロジェクトだ——Zelda 64 recomp
シリーズと同じアプローチ。**完成度99.05%**を報告し、2012年世代の GPU で D3D12/Vulkan/Metal で
動作し、RAM 2GB のみを要求し、ゲームデータを一切含まない——ROM ダンプは自己調達だ。
キーボードだけで遊べる；リポジトリは著作権で保護されたアセットを含まないと明示している。

**Why it matters:** このフィードが RE4 の完全バイト一致逆コンパイルを取り上げた1週間後、
同じ保存の波が別の顔を見せた：再コンパイルはマッチする C コードを一切必要としない——
元のマシンコードをネイティブへ直接リフトする。一人のメンテナーが1ヶ月でプレイ可能な
クロスプラットフォーム移植に到達できる理由だ。技術は違えど結論は同じ：ツールチェーンは
「保存目的の移植」をスタジオの仕事ではなく趣味のプロジェクトにするまでに成熟した。

[`🔗 GitHub リポジトリ`](https://github.com/lfarroco/ogre-battle-64-recomp) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49780022)

---

## 30. paperless-ngx が v3.2.0 と v3.2.1 を相次いでリリース、ドキュメントマネージャーが45.6kスターで GitHub Trending に登場

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · 45,634 stars · v3.2.0 は9月19日、v3.2.1 は9月20日
- **Tags:** `self-hosted` `documents` `ocr` `python`

paperless-ngx（GPL-3.0、Python）——スキャン文書をインデックスし OCR をかけるコミュニティ運営の
ドキュメント管理システム——が GitHub のデイリートレンドに登場し、今回の実行の数時間前まで
プッシュされていた。トリガーはリリースペースだ：v3.2.0（9月19日）の翌日に v3.2.1 バグフィックス
リリースが続いた——陳腐化したメール取得オーバーラップチェックを自発行期限のロックに置き換え、
Tantivy インデックスファイル欠落時に検索インデックスを自動再構築、合字テキストレイヤ修正を
取り込む ocrmypdf 17.12 への更新、flower 設定フラグの修正。

**Why it matters:** このフィード自身のトリガールールに従えば、これは単一のバイラルな瞬間ではなく
「持続的勢い＋リリース」だ——新しい HN スレッドはない。だが45.6kスターのセルフホスト文書
インフラが、セキュリティ関連の信頼性修正を翌日ターンアラウンドで静かに出し続けているのは、
Void の教訓が確認せよと言っていた健全なメンテナンスシグナルそのものだ：スター数と同じ速さで
コミットログが本当に動いているトレンドリポジトリ。

[`🔗 GitHub リポジトリ`](https://github.com/paperless-ngx/paperless-ngx) · [`🔗 v3.2.1 リリース`](https://github.com/paperless-ngx/paperless-ngx/releases/tag/v3.2.1)

---

## 31. ZuckOff：部屋にカメラ眼鏡があるかを教えてくれる Bluetooth スキャナー

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 246+ pts · 91 comments · ~1.5h ago (~18:40 UTC+8)。Wired 記事の 2 つ目の HN スレッドは 131+ pts
- **Tags:** `privacy` `bluetooth` `wearables` `counter-surveillance`

個人開発者によるアプリで、カメラ眼鏡が Bluetooth 上で通知するメーカー固有のシグネチャを
待ち受ける：`0x0D53`（Luxottica —— Ray-Ban Meta、Oakley Meta）、`0x058E`（Meta Platforms
ウェアラブル）、`0x03C2`（Snap Spectacles）、加えて低信頼度での製品名マッチング。聞こえた
すべての BLE デバイスを記録し、各判定の根拠を表示するので、結論に同意しないこともできる。
App Store と Google Play の両方で提供され、バックグラウンド通知、Live Activity、ショート
カット自動化、CSV エクスポートに対応。サイトは「何も端末の外に出ず、アカウントもない」と
主張する。Wired が同日取り上げ、アプリは HN に同時に 2 つのスレッドで登場した——アプリ
自身のスレッドと報道のスレッドである。

**Why it matters:** サイト自身が示す限界も一緒に伝えたい：眼鏡は電源オン、ペアリング、
ケース取り出し時に最も通知しやすく、スタンドアロンの一部モデルは沈黙したまま。「検知
されない」ことは誰も録画していない証明にならないし、「検知された」ことは録画している
証明にもならない。興味深いのは、BLE メーカー ID が公開かつ検証可能な検出根拠だという
点——カメラ眼鏡が主流になるのと同じ月に、ウェアラブルに対するカウンターサーベイランス
が消費者向け製品カテゴリになった。

[`🔗 zuckoff.app`](https://zuckoff.app/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49785429) · [`🔗 Wired 記事`](https://www.wired.me/story/meta-smart-glasses-detector-app-zuckoff)

---

## 32. Kev：オープンでセルフホスト可能な Jev —— Qwen3.5 ベースの 0.8B/4B/9B 決定モデル、Apache-2.0

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 155+ pts · 71 comments · ~5h ago (~15:15 UTC+8)
- **Tags:** `jev` `decision-models` `open-weights` `lora`

Jared Palmer の `jaredpalmer/kev`（1.7k スター、Apache-2.0、「built with Devin」）は、
Archer Hume による Jev アーキテクチャの解説に沿った小型オープン決定モデルファミリー
である。Qwen3.5 ベースに rank-16 LoRA アダプタとポインタヘッドを載せ、Yes/No（`noul`）、
選択問題（`choice`）、評価（`score`）の質問に較正された確率で答える——質問は入力テキ
ストを共有しつつ、アテンションマスクで互いに隔離される。Kev-9B は新規ソース開発セット
で 0.822 の精度を報告し、ホスト型 Jev の 0.857 と比べた 3.5 ポイントの差を README 自身が
明記している。API は TypeSafe の System One と互換で、同社の Python SDK がローカルの
Kev サーバーに対してそのまま動く。

**Why it matters:** README が自らの但し書きを担っているからこそ信頼できる：生の確率は
未知のソースで過信がち（自信のある誤りが 8.7%、温度スケーリングで半減）、ファイン
チューニングは日付計算能力を劣化させ（issue #8）、MMLU は Jev に大きく届かず、Jev との
比較は Jev の学習データが未知のため制御されていないと明言している。上の項目 26 との
区別に注意：jevchat はネタのチャットボット、Kev は本気のセルフホスト可能なレプリカで
ある——Jev 登場から 1 週間で、「System 1」モデルカテゴリにはすでにオープンウェイトの
エコシステムが存在する。

[`🔗 GitHub リポジトリ`](https://github.com/jaredpalmer/kev) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49783999)

---

## 33. Suricata 8.0.7：プロジェクト史上最多の脆弱性報告を含む IDS リリース —— 約 70 CVE、うち 2 件が CRITICAL、Suricata 7 は EOL

- **Velocity:** ▮▮▮ trending
- **Source:** OISF フォーラム / NVD · 9月15日リリース、NVD レコードは 9月20〜21日に到着
- **Tags:** `ids` `suricata` `cve` `http2`

OISF の 8.0.7 リリース発表はこれを「これまでで最も多くの脆弱性報告を受けたリリース」
と位置づけている——約 70 件の問題で、その急増を AI 支援による分析の普及に帰している。
うち 2 件が **CRITICAL**。これは「デフォルト有効の Tier 1 機能における、リモートから
トリガー可能なトラフィック経由のコード実行」のために OISF が取っておいた最高ランクで
ある。さらに約 20 件が HIGH。OISF の表では全 CVE ID がまだ「[Pending]」（代わりに
GHSA へリンク）だが、NVD には MITRE 割り当てのレコードが pub され始めている——
CVE-2026-94083（DoH2 型混同 → 無効な解放）と CVE-2026-94084（Http2ThreadMultiBuf の
Use-After-Free）で、いずれも CVSS 9.4（MITRE CNA）。Suricata 7 は 7.0.17 で EOL、
LibHTP はアーカイブされた。非公開チケットは 2 週間後に公開される。

**Why it matters:** スコアラーの細部に注意：OISF 独自の評価と CVSS スコアは複数の
チケットで食い違い、大半の ID はまだ割り当てられていない——どの数字よりも、バージョン
ベースのアップグレード指針（8 系への移行）が重要だ。信頼できないトラフィックの解析を
職業とする IDS で、デフォルト有効の HTTP/2 経路にメモリ破壊があるというのは、まさに
その週にパッチを当てるべきセンサー側のリスククラスだ。悪用の報告はまだない。

[`🔗 OISF リリース発表`](https://forum.suricata.io/t/suricata-8-0-7-released/) · [`🔗 NVD レコード（CVE-2026-94083）`](https://nvd.nist.gov/vuln/detail/CVE-2026-94083) · [`🔗 GitHub リリース`](https://github.com/OISF/suricata/releases)

---

## 34. Show HN：Mini-AGI —— 8GB GPU 1 枚で単一データストリームから継続学習

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 136+ pts · 22 comments · ~7.5h ago (~12:45 UTC+8)
- **Tags:** `continual-learning` `show-hn` `small-models` `research`

Alexey Borsky による `volotat/mini-AGI`（MIT）は、訓練と推論が同一の操作であるバイト
レベル言語モデルだ：batch-1、トークナイザなし（256 バイト値 + 9 構造マーカー）、文字
ごとに最大 24 回適用される PonderNet 方式の適応的停止、そして各エキスパートがディスク
上の 1 ファイルで必要に応じて GPU へページされる成長・枝刈り型 MoE プール（総パラメータ
約 540M、常駐 32）。目玉の結果は抗忘忘：トランクをエキスパートの 0.1 倍の学習率で回すと、
52.4 万文字後の測定忘却が +0.0067 nats に抑えられた——保持率 99.84%、他の設定では約 50%。
8GB の CUDA GPU 1 枚でスクラッチから訓練できる（基準機：RTX 3070 Laptop）。

**Why it matters:** README が誠実な位置づけの作業を代行してくれている：「現時点では
小型のトイレベルモデル」であり、**重みは未公開**（現ペースであと数週間）、出力は繰り返し
がち、CUDA のエキスパートDispatchが非決定論的なため nats/char ベンチには約 0.03 の実行間
分散がある。これは有能なモデルではなく、「継続学習は普通のハードウェアに収まる」という
存在証明——スローガンではなく nats で測られた——として扱うべきものだ。

[`🔗 GitHub リポジトリ`](https://github.com/volotat/mini-AGI) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49783133)

---

## 35. Mistral Vibe RCE（CVE-2026-93993）：worktree 作成時に git フックが信頼検証より先に実行される

- **Velocity:** ▮▮ rising
- **Source:** NVD / VulnCheck · 9月19〜20日開示、2.25.5 で修正済み
- **Tags:** `rce` `cve` `agent-security` `git`

Mistral のオープンソースコーディングエージェント CLI「Mistral Vibe」は 2.25.5 未満では、
worktree 作成処理の中で**信頼検証よりも前に** `post-checkout` フックを実行する——そのため
細工されたリポジトリ 1 つで、Vibe を実行したユーザーの権限で任意のシェルコマンドが実行
できる（CWE-74 クラス、ネットワークベクトル、ユーザーインタラクション要）。v2.25.5 で修正
（コミット `c069ffa`）。issue #996 経由で発見され、VulnCheck が開示。そのスコアは NVD 上
Secondary（CVSS 8.8 v3.1 / 8.6 v4.0、VulnCheck 割り当て —— NVD 分析は未処理）。野良での
悪用報告はない。

**Why it matters:** このフィードが繰り返し記録してきたのと同じ構図だ——Codex の
Overpatch、OpenPanel のテンプレートバリデータ、Plugin4Shell：信頼の判断が、攻撃者提供の
成果物がすでにコード実行の機会を得た**後**に行われている。コーディングエージェント CLI
を信頼できないリポジトリに向けるなら、git フック経路はこのクラスの名前付き・CVE 付きの
実例になった。自分で書いたのでないものを `clone` する前に、まずアップデートを。

[`🔗 NVD レコード`](https://nvd.nist.gov/vuln/detail/CVE-2026-93993) · [`🔗 VulnCheck アドバイザリ`](https://www.vulncheck.com/advisories/mistral-vibe-before-2.25.5-remote-code-execution-via-git-post-checkout) · [`🔗 v2.25.5 リリース`](https://github.com/mistralai/mistral-vibe/releases/tag/v2.25.5)

---

## 36. OpenStock：オープンソースのマーケットプラットフォームが 17.3k スターでトレンド入り —— まずスターとコミットの比を読め

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending（日次）· 17,274 stars · 本日 +755
- **Tags:** `fintech` `nextjs` `open-source` `agpl`

Open-Dev-Society の OpenStock（AGPL-3.0）は GitHub 日次トレンドの 3 位：Next.js 15 /
React 19 の株価アプリで、Finnhub の quotes、TradingView チャート、MongoDB のウォッチ
リスト、Reddit/X/ニュース/Polymarket から収集したセンチメント、Gemini 生成のオンボー
ディングメールと週次サマリーを備える。Trendshift の日次・週次バッジ付き、2.2k フォーク
——そしてコミット数は **141**。README はアプリ全体を「ゼロから開発した」リードコントリ
ビューター 1 名の功績とし、JavaScript Mastery のチュートリアルにインスピレーションの
謝辞を述べている。

**Why it matters:** このフィードの MiroFish の教訓に従い、項目を書く前に比を確認した：
141 コミットに対する 17.3k スターは、バズりの波に乗った磨き込まれたポートフォリオ級
アプリであって、本番用のマーケットインフラではない——但し書きはページ上にある（無料枠
では米国外のリアルタイムデータが 15 分以上遅延、Finnhub のレート制限、「証券会社では
なく投資助言ではない」）。取っておくべきシグナルは需要側にある：オープンでセルフホスト
可能なマーケットデータのフロントエンドこそ、1 日 755 人が今スターを付けたがっている
ものだ。

[`🔗 GitHub リポジトリ`](https://github.com/Open-Dev-Society/OpenStock) · [`🔗 GitHub Trending`](https://github.com/trending?since=daily)

---

## 37. Amix が戻ってきた：Amiga Unix 復興プロジェクトが Saku 2026 で発足 —— AI によるリバースエンジニアリングのドライバとともに

- **Velocity:** ▮ steady
- **Source:** Hacker News · 116+ pts · 38 comments · ~12h ago (~08:05 UTC+8)
- **Tags:** `retrocomputing` `unix` `m68k` `reverse-engineering`

amigaux.org —— 3 名のコミュニティプロジェクト（asokero、isoriano1968、jusii）—— は、
Commodore が 1990〜92 年に販売し、その後放棄した Amiga 向け System V Release 4 Unix
「Amix」を復活させている。Amix 2.1 カーネルは現在、実機の 68040/68060 で動作し、最近の
アクセラレータにも対応する（Z3660 はネイティブ SCSI・イーサネットドライバ付き、
A4091/A4092 Zorro III SCSI）。pkg.amigaux.org から取得する `apkg` パッケージマネージャ、
`m68k-cbm-sysv4` クロスツールチェーン、OpenLook デスクトップが最初から使え、Quake も
動く（「当面はゲームというよりベンチマーク」）。発足イベントは 9月19日、フィンランド・
オウルの Saku 2026。現代的なフックはここだ：一部のドライバは、ソースが存在しないバイナリ
カーネルから生成 AI を使ってリバースエンジニアリングされており、人間がレビューして実機で
テストし、進捗文書「grimoire」は検証済みの仕事と推測を信頼度タグで区別している。

**Why it matters:** AI 支援のリバースエンジニアリングのワークフローは、非常に古い物語の
最新部分であり、それを信頼度タグで縛るチームの規律こそが正しい枠組みだ。今週の保存の波
（RE4 のバイト一致デコンパイル、項目 12）の反対側でもある：ゲームを 1 本デコンパイルする
のではなく、ベンダーが 34 年前に見捨てたハードウェアのために、パッケージマネージャ、
ツールチェーン、ドライバを含む OS エコシステム全体を再構築しているのだ。

[`🔗 amigaux.org`](https://amigaux.org/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49781436)

---

## 38. AutoClip：Qwen による YouTube/Bilibili 自動クリップ処理パイプラインが 8k スターでトレンド入り

- **Velocity:** ▮ steady
- **Source:** GitHub Trending（日次）· 7,991 stars · 本日 +395
- **Tags:** `video` `llm` `python` `automation`

zhouxiaoka/autoclip（MIT、README は中国語）は yt-dlp で動画をダウンロードし（YouTube と
Bilibili、またはローカルアップロード）、その後トランスクリプト上で LLM パイプラインを
実行する：アウトライン抽出 → タイムライン/トピック検出 → ハイライト採点 → タイトル生成
→ クリップとまとめの自動作成。React/Ant Design の Web UI で管理し、バックエンドは
FastAPI + Celery/Redis。AI 層は DashScope 経由でアリババの Qwen を呼び出す（デフォルト
`qwen-plus`）。

**Why it matters:** トリガーのルールに従い誠実に位置づける：公開リリースはなく、宣伝され
ている機能の一部（Bilibili 自動アップロード、字幕編集、モバイル対応）は【開発中】と
明記されている。Celery ワーカーには明示的な `-Q` キューフラグも必要で、なければタスクが
静かに滞留する。だが勢いは本物で、このカテゴリは繰り返し現れている——9月14日に
OpenMontage が乗っていたのと同じ需要だ（別リポジトリ、同じ仕事）：長尺動画をクリップに
変換することは、まさに今人々が LLM パイプラインにやらせたいことであり、Qwen の API 価格は
コンシューマースケールで実行できるほど安くなっている。

[`🔗 GitHub リポジトリ`](https://github.com/zhouxiaoka/autoclip) · [`🔗 GitHub Trending`](https://github.com/trending?since=daily)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-09-21T20:10:00+08:00 |
| Items | 38 |
| Sources tracked | 33（Hacker News、GitHub Trending、Hugging Face、arXiv、NVD、VulnCheck、Onapsis、Checkmarx Zero、BleepingComputer、The Hacker News、PyPy blog、lethain.com、evaluation.club、buchodi.com、pirateface.co、Seoul Economic Daily、bartosz.fenski.pl、Accomplish AI、agentexecutor.io、github.com、libroot.org、seldo.com、sunilpai.dev、terrytao.wordpress.com、millenniumproblems.bio、borischerny.com、maharship.com、dev.to、ic3.gov、zuckoff.app、wired.me、forum.suricata.io、amigaux.org） |
| Update schedule | 04:03, 12:03, 20:03 UTC+8（毎日3回） |
| Ranking | Velocity 加重（鮮度 × エンゲージメント加速 × ソース権威） |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[前日](../archive/2026-09-20.md) · [Raw .md](./2026-09-21.md) · [アーカイブ](../archive/index.md)
