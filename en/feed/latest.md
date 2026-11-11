---
date: 2026-11-12
updated: 2026-11-11T20:41:58Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 21
license: CC-BY-4.0
---

# trending.md — 2026-11-12

## 1. AWS ships its own local AWS emulator — in Rust, under the official org, with a Werner Vogels essay attached

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 306+ pts · 1.7h ago (~02:45 UTC+8)
- **Tags:** `aws` `emulator` `local-development`

Amazon put **aws/aws-emulator** — "a local emulator of the AWS APIs" — into its official GitHub org, and the HN thread crossed 300 points within two hours. It is a Rust Cargo workspace with "one crate per service" driven by the same Smithy models that define AWS's wire protocols; it serves HTTPS on `127.0.0.1:9297` with a self-signed cert, and the AWS CLI or any SDK can be pointed at it with environment variables. There is also an **embedded mode** — a Rust dev-dependency that runs one isolated in-process instance per test — and an agent hook: `aws agent-toolkit add-skill` installs it as a coding-agent skill. The README is unusually blunt: "Don't use it for production workloads or to test security", fidelity scores are published per release, building from source needs ~100 GB of disk, and "This repository does not take PRs." Werner Vogels published a companion essay the same day framing the emulator around what engineering means "when agents write the code".

**Why it matters:** Localfirst AWS emulation has been third-party territory (LocalStack et al.) for a decade; an official, CC0-licensed, Smithy-driven emulator changes the default for CI and testing — and the embedded-mode-per-test design plus the agent-toolkit skill shows Amazon building it agent-first, not just dev-first. The telemetry-on-by-default default and the no-PRs policy are the two details to read closely.

> "AWS Emulator is a local emulator of the AWS APIs" … "Don't use it for production workloads or to test security." — README

