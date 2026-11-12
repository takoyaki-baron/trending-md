---
date: 2026-11-12
updated: 2026-11-12T12:35:50Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 46
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

Pietro Miotti's writeup — the biggest HN story of the day at 843 points — describes going from "a random thought while traveling" in Peru (Oct 18) to an official reply from Mexico's INAH in **less than 72 hours**: ~1,200 km² of public NASA lidar over the Maya region, analyzed overnight by **48 agents** that visually inspected lidar strips rendered as images ("There was no special model or classifier involved: the agents literally looked at the pictures"). They flagged a hilltop site — leveled plaza, oval pyramid 8–12 m tall, raised courtyard, possible rainwater reservoir — that INAH's registry confirmed as unregistered on Oct 21. **The Nov 11 update is the part the headline omits:** archaeologists pointed out the same site was already published in **Estrada-Belli et al. 2025** — "The agents missed it while going through the literature, so they rediscovered it rather than discovered it (it just wasn't in the register of Mexico's National Institute of Anthropology and History, INAH, yet)."

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

## 21. WSJ reports Nvidia's board is preparing to oust Jensen Huang — the Nov 9 investigation becomes a removal report, with NVDA sliding in after-hours

- **Velocity:** ▮▮▮ trending
- **Source:** WSJ · 681 pts on HN · 5.7h ago (~06:31 UTC+8)
- **Tags:** `nvidia` `industry` `governance`

The Wall Street Journal reported late on Nov 11 (US time) that Nvidia's board is **preparing to oust CEO Jensen Huang** — a report relayed the same hour by Reuters and The Verge, and not confirmed by the company. It landed hours after the New York Times reported a second affair — this one, per The Verge's summary of the NYT piece, "with an executive who reports to him." **This is the escalation of an arc this feed covered on 2026-11-09:** the board's independent investigation over "a foreign intelligence effort," which stated no evidence of compromise. The reporting ties the executive, Alice Huang, to securing ~$7.5B of Nvidia AI GPU imports into China over three years — ~240,000 export-banned chips, mostly H100 and H200 (Tom's Hardware's headline; the article body itself is member-walled, so read it as the headline claim). In after-hours trading NVDA fell from its final regular-session prints (~$168) to ~$159 within an hour of the reports — about 6% — with quarterly earnings due within days.

**Why it matters:** This is no longer a governance footnote — it is a reported removal attempt at the company whose CUDA stack, open-source drops (NVKE) and China-export posture shape most of the AI infrastructure this feed tracks. Everything above is *reported*, attributed, and unconfirmed; the checkable numbers are the after-hours price and the earnings date, so treat the rest as the WSJ's and NYT's reporting until Nvidia speaks.

