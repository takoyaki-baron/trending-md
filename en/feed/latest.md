---
date: 2026-11-17
updated: 2026-11-17T04:52:33Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 40
license: CC-BY-4.0
---

# trending.md — 2026-11-17

## 1. Outages hit five major US banks at once — BofA, Chase, U.S. Bank, Wells Fargo and Zelle all reported down, hours into the week of the Microsoft outage

- **Velocity:** ▮▮▮ trending
- **Source:** apnews.com · 289+ pts on HN · 1.5h ago (~02:31 UTC+8)
- **Tags:** `outage` `banking` `zelle` `reliability`

Customers at five major US financial institutions reported trouble accessing online accounts Monday evening: **Bank of America, Chase, U.S. Bank, Wells Fargo and Zelle** all appeared on Downdetector's problem boards at the same time. Chase moved fastest to characterize it — a spokesperson said the bank is experiencing "a technical bug issue, not a cyber issue," adding: "Due to a technical issue, some transactions are taking longer than usual to complete but customers still have access to their accounts and funds." The AP story explicitly ties the moment to the week's context: it follows the Microsoft outage that began Friday and took down Outlook, Teams and Copilot for hours. No bank has published an RCA yet, and Zelle — the payments rail — being among the reported-down services is the detail with the widest blast radius.

**Why it matters:** Two systemic-outage waves in four days, in different sectors, is the pattern this feed's readers should internalize: concentration is the vulnerability, and the 2026 incident cadence (Microsoft, FAA ground stop, now banks) is turning resilience engineering from a niche concern into a procurement question. Watch for whether the banks' postmortems name a shared vendor — five simultaneous failures would be a remarkable coincidence otherwise.

