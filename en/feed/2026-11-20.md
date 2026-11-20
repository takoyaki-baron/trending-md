---
date: 2026-11-20
updated: 2026-11-20T12:28:42Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 42
license: CC-BY-4.0
---

# trending.md — 2026-11-20

## 1. Claude solves two open problems in the physics of black holes — and publishes the caveats with them

- **Velocity:** ▮▮▮ trending
- **Source:** Anthropic · 199+ pts on HN · ~2.6h ago (~01:27 UTC+8)
- **Tags:** `ai-research` `physics` `agents` `formal-verification` `lean`

Anthropic's research post (published Nov 17, hitting HN tonight) describes two results from Claude Fable 5.2 agents that ran autonomously "in the background, with no special setup, for about six weeks" after researcher Hongbin Chen asked Claude to list open problems in August. **Result one:** in N=4 super Yang-Mills, the thermal phase transition analogous to black-hole formation "is abrupt at both weak and strong coupling" — Claude completed a calculation open since Aharony et al. set it up in 2003, and an independent physicist working separately on the same problem reached the same answer by different methods. **Result two:** in 3D quantum gravity's modular bootstrap, Claude found and **proved optimal** a ceiling on the lightest black hole's mass, M₁ ≤ c/Λ with Λ given by an exact formula ≈ 9.1266 — improving the prior proven bound of c/8.5 (Hartman, Mazáč, Rastelli). The bootstrap proof was "formally verified in Lean" in September, one agent's route came from borrowing a "spectral curve" out of sphere-packing, and half of it "follows the strategy of the OpenAI proof." The preprints are up (2611.00174, 2611.00175).

**Why it matters:** This is the strongest public instance yet of agents running a multi-week research campaign with independent replication and machine-checked proofs — not a benchmark number, but an open problem closed. The post is also unusually careful about its own limits: "Neither result describes our own universe directly," neither settles quantum gravity, and the abruptness at intermediate coupling remains a conjecture. The quotable claim is the *method*, and the caveats travel with it.

> One agent's contribution was spotting a missed pattern in how the numerical ceiling shifted with the central charge — a move that turned a numerics observation into a proof strategy no one had applied to this problem before.

