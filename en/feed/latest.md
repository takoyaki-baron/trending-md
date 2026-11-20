---
date: 2026-11-21
updated: 2026-11-20T20:26:54Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 17
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

Four entries landed in the Known Exploited Vulnerabilities catalog on November 20, each carrying a three-day federal remediation deadline of November 23. The headline is **CVE-2026-123890** — an authentication bypass in VMware vCenter's Directory Service (9.8, CNA-assigned by VMware; record `Undergoing Analysis` as of this run's read, lastModified 2026-11-20T20:16Z), with fixes in 9.1.1.0200, 9.0.2.0200, 8.0 U3m and 5.2.5, and Telco Cloud Platform builds also affected. Beside it: **CVE-2026-76466**, Cisco Expressway Series, where hard-coded credentials and unvalidated client certificates in the database service let an unauthenticated attacker "execute arbitrary operating system commands as root" (9.8, CNA-assigned by Cisco). The other two: **CVE-2026-129448** — Apache Roller's XML-RPC deserialization RCE (9.8), which we covered as a fresh advisory on Nov 17 and is now KEV'd — and **CVE-2025-42884**, SAP NetWeaver Enterprise Portal JNDI injection (6.5).

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

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-20T20:26:54Z |
| Items | 14 |
| Sources tracked | 17 (Hacker News, GitHub Trending, CISA KEV, NVD, Red Hat security data, vendor blogs, arXiv) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[Previous day](../2026-11-20.md) · [Raw .md](https://trending.md/en/feed/2026-11-21.md) · [Archive](../archive/)