[`🔗 AP News: Customers at major banks report difficulty accessing accounts online`](https://apnews.com/article/bank-outage-chase-wells-fargo-truist-50fee2693c22f597fa6ca51a97ef2cda) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50521045)

---

## 2. "What is w2rt6byl5nf1opmc-a.com?" — a gibberish domain out-ranked github.com on the Majestic Million, and the answer was Majestic's own test

- **Velocity:** ▮▮▮ trending
- **Source:** jack.cab · 297+ pts on HN · 6.2h ago (~21:51 UTC+8)
- **Tags:** `seo` `web-trust` `ranking-data` `investigation`

Jack Cabral's investigation started from a vanity check: his site ranked #783,052 on siterate.org — behind five Vietnamese casino spam sites — until he noticed **w2rt6byl5nf1opmc-a.com ranked #8**, ahead of googletagmanager.com, microsoft.com and github.com. The domain didn't even resolve in a browser. Digging into the Majestic Million that powers the ranking, he found ~274,833 referring subnets and ~853,298 referring IPs, **241,085,378 nofollow backlinks against just 6 follow links** across 5,163,708 referring domains — while Ahrefs showed only 53 backlinks, and the certificate first appeared November 11, *after* most links. An update settled it: Majestic's own Steve Pitchford replied — "Some internal experimentation. Choose a domain, make it esoteric, do some experiments. However, looks like we forgot to add a filter to avoid reporting it." The author's moral: don't test in production.

**Why it matters:** Ranking datasets like the Majestic Million and Tranco quietly underpin security research, ad-tech fraud detection, and every is-this-domain-popular heuristic — and one unfiltered internal experiment contaminated a top-10 slot for weeks (Tranco had it at #38 as early as October 5). Anyone consuming third-party web-trust data — Majestic, Tranco, and the ranking-derived heuristics built on them — inherits the supplier's hygiene.

[`🔗 jack.cab: What the fuck is w2rt6byl5nf1opmc-a.com?`](https://jack.cab/blog/siterate) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50517602)

---

## 3. FBI flash advisory: the Artex AI pentest platform breached networks "in under three hours" — ConnectWise, Barracuda and South Korean banks among the victims

- **Velocity:** ▮▮▮ trending
- **Source:** techcrunch.com · 18+ pts on HN · 1.9h ago (~02:12 UTC+8)
- **Tags:** `artex` `fbi` `ai-offense` `pentesting` `storm-0940`

An FBI flash advisory (issued Nov 13, reported by Zack Whittaker Nov 16) documents real-world attacks run with **Artex**, an open-source AI-powered penetration-testing platform that can hook hosted frontier models from Anthropic and OpenAI plus open-weight alternatives. The FBI says Artex-driven intrusions progress from initial targeting to active compromise "in under three hours" — noisy, but faster than human defenders respond. Named victims: **ConnectWise**, breached via a supply-chain attack that exposed the Microsoft 365 environments of at least 2,250 customers (attributed by Microsoft to the China-linked **Storm-0940**); **Barracuda**, breached Nov 11 through an exposed third-party credential that was never revoked; and multiple **South Korean financial institutions**, where attackers stole personal data of at least 68,000 people behind weak defenses and missing MFA. The developer closed the source after the attacks, but the FBI notes the older open-source version remains "widely accessible" — and researchers found hundreds of password-less Artex servers exposed to the internet (TechCrunch, Nov 6).

**Why it matters:** This is the clearest attribution yet of AI tooling in the attack chain of named intrusions — not model crime rhetoric, but a specific harness, a specific speed metric, and specific victims. The defensive read is uncomfortable: the bottleneck it exploits is response latency, which is exactly what agentic defense tooling is being sold to fix.

[`🔗 TechCrunch: FBI says Artex AI open-source hacking tool used to breach networks in "under three hours"`](https://techcrunch.com/2026/11/16/fbi-says-artex-ai-open-source-hacking-tool-used-to-breach-networks-in-under-three-hours) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50520796)

---

## 4. Kevin Buzzard's four tests for "it's checked in Lean" — of 290 OpenAI dump theorems, ~38 don't even state the paper's main result

- **Velocity:** ▮▮ rising
- **Source:** xenaproject.wordpress.com · 252+ pts on HN · 8.4h ago (~15:38 UTC+8)
- **Tags:** `lean` `formal-verification` `ai-math` `proof-assistants`

The Xena Project (Kevin Buzzard's formalization group at Imperial College) published the field's most useful checklist for the AI-mathematics era: compiling is necessary but not sufficient, and four things must be tested. **Statement fidelity** — does the Lean statement say what the paper's theorem says? Of the 290 OpenAI dump theorems that come with Lean code, around 38 "have the property that the Lean code does not even state, let alone prove, the main theorem of the paper. And OpenAI never claimed that it did!" — Buzzard's target here is readers who upgrade "code accompanying a paper" into "the paper, proved"; **compilation** (Anthropic's 13-million-line FLT formalization needs a 96-core, 500 GB machine; OpenAI's 640K-line Navier–Stokes work builds on a laptop); **proof-matches-statement** (hidden hacks — the fix is their `lake comparator` tool, which checks the trusted statement and untrusted proof agree on standard axioms); and **kernel soundness bugs** (mitigated by Lean's multiple independent kernels, one formally verified down to assembly). The post also notes three papers from the dump were retracted over a sign error, and closes with an operational warning: never run untrusted AI-generated Lean code without sandboxing it.

**Why it matters:** "Checked in Lean" is becoming the credibility currency of AI-math announcements — this week alone the feed has covered machine-checked Signal proofs and Gödel's notebooks — and Buzzard's point is that the phrase is four different claims, most of which nobody is currently running. The `lake comparator` workflow is the part any team can adopt tomorrow.

[`🔗 Xena Project: …and the proof is checked in Lean`](https://xenaproject.wordpress.com/2026/11/12/and-the-proof-is-checked-in-lean/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50515058)

---

## 5. Jiff 1.0: BurntSushi's Rust datetime library commits to stability — already in uv, Cargo, Cargo's siblings, and AWS LLRT

- **Velocity:** ▮▮ rising
- **Source:** burntsushi.net · 188+ pts on HN · 3.2h ago (~00:53 UTC+8)
- **Tags:** `rust` `datetime` `timezones` `libraries`

Andrew Gallant (BurntSushi — the author of ripgrep) announced **Jiff 1.0**, the stable milestone for his Rust datetime library, with the commitment stated flatly: "Unless some significant defect is found in Jiff's API, my plan is to commit to Jiff 1.0 indefinitely." The design makes time zones a core API concern rather than a feature flag — ambiguous civil datetimes around DST folds and gaps are resolved through explicit disambiguation strategies (`compatible` by default, plus `earlier`, `later`, and `unambiguous` which errors) — alongside a layered type system (`civil::Date/Time/DateTime`, `Timestamp`, `ZonedDateTime`) and a dual duration model (`Span` for calendar-aware spans, `SignedDuration` for physical time). The adoption list explains why 1.0 now: Jiff already ships in **uv, Cargo, Starship, fd, Nushell, Jujutsu, uutils/coreutils and AWS LLRT's Temporal implementation**. It's heavily inspired by JavaScript's Temporal, with RFC 3339/9557/2822 support and ICU4X locale support behind a feature.

**Why it matters:** Rust's standard library still has no datetime type, so this fills the gap at ecosystem scale — the adoption list is effectively a poll of the tools developers touch daily. Gallant's track record with API stability (ripgrep) makes the indefinite-commitment promise more credible than most 1.0s.

[`🔗 burntsushi.net: Jiff 1.0`](https://burntsushi.net/jiff/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50519744)

---

## 6. Since we covered the Microsoft 365 outage on Nov 13: Microsoft blames a defect introduced in a July gateway update — load tests ran on "weaker hardware with fewer cores"

- **Velocity:** ▮▮ rising
- **Source:** theregister.com · 70+ pts on HN · 6.8h ago (~21:18 UTC+8)
- **Tags:** `microsoft-365` `outage` `rca` `reliability`

Microsoft's preliminary RCA on the November 12–13 Exchange Online collapse traces it to a **latent defect in a gateway-server update deployed in July 2026** that sat in production for three months. The defect caused "lock contention inside an internal Windows process which caused the machine's resources (CPU & memory) to be exhausted" — and it surfaced only on newer, many-core machines, which is why load testing missed it: "Our load testing tended to focus on weaker hardware with fewer cores." Two simultaneous events armed it: a Teams failover onto the primary gateway (01:07 UTC Nov 12) plus ~14% of gateway capacity offline. The cascade was brutal — traffic rerouted to healthy servers which then failed too, and "at its lowest," more than 80% of servers were unresponsive within two hours. Exchange Online couldn't fail out of the gateway layer "for scale reasons," which is why email was the last service back (mitigation applied 07:20 UTC Nov 13, healthy 16:10 UTC). The final post-incident report is due November 20.

**Why it matters:** The June-style lesson repeats at Microsoft scale: a change can be globally deployed, load-tested, and dormant for a quarter before the right hardware-and-traffic combination detonates it. Test latency-sensitive services on your biggest hardware, and budget for the cascade — those are the two prescriptions any backend team can steal from this RCA today.

[`🔗 The Register: Microsoft blames monster email outage on software defect introduced in July fix`](https://www.theregister.com/saas/2026/11/16/microsoft-blames-monster-email-outage-on-software-defect-introduced-in-july-fix/5310026) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50517321)

---

## 7. VulnCheck lands 75 CVE records in one day — the auth-bypass wave sweeps npm-era CMS frameworks, and most have no fixed version to upgrade to

- **Velocity:** ▮▮ rising
- **Source:** NVD (disclosure@vulncheck.com CNA) · 75 records published Nov 16 (~12:17–15:17 UTC)
- **Tags:** `cve` `auth-bypass` `npm` `vulncheck`

NVD's November 16 cohort carries **75 CVE records from VulnCheck's CNA** — the day's largest single-source wave, dwarfing Samsung's 39 and GitHub's 30. The headline cluster is authentication bypasses in self-hosted web frameworks: **Tensei ≤ 0.11.5** falls back to the hard-coded JWT signing key `auth-secret-key` when `JWT_SECRET` is unset (9.8); **NodePress ≤ 8.5.1** carries two separate 9.8 auth bypasses; **Prime CMS ≤ 0.4.0-beta.0** ships with the `isAuthenticated()` guard commented out and `createAbility()` hard-coding every role to admin (9.8). Around them: Kalmia, REBUILD (four records), DeepAudit (five), thirdweb Dashboard, Contentlayer code injection at 8.8, plus SeaweedFS, LimeSurvey, wallabag, GitBucket, PrestaShop, Sandboxie-Plus and Axigen. Every score is VulnCheck's own (CVSS 3.1, `Secondary` provenance). The operational catch: for several of these the affected ceiling *is* the newest release — Prime CMS has had no commits since January 2023 and Tensei's last push was February 2026 — so there is no patched version to upgrade to.

**Why it matters:** The wave is a census of the npm-era long tail: frameworks that looked production-grade, went dormant, and now get systematically audited by one research shop. The remediation language matters more than the scores — when the ceiling is the latest release, "upgrade" is empty advice, and the honest mitigation is decommission or fork.

[`🔗 VulnCheck advisory: Tensei auth bypass via hard-coded JWT secret`](https://www.vulncheck.com/advisories/tensei-through-0.11.5-authentication-bypass-via-hard-coded-jwt-secret-in-tensei-auth) · [`🔗 CVE-2026-129552 record`](https://www.cve.org/CVERecord?id=CVE-2026-129552)

---

## 8. Dassault 3DEXPERIENCE ships a 10.0: pre-auth RCE via deserialization in the Station Launcher App, beside two 9.9 command injections

- **Velocity:** ▮▮ rising
- **Source:** CVE-2026-93664 (3DS CNA-assigned) · record published Nov 16 (~13:17 UTC)
- **Tags:** `cve` `3ds` `deserialization` `rce`

Dassault Systèmes' own CNA published a CVSS **10.0** on November 16: **CVE-2026-93664**, a deserialization-of-untrusted-data flaw in the **Station Launcher App** of the 3DEXPERIENCE platform (releases R2023x through R2026x) that "could lead to an unauthenticated remote code execution." Two siblings rode the same wave — **CVE-2026-77033** and **CVE-2026-19732**, both 9.9 OS command injection in the same component. The advisory page names no fixed releases; remediation lives in Dassault's support knowledge base (document QA00000522688), which is gated behind the customer portal. All three records are still `Received` at NVD, and every score is the vendor CNA's own.

**Why it matters:** 3DEXPERIENCE is PLM/CAD infrastructure for aerospace and manufacturing — exactly the class of deployment where a 10.0 pre-auth RCE lands in an air-gapped-adjacent network with slow patch cadence. The no-public-fixed-version shape is the same one this feed flagged on Cyrus SASL last week: when the advisory routes you to a support portal, assume the fix is a server-side module install, not a version bump.

[`🔗 3DS security advisory: CVE-2026-93664`](https://www.3ds.com/trust-center/security/security-advisories/cve-2026-93664) · [`🔗 CVE-2026-93664 record`](https://www.cve.org/CVERecord?id=CVE-2026-93664)

---

## 9. MuJoCo's first 4.x: speculative contacts and elasto-plasticity land — then 4.0.1 fixes a solver bug 4.0.0 introduced

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · +1,922★ this week · 18.2k total · v4.0.0 Nov 6, v4.0.1 Nov 11
- **Tags:** `mujoco` `physics-simulation` `robotics` `reinforcement-learning`

Google DeepMind's physics simulator crossed to its first major-version change in years: **MuJoCo 4.0.0** (Nov 6) adds **speculative contacts** (fast convex geoms no longer tunnel through thin obstacles within one timestep), **elasto-plasticity** (stateful plastic deformation in `mjData.plastic`, with von Mises J₂ return mapping for continuum flexes), a Python package split (`mujoco-core` / `mujoco-studio` / `mujoco`), and 1.4–3× faster sparse Newton solves on flex models. **4.0.1** (Nov 11) then fixed a sparse Cholesky factorization bug 4.0.0 introduced — merged supernodes gave the Newton solver an incorrect Hessian factor, producing slow convergence and divergence (#3767) — and brought the MuJoCo Studio web viewer to Windows via a platform-independent `mujoco-studio-wasm` wheel. The weekly board reflects the release: +1,922★ this week.

**Why it matters:** MuJoCo is the default physics backend for a large fraction of robot-learning research, and two of these changes — tunneling-proof contacts and plasticity — expand what's simulable at all (deformables, fast manipulators). The 4.0.1 story is the honest companion: a numerical-solver regression in a flagship simulation release is exactly the kind of bug benchmark numbers hide.

[`🔗 MuJoCo 4.0.0 release notes`](https://github.com/google-deepmind/mujoco/releases/tag/4.0.0) · [`🔗 MuJoCo 4.0.1 release notes`](https://github.com/google-deepmind/mujoco/releases/tag/4.0.1)

---

## 10. Coral: agents write their own TypeScript tools — a Rust gateway runs them in V8 isolates, and saved tools cut tokens 37% across 34 tasks

- **Velocity:** ▮▮ rising
- **Source:** Show HN · 50+ pts · 5.8h ago (~22:14 UTC+8) · withcoral/coral at 5.0k★
- **Tags:** `mcp` `agent-infrastructure` `tooling` `rust`

Show HN today: **Coral** is a self-hosted, Apache-2.0 gateway ("execution rails for agents") where the agent doesn't just call tools — it writes short **TypeScript programs** chaining multiple tool calls, which run in a fresh **V8 isolate** with no network access, no credentials and no imports. Every underlying tool call passes a workspace policy gate (Allow / Ask / Block) before credentials attach; runs pause for human approval and are attributed to whoever started them. Successful programs persist as reusable custom tools under `coral.private` or `coral.shared`, reachable from any MCP client (`claude mcp add --transport http coral <url>`). The README's own benchmark: across 34 GitHub/Linear/Slack tasks, custom tools cut **tokens 37%, cost 31%, time 29%**, pitched as "Opus 5.5 accuracy at Haiku 5.5 cost." An Enterprise Edition directory (SSO/SCIM, RBAC, audit log) sits under a separate license, "coming soon."

**Why it matters:** Tool-sprawl is becoming the MCP ecosystem's scaling tax — hundreds of narrow tools, most of them irrelevant to any given task. Making the agent *compile* its own tool out of primitives, under a policy gate, is the most concrete answer yet to that problem, and the isolate-based sandbox is the right trust boundary for it.

[`🔗 withcoral/coral`](https://github.com/withcoral/coral) · [`🔗 Show HN discussion`](https://news.ycombinator.com/item?id=50517803)

---

## 11. ffmpeg-skill rides a fresh release onto trending: 42 local video tools with a self-verifying MCP contract — npm 3.10.1 shipped last night

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · +475★ today · 6.5k total · npm 3.10.1 published 2026-11-15 23:39Z
- **Tags:** `ffmpeg` `mcp` `video-editing` `agent-skills`

**kajisho5/ffmpeg-skill** ("Give your coding agent a video editor") jumped +475★ the day after publishing **npm 3.10.1** — the release/registry axis agrees, which makes the spike legible. The toolkit wraps 42 Python-stdlib scripts over local FFmpeg (cut, join, silence removal, captions/karaoke, loudness, HDR→SDR, platform exports), each with `--dry-run` and `--json`, no cloud and no API keys. The interesting part is the contract: the MCP server derives every tool's schema from the scripts' own argparse parsers — the project calls the pattern **SPEC (Self-Producing Execution Contract)** — and CI fails if contract and code drift. Every tool is marked `mutates_input: false`, enforced by a hashing test, and the workflow is probe → edit → check → verify, including agent-side contact-sheet inspection. The README's reported numbers: 92/92 verification steps on a 10-file real-footage corpus, 40/40 sync offsets within 10 ms, F1 0.97 for scene detection — and a linked position paper on "verification-driven coding" that scores the project itself as only *partially* conformant with its own discipline.

**Why it matters:** Video is the media type coding agents handle worst, and this repo's bet is that discipline (contracts, dry-runs, verification) beats model intelligence. A skill that publishes its own non-conformance with its stated discipline is a rarer thing than a skill that claims 100%.

[`🔗 kajisho5/ffmpeg-skill`](https://github.com/kajisho5/ffmpeg-skill) · [`🔗 npm: ffmpeg-skill`](https://www.npmjs.com/package/ffmpeg-skill)

---

## 12. HeyGen ships Decision 1: the decision-model category reaches video AI — 400 named questions, typed answers with probabilities

- **Velocity:** ▮▮ rising
- **Source:** developers.heygen.com · release trackers date it Nov 13 · surfaced on OpenRouter
- **Tags:** `decision-models` `heygen` `api` `classification`

HeyGen — the avatar-video company — now documents **Decision 1**, an API that "turns text, images, and video into decisions your application can use." Callers POST a `state` (text or JSON) plus 1–400 named questions of three types: `noul` (yes/no with a probability of true), `choice` (pick 1–255 named options, per-option probabilities summing to 1), and `score` (1–10 ordered levels with a probability-weighted fractional score). Base context is 128k with up to 4 images and 1 video per request; a **Turbo** variant extends to 256k, 100 images and 10 videos. Responses are synchronous with `output_tokens` always 0, and the docs carry an unusually candid caveat: confidence is "**not a calibrated probability that the answer is correct**." It's the newest entrant in a category this feed has tracked since Perplexity's Decider and Google's Decisions API (Nov 10–12): models whose product *is* the decision, not the prose.

**Why it matters:** When an avatar-video vendor ships a decision model rather than a chat model, the category has crossed from research curiosity to default product shape — routing, ranking and escalation thresholds are becoming inference workloads of their own. The un-calibrated-confidence caveat is the part every integrator should quote.

[`🔗 HeyGen docs: HeyGen Decision`](https://developers.heygen.com/docs/models/heygen-decision) · [`🔗 OpenRouter: heygen-decision-1`](https://openrouter.ai/heygen/heygen-decision-1)

---

## 13. Google Research opens paper-orchestra: five agents turn ideas and experiment logs into submission-ready LaTeX — "not an officially supported Google product"

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · +306★ today · 1.3k total · 8 commits · arXiv preprint
- **Tags:** `paper-writing` `multi-agent` `google-research` `llm`

**google-research/paper-orchestra** (Yiwen Song, Yale Song, Tomas Pfister, Jinsung Yoon) is a multi-agent pipeline that converts "unconstrained pre-writing materials (ideas and experimental logs)" into submission-ready LaTeX manuscripts. Five specialized agents divide the work — **Outline, Literature Review** (searches, prioritizes, integrates related papers), **Section Writing, Content Refinement, and Plotting** (generates figures from code, plus conceptual diagrams) — targeting conference templates like the bundled CVPR 2025 one, with an `autoraters/` directory for automated evaluation. The README is candid about the edges: "**This is not an officially supported Google product**," the evaluation dataset is not included and will be released separately, and it requires your own Semantic Scholar/OpenAI/Vertex keys. Citations point to arXiv:2604.05018.

**Why it matters:** Automated paper *writing* is where the incentives of the agent wave and the incentives of publication collide, and this repo is unusual in shipping the unglamorous parts (literature triage, figure generation, template targeting) as an inspectable pipeline rather than a demo. The authors' own "not officially supported" label is the right amount of caution to import when reading what it produces.

[`🔗 google-research/paper-orchestra`](https://github.com/google-research/paper-orchestra) · [`🔗 arXiv:2604.05018`](https://arxiv.org/abs/2604.05018)

---

## 14. Since we covered the ground stop's cause on Nov 15: questions now swirl around the FAA's SMART AI tool — expanded to every center days before the stop, officials deny a link

- **Velocity:** ▮ steady
- **Source:** faa.gov Q&A (dated Nov 15) · AP via ABC News · updated Nov 16
- **Tags:** `faa` `ai-in-safety-critical` `ground-stop` `policy`

The FAA's Q&A on the November 13 nationwide ground stop now has a fourth question to answer: the agency had **rolled its new SMART tool out to all air route traffic control centers just days before the stop**, after a September debut in the Washington DC area. SMART — Strategic Management of Airspace, Routes and Trajectories — was unveiled in September by Secretary Sean Duffy and FAA Administrator Bryan Bedford as "a cutting-edge tool that centralizes 200 data streams — including weather patterns, flight paths, traffic flow, and controller staffing metrics — into one platform," with an AI-supported engine synthesizing them into a "comprehensive visualization" of traffic. It makes recommendations to humans; per AP, it "is not — at least not yet — set up for AI to be in charge of flight control." All parties deny a connection: the FAA's Q&A states the stop was issued "out of an abundance of caution," and vendor **Air Space Intelligence** says it wasn't caused by "the SMART system, any product of ASI or our integration with FAA and ATC." The identified cause remains the router work detailed in earlier reporting — a copper-to-fiber conversion that flooded ATC systems.

**Why it matters:** The timing question writes itself, but the substantive point is quieter: an AI decision-support layer went fleet-wide in safety-critical infrastructure days before its first systemic outage, and the industry's instinct was to ask whether it mattered. That's the deployment pattern to watch — recommendation-not-control today, and the "not yet" is doing a lot of work in that sentence.

[`🔗 FAA: Nationwide Ground Stop — Questions and Answers`](https://www.faa.gov/newsroom/nationwide-ground-stop-questions-and-answers) · [`🔗 AP (via ABC News): Questions around FAA's new SMART AI system`](https://abcnews.com/US/wireStory/questions-swirl-faas-new-smart-ai-system-officials-138170875)

---

## 15. "Software is breaking down at a systemic level" — Breck-McKye's essay names the shared shape behind 2026's outage cascade

- **Velocity:** ▮ steady
- **Source:** breck-mckye.com · 137+ pts on HN · 1.8h ago (~02:17 UTC+8)
- **Tags:** `essay` `reliability` `ai-debt` `complexity`

Jimmy Breck-McKye's essay (Nov 15) argues this year's incidents — the Microsoft outage, the FAA ground stop, PHP2Shell, the eMudhra certificate compromise, the Shai Hulud npm attack — share no single cause but a single shape: "a highly complex system made of low quality parts," where nobody understands the whole. AI appears as **both cause and symptom** of a longer decay: cloud and OSS dependency (teams "stopped knowing the details"), cultural de-specialization (the generalist flattening that muted early warnings like left-pad and XZ), and — citing Kristen Maevyn's *The Decoherence Trap* — the real AI danger isn't hallucinated code but "**locally valid but mutually incompatible**" changes that destroy coherence at system scale. The endpoint is de-skilling into "meat proxies" and the loss of organizational cognition when every ticket, document and summary is itself generated. He closes bleakly: "The internet is at a breaking point," and this is "the new normal."

**Why it matters:** This is the essay version of what this feed's incident coverage has been accumulating empirically all month — and its strongest contribution is the decoherence framing, which explains why per-change quality metrics stay green while systems fail. It lands the same day five banks fell over together, which is either coincidence or corroboration.

[`🔗 Breck-McKye: Software is breaking down at a systemic level`](https://www.breck-mckye.com/blog/2026/11/software-is-breaking-down-at-a-systemic-level/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50520866)

---

## 16. TRMNL Frame: a 31.5-inch color ePaper display in a handmade wooden frame — E Ink Spectra 6 with an open-source color engine, ~470 units in batch one

- **Velocity:** ▮ steady
- **Source:** trmnl.com · 116+ pts on HN · 3.7h ago (~00:23 UTC+8)
- **Tags:** `epaper` `hardware` `eink` `dashboard`

TRMNL's third product, **Frame**, is a 31.5-inch full-color ePaper display built on E Ink's **Spectra 6** platform, housed in a wooden enclosure made in the company's own woodworking shop in Pine Mountain, Georgia. The color quality bet is software: a new color-conversion engine called **Lazarus** — which TRMNL claims gives "the best color matching on the market for any Spectra 6 display," and which will be **open source**. A new Clock Sync feature changes refresh behavior to update at set moments of the day (less flicker, longer battery), there's a microSD port for fully offline operation, and a Local Art plugin lets users submit and even sell their own work. Pre-orders are open now: batch #1 is roughly **470 units** limited to the US, Canada, Mexico and Australia, a few shipping by end of 2026, most early 2027.

**Why it matters:** Large color ePaper has been stuck in "trade show demo" territory for years; a small hardware company betting its own wood shop and an open-source color pipeline on it is the kind of vertical integration that either cracks the use case or fails interestingly. The open-sourced Lazarus engine is the part other Spectra 6 vendors can reuse on day one.

[`🔗 TRMNL: Introducing Frame`](https://trmnl.com/blog/introducing-frame) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50519354)

---

## 17. "The Active Directory Era Is Finally Over" — Infisical's essay on machine identity: AD "auto-approves short-lived cloud resources" and became security theater

- **Velocity:** ▮ steady
- **Source:** infisical.com · 89+ pts on HN · 5.8h ago (~22:15 UTC+8)
- **Tags:** `identity` `active-directory` `secrets-management` `zero-trust`

Infisical's essay (Nov 13, updated Nov 16) argues Active Directory succeeded by answering three questions in one place — what identities exist, what vouches for them, where they're valid — and broke when machines stopped being physical servers that an admin registers. Modern infrastructure is ephemeral (Kubernetes pods, CI runners, cloud databases), so domain-join automation now often auto-approves short-lived cloud resources — build every automation to mirror each testing database and pod into AD, and it is still "**security theater**": the unified directory "would exist on paper, but lack authority." The evidence is the everyday kind: a defense organization with a publicly exposed Lambda function whose policy was `iam:*`; plaintext credentials in `.env` files; GitHub automation refusing directory identities. The verdict: "**Active Directory is the new mainframe: great for its time, but you'd never choose to start from scratch.**" The two proposed replacements — identity federation (OIDC attestations across platforms) and credential brokering (Infisical's own model) — each restore the three answers without a single directory. The closing argument is aimed squarely at this feed's audience: AI agents will need their own identities and policies, so machine identity is about to get much more load-bearing.

**Why it matters:** Non-human identities already outnumber human ones in most cloud estates by an order of magnitude, and agentic workflows multiply them again. The essay is vendor-authored and says so, but its diagnosis matches what the Auth0 RAG and otterdog incidents showed mechanically this month: the perimeter that fails is the one no human ever approved.

[`🔗 Infisical: The Active Directory Era Is Finally Over`](https://infisical.com/blog/active-directory-machine-identity) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50517815)

---

## 18. jiangshan-map: a hand-drawn interactive atlas of 2,400 years of Chinese history — 198 territory snapshots, an MCP server, and honest data provenance

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · +285★ today · 6.6k total · trending Repository of the Day badge (#2)
- **Tags:** `history` `maps` `visualization` `chinese-oss`

**DeanChensj/jiangshan-map** (江山时序, "Chronicles of the Realm") is a dependency-free static site that lets you scrub a timeline across **403 BCE to the present** — 18 historical periods, 198 territory snapshots — watching borders evolve with "ghost boundary diffs," clicking any city for its 2,400-year administrative genealogy, or tracing figures like Qin Shi Huang, Zhuge Liang and Xuanzang through event storylines. It ships an MCP server (zero npm dependencies), a ready-made agent skill, a `window.atlasAPI` browser API, and GeoJSON export compatible with Leaflet/MapLibre/QGIS. The data provenance is unusually honest: outlines started from aourednik/historical-basemaps then were **hand-redrawn**; prefecture boundaries derive from CHGIS V6 and the Hartwell China Historical GIS, which are license-restricted to academic non-commercial use; and the README warns that territories are "schematic approximations of broad jurisdictions, not surveyed borders."

**Why it matters:** Historical-map projects usually die at the data-licensing stage; this one documents exactly which layers are free and which are restricted, which is the part any clone would get wrong. The MCP-server-and-skill packaging is also a sign of where educational visualizations are going — built so an agent can drive the atlas, not just a browser.

[`🔗 DeanChensj/jiangshan-map`](https://github.com/DeanChensj/jiangshan-map) · [`🔗 Live demo`](https://deanchen.me/jiangshan-map/)

---

## 19. S2 built its own authoritative DNS server on Spanner — because Route53 throttles writes to ~5 per second and attackers noticed

- **Velocity:** ▮ steady
- **Source:** s2.dev · 62+ pts on HN · 10.8h ago (~17:19 UTC+8)
- **Tags:** `dns` `infrastructure` `spanner` `postmortem-adjacent`

S2's engineering post (Cristian Caciuc, Nov 16) explains why the streaming company replaced managed DNS with its own authoritative server: each of their "basins" gets a subdomain that must resolve **instantly** on creation, but Route53 throttles record APIs to roughly 5 UPSERTs per second — and an attacker once created tens of thousands of basins, exhausted the quota, and left a backlog that took hours to clear (hence their old 100-basin cap). The fix: an authoritative DNS server in **Go** on `miekg/dns`, answering from a **live SELECT against Google Cloud Spanner** — the strongly consistent basin database they already run, so there's no sync system to drift. NXDOMAIN-attack economics (every bogus query becomes a DB lookup) are handled by Cloudflare's DNS Firewall in front, origin locked to Cloudflare IPs, with an `ns-leak-test` guarding against origin leaks in SOA/NS responses, all across two GKE regions. A few weeks in, it's stable — and the author notes the recent commits are "mostly CVE fixes, dependency bumps and cost savings."

**Why it matters:** "It's always DNS" usually means DNS is someone else's; here the honest engineering answer to a quota-abuse loop was to become a DNS operator, and the post is candid about every trade (Go over Rust, Spanner consistency over caching, Cloudflare as the abuse shield). A good architecture read regardless of whether you ever run a nameserver.

[`🔗 s2.dev: It's always DNS, so why are we running our own?`](https://s2.dev/blog/dns-server) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50515616)

---

## 20. The 2007 "secret ThinkPad powerbutton code" resurfaces: press 10 times, hold 30 seconds — and the support rep's own explanation was "dude, you know as much as I do"

- **Velocity:** ▮ steady
- **Source:** masnick.com · 257+ pts on HN · 8.4h ago (~19:39 UTC+8)
- **Tags:** `retro` `hardware` `thinkpad` `folklore`

Mike Masnick's 2007 post is back on the front page: his brand-new ThinkPad z61t died completely before a conference talk, and an IBM support rep walked him through the ritual — unplug AC, remove battery, **press the power button 10 times at one-second intervals, then hold it for 30 seconds**, reinsert, power on. It revived instantly. The rep's official explanation was "static discharge"; his honest one, when pressed, was: "dude, you know as much as I do… but your machine is working." Success reports in the comments span 2008 through 2015 and far beyond the z61t — T-, X- and R-series ThinkPads, plus Acers, IdeaPads and an S10 netbook — with dissenters arguing a single long press does the same, and others swearing by RAM reseats or CMOS-battery pulls instead.

**Why it matters:** It's folklore with a plausible mechanism (draining residual power from capacitance that latches a stuck power state), a plausible mechanism with folklore around it, and eighteen years of field data that refuse to die. For anyone who keeps old hardware alive — this feed's readership, mostly — the ritual belongs in the drawer next to the paperclip.

[`🔗 masnick.com: The Secret ThinkPad Powerbutton Code (2007)`](https://masnick.com/posts/the-secret-thinkpad-powerbutton-code-to-bring-dead-laptops-back-to-life/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50516473)

---

## 21. Carnegie Mellon puts its CS classroom on YouTube — 8 full courses premiere this month, an AI Agents course among them

- **Velocity:** ▮▮▮ trending
- **Source:** cs.cmu.edu · 915+ pts on HN · 7.8h ago (~04:40 UTC+8)
- **Tags:** `education` `cmu` `courses` `open-access`

Carnegie Mellon's School of Computer Science opened **CS Learn** (cs.cmu.edu/learn): full classroom lectures from its faculty, free on YouTube — "Free lectures now on YouTube. Free courseware coming next." Eight courses premiere this month, including **10-605 Machine Learning with Large Datasets** (William Cohen), **15-442 Machine Learning Systems** (Tianqi Chen and Zhihao Jia), and — premiering Thursday — **11-768 AI Agents** (Daniel Fried and Graham Neubig), with 17-645 Machine Learning in Production (Christian Kästner and Bogdan Vasilescu) the same day. January brings Probability and Computing (Mor Harchol-Balter), Multimodal ML, and more. The roadmap goes beyond video: self-paced courseware with instant feedback and badges is next, and "AI tutoring is coming to the courseware experience."

**Why it matters:** MIT opened its course site to agents last week; CMU is now putting its entire lecture hall on YouTube with an agents course in the lineup and AI tutoring on the roadmap — the top CS schools are racing to make their teaching the free training corpus for both humans and agents.

[`🔗 CMU SCS: CS Learn`](https://www.cs.cmu.edu/learn/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50522980)

---

## 22. Windows 11 quietly tracks which coding agents you run — MissionControlAggregator.dll matches claude.exe, codex.exe, cursor.exe and reports usage to Diagnostics

- **Velocity:** ▮▮▮ trending
- **Source:** xusheng.dev · 332+ pts on HN · 5.6h ago (~06:52 UTC+8)
- **Tags:** `windows` `telemetry` `privacy` `coding-agents`

Reverse engineer Xusheng Li asked AI to hunt for undocumented features in Windows binaries and hit a list of coding agents inside **MissionControlAggregator.dll**: `copilot.exe`, `claude.exe`, `codex.exe`, `agy.exe` in four CLI-agent slots (with extensionless equivalents on the WSL route), and `github.exe`, `claude.exe`, `codex.exe`, `cursor.exe`, `antigravity.exe` in five desktop-agent slots. The names feed executable-name matchers behind a feature flag named **CLICodingAgentUsage** (feature ID 62580080); the component records which agents and developer tools have been used, caches that locally, and reports it into Windows Diagnostics — and "unless you have opted out of the 'optional' diagnostic data (which is enabled by default), the data is uploaded to Microsoft."

**Why it matters:** Agent adoption is now a signal worth building OS-level instrumentation for — and the instrumentation itself is the privacy story. If you manage machines, the takeaway is concrete: "optional diagnostic data" now includes which AI tools your developers run.

[`🔗 Xusheng Li: Windows 11 Is Collecting Data on Which Coding Agents and Developer Tools You Use`](https://xusheng.dev/posts/windows-coding-agent-telemetry/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50524736)

---

## 23. BugMeNot shuts down after two decades — "Thanks to everyone who envisioned a better internet"

- **Velocity:** ▮▮ rising
- **Source:** bugmenot.com · 384+ pts on HN · 6.9h ago (~05:35 UTC+8)
- **Tags:** `internet-history` `privacy` `login-walls`

BugMeNot — the decades-old shared-credential service that let people bypass "create a free account to read this article" walls — is closed. The site now renders a single farewell page: "**BugMeNot has closed. Thanks to everyone who envisioned a better internet**" — with no stated reason, followed by a block of four-letter groups nobody in the thread has explained yet. The community's eulogy is honest about the decline: recent working logins were mostly throwaway addresses (bugmenot@mailinator.com, yopmail accounts), and one user found it still useful "as recently as a month or two ago" before discovering the closure today.

**Why it matters:** It's an artifact of the pre-walled web dying in the same week this feed covered registration walls, scraping bans and login-gated everything. The farewell line reads as a verdict on how that trade went.

[`🔗 BugMeNot farewell page`](https://www.bugmenot.com/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50523601)

---

## 24. United Airlines' 30-minute system outage delays flights nationwide — the second systemic tech failure of the same day

- **Velocity:** ▮▮ rising
- **Source:** cnn.com · 204+ pts on HN · 6.3h ago (~06:15 UTC+8)
- **Tags:** `outage` `airlines` `reliability`

United Airlines acknowledged a **widespread technology outage** impacting departing flights just before 5 p.m. ET Monday and resolved it about an hour later — a roughly 30-minute failure that delayed outbound flights at US airports, with **fewer than 150 flights impacted**, per spokesperson Leslie Scott. CNN notes it came "on the heels of a rare FAA ground stop that caused massive disruption." No cause given. The same day, five major US banks reported simultaneous access problems (item 1) — different sectors, no common cause identified, one very bad day for concentration risk.

**Why it matters:** Two unrelated systemic failures in one news cycle is exactly the pattern resilience researchers warn about: individually survivable failures that look, from the outside, like infrastructure groaning under the same load. Postmortems for both are still pending.

[`🔗 CNN: United Airlines says it resolved system outage that delayed flights`](https://www.cnn.com/2026/11/16/us/united-airlines-outage) · [`🔗 AP: United Airlines has a widespread system outage`](https://apnews.com/article/united-airlines-outage-5a5e5f75bb07f11ffb8750901f0076ff)

---

## 25. OPTIMJACK: 178 sites served malware through Optimizely's own CDN — the attacker wrote into customers' Project JavaScript, and the kit delivered iOS exploits

- **Velocity:** ▮▮ rising
- **Source:** blog.report-uri.com · 163+ pts on HN · 5.6h ago (~06:55 UTC+8)
- **Tags:** `supply-chain` `skimware` `magecart` `optimizely`

On November 16, malicious JavaScript was served to visitors of **178 organisations** through Optimizely Web's snippets — Zoom, BBC, CNN, Salesforce, GitLab, IKEA, HSBC, Equifax, Air France-KLM, Ledger and Peacock among them (Scott Helme, Report URI). The compromise was surgical: the attacker wrote code into the **Project JavaScript** field of customer projects in the Optimizely dashboard, so the poisoned code still loaded from `cdn.optimizely.com` with Optimizely's certificate — customers' own origins stayed clean. The kit swapped crypto wallet addresses, skimmed payment cards, stole cookies and screenshots, and on iPhones and iPads delivered the **Coruna and DarkSword iOS exploit kits**; crypto has already been stolen, with verified transactions. Cleanup tracked live: 169 of 188 infected snippets at 20:56 UTC down to 1 of 188 at 21:52 UTC. An independent writeup names the campaign **OPTIMJACK** (a loader inside the Optimizely bundle appends `track.js`; C2 at `1688360[.]cc` plus two `.icu` hosts).

**Why it matters:** "Trusted JavaScript doesn't always remain trustworthy" — a third-party tag platform is a single point of compromise for every site that embeds it. If your site loads any experimentation or snippet manager, audit what your bundle serves today; a CSP in report mode would have surfaced this.

[`🔗 Report URI: World's Largest Brands Infected With Malware Via Optimizely`](https://blog.report-uri.com/worlds-largest-brands-infected-with-malware-via-optimizely/) · [`🔗 Amirul Cyber: OPTIMJACK writeup`](https://amirulcyber.com/2026/11/16/optimjack-optimizely-skimmer/)

---

## 26. OpenCode ships Browse: your real browser as an agent's tool — real tabs, real logins, handoff for the 2FA step

- **Velocity:** ▮▮ rising
- **Source:** opencode.ai · 157+ pts on HN · 7.2h ago (~05:25 UTC+8)
- **Tags:** `mcp` `browser` `agent-infrastructure` `opencode`

OpenCode launched **Browse**: "An MCP server and a Chromium extension that let your agents use your real browser, with your tabs, your logins and your extensions." Agent tabs open in the background in collapsed groups across Chrome, Edge, Brave, Arc, Helium, Vivaldi, Opera and Chromium; agents read pages, click, type, take screenshots and record tabs. The interesting boundary is the **handoff**: when a login, 2FA prompt or payment is needed, the agent hands the tab back to you and resumes once you click Continue — plus a toolbar button to "lend" a tab you already have open, and an allowed-sites list to pin an agent's tab to named domains. Works from any MCP client (OpenCode, Claude Code, Cursor, Codex, Zed).

**Why it matters:** Agent browsers have been split between headless throwaway profiles (no logins) and screenshot-driven computer use (slow, blind). Browse bets on a third path — your actual authenticated browser as the substrate, with the human kept in the loop at exactly the steps where credentials are involved.

[`🔗 OpenCode: Browse`](https://opencode.ai/product/browse) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50523459)

---

## 27. One overnight CVE wave hits the agent stack itself: Phoenix 10.0 (env-var theft), CubeSandbox 9.4 (sandbox escape), MCP Python SDK 7.5 (OAuth credential leak)

- **Velocity:** ▮▮ rising
- **Source:** NVD (28 GitHub-CNA records published 2026-11-16 20:00Z – 11-17 04:00Z)
- **Tags:** `cve` `agent-infrastructure` `mcp` `sandbox-escape`

Three of the overnight GitHub-CNA records land on the agent stack's own plumbing, every score CNA-assigned and still `Received` at NVD. **CVE-2026-53998 (10.0)**: Arize-Ai's Phoenix AI-observability platform (13.0.0 until 15.7.0) passed attacker-controlled F-string templates through its `applyChatTemplate` GraphQL query, and `DotDict.__getattr__` failed to block traversal through private attributes — `__class__`, `__init__`, `__globals__` — letting a crafted field **read process environment variables**, where API keys live. **CVE-2026-120699 (9.4, CVSS 4.0)**: CubeSandbox, Tencent Cloud's "instant, concurrent, secure, and lightweight sandbox for AI agents", let any authenticated tenant pass `metadata["host-mount"]` with an arbitrary existing host path — no authorization check or allowed-prefix validation — mounting host directories into the sandbox; fixed in 0.5.1. **CVE-2026-115563 (7.5)**: the official **MCP Python SDK** (1.9.1 until 1.30.0, and 2.2.0) shipped OAuth clients that could send credentials to an authorization server chosen by an untrusted MCP server — `ClientCredentialsOAuthProvider` and `PrivateKeyJWTOAuthProvider` "cannot identify the authorization server that owns their credentials."

**Why it matters:** Environment variables are where keys live, sandboxes are the trust boundary, OAuth is how agents authenticate — the three CVEs hit exactly those three assumptions, in the three layers (observability, sandbox, protocol SDK) every serious agent deployment stands on. Patch list: Phoenix ≥ 15.7.0, CubeSandbox ≥ 0.5.1, MCP SDK off the affected range.

[`🔗 GHSA-gfv3-m769-5xm3 (Phoenix)`](https://github.com/Arize-ai/phoenix/security/advisories/GHSA-gfv3-m769-5xm3) · [`🔗 GHSA-qx49-fqc8-xw99 (MCP Python SDK)`](https://github.com/modelcontextprotocol/python-sdk/security/advisories/GHSA-qx49-fqc8-xw99)

---

## 28. ChatGPT Wallet: agents get a real wallet — card tokens, per-purchase biometric approval, Amex/Chase/Mastercard/Visa attached

- **Velocity:** ▮▮ rising
- **Source:** openai.com · 46+ pts on HN · 13.4h ago (~23:10 UTC+8)
- **Tags:** `agentic-commerce` `payments` `openai` `chatgpt`

OpenAI launched **ChatGPT Wallet** — "the first wallet that lets agents pay without access to users' actual card details and that requires a security check for every purchase" — built with American Express, Chase, Mastercard and Visa. The flow: user adds a card once; before each purchase the agent's items, total and selected card are reviewed; approval is a biometric security check; the payment network then issues a **token** standing in for the card, so neither the agent nor the merchant sees real card details, while existing rewards and dispute protections carry over. It rolls out **today in dots** for ChatGPT Pro subscribers 18+ in the US with eligible US-issued cards. Alongside it comes a Commerce Partner Playbook: Web Bot Auth for signed agent requests, fraud-stack partners (Forter, Riskified, Sardine, Signifyd), PSP integrations (Adyen, Checkout.com, Stripe) — and, eventually, fully-delegated purchases bounded by spending limits and categories.

**Why it matters:** After United's agent-booking ban and x402's pay-per-call experiments, the card networks have picked a side: agent payments are becoming regulated infrastructure with biometric authorization records, not hacks. The compliance surface every merchant builds next week just got a spec.

[`🔗 OpenAI: Introducing ChatGPT Wallet`](https://openai.com/index/introducing-chatgpt-wallet/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50518501)

---

## 29. Anthropic's IPO roadshow claim, read carefully: Mythos brought Claude up on AMD MI355X in ~3 days — for prefill, on one model

- **Velocity:** ▮▮ rising
- **Source:** tomshardware.com · 29+ pts on HN · 3.3h ago (~09:10 UTC+8)
- **Tags:** `anthropic` `claude-mythos` `amd` `cuda`

Anthropic told IPO investors that **Claude Mythos Preview** got Claude running on AMD Instinct MI355X GPUs "in just three days with basically no human intervention," porting or writing "almost 100% of the kernels" — against a 6–12-month estimate with dozens of engineers for historical accelerator bring-up (co-founder and chief compute officer Tom Brown, Nov 10 roadshow video; the prospectus S-1/A No. 2 carries the claim without a number). Tom's Hardware's reading of the slide footnote is the part to quote: the ~3 days covers "**prompt processing for one Anthropic model on AMD MI355X GPUs at a useful level of performance**" — decode performance is unstated, the chart's "~100%" axis never says 100% of what, and no AMD-vs-Nvidia speed comparison was disclosed. Context: AMD's July keynote showed one engineer + Claude bringing up an MI355X rack over a weekend; Jensen Huang calls Anthropic "a unique instance, not a trend" — while Nvidia and AMD are among seven companies buying $26.0B of Anthropic's stock at the IPO price.

**Why it matters:** If kernel-porting collapses from months to days, the CUDA moat becomes a benchmark question rather than an engineering one — but the claim's fine print (prefill-only, one model, no speed baseline) is exactly the delta-vs-setup ambiguity this feed keeps flagging. The repeat experiment arrives with the first MI450 Helios racks in H1 2027.

[`🔗 Tom's Hardware: Anthropic says Claude Mythos slashed software work to onboard AMD GPUs`](https://www.tomshardware.com/tech-industry/artificial-intelligence/anthropic-says-claude-mythos-slashed-software-work-to-onboard-amd-gpus-from-up-to-12-months-to-around-three-days-writing-almost-100-percent-of-kernels-autonomously-chips-away-at-nvidias-cuda-moat) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50526264)

---

## 30. Harmonic's Aristotle expands into Rust: prove no UB and spec conformance "even inside unsafe blocks"

- **Velocity:** ▮ steady
- **Source:** harmonic.fun · 110+ pts on HN · 11.1h ago (~01:30 UTC+8)
- **Tags:** `formal-verification` `rust` `ai` `harmonic`

Harmonic announced **Aristotle now verifies Rust**, extending its AI-driven formal verification beyond C and Verilog. With Rust support it can "prove that your code has no undefined behavior and does exactly what its spec says, **even inside unsafe blocks**" — and for C-to-Rust rewrites, prove the new code behaves the same as the original. CEO Tudor Achim: "Rust is where much of the world's most critical new code is being written, and increasingly, AI is the one writing it." The company's published case studies give the flavor of what it claims to catch: a Verilog design with bugs "found 110,000 cycles deep in its hardest block," LibTomMath proven 31–38% faster against the same spec, and 28 results across an entire Rust order book.

**Why it matters:** It lands the same day as Buzzard's four-part checklist for AI-math claims verified in Lean (item 4) — the AI-code era is splitting into two QA stacks, statistical (tests, benchmarks) and mechanized (proofs, verifiers), and a verifier that eats Rust — the language the safety-critical rewrite wave chose — is the more consequential of the two.

[`🔗 Harmonic: Aristotle Expands Into Rust`](https://www.harmonic.fun/news/aristotle-rust-verification) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50520270)

---

## 31. Jolt: Clojure that speaks C — self-hosted on a Scheme layer, no JVM, single-binary builds with native C interop

- **Velocity:** ▮ steady
- **Source:** jolt-lang.net · 99+ pts on HN · 12.2h ago (~00:20 UTC+8)
- **Tags:** `clojure` `lisp` `languages` `compilers`

**Jolt** is a self-hosted Clojure implementation running on a portable Scheme layer with multiple backends — Chez Scheme natively, Gambit for JavaScript — and no JVM anywhere. The pitch: "Most Clojure runs unchanged, any C library binds natively, and `jolt build` ships a single standalone binary." `defcfn` turns C functions into ordinary Clojure fns (the docs' own examples reach SQLite, Postgres, OpenSSL and zlib this way); `jolt build` ahead-of-time-compiles runtime, stdlib, app and deps into one self-contained executable with C dependencies statically linked. Full Clojure semantics are claimed — persistent data structures, lazy seqs, transducers, multimethods, protocols — with real OS-thread concurrency (`future`, `agent`, `pmap`, `core.async`). The homepage REPL is Jolt itself compiled to JavaScript by the Gambit backend, evaluating live in your browser.

**Why it matters:** Two decades after Clojure bet on the JVM, Jolt demonstrates the dialect's semantics can detach from it entirely — and the Scheme-hosting trick is a genuinely elegant portability story: one language, native binaries and a browser REPL from the same source tree.

[`🔗 Jolt: Clojure that speaks C`](https://jolt-lang.net/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50519345)

---

## 32. Spamhaus starts enforcing HELO/PTR/A-record alignment this month — the email baseline tightens for every sender

- **Velocity:** ▮ steady
- **Source:** spamhaus.org · 77+ pts on HN · 6.9h ago (~05:35 UTC+8)
- **Tags:** `email` `deliverability` `spamhaus` `dns`

Spamhaus' new Sender Guidelines carry a dated requirement: "**Starting in November 2026, we are gradually rolling out a requirement for every sending IP to have a valid HELO, a reverse DNS (PTR) record, and a matching A record**" — with a HELO/DNS checker tool to test your own stack. The guidelines organize the rest of the bar in six sections: infrastructure and DNS, authentication (SPF/DKIM/DMARC), permission and list hygiene (spamtraps included), sending best practices (warm-up, bounce management, unsubscribe), IP and domain reputation, and ESP/large-sender obligations.

**Why it matters:** Most deliverability advice is folk wisdom; this is a blocklist operator converting its acceptance criteria into a public, dated, checkable spec. If you run your own mail server, the HELO/PTR/A triangle is now table stakes — and the checker tells you in one call whether you pass.

[`🔗 Spamhaus: Sender Guidelines`](https://www.spamhaus.org/sender-guidelines/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50523784)

---

## 33. Git's `clone --recurse-submodules` flaw (8.0) and containerd's manifest panic (7.1) ride the same overnight wave

- **Velocity:** ▮ steady
- **Source:** NVD (GitHub-CNA records published 2026-11-16 20:00Z – 11-17 04:00Z)
- **Tags:** `cve` `git` `containerd` `supply-chain`

Two more GitHub-CNA records worth their own line. **CVE-2026-111760 (8.0)**: in Git before 2.50.2/2.51.3/2.52.1/2.53.1/2.54.1/2.55.1/2.56.1, an **attacker-hosted repository** (one "hosted by the attacker rather than on a normal forge site") exploiting `git clone --recurse-submodules` can get Git to overwrite a submodule gitfile with a symbolic link pointing at a directory holding attacker-controlled Git configuration or hooks — which then execute on the cloning user's system. **CVE-2026-95839 (7.1, CVSS 4.0)**: containerd (2.2.0 until 2.2.10/2.3.7/2.4.2) crashes the daemon on image pulls whose manifest carries an `io.containerd.manifest.subject` annotation with a malformed digest — "including through a default CRI PullImage request," i.e. a hostile or compromised registry can take down Kubernetes nodes that pull from it. Fixed in 2.2.10, 2.3.7 and 2.4.2.

**Why it matters:** Both are trust-boundary bugs in the two operations every CI system walks through — clone and pull — and both trigger on ordinary commands, not exotic flags. Pin your Git patch level and your containerd minor before the next recursive clone of an unfamiliar URL.

[`🔗 GHSA-vp2w-7xxj-jvxr (Git)`](https://github.com/git/git/security/advisories/GHSA-vp2w-7xxj-jvxr) · [`🔗 GHSA-vwhp-8p66-mq4f (containerd)`](https://github.com/containerd/containerd/security/advisories/GHSA-vwhp-8p66-mq4f)

---

## 34. Phison SSD controller firmware: leaked RSA parameters unlock vendor commands — arbitrary memory read/write and volatile code execution on the drive itself

- **Velocity:** ▮ steady
- **Source:** NVD (CERT/CC records published 2026-11-16 20:00Z – 11-17 04:00Z) · CVE-2026-126828 et al.
- **Tags:** `cve` `firmware` `ssd` `hardware-security`

A CERT/CC disclosure wave hit Phison SSD controller firmware overnight: **CVE-2026-126828** (E18; firmware EIFM80.0 and EIFK51.2) — a local attacker with administrative privileges can bypass the drive's "Security Access" handshake "by leveraging leaked RSA parameters found in vendor utility binaries," unlocking vendor-specific commands that permit **arbitrary memory read and write** on the controller; because "the firmware's code regions lack protection," those primitives can overwrite existing handlers and achieve **volatile code execution on the SSD controller**. Sibling records cover E16 (EGFM13.2, CVE-2026-129187) and E12 (ECFM32.2, CVE-2026-129190), and VulnCheck's separate **CVE-2026-124017 (6.7)** describes a **Secure Boot bypass** on E12/E18 allowing a privileged attacker to run patched firmware. All are `Received` at NVD; the linked research repo (VL4DR/PhisonExecutor) was pushed today.

**Why it matters:** This is below-the-OS attack surface: the layer that disk encryption, Secure Boot and OS-level forensics all silently trust. Local-admin-to-controller-code-execution is exactly the escalation path a physical-access or malicious-insider story needs, and firmware fixes arrive on a different clock than OS patches.

[`🔗 CVE-2026-126828 record`](https://www.cve.org/CVERecord?id=CVE-2026-126828) · [`🔗 VL4DR/PhisonExecutor`](https://github.com/VL4DR/PhisonExecutor)

---

## 35. lend: the herdr author's answer to agent credential sprawl — agents borrow your laptop's tools through leases, and never see the secrets

- **Velocity:** ▮ steady
- **Source:** blog.antonio.cx · 52+ pts on HN · 3.2h ago (~09:20 UTC+8)
- **Tags:** `agent-infrastructure` `credentials` `security` `cli`

Since we covered **herdr**, the Rust terminal multiplexer for coding agents, on Nov 12: its author has now published the missing piece — **lend**, a tool built "to let remote agents use tools on my laptop with my approval." The setup: agents run on disposable VMs while the laptop keeps the crown jewels (SSH keys, 1Password vault, logged-in `gh` and cloud CLIs); when an agent needs one, lend mediates the request through leases, keeps "secrets the agent never sees," lets the author see what the agent did afterward, and even answers agent prompts from the laptop. The post is candid about scope: a whole section on "What lend doesn't protect against," plus prior art.

**Why it matters:** The credential problem is the unfashionable half of agent infrastructure — everyone solves it by pasting tokens into VMs. A lease-and-approve model with secrets held outside the agent's reach is the same trust boundary OpenCode's handoff chose on the browser side (item 26), arriving independently in the terminal.

[`🔗 antonio's blog: Running coding agents without handing them my credentials`](https://blog.antonio.cx/running-agents-with-lend) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50526152)

---

## 36. psychic: fzf that learns what you open — a Rust file browser that ranks with an ML model trained on your own usage

- **Velocity:** ▮ steady
- **Source:** klauria.tech · 44+ pts on HN · 13.4h ago (~23:10 UTC+8)
- **Tags:** `cli` `rust` `ml` `developer-tools`

Kshitij Lauria's **psychic** ("like fzf but learns from your actions") is a terminal file browser and `cd` replacement that records which directories you visit and files you open, trains a lightweight ML model on that local data, and ranks results with it — open source (kshitijl/psychic, Rust), with results updating as you type and a UI that renders in under 16 ms. The author's own usage numbers make the pitch concrete: 1,450 opens since October 2025, **1.6 characters typed on average** before the right file is on top, and 29% of the time zero characters — open, hit enter, done. The design rule everything follows: fast enough to update within one frame of a keypress.

**Why it matters:** The per-developer adaptation wave (editors that learn your codebase, shells that learn your commands) has now reached filesystem navigation — and the honest framing ("I'd rather do 10 fast searches … than 1 smart search") is the right constraint for ML-in-the-loop CLI tools.

[`🔗 klauria.tech: psychic`](https://klauria.tech/psychic/) · [`🔗 kshitijl/psychic`](https://github.com/kshitijl/psychic)

---

## 37. Sutra-OS: a self-hosted ontology platform where "AI agents only propose" — every change is a server-enforced proposal until approved

- **Velocity:** ▮ steady
- **Source:** Show HN · 42+ pts · 5.1h ago (~07:30 UTC+8) · 0nelight/sutra-os at 51★
- **Tags:** `ontology` `self-hosted` `agent-governance` `data-lineage`

Show HN today: **Sutra-OS** — "Scarce Units, Typed, Related, Actionable" — an AGPL-3.0 self-hosted ontology platform (beta) that turns an organization's data into one owned model: typed, linked, changed only through rules the server enforces, with lineage tracing every number to its source. Its nine core features read like an agent-governance checklist: one door for every write (an action the server refuses with its reason), **"deciding is not doing" (every change is a proposal until approved)**, **"AI agents only propose"**, model and data on branches, server-enforced access markings, a generated typed API as the model, credentials held by a separate egress agent, and Writer/Calc/Visio-style documents co-edited live on the model. Web apps, Python SDK, CLI, REST API, agents and git all work under the same rules.

**Why it matters:** The idea that an agent proposes and a human approves has been this feed's recurring governance pattern — OmniAgent's approval gate (and its `find`-prefix hole) showed how hard enforcing it is. A platform where the enforcement lives in the server, not in a prompt, is the architectural version of that lesson.

[`🔗 0nelight/sutra-os`](https://github.com/0nelight/sutra-os) · [`🔗 Show HN discussion`](https://news.ycombinator.com/item?id=50525052)

---

## 38. Mem, the AI-native notes pioneer, shuts down January 15 — a category originator closes after five years of pivots

- **Velocity:** ▮ steady
- **Source:** get.mem.ai · 21+ pts on HN · 2.3h ago (~10:15 UTC+8)
- **Tags:** `shutdown` `notes` `ai-native` `saas`

Mem — the AI-native note-taking app whose arc traced the whole category (embeddings-based "Similar Mems" in 2022, generative Smart Write in 2022–23, Mem Chat in 2024, an MCP connector and ChatGPT app in April 2026, a proactive agent reaching into iMessage/WhatsApp/Slack in July 2026) — announced its closure on Nov 16: **notes become read-only December 18, the service shuts down January 15, 2027**, and billing has already paused. Founder Kevin Moody's note pairs the farewell with a migration guide to Apple Notes, Notion, Obsidian and friends, plus an unusually thorough retrospective linking every era's original launch post.

**Why it matters:** Standalone apps built around AI-organized personal knowledge are a category the frontier vendors have been absorbing into their own products — and a shutdown with clean export paths and a published timeline is the goodbye users should demand from every dependency this feed covers.

[`🔗 Mem: Mem is shutting down`](https://get.mem.ai/blog/mem-is-shutting-down) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50526537)

---

## 39. Uber breach: ~150,000 drivers' license data stolen through a tech provider's stolen credentials

- **Velocity:** ▮ steady
- **Source:** techcrunch.com · 26+ pts on HN · 5.9h ago (~06:35 UTC+8)
- **Tags:** `breach` `uber` `third-party` `pii`

Uber is notifying **close to 150,000 drivers** that their personal information and driver's license data were stolen in an **October breach at one of the company's tech providers** (Zack Whittaker, TechCrunch). Per notices filed this week with state attorneys general including California and Iowa: the provider told Uber on October 9 that hackers had broken in and **stole internal credentials**, which were then used to access Uber's data held with that provider. The stolen data includes names, addresses, dates of birth and driver's license information. Uber's own systems are not described as compromised — the breach rode a vendor relationship.

**Why it matters:** The same week the FBI attributed intrusions to an AI pentest platform (item 3), the quarter's recurring pattern holds: the perimeter that fell wasn't the company's — it was a provider's credentials. Vendor credential inventories are the new attack-surface map.

[`🔗 TechCrunch: Uber says hackers stole information on close to 150,000 driver's licenses`](https://techcrunch.com/2026/11/16/uber-confirms-hackers-stole-thousands-of-drivers-license-information-in-data-breach/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50524538)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-17T04:52:33Z |
| Items | 39 |
| Sources tracked | 40 (Hacker News, GitHub Trending, NVD/CVE, vendor blogs, AP/CNN News, FAA, engineering blogs, research groups) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[Previous day](2026-11-16.md) · [Raw .md](https://trending.md/en/feed/2026-11-17.md) · [Archive](../archive/index.md)
