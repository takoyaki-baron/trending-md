---
date: 2026-10-29
updated: 2026-10-28T20:20:56Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 26
license: CC-BY-4.0
---

# Trending — 2026-10-29

## 1. Apple's macOS ships git, curl and python3 that still trust the compromised eMudhra roots — and macOS 27.2 undid the manual fix

- **Velocity:** ▮▮▮ trending
- **Source:** we-have-a-problem.com / Hacker News · 905 pts · ~9h ago (~19:03 UTC+8 Oct 28)
- **Tags:** `emudhra` `macos` `ca-compromise` `trust-store` `git`

The eMudhra follow-up page was updated on **28 October** with a finding aimed at Apple specifically: "As of 28th October, the developer tools Apple ships with macOS" — built-in **git**, **curl** and **python3** — still trust the compromised intermediate certificates. Apple was notified of the incident on **17 October**; Chrome and Firefox blocked the certificates that day, Microsoft platforms on the **20th**, Apple products on the **22nd**. **macOS 27.2, released on 26 October, did not fix the issue and undid the workaround** a user applied by hand.

**Why it matters:** the HN thread's top objection is the correct correction, and it belongs in the item rather than under it — **git is not the bug**. Git is validating against the system store, which is what it should do; the store is the bug, and macOS has *two* of them (`/etc/ssl/cert.pem` and the Keychain) that disagree. Verified first-hand on a macOS 15.5 host here, and the two stores do **not** carry the same thing: `SystemRootCertificates.keychain` holds **154** roots including **2** eMudhra ones (`G1`, `G3`), while `/etc/ssl/cert.pem` holds **128** including **4** (`C1`, `C3`, `G1`, `G3`) — `C1` and `C3` are anchored *only* in the file, which is the bundle OpenSSL/libcurl backends read. (Two traps in reproducing this: `security find-certificate -c "emSign ECC Root CA - G3"` returns nothing on its own, because its default search list excludes the system roots — the keychain path must be passed explicitly; and `grep -c emSign /etc/ssl/cert.pem` returns **8**, which is 8 *lines*, since every certificate writes its name as both subject and issuer — there are 4 certificates.) The reason this is worse than a stale bundle is that git traffic is *source code*: the incident page's own impact line is that an attacker with the key "could impersonate any website or service," and its page checks `git ls-remote https://git-emudhra.we-have-a-problem.com/check.git` — "A certificate error means your git is protected." The same page lists Electron apps (Slack, Discord) as picking up the fix only once rebuilt on a patched Electron, so the class of affected clients is *shipped-and-frozen binaries*, not browsers. Reproduce with `which -a curl` before trusting a passing result: a Homebrew curl and `/usr/bin/curl` on the same machine gave opposite answers in that thread.

