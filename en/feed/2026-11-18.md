---
date: 2026-11-18
updated: 2026-11-18T04:42:08Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 34
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

Alloy CSS's demo is a complete invoicing app — dialogs, dropdown menus, a date-range picker, tabs with counts, accordions, a dismissible toast, bulk-action checkboxes — in **one HTML file with no script tag**. The project describes itself precisely: "One stylesheet for HTML your server renders. Utilities, plus the parts you'd usually pull in a JavaScript library for: dialogs, menus, drawers, tabs, tooltips and toasts, all working with scripts turned off." No build step, no framework — positioned for Rails, Django, Laravel, htmx or a folder of HTML files, with two dark themes included and the theming split out so your colors and fonts live in one small file of your own. It shipped **1.0.8 on Nov 16** and the repo itself is a nice honesty check: created in 2018, dormant for years, revived this week — with **34 stars** at writing (**54** by the 12:42 run, as the HN thread ran — the reading dated because it will keep moving). The attention is entirely the Show HN, not a star count.

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

## 20. Java4Shell (CVE-2026-114938): pre-auth RCE in OpenJDK's JIT Base64 intrinsic — found "in an hour" with AI, patched the same day

- **Velocity:** ▮▮▮ trending
- **Source:** calif.io · 626+ pts on HN · 7h ago (~05:11 UTC+8)
- **Tags:** `cve` `openjdk` `rce` `jit`

Calif disclosed **Java4Shell**, a memory-corruption bug in OpenJDK's AVX-512 Base64 intrinsic: "The x86-64 Base64 intrinsic miscalculated the padded tail's store mask, causing an out-of-bounds write" — a 65-character input (64 `A`s + `=`) overflows a 50-byte buffer by 62 bytes. It "affects OpenJDK from version 17.0.6 or newer" (Oracle's own record lists affected Java SE builds 8u511b33-perf, 17.0.21.0.3, 21.0.13.0.3, 25.0.5.0.3, 27.0.1.0.3), and only x86-64 CPUs with AVX-512 VBMI — ARM64 is unaffected. The impact demos are the alarming part: **pre-auth RCE in Keycloak, Jira, Confluence, JFrog Artifactory, Jenkins and PingFederate**, post-auth RCE in Kafka, Solr, Elasticsearch, Gerrit and Spinnaker, a Heartbleed-style heap leak dubbed **JavaBleed**, and a client-side variant via a malicious TLS server. Oracle shipped patches at 1:00pm PT Nov 17; until you can upgrade, the mitigations are `-XX:-UseBASE64Intrinsics` or `-XX:UseAVX=2`. Score provenance: NVD's record (`Received`, published 22:18Z) carries Oracle's CNA score — CVSS 3.1 **8.1** (AV:N/AC:H) — while Calif's write-up computes **9.2 CRITICAL under CVSS 4.0**; product-specific weaponized exploits are being withheld "until everyone has had a chance to upgrade."

**Why it matters:** The discovery economics are the story inside the story — Calif says it took Quang Luong "an hour to discover the vulnerability, and two more hours to develop the first working exploit," with "the total token cost… less than $200," continuing their PHP2Shell/Squidbleed line of AI-assisted parser and JIT work. The finding is independently corroborated by JFrog, Horizon3.ai and Red Hat (RHSB-2026-018). Oracle's AC:H says the exploit friction is real (ASLR bypass + heap feng shui + bespoke per-target chains — "not a universal point-and-shoot"), but every JVM service that decodes Base64 — which is nearly all of them — carries the code path.

