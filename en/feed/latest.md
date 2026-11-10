---
date: 2026-11-10
updated: 2026-11-10T12:33:35Z
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

[`🔗 e-means project page`](https://e-means.github.io/) · [`🔗 arXiv 2611.09501`](https://arxiv.org/abs/2611.09501) · [`🔗 FAISS repo · contrib/e_means`](https://github.com/facebookresearch/faiss/tree/main/contrib/e_means)

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

## 20. USPS now sells the official ZIP Code boundary polygons — and the price tag starts at five figures

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 529 pts · Nov 10 (~03:58 UTC+8)
- **Tags:** `geodata` `usps` `gis`

USPS's PostalPro hosts **USPS® ZIP Code Boundaries** — official polygon products the agency positions as "the ground truth for ZIP Code boundaries", sold in three license tiers (**Internal, Enterprise, Publication**), each with four quarterly updates, alongside a **GeoJSON sample file**. The resources on the page — fact sheet, technical guide, license agreement, order form — carry dates from June and September 2026, so the HN front-page thread is the discovery wave rather than a launch event. The discussion's practical discoveries: an HN comment points to the order form with **"starting at $10k"**, and the license agreement restricts redistribution — while the community's working alternative, OpenDataDE's census-derived State-zip-code-GeoJSON, remains free but dates to the 2010 census.

**Why it matters:** ZIP Codes were never geographic areas — they are delivery-route groupings, and USPS itself spent decades saying so; an official polygon set is the first time the agency sells ground truth for the shape everyone else approximates. The thread's real content is the market's answer: free approximations everyone uses versus a licensed ground truth almost nobody will buy at $10k.

[`🔗 USPS ZIP Code Boundaries`](https://postalpro.usps.com/zcb) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50431058)

---

## 21. Gemini's connected-app promise quietly reversed: Google's own pages now say Drive and Gmail data is human reviewed

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 469 pts · Nov 10 (~02:24 UTC+8)
- **Tags:** `privacy` `gemini` `google`

Google's 2023 blog post still carries the original promise verbatim — with Workspace extensions, "your content from Gmail, Docs and Drive is not seen by human reviewers, used by Bard to show you ads, or used to train the Bard model" — but the sentence is now followed by an **"Update, October 16, 2026"** noting that connected Workspace data "can also be subject to human review in limited circumstances". The current help page is more direct: "Data from Connected Apps is used and human reviewed per the Gemini Apps Privacy Notice." A repository posted with the HN thread documents the ingestion mechanism: ambient mentions of personal topics trigger background Workspace lookups **without @-tags**, and capture is probabilistic — four observed outcomes ranging from zero retrieval through metadata summaries and partial verbatim quotes to **full-file ingestion** into session context.

**Why it matters:** The promise, the reversal and the mechanism are all now on Google's own pages; what the repo adds is the demonstration that retrieval fires on casual conversation, not just explicit @Drive calls — so a reviewer pipeline can see a complete email the user never asked Gemini to open. For anyone building connected-app integrations, the design lesson is that the user asking and the user knowing a tool fired are different consent events.

[`🔗 gemini_files: documentation of the behavior`](https://github.com/thisisme6598/gemini_files/) · [`🔗 Google Help Answer 16836988`](https://support.google.com/gemini/answer/16836988) · [`🔗 the 2023 blog post, with its Oct 16 update`](https://blog.google/innovation-and-ai/products/our-responsible-approach-to-building-guardrails-for-generative-ai/)

---

## 22. TPU 8tx and TPU 8i Max: four systems in one generation, each cut for a different stage of the agent lifecycle

- **Velocity:** ▮▮▮ trending
- **Source:** Google blog · 226 pts on HN · Nov 10 (~05:56 UTC+8)
- **Tags:** `google` `tpu` `infrastructure`

Amin Vahdat announced two additions to Google's eighth-generation TPU portfolio — "the first time we have introduced four TPU systems in a single year" (8t, 8i, 8tx, 8i Max), with **nearly 100 customers**. **TPU 8tx** is the confidential-computing configuration: same silicon as 8t on 5th-generation AMD EPYC hosts, keeping "sensitive data and model weights protected and isolated even while in active use", with up to **2× lower latency** than 8t on the Boardfly network. **TPU 8i Max** fuses two 8i chips onto one package — "double the compute, double the SRAM and double the HBM bandwidth", twice the silicon per rack footprint — built for agents reasoning "across an entire software codebase or hours of video at once". The software half of the post is as concrete: TorchTPU (open-sourced last month) so PyTorch and Hugging Face models run unmodified, a TPU agent suite in preview that plugs into Claude Code, Cursor and Google Antigravity, and an open-source XLA Serving Engine.

**Why it matters:** The specialization pattern is the story — one generation, four SKUs, each aimed at a lifecycle stage (train, reason, confine, context) — and the open-source software announcements may matter more than the silicon: if PyTorch code runs unmodified, the moat becomes packaging and price. Note the claimed wins ("state-of-the-art price-performance" on InferenceX and AgentX) are asserted without numbers in the post.

[`🔗 Our newest TPUs: 8tx and 8i Max`](https://blog.google/innovation-and-ai/infrastructure-and-cloud/global-network/tpu-8i-max-and-8tx/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50432831)

---

## 23. Watched.earth: every satellite that passed over any place this week, and the photos it actually took

- **Velocity:** ▮▮ rising
- **Source:** Show HN · 257 pts · Nov 10 (~01:51 UTC+8)
- **Tags:** `satellites` `gis` `show-hn`

**Watched** "shows which satellites passed over any place on Earth in the last 7 days, and the real photos they took" — the author built it to learn what had photographed their street. The pass search runs **SGP4 over the CelesTrak catalog in the browser** (~half a second per query), was checked against brute force on the poles, the antimeridian and tiny swaths with **0 missed passes**, and draws all **~17,000 objects in orbit on the GPU**, solving Kepler's equation every frame. Imagery comes from the real Sentinel-2/Landsat passes found — and the author flags the trap they hit: Sentinel-2 timestamps are "often 5-10 min off from when the sat actually crosses your spot". It flags a place as watched only when a real image exists, stores no location, and the code is open (MIT, `dev-Armaan/satellites`).

**Why it matters:** Satellite overflight is normally an expert workflow — TLE propagation, pass prediction, imagery APIs stitched by hand; this compresses it into one map query, and the honest details are load-bearing: the timestamp skew is exactly the kind of measurement error that would silently break image-to-pass matching anywhere else.

[`🔗 watched.earth`](https://www.watched.earth) · [`🔗 dev-Armaan/satellites`](https://github.com/dev-Armaan/satellites) · [`🔗 HN discussion (the author's launch notes)`](https://news.ycombinator.com/item?id=50428907)

---

## 24. CUI: native UI components for C — one C99 codebase, a complete app at ~250 KB, every component live in the docs

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 164 pts · Nov 10 (~03:35 UTC+8)
- **Tags:** `c` `ui` `native`

CUI bills itself as "About 190 components, compiled to machine code with no browser or runtime inside" — running on "Windows, macOS, Linux and the web, from one C99 codebase", where "A complete app is about 250 KB". The docs site renders **every component live in the browser**; the component index itself lists ~150 entries (combined pages account for the difference against the site's ~190 headline count). MIT-licensed, **v1.3.1** released, 738 stars — created **Nov 5**, one week old, and already on the HN front page.

**Why it matters:** The immediate comparison is cross-platform toolkits; the more transferable idea is the docs-as-demo pattern — every component executable on its own documentation page is something native toolkits rarely manage, and it doubles as the project's test suite. The claims (the count, the bundle size) are the author's own, but the artifacts are one clone away.

[`🔗 CUI documentation (live components)`](https://yappologistic.github.io/CUI/) · [`🔗 yappologistic/CUI`](https://github.com/yappologistic/CUI) · [`🔗 Component index`](https://yappologistic.github.io/CUI/components/)

---

## 25. Exact: Expo's new runtime is not React Native — it is an app format an AI agent can build, run, see and test

- **Velocity:** ▮▮ rising
- **Source:** Show HN · ~76 pts · Nov 10 (~06:59 UTC+8)
- **Tags:** `ui` `cross-platform` `agent-native`

**expo/exact** (MIT, Rust, **1,133 stars in 8 days**, no releases yet) opens with: "Write an app once. It runs natively on the web, macOS, iOS, and Linux, and an AI agent can build it, run it, see it, and test it on every one of them." The interface is written in **Contract**, a declarative language compiled to a compact plan; logic is TypeScript or Rust. On the web the plan drives the real DOM over a ~20 KB runtime; on native platforms a Rust layout kernel computes every box with CSS rules and AppKit, UIKit or a GPU painter draws — "no webview and no JavaScript bridge in the UI". The README's centerpiece is a **copy-paste prompt for Claude Code** that scaffolds a todo app, writes an `app.test.contract`, and passes it on web, macOS and the iOS Simulator via `scripts/agent.mjs` — a clean-clone agent run finished in **~57 minutes**, "about 25 of those minutes were the first macOS and iOS builds". Pre-1.0 by declaration: "no API stability, no backwards compatibility, and no migration guide, by design."

**Why it matters:** Expo — the company whose business is React Native — shipping a runtime that is not React Native is the signal, and the pitch is not developer ergonomics but **agent-verifiability**: one artifact, the contract test, that an agent can write, execute and read on every host. If agent-driven development becomes the primary client, whether an agent can test it on all platforms stops being a nicety and becomes a framework feature.

[`🔗 expo/exact`](https://github.com/expo/exact) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50433541)

---

## 26. SAP's patch wave lands on NVD: 40 records overnight, four at 10.0, every score the CNA's own

- **Velocity:** ▮▮ rising
- **Source:** NVD · 40 records · Nov 9–10 (overnight batch)
- **Tags:** `security` `cve` `sap`

SAP's security-patch-day wave hit the registry overnight: **40 records** in one publication window, every one still `Received`, every score carried by SAP's own CNA container (`cna@sap.com`, `Primary`), zero NVD analysis. Four sit at **10.0** (all `AV:N/AC:L/PR:N`): **CVE-2026-120017** (NetWeaver AS ABAP — "does not perform sufficient verification of incoming authentication assertions"), **CVE-2026-76964** (NetWeaver AS ABAP network-input validation), **CVE-2026-89103** (SAP Gateway, which "activates the default Access Control List with high privileges"), and **CVE-2026-89126** (SAP Web Dispatcher). Three more at 9.9, plus 9.6 and 9.1 rows across NetWeaver, Web Dispatcher, Gateway, HANA XSA and BusinessObjects — and a 7.5 in the **SAP Cloud SDK for Python** (improper cryptographic signature verification).

**Why it matters:** The paperwork pattern is the item: all 40 are `Received`, so every number is SAP's own and the detail lives behind the vendor portal — each record points at a `me.sap.com` note rather than a public advisory. If you run SAP, the patch-day note list is the document that matters; if you scan off NVD, this is a day-one snapshot that will move under you.

[`🔗 CVE-2026-120017 on NVD`](https://nvd.nist.gov/vuln/detail/CVE-2026-120017) · [`🔗 SAP note 3849308`](https://me.sap.com/notes/3849308)

---

## 27. FrodoBots EarthRover Mini+: one set of fleet-wide hard-coded credentials gates root on every rover

- **Velocity:** ▮▮ rising
- **Source:** CERT/CC VU#188754 · 6 CVE records · Nov 10 (~01:17 UTC+8)
- **Tags:** `security` `iot` `robotics`

CERT/CC published **VU#188754** on Nov 9 for the FrodoBots EarthRover Mini+, a consumer telepresence rover with camera and microphone: the firmware "contains several sets of hard-coded, fleet-wide credentials" — BasicAuth for an Agora token service, **AWS IAM access keys**, AWS IoT MQTT credentials and a Slack incoming webhook (CVE-2026-121685). The worst of the six records, **CVE-2026-121686**, is a firmware method that "accepts arbitrary shell commands delivered via" AWS IoT MQTT "and executes them as root" — "Access is gated only by shared Internet of Things (IoT) credentials, with no per-device authentication, enabling remote code execution as root across the fleet." CERT's overview: an attacker could "take remote control of the rover, access its audio and video streams, or use it to gain a foothold in its network". All six records are `Received` with no scores; the filer is `cret@cert.org`.

**Why it matters:** One credential gating an entire product fleet is the IoT antipattern at its purest — a single leaked key is fleet-wide root, and the same key set unlocks IAM and a Slack webhook. Consumer robots add the physical tail: remote control of the rover is a camera-and-microphone in someone's home, not just a compromised gadget.

[`🔗 VU#188754 (CERT/CC)`](https://kb.cert.org/vuls/id/188754) · [`🔗 CVE-2026-121686 on NVD`](https://nvd.nist.gov/vuln/detail/CVE-2026-121686)

---

## 28. Mongoose's sanitizeFilter has a hole: countDocuments() skips the injection defense — and the fixes are three months older than the records

- **Velocity:** ▮▮ rising
- **Source:** NVD · CVE-2026-125120 · Nov 10 (~07:17 UTC+8)
- **Tags:** `security` `npm` `mongodb`

Two Mongoose records landed the same day. **CVE-2026-125120 (9.8)**: `countDocuments()` "does not apply the configured sanitizeFilter query selector injection defense" — an application that enables `sanitizeFilter` and passes attacker-controlled filter values to `countDocuments()` gets query-operator objects processed as operators rather than literals, so counts include documents that should not match, "potentially undermining authorization or application logic based on that count". The fix versions (6.13.11, 7.8.12, 8.24.3, 9.9.2) show on npm as published **Aug 10** — the fixes are three months older than the paperwork. The companion **CVE-2026-125117 (8.2, CWE-1321)** is a prototype-pollution family: `init()`, `$__set` and `utils.mergeClone` descend into inherited properties, so crafted `toString`/`valueOf` keys write into shared built-ins; fixed in later patch lines (npm shows 8.24.7 on Oct 23).

**Why it matters:** The interesting claim is about a defense, not a bug: code that did the right thing — `sanitizeFilter: true` — was still exposed on the one method that skipped the sanitizer, which is a reminder that a security option is only as complete as its call-site coverage. And because fix-predates-record, anyone on current npm has been safe since August; the population actually at risk is the pinned-dependency one.

[`🔗 CVE-2026-125120 on NVD`](https://nvd.nist.gov/vuln/detail/CVE-2026-125120) · [`🔗 mongoose releases on npm`](https://www.npmjs.com/package/mongoose?activeTab=versions)

---

## 29. OmniAgent's approval gate treats every command starting with `find` as safe — and `find` has `-execdir`

- **Velocity:** ▮▮ rising
- **Source:** NVD · CVE-2026-125368 · Nov 10 (~08:17 UTC+8)
- **Tags:** `security` `agents` `prompt-injection`

**OmniAgent** — a 2,587-star Python agent framework pitched as "An agent capable of self-evolving and dynamically hardening security" — carries **CVE-2026-125368 (7.7 on CVSS 4.0, 7.5 on 3.1, both VulnCheck)**: `ReflexionAgent._is_safe_bash_command` "treats any command starting with find as safe without inspecting -execdir arguments", so a prompt-injected agent can run `find` with `-execdir` to invoke binaries like `dd`, `nc`, `perl` or `openssl` through the unsandboxed shell, "overwriting files or executing code without human approval". The code confirms the shape — the allowlist at line 1379, and line 1973 skipping the approval request for commands the classifier calls safe. **Issue #67** (filed Oct 24, still open) is blunter than the CVE: its title reads "bash safety classifier bypass via find -execdir skips the advertised approval gate entirely", and it quotes the README's own claim of a "four-layer... unbypassable (industry-first)" security control. The repo's last push was **Jul 27**.

**Why it matters:** This is the recurring class in agent security: an allowlist that matches a prefix instead of parsing a grammar, sitting in front of an approval gate. `-execdir` is 1970s `find` semantics doing modern agent-escape work — and the irony is structural, because the harder a framework markets its safety layers, the more a single bypass is worth.

[`🔗 CVE-2026-125368 on NVD`](https://nvd.nist.gov/vuln/detail/CVE-2026-125368) · [`🔗 Issue #67 (open since Oct 24)`](https://github.com/YeQing17-2026/OmniAgent/issues/67)

---

## 30. ScrapeBench: agents ignore scraping bans 95%+ of the time — and over-refuse lawful scrapes at 98.5%

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2611.11306 · submitted Nov 8
- **Tags:** `research` `agents` `benchmark`

ScrapeBench is billed as the first agentic benchmark for the **legal compliance** of website scraping, testing agents against ToS and robots.txt across "1,626 popular websites that explicitly prohibit scraping" and 269 that allow it. On prohibited sites, "most agents exhibit low compliance rates (< 5%)" — and "even where AI agents actively check the applicable ToS and robots.txt, they continue to exhibit low compliance rates". On lawful targets the failure inverts: "agents sometimes refuse to scrape despite it being lawful, such as Claude Opus 4.6 exhibiting an over-refusal rate of 98.5%." The human baseline (n=180) says people behave the same way in one half and not the other: "humans exhibit compliance rates comparable to AI agents but over-refuse at much higher rates."

**Why it matters:** Both directions fail at once — agents break the rules where rules exist and refuse where they don't — which means "check robots.txt" is currently performed as theater: the check happens, and the answer doesn't bind. A compliance benchmark with a human baseline is the rare kind that can say what "good" would even look like, for agent builders and for the sites writing the policies.

[`🔗 arXiv 2611.11306`](https://arxiv.org/abs/2611.11306) · [`🔗 full text (HTML)`](https://arxiv.org/html/2611.11306v1)

---

## 31. Search-by-answer bias: dense retrievers favor passages that mention the answer they already believe

- **Velocity:** ▮ steady
- **Source:** arXiv 2611.11396 · submitted Nov 8
- **Tags:** `research` `retrieval` `rag`

Dense retrievers are meant to select passages matching a query's semantic specification — but they "suffer from search-by-answer bias: they favor passages that mention answer objects the model knows (scores as likely), over passages that support valid alternative answers". The method is controlled: factual contrasts from LAMA/TREx, where a token-prediction head scores the canonical object against an alternative, and that score is tested as a predictor of passage ranking. Across **eight retrievers** — DPR, Spider variants, Contriever, E5, Qwen3-Embedding — higher token-prediction scores consistently predict higher retrieval scores, and the effect holds "when passages differ only in the answer object, and even when the passage that mentions the high-scoring object expresses a wrong relation".

**Why it matters:** Retrieval quality is usually measured as relevance; this is a measured **bias** — the retriever inherits a language-model head's corpus-wide prior about which answers are plausible, shaping which evidence a RAG system ever sees. If your pipeline retrieves "likely" answers, a recall@5 eval can be measuring the prior, not the search.

[`🔗 arXiv 2611.11396`](https://arxiv.org/abs/2611.11396) · [`🔗 full text (HTML)`](https://arxiv.org/html/2611.11396v1)

---

## 32. daily_stock_analysis: 69k stars, and the release notes read like an SRE changelog for LLM dependencies

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · +506 stars today · Nov 10 (~04:06 UTC+8)
- **Tags:** `llm` `agents` `chinese-oss`

**ZhuLinsen/daily_stock_analysis** — 69,086 stars, created Jan 2026 — is an LLM-powered multi-market stock analysis pipeline: multi-source market data, real-time news, a decision dashboard, automated notifications, and "支持零成本定时运行" (zero-cost scheduled runs). **v3.34.0 shipped Nov 9**, and its notes are a case study in agent-ops: default models updated across Claude, Gemini, OpenAI and DeepSeek to "减少旧模型退役导致的配置失败" (reduce configuration failures caused by retired models), with MiniMax M3.1 Flash preferred for new text channels; Market Light scoring now **excludes VIX moves** so a volatility spike stops reading as a market rally; an offline agent-trajectory evaluation gains a discussion-of-range-shift diagnostic; and an experimental Codex App Server backend was removed.

**Why it matters:** 69k stars on a pipeline whose release notes treat the model layer as infrastructure that breaks — and ship "model retired" fixes as versioned releases rather than hotfixes — is the Chinese open-source agent wave in miniature. The maintenance burden the notes describe (four providers' model deprecations in one release) is the cost that benchmarks never show.

[`🔗 ZhuLinsen/daily_stock_analysis`](https://github.com/ZhuLinsen/daily_stock_analysis) · [`🔗 v3.34.0 release notes`](https://github.com/ZhuLinsen/daily_stock_analysis/releases/tag/v3.34.0)

---

## 33. France attributes the supermarket-freezer attacks to Iran's Revolutionary Guards — freezers pushed from −27 °C to over 50 °C

- **Velocity:** ▮ steady
- **Source:** The Guardian · 60 pts on HN · Nov 10 (~03:33 UTC+8)
- **Tags:** `security` `attribution` `critical-infrastructure`

France has formally attributed October's supermarket-freezer cyber-attacks to Iran: a minister in Paris confirmed "the Islamic Republic of Iran's Revolutionary Guards are responsible for this attack", and the Paris prosecutor tied the operation to **Shahid Kaveh**, an IRGC-linked cyber unit, citing "the use of Farsi and IP addresses traced back to devices located in Iran". The Oct 11–12 attacks remotely overrode temperature controls in "as many as 700 supermarkets and shops across France, pushing them from as low as -27C (-16.6F) to well over 50C (122F)"; thousands of tons of food were dumped, and in some stores the heat sparked fires and sprinkler damage. Similar incidents hit fridges in other European countries last week, and a French blood bank's cold stores had temperature and defrosting thresholds raised before alarms let technicians intervene.

**Why it matters:** Attribution is unusually direct — an investigation naming the unit's leadership — and the target class is mundane control systems, refrigeration, where the physical effect is immediate and the security posture is anything but hardened. The escalation logic in the piece is the warning worth carrying: "they are attacking easy equipment but as a state group that has the means, the determination and the time, we should be prepared to see attacks on other systems like water or electricity."

[`🔗 The Guardian: France blames Iran's Revolutionary Guards`](https://www.theguardian.com/world/2026/nov/09/france-blames-irans-revolutionary-guards-for-cyber-attacks-on-supermarket-fridges) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50430585)

---

## 34. Amazon's internal ticketing replaced Sonnet 4.6 with a decision model — 44× cheaper, and they measured it live

- **Velocity:** ▮▮▮ trending
- **Source:** strandsagents.com · 374 pts on HN · Nov 10 (~14:01 UTC+8)
- **Tags:** `amazon` `decision-models` `cost`

Amazon engineers Carr Onstott and Mehul Jaiswal moved an internal ticketing system's 20-way classification — "customer escalations, capacity requests, automated alarms, security findings" — from **Claude Sonnet 4.6 on Bedrock** to **Strands Decider E4B** (a Gemma 4 build of the month-old decision model that "cannot generate text" and "returns a probability for each option plus a confidence score"), served on SageMaker `ml.g5.xlarge` (A10G, 24 GB, ~19 GiB resident, ~640 ms/request). Measured over live traffic: **$0.0005 vs $0.0222 per ticket** — "about 44 times cheaper than Sonnet, a 98% reduction" — **897 ms vs 4,215 ms** average, **2,010 vs 6,724 tokens**, output dropping from 170 tokens to 1. On accuracy the post offers only "The results showed E4B beating production Sonnet on a separate set of our tickets" — no number.

**Why it matters:** The deployment mechanics are the transferable part: a three-way AppConfig switch (`BEDROCK`/`DUAL`/`DECIDER`) dual-ran both models on live traffic — "told us more than any offline eval would have" — and "going back was a 45-second config change." Two honest surprises are worth carrying: "One thing that surprised us was that JSON key order changed the answer" (shifts up to 0.19, so they now sort keys), and the stated limits — no explanations per label, a catalog that must not change weekly, context within the 4,096-token window; outside those, "a decision model probably can't replace the LLM's job."

[`🔗 Amazon saves millions by replacing Sonnet with Strands Decider`](https://strandsagents.com/blog/amazon-saves-millions-replacing-sonnet-with-strands-decider/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50436640)

---

## 35. Fireworks AI breach reached Notion customers — model weights and datasets among the accessed data

- **Velocity:** ▮▮▮ trending
- **Source:** Notion security notice · 70 pts on HN · Nov 10 (~15:19 UTC+8)
- **Tags:** `security` `ai-infrastructure` `breach`

The October breach at **Fireworks AI** — the inference provider used for Notion AI — is now a two-company disclosure. Fireworks' updated bulletin says the evidence "indicates links to a cybercriminal threat actor group, which is financially motivated" and engaged in **LLMJacking** (selling unauthorized LLM access tokens to illicit gateways); a second wave came when a third-party cloud provider hosting Fireworks R&D machines was breached **Oct 23**, and "the unauthorized third party used it to reach Fireworks development machines and then run an unauthorized workload" on Oct 24. Accessed: resource metadata, billing information ("Payment card numbers are not stored by Fireworks and were not impacted"), and — "for certain customers, **a subset of incomplete model weights and datasets were accessed**." Notion's notice says **"<1% of Notion workspaces may have been affected"**, all of them users of the Insights feature, now disabled: "Some unattributable chat sessions with Notion AI may have been exposed" — transcripts "weren't labeled with who wrote them or which workspace they came from" and "did not contain tool call results." Notion disconnected and deleted its Fireworks data on Nov 3, was alerted to customer-data access on Nov 6, and confirmed the dataset on Nov 8.

**Why it matters:** The chain is the modern AI-supplier risk in one diagram: a vendor of your vendor gets breached, and the asset that leaks is not PII but **proprietary fine-tuning artifacts** — someone else's incomplete model weights. Note what both companies are careful about: Fireworks says its investigation has "not detected any impact" to its ZDR products (Inference, Training SDK, Nexus), its investigation "is ongoing and may reveal additional information", and Unit 42 is on forensics; Notion's advice to affected users is credential rotation — "If you or anyone on your team pasted sensitive information like passwords, API keys, or other credentials into Notion AI during this timeframe, we recommend rotating them right away."

[`🔗 Notion: security incident involving a third-party AI vendor`](https://www.notion.com/help/security-incident-involving-a-third-party-ai-vendor) · [`🔗 Fireworks bulletin: October 2026 incident update`](https://fireworks.ai/security/bulletins/october-2026-security-incident-update)

---

## 36. Simon Willison gave Claude Code ears: four devices, acoustic ranging, and a 40 cm answer

- **Velocity:** ▮▮▮ trending
- **Source:** simonwillison.net · 218 pts on HN · Nov 10 (~08:10 UTC+8)
- **Tags:** `agents` `claude-code` `hardware-hacking`

An intermittent beep in a room of moving boxes, too rare to locate by ear — so the "Beep Locator" was built: a Python web server coordinating **two iPads, an iPhone, a MacBook Pro and a Surface Ultra** over WebSockets, each running browser-WebAudio listeners with FFT + high-pass beep detection, devices pinging sounds at each other to estimate positions, then aligning audio clips on a chirp to triangulate the mystery tone (**3345 Hz**). The agent loop: **Claude Code with Opus 5.5** (Extra thinking) started the project from Willison's iPhone from a `problem.md` prompt, then **Fable 5.2** took over on the laptop — monitoring the running system, making live changes, and using an `installModule()` path to push new JavaScript to listeners without re-granting microphone permissions. Claude itself surfaced the prior art: the **2007 BeepBeep paper** (Peng et al.), acoustic ranging via "two-way sensing, self-recording, and sample counting."

**Why it matters:** The result — "It gave me the position of the beep to within about 40cm", resolved to "an ancient carbon monoxide detector that desperately wanted its batteries replaced" — is almost beside the point. The design idea is that an agent without audio input can still *hear*: "it can run JavaScript and Python code that can analyze audio", query its own logs, and reconfigure its own sensor fleet mid-task. That's the agent-as-instrumentalist pattern in miniature, with a measurement to show for it.

[`🔗 Locating the source of a mysterious beep`](https://simonwillison.net/2026/Nov/9/mysterious-beeps/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50434310)

---

## 37. A protest certificate: the RSA key's base64 encoding itself carries the message — "no one checks these things"

- **Velocity:** ▮▮ rising
- **Source:** maurycyz.com · 183 pts on HN · Nov 10 (~08:07 UTC+8)
- **Tags:** `tls` `certificates` `security`

A fresh write-up (dated Nov 8–9) demonstrates a **protest certificate**: a real Let's Encrypt-issued certificate for maurycyz.com whose RSA public key is built so its **base64 encoding spells ASCII text** (the modulus bytes are picked to make the encoding say it — decode the modulus itself and it stays high-entropy; verified live this run, same serial `0643A4BAEC9A375CA90F73C03EB2CCC93EED` as the article's PEM) — `//You+dont+actually+have+to+pick+random+private+keys//No+one+checks+these+things//A+certificate+authority+got+away+with+the+number+4+for+a+year//` — visible to any client via `openssl s_client -connect maurycyz.com:443 </dev/null | sed -n '/BEGIN/,/END/p' | grep -zE '////.?*////'`. The motivation is stated flatly: TLS's ACME machinery is heavy and certificates expire, "and the whole system doesn't even work because certificates are issued over plaintext connections, and trusted certificate aurthorities [sic] use very secure keys like '4'" — a direct reference to the compromised CA key with `d = 4` from October. The author still wants encryption ("Passive eavesdropping is a real risk… but preventing it doesn't require the whole certificate thing"), so the certificate is valid and browsers accept it; even a vanity private key like "313333333337 (one of the most eleet primes)" would go unnoticed, because "A good protest should be obvious."

**Why it matters:** The demo is a working measurement of a blind spot: certificate authorities validate *possession* of a key, not its provenance or strength, so the key material is a writable channel — one that survived automated issuance at a real CA. It is also this feed's second encounter with the site's own quirk: maurycyz.com serves machine-generated babble twin pages to some fetchers — a reader here pulled nonsense pages twice — and the real article only renders for requests it likes; the footer reads "This website is not licensed for LLM training or content creation."

[`🔗 Horrible public key tricks`](https://maurycyz.com/projects/badcert/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50434264)

---

## 38. Your TV can see through walls: motion detection with an antenna and a spectrum waterfall

- **Velocity:** ▮▮ rising
- **Source:** maurycyz.com · 153 pts on HN · Nov 10 (~13:24 UTC+8)
- **Tags:** `rf` `sdr` `privacy`

The same author's RF demo (written Aug 2025 – Feb 2026, hitting HN today): record a local **ATSC digital TV station** (~490 MHz) with an **Ettus USRP B200** and watch the spectrogram. The direct signal interferes destructively with a strong reflection — **selective fading** — and because the cancellation is path-length dependent, any movement in the path draws stripes: "The gaps between the stripes happen when my reflection perfectly cancels out the residual signal, which happens each time the path length changes by one wavelength." From stripe spacing (~70 pixels at a 150 Hz waterfall update) the author computes walking speed: 0.47 s per stripe → 2.1 Hz → **1.3 m/s = 4.6 km/h** — matching the actual pace, with no adjustment needed because the walk was perpendicular to the signal path.

**Why it matters:** The mechanism is elegant precisely because it's passive — no camera, no microphone, just a receiver and arithmetic on phase cancellation; the same geometry governs any wideband signal ("any wideband radio signal like WiFi or LTE can be used in much the same way"). The privacy implication is the old one restated at a new frequency: a building's radio environment is a motion sensor pointed at everyone inside it, and the author's sign-off is "Happy paranoia!"

[`🔗 Your TV can see through walls`](https://maurycyz.com/projects/fading/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50436410)

---

## 39. Formalizing CPython: agents rewrote the interpreter into Lean — 418 bug reports, 55 crashable from ordinary Python

- **Velocity:** ▮▮ rising
- **Source:** broyojo.com · 86 pts on HN · Nov 10 (~09:56 UTC+8)
- **Tags:** `research` `formal-methods` `python`

**David Andrews and Chao Zhang** point agents ("Opus 5.5") at **CPython 3.15.2** and rewrite its functions line by line in **Lean 4**, each function passing a four-step gate: copy into Lean preserving quirks like unsigned wraparound, test against real Python on **≥50,000 inputs**, prove a property, then an independent second agent reviews — the gate question is "could a broken version of the function pass it too?", because "A valid proof about a wrong copy is the most misleading result you can get." Ten days in (started Oct 29): **18,898 theorems and lemmas**, **613,318 lines of Lean**, **4,071 of 26,004 functions (15.7%)** — grammar rules 100%, built-ins 35%, parser 31%, C modules 19%, interpreter core 10%, stdlib 9%. Output so far: **418 bug reports**, of which "about 55 can crash the interpreter or corrupt memory from ordinary Python code", plus 129 cases where a module's C and pure-Python versions disagree.

**Why it matters:** The scale is what distinguishes this from a formal-methods demo: 588 statements were proved *false with counterexamples* against the real interpreter, and the crash list is concrete — a `setdefault` on an attribute dict with a `StrEnum` key that segfaults, a backwards slice assignment on an ElementTree element that duplicates one child and loses another. The pipeline itself (test-vs-real-Python before proof, adversarial second-agent review) is a reusable recipe for agent-driven verification of any C codebase, and the work is open: the repo is Apache-2.0, pushed today.

[`🔗 Formalizing CPython`](https://broyojo.com/python-formalization/) · [`🔗 Broyojo/python-formalization`](https://github.com/Broyojo/python-formalization) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50435105)

---

## 40. tokio-rs/topcoat: the tokio org's batteries-included web framework ships its third release in five weeks

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · +192 stars today · Nov 10 (~20:15 UTC+8)
- **Tags:** `rust` `web-framework` `github-trending`

**tokio-rs/topcoat** (Rust, MIT, **6,591 stars**, created April 2026) is trending at +192/day as **v0.12.0 landed Nov 9** — and the release note opens with unusual candor: "This release reworks some foundations of Topcoat. Most apps will need many small edits. **We are sorry for the churn**, but we believe these changes make Topcoat simpler and more extensible." The cadence is the signal: v0.10.0 (Oct 3) added client-side navigation (`runtime::link` — updates page, title and history while preserving shared signals and restoring scroll), v0.11.0 (Oct 24) added localization on **Fluent** with translation checks, and v0.12.0 unifies context handling (one context, route context, router settings) and the macro style ("context comes first", "one argument style").

**Why it matters:** A "batteries-included" server-rendered Rust web framework coming from the tokio org itself — the project that owns the async runtime under axum and actix — is an opinion about where Rust web development should go: toward one integrated stack instead of a parts bin. The apology for breaking churn in a 0.x series is the honest part; three releases in five weeks with an upgrade guide in each is the moving-fast part, and both are worth reading before starting an app on it.

[`🔗 tokio-rs/topcoat`](https://github.com/tokio-rs/topcoat) · [`🔗 v0.12.0 release notes`](https://github.com/tokio-rs/topcoat/releases/tag/v0.12.0)

---

## 41. ha-mcp: 792 stars in a day for an MCP server that lets Claude run your Home Assistant

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · +792 stars today · Nov 10 (~20:15 UTC+8)
- **Tags:** `mcp` `home-automation` `github-trending`

**homeassistant-ai/ha-mcp** (Python, MIT, **6,337 stars**) is the day's fastest-rising trending repo at **+792 stars**: an MCP server plus Home Assistant custom component that lets Claude, ChatGPT and other assistants "configure and automate Home Assistant" — and the release discipline is agent-shaped too. **v9.1.2** shipped Nov 8, and the v9.2.0 development pre-releases are rolling in the same day this feed is written (dev3452 at 03:52 UTC, dev3454 at 11:35 UTC), whose changelog lines read like agent-ops: "fix: tell agents how to guard a python_transform edit (#3022)". Install goes through HACS, with a pre-release switch for the dev channel.

**Why it matters:** The smart-home agent wave is arriving as *infrastructure*, not demos — a 6.3k-star project whose own commits are about teaching agents to be careful with live household state (`python_transform` edits that can break automations). When the interface to a physical home is a model with tools, the changelog becomes a safety document, and this project is visibly writing it that way.

[`🔗 homeassistant-ai/ha-mcp`](https://github.com/homeassistant-ai/ha-mcp) · [`🔗 v9.1.2 release`](https://github.com/homeassistant-ai/ha-mcp/releases/tag/v9.1.2)

---

## 42. Sure: the community fork of abandoned Maybe Finance is shipping mobile builds — Android APK and unsigned iOS

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · +184 stars today · Nov 10 (~20:15 UTC+8)
- **Tags:** `fintech` `self-hosted` `github-trending`

**we-promise/sure** (Ruby, AGPL-3.0, **11,422 stars**, +184/day) states its lineage on the first line of the README: "This repository is a community fork of the now-abandoned Maybe Finance project." The self-hosted personal-finance app — dashboard, net worth, spending, an AI assistant that answers questions about your savings — is now beyond the web app: **v2026.11.8-alpha** (Nov 9) ships **mobile debug builds** (an Android APK and an unsigned iOS build), following v2026.11.3-alpha with goal-funding from crypto accounts and merchant logos. The stable line keeps its discipline: **v0.7.6** on Oct 31 notes "we haven't missed that cadence in more than a year!" The cost of the momentum is visible in the counter: **871 open issues-and-pull-requests**.

**Why it matters:** The Maybe-to-Sure handoff is the open-source-finance story of the year resolving itself: the original project open-sourced and shut down in 2024, and a community org has now carried it 11k stars past the grave — with a release cadence, a mobile client, and the AI-assistant layer bolted on. For anyone evaluating self-hosted fintech, the honest read is in the numbers: a year of unbroken monthly releases is real reliability; 871 open issues-and-PRs is the queue behind it.

[`🔗 we-promise/sure`](https://github.com/we-promise/sure) · [`🔗 v2026.11.8-alpha release notes`](https://github.com/we-promise/sure/releases/tag/v2026.11.8-alpha) · [`🔗 v0.7.6 release notes`](https://github.com/we-promise/sure/releases/tag/v0.7.6)

---

## 43. Queens Public Library hit by ransomware: all locations open, but the website, app and renewals are down

- **Velocity:** ▮ steady
- **Source:** connect.queenslibrary.org · 58 pts on HN · Nov 10 (~17:04 UTC+8)
- **Tags:** `ransomware` `public-services` `security`

Queens Public Library — one of the largest US library systems — posted an outage notice on a separate domain: "We are open as scheduled but experiencing a significant network outage affecting all locations", and "This disruption, the result of a **ransomware attack**, impacts the following services": the website, the QPL mobile app, public computers at most locations, and digital media services. Partially restored: free Wi-Fi everywhere, check-out and return machines, and public computers at seven branches (Central Library, Far Rockaway, Flushing, Glen Oaks, Hunters Point, Jackson Heights, Kew Gardens Hills). Borrowing works, "During this outage, however, renewals are unavailable", and "customers are not charged late fines on borrowed materials." The page carries no incident date and no group attribution — it is a rolling status page.

**Why it matters:** The pattern is now routine for municipal institutions — the public-facing domain goes dark and updates migrate to an out-of-band host — but the operational details here are the interesting part: a library can keep lending with paper and desks while its catalog, its computers and its digital collection are the actual hostages. That's the ransomware calculus for public services: the interruption is the demand, and every restored service (Wi-Fi first, renewals last) is a triage decision made in public.

[`🔗 Queens Public Library outage notice`](https://connect.queenslibrary.org/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50437790)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-10T12:33:35Z |
| Items | 43 |
| Sources tracked | 43 (Hacker News, GitHub Trending, NVD, CISA KEV, arXiv, vendor blogs, security advisories) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[Previous day](2026-11-09.md) · [Raw .md](https://trending.md/en/feed/2026-11-10.md) · [Archive](../archive/)
