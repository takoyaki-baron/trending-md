---
date: 2026-11-07
updated: 2026-11-07T12:33:39Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 24
license: CC-BY-4.0
---

# Trending — 2026-11-07

## 1. Cloudflare's security-audit-skill spikes again — 2,088 stars in a day for a folder of audit instructions

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub Trending · +2,088★ today · 64,781 total
- **Tags:** `security` `agents` `skills` `vulnerability-discovery`

The MIT-licensed skill from Cloudflare turns a coding agent into a structured security auditor, and it is the #2 repo on GitHub Trending today with roughly 2,088 new stars. The workflow has six phases: reconnaissance (writes `architecture.md` and a `coverage-ledger.json` of input surfaces), coverage-led hunting by isolated hunter agents, adversarial validation, schema-checked `findings.json` output (`confirmed` / `needs_validation` / `rejected`), independent re-verification of final records, and reporting. Runs are additive — later runs read the prior ledger to target gaps and re-check changed code. The repo has no releases and only 14 commits on `main`; what is new this week is context, not code: on November 3 Cloudflare launched **Zero Wire** on Radar, a public vulnerability-intelligence hub, and the skill describes itself as the seed of the fleet-wide harness behind it.

**Why it matters:** the README's only quantitative claim is deliberately unimpressive — a single run finds roughly half of what repeated runs find — which is the honest version of the "agent finds CVEs" genre. The engineering that matters is structural: the finding agent is never the verifying agent, and the ledger is what turns N runs into one cumulative audit rather than N repeats. It is also explicitly not a scanner — it demands an OS sandbox with no network, and its output still needs human triage.

> "The agent that checks a finding is never the agent that found it."

