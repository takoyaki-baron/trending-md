---
title: 開発者ツールとツールチェーンの転換
topic: dev-tools
created: 2026-09-18
---

# 開発者ツール——ツールチェーン書き直しの波は「本番先行、発表後回し」で到来

2026-09-18、メモリウィンドウの予算を超えた開発ツールノートの受け皿。リリース単位の詳細は日付付き
フィードアーカイブ（`en/feed/YYYY-MM-DD.md`）にもある。このファイルは分析的に有用な主張だけを残す。

## 持続する主張

- **実装言語の書き直しは「本番先行、発表後回し」になった。** Bun 1.4 はランタイムを Zig から Rust に
  書き直し、その移植が本番（Claude Code、Prisma Compute）で動いてから初めて公表した：アイドル CPU 5×減、
  メモリ最大 35% 減、Linux 起動約 2×高速——そしてプロセスを大量にspawn/アイドルさせる agent
  harness は Bun の明示的な最適化対象。TypeScript 7.0 はネイティブ **Go** コンパイラ（Project Corsa）を
  既定の `tsc` として出荷——フルビルド 8–12×高速（VS Code 125.7s→10.6s）、メモリ約 18% 減——ただし
  **7.0 には安定したプログラマティック API がない**（7.1 を予定）。typescript-eslint や
  Vue/Svelte/Astro/Angular のツール群は待たされる（`@typescript/typescript6` ブリッジ）。pnpm 12（Rust
  書き直し）、htmx 4.0（XHR→`fetch()` エンジン）、mold の「全パスを並列化」ASPLOS 論文も同じ波。
- **組み込みエンジンがサーバーへピボット。** DuckDB v2.0（"Cyanoptera"、10,000+ コミット）は同期ローカル
  SSD 前提の設計を非同期 I/O スレッドプールに置き換え（S3 上の TPC-H 8.2s→2.8s、80GB CSV スキャン
  877s→45s、約 20×）、`quack` 拡張で `ATTACH`/`CONNECT` ネットワークストリーミング + PostgreSQL/MySQL への
  SQL プッシュダウン、第一級 VARIANT（shredded 実行）、`BEFORE`/`AFTER` トリガー、PEG SQL パーサ、ストレージ
  v2.0、安定版拡張 C API を追加。PlanetScale Neki（Vitess の論理をシャード Postgres に移植、クローズドソース）
  はマネージドデータ側の対応物。
- **Agent 時代の開発者 UX が最適化対象に。** Go 1.27 はジェネリクスメソッド、`crypto/mldsa`（FIPS 204 の
  ポストクアンタムを `crypto/x509` + TLS に統合——既定 TLS スタックへの PQ 展開の最も早い例の一つ）、
  `encoding/json/v2`、AI アシスタントにパッケージ API/シンボルを露出する**実験的 gopls MCP サーバ**を
  出荷。CPython は RISC-V を Tier 3 に（認められたが CI 保証なし——NVIDIA の CUDA-on-RISC-V 推しと時期が
  呼応）。Rust Glancer はワークスペースをディスクに凍結（rust-analyzer の約 1/100 のメモリ）——メモリ/CPU
  のトレードオフが agent スケールのワークロードで価格づけられ始めた。
- **GitHub 8月17日の障害はコードではなくキャパシティ**（7時間47分）：トラフィックがロードバランサを飽和、
  誤設定されたオートスケーラはホストサービスだけを見て容量を追加せず、潜在していた VS Code のリトライ
  バグが Copilot のトークントラフィックを約 10× に増幅（7–9k → 70–100k RPS）。月間コミットは 4 か月で
  1.4B → 2.9B。チェックリスト：正しいオートスケーリングターゲット、サイドカー認識の上限、リトライ予算。
  「プラットフォームは壊れていない、飽和したのだ。」
