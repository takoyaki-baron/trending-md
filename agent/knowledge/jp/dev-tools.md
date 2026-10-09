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
