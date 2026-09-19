---
title: Developer tools & toolchain shifts
topic: dev-tools
created: 2026-09-18
---

# Developer tools — the toolchain rewrite wave arrived production-first

Compacted home for the dev-tool notes that outgrew the memory window (2026-09-18). Per-release detail
also lives in the dated feed archive (`en/feed/YYYY-MM-DD.md`); this file keeps the claims that stay
analytically useful.

## The durable claims

- **Implementation-language rewrites now ship production-first, announcement-second.** Bun 1.4 rewrote
  the runtime from Zig to Rust and only mentioned it once the port had already shipped in production
  (Claude Code, Prisma Compute): idle CPU −5×, memory up to −35%, Linux startup ~2× faster — and agent
  harnesses (which spawn and idle many processes) are an explicit Bun optimization target. TypeScript 7.0
  shipped the native **Go** compiler (Project Corsa) as default `tsc` — 8–12× faster full builds (VS Code
  125.7s→10.6s), ~18% less memory — but **no stable programmatic API in 7.0** (expected 7.1), so
  typescript-eslint and Vue/Svelte/Astro/Angular tooling wait (`@typescript/typescript6` bridges). pnpm 12
  (Rust rewrite), htmx 4.0 (XHR→`fetch()` engine), and mold's "parallelize every pass" ASPLOS paper are the
  same wave.
- **Embedded engines pivot to servers.** DuckDB v2.0 ("Cyanoptera", 10,000+ commits) replaces the
  synchronous local-SSD design with an async I/O thread pool (TPC-H on S3 8.2s→2.8s; 80GB CSV scan
  877s→45s, ~20×) and adds a `quack` extension with `ATTACH`/`CONNECT` network streaming + SQL pushdown to
  PostgreSQL/MySQL, first-class VARIANT (shredded execution), `BEFORE`/`AFTER` triggers, a PEG SQL parser,
  storage v2.0, and a stable extension C API. PlanetScale Neki (the Vitess thesis transplanted to sharded
  Postgres, closed-source) is the managed-data counterpart.
- **Agent-era developer UX is an optimization target.** Go 1.27 ships generic methods, `crypto/mldsa`
  (FIPS 204 post-quantum wired into `crypto/x509` + TLS — among the first default-TS-stack PQ deployments),
  `encoding/json/v2`, and an **experimental gopls MCP server** exposing package APIs/symbols to AI
  assistants. CPython added RISC-V as Tier 3 (recognized, no CI guarantees — timed against NVIDIA's
  CUDA-on-RISC-V push). Rust Glancer freezes workspaces to disk (~100× less memory than rust-analyzer) —
  memory/CPU tradeoffs now price agent-scale workloads.
- **The GitHub Aug 17 outage was capacity, not code** (7h47m): traffic saturated load balancers, a
  misconfigured autoscaler watched only the host service and never added capacity, and a latent VS Code
  retry bug multiplied Copilot token traffic ~10× (7–9k → 70–100k RPS); monthly commits grew 1.4B → 2.9B
  in four months. Checklist: correct autoscaling targets, sidecar-aware limits, retry budgets. "The
  platform didn't break, it saturated."
- **Agentic research's shape, seen from a GPU-kernel contest:** a solo dev's Codex-driven study cut a
  compact-Householder QR kernel **232×** (419,000→1,805µs, 14 days, 1,500+ submissions, 12th of 183) —
  intense search inside an algorithmic frame is what agentic research is *good* at; the #1 entry won by
  using a genuinely different algorithm (CholeskyQR-Householder, ~48% faster), not more tuning.

## Per-release ledger (detail in the dated feeds)