[`🔗 Calif: Java4Shell`](https://calif.io/java4shell/) · [`🔗 JFrog: What we know`](https://research.jfrog.com/post/java4shell-vulnerability) · [`🔗 Red Hat RHSB-2026-018`](https://access.redhat.com/security/vulnerabilities/RHSB-2026-018) · [`🔗 NVD: CVE-2026-114938`](https://nvd.nist.gov/view/vuln/detail?vulnId=CVE-2026-114938) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50538240)

---

## 21. Quad9 pulls its free DNS resolver out of France rather than pay daily blocking fines — Cloudflare: "a canary in the coal mine"

- **Velocity:** ▮▮ rising
- **Source:** blog.cloudflare.com · 356+ pts on HN · 6h ago (~06:13 UTC+8)
- **Tags:** `dns` `policy` `france` `blocking`

Quad9, the Swiss nonprofit behind 9.9.9.9, is withdrawing its resolver from France entirely after months of litigation ended in a court order imposing **daily financial penalties** for failing to block copyright-infringing domains. As a pure public resolver — unlike Cloudflare, which could demonstrate compliance through its CDN and proxy services — it had no alternative compliance path: a choice between "crippling litigation and penalties" or fundamentally changing a privacy-protecting service. The precedent lattice around it matters: a Brussels court has ordered **Cloudflare, Google and Cisco** to block via public resolvers by early January 2027 (all three appealing); German courts previously rejected DNS-blocking demands; Cisco already pulled OpenDNS from France, Portugal and Belgium. Cloudflare's argument: resolver-level blocking is ineffective (switching takes under a minute), blunt (whole domains, legal content included), and opaque — hospitals, universities and government bodies may find "their Internet will fail with no explanation" — and because resolvers are global, one country "could dictate what content is accessible around the world." Its proposed alternative: enforce at the hosting-provider level, where the infringing files actually live.

**Why it matters:** The first public-resolver exit driven by daily-fine litigation is a template any jurisdiction can copy — and the Belgian January 2027 deadline is the next checkpoint. If the appeals fail, resolver-level blocking stops being a French exception and becomes EU practice, with every privacy-forward resolver facing the same Quad9 choice: comply, geo-exit, or litigate.

[`🔗 Cloudflare: Quad9's withdrawal from France`](https://blog.cloudflare.com/quad9-withdrawal-from-france/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50538994)

---

## 22. jQuery 4.1.0 and 3.8.0 ship together — "passing the torch": 3.x gets its final feature release, both lines get a ReDoS fix

- **Velocity:** ▮▮ rising
- **Source:** blog.jquery.com · 269+ pts on HN · 8.5h ago (~03:50 UTC+8)
- **Tags:** `jquery` `javascript` `release` `redos`

jQuery released two versions at once: **4.1.0**, the first minor of the 4.x line, and **3.8.0** — "a send-off, not a comeback," the last planned feature release on 3.x, which now receives only "critical security and bug fixes." Both carry a **ReDoS fix in selector identifier matching** (catastrophic backtracking could hang pages) and a new object-based AJAX transport complete-callback API. 4.1.0 adds `jqXHR.responseURL` (issue #4339, finally), moves the selector engine entirely to `querySelectorAll`, fixes XML-document handling via `createElementNS`, handles form-associated custom elements in `.serialize()`, cuts `uniqueSort` from O(N²) to O(N), and works around a **Safari 27 regex interpreter bug**. 3.8.0 gets `hidden="until-found"` support and formal deprecations (`push`/`sort`/`splice` on the prototype, `jQuery.expr.filters`). The same release cycle added "guidelines for machine-generated contributions" to the repo.

**Why it matters:** This is the dated milestone the enormous 3.x installed base can act on: the torch is now formally with 4.x, the upgrade guide and Migrate plugin are the path, and the security fix landing on both branches is the reason even version-pinned sites should move. A two-decade-old library quietly shipping agent-contribution guidelines in the same breath is its own 2026 artifact.

[`🔗 jQuery blog: 4.1.0 and 3.8.0 released`](https://blog.jquery.com/2026/11/17/jquery-4-1-0-and-3-8-0-released-passing-the-torch/) · [`🔗 4.1.0 release notes`](https://github.com/jquery/jquery/releases/tag/4.1.0) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50537156)

---

## 23. Microsoft's ONNX Runtime has vanished from GitHub — repo, releases feed and API all 404, PyPI still serves 1.32.0, no explanation yet

- **Velocity:** ▮▮ rising
- **Source:** github.com/microsoft/onnxruntime · 175+ pts on HN · 5h ago (~07:18 UTC+8)
- **Tags:** `onnx` `supply-chain` `github` `inference`

microsoft/onnxruntime — the inference engine under a large share of local and edge AI — went dark overnight: as of **04:16 UTC Nov 18** the repo page, its `releases.atom` feed and the GitHub API all return **404**, with no advance notice and no official statement. HN commenters report downstream breakage ("we found out about this this morning, when evals started failing in our pipelines") and describe it as "a repository with 22k stars" going dark. What's verified: **PyPI still serves `onnxruntime` 1.32.0** — a release that predates the disappearance — and the closest public fork is **intel/onnxruntime** (carrying Intel's OpenVINO modifications). What isn't: the cause. Thread speculation ranges from a security takedown to an org restructuring; one commenter linked an unrelated PyPI-compromise writeup — none of it confirmed.

**Why it matters:** A vanished upstream is an operational event even when the packages still install — anyone building from source, filing issues, or assuming the repo's existence in CI just lost it silently, and the "vendor everything" habit gets another data point. Date-stamped honestly: this is a developing story; if the repo reappears under a new path, the disappearance was a rename — until someone says so, "gone without explanation" is the accurate state.

[`🔗 github.com/microsoft/onnxruntime (currently 404)`](https://github.com/microsoft/onnxruntime) · [`🔗 intel/onnxruntime fork`](https://github.com/intel/onnxruntime) · [`🔗 PyPI: onnxruntime 1.32.0`](https://pypi.org/project/onnxruntime/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50539610)

---

## 24. ID.me is now the only sign-in for TreasuryDirect, with arbitration terms attached — and senators are asking why not Login.gov

- **Velocity:** ▮▮ rising
- **Source:** consumerrights.wiki · 182+ pts on HN · 3.5h ago (~08:51 UTC+8)
- **Tags:** `privacy` `identity` `irs` `policy`

ID.me's newest terms sharpen a running privacy fight: v10.1.0 (dated Nov 13, 2026) keeps the binding-arbitration clause and class-action waiver (a 30-day email opt-out window is the new part), and privacy policy v7.1.8 (Nov 2) states that by using the platform you agree ID.me "determines how personal information may be used" for your wallet. Verification history is retained up to three years after account closure; biometric-deletion requests can face an internal review where ID.me "reserves the right to decline"; liability is capped at $1,000. The access change is the sharp edge: **TreasuryDirect made ID.me available Sept 13 and replaced its traditional login Oct 28 — and Login.gov "cannot be used to log in to your TreasuryDirect account"** — despite an OMB memo (M-26-18, Aug 31) requiring agencies to promote Login.gov as the default where it can serve users, and a Wyden/Warren letter (Oct 27) citing 6 U.S.C. §1523(b)(1)(D), the statute naming GSA's platform. ID.me's five-year agreement has a ceiling above $1 billion (~$93M obligated so far). For 2027 filing the IRS says "Taxpayers can use Login.gov or ID.me" — TreasuryDirect users have no such choice, and Direct Pay remains the no-sign-in fallback.

**Why it matters:** The government-run identity option exists, is statutorily preferred, and the savings-bond portal still routes everyone through a private provider whose terms bundle arbitration and data-use consent — with the memos, statute and senator letters now public. For anyone building IRS/Treasury integrations, the operational fact is the asymmetry: two providers for the IRS, exactly one for TreasuryDirect.

[`🔗 Consumer Rights Wiki: ID.me terms required for IRS sign-in`](https://consumerrights.wiki/w/ID.me_terms_required_for_IRS_sign-in) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50540437)

---

## 25. Since we covered the Apple Support Community's Nov 20 closure on Nov 12: Archive Team is racing to preserve it — in eight languages

- **Velocity:** ▮ steady
- **Source:** wiki.archiveteam.org · 113+ pts on HN · 4.8h ago (~07:32 UTC+8)
- **Tags:** `archival` `apple` `preservation` `community`

Update on a story this feed flagged on Nov 12: Apple announced Nov 10 that "The Apple Support Community will permanently close on November 20, 2026" (read-only since the announcement), and Archive Team has stood up a full preservation project against the Friday deadline. It's a DPoS effort — run the ArchiveTeam Warrior and it grabs automatically — with the `applediscussions-grab` scripts, an item tracker at tracker.archiveteam.org/applediscussions, and coordination in #badapple on hackint. The target isn't just the English site: **seven regional communities** (French, Chinese, Japanese, Korean, German, Spanish, Portuguese) are in scope. Progress is listed as "In progress…" with no completion numbers on the wiki.

**Why it matters:** Two decades of troubleshooting answers — including workarounds for problems Apple no longer documents — expire in two days, and the eight-language scope means the non-English archives are disappearing too. The platform-closure-to-volunteer-swarm response time is now measured in days; if you've ever benefited from a decade-old thread, running a warrior this week is the one-command way to pay it back.

[`🔗 Archive Team wiki: Apple Discussions`](https://wiki.archiveteam.org/index.php/Apple_Discussions) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50539747)

---

## 26. "Not Everything Needs an LLM": PostHog's production ledger for decision models — 98.7% of PII checks never reach the big model, failures included

- **Velocity:** ▮ steady
- **Source:** newsletter.posthog.com · 113+ pts on HN · 10h ago (~02:16 UTC+8)
- **Tags:** `decision-models` `llm` `engineering` `routing`

The decision-model category got four vendor launches in a week (Google's Decisions API Nov 12, Perplexity Decider Nov 14, HeyGen Decision 1 yesterday); PostHog's essay is the practitioner's counterweight — real numbers from their own stack. Replay Vision's PII scrub asks two narrow yes/no questions instead of one broad one (false flags dropped to ~a tenth), and **98.7% of session summaries skip the LLM call entirely**. The Slack bot routes via a choice question ("cheapest option that will most likely finish the task correctly on the first try"); search reranks embedding candidates by probability (~+25% ranking quality on 20 test queries); a SQL chart picker replaced hand-written deterministic rules. The failures are printed, which is what makes it credible: thresholds encode mistake costs (0.4 for PII — false negatives leak data; 0.85 for the bot — false positives annoy), one ranking job with 12–38k-token requests "flooded the model server and blocked other products' calls for hours," and PR-review ranking simply failed (AUC 0.52).

**Why it matters:** The category now has its field manual: typed decisions as a gating/routing layer under LLMs, with calibration as the actual engineering work. "Too simple for a language model, yet too fuzzy for a regex" is a real product boundary, and the 98.7% bypass number is the concrete version of the cost argument every vendor launch this week implied.

[`🔗 PostHog: Not Everything Needs an LLM`](https://newsletter.posthog.com/p/decision-models) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50535740)

---

## 27. Harvard firm-level study (Nov 14 revision): agents lift code output up to 76% while final output rises just 9–11% — code review is the bottleneck, +56% submission-to-approval

- **Velocity:** ▮ steady
- **Source:** complexdiscovery.com · 89+ pts on HN · 7h ago (~05:16 UTC+8)
- **Tags:** `research` `ai-coding` `economics` `code-review`

*Corrected 2026-11-18 13:10 UTC+8: this item originally quoted an earlier revision of the paper (flat resolved-issues, +3.45 days to merge, 718 firms/725,938 workers). The current version — Nov 14, 2026, first-hand — supersedes those figures; none of them appear in its text. The direction (output up, review bottlenecked) holds and is stronger.*

A Harvard job-market paper (Fiona Chen & James Stratton, "Artificial Intelligence in the Firm: Bottlenecks in Software Production," current version **Nov 14, 2026**; first draft Jan 7, 2026) runs staggered adoption over **655 firms employing 720,542 workers** — **445M work events** (GitHub coding activity, Jira issues, Google Calendar) from the Jellyfish engineering-analytics platform, Jan 2021–Aug 2026 — and estimates AI **assistants** and AI **agents** separately. The shape: median-firm lines of code per worker-month rise **+42%** after assistant adoption (3,115 → 4,424) and **+76%** after agent adoption (3,679 → 6,482); commits +14%/+23%, PRs +15%/+32% — while **resolved Jira issues rise just +9% (2.53 → 2.76) and +11% (2.76 → 3.08)**, epics barely move. The review stage is where it lands: after agent adoption, average time from review submission to approval **+56.1%**, decomposing into backlog wait **+1.67 days (59.9% of a 2.78-day baseline)** and active review **+2.33 days (58.5% of 3.98 days)**, with comments per code change **+38.6%** — assistants show no significant effects on these margins. AI review tools haven't rescued it: **79.1%** of firms had used AI in code review by July 2026, but only **23.3%** of review comments are AI-generated (10.8% of PRs get ≥1 AI comment) — "humans are still heavily involved with review." Caveats are disclosed: a working paper with no completed peer review, and Jellyfish's commercial stake (the authors thank the Jellyfish team in the acknowledgments).

**Why it matters:** When leading indicators outrun the shipping metric, the constraint has a name and a number: review throughput — approval time +56%, comments per change +38.6%, while resolved issues move single digits. For tool builders that's the addressable market; for teams, it says agent adoption without review-capacity planning converts velocity into queue time.

[`🔗 ComplexDiscovery: Harvard researchers find AI coding agents shifted the bottleneck to code review`](https://complexdiscovery.com/harvard-researchers-find-ai-coding-agents-shifted-the-bottleneck-to-code-review/) · [`🔗 Working paper (PDF, first-hand Nov 14 text)`](https://fion.ac/jellyfish.pdf) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50538303)

---

## 28. A 1-megaton detonation at 500 km would disable ~98% of modeled LEO satellites within a week — and tripling radiation tolerance buys only days

- **Velocity:** ▮ steady
- **Source:** arxiv.org · 88+ pts on HN · 8.6h ago (~03:46 UTC+8)
- **Tags:** `arxiv` `space` `satellites` `research`

An arXiv paper (2611.09827, submitted Nov 6 by Petersen, Qin, Thiele & Philippe) couples prompt radiation, electron trapping and belt evolution to satellite failures, collisions and atmospheric drag for a nuclear detonation in low Earth orbit — where 13,000+ satellites now operate. Central case: a 1-Mt burst at 500 km over the South Atlantic creates an artificial radiation belt whose repeated exposure "disables approximately 98% of modeled satellites within one week in our central case." The hardening math is the bleak part: "**Tripling the assumed radiation tolerance delays widespread failure by only days: approximately 97% are still disabled within two weeks.**" Lost maneuverability then compounds into collision risk — ~20 collisions expected within two years as disabled satellites drift.

**Why it matters:** It's a model, not a test — the authors print "in our central case," and the assumptions are the debate. But the directional finding is stark: spacecraft-grade hardening barely moves the outcome, which locates the vulnerability in the orbital-shell architecture itself rather than in any single satellite's shielding — a quantified footnote to why the 1967 Outer Space Treaty bans nuclear detonations in space even for powers that might accept the blast damage.

[`🔗 arXiv 2611.09827`](https://arxiv.org/abs/2611.09827) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50537120)

---

## 29. Tencent ships Hy4 Flash: 224B-total/12B-active, 1M context, $0.07/$0.28 per M tokens — the cheap tier becomes a benchmark fight

- **Velocity:** ▮ steady
- **Source:** hy.tencent.ai · 78+ pts on HN · 7.3h ago (~05:06 UTC+8)
- **Tags:** `tencent` `model-release` `inference` `efficiency`

Tencent's Hunyuan line shipped **Hy4 flash** (posted Nov 16, hitting HN now): 224B total parameters including 64B "Engram" parameters with just **12B active per token**, natively multimodal, 1M-token context. The efficiency stack: hybrid attention + LatentMoE + Engram shrink KV cache to **1/24 of Hy3 and 1/6 of Hy4**; self-distillation from Hy4 plus reinforcement learning that "cuts average end-to-end output tokens by 50%"; megakernels with 4-bit quantization push decode past 150 tok/s. Pricing is the headline: **$0.003 cached / $0.070 input / $0.281 output per million tokens** (Hy4: $0.042/$0.834/$2.501). The claims lean on Tencent's own WorkIndex benchmark ("grounded in typical WorkBuddy tasks" — slide/doc/spreadsheet work across 8 eval sets): average cost per task "just 1/13 of Hy4 preview, 1/20 of Hy4, and 1/8 of DeepSeek-V4.1-Flash-1017 (Max tier, peak-hour pricing)," with a blind eval of 85 internal users across 259 tasks rating satisfaction "close to Claude Haiku 5.5." HN commenters report solid results via OpenRouter, and one data-analytics benchmark where it beat GPT-6 Luna on the cheap tier ($0.13 to answer 43 questions, against ~$20 on frontier models). A weights-opening commitment is reported in the thread; that sentence isn't in the reader-readable text (the page is a JS shell), so treat it as unconfirmed until it's posted somewhere greppable.

**Why it matters:** The workhorse tier is where the price war actually bites — this lands at roughly a quarter of Hy4's output price while claiming slightly-above-Hy4-preview task quality, keeping the flash-tier pattern (GLM-5.3-Flash, DeepSeek V4.1 Flash, Qwen flash) competitive on three continents. Caveat carried: WorkIndex is Tencent's internal benchmark, so the cost-per-task ratios are vendor-measured.

[`🔗 Tencent: Introducing Hy4 flash`](https://hy.tencent.ai/research/hy4-flash) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50538184)

---

## 30. Cerebras disaggregates inference: AMD GPUs handle prefill, wafers handle decode — claiming 5× tokens per megawatt on one measured endpoint

- **Velocity:** ▮ steady
- **Source:** cerebras.ai · 42+ pts on HN · 3.5h ago (~08:56 UTC+8)
- **Tags:** `inference` `cerebras` `gpu` `efficiency`

Cerebras launched disaggregated inference: **AMD Instinct GPUs process prompts, and Cerebras CS-3 systems generate responses** — splitting the pipeline at the prefill/decode boundary because decode is autoregressive and memory-bandwidth-bound, which is where the wafer-scale engine's SRAM-centric design (claimed "350× the SRAM capacity and 5,400× the memory bandwidth of a typical GB300 GPU") has its structural edge. The measured claim: "5X the throughput per megawatt of a CS-3-only configuration, with no loss in token generation speed" — from a single shared **GPT-OSS-120B endpoint on November 14**, one model, one day, normalized to 1×. Early-access partners named: AWS, Fireworks AI, Gimlet Labs, General Compute. Broad rollout across "hundreds of megawatts" of Cerebras cloud and partner sites is targeted for end of 2027, alongside a planned 700MW of data-center capacity.

**Why it matters:** Prefill/decode disaggregation is already standard practice inside the GPU ecosystem — what's new is pointing the decode half at non-GPU silicon and pricing it in megawatts. The caveat is doing real work: 5× is one endpoint, one model, vendor-measured. If it generalizes, it changes the power math every 2027 datacenter plan is built on; if it doesn't, it's a launch-day slide. Both outcomes are live.

[`🔗 Cerebras: Disaggregated Inference`](https://www.cerebras.ai/blog/cerebras-launches-disaggregated-inference) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50540472)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-18T04:42:08Z |
| Items | 30 |
| Sources tracked | 34 (Hacker News, GitHub Trending, OpenAI, Microsoft AI, Apple, Reuters/NYT/CNBC/FT/SCMP/Fortune, NVD/GitHub advisories, vendor blogs, Phrack, SolidJS, Runta, Antfly, Calif, JFrog, Red Hat, Cloudflare, jQuery, Archive Team, PostHog, ComplexDiscovery/Harvard, arXiv, Tencent Hunyuan, Cerebras) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[Previous day](2026-11-17.md) · [Raw .md](https://trending.md/en/feed/2026-11-18.md) · [Archive](../archive/index.md)
