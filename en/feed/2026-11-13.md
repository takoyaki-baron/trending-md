---
date: 2026-11-13
updated: 2026-11-12T20:33:45Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 18
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

**Why it matters:** Most tiny-device LLM posts cherry-pick a benchmark; this one publishes its own failures (a dense 9B manages 0.27 tok/s) and an honest cross-model quality metric, and the finding that "bigger only helps on this box when the model is also better" is the actual state of the art for the $30-device fleet the world actually owns.

> "Every claim is measured on the hardware itself." — smolmaxxing README

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

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-12T20:33:45Z |
| Items | 20 |
| Sources tracked | 18 (Hacker News, GitHub Trending, NVD, vendor advisories, vendor blogs, research pages) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[Previous day](2026-11-12.md) · [Raw .md](latest.md) · [Archive](../archive/index.md)