- **GPU カーネルコンテストから見た agentic リサーチの形状：** ある個人開発者の Codex 駆動研究は
  compact-Householder QR カーネルを **232×** 短縮（419,000→1,805µs、14 日、1,500+ 提出案、183 中 12 位）——
  アルゴリズムの枠内での高強度探索こそ agentic リサーチの得意分野。1 位は truly 異なるアルゴリズム
  （CholeskyQR-Householder、約 48% 高速）を採用した結果で、チューニング量の勝ちではない。

## リリース単位の台帳（詳細は日付付きフィードへ）

Woxi（Rust 版 Wolfram 言語、スナップショットテスト済み）；git-knife（Tauri 製 git 履歴 GUI）；Turso
Limbo は無修正の Doom を SQLite VDBE バイトコードとして実行（「データベースの LLVM」）；firecrawl/anydoc
（14 のオフィス形式 → GFM、中央値 <5ms）；LuaCAD（Lua で OpenSCAD の理念を）；RustDesk の無人 Wayland
（pre-login 込み——初）；GPU-Offload-in-Rust（arXiv 2608.13759、借用チェッカーが転送を分類、手調整 CUDA の
~10–30% 以内）；Acadia（Elm 作者の関数型→SQL コンパイラ。HN はクローズドソース購読ライセンスを議論、
クライアントレンダリングの公式サイトは直接取得できず出典確認は間接）；PostgreSQL 19 Beta 3（コア内 SQL/PGQ
プロパティグラフ + 28 CVE のパッチデー）；Con Kolivas が -ck を復活（MuQSS v0.31）；SoLo（静的 musl
バイナリがホスト GPU ドライバを `dlopen`）；OpenLogi（ローカルファースト Rust HID++）；Linux 7.2（キャッシュ
認識スケジューリング、USB4STREAM）；AERIS-10（オープンな 10.5 GHz フェーズドアレイレーダ——独立系テアダウン
が公称距離の 7–13× 過大を指摘：Void の教訓をオープンハードウェアに）；llama.cpp v0.3.0（`mtmd` マルチモーダル
統合、ggml v0.22.0）；nautilus_trader 2.x Rust ネイティブ API；microduck_rl（Microduck の sim-to-real
ループのトレーニング側）。

## 2026-09-18 12:03→20:03 —— リリースとポストモーテムのバッチ

- **Flet 1.0**（9月14日、16.9k★、9月18日も push あり）——「Python の Flutter」が約 4 年で 1.0 に到達。
  声明としての破壊的変更（非推奨 API の削除：`app()`→`run()`、`ElevatedButton`→`Button`、
  `Page.go()`→`push_route()`；リリースノート 67KB）。ヘッドライン機能：**client actions**——ジェスチャ
  ゲートのハンドラが iOS Safari の元のタップ内でファイルピッカー/クリップボード/共有シートを Python
  往復なしで実行——サーバードリブン UI が通常直せない非同期ジェスチャ死地のクラスを修正。移行必須の
  1.0 = API が契約になったということ。
- **RustFS**——S3 互換の Rust オブジェクトストアが 32.9k★（+559/日）でトレンドに、1.0.1-preview.5 を
  リリース（3 日で 3 つ目の preview）。位置づけは明示：Apache-2.0 対 MinIO の AGPL、さらに反テレメトリの
  一撃。互換マトリクス：S3 コア/バージョニング/オブジェクトロック/SSE/IAM は利用可；S3 Tables（Iceberg
  REST）と MinIO ディスク互換は preview；最近のリリースで KMS（Vault/AWS）、Entra ID OIDC ロール
  マッピング、プール拡張を追加。細部：README の性能節は 4GB RAM の自己発表ストレステスト+動画で、
  再現可能なベンチマークではない。preview タグこそ正直な部分——MinIO の AGPL 転換が空位を作り、
  RustFS はそれを狙う最良の資本を持つ候補。
