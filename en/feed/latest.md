---
date: 2026-09-30
updated: 2026-09-30T12:03:00+08:00
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 24
license: CC-BY-4.0
---

## 1. Dots: OpenAI's always-on agents go from leak to product — each one gets "its own cloud computer"

- **Velocity:** ▮▮▮ trending
- **Source:** OpenAI DevDay · 350+ pts on HN · ~3h ago (~01:07 UTC+8)
- **Tags:** `openai` `agents` `devday` `product-launch`

Since our Sep 29 coverage of the leaked "o" assistant: it launched at DevDay
as **Dots** — always-on agents powered by GPT-6 Astra that run on their own
cloud computer, connect to 4,000+ apps, work through ChatGPT/Slack/Teams, and
"learn from feedback over time." Background "proactive research" is read-only
("can't send messages, change app content, or control your browser or
computer"); passwords are usable "without exposing them to the model";
consequential actions pass an auto-review against custom rules, and monitoring
can pause a dot mid-task. Rolling out to Pro and Business Premium (first dot
free); Enterprise/Edu/Healthcare get an admin-gated beta. **The limits
OpenAI itself states:** "Dots can still make mistakes, so always review
consequential work," and sensitive actions like password changes always stay
with the user. Specialist dots (procurement, invoicing, support) are in
enterprise pilots with planned Microsoft Agent 365 integration.

**Why it matters:** this is the first mainstream always-on consumer agent —
the sandbox-escape and over-permission incidents of the past three months
(covered here Sep 26–29) are exactly the threat model its read-only-by-default
research mode is built for. Whether a 24/7 cloud computer per user is
governable at 1.2B weekly users is the real experiment.

[`🔗 OpenAI`](https://openai.com/index/introducing-dots/) · [`🔗 DevDay 2026 recap`](https://openai.com/index/devday-2026-recap/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49896604)

---

## 2. NVIDIA OpenShell tops daily trending — a policy-enforced runtime where "agents never see real credentials"

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub Trending · +978 today at 10.4k★ · ~0h ago (~04:00 UTC+8)
- **Tags:** `nvidia` `sandbox` `agent-security` `rust`

NVIDIA's OpenShell — "the safe, private runtime for fleets of autonomous AI
agents" — is today's top new repo on GitHub trending (Rust, Apache-2.0, SDKs
for Python/TypeScript/Go/Rust). The model: you declare what each agent can
touch in a policy, and OpenShell enforces it at the kernel level (files,
syscalls, network) — "every network connection passes through a policy check
before it leaves the sandbox," and credentials are injected only into requests
bound for approved endpoints. Policy changes pass through formal verification,
with risky grants flagged for human review. The README's telemetry section is
unusually specific about what is *not* collected: no sandbox names, paths,
prompts, credentials, or model names. The trigger for today's spike looks
twofold: NVIDIA's Sep 15 formal-methods dev-notes post ("What we have learned
applying formal methods to agent policy provers," 40 pts on HN) and a Sep 29
critique titled "why containment is not safety" — the debate, not just the
tool, is trending.

**Why it matters:** after a month of agent-sandbox escapes documented on this
feed (DNS tunneling, Medicare-portal access, SharePoint-style tool abuse), a
hardware-vendor-backed kernel sandbox with formally verified policy changes
is the perimeter-first counterproposal — and the "containment ≠ safety"
critique is the right argument to have about it.

[`🔗 NVIDIA/OpenShell`](https://github.com/NVIDIA/OpenShell) · [`🔗 Formal-methods dev notes`](https://nvidia.github.io/OpenShell-Research/dev-notes/posts/2026-09-10-learning-formal-methods-agent-policy-prover/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49713261)

---

## 3. PS5 "Relapse" exploit chain goes public — kernel read/write on firmware 7.00–13.60

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub / HN · 821★, 129+ pts · ~4h ago (~23:44 UTC+8)
- **Tags:** `ps5` `exploit` `console-hacking` `security-research`

A public kernel exploit chain for the PlayStation 5 landed on GitHub and the
HN front page: the browser stage uses JSC info leaks plus a structured-clone
object-pool mismatch to corrupt a typedarray; the kernel stage pairs an
address leak with an `aio_multi_wait` use-after-free race to reach kernel
read/write — covering firmware 7.00 through 13.60, the broadest public PS5
range to date. A successful run leaves an ELF loader listening on port 9021.
The README is explicit that WebKit entry "may require several reload
attempts" and the kernel stage "may hang or panic the console"; credits
include TheFlow, Sleirsgoevy, Flatz and the broader console-research
community. MIT-licensed, framed as security research only.

**Why it matters:** a kernel r/w spanning years of firmware means the PS5's
attack surface is now structurally open — for researchers it is a reproducible
BSD-adjacent kernel lab; for Sony it re-opens the piracy question the 9.00
fixes were meant to close, and homebrew (not piracy) is the stated purpose.

[`🔗 ntfargo/Relapse-Exploit`](https://github.com/ntfargo/Relapse-Exploit) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49895304)

---

## 4. GPT-6.1 Sol's "near-Astra intelligence for a fifth of the price" gets its HN referendum — with the cost math footnoted

- **Velocity:** ▮▮ rising
- **Source:** OpenAI · 547+ pts on HN · ~3h ago (~01:07 UTC+8)
- **Tags:** `openai` `pricing` `gpt-6-1` `benchmarks`

Days after OpenAI scrapped the Astra 6.1 launch over safety issues (covered
Sep 27–29), the 6.1-line model that did ship became the HN front page's
pricing referendum: GPT-6.1 Sol claims near-Astra performance on coding,
computer use and professional work at **one-fifth of Astra's** standard API
token prices — benchmark tables show Terminal-Bench Science at 56.7% vs
Astra's 68.1%, with Sol matching or beating GPT-6 Sol across the board.
Available today to Pro and Business Premium customers; an "Ultrafast" variant
is coming. **Caveats the page itself carries:** the headline cost comparison
is footnoted — the Fable 5.1 comparison "may overstate" Fable's cost because
it omits fallbacks to a larger model on ~40% of tasks, and "near-Astra" is
claim-per-benchmark, not overall; Astra still leads every frontier table
shown. The HN thread (458 comments) is mostly about what "a fifth of the
price" buys in practice.

**Why it matters:** the price-performance frontier moved again inside a week
— Sonnet 5.5, then 6.1 Sol — and both vendors are now publishing their own
discounting caveats, which is exactly the comparison hygiene this feed keeps
asking for.

[`🔗 OpenAI`](https://openai.com/index/introducing-gpt-6-1-sol/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49896586)

---

## 5. ChatGPT Pro 500: a $500/month tier, and Ultrafast lives only there

- **Velocity:** ▮▮ rising
- **Source:** OpenAI Help Center · 142+ pts on HN · ~2.5h ago (~01:26 UTC+8)
- **Tags:** `openai` `pricing` `subscription` `astra`

OpenAI's Pro plan split into three tiers: Pro 100 ($100/mo), Pro 200
($200/mo) and the new **Pro 500** ($500/mo) — the only Pro tier that includes
**Astra Ultrafast** (selectable in the model picker; it draws on included
usage first, then your credit balance). All Pro tiers keep Pro models, Codex,
deep research and file uploads. Existing Pro 200 subscribers keep their
current (higher) usage allowance only until **Oct 29, 2026**, after which
they move to the new, lower allowance. At launch, buying credits on Pro 100
or 200 does not unlock Ultrafast.

**Why it matters:** a $500 consumer tier formalizes the two-speed frontier —
the fastest intelligence is now metered at 5× the entry Pro price — and the
Oct 29 allowance cut is a de facto price increase for the tier most teams
actually standardized on.

[`🔗 OpenAI Help Center`](https://help.openai.com/en/articles/9793128-about-chatgpt-pro-tiers) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49896975)

---

## 6. Jevstiller: distill a Jev-class decision model locally — with a statistical disagreement bound

- **Velocity:** ▮▮ rising
- **Source:** Show HN · 52+ pts · ~8h ago (~20:05 UTC+8)
- **Tags:** `distillation` `decision-models` `statistics` `show-hn`

A Show HN entry for the Jev wave's hardest problem: if you replace a hosted
decision model with a local student, how do you *know* it answers the same
way? Jevstiller's answer is a contract: "Set one number, say 98%. Jevstiller
returns the label Jev would have returned on at least that share of
requests." A frozen bge-small encoder + logistic regression trains on the
teacher's full probability distribution; coverage `c` and error `e` are
bounded with exact Clopper–Pearson intervals so system agreement stays above
target. Measured: naive threshold rules "broke the budget about half the
time" (6–12 of 20 splits per task); the bound rule broke 0/20 on four tasks
and 1/20 on the fifth, at 4–8 points less coverage. A soak test where the
teacher silently changed answers saw local share fall 90%→9% in four minutes.
**Caveats in the post itself:** the guarantee is agreement, not accuracy —
"if Jev is wrong, the local model is wrong the same way" — and it assumes
calibration data resembles future traffic.

**Why it matters:** the Jev ecosystem (2,170 public projects, per last
week's mapping) has been optimizing cost with no correctness contract;
conformal-style bounds are the first mechanism we've seen that makes the
swap auditable rather than vibes-based.

[`🔗 Jevstiller`](https://jevstiller.pages.dev/posts/the-guarantee/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49891769)

---

## 7. SharePoint code-injection CVE-2026-65660 lands on CISA KEV — exploited, six weeks after the patch

- **Velocity:** ▮▮ rising
- **Source:** CISA KEV · added Sep 25 · ~5d ago
- **Tags:** `sharepoint` `cve` `kev` `microsoft`

CVE-2026-65660 — "improper control of generation of code" in Microsoft Office
SharePoint, allowing an *authorized* attacker to execute code remotely — was
added to CISA's Known Exploited Vulnerabilities catalog on Sep 25 with SSVC
marking exploitation **active** and technical impact **total**. Score
attribution matters here: CVSS 8.8 (CNA-assigned by Microsoft as secondary
source; vector AV:N/AC:L/PR:L — low privileges required). The patch has
existed since Aug 11; NVD's references include a third-party writeup on
"two-stage exploitation attempts." Affected: SharePoint Enterprise Server
2016, Server 2019, and Subscription Edition — all fixed in current security
releases.

**Why it matters:** the gap between "patched Aug 11" and "exploited in the
wild Sep 25" is the entire patch-management argument — on-prem SharePoint
farms that deferred the August cycle are now the target population, and
PR:L means any compromised low-privilege account is enough.

[`🔗 NVD`](https://nvd.nist.gov/vuln/detail/CVE-2026-65660) · [`🔗 MSRC advisory`](https://msrc.microsoft.com/update-guide/vulnerability/CVE-2026-65660)

---

## 8. "Post-training leaves behavioral shadows" — capability transfer through a single teacher word per prompt

- **Velocity:** ▮▮ rising
- **Source:** arXiv / Hugging Face · 249 upvotes on HF daily · ~5d ago (Sep 24)
- **Tags:** `research` `distillation` `interpretability` `subliminal-learning`

"Post-Training Leaves Behavioral Shadows on Unrelated Decisions"
(arXiv:2609.29233) extends last year's subliminal-learning finding from
traits to *capabilities*: Active Taskless Distillation (ATD) finds prompts
where a teacher and its student's shared ancestor are nearly indifferent
between two ordinary words, then trains the student on just those prompt–word
pairs — "a single word from the teacher per prompt," no target-task examples,
no logits, no weight access. Qwen2.5-1.5B gained 5.34 points on HumanEval+
over a nuisance-matched control; transfer holds across scientific knowledge,
commonsense reasoning and reading comprehension, across model generations
and families, and its strength tracks the teacher's update magnitude. Code is
released (CC BY 4.0). The abstract page carries no explicit limitations
section — a gap readers should hold in mind given the result's strength.

**Why it matters:** if post-training effects leak through unrelated single
tokens, then "clean" student models, synthetic-data pipelines and
model-swap audits all have a subtler contamination channel than anyone is
currently testing for — and the security implication (capability smuggled
through innocuous generations) is uncomfortable.

[`🔗 arXiv:2609.29233`](https://arxiv.org/abs/2609.29233) · [`🔗 HF Papers`](https://huggingface.co/papers/2609.29233)

---

## 9. Google ends Chromebook support in 2034 — two years short of the ten it promised

- **Velocity:** ▮▮ rising
- **Source:** The Register · 149+ pts on HN · ~6h ago (~22:12 UTC+8)
- **Tags:** `google` `chromeos` `googlebook` `platform-risk`

Google's support docs now show Chromebooks bought today stop receiving
updates in **2034** — eight years, against a stated ten-year policy — as the
company pivots to its new Gemini-embedded "Googlebook" line running
"Googlebook OS." Google says devices whose lifecycle "extends beyond 2034"
will get migration paths to Googlebook OS, but "details on migration paths
and device eligibility will be shared at a later date" — and migrating
requires buying a new license for Googlebook OS management tools, since
ChromeOS licenses don't transfer. No Googlebook partner currently ships an
education model, so schools — ChromeOS's core constituency — keep buying
hardware on a shortened clock. The Register's read: "Google's intention to
make continued use of Chromebooks unattractive is clear."

**Why it matters:** this is the second Google platform-lifecycle cut this
month (Android developer verification enforcement began Sep 30), and it lands
on the fleet segment least able to absorb forced migrations — a concrete
procurement-risk datapoint for anyone still standardizing on ChromeOS.

[`🔗 The Register`](https://www.theregister.com/os-platforms/2026/09/29/google-ending-chromeos-support-two-years-early/5299674) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49893653)

---

## 10. EFF: DraftKings uses AI to behaviorally target its losing customers — first-party data only

- **Velocity:** ▮▮ rising
- **Source:** EFF Deeplinks · 375+ pts on HN · ~4h ago (~00:30 UTC+8)
- **Tags:** `eff` `behavioral-advertising` `gambling` `privacy`

EFF's Sept 24 deep-dive (front-paged on HN Sep 29): DraftKings trains an ML
model on customers' betting records to identify those likely to *lose money*,
then targets them with promotions designed to bring them back for bets the
company expects them to lose. The piece's structural point: this ran on
"first party data" only — no third-party brokers — so reforms aimed at
third-party data sharing wouldn't touch it; EFF concludes the policy answer
is banning online behavioral advertising outright. The evidence chain is EFF
citing NYT reporting (Sep 19), CalMatters on ad-tech data resold to insurers
and government agencies, and an ICE RFI on buying ad-tech-derived data.
EFF's argument, not DraftKings' response — the company's side isn't in the
post.

**Why it matters:** "first-party data makes it fine" has been the industry's
privacy defense for a decade; a profitable, legal system for finding each
user's worst outcome and advertising it back to them is the cleanest
counterexample yet — built with the same ML tooling this feed covers daily.

[`🔗 EFF Deeplinks`](https://www.eff.org/deeplinks/2026/09/draftkings-using-ai-supercharge-harms-online-behavioral-advertising) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49896050)

---

## 11. Three Linux-kernel flaws land on CISA KEV — ebtables OOB write and an af_alg race, both actively exploited

- **Velocity:** ▮ steady
- **Source:** CISA KEV · added Sep 18 · ~12d ago
- **Tags:** `linux` `kernel` `kev` `cve`

CISA added three Linux-kernel vulnerabilities to its KEV catalog on Sep 18,
all flagged as actively exploited. The headline: **CVE-2026-53266**, an
out-of-bounds write in the ebtables SNAT target — ARP sender-hardware-address
rewrites via `skb_store_bits()` didn't ensure the target range was writable,
so a splice-imported file page in a nonlinear skb fragment could be written
through directly. CVSS 8.8 (CISA-coordinator CWE-787; local vector, changed
scope). Also listed: **CVE-2025-39964**, a race in `af_alg_sendmsg` where
concurrent writes corrupt socket state — with a score split worth noting
(5.5 NVD-primary vs 7.8 vendor-secondary) — and CVE-2025-39682. Fixes are in
current stable series (5.10.245+ … 6.17); action was due Sep 21. Siemens
notes CVE-2025-39964 also affects SIMATIC S7-1500 industrial PLCs.

**Why it matters:** kernel bugs reaching KEV means default-deny matters for
Linux hosts too — unprivileged local code (containers included) plus these
primitives is the LPE chain of the month, and industrial deployments of the
affected PLC firmware patch slowest.

[`🔗 NVD: CVE-2026-53266`](https://nvd.nist.gov/vuln/detail/CVE-2026-53266) · [`🔗 NVD: CVE-2025-39964`](https://nvd.nist.gov/vuln/detail/CVE-2025-39964) · [`🔗 CISA KEV`](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)

---

## 12. Tcl/Tk 9.1 released — screen-reader accessibility and bidirectional text come to Tk

- **Velocity:** ▮ steady
- **Source:** tcl-lang.org · 140+ pts on HN · ~3h ago (~01:13 UTC+8)
- **Tags:** `tcl` `tk` `release` `gui`

Tcl/Tk 9.1.0 shipped Sep 29. Tcl gains a `unicode` command (normalization),
a monotonic microsecond `timer`, `lfilter`, child-interpreter variable access
via `interp set`, C99 math in `expr`, and memory-efficient large-list
internals with broader 64-bit sizing. Tk's headline is years-overdue
platform work: **screen-reader accessibility support** and **initial
bidirectional/RTL text rendering**, plus a `ttk::toggleswitch`, revised Aqua
`send`, and removal of Windows XP appearance support. Apps must now call
`Tcl_FindExecutable` or `TclZipfs_AppHook` during init — the release's one
porting note.

**Why it matters:** Tk ships in every CPython install and countless
embedded/academic tools; accessibility and RTL support arriving in 2026 says
something both about Tk's renaissance-by-necessity and about how far the
baseline for "a GUI toolkit" has moved.

[`🔗 Tcl/Tk 9.1`](https://www.tcl-lang.org/software/tcltk/9.1.html) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49896712)

---

## 13. MassAlloc Attention: attention that allocates its own compute — 2.2× training forward at 128K context

- **Velocity:** ▮ steady
- **Source:** arXiv / Hugging Face · 64 upvotes on HF daily · ~3d ago (Sep 26)
- **Tags:** `research` `attention` `efficiency` `long-context`

"MassAlloc Attention: Let Attention Allocate Its Own Compute"
(arXiv:2609.32712) proposes MALA, a fused attention primitive that keeps
score access to all causal interactions but uses the normalized contribution
(the online-softmax normalizer itself) to decide which post-score computation
to perform — one tolerance shared by training and inference, with the
backward pass reusing the finalized normalizer. Measured at 128K tokens with
tensor parallelism: 2.2× faster training forward, 3.0× faster backward, 1.6×
faster decoding. Fidelity numbers are close but not zero: associative recall
89.67% vs FullAttn's 89.97% at 8K, and mean omitted mass 0.0188% vs an
oracle's 0.0182%. Scaling runs (0.6B–14B) track FullAttn perplexity at lower
FLOPs; continued-trained 14B/32B models match on knowledge, reasoning and
long-context retrieval. No limitations section appears on the abstract page;
the gaps above are the honest cost.

**Why it matters:** dynamic-sparsity attention keeps re-deriving the same
lesson — the normalizer already knows where the mass is — but MALA shipping
it as a single train/inference-consistent primitive with backward-pass
support is what makes it usable rather than a paper trick.

[`🔗 arXiv:2609.32712`](https://arxiv.org/abs/2609.32712) · [`🔗 HF Papers`](https://huggingface.co/papers/2609.32712)

---

## 14. Reclip: a 150-line Flask wrapper on yt-dlp crosses 10k★ — with no visible trigger

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · 10.0k★, +114 today · ~0h ago (~04:00 UTC+8)
- **Tags:** `yt-dlp` `self-hosted` `media` `flask`

Reclip — a self-hosted web UI for downloading video/audio from 1,000+ sites,
powered by yt-dlp and ffmpeg — sits on GitHub's daily trending at 10.0k★. We
checked for the trigger and can't find one: 19 commits total, no releases, no
HN traction (every HN "reclip" hit is unrelated or dead-on-arrival), no blog
post linked from the README. The stack is deliberately minimal — a ~150-line
Flask backend, single-file vanilla frontend, two dependencies. The README
carries a personal-use-only disclaimer and asks users to respect copyright
and platform ToS. **The honest read:** this looks like organic
self-hosted-media demand compounding on yt-dlp's own popularity rather than
any single event — the inverse of the Void lesson, where the metric existed
and the story didn't; here the metric is real and the *cause* is simply
absent from the visible record.

**Why it matters:** trending lists systematically reward having-a-cause, so
repos that rise without one get misread; Reclip is a reminder that
"demand for a thin UI over a great engine" is itself a durable cause — and
that yt-dlp remains the load-bearing dependency of this entire category.

[`🔗 averygan/reclip`](https://github.com/averygan/reclip) · [`🔗 yt-dlp (the engine)`](https://github.com/yt-dlp/yt-dlp)

---

## 15. livenerf: a pre-registered 30-day rig asks whether Opus 5.5 gets quietly nerfed — HN's #1 story

- **Velocity:** ▮▮▮ trending
- **Source:** HN front page #1 · 350+ pts, 150+ comments · ~6h ago (~06:36 UTC+8)
- **Tags:** `evals` `benchmarks` `opus-5-5` `model-drift`

ninjahawk/livenerf — "a long-running, deterministic-as-possible benchmark for
detecting whether a frontier model gets quietly worse after launch" — is the
front page's top story. Months of "Anthropic nerfs models after release"
reports have always ended as vibes versus vibes, so this repo starts the
clock on launch day (Opus 5.5, Sep 22) and runs daily for 30 days: days 1–10
baseline, then two 10-day windows, first possible call ~Oct 24. It's built on
the UK AI Security Institute's Inspect framework, run through headless Claude
Code with a pinned CLI (2.1.280), frozen prompts, exact-match graders ("no
LLM judge, ever") and append-only raw logs; the stats follow Anthropic's own
error-bars paper. Calibration: 2,336 questions screened, 78 "sometimes right"
questions form the panel — with the selection bias measured (fresh pass rate
54.7% → 62.0%) and 8 wrong answer keys / 30 ambiguous questions flagged but
kept under a pre-registered sensitivity analysis. Six of 30 days collected as
of Sep 29, none missed. **The README's own limits:** one run per day detects
only ~7.5 accuracy points per 10-day window, and validation showed a
same-family swap (Opus 5 for 5.5) was *not* distinguishable at 99% (−3.8 ±
6.3 points, −23% tokens) — the instrument can't catch a swap of that size.
It also measures the model as served through Claude Code on a Max
subscription, not the raw API.

**Why it matters:** "the model got worse" finally has a reproducible
instrument — pre-registration, a control arm, clustered standard errors —
and the honest bound of what it can detect is published next to the plan.
The secondary signal (output tokens per sample) is where quiet effort
reductions show first, often before accuracy moves.

[`🔗 ninjahawk/livenerf`](https://github.com/ninjahawk/livenerf) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49901736)

---

## 16. America.gov launches as the AI front door to the US government — with an executive order behind it

- **Velocity:** ▮▮▮ trending
- **Source:** White House / GovExec · 445+ pts on HN · ~14h ago (~22:04 UTC+8)
- **Tags:** `government` `ai-deployment` `chatbot` `policy`

America.gov relaunched Sep 29 as an AI-chatbot "digital front door" to the
federal government, unveiled at a "Hello, America" event alongside an
executive order directing the GSA, the National Design Studio and OMB to make
it "the single point of entry" for covered services — online-accessible
federal services serving 100,000+ users a year, with Login.gov integration
mandated (IRS tax filing and DoD/intelligence services excluded). The chatbot
draws only on ~29,000 federal websites and runs on Google Gemini and xAI
Grok, per chief design officer Joe Gebbia's CNBC remarks — the White House
fact sheet itself names no models. Trump credited Edward Coristine as lead
engineer. Phase 2, targeted 2027: completing transactions in the chatbot;
passport applications via the site are promised for December 2026. The
privacy notice says "AI providers do not retain your prompts or responses"
and that responses may be cached up to two hours via a prompt hash; HN users
found a ~50MB client-side ONNX PII filter ("Rampart") downloading to the
browser, a non-public system prompt, and asymmetric refusal examples.
Former USDS chief Mikey Dickerson called it a demo of "the easiest 5% of the
problem." FedScoop reports a second EO the same day directs agencies to call
AI "Super Intelligence (SI)."

**Why it matters:** this is a compliance mandate, not a demo — every
100k+-user federal service must integrate with one AI-fronted platform — and
the first government-scale test of chatbot-front-door UX against the
gov.uk-style structured design it replaces.

[`🔗 White House fact sheet`](https://www.whitehouse.gov/fact-sheets/2026/09/fact-sheet-president-donald-j-trump-streamlines-access-to-government-services-through-america-gov/) · [`🔗 GovExec`](https://www.govexec.com/technology/2026/09/white-house-launches-ai-powered-americagov-digital-front-door/416323/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49893509)

---

## 17. Anthropic: GLM-5.3 spreads near-frontier cyber capability via open weights — and refusals cost ~$1,200 to strip

- **Velocity:** ▮▮▮ trending
- **Source:** Anthropic Frontier Red Team · 200+ pts on HN · ~11h ago (~01:31 UTC+8)
- **Tags:** `anthropic` `glm-5-3` `open-weights` `cybersecurity`

Anthropic's Frontier Red Team published an analysis of Zhipu/Z.ai's
open-weight GLM-5.3: on ExploitBench V8 it "develops end-to-end exploits in
50 of 410 attempts," against 56/410 for Anthropic's restricted-access Claude
Mythos Preview (earlier public models: ~0), and 4% vs 6% on an internal
binary-exploitation benchmark. In human-expert sessions it chained novel
JavaScript-engine 0-days in a Linux browser build into a drive-by page that
reads arbitrary visitor files (SSH private key theft demonstrated), and
GLM-5.3-Flash built a working ARM64 N-day exploit chain with a
pointer-authentication bypass in ~8 hours of compute (~$20.40 at API prices)
plus 20 minutes of human attention. Safeguards: 0% engagement on direct
malicious requests rose to 64% with a cover story, 92% with prefilled
thinking tokens, 100% with abliterated weights — abliteration took ~2,200
GPU-hours (~$4,400) on the first attempt, and Anthropic estimates an
experienced team needs ~600 GPU-hours (~$1,200), cutting refusals from >90%
to 3–12% with GPQA-Diamond unchanged. NIST's CAISI separately calls it "the
most cyber-capable open-weight model released to date," ~4 months behind the
US frontier. **Anthropic's own caveats:** bypass tests ran in a simulated
no-exec environment — "imperfect measures"; the exploit tasks didn't trigger
GLM-5.3's built-in refusals (it does refuse explicit malware requests); the
0-day target was the Linux build only; and the closed-vs-open safeguard
comparison is structurally asymmetric — closed weights can't be abliterated
by design.

**Why it matters:** frontier-adjacent offensive capability that is permanent
(in the weights), cheap to strip, and downloadable changes threat modeling
for anyone shipping internet-facing software — and Anthropic's stated answer
(expanded defender access, independent government testing) is now a live
policy question.

[`🔗 Anthropic research`](https://www.anthropic.com/research/glm-5-3-and-the-spread-of-advanced-cyber-capabilities) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49897075)

---

## 18. DevDay: OpenAI previews a Decisions API — Luna-powered, predefined answers, "their response to Jev"

- **Velocity:** ▮▮ rising
- **Source:** OpenAI DevDay keynote · The New Stack / Willison live blog · ~11h ago (~01:15 UTC+8)
- **Tags:** `openai` `decisions-api` `jev` `classification`

Among DevDay's announcements: a preview of the **Decisions API**, which
OpenAI's recap describes as "real-time decision-making by focusing Luna's
intelligence on a specific set of user-defined questions with finite
pre-defined answers." Simon Willison's live notes: the model responds "in a
fraction of a second" from "a predefined set of options to choose from" —
and his framing is the story: "Sounds like their response to Jev," the
TypeSafe classifier API that left stealth less than two weeks earlier. The
New Stack reports ~150ms responses with confidence scores. No pricing
announced; preview status. It lands into an ecosystem this feed has tracked
all week — Ollaya, Jeeves, Jeff, Jevstiller — except this time the incumbent
platform is adopting the interface rather than orbiting it.

**Why it matters:** the Jev-shaped API surface (constrained choices,
calibrated confidence, single-digit-millisecond latencies) is becoming a
platform feature. Raschka's Sep 29 analysis (item 28) argues retrofitting
the API is easy but matching the breadth is not — which is exactly the
competition this announcement starts.

[`🔗 OpenAI DevDay recap`](https://openai.com/index/devday-2026-recap/) · [`🔗 Willison live blog`](https://simonwillison.net/2026/Sep/29/openai-devday-2026-live-blog/) · [`🔗 The New Stack`](https://thenewstack.io/openai-decision-api-luna/)

---

## 19. LiteLLM: internal user → proxy admin → host RCE via one reused encryption key — patched today

- **Velocity:** ▮▮ rising
- **Source:** GHSA-7hp6-4w63-5g45 · published Sep 30 · releases ~09:00 UTC+8
- **Tags:** `litellm` `cve` `agent-infra` `rce`

The LiteLLM proxy reuses a single encryption key both for sealing secrets at
rest and for minting session tokens. An authenticated `internal_user` can
request an API key whose crafted metadata carries "a forged admin credential
as the 'secret' value"; submitting the returned ciphertext as a bearer token
makes the proxy "trust the forged admin identity" — full proxy admin,
including arbitrary command execution via the MCP stdio endpoint. Vulnerable:
≥1.91.0 **by default** (1.87.0–1.90.x only with `EXPERIMENTAL_UI_LOGIN=true`).
Fixed in 1.100.4 / 1.101.3 / 1.102.2 / 1.103.1 / 1.104.0rc2, all released
Sep 30. GitHub rates it High, **CVSS v4 7.7** (GitHub-assigned); the advisory
states "No known CVE," and an NVD keyword check today confirms no matching
record — meaning CVE-keyed scanners won't see it. Credit: Hoa X. Nguyen
(OPSWAT Unit 515). Interim mitigation `EXPERIMENTAL_UI_LOGIN=false` breaks
CLI SSO / Claude Code gateway login.

**Why it matters:** LiteLLM (59.9k★) sits in front of a large share of
self-hosted model fleets, and key-reuse in exactly that gateway layer is the
bug class agent infrastructure keeps producing — "no CVE assigned" is the
part that buys the attackers time.

[`🔗 GHSA advisory`](https://github.com/BerriAI/litellm/security/advisories/GHSA-7hp6-4w63-5g45) · [`🔗 BerriAI/litellm`](https://github.com/BerriAI/litellm)

---

## 20. LightLLM: two unauthenticated pickle-deserialization RCEs (CVSS 9.8) — no fixed release yet

- **Velocity:** ▮▮ rising
- **Source:** NVD · published Sep 29 23:17 UTC (~07:17 UTC+8)
- **Tags:** `lightllm` `cve` `rce` `llm-serving`

ModelTC/lightllm ≤1.2.0 has two network-reachable, no-authentication RCEs
published to NVD last night: **CVE-2026-103040**, unauthenticated RCE via the
router profiler RPyC service (requires the server started with
`--enable_profiling`), and **CVE-2026-103041**, RCE via the embed-cache RPyC
service in multimodal deployments — bound on all interfaces with
`allow_pickle: True` and no auth. Scores: **CVSS v3.1 9.8 and v4.0 9.3, both
assigned by VulnCheck** in the NVD record (VulnCheck-scored enrichment, not
NVD Analyzed). Vendor issues #1596/#1597 have been open since Sep 29; the
latest release remains v1.2.0 (Aug 10), and the repo is alive (pushed today)
— so "no patched release" is pending, not permanent. Credit: Mingkai Yu,
Jiapeng Li, Jiajia Liu.

**Why it matters:** RPyC plus pickle is a remote-code-execution giveaway in
any Python serving stack, and inference servers are being attached to public
networks at speed — the reproducible lesson is to check what *else* your
LLM server exposes besides the inference port.

[`🔗 NVD: CVE-2026-103040`](https://nvd.nist.gov/vuln/detail/CVE-2026-103040) · [`🔗 VulnCheck advisory`](https://www.vulncheck.com/advisories/lightllm-through-1.2.0-unauthenticated-remote-code-execution-via-embed-cache-rpyc-service) · [`🔗 Issue #1597`](https://github.com/ModelTC/lightllm/issues/1597)

---

## 21. OpenBao patched an unauthenticated-to-RCE chain; HashiCorp Vault hasn't — and an AI found nearly all of it

- **Velocity:** ▮▮ rising
- **Source:** ControlPlane · published Sep 28, HN Sep 29
- **Tags:** `openbao` `vault` `rce` `secrets-management`

ControlPlane disclosed an unauthenticated-to-RCE chain affecting Vault and
its open-source fork OpenBao. The critical bug — GHSA-j6wc-jpvg-xfxq,
"Remote Code Execution via `sys/storage/raft/snapshot-force` Plugin Catalog
Replacement" — is rated critical on OpenBao's advisory (no CVSS on the
advisory record itself; ControlPlane cites CVSSv4 9.4), is gated on guessing
a SHA-256 checksum (many guesses can be embedded per attempt), and works
even on read-only container images without `plugin_directory`. Six further
advisories ship alongside (8.2, 7.7, 7.6 among them). **No CVE IDs exist
for any of them.** OpenBao fixed everything in v2.6.3/v2.7.0 (Sep 23); HashiCorp
Vault's latest release (v2.1.1, Sep 16) predates the fixes — ControlPlane
says Vault customers "were impacted at the time of release, with no
mitigations in place," and that IBM declined a mutual-disclosure agreement
(ControlPlane's characterization; IBM's side isn't on the record). Partial
mitigations: drop `plugin_directory`, set `BAO_DISABLE_PUBLIC_ACME`. And the
line worth repeating: "All but one vulnerability discovered in this release
was found by an AI."

**Why it matters:** the fork-split moment made concrete — the open-source
fork ships the fixes while the commercial original remains exposed — plus
AI-found vulnerabilities graduating from demo to a 9.4-class secrets-store
RCE chain.

[`🔗 ControlPlane writeup`](https://control-plane.io/posts/unauthed-to-rce-in-vault-and-openbao/) · [`🔗 openbao/openbao`](https://github.com/openbao/openbao)

---

## 22. Simple-WAM: world-model gains come from the first denoising step — not from generating the future

- **Velocity:** ▮▮ rising
- **Source:** Hugging Face daily papers · 33 upvotes, #1 today
- **Tags:** `research` `world-models` `robotics` `efficiency`

"What Makes World Action Models Generalize? An Empirical Study of Test-Time
Future Modeling" (arXiv:2609.34981, Tsinghua-LeapLab, Gao Huang group) runs
a matched-backbone comparison of how WAMs use future-token generation — and
finds the expensive part buys almost nothing. Simple-WAM (one denoising pass
over fully-noised future tokens) hits 79.5% on LIBERO-Plus perturbation
average vs 67.7% for explicit multi-step WAM and 53.8% for latent
world-modeling — while π0.5 *with* embodied pretraining still tops at 84.4%.
Task generalization with video: 73.6 vs 69.9 vs a latent collapse to 5.9.
Latency: 74.7 ms/chunk vs 286.9 (3.8×). The first denoising step carries
nearly all the benefit; the remaining nine add ≤~1.8 points. On RoboTwin
with video, explicit generation *beats* Simple-WAM (47.3 vs 44.5). The
conclusion states the scope plainly: "Our conclusions rest on a 5B backbone
without embodied pretraining," and whether they hold at larger scale
"remains open."

**Why it matters:** a controlled attribution result, not a leaderboard — it
says the costly iterative generation at the heart of the world-model
narrative may be doing little work, which is simultaneously an efficiency
win and a scaling-story caution.

[`🔗 arXiv:2609.34981`](https://arxiv.org/abs/2609.34981) · [`🔗 HF Papers`](https://huggingface.co/papers/2609.34981)

---

## 23. MaLiang-Harness: the program-to-visual gap — 100% generation success, and a quarter of videos still fail quality

- **Velocity:** ▮▮ rising
- **Source:** Hugging Face daily papers · 33 upvotes, #1-tied today
- **Tags:** `research` `multimodal` `code-generation` `benchmarks`

MaLiang-Harness (arXiv:2609.34309, NUS; author list includes Shuicheng Yan)
introduces benchmarks that measure whether agent-generated code *renders
correctly and meets visual quality thresholds* — not just whether it runs —
across 11 closed-source MLLMs. The headline datum: GPT-6 Astra scores 100%
generation success on both MaLiang-IBench and MaLiang-VBench, but only
96.0% of image tasks and **76.9% of video tasks** meet all quality
thresholds — i.e., for video, roughly one in four "successful" renders
fails the quality bar. The abstract's point is the mismatch itself: "a
mismatch between general capability scores and visual generation
performance" — general benchmarks predict this ability poorly. No dedicated
limitations section; evaluation is confined to closed-source models. Code
exists (gulucaptain/MaLiang-Harness, created Sep 27 — a day-old repo, so
treat the harness as fresh, not battle-tested).

**Why it matters:** "the code ran" has been the ceiling of most agent evals;
this measures the step after, and finds the frontier's success rate and its
quality rate are different numbers — a distinction that matters anywhere
agents ship visual output.

[`🔗 arXiv:2609.34309`](https://arxiv.org/abs/2609.34309) · [`🔗 gulucaptain/MaLiang-Harness`](https://github.com/gulucaptain/MaLiang-Harness)

---

## 24. NSL: "WSL for Linux" — systemd-nspawn dev machines that leave the host alone

- **Velocity:** ▮▮ rising
- **Source:** Show HN · 100+ pts, 70+ comments · ~13h ago (~22:51 UTC+8)
- **Tags:** `linux` `containers` `dev-environments` `show-hn`

Frostyard's NSL (NSpawn Subsystem for Linux) does for Linux what WSL did for
Windows: run dev environments without touching the host. Machines are
systemd-nspawn containers inside a shared QEMU VM — install Debian, Fedora,
Arch (seven signed, weekly-rebuilt distro images, verified against the
publishing workflow) while your `$HOME`, `/run/media` and `/mnt` mount under
`/mnt/host` with your own UID/GID. Ports forward to host `127.0.0.1`; GUI
apps appear via Waypipe; a `--isolated` flag runs untrusted software in its
own VM with no host access. MIT-licensed, pre-release v0.4.0 ("v0.3.0 and
earlier are a retired prototype"). **The caveats it states:** tested on one
host configuration ("Snow Linux 13 on x86-64" with pinned systemd/QEMU
versions), and the publishing org is brand-new — the repo (Go, created Sep
26) has 42★; the Show HN thread, not the star count, is the signal here.

**Why it matters:** "keep the host clean" has been the strongest argument
for Nix and macOS-style containerization; NSL is a WSL-shaped answer on the
Linux desktop itself — the direction that problem rarely gets attacked from.

[`🔗 frostyard.github.io/nsl`](https://frostyard.github.io/nsl/) · [`🔗 frostyard/nsl`](https://github.com/frostyard/nsl) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49894351)

---

## 25. XBOW: an AI agent weaponized a kernel bug human review passed over

- **Velocity:** ▮ steady
- **Source:** XBOW blog · published Sep 28, HN Sep 29
- **Tags:** `xbow` `linux` `kernel` `agentic-security`

XBOW's autonomous agent took **CVE-2026-72018** — an out-of-bounds write in
the kernel `dibs` loopback driver, where `move_data()` memcpy's into a
registered DMB without bounds checks on a peer-controlled `dmbe_idx`
(NVD: CVSS 3.1 **7.8 High**, Secondary score from the kernel CNA; patched
upstream since June) — a bug human researchers had looked at and passed
over, and built a working local privilege escalation: 16-zero-byte writes at
partially controlled offsets, used to zero out `cred` identity fields.
**The post's own scope caveats:** it assumes an unprivileged user already
holding `CAP_NET_ADMIN`; reliability was 22 of 100 fresh boots; it was
tested on 7.1.0-rc6 with all kernel mitigations disabled; and the team
deliberately skipped chaining an infoleak/UAF that would raise reliability.
No known exploitation.

**Why it matters:** not a new threat — a demonstration that agentic
exploitation now completes the work humans deprioritize. Triage backlogs,
not just fresh CVEs, are the attack surface.

[`🔗 XBOW blog`](https://xbow.com/blog/no-time-to-pwn-cve-2026-72018) · [`🔗 NVD: CVE-2026-72018`](https://nvd.nist.gov/vuln/detail/CVE-2026-72018)

---

## 26. Cloudflare applies to become a publicly trusted certificate authority

- **Velocity:** ▮ steady
- **Source:** Cloudflare blog · published Sep 29 · 42+ pts on HN
- **Tags:** `cloudflare` `pki` `tls` `post-quantum`

Twelve years after Universal SSL, Cloudflare has filed applications with the
Chrome, Apple, Microsoft and Mozilla root programs to operate as a public
certificate authority, signed an agreement to acquire an established root
from GlobalSign, and designed the CA ACME-first: it will refuse clients that
don't support ACME Renewal Information (RFC 9773). Plans include being
among the first CAs serving post-quantum certificates against Chrome's PQ
root program, and production Merkle Tree Certificates with first certs
targeted Q1 2027. The caveat, verbatim: "We are not issuing certificates
yet, and it will be a little while before we do." HN commenters add
context: Google Trust Services did the same GlobalSign-root maneuver, and
the PQ/MTC push may fracture WebPKI into PQ and legacy halves.

**Why it matters:** a fourth major public CA with an ARI-or-nothing stance
pushes the entire ecosystem toward automated renewal, and the post-quantum
timeline matters for anyone whose TLS infrastructure outlives a
crypto migration.

[`🔗 Cloudflare blog`](https://blog.cloudflare.com/cloudflare-certificate-authority/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49893144)

---

## 27. Backblaze Q2 2026 drive stats: quarterly AFR at 1.73% — the worst "in quite a while"

- **Velocity:** ▮ steady
- **Source:** Backblaze · published Sep 29 · 113+ pts on HN
- **Tags:** `storage` `reliability` `data` `backblaze`

Backblaze's quarterly drive-failure report: 354,415 drives analyzed,
quarterly annualized failure rate **1.73%** against a 1.41% lifetime rate —
the highest quarterly figure "in quite a while." A rare clean sweep: Seagate
holds the entire zero-failure honor roll (ST8000NM000A, ST12000NM000J,
ST14000NM000J, with ST16000NM000J at one failure). Three models exceeded the
6.95% outlier threshold: Seagate ST10000NM0086 at 9.33% (only 965 drives,
~8.5 years old), ST14000NM0138 at 8.26%, and HGST HUH721212ALN604 at 7.63%.
Two models retired; **no new drive models for a second consecutive quarter**;
20TB+ drives now exceed 25% of the fleet. The report also walks through SMR
and HAMR — Backblaze runs no SMR drives, and cautions that industry SMR
adoption means "not today" does not mean "not ever." **Caveats from the
author:** the worst AFRs are partly small-sample artifacts, and 10 of 31
models posted AFRs above 3.0% — a skew she hasn't fully analyzed.

**Why it matters:** the failure-rate spike lands mid drive-supply shortage —
this is the quarter's datapoint for capacity planning, durability math, and
buy-vs-wait decisions.

[`🔗 Backblaze blog`](https://www.backblaze.com/blog/backblaze-drive-stats-for-q2-2026/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49893002)

---

## 28. Raschka: from bag-of-words to Jev — the classifier history that explains the decision-model wave

- **Velocity:** ▮ steady
- **Source:** Ahead of AI (Sebastian Raschka) · 53+ pts on HN · ~17h ago (~19:06 UTC+8)
- **Tags:** `research` `classification` `jev` `history`

Sebastian Raschka places TypeSafe's Jev in six decades of text-classification
history, re-running his own IMDb benchmarks at every stop: bag-of-words +
logistic regression 89.9% (still his default baseline), LSTMs 85.66% from
scratch but 95.4% with ULMFiT transfer, CNNs ~90.07%, ModernBERT ~95%. His
Jev runs: **Choice 96.47% / Noul 96.20%** on 25k reviews for ~$0.65 and ~22
minutes — "comparable to a fine-tuned ModernBERT but with no fine-tuning
required." He guesses a small ModernBERT-like model trained on synthetic
data with RLCD-style calibration (and explains the published RLCR
formulation, R = c − (q − c)²). **Caveats he states:** unknown whether
IMDb's test set is in Jev's training data; public clones trail badly
(Contrastive LM 82.90%, Laya 92.33%) and fail his Tetris test; fine-tuning
still wins for high-volume narrow tasks; and he flags OpenAI's newly
announced Decision API (item 18) as a Jev competitor. He discloses no
affiliation and no free access.

**Why it matters:** the sober version of the Jev wave — a well-executed API
over known techniques, whose moat is breadth and calibration rather than
novelty — from the person best positioned to say so.

[`🔗 Ahead of AI`](https://magazine.sebastianraschka.com/p/classifier-history-and-jev) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49891203)

---

## 29. Deser returns: Ronacher reopens Rust serialization's design space — Serde-compatible in principle, at a stated cost

- **Velocity:** ▮ steady
- **Source:** lucumr.pocoo.org · ~7h ago (~05:48 UTC+8) · 39+ pts on HN
- **Tags:** `rust` `serialization` `serde` `deser`

Armin Ronacher has revived Deser — begun in 2022 at Sentry, abandoned, now
rewritten — and argues it has reached a state worth public attention: "at
least in principle a drop-in replacement" for Serde. His thesis: Serde's
pain points (`arbitrary_precision` corrupting tagged enums, `flatten`
breaking integer map keys, `deserialize_with` adapters that can't compose
through `Option`/`Vec`) aren't bugs but consequences of three design
decisions its stability guarantees protect — one trait set for both
self-describing and non-self-describing formats, a fixed data model that
loses information when buffering, and recursion on the call stack. Deser is
event-driven and non-recursive (driver state on the heap, miniserde-style):
suspendable parsing, lossless buffering, an extensible data model with
first-class extension types, middleware layers, native XML with namespaces.
**The costs, stated plainly:** no non-self-describing formats like protobuf;
JSON reads 33% faster to 60% slower than serde_json (~10% slower on
average); writes 3× faster to 70% slower; more binary bloat; and the orphan
rule makes displacing Serde's ecosystem position "very unlikely" — "it is
just not Serde."

**Why it matters:** not a migration call — a working proof that Serde's
limitations are design choices rather than Rust's laws, from the author of
some of Rust-adjacent Python's most-used libraries.

[`🔗 lucumr.pocoo.org`](https://lucumr.pocoo.org/2026/9/29/deser/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49901149)

---

## 30. Raven: a 4.8k-star "harness of harnesses" tops HF papers — with a results-free abstract

- **Velocity:** ▮ steady
- **Source:** Hugging Face papers / GitHub · 33 upvotes, 4.8k views · repo pushed today
- **Tags:** `agents` `harness` `benchmarks` `open-source`

EverMind's Raven pairs an arXiv paper (2609.33439) with one of the
fastest-rising agent repos of the week: Apache-2.0, 1,738 commits, **4,847★
in days**, pushed this morning. The paper claims the multi-agent harness
"significantly outperforms the state-of-the-art agent systems" — with no
benchmarks, metrics or numbers anywhere on the abstract page, no limitations
section, and a company listed as the author. The README's numbers are
self-reported and mostly chart images (DataAgentBench Pass@1 0.8762 with
Opus-5; a nanochat recursive-self-improvement showcase completing "172
training runs across 7 rounds without a single crash"). What the repo *does*
state plainly: "Raven is pre-alpha. Interfaces and configuration may change
quickly." No independent verification of any performance claim exists yet.

**Why it matters:** per this feed's own Void rule — star velocity is a
signal to investigate, not to publish. The honest current statement is "a
very active, pre-alpha agent harness whose every performance number is
self-reported"; the benchmark claims, not the stars, are what to watch.

[`🔗 arXiv:2609.33439`](https://arxiv.org/abs/2609.33439) · [`🔗 EverMind-AI/Raven`](https://github.com/EverMind-AI/Raven)

---

## 31. Show HN: the real-time solar system — 526k asteroids and ~35k tracked satellites in a browser tab

- **Velocity:** ▮ steady
- **Source:** Show HN · 155+ pts, 37 comments · ~9h ago (~03:08 UTC+8)
- **Tags:** `visualization` `webgl` `space` `show-hn`

space.bl2.net renders the solar system at real scale in the browser,
"current state" included: WebGL2 rendering with SGP4 orbit propagation in
web workers, CelesTrak TLEs for Earth-orbiting objects, JPL SBDB for
asteroids and comets, JPL Horizons for spacecraft positions, refreshed
daily; the ~30MB asteroid dataset loads in the background. A time slider
runs forward and backward, satellites appearing and disappearing per launch
date. The author describes it as "a byproduct of another project" built over
"a few evenings." **Limitations surfaced in the thread:** "real scale" means
positions, not markers — satellite dots are effectively city-sized, which is
why the geostationary belt renders as a visible ring; a high-time-speed
rendering glitch was reported; and the author fixed a mobile bug within
hours. Commenters compare it to Celestia (desktop-only, its SourceForge page
stale) and note roughly half of tracked objects are Starlink.

**Why it matters:** half a million propagated orbits at interactive frame
rates in a tab — WebGL2, workers and public ephemeris data keep raising the
ceiling on what "a weekend project" means.

[`🔗 space.bl2.net`](https://space.bl2.net/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49898778)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-09-30T12:03:00+08:00 |
| Items | 31 |
| Sources tracked | 24 (GitHub Trending/advisories, Hacker News, CISA KEV, NVD, VulnCheck, ControlPlane, OpenAI, Anthropic, White House/GovExec, arXiv, Hugging Face, Backblaze, Cloudflare, XBOW, EFF, The Register, tcl-lang.org, MSRC, The New Stack, Simon Willison, lucumr.pocoo.org, Ahead of AI, Frostyard, space.bl2.net) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[Previous day](2026-09-29.md) · [Raw .md](latest.md) · [Archive](../archive/index.md)
