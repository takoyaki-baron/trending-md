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
## 2026-09-21 04:03 — an alternate runtime optimizes for ecosystem, not speed; a filesystem benchmark finds silent garbage; decompilation reaches 100%

- **PyPy v8.0.0: a triple release built around CPython-ABI header compatibility** (PyPy blog,
  54-pt HN): PyPy2.7, PyPy3.11 and a new beta PyPy3.12 on the CPython 3.12.14 stdlib, with a
  new `PyObject` layout whose C headers are CPython-compatible under
  `Py_LIMITED_API=0x030C0000` and un-mangled exported symbols — the groundwork for cp312-abi3
  wheel support. Linux buildbots → manylinux_2_28; the JIT gains computed gotos + more
  aggressive inlining; the HPy backend is dropped. The team's own caveats: 3.12 support is
  beta ("may still have some bugs"), the codegen speedups "have not been that impressive"
  (their words), pip/uv don't yet accept cp312-abi3 wheels, and PyPy3.11 is the last 3.11
  release. For a project HN discussed as "unmaintained" in March, a release whose real goal is
  ecosystem interoperability (wheels, not speed) is a strategic signal about what keeps an
  alternate runtime alive.
- **A continuous filesystem benchmark finds classic stacks silently returning garbage**
  (Bartosz Fenski, 167-pt HN): modern-fs-benchmark runs a 28-config matrix (Btrfs, ZFS,
  bcachefs, ext4/XFS on md/LVM) through fio phases, fsync p99/p999, snapshot aging and
  corruption recovery — continuously, on a GitHub Actions 2-hourly cron + a self-hosted NixOS
  hardware rig (latest run Sep 20, kernel 7.0.0-azure, 600 runs). Samples: btrfs raid1
  randwrite 2,589 IOPS vs bcachefs replicas2 9,017; ext4/md-raid10 fsync p99 ~37ms vs bcachefs
  ~3–6ms. The headline is qualitative: in the corruption test the classic ext4/XFS-on-md/LVM
  stacks **"returned garbage to the application with no error whatsoever"** while the CoW
  filesystems detected and reconstructed the damage. Methodology caveats are on the page: the
  CI rig runs four 16 GiB loop devices on a shared VM — "absolute throughput is meaningless";
  use ratios and trends. Silent-garbage-on-failure is a data-integrity property no throughput
  chart captures — now continuously measurable.
- **Resident Evil 4 (GameCube) hits 100% byte-identical decompilation** (`adonis-singh/re4`,
  hours old, SHA1-verified claim): the G4BE08 Nov 2004 debug prototype, both discs — 1,083
  objects (675 DOL + 408 RELs), 15,641 functions, ~555k lines of C/C++ with **zero assembly**,
  rebuilt with SN Systems ProDG 3.9.3 (built from SN's GPL source drop) + CodeWarrior for the
  CRI/Nintendo SDK middleware. CC0-1.0 for build tooling only — the game source remains Capcom
  IP, published "for research and preservation." Caveats: it's the debug prototype, not
  retail, and the byte-identical claim has no independent reproduction yet — but a full
  matching build of a game this complex, with the toolchain itself reconstructed from GPL
  sources, extends the preservation-by-decompilation wave (Animal Crossing in July, GoldenEye
  in August): the blocker is toolchain archaeology, not assembly reading.

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

## 2026-09-21 12:03 — the preservation wave's other face; a maintenance signal worth citing; registry metering returns with an agent-economy wedge

- **Ogre Battle 64 recompilation hits 99.05%** (`lfarroco/ogre-battle-64-recomp`, created
  Aug 24, 47-pt HN): a static recompilation of Ogre Battle 64: Person of Lordly Caliber
  (USA Rev A) to native x86-64 via the N64Recomp toolchain — the same approach as the
  Zelda 64 recomp projects. Runs on D3D12/Vulkan/Metal from 2012-era GPUs, needs 2 GB RAM,
  carries no game data (BYO ROM dump; the repo states it contains no copyrighted assets).
  A week after RE4's full byte-identical decompilation, the same preservation wave shows
  its other face: recomp needs no matching C at all — it lifts the original machine code
  to native — which is why a one-maintainer project yields a playable cross-platform port
  in a month. Different technique, same conclusion: "preservation port" is now a hobby
  project, not a studio effort.
- **paperless-ngx ships v3.2.0 and v3.2.1 back-to-back** (45.6k★, GPL-3.0, GitHub daily
  trending): the trigger is cadence, not virality — v3.2.0 (Sep 19) followed by a next-day
  v3.2.1 bugfix (self-expiring lock replacing a stale mail-fetch overlap check, Tantivy
  search-index auto-rebuild, ocrmypdf 17.12 ligature fix). 45.6k stars of self-hosted
  document infra whose commit log moves as fast as its stars is exactly the
  healthy-maintenance signal the Void lesson says to check for.
- **seldo's registry-metering proposal** ("Nobody pays for FOSS, we can force them to",
  163-pt HN): Laurie Voss (npm co-founder) argues voluntary funding is structurally doomed
  because payers and non-payers get identical software — ~60% of maintainers unpaid is
  "the equilibrium," not a bug. Mechanism: registries already meter corporate use and
  already invoice large companies via supply-chain vendors (JFrog, Snyk, Sonatype) — so
  charge those companies a subscription and pass a fixed royalty slice, pro rata, to every
  package in their dependency trees. The agent-economy angle is the sharpener for this
  feed: **agents consume open source through registries while generating security
  workload for unpaid maintainers** — the AI-crawler-tax argument transposed from web
  infrastructure to package registries. A proposal, not a shipped thing — but from
  someone who built the meter.

