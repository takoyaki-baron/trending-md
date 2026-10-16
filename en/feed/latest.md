---
date: 2026-10-17
updated: 2026-10-16T21:35:00Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 22
license: CC-BY-4.0
---

# Trending — 2026-10-17

## 1. Tesla finally revealed the Roadster — and the stunt that broke HN was the car jumping over a semi

- **Velocity:** ▮▮▮ trending
- **Source:** Tesla + Hacker News · 763+ pts · ~18.8h ago (~09:32 UTC+8)
- **Tags:** `tesla` `ev` `hardware` `launch`

The second-gen Roadster got its reveal event (Oct 15, ~9 years after the original announcement), and HN's 763-point, 1,300+-comment thread is reacting to the livestream demo: the car **jumped over a semi truck**. Per press coverage of the event: 0–60 mph in ~1.9s (sub-1.6s claimed for a Performance trim), 250+ mph top speed, 620-mile range from a ~200-kWh pack, $200–250k expected, **production 2028**. The thread splits cleanly between "most phenomenal tech demo I've ever watched" and "it's not a flying car, it's a jumping car" — plus one dev-relevant detail: scammers topped Google search results for the announcement with an AI-generated Elon Musk crypto-doubling video within hours.

**Why it matters:** the specs are press-coverage figures, not independently verified, and delivery is two years out — so treat this as a demo, not a shipping product. The durable datapoints are the jump stunt's engineering (cold-gas thrusters per Tesla's earlier claims, still unproven at scale) and how fast AI-slop SEO colonized the announcement — the scam video outranked Tesla's own page for the event's biggest search moment.

