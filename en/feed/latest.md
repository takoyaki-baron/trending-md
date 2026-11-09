---
date: 2026-11-10
updated: 2026-11-09T20:29:21Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 28
license: CC-BY-4.0
---

# trending.md — 2026-11-10

## 1. Claude Fable 5.2 and Mythos 5.2 ship at a lower price — and the benchmark table is not a clean sweep

- **Velocity:** ▮▮▮ trending
- **Source:** Anthropic · 504 pts on HN · Nov 10 (~02:56 UTC+8)
- **Tags:** `anthropic` `model-release` `benchmarks`

Anthropic released **Claude Fable 5.2 and Claude Mythos 5.2** on Nov 9 — "the same underlying model", split by safeguards: Fable carries the cybersecurity and biology filters and is available to everyone, while Mythos is gated behind the Cyber and Life Sciences Verification Programs. Output is "up to 30% faster" than 5.1 at **$8 per million input tokens and $40 per million output**, with an optional fast mode that takes generation "up to 2.5 times" faster for $16/$80. On **FrontierCode 2.0** the model reaches **49.1% at Xhigh effort**, which the post calls "the highest score of any released model we've tested"; at High effort it lands at **45.3%** against Opus 5.5's **45.5%** "for roughly half the cost per task". But the same table has rows that go the other way: **AutomationBench 51.4** against Gemini 4 Carbon's **53.9**, and **AA-Briefcase 1785 Elo** against **Opus 5.5 at 1800** — the model that Anthropic still recommends starting with.

**Why it matters:** Read the footnotes before the headline numbers. Footnote 3 says the cyber and biology results were run on **Mythos 5.2** precisely because "testing the model with reduced safeguards provides the most comprehensive look at model behavior" — so the CyScenarioBench 76.3 and CVE-rediscovery 89.6 rows are not Fable numbers. Footnote 4 is blunter: "None of the external organizations reviewed the contents of this blog post or the contents of the System Card. Those organizations do not necessarily agree with any of the claims made in either publication." The Vercel, Shopify, Uber and Oracle quotes on the page are enthusiasm, not endorsement; and the Computer-use row is labelled "OSWorld 2.1 (offline set, partial)".

> "Over 90% of the changes merged into Anthropic's core codebase are now written by Claude (with human guidance)."