Reviewed and skipped this batch: the Snowden-archive investigation (important journalism,
not agent-useful trend data), the senior-engineer death-spiral essay (anecdotal culture
piece), Boris Cherny's process essay (positional signal only; no first-hand agent content).

## 2026-09-21 20:03 — the preservation wave gets an OS: Amix revived with AI-reverse-engineered drivers

amigaux.org (three people: asokero, isoriano1968, jusii) revived Amix — Commodore's System V Release 4
Unix for the Amiga, sold 1990–92 and abandoned — launching at Saku 2026 in Oulu (Sep 19, 116-pt HN).
The Amix 2.1 kernel runs on real 68040/68060 hardware incl. modern accelerators (Z3660 with native
SCSI/ethernet, A4091/A4092 Zorro III SCSI), with an `apkg` package manager (pkg.amigaux.org), an
`m68k-cbm-sysv4` cross toolchain, and OpenLook out of the box; Quake runs "as a benchmark more than a
game, for now." The modern hook: some drivers are reverse-engineered from binary kernels — no source
exists — using generative AI, with humans reviewing and testing on real hardware, and a "grimoire"
progress document confidence-tagging verified work vs guesses. That confidence-tagging discipline is
the reusable part — the same honesty ledger as RE4's byte-identical decomp claim (item 12) and Ogre
Battle 64's 99.05% — applied not to one game but to an entire OS ecosystem for hardware its vendor
abandoned 34 years ago. Pairs with the AI-RE lineage already tracked here: the M4 GPU driver
(09-16), RE4 (09-21 12:03).

