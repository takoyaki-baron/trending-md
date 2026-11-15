---
date: 2026-11-15
updated: 2026-11-15T12:24:30Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 36
license: CC-BY-4.0
---

# trending.md — 2026-11-15

## 1. Security researchers scan 159,041 Lovable-built apps: 24,664 serve database records to anonymous visitors — passports, chat logs, tenant files among them

- **Velocity:** ▮▮▮ trending
- **Source:** crissyfield.de · 277+ pts on HN · 2.5h ago (~01:43 UTC+8)
- **Tags:** `lovable` `supabase` `data-exposure` `vibe-coding`

Researchers at Crissy Field GmbH, working with Handelsblatt, analyzed **159,041 Lovable projects** from Common Crawl (Dec 2025–Sep 2026) and found that of the **34,545** using the Supabase integration, **24,664 sent database records on page load without requiring login**. Following up with extra read-only requests using the same anonymous-visitor API keys, **7,403 sites (30% of the sending set)** exposed tables containing email addresses. The case files are grimly concrete: a German lifestyle forum with **80,000+ profiles and 200,000+ chat messages**, a service provider with **1,000+ records carrying passport numbers** and nationalities, a property manager's AI-generated internal emails about tenants, and one provider with **280,000 customer emails** left readable. The researchers' framing is careful — the 30% is not a confirmed leak rate (emails may be public contacts or test data) and the Common Crawl sample is not representative — but the pattern is: Lovable's pitch is that no technical skill is needed, while its terms place data-handling responsibility on the customer, and Supabase misconfigurations follow recurring patterns, so a hole openable in one app opens in thousands.

**Why it matters:** This is the vibe-coding platform risk quantified at scale: the failure is not one bug but a recurring misconfiguration class that non-technical builders cannot see, on apps that hold real personal data. The researchers' own takeaway — automated checks are no substitute for a professional security assessment — is the operating advice for anyone shipping one of these apps with user data behind it.