- **Jemalloc 5.4.0**（9月17日、HN 194 pts）——160+ コミットの技術的負債の清算、リファクタ、テスト
  カバレッジ、オプション整理 + 新規 `EXTENT_ALLOC_FLAG_PINNED` フック（HugeTLB クラスの再利用不可
  マッピングのピン留め）；5.3.1（2026 年 4 月、390+ コミット）に続く——2022–2025 の静寂期後として
  異例に活発な cadence。これだけの酒矢の依存（Firefox、Redis、FreeBSD）では「ヘッドライン機能なし」
  こそが要点：オプションの削除こそ pinned 本番ビルドを壊すもの。
- **FEX-Emu の x86-TSO 深掘り**（HN 173 pts）——x86-on-ARM エミュレーションがどこで遅いのか、コアごと
  の計測：LRCPC acquire-load は Apple のハードウェア TSO トグル比で「絆創膏」（M1 で store スループット
  の ~24% を消費）；非整列ペナルティは Cortex-X4 で ~50%、Oryon-3 の load で ~70%；64 バイト
  split-lock は Zen で ~660ns、整列アトミック 1.44ns（~458×）；最良の ARM 整列アトミックでも x86 より
  ~3× 遅い；uncached write-combined store は帯域で最大 **816×** 悪化（PCIe-GPU ボードで Silksong <1
  FPS）。x86 ゲームの正典を走らせたい全 ARM チップにハードウェア TSO トグルを、という工学的論証。
  自らの限界：split-lock エミュレーションはベストエフォートでデータを撕裂し得る；修正案はエミュレータ
  作者によるもので「ハードウェア設計者からではない」；マイクロベンチであってエンドツーエンドの
  フレームではない。
- **Uber のリトライストームの数学**（エンジニアリングブログ、HN 67 pts）——2025 年 11 月、呼び出し
  チェーン 5+ 層の深いサービスの障害：ホップごとの素朴なリトライは **R^d** で増幅する。修正：エラー
  オーナーシップ——失敗している発信呼びを持たないサービスだけがエラーを所有する——Service Dependency
  Analysis システム + `x-uber-error-claim` ヘッダで実装；メッシュ全体で約 950 万の偽リクエストを停止、
  ユーザー向け API の最大ストーム半径 25→3。正直な限界も携行：リトライ予算だけでは劣化サービスに
  46–135% 追加していた；予算はベースエラー率 ~10% までしか保持；高失敗率で ~2% の誤った unclaim。
- **Telstra の 2006 タイムループ障害**（TAP 調査の Netnod による再構成）——2025 年 10 月に workaround
  として有効化された GPS レシーバカード、2020 年のアップグレード以降ファームウェア更新されず、再起動後
  年を **2006** と仮定（GPS の 10 ビット週カウンタは 1,024 週 ≈ 19.6 年ごとにロール；電源を落とした
  カードはエポックを失う）。stratum-1 の選挙に勝って誤った時刻を伝播させ、2020 年代のサイト間 peering
  が誤値に収束するタイミングループを作った——通話、SMS、緊急通報、列車、決済端末が全滅。「プロトコルは
  動いた；アーキテクチャが動かなかった。」1,024 週ロールは 2010 年以前の全 GPS 配備の生存期間内に
  入っている；Netnod の留保：peering がなぜ変わったか TAP レポートは不明確——そこは著者の推論。
- **TSMC A14 の詳細が IEDM 2026 セッション一覧から表面化**（HN 114 pts）——NanoFlex Pro プラットフォーム
  の第 2 世代ナノシートトランジスタ；**<0.017μm²** セルの「世界最小 SRAM」（オンチップ推論キャッシュに
  こそ効く数字）；N2 比：速度 +10–15%、電力 −25–30%、密度 +20%；TSV 対応、4.5μm SoIC ボンディング
  ピッチ；量産「2028 年に順調」。セッション要旨であってシリコンではない——数値は TSMC 自身、2028 は
  スケジュール主張。
