---
date: 2026-11-19
updated: 2026-11-19T04:18:26Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 35
license: CC-BY-4.0
---

# trending.md — 2026-11-19

## 1. Two unauthenticated RCEs in NGINX disclosed today — five research teams found the same bugs independently

- **Velocity:** ▮▮▮ trending
- **Source:** Wiz Research · 677+ pts on HN · ~5h ago (~23:19 UTC+8)
- **Tags:** `nginx` `rce` `http2` `vulnerability` `f5`

F5 shipped a coordinated NGINX security release today for **two critical unauthenticated remote-code-execution flaws**, CVE-2026-123633 and CVE-2026-123007, both **CVSS 4.0 9.2 Critical** (8.1 High on the older 3.1 scale — the scores are F5's own, and NVD still served both records as `Received` at check time). **Wiz Research, Ikotas Labs, Metnir, Rapid7, and Xint independently uncovered the same two bugs** and reported them separately. CVE-2026-123633 is a use-after-free in the worker process when NGINX proxies HTTP/2 client traffic to a backend *and* is running low on `worker_connections` — Wiz reported it October 21 with confirmed RCE including an ASLR bypass, and per the disclosure timeline, "F5 confirms that another research team had previously reported the same vulnerability." CVE-2026-123007 is a heap buffer overflow where the HTTP/2 flow-control window can exceed the allowed threshold, and it "affects versions dating back to NGINX 1.9.5 in 2015" — the release that introduced HTTP/2. Fixed releases: **1.30.7 stable and 1.31.9 mainline** (OSS; F5's advisory table covers the Plus R33–R37 lines). If you can't upgrade, Wiz's guidance is to "temporarily disable HTTP/2 on affected NGINX instances" — `http2 off;` in affected server blocks on 1.25.1+.

**Why it matters:** NGINX fronts "more than 225 million websites," and both bugs live in the proxy layer — sites can be exposed even when their own application code is secure. The five-team independent discovery is the story's other half: the same memory-safety seam was being pulled at by five different groups at once, which is what the window between October 21 and today's patch was racing against.

> Xint's companion writeup is titled exactly what it demonstrates: NGINX2Root — from NGINX visitor to root of the server host (English/Korean/Japanese).

