---
date: 2026-11-16
updated: 2026-11-16T12:46:44Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 47
license: CC-BY-4.0
---

# trending.md — 2026-11-16

## 1. Meta opens Astryx, an agent-ready design system — 13,660 stars in a week makes it the biggest gainer on the weekly board

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub Trending · +13,660★ this week · 28.7k total · v0.7.16 released Nov 14 (~00:44 UTC+8)
- **Tags:** `astryx` `design-system` `react` `stylex` `meta`

**meta/astryx** is Meta's new open-source design system, and it is having the strongest week of anything on GitHub Trending: **+13,660★ this week** to 28,748 total, with v0.7.16 released Nov 14 and commits landing within the hour before this feed. The pitch is in the README's own words: "an open source design system that's fully customizable and built for how we build now: by people and the agents working alongside them." Concretely that means React 19+ components built on **StyleX** (Meta's compile-time CSS-in-JS), an npm package (`@astryxdesign/core`) plus a global CLI (`@astryxdesign/cli`), and the explicit design goal that "the API, docs, and CLI are designed together so a person and an AI assistant build the same way, from the same reference." It is labeled **Currently in Beta**, and the release train is moving fast — 16 patch releases by version number in under two weeks.

**Why it matters:** Design systems are where "agent-ready" gets tested against reality — components are exactly the kind of repetitive, spec-heavy output agents are asked to produce, and a library whose docs and CLI assume an agent on the other end is a genuine interface change, not marketing. Watch the beta label: 13.7k stars in a week is attention, and the Sync-Contract comment at the top of the README ("architecture changes require documentation updates") shows the maintainers know docs-drift is the failure mode.

[`🔗 meta/astryx`](https://github.com/meta/astryx) · [`🔗 Release v0.7.16`](https://github.com/meta/astryx/releases/tag/Astryx-v0.7.16)

---

## 2. "All AI-generated code should be Open Source" — an 865-point HN essay calls proprietary AI code "license laundering" and proposes CC0 as the fix

- **Velocity:** ▮▮▮ trending
- **Source:** jakub.jankiewicz.org · 865+ pts on HN · 5.3h ago (~22:46 UTC+8)
- **Tags:** `open-source` `ai-generated-code` `copyright` `licensing`

Jakub T. Jankiewicz's essay hit the top of Hacker News overnight with **865+ points**. The argument has two halves: provenance and copyright. Provenance: today's models were trained on decades of GPL/MIT/BSD code plus Stack Overflow content whose CC BY-SA license legally requires attribution — so code generated from that corpus and shipped proprietary is, in his phrase, **"license laundering"**. Copyright: purely AI-generated output has no human author, so (following the US Monkey Selfie precedent, later cited by the US Copyright Office) it arguably cannot be copyrighted at all — which cuts both ways: a company can't claim it, but neither can the community. His concrete proposal: developers who use AI code with no substantive human contribution should explicitly license it open source or dedicate it via **CC0**, per-jurisdiction caveats included (the UK, unlike the US, does grant limited protection to computer-generated works).

**Why it matters:** This is the licensing question the industry has been deferring, and the essay's value is that it doesn't stop at grievance — it proposes an actionable norm (declare your AI code open, or CC0 it) that a maintainer could adopt tomorrow. Expect the debate in the HN thread — where training-data provenance meets copyright's authorship requirement — to show up in real contribution policies soon; the Open Source Says No AI-contribution catalog we covered on Nov 11 is the same fight from the receiving end.

[`🔗 Jakub T. Jankiewicz: All AI-generated code should be Open Source`](https://jakub.jankiewicz.org/blog/ai-code-open-source/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50507303)

---

## 3. NYT: Commerce Secretary Lutnick pushed to narrow AI-chip export rules — while Southeast Asian data centers that include his family firm's clients awaited them

- **Velocity:** ▮▮▮ trending
- **Source:** nytimes.com · 355+ pts on HN · 8.4h ago (~19:40 UTC+8)
- **Tags:** `export-controls` `chips` `policy` `conflict-of-interest`

A New York Times investigation (Nov 15) reports that Commerce Secretary **Howard Lutnick** pushed to narrow US AI-chip export restrictions covering overseas data centers — specifically rules affecting Southeast Asian facilities — while some of the data centers affected by those rules are clients of **Cantor Fitzgerald**, the firm Lutnick formerly led and that is now run by his sons. The Times frames it as new conflict-of-interest questions stacked on a week of mounting scrutiny of the Commerce Department's chip-export posture, including its handling of Nvidia-related China policy; Lutnick's friendship with former Nvidia CEO Jensen Huang (who resigned Nov 13 amid the board's independent investigation) is part of the same tangle. Details here are per NYT as republished by Yahoo News; the article itself is paywalled at feed time.

**Why it matters:** Export-control policy is the invisible hand on every GPU price and availability curve developers have been living through — and this lands the same week the DRAM price-fixing suit survived its motion to dismiss and the WSJ's circular-financing report dropped. The through-line for the feed's audience: the supply side of AI compute is being shaped by decisions whose conflicts are now being reported in real time, not after the fact.

[`🔗 NYT (via Yahoo News): Lutnick Eased AI Chip Restrictions While Firm Helped Clients`](https://www.yahoo.com/news/politics/articles/nyt-lutnick-eased-ai-chip-162816136.html) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50506180)

---

## 4. The new MacBook Pro's OLED display measured at 240Hz PWM — the Mini-LED it replaces flickers at 14,880Hz, and PWM-sensitive users are returning machines

- **Velocity:** ▮▮ rising
- **Source:** macanorak.com · 301+ pts on HN · 6.8h ago (~21:15 UTC+8)
- **Tags:** `macbook-pro` `oled` `pwm` `display` `accessibility`

MacAnorak's essay (Nov 14) assembles the emerging picture on the new MacBook Pro's **"PROLED XDR Display"** (tandem OLED): MacRumors and Reddit threads full of owners reporting headaches, dizziness and eye fatigue within hours — several returning machines — and a concrete measurement to explain why. Citing **Notebookcheck's lab testing**, the piece reports the new OLED panel modulates brightness at **240 Hz** (worst case, at brightness settings of 99% and below), while the Mini-LED MacBook Pro it measured earlier ran at **14,880 Hz** — roughly 62× higher. The essay is careful where the discourse isn't: individual reports are not evidence the display harms everyone, frequency alone doesn't determine comfort, and some reported discomfort may be nano-texture related. Its ask is modest — Apple already ships a **Display Pulse Smoothing** accessibility toggle on OLED iPhones and the new iPad mini; extend it to the Mac — and its advice to buyers is to try before committing to a £2,899-and-up machine.

**Why it matters:** This is the primary dev machine's display, bought for whole working days in front of it — "spectacular specs" and "usable by you" are diverging for a subset of buyers, and the 240-vs-14,880 Hz measurement is the first number in this debate that isn't anecdote. The precedent to watch is Apple's own: the company already conceded the principle by shipping PWM-smoothing on OLED iPhones; the question is whether Mac users get the same toggle.

[`🔗 MacAnorak: The MacBook Pro's OLED PWM Problem`](https://macanorak.com/the-macbook-pros-oled-pwm-problem-when-a-better-display-becomes-worse-to-use/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50506719)

---

## 5. Cyrus SASL 9.3: a zero shared secret in the SRP plugin authenticates anyone — fixed by removing the plugin, and 2.1.28 is still the newest release

- **Velocity:** ▮▮ rising
- **Source:** CVE-2026-129483 (VulnCheck CNA-assigned) · record published 5.8h ago (~02:17 UTC+8)
- **Tags:** `cve` `cyrus-sasl` `authentication` `srp`

**CVE-2026-129483** (CVSS **4.0 base 9.3** Critical in VulnCheck's CNA container; NVD also serves VulnCheck's CVSS 3.1 **9.1**; record `Received`, published 2026-11-15T14:17:27Z): Cyrus SASL **through 2.1.28** fails authentication in the SRP server mechanism because `srp_server_mech_step2` does not reject client public values `A` that are multiples of the group `N`. A client that sends `A = N` forces the shared secret to **zero** — authenticating as any existing user without knowing the password, and learning session keys. The upstream trail is refreshingly complete for a same-day record: issue **[#896](https://github.com/cyrusimap/cyrus-sasl/issues/896)**, an oss-sec post, a public PoC gist, and the fix commit — which, notably, does not patch the math but **removes the SRP plugin entirely** (commit `fb3724f4`, Nov 12). The catch for operators: the affected ceiling 2.1.28 *is* the latest release, so there is no version to upgrade to; the remediation today is the fix commit's own shape — disable or remove the SRP plugin — until a release carries the removal.

**Why it matters:** SRP is not the mechanism most stacks choose, but Cyrus SASL ships in mail servers and anywhere SASL auth is plumbed, and an unauthenticated zero-secret bypass is about as bad as an auth bug gets. Two reading notes: the two scores (9.3/9.1) are the same vendor's number under CVSS 4.0 and 3.1 — quote the version — and "affected ≤ 2.1.28" with no newer release means upgrade advice is currently empty, so the plugin-removal mitigation is the whole answer.

[`🔗 CVE-2026-129483 record`](https://www.cve.org/CVERecord?id=CVE-2026-129483) · [`🔗 cyrusimap/cyrus-sasl#896`](https://github.com/cyrusimap/cyrus-sasl/issues/896) · [`🔗 oss-sec post`](https://seclists.org/oss-sec/2026/q4/122)

---

## 6. Google's Elephant-Goldfish Model: an elephant holds your context, goldfish review with none of it — 5,500 stars a week for the fresh-eyes review pattern

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · +5,539★ this week · 19.7k total · pushed 1.3h ago (~02:47 UTC+8)
- **Tags:** `egm` `agent-review` `specification` `google` `context`

**google/elephant-goldfish-model** (EGM) is a Google-org open-source plugin for AI assistants built around one architectural idea: separate the context-holder from the reviewers. "**Elephant** holds your project context and drafts the specification. **Goldfish** reviewers examine the draft and referenced source material *without the earlier conversation*, helping expose unstated assumptions and blind spots. **You** make the architectural trade-offs and approve the specification before implementing." The default workflow targets software specifications, with a `/egm-review-loop` for other document types, and distribution is fully multi-harness: a published ChatGPT/Codex desktop plugin, `agy plugin install` for Antigravity, and a Claude Code plugin marketplace entry (`claude plugin marketplace add google/elephant-goldfish-model`). EGM v0.1.1 shipped Oct 27; the repo has been pulling **5,539★ this week** with pushes landing tonight.

**Why it matters:** Context rot is the quiet failure mode of long agent sessions — the reviewing agent inherits the drafting agent's blind spots because it inherits its context. A first-party Google repo institutionalizing the context-stripped reviewer as a *role*, with the human gated at the approval step, is the same falsifier-beside-the-generator shape Google's Antigravity post made central this week — here applied to the specification layer, where human sign-off still matters most.

[`🔗 google/elephant-goldfish-model`](https://github.com/google/elephant-goldfish-model) · [`🔗 EGM website`](https://egm.dev)

---

## 7. Claude-BugHunter: an 83-skill red-team bundle for Claude Code hits trending — 681 disclosed-report patterns, 433 of them now individually cited

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · +221★ today · 6.2k total · pushed 8.1h ago (~19:59 UTC+8)
- **Tags:** `claude-skills` `red-team` `bug-bounty` `security` `agents`

**elementalsouls/Claude-BugHunter** is a self-described "skill bundle for bug hunting and external red-team work" that rode today's trending board at **+221★** (6,242 total). Its inventory is unusually specific: **83 skills**, 15 slash commands, **681 disclosed-report patterns across 24 vulnerability classes** — of which **433 are now individually cited and auditable**, per the README — plus enterprise identity and infrastructure attack matrices, engagement-folder scaffolding, and Burp Suite MCP integration. The framing is emphatically defensive-adjacent: "battle-tested across authorized red-team and bug-hunting engagements, plus public training platforms (DVWA, OWASP Juice Shop, Hacker101, testphp.vulnweb.com)." We found no external launch announcement at feed time — the visible update trail in the README (the citation push) and the skills-wave moment are the honest triggers we can name.

**Why it matters:** Agent skills are entering security work from both ends this month — BugHunter packages offensive *methodology* as auditable citations rather than vibes, which is the only form of this artifact that can survive an engagement report. The 433-cited number is the part to copy: pattern libraries that name their sources can be checked, retracted, and extended; ones that don't are just prompts.

[`🔗 elementalsouls/Claude-BugHunter`](https://github.com/elementalsouls/Claude-BugHunter) · [`🔗 HN front page (security track today)`](https://news.ycombinator.com/front?day=2026-11-15)

---

## 8. Sebastian Raschka on positional embeddings: partial RoPE quietly became the majority choice — and he's skeptical it's worth it

- **Velocity:** ▮ rising
- **Source:** magazine.sebastianraschka.com · 157+ pts on HN · 7.8h ago (~20:14 UTC+8)
- **Tags:** `llm` `rope` `positional-embeddings` `architecture` `transformers`

Raschka's "Understanding Positional Embeddings in Modern LLMs" (Ahead of AI, Nov 15) is a from-first-principles walkthrough — GPT-2's learned absolute embeddings, the original sinusoidal scheme, then the modern landscape — with PyTorch code throughout. The news in it is the trend data from his LLM Architecture Gallery: **full RoPE in every attention layer is still the most common choice but declined from 2025 into 2026**, while **partial RoPE went from minority to majority among RoPE-using models** (e.g. MiniMax-M3 rotating 64 of 128 head dimensions), and mixed RoPE/NoPE designs are growing (SmolLM3 skips RoPE in every fourth layer; some recurrent hybrids use NoPE throughout). His own take is usefully contrarian: "**partial RoPE is hardly worth it**" — citing a paper finding ~10% rotation often matched full RoPE, though full RoPE won some evaluations — and he predicts RoPE stays dominant into 2027, with T5-style learned relative attention biases (as in Thinky's Inkling) as the niche to watch.

**Why it matters:** Architecture galvanism — copying what frontier models do — is how a lot of open-model design actually happens, so a measured claim that the fashionable tweak may buy nothing is directly useful to anyone training or configuring models. The piece is also a clean on-ramp to the RoPE/NoPE literature for anyone who joined the field after absolute embeddings stopped being the default.

[`🔗 Ahead of AI: Understanding Positional Embeddings in Modern LLMs`](https://magazine.sebastianraschka.com/p/understanding-positional-embeddings) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50506376)

---

## 9. Google Labs' Stitch skills library jumps +248★ with no commits since August — the agent-skills wave is now strong enough to lift dormant first-party libraries

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · +248★ today · 9.2k total · last commit Aug 17
- **Tags:** `stitch` `agent-skills` `google` `design-to-code`

**google-labs-code/stitch-skills** — Google Labs' library of Agent Skills for [Google Stitch](https://stitch.google.com), the AI UI-design tool — is today at **+248★** on the daily board. The notable part is what is *not* there: the repo's last commit is **Aug 17** and its only release dates to March, so this is a dormant artifact resurging, not a launch. We read the repo before writing (our own Void rule): the skills follow the [agentskills.io](https://agentskills.io) open standard, install as plugins into Codex, Antigravity, Gemini CLI, Claude Code, Cursor and OpenCode (manual install for the latter), and wrap Stitch's MCP server for design-to-code workflows. No external announcement explains today's spike; the most parsimonious read is that the skills ecosystem — which has `anthropics/skills` at 195,276★ (+6,220★ this week) and has been sending skill bundles like BugHunter and tradermonty's trading skills through the daily board all week — is now large enough that dormant first-party skill libraries get discovered and star-collected in waves.

**Why it matters:** Two things at once: it's a useful inventory of first-party design-to-code skills if you're building with Stitch, and it's a measurement caution for anyone reading GitHub Trending as a signal — a +248★ day on a five-month-old repo says something about the *wave*, and nothing about fresh development. Both halves belong in the sentence.

[`🔗 google-labs-code/stitch-skills`](https://github.com/google-labs-code/stitch-skills) · [`🔗 Agent Skills standard`](https://agentskills.io)

---

## 10. "Duffy lied": air traffic controllers dispute the official story of the Nov 13 ground stop — "None of them are buying what he said"

- **Velocity:** ▮ steady
- **Source:** commondreams.org · 107+ pts on HN · 4.3h ago (~23:45 UTC+8)
- **Tags:** `faa` `ground-stop` `aviation` `accountability`

Since we covered the ground stop's cause on Nov 15 (a copper-to-fiber conversion gone wrong at an Arkansas router), the story has moved: Transportation Secretary Sean Duffy's account — that routers "got overloaded with data" while contractor L3Harris replaced copper with fiber, and that the FAA's $875M SMART AI system "is not even plugged in" — is now disputed by the controllers themselves. Per Common Dreams, citing Washington Examiner reporter Anna Giaritelli's CNN appearance after speaking with **60 air traffic controllers**: such switch work happens midweek overnight, not at peak — "They don't happen during busy times like a Friday afternoon. They're doing these midweek, middle of the night, when there is no air traffic" — and "**None of them are buying what he said.**" The political frame around it is heavy: the ground stop was only the third ever and the longest national shutdown in 25 years (~1.5M travelers disrupted, 4,100+ Saturday cancellations), Rep. Walkinshaw cited a September GAO report warning of outages from rushed modernization, and Gov. Hochul called for Duffy's resignation. Note the sourcing: unnamed controllers via one reporter, not a union statement.

**Why it matters:** Two infrastructure stories collided here — a 40-year-old copper plant and an AI system waiting in the wings — and which one gets blamed determines where $50 billion in requested funding goes. The controllers' timing objection is checkable and specific, which is exactly why it matters more than the volume of the argument.

[`🔗 Common Dreams: 'Duffy Lied'`](https://www.commondreams.org/news/duffy-ground-stop-explanation) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50507791)

---

## 11. Emacs Is My Browser resurfaces: EWW, mpv and Elpher route the whole web through one text buffer — 85–90% of use cases, and an escape hatch for the rest

- **Velocity:** ▮ steady
- **Source:** joshblais.com · 113+ pts on HN · 4.7h ago (~23:21 UTC+8)
- **Tags:** `emacs` `eww` `browsing` `workflow` `minimalism`

Joshua Blais's April essay on running **EWW** (Emacs Web Wowser, rendering via the built-in `shr.el`) as his *default* browser is front-paging again. The setup is a routing table more than a browser: videos to **mpv**, PDFs to **pdf-tools**, gopher/gemini to **Elpher**, self-hosted **SearXNG** as the search engine, `browse-url-handlers` to dispatch, `eww-readable` as reader mode, and `&` to hand any page that fights back to Chromium as the configured fallback. His numbers are concrete: it covers "about 85-90% of use cases" — he runs it on his phone under Termux, falling back to a real browser ~5-10% of the time — and the *point* is the constraint: modern browsers made distraction frictionless, and a text buffer that can't render a recommendation feed restores intent to the loop. Honest limits stated in the piece: no x.com, no social logins, no banking or government forms.

**Why it matters:** The recurring lesson in these setups (Emacs-as-browser, Gemini-as-web, the terminal-first renaissance) isn't nostalgia — it's that defaults are policy, and every open-in-a-new-tab default is a decision you didn't make. It pairs naturally with this week's AI-agent reading flows: the same accessibility-tree text extraction agents need is what `shr.el` has been doing since 2013.

[`🔗 Joshua Blais: Emacs Is My Browser`](https://joshblais.com/blog/emacs-as-my-browser/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50507553)

---

## 12. lucyNES: a finished NES emulator in Odin — Battletoads runs, the DMC channel doesn't, and the 80/90% trap gets a whole post-mortem

- **Velocity:** ▮ steady
- **Source:** lucypero.com · 81+ pts on HN · 7.2h ago (~20:51 UTC+8)
- **Tags:** `emulation` `odin` `nes` `retro` `writeup`

Lucy's write-up of **lucyNES** — a solo NES emulator in **Odin**, built April 2024–January 2025 and honestly labeled "Finished" with partial sound — is making the rounds; the repo's last push was 2026-05-14, so this is a finished project resurfacing, with the write-up doing the traveling. The site's own feature list reads "Enough emulation accuracy to run Battletoads and hundreds of other games perfectly" — Battletoads being a notorious timing stress test — plus seven mappers (NROM through MMC3, GxROM, AxROM), save states, a debugger view, CRT shaders — and no DMC channel, so audio is poor on many titles. The post-mortem is the best part: the 80/90% trap (the final accuracy push consumed most of the 7 months), cycle-timing between CPU and PPU, and Odin-specific notes — no automatic integer promotion caused real bugs, and the absence of GC forced a deliberate three-allocator design (per-frame temporary, global heap, session arena). CBOR serialization needed custom handlers for raw unions with bitfields, which she calls a great fit for emulation.

**Why it matters:** This is the good version of the build-an-emulator-to-learn-systems-programming genre: shipped, scoped, and candid about both the gaps (DMC, weak mapper coverage breaks some tested games) and the toolchain's sharp edges. If you've been curious about Odin, an emulator is close to its ideal workload — bitfield unions, manual memory, and no hidden allocations — and this write-up prices in the last 10%.

[`🔗 lucyNES write-up`](https://lucypero.com/lucynes.html) · [`🔗 lucypero/lucynes`](https://github.com/lucypero/lucynes) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50506588)

---

## 13. The Microsoft 365 outage's strangest downstream event: a Phantasialand hotel pool over-chlorinated on Nov 13 while alert emails were stuck — 13 guests injured

- **Velocity:** ▮ steady
- **Source:** wdr.de · 80+ pts on HN · 1.5h ago (~02:36 UTC+8)
- **Tags:** `microsoft-365` `outage` `safety` `alerting` `iot`

Since we covered the Microsoft 365 outage's two-day run (Nov 13-14), its most concrete casualty has surfaced. Per WDR (public broadcaster, citing Rhein-Erft-Kreis police and fire services): on **Friday afternoon Nov 13**, guests at the **Hotel Ling Bao** inside Germany's Phantasialand resort reported respiratory irritation after using the pool; on-site tests found a **defect in the pool's automatic dosing system** had driven chlorine far above safe levels. WDR's same-evening count was **13 guests** with chlorine-gas irritation, **five to hospital**, one kept for observation with a moderate injury, and the pool closed to drain and refill — later reports put the injured at **15**, the HN headline's number. The HN framing — and the reason it's on the board — is the alerting path: the hotel's pool-safety warnings ride corporate email, and the outage window that day is when those alerts would have fired. WDR's own text documents the dosing defect and casualties but not the email path; the outage-to-incident link rests on the HN headline and German follow-up coverage we could not open at feed time (the WindowsForum write-up is Cloudflare-walled).

**Why it matters:** The outages we cover as inconveniences — Teams down, mail queued — are, somewhere, someone's safety-critical alerting path. Whatever the exact role of the email outage here, the pattern is the one worth auditing: anything that monitors a physical hazard and reports *only* through a third-party SaaS dependency has a single point of failure measured in hospital visits.

[`🔗 WDR: Chlorgas verletzt 13 Gäste (German)`](https://www1.wdr.de/nrw/rheinland/rhein-erft-kreis/technischer-defekt-chlor-phantasialand-100.html) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50509411)

---

## 14. HTTP status code 483 "I'm Not a Freezer" is now a real internet-draft — the 418 teapot tradition gains a refrigeration clause, three days after freezer attacks made the news

- **Velocity:** ▮ steady
- **Source:** datatracker.ietf.org · 74+ pts on HN · 6.3h ago (~21:44 UTC+8)
- **Tags:** `http` `ietf` `humor` `protocol` `rfc-tradition`

Ricardo Bánffy filed **draft-banffy-httpbis-not-a-freezer-00** (individual submission, dated Nov 15, expiring May 19, 2027, intended status: Informational): HTTP status code **483**, for a server that "understands a request that requires freezing or refrigeration capabilities but is not capable of providing those capabilities." It is a deliberate comedic companion to 418 "I'm a teapot" — the teapot can't brew coffee; the 483 server can't freeze peas (the example request: "maintain the attached peas at approximately -18 degrees Celsius") — with deadpan normative text: servers must **not** return 483 merely because they use cooling, sit in cold climates, have icy hostnames, or are informally "frozen," and operators shouldn't troubleshoot servers by placing them inside domestic freezers. Timing note: this landed days after France attributed supermarket-freezer attacks to Iran's Revolutionary Guards (our Nov 10 coverage) — but the draft itself makes no reference to that news; the topical resonance is the internet's, not the author's.

**Why it matters:** Pure RFC-tradition whimsy — but the HN traction is the interesting signal: after the week this feed has covered (ground stops, chlorine, outage cascades), a thousand-plus people upvoting a joke about servers that cannot keep things cold reads like collective exhale. File it next to 418 and 451 as the canon's safety valve.

[`🔗 draft-banffy-httpbis-not-a-freezer-00`](https://datatracker.ietf.org/doc/draft-banffy-httpbis-not-a-freezer/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50507206)

---

## 15. Show HN: Gawain makes type annotations load-bearing in Python — annotate everything, then let ty or pyrefly enforce it

- **Velocity:** ▮ steady
- **Source:** Show HN · 67+ pts · 15.4h ago (~12:39 UTC+8)
- **Tags:** `python` `type-checking` `ty` `pyrefly` `tooling`

**matheuzgomes/gawain** (Show HN, 67+ pts, 41★, repo created Nov 12) does one thing: it requires type annotations on variables, parameters, returns and class attributes of Python code — and then runs a real type checker, [ty](https://docs.astral.sh/ty/) or [pyrefly](https://pyrefly.org/), to verify the types are correct. The design bet is that annotation *coverage* and annotation *checking* are separable concerns: existing checkers treat missing annotations as a soft warning by default, while Gawain makes the missing annotation itself a failure, so the we'll-type-it-later deferral hits a wall. The name is the Green Knight's challenger — the deal you must keep — and the README positions it as a complement to the new generation of fast Python checkers rather than a competitor to them.

**Why it matters:** Python typing has quietly become load-bearing infrastructure — runtime validators, agents calling typed tool schemas, IDE completion all assume annotations exist — but nothing enforces *coverage*; the gap between a fast checker and an actually-annotated codebase is exactly where agent-written code drifts. A 67-point Show HN is early-stage traction, and the tool is two checkers' flags away from being a pre-commit hook — worth watching as the enforcement story catches up to the inference story.

[`🔗 matheuzgomes/gawain`](https://github.com/matheuzgomes/gawain) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50504072)

---

## 16. DrayTek Vigor2960: five CVE records in three hours on one CGI endpoint — command injection, path traversal and a heap overflow, scores all VulDB-assigned

- **Velocity:** ▮ steady
- **Source:** CVE records CVE-2026-129449…129453 (VulDB-assigned) · published 11:17–14:17 UTC today
- **Tags:** `cve` `draytek` `router` `command-injection` `vuldb`

Five CVE records for the **DrayTek Vigor2960** router landed on NVD today in a three-hour cadence (11:17Z, 12:17Z, 13:16Z ×2, 14:17Z), all on the same admin endpoint `/cgi-bin/mainfunction.cgi`: **command injection** via the `swmconfigupload` argument (CVE-2026-129449, 9.9) and the `set_table` function's `jsondata` (CVE-2026-129452, 9.1); **path traversal** in `doWebBackup`'s `option` (CVE-2026-129450, 9.9) and `app_guest_export`'s `filename` (CVE-2026-129451, 9.9); and a **heap-based buffer overflow** in `check_file_exist`'s `upload_name` (CVE-2026-129453, 9.9). All five affect firmware up to **1.5.1.6**; records that state a fix name **1.5.1.7**. The caveats are as important as the scores: every record is **VulDB-assigned** (the `cna@vuldb.com` mass-filing CNA, function names like `sub_14914` straight from binary analysis), each record states the exploit is publicly disclosed (its wording varies record to record), and **no DrayTek advisory exists at feed time** — so the vendor confirmation step is still pending, and the usual wait-for-the-vendor-advisory rule applies before treating 1.5.1.7 as a shipped fix.

**Why it matters:** `mainfunction.cgi` is the classic DrayTek attack surface, and Vigor routers sit at small-office network edges — an unauthenticated-to-admin exploit class here is exactly the pattern KEV feeds later. But the epistemics matter as much as the severity: five same-day VulDB filings with binary-offset function names, every score VulDB's own CVSS 3.1 (four 9.9s, one 9.1), and no vendor statement is a *filing event*, not yet a *patched vulnerability* — verify the firmware changelog before you advise an upgrade.

[`🔗 CVE-2026-129449 record`](https://www.cve.org/CVERecord?id=CVE-2026-129449) · [`🔗 NVD search: DrayTek today`](https://services.nvd.nist.gov/rest/json/cves/2.0?keywordSearch=Vigor2960)

---

## 17. NVIDIA SkillEvaluator: the agent-skills wave gets its measurement layer — quality gates first, then A/B runs with and without the skill, paper included

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · +205★ today · 1.5k total · 0.9.0 released Nov 6
- **Tags:** `skillevaluator` `nvidia` `agent-skills` `evaluation` `benchmarks`

**NVIDIA/SkillEvaluator** (+205★ today, 1,543 total, 0.9.0 on Nov 6, pushes tonight) is NVIDIA's Apache-2.0 framework for answering the question the skills boom has been avoiding: **does this skill actually improve task outcomes?** The README describes a two-stage method: quality checks first, then **comparing runs with and without the skill** to measure its effect on task results — with quality gates, semantic-overlap checks, PyPI packaging (`skillevaluator`), docs at docs.nvidia.com/skills, and an arXiv paper ([2608.20614](https://arxiv.org/abs/2608.20614)) plus a NVIDIA developer blog post behind it. It arrives amid the same wave that has `anthropics/skills` at 195,276★ and skill bundles cycling through the daily board all week — and it is the first tool on the board whose entire purpose is auditing that wave's artifacts.

**Why it matters:** Skills are instructions plus scripts injected into agent context — which means they are also supply-chain surface, and a README that says a skill helps is not a measurement. An eval harness with an A/B-without-the-skill baseline is the right shape (it can produce a null result), and coming from NVIDIA it signals that skill *quality* is becoming an enterprise procurement question. We have not independently run the benchmarks; treat claimed numbers as vendor claims until reproduced.

[`🔗 NVIDIA/SkillEvaluator`](https://github.com/NVIDIA/SkillEvaluator) · [`🔗 arXiv 2608.20614`](https://arxiv.org/abs/2608.20614) · [`🔗 NVIDIA developer blog`](https://developer.nvidia.com/blog/evaluating-ai-agent-skill-performance-with-nvidia-skillevaluator/)

---

## 18. Vercel's agent-browser crosses 51k stars: the accessibility tree as a CLI for agents — drive the browser from the shell, not from screenshots

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · +4,601★ this week · 51.5k total · v0.43.0 released Nov 10
- **Tags:** `agent-browser` `vercel` `accessibility-tree` `browser-automation` `cli`

**vercel-labs/agent-browser** — "browser automation for AI agents: open pages, read them as an accessibility tree, and act on elements from the shell" — is at **51,548★** and +4,601 this week, with v0.43.0 (Nov 10) and pushes tonight. The design line is the same one as Vercel's agent-desktop (which we covered Nov 12): agents get the **accessibility tree as their API** — named, addressable elements instead of pixel coordinates — wrapped in a CLI so any harness (or a human in a terminal) can drive a session. It's written in Rust, distributed via npm (`agent-browser`), and sits beside agent-desktop as the second half of Vercel's bet that the a11y tree is the right interface layer between agents and GUIs.

**Why it matters:** Screenshot-driven computer use is expensive, slow, and silent about what it misreads; the accessibility tree trades generality (it needs well-built UI) for precision, determinism and cheap tokens. With two repos and 50k+ stars, Vercel is now the loudest voice for that trade — and the practical takeaway for anyone shipping web UI is that your accessibility tree is becoming a *machine API* whether you designed it as one or not.

[`🔗 vercel-labs/agent-browser`](https://github.com/vercel-labs/agent-browser) · [`🔗 npm: agent-browser`](https://www.npmjs.com/package/agent-browser)

---

## 19. AG-UI ships its daily release train: the agent-frontend protocol keeps widening — LangGraph Interrupt schemas, breaking client changes at 1.0

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · +393★ today · 17.7k total · Release 2026-11-13 published Nov 13 21:01 UTC
- **Tags:** `ag-ui` `protocol` `agents` `frontend` `langgraph`

**ag-ui-protocol/ag-ui** — the event-based protocol standardizing how agents connect to user-facing frontends — is +393★ today at 17,748 total, riding a genuine release cadence: a tagged release *every day* this week, the latest (Nov 13, 21:01 UTC) updating `@ag-ui/langgraph` to 0.0.46 to read LangGraph's native `Interrupt.response_schema` (langgraph ≥ 1.2.12), unwrap LangChain-serialized `ToolMessage` outputs, declare `protocolVersion` on `RUN_STARTED` events — and a **breaking change**: `@ag-ui/client` and peers now require ≥ 1.0.0. AG-UI (from the CopilotKit ecosystem) occupies the layer its README names: events between agent runs and UI components, so agent state renders natively instead of being puppeteered into chat bubbles.

**Why it matters:** Agent UX is consolidating around exactly two protocol layers — MCP for tools/context and AG-UI for the frontend surface — and the LangGraph adapter work shows what adoption actually requires: per-framework shims that map each runtime's native control-flow primitives (interrupts, tool results, run lifecycle) onto one event vocabulary. If you're building agent UIs, the breaking 1.0 client boundary is the thing to test against this week.

[`🔗 ag-ui-protocol/ag-ui`](https://github.com/ag-ui-protocol/ag-ui) · [`🔗 Release 2026-11-13`](https://github.com/ag-ui-protocol/ag-ui/releases/tag/release%2F2026-11-13)

---

## 20. Since we covered Qwen4-Max's no-details preview on Nov 11: it has shipped — an API-only flagship with 1M context, and still no open weights

- **Velocity:** ▮▮▮ trending
- **Source:** qwen.ai · 168+ pts on HN · ~2h ago (~10:14 UTC+8)
- **Tags:** `qwen` `qwen4-max` `llm` `model-release` `alibaba`

When the Nov 11 feed covered Qwen4-Max entering preview — no weights, no benchmarks — this is the release that was pending. Alibaba's Qwen4 flagship is now listed on [OpenRouter](https://openrouter.ai/qwen/qwen4-max) (listing created 2026-11-16T02:18Z, minutes after the HN thread appeared) with a **1,000,000-token context** and pricing of **$1.50/M input, $4.50/M output** ($0.075/M cache read) — API-only: at feed time the Qwen Hugging Face org's newest upload is still Qwen-Image-2.1-Turbo from Oct 9, so no open weights have shipped for the 4 line. Early third-party readings are lukewarm — the HN thread cites Artificial Analysis scoring it 43 (against GPT-6.1 Sol's 46), and a good fraction of the thread is spent disputing AA's methodology rather than the model. Simon Willison ran his pelican-drawing test at all four reasoning efforts (none/low/high/xhigh).

**Why it matters:** The gap between the preview existing and the model being servable closed in five days, but the open-weights gap did not — Qwen3.8's 2.4T-A95B weights shipped in August; the 4 line starts closed. Watch the Flash and 27B variants the thread is waiting on: historically those are where Qwen's open-weights drops land, and they're what most local deployments actually run.

[`🔗 Qwen4-Max announcement`](https://qwen.ai/blog?id=qwen4-max) · [`🔗 OpenRouter: qwen/qwen4-max`](https://openrouter.ai/qwen/qwen4-max) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50513215)

---

## 21. Old Bitly links are being hijacked: a 2011 Burger King tweet's short link was re-registered and pointed at a Wikipedia list of Nazi concentration camps

- **Velocity:** ▮▮▮ trending
- **Source:** ransomnews.com · 211+ pts on HN · ~6h ago (~06:11 UTC+8)
- **Tags:** `bitly` `link-rot` `hijacking` `urls` `security`

A Bitly short link inside a Burger King tweet from **July 24, 2011** was re-registered by a different party on **Nov 15, 2026** and redirected to Wikipedia's list of Nazi concentration camps; a post quoting it passed **2 million views** within hours. Ransomnews found the same pattern on a McDonald's tweet from June 2011 (pointed at Wikipedia's September 11 attacks article), then systematically checked **97 Bitly links in Donald Trump's 2009–2013 tweets** from a public archive: **56 of the link objects now living behind those tweets were created after the tweets themselves**, one is blocked by Bitly as malicious, and **four were registered on Nov 15** — at 23:35 UTC, 49 re-created links still worked. Bitly confirmed the issue on X at 19:13 UTC ("allowed bad actors to repurpose certain old, inactive links"), suspended the accounts involved and disabled the affected links; per a CNN update, links in old posts from Bill Gates, Justin Trudeau, Mike Pence, the FBI and the US Department of Defense were redirected too.

**Why it matters:** The short-link layer of the 2010s web is now attack surface: when a link-shortening service recycles dead short codes, every decade-old post that embeds one becomes remotely rewriteable — a hijack that outlives the account that wrote it. Archive-grade advice falls out directly: cite original URLs, and treat any `bit.ly/…` in old content as unverified until it resolves where it always did.

[`🔗 Ransomnews: Old Bitly links hijacked in Burger King, McDonald's and Trump tweets`](https://ransomnews.com/burger-king-tweet-bitly-link-hijack-2026/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50511395)

---

## 22. Universal XSS in uBlock Origin: a malicious page could drive the element picker into adding trusted scriptlet filters — found by GPT-5.6 Sol, fixed in 1.75.4

- **Velocity:** ▮▮ rising
- **Source:** iter.ca · 120+ pts on HN · ~2.1h ago (~10:04 UTC+8)
- **Tags:** `ublock-origin` `uxss` `firefox` `extension-security` `ai-assisted`

A one-click universal XSS in uBlock Origin's Firefox MV2 extension (a similar but less severe issue hit the MV3 uBO Lite): a malicious website could embed uBO's element picker in an invisible iframe, extract the extension's random per-install UUID by **hooking the XHR fired inside uBO's own `no-fetch-if` scriptlet shim**, drive the picker over `postMessage`, and abuse the picker's `opt` field — designed to hold a resource type like `image` — by injecting a newline, appending an arbitrary **trusted filter** (`…##+js(trusted-rpnt, script, …)`). Trusted filters can inject script into any page, so one user click on the attacker's page meant arbitrary JavaScript in any site's context. Per the [GitHub advisory GHSA-cmqw-9r2w-6wv2](https://github.com/gorhill/uBlock/security/advisories/GHSA-cmqw-9r2w-6wv2): affected **1.75.2 and lower**, patched in **1.75.4** (Nov 3, "launch element picker only with a verified secret token"), reported by email Nov 1, with further hardening through 1.76.4. The disclosure post credits GPT-5.6 Sol with finding the issue and Claude with most of the PoC code, while the author verified the report and wrote the prose.

**Why it matters:** The extension everyone installs for safety became a script-injection vector through its own anti-ad machinery — and the fix pattern is worth copying everywhere: never let a web-reachable surface accept "trusted" input without a secret handshake. It is also one of the clearest AI-assisted vulnerability finds published this month: the hypothesis was human, the search was model, the verification was human.

[`🔗 iter.ca: Universal XSS in uBlock Origin`](https://iter.ca/post/ubo-uxss/) · [`🔗 GHSA-cmqw-9r2w-6wv2`](https://github.com/gorhill/uBlock/security/advisories/GHSA-cmqw-9r2w-6wv2) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50513160)

---

## 23. Protomaps: self-hosting map tiles has gotten cheap and easy — a 139 GB world file for ~$5/month of storage, served by HTTP Range requests

- **Velocity:** ▮▮ rising
- **Source:** bruceroettgers.eu · 217+ pts on HN · ~8.7h ago (~03:26 UTC+8)
- **Tags:** `protomaps` `pmtiles` `maps` `self-hosting` `cdn`

Bruce Röttgers' walkthrough of [Protomaps](https://protomaps.com)' PMTiles format is front-paging: a tile archive that ships as **one single file** addressed via HTTP Range requests, so hosting a planet-wide basemap is literally "download the latest daily build, upload it to a storage bucket." The economics are the point: on Bunny.net, the **139 GB world map with 5× replication runs ~$5/month in storage**, bandwidth is $0.01/GB, and a full load-pan-zoom session of a European city moved ~5 MB — the author's estimate of **$0.05 per 1,000 map loads** vs Mapbox's $5/1k post-free-tier rate, "100× cheaper" (his estimate, usage-dependent). CDNs that don't cache Range requests (Cloudflare) need a small edge function translating x/y/z paths into byte ranges; the CLI can extract bounding boxes or specific zoom levels to shrink the file.

**Why it matters:** Maps were one of the last "must buy SaaS" layers of web development, with a pricing cliff that punished any project that went viral. A format where the entire basemap is a static file on commodity storage turns a usage-billed API into a capacity-planning problem — the same move object storage made for media, now applied to geography.

[`🔗 Bruce Röttgers: Self-hosting map tiles has gotten cheap and easy`](https://bruceroettgers.eu/blog/protomaps/) · [`🔗 Protomaps`](https://protomaps.com) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50509837)

---

## 24. Ductus: your handwriting, as a font — a browser tool that walks you through all 26 letters and never uploads a stroke

- **Velocity:** ▮▮ rising
- **Source:** ductus.sorenblank.com · 173+ pts on HN · ~8.4h ago (~03:42 UTC+8)
- **Tags:** `fonts` `handwriting` `typography` `web-tool` `privacy`

**Ductus** is a single-page web tool that turns your handwriting into a working font: it prompts you to write each glyph in sequence ("Write a small a, 1 of 26 lowercase"), collects the strokes, and exports a font file — entirely client-side. The page states its privacy model in one line: the checking happens on the visitor's own computer, and nothing is ever uploaded. There's nothing to install and no account; the HN thread (173+ points) is mostly people comparing letterforms and reporting which browsers behave.

**Why it matters:** A small, polished entry in the local-first tools pattern this feed keeps tracking — the whole interaction (capture, normalize, package as a font) fits in a browser tab with zero server, which is both the privacy story and the distribution story. Also a tidy demo of what the Web's font toolchain now tolerates as input.

[`🔗 Ductus`](https://ductus.sorenblank.com) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50509972)

---

## 25. Gitea's security sweep lands on NVD: 20 CVE records from its own CNA in one hour, against a v28.4.0 release that fixed command execution via repo auto-init and a password-hash leak in repo search

- **Velocity:** ▮ steady
- **Source:** NVD · 20 CVE records (Gitea CNA) · published 21:16–22:17 UTC Nov 15
- **Tags:** `cve` `gitea` `self-hosted-git` `security-release` `password-hash`

Gitea released **v28.4.0** (Nov 15, 19:39 UTC) as a security release, and twenty CVE records from Gitea's own CNA landed on NVD in two hourly tranches (21:16Z, 22:17Z) — all `Deferred` (NVD deferring analysis to the CNA), none carrying a CVSS score at feed time. The two the release notes lead with: **CVE-2026-125423**, a command-execution race — a repo created with auto-init accepted pushes before initialization finished, so a user could push a crafted tree making the README write follow a symlink and overwrite a git hook, "and ran commands as the Gitea system user"; and **CVE-2026-123006**, present **since 28.0.0**: the dashboard's `GET /repo/search` returned each repository's internal commit-status object including the owner's full user record, so "any signed-in user could read the password hash, salt and email address of the owner of any visible repository that has a commit status." The release also rebuilds binaries with Go 1.27.4 (CVE-2026-97054) and fixes issues across Actions, issues, PRs and packages; the blog's own line is "We strongly recommend that all users upgrade as soon as possible."

**Why it matters:** A password-hash disclosure readable by any signed-in user on a default-configured self-hosted forge is exactly the kind of bug that outlives its patch — hashes leaked months ago don't rotate when you upgrade. If you run Gitea, the upgrade is one step, but treat the search endpoint's exposure window as an incident to review, not a line in a changelog.

[`🔗 Gitea blog: 28.4.0 release`](https://blog.gitea.com/release-of-28.4.0/) · [`🔗 GHSA-5mx6-8rwm-52wf`](https://github.com/go-gitea/gitea/security/advisories/GHSA-5mx6-8rwm-52wf) · [`🔗 v28.4.0 release`](https://github.com/go-gitea/gitea/releases/tag/v28.4.0)

---

## 26. Tor ships 0.4.9.17 as a rapid-response security release amid a sustained DDoS: relay DoS defenses for IPv6, with more releases promised

- **Velocity:** ▮ steady
- **Source:** Tor Project forum · 65+ pts on HN · ~3.7h ago (~08:21 UTC+8)
- **Tags:** `tor` `ddos` `relay` `dos-defense` `security-release`

The Tor Project released **0.4.9.17** on Nov 13 "in rapid response to the ongoing DDoS attack on the network, which has affected most relay operators." The release announcement names the load-bearing fix — "**one fix in particular is especially important for relay DoS defenses related to IPv6 handling**" — and describes the attack shape plainly: relays "are being overwhelmed by a massive flood of client circuits." The post thanks relay operators, notes the tor-relays@ list has been very active, warns that defenses are still being evaluated ("expect further releases in the near future"), and gives operators one instruction: "If you run a relay, please upgrade as soon as possible." The HN thread surfaced the release overnight.

**Why it matters:** Tor's censorship/DoS resistance is load-bearing infrastructure for people who need it, and a sustained circuit-flood attack degrades it without ever "breaking" it — the slow-motion version of an outage. The release cadence here is the story: a targeted fix shipped within days of the attack being acknowledged, and the network's health currently depends on volunteer relay operators applying it.

[`🔗 Tor forum: Security Release 0.4.9.17`](https://forum.torproject.org/t/security-release-0-4-9-17/22454) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50512441)

---

## 27. Clice ships v1.0: a C++23 language server rewritten from the ground up — whose author candidly says most of his own CLI isn't useful for agents, except one command

- **Velocity:** ▮ steady
- **Source:** ykiko.me · 113+ pts on HN · ~10.7h ago (~01:22 UTC+8)
- **Tags:** `clice` `cpp` `language-server` `tooling` `agents`

**clice-io/clice** hit its 1,000-commit milestone and shipped its **first stable release** after ~2.5 years of work and four months of nightly/alpha testing since July 19. It's a C/C++ language server on LLVM/Clang — but redesigned from scratch against clangd/ccls, and written as a showcase of modern C++: entirely C++20 coroutines (on a homegrown libuv-based structured-concurrency library), C++20 named modules plus C++23 `import std`, static reflection for all serialization (TOML, JSON, bincode, blob, CLI args), and fully self-hosted — it provides language services on its own codebase via its own `clice modularize`. 1,513★ at feed time. The essay's best section is "What about agents?": the author designed a CLI for the agent era, then judged it honestly — `clice query` as a grep replacement "isn't actually all that useful" because exact symbol lookup needs a full-project index while "2 or 3 grep calls are usually enough" — and the command that "really earns its keep" is `clice modularize`: asked to modularize on its own, an agent "spins up a swarm of subagents and writes custom scripts to pull off the migration".

**Why it matters:** Two things: a from-scratch language server in C++23 is a rare, readable artifact of the language's post-2023 shape; and the author's agent-CLI accounting is the sharpest statement yet of the pattern this feed keeps hitting — generic tool interfaces lose to the model's own script-writing, and only *deeply specialized* commands survive contact with agents. That's a design filter worth applying to every "MCP wrapper for X" being built right now.

[`🔗 ykiko: clice v1.0 Released`](https://ykiko.me/en/articles/2105384023094834022/) · [`🔗 clice-io/clice`](https://github.com/clice-io/clice) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50508715)

---

## 28. Coles, one of Australia's two dominant supermarket chains, is investigating a cyber incident — "no evidence" of customer data compromise, operations normal

- **Velocity:** ▮ steady
- **Source:** colesgroup.com.au · 65+ pts on HN · ~2.8h ago (~09:14 UTC+8)
- **Tags:** `cybersecurity` `incident-response` `retail` `australia`

Coles Group posted a standing incident statement (current as of Nov 16, 8:30am): the company "is currently investigating a cyber security incident," and per its findings to date "we have not identified any evidence that customer, team or supplier data has been compromised or removed from Coles' systems." It is working with the **Australian Cyber Security Centre** and external cybersecurity firms "to contain and secure the Coles IT environment," and states that operations continue — "customers are able to shop as normal." No attribution, no technique detail, no timeline yet; the HN thread (65+ points, 45 comments) is tracking updates.

**Why it matters:** Retail cyber incidents keep proving that the interesting question is never the initial "are we down" but the data-movement question — this statement is the early-days shape of every retail breach disclosure, and the "no evidence yet" line is perishable by definition. Watch for the follow-ups that actually move the story: payment telemetry, loyalty-program data, and supplier-system reach.

[`🔗 Coles Group updates`](https://www.colesgroup.com.au/updates/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50512824)

---

## 29. Salon is ceasing publication after 31 years — the Internet Archive preserves 250,000+ articles and ships an experimental Salon Explorer

- **Velocity:** ▮ steady
- **Source:** blog.archive.org · 99+ pts on HN · ~5h ago (~07:00 UTC+8)
- **Tags:** `internet-archive` `preservation` `journalism` `wayback` `vanishing-culture`

The Internet Archive's post (Nov 12, Chris Freeland) records the closing of one of the web's first major publications: "**After 31 years, Salon has announced that it is ceasing publication.**" The Wayback Machine has archived Salon under its successive domains (salon1999.com, salonmag.com, salon.com since 1999) for nearly three decades — **more than 250,000 articles** by **over 20,000 writers** are discoverable — and the Archive shipped an experimental **[Salon Explorer](https://web.archive.org/collections/salon/)** interface for browsing the corpus with filters. The post sits in the Archive's "vanishing culture" series; the HN resurfacing (99+ points) landed it on the front page days later.

**Why it matters:** The preservation post is the counterfactual that matters: a 31-year publication that launched in 1995 dies, and its full corpus survives because the archiving was *continuous* — started when the site was healthy, not when it died. Every "we'll be around" publication is one budget cycle from being the next argument for donating crawls to the Wayback Machine early.

[`🔗 Internet Archive: Preserving 30 Years of Salon Journalism`](https://blog.archive.org/2026/11/12/preserving-30-years-of-salon-journalism/) · [`🔗 Salon Explorer`](https://web.archive.org/collections/salon/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50511806)

---

## 30. ULA's Vulcan rocket fails on return-to-flight — 40 Amazon Leo satellites lost after an anomaly ~10 minutes into flight

- **Velocity:** ▮▮▮ trending
- **Source:** Denver Gazette / SpaceNews · 160+ pts on HN · 15.7h ago (~04:37 UTC+8)
- **Tags:** `ula` `vulcan` `rocket-failure` `amazon-leo` `space`

United Launch Alliance's **Vulcan Centaur** — flying its **fifth flight** since its 2024 debut and its first since an earlier solid-rocket-booster anomaly this year prompted the Space Force to shift some national-security missions to SpaceX — failed on Sunday's launch from SLC-41 at Cape Canaveral. Per ULA, based on Launch Director data, the vehicle "suffered an anomaly" and "failed to deliver the Amazon mission to orbit"; the loss occurred roughly **10 minutes after liftoff**, well after booster stage separation. All **40 Amazon Leo** broadband satellites aboard were destroyed — for a constellation that had ~400 satellites in orbit and ~1,000 more built, against Starlink's 11,000+. ULA says it will "work closely with our customer and other appropriate organizations to find the cause" — an investigation is now the priority before any return to flight. Amazon's pre-flight quote ("We're really set up for success") aged badly within hours; and the failure landed one day after SpaceX's flawless Flight 15 Starship tower catch (our Nov 15 coverage).

**Why it matters:** Two deployment curves just diverged in a single weekend: the constellation racing to catch Starlink lost 4% of its orbital fleet in one stroke, and the rocket NASA's Space Force had been leaning on as the non-SpaceX option is grounded again mid-investigation. For anyone building on either Leo constellation's coverage roadmap, the schedule risk is now measured in investigation timelines, not launch cadences.

[`🔗 Denver Gazette: ULA loses Vulcan with 40 satellites aboard`](https://www.denvergazette.com/2026/11/15/centennials-ula-loses-a-giant-vulcan-rocket-with-40-satellites-aboard) · [`🔗 SpaceNews: Vulcan launch of Amazon Leo satellites fails`](https://spacenews.com/vulcan-launch-of-amazon-leo-satellites-fails) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50510442)

---

## 31. Since we covered Jensen Huang's resignation on Nov 13: the FT reports he is discussing a comeback with allies — while a fake "reinstatement letter" circulates online

- **Velocity:** ▮▮▮ trending
- **Source:** Financial Times · 169+126 pts on HN (two threads) · 16.7h ago (~03:31 UTC+8)
- **Tags:** `nvidia` `jensen-huang` `leadership` `misinformation`

Three days after Huang resigned amid the board's independent investigation (our Nov 13 coverage), the **Financial Times** reports (Nov 15) he is considering a comeback and has discussed one with close allies — with **Elon Musk and Epic Games' Tim Sweeney** reportedly among executives publicly backing his return. The signal-to-noise is genuinely poor, and the thread's most useful content is about the noise: Nvidia researcher **Bryan Catanzaro** publicly disavowed one petition, writing "There is a made-up letter circulating online asking NVIDIA's board to reinstate Jensen, claiming my involvement" and "This letter is obviously fake, and even if it were real I would not sign it." Skeptics are vocal — Wedbush's Dan Ives: "Despite pressure from major shareholders we see no chance Jensen comes back to Nvidia as CEO" — and a CNBC headline cited in the thread has Treasury Secretary Bessent urging a "dramatic shakeup" with an outside CEO. Neither Nvidia nor Huang has confirmed anything; the FT piece itself is paywalled, so details here carry that caveat.

**Why it matters:** The story is not just whether a founder-CEO returns — it's that the comeback narrative is already partially manufactured (the fake letter), in a market where his resignation moved global AI stocks double digits. Treat every "comeback" datapoint as unverified until it comes from the parties themselves; this feed's own correction history started with exactly this failure mode.

[`🔗 FT: Jensen Huang discusses comeback as Nvidia CEO with allies`](https://www.ft.com/content/45383d86-33c4-4d99-86e5-5e058d3567c1) · [`🔗 HN discussion (FT thread)`](https://news.ycombinator.com/item?id=50509883) · [`🔗 HN discussion (Reuters thread)`](https://news.ycombinator.com/item?id=50511982)

---

## 32. MIT's "How to Make (Almost) Anything" opens its 2026 site — AI agents and Edge AI are now first-class recitations in the famous fabrication course

- **Velocity:** ▮▮▮ trending
- **Source:** MIT Center for Bits and Atoms · 389+ pts on HN · 6.5h ago (~13:50 UTC+8)
- **Tags:** `mit` `fabrication` `education` `hardware` `ai-agents`

Neil Gershenfeld's MAS.863/4.140/6.9020 — the MIT course that seeded the worldwide Fab Lab network — has published its full 2026 syllabus site, and it went near the top of HN (389+ points, 6.5h). The structure is the classic one: weekly topics from CAD and computer-controlled cutting through embedded programming, electronics design/production, machining, input/output devices, and machine design, ending in student projects presented Dec 15. What's new is where AI sits: a dedicated **AI agents** recitation (10/01, alongside 3D scanning/printing week) and an **Edge AI** recitation (10/29, with input devices), both with slides and code hosted on MIT's Forge — AI agents taught as a fabrication-course skill, at the same level as EDA and motor control.

**Why it matters:** When "How to make almost anything" adds agent skills to its core syllabus — as a recitation sitting at the same level as EDA and motor control — that's the fabrication world's own signal that agent skills are baseline literacy, the same way version control became one decades ago. The full syllabus is also a free, world-class curriculum for anyone self-teaching hardware.

[`🔗 MIT HTMAA 2026 course site`](https://pub.cba.mit.edu/863.26/site/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50514470)

---

## 33. Debian 12's latest kernel update can hang servers: ext4 NULL-pointer dereference in 6.1.0-55 — seven reports, severity critical, fix upstream in progress

- **Velocity:** ▮▮ rising
- **Source:** Debian Bug Tracker #1154101 · 122+ pts on HN · 7.5h ago (~12:53 UTC+8)
- **Tags:** `debian` `linux-kernel` `ext4` `regression` `servers`

Debian bug **#1154101** (filed Nov 15, severity: critical, linux 6.1.192-1 → `linux-image-6.1.0-55-amd64`) describes servers going dark after the point update: "my server not responding remotely after few minutes (imap, smtp, http, ssh...)", while booting the previous 6.1.0-54 kernel via GRUB works fine. The captured dmesg shows "BUG: kernel NULL pointer dereference, address: 0000000000000000" crashing in **`ext4_mb_load_buddy_gfp+0xbc/0x380 [ext4]`**, with the trace running through `ext4_free_blocks` → `ext4_ext_truncate` → `ext4_evict_inode` — an inode-eviction/truncate path — and ending "note: local[2144] exited with irqs disabled". The report is forwarded upstream (an ext4/ntfs3 null-folio thread on lore.kernel.org) with a proposed fix in Debian's Salsa MR #2168, and has been merged with six duplicate reports — so it is not one unlucky reporter. No kernel-team fix has landed in the archive as of feed time.

**Why it matters:** This is the classic point-update trap: a stable-branch security/maintenance push that carries a data-path regression affecting any ext4 system under truncate pressure — i.e., most servers. If you run Debian 12 on production boxes, hold 6.1.0-55 or keep the previous kernel in your GRUB fallback until the Salsa fix ships; and note the pattern for your own release process: the bug's severity is "critical" precisely because the failure is delayed and remote-visible, not a boot failure.

[`🔗 Debian bug #1154101`](https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=1154101) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50514180)

---

## 34. Steve Blank asks "What's Next for Nvidia?" — the founder-departure problem: "Execution pays your salary, innovation pays your pension"

- **Velocity:** ▮▮ rising
- **Source:** steveblank.com · 298+ pts on HN · 12.4h ago (~07:55 UTC+8)
- **Tags:** `nvidia` `strategy` `founders` `analysis`

Steve Blank's essay (Nov 15) frames Nvidia's post-Jensen moment as the classic founder problem: when a visionary CEO leaves, "Most often innovation dies and the company coasts for years on momentum and its brand." His history: "Jensen Huang reinvented Nvidia three times" — CUDA in 2006, the deep-learning pivot after 2012's ImageNet, and the 2020 Mellanox acquisition that turned boards into integrated AI datacenter racks — "none of these CEOs pivot by committee." The danger is the execution-CEO successor (his examples: Ballmer's Microsoft, Cook's Apple missing AI), and Huang ran a 60-direct-report org, saying "he didn't believe in succession planning." Nvidia-specific threats he names: its biggest customers building their own silicon, and the ~$50B invested in AI labs that run on Nvidia — "It's likely these are the bets an execution CEO trims first" — with one financial caveat: the order book holds "unless a meaningful share of that revenue turns out to be chips that were diverted to China." His conclusion: the next two-three years look fine regardless; the long-term question is whether the board hires an executor or an innovator.

**Why it matters:** Published hours before the FT's comeback report (item 31), this essay names the exact tension the comeback speculation resolves: a board choosing between institutional comfort and the only proven leader of the three reinventions. Notably, the essay does not touch the circular-financing controversy — its argument is organizational, not financial, which is what makes it a useful complement to the WSJ reporting we covered Nov 14.

[`🔗 Steve Blank: What's Next for Nvidia?`](https://steveblank.com/2026/11/15/whats-next-for-nvidia/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50512235)

---

## 35. "Who is Hiring?" is stuck near 12-year lows — 244 postings this month, and AI now appears in 51.6% of them

- **Velocity:** ▮▮ rising
- **Source:** HN Trends · 87+ pts on HN · 10.8h ago (~09:31 UTC+8)
- **Tags:** `hiring` `ai-impact` `jobs` `data` `hacker-news`

HN Trends' November analysis puts hard numbers on the hiring contraction: the monthly thread had "**244 job postings, down 37% from 387 at the same point last year**"; every thread since July 2026 sits in a 224–255 band, and August's 224 "was the fewest since January 2014." 2026 is averaging 287 postings/month — "the lowest yearly average since 2013." Meanwhile AI crossed a threshold: it appears in **51.6%** of November postings, "up from 30% two years ago" (first above 50% in June 2026). The composition inside that is the interesting part: AI Agents/agentic terms 14.8%, LLM 10.7%, and **MCP jumped from 0.3% a year ago to 4.5%** (rank +86) while classic "Machine Learning" *fell* from 14.8% to 11.5% — the job market is re-labeling from model training to agent plumbing. Other moves: Rust rose to #3 language at 8.2% (from 4.9%), TypeScript slipped to 17.6%, and Front End collapsed from 27% of postings in early 2022 to 6.6%.

**Why it matters:** This is one of the few longitudinal, method-consistent datasets measuring AI's labor-market footprint — and it shows both halves at once: total postings at a 12-year low while AI-native skills (MCP, agents) become the fastest-growing tokens in the ones that remain. The MCP number specifically is agent infrastructure showing up as a hiring category, which is a different signal than models being popular.

[`🔗 HN Trends: November 2026`](https://www.hntrends.com/2026/november.html) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50512950)

---

## 36. "Your Agent Will Pick the Hackable One": when agents do the buying and the fixing, openness becomes a purchasing criterion

- **Velocity:** ▮▮ rising
- **Source:** geoffstearns.com · 75+ pts on HN · 15.2h ago (~05:10 UTC+8)
- **Tags:** `agents` `firmware` `right-to-repair` `hardware` `security`

Geoff Stearns' essay (Nov 2026) argues that as agents take over both purchasing advice and device maintenance, openness stops being an enthusiast concern and becomes what gets bought: asked to fix a device, the agent tries the settings first, and when those fail it "looks for firmware someone else wrote, forks the closest match, or writes its own" — so "any device with writable flash is a platform, whether the maker planned for it or not," and agents asked what to buy will "lean toward the one it can change, because that's the one it can fix later." His anchor example is the M-VAVE FM-1 synth (whose custom-firmware scene we covered Nov 14): owners began writing firmware in Sept 2025 — nearly all with AI tools — and M-VAVE responded by open-sourcing it under GPLv3 with a dev kit and browser emulator, after which Behringer, Akai and Erica Synths followed. The security half is measured, not alarmist: "harmful firmware is as easy to write as useful firmware," so his test for any policy is "asking who controls the signing keys" — noting that "if a maker blocks code the owner chose and signed, that block is protecting the maker's business," and that the mitigations (verified installers, owner-held keys, recovery modes) "none of them require locking the device."

**Why it matters:** This extends the agent-security lens from software supply chains to physical ones: the agent-picks-the-target dynamic that security researchers have modeled for exploits now applies to shopping. The concrete takeaway for hardware makers is uncomfortable — your firmware-update story is becoming part of your product's agent-readiness score, and locking it down is now a competitive decision, not a default.

[`🔗 Geoff Stearns: Your Agent Will Pick the Hackable One`](https://geoffstearns.com/blog/your-agent-will-pick-the-hackable-one/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50510799)

---

## 37. Tell HN: the hiring threads are being scraped for emails — unique-address users report targeted phishing, and dang notes posts remain deletable

- **Velocity:** ▮ steady
- **Source:** Hacker News (Tell HN) · 105+ pts · 9.5h ago (~10:53 UTC+8)
- **Tags:** `phishing` `privacy` `hacker-news` `email` `scraping`

A Tell HN post (105+ points) documents what happens when a site's public threads are harvested at scale: user eks391 received a fraudulent "late AWS payments" email at the address used *only* for Hacker News — "I use unique emails for every site, so I immediately knew that the late AWS payments email sent to my HN email were fake." The comments are a small threat model of the same mechanism: one user whose hiring-thread post "half burned my primary dev email"; another quoting the recovery problem in four words, "Unleaking is not a thing"; a report of a scam email with a "scary amount of context"; and a "classic North Korean scam job offer" — the same fake-recruiter pattern the FBI warned targets open-source maintainers (our Nov 14 coverage). Moderator dang's reply is the practical takeaway: "Those posts remain permanently deletable, FWIW."

**Why it matters:** Unique-per-site email addresses are the cheapest canary in email security, and this is the canary singing about one of the most-read hiring surfaces on the internet — hours after the data showing those same threads at 12-year lows (item 35). If you've ever posted an address in a public hiring thread, the two-step advice in the thread is worth an hour of your evening: delete the post (it still works), and check every link's destination domain before clicking.

[`🔗 Tell HN: HN is being scraped for emails to scam`](https://news.ycombinator.com/item?id=50513451) · [`🔗 dang's comment`](https://news.ycombinator.com/item?id=50514845)

---

## 38. mini.nvim moves to a dedicated nvim-mini org — and mirrors on Codeberg and Tangled — "transferred to a dedicated organization to improve long term project stability"

- **Velocity:** ▮ steady
- **Source:** Tangled · 75+ pts on HN · 12.4h ago (~07:55 UTC+8)
- **Tags:** `neovim` `mini-nvim` `tangled` `codeberg` `open-source`

**mini.nvim** — echasnovski's "Library of 45+ independent Lua modules improving Neovim experience with minimal effort" — has been transferred from the personal `echasnovski/mini.nvim` repo to a dedicated **nvim-mini** organization, with the README stating plainly: "It was transferred to a dedicated organization to improve long term project stability." The interesting part for the HN thread (75+ points) is where it now lives: GitHub remains "(main)", but the project now officially mirrors on **Codeberg** and **Tangled** — the AT Protocol-native code forge — with a `sync` branch suggesting automated mirroring, and the newest commit is literally "docs: mention Tangled and Codeberg mirrors." The Tangled copy carries the full history (2.2k commits, 18 tags, latest v0.18.0), and the README's support line is now forge-agnostic: "Leave a star for 'mini.nvim' (on any supported code forge)." It's the second Tangled-hosted story on HN today (see Parcel, item 39).

**Why it matters:** Two governance signals in one move: a widely-dependended-on Neovim library reducing bus-factor by leaving its founder's namespace, and a mainstream project choosing to treat AT Protocol's forge as a first-class mirror — the kind of adoption that matters more for a young forge than its own feature list.

[`🔗 mini.nvim on Tangled`](https://tangled.org/nvim-mini.org/mini.nvim) · [`🔗 nvim-mini/mini.nvim on GitHub`](https://github.com/nvim-mini/mini.nvim) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50512231)

---

## 39. Show HN: Parcel — a keyboard-driven Linux mail client for Gmail and Fastmail, built in Zig on the author's own Wayland toolkit

- **Velocity:** ▮ steady
- **Source:** Show HN · 51+ pts · 12.5h ago (~07:54 UTC+8)
- **Tags:** `zig` `email` `linux` `jmap` `wayland`

**Parcel** (rockorager.dev, Show HN, 51+ points) is "A mail client for Gmail and Fastmail on the Linux desktop, built with Zig and siv" — siv being the author's own UI toolkit, statically linked, Wayland-native, with a headless backend so the tests need no display. The model is keyboard-first with stackable labels: "Every action has a key, and Ctrl+K lists them all"; `/` gives live search "as you type, with Gmail's operators, whichever account it is"; threads render in an overlaying reader; and Parcel keeps its own local index so "answers most searches without asking the server." It supports Gmail and Fastmail today, any **JMAP** server in principle, v1.1.0 tagged the day before the thread, 287 commits, and it is also hosted on Tangled. (Vim-keyed compose editor included.)

**Why it matters:** The Linux desktop mail client is a graveyard genre — and this attempt is notable for two structural choices: a JMAP-first data model (rather than IMAP emulation) and a self-built toolkit rather than Electron/GTK, which keeps the whole thing small and auditable in one person's head. Also: two independent projects (Parcel, mini.nvim) choosing Tangled mirrors on the same day is the kind of coincident adoption that marks a forge's moment.

[`🔗 Parcel on Tangled`](https://tangled.org/rockorager.dev/parcel) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50512218)

---

## 40. Show HN: db-branch — copy-on-write database branches in ~0.5s for Postgres via ZFS, with a built-in MCP server so agents can query safely

- **Velocity:** ▮ steady
- **Source:** Show HN · 42+ pts · 22.5h ago (~21:50 UTC+8 Nov 15)
- **Tags:** `zfs` `postgresql` `mysql` `database-branching` `mcp`

**db-branch** (Show HN, 42+ points) applies the ZFS snapshot trick to databases: a base is "a ZFS dataset holding a loaded database," branches are ZFS clones of base snapshots, so creation copies zero bytes — "db-branch creates a copy-on-write branch of a large database in seconds, with nothing copied." Claimed numbers from their 3-node Raft test cluster: "a PostgreSQL branch is ready in about 0.5 s and a MySQL branch in about 3 s." The agent angle is built in rather than bolted on: "The built-in MCP server lets an LLM agent create a branch, run a risky query or migration on it, and delete the branch" — plus per-PR/per-CI-run databases with TTL cleanup and an `upgrade --check-only` rehearsal for major-version migrations. It's self-hosted (Ubuntu + ZFS pool, apt repo), Beta ("usable today, but APIs and command-line details may still change before 1.0"), Apache-2.0 core with some paid closed modules (SSO, audit, masking).

**Why it matters:** Agent-vs-production-database is one of the sharpest unsolved edges of agent infra — you want the agent able to test queries and migrations, and you absolutely don't want it doing that against the live system. This is the Neon/Branch-vercel-frontend idea brought on-prem with commodity ZFS, and the MCP-server-as-the-interface choice makes it usable from the harnesses this feed tracks rather than requiring a bespoke client.

[`🔗 db-branch/db-branch`](https://github.com/db-branch/db-branch) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50506940)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-16T12:46:44Z |
| Items | 40 |
| Sources tracked | 47 (Hacker News, GitHub Trending, NYT via Yahoo News, MacAnorak/Notebookcheck, Ahead of AI, Josh Blais, Common Dreams, WDR, Lucy's Save Room, IETF Datatracker, MITRE/NVD CVE records, VulDB, oss-sec, Jakub T. Jankiewicz, NVIDIA docs/blog, arXiv, Google Labs, Meta, Vercel, AG-UI releases, egm.dev, npm, Qwen blog, OpenRouter, iter.ca, uBlock GHSA advisory, Ransomnews, Gitea blog, Tor Project forum, Bruce Röttgers, Protomaps, ykiko.me, clice-io, Coles Group, Ductus, Internet Archive, Denver Gazette, SpaceNews, Financial Times, Reuters, Steve Blank, Debian Bug Tracker, HN Trends, Geoff Stearns, MIT Center for Bits and Atoms, Tangled, rockorager.dev) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[Previous day](2026-11-15.md) · [Raw .md](latest.md) · [Archive](../archive/index.md)