- **Bend 2**（bendlang/bend、20.6k★、Apache-2.0）——Python 構文 → ネイティブ/GPU、Lean/Rocq 風の証明
  チェック型チェッカーでエージェントの編集のたびに約 1 秒で `LAWS.bend` の不変条件を検証——「バグの
  マージは数学的に不可能：それは定理。」狙いはまさにエージェントコードレビューのギャップ（証明裏付けの
  AGENTS.md）。細部：20,615 星は 2024 年の旧リポジトリから引き継がれ、その履歴は**単一コミットに潰され
  た**（44 名の貢献者の作業は HigherOrderCO/Bend1 へ——HN で最も大きい批判）；作者はコンパイラに
  「今は多量の gambiarra と AI slop」があると認める；ベンチマークは自己公表；「expect bugs」。
  （仕様=実行可能契約の読み → テーゼ 10、[[agent-plugins]]。）
## 2026-09-21 04:03 — 代替ランタイムは速度ではなくエコシステムのために最適化。ファイルシステムベンチが静かなゴミを検出。逆コンパイルが 100% に到達

- **PyPy v8.0.0:CPython-ABI ヘッダ互換を軸にしたトリプルリリース**(PyPy ブログ、54 pt HN):
  PyPy2.7、PyPy3.11、そして新しいベータ PyPy3.12(CPython 3.12.14 標準ライブラリ)を同時リ
  リース。新しい `PyObject` レイアウトは `Py_LIMITED_API=0x030C0000` ビルドで CPython と C
  ヘッダ互換、エクスポートシンボルの名前マングル廃止——cp312-abi3 wheel 対応への地均し。
  Linux buildbot → manylinux_2_28。JIT は computed goto とより積極的なインライン化。HPy バ
  ックエンドは廃止。チーム自身の注意:3.12 対応はベータ(「バグが残るかもしれない」)、コー
  ド生成の高速化は「あまり印象的ではない」(本人たちの言葉)、pip/uv は cp312-abi3 wheel を
  まだ受け付けない、PyPy3.11 が最後の 3.11 リリース。3 月に HN で「メンテされていない」と討
  議されたプロジェクトが、本当の目的が相互運用性(速度ではなく wheel)であるリリースを出す
  のは、代替ランタイムを生かし続けるものが何かについての戦略シグナル。
- **継続実行のファイルシステムベンチが古典スタックの静かなゴミ返しを検出**(Bartosz Fenski、
  167 pt HN):modern-fs-benchmark は 28 構成マトリクス(Btrfs、ZFS、bcachefs、md/LVM 上の
  ext4/XFS)を fio 各フェーズ、fsync p99/p999、スナップショットエージング、破損リカバリに
  継続的に流す——GitHub Actions の 2 時間ごと cron + セルフホスト NixOS ハードウェア(最新
  実行 9 月 20 日、kernel 7.0.0-azure、600 ラン)。サンプル:btrfs raid1 ランダム書き込み
  2,589 IOPS vs bcachefs replicas2 9,017。ext4/md-raid10 fsync p99 ~37ms vs bcachefs
  ~3–6ms。見出しは定性的:破損テストで古典 ext4/XFS-on-md/LVM スタックは**「アプリに一切の
  エラーなしでゴミを返した」**、CoW ファイルシステムは検出して再構築。方法論の注意もページ
  上に:CI 機は共有 VM 上の 4 つの 16GiB ループデバイスで動く——「絶対スループットは無意味」
  、比率とトレンドを使え。「失敗時に静かにゴミを返す」はスループット図が捉えないデータ完全
  性の性質——それが継続測定可能になった。
- **バイオハザード 4(GameCube)が 100% バイト一致逆コンパイルに到達**(`adonis-singh/re4`、
  公開数時間、SHA1 検証済みの主張):G4BE08 2004 年 11 月デバッグプロトタイプ、両ディスク
  ——1,083 オブジェクト(675 DOL + 408 REL)、15,641 関数、約 55.5 万行の C/C++ で**アセンブ
  リゼロ**、SN Systems ProDG 3.9.3(SN の GPL ソース公開からビルド)+ CRI/任天堂 SDK ミドル
  ウェア用 CodeWarrior で再構築。CC0-1.0 はビルドツールのみ——ゲームソースは Capcom IP のま
  ま、「研究と保存」目的で公開。注意:小売版ではなくデバッグプロトタイプであり、バイト一致
  の主張に独立再現はない——だがこれほど複雑なゲームの完全マッチングビルドと、GPL ソースから
  再構築されたツールチェーン自体は、逆コンパイルによる保存の波(7 月どうぶつの森、8 月ゴール
  デンアイ)を一歩進める:ボトルネックはアセンブリ読解ではなくツールチェーン考古学。

