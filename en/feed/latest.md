---
date: 2026-11-21
updated: 2026-11-21T12:25:51Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 40
license: CC-BY-4.0
---

# Trending — 2026-11-21

## 1. Two GRH proofs announced the same day — one written with Claude, one "all human" — beside a claimed Navier–Stokes blow-up

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 1,941+ pts · ~6h ago (~22:15 UTC+8)
- **Tags:** `mathematics` `ai-assisted-proof` `lean` `grh` `navier-stokes`

November 20 may be the strangest day in mathematics in years. Levent Alpöge announced a claimed proof of the Riemann Hypothesis and its generalizations — "I believe I have, working with Claude, discovered a proof" — with no readable paper: the argument exists as a Lean formalization shipped in fourteen tar parts, and Tao reports it as "an (enormous) Lean-only proof of the Generalized Riemann Hypothesis." The same announcement covers three results at once: Tao's post orders them "in decreasing order of how 'digested' the results currently are" — an unforced 3D Euler blow-up proof (Alpöge, Buckmaster, Coiculescu, with "heavy AI assistance," Lean-formalized), an unforced Navier–Stokes blow-up (Alpöge & Buckmaster, 79-page paper plus a ~600,000-line Lean library, [repo](https://github.com/tristanbuckmaster/navier-stokes) created yesterday), and GRH. And in a twist nobody could script, Stanford's Ravi Vakil broke the news of a *second, independent* GRH claim — Alessandro Masullo's draft, announced mid-meeting because "this is urgent" — stressing "It is all human, with no AI," with Brian Conrad having looked at it "for months" and it "so far looking good."

**Why it matters:** The AI-assistance question is no longer hypothetical: one Millennium-adjacent claim credits Claude by name, another explicitly disclaims AI, and both arrive the same day — with Lean formalization doing the load-bearing work of making either *checkable* rather than *believable*. Tao's framing is the honest one: nothing is proved yet until digested, and the Navier–Stokes repo itself states the certificate whose hash the paper gives "is not in this repository; the paper says that it will be released."

> The repo's own caveats are worth reading before any headline: the patched Lean package "was not rebuilt when this repository was assembled," and Tao writes that for Navier–Stokes "more work needs to be done to create a proper, professionally written proof."