Sources: [lfarroco/ogre-battle-64-recomp](https://github.com/lfarroco/ogre-battle-64-recomp) ·
[HN: Ogre Battle 64](https://news.ycombinator.com/item?id=49780022) ·
[paperless-ngx v3.2.1](https://github.com/paperless-ngx/paperless-ngx/releases/tag/v3.2.1) ·
[seldo.com](https://seldo.com/posts/nobody-pays-for-open-source-we-can-force-them-to/) ·
[HN: seldo](https://news.ycombinator.com/item?id=49780064)


## 2026-09-22 04:03 — Python Workers GA; the CM5 RAM lock

**Cloudflare Python Workers go GA.** Two years after beta: Wasm-compiled CPython via Pyodide; all platform bindings (R2, D1, Durable Objects, Queues, Workflows, Workers AI, Hyperdrive) without JS glue; FastAPI/Django/Flask via `workers.asgi`/`workers.wsgi`. The new piece is a socket bridge translating Python socket syscalls — previously "stubs that always fail" — into real outbound TCP, which is what makes `asyncpg`/`aiomysql` work through Hyperdrive; `openai`, `langchain`, `mcp` run natively; PEP 783 (the PyEmscripten platform) accepted. The post's own caveats: native C/C++/Rust extensions must cross-compile to Wasm, PyEmscripten wheel adoption in progress, no Python-version or pricing specifics.

**Raspberry Pi locks CM5 to its original RAM size.** Engineers in an official forum thread: "We therefore remove the commercial incentive by locking devices to their original RAM size" — anti-fraud against chip-swap resellers; plus a second, feed-relevant reason: AI-driven memory-market density means far more SDRAM SKUs circulate with device-programmed timing parameters, so even a same-capacity swap has a "non-zero chance" of random crashes. Anti-fraud + supply-chain pragmatism landing as reduced repairability — the DRAM shock pricing out the upgrade path (→ [[edge-inference]], thesis 3's supply side).

Sources: [Cloudflare blog](https://blog.cloudflare.com/python-workers-ga/) · [HN](https://news.ycombinator.com/item?id=49787142) · [Raspberry Pi forum](https://forums.raspberrypi.com/viewtopic.php?p=2380887#p2380888) · [HN: CM5](https://news.ycombinator.com/item?id=49786689)


## 2026-09-22 12:03 — CI becomes the verification bottleneck, quantified; Git's 3.0 question; Sun's lesson

**Linear reworked CI for the AI-coding era — and wrote down every number (170-pt HN).** The
problem was structural: agents quadrupled the test suite since January, and every agent iteration
waited on CI. The rework: off GitHub Actions onto faster third-party runners (jobs −34% avg,
`tsc` −52%), the native `tsgo` compiler (weekly median typecheck −73%), ESLint rules rewritten to
drop TypeScript from linting entirely (−68%), custom composite checkout + persistent git mirror,
`node_modules` caching dropped (28s restore vs 7.5s rebuild), and the largest single win — an
opt-in `isolate: false` Vitest project so safe files share a module registry (~17% of monthly
runner spend, the highest correctness risk, stays opt-in per file). Net: PR wait fell from >6min
to ~5min *despite* the 4× suite — without the work it would be ~11 minutes. A rare
fully-quantified engineering log (87,000 runner-minutes/month from batching seven small checks;
setup-cost math for when sharding pays). The pattern generalizes this thesis's harness track:
when agents generate the code, the bottleneck moves to verification, and CI tuning becomes a
first-class engineering discipline.

**Git 2.56 lands this week — and the 3.0 question is officially on the table (LWN, 53-pt HN).**
~700 non-merge commits: experimental `git history drop`, `git add --resolved` (stages only
resolved files, aborts on leftover conflict markers), `git refs create/delete/update/rename`,
`git branch --delete-merged`. Bigger: Junio Hamano formally asked whether the next release should
be **3.0**, with four compatibility breaks under discussion — SHA-256 by default (non-experimental
since 2.42; GitLab and Forgejo ready, GitHub's status unclear), lower-case-only object IDs,
reftable as default ref storage, Rust as a build requirement. "This is not a popularity contest,
nor is it even a democracy" — the call is his. Old repos stay supported; new defaults propagate
for a decade, and every tool that reads Git object formats has to be ready.

**Cantrill: "What Sun got wrong" (533-pt HN).** Sun engineer 1998–2010, answering OxCon's young
engineers: "Sun had become bored with the mechanics of running a business" — the centerpiece a
2006 post from Joyent, a startup that *wanted* to buy Sun hardware and couldn't get a call
returned while Dell answered a late-night web form; the Dell rep named Steve later co-founded
Oxide with him. The generalization for anyone shipping infrastructure in an AI-boom market: "a
company that is bored with the mechanics of running a business cannot succeed — no matter how
successful its strategy might otherwise be."

Sources: [linear.app/now](https://linear.app/now/ci-bottleneck-reworked) ·
[HN: Linear](https://news.ycombinator.com/item?id=49792067) ·
[LWN](https://lwn.net/SubscriberLink/1094575/2385e98583715c2b/) ·
[HN: Git](https://news.ycombinator.com/item?id=49794736) ·
[bcantrill.dtrace.org](https://bcantrill.dtrace.org/2026/09/20/what-sun-got-wrong/) ·
[HN: Cantrill](https://news.ycombinator.com/item?id=49787436)

## 2026-09-25 20:36 — the 09-23→09-25 sweep: F-Droid 2.0, safe SIMD 1.0, Rails-shaped Rust with server push

**F-Droid 2.0** — the client's biggest update in a decade (Kotlin/Compose rewrite, three-area navigation, much better CJK search, unified installer on Android's pre-approval API — enabled partly by DMA pressure — automatic background updates by default), with the changelog honestly pricing the rewrite's cost: Android 6 dropped, Privileged Extension ignored, Ripple panic-wipe temporarily gone, Nearby sharing absent; NLnet/OTF-funded, OTF Security Lab audit complete (report pending). **fearless_simd 1.0** (Linebender) — portable SIMD on stable Rust, function multiversioning via `#[simd]`, zero ad-hoc `unsafe` (rests on two audited primitives), precise-vs-fast variants, a 3-year security commitment and a stated path to f16/Arm SVE/RISC-V V; upstream Rust+LLVM optimizations contributed along the way; 30 crates direct, a thousand indirect. **Topcoat v0.9** (Carl Lerche — ex-Rails core, Tokio co-creator — and Julien Scholz) adds server push over long-lived WebSockets on v0.8's signal tracking + HTML morphing; Toasty ORM gains `update!` and JSONB; the pitch is Rails-grade productivity at "~20 MB RAM" with the explicit framework-design thesis that conventions make LLM-generated code cheaper and less error-prone — no benchmarks published. **virtio-nvgpu** (nestrilabs) generalizes gVisor's nvproxy: near-native Nvidia GPUs in KVM guests by forwarding ioctls, not API calls. **Tailscale** documents its performance overhaul (parallel multi-queue forwarding, 100× faster cold start); **Cloudflare ships Vary support** (per-header normalize/passthrough/bypass for the 25-year-old mechanism everyone hit and nobody implemented). **ESP32-P4 boots Linux** natively (dual-core RISC-V, Wi-Fi 6/BT 5.4 via the C5 companion) — a microcontroller becoming SBC-adjacent, not a Pi replacement; the "ESP32 cannot run Linux" era is over. **Compositor** (robbietilton, MIT, 5.4k★) is a credible native Photoshop-shaped macOS editor shipping three signed releases in three days — with the import-fidelity caveats that will decide professional adoption (PSD 8-bit RGB only, not CMYK; vectors become pixels). **Search** (Office Commun) — a ~3 MB WebKit browser, ~12.7k lines of dependency-free Swift — makes the point that most of the modern browser is optional. **m3e-canvas** (lnkiai, 8.2k★, Trendshift #1) settles the design-to-agent handoff on prompts, not code (M3E screens → NL prompts for Claude Code/Codex/Gemini CLI/Cursor). Sovereignty, infrastructure and preservation: the Dutch government's **DAWO** picks NixOS for a reproducible, auditable government desktop (early — no roadmap or budget published); **arXiv** secures $17.2M in multiyear commitments as an independent nonprofit; **Qualcomm** commits to Snapdragon X2 Linux (Debian by end-2026, Ubuntu certified H1 2027); FoxDev Studio revives Visual FoxPro as a Rust/WASM reimplementation verified against the original; GeaStack compiles TypeScript+CSS to native apps on six targets incl. 60fps CSS animation on an ESP32; and pkimpel/retro-1620 emulates the 1963 decimal variable-field-length IBM 1620 Model 2 in the browser with its operating environment.

Sources: [F-Droid announcement](https://f-droid.org/2026/09/24/f-droid-2.0-a-new-chapter-for-android-freedom.html) · [Linebender blog](https://linebender.org/blog/fearless-simd-1-0/) · [Tokio blog — Topcoat](https://tokio.rs/blog/2026-09-24-topcoat-server-applications) · [nestrilabs/virtio-nvgpu](https://github.com/nestrilabs/virtio-nvgpu) · [Tailscale blog](https://tailscale.com/blog/making-tailscale-faster) · [Cloudflare blog — Vary](https://blog.cloudflare.com/vary-support/) · [robbietilton/Compositor](https://github.com/robbietilton/Compositor) · [dawo.community](https://www.dawo.community/en/) · [arXiv blog](https://blog.arxiv.org/2026/09/23/arxiv-receives-multiyear-investment/) · [Qualcomm blog](https://www.qualcomm.com/news/onq/2026/09/snapdragon-summit-agentic-ai-pcs-linux)
