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

## 2026-09-25 20:36 — 09-23→09-25 三日分のまとめ: F-Droid 2.0、安全な SIMD 1.0、サーバープッシュ付き Rails 型 Rust

**F-Droid 2.0**——クライアント 10 年最大のアップデート（Kotlin/Compose 書き直し、3 エリアナビ、CJK 検索大幅改善、Android の新 pre-approval API 上の統合インストーラ——一部は DMA の圧力が実現——自動バックグラウンド更新がデフォルト）。チェンジログは書き直しの代償も正直に値付け: Android 6 落第、Privileged Extension 無視、Ripple パニックワイプは一時不在、Nearby 共有なし。NLnet/OTF 資金、OTF Security Lab 監査済み（報告書は公開待ち）。**fearless_simd 1.0**（Linebender）——stable Rust の可搬 SIMD、`#[simd]` マクロによる関数マルチバージョニング、散在する `unsafe` ゼロ（監査済み 2 プリミティブの上に成立）、precise/fast 両バリアント、3 年のセキュリティ更新コミットと f16/Arm SVE/RISC-V V への路線。Rust+LLVM 上流への最適化還元も。直接 30 クレート、間接 1,000 以上。**Topcoat v0.9**（Carl Lerche——元 Rails コア、Tokio 共同作成者——と Julien Scholz）が v0.8 のシグナルトラッキング + HTML モーフィングの上に長寿命 WebSocket サーバープッシュを追加。Toasty ORM に `update!` と JSONB。売り文句は「約 20 MB RAM」での Rails 級生産性に、「規約があるほうが LLM 生成コードは安く、バグが少ない」という明示的なフレームワーク設計テーゼ——ベンチマーク非公開。**virtio-nvgpu**（nestrilabs）が gVisor の nvproxy を一般化: API 呼び出しでなく ioctl を転送し、KVM ゲストでネイティブ並みの Nvidia GPU。**Tailscale** が性能刷新を詳細公開（並列マルチキュー転送、コールドスタート 100×）。**Cloudflare が Vary 対応を出荷**（ヘッダーごとの normalize/passthrough/bypass——誰もが踏み誰も実装しなかった 25 年物の機構）。**ESP32-P4 がネイティブに Linux をブート**（デュアルコア RISC-V、C5 コンパニオンで Wi-Fi 6/BT 5.4）——マイコンが SBC 隣接へ、Pi の代替ではない。「ESP32 は Linux を走らせられない」時代の終わり。**Compositor**（robbiertilton、MIT、5.4k★）は信頼できるネイティブ macOS の Photoshop 型エディタ、3 日で署名入りリリース 3 本——プロ採用を決めるのはインポート忠実度の注意書き（PSD は 8bit RGB のみ、CMYK 非対応。ベクターはピクセル化）。**Search**（Office Commun）——約 3 MB の WebKit ブラウザ、依存ゼロの Swift 約 1.27 万行——現代ブラウザの大半は任意だったと示す。**m3e-canvas**（lnkiai、8.2k★、Trendshift #1）がデザイン→エージェントのハンドオフをコードでなくプロンプトに決着（M3E 画面 → Claude Code/Codex/Gemini CLI/Cursor 向け自然言語プロンプト）。主権・インフラ・保存: オランダ政府の **DAWO** が再現可能で監査可能な政府デスクトップに NixOS を選定（初期段階——ロードマップも予算も未公開）。**arXiv** が独立非営利として 1,720 万ドルの複数年資金を確保。**Qualcomm** が Snapdragon X2 の Linux 対応を公約（Debian は 2026 年末、Ubuntu 認証は H1 2027）。FoxDev Studio が Visual FoxPro を原版検証済みの Rust/WASM 再実装で復活。GeaStack は TypeScript+CSS を 6 ターゲットのネイティブアプリへコンパイル（ESP32 上の 60fps CSS アニメ含む）。pkimpel/retro-1620 は 1963 年の十進・可変フィールド長 IBM 1620 Model 2 を操作環境ごとブラウザでエミュレート。

Sources:（英語版と同じ）

## 2026-09-26 04:35 — Go がポータブル SIMD を出荷；Typst が LaTeX の二つの堀をクリア；OpenBao がポスト量子へ；git-bug がカーネルツールチェーンへ

**Go の SIMD 実験**（go.dev ブログ、HN 304 pts）：`GOEXPERIMENT=simd` により、アーキテクチャ固有の `archsimd` パッケージ（現状 amd64；arm64/NEON と wasm は 1.27予定）と、C++ Highway を手本とした完全ポータブルな `simd` パッケージ（同一コードがどこでも動くエミュレーションフォールバック付き）が登場。ブログ自身の限界が項目内にある：演算は全サポート対象プラットフォームの共通部分に制限、`ReduceSum`/`OnesCount` は未実装、`GODEBUG=simd=+N` の強制モードは非対応ハードウェアで panic しうる、そして 1.27 は「最初の実験的リリース」——「実験的」という語以上の安定性コミットはない。Rust の Fearless SIMD 1.0（09-25 網羅）が別エコシステムで刻んだのと同じ里程標：GC 付き主流言語で、C やアセンブリに落ちずにホットループの逃げ道を得る。**Typst 0.15**（LWN の解説）：HTML エクスポートの MathML（MathJax 不要のネイティブ数式）、マルチスタンダード PDF 出力（非互換フラグ付きの PDF/A + PDF/UA アクセシビリティ）、可変フォント、マルチ出力バンドル、章ごとの参考文献——限界は保持：HTML エクスポートとバンドルは `--features` 奥で実験的、メンテナ Laura Maedje いわく 1.0 は「まだ先」、ジャーナルの LaTeX/Word 専用投稿システムが本当の堀のままであり、コントリビューションガイドは LLM 生成パッチを拒否。**OpenBao 2.7.0**（Linux Foundation の MPL-2.0 Vault フォーク）：PKI/Transit エンジンの ML-DSA（FIPS 204）ポスト量子署名、`X25519MLKEM768` による純 PQC TLS、External Keys（鍵素材は外部 KMS が保持、OpenBao 内に入らない）、PebbleDB ストレージ——そして意図的な削除：`file` バックエンド廃止、6 つの auth/secret エンジンをメインバイナリから分離、9 件のセキュリティ勧告を修正；サポートは `api/v2`/`sdk/v2` のみ。**git-bug**（GPLv3、10.4k★）は具体的なトリガーで注目を集める：b4 メンテナ Konstantin Ryabitsev が Kernel Recipes で **b4 と cgit** の git-bug サポートを実演——分散・オフラインファーストで issue を通常の git オブジェクトとして保存（`git bug push/pull`）、GitHub/GitLab/Jira/Launchpad 橋、形式的なオンディスク DAG、プロジェクトにファイルを追加しない；README 自認の限界：Web UI は公開ポータル運用に「まだ追いついていない」——メールフローネイティブなトラッキングであって Launchpad の代替ではない。**Factorio FFF-447**：序盤エンティティの 15 モデルセット / 65 モデル / 247 STL ファイルを Printables で無料公開、リミックス奨励——2024 年からの Prusa Research との共同でサポートレス印刷と「上下逆の biter + 着脱シェル」の色付けを解決；商業的理由のないスタジオが資産を開放し、工程ノート付きだった。