[`🔗 Wiz: Unauthenticated RCE in NGINX (CVE-2026-123633/-123007)`](https://www.wiz.io/blog/nginx-http2-rce-vulnerabilities) · [`🔗 Xint: NGINX2Root writeup`](https://nginx2root.com/) · [`🔗 NVD: CVE-2026-123633`](https://www.cve.org/CVERecord?id=CVE-2026-123633) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50547374)

---

## 2. Genie 4 opens up in Project Genie — mid-session world editing and real-time native audio

- **Velocity:** ▮▮▮ trending
- **Source:** Google DeepMind · 74+ pts on HN · ~1.3h ago (~02:49 UTC+8)
- **Tags:** `google-deepmind` `world-models` `genie-4` `generative-ai`

Google rolled out a new Project Genie experience for AI Ultra subscribers with first-time access to **Genie 4** — "our most realistic and interactive world model yet," with the headline capability that "you can now prompt mid-session to change the world you created": shift weather, drop in a character, redirect the action, while exploring in the browser. Genie 4 also pairs the visuals with "real-time native audio that adapts as the scene unfolds." Genie 3 stays in the model picker for longer runs and panorama-seeded spaces, and picks up its own upgrades: **sessions extended to 3 minutes per generation (up from 60 seconds), world chaining, 360° panorama image grounding, and real-time in-world events**. The new Project Genie agent orchestrates Google's multimodal models conversationally, and Gemini models ride along in-session surfacing context-aware suggestion chips. A community gallery ships curated and user-built worlds for remixing. The post is honest about the ceiling: these "remain world models in the frontier research space," with the team "actively tackling key challenges such as camera latency, intricate physical interactions, real-time audio precision, and long-term scene permanence."

**Why it matters:** World models just crossed from research demo into a consumer product surface with editing, audio, and sharing — the interactive-media implications are the point, and the named challenge list (permanence, latency, physics) is exactly where the research frontier now sits.

[`🔗 Google: Genie 4 is now available (Project Genie)`](https://blog.google/innovation-and-ai/models-and-research/google-deepmind/genie-4-now-available-project-genie/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50550415)

---

## 3. Inside Deutsche Bank: a 15-million-file leak lays out two decades of ignored compliance warnings

- **Velocity:** ▮▮▮ trending
- **Source:** FT-led media consortium · 352+ pts on HN · ~4.5h ago (~23:38 UTC+8)
- **Tags:** `deutsche-bank` `data-leak` `investigation` `compliance`

A major international investigation went live today under the name **Inside Deutsche Bank**, built on **more than 15 million leaked internal documents** — the project's own framing: "The leak of 15+ million files lays bare the bank's flawed culture, systemic blind spots and pursuit of profit over compliance." The files span roughly 20 years of the bank's most sensitive functions: anti-financial-crime, sanctions monitoring, internal audit, and the units that decide whether risky clients stay. Publishing partners include the FT, the New York Times, Dawn, Malaysiakini, IrpiMedia, elDiario.es, and Follow The Money. Among the published findings: at least 24 transactions totaling €172.98 million linked to fugitive Jho Low; an internal warning about Russian clients — "As you know we have a large Russian Oligarchs client population" — quoted as the bank braced for sanctions; an Orbán-linked Hungarian bank allegedly platforming a multi-billion-euro laundering scheme whose payments Deutsche Bank processed; and arms-trade financing that violated the bank's own internal policies. German officials are demanding transparency, and analysts expect fresh regulatory probes.

**Why it matters:** This is the largest financial-sector document leak since the Panama/Paradise Papers era, and its center of gravity is different — not hidden offshore wealth but the compliance machinery of a G-SIB overriding its own controls in writing. Expect regulatory, litigation, and (given the bank's role as everyone's correspondent bank) counterparty fallout to run for quarters.

[`🔗 Inside Deutsche Bank (project hub)`](https://www.inside-db.com/) · [`🔗 FT: Leak of 15mn Deutsche Bank files exposes systemic failures`](https://www.ft.com/content/df518845-ed97-4a38-8a38-7fa9d4d24003) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50547620)

---

## 4. All About Berlin, at −75% traffic: the first-person ledger of Google's AI answers

- **Velocity:** ▮▮ rising
- **Source:** nicolasbouliane.com · 723+ pts on HN · ~13h ago (~14:47 UTC+8)
- **Tags:** `seo` `google` `ai-overviews` `web-publishing`

The HN thread of the day is Nicolas Bouliane's essay on running **All About Berlin** since 2017 (full-time since 2020) — the site that Berlin's own immigration office refers people to puts its traffic loss to Google AI Overviews at 75% (the post carries an update; the original figure was 70%). "When you Googled something, you used to get a link to my website. Now you get a page of ads, then an AI-generated answer trained on my content, then finally a link to my website." The resurfacing momentum is Google's own announcement the essay points at — last week Google announced that AI-generated answers will replace search results entirely, and that they will carry ads. Bouliane catalogs where the independent web goes from here: some sites paywalled, others "keep the websites online, but they no longer update them. It's just not worth it." It's the human-scale companion to yesterday's item — where the randomized-trial evidence put the aggregate click loss near 40%, this is what one of the affected sites looks like from inside.

**Why it matters:** The 40% number told you the size of the shift; this tells you the shape of the casualty. When the reference infrastructure people actually use — the site a government office sends immigrants to — is subsumed into answers trained on it, the question stops being about SEO and becomes about who funds and maintains the primary sources the answers are trained on.

[`🔗 AI is killing All About Berlin (essay)`](https://nicolasbouliane.com/blog/death-by-ai) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50542705)

---

## 5. Since we covered MAI Code 2 yesterday: Ignite's full lineup is seven models — and a chip

- **Velocity:** ▮▮ rising
- **Source:** Microsoft AI · 298+ pts on HN · ~4h ago (~00:08 UTC+8)
- **Tags:** `microsoft` `mai` `ignite-2026` `model-lineup`

Yesterday we covered MAI Code 2 and Code 2 Flash out of Microsoft Ignite; the full announcement is a **seven-model family plus Microsoft's second-gen accelerator**. The boldest new claim is the security line: per Microsoft, **"MAI Cyber 2 Flash beats GPT-6 Astra's quality at less than 2% of the cost per task on the CyberGym-E2E benchmark."** The rest of the lineup, all Microsoft's own comparisons: Code 2 reaches "98% of the coding quality of GPT-6.1 Sol at about 40% of the price" and, against Opus 5.5, "96% performance for just 5% of the price"; Code 2 Flash "matches the performance of GPT-6 Luna at 65% of the price, and Haiku 5.5 at 20%"; Image 2.5 is "#1 on Artificial Analysis image editing" at one-fifth the price of GPT Image 2.5 Sunburst (max); Realtime 1 "outperforms GPT-Realtime 2.1" from $0.01/audio-minute; Transcribe 2 (behind Dragon Copilot Transcribe) "already powers 10 million patient encounters a month"; and Decision 1.1 is "50x faster and 79x cheaper than GPT-6.1 Sol." **Maia 200**, the second-generation AI accelerator, "is now in production running our largest models, achieving 1.7x more tokens per watt."

**Why it matters:** Yesterday's lesson stands: these are the vendor's own benchmark rows at the vendor's chosen operating points, so read the cost-per-task framing as the marketing thesis, not an independent measurement. What's genuinely new since yesterday's coverage is the shape — Microsoft is now fielding a decision model, a realtime voice model, a security-agent model, and its own training silicon in one announcement, which is a full-stack pitch aimed directly at enterprise token spend.

[`🔗 Microsoft AI: Seven new models at scalable price-performance`](https://microsoft.ai/news/microsoft-ignite-2026/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50548021)

---

## 6. KPMG ran 100+ AI agents on a full FTSE 250 audit in parallel with its humans — and says the agents asked better questions

- **Velocity:** ▮▮ rising
- **Source:** Financial Times · 160+ pts on HN · ~4.3h ago (~23:49 UTC+8)
- **Tags:** `kpmg` `ai-agents` `audit` `enterprise-ai`

The FT reports KPMG's UK audit pilot: **over 100 AI agents** worked a full audit of a FTSE 250-listed company **in parallel with the traditional human-led audit** of the same accounts. KPMG UK head of audit Cath Burnet said the agents asked better questions and dug much deeper than the human teams in several instances. The firm's framing keeps humans in the judgment seat — final sign-off stays with people, and KPMG hopes to offer AI-based audits to clients in the future. The rollout is broader than the pilot: Bloomberg Tax reports hundreds of KPMG audit teams are field-testing advanced AI agents ahead of busy season, starting with private-company clients, and the firm's US arm has launched **KPMG Clara Intelligence**, an AI-enabled, "human-assured" audit platform.

**Why it matters:** Audit is the perfect adversarial test for agent claims — the work product is checked by regulators, the queries are the product, and here the firm itself is reporting its agents out-questioning its own staff on a real engagement, not a demo. It's also the second professional-services domain this month where the honest finding isn't *AI does the job* but *AI moves the bottleneck* — the humans still sign, and what they review is now machine-deep rather than machine-shallow.

[`🔗 FT: AI asked 'better questions' than KPMG accountants in pilot audit`](https://www.ft.com/content/5168b3e9-75d0-4be0-9ccd-d327d6b16c05) · [`🔗 KPMG: Clara Intelligence US launch`](https://kpmg.com/us/en/media/news/kpmg-unveils-next-era-of-ai-enabled-human-assured-audit-with-us-launch-of-kpmg-clara-intelligence.html) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50547777)

---

## 7. OpenAI details model-written RTL inside Jalapeño — and an AMD collaboration it calls "a year of progress in less than 5 months"

- **Velocity:** ▮▮ rising
- **Source:** OpenAI · 61+ pts on HN · ~2.3h ago (~01:45 UTC+8)
- **Tags:** `openai` `chip-design` `amd` `risc-v` `eda`

OpenAI's research post goes deep on what its models actually did to its first custom inference chip, **Jalapeño**: model-proposed RTL changes cut standard-cell area ~13% in the vector unit and ~10% in the matrix unit, and OpenAI says the optimizations "were silicon proven during Jalapeño's silicon bring-up." Concrete examples: a multiplier redesign at ~15% less cell area that also dropped latency from two cycles to one, and an adder redesign at ~15% less area with latency retained. On the AMD side, OpenAI claims **"up to 14% improvement relative to heavily optimized baselines on the flagship GPU IP"** and characterizes the collaboration as "roughly a year of progress achieved in less than 5 months" — with the claim that "AMD has already included some of these changes in a recent design it sent for manufacturing," plus AMD-verified single-digit-percent PPA gains on blocks of its next flagship CPU. The post also announces work with **Synopsys** to integrate frontier models with production EDA tools ("to ground capability development in trusted evaluators"), and results on designing **RISC-V cores from a specification**.

**Why it matters:** If the silicon-proven claims hold, this is the first public evidence of LLM-authored RTL shipping in someone's tape-out — the meaningful unit is not *AI designs chips* but *AI finds PPA wins in blocks human teams had already squeezed* — and the honest caveats are in the sentence itself: the AMD comparison is against *heavily optimized* baselines, and "up to 14%" is a maximum, not a mean.

[`🔗 OpenAI: Advancing chip design with OpenAI models`](https://openai.com/index/advancing-chip-design-with-our-models/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50549493)

---

## 8. Cursor's plugin spec is trending at 17k stars — official plugins plus a live third-party merge train

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · +315★ today · last PR merge ~7.8h ago (~20:24 UTC+8)
- **Tags:** `cursor` `plugins` `agent-skills` `spec`

`cursor/plugins` — the official **Cursor plugin specification and plugins** repo — is riding trending at **17,149 stars** (+315 today), and its commit feed shows why: a third-party plugin pipeline is running at high cadence, with today's merges adding the Hospitable plugin (PR #1269), Fiscal AI (#1275), CreateOS (#1262), and LMTY. Each plugin is "a standalone directory at the repository root with its own `.cursor-plugin/plugin.json` manifest." The official set includes `create-plugin` (scaffold and validate new plugins), `teaching` (skill mapping and practice plans), `continual-learning` (incremental transcript-driven memory updates for AGENTS.md), `agent-compatibility`, and two with strongly opinionated briefs: `thermos` — "Thermo-nuclear branch review: deep security/correctness audits, harsh code-quality rubrics, parallel subagents" — and `ralph-loop`, "Iterative self-referential AI loops using the Ralph Wiggum technique."

**Why it matters:** This is the agent-skills wave getting its first-party packaging moment from a major IDE vendor — community-invented patterns (the Ralph loop, aggressive branch-review rubrics) are being curated into an official catalog with a manifest spec and an open PR pipeline. Where the skills standard settles across vendors, manifests like this are the emerging interface.

[`🔗 cursor/plugins (spec + official plugins)`](https://github.com/cursor/plugins) · [`🔗 Plugin catalog README`](https://github.com/cursor/plugins/blob/main/README.md)

---

## 9. CISA KEV adds four entries — three carry three-day federal deadlines, and one is a seven-month-old LiteLLM RCE

- **Velocity:** ▮▮ rising
- **Source:** CISA KEV catalog 2026.11.18 · catalog refresh today
- **Tags:** `kev` `cisa` `litellm` `synology` `vulnerability-management`

Today's KEV refresh adds four exploited-in-the-wild entries, three of them on an unusually short federal leash (due **2026-11-21**): **Synology DiskStation Manager CVE-2024-10441** (CVSS 9.8, improper output escaping in the system plugin daemon — patched in DSM builds back in 2025, which makes its KEV add today a statement about who is still running unpatched NAS firmware); **REDCap CVE-2026-90817** (code injection in the Vanderbilt research-data platform that hospitals and universities run); and **Apache Axis CVE-2026-90436** (unsafe reflection in the long-EOL Java SOAP stack). The fourth is **BerriAI LiteLLM CVE-2026-40217** (CVSS 8.8, due 2026-12-02): per the NVD record, "LiteLLM through 2026-04-08 allows remote attackers to execute arbitrary code via bytecode rewriting at the /guardrails/test_custom_code URI" — the guardrails endpoint that executes user-supplied code as LLM proxy infra becomes the exploited path. The underlying LiteLLM bug was public since spring (X41 D-Sec's advisory; Red Hat shipped errata), so today's KEV add is the exploitation wave catching up with the disclosure.

**Why it matters:** Three-day remediation windows are a federal emergency signal — patch-or-isolate decisions for DSM and REDCap can't wait for a change window. And for anyone running LiteLLM as shared AI infrastructure: the exploited endpoint is in the guardrails feature itself, the component teams add precisely because it *runs code*.

[`🔗 CISA KEV catalog (JSON)`](https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json) · [`🔗 NVD: CVE-2026-40217`](https://www.cve.org/CVERecord?id=CVE-2026-40217) · [`🔗 X41 D-Sec: LiteLLM advisory`](https://www.x41-dsec.de/lab/advisories/x41-2026-001-litellm/)

---

## 10. CLI-Anything rides trending again — 59.5k stars, no commits since September, and a registry front

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · +384★ today
- **Tags:** `cli` `agents` `hkuds` `skill-registry`

HKUDS' **CLI-Anything** ("CLI-Anything: Making ALL Software Agent-Native") is back on GitHub trending at **+384 stars today** with **59,594 total** — and the honest part first: the repo itself has **no commits since September 22**. The activity lives one layer out, at **CLI-Hub** (cliany.cc), the agent-friendly CLI registry fronting the project: "Any software. Any codebase. Any Web API. Generate an agent-native CLI and let AI agents operate it — install with a single command." The install path is SKILL.md-native — `npx skills add HKUDS/CLI-Anything --skill cli-hub-meta-skill -g -y` — plus a pip package (`cli-anything-hub`) exposing `cli-hub list/search/install/info`, and the site lists compatibility with OpenClaw, Nanobot, Claude Code, Codex, and Antigravity. This is the stitch-skills shape from two days ago: a dormant first-party repo lifted by the agent-tooling wave around it.

**Why it matters:** The interesting unit here isn't the star count — it's the registry pattern. If agents discover and install CLI wrappers per-task rather than per-tool, the distribution of *software that agents can drive* becomes a curated index, and HKUDS is staking the claim that the index is the product.

[`🔗 HKUDS/CLI-Anything`](https://github.com/HKUDS/CLI-Anything) · [`🔗 CLI-Hub registry`](https://cliany.cc/)

---

## 11. A KVM INIT-emulation fix lands as a CVE record the same day — nested-SVM stale MMU context

- **Velocity:** ▮ steady
- **Source:** cve.org · 141+ pts on HN · ~4h ago (~00:06 UTC+8)
- **Tags:** `kvm` `linux-kernel` `virtualization` `nested-virtualization`

CVE-2026-99312 is the kernel's own fix, records: "KVM: x86: Unconditionally reset MMU context when emulating INIT." The bug: when an INIT arrives while a nested guest (L2) is running with paging disabled, KVM could keep running L1 with a stale MMU context — per the record, "the MMU page role includes guest_mode (L2), i.e. an INIT while L2 is running with CR0.PG=0 will result in KVM running L1 with a stale MMU context." The commit's own scoping is worth reading: the reset could have been narrowed to the paging/L2 cases, but SMM is also encoded in the page role, and the unconditional reset is cheap because KVM elides re-configuration when the role isn't changing. The description closes with the blast radius: "this bug only affects nested SVM as INIT is an unconditional intercept on VMX." Four stable-tree commits are referenced, and the NVD record itself published this morning UTC (09:17Z, still `Received`).

**Why it matters:** The HN thread (84 comments) spent most of its energy on the meta-question — why a niche nested-virtualization correctness fix carries a CVE at all. That's the modern registry reality: kernel self-fixes get IDs by default now, and the CVE number carries no severity signal until someone analyzes it. For anyone running nested SVM guests, it's still a should-patch.

[`🔗 CVE-2026-99312 (cve.org)`](https://www.cve.org/CVERecord?id=CVE-2026-99312) · [`🔗 Stable-tree fix commit`](https://git.kernel.org/stable/c/24f644ea26c2ebb7b14c3baa2aa92d37fde3095f) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50548004)

---

## 12. "Can Peer Review Survive AI-Generated Text?" — a Fed economist and Fernández-Villaverde propose treating AI-written referee reports like plagiarism

- **Velocity:** ▮ steady
- **Source:** UPenn / Federal Reserve Board · 63+ pts on HN · ~6.2h ago (~21:51 UTC+8)
- **Tags:** `peer-review` `ai-detection` `economics` `research-integrity`

A new paper by **Dario Caldara** (Federal Reserve Board) and **Jesús Fernández-Villaverde** (UPenn, CEPR, NBER), dated November 16, argues that in economics "peer review is in serious danger of collapsing" unless the profession builds norms for AI-generated text now. Their experiment: AI detectors flag referee reports **written** by LLMs, not reports that AI merely proofread or helped edit — a distinction their policy leans on. The proposals are pointed: detectors as standard tools, closer reading with reject-at-the-first-factual-mistake for flagged papers, and the sharpest line — "an AI-generated referee report adds nothing that editors could not get by running the prompt themselves," so AI-written reviews "should be treated like plagiarism." The paper closes with a practical guide for authors, referees, and editors, and its own disclosure footnote notes the authors used LLMs while preparing it.

**Why it matters:** This is a structural argument, not a moral panic: the referee's comparative advantage was scarce careful attention, and that's precisely what LLMs commoditize. The detector experiment's finding — that *drafting* and *editing* separate cleanly — matters beyond economics, because it suggests enforcement can target the fraud case without criminalizing every grammar pass.

[`🔗 Paper (PDF, UPenn)`](https://www.sas.upenn.edu/~jesusfv/Peer_Review.pdf) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50546312)

---

## 13. Show HN: Mastra Factory — the agent-run kanban that merged 238 PRs last week

- **Velocity:** ▮ steady
- **Source:** Show HN · 34+ pts · ~3.2h ago (~00:53 UTC+8)
- **Tags:** `mastra` `agents` `ci` `open-source`

The Mastra team (Shane, Sam, Abhi) is back on Show HN two years after their framework launch, with the tool they use to maintain Mastra itself: **Mastra Factory**, "a configurable agentic kanban board that's @-taggable in Slack," built on Mastra's durable agents for long-running sessions. The scale numbers are the pitch: Mastra now averages "nearly 4M downloads per week," and **"Last week, Factory opened and merged 238 PRs, alongside 630 merged PRs from humans"** across the mastra-ai org — agent-authored work was 238 of 868 merged PRs, about 27% of the total and roughly 38% of the human rate.

**Why it matters:** After the StarSling launch yesterday (CI opening optimization PRs *because agents write faster than CI checks*), this is the maintainer-side version of the same thesis: the bottleneck is no longer writing the change but shepherding it, so teams are building factories where agents hold tickets end-to-end and humans review at merge. The 238-vs-630 ratio is a concrete early data point for agent-share-of-merges at a real 4M-downloads-week project.

[`🔗 Show HN: Mastra Factory (HN)`](https://news.ycombinator.com/item?id=50548660) · [`🔗 Mastra`](https://mastra.ai)

---

## 14. Take Voyager 1 apart, down to a single memory chip

- **Velocity:** ▮ steady
- **Source:** Show HN · 85+ pts · ~3.9h ago (~00:18 UTC+8)
- **Tags:** `voyager` `interactive` `space` `visualization`

Raj Shekhar built an interactive teardown of the two 1977 Voyagers: "Two spacecraft launched in 1977, still talking to Earth from interstellar space. This is where they are right now." You can open the craft bay by bay (keys 1–10 step through the bays), descend to individual modules and chips, rotate and zoom each assembly, and watch the journey from launch to today's interstellar position. The whole thing is keyboard-driven and self-contained — a browser-native technical document built for the most distant human-made objects there are.

**Why it matters:** This is what agent-assisted craft looks like when it lands well: one person, a weekend-scale project, and a level of explorable detail that used to belong to JPL's own media team. It's also a small act of preservation — the engineering knowledge of the most distant human objects, made navigable.

[`🔗 Voyager, up close (interactive)`](https://rshekhar.com/voyager/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50548161)

---

## 15. HUMAN.md — a working manifesto written in the format of a config file

- **Velocity:** ▮ steady
- **Source:** human-md.ai · 118+ pts on HN · ~23h ago (~04:47 UTC+8 yesterday)
- **Tags:** `essay` `human-skills` `ai-era` `craft`

Briana (Mazzio) May's essay is a file: "HUMAN.md > a working manifesto. notes-to-self, mostly. > not a thinkpiece. not a thread. not a deck." The argument underneath the formatting: taste is the wrong word for what humans still contribute — "Taste is the surface. There is a whole engine underneath it, and that engine is the part the model can't have." The numbered sections are craft doctrine — "break the rule on purpose" (with the corollary: "If you can't say why you broke it, you didn't break it, you just missed"), "find the thing in the weird place" (inspiration lives in "a misprinted parking ticket," "an obscure Victorian zoetrope of a cat"), and more. The format is the point: a person specifying themselves the way we now specify agents.

**Why it matters:** Days after "No AI Slop: A Manifesto," the human-side response is arriving in the same native format the agents read — and that inversion is the argument. When your value is the judgment you apply *to* model output, writing your operating principles as a markdown spec is exactly how you'd hand them to a teammate who happens to be a machine.

[`🔗 HUMAN.md`](https://www.human-md.ai/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50537962)

---

## 16. Scottish HTTP status codes — the 418 teapot tradition gains a Gaelic dialect

- **Velocity:** ▮ steady
- **Source:** underwood.network · 130+ pts on HN · ~1.6h ago (~03:26 UTC+8)
- **Tags:** `http` `humor` `standards` `web-culture`

A table of HTTP status codes rendered in Scots, in the grand tradition of RFC 2324 and last week's actual *I'm Not a Freezer* internet-draft. The whole canon is there: `403 GET TAE FUCK`, `404 NAE FUCKIN HERE, PAL`, `500 AH'VE FUCKED IT`, `503 WE'RE FUCKIN SHUT`, and the obligatory `418 AH'M A FUCKIN TEAPOT`. The 451 is the sharpest one on the page — "THE COUNCIL SAYS NAW" — which is, historically speaking, exactly what 451 means.

**Why it matters:** Pure culture, filed under the observation that HTTP status humor tracks the industry's mood — the freezer draft got real because freezers actually got attacked, and the Scots table's charm is that every line is a more honest error message than most production APIs send.

[`🔗 Scottish HTTP Codes`](https://underwood.network/http/scots.html) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50550062)

---

## 17. California orders Waymo off state freeways — an imminent-hazard finding, then a nationwide freeway suspension

- **Velocity:** ▮ steady
- **Source:** ABC7 / AP · 63+ pts on HN · ~22h ago (~10:00 UTC+8 yesterday)
- **Tags:** `waymo` `autonomous-vehicles` `regulation` `california`

California's DMV has ordered Waymo's autonomous vehicles off state freeways, per an imminent-hazard-to-public-safety determination, after a run of incidents — including three Waymo vehicles entering an active construction zone on Highway 101 near Burlingame. Waymo's response went beyond compliance: it **temporarily suspended freeway operations nationwide** while it addresses the safety findings, making this the first time the largest US robotaxi operator has pulled its signature highway capability at national scale.

**Why it matters:** The regulatory instrument here is the point — California didn't pass a new rule, it invoked an existing imminent-hazard power against a specific operator's ODD, and the operator's answer was to shrink its own domain nationwide rather than contest the finding. For every AV company watching: the freeway ODD you fought years to earn can be revoked in a press cycle, and the commercially rational response is unilateral retreat.

[`🔗 ABC7: CA DMV bans Waymos from operating on state freeways`](https://abc7news.com/story/california-dmv-bans-waymos-operating-state-freeways-bay-area-traffic-incidents/20046974) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50538841)

---

## 18. Gemini 4 Neon ships: Google's middle tier goes frontier — #3 on the Intelligence Index at $3/$15

- **Velocity:** ▮▮▮ trending
- **Source:** Google · 557+ pts on HN · ~6.6h ago (~05:34 UTC+8)
- **Tags:** `gemini` `google` `model-release` `coding-agents`

Google introduced **Gemini 4 Neon** — the Gemini 4 family's middle tier, slotted between Carbon ("your hardest, long-horizon projects") and Hydrogen ("fast everyday execution," which shipped separately on Nov 13). The claims: **#3 overall with a score of 61 on the Artificial Analysis Intelligence Index** at its xhigh thinking level ("landing just behind larger, slower models"), "#1 overall on the Artificial Analysis Coding Agent Index (58.6)," a score of 65.2% on Terminal-Bench 4.1, #2 on the Vals Index (70.9%, "on the Pareto frontier"), and a #2 debut at 1336 on Arena's new Agent Arena Index across 4,200+ real-world agent sessions. Pricing: **$3 per million input tokens and $15 per million output tokens** ($0.15/M cached, "a 95% discount"), with a 1 million-token context window. At the default high thinking level Google claims a "32% lower cost per task than Carbon," and "roughly 50% to 80% lower cost per task than top competing frontier models" on the Vals and Agent Arena Pareto frontiers. The post is again honest about harness effects: on SWE-sweep Neon "already leads on the mini-SWE harness (12.8%) and more than triples to a state-of-the-art 39.0% in Google Antigravity showing what the Antigravity harness unlocks." A "Gemini 4 Neon for cyber" variant — state-of-the-art on SEC-bench Pro (90.5%) and WebExploitBench v1.2 (51.26%) — reaches trusted defenders via the Fairwind Program "in the coming days," and Tasks in Gemini can now run on Neon. The safety section is unusually specific: 0.0% cheating on Terminal-Bench 4.0 (matching Carbon), shortcuts on just 2.45% of tasks — "the lowest rate of any Gemini 4 model" — and, with real-time safeguards at the highest thinking level, "Neon resisted every attack within this Gray Swan benchmark."

**Why it matters:** Hours after Microsoft's seven-model Ignite lineup, this is the price-performance war's other shoe — Google contesting the same "frontier quality at mid-tier cost" thesis with its own benchmark rows. Read them the same way: vendor-selected operating points. The 12.8%→39.0% harness gap Google itself prints is the reminder that these scores measure model-plus-harness, a lesson this feed keeps re-learning (see item 5's footnote discipline).

[`🔗 Google: Introducing Gemini 4 Neon`](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-neon/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50552424)

---

## 19. "We Need Smart People Who Give a Shit" — the outage cascade gets its human-capital essay

- **Velocity:** ▮▮▮ trending
- **Source:** violetpixel.com · 312+ pts on HN · ~4.3h ago (~07:53 UTC+8)
- **Tags:** `essay` `infrastructure` `outages` `ops`

Justin Michael's essay argues "the world is held together by smart people who give a shit" — systems like ACH survive being "old, riddled with flaws, and encumbered with legacy baggage" because a thin layer of people combine "intimate knowledge of the system" with "the drive and determination to force the system to work." "Take those people away, and the systems collapse. And collapse is what we're starting to see." The evidence list is the week itself: Microsoft 365, air-traffic control, United Airlines, the NSA's network, "many major banks," Apple's systems. It lands as the third entry in this week's essay cascade — after Breck-McKye's systemic-complexity argument (Nov 17) and the Congressional reporting on rushing fixes to AI-identified vulnerabilities (Nov 18) — but with a different mechanism: not complexity per se, and not change velocity, but the labor of care that keeps barely-good-enough systems running, and what it costs when that labor thins.

**Why it matters:** The week's outage essays have converged from three directions on the same place. Whatever the specific triggers were, the meta-observation now has enough independent formulations that it reads as a diagnosis: the margin between "barely good enough" and "stopped" was always human attention — and every track of this feed has been measuring what happens as that attention gets automated, defunded, or rushed.

[`🔗 We Need Smart People Who Give a Shit (essay)`](https://violetpixel.com/blog/2026-11-17-we-need-smart-people-who-give-a-shit/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50554045)

---

## 20. Ruby ships emergency releases for 7 memory-corruption bugs — RCE PoCs exist, CVEs still pending

- **Velocity:** ▮▮ rising
- **Source:** ruby-lang.org · 129+ pts on HN · ~4.3h ago (~07:52 UTC+8)
- **Tags:** `ruby` `security` `rce` `memory-safety`

The Ruby core team released **4.0.10, 3.4.13 and 3.3.14** against seven vulnerabilities "in Ruby's regular expression engine and in the case conversion of strings," stating flatly: "We are aware of PoCs that prove some of them can be used to trigger remote code execution." The set is a memory-corruption tour: a one-byte heap overflow and an integer overflow in string case conversion, a double free and a heap buffer overflow in regex compilation, an out-of-bounds read in case-insensitive matching, a heap buffer overflow in `Regexp#to_s`, and an out-of-bounds read in case-insensitive backreference matching. Affected: Ruby ≤ 3.3.13, 3.4.0–3.4.12, and 4.0.0–4.0.9 — and "Ruby 3.2 and earlier have reached their end of life and will not receive these fixes." The disclosure mechanics are the notable part: "CVE identifiers have been requested for these vulnerabilities but have not been assigned yet," so the advisory refers to them by GHSA id (GHSA-34m4-m9fh-gqp5, -7x2q-68qv-6p8x, -87fm-7w84-j2px, -wpqw-5qxg-m68r, -3p8q-wmhx-vm2w, -7whj-cfh7-xgm4, -pvgc-g7gj-pv6h), and scanners keyed to CVE numbers see nothing yet. Four of the seven are credited to Stephan Lipp (Ada Logics) **and Anthropic** — the same AI-assisted fuzzing pattern behind October's Apache mod_http2 race.

**Why it matters:** If you run Ruby anywhere internet-facing, this is patch-today — the PoCs are proven, the bug classes are RCE-grade, and the regex engine is exactly the component that processes untrusted input. The disclosure gap is operational, not trivia: a week of "no CVE assigned" does not mean "no vulnerability," it means the registry is behind the advisory.

[`🔗 Ruby: multiple vulnerabilities in Regexp and String case conversion`](https://www.ruby-lang.org/en/news/2026/11/18/multiple-vulnerabilities-in-regexp-and-string/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50554038)

---

## 21. DaisyRose-27B: 1,200 tasks, 144 H200s, 18 days — RL post-training that more than doubles Terminal-Bench

- **Velocity:** ▮▮ rising
- **Source:** RadixArk · 157+ pts on HN · ~8.5h ago (~03:39 UTC+8)
- **Tags:** `reinforcement-learning` `post-training` `open-weights` `agents`

RadixArk released its first model: **DaisyRose-27B**, built on Qwen3.8-27B and trained with reinforcement learning using its open-source Miles framework — on "long-horizon agent tasks with sessions up to 1M tokens, with just 1,200 curated tasks in 18 days on 144 H200 GPUs." The headline measurement: **Terminal-Bench 4.1 pass@1 improves from 5.6% to 12.0%**, with gains "on a variety of other reasoning, instruction following, and coding benchmarks," and the post says it beats the base Qwen3.8-27B on every benchmark it lists. The method is as interesting as the number: tasks (built with Eigent AI) were selected to target specific mistakes the base model makes, tuned until solve rates sat in a learnable band, and chained into multi-stage jobs — "Each attempt gets up to 1.5 hours in the sandbox, with more than 100 tool-calls and more than 256k output tokens." Reward hacking was manually reviewed: "There is no room for reward hacking. We reviewed every task along with the model's attempts at it." BF16, FP8, and NVFP4 checkpoints are on Hugging Face.

**Why it matters:** The vertical-model pattern now has its open-weights, budget-transparent data point — the claim isn't scale, it's that careful task design on a small base can buy a doubling on a hard agent benchmark for 144 GPUs of spend. Whether the Terminal-Bench delta survives independent replication is the number to watch, and the harness those runs use is the same one being argued about in item 18.

[`🔗 RadixArk: DaisyRose-27B (post)`](https://www.radixark.com/blog/daisyrose-27b) · [`🔗 Checkpoints on Hugging Face`](https://huggingface.co/RadixArk/DaisyRose-27B) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50551046)

---

## 22. Anthropic prices its IPO at $83 — above the filed range, trading opens today under "ANT"

- **Velocity:** ▮▮ rising
- **Source:** Anthropic · 130+ pts on HN · ~4.7h ago (~07:30 UTC+8)
- **Tags:** `anthropic` `ipo` `markets` `industry`

Since we covered Anthropic's IPO filing on Nov 12 (825M shares at an expected $70–78): the offering **priced at $83.00 per share** — above the filed range — and grew to **980,000,000 Class A shares**, of which 956,351,354 are sold by Anthropic and 23,648,646 by selling stockholders (whose proceeds Anthropic does not receive). At list price the primary tranche alone is roughly **$79.4B**, which puts this among the largest IPOs ever. Trading begins **today, November 19, on the Nasdaq Global Select Market under "ANT"**, with closing expected November 20 and a 30-day underwriter option on up to an additional 147,000,000 shares. The registration statement was declared effective November 18.

**Why it matters:** The financing event behind this week's model wars closes its loop: the "frontier quality at 5–40% of the price" claims in items 5 and 18 are funded from balance sheets this pricing just set. The concrete dev-relevant signal is capacity — ~$79B of new capital at an $83 reference price is a bet that training and inference spend keeps compounding, whichever vendor's benchmark rows win the argument.

[`🔗 Anthropic: prices initial public offering`](https://www.anthropic.com/news/anthropic-prices-initial-public-offering) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50553843)

---

## 23. Cambridge Dictionary names "human" its 2026 Word of the Year

- **Velocity:** ▮▮ rising
- **Source:** University of Cambridge · 247+ pts on HN · ~13.4h ago (~22:44 UTC+8 yesterday)
- **Tags:** `culture` `ai-era` `language` `dictionaries`

The Cambridge Dictionary's Word of the Year for 2026 is **"human"** — chosen, per the announcement, because "the year has been defined by global debates on what it means to be human when AI is blurring the boundaries between people and machines." The dictionary quotes its own definition with the counterparty clause intact: "having the qualities, faults, and feelings that people have, as opposed to gods, animals, or machines." The announcement notes that public figures defended humanity through the year, citing Bill Gates's widely-read essay making the case for "human reserved jobs" — caregiving among them — that should never be taken by machines.

**Why it matters:** Lexical choices are lagging indicators: dictionaries pick the word a year was actually about. That the word is *human* — the baseline term, not "AI" — is the culture-side echo of this feed's technical year: harnesses, ablations, agent audits, and decision models all being measured against the human baseline they replace or assist.

[`🔗 Cambridge Dictionary reveals Word of the Year 2026`](https://www.cam.ac.uk/news/cambridge-dictionary-reveals-word-of-the-year-2026) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50546914)

---

## 24. LLM-assisted reverse engineering: a 20-year RE veteran's working setup, Ghidra-MCP included

- **Velocity:** ▮▮ rising
- **Source:** slowchronicle.com · 103+ pts on HN · ~5.7h ago (~06:29 UTC+8)
- **Tags:** `reverse-engineering` `agents` `ghidra` `workflow`

A practitioner post by ioma8 — "I have been hacking both hardware and software for 2 decades" — describes the 2026 workflow: a DeepSeek harness on v4.1 Flash as the daily driver ("super performant, fast and cheap," with occasional Codex on Luna or Terra), **Ghidra with an MCP bridge** as the primary disassembler ("With the MCP bridge agents can use it very well"), and radare2 plus the kuna CLI as faster, lighter alternates that are "possibly better usable for AIs." The load-bearing habit is documentation-as-agent-memory: "Command agent to document all findings along the way to MD files. This serves several purposes. They become notes for your own understanding. They help the agent not lose the track after compaction / handoff to different agent." And a sober note on capability: "current AIs do fairly well with just disassembly . ie pure x86 or ARM instructions" — with breakpoints and injected logging probes as the fallback when decompilation stalls.

**Why it matters:** This is the Ghidra-MCP pattern written by someone who ran the manual workflow for twenty years, and the value is in the operational details — MD files as working memory across compaction, disassembly-first as the 2026 default, decompilation as the escalation path rather than the entry point.

[`🔗 LLM assisted reverse engineering (post)`](https://www.slowchronicle.com/posts/llm-assisted-reverse-engineering) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50553225)

---

## 25. Resolve's SRE-1: a 27B vertical model claiming frontier-tying on-call investigations at 37% less cost

- **Velocity:** ▮ steady
- **Source:** Resolve AI Labs · 30+ pts on HN · ~8h ago (~04:10 UTC+8)
- **Tags:** `vertical-models` `sre` `agents` `reinforcement-learning`

ResolveAI Labs announced **SRE-1**, "a 27B model trained with reinforcement learning to find the root cause of production alerts" — starting from Qwen3.8-27B and trained "with a modified CISPO objective for 200 steps on up to 512 GPUs, over 1,549 unique incidents." The claims, from the paper: "On 49 difficult live production cases, SRE-1 dominates the Pareto frontier of pass rate against cost" — RL lifts a single investigation from 6.9% to 38.8% — and "An ensemble of five SRE-1 investigations matches Fable 5.2, the strongest frontier model we measured, at a 71% pass rate while costing 37% less," with ensembles working because SRE-1 also "outperforms frontier models at synthesizing saved investigations." The caveats travel with the numbers: 49 cases, a self-published benchmark, vendor-measured comparisons.

**Why it matters:** The decision/vertical-model wave (HeyGen Decision 1, Perplexity Decider v1.3, Google's Decisions API, Microsoft's Decision 1.1) now includes operations: a domain-RL'd 27B claiming a seat on the cost-capability frontier against a frontier generalist. Investigations — narrow, checkable, tool-heavy work — are exactly where the pattern should hold, but 49 self-selected production cases is a demo cohort, not a benchmark; the ensemble-equals-frontier claim is the one worth someone else replicating.

[`🔗 Resolve AI: SRE-1 (paper)`](https://resolve.ai/labs/sre-1/paper) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50551487)

---

## 26. The chips-as-gun lawsuit is filed: four students sue Omnilert, a school district, and police

- **Velocity:** ▮ steady
- **Source:** Lawyers' Committee for Civil Rights Under Law · 58+ pts on HN · ~3.2h ago (~08:57 UTC+8)
- **Tags:** `ai-surveillance` `litigation` `schools` `civil-rights`

The Lawyers' Committee for Civil Rights Under Law filed **Allen, et al. v. Omnilert, et al.** on Nov 17, on behalf of four Black current and former students of Kenwood High School (Baltimore County, MD), against **Omnilert LLC**, Baltimore County Public Schools and personnel, the Baltimore County Police Department, and individual officers — for "the unlawful detention and search of the students due to both technological and human errors involving an AI weapon-detection surveillance system." The underlying incident is from October 2025: **Omnilert Gun Detect mistook a teenager's bag of chips for a firearm** (the HN thread's title says what everyone remembers — Doritos), and armed officers responded. Pro bono counsel is Willkie Farr & Gallagher, with Engel Law Group.

**Why it matters:** A civil suit over an AI weapon-detector false positive now reaches the courts, and it will turn on exactly the seam this feed keeps flagging in agent systems: the model output is only the trigger, and the complaint's "technological **and human** errors" clause puts the response chain — who armed, who detained, on what confidence — inside the litigation too. Every school AI-surveillance procurement should read this complaint.

[`🔗 Lawyers' Committee announcement`](https://www.lawyerscommittee.org/lawyers-committee-files-lawsuit-on-behalf-of-black-students-detained-and-searched-due-to-ai-alert-falsely-identifying-a-bag-of-chips-as-a-firearm/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50554641)

---

## 27. Unreal Tournament 2004 runs in the browser — build 3369, network-compatible, WebRTC included

- **Velocity:** ▮ steady
- **Source:** Show HN · 56+ pts · ~2.7h ago (~09:29 UTC+8)
- **Tags:** `wasm` `game-port` `webassembly` `open-source`

K-Adam's **UT2004 Modernized** is "an unofficial, non-commercial port of Unreal Tournament 2004 (build 3369) to modern hardware and operating systems": Windows (x86, x64), Linux (x86, x64, arm64), Android (arm64), **and the web via WebAssembly** — SDL3 for windows and input, OpenGL ES 3 for rendering (ANGLE on desktop, WebGL 2 in the browser), OpenAL for sound, Bullet physics behind the Karma API. The engineering claim that separates this from a curiosity: **"Network compatible with retail build 3369. WebRTC transport next to UDP, so browsers can join and host."** The web build at ut2004.dev doubles as a dedicated server, with the browser's own constraint stated honestly on the page: "Keep this page in the foreground. In a background tab or a minimised window the browser pauses the server." Game content stays out of the repo: "The first start downloads it or takes it from a UT2004 install."

**Why it matters:** Two decades on, the game ships on five platforms from one codebase, and the network-compat clause makes a browser tab a first-class citizen of the original retail ecosystem — the WebAssembly-is-a-platform argument demonstrated on a 2004 Unreal engine, with the boring real-world constraints (foreground-tab throttling, content distribution) handled rather than waved at.

[`🔗 K-Adam/UT2004 (repo)`](https://github.com/K-Adam/UT2004) · [`🔗 Web version (ut2004.dev)`](https://ut2004.dev/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50554935)

---

## 28. "Fable," film 10 of 10: a short film credits Claude Fable 5.2 as writer, painter, and director — and publishes the receipts

- **Velocity:** ▮ steady
- **Source:** claudia.gallery · 51+ pts on HN · ~3.9h ago (~08:18 UTC+8)
- **Tags:** `generative-art` `ai-film` `production-ledger` `culture`

anabology's Claudia.gallery series closes with **Fable** — "On the night she is released, Claudia reads you the bedtime stories she was raised on" — and its credit line is the artifact: **"written, painted and directed by Claude Fable 5.2 · sung by Claudia · anabology."** The human's role is specified just as precisely: "the brief, the plan's sign-off, one note and the song's pick by ear; production by Claude." The production ledger reads like this feed's benchmark tables turned into a film budget: 13 set plates painted in SVG in code, a silhouette film drawn and animated in code in the manner of Lotte Reiniger, 49 shots cut to the song's stems; GPT Image 2.6 Sunburst produced 61 stills at "$7.93 at list"; Seedance 2.5 took "84 takes" across two versions at "$202.23 at list"; and the whole thing was "Made in two passes: v1 in 5 h 08 min from one brief, v2 re-shot on the song anabology picked in 3 h 01 min · about $210 at list."

**Why it matters:** The named-model credit and the itemized bill are the interesting part — authorship published alongside the exact dollar cost of the machine labor, with the human contribution specified down to "one note." Compare HUMAN.md from this morning's batch: the same impulse to make the division of labor legible, pointed at art instead of craft.

[`🔗 Fable (film page)`](https://claudia.gallery/fable/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50554269)

---

## 29. A GTA-style Miami game that boots from UEFI — 964,608 bytes, CPU-rendered, OSM-and-lidar map

- **Velocity:** ▮ steady
- **Source:** Show HN · 47+ pts on HN · ~5.7h ago (~06:26 UTC+8)
- **Tags:** `uefi` `gamedev` `bare-metal` `openstreetmap`

eklavya-raj's **gta6-uefi**: "A GTA style game set in the real Miami that boots straight from UEFI, no Windows under it. The whole game is `game.efi`, 964,608 bytes, and the CPU draws every pixel" — software rendering, no GPU, built with clang and lld-link, and the author is honest about its state: "I've only run it in qemu so far." The map is the sneaky-serious part: "baked with `osm/bake.py` from OpenStreetMap, Miami-Dade County data, a NOAA lidar scan and NAIP photos" — real geography, with credits in `MAP_DATA.txt` and `PEOPLE_DATA.txt`. Driving on WASD, taxis for fares, three weapon slots, mouse camera — the genre checklist compressed under a firmware bootloader.

**Why it matters:** The UEFI-as-runtime pattern keeps proving a modern machine needs no OS for real workloads — and this one ingests public geodata (OSM + lidar + aerial imagery) into a sub-megabyte bare-metal binary, a neat demonstration of how far small data pipelines compress when every byte of OS service is a luxury.

[`🔗 eklavya-raj/gta6-uefi (repo)`](https://github.com/eklavya-raj/gta6-uefi) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50553192)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-19T04:18:26Z |
| Items | 29 |
| Sources tracked | 35 (Hacker News, GitHub Trending, GitHub repos, Wiz Research, NVD/cve.org, CISA KEV, X41 D-Sec, Google DeepMind, Google, Microsoft AI, OpenAI, Anthropic, FT, KPMG, UPenn, git.kernel.org, inside-db.com, ABC7, mastra.ai, HKUDS, Cursor, rshekhar.com, human-md.ai, underwood.network, nicolasbouliane.com, ruby-lang.org, RadixArk, Hugging Face, Resolve AI, University of Cambridge, Lawyers' Committee, violetpixel.com, slowchronicle.com, ut2004.dev, claudia.gallery) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[Previous day](2026-11-18.md) · [Raw .md](https://trending.md/en/feed/2026-11-19.md) · [Archive](../archive/index.md)