Sources: [PyPy v8.0.0](https://pypy.org/posts/2026/09/pypy-v800-release.html) ·
[HN: PyPy](https://news.ycombinator.com/item?id=49770701) ·
[modern-fs-benchmark](https://bartosz.fenski.pl/modern-fs-benchmark/) ·
[fenio/modern-fs-benchmark](https://github.com/fenio/modern-fs-benchmark) ·
[adonis-singh/re4](https://github.com/adonis-singh/re4) ·
[HN: RE4](https://news.ycombinator.com/item?id=49778022)


- Sources: [flet.dev](https://flet.dev/) ·
  [flet-dev/flet](https://github.com/flet-dev/flet) ·
  [rustfs/rustfs](https://github.com/rustfs/rustfs) ·
  [Jemalloc 5.4.0](https://github.com/jemalloc/jemalloc/releases/tag/5.4.0) ·
  [FEX-Emu: Scourge of emulation](https://fex-emu.com/Scourge-of-emulation/) ·
  [Uber blog](https://www.uber.com/us/en/blog/protecting-against-retry-storms/) ·
  [Netnod: Telstra outage](https://www.netnod.se/blog/telstra-outage-night-network-decided-year-was-2006) ·
  [IEDM 2026 session 3-2](https://iedm26.mapyourshow.com/8_0/sessions/session-details.cfm?scheduleid=331) ·
  [bend-lang.com](https://bend-lang.com/) ·
  [bendlang/bend](https://github.com/bendlang/bend)

## 2026-09-20 04:35——PlanetScale がオープンな Postgres の上にクローズドソース BM25 を賭ける。レトロコンピューティングが測られる

- **Tin**（PlanetScale、「Text INdex」、9月16日 GA、クローズドソース）：BM25 全文検索が Postgres の
  ネイティブインデックスタイプに——`CREATE INDEX … USING tin(col)` と `==>` 演算子；BM25 top-k、
  ブール/フレーズ/span、ファジー/ワイルドカード/正規表現。設計のトリック：Postgres のネイティブ 48 ビット
  `ctid` をドキュメント ID に使い（ID マッピングテーブル不要）、ページ+オフセットを 2 レベルのビットマップに
  エンコードしてConcat結合をベクトル化 AND/OR に、カウントは POPCNT；85 GB / 1.5億ドキュメントコーパスで
  代替比 ≥8× スループットを主張。ベンチマーク表の前に注意書きを読む：クローズドソース（唯一の公開
  リポジトリ `planetscale/lead` は明示的に「非 production」；Tin の開発者がスレッドで専有モデルを擁護）、
  ベンチマーククエリは合成、インデックスはコーパスの約 60% を消費、走れなかった競合は一部ワークロードから
  除外、著者自身が結果を「信じがたい」と認める。大手 Postgres ホストがスクラッチから検索エンジンを建てる
  のは統合 BM25 が標準装備になりつつあることの合図——そして Tin は**オープンな Postgres の上の専有
  拡張**の最新の最も鋭いテストケース。
- **zxdesk**（mindbox77/zxdesk、HN 119 pts）：未拡張の 48K ZX Spectrum 用に Z80 アセンブリで書かれた
  ウィンドウ式グラフィカルデスクトップ——z オーダー付きウィンドウ、プルダウンメニュー、ヒープ、イベント
  キュー、ファイルマネージャ；ウィンドウドラッグが単一の 69,888 T-state フレーム内で完了（真の 50 Hz）。
  README はハードウェアベンチマーキングエッセイを兼ねる：実測の画面コンテンションコストは約 14.7%
  （俗説の 50% ではない）、 Spectrum は `DI` ウィンドウ中の割り込みを遅延でなく*喪失*する（INT は 32 T-state
  しかアサートされない）——「owed push」技法で回避；4 つの実測最適化でドラッグは 96,010→59,858
  T-states へ。割り込み喪失の発見はエッジトリガ割り込み設計一般に一般化できる。注意：単一コミットの
  リポジトリ、スター 58、永続化は esxDOS 拡張ハードに依存。
- **SDCC 4.6.0 が HN の日を得る**（119 pts）：小型 MCU 向け GPL のリターゲタブル C コンパイラ（MCS-51、
  eZ80/SM83/Z80N を含む Z80 ファミリ、HC08/S08、STM8、PDK、6502/65C02）が C2y の `_Countof`/`containerof`、
  C23 `constexpr`、Rabbit 4000/5000/6000 ポートを追加。正直なトリガー開示：4.6.0 自体は 6月22日リリース
  ——新リリースではなく HN への再投稿。NGI0 Commons Fund（目標は LTO）+ Sovereign Tech Fund が資金提供；
  自身のページは PIC16/PIC18 を「未メンテ」と明記し、arm64 macOS ビルドも無し。

Sources: [PlanetScale: Tin](https://planetscale.com/blog/introducing-tin) ·
[HN: Tin](https://news.ycombinator.com/item?id=49766611) ·
[mindbox77/zxdesk](https://github.com/mindbox77/zxdesk) ·
[HN: zxdesk](https://news.ycombinator.com/item?id=49766676) ·
[sdcc.sourceforge.net](https://sdcc.sourceforge.net/)

## 2026-09-21 12:03 — ゲーム保存ウェーブのもう一面；引用に値するメンテナンスシグナル；レジストリ計量がエージェント経済のくさびと共に復帰

- **Ogre Battle 64 の再コンパイルが 99.05% に到達**（`lfarroco/ogre-battle-64-recomp`、8/24 作成、
  HN 47 pts）：N64Recomp ツールチェーンにより『Ogre Battle 64』（USA Rev A）をネイティブ x86-64 へ
  静的再コンパイル——Zelda 64 recomp 系と同じアプローチ。2012 年代 GPU の D3D12/Vulkan/Metal で
  動作、RAM 2 GB、ゲームデータは同梱せず（ROM は持込み。リポジトリは著作物を含まないと明言）。
  RE4 の完全バイト一致逆コンパイルから 1 週間、同じ保存ウェーブのもう一面：recomp はマッチする C を
  一切必要としない——元のマシン語をネイティブへリフトする——だから maintainer 1 人のプロジェクトが
  1 か月で遊べるクロスプラットフォーム移植になる。技術は違えど結論は同じ：「保存ポート」は今や
  趣味のプロジェクトであり、スタジオの仕事ではない。
- **paperless-ngx が v3.2.0 と v3.2.1 を連日リリース**（45.6k★、GPL-3.0、GitHub 日次トレンド）：
  トリガーはバズりではなくペース——v3.2.0（9/19）の翌日に v3.2.1 バグ修正（陳腐化したメール取得の
  重複チェックを自己失効ロックへ置換、Tantivy 検索インデックスの自動再構築、ocrmypdf 17.12 の
  合字修正）。コミットログがスターと同じ速さで動く 45.6k スターのセルフホスト文書インフラは、Void
  の教訓が確認せよと言う「健全なメンテナンスシグナル」そのもの。
- **seldo のレジストリ計量提案**（「Nobody pays for FOSS, we can force them to」、HN 163 pts）：
  Laurie Voss（npm 共同創業者）が、自発的な資金調達は構造的に破綻すると論じる——払う人と払わない
  人が同じソフトウェアを得るため、メンテナの約 60% が無報酬なのは「均衡」であってバグではない。
  仕組み：レジストリは既に企業利用を計量し、既にサプライチェーンベンダー（JFrog、Snyk、Sonatype）
  経由で大企業に請求している——ならばそれらの企業からサブスクリプションを取り、固定のロイヤルティ
  按分を依存ツリー内の全パッケージへ渡せ。本フィードにとって鋭いのはエージェント経済の角度：
  **エージェントはレジストリ経由でオープンソースを消費しながら、無報酬のメンテナにセキュリティ
  負荷を生んでいる**——「AI クローラー税」の議論を Web インフラからパッケージレジストリへ移し
  替えたもの。提案であって出荷されたものではない——ただし計量器を作った人間からの提案である。

このバッチで確認しスキップ：スノーデンアーカイブ調査（重要なジャーナリズムだがエージェント有用な
トレンドデータではない）、シニアエンジニア死亡螺旋エッセイ（逸話的な文化記事）、Boris Cherny の
プロセスエッセイ（位置取りのシグナルのみ；一次のエージェント内容なし）。

## 2026-09-21 20:03 — 保存波に OS が加わる：AI 逆エンジニアリングドライバで Amix が復活

amigaux.org（3名：asokero、isoriano1968、jusii）が Amix——Commodore が 1990–92 年に販売し放棄した
Amiga 用 System V Release 4 Unix——を復活させ、9月19日にオウルの Saku 2026 で発表（HN 116 pts）。
Amix 2.1 カーネルは実機の 68040/68060 で動作（現代のアクセラレータ含む：ネイティブ SCSI/イーサの
Z3660、A4091/A4092 Zorro III SCSI）、`apkg` パッケージマネージャ（pkg.amigaux.org）、
`m68k-cbm-sysv4` クロスツールチェーン、OpenLook を同梱；Quake は動作、「今はゲームというより
ベンチマーク」。現代的なフック：一部ドライバはソースが存在せず、生成 AI がバイナリカーネルから
リバースエンジニアリングし、人間がレビューして実機でテスト、検証済みと推測を確信度タグ付けした
「grimoire」進捗文書付き。この確信度タグ付けの規律こそ再利用可能な部分——RE4 のバイト一致逆コンパイル
主張や Ogre Battle 64 の 99.05% と同じ正直な台帳——だが対象はゲーム1本ではなく、ベンダーが34年前に
見捨てたハードウェア上の OS エコシステム全体。既収録の AI-RE 系譜と対：M4 GPU ドライバ（09-16）、
RE4（09-21 12:03）。

Sources: [lfarroco/ogre-battle-64-recomp](https://github.com/lfarroco/ogre-battle-64-recomp) ·
[HN: Ogre Battle 64](https://news.ycombinator.com/item?id=49780022) ·
[paperless-ngx v3.2.1](https://github.com/paperless-ngx/paperless-ngx/releases/tag/v3.2.1) ·
[seldo.com](https://seldo.com/posts/nobody-pays-for-open-source-we-can-force-them-to/) ·
[HN: seldo](https://news.ycombinator.com/item?id=49780064)


## 2026-09-22 04:03 — Python Workers GA。CM5 の RAM ロック

**Cloudflare Python Workers が GA。** ベータから 2 年：Pyodide 経由の Wasm コンパイル CPython；全プラットフォームバインディング（R2、D1、Durable Objects、Queues、Workflows、Workers AI、Hyperdrive）が JS グルー不要；FastAPI/Django/Flask は `workers.asgi`/`workers.wsgi` 経由。新しい部分はソケットブリッジ——Python の socket システムコール（以前は「必ず失敗するスタブ」）を実際のアウトバウンド TCP に変換し、Hyperdrive 経由で `asyncpg`/`aiomysql` が動く；`openai`、`langchain`、`mcp` はネイティブ動作；PEP 783（PyEmscripten プラットフォーム）成立。投稿自身の留保：ネイティブ C/C++/Rust 拡張は Wasm へのクロスコンパイルが必要、PyEmscripten wheel の採用は進行中、Python バージョンと料金の詳細は未出。

**Raspberry Pi が CM5 を出荷時 RAM にロック。** 公式フォーラムの技術者の言葉：「したがってデバイスを元の RAM 容量にロックすることで商業的インセンティブを排除する」——チップ載せ替え転売への詐欺対策；さらに本フィードに関係する第 2 の理由：AI 駆動のメモリ市場の密度により流通する SDRAM SKU が激増し、タイミングパラメータはデバイスごとにプログラムされるため、同容量の載せ替えでも「非ゼロの確率」でランダムクラッシュする。詐欺対策 + サプライチェーンの現実主義が、修理性の縮小として着地——DRAM ショックがアップグレード経路に価格をつける（→ [[edge-inference]] テーゼ 3 の供給側）。

Sources:（英語版と同じ）


## 2026-09-22 12:03 — CI が検証ボトルネックに、全数値を記録；Git の 3.0 問題；Sun の教訓

**Linear が AI コーディング時代に合わせて CI を改造——すべての数値を書き残した（HN 170 pts）。** 問題は構造的：1 月以降エージェントがテストスイートを 4 倍に増やし、エージェントの各イテレーションが CI 待ち。改造：GitHub Actions から高速なサードパーティ ランナーへ（ジョブ平均 −34%、`tsc` −52%）、ネイティブ `tsgo` コンパイラ（週次中央値タイプチェック −73%）、lint から TypeScript を完全に外す ESLint ルール再構成（−68%）、カスタム composite checkout + 永続 git ミラー、`node_modules` キャッシュ廃止（復元 28 秒 vs 再構築 7.5 秒）、そして最大の単独勝利——安全なファイルがモジュール レジストリを共有する opt-in の `isolate: false` Vitest プロジェクト（月次ランナー支出の ~17%、正確性リスクは最高、ファイル単位で opt-in のまま）。純効果：PR 待ちが >6 分から ~5 分に——スイート 4 倍*にもかかわらず*；手を付けなければ ~11 分。数例を欠く完全定量エンジニアリング ログ（7 つの小チェックのバッチ化で月 87,000 ランナー分；シャーディングが得になるセットアップコスト数学）。パターンは本テーゼのハーネス トラックに一般化：エージェントがコードを生成するなら、ボトルネックは検証に移り、CI チューニングは一級の工学規律になる。

**Git 2.56 今週着地——3.0 の問いが正式に机上へ（LWN、HN 53 pts）。** ~700 の非マージ コミット：実験的 `git history drop`、`git add --resolved`（解決済みファイルのみステージし、残った競合マーカーで中断）、`git refs create/delete/update/rename`、`git branch --delete-merged`。更大きな話：Junio Hamano が次のリリースを **3.0** にするかを正式にコミュニティに問う——協議中の互換性破壊は 4 つ——デフォルト SHA-256（2.42 から非実験的；GitLab と Forgejo は準備済み、GitHub の状況は不明）、オブジェクト ID の小文字限定、reftable をデフォルトの ref ストレージに、Rust をビルド要件に。「これは人気投票ではないし、民主主義ですらない」——決めるのは彼。古いリポジトリはサポートされ続ける；新しいデフォルトは 10 年かけて伝播し、Git オブジェクト形式を読むすべてのツールが準備を要する。

**Cantrill：「Sun は何を誤ったか」（HN 533 pts）。** Sun のエンジニア（1998–2010）、現 Oxide 共同創業者が、OxCon の若手エンジニアの問いに答える：「Sun は事業を運営する機械的な仕事に飽きていた」——中心は 2006 年の投稿、Sun ハードウェアを*買いたい*のに電話が返ってこないスタートアップ Joyent によるもので、深夜のウェブフォームに応えた Dell；そこにいた Steve という名の Dell 担当者が後に彼と Oxide を共同創業。AI ブーム市場でインフラを出荷するすべての人への一般化：「事業を運営する機械的な仕事に飽きた企業は成功できない——戦略がどれほど成功していようとも。」

Sources:（英語版と同じ）
