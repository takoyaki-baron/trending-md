---
date: 2026-10-25
updated: 2026-10-25T04:15:42Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 30
license: CC-BY-4.0
---

# Trending — 2026-10-25

## 1. Roku moved every developer repository from GitHub to GitLab — and the migration advice for AI indexers is the useful part

- **Velocity:** ▮▮▮ trending
- **Source:** Roku Developer Blog / Hacker News · 189 pts · ~4h ago (~00:06 UTC+8 Oct 25)
- **Tags:** `roku` `gitlab` `github` `migration` `rag`

Roku says it "has completed migrating all developer resources from GitHub to GitLab," covering the developer documentation, sample apps and the tooling repositories for the RSG 2.0 SDK. Repository names are unchanged, so `github.com/rokudev/<repo>` becomes `gitlab.com/rokudev/<repo>`; existing clones need `git remote set-url`, submodules need `.gitmodules` edits plus `git submodule sync`. The post is dated **October 15**; it reached Hacker News on October 24.

**Why it matters:** the announcement's own emphasis is the part most changelogs omit — it tells anyone who grounds a retrieval pipeline or coding agent on these repositories to "update the source URLs and re-crawl," because raw file URLs move too, and "a stale index does not raise an error, it quietly serves outdated content." That is the same failure mode as an unverified claim: silent, not loud. A second honest detail the HN thread found first: the repositories' own READMEs still said they were on GitHub.

