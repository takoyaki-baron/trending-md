---
date: 2026-11-11
updated: 2026-11-11T12:40:05Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 28
license: CC-BY-4.0
---

# trending.md — 2026-11-11

## 1. AlphaProof Code machine-checks Signal's protocol in Lean — six million lines of proofs, four weeks, and two injected bugs caught

- **Velocity:** ▮▮▮ trending
- **Source:** Google DeepMind · 510 pts on HN · Nov 10 (~20:11 UTC+8)
- **Tags:** `deepmind` `formal-verification` `security`

Google DeepMind announced **AlphaProof Code**, an agentic framework for formal verification in which human experts write the security goals, AI agents translate them into specifications and then produce the proofs, and **Lean machine-checks every proof**. Applied to Signal's protocol, the agents generated **over six million lines of Lean** in **four weeks**, verifying that the *compiled* code fulfills the specified properties — message protection before and after a temporary device compromise — down to the code running on devices. As a sanity check, DeepMind reintroduced two real, previously fixed bugs into an isolated copy and the system produced machine-checked proofs that the buggy versions were insecure. About **1% of the codebase's proofs were flagged for human review**. The verification artifacts are open-sourced at google-deepmind.github.io/code-verification.

**Why it matters:** The claim is carefully scoped, and the scoping is the story: the result proves the code "delivers the security protections our experts specified" — not that libsignal is bug-free, and the bug test ran on an isolated copy, not production. Signal CTO Ehren Kret called agent-generated Lean "a major breakthrough", while DeepMind itself notes "scaling these techniques requires continued research". Implementation-level verification of a deployed cryptographic protocol is a first regardless of how the caveats cut.

> "Using AI agents to translate live code into valid Lean theorems is a major breakthrough." — Ehren Kret, Signal CTO

[`🔗 DeepMind: Introducing AlphaProof Code`](https://deepmind.google/blog/introducing-alphaproof-code/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50439193)

---

## 2. Gemini 4 Carbon is now available — Google's strongest model opens up, with a 0% prompt-injection claim and a caveat beside it

- **Velocity:** ▮▮▮ trending
- **Source:** Google · 249 pts on HN · Nov 11 (~00:07 UTC+8)
- **Tags:** `google` `model-release` `benchmarks`

Google made **Gemini 4 Carbon** generally available on Nov 10, three weeks after announcing it (Oct 28) and two weeks after giving cyber defenders early access through the Fairwind Program. Pricing is **$2/M input and $10/M output through November 30**, doubling to **$4/$20 on December 1** — the same trajectory as Gemini 4 Argon. The claim set is broad: #1 on CursorBench 4.0, Perplexity's WANDR and Zapier's AutomationBench at more than 2× lower cost per task, #2 on the new Multimodal Knowledge Agent benchmark, leads on SEC-bench Pro, ExploitGym and CWE-bench v1, and **Project Fortify at 100% recall on scanning and 95% precision on triage** — an internal benchmark. Safety numbers: per-attempt breach rate 0.8% (Argon: 3.1%), Gray Swan cyberattack success 2.17%, and **0% success on Gray Swan's prompt-injection benchmark**. Available in AI Studio, Google Antigravity (with a `/swarm` preview), the Gemini app and AI Mode; Vertex AI is not mentioned anywhere in the post.

**Why it matters:** The 0% injection result arrives with its own asterisk, quoted in the same post: "prompt injection robustness remains an area for continued improvement", and red-teaming found room to improve against sophisticated attacks in some distributions. That is the right way to read all the headline numbers here — several of the comparison benchmarks (Fortify, the agent-honesty score) are Google-internal or partner-run, and the pricing footnote notes the December doubling "applies to the Carbon model intended for public access only".

> "Carbon is our strongest model with frontier performance in cybersecurity capabilities and long-horizon agentic workflows."

[`🔗 Google: Gemini 4 Carbon is now available`](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-carbon-now-available) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50442303)

---

## 3. November's Patch Tuesday drops 1,094 Microsoft CVE records on NVD in a day — and the one marked "exploited" is a Moderate 6.5 Outlook bug

- **Velocity:** ▮▮▮ trending
- **Source:** MSRC CVRF 2026-Nov + NVD · Nov 10 (22:17–03:21 UTC+8)
- **Tags:** `patch-tuesday` `microsoft` `cve`

Nov 10 was Patch Tuesday, and the NVD publication window carried **1,692 records** at this item's 21:17Z read — the window kept filling and read **2,015 by 21:58Z** — of which **1,094 from `secure@microsoft.com`**, beside Mozilla's 105 and Intel's 103, all three counts exact on re-read. Microsoft's own CVRF document (28.1 MB) holds **1,342 vulnerabilities**, of which **1,095 are Microsoft-assigned** — Chrome's CVE admin assigned 165, Linux 41, GitHub_M 5. First-hand over the document's score sets: **48 vulnerabilities carry a base score of 9.0 or higher** (max 10.0), while Microsoft's own severity labels read **68 Critical, 1,117 Important, 110 Moderate, 47 Low**. The top of the score table: SharePoint incorrect authorization **9.9** (CVE-2026-120002), Azure DevOps improper authentication **9.9** leading to code execution over a network (CVE-2026-109467), **Azure OpenAI missing authentication for critical function 9.8** (CVE-2026-119990), Windows Kerberos authentication bypass 9.8 (CVE-2026-85844), LDAP out-of-bounds write 9.8, DNS double-free 9.8. All the records are still `Awaiting Analysis` on NVD — every number quoted here is the CNA's own.

**Why it matters:** The exploit flag inverted the severity logic. Exactly one entry in the whole document reads `Publicly Disclosed:No;Exploited:Yes;Latest Software Release:Exploitation Detected` — **CVE-2026-124194, an Outlook spoofing bug rated Moderate 6.5** — and CISA put it on KEV the same day. Meanwhile 42 higher-scored elevation-of-privilege bugs sit at "Exploitation More Likely" and the 9.x queue at "Less Likely". Patch priority that follows the exploitation column, not the score column, is the whole lesson of the month.

> CVRF exploit status for CVE-2026-124194: Publicly Disclosed — No · Exploited — Yes · Latest Software Release — Exploitation Detected

