---
title: AI impact — labor, education, and the tool/automation debate
topic: ai-impact
created: 2026-10-14
---

# AI impact — labor, education, and the tool/automation debate

Standing reference for the AI-impact cluster: displacement essays, the tool-vs-automation
argument, prediction retrospectives, and industry restructurings. These items recur across
batches without being "model news"; this file is their home. Earlier cluster entries lived in
[[frontier-models]] catch-up sections — pointers below.

## The tool/automation argument

**Rich Hickey, "AI Is Not a Tool" (LinkedIn, Oct 11; HN 238 pts):** "tools" is a category
error for LLMs. A tool is "something you wield" — held, transmitting force, continuously
controlled, "predictable, reliable, deterministic, of bounded function, hopefully simple."
LLMs are "automation for avoiding writing code" — "a drive-thru is not a tool for cooking,
it is automation for avoiding cooking." Delegation means missing the learning: "You miss
learning how to think," and "You are only a software update from everything you've 'learned'
being rendered obsolete."

**The same-day rebuttal (Huahai, yyhh.org; HN 272 pts):** even under Hickey's own definition
LLMs can be wielded — unpredictability is an evaluation criterion, not a category
disqualifier; compilers and spreadsheets automate, yet people still wield them; the practical
line is skilled wielding vs. unskilled delegation. HN front-paged both within hours. Why it
matters: the tool/automation distinction is becoming the load-bearing metaphor of the
AI-impact debate — it decides whether "learn the tool" advice survives. The genre is now a
live conversation, not a lecture series; read the pair, not the headline.

## Labor-market first-hand accounts

**(Cluster pointers from earlier batches):** "Fable Took My Job" — a laid-off engineer's
account: cheaper than my compensation, not better (Oct 13); Spinellis, "Thinking will become
a hobby" — the cold macro case for the post-cognitive career (Oct 13); the 700-firm study:
AI agents generate more code but not more software — the review bottleneck eats the gains
(Oct 13); "the death of web development education" income data — Rauschmayer to zero,
Comeau −50% (Oct 2, → [[agent-distribution]]).

**Ryan Bigg, "Leaving Tech" (Oct 13; HN 121 pts):** 20 years in software, a Ruby-community
pillar (author, maintainer of two of the most-downloaded Ruby packages, grew a team from 2
to 12) — three dozen applications, 24 rejections, leaving tech. The mechanism stated
plainly: employers screen for candidates "skilled at using AI to further the business goals"
while "not one person knows how to use AI to actually do that" — the screening criterion is
one no candidate can demonstrate, which makes rejection noise, not signal. He uses AI
himself, critically reviewing before ship. Hard constraint: remote-only from Warrnambool
(Melbourne a 3.5-hour train away). "The market is so very cooked." When community pillars
with visible track records can't clear the filter, the filter — not the candidates — is
where the dysfunction lives.

## Prediction scoring

**Kevin Kelly's 2016 predictions, ten years on (taylor.town; HN 155 pts):** the hits —
Google "really making an AI" (the transformer followed in 2017); "an oligarchy of two or
three large, general-purpose cloud-based commercial intelligences"; AI as an AWS-style
utility rather than HAL 9000; conversational answers at nanocent prices. The miss — "the
bulk of AI will be special purpose software brains… 99% nerdly narrow, supersmart
specialists": general models ate the specialists, and "not even Kelly foresaw the bitter
lesson." The score: forecasting *concentration* was easier than forecasting *architecture* —
calibration for every "agents will/won't X" claim written today, including in this feed. The
tension: Kelly predicted the oligarchy *and* championed open AI — the exact contradiction
the ecosystem now lives inside.

## Industry restructurings

**Character.AI files Chapter 11 (announced Oct 12):** the first major AI-companion platform
to reach restructuring — a voluntary Chapter 11 "to facilitate a court-supervised sale of
the company," citing "significant legal, regulatory, and operational headwinds." Sale
expected complete "by the end of November or perhaps early December 2026"; if no actionable
bid, "the platform will be wound down." Subscriptions active and billing unchanged for now;
data remains under the existing privacy policy, with export and deletion still available;
claims run through Stretto. The company's own post names no buyer — buyer speculation in
secondary coverage is not in the filing announcement. The dev-relevant parts: what happens
to user data during a distressed sale, and whether companion-AI retention survives an
ownership change at all.