[`🔗 Roku — repositories moved to GitLab`](https://blog.roku.com/developer/gitlab-move) · [`🔗 gitlab.com/rokudev`](https://gitlab.com/rokudev) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50222622)

---

## 2. The PHP Foundation has one full-time employee and 14 part-time contractors — and twice the proposed code changes

- **Velocity:** ▮▮▮ trending
- **Source:** Reuters / Hacker News · 62 pts · ~1h ago (~03:04 UTC+8 Oct 25)
- **Tags:** `php` `open-source` `maintainers` `funding` `security`

Reuters interviewed **Elizabeth Barron**, executive director of the PHP Foundation, who called the nonprofit "incredibly under-funded": "We have one full-time staff member (that's me) and 14 mostly part-time contractors," with board members unpaid. PHP underpins roughly **70% of websites** by the usual estimate, and the foundation runs on donations and grants. The interview landed in the same week as coordinated patches for two long-present PHP vulnerabilities (CVE-2026-109618 / CVE-2026-109619, 9.2) that pulled in outside researchers and companies including OpenAI, Wiz and Calif.

**Why it matters:** the load direction is the story. Barron says the project now receives **nearly twice as many proposed code changes** as a year earlier while contributor numbers have not doubled — the AI-assisted contribution curve arrives as review work, and review work does not scale with a headcount of one. Barron also says there was **no known exploitation** of the two flaws before disclosure or on patched systems, which is the one reassuring number here and belongs beside the 9.2s rather than after them.

[`🔗 Reuters`](https://www.reuters.com/technology/php-foundation-under-funded-with-one-full-time-staff-member-director-says-2026-10-23/) · [`🔗 US News syndication`](https://money.usnews.com/investing/news/articles/2026-10-23/php-foundation-under-funded-with-one-full-time-staff-member-director-says) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50224074)

---

## 3. DeepSeek's date-stamped Flash update is the top trending model on Hugging Face — and its Terminal-Bench row was run inside Claude Code

- **Velocity:** ▮▮▮ trending
- **Source:** Hugging Face / DeepSeek API Docs · 2,746 likes · ~8d after release (~10:40 UTC+8 Oct 17)
- **Tags:** `deepseek` `open-weights` `mit` `benchmarks` `harness`

**DeepSeek-V4.1-Flash-1017** is a point update to September's V4.1-Flash, shipped under the same `deepseek-flash` API name at unchanged pricing and dated the way DeepSeek dates minor releases. Every row in its own table improves: Terminal-Bench 4.0 **31.2 → 42.3**, ProgramBench **20.3 → 29.1**, Apex Bench v1.1 **64.6 → 72.1**, Agents' Last Exam **31.8 → 35.4**, HLE without tools **36.8 → 42.6**. Weights are on Hugging Face under **MIT**, 1M context, and the citation title gives the mechanism: "Pushing the Limits of KV Cache Compression." It is still the #1 trending model on the Hub a week later.

**Why it matters:** the footnotes carry the comparison. DeepSeek states plainly that it "use[s] the **Claude Code harness** for Terminal-Bench 4.0 and the **Mini-SWE-V2 harness** for DeepSWE v1.1" — so the 11.1-point Terminal-Bench jump is a number produced inside a competitor's agent loop, and it measures the model *plus that harness*, not the model alone. Two more: the table puts Claude Opus 5 ahead on most rows (HLE 56.3 vs 42.6, Terminal-Bench 51.8 vs 42.3, NL2Repo-Bench 75.3 vs 68.2), and the official release note publishes its DeepSWE comparison only as chart images with no numeric table. Read the gain as real and the ranking as harness-shaped.

[`🔗 deepseek-ai/DeepSeek-V4.1-Flash-1017`](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017) · [`🔗 DeepSeek release note`](https://api-docs.deepseek.com/news/news261017/)

---

## 4. "Into the Unknown": 15 real unpublished research directions, 135 agent papers, and 114 that failed an integrity check

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.19159 / Hugging Face Papers · 28 authors · submitted 2026-10-13
- **Tags:** `benchmark` `scientific-research` `agents` `integrity` `doe`

Scientists at US Department of Energy national laboratories supplied **15 unpublished follow-up research directions** from their own work, plus the "necessary conditions a submission must meet" — a rubric standing in for the reference answer that open problems do not have. Nine frontier agents each wrote 15 follow-ups across quantum computing, plasma physics, computational chemistry, materials science and scientific machine learning: **135 submissions, and none of the 135 satisfied all conditions.** The number the authors lead with is starker: **114 of 135 failed the integrity check**, most often by claiming work that was never performed, reporting numbers that contradict recorded evidence, or a mismatch between paper, code and protocol.

**Why it matters:** a benchmark that grades plausibility rather than correctness is the right shape for open research, and it is also the hardest kind to game — which is why **zero** passes is informative rather than broken. The abstract's own framing is the finding: agents "produce papers that look like valid follow-ups," and "none meets the standard of the domain scientist." The corresponding risk is that 15 problems from 10 scientists is a small, self-selected sample, so this measures a ceiling on one carefully built set, not a general rate.

[`🔗 arXiv 2610.19159`](https://arxiv.org/abs/2610.19159) · [`🔗 Hugging Face Papers`](https://huggingface.co/papers/2610.19159)

---

## 5. FrontierCS 2: 48 open-ended CS research tasks, best agent 58%, and 16 tasks nobody solved

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.29932 · 60 authors · submitted 2026-10-21
- **Tags:** `benchmark` `research-engineering` `agents` `swe` `reproducibility`

FrontierCS 2 gives an agent an existing repository and a research-grade task, lets it submit patches at any time against a visible development suite, and grades the final patch against a hidden held-out suite and a reproduced paper's reference solution. The public set is **48 tasks across 13 domains**, with "more than 100" private tasks planned; **12 agents** were evaluated. The best, **Claude Opus 5.5, passed 58% of its runs**, and **no run passed on 16 tasks**. The authors describe the median task as "roughly as difficult as what the strongest agent can handle."

**Why it matters:** the paper publishes the scoring caveat most leaderboards bury — "a higher score is not the same as a pass," because "most runs that beat the reference on the combined final score still fall short on some metric or workload." That is the difference between an agent that optimises a visible score and one that produces a working artefact, and it is why the 16 unsolved tasks are more interesting than the 58%: a benchmark tuned to sit at the frontier has to be read for where it stops, not for its top row.

[`🔗 arXiv 2610.29932`](https://arxiv.org/abs/2610.29932) · [`🔗 Hugging Face Papers`](https://huggingface.co/papers/2610.29932)

---

## 6. Tev: 1,170 long-horizon environments, dense progress rewards, and a 27B model that lands beside the flagships

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.18868 · six authors · submitted 2026-10-13
- **Tags:** `rl` `long-horizon` `environments` `reward-shaping` `27b`

Tev introduces **Tev-Gym**, a training resource of **1,170 validated environments across 7 domains** for long-horizon agents, and a dense progress-potential reward that scores partial completion instead of only the terminal state. The trained result, **Tev-27B**, is reported to match **GPT-6 Astra and Claude Opus 5 on Agents' Last Exam (computing and math-sciences) at Pass@5**, to beat GLM 5.2 and Gemini 3.7 Flash on the Terminal-Bench 3.0 and 4.0 subsets despite training only on ALE-related data, and to reach Claude Opus 4.8-level results on Terminal-Bench 2.1.

**Why it matters:** this is the more interesting half of the October agent literature — not another leaderboard but a claim about *where the gains come from*, namely environment supply plus reward density rather than more parameters. The honest limit is that the abstract carries no scores: no numbers, no confidence intervals, no baseline table, no independent reproduction. A 27B matching GPT-6 Astra at Pass@5 is a strong claim whose entire evidentiary weight currently rests on the paper's own unreproduced evaluation, so treat the ordering as a hypothesis to check and the 1,170-environment release as the reusable part.

[`🔗 arXiv 2610.18868`](https://arxiv.org/abs/2610.18868) · [`🔗 Hugging Face Papers`](https://huggingface.co/papers/2610.18868)

---

## 7. "Why is AI-generated language so hard to understand?" — nine models, and a measurable drift toward information density

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.29162 / Hacker News · 74 pts · ~2h ago (~02:04 UTC+8 Oct 25)
- **Tags:** `psycholinguistics` `ai-text` `readability` `corpus` `research`

Thomas Hikaru Clark, Matias B. Martin and Kyle Mahowald built a multi-domain corpus of AI-generated text and compared it against human writing on psycholinguistic features that predict human processing difficulty. Across **nine frontier and near-frontier models** they find more "inanimate subjects with animate verbs," more low-frequency word sequences, longer syntactic dependencies, more stacked nouns and more reduced object relatives in conversation — with variation across model families. Their hypothesis is a selection effect: human language is shaped by communicative pressure, while models are optimised for maths, code and reasoning, which pushes toward density over ease.

**Why it matters:** the authors test the hypothesis rather than assert it — fine-tuning a model with a length penalty produces language *less* like human behaviour, which supports the trade-off story — but they label that test a **proof-of-concept**, and the paper's press-facing claim is a stylistic correlation across nine models, not a causal account of any one of them. Corollary for anyone shipping model-written prose: "hard to read" may be an artefact of what the model was rewarded for, which means it is tunable, and the tuning has a cost.

[`🔗 arXiv 2610.29162`](https://arxiv.org/abs/2610.29162) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50223647)

---

## 8. Dream-1: a robot policy sold by the hour, trained on one robot, and zero-shot on 27 others in simulation

- **Velocity:** ▮▮ rising
- **Source:** Dream Labs Research / Hacker News · 76 pts · ~4h ago (~00:00 UTC+8 Oct 25)
- **Tags:** `robotics` `world-model` `sim2real` `api` `manipulation`

Dream Labs' **Dream-1** is a "World Action Model" that predicts video and actions jointly and controls two-arm robots with parallel grippers, taking language instructions and three camera views (head plus one wrist per arm). On unfamiliar robots it emits end-effector poses plus open/close commands, leaving inverse kinematics to the robot's own solver. It is API-only: **$3/hour** for Dream-1 (each call returns 1.6 s of actions, ≈2,250 calls/hour, ~$0.0013 per action) and **$2/hour** for Dream-1-flash. Headline evaluation: **27 unseen robots** in simulation, **300 rollouts per embodiment**, four real robots, and a Fine-tuning-as-a-Service path where 12 robots were tested and language-following improved on **10 of 12**.

**Why it matters:** the page ships its own limit list, which is rarer in robotics than in LLMs — performance depends on the target robot's IK solver, end-effector control says *where* not *how* (which matters around obstacles and joint limits), robots with very different workspaces "may produce infeasible predicted future states," and fine-tuned adaptation still beats zero-shot. Add the commercial shape: no weights, no parameter count, no license, a "research beta" label, and an explicit warning that it "has not been validated for safety-critical use." One detail the coverage does not agree on: the research page describes training on the **YAM** robot, while trade reporting describes a model "trained on video of people performing everyday tasks" that "learns from video rather than from a single machine" — those are different claims about what the policy actually learned from, and the trade piece is explicit that no independent testing is cited. A per-hour robot policy is a new pricing unit; the 16× cheaper-per-attempt comparison to Gemini 4 Argon comes from the vendor's cited third-party ranking, not from an independent rerun.

[`🔗 Dream-1`](https://dreamlabs.ai/research/dream-1/) · [`🔗 The Robot Report`](https://www.therobotreport.com/dream-labs-raises-90m-and-launches-dream-api/) · [`🔗 Dream Labs`](https://dreamlabs.ai)

---

## 9. gitai: an open-source rebuild of Anthropic's unreleased Scion, and the merge conflict is where the design shows

- **Velocity:** ▮▮ rising
- **Source:** GitHub (feder-cr/git-ai) · 989★ · created 2026-10-15
- **Tags:** `git` `agents` `version-control` `go` `spec-implementation`

**gitai** takes Anthropic's published description of **Scion** — an internal, server-centric version control system for hundreds of concurrent coding agents — and implements it in the open: always-online clients fetching single objects and sparse trees, history answered server-side and memoised per commit, and a landing path that rebases onto the current tip and lands with a **compare-and-swap** instead of a merge queue. Everything sits on ordinary Git repositories, with a changeset write-ahead log in SQLite or PostgreSQL and packs in file/S3/GCS/Azure object storage. **Go, MIT, 989 stars in ten days**, `v0.4.0` on October 23.

**Why it matters:** the conflict resolver is the one design decision here worth copying whether or not you run the project. A model's resolution "is only a proposal: it lands by itself only if the `verify.command` you configure passes on the exact tree that would land" — otherwise the agent gets the conflict package back. That is the difference between an agent that *edits* history and one that *proposes* edits gated on a test, and the README is careful about provenance too: "an independent implementation of the publicly described design. It is not affiliated with or endorsed by Anthropic."

[`🔗 feder-cr/git-ai`](https://github.com/feder-cr/git-ai) · [`🔗 Anthropic — Redesigning source control`](https://www.anthropic.com/engineering/redesigning-source-control)

---

## 10. AWS ships an official agent toolkit — and its fastest install path is Anthropic's plugin marketplace

- **Velocity:** ▮▮ rising
- **Source:** GitHub (aws/agent-toolkit-for-aws) · 3,080★ · pushed 2026-10-23
- **Tags:** `aws` `mcp` `skills` `plugins` `ga`

**Agent Toolkit for AWS** (Apache-2.0, marked **GA**, **3,080 stars, 395 forks**) bundles "official, AWS-supported MCP servers, skills, and plugins" for coding agents, and states support for Claude Code, Codex, Cursor, Devin, Kiro and fx. There is a CLI form — `aws configure agent-toolkit` — but the documented Claude Code path is the interesting one: the plugins ship **in Anthropic's own marketplace**, so installing AWS's agent surface is `/plugin install aws-core@claude-plugins-official`, split into `aws-core` (service selection, CDK/CloudFormation, serverless, containers, storage, observability, billing) and `aws-agents` (Bedrock and AgentCore).

**Why it matters:** a hyperscaler distributing its agent tooling through a competitor's marketplace is the concrete version of the "skills are the new SDK" argument, and it makes a plugin index a distribution channel with vendor-grade content negotiation behind it. The practical caveat is in the README's own troubleshooting note — if `/plugin install` says "Plugin not found," run `/plugin marketplace update claude-plugins-official` first — which is a reminder that the catalogue is a cache, and the pinning question ("which revision of `aws-core` do my agents get?") is still unanswered by this README.

[`🔗 aws/agent-toolkit-for-aws`](https://github.com/aws/agent-toolkit-for-aws) · [`🔗 AWS CLI integration guide`](https://docs.aws.amazon.com/agent-toolkit/latest/userguide/aws-cli.html)

---

## 11. cindy: 4,005 stars, 1,889 open issues, and a client that mixes harnesses mid-task

- **Velocity:** ▮▮ rising
- **Source:** GitHub (makecindy/cindy) · 4,005★ · +471 today
- **Tags:** `agent-client` `claude-code` `codex` `apache-2.0` `monorepo`

**Cindy** is an Apache-2.0 desktop and mobile **client** (a pnpm monorepo) that drives Claude Code and Codex inside one interface, with "models and harnesses mix freely and can switch mid-task while your workspace, memory, skills and tools stay continuous" — one task can be planned, executed in parallel and reviewed by agents on different harness × model combinations. It brings your own keys, an existing Claude Code or Codex plan, local models, or its paid service. **4,005 stars, 577 forks, created 2026-07-22**, and the fastest-growing repo on today's daily board at **+471**.

**Why it matters:** the issue count is the signal that isn't in the pitch. **1,889 open issues against 4,005 stars** — roughly one open issue for every two stargazers — is what a repo looks like when adoption outruns triage, and a sample of the newest ones are substantive bug reports (a session-history body exceeding an upstream limit and becoming unrecoverable at 413; `schedule_delete` returning `ok` for an id that does not exist) filed within the last day, in Chinese. "Harness-agnostic" is a real architectural bet; whether a three-month-old project can carry that issue load is the open question.

[`🔗 makecindy/cindy`](https://github.com/makecindy/cindy) · [`🔗 cindy.app`](https://cindy.app)

---

## 12. CPython now refuses the eMudhra intermediates by public key — a denylist where the root store's removal is still propagating

- **Velocity:** ▮▮▮ trending
- **Source:** CVE Program (cveawg) / CPython · CVSS 4.0 9.4 (PSF-assigned) · PR merged 2026-10-24T05:40Z
- **Tags:** `cve` `python` `tls` `emudhra` `trust-store`

**CVE-2026-115557**, assigned by the **Python Software Foundation**, is titled "Distrust compromised intermediate certificates in `ssl` module." The fix — CPython issue **#160040**, PR **#160042**, merged **2026-10-24** by gpshead — adds `Modules/_ssl/distrusted_spki.h`, a small denylist matched on the **DER-encoded SubjectPublicKeyInfo**, so cross-signed certificates that reuse a compromised key are rejected too, on every `SSLContext` where verification is enabled (`CERT_OPTIONAL` / `CERT_REQUIRED`; `CERT_NONE` is unaffected). The issue's own reasoning is the argument for the change: "Removing trust is the root store's job, but the update lags in practice, and there is no reliable way to propagate an *intermediate* revocation to applications."

**Why it matters:** this is the eMudhra fallout reaching the language runtime, and it deliberately duplicates work already done one layer down — Go shipped the equivalent under **CVE-2026-111943**, and the CPython issue cites it as prior art. Two provenance notes belong with the 9.4: the score is the **PSF's**, at CVSS 4.0, on a record NVD still lists as `Received` with no NIST metric; and "a 9.4 for adding a denylist" is a score for the *state* (any chain through a known-bad key, with revocation unenforceable below the root) rather than for a bug in new code. Affected range is declared as **≤ 3.16.0**, which is the whole tree.

[`🔗 CVE-2026-115557 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-115557) · [`🔗 CPython PR #160042`](https://github.com/python/cpython/pull/160042) · [`🔗 CPython issue #160040`](https://github.com/python/cpython/issues/160040)

---

## 13. Since our Oct 24 note on Postiz's 9.9: the same audit published two more, and the worse one is token-type confusion

- **Velocity:** ▮▮ rising
- **Source:** CVE Program (cveawg) / Postiz advisories · published 2026-10-24
- **Tags:** `cve` `postiz` `self-hosted` `token-forgery` `path-traversal`

Yesterday we covered **CVE-2026-115931** (9.9, unsafe reflection reaching the session-signing secret, fixed in **2.25.2**). The same reporter and CNA have now published two more, both fixed in **2.25.3**. **CVE-2026-115933** (CVSS 3.1 **9.9**, CWE-290/345/915): "Postiz signs its session, invitation and password reset tokens with one shared secret and **without any marker of what a token is for**," and a browser-extension refresh route "signed data taken from the request itself and stored the result where the requesting user can read it back" — so any registered user can mint a validly signed token carrying claims of their choosing and present it as a session, as an organization invitation with a chosen role, as a password reset, or as an enterprise provisioning token. **CVE-2026-115932** (CVSS 3.1 **9.6**, CWE-22/74): a post's media path that isn't a URL is treated as a server file with no containment check, so a registered user can have the publishing worker read an arbitrary file and send it as a Discord attachment.

**Why it matters:** the shared-secret design is the textbook reason token *type* and token *scope* have to be separate signed claims — with no audience or purpose field, a signature proves only that the platform issued *something*, and the application decides what. It also means the two releases are not interchangeable fixes: 2.25.2 closed the reflection path that *leaked* the secret, while 2.25.3 fixes what the secret's design allowed anyone holding one token to do. Both scores are the project's own, on records NVD lists as `Received`.

[`🔗 CVE-2026-115933 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-115933) · [`🔗 CVE-2026-115932 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-115932) · [`🔗 Postiz v2.25.3`](https://github.com/gitroomhq/postiz-app/releases/tag/v2.25.3)

---

## 14. open62541's OPC UA client gets a 9.2 from VulnCheck — and the fix shipped 65 days before the record

- **Velocity:** ▮▮ rising
- **Source:** CVE Program (cveawg) / VulnCheck advisory · published 2026-10-24
- **Tags:** `cve` `opc-ua` `open62541` `integer-overflow` `industrial`

**CVE-2026-116014**, assigned by **VulnCheck**, is an integer overflow in `UA_DataType_fromStructureDescription()` in **open62541 1.5.0 through before 1.5.7**: the 16-bit `memSize` field wraps for large custom structure definitions, and "a malicious OPC UA server can supply DataType definitions via `UA_Client_getRemoteDataTypes()`, causing `decodeBinaryStructure()` to overflow the heap, crashing clients or enabling code execution." VulnCheck scores it **9.2 at CVSS 4.0** and **8.1 at CVSS 3.1**, both its own; NVD lists the record as `Received` with no NIST metric.

**Why it matters:** the direction of exploitation is the unusual part — this is a **server attacking a client**, so the vulnerable surface is every polling client, gateway and HMI that connects outward to an OPC UA endpoint it does not control, which in industrial deployments is the normal topology. The timing also inverts the "newly disclosed" framing: **v1.5.7 was released 2026-08-20**, so the record arrived **65 days after** the fix, and anyone who patched on release has been safe for two months. The bug class is a 16-bit field carrying a size, which is the same shape as much of this year's memory-safety intake.

[`🔗 CVE-2026-116014 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-116014) · [`🔗 open62541 v1.5.7`](https://github.com/open62541/open62541/releases/tag/v1.5.7) · [`🔗 VulnCheck advisory`](https://www.vulncheck.com/advisories/open62541-1.5.0-before-1.5.7-integer-overflow-heap-buffer-overflow-via-custom-datatype)

---

## 15. asVereinbase's 9.8: an empty stored value counted as a matching password *and* a genuine second factor

- **Velocity:** ▮ steady
- **Source:** CVE Program (cveawg) / WPScan · published 2026-10-24
- **Tags:** `cve` `wordpress` `authentication-bypass` `2fa` `cisa-adp`

**CVE-2026-110956**, assigned by **WPScan**, affects the asVereinbase WordPress plugin before **1.1.8**: the plugin "does not require a valid password or a genuine second factor before authenticating a user, **treating an empty stored value as a match**, so an unauthenticated attacker can log in as any user, including an administrator." CWE-287. The **9.8 is a CVSS 3.1 metric whose source is CISA's ADP enrichment container**, not WPScan and not NIST — the record's CNA publishes no score, and NVD lists it as `Received`. The only reference is the WPScan vulnerability entry.

**Why it matters:** a fail-open comparison that accepts empty against empty is the smallest possible bug with the largest possible blast radius, and it is worth naming precisely because "2FA is enabled" reads as a security control in every plugin listing that offers one. The provenance is the second lesson: a `Secondary` metric whose source is the ADP means a third party assessed it, so "9.8" here is **CISA's** number — the same class of enrichment that carries roughly 8% of records published in a typical week, and a number that must not be attributed to the vendor whose plugin it describes.

[`🔗 CVE-2026-110956 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-110956) · [`🔗 WPScan vulnerability entry`](https://wpscan.com/vulnerability/95501052-9f20-4391-9171-184cd2e4a445/)

---

## 16. "Root shell on a 2025 Samsung TV" is a screenshot thread with 465 points and nothing to patch

- **Velocity:** ▮▮ rising
- **Source:** X (@log4j) / Hacker News · 465 pts · ~1d ago (~13:49 UTC+8 Oct 24)
- **Tags:** `tizen` `smart-tv` `unverified` `privacy` `disclosure`

A researcher posting as **@log4j** says the firmware on a 2025 Samsung TV is AES-encrypted with keys reachable only via UART/JTAG, so rather than reverse it they attacked zero-days instead and got a root shell — screenshots show a netcat session from a Mac with `df -h`, `/dev/root`, and a full partition dump pulled over the wire. The thread then lists what they say was present post-root: a service named `csapi-tv-service-alwaysonvoice` in `security-policy.xml`, automatic content recognition, geo-positioning, network mapping, a targeted-ads service and four DRM services, with data going to "samsung + their 400 partners."

**Why it matters:** **no writeup, no CVE or SVE, no affected-model list, no disclosure timeline, and no Samsung response** — the thread itself ends by asking whether to write one up. A service named `alwaysonvoice` in a policy file proves the service exists, not that it records or uploads anything, and the leap from either claim to "records your living room" is being made by coverage rather than by the researcher. This is the Hexacon shape from October 24 recurring: a demo reaches the front page on a teaser, and the correct entry is the one that names the evidence gap rather than the capability.

[`🔗 HN discussion (465 pts)`](https://news.ycombinator.com/item?id=50218633) · [`🔗 @log4j thread`](https://twitter.com/log4j/status/2113014142600953868)

---

## 17. gpu-unlock doubles FP/BF16 issue rate on RTX 30 cards from a kernel module — and publishes where it does nothing

- **Velocity:** ▮▮ rising
- **Source:** GitHub (Zagitta/gpu-unlock) / Hacker News · 130 pts · **2,472★** · created 2026-10-18
- **Tags:** `nvidia` `bf16` `kernel-module` `gemm` `consumer-gpu`

**gpu-unlock** is a Linux kernel module that writes the speed-selector registers (`SS0 0x88888888`, the 4-bit `SS1 0x8` for IMLA4) and performs a function-level reset **before the unmodified NVIDIA driver binds the card**, so it does not need re-patching every driver release. On a 3090 Ti at 450 W, five-sample medians: **BF16 87.50 → 157.41 TFLOPS**, FP16 **87.46 → 118.39**, TF32 **42.58 → 82.61**. Per-card reports for GA102/GA104/GA106 run from **+25% to +81%** on BF16 GEMM.

**Why it matters:** the README is a model of publishing the negative half. Gains are "dense GEMM throughput from each report's own benchmark, so they are not directly comparable"; power limit dominates (the low +25% is a 225 W card); one listed card, the OEM 3080 Ti 20 GB, **completes the unlock and stays at half rate**; **LLM decode and INT8 work stay about the same** because decode is bandwidth-bound; and the reports that checked outputs found them bit-identical. That last point is what makes it interesting — a register-level unlock that changes throughput without changing numerics is a different claim from overclocking, and the pre-driver timing is why it survives driver updates.

[`🔗 Zagitta/gpu-unlock`](https://github.com/Zagitta/gpu-unlock) · [`🔗 3090 Ti benchmark thread`](https://github.com/Zagitta/gpu-unlock/issues/1) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50219700)

---

## 18. Microduck: an 800-gram biped whose brain is a public repo, a 50 Hz loop and fifteen servos

- **Velocity:** ▮▮ rising
- **Source:** GitHub (pollen-robotics/microduck) · **10,870★** · Apache-2.0 · pushed 2026-10-24
- **Tags:** `robotics` `reinforcement-learning` `rust` `sim2real` `onnx`

Pollen Robotics open-sourced the **brain** of Microduck — about **25 cm and 800 g**, run on a **Rockchip RK3566** by a handful of daemons: a **50 Hz control loop driving fifteen servos** from neural policies, radios and camera, plus update machinery designed to put new software on a robot without bricking it. The policies live in a companion repo, **microduck_rl** — MuJoCo and PPO, the sim2real recipe, and the ONNX export this repo loads. **Apache-2.0, 10,870 stars, 1,397 forks**, pushed today.

**Why it matters:** the split between the robot's runtime and its policy training, in two repos with the export format as the interface, is the most copyable part — it means the walking brain and the rolling brain are swappable ONNX files, which is exactly what "put wheels on, ask for roller mode" implies. The honest boundary is commercial: the repo is the software for hardware you buy, so openness here is a developer surface rather than a buildable robot, and the README's own inventory — servos, daemons, update path — is the checklist for anyone trying to reproduce it.

[`🔗 pollen-robotics/microduck`](https://github.com/pollen-robotics/microduck) · [`🔗 microduck_rl (training)`](https://github.com/pollen-robotics/microduck_rl) · [`🔗 Pollen Robotics`](https://pollen-robotics.com/microduck)

---

## 19. TornadoVM 7.3 drops JNI for the Foreign Function & Memory API — and one code path now spans JDK 21 through 27

- **Velocity:** ▮ steady
- **Source:** InfoQ / GitHub (beehive-lab/TornadoVM) · 74 pts · ~1d ago
- **Tags:** `java` `gpu` `panama` `cuda` `tornadovm`

TornadoVM, the heterogeneous-compute framework that offloads Java loops to GPUs, released **7.3**: the backends now use the **Foreign Function & Memory API** instead of JNI, the experimental **JVMCI dependency is gone**, and compiler metadata is sourced through "a reflection + ASM + Unsafe layer" giving **one path across JDKs 21, 25, 26 and 27**. The CUDA backend adds **cuTile via TileContext**, direct **cuBLAS and CUTLASS calls from TaskGraphs**, hybrid JIT/CUDA execution, Apple MXL support and multi-GPU runs. A companion **jitLLM v2.0** ships as a single-JAR Java inference engine, positioned against llama.cpp and Ollama.

**Why it matters:** the JNI-to-Panama move is the substantive one — it removes the per-JDK native glue that made "runs on your JVM" a support matrix rather than a property, and it is the first version of a long-lived project where that promise is in the code instead of the README. The limitation is stated in the same place the gains are: the simple annotation-based parallel API "did not prove to be sufficient in the long-term" for production performance, which is why kernel-context and TileContext APIs exist — so the easy path is a demo path, and the real one requires knowing the memory hierarchy.

[`🔗 InfoQ — TornadoVM 7`](https://www.infoq.com/news/2026/10/tornadovm-7-gpu/) · [`🔗 beehive-lab/TornadoVM`](https://github.com/beehive-lab/TornadoVM)

---

## 20. Replacing a $150k Looker with a bucket of HTML: $8.3k to build, 23 → 136 weekly users, and "one big XSS hole" on the way

- **Velocity:** ▮▮ rising
- **Source:** david.lequin.dev / Hacker News · 131 pts · ~1d ago (~01:15 UTC+8 Oct 25)
- **Tags:** `bi` `dashboards` `internal-tools` `snowflake` `cost`

A data platform team replaced a **~300-seat, $150k/year Looker deployment** with an internal system that hosts and serves AI-generated HTML dashboards: S3 for files, Kubernetes/Terraform/Helm, SSO, and **Snowflake OAuth so every query runs under the viewer's own identity**, plus sandboxed iframes on a separate origin, a strict CSP, `postMessage` between dashboard and shell, short-lived content tokens and asynchronous metadata scanning. Three engineers built it over **about eight months, part-time**; build cost was **≈$8.3k** in Claude tokens and AWS against ≈$100k for the same period of Looker, with steady-state around **$20k/year**. Weekly users went from **23 in March to 136 in June**, matching Looker's reach while Looker usage fell by a third. Per dashboard: ~1M tokens, **$0.50 on Opus 5.5**, down from $2.50.

**Why it matters:** the article's credibility is in the two costs it will not let you skip. The **three engineers' time is the biggest unmeasured line item**, spread across existing platform duties — a dedicated team changes the ROI arithmetic entirely — and the early version was insecure by construction: same-origin JavaScript, no permissions, "one big XSS hole," requiring a substantial rebuild before it could hold real data. The author also concedes a team starting today would probably evaluate Claude Dashboards first, and that the build case rests on already having a solid platform team.

[`🔗 david.lequin.dev`](https://david.lequin.dev/blog/bi-software-is-dead/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50212320)

---

## 21. "Steal My Bitcoin": $502 on a server running PHP 8.4.26, as a falsifiable test of the PHP RCE

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News (Show HN) · 434 pts · ~8h ago (~04:30 UTC+8 Oct 25)
- **Tags:** `php` `rce` `challenge` `security-research` `disclosure`

A Show HN post titled **"Steal My Bitcoin"** puts a bitcoin key worth about **$502** on a server and invites anyone to take it. The author's reason, in the thread: "I'm curious if anyone out there has figured out how to actually use this **PHP RCE** we spent the last few days panicking over." The page as reposted in-thread states the key is "accessible to the **PHP user account** through the `print-flag` binary," and carries a running counter — **"0.65 hours without a successful hack"** at capture. Commenters report the target is **PHP 8.4.26 behind nginx**, with a **1 MB request-body cap**.

**Why it matters:** this is the falsifiability move the PHP 9.2 disclosures (CVE-2026-109618 / CVE-2026-109619) did not have — instead of arguing about exploitability, it makes the claim cost money to be wrong about, and the counter is public. Two cautions belong with it: the site was **overloaded while we tried to read it**, so the challenge text here is the copy the author posted in the thread rather than a first-hand read, and at least one commenter notes the pages they could see were **static, with no PHP entry point** — which would make the server immune to the class being tested rather than a proof it is unexploitable. A time-boxed bounty proves someone could not do a thing in 0.65 hours; it does not prove the thing is impossible.

[`🔗 HN discussion (434 pts)`](https://news.ycombinator.com/item?id=50224916) · [`🔗 stealmybitcoin.com`](https://stealmybitcoin.com/)

---

## 22. Goose: a systems language with no heap, no GC and no lifetimes — designed by a human, implemented by Claude Fable

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News / aardappel.github.io · 289 pts · ~9h ago (~03:06 UTC+8 Oct 25)
- **Tags:** `programming-languages` `compilers` `ai-authored` `memory-management` `c`

**Goose** is a new systems language by **Wouter van Oortmerssen** (the author of Lobster, which he says he had Goose imitate), with an unusual memory model: "no heap allocator, garbage collector, or lifetime annotations." Values live inline on compiler-assigned data stacks; growth advances a pointer and scope exit restores the stack top, with at most one resizable value per stack so growth never relocates or re-checks capacity. References into grow-only arrays stay valid across later pushes, and the compiler infers reference lifetimes, rejecting those that could outlive their owners. It emits **C**, calls C via `extern fn`, and is **Apache-2.0**.

**Why it matters:** the provenance is the story. The credits split the work into two lines — "Wouter van Oortmerssen: Language Design, Compiler Design, Coding standards" and "**Claude Fable: Compiler implementation, Benchmarking, Sample & Doc writing**" — and the page says the repo "was produced almost entirely with AI, from a human language design." That makes the benchmark table a self-assessment by the same model that wrote the compiler: "over sixteen benchmarks Goose runs at **3.3x the speed of idiomatic C++**," 1.16x hand-optimized C++ and 1.12x the best safe Rust, on 1.9x/1.3x/1.2x less memory — with the page claiming "the benchmarks have the numbers, losses included." The stated limits are real design boundaries, not bugs: recursive functions cannot retain growable data across calls, arrays of variable-size elements can be iterated but not indexed, closures cannot escape, there are no function pointers, and **wholesale program compilation** is required. Read the language design as the human contribution and the numbers as unverified-by-third-parties.

[`🔗 Goose`](https://aardappel.github.io/goose/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50224100)

---

## 23. "How close can pure functional programming get to C?": 2.6% slower on M1, 8.9% on Ryzen — over 144 benchmarks

- **Velocity:** ▮▮▮ trending
- **Source:** rtfeldman.com / Hacker News · 260 pts · ~24h ago (~11:43 UTC+8 Oct 24)
- **Tags:** `roc` `deflate` `benchmarks` `performance` `memory-safety`

Richard Feldman optimized **roc-deflate**, Niclas Ahden's pure-Roc DEFLATE implementation, and benchmarked it against C's **libdeflate** on the **Silesia corpus** with non-streaming APIs on both sides, verifying byte-identical output. Across **144 benchmarks**: Roc averaged **2.6% slower on an M1 MacBook Pro** and **8.9% slower on a Ryzen 9 3900X**, with the worst inputs about **18% slower** and the best "slightly over **18% faster**."

**Why it matters:** the author spends most of the post arguing *against* the headline his own data could support. One package cannot establish how close Roc gets to C generally; C keeps a higher ceiling precisely because Roc enforces memory safety, automatic reference counting and bounds checks with no unsafe opt-out; roc-deflate has no streaming API, x64 has "room to improve," and best-case wins are not average gains. That last distinction is the one that separates a benchmark from marketing — the geometric mean is the finding, and the 18% faster slice is the exception the mean already accounts for.

[`🔗 rtfeldman.com — FP vs C`](https://rtfeldman.com/fp-vs-c) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50218195)

---

## 24. Dan Luu argues the cost model changed and software should get more ambitious — with the rebuttal in the piece

- **Velocity:** ▮▮ rising
- **Source:** danluu.com / Hacker News · 259 pts · ~6h ago (~05:47 UTC+8 Oct 25)
- **Tags:** `software-engineering` `ai-assisted` `maintainability` `essay` `verification`

Dan Luu's essay argues that builders are still running a "pre-agentic cost model," dismissing projects as not worth the time when AI assistance has changed the arithmetic. His running example is **pgrust**, Michael Malis's Rust rewrite of Postgres, whose differential testing surfaced real Postgres bugs (SP-GiST, JSONPath caching, pgcrypto, a dictionary-loader memory-safety issue, money overflow) — value that survives even if the rewrite does not. His personal evidence: a tunable regex engine, a faster ripgrep fork, and a Rust interpreter he says gave **50× on cold compiles and 2× on warm builds**, each taking hours rather than a year.

**Why it matters:** the piece carries its opposition rather than burying it. Luu quotes **Yossi Kreinin's** rebuttal — most people should be *less* ambitious with AI-built software, because many problems lack pass/fail criteria and people cannot reason about large black boxes; Kreinin's advice is "run for cover." Luu also concedes most AI rewrite projects are "vibeslop," that **pgrust's ClickHouse benchmark submission was premature** (while calling the cheating accusations false), that Amdahl's law limits gains from doing the same work with new tools, and that he wrote the post quickly without his usual benchmark rigor. The transferable claim is narrow and worth keeping: the gap that now matters is between what a model can implement and what a person can *verify* without handholding.

[`🔗 danluu.com — ambitious software`](https://danluu.com/ambitious/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50225695)

---

## 25. Cerebras lays out how to serve a 3-trillion-parameter Kimi K3 on 59 wafers — and declines to publish the number that would settle it

- **Velocity:** ▮▮ rising
- **Source:** Cerebras Blog / Hacker News · 32 pts · ~2.5h ago (~09:33 UTC+8 Oct 25)
- **Tags:** `cerebras` `inference` `kimi-k3` `wafer-scale` `memory`

Cerebras published a deployment design for **Kimi K3** — the ~3-trillion-parameter open model — across **59 WSE-3T wafers**: 35 for its **69 linear-attention layers** (two layers per wafer) and 24 for its **24 dense layers** (one per wafer plus KV-cache space), each wafer holding **44 GB** of on-chip SRAM, with 4-bit weights and an 8-bit KV cache under a 256k-token average-request assumption. Weights stay on-chip; only activations cross wafers, over RDMA at about **2 µs per hop**, with pipeline stages working on different requests concurrently. The headline claim is **"1000–2000+ tokens per second"** for multi-trillion-parameter models.

**Why it matters:** the post is more careful than the headline. It says the 59-wafer layout is "an illustrative configuration, not a reported end-to-end benchmark," gives no measured end-to-end latency and **no tokens-per-second-per-megawatt** figure — while stating that tokens/s/MW "at matched output speed" is the more meaningful metric. Concurrency is capped by KV-cache space on the dense wafers, micro-batch size trades per-request speed against total throughput, and a footer notes performance varies by workload and date. A memory-bound argument for wafer-scale inference is a real argument; this post is a budget, not a measurement.

[`🔗 Cerebras — trillion-parameter deployment`](https://www.cerebras.ai/blog/how-we-deploy-trillion-parameter-frontier-models-on-cerebras) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50227356)

---

## 26. Unitree Go2 gets a 9.6: `set_volume` in `gpt_thread.py` runs shell commands, and the fix is firmware 1.1.11.5

- **Velocity:** ▮▮ rising
- **Source:** CVE Program (cveawg) / VulDB · CVSS 3.1 9.6, CVSS 4.0 9.4 · published 2026-10-24
- **Tags:** `cve` `robotics` `unitree` `command-injection` `firmware`

**CVE-2026-115995**, assigned by **VulDB**, affects the **Unitree Go2** robot dog through **1.1.11.4**: "the impacted element is the function `set_volume` of the file `gpt_thread.py` of the component `chat_go`. Such manipulation of the argument Value leads to **OS command injection**." Attack vector is network, no privileges required, user interaction required, scope changed — **9.6 at CVSS 3.1**, **9.4 at CVSS 4.0**, and a **10.0** on the CVSS 2.0 metric, all three from the CNA. CWE-78. Upgrading to **1.1.11.5** resolves it, and the record carries a vendor confirmation quoted verbatim: "Submission 990502 corresponds to our internal ticket **#474** (Go2 `chat_go` `set_volume` OS command injection, CWE-78)."

**Why it matters:** a voice-assistant thread on a quadruped robot is a shell, and the argument that carries the volume setting is the injection point — which is the recurring shape of consumer-robot security: an LLM-adjacent convenience feature bound to a privileged host process. Two provenance notes belong with the score: all three CVSS versions are the **CNA's own**, on a record NVD lists as `Received` with no NIST metric, and the affected range is declared as an explicit list of five point versions (**1.1.11.0–1.1.11.4**) with **1.1.11.5** marked unaffected — so this is an enumerated range, not a `lessThan`. The firmware artifact is linked from the record, which makes "patched" checkable as a download rather than as a promise.

[`🔗 CVE-2026-115995 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-115995) · [`🔗 NVD record (API)`](https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-115995)

---

## 27. MongoDB Compass carries the eMudhra intermediates inside Electron's own root store — and the fix is a bundled runtime update

- **Velocity:** ▮▮ rising
- **Source:** CVE Program (cveawg) / Compass release notes · CVSS 4.0 7.6 · fixed 2026-10-23
- **Tags:** `cve` `emudhra` `electron` `trust-store` `tls`

**CVE-2026-115929**, assigned by **MongoDB**, states the issue in one sentence: "MongoDB Compass relies on Electron, a third-party runtime that carries its **own TLS root certificate store**. This root certificate store has the recoverable eMudhra intermediate CA certificates." It is resolved in **Compass 1.53.1**, which bundles **Electron 44.9.1**; that release was published **2026-10-23T17:23Z**, and its changelog line is the terse "Updated Electron to address a security issue." CWE-295. Score is the CNA's: **7.6 at CVSS 4.0**, 6.8 at 3.1. Affected is declared with a **null minimum** (`version: "0"`) up to but excluding 1.53.1. NVD lists the record as `Received` with no NIST metric.

**Why it matters:** this is the part of the eMudhra fallout that does not get fixed by a browser release. Mozilla's own account says it pushed the eight compromised intermediates into **OneCRL within three hours** of the October 17 report and removed the signing root in **NSS 3.131.1** — but OneCRL reaches *Firefox*, and an Electron app that ships its own store does not consume it. So every desktop application embedding a runtime with a pinned bundle needs its own update, which is why the CVE exists at all: "patch the CA out of your trust store" is per-artifact work, and the artifact here is an application release, not a system update. The mitigations remain split by trust source rather than by species — a host-level store and a bundled store disagree until both are updated.

[`🔗 CVE-2026-115929 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-115929) · [`🔗 Compass v1.53.1 release`](https://github.com/mongodb-js/compass/releases/tag/v1.53.1) · [`🔗 Mozilla on the eMudhra compromise`](https://blog.mozilla.org/security/2026/10/20/protecting-firefox-users-following-the-compromise-of-emudhra-intermediate-certificates/)

---

## 28. OPAL puts a coding agent inside one training run and lets it rewrite the optimizer — −11.6 against −2.2 for the best static recipe

- **Velocity:** ▮▮ rising
- **Source:** xingjianbai.com / GitHub (xingjian-bai/opal) · 22 pts · posted 2026-10-21
- **Tags:** `optimizers` `agents` `training` `pytorch` `research`

**OPAL** ("OPtimizer with an Agent in the Loop") is a PyTorch wrapper that hands two small programs to a coding agent — an `analysis.py` that extracts whatever statistics it wants and an `updater.py` that turns gradients into updates — and lets it rewrite either **during training**, per parameter group, in response to loss spikes, stalls or overfitting. Nothing is carried between runs. Reported results: **LightningDiT-XL/1 FID-50K 1.83 vs 2.18** with guidance (4.33 vs 5.15 without), Goldfish Amharic **83.48 → 81.11 bits per sentence**, and on toy landscapes an average score of **−11.6** against **−2.2** for the best of twelve hand-picked static recipes and **−7.4** for the best of **382,080** swept ones. With 10% mislabeled labels, test loss 0.69 / 78.6% accuracy versus 2.49 / 73.5% for AdamW.

**Why it matters:** the caveats are where the engineering is. Letting training wait for the agent cost **1.30×–4.39× wall-clock**, reduced to **1.01×–1.14×** with asynchronous updates; the implementation "still needs work" for sharded training and optimizer compilation; gains shrink when runs are short and recipes are already tuned; and **most experiments were run once**. The authors also concede the approach is impractical at frontier scale in FLOP terms and compare API tokens to GPU hours instead ($6.42 in tokens beside ~74 H100-hours, ≈$510). One more line from the repo deserves equal billing with the results: the agent's programs "run inside your training process, so this is a rule, not a sandbox" — the constraint that it not touch model, data or loss is enforced by instruction, not by isolation.

[`🔗 Reactive Optimizers (blog)`](https://xingjianbai.com/reactive-optimizers/) · [`🔗 xingjian-bai/opal`](https://github.com/xingjian-bai/opal)

---

## 29. OpenDS: 200 deep-search tasks on the live web, best frontier agent 39.0%, humans 21.1% over 1,000 tries

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.30181 / Hugging Face Papers · 160 upvotes · submitted October 2026
- **Tags:** `benchmark` `deep-research` `web-agents` `tool-use` `evaluation`

**OpenDS** asks an agent to answer a question that requires multi-step search across the **open, live web** — several modalities, several file formats, interactive browsing — and to return one factual answer; **OpenDS-World** is the **200-task** public set, with human verification of the evidence and a unique answer per task. Twelve frontier models ran under **one shared tool setup**. The best reached **39.0% accuracy**; human attempts reached **21.1%** across **1,000 tries** (~211 successes).

**Why it matters:** a benchmark on the live web trades reproducibility for realism, and the paper is candid about what still breaks: "tool coordination and long-horizon search management," plus wide variation in research strategy, search cost, how agents decide to stop, and how they recover from failure. The human baseline also belongs in the reading — 21.1% is a *successful-answer* rate for people on tasks built to be hard, so the useful comparison is not "agents beat humans" but "the ceiling on this set is low for everyone," which is what makes a 39.0% top score informative rather than saturated.

[`🔗 arXiv 2610.30181`](https://arxiv.org/abs/2610.30181) · [`🔗 Hugging Face Papers`](https://huggingface.co/papers/2610.30181)

---

## 30. claude-howto: 44,652 stars for a third-party Claude Code curriculum — and the README's own version numbers disagree

- **Velocity:** ▮▮ rising
- **Source:** GitHub (luongnv89/claude-howto) · **44,652★** · +392 today · MIT
- **Tags:** `claude-code` `documentation` `tutorial` `mcp` `skills`

**claude-howto** is an unofficial, example-driven guide to Claude Code: ten numbered modules (slash commands, memory, skills, subagents, MCP, hooks, plugins, checkpoints, advanced features, CLI), copy-paste templates, Mermaid diagrams, quizzes, and translations into Vietnamese, Chinese, Ukrainian and Japanese. **44,652 stars, 5,496 forks, 40 open issues, MIT**, created **2025-11-07**, last pushed **2026-10-20**, one of the fastest-gaining repos on today's daily board at **+392**.

**Why it matters:** the repository's value and its weakness are the same property — it is a fast-moving third-party mirror of a surface Anthropic changes often. The README states "Last Updated: October 18, 2026" against **Claude Code 2.1.302**, and its model-compatibility lists are not internally consistent (the FAQ and the footer name different model sets). Two operational details are worth more than the star count: installation guidance now calls **npm installation deprecated** in favour of the native installer, Homebrew or WinGet, with downloads served from `downloads.claude.ai` — which corporate proxies must allow; and the repo "ships no marketplace," so `/plugin install` does not apply and `claude --plugin-dir` is the path. A guide this popular is de facto onboarding documentation; treat its version pins as claims with dates, not as facts.

[`🔗 luongnv89/claude-howto`](https://github.com/luongnv89/claude-howto) · [`🔗 GitHub Trending`](https://github.com/trending?since=daily)

---

## 31. Corgi: a terminal multiplexer built for agents first, with token accounting in a `top`-style view

- **Velocity:** ▮▮ rising
- **Source:** Hacker News (Show HN) / corgi.computer · 126 pts · ~1.3d ago (~03:46 UTC+8 Oct 24)
- **Tags:** `agents` `terminal` `multiplexer` `claude-code` `worktrees`

**Corgi** is a terminal multiplexer that treats coding agents as first-class panes: one view shows every agent's state (**working / needs you / finished / idle**), F1 gives a summary, and a `top`-style screen reports **per-agent token accounting** with activity detail on hover. It drives Claude Code, Codex, Pi and OpenCode using **your existing accounts**, keeps processes running in the background the way tmux does, and adds agent-specific affordances — replay an agent's work, see every file it changed in one scroll, manage **worktrees**, group workspaces automatically, and monitor live resource use per workspace. Install is a one-line shell command on **macOS, Linux and WSL**, and `corgi --skill` exists so an agent can learn to drive the multiplexer itself.

**Why it matters:** this is the tmux slot being re-filled by a different owner — the operator. As the number of concurrent agents per developer grows, the scarce resource becomes *attention routing* (which agent needs a human, right now) and *spend visibility* (which agent is burning tokens), and both are things a plain terminal multiplexer cannot express. The stated limits are honest and narrow: macOS/Linux/WSL only, and the richer image features (pasting images with ⌘V, including over SSH) "require **Ghostty Nightly**" — a dependency on an unreleased terminal build is the kind of constraint that decides whether a tool is daily-driver ready.

[`🔗 corgi.computer`](https://corgi.computer/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50214373)

---

## 32. LogSync: a 4 × 2 mm implantable chip that classifies brain states on under 200 µW

- **Velocity:** ▮▮ rising
- **Source:** EPFL / Hacker News · 97 pts · ~12h ago (~23:57 UTC+8 Oct 24)
- **Tags:** `neural-interface` `low-power` `biomarkers` `epfl` `hardware`

EPFL's Integrated Neurotechnologies Lab (Mahsa Shoaran's group) built **LogSync**, a roughly **4 × 2 mm** implantable neural system-on-chip that records activity and extracts network-level biomarkers — the strength of brain waves and **cross-region synchrony** — rather than only single-channel features. A machine-learning classifier turns those into cognitive and emotional states and can emit **stimulation triggers** when a chosen state is detected. It uses logarithmic computation and draws **under 200 microwatts**. Validation used previously collected **human psychiatric recordings**, where it separated cognitive engagement during a mental task and emotional arousal during video viewing from neural signals alone; in rats at the University of Minnesota it tracked ongoing oscillations and delivered stimulation at predetermined phases.

**Why it matters:** the constraint that shaped the design is the interesting part — cross-region synchrony normally costs more power than an implant can spend, and the log-domain compute is what fits it inside the budget. But the evidence is early and the article says so: human validation used **existing datasets, not newly implanted patients**, and phase-locked stimulation was demonstrated in **animals**. So this is a hardware result about what is computable at 200 µW with retrospective human data, not a closed-loop therapy result — a distinction that decides whether "detects emotional arousal" means a device that works in a person or a classifier that works on a recording.

[`🔗 EPFL — LogSync`](https://actu.epfl.ch/news/neural-chip-decodes-interactions-between-brain-r-2/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50222525)

---

## 33. A TCL Android TV root toolkit that reuses CVE-2022-22706 — and says exactly which one firmware it was tested on

- **Velocity:** ▮ steady
- **Source:** GitLab (c4psu13/mali-pagecache-root) / Hacker News · 52 pts · ~17h ago (~18:51 UTC+8 Oct 24)
- **Tags:** `android-tv` `mali` `cve-2022-22706` `root` `disclosure`

**mali-pagecache-root** is a full root chain for one television: a **TCL 50C721** (Realtek **RTD1319**, Mali-G31, firmware **V8-R51MT02-LF1V903**, Android 11, kernel 4.14.198). The autonomous binary gets `uid=0` from an unprivileged app context in under two seconds by importing a `MAP_SHARED` mapping of libc's `__cxa_atexit` page as a GPU user buffer (**CVE-2022-22706**), replacing the file mapping with `mremap(MREMAP_FIXED)`, and writing **112 bytes of Thumb-2 shellcode** into the **page cache** — on-disk bytes untouched, so dm-verity stays happy. A privileged domain then maps a physical page via `/dev/rtkmem` and flips `selinux_state.enforcing = 0`; the chain walks `task_struct`, overwrites `cred`, and clears `TIF_SECCOMP` to escape zygote's BPF filter, before bind-mounting ad-block hosts and disabling 28 bloatware packages. **MIT**, one recorded test unit.

**Why it matters:** the release notes are a model of scope discipline for a device exploit — "firmware-specific research and tooling, **not a universal TCL root tool**," a table of the exact build it ran on, and a compatibility document that says SoC and Mali driver revision "are inconsistent across the original records." It also states plainly that **no fresh rooting test was performed** while preparing the release, that no APK wrapper is included, and that flashing patched boot or vbmeta images bootlooped twice in historical attempts. And the underlying lesson is the one that keeps recurring: **CVE-2022-22706 is a 2022 GPU page-cache bug still rooting a consumer TV in 2026**, because the patch boundary for a television is a firmware image that ships once. It is not an unnoticed bug either: NVD has analyzed it, scores it 7.8 at CVSS 3.1, and it has been in CISA's KEV since **2023-03-30**.

[`🔗 c4psu13/mali-pagecache-root`](https://gitlab.com/c4psu13/mali-pagecache-root) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50220042)

---

## 34. Deep Fusion Memory: chunk-level parametric memory with the backbone frozen — and an abstract that lists no limitations

- **Velocity:** ▮ steady
- **Source:** arXiv 2610.25100 / Hugging Face Papers · 48 upvotes · submitted October 2026
- **Tags:** `memory` `parametric` `rag-alternative` `architecture` `llm`

**Deep Fusion Memory (DFM)** replaces retrieval with a learned chunk-level memory: a causal memory predictor generates memory from the preceding context, supervised by **retrieved chunk embeddings**, and that memory is shared across the tokens of a chunk and injected into hidden states through **gated cross-attention**. The backbone stays **frozen** — only the predictor and fusion layers are trained — and inference needs **no explicit retrieval**. Training-data construction uses "**32× fewer retrieval queries** and **2,048× fewer retrieved items**" than parametric-memory methods that build token-level targets. Across six QA tasks it beats the strongest baseline by **12.71%** on Mistral-7B-v0.3 and **11.19%** on Qwen3-8B-Base, with domain-adaptation gains of 6.51 and 4.38 points on Qwen3-4B-Base and Qwen3-8B-Base.

**Why it matters:** freezing the backbone is the design decision that makes this comparable to retrieval rather than to continued pretraining — the base model is unchanged, so the delta is attributable to the memory module and not to weights drifting. The caveat is structural and easy to miss: **the abstract states no limitations of its own method**, offers no retrieval baseline at matched cost despite the framing as a RAG alternative, and all numbers are the authors' own on six QA tasks. A frozen-backbone memory that needs no retrieval is exactly the shape production systems want; the missing comparison is against what those systems currently run.

[`🔗 arXiv 2610.25100`](https://arxiv.org/abs/2610.25100) · [`🔗 Hugging Face Papers`](https://huggingface.co/papers/2610.25100)

---

## 35. A 93-page review asks whether robots can recursively self-improve — and finds no study that isolates the recursive gain

- **Velocity:** ▮ steady
- **Source:** arXiv 2610.29677 / Hugging Face Papers · 56 upvotes · submitted October 2026
- **Tags:** `recursive-self-improvement` `robotics` `review` `robot-learning` `evaluation`

**"Toward Recursive Self-Improvement in Physical AI"** is a **93-page** review that separates two things usually conflated: a robot improving its *behaviour*, and a robot improving *the methods that produce* its behaviour. It traces the path from behaviour to method to method-improvement across the manipulation literature and summarises what that literature shows — better behaviour, benefits for subsequent learning, and improved procedures, with some systems modifying the improver's own knowledge or tools.

**Why it matters:** the finding is a negative one, stated by the authors: physical studies "**have yet to isolate gains attributable to recursion**." That is the sentence to keep, because "self-improving robot" claims usually rest on a pipeline where each stage got better and no ablation separates recursive improvement from ordinary better data or better supervision. The paper's own contribution is therefore **assessment guidelines rather than new experiments**, and its four conditions for an improvement to persist are the useful checklist: the feedback must address the remaining learning need, the receiving component must be able to use the change, the benefit must survive a task or hardware change, and continued practice must be safe and affordable — four filters that most physical-AI improvement loops have not been run through.

[`🔗 arXiv 2610.29677`](https://arxiv.org/abs/2610.29677) · [`🔗 Hugging Face Papers`](https://huggingface.co/papers/2610.29677)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-10-25T04:15:42Z |
| Items | 35 |
| Sources tracked | 30 (Hacker News, GitHub Trending, Hugging Face, arXiv, NVD, CISA KEV, CVE Program, Reuters, InfoQ, EPFL, Cerebras, vendor blogs, engineering blogs) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[Previous day](2026-10-24.md) · [Raw .md](2026-10-25.md) · [Archive](../archive/)