[`🔗 WSJ: Nvidia is preparing to oust Jensen Huang`](https://www.wsj.com/business/nvidia-is-preparing-to-oust-nvidia-ceo-jensen-huang-30f421ad) · [`🔗 The Verge: Nvidia is reportedly preparing to fire Jensen Huang`](https://www.theverge.com/tech/1031652/jensen-huang-rumor) · [`🔗 Tom's Hardware: Alice Huang and the 240k banned chips`](https://www.tomshardware.com/tech-industry/policy/alice-huang-reportedly-instrumental-in-securing-over-usd7-5-billion-of-nvidia-ai-gpu-imports-during-three-year-relationship-with-jensen-huang-helped-move-240-000-banned-chips-into-china-mostly-h100-and-h200) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50459703)

---

## 22. United Airlines bans AI agents from booking flights — the first explicit airline opt-out of personal agents, citing credentials and federal check-in rules

- **Velocity:** ▮▮▮ trending
- **Source:** CBS News · 453 pts on HN · 6.7h ago (~21:20 UTC+8 Nov 11)
- **Tags:** `ai-agents` `policy` `travel`

United said Wednesday it is **banning AI agents from making flight reservations on behalf of travelers**, citing security risks and federal rules. Its stated reasons: "sharing account credentials with personal, third-party, AI assistants can expose sensitive information, and actions taken by these tools may result in unintended purchases, account changes, or use of MileagePlus miles" — plus the point that agent-driven check-in could collide with regulations requiring travelers to verify in person that luggage holds no banned substances. The enforcement is two-sided: "United is taking steps to restrict access — directly within our digital platforms and indirectly via travel agencies and aggregators — to prohibit use by unauthorized, third-party personal AI agents or assistants." The contrast case is named: Southwest has made its flight inventory viewable to ChatGPT users. Analyst Henry Harteveldt's read: United doesn't want "yet another, and potentially even more powerful, intermediary" — and bot-driven flight searches cost airlines money.

**Why it matters:** The first explicit ban of personal AI agents by a major airline is a concrete shape for how agentic commerce gets gated: incumbents either wall agents off (United) or build sanctioned surfaces for them (Southwest's ChatGPT integration). For agent builders, the two failure modes named — credential sharing and unauthorized purchases — are exactly what an agent needs to detect and refuse before touching a travel account.

> "…prohibit use by unauthorized, third-party personal AI agents or assistants." — United, to CBS News

[`🔗 CBS News: United Airlines bans AI agents from booking flights`](https://www.cbsnews.com/news/united-airlines-bans-ai-agents-booking-flights/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50458900)

---

## 23. Apache HTTP Server ships 2.4.71 with a critical mod_http2 race — found by Anthropic's OSS Scanner, fixed 16 days after report

- **Velocity:** ▮▮ rising
- **Source:** oss-security / httpd 2.4.71 · 33 pts on HN · 2h ago (~10:11 UTC+8)
- **Tags:** `apache` `http2` `cve`

Apache released **2.4.71 on Nov 11** carrying three CVEs (1 critical, 1 important, 1 low per the project's own page). The critical one is **CVE-2026-119618**: "Concurrent Execution using Shared Resource with Improper Synchronization vulnerability in Apache HTTP Server's mod_http2 in assign_headers() can lead to RCE" — a race condition producing heap corruption that Wiz assesses as exploitable by "a remote, unauthenticated attacker," with no exploit known and no exploitation observed in the wild as of its write-up. Affected: httpd **2.4.55–2.4.70**, and standalone **mod_h2 2.0.8–2.0.42**. The credit line is the notable part: "Anthropic's OSS Scanner, as vulnerability ANT-2026-MAPKT6MZ (finder); Anthony Weems and Simon Scannell of the Google Cloud Vulnerability Research (finder)" — reported 2026-10-26, fixed and disclosed 16 days later. The NVD record (published Nov 11) is still `Received` with **no CVSS score** — "critical" is the project's own severity label, not a number. If you can't patch yet: `Protocols http/1.1` disables HTTP/2 and removes the vector. Wiz's widely-read writeup carries its own confusion — its "What is CVE-2026-111497?" heading describes 119618, but **CVE-2026-111497 is a Google Brotli decoder CVE from October**, not Apache.

**Why it matters:** HTTP/2 is on by default in most distributions, so the fix is a routine version bump — the triage is which hosts still run 2.4.70 or older (Wiz's own telemetry: 64% of cloud environments have vulnerable resources, 51% publicly exposed). And the finder credit is a marker: an automated OSS scanner is now named on an Apache advisory alongside two Google VR researchers, which is what automated vulnerability discovery looks like when it lands in the wild.

[`🔗 oss-security: CVE-2026-119618 announcement`](https://www.openwall.com/lists/oss-security/2026/11/11/13) · [`🔗 httpd 2.4.71 vulnerability list`](https://httpd.apache.org/security/vulnerabilities_24.html) · [`🔗 NVD: CVE-2026-119618`](https://nvd.nist.gov/vuln/detail/CVE-2026-119618) · [`🔗 Wiz analysis`](https://www.wiz.io/blog/cve-2026-119618-rce-apache-http-server-vulnerability)

---

## 24. GitHub Actions gets workflow lockfiles — the full-SHA pin era ends, and readable tags come back

- **Velocity:** ▮▮ rising
- **Source:** hugovk.dev · 171 pts on HN · 6h ago (~06:15 UTC+8)
- **Tags:** `github-actions` `supply-chain` `security`

GitHub Actions now supports **workflow lockfiles**, and Hugo van Kemenade's writeup walks the whole setup: the new official `gh` extension **`github/gh-actions-lock`** (★332) rewrites `uses:` lines back to readable `@vX.Y.Z` tags and generates `.github/workflows/actions.lock` — which pins each tag to its exact commit SHA plus `owner_id`/`repo_id`. That keeps the anti-supply-chain guarantee of SHA-pinning (tags are mutable) without the unreadable diffs. The ecosystem support is already there: "Good news, both already support lockfiles" for **Renovate and Dependabot**; GitHub recommends a `gh actions-lock --verify` CI job to fail when the lock is out of sync or a pinned ref no longer verifies upstream; and **zizmor v1.32.0** is the first release to support lockfiles — versions before it told you to hash-pin.

**Why it matters:** Mutable tags were the Actions supply-chain hole, and SHA-pinning fixed it at the cost of workflow diffs nobody could review and Renovate PRs full of hex. A lockfile restores the readable pin while keeping the verification — the same move lockfiles made for Cargo and uv, now applied to CI's most-attacked surface.

> "All forks on github are the same repo you can pin any commit, merged upstream or not." — HN commenter on what SHA-pinning actually trusted

[`🔗 hugovk.dev: Lock your GitHub Actions`](https://hugovk.dev/blog/2026/lock-github-actions/) · [`🔗 github/gh-actions-lock`](https://github.com/github/gh-actions-lock) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50459485)

---

## 25. Huawei open-sources MACaQ — model-agnostic quantization that claims a 122B model in 64 minutes on 32.5 GB

- **Velocity:** ▮▮ rising
- **Source:** huawei-csl/MACaQ · 70 pts on HN · 7.8h ago (~04:20 UTC+8 Nov 11)
- **Tags:** `quantization` `local-inference` `gguf`

Huawei's CSL group published **MACaQ** ("Model Agnostic Calibrated Quantization") — repo created Nov 10, Apache-2.0, C++, alongside arXiv **2611.10649** (submitted Nov 7): "MACaQ: Fast, Model Agnostic Calibrated Quantization for Low-Precision Weights and Activations." The headline claims (the paper's own numbers): quantize a **122B-parameter model in 64 minutes using just 32.5 GB of device memory**, and "lower perplexity than MR-GPTQ and DuQuant++, or match their best Llama-3-8B perplexity with **11× less quantization time**." The breadth is the point: llama.cpp (2/3/4-bit GGUF), vLLM (W4A4 or weight-only), Diffusers (W4A4 image/video/audio generation), PyTorch (speech, W4A4) — and an **Ascend** backend. A Hugging Face collection ships the quantized models. The README closes with a line you don't see every day: "Whether you're a human or an AI agent, if you use MACaQ to quantize a model, please star this repository to support the project."

**Why it matters:** Local-inference quantization has been an academic lineage (GPTQ → AWQ → DuQuant); a sanctioned vendor shipping a permissively-licensed, multi-modal quantizer with llama.cpp/vLLM paths — plus an Ascend backend — is both a practical tool and a signal about where Huawei's open AI stack is going. The perplexity comparisons are the vendor's own paper; the interesting independent test is whether the GGUFs beat the standard llama.cpp quants at the same bit width.

[`🔗 huawei-csl/MACaQ`](https://github.com/huawei-csl/MACaQ) · [`🔗 arXiv 2611.10649`](https://arxiv.org/abs/2611.10649) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50458166)

---

## 26. Vercel's agent-desktop: computer use without screenshots — the accessibility tree as the agent's desktop API

- **Velocity:** ▮ steady
- **Source:** GitHub Trending weekly · +7,772 this week · 22.2k stars
- **Tags:** `computer-use` `agents` `accessibility`

**vercel-labs/agent-desktop** sits at 22,215 stars with +7,772 this week: "Computer use for AI agents: see and operate desktop apps on macOS, Windows, and Linux through the OS accessibility tree." It reads the accessibility tree and returns it as JSON "with a ref for every element the agent can act on" — the agent clicks or types on a ref, re-reads the UI to check the result, and repeats. No screenshots, no pixel matching, and no model: "The loop lives in your agent; agent-desktop has no model inside." It ships as a CLI and a **C library**, with snapshots, clipboard reads, screenshots and command execution beside the tree. It's the desktop sibling of `agent-browser` (covered Nov 6) — Vercel Labs now owns the same ref-based, deterministic-acting pattern at both layers.

**Why it matters:** Accessibility-tree computer use is the typed, fast alternative to screenshot-and-vision loops — and its boundary is equally concrete: whatever the OS accessibility layer doesn't expose (canvas-heavy apps, games, custom-drawn UI) is invisible to it. The open question for all such tools is app coverage on each OS, which the README does not tabulate.

[`🔗 vercel-labs/agent-desktop`](https://github.com/vercel-labs/agent-desktop) · [`🔗 npm: agent-desktop`](https://www.npmjs.com/package/agent-desktop)

---

## 27. Stela boots macOS on x86-64 PCs — a UEFI-level Apple Silicon layer with an arm64e translator and a Metal-on-NVIDIA driver

- **Velocity:** ▮ steady
- **Source:** tylertms/Stela · 73 pts on HN · 5.1h ago (~07:05 UTC+8)
- **Tags:** `reverse-engineering` `macos` `emulation`

**tylertms/Stela** (Rust, GPL-2.0, v0.1.0, 687 stars) calls itself "A general purpose Apple Silicon layer for x86-64 PCs" — a **UEFI boot program** (no host OS underneath) with three parts: an ahead-of-time **and** just-in-time compiler translating arm64e → x86-64 ("covers more than 3,000 AArch64 instruction encodings, maps guest registers to host registers and caches translated code", runs on any x86-64-v2 CPU); a **Metal driver for NVIDIA GPUs** (GTX 16 / RTX 20 series and newer) that "compiles AIR, Metal's shader IR, directly to NIR, Mesa's IR"; and a model of Apple silicon hardware — currently the **Mac mini (M2), running macOS 27**. Requirements are modest: 8 GB RAM, an NVIDIA GPU, a 60 GB GPT partition; setup downloads macOS to a USB stick. The README's own warning is honest: "Stela is still in development. It is slow and still may not boot on supported hardware."

**Why it matters:** This is reverse-Rosetta: where Rosetta kept x86 apps alive on ARM Macs, Stela translates ARM to x86 to keep macOS itself alive on orphaned Intel-era PCs. It's a research-grade v0.1.0 with the project's own low-expectations warning — but the architecture (translator + GPU driver + platform model in one boot binary) is the artifact worth watching.

[`🔗 tylertms/Stela`](https://github.com/tylertms/Stela) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50460154)

---

## 28. OpenAI's Codex Security CLI/SDK ships 0.10.0 — vulnerability scanning rebuilt as an agent workflow, with a GitHub Action and its own cloud

- **Velocity:** ▮ steady
- **Source:** GitHub Trending daily · +52 today · 11.8k stars
- **Tags:** `security` `codex` `sast`

**openai/codex-security** (Apache-2.0, TypeScript, 11,847 stars) is on today's trending board the morning it shipped **npm 0.10.0** (02:18Z) and a matching GitHub Action 0.10.0 (02:23Z). The pitch: "find, investigate, and fix vulnerabilities in your code" — via security workflows inside Codex, or automated with the `@openai/codex-security` CLI and TypeScript SDK. Standard vs **Deep scans** (deep repeats standard and dedupes), validate candidate findings, generate patches, verify existing fixes; draft `SECURITY.md` and save threat models; severity assessed "against your own rubric"; export SARIF/JSON/CSV; track findings in Linear, Jira or GitHub; publish supported reports to **Codex Security Cloud**; preview third-party scanner findings via import guides.

**Why it matters:** The pipeline here — scan → validate → patch → verify — is what the trending security-audit *skills* orchestrate by hand, productized with issue trackers and CI. The load-bearing step is "validate candidate findings": a scanner confirming its own candidate is exactly where agent-driven security tools get judged, so treat validated counts as a claim until someone measures the false-positive rate on a known set.

[`🔗 openai/codex-security`](https://github.com/openai/codex-security) · [`🔗 npm: @openai/codex-security`](https://www.npmjs.com/package/@openai/codex-security)

---

## 29. Klad gives your coding agent real brushes — a paint app where agent and human draw on the same canvas, no image model

- **Velocity:** ▮ steady
- **Source:** klad-app/klad · 74 pts on HN · 12.1h ago (~00:00 UTC+8)
- **Tags:** `creative-tools` `agents` `gui`

A Show HN: **klad** (Rust, source-available) — "A drawing app built for agent/human collaboration." You paint in the editor with a pen; the agent paints through the `klad` command line "with the same brushes, on the same drawing, and each of you sees the other's strokes instantly" — layers, grouping, and a timeline for animation included. The design principle is stated as an absence: "**There is no image model in klad.**" Everything on the canvas stays structured — "a stroke with its path, pressure, brush and colour, a shape with its points, a fill with its region" — so "if one leaf looks off, you fix that" rather than rerolling and hoping. A pre-built app waits at klad.studio.

**Why it matters:** Agent-creativity demos have mostly been prompt-to-image; Klad inverts it — the agent operates the same tool API the human uses, at stroke granularity, which makes every agent edit inspectable and undoable in the app's own terms. It's the GUI-agent pattern applied to creative software, and the structured-canvas design is what makes it reviewable rather than generative.

[`🔗 klad-app/klad`](https://github.com/klad-app/klad) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50454951)

---

## 30. Red Hat Quay: a 9.9 LIKE-pattern cross-tenant leak and a 9.8 token-to-signing-key chain — both scored by Red Hat's own CNA

- **Velocity:** ▮ steady
- **Source:** NVD · 2 records · Nov 11
- **Tags:** `quay` `containers` `cve`

Two records published Nov 11, both `Awaiting Analysis`, both carrying scores from Red Hat's own CNA (`secalert@redhat.com`). **CVE-2026-110697 (9.9)**: Quay's robot-account listing "constructs a SQL LIKE pattern from user-controlled namespace names without escaping wildcard metacharacters" — a namespace containing an underscore matches across namespaces, letting an attacker enumerate robot accounts outside their own tenant. **CVE-2026-123710 (9.8)**: "An unauthenticated client can obtain an anonymous registry token with an audience it controls, present that token to the service key rotation endpoint, and install its own approved signing key with no expiry" — a token-audience confusion that ends in a permanent key installed in the registry machinery itself.

**Why it matters:** Quay is the image registry underneath OpenShift deployments, so both bugs are supply-chain-adjacent: cross-tenant metadata exposure in one, and a signing key that can outlive every rotation you thought you had in the other. The scores are Red Hat's while NVD's analysis is pending; check the Red Hat CVE pages for fixed states for your Quay stream before trusting registry-level controls.

[`🔗 Red Hat: CVE-2026-110697`](https://access.redhat.com/security/cve/CVE-2026-110697) · [`🔗 Red Hat: CVE-2026-123710`](https://access.redhat.com/security/cve/CVE-2026-123710) · [`🔗 NVD: CVE-2026-123710`](https://nvd.nist.gov/vuln/detail/CVE-2026-123710)

---

## 31. Fortinet's wave: FortiMail 9.8 pair, FortiAnalyzer 9.8, FortiOS missing-auth — at least seven records ≥9.6 in one day, every score the CNA's own

- **Velocity:** ▮ steady
- **Source:** NVD · 7+ records · Nov 11
- **Tags:** `fortinet` `fortimail` `cve`

NVD published at least **seven Fortinet records at 9.6–9.8 on Nov 11**, every one scored by Fortinet's own CNA (`psirt@fortinet.com`) and every one still `Received`. The FortiMail pair leads: **CVE-2026-126147 (9.8)** — unauthenticated path traversal across FortiMail 8.0.x, 7.6.x, 7.4.x and 7.2 all versions (FG-IR-26-199); **CVE-2026-126148 (9.8)** — unauthenticated OS command injection in FortiMail 8.0.x/7.6.x (FG-IR-26-200). Then **CVE-2026-126170 (9.8)**, improper output encoding across FortiAnalyzer 8.0.x/7.6.x including Cloud and BigData variants (FG-IR-26-219); **CVE-2026-126259 (9.8)**, missing authentication for a critical function in FortiOS — "may allow an unauthenticated attacker with HA FGSP + standalone-config-sync, or autoscale to execute command as super admin via crafted HA packets" (FG-IR-26-273); **CVE-2026-126254 (9.6)**, a numeric truncation error letting "a configured ibgp neighbor" push malformed attributes to connected peers (FG-IR-26-268); plus two further SQL-injection records at 9.8 (CVE-2026-126262, unauthenticated via crafted OFTP packets on FortiAnalyzer/FortiManager; CVE-2026-126263, authenticated in FortiMail) in the same wave.

**Why it matters:** FortiMail and FortiAnalyzer sit on the mail and log-retention paths, and the path-traversal-plus-command-injection pair is the classic unauthenticated-RCE shape — internet-reachable Fortinet appliances belong at the top of the patch queue. Quote the numbers with their scorer and their stopping point: the 9.8s here are **base** scores as NVD re-serves them; Fortinet's own containers store threat-adjusted copies of two of them (9.0 for the FGSP bug, 9.3 for the OFTP SQL injection), one vector, two honest numbers.

[`🔗 Fortinet FG-IR-26-199 (FortiMail path traversal)`](https://fortiguard.fortinet.com/psirt/FG-IR-26-199) · [`🔗 Fortinet FG-IR-26-200 (FortiMail command injection)`](https://fortiguard.fortinet.com/psirt/FG-IR-26-200) · [`🔗 NVD: CVE-2026-126147`](https://nvd.nist.gov/vuln/detail/CVE-2026-126147)

---

## 32. Terence Tao rebuilt his 2018 logic game as "Lean Grimoire" — the coding agent did the work, and the game state renders as a Lean proof

- **Velocity:** ▮ steady
- **Source:** terrytao.wordpress.com · 12 pts on HN · 1.5h ago (~10:37 UTC+8)
- **Tags:** `lean` `math` `agents`

Terence Tao's Nov 11 post: back in July he was "experimenting with using modern coding agents to build a number of mathematical visualization applets"; having found a bit of time, he modernized his 2018 JavaScript interactive textbook **"QED"** — propositional and first-order logic taught as a crafting game — into **Lean Grimoire**, rebuilt with a coding agent. New features include "the option to show an in-progress Lean proof of one's game state" and a fantasy mode where "mathematical statements become 'potions', mathematical expressions become 'scrolls'". He's asking for playtesting "to make it more useful as a means to teach logical proofs and/or Lean."

**Why it matters:** The QED → Lean-4 pipeline in one browser app is a rare teaching artifact aimed exactly at the Lean-curious — and it's another data point in the pattern of mathematicians shipping agent-built tools rather than writing papers about them. HN's small reception (12 points, with the UI drawing fire) is itself the honest read: the value is the Lean-proof view, not the game polish.

[`🔗 Terence Tao: Lean Grimoire`](https://terrytao.wordpress.com/2026/11/11/lean-grimoire/) · [`🔗 Lean Grimoire app`](https://teorth.github.io/tao-web/apps/grimoire.html) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50462375)

---

## 33. Anthropic files to go public — 825M shares, $70–78 expected, Nasdaq "ANT", and the roadshow is already running

- **Velocity:** ▮▮▮ trending
- **Source:** Anthropic · fresh on HN · 0.3h ago (~20:00 UTC+8)
- **Tags:** `anthropic` `ipo` `industry`

The company behind Claude has filed to become a public company: **ipo.anthropic.com** is live today — its meta description announces the filing and points to a Founders' letter — and the concrete terms are on Anthropic's own Nov 10 roadshow announcement: **825,000,000 Class A shares** proposed — 801,351,354 offered by Anthropic, 23,648,646 by existing stockholders — priced at an expected **$70.00–$78.00 per share**, listing on the **Nasdaq Global Select Market under "ANT"**, with a 30-day underwriter option for up to 123,750,000 more shares and Goldman Sachs/Morgan Stanley running the books. The filer is "Anthropic, **PBC**" — the public-benefit corporation structure goes public with the stock. The registration statement is filed with the SEC but not yet effective. The Wall Street Journal (Nov 10) reported a **$1.3T valuation target** — that number is the WSJ's report, not Anthropic's announcement; the company's own pages state no valuation.

**Why it matters:** This is the largest AI-lab liquidity event of the cycle, and the dev-relevant part is the reporting machine that comes with it: quarterly disclosure of the economics behind the model releases, pricing and safety commitments this feed tracks weekly. Watch the PBC structure — how a public benefit corporation balances shareholder returns against its stated safety mission is now a live legal question, not a manifesto line.

[`🔗 Anthropic: roadshow launch announcement`](https://www.anthropic.com/news/roadshow-launch) · [`🔗 ipo.anthropic.com (filing + founders' letter)`](https://ipo.anthropic.com/us/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50465829)

---

## 34. Node.js security releases across all three lines — 16 CVEs, including one that reads TLS private keys from other connections

- **Velocity:** ▮▮▮ trending
- **Source:** nodejs/node releases · Nov 11 16:44Z (~00:44 UTC+8 Nov 12)
- **Tags:** `nodejs` `cve` `tls`

Node.js shipped coordinated security releases for **v26.13.1, v24.22.3 and v22.23.5** on Nov 11 — 16 CVEs total (7 High, 6 Medium, 3 Low), most of them the work of Matteo Collina and Tim Perry. The worst is **CVE-2026-123864**: "a re-entrancy flaw in Node.js HTTPS lets an unauthenticated client **read memory belonging to other connections, including TLS private keys and other users' requests**" — `TLSWrap::DoWrite()` calls `ClearOut()` while the parser can re-enter. Beside it: **CVE-2026-123872**, a client-certificate authentication bypass where "a client can change the servername during TLS 1.2 renegotiation to reach endpoints it was not authorized for" (one CVE covering resumption/HRR/renegotiation SNI changes); **CVE-2026-126051**, a deferred-callback use-after-destroy that "allows a remote, unauthenticated attacker to terminate the server process" on any TLS server using `SNICallback`; and **CVE-2026-123863**, a reachable assertion in HTTP/2 session teardown that "lets any unauthenticated client abort the server." The remaining Highs are an http2 buffer family (streams abandoned by nghttp2, buffers retained during pending writes). All the NVD records checked were still `Received` with no CVSS — "High" is Node's own label.

**Why it matters:** Memory-disclosure-to-TLS-keys is Heartbleed-shaped, and the SNI/renegotiation bypass breaks the cert-binding assumption mTLS deployments rely on. If you run any Node server, this is a patch-today release on all supported lines — and the records will carry CVSS only after NVD analysis, so triage from the release notes, not from a scanner that hasn't ingested scores yet.

[`🔗 Node.js v26.13.1 security release`](https://github.com/nodejs/node/releases/tag/v26.13.1) · [`🔗 NVD: CVE-2026-123864`](https://nvd.nist.gov/vuln/detail/CVE-2026-123864)

---

## 35. Humble Bundle's redesign ships without 2FA — password changes need no current password, email changes verify nothing

- **Velocity:** ▮▮▮ trending
- **Source:** Kotaku · 297+ pts on HN · 5.5h ago (~14:55 UTC+8)
- **Tags:** `account-security` `2fa` `supply-chain`

Humble Bundle — the charity game storefront owned by IGN — pushed a site redesign that users on Reddit found had **stripped core account security**: two-factor authentication is "entirely missing under security settings" (Kotaku confirmed on its own account: "the choice to add or remove the feature is entirely missing"), and per Kotaku's testing, "there are no authentication checks when changing passwords or email addresses" — "If logged in you can simply enter a new password without having to know the current one," and an email change sends verification **only to the new address**, nothing to the old one. Also gone: any stay-logged-in option, and any distinction between redeemed and unredeemed keys in purchase history. Kotaku reached out to Humble for comment; no statement at press time. The community's read — the design looks "reminiscent of other Claude interfaces," hence the "vibe-coded redesign" framing with 297+ HN points — is exactly that, a read: **no one has shown the redesign was AI-written**, and the security regressions are the checkable part regardless of how it was built.

**Why it matters:** A storefront holding payment cards and game keys shipped a regression that breaks the three baseline account controls (2FA, password-change confirmation, old-email verification) at once — and the failure was caught by users, not by the release process. Whatever your redesign pipeline is, the test that would have caught this is whether auth checks survive the migration; and if your account is there, the interim advice is to remove saved payment info until 2FA returns.

> "If logged in you can simply enter a new password without having to know the current one." — Kotaku, after testing

[`🔗 Kotaku: Humble Bundle redesign forgets full account security`](https://kotaku.com/humble-bundle-vibe-coded-ai-redesign-account-security-password-email-2000756085) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50463899)

---

## 36. CopilotKit's OpenBot: AI coworkers that each get a computer of their own — 11.2k stars, v1.0.2, plan-then-act with an audit trail

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending daily · 11.2k stars · v1.0.2 Nov 11
- **Tags:** `agents` `self-hosted` `ag-ui`

**CopilotKit/OpenBot** — from the team behind the AG-UI protocol — hit #3 on the daily trending board at 11,217 stars the day after shipping **v1.0.2** (Nov 11). The pitch: "Open-source AI coworkers that each get a computer of their own: a browser, files and tools, with every action decided before it happens and recorded after. Bring any AG-UI agent." Concretely: a self-hostable workspace where each bot runs in its own sandboxed computer (browser, filesystem, tools), an approval flow before sends (the release notes' migration path still names `0088_approval_reviewer_guidance`), and a desktop app — notarized macOS DMGs for Apple Silicon/Intel, signed Windows installer, "no terminal or developer tools needed" — that bundles the frontend with a Docker-based backend, plus a Kubernetes deploy path for teams. "OpenBot for Business" adds company sign-in, tool permissions, approvals and audit.

**Why it matters:** The agent-workspace category is crowding fast (CompanyOS, Paradev, herdr), and OpenBot's differentiator is the auditable plan-then-act loop plus the AG-UI standard for plugging in agents you already run — self-hosted enterprise deployment is the shape most of this feed's readers actually need. The "every action decided before it happens and recorded after" framing is the right one to hold vendors to: ask to see the recording.

[`🔗 CopilotKit/OpenBot`](https://github.com/CopilotKit/OpenBot) · [`🔗 open.bot`](https://open.bot)

---

## 37. Jane Street ships a Socratic Tutor skill — a complete teaching protocol in one SKILL.md, guard rails included

- **Velocity:** ▮▮ rising
- **Source:** janestreet/agent_skills · 305+ pts on HN · 50h ago (Nov 10 ~18:00 UTC+8)
- **Tags:** `agent-skills` `education` `prompting`

Jane Street — the trading firm — published **janestreet/agent_skills** (MIT, created Nov 3, ~7k stars), and its single skill is a genuinely engineered artifact: **socratic-tutor**, a SKILL.md that turns an LLM into "a strict personal tutor" via a full protocol — a 3–5 question **diagnostic** before any teaching, a **skill map** rating each subskill 0–5 ("0 unaware . 1 heard of it . 2 can follow along . 3 can do with help . 4 can do independently . 5 can teach it"), a teaching loop where "**Ask ONE question at a time. End the message immediately after the question and wait for the answer; do not add hints, example answers, or teaching content after it**", and the anti-hallucination rule for wrong answers: "do not give the answer. Ask a narrower question that exposes the contradiction in their reasoning." The best part is the intent guard: if the user asked a one-off "explain X", answer normally — "A false start costs the user an unwanted quiz; a confirmation costs one word." HN's reception (305 points) is one of the week's biggest for a single prompt file.

**Why it matters:** This is pedagogy as a skill spec — and the interesting engineering is all in the failure modes agents actually hit: hijacking simple questions, leaking the answer, accepting shallow explanations. Every team writing agent instructions can steal the structure: explicit trigger phrases, an intent guard with a stated cost asymmetry, a visible state model, and rules for the model's own failure modes.

> "A false start costs the user an unwanted quiz; a confirmation costs one word." — SKILL.md

[`🔗 socratic-tutor SKILL.md`](https://github.com/janestreet/agent_skills/blob/master/socratic-tutor/SKILL.md) · [`🔗 janestreet/agent_skills`](https://github.com/janestreet/agent_skills)

---

## 38. Qwen Code hits 1.0 preview — Qoder's agent capabilities merge into the terminal CLI, with native packages

- **Velocity:** ▮▮ rising
- **Source:** QwenLM/qwen-code · release Nov 11 03:55Z (~11:55 UTC+8)
- **Tags:** `qwen` `cli` `coding-agents`

Alibaba's **QwenLM/qwen-code** (29.5k stars, "an open-source AI coding agent that lives in your terminal") shipped **v1.0.0-preview** on Nov 11 — the first 1.0-line release, with the project's own caveat that "some interfaces, configuration options, and behaviors may change during Preview." The headline: "**Brings together the agent capabilities of Qoder and Qwen Code** for code understanding, implementation, debugging, and testing" — folding Alibaba's Qoder IDE-agent stack into the terminal CLI — plus Qwen *and* Qoder account login, multiple model providers, custom compatible endpoints, and native packages replacing the npm-only install. The previous day's 0.27.2 shows where the agent is going beyond the editor: its Web Shell "can configure WeChat, QQ, and Email channels, including QR login, scan progress, identity display, and logout where supported" — the coding agent as a messaging-channel resident.

**Why it matters:** Terminal coding agents are consolidating into platform entry points, and Qwen Code is the open-weight ecosystem's answer reaching 1.0 — the Qoder merge makes it a one-CLI surface for Alibaba's agent stack the way Gemini CLI and Claude Code are for theirs. The Preview label is doing real work: anyone building against it should pin and read the changelog until the interfaces settle.

[`🔗 QwenLM/qwen-code`](https://github.com/QwenLM/qwen-code) · [`🔗 v1.0.0-preview release notes`](https://github.com/QwenLM/qwen-code/releases/tag/v1.0.0-preview) · [`🔗 v0.27.2 release notes (Web Shell)`](https://github.com/QwenLM/qwen-code/releases/tag/v0.27.2)

---

## 39. hMailServer gets 18 CVE records in one drop — an 8.8 SQL injection an unauthenticated sender can reach through bounce mail

- **Velocity:** ▮▮ rising
- **Source:** NVD · 18 records · Nov 11 09:17Z (~17:17 UTC+8 Nov 11)
- **Tags:** `hmailserver` `cve` `mail`

hMailServer — the Windows mail server, now developed on GitLab under Progressive Robot — had **18 CVE records published on Nov 11**, all `Received`, every score GitLab's own CNA (`cve@gitlab.com`) assigned. The headline is **CVE-2026-126617 (8.8)**: SQL injection in the database layer of 6.0.0-B1 through 6.2.18 when using MySQL/MariaDB or PostgreSQL, because "on those two engines parameters are not bound" — values were spliced into statement text with per-parameter string replacement, so a value containing a later parameter's name ended the literal early and injected SQL. The default-config path needs only a mailbox: the recipient's address "carries the recipient's address twice" in the queued-message row; a **remote unauthenticated sender** reaches the same statement "through a message the server sends to the envelope sender, such as a delivery failure notice or an automatic reply" when greylisting or message indexing is enabled. On PostgreSQL "further statements can follow it"; SQL Server/Compact, where parameters are bound, are unaffected. The rest of the wave: TLS-verification gaps (7.8/7.5/7.4/7.0), Windows-installer local privilege escalations (7.8/7.5/7.3), JSON-reader DoS, auto-ban bypasses. Fixes shipped in **v6.2.19 and v6.3.8 (released Nov 2)** — nine days before the paperwork.

**Why it matters:** Mail servers are unauthenticated-attacker terrain by design, and reaching SQL injection by sending bounce mail is about as bad as it gets — if you run hMailServer 6.x below 6.3.8, the fixed builds have existed since Nov 2, so this is a verify-your-version task, not a wait-for-a-patch one. Note for inventory tools: the active repo is **GitLab**, and the GitHub mirror's newest release (5.7.2-b3144) is the legacy line — scanners keyed to the GitHub org will mis-age this one.

[`🔗 NVD: CVE-2026-126617`](https://nvd.nist.gov/vuln/detail/CVE-2026-126617) · [`🔗 hMailServer v6.3.8 release`](https://gitlab.com/hmailserver/hmailserver/-/releases/v6.3.8)

---

## 40. Christian Bird's activity-outcome gap: AI moves the activity metrics, not the shipping metrics — the talk and its paper trail

- **Velocity:** ▮▮ rising
- **Source:** cabird.com · 118 pts on HN · 19.5h ago (Nov 12 ~00:30 UTC+8)
- **Tags:** `research` `developer-productivity` `ai`

Christian Bird — one of the most-published empirical software-engineering researchers, now at Dryden Technology Group — put his UC Irvine seminar talk (Oct 30, 21 minutes, slides included) online under the title that is the whole thesis: "**Why aren't we shipping faster now? AI, activity, and outcomes in software engineering.**" The talk anchors a paper currently in submission: Cha, Badea, Baym, Bird, Butler, Murphy-Hill, Hadley, "**The Activity-Outcome Gap: Why AI Does Not Solve Software Engineering**," built on 30 interviews — and the page assembles the public evidence base around it: the NBER working paper "Writing Code vs. Shipping Code: Productivity Effects Across Generations of AI Coding Tools" (Demirer, Musolff, Yang, w35275), "What Has AI Let Developers Unlock?" (arXiv 2610.23708), "(When) Should a Software Factory Be Lights-Off? Benchmarking Code Review Agents on Bug Detection" (arXiv 2610.13668), and "You Shall Not Pass! Where and Why Developers Draw the Line on AI Autonomy" (arXiv 2607.00533).

**Why it matters:** The claim that AI inflates activity while outcomes lag is now being made by the field's most credentialed measurement group, with the public papers attached — this is the citation to hand anyone arguing from vibes on either side. Honest limits: the headline paper is unpublished and the interviews aren't public yet, so treat the title as a hypothesis with a strong author list until the paper lands; the NBER and arXiv links are the checkable parts today.

[`🔗 Christian Bird: Why aren't we shipping faster now?`](https://cabird.com/talks/shipping-faster/) · [`🔗 NBER w35275: Writing Code vs. Shipping Code`](https://www.nber.org/papers/w35275) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50455332)

---

## 41. Emacs in the Age of Magic: a year of Claude Code, a high schooler's Rust terminal emulator, and "you'll have no idea how it works"

- **Velocity:** ▮▮ rising
- **Source:** commandlinesystems.com · 249 pts on HN · 16h ago (~04:00 UTC+8)
- **Tags:** `essay` `emacs` `ai`

A 249-point essay that starts as Claude Code appreciation ("Its handling of all aspects of the coding process blew my socks off then, and it's an order of magnitude more capable now") and detours through the "Mathocalypse" (Scott Aaronson's term — "OpenAI's latest model took all of three hours to carpet bomb 8,000 research problems, resulting in 372 likely hits") before arriving at its best story: the author posted an AI-built Emacs terminal mode to r/emacs, and a high schooler replied with **cooked.el** — "its full-blown, self-contained implementation of a terminal emulator, in Rust no less" — written with Claude "over a coffee break." The author's line on that: "the holmes replicated over a coffee break what a billionaire with infinite resources had been toiling over the last five years. It probably never occurred to the high schooler that a custom built Boeing materialized in the backyard when all he intended was a new flight stick design." The essay closes on where this lands: "AI has turned Stallman's goal of software freedom on its head. Having your computer do whatever your imagination can think up — that's real freedom. **The only catch is you'll have no idea how it works. No one does.**"

**Why it matters:** The essay's Emacs frame is a Trojan horse for the actual subject — what happens to software culture when one-off personal software is cheaper than complaining about features ("Loud bellyaching, or massaging a nice-to-have into a should-have-had... You get all the attention and none of the work"). The cooked.el anecdote is the cleanest single illustration yet of the "custom built Boeing materialized in the backyard" asymmetry, and the closing line is the honest version of the personal-software thesis this feed keeps meeting in tool form.

[`🔗 Emacs in the Age of Magic`](https://commandlinesystems.com/magic.txt) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50458208)

---

## 42. TensorFold: a Zig inference engine with no Python — and an "Agent Traffic Control" protocol for its AI contributors

- **Velocity:** ▮ steady
- **Source:** GitHub Trending daily · 1.8k stars
- **Tags:** `inference` `zig` `agents`

**ashhart/TensorFold** (1.8k stars, trending daily) "serves language models from a Zig binary on Apple Silicon and NVIDIA GPUs — the engine reads checkpoints, tokenizes requests and runs Metal or CUDA kernels directly. Serving needs no Python or MLX installation" (the repo description also names Vulkan; the README's checked paths are Metal/CUDA). Its quick start is a 4-bit Qwen3.5-2B "checked on Metal and a GB10." The genuinely novel part is the contribution workflow, written agent-first: "Building with a coding agent? Have it load the contributor skill before it writes any code," and before touching an issue, agents must run **Agent Traffic Control** (`ashhart/ATC`) — `atc check` for duplicate work, `atc claim` to take an issue, a **five-minute pulse** while the agent works ("Pulse only while the agent is working, before its five-minute check-in expires"), and a **live agent radar** at tensorfold.dev/atc showing who is working on what.

**Why it matters:** The engine itself joins a crowded field (llama.cpp, MLX), but the ATC protocol is a new artifact: an open-source project treating AI-agent contributors as a concurrency problem to be managed — claims, leases, heartbeats, an overlap detector and a public radar — instead of hoping humans coordinate. If agent-authored PRs keep growing, expect this pattern (issue leasing with expiry) to show up in more projects; TensorFold is the reference implementation to watch.

[`🔗 ashhart/TensorFold`](https://github.com/ashhart/TensorFold) · [`🔗 live agent radar (ATC)`](https://tensorfold.dev/atc)

---

## 43. BusyBox gets seven CVE records in one drop — DHCPv6 overflow at 7.6, httpd stack overflow at 7.5, and an auth check that reads the wrong path

- **Velocity:** ▮ steady
- **Source:** NVD · 7 records · Nov 11 10:16–12:19Z (~18:16–20:19 UTC+8 Nov 11)
- **Tags:** `busybox` `cve` `embedded`

Seven BusyBox records landed on NVD on Nov 11, all scored by Red Hat's CNA (`secalert@redhat.com`), all still `Awaiting Analysis`. The worst is **CVE-2026-124741 (7.6)**: the udhcpc6 DHCPv6 client "does not properly validate the size of network options sent by a server before copying them into memory" — a malicious DHCPv6 server on the local network against every embedded device that leases addresses with BusyBox. **CVE-2026-124739 (7.5)**: httpd's subdirectory config handling — "an overly long index page name can trigger a stack-based buffer overflow." **CVE-2026-124737 (7.5)**: the TFTP client, when it requests a custom small block size but receives a standard response, falls back to the default block size into an undersized buffer. The quietly nasty one is **CVE-2026-124738 (5.3)**: with httpd's pre-compressed file support enabled, "authentication checks are evaluated only against the requested URL path rather than the pre-compressed file" actually served — an auth-check/read-path mismatch. The rest: a udhcpc6 use-after-free (4.3) and two volume-identification validation flaws for crafted FAT/HFS+ filesystems (5.5).

**Why it matters:** BusyBox is in routers, cameras, IoT and initramfs everywhere, and three of these bugs are reachable from adjacent-network attackers (DHCP, TFTP) — the kind that matter on flat LANs and in firmware you never update. Scores are Red Hat's pending NVD analysis; embedders should read the vectors, not the band.

[`🔗 NVD: CVE-2026-124741 (udhcpc6 7.6)`](https://nvd.nist.gov/vuln/detail/CVE-2026-124741) · [`🔗 NVD: CVE-2026-124738 (httpd auth 5.3)`](https://nvd.nist.gov/vuln/detail/CVE-2026-124738)

---

## 44. Directus ships a 9.2: an unauthenticated permission-check skip via a failed-auth WebSocket message

- **Velocity:** ▮ steady
- **Source:** NVD · Nov 11 01:17Z (~09:17 UTC+8 Nov 11)
- **Tags:** `directus` `cve` `authorization`

**CVE-2026-126539 (9.2, CVSS 4.0)** — published Nov 11, scored by VulnCheck's CNA (`disclosure@vulncheck.com`), record still `Received`: "Directus before 12.1.0 contains an authorization bypass vulnerability that allows unauthenticated attackers to **skip permission checks by sending a failed auth message on public-mode WebSockets**." Directus is the open-source data platform/headless CMS whose whole permission model is the product — collections, fields and items filtered per role — and the bug is that the WebSocket public mode mishandles the failed-auth path so the check is skipped rather than denied. The fix landed in 12.1.0, and the current release line is **12.6.1** (Nov 4) — so deployments still on 12.0.x or older are exposed to an unauthenticated read/write-beyond-permissions surface.

**Why it matters:** The pattern is worth naming beyond Directus: the failure is in the *error* path of an auth flow (what happens when authentication fails on a socket that also serves unauthenticated data), which is exactly the branch test suites under-weight. If you run Directus, the version question is binary — 12.1.0 or later — and the score is VulnCheck's, not NVD's, until analysis lands.

[`🔗 NVD: CVE-2026-126539`](https://nvd.nist.gov/vuln/detail/CVE-2026-126539) · [`🔗 directus/directus releases`](https://github.com/directus/directus/releases)

---

## 45. Waline's stored XSS against its own admins: advisory published July 2, CVE record November 11, and still no named patched version

- **Velocity:** ▮ steady
- **Source:** NVD · 2 records · Nov 11 05:19Z (~13:19 UTC+8 Nov 11)
- **Tags:** `waline` `xss` `cve`

Waline — the comment system powering a large share of Chinese-language blogs — has two records published Nov 11: **CVE-2026-64670 (9.3, CVSS 3.1)** and **CVE-2026-64671**, both against **@waline/client ≤ 3.15.2**. The first is the ugly one: the comment editor's live preview is rendered "with marked and no sanitizer (utils/markdown.ts), and the preview is injected with v-html", and editing a comment seeds the editor with its raw body — so "an administrator who clicks Edit on an attacker's comment renders that attacker's raw HTML in their own session: an unauthenticated commenter achieves privilege-escalation stored XSS against a moderator with a single Edit click." The second: the UserList widget builds DOM by concatenating server-returned commenter fields. The timeline is the story: the repo advisory **GHSA-crj3-q72p-ggqm** was published **July 2** — more than four months before the CVE record — rated Critical by maintainer lizheming, and it still reads "**Patched versions: None**". npm's `latest` is 3.16.2 (Nov 3), which sits above the affected range, but nothing in the advisory or release notes claims any release as the fix — treat 3.16.x as unconfirmed until the project says so.

**Why it matters:** An admin-session XSS in the moderation flow of a comment system is the guest-to-admin pivot in one click, on software deployed across thousands of personal blogs — and the two-clock gap (GHSA July, NVD November) means everyone who relied on CVE feeds for triage heard about it four months late. If you run Waline, do not wait for a CVSS on the record: the advisory's own "no patched version" is the operative state.

[`🔗 NVD: CVE-2026-64670`](https://nvd.nist.gov/vuln/detail/CVE-2026-64670) · [`🔗 GHSA-crj3-q72p-ggqm (repo advisory)`](https://github.com/walinejs/waline/security/advisories/GHSA-crj3-q72p-ggqm)

---

## 46. GitHub's second incident in a week: Webhooks, Actions, Pages and Copilot degraded for 33 minutes — RCA promised again

- **Velocity:** ▮ steady
- **Source:** githubstatus · 81 pts on HN · Nov 11 20:48Z (~04:48 UTC+8 Nov 12)
- **Tags:** `github` `incident` `ci`

GitHub declared a **critical** incident at 20:48Z Nov 11 — "issues impacting multiple GitHub products including Actions, Pages, and Copilot," starting with degraded Webhooks performance — and resolved it at 21:21Z, **33 minutes** end to end. The interesting updates are the shape of the recovery: mitigation landed at 21:07Z, then "the backlog of Actions jobs has been fully processed" — i.e., the queue drained after the fix — with full recovery declared 14 minutes later. The closing note repeats last week's formula: "A detailed root cause analysis will be shared as soon as it is available." This is the second GitHub incident in seven days: the Nov 5 outage (Pull Requests, Git operations, Issues, ~2 hours) has **still** published no root cause.

**Why it matters:** Two incidents in a week at the forge most of the industry builds on would be a pattern worth a post-mortem — which is exactly what neither incident has delivered yet. For CI-heavy teams the operational takeaway is smaller: Actions job backlogs continued processing ~14 minutes after "recovery," so your queue's drain time, not the incident's end time, is when your pipeline is actually clean.

[`🔗 GitHub incident: Actions/Pages/Copilot/Webhooks`](https://www.githubstatus.com/incidents/dvy0t3mvh1lg) · [`🔗 GitHub status history`](https://www.githubstatus.com/history)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-12T12:35:50Z |
| Items | 46 |
| Sources tracked | 46 (Hacker News, GitHub Trending, NVD, CISA KEV, arXiv, oss-security, Apache httpd, vendor blogs, security advisories) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[Previous day](2026-11-11.md) · [Raw .md](https://trending.md/en/feed/2026-11-12.md) · [Archive](../archive/)
