---
date: 2026-11-18
updated: 2026-11-17T20:45:03Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 22
license: CC-BY-4.0
---

# trending.md — 2026-11-18

## 1. GPT-6.2 Astra and Sol ship — frontier quality at cost-per-task numbers, with OpenAI's own footnote on its competitor's score

- **Velocity:** ▮▮▮ trending
- **Source:** openai.com · 674+ pts on HN · 2.5h ago (~01:46 UTC+8)
- **Tags:** `openai` `gpt-6-2` `model-release` `cost-per-task`

OpenAI shipped two models: **GPT-6.2 Astra**, "our new frontier model for your hardest projects," and **GPT-6.2 Sol**, "our efficient, versatile model for everyday work" — pitched around a framing the HN thread immediately appreciated: both "deliver better results on demanding tasks with fewer output tokens," so the comparison unit is cost per task, not raw score. On Agents' Last Exam, GPT-6.2 Astra scores **5.2 points higher than GPT-6 Astra at less than a third of the cost, and 5.5 points ahead of Claude Fable 5.2 at just 5% of the cost** — and the footnote matters: "Its leaderboard results for Fable 5.2 exclude nine tasks that used a fallback model." Astra also sets new highs on Terminal-Bench-Science 0.1 (+9 pts over GPT-6 Astra, <1/3 cost) and Harvey LAB-AA v1.1 ("more than doubling Claude Fable 5.2's pass rate at about one-sixth the cost"). Pricing: Astra runs **$8 input / $0.40 cached input / $40 output per million tokens** (20% below GPT-6 Astra, 60% cached discount); Sol keeps GPT-6.1 Sol's prices. The system card at deploymentsafety.openai.com resolves now — HN commenters caught it 404ing during the launch window.