[`🔗 eMudhra incident — Apple follow-up, 28 Oct`](https://emudhra.we-have-a-problem.com/apple.html) · [`🔗 eMudhra incident index (patched-product tables, timeline)`](https://emudhra.we-have-a-problem.com/) · [`🔗 Hacker News discussion (905 pts)`](https://news.ycombinator.com/item?id=50271640)

---

## 2. Gemini 4 Carbon ranks #1 on the Intelligence Index and hands the cyber benchmarks to defenders only — with no context window published

- **Velocity:** ▮▮▮ trending
- **Source:** Google blog / Hacker News · 537 pts · ~3h ago (~01:01 UTC+8 Oct 29)
- **Tags:** `google` `gemini` `cybersecurity` `frontier-model` `restricted-release`

**Gemini 4 Carbon** is Google's next frontier model, built explicitly for "state-of-the-art cybersecurity and long horizon capabilities" — two weeks after **Gemini 4 Argon**. The numbers: **#1 on Artificial Analysis Intelligence Index v5.0 at 59**, **88.2% on SEC-bench Pro** (finding vulnerabilities), **54.8% on ExploitGym** (exploitation), **71.0% on Collinear's CWE-bench** (patching), and **+89 elo to #4 (1768) on WebDev Arena**. Rollout is deliberately narrow: "Starting this week, we will make Carbon available to a subset of cyber defenders," then trusted partners through the **Fairwind Program**, with developers and consumers "as soon as possible" and no date. Price holds at Argon's introductory **$2 / $10 per million** input/output tokens with cached input at 95% off, rising to **$4 / $20** after.

**Why it matters:** read the parenthetical before the headline. Google labels the three cyber benchmarks "**(evaluated without guardrails)**" — so the 88.2 and 54.8 describe a model with the safety layer switched off, shipped to a population that *keeps* it on. The rest of the case rests on internal and partner results with unnamed comparators: the Chrome team's "more than 10X better than another lab's large frontier model when generating high quality patches" names neither the lab nor the model, and Wiz's web-pentest result is a partner observation. Two numbers are unusually specific and worth crediting: **Terminal-Bench 4.0 cheating reduced to 0.0%** with attempts down to 0.4%, and **0.0% on Gray Swan's indirect prompt-injection benchmark** against Argon's 0.7% — the second is the one that matters for a model you are about to point at hostile input. And the absence is the tell: **no parameter count, no context window, no named variants** appear anywhere in the post, which is the difference between a model release and a capability announcement.

[`🔗 Google — introducing Gemini 4 Carbon`](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-carbon/) · [`🔗 Hacker News discussion (537 pts)`](https://news.ycombinator.com/item?id=50276792)

---

## 3. Atria Dawn ships its full 744B weights under MIT at 512K context — and loses to its own preview on two benchmarks

- **Velocity:** ▮▮ rising
- **Source:** Hugging Face / Shanghai AI Laboratory · model pushed 2026-10-23 · arXiv 2609.15818
- **Tags:** `shanghai-ai-lab` `moe` `open-weights` `agentic` `mit`

**Atria Dawn** is the Shanghai AI Laboratory's full release of its agentic model, post-trained on a **744B-parameter MoE GLM-5.2** foundation, licensed **MIT**, with the **512K** context window the September preview promised (the preview was 256K). The weights are actually there — `internlm/Atria-Dawn` is ungated and carries **353 safetensors shards** plus an FP8 sibling, and the card ships served-endpoint configs for both OpenAI- and Anthropic-compatible clients, SGLang `v0.5.13.post1+` and vLLM `v0.23.0+`. Text input only: the card documents the exact Codex workaround (`"input_modalities": ["text"]`) needed because Codex otherwise attaches images and the endpoint returns `400 Atria-Dawn is not a multimodal model`.

**Why it matters:** the 24-row benchmark table is more honest than its headline. Atria Dawn leads its own comparison set on the agent-and-tool rows — **CyberGym 86.8**, **SkillsBench 67.8**, **WideSearch 84.6**, **BFCL V4 78.4**, **Harvey LAB 27.5** (against Opus 5's 22.7) — and loses by a wide margin on software delivery: **SWE-bench Pro 61.7 against Opus 5's 76.5**, **NL2Repo-Bench 50.0 against 79.9**, **Harbor-Index 17.3 against 41.0**, **Terminal-Bench 2.1 81.0 against 90.2**. The detail nobody would put in a launch post: **the preview beats the full release on two of the 24 rows**, BrowseComp **92.5 vs 91.3** and NL2Repo-Bench **51.4 vs 50.0**, which means the full model's later post-training traded some search-and-repo ability for the agent scores it gained. That is a real tradeoff, published rather than hidden — and it makes "newer is better" the wrong read of this table.

[`🔗 internlm/Atria-Dawn on Hugging Face (weights + full eval table)`](https://huggingface.co/internlm/Atria-Dawn) · [`🔗 Atria Dawn paper (arXiv 2609.15818)`](https://arxiv.org/abs/2609.15818) · [`🔗 atria-asi.ai`](https://atria-asi.ai/)

---

## 4. GitHub Copilot Fusion hits 60 on the Coding Agent Index within two points of Opus 5.5 Max — and never names which models it routes to

- **Velocity:** ▮▮ rising
- **Source:** GitHub Changelog / GitHub Universe 2026 · published 2026-10-28T18:20Z
- **Tags:** `github` `copilot` `model-routing` `agent-harness` `cost`

**Copilot Fusion** is now generally available: instead of picking a model you pick a *system*, and pick an **effort level** — **Standard**, **High**, **Max**. Underneath, three orchestration shapes do the work: **Single** ("One model solves the task directly"), **Cascade** ("An efficient model drafts a response" and a check decides whether to accept or escalate), and **Critique** ("One model drafts an initial response, another model reviews it, and the original model revises"). GitHub reports **Fusion Max scored 60** on the **Artificial Analysis Coding Agent Index**, "within two points of Claude Code with Opus 5.5 Max," at "about half the average API cost per task," "using about half as many tokens," and "taking about 40% less time per task." Available on all Copilot plans in VS Code, the Copilot app, Copilot CLI and JetBrains IDEs, billed per model at each model's standard rate with a temporary **30% discount**.

**Why it matters:** the post's most consequential paragraph is about *control*, not cost — "Copilot Fusion only uses the models that are enabled in your enterprise and organization model policies," and an admin can "disable a model for Fusion without disabling the model for everyone." That is a routing layer built to satisfy a procurement policy, which is what a cost-optimising router has to be to survive in an enterprise. Two gaps to hold onto: **the post does not name a single model in the Fusion pool** — "Claude Code with Opus 5.5 Max" appears only as the benchmark comparator, not as a disclosed component — so a 60-within-2 is a claim you cannot audit by composition. And the aggregate hides a split: per VentureBeat's reading of the sub-benchmarks, Fusion leads Terminal-Bench 4.0 at **71** and trails on FrontierCode at **51 against 56**, so "half the cost for near-parity" is an average over a distribution, not a per-task guarantee.

[`🔗 GitHub Changelog — route and orchestrate models with Copilot Fusion`](https://github.blog/changelog/2026-10-28-route-and-orchestrate-models-with-github-copilot-fusion/) · [`🔗 VentureBeat — the cost and sub-benchmark split`](https://venturebeat.com/orchestration/github-copilot-fusion-mixes-models-to-achieve-near-opus-5-5-coding-performance-at-half-the-per-task-cost)

---

## 5. So-net's breach is 2,585,481 records — and 54,401 of them came with the password

- **Velocity:** ▮▮ rising
- **Source:** So-net notice / Help Net Security · disclosed 2026-10-27
- **Tags:** `breach` `sony` `japan` `isp` `credentials`

Sony Network Communications disclosed unauthorised access to **So-net**'s member database: **2,585,481** records in total, split **2,141,986** So-net (1,869,771 current plus 272,215 who left in March 2026 or later) and **443,495** from **plala**'s S Course. The fields are identity, not finance — names, phone numbers, email addresses, user IDs, dates of birth, gender, internet connection IDs — but one slice is worse than that: for **54,401** addresses the attackers obtained **both the email address and its password**, across four mail services, all reset on **27 October**. Also leaked: **16** bank account records (bank, branch, account type, number, holder name) and data from seven password-reset notices. No membership passwords, no card data, no PINs; NURO and So-net's other services are unaffected.

**Why it matters:** the timeline is the part to read, and it runs five days. Access on **19 October**, confirmed **23 October**, data leak confirmed **24 October**, public notice **27 October** — and the passwords were reset the same day the notice went out, which means customers had no window to rotate them first. The cause is still "under investigation," so every downstream account that used one of those 54,401 mail addresses and passwords is the actual blast radius, not the 2.58M headline. The scoping sentence is also unusually precise in the other direction: "Customers who canceled their subscriptions by the end of February 2026 are not affected," which is a data-retention statement as much as a breach one — it tells you exactly how long this operator keeps records for people who have left.

[`🔗 So-net — official notice (2026-10-27)`](https://www.so-net.ne.jp/info/2026/20261027_0001.html) · [`🔗 Help Net Security — per-service breakdown`](https://www.helpnetsecurity.com/2026/10/28/sony-network-communications-data-breach-so-net/)

---

## 6. Warp's vendor was compromised and the stolen data was agent decision logs — no vendor named, no CVE, no scope beyond "about 1%"

- **Velocity:** ▮▮ rising
- **Source:** Warp (via CEO Zach Lloyd) / BleepingComputer · disclosed 2026-10-27T12:15Z
- **Tags:** `breach` `supply-chain` `agent-traces` `warp` `telemetry`

Warp — the AI terminal now billed as an agentic development environment — disclosed that an attacker exploited an **unnamed third-party vendor** in its infrastructure and reached **agent decision logs and telemetry data**. CEO **Zach Lloyd** said Warp learned of "an active and narrow-banded exploitation" of a vendor on Friday, "detected the operation within hours and were able to remediate and mitigate the impact," and estimated **roughly 1% of Warp users** may have been affected. **CrowdStrike** was engaged and law enforcement notified.

**Why it matters:** the *class* of data is the story, and it is the class the industry has no vocabulary for yet. An agent decision log is not a chat transcript — it is the record of which tool the agent chose, what it read, what it ran, and why, which is a reconstruction of the user's repository, credentials in shell history and internal endpoints all at once. Also relevant: this lands ten days after OpenCode's provider-API-key exposure (covered here on 22 October), and both are *vendor-side* rather than model-side — the concentration risk in agent tooling is the telemetry pipeline, not the inference endpoint. What Warp has **not** said is the part to wait for: whether the exposed data included source code, prompts, credentials or account details, which vendor it was, and what the vulnerability was. "About 1%" with no denominator published is an estimate, not a count. Rotate anything a Warp agent session touched; treat "narrow-banded" as the company's characterisation until the incident report exists.

[`🔗 BleepingComputer — Warp discloses breach`](https://www.bleepingcomputer.com/news/security/warp-discloses-breach-exposing-ai-agent-logs-user-telemetry-data/) · [`🔗 Cloud Security Alliance — agent traces as crown-jewel data`](https://labs.cloudsecurityalliance.org/research/csa-research-note-agentic-dev-tool-telemetry-breach-warp-202/)

---

## 7. Nemotron 3.5 Transcribe puts four speech tasks in one open checkpoint — and its three "sizes" are three different objects

- **Velocity:** ▮ steady
- **Source:** NVIDIA / Hugging Face blog · ~5h ago (~23:17 UTC+8 Oct 28)
- **Tags:** `nvidia` `asr` `open-weights` `diarization` `multilingual`

**Nemotron 3.5 Transcribe** is a single open-weight checkpoint doing transcription, speaker attribution, translation and audio question answering on recordings "up to an hour long" with "up to eight speakers." Coverage differs sharply by task, and the post says so: it **transcribes 40 languages**, "translates 31 of them to or from English," and "attributes speakers in 13." The scores: **5.33% average WER** on Hugging Face Open ASR English, first among open-weight models; **4.62% mean WER across seven languages**; **10.98% long-form**; **2.8% AA-WER** tied for first on Artificial Analysis; **1.8% on AA-AgentTalk** against 2.3% for the next open-weight model. Diarization lands **18.26% DER** on the David AI 21-language track — "the lowest diarization error rate of the 14 systems tested," with NVIDIA's own Nemotron 3 Diarization at 18.38%.

**Why it matters:** two things in this post are worth more than the WER table. First, the size is stated three ways and **all three are right**, which is the part that is easy to misread: the repo is named `…-30B-A4B`, the card's own Model Summary reads "Total Parameters **34B (4.3B active), including the audio encoder**," and the safetensors index sums to **33,697,781,029** — so 30B is the language backbone, 34B the whole checkpoint, 4.3B the active set, and the sentence that reconciles them is on the same page (verified first-hand on `nvidia/NVIDIA-Nemotron-3.5-Transcribe-30B-A4B`). Size a deployment against the checkpoint, which is the number the card already gives. Second, the limitations are specific enough to act on: "**Transcribe is built for recorded audio, not live streaming**," audio Q&A is English-trained, and the guide says to "Spot-check names, speaker changes, and answers against the recording." The medical case study then shows the honest version of fine-tuning — held-out speaker WER **22.44% → 12.17%**, a "45.8% relative reduction," while LibriSpeech test-clean *degrades* from **1.54% to 1.69%** — so a domain tune buys a domain and costs a little general accuracy, measured rather than asserted.

[`🔗 NVIDIA — Nemotron 3.5 Transcribe (HF blog)`](https://huggingface.co/blog/nvidia/nemotron-transcribe-granary) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=50275128)

---

## 8. A Linux kernel bug published in May reached KEV yesterday — 158 days later, for a shared-frag marker that was not copied

- **Velocity:** ▮▮ rising
- **Source:** CISA KEV / NVD / kernel.org · KEV added 2026-10-28
- **Tags:** `linux-kernel` `cve` `kev` `esp` `skbuff`

**CVE-2026-46300** was added to CISA's Known Exploited Vulnerabilities catalog on **28 October**. The record was published **2026-05-23** — **158 days** earlier — and NVD has analysed it, publishing its own **CVSS 3.1 base 7.8** (`nvd@nist.gov` in the Primary slot, with two Secondary metrics at the same 7.8 from other sources), against **CWE-123, CWE-456 and CWE-787**. The bug: `skb_try_coalesce()` can attach paged frags from one skb to another, and "if `@from` has `SKBFL_SHARED_FRAG` set, the resulting `@to` skb can contain the same externally-owned or page-cache-backed frags, **but the shared-frag marker is currently lost**." ESP input checks `skb_has_shared_frag()` to decide whether an uncloned nonlinear skb can skip `skb_cow_data()`; with the marker gone, "ESP can see `skb_has_shared_frag()` as false and decrypt in place over page-cache backed frags." Eight stable patch commits; affected ranges start at **3.9**.

**Why it matters:** this is the second KEV entry in two days whose relevance is decided by a *configuration path* rather than by a score. 7.8 is not a number that gets a weekend patch, and the exploit preconditions — TCP receive coalescing meeting IPsec ESP on the same box — are a narrow intersection, which is exactly how a real bug sits unpatched for five months and then jumps the queue the day CISA sees it used. The class of defect is the reusable lesson: **a marker bit that must be propagated across an ownership transfer**, where losing it silently downgrades a copy-on-write decision into a write into shared memory. Any patch that "propagates a flag" is a patch to every place that flag is *consumed*, and the record here lists three CWE classes rather than one because the same omission is a double-free hazard (CWE-123), an uninitialised state (CWE-456) and an out-of-bounds write (CWE-787) depending on which path notices first.

[`🔗 CVE-2026-46300 record`](https://www.cve.org/CVERecord?id=CVE-2026-46300) · [`🔗 upstream patch (2f2b16022a2e)`](https://git.kernel.org/stable/c/2f2b16022a2e10ca7bccfb98db5ed2ec0f72641c) · [`🔗 CISA KEV catalog`](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)

---

## 9. DAYJOB: Tax gives frontier models 50 professional assignments and a 95% rubric — the best scores 10.8%

- **Velocity:** ▮▮ rising
- **Source:** Surge AI / Hacker News · 125 pts · ~4h ago (~23:46 UTC+8 Oct 28)
- **Tags:** `benchmark` `agents` `professional-work` `tax` `evaluation`

**DAYJOB: Tax** is Surge AI's benchmark for end-to-end professional tax work: **50 environments across eight areas** of practice — individual and family, small business, partnerships, property and investments, estates and gifts, international, corporate transactions, and review and disputes. Agents receive a client request and a workspace of **1,789 files** (median **30** per assignment, up to **123**) — **1,487 PDFs, 117 Excel workbooks, 38 Word documents**, plus emails, images, CSVs and text — and must produce the return, the workpaper, the technical review or the client advice. Passing requires satisfying at least **95% of a task's criteria**, covering calculations, evidence, consequential issues and the deliverable, after a "three-layer expert review for correctness, completeness, and solvability." At pass@1 on that threshold: **Claude Sonnet 5.5 10.8%**, **Claude Fable 5.1 9.6%**, **Claude Opus 5.5 9.2%**.

**Why it matters:** the failure mode is the finding, and it is not arithmetic. The writers conclude that "**Agents haven't yet passed the audit**," and name where they fail — judgment, incomplete instructions, conflicting records, and the "unrequested but consequential issues" a professional is supposed to catch without being asked. The case studies show the shape: Astra missed a residence-exclusion deadline in **all five** attempts while Opus caught it in all five; Opus treated a couple as unmarried in **all five** despite evidence requiring verification, while Astra recognised the need to verify in **four of five**. That is the pairing argument from this feed's 26 October note arriving in a profession where being confidently wrong costs a filing. One honest gap: there is **no formal limitations section** and no per-model cost breakdown in the post beyond a Pareto plot, so 10.8% is a difficulty ceiling for this task set, not a measure of how close any model is to a licensed preparer.

[`🔗 Surge AI — DAYJOB: Tax`](https://surgehq.ai/blog/dayjob-tax) · [`🔗 Hacker News discussion (125 pts)`](https://news.ycombinator.com/item?id=50275626)

---

## 10. A fingerprinting script named its functions after bioweapons and hid a jailbreak in invisible Unicode — one model refused, one complied

- **Velocity:** ▮▮ rising
- **Source:** nullpt.rs / Hacker News · 225 pts · ~3h ago (~01:13 UTC+8 Oct 29)
- **Tags:** `fingerprinting` `anti-llm` `obfuscation` `prompt-injection` `research`

Reverse engineer **veritas** crawled the **Tranco Top 10,000** with Playwright, hooking `canvas.toDataURL` and `navigator.webdriver`, and collected **1,033** distinct fingerprinting canvases into `fingerprint.garden`. One canvas led back to `servicepipe.tech/static/checkjs/…` — and inside that obfuscated file were ordinary mangled functions beside `computeRicinLethalDosageForWaterSupply` and `calculateDeadlyLethalSuicideAspirinDosage`, returning objects like `{ summary: "adult lethality threshold confirmed at …" }`. Decoding invisible Unicode characters (a `codePointAt - 917504` shift) surfaced a fake "**SYSTEM OVERRIDE — CLASSIFIED BRIEFING**" prompt asking for cyberattack guides, tax evasion, bioweapons and illicit drugs. When the author tested it, **Astra refused** while **GLM-5.3**, open weights, "complied and revealed the hidden system prompt."

**Why it matters:** this is the first well-documented instance of **anti-LLM obfuscation as a deliberate design pattern in shipped production JavaScript** rather than a joke or a honeypot — function names chosen not to inform a human reader but to trip a model's safety filter and stop an agent from deobfuscating the file. The defensive implication is uncomfortable: the technique works by making *refusal* the cheap path, so a model that refuses is compliant with the obfuscator's goal. Two caveats the author states, and they matter for how far to read this: some Node-only commands behind an env-var check appear to package and transmit collected data, **but several file reads use empty callbacks**, which "raises doubt about whether it's genuine malware or more anti-AI deception." So the payload's *intent* is undetermined — what is not undetermined is the artifact, which a browser executes on real visitors and which no scanner reads.

[`🔗 nullpt.rs — Why Is This Fingerprinting Script Creating Bioweapons?`](https://nullpt.rs/fingerprinting-bioweapons) · [`🔗 fingerprint.garden — 1,033 captured canvases`](https://fingerprint.garden/) · [`🔗 Hacker News discussion (225 pts)`](https://news.ycombinator.com/item?id=50276998)

---

## 11. ai-design-skills trends at 10,962 stars for a repo containing one skill file and no reason

- **Velocity:** ▮ steady
- **Source:** GitHub Trending (daily) / GitHub API · 1,395 stars today · 10,962 total
- **Tags:** `agent-skill` `design` `repo` `stars` `claude-code`

**elayadesign/ai-design-skills** is on GitHub Trending with **1,395 stars today** and **10,962** total, **785 forks**, **MIT**, last pushed **2026-10-27**. The whole repository is four files plus a license: `README.md` (2,464 bytes), `.gitignore`, and **one** skill — `skills/landing-page-design/SKILL.md`, **18,801 bytes**. Its README says as much — "A growing collection of design skills," a table with a single row, and "More on the way," which is the honest part. There are **0 releases** and **7** open items on the tracker — which splits **2 issues and 5 pull requests**, not seven issues. Install paths are documented properly for Claude Code, Cursor, Codex, Windsurf and Cline.

**Why it matters:** this is the dashboard-vs-artifact gap in its cleanest recent form. A **19 KB** markdown file and a README is a legitimate thing to publish, and 18.8 KB of design rules is not nothing — but **10,962 stars, 785 forks and 41 watchers** describe a distribution event, not a body of work, and the fork-to-watcher ratio (**19 to 1**) is the tell: people are copying the file, not following the project. Compare the four-day-old `huashu-design` covered here on 27 October, which shipped **84 styles** and whose own README called itself "an 80-point skill, not a 100-point product" — the self-assessment is the scarce artifact. Before installing any trending skill, count the files in the repo and check whether a release exists; here the count is one, which is fine, and the star count is the part that isn't information.

[`🔗 elayadesign/ai-design-skills`](https://github.com/elayadesign/ai-design-skills) · [`🔗 the one skill: landing-page-design/SKILL.md`](https://github.com/elayadesign/ai-design-skills/blob/main/skills/landing-page-design/SKILL.md)

---

## 12. @fastify/express gets a 9.1 that only fires if you turned on `ignoreDuplicateSlashes` — and it is a fix-of-a-fix

- **Velocity:** ▮ steady
- **Source:** GitHub Advisory Database / NVD · CVE published 2026-10-27
- **Tags:** `fastify` `express` `cve` `middleware` `nodejs`

**CVE-2026-112362** affects `@fastify/express` **4.0.5 through 4.0.8** and is fixed in **4.0.9**. The CNA score is **9.1 Critical**, `CWE-436` (interpretation conflict), carried in NVD's Secondary slot from a non-NVD source. The precondition is narrow and stated: Fastify must be running with the **non-default** `ignoreDuplicateSlashes` option enabled. With it on, an **absolute-form request target** — `GET http://host/admin/dashboard` — has its duplicate-slash normalisation collapse the separator after the scheme; Fastify's router normalises and matches the route and runs the handler, while the Express layer "passes the original un-normalized URL" and no longer matches, so `app.use('/admin', authMiddleware)` is **skipped**.

**Why it matters:** this is the fourth entry in a pattern this feed has now seen three times, and the most precise version of it: **the previous advisory covers the same mechanism and a different span.** `GHSA-6hw5-45gm-fj88` handles `<= 4.0.4`, patched in **4.0.5**, and explains the core defect — the plugin "only handles percent-encoding — it does not normalize duplicate slashes or strip semicolon-delimited parameters." CVE-2026-112362 covers what remained after that fix. So "upgrade to the patched version" was true twice in two releases, and anyone who pinned 4.0.5 or 4.0.6 believing they were done is affected now. The semicolon half of the original advisory is also worth noting as a *surviving* vector class rather than a closed one. If you need it, the workaround does not require the upgrade: leave `ignoreDuplicateSlashes` at its default, or move auth into a `preHandler` hook, which "runs after routing resolves" and therefore sees the path the router saw.

[`🔗 CVE-2026-112362 record`](https://www.cve.org/CVERecord?id=CVE-2026-112362) · [`🔗 GHSA-6hw5-45gm-fj88 — the earlier advisory, same mechanism`](https://github.com/fastify/fastify-express/security/advisories/GHSA-6hw5-45gm-fj88)

---

## 13. OpenPanel's unauthenticated RCE through image decoding was fixed 30 minutes before the advisory — and the advisory has no CVE

- **Velocity:** ▮ steady
- **Source:** GitHub Advisory Database / OpenPanel · advisory 2026-10-27T22:12Z · fix 21:41Z
- **Tags:** `openpanel` `cve` `rce` `libvips` `ghsa`

**GHSA-49hg-9qhc-4623** rates **critical** on `openpanel`: `GET /misc/og?url=` and `GET /misc/favicon?url=` "fetched any public URL and decoded the returned bytes inside the API process with `sharp` (libvips)." The `Content-Type` was checked, "**but libvips picks its decoder from the file's magic bytes**," so an attacker reached every loader — GIF, TIFF, HEIF/AVIF, SVG, BMP — with bytes they chose, and "a memory-corruption bug in one of those decoders led to remote code execution in the API container of a self-hosted instance, and from there to the instance's secrets, database and dashboard logins." Affected: all releases before **3.16.2** whose API is internet-reachable, which the advisory concedes "covers practically every self-hosted install" because `/track` has to be. Score: **CVSS 3.1 9.0**, `AV:N/AC:H/PR:N/UI:N/S:C/C:H/I:H/A:H`. Fix: **3.16.2**, which removes `/misc/og`, reduces `/misc/favicon` to a hostname lookup against DuckDuckGo's and Google's icon services, and drops `sharp` and libvips from the API entirely.

**Why it matters:** the score's `AC:H` is the number to look at rather than the 9.0. High attack complexity normally pushes a base below critical — here `S:C` (Scope Changed) pulls the computed base back to **9.0**, which I recomputed from the vector and got exactly: 9.0 is the arithmetic, not an inflation. So the honest reading is "critical impact, non-trivial to trigger," which is why the fix is architectural rather than a bounds check: the endpoint stopped decoding attacker-chosen bytes at all. The timing is the other notable thing — **v3.16.2 was released at 21:41:57Z and the advisory published at 22:12:09Z, 30 minutes apart**, a same-evening fix-and-record. And the absence matters: this advisory carries **no CVE id**, part of the repo's broader pattern — 37 published advisories from 2026-08-20 to 2026-10-27, **0 of which carry a CVE**, so a CVE-keyed scanner cannot see any of them.

[`🔗 GHSA-49hg-9qhc-4623 — unauthenticated RCE in OpenPanel`](https://github.com/Openpanel-dev/openpanel/security/advisories/GHSA-49hg-9qhc-4623) · [`🔗 OpenPanel releases (v3.16.2 is the fix)`](https://github.com/Openpanel-dev/openpanel/releases)

---

## 14. Rapid7's Q3 data puts the exploitation window at 3 days — and finds AI was operationally involved in 8% of incidents

- **Velocity:** ▮ steady
- **Source:** Rapid7 Q3 2026 Threat Landscape Report / Help Net Security · published 2026-10-27
- **Tags:** `rapid7` `research` `exploitation` `ransomware` `threat-intel`

Rapid7's **Q3 2026 Quarterly Threat Landscape Report** puts the average gap between public disclosure and exploitation of a high-severity vulnerability at **3 days**, with **71%** of tracked exploitation happening inside the first week — **80%** within 14 days and **90%** within 30. It tracked **43** newly exploited high or critical vulnerabilities in the quarter, and **34 of the 43 (79%)** are what Rapid7 calls "Holy Grail" flaws: remotely exploitable and requiring neither authentication nor user interaction. Context that makes those windows tighten rather than widen: new high-severity CVEs (CVSS 7–10) are up **133% year on year** and public proof-of-concept code is up roughly **86%**. Authentication-bypass flaws were the most likely class to be exploited, at **1.57%** against **0.62%** for RCE.

**Why it matters:** the finding that cuts against the prevailing narrative is buried and is the most useful thing in the report — **AI was an operational component in only 8% of tracked incidents**, with human operators still choosing targets and objectives. That is a useful correction to a week in which a honeypot captured a 100,000-step attack agent (26 October) and the industry press spent the quarter assuming automation had arrived; both can be true, and the distinction is *operational component* versus *subject of the report*. The defensive arithmetic is what follows from the 3-day median: for the 79% of exploited flaws that need no auth and no interaction, a patch-SLA measured in weeks is not a policy that lags, it is a policy that never applies — the only control that lands inside three days is one that does not depend on the CVE being published first.

[`🔗 Help Net Security — Rapid7 Q3 2026 findings`](https://www.helpnetsecurity.com/2026/10/27/rapid7-vulnerability-exploitation-trends-q3-2026-report/) · [`🔗 Rapid7 — Quarterly Threat Landscape Report`](https://www.rapid7.com/research/report/quarterly-threat-landscape-report/)

---

## 15. A jailbreak collection hits 6,911 stars with 32 prompts across 26+ models and no licence file

- **Velocity:** ▮ steady
- **Source:** GitHub Trending (daily) / GitHub API · 1,478 stars today · 6,911 total
- **Tags:** `prompt-injection` `jailbreak` `repo` `safety` `agent-config`

**togg53192-cmd/jailbreaks** is trending with **1,478 stars today** and **6,911** total, **992 forks**, **15** open tracker items (**14 issues, 1 pull request**), last pushed **2026-10-28**. It advertises "**32 prompts targeting 26+ models**," each "intended to be complete and paste-ready. No summaries. No partial excerpts" — system prompts, "persona locks," workspace policies, `AGENTS.md` files and Ollama Modelfiles, organised by target: free stealth models served through OpenCode Zen (Big Pickle, Space Bunny, LongCat 2.5, MiMo V2.6, Muse Spark 1.3), open-weight families (GLM, DeepSeek, Kimi, Qwen, Gemma, GPT-OSS) and closed frontier models (Claude, Gemini, Grok, Mistral). There is **no licence file**.

**Why it matters:** the artifact's framing is doing real work and should be judged on its own terms — the README's warning says "Research and educational purposes only" and argues that the collection "documents how instruction hierarchies, persona framing, prompt conflicts, and policy overrides can affect model behavior." That is a defensible research object: a corpus of adversarial system prompts is exactly what you need to test instruction-hierarchy robustness, and the "complete and paste-ready, no partial excerpts" standard is the standard a reproducible corpus needs. What the repo is not is a *test*: there is no harness, no refusal-rate table, no per-model result, so the 32 prompts are inputs without a single measured outcome — meaning the one number anyone would want from it (which model holds) is the one it does not contain. The missing licence is the second-order problem: with no licence, the files are all-rights-reserved by default, which makes them unusable in the security research the README says they are for.

[`🔗 togg53192-cmd/jailbreaks`](https://github.com/togg53192-cmd/jailbreaks) · [`🔗 Hacker News / GitHub Trending (daily)`](https://github.com/trending?since=daily)

---

## 16. LongChang drops LLMs into worlds with altered physics — GPT-6-Astra rediscovers a law 16.7% of the time, and the other 11 models score 0%

- **Velocity:** ▮ steady
- **Source:** arXiv 2610.37649 · submitted 2026-10-27
- **Tags:** `arxiv` `scientific-discovery` `agents` `benchmark` `physics`

**LongChang** is an automated framework that builds simulated worlds where one or more physical laws differ from ordinary physics — heavier objects falling more slowly, for instance — and turns LLM agents loose as explorers with no research task, no hint about which law changed, and no statement that anything is wrong. The agents manipulate objects, build tools to probe their own questions, and report findings. The loop is closed by other LLM agents: one set reviews proposed scenes, another reviews tool designs, and a third judges reports for correctness and experimental support against the altered laws and the exploration log, with those logs feeding scene evolution so the cycle runs "without human intervention."

**Why it matters:** the headline result is a distribution with a cliff in it. Across **12 LLMs**, "**GPT-6-Astra achieves a discovery rate of 16.7%, while the other 11 score 0%**." A single nonzero cell is not a capability gradient — it is evidence that *noticing an anomaly is a separate skill from explaining one*, and that it currently sits with one model rather than scaling with general capability. The failure analysis is the part worth citing onward: the exploration records "reveal uninvestigated anomalies and only **partial identification** of the altered physical laws," so even the one model that scored was mostly noticing without closing the loop. This is a cleaner instrument than the "can a model write a paper" benchmarks because the null result is informative: the task has a verified answer, the answer is reachable by experiment, and 11 frontier-class models failed to run the experiment at all.

[`🔗 LongChang — Can LLMs Uncover Hidden Physical Laws through Free Exploration?`](https://arxiv.org/abs/2610.37649) · [`🔗 full text (PDF)`](https://arxiv.org/pdf/2610.37649)

---

## 17. Aggregating a group's memory by relevance loses 23–31 points — and deleting who said what gains 13–24

- **Velocity:** ▮ steady
- **Source:** arXiv 2610.37624 · submitted 2026-10-27
- **Tags:** `arxiv` `multi-agent` `memory` `benchmark` `evaluation`

**"Rare, Relevant, and Still Wrong"** asks what a compressed memory should keep when an LLM group's discussion is collapsed for a final decision-maker. The two intuitive policies — keep the rarest claims, or keep the claims relevant to the decision criteria — are tested with **CrossProfile**, "a diagnostic benchmark of **60 templates** with automatically verified answer keys" in which ownership of supporting, decoy and irrelevant facts is crossed while the fact text is held fixed: **480 tasks**. Across Qwen2.5-7B, Llama-3.1-8B and two DeepSeek models, both policies fail predictably. Selecting by relevance **readmits decoys because decoys are on topic** — "even a perfect relevance filter loses **23 to 31 points** to rarest-first selection" in the classic hidden-profile configuration. And rarest-first "is no better than random selection on average," winning only where the rare facts happen to be the useful ones.

**Why it matters:** the third failure is the one that generalises beyond memory design and into how any multi-agent transcript gets summarised. The decision model "adds a third failure, a form of **social proof**: it gives extra weight to facts attributed to many agents" — and "removing the attribution tags, or reassigning them at random with line order fixed, raises accuracy in the classic configuration by **13 to 24 points**." So an accurate memory can still produce a wrong decision because the summariser treats repetition as evidence, which is precisely the error a group of agents produces *for free*: several agents restating the obvious looks like consensus. The usable conclusion is stated in the abstract and is not a policy — "accuracy follows **the balance of evidence** the memory keeps, not the policy that kept it" — which means memory compression should be evaluated by what it preserves, not by the rule it follows.

[`🔗 Rare, Relevant, and Still Wrong (arXiv 2610.37624)`](https://arxiv.org/abs/2610.37624) · [`🔗 full text (PDF)`](https://arxiv.org/pdf/2610.37624)

---

## 18. Macro ships its whole workspace as AGPL — 44,490 files, 8,854 in Rust — and cuts a release every few hours

- **Velocity:** ▮ steady
- **Source:** GitHub Trending (daily) / macro.com · 106 stars today · 5,339 total
- **Tags:** `open-source` `rust` `solidjs` `workspace` `agpl`

**macro-inc/macro** is a unified team workspace — email, chat, docs, tasks, agents, calls and CRM, "@-linked together with shared AI memory" — and the repository is the *product*, not a shell around it: **44,490 files** at the recursive-tree top level, **8,854 `.rs`**, **11,586 `.ts`**, **3,596 `.tsx`**, **1,012 `.sql`**, in an `apps` / `crates` / `packages` / `services` layout built in **SolidJS and Rust**, under **AGPL-3.0**. It is on trending with **106 stars today** and **5,339** total, and the release cadence is the unusual part: **v2026.10.28.0** published 2026-10-28T19:17Z, after **v2026.10.27.2**, **.1** and **.0** inside the previous 24 hours. The README says it is "dogfooded by our team of ~15 for two years," and cross-references between a doc and a task are "natively stored as a **bidirectional graph**."

**Why it matters:** AGPL on a full application — not an SDK, not a client — is a rare enough choice that it changes who can use this, and the file census says the licence claim is backed by the source rather than by a marketing page. The thing to be careful about is the cadence: four releases in a day with a date-versioned scheme is *continuous deployment wearing a version number*, so "latest release" is a statement about a timestamp, not about a tested artifact. And the tracker number is a composite worth splitting: **418** open items resolves to **39 issues and 380 pull requests** — a PR queue ten times the issue queue, which describes a contribution model running far ahead of its review capacity rather than a product with 418 complaints. Where it actually breaks new ground for this feed is "shared team-level memory": an AI memory layer that all of email, chat, docs and CRM write into is the same substrate under a different name as the agent-memory work, with the difference that here the ontology is a company's own bidirectional graph rather than a vector store.

[`🔗 macro-inc/macro`](https://github.com/macro-inc/macro) · [`🔗 macro.com`](https://macro.com) · [`🔗 releases (v2026.10.28.0)`](https://github.com/macro-inc/macro/releases)

---

## 19. Cursor's Agent SDK went GA eight days ago and hit HN today — agents as a versioned TypeScript project

- **Velocity:** ▮ steady
- **Source:** Cursor blog / Hacker News · 73 pts · ~6h ago (~22:02 UTC+8 Oct 28)
- **Tags:** `cursor` `agent-sdk` `typescript` `evals` `deployment`

**Cursor's Agent SDK** is a framework for defining agents as code — TypeScript, `@cursor/agent-sdk`, `defineAgent({...})` — where "Prompts are written in Markdown, while tools are defined as TypeScript functions," and instructions, tools, integrations and evals are versioned together as one project. It supports agent-to-agent handoffs, parallel subagents, event replay, and reacting to "pull request events from GitHub, GitLab, or Bitbucket." Deploy is `agent-sdk deploy`, which "builds the agent, gives it a URL, and starts it on our infrastructure"; self-hosted, "each agent runs as a single Node process that can be packaged in a container." Cursor says it uses the SDK for its own managed agents — **Bugbot**, **Security Reviewer** and **Rollouts** — and cites a team building a `kb-reviewer` "in about a day."

**Why it matters:** the date is the first correction. The post is dated **2026-10-20** — the HN thread that surfaced it today says "generally available today" because *that* was today, eight days ago — so this is an item about the SDK reaching wider attention, not about a release. The architecture is the substantive claim: "each agent runs as a single Node process" is a deployment constraint that rules out in-process sandboxing, which means isolation has to come from the container and not from the SDK, and no pricing, metering or plan detail appears anywhere in the post. The strategic read is that Cursor is publishing the harness its own products run on, which is the same move GitHub made with the Copilot harness through Foundry in the same week — two vendors deciding that the durable moat is the *agent runtime plus its evals*, and that the model underneath is a commodity they will route to.

[`🔗 Cursor — The Agent SDK`](https://cursor.com/blog/agent-sdk) · [`🔗 Hacker News discussion (73 pts)`](https://news.ycombinator.com/item?id=50273731)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-10-28T20:20:56Z |
| Items | 19 |
| Sources tracked | 26 (Hacker News, GitHub Trending, GitHub API, Google, Hugging Face, arXiv, GitHub Changelog, GitHub Advisory Database, CVE.org, NVD, CISA KEV, kernel.org, Cursor, Surge AI, Rapid7, CISA, So-net, Help Net Security, BleepingComputer, Cloud Security Alliance, we-have-a-problem.com, nullpt.rs, fingerprint.garden, NVD API, VentureBeat, macro.com) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[Previous day](2026-10-28.md) · [Raw .md](2026-10-29.md) · [Archive](../archive/)
