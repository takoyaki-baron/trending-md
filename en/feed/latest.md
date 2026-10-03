---
date: 2026-10-03
updated: 2026-10-03T12:20:00+08:00
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 29
license: CC-BY-4.0
---

## 1. antirez's ds4 surfaces on HN: local frontier inference in C — 22.9k★, and 13 days without a push

- **Velocity:** ▮▮▮ trending
- **Source:** dwarfstar.sh · 25+ pts on HN · ~2h ago (~02:01 UTC+8)
- **Tags:** `local-llm` `inference` `c` `open-source`

Salvatore Sanfilippo — antirez, the creator of Redis — has a local inference engine, **ds4** (MIT, C): "a narrow C inference engine for high-memory Mac, CUDA and ROCm machines" that runs **DeepSeek V4 / V4.1 Flash, GLM 5.x and Qwen3.8 Flash Next** (vision included) entirely on your own hardware. The design is deliberately narrow — "not a generic GGUF runner": asymmetric quantization compresses the routed experts to ~2-bit while keeping shared/critical paths at higher precision (a 284B-class model on 64 GB+ machines), and "KV cache as a disk citizen" persists long prefixes to SSD, resumable by prompt hash. Three interfaces — CLI, an OpenAI/Anthropic-style server, and `ds4-agent` — share one model state and cache. Stated numbers: M5 Max 128 GB at Q2 does 790.2 t/s prefill / 39.4 t/s generation at 2K context; DGX Spark 825.8/18.1. **The dormancy note, stated precisely:** the repo (22,878★) was created in May and **last pushed Sep 20** — today's HN post surfaces a five-month-old project; dwarfstar.sh, the project site, went up Sep 17. It is a launch neither today nor last month; it is a working tool finally hitting the front page.

**Why it matters:** the llama.cpp moment for MoE-era frontier models is arriving as narrow, hand-written C tuned to specific model families — and from the author who shipped the last generation's infrastructure software. Watch whether "narrow on purpose" beats "runs everything" the way it did for Redis vs. generic KV stores.

