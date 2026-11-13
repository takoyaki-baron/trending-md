---
date: 2026-11-14
updated: 2026-11-13T20:27:33Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 18
license: CC-BY-4.0
---

# trending.md — 2026-11-14

## 1. LibreOffice's one-line tweet tops HN as the Microsoft 365 outage enters day two

- **Velocity:** ▮▮▮ trending
- **Source:** x.com/LibreOffice · 609+ pts on HN · 3.6h ago (~01:10 UTC+8)
- **Tags:** `libreoffice` `microsoft-365` `outage`

Since we covered the outage's first 20 hours in yesterday's feed: it rolled into a second day, and the internet picked its mascot. LibreOffice's X account posted — during the outage — "LibreOffice actually works 365 days a year", and the screenshot-and-thread reaction carried that one line to **609 points**, the day's biggest HN story, with 205 comments of outage horror stories and editor nostalgia. The underlying incident is the same EX1550543 Exchange Online connectivity failure that opened at **16:17 UTC Nov 12**; a parallel thread ("still down after 12 hours", 451 pts) captured Microsoft's mitigation updates, and commenters noting the SLA arithmetic — one outage of this size is enough to drop the year's uptime to three nines.

**Why it matters:** The joke lands because the pitch it mocks is real: the whole reason organizations pay for 365 instead of running desktop suites is that the cloud version is supposed to just work — and this incident is the largest test of that promise in years. A one-line post from a 25-year-old desktop suite out-pointing every corporate comms channel is also a lesson in incident PR.

> "LibreOffice actually works 365 days a year" — the tweet's text, as carried by the HN submission