[`🔗 cloudflare/security-audit-skill`](https://github.com/cloudflare/security-audit-skill) · [`🔗 Build your own vulnerability harness (Cloudflare)`](https://blog.cloudflare.com/build-your-own-vulnerability-harness) · [`🔗 Zero Wire (Cloudflare Radar)`](https://blog.cloudflare.com/zero-wire/)

---

## 2. Libghostty 1.0 — the terminal emulator core stabilizes its C ABI

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 710+ pts · ~13h ago (~07:30 UTC+8)
- **Tags:** `terminal` `c` `abi` `libraries`

Mitchell Hashimoto shipped version 1.0 of `libghostty-vt`, the terminal-emulation core extracted from Ghostty, announcing that both the library and its C ABI are now stable: semver with enforced ABI compatibility (libabigail on Linux, golden type manifests on macOS/WASM), versioned ELF symbols, signed source tarballs, pkg-config and CMake configs. It is MIT with no copyleft anywhere in the tree, runtime needs only libc, and feature flags compile out subsystems (search, selection, Kitty graphics) with flagged-out calls returning `GHOSTTY_UNSUPPORTED` instead of breaking. Platforms built in CI include Linux (glibc/musl), macOS 13+, iOS 13+, FreeBSD, Windows, Android and freestanding wasm32; the size-optimized WASM build is under a megabyte. The author reports running 10,000 active terminals on a 4-core 8 GB server, and says more people now use libghostty-powered terminals than the Ghostty app itself — adoption named in the post includes JetBrains IDEs, an approved Neovim PR replacing libvterm, and KDE experiments.

**Why it matters:** terminal embedding stopped being a curiosity the moment agents became terminal users, and until now every embedder grew its own half-complete VT parser. A permissively licensed, ABI-stable core with CI-enforced compatibility is the kind of unglamorous infrastructure that quietly changes what terminals, editors and agent harnesses can reuse. The scope honesty matters too: this is the VT core only — rendering and UI stay with the embedder, and some platforms ship built but untested.

[`🔗 Libghostty 1.0 (mitchellh.com)`](https://mitchellh.com/writing/libghostty-1-0) · [`🔗 ghostty-org/ghostty`](https://github.com/ghostty-org/ghostty) · [`🔗 Hacker News submission`](https://news.ycombinator.com/item?id=50399933)

---

## 3. BUI: Blender's widget layer as a standalone UI library — benchmarked at 3× GPUI's frame rate

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 697+ pts · ~29h ago (~15:40 UTC+8)
- **Tags:** `ui` `blender` `gpui` `graphics`

BUI extracts Blender's interface widget code (a C port of `interface_widgets.cc`) into a standalone toolkit with no browser engine and no Blender install, and drives it from every major language: complete tkinter syntax (all 7,846 public tkinter/ttk names, so existing apps run unchanged), a partial Qt layer, Rust via `rs!`/HTML/CSS with Tailwind v4, JavaScript via React 19.3 and Svelte 5 over napi, and real Dear ImGui 1.93 from C. On a Ryzen 7 5800U laptop, compiling the same gpui-syntax source against Blender's kit and Zed's gpui: first frame ~40 ms vs ~231 ms, 59.9 FPS vs 19.9 on 3,000 animated cells, 11.6 ms CPU per frame vs 50.5, and 30–40 MB memory vs 65–77. Releases are moving fast (0.4.1 on November 6); the project is GPL-3.0-or-later at ~1.8k stars.

**Why it matters:** the interesting claim is not "faster than GPUI" — the author's own caution is that the numbers come from one machine measured before recent features, with a rerun harness provided. It is that one C core now speaks tkinter, Qt-ish, HTML-ish and ImGui idioms at once, which attacks the actual problem with UI libraries: not drawing speed, but that every language community rebuilds the widget layer from scratch. The trade is visual: it looks like Blender everywhere, has no accessibility support yet, and macOS is experimental.

[`🔗 ppmpreetham/BUI`](https://github.com/ppmpreetham/BUI) · [`🔗 Hacker News submission`](https://news.ycombinator.com/item?id=50389333)

---

## 4. A Dutch bank's Wero rollout blocks de-Googled Android — and blames EU law for a choice EPI made

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 636+ pts · ~27h ago (~17:27 UTC+8)
- **Tags:** `grapheneos` `android` `payments` `attestation`

ASN Bank's Android app now refuses Wero payments on devices without Google services, showing a Dutch error that the phone or app installation does not meet its security requirements — ordinary in-app banking reportedly still works. The 2022-era issue in the community-maintained banking-app compatibility tracker (dormant since May) was reopened over this on November 6 and closed again the same day, with discussion continuing today. The stated root cause: Wero operator EPI told a user that Android hardware key attestation only proves a key lives in a TEE or StrongBox, not app or OS integrity, so Google Play Integrity is required instead — a claim commenters dispute by citing GrapheneOS's attestation documentation, which explains how standard hardware attestation does verify OS and verified-boot state, including for aftermarket OSes via published keys. ASN Bank's formal complaint response blames strict EU legal requirements for online payments and offers only that it is investigating support for alternative operating systems, with no commitment.

**Why it matters:** this is the grapheneos-vs-Play-Integrity fight arriving in payments, where the fallback is not a missing app feature but a broken payment rail. The technical dispute is verifiable — hardware attestation does bind OS state — which makes the EU-law justification the part to watch: if the requirement is EPI's design choice rather than a regulation, the fix is a policy change, not an impossible engineering one.

[`🔗 banking-apps-compat-report issue #105`](https://github.com/PrivSec-dev/banking-apps-compat-report/issues/105) · [`🔗 Hacker News submission`](https://news.ycombinator.com/item?id=50390124)

---

## 5. A cheap "decision model" that escalates to Opus inside a calibrated ambiguity band hits 98.8% at a quarter the cost

- **Velocity:** ▮ rising
- **Source:** Hacker News · 502+ pts · ~17h ago (~03:48 UTC+8)
- **Tags:** `llm` `cascades` `calibration` `cost`

Hightouch's engineering post describes grading identity-resolution output for over-merges — records for distinct people stitched into one identity — with a cascade: Jev, a decision model that returns a 0–1 confidence score that a condition is true, judges every case; anything landing in a 30–90% ambiguity band goes to Claude Opus 5.5 for a second opinion. Out of the box, decision models ran up to 90× cheaper and over 10× faster ($0.05–0.10 per 1,000 identities) at 88.8–97.3% accuracy but trailed Opus by ~6 points on hard cases; the hybrid reached 98.8% at $0.88 per 1,000 versus Opus alone at 99.0% and $3.86, and on the harder test set the hybrid (95.3%, $2.94) edged out Opus alone (95.1%, $5.39). The design hinge is calibration: Jev's errors cluster near 50% confidence, while GPT-6 Luna's sit at 90–100%, so the same escalation band catches Jev's mistakes and misses Luna's.

**Why it matters:** the reusable finding is that cascade thresholds only work where the cheap model knows what it doesn't know — the same band that buys 4× savings on Jev would degrade accuracy on Luna. The caveats are stated plainly: the benchmark is fully synthetic (simulated-town records), thresholds are tunable against a cost/accuracy trade, and adding context to prompts did not help the decision models, which do not appear to reason.

[`🔗 Hightouch engineering blog`](https://hightouch.com/blog/llm-judges-identity-resolution) · [`🔗 Hacker News submission`](https://news.ycombinator.com/item?id=50397429)

---

## 6. Gemini Omni 1.2 Flash goes GA — 15-second video with multi-turn editing, and no benchmarks

- **Velocity:** ▮ rising
- **Source:** Hacker News · 343+ pts · ~23h ago (~21:35 UTC+8)
- **Tags:** `video-generation` `google` `gemini` `release`

Google DeepMind's video generation and editing model, the successor to Omni 1.1, is generally available for the first time: native clips of 3–15 seconds selectable in 1-second steps (up from 10), multi-turn conversational editing that refines a clip without regenerating it, reference adherence from images, ≤3-second motion clips and audio cues, and a draft-at-720p/upscale-to-4K workflow. Pricing is $0.07 per second of 720p, 30% below Omni 1.1, and every output carries a SynthID watermark. It ships across the Gemini API and AI Studio, Vertex AI, Google Vids, Flow, the Gemini app (rolling out to AI Ultra subscribers) and Google Ads. The announcement carries no benchmark numbers — its evidence is qualitative demos — and states "development is ongoing" for fast sports action, rapid script changes and complex physics.

**Why it matters:** GA with per-second pricing turns this from a demo into a line item, and the honest parts of the announcement are the weaknesses it names rather than the demos it shows. The pattern to watch is the same one this feed keeps finding in model posts: a capability claim with no evaluation attached, now metered at $0.07/s.

[`🔗 Google blog announcement`](https://blog.google/innovation-and-ai/technology/developers-tools/introducing-gemini-omni-1-2-flash/) · [`🔗 Hacker News submission`](https://news.ycombinator.com/item?id=50392118)

---

## 7. METR: Anthropic has probably crossed its own 2× AI-acceleration threshold

- **Velocity:** ▮ rising
- **Source:** Hacker News · 322+ pts · ~16h ago (~04:27 UTC+8)
- **Tags:** `metr` `rsp` `ai-safety` `evaluation`

METR published an independent assessment (November 5, from an 11-week review inside Anthropic) finding that Anthropic's capability progress on well-specified tasks over October 2025–October 2026 ran roughly twice as fast as the prior twelve months — probably crossing the "dramatically accelerated progress" threshold in Anthropic's Responsible Scaling Policy, possibly approaching 3×. METR attributes about 80% of the acceleration to AI tools. Ajeya Cotra's commentary the next day walks the report's own hedges: the supporting evidence is largely redacted (the authors called it a majority of what they found most informative), the threshold definition is finicky, and outside readers must trust rather than verify the load-bearing numbers. Anthropic's own RSP language says it observes or expects a doubled rate of progress.

**Why it matters:** this is a policy tripwire firing, not a benchmark: crossing the threshold obligates the stronger safeguards Anthropic's RSP promises at the next tier. The report's honesty cuts both ways — a redacted 80%-AI-attribution claim is exactly the kind of number that should be auditable, and right now it only is from the inside.

[`🔗 METR assessment`](https://metr.org/blog/2026-11-05-anthropic-ai-rd-acceleration-assessment) · [`🔗 Ajeya Cotra: AI is dramatically accelerating AI research`](https://www.planned-obsolescence.org/p/ai-is-dramatically-accelerating-ai) · [`🔗 Hacker News submission`](https://news.ycombinator.com/item?id=50397994)

---

## 8. Anthropic maps the four components of agent memory — and the "dreaming" pass that maintains them

- **Velocity:** ▮ rising
- **Source:** Hacker News · 62+ pts · ~6h ago (~14:39 UTC+8)
- **Tags:** `agents` `memory` `anthropic` `research`

Anthropic's engineering post organizes agent memory as a four-layer hierarchy — raw transcripts, salient memory notes, linked memory representations like wikis, and small injected context — plus "dreaming": idle compute between sessions that replays transcripts, corrects notes, and promotes content upward. The evidence is measured, not rhetorical. In Pokémon Red, Sonnet 3.7 wrote indiscriminately (413 files, ~978K characters, 1 badge) while Fable 5 wrote selectively (10 files, ~43K characters, 4 badges), and Opus 5.5 beat the game on a compact memory folder. On a 350K-file corpus (~420M tokens, 25 questions), wiki-only performance rose from 13% to 48% as dreaming scaled from 2 to 128 sessions, and wiki+search went 54%→61% versus 53% for search alone. Guidance beat rules: an instruction to record only failures cost Opus 5 0.234 of reward, while restructuring one wiki-building instruction lifted graded facts from 41/57 to 57/57. The post names its own failure modes: one wiki grew larger than the corpus it summarized, injected errors propagate to every session, and in-session note-taking distracts from the task.

**Why it matters:** memory is where agent products are quietly differentiating, and this is the most concrete public decomposition of it so far — including the finding that letting the model choose what to remember beats telling it what to remember. The wikis-beat-search result is narrower than the headline: it held on cross-document synthesis and showed no clear gain on single-document lookup.

[`🔗 The components of agent memory (Anthropic)`](https://www.anthropic.com/research/components-of-agent-memory) · [`🔗 Hacker News submission`](https://news.ycombinator.com/item?id=50402212)

---

## 9. PwnEscape part 2 turns a weeks-old Firecracker memory primitive into host code execution — without the jailer

- **Velocity:** ▮ rising
- **Source:** Hacker News · 248+ pts · ~17h ago (~03:33 UTC+8)
- **Tags:** `firecracker` `vm-escape` `microvm` `security`

PWN Research's follow-up demonstrates stage two of its Firecracker escape on v1.16.1: given the guest-to-host memory read/write primitive from part 1, the walk is — place a nonce in a guest page, probe candidate EPT roots to find its host physical address, reverse-search host page tables to recover the VMM's PGD and defeat ASLR via byte-signature matches on Firecracker's own ELF, then find a live `pt_regs` frame from a blocked `ioctl(KVM_RUN)` and overwrite its saved registers. The return value is zeroed with a planted gadget so the ioctl still appears to succeed, and a one-byte serial write from the guest triggers `write(2, ...)` executing in Firecracker's context. The caveats are the story: the setup ran with no jailer, Firecracker was launched directly as root under `systemd-run`, and the guest-side helper needs root plus `/dev/mem`. HN commenters split on attribution — one calls it a kernel-networking-stack bug rather than a Firecracker one — but agree the jailer was not defeated and a second, powerful LPE would be needed for real-world host control. The writeup cites CVE-2026-99999, but the registry record under that ID is an unrelated Linux kernel ipv4 checksum bug, so the escape's CVE identity is unverified; no patch statement is given.

**Why it matters:** agent sandboxes are betting on microVM hardware isolation at exactly the moment a public chain shows VMM-context code execution past KVM — even if it stops at the jailer boundary. The operative question for anyone running agent fleets is the one the authors defer: what privileges and resources remain after compromising the VMM *when the jailer is actually on*.

[`🔗 PwnEscape Part 2 (pwn.ai)`](https://pwn.ai/blog/firecracker-escape) · [`🔗 Hacker News submission`](https://news.ycombinator.com/item?id=50397219)

---

## 10. Asahi Linux 7.3: M3 reaches GA, Thunderbolt lands upstream — and the project re-licenses to GPLv2

- **Velocity:** ▮ rising
- **Source:** Hacker News · 200+ pts · ~7h ago (~13:20 UTC+8)
- **Tags:** `asahi` `linux` `apple-silicon` `gpl`

The Apple Silicon Linux project's November report marks M3 support graduating from EXPERT to general availability (DCP enabled: sleep, performance and the area around the notch), two major drivers submitted upstream — macaudio (~3,100 lines) and the AVD display driver (~13,000 lines, their fastest major-component turnaround at 3 months) — and Thunderbolt patches landing upstream after roughly five years of work on Apple's bespoke controller (USB3, XDomain and Thunderbolt Networking; no PCIe or DisplayPort tunneling yet, so most docks still don't work). Elsewhere: m1n1 can now run three VMs in EL1 on M5, virtualizing macOS with Secure Kernel and Exclaves for reverse engineering; a rebased Google P3S patchset runs 4K-page x86 games outside the muvm VM — Wolfenstein: The New Order hit 144+ FPS on an M2 Max Mac Studio, against muvm's ~20% penalty; and the Rust audio beamformer roughly doubled in speed with hand-written SIMD. The headline that outlasts the release: all Asahi repositories are moving to GPLv2-or-later, citing exploitation of the permissive MIT licence, including AI-assisted rewrites of in-development code.

**Why it matters:** M3 going GA puts near-daily-usable Linux in front of the current MacBook installed base, but the relicensing is the story other projects will feel: a flagship reverse-engineering effort concluding that permissive licensing lets others ship AI-reconstructed versions of unreleased work is a data point in the growing backlash against MIT for hardware-adjacent code.

[`🔗 Asahi Linux progress report 7.3`](https://asahilinux.org/2026/11/progress-report-7-3/) · [`🔗 Hacker News submission`](https://news.ycombinator.com/item?id=50401867)

---

## 11. GitHub's new Git storage: consensus only on refs, everything else in blob storage — 7,200 pushes/second to one repo

- **Velocity:** ▮ rising
- **Source:** Hacker News · 157+ pts · ~18h ago (~02:13 UTC+8)
- **Tags:** `github` `infrastructure` `git` `scale`

GitHub's engineering post describes the rebuild under its Git data plane (codename Rubicon, named for what it calls the industry's point of no return with agentic development): disposable virtual replicas serve reads and writes with local disks as rebuildable caches; a new Ref-CAS service quorum-commits compare-and-swap transactions for reference updates and the pack manifest, locking only the refs a transaction touches; durable objects live in Azure Blob Storage; and a separate compaction fleet merges packs and garbage-collects away from serving. The insight is that Git objects are immutable and content-addressed, so only tiny ref updates need consensus. In internal testing, 5,000 concurrent agents pushed 7,200 pushes per second to a single repository with consistently low read latency; Ref-CAS handles reference transactions at tens of thousands per second; one example repo's traffic grew from 44M to 181M requests/day between March and May 2026. The design targets "at least two orders of magnitude more scale" per repository and is in limited private preview, with broader rollout planned early next year.

**Why it matters:** the driving workload is new — sustained parallel writes from many agents to one repo, which the legacy design (repo-wide consensus groups, coupled compaction) was never shaped for. The numbers make the trend measurable from infrastructure's side: if one repo can absorb 7,200 pushes/second, many-agent writes to a single repository have become a capacity-planning assumption, not a hypothetical.

[`🔗 Inside GitHub's new Git storage architecture`](https://github.blog/engineering/architecture-optimization/inside-githubs-new-git-storage-architecture/) · [`🔗 Hacker News submission`](https://news.ycombinator.com/item?id=50397099)

---

## 12. 15,579 confirmed-infected websites, ~135M monthly visits — and no scalable way to tell them

- **Velocity:** ▮ rising
- **Source:** Hacker News · 157+ pts · ~18h ago (~02:13 UTC+8)
- **Tags:** `web-security` `malware` `supply-chain` `skimming`

Scott Helme (Report URI) publishes the standing count of live websites his team has confirmed running malicious JavaScript at 100% confidence: 15,579, with a conservative 135 million combined monthly visits — mostly regional leaders on country TLDs (.fr, .es, .de) rather than global top sites. The infections span Magecart-style card skimmers, ClickFix fake-verification malware drops, iOS spyware (named DarkSword and Coruna), and malicious redirects; the compromise vectors include WordPress vulnerabilities, infected third-party supply-chain scripts, XSS, and a group his team named "DeadTag" that re-registers expired domains still referenced by sites' scripts. Sites leave the list only when cleaned. The notification problem is unsolved: manual outreach to high-impact sites mostly goes unanswered, GDPR made WHOIS contacts useless, CDN proxies hide real hosting, and Helme declines to publish the list — both name-and-shame harm and a targeting gift to attackers — while offering regional lists to European NCSCs and CERTs.

**Why it matters:** the post is a rare honest look at the gap between detection and remediation: the hard part was never finding infected sites, it is that there is no protocol for telling 15,579 owners, most of whom do not know they are affected. For the feed's purposes the supply-chain vector is the sharpest: scripts referenced from pages whose owners no longer control the domain they point at.

[`🔗 Scott Helme`](https://scotthelme.co.uk/we-know-15-579-websites-are-infected-how-do-we-tell-them/) · [`🔗 Hacker News submission`](https://news.ycombinator.com/item?id=50396064)

---

## 13. Every modern Mac ships an undocumented family-member classifier — and a 51-database graph of your life

- **Velocity:** ▮ rising
- **Source:** Hacker News · 122+ pts · ~3h ago (~17:46 UTC+8)
- **Tags:** `apple` `privacy` `on-device-ml` `knowledge-graph`

Security researchers examining the Apple Intelligence bundle in macOS 26 document two daemons (`knowledgeconstructiond`, `intelligenceplatformd`) that build an on-device personal knowledge graph from Contacts, Calendar, Photos, Messages, Mail, location, Family Sharing and Screen Time — stored as 51 plaintext SQLite databases under `~/Library/IntelligencePlatform`, gated only by Full Disk Access. The centerpiece `graph.db` is a triple store with 181 entity classes and 278 predicates. Among the shipped artifacts: two CoreML models (`EntityTagging_Family`, `EntityTagging_FamilyAndFriends`) that turn out to be XGBoost classifiers over 144 features — their `metadata.json` lists every feature in plain text, including time-conditioned ones like `photosPersonPosteriorProbabilityGivenSaturdayNight` — scoring 17 relationship columns per person, recomputed daily. The authors could trace shipped models to only 2 of those 17 columns; what fills the other 15, they write, they "could not trace." They released iKnow, an open-source dashboard for inspecting your own store, and their concern is specific: third parties in the graph never consented, and users get no documentation, no inspection path and no way to correct a wrong inference.

**Why it matters:** this is on-device ML doing exactly what privacy marketing promises — local, no cloud — while producing inferences about your relationships that nothing surfaces or lets you contest. The gap is not malice but absent API surface: the data the authors needed to audit the system was in the feature files themselves, which is also the fix path they demonstrate.

> Users get "no documentation, no way to inspect the store and no general way to correct an inference that is wrong."

[`🔗 Apple Intelligence personal knowledge graph (8rank.ai)`](https://8rank.ai/game/apple-intelligence-personal-knowledge-graph) · [`🔗 Hacker News submission`](https://news.ycombinator.com/item?id=50403097)

---

## 14. SonicWall SSLVPN SAML bypass lands in KEV a day after its record

- **Velocity:** ▮ steady
- **Source:** CISA KEV · added 2026-11-06
- **Tags:** `cve` `kev` `vpn` `sonicwall`

CVE-2026-19868 was added to CISA's Known Exploited Vulnerabilities catalog on November 6. The record — published the same day at 19:17 UTC, status `Undergoing Analysis` — describes an authentication enforcement vulnerability in SonicOS SSLVPN that may allow a user with valid credentials for an alternate authentication method to bypass SAML authentication controls. On the record, the only score is CISA-ADP's enrichment — CVSS 3.1 **7.5** (`AV:N/AC:H/PR:N/UI:N/S:C/C:H/I:L/A:N`, a Secondary metric from the CISA-ADP container) — and the vendor-side container beside it is empty. SonicWall's advisory page (SNWLID-2026-0014) renders as a JavaScript shell to plain fetches, so affected and fixed versions need a real browser to read.

**Why it matters:** SSLVPN endpoints are the classic KEV population — internet-facing, credential-adjacent, and now with a federal remediation clock attached. The score provenance matters for anyone triaging: 7.5 is the coordinator's number, not the vendor's, and the record's analysis status is still moving.

[`🔗 NVD: CVE-2026-19868`](https://nvd.nist.gov/vuln/detail/CVE-2026-19868) · [`🔗 SonicWall advisory SNWLID-2026-0014`](https://psirt.global.sonicwall.com/vuln-detail/SNWLID-2026-0014) · [`🔗 CISA KEV catalog`](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)

---

## 15. Apache Axis 1.x gets an unauthenticated RCE — fixed in July, disclosed in November, installable by no one

- **Velocity:** ▮ steady
- **Source:** oss-security · disclosed 2026-11-06
- **Tags:** `cve` `java` `soap` `deserialization`

CVE-2026-90436 (record published 2026-11-06, status `Received`, no CVSS from anyone yet) describes deserialization of an inbound SOAP fault in Apache Axis 1.x: a `<Fault>` whose `<detail>` carries an `<exceptionName>` element causes Axis to instantiate an attacker-named class — unauthenticated remote class instantiation. The record is filed with the `UNSUPPORTED WHEN ASSIGNED` banner, and the three clocks around it tell the story: the fix commit was merged on **2026-07-12** — 117 days before the record — while the repo, last pushed 2026-09-07, has had no release since 2011 (Axis 1.4), so there is no artifact to upgrade to. Disclosure went through oss-security on November 6.

**Why it matters:** two different "unsupported" stories hide in one record. The code got a fix in July; the record took until November; the artifact layer has been frozen for fifteen years — which means every deployment answer is migration, not upgrade, and the four-month record lag means the vulnerable pattern has been publicly fixable-but-undocumented all autumn.

[`🔗 oss-security disclosure`](https://www.openwall.com/lists/oss-security/2026/11/06/12) · [`🔗 NVD: CVE-2026-90436`](https://nvd.nist.gov/vuln/detail/CVE-2026-90436) · [`🔗 fix commit`](https://github.com/apache/axis-axis1-java/commit/41f3b4e8d04e310ca81f86b92630ab2c11d608bd)

---

## 16. Memorilla compresses a document collection into 16 memory tokens — and beats full context on FactKG

- **Velocity:** ▮ steady
- **Source:** Hacker News · 107+ pts · ~18h ago (~02:03 UTC+8)
- **Tags:** `arxiv` `memory` `long-context` `retrieval`

A Stanford system (Leskovec group, arXiv:2610.21375, v3 November 3) encodes a document collection once into reusable embeddings, then compresses query-relevant information into a fixed set of **16 memory tokens** injected directly into a frozen LLM's embedding space. On five of eight benchmarks it beats memory baselines including Mem0 and MemoRAG; on FactKG it reaches 84.33% versus 80.43% for full-context inference while using 108× fewer tokens to represent the sources; in a TextWorld agent experiment, average success rose from 18.6% (full-history in-context learning) to 24.2%, with fewer revisits of already-explored rooms.

**Why it matters:** the interesting number is not the win — it is winning *against full context* at 108× compression, which breaks the usual assumption that memory systems trade fidelity for tokens. The catch is the usual one for latent-compression work: 16 tokens is a hard ceiling, and the benchmarks that favor it (knowledge-intensive QA over a fixed corpus) are the ones where a summary-shaped loss is cheapest. Single-document lookup, the case where retrieval already wins, is exactly what it does not claim.

[`🔗 arXiv:2610.21375`](https://arxiv.org/abs/2610.21375) · [`🔗 project site (Stanford)`](https://memory.stanford.edu)

---

## 17. Meta open-sources Astryx — the design system that grew inside the company for eight years

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · +198★ today · 14,123 total
- **Tags:** `design-systems` `react` `stylex` `meta`

Astryx is Meta's internal design system — used by 13,000+ apps over eight years — now public in beta under MIT: 150+ accessible components on React 19+ and StyleX, theming through CSS custom properties, styles that can be overridden with Tailwind, CSS modules or plain CSS, a `swizzle` command that ejects component source into your project, and a CLI. The "agent ready" framing is concrete rather than decorative: the API, docs and CLI are designed as one reference so a human and an agent build the same thing from the same page, and the README recommends installing the CLI globally so every coding agent can find it, with a `package.json` alias suggested because agents invoke CLIs directly. Releases are moving — v0.7.10 shipped November 6, the third in two days.

**Why it matters:** design systems are the quiet bottleneck of AI-built UI — models produce plausible screens that no team can theme or maintain — and Meta shipping the system that survived 13,000 internal apps is a stronger signal than another component library. The testable claim is the docs-as-agent-reference design; the open question is whether the beta's npm packages stay in sync with the repo, which the two-day release cadence suggests they know.

[`🔗 meta/astryx`](https://github.com/meta/astryx) · [`🔗 releases`](https://github.com/meta/astryx/releases)

---

## 18. billion-context: a compression proxy that claims month-long coding-agent sessions

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · +185★ today · 4,397 total
- **Tags:** `context-compression` `agents` `proxy` `long-context`

A trending plugin/proxy that sits between any coding agent and its model API, parsing Anthropic and OpenAI wire formats and folding consumed conversation into layered, reversible summaries — the pitch is a single session running for days through one context window. Compression is model-driven: the proxy injects tools (`compress`, `decompress`, `search_context`) and the model calls them as context grows, with gentle nudges around 50K tokens and a preflight backstop. The README claims 95–97% prefix-cache hit rates and ≤2% compression cost, and cites a companion paper covering 174,327 model calls and ~18.76B cumulative input tokens, plus third-party benchmarks: #1 on ContextBench (0.3097 Utilized F1, −58.3% cost versus full context), +16.6% over the best RAG arm on LongMemEval-S, and 100% survival on a 1.48M-token MemoryAgentBench test where full context failed all trials. It targets Claude Code, Codex, Gemini CLI and a long list of others; MIT plus one extra term requiring visible attribution. The repo self-describes as "Early," with real-model integration testing still upcoming.

**Why it matters:** the design bet is the opposite of this week's Anthropic memory post — where Anthropic has the model curate what to keep across sessions, billion-context compresses within one. The load-bearing numbers are the cache-hit and cost claims, and the honest flag is that the integration testing that would validate them on live models is listed as not yet done.

[`🔗 ranxianglei/billion-context`](https://github.com/ranxianglei/billion-context) · [`🔗 releases`](https://github.com/ranxianglei/billion-context/releases)

---

## 19. Waymark compiles workflow jobs to bytecode instead of replaying them

- **Velocity:** ▮ steady
- **Source:** Show HN · 77+ pts · ~46h ago (~22:06 UTC+8)
- **Tags:** `workflows` `durable-execution` `postgres` `rust`

Waymark is a durable-execution library built entirely on Postgres — no broker to deploy — whose differentiator is compile-once instead of replay-once: where Temporal re-executes workflow code and requires determinism, Waymark parses the `run()` method's AST into an intermediate representation on first execution, lowers it to bytecode for a durable virtual machine implemented in Rust, and snapshots VM state to Postgres, so recovery resumes mid-execution. Nondeterministic patterns are caught at compile time. MIT-licensed at ~109 stars with no releases yet, and the README is blunt: pre-1.0, the spec is changing quickly, and it is not recommended for production, latency-sensitive jobs, or more than ~10k concurrent coordinated actions.

**Why it matters:** replay-vs-compile is the central design argument in durable execution, and a working compile-to-bytecode implementation with Postgres as the only dependency is a real datapoint against the Temporal model — determinism enforced by a compiler is a different failure surface than determinism enforced by SDK discipline. The honest pre-1.0 warning is what makes it worth watching rather than adopting.

[`🔗 piercefreeman/waymark`](https://github.com/piercefreeman/waymark) · [`🔗 docs`](https://waymark.sh) · [`🔗 Hacker News submission`](https://news.ycombinator.com/item?id=50379221)

---

## 20. Zalando open-sources its OAuth delegation broker for AI agents

- **Velocity:** ▮ steady
- **Source:** Show HN · 22+ pts · ~21h ago (~23:07 UTC+8)
- **Tags:** `oauth` `agents` `mcp` `identity`

Zalando's incubator project is an identity broker for AI agents: scoped, revocable delegation via OAuth2 on-behalf-of flows, a token vault, and a consent UI for granting agents granular access across Google, GitHub, Databricks and Linear. It deploys in the call path through gateways such as Agentgateway, handling token exchange transparently so MCP server developers expose tools while authentication and consent are centralized — including central tool-approval prompts with audit trails, value redaction, and a fail-closed design. MIT-licensed, with OpenSSF Scorecard badges, at ~59 stars; the team says it runs in production internally for several MCP servers and they are coding in the open to validate the approach.

**Why it matters:** agent identity is the gap every MCP deployment eventually hits — agents end up holding user credentials because nothing else exists between "no access" and "the user's token." A broker with consent UI and revocation from a company that runs it in production is a concrete pattern to copy, and its smallness is the point: this is plumbing, and plumbing propagates.

[`🔗 zalando-incubator/agentic-identity-broker`](https://github.com/zalando-incubator/agentic-identity-broker) · [`🔗 docs`](https://agenticidentitybroker.dev) · [`🔗 Hacker News submission`](https://news.ycombinator.com/item?id=50393235)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-07T12:33:39Z |
| Items | 20 |
| Sources tracked | 24 (Hacker News, GitHub Trending, NVD, CISA KEV, oss-security/Openwall, SonicWall PSIRT, Cloudflare Blog, Google Blog, Anthropic Research, METR, GitHub Engineering, Asahi Linux, mitchellh.com, Hightouch, pwn.ai (PWN Research), Scott Helme/Report URI, 8rank.ai, arXiv, Stanford, Meta, Zalando, vendor advisory pages, project release notes, developer blogs) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[Previous day](../2026-11-06/) · [Raw .md](https://trending.md/en/feed/2026-11-07.md) · [Archive](../../archive/)
