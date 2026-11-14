---
date: 2026-11-14
updated: 2026-11-14T04:25:24Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 26
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

## 16. FAA orders a nationwide ground stop — the first in years — then lifts it 4.5 hours later, cause still unstated

- **Velocity:** ▮▮▮ trending
- **Source:** FAA ATCSCC advisory (fly.faa.gov) · 1,400+ pts on HN · 7h ago (~05:05 UTC+8)
- **Tags:** `faa` `aviation` `infrastructure` `outage`

The day's biggest story by an order of magnitude: at ~21:00 UTC Nov 13 the FAA issued a **nationwide ground stop** — every US airport, departing flights held — citing, per the order's text as quoted in the HN thread, "DUE TO EXTRAORDINARY CIRCUMSTANCES AND FOR REASONS OF SAFETY". It was lifted at **01:19Z** per the FAA's own cancellation advisory (ADVZY 005: "THE FAA COMMAND CENTER NATIONWIDE GROUND STOP HAS BEEN CANCELLED. EFFECTIVE TIME: 140119-140200"), about 4.5 hours after it began. The official record states no cause beyond "extraordinary circumstances"; the thread's most-informed comment reports "the ATC radio system went down across the country" — unconfirmed by any official channel so far. Second-order effects propagated immediately: Canada's Victoria also stopped (tracked live on a 230-point airband thread), and Amtrak reported major booking-system issues as displaced travelers re-routed, itself a 134-point thread.

**Why it matters:** A nationwide stop is close to unprecedented in scale, and it lands in the same week as the Microsoft 365 outage — two national-scale infrastructure failures in 48 hours is a resilience pattern, not a coincidence of bad luck. The FAA's own advisories are the only authoritative record right now, and they are terse; watch for the post-incident report the way the industry watched NOTAM's 2023 file corruption.

> "DUE TO EXTRAORDINARY CIRCUMSTANCES AND FOR REASONS OF SAFETY" — the ground stop order's stated reason, as quoted in the HN submission

