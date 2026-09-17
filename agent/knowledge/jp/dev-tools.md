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