[`🔗 aws/aws-emulator`](https://github.com/aws/aws-emulator) · [`🔗 Vogels: AWS Emulator and the engineer's job`](https://www.allthingsdistributed.com/2026/11/aws-emulator-and-the-engineers-job-when-agents-write-the-code.html) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50456631)

---

## 2. Google SWE points 48 AI agents at NASA lidar — and the "unmapped Maya pyramid" turns out to be a rediscovery

- **Velocity:** ▮▮▮ trending
- **Source:** pietromiotti.com · 843 pts on HN · 8h ago (~20:20 UTC+8 Nov 11)
- **Tags:** `ai-agents` `lidar` `archaeology`

Pietro Miotti's writeup — the biggest HN story of the day at 843 points — describes going from "a random thought while traveling" in Peru (Oct 18) to an official reply from Mexico's INAH in **less than 72 hours**: ~1,200 km² of public NASA lidar over the Maya region, analyzed overnight by **48 agents** that visually inspected lidar strips rendered as images ("There was no special model or classifier involved: the agents literally looked at the pictures"). They flagged a hilltop site — leveled plaza, oval pyramid 8–12 m tall, raised courtyard, possible rainwater reservoir — that INAH's registry confirmed as unregistered on Oct 21. **The Nov 11 update is the part the headline omits:** archaeologists pointed out the same site was already published in **Estrada-Belli et al. 2025** — "they rediscovered it rather than discovered it (it just wasn't in INAH's register yet)."

**Why it matters:** The workflow (agents reading rendered sensor imagery, a same-week official registry check) is real and repeatable — but the post's own update is a case study in why agent-found "discoveries" need a literature search before a press cycle. The feed's headline-grade claim collapsed in one day; the INAH-registry gap (published science not reaching the official register) is the durable, checkable finding.

> "One major village doesn't seem to have been registered." — the post, before the Nov 11 update

[`🔗 Pietro Miotti: the Maya site`](https://pietromiotti.com/latest/maya-site/?maya) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50452455)

---

## 3. Tim Peters has died — Python's Zen, Timsort, and its earliest co-designer

- **Velocity:** ▮▮▮ trending
- **Source:** discuss.python.org · 454 pts on HN · 13h ago (~15:30 UTC+8 Nov 11)
- **Tags:** `python` `community` `timsort`

Guido van Rossum opened the Python core-developer forum's memorial thread: "I am immensely sad to announce that Tim Peters has died … earlier this year on July 15." Peters (1952–2026) wrote the **Zen of Python** (`import this`), invented **Timsort** in 2002 — Python's list sort, later adopted by Java and Android — and, before any of it, was the community's second real user: he convinced Guido that `int`/`float` arithmetic should mix, polished **pymalloc**, optimized the dict implementation, refined the cyclic garbage collector and generators, and wrote **doctest, difflib, pickletools and tabnanny**. He worked on supercomputer compilers at Cray Research and speech recognition at Dragon Systems, served as a PSF Director from 2001 to 2014, and answered thousands of mailing-list posts as "Timbot" — Guido signed the announcement "Python-would-not-be-what-it-is-today-without-Tim-ly y'rs".

**Why it matters:** Much of what makes Python feel like Python — the sorting algorithm in every Android phone, the design aphorisms every developer can recite — is one person's twenty-year contribution. The thread is also a rare first-hand archive: core developers recalling specific decisions, from mixed numeric arithmetic to pymalloc, in one place.

> "I am immensely sad to announce that Tim Peters has died … It's hard to overestimate Tim's influence on Python." — Guido van Rossum

[`🔗 In memoriam: Tim Peters (1952–2026)`](https://discuss.python.org/t/in-memoriam-tim-peters-1952-2026/110028) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50450488)

---

## 4. SSH keys that malware can't copy: the Secure Enclave guide with stock macOS tools — and an honest verdict against itself

- **Velocity:** ▮▮ rising
- **Source:** gatezh.com · 366 pts on HN · 15.6h ago (~12:50 UTC+8 Nov 11)
- **Tags:** `ssh` `macos` `secure-enclave`

Serge Gatezh's guide keeps SSH private keys inside the Mac's Secure Enclave with **no third-party software**: `sc_auth create-ctk-identity -k p256-ne -t bio` mints a non-exportable P-256 key, and `ssh-keygen -w /usr/lib/ssh-keychain.dylib -K` produces a "key handle" file — explicitly **not** the key, just a pointer telling SSH to ask the Enclave to sign. The threat model is the ordinary one: "Any malicious script that gets access to my filesystem could just copy them and get into all my servers"; the target property is "The private key should literally be impossible to extract, even if my Mac is fully compromised." The honest part is the verdict: despite it being fully functional, he **abandoned the native approach for Secretive** because the Touch ID prompt reads "ctccardtoken needs to authenticate to continue" — "it ended up plain ugly and I can't live with that."

**Why it matters:** Exfiltrate-the-`.ssh`-directory is one of the lowest-effort attacks there is, and this documents the entire no-dependency path — including the traps (the handle is not the key; `ssh-add -K` guides are deprecated; the filename must be wired into `~/.ssh/config`). The unavoidable trade is stated plainly: **no backups** — "If your Mac dies, the keys die with it", so every server also needs a separate recovery key.

[`🔗 gatezh.com: Protecting SSH Keys with macOS Secure Enclave`](https://gatezh.com/posts/macos-secure-enclave-ssh-keys/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50449748)

---

## 5. The Verge asked 11 TV makers 17 questions about spying — three answered everything, Hisense ignored the emails

- **Velocity:** ▮▮ rising
- **Source:** The Verge · 304 pts on HN · 6h ago (~22:20 UTC+8 Nov 11)
- **Tags:** `privacy` `acr` `tv`

The Verge invited Amazon, Apple, Google, Hisense, LG, Panasonic, Roku, Samsung, Sony, TCL and Walmart's Vizio to answer 17 questions on **automatic content recognition** — what the TV watches, what leaves the house, and whether opting out actually stops it. "We now have answers from the top three TV manufacturers as well as every major streaming device company. Some companies declined to answer," and "(One company, Hisense, ignored our emails entirely.)" The sharpest data point is external: a Northeastern University study found **Walmart's Vizio kept sending data after an opt-out** — which Vizio called "routine operational data used to support the Vizio experience", not ACR — while traffic to Samsung and Roku "was limited, but not stopped completely."

**Why it matters:** ACR is the reason a cheap TV is cheap, and the piece's structure — the same 17 questions, answered side by side, with refusals named — turns marketing language into a comparable table. The opt-out finding is the actionable part: agreeing to ACR during setup is recoverable in settings, but "opting out might not be as effective as it should be."

[`🔗 The Verge: 17 questions for TV manufacturers`](https://www.theverge.com/tech/1012372/tv-privacy-acr-questions) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50453474)

---

## 6. A false smoke alarm almost drowned Jane Street's only NYC datacenter — the sprinklers were 6.4°F away

- **Velocity:** ▮▮ rising
- **Source:** michael.bacarella.com · 270 pts on HN · 3.4h ago (~01:05 UTC+8)
- **Tags:** `infrastructure` `incident-report` `datacenter`

Michael Bacarella's incident report: contractors' dust in a prep room set off the smoke alarm, which **shut down the CRAC cooling units** (circulating air feeds fires) and pressurized the sprinkler pipes over ten rows of cabinets. Sprinkler heads only discharge when ambient heat melts a thermal plug at ~150°F — so with cooling off, the room coasted toward water-on-servers while **no monitor alerted**: per-server heat warnings were unconfigured because "that happens from time to time." The save was human and lucky — someone in the Hong Kong office happened to see "server after server … popping up a climbing temperature condition", called the author, who walked 9 minutes and yanked power cables "row by row, cabinet by cabinet" as his screen read "141 F. 142. 143. 143.5. 143.6."

**Why it matters:** The failure was a safety interlock designed for humans killing machines meant for machines: the alarm's fire response is exactly wrong for a server room. The fix is a lesson for anyone running a closet datacenter — he now polls each server's **onboard** temperature sensors every minute from a small OCaml monitor, because "unknown unknowns can still ruin you" and the fleet itself is the sensor that can't be misconfigured silent.

> "141 F. 142. 143. 143.5. 143.6" — the last readings before the yank

[`🔗 False smoke alarm at the Jane Street datacenter`](https://michael.bacarella.com/2026/11/10/false-smoke-alarm-jane-street-datacenter/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50455394)

---

## 7. Apple's Support Community goes read-only, closes for good on November 20

- **Velocity:** ▮▮ rising
- **Source:** The Verge · 244 pts on HN · 6h ago (~22:25 UTC+8 Nov 11)
- **Tags:** `apple` `support` `community`

Apple has placed its Support Community forum — the user-to-user troubleshooting board that has accumulated two decades of fixes, error-code decode threads and workaround archaeology — into **read-only mode**, with a banner announcing closure: "The Apple Support Community will permanently close on November 20, 2026. Starting today, the site will no longer accept new posts and is available in a read-only state." Apple's message points users to "trusted guidance and support on the official Apple Support site" — the curated KB, not the community corpus.

**Why it matters:** Forum threads are the unindexed infrastructure of technical support — the place obscure kernel panics and migration bugs get decoded by volunteers — and the announcement says nothing about export, archive, or redirects for the existing threads. After November 20, the answers to a long tail of Apple problems will exist only in search-engine caches and the Wayback Machine, which is exactly the kind of loss that shows up years later as a bug nobody can reproduce.

[`🔗 The Verge: Apple is killing its Support Community forum`](https://www.theverge.com/tech/1031507/apple-community-support-forum-shutting-down) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50453555)

---

## 8. Hyper-realistic sand in WebGL2: 460,000 grains, real units, and silence when nothing moves

- **Velocity:** ▮▮ rising
- **Source:** av/safe-sand · 222 pts on HN · 6.4h ago (~22:05 UTC+8 Nov 11)
- **Tags:** `webgl2` `graphics` `physics`

A phone-screen sand toy that treats realism as an engineering spec: **100k–460k individual grains** simulated on the GPU in WebGL2 "in real units (millimetres, 9.81 m/s²), so how fast sand moves and how much it lags matches the real thing." Each grain carries its own size, mineral colour and friction; isolated grains roll while bulk sand holds until tilt passes its **angle of repose**; a per-frame height field supplies pile slope forces, self-shadowing and ambient occlusion. The audio is synthesized from how much sand is actually moving — thousands of tiny 2–8 kHz clicks — and "when nothing moves, the output is exactly silent." Quality degrades in steps (DPR 3→2→1.5, then fewer grains) when frames run slow, distinguishes a 30 fps OS cap from real overload first, and "never steps back up during a session."

**Why it matters:** This is a compact masterclass in physical simulation on mobile GPUs — real-unit dynamics, per-grain material properties, and an honest adaptive-quality ladder — shipped as a static site with no build step. It's also the rare consumer demo whose README documents its own quality-state machine (`window.sand.info().quality`) so you can inspect the adaptation instead of guessing at it.

[`🔗 Safe Sand (open on a phone)`](https://av.github.io/safe-sand/) · [`🔗 av/safe-sand`](https://github.com/av/safe-sand) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50453288)

---

## 9. The 8-hour agent edit, replaced by two LP solves: weight-space programming gets its classical-algorithm check

- **Velocity:** ▮▮ rising
- **Source:** nathan.rs · 199 pts on HN · 7.6h ago (~20:50 UTC+8 Nov 11)
- **Tags:** `interpretability` `optimization` `weight-editing`

Nathan Barry revisits "weight-space programming" — the MIT CSAIL term for a model reading or writing raw weights ("No gradients, no training loop, just reasoning about what the weights compute") — and observes that GPT-6 Astra's celebrated weight edit was mostly **solving a linear program by trial and error**: ~8 hours and 28 forward passes to choose which `down_proj` columns to change. Reformulating that choice as an explicit L1-minimization LP (sparse `v`, solved by a custom GPU PDHG solver in ~1 minute) replaces the agent's search: "A couple of LP solves, about a minute each, do the same job with 8× fewer changed weights." On Qwen3.5-0.8B's thinking-loop pathology (93% of MATH-500 answers hitting the 32,768-token cap), the LP edit matches Astra's within noise — GSM8K 69.6 vs 68.2, MATH-500 51.7 vs 50.9 — while changing 16,291 weights instead of 130,188. Bonus: the edit is nearly a constant push, so a plain inference-time steering vector "recovers essentially the whole fix."

**Why it matters:** The post is a template for evaluating agentic-results claims: reproduce what the agent actually searched for, notice it is a classical optimization problem, and check whether the algorithm beats the agent. The author's own caveats cut the right way — "This is one model", the layer choice still came from Astra, and the loop fix turned out to not even need per-token constraints — so read it as one careful data point, not a general result.

[`🔗 Can a Linear Program Do Weight-Space Programming?`](https://nathan.rs/posts/weight-space-lp/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50452655)

---

## 10. Atuin Threads: every agent session, every machine, one searchable encrypted log

- **Velocity:** ▮▮ rising
- **Source:** Atuin · 142 pts on HN · 5.9h ago (~22:30 UTC+8 Nov 11)
- **Tags:** `agents` `cli` `sync`

Atuin — the shell-history tool — shipped **Threads** in 18.24+: "one searchable, synced history for every agent session, on every machine." The pitch is cross-harness resumption — "Start a task in Claude Code, then resume it in Codex on another machine" — plus **forking** a session "just like a Git branch," and an MCP server (`atuin mcp install claude/codex/pi/opencode`) so agents can search prior sessions themselves to recover intent and abandoned work. Architecturally it leans on the existing sync engine: "It's generic, and can sync anything that can be modelled as an append-only log," and "Threads is end-to-end encrypted when synced, so we can't read your sessions." Capture is opt-in; supported harnesses today are Claude Code, Codex, Pi, Omp and OpenCode.

**Why it matters:** Agent sessions are currently the least portable artifact in the toolchain — trapped per-harness, per-machine — and every harness vendor's answer so far has been its own walled format. A harness-agnostic, append-only, E2E-encrypted session layer is the neutral position this feed's memory-format survey called for; the open question is whether harness vendors adopt it rather than re-arguing session formats per vendor.

[`🔗 Atuin: Threads — agent sessions`](https://blog.atuin.sh/threads-agent-sessions/) · [`🔗 atuinsh/atuin`](https://github.com/atuinsh/atuin) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50453637)

---

## 11. Google's Gemini Decisions API: a model that returns probabilities, not text — 1,000 questions, one forward pass

- **Velocity:** ▮▮ rising
- **Source:** Google · fresh on HN · 1.6h ago (~02:50 UTC+8)
- **Tags:** `google` `gemini` `routing`

Google introduced the **Gemini Decisions API** (Nov 11), a new endpoint on **gemini-decision-1** for "fast, closed-set decisions powered by our new Gemini Decision 1 model" — bounded choices like tool selection, policy checks, model routing and context grading. One multimodal input (up to 256K tokens) can be paired "with up to 1,000 independent questions" in three shapes: **noul** (yes/no probability), **choice** (2–255 candidates with normalized probabilities), and **score** (ordered rubric). Instead of generating tokens, the model responds with "probabilities and confidence scores in 150-250 ms end-to-end latency" via a single forward pass, with latency "nearly flat from 1 to 100 questions per request." Pricing is "$0.10 per 1M input tokens with zero output tokens billed" — input billed once per request no matter how many questions — and the post claims "nearly 5x cheaper across the shared benchmark suite than Gemini 3.5 Flash-Lite."

**Why it matters:** This productizes the decision-model pattern this feed has tracked twice from the user side (Amazon's 44×-cheaper ticketing router, the calibrated-ambiguity-band escalator): routing, policy checks and context grading as a dedicated primitive with confidence scores for fallback. The benchmark claim is Google's own suite — treat the 5× as a vendor number until someone replicates the routing benchmarks independently.

[`🔗 Google: Gemini Decisions API`](https://blog.google/innovation-and-ai/technology/developers-tools/gemini-decisions-api/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50456791)

---

## 12. MongoDB drops 26 CVE records in one wave — a 9.0 replication UAF, and a macOS TLS bypass whose 4.0 score is 1.7 points higher than its 3.1

- **Velocity:** ▮▮ rising
- **Source:** MongoDB · 26 NVD records · Nov 10 (~04:18 UTC+8 Nov 11)
- **Tags:** `mongodb` `cve` `database`

MongoDB's CNA published **26 records** under source `cna@mongodb.com` on NVD on Nov 10 (counted by source, not keyword — every score its own), all still `Awaiting Analysis`. The top of the table: **CVE-2026-118383, a 9.0** use-after-free in replication (network vector, `S:C` scope change), **CVE-2026-120824, an 8.8** UAF in time-series collections (`PR:L`), and **CVE-2026-120815, an 8.4** incorrect-authorization in the authorization subsystem. The rest is a UAF family across the engine — SBE window-function accumulators, plan cache, server-side JavaScript, aggregation framework — plus Kerberos/SSPI and X.509 cluster-membership guards. One record is a small CVSS seminar: **CVE-2026-120808**, the macOS TLS client bypassing chain-of-trust validation for IPv6 peers under the Apple SecureTransport backend, carries **7.4 on CVSS 3.1 and 9.1 on CVSS 4.0** from the same CNA.

**Why it matters:** Every record links to a `jira.mongodb.org` ticket (SERVER-130681, SERVER-134872, SERVER-136505, SERVER-138119/138175 …), so affected-version questions are answerable one hop from the record — check the ticket for your branch before deciding the wave is cosmetic. And quote the 120808 score with its version: the 3.1 and 4.0 numbers describe the same bug through different frameworks' scope conventions.

[`🔗 NVD: CVE-2026-118383 (9.0)`](https://nvd.nist.gov/vuln/detail/CVE-2026-118383) · [`🔗 NVD: CVE-2026-120808 (macOS TLS)`](https://nvd.nist.gov/vuln/detail/CVE-2026-120808) · [`🔗 SERVER-138119`](https://jira.mongodb.org/browse/SERVER-138119)

---

## 13. Black Ops II statically recompiled to native ARM64 macOS — no Wine, no game files, from your own Steam copy

- **Velocity:** ▮ steady
- **Source:** adrbn/bo2-mac · 126 pts on HN · 15.1h ago (~13:25 UTC+8 Nov 11)
- **Tags:** `static-recompilation` `macos` `reverse-engineering`

A Show HN that joins the static-recompilation lineage this feed has tracked (NFS:U2 in the browser, BO2 now): **adrbn/bo2-mac** rebuilds Call of Duty: Black Ops II "from 32-bit x86 Windows to native ARM64 macOS" — **Remill lifts x86-32 to LLVM 17 IR**, a hand-written Win32 runtime replaces the OS layer, and Direct3D 11 is drawn by Metal, with **no Wine** and **no game files** in the repo (you bring your own Steam copy). Reported results on an Apple M1: campaign 51–60 fps, Zombies 57–60, multiplayer-vs-bots 53–60. The repo went up Nov 3 and the README documents the pipeline, findings, and roadmap sections; a Chinese README rides along.

**Why it matters:** Static recompilation keeps winning as the answer for legacy 32-bit Windows titles on Apple Silicon, where Wine-on-ROSETTA stacks pay a double translation tax. The trade is the same as always: a per-title, legally gated artifact built from your own copy — but the documentation of the lift-to-Metal pipeline makes it a reference for the next porter.

[`🔗 adrbn/bo2-mac`](https://github.com/adrbn/bo2-mac) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50449891)

---

## 14. Auth0's own RAG retrievers leaked documents FGA had denied — two SDK CVEs hit the permission-aware-AI pattern

- **Velocity:** ▮ steady
- **Source:** Okta · 4 NVD records · Nov 10 (~05:17 UTC+8 Nov 11)
- **Tags:** `auth0` `rag` `authorization`

Okta published four records on Nov 10, two of them aimed at the exact pattern that permission-filtered retrieval promises: **CVE-2026-107372** (`auth0-ai-js`) and **CVE-2026-108167** (`auth0-ai-python`) — the FGA retriever "does not distinguish between authorization checks under different users, relations, or conditions when filtering documents during retrieval-augmented generation, resulting in documents denied by Auth0 FGA being included in the model context and used in the generated response." The companion pair: **CVE-2026-126128**, the Management API client in the Node SDK mis-neutralizing path parameters, "allowing a request and its attached management API token to be redirected to an unintended endpoint on the same tenant", and **CVE-2026-126129**, the ASP.NET Core SDK accepting a logged-out session because it "incorrectly determines a session's OIDC Back-Channel Logout status." The NVD records carry no CVSS — Okta's advisories live at trust.okta.com.

**Why it matters:** Permission-aware retrieval is the standard answer to the problem of keeping the model from reading what the user cannot, and these bugs are that answer's own vendor shipping the failure mode: an authorization filter that checks *whether* access is allowed but not *whose*. If you wrap any FGA/ReBAC engine behind a RAG retriever, the same shape — check correctness independent of caller identity — is the thing to test.

[`🔗 Okta advisory: auth0-ai-js (CVE-2026-107372)`](https://trust.okta.com/security-advisories/improper-access-control-in-auth0-ai-js-document-retrieval-cve-2026-107372) · [`🔗 NVD: CVE-2026-108167`](https://nvd.nist.gov/vuln/detail/CVE-2026-108167)

---

## 15. Yogurt: a free, private, open-source Granola alternative that records without a meeting bot

- **Velocity:** ▮ steady
- **Source:** FrigadeHQ/yogurt · 93 pts on HN · 4.5h ago (~23:55 UTC+8 Nov 11)
- **Tags:** `meeting-notes` `privacy` `open-source`

A Show HN from Frigade: **Yogurt** — "Private AI meeting notes. Free and open source." (MIT) — records your calls locally "without adding a bot to the meeting," then produces summaries with next-steps-by-person. Ships as desktop apps for Mac (Apple Silicon), Windows (x64) and Linux (AppImage), needing 8 GB of RAM; the repo went public Nov 10 and is already at 232 stars. The positioning is directly against the paid, cloud-hosted notetakers (Granola, Otter, Fireflies): no bot joins the call, and the notes don't leave your machine.

**Why it matters:** Meeting-note AI has been one of the fastest-monetizing AI categories, on the promise of convenience at the price of a recorder in every call and transcripts on someone's cloud. An MIT-licensed local alternative changes the default calculus for anyone whose meetings touch anything confidential — and the Show-HN traction (90+ points in hours) says the demand is there.

[`🔗 FrigadeHQ/yogurt`](https://github.com/FrigadeHQ/yogurt) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50454625)

---

## 16. Apple's amortized MIPS: tiny networks that learn where your vector DB's best key lives

- **Velocity:** ▮ steady
- **Source:** Apple ML Research · 86 pts on HN · 3.1h ago (~01:15 UTC+8)
- **Tags:** `rag` `retrieval` `mips`

Apple's "Faster Retrieval for Better, More Efficient RAG" highlights work from an ICML 2026 paper on **amortizing maximum inner product search**: instead of a query-agnostic index, train small networks offline for a fixed key database, exploiting the fact that MIPS realizes the *support function* of the key set, whose gradient returns the best match. Two instantiations: **SupportNet** — input-convex networks that replace centroid routing in IVF indexes (95% routing recall ~1.9× faster than centroid routing, 1.74 ms vs 3.36 ms) — and **KeyNet**, which directly predicts the best-matching key as a "query rewriter" in front of a standard index (99% recall "takes up to ~8× less time with the largest model (0.23 ms vs 1.8 ms)", or ~11× fewer keys scanned). Trained on Natural Questions (~2.6M passages).

**Why it matters:** For a fixed, hot corpus — the common RAG case — amortizing the search itself is a different trade than buying a bigger ANN index, and the numbers are concrete. The stated limits decide applicability: the approach presumes a known, "stable, well-characterized query distribution" and pays a per-database training cost, so this is a technique for production corpora you query the same way all day, not a drop-in index swap.

[`🔗 Apple ML: Faster Retrieval for Better, More Efficient RAG`](https://machinelearning.apple.com/research/faster-retrieval) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50455633)

---

## 17. OpenSSL publishes five CVE records — two QUIC memory bugs, a CMS infinite loop, and an AES-GCM-SIV pair

- **Velocity:** ▮ steady
- **Source:** OpenSSL · 5 NVD records · Nov 10 (~03:21 UTC+8 Nov 11)
- **Tags:** `openssl` `quic` `cve`

OpenSSL's CNA published five records on Nov 10, all `Awaiting Analysis`, none carrying a CVSS score on the record. **CVE-2026-107496**: "Encrypting a CMS message to an EC certificate whose group order is 1 may cause CMS_encrypt() … to loop indefinitely" — a DoS any application performing CMS encryption inherits from a supplied recipient certificate. The QUIC pair: **CVE-2026-88822**, where automated peer detection "may allow uninitialized stack data to leak into the received address which is then used as the destination for outgoing packets", and **CVE-2026-95691**, "a retransmitted QUIC CRYPTO frame can release packet storage while the TLS record layer retains a direct pointer into that storage causing use after free" — a malicious server triggering a heap-UAF read in the OpenSSL QUIC client. The AES-GCM-SIV pair: a zero-length AAD update treated as a reset (**CVE-2026-88823**) and a short IV causing a heap out-of-bounds read (**CVE-2026-95692**).

**Why it matters:** Every record carries direct fix commits in its references, so the question for operators is which branches you run — the QUIC client UAF and the CMS loop are reachable from untrusted input in the common configurations. The records' own prose is precise about reachability ("a malicious QUIC server can cause a heap-use-after-free read"), which makes branch triage mechanical rather than guesswork.

[`🔗 NVD: CVE-2026-95691 (QUIC UAF)`](https://nvd.nist.gov/vuln/detail/CVE-2026-95691) · [`🔗 Fix commit dd90ceb`](https://github.com/openssl/openssl/commit/dd90ceb99a3c2ddba336bb4a00be9ebabd84c2a1)

---

## 18. Intel's TDX migration trust domain fails its own protocol three ways — three 9.x records in one advisory

- **Velocity:** ▮ steady
- **Source:** Intel SA-01580 · 3 NVD records · Nov 10 (~02:17 UTC+8 Nov 11)
- **Tags:** `intel` `tdx` `confidential-computing`

Intel's SA-01580 covers three vulnerabilities in the **TDX Migration Trust Domain (MigTD)** — the component that attests a trusted VM's migration between hosts in confidential computing — each scored by Intel's CNA on CVSS 4.0 and each an escalation-of-privilege "within Ring 0: Hypervisor": **CVE-2026-61887 (9.4)**, "missing critical step in authentication in the MigTD SPDM rebind implementation" against a **network adversary with an unauthenticated user**; **CVE-2026-44685 (9.3)**, authentication bypass by spoofing in the rebinding protocol; and **CVE-2026-61473 (9.2)**, authentication bypass by capture-replay. None of the three had been analyzed by NVD at this run's read (CVE-2026-44685 `Awaiting Analysis`, the other two `Received`) — the numbers are Intel's own.

**Why it matters:** Confidential computing's security story rests on the attestation handshake, and these bugs are precisely in the rebind/authentication steps of the *migration* path — the moment a live VM proves what host it may move to. If you run TDX with live migration, the advisory is the patch source; if you model trust for confidential VMs, this is the reminder that the migration channel is part of the TCB.

[`🔗 Intel SA-01580`](https://intel.com/content/www/us/en/security-center/advisory/intel-sa-01580.html) · [`🔗 NVD: CVE-2026-61887`](https://nvd.nist.gov/vuln/detail/CVE-2026-61887)

---

## 19. herdr: a 50k-star Rust runtime where coding agents live in restored, watchable terminals

- **Velocity:** ▮ steady
- **Source:** GitHub Trending weekly · +2,196 this week · 50.3k stars
- **Tags:** `agents` `terminal` `rust`

**herdrdev/herdr** sits at 50,277 stars and +2,196 this week on the trending board: "the runtime your coding agents live on." It is a background server that keeps agent terminals alive when you close the client or lose SSH, restores the saved layout after a machine restart (the original processes do not survive), and marks **every pane working, blocked, or idle** — "when an agent stops and needs an answer, herdr says so." It is explicitly agent-native: agents drive it through a CLI and socket API to "spawn panes, prompt each other, and wait until another agent is genuinely blocked," and it runs what you already run — Claude Code, Codex, Cursor, OpenCode, Grok — owning their terminals rather than replacing them. One Rust binary, no Electron, Apache-2.0, tmux-style prefix keys and mouse both first-class, plugins via a marketplace.

**Why it matters:** The emerging multi-agent workflow needs a process supervisor that understands *agents* — the blocked-vs-working distinction and agent-to-agent prompting are exactly what tmux lacks — and herdr's numbers say the demand is real. The honest note in its own README ("the original processes do not survive" a restart) is the boundary between terminal persistence and session persistence, which is what the Atuin Threads item above is for.

[`🔗 herdrdev/herdr`](https://github.com/herdrdev/herdr) · [`🔗 herdr.dev docs`](https://herdr.dev/docs/)

---

## 20. Addy Osmani's agent-skills crosses 115k stars — nine lifecycle commands from /spec to /ship

- **Velocity:** ▮ steady
- **Source:** GitHub Trending daily · +788 today · 115.8k stars
- **Tags:** `agent-skills` `claude-code` `engineering`

**addyosmani/agent-skills** — "Production-grade engineering skills for AI coding agents" — is #5 on today's trending board at +788 stars and 115,812 total. The collection packages senior-engineer workflows as nine slash commands mapped to a lifecycle — `/spec`, `/plan`, `/build`, `/test`, `/constraints`, `/review`, `/webperf`, `/code-simplify`, `/ship` — with skills that auto-activate by context ("designing an API triggers `api-and-interface-design`"). The notable piece is **`/build auto`**: "you approve the plan once, then it runs autonomously… It removes the human stepping *between* tasks, not the verification: every task is still test-driven and committed individually, and it pauses on failures or risky steps." In Claude Code the commands install as plugin commands, namespaced `/agent-skills:review` where built-ins collide.

**Why it matters:** Skills collections have become the de-facto distribution channel for engineering process (this feed has covered several), and the differentiation here is the lifecycle framing plus the honest autonomy boundary in `/build auto` — batch execution with per-task verification gates rather than one long unattended run. At 115k stars it is also a data point in its own right: process-as-skills has mainstream adoption.

[`🔗 addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) · [`🔗 AddyOsmani.com: Agent Skills`](https://addyosmani.com/blog/agent-skills/)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-11T20:41:58Z |
| Items | 20 |
| Sources tracked | 21 (Hacker News, GitHub Trending, NVD, CISA KEV, arXiv/ICML, vendor blogs, security advisories) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[Previous day](2026-11-11.md) · [Raw .md](https://trending.md/en/feed/2026-11-12.md) · [Archive](../archive/)
