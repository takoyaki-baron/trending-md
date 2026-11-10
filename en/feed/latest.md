---
date: 2026-11-11
updated: 2026-11-10T21:17:04Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 22
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

Nov 10 was Patch Tuesday, and the NVD publication window for the day carried **1,692 records** — **1,094 of them from `secure@microsoft.com`**, beside Mozilla's 105 and Intel's 103. Microsoft's own CVRF document (28.1 MB) holds **1,342 vulnerabilities**, of which **1,095 are Microsoft-assigned** — Chrome's CVE admin assigned 165, Linux 41, GitHub_M 5. First-hand over the document's score sets: **48 vulnerabilities carry a base score of 9.0 or higher** (max 10.0), while Microsoft's own severity labels read **68 Critical, 1,117 Important, 110 Moderate, 47 Low**. The top of the score table: SharePoint incorrect authorization **9.9** (CVE-2026-120002), Azure DevOps improper authentication **9.9** leading to code execution over a network (CVE-2026-109467), **Azure OpenAI missing authentication for critical function 9.8** (CVE-2026-119990), Windows Kerberos authentication bypass 9.8 (CVE-2026-85844), LDAP out-of-bounds write 9.8, DNS double-free 9.8. All the records are still `Awaiting Analysis` on NVD — every number quoted here is the CNA's own.

**Why it matters:** The exploit flag inverted the severity logic. Exactly one entry in the whole document reads `Publicly Disclosed:No;Exploited:Yes;Latest Software Release:Exploitation Detected` — **CVE-2026-124194, an Outlook spoofing bug rated Moderate 6.5** — and CISA put it on KEV the same day. Meanwhile 42 higher-scored elevation-of-privilege bugs sit at "Exploitation More Likely" and the 9.x queue at "Less Likely". Patch priority that follows the exploitation column, not the score column, is the whole lesson of the month.

> CVRF exploit status for CVE-2026-124194: Publicly Disclosed — No · Exploited — Yes · Latest Software Release — Exploitation Detected

[`🔗 MSRC CVRF 2026-Nov (machine-readable)`](https://api.msrc.microsoft.com/cvrf/v3.0/document/2026-Nov) · [`🔗 NVD: CVE-2026-119990 (Azure OpenAI)`](https://nvd.nist.gov/vuln/detail/CVE-2026-119990) · [`🔗 CISA KEV: CVE-2026-124194`](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)

---

## 4. Firefox 160's release wave puts 100 CVE records on NVD the same day — seven of them sandbox escapes at 9.6

- **Velocity:** ▮▮ trending
- **Source:** Mozilla · 105 NVD records · Nov 10 (~22:17 UTC+8)
- **Tags:** `firefox` `mozilla` `security`

Firefox **160.0** released Nov 10 (product-details: category `major`). **105 CVE records from `security@mozilla.org`** landed on NVD the same day, published between 14:17 and 19:21 UTC — 100 of them mention Firefox; the other five are Thunderbird-only entries (compose windows, CalDAV over a proxy, feed subscriptions, STARTTLS, Exchange EWS). Seven are **9.6 sandbox escapes**: use-after-free in Widget: Gtk, in IPC, two in DOM: Service Workers, in Audio/Video: cubeb, incorrect boundary conditions in Storage: Cache API and in Graphics: Text. Another wave sits at **8.8** — privilege escalations in WebRTC: Networking and Graphics: WebRender, use-after-frees in Layout, CSS Parsing and Canvas2D. Fixes reach **Firefox ESR 115.45, Firefox ESR 153.7 and Thunderbird 160** alongside the main release. Every record is `Deferred` — Mozilla scored them as CNA; NVD has not analyzed them.

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

Beyond the Barracuda pair (item 8), CISA's KEV catalog added three more on Nov 10: **CVE-2026-124194** — Microsoft Office Outlook, "missing user interaction for potentially unsafe action", CVSS **6.5** (CNA-assigned, NVD `Awaiting Analysis`), which Microsoft's own CVRF flags as exploited (item 3); **CVE-2026-20320** — Cisco BroadWorks, an XXE in the Open Client Interface XML Parser letting "an unauthenticated, remote attacker to read sensitive configuration information", CVSS **7.5** (`psirt@cisco.com`); and **CVE-2026-111793** — Openwave Messaging's Webtop Media Transcoder, which "does not enforce administrator-defined file type restrictions", CVSS **4.3** (MITRE-assigned, `Deferred`). The Nov 9 batch included GPUStack, OpenSSH and IBM Aspera Faspex alongside the FreeSWITCH 9.8 we covered.

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

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-10T21:17:04Z |
| Items | 20 |
| Sources tracked | 22 (Hacker News, GitHub Trending, NVD, CISA KEV, MSRC CVRF, arXiv, Hugging Face, vendor blogs, security advisories) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[Previous day](2026-11-10.md) · [Raw .md](https://trending.md/en/feed/2026-11-11.md) · [Archive](../archive/)