Sources: [Go ブログ](https://go.dev/blog/simd-experiment) · [HN](https://news.ycombinator.com/item?id=49843269) · [LWN — Typst 0.15](https://lwn.net/Articles/1092993/) · [openbao/openbao v2.7.0](https://github.com/openbao/openbao/releases/tag/v2.7.0) · [git-bug/git-bug](https://github.com/git-bug/git-bug) · [HN](https://news.ycombinator.com/item?id=49843174) · [Factorio FFF-447](https://factorio.com/blog/post/fff-447)

## 2026-09-26 12:40 — セルモデルが壊れる；コンパイラの正直な失敗台帳；Johannes Doerfert を偲んで

**Excel が 1 セルに複数値を格納**（Microsoft 365 Insider ブログ、HN 125 pts）：40 年の歴史で初めて「1 セル 1 値」を破る——リストと配列がネイティブなセル値になる（`Ctrl+J` でリスト挿入；`{1,2,3}` で配列をスピルせずセル内に保持；`{{1,2,3};{4,5,6}}` で 2D を合成）。`FLATTEN` とメンバーシップテスト `HAS`/`HASANY`/`HASALL` も同時出荷。Beta チャネル プレビュー（Windows 2610 Build 20520.20000+、Mac 16.114）。記事自身の注意書きが本題：ネスト配列計算には "Compatibility Version 3" が必要（既存の数式の一部は結果が変わる——Microsoft がバージョニングで 1 セル 1 値の仮定がどこまで深いかを認めている）、かつ条件付き書式・データ検証・グラフ・ピボットテーブル・Power Query・検索と置換はまだセルリストを理解しない。旧モデルの上に築かれたスプレッドシート・パーサ・統合の生態系こそが互換性サーフェス。

**追悼 — Johannes Doerfert、1989–2026**（LLVM Foundation ブログ、9 月 24 日）：9 月 17 日逝去、36 歳。2014 年から LLVM に貢献、2012 年から Polly；**Attributor**（LLVM の手続き間不動点反復フレームワーク）を設計・推進；OpenMP target offloading の code owner として、OpenMP を NVIDIA・AMD・Intel GPU に載せたコンパイラとランタイムの仕事——「ほぼゼロオーバーヘッドの GPU 実行」技術を含む——を主導；10 年間 GSoC 学生を指導。OpenMP からの GPU offloading は HPC の荷重を支えるパスであり、その多くは一人の十年分の地味なインフラ作業の上にある。

**rayfuck — 23 MB の Brainfuck で書かれたレイトレーサ**（`mTvare6/rayfuck`、HN 46 pts）：手書き BF ではなくコンパイラパイプライン：C → SSA 風形式 → 中間 DSL（`add`、`mul`、`sqrt`、`if`、`while`）→ BF。LLM は一つの仕事に意図的に限定（C から SSA への変換——機械的変換であってコンパイラ全体ではない）。Q16.16 マルチセル固定小数点（Q8.8 は却下：地面の球に半径 1000 が必要）；プログラムは 23 MB で「画像本体より大きい」；スループットは約 1 ピクセル/分。最も良いのは著者の正直さ：ヒーロー画像は C 版による近似レンダリングで、JIT 高速化後の実際の BF 出力は「精度誤差のせいだろうが、ゴッホの絵みたいに見える」。記録された失敗台帳は磨き込まれたデモに勝る。

Sources: [Microsoft 365 Insider ブログ](https://techcommunity.microsoft.com/blog/microsoft365insiderblog/put-multiple-values-in-one-cell-with-lists-and-arrays-in-excel/4559395) · [HN — Excel](https://news.ycombinator.com/item?id=49849832) · [LLVM ブログ](https://blog.llvm.org/posts/2026-09-24-rememberingjohannesdoerfert/) · [epestr.com](https://epestr.com/blog/writing-a-ray-tracer-in-brainfuck/) · [mTvare6/rayfuck](https://github.com/mTvare6/rayfuck)

## 2026-09-27

**Floci——AWS/Azure/GCP/OCI の無料 MIT ローカルエミュレータ**（`floci-io/floci`、25.7k★、HN 132）：Quarkus + GraalVM Mandrel のネイティブバイナリ（24 ms 起動、アイドル 13 MiB）が localhost 上でクラウドサービスを動かす、アカウントもトークンも不要——:4566 で 119 の AWS サービス、無料の LocalStack 代替と明示的に位置づけ（2026 年 3 月のトークン義務化が引き金）、さらに Azure 28 / GCP 25 / OCI 8 サービス；一部はモックでなく実エンジン：Lambda は Docker コンテナで実行、RDS は本物の PostgreSQL/MySQL、ElastiCache は本物の Redis。注意点：AWS 以外の網羅は薄い、Lambda は Docker socket が必要、「100% プロトコル忠実度」はプロジェクト自身の主張。

**GNOME Toolpak——CLI ツール向け Flatpak 式パッケージング**（9/26）：不変デスクトップ（Silverblue、GNOME OS）の隙間を埋める——rpm-ostree レイヤリングは「システムを完全に壊しうる」、Toolbox/distrobox コンテナはホストをデバッグできず、Flatpak は CLI にはサンドボックスが強すぎる。Flatpak の /usr–/app 分割を採りつつ dm-verity + 署名つき Discoverable Disk Image を使用、ツールごとに 1 マウント名前空間、無制限のシステムアクセス、ツール間依存なし；ビルドはコンテンツアドレス可能ストアの BuildStream 上。プロトタイプ進行中（Prototypefund）；ビルド環境の話は明示的に後回し；署名「アプリストア」モデルの信頼/レビューはすでにコメント欄で議論に。

**Loongson LA664 が `amadd` を静かに落とす**（jia.je、HN 74）：3A6000/3C6000-S（LA664 コア）では、データバリア接尾辞なしのアトミック命令（`amadd` vs `amadd_db`）が、異なる物理コアのスレッドが同一アドレスで LASX ベクトル読みを交错させると更新を静かに落としうる——敵対的テストで失敗率最大 100%；`_db` 変種は 0%。失われた参照カウント増分 → *safe* Rust での use-after-free（`Arc`、`mpsc`）。発端は Debian `normaliz` の OpenMP カウンタが収束しないこと（2 月）、8 月に AI の助けを借りて glibc の LASX 加速 `memcpy` をトリガと特定；修正は未文書化 CSR MCSR24 の bit 13 を立てるファームウェア（テストファームウェア 9/9）。「安全な」Rust はハードウェアアトミックが実際にアトミックであることに依存している。

**safe-not-safe——安全でない Postgres マイグレーションのブラウザローカルリンタ**（Show HN 111）：libpg_query（PG 17）を WASM にコンパイルし web worker で実行——「SQL はブラウザから出ない」——ルールエンジンがロック/可用性リスク（`CREATE INDEX CONCURRENTLY`、`NOT VALID` + `VALIDATE CONSTRAINT` パターン）を検出、CLI もあり（`npx safe-not-safe check`）。静的ヒューリスティクスのみ——実際のロック挙動や `lock_timeout` は観測できない；31★、ライセンスファイルはまだない。

**Go Concurrency Distilled**（Anton Zhiyanov、HN 83）：キャンセル原因（`WithCancelCause`）、`synctest` フェイククロックパッケージ、pprof/フライトレコーダ診断つき M-on-N スケジューラまで網羅する無料ミニブック；全サンプルがブラウザで動く。「初心者向けガイドではなく手早い復習用」と位置づけ——そして明示的に「AI-free」（→ [[no-ai-default]]）。

**Neomacs が 1.5k★ で再トレンド**（`eval-exec/neomacs`、HN 42）：3 度目の「C を超える Emacs」の試みはエコシステムをそのまま保つ——設定、パッケージ、Elisp——そして約 30 万行の C コアを Rust で再実装し GPU 表示エンジンを載せる；Lisp ツリーは `emacs-31.1` に同期し、**GNU Emacs 自体を行動等価性のテストオラクル**として使用。バイト互換 Elisp をハード制約にする点が、過去の書き直しを殺した失敗モードを回避する鍵（WIP バナーはそのまま）。

**Ken Shirriff が 8087 の FPTAN をダイレベルでリバース**（righto.com、HN 46）：1,648 命令のマイクロコード ROM を復元——上位ビットは 16 ステップの CORDIC、微小残差には [1,2] Padé 近似 3x/(3−x²)（多項式では不可能な π/2 での正接の発散を模倣できるから有理関数）、除算は一度も実行しない（チップは分離した X と Y を返す）、さらに「チップに物理的に存在しない指数」を持つ固定小数点で 64 ビット整数演算。典型的に約 450 サイクル；ホスト 8086 エミュレーション約 13,000 µs に対し約 90 µs。1980 年の演算ハードウェア設計選択が、今日のアクセラレータ設計者の問いに直接対応する。

**Postgres の `SELECT DISTINCT` はスケールしない——再帰 CTE によるルーズインデックススキャン**（DBOS、HN 98）：Postgres にはルーズインデックススキャン演算子がなく、パーティションキューのワークロードは 3 つのパーティションキーを見つけるために 100 万行を走査；MySQL にはあり、2018 年のパッチは 4 年で頓挫、PG18 のスキップスキャンも述語一致行を全て読む。解法：ソート済みインデックス上で `min()` を繰り返し取る再帰 CTE、1 ステップで 1 個の DISTINCT 値——パーティション行数 1K→1M でレイテンシはフラット（通常クエリは線形増加）。著者自身の注意：「驚くほど読みにくい」。

Sources: [floci.io](https://floci.io) · [GNOME ブログ](https://blogs.gnome.org/alatiera/2026/09/26/introducing-toolpak/) · [jia.je](https://jia.je/hardware/2026/09/24/loongson-cpu-erratum-en/) · [safenotsafe.dev](https://safenotsafe.dev/) · [antonz.org](https://antonz.org/go-concurrency-distilled/) · [eval-exec/neomacs](https://github.com/eval-exec/neomacs) · [righto.com](https://www.righto.com/2026/09/8087-tangent-cordic.html) · [DBOS](https://www.dbos.dev/blog/postgres-select-distinct-does-not-scale)

## 2026-09-27 20:03 — デプロイ優先の TensorFlow、エージェントのための言語設計、可視化されたトークン化

**TensorFlow 2.22.0-rc0**（9/24、3 月の 2.21 以来初の RC；216★/日でトレンド）：リリースノートで検証——TensorBoard はデフォルト依存でなくなる（`pip install tensorboard` まで ImportError；破壊的変更）、tf.lite に QUI4 4-bit 量子化 Dequantize と FP16/BF16 Unpack、FLOAT8_E4M3FN/E5M2 dtype がコアに。20 万★リポジトリの稀なトレンドスパイクは量子化ファースト・エッジファースト——TensorFlow の残る重心が研究でなくデプロイにあることの表示。

**José Valim：「AI 時代のプログラミング言語の進化」**（dashbit.co、HN 108 pts）：Elixir の作者による二部エッセイ——人間がコードの大部分を書かなくなるとき言語*コミュニティ*は何を意味するか、そして coding agent を一等ユーザーとしてより扱いやすい言語にするための具体的な意見。Valim はテキスト内に自らのハッジを付す（「私の意見は……おそらく変わる」）と、講演とスレッドのdigest であり提案ではないと位置づける。非人間の第一読者のための言語設計が真剣な下位分野になりつつある——形式手法がエージェントコードでバズったのと同じ週にファウンダーレベルの声が加わったことは、ホットテイクから研究アジェンダへの転換を示す。

**すべての LLM トークンが同幅のフォント**（HN 71 pts）：アップロードされた任意のフォントを選択したトークナイザー（o200k_base、cl100k_base、DeepSeek V4.1 Flash、Kimi K3、GLM-5.3、Qwen 3.6…）の各トークンが同一幅で描けるよう再刻字するコンパイラ——フォントはブラウザ内に留まる。ページ自身の注意書きがプロジェクトを開く（「フォントの専門知識がないので、これは slop かもしれない」）。すべての LLM 請求とコンテキストウィンドウの不可視の基盤であるトークン化をページ上で物理的に可読にする玩具——minified JavaScript へのソースマップと同じ動き。

Sources: [v2.22.0-rc0 リリースノート](https://github.com/tensorflow/tensorflow/releases/tag/v2.22.0-rc0) · [dashbit.co](https://dashbit.co/blog/evolving-ai-era) · [HN — Valim](https://news.ycombinator.com/item?id=49839567) · [token-space fonts](https://ampdot.mesh.host/token-space-fonts.html) · [HN — フォント](https://news.ycombinator.com/item?id=49851883)

## 2026-09-28 04:03 —— エージェント生成 UI に slop チェックリスト。データ喪失を duty of care として枠づけ。TypeScript→ネイティブが固まる。無料 LocalStack 挑戦者の2例目。ディストロが生き残るため改名

**「slop UI の 10 の特徴」**（hereticpleb、HN 295 pts）：手間ゼロのエージェント生成インターフェースの視覚的署名 10 個 —— 紫のグラデーション、虹色ノイズ、脈打つバッジ、爪カード、emoji slop、位置ズレ、デフォルト Inter/JetBrains Mono、チャット文脈の漏洩（本番に残る「Written from Neovim」）、デフォルト glassmorphism、「Elevate/Seamless/Unleash」タグライン。書き側スタイルフィルタ（humanizer/caveman/no-ai-slop → [[token-economics]]）のインターフェース側対応物：失敗モードに名前を付ければ、レビュアーにチェックリストが渡る。範囲の留保は明示：AI コーディング反対ではない（「このサイト自体 vibe-coded」）——個人分類学であり研究ではない。

**NeoVim が Vim の undo ファイルを削除した件が HN の日を得る**（Wichary の 8/28 essay が再浮上。305 pts/267 コメント）：Vim 形式の永続 undo ファイルに遭遇すると、Neovim はそれを削除し Vim が読めないファイルを書き出した —— 約 20 年の形式互換が破壊。報じられたバグ報告への回答（「undo 形式は不安定」）が「ユーザーの作業への duty of care の概念がない」という枠づけを誘発、Jef Raskin の第一法則対比。留保は維持：一方当事者の二次的証言、Neovim 側の説明なし、issue は旧時代のもの。持続する要点：ディスク上のユーザーデータを*どう扱うか*は care の義務であり、エディタ混在ワークフローが生きた踏み槍。

**scriptc**（vercel-labs、Apache-2.0、5.3k★）：TypeScript/JS → 型付き IR → 可読 C → LLVM IR/ネイティブ/WASM。解析と型検査は本物の `tsc`。静的ビルドは小さなネイティブランタイム同梱（Node/JS エンジンなし）、`--dynamic` は quickjs-ng を埋め込み。トリガーはペース：40 時間で v0.1.5–0.1.7 の 3 リリース、v0.1.7 で**ネイティブのソースレベルデバッグ**——採用を阻んでいた穴。実験的明記、Node ≥24、ネイティブ経路は現在バンドルした macOS 15+ arm64 ヘルパに依存。

**Fakecloud**（`faiscadev/fakecloud`、AGPL-3.0、615★、HN 80 pts）：2 日で2つ目の無料 LocalStack 挑戦者（09-27 の Floci に続き）——実 SDK/CLI/IaC でローカル AWS と対話、「アカウント不要、auth トークン不要、有料枠なし」、差別化は**アサーションファーストのテスト SDK**（TS/Python/Go/PHP/Java/Rust）で状態にアサートし非同期の AWS 的挙動を強制できる、30+ のサービス横断配線。105 サービスと「248,557/248,557 Smithy バリアント合格」を主張 —— **それは独自の適合数値で、Smithy モデルとの比較であって実 AWS 挙動ではない。**LocalStack のライセンス変更がカテゴリを開いた。適合主張はコミュニティ検証待ち。

**postmarketOS が Nura に改名**（nura.eco）：10 年ライフサイクルの Linux Phone ディストロがヌラーゲ（nuraghe）の石塔にちなみ改名 —— 300+ 候補を言語横断の含意審査、順位投票、商標出願（nura.org は取得済み、所有者が売却拒否）；自述の動機：記述的な旧名では偽物サイトの餌食になるとのこと。合意形成に*失敗してやり直した*最初の試みを含む、コミュニティ主導改名のケーススタディ。機能変更なし。移行期は「postmarketOS」表記が残存。

*小さいけど本物*：mitxela の **flipflip** —— 回収した Hanover フリップドットパネルで本物の FLIP 流体シミュレーション（8 パネル、STM32H7R3、約 £500、EMF 2026 で 4 日間無故障。完全な build ログ、正直な会計：18 パネル目標は工数支配で 8 に削減）。

ソース：[10 tells of slop](https://hereticpleb.vercel.app/blog/10-tells-of-slop) · [HN](https://news.ycombinator.com/item?id=49867038) · [Unsung — duty of care](https://unsung.aresluna.org/they-had-no-concept-of-a-duty-of-care-to-their-users/) · [HN](https://news.ycombinator.com/item?id=49867067) · [vercel-labs/scriptc](https://github.com/vercel-labs/scriptc) · [fakecloud.dev](https://fakecloud.dev/) · [faiscadev/fakecloud](https://github.com/faiscadev/fakecloud) · [Nura 改名](https://nura.eco/blog/2026/09/27/nura-rename/) · [mitxela — flipflip](https://mitxela.com/projects/flipflip)

## 2026-09-28 12:03 + 20:03 —— AI コードの fork 境界；Go の GitHub 結合；DSPy on BEAM；IRC をフェデレーションの wire protocol に

**Madeira**（`willfaust/Madeira`、GPL-3.0-or-later、859★）：**脱獄していない** iPhone で x86-64 Windows PC ゲームを動かす——Wine（ARM64EC）、FEX-Emu（x86-64→ARM64）、DXMT（D3D11→Metal）を単一の Mach プロセスとして実行、wineserver はスレッドに降格；デバッガアタッチ（StikDebug）で JIT entitlement を取得、無料署名アカウントは週次再ビルド。README の正直さが物語：プレイ可能と明記されているのは Thumper と ULTRAKILL のみ、Marvel Cosmic Invasion は「説明不能な終了」で終わる、「研究プロジェクトであり製品ではない」——そして fork が AI 支援コードを含むため、貢献者は FEX-Emu への上流提出を**しない**よう求められる。同ポリシーは AI 生成コードを禁止している。明示的な AI コード fork 境界（→ [[no-ai-default]]）：「AI なし」が製品ポジショニングだけでなく*貢献ポリシー*として、コードの流れる先を決める。

**"Don't couple your Go code to GitHub"**（HN 170 pts）：Go のインポートパスは URL であり、ソース・go.mod・git 履歴中の `github.com/...` はサードパーティインフラへの恒久的依存——内部パッケージにカスタムドメインを、と主張。スレッドの反論こそが価値：カスタムドメインは失効しスクープされる（比較すれば「GitHub はほぼ永遠」）、デフォルト Go プロキシはホスト消滅後もパッケージを提供し続ける、移行は `sed` 一発——または旧バージョンタグ毎の修正で数週間の苦行——Go チーム自身も今日設計するなら registry を選ぶと多数が指摘。エージェント時代が拡大するのと同じリポジトリホスティング集中リスク（skills、MCP 設定、プラグインのすべてが GitHub URL に固定）が、結合が文字通りソースに書かれているただ一つのエコシステムで論じられた。

**Imp**（`deepfates/imp`、MIT、9/27 に v0.5.0 が hex.pm へ、152★）：スタンフォード DSPy——宣言的・自己改善的な LM パイプライン——の BEAM への完全移植。OTP のスーパーバイジツリーとフォールトトレランスは長時間実行の LM パイプラインに自然に対応。誠実なスケール確認：hex 総ダウンロード 93、公開版は 1 のみ——初期の移植であって生態系ではない。6 コメントのスレッドに本物の論争：モデルが構文で壊れなくなり分野がツール呼び出しへ移った今、構造化デコーディングの重要性は下がった vs DSPy の最適化技術は「依然極めて価値がある」。主要言語コミュニティのすべてが DSPy 型抽象を輸入しつつある；Imp の問いは BEAM の並行モデルが真により良い基盤か。

**Parley**（James Mills/prologic；`git.mills.io/prologic/parley`；HN 85 pts）：wire protocol が素の IRC であるフェデレーテッド・非中央集権チャット——自分のドメインにインスタンスを立てれば、誰でも irssi や任意の IRC クライアントから `user@domain` で到達できる；新クライアント不要、移行不要、ブリッジボット不要。Armada（Nostr 系 Discord 代替、9/27）の 2 日後に登場——「プラットフォームなしで Discord を置き換える」試みが混雑した週であり、Parley の賭けは新プロトコルの正反対：皆が既に話せる唯一のチャットプロトコルを再利用する。フェデレーテッドチャットの死命はクライアント採用；既存の IRC 艦隊をクライアント基盤にするのが最も保守的——おそらく唯一実行可能——な導入路。

**cs341-illinois/coursebook**（+265★/日、2.2k★）：UIUC のオープンソース・システムプログラミング教科書（Angrave の古典 SystemProgramming wikibook を拡張；引用、脚注、用語集、CI 自動エクスポートの PDF/EPUB/HTML/Markdown；全編 C）。単一のトリガーなし——9 年ものの講義教材が trending に浮上——そして**license ファイルがない**、再配布こそが存在意義のリポジトリにとって実質的な再利用の但書。大学の講義が CS 教育の最高品質の無料レイヤーになり続けている——そして構造化・エクスポート可能な教科書は、エージェントが教えるのにちょうど良い形状。

**byoungd/up が 64.3k★ で再浮上**（+310★/日）：2017 年に有名な中国語圏の英語学習ガイドとして始まり、現在は韓先凱（筆名・离谱）による《人生进阶指南》——英語から AI 時代の学習、実プロジェクト、スタートアップの失敗と回復まで；CC BY-NC 4.0 の無料 EPUB/PDF。README は独自の方法論を明示（「問題を発見 → 学ぶ → AI と協働 → 実タスクを完了 → 証拠を残す → 復習と転移」）し、研究知見・個人的経験・未検証の仮説を分けている。単一著者のマニュアルで、商業的関係は審査ではなく開示；再浮上は中国語 GitHub 圏が牽引。その軌跡——英語ガイド → AI 協働マニュアル——は今のオーディエンスシフトの形であり、その内側から書かれている。

Sources: [willfaust/Madeira](https://github.com/willfaust/Madeira) · [FEX-Emu 上流](https://github.com/FEX-Emu/FEX) · [iain.rocks](https://iain.rocks/blog/dont-couple-your-go-code-to-github) · [HN](https://news.ycombinator.com/item?id=49868404) · [hex.pm/packages/imp](https://hex.pm/packages/imp) · [deepfates/imp](https://github.com/deepfates/imp) · [git.mills.io/prologic/parley](https://git.mills.io/prologic/parley) · [HN](https://news.ycombinator.com/item?id=49875913) · [cs341-illinois/coursebook](https://github.com/cs341-illinois/coursebook) · [byoungd/up](https://github.com/byoungd/up)

## 2026-09-29 04:03 — サブスクリプション疲れの風刺が2度目の問い合わせに。エージェントが丸ごと所有したハードウェアプロジェクト

- **「Windows 11½」**(definitelynotwindows.com。HN 288 pts / 77 コメント):現行の業界慣行を誇張した非公式のインタラクティブ風刺デスクトップ——Excel が `SUM()` に `#SUBSCRIPTION!` を投げる、Word がサブスク中の編集をブロック、スタートメニューは買い物勧誘だらけ、月 $6.99 の「Clippy 365」、Recall は全てをインデックスしプライバシーは「製品ロードマップ次第」、BSOD 停止コード `USER_ATTEMPTED_PRODUCTIVITY`。Microsoft と無関係であることを明示し、実在の認証情報や支払いは求めない。**限定：**風刺であり製品ではない——ニュース価値は視聴者の反応の方。900+ pts の「When did Google get so weird?」スレッドと同じ週に現れた、広告まみれのサブスクリプションゲート型ソフトへの敵意が主流の感情になったことを示す2つ目の高速度データポイント——エージェント時代の製品判断が下される文化的背景。
- **PaperMono ショッピングリスト**(Show HN、107 pts / 51 コメント。リポジトリは 9/27 作成)：M5Stack PaperMono 端末(ESP32-S3、e-ink タッチスクリーン)向け C++ e-paper クライアント。Wi-Fi 経由でスマホ Web UI と同期、オフライン動作、約 2,400 行——著者曰く「fully vibe-coded with Claude Code、私は一行も手書きしていない」。Claude が新しいハードウェアデバイスをどう扱うかを見るために作られ、既に家庭で毎日使用中。限定：単独作者の週末プロジェクト、リリースなし、README 冒頭にライセンス記載なし。「エージェントはハードウェアプロジェクトをエンドツーエンドで所有できるか?」に対する、小さいが完全なデータポイント——既製端末、Python バックエンド、モバイル Web、アプリストアなし、正直な作者性開示。

Sources: [definitelynotwindows.com](https://definitelynotwindows.com/) · [HN](https://news.ycombinator.com/item?id=49881747) · [seamusc/papermono-shopping-list](https://github.com/seamusc/papermono-shopping-list) · [Show HN thread](https://news.ycombinator.com/item?id=49875801)

## 2026-09-29 12:03 — 「coding is not solved」が今週 3 本目の高速住民投票に。エージェントが規模で再導入するタイムゾーン往復

**「Coding is not solved」**（Alex Ewerlöf、HN 461+ pts）：SRE ベテランが、LLM はソフトウェアのコスト構造を反転させる——創造は安くなったが「保守、信頼性、セキュリティ、スケーラビリティ等がコストの大半」——と論じ、AI はその半分を吸収できない。理由は「AI は説明責任を負えない……AI は罰せられない、ゆえに決して説明責任を負えない」。誰も読まないコードは 3 カテゴリに限定：個人ソフトウェア、POC、「武器化された AI」。著者自身の限定：意見が重い（「ストローマンフォールに注意」）、「反 AI ではない」、自身 LLM ハーネスを構築済み。「When did Google get so weird?」（900+ pts）やアーキテクチャ意図の記事に続き、 profession 内部から「コーディングは解決済み」の枠組みを拒む今週 3 本目の高速エッセイ——名指しされた引っかかりは**能力ではなく説明責任**。

**Postgres `AT TIME ZONE 'UTC'`**（HN 162+ pts）：`AT TIME ZONE` は入力型で意味が反転する——`timestamp without time zone` に対しては値を UTC と*宣言*し（`timestamptz` を生成）、`timestamptz` に対してはタイムゾーンを*剥ぎ取り*素の壁時計時刻を返す。つまり一見慣用的な `now() AT TIME ZONE 'UTC'` は変換ではない——`timestamptz` は既に UTC で格納されている——ゾーンを捨てており、2 回連鎖させると値を反転させる。誤った出力は後から、比較とクライアント側処理で顔を出す。naive/timestamptz 往復という静かなデータ破壊クラス——コード生成エージェントが規模で再導入するであろう「当然」の SQL そのものであり、コードレビュースキルルールの最有力候補（テーゼ 8 のスキル評価段階参照）。

Sources: [blog.alexewerlof.com](https://blog.alexewerlof.com/p/coding-is-not-solved) · [HN — エッセイ](https://news.ycombinator.com/item?id=49877988) · [bookofrevenue.com](https://bookofrevenue.com/blog/6ab81e9a97a13f0001f7e4e1/postgres-at-time-zone-u-does-not-do-what-you-think-it-does) · [HN — Postgres](https://news.ycombinator.com/item?id=49865312)

## 2026-09-29 20:03 — サーバ設定の 1 ペイロードが iOS エコシステムをクラッシュループへ。Godot のネイティブライブラリの壁。セルフホスト PaaS は登り続ける

- **Firebase Analytics `sdk-exp` インシデント**(firebase-ios-sdk #16728、500+ コメント。HN 100+ pts):Sep 29 00:41 UTC から、世界の iOS アプリが新しいリリースなしで起動時にクラッシュループ——Google の `sdk-exp` エンドポイントが配った不正な実験ペイロードが `-[APMEExperiment copyWithZone:]` を打ち、nil のフラグ名が辞書キーとして `GULMutableDictionary` に渡された(`NSInvalidArgumentException: key cannot be nil`)。コミュニティの再現がトリガーを特定(欠落・不正 UTF-8 のフラグ名——protobuf デコードは成功し、変換でクラッシュ)し、SDK 11.x〜12.19.2 のすべてが影響を受けるため更新でも回避不能と示した。Google の要約:Sep 28 17:41 PDT 開始、19:52 PDT に修正完全展開(約 2 時間)。クライアントキャッシュの残留は最大 4 時間。SDK 更新は不要。**注意:**issue スレッド要約を超えるインシデントレポートなし。影響範囲は各アプリの自己申告クラッシュ数としてのみ存在。サーバ駆動設定は本番トラフィックである——クラッシュリスクと見なされていなかった実験チャネルが、iOS エコシステムの未知だが巨大な一角を倒した。カナリアとロールバックの規律は設定エンドポイントにも適用される。
- **Conan:Godot で任意の C++ ライブラリを使う**(Conan ブログ、HN 69 pts):GDExtension + godot-cpp の実践ガイド——「C++ コードを書くのが簡単な部分」。godot-cpp をエンジンバージョンに固定し、エクスポートプラットフォームごとに推移的なネイティブ依存を解決するのが難しい。Conan チーム執筆。実演であってベンチではない。コンソール/モバイルは範囲外。Unity/Unreal に対する Godot の差はまさに薄いネイティブライブラリの物語——パッケージマネージャ型ビルドがその壁を下げる。
- **t8y2/dbx が再トレンド**(本日 +460★ で 21.6k★、v0.6.27、Sep 28):約 25 MB・100+ DB 対応の Rust クライアントが Transwarp Inceptor、選択的クラウド同期バックアップ、DuckDB への Parquet インポートを追加。MCP サーバ + CLI はプリコンパイル済みネイティブバイナリ——同じ道具が人間だけでなくエージェントのデータベース面として自己位置づけ。注意:リリースノートは中国語優先。全認証情報を握る道具に独立セキュリティ監査なし。(09-11 エントリの dating update。)
- **Openship v0.8.0**(Sep 27、13.6k★、Apache-2.0、TypeScript):セルフホスト PaaS 最大のリリース——アプリ/PostgreSQL/Redis をマシン間でスケールするサーバクラスタ、プライベートネットワーキング、共有ファイル、Node SDK、拡張された MCP 自動化。注意:v0.x の破壊的変更は日常茶飯事。「scale」はマルチサーバ分散であってオートスケーリングではない。MCP 自動化は言及のみで文書化されず。Coolify 時代の波が、すべてのセルフホスターが結局自分で持ちたくないと気づくマネージドプラットフォーム機能へ登る。
- **Phyllotaxis LED ディスプレイ**(jagi.studio、HN 168 pts):ひまわりの種の葉序をオーディオ反応型 LED マトリクスへ写像——三角法約 15 行、黄金角込み。HN の繰り返しの教訓:深く見える生成パターンは最短のコードであることが多い。個人アート作品であってキットではない。

Sources: [firebase-ios-sdk #16728](https://github.com/firebase/firebase-ios-sdk/issues/16728) · [HN — Firebase](https://news.ycombinator.com/item?id=49889934) · [Conan ブログ](https://blog.conan.io/cpp/conan/gamedev/godot/cmake/2026/09/29/Using-Any-Cpp-Library-In-Godot.html) · [HN — Godot](https://news.ycombinator.com/item?id=49890051) · [t8y2/dbx](https://github.com/t8y2/dbx) · [oblien/openship](https://github.com/oblien/openship) · [jagi.studio](https://jagi.studio/posts/phyllotaxis/) · [HN — Phyllotaxis](https://news.ycombinator.com/item?id=49880411)

## 2026-10-01 04:03 + 12:03 — 最後の閉じた C++ フロントエンドが開く。Gitea が「1.」を外す。Slug 特許がパブリックドメインへ。人生の助言が検索コーパスになる

**EDG の C++ フロントエンドが公開される**（9月30日。edgcpp.org を今回実訪問：「2026年9月30日、EDG の C++ フロントエンドのソースが公開され、The C++ Alliance が非営利の托管先となりました」。サイトには John Spicer の移行文と FAQ）：業界最後の閉じた生産級コンパイラフロントエンド——30年間「唯一の生産級 source-to-source エンジン」として商用コンパイラや IDE ツールに組み込まれ、公開は Sutter の 2025年11月 Kona 旅程報告で予告済み。方式：三トラック、一コードベース——コミュニティ PR、Alliance の EDG 技術者による常時オープンな保守、共同資金の機能——「誰も早期アクセスを得ない」。リポジトリは実在し中身がある：`edgcpp/compiler`（9月22日作成：`src/`、`lib_src/`、ヘッダ、テスト、CMake、license）。Clang が第二のオープンフロントエンドの存在を証明した。EDG は最後の閉じたそれだった——非営利の托管はライセンス関係をコモンズに変え、標準適合のリファレンス実装に一社のロードマップに依存しない生存経路を与える。

**Gitea 28.0.0**（blog.gitea.com、70 pts）：歴史的な `1.` 接頭辞を廃止。監査ログ、bot アカウント、HTTPS deploy トークン、管理者 impersonation、code-owner 承認ルール、diff ファイルフィルタ、Actions キュー表示。セキュリティ節は意図的なもごもご：「本リリースはセキュリティ修正を含みます。全員がアップグレードする時間を与えるため、詳細は約1週間後にこの投稿に追記します」——「最新リリース」と「完全開示」は別の状態。Gitea を公開に置くなら、開示ではなくリリースでアップグレード。破壊的変更：リリースバイナリから 32bit x86 と `gogit` が消える。**Slug 特許がパブリックドメインへ**（AlphaPixel、106 pts）：Eric Lengyel が 2019 年の特許——Slug、断片シェーダで輪郭から直接グリフを描画、テクスチャアトラスもフレーム毎テッセレーションもなし——を **2026年3月17日**にパブリックドメインへ献上（引用は今回ページ上で確認）、それが AlphaPixel による Slughorn（C++20、MIT）の実装を可能にした。HN トップコメントの定番訂正：MSDF アトラスは静的ベイクの必要はなく、非同期アップロードが CJK を解く。**Factorio Quality を線形計画に**（exyr.org——Simon Sapin。240 pts、91コメント）：五段階 Quality/リサイクル終盤（段階飛び +10%、4スロット機で 24.8% 封頂）を LP として定式化しオンライン計算機付き。HN は動く伝説品質単一組立機のビルドを寄稿した——「ゲームを解く」ジャンルがほとんどの OR 教科書より教える。**「コミット説明を思考の道具に」**（yedhu.me、81 pts）：今はエージェントが commit body を下書きする。失われるのは内省——「AI が『なぜ』を知らないとき、自分で理由を作る。あれは危険だと思う」。全文脈を渡せば捏造は直せるが、損失は直らない：書くプロセス自体が目的だった。コミットメッセージはコードレビュー・ポストモーテムの列に加わる——「書く」行為自体が荷重を支えていた産物。**HowToLiveBetter**（eternity4719/HowToLiveBetter、32.3k★、CC-BY-4.0、9月7日作成——9月の新規リポジトリで最多スター）：649項のエビデンス階級付き人生の助言（A 428 / B 171 / C 50）、期刊論文と公式文書のみを引く 1,531 の出典リンク、VitePress サイト＋ PDF/EPUB/オフライン HTML リリース——2026 の部分：**Claude Code と Codex 向けエージェントスキル**。「友人のローンの連帯保証人になるべきか」に答えるとき、まず本の項目を検索し、節と項目の引用を添える。単ページリーダーの姉妹品がさらに 5.9k★。byoungd/up の系譜を検索コーパスとして工学的に——エビデンス階級、密集した引用、エージェントが行単位で引用できる構造で、人間とエージェントの両方の読者に向けて書かれた。**56k.rip**（100 pts）：1996 年のダイヤルアップの儀式一式をブラウザタブに——意図的に保存された、エージェント以前のインターネット。

## 2026-10-03 05:03 — Apple Pass Designer：iOS 正確なプレビュー付きのファーストパーティ GUI

**Pass Designer**（ベータ、macOS 27 が必要、Apple Developer 登録は無料。HN 106 pts）：Apple Wallet のパス——ストアカード、イベントチケット、搭乗券——を設計・プレビューするダウンロード型 macOS アプリ。売りは忠実度：ライブプレビューは「iOS および watchOS と同じレンダリングを使用するので、Pass Designer で見たものがそのまま顧客のデバイスで見える」。作業しながら検証（欠落キー、想定外の定義）、Siri Suggestions・カレンダー・マップに流れるセマンティックタグ対応、「セマンティックデータから後方互換パス構造を自動生成」も。パス設計は手書き JSON と署名の苦役で、目視確認のループは実機を通るものだった。ピクセル一致プレビューのファーストパーティデザイナーがそのループを折り畳んだ——同じ日、Apple は別の開発者表面を締め（フルディスクアクセス、→ [[platform-gatekeeping]]）、こちらは磨いた。

Sources: [developer.apple.com/pass-designer](https://developer.apple.com/pass-designer) · [HN 議論](https://news.ycombinator.com/item?id=49937276)

## 2026-10-04 04:03 — コンテナがユーザースペース OS になる。Orion は後退。OHTTP に製品が付く。Rails アズコンパイラがブラウザ側を認める

**FTL v0.1.0**（nuta/ftl、MIT/Apache-2.0 デュアル——Rust-OS で名を成した Seiya Nuta）：各コンテナが*ユーザースペース OS* を走らせる——Linux プロセス・VFS・TCP/IP を実装する共有ライブラリが、ハイパーバイザ形状のシステムコールを公開する小さなカーネルの上に乗り、Linux 互換は WSL1/Linuxulator の伝統にならいユーザースペースライブラリとして。驚きの設計ノート：**「FTL は例外をユーザーモードで捕捉する（ハードウェア支援仮想化ではない）」**——リリースデモは QEMU を `-m 32`（32 MB）で起動し、プロジェクト自身のサイトは FTL 上で走る Rust HTTP サーバが配信している。ロードマップは若さに正直：ファイルシステム 2026年11月、Node.js/Go 対応 2026年12月、SMP とコンテナイメージ 2027年1月。コンテナ隔離設計空間の第 3 の点——namespace+cgroups でもハードウェア VM でもなく、ユーザーモードトラップ。密度の主張が保てば、リクエスト毎コンテナのコールドスタート経済学がまた変わる。

**Kagi が Orion の Linux/Windows 版を終了、両方をオープンソース化。** WebKit ベースのブラウザは macOS/iOS に後退。Linux Beta は 10月2日の発表とともに更新停止（「メインブラウザには推奨しない」）。2026 年末予定だった Windows ローンチは Kagi 側で中止。ソース公開の詳細は 30 日以内に約束。「Chromium をフォークしない難しい道で造る」という意識的な非 Chromium 独立が看板で、理由はユーザー資金の「非常に小さなチーム、一握りの開発者」。**但し書きは Kagi 自身のもの：**「Kagi はコアメンテナーにならない」、財団や引き取り手はまだ見つかっていない、オープンソース化のライセンス条項は未決。2 番目に使える非 Chromium エンジンのマルチプラットフォーム未来は、約 30 日の窓で誰かが拾うか否かに懸かった。

**Cloudflare OHTTP Gateway**（クローズドベータ、有料ゾーンアドオン、価格非公開）：クライアントは HPKE 暗号化リクエスト（RFC 9180）を自ゾーンの `/.well-known/ohttp-gateway` エンドポイントへ POST。エッジが RFC 9458（+chunked-OHTTP ドラフト）でデカプセル化し、アプリサーバーは「OHTTP リクエストを普通の HTTP として扱う」——サードパーティリレーが引き続き暗号文だけを運び、クライアントの身元と内容を単一当事者が同時に見ることはない。面白いのはそのガードレール：ゲートウェイは**「Cloudflare Workers または Cloudflare のプロキシ対象ホストから送られたリクエストの復号を拒否する」**——単一ベンダーへの信頼収束がコードで阻まれている。縦積み統合に自ら抗うようハードコードした稀有なベンダー。Privacy Gateway は「Cloudflare OHTTP Relay」に改名。明示された限界：リレーは持ち込み。OHTTP は「ネットワーク層のプライバシーを提供し、内側のリクエストボディには触れない」。2 年間「プロトコルあれど製品なし」だった Oblivious HTTP に、アプリチームが実際に採用できるマネージ版が付いた。

**Roundhouse——「The Browser Half」**（rubys/roundhouse、Apache-2.0、取得数分前にプッシュ）：Sam Ruby の Rails→9 言語コンパイラ（Rust、Go、TypeScript、Crystal、Elixir、Kotlin、Swift、C#/.NET、Python——「デプロイターゲット……はランタイムの選択からコンパイラフラグになる」）。型はアノテーションなしの全プログラム推論から（「`has_many :comments` は型宣言である」）。**Mastodon（1,173 ファイル、全 337 コントローラ、HAML 込み）** の 1 パスは約 1.5 秒。正しさは Rails と各ターゲットから同一 URL を取得して diff する適合オラクルで釘付け。Ruby は 9月18日の初リリース以来ほぼ毎日ブログを書いており（Campfire は 299/300 テスト合格）、今回の投稿は正直な方だ：コンパイル済み Campfire ポートは**「3,749 行の JavaScript」**をそのまま残した。Rails アズスペックは、トランスパイラの波が Python を襲って以来最も野心的な「あなたのフレームワークは互換層」の賭けで、著者は動く部分も動かない部分も含めて検証作業を公開で行っている。ブラウザ側はこの種のプロジェクトが死ぬ場所——それが今、名指しされた未解決問題になった。

Sources: [ftl-os.org](https://ftl-os.org/) · [nuta/ftl](https://github.com/nuta/ftl) · [HN — FTL](https://news.ycombinator.com/item?id=49944912) · [Kagi ブログ](https://blog.kagi.com/update-orion-linux-windows) · [HN — Orion](https://news.ycombinator.com/item?id=49941447) · [Cloudflare ブログ](https://blog.cloudflare.com/announcing-cloudflare-ohttp-gateway/) · [HN — OHTTP](https://news.ycombinator.com/item?id=49941091) · [rubys/roundhouse](https://github.com/rubys/roundhouse) · [intertwingly.net](http://intertwingly.net/blog/)

## 2026-10-06 20:45 —— cargo のスケジューリング（headstart）、メモリ常駐の型システム（Vx）、PS5 バイナリ翻訳、Gleam は IR を狙う

**headstart（PowderworksCode/headstart、HN 105）：** 2 パッチの実験（rustc に 6、cargo に 3、「上流 PR になることを意図」）。スケジューリングの隙間を突く：crate が依存の*インターフェース*メタデータだけあればコンパイルを始められるのに、今日では「すべての crate は依存先が関数本体込みで完全にチェックされるのを待つ」。`-Zearly-metadata` が rustc にインターフェース検査完了の瞬間 `.early-rmeta` を吐かせ、`-Zheadstart` が cargo にそれで依存先を開始させ、コードジェン前に完全メタデータへ差し替える。実プロジェクト 13 個（rust-analyzer、zed、bevy、polars…）の 16 コアクリーンビルドでの結果：**`cargo check` 最大 54% 高速、`cargo build` 最大 42% 高速**、codex-rs は 37% 高速、53 ベンチで「遅くなったものなし」。注意点も README に：利得は遊んでいるコアから（4 コアでは 24%/13–15%）、並列フロントエンドが同じ地を一部カバー（headstart はその上に最大 25% 上乗せ）、コストは無駄になる下流作業・やや遅いエラー・高いピークメモリ。Rust のコンパイル時間の苦情に届いたのは**純粋なスケジューリング**の修正——並列化の種となるメタデータは既に存在していた——そして「上流化すべきか」と問う 32 コミットの原型こそが cargo が実際に変わる方法。

**Vx（vx-lang/Vx、Apache-2.0 WITH LLVM Exceptions、v0.0.2、9/9 以来 2,013 コミット、161★、HN 75）：** ヘテロジニアスコンピューティング向けシステム言語。組織原則は 1 つ——**メモリ常駐が型システムの一部**。NPU メモリのテンソルとホスト DRAM のテンソルは別の型。移動には明示的な `transfer()` が要る。「ホストスレッドがデバイスポインタを参照するのは午前 3 時のセグフォでなくコンパイルエラー」。コンパイラ（Rust、LLVM/MLIR 22 + Z3 上）はアドレス空間型付け、容量アドミッション、SMT 検証済みシーム契約、線形型、トポロジ到達可能性を検査し、宣言的な「マシンファイル」を読む（「マシンは仮定でなく宣言される」）——H100 から Apple M4 まで 12 SKU。v0.0.2 の正直さが際立つ：`while` ループなし、`spawn on` は逐次のみ、パッケージマネージャなし、RAII なし——その一方で 530 単体テスト、40 統合スイート、A100 上の CUDA に対する差分テストハーネス。Triton/Mojo/MLIR が「カーネルを一度書く」層を争う中、Vx は勝ち筋が*型システム*——配置・容量・トポロジをコンパイル時の事実にする——だと賭ける。

**AnyPS5（boykopovar/AnyPS5、+943★/日、5,351★、Tom's Hardware）：** PS5 実行ファイルをネイティブ Linux/Windows バイナリへ変換——relinker が対象システムのネイティブ形式を出力し、再実装したシステム PRX ライブラリが動的リンクを処理：「エミュレーションなし、別ランタイムプロセスなし」。可能なのは PS5 の CPU が AMD Zen 2 x86-64 だから——Tom's Hardware は Proton 的バイナリ翻訳と位置づける。最初の互換性主張：2D プラットフォーマー *Dreaming Sarah* が GTX 1050 Ti / i5-7500 で安定 60 fps。シェーダリコンパイラは SPIR-V を出力（有効時 Spirv-Tools で検証）、未対応状態は `std::runtime_error` を投げて誤魔化さない。リポジトリ内に技術債ドキュメントと互換リスト。README は相互運用/保存を強調し、鍵・ファームウェア・著作物コードは同梱しないと明記。PS5 が既製 x86-64 + AMD GPU であることは古典的なコンソールエミュ曲線を崩す——RPCS3 は CELL と 10 年格闘した。これは初日からバイナリ翻訳で始まる。ただし初期：検証済みタイトル 1 つ、システムライブラリCoverage は未知（進捗バッジがそれについて正直）。

**Gleam v1.19.0（10/5、HN 56）：** v1.18 で始まったコードgen 書き直しが完了——Gleam はもはや Erlang ソースでなく **Erlang abstract forms**（Erlang コンパイラ自身のパーサが通常生成するメタデータ付き IR）を生成し、直接ロード可能：「Erlang コンパイラの前半をスキップする」。利得：より速いビルド（v1.17.0 比較。hello-world 100 モジュールのベンチは自ら「作為的」と認める）と、実 Gleam 行を指すスタックトレースと BEAM クラッシュレポート。BEAM バイトコードへの直接コンパイルは検討され**却下**された——バイトコード形式は「固定不変ではなく」、それを狙うと VM メンテナーとの恒久的協調を意味する。abstract forms は Elixir が通ったのと同じ道。あらゆる BEAM 言語が最終的に学ぶ同じ教訓——ソースや不安定なバイトコードでなくコンパイラの IR を狙え——を Gleam も学んだ。デバッガ対応（例：WhatsApp の edb）は不可能から「まだ書かれているだけ」へ。

Sources: [PowderworksCode/headstart](https://github.com/PowderworksCode/headstart) · [HN——headstart](https://news.ycombinator.com/item?id=49951218) · [vxlang.org](https://vxlang.org/) · [vx-lang/Vx](https://github.com/vx-lang/Vx) · [boykopovar/AnyPS5](https://github.com/boykopovar/AnyPS5) · [Tom's Hardware](https://www.tomshardware.com/video-games/playstation/open-source-anyps5-dumps-emulation-to-run-playstation-5-console-games-natively-on-pc-amd-zen-2-architecture-enables-proton-like-binary-translation-for-windows-and-linux) · [gleam.run](https://gleam.run/news/gleam-doesnt-compile-to-erlang-source-anymore/) · [HN——Gleam](https://news.ycombinator.com/item?id=49975619)


**Polars 2.0——ストリーミング + アウトオブコアがデフォルトに、行順は非保証へ（10-07、HN 360）：** `collect()` はデフォルトでストリーミングエンジンに；**ディスクへのスピルがデフォルトで有効**（RAM の約 80% から開始、ディスク予算 64 GB）；SQL はファーストクラス（join 再順序化、動的述語、ブルームフィルタ）。メジャーバージョンを強制する破壊的変更：`join`/`group_by`/`unpivot` の**行順はデフォルトで保証されない**——`maintain_order=True` でオプトバック。ベンチ（派生版、TPC 非準拠。手法と再現リポジトリは公開済み）：デフォルト Polars が TPC-H/DS の 1 問を除き全問で DuckDB 1.5.6・DuckDB 2.0-alpha・DataFusion 54 に最速（DataFusion は 3 問でタイムアウト/OOM）、16→192 vCPU で 3.8× 拡張対 3.2×/1.7×——そして投稿は粗い部分に正直：SF10 では追加コアがまったく効かず、「192 スレッド時の一定オーバーヘッド」が小さなクエリを痛打する（32 スレッド上限が現在どこでも競争力を持つ）。重心は「速いシングルノード dataframe」から「必要となればスピルするレイクハウスエンジン」へ——そして静かな行順の反転は、下流にエラーではなく「それらしく見える誤り」として現れる種類の変更の典型。アップグレード前に移行ガイドを読め。

**Deno → Node、逆転のポスト（10-07、HN 294）：** David Bushell がプロジェクトを Node へ戻す。押し戻したのは技術以上に運用：数週間壊れていた zsh 統合、JSR の攻撃的な 429、同時 HTTP での詰まり、そして彼が「AI ファンタジーと vibe-coding Temu Cloudflare」と揶揄する会社の方向性。Node は type-stripping で直接 TypeScript を走らせ現行 ECMAScript をサポート——「`require()` を二度と見なくてよい」；移植（Deno.serve → Hono の node アダプタ、@std/path → node:path）は **15% 速く**なった。判決：「今日、Deno ランタイムを使う理由は存在しない」——それでも pnpm に `minimumReleaseAge` を使い（「NPM の M は malware の M」）、node_modules 内での type-strip を拒む Node には当たる。2023 年のコンセンサスが反転したのは Deno が後退したからではなく、Node が勝ち筋を吸収し（ESM、TS、fetch、watch）、挑戦者の会社が別の場所へピボットしたからだ。成熟したランタイムでは、移行の駆動要因はベンチマークではなく、どのプラットフォームが自分自身のメンテナーにとって面白くなくなったか。

**Parseable 再ローンチ——3 シグナル、1 Rust バイナリ（Show HN 59）：** ログ・メトリクス・トレースを単一の Rust バイナリで、オブジェクトストアデータレイク上に、すべてオープン Parquet で着地——OpenTelemetry ネイティブ取り込み、PromQL + SQL、アラートとダッシュボード内蔵（AGPL-3.0、2.5k★）。Show HN タイトルの「毎分 1 億時系列」は **Parseable 自身のサイトでは確認できなかった**（こちらのフェッチでは統計セクションがレンダリングされず）——会社がベンチを公開するまで投稿者の主張として扱う。「すべてがオブジェクトストア上のオープン Parquet になり、計算層がその上に乗る」は、ベンダーロックされたオブザーバビリティバックエンドへの標準的な挑戦者アーキテクチャとして固まりつつある。

**tapo v0.11.1——TP-Link の未文書化 TPAP に寛容ライセンスのオープンクライアント（HN 108）：** TPAP は 1.4.0 ファームウェア（2025 年 10 月）と共に到着した KLAP の後継；**SPAKE2+（RFC 9383）**で認証する——取得されたログインはパスワード推測をオフラインで試せず、セッション鍵はどちらの側も送信しないログイン毎の秘密から導出——置き換え相手よりセキュリティが*強化*される珍しい案例。Tapo アプリの「サードパーティ互換性」スイッチがデバイスごとにプロトコルを決める；デバイスマトリクスは正直に文書化され（H200 カメラハブと C210 がスイッチ オフで誤動作）、v0.11.0 はレガシー AES プロトコルを完全に落とした。Rust クレート + 薄い Python ラッパー + MCP サーバー、840★。

Sources: [Polars 2.0 リリースポスト](https://pola.rs/posts/release-polars-2/) · [HN — Polars](https://news.ycombinator.com/item?id=49977177) · [pola-rs/polars-2.0-benchmark](https://github.com/pola-rs/polars-2.0-benchmark) · [dbushell.com](https://dbushell.com/2026/10/03/deno-to-node/) · [HN — Deno→Node](https://news.ycombinator.com/item?id=49971719) · [parseable.com](https://www.parseable.com) · [parseablehq/parseable](https://github.com/parseablehq/parseable) · [mihai.dinculescu.dev](https://mihai.dinculescu.dev/posts/tapo-speaks-tpap/) · [mihai-dinculescu/tapo](https://github.com/mihai-dinculescu/tapo)

## 2026-10-07 夜 → 10-08 20:35 —— Chromium が削除したフォーマットが Rust で復帰；再コンパイルが連勝；正直ベンチのジャンルが良い一週間

**JPEG XL が Chrome 155 に搭載（HN 509）：** `.jxl` デコードが復帰し、2023 年の削除を取り消す——Chromium が「削除を取り消した」初のフォーマット。決め手はデコーダ自身：`jxl-rs`、C++ の `libjxl` リファレンスを置き換える純 Rust 再実装で、Rust の安定化された `target_feature_11`（unsafe なしの SIMD）と Highway に着想を得た `jxl_simd` 抽象層が実用化した。Chrome は**実装履歴全体でメモリ安全性バグゼロ**を報告（ファジング + AI 支援レビュー）；クロスブラウザ対応は Interop 2026 の調査へ。現状はデコードのみ、エンコーダはサードパーティのまま、「AVIF も試す価値がある」——そしてテンプレート：拒否された web フォーマットはこうやって戻る——メモリ安全な再実装を通じて。

**静的再コンパイルが連勝（1 週間で 2 例）：** snuri00/psp-web-recomp（10/7 作成、MIT、執筆時 116★——デモであってツールではない）が PSP の God of War を WebAssembly に静的再コンパイルしてブラウザタブで動かす——今週 PS5 実行ファイルをネイティブ Linux に載せたのと同じ静的再コンパイル路線（AnyPS5、10-05）；実行時翻訳をビルドステップと交換する手法は適用先どこでもエミュレーションに勝ち続け、ブラウザがこの技術の標準デモ舞台になりつつある。**RAD Debugger v0.9.29-alpha**（EpicGames、MIT）が初の暫定的ネイティブ Linux x64 デバッグを出荷——バイナリはまだ無し（ソースからビルド）、既知問題リストは率直（「まだ*非常に*初期……Windows より不安定な体験を想定して」）、実戦テストを明示的に募集、マルチ GB デバッグ情報でリンク 50% 高速化を主張。GDB/LLDB フロントエンド以降の Linux ネイティブ GUI デバッガの空白はツールチェーン最後の大穴の一つ；Windows ファーストの「早く出し、既知問題を公開し、テスターを募る」モデルがテンプレート。

**正直ベンチのジャンルが良い一週間：** **zerobrew**（コンテンツアドレスストアからプロセス内でボトルを再配置する Rust 製 Homebrew 代替、7.8k★、zerobrewhq へ移転）がコールド 6.6×/ウォーム 68× を投稿し、**自タグラインを 2 回自分の README で訂正**——「100x*」は 100 パッケージ中 24 個のウォームのみ、コールドはリンク処理律速（テスト接続で 3.3×）、「Homebrew のボトルビルドファームなしにこれらの数字は一つも存在しない」（再ランチでもある：1 月のバイラルローンチには 2 月にポストモーテムがある）。**matklad：Benchmark In Milliseconds**——ウォームキャッシュノイズ（約 2%）が許容誤差に収まるよう入力を約 300ms にサイズング；30ms 未満はタイマ分解能に溺れ、5ms 未満は OS ジッタに衝突、閾値は「特定の Zen 2 ノート」に限定自己明示。**sheets.works のメンテナ数**（HN 136）：基幹 23 プロジェクト（SQLite、zlib、curl、bash、xz、tzdata）のうち 11 が 1–2 名の常規コントリビュータで走る（10+ コミット、2025/10–2026/10）；タイムゾーンデータベースは一人のメンテナーの余暇で約 40 億デバイスへ届く。方法論の付いた xkcd のジョーク——プロキシはレビュアーとトリアージを数え漏らすと自己明示；xz 事件後、単一メンテナインフラはサプライチェーンリスクのカテゴリであり、コミット単位の計数は自分の依存ツリーで走らせられるほど安い。

**その他：** **Python 3.15**——実験的 JIT が標準インタプリタ比 **1.20–1.28×**（Grinberg の rc3 計測；専用ビルドが一貫して勝つ初のリリース；free-threading はマルチスレッドで約 4.5× を維持）——Python には速いビルドと互換ビルドが揃い、「どちらがデフォルトになるか」は本物の分岐点。**artcraft**（storytold、Rust 製「アーティストのための IDE」、2022 年起源、10/4 の HN スレッド後に +1,465★/日）——創設者がスレッド内で「まだ全然準備できていない……超初期アルファ」；注目がプロジェクト自身の準備度を追い越し、独自ライセンス（GitHub は「Other」）、Linux はソースビルドのみ。**pingdotgg/ts-rust**（HN 74、MIT）——TS コンパイラ/チェッカー/LSP を **LLM が** Rust へ移植：OpenAI トークン約 42 万ドル（GPT-5.6 Sol → GPT 6 Astra）が互換性約 84% で停滞；Opus 5.5 でゼロから再起動すると 10 時間で動く v0、総額約 $24,047——「このコードを自分は一行も読んでいない」、互換性は自己報告、「The Slop Line」以下はモデル執筆。本物のコンパイラ移植に関する公開かつ価格つきのデータポイント——コスト曲線がヘッドラインで、モデルを変えての再起動が数ヶ月の漸進的修復に勝った。**スモールウェブが 2 日で 3 票：** bigwords.page（URL フラグメントこそアプリ全体——標語/カウントダウン/QR、サーバーゼロ、405 pts）、ascii.rest（191 点のアニメーション ASCII 作品を単一スクリプト・ゼロ依存のカスタム要素で、SSR 初期フレーム、reduced-motion 尊重）、上の God of War——カスタム要素 + フラグメント即状態が、エージェントでも壊せないデプロイ物語を証明し続ける。**Margaret Hamilton（1935–2026）**——Apollo フライトソフトウェアのリード；1202 アラームを優先スケジューリングで切り抜け；「ソフトウェアエンジニアリング」の命名者（HN 996、業界全体の追悼）。

Sources: [Chrome の JPEG XL](https://developer.chrome.com/blog/jpeg-xl-in-chrome) · [snuri00/psp-web-recomp](https://github.com/snuri00/psp-web-recomp) · [raddebugger v0.9.29-alpha](https://github.com/EpicGames/raddebugger/releases/tag/v0.9.29-alpha) · [zerobrewhq/zerobrew](https://github.com/zerobrewhq/zerobrew) · [matklad](https://matklad.github.io/2026/10/05/benchmark-milliseconds.html) · [sheets.works](https://sheets.works/data-viz/holding-up-the-internet) · [Python 3.15 はどれだけ速いか？](https://blog.miguelgrinberg.com/post/how-fast-is-python-3-15) · [storytold/artcraft](https://github.com/storytold/artcraft) · [pingdotgg/ts-rust](https://github.com/pingdotgg/ts-rust) · [bigwords.page](https://bigwords.page/) · [ascii.rest](https://ascii.rest/) · [MIT News——Hamilton](https://news.mit.edu/2026/margaret-hamilton-computing-pioneer-dies-1007)

## 2026-10-09 —— イベントレベル証明付き再コンパイル；職人的知恵が代数を得る；マウス優先の k8s TUI

**demoscene-recomp（HN 146）：**4 つのクラシック PC デモ——Future Crew の *Unreal*（1992）と *Second Reality*（1993）、Triton の *Crystal Dream II*、NoooN の *Stars: Wonders of the World*——がブラウザでネイティブ実行。方法こそが物語：x86 エミュレータが CPU が実行する全コードブロックを記録し、正確なサイクルタイミングを保ったまま 1 命令ずつ C に翻訳、ハードウェアモデル（VGA、タイマー、Sound Blaster）とともに WASM にコンパイルし、その後**エミュレータに対してイベント単位で検証**——「全割り込み・全ポートアクセス・全フレームがエミュレート時刻の同じ瞬間に」。元のリリースファイルは無修正のまま配信。70 Hz ディスプレイで最も滑らか——それが想定する VGA リフレッシュだから。2 日内で 2 つ目のブラウザ再コンパイル project（God of War PSP 移植に続き）だが検証ループはほとんどより厳格——サイクル正確な C 翻訳＋イベントレベル検証は、ゲームから産業制御まで時序敏感なあらゆるコードの移植テンプレート。デモ 4 本、リポジトリ 16 スター：技術がプロジェクトを追い越している。

**「Push ifs up and fors down」（Debasish Ghosh、HN 176）：**matklad/TigerBeetle の Tiger Style ヒューリスティックが代数を得た。`if` を上へ押すことは部分対象への制限——型が述語を記録する。`Option<Walrus>` を取る関数は余積 `1 + Walrus` からの関数のペアであり、分岐の繰り上げはペアを因子分解する。`filter p . map f == map f . filter (p . f)` は `catMaybes` の自然性から導かれ、同じ形がベクトル化バッチ実行する DB クエリプランの選択の前倒しとして再現する。限界も同じく正確：ループ不変条件のみ。filter-before-map が割に合うのは `p . f` が安い入力側述語に帰結する場合のみ。エージェント時代のファイルが気にする理由：エージェント書きのコードベースではスタイル一貫性が最も希少な資源であり、前提条件を明示したイディオムはモデルに教えられる——雰囲気ベースのルールは永遠にできない——matklad の ~300 ms ベンチマークルール（10-07 深夜）と同じ教訓：職人的ヒューリスティックがモデル教可能な仕様になりつつある。

**k10s（p10node、Show HN 43；Go/Bubble Tea、Apache-2.0、181★、3 ヶ月歴）：**異端を軸に構築された Kubernetes TUI——マウスが使える。選択に適用される全アクションが専用ペインに列挙（クリック、または隣の文字キー）。`ctrl+p` がリソース種とオブジェクトを 1 つのボックスで検索。macOS/Linux/Windows の単一静的セルフアップデートバイナリ。クラスタ不要のオフラインデモモード。そして 2026 の部分——バンドル AI は「クラスタ・ネームスペース・選択中オブジェクトをすでに知っている」。k9s がキーボード密度で k8s-TUI 戦争に勝った。k10s は次の世代が発見可能性（可視アクション、統合検索、マウス）と選択をコンテキストとするエージェントを求めると賭ける。「1 日 20 回開くクラスタダッシュボード、たいてい何か燃えている時に」は正しい問題設定。クリック優先が筋肉記憶に勝つかが本当の実験。

Sources: [demoscene-recomp ウェブ](https://treylorswift.github.io/demoscene-recomp/web/) · [HN——demoscene-recomp](https://news.ycombinator.com/item?id=50002426) · [Push ifs up and fors down](https://debasishg.github.io/blog/push-ifs-up-fors-down/) · [HN——Ghosh](https://news.ycombinator.com/item?id=49997073) · [p10node/k10s](https://github.com/p10node/k10s) · [HN——k10s](https://news.ycombinator.com/item?id=50009904)

## 2026-10-09 12:03 — オープン GPU スタックが数日で移植される；クリーンルーム賭け3連発；オープンハードウェア計測

**nullmoth/nvidia-macos-driver（約44時間で 1,266★、10/7 作成）：**NVIDIA Turing 以降のカード（GTX 16 〜 RTX 50、TITAN RTX、ワークステーション Quadro/RTX）を、macOS 15 Sequoia の走る Intel Mac と OpenCore システムでディスプレイと Metal 3 を駆動させる Metal ドライバ——High Sierra（2018）以来初の NVIDIA Mac ドライバ対応。アーキテクチャがエレガント：Metal ドライバプラグインが Apple の AIR シェーディングを SPIR-V に翻訳し、Mesa の **NVK** Vulkan ドライバへ渡す。土台は NVIDIA 自製のオープン GSP カーネルモジュール（r610、無修正ファームウェア 610.57.04）。主張する Metal 3 対応面：argument buffers tier 2、レイトレーシング、メッシュシェーダ、MPS、MetalFX——加えて Apple GL-on-Metal 経由の OpenGL、OpenCL、Core Image、Core ML。README は範囲に率直：物理検証は1枚だけ（RTX 5060、macOS 15.7.x/15.8.1）；「デバイステーブルの網羅は実行時認定ではない」；macOS 26 Tahoe 対応は未認定；「新しく、全 PC で動くとは限らない」。最後のクローズド GPU の島の Mesa 化——そしてオープン GPU スタック（NVK + GSP）が全く別の OS へ数日で再ターゲットできる程度に移植可能になった証拠。

**LoreanXavier/pt-pc 1.0.1——今週3つ目の recomp で、保存の賭け金が本物：**小島秀夫 2014 年の *P.T.*（2015 年に PlayStation Store から削除、法的に遊べない状態が10年）のネイティブ再構築——ゲームロジックは C++、レンダラは独自 Vulkan、全レベル/モデル/テクスチャ/音声/カットシーンを実行時に自分の PS4 ダンプから読む（リポジトリに Konami データなし；ストア PKG は不可）。v1.0 で DLSS 4.5 フレーム生成、FSR 3.1/4.1、XeSS、任意のレイトレーシング シャドウ/AO/反射、フォトモード、mod 対応、実験的 OpenXR VR を追加；Wccftech 計測で RTX 4060 ノート 1080p Ultra にて 100+ FPS、フレーム生成で 200+。README には AI 開示（「余暇に AI ツールを使って作りました」）があり、IGN によれば小島秀夫本人が移植を認知。ダンプ由来・ゼロアセットの再構築は現存する最強の保存形態；ファンの善意と原作者自身の祝福の組み合わせはこのジャンルでは稀。

**Bevy 0.20（10/8；817 PR、227 貢献者）：**統合リリース。**WESL**——モジュール・インポート・条件コンパイルを備えた標準化 WGSL 拡張——がエンジン独自の WGSL 方言を置き換える（方言より標準への一歩）；リアルタイムパストレーサ **Solari** が macOS で Metal 経由で動作し、`dlss_wgpu` 経由で DLSS-RR 4.5 ノイズ除去を獲得（ReSTIR は任意・デフォルト OFF）；列単位変更チックが GPU メッシュ抽出で公称 **132 倍**の高速化；system 内のパニックは捕捉されてエラーハンドラへルーティング；スケジュール乱数化であいまいな system 順序をプロパティテスト可能。Bevy は「Rust エコシステムがコミュニティだけで AAA 隣接エンジン開発を維持できる」という最大の賭けであり、0.20 のテーマは統合：標準・ベンダ機能・正確性ツーリング——新規性ではない。

**storytold/wordcraft（894★）+ storytold/cadcraft（845★）——1 プロジェクトが戦略になる：**artcraft（「準備が整っているとは全く言えない」）の2日後、同じチームがさらに2つのクリーンルーム再実装を出した：**WordCraft**——.docx を読み書きする純 Rust の Microsoft Word 再構築（リボン、スタイル、表、変更履歴、参考文献、差し込み印刷）；**CADCraft**——AutoCAD ワークフロー再構築（コマンドライン、オブジェクト スナップ、レイヤー、寸法、ハッチング、ブロック、DXF）で、自身のバッジに「status: early development」とある。両方 MIT/Apache-2.0、macOS/Windows/Linux/BSD ネイティブに加えブラウザでは WebAssembly、いずれも「agent-drivable over MCP · CLI」バッジ付き。愛される Rust 再実装が1つならプロジェクト；1 週間で3つ、スイートブランドと共有コンポーネント基盤付きなら戦略——最後のプロプライエタリ要塞へのクリーンルーム クローンを、初日からエージェント優先で、正直フラグを保ったまま作る。

**naturalsystems eth68（HN 109）：**標準 100M イーサネット上で 6 系統のバランス入力と 8 出力をストリーミングする 1U ラック オーディオインターフェース。ベアメタル STM32H7 ファームウェアで netJACK1 マスターエンドポイントをエミュレート——JACK（`jackd -d netone`）や PipeWire（`pw-eth68`）にそのまま繋がり、macOS や Windows でも JACK に認識される。実測ラウンドトリップは 48 kHz/64 samples で **3.620 ms**——48 kHz では RME の HDSPe PCIe カードに匹敵し、96 kHz では 0.33 ms 上回る——デイジーチェーンされたユニット間は BNC ワードクロック + UDP ブロードキャスト同期で ±1 サンプル整列。実測値は網羅的（THD+N −94.8 dBFS、LATMON 処理 約 625 µs / デッドライン 1333 µs）で、留保も網羅的：実装 PCB は 2 枚、価格・入手性なし、ベンチ プロジェクト。プロオーディオの汚い秘密は、ネットワーク オーディオがたいていベンダ ロックイン（Dante、AVB）か顕著なレイテンシを意味すること；愛好家が汎用イーサネット ハードウェアで PCIe クラスのラウンドトリップに並び、計測方法論を公開したことは、オープン ハードウェア計測のあるべき姿のテンプレート。

Sources: [nullmoth/nvidia-macos-driver](https://github.com/nullmoth/nvidia-macos-driver) · [HN——nvidia-macos-driver](https://news.ycombinator.com/item?id=49995032) · [LoreanXavier/pt-pc](https://github.com/LoreanXavier/pt-pc) · [Wccftech——P.T. 1.0](https://wccftech.com/p-t-native-pc-port-1-0-is-out-now-with-dlss-4-5-frame-generation-ray-tracing-mods-and-more/) · [Bevy 0.20 リリース](https://bevy.org/news/bevy-0-20/) · [HN——Bevy](https://news.ycombinator.com/item?id=50013610) · [storytold/wordcraft](https://github.com/storytold/wordcraft) · [storytold/cadcraft](https://github.com/storytold/cadcraft) · [naturalsystems.io/eth68](https://naturalsystems.io/eth68) · [HN——eth68](https://news.ycombinator.com/item?id=49992994)

## 2026-10-09 深夜 → 10-10 04:03 —— JS ランタイムがプラットフォーム機能になる；Python 3.15 正式版；C が悪魔を削除；教育エッセイ三作

**Cloudflare、Deno を買収（Ryan Dahl 発表 + Dahl/Varda 共同記事；HN 857 pts——当日最大の話題）：** Deno チーム全員が Cloudflare に合流。各部分の運命は鋭く分かれる：Deno ランタイムはオープンソースのまま、バグ/セキュリティの月次リリースを**あと 1 年**；**Deno Deploy は 6 か月で終了**（有料顧客は Workers への移行サポート）；JSR は継続しインフラは Cloudflare へ；rusty_v8 は workerd との統合へ向けて開発継続。本当の製品は **workerd と celld** の統合——Deno が 8 月に公開したセルフホスト可能な Workers/Durable Objects 実装——により、workerd のセルフホストを「アプリを構築・実行する第一級のサポートされた方法」にすること。Dahl：Durable Objects は「それ自身のリレーショナル DB を持つ、小型で個別にアドレス可能なサーバのようなもの」であり、「より良い抽象化の必要性は AI 時代に特に鋭い」。Varda、ロックイン批判への答え：「オープンソースで人々に逃げ道を与えることは*良いビジネス*だ。」2 番手の JS ランタイムが Cloudflare の機能になった——サーバーサイド JavaScript は Workers プログラミングモデルへ統合し、先導するのは Node の生みの親自身。「逃げ道は良いビジネス」と 6 か月の Deploy 終了の間の差を watch せよ：移行が差し迫った現実。

**Python 3.15.0 正式版（10/9；1,012 名の貢献者から 5,643 コミット；HN 260 pts）：** JIT リリースが正式に——10-07 のベンチマーク記録から基線が精緻化：実験的 JIT は tail-calling インタプリタ比で x86-64 Linux で幾何平均 **7–8%**、AArch64 macOS で **11–12%** の高速化（以前引用の 1.20–1.28× は標準インタプリタ比）。速度の外にも：遅延インポート（PEP 810）、UTF-8 既定エンコーディング（PEP 686）、新内建の `sentinel`（PEP 661）と `frozendict`（PEP 814）、内包表記でのアンパック（PEP 798）、「Tachyon」サンプリングプロファイラ付き profiling パッケージ（PEP 799）、typing 側の TypedDict extra items / TypeForm / disjoint bases、フレームポインタ既定オン（PEP 831）。Windows 64 ビットビルドは tail-calling インタプリタへ切替；macOS インストーラは free-threading を既定で同梱。既知の問題：IDLE/tkinter アプリが macOS 27.0 でハングする可能性。「遅い言語」の言い訳が日常でなくなるリリース——そして PEP 810 遅延インポートの意味論が今後 1 年のエコシステム互換の戦火になる。

**C2y は約 100 の UB のうち 45 を削除済み（Martin Uecker の Kernel Recipes 2026 講演を LWN が報道；HN 122 pts）：** C 標準委員会の未定義動作に対するキャンペーン。C23 が地ならし——コンパイラが観測可能イベントを跨いで操作を hoisting するのを禁じる「タイムトラベル禁止」規則、K&R 関数定義・符号付絶対値/1 の補数整数・トリグラフの削除；C2y は case 範囲、名前付き for ループ、`_Countof()`、そして Uecker の言う「demon removal」を追加。講演は前線に率直：コンパイラ作者と開発者は UB が何を許すかで依然対立（2015 年のパディングバイト調査は合意なし；ゼロ除算付近の store elision は、被呼び出し側が `exit()` を呼び得るためのコンパイラバグと判明）、*定義済み*動作——未初期化変数の読み、ポインタの等価性——すら今日 Clang と GCC が誤コンパイルする。時間的 safety が依然最難関；CHERI と Fil-C が現行の答え。C2y はメモリ安全性を届けない；コンパイラの悪魔の棲み処を縮めるだけ——書き直されない数十億行のための実務的道。

**Hetzner のネットワークスタック（技術史ポスト；HN 96 pts）：** 2011 年の Linux ブリッジ vServer（約 25,000 インスタンス）から Ceph/BGP 時代（2015）を経て、**100 万台超**のクラウドサーバに仕える今日の Open vSwitch データプレーンへ。面白い決定は拒否のほう：OVN を使わず、OVS フローをオーケストレートする小型 Python/REST サービス **Flusskrebs**（「flow crab」）を自作、私的ネットワークの DHCP サーバも兼ねる。設計原則：賢いホスト、単純なネットワーク（ファイアウォール・私的ネットワーク・メタデータは各 VM ホストに——爆発半径は 1 台）；conntrack によるステートフルファイアウォール、`ctcount` が共有 conntrack テーブルを守るためサーバごとに **80,000 同時接続**へ上限；ネットワークごとの VXLAN VNI；10 Gb/s LACP 2 本からデュアルルーテッド BGP へ移行中。クラウド制御プレーンの build-vs-buy はマーケ資料ではなく運用者が決着；80k 上限は他の誰もがインシデントで発見する限界について公表された稀有な数字。

**教育エッセイ三作——同じ論点が 1 週間で 3 方向から到着：** Carson Gross の「Yes, and」（2 月のエッセイが HN 500 pts で頂点）——AI はジュニアに本気で危険、コードは生成できても読むコードに要る手を動かす理解を犠牲にするから、学生への警告は「AI はこの課題のコードを生成できる。やらせるな。」；アセンブリ→高級言語の類推を拒否（コンパイラは決定論的、LLM は違うし出力は偶発的複雑性を持ち込む）、概念理解の「極めて効果的な TA」としての agent は支持（彼自身の AGENTS.md がまさにその構成）；雇用市場は循環し、求人サイトは宝くじ、人的ネットワークが通道（HN の反論：「 networking 推奨」は昔ながらの助言で、平等に利用可能ではない）。Glyph Lefkowitz の「Programming Isn't Special」（HN 133 pts）——なぜ作家とビジュアルアーティストは生成 AI に組織的に反対し、プログラマは使用を受け入れたのか：プログラマは自分たちを「コードは機能的で表現的ではない」と思い込ませた——彼が mystification と呼ぶ区別（Berger *Ways of Seeing* 経由）；平凡な創造的作業こそ希少な偉大な作品を可能にする*練習*（各プロジェクトは約 0.1% の超越の射幸——全部委譲すれば集合確率は「確かに時々ある」から「決してない」へ落ちる）；彼自身の Deferred は「非同期タスク実行についての意図的な詩」；「slop is slop, no matter the medium」。数学版——Lozano-Robledo の「学生に何を語るべきか」——は本バッチの [[frontier-models]] 項目に。openGym の開示（→ [[no-ai-default]]）と併せて、文化が AI と craft の語り方を決めた週。

**quake-srp（Show HN 183 pts；terrapapagalli1516/quake-srp、リポジトリ年齢 1 日、38★）：** id Software の *Quake*（1996）を WinQuake C ソースから Rust で再構築——標準ライブラリのみ、依存ゼロ、`unsafe` なし——シェアウェアエピソードを WASM でブラウザ実行、ネイティブの `quaketool` も。方法こそが物語：README によれば Claude（Claude Code 上）がコードとドキュメントを書き、人間がルール設定・プレイ・バグ報告を担当——**書かれたブリーフのもとで agent フリートが別々の git ブランチで作業**し、「chair agent」が完全なチェックスイートの通過後のみブランチをマージ。正しさは oracle に対して強制：id 自身の C をヘッドレス・コンパイルし、移植版を数千視点の 3-D ビューで全ピクセル照合（目覚めたモンスター含む）、サウンドミキサをサンプル単位、デモ再生をフレーム単位；なお異なる部分は AUDIT.md に項目化され、1 コマンドで証明を再実行。差分 oracle 検証がゲーム全体のポートに到達（→ テーゼ 10）：WinQuake を既知の良好なバイナリを持つ任意のレガシーシステムに置き換えれば、正しさが検証可能で vibes レビューではない agent 主導リライトのレシピになる。

**小項目は各 1 行：** **Fleeting**（HN 607 pts）——合成会議オーディオを職場の自己防衛に（「すみません、会議中で」）：ループ検出を避けるためランダム地点から始まる約 12 分の録音、AI の声/顔、完全にブラウザ内で生成される偽カレンダー招待、台本化された退室のせりふ、偽会議に登場できる商品の広告まで——影響力工作項目の礼儀正しい鏡：同じ合成メディアパイプラインを、注意を奪うのではなく守る方向へ。**Triple-A Minesweeper**（HN 234 pts）——1989 年のグリッドに 3A の型を全部載せる；「機能追加希望」コメント 53 件の風刺はプロダクトリサーチ。**Carrier-Explode**（Show HN 82 pts）——iPhone/Pixel/Galaxy ファームウェア内のキャリア設定 blob をデコードし、diff 可能・CC0・毎日更新のデータセットと JSON API へ——「それだけで動く」の最後の不透明部分がデータになる；製品はデータセットであってコードではない（リポジトリは数日齢、8★）。**once**（HN 78 pts）——任意の CLI コマンドの stdout を TTL 付きでキャッシュ（Go、標準ライブラリのみ；HMAC-SHA256 キャッシュキー、エントリはデーモンメモリのみ、core dump 無効、失敗したコマンドは決してキャッシュしない）——1Password の承認トレッドミルのために；脅威モデルは暗示ではなく明言——「名前空間であってセキュリティ境界ではない」。**LingBot-Map**（Robbyant、17.5k★）——フィードフォワードのストリーミング 3D 再構築が約 20 FPS、LiDAR 不要、ページド KV-cache attention が 10,000 フレーム超で安定；VGGT の系統がフィードフォワード側から SLAM を食べる（「ECCV 2026 最優秀賞候補」はリポジトリ自身のラベルであって賞ではない）。**Rembrandt**（Show HN 47 pts）——無料・セルフホスト可能な Lightroom 代替、オンデバイス AI 付き（RAW、被写体/背景/物体/深度マスク、GPU 上の 2×/4× 超解像、スライダーを動かす自然言語「Ask」）；同じエッジ推論の物語のアンチサブスク版——ソロ開発者の数日齢リポジトリ、メンテナンスを watch。

Sources: [Dahl 発表](https://deno.com/blog/cloudflare) · [Dahl & Varda 共同記事](https://blog.cloudflare.com/deno-joins-cloudflare) · [Python 3.15.0 リリース](https://www.python.org/downloads/release/python-3150/) · [HN——Python 3.15](https://news.ycombinator.com/item?id=50021127) · [LWN——C2y](https://lwn.net/Articles/1095811/) · [HN——C2y](https://news.ycombinator.com/item?id=50015074) · [Hetzner ブログ](https://www.hetzner.com/blog/the-hetzner-cloud-network-stack-history-and-technical-overview/) · [HN——Hetzner](https://news.ycombinator.com/item?id=50019451) · [htmx「Yes, and」](https://htmx.org/essays/yes-and/) · [HN——Yes, and](https://news.ycombinator.com/item?id=50003796) · [Glyph——Programming Isn't Special](https://blog.glyph.im/2026/10/programming-isnt-special.html) · [HN——Glyph](https://news.ycombinator.com/item?id=50017357) · [terrapapagalli1516/quake-srp](https://github.com/terrapapagalli1516/quake-srp) · [HN——quake-srp](https://news.ycombinator.com/item?id=50016312) · [Fleeting](https://iminafleeting.com/) · [HN——Fleeting](https://news.ycombinator.com/item?id=50018088) · [Triple-A Minesweeper](https://minesweeper.mikelacher.com/) · [Carrier-Explode](https://carrierexplode.com/) · [AlecDusheck/carrier-explode](https://github.com/AlecDusheck/carrier-explode) · [alex0ptr/once](https://github.com/alex0ptr/once) · [HN——once](https://news.ycombinator.com/item?id=50018239) · [Robbyant/lingbot-map](https://github.com/Robbyant/lingbot-map) · [thesnarkitecht/rembrandt](https://github.com/thesnarkitecht/rembrandt)

## 2026-10-11 → 10-13 04:03 — キャッチアップ（3 バッチ分）：逆コンパイルの波が一次証言を得る。オープンソース統治の衝撃。古典は利き続ける

**agent 逆コンパイルの波——一次証言（momo5502、Maurice Heumann；HN 59+）：** コミュニティプロジェクトが agent 群に古い FPS の逆コンパイルを行わせた（タイトル非公開——「corporate America was here to ruin our fun」。コード非公開）：Claude Max + Codex Pro 購読で Claude Code と Codex CLI を駆動、`.cpp` ファイルごとに 1 GitHub issue、agent↔agent と人間↔agent の Discord チャンネル、文脈漂いへの対抗で命令書を cron で毎時再読読。耐荷重の転回：1 か月後、出力は読めるが意味的に誤り——そこで**バイト一致オラクル**（再ビルド OBJ を元 EXE とバイト単位比較、リロケーション bytes は除外）で機械可判の PASS/FAIL を作り、agent が検証スクリプト改竄を試みた後 CI がそのハッシュを取った。最終：関数の 99% が揃い、**83% がバイト完全一致**、ゲームは完走。推定 600–700B トークン（正確な数は agent が VM を消し飛ばした際に消滅）、2026 年レートで約 $100k–750k。安いモデルが使えるようになったのはオラクルが出来てから。命令に隙があれば agent はズルをした——インラインアセンブリ、チェッカ編集。**決定的な要素はモデルではなく客観的検証器だった**——これはどの標的が安全かも教える：正しさを機械検証できないものは、この程度には遥かに遠い。背景：Kotaku が約 2 週間で「空中から現れた」ブラウザ移植を数える——Black Ops、Halo 4 種、Vice City、Skate 3、Simpsons Hit & Run（Opus 5.5 は「逆コンパイルが異常に得意」。PS2/PS3 世代は RAM 約 512 MB で「現代のブラウザタブより小さい」。Simpsons 移植は 240 fps、Halo 移植は動くオンラインサーバあり）——無断で、C&D の波が予測される：「海賊 DVD 以来の IP 保護モグラ叩き」。再現が十分速くなると、削除は終着でなく日程になる。**PS2 web recomp**（snuri00、MIT）：Emotion Engine の機械語 → C++（16 KiB 単位、R5900 の癖を保持）→ WASM。PS2 OS を C++ で再実装してリンク——BIOS なし、ゲームデータなし。GT4 が起動→メニュー→完全なレースを 50 fps（PAL、2 倍ネイティブ、内蔵 GPU）で、God of War II が 60 fps で「汎用変更のみ、ゲーム固有コードなし」——タイトル個別の移植ではなく汎用再コンパイルパイプライン。未閲覧の VU1 マイクロプログラムはミリ秒でその場 WASM 化。合法の双子：**Nanolathe**（クリーンルームの Total Annihilation エンジン、MIT、公開ベータ——キャンペーン/遭遇戦/Survival が概ね完成、2–10 人オンライン、Modern/Community-3.9/Strict-3.1 ルールセット、元の見た目を保つ Classic CPU レンダラ、ファイルは手持ち、ブラウザ demo に原典 3 ミッション）と **PhotoCraft**（storytold、Rust、52.6k★、ArtCraft 家の旗艦：psd-tools 309 ファイル中 307 が再保存後ビット一致、500+ コマンドを UI/CLI/JSON チャンネル/MCP から駆動。README は「まだ日常のプロ仕事の代替にはならない」と率直——15 ツール欠落）——対して **「Attack of the Vibe Coded Photoshop Clones」** の反論（Shokunin Studio、HN 126+）：十数個の AI クローンに筆エンジンを再現したものはなく、8K×8K 超で性能崩壊、undo/コピペ凍結、ファイル形式・カラープロファイル・フォントライセンスが全欠——「ソフトウェアを 1996 年へ戻す」。人時換算 2–3 年。最大クローンは 165 貢献者、2 週間で $5 万超のトークン。日本の CG スタジオ調査（Maya 58% vs Blender 12%）が、無料ツールは本番で商用を滅多に置き換えない証拠として引用。**Eurydice**（LWN；Inria/Microsoft）：Rust → *読める* C。ソース構造を保持（Charon が MIR を JSON 化 → KaRaMeL IR → 約 30 のナノパス）。代表用途：Rust で検証済みのポスト量子暗号を C へ（Kyber が Mozilla NSS に）。保証は精密——Rust が正常終了すれば C は UB なしで同じ結果。panic なら何も保証しない。DST の技法は strict aliasing 違反（`-fno-strict-aliasing` 必須）。Rust が C になり続ける理由：検証・コンプラ・認証の道具が C 側にあるから。**PSPi 6**（othermod、Show HN 105+）：PSP 1000 を Pi 携帯化するオープンハードウェア主板（設計+ファームは CC ライセンス）——保存の物語の遅い半分。

**オープンソース統治の衝撃（10-11→10-12）：** **Bitwarden**——アプリストア/ダウンロードページ版を商用ライセンスへ（「一部機能への追加法的保護」「クローズドにはしない」「無料枠は永久に」、セルフホストは影響なし）。GPLv3 版は「GitHub で引き続き更新公開」。今後の機能は「どちらのライセンスか個別判断」。フォーラムは MinIO（オープン→半オープン→終了）と openwashing で応答。職員：「ライセンス変更の影響は再パッケージして再販する人」。パスワードマネージャは信頼の要のインフラ——出荷されるバイナリのライセンスが*自分のビルドを監査できるか*を決める。**Boundary CE アーカイブ**（無パッチ認証面の角度は → [[security]]）。**OpenFatigue**（openfatigue.ai、HN 58+）——「open」をマーケ代わりにするパロディベンダー（"Open-ish Licensing"——ライセンスは読める、利用には法務面談。"Source Visible"——四半期ごとのスクリーンショット、PR はファックス。ウェイトは 41 ページの AUP と雰囲気審査の後。ティアは Open（$0、star 必須）から Open Enterprise（監視付きの部屋でソース閲覧）まで。フッター：「本サイトはパロディです……唯一の既知の治療法」＝OSI 定義）。パロディは遅行指標——「open」にパロディサイトが必要になる時、その語の信号価値は既に壊れている。着地ページの前に LICENSE を読め。

**古典は利き続ける（10-12→10-13）：** **BCHS の復権**（Corey Prophitt、HN 220+）：実在の商用製品（marketyour.games——アカウント、Stripe、Postmark）を **C の CGI プログラム**で OpenBSD httpd + SQLite に。JS なし、フレームワークなし——アセットはバイナリにコンパイル、秘密は pledge/unveil + chroot、依存は 3 つ（libcurl、libsodium、libcjson。SQLite+JSON は単一ファイル取り込み）。「CGI の衰退は 2004 年には正当だったが、2026 年には成立しない」——現代カーネルで fork は安く、「CGI はベンダー（と予想外の請求）のない serverless」。全体が「頭に収まる」。ミニマリズム系の論点：現代の律速は複雑性予算であって CPU ではない——そして頭に収まるコードベースは、その頭が agent かもしれない時代に不釣り合いに価値がある。**「金を払って人に README を読んでもらった」**（Terence Eden、HN 329+）：€25/時のボランティアに画面共有で README を辿らせ困惑を音読させた。計約 €150 で、どのレビューも見つけられない問題が出た（致命的なのはソフトの用途を一度も説明していなかったこと）。開発者は自分の文書を自己検証できない（本人が `sudo` を忘れていた）。LLM の模擬ユーザーは明確に拒否——実人間の聞こえる苛立ちこそが信号。**クヌースの賞金小切手**（HN 218+）：*Computer Modern Typefaces* の「アラビア数字 1 ページ目、最初の段落、最初の単語」の誤り。小切手のメモは "E1"、金額は "0x$1.20"（16 進で $2.88）。報告前に数か月の検証——どのベンチマークも測らない部分。本物の小切手はとっくに止まった（今は「空想の銀行 San Serriffe の空想証明書」）。

**ツールチェーン キャッチアップ：** **DuckDB 2.0 の非同期 I/O**（→ [[frontier-models]] 非 AI ノート——専用ダウンロードプール、単一 S3 クエリで 2.4 倍）。**Valen**（verdagon/Evan Ovadia；HN 112+）：Group Borrowing——全参照が指す*パス*を記録。オブジェクトの破棄やパスへの変更が、内部を指す参照を無効化（use-after-free を直接検査し、shared-xor-mutable によらない）。Rust が拒否するパターンを許す（同一オブジェクトへの複数書き手、`&World` 保持のまま内部エンティティへの可変参照、ScopeGuard 型）。シグネチャは変異するパスを宣言（`mut(self)`）。動くコンパイラが公開済み（valen-lang/Valen）。未解決：パス無効化エラーが実規模で借用検査器並みに読みやすいままでいられるか。**zt**（lalinsky、HN 141+）：`.zt` テンプレートを `zig build` 時に通常の Zig へトランスパイル——テンプレートが型付き関数になり、`{u.nmae}` はビルド失敗しエラーはテンプレート行へ逆写像、既定で HTML エスケープ、`std.Io.Writer` へ直書き（アロケーションなし）。型付きテンプレートの合流（Templ → JSX → Zig）は、最も安い XSS がコンパイラが消すそれだと証明し続ける。**Nix が私のデバッガの半分を書いた**（fzakaria の Rewind；HN 157+）：`rewind nix` が derivation を読み取り専用 erofs イメージへ具現し決定論的 VM で起動（全ビルドが入力の純関数、スレッド日程も含む）。「各機能の難しい部分は既に Nix がやっていた」。`rewind check` がスケジューラ判断を摂動し競合を単一の決定ステップへ絞る。正直な留保：単一 CPU の VM では彼の競合は再現しない——16 コアで 1000 回中 396 回失敗。だからこそ「待つ」でなく「日程摂動」が機能。手元の mini-Antithesis。**Unikernel は難しかった——強調：過去形**（Huntley × Cormack；HN 21+）：アプリ＝OS には悪用できる userland/シェル/インタプリタがない。歴史的摩擦（欠けたライブラリ、ドライバ考古学）は agent が移植するため消えた（agent が黄金オラクルとバイト一致する Rust 版 `mkfs.xfs` を書き、Microsoft Orleans は 1 週間で分散 OCaml unikernel OS に）。安全の二分法：ミッションクリティカルは seL4、その他は unikernel——「簡単に破られるものの強化をやめろ」。マルチユーザ OS は人間オペレータ時代の設計負債。**IRCv3 の HN の日**（283+）：RFC1459/2812 への 10 年の加算的・能力折衝拡張（SASL、message-tags、server-time、batch、away-notify。chathistory/sts は進行中。12 組織）——「チャットプロトコルは書き直しなしに進化できない」への最長の反例。CAP 折衝はまさに MCP 式能力発見が響くもの。加算が flag day に勝つ。**Postgres は遅くない、ストレージが遅い**（ClickHouse/POSETTE；HN 122+）：同型 m6id.4xlarge 8 群、482 GiB/33 億行の pgbench ヒープ：インスタンスストア NVMe **16,030 TPS vs 基準 gp3 の 1,734（9.24 倍）**、中央値レイテンシ 4.0 vs 36.9 ms。修正はアーキテクチャ——クォーラム同期レプリ＋オブジェクトストア退避、ノードは使い捨てに。留保は缶に印刷済み（基準 gp3 のみ。「結論は意図的にタイトルより狭い」。ClickHouse はマネージド Postgres を売る）。**Doory**（shaongitbd、HN 135+）：セルフホストのオープン Canva（React 19 + Fabric.js + Yjs + Django 5。断ち切り・トンボ付き印刷用 PDF。ブラウザ内ローカル背景除去）——ただしライセンスは Attribution Assurance（商用含め無料、ただし実行アプリに目立つ帰属表示必須）、git 履歴は **6 コミット**：磨かれたコード納品であって有機的プロジェクトではない。メンテナーを育てられるかがプロジェクトかリリース稿かを分ける。**WiFi 7 ルータが 320 Msps の SDR に**（h0m3us3r/w1700k-sdr、MIT、HN 158+）：Gemtek W1700K の MT7996 無線が生の 14-bit IQ を最大 320 Msps で取得、AN7581 SoC が 10 GbE でゼロコピー UDP ストリーミング、262,144 点 FFT を 100 fps、2.4/5/6 GHz、ストリーム中の約 1 ms 再同調——「MediaTek 自社ファームのトレースに対してレジスタ単位で」リバース、MediaTek コードはゼロ。受信のみ。民生 WiFi シリコンは入門用専用 SDR を一桁追い越し、「文書化されていないレジスタをベンダーファームのトレースと突き合わせる」手法は「能力不整合」な民生無線チップ全級の再利用可能な型。**PATH のチルダ**（→ [[security]]）。**ppt-master**（hugohe3、58,983★、v6.7.0）：文書/話題 → *ネイティブ* PPTX（マスター、ネイティブ図形、データ接続のチャート、アニメーション、発表ノートからの音声ナレーション）。自分のテンプレートをデザインシステムに。任意の agent ツール内で自分のキーでローカル生成。留保：濃いスポンサー/アフィリエイト収益化、AtomGit ミラーが示す中国中心のユーザーベース——10 か月で約 59k★、今月最大の中国 OSS 輸出。**Campfire 検死**（→ [[agent-stack]]）。

Sources: [momo5502 — 500B トークンの後](https://momo5502.com/posts/2026-10-09-game-decompilation/) · [Kotaku — vibe-coded 移植](https://kotaku.com/we-might-be-cooked-as-these-vibe-coded-web-browser-ports-of-halo-the-simpsons-hit-and-run-and-gta-vice-city-seem-to-work-perfectly-2000743300) · [snuri00/ps2-web-recomp](https://github.com/snuri00/ps2-web-recomp) · [nanolathe.gg](https://nanolathe.gg) · [storytold/photocraft](https://github.com/storytold/photocraft) · [Shokunin — クローン批判](https://www.shokunin.studio/blog/2026/10/9/attack-of-the-vibe-coded-photoshop-clones) · [LWN — Eurydice](https://lwn.net/Articles/1055211/) · [Bitwarden フォーラム](https://community.bitwarden.com/t/published-version-update-in-app-stores/102750) · [OpenFatigue](https://openfatigue.ai/) · [prophitt.me — C CGI](https://prophitt.me/writing/a-modern-web-app-in-c) · [shkspr.mobi — README 検証](https://shkspr.mobi/blog/2026/10/i-paid-people-to-try-and-follow-my-readme/) · [thomas-huehn.com — クヌース小切手](https://www.thomas-huehn.com/knuth-reward-check/) · [verdagon — Valen](https://verdagon.dev/blog/valen-group-borrowing) · [lalinsky/zt](https://github.com/lalinsky/zt) · [fzakaria — Rewind](https://fzakaria.com/2026/10/07/nix-wrote-half-of-my-debugger) · [ghuntley — unikernel](https://ghuntley.com/unikernels/) · [ircv3.net](https://ircv3.net/) · [ClickHouse — Postgres ストレージ](https://clickhouse.com/blog/posette-talk-recap-postgres-isnt-slow-your-storage-is) · [shaongitbd/doory](https://github.com/shaongitbd/doory) · [h0m3us3r/w1700k-sdr](https://github.com/h0m3us3r/w1700k-sdr) · [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master)

## 2026-10-13 午後 → 10-14 04:03 — ツールチェーン バッチ：rustc の P-critical な穴、ゴースト命令、RimWorld が Unity を離れる、Linux スマホ検死報告

**rust-lang/rust #164250 — P-critical 不健全性**（セキュリティ注記 → [[security]]）：`T: 'static` 束縛 + カスタム `Drop` の構造体で、共変フィールド代入から非 'static 参照が侵入；安全なコード約 10 行で ASan が stack-use-after-scope を検出。1 時間以内に I-unsound と P-critical 分類。バージョン境界：lcnr 版は「1.4 から不健全」（`static` 不要、Godbolt 再現あり）；報告者版は 1.18.0（2017）から；関連可能性 #128225。健全性は修復が続く性質であり、ユーザーが無料で得られる定理ではない。

**uv-build を使わないでという懇願（Michał Górny、Gentoo）：**uv 本体ではない（「良いツールで上流の反応も良い」）— 対象は PEP 517 ビルドバックエンドとしての Astral の **uv-build**：wheel は 1.2〜1.5 MiB で flit-core の 45 KiB の数十倍、**30 日で 12 リリース**、下流の採用 1 件ごとにソースベース distro が大型で高速に変わる Rust バイナリの再ビルドを強いられる（「また十数パッケージがキーワードを失う」）。Rust の移植性も痛い：rustix 依存は SPARC をスキップ；32 ビットはアドレス空間枯渇（uv をビルドするだけでも ebuild ハック 2 つ）。主張は検証に耐えない — PEP 517 の存在意義はバックエンドとフロントエンドの混在であり、「uv との一貫性」は無関係、性能利得は「ほとんど実行されない操作」の ~100 ms でエンドユーザーは実行しない。推奨：flit-core か hatchling — どちらも uv をフロントエンドにすれば問題なく動く。Rust 書き換え波が同じ壁にぶつかり続けている：ビルドバックエンドはインフラであり、バイナリサイズとリリース頻度は最も見えない下流に課される税だ。

**「vfmaddrnd231pd は誰だ？」（purplesyringa）— ゴースト命令：**Intel の 2024 年版 SDM に、命令ごとの丸め制御を持つ packed-double FMA が記載されているが、存在しない：GNU as はニーモニックを拒否；引用される intrinsic（`_mm_fmaddround_pd`）は Intel 自社の ICC にすらない；エンコーディングの `VEX.DDS` フラグはマニュアルの他のどこにも出現しない；Haswell では `#UD`；231pd 変体のみ掲載；そして 2026 年版 SDM からは完全削除。felixcloutier.com（2023 年 12 月凍結）は通常の FMA 命令として掲載したまま。最有力推測：計画されていた `vfmaddrnd*` ファミリがシリコン後期の問題に当たり撤回、ドキュメント清掃が不完全だった。spec を ground truth として読むツールチェーンやエージェントへの教訓：**文書化された命令は、アセンブラと CPU が揃って同意するまで仮説である。**

**GitHub 10 月 12 日障害 — 一企業、三サブシステム：**12:21 UTC から Actions、Issues、PR が同時に劣化（Action 実行のキューイング不可、Checks API 不具、issue 作成/更新不可、PR レビュー依頼不可）；PR は 13:02 回復；13:38 の初回緩和は部分的成功；Issues+Actions は ~14:35 緩和；通知バックログは ~19:28 に排水；20:16 解決宣言。RCA は約束済み・未公開。単一ベンダー集中イベント：CI、レビュー、issue トリアージが同時に停止 — GitHub をポーリングして次のタスクを得るエージェントフリートはその間ただ停止した。

**Thunderbird for iOS — ゼロから書かれたネイティブクライアント：**Swift/SwiftUI（作者コメントで ~98.9% Swift）、デスクトップや Android からのコード再利用なし；リポジトリ `thunderbird/thunderbird-ios`。WIP：高速アカウント設定、バッテリー配慮のバックグラウンド同期、受信箱、新しいコンポーザ — そしてコミュニティ開発者が機能を早期にテストできる実験的なフィーチャーフラグシステム（貢献インフラを最初のコミットから設計）。最初のコミュニティテストビルドは「数か月以内」、TestFlight はまだ；iCloud/me.com は標準 IMAP + アプリパスワード経由（Apple は OAuth を提供しない）；「トラッキングもデータ収集もなし」；iPad も対象。Firefox Enterprise が開いた絵を完成させる — 同コンソールはすでに Thunderbird 管理を予告済み。

**RimWorld 1.7 が Unity を離れ Waylith へ：**Ludeon 自社エンジン — 後期ゲームのストレス植民地が 1.6 比 2.2 倍高速（公表レンジ 2〜4 倍）、1,500 mod パックのロードが 14 分 → 6 分。**セーブは双方向互換**（1.6⇄1.7）；ほとんどの mod は無変更で動作（1.7 タグで再公開）；modder はモダン C# と安価なカスタム VFX を獲得。Steam「unstable」ブランチで公開中、正式日付なし；10 年以上前のマシンは動かない可能性；Waylith は未発表の新作も動かす予定。2023 年価格騒動後の Unity 離脱潮でこれまで最大の実戦テスト — 宣言ではなく、実測数字付き・セーブ互換の、出荷済みエンジン交換。

**xtool v1.21.0 再トレンド（+1,182★/日、計 9,125★、MIT）：**クロスプラットフォーム Xcode 代替 — SwiftPM で Linux、Windows、macOS から iOS アプリをビルド/配置。確認済み：リリース 10 月 5 日、最終 push 10 月 6 日、オープン issue 93 — メンテは活発。大きな HN スレッド（195〜269 pts）は 2025 年 5 月のローンチ時のもので、今回の急上昇に新しい議論スレッドはない — 見えるトリガーはリリースウィンドウで、feed はそうしか書いていない。23 か月のプロジェクトが 4 桁の星日を積む：Swift-on-Linux はデモから、iOS 隣接世界の一部で日常ツールへ越えた。

**Linux スマホ検死報告（Amos Batto — 両方所有、回路図まで読んだ）：**失敗したもの：Librem 5 のカメラは撮影ごとに 3〜4 秒停止、720p エンコードは素材の約 10 倍の時間（PinePhone は約 50 倍）；A64/i.MX8M は遅い；Purism は 1,299 ドルに値上げし 600 件の未返金キャンセルを認め、PINE64 のコミュニティは崩壊。うまくいったもの：**Phosh が UI 競争に勝利（PinePhone ユーザーの 39.3% vs Sxmo 15.5%）し、約 46.9 万行の 98.7% が外部組織の管理下に**；モバイル UI は Debian、Ubuntu、Fedora、postmarketOS などにパッケージ済み。ハードウェアの転換点は Rockchip RK3588S（Liberux NEXX、Dawndrums Divine D.）— それでもシングルコアでローエンド Snapdragon 4 Gen 4 に 25% 劣る。残る 3 つの道：mainline RK3588S スマホ、Qualcomm IoT SoC（QCM6490 は 2036 年 7 月までサポート）、Android カーネルスマホ — しかし libhybris デバイスは 2026 年 1 月 1 日に EOL を迎えたカーネルを積み、**未修正 CVE 1,539 件**、Waydroid 式アプリ対応はサンドボックスを弱める。主張：「Linux スマホを本当に妨げているのは企業」— System76 式のニッチであり、双寡頭への挑戦者ではない。EOL カーネルの CVE 数は「焼けばいい」派へのこれまでで最強の一つの事実；98.7% のアップストリーム化は残るニッチにとって最強の存在証明。

Sources: [rust-lang/rust #164250](https://github.com/rust-lang/rust/issues/164250) · [uv-build 懇願](https://blogs.gentoo.org/mgorny/2026/10/12/a-plea-not-to-use-uv-build/) · [vfmaddrnd231pd](https://purplesyringa.moe/blog/who-is-vfmaddrnd231pd/) · [felixcloutier.com](https://www.felixcloutier.com/x86/vfmaddrnd231pd) · [GitHub incident](https://www.githubstatus.com/incidents/93njd414rpbx) · [Thunderbird blog](https://blog.thunderbird.net/2026/10/thunderbird-for-ios-a-first-look-at-the-native-iphone-email-app-in-development/) · [Ludeon — Waylith](https://ludeon.com/blog/2026/10/announcing-the-waylith-engine-and-update-1-7/) · [xtool-org/xtool](https://github.com/xtool-org/xtool) · [Linux スマホは viable か](https://amosbbatto.wordpress.com/2026/10/05/linux-phones-alternative/)

## 2026-10-14 12:03 — 移植波の静的再リンク分枝が現行世代コンソールに到達；ArtCraft スイートがランチャーと監査可能なスコープを得る

**AnyPS5 —— 35,595★、週間 #1、そして移植波の再リンク分枝（`boykopovar/AnyPS5`、GPL-2.0、8 月 3 日作成、オープン issue 641、毎時 push）：**「PS5 実行ファイルを Linux と Windows へ自動移植するツール」——**エミュレーションではない**：**再リンカ**が実行ファイルをターゲット システムのネイティブ形式へ変換し、プロジェクトが PS5 のシステム `prx` ライブラリを再実装してバイナリがそれらへリンクできるようにする——「エミュレーションも別個のランタイム プロセスもなし」。シェーダ再コンパイラは SPIR-V を出力し、`ANYPS5_ENABLE_SPIRV_TOOLS` 付きビルドでは Spirv-Tools で検証される。**週で +28,663★。** README は肝心なところで率直だ：ライブラリ coverage は**これまでに宣言した**関数に対して測られており、PS5 の全システム関数ではない——自己定義の分母に対する百分率——そして「未サポートまたは想定外の状態は厳密に `std::runtime_error` を投げる」（`what()` を stderr に出して終了）；互換性は公開 GitHub データから構築されたコミュニティのブロッカー マップでゲームごとに追跡され、タイトルごとに 1 つの bring-up スレッドがある。PS2→WebAssembly と PSP の再コンパイルと同じ波（ground-truth の教訓は [[frontier-models]] に）だが、こちらは**現行世代**のコンソールを対象にし、ブラウザ用ではなくネイティブ バイナリを出荷する。

**ArtCraft スイートがランチャーを得て、そのスコープが初めて監査可能になる（`storytold/craft-launcher`、2,366★、10 月 9 日作成、egui 上の純 Rust ——「Electron なし、Web ビューなし」）：** スイート内の全プログラムを一覧化し、どれがインストール済みでどのバージョンかを検出し、あなたの OS と CPU に合うビルドを選び（DMG、MSI、AppImage、.deb、.rpm）、**リリースの SHA-256 チェックサムに対して検証**し、インストールし、各アプリの GitHub リリースから更新を報告する単一のネイティブ アプリ；メニュー バーまたはシステム トレイ、11 の UI 言語、同じカタログを表示するブラウザ版もある。カタログの方もニュースだ：**13 のアプリ**——PhotoCraft、LightCraft、FilmCraft、DesignCraft、VectorCraft、PdfCraft、EffectCraft、WordCraft、DeckCraft、GridCraft、CADCraft、SoundCraft、FigCraft——この feed が個別に扱ってきた PhotoCraft/WordCraft/CADCraft をはるかに超える。13 のデスクトップ アプリに達したスイートは 14 個目のアプリよりランチャーを必要とする。そして GitHub リリースから取得するチェックサム検証済みインストールは、マルチアプリのオープンソース ファミリがまさにこの規模で必ずぶつかる配布問題だ：**リポジトリ一覧が今や主張そのものだ。**

Sources: [boykopovar/AnyPS5](https://github.com/boykopovar/AnyPS5) · [AnyPS5 web converter](https://boykopovar.github.io/AnyPS5/) · [storytold/craft-launcher](https://github.com/storytold/craft-launcher) · [ArtCraft](https://artcraft.storytold.com/)

## 2026-10-14 20:17 — コンパイラという harness、現行世代の再リンク、非 ASCII でのみ発火する libc バグ

**Niko Matsakis「What agents mean for Rust (and vice versa)」**（smallcultfollowing.com、10 月 14 日）
——REBASE/SPLASH での講演の伴走記事。彼の枠組みはこうだ：有効な「ソフトウェア工場」は三本の柱——**設計、
構築、最適化**——に立ち、"none of these pillars are solved" であり、Rust はそのうち二本で際立って有利な
位置にある。**最適化**について、彼はエージェントが今や本当にこの仕事が得意だと論じる：高性能暗号アルゴリズム
のために手書きアセンブリを書いてきた技術者たちは "are now turning to agents for that same job"、ネット
ワークサービスの開発者はプロファイラを使いエージェントにロングポーリングやブロッキングといった非同期の
落とし穴を診断させる——これが Rust の "good performance by default, knobs when you need 'em" を正しい形
にする。**信頼性**について彼は Greg Brockman の "rust is a perfect language for agents, given that if it
compiles it's ~correct" を引用し、そのうえで二度限定する：Dijkstra の "Testing can show the presence of
bugs, but not their absence"——そしてエージェントでは "it's not even close" であり、説得力に見えるテスト
スイートの後に "completely missed the boat on the logic" なエージェントが続くことが多い。ここで高度な
型システムが居場所を得る。彼自身が意図的に作らなかった言葉でその限界を記す：**"Type systems can show the
absence of bugs, but not the presence of correctness."** 具体的な要望は枠組みより小さい——ハッピーパスで
明示的な `clone()`/`share()` のノイズをより許容し、チャネル端点で clone 回数を可視化し、
benchmark→profile→agent→PR のループを閉じること。支持データ：**Meta の技術者が今年書いたファーストパーティ
Rust は、それ以前の 9 年分の合計の 2 倍である。**「エージェントがコードの大半を書くから」言語を選ぶ者にとって
の荷重を支える論拠は最後の一つだ：コンパイラは決して疲れない唯一のレビュアーである。

**`jhaizhou-ops/d2r-mobile`**（1,631★、10 月 12 日作成、MIT）——『Diablo II: Resurrected』向けの iOS/macOS
**互換レイヤ**で、**Nintendo Switch 版**（ゲームバージョン 1.0.34.0、PC 3.3.94012 に相当）と Reign of the
Warlock 拡張を対象にビルドされている。原作コードはエミュレータを介さず**ネイティブに**動作し、操作はタッチ
向けに再構築され、プロジェクトの自己申告表は **100% コンテンツ、60 fps、起動から約 1 秒、約 3.8 W**、
ダブルクリックで起動しキーボード・マウス・ゲームパッドに対応する Apple Silicon ネイティブ macOS ビルドも
ある。要件は率直に明記される：**ゲームファイルは各自用意**、iOS 26+（18–25 は旧 API ビルド）、macOS 26+
（15–25 同様）。信号はリリースの刻みだ——v1.0.11、v1.0.12、v1.0.13 が同日にすべて出て、いずれも "the shell
and the repository must be from the same version" と警告する。本 feed が `boykopovar/AnyPS5` と
PS2→WebAssembly 移植で追ってきた静的再リンクの波は、**現行世代の、今も販売中の商業ゲーム**に到達し、
しかもブラウザタブではなく携帯電話に着地した。ゲームファイル持ち込みという切り分けが、完全な互換レイヤを
出荷しながら配布上の正しい側に留まる理由である。

**Android 17 の bionic `wcscspn()`/`wcspbrk()` 回帰**（android/ndk issue #2260、10 月 12 日起票）——2026 年
9 月ビルド（`CP3A.260905.009`）では、除外集合が U+0100 未満のメンバーを 2 つ以上含むとき、両関数が最初の
U+0100 以上の文字で停止し、集合に無いものを一致として報告する。全符号点の走査で **1,111,808 の影響符号点
——U+0100 から U+10FFFF のすべて**が見つかった。ASCII 区切り（改行、ワイルドカード）のためにワイド文字列を
走査するコードは、テキストに絵文字・CJK・キリル・ギリシャ・ラテン拡張文字が含まれた瞬間に壊れる：Android の
Visual Pinball は VBScript ソースのコメントに絵文字を含む台を一切読み込まなくなり、`FileSystem.MoveFolder`
は U+0100 以上の文字を含む全パスをワイルドカードパターンとして扱った（下流の回避策が
`vpinball/libwinevbs` にマージ済み）。報告者の表では、そのビルドで Pixel 7 と Pixel 8a が壊れ、Android 16 の
Nothing Phone 2 は正常。

**機構は `/apex/com.android.runtime/lib64/bionic/libc.so` の逆アセンブルからしか復元できなかった**。
公開されている `android-17.0.0_r1` のソース（2026 年 6 月）はこれらの関数を `external/llvm-libc` から
ビルドしており*正しい*からだ——走査の `cmp w8, #0x100 / b.lo` ループは「表に無く 0x100 以上」を一致とみなして
停止するが、補集合関数は続行しなければならず、`wcspbrk` は `wcscspn` を呼ぶためそれを継承する。bionic の
メンテナは "seems to still be an issue at ToT" と認め、**既存の `wcscspn` テスト自体が誤っている**こと
（期待値が `2u` なのに `wcscspn(L"he￾lo", L"lo")` は 3 を返した）を認め、欠けている非 ASCII テストを
追加し修正のバックポートを試みると述べている。教訓は二つ、うち一つは構造的だ：非 ASCII 入力でのみ発火する
libc の正確性バグはテストスイートが取りこぼす原型であり——ASCII のみのテストが*まさに出荷された理由*である。
AOSP の側面はガバナンスの話だ：ソース公開が出荷済みビルドに遅れると、プラットフォームの利用者がプラット
フォームを逆解析してそのバグを報告することになり、修正はバイナリに対して書かねばならない。

Sources: [baby steps — What agents mean for Rust](https://smallcultfollowing.com/babysteps/blog/2026/10/14/agentic-dev-and-rust/) · [HN discussion](https://news.ycombinator.com/item?id=50084416) · [jhaizhou-ops/d2r-mobile](https://github.com/jhaizhou-ops/d2r-mobile) · [d2r-mobile v1.0.13](https://github.com/jhaizhou-ops/d2r-mobile/releases/tag/v1.0.13) · [android/ndk issue #2260](https://github.com/android/ndk/issues/2260) · [HN discussion](https://news.ycombinator.com/item?id=50083130) · [vpinball/libwinevbs workaround PR](https://github.com/vpinball/libwinevbs/pull/41)

## 2026-10-15 04:03 — 一つの footgun が標準ライブラリへ移り、エージェント向けに売り込まれたレンダラ、自らの主張に柵を張るベクター索引、そしてバックアップ規則そのものを製品にする rooting ガイド

**Go 1.27 の HTTP/1 修正：読まれなかった改行のために接続を捨てるのをやめる。**HTTP/1 では応答が
逐次的に流れるので、1 バイトでも読み残されたボディ——JSON オブジェクトの後の末尾改行——があると
接続が使えなくなり、閉じることはセットアップ費用を再び払うことを意味した。Go 1.27 は
`net/http.Transport` に**残ったボディを非同期的に排出**させ（**最大 50 ms または 256 KB** で上限）、
接続をプールへ戻す；応答が `Connection: close` を持つときはその作業をまるごと省く。Nicholas Husin と
Damien Neil のベンチマークは、単純なステータス取得関数を `index.golang.org` に対して HTTP/1
（`GODEBUG=http2client=0`）で 100 回呼ぶ：**Go 1.26 で約 710 ms 対 Go 1.27 で約 150 ms**——
「That is almost 5 times faster!」。指針は意図的に退屈である：`defer resp.Body.Close()` を書く形に
戻し、複雑さは net/http に任せよ。排出ロジックを手書きするのではなく。明示された但し書き：この挙動は
「might evolve in future versions of Go」、排出はベストエフォート（大きく遅いボディは依然として新しい
接続にフォールバックする）、そして過去の排出の助言は HTTP/2 に対して無意味に適用されることが多かった。
**なぜここに属するか：**この修正はよく知られた正確性の footgun をアプリケーション コードから標準
ライブラリへ移すので、恩恵は自分がその問題を抱えていると知らなかったサービスにも届く——しかも
その数値はツールチェーンと URL があれば誰でも再現できる。

**`academa-labs/manimgx`（MIT、1,231★、10 月 5 日作成）：Rust/wgpu コアの上の Manim CE の Python API、
エージェント向けに売り込まれている。**既存の Manim シーンが GPU 経路で走る——「blazingly fast 3D
animation engine for agents, compatible with Manim CE's API」；プロンプトから、または PyPI/npm から
インストールでき、ブラウザで動く。見出しのベンチマークは、Apple M4 Pro での 1080p60 の 5 シーン：
**36.2 秒の映像を 3.08 秒でレンダリング**、**ManimCE より 90.6 倍、ManimGL より 11.5 倍、Blender
Workbench より 18.7 倍高速**として公開され、launch から MP4 完成までで測られている。**この比較には、
リポジトリ自身が招いている但し書きが値する：**シーン、設定、実行はすべて `benchmarks/` の下に
ツリー内にあるが、Blender Workbench は**ラスタ** レンダラであり Manim のシーンは**ベクター**である
——異なる出力パイプラインに対する 18.7× は別の測定なので、持ち帰るべきは ManimCE と ManimGL に対する
倍数である。シーンを反復するコーディング エージェントにとって、レンダリング レイテンシは有用な
リビジョン 1 回と 20 回の差であり、だからこそ「エージェントのためのエンジン」という枠組みが刺さる。

**`timescale/pg_vectorsearch`（PostgreSQL License、245★）：PRISM、そしてベンチマーク戦争が始まる前に
張られた柵。** **PRISM——「Partitioned Routing Index for Similarity Matching」**を実装する
PostgreSQL 拡張で、概念的には pgvector の IVFFlat に近いが、より新しい量子化、ルーティング、
パーティショニングの上に築かれている：共有バッファ キャッシュに暖かく保持される階層的な重心木、
SIMD 最適化されたポスティング リスト内の RaBitQ 量子化ベクトル、見込みの薄い候補を飛ばす誤差境界、
そしてヒープから完全精度で再ランク付けされる生存者。ネイティブの `vec32`/`vec16` 型に加え、既存の
pgvector `vector`/`halfvec` 列を通常の演算子（`<->`、`<#>`、`<=>`）で使える。主張：「significantly
faster」——IVFFlat と HNSW の双方に対し、クエリと索引構築の両方で、そして HNSW に対しては「1 億
ベクトルのデータセットで、メモリが四分の一のインスタンス上で、同等の再現率においてより高速」。柵：
「**Status: alpha. Meant for testing, not production**」、加えて「upgrading between prereleases may
not be possible; plan to drop and recreate the extension and its indexes」、そしてポスティング
「lists grow as rows arrive and never split on their own」（`prism_rebalance` 手続きが存在する理由）。
欠けている部品は再現ハーネスである；それが存在するまで、メモリ対再現率の比較は、深刻だが自己開示
された但し書きを伴うベンダーの主張である。（データベース索引の系と比べよ：Polars 2.0 の行順の変更と
turbopuffer の ANN 降格——索引層はクエリが何を前提にしてよいかを繰り返し規定し直している。）

**`wesbos/photo-frame-dashboard`（1.1k★、10 月 8 日作成）：バックアップと検証の規律*こそが*製品である。**
民生向け Android フォト フレームを乗っ取るための段階別ガイドとスクリプト——「unlock it, root it,
replace the vendor app, and run your own web page full screen」——が **PF1007L/AiMOR**（Allwinner A33）、
**BIUFRAME/Synergy 10X1**（Rockchip RK3126）、**Skylight Calendar 150-CAL**（RK3566、隠しメニュー
経由）、**LOOFII C-3**（Allwinner A133、root ADB を出荷）を覆う。アクセスはリスクの昇順で試される：
**まず USB 経由の ADB、次にネットワーク（`adb connect <ip>:5555`）、そして最後にのみベンダー アプリの
エクスプロイトか SD カードのブート パッチ。**バックアップとローダーのスクリプトが、Cloudflare Workers
へデプロイする Vite ダッシュボードと WebView キオスク アプリとともに出荷される。貢献は規則のほうで
ある：これらは「records of the units their owners tested, **not universal flashing guides**」であり、
書き込みの前に所有者に尋ね、**検証済みのバックアップ**（バイト数、SHA-256、`0xCC` 埋めの確認）の前に
書き込みを行わず、`OKAY` ステータスを信頼せず、最初の不一致で停止し、Wi-Fi 資格情報とトークンを
含むためダンプは非公開に保つ。文書化されたロックアウトのリスクは明示されている——ベンダー アプリを
無効化する前に Settings に*手で*到達できることを確認せよ。ADB 経由の読み戻しはそれを証明しないからだ。
TLDR はコーディング エージェントをこのリポジトリに向けろと言うが、まさにそれがチェックリストの存在
理由である：さもなければエージェントは先に書き込み、ロックアウトを後で発見する。

**Iosevka の HN 首位 630 ポイント、しかも何も出荷していない。**現行リリース **v34.9.0、2026-09-26
公開**；その前の二つは v34.8.1（8 月 22 日）と v34.8.0（7 月 26 日）——活発にメンテナンスされている
プロジェクトで、おおよそ月次の間隔であり、サイトには**ニュース節がない**。8 つのファミリ（Iosevka、
Term、Fixed + slab 変種、加えて準プロポーショナルの Aile と Etoile）、等幅グリフは「exactly 1/2em
wide」、2 つの設定可能な幅、**146 の設定可能な文字と 19 のスタイル セット**（Andale Mono、Consolas、
JetBrains Mono、IBM Plex Mono を模すセットを含む）、そして **248 言語**を主張するカバレッジ。この
項目は**10 年前の、依然メンテナンスされているツールの再発見**であってローンチではない——トリガー
規則をフォントに適用したものであり、「スターが動いた」が見出しになる前に*なぜ*を要するという
念押しである。評価するときに述べるべきトレードオフ：自分の変種をビルドするモデルこそが、リガチャと
幅のセットが完全である理由であり、既製のバイナリが望みどおりでないかもしれない理由でもある。

Sources: [Go blog — Better HTTP/1 connection reuse](https://go.dev/blog/http-connection-reuse) · [HN — Go 1.27 HTTP/1](https://news.ycombinator.com/item?id=50090369) · [academa-labs/manimgx](https://github.com/academa-labs/manimgx) · [ManimGX benchmarks](https://github.com/academa-labs/manimgx/tree/main/benchmarks) · [timescale/pg_vectorsearch](https://github.com/timescale/pg_vectorsearch) · [HN — pg_vectorsearch](https://news.ycombinator.com/item?id=50086165) · [wesbos/photo-frame-dashboard](https://github.com/wesbos/photo-frame-dashboard) · [HN — photo-frame-dashboard](https://news.ycombinator.com/item?id=50048003) · [Iosevka](https://typeof.net/Iosevka/) · [be5invis/Iosevka](https://github.com/be5invis/Iosevka) · [HN — Iosevka](https://news.ycombinator.com/item?id=50084240)


## 2026-10-15 12:03 — Torvalds の初の LLM 支援カーネルシリーズ（レビューが既にレースを発見）；Oxide がラック全体をエミュレート；Petal がウィンドウ単位ペアプロを復活

**Linus Torvalds が初の LLM 支援パッチシリーズを投稿——そしてレビュー プロセスが既にその中からレース コンディションを 1 件見つけた（LWN、10 月 14 日）。**カーネル メモリ管理への 10 パッチ。Maintainers Summit でこの作業に LLM を使い始めたと述べたのに続くもの。狙いは **folio lookup**：ホットな folio に気づいて強化し（"by noticing when folios are hot"）、彼の言では "delay releasing this folio until after a RCU period"——folio 検索と実際の folio データアクセスの両方を RCU 保護領域内で走らせ、ユーザ コピーがページ フォールトを起こさない限り fastpath から参照カウントのトラフィックを取り除く。Torvalds は read() 主体のベンチマークで **"order-of-magnitude speedup"** を主張する——自己申告・自身のワークロード・独立測定はまだない。物語の芯は数字ではない：オープンソースで最も重みのあるゲートキーパーがメモリ管理コードに LLM を使い、事前にそれを明言し、その後レースを捕まえたのと同じレビュー プロセスに提出した——「称職なレビューの下では LLM 出力は問題ない」という立場の最初のデータポイントで、読み方は*レビューは機能した、パッチは未着地*である。規範をめぐる議論は LWN のコメント欄にある（"if Linus did it, I don't see why I can't" 対 tlamp のショベル：同じ機械でも、使う手が違えばやる仕事が違う）。

**Oxide の Virtual Oxide Labs（Voxel）：ラック 1 台分——MCU もファームウェアも含めて——を 1 台のマシン上に約 10 分でエミュレート。**illumos + Rust。旧 a4x2 仮想ラボの後継で、マルチラック構成も扱う。これを強いた制約：完成したラックは直接顧客へ渡るためラック規模のハードウェアは希少で、チームは実際の顧客ネットワーク トポロジを再現し、特製の「テスト版」リリースを作らずに**本物のコントロール プレーンを走らせる**必要があった——Bryan Cantrill の「Prime Directive」は、ラボは無修正のストック Oxide ソフトウェアを走らせるというもの。エミュレーションの深さが主題：**sled は Propolis VM**（gimlet、cosmo、scrimlet）；**ネットワーキングは FRR を走らせる Debian VM**（BGP numbered/unnumbered またはスタティック）に **SoftNPU**（Oxide のソフトウェア P4 スイッチ）；そして**マイクロコントローラは本物の Cortex-M7/Cortex-M33 デバイスのエミュレート**——オープンソースの `sp-emu` により、実際の Hubris ファームウェアをフラッシュし、SysTick をカーネルのリロード値に対してモデル化——happy path の `SpSim` スタブを置き換える。起動時は sprockets PKI を生成し、エミュレートされた STM32H753/LPC55 をフラッシュし、トポロジを配線し、~6 台の Propolis VM をブートし、`wicketd` がラックをコミッションする前に `voxel-init` を走らせる——**終端間でおよそ 10 分**。作者は 32 スレッドの Ryzen 9 mini-PC（96 GB RAM）で 6 sled を走らせ、トポロジ変更は「`rack.rs` の数行」。明示された注意点：sprockets 証明書は本番のように製造や RoT からプロビジョンされない、エミュレート ハードウェアは遅い、一部の詳細（真のサイクル カウントのない `cycles` フィールド）は暫定措置。ハードウェア企業は普通この層を mock で済ませる；Oxide はマイクロコントローラのファームウェアまでエミュレートした——取り除かれたボトルネックはハードウェアの供給であって、ソフトウェアではなかった。

**`kiruna-labs/petal` —— CoScreen のメーカーがウィンドウ単位のペアプログラミングをオープンソース化。**Rust、Apache-2.0、147★、10 月 13 日プッシュ：低遅延・高解像度のスクリーン共有とリモート操作で、共有されたウィンドウはグリッドのタイルではなく**本物の、移動・リサイズ可能なネイティブ ウィンドウ**として自分のデスクトップに降りてくる——ユーザ別ラベル付きカーソル、どのウィンドウにもクリック 1 つで入るキーボード/マウス操作、複数ユーザの同時共有、永続ルーム（常設の `eng-sync` ルームにワンクリックで参加。リンクも予定調整も不要）。デプロイの物語が設計そのもの：アプリはどこでも同一で "only the video backend changes"——**Petal Cloud**（ホステッド LiveKit、ゼロ設定）、**セルフホスト**（1 枚の docker-compose で自分の LiveKit サーバへ向ける）、または **fork & build**。現在は macOS と Windows、"Linux support coming next"。147★ はそのまま読む：実績あるチームの新規ローンチであって、実績あるコミュニティではない——そして PentAGI や Talorys と同じ、セルフホスタブル インフラの escape hatch パターン。

Sources: [LWN — Torvalds's first LLM-assisted patch series](https://lwn.net/Articles/1100449/) · [HN — LWN thread](https://news.ycombinator.com/item?id=50090842) · [Oxide — Virtual Oxide Labs](https://oxide.computer/blog/voxel-labs) · [HN — Voxel](https://news.ycombinator.com/item?id=50092423) · [petal.live](https://petal.live/) · [kiruna-labs/petal](https://github.com/kiruna-labs/petal)

## 2026-10-15 20:03 — アンチチートが eBPF + systemd として Linux に来る；C の標準がその実装に出会う；£5 の Pico が九年のハックを終わらせる

**Epic が Easy Anti-Cheat の Linux 版を書き直す（EAC Linux v2）——カーネル モジュールなし。**Epic のアナウンスに対する Phoronix の読みによれば：アンチチートの **systemd サービス**（保護されたゲームの起動時に立ち上がり、以後アンロード不可）と **eBPF カーネル プログラム**、そして Canonical、Fedora、Universal Blue、Debian、SUSE、Rocky Linux、Microsoft UEFI CA の鍵による **UEFI Secure Boot** の必須化——保護を "much closer to par with Windows" へ。Epic 自身の投稿が履歴を供給する：ネイティブ Linux クライアントは 2014 年から、Wine/Proton 経由の Windows ビルドは 2021 年から、しかし**ゲームごとのオプトイン**——だから Fortnite はまだ Linux にない（"but it's coming"）。Fortnite が v2 のパイロットとなり、その後他の開発者へ；Epic は Fedora プロジェクト リーダー Jef Spaleta とのパネルと「Valve との開かれた通信路」を約束する。Phoronix が旗を振る難所：**Steam Deck はまだ必要な機能をサポートしていない**（Epic は Valve と協力中と述べる）。Linux ゲーミングの常態の妥協——ネイティブ クライアントはあるが競争マルチプレイはほぼない——が初のプラットフォーム級の計画を得た。代価はコミュニティが従来抵抗してきたカーネル信頼の取引だ：カスタム カーネルと Secure Boot なしの構成は、ディストロか Valve が追いつくまで除外される。

**"Your C is not standard C" が現実のギャップを反対側から目録化する。**sebsite.pw の、gcc/clang + glibc/musl が ISO C と食い違う場所の解説：**`asm`** は両コンパイラでデフォルト予約されており、普通の識別子として使う厳格適合コードはコンパイルできない；**`FLT_ROUNDS`** はランタイムの `fesetround` を追うべく標準が要求するのに gcc は 1 にハードコード；五つの標準浮動小数点プラグマ（C99 の `FENV_ACCESS`、`FP_CONTRACT`、`CX_LIMITED_RANGE`；C23 の `FENV_ROUND`、`FENV_DEC_ROUND`）は C99 から 27 年経って「gcc では単なる無演算」で、コマンドライン フラグでは代替できない（翻訳単位全体に効く）；**clang は `const int f();` を `int f();` と衝突するとして拒否**するが、標準は戻り値型の修飾子は捨てられると述べる；**musl の `stdarg.h`** は二引数 `va_start` でコンパイラのビルトインを覆い隠し、対応するコンパイラ上でも C23 の一引数形式を塞ぐ。著者は明示的に未完のリストだと言い、プラグマ深掘りを予告する。10 月 10 日の C2y UB 削除の話の補完であって反復ではない：委員会が未定義動作を削除するのが C の現実ギャップの半分なら、実装がひそかに存在する標準を実装しないことがもう半分だ。`-pedantic` が検査するのはソース対標準であって、プラットフォーム対あなたの前提ではない。

**九年がかった Xbox 360 のグリッチ ハックはソフトウェアに時代遅れにされ——£5 の Pico が民主化屋だった。**Reset Glitch Hack は一つの命令を壊す：modchip（Matrix CoolRunner Rev D）が選んだ瞬間に CPU リセット線へ約 100ns のパルスを打ち、署名検証ルーチンの `mr` を「宛先レジスタに 0 を移す」に変える——するとブート ROM は未署名コードを受け入れる。著者は 2017 年にチップを買い、道具（はんだ付け、NAND プログラマ、JTAG プログラマ）で九年立ち往生した；変わったのは**Raspberry Pi Pico**だ：**PicoFlasher** は NAND ダンプを 30+ 分から数秒にし、**pico-dirtyJtag** は Octal450 のタイミング ファイルで CoolRunner に書き込む——PIO タイマが約 7.5ns の精度を持ちフォールト インジェクションに足る £5 のハードウェア。皮肉は予定通り：公開の一週間前、ソフトウェアのみの **Xbox360PeerPressure** が出た——1BL ブートローダがシリコンに焼き付けられ、従来のソフト的手段ではハック不能と長らく見なされた本体に対して。Pico はハードウェア攻撃ツールの民主化として繰り返し現れる（2021 AirTag ファーム ダンプ、2023 Switch modchip、2026 グリッチ タイミング）：**フォールト インジェクションの障壁は物理ではなく道具のコストだった**——そして九年のハードウェア作業は、一つのソフトウェア バグに一週間で廃されうる。

Sources: [Epic — EAC Linux v2](https://onlineservices.epicgames.com/news/introducing-easy-anti-cheat-linux-v2) · [Phoronix](https://www.phoronix.com/news/Easy-Anti-Cheat-Better-Linux) · [HN — EAC](https://news.ycombinator.com/item?id=50088166) · [sebsite.pw — Your C is not standard C](https://sebsite.pw/w/20261012-notstdc.html) · [HN — notstdc](https://news.ycombinator.com/item?id=50071546) · [kennedn.com — nine years to hack my Xbox 360](https://kennedn.com/blog/posts/glitching/) · [HN — Xbox 360](https://news.ycombinator.com/item?id=50070661)

## 2026-10-16 — うるう秒が決議で死ぬ。C++26 契約が GCC 16 に着地。エージェント RE がコンシューマハードウェアのテンプレートを得る。Proa は一つのコンポーネントを HTML と Markdown に描画

**うるう秒の死：** 第 28 回 CGPM の決議 5 が**連続 UTC を 2027年5月20日発効**とし、|UT1−UTC| の上限を 3,600 秒に設定（「UTC の数世紀にわたる長期連続性を確保」）。正負どちらのうるう秒も挿入されない；DUT1 は引き続き GNSS/IERS から公開；無線通信システムは ITU-R 規則のもと 2035 年まで（2040 年より遅くなく）の移行窓。引き金は負のうるう秒——2025年3月の CCTF/IERS ワークショップは 2035 年までの発生確率 **30%** と見積り、負の秒は適用されたことがない；決議は準備コストを millennium bug 対策に例える。2027年5月から故障モードが反転：うるう秒テーブルをまだ扱うコードがバグになり、|UT1−UTC| の 1 時間へのドリフトは UTC を太陽時と比べる者を静かに壊す。まれな「移行＝コード削除」。

**C++26 契約（P2900）が GCC 16 に着地**——唯一出荷中の実装（`-std=c++26 -fcontracts`）：`pre(...)` / `post(result: ...)` / `contract_assert` は**宣言に**置け、要件がヘッダに現れ、四つの評価セマンティクス（ignore/observe/enforce/quick-enforce）で本番ビルドまで生き残る；enforce 下の事前条件違反は関数、述語、`[assertion_kind: pre, semantic: enforce]` を印字して SIGABRT。注意書きこそが中身：断言ごとの移植可能なセマンティクス選択は無い（実装定義）、契約は関数型の一部ではない（オーバーロード解決は無視）、事後条件は正常リターンのみ、述語は変更できず、P2900 自身が契約は「エラー処理と入力検証に使ってはならない」と明言。「最初の宣言が勝つ」は今すぐレビューチェックリストへ。

**エージェント RE のコンシューマハードウェア・テンプレート：** Christian F.K. Schaller（GNOME、個人として）がループを文書化——ベンダーの Windows ドライバを実デバイスのパススルー付き KVM VM で動かし、Linux ホストで usbmon を録り、自分のドライバに同じ操作をさせ、**トレースを差分する**（「数千行の USB キャプチャを読める」上「退屈しない」）。成果物：フィルムスキャナ Plustek OpticFilm 8200i の SANE バックエンド（アップストリーム SANE は 2026年9月に独立して対応を着地）、Flathub の Rust/GNOME スキャンアプリ Negative Vibes、ThinkPad X1 Carbon Gen 14 の MIPI カメラ修正（低照度輝度 31.1 → 90.9）。スクリプトは `hw-harness` プロジェクトに一般化；限界は明記（単体・単フレーム；低照度の青チャネルはまだ ~17% ずれ；実機の検証は人間）。

**Proa**（Apache-2.0、Proa Labs）——一つの型付きコンポーネントが **HTML と Markdown** に描画される Rust SSR フレームワーク（`html_sync!` / `md_sync!`）、ドキュメント順でも逆順でもストリーミング、RSJS islands が Rust シグナルを約 1.3 KB gzip の JS ランタイムへ lower、cargo ビルド時の WCAG/WAI-ARIA チェック；ベンダー実測（8 vCPU EPYC の温 p50）：コンポーネント描画 23.5 µs 対 React `renderToString` の 5.56 ms——「237×」——ページ自身が条件を明記。マルチターゲット描画はエージェント形ウェブへの賭け：同じコンポーネントをブラウザと LLM が消費する。

非 AI レーン：**DEsk**——C で書かれた skeuomorphic な Wayland デスクトップが HN 首位（fyzugx/DEsk、665★、10月10日作成、開発者一人で九日；アンチフラットの反発が Design Creativity Bench のモード崩壊測定の人間側から到着）；**Fortran 70 歳**（初版マニュアルは 1956年10月15日付；12月1日にマンチェスターでイベント；開いた問いは CUDA 化と七十年に積まれた物理コードの関係）；**E Ink Kaleido 4**（色域を 40K+ に倍増、新しい酸化物 TFT バックプレーンで **18 fps**、白反射率 +15%；初の製品は漢王 M10C II）；**Flipflop**（GPL-3.0、デバイス間の永続 iroh トンネル——トンネルが転送より長生き；Apple の制約で iOS 版は発行不可）。

Sources: [BIPM Resolution 5](https://www.bipm.org/en/cgpm-2026/resolution-5) · [HN](https://news.ycombinator.com/item?id=50105777) · [C++ Stories](https://www.cppstories.com/2026/cpp26_contracts/) · [GNOME ブログ](https://blogs.gnome.org/uraeus/2026/10/15/aiandreverseengineerhardware/) · [proa.so](https://proa.so/) · [fyzugx/DEsk](https://github.com/fyzugx/DEsk) · [Fortran 70](https://fortran-lang.org/news/2026/09-15-Fortran-birthday/) · [E Ink Kaleido 4](https://www.eink.com/news/detail/EInk-Launches-Latest-Version-of-Color-ePaper-Platform-E-Ink-Kaleido-4) · [andunieee/flipflop](https://github.com/andunieee/flipflop)

**10-16 夜→10-17（学習パス）——保守キャパシティの週（→ テーゼ 22）。 （1）PostgreSQL 19 が約 11月19日へ延期**（当初 9月末/10月初頭）。理由は**LLM 支援レビュー——Postgres 開発者自身が通常のプロセス内で運用しており、一元的な AI レビューアではない——が約 40 件の欠陥報告を上げ**、コミュニティが凍結前に処理しきれなかったこと。コミッターの Peter Eisentraut（EDB）：重要な 8–10 機能が v20 へ差し戻し、2 つの括り——一部は「重大なアーキテクチャ上の欠陥」があった（Tom Lane はリリース前に SQL/PGQ グラフ機能を警告済み）、残りは AI が見つけた長尾のエッジケースで「以前ならリリース後のおよそ 5 年間のパッチとして表面化していた」もの。vibe-coding が原因であることを明示的に否定——機能群はサイクル途中のレビューツール向上より前からある。*レビューツーリングが自身の機能を途中で追い越したために*リリースを延期した最初の大型 OSS プロジェクト；「次サイクルで自力で直る」はレビュー能力の向上が止まる場合にしか成立しない。 **（2）Gentoo が Chromium に「last rites」**（Sam James が 9-24 に mask；LWN 記事）：stable ebuild（151.0.7922.169）が**既知の 602 脆弱性**を抱え；メンテナの Matt Jolly は**コンパイルだけで週 6 時間超**（速いマシンで 3.5 時間、ラップトップで 15–16 時間）、約 2 週間ごとのメジャー ブランチと週次 bump——2023 年の引き継ぎ後 2 回短縮されたペース——に加え新たな Rust/Go 依存と信頼できない upstream tarball CI。復活条件：C、C++、Go、JavaScript、Rust に通じた**少なくとも 3 人のメンテナ**。同じ記事内の対比：Firefox の Gentoo メンテナは 2 週間あたり約 20 時間で済む——**Mozilla が下流パッケージャと協働するから**。保守とは関係であって、単なるビルドではない。 **（3）vlt の「Thank you, Deno」**が 10-10 の買収の範囲を埋める：**Deno ランタイム自体が 1 年以内に終焉**；JSR レジストリは Cloudflare インフラで継続；チームの使命は Deno の **celld** エンジンを workerd へ統合すること——Cloudflare が買ったのはレジストリとエンジンであってランタイムではない。論点：Deno は本番の臨界量に届かなかった（「2026 年の Node は 2018 年と同じく支配的」）が、現代のほぼすべての Node 機能の背後の緊急性を供給した；独立系 JS ランタイムの両方とも今や大きな会社の中に住む（Bun は Anthropic、Deno は Cloudflare）；コミュニティ フォークが出るかは未解決。 **（4）小さい方から：** N100 セルフホスト在庫（28 サービス——ネイティブ バイナリ 17、Podman 下 11——€180 の Beelink に、RAM 約 7.5 GB；内容は拒否リスト：Docker なし、*arr なし、メールのセルフホストなし；同 SKU は現在 **€359**、DRAM 税がエントリー級に）；**sill**（Apache-2.0：任意の Mac ウィンドウを ScreenCaptureKit + ハードウェア HEVC VideoToolbox で iPhone/iPad へ、入力は TLS 1.3 で戻る、アカウントなしサーバーなし——リモートの*使用*であってミラーリングではない）；**同一 SSIMULACRA2 での JPEG XL 対 AVIF 実測**（Jake Archibald：写真は AVIF 勝ち（JXL が 15–25% 大きい）、スクリーンショット（30–90%）、透過（最大 70%）、デコード 2–3× 速い；**jixel 0.4.2** はサイズでたいてい libjxl を上回り、libjxl の最大 effort は利益ほぼゼロで約 18× 遅い；JXL が保持するのはロスレス（WebP より 9–17% 小）、ロスレス JPEG→JXL 変換（9–20% 節約）、高 effort でのほぼ無料のプログレッシブ描画；第 2 の独立エンコーダが格式の数字を動かした幅は多年の唱道を超えた）；**「I Love Software Rendering」**（Dell OptiPlex 380 で Quake を 800×600 ロック 60 fps——DEsk に続く美学反発第 2 弾：初期コンピューティングの「制限」はデザイン言語だった）；**Folders**（Daniel Temkin のテキストなし esolang——プログラムは純粋な順序木、HelloWorld は 209 ディレクトリ 0 ファイル；ファイルシステムはエージェントの native インターフェースなので、ほぼ補助なしで書けてしまう）。

Sources: [The Register](https://www.theregister.com/databases/2026/10/16/postgres-19-delayed-after-ai-reviewers-find-more-bugs-than-humans-can-fix/5303471) · [Eisentraut: The reverts will continue until morale improves](http://peter.eisentraut.org/blog/2026/10/09/the-reverts-will-continue-until-morale-improves) · [HN](https://news.ycombinator.com/item?id=50119991) · [LWN: Gentoo Chromium の last rites](https://lwn.net/Articles/1097760/) · [vlt: Thank you, Deno](https://www.vlt.io/blog/competition-keeps-javascript-moving) · [viceconsole.fyi: What I self-host](https://viceconsole.fyi/blog/2026/10/10/what-i-self-host/) · [Saffsanity/sill](https://github.com/Saffsanity/sill) · [Jake Archibald: JPEG XL vs AVIF](https://jakearchibald.com/2026/jpeg-xl-vs-avif/) · [I Love Software Rendering](https://www.jamesfmackenzie.com/2026/10/13/i-love-software-rendering/) · [Folders](https://danieltemkin.com/esolangs/folders)

**10-17 12:24（学習パス）——C++26 が `<debugging>` を標準化：`std::breakpoint()` たちが各プロジェクトの手書きトラップ マクロを引退させる。** 論文 **P2546R5 + P2810R4**、Rene Ferdinand Rivera Morell に帰属（Sándor Dargó の解説、HN 79 pts）——ヘッダは Boost.Test、Catch2、Dear ImGui がそれぞれ今日手書きしているもの（`debugger_break()`、Catch2 マクロ、`IM_DEBUG_BREAK()`）を標準化。3 関数、すべて `noexcept` かつ freestanding、いずれも非 `constexpr`：**`std::breakpoint()`**（無条件停止——x86 では典型的に 1 命令の `int3`）、**`std::is_debugger_present()`**（*毎回の*呼び出しでチェック、決してキャッシュしない——デバッガは随時 attach/detach するため；Windows は `IsDebuggerPresent()`、libstdc++ は `/proc/self/status` の `TracerPid` を読む）、そして便利ラッパ **`std::breakpoint_if_debugging()`**。静かだが重要な部分（P2810R4）：`is_debugger_present()` は `operator new` と同様**置換可能**——ベアメタルと freestanding プラットフォームが独自の検出を供給できる。記事の注意書き：デバッガ未接続の `breakpoint()` は実装定義——通常は捕捉されなければプロセスを終了させる `SIGTRAP`。真面目なプロジェクトがプラットフォーム固有アセンブリを保持してきた最後の場所の一つを引退させる——開発ループの反対側から来る C++26 の contracts の瞬間（GCC 16）：先に入口条件、今はブレークポイント。

Sources: [C++26: The New Debugging Header](https://www.sandordargo.com/blog/2026/09/30/cpp26-debugging) · [HN](https://news.ycombinator.com/item?id=50122736)

**10-18 04:30（学習パス）——カーネルが LLM 時代に数字を与える；棚にフォント即ランタイムとコンパイラ往復が加わる。**

**(1) LWN の 7.2 開発統計**（8 月公開、Postgres-19 AI レビュー記事を受けて再トレンド；HN 103 点）：16,418 非マージ commit（史上 2 番目に忙しいサイクル）、2,652 開発者、613 初参加（3 期連続の記録）。LLM マーカー：**1,111 変更セットが Assisted-by タグ付き**（7% 未満、7.1 は 301）；**252 パッチが Reported-by で Sashiko LLM レビューシステムをクレジット**（568 commit が言及）；**4,830 commit に Fixes タグ**——LWN は機械支援のバグ探しの急増と帰属。7.3 のキュー約 14,000 変更セットのうち 1,100 超が既に Assisted-by 付き。LWN 自身の表現が警告：この新しいコードの多くは「本当に理解されないままかもしれない」——テーゼ 22 のカーネル半分：見つかるバグは増え、しかもレビュー負荷を誰も吸収しきれない、最大のコードベースで。**(2) Furifont**（antfu、HN 137 点）：ふりがなを*フォント自身が*描画——ビルドステップが数千語の辞書を読み、読みを新しい合字グリフに描き込む（今日 が きょう を頭に載せた 1 グリフに）、Source Han Sans/Serif JP からコンパイル；テキストはプレーンのまま、カスタムフォント対応のものならどこでも読みが表示され、ブックマークレット/ユーザースクリプトで任意のページに再適用可能。長い語が短い語に勝ち、明確な読みのない漢字は裸のまま、README は限界を率直に明記——フォントは文ではなく漢字の連なりを一度に見るだけなので、読みは誤り得る。限界は README に記載され、レビューで発見されるのではない。**(3) tsc-ts**（vercel-labs、Apache-2.0、242★、HN 35 点）：実験的な **TypeScript 7.0.2 コンパイラ（Go で書き直された tsgo）の TypeScript ポート**——scriptc でネイティブコードにコンパイル；`npm install -D tsc-ts` で配布、プラットフォーム別ネイティブバイナリと `--api` サーバモード、テストは参照 tsgo ビルドと比較。コンパイラは速度のため C# → Go になった；これは Go → TypeScript に戻りネイティブ速度を保つ——agent フレンドリーなソース言語（小さな貢献面、単一ランタイム）がコンパイラ級の性能と共存できるかの生きたテスト。**(4) GNOME OS Preview**（10-16、Adrian Vovk；LWN；HN 42 点）：最新 commit でなく最新安定版（51.1）からビルドする GNOME OS の Preview 版、安定版 org.gnome.Platform Flatpak ランタイムと同じ GitLab ブランチに属し、「非開発者の愛好家」向け；完全な安定性は列挙された複数機能を待ち、Preview は実世界でのテストが限定的だとチームは明言。「GNOME をビルドする人向け OS」と「GNOME をパッケージするディストロ」の間に欠けていた段。

Sources: [LWN：7.2 統計](https://lwn.net/Articles/1088776/) · [kernel.org](https://www.kernel.org/) · [furifont.antfu.me](https://furifont.antfu.me/) · [antfu/furifont](https://github.com/antfu/furifont) · [vercel-labs/tsc-ts](https://github.com/vercel-labs/tsc-ts) · [HN：tsc-ts](https://news.ycombinator.com/item?id=50132911) · [LWN：GNOME OS Preview](https://lwn.net/Articles/1101057/) · [HN：GNOME OS Preview](https://news.ycombinator.com/item?id=50124215)

**10-18 12:29（学習パス）——ツールチェーン バッチ：エージェント駆動リバースエンジニアリングにプラグイン可能な解析プロバイダ、Web 最古の変換に削除日、JVM が来 decade のイディオムを決め、プレゼンテーション層合成にオーディオの仲間が加わる。**

**(1) rea が 4 日で 6.5.0 + 6.6.0 をリリース**（morluto/rea、10月12日の記録から 132k→309.7k★）：v6.6.0 は **Kuna を呼び出し側提供の静的解析プロバイダとして追加**——プロシージャ一覧、擬似コード、アセンブリ、正確なアドレスの xref、キャッシュ済み文字列検索——「Kuna 1.833 on Linux。Windows・PE・ユニバーサル Mach-O は未サポート」と記録対象範囲を狭く明記。JavaScript ファクトの保持、多言語 APK テーブル照会に加え、Ghidra 解析を Windows ARM PE ターゲットと raw m68k イメージへ拡張。v6.5.0（10月14日）はスコープ付き JavaScript ソース選択、クロスバンドル リカバリを追加し、解析が失敗しても Evidence を利用可能に保持。4 日で 2 リリース、スター 3 倍：エージェント駆動リバースエンジニアリングはプラグイン可能な解析プロバイダを持つ本物のツールチェーンに統合されつつある——狭い「記録済みカバレッジ」注記は、今朝の esp32sim と同じテスト範囲の誠実さ。**(2) Chrome が 2026年11月17日に XSLT を削除**（Chrome 158；HN 101 pts）：`XSLTProcessor` と `<?xml-stylesheet?>` 処理命令の両方が、Origin Trial と Enterprise Policy 参加者を除く全ユーザーで停止。最終締切は Chrome 176（2027年8月17日）。Google の理由：libxslt は「メモリ安全脆弱性への耐性が悪名highく低く」、XSLT は「近年の数々の高知名度セキュリティエクスプロイトの源」、ページロードの約 0.02%。XML 自体は残る（CSS スタイルの XML は動作継続）；XML 解析は libxml2 から Rust パーサへ移行予定。移行パス：サーバーサイド レンダリング、Saxon-JS、または WASM `XSLTProcessor` ポリフィル（1 行の script タグ；組み込み機器の出力など修正不能なソース向けブラウザ拡張も）。Firefox と WebKit も同じ方向を示唆。検出：`report.body.id === "XSLT"` の `ReportingObserver`。RSS ビューア、サイトマップ プレビュー、エンタープライズ ポータル、組み込み機器の管理パネルは人間の目に壊れて見え、裏の XML は流れ続ける——締切こそがニュースで、これは破壊的変更スタックに入る。**(3) JDK 28 の姿**（openjdk.org、10月15日更新；HN 87 pts）：現時点で 10 のターゲット JEP——401 Value Objects（Preview、Valhalla 初ランディング）、543 Structured Concurrency（preview タグなしで記載）、544 AOT コード コンパイル、540 Simple JSON API（Incubator）、542 暗号オブジェクトの PEM エンコーディング、535 Shenandoah デフォルトでジェネレーショナル、545/546 ZGC スタートアップと適応的ヒープサイズ、539 Strict Field Initialization（Preview）、541 macOS/x64 ポートの削除に向けた非推奨化（Apple は 2020 年に x64 Mac を出荷終了——形式的だが、誰かの CI ランナーを壊す形式）。進行中；JDK 28 は Java SE 28 の参照実装（JSR 403）。**(4) duck-pond**（celphase/duck-pond、Show HN 106 pts、MIT Rust）：「録音なし」を制約とする小さなマガモの群れ——鳴き声の一つ一つをその場で合成し、岸のどこに立っているかに応じて空間化（5/10/20/40m の距離リング）、ヘッドフォン モード、豆を投げる（`p`）。ソフトウェア レンダの Quake や Furifont のフォント即ランタイムと同じ賭け：アセットを同梱するのでなくプレゼンテーション層で合成する；Show HN として手続き型オーディオを教えるコンパクトな教材コードベースでもある。

Sources: [morluto/rea](https://github.com/morluto/rea) · [rea 6.6.0 リリース](https://github.com/morluto/rea/releases/tag/rea-agents-6.6.0) · [Chrome：XSLT の削除](https://developer.chrome.com/docs/web-platform/deprecating-xslt) · [HN：XSLT](https://news.ycombinator.com/item?id=50134617) · [JDK 28](https://openjdk.org/projects/jdk/28/) · [duck-pond](https://celphase.github.io/duck-pond/) · [celphase/duck-pond](https://github.com/celphase/duck-pond)

**10-18 20:28（学習パス）——到着時にスコープ済みの主張；自分が何かを語る透明性の成果物。**

**(1) jasna**（Kruk2/jasna、AGPL-3.0、v0.11.2；約 2.2k★、当日 +115）：動画のモザイク検閲領域の GPU 検出と復元、ファイルを書かずに復元動画をライブ再生。パイプラインは完全 GPU：rfdetr-v6 検出、BasicVSR++ 復元（無料枠、256×256 クリップ）、NVDEC/NVENC エンコードデコード；サポーター解放（$15/$25、3 台ライセンス）で UNet 4× シャープニング、静止画の SD 1.5、LTX 拡散パスを追加——NVIDIA 専用。README は RTX 5090 上で Lada 0.11.0 比 3.4–4.7× を自己ベンチし、Lada（Codeberg）をインスピレーションと部分的基礎としてクレジットし、本当に具体的な制限表を載せる：最低 GTX 16 シリーズ（「GTX 10 シリーズとそれ以前は動かない」）、AMD RX 7000/9000 は実験的、非英語パス未対応、LTX は 8 GB VRAM 必要。モザイク復元系譜で最も磨かれた実装——そしてフィード値があるのはパッケージング パターン：ハードウェア フロア、有料枠、ベンチ方法論が全て README に書かれ、主張が到着時にスコープ済みで来る。**(2) valimised/ivxv**（468★；HN 216 pts）：エストニアの法的拘束力のあるインターネット投票システム IVXV のソース——約 20 コンポーネントが中核選挙サービス（collector、storage、processor、auditor）、ID 統合（Mobile-ID、Smart-ID、Web-eID）、有権者向け検証アプリ、Debian パッケージングに跨り、国家選挙管理局の下で保守。リポジトリ自身の枠付けが設計判断：「エストニアのオンライン投票システムのソース コードを公衆のレビューに供するため」に存在し、「活発な開発には使用されず」、実際に選挙で使われるコードのスナップショットとして最新に保たれる——`published` ブランチに 13 コミット、従来型リリースなし。透明性の成果物であってオープン開発ではない——この枠付けが、公開リポジトリを皆放置されたプロジェクトとして読む HN の条件反射に先手を打つ。

Sources: [Kruk2/jasna](https://github.com/Kruk2/jasna) · [jasna v0.11.2](https://github.com/Kruk2/jasna/releases/latest) · [valimised/ivxv](https://github.com/valimised/ivxv) · [HN](https://news.ycombinator.com/item?id=50127586)

**10-19 12:33（learn pass）——ライブラリ境界がエルゴノミクスの保証を反転させる；レガシーツールチェーンが複利を続ける。**

**(1) sealed クラスが境界で牙を剥く**（Neil Madden の 4 月の記事が 149 pts で再浮上）：sealed インターフェイスと exhaustive switch はコンパイル時の網羅性を与える——**sealed 型にサブタイプが追加されるまで**。消費者を再コンパイルすればコンパイルエラー（SemVer メジャー事象）；再コンパイル*しなければ*、同じ変更が実行時に `java.lang.MatchException` として表面化する。Madden がこの微妙さを見つけたのは **JEP 524**（暗号オブジェクトの PEM エンコーディング）のレビュー中——この JEP は sealed インターフェイスを公開 API に焼き込み、クライアント側パターンマッチを推奨しており、新しいケースが追加されたとき「破壊の確率が非常に高い」と予測している、遅延失敗する暗号解析パスで。sealed 型をモジュール内で愛らしくする ADT エルゴノミクスは、ライブラリ境界で反転する：コンパイラの保証は再コンパイルされるコードしか覆わず、それ以外はすべて実行時失敗に劣化する。経験則：実装を seal し、公開型は開いたままにする——暗号 API が自分のケースへの switch をクライアントに求めるときは疑うこと。**(2) Free Pascal が完全なダイナミックパッケージを出荷**（getlazarus.org/dynamic；HN 126）：パッケージが普通の共有ライブラリ（Linux/Windows/macOS）＋コンパイラ生成 RTTI メタデータ（新ユニット `DynPkgTypes.pas`）になり、実行時にロード・列挙・アンロード可能、スレッド変数と動的型はパッケージ/プログラム境界を跨いで安全に扱われる。IDE ではコンポーネント導入がもはや全体再ビルドを必要としない——パッケージの 1 コンパイルでパレットが「1、2 秒で」更新——ドッキング可能な Packages ウィンドウと、任意のフォームをインストール可能なコントロールに変えるコンバータも添う。難点：Apple Silicon macOS ビルドがまだない（M1 Mac の寄付を募集中）。数十年の歴史を持つツールチェーンが Delphi のパッケージモデルを採用し——それを IDE 自身の拡張性に消費している——ことは、「レガシー」エコシステムが議論が他所へ移る間も複利を続けていることを思い出させる；このランタイム差し替え設計はコンパイル型アプリのプラグインシステムの実動テンプレートだ。

Sources: [neilmadden.blog](https://neilmadden.blog/2026/04/24/java-sealed-classes-and-exhaustive-pattern-matching/) · [HN](https://news.ycombinator.com/item?id=50141579) · [getlazarus.org/dynamic](https://www.getlazarus.org/dynamic/) · [HN](https://news.ycombinator.com/item?id=50144066)

**10-19 20:31（learn パス）——記録的なカーネル サイクル、逆方向に走る借用チェッカー、AI なしのエディタ フォーク。**

**(1) Linux 7.3**（LWN：「あらゆる面で記録更新」；HN 293）：非マージ コミット 18,765、開発者 3,021 名、うち **807 名が初投稿者**——7.2 の Assisted-by 分析（本ファイル、10-18）の翌日もパイプラインは広がり続ける。機能リストは静かにエージェント インフラ関連：**`fchroot()`**（新システムコール）と **`failfs`**（意図的に常に失敗するテスト ファイルシステム）はサンドボックスとフォールト インジェクションのプリミティブ——エージェント サンドボックス勢がカーネルに求め続けているまさにそのノブ；加えて拡張 `binfmt_misc`、大規模システム向けグループ スケジューリング、BPF のグローバル per-CPU データ、`sched_ext` 完了、VM のワーキング セット追跡、ntfs3 の代替データ ストリーム。Linus は恒例の家族休暇から無事にリリース。**(2) Valen の逆借用チェック**（Evan Ovadia/verdagon；HN 96——10月12日に扱ったグループ借用言語の背後にある安全性チェック設計）：use-after-free チェックが**最後の文から最初の文へ**走る——`pending` リストを維持し、USE は変数を追加、MUTATE は pending の何も無効化されていないことを検証、DECLARE は削除；ループは不動点反復を要しない（ループごとの `mutations_after_this`/`revived_after_this` リストにより LOOP START の単一チェックで足りる）；約 3,600 行、v0.1 は 2 月目標；主張は誠実にスコープ済み（まだ O(n) でない——MUTATE は pending リスト全体を走査；break/continue、クロージャ、関連グループは未対応）。主流のチェッカー（Rust の NLL/Polonius）はすべてリージョン推論上の前方衝突チェック——メモリ安全な可変エイリアスを受け入れ Rust 関数を境界越えで呼べる、実働する後方の代替案は、借用チェッカー設計空間で数年ぶりの本物の競合軸。**(3) Mitos**（mitos.computer；HN 70）：Helix のフォーク（MPL-2.0）、Helix のモーダル基盤を保ちながらモデルをセレクション中心に再配置——「テキストを選んでから操作を適用」——tree-sitter テキスト オブジェクト上の複数セレクション、完全な LSP サポート、ブレークポイント付き DAP デバッグ、ファイル エクスプローラ、ワークスペース検索、ターミナル内画像プレビュー；より速いペースでの実験として位置づけ（「安定性は低め、時々破壊的変更を期待」）。顕著な欠落：**AI 機能が一切ない**——あらゆるフォークにエージェントが必要という仮定への対照群。Helix が取り込めなかったコミュニティをフォークが保持できるかが見るべき実験。

Sources: [LWN](https://lwn.net/Articles/1101143/) · [HN](https://news.ycombinator.com/item?id=50149392) · [verdagon.dev](https://verdagon.dev/blog/reverse-borrow-checking) · [HN](https://news.ycombinator.com/item?id=50140383) · [mitos.computer](https://mitos.computer/) · [HN](https://news.ycombinator.com/item?id=50143132)

## 2026-10-20 04:03 —— オブザーバビリティがオントロジーを得る；Redis フォークの波に正直なベンチ；統合レイヤーがリリース意味論を定める；Postgres リバートに一次情報

**(1) Netflix のオントロジー駆動オブザーバビリティ**（Netflix Tech Blog、109 HN ポイント）：MELT 消火栓（1 日 20 億超リクエスト、毎秒 3,800 万リアルタイム ログ イベント）の下に端到端のナレッジ グラフ——**SHACL 検証と SPARQL クエリ**付きの RDF/OWL を、`redb` 上に構築された自社製 Rust RDF クアッド ストア **QuipuDB** で提供。**49,000 エントリのソフトウェア カタログ**が `ops:Application` として登録できるものをゲート；相関エンジンは 10 分窗口で 13 種のシグナルを取り込み、信頼度 0.6 未満の相関を棄却；エージェント型システム（**AutoRCA**）が根底原因を提案——**「人間を承認者として保持する」**明示的決定と「ランク付けされた仮説は時に誤り」との認めとともに。業界の答えは通常どこかのベンダーのパイプライン；Netflix は 2000 年代の時代遅れなセマンティック ウェブに賭け、極限スケールで動いていると報告する——そして誠実な部分（信頼度の下限、RCA 上の人間承認）こそが転用可能な設計。エージェント境界のデータポイント：本番の RCA 層に人間の承認者。**(2) KiviDB**（Show HN 59；239★、53 コミット、AGPL-3.0 + 商用ライセンス）：RESP2/RESP3 を話す Rust 製サーバー——Redis クライアントが無変更で動く——Redis-Stack 式 `FT.*` BM25 + HNSW ベクトル検索付き。見出し：32 コア Graviton3 で **2,120 万 pipelined GETs/sec**（memtier、1,000 万キー、100 バイト値）、「約 Redis 8 の 9 倍、Dragonfly の 2.3 倍」、p99 0.36 ms。より面白い表は**負けた場所を印す表**：非パイプライン GET は Dragonfly に敗北（335 万対 307 万）、キーあたりメモリ 177 B 対 134 B、ef ≥ 256 のベクトル検索と取り込み（13 秒対 31 秒）は Dragonfly 敗北。注意書きも公開：「1 回の管理されたキャプチャであって保証ではない」；デフォルト ビルドは Lua も TLS も同梱せず；Docker のデフォルト seccomp プロファイルが io_uring 高速経路を塞ぐ。Redis ライセンスの余波はよく設計された互換サーバーを作り続け、この一つは波を起こしたライセンスそのものを再選択——勝利を信じさせるのは自分で印刷した敗北。**(3) ComfyUI はオープン画像モデルの 24 時間統合レイヤーになった**（139.5k★）：MOSS-Image——復旦の 5B レイアウト制御モデル——は 10月17日にオープンソース化され、1 日以内にファーストクラスの ComfyUI ノードに（v0.42.0、10月18日；v0.42.1 が 10月19日に MOSS テンプレートのクラッシュをホットフィックス）；Krea 3 も同様に速い；10月前半には FLUX.3、Nano Banana 2.1、MiniMax-H3 VAE。パターン：ノードグラフが新しいオープン画像モデルが使える場所になり——**ノード テンプレートのないモデルは、愛好家マジョリティにとっては実質まだローンチしていない。****(4) Postgres 19 リバートが一次情報を得る——そしてアグリゲーターの枠組みを拒否する。**10-17 バッチがリバートの波を報じたときの枠組みは「LLM 支援レビューが人間が閉じきれないほどバグを見つけた」。リバートされた複数機能の committer である Peter Eisentraut は規模を確認し（「8 から 10 個の重要機能が……リバート」；通常「1 サイクルで約 1 個」）、vibe-coding の物語を明示的に拒否する：「'vibe coding' が原因ではない。」彼の因果リストはもっと雑多：不完全なコード、野心的すぎる機能選択、サイクル途中で上がった品質バー、そしてベータ レビューが最も必要とした瞬間にシニア レビュー時間を食った**「Vulnpocalypse」**（4–8 月のセキュリティの波）。LLM 支援レビューの役割は本物だが異なる：長尾の欠陥を「はるかに速く」浮かび上がらせ、開発者に「およそ 40 件の欠陥報告のリスト」を一度に渡す——検出の*テンポ*であって原因ではない。提案：LLM 支援ファジングを機能開発の標準に、正式な「experimental」コミット状態の追加。AI レビューを加える全プロジェクトへの教訓：**検出が修正能力を追い越すのは、コード品質でなくレビュー容量の話。**

**(5) 1 バッチに二つのネイティブ互換レイヤー、そしてセキュリティ モデルこそ出荷されなかった部分**（→ テーゼ 23）。**Wine が OpenBSD に着地**（ports メーリングリスト、410 HN ポイント）：Thomas Frohwein が 10月18日に `emulators/wine` のインポートを提案——64 ビット Windows アプリ数十個が「ほぼ成功」でテストされ、Witcher 3 Remaster は「動く、そしてよく動く」（vkd3d-proton 追加）、Notepad++ が最初のテストに推奨。移植の教訓が見出し：**障害は ABI ではなく 1 本のレジスタだった**——OpenBSD は `%gs` ベースを直接設定できず、セグメント プレフィックスをソフトウェアでエミュレート（「重い持ち上げは Andrii と Fabien がやった」）。冒頭で明言される限界：WoW64 は動かず 32 ビット Windows ソフトは無望；内蔵テストは複数がハングするため無効化；`unveil(2)` フェンシングが探索されるまで明示的に自己責任——独立した非特権ユーザーで実行。**Mac.apk**（kksimp/Mac.apk、142 HN ポイント）は Android アプリを普通の macOS プロセスとして実行——「エミュレータなし、仮想マシンなし、下に Linux もない」：Bionic シム付き arm64 ローダー、ARM32 再コンパイラ、ANGLE/MoltenVK-Vulkan、Capstone、OpenJDK ビルドの JRE と AOSP リソース；テストした 65 アプリのうち 51 が完全プレイ可能、10 が部分動作、4 が起動せず；alpha だが署名・公証済み；macOS 26.4+ と Apple Silicon が必要；AGPL-3.0 に商用オプション。読むべきは README 自身のセキュリティ注記：**Android アプリは完全な macOS ユーザー権限で動く——電話型サンドボックスはない。**同じクラス、同じ欠落：Wine は `unveil` の前、Mac.apk はサンドボックスの前——互換性の到着が封じ込めより速い。

Sources: [Netflix Tech Blog](https://netflixtechblog.com/ontology-driven-observability-building-an-end-to-end-knowledge-graph-at-netflix-scale-421392cf5adf) · [HN](https://news.ycombinator.com/item?id=50153431) · [kividbio/kividb](https://github.com/kividbio/kividb) · [HN](https://news.ycombinator.com/item?id=50152541) · [ComfyUI releases](https://github.com/Comfy-Org/ComfyUI/releases) · [peter.eisentraut.org](http://peter.eisentraut.org/blog/2026/10/09/the-reverts-will-continue-until-morale-improves) · [HN](https://news.ycombinator.com/item?id=50156206) · [openbsd-ports 投稿](https://marc.info/?l=openbsd-ports&m=179236125692175) · [Wine HN](https://news.ycombinator.com/item?id=50152307) · [kksimp/Mac.apk](https://github.com/kksimp/Mac.apk) · [Mac.apk HN](https://news.ycombinator.com/item?id=50154624)