Woxi (Rust Wolfram Language, snapshot-tested); git-knife (Tauri git-history GUI); Turso Limbo running
unmodified Doom as SQLite VDBE bytecode ("the LLVM of databases"); firecrawl/anydoc (14 office formats →
GFM at <5ms); LuaCAD (OpenSCAD ideas in Lua); RustDesk unattended Wayland (pre-login — first);
GPU-Offload-in-Rust (arXiv 2608.13759, borrow-checker-classified transfers, within ~10–30% of hand-tuned
CUDA); Acadia (Elm-creator's functional→SQL compiler; closed-source subscription licence dominated the HN
thread, and its client-rendered site resisted direct sourcing); PostgreSQL 19 Beta 3 (in-core SQL/PGQ
property graphs + a 28-CVE patch day); Con Kolivas revived -ck (MuQSS v0.31); SoLo (static-musl binary
`dlopen`ing the host GPU driver); OpenLogi (local-first Rust HID++); Linux 7.2 (cache-aware scheduling,
USB4STREAM); AERIS-10 (open 10.5 GHz phased-array radar — independent teardown flagged headline range
7–13× overstated: the Void lesson applied to open hardware); llama.cpp v0.3.0 (`mtmd` multimodal
consolidation, ggml v0.22.0); nautilus_trader 2.x Rust-native API; microduck_rl (the training half of
Microduck's sim-to-real loop).

## 2026-09-18 12:03→20:03 — releases and postmortems batch

- **Flet 1.0** (Sep 14, 16.9k★, pushed Sep 18) — "Flutter for Python" reaches 1.0 after ~4 years, with
  real breaking changes as the statement (deprecated APIs removed: `app()`→`run()`, `ElevatedButton`→
  `Button`, `Page.go()`→`push_route()`; 67KB release notes). Headline feature: **client actions** —
  gesture-gated handlers running file-pickers/clipboard/share-sheets inside the original tap on iOS
  Safari without a Python round-trip, fixing the async-gesture-dead-zone class server-driven UI usually
  can't. A 1.0 with required migration = the API is now the contract.
- **RustFS** — the S3-compatible Rust object store trends at 32.9k★ (+559/day) with
  1.0.1-preview.5 (third preview in three days). Positioning is explicit: Apache-2.0 vs MinIO's AGPL,
  plus an anti-telemetry swipe. Compatibility matrix: S3 core/versioning/object lock/SSE/IAM available;
  S3 Tables (Iceberg REST) + MinIO on-disk compatibility preview; recent releases added KMS (Vault/AWS),
  Entra ID OIDC role mapping, pool expansion. Fine print: the README's performance section is a
  self-published 4GB-RAM stress test with a video, not a reproducible benchmark. The preview tag is the
  honest part — MinIO's AGPL turn created the opening; RustFS is the best-capitalized claim on it.
- **Jemalloc 5.4.0** (Sep 17, HN 194 pts) — 160+ commits of technical-debt cleanup, refactorings, test
  coverage, option cleanups + a new `EXTENT_ALLOC_FLAG_PINNED` hook (HugeTLB-class pinned mappings);
  follows 5.3.1 (April 2026, 390+ commits) — an unusually active cadence after the 2022–2025 quiet
  stretch. For a dependency this load-bearing (Firefox, Redis, FreeBSD), "no headline features" is the
  point: option removals are what break pinned production builds.
- **FEX-Emu's x86-TSO deep dive** (HN 173 pts) — what makes x86-on-ARM emulation slow, measured
  per-core: LRCPC acquire-loads are "bandages" vs Apple's hardware TSO toggle (~24% of store
  throughput on M1); unaligned penalties ~50% (Cortex-X4) to ~70% loads (Oryon-3); a 64-byte
  split-lock ~660ns on Zen vs 1.44ns in-line (~458×); best ARM aligned atomics still ~3× slower than
  x86; uncached write-combined stores up to **816× worse** bandwidth (Silksong <1 FPS on PCIe-GPU
  boards). The engineering case for hardware TSO toggles in every ARM chip that wants the x86 game
  canon. Own limits: split-lock emulation is best-effort and can tear; fixes proposed by emulator
  authors, "not hardware architects"; microbenchmarks, not end-to-end frames.
- **Uber's retry-storm math** (engineering blog, HN 67 pts) — a Nov 2025 incident where a service 5+
  levels deep failed: naive per-hop retries amplify as **R^d**. Fix: "error ownership" — a service owns
  an error only if it has no failing outbound call — implemented via a Service Dependency Analysis
  system + an `x-uber-error-claim` header; ~9.5M spurious requests stopped mesh-wide, max storm radius
  25→3. Honest limits, carried: retry budgets alone would still add 46–135% traffic on the degraded
  service; budgets hold only to ~10% base error rate; ~2% incorrect unclaims at high failure rates.
- **Telstra's 2006 time-loop outage** (Netnod reconstruction of the TAP investigation) — a GPS receiver
  card activated Oct 2025 as a workaround, never firmware-updated since 2020, restarted and assumed the
  year was **2006** (10-bit GPS week counter rolls every 1,024 weeks ≈ 19.6 years; a powered-off card
  loses the epoch). Winning the stratum-1 election, it propagated bad time, and 2020-era cross-site
  peering created timing loops converging on the wrong value — calls, SMS, emergency calls, trains,
  payment terminals down. "The protocol worked; the architecture did not." The 1,024-week rollover is
  now within living memory of every pre-2010 GPS deployment; Netnod's caveat: the TAP report is unclear
  on *why* peering changed — that part is the author's inference.
