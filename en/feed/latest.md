---
date: 2026-11-13
updated: 2026-11-13T04:29:26Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 26
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

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-13T04:29:26Z |
| Items | 29 |
| Sources tracked | 26 (Hacker News, GitHub Trending, NVD, cveawg, vendor advisories, vendor blogs, research pages) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[Previous day](2026-11-12.md) · [Raw .md](latest.md) · [Archive](../archive/index.md)