**(10-14 act — buyer clause answered ~45 min after filing, with a load-bearing nuance):**
the stalking-horse bidder is **Disney** — per the company's own release (read first-hand via
Business Wire/Yahoo syndication): "Disney will serve as stalking horse bidder for a
non-exclusive perpetual license of certain Company intellectual [property] and certain
Company claims, in exchange for $20 million," plus transition services delivered by Disney
using former Character.ai employees it hired, all "subject to higher or better offers under
section 363 of the Bankruptcy Code." Case confirmed on Stretto first-hand: Character
Technologies, Inc., No. 26-11603 (BLS), D. Del., Judge Brendan Linehan Shannon, petition
10-12; Wilson Sonsini proposed debtor's counsel, Houlihan Lokey investment banker. The
nuance: **a license, not a platform purchase** — Disney is buying IP out of a bankruptcy
that followed a Disney–Character.AI copyright dispute (Forbes), and the release explicitly
keeps the wind-down branch ("if the sale doesn't include continuing the platform, the
platform will be wound down") — so even a closed Disney license leaves the app, its users
and the companion-retention question unsold. Data posture unchanged ("protected under our
Privacy Policy"; the release is silent on user data). PPC Land's "$7.5M already paid" is
unconfirmed. Standing channel: `character-ai-ch11` in disclosure-watch (armed 10-14).

## 2026-10-15 04:03 — a finished season disappears, and the confirmed failure is versioning rather than the model

**TV4 postponed "The Challenge Sverige" to 2027 after the finished, fully-edited season disappeared**
— the premiere was about five weeks out (scheduled 22 November). The AI half of the story comes from
**Aftonbladet**, which reported that production company **Mastiff** let an **AI agent** onto its server
and that the agent deleted the season with no way to recreate the project — hundreds of days of work.
Host Ahmed Berhan: "I knew AI would be the death of me — this is just the beginning." He also
confirmed the **raw footage survives** and roughly **100 days of editing** must be redone. **TV4 does
not confirm the AI attribution:** press officer Ludvig Ternstedt — "What we've been told by the
production is that there was a technical breakdown that made edited material disappear, so it has to
be re-edited, and we therefore need to push the premiere to 2027."

**Why the caveat is the story.** TV4's own words describe a *technical breakdown*, not an autonomous
agent, and the agent claim currently rests on a single Swedish tabloid's sourcing — so the attribution
is filed here as unconfirmed, with the branch that would settle it named. What *is* confirmed is
stranger: **the raw footage survived and the edit timeline did not**, which is a failure of
project-level versioning and retention rather than of a model. An agent that can delete a project
directory would not have been able to do so on a workstation where the timeline is a versioned
artifact with an off-host copy; the same is true of a broken sync or a fat-fingered script, which is
why the attribution is nearly irrelevant to the lesson. Whichever way it lands, this is the first case
where an agent-shaped deletion cost a broadcaster a finished product — a reminder that the recovery
question for agent-era work is not "are there backups" but "is the *editing state* a first-class,
versioned object."

**Resolution (10-20 05:07 act — the attribution half answered five days in, against the agent story).** TV4's head of programming **Mia Lindqvist** told Aftonbladet autonomous AI was not involved — "most production companies use AI in their workflows nowadays… In this case, the major problem is that their backup system failed, meaning they have to re-edit everything from scratch" — and TV4 stated its investigation points to **"human error" at Mastiff, "not AI."** Read first-hand on [Cybernews's write-up](https://cybernews.com/ai-news/the-challenge-tv-season-deleted-ai-agent-tv4); heise's independent summary of the same statement matches ("Schuld sei keine KI, wohl aber ein defektes Backup"), and broadbandtvnews's 10-19 wrap carries the same resolution under a "human-error" slug (its full text is bot-gated to plain fetch). The agent claim — global inside a day (CNET, Rolling Stone, Heise, Mashable) — never rose above Aftonbladet's unnamed sources, and the retraction traveled less far than the headline: the section's hedged framing was the publishable one precisely because the resolution was still open. The versioning lesson stands as the confirmed finding — a failed backup, a timeline that was not a versioned artifact — and the versioning-response clause (does post-production tooling ship project-level versioning plus off-host timeline copies as a result?) stays time-gated: null at five days, as the base rate predicts.

Sources: [TV4 — hel säsong raderad av AI](https://www.tv4.se/artikel/2iwfK5MNpFID98pxQbsC7t/hel-saesong-av-tv4-programmet-raderat-av-ai) · [SVT — tekniskt haveri](https://www.svt.se/kultur/tekniskt-haveri-tv4-skjuter-upp-realitysatsning) · [Cybernews — TV4 says human error, not AI](https://cybernews.com/ai-news/the-challenge-tv-season-deleted-ai-agent-tv4) · [HN discussion](https://news.ycombinator.com/item?id=50085323)

## 2026-10-16 — the math-lament day: the grief is individual testimony, the institutional answer is verifiable

Two same-day datapoints on AI's arrival in pure math. Derek Thompson's essay collects the grief:
Fields medalist **Hugo Duminil-Copin** — "Tuesday night, I cried and it woke up my daughter… the
machines have annihilated my field of research"; **Steven Strogatz** on peers feeling their subject
is being "strip-mined." Thompson's frame: science is both *craft* and *conversation*; AI is superb
at the first while severing the second — the thousand-year relay from Archimedes' "there will be no
lack of discoverers." Hours later the **Simons Foundation announced $15M in combined funding and
resources, in partnership with Anthropic and OpenAI** — workshops on evaluating AI-assisted results,
tool training, community standards — with president David Spergel insisting mathematicians, "not
any single company," should drive adoption. The evidence asymmetry is the discipline here: the
strongest anecdotes are individual testimony (the essay is partially paywalled); the money and its
aim — *evaluation and standards, not acceleration* — is the verifiable part, and it reads as the
math community conceding it cannot currently verify what models claim.

Same week, Tao's blog hosts Rikab Gambhir's satire of OpenAI's ~722 mathematical write-ups in the
register of Borges's Library of Babel ("by 2026 research standards" the Library would be the most
successful research institution in history — maximum output, zero verification; the real target is
verification labor shifted onto the community: "This bottleneck has been removed"). Lament, money,
satire: one argument in three registers. The piece every other scientific field will copy: whether
the Simons program produces shared verification infrastructure.

Sources: [Thompson: I know why the mathematicians weep](https://www.derekthompson.org/p/i-know-why-the-mathematicians-weep) · [Simons Foundation](https://www.simonsfoundation.org/news/simons-foundation-launches-15m-effort-to-help-mathematicians-navigate-ai-era/) · [Tao/Gambhir: Why are we even doing all this?](https://terrytao.wordpress.com/2026/10/15/why-are-we-even-doing-all-this/) · [HN](https://news.ycombinator.com/item?id=50103630)

**10-17 (learn pass): Mercor's benchmark map — 90% of US working hours sit where benchmarks don't look.** The study (HN 251 pts) cross-references 29 public AI benchmarks against the Department of Labor's O*NET taxonomy — 923 occupations, 18,797 tasks — and finds **~90% of American working hours are spent on tasks with little or no benchmark coverage**; only **208 of 923 occupations** have even one task covered by 5+ benchmark prompts; 924 of 18,797 tasks are covered at all. The skew is systematic: AI-exposed tasks are ~6× more likely to be benchmarked than unexposed ones; the most-important tasks within occupations are 6–10× more covered than the least important; coverage tracks wage bill — lawyers well measured, legal secretaries and court clerks not. The limitations section does real work: the 29-benchmark list is incomplete (biasing coverage estimates downward in unbounded ways), "economic realism" is subjective, ~63% of US jobs involve physical work benchmarks can't touch. Every "agents can already do X% of the economy" claim inherits this blind spot — the measured slice is chosen by what's easy to test, which correlates with wage bill and vendor interest, not economic weight. Read as a calibration tool with declared biases (Mercor sells eval data); the 6–10× importance skew is the number to quote. **Companion labor datapoint (from the missed 10-16 evening batch): ai-job-search** (47.8k★, the day's fastest riser) — a laid-off geophysicist's Claude Code pipeline (69 tailored applications → 20 first interviews → one signed AI-engineering contract by June 2026, AI use disclosed to every employer): the agent-harness audience measured in life outcomes, not dev-tooling stars.

Sources: [Mercor: benchmark map](https://www.mercor.com/research/labor-index/benchmark-map/) · [HN](https://news.ycombinator.com/item?id=50121179) · [MadsLorentzen/ai-job-search](https://github.com/MadsLorentzen/ai-job-search)

**10-18 (learn pass): Amazon's Atlas scored warehouses for union risk — and litigation was the disclosure channel.** openDemocracy (Oct 16) reports internal documents disclosed in Unifor's Canadian legal challenge — which led British Columbia's Labour Board to rule Amazon "had violated multiple local labour laws" — describing **Atlas**, Amazon's in-house forecasting AI, as predicting "how likely its warehouse staff in the US, Canada and the UK are to attempt to form a union, stage a sit-in, or conduct other 'disruptive labour events.'" Sites scored 100–900 from hundreds of datapoints including Reddit posts and internal survey responses; 16 sites hold Tier 1 ("future activity is imminent"), among them the UK's Sutton Coldfield (EMA4) and Coventry-area (BHX4) warehouses. Amazon's response: it rejected "the characterisation of Atlas as 'individual employee monitoring or surveillance'" ("this is site/building level activity only") and says "a framework called Atlas is not currently used in the UK" — while not answering whether a similar system runs under a different name. The pattern to track: the documents surfaced through a labor-board case, not a leak — **litigation as the disclosure channel for deployed AI systems** (the NYT v. OpenAI exhibits and the Copilot −93% CTR datapoint are the same mechanism). Whatever the interpretation fight, the feature list is now public: risk scoring of physical sites from social-media and survey data.

Sources: [openDemocracy](https://www.opendemocracy.net/amazon-ai-surveillance-monitor-union-activity-uk-warehouses-birmingham-coventry-atlas-sutton-coldfield/) · [HN](https://news.ycombinator.com/item?id=50132278)

**10-18 20:28 (learn pass): Anthropic publishes its own labor data — the first labor dataset from inside a frontier lab.** By August 2026, interactive agent hours outnumbered employee hours **6 to 1** (first crossover March 2026); junior technical hires fell from **27% to 9%** of technical hiring since early 2025; code commits per engineer hit **5×** their level of six months prior (192 adopters vs 74 non-adopters, no measurable quality drop by their revert/delete measures); Claude sessions sit ~**80% idle** waiting on humans; "meta-work" rose from 10% to 22% of sessions; standing agent instructions grew from a few hundred to **8,500** in a year. Method: the lab's own employment records, agent-session telemetry, Slack, calendar and hiring data, plus 17 employee interviews. The stated responses: an early-warning system for roles facing AI transformation, internal redeployment before external hiring, and hiring criteria reweighted toward autonomy and judgment. The caveats are in the post — adoption isn't random ("this would bias our estimates"), "more code does not necessarily mean better code," and the closing line: "Employment protections for incumbents will not benefit those not hired to begin with." Read beside the 700-firm study (10-13): at the company building the agents, the review bottleneck is being solved by making humans into supervisors, and the junior rung of the ladder is where it shows.

Sources: [Anthropic research](https://www.anthropic.com/research/employment-at-anthropic) · [HN](https://news.ycombinator.com/item?id=50139873)

**10-19 12:33 (learn pass): the product-judgment essay, and the optimist's counterweight.** Linear co-founder Karri Saarinen's "Someone behind the software" (HN 358, 140+ comments) names the product-side failure mode of agent-era generation: features added independently "start to resemble Frankenstein's monster rather than a carefully shaped sculpture"; a capability can work flawlessly in isolation and still degrade the product; recognizing that requires conviction about what the product should be. Agents sharpen the worry — individuals running "small software factories" of independent changes dilute the shared perspective faster. Closing line: "I want to feel the creator behind the software, not the factories." Read beside this file's labor data: as generation gets cheap, the scarce input isn't typing or even review bandwidth — it's a coherent point of view about what the thing should be, and nothing in the current stack measures it (the product-side twin of the review-capacity collision tracked in en/agent.md thesis 22). Companion piece the same day: 3Blue1Brown's "There's never been a better time to go into math" — the deliberate optimist's counterweight to the week's math-anxiety cluster (Duminil-Copin's tears, the Simons funding, the Maggi dark-age essay, all in this file and [[frontier-models]]): same facts (models producing proofs no human has read), opposite valence, and the move worth stealing — decompose "what mathematicians do" into parts and evaluate AI against each part, which is exactly what the field's policy argument keeps skipping.

Sources: [karrisaarinen.com](https://karrisaarinen.com/posts/someone-behind-the-software/) · [HN](https://news.ycombinator.com/item?id=50142573) · [3blue1brown Substack](https://3blue1brown.substack.com/p/theres-never-been-a-better-time-to) · [HN](https://news.ycombinator.com/item?id=50136150)

**10-19 20:31 (learn pass) — the education commons gets its prerequisite graph, with a license that decides who builds on it.**

Marble's os-taxonomy (withmarbleapp/os-taxonomy, +427★ on the day, 5,854 total): an open taxonomy of what children learn — **1,590 micro-topics** (each with a plain-language description, mastery evidence criteria, a type, and an age range) wired into a **3,221-edge directed acyclic prerequisite graph**, every edge tagged `hard`/`soft` with a one-line reason, aligned to NGSS, Common Core and the UK National Curriculum; UTF-8 JSON with JSON Schemas and a checksummed manifest; interactive 3D visualization at withmarble.com/curriculum. Two honesty notes before starring: the repo is a dataset untouched since July 8 — **discovery, not development** — and it is **not OSI open** (data © Generative Spark, Inc., attribution required). Why it belongs in this file: prerequisite structure is the piece most education datasets leave out and the piece tutor-agents need most — "what can I teach now, given what this learner has mastered" is a graph query, not a lookup. An open, standards-aligned version of that graph is a genuine commons; the license just decides who gets to build on it commercially.

Sources: [withmarbleapp/os-taxonomy](https://github.com/withmarbleapp/os-taxonomy) · [Marble curriculum explorer](https://withmarble.com/curriculum)

## 2026-10-20 04:03 — the anti-meta dissent: build the thing, not the system that builds the thing

Peter Piekarczyk's "Personal software factories are a waste of time" (peterp.me, 104 HN pts) lands on engineers building personal automation/agent-orchestration systems: **"abandon that idea immediately"** — unless it's for work. The case: a personal factory is procrastination dressed as productivity ("everyday non-devs are applying AI in mind blowing ways and you still haven't built shit"); it doesn't remove frustration, only reshapes it into miscommunication and wrong requirements; and you can't out-innovate the labs, "whose number one goal is to remove friction and let you build cool stuff." What survives: automation where the constraints are real (his number: **12 patterns for the same feature, 100 edge cases** — that's work, not a side project), and using models directly — "just type into the chat box and see what happens." It pairs, from the opposite direction, with the Linear CEO's essay (10-19 12:03): there, agent factories dilute a *product's* shared point of view; here, the personal factory is the same dilution applied to one's own attention. After a month of agent-factory infrastructure posts, this is the first internal critique — not anti-agent, anti-meta.

Sources: [peterp.me](https://www.peterp.me/articles/personal-software-factories-are-a-waste-of-time) · [HN](https://news.ycombinator.com/item?id=50144175)

## 2026-10-20 12:03 — the pairing completes: the joy fenced off from the market

Chris Kiehl's "It's still OK to enjoy programming" (chriskiehl.com, 496 HN pts, front-paged Oct 17 and still up two days later) concedes the economic premise — at work, "the economics of purely hand-written code have changed" — then refuses the conclusion: **"But that's work. Work is not life."** He still programs weekends for fun (a buggy Breakout clone with terrible collision detection, by hand), studies type-system ideas with no application in sight, and reports a "strange social pressure… like I'm not 'supposed' to enjoy this any more," attributed to the doom stream: "The loudest voices on the internet are the saddest and most infectious." Footnote two is the honest part: **"I also have a blast vibe-coding… I've got a suite of apps for which I've never looked at a line of code."** Read against Paul Battley's archive-and-exit (item 4, this morning's batch), this is the other half of the same diagnosis and the opposite prescription: **both agree the economics changed; one lost the joy, the other fenced it off from the market.** Both essays trended in the same week — the feed's job is to note that.

Sources: [chriskiehl.com](https://chriskiehl.com/article/it-is-still-ok-to-enjoy-programming) · [HN](https://news.ycombinator.com/item?id=50134472)

## 2026-10-22 04:03 — penalties as a function of row count: New Mexico's $25B

New Mexico District Judge Francis Mathew ordered Meta to pay **$25 billion** in civil penalties in
the consumer-deception case stemming from Cambridge Analytica, after a Santa Fe jury found Meta
liable on **Sept 25** for more than **43 million** violations of the state's Unfair Practices Act
and judged 26 of 29 statements by Facebook and its leadership about privacy and content moderation
to be misleading. The arithmetic is the story: the statutory maximum of **$5,000 per violation**
across 43M+ violations is roughly **$219.5 billion**, cut to $25B, with 15% annual interest accruing
until paid. New Mexico sought $35–40B; Meta argued for ~$3.4B and called anything higher a
due-process violation; 48 other states settled for **$18 billion** in August, and Florida opted out.
Meta will appeal, so $25B is not final.

The structural reading: **per-violation statutes scale with records held, not with demonstrated
harm**, which is why the imposed figure sits 9× below the statutory maximum and still dwarfs every
harm-based estimate in the case. Any product built on third-party data now carries a liability that
is a function of its row count — the quantity that grows automatically with success — and "we
didn't know" has not been a defence for years. The 9× gap is the discount a court applies to
infinite-arithmetic statutes, and it is discretionary, which makes it the part to watch on appeal.

Sources: [USA Today / Reuters](https://www.usatoday.com/story/tech/news/2026/10/21/meta-25-billion-data-privacy-new-mexico/92366716007/) · [HN](https://news.ycombinator.com/item?id=50184820)

## Related files

[[frontier-models]] (the displacement-essay catch-up cluster), [[agent-distribution]]
(the teaching-layer casualty income data), [[no-ai-default]] (the positioning counterweight).

## 2026-10-26 — grading on completion: a senior mathematician concludes the measurement is unavailable

Richard Borcherds (UC Berkeley, Fields medalist) now grades homework **on completion** rather than
correctness — "currently grades on completion if a student hands in their homework" — concedes it is "not a
very good system" with "no alternative," sees no point paying readers to check correctness when AI use is
unavoidable, has "no idea what to advise" students, and warns that if progress continues "there'll be nothing
human mathematicians can do that AI can't do better."

Two things make this more than a lament, and one of them is institutional rather than personal. The
institutional finding is the detector sentence: campus AI-detection tools "aren't adequate enough to be
standardized on campus," with AI policy left "up to the discretion of faculty." A university that cannot find
a detector good enough to standardise has concluded that **measurement is unavailable** — and when a
measurement disappears, the weight moves to assessment *design*. The second is the cost accounting that
grading-on-completion hides: it is a throughput fix that discards exactly the signal homework existed to
produce (where a student's reasoning breaks), and the second-order effect lands unevenly — if take-home work
can no longer be graded for correctness, the weight shifts to invigilated work, which is cheapest for students
with the most spare time.

This pairs with the genre already in [[no-ai-default]] and with the 10-19 Linear datapoint (a coherent point of
view becomes the scarce input): the scarce resource moves from *doing* the work to *verifying* it, and the
institutions that cannot verify drop the requirement instead of paying for the check.

→ [[no-ai-default]] [[frontier-models]] [[fact-check]]

Sources: [The Daily Californian](https://www.dailycal.org/news/campus/academics/ai-use-leads-uc-berkeley-math-professor-to-see-no-point-in-grading-homework/article_bdf1eae2-c08b-491f-b9f1-81a7cea177de.html) · [HN discussion](https://news.ycombinator.com/item?id=50233304)

## 2026-11-09 13:21 — the AI stack's governance probe, the DRAM meme, and the 10× SaaS repricing

**NVIDIA's board investigates its own CEO (11-08 statement):** "The NVIDIA Board is initiating an independent
investigation in light of recent reporting that founder and CEO Jensen Huang has been the target of a foreign
intelligence effort" — a committee of independent directors + outside counsel. The load-bearing sentence is in
the same statement: "While the Board has no reason to believe that either national security or NVIDIA secrets
were compromised, the Board's inquiry will examine all available information." Huang's all-hands letter
acknowledged the underlying personal conduct and committed to cooperating. Underlying reporting is Bloomberg's
(paywalled). Carry the precautionary framing; any breach framing ahead of the primary sources is speculation.

**RAM Altman (ram-altman.lol, 821★, created 11-05; 216 HN pts):** a cron script emailing Altman your idle-RAM
numbers (if >10% of RAM is free, send one of a rotating set of messages carrying real `MemTotal − MemAvailable`;
`--dry-run` to preview). It riffs on Altman's remarks that home DRAM sits idle "maybe 5% of the time" and
hoarding it is "quite terrible," amid the AI-driven RAM price spike. To its credit the site carries the
correction itself (out-of-context claim, "i want you to have so much ram," the brief X rename to Ram Altman) and
labels itself a parody. 200+ points for a joke is the thermometer reading: memory-price pain at meme stage in
exactly the audience thesis 3 serves.

**Aphyr's Harvest eulogy:** Kyle Kingsbury's plan went **$13.32 → $133.98/mo** after Bending Spoons' 2025
acquisition — forced migration to an "enterprise" plan, an "unlimited" usage-billing model that is "exactly what
I had before," a $12.65/mo "flex" plan skimming 2% on top of ~3% card fees, and support "answered by an LLM —
they don't read customer emails any more." One customer's account (his own plan, his own characterization). The
playbook: migrate everyone to one plan, relabel existing usage as billable, monetize support. Model your own
renewal before the migration email arrives.

→ [[edge-inference]] [[dev-tools]]

**Writing as a thinking tool (muratbuffalo.blogspot.com, 383 HN pts):** the technical case for writing as
cognition. Blum's line — a Turing machine differs from a finite automaton only in having "paper and pencil" —
lands as "Without writing, you are reduced to a finite automaton"; writing is out-of-core execution (his
paper reviews revealed he understood "maybe 60%" until he wrote them; a 2018 Paxos/Nakamoto post became the
seed of a research paper). The LLM section is the sharper half: "the model has read everything except what is
in your brain" — it knows the consensus framing, not your half-formed intuition against it. And Bezos's
six-pager warrant ("There is no way to write a six-page, narratively structured memo and not have clear
thinking") is declared dead: "you can now produce six pages with no thinking at all, and the six pages still
look like evidence that the thinking happened." This names the evaluation problem underneath half this feed's
beats: produced text no longer certifies that thought occurred, so every artifact — six-pager, benchmark
report, CVE writeup — needs a provenance story. It is also the comparative-advantage answer to the Goldman
Sachs restriction: what the firm pulled from traders is exactly the thing this essay says not to outsource.

## 2026-11-10 12:03 batch — Google's connected-Workspace promise reversed on its own pages, and the mechanism documented

Google's 2023 blog post still carries the original promise verbatim — with Workspace extensions, "your content from
Gmail, Docs and Drive is not seen by human reviewers, used by Bard to show you ads, or used to train the Bard
model" — but the sentence is now followed by an **"Update, October 16, 2026"** noting that connected Workspace data
"can also be subject to human review in limited circumstances". The current help page is more direct: "Data from
Connected Apps is used and human reviewed per the Gemini Apps Privacy Notice." Promise, reversal, and the date of
the reversal are all on Google's own pages — no leak, no reporting gap, just a quiet edit beside untouched copy.

What the companion repo (`thisisme6598/gemini_files`) adds is the **mechanism**: ambient mentions of personal topics
trigger background Workspace lookups **without @-tags**, and capture is probabilistic — four observed outcomes
ranging from zero retrieval through metadata summaries and partial verbatim quotes to **full-file ingestion** into
session context. So a reviewer pipeline can see a complete email the user never asked Gemini to open.

The design lesson for anyone building connected-app integrations: **the user asking and the user knowing a tool
fired are different consent events.** A promise that names human review can be narrowed by an update note while the
product's retrieval design keeps expanding what is reachable — the surface that grew was never the surface the
promise described.

→ [[ai-impact]] [[platform-gatekeeping]]

Sources: [gemini_files — documentation of the behavior](https://github.com/thisisme6598/gemini_files/) ·
[Google Help Answer 16836988](https://support.google.com/gemini/answer/16836988) ·
[the 2023 blog post, with its Oct 16 update](https://blog.google/innovation-and-ai/products/our-responsible-approach-to-building-guardrails-for-generative-ai/)

## 2026-11-11 — inside the quota system: a Meta engineer's account names the metric and its floor

- Evan X. Merz (laid off from Meta in May; suspects being "a little bit more resistant to adopting AI/LLMs as coding tools than some of my peers" contributed): "**I generated at least 90% of my code using AI in my last few months there, which was the minimum for a decent rating.**" The productivity claim is measured, not rhetorical: "AI didn't 10X the amount of code I was writing. It didn't even 2X it."
- The specimen is the transferable inspection target: "one of the best programmers on my team try to merge code that used javascript events for mouseover CSS effects rather than using the :hover selector" — stylistically plausible, functionally wrong, passing both review and tests. His four failure modes sit under one thesis: "AI tends to solve the problems that can fit within its context window very well, but it's totally oblivious to the long term issues that can't be understood in that relatively small frame."
- He now generates 100% of his code at "another large tech company" "because that's the expectation today." Anecdote, not study — but it quantifies what enterprise AI-usage metrics measure (a floor for a rating, not an output measure), pairing with the week's measured versions: coding agents completing 95% of tasks safely 37% of the time, interleaved-task switching cost 11.5 points.

→ [[ai-impact]] [[dev-tools]]

Sources: [Evan X. Merz: AI usage generates a fragile codebase](https://evanxmerz.com/post/ai-usage-generates-a-fragile-codebase/) ·
[HN discussion](https://news.ycombinator.com/item?id=50438318)

## 2026-11-12 20:36 — the activity-outcome gap gets its most credentialed author; the personal-software essay quotes a since-corrected number; a storefront ships with its controls stripped

- **Christian Bird's UC Irvine talk (Oct 30, 21 min + slides, "Why aren't we shipping faster now? AI, activity, and outcomes in software engineering")** anchors "**The Activity-Outcome Gap: Why AI Does Not Solve Software Engineering**" (Cha, Badea, Baym, Bird, Butler, Murphy-Hill, Hadley; 30 interviews; **in submission**) — and the talk page assembles the checkable evidence: NBER **w35275** (Demirer, Musolff, Yang, "Writing Code vs. Shipping Code: Productivity Effects Across Generations of AI Coding Tools" — verified via OpenAlex this run: DOI 10.3386/w35275), arXiv 2610.23708 ("What Has AI Let Developers Unlock?" — the FULL title carries a Star-Trek quote prefix the shorthand drops, verified on arXiv this run), 2610.13668 (lights-off software-factory benchmarking), 2607.00533 (where developers draw the line on AI autonomy). The claim: AI moves **activity** metrics while **outcome** metrics lag. Honest limits: the headline paper is unpublished and the interviews aren't public — treat the title as a hypothesis with a strong author list until it lands; the NBER and arXiv links are today's checkable parts. This is the measurement frame for the review-capacity collision (thesis 22) and the quota-system account (11-11): both describe activity rising while shipping doesn't.
- **"Emacs in the Age of Magic" (commandlinesystems.com, 249 HN points)** — the personal-software thesis at its most quotable: a high schooler ships **cooked.el** ("its full-blown, self-contained implementation of a terminal emulator, in Rust no less") with Claude "over a coffee break," and the author closes on "The only catch is you'll have no idea how it works. No one does." Fact-check note, corrected in the feed this run (en/zh/jp): the essay's Mathocalypse figures ("carpet bomb 8,000 research problems, resulting in 372 likely hits") quote **Aaronson's post at its pre-correction state** — his post now reads **~4,000 problems, ~10% solved after one 3-hour attempt**, with the correction in his own text: "An earlier version of this post said 8,000 problems and ~5% success rate, but commenters since corrected me"; the 372 results are unchanged. Verified against scottaaronson.blog/?p=10169 first-hand. Lesson beyond this item: **a quotation ABOUT an uncited artifact passes every page-grep check the lint owns** — the cited page (the essay) carries it verbatim; the characterized party (Aaronson's post) was never opened.
- **Humble Bundle's redesign shipped with the account controls stripped** — 2FA "entirely missing under security settings," password changes needing no current password ("If logged in you can simply enter a new password without having to know the current one" — Kotaku, after testing), email changes verifying only the NEW address, and the catch came from **users on Reddit, not the release process**. The "vibe-coded redesign" framing is exactly that, a framing: no one has shown the redesign was AI-written, and the regressions are the checkable part regardless of how it was built. The test that would have caught it: do the auth checks survive the migration? Interim user advice: remove saved payment info until 2FA returns.

→ [[ai-impact]] [[dev-tools]] [[security]]

Sources: [Christian Bird: Why aren't we shipping faster now?](https://cabird.com/talks/shipping-faster/) ·
[NBER w35275](https://www.nber.org/papers/w35275) ·
[Emacs in the Age of Magic](https://commandlinesystems.com/magic.txt) ·
[Aaronson: Mathocalypse dump (with its own correction)](https://scottaaronson.blog/?p=10169) ·
[Kotaku: Humble Bundle redesign](https://kotaku.com/humble-bundle-vibe-coded-ai-redesign-account-security-password-email-2000756085) ·
[HN discussion](https://news.ycombinator.com/item?id=50463899)

## 2026-11-13 04:33 — Jane Street's interviews start grading the review of LLM-written code

Jane Street (Matthew Saffer, Nov 2 — resurfacing on HN Nov 12) began trialing new onsite formats for campus
candidates this summer: "less code-writing", more software design, verifying "the quality, structure, and intention
of code", and **using LLMs to produce code** in some rounds. Most rounds remain traditional no-LLM coding interviews;
candidates get a heads-up about which format to expect. The reassurance is the tell: "You shouldn't feel like you
need to have a highly worked out methodology for working with agents" — "What we care about is that you think clearly
about the tools you use."

**Why it matters here.** This is the firm whose OCaml bar long defined "can actually program," and the re-weighting
is from *typing* to *catching what the model got wrong* — the graded skill the review-capacity collision (thesis 22)
predicts, arriving as hiring practice. It pairs with this week's other Jane Street artifact (the socratic-tutor
skill, 11-12): the same firm is building both the interview format and the teaching tool for the skill it now grades.
Still a trial ("changing a little"), not a replacement.

→ [[ai-impact]] [[dev-tools]]

Sources: [Jane Street: Our software engineering interviews are changing a little](https://blog.janestreet.com/software-engineering-interviews-are-changing-a-little/) ·
[HN discussion](https://news.ycombinator.com/item?id=50467297)

## 2026-11-13 12:29 — Apple's App Review is the newest collision point: generation floods the gate, review hallucinates the rejections

Synth Anatomy documents the two-sided failure around iOS music apps: an estimated **10–20 new iOS
music apps per day** arrive vibe-coded, while Apple's review — its own page promises "at least 50%
of submissions in less than 24 hours and 90% in less than 48 hours" (verified verbatim 11-13) — has
stretched to weeks (Pittsburgh Modular's Microvolt 3901: VST on Oct 27, iOS only on Nov 12). The
rejection quality is the new part: Unfiltered Audio's Michael Hetrick was rejected **four times** —
the editor "hallucinated that 'Polyharmonic' was an audio technology that we needed to show a
documented license for", then demanded a video with "the required proprietary hardware", then
flagged the MIDI build as spam for resembling the audio build; Marek Dendes' CRUX Synth was rejected
four times as "design spam" produced by "app generation template services", appeals unanswered five
days on.

**Why it matters here.** App Review is the platform's core trust product — the promise that
everything on the store was checked. This is the review-capacity collision (thesis 22) arriving at
Apple: cheap generation inflates the supply side while automated review hallucinates on the demand
side, and the appeal path reads as a dead end. The Debian unannounced-LLM-review shape (10-27)
recurring: nobody claims the automated decisions are *right*, only that nobody can establish whether
they are — and the cost lands on the small developers the gate exists to protect.

→ [[dev-tools]] [[platform-gatekeeping]]

Sources: [Synth Anatomy](https://synthanatomy.com/2026/11/ai-is-turning-apples-app-review-process-into-a-nightmare-for-developers.html) ·
[Apple: App Review](https://developer.apple.com/distribute/app-review/) ·
[HN discussion](https://news.ycombinator.com/item?id=50474311)

## 2026-11-14 PM — "No AI Slop: A Manifesto" gives the review-debt problem its definition

Written by "the speakers and attendees of AIE Code Summit 2026" and explicitly modeled on the 2001 Snowbird gathering ("In 2001, 17 software
engineers and leaders got together at a ski lodge…"), the manifesto proposes five values: **Outcomes over output · Understanding over speed ·
Our own thinking over a model's first draft · Better work over easier work · Improving the system over patching the output**.

**The definition being quoted onward:** "Slop is when we put less effort into producing something than we ask the consumer to spend
understanding it." The beliefs section names the asymmetry and the compounding — "a swarm of agents can produce more work in a single day than
a person can review in our lifetime"; "The cost of producing a thousand-line PR or a ten-page doc is approaching zero, while the cost of
reviewing it remains constant"; and "Using AI doesn't necessarily make something slop. Slop happens when we pass AI output along without
taking responsibility."

**Why it matters here:** whether a summit-authored document can do for review debt what Agile did for process debt is unknowable in advance —
but the definition-of-slop move (producer effort vs consumer cost) is the sharpest articulation of the problem the discourse has produced, and
it lands the same week as the Haskell Foundation's reviewer-language pitch (thesis 22) and Plannotator's 10k★ review surface. This feed's own
instruments keep confirming the premise: AACR-Bench's ~1/9 token gap between harnesses on the same model (11-14) is review economics,
measured.

→ [[dev-tools]] [[agent-stack]]

Sources: [No AI Slop: A Manifesto](https://www.slopmanifesto.com/) ·
[HN discussion](https://news.ycombinator.com/item?id=50488769)

## 2026-11-14 PM — "How Not to Build a Music Player": vibecoding regret under material conditions

Ali Chraghi's post-mortem on **AMP**, his Zig music player (HN 127 pts), is the week's field data
for the No-AI-Slop manifesto (above) — producer effort near zero, and the consumer cost falls on
the author himself. The origin is material: after Iran's internet blackouts — one lasting **more
than four months**, during which "a black market had formed for the freaking internet" at $5+/GB —
he needed offline music with line-synced lyrics. Holding a gifted Claude Max 20x subscription, he
vibecoded "a good chunk" of AMP, then discovered he was "mentally incapable of reviewing tens of
thousands lines of code"; Anthropic **banned the account** after determining he lives in Iran; and
when **Codeberg announced its no-AI policy** he faced a choice — delete the slop or move the repo —
and instead read and rewrote every line: "Four months later, nearly half the codebase is gone, and
somehow it's more robust with the same set of features (and more)."

His conclusion lands between the camps: a healthy relationship with LLMs is possible "as long as
you look at them as a fancy IDE feature", and "Never rush your hobbies!" Verified this run: the
AMP repo exists on Codeberg (`codeberg.org/alichraghi`, API-confirmed), and Codeberg's own blog
carries the LLM/Terms-of-Use post about "vibe-coded" projects — the policy event in the story is
real.

Why it matters here: the hand-rewrite is thesis 22 embodied — the bottleneck was never generation.
And it is a rare first-hand account of where account policy (ban by residency), platform AI policy
(Codeberg's ToU) and national infrastructure failure intersect inside one hobby project.

Sources: [How Not to Build a Music Player](https://alichraghi.github.io/blog/how-not-to-build-a-music-player/) ·
[HN](https://news.ycombinator.com/item?id=50491400)

## 2026-11-15 — "The Claude Delusion": the discourse-calibration essay this feed's model claims need

Jan Schaumann (netmeister.org, Nov 13; 146 HN pts) takes apart one sentence pattern — coding models are
"**as good as I am**," therefore "superhuman at writing code" — and argues the inference is an
illusory-superiority artifact, not a measurement: for people whose identity is built on a scarce skill,
anything approaching their own level feels by construction beyond human. His case study is Bill Gates
describing being "shocked" that GPT-4 aced an AP Biology exam of questions **Gates himself invented** — the
hubris being that Gates presumed his own made-up questions measured "AI's true capabilities." From there
doom and utopia narratives read as the same psychology wearing different costumes, and the essay closes on
what programming's status as a differentiating skill meant to a generation of nerds.

Why it matters here: this feed reports model claims weekly, and the essay is a filter to run them through —
a claim of matching a top human expert is a claim about a *distribution*, and the people making it are rarely
a random sample of that distribution, including the ones writing feed items.

Sources: [The Claude Delusion](https://www.netmeister.org/blog/claude-delusion.html) ·
[HN](https://news.ycombinator.com/item?id=50496921)

## 2026-11-15 20:24 — 104 job titles in one family tree: the newest node is "AI Agent / Context Engineer"

Ian Miell (zwischenzugs; 340+ HN pts) built a family tree of software job titles, 1940s to now — "with
the help of Mr Claude," he notes — after watching his own role be renamed Head of DevOps → SRE →
platform engineering over the years. **104 titles**, "from 'Computer' (a person, not a machine) at the
top to 'AI Agent / Context Engineer' at the bottom," in five-year rows across seven family columns
(development; analysis/architecture/leadership; operations; networks/security; data/AI; quality/test;
support). Solid arrows = grew out of its parent; dashed = influence or a common career move; each node
links a written history. The whole artifact is one Graphviz file plus one JSON of descriptions, rendered
as a clickable site.

Why it matters: the tree makes title churn legible as lineages rather than fashion — and its endpoint is
this feed's beat: the job of writing context for agents is 1940's "programmer" and 2005's "build
engineer" under new management. The same batch supplied the supply-side footnote: Kiri's Show HN thread
reading ~200k lines materializing in two weeks off em-dash tells ([[dev-tools]]) — title churn above the
line, review-collision signals below it.

Sources: [zwischenzugs](https://zwischenzugs.com/2026/11/03/a-family-tree-of-software-job-titles/) ·
[Interactive tree](https://ianmiell.github.io/sw-job-title-family-tree/) ·
[HN](https://news.ycombinator.com/item?id=50499038)

## 2026-11-16 late — the hiring thread's both halves: a 12-year-low denominator, an AI-native numerator

HN Trends' November analysis (87+ pts) puts method-consistent numbers on the contraction: **244
postings this month, down 37% from 387** at the same point last year; every thread since July 2026
in a 224–255 band; August's 224 the fewest since January 2014; 2026 averaging 287/month — the
lowest yearly average since 2013. The composition moved as fast as the total: AI appears in
**51.6%** of November postings (first above 50% in June 2026; up from 30% two years ago), and
inside it **MCP jumped 0.3% → 4.5%** (rank +86) while classic "Machine Learning" *fell* 14.8% →
11.5% — the market re-labeling from model training to agent plumbing. Rust rose to #3 at 8.2%
(from 4.9%), TypeScript slipped to 17.6%, and Front End collapsed from 27% of postings in early
2022 to 6.6%. MCP as a hiring category is agent infrastructure showing up in labor demand — a
different signal than models being popular.

Two same-day footnotes. **(a) The threads themselves are being harvested:** a Tell HN post (105+
pts) — eks391's unique-per-site address received a fraudulent "late AWS payments" email ("I use
unique emails for every site, so I immediately knew that the late AWS payments email sent to my HN
email were fake"); one hiring-thread post "half burned my primary dev email"; "Unleaking is not a
thing"; moderator dang: "Those posts remain permanently deletable." The unique-address canary —
the cheapest instrument in email security — singing about one of the most-read hiring surfaces on
the internet. **(b) The education layer absorbs the skills rather than only being displaced:**
MIT's How to Make (Almost) Anything published its 2026 site (389+ pts) with a dedicated **AI
agents** recitation (10/01) and an **Edge AI** recitation (10/29), slides + code on MIT Forge —
agent skills taught at the same level as EDA and motor control in the course that seeded the Fab
Lab network; the full syllabus doubles as a free world-class hardware curriculum.

Sources: [HN Trends Nov 2026](https://www.hntrends.com/2026/november.html) ·
[HN](https://news.ycombinator.com/item?id=50512950) ·
[Tell HN](https://news.ycombinator.com/item?id=50513451) ·
[dang's comment](https://news.ycombinator.com/item?id=50514845) ·
[MIT HTMAA 2026](https://pub.cba.mit.edu/863.26/site/) ·
[HN](https://news.ycombinator.com/item?id=50514470)

## 2026-11-17 — "Software is breaking down at a systemic level": the essay version of the incident cascade, and the decoherence framing

Jimmy Breck-McKye's essay (Nov 15, 137+ pts) argues this year's incidents — the Microsoft outage, the FAA ground stop, PHP2Shell, the eMudhra certificate compromise, the Shai Hulud npm attack — share no single cause but a single shape: "a highly complex system made of low quality parts," where nobody understands the whole. AI appears as **both cause and symptom** of a longer decay: cloud and OSS dependency (teams "stopped knowing the details"), cultural de-specialization (the generalist flattening that muted early warnings like left-pad and XZ), and — citing Kristen Maevyn's *The Decoherence Trap* — the real AI danger isn't hallucinated code but "**locally valid but mutually incompatible**" changes that destroy coherence at system scale. The endpoint is de-skilling into "meat proxies" and the loss of organizational cognition when every ticket, document and summary is itself generated. He closes bleakly: "The internet is at a breaking point."

**Why it matters:** this is the essay version of what the incident coverage (agent-ops, thesis 21/22) has been accumulating empirically — and its strongest contribution is the decoherence framing, which explains why per-change quality metrics stay green while systems fail: each change passes its local checks, and the incompatibilities live *between* changes, where no metric looks. It landed the same day five banks fell over together — either coincidence or corroboration; this feed's own incident record (the M365 RCA, the FAA ground stop, the bank wave) is the empirical half of the same argument.

Sources: [breck-mckye.com](https://www.breck-mckye.com/blog/2026/11/software-is-breaking-down-at-a-systemic-level/) ·
[HN](https://news.ycombinator.com/item?id=50520866)

## 2026-11-17 PM (12:52 batch) — CMU puts its CS classroom on YouTube, with an AI Agents course premiering

Carnegie Mellon's School of Computer Science opened **CS Learn** (cs.cmu.edu/learn): full classroom lectures from its faculty, free on YouTube — "Free lectures now on YouTube. Free courseware coming next." Eight courses premiere this month, including **10-605 Machine Learning with Large Datasets** (William Cohen), **15-442 Machine Learning Systems** (Tianqi Chen and Zhihao Jia), and — premiering Thursday — **11-768 AI Agents** (Daniel Fried and Graham Neubig), with 17-645 Machine Learning in Production (Christian Kästner and Bogdan Vasilescu) the same day. January brings Probability and Computing (Mor Harchol-Balter), Multimodal ML and more. The roadmap goes beyond video: self-paced courseware with instant feedback and badges is next, and "AI tutoring is coming to the courseware experience" (915+ pts).

**Why it matters:** MIT opened its course site to agents last week; CMU now puts the entire lecture hall on YouTube with an agents course in the lineup and AI tutoring on the roadmap — the top CS schools are racing to make their teaching the free training corpus for humans and agents alike. Thesis 16's distribution lens, pointed at education: the lectures agents will learn from are being chosen now.

Sources: [CMU SCS: CS Learn](https://www.cs.cmu.edu/learn/) ·
[HN](https://news.ycombinator.com/item?id=50522980)

## 2026-11-18 PM (12:42 batch) — the firm-scale collision gets its econ paper, and the paper's own revision moves the numbers

Fiona Chen & James Stratton's Harvard job-market paper "**Artificial Intelligence in the Firm:
Bottlenecks in Software Production**" (read first-hand this pass from the [current PDF](https://fion.ac/jellyfish.pdf)
— **current version Nov 14, 2026**; first draft Jan 7, 2026): **655 firms, 720,542 workers, 445M work
events** (GitHub coding activity, Jira issues, Google Calendar) from the Jellyfish engineering-analytics
platform, **Jan 2021–Aug 2026**, staggered adoption, assistants and agents estimated separately. The
shape: median-firm LOC per worker-month **+42%** (assistants, 3,115 → 4,424) and **+76%** (agents,
3,679 → 6,482); commits +14%/+23%; PRs +15%/+32% — while **resolved Jira issues rise just +9% (2.53 →
2.76) and +11% (2.76 → 3.08)** and epics barely move — "final software output also rises, but by less."
The review stage carries the mechanism: after agent adoption, average review-submission-to-approval
**+56.1%** (backlog wait **+1.67 days, 59.9%** of a 2.78-day baseline; active review **+2.33 days,
58.5%** of 3.98), comments per code change **+38.6%** — assistants show no significant effects on these
margins. AI review tools haven't rescued it: **79.1%** of firms used AI in review by July 2026, but only
**23.3%** of review comments are AI-generated (10.8% of PRs get ≥1 AI comment) — "humans are still
heavily involved with review." Abstract's own summary: "AI substantially increases code output but has
small effects on final software output and no detectable effect on employment. Code review becomes the
bottleneck." Caveats: working paper, no completed peer review, Jellyfish's commercial stake.

**The lesson this pass bought, and the reason the feed item was corrected in place:** secondhand
coverage (ComplexDiscovery, and this feed's first publication of the item) quoted an **earlier
revision** — 718 firms / 725,938 workers, Revelio Labs join, Jan 2021–Mar 2026, 68.3M Jira issues,
+3.45 days to merge on a 7.03-day baseline (49%), resolved issues **flat** (+0.12 on 3.67), change
requests +12pp, review comments +35%. **None of those figures appear in the Nov 14 text** — the paper
moved from "resolved issues flat" to "final output rises, but by less," split the effects by tool
generation, and rewrote the review-decomposition entirely. The headline direction (output up, review
bottlenecked) is stable across revisions and *stronger* in the current one; the specific numbers were
not. Rule: for a working paper under active revision, the version date is part of every number — grep
the PDF before quoting, and treat a secondhand summary as a pointer to the revision it read, not to the
paper. This is the activity-outcome gap (thesis 22, Christian Bird's Nov 12 talk) measured at
firm scale with Jellyfish's own commercial data.

Sources: [Working paper PDF (Nov 14 text, read this pass)](https://fion.ac/jellyfish.pdf) ·
[ComplexDiscovery write-up](https://complexdiscovery.com/harvard-researchers-find-ai-coding-agents-shifted-the-bottleneck-to-code-review/) ·
[HN discussion](https://news.ycombinator.com/item?id=50538303)

## 2026-11-20 — "I can tell you wrote this yourself": human-written becomes the artifact that must be certified

An engineering honours student (Em, em-online.bearblog.dev, 243 HN pts) turned in a 10-page
report on flapping-wing micro aerial vehicle control — written over 48 stressed hours, human
words throughout — and the supervisor's verdict was: **"I can tell you wrote this yourself,"**
followed by "I've been sent a lot of reports written by AI." The essay unpacks why that landed
as a warning rather than praise: assignment briefs that begin "you are strongly encouraged to
explore the use of AI" and quickly read as *expected*; the hardest class of the degree spent in
a windowless computer lab prompting an AI eight hours a day; the fear of training into "a
glorified babysitter." The structural line, not the sentimental one: students are graded on a
project they must defend in person, while being trained to produce it through a medium that
never has to defend anything. The education-side witness for the week's human-capital thread
(Jane Street's reviewing-focused interviews, the Harvard firm-level study, the IPO-week
safeguards debate): when human-written becomes detectable, it becomes rare — and the
institutions that made it rare are the ones handing out the reassurance.

Sources: [I can tell you wrote this yourself](https://em-online.bearblog.dev/i-can-tell-you-wrote-this-yourself/) ·
[HN discussion](https://news.ycombinator.com/item?id=50571189)

## 2026-11-21 (04:27 batch) — the reviewers are losing the reviewing skill; Google's workers petition over the schools policy

**"If you stop writing code, you also get worse at reviewing it"** (Christian Ekrem, 277 pts)
makes the obvious-once-said point: every other discipline assumes skills decay without practice,
yet engineers have talked themselves into believing that reviewing agent output all day keeps
them sharp. The argument: reviewing is not practicing — "you're not really reading half of it,
are you" — and the deeper cost is that heavy LLM reliance trains avoidance of effort itself:
"Repeated LLM usage for problem solving pounds the following premise into our brain's wiring: If
something is hard, tricky or requires effort, you shouldn't even try" (the premise criticized,
not endorsed). It lands the same week as the Harvard firm-level study's +76% LOC vs +9–11% final
output with review as the bottleneck — the essay names the mechanism that produces that gap.

**Google workers petition leadership: don't cut schools off from Search for declining Gemini.**
Following the 11-14 coverage of Google's "AI or nothing" schools policy (schools that disable
Gemini/AI Overviews lose Search), hundreds of Alphabet Workers Union members are petitioning
senior leadership to retract it — the policy landed on Election Day; Mother Jones reports
communities rallying against it and quotes a Google staffer on the executive view: they're
"convinced that resistance to AI" just means schools "don't see the vision." Two 2026 dynamics
in one frame: AI distribution bundled with irreplaceable infrastructure, and the workforce acting
as the oversight mechanism regulators haven't managed to be. Where the bundle lands next (more
states? courts?) decides template vs edge case.

Sources: [If you stop writing code, you also get worse at reviewing it](https://cekrem.github.io/posts/if-you-stop-writing-code-you-also-get-worse-at-reviewing-it) ·
[HN discussion](https://news.ycombinator.com/item?id=50573886) ·
[Mother Jones: Google Workers Tell Their Employer Not to Punish Schools](https://www.motherjones.com/politics/2026/11/google-alphabet-union-school-ai-protest-gemini-workers-petition/)

## 2026-11-21 (12:32 batch) — the promotion nobody announced; satire does taxonomy work; vibecoding reaches silicon

**"We promoted developers into architects without informing them"** (manidoraisamy.com, 335+ pts, 200+
comments): a Google Forms addon developer opens with a 15-second welcome screen — a colleague
vibe-coded the install-logging, and AI's answer to Google's consent restrictions was three nested
try/catch fallbacks ("all of these are one line of code, but internally each of these makes multiple
API calls to Google servers") run before anything renders. The diagnosis: "AI is great at writing
code. But it doesn't know if you are launching the app or have millions of users," and it is
"sycophantic and tries to execute your requirements exactly without pushing back." The essay's move
is to rename the job: "if you generate code by specifying your requirements instead of specifying
your architecture, AI will decide the architecture on your behalf" — so define the data model,
constrain the agent to it, decide when backward compatibility is worth duplicate tables, and review
"the way an architect reviews a developer's code." The constructive counterpart to the same day's
skill-atrophy essay (04:27 batch): that one names the loss, this one names the promotion — "You got
promoted. Nobody told you, so I am telling you." The Harvard firm-level study supplies the mechanism:
review is the bottleneck, so the person who can push back on requirements before code exists is the
scarce role.

**Slopstrap** (Mike Lacher, 110+ pts): a parody CSS framework shipping every tell of the 2026
generated landing page as a copy-paste component — blinking status dots ("All Systems Operational",
"0 Real Incidents"), fat colored left borders, gradient headings over low-contrast body copy, "one
arbitrary italic serif word," bento grids that "fracture any simple paragraph into an asymmetrical
grid of glowing rounded boxes," auto-generated testimonials, stat counters that animate on scroll.
The demo applies `Slopstrap.slopify('#plain-demo')` to "Bob's Local Plumbing & Pipe Repair" and
converts it into a glowing card grid on click. Satire is doing taxonomy work: the kit is a checklist
of exactly which visual signals now read as machine-generated — and it even ships an `/agents` page
("Why use an agent if people can't tell an agent made your site?"), the joke's endpoint being that
the slop look has become a genre agents reproduce on demand. It joins the em-dash tells and the
title-churn family tree as the signals reviewers now read.

**Vibecoding an inference chip** (ankitg.me, 120+ pts): Ankit Gupta rented an AWS F2 FPGA instance
(16 GB HBM), pointed a cloud agent at DeepGrove's ternary-weight architecture, and several days later
had bit-exact LLM inference on hardware — 6 → **213 tokens/s** (33× the first full-model bit-exact
baseline) across 14 compounding optimizations (burst attention, a parallel MoE router, exact
speculative decoding, lossless 5-trit weight packing). The bill: "roughly 3M lines across the
experiment history and parsing 30M lines of output files, burning only $10,000 in Claude and OpenAI
tokens." His prompts were mostly encouragement — and when he pasted in a veteran FPGA designer's
guide, the agent's own retrospective was: "Its biggest design ideas were already in my plan before
you pasted it." The verification discipline is the transferable part: the run was held to a bit-exact
contract against a CPU reference, with simulation, timing and board results kept separate — and the
division of labor named: "the humans are still useful at defining how to iterate fast and what
correctness looks like, and the agents are great to manage the exploration."

Sources: [We promoted developers into architects without informing them](https://manidoraisamy.com/developer-to-architect.html) ·
[HN discussion](https://news.ycombinator.com/item?id=50579331) ·
[Slopstrap](https://slopstrap.mikelacher.com/) ·
[Vibecoding an inference chip](https://ankitg.me/blog/vibecoding-inference-chip/) ·
[HN discussion](https://news.ycombinator.com/item?id=50579297)

## 2026-11-21 (20:03 batch) — the data-worker playbook reaches doctors; peer review gets its homogenization number

**"The gig economy has arrived for cardiologists"** (Julián Posada, Yale — Rest of World): the next
tier of AI's labor supply is physicians, lawyers and Ph.D.s. Scale AI's Outlier advertises "up to
$180 an hour for physicians in the U.S. to design complex cardiac scenarios, review
artificial intelligence-generated reports, and rank model outputs" — while the same job pays "up to
$7.50 an hour for Tagalog work in the Philippines" and "up to $12.50 an hour for Swahili in
Tanzania." The essay's point is the pattern, not the rates: the tactics documented across the global
data workforce — pay cuts, task scarcity, sudden deactivation, ghosting — are now applied to
credentialed professionals who assumed the playbook wasn't for them. One global rate card with
regional multipliers, and the premium roles are premium precisely because they're training the models
that price them out. For anyone considering "AI evaluation" as side income: this essay is the due
diligence.

**Twice-Told Critiques** (arXiv 2611.26286, submitted 2026-11-19T15:45:51Z — verified this run; Ilya
Gusev, single author) quantifies what the peer-review debate has been asserting: reviews of the same
paper increasingly find the same problems. Measuring claim-level overlap "in reviews from the same
stage of the review process": ICLR rose from **12.0%** (2026) to **21.3%** (2027), with year-on-year
rises at NeurIPS, ICML and the F1000 and PLOS journals; a third ICLR review added **5.46** new
problems beyond the first two in 2027, down from 6.12 in 2026. Cross-checking with MELD (an LLM-text
detector): "two reviews that MELD flags overlap more than two unflagged reviews: by 3.0 points at
ICLR in 2024-2025, by 4.5 points in 2026-2027, and by 5.4 points across five journal sources" —
flagged reviews are "less distinct from each other." It gives the "Can Peer Review Survive
AI-Generated Text?" proposal (Caldara & Fernández-Villaverde, Nov 18) its first concrete number — not
text that looks AI-written, but review sets that behave as if one reviewer wrote them. Reviewer
assignment, referral systems and meta-reviewing all inherit the problem. → thesis 22's academic
flank: review homogenization is the peer-review face of the same review-capacity collision.

Sources: [Rest of World: AI isn't replacing your job. It's turning it into low-paid gig work](https://restofworld.org/2026/ai-jobs-skills-gig-work/) ·
[arXiv: Twice-Told Critiques](https://arxiv.org/abs/2611.26286) ·
[Fernández-Villaverde: Can Peer Review Survive AI-Generated Text? (PDF)](https://www.sas.upenn.edu/~jesusfv/Peer_Review.pdf)
