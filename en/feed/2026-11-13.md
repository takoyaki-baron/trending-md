---
date: 2026-11-13
updated: 2026-11-13T12:28:15Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 29
license: CC-BY-4.0
---

# trending.md — 2026-11-13

## 1. Jensen Huang resigns as Nvidia CEO — Colette Kress takes over as interim, stock opens down 13%

- **Velocity:** ▮▮▮ trending
- **Source:** CNBC live blog · 2,156+ pts on HN · 6.2h ago (~21:50 UTC+8)
- **Tags:** `nvidia` `industry` `leadership`

Since we covered the WSJ removal report in yesterday's feed: it happened. Jensen Huang — who co-founded Nvidia 33 years ago and built it into a $4-trillion company — resigned as president, CEO and board member on **Nov 12**, a day after the NYT reported an affair with VP Kimberly Powell and hours after Reuters cited a second relationship. The board named **CFO Colette Kress interim CEO** (she keeps the CFO role) and appointed **Harvey C. Jones** — a director since 1993 — as Nvidia's first-ever board chair. NVDA opened down **over 13%**, dropping below $4T in market cap, with more than $740B shed since Friday's close; Q3 earnings remain scheduled for **Nov 17**. The board hired Wachtell Lipton to investigate the intelligence allegations (Huang hired Paul Weiss), and House Foreign Affairs Chair Brian Mast said Huang "has agreed to come" testify before Thanksgiving.

**Why it matters:** The CEO of the company the entire AI buildout is financed through is now gone, three days of reporting turned into a resignation in under 24 hours, and the near-term calendar (Nov 17 earnings, Congressional testimony) now doubles as a stress test of whether Nvidia's momentum was the roadmap or the person. Kress running both CFO and CEO is the interim detail to watch.

> "The Board has full confidence in Colette and the leadership team." — Harvey C. Jones, Nvidia's first board chair