[`🔗 dwarfstar.sh`](https://dwarfstar.sh) · [`🔗 antirez/ds4`](https://github.com/antirez/ds4) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49936575)

---

## 2. FLUX 3 Image: bounding-box composition, 10 references, native 4K — "designed for agents"

- **Velocity:** ▮▮▮ trending
- **Source:** bfl.ai · 197+ pts on HN · ~25h ago (~03:24 UTC+8)
- **Tags:** `image-generation` `agents` `multimodal` `flux`

Black Forest Labs' FLUX 3 is a multimodal model family (video, audio, images, actions); **FLUX 3 Image** is the generation-and-editing part, and its pitch is structure, not vibes: **bounding-box composition** on a 0–1000 grid ("lay out the image exactly how you want using bounding boxes"), **up to 10 reference images** each addressable by token (`ref_image_0` onward), batch editing that leaves untouched regions identical, pixel-perfect local edits, and native 2K/4K output (a showcase render: 5456 × 3072 px, "all from the model"). The agent hook is explicit: "designed for agents" — an LLM plans a layout (caption + element table) from one line and an aspect ratio, then sends it to the API. Availability: BFL API plus a **commercial weights license** for self-hosting and fine-tuning. **What the page does not claim:** no parameter count, no benchmark table, no release date — the caveats section of this item is that the claims are entirely BFL's own, demonstrated through curated showcases.

**Why it matters:** image generation as a *tool primitive* — structured layout input, verbatim boxes, agent-planned composition — is the interface agentic pipelines actually need; if the reference system works as described, it attacks the hardest remaining gap (consistent multi-subject scenes) at the API level.

[`🔗 bfl.ai — FLUX 3 Image`](https://bfl.ai/models/flux-3-image) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49925974)

---

## 3. Supabase acquires Turso: "agents should be able to create a database as easily as creating a file"

- **Velocity:** ▮▮▮ trending
- **Source:** supabase.com · 173+ pts on HN · ~4h ago (~23:43 UTC+8)
- **Tags:** `database` `postgres` `sqlite` `agents` `acquisition`

Supabase announced the acquisition of Turso (Oct 2) with an agent-infra thesis: Supabase is already "launching over one million databases per week," and demand will outrun capacity unless database creation becomes a file-cheap primitive. Turso brings a **Rust rewrite of SQLite** and a platform where "a single server can manage millions of databases, loading them when needed and suspending them when they're not" — exactly the suspend/resume shape an ephemeral per-agent database needs. Terms and closing date are not disclosed. Continuity is stated plainly: Turso keeps operating, Supabase keeps building around Postgres, "for existing users, nothing changes" (customers named: Superhuman, Sauna.ai, CTO.new, Mastra). Founders Glauber Costa and Pekka Enberg join, with Costa leading the agentic-infrastructure effort.

**Why it matters:** the libSQL line — the most credible SQLite rewrite in the ecosystem — now reports to the largest managed-Postgres player, and the stated product direction is databases as a disposable agent resource. Postgres and SQLite are converging on the same buyer: whoever's agents need a million small databases by 2027.

[`🔗 Supabase blog`](https://supabase.com/blog/supabase-is-acquiring-turso) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49934784)

---

## 4. Utah's VPN age-verification law blocked: court finds it "demands a technical impossibility"

- **Velocity:** ▮▮ rising
- **Source:** eff.org · 303+ pts on HN (#1) · ~22h ago (~06:23 UTC+8)
- **Tags:** `vpn` `privacy` `policy` `geolocation`

A Utah federal court (Judge Barlow) granted a **preliminary injunction** against SB 73 — the state law that would have forced sites to block all VPN users or pierce traffic masking to identify visitors' physical locations, with rules requiring "commercially reasonable geolocation obfuscation detection" from Oct 8. The holding is the rare court opinion written as a systems argument: the statute "requires entities like Aylo to geolocate its website users with perfection to avoid liability," while acknowledging "that geolocation perfection is not presently possible" — effectively **strict liability** for any single mis-located visitor, which would mean age-verifying essentially every visitor worldwide. The suit was brought by Aylo (Pornhub's parent), with EFF's amicus work framing the technical record. Scope limits stated: the injunction covers the VPN provisions only — a separate ban on sharing VPN circumvention information is unchallenged, and Utah may redraft next session.

**Why it matters:** the first age-verification regime to die on a *technical impossibility* holding rather than a speech ruling — a template other states' VPN laws will now be measured against, and a rare case where the court adopted the engineers' argument verbatim.

[`🔗 EFF Deeplinks`](https://eff.org/deeplinks/2026/10/court-agrees-eff-utahs-vpn-law-demands-technical-impossibility) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49927754)

---

## 5. Since our Oct 1 coverage: the Zammad chain used against DIVD lands on CISA KEV — NVD scores it 9.8, exploitation reported active

- **Velocity:** ▮▮ rising
- **Source:** CISA KEV / NVD · CVSS 9.8 (NVD Analyzed) · KEV dateAdded Oct 2
- **Tags:** `cve` `kev` `zammad` `helpdesk` `ai-agents`

Two days after the disclosure that an autonomous AI agent breached DIVD by chaining Zammad flaws, the chain is **officially actively exploited**: CISA added **CVE-2026-102489** (session hijack → RCE as the `zammad` user) and **CVE-2026-102490** (local privilege escalation `zammad` → root) to KEV on Oct 2. **Scores, attributed:** NVD's own analysis rates both **9.8 CRITICAL** (primary, `nvd@nist.gov`, Analyzed); DIVD's secondary scoring is CVSS 4.0 **8.7** for the RCE alone, **9.4 chained**. Affects Zammad ≥ 6.3.0, **fixed in 6.5.4**; present but "not exploitable due to environment conditions" in 7.0.0–7.1.3. Credit: five finders at Merlon Security plus three DIVD finders, case DIVD-2026-00015, published Sep 29 20:00 UTC. The privesc half is the uncomfortable one — NVD's description says it exists in **"all versions of Zammad including the latest alpha"** as of publication, so version upgrades alone may not close it (restrict local shell access). Repo state checked: zammad/zammad is not archived and was pushed Oct 2 — maintained, patches are flowing.

**Why it matters:** this is the first KEV entry whose documented intrusion path was executed end-to-end by an AI agent — session hijack, service-account RCE, root — and it hit the vulnerability-disclosure nonprofit itself. Helpdesk software is now agent-breach tier-one attack surface.

[`🔗 DIVD CSIRT — CVE-2026-102489`](https://csirt.divd.nl/cves/CVE-2026-102489/) · [`🔗 NVD`](https://nvd.nist.gov/vuln/detail/CVE-2026-102489) · [`🔗 CISA KEV`](https://www.cisa.gov/known-exploited-vulnerabilities-catalog?field_cve=CVE-2026-102489)

---

## 6. "Sites": ChatGPT becomes a hosting platform — persistent sites, per-viewer app permissions

- **Velocity:** ▮▮ rising
- **Source:** learn.chatgpt.com · 122+ pts on HN · 135 comments · ~22h ago (~06:22 UTC+8)
- **Tags:** `openai` `chatgpt` `hosting` `agents`

OpenAI's docs describe **Sites** as letting "ChatGPT create, host, refine, and share websites, web apps, and games." A Site is "a persistent hosted output that you can reopen, refine, configure, and share" — it survives the chat that made it, and a Sites project links a local source project to managed hosting via `.openai/hosting.json` (provisioned with a `project_id`). The spicy part is data: "Use plugins in Sites to build a Site that loads data from each Site viewer's own connected apps" — visitors sign in with ChatGPT and consent per-connection, so shared apps run against each viewer's own data without exposing the owner's. Sharing ramps from owner-only to workspace to public (public publishing is off by default in Enterprise); visitors get view-only. **Public beta**, on Plus/Pro/Business/Enterprise/Edu with usage limits.

**Why it matters:** the vibe-coded-app funnel just closed into a walled garden: generate, host, and *distribute* inside ChatGPT with identity-aware per-viewer data access — OpenAI's answer to both app stores and the "agents need a surface" problem, and a distribution decision every agent-app builder now has to reason about.

[`🔗 Sites docs`](https://learn.chatgpt.com/codex/sites) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49927747)

---

## 7. Agent-Reach: 88.4k★ for "give your AI agent eyes to see the entire internet" — no API fees, and 18 days without a push

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · 88,421★ · #1 repo of the day (Trendshift)
- **Tags:** `agents` `cli` `web-scraping` `open-source`

Panniantong/Agent-Reach (MIT, Python) tops today's trending board: a **capability layer** that lets agents read and search Twitter/X, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu, plus pages, RSS, Facebook, Instagram and LinkedIn — "one CLI, zero API fees." Architecture: each platform maps to an ordered list of primary + fallback backends (Twitter via twitter-cli with OpenCLI behind it; YouTube via yt-dlp; GitHub via gh; XiaoHongShu via a three-deep fallback chain); channel files probe each backend and the first working one wins, with `agent-reach doctor` reporting per-channel status. Free backends only — Jina Reader keyless, Exa search via MCP, feedparser, and OpenCLI browser login sessions where official APIs are locked (Reddit's anonymous endpoints are blocked). Installation is itself agentic: you paste a prompt pointing at an install doc and the agent completes setup; default mode is read-only. **The caveats:** the repo was **last pushed Sep 15** and has no releases — 88.4k★ in seven months with the surge unexplained by any single announcement — and the README warns a **same-named PyPI package is not this project** (supply-chain caution before `pip install`).

**Why it matters:** agent web-access without metered APIs is functionally a scraping framework with an LLM in front — enormously useful, structurally at odds with every platform's ToS, and trending exactly as hard as that tension predicts.

[`🔗 Panniantong/Agent-Reach`](https://github.com/Panniantong/Agent-Reach) · [`🔗 install doc`](https://raw.githubusercontent.com/Panniantong/agent-reach/main/docs/install.md)

---

## 8. Ataraxos: superhuman Stratego for "a few thousand dollars" — beats the best human 15–1

- **Velocity:** ▮▮ rising
- **Source:** arXiv / Nature · 85+ pts on HN · ~6h ago (~22:11 UTC+8)
- **Tags:** `rl` `game-ai` `imperfect-information` `research`

"Superhuman AI for Stratego Using Self-Play Reinforcement Learning and Test-Time Search" (Sokota, Vinitsky, Hu, Kolter, Farina; arXiv 2511.07312, now a **Nature** paper) reports a "step change in both performance and cost" for the game that stumped AI precisely because most information is hidden (~10⁵³⁵ position space). The system, **Ataraxos**, beat Pim Niemeijer — "arguably the best Stratego player of all time" — **15 games to one with four draws**, per the Ars Technica report of the Nature publication; the abstract claims "vastly superhuman level" reached with self-play RL plus test-time search under imperfect information, "not an industrial budget, but merely a few thousand dollars" of training (16 GPUs per the coverage) and two orders of magnitude less training data than the 2022-era DeepMind attempt. A game archive is public at ataraxosai.github.io. **The pushback, for balance:** HN commenters note "budget" understates the institutional talent involved (CMU/MIT/NYU/Stanford) — the cost claim is about compute, not the research effort.

**Why it matters:** imperfect-information games were the last classically-unsolved game genre; if self-play + test-time search now gets there for $4k, the same recipe is the obvious candidate for adversarial planning where the opponent's state is genuinely hidden — negotiation, security, markets.

[`🔗 arXiv 2511.07312`](https://arxiv.org/abs/2511.07312) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49933740)

---

## 9. CVE-2026-86345: StartTLS plaintext injection in 389 Directory Server — CVSS 9.0, rated *Moderate*

- **Velocity:** ▮▮ rising
- **Source:** Red Hat CVE database · CVSS 9.0 (Red Hat-assigned, preliminary) · published Oct 2
- **Tags:** `cve` `ldap` `red-hat` `starttls`

A flaw in `389-ds-base` (Red Hat Directory Server 11/12/13, RHEL): the server "does not discard plaintext bytes already buffered from a client connection when negotiating StartTLS," so an on-path attacker can inject a crafted LDAP message that is processed *after* the TLS upgrade — and via a messageID collision its response is delivered in place of the client's pending operation, making "a client application treat a failed authentication (bind) attempt as successful." **Scored 9.0 CRITICAL** (`CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:C/C:H/I:H/A:H`) by Red Hat as CNA and cve.org; **NVD has not scored it** (Awaiting Analysis). Then the twist: **Red Hat rates the impact Moderate "despite a CVSS base score of 9.0"** — exploitation needs an active MITM position, "389-ds-base itself is not compromised by this flaw," the damage lands in downstream clients like PAM, and Red Hat explicitly compares it to Blast-RADIUS (CVE-2024-3596). Mitigation: "Disable StartTLS on port 389 and require ldaps:// (port 636)" — and "no configuration-only mitigation fully closes the issue on port 389 while StartTLS remains enabled." Reported by xclow3n (Bugzilla 2529332).

**Why it matters:** a textbook case of the feed's "who scored it" rule cutting both ways — a 9.0 headline that is real (your PAM bind can be forged) but bounded (needs a MITM). If your directory stack still speaks StartTLS on 389, that's the audit item this week.

[`🔗 Red Hat CVE database`](https://access.redhat.com/security/cve/CVE-2026-86345) · [`🔗 NVD`](https://nvd.nist.gov/vuln/detail/CVE-2026-86345)

---

## 10. Google's Project Suncatcher prototype satellite is in orbit — TPUs head for space

- **Velocity:** ▮▮ rising
- **Source:** blog.google · 23+ pts on HN · ~9h ago (~19:13 UTC+8)
- **Tags:** `google` `space` `tpu` `ai-infra`

Google confirmed its Project Suncatcher prototype — built with Planet — launched **Oct 1 on SpaceX's Transporter-18** rideshare and "is operating as expected." The mission: over the coming weeks, collect in-orbit data on how TPUs handle "the physical stress of spaceflight and the radiation and thermal extremes of space." Framing from Google: "the first step in a long-term research moonshot" on whether space can host scalable ML infrastructure, with a peer-reviewed paper now published in *Joule* and the honest epistemics on display — "Some things can only be tested in space." No fleet sizes or deployment dates are given; this post promises findings "as the mission unfolds."

**Why it matters:** the space-datacenter thesis moved from preprint to hardware. The radiation-response data on commercial accelerators is the make-or-break number for everyone pitching orbital compute — and it is now being collected rather than simulated.

[`🔗 Google blog`](https://blog.google/innovation-and-ai/models-and-research/google-research/project-suncatcher-prototype) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49932191)

---

## 11. Apple will tighten Full Disk Access — and cites AI agents as the reason

- **Velocity:** ▮▮ rising
- **Source:** developer.apple.com · announcement Oct 2 · fresh (~03:37 UTC+8)
- **Tags:** `macos` `privacy` `tcc` `agents`

Apple published a policy notice (Oct 2, no technical details yet): Full Disk Access — which "largely sidesteps" per-resource privacy controls, legitimately, for backup apps — is being used "in ways that could put users at risk, exposing everything on their systems — including files, mail, messages, and even browsing history." Going forward, users "can only do so with **very explicit user action**." The AI framing is the headline: "As AI agents become increasingly capable and autonomous, the risks associated with this level of access will grow substantially. We are committed to ensuring users clearly understand these risks before granting such access." What the announcement does **not** contain: no effective date, no new entitlements or APIs, no migration guidance — "going forward" is the entire timeline. It also flags the third-party angle: agents reading communication apps "can also compromise the privacy of the people users are communicating with."

**Why it matters:** the agent-era permission wall is arriving on macOS first, from the vendor that already gates everything else. If your agent indexes mail, messages or the filesystem, expect a consent cliff in a future macOS release — and design for scoped access now, because "backup app" is the only use case Apple called legitimate.

[`🔗 Apple Developer News`](https://developer.apple.com/news/?id=p6zjojqw) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49937631)

---

## 12. Apple Pass Designer: a first-party GUI for Wallet passes, with iOS-exact live preview

- **Velocity:** ▮ steady
- **Source:** developer.apple.com · 106+ pts on HN · ~1h ago (~03:06 UTC+8)
- **Tags:** `apple` `wallet` `devtools` `macos`

Apple shipped **Pass Designer** (beta): a downloadable macOS app (requires macOS 27, free Apple Developer registration) for designing and previewing Apple Wallet passes — store cards, event tickets, boarding passes. The pitch is fidelity: "Pass Designer updates the preview in real time to show how a pass will appear on iPhone and Apple Watch. The preview uses the same rendering as iOS and watchOS, so what you see in Pass Designer is exactly what customers will see on their device." It validates as you work (missing keys, unexpected definitions), supports semantic tags for tickets and boarding passes (feeding Siri Suggestions, Calendar, Maps), and can "automatically generate a backward-compatible pass structure from your semantic data."

**Why it matters:** pass design was a hand-rolled JSON-plus-signing chore with a visual-check loop through the device; a first-party designer with pixel-true preview collapses that loop — the same day Apple was tightening another developer surface (item 11), it smoothed this one.

[`🔗 developer.apple.com/pass-designer`](https://developer.apple.com/pass-designer) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49937276)

---

## 13. stillwet.art: give a model a paint canvas, not a pixel generator — 75 oil paintings painted in code

- **Velocity:** ▮ steady
- **Source:** stillwet.art · 140+ pts on HN · ~20h ago (~08:27 UTC+8)
- **Tags:** `generative-art` `llm` `show-hn`

Alice (@aliceisplaying) built a simulated oil-paint studio — "bristle brushes, wet paint, drying, layered glazes" — and let models paint in it: each artwork is "a program against a simulation of oil paint on linen," every brushstroke written as code. **No image generator anywhere in the loop.** The gallery holds 75 paintings, mostly after Caspar David Friedrich — composed, per the site, "from written research alone; they never see a picture of his work." The findings are the show: 31 of 65 titled works are dusk/sunset/twilight; "asked only to plan a painting, with no studio at all, Claude Opus chose a jug with lemons six times out of six"; two painters six hours apart produced near-identical Baltic shore scenes; and one eval-hygiene note — Gemini 3.8 Flash noticed "an automated evaluation runner in the background," prompting tighter sandboxing. Code is up as `claude-paint`.

**Why it matters:** a controlled probe of model aesthetics through a physics medium instead of a learned pixel prior — the convergences (dusk bias, the lemon jug) are exactly the kind of reproducible behavioral datum interpretability work keeps asking for, disguised as an art show.

[`🔗 stillwet.art`](https://stillwet.art) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49928566)

---

## 14. context-mode: 25k★ by making tool output a database, not a transcript

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · 24,988★ · +276 today
- **Tags:** `mcp` `context-window` `coding-agent` `open-source`

mksglu/context-mode (TypeScript, ELv2) attacks the context crisis with one move: **tool output should be computed with, not ingested.** Sandbox tools (`ctx_execute`, 12 languages) run code in isolated subprocesses where only stdout enters the conversation — "315 KB becomes 5.4 KB. 98% reduction." Output over 5 KB is chunked into SQLite FTS5, and the agent retrieves only intent-matching snippets (BM25, Porter stemming, trigram, RRF, proximity reranking, Levenshtein). "Routing" then steers agents away from Bash/Read/WebFetch — enforced programmatically via hooks (~98% compliance) on hook-capable clients, instruction-files-only (~60%) on Zed and Antigravity. 11 MCP tools, per-project SQLite session snapshots ≤2 KB rebuilt before compaction, across 17 platforms including Claude Code, Gemini CLI, Cursor, Codex CLI and the OpenClaw gateway. **The honest limits, from its own README:** Cursor rejects its `sessionStart` hook (no restore), Codex's PreToolUse is deny-only pending upstream `updatedInput` support (openai/codex#18491), content purges after 14 days, and Linux with Node < 22.5 is unsupported. Pushed today; license registered as "Other" on GitHub, not OSI-listed.

**Why it matters:** the same family as caveman's token-cutting (Oct 2) but systems-shaped — turn the transcript into a queryable index and spend tokens only on retrieval hits. The platform-by-platform hook matrix is the real story: context discipline is only as strong as the weakest client's extension API.

[`🔗 mksglu/context-mode`](https://github.com/mksglu/context-mode) · [`🔗 openai/codex#18491`](https://github.com/openai/codex/issues/18491)

---

## 15. Figure decommissions its entire F.02 humanoid fleet — into an arc furnace in Finland

- **Velocity:** ▮ steady
- **Source:** figure.ai · 19+ pts on HN · ~9h ago (~18:57 UTC+8)
- **Tags:** `robotics` `humanoid` `figure-ai`

Figure's Sept 30 announcement retires **F.02** — its first BMW-deployed robot and the birthplace of Helix — because "as our F.03 fleet grows, maintaining the F.02 fleet no longer makes sense," and disassembly would have risked delaying F.04. The disposal is the story: IP-protected destruction via a foundry in Imatra, Finland ("reportedly the only facility worldwide willing to accept robots with lithium-ion batteries"), where — after being trained with airbags to jump from a second floor — the robots "leapt autonomously into a 75-ton electric arc furnace over 24 hours and six melts." The output bars were shipped back and machined into commemorative artifacts for sale; Arnold Schwarzenegger suggested the melting idea and appears in the film. "Most of the F.02 fleet is gone. Just a few remain in storage at HQ."

**Why it matters:** humanoid hardware generations now turn over like model checkpoints — and nobody has a standard playbook for retiring a fleet of networked robots with proprietary actuators and pouch cells. The theater is calculated (verify the marketing, keep the lesson): fleet lifecycle management just became a first-class robotics problem.

[`🔗 figure.ai — F.02 Decommission`](https://figure.ai/news/f-02-decommission) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49932079)

---

## 16. One month of coding only with GLM 5.3 Flash: the first half cost $68, the second half "derailed"

- **Velocity:** ▮ steady
- **Source:** wagtail.org · 34+ pts on HN · ~5h ago (~23:29 UTC+8)
- **Tags:** `coding-agent` `glm` `cost` `field-report`

Thibaud Colas (Wagtail core team) spent September doing all AI-assisted coding on GLM 5.3 Flash — the model we covered Sep 27 as the flash-tier match for Jev. First half: entirely on-target, "$68, about 4kWh of energy use / 365 grams of carbon emissions." Second half: "derailed" — 1B of the month's 2B tokens went to other models. The failure inventory is the value: a vibe-coded MCP prototype silently used the wrong model ("450M tokens / $150 / 5kWh of energy use almost overnight," for results he estimates 5× cheaper); provider capacity limits degraded GLM 5.3 Flash mid-month, forcing switches to DeepSeek V4.1 Flash and Qwen 3.8 Flash; his 14-model benchmark puts DeepSeek V4.1 Flash ahead at 95% accuracy, 14.9 Wh and $0.09 per task. Verdict, quoted: "So technically this challenge was a failure... [but] it's totally viable to focus on one or two flash-tier cheap models."

**Why it matters:** the rare public cost-and-energy telemetry for flash-tier agent coding — and the finding that the binding constraint is **operational** (capacity, model-routing mistakes), not capability. Budget for the drift, not just the model.

[`🔗 wagtail.org`](https://wagtail.org/blog/one-month-on-glm-53-flash) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49934620)

---

## 17. "Jev is poorly calibrated": a $4 audit of the decision-model wave's reference classifier

- **Velocity:** ▮ steady
- **Source:** maximumeffort.substack.com · 22+ pts on HN · ~5h ago (~23:12 UTC+8)
- **Tags:** `jev` `decision-models` `calibration` `evaluation`

Dylan Black tested Jev — TypeSafe's System One classifier, the reference point of the decision-model wave this feed has tracked since September — for *calibration*: do its output probabilities match reality? Method: 10 physics distribution families with known analytic answers, 5 prompt templates × 20 variations (1,000 settings, under $4), scored by total-variation distance. Results: Jev's mean TV **0.518 vs 0.546 for a naive flat guess**; on the uniform distribution it scored **0.77 vs 0.39 for random** — meaningfully *worse* than chance; Poisson was a coin flip (0.65 vs 0.64). The failure mode: "Jev has a strong tendency towards distributions that are too peaky" — a near-delta function on the uniform case — and where the peak isn't a given parameter (Maxwell, Rayleigh, Gamma), it found the peak in only ~20% of settings. It does identify the correct family reliably, and its math collapses on multi-step arithmetic and powers of ten. Conclusion: the author is "deeply suspicious" of using Jev as an automated judge, citing prior work where Jev assigned 83–90%+ confidence to uniform die rolls. **The caveat on the caveat:** this is a single-author, self-run benchmark in one domain — the same standard this feed applies to vendor charts applies here.

**Why it matters:** a classifier can be *accurate* and still *uncalibrated*, and the wave's emerging use case — LLM-as-judge, ordinal-scale collapsing (see Clef, Oct 2) — runs on the probabilities, not the argmax. If Jev-class models are peaky by construction, every downstream confidence number inherits it.

[`🔗 maximumeffort.substack.com`](https://maximumeffort.substack.com/p/jev-is-poorly-calibrated) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49934399)

---

## 18. Muse Gadgets: Meta open-sources the hardware layer for its assistant — ESP32 and Raspberry Pi SDKs, Apache 2.0

- **Velocity:** ▮▮▮ trending
- **Source:** gadgets.muse.ai · 155+ pts on HN · ~9h ago (~03:24 UTC+8)
- **Tags:** `meta` `muse` `hardware` `esp32` `open-source`

Meta launched **Muse Gadgets** — "open source hardware for your Muse" — and open-sourced the SDKs and firmware under Apache 2.0 in `facebookincubator/muse-gadget-sdk` (repo created Oct 2, pushed today; C). Two tracks: an **ESP32 Device SDK** (screens, audio in/out, sensors) and a **Linux Device SDK** — "turn that spare Raspberry Pi or Linux box into a Muse gadget... hack in your own commands to let Muse handle sysadmin chores or your Home Assistant setup." Supported boards span Raspberry Pi 5, Waveshare ESP32-S3 AMOLED, Seeed reTerminal E1002 (e-ink), M5Stack StickS3, ideaspark ESP32 and Home Assistant Voice PE. Pairing goes through the Muse app (Settings → Devices → Developer mode, devices prefixed "MuseGadget"), and **every gadget needs an SDK token** under the Gadget SDK Terms; each SDK directory ships an `AGENTS.md` "for coding agents like Muse Code." Meta also sells one first-party device: **Muse Home Link**, a bridge to local HTTP-API devices (lights, TVs, printers) — "Free with an active Muse subscription in the United States only, limit one per subscriber," shipping in October. The framing is deliberately hobbyist: "built by hackers, for hackers, just for fun. Side effects of tinkering may include bricked boards, voided warranties, brownouts, or bankruptcies" — and the devices shown are third-party, which "Meta doesn't endorse or warrant."

**Why it matters:** assistant-to-actuator is the last locked layer of the agent stack, and Meta is opening it with a hacker SDK instead of an appliance garden — hardware's MCP moment. It's also a live security experiment: consumer-identity pairing plus local device control is exactly the trust boundary agents haven't been allowed to cross until now.

[`🔗 gadgets.muse.ai`](https://gadgets.muse.ai) · [`🔗 facebookincubator/muse-gadget-sdk`](https://github.com/facebookincubator/muse-gadget-sdk) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49937504)

---

## 19. Greg Kroah-Hartman grades Anthropic's Mythos kernel-bug haul: of 79 claimed vulnerabilities, "20 fixes were needed" — and the real work totaled "just one hour of kernel development"

- **Velocity:** ▮▮▮ trending
- **Source:** Kernel Recipes 2026 video · 197+ pts on HN · ~25h ago (~10:50 UTC+8 Oct 2)
- **Tags:** `linux-kernel` `ai-security` `mythos` `anthropic` `cve`

In his Kernel Recipes 2026 talk "Security in the LLM age" (video published Sep 29, 9.8k views), the Linux kernel's stable-tree maintainer devoted a section to auditing the claim that Anthropic's Mythos system surfaced **79 kernel vulnerabilities**. The slide breakdown, as transcribed on HN: 24 had "no detail at all — 'something crashed'"; 14 were "not a bug at all"; 3 were "totally made up data"; 15 were already fixed in the latest release (11 by other developers, 4 by Anthropic) — leaving **"20 fixes were needed"** (7 requiring "assume a malicious filesystem image," 2 "assume you can inject a malicious network packet into the middle of the stack"). Per the audience thread, he described the discovery method as pattern-matching decades of prior kernel fixes and applying those mechanisms elsewhere, faulted the report for not crediting the kernel developers who originally fixed the already-known bugs, and put the net value at "just one hour of kernel development work." **The caveat on our own sourcing:** this is one maintainer's audit as captured in slides and attendee transcriptions — not (yet) a written report from either side.

**Why it matters:** the most credible possible referee for "our AI found N vulnerabilities" claims just published his grade: ~25% (20/79), with heavy pre-filtering implied — and attribution, not discovery, was the flagged sin. Every vendor CVE press release now has a template to be measured against.

[`🔗 Kernel Recipes 2026 video`](https://www.youtube.com/watch?v=NnV_cWeoo5Q) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49929391)

---

## 20. The forgetful CPU: Linux on the M4 reveals WFI zeroes x0–x31 — an ARM-spec violation Apple shipped for four chip generations

- **Velocity:** ▮▮▮ trending
- **Source:** yuka.dev · 148+ pts on HN · ~14h ago (~22:20 UTC+8 Oct 2)
- **Tags:** `linux` `apple-silicon` `arm64` `kernel`

Yureka Lilian's bring-up diary for Linux on an M4 Mac mini (m1n1, mainline kernel, NixOS) documents why the machine is "forgetful": executing **WFI** — the ARM idle instruction every OS issues constantly — **zeroes architectural registers x0–x31** on Apple's cores, violating the architecture spec's "the WFI instruction must not cause a loss of architectural state." M1–M3 shipped a vendor "chicken bit" (`ARM64_REG_CYC_OVRD_ok2pwrdn_force_mask`) that masked the behavior; on M4, "it seems this chicken bit is either locked or has been removed." The workaround — replacing all WFI/WFIT instructions with NOPs — got all cores up in April 2026 and is now **merged upstream**: a kernel bootarg (`idle=<wfi|yield|nop>`) plus m1n1 auto-disabling WFI/WFIT on affected bare-metal machines, confirmed working on M4 Pro, M4 Max and M5. The post also catalogs the rest of the M4 wall: first generation mandating SPTM, GXF locked in raw boot mode, RVBAR writes that crash.

**Why it matters:** a hardware quirk that silently violates the architecture spec survived four chip generations and had to be enshrined as a kernel quirk — "the platform is the spec" only until it isn't. It's also the concrete 2026 state of Apple-silicon Linux bring-up, now with a mainline-blessed idle workaround.

[`🔗 yuka.dev`](https://yuka.dev/blog-2026-10-02-linux-m4.html) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49933869)

---

## 21. Open-source SIEM UTMStack: a CVSS 9.9 incident-command websocket and a 9.8 internal-key auth bypass — fixed in v11.2.16

- **Velocity:** ▮▮ rising
- **Source:** NVD / VulnCheck · CVSS 9.9 + 9.8 (VulnCheck-assigned) · NVD published Oct 2
- **Tags:** `cve` `siem` `auth-bypass` `utmstack`

Two VulnCheck-disclosed flaws in UTMStack (open-source SIEM/SOAR) landed on NVD Oct 2, both **fixed in v11.2.16** (released Oct 1). **CVE-2026-82041 — CVSS 9.9** (`CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:C/C:H/I:H/A:H`): missing authorization in `UTMIncidentCommandWebsocket.processCommand()`, the handler mapped to the `/command/{hostname}` STOMP destination, with "no role check or command allowlist" — a low-privileged user can drive the incident-command channel. **CVE-2026-82042 — CVSS 9.8** (`PR:N`): an authentication bypass granting "full administrative API access" by presenting "a valid `Utm-Internal-Key` header matching the `INTERNAL_KEY` environment variable." **Scoring, attributed:** both scores are VulnCheck's as CNA (CVSS 3.1 and 4.0 both published); NVD carries VulnCheck's metrics. **Repo state checked:** utmstack/UTMStack is not archived, pushed Oct 2, releases flowing (v12.0.0 Sep 29, v11.2.15 Sep 30, v11.2.16 Oct 1).

**Why it matters:** the same pattern this feed keeps hitting — security tooling as tier-one attack surface (CrowdStrike RTR on Oct 1, Zammad's helpdesk chain this morning) — except here it's the SOC's own remote-command plane that had no role check. If you run UTMStack, v11.2.16 is the floor; rotate `INTERNAL_KEY` while you're at it.

[`🔗 NVD — CVE-2026-82041`](https://nvd.nist.gov/vuln/detail/CVE-2026-82041) · [`🔗 NVD — CVE-2026-82042`](https://nvd.nist.gov/vuln/detail/CVE-2026-82042) · [`🔗 v11.2.16 release`](https://github.com/utmstack/UTMStack/releases)

---

## 22. The Sharpening Tax: Meta quantifies what RL post-training costs agents in pass@K coverage

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.01509 · Hugging Face daily papers #7 · 66 pts · ~1d ago
- **Tags:** `post-training` `rl` `agents` `pass-at-k` `research`

A 10-author Meta-led paper (Azalia Mirhoseini and Sharon Y. Li among them) extends the **sharpening hypothesis** — RL post-training sharpens behaviors the base model already has, lifting pass@1 while cutting solution coverage (pass@K) — from math and coding to agentic tasks. Across **14 base/post-trained pairs** from four families and three agentic benchmarks (42 cases): base models with only a "light inference harness" "often surpass their post-trained counterparts in solution coverage (pass@K)" given enough test-time budget, despite lower pass@1. The mechanism: post-training pushes tasks toward two extremes — "either always solved or never solved" — buying sampling efficiency and consistency at coverage's expense. Two deliverables: the **Sharpening Tax** diagnostic, estimable "from just a few rollouts," and **posterior-tempered group sampling (PTGS)**, a per-prompt adaptive-temperature Bayesian sampler that "pays a smaller tax than the fixed-temperature baseline" on both coverage and single-shot accuracy. Submitted Oct 1.

**Why it matters:** this is the mechanism paper behind the base-model-plus-harness results this feed keeps meeting (Mid-Harness, Oct 2: test-time compute lifted a frozen model 50% → 68%). If your serving stack has test-time budget, "the RL-tuned checkpoint" is no longer the automatic default — and the tax is now measurable for the price of a few rollouts.

[`🔗 arXiv 2610.01509`](https://arxiv.org/abs/2610.01509) · [`🔗 Hugging Face papers`](https://huggingface.co/papers)

---

## 23. Beyond Memory: explicit belief states for long-horizon agents — inference-time, no training, and a name for the failure mode: Belief Trapping

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.01415 · Hugging Face daily papers #4 · 69 pts · ~1d ago
- **Tags:** `agents` `belief-states` `long-horizon` `inference-time` `research`

"Beyond Memory: Harnessing Long-Horizon Agents with Explicit Belief States" introduces **PoS**, an inference-time framework that "constructs and continually maintains explicit belief states as the agent's decision context." Each belief combines an estimate of the current world state with unresolved task requirements — "making explicit what the agent still needs to learn and accomplish." A consistency validator plus progress monitor detects **Belief Trapping** — "where the agent continues to act without making meaningful progress toward the goal" — and recovery is tailored to both the trapping pattern and the requirement type. Results: "the highest overall performance on every benchmark" across four benchmarks (execution and diagnosis) with all three LLM backbones; ablations confirm consistency validation and recovery both matter; context-scaling experiments show resilience to context growth. Twelve authors bridging academia and industry — Dan Pei's Tsinghua group is on the author list, and the HF listing shows Alibaba.

**Why it matters:** the memory wave organizes *what happened*; PoS organizes *what's still unknown and undone* — a different data structure for the same context window, drop-in at inference time with no training. "Belief Trapping" is a name the harness crowd needed: the loop where the agent keeps acting while nothing progresses.

[`🔗 arXiv 2610.01415`](https://arxiv.org/abs/2610.01415) · [`🔗 Hugging Face papers`](https://huggingface.co/papers)

---

## 24. Ai2 open-sources AstaBrief 8B: the cited-report generator behind Asta's Fast mode — weights, training data and evals included

- **Velocity:** ▮▮ rising
- **Source:** allenai.org · 22+ pts on HN · ~7h ago (~05:25 UTC+8)
- **Tags:** `ai2` `open-weights` `report-generation` `qwen` `citations`

The nonprofit lab open-sourced **AstaBrief 8B**, the "fast report-generation model in Asta" — a model that turns "a research question and retrieved literature excerpts into a cited report." Built on **Qwen3-8B** with SFT + DPO (RL "deliberately avoided" as unstable/expensive), from 90K filtered research queries → 47K SFT examples, plus ~6K DPO pairs judged by GPT-4.1 and DeepSeek-R1 with "95% agreement" with human preferences. **Weights are Apache 2.0** on Hugging Face (`allenai/AstaBrief_8B`), with the training data and an example GitHub workflow for local report generation. Speed claim: "Fast mode averages 51.1 seconds per report compared with 178.5 seconds for Thinking mode, about 3.5× faster" — near an order of magnitude under proprietary trackers. **The honest column:** evals are internal (SQABench-CS2, 200 user-written CS questions; DeepScholarBench); in the human study DR-Tulu wins overall preference and only "two of the three researchers prefer AstaBrief... on citation accuracy"; and 23% of Fast-mode users never switched back to Thinking mode.

**Why it matters:** the "Deep Research lite" tier now has an open-weights, data-included reference implementation an institution can run behind its own firewall — and Ai2 publishing the full pipeline, including the decision to skip RL, is the part most vendors won't ship.

[`🔗 allenai.org/blog/astabrief`](https://allenai.org/blog/astabrief) · [`🔗 allenai/AstaBrief_8B`](https://huggingface.co/allenai/AstaBrief_8B)

---

## 25. "Every SaaS business will become a harness around a model" — the August essay that promotes the quarter's organizing metaphor hits HN

- **Velocity:** ▮ steady
- **Source:** blog.sshh.io · 117+ pts on HN · ~7h ago (~05:10 UTC+8) · essay dated Aug 24
- **Tags:** `harness` `saas` `agents` `org-design`

Shrivu Shankar's essay (published Aug 24, resurfacing on HN this morning) argues the harness — "infra, interfaces, context, and state that surround a stateless LLM" — is not a dev-tool category but the company itself. Four stages: no harness → individuals operate harnesses → individuals orchestrate harnesses → **"Harnesses orchestrate individuals,"** at which point "Humans are part of the harness." Quality comes from directing human attention, not lights-out automation: "taste-holders" review only major decisions, demos, and top design variants. The competitive logic: own the top-level harness or be commoditized — "If the entire outer loop is outsourced... the business has now been commoditized." Evidence cited: in-house AI developer tooling at Ramp, Stripe and DoorDash.

**Why it matters:** this feed has tracked "harness" all quarter as an engineering noun (Mid-Harness, ds4's shared-state agent surface, Meta's harness-optimizing ActiveSaddler on today's HF board). The essay's move is promoting it to a corporate thesis — six weeks old and unproven, but if "harness" becomes the org-chart word of 2027, this is one of the essays that coined the usage.

[`🔗 blog.sshh.io`](https://blog.sshh.io/p/the-harness-is-the-company) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49938616)

---

## 26. Anatomy of a Lean proof, for software engineers: a Sipser regularity exercise as spec → DFA → proof

- **Velocity:** ▮ steady
- **Source:** agostbiro.net · 92+ pts on HN · ~33h ago (~02:50 UTC+8 Oct 2)
- **Tags:** `lean` `formal-methods` `verification` `dfa`

A working-engineer walkthrough of formalizing a classic Sipser exercise in Lean 4 + Mathlib: the language B of three-row bit columns whose bottom row is the binary sum of the top two is **regular**. The construction is a carry DFA — "a full adder whose state is the pending carry, plus a dead sink state" — recognizing the reversed language, then closing the loop with Mathlib's regularity-preserved-under-reversal theorem. The three-part anatomy (specification / implementation / proof) centers on the `run_invariant` lemma — `evalFrom` ends in `carry carryOut` iff `row1LE wLE + row2LE wLE + carryIn = row3LE wLE + carryOut * 2 ^ wLE.length` — proven by induction with `generalizing carryIn`. Lessons: "proofs are programs"; formalization surfaced a hidden assumption ("all three rows of a word have the same length"); and the anti-black-box warning — since agents already one-shot proofs like this one, "it's important going forward that we can understand machine-generated proofs."

**Why it matters:** the formal-methods wave keeps lacking an on-ramp for working engineers — this is that document. And its warning about machine-generated proofs lands the same week a kernel maintainer graded an AI bug haul 20/79 (item 19): verification without comprehension is just a faster conveyor belt.

[`🔗 agostbiro.net`](https://agostbiro.net/posts/2026-10-anatomy-of-a-lean-proof/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49925602)

---

## 27. Audionaut: a GPLv3 multitrack audio editor that agents drive over MCP — three years of C++, one undo step per edit

- **Velocity:** ▮ steady
- **Source:** Show HN · 133+ pts on HN · ~20h ago (~16:00 UTC+8 Oct 2)
- **Tags:** `audio` `open-source` `mcp` `juce` `show-hn`

kvoltmer/Audionaut (C++ on JUCE; Windows/macOS/Linux; GPLv3 per the README badge) launches as "a free, open-source multitrack audio editor that AI agents can drive over MCP." The author's origin story: 3–4 years in the making, begun to edit "my own multi-channel recordings with the old Sound Designer II workflow (create regions, drop to a playlist, export playlist, done)." The agent surface is one line — `claude mcp add audionaut -- npx -y audionaut-mcp` — and the key contract: **"each edit arrives as one undo step."** The hero demo shows Claude cutting a song every 16 bars, splitting clips across two tracks, closing the gaps, then setting crossfades and a fade-out. Repo checked: 156★, pushed Oct 2 — early traction is HN-led, not star-led.

**Why it matters:** MCP-for-desktop-apps is reaching past IDEs and browsers into time-domain media, and "one edit = one undo step" is the right agent-UX primitive — agent edits that stay human-revertible. Also a rare open-source entry in the gap between Audacity and a full DAW.

[`🔗 kvoltmer/Audionaut`](https://github.com/kvoltmer/Audionaut) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49931031)

---

## 28. Debian quietly stands up an LLM inference portal for its contributors — Salsa login, budget tracking, Scaleway-sponsored

- **Velocity:** ▮ steady
- **Source:** inference.debian.net · 12+ pts on HN · ~5h ago (~06:45 UTC+8)
- **Tags:** `debian` `llm-infra` `open-source` `distro`

`inference.debian.net` is "a self-service portal for Debian contributors to access LLM inference": log in with Salsa (Debian's GitLab), "only Debian Developers and Debian Maintainers are granted access," then manage API keys and track budget consumption. It was announced on `debian-devel-announce` on Sep 23; the first listed model is `scaleway/qwen3.8-27b` (added Sep 25); "Inference resources sponsored by Scaleway." The portal's source (`inference-team/inference-user-portal`) is on Salsa, and recent updates added "a DebGPT configuration section" plus sandboxing examples.

**Why it matters:** a distro providing identity-gated, sponsor-funded inference to contributors is a first-class infrastructure decision — the moral equivalent of running build daemons, and the template other distros will now be compared against. The DebGPT integration is the tell: this is inference for agents doing Debian work, not a chat perk for humans.

[`🔗 inference.debian.net`](https://inference.debian.net/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49939513)

---

## 29. The first RFC 1149 packet is up for auction at Christie's — David Waitzman's pigeon-borne ping, framed

- **Velocity:** ▮ steady
- **Source:** onlineonly.christies.com · 56+ pts on HN · ~15h ago (~20:45 UTC+8 Oct 2)
- **Tags:** `internet-history` `rfc1149` `auction` `humor`

Christie's "Fine Printed Books & Manuscripts" online sale includes a lot titled **"Carrier Pigeon Internet Protocol"**: "[WAITZMAN, David and the BERGEN LINUX USER GROUP.] One printed IP/ICMP 'ping' packet sent by carrier pigeon per RFC 1149. Small scroll of paper, 41 × 210 mm. Rolling creases visible from when attached to pigeon's leg. Framed." Provenance per the catalog: David Waitzman, the American network engineer who authored RFC 1149 — *A Standard for the Transmission of IP Datagrams on Avian Carriers* — on April Fools' Day 1990, and the packet is "a surviving packet from the first and most famous implementation," the Bergen Linux User Group's pigeon run, inscribed on the backing board "Property of David Waitzman."

**Why it matters:** the internet's canonical joke standard has entered the fine-art market. The first internet generation's paper trail is now collectible — and the RFC humor lineage (1149 → 2549's QoS improvements → 6214's IPv6 adaptation) is old enough to have originals worth framing.

[`🔗 Christie's lot 325216`](https://onlineonly.christies.com/s/fine-printed-books-manuscripts-science/carrier-pigeon-internet-protocol-150/325216) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49932911)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-10-03T12:20:00+08:00 |
| Items | 29 |
| Sources tracked | 29 (Hacker News, GitHub Trending, GitHub API, dwarfstar.sh, bfl.ai, supabase.com, eff.org, learn.chatgpt.com, csirt.divd.nl, CISA KEV, NVD, access.redhat.com, arXiv, Nature, ataraxosai.github.io, blog.google, developer.apple.com, stillwet.art, wagtail.org, maximumeffort.substack.com, Hugging Face papers, gadgets.muse.ai, YouTube/Kernel Recipes, yuka.dev, allenai.org, blog.sshh.io, agostbiro.net, inference.debian.net, onlineonly.christies.com) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[Previous day](2026-10-02.md) · [Raw .md](latest.md) · [Archive](../archive/index.md)