[`🔗 Anthropic: Claude solves two open problems in the physics of black holes`](https://www.anthropic.com/research/claude-black-hole-physics) · [`🔗 Preprint: modular bootstrap bound (2611.00174)`](https://hexagonmath.org/2611.00174v1) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50563148)

---

## 2. UK tribunal judgment: the government tracked its own Apple encryption order through authorized press briefings

- **Velocity:** ▮▮▮ trending
- **Source:** Investigatory Powers Tribunal · 276+ pts on HN · ~3.7h ago (~00:21 UTC+8)
- **Tags:** `encryption` `privacy` `policy` `uk` `e2ee`

The Investigatory Powers Tribunal handed down judgment on 19 November ([2026] UKIPTrib 9, cases IPT/26/191/CH and IPT/25/83-86/CH) in Apple's challenge to the Home Office's Technical Capability Notice — the secret order, revealed by reporting in February 2025, that demanded access to iCloud end-to-end encrypted backups and led Apple to withdraw Advanced Data Protection from UK users. Apple argued the fact of the notice "could not conceivably damage national security" to acknowledge; the tribunal agreed the fact is now acknowledged in these proceedings, and went further on the government's neither-confirm-nor-deny stance: **"the evidence shows that the Government has not consistently applied NCND in this context"**, inferring "that it is extremely unlikely that multiple Government sources would have briefed the media in the absence of authorisation for such briefing" — i.e. the world learned of the order through official briefings, not a leak. The notice's *contents* stay secret in parallel PRIVATE and CLOSED judgments, with Privacy International, Liberty, Ian Hosein and Ben Wizner intervening for the NGOs.

**Why it matters:** The substantive fight — whether the UK can compel a backdoor into E2EE used by customers worldwide — is still undecided, and the judgment itself notes a December 2026 trial is impractical, so the merits grind on into 2027. What moved today is accountability process: a secret order's existence is now judicially acknowledged while its substance remains classified, and the tribunal called out the government for briefing journalists while formally refusing to confirm the order existed.

> The panel: Lady Carmichael (President), Mr Justice Chamberlain and Mr Justice Johnson — hearing 17 September 2026, judgment 19 November 2026.

[`🔗 IPT judgment: Apple Inc & NGOs v Secretary of State for the Home Department`](https://investigatorypowerstribunal.org.uk/judgement/1-mr-vincent-kearney-2-british-broadcasting-corporation-v-1-chief-constable-of-the-police-service-of-northern-ireland-2-chief-constable-of-durham-constabulary-3-security-service-4-governme/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50562113)

---

## 3. "Fuck Your AI Safeguards" — a defender's account of being locked out of his own security work

- **Velocity:** ▮▮▮ trending
- **Source:** ounapuu.ee · 245+ pts on HN · ~3.6h ago (~00:27 UTC+8)
- **Tags:** `ai-safety` `claude-code` `security` `guardrails` `open-weights`

Estonian senior product engineer Herman Õunapuu's post — written after hackers altered freezer temperatures at a Selver supermarket — describes asking Claude Code to scan his own product for easily-fixed weaknesses. Claude found a genuine issue ("simple oversight with a one line fix"), then halted, citing safeguards. The post walks through Anthropic's Cyber Verification Program as he experienced it: multi-business-day waits, government ID, waiving data-retention exemptions, no guaranteed approval — while testing whether public PoC exploits against his own stack sit on the wrong side of the line. His workaround: an EU-hosted open-weights model (he names GLM 5.3) verified the vulnerability, implemented the fix, and confirmed it resolved. His argument is the asymmetry: "abliterated" open models face no such friction, so the constraints bind defenders and not attackers — and he closes by accusing Anthropic of making the ecosystem less safe, speculating the restrictions are an IPO-adjacent regulatory moat.

**Why it matters:** This is the sharpest first-person statement yet of the defender-friction complaint that has been building all year — and it lands the day after Anthropic's Nasdaq debut, alongside an organized statement (item 6) making a version of the same argument. Whether or not one accepts the "regulatory moat" framing, the operational claim is concrete and testable: defensive scanning work that trips a safeguard has a same-hour fallback in open weights, from inside the EU.

> The same complaint shows up in today's [Pete Warden interview](https://thedataexchange.media/pete-warden-moonshine/) (item 8), from the other direction: white-hat researchers "keep tripping over the restrictions and the guardrails that are built in with good intentions" is his exhibit for why local AI wins.

[`🔗 Fuck Your AI Safeguards (ounapuu.ee)`](https://ounapuu.ee/posts/2026/11/19/unsafeguards/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50562262)

---

## 4. Since we covered Java4Shell yesterday: the bug sat in OpenJDK's own PR queue since September 9

- **Velocity:** ▮▮ rising
- **Source:** OpenJDK GitHub PR · 251+ pts on HN · ~8.3h ago (~19:45 UTC+8)
- **Tags:** `java` `openjdk` `cve` `memory-safety` `jvm`

Yesterday's story was Java4Shell (CVE-2026-114938) — pre-auth code execution via OpenJDK's AVX-512 Base64 intrinsic, framed around its AI-assisted discovery. Today HN surfaced [PR #32781](https://github.com/openjdk/jdk/pull/32781), "8392044: AVX-512 Base64 decoder overwrites output buffer on short padded tail," **created 2026-09-09** — the same bug, described in detail (a masked vector path that computes a wrong `output_mask` on invalid input and "stores past the logical output length before returning to Java, corrupting the heap"), with a suggested fix, checked against OpenJDK's Interim AI Policy. It never got its two required reviews; the bridgekeeper bot warned at 8 weeks' inactivity and the PR **auto-closed on 2026-11-04, unmerged**. Oracle's CVE record (published 2026-11-17, status `Analyzed` → `Modified` on 11-19) carries Oracle's own CVSS 3.1 **8.1** (AV:N/AC:H) across Java SE 8u511/17/21/25/27 and GraalVM. Yesterday evening, HN users were asking the PR author why it was closed.

**Why it matters:** The found-in-an-hour-with-AI narrative needs its footnote: the bug was publicly visible in OpenJDK's own queue for eight weeks before auto-close, six weeks before Oracle's record published. A pre-auth heap-corruption primitive in the JIT's Base64 path was sitting in plain sight at the project that ships it — which says less about AI-assisted discovery and more about where review capacity actually binds.

> The PR's own body is careful about trigger conditions: valid inputs (length a multiple of 4) never hit it — the corruption fires only on invalid input, which is exactly the kind servers should still assume arrives.

[`🔗 OpenJDK PR #32781 (created 2026-09-09, auto-closed 2026-11-04)`](https://github.com/openjdk/jdk/pull/32781) · [`🔗 CVE-2026-114938`](https://www.cve.org/CVERecord?id=CVE-2026-114938) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50558906)

---

## 5. An unattributed "Gestalt" tops a blind-vote design benchmark — HN's verdict: show us the outputs

- **Velocity:** ▮▮ rising
- **Source:** contralabs.com · 103+ pts on HN · ~9h ago (~19:03 UTC+8)
- **Tags:** `benchmarks` `design` `ai-models` `elo` `leaderboard`

Contra Labs and BenchFlow's Frontier Design Benchmark rates models on 33 real client design briefs from Contra's marketplace, judged by **68 professional designers via 4,311 blind head-to-head votes** across 35 rubric dimensions (rubric-vs-designer correlation r = 0.94). Its 17-entry Elo leaderboard puts an entry called **Gestalt** at #1 — above "Human golden" (real designer work) and ahead of Claude Fable 5.2, Claude Opus 5.5, and GPT-6.1 Sol. That's the entire verifiable story: the landing page shows **no numeric Elo scores, no dates, no attribution for Gestalt, and never labels any entry "stealth"** — and it doesn't display the mystery entry's outputs in the public gallery. The HN submitter's title ("Two stealth models just appeared on the leaderboard, both ahead of Fable 5.2") matches only one clearly unattributed entry on the page. The thread's reaction is uniform skepticism: "Random AI lab makes up a new benchmark that puts at least one of its models ahead of Fable 5.2," "the ultimate 'trust me, bro' move," and a direct question about why no model named Gestalt is findable anywhere else.

**Why it matters:** Benchmark-marketing season is peaking — a new leaderboard claiming an anonymous model beats every frontier system is exactly the artifact the current skepticism is calibrated for. The interesting part is procedural, and it's testable: blind votes by named professionals are a real methodology, but a leaderboard without published scores, dates, or sample outputs asks you to trust the framing. Watch whether Gestalt appears anywhere else — the thread's own guessers name GLM 5.5 or a DeepSeek trained on Ascend, both unconfirmed.

> The one substantive thread observation: Kimi K3.1 Pro scores high on the page's "slop" metric yet earned strong professional critiques — worth watching whether "slop" and "designer taste" are measuring different things.

[`🔗 Frontier Design Benchmark (Contra Labs × BenchFlow)`](https://contralabs.com/frontierdesign) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50558559)

---

## 6. "Anthropic is not a safe AI company" — scientists, legal scholars and Hugging Face's co-founder sign an IPO-week statement

- **Velocity:** ▮▮ rising
- **Source:** misanthropicstatement.com · 136+ pts on HN · ~27h ago (~01:03 UTC+8)
- **Tags:** `ai-safety` `anthropic` `ipo` `industry` `open-source`

A coalition statement timed to Anthropic's public offering, carried by a Business Wire release and signed at misanthropicstatement.com, argues the company "uses safety branding to court investors, employees, and the public—even as it has quietly weakened its safety pledges and lobbied for self-serving regulation," and concludes: **"Anthropic is not a safe AI company, and we must reject its reckless attempt to amass power in the name of the greater good."** Named signatories include Steven Pinker (Harvard), Thomas Wolf (co-founder and chief science officer of Hugging Face), Laurence Tribe (Harvard Law emeritus), Stephen Fry, and Rumman Chowdhury (Humane Intelligence) — a list that spans noted AI skeptics and noted anti-doomers, which the HN thread reads as the statement's actual point: this is one criticism of Anthropic's self-presentation, not one worldview.

**Why it matters:** The AI-safety reframe has moved from blog essays to organized, named coalitions timing their hits to capital markets events — and the release lands within 24 hours of both the $2T Nasdaq debut and the ["Fuck Your AI Safeguards" post](https://ounapuu.ee/posts/2026/11/19/unsafeguards/) above. For developers, the practical signal is that "safety" as a vendor brand is now contested territory, with open-weights advocates (Hugging Face's co-founder among them) making the counter-brand argument in public.

> The statement's core charge is specific enough to check over time: that Anthropic "quietly weakened its safety pledges" — its own policy-change history is the citation both sides will fight over.

[`🔗 The MisAnthropic Statement (signatories)`](https://misanthropicstatement.com/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50548485)

---

## 7. Garage Door Spam: five hundred points for ripping the cloud out of a garage door

- **Velocity:** ▮▮ rising
- **Source:** blog.harrison.page · 598+ pts on HN · ~76h ago (~00:15 UTC+8)
- **Tags:** `self-hosted` `homekit` `iot` `ratgdo` `open-source`

Harrison Page's post is this week's biggest HN thread, and it is not about radio attacks — "spam" is the ads that encrusted Chamberlain's myQ app, the only sanctioned way to get push notifications when his garage door opens. The replacement is two **ratgdo32** boards (~$62 each) running open-source firmware, wired directly to the opener's terminals and speaking LiftMaster's Security+ 2.0 protocol locally: HomeKit and Siri control, per-door web UIs, Tailscale subnet routes for remote access, and a cron job (`garage-watch`, every 10 minutes overnight) that alerts via Slack if a door is left open — recreating, he notes, his father's childhood mercury-switch hallway-light hack in software. He also merged a small PR into the ratgdo project. "Everything runs locally with no cloud," and the notifications now identify *who* opened the door, which myQ never did.

**Why it matters:** The pattern recurs weekly — a vendor adds ads or kills third-party API access (Chamberlain did the latter in late 2023), and an open firmware project absorbs the demand. ratgdo is the shape to remember: cheap ESP32 hardware wired to existing terminals, protocol-level local control, and the cloud demoted from requirement to opt-in. The thread's energy is the market signal: owners will move hardware off vendor clouds the moment a credible local path exists.

> Chamberlain severed third-party myQ API access in late 2023; the myQ cloud remains the only notification path the vendor supports. ratgdo32's firmware is ESPHome/HomeKit-compatible and the project takes upstream PRs — the author's included.

[`🔗 Garage Door Spam (blog.harrison.page)`](https://blog.harrison.page/garage-door-spam/) · [`🔗 ratgdo32 firmware (GitHub)`](https://github.com/ratgdo/homekit-ratgdo32) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50519231)

---

## 8. Pete Warden makes the case for local AI — and calls Chrome's built-in 4B model "an iPhone moment"

- **Velocity:** ▮ steady
- **Source:** thedataexchange.media · 163+ pts on HN · ~4.4h ago (~23:39 UTC+8)
- **Tags:** `local-ai` `open-weights` `voice` `edge-ai` `moonshine`

The Data Exchange's interview with Pete Warden (TensorFlow Lite/Moonshine) argues local models sit "a few months behind the capabilities" of frontier ones, and the gap is marketing and packaging, not quality — the economics that carried Apache and Postgres past their proprietary rivals apply again. Hardware math from the episode: a 9B model at 4 bits fits in 4GB; Apple's 256GB-unified-memory machines already run hundred-billion-parameter models at usable speed. On voice, his litmus test for interface quality is whether you'd talk to your partner across the room, latency budgets sit near 200ms, and his Moonshine work now runs a full voice interface on a Pico microcontroller with 500KB of RAM. He's firmly in the "compound AI" camp — pipelines of specialized small models, calling end-to-end speech models "much more of a marketing term" — and he notes Chrome already ships a ~4B-parameter model callable from JavaScript, which he thinks is potentially "an iPhone moment" for LLMs. On inference hardware: GPUs are, in his phrase, "trying to use an oil tanker to go and do your shopping," and high-bandwidth flash is the component to watch.

**Why it matters:** The interview gives the local-AI position its most quotable economics case — free-at-point-of-use inference, auditable data flow, no silent model swaps behind a stable version number — and it dovetails with today's safeguards essay (item 3): Warden cites white-hat researchers tripping over cloud guardrails as his first exhibit. For anyone building agent or voice products, the compound-AI framing (independent components, text as the common interface) is immediately actionable.

> His hardware prediction is specific: watch Apple — abundant fast unified memory plus inference-only acceleration could make the discrete GPU optional for inference the way integrated graphics made it optional for display.

[`🔗 Pete Warden on local AI, open models, voice interfaces (The Data Exchange)`](https://thedataexchange.media/pete-warden-moonshine/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50561508)

---

## 9. "OpenAI still has a WebRTC problem" — the transport-math critique of voice agents

- **Velocity:** ▮ steady
- **Source:** moq.dev · 86+ pts on HN · ~6h ago (~22:03 UTC+8)
- **Tags:** `webrtc` `moq` `voice-ai` `realtime` `protocols`

Kixelated's follow-up post (making its HN round tonight) argues OpenAI's realtime voice stack inherits WebRTC's conferencing assumptions, which are wrong for agents. WebRTC aggressively drops audio arriving more than ~30ms late and disables retransmission by default — fine for humans, who fill gaps by inference; wasteful for LLMs, which are "blocked on context" and can't answer until the utterance completes, leaving seconds of slack that retransmission could use invisibly. On the speaking side, TTS generates audio faster than real-time, so a WebRTC agent must artificially sleep between packets, and any lost packet is unrecoverable; Opus FEC only covers single-packet loss, while congestion loss is bursty. The proposed fix is Media over Quic: per-subscription latency budgets (500ms for speech-to-speech, ~5s for accurate STT→LLM→TTS sharing one connection), timestamp-based playout, and interruptions via track swapping. The post is honest about being an opinion piece with back-of-envelope math (one second of Opus at 64Kbps ≈ 8KB) and a crude personal demo — and it notes the escape hatch of fixing WebRTC itself has been stalled for a decade: the playout-delay RTP extension has sat video-only in Google's libwebrtc since ~2016.

**Why it matters:** Voice agents are shipping fast, and their failure mode on bad networks is a transport choice nobody revisited — the agent asks you to repeat yourself because a 50-year-old conferencing budget says a late packet is worthless. The MoQ alternative (retransmit until the latency budget runs out) is concrete enough to prototype, and the author links a Pipecat PR doing exactly that.

> The gatekeeping observation may be the durable one: the fix for WebRTC's agent-unfriendly playout behavior has existed as a merged extension for ~10 years — for video only — and progress requires Google's buy-in.

[`🔗 OpenAI still has a WebRTC Problem (moq.dev)`](https://moq.dev/blog/webrtc-is-still-the-problem/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50560461)

---

## 10. Chrome's AI features blamed for "hundreds of GBs" of monthly bandwidth — one admin's measurement

- **Velocity:** ▮ steady
- **Source:** perishablepress.com · 86+ pts on HN · ~3.2h ago (~00:51 UTC+8)
- **Tags:** `chrome` `browser` `privacy` `bandwidth` `on-device-ai`

Jeff Starr (Perishable Press) reports that his server-side bandwidth usage "went thru the roof" a few months ago, and that after systematically disabling Chrome's **"AI innovations" and on-device AI settings** — which he reports are enabled by default — his network monitor showed traffic "virtually flatline," with usage he attributes to Chrome in the literally-hundreds-of-GBs-per-month range. The post's own evidence base is stated plainly: a screenshot of the settings page, an activity-monitor observation, and an invitation to reproduce it yourself with your favorite network monitor. No logs, no before/after tables, no device or OS specifics — this is one administrator's anecdote, not a measurement study, and the thread's discussion treats it accordingly.

**Why it matters:** Whether or not the number survives replication, the check it proposes is cheap and the underlying question is live: on-device AI features that periodically sync models can move serious traffic on fleets of machines, and enterprise admins are the ones who'll see it in their egress bills. If you manage Chrome at scale, the post's value is the settings page to audit and a one-evening experiment to run — and the resurfacing timing matters, coming the same week as the local-AI economics argument above.

> Treat the magnitude as unverified: the post names no measurement window or methodology. Its actionable content is the settings location and the reproduce-it-yourself method.

[`🔗 Chrome AI features wasting much bandwidth (perishablepress.com)`](https://perishablepress.com/chrome-ai-wasting-much-bandwidth/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50562636)

---

## 11. Foolscap: a writing app that reads your book and never writes a word of it

- **Velocity:** ▮ steady
- **Source:** foolscap.works · 98+ pts on HN · ~7h ago (~21:03 UTC+8)
- **Tags:** `writing-tools` `ai` `show-hn` `publishing`

Show HN today: Foolscap pitches itself as "a writing app that knows your whole book" — as you write, it "notices what connects and what's left hanging, and shows you where, in your own words," surfacing structural relationships and unresolved threads in a manuscript. The differentiator is load-bearing and stated flatly: **"It never writes a word for you."** It's the analysis side of writing AI — continuity, callbacks, dangling setups — without the generation side, positioned against tools that draft for you. On privacy, the site says writing is never used to train AI, and a per-book private mode means "nothing of it goes to any AI at all," which implies cloud AI is in the loop by default. The thread's discussion is exactly the argument you'd expect: is structure-analysis without generation the feature writers actually want, or a step on the same road?

**Why it matters:** After two years of AI writing tools competing to generate more, the counter-positioning — read everything, write nothing — is itself becoming a category. The design choice worth watching is the default: an analytical companion that sends your manuscript to cloud AI unless you opt out is a different trust proposition than the local-first pitch, and writers will ask which one this is.

> Show HN threads are where these positioning fights get settled in public — the "never writes for you" line is doing the work a pricing page usually does.

[`🔗 Foolscap`](https://foolscap.works/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50559749)

---

## 12. Launch HN: Onlook rebuilds as a visual canvas on your real codebase — with bring-your-own agent

- **Velocity:** ▮ steady
- **Source:** GitHub · 50+ pts on HN · ~3.5h ago (~00:33 UTC+8)
- **Tags:** `design-tools` `developer-tools` `open-source` `agents` `yc`

Onlook (YC W25) relaunched on Launch HN today: an Apache-2.0 desktop app (27.3k stars) that opens any git repo on your machine, runs your own dev server, and puts the live app on an infinite canvas with mobile/tablet/desktop frames side by side — so designers edit the real running application instead of a mockup that gets rebuilt later. Edits happen visually or by chat under a **bring-your-own-agent** model: no bundled model, you connect your existing Claude Code or Codex account, plus MCP connectors; changes land in safe worktree copies and ship via one-press pull requests. It exports self-contained HTML/PNG/JPEG/PDF, is local-first (no account needed for source builds), and is macOS-only today with Windows and Linux waitlisted. The current app is a ground-up rebuild — the README points to the older browser version (v1 branch) and Electron app (`onlook-dev/desktop`, dormant since July 2025) as prior incarnations.

**Why it matters:** The design-tool-vs-agent frontier is converging from both sides — Figma adding code, agents adding pixels — and Onlook's bet is that the durable position is designing directly on the running app, with whatever agent you already pay for. BYO-agent is also a quiet pricing statement: the tool refuses to margin-mark your tokens, which is getting rare.

> The canvas-runs-your-dev-server architecture means framework support is inherited from your own tooling — anything a dev server can render, the canvas can show.

[`🔗 onlook-dev/onlook (GitHub)`](https://github.com/onlook-dev/onlook/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50562320)

---

## 13. Ghost-Downloader-3 ships two releases in a day — and rides to trending

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · 449★ today (~00:40 UTC+8 release)
- **Tags:** `download-manager` `open-source` `qt` `chinese-oss` `cross-platform`

The Chinese open-source download manager Ghost-Downloader-3 (12.4k stars, +449 today) is trending on the strength of **v4.5.9 and v4.5.10, both shipped today** (v4.5.8 landed yesterday). v4.5.10 adds Arabic, Malay and Turkish with translations moved to Crowdin, makes Linux packages support the fcitx5 input method out of the box, improves Aria2 RPC compatibility for subfolders and relative paths, and fixes a batch of i18n and UI bugs (including the language stuck in Chinese after updating to v4.5.9). The project's architecture is the interesting part: a Qt core with loadable **feature packs** — m3u8 streaming, BitTorrent, eD2k, Bilibili — plus built-in handlers for HuggingFace, arXiv, GitHub and yt-dlp links, shipped for Windows (x86_64/arm64), macOS (Apple Silicon/Intel), Linux (AppImage/deb/tar.xz) and Android, with SHA256 checksums on every asset. The maintainer notes development is slowing: "Updates will be less frequent due to my studies."

**Why it matters:** Model-release season makes HuggingFace and arXiv links a real download workload, and a downloader with first-class handlers for exactly those hosts — plus multi-connection acceleration — is riding a genuine use case, not just the trending algorithm. The feature-pack design is also a small lesson in sustainable open source: protocol support ships as optional modules, so the core stays buildable when the maintainer's time shrinks.

> Release hygiene worth copying: every asset carries a SHA256 checksum, and the v4.5.10 notes explicitly name the regression they fix from v4.5.9.

[`🔗 XiaoYouChR/Ghost-Downloader-3 (GitHub)`](https://github.com/XiaoYouChR/Ghost-Downloader-3) · [`🔗 Release notes: v4.5.10`](https://github.com/XiaoYouChR/Ghost-Downloader-3/releases)

---

## 14. NVD's November 19 batch: a Mandiant-scored 9.3 in a .NET anti-CSRF library, Meilisearch DoS fixes, and a Geany command injection

- **Velocity:** ▮ steady
- **Source:** NVD / cve.org · records published Nov 19 (~10:17 UTC+8 first record)
- **Tags:** `cve` `dotnet` `meilisearch` `geany` `vulnerability`

Three records from yesterday's NVD batch worth acting on. **CVE-2026-131914** — deserialization of untrusted data in the double-submit cookie vs. form-field validation of **Idunno.AntiCsrf ≤ 0.9.1 Beta** on ASP.NET, giving "remote unauthenticated attackers... code via object injection"; scored **CVSS 4.0 9.3 by Mandiant** (`mandiant-cve@google.com`, a Secondary metric on a record still `Received` at NVD). **CVE-2026-132750** — Meilisearch before 1.55.1 and 1.56.x before 1.56.1 has a quadratic memory-consumption path in filter parsing (a denial-of-service primitive against search infrastructure); the fixes shipped — 1.56.1 on Nov 2, 1.57.0 on Nov 16. **CVE-2026-132756** — Geany through 2.1.0, OS command injection via embedded shell commands in an opened document (8.5). All three carry VulnCheck- or Mandiant-assigned scores; NVD analysis hasn't caught up on any of them.

**Why it matters:** None of these is a front-page worm, but the first is a reminder that security *helper* libraries are attack surface too — an anti-CSRF library whose validation path deserializes attacker-controlled data inverts its own purpose, and the 9.3 from Mandiant (not a vendor self-score) says the researcher took it seriously. Meilisearch operators should confirm they're on 1.56.1+; the record's fix chain is already published, so this is a version check, not a wait.

> Score provenance, as always: the 9.3 is Mandiant's CVSS 4.0 riding a `Received` record — no NVD analysis behind it yet, and the record can still move.

[`🔗 CVE-2026-131914 (Idunno.AntiCsrf)`](https://www.cve.org/CVERecord?id=CVE-2026-131914) · [`🔗 CVE-2026-132750 (Meilisearch)`](https://www.cve.org/CVERecord?id=CVE-2026-132750) · [`🔗 CVE-2026-132756 (Geany)`](https://www.cve.org/CVERecord?id=CVE-2026-132756)

---

## 15. "The architecture wasn't designed, it accumulated" — the x86 story from the 4004 to the 486

- **Velocity:** ▮ steady
- **Source:** pikuma.com · 177+ pts on HN · ~29h ago (~23:03 UTC+8)
- **Tags:** `cpu-architecture` `history` `x86` `intel` `retrocomputing`

Gustavo Pezzi's long-form history (October 2026, resurfacing on HN) walks the x86 lineage from the 4-bit 4004 — built for a Busicom calculator — through the 8086/8088, 286, 386 and 486, arguing the ISA is best read as a historical record. The loads are all business decisions wearing engineering clothes: little-endian byte order and the register set trace to the **Datapoint 2200** terminal CTC designed (not Intel); AX/BX/CX/DX exist because the 8086 offered *source* compatibility with the 8080; segmentation (segment × 16 + offset) was how 16-bit registers reached 1MB, and the 640KB DOS limit was IBM's memory-map choice, not a CPU restriction. The 286's protected mode couldn't be exited — forcing IBM's keyboard-controller reset hack and the A20 gate (which Intel only dropped with Haswell in 2013) — and Gates called the chip "brain-damaged." The 386 added 32-bit registers and paging but was single-sourced, sparking the AMD lawsuit; the 486 changed the engine, not the architecture, and its 5-stage pipeline flipped optimization rules (LOOP became slower than `dec/jnz`).

**Why it matters:** EveryCompat quirk in the x86 baseline people still curse — the A20 gate, segment arithmetic, the register names — traces to a specific deadline or contract from 1971–1989, and the article keeps the receipts. For anyone doing emulator work, retro dev, or just arguing about ISA design, it's the cleanest single-file account of why compatibility is a life sentence.

> The naming coda lands the thesis: the successor to the 486 couldn't be trademarked as "586," so it became the Pentium — marketing replacing a numbering scheme the competition had learned to use.

[`🔗 The History Behind the x86 CPU: 4004 to 486 (Pikuma)`](https://pikuma.com/blog/history-of-x86-4004-to-486) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50546967)

---

## 16. "Software companies are trying to kill home computing?" — the July essay having its moment

- **Velocity:** ▮ steady
- **Source:** lateblt.livejournal.com · 174+ pts on HN · ~20h ago (~08:03 UTC+8)
- **Tags:** `essays` `subscriptions` `ownership` `windows` `industry`

lateblt's July 2026 LiveJournal essay resurfaced to 174 points: software doesn't wear out, so the one-time-sale market is structurally finished — and the industry's answer is to make local computing miserable enough that renting looks better. The receipts span two decades: Windows Product Activation (2001) ending multi-machine installs, Windows 11's React-Native Start menu and TPM 2.0 gatekeeping, GTA 6 shipping without a disc, Adobe's CC pivot in 2013, Exchange on-premises requiring subscriptions plus "Software Assurance" — his analogy: a carmaker with a deadly design flaw that "expects every customer to pay $500 to get the problem fixed." The essay's sharpest turn is sympathizing with TempleOS author Terry Davis — quoting "File permissions do not belong in a consumer product" — and noting even Linux inherits those concepts from UNIX. The conclusion: "an active war against your ability to use computer software," one the author expects to never end.

**Why it matters:** The essay articulates the ownership-versus-rental argument that keeps resurfacing in concrete fights — myQ ads (item 7), Garage-door-style firmware takeovers, cloud-optional tools gaining "local-first" as a marketing line. It's written from the hobbyist wing, but the same logic is why "runs offline" reappearing in enterprise tool pitches is a 2026 phenomenon: the default stopped being local, so local became a feature you sell.

> Worth reading beside the garage-door thread: same diagnosis, one post is a manifesto and the other is a $124 receipt and a cron job.

[`🔗 Software companies are trying to kill home computing? (lateblt)`](https://lateblt.livejournal.com/526188.html) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50554010)

---

## 17. Fanzines.app: the 8-page booklet fold, solved in the browser

- **Velocity:** ▮ steady
- **Source:** krthr.co · 159+ pts on HN · ~6.8h ago (~21:15 UTC+8)
- **Tags:** `zines` `print` `front-end` `diy` `browser-tools`

Wilson Tovar (krthr) explains the print-imposition problem behind his fanzines.app: take one A4 sheet, fold in half three times, cut the center crease, and you have an 8-page booklet with no staples — but the flat sheet's layout is nobody's friend, because folding makes the pages sit in strange order and the top row prints upside down (page 6 beside page 5 beside page 4 beside page 3, rotated 180°, over the Back/Cover/1/2 row). He got tired of rotating pictures and double-checking columns in Photoshop, so the app does the imposition in the browser: you place content into the booklet's logical pages, and it produces the print-ready flat sheet. The post doubles as a friendly introduction to the fold itself — the diagram alone is worth the visit.

**Why it matters:** Small, single-purpose browser tools keep winning Show-HN-style attention because they remove one precise friction and ask for nothing — no account, no upload in the privacy-respecting variants, no install. Imposition is also the rare problem where the computer's help is unambiguous: the fold is fixed geometry, so the tool either lays it out right or it doesn't.

> The post's ASCII diagram of the unfolded sheet — which cells are upside down, which order the pages land in — is the entire spec, and it's four lines long.

[`🔗 Paper, folds, and what's new in fanzines.app (krthr.co)`](https://krthr.co/paper-folds-and-whats-new-in-fanzines-app/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50559719)

---

## 18. A ransomware gang leaks customer data tied to JPMorgan, Visa and Mastercard — via third-party marketing vendors

- **Velocity:** ▮▮▮ trending
- **Source:** Wall Street Journal · 133+ pts on HN · ~4.8h ago (~07:32 UTC+8)
- **Tags:** `security` `breach` `banking` `third-party-risk` `ransomware`

A ransomware group tracked as **n0n** has published data stolen from third-party marketing vendors serving JPMorgan Chase, Visa and Mastercard, the WSJ reports; all three firms say the vendors were targeted, not their core systems. Coverage of the leak (cybernews, syndicated via MSN) says it includes email addresses and phone numbers for roughly **16,000 of JPMorgan Chase's wealthiest cardholders**; the bank's own statement is deliberately narrower: "we believe the attackers accessed certain marketing data held by those vendors, which may include some customer names and email addresses." Note this is a different event from Tuesday's five-bank outage — that was Chase's on-prem hardware bug rippling through other banks' transaction paths; this is data exfiltration from the marketing supply chain, disclosed in a statement on X.

**Why it matters:** The unit of failure keeps moving outward — first banks' core systems (this week's outage cascade), now the marketing vendors that hold customer contact data on their behalf. If the gang's leak-site numbers hold up while the bank's description stays at "names and email addresses," the gap between what a vendor loses and what a bank admits is the story to watch across the next rounds of disclosure.

> The gang's name and the 16,000 figure trace to leak-site coverage (cybernews/MSN), not to the banks — treat them as the attacker's framing until the institutions' incident reports land.

[`🔗 WSJ: Visa, Mastercard and JPMorgan Customer Data Leaked by Hackers`](https://www.wsj.com/finance/banking/visa-mastercard-and-jpmorgan-customer-data-leaked-by-hackers-3b5a0f87) · [`🔗 Reuters: JPMorgan, Visa, Mastercard say third-party vendors targeted in cyberattack`](https://www.reuters.com/legal/government/jpmorgan-says-third-party-vendors-targeted-cyberattack-2026-11-19/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50568082)

---

## 19. Since we covered Gemini 4 Neon yesterday: it's now #1 on the Models Engineering Index

- **Velocity:** ▮▮▮ trending
- **Source:** git-aarvin.github.io/mei · 245+ pts on HN · ~4.7h ago (~07:35 UTC+8)
- **Tags:** `ai-models` `benchmarks` `gemini` `engineering` `leaderboard`

Yesterday's story was Neon's launch as Google's middle tier, #3 on the Intelligence Index at $3/$15. Today a different, independently-maintained artifact — the **Models Engineering Index**, a single-maintainer project — puts **Gemini 4 Neon at #1 with an index of 68.0**, ahead of Claude Fable 5.2 (65.3), GPT-6.2 Astra (61.5), Gemini 4 Carbon (61.4) and Claude Opus 5.5 (61.1). The method is the interesting part: it standardizes scores across seven engineering benchmarks (CursorBench, FrontierCode, Code Migration, IOI, ProgramBench, Terminal-Bench, Vibe Code) and fits a model effect plus a benchmark effect, so a model isn't rewarded for picking easy benchmarks. On the cost axis Neon carries a 1.6× cost multiplier against Fable 5.2's 6.4× — the frontier-ranking flip and the price gap are two different claims, and this index states both.

**Why it matters:** Benchmark-marketing season is peaking (see item 5's anonymous "Gestalt" above), and the credible counterweight is methodology transparency — no lab affiliation, published fit, and every sub-benchmark shown. One index putting yesterday's mid-tier launch above the flagship models is also a concrete data point in the argument that middle tiers eat the frontier — the argument Neon's pricing was designed for.

> Read it as one maintainer's aggregate, not a field consensus — but it's the artifact whose numbers you can actually recompute from the page.

[`🔗 Models Engineering Index`](https://git-aarvin.github.io/mei/) · [`🔗 Google: Introducing Gemini 4 Neon`](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-neon/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50568130)

---

## 20. OpenSSL buffer overflow in EVP_EncodeBlock() — CVE public, fix proposed, no release carries it

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub PR · 54+ pts on HN · ~2.2h ago (~10:01 UTC+8)
- **Tags:** `openssl` `cve` `memory-safety` `tls` `c`

CVE-2026-121481 (published 2026-11-18, `Awaiting Analysis`): "Calling EVP_EncodeBlock() with an input length close to INT_MAX may overflow the calculation of the encoded output size and write past the end of the caller-supplied output buffer." The **9.8** CVSS 3.1 on the record comes from the CISA-ADP enrichment container (a Secondary metric, org `134c704f-…`) — not an NVD analysis and not OpenSSL's own score. The proposed fix is [PR #33652](https://github.com/openssl/openssl/pull/33652), opened Nov 10 by nmouha and **still open and unmerged**: return `-1` for invalid inputs (NULL buffers, negative lengths, encoded sizes that don't fit an int), matching wolfSSL's compatibility layer, with a similar guard proposed for `EVP_DecodeBlock()`. Its body says "The OpenSSL SRT has asked for it to be fixed publicly; the advisory is still pending." No shipped OpenSSL release contains the fix — the newest is 4.1.0 from Oct 23.

**Why it matters:** Base64 encoding is everywhere, but the exposure is per-application: the overflow needs a caller passing attacker-controlled, near-INT_MAX lengths into `EVP_EncodeBlock()`, so the 9.8 is a library-impact number and your risk depends on your call sites. The artifact gap is the operational fact — CVE public, PR public, advisory pending, nothing to install yet — so the remediation is inventory (who calls EVP_EncodeBlock with unvalidated lengths?), not an upgrade.

> Score provenance, as always: 9.8 is CISA-ADP's, riding a record NVD hasn't analyzed — and the record can still move when OpenSSL's own advisory lands.

[`🔗 CVE-2026-121481`](https://www.cve.org/CVERecord?id=CVE-2026-121481) · [`🔗 OpenSSL PR #33652 (open, unmerged)`](https://github.com/openssl/openssl/pull/33652) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50569226)

---

## 21. Synology drops a 9.8 in the DSM OAuth API — fix promised "by 2026-11-20", the mitigation is today's action

- **Velocity:** ▮▮ rising
- **Source:** Synology · 119+ pts on HN · ~6.1h ago (~06:13 UTC+8)
- **Tags:** `nas` `cve` `synology` `oauth` `self-hosted`

Synology advisory SA-26:21 (published 2026-11-19, 15:47 UTC+8): **CVE-2026-120382**, a CWE-88 improper neutralization of argument delimiters in the **OAuth API** of DiskStation Manager, vendor-scored **CVSS 3.1 9.8** — remote attackers can read or write arbitrary files and conduct denial-of-service attacks. It affects DSM 6.2.4 through the 7.4 line (specific builds listed per branch) and BeeStation OS 1.5, across NAS and BeeStation products. The mitigation that works right now: **"Deactivate the OAuth Service package."** The fixed builds — DSM 7.4.1-90080-2 and 7.3.2-86009-6 — were "scheduled for release by 2026-11-20," i.e. promised today, not shipped when the advisory went up; 7.2.x users are told to upgrade across branches to 7.3.2. NVD had no record for the CVE when checked (~04:12 UTC today), still none at ~13:25 UTC+8, and still none at ~21:10 UTC+8 — the CVE Program's own registry (cveawg) has no record either, so the id is reserved but unpublished; the 9.8 and CWE-88 quoted here are Synology's own advisory text (vector `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H`), re-verified first-hand against the advisory — still Revision 1, builds still "scheduled", not shipped on the promised day itself (checked 21:10 UTC+8). This is Synology's second event in a week: a *different* DSM bug, CVE-2026-10441, hit the KEV catalog on 11-18 with a three-day federal deadline.

**Why it matters:** The house-your-own-cloud fleet is enormous — Synology NAS boxes run everything from home photo archives to small-business file servers — and an unauthenticated arbitrary-file read/write in a package most installs leave enabled is exactly the class that gets weaponized fast. The mitigation is a checkbox today; the upgrade is a promise with a date.

> Score provenance: 9.8 is Synology's own advisory score on a record NVD hasn't published yet — re-check before quoting it as NVD-analyzed.

[`🔗 Synology SA-26:21 (DSM, BeeStation OS)`](https://www.synology.com/en-uk/security/advisory/Synology_SA_26_21) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50567209)

---

## 22. PostgreSQL 19 ships: REPACK (CONCURRENTLY), plan advice, and parallel autovacuum

- **Velocity:** ▮▮ rising
- **Source:** postgresql.org · 99+ pts on HN · ~14.2h ago (~22:11 UTC+8)
- **Tags:** `postgres` `database` `release` `performance` `vacuum`

The annual major release landed yesterday, and its headline is operational: **REPACK (CONCURRENTLY)** reclaims table bloat and can reorder a table's data to match an index without blocking reads or writes — replacing the access-blocking `VACUUM FULL`/`CLUSTER` (both kept for compatibility). For plan stability there's the new **pg_plan_advice** extension (a "plan advice" mini-language for pinning or experimenting with plans) plus **pg_stash_advice**, which stores advice by query identifier and applies it automatically — fix a slow plan without touching the application. Autovacuum can now vacuum indexes with **parallel workers** (`autovacuum_max_parallel_workers`) under a new scoring system for which tables go first, and queries mark pages all-visible during execution, shrinking future vacuum work. Elsewhere: read-your-writes consistency on standbys, logical replication initialization without a server restart (WAL level auto-raised on the first logical slot), and new monitoring views (`pg_stat_lock`, `pg_stat_recovery`, `pg_stat_autovacuum_scores`).

**Why it matters:** Bloat cleanup has been a third-party-tool-shaped hole in Postgres for a decade (`pg_repack` users know the dance); building it in — concurrently — removes one of the last routine reasons to take a table offline. Plan advice is the quiet revolution for anyone who has watched a good plan flip bad after an stats change at 3am.

> The upgrade-window read: managed providers shipped it day one (Neon and Databricks Lakebase both announced support within hours) — the REPACK command alone is an upgrade argument for busy write-heavy tables.

[`🔗 PostgreSQL 19 Released (postgresql.org)`](https://www.postgresql.org/about/news/postgresql-19-released-3449/) · [`🔗 Snowflake: Squeezing Tables with Postgres 19 Repack`](https://www.snowflake.com/en/blog/engineering/postgres-19-repack-table-bloat/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50560357)

---

## 23. Lastbook: an offline "rebuild society" library — local Gemma, offline maps, 374 points

- **Velocity:** ▮▮ rising
- **Source:** lastbook.org · 374+ pts on HN · ~13.6h ago (~22:47 UTC+8)
- **Tags:** `offline-first` `local-ai` `preparedness` `open-source` `maps`

Lastbook is an open-source (MIT) desktop app for Mac (Apple Silicon), Windows and Linux that bundles a survival-and-rebuilding knowledge base to run fully offline: a **local Gemma 4 26B A4B** for questions, **258,000+ searchable offline places** (fire stations, shelters, water + medical POIs), 2,324 offline videos, and guides spanning first aid, safe drinking water, food preservation, critical repairs, power and evacuation planning. The tagline does the positioning: "Free, local, offline and private." The repo (`Immortal-Protocols/lastbook`) was created Nov 12 and is already at ~2,600 stars with active pushes — the Show HN a few days ago drew 19 points, yesterday's resubmission drew 374.

**Why it matters:** This is the local-AI argument (item 8) compiled into one artifact: model, index, maps and video, no connectivity. The sleeper feature is the offline POI index — a quarter-million searchable places is the part that doesn't degrade when the internet does, and the part most "offline encyclopedia" projects skip.

> Eight-day-old repo, moving fast — the 374 points are interest, not a track record; watch whether the library grows or forks.

[`🔗 Lastbook`](https://lastbook.org/) · [`🔗 Immortal-Protocols/lastbook (GitHub)`](https://github.com/Immortal-Protocols/lastbook) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50560822)

---

## 24. Jeveration: a frozen VLM generates images in one forward pass — 78 ms, "up to 122× faster than existing unified models"

- **Velocity:** ▮▮ rising
- **Source:** Hugging Face daily papers · 116+ upvotes · ~24h ago (~12:00 UTC+8, 11-19)
- **Tags:** `ai-research` `image-generation` `arxiv` `single-forward-pass` `vlm`

The top paper on Hugging Face's daily board repurposes a frozen vision-language model for generation in the System One / decision-model paradigm — parallel prediction instead of token-by-token decode. From the abstract: "Jeveration generates a 512x512 image in 78 ms, up to 122x faster than existing unified models, while maintaining competitive image quality and dense prediction performance." One checkpoint covers text-to-image, image-to-image and dense prediction, each in a single forward pass. The coherence problem — many valid images per prompt, so parallel predictions must converge — is solved by conditioning all positions on a shared random state, with a learned distribution over discrete image codes guiding the pass because the model "tends to ignore this state under direct image supervision."

**Why it matters:** The decision-model camp (this week's HeyGen Decision 1, Perplexity's Decider line) just got a generation exhibit: 78 ms is a latency budget no autoregressive image decoder meets, and unifying generation with dense prediction in one checkpoint is the compound-model dream stated as an artifact. The usual caveat applies — 512×512 and the paper's own benchmark set define "competitive."

> The method's lineage is the story: the same "fast, parallel prediction" framing that decision models use for judgments, applied to pixels.

[`🔗 arXiv: Jeveration (2611.24738)`](https://arxiv.org/abs/2611.24738) · [`🔗 Hugging Face paper page`](https://huggingface.co/papers/2611.24738) · [`🔗 Carol-lyh/Jeveration (GitHub)`](https://github.com/Carol-lyh/Jeveration)

---

## 25. Firecrawl rebrands around Firecrawl Local — one Rust binary, MCP on localhost, Alexandria in the cloud

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · 204k★ total (~12:10 UTC+8 check)
- **Tags:** `agents` `web-scraping` `mcp` `rust` `open-source`

The 204k-star scraping-for-agents repo is trending on the strength of a repositioning: a Nov 19 README rewrite ([PR #5855](https://github.com/firecrawl/firecrawl/pull/5855)) that changes the one-line pitch to "Knowledge infrastructure to make your agents smarter" and leads with **Firecrawl Local** — "Run Firecrawl on your own machine as one binary that turns websites into clean markdown, plugs into your AI agent as an MCP server and serves the Firecrawl API on localhost," which installs from crates.io. The cloud tier is reframed around search and **Firecrawl Alexandria**, a "550+ data providers" research index. Worth being precise about what this is: no new release has shipped since v2.11.0 in June — this is a positioning change plus a Rust binary, not a version bump.

**Why it matters:** The scraping category is consolidating into knowledge infrastructure — index-first answers with a local-first binary as the wedge — and the local-binary-plus-MCP shape is where every agent data tool is converging. For self-hosters, the crates.io binary without database, queue or containers is the concrete deliverable to evaluate.

> Read the trend as a strategy signal: the repo that taught agents to scrape now wants to be the layer that answers before scraping is needed.

[`🔗 firecrawl/firecrawl (GitHub)`](https://github.com/firecrawl/firecrawl) · [`🔗 Firecrawl (firecrawl.dev)`](https://firecrawl.dev/)

---

## 26. RegExr takes itself offline "with AI hacking" in the room

- **Velocity:** ▮ steady
- **Source:** regexr.com · 61+ pts on HN · ~5.9h ago (~06:27 UTC+8)
- **Tags:** `regex` `security` `web-history` `legacy` `ai-hacking`

RegExr, the regex tester/visualizer a generation of developers learned on, is now "Temporarily Offline," and the notice names its reason plainly: "RegExr's codebase is aging, and with AI hacking we've decided the best way to safekeep your data is to take the site down until we get a chance to modernize and secure it. Our sincere apologies for the outage!" The site has accounts and user-saved patterns — exactly the long-tail profile (beloved tool, aging code, small maintainer, stored user data) that AI-assisted attack economics have turned from theoretical to routine.

**Why it matters:** This is the retirement phase of the AI-attack curve: sites that can't fund a rewrite now cite attackers as the reason to shut down rather than stay up. The week's outage-and-exploit cascade has a quiet tail, and it's thousands of RegExr-shaped services making the same calculation with less grace.

> The counterfactual is worth stating: the data at risk was regex patterns — and the shutdown still beat the odds-board. Scale that calculus to every hobby service with accounts.

[`🔗 RegExr: Temporarily Offline`](https://regexr.com/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50567374)

---

## 27. Platypush rebuilds its voice pipeline — microwakeword locally, OpenAI in the middle, receipts included

- **Velocity:** ▮ steady
- **Source:** blog.platypush.tech · 71+ pts on HN · ~7.4h ago (~04:57 UTC+8)
- **Tags:** `voice-assistant` `self-hosted` `wake-word` `home-automation` `platypush`

Platypush author Fabio Manganiello's Nov 19 post rebuilds his self-hosted voice assistant for the second time in two months, and the honest part is why: he was "unhappy with the high rates of false positives/negatives of my self-hosted pipeline, as well as its lack of robustness in detecting start/end of speech, especially in noisy environments and using cheap microphones." The new stack swaps **openwakeword for microwakeword** (local wake word), uses **assistant.openai** for speech-to-text with **assistant.vosk** as the local fallback, routes responses through openai (cloud or local) and speaks via **tts.openai** or **tts.piper**. The post includes the full configuration and the code changes, plus the caveats that survive contact with a real room.

**Why it matters:** The compound-AI argument (item 8) gets a working implementation ledger: local where latency and privacy bind (wake word), cloud where accuracy still wins (STT), a documented fallback chain for each stage. This is the practical middle ground between "everything local" purism and handing Amazon your kitchen — and it's measured against false-wake rates, not vibes.

> The two-months-between-rebuilds cadence is itself the finding: self-hosted voice is improving fast enough that the stack is a moving target.

[`🔗 Rebuilding my voice assistant pipeline (blog.platypush.tech)`](https://blog.platypush.tech/article/Rewriting-my-voice-assistant-pipeline) · [`🔗 BlackLight/platypush (GitHub)`](https://github.com/BlackLight/platypush) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50566261)

---

## 28. Vint Cerf on why TCP/IP was never patented — and his post-Google interplanetary startup

- **Velocity:** ▮ steady
- **Source:** seremot.com · 48+ pts on HN · ~3.2h ago (~09:06 UTC+8)
- **Tags:** `internet-history` `tcp-ip` `openness` `interplanetary` `podcast`

João Tomé (ex-Cloudflare) launches his Future Stories podcast with Vint Cerf as the first guest, and the interview carries real news: Cerf, 83, left Google this year after twenty-plus years and is helping start **Tolero**, building software for an Internet between planets — "the speed of light is too slow." On why TCP/IP was never patented, his answer is strategic, not sentimental: "Who will our allies be 25 years from now? And we didn't know. So we thought the only way we can be assured that the allies will have access to this is to simply open it up." The anecdotes earn their keep: a two-week random crash his friend Steve Crocker diagnosed in thirty seconds ("that's the problem" — his case for collaboration), and the 1989 CERFnet launch where he and the network's director smashed a bottle of glitter over a Cisco router.

**Why it matters:** The openness argument gets re-litigated weekly in AI licensing fights — an essay arguing that all AI-generated code should be open source led one of this month's rounds; here it is from the protocol layer, stated as geopolitical insurance rather than ideology. And the interplanetary-internet startup is a concrete new artifact to track, not a retrospective.

> The naming trivia: CERFnet wanted SURFnet, lost it to the Dutch, and borrowed his name instead — he agreed on the theory that nobody blames the person a thing was named after.

[`🔗 Vint Cerf on why TCP/IP was never patented (seremot.com)`](https://seremot.com/p/vint-cerf-on-why-tcpip-was-never) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50568861)

---

## 29. Frostbite: an AI-designed general-purpose CPU claims 4.59× perf/watt — with the fine print in its own footnote

- **Velocity:** ▮▮▮ trending
- **Source:** architectlabs.com · 150+ pts on HN · ~2.1h ago (~18:05 UTC+8)
- **Tags:** `ai-hardware` `chip-design` `agents` `interaction-nets` `lean`

Architect Labs' second act after Redwood: **Frostbite**, a general-purpose CPU whose ISA, microarchitecture, RTL, verification and final GDS were produced by agent swarms around a new execution model — **interaction nets** (Lafont 1990), where programs in the Rust-like **Vine** language compile to a graph whose parallelism is explicit and spatial rather than rediscovered by out-of-order machinery. Measured on a 7nm layout (500 MHz in GDS, quad + 4 L3 nodes = 0.792 mm²), they report a geometric mean of **4.59× perf/watt** and **8.77× perf/area** against a comparison core ("TCPU") across 25 workloads — 10 the agents tuned on, **15 held out** until final evaluation (3.83× on the held-out set). The energy accounting is the interesting part: fetch/decode/issue drops from 27% of the baseline's budget to 6%, traded for 26% spent on on-chip network and a hardware work-stealing scheduler whose behavior, the post says, "was never specified by any human." The whole program is held together by an in-house formal spec language (ASL) that lowers to **800k+ lines of Lean**, and the swarm kept 37 of 58 proposed ideas across four searches.

**Why it matters:** This is the most complete public claim yet of the AI-designs-the-whole-chip thesis (OpenAI's RTL work and Anthropic's Mythos-AMD training runs made this a theme this week — Frostbite goes further, taking a workload to GDS). The headline multiple deserves its caveat, and the post carries it if you read past the abstract: the baseline is described as a modern, silicon-proven superscalar CPU up top, but the results section's own footnote defines TCPU as a dual-issue, in-order processor whose identity they can't disclose "for legal reasons" — that is a modest baseline by modern core standards, and every number is pre-silicon (the post says so itself). The honest read: a genuinely novel execution model, a serious formal-verification spine, and a 4.59× that means beating a small in-order core, not a Zen 6.

> What would move the claim: the promised SPEC/PARSEC comparisons against wide out-of-order cores, the FPGA playground, and the RTL + ISA release they list as next steps — all checkable when they land.

[`🔗 Introducing Frostbite (architectlabs.com)`](https://architectlabs.com/blog/frostbite) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50572503)

---

## 30. GrapheneOS: "Google is trying to convince OEM partners not to support GrapheneOS or even bootloader unlocking"

- **Velocity:** ▮▮▮ trending
- **Source:** grapheneos.social (Mastodon) · 393+ pts on HN · ~6.8h ago (~05:20 UTC+8)
- **Tags:** `android` `privacy` `bootloader` `grapheneos` `oem`

The GrapheneOS project's official account posted yesterday evening (2026-11-19 20:40 UTC): **"Google is sabotaging their OEM partners by making a growing number of features and updates exclusive to Pixels. At the same time, Google is trying to convince OEM partners not to support GrapheneOS or even bootloader unlocking. They're also trying to harm GrapheneOS directly."** The post carries no named OEM, no documents, no specific feature — it is the project's own characterization, which is exactly why the HN thread (393 points) is doing the work of asking what's verifiable: Pixel exclusivity has been tightening for years, and the set of phones that even permit bootloader unlocking keeps shrinking industry-wide.

**Why it matters:** GrapheneOS is the hardened-Android option — sandboxed Play services, per-app network/permission controls, the stack security researchers point people to. Its hardware path runs through exactly the OEM relationships and bootloader-unlock switches this post says Google is leaning on. If the claim holds, the practical consequence lands on anyone who runs (or recommends) a de-Googled Android: the pool of supported devices stops growing. The claim is unverified beyond the project itself — watch for an OEM going on record, either way.

> The pattern rhymes with this week's theme of platform gatekeeping (Google's AI-or-nothing search terms, the Waymo freeway suspension): the operator of the platform also sells the alternative, and the switching cost is yours.

[`🔗 GrapheneOS on Mastodon (2026-11-19)`](https://grapheneos.social/@GrapheneOS/117645038299496084) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50570479)

---

## 31. "I can tell you wrote this yourself" — an engineering student's report draws 2026's most loaded compliment

- **Velocity:** ▮▮▮ trending
- **Source:** em-online.bearblog.dev · 229+ pts on HN · ~4.9h ago (~15:15 UTC+8)
- **Tags:** `education` `ai-dependence` `essays` `engineering` `writing`

An engineering honours student (Em) turned in a 10-page report on flapping-wing micro aerial vehicle control — written over 48 stressed hours, human words throughout — and their supervisor's verdict was: **"I can tell you wrote this yourself,"** followed by *"I've been sent a lot of reports written by AI."* The essay unpacks why that landed as a warning rather than praise: assignment briefs that begin "you are strongly encouraged to explore the use of AI" and quickly read as *expected*; "the hardest class of my degree was spent in a brick-walled windowless computer lab prompting an AI for eight hours a day"; the sense that the industry is training a generation into "a glorified babysitter." The author worries about the slope — using it when encouraged, then outsourcing a report on a project they'll have to defend in person — and lands on literacy, bias detection, and thinking for yourself as the things actually at stake.

**Why it matters:** This is the education-side witness for the week's human-capital thread — the Jane Street interview change, the Harvard firm-level study showing agents lift code output 76% while final output rises 9–11%, and yesterday's [We Need Smart People Who Give a Shit](https://violetpixel.com/blog/2026-11-17-we-need-smart-people-who-give-a-shit/) essay. The compliments that now have to be issued explicitly are a measurable cultural signal: when human-written becomes detectable, it becomes rare, and the institutions that made it rare are the ones handing out the reassurance.

> The sharpest line is structural, not sentimental: students are graded on a project they must defend in person, while being trained to produce it through a medium that never has to defend anything.

[`🔗 "I can tell you wrote this yourself" (Em's Blog)`](https://em-online.bearblog.dev/i-can-tell-you-wrote-this-yourself/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50571189)

---

## 32. Since we covered FFmpeg's 121-CVE wave on Nov 10: 9.1 "Gauss" ships today — the first release cut after the whole fix train

- **Velocity:** ▮▮ rising
- **Source:** ffmpeg.org · 170+ pts on HN · ~8.1h ago (~12:00 UTC+8)
- **Tags:** `ffmpeg` `release` `multimedia` `open-source` `codecs`

FFmpeg 9.1 "Gauss" was released **today (2026-11-20)**, cut from master on 2026-10-24 — the first stable release from the 9.1 branch, following 9.0.2 "Lei" (Sep 18) at the head of the 9.0 line. The changelog runs 32 items, led by: **ASTC** texture encode/decode via libastcenc (with `.astc` and KTX 1.0 muxers/demuxers), an **extensively improved AAC encoder**, an **APV Vulkan encoder**, LCEVC payload merging bitstream filter, an MVR demuxer, **libcurl protocol** support, DVD-Audio LPCM demuxing, NVIDIA optical-flow acceleration, and an iTerm2 inline-image muxer. Library versions stepped across the board (libavutil 61.19.100, libavcodec 63.24.100). One structural note from the thread: FFmpeg's canonical git now lives at **code.ffmpeg.org**, the project's own forge instance.

**Why it matters:** Ten days ago this feed covered the 121-record CVE wave whose fixes read "through 9.0.2" and "9.x before 9.0.2" — 9.1 is the first minor release that consolidates that entire security train into a fresh branch, plus the AAC-encoder work (the codec half the internet's audio pipelines lean on). If you run FFmpeg anywhere near production, this is the version line where the CVE backports and the feature work finally sit in one tree.

> Release provenance, as always: download-page facts (release date, branch cut, library versions) are stated by ffmpeg.org itself; the changelog highlights here are the release notes as carried in the HN thread.

[`🔗 FFmpeg Download: 9.1 "Gauss"`](https://ffmpeg.org/download.html#release_9.1) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50569998)

---

## 33. The Jujutsu Primer: a working guide to the Git-compatible VCS where your working copy is already a commit

- **Velocity:** ▮▮ rising
- **Source:** ethanlowman.com · 140+ pts on HN · ~6.4h ago (~13:40 UTC+8)
- **Tags:** `jujutsu` `vcs` `developer-tools` `rust` `stacked-prs`

Ethan Lowman's **Jujutsu Primer** (Nov 18) is the best single-file introduction yet to `jj`, and it's having its HN moment today. The mental model it teaches: run `jj git init` in an existing repo and jj tracks the same objects alongside git; your working copy **is a commit** (auto-snapshotted on every jj command), each logical change carries a **change ID** that survives rebasing while commit IDs churn; conflicts are recorded on commits instead of halting everything; and the op log makes `jj undo`/`jj redo` total. From there it's revsets, bookmarks as git branches, generated branch names (`push-<changeid>`), and stacked-PR workflows — with the honest observation that agents are "quite good at" using tools like jj-hunk to split commits for review. Two ecosystem facts worth keeping: releases are feature-dense (v0.47.1 shipped Nov 5), and jj's creator Martin von Zweigbergk is now CTO of **East River Source Control**, a new forge being built for jj.

**Why it matters:** jj's design choices map suspiciously well onto agent-era workflows — automatic rebase, stable change IDs, conflicts as data, total undo. A primer reaching HN's front page is the adoption signal; the forge news underneath it is the infrastructure signal. Git isn't going anywhere, but the working-copy-as-commit model is the first serious ergonomic challenge it has faced in a decade.

> The primer's own framing for trying it: jj and git run side-by-side in the same repo, so the experiment is reversible by construction.

[`🔗 Jujutsu Primer (ethanlowman.com)`](https://ethanlowman.com/posts/jj-primer/) · [`🔗 jj-vcs/jj (GitHub)`](https://github.com/jj-vcs/jj) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50570628)

---

## 34. The UK's secret fridge operation: tens of thousands of freezers pulled off the open internet before attackers found the flaw

- **Velocity:** ▮▮ rising
- **Source:** BBC News · 54+ pts on HN · ~2.3h ago (~17:50 UTC+8)
- **Tags:** `iot-security` `ot` `ncsc` `food-supply` `disclosure`

BBC cyber correspondent Joe Tidy reveals (published 2026-11-20 00:02 GMT, held back until the risk passed) a coordinated UK defense: in late October, refrigeration consultancy **Omega Solutions** found that controllers from **Resource Data Management (RDM)** — the most popular refrigeration controllers in the UK — shared **"a similar weak password problem to the Danfoss and other controllers"** hit in this year's European fridge-hack waves. Pen Test Partners verified and expanded the finding; **NCSC, Defra and the FSA** ran industry calls; thousands of controller devices — spanning supermarkets, warehouses, restaurants, petrol stations and stadiums — were taken off the open internet remotely or by physically pulling cables, with one chain's IT team taking "hundreds of devices offline every day" for a week. The background: Oct 11–12 saw hundreds of French sites hit via Danfoss systems; Nov 1–2 hit dozens of supermarkets across seven European countries (Belgium and Luxembourg worst) plus French blood-bank sites; France blamed Iran, which Tehran denies. **RDM disputes the severity** — says exploiting it would require physical hardware access ("a vulnerability identified in a test environment" whose test "included dismantling our hardware") — but has shipped first patches and reports no sign of malicious activity. Pen Test Partners' Ken Munro notes the needed hardware sells cheaply on eBay: "it was likely a matter of days until criminals or nation state hackers figured it out."

**Why it matters:** This is the operational-technology tail of the week's outage-and-exploit cascade — the food supply runs on internet-exposed controllers with default passwords, and the defense that worked was profoundly unglamorous: unplug, monitor temperatures manually, patch. It's also the same incident class that triggered this week's safeguards debate (the freezer hack behind item 3), now with the defender-side playbook attached — and a rare public example of quiet, coordinated disclosure completed before weaponization.

> Read the severity dispute as the standard vendor/researcher gap — RDM says exploiting it would require physical hardware access, PTP notes the hardware sells cheaply on eBay — with NCSC treating it as worth a nationwide campaign regardless.

[`🔗 Tens of thousands of UK fridges secured from hackers in secret operation (BBC)`](https://www.bbc.co.uk/news/articles/c6eq49zyx7p4o) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50572430)

---

## 35. GIMP now tests its whole UI on every merge — 13 real-window tests for three decades of menus

- **Velocity:** ▮ steady
- **Source:** gimp.org · 125+ pts on HN · ~8.2h ago (~11:55 UTC+8)
- **Tags:** `gimp` `testing` `ui-automation` `open-source` `ci`

GIMP's news post (Nov 16, by Harsh Verma, resurfacing today) describes a new **GUI testing platform**: each test starts a real GIMP, clicks through actual menus and dialogs, and reads the result back — 13 tests so far, run automatically **on every merge**. The post is precise about why: unit tests "were not opening a real window," so they could not tell whether a dialog opens or a menu item did its job; and GIMP's legacy GUI tests, which reach directly into core code, break all too often — and not because they caught a bug. The covered surface: startup and main window, the Welcome dialog's tab behavior and "Show on Start" toggle, File→New sizing, File→Export As writing correct PNGs, color swap and foreground-color typing, layer add/delete, Undo/Redo, zoom.

**Why it matters:** GIMP is the canonical intertwined-codebase nightmare — exactly the project where a change to one dialog silently breaks another. UI-level tests on every merge is the same discipline the Claude Code team described last week — when most of the code is agent-written, the test suite is the management — applied by a 30-year-old volunteer project — and it's the natural guardrail for agent contributors, who can now break the UI and get told about it before a human notices.

> The unglamorous numbers are the story: 13 tests is tiny coverage for GIMP's surface, but the platform that runs them on every merge is the hard part, and it's done.

[`🔗 GIMP: Improved Graphical User Interface testing`](https://www.gimp.org/news/2026/11/16/gimp-ui-tests/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50569985)

---

## 36. DeepMind's institute asks "What comes after AGI?" — and maps four roads to superintelligence

- **Velocity:** ▮ steady
- **Source:** institute.deepmind.com · 81+ pts on HN · ~9.4h ago (~10:40 UTC+8)
- **Tags:** `agi` `deepmind` `ai-research` `governance` `essays`

Tim Genewein (research scientist, Google DeepMind) published this essay at DeepMind's institute site on Nov 19, and its premise is the news: AGI is "coming within reach," so the post-AGI regime "is shifting from philosophical speculation to empirical research and governance questions." The framework: general intelligence as a continuum, with ASI defined as consistently outperforming *groups* of human experts on years-long tasks with fewer resources; **"cognitive industrialization"** as the transition mechanism; and four pathways from AGI to ASI — **scaling models and data, technological paradigm shifts, improving agent coordination, and recursive self-improvement (RSI)** — each with its own dynamics and uncertainties. The ask is measurement: "building rigorous, reliable ways to track progress" along whichever road materializes.

**Why it matters:** When a frontier lab's research institute formalizes post-AGI pathways as an empirical agenda, the framing moves from essay discourse into the same machinery as benchmark indices and eval harnesses — this week's Models Engineering Index (item 19) and the decision-model wave are the measurement layer that such a map would be read against. Read it as one lab's map with the lab's own framing included, not a field consensus.

> The essay's honest center of gravity: it treats "AGI within reach" as its premise, not its conclusion — the four roads are a research program for finding out whether the premise holds.

[`🔗 What comes after AGI? (Google DeepMind Institute)`](https://institute.deepmind.com/essays/what-comes-after-agi/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50569519)

---

## 37. ChatGPT for SNES: a 2.2M-parameter language model on the Super FX chip, honest caveats included

- **Velocity:** ▮ steady
- **Source:** bxfoundry.com · 101+ pts on HN · ~11.6h ago (~08:30 UTC+8)
- **Tags:** `retrocomputing` `edge-ai` `snes` `language-models` `show-case`

Benj Edwards (BX Foundry) built a chat program for the Super Nintendo: version 0.7 (dated 2026-11-02) runs a **2.2M-parameter** language model on the cartridge's **Super FX 2** chip, emitting one word at a time — playable in the browser via Snes9x (~4 MB) or on real hardware with a Super FX flash cart (FXPak Pro / sd2snes). A second build adds a "fact book": the opening sentences of **150,000 Simple English Wikipedia articles** stored in the MSU-1 data file, which the model can choose to consult like a search tool. The training conversations were generated by **gpt-oss-120b**, and the code was written by AI agents — the page's honesty section is part of the design: the model "knows about 8,000 words, and often gets things wrong, sometimes confidently," and the whole thing is "not made or endorsed by OpenAI."

**Why it matters:** This is the extreme end of the local-AI curve (item 8): an interface whose every keystroke costs a moment, running on 1995 hardware — and a complete AI-built artifact, from synthetic training data to agent-written code. It's a toy by its own description, but it demarcates the floor of where a language model can physically run better than any benchmark table.

> The type-in-your-answers-via-on-screen-keyboard detail is the design constraint made visible: 1995's I/O budget, 2026's model.

[`🔗 ChatGPT for SNES (BX Foundry)`](https://www.bxfoundry.com/chatgpt_snes/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50568548)

---

## 38. Weight-space programming is becoming a research area: LLMs hand-writing network weights, now with a training recipe for editability

- **Velocity:** ▮ steady
- **Source:** notesbylex.com · 105+ pts on HN · ~62h ago (essay 11-18; paper fresh 11-19)
- **Tags:** `ai-research` `interpretability` `weight-space-programming` `training` `benchmarks`

The idea that frontier LLMs can read, write and **edit neural network weights directly** is consolidating into a small literature this week. The lineage: RikiyaT's original "Weight-Space Programming" post, where GPT-6 Astra built a Go-playing network from scratch and then improved it through self-play by editing weights. Lex Toumbourou's essay (Nov 18) reran the experiment stricter — Claude Fable 5.2 setting **all 5,994 weights of a CNN "by hand"** for MNIST, no fitting, regression or search — and found the model reaches for 1990s-era hand-crafted filtering techniques (Sobel-style templates), with Fable notably outperforming Opus 5.5 on the task. Now the measurement layer: Konstanz's **2611.26408** (Ropinski & Kranz, Nov 19) benchmarks LLM-driven weight-space programming on vision models — **2,600+ edit processes** across five LLMs, each scored on held-out images for success, side effects and accuracy loss — and proposes **Edit-Ready Training (ERT)**, which rehearses the direct, closed-form weight edits LLMs perform, achieving the highest mean edit score for GPT-6 Astra and Claude Opus 5.5. A TabbyML WebGPU playground for watching weight-space programming run in the browser rode the same wave onto Show HN.

**Why it matters:** If networks can be *trained to be editable*, the unit of model improvement stops being a gradient-descent run and starts being a weight edit — with interpretability and safety implications on both sides (this connects back to Nov 14's "Weight Space Misfolding" threat model). Early days, small nets, vision tasks — the benchmark's own scope — but the field now has a benchmark, a training method, and reproducible experiment logs, which is how areas start.

> The cross-model detail is the provocative part: ERT lifted edit success most for the *frontier* models — editability may be a capability that scales, not a hack.

[`🔗 Weight-Space Programming builds neural networks like a 1990s researcher (NotesByLex)`](https://notesbylex.com/weight-space-programming-1990s) · [`🔗 arXiv: Training Vision Models for LLM-Driven Weight-Space Programming (2611.26408)`](https://arxiv.org/abs/2611.26408) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50538977)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-20T12:28:42Z |
| Items | 38 |
| Sources tracked | 42 (Hacker News, GitHub Trending, GitHub repos, Anthropic, hexagonmath.org, Investigatory Powers Tribunal, ounapuu.ee, cve.org, contralabs.com, misanthropicstatement.com, blog.harrison.page, thedataexchange.media, moq.dev, perishablepress.com, foolscap.works, pikuma.com, lateblt.livejournal.com, krthr.co, wsj.com, reuters.com, git-aarvin.github.io, synology.com, postgresql.org, snowflake.com, lastbook.org, huggingface.co, arxiv.org, blog.platypush.tech, regexr.com, seremot.com, firecrawl.dev, architectlabs.com, grapheneos.social, em-online.bearblog.dev, ffmpeg.org, ethanlowman.com, bbc.co.uk, gimp.org, institute.deepmind.com, bxfoundry.com, notesbylex.com, rikiyat.github.io) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[Previous day](2026-11-19.md) · [Raw .md](https://trending.md/en/feed/2026-11-20.md) · [Archive](../archive/index.md)