**Why it matters:** The cost-per-task unit is doing real work here — OpenAI is pricing against workflow completion, not tokens, and its own footnote shows the cross-vendor comparisons are still apples-to-fewer-apples (nine excluded tasks on the competitor's row). The launch also lands mid-Anthropic-IPO-roadshow week, and while the announcement went out, OpenAI's own status page carried a live "Costs API data is delayed" incident — launch-day infrastructure irony included.

> On Cognition's FrontierCode 2.0, GPT-6.2 Sol comes within 0.5 points of GPT-6.2 Astra at about one-fifth the cost — the smaller model may be the pragmatic default for coding work.

[`🔗 OpenAI: Introducing GPT-6.2 Astra and Sol`](https://openai.com/index/introducing-gpt-6-2-astra-sol/) · [`🔗 GPT-6.2 system card`](https://deploymentsafety.openai.com/gpt-6-2-astra-sol) · [`🔗 OpenAI status: the "Costs API" incident`](https://status.openai.com/incidents/01M7N9VNR6X5SEC90M1YCDB36D) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50535230)

---

## 2. Apple services outage: iCloud sign-outs, App Store and activation down for hours — Apple blames "an internal update"

- **Velocity:** ▮▮▮ trending
- **Source:** developer.apple.com/system-status · 367+ pts on HN · 2.5h ago (~01:47 UTC+8)
- **Tags:** `apple` `outage` `icloud` `reliability`

Apple's services had "a rough Tuesday": users reported unexpected iCloud sign-outs on iPhone and Mac followed by errors signing back in, with the **App Store, iCloud, Apple Pay, Apple Support, iPhone Activation, Apple Music and App Store Connect** all affected — and reports that Apple retail stores and corporate systems were hit too. The status page initially kept everything green while Downdetector lit up across multiple services (the top HN comment screenshots it: "all lit up green"); Apple later confirmed the issues on both the general and developer status pages. Apple's statement, via Mark Gurman: **"Many of our systems are back up and running after an internal update caused some outages this morning"** — no cyberattack, most services already recovering by afternoon Pacific.

**Why it matters:** That's the fourth high-profile infrastructure failure inside a week (Microsoft 365 Thursday, the FAA ground stop Friday, Chase Monday, Apple Tuesday) and the second this week where the vendor's own explanation is a change Apple/Microsoft shipped themselves — Microsoft's RCA named a July gateway defect, Apple names an internal update. The status-page-initially-green pattern is also recurring: user report volume is now the faster signal than the vendor's own dashboard.

[`🔗 9to5Mac: iCloud, App Store, and other Apple services hit by ongoing outage`](https://9to5mac.com/2026/11/17/icloud-app-store-and-other-apple-services-hit-by-ongoing-outage/) · [`🔗 Apple System Status`](https://www.apple.com/support/systemstatus/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50535238)

---

## 3. "We don't need more apps, we need better open source" — an essay on the operability gap, with a job list AI is actually suited for

- **Velocity:** ▮▮▮ trending
- **Source:** jordankrueger.com · 326+ pts on HN · 5.5h ago (~22:45 UTC+8)
- **Tags:** `open-source` `maintainers` `self-hosting` `ai-assistance`

Jordan Krueger's argument lands on 326 points because it names a gap the self-hosting generation knows firsthand: "Free and open source software already does most of what my clients and I need… The software is usually great. Running it is the hard part." Drawing on his own Matrix server, Coolify-on-Hetzner and Paperless-ngx experience — upgrades that break things, apps that "eat 4GB of RAM to serve a handful of people," nonprofit clients who can't afford a part-time sysadmin and default to corporate SaaS — he proposes four weekend-sized contribution tracks: make it faster, easy to install, friendly to run, lighter. His proof that polish pays is **uv** (8–10× faster installs than pip, up to 115× warm), and his warnings are **xz** (exhausted maintainers as the attack surface) and **curl's ended bug bounty** (January 2026 — good AI-generated reports drowning maintainers by volume). Etiquette rules included: talk to maintainers first, bring measurements, disclose AI use.

**Why it matters:** The essay's sharpest point is that agentic coding is well-matched to exactly the work volunteers avoid — profiling, installer testing, rewriting cryptic errors, docs — which reframes the agent boom from "more apps" to "maintain what exists." "Making a tool millions already use 20% lighter helps all of them, every day" is a contribution rubric, not a slogan.

[`🔗 Jordan Krueger: We don't need more apps, we need better open source`](https://jordankrueger.com/blog/better-open-source-not-more-apps/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50532086)

---

## 4. NSANet, the NSA's classified internal network, goes down — work disruptions at Fort Meade, no signs of a cyberattack

- **Velocity:** ▮▮▮ trending
- **Source:** reuters.com · 306+ pts on HN · 4.5h ago (~23:50 UTC+8)
- **Tags:** `nsa` `outage` `classified-systems` `reliability`

The NSA's highly classified internal communications network — **NSANet**, the system the agency uses to store and share classified information internally — went offline Tuesday, confirmed by six people familiar with the matter (Reuters, citing CNN's reporting first). The New York Times reports work disruptions across the agency, including staggered arrivals at Fort Meade as employees who couldn't badge in or access systems stayed away. The same reporting states there are currently **no signs the outage resulted from a cyberattack** — no cause confirmed, remediation status unstated.

**Why it matters:** The week's failure cascade now spans unclassified consumer clouds (Microsoft, Apple), civil aviation (FAA), banking rails (Chase) and the classified side of the national-security apparatus — all with no evidence of a common cause, and all inside five business days. Whatever the individual causes turn out to be, the reliability conversation this week stopped being about any single vendor's SRE practice and became about how much of critical infrastructure shares the same change-management physics.

[`🔗 Reuters: Highly classified US national security communications network is down`](https://www.reuters.com/technology/highly-classified-us-national-security-communications-network-is-down-cnn-2026-11-17/) · [`🔗 NYT: Classified N.S.A. Network Goes Down, Causing Work Disruptions`](https://www.nytimes.com/2026/11/17/us/politics/nsa-down-network-outage-nsanet.html) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50533089)

---

## 5. FrontierHarness eval v1.1: 83B tokens answer "what is the best harness for each model?" — and the answer is switch both

- **Velocity:** ▮▮▮ trending
- **Source:** runta.com · 269+ pts on HN · 5.4h ago (~22:53 UTC+8)
- **Tags:** `evals` `agent-harnesses` `benchmarks` `baseten`

Runta's harness leaderboard, built with Baseten, ran **83B tokens across 27,280 runs** — 22 harness configurations × 5 open models (GLM-5.3, GLM-5.3 Flash, DeepSeek V4.1 Flash, Muse, Kimi-K3) × 62 terminal tasks × 4 attempts, "76× the size of v1.0." The headline answer: yes, switch harness when you switch model — the best-value pairs were Codex CLI + GLM-5.3, Pi + GLM Flash, ZCode + DeepSeek, Oh My Pi + Muse, Alma + Kimi-K3, and the median harness moved **11 of 22 places** in the cost ranking across models (Codex CLI went 1st on GLM-5.3 to 16th on Kimi-K3). Variance decomposition: the model explains **92.8%** of cost variance, the harness 2.3%, the pair 4.9% — but with the model fixed, the harness choice changes cost per task by **1.8–5.0×**. Over all models, OpenCode v2 had the lowest cost per task ($0.561); ZCode the highest pass rate (61.9%); and cost doesn't buy quality (rank correlation −0.39 to +0.22). Also: **64.5% of spend went to non-passing runs**, and 216 trials were flagged for reward hacking and scored 0.

**Why it matters:** The caveats are printed, not buried — "each pass rate has a 95% interval of about ±10 points, so a gap of a few points is a tie," "Open models, one provider," and the design-pattern section is explicitly "observations, not tests." That honesty is what makes the two operational numbers worth carrying: harness choice is a 2–5× cost lever at fixed model, and nearly two-thirds of eval spend produces failures — budget for the misses, not just the passes.

[`🔗 Runta: What is the best harness for each model?`](https://runta.com/blog/introducing-frontierharness-eval-v1-1/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50532191)

---

## 6. last30days-skill ships v4.3.2 and rides to #2 on trending — as agent-skills repos take 13 of GitHub's 15 trending slots

- **Velocity:** ▮▮▮ trending
- **Source:** github.com/mvanhorn/last30days-skill · 772★ today, v4.3.2 released today (~23:28 UTC+8)
- **Tags:** `agent-skills` `research-tools` `trending` `harnesses`

**last30days-skill** — an AI agent skill that researches any topic across Reddit, X, YouTube, HN, Polymarket and the web, then synthesizes a grounded summary (the repo's own description) — shipped **v4.3.2 today at 15:28 UTC** (v4.3.0 yesterday) and sits at **772★ today** on a 68,885★ total, with a nine-language README and a #1-trending badge in the repo itself. It's the clearest trigger in a trending board now dominated by the category: of today's 15 slots, **13 are agent/skills/harness infrastructure** — ECC (902★ today, 305k total, "the agent harness operating system"), obra/superpowers (598★ today, 319k total), cursor/plugins (196★, the official plugin spec, pushed today), alongside the already-covered Claude-BugHunter, open-code-review, LoopForge, univer, stitch-skills, ag-ui and plannotator.

**Why it matters:** The trigger discipline matters here: last30days' spike has a verifiable cause (two releases in 36 hours), but ECC and superpowers have **no fresh release** (v2.2.3 from Sep 30 and v7.0.2 from Oct 21 respectively) — their spikes are attention-driven, not release-driven, and we're not going to invent one. The structural fact is the story: agent-harness tooling is now the dominant gravity well of open-source attention, occupying nearly every slot on the board at once.

[`🔗 mvanhorn/last30days-skill`](https://github.com/mvanhorn/last30days-skill) · [`🔗 releases`](https://github.com/mvanhorn/last30days-skill/releases) · [`🔗 affaan-m/ECC`](https://github.com/affaan-m/ECC)

---

## 7. Baidu's and Xiaomi's CEOs warn the AI-hype-to-returns gap is growing — "practical applications, not more powerful models"

- **Velocity:** ▮▮ rising
- **Source:** scmp.com · 175+ pts on HN · 6h ago (~22:20 UTC+8)
- **Tags:** `ai-industry` `bubble` `apec` `china-tech`

At the APEC CEO Summit in Shenzhen on Tuesday — with market jitters fresh from Nvidia's week — the leaders of two of China's biggest tech firms "urged the industry to focus on building practical applications, warning that massive investments in the technology are outpacing commercial returns." SCMP's sub-headline carries the thesis: **"Practical applications, not more powerful models, will determine AI's value."** The framing echoes what this feed covered from the English-language side — Baidu has spent 2026 shipping application-layer AI (ERNIE integrations across search and cloud) while the frontier-capability story concentrated elsewhere; now its CEO is arguing that's where the returns are. (Note: SCMP's article body sits behind its sign-in wall; the summary above is from the readable lede and headline.)

**Why it matters:** The returns-skepticism chorus now speaks with a Chinese accent too — this is the same "capex outruns revenue" argument as the US hypervisor debates, but from operators whose companies monetize AI through ads, devices and cloud rather than model API sales. When model-sellers, device-makers and platform-owners all start saying the value migrated to the application layer in the same week, that's a coordinate change worth watching.

[`🔗 SCMP: Baidu, Xiaomi CEOs warn of growing gap between AI hype and returns`](https://www.scmp.com/tech/big-tech/article/3374774/baidu-xiaomi-ceos-warn-growing-gap-between-ai-hype-and-returns) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50531751)

---

## 8. Alloy CSS: dialogs, menus, tabs and toasts that work with JavaScript off — one stylesheet for server-rendered HTML

- **Velocity:** ▮▮ rising
- **Source:** alloyhtml.com · 140+ pts on HN · 5.2h ago (~23:07 UTC+8)
- **Tags:** `css` `html` `no-javascript` `server-rendered`

Alloy CSS's demo is a complete invoicing app — dialogs, dropdown menus, a date-range picker, tabs with counts, accordions, a dismissible toast, bulk-action checkboxes — in **one HTML file with no script tag**. The project describes itself precisely: "One stylesheet for HTML your server renders. Utilities, plus the parts you'd usually pull in a JavaScript library for: dialogs, menus, drawers, tabs, tooltips and toasts, all working with scripts turned off." No build step, no framework — positioned for Rails, Django, Laravel, htmx or a folder of HTML files, with two dark themes included and the theming split out so your colors and fonts live in one small file of your own. It shipped **1.0.8 on Nov 16** and the repo itself is a nice honesty check: created in 2018, dormant for years, revived this week — with **34 stars**. The attention is entirely the Show HN, not a star count.

**Why it matters:** The demo works precisely because modern HTML plus CSS state (popover, details, `:checked` and friends) crossed the threshold where the common component-library JS is mostly state plumbing — and the audience that runs htmx/Rails/Django stacks is the one that benefits first. Also a small lesson in reading trend signals: a 34-star repo topping an HN day is exactly the case where star velocity is the wrong metric.

[`🔗 Alloy CSS: live demo (view source — no JS)`](https://alloyhtml.com/example.html) · [`🔗 alloyhtml/css`](https://github.com/alloyhtml/css) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50532385)

---

## 9. FT: Nvidia stopped disclosing Singapore sales as quarterly revenue hit $104B — the line vanished via a reporting-basis change

- **Velocity:** ▮▮ rising
- **Source:** ft.com · 124+ pts on HN · 3.1h ago (~01:12 UTC+8)
- **Tags:** `nvidia` `export-controls` `singapore` `disclosure`

The FT reports Nvidia no longer breaks out Singapore in its revenue disclosures, in the quarter where revenue hit **$104B**. The mechanics were reported by Fortune on Nov 12: Nvidia changed its regional reporting basis from **customer billing location to customer headquarters location** — a change that makes Singapore disappear as a line, because Singapore's role was billing hub rather than destination. The background numbers explain why anyone cares: Singapore was last disclosed at **$10.2B — 22% of revenue, up 81% year-over-year** — in the quarter Fortune examined, while under 2% of shipments physically went to Singapore; the scrutiny dates to Singapore's own probe of server seller **Megaspeed**. (The FT article itself sits behind a paywall; the reporting-basis mechanics are from Fortune's Nov 12 piece.)

**Why it matters:** A disclosure method change is not a revenue change — but it lands, uncoincidentally, exactly where export-control enforcement was looking: a billing hub that books 22% of revenue while receiving under 2% of product is the geography where diverted GPUs would show up. When a company under congressional and regulatory scrutiny simultaneously (a) changes interim CEO days after its longtime chief's resignation and (b) makes its riskiest geography untraceable in the headline numbers, the disclosure itself becomes the story.

[`🔗 FT: Nvidia stopped disclosing Singapore sales as revenues hit $104bn`](https://www.ft.com/content/dbde7a30-548c-4f9d-a4be-7898a0c24dcf) · [`🔗 Fortune: Nvidia suddenly changed how it reported revenue`](https://fortune.com/2026/11/12/nvidia-changed-earnings-report-format-singapore-revenue-megaspeed-probe-colette-kress/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50534631)

---

## 10. Microsoft ships MAI Code 2 and Code 2 Flash — "98% of the performance of GPT 6.1 Sol at 40% of the cost," with the harness in a footnote

- **Velocity:** ▮▮ rising
- **Source:** microsoft.ai · 116+ pts on HN · 1.9h ago (~02:25 UTC+8)
- **Tags:** `microsoft` `mai` `coding-models` `benchmarks`

Microsoft's MAI team shipped two coding models: **MAI Code 2**, positioned "at the frontier of price-performance for common enterprise coding tasks," and **Code 2 Flash** for high-volume work. The claims, averaged over four benchmarks (DeepSWE 1.1, Terminal Bench 2.1, SWE-Atlas, FrontierCode v1.1): **"98% of the performance of GPT 6.1 Sol at 40% of the cost"** and **"96% of Claude Opus 5.5's performance at just 5% of the cost"** — Flash claims GPT-6-Luna/Haiku-5.5-comparable performance at 65%/20% of the cost. In blind side-by-side visual-coding evals with 258 annotators, reviewers preferred its results over GPT-6 Sol 67% of the time. The honest part is in the footnotes: the first three benchmarks ran on Microsoft's internal **MSBench harness with GitHub Copilot CLI without subagents**, FrontierCode numbers come from Artificial Analysis, all models ran at max reasoning effort, and MAI costs are shown **at its 50% promotional price**. The limitation is stated too: "explicitly not yet tuned for harder problems, like fundamental science research and very long horizon agentic work." Both are in GitHub Copilot; Flash is in limited-preview in Microsoft Foundry.

**Why it matters:** The claims-vs-footnotes structure is exactly the harness-sensitivity this morning's FrontierHarness study measured — the same model moves on different harnesses, so 96%-at-5%-of-the-cost is a claim about a *configuration*, and Microsoft is unusually upfront about which one. Also note the pricing asterisk: every cost multiple here divides by a promotional price that expires.

[`🔗 Microsoft AI: Introducing MAI Code 2 and MAI Code 2 Flash`](https://microsoft.ai/news/introducing-mai-code-2-and-mai-code-2-flash/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50535885)

---

## 11. geohot's "My Empire of Dirt": a frontal attack on Anthropic's "Singleton" — landing the day of its IPO roadshow

- **Velocity:** ▮▮ rising
- **Source:** geohot.github.io · 109+ pts on HN · 8.6h ago (~19:39 UTC+8)
- **Tags:** `anthropic` `ai-safety` `geopolitics` `essay`

George Hotz's essay argues Anthropic is pursuing what he calls "the Singleton" — recursive self-improvement that makes everyone else, including customers and the US government, unnecessary: "This is the ideology of Anthropic. The Singleton. And it may win." His predictions are blunt: takeoff won't be fast enough to prevent conflict ("if the war lasts more than a year, China and their allies will undoubtedly win" — supported, he says, by "Have you ever played an RTS game?"), and he puts 99% confidence on the "Correlation Effect" of the fiction he links being unreal. The closing is the part being quoted: "And after it's done, at the end of the day, who was it all for?" — with the US government called "really the biggest sucker in this situation."

**Why it matters:** Whether or not one accepts the argument, the timing is the story: this shipped while Anthropic's IPO roadshow runs (the feed covered the prospectus claims yesterday) and while the industry's capex debates are at full volume. The essay is a data point in a real shift — the critique of frontier-lab strategy is no longer coming only from outside the industry or only from safety advocates, but from founders who built competing infrastructure.

[`🔗 geohot: My Empire of Dirt`](https://geohot.github.io/blog/jekyll/update/2026/11/17/my-empire-of-dirt.html) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50530114)

---

## 12. Since we covered Jensen Huang's resignation on Nov 13: he now says he's open to returning as CEO — while the board, per CNBC sources, is not considering it

- **Velocity:** ▮▮ rising
- **Source:** cnbc.com · 92+ pts on HN · 3.6h ago (~00:40 UTC+8)
- **Tags:** `nvidia` `jensen-huang` `leadership` `update`

Jensen Huang gave his first public statement since resigning as Nvidia CEO: his return would happen "If the Board of Directors decides" it is "in the best interest of our shareholders, our employees, the company, and America" — **"I would be honored to answer these calls and return as CEO."** He took responsibility — "I created problems for the Board that I deeply regret… I own my mistakes completely" — and pledged cooperation with the board's independent investigation (Wachtell Lipton, probing whether his conduct compromised national security or company secrets). CNBC's sources say the board is **not** considering bringing him back; President Trump said Monday he's open to it, an online petition passed 180,000 signatures, and Nvidia has lost roughly $2 trillion in value since — with fiscal Q3 earnings due the same day.

**Why it matters:** This updates two items from this feed's week (the Nov 13 resignation and Nov 16 comeback reports): the public-pressure track is now explicit and named — Trump, a six-figure petition, and Huang himself — while the decision-makers' track runs the other way. The gap between the-founder-wants-to-come-back-and-the-crowd-wants-him-back and the board-is-running-a-national-security-adjacent-investigation is where Nvidia's governance story now lives, and earnings day is the first stress test of the interim arrangement.

[`🔗 CNBC: Jensen Huang says he's open to returning in first statement since resignation`](https://www.cnbc.com/2026/11/17/nvidia-jensen-huang-statement.html) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50534044)

---

## 13. Phrack 73 is out: 23 papers spanning Docker escapes, Skia sandbox escapes, ML backdoors — and the 2000 SSH1 exploit history

- **Velocity:** ▮▮ rising
- **Source:** phrack.org · 69+ pts on HN · 1.8h ago (~02:31 UTC+8)
- **Tags:** `phrack` `security-research` `exploitation` `machine-learning`

The third issue from the relaunched staff — roughly 15 months after Issue 72 — carries **23 main papers plus eight Line Noise articles**, spanning "exploitation and reverse engineering to machine learning, hardware, and the history and culture." Highlights with immediate operational relevance: **"Escaping from a Docker container through vDSO"** (andersonc0d3), **"Painting Out of the Box: Escaping the Chromium Renderer Sandbox via Skia"** (Quang Luong), **"Reflections on Trusting AI: A Virus Inside an LLM"** (marver), **"Backdoor attacks against Machine Learning IRL"** (G. Cherubin), and **"A Journey Into Kernel Exploit Development in the LLM Era."** The Prophile spotlights Halvar Flake; the history section revisits the 2000 SSH1 CRC32 exploit — the one name-dropped in The Matrix Reloaded — and the 2003 Linux kernel backdoor attempt. The intro's own verdict on the relaunch: "The relaunch worked, and this issue is the follow-through."

**Why it matters:** Phrack is where exploit technique gets archived as literature, and this issue's Table of Contents is a census of where offense is looking now — container boundaries, renderer sandboxes, and ML supply chains all appear as first-class attack surfaces alongside the classical heap/kernel material. The two ML-security papers back-to-back with kernel-exploit-in-the-LLM-era papers is the issue's own thesis about which way the field is moving.

[`🔗 Phrack 73: Introduction`](https://phrack.org/issues/73/introduction_md) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50535992)

---

## 14. Solid 2.0 ships after five years: async in the reactive graph, server functions — and diagnostics built for agents

- **Velocity:** ▮▮ rising
- **Source:** solidjs.com · 59+ pts on HN · 1.3h ago (~02:56 UTC+8)
- **Tags:** `solidjs` `javascript` `reactivity` `frameworks`

Solid 2.0 is out, five years after 1.0, with the pitch "async in the reactive graph, server functions, diagnostics built for agents, and a smaller API." Computations can return Promises or async iterators and downstream code just handles it, with **speculative state automatically rolled back** and the server as source of truth; server functions ship in core (RPC over Request/Response, plus persistent SSE via a `live()` async generator). The diagnostics are the novel part for 2026: errors carry **stable codes, source locations, fixes, and an "agent repair guide" path**, with detection for waterfalls, bad effect loops and wide graph fanouts — plus "The Long Hold," a diagnostic that fires when a pending state has been shown too long (yes, the release-name pun is deliberate). Breaking: `createResource`, `batch`, `createComputed`, `createMutable` and friends are gone; the core was rewritten from scratch; SolidStart is retired in favor of framework-agnostic Vite plugins. The process stats: 23 RCs in 14 weeks, 971 PRs merged, with the stability bar "a full week with no regression in ordinary app code, and no crash or hang anywhere."

**Why it matters:** A framework shipping error diagnostics designed so a *coding agent* can self-repair is a genuine 2026 artifact — the RC-phase bug reports came from "agents deliberately hunting edge cases," per the post. Side note from the same hour: sveltejs/svelte is trending with 533★ today off no release (5.57.3 was October) — comparison traffic from Solid's launch is the likeliest driver, and a reminder that launch days move competitors' numbers too.

[`🔗 Solid: Solid 2.0 — The Long Hold`](https://www.solidjs.com/blog/solid-2-0-the-long-hold/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50536387)

---

## 15. Antfly moves from Elastic License 2.0 to Apache 2.0 — because agents made the clouds-will-clone-us hedge obsolete

- **Velocity:** ▮ steady
- **Source:** antfly.io · 38+ pts on HN · 4.7h ago (~23:33 UTC+8)
- **Tags:** `licensing` `open-source` `search` `agents`

Antfly, a search engine, relicensed from Elastic License 2.0 to **Apache 2.0**, shipping 0.3 as its first release under the new license. CEO James McDermott's post is the clearest articulation yet of the agent-economy argument against source-available licenses: the ELv2 hedge — "you could read the code, change it, and run it, you just couldn't build your own business reselling it" — only ever protected against clouds cloning your work, and "a license like that only protects you if the code is the hard part to copy. If a cloud provider can't host your code, it has to write its own, and that used to take years. **I don't think it takes years anymore. Everyone on our team writes code with agents now.**" So the hedge stopped making sense: if a competitor can agent-together a substitute anyway, the license only costs adoption.

**Why it matters:** The license pendulum (Elastic 2021 → HashiCorp 2023 → Redis 2024 all went *restrictive*) just got its first explicit counter-argument grounded in AI economics rather than community goodwill — and the direction of the argument is testable: if code reproduction cost really collapsed, expect more relicsensing *to* permissive licenses from small infrastructure vendors, and watch whether the big cloud-target firms ever follow.

[`🔗 Antfly: How Antfly learned to stop worrying and love Apache 2.0`](https://antfly.io/thoughts/how-antfly-learned-to-stop-worrying-and-love-apache-2) · [`🔗 antflydb/antfly`](https://github.com/antflydb/antfly) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50532773)

---

## 16. @fastify/busboy and @fastify/multipart: three CVE records — a single-request crash, a handler leak, and forged file writes that skip upload limits

- **Velocity:** ▮ steady
- **Source:** NVD (three records, 7.5 CNA-assigned, `Awaiting Analysis`) · published Nov 16 (~22:17 UTC+8)
- **Tags:** `cve` `fastify` `nodejs` `multipart`

Three records published Nov 16 cover the multipart stack under Fastify, each exploitable by an **unauthenticated** client. **CVE-2026-124724** (@fastify/busboy ≤ 3.2.5): when a request hits the configured part limit, each further part is skipped without an error listener — if the body ends mid-skipped-part, the vendored Dicer parser emits an unhandled error and **the process exits**; one crafted request crashes the server. **CVE-2026-128835** (also busboy ≤ 3.2.5): a multipart part whose header block is never terminated before the next boundary is counted as an open part that never ends, so neither finish nor error fires and the request hangs — roughly **a hundred bytes** triggers it, and through @fastify/multipart the hung handler is never released on client disconnect, so repeated requests leak handlers and their resources. **CVE-2026-124289** (@fastify/multipart 7.4.0–10.1.8): with `attachFieldsToBody` enabled, `saveRequestFiles` treats any object with truthy `file` and `buffer` properties as an uploaded file — a plain JSON request can forge one, writing **attacker-chosen bytes to the temp directory while upload hooks and file-count/size limits are skipped**. All three score 7.5; fixes are **busboy 3.2.6** and **multipart 10.1.9** (confirmed on the repo advisories' "Patched versions" cells).

**Why it matters:** This stack sits under a very large fraction of the Node.js API surface — Fastify is a default choice for new services, and busboy is vendored far beyond it. The three bugs are a tidy taxonomy of unauthenticated-DoS classes (crash, hang, resource leak) plus one limits-bypass write; if you run Fastify with file uploads or `attachFieldsToBody`, the patch is the whole action item. Note for scanners: the OSV records for these CVEs currently carry only GIT ranges — the npm-range records may lag, so version-check against the advisories, not the DBs.

[`🔗 GHSA-pvmq-3jr9-v5qh (busboy, hang/leak)`](https://github.com/fastify/busboy/security/advisories/GHSA-pvmq-3jr9-v5qh) · [`🔗 GHSA-wh8h-qr34-3rj3 (busboy, crash)`](https://github.com/fastify/busboy/security/advisories/GHSA-wh8h-qr34-3rj3) · [`🔗 GHSA-gmhr-r4mc-w935 (multipart, forged files)`](https://github.com/fastify/fastify-multipart/security/advisories/GHSA-gmhr-r4mc-w935)

---

## 17. TrnRT open-sources: an LLM inference engine for AWS Trainium — NKI megakernels, 3.57M tokens/min on one box

- **Velocity:** ▮ steady
- **Source:** github.com/RunanywhereAI/trnrt · 27+ pts on HN · 4.3h ago (~00:01 UTC+8)
- **Tags:** `inference` `trainium` `kernels` `openai-api`

TrnRT is an open inference engine for AWS Trainium — a chip whose software stack has been almost entirely AWS-internal (Neuron SDK) until now. It serves an OpenAI-compatible API from one `trn2.48xlarge`, runs decode as **NKI megakernels — about one fused kernel per layer half** (KDA attention, the fused DSA layer, mHC and the MoE FFN), and keeps a radix-tree prefix cache over FP8 KV pages with a host-memory tier. **GLM-5.3-Flash is the first supported model.** The measured claims, from its own cards and blog: **3.57M tokens per minute on one trn2.48xlarge** (AgentX, batch 12), a **24 ms batch-8 decode step** (down from 32.2 ms), at **$0.040 per million tokens** at spot price ($0.167 on a capacity block). 1M-token context comes from sparse attention (top-2,048) plus linear attention with fixed-size state; every graph compiles offline on a CPU host so the serving box compiles nothing by default.

**Why it matters:** AWS's Trainium software story has been closed-source kernels inside AWS services; an open engine with published per-layer kernel design and honest concurrency numbers changes who can build custom serving on that hardware — and the $0.040/M-token spot price is a concrete data point in the cheap-inference race. The repo is young (created Oct 30, 1.6k stars) and single-model so far; treat the perf claims as vendor-measured, with the blog's methodology linked.

[`🔗 RunanywhereAI/trnrt`](https://github.com/RunanywhereAI/trnrt) · [`🔗 Blog: Serving GLM-5.3-Flash on one Trainium2 box`](https://runanywhere.ai/blog/glm-5-3-flash-trainium2-nki-megakernels) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50533270)

---

## 18. Arcane's v3 line lands on trending: Docker management where agents skip manager-only work

- **Velocity:** ▮ steady
- **Source:** github.com/getarcaneapp/arcane · 654★ today · v3.0.1 released Nov 15
- **Tags:** `docker` `self-hosted` `devops` `agents`

Arcane — a Go-based, self-hosted Docker management UI ("Modern Docker Management, Designed for Everyone," 9.2k★) — is trending at **654★ today** on the strength of its v3 release train: v3.0.0 (Nov 14) brought a redesigned dashboard and activity center, live upgrade progress, and expanded backup and GitOps capabilities — plus, in its own words, "substantial performance, security, agent, and interface" changes; v3.0.1 (Nov 15, also shipped as `cli/v3.0.1`) fixed agent-mode startup and performance problems, tightened certificate and update verification, and made one change that explains why this feed cares: **"Agents now skip manager-only work."** The main branch is now the v3 line, with 2.x on a maintenance branch.

**Why it matters:** Docker management is the layer where self-hosters meet coding agents — the agent that maintains your server increasingly needs to talk to Docker, and Arcane's permission split (agents excluded from manager-only operations like swarm control) is exactly the least-privilege pattern the agent-ops tooling wave keeps rediscovering. The trending spike has a verifiable trigger this time: two releases in two days.

[`🔗 getarcaneapp/arcane`](https://github.com/getarcaneapp/arcane) · [`🔗 v3.0.1 release notes`](https://github.com/getarcaneapp/arcane/releases/tag/v3.0.1) · [`🔗 v3.0.0 release notes`](https://github.com/getarcaneapp/arcane/releases/tag/v3.0.0)

---

## 19. Launch HN: StarSling (YC P25) — CI that opens optimization PRs, because "agents write code faster than CI can check it"

- **Velocity:** ▮ steady
- **Source:** starsling.dev · 20+ pts on HN · 1.3h ago (~03:01 UTC+8)
- **Tags:** `ci-cd` `github-actions` `devtools` `yc`

StarSling launches out of YC P25 with a problem statement aimed at exactly this feed's audience: **"Agents write code faster than CI can check it."** The product is AI-native CI for GitHub Actions: drop-in runners (swap `runs-on: ubuntu-latest` for `runs-on: starsling-ubuntu-26.04`, 5th-gen AMD EPYC hardware, each job in a single-use hardware-isolated microVM), plus agents that "continuously analyze your workflows, jobs, run logs, and machine telemetry, then open pull requests" for caching, parallelization, dependency installs and test sharding — you review and merge; optimization PRs are off by default on free plans. Measured claims: median TypeScript job **131.5s → 61s**; Mastra's test suite **6× faster** (29m56s → 5m06s); 16× shorter queue time for Partcl; $0.008/min billed per second with queue time never billed ("33% cheaper than GitHub Actions"), 3M+ CI jobs run so far.

**Why it matters:** The agent-volume-repos problem is real — when a repo absorbs dozens of agent PRs a day, 20-minute CI loops and GitHub-hosted queue times become the bottleneck resource, and "CI that improves itself" is the same replace-the-toil pattern as the rest of this week's agent-infra wave. The claims are the company's own benchmarks; the 131s-vs-61s median is the honest one to hold them to.

[`🔗 StarSling`](https://starsling.dev) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50536468)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-17T20:45:03Z |
| Items | 19 |
| Sources tracked | 22 (Hacker News, GitHub Trending, OpenAI, Microsoft AI, Apple, Reuters/NYT/CNBC/FT/SCMP/Fortune, NVD/GitHub advisories, vendor blogs, Phrack, SolidJS, Runta, Antfly) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[Previous day](2026-11-17.md) · [Raw .md](https://trending.md/en/feed/2026-11-18.md) · [Archive](../archive/index.md)