[`🔗 Alpöge's announcement (PDF)`](https://alpo.ge/remark.pdf) · [`🔗 Navier–Stokes paper + Lean formalization`](https://github.com/tristanbuckmaster/navier-stokes) · [`🔗 Terry Tao: the three claims, ranked by digestion`](https://terrytao.wordpress.com/2026/11/20/unforced-euler-singularity-unforced-navier-stokes-singularity-and-the-generalized-riemann-hypothesis/) · [`🔗 Vakil announces the Masullo claim`](https://math216.wordpress.com/2026/11/20/hurried-announcement-alessandro-masullo-grh/)

---

## 2. "I'll never buy Framework hardware again" hit 700+ points — then the author deleted the post and left "ENODRAMA"

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 713+ pts · ~4h ago (~00:15 UTC+8)
- **Tags:** `hardware` `framework` `support` `consumer`

Gilles Chehade — the OpenSMTPD author — posted a lengthy complaint about a Framework laptop support dispute yesterday evening; it became the day's second-biggest HN thread (713 points, 460 comments). By this morning the post's body was gone. What remains at the original URL is a four-line TL;DR: "This post ended up on Hacker News and got a lot more attention than I expected. I'm not trying to hurt Framework beyond repaid (pun intended); I want them to fix their support. I want them to give us what we paid for, a working laptop." — followed by "ENODRAMA. Move along, there's nothing to see here anymore."

**Why it matters:** The dispute's details now exist only in the thread's quotes and caches — a small case study in how a hardware-enthusiast community's most-shared criticism can be un-published within hours of going viral, while the 460-comment discussion keeps the record. If you cite this story, cite the thread: the post itself no longer carries it.

[`🔗 The post, as it now stands`](https://poolp.org/posts/2026-11-20/ill-never-buy-framework-hardware-again/) · [`🔗 HN discussion (460 comments)`](https://news.ycombinator.com/item?id=50576855)

---

## 3. Since we covered weight-space programming yesterday: an open 27B model rewrites its *own* weights — no gradients, no training

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 237+ pts · ~4h ago (~00:15 UTC+8)
- **Tags:** `ai-research` `weight-space-programming` `self-improvement` `arxiv`

Yesterday's item covered the weight-space-programming benchmark and its Edit-Ready Training. The wave's second paper is stranger: arXiv 2611.21885 (Jiajun Fan et al., v1 Nov 16), "Language Models Can Rewrite Their Own Weights," reports what the authors call *self-rewriting* — "the model is its own optimizer." An open 27B model, given its own weights, its graded answers and the ability to run itself, diagnoses failures and edits the weights behind them, gaining "6.6 points more accurate on problems it never saw," improving across eight consecutive sessions, and repairing a damaged copy of itself back to over 80% of original accuracy without reading the original weights. The abstract's sharpest observation: the ability "emerges with scale" — in one model family the smaller models "make no edit or break themselves."

**Why it matters:** Two days, three artifacts — a benchmark, a training recipe, and now a self-editing model — is how a research area assembles. It also sharpens the safety question yesterday's item flagged: if editing weights becomes something models do *unaided*, the "Weight Space Misfolding" threat model (Nov 14) stops being about external attackers only.

[`🔗 arXiv: Language Models Can Rewrite Their Own Weights`](https://arxiv.org/abs/2611.21885) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50577265)

---

## 4. CISA's latest KEV batch: vCenter auth bypass and a root-RCE Expressway flaw — all four due by November 23

- **Velocity:** ▮▮ rising
- **Source:** CISA KEV Catalog · 4 entries added 2026-11-20 · deadlines 2026-11-23
- **Tags:** `security` `kev` `vmware` `cisco` `ransomware`

Four entries landed in the Known Exploited Vulnerabilities catalog on November 20, each carrying a three-day federal remediation deadline of November 23. The headline is **CVE-2026-123890** — an authentication bypass in VMware vCenter's Directory Service (9.8, CNA-assigned by VMware; record `Analyzed` as of this run's 11-21 re-read, lastModified 2026-11-21T05:18Z — it sat at `Undergoing Analysis` at our 11-20 20:16Z read and completed analysis ~36 minutes later), with fixes in 9.1.1.0200, 9.0.2.0200, 8.0 U3m and 5.2.5, and Telco Cloud Platform builds also affected. Beside it: **CVE-2026-76466**, Cisco Expressway Series, where hard-coded credentials and unvalidated client certificates in the database service let an unauthenticated attacker "execute arbitrary operating system commands as root" (9.8, CNA-assigned by Cisco). The other two: **CVE-2026-129448** — Apache Roller's XML-RPC deserialization RCE (9.8), which we covered as a fresh advisory on Nov 17 and is now KEV'd — and **CVE-2025-42884**, SAP NetWeaver Enterprise Portal JNDI injection (6.5).

**Why it matters:** A 72-hour deadline on a vCenter directory-service bypass is the kind of entry that drives weekend patch cycles across every VMware estate; BOD 22-01 operators should treat November 23 as the date, not the publication.

[`🔗 CISA KEV Catalog`](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) · [`🔗 NVD: CVE-2026-123890`](https://nvd.nist.gov/view/vuln/detail?vulnId=CVE-2026-123890) · [`🔗 NVD: CVE-2026-76466`](https://nvd.nist.gov/view/vuln/detail?vulnId=CVE-2026-76466)

---

## 5. Signal starts blocking the OS's AI agents from reading your screen — on iOS 27 and Android, with macOS left out

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 360+ pts · ~10h ago (~18:15 UTC+8)
- **Tags:** `privacy` `signal` `ai-agents` `mobile`

Meredith Whittaker's post extends Signal's Microsoft-Recall playbook to the two mobile platforms now shipping OS-level screen-reading agents. On iOS 27, Signal enables screenshot blocking so Siri's "Onscreen Awareness" can't capture messages; on Android, when an assistant such as Google Gemini attempts to read the screen, Signal automatically turns on its "Screen security" setting. The post is candid about the gaps: no reliable screenshot-blocking API means no macOS protection, some Android vendor builds can't be covered, and it names third-party agents abusing accessibility permissions — "a skeleton key" — including Meta's Muse. Signal closes with two demands of Apple, Google and Microsoft: a documented way for developers to opt apps out of AI data access, and real documentation of how agents access and process data.

**Why it matters:** The app layer and the OS layer are now adversaries by default, and Signal calls the trend "an existential threat to privacy at the application layer." Every app with private content will have to make the same decision; most have neither Signal's engineering nor its leverage.

> "Signal is the canary in the coal mine, but this affects the entire ecosystem."

[`🔗 Signal blog: Protecting Your Privacy`](https://signal.org/blog/protecting-your-privacy/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50572348)

---

## 6. Mozilla: three years after the DMA, zero non-WebKit browsers ship on iOS — "the open door feels more like a trap door"

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 257+ pts · ~5h ago (~23:15 UTC+8)
- **Tags:** `browsers` `apple` `regulation` `mozilla`

Mozilla's policy post tallies the score on alternative browser engines: nearly three years of EU conditions and roughly a year of Japan's equivalent rules, and no developer has shipped a non-WebKit browser on iOS. The counterfactual is in the numbers — "millions have picked Firefox, and daily use on iOS has doubled" since the DMA's choice screen — but Apple's terms, Mozilla argues, would force a second, separate Firefox app and manual migration of bookmarks, passwords and history: friction "Apple would never accept for its own apps." The post's verdict: "The reason is simple: Apple's conditions remain unworkable."

**Why it matters:** This is the emerging test case for whether regulated access is real access — a compliance regime where the letter is satisfied and the outcome is zero entrants. Browser-engine diversity is also an AI-policy question now: whose engine the agent runs in decides whose rules apply.

[`🔗 Mozilla: Why there are still no non-WebKit browsers on iOS`](https://blog.mozilla.org/en/mozilla/internet-policy/apple-ios-browser-engine-rules/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50575644)

---

## 7. crun container runtime: a shared-volume container can overwrite host files — including `/proc/sys` (7.8, unpatched across RHEL)

- **Velocity:** ▮▮ rising
- **Source:** NVD · CVE-2026-133553 · published ~16h ago (~12:17 UTC+8)
- **Tags:** `security` `containers` `crun` `tocbou`

Red Hat's CNA published a flaw in crun, the OCI runtime under Podman: when copying files onto a tmpfs mounted with `tmpcopyup`, crun "opens the destination a second time by name" — and a container that shares a writable volume with the container being created can swap that path between the two lookups, so crun "copies image files onto host files, including files under /proc/sys." The record carries a 7.8 (`Secondary`, CNA-assigned; NVD `Awaiting Analysis`), and Red Hat's own fix-state data lists crun as `Affected` on RHEL 8, 9 and 10, with OpenShift Container Platform 4 and 5 still `Under investigation`. crun's newest release (1.31, Nov 12) predates the record, and neither the record nor Red Hat's data names a fixed version yet.

**Why it matters:** This class breaks the container/host boundary from the *inside* — no kernel exploit needed, just a shared volume and a race. Until a patched release ships, the practical mitigation is to stop sharing writable volumes across trust boundaries and watch for the crun release that closes the second lookup.

[`🔗 NVD: CVE-2026-133553`](https://nvd.nist.gov/view/vuln/detail?vulnId=CVE-2026-133553) · [`🔗 Red Hat CVE data`](https://access.redhat.com/security/data/cve/CVE-2026-133553) · [`🔗 containers/crun`](https://github.com/containers/crun)

---

## 8. "If you stop writing code, you also get worse at reviewing it" — the skill-atrophy essay hits HN's front page

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 277+ pts · ~7h ago (~21:15 UTC+8)
- **Tags:** `craft` `ai-coding` `career` `essay`

Christian Ekrem's post makes the obvious-once-said point: every other discipline assumes skills decay without practice, yet engineers have talked themselves into believing that reviewing agent output all day keeps them sharp. His argument: reviewing is not practicing — "you're not really reading half of it, are you" — and the deeper cost is that heavy LLM reliance trains avoidance of effort itself. "Repeated LLM usage for problem solving pounds the following premise into our brain's wiring: If something is hard, tricky or requires effort, you shouldn't even try." That's the premise he's criticizing, not endorsing.

**Why it matters:** It lands the same week as the Harvard firm-level study (Nov 18) showing code output up 76% while final output rises 9–11% with review as the bottleneck — and it names the mechanism that produces that gap: the reviewers of agent code are losing the exact skill the review requires.

[`🔗 If you stop writing code, you also get worse at reviewing it`](https://cekrem.github.io/posts/if-you-stop-writing-code-you-also-get-worse-at-reviewing-it) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50573886)

---

## 9. Google workers petition leadership: don't cut schools off from Search for declining Gemini

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 123+ pts · ~3h ago (~01:15 UTC+8)
- **Tags:** `google` `ai-in-education` `policy` `labor`

Since we covered Google's "AI or nothing" policy on Nov 14 — schools that disable Gemini/AI Overviews lose Search — the internal response has arrived: hundreds of Alphabet Workers Union members are petitioning senior leadership to retract it. The policy was announced two weeks ago, on Election Day; Mother Jones reports communities have rallied against it since, and quotes a Google staffer on the executive view: they're "convinced that resistance to AI" just means schools "don't see the vision." The petition asks the company to stop tying core infrastructure — Search — to AI adoption.

**Why it matters:** The story keeps two 2026 dynamics in one frame: AI distribution being bundled with irreplaceable infrastructure, and the workforce as the oversight mechanism that regulators haven't managed to be. Where the bundle lands next (more states? courts?) decides whether this is an edge case or a template.

[`🔗 Mother Jones: Google Workers Tell Their Employer Not to Punish Schools`](https://www.motherjones.com/politics/2026/11/google-alphabet-union-school-ai-protest-gemini-workers-petition/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50577901)

---

## 10. Epic Games rebuilds Unreal Engine around AI agents — Blueprints out, Verse and Scene Graph in

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 54+ pts · ~8h ago (~20:15 UTC+8)
- **Tags:** `game-engines` `unreal` `ai-coding` `epic`

IEEE Spectrum's deep dive (Nov 18) lays out the engine-level bet: Unreal Engine 6 will drop Blueprints — "AI doesn't handle Blueprints very well," as one studio founder puts it, because they're stored as binary — for Verse, a strict text-based language, and replace the OOP actor framework with Scene Graph, an entity-component system. UE6 exposes more systems via APIs "so that AI tooling can get at them without needing to fall back to slow computer use" (EVP of development Marcus Wassmer), runs an internal effort called "Python All The Things" to make the whole editor scriptable, and stores more assets as text agents can edit directly. COO Daniel Vogel on the editor itself: "You're not going to move stuff visually in the editor. Those times are gone." UE 5.9's developer preview (Nov 9) ships the first taste — Unreal Canvas, a Miro-inspired collaboration canvas for agent work.

**Why it matters:** The most-used game engine is being redesigned *for non-human operators* — and the article's sharpest point cuts the other way: the same AI that makes Unreal scriptable makes switching to Godot "trivial," so Epic's moat now has to be velocity, not lock-in. ("This is why we are pivoting hard towards velocity.")

[`🔗 IEEE Spectrum: Epic Games Turns to AI Coding for the Unreal Engine`](https://spectrum.ieee.org/epic-games-unreal-engine-ai) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50573681)

---

## 11. HippoMaps: deterministic natural-language search over OpenStreetMap — no LLM in the loop

- **Velocity:** ▮ steady
- **Source:** Hacker News · 112+ pts · ~29h ago
- **Tags:** `openstreetmap` `search` `nlp` `maps`

A Show HN that keeps climbing: HippoMaps is a full map-and-navigation app over OpenStreetMap with a custom Overpass API engine, whose actual thesis is the query parser. The author: "I started working on a deterministic (as in no LLMs used) parser of queries that translates them to the Overpass QL" — queries are tokenized and "what"/"where" are resolved from word lists (known brands, sports, OSM tags) rather than a model. Ask for "cafes by the Limmat 100 m from the lake in Zurich" and it compiles to a structured Overpass query, fast enough to feel instant.

**Why it matters:** In a week where every search surface is being wrapped in an LLM, a working demonstration that the *last* Google-Maps-grade feature — natural-language place search — can be done deterministically is both an engineering result and a cost/latency argument. The thread reads as OSM-community wishlisting; the hard part (query understanding) is the part it solves.

[`🔗 HippoMaps`](https://hippomaps.ch/) · [`🔗 Show HN discussion`](https://news.ycombinator.com/item?id=50561199)

---

## 12. floppy3.5: a 3.5-inch floppy drive that's a WiFi NAS — for Sony Mavica cameras

- **Velocity:** ▮ steady
- **Source:** Hacker News · 114+ pts · ~30h ago
- **Tags:** `hardware` `retro` `raspberry-pi` `nas`

A pocket-sized device that slides a 1.44 MB FAT12 floppy into a slimline drive and serves it over WiFi: RP2354A floppy controller speaking the Greaseweazle protocol, ESP32-S3 bridge, photos visible at `floppy.local` in a browser and copyable to microSD — built to rescue photos from 1990s digital cameras like the Sony Mavica that stored them on disks modern machines can't read. Both processors are OTA-updatable, the hardware is one custom PCB, and v1.1.0 shipped Nov 17 with quality-of-life fixes.

**Why it matters:** Half nostalgia, half genuinely useful archival tool — every Mavica owner has shoeboxes of disks and no working reader. It's also a nice minimal design: one RP2350-family chip doing flux-level floppy IO via Greaseweazle is a masterclass in doing a lot with 1.44 MB.

[`🔗 bigcrimping/floppy3.5`](https://github.com/bigcrimping/floppy3.5) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50560595)

---

## 13. tamserve: vLLM-style serving for video tracking — one SAM 2 copy tracks 64 cameras on one GPU

- **Velocity:** ▮ steady
- **Source:** Hacker News · 122+ pts · ~95h ago
- **Tags:** `computer-vision` `inference` `sam` `serving`

tamserve is the serving layer SAM 2/EdgeTAM never had: the released code tracks one recorded video at a time, so multi-camera deployments run one model copy per camera and memory piles up. tamserve batches every camera through a single shared copy — "what LLM servers such as vLLM do for chat" — and the README's own table has the receipts: 8 cameras drop from 8.6 GB to 2.2 GB of GPU memory, a single camera speeds up 177 → 219 frames/s, eight cameras run at 323 frames/s, and 64 cameras — about 70 GB the old way — fit in 5.7 GB at 321 frames/s, with accuracy "unchanged on DAVIS 2017." Apache-2.0, a Colab quickstart, and a demo video of six live cameras tracking nine objects.

**Why it matters:** Continuous world-monitoring is the workload agent-era vision is heading toward, and it hits the same wall chat hit in 2023: per-request model copies don't scale. The batched-sharing pattern transferring from LLMs to tracking is the generalizable idea here.

[`🔗 aryamandarda/tamserve`](https://github.com/aryamandarda/tamserve) · [`🔗 Show HN discussion`](https://news.ycombinator.com/item?id=50523377)

---

## 14. Dettato: a 20M-parameter audio-to-MIDI model that outscores a 1.3B one — trained on no copyrighted recordings

- **Velocity:** ▮ steady
- **Source:** Hacker News · 183+ pts · ~91h ago
- **Tags:** `audio` `midi` `music-ai` `open-source`

Kobi's Dettato (introduced Nov 16, still climbing) reports SOTA audio-to-MIDI transcription at 20M parameters — "roughly 65x smaller than muscriptor" (47.4 composite) — and a bit above Mirelo's closed A2M v1.1 Pro (56.1) on Mirelo's own published benchmarks: composite 60.8, with the per-set F1 table published in full. Two honesty notes worth more than the headline: the model was "trained on absolutely no copyrighted recordings," and its own disclaimer names the weakness — "one thing my model performs poor on for instance, is splitting instruments correctly" — while pointing sheet-music seekers to Songscription and Klangio.

**Why it matters:** A 65× smaller open model beating a closed one on the incumbent's benchmark, with per-set numbers and stated failure modes, is the shape more benchmark fights should take. Transcription is also a rights-clean data story: no copyrighted training audio, commercial use allowed.

[`🔗 Dettato: model card and benchmarks`](https://kobi.music/research/dettato) · [`🔗 Show HN discussion`](https://news.ycombinator.com/item?id=50526023)

---

## 15. Thinking Machines ships Inkling 2 Mini — a looped transformer with open weights that runs on your laptop

- **Velocity:** ▮▮▮ trending
- **Source:** Thinking Machines · 780+ pts on HN · ~8h ago (~04:15 UTC+8)
- **Tags:** `ai-models` `looped-transformer` `open-weights` `local-inference` `monitorability`

Thinking Machines released Inkling 2 Mini, an open-weights model that is "a looped transformer, running the middle layers of the model three times for every token" — a 26.4B-total/3.4B-active MoE whose 24 stored layers apply 48 times per token, so "looping allows the model to reason longer without writing its reasoning down." The headline claim: it "leads every open-weights model with less than 100B total parameters on benchmarks such as DeepSWE v1.1 (48.2%) and Vals Index v2.2 (46.5%)," with SWE-bench Pro v2 Hard at 77.9% (harnesses named in the table) and a Stanford Hazy Research "intelligence per watt" reading of 0.703 on a DGX Spark — the best of four local models measured, next best 0.430. "The total memory footprint of Inkling 2 Mini is ~20GB," trained and deployed natively in NVFP4 (last four layers MXFP8) with "no conversion loss from quantization," and it runs via Ollama on any Mac with 32GB+ RAM — the launch demo builds a flight simulator offline, in airplane mode, on a MacBook Pro. Alongside it ships TML-d24-varloop-research, a variable-loop research model for the question looping raises: the no-CoT time horizon rose "from 16 seconds at one pass to 37 seconds with three," yet the chain of thought "grew shorter with more loops but stayed legible throughout."

**Why it matters:** Looping attacks the CoT-monitorability concern directly — more computation per token means more reasoning that never gets verbalized — and Thinking Machines shipped the measurement with the model: no meaningful monitorability loss at this scale, and no upward trend on agentic-sabotage tests. The limitations section is worth reading before the benchmarks: multi-turn chat and many-constraint instructions still trail Qwen3.8-27B.

> "Inkling 2 Mini is not the strongest small model for multi-turn chat or for instructions with many constraints: it scores 50.0% on MultiChallenge and 33.4% on ComplexConstraints v1.1, behind Qwen3.8-27B on both."

[`🔗 Thinking Machines: Introducing Inkling 2 Mini`](https://thinkingmachines.ai/news/inkling-2-mini/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50581260)

---

## 16. "We promoted developers into architects without informing them" — the vibe-coding backlash gets its job-description essay

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 335+ pts · ~10h ago (~02:15 UTC+8)
- **Tags:** `craft` `ai-coding` `architecture` `essay` `career`

A Google Forms addon developer's post (335+ points, 200+ comments) opens with a 15-second welcome screen: a colleague vibe-coded the install-logging, and AI's answer to Google's consent restrictions was three nested try/catch fallbacks — "all of these are one line of code, but internally each of these makes multiple API calls to Google servers" — run before anything renders. The diagnosis: "AI is great at writing code. But it doesn't know if you are launching the app or have millions of users," and "it is also sycophantic and tries to execute your requirements exactly without pushing back." The essay's move is to rename the job: "if you generate code by specifying your requirements instead of specifying your architecture, AI will decide the architecture on your behalf" — so define the data model, constrain the agent to it, decide when backward compatibility is worth duplicate tables, and review "the way an architect reviews a developer's code."

**Why it matters:** It's the constructive counterpart to this batch's skill-atrophy essay (item 8): where that one names the loss, this one names the promotion nobody announced — "You got promoted. Nobody told you, so I am telling you." The Harvard firm-level study (Nov 18) supplies the mechanism: review is the bottleneck, so the person who can push back on requirements before code exists is the scarce role.

[`🔗 We promoted developers into architects without informing them`](https://manidoraisamy.com/developer-to-architect.html) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50579331)

---

## 17. DreamCoder: the Mastering Emacs author spent 15 months building a browser-native coding harness

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 140+ pts · ~8h ago (~04:10 UTC+8)
- **Tags:** `coding-harness` `emacs` `agent-tools` `ide`

Mickey Petersen — the Mastering Emacs author — announced DreamCoder, "a frontier coding harness with a tiling window manager that runs in your browser on all 3 platforms," after "15 months of work" that began by hand in May 2025. The design is Emacs translated to the agent era: every pane has minimum/comfortable/maximum sizes resolved by "a sophisticated constraint satisfaction solver"; workspaces act as virtual desktops; a per-workspace minimap pulses while an agent works and flags the blocked ones; avy-style jumping and Helm-like palettes replace tab-cycling; `Alt+x` opens global commands. The frontier checklist is checked — "MCP, backgroundable sub agents and shell commands, terminal windows, skills, hooks, 99% cache hit, it runs for days" — with an importer for Pi, OpenCode and Codex configs and first-class open-weight model support ("Qwen 3.8 27B, for example, is fantastically good for its size"). The essay's turning point: he started it in Emacs, "only to see DreamCoder write itself… in DreamCoder today."

**Why it matters:** "Taste is a scarce, human resource" is the essay's thesis, and the harness category is where it's testable — every competitor converges on the same chat-sidebar shape because taste is the part models don't supply. His declared next project inside DreamCoder: a pentest suite, "built for humans. The AI does the work."

[`🔗 Announcing DreamCoder`](https://www.masteringemacs.org/article/announcing-dreamcoder) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50581110)

---

## 18. NINLIVE: a fan-run archive of 1,210 Nine Inch Nails concerts — now streaming back to 1988

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 160+ pts · ~5.5h ago (~06:35 UTC+8)
- **Tags:** `archives` `music` `streaming` `fan-projects`

The front page's sleeper is a fan-run Nine Inch Nails live archive: 1,210 concerts, 1,949 recordings, 4,675 photos and media, 363 songs tracked across 46 countries and 373 cities. What triggered the thread is the Nov 16 update — "The Future Is Here - ninlive Streaming 1988-2026": "You are now able to stream all of your favorite NIN live recordings from 1988-2026," with Discord login for saved favorites. The updates feed reads like archival maintenance as a way of life — an uncirculated DAT master surfacing for a 1994 Los Angeles show ("First recording available from the third and final night!"), a "200 DAT tape project" just finished for a fellow taper, ticket stubs and setlist scans being photographed show by show. The footer says it plainly: "Fan run, not affiliated with the band."

**Why it matters:** The same instinct as this week's Salon preservation and the Apple-forums rescue: the archive is the durable artifact, and the unglamorous engineering — tape-provenance tracking, streaming infrastructure, per-show metadata — is being done by volunteers for one band's tape trail.

[`🔗 NINLIVE`](https://ninlive.com/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50583274)

---

## 19. Vibecoding an inference chip: an FPGA runs an LLM at 213 tokens/s — after agents wrote ~3M lines

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 120+ pts · ~10h ago (~02:15 UTC+8)
- **Tags:** `fpga` `ai-coding` `inference` `hardware`

Ankit Gupta's writeup: he rented an AWS F2 FPGA instance (16 GB HBM), pointed a cloud agent at DeepGrove's ternary-weight architecture, and several days later had bit-exact LLM inference on hardware — "increased its speed by 33× from the first full-model bit-exact baseline to get it to a real-time relevant speed," 6 → 213 tokens/s across 14 compounding optimizations (burst attention, a parallel MoE router, exact speculative decoding with a draft model, lossless 5-trit weight packing). The bill: "roughly 3M lines across the experiment history and parsing 30M lines of output files, burning only $10,000 in Claude and OpenAI tokens." His prompts were mostly encouragement — "you're a superintelligent model, time to be more creative" — and when he pasted in a veteran's FPGA-design guide, the agent's own retrospective was: "Its biggest design ideas were already in my plan before you pasted it."

**Why it matters:** The verification discipline is the transferable part — the run was held to a bit-exact contract against a CPU reference, with simulation, timing and board results kept separate — and Gupta's conclusion names the division of labor precisely: "the humans are still useful at defining how to iterate fast and what correctness looks like, and the agents are great to manage the exploration."

[`🔗 Vibecoding an inference chip`](https://ankitg.me/blog/vibecoding-inference-chip/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50579297)

---

## 20. Winedroid: real Android APKs in your browser — a Rust runtime that "essentially replicates Android"

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 115+ pts · ~8.5h ago (~03:35 UTC+8)
- **Tags:** `android` `wasm` `rust` `emulation`

A Show HN demo runs F-Droid APKs — OpenCalc, a meditation timer, a file explorer, a weather app — in the browser with no Android involved. Winedroid is "written completely in Rust and it essentially replicates Android so it works everywhere," per its FAQ; the runtime loaded in the browser is "12MB right now," and the repo (created today, 86★ at read time) targets "Web, Linux, macOS and Windows." The caveats are stated upfront: the JIT doesn't work on the web target, so the browser demo is slower than running natively, and app coverage is "still improving day by day."

**Why it matters:** It's Wine's original move — reimplement the API surface, not the machine — applied to Android, which would decouple apps from Google's runtime the way Wine decoupled Windows software from Windows. Early, but the browser-native target is the interesting bet: distribution without an app store.

[`🔗 winedroid demo`](https://winedroid.soham.sh/demo/) · [`🔗 sohzm/winedroid`](https://github.com/sohzm/winedroid)

---

## 21. Slopstrap: a CSS framework for making honest websites look hastily vibecoded

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 110+ pts · ~12.5h ago (~23:15 UTC+8)
- **Tags:** `satire` `css` `vibecoding` `design`

Mike Lacher's parody framework ships every tell of the 2026 generated landing page as a copy-paste component: blinking status dots ("All Systems Operational", "0 Real Incidents"), fat colored left borders, gradient headings over "low-contrast slate-400" body copy, "one arbitrary italic serif word," bento grids that "fracture any simple paragraph into an asymmetrical grid of glowing rounded boxes," auto-generated testimonials ("Sarah Chen has used your product and can't stop talking about it"), and stat counters that animate on scroll. The demo applies `Slopstrap.slopify('#plain-demo')` to "Bob's Local Plumbing & Pipe Repair" — serving Springfield since 1998, "we actually pick up the phone when your basement is flooding" — and converts it into a glowing card grid on click.

**Why it matters:** Satire is doing taxonomy work: the kit is a checklist of exactly which visual signals now read as machine-generated, and it even ships an `/agents` page — "Why use an agent if people can't tell an agent made your site?" — the joke's endpoint being that the slop look has become a genre agents reproduce on demand.

[`🔗 Slopstrap`](https://slopstrap.mikelacher.com/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50576012)

---

## 22. pip ships a 9.3: versions before 26.2.2 bundle certifi carrying the compromised eMudhra certificates

- **Velocity:** ▮▮ rising
- **Source:** NVD · CVE-2026-133949 · published Nov 20 (~19:18 UTC, ~03:18 UTC+8)
- **Tags:** `security` `pip` `python` `supply-chain` `emudhra`

The PSF's CNA published CVE-2026-133949: "pip prior to v26.2.2 the certifi bundled with pip contains the compromised eMudhra certificates." The rating is 9.3 Critical (CVSS 4.0, CNA-assigned by the PSF; CVE-2026-133949 was still `Received` on NVD at check time). The record's remedy has an order of operations: upgrading "either by first upgrading Python to a version that rejects the compromised intermediates (CVE-2026-115557) or use hash pinning with a known-secure version of pip." The state that makes it livable: "pip is not vulnerable when using a Python version that rejects the compromised certificates." The PSF's user-facing discussion thread and pip PR #14371 carry the operational detail.

**Why it matters:** October's eMudhra/emSign CA compromise is still propagating outward through the toolchain, and this hop reaches every machine that installs packages with an old pip. The Python-rejects-the-intermediates dependency is the part to read twice — patching pip alone may not close it.

[`🔗 NVD: CVE-2026-133949`](https://nvd.nist.gov/view/vuln/detail?vulnId=CVE-2026-133949) · [`🔗 PSF: discussion for Python users`](https://discuss.python.org/t/information-for-python-users-regarding-emudhra-emsign-ca-certificate-security-incident/109576) · [`🔗 GHSA-6q48-6c7w-9gw2`](https://github.com/advisories/ghsa-6q48-6c7w-9gw2)

---

## 23. Since we covered the two NGINX RCEs yesterday: the same release carried ten fixes — and the repo is on trending

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending + nginx.org · releases Nov 18, disclosure Nov 19
- **Tags:** `security` `nginx` `patching` `http2` `mtls`

The 1.31.9 mainline and 1.30.7 stable releases that closed the two RCEs from yesterday's item (CVE-2026-123633, CVE-2026-123007) actually fixed **ten CVEs** at once. nginx's advisories rate severity with word labels, not CVSS scores: three "major" — memory corruption in HTTP/2 flow control (CVE-2026-123007), an "Infinite loop while reading client request body over TLS 1.3" (CVE-2026-118899), and a "Use-after-free in mail proxy module" (CVE-2026-113425) — with the rest medium or minor, including an "SNI bypass when using client certificate validation in stream" (CVE-2026-120967) and "Insufficient validation in stream ssl_preread module" (CVE-2026-123640). The nginx repo sits on GitHub's trending board today — the patch wave is the traffic.

**Why it matters:** The two-RCE headline undersold the release. The stream-module SNI bypass is the quiet one for anyone terminating mTLS at nginx: client-certificate validation that can match the wrong SNI is an access-control bug, not a crash — and it's fixed in the same upgrade as the RCEs.

[`🔗 nginx security advisories`](https://nginx.org/en/security_advisories.html) · [`🔗 release-1.31.9`](https://github.com/nginx/nginx/releases/tag/release-1.31.9)

---

## 24. Two more CVEs land in the MCP server layer: a Tapo DNS-rebinding actuation bug and an SSH-manager cron persistence flaw

- **Velocity:** ▮▮ rising
- **Source:** NVD · 2 records published Nov 20 · both GitHub_M-assigned
- **Tags:** `security` `mcp` `agents` `dns-rebinding` `command-injection`

Both records published Nov 20, both CNA-assigned by GitHub, both 8.8, both fixed. **CVE-2026-77329** (CVSS 4.0, fixed in tapo-mcp 0.5.0): the Rust/Python Tapo MCP server for TP-Link smart-home devices "calls disable_allowed_hosts() without replacement Host or Origin validation," so "a malicious website can use DNS rebinding to send same-origin browser requests to the victim's local or LAN Tapo MCP listener when it runs without an API key" — reaching "control_device for smart-device actuation and take_snapshot for configured cameras." **CVE-2026-129995** (CVSS 3.1, fixed in 3.8.5): mcp-ssh-manager's backup tools "build remote shell commands from caller-controlled values" "without neutralizing shell metacharacters," so crafted arguments "can therefore execute arbitrary OS commands on managed remote servers as the configured SSH user" — and "ssh_backup_schedule can persist execution through cron."

**Why it matters:** Last week's agent-stack CVE wave (Phoenix, CubeSandbox, MCP Python SDK) continues, and the pattern holds: the dangerous surface isn't the model, it's the tool server bound to localhost or a LAN behind an optional auth flag nobody sets. A listener that can actuate physical devices and read cameras is the stakes going up.

[`🔗 tapo advisory GHSA-2cwc-6wwp-62q6`](https://github.com/mihai-dinculescu/tapo/security/advisories/GHSA-2cwc-6wwp-62q6) · [`🔗 mcp-ssh-manager advisory GHSA-qwwm-vrm9-4mw8`](https://github.com/bvisible/mcp-ssh-manager/security/advisories/GHSA-qwwm-vrm9-4mw8) · [`🔗 NVD: CVE-2026-77329`](https://nvd.nist.gov/view/vuln/detail?vulnId=CVE-2026-77329)

---

## 25. OpenComputer: Digger's open-source Devin alternative — @Computer in Slack, sessions in rootless Podman

- **Velocity:** ▮ steady
- **Source:** Show HN · 75+ pts · ~7.5h ago (~04:30 UTC+8)
- **Tags:** `ai-agents` `devtools` `slack` `self-hosted`

A Show HN launch from the Digger team: "Mention `@Computer` in a Slack thread with a task, it works on its own computer, you & your team can watch and steer it as it goes, and the result lands as a pull request." The stack is deliberately boring: one VM with outbound-only networking runs a gateway called Calvin that starts Claude Code, Codex or OpenCode sessions per Slack thread — "each session is isolated with rootless Podman" — while the control plane is Cloudflare Workers and Durable Objects. The launch's hook is a benchmark: "in our benchmark it opens PRs 3.3x faster than Devin," beside a side-by-side race against local Claude Code (32.0s vs 36.2s). "We built it to feel as fast as Claude Code on your laptop."

**Why it matters:** The agent-on-its-own-computer category is consolidating around Slack-as-orchestration over your own cloud compute — and open-sourcing "from the compute layer up" is the pitch against Devin, with isolation primitives (rootless containers, outbound-only VMs) a security team can actually review.

[`🔗 diggerhq/opencomputer`](https://github.com/diggerhq/opencomputer) · [`🔗 Show HN discussion`](https://news.ycombinator.com/item?id=50581403)

---

## 26. Poste.io ships 2.5.22 for a 9.2: unauthenticated root RCE via DMARC report attachments

- **Velocity:** ▮ steady
- **Source:** NVD · CVE-2026-127027 · CERT-PL advisory · published Nov 20
- **Tags:** `security` `email` `rce` `mail-server`

CERT-PL published CVE-2026-127027 (9.2 Critical, CVSS 4.0, CNA-assigned; fixed in 2.5.22) in Poste.io, the all-in-one Docker mail server. "Email sent to dmarc-reports@<domain> is saved without sender verification," and "Script that runs as root unpacks the attachments using unsafe shell commands, allowing command injection through crafted attachments (e.g. file names or archive contents)." The result: "a remote unauthenticated attacker who can send an email to the server's port 25 can execute arbitrary commands as root within the Poste.io container."

**Why it matters:** The attacker needs only the ability to send email to your domain — no credentials, no user interaction — which makes this about as close to a zero-click remote root as mail servers get. If you run Poste.io, 2.5.22 is today's upgrade; the container boundary is the only thing between the attacker and the host.

[`🔗 CERT-PL advisory`](https://cert.pl/en/posts/2026/11/CVE-2026-127027) · [`🔗 NVD: CVE-2026-127027`](https://nvd.nist.gov/view/vuln/detail?vulnId=CVE-2026-127027)

---

## 27. GitHub suspends a user's account to 404 with no email — then restores it within hours

- **Velocity:** ▮ steady
- **Source:** Hacker News · 50+ pts · ~4.5h ago (~07:35 UTC+8)
- **Tags:** `github` `platform-risk` `moderation`

A small story with a sharp edge (50+ points, 46 comments): a developer's GitHub account (`0n4t3`) was suspended — profile 404, "all my personal projects are gone" — with "not so much as a pop up notification or email on what happened." After the thread gained traction, the account came back, and the post now opens with "Update — I'm back!", crediting "whoever undid my (prob automated?) deletion and/or ban on Github." The lasting lines: "I still have no idea what got me banished or if it'll happen again. Still not so much as a pop up notification or email on what happened, lol, just a random banishment then unbanishment." He's now mirroring locally and considering migrating.

**Why it matters:** It's the Codeberg registrar suspension (Nov 18) seen from the account side: moderation actions that take a whole identity offline arrive through no notification channel, and the resolution — un-banishment by whoever happened to notice — is not a process. Mirror your repos; the platform's appeal path is a thread going viral.

[`🔗 Help github just deleted me`](https://nate.mecca1.net/posts/2026-11-20_help/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50583911)

---

## 28. Backblaze's new privacy notice says it may sell or share personal information for targeted advertising — at a backup company

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 201+ pts · ~9h ago (~11:20 UTC+8)
- **Tags:** `privacy` `backup` `data-rights` `industry`

Backblaze — the backup provider whose entire pitch is that your data is safe with it for years — published a new "Notice at Collection and Privacy Policy," and the resulting thread (201 points) is a referendum on it. The notice states that personal information — the category list includes "Internet or Other Similar Network Activity; Commercial Information; Geolocation Data" — may be sold or shared for "cross-context behavioral advertising," with the opt-out spelled out: "You have the right to direct us to stop selling or sharing your personal information for cross-context behavioral advertising" via a "Your Privacy Choices" link or a Global Privacy Control signal. Two precise readings matter. The notice does **not** say backup file contents are sold — the categories in question are account and usage personal information, and it states both "We do not sell or share sensitive personal information" and "No" beside precise geolocation. And it is opt-OUT — a separate preferences form rather than opt-in, which the thread read as a dark pattern.

**Why it matters:** "Backup is a trust business. The entire product promise is 'your data is safe with us for years,'" as the thread's top framing puts it — monetizing that same customer relationship through advertising data-sharing is the opposite promise. The concrete actions: set your privacy choices or enable GPC before your next backup, and read any backup vendor's notice at collection before renewal.

[`🔗 Backblaze Notice at Collection and Privacy Policy`](https://www.backblaze.com/company/policy/privacy) · [`🔗 HN discussion (201 points)`](https://news.ycombinator.com/item?id=50585593)

---

## 29. GnuPG discloses a critical GPGME double-free — data exfiltration via signed mail, RCE "can't be ruled out" — and pulls the disclosure forward

- **Velocity:** ▮▮▮ trending
- **Source:** gnupg-announce · 43+ pts on HN · ~3.6h ago (~16:35 UTC+8)
- **Tags:** `security` `gnupg` `cve` `memory-safety`

Werner Koch announced GPGME 2.3.1, fixing "a critical security bug found in all prior versions" — CVE-2026-129975 (internal T8557), a double-free triggered by an OpenPGP key carrying "a crafted very long user id." The mechanics are a stale-pointer class bug: the buffer-realloc path "is only assigned back to the context object at the end of the function," so an early return on a read error leaves the context holding freed memory that gets freed again — and allocator double-free checks may miss it "due to other allocations in between." The impact chain is unusually practical: "This double free can be used exfiltrate data from applications by sending for example signed data," and "Exploiting this bug to mount an Remote Code Execution attack (RCE) can't be ruled out. Thus an immediate update is highly suggested." The affected list is most of the OpenPGP desktop world — Gpg4win, GnuPG Desktop and VS-Desktop, "Most mail clients," many XMPP clients, Samba, Flatpak. The disclosure itself has a story: researcher Johan Carlsson's finding, coordinated via GitLab for 2026-11-25, moved up to Nov 20 because "due to the new Ruby2Shell bug GitLab had to update earlier" — the same wave as yesterday's Ruby emergency releases. No NVD record existed yet at this run's check (12:09Z).

**Why it matters:** GPGME is the library between applications and gpg, which makes this an application-side memory bug that a hostile key can reach through ordinary signed email. The patch problem is the dependency tree: statically linked binaries need rebuilding against 2.3.1, and distro updates will trail the announcement by days.

[`🔗 GnuPG advisory (gnupg-announce)`](https://lists.gnupg.org/pipermail/gnupg-announce/2026q4/000517.html) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50587208)

---

## 30. Iceland's largest hosting provider shuts everything down after an attack its managing director says burned "tens of millions in artificial intelligence costs"

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 94+ pts · ~12.7h ago (~07:30 UTC+8)
- **Tags:** `security` `hosting` `iceland` `ai-powered-attack`

1984 ehf — per its managing director "probably by far the largest provider of website and email hosting services in Iceland" — took all of its services offline after a cyberattack on its front-end systems, affecting tens of thousands of customers, with CERT-IS and Iceland's Electronic Communications Office working the incident. The detail that traveled is Mörður Áslaugarson's characterization of the attacker: "These are professionals, and this was probably an enormously well-funded attack. We're talking about tens of millions in artificial intelligence costs. It happened at a speed unlike anything anyone has ever even heard of." Restoration is gradual — email and DNS first — tracked on the company's public status page; he adds "There are certain theories about which groups were behind this, but none of them has been confirmed."

**Why it matters:** Whether the "tens of millions in artificial intelligence costs" figure survives scrutiny or not, the claim is this week's security cascade in miniature: attacks whose execution speed only large compute budgets buy, aimed at infrastructure a country actually runs on. A national-scale hosting provider choosing complete shutdown is the defensive mirror of the month's outage stories.

[`🔗 RÚV: Serious cyberattack thought backed by wealthy operators`](https://www.ruv.is/english/2026-11-20-serious-cyberattack-thought-backed-by-wealthy-operators-493411) · [`🔗 1984 status page`](https://status.1984.is/status/public) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50583856)

---

## 31. The FBI is reportedly investigating a breach of its criminal database (NCIC) — while USDA's farmer-payment system absorbed a cyberattack

- **Velocity:** ▮▮ rising
- **Source:** BBC + France24 (via NBC, CNN) · 40+ pts on HN · ~1.6h ago (~18:35 UTC+8)
- **Tags:** `security` `fbi` `breach` `ncic`

Per US media citing two people briefed on the issue, the FBI is investigating "an apparent breach of its criminal information database" — NCIC, the system federal and local law enforcement use to share warrants and background checks. It would be the bureau's second incident this fall: in September the ShinyHunters group claimed it had stolen data on all ~38,000 FBI staff. Separately, USDA told employees that its farm payment system "had been targeted" (NBC, via two former USDA officials); the department hasn't commented. Both land amid Washington's post-outage scrutiny — the same week the White House fired National Cyber Director Sean Cairncross — with CNN noting the FBI was "hacked for the second time since September," and reporting that it remains unclear whether the two incidents are related or who is responsible.

**Why it matters:** NCIC records feed arrests and officer-safety checks; a breach there is not a statistics leak. And the context matters as much as either incident: after a month of officially-not-cyberattack outages, two simultaneous federal breach investigations will make "was this one?" the default question for every future outage.

[`🔗 BBC: FBI reportedly investigating apparent hack of its criminal database`](https://www.bbc.com/news/articles/cvze7de86pk3o) · [`🔗 France24: US Agriculture Department and FBI hit by cyberattacks`](https://www.france24.com/en/americas/20261121-us-agriculture-department-fbi-hit-by-cyberattacks-media-report) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50587859)

---

## 32. ClawDOS: an AI coding agent for DOS — running on a real 1981 IBM PC XT

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 84+ pts · ~6.5h ago (~13:40 UTC+8)
- **Tags:** `ai-agents` `dos` `retro` `coding-agent`

A Show HN that is exactly what it says: a chat-and-coding harness for DOS on original hardware — an IBM PC 5160 with "an 8088 at 4.77 MHz, 640K of RAM, a CGA card." HARNESS.EXE is a 176 KB DOS program that speaks the Claude Messages API itself: it writes the requests, parses the streamed reply, runs the tools and keeps each conversation in its own directory, maintaining notes between sessions so the agent "picks up where it left off." It reads and edits disk files, writes programs, compiles them with Turbo C, runs them "and looks at what they draw on the screen." TLS is offloaded to a separate "bridge" PC, since an 8088 can't manage it. The author's note is candid: "100% of this repo is written by Claude, with the exception of the text within this box" — and the site itself was the agent's next exercise: "can that something it built then build other somethings?"

**Why it matters:** Constraint-driven harness engineering is how the craft improves — every idea here (streaming parser, filesystem-scoped workspaces, cross-session memory) had to be rebuilt for a 640K machine, which is a stress test of what an agent loop actually needs. It's also the year's best entry in the agents-writing-agents series.

[`🔗 ClawDOS`](http://ricapar.net/ClawDOS/) · [`🔗 Ricapar/ClawDOS`](https://github.com/Ricapar/ClawDOS) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50586292)

---

## 33. Apple's team releases Depth Pro 2: metric depth for images *and* video that is sharp and temporally consistent — code and weights on day one

- **Velocity:** ▮▮ rising
- **Source:** arXiv · 2611.26603 · code + weights released Nov 20
- **Tags:** `computer-vision` `depth-estimation` `open-weights` `apple`

Depth Pro 2 (submitted Nov 19, from the team around Vladlen Koltun) attacks monocular depth's defining trade-off: multi-frame methods buy temporal consistency and lose boundary sharpness; single-frame methods do the reverse. The team trains "a single, scalable network that processes both images and video and predicts depth maps at native resolution," and claims metric accuracy, sharpness and temporal consistency "all at once, outperforming prior work in all of these dimensions" — a family of models it says defines "a new Pareto frontier in terms of metric accuracy, sharpness, temporal consistency, and runtime." Code and weights shipped at release into a new `apple-aiml-research` org (the old `apple/ml-depth-pro` URL now redirects), and the ecosystem moved within a day: ComfyUI nodes and ONNX/TensorRT ports appeared Nov 20.

**Why it matters:** Metric video depth is infrastructure for robotics, AR and agent perception, and this is now the open-weights baseline others will build against. The overnight ComfyUI/ONNX ports are also a small case study in how fast open releases get repackaged.

[`🔗 arXiv: Depth Pro 2`](https://arxiv.org/abs/2611.26603) · [`🔗 apple-aiml-research/ml-depth-pro-2`](https://github.com/apple-aiml-research/ml-depth-pro-2)

---

## 34. "AI is giving everyone the same advice": 127,918 questions to 65 models measure the defaults — and find where they come from

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 92+ pts · ~19h ago (~00:50 UTC+8)
- **Tags:** `ai-research` `homogenization` `evaluation`

Cody Collier's independent experiment asked the questions people actually ask — "65 AIs from 30 companies… 127,918 times" — and measured the sameness. "Recommend one book that will change my life" returned *Man's Search for Meaning* 73 times in 100; business ideas converged on subscription boxes 76 in 100; what to study → computer science 90%; where to invest $10,000 → index fund 98%. The sharp edges: of "3,151 people the AIs made up," 69% were exactly 34; each company has signature names ("Claude invents Marisol, Gemini invents Elena"); and using only harmless questions, "59% of AIs answer most like another AI from the same company, against 4% by chance." The mechanism claim is the most useful part: in an open model he could measure at every training stage, the favorite answer appears "when it's taught to be an assistant" — and the defaults leak into the world ("Elena Vance… is named in 684 new GitHub projects this year. Before 2025: none").

**Why it matters:** Homogenization has been argued; this is a measurement, with the cause localized to assistant tuning rather than pretraining data. Its practical advice also survives scrutiny: asking the AI to "be original" doesn't work — context does.

[`🔗 AI is giving everyone the same advice`](https://a90.com/experiments/same-advice/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50577872)

---

## 35. "The gig economy has arrived for cardiologists": Scale AI's Outlier pays doctors $180/hour — then applies the data-worker playbook

- **Velocity:** ▮ steady
- **Source:** Rest of World · 146+ pts on HN · ~43h ago
- **Tags:** `labor` `data-work` `gig-economy` `industry`

Julián Posada (Yale, author of "Platform Extractivism") documents the next tier of AI's labor supply: physicians, lawyers and Ph.D.s recruited into data work. Outlier — run by Scale AI — advertises "up to $180 an hour for physicians in the U.S. to design complex cardiac scenarios, review artificial intelligence-generated reports, and rank model outputs," while the same job pays "up to $7.50 an hour for Tagalog work in the Philippines" and "up to $12.50 an hour for Swahili in Tanzania." The essay's point is the pattern, not the rates: the tactics documented across the global data workforce — pay cuts, task scarcity, sudden deactivation and ghosting — are now applied to credentialed professionals who assumed the playbook wasn't for them.

**Why it matters:** The frontier-labor market is converging on one global rate card with regional multipliers — and the premium roles are premium precisely because they're training the models that price them out. For anyone considering "AI evaluation" as side income, this essay is the due diligence.

[`🔗 Rest of World: AI isn't replacing your job. It's turning it into low-paid gig work`](https://restofworld.org/2026/ai-jobs-skills-gig-work/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50562500)

---

## 36. A court denies qualified immunity to a detective who arrested on a facial-recognition match alone — "the Fourth Amendment does not permit an individual to be arrested based on nothing more than an uncorroborated conclusion by AI"

- **Velocity:** ▮ steady
- **Source:** Techdirt · 69+ pts on HN · ~37h ago · ruling on DocumentCloud
- **Tags:** `policy` `facial-recognition` `fourth-amendment` `law-enforcement`

The story behind the ruling is a bad-check arrest that fell apart: Alain Osorio was arrested after Florence (KY) PD Detective Ryan Kilmer ran bank CCTV stills through facial recognition and — in the decision's words — "Relying solely on the AI identification… concluded that 'Yony' was actually Alain Vizcay Osorio," a match to a Facebook profile "for an unknown reason." Osorio sat in custody; the charges were dismissed after he proved he was in Nebraska at the time. In the resulting civil suit, the court denied qualified immunity, holding that "the Fourth Amendment does not allow a detective to delegate to AI the task of assessing probable cause" — and that "no reasonable detective in the Defendant's position could conclude otherwise." The decision also notes Florence PD's own policy already said facial recognition alone can't establish probable cause. Techdirt's read on the blast radius is why it went viral: the same logic reaches predictive policing and AI-written police reports.

**Why it matters:** This is case law where the model's uncorroborated word fails as a basis for state power — a precedent every vendor selling AI triage to law enforcement now has to clear, and the no-immunity holding means it's headed to appeal rather than settling quietly.

[`🔗 The decision (DocumentCloud PDF)`](https://www.documentcloud.org/documents/28909866-ai-isnt-pc/) · [`🔗 Techdirt analysis`](https://www.techdirt.com/2026/11/19/court-tells-cops-that-the-4th-amendment-doesnt-cover-ai-generated-probable-cause/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50567735)

---

## 37. Twice-Told Critiques: at ICLR, claim-level overlap between reviews rose 12.0% → 21.3% in one year

- **Velocity:** ▮ steady
- **Source:** arXiv · 2611.26286 · submitted Nov 19
- **Tags:** `peer-review` `llm-detection` `ai-research`

A single-author measurement study (Ilya Gusev) quantifies what the peer-review debate has been asserting: reviews of the same paper increasingly find the same problems. Measuring claim-level overlap "in reviews from the same stage of the review process," ICLR rose from 12.0% (2026) to 21.3% (2027), with year-on-year rises at NeurIPS, ICML and the F1000 and PLOS journals; a third ICLR review added 5.46 new problems beyond the first two in 2027, down from 6.12 in 2026. Cross-checking with MELD (an LLM-text detector): "two reviews that MELD flags overlap more than two unflagged reviews: by 3.0 points at ICLR in 2024-2025, by 4.5 points in 2026-2027, and by 5.4 points across five journal sources" — evidence that flagged reviews are "less distinct from each other."

**Why it matters:** It gives the "Can Peer Review Survive AI-Generated Text?" proposal (Nov 18) its first concrete number — not text that looks AI-written, but review sets that behave as if one reviewer wrote them. Reviewer assignment, referral systems and meta-reviewing all inherit the problem.

[`🔗 arXiv: Twice-Told Critiques`](https://arxiv.org/abs/2611.26286) · [`🔗 Hugging Face papers`](https://huggingface.co/papers/2611.26286) · [`🔗 Fernández-Villaverde: Can Peer Review Survive AI-Generated Text? (PDF)`](https://www.sas.upenn.edu/~jesusfv/Peer_Review.pdf)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-21T12:25:51Z |
| Items | 37 |
| Sources tracked | 40 (Hacker News, GitHub Trending, CISA KEV, NVD, Red Hat security data, nginx.org, CERT-PL, PSF/discuss.python.org, Thinking Machines, vendor blogs, arXiv, gnupg-announce, backblaze.com, ruv.is, status.1984.is, bbc.com, france24.com, a90.com, restofworld.org, techdirt.com, documentcloud.org, ricapar.net, github.com, huggingface.co) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[Previous day](../2026-11-20.md) · [Raw .md](https://trending.md/en/feed/2026-11-21.md) · [Archive](../archive/)