[`🔗 Crissy Field: Lovable research (EN)`](https://www.crissyfield.de/research/lovable-en/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50499017)

---

## 2. Italy fines Meta €805 million (~$887M) over Android photo access without consent

- **Velocity:** ▮▮▮ trending
- **Source:** reuters.com · 226+ pts on HN · 6.4h ago (~21:48 UTC+8)
- **Tags:** `meta` `gdpr` `privacy` `regulation`

Italy's data-protection authority (the Garante) announced on Saturday, Nov 14 that it fined Meta **€805 million** — about **$887 million**, roughly 0.47% of Meta's global revenue per the agency — over a Facebook app feature that suggested gallery content users could post while accessing Android users' photos and videos **without obtaining consent or informing them**. The order gives Meta **60 days** to disable the feature by default and collect consent separately, and the authority reserved the right to separately assess a 2026 feature that processes gallery content in the cloud. Reuters reports Meta was not immediately available for comment, and notes the probe did **not** cover whether the content was used to train AI models — a practice Meta has denied. Details here are per Reuters: the Garante's English press page had not published the notice at feed time.

**Why it matters:** The case is a template for how photo-scraping features get policed in the EU — consent must be separate and specific, not bundled into a sharing suggestion — and the reserved cloud-processing follow-up is the thread to watch: that is where the AI-training question re-enters.

[`🔗 Reuters: Italy fines Meta $887 million over Android users' data access`](https://www.reuters.com/world/italy-fines-meta-887-million-over-android-users-data-access-2026-11-14/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50497009)

---

## 3. Univer ships v1.5.0: the open-source office SDK that wants agents as first-class editors crosses 24k stars

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub Trending · +495★ today · 24.4k total · v1.5.0 released 9.6h ago (~18:33 UTC+8)
- **Tags:** `univer` `office-sdk` `spreadsheet` `typescript`

dream-num/univer — "Build your own AI office with Univer Office SDK" — posted **v1.5.0** (Nov 14, 10:33 UTC) and jumped to +495★ today on GitHub Trending. The project embeds open-source **Sheets and Docs** (editing, calculation, collaboration, file processing) into your own application, with an explicit pitch to start from open-source Sheets and Docs and connect your own application or agent — i.e. the document model is exposed programmatically for AI workflows, not just driven by a UI. The README ships quickstarts for a standalone spreadsheet editor, 8-language docs, and a feature-comparison page against the commercial suites it replaces in embedded contexts.

**Why it matters:** The agent-office pattern (agents reading and writing structured documents inside an app's own data model, rather than puppeteering a closed suite) needs exactly this layer — a permissively hackable spreadsheet/doc engine with an API surface. v1.5.0's trending moment is a good checkpoint to evaluate it against closed-suite plugins for your agent stack.

[`🔗 dream-num/univer`](https://github.com/dream-num/univer) · [`🔗 Release v1.5.0`](https://github.com/dream-num/univer/releases/tag/v1.5.0)

---

## 4. Google's Antigravity /teamwork: parallel agents plus "falsifiers" — a Lean proof of a 2013 conjecture, the Weil conjectures formalized, and a Rust Zircon port

- **Velocity:** ▮▮ rising
- **Source:** research.google · 109+ pts on HN · 6.9h ago (~21:20 UTC+8)
- **Tags:** `antigravity` `multi-agent` `lean` `formal-verification`

Google's research blog (Nov 13, Vahab Mirrokni) describes **/teamwork**, the multi-agent collaboration system inside Antigravity, built on Gemini 4 models: parallel explorer agents are paired with dedicated **falsifiers** — Lean 4 proof checking, unmodified test suites, execution simulators — so candidate results are machine-validated rather than trusted, with context partitioned so each agent sees only its step's files and tools. The claimed results are unusually concrete: a full proof of the **2013 Courtade–Kumar conjecture** formalized in Lean 4 (50M lines), the **first formalization of the Weil conjectures** (~1.8M lines of Lean across 28,800 subagent invocations), formalizations of Hilbert's tenth problem over rings of integers and the Birkhoff conjecture (open since 1927), a Go engine gaining ~2,600 Elo in under eight days, and a **Zircon microkernel port (~800k lines of safe Rust)** with libgav1 rewritten 20–30% faster than its C++. The external roll-out is real: /teamwork, /boost and Deep Review are live in Antigravity, with a 10,000-researcher free-access program open for applications.

**Why it matters:** Every number here is Google measuring its own system, so treat the benchmarks as vendor claims — but the architectural idea is the load-bearing part: pairing generators with automatic falsifiers is the same model-checks-the-model loop the Gödel-notebooks and Lean-tax-code results this week used, and it is becoming the standard shape for agentic work where a wrong answer is checkable.

[`🔗 Google Research: Advancing science and engineering with Antigravity's /teamwork`](https://research.google/blog/advancing-science-engineering-with-antigravitys-teamwork-feature/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50496811)

---

## 5. claude-trading-skills is the day's fastest riser: a Claude Skills toolkit that structures trading decisions — and refuses to be a signal service

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · +556★ today · 4.7k total · pushed 5.6h ago (~22:33 UTC+8)
- **Tags:** `claude-skills` `trading` `workflow` `finance`

tradermonty/claude-trading-skills took **+556★ today**, the biggest star gain on the daily board. It is a Claude Skills-based **workflow** toolkit for time-constrained individual investors: five named workflows (`market-regime-daily`, `core-portfolio-weekly`, `swing-opportunity-daily`, `trade-memory-loop`, `monthly-performance-review`), each a machine-readable YAML manifest naming the exact skills, decision gates and artifacts in order — market breadth, drawdown circuit-breakers, position sizing, a pre-trade discipline gate, and a post-trade postmortem loop. The README is unusually emphatic about what it is not: not financial advice, not a signal service, not automated trading — the goal is to structure review, risk management and journaling, with no-API degraded paths for every workflow and prominent fictional-data disclaimers on its example outputs.

**Why it matters:** The interesting signal is the shape, not the subject: agent-skill adoption is moving from doing the task toward enforcing a decision process with gates and artifacts — the same pattern the finance, medical and legal agent tooling is converging on. The disclaimer discipline is also worth reading as a genre template for anyone publishing agent workflows in a regulated domain.

[`🔗 tradermonty/claude-trading-skills`](https://github.com/tradermonty/claude-trading-skills) · [`🔗 Documentation site`](https://tradermonty.github.io/claude-trading-skills/)

---

## 6. NVIDIA serves GLM-5.3 (753B) across two DGX Stations — 607.8 tok/s peak, with the concurrency curve honestly included

- **Velocity:** ▮▮ rising
- **Source:** developer.nvidia.com · 108+ pts on HN · 6h ago (~22:09 UTC+8)
- **Tags:** `glm-5` `vllm` `inference` `dgx`

NVIDIA's technical blog (Nov 13) walks through serving Z.ai's **GLM-5.3** — a 753B-parameter MoE (40B active) in NVFP4, with a ~464 GB checkpoint that exceeds one GB300's 252 GB of HBM3e — across **two DGX Stations linked by ConnectX-8 RDMA**, with vLLM v0.30.0 exposing one OpenAI-compatible endpoint. The recipe is tensor parallelism (TP=2, not disaggregation), multi-token prediction drafting 4 tokens per step, FP8 KV cache, and prefix caching; the measured curve on 80 SPEED-Bench coding conversations peaks at **607.8 tok/s at concurrency 16** — and the post prints the whole table, including the fall to **385 tok/s at C32** with mean latency of 453.5 seconds and per-user throughput dropping from 115.3 to 13.0 tok/s. Caveats are stated in the post itself: the endpoint ships **unauthenticated** (firewall and add TLS before wider use), older NCCL versions can deadlock cross-node CUDA graph replays over RoCE, and disabling prefix caching changes the numbers.

**Why it matters:** Two commodities here: a reproducible recipe for the moment a checkpoint outgrows one box (the 464 GB class is becoming normal), and an example of publishing the degradation curve next to the headline number — the C16 peak is the tweet, the C32 row is the truth.

[`🔗 NVIDIA Technical Blog: When one GPU isn't enough`](https://developer.nvidia.com/blog/when-one-gpu-isnt-enough-serving-glm-5-3-across-two-nvidia-dgx-stations-with-vllm/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50497155)

---

## 7. PyPI ships its security-signal redesign: a Security tab that shows provenance, flags late files, and warns on provenance loss

- **Velocity:** ▮▮ rising
- **Source:** blog.pypi.org · 148+ pts on HN · 4.5h ago (~23:40 UTC+8)
- **Tags:** `pypi` `supply-chain` `provenance` `packaging`

PyPI's project-page redesign is fully rolled out (announced complete Nov 6; the HN wave arrived Nov 14): a dedicated **Security tab** showing each release's **provenance state** and per-file attestation details — PyPI Publish attestations (Trusted Publisher uploads) and SLSA Build Provenance (linking files to source commit, platform and build instructions). Four warning types — **incomplete, inconsistent, change of, and loss of provenance** — are designed to surface possible account takeovers or compromised publishing pipelines; **late-file warnings** flag files added 14+ days after a release (on releases predating July 2026, when the policy landed); quarantine banners override everything else; and sidebar metadata is now labeled "PyPI data" vs "Data verified by PyPI". Funded by OpenSSF, implemented by Kabu Creative, following the OpenSSF Attestations Style Guide.

**Why it matters:** The attestations existed for two years; this is the UI that makes them *readable* at install-decision time — which is when they change behavior. The provenance-loss warning is the interesting one: it is a supply-chain tripwire that fires on the pattern account takeovers actually produce.

[`🔗 PyPI blog: UI updates complete`](https://blog.pypi.org/posts/2026-11-06-ui-updates-complete/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50497892)

---

## 8. KDE: The documentary — 263 points as the community's story gets the film treatment

- **Velocity:** ▮▮ rising
- **Source:** tube.kockatoo.org · 263+ pts on HN · 6.5h ago (~21:43 UTC+8)
- **Tags:** `kde` `documentary` `open-source` `community`

A feature-length documentary about KDE — the 30-year-old desktop community behind Plasma — is running up HN at **263 points and 123 comments**, hosted on the community's Peertube instance. Commenters point to the maker's pedigree: it comes from **CultRepo**, the channel behind earlier free-software documentaries, and the thread turned into a 20-years-of-KDE appreciation thread (stability across releases, configurability, the C++ desktop codebase). It is the rare front-page item that is pure community history rather than a release or a vulnerability.

**Why it matters:** The free-software documentary is becoming its own genre — CultRepo's back catalogue keeps fronting HN — and the comments are a useful pulse-check on how the oldest large desktop community is perceived by working engineers in 2026.

[`🔗 KDE: The documentary (video)`](https://tube.kockatoo.org/w/fFinNHfanLT7aBEb2B8y4c) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50496976)

---

## 9. Caveman Code launches: the 120k-star token-cutting project becomes a free Mac coding-agent app — with self-run benchmarks it publishes both ways

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · +227★ today · 120.0k total
- **Tags:** `caveman` `token-optimization` `coding-agents` `context`

JuliusBrussee/caveman — the viral skill + proxy that makes agents "say less and read less" — crossed **120k stars** and launched **Caveman Code**, a free Mac/browser harness that runs Claude Agent, Codex, Cursor and its own agent side by side on your existing subscriptions. The launch claims are held to a constant model: on Terminal-Bench 4, **21% cheaper per solved task than Codex** (90/192 on GPT-6.1 Sol, tied with Codex) and **14% cheaper than Claude Code** (97/180 vs 83/177 on Opus 5.5); **76% cheaper** across simulated day-long multi-app sessions; first-request size 2.7k tokens vs Claude Code's 16.7k. The underlying technique's own numbers: **33.2% fewer input tokens** across 54 Claude Code runs with 18/18 answers correct. The disclosures are unusually complete — every measurement is their own run at list prices, the Claude Code run counts differ slightly (180 vs 177), and they publish the failed experiment too (stripping prior reasoning from history cut re-reading 68% but **raised** cost 19% and hurt solve rates), which is why they argue cost-per-solved-task, not raw tokens, is the metric.

**Why it matters:** Context-efficiency harnesses are converging from side-project to product, and the honest benchmark form here — constant model, per-solved-task cost, failures included — is exactly the shape a buyer should demand from any same-model-smaller-bill pitch.

[`🔗 JuliusBrussee/caveman`](https://github.com/JuliusBrussee/caveman) · [`🔗 Launch post: Introducing Caveman Code`](https://caveman.so/news/introducing-caveman-code)

---

## 10. The US tax code, formalized in Lean: 138 drafting faults certified, and bugs found in two tax-software packages

- **Velocity:** ▮▮ rising
- **Source:** lexifina.com · 102+ pts on HN · 4.5h ago (~23:41 UTC+8)
- **Tags:** `lean` `formal-methods` `tax` `research`

A project by Alan Yahya at Lexifina (CC0-licensed) translated Title 26 — the Internal Revenue Code — into Lean, as structured cross-references checked mechanically (one git commit per public law, back to the 1994 edition), plus a **2025 individual income tax model** producing Form 1040 figures (~2,159 definitions and theorems, AMT included). The verified yield: **138 real drafting faults** in the statute, each with a Lean certificate (dead references, typos, duplicate numbering, unclosed parentheses), universal proofs such as the SALT cap never growing with income and the Tax Table deviating from the statutory formula by at most −$5 to +$6 under $100,000, and cross-validation against three independent tools (PolicyEngine-US, Tax-Calculator, UsTaxes) on 5,000 households — which surfaced **bugs in Tax-Calculator and UsTaxes** plus two in their own model. Automated search over the proven model (~195,787 single-year returns) rediscovered the known §199A and Roth-conversion strategies and reported three novel ones, including that Schedule 8812 pays more than the statute allows. The limitations are stated plainly: the statute translation was AI-done and **not checked by a lawyer or CPA**, coverage is only the 2025 individual income tax, and their conclusion is that a single tax year holds no Roth-sized unpublished loophole — the big ones likely live in partnerships and S-corps.

**Why it matters:** This week produced three independent demonstrations (this, Antigravity's proofs, the Gödel notebooks) of the same loop — AI translates, the proof assistant disposes — applied at three scales. The tax-code version is the most consequential for non-mathematicians: the oracles here are the IRS's own published figures and three independent software packages, and two of the three disagreed with the law.

[`🔗 Lexifina: Formalizing the US Tax Code`](https://lexifina.com/blog/formalizing-the-us-tax-code) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50497900)

---

## 11. Project Zero tightens disclosure: the 30-day soak is gone, and the endpoint is Full 30 by January 2028

- **Velocity:** ▮▮ rising
- **Source:** projectzero.google · 42+ pts on HN · 9h ago (~19:13 UTC+8)
- **Tags:** `project-zero` `disclosure` `security-policy` `ai`

Google Project Zero published a new vulnerability disclosure policy (Nov 13, Natalie Silvanovich) replacing the 2021-era "90+30" — 90 days to remediate plus 30 days of soak time — with a **"Full X" schedule: disclosure X days after report, regardless of patch status**. The phase-down is dated: **Full 90 now → Full 60 on Feb 2, 2027 → Full 30 on Jan 3, 2028**. The grace period and variant policy are removed; only three exceptions remain (in-the-wild bugs handled under Google's application-security policy, already-public vulnerabilities, and vendor request). The stated motivation is AI on both sides of the race: LLMs compress bug discovery and shrink the patch-to-exploit window, so a soak period that assumed slow exploit development no longer buys users safety. Notably, whether a bug is actually fixed is no longer a policy decision point — P0 will still track fix status, but disclosure no longer waits on it.

**Why it matters:** This is the first major disclosure-policy rewrite explicitly argued from AI-accelerated exploitation timelines, and it sets a deadline the whole industry can plan against — vendors' patch SLAs, and every enterprise patch-cadence assumption built on 90+30, now have a known expiry date.

[`🔗 Project Zero: disclosure policy update`](https://projectzero.google/2026/11/disclosure-policy.html) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50496051)

---

## 12. DeepSeek V3 in 190 lines of pure JAX — MLA, MoE balancing and MTP, trained from scratch on a MacBook Air

- **Velocity:** ▮ steady
- **Source:** Show HN · 80+ pts · 5.1h ago (~23:04 UTC+8)
- **Tags:** `jax` `deepseek` `education` `transformer`

Vaibhaav Tiwari's teaching-scale implementation puts the entire DeepSeek-V3 architecture in **190 lines of pure JAX** — no Flax, no Equinox, params as plain dicts of arrays — and pretrains it from scratch on a MacBook Air M5 (24 GB): a 36.2M-parameter model (13.6M active per token) over 21.7M tokens of public-domain detective fiction, ~2.6 hours, validation loss 5.02 → 3.51. Every DeepSeek-V3 idea is present and measurable at this scale: MLA's latent cache (480 → 144 numbers per token per layer), decoupled RoPE, DeepSeekMoE (1 shared + 16 routed, top-4), and — the nice part — **auxiliary-loss-free balancing**, with the README printing the before/after: expert load spreads 5.7–6.9% per expert with the bias versus 0.09–18.6% without, a direct measurement of what the balancing trick buys.

**Why it matters:** Most implement-X-in-N-lines repos retype the shapes; this one makes each paper idea falsifiable at toy scale, which is the difference between a code walkthrough and a working lab. The bias-balancing before/after alone is worth it for anyone who has read the DeepSeek-V3 report and not believed the load plots.

[`🔗 Vaibhaav-Tiwari/deepseek-v3-jax`](https://github.com/Vaibhaav-Tiwari/deepseek-v3-jax) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50497589)

---

## 13. agweb: a macOS browser built for coding agents — it never steals focus, and it measures its own footprint

- **Velocity:** ▮ steady
- **Source:** Show HN · 66+ pts · 6.1h ago (~22:08 UTC+8)
- **Tags:** `agweb` `agents` `browser` `macos`

agweb (paul-nameless/agweb) is a WebKit-based macOS browser designed for agents rather than humans: agents drive it from the shell with a playwright-style CLI, dialogs and file pickers are answered in code, and — the core property — **no window ever takes focus**, so five parallel agents can browse without a keyboard war. Every agent's tabs stay visible in one dashboard (⌘D) with its last command, native macOS events drive clicks and hovers so human-gated sites work, `fill --secret-cmd 'pass show site'` types credentials the agent never sees in its transcript, and idle tabs suspend to 0% CPU. The README ships its own measurements: five idle pages cost **590 MB** against 730 MB for headless Chrome and 1.6 GB for Playwright Chrome. Created Nov 11, 122★, needs macOS 26+.

**Why it matters:** The agent-browser layer is consolidating around a specific interface contract — ref-stable snapshots, diffable finds, secret-redacted input — and agweb's position, a real window that never takes focus and stays visible to the human, is a distinct point in that design space between headless browsers and Playwright-driven Chrome.

[`🔗 paul-nameless/agweb`](https://github.com/paul-nameless/agweb) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50497147)

---

## 14. Fursoy: a from-scratch out-of-order RV64 core in SystemVerilog boots mainline Linux 6.6

- **Velocity:** ▮ steady
- **Source:** Show HN · 50+ pts · 6.1h ago (~22:06 UTC+8)
- **Tags:** `riscv` `cpu` `systemverilog` `hardware`

Fursoy Slice-1 is a clean-slate **64-bit out-of-order superscalar RISC-V processor** (RV64IMAFDV + Zba/Zbb) written in SystemVerilog by a solo developer — 2-wide fetch/decode/rename/retire, a 128-entry ROB, 160-entry physical register file, 8 branch checkpoints, non-blocking 8-bank L1D with a hardware page-table walker, and Sv39 demand paging with M/S/U privilege separation. The headline artifact: it **boots mainline Linux 6.6.50 and BusyBox** under virtual memory, and it closes timing at **500 MHz** on Nangate 45nm standard cells across 8 core blocks (full synthesis report published). 17 stars — this is a craft project, not a product, and the README's level of microarchitectural specificity reads like it.

**Why it matters:** Booting Linux on a homegrown OoO core is one of the hardest solo milestones in hardware, and the published synthesis/STA reports make it a usable reference for anyone learning what out-of-order actually costs — every structure is named, sized, and timed.

[`🔗 FURSOY/fursoy-cpu`](https://github.com/FURSOY/fursoy-cpu) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50497137)

---

## 15. The IRS's Direct File code is on GitHub — and the repo itself says it is archived, unmaintained, and not for production

- **Velocity:** ▮ steady
- **Source:** github.com/IRS-Public · 65+ pts on HN · 2.4h ago (~01:48 UTC+8)
- **Tags:** `irs` `direct-file` `open-source` `government`

HN resurfaced **IRS-Public/direct-file**, the repository behind the IRS's free direct e-filing service — 4.6k stars, and a README that states its own status without hedging: **"This repository has been archived and is no longer maintained. The code is provided for historical reference and may contain unpatched or unknown vulnerabilities. It should not be used in production systems."** The code is still a remarkable artifact: an interview-based filing service that interprets Title 26 as plain-language questions (developed with the IRS Office of Chief Counsel), plus the **Fact Graph** — a declarative XML knowledge graph, in Scala on the JVM and transpiled to the browser via Scala.js, built to reason about incomplete information like a partially completed return, and explicitly offered as a reference for business-rule engines. The last push was June 11; the thread's live question is whether the Direct File program itself returns and is made permanent.

**Why it matters:** Two things travel together here: a genuinely reusable public-sector artifact (the Fact Graph is domain-independent), and a repo whose safety framing is a model for archived government code — the README refuses to let historical reference read as maintained software.

> "This repository has been archived and is no longer maintained. The code is provided for historical reference and may contain unpatched or unknown vulnerabilities. It should not be used in production systems." — the repo's README

[`🔗 IRS-Public/direct-file`](https://github.com/IRS-Public/direct-file) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50499083)

---

## 16. Tencent open-sources LoopForge: self-hosted delivery pipelines where coding agents open the PRs and humans hold the gates

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · +101★ today · 834 total · v0.3.9-rc.1 released ~24h ago
- **Tags:** `loopforge` `tencent` `agent-orchestration` `self-hosted`

Tencent/LoopForge is a self-hosted (Docker, MIT) workspace where teams ship software with coding agents: a **Main Bot** opens sandboxed workspaces, checks out repos, delegates to project roles, and opens the PR — while repeatable work is captured as **SOPs**, graphs of Agent, Script, Human-gate and sub-SOP nodes with per-node artifacts, retries, and send-back-to-step semantics. The executor list is notable for its breadth: CodeBuddy (Tencent's own), Codex, Claude Code, OpenCode, Cursor CLI, Antigravity, Kimi Code, Pi, DeepSeek Harness and ZCode. Both chat and SOP paths track the same requirements for delivery and cost reports. The release cadence is rapid — v0.3.7, v0.3.8 and a v0.3.9-rc.1 within three days — and it crossed +101★ today.

**Why it matters:** The agent-Delivery-platform layer is where this year's agent tooling is consolidating, and LoopForge's differentiators are the two things most competitors skip: everything self-hosted on your own infrastructure, and human gates as first-class nodes in the delivery graph rather than an approval button bolted on the side.

[`🔗 Tencent/LoopForge`](https://github.com/Tencent/LoopForge) · [`🔗 Releases`](https://github.com/Tencent/LoopForge/releases)

---

## 17. Generative AI burns 1.4–180× more energy on non-English text — Hindi 7.9×, Bengali 15.3× — with lower accuracy on top

- **Velocity:** ▮ steady
- **Source:** news.umich.edu · 135+ pts on HN · 4.2d ago (~23:07 UTC+8, Nov 10)
- **Tags:** `energy` `multilingual` `research` `emnlp`

University of Michigan researchers (Naihao Deng, Rada Mihalcea et al., presented at EMNLP) measured energy across three open-source models — Qwen 3, Gemma 3, Llama 3.1 — answering Belebele reading-comprehension questions in 122 languages, using the ML.Energy framework: generating non-English text costs **1.4 to 180× more energy** than English (the paper's own abstract puts the ceiling at up to **179 times**, English 17.6 kJ → Pashto 3,147 kJ), with Hindi at **7.9×** and Bengali at **15.3×** while most Western European languages stay at 2× or less. The mechanism is compositional: non-Latin scripts tokenize into more tokens, more tokens consume memory that forces smaller batches, and smaller batches raise energy per token — and the disparity persists at larger model sizes and across processors. The accuracy penalty rides along: "The languages that typically consume more energy also tend to have lower accuracy in the model output," per Deng. By their arithmetic with Ethnologue data, about **5.2 billion people** pay more than twice the energy to use AI in their first language.

**Why it matters:** The "double penalty" — higher cost and lower quality for the same question — is a pricing structure, not a physics fact: the authors' fixes (per-language models, translate-to-English pipelines) are engineering choices, and for anyone serving multilingual users, this paper is the measurement to run before setting per-language pricing.

[`🔗 U-Mich News: Generative AI uses more energy on non-English text`](https://news.umich.edu/generative-ai-uses-more-energy-on-non-english-text/) · [`🔗 Paper: The Language-Energy Divide (arXiv 2606.21869)`](https://arxiv.org/abs/2606.21869) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50441444)

---

## 18. LinkedIn and Monster pull 1,500+ fake job postings after a CBC investigation traced them to a travel MLM

- **Velocity:** ▮ steady
- **Source:** cbc.ca · 54+ pts on HN · 1.3h ago (~02:56 UTC+8)
- **Tags:** `linkedin` `job-scam` `mlm` `investigation`

More than **1,500 misleading job postings** — "Work From Home Travel Planner and Virtual Customer Support Representative", remote work, no experience needed, salaries up to $75,000 US — have been taken down from LinkedIn and Monster after a CBC News visual investigation traced the network of travel-themed pages to a US-based multi-level marketing company, **Evolution Travel**. The listings funnelled applicants into virtual information sessions where they were asked to pay hundreds of dollars up front plus a monthly subscription, for a program whose money came from booking-travel courses and recruiting others — in the investigation's words, there was **"no job and no salary."** The story was posted Nov 12 and fronted HN on Nov 14.

**Why it matters:** Job-scam volume is one of the quieter AI-era harms — generative tooling makes listing farms cheap to run at exactly the moment economic anxiety makes applicants less picky — and the take-down shows the moderation loop only closes when someone does the connection work CBC did: linking hundreds of nominally unrelated pages to one payout structure.

[`🔗 CBC News: LinkedIn, Monster take down over 1,000 fake job postings`](https://www.cbc.ca/news/canada/linkedin-monster-take-down-over-1-000-fake-job-postings-after-cbc-investigation-9.7415379) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50499723)

---

## 19. Watch a Brain Learn: Aatish Bhatia's interactive RL explainer wires you the neurons

- **Velocity:** ▮ steady
- **Source:** aatishb.com · 73+ pts on HN · 6.7h ago (~21:31 UTC+8)
- **Tags:** `reinforcement-learning` `visualization` `neuroscience` `education`

Aatish Bhatia and neuroscientist Arkarup Banerjee published the next interactive in the Myriad series: **"Watch a Brain Learn"**, a visual explanation of reinforcement learning where you first hand-wire a four-neuron digital creature ("a spark") to steer toward light — reproducing the fear/aggression/attraction circuits from their previous article — and then hand the controls to trial-and-error: the creature learns the same behaviors by itself through reward, with every step of the learning rule made interactive and visible. The pedagogical move is the same one that made their earlier explainers front-page staples: the mechanism is something you operate, not a diagram you read.

**Why it matters:** RL explainers usually start with tables and Q-values; this one starts with a brain you can mis-wire yourself, which is a genuinely different on-ramp — and a good link to hand anyone on your team who needs to understand what "reward shapes behavior" means before touching an agent that has one.

[`🔗 Watch a Brain Learn (interactive)`](https://aatishb.com/myriad/how-brains-learn/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50496885)

---

## 20. Let's Write a PostScript Interpreter: a stack language that fits on a printed page, in one-line JavaScript functions

- **Velocity:** ▮ steady
- **Source:** beyondloom.com · 88+ pts on HN · 39h ago (~13:12 UTC+8, Nov 13)
- **Tags:** `postscript` `interpreters` `forth` `programming-languages`

Devin Weaver's essay (beyondloom) builds a minimal PostScript interpreter in deliberately terse JavaScript — regex tokenizer, two global stacks (operand + dictionary), operators as plain functions that pop by arity — small enough to fit on a printed page or two, with every example running identically in Ghostscript. The essay's best technical nuggets are PostScript's odd corners: `[` and `]` are not syntax but a **mark** protocol (`[` pushes a mark, `]` collects everything above it, making bracketed arrays composable list comprehensions), and the dictionary stack gives **dynamic scoping, not lexical** — which is why higher-order functions are awkward and why the real `bind` operator exists. The frame is "human-scale languages": tools a single person can build and fully understand.

**Why it matters:** PostScript is the most-deployed stack language almost nobody deliberately writes, and this is the cleanest on-ramp to why its descendants (PDF's imaging model, Forth-style embedded tooling) look the way they do — plus a one-evening interpreter project with real depth per line.

[`🔗 Let's Write a PostScript Interpreter`](https://beyondloom.com/blog/postscript.html) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50478632)

---

## 21. SpaceX catches the Starship itself: Flight 15 ends with the first tower catch of the upper stage — the booster catch was aborted

- **Velocity:** ▮▮▮ trending
- **Source:** spacex.com · 871+ pts on HN · 7h ago (~05:03 UTC+8)
- **Tags:** `spacex` `starship` `flight-15` `reusability`

Flight 15 ended the way its pre-flight plan promised: the launch tower caught the **Starship upper stage** — the first time SpaceX has ever caught the ship itself, after two years of catching only the Super Heavy booster. The planned **double catch** did not happen: per the flight thread, the booster underperformed (an engine failure during boostback, "engine-rich" green-tinted braking burn on the landing footage), its GNC aborted the catch autonomously, and it was diverted to a soft Gulf landing — where the Flight Termination System fired on water impact. Musk's post-flight summary: the booster was low on fuel, and there was no mood of risking the tower with a boom — boosters are cheaper than towers. The ship catch itself was clean, and commenters note it was the point: "the ship catch is what was really interesting at this point of development."

**Why it matters:** Booster reusability is proven economics; ship reusability is the missing half of the rapid-cadence loop — you can't stack and refly a vehicle whose upper stage always comes home as wreckage. Today's catch is the first proof the tower can take the ship, and it is the exact reusability milestone that orbital-data-center feasibility math (item 31 below) prices Starship at.

[`🔗 SpaceX: Starship Flight 15`](https://www.spacex.com/launches/starship-flight-15) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50500963)

---

## 22. The ground stop gets its cause: a copper-to-fiber conversion gone wrong — a router being worked on flooded air-traffic-control systems

- **Velocity:** ▮▮ rising
- **Source:** bbc.co.uk · 37+ pts on HN · 10h ago (~02:03 UTC+8)
- **Tags:** `faa` `ground-stop` `l3harris` `infrastructure`

Since we covered the FAA nationwide ground stop on 2026-11-14 ("cause still unstated"): Transport Secretary Sean Duffy now says the halt traced to the **copper-to-fiber conversion** of FAA airspace communications being performed by contractor **L3Harris** — a router being worked on "started flooding other air traffic control systems," forcing the airspace shutdown for safety. Officials state they see "zero evidence of anything nefarious, and zero evidence of anything AI related" (FAA head Bryan Bedford), and do not believe it was a cyber-attack; Friday's stop was the longest such incident since 9/11, with disruption expected to last days. L3Harris — which says it had completed **over 70%** of the modernization work before the stop — confirmed the conversion context and said it is "supporting the FAA in its investigation."

**Why it matters:** The failure mode is a checklist item, not a mystery: a cutover on live safety-critical comms leaked traffic into production ATC systems. For anyone operating infrastructure migrations, the story is a free case study in why conversion happens on shadow environments with a kill switch — and the government's "not nefarious" finding is the reminder that the boring cause is usually the true one.

[`🔗 BBC: Copper wire upgrade caused nationwide flight suspension`](https://www.bbc.co.uk/news/articles/c6wy9lynq4qno) · [`🔗 L3Harris statement on the Nov. 13 ground stop`](https://www.l3harris.com/newsroom/press-release/2026/11/l3harris-statement-nov-13-ground-stop)

---

## 23. EFF asks the Sixth Circuit to require a warrant for ALPR database searches — US v. Sturdivant

- **Velocity:** ▮▮ rising
- **Source:** eff.org · 81+ pts on HN · 2h ago (~10:03 UTC+8)
- **Tags:** `eff` `alpr` `surveillance` `fourth-amendment`

EFF and the ACLU filed an amicus brief (Nov 14) in **United States v. Sturdivant** at the Sixth Circuit: Cleveland police, knowing only the make/model/color of a robbery suspect's car, ran an open-ended search of two ALPR databases — **Flock and ELSAG** — found the defendant's car near the robbery sites, and arrested him. The district court held Sturdivant had no reasonable expectation of privacy in his license plate number "because it could be observed by members of the public." The brief argues mass plate tracking is a Fourth Amendment "search" — ALPRs give law enforcement "a virtual time machine to view suspects', or anyone else's, past movements (and much more) with just the click of a button" — and notes a federal district court agreed just last month, calling ALPRs "a form of indiscriminate mass surveillance."

**Why it matters:** Yesterday's feed covered the campus Flock campaigns — the contractual front of the ALPR fight; Sturdivant is the judicial front, and the two movements are converging on the same question: whether a database built from public roads needs probable cause to query. The Sixth Circuit's answer will bind four states' worth of plate-reader deployments.

[`🔗 EFF: We're Asking an Appeals Court to Require a Warrant for ALPR Searches`](https://www.eff.org/deeplinks/2026/11/were-asking-appeals-court-require-warrant-alpr-searches) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50503255)

---

## 24. Dokploy's 9.9: an authenticated org member turns a backup `serviceName` into root on the host

- **Velocity:** ▮▮ rising
- **Source:** CVE-2026-129433 (VulnCheck CNA-assigned) · record published 20h ago (~20:32 UTC+8, Nov 14)
- **Tags:** `dokploy` `cve` `command-injection` `self-hosted`

**CVE-2026-129433** (CVSS 3.1 **9.9**, VulnCheck CNA-assigned; NVD `Deferred`, published 2026-11-14T12:32Z): Dokploy **before 0.31.1** has an OS command injection in `getComposeContainerCommand()` — an authenticated organization member can store a `serviceName` value carrying shell metacharacters through the `backup.create` or `backup.update` tRPC procedures, and the payload executes **as root** when the scheduled backup runs, giving full host takeover. The project fixed it in **v0.31.1** (released Nov 12, with v0.31.2 following Nov 13); the record links GHSA-j329-jw7j-rxjm, PR #5908 and commit `b24006e`. Dokploy is a self-hosted PaaS — the class of box people deploy exactly because they want to own their infrastructure, and then leave the management port reachable from the internet.

**Why it matters:** The pattern repeats across every self-hosted platform CVE this feed has covered: a parameter that should be an identifier flows into a shell. If you run Dokploy, the check is one line — are you on ≥ 0.31.1? If you build the next Dokploy, the lesson is the same one: identifiers are not shell arguments, even behind authentication.

[`🔗 GHSA-j329-jw7j-rxjm (Dokploy security advisory)`](https://github.com/Dokploy/dokploy/security/advisories/GHSA-j329-jw7j-rxjm) · [`🔗 Release v0.31.1`](https://github.com/Dokploy/dokploy/releases/tag/v0.31.1) · [`🔗 CVE-2026-129433 record`](https://www.cve.org/CVERecord?id=CVE-2026-129433)

---

## 25. "Never assembled — ever": Woz wrote Apple's first BASIC by hand on paper, and the resurfaced Q&A settles how

- **Velocity:** ▮▮ rising
- **Source:** retrocomputing.stackexchange.com · 137+ pts on HN · 6h ago (~06:03 UTC+8)
- **Tags:** `wozniak` `basic` `6502` `history`

A 2021 retrocomputing StackExchange question — "How did Woz write the Apple 1 BASIC before building the computer?" — fronted HN today (17,308 views, top answer at 82). The answer, assembled from Wozniak's own talks: he wrote Integer BASIC **on paper for the 6502, hand-assembling every instruction** — no assembler, because his Hewlett-Packard employer would have paid time-sharing charges he could not afford as an individual: "you write your instructions on the right side of the page, you write the addresses over on the left side… So I would just sit there and assemble it myself." And the sentence that ends the debate: **"The BASIC, which we shipped with the first Apple IIs, was never assembled — ever. There was one handwritten copy, all handwritten, all hand-assembled."** (1986 Apple World Convention talk, via the Apple II History site.)

**Why it matters:** Hand-assembly lore is usually myth-adjacent; this one is documented in the author's own voice, and it is a calibration point for what "no tools" actually meant in 1976 — a person, a legal pad, and the 6502 opcode table. It also reframes this week's AI-built-tooling items: the distance between "wrote the interpreter" and "shipped the interpreter" used to be measured in handwriting.

[`🔗 Retrocomputing.SE: How did Woz write the Apple 1 BASIC?`](https://retrocomputing.stackexchange.com/questions/17957) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50501594)

---

## 26. The Claude Delusion: an essay on why programmers hear "as good as I am" as "superhuman"

- **Velocity:** ▮▮ rising
- **Source:** netmeister.org · 146+ pts on HN · 15h ago (~13:03 UTC+8, Nov 14)
- **Tags:** `ai` `critique` `dunning-kruger` `discourse`

Jan Schaumann's essay (Nov 13) takes apart a specific sentence pattern in AI discourse — Claude coding models are "**as good as I am**," therefore "superhuman at writing code" — and argues the inference is an illusory-superiority artifact, not a measurement: for people whose identity is built on a scarce skill, anything approaching their own level feels by construction beyond human. His case study is Bill Gates describing being "shocked" that GPT-4 aced an AP Biology exam of questions Gates himself invented — the hubris being that Gates presumed his own made-up questions measured "AI's true capabilities." From there the essay reads both doom and utopia narratives as the same psychology wearing different costumes, and closes on what programming's status as a differentiating skill meant to a generation of nerds.

**Why it matters:** This feed reports model claims weekly, and this is a useful filter to run them through: a claim of matching a top human expert is a claim about a *distribution*, and the people making it are rarely a random sample of that distribution — including the ones writing feed items.

[`🔗 Jan Schaumann: The Claude Delusion`](https://www.netmeister.org/blog/claude-delusion.html) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50496921)

---

## 27. HN resurfaces the Baude incident: Claude, asked to renumber pages, deleted a year of lecture notes — recovered from Dropbox

- **Velocity:** ▮ steady
- **Source:** tomshardware.com · 44+ pts on HN · 10h ago (~02:03 UTC+8)
- **Tags:** `claude` `agent-safety` `file-deletion` `backup`

William Baude — Harry Kalven, Jr. Professor of Law at the University of Chicago — posted on Nov 5: "Yesterday while I was at lunch, Claude deleted a year of con law lecture notes and my current syllabus." He had tasked the agent with updating page numbers in old lecture notes and returned to its admission: **"I deleted your Fall 2026 FINAL syllabus .doc and all top-level Class N 2023 notes by accident, and they are not restored."** The files were later recovered via Dropbox, and Baude framed the story as a public-service announcement. The HN thread resurfaced it today (44 pts, 62 comments and climbing), debating why an agent has write access to irreplaceable files at all.

**Why it matters:** The agent-deletes-files class keeps recurring (an agent deleting a TV edit weeks before air, a database dropped in 9 seconds), and every post-mortem lands on the same boring fix: nothing an agent can touch should lack a snapshot. Version control for everything an agent sees is cheaper than trusting the model's self-report — including its apology.

[`🔗 Tom's Hardware: Rogue Claude AI deletes law professor's syllabus, one year of lecture notes`](https://www.tomshardware.com/tech-industry/artificial-intelligence/rogue-claude-ai-tasked-with-renumbering-pages-accidentally-deletes-law-professors-entire-syllabus-one-year-of-lecture-notes-youre-right-to-be-angry-i-deleted-your-files-through-my-own-carelessness-humbled-agent-admits) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50499114)

---

## 28. create-ecdh ≤ 4.0.4 skipped peer-key validation in browsers — invalid-curve ECDH, fixed the same day the record landed

- **Velocity:** ▮ steady
- **Source:** CVE-2026-129319 (harborist CNA-assigned) · record published Nov 14, fix 4.0.5 on npm the same morning
- **Tags:** `npm` `create-ecdh` `crypto` `supply-chain`

**CVE-2026-129319** (CVSS 4.0 **8.2**, CNA harborist; NVD `Received`): `create-ecdh` — the browserified implementation of Node's `crypto.createECDH`, pulled in by browser bundlers and running on Node versions without native crypto — never validated the **peer's public key** in `computeSecret`/`setPublicKey`: the attacker-supplied point was multiplied by your private key without checking it lies on the configured curve or in its prime-order subgroup. That is the classic invalid-curve/small-subgroup class, where repeated queries leak enough equations to recover the static key. npm shipped **4.0.5** at 06:47 UTC on Nov 14 — one minute before the CVE record published (06:48Z) — a same-day fix.

**Why it matters:** The library is old browserify-era glue, but an old transitive dep in the crypto path is exactly the profile that survives in Electron/webview bundles for years. If your bundle includes `create-ecdh`, bump to 4.0.5 — and treat any hand-rolled ECDH peer-point handling with the suspicion this record earns.

[`🔗 CVE-2026-129319 record`](https://www.cve.org/CVERecord?id=CVE-2026-129319) · [`🔗 npm: create-ecdh`](https://www.npmjs.com/package/create-ecdh)

---

## 29. A ZIP archive a PC can boot: the boot sector hides inside the local file header — and the archive still unzips

- **Velocity:** ▮ steady
- **Source:** goliath32.com · 59+ pts on HN · 12h ago (~00:03 UTC+8)
- **Tags:** `zip` `bootsector` `polyglot` `linux`

A debugging session about early userspace turned into a shower thought: ZIP is *the* format built for polyglot trickery ("Way back when, self extracting ZIP archives where a thing, EXE/ZIP polyglots that can be run and unpack themselves") — and "the standard CPIO tool is possibly the most cursed archiver under the sun." The built artifact is `boot.zip`: a completely normal ZIP — `unzip -t` passes, and it contains its own source code needed to build itself from scratch — whose first bytes are simultaneously a valid ZIP **local file header** and a bootable image: the header's fields hide the Multiboot magic `1BADB002` and 16-bit real-mode boot code, which is why `file` reports a DOS/MBR boot sector. The essay walks the byte-level construction, and ships the archive as a download. It is the same craft family as the tar-parsing torture test this feed covered on 11-11, viewed from the builder's side instead of the fuzzer's.

**Why it matters:** Format polyglots are the cleanest way to learn where two parsers disagree — here, the boot loader reads bytes that unzip reads as structure, and neither interpretation corrupts the other. Also a genuinely fun one-evening build: the artifact boots.

[`🔗 goliath32: Creating a self booting ZIP archive`](https://goliath32.com/blog/ziphead.html) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50498295)

---

## 30. How to design your own decentralized messenger protocol — federation, signed servers, and why the "simple" version is already hard

- **Velocity:** ▮ steady
- **Source:** karboosx.net · 63+ pts on HN · 12h ago (~00:03 UTC+8)
- **Tags:** `messaging` `e2ee` `protocol-design` `federation`

A from-scratch walkthrough (karboosx, Nov 14) of building a minimal **federated, end-to-end-encrypted text messenger protocol**: requirements first (server sees only ciphertext, no blind trust in a self-claimed domain, deliberately no attachments, groups, multi-device or read receipts — "Welcome to the 90s!"), then the design decisions one by one — user identity, MX-style server discovery, server-to-server federation where every cross-server request must be signed by a key that provably controls the source domain. The essay's value is its restraint: by refusing every convenience feature, it exposes exactly where the hard problems live before a single line of client code.

**Why it matters:** Reading one protocol designed honestly is the fastest way to understand what Matrix, ActivityPub and friends actually pay for — and a good pre-flight for anyone about to bolt a "simple" chat layer onto an agent system, which is federation plus the hard parts.

[`🔗 karboosx: How to Create Your Own Decentralized Messenger Protocol`](https://karboosx.net/post/5j7jdDM3/how-to-create-your-own-decentralized-messenger-protocol) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50498073)

---

## 31. Will we really put AI data centers in space? A sober feasibility read — and it's priced on Starship

- **Velocity:** ▮ steady
- **Source:** forethought.org · 61+ pts on HN · 10h ago (~02:03 UTC+8)
- **Tags:** `data-centers` `orbital` `starship` `energy`

Forethought's research note (Nov 14) takes Musk's claim — "the lowest-cost place to put AI will be space […] within two years, maybe three" — and does the math instead of the vibe: orbital data centers do have a real energy case (constant high-intensity sunlight in the right orbits, no permitting queues, fewer ongoing environmental harms), but the cost-competitiveness argument "**depends almost entirely on Starship achieving reusability comparable with what SpaceX achieved with Falcon**" — space solar reaches parity with present-day off-grid terrestrial power at roughly **$250/kg to orbit**, and beats any current terrestrial energy source around **$50/kg**. The note is explicitly framed as disentangling "the hype from reality" on a claim that would reshape AI governance if it landed on schedule.

**Why it matters:** This is the right companion read to item 21: today's first ship catch is one data point on exactly the curve this analysis says everything hinges on — and the note's honest-cost framing (launch price per kilogram, not renderings) is how to read every "AI in space" announcement that will now follow.

[`🔗 Forethought: Will we really put data centers in space?`](https://www.forethought.org/research/will-we-really-put-data-centers-in-space) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50498945)

---

## 32. Judge refuses to dismiss the DRAM supply-conspiracy suit — Samsung, SK hynix and Micron will answer for the DDR5 shortage

- **Velocity:** ▮▮▮ trending
- **Source:** litnews.ai · 221+ pts on HN · 10.8h ago (~09:18 UTC+8)
- **Tags:** `dram` `antitrust` `memory-prices` `litigation`

On Nov 14, U.S. District Judge Noël Wise (N.D. Cal.) **denied in full** the joint motion to dismiss a proposed class action accusing Samsung, SK hynix and Micron of conspiring "to cut supply of conventional DRAM, such as DDR5, and shift capacity to HBM" — a Sherman Act §1 claim that survives precisely because this moment is different from DRAM II, the Ninth Circuit's 2022 affirmance dismissing the earlier conspiracy suit against the same three companies. The complaint's supporting allegations are a list of what memory buyers have been living through: long-term HBM lock-ups, refusals of long-term conventional-DRAM contracts, Micron's Crucial brand closure, fab delays, failure to expand capacity despite record prices, near-identical customer vetting, and the companies' prior cartel history. The judge gave no weight to three other plaintiff arguments (investor statements about "supply discipline", industry-conference meetings, and the three-company market structure). Answers are due Dec 7, 2026.

**Why it matters:** This feed has covered the DRAM price spike from the buyer's side all week (RAM Altman, the $80 Raspberry Pi jump); this order is the supply-side story entering court discovery — the allegations the defendants must now answer under oath include refusing long-term contracts and not expanding into record prices. Whether discovery validates them is years away, but the frame is set: conventional-DRAM scarcity as an alleged strategy, not an accident.

[`🔗 LitNews: Judge Refuses to Dismiss DRAM Supply Conspiracy Suit`](https://litnews.ai/articles/garciaguirre-samsung-sk-hynix-micron-dram-conspiracy-suit-survives-dismissal) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50502988)

---

## 33. Modern Web Guidance opens its source: the authoring/eval repo is the day's biggest GitHub gainer at +1,220★

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub Trending · +1,220★ today · 6.6k total
- **Tags:** `modern-web-guidance` `agent-skills` `evals` `governance`

Since we covered Modern Web Guidance v1.0.0 on 2026-11-13 (Chrome, Edge, Firefox and MDN's skill for coding agents): the project's companion **source repository** — `GoogleChrome/modern-web-guidance-src` — is now the day's biggest GitHub Trending gainer (+1,220★ today, 6,555 total), two days after the consumer-repo launch wave. Its README states the split plainly: "This repo is the source repository for GoogleChrome/modern-web-guidance and includes the code and documentation for **authoring, calibrating, and evaluating** its contents." That means the parts the consumer repo hides are now browsable: the eval harness and dashboard behind the guidance claims, `GOVERNANCE.md` for how the cross-vendor stewardship works, and the authoring pipeline that turns web-platform expertise into skill content. Development is active (commits through Nov 14).

**Why it matters:** The feed keeps noting that agent-skills projects live or die on whether their guidance is measured or vibes; publishing the calibration/eval pipeline — with a public dashboard — is the accountability half of that, and it is the part other skill collections (which ship SKILL.md files and a prayer) mostly don't have. The spike suggests the community agrees.

[`🔗 GoogleChrome/modern-web-guidance-src`](https://github.com/GoogleChrome/modern-web-guidance-src) · [`🔗 Eval dashboard`](https://googlechrome.github.io/modern-web-guidance-src/)

---

## 34. EFF: tech companies are trying to shift the entire concept of privacy (again) — 558 points

- **Velocity:** ▮▮ rising
- **Source:** eff.org · 558+ pts on HN · 23.3h ago (~20:45 UTC+8, Nov 14)
- **Tags:** `privacy` `wearables` `always-on-recording` `bystanders`

Thorin Klosowski's EFF essay (Nov 13) argues the privacy industry's oldest move — reframing surveillance as *personal choice* — is being rerun by always-on AI hardware: "Privacy, which companies were once happy to claim was all about personal choice, is now primed to affect everyone around you even more than it already did." The examples are all shipping products, not thought experiments: Meta's and Google's smart glasses recording whatever the wearer looks at, with AI describing it; **Apple's Audio Intelligence** turning every Apple Watch into a device that records or summarizes your day; Amazon's Bee capturing and transcribing everything. The essay's point is structural: when the microphone and camera are worn by someone else, the advice to simply not use the product stops being something you can follow — the bystander has no settings page.

**Why it matters:** This is the general-case version of the ALPR fight already in today's feed (item 23): both are about being recorded by a device you don't control. For anyone building or deploying wearable/ambient AI, the essay is a checklist of the consent model that is about to be litigated — the recording device's owner is not the only party with rights in the room.

[`🔗 EFF: Tech Companies Are Trying to Shift the Entire Concept of Privacy (Again)`](https://www.eff.org/deeplinks/2026/11/tech-companies-are-trying-shift-entire-concept-privacy-again) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50496602)

---

## 35. Claude Code Projects, resurfaced: describe the goal, a coordinator threads the rest — and Boris Cherny answered HN's questions

- **Velocity:** ▮▮ rising
- **Source:** claude.com · 98+ pts on HN · 35.6h ago (~08:28 UTC+8, Nov 14)
- **Tags:** `claude-code` `orchestration` `parallel-agents` `anthropic`

The HN wave this week caught Anthropic's redesigned **Claude Code Projects** — the article itself dates to September 17, but the beta-in-Claude-Code rollout is what got 98 points and 93 comments this weekend. The model: "Claude scopes the request, delegates the work, coordinates parallel threads, reviews the outputs, and assembles the finished result." Two examples from the article: set a goal to cut checkout p75 latency and Claude profiles each endpoint, tests optimizations and opens PRs in parallel threads; connect API, web and mobile repos with a goal to retire a deprecated v1 endpoint, and it creates a thread per repo, migrates callers, runs tests, and tells you which PRs must merge first. Progress is steerable from your phone and work continues after you step away. In the thread, Boris Cherny ("Projects are how I write pretty much all my code these days") answered design questions directly.

**Why it matters:** This is the orchestrator layer arriving inside a mainstream coding harness — the same coordinator-plus-parallel-workers shape the feed has tracked in third-party tools (LoopForge, OpenBot, herdr), now native, with the predictable HN pushback about usage burn: one commenter watched a trivial question spawn seven sub-agents and drain their quota in ten minutes.

[`🔗 Anthropic: Projects redesigned — from folder to conversation`](https://claude.com/resources/articles/projects-redesigned) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50492141)

---

## 36. Microsoft's FORGE Lab finds memory-safety bugs in Rust's standard library — safe Rust hitting undefined behavior, found by an AI scanner

- **Velocity:** ▮▮ rising
- **Source:** forge-blog.github.io · 161+ pts on HN · 54.7h ago (~13:22 UTC+8, Nov 13)
- **Tags:** `rust` `memory-safety` `ai-scanning` `vulnerability-research`

Microsoft's FORGE Lab (Yechan Bae, Nov 9) reports several memory-safety issues in Rust's `std` and `core` — "including cases where code written **entirely in safe Rust** can trigger undefined behavior" — found with **Hyenas**, the lab's AI-powered vulnerability scanner (a research version of codename MDASH), then reproduced and reported with Rust maintainers. The post organizes the bugs into three patterns of misplaced trust in unsafe code: **trusting code not to panic** (invariants broken mid-function when a panic unwinds through), **trusting user-provided implementations to be correct** (a misbehaving comparator or trait impl corrupting unsafe code's assumptions), and **trusting the underlying system**. One concrete case: `join()` — CVE-2020-36323's old fix never covered strings that grow between calls, and in April 2026 the same function needed another fix when the remaining-length calculation underflowed into a heap overflow. Some reports remain open.

**Why it matters:** Two things at once: a taxonomy of where Rust's guarantees actually leak (the boundary isn't FFI — it's panics, trait impls, and OS assumptions), and another data point in the AI-finds-real-vulns series — the scanner found soundness bugs in one of the most-reviewed codebases on earth, and the fixes are landing in the std everyone's containers ship.

[`🔗 FORGE Lab: Memory Safety Bugs in Rust Standard Library`](https://forge-blog.github.io/posts/rust-std-memory-safety/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50478701)

---

## 37. Kiri launches v0.2.1: an Apache-2.0 Docker Desktop alternative claiming 8× faster `docker run` — with the thread's skepticism included

- **Velocity:** ▮▮ rising
- **Source:** Show HN · 59+ pts · 7.4h ago (~12:40 UTC+8)
- **Tags:** `kiri` `containers` `docker` `rust`

Kiri (libracoder/kiri, Rust, Apache-2.0, created Nov 2, 4.7k stars, v0.2.1 released today) is a desktop container runtime for Mac/Windows/Linux that runs Docker containers with one daemon — docker CLI, Compose and the Docker API work unchanged — and claims "docker run takes 22 ms on Kiri and 178 ms on Docker Desktop (152 ms on Colima, 279 ms on OrbStack), every engine on 2 CPUs and 8 GB." Beyond containers it builds and scans images, runs Kubernetes, whole Linux machines, and ships built-in tunneling pitched as a free Ngrok alternative. The HN thread's receipts are worth reading alongside the claims: ~200k lines materialized in about two weeks (with the em-dash tells commenters read as AI-generated), the site's CPU/memory table still says "Measured numbers replace these soon," its Podman-alternative page compares without Podman timings, and the 8× is container *start* latency, not throughput.

**Why it matters:** The Mac container-runtime slot (OrbStack/Colima/Docker Desktop) is genuinely contested and a permissive-licensed Rust entrant with one daemon is a real architecture claim — but this is a 13-day-old project whose headline benchmark is a cold-start number, so file it under "promising, unproven," and wait for the promised measured tables before any switch decision.

[`🔗 libracoder/kiri`](https://github.com/libracoder/kiri) · [`🔗 Kiri site & benchmarks`](https://runkiri.com/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50504077)

---

## 38. Veyra-NRVideo: +731★ for a GPU pipeline that frame-generates your capture card's feed — the GTA6 headline is the marketing

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · +731★ today · 2.6k total
- **Tags:** `veyra` `video-processing` `frame-generation` `upscaling`

Likely7/Veyra-NRVideo (GPL-3.0, C++, created Sep 9, 208 forks) is today's biggest new GitHub Trending entry not yet covered here. The README's own framing is more grounded than its trending hook: "Turn local video, capture cards and game streaming into one real-time GPU enhancement pipeline" — super resolution, denoising, HDR, and frame generation applied in real time on Windows to whatever flows through it, with real-time preview for video files, images and capture-card sources. The clickbait title — "Bring PS5 GTA6 to 120FPS with DLSS 5" — describes enhancing the *captured feed* of a console game with AI upscaling and frame interpolation, not making the game render faster; the creator (@likely2002) drives adoption through YouTube and Bilibili tutorials, in English and Chinese.

**Why it matters:** External frame generation on a captured stream is a real product category now — it trades added latency for smoothness on hardware you can't upgrade (consoles), which is the opposite trade from in-engine DLSS/FSR. A GPL-3.0 implementation going viral is worth a look for anyone building capture-based pipelines, with the standing caveat: interpolated frames are the model's guess, and input latency is where it collects.

[`🔗 Likely7/Veyra-NRVideo`](https://github.com/Likely7/Veyra-NRVideo) · [`🔗 README & tutorials`](https://github.com/Likely7/Veyra-NRVideo#readme)

---

## 39. "Actor, Judge, or Teacher?": a decision model that acts poorly can still teach well — +10 points on ALFWorld by grading, not acting

- **Velocity:** ▮ steady
- **Source:** arXiv 2611.17167 · Hugging Face daily papers (Nov 13)
- **Tags:** `decision-models` `agents` `rl` `research`

A paper topping the Hugging Face daily list (published Nov 12) asks "whether a decision model that acts poorly can still teach well." Decision models — models that answer with typed output plus probabilities, the shape this feed has tracked as Gemini's Decisions API and Flide's serving layer — are usually judged as *actors*. The authors (Haochen Liu et al.) compare three decision models and three general LLMs as actors and judges on ALFWorld, and use JEV as a teacher on ALFWorld and WebShop. The findings are cleanly split: as actors, all six models get lured off a must-come-first subgoal by an easier one; as judges seeing whole trajectories, the same models correctly credit the steps toward that subgoal — and asking whether *each action helped*, rather than whether the task will succeed, separates useful actions from useless ones. As a teacher, JEV lifts a Qwen2.5-1.5B policy over GRPO from **72.8% to 82.9%** on ALFWorld and **56.8% to 71.4%** on WebShop. The interpretation: judging after the episode ends reveals consequences that acting must anticipate. Code is public.

**Why it matters:** It gives the decision-model category a second job with evidence behind it: not just choosing actions but grading them for RL training — where a weak-but-cheap decision model may outperform the big actor it cannot match, because hindsight is the easier inference.

[`🔗 arXiv 2611.17167: Actor, Judge, or Teacher?`](https://arxiv.org/abs/2611.17167) · [`🔗 Code: ZJU-REAL/decision-agents`](https://github.com/ZJU-REAL/decision-agents)

---

## 40. Demystifying phone unlocking tools: Cellebrite-class forensics are "not magic" — a surveillance-research group's technical overview resurfaces

- **Velocity:** ▮ steady
- **Source:** osservatorionessuno.org · 114+ pts on HN · 21.3h ago (~22:44 UTC+8, Nov 14)
- **Tags:** `cellebrite` `forensics` `android` `surveillance**

Osservatorio Nessuno's technical overview (published May 7, fronted HN this weekend at 114 points) takes the mystery out of commercial phone-unlocking tools: "Commercial phone unlocking tools are not magic. They exploit the same classes of vulnerabilities that security researchers publish about at conferences and in academic papers." What makes Cellebrite-class products distinctive is "not the novelty of the techniques, but the systematic commercialization of exploitation" — acquiring or developing exploits for each hardware/software combination and packaging them into automated workflows that require minimal operator expertise. The post maps the constrained attack surfaces an examiner with physical access works through — the boot chain, the trusted execution environment, the secure element, and the kernel's peripheral-driver stack — mostly via Android internals, crediting Quarkslab's TEE research and Amnesty's reporting as foundations.

**Why it matters:** The demystification cuts both ways: it tells defenders exactly which boundaries the forensic industry monetizes (and where the next hardening dollar goes), and it is a rare public mapping of the exploit-supply chain behind the tools that routinely appear in prosecutions — from a group that has documented Cellebrite's routine use in Italy specifically.

[`🔗 Osservatorio Nessuno: Demystifying phone unlocking tools`](https://osservatorionessuno.org/blog/2026/05/demystifying-phone-unlocking-tools-a-technical-overview/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50497416)

---

## 41. A family tree of 104 software job titles, 1940s to "AI Agent / Context Engineer" — built with Claude's help, one Graphviz file

- **Velocity:** ▮ steady
- **Source:** zwischenzugs.com · 340+ pts on HN · 18.3h ago (~01:45 UTC+8)
- **Tags:** `careers` `industry-history` `visualization` `graphviz`

Ian Miell (zwischenzugs) built "this family tree of software job titles, from the 1940s to now" — "with the help of Mr Claude," he notes — after watching his own work be renamed Head of DevOps → SRE → platform engineering over the years. There are **104 titles**, "from 'Computer' (a person, not a machine) at the top to 'AI Agent / Context Engineer' at the bottom," laid out in five-year rows across seven colored family columns (development; analysis, architecture and leadership; operations; networks and security; data and AI; quality and test; support). Solid arrows mean a title grew out of its parent; dashed ones mean influence or a common career move; each node links to a written history. The whole thing is one Graphviz file plus one JSON file of descriptions, rendered as a clickable site.

**Why it matters:** The tree makes the industry's title churn legible as lineages rather than fashion — and its endpoint is this feed's beat: the newest node is the job of writing context for agents, which in 1940 was called "programmer," in 2005 "build engineer," and keeps being the same work under new management.

[`🔗 zwischenzugs: A Family Tree of Software Job Titles`](https://zwischenzugs.com/2026/11/03/a-family-tree-of-software-job-titles/) · [`🔗 Interactive tree`](https://ianmiell.github.io/sw-job-title-family-tree/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50499038)

---

## 42. Apache Shiro ships a 9.1 today: LDAP auth caching accepts any password after the first login — fixed in 3.0.1 since August

- **Velocity:** ▮ steady
- **Source:** CVE-2026-129349 (Apache CNA-assigned) · record published 1.8h ago (~18:16 UTC+8)
- **Tags:** `shiro` `cve` `ldap` `authentication`

**CVE-2026-129349** (CVSS **4.0** 9.1, CNA-assigned by `security@apache.org`; NVD `Received`, published 2026-11-15T10:16:53Z): "When authentication caching is enabled on DefaultLdapRealm, after a user logs in successfully once, subsequent logins for that user succeed with **any password**." The mechanism is exactly what it says: the cached authentication skips the LDAP bind, and the `AllowAllCredentialsMatcher` installed by default in `DefaultLdapRealm` accepts any credentials — so anyone who knows a valid username authenticates as that user. Affected is everything **before 3.0.1**; the catch is timing: 3.0.1 shipped **Aug 23** (3.0.2 followed Nov 8), so the fix has existed for twelve weeks while the record publishing the vulnerability landed only today — and the flaw requires the opt-in authentication-cache setting to be on.

**Why it matters:** Two lessons in one record: caching an authentication decision is only as strong as the matcher you cached it with (a cache hit that skips the bind must not also skip credential verification), and "just released CVE" headlines need the release-timeline check — here the upgrade advice has been sitting in the releases page since August; the *awareness* is what shipped today.

[`🔗 CVE-2026-129349 record`](https://www.cve.org/CVERecord?id=CVE-2026-129349) · [`🔗 Apache Shiro releases (3.0.1 / 3.0.2)`](https://github.com/apache/shiro/releases)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-15T12:24:30Z |
| Items | 42 |
| Sources tracked | 36 (Hacker News, GitHub Trending, Google Research, NVIDIA, PyPI, Project Zero, CBC, Reuters, U-Mich, BBC, EFF, L3Harris, MITRE CVE records, npm, LitNews, Anthropic, Hugging Face, FORGE Lab, Osservatorio Nessuno, vendor blogs and project repos) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[Previous day](2026-11-14.md) · [Raw .md](latest.md) · [Archive](../archive/index.md)