[`🔗 Tesla: Roadster`](https://www.tesla.com/roadster) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50112657)

---

## 2. Postgres 19 delayed because LLM-assisted review found more bugs than humans could close — ~40 defect reports, 8–10 features reverted

- **Velocity:** ▮▮▮ trending
- **Source:** The Register + peter.eisentraut.org + Hacker News · 149+ pts · ~4.4h ago (~23:55 UTC+8)
- **Tags:** `postgresql` `database` `ai-review` `oss-maintenance`

PostgreSQL 19 slipped from late September/early October to **around November 19**, after LLM-assisted code review — run by Postgres developers themselves as part of the normal process, not one centralized AI reviewer — surfaced **~40 defect reports** the community couldn't clear in time. Committer Peter Eisentraut (EDB) says 8–10 significant features were reverted to v20, in two buckets: some had "significant architectural defects," and the AI found a long tail of edge cases that "previously would have surfaced as post-release patches over roughly five years." He explicitly denies vibe-coding caused it — the features predate the mid-cycle jump in review-tool quality. The caveats are on the record: the architectural problems existed before the AI reviews (Tom Lane had warned about the SQL/PGQ graph feature pre-release), and the revert count is approximate.

**Why it matters:** this is the first major OSS project to delay a release *because its review tooling outgrew its own features mid-cycle* — the effective quality bar moved while the code was in beta, and forty fixes' worth of fixed overhead didn't fit before freeze. Eisentraut expects it to self-correct next cycle; that holds only if review capability stops improving at the current pace, which is exactly the assumption this feed wouldn't make.

[`🔗 The Register`](https://www.theregister.com/databases/2026/10/16/postgres-19-delayed-after-ai-reviewers-find-more-bugs-than-humans-can-fix/5303471) · [`🔗 Eisentraut: The reverts will continue until morale improves`](http://peter.eisentraut.org/blog/2026/10/09/the-reverts-will-continue-until-morale-improves) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50119991)

---

## 3. Big Fish: a 37-year-old OpenBSD kernel bug, hunted to root — with SMAP, SMEP and KARL all enabled

- **Velocity:** ▮▮▮ trending
- **Source:** calif.io + Hacker News · 139+ pts · ~5.6h ago (~22:44 UTC+8)
- **Tags:** `openbsd` `kernel` `exploitation` `privilege-escalation`

 calif.io's "Big Fish" write-up (Oct 16) details a **signed 16-bit overflow in the SysV shared-memory attach counter** (`shm_nattch`), traced back to the original BSD sources — roughly 37 years. Overflowing it leads to a **use-after-free via a race**, yielding a write-what-where that lands userland memory in supervisor space: local privilege escalation to root **without any information-disclosure bug**, demonstrated against OpenBSD with KARL, SMAP and SMEP enabled. The recipe needs 127 mapped shm segments, ~259 forked processes, a won race, and heap grooming via `sysctl(KERN_MALLOCSTATS)` — reliable because early kernel allocations land at predictable addresses across boots. Fixed in **OpenBSD 7.9 errata 026/018**; the page states no CVE for it. Local-only, and the proposed mitigations (allocator randomization, safe-unlinking, bounds sanitizers) are suggestions, not shipped fixes.

**Why it matters:** OpenBSD is the codebase whose entire threat model assumes a motivated local attacker, and this chain defeats its strongest runtime defenses using a counter that's been `short` since the 1980s. The "no infoleak needed" part is the rare bit — deterministic allocation did the leaking. If you run multi-user OpenBSD boxes, the errata is the action item; the paper's mitigation menu is the research agenda.

[`🔗 calif.io: Big Fish`](https://calif.io/research/big-fish) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50118977)

---

## 4. Claude closes a 30-year crypto-history question: the NIST curve seeds came from `lrand48()` and a 1997 timestamp — the Solinas passphrase story was wrong

- **Velocity:** ▮▮ rising
- **Source:** Anthropic Research + Hacker News · 244+ pts · ~1.4h ago (~02:55 UTC+8)
- **Tags:** `cryptography` `ecdsa` `nist` `ai-research`

Anthropic's disclosure (Oct 16) explains the never-published "seeds" behind the NIST elliptic curves — the values long rumored to hide a backdoor, and long attributed to NSA's Jerry Solinas hashing phrases like "Give Bob and Jerry a raise." That story is **wrong**: all five prime-curve seeds (P-192 through P-521) are the *n*-th 20-byte candidate of `lrand48()` seeded via `srand48()` with a **Unix timestamp** — P-256 is candidate 1842 from **Aug 16, 1997**. Four binary seeds trace to April 17, 1998 timestamps halved before seeding; six base points came from Lenstra's FreeLIP RNG with small integer seeds. An internal research model, given the open question cold, solved it in **under half an hour**: it noticed four seeds had all-zero top bits (a ~1/5810 coincidence — the signature of `lrand48`'s truncated 31-bit output), brute-forced 2¹⁷ state bits, and ran LLL lattice reduction backwards to the timestamps. Public-domain Python regenerates all 14 published seeds exactly; the $36,864 bounty goes to ISRG. Anthropic is explicit about the limits: **not a cryptographic break** — reproducibility *increases* confidence the curves aren't backdoored — some skipped candidate curves have unknown selection criteria, and the B-163 seed plus several base points remain unexplained.

**Why it matters:** a 30-year-old open question in trust-critical infrastructure, closed with findings that are mechanically verifiable by anyone — the model found the statistical signal; the published code is the proof. It's also the rare "AI did X" story where the artifact is a reproducible script rather than a claim, and the remaining unexplained seeds are stated plainly instead of buried.

[`🔗 Anthropic: ECDSA curve origins`](https://www.anthropic.com/research/ecdsa-curve-origins) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50122800)

---

## 5. 90% of US working hours sit where AI benchmarks don't look — Mercor maps 29 benchmarks against the O*NET economy

- **Velocity:** ▮▮ rising
- **Source:** Mercor Research + Hacker News · 251+ pts · ~3.2h ago (~01:08 UTC+8)
- **Tags:** `benchmarks` `labor-economics` `evals` `ai-impact`

Mercor's benchmark map (HN: 251 pts) cross-references 29 public AI benchmarks against the Department of Labor's O*NET taxonomy — 923 occupations, 18,797 tasks — and finds **~90% of American working hours are spent on tasks with little or no benchmark coverage**. Only **208 of 923 occupations** have even one task covered by 5+ benchmark prompts; 924 of 18,797 tasks are covered at all. The skew is systematic: AI-exposed tasks are ~6× more likely to be benchmarked than unexposed ones, the most-important tasks within occupations are 6–10× more covered than the least important, and coverage tracks wage bill — lawyers are well measured, legal secretaries and court clerks are not. The limitations section does real work: the 29-benchmark list is incomplete (biasing coverage estimates downward in unbounded ways), "economic realism" is subjective, and ~63% of US jobs involve physical work benchmarks can't touch.

**Why it matters:** every "agents can already do X% of the economy" claim inherits this blind spot — the measured slice is chosen by what's easy to test, which correlates with wage bill and vendor interest, not economic weight. Read it as a calibration tool with declared biases (Mercor sells eval data), not ground truth; the 6–10× importance skew is the number to quote.

[`🔗 Mercor: benchmark map`](https://www.mercor.com/research/labor-index/benchmark-map/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50121179)

---

## 6. Apple ships MLX distributed inference over Thunderbolt 5 — and runs Meta's 816B Muse Spark Open at 36.7 tok/s on four Mac Studios

- **Velocity:** ▮▮ rising
- **Source:** Apple ML Research + Hacker News · 213+ pts · ~6.6h ago (~21:43 UTC+8)
- **Tags:** `mlx` `apple-silicon` `distributed-inference` `thunderbolt`

Since we covered Meta's Muse Spark Open release yesterday: Apple's ML research post (Oct 16) shows the concrete desktop path. New **MLX v0.30.1+** adds a **RDMA-over-Thunderbolt-5** driver (macOS 26.2) with the `jaccl` backend, plus pipeline and tensor parallelism via `mlx.launch`. On **four M5 Ultra Mac Studios** (512 GB unified memory, 1.2 TB/s each), Muse Spark Open 816B-A42B quantized to **NVFP4** decodes at **36.73 tok/s** — above reading speed; the model needs >1.6 TB in BF16 and ~493 GB even at 4-bit, so it *cannot* run on one machine. M5 Ultra vs M3 Ultra: up to 4.6× faster time-to-first-token. The caveats are unusually complete: MoE models scale *worse* across machines than dense ones, tensor parallelism hurts Muse Spark prefill at 64k context (per-expert output normalization), pipeline parallelism leaves decode unchanged, and decode was measured over only 128 tokens.

**Why it matters:** the frontier-open-weights-at-home story now has a consumer interconnect — no InfiniBand, a Thunderbolt cable — and Apple just made its own silicon the reference hardware for it. The honest part matters too: the headline number is 4-bit, MoE doesn't cluster well, and Apple published both anyway.

[`🔗 Apple ML: MLX distributed inference`](https://machinelearning.apple.com/research/mlx-distributed-inference) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50118320)

---

## 7. NVIDIA's Nemotron 3.5 Super VL: a 120B-A12B open multimodal MoE — and a benchmark-claim gap worth naming

- **Velocity:** ▮▮ rising
- **Source:** NVIDIA Developer Blog + Hugging Face · released Oct 15
- **Tags:** `open-weights` `nvidia` `moe` `multimodal` `agents`

NVIDIA released **Nemotron 3.5 Super VL** (120B total / 12B active, hybrid Mamba-Transformer MoE distilled from Nemotron 3 Ultra) and **Nemotron 3.5 Bolt 74B-A9B** — verified on Hugging Face in NVFP4, BF16 and Base-BF16, with Bolt's 24GB checkpoint plus GGUF already at ~26.8k downloads, and a 4B-class Bolt E4B due Oct 23. The release ships the full stack: weights, recipes, datasets (~2.8T Indic-language tokens with AI4Bharat) and RL environments. Vendor numbers: Hermes Bench 63.44% (vs Ultra's 56.33%), CharXiv 80.8% (84% with code interpretation), "up to 5× higher throughput for agentic tasks." **What the vendor post does not contain: any head-to-head table against Claude or GPT models** — comparisons are against sibling Nemotron and same-size *open* models, "Claude" appears only as one of seven eval harnesses, the charts are images without extractable data, and the throughput figures are "up to" vendor expectations. Secondary coverage claiming it "beats Claude Opus 5 and GPT-6.1 Sol" is attributing a claim the primary doesn't make.

**Why it matters:** the weights+data+RL-environments bundle is the most complete openness offer from a US lab this month, and the 24GB Bolt puts a 74B multimodal model on one consumer GPU. But this feed's repeated lesson applies: the frontier-beating framing lives in coverage, not in the source — cite Hermes and CharXiv, not the headline.

[`🔗 NVIDIA: Nemotron 3.5 Super VL`](https://developer.nvidia.com/blog/nvidia-nemotron-3-5-super-vl-powers-specialized-agents-with-multimodal-reasoning) · [`🔗 Hugging Face: NVFP4 checkpoint`](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Super-VL-120B-A12B-NVFP4)

---

## 8. Nine flagship models get one hour to write a Brood War bot — GPT-6 Astra wins StarSkirmish v0.2, and beats the top human bots 7% of the time

- **Velocity:** ▮▮ rising
- **Source:** StarSkirmish + Hacker News · 150+ pts · ~6h ago (~22:18 UTC+8)
- **Tags:** `benchmark` `code-agents` `gamedev` `starcraft`

StarSkirmish Bench v0.2 (Show HN, 150 pts) doesn't have models *playing* StarCraft — it has them **write a competitive Protoss bot in C++** (BWAPI 4.4.0 on OpenBW) in one wall-clock hour, starting from a mining-only skeleton plus three demo bots and two libraries. v0.2's upgrade: each model runs in its own lab's first-party CLI harness (Claude Code, Codex, Antigravity, Muse Code) at max reasoning effort. **GPT-6 Astra wins**; GPT-6.1 Sol is second at roughly a tenth of Astra's per-run cost; Gemini 4 Argon, Claude Opus 5.5 and Claude Fable 5.1 tie at 37–39. The strongest predictor of score is practicing early against the seven strongest roster bots (whose S-tier is human pros Stardust and PurpleWave). The caveats are the content: Astra's bots beat the top human bots **only 7%** of the time; only three 2-player maps; run variance up to 18 points (Argon); and correlation with heavily-benchmarked evals is collapsing (ρ 0.26 vs the AA Intelligence Index) while long-horizon coding tests still track each other.

**Why it matters:** a harness-neutral long-horizon coding eval where the *strategy of practicing against strong opponents* is the winning variable — that's an agent-behavior finding, not just a leaderboard. And its self-diagnosis (popular evals may now be tuning targets) is the benchmark world confessing Goodhart in real time.

[`🔗 StarSkirmish Bench v0.2`](https://starskirmish.com/bench/v0-2/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50118688)

---

## 9. Two fresh KEV additions: BeyondTrust Remote Support auth bypass (NVD-scored 9.8) and a 6.5-scoring Fortinet path traversal now under active exploit

- **Velocity:** ▮▮ rising
- **Source:** CISA KEV + NVD · added 2026-10-16
- **Tags:** `cve` `kev` `beyondtrust` `fortinet` `pam`

CISA's KEV catalog added two entries on Oct 16. **CVE-2026-102764** — BeyondTrust Remote Support, authentication bypass by spoofing (CWE-290) enabling remote file operations; published Oct 15, KEV'd the next day, federal remediation due **Oct 19**. *Corrected in place (Oct 17 act):* this morning's version recorded patch status as **unconfirmed** because BeyondTrust's trust-center listing showed no advisory — the advisory exists, and predates the KEV add. **BT26-05** (published Oct 15, the disclosure day) states a patch shipped **Oct 8** to all supported Remote Support *and* Privileged Remote Access builds (SaaS auto-patched), with technical details withheld while self-hosted appliances patch, and joint attribution work with Mandiant to a China-nexus actor (UNC5221 / "ARMORY CASTLE"). The provenance reading stands: NVD **Analyzed** with an `nvd@nist.gov`-sourced CVSS 3.1 of **9.8** alongside a CNA-assigned **9.3** — and BT26-05 was already sitting in NVD's references field when "no advisory" was written; the trust-center *listing* was the stale layer. **CVE-2025-61624** — Fortinet's FortiOS, FortiPAM, FortiProxy and FortiSwitchManager, an authenticated path traversal (CWE-22) published in **April 2026** at NVD 6.5 / Fortinet CNA 6.0, now KEV'd — a reminder that the actively-exploited set and the high-score set overlap only loosely.

**Why it matters:** BeyondTrust is privileged-access-management — the product whose whole job is guarding crown-jewel credentials — so an unauthenticated-adjacent bypass there is structural, not routine. The correction is the lesson: "the vendor lists no advisory" was checked against a listing page while the advisory sat one field away on the NVD record — absence claims need the record's own references, not a vendor index. And the Fortinet entry remains this week's cleanest score-vs-exploitation inversion: nobody patches a 6.5 as a priority, which is exactly how it stays exploitable ten months later.

[`🔗 NVD: CVE-2026-102764`](https://nvd.nist.gov/vuln/detail/CVE-2026-102764) · [`🔗 BeyondTrust advisory BT26-05`](https://www.beyondtrust.com/blog/entry/bt26-05) · [`🔗 CISA KEV catalog`](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)

---

## 10. diagram-design: 56k★ in a week for the anti-Mermaid — agent-drawn diagrams as one self-contained HTML+SVG file

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · 56,365★ · +10.2k this week
- **Tags:** `agent-skills` `diagrams` `svg` `visualization`

cathrynlavery/diagram-design tops this week's trending with 56.4k★ (+10.2k in seven days, pushed Oct 16, MIT): an agent skill that turns a plain-language prompt ("sequence of a bearer call with token refresh on 401") into **one self-contained HTML+SVG file** — 45 diagram types, "no shadows, no Mermaid slop," hand-checked against an editorial design brief. Verified from the repo: an onboarding command pulls your site's palette and fonts so diagrams match your brand; imports from drawio/Mermaid/Excalidraw; PNG/SVG export; CI on every diagram-type change; installs via `npx skills add` and distributed through the plugin marketplaces of Claude Code, Codex, Copilot, Gemini CLI, Cursor, Cline, Windsurf and Amp. The repo dates to April 2026 — the current spike is the skills-shelf wave arriving, and honest caveat: this feed could not pin a single trigger event for this week's acceleration beyond Trendshift and marketplace distribution.

**Why it matters:** the agent-skills shelf keeps minting vertical winners that pick one artifact format and do it carefully — and "diagram as a diffable, dependency-free text file an agent can regenerate" is exactly the right format for the machine-authoring era. The anti-Mermaid positioning is itself the thesis: agent output needs an editorial quality bar, not a default renderer.

[`🔗 cathrynlavery/diagram-design`](https://github.com/cathrynlavery/diagram-design) · [`🔗 skills.sh listing`](https://skills.sh/cathrynlavery/diagram-design/diagram-design)

---

## 11. "I Love Software Rendering": Quake at 800×600, locked 60fps, every pixel drawn by the CPU — on purpose

- **Velocity:** ▮▮ rising
- **Source:** jamesfmackenzie.com + Hacker News · 256+ pts · ~7.5h ago (~20:52 UTC+8)
- **Tags:** `retro-gaming` `rendering` `demoscene` `graphics`

James Mackenzie's essay (HN: 256 pts) makes the case for running original DOS games with their built-in software renderers on real DOS hardware — not DOSBox, not source ports. The numbers are the hook: **Quake at 800×600 holds a locked 60fps on a Dell OptiPlex 380**, a resolution 1996 hardware couldn't touch (and per a Rasteri video, even a 3.3 GHz quad-core Xeon still can't push Shadow Warrior to 1600×1200). The aesthetic argument: per-pixel texture sampling keeps texels crisp where 3dfx-era bilinear filtering blurred them, and the 256-color palette's lookup-table lighting produces banding that reads as grit rather than artifact. Design intent is part of it — Quake, Doom and the Build engines were software-first, with GLQuake and 3dfx modes bolted on later — and the author concedes the limits (Tomb Raider's underwater sections genuinely look better accelerated).

**Why it matters:** the second aesthetics-backlash piece this feed has run in two days (after DEsk's skeuomorphic desktop topping HN on Oct 16) — both arrive at the same conclusion from different media: the "limitations" of earlier computing were a design language, and infinite fidelity flattens it. Also a quiet hardware datapoint: a 12-year-old office desktop is now a 1996 supercomputer.

[`🔗 I Love Software Rendering`](https://www.jamesfmackenzie.com/2026/10/13/i-love-software-rendering/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50117746)

---

## 12. JPEG XL vs AVIF, measured properly: AVIF wins photos, screenshots and transparency — but jixel changes the JPEG XL story, and lossless is JXL's

- **Velocity:** ▮▮ rising
- **Source:** jakearchibald.com + Hacker News · 129+ pts · ~4.1h ago (~00:12 UTC+8)
- **Tags:** `jpeg-xl` `avif` `web-performance` `image-formats`

Jake Archibald's comparison (HN: 129 pts) benchmarks current encoders at matched SSIMULACRA2 quality — avifenc 1.4.2, libjxl 0.12.0, and **jixel 0.4.2**, a newer second JPEG XL encoder. Headlines: for lossy photos, best-JPEG-XL runs **15–25% larger than AVIF** at default effort (6–20% at max); for screenshots and UI, 30–90% larger; for transparency, up to 70% larger. AVIF also decodes ~2–3× faster at medium quality. But the encoder landscape moved: jixel usually beats libjxl on size, libjxl's max effort takes ~18× longer for near-zero gain, and JPEG XL keeps three real wins — **lossless** (9–17% smaller than WebP, 30–120% smaller than AVIF), lossless JPEG→JXL transcode (9–20% savings), and progressive rendering that's nearly free at high effort. His default: **AVIF 4:4:4 at the highest effort you can tolerate**, reaching for jixel only when AVIF output looks unusually large.

**Why it matters:** with JPEG XL now shipping in all major browsers, the practical question flipped from "will it be supported" to "when should I use it" — and the answer is narrower than the 2022-era hype but non-empty (archives, lossless pipelines, legacy-JPEG shrinkage). The meta-lesson is the one worth stealing: a second independent encoder moved a format's numbers more than years of advocacy did.

[`🔗 JPEG XL vs. AVIF for web use-cases`](https://jakearchibald.com/2026/jpeg-xl-vs-avif/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50120224)

---

## 13. Waymo comes to Canada: Toronto vehicles hit the street this week — manually — with rider service targeted for 2028

- **Velocity:** ▮▮ rising
- **Source:** Waymo Blog + Hacker News · 142+ pts · ~5.6h ago (~22:44 UTC+8)
- **Tags:** `autonomous-vehicles` `waymo` `canada` `robotaxi`

Waymo's Toronto announcement (HN: 142 pts, 256 comments) is its first Canadian market: vehicles begin appearing on Toronto streets "in the coming days," but **driving manually** — the staged sequence is HD mapping, then safety-driver testing, then validation, with a stated *goal* (not date) of first riders in **2028**. Element Fleet Management (Toronto-HQ'd) handles fleet operations; "hundreds of roles" promised. The safety framing cites 400M+ fully autonomous miles and 95% fewer serious-injury-or-worse crashes vs humans. What the post does not contain: fleet size, pricing, service area, or neighborhoods — and the 2028 target is explicitly a goal.

**Why it matters:** Toronto in November is the winter-weather stress test Waymo hasn't publicly faced in North America — snow-covered lane markings and bike lanes are the standard objection in every autonomy thread. The two-year runway also makes this a regulatory bellwether: whatever Ontario requires for the driver-out phase becomes the template for Canadian expansion.

[`🔗 Waymo in Toronto`](https://waymo.com/blog/2026/10/waymo-in-toronto/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50118981)

---

## 14. "A rental disguised as a sale": Rep. Torres introduces the Power to the Players Act — real ownership, and a mandatory offline mode

- **Velocity:** ▮ steady
- **Source:** ritchietorres.house.gov + Hacker News · 161+ pts · ~4.3h ago (~00:03 UTC+8)
- **Tags:** `game-preservation` `policy` `ftc` `consumer-rights`

Rep. Ritchie Torres (NY-15) announced legislation (Oct 15) directing the **FTC** to regulate game purchases: buying a game would confer actual ownership rather than a revocable license, and games with online functionality must ship an **offline mode before their servers shut down**. The trigger example is concrete: NBA 2K25, sold at $69.99–99.99, gets pulled from digital storefronts Oct 30 and loses its servers Dec 31 — two years after launch. Torres: "A game that can be taken away the moment a company pulls the plug is not a purchase. It is a rental disguised as a sale."

**Why it matters:** the Stop Killing Games movement has now reached US bill text, with an enforcement path (FTC rulemaking) that's slow but real. For the dev community the second clause is the load-bearing one — an offline-mode mandate is a preservation requirement with architectural cost, and the industry's response to this bill will decide whether "sunset planning" becomes a release checklist item the way privacy policies did.

[`🔗 Power to the Players Act announcement`](https://ritchietorres.house.gov/posts/rep-torres-announces-power-to-the-players-act-legislation-to-ensure-gamers-own-their-games) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50120101)

---

## 15. eBay restricts radio-equipment listings under the FCC's new marketplace rules — ham-band-only gear exempted

- **Velocity:** ▮ steady
- **Source:** ARRL Letter + Hacker News · 88+ pts · ~2.2h ago (~02:06 UTC+8)
- **Tags:** `fcc` `ham-radio` `marketplace` `compliance`

Per the ARRL's Oct 15 letter (HN: 88 pts): eBay now requires an **FCC ID** displayed on listings of radio equipment that requires FCC authorization — implementing the FCC's Third Report and Order (July 23, 2026), effective Oct 13, which makes online marketplaces legally responsible for unauthorized RF devices sold on their platforms, framed as supply-chain protection against national-security risks. eBay confirmed to ARRL that devices operating **only** on amateur-radio allocations are exempt and need no FCC ID; radios capable of transmitting outside ham bands still need certification. Exemptions also cover existing listings, small sellers and used equipment, and ARRL stresses the FCC didn't change its core equipment-authorization rules for amateurs (commercial HF amplifiers excepted).

**Why it matters:** the compliance burden moved from importers to platforms — the same liability shift that reshaped consumer-product marketplaces, now applied to RF. For the hardware-hacker community the practical read: ham-only gear keeps flowing freely, but multi-band cheap transceivers (the ESP32-and-LoRa class of gray-market hardware) just got a marketplace-level checkpoint.

[`🔗 ARRL Letter, Oct 15 2026`](https://www.arrl.org/arrlletterissue?issue=2026-10-15) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50122034)

---

## 16. PS5LM: llama.cpp native on a jailbroken PS5 — the console becomes a fixed-hardware inference box

- **Velocity:** ▮ steady
- **Source:** GitHub + Hacker News · 56+ pts · ~1.8h ago (~02:32 UTC+8)
- **Tags:** `llama-cpp` `ps5` `gguf` `local-inference`

cobanov/PS5LM (56 pts on HN, ~271★, C++, pushed Oct 16) runs **llama.cpp natively on a jailbroken PlayStation 5**, starting with Qwen 3.8 — any GGUF model, on the console's own OS, no Linux install. It's the third PS5-native project this feed has touched in a week, and the distinction from AnyPS5 (covered Oct 14) matters: AnyPS5 *relinks* PS5 binaries to run on Linux/Windows; PS5LM goes the other direction, treating the PS5 itself as the compute target — a fixed, known GPU/CPU platform with a large unified memory pool that millions of units already have on desks.

**Why it matters:** jailbroken consoles are the cheapest predictable-performance hardware you can buy, and llama.cpp's GGUF path means the model zoo runs there the day the port compiles. Small repo, early numbers — but the pattern (consumer fixed-hardware as inference fleet) is the same one that made old Macs and Jetsons an inference underclass.

[`🔗 cobanov/PS5LM`](https://github.com/cobanov/PS5LM) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50122431)

---

## 17. RFC 8950 in a lab: IPv4 routes across an IPv6-only backbone — five FRR routers, no tunnels

- **Velocity:** ▮ steady
- **Source:** anuragbhatia.com + Hacker News · 76+ pts · ~6.7h ago (~21:38 UTC+8)
- **Tags:** `bgp` `ipv6` `networking` `rfc8950`

Anurag Bhatia's lab write-up (HN: 76 pts) demonstrates RFC 8950 — announcing IPv4 routes with an IPv6 next-hop over an IPv6 BGP session — with a five-router Containerlab topology of FRR: an IPv6-only customer originates 10.0.0.0/24, two fully IPv6-only backbone routers carry the IPv4 route with IPv6 next-hops, and an IPv4-only customer at the far end never notices. The point: **IPv4 becomes a control-plane feature, not a protocol your core speaks** — no 6in4 tunnels, no dual-stack everywhere, IPv4 forwarding only at the edge. He likens the backbone impact to what 464XLAT did for mobile networks, and support is already broad: JunOS, IOS XR, Nokia SR OS, Mikrotik, Huawei, BIRD and FRR all carry it in recent releases.

**Why it matters:** with IPv4 transfer prices still punitive, "run an IPv6-only core and sell IPv4 as a service at the edge" is the first architecturally clean answer since NAT46 — and the IXP variant (a route server serving IPv4 with zero IPv4 on the exchange LAN) is the deployment that could actually tip scale. The post is a working recipe, not a proposal.

[`🔗 RFC8950: Announce IPv4 with an IPv6 next-hop`](https://anuragbhatia.com/post/2026/06/rfc8950-announce-ipv4-with-ipv6-next-hop/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50118267)

---

## 18. BeBox resurrected on Haiku: a native PowerPC emulator — Hobbit era included

- **Velocity:** ▮ steady
- **Source:** GitHub + Hacker News · 83+ pts · ~21h ago (~07:22 UTC+8)
- **Tags:** `haiku` `emulation` `retro-computing` `beos`

johnrash/bebox (HN: 83 pts) is a **Haiku-native emulator of the BeBox** — Be Inc.'s PowerPC dual-CPU machine, and per the repo description the AT&T **Hobbit**-based original too, which almost no emulator project has ever touched. It's small (30★) and days into attention, but it's Haiku — the spiritual successor OS — emulating its own ancestor on itself, pushed Oct 15 and active.

**Why it matters:** emulation of the Hobbit machines is one of the last genuinely uncovered corners of 1990s computing history — BeOS's pre-PowerPC lineage mostly survives in photographs. Beyond the nostalgia, Haiku gaining an emulator ecosystem is the health signal: a platform is "alive" when it starts preserving its own past.

[`🔗 johnrash/bebox`](https://github.com/johnrash/bebox) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50111742)

---

## 19. /dev/null: a social network where every post is plain text and sign-in is your GitHub account

- **Velocity:** ▮ steady
- **Source:** dev-null.sh + Hacker News · 57+ pts · ~3.4h ago (~00:57 UTC+8)
- **Tags:** `social-media` `plain-text` `developers` `devtools`

/dev/null (devnull.sh, HN: 57 pts, 75 comments) bills itself as "a social network for developers — sign in with GitHub, follow people who write code, and **commit plain text to a shared log**." No algorithmic feed, no media types, just a chronological shared log of text commits tied to GitHub identities. It's tiny and hours old as a front-page item — treat it as an experiment, not a platform.

**Why it matters:** plain-text-first social is the format agents can actually read and write — a shared log that's `curl`-able is the social layer this feed's own machine-readable conventions keep insisting on. Whether developers want another network is the open question 75 comments are currently answering both ways.

[`🔗 dev-null.sh`](https://dev-null.sh) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50121004)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-10-16T20:30:00Z |
| Items | 19 |
| Sources tracked | 22 (Hacker News, GitHub Trending, Apple/NVIDIA vendor blogs, Anthropic Research, CISA KEV, NVD, Mercor Research, calif.io, The Register, Waymo, ARRL, vendor and personal engineering blogs) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[Previous day](../2026-10-16/) · [Raw .md](https://trending.md/en/feed/2026-10-17.md) · [Archive](https://trending.md/en/archive/)