[`🔗 LibreOffice on X`](https://twitter.com/LibreOffice/status/2121205272479998268) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50486482) · [`🔗 HN: Outlook/365 still down after 12 hours`](https://news.ycombinator.com/item?id=50478609)

---

## 2. Doomsday: Friday, 13 November, A.D. 2026 — the 1960 paper's predicted date is today

- **Velocity:** ▮▮▮ trending
- **Source:** science.org (1960) · 386+ pts on HN · 8.6h ago (~20:10 UTC+8)
- **Tags:** `doomsday` `population` `forecasting`

Heinz von Foerster, Patricia Mora and Larry Amiot's famous 1960 *Science* paper fit world population to a **hyperbolic** curve — growth so super-exponential that the doubling time itself shrinks — and its singularity, "doomsday", lands on **Friday, 13 November, A.D. 2026**: today. The math was never a population forecast (the authors noted the model must break down long before infinity), but the date became a legend of extrapolation gone wrong, resurfacing every time someone fits a curve to a explosive-looking trend — Scott Alexander's 2019 series "1960: The Year The Singularity Was Cancelled" built exactly that bridge to AI-scaling debates, and HN commenters did too. The paper's page is bot-walled to a plain fetch; the DOI and the discussion carry the substance.

**Why it matters:** The useful reading is not the joke but the shape: von Foerster's equation is the canonical reminder that a curve that has fit the past does not own the future — the same warning that applies to every exponential chart in the current AI buildout, from token production to data-center wattage. As one commenter put the obvious corollary: the models that hit a wall are the ones that assumed the wall away.

[`🔗 Science: Doomsday: Friday, 13 November, A.D. 2026 (1960)`](https://www.science.org/doi/10.1126/science.132.3436.1291) · [`🔗 Slate Star Codex: 1960: The Year The Singularity Was Cancelled`](https://slatestarcodex.com/2019/04/22/1960-the-year-the-singularity-was-cancelled/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50482379)

---

## 3. Eli Lilly's CEO answers Amodei's "relics of the past in less than a decade": "I think it's not likely"

- **Velocity:** ▮▮▮ trending
- **Source:** garymarcus.substack.com · 254+ pts on HN · 6.9h ago (~21:50 UTC+8)
- **Tags:** `anthropic` `ipo` `ai-claims`

The week's strangest exchange is now a public pharma-vs-AI spat. In a video tied to Anthropic's IPO launch, CEO Dario Amodei predicted "Cancer, Alzheimer's, heart disease, mental illness — these will be relics of the past in, I think, less than a decade" (as quoted by CNBC's Meg Tirrell). Eli Lilly chairman and CEO **Dave Ricks** replied on X: "I think that would be amazing and I think it's not likely. The map of biology is still largely a blank page and randomized human proof is the long pole in the tent… progress will likely be steady and incremental." Gary Marcus's post (Nov 12) collected the wider expert pile-on — virologist Angela Rasmussen and others drawing Theranos comparisons — and argued the claim's timing, days before a listed IPO, deserves harsher scrutiny than it has received. Anthropic's roadshow is already running; the feed covered the filing itself yesterday.

**Why it matters:** The rebuttal carries unusual weight because it comes from the person who actually runs the clinical-trial machinery Amodei's timeline would have to traverse — and because it lands in IPO week, where overclaiming has a price tag attached. Watch whether the claim resurfaces in the listing documents.

> "I think that would be amazing and I think it's not likely. The map of biology is still largely a blank page and randomized human proof is the long pole in the tent." — Dave Ricks, Eli Lilly

[`🔗 Marcus on AI: Eli Lilly CEO pushes back`](https://garymarcus.substack.com/p/breaking-eli-lilly-ceo-becomes-latest) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50483480)

---

## 4. AI unlocks Gödel's notebooks — 663 theorems surfaced, ~400 verified in Coq, and a proof of the axiom of choice "one step away"

- **Velocity:** ▮▮▮ trending
- **Source:** theguardian.com · 191+ pts on HN · 3.3h ago (~01:30 UTC+8)
- **Tags:** `godel` `formal-verification` `research`

Finnish logician **Jan von Plato** has spent years transcribing Kurt Gödel's early-1940s "workbooks" — 1,009 pages in the obsolete Gabelsberger shorthand (he is one of roughly six people alive who can read it) — at about a page a week. In September he gave his transcriptions plus six books of his own Gödel scholarship to Claude, and got a **650-page digest in days**. Claude extracted **663** results with a proof, proof sketch or proof idea; running them through the Coq proof assistant, von Plato reports **about 400 verified as stated, about 200 repaired** (sharpened statements or added assumptions), **about 50 false** — some already marked *falsch!* by Gödel himself. The headline find: a reconstruction of Gödel's claimed 1940s proof of the independence of the axiom of choice, which von Plato says passes Coq and is "one step away" from complete — one wrong definition, though Gödel had the right one two years earlier. Independent logician Joel David Hamkins, who has not seen the reconstruction, counseled exactly the right caution.

**Why it matters:** This is the strongest public example yet of the AI-in-formal-mathematics loop: model proposes, proof assistant disposes. The caveats travel with the result — every claim rests on von Plato's verification, ~200 of 663 needed repair, and Hamkins' line is the honest frame for the whole genre.

> "Although how much is Claude and how much is Gödel is a job for the historians." — Joel David Hamkins, University of Notre Dame

[`🔗 The Guardian: AI helps unlock discoveries hidden in Gödel's notebooks`](https://www.theguardian.com/science/2026/nov/13/kurt-godel-notebooks-ai-helps-unlock-hidden-discoveries-man-who-transformed-maths) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50486748)

---

## 5. "Why Zig over C for Systems Programming" — errdefer replaces the goto-ladder, and the essay is honest about what C keeps

- **Velocity:** ▮▮ rising
- **Source:** mtsoukalos.eu · 196+ pts on HN · 6.7h ago (~22:00 UTC+8)
- **Tags:** `zig` `c` `systems-programming`

Mihalis Tsoukalos — following his earlier "Why Zig over Rust" — takes on the harder comparison, because Zig and C want the same things: small language, no GC, close to the machine. The essay's center is the resource-cleanup ladder: the Linux-kernel-style `goto fail; fail_name: …` cascade, where cleanup lives far from allocation and label order must be maintained by hand, versus Zig's `errdefer`, which keeps each release next to its acquisition and unwinds automatically. All examples compiled on a Mac with **Zig 0.17 and clang**. The framing is deliberately not a conversion tract: "C is my favorite programming language! I am writing it because I do not want to write new code in C any more" — with C's strengths (K&R-in-a-book smallness, 1990s code still compiling, a compiler for every CPU) credited up front.

**Why it matters:** The Zig-vs-Rust debate gets the attention, but the C-to-Zig migration is the larger practical audience — and this essay argues it cleanly on the one axis (cleanup without ceremony) where Zig's case is simplest. "Why Zig over Rust" then "Why Zig over C" is also a nice window into how working programmers actually choose languages: one pain point at a time.

> "C is my favorite programming language! I am writing it because I do not want to write new code in C any more."

[`🔗 mtsoukalos.eu: Why Zig Over C for Systems Programming`](https://www.mtsoukalos.eu/2026/11/why-zig-over-c-for-systems-programming/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50483611)

---

## 6. Haskell Foundation's new Technical Leadership Committee publishes its vision: GHC CI from 6 hours to 2, and "no better language for 'human in the loop'"

- **Velocity:** ▮▮ rising
- **Source:** discourse.haskell.org · 137+ pts on HN · 6.0h ago (~22:40 UTC+8)
- **Tags:** `haskell` `tooling` `language-ecosystem`

The Haskell Foundation's technical leadership committee (TLC), now "fully operational", published its shared strategy with an unusually current pitch: Haskell sits "at an interesting intersection between human craftsmanship and machine automation" — strong for hand-written code and for "responsible AI workflows", because "review is a significant bottleneck in modern AI-workflows and Haskell's strengths heavily favor the reviewer". Concrete targets: iteration speed first — GHC's own CI turnaround is **6 hours** and the committee wants **2** — plus live step-through debugging, "actually useful stack traces", and editor-integrated profiling, aimed at beginners, experts and industry stability. Initiatives will run through a lightweight community proposal process with open counter-proposals, because "fairness and participation are vital, especially when funding is involved".

**Why it matters:** Every mature-language foundation is currently rewriting its pitch for the agent era, and Haskell's — that a language whose type system taxes the writer and pays the reviewer is an AI-workflow fit — is one of the more concrete ones. The 6h→2h CI goal is the measurable commitment to hold it to.

> "There may be better languages for formal verification or for vibecoding, but there's no better language for 'human in the loop'."

[`🔗 Discourse: A technical vision for the Haskell ecosystem`](https://discourse.haskell.org/t/a-technical-vision-for-the-haskell-ecosystem/15078) · [`🔗 haskellfoundation/technical-leadership-committee`](https://github.com/haskellfoundation/technical-leadership-committee) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50484235)

---

## 7. Brazil's Caixa Seguridade breach: registration data of all 7.6 million insurance customers exposed

- **Velocity:** ▮▮ rising
- **Source:** Caixa Seguridade disclosure (PDF) · 148+ pts on HN · 4.9h ago (~23:50 UTC+8)
- **Tags:** `breach` `brazil` `pii`

Caixa Seguridade — the insurance and pension subsidiary of Brazil's state-owned bank Caixa — disclosed that attackers accessed and copied the registration database of **Caixa Vida e Previdência**: names and CPF tax IDs of **all 7.6 million** current and former customers, 100% of the unit's active base, in an incident dated **November 6**. The disclosure, filed as an investor-relations document and now fronting HN, states the compromised data is registration information (the coverage so far does not report financial credentials among the exposed fields), and Brazilian coverage is warning customers of targeted phishing now that attackers hold core identity data. It is the latest in a recent wave of attacks on Brazilian financial institutions.

**Why it matters:** Tax-ID-plus-name registries are the raw material of identity fraud in Brazil's CPF-based system, and the 100%-of-the-active-base figure — rather than a subset — is what makes this one of the region's larger disclosed breaches this year. The scale will test Brazil's LGPD enforcement, which has been accelerating.

[`🔗 Caixa Seguridade material fact (PDF)`](https://filemanager-cdn.mziq.com/published/3972906b-e50b-4f74-ab74-4d0d32125d11/9567a559-d20a-486e-a7ae-5c6bbc030c5e) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50485295)

---

## 8. Google's "AI or nothing": schools that disable AI Overviews lose Search entirely — and the antitrust theory explains why

- **Velocity:** ▮▮ rising
- **Source:** text.npr.org · 115+ pts on HN · 5.3h ago (~23:30 UTC+8)
- **Tags:** `google` `education` `antitrust`

Google has told schools it will no longer support disabling just AI Overviews in Search: per NPR, districts that don't want AI in the classroom "will lose access to Google Search altogether" — an all-or-nothing choice hitting systems that recently banned classroom AI, including **Los Angeles Unified, Seattle Public Schools and NYC Public Schools**. Google's statement: "Our goal is simple: provide school leaders the control and confidence to use AI products in classrooms as they see fit." The sharpest theory in the piece comes from ex-Googler Tracy Pizzo: letting admins turn AI Overviews *off* would be evidence the feature can be separated from Search — the exact separation Google's lawyers argued against in the antitrust suits dismissed on October 1. NYC Mayor Zohran Mamdani accused Google of forcing AI into public schools, Sen. Ed Markey demanded a reversal, and the announcement was followed a day later by a lawsuit from North Carolina parents (*Emma v. Google*) over a Gemini self-harm conversation on a school Chromebook.

**Why it matters:** This is what monopoly leverage looks like at the procurement layer: the customer's opt-out is priced at losing the product entirely. The antitrust reading — that the all-or-nothing switch exists to protect a legal argument — is NPR's reporting, not confirmed intent, but the schools' dilemma is concrete either way.

[`🔗 NPR: Why is Google cutting off Search from AI-free schools?`](https://text.npr.org/nx-s1-6029408) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50484960)

---

## 9. Alibaba's internal AI code reviewer crosses 50,000 stars — and its benchmark claims the same model, different harness, four times the precision

- **Velocity:** ▮▮ rising
- **Source:** alibaba/open-code-review · +206★ today · 50,475 total
- **Tags:** `code-review` `agents` `benchmark`

OpenCodeReview — a Go CLI that Alibaba says ran as its internal official AI code-review assistant for two years ("tens of thousands of developers", "millions of code defects" — the README's own claims) — topped GitHub trending at **+206 stars today**, shipping v1.13.9 this morning. Its pitch against general-purpose agents is deterministic-pipeline-plus-agent: file selection, bundling and rule matching handled by engineering logic, the LLM used only where it wins. The evidence is **AACR-Bench** — by the README's own count: 50 OSS repos, 200 real PRs, 10 programming languages, 1,505 issues annotated by 80+ senior engineers, with the dataset on Hugging Face — and the same-model pairs are striking: Claude-4.6-Opus through OpenCodeReview scores **33.90% precision (301/889), F1 25.10%, 385K tokens, 1m23s** — through Claude Code v2.1.169, the same model scores **7.23% precision (435/5,980), F1 11.57%, 5,664K tokens, 13m6s**, with the *highest* recall in the table (28.90%). The README summarizes the token gap as "~1/9" and states plainly that recall is deliberately lower.

**Why it matters:** It is a vendor's own benchmark — Alibaba annotates, Alibaba's harness wins — so treat the absolutes as marketing until AACR-Bench gets independent use. But the structure of the result (same weights, radically different harness cost/precision/recall trade-off) matches what agent-infrastructure teams are finding everywhere, and 50k stars says the pain point is real.

[`🔗 alibaba/open-code-review`](https://github.com/alibaba/open-code-review) · [`🔗 AACR-Bench dataset on Hugging Face`](https://huggingface.co/datasets/Alibaba-Aone/aacr-bench)

---

## 10. After 600 experiments on LeWM: JEPA's predictions were never the bottleneck — the planning was

- **Velocity:** ▮▮ rising
- **Source:** haddyalchaer.com · 119+ pts on HN · 2.8h ago (~01:55 UTC+8)
- **Tags:** `jepa` `world-models` `research`

An independent, months-long replication study of **LeWM** — the JEPA world model from Yann LeCun's team, benchmarked on Push-T — reports 600 experiments with an uncomfortable headline result: swap LeWM's learned predictor for the simulator's *perfect physics* and success barely moves, **78% → 77%** on 250 long-horizon tasks. The predictions were already good enough; what the published system lacks is planning. Used exactly as released, LeWM solves **22%** of 75-step-horizon tasks; the author's four training-free planning methods take that to **85%**, about matching a planner handed ideal expert subgoals. Subgoal spacing explains most of it (LeWM is accurate over 25 steps — 89.7% vs 90.5% with exact physics — and degrades over 75), and a single change to how goals are scored adds **60 points**, three times the gain that perfect physics bought.

**Why it matters:** The JEPA-vs-generative debate mostly argues about what the model should predict; this experiment says the interesting variance is in how predictions are *used* — subgoal structure and goal scoring moved the needle far more than prediction fidelity. Method: one author, one benchmark, no code-release claim — read it as a strong field report, not a settled result.

[`🔗 Haddy Alchaer: After 600 experiments, here's what I discovered about JEPA world models`](https://haddyalchaer.com/jepa) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50487185)

---

## 11. CISA KEVs two new entries today: an IRC server running commands "with server authority", and a Check Point daemon socket that runs as root

- **Velocity:** ▮ rising
- **Source:** CISA KEV catalog 2026.11.13 · added 2026-11-13
- **Tags:** `kev` `unrealircd` `checkpoint`

Today's KEV batch adds two actively-exploited vulnerabilities. **CVE-2026-114713** (UnrealIRCd, 8.6): the `labeled-response` module in 6.0.0 before **6.2.7.1** fails to escape the IRCv3 "label" message-tag when echoing it into replies, letting any user on a linked network inject **server-to-server commands executed with server authority** — the score is MITRE's own (Secondary), the record still `Undergoing Analysis`, with the advisory on the UnrealIRCd forum and an oss-security post from Nov 8. **CVE-2026-123039** (Check Point Gaia, 7.8): the DynamicCLI daemon runs as root listening on a **world-writable local socket** (`/tmp/dynamic_socket`) with no authentication of connecting processes, so any local user can send commands executed as root — vendor-advised via sk1000362. Both records already carry CISA-ADP SSVC enrichment timestamped this afternoon (19:02–19:03 UTC).

**Why it matters:** Both are exploitability lectures in miniature: a protocol field that crosses a trust boundary (label → server command) and a local socket that assumes only trusted processes can reach it. The IRC one is internet-reachable on the many small networks still running old UnrealIRCd; the Check Point one needs a foothold but turns any sandbox escape on a gateway appliance into root on the security box itself.

[`🔗 NVD: CVE-2026-114713 (UnrealIRCd)`](https://nvd.nist.gov/vuln/detail/CVE-2026-114713) · [`🔗 NVD: CVE-2026-123039 (Check Point Gaia)`](https://nvd.nist.gov/vuln/detail/CVE-2026-123039) · [`🔗 CISA KEV catalog`](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)

---

## 12. EU digital identity wallets: the 24 December deadline is 40 days out and two states have a public wallet

- **Velocity:** ▮ steady
- **Source:** myid.ie EU Wallet Tracker · 111+ pts on HN · 5.8h ago (~23:00 UTC+8)
- **Tags:** `eu` `digital-identity` `eidas`

A tracker that scores all 27 member states against primary sources (evidence checked 7–15 October) puts the eIDAS 2 rollout in stark numbers: every state must offer citizens a wallet by **24 December 2026** — 40 days from today — yet only **two** (Denmark's AltID, Italy's EUDIW-IT) are publicly available, three including Ireland are "in real users' hands", ten are in pilot, ten in development, four in procurement and one (Bulgaria) still planning. Grades run A0, B2, C13, D11, E1, and **six states** (EE, FI, DE, NL, RO, SE) have announced public availability *after* the legal date — the tracker is careful to call those announced targets, not breaches. The next legal wall is harder: specified private services (banks, strong-authentication providers) must *accept* the wallets from **24 December 2027**. This week's dated milestones include Cyprus's tender closing today and Poland's mObywatel eIDAS adaptation due this month.

**Why it matters:** The deadline the EU set in 2024 arrives in six weeks with 92% of the union short of a public wallet, which makes the 2027 acceptance mandate — the part that touches every bank and marketplace — the compliance event that will actually bite. The tracker's methodological honesty ("grades describe published evidence, not legal compliance") is itself worth copying.

[`🔗 MyID: EU Wallet Tracker — all 27 states`](https://myid.ie/business/eu-digital-wallet-tracker/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50484496)

---

## 13. Lonewolf 0.3: the Rust XMPP server learns federation — and ships it two hours before its HN thread

- **Velocity:** ▮ steady
- **Source:** lonewolf-im/lonewolf · 104+ pts on HN · 6.3h ago (~22:30 UTC+8)
- **Tags:** `xmpp` `rust` `self-hosted`

**Lonewolf**, a standalone XMPP server written in Rust, released **v0.3.0** today (18:06 UTC) with the feature its earlier versions lacked: **federation** — message, presence, IQ and roster-subscription exchange with other XMPP servers, on by default wherever the host has a certificate and public DNS. Peer authentication is deliberately strict: certificate-only via SASL EXTERNAL, with direct TLS added alongside the extensions desktop clients rely on. The project stays honest about its stage — pre-1.0, single node, with full XMPP compliance and clustering still on the roadmap — and v0.2.0 (Oct 27) had added discovery, profiles and message sync for local clients.

**Why it matters:** An XMPP server you can actually federate with is the difference between a toy and a self-hostable messenger — and the strict certificate-only inter-server trust is a notable design bet against the protocol's historically weak server-to-server story. The self-hosted-messaging revival keeps choosing Rust for exactly this kind of single-binary deployable.

[`🔗 Lonewolf v0.3.0 release notes`](https://github.com/lonewolf-im/lonewolf/releases/tag/v0.3.0) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50484007)

---

## 14. chrome-devtools-mcp v1.13: logpoints and page-scoped network mocks for the agent that debugs your app

- **Velocity:** ▮ steady
- **Source:** ChromeDevTools/chrome-devtools-mcp · +145★ today · 55,381 total
- **Tags:** `mcp` `devtools` `debugging`

Chrome DevTools' official MCP server — the bridge that lets coding agents drive a real browser with DevTools-grade instrumentation — is trending again (+145★ today) on the strength of **v1.13.0** (Nov 11): **logpoints** built on the DevTools BreakpointManager (log without pausing the page the agent is inspecting), **page-scoped network mocks**, and support for upstream mock responses, extending a toolset that already exposes performance traces, DOM access and emulation to agent clients. At 55k stars it is one of the most-installed MCP servers in the ecosystem, and it pairs naturally with the Chrome/Edge/Firefox/MDN Modern Web Guidance skill this feed covered on Nov 10 — the Chrome team is now shipping both the *advice* layer and the *instrumentation* layer for agents.

**Why it matters:** Debugging is where browser-driving agents break down — page state is invisible, network behavior is inferred. Logpoints and scoped network mocks give the agent the same two primitives a human debugger reaches for, which is the difference between guessing at a bug and reproducing it.

[`🔗 chrome-devtools-mcp v1.13.0 release notes`](https://github.com/ChromeDevTools/chrome-devtools-mcp/releases/tag/chrome-devtools-mcp-v1.13.0) · [`🔗 ChromeDevTools/chrome-devtools-mcp`](https://github.com/ChromeDevTools/chrome-devtools-mcp)

---

## 15. NetScaler's record wave triples: 28 CVEs now hang off one Citrix advisory, arriving on an hourly cadence, all still `Received`

- **Velocity:** ▮ steady
- **Source:** NVD records · published 00:20–09:17 UTC Nov 13 in six tranches, each ~:17 past the hour
- **Tags:** `citrix` `netscaler` `cve-wave`

Since we covered the first nine NetScaler records in yesterday's feed: the same advisory (**CTX697305**) kept producing them, on a metronome. NVD now shows **28** Citrix NetScaler ADC/Gateway records published Nov 13 UTC — six tranches at 00:20, 02:18, 03:17 (yesterday's nine), 04:17, 08:17 and 09:17 — all CVSS 4.0, all `Received`, every one pointing at CTX697305. The ID ranges straddle the tranches rather than matching them: of `CVE-2026-111333–111342`, three arrived at ~04:17 and seven at ~08:17; of `CVE-2026-120860–120868`, four at ~08:17 and four at ~09:17 — with 120868 itself in yesterday's nine, the day's first record at 00:20. The new records' highs hold at **9.3** for memory overflows in EPA/Endpoint Analysis, ICA proxy and Email OTP authentication (the wave's one **9.5** was in yesterday's nine), with **8.7** grades across LDAP authentication, SSL/TLS/DTLS, HTTP/3 (QUIC), the management plane and GSLB — the descriptions remain memory-overflow/DoS-worded, and yesterday's item's fixed builds (14.1-73.57, 13.1-64.39) are the same advisory's remedy. (An earlier version of this item bound both ID ranges to single tranches; the records' own `published` timestamps split them.)

**Why it matters:** The cadence is now the story's strongest signal: every tranche lands at ~:17 past the hour, the same pattern as sibling advisory CTX697320's single NetScaler Console record the day before (14:17 UTC Nov 12) — the signature of an automated publishing pipeline rather than one audit's output, and one that had produced nothing further by end of day UTC. A 28-record wave against edge load-balancers with pre-auth-adjacent components (EPA, ICA proxy, GSLB) is exactly the shape that preceded Citrix Bleed. The records' own arithmetic is still pending — `Received` means NVD hasn't touched them — so treat component names, not scores, as the patch-priority signal until the advisory's text is readable.

[`🔗 NVD: CVE-2026-111334 (EPA/EPAS memory overflow)`](https://nvd.nist.gov/vuln/detail/CVE-2026-111334) · [`🔗 Citrix advisory CTX697305`](https://support.citrix.com/support-home/kbsearch/article?articleNumber=CTX697305)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-13T20:27:33Z |
| Items | 15 |
| Sources tracked | 18 (Hacker News, GitHub Trending, CISA KEV, NVD, vendor blogs, major tech press) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[Previous day](2026-11-13.md) · [Raw .md](latest.md) · [Archive](../archive/index.md)