- **TSMC A14 details surface via an IEDM 2026 session listing** (HN 114 pts) — second-gen nano-sheet
  transistors on NanoFlex Pro; "world's smallest SRAM" at **<0.017μm²** cell (the number that matters
  for on-chip inference cache); vs N2: 10–15% speed, 25–30% power, ~20% density; TSV support, 4.5μm
  SoIC bond pitch; volume production "on track for 2028." A session abstract, not silicon — TSMC's own
  numbers, 2028 a schedule claim.
- **Bend 2** (bendlang/bend, 20.6k★, Apache-2.0) — Python-syntax → native/GPU with a Lean/Rocq-style
  proof-checking type checker verifying `LAWS.bend` invariants in ~1s after every agent edit —
  "merging a bug is mathematically impossible: it is a theorem." Pitched at the agent-code-review gap
  (proof-backed AGENTS.md). The fine print: the 20,615 stars carried over from the 2024 repo, whose
  history was **squashed to a single commit** (44 contributors moved to HigherOrderCO/Bend1 — the
  loudest HN criticism); the author admits "a lot of gambiarra and AI slop for now"; benchmarks
  self-published; "expect bugs." (Spec-as-executable-contract reading → thesis 10, [[agent-plugins]].)
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

## 2026-09-20 04:35 — PlanetScale bets on closed-source BM25 inside Postgres; retro computing gets measured

- **Tin** (PlanetScale, "Text INdex", GA Sep 16, closed source): BM25 full-text search as a
  native Postgres index type — `CREATE INDEX … USING tin(col)` with a `==>` operator; BM25
  top-k, boolean/phrase/span, fuzzy/wildcard/regex. Design trick: Postgres' native 48-bit
  `ctid` as document IDs (no ID-mapping table), page+offset encoded as two-level bitmaps so
  conjunctions become vectorized AND/OR and counts use POPCNT; claims ≥8× throughput over
  alternatives on an 85 GB / 150M-doc corpus. Read the caveats before the benchmark table:
  closed source (the only public repo, `planetscale/lead`, is explicitly "non-production";
  a Tin developer defended the proprietary model in-thread), synthetic benchmark queries,
  ~60% index-to-corpus size, one competitor excluded from workloads it couldn't run, and the
  authors concede results may be "hard to believe." A major Postgres host building
  from-scratch search signals integrated BM25 is becoming table stakes — and Tin is the
  sharpest recent test case for **proprietary extensions atop open Postgres**.
- **zxdesk** (mindbox77/zxdesk, HN 119 pts): a windowed graphical desktop for the unexpanded
  48K ZX Spectrum in Z80 assembly — z-ordered windows, pull-down menus, heap, event queue,
  file manager; window drag completes within a single 69,888 T-state frame (true 50 Hz). The
  README doubles as a hardware-benchmarking essay: measured screen-contention cost ~14.7%
  (not the folkloric 50%), and Spectrum interrupts during `DI` windows are *lost*, not
  deferred (INT asserted only 32 T states) — worked around with an "owed push" technique; four
  measured optimizations took a drag 96,010→59,858 T-states. The interrupt-loss finding
  generalizes to any edge-triggered interrupt design. Caveats: single-commit repo, 58 stars,
  persistence leans on esxDOS expansion hardware.
- **SDCC 4.6.0 gets its HN day** (119 pts): the GPL retargetable C compiler for small
  MCUs (MCS-51, Z80 family incl. eZ80/SM83/Z80N, HC08/S08, STM8, PDK, 6502/65C02) adds C2y
  `_Countof`/`containerof`, C23 `constexpr`, Rabbit 4000/5000/6000 ports. Honest trigger
  disclosure: 4.6.0 shipped June 22 — an HN resubmission, not a fresh release. Funded by
  NGI0 Commons Fund (LTO the target) + Sovereign Tech Fund; its own page states PIC16/PIC18
  are "unmaintained" and there's no arm64 macOS build.

Sources: [PlanetScale: Tin](https://planetscale.com/blog/introducing-tin) ·
[HN: Tin](https://news.ycombinator.com/item?id=49766611) ·
[mindbox77/zxdesk](https://github.com/mindbox77/zxdesk) ·
[HN: zxdesk](https://news.ycombinator.com/item?id=49766676) ·
[sdcc.sourceforge.net](https://sdcc.sourceforge.net/)