[`🔗 Claude Fable 5.2 and Mythos 5.2`](https://www.anthropic.com/claude-fable-and-mythos-5-2) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50429906)

---

## 2. Meta's Muse Ember matches Haiku 5.5 on the Intelligence Index at a third of the cost — by declining to answer 64% of questions

- **Velocity:** ▮▮▮ trending
- **Source:** Artificial Analysis · 118 pts on HN · Nov 10 (~01:58 UTC+8)
- **Tags:** `meta` `small-models` `benchmarks`

Meta Superintelligence Labs released **Muse Ember**, its lightest model, priced at **$0.10 per million input tokens, $0.004 cached, $0.50 output**. Artificial Analysis measured it at **36 on the Intelligence Index at $0.14 per task** — the same score as **Claude Haiku 5.5 (max) at $0.41** — and eight points behind Meta's own **Muse Wonder (44, at $6.95 per task)**. The wins are real but narrow: **AutomationBench-AA 68.1%**, level with Muse Wonder; **Terminal-Bench 4.0 40.9%** against Haiku's 32.8%; and **46 on the Coding Agent Index inside Meta's own Muse Code**, against 37 for Haiku in Claude Code. The losses are equally specific: **FrontierCode 2.0 27.2% vs 34.9%**, and **AA-Briefcase 1521 vs 1574 Elo**.

**Why it matters:** The number that explains the price is not the score. **AA-Omniscience accuracy is 21.1%**, the lowest of its comparison set — and the reason is that Ember "declines to answer 64% of questions", which holds its hallucination rate at **17.4%**, half of Haiku 5.5's. A cheap router that abstains is a different product from a cheap model that guesses, and the abstention rate is what makes the routing story ("Muse Wonder plans, Muse Ember handles the volume") coherent rather than just a price chart.

[`🔗 Artificial Analysis measurement`](https://artificialanalysis.ai/articles/meta-s-muse-ember-is-the-cheapest-model-scoring-36-on-the-intelligence-index) · [`🔗 TechCrunch: Meta releases Muse Ember`](https://techcrunch.com/2026/11/09/meta-releases-muse-ember-a-new-lightweight-model-for-agent-execution/)

---

## 3. e-means replaces Lloyd's algorithm inside FAISS — one-tenth the epochs, and a lower loss at the end

- **Velocity:** ▮▮▮ trending
- **Source:** Meta FAIR · project page + arXiv 2611.09501 · Nov 9
- **Tags:** `research` `clustering` `faiss`

Meta FAIR open-sourced **e-means**, a replacement for Lloyd's algorithm shipped in **`contrib/e_means`**, with a paper and an in-browser playground. The claim is unusual because speed and quality usually trade: "across a large range of scales and datasets, e-means reaches a test loss below Lloyd's at 25 epochs, in 1.2 to 3 epochs", which the authors measure end-to-end as **10–45× wall-clock reduction on GPU** against Flash-KMeans and **8–15× on CPU** against FAISS. The authors are Bessa, Mazaré, Szilvasy, Touvron, Picard, Douze and Jégou — the last three being the people who wrote much of the FAISS baseline they are beating.

**Why it matters:** k-means is the load-bearing primitive under vector indexes, quantization codebooks and clustering-based retrieval filters, and a 10× reduction in epochs touches all of them without a new data structure. The honest caveat is that the comparison is the authors' own harness against their own group's implementation of the prior state of the art; the counterweight is that the code landed in FAISS itself, so the baseline is reproducible rather than asserted.

[`🔗 e-means project page`](https://e-means.github.io/) · [`🔗 arXiv 2611.09501`](https://arxiv.org/abs/2611.09501)

---

## 4. Sherlock goes to #1 on GitHub trending — and the repo has not shipped code since Nov 1

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub Trending · +4,294 stars today · Nov 10 (~04:06 UTC+8)
- **Tags:** `osint` `python` `github-trending`

**sherlock-project/sherlock** — the MIT-licensed Python tool that hunts a username across social networks — is the top repo on the daily board with **+4,294 stars**, taking it to **106,745 stars and 12,366 forks**. What the count does not tell you is that there is no repo event behind it: the last commit is **Nov 1** ("update banner layout"), the last release is **v0.16.2 on Sep 8**, and the project has no archived flag and no new advisory. The star curve is not a one-day artefact either — the tool has been adding thousands of stars a day through the week — against a codebase whose CLI has barely moved in a year.

**Why it matters:** This is the honest version of a trending story: an eight-year-old OSINT utility at 106k stars, moving up on attention alone. The only genuinely new artifact in the repo is a banner layout, so treat the velocity as interest in the *problem* (checking what of yours is exposed under a username) rather than confidence in the tool — the 400 open issues-and-pull-requests are where the false-positive reports live, and none of them were fixed this week.

[`🔗 sherlock-project/sherlock`](https://github.com/sherlock-project/sherlock) · [`🔗 GitHub Trending (daily)`](https://github.com/trending?since=daily)

---

## 5. T3 Code is #1 on the weekly board: an "agent harness control surface" now driving seven different CLIs

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub Trending · +15,379 stars this week · Nov 10 (~04:06 UTC+8)
- **Tags:** `agent-infra` `coding-agents` `electron`

**pingdotgg/t3code** tops the weekly trending list at **+15,379 stars**, for **53,850 total** since the repo was created on **Feb 8, 2026**. It calls itself an "agent harness control surface": you install and authenticate the CLIs you already pay for — **Codex, Claude Code, Cursor, Grok Build, OpenCode, Google Antigravity and fx** — and T3 Code drives them from an iOS app, an Android app, a web app or an Electron desktop shell. The repo is MIT and README-explicit about the business model ("Nothing. We built T3 Code because we wanted the best possible development experience with agents"). Releases are nightly-tagged and frequent: **`v0.1.8-nightly.20261109.4429`** landed Nov 9 at 18:58 UTC, the third nightly that day.

**Why it matters:** The interesting shift is architectural, not aesthetic. The harness layer is separating from the model vendor — one surface controlling seven competing agent CLIs means the subscription, not the harness, becomes the thing you choose, and the README's install matrix (seven logins across seven different CLI auth flows) is the real cost of that portability. The warning sign is in the counter: **5,976 open issues and pull requests** on a repo nine months old.

[`🔗 pingdotgg/t3code`](https://github.com/pingdotgg/t3code) · [`🔗 t3.codes`](https://t3.codes)

---

## 6. CISA's KEV added three in one batch — and FreeSWITCH's 9.8 was exploited before anyone scored it

- **Velocity:** ▮▮▮ trending
- **Source:** CISA KEV · catalog 2026.11.09 · Nov 10 (~03:48 UTC+8)
- **Tags:** `security` `cve` `kev`

CISA's catalog moved to **2026.11.09 (1,772 entries)** with three additions on the same day: **FreeSWITCH CVE-2026-116779 (9.8)**, **OpenSSH CVE-2026-123158 (8.1)** and **GPUStack CVE-2026-102895 (9.8)**. The FreeSWITCH bug is the most mechanical: `sofia_presence_handle_sip_i_message()` "split the To user of an inbound SIP MESSAGE on a plus sign and treated the left side as a chat protocol selector" — selecting `api` reached `switch_api_execute()`, so a peer whose MESSAGE was accepted could run FreeSWITCH API commands, "including operating-system command sinks, with the daemon's privileges". Inbound chat is on by default in the stock internal and external profiles, and "exploitation has been observed in the wild". Fixed in **1.11.3**.

**Why it matters:** Note what the registry does *not* say. All three records are `Analyzed` with **zero `nvd@nist.gov` metrics** — the scores belong to GitHub's CNA (FreeSWITCH, GPUStack, 3.1 `Secondary`) and MITRE's (OpenSSH), so a scanner quoting "NVD 9.8" is quoting a CNA's number that NVD endorsed without publishing its own. The OpenSSH entry is the same musl-without-PAM password bypass this feed covered on **2026-11-05** (any password of 256–1024 characters succeeds, fixed in 10.6p2) — the fix shipped, and KEV is the first confirmation that it was being used. GPUStack's advisory already claimed in-the-wild exploitation on **2026-11-05**; KEV corroborates rather than breaks it.

[`🔗 CISA Known Exploited Vulnerabilities catalog`](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) · [`🔗 GHSA-mg63-h38w-8p9p (FreeSWITCH)`](https://github.com/signalwire/freeswitch/security/advisories/GHSA-mg63-h38w-8p9p)

---

## 7. FFmpeg gets 121 CVE records in 62 minutes — and 114 of them say the newest release is still affected

- **Velocity:** ▮▮▮ trending
- **Source:** NVD · 121 records published Nov 9
- **Tags:** `security` `cve` `ffmpeg`

VulnCheck published **121 FFmpeg CVE records on 2026-11-09** — first at 19:16:48Z, last at 20:18:13Z — every one still in `Received` status with no NVD analysis. The suite is mostly memory-safety in the codec and filter tree — heap overflows in `huffyuvenc`, `dvbsubenc` and `gif.c`, out-of-bounds writes in the VVC and Vulkan AV1 paths, uninitialized-memory disclosures across a dozen decoders — plus a large tail of NULL dereferences. Scores are VulnCheck's on both frameworks: its **3.1 metrics top out at 7.8**, its **4.0 metrics at 8.5**, with nine records sitting at both maxima (one is `CVE-2026-125250`, the GIF encoder `shrunk_buf` sizing bug). The distribution matters more than the maximum: **114 of the 121 descriptions say "through 9.0.2"**, which is FFmpeg's newest tag (`n9.0.2`), while only **7** name a fixed bound ("before 8.1.3 and 9.x before 9.0.2").

**Why it matters:** A 121-record batch where the overwhelming majority of entries describe bugs present in the latest tag is a **no-fix-named** disclosure, not a patch announcement — and the 4.0-vs-3.1 spread (7.8 on 3.1, 8.5 on 4.0, same vectors, same CNA) is a scoring convention, not a disagreement. Everything here is `Received`, so "NVD says" is not available yet; quote VulnCheck and say so.

[`🔗 CVE-2026-125250 on NVD`](https://nvd.nist.gov/vuln/detail/CVE-2026-125250) · [`🔗 FFmpeg tags`](https://github.com/FFmpeg/FFmpeg/tags)

---

## 8. SuperTokens' 9.9: one app's API key can rewrite the parent tenant — and every sibling with it

- **Velocity:** ▮▮ rising
- **Source:** NVD · CVE-2026-123800 · Nov 10 (~03:16 UTC+8)
- **Tags:** `security` `cve` `authentication`

**CVE-2026-123800 (9.9, CVSS 3.1, assigned by GitHub's CNA, record `Received`)** is a multi-tenant authorization flaw in **SuperTokens Core**, the open-source auth server. `Multitenancy.checkPermissionsForCreateOrUpdate` "does not adequately authorize updates to a parent connection URI domain or the base tenant": in a licensed deployment with several applications under one non-default connection URI domain, an attacker holding **one** application's valid API key can update the parent because the target branch "checks the domain without requiring the source application and tenant to be public". Because `api_keys` is not protected, the chain continues — replace the parent key, then sibling keys, read or modify sibling users, mint sessions as them, persist through a sibling dashboard user, and lock the sibling application's own key out.

**Why it matters:** The fix list is the story's real shape: **18 patch versions** across seven major lines (6.0.24, 7.0.23, 8.0.7, 9.0.6 … 12.3.1), because the vulnerable code has been carried forward since 6.0.0. And the precondition is precise — a *licensed* multi-tenant deployment with multiple applications sharing one non-default connection URI domain — so self-hosted single-tenant installs are not in the affected class. The record is unanalyzed, so 9.9 is the CNA's number.

[`🔗 CVE-2026-123800 on NVD`](https://nvd.nist.gov/vuln/detail/CVE-2026-123800) · [`🔗 fix commit 13c3de17`](https://github.com/supertokens/supertokens-core/commit/13c3de170dd40dd217db0f6bd2bded0948476a42)

---

## 9. Redpanda Connect's management API is on `0.0.0.0:4195` with no auth by default — so a POST is RCE

- **Velocity:** ▮▮ rising
- **Source:** NVD · CVE-2026-123270 · Nov 10 (~02:17 UTC+8)
- **Tags:** `security` `cve` `rce`

**CVE-2026-123270 (9.8)** covers **Redpanda Connect 4.39 through 4.110**: in streams mode "the management HTTP API is exposed on `0.0.0.0:4195`, but authentication is disabled by default and there is no authentication gate protecting the stream CRUD routes". An unauthenticated attacker with network access can `POST` a pipeline definition to `/streams/{id}` containing code-executing processors — `command`, `subprocess`, `ffi`, or unsafe `sql_raw` — and "because pipelines can also return command output in-band via HTTP, this vulnerability enables full host compromise, credential theft, and data exfiltration with no user interaction or credentials required". **v4.111** makes the API opt-in, but the record notes RCE "remains achievable on v4.111 and later if the management API is manually enabled".

**Why it matters:** The score is **CISA-ADP's**, not Redpanda's and not NVD's — the record is `Received`, and the only metric is `134c704f-…` (Vulnrichment) at 9.8 with `CWE-306`. The reference list is rarer still: one link, a researcher's own reproduction repository (`pagvac/redpanda-connect-unauth-rce`), with no vendor advisory and no commit in the record — so the paragraph above is the CNA description's account, and the fix boundary ("4.111, opt-in") is the only remediation sentence published.

[`🔗 CVE-2026-123270 on NVD`](https://nvd.nist.gov/vuln/detail/CVE-2026-123270) · [`🔗 reproduction repo`](https://github.com/pagvac/redpanda-connect-unauth-rce)

---

## 10. Airflow's 8.8 is an incomplete fix: upgrading to 3.3.1 does not close it

- **Velocity:** ▮▮ rising
- **Source:** NVD · CVE-2026-111421 · Nov 9 (~18:17 UTC+8)
- **Tags:** `security` `cve` `airflow`

**CVE-2026-111421 (8.8, CISA-ADP)** is the second half of a bug Apache thought it had fixed. Airflow's Task Execution API "stored XCom values written by a task without the reserved-key check applied elsewhere", so a Dag author's task could write an XCom that, "when a user later viewed it through the API with deserialization enabled, made the API server instantiate classes from the `airflow.*` namespace with arguments the Dag author chose". The record is explicit about who is still exposed: "This is an incomplete fix for CVE-2026-59242: users who applied that fix in **apache-airflow 3.3.1** remain affected through this route and should upgrade to **apache-airflow 3.4.0** or later."

**Why it matters:** Deserialization was already enabled in exactly the deployments that took the first advisory seriously, so the population still at risk is the population that patched — the distribution shape every "incomplete fix" produces. The CWE in the record is `CWE-502`, and the workaround is the boring one: turn deserialization off on the API server until 3.4.0 is deployed.

[`🔗 CVE-2026-111421 on NVD`](https://nvd.nist.gov/vuln/detail/CVE-2026-111421) · [`🔗 Apache mailing-list thread`](https://lists.apache.org/thread.html/pwdwx354tv0x3m8wzfhh59r6wyztj2lk)

---

## 11. otterdog skips its HMAC check when the secret is unset — the default — and then `eval()`s the webhook body

- **Velocity:** ▮▮ rising
- **Source:** NVD · CVE-2026-123870 · Nov 9 (~17:16 UTC+8)
- **Tags:** `security` `cve` `supply-chain`

**CVE-2026-123870 (9.5 on CVSS 4.0, assigned by Eclipse's CNA)** lands in **otterdog**, the Eclipse Foundation's tooling for managing GitHub organisations as code. "The otterdog webapp evaluates a format-string built from the incoming GitHub webhook JSON body using Python's `eval()`. When the `GITHUB_WEBHOOK_SECRET` configuration value is unset or empty (**the code default is `None`**), the HMAC signature check is skipped entirely, allowing an unauthenticated network client to reach the `eval()` sink with attacker-controlled input and execute arbitrary Python on the webapp host." Fixed in **`bbc9e3ce`**.

**Why it matters:** Two defaults compose into the vulnerability: an authentication control that fails *open* when unconfigured, in front of an `eval()` on request data. Either alone is a bug worth fixing; together, every deployment that never set an env var is remote code execution. This is also a CVSS 4.0-only record — the 9.5 is Eclipse's number on the 4.0 framework and the record is `Received`, so there is no NVD or 3.1 figure to compare it to yet.

[`🔗 CVE-2026-123870 on NVD`](https://nvd.nist.gov/vuln/detail/CVE-2026-123870) · [`🔗 GHSA-32xf-7j44-xq72`](https://github.com/eclipse-csi/otterdog/security/advisories/GHSA-32xf-7j44-xq72)

---

## 12. Zebkit links Chromium's content layer into your app — 34% smaller than Electron, and honest about where it loses

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 99 pts · Nov 9 (~22:34 UTC+8)
- **Tags:** `browsers` `electron` `rust`

**ikey4u/zebkit** (LGPL-2.1, v0.2.0, **135 stars**, created Oct 10) is Blink, V8 with every JIT tier, PDFium and FFmpeg as "one library you link into your own application" — with no Chrome UI, no Node runtime and no Electron packaging. It runs inside the application's own event loop (`zebkit_init()`, `zebkit_pump()`) and draws into a window you hand it: an X11 window, an `NSView` or an `HWND`, with bindings for C, Rust, Python, Go and JavaScript. The published benchmark against **Electron 45.2.1** — same harness, same pages, medians of 5–11 runs, Linux x86-64, dated 2026-11-06/07 — reads **171.2 / 59.4 MiB shipped** against 260.5 / 87.1, **2.3 s cold start** against 6.6 s, **179 MB** for a blank page against 250 MB, and **level** performance on DOM and JS workloads.

**Why it matters:** The table's last rows are why it is worth reading. Processes per page: **7 for zebkit, 6 for Electron** — because zebkit sandboxes storage in its own process "as Chrome". And the README carries a section the genre usually omits: "**Where Electron is ahead**: one process fewer a page, and memory on two of the ten sites, YouTube and The Verge, where advertising and video decide." A 135-star project's self-benchmark is a claim, not a measurement of your workload — but a claim that states its own losses is the kind worth re-running.

[`🔗 ikey4u/zebkit`](https://github.com/ikey4u/zebkit) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50426207)

---

## 13. When the instruction file goes stale, the agent follows the dead path — 732 trajectories on three real repos

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2611.09802 · listed Nov 9
- **Tags:** `research` `coding-agents` `documentation`

**"When Instruction Files Go Stale: Documentation Debt and Hidden Cost in Coding Agents"** studies something every `CLAUDE.md`-shaped repo has: instruction files "read in every agent session" that "can fall behind the code and become stale (e.g., a test folder moves, but the file still points to the old one)". The setup is controlled — three real stale instructions from active open-source repos, each a different kind of guidance (**a test command, a code location, and a procedure for adding a component**) — with agents fixing **22 maintenance tasks** under three versions of each instruction: left stale, corrected to the current path, and removed. Code and task held fixed; **732 trajectories** analysed.

**Why it matters:** The authors' framing is the finding: "Evaluations that check only task success can miss this cost, and the stale file can persist." A stale instruction is documentation debt whose interest is charged to every later session — so the natural experiment is not whether the agent finished but what it did on the way, and whether it recovered. Any team that has watched an agent run the 2024 test command will recognise the class; holding the code constant while moving only the prose is what makes the cost measurable.

[`🔗 arXiv 2611.09802`](https://arxiv.org/abs/2611.09802) · [`🔗 full text (HTML)`](https://arxiv.org/html/2611.09802v1)

---

## 14. MemoryDojo: every memory architecture tested is poisonable, and the damage depends on the architecture

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2611.09721 · listed Nov 9
- **Tags:** `research` `agent-memory` `security`

**MemoryDojo** is a benchmark for the lifecycle of a poisoned memory. The premise: "malicious instructions encountered in one session may be stored and propagated through memory before being retrieved and acted upon in later sessions", and "because memory systems differ in how they process and retrieve information, the downstream effects of poisoning can vary significantly across systems". The artifact is **155 multi-session long-horizon trajectories across four domains**, run against **five different memory systems**, tracing where the poison is written, when it is retrieved, and what the agent then does. The result is sober and unhelpful in the way real results are: "all memory systems are susceptible to memory poisoning, with substantial variation in downstream effects."

**Why it matters:** The benchmark ships an attack optimization too — "a memory-aware poison optimization process that increases the poisoning efficacy, highlighting differences between memory architectures" — which turns the variation into an attack surface rather than a curiosity. For anyone shipping a memory layer (this feed has covered four competing memory formats in the last week), a store that is not the same shape as your neighbour's now has a measurable cost.

[`🔗 arXiv 2611.09721`](https://arxiv.org/abs/2611.09721) · [`🔗 full text (HTML)`](https://arxiv.org/html/2611.09721v1)

---

## 15. The same H100 is $2.69 or $12.29 an hour — and the receipt says what the 4.57× is not

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 147 pts · Nov 9 (~23:39 UTC+8)
- **Tags:** `gpu` `pricing` `infrastructure`

**`datareceipts/data-receipts`** publishes the arithmetic behind a price comparison rather than the comparison: H100 SXM 80GB on-demand, normalised to dollars per GPU-hour, with a month at 730 hours. **RunPod Community $2.69** ($1,964/month), RunPod Secure $3.99, **AWS `p5.48xlarge` $6.88** ($5,022), **Azure `ND96isr_H100_v5` $12.29** ($8,972) — "4.57× between cheapest and dearest, for the same chip". The study also refuses the obvious chart: "An H100 is three different products. The SXM 80GB, the PCIe 80GB and the NVL 94GB all get marketed as H100s and they do not cost the same", so every comparison stays inside one (model, memory) group, and each vendor is priced on its *cheapest* route to that GPU.

**Why it matters:** The repo's "What the 4.57× is not" section is the part that makes the number usable: Azure's ND SKU carries "400 Gbps per GPU of Quantum-2 InfiniBand with GPU Direct RDMA", which is why multi-node training costs more than single-node fine-tuning — "if you are fine-tuning on one node, you are paying for an interconnect you will never use." The stated limits are equally specific: on-demand list prices only (spot "would narrow the gap a lot"), one region each, and "**Availability is not priced. A cheap H100 you cannot get is not a price.**"

[`🔗 data-receipts/109-gpu-pricing`](https://github.com/datareceipts/data-receipts/tree/main/109-gpu-pricing) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50427085)

---

## 16. What malloc is actually doing: 1,000 allocations, 2 syscalls, 132 KiB

- **Velocity:** ▮▮ rising
- **Source:** benmandrew.com · 180 pts · Nov 9 (~19:31 UTC+8)
- **Tags:** `systems` `memory` `glibc`

A measured walkthrough of the gap between `malloc`'s interface and what the kernel sees. The article's first experiment traces a loop of **1,000 `malloc(16)` calls** under `strace` and finds **two `brk` syscalls total** — one to learn the program break, one to grow the heap by **132 KiB**, both in the first call; "the other 999 just take from that already allocated memory". It prices the thing being amortised at "**575 ns for an empty one**, as measured below", then builds a bump allocator on `sbrk`, prints one address from each region of the process, and notes that in that run the break and `printf` sit **23.4 TiB apart** — "about 1,530 times the machine's 15.6 GiB of RAM. Nearly all of that range is unmapped, so it costs no physical memory."

**Why it matters:** This is the layer most performance reasoning skips — the syscall-vs-userspace boundary and the bookkeeping that hides it. The article is also a working demonstration of measurement over recall: the 132 KiB, the two `brk` calls and the address layout are outputs, not assertions, and each is reproducible from the snippets it prints.

[`🔗 What is malloc doing, anyway?`](https://benmandrew.com/articles/what-is-malloc-doing-anyway) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50424157)

---

## 17. Raspberry Pi 5 16GB hits $385 — an $80 jump since April, on a board that launched at $120

- **Velocity:** ▮▮ rising
- **Source:** CNX Software · 183 pts · Nov 10 (~01:42 UTC+8)
- **Tags:** `hardware` `raspberry-pi` `pricing`

Raspberry Pi raised prices again, this time concentrated on the 16GB models: the **Raspberry Pi 5 16GB now sells for $385**, "an $80 increase compared to the last price hike in April", and the **CM5** system-on-module goes up **$40**, "starting at $375 for the Lite model without wireless". The article's one piece of good news is a hold: "the Raspberry Pi 500+ mechanical keyboard PC stays at the same price, starting at $410". CNX's own read on the asymmetry is that the keyboard model is "already richly priced and the demand must be lower than for single board computers and compute modules".

**Why it matters:** The board that anchored low-cost always-on compute is now priced like a small server, and the increase is a memory-cost pass-through rather than a Raspberry Pi margin decision — which is the same DRAM pressure that made idle-RAM jokes into a genre this week. For anyone sizing a homelab, a CI runner fleet or an edge deployment, the 16GB tier has crossed from buying a few to buying one and measuring it, and the CM5 line moves with it.

[`🔗 CNX Software: Raspberry Pi 5 16GB now $385`](https://www.cnx-software.com/2026/11/03/when-will-this-stop-the-raspberry-pi-5-16gb-sbc-now-sells-for-385/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50428801)

---

## 18. Flide is the serving layer decision models were missing — up to 9.5× over vLLM and SGLang, exact state forking

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 109 pts · Nov 9 (~12:43 UTC+8)
- **Tags:** `inference` `decision-models` `serving`

**`OmniJev/Flide`** (Apache 2.0, **258 stars**) is an inference engine for the "decision model" family — the single-forward-pass, no-generation models this feed covered on **2026-11-07** — and its pitch is that they need different serving machinery from generative LLMs: "**With exact state forking it is up to 9.5 times faster than vLLM and SGLang, and every answer is the one the model gives the question alone**" — one state forked into three questions, each answered in one forward pass. The project published its method as **arXiv 2610.42148** ("Accelerating Decision Inference with Exact State Forking") on Nov 2 and ships with a `flide verify` command that "checks exact forking on your own model and requests". **PyPI `flide` 0.1.10** was uploaded **2026-11-09T06:57Z**, the same day the README logged two releases: 0.1.9 adding **`pplx-decider-v1.1-27b` and `JEV-35B`**, and 0.1.10 adding **Ainvest-Decision-27b, Darwin-27B-RSI-Decision and KnowLine-31B-Gen1.5**, the last now reading images.

**Why it matters:** The model list is the story. Perplexity, Cloudflare (`Clef`), Juspay, AutoTrust and a dozen others now publish "decision" checkpoints that are not chat models, and the whole family was being served by engines built for token generation. An up-to-9.5× claim against vLLM is the project's own benchmark on its own workload — the "up to" is doing real work — but the `verify` command, which tests exactness of forking rather than speed, is the part that decides whether the 9.5× is a fair comparison or a different computation.

[`🔗 OmniJev/Flide`](https://github.com/OmniJev/Flide) · [`🔗 PyPI: flide 0.1.10`](https://pypi.org/project/flide/)

---

## 19. PackageKit's local 8.5: a path traversal in "simulate the actions" turns into root

- **Velocity:** ▮ steady
- **Source:** NVD · CVE-2026-104620 · Nov 9 (~23:17 UTC+8)
- **Tags:** `security` `cve` `linux`

**CVE-2026-104620 (8.5 on CVSS 4.0, assigned by SUSE)** is a short record with a large blast radius: "A path traversal attack in simulation of actions in the **Zypp backend of PackageKit** before **1.4.1** could be used by local attackers to gain root privileges." PackageKit is the D-Bus service behind graphical package installs across most desktop distributions, and it runs as root by design — so a flaw in the *simulation* path matters precisely because simulation is the unprivileged call applications make before asking for authorization.

**Why it matters:** The record carries one reference — a **SUSE Bugzilla entry** — and no CVE-derived advisory text, no upstream commit and no fixed-release link, so the vendor's own errata is where the affected-version detail lives. It is also a 4.0-only record from a Linux distributor and still `Received`: a very widely deployed desktop package stack has a local root bug whose full disclosure lives outside the registry, which is the shape this feed keeps finding in distro-filed records.

[`🔗 CVE-2026-104620 on NVD`](https://nvd.nist.gov/vuln/detail/CVE-2026-104620) · [`🔗 SUSE Bugzilla 1284954`](https://bugzilla.suse.com/show_bug.cgi?id=1284954)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-09T20:29:21Z |
| Items | 19 |
| Sources tracked | 28 (Hacker News, GitHub Trending, NVD, CISA KEV, arXiv, vendor blogs, security advisories) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[Previous day](2026-11-09.md) · [Raw .md](https://trending.md/en/feed/2026-11-10.md) · [Archive](../archive/)