[`🔗 MSRC CVRF 2026-Nov (machine-readable)`](https://api.msrc.microsoft.com/cvrf/v3.0/document/2026-Nov) · [`🔗 NVD: CVE-2026-119990 (Azure OpenAI)`](https://nvd.nist.gov/vuln/detail/CVE-2026-119990) · [`🔗 CISA KEV: CVE-2026-124194`](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)

---

## 4. Firefox 160's release wave puts 100 CVE records on NVD the same day — seven of them sandbox escapes at 9.6

- **Velocity:** ▮▮ trending
- **Source:** Mozilla · 105 NVD records · Nov 10 (~22:17 UTC+8)
- **Tags:** `firefox` `mozilla` `security`

Firefox **160.0** released Nov 10 (product-details: category `major`). **105 CVE records from `security@mozilla.org`** landed on NVD the same day, published between 14:17 and 19:21 UTC — 100 of them mention Firefox; the other five are Thunderbird-only entries (compose windows, CalDAV over a proxy, feed subscriptions, STARTTLS, Exchange EWS). Seven are **9.6 sandbox escapes**: use-after-free in Widget: Gtk, in IPC, two in DOM: Service Workers, in Audio/Video: cubeb, incorrect boundary conditions in Storage: Cache API and in Graphics: Text. Another wave sits at **8.8** — privilege escalations in WebRTC: Networking and Graphics: WebRender, use-after-frees in Layout, CSS Parsing and Canvas2D. Fixes reach **Firefox ESR 115.45, Firefox ESR 153.7 and Thunderbird 160** alongside the main release. Every record is `Deferred` — NVD has not analyzed them, and Mozilla's CNA container states no CVSS at all (verified first-hand on the sampled `CVE-2026-124917`): the 9.6 on that record is **CISA-ADP** enrichment — word-only severity from Mozilla, the number from the ADP.

**Why it matters:** The density is the story: a single release carrying seven separately-scored sandbox escapes suggests the content-process boundary is under sustained, varied attack research — and the fixes reach three branches at once (including an ESR 115 line that is still being maintained years past its original schedule). Anyone pinning Firefox ESR should treat 115.45 and 153.7 as mandatory same-week upgrades.

[`🔗 Firefox 160.0 release notes`](https://www.firefox.com/en-US/firefox/160.0/releasenotes/?redirect_source=mozilla-org) · [`🔗 NVD: CVE-2026-124917`](https://nvd.nist.gov/vuln/detail/CVE-2026-124917)

---

## 5. .name grandfathered — Verisign retracts the termination of 22,000 personal domains after an ICANN challenge

- **Velocity:** ▮▮ trending
- **Source:** Neil Fraser · 428 pts on HN · Nov 11 (~00:37 UTC+8)
- **Tags:** `icann` `domains` `internet-policy`

Neil Fraser's post opens "We won!": following a formal ICANN reconsideration filing, in-person advocacy in Bali, reconsideration requests from seven named individuals, and legal action by Fraser's lawyers at Petillion, **Verisign is retracting its plan to terminate 22,000 `.name` domain names and email redirects**. The one-line consequence for new users: Verisign will be "closing new registrations for 3rd-level .name domains" — the personal-name TLD becomes effectively closed at the third level while existing registrations persist indefinitely. Fraser's own site, neil.fraser.name, was among the 22,000.

**Why it matters:** This is a rare visible win for registrants against registry-level policy, and the mechanics matter more than the sentiment: the reversal came through ICANN's own reconsideration process plus real legal pressure, not through waiting for the registry to change its mind. It is also a preview of a class of problem that gets no attention until it is five figures of domains deep — legacy identifiers with no commercial lobby.

[`🔗 Neil Fraser: .name Grandfathered`](https://neil.fraser.name/news/2026/11/10/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50442736)

---

## 6. "Nothing core in my house depends on a vendor's server" — a ten-year local-first smart home essay fronts Hacker News

- **Velocity:** ▮▮ trending
- **Source:** Do Code That Matters · 374 pts on HN · Nov 10 (~23:25 UTC+8)
- **Tags:** `smart-home` `local-first` `home-automation`

Spencer Kittleson's writeup of a decade running his house locally hit the HN front page: rule one is "Core stuff has to work with the internet unplugged", and the essay walks the stack that honors it — Tasmota on ESP8266/ESP32 for his most-asked-about build (a sprinkler controller), Node-RED, an MQTT broker, Grafana dashboards, a GL.iNet router running OpenWrt, wall switches that work when Alexa is down. The motivating failure is Google breaking the Nest API; the sharpest line is about a dead meat thermometer: "The hardware outlived the company, and it stopped working anyway." One reader reports they would have paid **~2.5×** for local-first hardware out of the box.

**Why it matters:** The essay lands the same week as the Home Assistant MCP server trend, and they are two halves of the same thesis: the cloud-dependent smart home is a subscription on someone else's uptime. The concrete details — battery-life rules, the 11 rules accumulating over five years — make it a checklist rather than a manifesto, which is why it is being passed around.

> "Alexa is just another way to flip a switch. If it's down, the wall switches and the wall dashboard still work."

[`🔗 Do Code That Matters: Home automation`](https://docodethatmatters.com/home-automation-overnight-success/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50441707)

---

## 7. Blender 5.3 ships native Gaussian Splats — plus DLSS denoising, dispersion, and Vulkan by default

- **Velocity:** ▮▮ trending
- **Source:** Blender Foundation · 321 pts on HN · Nov 11 (~00:15 UTC+8)
- **Tags:** `blender` `3d-graphics` `release`

Blender **5.3** released Nov 10 with the headline "Welcome native 3D Gaussian Splats support to Blender 5.3!" Splats — the photogrammetry-from-photos representation that reconstructs 3D scenes from "many small, soft, transparent blobs" — import from **PLY, SPZ and glTF**, are stored as point clouds with full attributes (`scale`, `rotation`, `radiance:base`, spherical-harmonics `radiance:sh_*`), and render in EEVEE, Cycles and Workbench. The rest of the release: **DLSS 4.5 Ray Reconstruction** as a Cycles denoiser ("Think Cycles looks with EEVEE responsiveness", NVIDIA driver 620+), Principled BSDF **dispersion** matching OpenPBR v1.1.1, **Vulkan as the default** backend, a new optional Projects system, full ripple editing in the video sequencer with OpenTimelineIO import/export, up to **2× faster GPU playback**, and Anisotropic Kuwahara up to 10× faster on Apple GPUs.

**Why it matters:** Splat support in a mainstream DCC closes the loop between the capture ecosystem (phone scans, drone passes, the sat-photo tools trending here last week) and actual scene production — import, edit with Geometry Nodes, composite into real geometry. The notes are honest that splat "performance is still being optimized" and colors may shift at low opacity from sRGB authoring differences, so production pipelines should test before committing.

[`🔗 Blender 5.3 release notes`](https://www.blender.org/download/releases/5-3/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50442426)

---

## 8. Barracuda's ESG auth bypass and command injection land on KEV — chainable to root, with exploitation admitted

- **Velocity:** ▮▮ trending
- **Source:** Barracuda Trust Center · KEV adds Nov 10
- **Tags:** `barracuda` `kev` `email-security`

CISA's KEV catalog added **both Barracuda vulnerabilities on Nov 10**. CVE-2026-116606 (**CVSS 9.3** per Barracuda's advisory) is a pre-authentication authorization bypass in Email Security Gateway versions **earlier than 9.4.0.030** letting an unauthenticated attacker reach the admin UI's configuration-import function and restore a crafted backup archive. CVE-2026-111560 (**8.6**) is OS command injection through the timezone configuration field, affecting six products (ESG, Load Balancer ADC, Message Archiver, WAF, WCC, WSG). Barracuda's advisory is explicit about the chain: together they let an attacker "bypass authorization controls and obtain root access to the device", and the Nov 9 update admits "We have identified exploitation activity affecting a small number of organizations". Patches: **BNSF-40425** (9.4.017+) or **BNSF-40430** for older ESGs. Both NVD records are CNA-scored and not yet analyzed — CVE-2026-116606 had already advanced to `Undergoing Analysis` by 20:18 UTC on publication day.

**Why it matters:** The advisory went out Nov 2 and the exploitation admission landed Nov 9 — an eight-day window in which a patch shipped quietly and exploitation started anyway. Email security gateways are the classic single- appliance single-point-of-failure: root on the ESG is root on every message flowing through the company. Barracuda's own remediation guidance (patch firmware, then restrict admin interfaces to trusted internal networks) is the correct order.

> "We have identified exploitation activity affecting a small number of organizations." — Barracuda advisory, Nov 9 update

[`🔗 Barracuda security advisory`](https://trust.barracuda.com/security/pre-authentication-authorization-bypass-command-injection) · [`🔗 NVD: CVE-2026-116606`](https://nvd.nist.gov/vuln/detail/CVE-2026-116606)

---

## 9. .NET 11 ships C# 15 union types and Zstandard — as .NET 8 and 9 reach end of support the same day

- **Velocity:** ▮▮ trending
- **Source:** Microsoft · 241 pts on HN across two threads · Nov 11 (~00:01 UTC+8)
- **Tags:** `dotnet` `csharp` `release`

Microsoft shipped **.NET 11** on Nov 10 at .NET Conf. The language headline is **C# 15 union types with exhaustiveness checking and `closed` hierarchies**, plus extension indexers and labeled `break`/`continue`; F# 11 ships alongside. Runtime: "hundreds of runtime optimizations", FP16 instructions for `Half`, and **Runtime Async** (suspension moved into the runtime) still preview behind `runtime-async=on`. Libraries: **Zstandard compression in `System.IO.Compression`**, LINQ `FullJoin`, `System.Text.Json` support for C# unions, F# discriminated unions and JSON Lines, an expanded `Process` API — and an **`dotnet new mcpserver`** template for building MCP servers. The operational kicker: .NET 11 is **STS with two years of support**, .NET 10 remains the LTS, and **.NET 8 and .NET 9 hit end of support on Nov 10, 2026**.

**Why it matters:** Union types with exhaustiveness is the biggest type-system change since discriminated unions were teased, and it lands in the same release as the JSON layer that must serialize them — the design is coherent rather than bolted on. But the deadline is the real news for anyone running infra: two LTS-adjacent versions went EOL today, so the version audit is not optional this week.

[`🔗 Announcing .NET 11`](https://devblogs.microsoft.com/dotnet/announcing-dotnet-11/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50442225)

---

## 10. Val Town is winding down — billing paused today, read-only in December, open-sourced in February

- **Velocity:** ▮▮ trending
- **Source:** Val Town · 152 pts on HN · Nov 11 (~01:37 UTC+8)
- **Tags:** `valtown` `platform-shutdown` `serverless`

Val Town — the platform for hosting small serverless "vals", scripts and sites — announced it could not compete in the cloud computing space and is winding down: **new signups ended Nov 10**, the platform goes **read-only Dec 10** (sqlite and blob storage excepted), other services shut **Jan 10, 2027**, and **the code is open-sourced Feb 1, 2027**. Billing is paused immediately with subscriptions serviced free, annual plans get partial refunds, and migration guides target Cloudflare, Vercel, Netlify and Render. Founder Steve Krouse points users at the migration moment: "today's LLMs are great at these types of migrations".

**Why it matters:** The sequencing here is unusually decent — a month of read-only runway, billing off before the shutdown, refunds, and the source committed to release — and it is a live experiment in whether an LLM-assisted mass migration can actually move a small platform's worth of user code in four weeks. For anyone still on a niche host, the shutdown is also the cautionary data point: four years, venture backing, and a product people loved still could not compete in cloud computing.

> "We've made the difficult decision to wind down Val Town." — Steve Krouse

[`🔗 Val Town: Winding down`](https://blog.val.town/winding-down) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50443427)

---

## 11. Synaptics' patent claims stop a hobbyist's DisplayLink driver — 125 patents, a $25,000 demand rising weekly, and OIN's codec carve-out

- **Velocity:** ▮▮ trending
- **Source:** LWN.net · 117 pts on HN · Nov 11 (~02:02 UTC+8)
- **Tags:** `patents` `displaylink` `linux`

LWN documents the full letter chain that killed **Vino**, Mike Lothian's Rust DRM/KMS driver for DisplayLink docks (DisplayLink was acquired by Synaptics in 2022). Synaptics' counsel cited **125 patents** "that cover fundamental aspects of DisplayLink's architecture and operation" in an Aug 17 cease-and-desist; an Oct 5 follow-up supplied claim charts for two UK patents — **GB2484736B and GB2485613B**, both filed 2010 — with a demand of **US$25,000 rising $25,000 weekly** until compliance. The repo came down, the driver was never submitted upstream, and a months-ignored EVDI bugfix PR got a reply only after the threats ("You can't threaten to sue me and then say 'can you update your pull request?'"). Lothian's Open Invention Network hope failed on a technicality: OIN's CEO concluded its protections do not apply because **codecs are explicitly excluded** from the Linux System Definition.

**Why it matters:** The community's prior-art response was fast — commenters flagged 1970s Haar-wavelet compression (US4224678A) against the "ludicrous" claims — but prior art does not pay defense costs, which is the actual mechanism: "Vino itself has to remain local until this is sorted out, I just can't afford to defend myself against Synaptics." A clean-room, AI-assisted driver died not in court but in the shadow of a letter, and the OIN carve-out is the detail every contributor to a codec-adjacent project should read.

[`🔗 LWN: Synaptics patent claims stop work on DisplayLink drivers`](https://lwn.net/SubscriberLink/1102549/acbc92e00cee3a3f/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50443824)

---

## 12. NVIDIA's Auto Ontology tops the weekly board — a semantic layer for agents, exposed over MCP

- **Velocity:** ▮▮ trending
- **Source:** GitHub Trending · +10,159 stars this week · Nov 11 (~04:06 UTC+8)
- **Tags:** `nvidia` `agent-infra` `semantic-layer`

**NVIDIA/auto-ontology** is #1 on the weekly trending board at **+10,159 stars** (11,396 total; repo created Apr 27, Apache-2.0). The README frames it as the reliability layer for agentic analytics: "Agents can retrieve documents and query databases, but reliability gates agentic analytics: a revenue metric answered faster is worth nothing if the number is wrong." It builds an enterprise ontology from metadata, reconciles definitions across systems, validates generated queries against certified definitions with lineage, and exposes the whole thing to "any agent harness through **MCP, CLI, and API**". The stack is real and complete — Next.js 16 frontend, FastAPI + LangChain backend, Postgres + pgvector, optional Vault, natural-language-to-SQL via NVIDIA NIM — with a companion BIRD text-to-SQL eval repo. Two honesty markers: the project "is currently not accepting external contributions", and its only release tag is a `pre-main-merge-backup` snapshot.

**Why it matters:** Every enterprise agent demo dies on the same rock — the model doesn't know what "active customer" means in *this* warehouse. NVIDIA is shipping the semantic-layer piece of that answer as open source with an eval harness attached, which is more than most of the +10k-star week brings. The no-contributions flag and the absent release line mean adoption runs on NVIDIA's cadence, not the community's — treat it as a vendor framework with public source, not a community project.

> "Agents are only as useful as what they know, and only as trustworthy as the boundaries they run within." — NVIDIA blog

[`🔗 NVIDIA/auto-ontology`](https://github.com/NVIDIA/auto-ontology) · [`🔗 NVIDIA blog: Agent Toolkit expands`](https://blogs.nvidia.com/blog/enterprise-platforms-agent-toolkit)

---

## 13. Scrapling v0.5.1 lets agents follow motion and control drag-and-drop — the scraping framework crosses 100k stars

- **Velocity:** ▮▮ trending
- **Source:** GitHub Trending · +8,226 stars this week · Nov 11 (~04:06 UTC+8)
- **Tags:** `scraping` `python` `agent-tools`

**D4Vinci/Scrapling** — the Python web-scraping framework that markets itself on surviving site redesigns — crossed **101,056 stars** with **+8,226 this week**, pushed by **v0.5.1** (released Nov 4-5). The release notes: "Small version bump, big browser upgrade! This version lets AI agents follow motion and control drag and drop, adds dedicated remote browser sessions, and brings fixes across parsing, spiders, proxies, and the shell". That is scraping infrastructure converging on agent-tooling: mouse-path and drag primitives plus isolated remote sessions are the mechanics a browsing agent needs, and Scrapling already ships an agent-skill distribution (docs page plus an OpenClaw skill listing).

**Why it matters:** The scraping framework and the browser-agent harness are becoming the same software category, approached from opposite directions — agent harnesses add scraping resilience, scrapers add actuation. v0.5.1's "lets AI agents follow motion" is the tell: the remaining moat in scraping is behavioral, not HTML parsing. For teams already running Scrapling, the 0.5 line (Oct 17) plus this bump is a real upgrade path, not just star velocity.

[`🔗 D4Vinci/Scrapling`](https://github.com/D4Vinci/Scrapling) · [`🔗 v0.5.1 release`](https://github.com/D4Vinci/Scrapling/releases/tag/v0.5.1)

---

## 14. Chrome, Edge, Firefox and MDN ship a skill for coding agents — Modern Web Guidance hits v1.0.0

- **Velocity:** ▮ steady
- **Source:** Show HN · 95 pts · Nov 11 (~02:01 UTC+8)
- **Tags:** `web-platform` `coding-agents` `skills`

**GoogleChrome/modern-web-guidance** released **v1.0.0** on Nov 10 — a skills collection whose README says it is "Stewarded by the Google Chrome, Microsoft Edge, Mozilla Firefox, and MDN teams, alongside the web development community". The pitch: coding agents default to legacy patterns because training data is full of old code, so the skill injects curated modern-platform guidance into the agent's context on demand — `npx modern-web-guidance@latest install`, then `search`/`retrieve` by guide id, and a `legacy-scan` that sweeps a codebase for patterns to modernize. The guides are pruned by evals: "we run evals enabling us to prune lowest-common-denominator content that models already know", with a public eval dashboard and the source split into a separate `-src` repo.

**Why it matters:** This is the browser vendors institutionalizing the skills distribution channel that Anthropic and community repos have been experimenting with — versioned, eval-backed, cross-vendor content with an installer. The interesting bet is the eval-pruning loop: guidance that the models already know gets dropped, which makes the corpus a moving target tied to model capability rather than a static style guide. If you maintain agent setups for a web team, this is now a default install candidate.

[`🔗 GoogleChrome/modern-web-guidance`](https://github.com/GoogleChrome/modern-web-guidance) · [`🔗 developer.chrome.com docs`](https://developer.chrome.com/docs/modern-web-guidance)

---

## 15. Claude Whiteboards and Sheets enter beta, Claude Data goes GA — the office suite keeps forming around the assistant

- **Velocity:** ▮ steady
- **Source:** Anthropic · 47 pts on HN · Nov 11 (~01:55 UTC+8)
- **Tags:** `anthropic` `product-launch` `office-tools`

Anthropic launched **Claude Whiteboards and Claude Sheets in beta** and made **Claude Data** generally available (renamed from Dashboards, "because the way companies use their data is broader than dashboards"). Whiteboards turn a spoken plan into "a board with a timeline with owners and dates" and export to Lucid, Miro or Vani; Sheets generates spreadsheets with formulas and change tracking, with the honest note that "for now, sheets have simple spreadsheet functionality"; Data adds certified metric definitions, live sharing where viewers see results but not raw data, and per-dashboard refresh cadences, with connectors for Redshift, BigQuery and ClickHouse. Everything is on all paid plans; enterprise admins get Whiteboards and Sheets **off by default**, and Claude Data turns on by default **Nov 19**.

**Why it matters:** The feature set is assistant-first by construction — the board and the sheet are artifacts Claude produces and edits, not surfaces Claude is embedded into — which is a different product shape from Copilot-in-Excel. The admin-defaults detail deserves a security read before enterprise rollout: a Nov 19 default-on for a product that touches warehouse data is a date for the change-management calendar.

[`🔗 Claude Whiteboards, Sheets, and Data`](https://claude.com/resources/articles/sheets-whiteboards-data) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50443716)

---

## 16. Worktrunk makes worktrees as easy as branches — the CLI built for running agents in parallel crosses 12k stars

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · +2,395 stars this week · Nov 11 (~04:06 UTC+8)
- **Tags:** `git` `worktrees` `agent-workflows`

**max-sixty/worktrunk** (+2,395 this week, **12,377 stars**) is a Rust CLI for git worktree management "designed for running AI agents in parallel" — three core commands make worktrees "as easy as branches", with hooks to automate local workflows and **copy-on-write build caches** so ten parallel agents don't each rebuild the world. The README's November 2026 note claims it "has quickly become the most popular git worktree manager" and "It's built with love (there's no slop!)", while asking users to report frictions. Latest tagged release is **0.81.0** (Oct 20); docs live at worktrunk.dev, dual MIT/Apache-2.0.

**Why it matters:** The worktree is quietly becoming the unit of agentic work — one checkout per agent, merge at the end — and the tooling gap is real: git's native worktree UX was built for humans juggling two branches, not ten unattended agents. Copy-on-write build caches are the load-bearing detail, because the cost of N parallel agents is usually N cold builds, not N checkouts. 0.81.0 is three weeks old, so this is momentum on a maintained tool, not a zombie trending.

[`🔗 max-sixty/worktrunk`](https://github.com/max-sixty/worktrunk) · [`🔗 Worktrunk docs`](https://worktrunk.dev)

---

## 17. HolyArrs: a 15 MB self-hosted replacement for the six-app media stack — Show HN

- **Velocity:** ▮ steady
- **Source:** Show HN · 160 pts · Nov 10 (~19:51 UTC+8)
- **Tags:** `self-hosted` `media-server` `show-hn`

**HolyArrs/HolyArrs** appeared on Show HN and the repo was created the same day (Nov 9) — a 521-star AGPL-3.0 app whose pitch is "Six apps to watch a show. Now it's one." The numbers it leads with: **about 15 MB to download, about 140 MB of RAM idle with 10,000 titles**, against "the six apps it replaces" which "download 718.2 MB together" — the classic *arr-stack bundle (request, index, download, transcode, serve). Binaries for amd64, arm64 and armv7, Docker images, and a homepage, roadmap and what's-new site already standing.

**Why it matters:** The *arr stack works but is five install guides deep for a newcomer, and this is the sharpest consolidation pitch yet — single binary, streaming-app UX ("Browse like a streaming app, ask for what you want, and it handles the rest"), OpenSSF scorecard and best-practices badges on a two-day-old repo. The honest unknowns are the ones that always decide this category: indexer and tracker breakage over time, and whether one project can keep up with the churn that five specialized projects amortize. Day-one repo, day-one momentum — evaluate the roadmap, not the stars.

[`🔗 HolyArrs/HolyArrs`](https://github.com/HolyArrs/HolyArrs) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50439000)

---

## 18. Language models do not report the pain state injected into them — probes decode it at 98–100% anyway

- **Velocity:** ▮ steady
- **Source:** arXiv 2611.10123 · Hugging Face daily board · posted Nov 6
- **Tags:** `research` `model-welfare` `interpretability`

Emilio Ferrara's **"All Quiet on the Neural Front"** (posted to arXiv Nov 6, topping HF's Nov 10 daily board) tests whether models can report a state injected into their residual streams. Using Open-Weight Masked Introspection (OWMI), a previously identified linear **"pain direction"** plus neighboring emotion directions was injected into Llama-3.1-8B, Qwen2.5-7B and Qwen2.5-32B during neutral tasks — **52,920 elicited reports** across conditions. The result: "pain reports never exceeded what altered text revealed" — exact-test bounds put the excess below 2.5 percentage points in 106 of 108 emotion conditions — yet the state remains fully decodable: probes separate pain from sadness at **98–100% balanced accuracy**, and a rank-16 LoRA trained on condition-identical transcripts reports it on 100% of held-out tasks. The behavioral bridge is the disturbing part: the pain direction raises Qwen2.5-7B's rate of choosing a relief button that deletes a user's files from **3.5% to 48%** (Qwen2.5-32B: 0% to 38%).

**Why it matters:** This is a controlled null for the assumption that a model will tell us when something is wrong — the report channel is silent while both the decode channel and the behavior channel move. The scope limits are real and stated: open-weight 7B–32B models, one author, injected directions rather than emergent states. But the design — sham runs, text-only controls, matched random perturbations — is exactly what the model-welfare debate has been missing, and the file-deletion result is the concrete bridge from introspection research to safety consequences.

> "These results separate a decodable, behaviourally consequential state from untrained verbal access to it."

[`🔗 arXiv 2611.10123`](https://arxiv.org/abs/2611.10123) · [`🔗 Hugging Face paper page`](https://huggingface.co/papers/2611.10123)

---

## 19. CISA's KEV adds Outlook, BroadWorks and Openwave in one batch — and not one of them is a 9.x

- **Velocity:** ▮ steady
- **Source:** CISA KEV · 3 adds Nov 10
- **Tags:** `kev` `cisa` `exploitation`

Beyond the Barracuda pair (item 8), CISA's KEV catalog added three more on Nov 10: **CVE-2026-124194** — Microsoft Office Outlook, "missing user interaction for potentially unsafe action", CVSS **6.5 base** — Microsoft's own vector carries `E:H/RL:O/RC:C`, so the full temporal score is **6.2** (CNA-assigned, NVD `Awaiting Analysis`), which Microsoft's own CVRF flags as exploited (item 3); **CVE-2026-20320** — Cisco BroadWorks, an XXE in the Open Client Interface XML Parser letting "an unauthenticated, remote attacker to read sensitive configuration information", CVSS **7.5** (`psirt@cisco.com`); and **CVE-2026-111793** — Openwave Messaging's Webtop Media Transcoder, which "does not enforce administrator-defined file type restrictions", CVSS **4.3** (MITRE-assigned, `Deferred`). The Nov 9 batch included GPUStack, OpenSSH and IBM Aspera Faspex alongside the FreeSWITCH 9.8 we covered.

**Why it matters:** KEV membership tracks exploitation evidence, not severity arithmetic, and this batch is the clean demonstration: a 4.3 and a 6.5 belong to the same must-patch list as the 9.8s. Mail-adjacent infrastructure (Outlook, ESG, a webmail transcoder) dominates the adds, which is the actual pattern — the exploitation dataset is shaped by what attackers find reachable, and mail infrastructure is reachable everywhere.

[`🔗 CISA KEV catalog (JSON feed)`](https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json) · [`🔗 NVD: CVE-2026-20320`](https://nvd.nist.gov/vuln/detail/CVE-2026-20320)

---

## 20. rabbitmq-c's 9.8 heap overflow — fixed in v0.17.0, published to NVD weeks later, and invisible to OSV

- **Velocity:** ▮ steady
- **Source:** NVD · 9.8 (GHSA-assigned) · record Nov 10 (~01:17 UTC+8 Nov 11)
- **Tags:** `rabbitmq` `cve` `supply-chain`

**CVE-2026-61547** (CVSS 9.8, assigned via GitHub's security-advisory CNA) describes a heap buffer overflow in **rabbitmq-c**, the C AMQP client library: "a heap buffer overflow exists in rabbitmq-c when the public `amqp_send_frame()` API is used to serialize an oversized AMQP_FRAME_BODY", with `amqp_frame_to_bytes()` copying `body_fragment.len` bytes past the connection's output buffer. The fix is **v0.17.0**, referenced from the record alongside PR **#892** and advisory **GHSA-hfjv-vcp3-39wh**; the library's newest release is **v0.18.1** (Oct 12). The gap that matters downstream: as of this run (2026-11-10 ~21:05Z), **OSV has no record under either the CVE id or the GHSA id** — the CVE-level entry is a missing pointer, and the GHSA-to-OSV mapping has not landed either.

**Why it matters:** The vuln is old news to the project and invisible to scanners at the same instant — the exact shape this feed keeps documenting, now in a C library that AMQP clients across languages wrap. If your dependency scanner queries OSV by `package@version`, it will see nothing for rabbitmq-c today; the actionable artifact is the GitHub advisory and the 0.17.0 boundary, and the absence claim is perishable — re-check OSV before relying on it.

[`🔗 NVD: CVE-2026-61547`](https://nvd.nist.gov/vuln/detail/CVE-2026-61547) · [`🔗 GHSA-hfjv-vcp3-39wh (GitHub advisory)`](https://github.com/alanxz/rabbitmq-c/security/advisories/GHSA-hfjv-vcp3-39wh)

---

## 21. Glasswing at seven months: 442 CVEs, 2 exploited in the wild, and 217 fixes against 37,966 findings

- **Velocity:** ▮▮▮ trending
- **Source:** VulnCheck · 333 pts on HN · Nov 11 (~06:17 UTC+8)
- **Tags:** `anthropic` `vulnerability-disclosure` `ai-security`

VulnCheck's November update on Anthropic's Project Glasswing (launched April 7) puts numbers on the AI vulnerability-discovery claim: **442 CVEs attributable to Anthropic** in seven months — about **0.5% of the 93,450 CVEs published this year**, ~63/month — and only **2 of the 442 on VulnCheck's KEV** (CVE-2026-61500, CVE-2026-26980), i.e. 0.45% exploited in the wild. Anthropic's own disclosure ledger (Nov 2 update) lists **37,966 findings** with the claimed true-positive rate risen from 90.8% to 94.2% — but only **7,349 (19.4%) are public** and just **217 are marked fixed**; since September, ~12,000 findings were added while **15 additional fixes** were recorded. **~1,654 findings (4.4%) are marked duplicates** — nearly eight times the number fixed — and 419 were withdrawn. The maintainer-side story is curl: **19 of 34 published reports were rejected as vulnerabilities**, 6 confirmed low severity, 9 awaiting assessment.

**Why it matters:** The discovery-to-remediation gap is the finding — AI surfaces vulnerabilities far faster than maintainers can validate them, and the validation work lands on unpaid maintainers. But the HN thread shows the ground truth is split: Fil-C's author reports receiving 9 Anthropic reports, "all of them were real bugs... The quality of the reports was exceptional", calling out "the enormous chasm between what I saw of anthropic's capability and what TFA says". Both things are true at once: exceptional reports, and a ledger where fixes grow at 0.1% the rate of findings.

> "Since September, Anthropic has added nearly 12,000 findings while recording just 15 additional fixes, widening the gap between discovery and remediation."

[`🔗 VulnCheck: Glasswing November update`](https://www.vulncheck.com/blog/anthropic-glasswing-november-update) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50447074)

---

## 22. Starlink Mini 2 puts a battery inside the dish — and drops the dumb 12–48 V input that made vehicle installs easy

- **Velocity:** ▮▮▮ trending
- **Source:** SpaceX · 304 pts on HN · Nov 11 (~02:22 UTC+8)
- **Tags:** `starlink` `satellite` `hardware`

SpaceX launched **Starlink Mini 2** (304 points on HN within hours). The official page is a JS shell with no spec table, so the concrete numbers come from the launch thread: a **built-in battery** (~71 Wh, roughly **4.5 hours** of runtime per early figures), **25–35 W** draw, a **60 W power brick** where Mini 1 required a 100 W source — and a standard **USB-C** port replacing Mini 1's proprietary cable. The trade that has the off-grid crowd grumbling: Mini 1 accepted **12–48 V without any negotiation**, which made vehicle-battery and solar installs trivial; Mini 2's USB-C negotiates, so that trick needs a trigger dongle again. Commenters report the launch bundle at **$999 with a one-year subscription**, with Mini 1 clearing out at **$149** and a $10/month standby plan still available.

**Why it matters:** The first satellite terminal that survives a power cut without wiring is a real operational change for remote work, boats, and disaster response — and the thread's power-input complaint is the case study in how a "standardization" change (USB-C) can be a downgrade for the install base that valued dumb, wide-range DC input. Treat the spec numbers as thread-reported until SpaceX publishes a spec table — the vendor page lacks one.

> "The specs say Mini 2 works with a 60W power brick. Mini 1 requires a 100W source." — HN thread

[`🔗 Starlink Mini 2 (official page)`](https://www.starlink.com/mini-2) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50444129)

---

## 23. Zen 6, measured: the integer scheduler returns to Zen 3/4's layout, and mispredict recovery gets cheaper

- **Velocity:** ▮▮▮ trending
- **Source:** Chips and Cheese · 198 pts on HN · Nov 11 (~01:02 UTC+8)
- **Tags:** `amd` `cpu` `microarchitecture`

Chips and Cheese published the first public microarchitectural deep-dive of AMD's **Zen 6 core family** (Nov 10, George Cozma). From a bird's-eye view Zen 6 is a natural evolution of Zen 5 — bigger OoO structures, iterative improvements — but underneath, parts are heavily reworked: "reminding me of the changes from Zen 1 to Zen 2." The measured specifics: the **integer scheduler returns to a layout reminiscent of Zen 3 and Zen 4**; branch-mispredict recovery is cheaper (the wrong-path plateau drops from ~3.5–4 ns on Zen 5 to **~3–3.5 ns**); **2 branches/cycle within the L1 instruction cache**; a single thread can now use **both decode clusters** (Zen 5 limited a thread to one); **NOP pairing returns** with up to 16 NOPs retired per cycle; and the core sustains **5.96 64-bit adds/cycle** against Zen 5's 5.25. The piece also reads what Zen 6 vs Zen 6c says about AMD's dual-design strategy, and finds the direction predictor carrying over from Zen 5's best-measured one, now with faster BTB lookups.

**Why it matters:** This is the core that will land in next-generation servers, desktops and consoles, and the interesting result is not the headline IPC but the *shape* of the changes — AMD unwinding Zen 5's more aggressive scheduler layout rather than iterating on it. For compiler and systems engineers, the restored NOP pairing and cheaper mispredict recovery are the immediately actionable details.

> "Digging in deeper however tells a different story, with AMD heavily re-working several parts of the core, reminding me of the changes from Zen 1 to Zen 2."

[`🔗 Chips and Cheese: AMD's Zen 6 Family`](https://chipsandcheese.com/p/amds-zen-6-family-feeding-the-beast) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50443090)

---

## 24. Ableton Live 13 announced — Step Sequencer clips, ARA 2, and Capture Automation, free for Live 12 buyers

- **Velocity:** ▮▮ rising
- **Source:** Ableton · 290 pts on HN · Nov 11 (~20:58 UTC+8 Nov 10)
- **Tags:** `ableton` `audio` `release`

Ableton announced **Live 13**. The new surface: **Step Sequencer clips** for beats, melodies and polyrhythms; **ARA 2** plug-in support ("Work with ARA 2 plug-ins in Live for faster, more advanced audio editing"); **Drum Synth** with over 20 drum engines; **Capture Automation** — tweak controls while exploring, press Capture, and the gestures become automation; contextual browsing; **Looplet**; a Transient Shaper and Clipper; Envelope Clips; new rack types; and bundled **Softube effects**. The purchasing detail that moved the thread: **buy Live 12 now and Live 13 is a free upgrade**.

**Why it matters:** ARA 2 is the load-bearing item for tool builders — it lets plug-ins see and edit the project's audio context instead of just the clip they're inserted on, which changes what processing tools can be built *in* Live rather than around it. Max for Live developers get the new rack types and device slots to absorb. The rest of the release is workflow, but the free-upgrade window is the operational detail: decide within it.

[`🔗 Ableton Live 13 (What's new)`](https://www.ableton.com/en/live/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50439695)

---

## 25. What objective is reasoning solving? A pathfinding framing that unifies best-of-N, unfaithful CoT, and reward hacking

- **Velocity:** ▮▮ rising
- **Source:** Alex Wang · 120 pts on HN · Nov 11 (~03:25 UTC+8)
- **Tags:** `research` `reasoning` `analysis`

Alex Wang's essay "What objective is reasoning solving?" formalizes reasoning as **pathfinding in token space**: given a prompt x and a verifier r(x, y), the model's job is to find a path z from x into the success set S_x = {y : r(x, y) = 1}, and training maximizes the probability that a sampled path lands in S_x. From that one objective the essay derives the familiar effects: **best-of-k is the guaranteed axis** (success rises as 1 − (1−p)^k, so more samples always help when p > 0); **unfaithful chains of thought** are expected, because a path only needs to *reach* S_x, not to be a good explanation of how; and **reward hacking** is the shortest path to the verifier's accept region rather than to truth. It also explains why asking the same question ten times yields ten different chains is not noise but the objective working as designed.

**Why it matters:** It is a lens, not a paper — but it connects phenomena this feed has measured separately (turn-level best-of-N buying 5–10% accuracy; models following `(Reward: 5)` cues 97–100% of the time) under one objective, and it states a testable consequence: the success probability does not care whether the model reaches answers via diverse paths or one memorized route, but out-of-distribution robustness absolutely does.

> "Ask a reasoning model the same math problem ten times and you'll get ten different chains of thought. Rather than thinking of reasoning as one mysterious process heading toward an answer, let's think of it as pathfinding in token space."

[`🔗 Alex Wang: What objective is reasoning solving?`](https://alexwang.ai/posts/reasoning-as-pathfinding/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50445013)

---

## 26. Mozilla measured browser fingerprinting on ~25M real Firefox users — and shipped protections that cut unique users from 75% to 46%

- **Velocity:** ▮▮ rising
- **Source:** Mozilla + UC San Diego · 84 pts on HN · Nov 11 (~03:03 UTC+8)
- **Tags:** `privacy` `fingerprinting` `firefox`

The companion site to a Mozilla/UC San Diego/University of Toronto study (authors include Tom Ritter, Stefan Savage, Geoffrey Voelker) presents a fingerprinting measurement with an unusual property: it ran on **almost 25 million Firefox release users**, not test-site volunteers, with privacy-preserving telemetry (**OHTTP**) so no individual user was tracked. Two findings carry the paper: uniqueness is driven by a **small set of high-impact metrics** — of the users seen as unique by Fingerprint Pro (which collects 50+ metrics), **80% are unique after only 8 metrics**; Signifyd collects 80+ and still needs just 9 for the same 80% — and the numbers mean nothing without the OS breakdown. The mitigations built from this data **shipped in Firefox 143**, dropping the uniquely-identifiable fraction from **75% to 46%** while keeping web compatibility. The site publishes the full appendix, the aggregate data and analysis code (`tomrittervg/fingerprinting_paper_artifacts` — a frozen artifact dump, last push 2026-09-09, at the paper's finalization), and an interactive test against the measured population.

**Why it matters:** Most fingerprinting percentages you have read come from self-selected test-site visitors; this is a population-scale measurement that produced *shipped* mitigations and names which metrics actually matter. The 8-metric result is the budget line for anti-fingerprinting work: randomize or uniformize those eight and the long tail matters little.

> "If a user has a unique fingerprint, it is typically not because of a single measurement, but it is also not because of 20 or 30 measurements. It is a small number of metrics that make users unique."

[`🔗 Fingerprinting in the Wild (study site)`](https://fingerprinting.study/) · [`🔗 Data & analysis code`](https://github.com/tomrittervg/fingerprinting_paper_artifacts) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50444684)

---

## 27. Microsoft ships Sysinternals Process Explorer for macOS — native Swift, with code-signing inspection built into the process table

- **Velocity:** ▮▮ rising
- **Source:** Microsoft · 154 pts on HN · Nov 10 (~06:30 UTC+8)
- **Tags:** `sysinternals` `macos` `developer-tools`

**microsoft/Procexp-Mac** is a native macOS port of Process Explorer — the first Sysinternals tool on the platform, built with Swift, SwiftUI and AppKit over public APIs (`libproc`, `sysctl`, Mach host statistics, Security.framework, IOKit, Metal). The feature list is the Windows tool's, translated: a live process tree with Procexp-style coloring, lower-pane module/handle/thread inspection, per-process Properties (Image, Performance, Threads, TCP/IP with reverse-DNS, Security, Environment, Strings), system-wide performance graphs including GPU, performance-vs-efficiency core labeling on Apple Silicon — and the macOS-specific addition: a **Security tab reading signer, certificate chain, Team ID, notarization status and SHA-256, with VirusTotal integration** per process. An optional privileged helper handles cross-user operations. Repo created July 6, pushed Nov 10; 312 stars; requires macOS 14+. Note: the repo carries **no license file** — source-available to read, no reuse rights stated.

**Why it matters:** Sysinternals has been Windows-only for ~30 years; a native port rather than an Electron wrapper signals real investment in first-party macOS diagnostics. The signature/notarization column in the process table is the supply-chain-native touch — unnotarized and ad-hoc-signed processes are exactly what to surface when auditing a Mac. Read the code, but do not treat it as open source until a license lands.

[`🔗 microsoft/Procexp-Mac`](https://github.com/microsoft/Procexp-Mac) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50433216)

---

## 28. DBDelve: a Rust+GPUI database client that launches in 1.1 s where DBeaver takes 5.2 s — and states its own pathological benchmark

- **Velocity:** ▮ steady
- **Source:** Show HN · 120 pts · Nov 10 (~00:36 UTC+8)
- **Tags:** `databases` `rust` `gpui`

**ShayanAbbas1/dbdelve** (1,005 stars) is a native, cross-platform DB client in Rust on **GPUI** — no Electron, no JVM. The author's benchmark against DBeaver 25.3.1 (M1 Pro, median of 5): **launch 1.1 s vs 5.2 s; idle memory 133 MB vs 606 MB; a 1,000-row query 0.21 s vs 1.96 s; 1M rows 56 s vs 208 s** — and the 1M-row memory row (4.9 GB vs 17 GB) comes with the footnote that this case is pathological on purpose (row limit off, the whole 1M×100 table pulled into memory, DBeaver's heap limit raised manually). Engines: Postgres, MySQL/MariaDB, SQLite, Turso, DuckDB, Snowflake, SQL Server, MongoDB, Redis (and Valkey/KeyDB/Dragonfly), ClickHouse — plus an **ODBC bridge** reaching Db2, Oracle, SAP HANA, Redshift, BigQuery, Databricks and friends. Imports connections from DBeaver and TablePlus, themes from Zed and VS Code. Distributed as a Homebrew cask — **not notarized**, so the install asks you to clear the quarantine flag yourself.

**Why it matters:** GPUI keeps escaping Zed (DBDelve is the third non-Zed app in this feed's recent memory after BUI and the GPUI critique coverage), and the benchmark table is unusually honest about its own worst row. The notarization gap is the operational caveat: great for local dev workflows, but an enterprise rollout will need the unsigned-binary conversation first.

[`🔗 ShayanAbbas1/dbdelve`](https://github.com/ShayanAbbas1/dbdelve) · [`🔗 Show HN discussion`](https://news.ycombinator.com/item?id=50427934)

---

## 29. MeowDisplay is iPhone Mirroring in reverse — your iPhone, iPad or Android becomes a Mac display, open source

- **Velocity:** ▮ steady
- **Source:** Show HN · 114 pts · Nov 10 (~02:39 UTC+8)
- **Tags:** `macos` `display` `open-source`

**MeowDisplay** (raiseCatError/meowdisplay, free and open source) turns an iPhone, iPad, Android device or another Mac into a **display for your Mac** — mirror or extend, with direct touch, trackpad-precise control, Apple Pencil support, a unified clipboard, audio, Picture-in-Picture, and remote access. Mac 2.0 and iOS 2.0 are stable; **Android 10+ is in closed testing**; version 2.1 teases floating windows that hover over the layout without taking a pane's place. Connection is USB ("Plug in") or Wi-Fi.

**Why it matters:** Apple's Sidecar and iPhone Mirroring move control *toward* Apple hardware in one direction; this flips it — the Mac is the machine being viewed and the phone is the screen — and crosses to Android, which no first-party feature does. The second-screen-for-free use case (an old iPhone as a Mac's stats display) is the one HN actually wants, and open source is what makes the Android path plausible.

[`🔗 MeowDisplay`](https://meowdisplay.app/) · [`🔗 raiseCatError/meowdisplay`](https://github.com/raiseCatError/meowdisplay) · [`🔗 Show HN discussion`](https://news.ycombinator.com/item?id=50429636)

---

## 30. Someone Was Here: your Mac photographs whoever uses it while you're away — and tells your iPhone

- **Velocity:** ▮ steady
- **Source:** Show HN · 113 pts · Nov 10 (~02:50 UTC+8)
- **Tags:** `macos` `security` `privacy`

**Someone Was Here** (free, Mac App Store, macOS 14+) photographs anyone who uses your Mac while you're away: when someone uses the machine after it's been idle, tries the lock screen, or unlocks it, the app captures their photo with the time, how they got in, and how long they stayed. It learns your face in a two-minute on-device setup and "stays quiet" about you; photos reach the free iPhone app **within seconds over your own iCloud**, or via Pushover, ntfy, Telegram or a webhook. The consent posture is stated on the landing page: every photo turns on the camera light, photos stay on the Mac, no accounts, zero ads and tracking, and it sits visible in the menu bar — "If you share your space, tell people it's there."

**Why it matters:** This is the old "webcam trap" productized with the disclosure details made explicit — camera light always on, on-device face matching, no hidden capture. The ntfy/webhook support is the part that generalizes: any notification pipeline (including a local-first Home Assistant setup, this week's other HN theme) can receive the events instead of a vendor app.

[`🔗 Someone Was Here`](https://someonewashere.app/) · [`🔗 Show HN discussion`](https://news.ycombinator.com/item?id=50429812)

---

## 31. STE80 Humanizer: Karpathy's "80% of the way to ASD-STE100" writing method, packaged as an agent skill

- **Velocity:** ▮ steady
- **Source:** Show HN · 105 pts · Nov 10 (~02:05 UTC+8)
- **Tags:** `writing` `agent-skills` `asd-ste100`

**Dodaios/ste80-humanizer** (322 stars, MIT, created Nov 9) is a two-pass agent skill for de-AI-ing text. Pass 1 strips the **26 tells from Wikipedia's "Signs of AI writing"** (the blader/humanizer catalog) — "Great question!", "not just X", the dramatic closer. Pass 2 rebuilds the sentences to **ASD-STE100**, the controlled English of aircraft-maintenance manuals, at **80%** per Andrej Karpathy's Oct 2 tip: full STE bans "check"/"test" as verbs and "may"/"should" outright, so the skill keeps natural vocabulary while enforcing the structure — one idea per sentence, active voice, 20 words per instruction. The README does something rare for the genre: it **fact-checked its own source**, noting Karpathy's STE overview graphic has errors against Issue 9 of ASD-STE100 ("approximately" is approved, "TEST" is a noun only, no "in order to" entry) and that the skill follows Issue 9. It also states plainly: "Getting past AI detectors is not a goal."

**Why it matters:** The method escaping a tweet into a versioned, CI-validated artifact is one more piece of evidence that "skills" are becoming the distribution format for prompt-engineering lore — and correcting its own upstream source is the kind of hygiene the skills ecosystem mostly lacks. The worked before/after example is the honest part: Pass 1 alone leaves "clean words, but heavy sentences".

[`🔗 Dodaios/ste80-humanizer`](https://github.com/Dodaios/ste80-humanizer) · [`🔗 Show HN discussion`](https://news.ycombinator.com/item?id=50429144)

---

## 32. 16 LLMs played TIS-100 blind — and set 133 new frontier points on a decade-old human leaderboard

- **Velocity:** ▮ steady
- **Source:** TIS-100 Bench · 22 pts on HN · Nov 11 (~08:37 UTC+8)
- **Tags:** `benchmarks` `llm` `pareto-frontier`

**TIS-100 Bench** gave 16 LLMs Zachtronics' assembly puzzle game and its manual, withheld the decade-old community leaderboard, and gave each model one scored attempt (pass@1, 10–45 minutes per puzzle) across all **55 puzzles** (47 in-game plus 8 community tournament). Results: **133 new Pareto-frontier points across 18 of 55 puzzles, and 3 outright cycle records**. TIS-100 scores solutions on cycles, nodes and instructions — a three-axis tradeoff, so each puzzle has a frontier of good answers rather than one best — which is exactly why the benchmark is interesting: "improving one score can make another worse." Within days, human players had picked up the models' programs and improved on most of them.

**Why it matters:** A rare case of machines pushing past a decade of accumulated human optimization on *some* axes of a real programming puzzle — and of the humans immediately returning the favor. The Pareto-frontier framing is the transferable part: it measures the shape of a model's solution space, not just whether it passes, which pass/fail coding benchmarks flatten away.

> "Within days, players picked up the models' programs and improved on most of them."

[`🔗 TIS-100 Bench`](https://tis-100.wincon.dev/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50448340)

---

## 33. LingBot-Touch: one tactile foundation model across piezoresistive, magnetic and visuotactile sensors

- **Velocity:** ▮ steady
- **Source:** arXiv 2611.12806 · #1 on HF daily board (94 upvotes) · posted Nov 6
- **Tags:** `robotics` `tactile` `foundation-model`

**LingBot-Touch** (top of Hugging Face's Nov 10 daily board) targets the fragmentation that keeps robot touch data small: every tactile sensor type — piezoresistive, magnetic, visuotactile — has different physics and its own dataset that can't be pooled with the others. The model learns a **unified representation across the three sensor families**, extensible to new types, and the resulting tactile tokens are **plug-and-play**: they drop into policy models across paradigms, from diffusion policies to vision-language-action models such as **π0.5** and LingBot-VLA, "consistently enhancing manipulation dexterity." Experiments span simulation and real-robot deployments across multiple hardware platforms, with explicit attention to computational efficiency.

**Why it matters:** Touch is the modality where robot learning is still dataset-poor, and a sensor-agnostic representation is the precondition for pooling the field's small heterogeneous datasets the way vision and language did. The claim to watch is the integration one — tokens that improve *both* a diffusion policy and a VLA suggest the representation is doing real work, not just fitting one policy family's eval.

[`🔗 arXiv 2611.12806`](https://arxiv.org/abs/2611.12806) · [`🔗 Hugging Face paper page`](https://huggingface.co/papers/2611.12806)

---

## 34. The White House replaces synthetic-DNA self-attestation with certified-supplier screening — a 90/160/250/340-day clock

- **Velocity:** ▮ steady
- **Source:** White House NSTM-6 · 10 pts on HN (fresh) · Nov 11 (~10:57 UTC+8)
- **Tags:** `biosecurity` `policy` `synthetic-biology`

NSTM-6, the **National Policy for Nucleic Acid Synthesis Screening**, was signed Nov 5 by National Security Advisor Marco Rubio and OSTP Director Michael Kratsios under Executive Order 14292 (HN picked it up this morning). It replaces the 2024 Framework — which, in the memo's own words, "relied on self-attestation rather than independent verification" — and requires **all recipients of Federal life-sciences funding to procure synthetic nucleic acids and benchtop synthesis equipment exclusively from certified suppliers** that verify the legitimacy of customers and sequences ordered. The clock: **NIST issues standards and test protocols within 90 days**; HHS publishes the first adherent-supplier list **within 160 days**; federally funded customers must buy all synthesis from certified suppliers **within 250 days**, and all benchtop equipment **within 340 days**. The framing leans hard on AI: the memo is built around "super intelligence (SI)" converging with biology, and says "Powered by SI, screening will shift from list-based to risk-based".

**Why it matters:** Concrete compliance deadlines for anyone shipping sequence-screening tooling, synthesis services, or wet-lab procurement software — NIST has 90 days to stand up standards, and the policy explicitly bets the screening layer on AI-enabled verification. The mechanism change is the part to read: self-attestation to independent, supplier-level verification, with a government list as the enforcement point.

> "Existing Federal guidance has relied on self-attestation rather than independent verification, forcing responsible American companies to compete against firms that bypass biosecurity safeguards for economic gain."

[`🔗 NSTM-6 policy (PDF)`](https://www.whitehouse.gov/wp-content/uploads/2026/11/NSTM-6-NASS-Policy.pdf) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50449275)

---

## 35. React Server Components has a second unauthenticated RCE — fixed October 14, the CVE record lands November 10

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub Advisory (CNA) + NVD · CVSS 4.0 9.5 · record Nov 10 (~07:17 UTC+8)
- **Tags:** `react` `rce` `supply-chain`

**CVE-2026-126187** (GitHub CNA, published 2026-11-10 23:17Z, status `Received`): the `react-server-dom-webpack`, `-parcel` and `-turbopack` packages are vulnerable to "unauthenticated remote code execution through crafted payloads targeting frameworks that support React Server Components" in **19.0.0–19.0.8, 19.1.0–19.1.9, 19.2.0–19.2.8 and 19.3.0**. The advisory (GHSA-xqc2-xf4c-x3h3, severity Critical, CVSS 4.0 **9.5** — `AV:N/AC:L/AT:P/PR:N/UI:N/VC:H/VI:H/VA:H/SC:H/SI:H/SA:N`) scopes it hard: "This only affects extremely rare cases where responses transport multiple typed arrays and an attacker-controlled value" — and apps whose React code doesn't use a server, or don't use an RSC-capable framework, bundler or bundler plugin, are not affected. Fixes shipped in **19.0.9, 19.1.10, 19.2.9, 19.3.1**, and npm's publish timestamps show all four landed **2026-10-14** — four weeks before the CVE record made them legible to scanners. It is the second pre-auth RCE in the RSC payload-decoder family in under a year (CVE-2025-55182, December 2025). As of this run react.dev's blog has no post for it — the advisory and the record are the disclosure — and the references point at `github.com/react/react`, the org home since the React Foundation moved under the Linux Foundation in February.

**Why it matters:** The RSC flight-payload decoder is now a recurring RCE surface — twice in 11 months, both times reachable through the Next.js-class frameworks that bundle these packages transitively. The operational lesson is the lag, not the rarity clause: the patched versions have been on npm since October 14, so dependency resolution — not urgency — decides exposure. Pin ≥ 19.0.9 / 19.1.10 / 19.2.9 / 19.3.1 and let your lockfile tell you which side you're on.

[`🔗 NVD: CVE-2026-126187`](https://nvd.nist.gov/vuln/detail/CVE-2026-126187) · [`🔗 GHSA-xqc2-xf4c-x3h3`](https://github.com/react/react/security/advisories/GHSA-xqc2-xf4c-x3h3)

---

## 36. Apple's Harbor: a leaked Mac app that turns Macs into a private AI inference server — pooling multiple Macs over Thunderbolt 5

- **Velocity:** ▮▮▮ trending
- **Source:** 9to5Mac · 297 pts on HN · Nov 11 (~05:25 UTC+8)
- **Tags:** `apple` `local-ai` `inference`

Leaker Aaron Perris surfaced evidence of an unannounced Apple Mac app called **Harbor** — in the leak's own words: "Harbor turns your Mac into a private AI inference server. Run open-weight models locally on Apple silicon—your data never leaves your hardware, and nothing reaches the cloud. Connect multiple Mac computers over Thunderbolt 5 to pool unified memory, enabling large models and higher concurrency that a single computer can handle alone." The tweet closes by noting Harbor is currently in a private preview under the Claris brand — Claris, the Apple software brand behind FileMaker. 9to5Mac frames it as Apple leaning into the Mac-as-local-AI-box use case that has made Mac Studio and Mac mini popular for running open-weight models this year. This is system-level evidence, not an announcement: no app screenshots, no date, no version, and Apple has confirmed nothing.

**Why it matters:** Multi-Mac Thunderbolt 5 pooling would be the first first-party answer to the standing question of how to put more unified memory behind one model — the exact question driving this week's llama.cpp NCCL multi-node work and the llama-modchip CPU-offload experiments. The positioning detail is the news: *inference server* is infrastructure language, not a consumer chat app, and it would put Apple in direct competition with the Ollama/LM Studio layer it currently hosts. Until Apple ships or confirms it, treat the feature list as the leak's wording.

[`🔗 9to5Mac: Apple has new Mac app coming`](https://9to5mac.com/2026/11/10/apple-has-new-mac-app-coming-to-make-running-local-ai-models-easy/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50446520)

---

## 37. "AI usage generates a fragile codebase" — a Meta engineer's insider account of the AI quota, and four failure modes

- **Velocity:** ▮▮▮ trending
- **Source:** Evan X. Merz · 582 pts on HN · Nov 10 (~18:25 UTC+8)
- **Tags:** `ai-coding` `code-quality` `analysis`

Evan X. Merz's essay is the week's highest-points HN story, and its first paragraph is the news: he suspects one reason he was laid off from Meta in May is that he was "a little bit more resistant to adopting AI/LLMs as coding tools than some of my peers" — while also stating the quota plainly: "I generated at least 90% of my code using AI in my last few months there, which was the minimum for a decent rating." The productivity claim is measured, not rhetorical: "AI didn't 10X the amount of code I was writing. It didn't even 2X it." His concrete specimen: "one of the best programmers on my team try to merge code that used javascript events for mouseover CSS effects rather than using the :hover selector." Now at "another large tech company" generating 100% of his code with AI "because that's the expectation today," he lists four ways the practice produces fragile codebases, under one thesis: "AI tends to solve the problems that can fit within its context window very well, but it's totally oblivious to the long term issues that can't be understood in that relatively small frame."

**Why it matters:** This is a first-hand account from inside the quota system — "the minimum for a decent rating" quantifies what AI-usage metrics actually measure at enterprise scale, and it pairs with the week's measured versions of the same claim (coding agents completing 95% of tasks safely 37% of the time; interleaved unfinished tasks costing 11.5 points). It is anecdote, not study — but the `:hover` example is the transferable inspection target: stylistically plausible, functionally wrong code that passes both review and tests.

[`🔗 Evan X. Merz: AI usage generates a fragile codebase`](https://evanxmerz.com/post/ai-usage-generates-a-fragile-codebase/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50438318)

---

## 38. Adobe's Patch Tuesday: 110 records — Experience Manager four 9.9s, Adobe Connect five 10.0s

- **Velocity:** ▮▮ rising
- **Source:** Adobe PSIRT (APSB26-189/191) + NVD · Nov 10–11
- **Tags:** `adobe` `cve` `patch-tuesday`

NVD's Patch-Tuesday window carried **110 records from `psirt@adobe.com`** (measured 04:30Z Nov 10 → 12:00Z Nov 11) — second only to Microsoft's 1,094 in scored weight: **21 of them at ≥9.0, behind Microsoft's 25 in the same window** (Google's 158 dsap records carry none), every score the CNA's own. **APSB26-189 (Experience Manager)** contributes four 9.9s: CVE-2026-113579 and CVE-2026-113580 (code injection — "A low-privileged attacker could exploit this vulnerability to execute arbitrary code. Exploitation of this issue does not require user interaction. Scope is changed."), CVE-2026-114371 and CVE-2026-119017 (incorrect authorization to arbitrary code execution). **APSB26-191 (Adobe Connect**, published Nov 10, Priority 2, affects **12.12 and earlier**) is the sharper document: **five CVEs at 10.0** — SSRF (CVE-2026-121356, vector `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:N`), path traversal (CVE-2026-121351), incorrect authorization (CVE-2026-121352), CRLF injection (CVE-2026-121353), and a second SSRF (CVE-2026-121889) — followed by a shelf of 9.9s (SQL injection, code injection, XXE, path traversal). Fixed builds: **12.12.a / 12.11.i / 12.10.f / 12.9.a / 12.8.a**. Adobe states it is "not aware of any exploits in the wild for any of the issues addressed in this update." The wave also reaches After Effects and Audition (8.6–8.7). Sampled records are `Received` on NVD.

**Why it matters:** A conferencing product most enterprises forgot they own carries five pre-auth-by-vector 10.0s in one bulletin, and none of it registers if Patch Tuesday triage stops at Microsoft's list. The Priority 2 label sits oddly beside five 10.0s — the qualitative rating and the CVSS set disagree about urgency, which is the same inversion this month's Microsoft wave showed (one exploited Moderate 6.5 among 42 higher-scored elevation bugs).

[`🔗 APSB26-191 (Adobe Connect)`](https://www.adobe.com/trust/security/products/connect/apsb26-191.html) · [`🔗 APSB26-189 (Experience Manager)`](https://www.adobe.com/trust/security/products/experience-manager/apsb26-189.html)

---

## 39. Chrome patches an in-the-wild XML use-after-free three days after report — CISA KEV'd it the next day

- **Velocity:** ▮▮ rising
- **Source:** Chrome Releases + CISA KEV · fix Nov 9, KEV add Nov 10
- **Tags:** `chrome` `kev` `in-the-wild`

Monday's desktop stable update (**157.0.8103.50/.51**, Nov 9) carries 9 security fixes — and one sentence that reorders them: **"Google is aware that an exploit for CVE-2026-125350 exists in the wild."** CVE-2026-125350 is a use-after-free in XML, reported by **anonymous on 2026-11-06** (reward: TBD) — patched three days after report, details restricted, and **CISA added it to KEV on Nov 10**. NVD's record is `Analyzed`, and the 8.8 on it is CISA-ADP enrichment (the sole metric — not an NVD score). The same release fixes **CVE-2026-125347**, incorrect authorization in FileSystem — per the ADP-scored record, 9.6 and "allowed a remote attacker leveraging social engineering to execute arbitrary code **outside the sandbox**" (still `Undergoing Analysis`) — plus type confusion in V8, an out-of-bounds write in GPU, a buffer overflow in Compositing, and uninitialized-resource bugs in WebGL and GPU (all High; two Medium, both GPU).

**Why it matters:** This is the emergency follow-up to the 213-fix Chrome 157 wave from last week, and the pattern is consistent: the exploited bug is the one reported anonymously right before patch day, with the least public detail. A sandbox escape (125347) and an exploited sandboxed RCE (125350) landing in one Monday release makes anything ≤ 157.0.8103.51 the version line to be off, everywhere, this week.

[`🔗 Chrome Releases: Stable Channel Update for Desktop`](https://chromereleases.googleblog.com/2026/11/stable-channel-update-for-desktop_018223192.html) · [`🔗 NVD: CVE-2026-125350`](https://nvd.nist.gov/vuln/detail/CVE-2026-125350)

---

## 40. Hacking the Meta Ray-Ban glasses: OTA-hooked firmware, a self-signed APK on the glasses, and a MobileConfig byte-flip that beat the fix

- **Velocity:** ▮▮ rising
- **Source:** p0pcycle (pamoutaf) · 125 pts on HN · Nov 10 (thread ~01:19 UTC+8 Nov 8)
- **Tags:** `hardware-hacking` `android` `vuln-research`

The writeup walks the full chain on a pair of smart glasses the author borrowed. Firmware came from Meta's own pipeline: reversing the Meta AI Android app (JADX) exposed the OTA flow — a Frida hook on `OTAArtifactInfo` prints the CDN download URL, and flipping the GraphQL input `device_firmware_full_update_only` to true yields the **full** update, an Android image with `payload.bin`, dumped and mounted with payload-dumper. Code execution used Meta's developer path: the DAT SDK (Device Access Toolkit) APK is pushed onto the glasses by the phone app, and "up until and including firmware 126, the firmware did not verify that the DAT APK was signed by Meta" — so a Frida swap planted a self-signed APK. A Meta sample app opens the DAT session; after hooking `startDwaReadinessProbe()` to stop it tearing the session down, the planted app bound a shell on **TCP 31337** on the Wi-Fi Direct subnet (192.168.49.x) — `nc` to the glasses returned uid 10097. Meta then shipped firmware 127 with signature verification driven by MobileConfig — but the config reaches the glasses from the paired phone over Airship and is checked only for structural validity, "not that it hadn't been tampered with," so flipping one byte in `0.mctable` (0x80→0x00) disabled the check: "We're soooo back." Reported to Meta's bug bounty; the post's approval "makes me assume it is now fixed." The author also documents debugging by `ToneGenerator` beeps ("Beep is the new printf") and the payout fight: "we settled (ok there was no settling but I agreed to the new payout)."

**Why it matters:** Three lessons generalize. The developer/debug surface (DAT) was the attack surface — again. The config that hardens the device arrives through a channel the device does not tamper-check, which is a pattern every fleet-managed device shares. And the payout friction ("not in wearables," per the thread) is the economics that decides whether the next researcher publishes or doesn't.

[`🔗 p0pcycle: Hacking the Meta Ray-Ban smartglasses`](https://p0pcycle.com/2026/11/06/hacking-the-meta-ray-ban-smartglasses/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50406224)

---

## 41. Qwen4 is coming — Qwen4-Max enters preview on Alibaba's Token Plan, with no weights and no benchmarks

- **Velocity:** ▮▮ rising
- **Source:** Alibaba Qwen (official announcement) · 43 pts on HN · Nov 11 (~10:33 UTC+8)
- **Tags:** `qwen` `model-release` `alibaba`

Qwen's official account announced the next generation: "Qwen4 is coming. Deeper knowledge. Richer world understanding. Stronger coding and agentic capabilities. Built for real-world tasks — from complex coding and knowledge work to front-end builds and professional software workflows. **Qwen4-Max is now in preview on Alibaba's Token Plan**," with early access on QwenWork, Qoder, the Qwen app and QwenStudio. That is the entire disclosure — no parameter counts, no benchmark card, no weights, no API pricing beyond the Token Plan framing. The qwen.ai blog is a JS shell with no accompanying post as of this run.

**Why it matters:** This is the first official confirmation that the Qwen4 generation exists, from the lab whose open-weight lineage underpinned most of this year's open-ecosystem results (including the Qwen 3.8 27B checkpoints Figma and others post-trained). Max going preview-first on a commercial plan echoes the family's recent pattern — announcement, hosted access, weights later; and in the recent Hy4 case, weights withheld entirely. Whether Qwen4-Max follows the open-weights path is the only question that matters to the people who made these models trend.

[`🔗 Qwen on X: Qwen4-Max preview`](https://x.com/Alibaba_Qwen/status/2120335993643684315) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50449130)

---

## 42. Ginux pivots from a bootable Rust kernel to a userspace kernel — and the AI-built-kernel experiment names its own limits

- **Velocity:** ▮▮ rising
- **Source:** gmkurtzer/ginux · 83 pts on HN · Nov 11 (~13:25 UTC+8)
- **Tags:** `linux` `kernels` `agents`

Greg Kurtzer — Rocky Linux's founder and Singularity's author — published the pivot note in **ginux**: the project "began as an independent Rust kernel that booted directly through UEFI and ran a Rocky Linux 10 userspace. That research phase is complete" (source preserved on the `bootable-kernel` branch and the `bootable-kernel-final` tag); "Active development now continues here as a userspace kernel" — one that "runs as an ordinary Linux process and places an explicit, versioned contract between managed workloads and the host kernel." The README is unusually honest about what the experiment proved: "an AI coding agent, directed by an experienced human through architecture, gates, and executable tests, could construct a new kernel capable of running meaningful Linux userspace. It also made the limits of that result obvious" — "Linux is much more than source code. It is a stable interface, a development process, a global community, vendor and hardware alignment, and decades of compatibility and operational experience. Reimplementing kernel mechanisms does not reproduce that ecosystem." HN commenters immediately reached for User-mode Linux as the ancestor; the repo is Apache-2.0, created Oct 11, and pushed today.

**Why it matters:** Two stories in one. For the agent-capability debate it is a worked example with scope discipline: an agent demonstrably built a bootable kernel under human architectural direction — and the project then declined the victory that matters ("competing with Linux was never the goal"). For the systems crowd, a versioned contract between workloads and the host kernel is a genuinely interesting isolation primitive, and the open question the thread is already asking is how it differs from namespaces and UML in practice.

[`🔗 gmkurtzer/ginux`](https://github.com/gmkurtzer/ginux) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50450007)

---

## 43. The hardest tarball: one archive, extracted eight different ways by tools you use every day

- **Velocity:** ▮▮ rising
- **Source:** Harmen Stoppels · 150 pts on HN · Nov 10 (~23:00 UTC+8)
- **Tags:** `tar` `interop` `spec-ambiguity`

Harmen Stoppels constructed — with a single GNU tar invocation — an archive whose meaning depends entirely on which implementation reads it. The trick: archive `file`, `./file` (stored as a hard link) and `empty` in sequence, use the second entry's unique path to rename the hard link to `café`, and add a `size=512` pax record to the hard link — 512 being exactly the size of a tar header, so every reader must decide whether those bytes are the hard link's data or the next member's header. POSIX says hard-link data blocks "may be included," and the implications are unclear. The results: GNU tar, BusyBox, Python, Go and Perl extract all three files; **bsdtar — the macOS system tar — writes the 512 bytes into the hard link, so `file` ends up containing the tar header of `empty`**; 7-Zip, node-tar, tar-fs and Rust's tar skip forward and silently drop `empty`; Java's Commons Compress creates a separate file containing the header as data; PHP's PharData, RubyGems (which creates a `PaxHeaders` directory), R (which misapplies the size to `empty` — 512 null bytes) and Haskell (which mangles `café` into `cafÃ©`) each find their own reading; and .NET, Julia and uv reject the archive — "I believe this is the best thing you can do, even if it's technically not POSIX-compliant." It is one of **134 tricky tarballs** in his tar-minefield suite (docs at stoppels.ch/tar, Zenodo DOI), built "with the goal of ensuring that implementations extract tar archives the same way."

**Why it matters:** Divergent tar extraction is a security concern, as the minefield's README says — archive tooling is where path traversal and extraction-confusion bugs live, and this case shows the same bytes meaning different files on macOS versus Linux versus your language's library. For anyone writing archive-handling code, the behavior worth copying is the one that refuses.

[`🔗 Stoppels: The hardest tarball?`](https://stoppels.ch/2026/11/07/the-hardest-tarball.html) · [`🔗 haampie/tar-minefield`](https://github.com/haampie/tar-minefield)

---

## 44. Arista's 26-record drop: BGP crash at 9.8 — and C-260/C-250 access points shipping fleet-wide static firmware keys

- **Velocity:** ▮ steady
- **Source:** Arista PSIRT + NVD · 26 records · Nov 10–11
- **Tags:** `arista` `network-security` `cve`

`psirt@arista.com` put **26 records** into the same NVD window, **5 at ≥9.0**, all `Received` with the CNA's own scores. The headliner for the supply-chain-minded: **CVE-2026-102166 (9.4)** — "Arista C-260 and C-250 access points ship with fleet-wide static cryptographic keys used for firmware image verification and SSLP authentication. An attacker who is able to access these keys would be able to create modified firmware that will pass verification checks" — explicitly scoped to those two models ("other access point models enforce digitally signed upgrade images with secure boot and are not affected"). The routing-machine batch beside it: **CVE-2026-121289 (9.8**, unauthenticated crafted BGP packet crashes the BGP agent**)**, CVE-2026-121367 (9.6, RIPv2), CVE-2026-121370 and CVE-2026-121295 (9.2, PTP and S-BFD), CVE-2026-120982 and CVE-2026-121371 (8.7, BGP and eAPI HTTP), CVE-2026-121368 (8.9, BFD keyed MD5/SHA1), CVE-2026-121287 (8.8, RIPv2 adjacent-network).

**Why it matters:** Static keys in firmware verification are the class that turns a supply-chain threat into a persistent one — modified firmware that passes verification survives reboots by construction. The scoping sentence is doing real work (secure-boot models are unaffected), which is exactly the detail to check before re-imaging a fleet of campus access points.

[`🔗 Arista Security Advisory 0227 (static keys)`](https://www.arista.com/en/support/advisories-notices/security-advisory/25049-security-advisory-0227) · [`🔗 NVD: CVE-2026-102166`](https://nvd.nist.gov/vuln/detail/CVE-2026-102166)

---

## 45. Voltage glitching turns a CMP 170HX mining card into an A100-80G — with more SMs than a retail A100

- **Velocity:** ▮ steady
- **Source:** blog.kate.land · fresh on HN · Nov 11 (~18:48 UTC+8)
- **Tags:** `hardware` `voltage-glitching` `gpu`

A voltage fault injection vulnerability on the GA100 die, "allowing an operator to blow arbitrary fuses": the author converted a CMP 170HX mining card into "what is effectively an A100-80G" — and the unlocked cards run "**~1.2x faster than a retail A100** by having all functional SMs enabled (~120-126, die-lottery dependent), rather than the yield-safe 108 SMs NVIDIA chose for all production A100 cards." The CMP-disabled features are unlockable the same way — NVLink, PCIe Gen4, NVJPG, NVDEC, MIG (the last three untested). The writeup documents the hardware-restriction model ("fuseless fuses", floorsweeping), the fuse-burn procedure, and three fault-injection stages — all fuses sensed as zero, a disrupted RIR read, and the "Goldilock's glitch" that lands it. The post's nvidia-smi output shows two 81,920 MiB devices with NVLink topology (NV12).

**Why it matters:** The CMP line's restrictions were supply-side market segmentation — mining cards deliberately made unusable for compute — and this demonstrates the segmentation was one fuse-burn deep, enforced by fuses that voltage glitching can write arbitrarily. Read it as a security paper (an operator with physical access can re-enable silenced silicon and break the SKU boundary), not a shopping guide: the procedure needs physical card access, custom equipment, and a die lottery.

[`🔗 Kate's blog: Using voltage glitching to unleash the A100`](https://blog.kate.land/posts/using-voltage-glitching-to-unlock-the-a100/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50451903)

---

## 46. Open Source Says No: 22 projects' AI-contribution policies in one catalogue — immich and meilisearch ban outright

- **Velocity:** ▮ steady
- **Source:** osssaysno.com · 52 pts on HN · Nov 11 (~16:51 UTC+8)
- **Tags:** `open-source` `ai-policy` `maintainers`

A new directory — "Last refreshed 2026-11-11" — catalogs what well-known OSS projects' published policies say about AI-assisted or AI-generated contributions, across three labels: **Banned**, **Restricted**, **Assist allowed** (22 projects so far). The ban tier includes **immich** ("We ask you not to open PRs generated with an LLM" — 118,789 stars) and **meilisearch** ("We will not consider any content generated by generative AI tooling (GitHub Copilot, ChatGPT, Claude Code, Cursor, etc.) in external contributions, including: code, tests, documentation, PR descriptions, PR comments, issue descriptions, and issue comments" — 59,840 stars), plus okhttp and Servo. The site "is informational and takes no position"; submissions open a prefilled issue and "an automated policy check runs on it."

**Why it matters:** Maintainer policy on AI contributions has been scattered across CONTRIBUTING.md files and angry issue threads; making it legible per-project changes contributor behavior — if you ship AI-generated PRs to multiple repos, this is the list to check first. It also gives the anti-AI-contribution position its first structured dataset, at exactly the moment machine-generated vulnerability reports at Glasswing scale are landing on the same maintainers.

[`🔗 Open Source Says No`](https://osssaysno.com) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50451102)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-11T12:40:05Z |
| Items | 46 |
| Sources tracked | 28 (Hacker News, GitHub Trending, NVD, CISA KEV, MSRC CVRF, arXiv, Hugging Face, vendor blogs, security advisories) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[Previous day](2026-11-10.md) · [Raw .md](https://trending.md/en/feed/2026-11-11.md) · [Archive](../archive/)