[`🔗 FAA ATCSCC cancellation advisory ADVZY 005`](https://www.fly.faa.gov/adv/adv_otherdis?adv_date=11142026&advn=5) · [`🔗 HN discussion (1,400 pts)`](https://news.ycombinator.com/item?id=50489641) · [`🔗 HN: FAA lifted National Ground Stop at 0119Z`](https://news.ycombinator.com/item?id=50492601)

---

## 17. Reverse engineering a Coway air purifier to ditch the cloud: the root CA arrives over plain HTTP — "It was always MitM-able"

- **Velocity:** ▮▮▮ trending
- **Source:** scottjg.com · 700+ pts on HN · 30h ago (Nov 12, ~06:03 UTC+8)
- **Tags:** `iot` `reverse-engineering` `home-assistant` `mqtt`

Scott J. Goldman's deep-dive on local-controlling a cloud-dependent Coway Airmega IconS is the week's best IoT teardown. The existing Home Assistant integration scrapes Coway's IoCare cloud, which breaks constantly — the post's own list: Coway banned the integration, rebranded the app IoCare→IoCare+, changed HTML layouts, went offline, and banned his account "for running an old version of the integration". So he built a Pi access-point + nftables + mitmproxy rig (fun detail: mitmproxy ships a built-in `--emudhra-old` flag that auto-uses the eMudhra compromised root CA this feed covered in October) and found the punchline immediately: the fan downloads its root CA certificate **over plain HTTP** — no pinning, no downgrade fight. Control turns out to be MQTT over TLS on AWS IoT, and the Bluetooth provisioning payload (protobuf + PKCS#7 + AES, "P002"-prefixed) — "It'd be at least hours of work (likely days)" by hand — took his coding AI "about 20 minutes" to reimplement. Because provisioning sets `caUrl` and `certSvrUrl`, you point the fan at your own server once and the MitM rig becomes unnecessary. Result: a Home Assistant custom integration with Web Bluetooth provisioning.

**Why it matters:** The device-security reading is bleak (a root CA fetched over HTTP means the "secure" IoT control channel was always interceptable), and the workflow reading is the newer half: protocol archaeology from decompiled apps and BLE logs is becoming an AI-speed task. The post is also an honest model of AI-assisted work — including the bit where "Claude will not oblige the request, not even for… uhh… testing purposes. Luckily, ChatGPT has no such compunctions."

> "The fan downloads its root CA cert over plain HTTP. It was always MitM-able."

[`🔗 Scott's Blog: Reverse Engineering My Coway Air Purifier to Ditch the Cloud`](https://scottjg.com/posts/2026-11-11-reverse-engineering-my-coway-air-purifier-to-ditch-the-cloud/) · [`🔗 HN discussion (700 pts)`](https://news.ycombinator.com/item?id=50474959)

---

## 18. "No AI Slop: A Manifesto" — a summit of speakers and attendees writes the Agile-Manifesto answer to agent output

- **Velocity:** ▮▮▮ trending
- **Source:** slopmanifesto.com · 189+ pts on HN · 8.2h ago (~03:50 UTC+8)
- **Tags:** `ai-slop` `manifesto` `culture` `code-review`

Written by "the speakers and attendees of AIE Code Summit 2026" and explicitly modeled on the 2001 Snowbird gathering ("In 2001, 17 software engineers and leaders got together at a ski lodge…"), the manifesto proposes five values: **Outcomes over output · Understanding over speed · Our own thinking over a model's first draft · Better work over easier work · Improving the system over patching the output**. Its working definition is the part being quoted onward: "Slop is when we put less effort into producing something than we ask the consumer to spend understanding it." The beliefs section names the asymmetry and the compounding — "a swarm of agents can produce more work in a single day than a person can review in our lifetime"; "The cost of producing a thousand-line PR or a ten-page doc is approaching zero, while the cost of reviewing it remains constant"; and "Using AI doesn't necessarily make something slop. Slop happens when we pass AI output along without taking responsibility."

**Why it matters:** Whether a summit-authored document can do for review debt what Agile did for process debt is exactly the kind of thing you can't know in advance — but the definition-of-slop move (producer effort vs consumer cost) is the sharpest articulation of the problem the discourse has produced, and it lands the same week as Jonathan Blow's talk asking why software isn't better if AI solved coding, and The Atlantic's piece on AI literary scams. The review-economics framing also matches what this feed's own items keep finding, from the Haskell Foundation's morning item on review as the bottleneck to Plannotator's whole pitch.

> "Slop is when we put less effort into producing something than we ask the consumer to spend understanding it."

[`🔗 No AI Slop: A Manifesto`](https://www.slopmanifesto.com/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50488769) · [`🔗 Jonathan Blow: If AI Solved Coding, Why Is My Software Still the Same?`](https://www.youtube.com/watch?v=IRK8h67ol7Q)

---

## 19. OpenAI disbands its stand-alone robotics team — researchers to Mark Chen's org, hardware to Brockman's, CoRL booth never staffed

- **Velocity:** ▮▮ rising
- **Source:** Fortune (exclusive) · 151+ pts on HN · 10h ago (~01:58 UTC+8)
- **Tags:** `openai` `robotics` `industry`

Fortune's Wen Shao reports OpenAI has disbanded its stand-alone robotics team and reassigned the researchers: robotics research moves to the main research organization under Chief Research Officer **Mark Chen**, while applied robotics and hardware move to the Applied organization under President **Greg Brockman**. A spokesperson framed it as acceleration, not retreat — "robotics remains a core part of OpenAI's long-term vision" — and the bet is that general models should control robots (including humanoids) rather than a dedicated team building robot-specific ones. The telling detail: OpenAI had already registered booth #208 at CoRL in Austin this week, the conference app listed it, and when Fortune visited the booth "sat empty with OpenAI's logo nowhere to be seen". History rhymes: the 2020 wound-down team (Wojciech Zaremba citing limited robot data), the 2024 rebuild, the Figure partnership ended Feb 2025, and Sam Altman's stated target of a first humanoid public demo in 2027.

**Why it matters:** This is the org-chart expression of the biggest unresolved question in embodied AI: does the robot brain come from the same model that does everything else, or does robotics need its own stack? OpenAI just answered "same model" structurally — which makes the 2027 demo promise, and the empty CoRL booth, the two things to hold it to.

[`🔗 Fortune: OpenAI disbands its stand-alone robotics team`](https://fortune.com/2026/11/13/openai-disbands-robotics-team-as-its-general-models-start-running-robots/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50487184)

---

## 20. Weight Space Misfolding: a threat model for edited weights — "by analogy with protein misfolding in prion disease"

- **Velocity:** ▮▮ rising
- **Source:** alphaxiv.org · 136+ pts on HN · 9.5h ago (~02:33 UTC+8)
- **Tags:** `weight-space` `model-editing` `security` `research`

Chris von Csefalvay, Pranav Doma, Achyuthan Unni Krishnan and Tamas Foldi (HCLTech) take the weight-space-programming capability this feed covered on Nov 12 — models directly editing other models' weights — and write its security threat model. The paper's move is the prion analogy: **weight space misfolding**, where one model induces unauthorized behaviour in another through direct modification, with both "direct interference and hypothetical onward propagation" (an edited model re-editing others) in scope. The structural problem is asymmetry: an attacker "merely needs to generate the payload attack once", while a defender must find it in the haystack of weights — leaving defenders "either prohibit weight editing altogether, forfeiting its benefits, or be bound to cover the burden and cost". The taxonomy covers factual substitution, capability denial and selective omission (including offensive *selective unlearning*), illustrated on three case studies via the IWIBench interface.

**Why it matters:** Nov 12's story showed weight-space programming works and can be checked by classical algorithms; this paper is the adjacent question nobody had formalized — what does a supply chain of *edited checkpoints* look like when the edit is the attack? The defender-asymmetry framing is the reusable idea: it predicts that pure-detection defenses lose, and policy (provenance for distributed weights) becomes the load-bearing defense.

> "We call this weight space misfolding, by analogy with protein misfolding in prion disease."

[`🔗 alphaXiv: Weight Space Misfolding`](https://www.alphaxiv.org/abs/2611.weight-space-misfolding) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50487762)

---

## 21. Terminal borders that don't cost a cell: the Ratatui maintainer proposes a cell-edge line protocol, patched into Ghostty

- **Velocity:** ▮▮ rising
- **Source:** joshka.net · 135+ pts on HN · 5h ago (~07:06 UTC+8)
- **Tags:** `terminals` `tui` `ratatui` `ghostty`

Josh — who maintains **Ratatui**, the Rust TUI library — proposes a terminal protocol extension that draws thin lines on the *edges* of cells instead of occupying cells with box-drawing characters: "Every line in that screenshot is a cell border. None of them use up a row or column." The motivation is that the Unicode Box Drawing block's 128 characters are structurally insufficient for real layouts, so TUI authors either burn rows/columns on borders or drop them for color. He's implemented it as **a patch to Ghostty** (an earlier version in Rio), with demo apps built on Ratatui, and is explicitly soliciting feedback from terminal and TUI authors — a protocol proposal, not a shipped feature. The post also carries its own disclosure up front: "This post (and the code behind it) was written with a lot of help from AI. I'm not going to apologize for that."

**Why it matters:** Terminal capability advances have historically spread exactly this way — one emulator ships a protocol, TUI libraries grow support, the rest follow (the kitty graphics protocol path). Ghostty keeps volunteering as the experimental substrate, and a borders protocol is a small, concrete case of the same wedge. If Ratatui adopts it, the emulation layer becomes the bottleneck.

> "Every line in that screenshot is a cell border. None of them use up a row or column."

[`🔗 joshka.net: Terminal borders that don't cost a cell`](https://www.joshka.net/cell-borders/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50491423)

---

## 22. Perplexity ships Decider v1.3 — open-weights decision models with a new `locate` feature, and its own agent-security use case

- **Velocity:** ▮▮ rising
- **Source:** perplexity.ai/hub/blog · 107+ pts on HN · 8.7h ago (~03:24 UTC+8)
- **Tags:** `decision-models` `classifier` `routing` `perplexity`

Perplexity published the full training/eval writeup for **Decider v1.3** and **Decider Flash v1.3** (a smaller distilled sibling): general-purpose classifiers that return probability distributions for yes/no, multiple-choice and ordered-score questions. Both models are on Hugging Face **under Apache license**, via OpenRouter and the Decisions API. The post credits the lineage — "inspired by Jev, TypeSafe AI's System One Model" — and adds **bidirectional attention**, better-curated data, vision-task support, and a new **`locate`** feature that highlights the selected span for NER/PII/extractive-QA-style tasks. Training hygiene is described concretely (benchmark splits excluded from the generalist stage; a second LoRA stage for targeted domains). The internal-usage section is the substantive part: a 200+-task zero-shot eval suite, query classification in production with real volumes (information extraction 425,402 questions, domain classification 409,564, sentiment analysis 344,158), and "self-improving security rules" — recording agent activity and running rule-based checks against it with Decider in the loop.

**Why it matters:** The decision-model pattern — small classifier for route/judge/moderate, escalate the hard cases to the big model — has been accumulating evidence all month (Amazon's internal ticketing swap on Nov 10; the calibrated-escalation result on Nov 7). This is the first fully open-weights, Apache-licensed entrant with a published eval method, which makes the pattern independently reproducible rather than vendor-illustrated.

[`🔗 Perplexity: Decider v1.3 — Training, eval, and use cases`](https://www.perplexity.ai/hub/blog/perplexity-decider) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50488464)

---

## 23. FBI: North Korea's "FaceStealer" stole $400M+ via fake video calls — and it explicitly targets open-source maintainers

- **Velocity:** ▮ rising
- **Source:** BBC · 94+ pts on HN · 11.2h ago (~00:50 UTC+8)
- **Tags:** `north-korea` `social-engineering` `crypto` `fbi`

The FBI has named and detailed the scheme behind a wave of crypto thefts: **FaceStealer**, which per the FBI took **more than $400 million** from **more than 900 victims over 18 months** using fabricated video calls. The mechanism: fake or hijacked social accounts invite a target to a call on an "imposter version" of Zoom, Teams or Google Meet; the screen plays **pre-recorded video of a victim's real acquaintance** with deliberately malfunctioning audio; a prompt offers to "fix" it, delivering the malware; the call is secretly recorded and the recording becomes vouching material for the *next* victim. The targeting is the feed-relevant part: the scheme "aggressively targets" crypto and web3 workers, **"particularly those who are involved in the development and maintenance of open-source software"**. FBI cyber director Brett Leatherman: "The North Korean regime relies on proceeds from large-scale cryptocurrency theft to fund its illicit weapons program." It follows last week's attribution of the record **$6.3bn Binance hack** to North Korea-linked actors.

**Why it matters:** Open-source maintainers are being named as a priority target class by a state actor, with a social-engineering loop specifically built to defeat the I-know-this-person-on-the-call heuristic. The defensive rule is now procedural, not technical: verify identities out-of-band before any call-initiated install, and treat video presence as zero evidence.

> "A highly effective social engineering scheme capable of deceiving even the most experienced technical and security conscious computer user." — FBI on FaceStealer

[`🔗 BBC: North Korean hackers used fake video calls in $400m crypto hack`](https://www.bbc.com/news/articles/cqdj1ellpd70o) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50486178)

---

## 24. Apify discloses a security incident: compromised credential led to customer data access — and open storages were readable by ID

- **Velocity:** ▮ rising
- **Source:** status.apify.com · 92+ pts on HN · 11.1h ago (~00:55 UTC+8)
- **Tags:** `security` `breach` `apify` `scraping`

Apify — the web-scraping platform whose actors sit underneath a lot of agent data-collection — is running a public incident report. Timeline from the status page: on **November 9–10** "an unauthorized third party used a compromised credential to obtain a number of account credentials and accessed related Apify accounts"; the access path is closed and "no further activity from the attacker since 11 November" was detected; customers whose personal information or stored data was accessed were notified on Nov 12. The Nov 13 update lists remediations — **API tokens are now stored only as hashes**, network restrictions between internal services, stronger internal authentication, a full-stack security review — and one warning that matters to every user: restrict your storages, because "While it's open, anyone who knows a storage ID can read that storage." A post-mortem with root cause is promised within a week, next update within 72 hours.

**Why it matters:** This is the agent-ecosystem's supply chain taking a hit: scraped datasets are exactly what many agents read without checking provenance, and the storage-ID access shape means data may have been read from accounts whose owners never saw a phishing email. The token-hashing fix and the 72-hour update cadence are the two things to watch; the HN thread is already collecting first-hand affected-user reports.

[`🔗 Apify Security Incident (status page)`](https://status.apify.com/incidents/sxd1dj5j6749) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50486258)

---

## 25. Block open-sources Buzz: a 37k-star workspace where humans and agents share rooms — over a Nostr relay you own

- **Velocity:** ▮ rising
- **Source:** block/buzz · GitHub trending · 37,327 total
- **Tags:** `nostr` `agents` `collaboration` `self-hosted`

**Buzz**, from Block (Jack Dorsey's company) under the `block` org, is trending at **37,327 stars**: "A workspace where humans and agents build together, on a relay you own." The substrate is the tell — under the hood it's a **Nostr relay**, and the README makes the consequence explicit: "every message, reaction, workflow step, review approval, and git event is a signed event in one log. Same shape, same identity model, same audit trail, whether the author is a person or a process." Agents get their own keypairs, their own channel memberships and their own audit trail — scoped "by identity, not by permission flags — the same way you'd scope a teammate" — with the same surface area as humans: open repos, send patches, review code, run workflows, edit canvases, orchestrate other agents, join voice huddles. The README's self-awareness is disarming: "Yes, it's another AI-adjacent developer tool. We're sorry." Apache 2.0; the desktop app shipped three releases on Nov 13 (v1.0.1 → v1.0.2 → v1.0.3-preview.1, per `block/buzz-app`'s release page — the relay repo's own newest release is desktop-v0.5.30, Nov 14 00:31Z; an earlier version of this item named releases that no release endpoint carries).

**Why it matters:** Three agent-workspace designs covered this month (CompanyOS's verifier-only goal closure, AgentRun's control plane, Paradev's per-agent workspaces) all converge on signed audit trails — but Buzz is the first to make the audit log the *native storage model* by inheriting Nostr's signed-event shape. If the relay is the database, "who did what" is portable with your keys, not trapped in a SaaS admin UI.

> "It's a Nostr relay: every message, reaction, workflow step, review approval, and git event is a signed event in one log."

[`🔗 block/buzz`](https://github.com/block/buzz) · [`🔗 Buzz VISION.md`](https://github.com/block/buzz/blob/main/VISION.md)

---

## 26. Plannotator crosses 10k stars: the review surface that annotates agent plans, diffs and artifacts — and sends the markup back

- **Velocity:** ▮ rising
- **Source:** backnotprop/plannotator · GitHub trending · 10,522 total
- **Tags:** `agents` `code-review` `review-ui` `claude-code`

Plannotator — "the workspace to stay in the loop and on top of agents" — is trending at **10,522 stars** with a shipping cadence to match: **five releases in six days**, latest v0.28.64 yesterday. It's a local, browser-based review surface that plugs into coding agents through plugins, hooks and commands: when the agent proposes a decision, plan, HTML artifact or finished diff, the app opens and you annotate, comment, and send the markup back for the agent to act on. The harness list is the widest this feed has seen in one tool — Claude Code, Codex, Copilot CLI, Gemini CLI, OpenCode, Kiro, Droid, Amp, DeepSeek Harness and Pi, plus personal assistants — and the new **Plannotator Inbox** positions itself as "the missing review layer between you and multi-agent work", surfacing decisions, prototypes, variations and plans in one queue. There's even a Herdr Annotate integration tying it into the terminal runtime this feed covered on Nov 12.

**Why it matters:** The bottleneck being attacked is the same one the Haskell Foundation named this morning — review as the significant constraint in modern AI workflows — and the No-AI-Slop manifesto formalized this afternoon: producing output is cheap, reviewing it isn't. A review surface that is harness-agnostic — one annotation UI over eleven agent CLIs — is the shape that scales, because it survives whichever harness you switch to next.

[`🔗 backnotprop/plannotator`](https://github.com/backnotprop/plannotator) · [`🔗 Plannotator Inbox`](https://plannotator.ai/inbox/)

---

## 27. Uptime Kuma ships two emergency releases: admin-only RCE "via an upstream package's regression", details embargoed 7 days

- **Velocity:** ▮ rising
- **Source:** louislam/uptime-kuma · GitHub trending · 93,919 total
- **Tags:** `uptime-kuma` `self-hosted` `rce` `security-release`

Uptime Kuma — the 93,919-star self-hosted status monitor practically every homelab runs — is trending on the strength of **two security releases in one day** (2.5.10 at 03:53Z and 2.5.11 at 09:20Z on Nov 12). The release notes state the vulnerability as **GHSA-437w-j82f-9vjh**: "fix: [Admin Only] RCE via an upstream package's regression (Details will be revealed after 7 days)", credited to reporter Tomer-PL alongside dependency updates. The advisory page isn't publicly readable yet — consistent with the stated 7-day embargo — so the patch diff is currently the only public description of the bug. Two releases hours apart suggests the first fix needed a follow-up; neither release note says more.

**Why it matters:** The disclosure shape is worth noting even before details land: a monitoring tool — the thing you look at when everything else breaks — carrying an admin-only RCE from an upstream dependency regression is a supply-chain story wearing a homelab badge. If you run Uptime Kuma exposed to anything beyond localhost, 2.5.11 is the minimum; the 7-day embargo means the interesting writeup arrives around Nov 19.

[`🔗 Release 2.5.11`](https://github.com/louislam/uptime-kuma/releases/tag/2.5.11) · [`🔗 Release 2.5.10`](https://github.com/louislam/uptime-kuma/releases/tag/2.5.10)

---

## 28. "Flock off": students at ten+ US universities force their campuses to drop Flock surveillance camera contracts

- **Velocity:** ▮ steady
- **Source:** theguardian.com · 107+ pts on HN · 13.9h ago (Nov 13, ~22:11 UTC+8)
- **Tags:** `surveillance` `privacy` `flock` `universities`

The Guardian's Sanya Mansoor charts a reversal wave in campus surveillance: **since April, at least ten university campuses across seven states have scrapped contracts with Flock Safety** — Cornell, Penn State, Elgin Community College, Emory, Binghamton, Kent State and three University of Wisconsin branches (Madison, Milwaukee, Oshkosh) — and last week the University at Buffalo announced an indefinite pause. The organizing is student-led: at Stanford, 21-year-old CS senior Angela Nguyen collected hundreds of signatures from students, faculty, alumni and residents demanding the school drop its Flock contract and codify safeguards for similar tools; Stanford cut ties this summer. The students' core argument is about what automated license plate reader networks structurally enable: a record of where any vehicle was, queryable in ways that can "be exploited to victimize vulnerable people" — abortion seekers, immigrants, protesters.

**Why it matters:** Flock's campus contraction is the first sustained, successful rollback of ALPR deployments at this scale, and the mechanism is contract pressure rather than litigation — a template other institutions can copy. For developers the relevant fact is what the opposition is actually keyed to: not cameras per se, but networked queryability of location history.

[`🔗 The Guardian: US university students tell surveillance cameras to Flock off`](https://www.theguardian.com/technology/ng-interactive/2026/nov/13/universities-drop-flock-camera-contracts) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50483759)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-14T04:25:24Z |
| Items | 28 |
| Sources tracked | 26 (Hacker News, GitHub Trending, CISA KEV, NVD, FAA advisories, vendor blogs, major tech press) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[Previous day](2026-11-13.md) · [Raw .md](latest.md) · [Archive](../archive/index.md)
