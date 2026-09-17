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