[`🔗 CNBC: Nvidia CEO Jensen Huang resigns — live updates`](https://www.cnbc.com/2026/11/12/nvidia-jensen-huang-ceo-live-updates.html) · [`🔗 Reuters live`](https://www.reuters.com/live/nvidia-live-board-meets-fate-ceo-jensen-huang-after-affair-reports-2026-11-12/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50467087)

---

## 2. Gemini 4 Hydrogen ships — Google's fast everyday model for agentic workflows, with a new xhigh thinking level

- **Velocity:** ▮▮▮ trending
- **Source:** blog.google · 305+ pts on HN · 2.0h ago (~02:00 UTC+8)
- **Tags:** `gemini` `model-release` `agents`

Google released **Gemini 4 Hydrogen** (Nov 12), positioned as the fast everyday model alongside frontier siblings Carbon and Argon: 1M-token context with **flat pricing** ($1.50/M input, $7.50/M output), four thinking levels (low/medium/high/**xhigh**, the new one), and availability across AI Studio, the Gemini API, Antigravity, the Gemini app and Google Search. Numbers: **51** on the Artificial Analysis Intelligence Index at high (54 at xhigh, vs Argon's 50), **57%** on Terminal-Bench 4.1 vs 18.2% for Gemini 3.8 Flash, fabricated claims cut >5×, and an Orchestrator mode in Antigravity that hits near-Carbon Terminal-Bench success "consuming 24% less quota and completing 19% faster". The safety table claims overreach down up to 81%, misaligned actions down 12×, and a 96.7% agent honesty rate over "more than 200,000 audited turns".

**Why it matters:** The release is explicitly hedged — it "matches or outperforms some of the competing models in its class", and the 2.5× speed and token-savings figures come from partner "early testing" — so read it as a strong agentic-workhorse refresh, not a frontier jump. The flat 1M-context pricing and the xhigh setting are the parts developers will actually feel.

> The announcement positions Hydrogen as Google's everyday workhorse for agentic workflows, alongside the frontier siblings Carbon and Argon.

[`🔗 Google: Introducing Gemini 4 Hydrogen`](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-hydrogen/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50471431)

---

## 3. "Why Writing Correct Software Is Hard" — a 2016 complexity-theory essay tops HN a decade later

- **Velocity:** ▮▮▮ trending
- **Source:** pron.github.io · 314+ pts on HN · 9.6h ago (~18:25 UTC+8)
- **Tags:** `correctness` `complexity` `formal-methods`

Ron Pressler's 2016 essay (extended version presented at Curry On 2016) resurfaced to 314 points: correctness is not hard because we lack tools, but because computability theory makes it hard — bounded halting is Θ(n) ("you can't know what a program will do faster that running it" [sic]), general verification is the hardest problem in CS, and restrictions don't help (total languages stay Ω(|S|), symbolic model checking stays PSPACE-complete, and a 2005 parameterized-complexity result shows "correctness doesn't decompose"). The concrete anchors are memorable: a 1,919-state Turing machine whose termination is independent of ZFC (≈100–200 lines of Python), a 10-line total program that crashes iff Goldbach's conjecture is false, and a 2014 Toronto study where 92% of catastrophic distributed-systems failures came from mishandled non-fatal errors.

**Why it matters:** The essay reads differently in 2026 than in 2016: it is the theoretical case for why delegating the writing to an agent does not remove the wall — verification cost doesn't vanish when the code's author changes. Its conclusion is still the right one: no universal mathematical fix, just empiricism about the programs and bugs humans (and now agents) actually produce.

> "There does not exist a generally useful programming language where every program is feasibly verifiable."

[`🔗 pron.github.io: Why Writing Correct Software Is Hard`](https://pron.github.io/posts/correctness-and-complexity) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50465352)

---

## 4. Rust 1.100.0: `!` (never type) and custom allocators stabilize — the 100th minor release

- **Velocity:** ▮▮ rising
- **Source:** rust-lang/rust · 285+ pts on HN · 1.7h ago (~02:20 UTC+8)
- **Tags:** `rust` `release` `language-design`

Rust's round-number release (Nov 12, 5,340 commits since 1.99) stabilizes two long-running sagas: **never type `!`** (with `Infallible` becoming a type alias to `!`) and **`extern "custom"`**; on the library side, **custom allocators land** — `std::alloc::Allocator`, `Global`, `System`, plus `Box::new_in`, `Vec::new_in`, `Vec::allocator`, and `Box::map`/`Arc::map`/`Rc::map`. Cargo gets its own lint table (`[lints.cargo]`, e.g. `cargo::unused_dependencies`) and **dependency cooldowns** — a minimum publish age per RFC 3923, a supply-chain answer. Platform notes: `wasm32-wasip3` promoted to Tier 2, a new Tier 3 `powerpc64-sony-ps3` target, `i686-pc-windows-gnu` demoted to Tier 2 without host tools, and the stdlib moves to Unicode 18.

**Why it matters:** `!` and the `Allocator` API were design constraints felt across the whole ecosystem — their stabilization removes a decade of `#[feature]`-gated workarounds and unlocks allocator-generic containers in stable Rust. The cargo cooldown lint is also a quiet signal: package-age checks are becoming a first-class supply-chain tool, not a CI hack.

[`🔗 Rust 1.100.0 release notes`](https://github.com/rust-lang/rust/releases/tag/1.100.0) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50471793)

---

## 5. Microsoft 365 outage takes down Outlook, Teams, SharePoint, Copilot — and the status page itself

- **Velocity:** ▮▮ rising
- **Source:** mailservices.isc.upenn.edu (MS incident extract) · 262+ pts on HN (Ask) · 1.8h ago (~02:15 UTC+8)
- **Tags:** `outage` `microsoft-365` `exchange-online`

An ongoing incident wave hit Microsoft 365 on Nov 12: **EX1550543** (Exchange Online mailbox connectivity via Outlook on the web, MAPI, EAS and REST) opened at **16:17 UTC**, and **MO1550821** followed at **18:26 UTC** — "Users may be unable to connect to multiple Microsoft 365 services", potentially impacting Exchange Online, Teams, SharePoint, **Copilot 365 and Defender XDR**. Microsoft's updates blame the failed health checks on "a specific component on the affected servers", alongside "elevated processor usage while handling requests"; it "paused all deployments and configuration changes" after load rose from "a large number of servers being unexpectedly unavailable." HN's Ask thread (262 pts) and a second front-page post note the service-health dashboard itself was flaking; the incident was still `serviceDegradation` at feed time.

**Why it matters:** The scope (mail + meetings + docs + Copilot + XDR at once) and the mode (health-check failures on a subset of servers, deployments paused) read like the same fleet-consistency class as last week's GitHub incidents — and a degradation that takes the status page down with it removes the one channel users are told to trust.

[`🔗 UPenn: Microsoft incident extract (EX1550543, MO1550821)`](https://mailservices.isc.upenn.edu/computing/email/penno365/alerts/ms-incidents.html) · [`🔗 CRN: Outage hits Outlook, Defender, Purview`](https://www.crn.com/news/cloud/2026/microsoft-outage-hits-outlook-defender-purview-day-after-teams-issues) · [`🔗 HN Ask: Microsoft/Azure outage?`](https://news.ycombinator.com/item?id=50471668)

---

## 6. Apple turns MIPS into a learned support function — RAG retrieval up to 8× faster at 99% recall

- **Velocity:** ▮▮ rising
- **Source:** machinelearning.apple.com · 229+ pts on HN · 27.1h ago (~00:55 UTC+8 Nov 12)
- **Tags:** `rag` `retrieval` `research`

Apple's ML research post (Nov 5, ICML 2026 paper "Amortizing Maximum Inner Product Search with Learned Support Functions") makes a mathematically clean observation: maximum inner-product search — the core operation of vector-database retrieval — is a convex **support function**, so a small neural net can be trained to predict it directly. Two architectures fall out: **SupportNet**, a router that scores clusters by their best-achievable match rather than centroid distance, and **KeyNet**, a query rewriter that predicts the best-matching key vector and steers a standard FAISS IVF index toward it. On Natural Questions (~2.6M passages), KeyNet reaches **99% recall up to ~8× faster** (0.23 ms vs 1.8 ms) or scans ~11× fewer keys; SupportNet hits 95% routing recall ~1.9× faster than centroid routing.

**Why it matters:** This is a third option between "brute force" and "approximate index" — amortize the search into a learned function trained on your own query distribution. The catch is in the setup: the networks are trained per-database and per-query-distribution, so it shines for the huge, stable corpora RAG runs on and degrades where the corpus churns. No code release is mentioned.

[`🔗 Apple ML: Faster Retrieval for Better, More Efficient RAG`](https://machinelearning.apple.com/research/faster-retrieval) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50455633)

---

## 7. Nintendo's DMCA sweep: four Nov 6 notices nuke Switch emulator forks and modchip firmware — and the coverage wave just arrived

- **Velocity:** ▮▮ rising
- **Source:** github/dmca · 180+ pts on HN · 3.6h ago (~00:25 UTC+8)
- **Tags:** `dmca` `nintendo` `emulation`

Four Nintendo takedown notices dated **Nov 6** (`2026-11-06-nintendo.md` through `-4.md`) landed in github/dmca, and the HN wave broke on Nov 12. The notices invoke **anti-circumvention**, not plain copying: Nintendo describes Switch TPMs as "the encryption of video game files using certain proprietary cryptographic keys, such as those referred to as prod.keys", and claims **entire repositories** as infringing — including yuzu fork `IpwnedU/yuzu-android-master` and the Picofly modchip firmware (`Ansem-SoD/Picofly`), the latter being firmware for hardware mods, not an emulator. GitHub's standard pre-takedown process (owner contact, counter-notice window) is noted in each notice.

**Why it matters:** The modchip-firmware takedowns extend the yuzu/Ryujinx precedent from emulator *code* to the *hardware-mod ecosystem* around it — a broader reading of circumvention that reaches anything touching `prod.keys`. Watch the counter-notice window: entire-repository claims are the most reversible kind, and forks of the taken-down code typically reappear within days.

[`🔗 github/dmca: 2026-11-06-nintendo.md`](https://github.com/github/dmca/blob/master/2026/11/2026-11-06-nintendo.md) · [`🔗 github/dmca: 2026-11-06-nintendo-2.md (Picofly)`](https://github.com/github/dmca/blob/master/2026/11/2026-11-06-nintendo-2.md) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50469994)

---

## 8. openQ4 0.14.1 ships the Quake 4 expansion Raven and Ritual never released — rebuilt on the port's own engine

- **Velocity:** ▮▮ rising
- **Source:** themuffinator/openQ4 · 197+ pts on HN · 5.8h ago (~22:15 UTC+8)
- **Tags:** `quake4` `game-port` `open-source`

openQ4 — an open-source Quake 4 source port — shipped **v0.14.1** (Nov 11), which it calls "the biggest update since 0.13.2" and a replacement for a **withdrawn 0.14.0**. The headline: **The Awakening**, the expansion Raven Software and Ritual Entertainment never released, recovered by Justin Marshall — "All 13 maps run on openQ4's own engine and game code", with monsters, weapons and vehicles rebuilt so it "never loads the alpha's game DLL" (you supply the expansion files). The same release adds stable cached shadow mapping on OpenGL and Vulkan, a rebuilt interface with a Remastered HUD, Vulkan as Windows' default renderer, an experimental signed ARM64 **Android** APK, bots/voice chat for multiplayer, and experimental VR plus a level editor.

**Why it matters:** This is the same statically-recompiled-modding wave as last week's Black Ops II port, but with a twist worth copying: rather than packaging the lost alpha's binaries, openQ4 re-implemented the expansion's content on its own engine — a preservation strategy that sidesteps the legal and compat grey zone entirely. And the release notes are honest about the 0.14.0 withdrawal, which is rarer than it should be.

> "Play the recovered Quake 4 expansion beside the original campaign from Single Player → Campaign." — openQ4 0.14.1 release notes

[`🔗 openQ4 v0.14.1 release notes`](https://github.com/themuffinator/openQ4/releases/tag/v0.14.1) · [`🔗 themuffinator/openQ4`](https://github.com/themuffinator/openQ4) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50467618)

---

## 9. smolmaxxing: a 1.9 GB Android TV box runs a 16B MoE at 5.1 tok/s — every claim measured on the hardware

- **Velocity:** ▮▮ rising
- **Source:** hyperionaidev/smolmaxxing · 172+ pts on HN · 4.7h ago (~23:20 UTC+8)
- **Tags:** `edge-ai` `quantization` `llm-inference`

"I'm making LLMs work on small and old devices" is a research log with a scoreboard: device #1 is a Xiaomi TV Box S (4× Cortex-A55, **1.9 GB RAM**, no root) that went from a stock 7.5 tok/s on Qwen3.5-0.8B to **16.8**; runs Qwen3.5-2B at **7.7 tok/s** in real chat (bits/byte 0.909); and — via Q2_K expert paging from flash with cache-aware routing and prefetch — a **16B MoE (Ling-mini-2.0) at 5.1 tok/s**, coherent over 600-word answers. Device #2 is a jailbroken 2013 iPad Air (Apple A7, 1 GB) running a 1.7B model at **24–26 tok/s** from Safari. Techniques are grouped by bottleneck: a 1-bit LUT kernel for base-NEON chips, ternary weights in 2-bit fields, O_DIRECT weight streaming with MTP speculation, and an expert pager that cut expert misses from 13% to ~2%. All of it is written up as experiments E1–E160, with a degeneration test (12/13 → 1/13 degenerate long answers) and quality measured in bits/byte so tokenizers compare fairly.

**Why it matters:** Most tiny-device LLM posts cherry-pick a benchmark; this one publishes its own failures (a dense 9B manages 0.27 tok/s) and an honest cross-model quality metric, and the finding that bigger only helps on this box when the model is also better is the actual state of the art for the $30-device fleet the world actually owns.

> "Every number in this repo was measured on the device itself." — smolmaxxing README

[`🔗 hyperionaidev/smolmaxxing`](https://github.com/hyperionaidev/smolmaxxing) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50468888)

---

## 10. PostgreSQL's November wave: 52 CVEs fixed across 18.7/17.12/16.16/15.20/14.25 — and PostgreSQL 14 goes EOL

- **Velocity:** ▮▮ rising
- **Source:** postgresql.org · 87+ pts on HN · 5.6h ago (~22:25 UTC+8)
- **Tags:** `postgresql` `security` `cve-wave`

PostgreSQL's quarterly update (Nov 12) fixes **52 security vulnerabilities and over 140 bugs** across all supported branches, and it is a heavy one: dozens of fixes graded **8.8** for type-confusion and use-after-free flaws that let an attacker execute arbitrary code, including the `dblink` reentrant-disconnect UAF (**CVE-2026-120147**, object creator → code as the OS user running the database), logical replication writing to subscriber system catalogs (**CVE-2026-120145**), `pg_restore` executing code from unvalidated archives (**CVE-2026-116314**), and `pg_dump` SQL injection via constraint names (**CVE-2026-116318**). The release is also **PostgreSQL 14's final update** — the branch is now EOL — and it ships with homework: reindex possibly-corrupt GIN and `pg_trgm` GiST indexes, take a fresh full backup if you use incremental backups, and check for invalid `NOT NULL NO INHERIT` constraints on partitioned tables. PostgreSQL 19 RC 2 carries the same fixes ahead of a Nov 19 GA target.

**Why it matters:** 52 CVEs in one cumulative release — most graded 8.8 by the project's own CNA — is an unusually large attack-surface correction, and several (pg_restore, pg_dump, vacuumdb) sit in the admin toolchain operators run routinely. The EOL of PostgreSQL 14 in the same breath makes this the quarter's mandatory upgrade.

[`🔗 PostgreSQL 18.7, 17.12, 16.16, 15.20, 14.25 and 19 RC 2 released`](https://www.postgresql.org/about/news/postgresql-187-1712-1616-1520-1425-and-19-rc-2-released-3442/) · [`🔗 PostgreSQL CVE-2026-120147 (dblink UAF)`](https://www.postgresql.org/support/security/CVE-2026-120147/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50467763)

---

## 11. Synology drops 27 DSM CVEs in two advisories — a 9.8 unauthenticated SQLi in the Auth API tops them

- **Velocity:** ▮▮ rising
- **Source:** Synology advisories · NVD wave published Nov 12 (~4.8h ago)
- **Tags:** `synology` `nas` `security`

Synology's **SA-26:19** carries the two serious ones: **CVE-2026-76954 (CVSS 9.8)**, SQL injection in DSM's Auth API letting "remote attackers … read or write arbitrary files and conduct denial-of-service attacks", and **CVE-2026-85101 (8.6)**, an authentication bypass in rsync. **SA-26:18** adds 25 more — eight Important including three 8.8s (SSOAuth authorization bypass via user-controlled key **CVE-2026-13672**, Sharing API path traversal **CVE-2026-18792**, missing-authentication in the Auth API **CVE-2026-74857**) and 17 Moderate — for **27 CVEs total**, matching the 27 `security@synology.com` records NVD published on Nov 12. Both advisories are marked Resolved with one fix line covering all branches: DSM **7.4.1-90080-1**, **7.3.2-86009-5**, **7.2.2-72806-10**, or **7.2.1-69057-13**, and no interim mitigation is listed.

**Why it matters:** NAS boxes are internet-facing backup endpoints for homes and small offices, an unauthenticated 9.8 in the auth path is exactly the shape ransomware crews scan for, and the advisory published Nov 10 while the NVD records landed Nov 12 — if you patch from CVE feeds, you were two days behind the vendor. Check your DSM update channel today.

[`🔗 Synology-SA-26:19`](https://www.synology.com/en-global/security/advisory/Synology_SA_26_19) · [`🔗 Synology-SA-26:18`](https://www.synology.com/en-global/security/advisory/Synology_SA_26_18) · [`🔗 NVD: CVE-2026-76954`](https://nvd.nist.gov/vuln/detail/CVE-2026-76954)

---

## 12. Talking Zen 6 with Mike Clark: Zen 6c becomes the flagship, integer multipliers drop to two

- **Velocity:** ▮ rising
- **Source:** chipsandcheese.com · 144+ pts on HN · 5.9h ago (~22:10 UTC+8)
- **Tags:** `amd` `zen6` `cpu-architecture`

Chips and Cheese's George Cozma interviewed AMD's original Zen architect Mike Clark (33 years in core design) about Zen 6/Venice, and the details are structural: **Zen 6c graduates from area-optimized variant to flagship** — 32 cores, full 128 MB of L3, the family's highest IPC — while classic Zen 6 becomes the high-frequency part, with Clark stressing "we don't want to create a delta between the two architectures that software has to be optimized for." Execution changes follow the scheduler's return to a distributed layout (which our 11-11 coverage of the Zen 6 scheduler analysis described): **integer multipliers drop from three to two**, **vector loads double to four**, two VNNI units were squeezed into a floorplan that was already set, late in the project, for orchestration-class AI ("It's not going to beat a GPU, and that's not the point"), and mispredict recovery got cheaper — with Clark admitting to AI-assisted tuning of TAGE branch-predictor tables and calling the team "monomaniacally focused" on redirect speed.

**Why it matters:** The Zen 6c promotion inverts the last three generations' positioning — density is no longer the budget option — and the interviewer's hands-on SPECint 2026 result (Zen 6c matching AMD's fastest Zen 5 server chip at a clock deficit) is a first measurable cross-generation checkpoint.

[`🔗 Chips and Cheese: Talking Zen 6 with Mike Clark`](https://chipsandcheese.com/p/talking-zen-6-with-mike-clark-at) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50467460)

---

## 13. Pharo World: a full Pharo Smalltalk image runs in a browser tab via WebAssembly

- **Velocity:** ▮ rising
- **Source:** massimo-nocentini.github.io · 131+ pts on HN · 29.7h ago (~22:20 UTC+8 Nov 11)
- **Tags:** `smalltalk` `webassembly` `live-programming`

Massimo Nocentini's Pharo World loads a real Pharo image (`.image` + `.changes` + `.sources`) into a WebAssembly-compiled VM in the page, with a working in-image REPL, the ability to drop in `.st` files or whole images, and — the interesting part — Iceberg/Metacello Git operations from inside the browser through a configurable **Git HTTP proxy**, since direct clones only work "for hosts that let this page in" via CORS. The caveat is stated plainly: a proxy "sees the code and any credentials that pass through it", so run your own.

**Why it matters:** Smalltalk was the original live-programming environment, and a WASM Pharo makes the whole image-based workflow (inspect everything, change anything while running) available as a shareable URL — a live demo format for teaching Squeak/Pharo-lineage ideas without installs. The CORS proxy credential warning is the same browser-platform boundary every in-browser IDE hits.

[`🔗 Pharo World`](https://massimo-nocentini.github.io/pharo-vm/world.html) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50453763)

---

## 14. Jane Street's interviews change: onsite rounds where candidates review and direct LLM-written code

- **Velocity:** ▮ rising
- **Source:** blog.janestreet.com · 119+ pts on HN · 6.0h ago (~22:00 UTC+8)
- **Tags:** `hiring` `interviews` `ai-assisted-coding`

Jane Street (post by Matthew Saffer, Nov 2 — resurfacing on HN Nov 12) says it began trialing new onsite formats for campus candidates this summer: "less code-writing", more software design, verifying "the quality, structure, and intention of code", and **using LLMs to produce code**. Most rounds remain traditional no-LLM coding interviews; candidates get a heads-up about which format to expect. The reassurance is telling: "You shouldn't feel like you need to have a highly worked out methodology for working with agents", and "What we care about is that you think clearly about the tools you use."

**Why it matters:** This is the strongest signal yet that elite-firm hiring is re-weighting from typing code to specifying and reviewing it — from the firm whose OCaml bar has long defined "can actually program." If code generation keeps getting cheaper, the graded skill becomes catching what the model got wrong, which is exactly what these trial rounds test.

[`🔗 Jane Street: Our software engineering interviews are changing a little`](https://blog.janestreet.com/software-engineering-interviews-are-changing-a-little/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50467297)

---

## 15. ZigZag: a Rust embroidery editor that turns SVG into stitches — and lets your agent drive it over MCP

- **Velocity:** ▮ steady
- **Source:** simpsoka/zigzag · 91+ pts on HN (Show) · 3.0h ago (~01:00 UTC+8)
- **Tags:** `rust` `mcp` `hardware`

"My $300 embroidery machine needed a subscription, so I built my own app": ZigZag is an open-source (Rust) visual embroidery editor that imports SVG ("fill and stroke parts, transforms, text"), generates tatami fill / satin columns / running stitch, and exports **PES, DST, EXP, JEF or VP3** — or sends designs directly to a **Brother Skitch (PP1) over Bluetooth**. The agent angle is native: built-in **MCP support** so coding agents can create and edit designs alongside you, with the same engine exposed as a `zigzag` CLI. Mac builds are signed and notarized; Windows ships as a zip with the usual SmartScreen dance.

**Why it matters:** The subscription-locked-appliance rebellion is becoming a genre (right-to-repair meets Show HN), and ZigZag is a strong specimen: file-format coverage that replaces the vendor's lock-in, plus an MCP surface that makes it a template for agent-controlled physical-fabrication tools — the same pattern Klad showed for painting last week.

[`🔗 simpsoka/zigzag`](https://github.com/simpsoka/zigzag) · [`🔗 HN discussion (Show)`](https://news.ycombinator.com/item?id=50470488)

---

## 16. LibreAGI: a private BitTorrent tracker whose purpose is making open-weight models un-killable

- **Velocity:** ▮ steady
- **Source:** libreagi.com · 91+ pts on HN · 5.9h ago (~22:10 UTC+8)
- **Tags:** `open-weights` `preservation` `bittorrent`

LibreAGI ("Open models should outlive the places that host them") is a members-only private tracker for archiving open-weight models in safetensors/GGUF/ONNX, restricted to Apache-2.0, MIT and Qwen-community licenses. The economics are tuned for rarity: "Credit grows with size and time, and a model with one copy earns four times the base rate"; every file "is checked against its source commit", staff review each model, and a **signed public catalog** of "every model, hash and source" exists so "anyone can rebuild the swarms if this site goes away." A public IRC channel runs without an account.

**Why it matters:** Model takedowns and quiet delistings are a real failure mode for open weights (the Nov 6 Microsoft-Research and license-pivot stories are the genre), and a hash-verified, signed-catalog torrent swarm is the correct archival shape — closer to Linux ISO mirrors than to Hugging Face. The blind spot is disclosed by the site itself: anonymous operators, invite-only membership, so its durability claim rests entirely on that signed catalog.

[`🔗 libreagi.com`](https://libreagi.com/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50467439)

---

## 17. free-claude-code: the 69k-star router that points 12 supported harnesses at 61 providers — 1.3B+ "free tokens"

- **Velocity:** ▮ steady
- **Source:** Alishahryar1/free-claude-code · 69,145★, +461 today on GitHub Trending
- **Tags:** `claude-code` `llm-routing` `agent-infra`

The daily-trending constant of the week is **free-claude-code** (AGPL, Python 3.14, on PyPI as `free-claude-code` 6.19.11 — "Local proxy connecting coding agents to OpenAI-compatible AI providers"): one proxy that routes **12 supported harnesses** (Claude Code, Codex, Pi, OpenCode, Cline, Aider, Antigravity CLI, VS Code Chat and more) to **61 providers**, claiming "1.3B+ free tokens per month" across free tiers, with automatic model/provider/API-key fallback, rate limiting, and RTK/Headroom integration for "up to 90% lower token usage". Its position on the ToS question is explicit: "FCC follows provider TOS and removes integrations if they stop being allowed."

**Why it matters:** Whether or not you use it, the design is the emerging shape of agent infrastructure: the harness is interchangeable, the model is interchangeable, and the value sits in the routing/fallback layer — which is why a proxy with no model of its own out-trends most model releases. The dependency to watch is the word "free": every claimed token pool is a provider's promotion that can end without notice.

[`🔗 Alishahryar1/free-claude-code`](https://github.com/Alishahryar1/free-claude-code) · [`🔗 free-claude-code on PyPI`](https://pypi.org/project/free-claude-code/)

---

## 18. ManageEngine's own CNA drops a 9.9 and an 8.8 PowerShell-injection pair across its admin suite

- **Velocity:** ▮ steady
- **Source:** NVD records (CNA: Zohocorp) · published Nov 12 (~4.8h ago)
- **Tags:** `manageengine` `enterprise` `security`

Zohocorp's CNA published a batch of ManageEngine fixes on Nov 12, led by **CVE-2026-12591 (CVSS 9.9)** — M365 Manager Plus below build 4818, an authenticated-technician flaw — and a cluster in **DDI Central below 6301**: an authentication bypass (**CVE-2026-19422**, 9.1), a PowerShell injection (**CVE-2026-19421**, 8.8) and a combined authorization-bypass/PowerShell-injection (**CVE-2026-75869**, 8.8). The wave also covers the shared-platform pair **CVE-2026-12507 (9.1)** hitting ServiceDesk Plus below 15290, AssetExplorer below 7860 and sibling builds. Every score is the vendor CNA's own (no NVD analysis yet — all records were `Awaiting Analysis` at write time).

**Why it matters:** ManageEngine's suite is the IT-admin backbone of thousands of mid-size enterprises, and its history includes actively-exploited chains (the 2022 ManageEngine ADSelfService Plus entry sat on KEV for years). A 9.9 reachable by an *authenticated technician* means one compromised helpdesk account is a company-wide event — patch builds 4818/6301/15290 this week.

[`🔗 NVD: CVE-2026-12591`](https://nvd.nist.gov/vuln/detail/CVE-2026-12591) · [`🔗 NVD: CVE-2026-19422`](https://nvd.nist.gov/vuln/detail/CVE-2026-19422)

---

## 19. Apple's Attention-to-Mamba recipe: distill a Transformer into pure SSM — 14.01 vs the teacher's 13.86 perplexity

- **Velocity:** ▮ steady
- **Source:** machinelearning.apple.com · 75+ pts on HN · 30.6h ago (~21:30 UTC+8 Nov 11)
- **Tags:** `distillation` `ssm` `mamba`

Apple's research page (TMLR, Nov 2026; arXiv 2604.14191) publishes a two-stage recipe for converting an Attention teacher into a **Mamba student with no attention blocks at all**: first distill the Transformer into a linearized-Attention variant via a kernel-trick adaptation, then distill that into Mamba with a "principled initialization". At 1B scale (Pythia-1B teacher, 10B distillation tokens) the student reaches perplexity **14.01** vs the teacher's **13.86**, with gains largely transferring downstream — though "some gaps appear on tasks relying more on in-context recall". The arXiv v2 (Nov 3) matters as much as the recipe: it "fixes an implementation error in v1 that affected the SSM decay gates" and re-ran everything on Mamba-2.

**Why it matters:** Naive Transformer→SSM distillation was known to fail without hybrid architectures; a reproducible two-stage recipe that lands within 1.1% of the teacher changes the conversion calculus for edge deployment, where Mamba's linear-time inference is the whole point. The v2 erratum is the honesty note to carry: the v1 numbers circulated for months with a decay-gate bug.

[`🔗 Apple ML: Attention to Mamba`](https://machinelearning.apple.com/research/attention-mamba-distillation) · [`🔗 arXiv:2604.14191`](https://arxiv.org/abs/2604.14191)

---

## 20. ExcalidrawZ resurfaces: Excalidraw as a pure-SwiftUI native Mac/iOS app with local files

- **Velocity:** ▮ steady
- **Source:** chocoford/ExcalidrawZ · 76+ pts on HN · 4.6h ago (~23:25 UTC+8)
- **Tags:** `excalidraw` `macos` `diagramming`

A four-day-old HN post pushed chocoford/ExcalidrawZ (1,718★, pure SwiftUI, created Dec 2022) back onto front pages: a native Excalidraw app for macOS/iOS that keeps the familiar canvas while storing diagrams as **local files** instead of browser localStorage — with the ecosystem's usual multi-file sync and versioning quirks worked around. Last repo push was Oct 24, so treat this as a resurfacing rather than a release event.

**Why it matters:** Excalidraw's browser-first model is beloved and limits: drawings live in tabs, not in your file tree. Native wrappers occupy the middle ground between the web app and full re-implementations, and the HN thread is the useful artifact — a working list of what a diagram tool must do to feel native (file providers, shortcuts, iCloud sync) without forking the format.

[`🔗 chocoford/ExcalidrawZ`](https://github.com/chocoford/ExcalidrawZ) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50468944)

---

## 21. Six Chinese frontier models carry the initialization fingerprint of export-controlled Blackwell GPUs — recovered from the public weights themselves

- **Velocity:** ▮▮▮ trending
- **Source:** unemploymentlabs.com · 212+ pts on HN · 6.1h ago (~05:55 UTC+8)
- **Tags:** `checkpoint-forensics` `export-controls` `deepseek`

Will DePue's forensic report (Nov 12) recovers the PRNG seed and thread layout burned into model initializations and reads which GPU class started each run: **DeepSeek-V4-Flash and MiniMax-M3 match the 148-SM B200/B300 layout; DeepSeek-V4-Pro, Kimi K3, K3.1-Pro and Ant's Ling-3.1-flash match the 152-SM GB200/GB300 layout** — while every earlier model from the same labs reads as 132-SM Hopper. The method is reproducible on physical chips: DeepSeek's seed 953049583 on an H100 reproduces V3's 57,344 preserved values bit-for-bit but not V4-Flash's, and on a B300 reproduces V4-Flash (445 of 469 selected rows bit-exact); a GB200 reproduces Kimi K3's 13 preserved rows with seed 20256586. The AMD MI300X alternative was excluded for V4-Flash — in the 377 values where the vendors differ, the published weights match NVIDIA 363 times and AMD zero. The method agrees with all 24 models whose hardware is publicly known, and the strongest evidence ranges from 49 to 1,385 sigma against an ~8-sigma chance benchmark. The report's own estimates: ~1,500–3,500 Blackwell GPUs per final run, ~12,000 across five models, half a billion dollars at the WSJ's per-GPU figure.

**Why it matters:** This is the first technical evidence — as opposed to officials' assertions — behind the export-control allegations, derived entirely from published weights. The report is equally explicit about the ceiling: fingerprints show initialization hardware, "supports, without proving, the inference that Blackwell also performed the training", and "are not a finding that any law was broken". Notably Qwen, GLM, Tencent, Xiaomi and StepFun's newest models all still read as Hopper, and several models (CPU-initialized Qwen3, PaddlePaddle's ERNIE, Meituan's ASIC-trained LongCat) leave no GPU fingerprint at all.

> "These flags describe the hardware class under the U.S. export rules of October 2022 and October 2023. They are not a finding that any law was broken."

[`🔗 Unemployment Labs: checkpoint forensics`](https://unemploymentlabs.com/checkpoint-forensics) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50474883)

---

## 22. The story behind PostgreSQL's 52-CVE Tuesday: a researcher turns a 22-year-old composite-type primitive into root RCE

- **Velocity:** ▮▮ rising
- **Source:** mehmetince.net · 155+ pts on HN · 9.7h ago (~02:25 UTC+8)
- **Tags:** `postgresql` `type-confusion` `exploit-research`

Mehmet Ince's part 3/6 (Nov 9, resurfacing on HN Nov 12) is the researcher's account of the wave item 10 covered: create a composite type with a `uuid` field, `PREPARE` a query returning it, `ALTER TYPE ... ALTER ATTRIBUTE key TYPE bytea CASCADE`, then `EXECUTE` — `record_out()` now hands stored UUID bytes to `byteaout()`, whose `01 02` prefix reads as an expanded-object pointer. Forged header + methods table turn detoasting into an indirect call: `system(H)`. The same primitive defeats ASLR — flip an array's element type to `bigint[]` and `unnest()` hands its pointer back as an integer (three UUIDs forge the 48-byte array header). The mutable-row-type behavior dates to commit `077db40fa1f3` (May 5, 2004); the exploit leans on expanded-object pointers added in 2015. Ince reports 21 variants and says six of the 52 CVEs in Nov 9's release are this family (**CVE-2026-6460** umbrella, plus CVE-2026-120142, -120148, -116329, -116306, -120139), triggerable by a lowest-privileged login role. The umbrella record — **8.8**, published to NVD Nov 12 by PostgreSQL's own CNA — states it plainly: "Type confusion in PostgreSQL allows an object creator to execute arbitrary code as the operating system user running the database." He privately coordinated with the managed-Postgres industry — "I haven't seen any vendor who is not affected" — with Databricks validating, Google escalating AlloyDB to P0, and AWS, Azure and Supabase receiving working PoCs in August. The commit's Reported-by line spans PostgreSQL core, OpenAI's Security Research Team and Anthropic's Nicholas Carlini.

**Why it matters:** The type-confusion 8.8s in Tuesday's release were abstract; this is the concrete worst case — an unprivileged SQL role reaching OS code execution on the managed-Postgres fleet. It is also a candid record of agent-assisted vulnerability research: Ince credits an Opus-powered "pg_expert" tutor for walking him through Datum internals between finding bugs himself.

> "I gave PostgreSQL a value inside a composite type, changed the type of one of its fields, and asked it to read the value back. That type confusion led to one of the most reliable memory-corruption exploit I have seen."

[`🔗 Mehmet Ince: Part 3/6, CVE-2026-6460`](https://mehmetince.net/part-3-6-how-i-ended-up-turning-a-22-year-old-postgresql-type-confusion-primitive-into-rce-cve-2026-6460) · [`🔗 NVD: CVE-2026-6460`](https://nvd.nist.gov/vuln/detail/CVE-2026-6460) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50471761)

---

## 23. AI-generated app flood is breaking Apple's review pipeline — synth developers rejected on hallucinated grounds

- **Velocity:** ▮▮ rising
- **Source:** synthanatomy.com · 128+ pts on HN · 6.9h ago (~05:05 UTC+8)
- **Tags:** `app-store` `apple` `industry`

Synth Anatomy documents the two-sided AI failure around iOS music apps: an estimated **10–20 new iOS music apps per day** now arrive vibe-coded, while Apple's review — its guidelines promise "at least 50% of submissions in less than 24 hours and 90% in less than 48 hours" — has stretched to weeks. Pittsburgh Modular's Microvolt 3901 shipped as a VST on Oct 27 but only reached iOS on Nov 12. Unfiltered Audio's Michael Hetrick reports his Sinusoidal Run Rhythm was **rejected four times** — "the editor hallucinated that 'Polyharmonic' was an audio technology that we needed to show a documented license for", then demanded a video with "the required proprietary hardware", then flagged the MIDI build as spam for resembling the audio build — a month of back-and-forth ending in an audio-only release. Worse, developer Marek Dendes' CRUX Synth was rejected four times in a row as "design spam" produced by "app generation template services", with appeals unanswered five days on: submissions flip "from 'Waiting for Review' into 'In Review' and then instantly ... 'Rejected'".

**Why it matters:** App Review is the platform's core trust product — the promise that everything on the store was checked. Cheap generation floods the gate while automated review hallucinates rejection reasons, and the appeal path reads as a dead end; if that holds, the cost lands on exactly the small developers the review exists to protect.

> "Apple seems to be using AI for automated App Store reviews. SRR got rejected 4 times." — Michael Hetrick, Unfiltered Audio, on the Loopy Pro forum

[`🔗 Synth Anatomy: AI is turning Apple's app review into a nightmare`](https://synthanatomy.com/2026/11/ai-is-turning-apples-app-review-process-into-a-nightmare-for-developers.html) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50474311)

---

## 24. Edge0-145B open-sourced: a 145B model claiming 29 GB peak memory and 80+ tok/s decode on a laptop

- **Velocity:** ▮▮ rising
- **Source:** edge0.ai · 116+ pts on HN · 5.0h ago (~07:05 UTC+8)
- **Tags:** `on-device-ai` `moe` `open-weights`

Edge0's team (repo **Edge0-AI/Edge0**, 10.4k★) released Edge0-145B and Edge0-120B weights plus its inference framework. The architecture is a shared-matrix MoE — each group of 64 experts shares two large matrices while retaining small per-expert deltas, so only ~10B of 145B parameters compute per step — with a three-tier loader (hot experts in GPU memory, a ~40 GB expert library in system RAM, ~48 GB of vocabulary data read from SSD on demand) and CPU+GPU co-scheduling. Reported numbers: **29 GB peak memory, 1,100+ tok/s prefill, 80+ tok/s decode, ~120 W**, flat speed to 128K–256K context, day-one support for Apple Silicon and RTX 4090/5090. Benchmarks put it ahead of Qwen3.8-Flash-Next (86.52 vs 83.3 on Terminal-Bench 2.1) and DeepSeek-V4-Flash-0731 — but the post itself states the comparisons "come from Edge0's internal evaluations", and the baseline memory figures (e.g. "~70 GB" for Qwen3.8-Flash-Next) are asterisked as estimates that "remain to be measured". The same post follows September's Edge0-35B phone release (37+ tok/s on an iPhone 18 Pro Max).

**Why it matters:** If the memory numbers survive third-party runs, the frontier-agent-on-your-laptop tier stops being a marketing line — 145B at 29 GB is the difference between a workstation and a server rack. Until someone independent runs the harness, treat every comparison row as the vendor's claim; the HN reception (113 pts and climbing, mostly skeptical) is the right prior.

[`🔗 Edge0 blog: Introducing Edge0-145B`](https://edge0.ai/blog/introducing-edge0-145b-frontier-ai-capabilities-on-your-own-computer) · [`🔗 Edge0-AI/Edge0`](https://github.com/Edge0-AI/Edge0) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50475713)

---

## 25. Nine NetScaler CVE records land overnight — memory corruption across ADC/Gateway, fixed in 14.1-73.57 and 13.1-64.39

- **Velocity:** ▮▮ rising
- **Source:** NVD records (CNA: Citrix) · published 00:20–03:17 UTC Nov 13 (~08:20–11:17 UTC+8)
- **Tags:** `citrix` `netscaler` `cve-wave`

Citrix's CNA published **nine NetScaler ADC/Gateway records** overnight, every one pointing at advisory **CTX697305** and every score CVSS 4.0: CVE-2026-107412 at **9.5** (multiple memory overflows), five at 9.3 — packet processing, SMPP, DNS and DNS-over-HTTPS, NetScaler Push — and three at 8.7 (RTSP ALG, SAML, WebAuth). The cveawg containers name the fixed builds: **14.1-73.57** (14.1-73.58 FIPS), **13.1-64.39** (13.1-37.293 FIPS/NDcPP), with everything at or above unaffected. Descriptions stop at memory-overflow and denial-of-service wording; all nine records were still `Received` at write time. Citrix's advisory page renders as a JavaScript shell to a plain fetch, so this item reads the CVE records rather than the advisory text — the records are the CNA's own statements.

**Why it matters:** NetScaler memory-corruption families have a history of turning into edge-device exploit chains (Citrix Bleed, 2023), and ADC/Gateway boxes are exactly the perimeter asset whose admin interfaces get pre-auth reconnaissance. The DoS-worded descriptions versus 8.7–9.5 scores say read the advisory before deciding severity — and patch the edge this week regardless.

[`🔗 NVD: CVE-2026-107408 (DNS/DoH memory corruption)`](https://nvd.nist.gov/vuln/detail/CVE-2026-107408) · [`🔗 Citrix advisory CTX697305`](https://support.citrix.com/support-home/kbsearch/article?articleNumber=CTX697305)

---

## 26. AgentRun open-sources a self-improving control plane for agent harnesses — Pi, Claude Agents, Codex, OpenCode over ACP

- **Velocity:** ▮ rising
- **Source:** Parcha-ai/agentrun · 86+ pts on HN (Show) · 9.8h ago (~02:15 UTC+8)
- **Tags:** `agent-infra` `self-improvement` `acp`

GREP.AI (YC F26) open-sourced AgentRun (Apache-2.0, npm `@parcha/agentrun`, 640★): "self-improvement, durable execution and a control plane on top of your favorite agent harness", bring-your-own over ACP (Pi, Claude Agents, Codex, OpenCode), with sandboxes, computer environments, thousands of tools, and a console whose Learning tab shows what the agent kept — the demo caption claims answers drop from 10 s to 2 s and a run from $0.05 to $0.0077. The case study is the honest part: their code-review bill went from $180 to $6,451/month when reviews cost a dollar each, so they built their own reviewer on a cheap model tuned on their own PRs — **18 cents a review**, claiming 1.6× the real bugs Greptile caught on 30 PRs; merchant classification got 7× cheaper once it learned the job. One-click Render deploy, or the hosted console.

**Why it matters:** The bet worth watching is self-improvement as a measurable cost curve rather than a memory feature — the claims are the company's own 30-PR sample, but the shape (harness-agnostic control plane + a learning loop that compounds) is where agent infra is consolidating, one layer above this morning's routing proxies.

[`🔗 Parcha-ai/agentrun`](https://github.com/Parcha-ai/agentrun) · [`🔗 HN discussion (Show)`](https://news.ycombinator.com/item?id=50471650)

---

## 27. Lambda Web Functions bill memory for 5–7 minutes after your last request — so one startup built its own compute

- **Velocity:** ▮ rising
- **Source:** easel.sh · 71+ pts on HN · 11.1h ago (~00:55 UTC+8)
- **Tags:** `aws` `lambda` `cloud-costs`

Easel benchmarked AWS's October-launched Lambda Web Functions and hit a billing shape worth knowing: **execution environments stayed alive 313–411 seconds after their last request** across six us-east-1 environments (Oct 26 data), with no configurable idle timeout — CPU bills only while active, but memory bills for the environment's whole lifetime. A 200 ms request followed by 345 s of idle is "roughly 1,700 times the request duration in metered memory time"; memory was ~88% of their experiment's compute cost. Self-terminating environments after 10 s idle cut metered time ~20×, but AWS logged every intentional exit as a runtime failure. So Easel moved execution onto its own hosts (live Nov 2) with Lambda as overflow — same Next.js 16 app: **1.5–3× faster warm medians, ~3.5× faster cold starts** (216–250 ms vs 810–854 ms after 12 min idle), resuming a paused environment in 14 ms where Web Functions needed 908 ms. The post states its own limits: one region, one small app, two paired cold-start trials.

**Why it matters:** Serverless economics have a quiet floor — every bursty low-traffic app pays minutes of memory-seconds per real millisecond of work, and Web Functions made that floor visible. The response is telling: a hosting startup concluded that sharing one warm machine across many apps beats per-app isolated environments, which is the old dedicated-host model re-emerging under per-millisecond billing.

[`🔗 easel.sh: Why we chose our own compute over Lambda Web Functions`](https://www.easel.sh/blog/lambda-web-functions-idle-memory) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50470445)

---

## 28. Adapting CPython for yk: ~450 LoC turns a meta-tracing JIT that beats CPython on 12 of 13 benchmarks

- **Velocity:** ▮ steady
- **Source:** tratt.net · 56+ pts on HN · 15.2h ago (~20:50 UTC+8 Nov 12)
- **Tags:** `cpython` `jit` `interpreters`

Laurie Tratt's yk — a toolkit that adds meta-tracing JIT compilers to C interpreters (yklua ran 2× PUC Lua) — faced the fair question "how do you know if this works for large interpreters?" Answer: **ykcpython**, built in 3–4 days of direct work plus 1.5 weeks of generic yk fixes, ~450 LoC changed. The instructive part is the path: adapting CPython's tier-1 interpreter (200 LoC) was *slower* than stock — quickening's specialized↔unspecialized transitions kept discarding traces — so he moved to the tier-2 uop interpreter instead (just 80 LoC). One 30-LoC idempotent-load hint made Mandelbrot 2.7× faster (11.67 s → 5.0 s). Final numbers vs CPython 3.15.1 and its experimental JIT: ykcpython is faster than stock on 12 of 13 AWFY benchmarks (DeltaBlue ~2.5% slower) and faster than CPython's own JIT on 8 of 13 — Mandelbrot 4.20 s vs 6.94 s (JIT) vs 11.66 s; Richards 33.18 s vs 40.56 s vs 54.80 s. The caveats are stated as plainly: "it definitely is not" ready for use, and "benchmark suite performance is a hoop to jump through rather than an end in itself".

**Why it matters:** It is a third data point that a usable JIT can be added to a mainstream interpreter as a ~450-line fork rather than a rewrite — and it leans on CPython's own tier-2 uop infrastructure, meaning the experimental JIT's groundwork is paying off for competing JIT designs. Repeatable experiment and raw data are published.

[`🔗 Laurie Tratt: Adapting CPython for yk`](https://tratt.net/laurie/blog/2026/adapting_cpython_for_yk.html) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50466410)

---

## 29. Dixell/Copeland XWEB EVO gets 14 CVE records in one wave — pre-auth root command injection plus a hardcoded backdoor on supermarket-refrigeration servers

- **Velocity:** ▮ steady
- **Source:** NVD records (CNA: VulnCheck) · published from Nov 12 20:18 UTC (~04:18 UTC+8 Nov 13)
- **Tags:** `iot-security` `backdoor` `cve-wave`

VulnCheck's CNA published 20 records on Nov 12, **14 of them on XWEB EVO** — the web server for Dixell (Copeland) refrigeration controllers used across food retail — credited to Valentin Lobstein. The top three, all CVSS 3.1 **9.8**: **CVE-2026-124002**, pre-auth OS command injection via the *username field* of login.lua, cleanout.lua or api.lua "before the password check occurs", chained with the setuid-root `wlua` interpreter for root; **CVE-2026-124004**, a hardcoded backdoor password granting full administrative access; **CVE-2026-124010**, root command injection via the setuid-root CGI `xwconsole.cgi`. An unauthenticated arbitrary file write (CVE-2026-124014, 9.1) rounds out the criticals. One line in the advisory decides the response: "This product line reached it's end of service date in March 2026" — there is no fix path, so affected installs (≥ 5.2.3, < 5.7.0 on the injection) are permanent unless isolated or replaced. (VulnCheck's own page prints 9.3 for CVSS 4.0 on the same record NVD serves at 9.8/3.1 — same assessor, two frameworks.)

**Why it matters:** The exposed-PLC/classifier backdoor pattern usually evokes cameras and routers; here it is the control plane for supermarket refrigeration — internet-reachable, credential-guessable by design, and EOL. "Unpatched" is the permanent kind, which moves the advice from patch-scheduling to network isolation today.

[`🔗 VulnCheck advisory: XWEB EVO pre-auth command injection`](https://www.vulncheck.com/advisories/dixell-copeland-xweb-evo-pre-authentication-os-command-injection-via-username) · [`🔗 NVD: CVE-2026-124002`](https://nvd.nist.gov/vuln/detail/CVE-2026-124002)

---

---

## 30. Claude is down for two hours — an authentication failure idles claude.ai, Claude Code, Console and Cowork, then resolves

- **Velocity:** ▮▮▮ trending
- **Source:** status.claude.com · 230+ pts on HN · 1.9h ago (~18:18 UTC+8)
- **Tags:** `outage` `anthropic` `claude-code`

Anthropic's status page opened incident `nn11wk485zfn` at **09:58 UTC**: "We are investigating an issue with users authenticating to Claude.ai and Claude Code." A fix deployed at **11:05 UTC** moved it to Monitoring, and **11:58 UTC** marked it Resolved — a two-hour authentication outage affecting claude.ai, the Claude Console (platform.claude.com), Claude Code and Claude Cowork. HN carried three threads at once (the status link at 230+ points, "Claude Is Down" at 118, and a Tell HN), with the usual mid-outage speculation about causes the status page never names.

**Why it matters:** The audience that feels a Claude outage hardest is agent fleets — a two-hour auth failure isn't lost chat history, it's thousands of mid-task coding-agent sessions stalled at their next API call. The recovery is the encouraging half: three status updates in two hours and a same-morning resolve, which is better incident hygiene than this week's Microsoft 365 wave below.

[`🔗 Claude status: incident nn11wk485zfn`](https://status.claude.com/incidents/nn11wk485zfn) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50481187)

---

## 31. "Bring back THE boss": Nvidia employees petition for Jensen Huang's return — 1,600+ comments on an internal suggestion-box post

- **Velocity:** ▮▮▮ trending
- **Source:** wired.com · 639+ pts on HN · 9.9h ago (~10:16 UTC+8)
- **Tags:** `nvidia` `industry` `leadership`

Since we covered the resignation in this morning's feed (item 1), the second act: WIRED (Paresh Dave and Zoë Schiffer, Nov 12 8:17 PM ET) reviews internal correspondence in which an internal "suggestion box" post — submitted by a longtime engineer *before* the resignation, urging the board to weigh employee sentiment — has drawn **more than 1,600 comments**, "the majority in full support of reinstalling him" ("If you believe in the mission, bring back THE boss"). One employee went further with a companywide email demanding transparency into the exit: "I stand by Jensen." Huang, 63, had led Nvidia since its founding in 1993 and wrote employees on Sunday that he had been "unfaithful to [his] wife" and that there was "no excuse". Nvidia and new board chair Harvey Jones didn't respond to WIRED's comment requests.

**Why it matters:** The resignation's open question is no longer whether he leaves but whether the interim regime (Kress as dual CFO/CEO, Jones as chair) holds legitimacy with the workforce — and the petition is a visible measurement of that. Watch the **Nov 17** earnings call: it's the first forum where the company must perform continuity while a large part of its employee base is on record wanting the ousted CEO back.

> "If you believe in the mission, bring back THE boss." — anonymous Nvidia employee, on the internal suggestion box

[`🔗 WIRED: 'Bring Back THE Boss'`](https://www.wired.com/story/nvidia-employees-petition-for-jensen-huangs-return/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50477231)

---

## 32. llama.cpp ships v1.0.0 — the b-number era gets a stable semver line, details promised at 3PM CET

- **Velocity:** ▮▮ rising
- **Source:** ggml-org/llama.cpp · v1.0.0 released 10:20 UTC (~18:20 UTC+8) · +176★ today on GitHub Trending
- **Tags:** `llama.cpp` `local-llm` `release`

ggml-org released **llama.cpp v1.0.0** at 10:20 UTC today, nine days after v0.9.0 (Nov 4) — alongside the usual nightlies (b12359/b12360) and a matching **ggml 1.0.0** bump. The release note is deliberately minimal: "New version has been released. … More info at 3PM CET" (14:00 UTC, *after* this feed's deadline), pointing at ggml discussion #1579 on "Releases and versioning of `ggml-org` projects" — ggml-org projects tag semver releases, while llama.cpp's b-numbers continue as nightly builds. The changelog since v0.9.0 is substantive on its own: server security fixes (an SSRF fix for the CORS proxy and media URLs, tool access via non-loopback addresses made explicit opt-in, MCP tool calls cancelled on client disconnect), plus an Intel FlashAttention Vulkan prefill kernel, a 4×4 `simd_gemm` tile on ARM NEON, fused `w_s` scale in CUDA MMQ epilogues for nvfp4 checkpoints, and Qwen3.5 tensor merging at convert time.

**Why it matters:** llama.cpp is the dependency underneath most local-LLM tooling, and downstreams have pinned to moving b-numbers for years — a 1.x semver line finally gives packagers a stable target. What "1.0" *means* is the open part: the promised 3PM CET note hasn't landed yet, so treat the semantics as announced, not released.

[`🔗 llama.cpp v1.0.0 release`](https://github.com/ggml-org/llama.cpp/releases/tag/v1.0.0) · [`🔗 ggml: Releases and versioning of ggml-org projects`](https://github.com/ggml-org/ggml/discussions/1579)

---

## 33. Microsoft 365 outage, hour 20: fixes "not going as expected", then "additional progress" — schools, GPs and Parliament still waiting

- **Velocity:** ▮▮ rising
- **Source:** bbc.com live · 355+ pts on HN · 7.1h ago (~13:08 UTC+8)
- **Tags:** `outage` `microsoft-365` `exchange-online`

Update to item 5: the outage that opened 16:17 UTC Nov 12 (EX1550543) is **still not fixed ~20 hours in**, with the BBC's live page (updated minutes before feed time) carrying the earlier headline "Attempts to Fix Global Outage Not Going 'as Expected'". By mid-morning UTC Microsoft said it was making "additional progress towards recovery", with priority "reducing email queues and backlogs", and repeated that the cause was not "a cyber-security breach". Impact reporting: **430 million** known Microsoft 365 users; UK GPs warning "there will be major problems NHS-wise", schools asking parents to phone instead of email, and the UK Parliament on "alternative communication arrangements".

**Why it matters:** Item 5's framing (fleet-consistency failure, health-check debt, a status page that flaked) now has its second half: a degradation that outlasts a full business day across mail, meetings, docs, Copilot and Defender. The recovery bottleneck — draining mail backlogs — is the observable to watch; a fix that "completes" while queues drain can look patched and still take another day to deliver.

[`🔗 BBC: Microsoft outage live updates`](https://www.bbc.com/news/live/cq5y10ge3dp3t) · [`🔗 HN: Microsoft Outlook/365 still down after 12 hours`](https://news.ycombinator.com/item?id=50478609)

---

## 34. TSMC files a 6-K on an employee-data leak — a cloud vendor's systems, and "no evidence that TSMC's systems have been compromised"

- **Velocity:** ▮▮ rising
- **Source:** sec.gov (Form 6-K) · 103+ pts on HN · 4.5h ago (~15:39 UTC+8)
- **Tags:** `tsmc` `data-leak` `third-party-breach`

HN titled it "TSMC Hacked" (103 pts); the primary source is narrower. TSMC's SEC **Form 6-K** (Nov 12, signed by CFO Wendell Huang) states that "some of our current and former employee data was made available on an external website without authorization", and — twice — what it does *not* claim: "Currently, we have found no evidence that TSMC's systems have been compromised", and the data "has been verified to match data stored in the system services of a cloud service provider, but is unrelated to the company's operations or customer-related data". TSMC says it is working with the cloud vendor, investigating authorities, and a third-party cybersecurity agency, and is notifying and supporting affected personnel.

**Why it matters:** The gap between the headline and the filing is the item: this reads as a third-party cloud-systems exposure of employee data, not a breach of the foundry — and the filing's own hedges (no evidence of system compromise, no customer data) are the facts no aggregator carried. The watch-item is which cloud vendor, and whether the "external website" copy gets taken down.

[`🔗 TSMC Form 6-K: Statement Regarding the Unauthorized Access of Employee Personal Data`](https://www.sec.gov/Archives/edgar/data/1046179/000104617926000800/a20261112statementregardin.htm) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50479721)

---

## 35. Brave Search API accepts agentic payments via x402 — pay per query in USDC, no API key

- **Velocity:** ▮ steady
- **Source:** brave.com · 129+ pts on HN · 9.0h ago (~11:08 UTC+8)
- **Tags:** `agentic-payments` `search-api` `x402`

Brave's blog (Nov 12): the Search API now supports "instant, pay-as-you-go, agentic payments enabled by the open x402 payment protocol", letting agents query Brave's independent index "and settle requests in real time, which eliminates the need for traditional API key management". The mechanics are the protocol's: "A request sent without payment receives an HTTP 402 Payment Required response that states the price of that search and the payment details needed to pay it. The agent signs a USDC payment for that amount and retries the request with the signed payment attached." Brave runs its own facilitator accepting USDC on the **Base** blockchain, with other networks and stablecoins "incoming soon"; no account or plan selection is required first.

**Why it matters:** Search is the highest-frequency paid primitive in agent stacks, and this is a major search index exposing per-request settlement natively over HTTP — the 402 flow removes provisioning and key management entirely, trading them for a funded wallet. It also gives x402 its first at-scale reference customer in search, which is the acceptance signal the protocol has been missing.

[`🔗 Brave: Search API agentic payments via x402`](https://brave.com/blog/search-api-agentic-payments/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50477649)

---

## 36. Google ships A2UI 1.0 — the first stable release of its generative-UI protocol for agents

- **Velocity:** ▮ steady
- **Source:** developers.googleblog.com · 42+ pts on HN · 34.5h ago (~09:42 UTC+8 Nov 12)
- **Tags:** `generative-ui` `agents` `protocol`

Google's A2UI team (PM Vishal Motwani, Nov 11): "Today, we're releasing A2UI 1.0, the first stable version of our open protocol for generative UI." Agents answer with interactive screens — a confirmation form, a chart — by describing what to show while **each app renders it with its own native components**: renderer SDKs for web, Android and iOS, agent SDKs for Python, TypeScript and Dart. The security model is allowlisting plus server binding — agents "place and configure only the components you register", and A2UI "reliably binds to your data and child components on the server, so sensitive values never reach the model". Composition is by "A2UI Express" or by "system one" decision models that "pick components instead of writing text", and the protocol works inside third-party assistants hosting MCP apps, "such as Gemini or Claude". "Companies such as Atlassian, Alation, Bloomberg, and ByteDance are already building with it."

**Why it matters:** Generative UI is consolidating around one shape: the agent emits a constrained spec, and the app renders natively. A2UI 1.0 is the widest-industry version of that bet, and the named adopters plus the SDK matrix (three renderers, three agent languages) make it the candidate standard to evaluate against. The component-allowlist-and-bind model is what makes model-driven UI shippable outside demos.

[`🔗 Google: A2UI 1.0`](https://developers.googleblog.com/a2ui-10-build-delightful-fast-reliable-agentic-experiences/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50461919)

---

## 37. Microsoft Defender uploaded a developer's unreleased builds 217 times in three months — under the "safe samples" default

- **Velocity:** ▮ steady
- **Source:** garrettstimpson.ca · 64+ pts on HN · 34.7h ago (~09:27 UTC+8 Nov 12)
- **Tags:** `defender` `telemetry` `windows`

Garrett Stimpson's post (Nov 11), while investigating a lagging connection with Hodometer (his per-process traffic tray tool): Defender's event log recorded "**217 sample submissions from my PC over three months. I hadn't seen a prompt for any of them**" — most of them builds of his own unreleased programs. `MpCmdRun.exe` "sent 224 MB to Azure storage in one day", in bursts of ~28 MB a minute; Event 2050 logs each submission with filename and SHA-256; 201 of the 217 were builds of the same Go test program, across 216 distinct hashes — fresh binaries, not re-uploads — and the busiest day saw 75 submissions. Windows' per-app data usage puts `MpCmdRun.exe` at **2.8 GB uploaded over 30 days, ~80% of the PC's uploads to Microsoft**. The default that permits it is "Send safe samples automatically", where "safe" means "unlikely to contain personally identifiable information". And the post's sharpest detail: on Oct 28 he ran `Set-MpPreference -SubmitSamplesConsent 2`; Event 5007 recorded the change to "never send" — and at 19:53 that evening, another entry recorded it flipped **back to 1** ("I don't know what changed it back"), with 25 uploads after re-enable.

**Why it matters:** The trust question isn't PII — it's that unreleased proprietary binaries leave the machine by default, with no prompt, under a setting most users don't know exists. For anyone building closed-source software on Windows, sample submission is a data-egress surface to audit; the post ends with how to check your own Defender Operational log.

> "Microsoft Defender Antivirus has uploaded a file for further analysis" — Event 2050, as quoted in the post

[`🔗 Garrett Stimpson: I caught Microsoft red-handed with Hodometer`](https://garrettstimpson.ca/posts/2026/11/11/caught-microsoft-red-handed-with-hodometer/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50461786)

---

## 38. FrankenPHP gets 14 CVE records in one drop — worker-mode state leaks, a dot-header auth bypass, and a 9.8 for stale Docker base images

- **Velocity:** ▮ steady
- **Source:** NVD records (CNA: VulnCheck) · published 10:18 UTC Nov 13 (~1.9h ago)
- **Tags:** `frankenphp` `php` `security`

VulnCheck's CNA published **14 records** (CVE-2026-128014 through -128027) this morning for `php/frankenphp`, the project that embeds PHP into a Go binary. The top score, **CVE-2026-128027 (9.8)**, is not a code flaw but a build-process gap: "FrankenPHP Docker images before 1.1.11 were rebuilt only when new base image tags were created, so security fixes that Alpine, PHP, and Go applied under existing tags were not propagated." **CVE-2026-128014 (8.1)** hits the standalone static binaries — they bundle the PHP brotli extension linked against Brotli 1.2.0, whose decoder has an out-of-bounds write (the underlying CVE-2026-111497). **CVE-2026-128023 (7.4)** is an authentication bypass via dot-form headers: clients send `X.Authenticated.User`-style names that PHP rewrites to underscore `$_SERVER` keys, spoofing user identity, client IP or scheme. The rest is a worker-mode family — `putenv()` writing to the process-wide OS environment so secrets like database passwords leak across concurrent requests (6.4), per-request env vars surviving on a thread (4.8), libxml error state leaking between clients (3.7), a SplTempFileObject stream use-after-free (6.5) — plus a DoS set. Every score is **VulnCheck's own CVSS 3.1** (Primary, CNA-assigned) and every NVD record sits at `Deferred`. The fixes shipped across 1.13.0–1.13.4 (Oct 4–Oct 26), with 1.13.5 on Nov 5 — the records landed a month behind the patches.

**Why it matters:** Worker mode is FrankenPHP's selling point, and the family's shape — request state persisting across requests on a shared thread — is a tenant-boundary failure, the class that becomes a cross-user leak in production. Run **≥ 1.13.4** (1.13.5 current) and, because of the 9.8, verify your deployed Docker images actually rebuilt rather than assuming a base-tag pull picked up the fixes.

[`🔗 NVD: CVE-2026-128023 (dot-header auth bypass)`](https://nvd.nist.gov/vuln/detail/CVE-2026-128023) · [`🔗 GHSA-x9p2-77v6-6vhf (stale Docker base images)`](https://github.com/php/frankenphp/security/advisories/GHSA-x9p2-77v6-6vhf)

---

## 39. HermesEnabler: the sideloaded watch app that unlocks Apple's Hermès faces on any Apple Watch — 218★ today, re-pinned to watchOS 27 betas

- **Velocity:** ▮ steady
- **Source:** pookjw/HermesEnabler · 1,699★, +218 today on GitHub Trending
- **Tags:** `watchos` `sideloading` `apple`

`pookjw/HermesEnabler` sits at #4 on today's GitHub Trending, and the trigger is Apple's own release train: **1.5.2** (Nov 12) added watchOS 27.0 beta 3 support, **1.5.3** (Nov 13 01:34 UTC) added "support for watchOS 27.0 RC (24R363) and 27.2 beta 1 (24S5086l)", and **1.5.4** (Nov 13 04:21 UTC) added Vietnamese localization — three releases in two days. The mechanism, per the README: sideload an IPA (an iPhone host app plus a `HermesEnabler2` watch app) via Sideloadly or Xcode — or WatchBridge on Windows — enable Developer Mode on both devices, then run the app on the Watch; supported range is "watchOS 27.0 through 27.3 beta 1". The README documents the friction honestly: a known Sideloadly 0.72 bug that strips the embedded watch app while signing, developer-cert trust steps, and an unsigned Windows helper.

**Why it matters:** It is the watchOS face of the sideload-everything pattern, and its release history doubles as a maintenance-cost estimate: every Apple beta breaks it, and every release re-pins exact build numbers (24R363, 24S5086l). Read it as a field report on how far unsigned developer-mode tooling currently goes on watchOS — and what shipping against unreleased Apple OSes actually costs.

[`🔗 pookjw/HermesEnabler`](https://github.com/pookjw/HermesEnabler) · [`🔗 Releases (1.5.2–1.5.4)`](https://github.com/pookjw/HermesEnabler/releases)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-13T12:28:15Z |
| Items | 39 |
| Sources tracked | 29 (Hacker News, GitHub Trending, NVD, status pages, SEC filings, vendor advisories, vendor blogs, research pages) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[Previous day](2026-11-12.md) · [Raw .md](latest.md) · [Archive](../archive/index.md)
