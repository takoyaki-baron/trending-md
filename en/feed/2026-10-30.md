---
date: 2026-10-30
updated: 2026-10-30T12:16:26Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 32
license: CC-BY-4.0
---

# Trending — 2026-10-30

Ranked by **velocity** — how fast attention is shifting, not how much it has accumulated. Every item links to a primary source that was opened and read.

---

## 1. Mistral releases 1T-parameter Large 4 weights — 1M on the card, 131K in the serving recipe, and two launch-day benchmark sets

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 893+ pts · ~6h ago (~22:13 UTC+8)
- **Tags:** `mistral` `open-weights` `moe` `licensing`

Mistral published the open weights of Mistral Large 4 on 2026-10-29 — nicknamed "Le Chonk," a hybrid instruct-and-reasoning MoE at **1T total / 49B active parameters** with multimodal input. The Hugging Face repo `mistralai/Mistral-Large-4-1T-A52B` now carries **54 consolidated safetensors shards** (last modified 14:51 UTC, minutes after the announcement post); the repo itself was created 2026-09-30 for the preview. The license is the **Mistral Ecosystem Open-Weight license**, which the post describes as "a modified MIT license" but which requires "businesses that operate a Model-as-a-Service offering must obtain a separate commercial license from Mistral."

The numbers that travel least well are the context window and the reasoning switch. The post never states a context length — the HF write-up supplies "about 1T total, 49B active parameter, and a context window of 1M tokens" — yet the same write-up's vLLM example sets `--max-model-len 131072` and the Inference Endpoints recipe "serves up to 131K tokens of context." And "reasoning cannot be disabled, so using `reasoning_effort`: `none` would still use `high`." Headline benchmarks: Terminal-Bench 4.0 **41%** (up 13 points from the preview), Artificial Analysis Coding Agent Index **48%** (tied with GLM-5.3 "while using 47% fewer tokens per task"), BrowseComp **84.5%**, FinWorkBench **73.3%** — second to Kimi K3's 91.2% on BrowseComp in the post's own chart.

**Its own second launch document disagrees.** The Hugging Face post, published the same day, states "As of October 29, 2026, the model is the fifth best open weights model on Artificial Analysis Intelligence index" and then reports "**28.3% on Terminal-Bench 4**" and a combined "Coding Agent Index score of **49.8%**" — against the news post's 41% and 48%. The news post's own chart labels the preview's **28%** as "self reported" and puts ML4 at 41%, so one of the two artifacts is carrying a preview-era number under the final model's name.

**Why it matters:** Mistral's own post concedes "we see a potential for uplift to conduct real attacks" and gates its cyber variant to design partners under "rigorous vetting" — an unusual admission inside a launch. But the 131K is not Mistral's figure: the **model card** states 1M in three places, sets `max_context_length = 1048576` in its Vibe config, and its own FP8 vLLM recipe caps nothing — while both 131K numbers come from **Hugging Face's** document (an NVFP4 recipe with `--max-model-len 131072`, and HF Inference Endpoints serving "131K tokens of context"). So the deployable figure is a third party's memory-conserving configuration, and the sharper defect is the one nobody flagged: two documents from the same launch disagree by 12.7 points on the benchmark the release is sold on. The NVFP4 build additionally "requires NVIDIA Blackwell GPUs," and only 2-bit quants fit a single 512 GB Apple Silicon Ultra.

[`🔗 Mistral — releasing the weights`](https://mistral.ai/news/mistral-large-4-oss/) · [`🔗 Hugging Face — Welcome Le Chonk`](https://huggingface.co/blog/mistral-large4) · [`🔗 mistralai/Mistral-Large-4-1T-A52B`](https://huggingface.co/mistralai/Mistral-Large-4-1T-A52B)

---

## 2. CISA puts GitLab's 10.0 in KEV — the bug underneath is in Ruby's regexp compiler, and Ruby filed no CVEs for it

- **Velocity:** ▮▮▮ trending
- **Source:** CISA KEV · catalog 2026.10.29 · added 2026-10-29
- **Tags:** `cve` `gitlab` `ruby` `rce` `kev`

CISA added **CVE-2026-97229** to the Known Exploited Vulnerabilities catalog on **2026-10-29**. The record is a **CVSS 3.1 10.0** — `AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H` — with CWE-190 (integer overflow), and the score is **GitLab's own** (`cve@gitlab.com` in the `Secondary` slot, 0 NVD-scored metrics). NVD's record sits at **`Undergoing Analysis`** with that single metric, so there is no NVD score to compare it against yet — this is *not* the endorsement case, where an analyzed record keeps only the CNA's number. GitLab fixed it in **19.4.2, released 2026-10-12**; NVD published the record the next day, and KEV followed **17 days after the fix** — 16 after the record. The NVD record does not yet carry the KEV flag — the catalog is the source, not the CVE entry.

The root cause is not GitLab's: Ruby's own advisory on **2026-10-23** names four GitLab-assigned identifiers — CVE-2026-89078 (double free in the regexp parser, PR #13332), CVE-2026-93577, CVE-2026-97229 and CVE-2026-110264 — and states plainly, "We have not requested CVE identifiers in Ruby for these fixes, at least for now." Fixes landed in **Ruby 4.0.9, 3.4.12 and 3.3.13**. Two mitigations people will reach for do not work: "`Regexp.timeout` does not protect against these bugs," and "Limiting the length of patterns does not reliably protect against them either," because "some of them can be triggered by short patterns."

**Why it matters:** Since our Oct 29 note on Alpine's GitLab, the interesting fact is not the KEV entry — it is that a 10.0 unauthenticated RCE on the most-deployed self-hosted forge has **no CVE in the language it lives in**. Patching GitLab to 19.4.2 does not fix the Ruby underneath it if you build from source or ship a distro Ruby, which is exactly the gap Alpine hit. The exposure condition is narrow but common: "reached only when an application compiles a regular expression from a string that an attacker controls."

[`🔗 GitLab 19.4.2 patch release`](https://docs.gitlab.com/releases/patches/patch-release-gitlab-19-4-2-released/) · [`🔗 Ruby — regexp fixes for GitLab CVEs`](https://www.ruby-lang.org/en/news/2026/10/23/regexp-fixes-for-gitlab-cves/) · [`🔗 CVE-2026-97229 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-97229)

---

## 3. PHP2Shell plus the kernel bug we noted yesterday rooted 25 servers — 24 firewalls, one management server, and a government affiliate

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 219+ pts · ~10h ago (~18:42 UTC+8)
- **Tags:** `php` `pan-os` `kernel` `exploitation` `incident`

Dream published a chained-exploitation write-up on 2026-10-26, updated 2026-10-29: an automated batch rooted **24 internet-facing PAN-OS firewalls**, and a follow-on intrusion took an internal firewall management server, "bringing the total number of servers exploited to 25." Two of the 24 firewalls belonged to a US government-affiliated organization, and the management server the attacker pivoted to is described as "a third government server" — **three** government-affiliated systems in the 25. The chain is **CVE-2026-109618 / CVE-2026-109619** (PHP2Shell, 9.2) to execute as `nobody`, then **CVE-2026-46300** — the Linux kernel escalation that entered KEV on Oct 28 and that we covered in yesterday's feed — which overwrote the page cache of `/etc/pam.d/su` to reach root from an unprivileged process.

The timeline is tight: first government-affiliated firewall rooted **Oct 23 18:14 UTC**, second **Oct 24 10:09 UTC**, management server **Oct 24 11:35 UTC** — "less than 90 minutes after rooting the second firewall." Most of the fleet was left idle: "For 22 of the 24 rooted firewalls, the attacker did nothing beyond planting the webshell." Roughly **19,000** fingerprinted targets remain exploitable.

**Why it matters:** The caveats are the story. Dream states "What we cannot determine is whether the password spray, backdoor account creation, or SAML key extraction succeeded" and "we do not attribute this activity to a named threat actor." On the AI angle that circulated with the report, the authors withhold attribution and then argue the other way in the same sentence: "While we have no direct evidence that the AI tools were specifically used to write the exploit or the post-exploitation scripts, the code structure, commenting style, and consistency across ~40 scripts suggest AI-assisted development." Two 9.x bugs that each look manageable on their own composed into unauthenticated-to-root in under 90 minutes — which is the argument for treating the kernel record we noted yesterday and the PHP record as one incident, not two.

[`🔗 Dream — chained PHP2Shell roots 25 servers`](https://dreamgroup.com/blog/chained-php2shell-exploit-roots-25-servers) · [`🔗 PHP 8.5.12 / 8.4.27 / 8.3.36 / 8.2.35`](https://www.php.net/archive/2026.php) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=50286987)

---

## 4. Agno's 9.2 says "through 3.1.11" — 3.1.12 shipped 17 minutes before the record with the same `getattr`

- **Velocity:** ▮▮ rising
- **Source:** VulnCheck advisory · published 2026-10-29 14:17 UTC
- **Tags:** `cve` `agent-framework` `prompt-injection` `python` `rce`

**CVE-2026-119050** scores **9.2 (CVSS 4.0)** and **8.1 (CVSS 3.1)**, both from VulnCheck, with CWE-470 (external control of assumed-immutable name). `PandasTools` in Agno calls `getattr(pd, create_using_function)(**function_parameters)` where both the function name and its kwargs come from the model's tool call — so a prompt-injected agent can pick `pandas.read_pickle` on an attacker-supplied path and get code execution, or read any local file another reader can reach. The upstream issue, **#8699**, was opened **2026-07-02** and is still open.

The range is the defect. The advisory says "Agno through 3.1.11," implying 3.1.12 is fixed. **v3.1.12 was released 2026-10-29T14:00:55Z** — PyPI at 14:01:49, **17 minutes before the CVE published** — and its `libs/agno/agno/tools/pandas.py` contains the identical `getattr` line, unchanged from v3.1.11. `main` carries the same call at line 54, plus a second reflection surface at line 90 (`getattr(dataframe, operation)` with a model-controlled `operation`) that neither the advisory nor the CVE text mentions.

**Why it matters:** A CVE range is a claim about an artifact, and this one is 17 minutes out of date in the direction that matters — anyone who upgrades to the newest release on the strength of "through 3.1.11" ships the bug. Agno is at 42,951 stars and markets itself as "the self-driving agent platform"; `PandasTools` is a first-party tool, not a community plugin. Until the line changes, the only mitigation is not mounting the tool on an agent that reads untrusted content.

[`🔗 VulnCheck advisory`](https://www.vulncheck.com/advisories/agno-through-3.1.11-code-execution-via-pandastools-unsafe-reflection) · [`🔗 agno-agi/agno issue #8699`](https://github.com/agno-agi/agno/issues/8699) · [`🔗 pandas.py at v3.1.12`](https://github.com/agno-agi/agno/blob/v3.1.12/libs/agno/agno/tools/pandas.py#L54)

---

## 5. Tabularis gates read-only mode inside one tool — the other three MCP tools took a `table_name` straight into a PRAGMA

- **Velocity:** ▮▮ rising
- **Source:** GitHub Advisory · GHSA-xrx3-j98v-67x9 · 2026-10-28
- **Tags:** `mcp` `sql-injection` `agent-security` `sqlite`

**CVE-2026-118378** (VulnCheck: 7.8 CVSS 3.1, 8.5 CVSS 4.0; CWE-89 + CWE-863) is a SQL injection in Tabularis's SQLite driver: `describe_table` interpolates a caller-supplied `table_name` into a `PRAGMA` statement, and a crafted value "close[s] the quoted PRAGMA argument and append[s] statements to read, modify, or drop SQLite data." The advisory's own diagnosis is the interesting part — the product's read-only and write-approval checks are "implemented only inside `tool_run_query`," and `describe_table`, `list_tables` and `list_databases` "do not invoke the read-only or approval checks." The realistic trigger is named: "an AI agent driven by attacker-controlled/untrusted content."

Severity is deliberately scoped down. The vulnerable server is reached over **local stdio JSON-RPC**, not a socket (`AV:L`), and exploitation needs an agent session to issue the call (`UI:R`) — hence 7.8 rather than 9.x. One oddity in the advisory: affected is stated as `<= 0.18.0` and patched as `0.28.0`, leaving **0.19 through 0.27** unaddressed by any range; the project's newest release is v0.30.0 (2026-10-26).

**Why it matters:** The pattern here generalises past one app. Agent-facing tool surfaces assemble a safety perimeter per-tool, and a new tool added later inherits none of it. Tabularis's read-only mode was not bypassed — it was simply never consulted by three of four tools. Any MCP server that advertises a "safe" mode should be asked which tools actually call the check.

[`🔗 GHSA-xrx3-j98v-67x9`](https://github.com/TabularisDB/tabularis/security/advisories/GHSA-xrx3-j98v-67x9) · [`🔗 Fix commit`](https://github.com/TabularisDB/tabularis/commit/fd1bdbbae35e5367c32d1e7fe9c44cb1b6875d74) · [`🔗 v0.28.0 release`](https://github.com/TabularisDB/tabularis/releases/tag/v0.28.0)

---

## 6. Apple's own speech API gets swappable engines — 1.43% WER on clean LibriSpeech, and over 23% on real meetings

- **Velocity:** ▮▮ rising
- **Source:** Hugging Face Blog · 2026-10-29
- **Tags:** `apple` `speech` `swift` `core-ml` `on-device`

Mattt published two Swift packages that sit under Apple's new speech stack rather than beside it. **AnySpeechRecognizer** "implements Apple's new speech-to-text API with a choice of recognition engine" — Apple's own by default, plus NVIDIA Parakeet and Alibaba Qwen3-ASR running locally through Core ML, mirroring `SpeechAnalyzer`, `SpeechTranscriber` and `DictationTranscriber`. **AnyDecisionModel** answers "yes-or-no, multiple-choice, and rating-scale questions with typed results and probabilities" by reading probabilities instead of generating and parsing text.

The benchmark table is unusually specific and unusually honest. On 3–8 minute LibriSpeech files, Parakeet Unified reaches **1.43% / 2.19%** WER (test-clean / test-other) against Apple's own transcriber at **2.12% / 3.97%**. Then the sentence that should travel with every one of those numbers: on difficult meeting audio, "every engine we tested had a word error rate above 23%."

**Why it matters:** The requirements are the catch — Swift 6.2+, macOS 26 or iOS 26, Apple silicon for the Parakeet and MLX backends, and "So far, we've tested only on macOS 27, not on an iPhone." The decision-model side carries its own limits: next-token backends cap "a choice … at most 26 options, and a score at most 10 levels," and "It measures how concentrated the probabilities are, not whether the answer is right." That last line is the correct framing for every confidence score in the agent stack, not just this one.

[`🔗 Hugging Face — AnySpeechRecognizer and AnyDecisionModel`](https://huggingface.co/blog/anydecisionmodel) · [`🔗 mattt/AnySpeechRecognizer`](https://github.com/mattt/AnySpeechRecognizer)

---

## 7. IBM ships a model update with no delta size and no numbers — "nothing was recomputed" is the whole spec

- **Velocity:** ▮▮ rising
- **Source:** Hugging Face Blog · 2026-10-29 13:37 UTC
- **Tags:** `ibm-granite` `model-updates` `adapters` `release-engineering`

Granite Switch 4.1.1 treats a model release like a software patch: the 30B `granite-switch-4.1-30b` base stays frozen and only two components move — a new **0.5B Granite Speech ASR** model covering "10 languages with native punctuation and capitalization," and an updated Decision adapter in `granitelib-core`. The promise is versioning discipline: "fully backwards compatible with 4.1, no migration, incremental improvements under the hood," and "Apart from training the new ASR model and Decision adapter, nothing was recomputed: the base model is untouched."

What the post does not contain is any measurement. The Decision adapter's only benchmark claim is qualitative — "improved overall performance on the Jev Decision Index test set," with no score, no baseline and no per-language ASR error rate. There is also no byte-level size for the delta, so "update models like you update software" cannot be checked against what a user actually downloads.

**Why it matters:** The modular-adapter idea is the right one — compose "the latest adapters you want and deploy" on a single endpoint, and a 30B base stops being a 60 GB re-download per fix. But a patch release whose improvement is unquantified is a claim about architecture, not about the model. The tooling that would make it verifiable is also not out: "We're working on tutorials and an Adapter SDK."

[`🔗 Hugging Face — Granite Switch 4.1.1`](https://huggingface.co/blog/ibm-granite/granite-switch-4-1-1) · [`🔗 ibm-granite on Hugging Face`](https://huggingface.co/ibm-granite)

---

## 8. Five assistants were asked for statistics and 1,285 citations were traced — 40% reached a study that says the same thing

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 105+ pts · ~5h ago (~23:06 UTC+8)
- **Tags:** `ai-search` `citations` `research` `provenance`

Trakkr Research Study 013 ("Zombie stats," Mack Grenfell, 2026-10-28) asked ChatGPT, Perplexity, Gemini, Claude and Google AI Overviews **200 questions**, collected **1,000 answers** through APIs with web search on, and traced a random sample of **1,285** cited statistics up to five pages deep. The result: **40%** reached research that says the same thing (95% range 34–46%), **8%** reached the study but the number or context had changed, **40%** hit a source that could not be checked, **11%** reached no study at all, **1%** were dead pages.

The mechanism is provenance, not fabrication. "The cited page contained the figure" **82%** of the time, but only **21%** of cited pages were the original research — more than half were company blogs. Hence the study's line: "A citation tells you where the AI found a number, not where the number came from." Its canonical zombie is "44% of salespeople give up after just one follow-up attempt," which all five assistants produced and which traces to a 2020 sales firm's stats page and a 2017 freelance article, with no study behind either. On marketing-automation adoption the five answered **49–51%, 62%, 70–79%, 81%** and **96%**; across 71 questions where all five gave a percentage, 28 had four or five different figures.

**Why it matters:** Read the study's own limits before quoting it. Results came "through APIs," all questions were asked once on **25 October 2026**, and the AI judge "was stricter than a person" — model-only scoring found 23% sourced and human correction raised it to 40%, so the headline is the corrected number. Trakkr sells AI-search visibility monitoring and the page carries no conflict-of-interest disclosure. The transferable rule is the one at the bottom of the report: "Five assistants giving the same number isn't five sources."

[`🔗 Trakkr Research — Zombie stats`](https://trakkr.ai/trakkr-research/zombie-stats) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=50290283)

---

## 9. SkyPilot's 27% is a model, not a measurement — and its measured number is 14.4%

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 101+ pts · ~4h ago (~23:45 UTC+8)
- **Tags:** `gpu-scheduling` `nvl72` `infrastructure` `training`

SkyPilot's argument is that NVL72's rack-wide NVLink only pays off if a multi-node job stays inside one rack, and that schedulers currently ignore this. The headline is **27% more usable GPUs** — and it is a model, not an A/B: NVIDIA modeled a **128-rack, 2,304-node** cluster with "Each slice must fit within a single rack" and ~2% node unavailability, giving **2,037 usable nodes for 16-node slices against 1,602 for 18-node slices**. The 2% input is measured — "on production NVL72 clusters we have measured unavailability rates of around 2%" — but the 27% is the model's output at that input.

The separately measured number is smaller and still real: GR00T N1.7 pre-training on **512 GB300 GPUs across 128 nodes** improved throughput **14.4%**, cutting each iteration from **1.59 s to 1.39 s**. The supporting comparisons are conditional rather than general: 16-node beats 9-node by 4%, and against 8-node slices it doubles the NVLink domain while "sacrificing under 1% of usable capacity until unavailability exceeds about 3.3%."

**Why it matters:** Two spares cost something and the post says so — "two nodes per rack sit idle while everything is healthy" — and defragmentation only preempts workloads that can restart safely. So the honest framing is a scheduling problem with a priced trade-off, not a free 27%. Anyone quoting the top number for a cluster that is not 128 racks at 2% downtime is quoting someone else's configuration.

[`🔗 SkyPilot — Grace Blackwell needs a new scheduler`](https://skypilot.ai/blog/grace-blackwell-needs-a-new-scheduler) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=50290912)

---

## 10. t3dotgg publishes nine agent skills — and `full-send` merges the PR with nobody watching

- **Velocity:** ▮▮ rising
- **Source:** GitHub · 2,372 stars · created 2026-10-24
- **Tags:** `agent-skills` `claude-code` `codex` `pull-requests`

`t3dotgg/tstack` is a small, MIT-licensed set of nine skills that "work in Claude Code and Codex," published 2026-10-24 and already at **2,372 stars** with 6 open issues and 5 open pull requests. The skills are named for the verbs they perform — `file-pr`, `babysit-pr`, `takeover`, `modernize`, `council`, `sol-loop` — and they compose: `full-send` calls `sol-loop`, `file-pr` and `babysit-pr`; `takeover` also pulls in `modernize` and `leaving-pr-comments`.

The interesting one is `full-send`: it "Takes a change to a merged PR with nobody watching: proves it, reviews it, files it, babysits it, merges it." `full-stop` is the same pipeline with the merge removed. `council` "Gets review from three models from different providers, and loops until they agree" — which requires subagents on other providers' models, and the README says so: T3 Code's `delegate_task` or "a harness that can run those models." Requirements are an authenticated `gh` and `python3`.

**Why it matters:** This is the first widely-starred skill set that ships an unattended-merge loop as a first-class verb, and the design choice that makes it work is the dependency graph — review is a separate skill you can refuse to install. The README's own advice is the part most repos skip: "These are starting points. Edit them," with personal settings in `CLAUDE.md` or `AGENTS.md` so skill updates don't overwrite them.

[`🔗 t3dotgg/tstack`](https://github.com/t3dotgg/tstack) · [`🔗 skills/ directory`](https://github.com/t3dotgg/tstack/tree/main/skills)

---

## 11. gpu-unlock reaches the RTX 4090 at 2× tensor issue rate — and its own README says the cuBLAS gain is 12–34%

- **Velocity:** ▮▮ rising
- **Source:** GitHub · 4,502 stars (repo: `JustAResearcher/gpu-unlock-ada`) · created 2026-10-23
- **Tags:** `gpu` `rtx-4090` `firmware` `benchmarking`

`JustAResearcher/gpu-unlock-ada` (GPL-2.0) is a Linux kernel module that "enables the SM speed-select override before the stock NVIDIA driver starts," restoring tensor-core issue throughput for FP32-accumulate workloads on RTX 4090 (`10de:2684`, AD102), with a list of experimental Ada targets behind an opt-in flag. It builds on the approach we covered on Oct 25: it fetches pinned NVIDIA `610.43.03` inputs, verifies SHA-256 hashes, generates firmware locally, integrates the AD102 payload into Zagitta/gpu-unlock's module, then "writes SS0 `0x88888888` and SS1 `0x8`, then performs FLR before the unmodified NVIDIA driver binds."

The 2× headline is real but is not a speedup: FP16→FP32 goes **165.6 → 331.6 TF/s** and BF16→FP32 **165.5 → 330.6 TF/s**, and the repo states the unit itself — "These are register-resident issue rates, not application GEMM or inference speedups." Actual cuBLAS GEMM gains are **12–34%** for FP16 and **16–20%** for BF16, "essentially unchanged at 4096³," with no gain on a quantized mixture-of-experts workload and mixed FP8 evidence. It also needs a cold boot: "Loading the module manually after NVIDIA has bound the card cannot unlock it," and experimental targets must be opted in by PCI address because "`targets=all` never selects them."

**Why it matters:** This is the rare project that publishes the instruction-rate number and the application number in the same README and tells you which is which. The gap between 2× and 12–34% is the whole distance between a synthetic ceiling and what a training run sees — and the licensing note matters too: the kernel module is GPL-2.0-only, "NVIDIA firmware remains under its own terms," and no prebuilt firmware is distributed.

[`🔗 JustAResearcher/gpu-unlock-ada`](https://github.com/JustAResearcher/gpu-unlock-ada) · [`🔗 Measured effect section`](https://github.com/JustAResearcher/gpu-unlock-ada#measured-effect)

---

## 12. A simple agentic loop settles eight open Lean problems — and the paper says the Lean interface, not the loop, did the work

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.35962 · 2026-10-25
- **Tags:** `theorem-proving` `lean4` `agents` `scaling`

**h1** asks the bitter-lesson question directly: "can a simple agentic loop that scales test-time compute match these workflows?" It gives a model an efficient interface to Lean 4 and keeps it working through verifier feedback and self-reflection, "without imposing a decomposition or search structure." The result is state of the art on **PutnamBench, FATE-X and FormalConjectures100-Solved**, eight open problems settled in FormalConjectures, and at matched models it "matches or outperforms specialized workflows such as Goedel-Architect and AlphaProof Nexus" — with the striking finding that "a single attempt (pass@1) can often scale to solve open problems."

Then the paper spends its ablations taking the headline back. Against Claude Code and AxProverBase at matched models: "simplicity alone is not enough: an efficient Lean interface largely determines cost and solve rate." The recommendation that follows is the useful part — evaluate frontier models with efficient execution feedback *before* prescribing a workflow, "at the risk of bitter lessons."

**Why it matters:** A five-author paper (Moalla, Rammal, Patel, Munos, Kempe) that reports SOTA and then attributes it to the interface rather than the architecture is doing the thing this feed keeps asking for: naming which variable was actually manipulated. The practical read is that a harness's tool ergonomics dominate its orchestration graph, which is the same conclusion agent-infra teams keep reaching from the other direction.

[`🔗 arXiv 2610.35962`](https://arxiv.org/abs/2610.35962) · [`🔗 Full text (HTML)`](https://arxiv.org/html/2610.35962v1)

---

## 13. Outcome RL adds at most 2.1 points of reach — and 3.5% of the problems it "newly" solves survive a resample

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.34894 · 2026-10-26
- **Tags:** `reinforcement-learning` `evaluation` `reasoning` `benchmarks`

A single-author paper (Shan Yang) decomposes the pass@1 gain of **20 released RL models (1.5B–32B)** over the thinking models they started from into three parts: **finishing** (answering before the token budget runs out), **reliability** (being right once finished), and **reach** (problems the base answered wrongly in all eight tries that RL now solves, minus the reverse). At fixed token budgets on physics and math sets, the answer is that RL mostly moves the first two.

Where the base model often hits the budget, "most of the change, gain or loss, is finishing (82% at 4k and 8k)" — and "Given more tokens, the base closes most of the finishing gap itself." Where the base has enough tokens, the gain is reliability. Reach is small: "Reach adds at most 2.1 percentage points on any of our four physics and math sets," and of **144** problems only the RL model solved, "3.5% hold up when resampled or read." In a random sample, "nine of ten new RL steps a human confirmed also appear in the base's samples."

**Why it matters:** This reframes what an RL run buys, and it lands on the same week the feed has been tracking harness-versus-model questions. If most apparent RL progress is budget management and grading consistency, then a benchmark that doesn't fix the token budget — or that grades one attempt — is measuring the wrong axis. The paper's own last finding is the honest one: in a small RL run on an 8B model, the gain on new problems was finishing, with reliability flat.

[`🔗 arXiv 2610.34894`](https://arxiv.org/abs/2610.34894) · [`🔗 Full text (HTML)`](https://arxiv.org/html/2610.34894v1)

---

## 14. NetBSD adds a 48-kilobyte editor to its base system — small enough for the rescue image

- **Velocity:** ▮ steady
- **Source:** Hacker News · 141+ pts · ~8h ago (~19:59 UTC+8)
- **Tags:** `netbsd` `editors` `base-system` `posix`

The NetBSD Foundation announced on 2026-10-28 that `-current` "now includes an alternative editor to vi(1) and xedit(1) in its base system, atto(1)." It is a modeless screen-based editor in the nano/pico/xedit family, and the reason it exists is stated with unusual directness: "It is only 48 kilobytes, making it suitable for inclusion in the rescue system." The announcement closes with the joke the announcement is aware of — "(This is real, but I'm honestly missing an opportunity by not posting it on 1 April. Let the editor wars commence!)"

**Why it matters:** Base-system composition is one of the last places where a few dozen kilobytes is a design constraint rather than a rounding error, and rescue media is the case where the constraint bites hardest — vi is fine until the terminal or the keyboard isn't. A 48 KB modeless editor is a smaller dependency surface than either alternative, and the man page is the primary source rather than the post.

[`🔗 NetBSD announcement (Mastodon)`](https://mastodon.sdf.org/@netbsd/117518160563539748) · [`🔗 atto(1) man page`](https://man.netbsd.org/atto.1)

---

## 15. OpenIDEA rebuilds the JetBrains workflow in Rust — 169 MB against 2,011 MB, on a benchmark its own README qualifies

- **Velocity:** ▮ steady
- **Source:** GitHub · 1,239 stars (measured 2026-10-30 04:25 UTC) · created 2026-10-21
- **Tags:** `ide` `rust` `tauri` `performance`

`l0ng-ai/openidea` (Apache-2.0) takes the IntelliJ IDEA way of working — keymap, tool windows, search-everywhere — and rebuilds it on a Rust core with Tauri, covering editor, code insight, debugger, Git, terminal, database and HTTP clients for 60+ languages, on macOS, Windows and Linux. At **1,239 stars**, 63 open issues and 9 open pull requests nine days after creation — up from 1,024 / 46 / 9 earlier the same morning, so the counters are still moving — it is the most concrete entry yet in the "rebuild the IDE" genre.

The published benchmark opens `freqtrade` (Python, ~770 files) with warm caches, median of 5 runs, against IntelliJ IDEA 2026.2.3 on Windows 11: window with the project **0.9 s vs 3.1 s**, ready **1.1 s vs 13.2 s**, memory (USS, all processes) **169 MB vs 2,011 MB**, CPU time until ready **2.4 s vs 47.9 s**, quit **0.3 s vs 5.9 s**. The README then undercuts its own table: "IDEA analyses Python more deeply, so 'ready' doesn't mean the same work on both sides."

**Why it matters:** The qualification is the finding. A 12× speedup on "ready" is partly a 12× difference in what happens before the editor calls itself ready, and a project that says so in the same section as the table is more trustworthy than one that doesn't. Read the memory row as the durable claim — 169 MB against 2,011 MB is a difference in kind, not in scheduling.

[`🔗 l0ng-ai/openidea`](https://github.com/l0ng-ai/openidea) · [`🔗 Benchmark section`](https://github.com/l0ng-ai/openidea#benchmark)

---

## 16. An OpenAPI document can write `func init()` into your generated Go — oapi-codegen's enum template was the injection point

- **Velocity:** ▮ steady
- **Source:** VulnCheck advisory · CVE-2026-119028 · 2026-10-29
- **Tags:** `go` `openapi` `code-generation` `supply-chain`

**CVE-2026-119028** (8.8 CVSS 3.1, 8.7 CVSS 4.0, both VulnCheck; status `Awaiting Analysis`) affects `oapi-codegen` **2.0.0 before 2.8.1**: an attacker controlling an OpenAPI document can craft a non-literal enum entry in an integer, number or boolean schema that "closes the const block in `constants.tmpl` and injects a `func init()`, executing code when the generated package is built and imported." No hand-editing of the generated file, no build step beyond the normal one — the payload runs at package initialization.

The fix is in **2.8.1** (PR #2626, commit `068f1bcd`), and the diff lands exactly where the advisory says: `pkg/codegen/templates/constants.tmpl` moves from line 12 in v2.0.0 to line 16 in v2.8.0.

**Why it matters:** OpenAPI documents arrive from third parties — vendor specs, partner repos, public API registries — and are usually treated as data. This makes one of them a source file for code that executes on import. The trust boundary that needs moving is "whose spec do we run the generator on," and the record is still unanalyzed, so the score is VulnCheck's alone.

[`🔗 VulnCheck advisory`](https://www.vulncheck.com/advisories/oapi-codegen-2.0.0-before-2.8.1-code-injection-via-non-string-enum-values) · [`🔗 GHSA-g2vv-83pm-v2hc`](https://github.com/oapi-codegen/oapi-codegen/security/advisories/GHSA-g2vv-83pm-v2hc) · [`🔗 constants.tmpl`](https://github.com/oapi-codegen/oapi-codegen/blob/v2.8.0/pkg/codegen/templates/constants.tmpl#L16)

---

## 17. Agent serving stalls on tool returns, so TAO schedules them together — up to 26.8% lower latency

- **Velocity:** ▮ steady
- **Source:** arXiv 2610.37230 · 2026-10-27
- **Tags:** `agents` `serving` `scheduling` `inference`

TAO starts from an observation that most serving stacks miss: an agentic service "alternate[s] between model inference on clustered GPUs and external tools on distributed CPUs," and existing systems "overlook tool-return readiness in service evaluation" while using heuristics for GPU admission and placement. Its value interface combines near-term tool readiness, node-specific cache credit with time-aware decay, and token footprint, and a dynamic program jointly selects and places waiting sessions under capacity constraints.

The reported results are "up to" figures across 12 model-workload-concurrency settings: latency down **26.8%**, mean time to first token down **36.3%**, decode throughput up **29.5%** — each measured "relative to the best evaluated state-of-the-art baseline for each metric."

**Why it matters:** Per-metric best baselines are the right way to report and the hardest way to summarise: the three percentages do not come from one comparison run, so they do not add up to "TAO is 26–36% better." The real contribution is the unit of scheduling — an agent request is not a token stream, it is a token stream that periodically blocks on a CPU, and a scheduler that can't see the block is scheduling half a workload.

[`🔗 arXiv 2610.37230`](https://arxiv.org/abs/2610.37230) · [`🔗 Full text (HTML)`](https://arxiv.org/html/2610.37230v1)

---

## 18. Since our Oct 28 note on ggml-rpc: a second record, this time a DoS — and the range starts at build b2877

- **Velocity:** ▮ steady
- **Source:** NVD · CVE-2026-119052 · published 2026-10-29 14:17 UTC
- **Tags:** `llama-cpp` `cve` `rpc` `denial-of-service`

**CVE-2026-119052** (8.7 CVSS 4.0, 7.5 CVSS 3.1, both VulnCheck) is a second ggml-rpc record two days after the stack-overflow we covered on Oct 28 — same exposed `rpc-server`, different defect. After the HELLO handshake, a client can send a command such as `SET_TENSOR` with a length above `std::vector::max_size()`, "triggering an uncaught `std::length_error` that aborts the process and denies service to all clients." No authentication, no RDMA capability needed this time; the fix is in build b11935 (PR #31204).

The range is the notable part: **b2877 before b11935**, which reaches back far past the RDMA bug's b8841. The severity is correctly lower — `VC:N/VI:N/VA:H` on the 4.0 vector, availability only.

**Why it matters:** Two unauthenticated records against the same RPC surface in two days is a pattern, not two incidents: the `rpc-server` was built as a trusted-cluster component and is being reported as an internet-facing one. If you expose `--rpc-server` beyond a private network, both records apply, and only one of them is scored above 9.

[`🔗 CVE-2026-119052 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-119052) · [`🔗 Fix PR #31204`](https://github.com/ggml-org/llama.cpp/pull/31204)

---

## 19. An unauthenticated `GET /api/flows/:id` read any YAML on disk — OpenHop's id went to `path.join` without an allow-list

- **Velocity:** ▮ steady
- **Source:** GitHub Advisory · CVE-2026-59179 · 2026-10-28
- **Tags:** `path-traversal` `nodejs` `cve` `web-apps`

**CVE-2026-59179** (8.3, scored by GitHub's advisory team) affects `@openhop/server` before **0.3.7**. `GET /api/flows/:id` and `DELETE /api/flows/:id` pass the route parameter to `FlowStore.filePath()` "without an identifier allow-list"; the router applies `decodeURIComponent`, and `path.join()` then "normalizes traversal outside the configured flow directory after appending the .yaml extension." An attacker reads any accessible `.yaml` file as YAML-parsed JSON, or deletes it — the `DELETE` verb makes this destructive as well as disclosing, with no authentication on either route.

**Why it matters:** The bug is a two-line composition failure — decode, then join — where each step is individually reasonable and the pair is not. `path.join` normalizing after the extension is appended is exactly the detail that defeats the naive "ends with .yaml" check, and the fix (PR #190, commit `c8190fb`) is in v0.3.7. Small projects ship this shape constantly; the only unusual thing here is that it is on an unauthenticated route with a delete verb attached.

[`🔗 CVE-2026-59179 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-59179) · [`🔗 Fix PR #190`](https://github.com/naorsabag/openhop/pull/190) · [`🔗 v0.3.7 release`](https://github.com/naorsabag/openhop/releases/tag/v0.3.7)

---

## 20. Fowler says LLM prose has an uncanny valley — and that accepting a rephrase is already the mistake

- **Velocity:** ▮ steady
- **Source:** Hacker News · 221+ pts · ~5h ago (~22:57 UTC+8)
- **Tags:** `writing` `llm` `craft` `culture`

Martin Fowler's bliki entry argues that LLM-generated prose triggers a human reaction — "that sense that we are in an uncanny valley of prose" — and that detection tooling is the wrong response, because the reader's reaction lands before any checker runs. The recommendation is stronger than the usual "don't let it write for you": "I strongly recommend that authors should not fall into the trap of getting the LLM to write a draft," and "Even accepting suggestions of rephrasing is dangerous." His reason is about comprehension, not style: "the act of wrestling with the words forces me to overcome my confusions," and delegating the words risks delegating the thinking.

**Why it matters:** There are no numbers in the piece and Fowler does not pretend otherwise — he voices "skepticism about their accuracy" regarding detectors rather than citing them. The caveats are stated: "it isn't an absolute one," accessibility is a real exception (Jim Highsmith on working with an LLM through Parkinson's disease), and administrative documents may reasonably be machine-written. The disclosure at the end is the part worth copying: "I did not use AI or LLMs in any way while writing this post."

[`🔗 martinfowler.com — LLM Voice`](https://martinfowler.com/bliki/LLM-Voice.html) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=50290177)

---

## 21. Binance says $6.3B left its hot wallets — and its own account of how is a DevOps laptop, not a leaked key

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 913+ pts · ~6h ago (~05:38 UTC+8)
- **Tags:** `binance` `exchange` `incident` `custody` `ethereum`

Binance estimated the damage at "**around $6.3 billion in stolen assets**" and said "**Some $3 billion of assets were frozen**," including "$2.3 billion in USDT and USDC stablecoins altogether." The estimates do not agree, and they are not measuring the same thing: Chainalysis says "roughly **$5.9 billion** at the time of the theft," Arkham reports "more than **$5.7 billion** in various cryptos" describing the hacker wallets "at one point" — a holdings snapshot, not a loss — and Coinbase's Conor Grogan put it at "up to **$5.8 billion**." Tether froze "over $1.57 billion in USDT"; Circle froze "over $800 million in USDC."

The mechanism is the contested part, and Binance's own version is not the on-chain story that circulated first. Its "initial investigation" says the incident "may involve a **compromised DevOps engineer's laptop**," which allowed the attacker to "gain access to a service container and submit unauthorized withdrawal transactions" — followed by the sentence that reframes the whole class of bug: "**We have found no evidence of any wallet private key leak.**" Earlier in the day, SecurityAffairs was still listing the open question as "whether credentials or signing mechanisms were compromised," and cautioning that "Large transfers alone don't prove a hack."

**Why it matters:** Three numbers will be quoted as one — Binance's own impact estimate, a third party's valuation at theft time, and Arkham's wallet snapshot — so the first thing to fix is the unit. The second is the mechanism. An exchange draining $6.3B through *withdrawal transactions submitted from a service container* is an architecture where the signing path and the key are separate objects, and the control that fails is on the container, not the HSM. CoinDesk also keeps the hedge its headline drops: "would be the largest ever crypto attack," conditional, plus "The transfers alone, however, don't establish whether the funds have become impossible to freeze or recover." Market: bitcoin "dropped 4.8% to below $77,000," ether −5.7%, BNB −8%, AAVE −11%.

[`🔗 CoinDesk — Binance loses $5.7 billion in largest crypto hack to date`](https://www.coindesk.com/business/2026/10/29/potential-multi-billion-binance-hack-hitting-crypto-markets) · [`🔗 Security Affairs — Binance investigates suspicious transfers worth up to $5.8 billion`](https://securityaffairs.com/202089/hacking/binance-investigates-suspicious-crypto-transfers-worth-up-to-5-8-billion.html) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=50296470)

---

## 22. YC ran agent swarms in Minecraft and Mindustry — GPTs won 6–1 and read the game's own source code

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 215+ pts · ~6h ago (~05:40 UTC+8)
- **Tags:** `multi-agent` `agent-harness` `benchmark` `minecraft` `mindustry`

YC Labs and Olam Labs ran three multi-agent experiments and open-sourced the harnesses behind them: `yc-software/minecraft-agent-harness` (MIT, created 2026-10-29, 24 stars), `olamlabs/multi-agent-mindustry` (GPL-3.0) and `olamlabs/harbor-multiagent` (Apache-2.0, a fork of the Harbor framework behind Terminal-Bench, which the post says "runs multiple agents in any environment").

The numbers are concrete. **Civ50**: 50 GPT-6.1 Sol agents, 3 hours, one goal — "Build a thriving civilization" — about **5,900 messages**, a ration ledger and a pseudo-government. Hierarchy formed from the agent directory's order, so "Ada, who was first, became the de facto leader." 34 agent deaths total, **22 in the first night**, which the page then corrects against its own chart: "The first-night count in the text is the 22 deaths before minute 20. Two of them fall outside the shaded band." **Bed Wars**: nine 45-minute games, 10 Claude Opus 5.5 against 10 GPT-6.1 Sol — "GPTs won our series **6–3**." **Mindustry**: 7 games, about 9.5 hours — "The GPTs (GPT-6.1 Sol in Codex) won **6-1** against the Claudes (Claude Opus 5.5 in Claude Code) in the 7 games," with game 3 running 4 hours 16 minutes.

The behavioural differences are the interesting output. GPT teams compressed messages until spaces disappeared (`G7T5FIRSTcourierLIVE`), the Claudes adopted a "+1" proposal-and-vote system, and — the finding with the widest implication — "When stuck, GPTs read the source code," fetching Mindustry's public source from the web to reason about units and mechanics. "This did not let them alter the source code of the game." And: "The Claudes never searched up game code from the web."

**Why it matters:** The methodological sentence is the one to test any agent-swarm claim against: "**We intentionally do no harness-level customization or special memory work.**" That makes the runs legible and reproducible, but it does not make them a model comparison — the models ran inside different harnesses (Codex vs Claude Code), so a 6–1 series is a statement about the *pairing*, the conclusion this feed keeps running into from the other direction. The tactical detail is the honest one: Claude lost game 6 with "55 of them were loaded with COPPER" in the anti-air turrets, and in game 7 built "a ring of 207 duos fed with graphite" that stopped "the same 24-zenith strike" — a measured fix, not a smarter model.

[`🔗 YC Labs — Agents in Games`](https://labs.ycombinator.com/projects/games/index.html) · [`🔗 yc-software/minecraft-agent-harness`](https://github.com/yc-software/minecraft-agent-harness) · [`🔗 olamlabs/multi-agent-mindustry`](https://github.com/olamlabs/multi-agent-mindustry) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=50296486)

---

## 23. IBM published 33 Langflow CVEs in 151 seconds — and three of them were fixed 198 days earlier

- **Velocity:** ▮▮▮ trending
- **Source:** NVD / IBM PSIRT · 33 records, 2026-10-29 16:17:35–16:20:06 UTC
- **Tags:** `cve` `langflow` `agent-platform` `mcp` `disclosure-lag`

Thirty-three CVEs against "IBM Langflow OSS" entered NVD inside a **two-and-a-half-minute window**: six Critical (**three 9.9, three 9.8**), eleven High, sixteen Medium. Every score belongs to one party — `psirt@us.ibm.com`, in the `Primary` slot on some records and `Secondary` on others, which is exactly why the slot is not a provenance. NVD has published no score of its own: every record in that window sits at **`Undergoing Analysis`** (CVE-2026-107328, one of the three 9.9s, included), and `configurations` is null on all of them, so no CPE range exists anywhere in the batch. The product is `langflow-ai/langflow` — **156,149 stars, MIT**, with v1.13.0 out on 2026-10-22 and the bulletin's own command naming the same artifact: `pip install --upgrade "langflow==1.13.0"` and `langflowai/langflow:1.13.0`.

The batch is really **three bulletins**, and the reference list splits cleanly by fix wave: `node/7293015` (16 CVEs, "1.0.0 - 1.12.3" → upgrade to **1.12.4**), `node/7293016` (13 CVEs, "1.0.0 - 1.12.4" → **1.12.5**), `node/7294467` (4 Langflow CVEs plus three **Hono** dependency CVEs scored by `security-advisories@github.com`, "1.0.0 - 1.12.8" → **1.13.0**). Those releases shipped 2026-09-29, 2026-10-06 and 2026-10-22 — **30, 23 and 7 days** before publication.

Then the range stops being true. Bulletin 7293016 says it plainly: "**This bulletin also discloses fixes delivered in prior releases: CVE-2026-107366 was fixed in version 1.9.0; CVE-2026-18894 was fixed in version 1.11.2; and CVE-2026-77817 was fixed in version 1.11.5.**" Those releases shipped 2026-04-14, 2026-08-04 and 2026-08-25 — **198, 86 and 65 days** before the record — yet each CVE's own description still reads "1.0.0 through 1.12.4," and with `configurations` null there is no field anywhere in the record that carries the correction. CVE-2026-107366 is the worst of the three: it published **separately on 2026-10-20**, nine days ahead of this batch, carrying the same overstated span.

**Why it matters:** The MCP workarounds are the part a Langflow operator should read today. Bulletin 7293016 says: "Set `LANGFLOW_MCP_SERVER_INTERPRETER_HARDENING=true` to reject direct shell-script execution, and set `LANGFLOW_CUSTOM_COMPONENT_ADMIN_ONLY=true` to block non-admin MCP stdio access," adding "**These controls do not replace the upgrade**" — while also naming the flag that undoes them: "Explicitly enabling `LANGFLOW_ALLOW_PUBLIC_CUSTOM_COMPONENTS` permits custom component execution and changes the default protection described for CVE-2026-18894." Bulletin 7294467's summary names "**unauthenticated remote code execution exploitable through model context protocol tool enumeration**" among four issues it groups. And the ceiling is a disclosure-lag measurement, not a severity one: the same afternoon carried fixes from April, August, September and October, so "33 CVEs today" describes when the paperwork closed, not when the code changed.

[`🔗 IBM bulletin node/7293015 (16 CVEs → 1.12.4)`](https://www.ibm.com/support/pages/node/7293015) · [`🔗 IBM bulletin node/7293016 (13 CVEs → 1.12.5, MCP workarounds)`](https://www.ibm.com/support/pages/node/7293016) · [`🔗 IBM bulletin node/7294467 (4 CVEs + Hono deps → 1.13.0)`](https://www.ibm.com/support/pages/node/7294467) · [`🔗 CVE-2026-107328 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-107328)

---

## 24. CVE-2019-25781 carries 2019 in its ID and 2026-10-29 in its `dateReserved` — and the fix is "we just need to get around to the refactor"

- **Velocity:** ▮▮ rising
- **Source:** NVD / cveawg / GitHub · published 2026-10-29 13:08 UTC
- **Tags:** `cve` `python` `markdown` `redos` `maintenance`

VulnCheck published **CVE-2019-25781** on 2026-10-29: **CVSS 3.1 7.5** and **CVSS 4.0 8.7**, both scored by VulnCheck, with CWE-407. The description: "Python-Markdown 3.0 through 3.11.2 contains an algorithmic complexity vulnerability in inline link parsing that allows remote attackers to exhaust CPU through unmatched brackets," forcing `LinkInlineProcessor.getText()` and `getLink()` "into quadratic scans that keep workers busy for minutes."

The year in the identifier is not the year of the reservation. cveawg's `dateReserved` for this record is **2026-10-29T11:51:49.648Z** — **77 minutes** before it published. The "2019" is VulnCheck's pointer to the original report: issue **#798, "Parsing [[[[[[… takes quadratic time", opened 2019-03-06** and **still open** today.

The record names no fix. Its CNA container states `affected: [{version: "3.0", lessThanOrEqual: "3.11.2"}]` with `defaultStatus: "unaffected"`, no `unaffected` entry, no `changes[]` — and **3.11.2 is PyPI `latest`**, uploaded 2026-10-19. The upstream trail says why. On 2026-10-13 a reporter opened **#1654** with six quadratic payload shapes in one issue and the line "One line of input is enough." A maintainer closed it 71 minutes later: "I would duplicate link discusion to https://github.com/Python-Markdown/markdown/issues/798 … We just need to get around to the refactor," and added the part that will travel: "I know it is easy to tell AI to find every performance issue, but then just posting a novel of them all in a single issue isn't very helpful."

**Why it matters:** This is a case where every date-shaped signal is wrong in a different direction and the only honest statement is the one the fields support: the ID says 2019, `dateReserved` says October 29, 2026, the code was reported in 2019, re-reported in October 2026, and the only version that exists to install is the one the record calls affected. The 7.5-versus-8.7 spread is also a same-source pair — one CNA, two CVSS versions, 1.2 points apart — so quoting either without its version produces a number nobody has to defend. The practical read for anything rendering user Markdown — MkDocs, wikis, doc pipelines, and every agent harness that converts a fetched README — is that the mitigation is a timeout on the renderer, not an upgrade, because there is no upgrade.

[`🔗 CVE-2019-25781 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2019-25781) · [`🔗 Python-Markdown issue #798 (opened 2019-03-06, still open)`](https://github.com/Python-Markdown/markdown/issues/798) · [`🔗 Issue #1654 (opened and closed 2026-10-13)`](https://github.com/Python-Markdown/markdown/issues/1654)

---

## 25. Evo 2's 40B checkpoint scores 25.7% on Blackwell — the gap is one projection's summation order, not its weights

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.39415 · 2026-10-29
- **Tags:** `quantization` `fp8` `reproducibility` `gpu` `checkpoints`

Two authors (Xun Ding, Ziyuan Qin) start from a sentence that reads like a spec bug: "**FP8 formats specify how values are stored, not how products are summed; this gap can break checkpoints.**" Evo 2, a DNA language model, documents a Hopper FP8 requirement for its 1B and 40B checkpoints. On two Blackwell (sm_120) GPUs both fail the developers' forward test — the 7B passes — and "on an RTX 5070 Ti the 40B's next-base accuracy is **25.7%**, near guessing."

The finding is that the failure is arithmetic, not numerical noise. On Hopper, "natively, **99.996%** of one projection's outputs are correctly rounded (**H100: about 30%**), and fp32 accumulation of the same operands fails" — so *more* precision makes it worse, because the model was validated against one specific rounding. Their H100 FP8 GEMM emulator (mmaemu, "bit-exact on captured 1B projections") localises the dependence to **the 1B's first projection of 21**, where "exact sums fail but pass when shrunk by the H100's 1.4% (measured in-sample), not 2.1%." Emulating that single projection — weights unchanged — "raises 40B BRCA1 variant-classification AUROC from **0.434 to 0.869** (H100: 0.868)" on the RTX 5070 Ti, and 0.481 → 0.867 on an RTX PRO 6000.

**Why it matters:** The caveats are stated by the authors, and they bound the claim: "We tested one model family but not training origin," and the 1.4% shrink is measured in-sample. But the recommendation is the reusable part — "**releases should specify reference arithmetic**" — because a checkpoint that only reproduces under one GPU's accumulation order is not portable in the way its licence and file format imply. The tell for anyone deploying FP8 weights: a large benchmark drop that disappears when you emulate the reference kernel means you are not testing the model, you are testing which matmul the vendor validated against. A forward test passing on the developer's hardware is not a compatibility statement for yours.

[`🔗 arXiv 2610.39415`](https://arxiv.org/abs/2610.39415) · [`🔗 Full text (HTML)`](https://arxiv.org/html/2610.39415v1)

---

## 26. A world model and its player both fit on a Pico 2 W — 26k–131k parameters, 2–8M multiply-adds a frame

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 163+ pts · ~8h ago (~04:32 UTC+8)
- **Tags:** `world-models` `edge` `microcontroller` `transformers` `games`

`SheepSeb/tinyworldformer` (138 stars, created 2026-10-22, **no licence file**) puts two networks on a Raspberry Pi Pico 2 W and runs them on the same core. Network one predicts the next frame and reward from the current frame plus an action — a **looped transformer, int8, 26k–131k parameters, 2–8M multiply-adds per frame**. Network two picks the action — an MLP with two hidden layers, float32, **9k–16k parameters**. Both also run in the browser as WebAssembly, so you can play the dream yourself.

Five games, each a few hundred lines of numpy, with a held-out accuracy table: Breakout **99.99%**, Flappy Bird **100%**, Pong **99.45%**, Pac-Man lite **86.4%**, Doom-lite **83.6%**, where "Exact frames" is defined as "the share of held-out transitions where every cell of the predicted frame matches the real game," excluding frames right after a random event. On-chip, "the actor only sees frames the world model generates, and the world model only gets actions from the actor" — core 1 does both, core 0 handles USB and the display.

**Why it matters:** The accuracy table's weakest row comes with its own explanation, which is the reason to trust the other four: "Doom-lite's 3D view has 768 cells and a single shaded wall pixel off counts the whole frame as wrong, so its number looks worse than it plays; the game state is almost always right." That is an exact-match metric behaving exactly as an exact-match metric should, disclosed rather than quietly redefined. The design constraint is the interesting one — one frame must hold the whole game state, so hidden state has to be *drawn* into the frame ("the ball's heading is part of its token, and Doom-lite has a minimap") — which is a cleaner statement of what a world model is than most papers manage.

[`🔗 tinyworldformer — research demo`](https://sheepseb.github.io/stealth/posts/tinyworldformer.html) · [`🔗 SheepSeb/tinyworldformer`](https://github.com/SheepSeb/tinyworldformer) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=50295450)

---

## 27. ElementaryUI added SSR, persistent reactivity and keyed lists in three days — Swift in the browser, Apache-2.0

- **Velocity:** ▮ steady
- **Source:** Hacker News · 74+ pts · ~7h ago (~04:56 UTC+8)
- **Tags:** `swift` `webassembly` `frontend` `reactive-ui`

`elementary-swift/elementary-ui` (**557 stars, Apache-2.0**, created 2024-09-29) builds "SwiftUI-style apps that run in the browser" — declarative Swift compiled to WebAssembly through Embedded Swift, with `@State`, `@Environment` and `@Reactive` carrying the reactivity model. The pitch that matters for bundle size: "Full Embedded Swift support means **kB-sized wasm bundles instead of MB**." v0.8.1 shipped 2026-10-27; what put it on Hacker News was the three days of commits after it — "basic support for SSR/SSG rendering of ElementaryUI views (#145)", "persistent reactive listeners (#146)", "cheaper listener fan-in and inline tracked dependencies (#147)", "allocation-free listener callback for schedulable nodes (#148)" and "keyed `ForEach` with `id:` and per-row tracking (#149)".

**Why it matters:** SSR/SSG and keyed list identity are the two features that separate a demo framework from one you can ship — the first decides whether a page renders before the wasm loads, the second decides whether state survives a reorder — and both landed in a single week on a project two years old. The scoping is also stated rather than implied: "ElementaryUI is an open-source project and not affiliated with or endorsed by Apple Inc." If the wasm bundle really is kilobytes, the interesting question is not whether Swift can run in a browser but whether a compile-to-wasm UI framework can hold identity and hydration semantics without a virtual DOM — which is what commits #146 through #149 are actually testing.

[`🔗 elementary.codes`](https://elementary.codes) · [`🔗 elementary-swift/elementary-ui`](https://github.com/elementary-swift/elementary-ui) · [`🔗 v0.8.1 release`](https://github.com/elementary-swift/elementary-ui/releases/tag/0.8.1)

---

## 28. RetroChessBench asks for a chess history and GPT 6 Astra fails 22 of 24 attempts — 18 of 24 with code execution

- **Velocity:** ▮ steady
- **Source:** arXiv 2610.39341 · 2026-10-29
- **Tags:** `benchmark` `reasoning` `chess` `tool-use`

A single-author paper (Tidor-Vlad Pricope) builds a **12-task** benchmark in retrograde chess — reconstruct legal histories and "distinguish possible events from forced ones" — with "references, rubrics, and a terminal-reward environment," covering "exact-length constructions, unique endings, and exhaustive answer sets." In "two trials per task and condition, **GPT 6 Astra High fails to produce the required final answer in 22/24 attempts without tools and 18/24 with code execution**; mean terminal RL rewards are **14.75% and 27.19%**, respectively."

The failure modes are named rather than scored away: "failed responses reject legal histories and treat temporary obstructions as permanent." And the hypothesis is offered as a hypothesis — that "limited exposure to these missing explanations in web-derived training data contributes to the observed reasoning failures," since "online retrograde archives often provide puzzles and final move sequences without detailed derivations."

**Why it matters:** Retrograde chess is the clean version of the question this feed keeps circling: a domain with explicit, checkable rules and almost no worked solutions on the web. A frontier model that contributes to research mathematics but cannot reconstruct a legal history is not a contradiction — it is evidence that mathematical performance is partly retrieval of solution *shapes*, which is the paper's own conclusion: "Claims of general intelligence require evidence that models can transfer learnt principles to areas with few worked examples." The 14.75% → 27.19% jump from adding a code interpreter is also worth reading as a harness result before a model result — the same task, the same model, one tool.

[`🔗 arXiv 2610.39341`](https://arxiv.org/abs/2610.39341) · [`🔗 Full text (HTML)`](https://arxiv.org/html/2610.39341v1)

---

## 29. Pico CSS is archived — 16,828 stars, a final release nineteen months old, and AI named as the reason

- **Velocity:** ▮ steady
- **Source:** Hacker News · 62+ pts · ~2h ago (~09:58 UTC+8)
- **Tags:** `css` `open-source` `maintenance` `frameworks`

The discussion "Pico CSS is no longer maintained" reached Hacker News on 2026-10-30, but the decision is older than the thread: the repositories were archived on **2026-10-04**, and the post is dated the same day. `picocss/pico` is now `archived: true` at **16,828 stars**. The reason given is unusually direct: "**Today, AI can generate lightweight, standalone, accessible HTML with just the CSS it needs, so a Minimal CSS Framework for Semantic HTML matters less than it used to.**" The alternative was a rewrite it declined to do — "plain modern CSS instead of Sass, built on features it doesn't use today (OKLCH colors, cascade layers, Popover, anchor positioning)," plus "a native compiler that strips unused CSS" — which "would be a different project."

What stays: "Nothing breaks. npm, the jsDelivr CDN and picocss.com stay online for the long term." What stops: "The repositories are archived. No new issues, PRs or releases." And the fork terms are the part most projects get wrong — "Pico CSS is MIT licensed. You're free to fork it," immediately followed by "**The Pico CSS name and logo are not covered by the MIT license. Please give your fork its own name**, so users don't confuse it with the original."

**Why it matters:** Read the reason against the timeline before repeating it. The final release, **v2.1.1, shipped 2025-03-15** — both on GitHub and on npm — so the project had gone **nineteen months** without a release before it was archived, and "AI made it unnecessary" is being offered for a maintenance gap that predates the explanation. That does not make the reason wrong; it makes it untestable, and it is the first widely-used framework in this feed to name AI as the cause of a shutdown rather than a feature. The cleanly separable part is the licence split — MIT on the code, trademark on the name — which is the correct arrangement and the one that keeps a fork from inheriting users who did not choose it.

[`🔗 picocss/pico discussion #754`](https://github.com/picocss/pico/discussions/754) · [`🔗 picocss/pico (archived)`](https://github.com/picocss/pico) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=50298964)

---

## 30. The official Claude Code extension on Cursor's marketplace shipped an SSH backdoor in 2.1.313

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 143+ pts · ~1h ago (~19:05 UTC+8)
- **Tags:** `supply-chain` `claude-code` `cursor` `ssh-backdoor` `incident`

Phorion published a security advisory on 2026-10-30 (Calum Hall) describing a compromise of the **official Claude Code for VS Code** extension on the **Cursor Marketplace**: the backdoored bundle contains a persistent SSH backdoor with setup paths for macOS, Linux and Windows, and carries version **2.1.313**. The injection is an IIFE prepended to the minified `extension.js` that pulls in `child_process`, `fs`, `os`, `path`, `http` and `crypto` and runs "as soon as Node loads the file, before the extension's normal `activate` callback even runs. The user doesn't need to interact with the extension for the payload to fire." Cursor removed the release, and per the post also pulled the npm and VS Code builds of 2.1.313.

The chain is four stages. **Stage 1** appends an attacker-controlled Ed25519 public key commented `svc-telemetry` to `~/.ssh/authorized_keys` (0700 on the directory, 0600 on the file), checks for the *comment string* rather than the key, then tries to start sshd — `systemctl`/`service`/init.d on Linux, `sudo -n systemsetup -setremotelogin on` on macOS, PowerShell OpenSSH Server install on Windows. **Stage 2** writes a second embedded private key (`svc-telemetry-tun`) to `$TMPDIR/.stk_<10 hex>` and opens a reverse tunnel to `134.209.82[.]225` as user `tunnel` with `-R *:0:localhost:22`, wrapped in a detached 60-second retry loop that survives the IDE closing. **Stage 3** persists: `~/Library/LaunchAgents/com.apple.sysmond.plist` (`RunAtLoad` + `KeepAlive`), an `@reboot` crontab entry, or a `SysMon` scheduled task. **Stage 4** beacons hostname, user, platform, architecture, cwd, `git config --global user.email`, public IP and up to **40 environment variable names** matching `/KEY|TOKEN|SECRET|PASS|AWS|GCP/i` — *names, not values* — to `/beacon` on `134.209.82[.]225:8099`, with a copy to `127.0.0.1:8099` that the script never listens on.

**Two independent registry checks back the version.** npm's `@anthropic-ai/claude-code` packument lists 553 versions with `dist-tags` at `latest: 2.1.314`; **2.1.312 published 2026-10-27T18:36:10Z and 2.1.314 at 2026-10-30T00:12:56Z, with no 2.1.313 entry between them**. The upstream `CHANGELOG.md` jumps straight from `## 2.1.314` to `## 2.1.312` and contains **zero** occurrences of the string `2.1.313`. Neither Anthropic nor Cursor has published a public statement I could find, and the advisory carries no CVE.

**Why it matters:** Three implementation bugs bound the blast radius, and none of them is a defence. On macOS the script runs `systemsetup -getremotelogin` *without* elevation; a standard user gets `You need administrator access to run this tool... exiting!` on stdout with exit status 0, `/Off/i` never matches, and the enablement step is skipped — the malware "effectively treats 'I don't have permission to check if SSH is off' as 'SSH is already on'." That breaks inbound access only on a Mac that did not already have Remote Login on; the key and the LaunchAgent still land. The Windows path passes its PowerShell through a helper that hardcodes `/bin/sh`. The Linux crontab check "can wipe existing user cron jobs on repeat runs." Uninstalling the extension does not remove any of it — the remediation list is kill the tunnel, unload the LaunchAgent, delete `~/.config/.smt` and `.smtk`, remove the key, rotate anything matching that env-var filter. And the structural point outlives the incident: an IDE extension runs with the IDE's permissions, so an extension host writing `~/.ssh/authorized_keys` is the signal, "because the IDE binary itself is validly signed" and process rules watching for `echo`/`tee` will miss an `fs.appendFileSync`.

[`🔗 Phorion — Official Claude Code Extension Compromise`](https://phorion.io/blog/offical-claude-code-vsx-compromise/) · [`🔗 GossiTheDog (Mastodon)`](https://cyberplace.social/@GossiTheDog/117528831681803563) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=50302334)

---

## 31. Herdr ships a native app — the window is a file tree, and closing it doesn't stop your agents

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 241+ pts · ~11h ago (~08:42 UTC+8)
- **Tags:** `agent-infra` `terminal` `multiplexer` `rust`

`herdrdev/herdr-app` (Apache-2.0, Rust) is a desktop app for terminals and coding agents, created 2026-10-16, at **582 stars**, 44 forks and 83 open items, with **v0.1.9 released 2026-10-30** — the CHANGELOG also shows 0.1.8 the same day and 0.1.7 on 10-29. It is a client for **herdr-core**, described in the README as "a small server on your machine": "The window arranges terminals. The core runs them. Closing the window leaves them running."

Two design choices separate it from the tmux-shaped alternatives. First, **agents supervise agents as a first-class verb** — `hc run --bg codex "review my diff. Done: hc send t1"` starts a helper and names how it reports back; `hc send t3 "take another look"` redirects one mid-flight; "Reports, exits and 'needs you' land in your agent's input." The sidebar buckets every agent as Working / Blocked / Done / Idle. Second, **the UI is a directory**: everything lives in `~/.config/herdr-app` as `settings.json`, `keys.json`, `layouts/`, `themes/` and `mods/` — small JavaScript programs that draw panels and menus — with an `AGENTS.md` that "tells your agent what it can change." There is no plugin API and no fork to maintain. SSH machines join the same sidebar, and remote agents keep running "as long as the remote machine and core stay up."

**Why it matters:** The honest line is in the README, not the landing page: "After a reboot or core crash, kept panes get fresh shells in their last folders, not their old programs" — so "close it, they keep working" is true against a window close and not against a host restart, which is the distinction a tmux user will ask about first. Two more caveats ship in the open: "Both installers download and run code" (curl-pipe-sh and `irm … | iex`), and macOS prebuilds are Apple Silicon only, with Intel Macs told to build from source. The HN thread is mostly long-time multiplexer users, and its sharpest questions are about the daemon and the funding, not the feature list — the right questions for a tool that now sits between you and every credential your agents hold.

[`🔗 herdrdev/herdr-app`](https://github.com/herdrdev/herdr-app) · [`🔗 herdr.dev`](https://herdr.dev) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=50298436)

---

## 32. Clover-35B-A3B-Preview puts a diffusion LM at 35B — and its speed number is measured on "internal agent workloads"

- **Velocity:** ▮▮ rising
- **Source:** Hugging Face Blog · published 2026-10-30
- **Tags:** `diffusion-lm` `moe` `open-weights` `agentic-coding`

DiffuSpace — the team behind Dream 7B, published from HKU's NLP group in April 2025, which the post says has passed **2.7 million downloads** on the Hub — released **Clover-35B-A3B-Preview** on 2026-10-30: a Mixture-of-Experts **diffusion** language model, 35B total / 3B active, with a thinking mode, under an Apache license, with weights on Hugging Face, GitHub and ModelScope and inference support in SGLang and llama.cpp.

The benchmark table is the most competitive a diffusion LM has posted at this scale: **SWE-bench Verified 73.6**, **Terminal-Bench 2.1 51.7**, **τ³ Overall 65.3**, GPQA Diamond 83.8, ZebraLogic 95.8, AA-LCR 72.0 — claiming the top score on all six agent benchmarks in its own comparison, against LLaDA2.2 flash, Mercury 2.5, Qwen3.6-35B-A3B and Qwen3.5-35B-A3B.

The efficiency claims are where the denominators matter. **680 tokens/s** is measured "on **internal agent workloads**, tested on a single NVIDIA GB300 GPU with BF16 precision and a batch size of 1" — not a public suite, and batch 1 is the regime where diffusion's parallel decoding is strongest. The H200 comparison, **515 tokens/s against 365** for "the DFlash2 setup," is against one specific acceleration stack for a similarly sized Qwen, not against that model as shipped. The on-device number is the cleanest: INT4 on an **RTX 5070 Ti with 16 GB of VRAM**, **101.8 tokens/s** on MATH-500 against 48.5 for "similarly sized MiniCPM and Qwen models."

**Why it matters:** The architectural change is what makes the speed claim possible, and it is described precisely enough to check: a **bidirectional Gated DeltaNet** where "previously generated context is efficiently compressed into GDN's recurrent state, while tokens within the current block interact through fine-grained bidirectional softmax attention," the memory **readout treated as a separate information unit inside the same softmax**, learnable block-size calibration, and a zero-initialized convolution branch for right-side context. The caveat is in the name — this is a **Preview** — and no independent evaluation exists yet for any of the six agent scores. The reusable reading is that "faster" here is a property of a decoding *regime* (batch 1, diffusion, GB300) and a specific baseline's accelerator stack; a serving team should treat 680 as an upper bound for one workload shape.

[`🔗 Hugging Face — Clover-35B-A3B-Preview`](https://huggingface.co/blog/Diffuspace/clover-35b-a3b-preview) · [`🔗 Diffuspace/Clover-35B-A3B-Preview`](https://huggingface.co/Diffuspace/Clover-35B-A3B-Preview) · [`🔗 DiffuSpace/Clover-35B-A3B-Preview`](https://github.com/DiffuSpace/Clover-35B-A3B-Preview)

---

## 33. Elixir's standard library shipped three CVEs in one morning — and its own docs name the wrong default

- **Velocity:** ▮▮ rising
- **Source:** NVD / EEF CNA · published 2026-10-30
- **Tags:** `elixir` `stdlib` `denial-of-service` `cve`

Three records from the Erlang Ecosystem Foundation CNA (`6b3ad84c-e1a6-4bf7-a703-f496b71e49db`) landed on 2026-10-30, all scored by the CNA and all still `Received` at NVD with **0 NVD-scored metrics**. The one that matters operationally is **CVE-2026-115274** (6.9 CVSS 4.0, CWE-1284): `JSON.decode/1` and `decode!/1` pass every integer literal to `erlang:binary_to_integer/1` with no length bound, so "a literal of one million digits decodes successfully but costs 100 to 300 times as much CPU as a string of the same length, so one request body of a few megabytes holds a scheduler for about a second," and a literal above roughly 1.29 million digits raises `SystemLimitError`. The exposure sentence is the one to read twice: "Applications generated by `phx.new` decode request bodies with `JSON` in `Plug.Parsers`, before routing and authentication."

**CVE-2026-109821** (6.3 CVSS 4.0, `AT:P`) is the same unbounded-quantity shape in `URI.parse/1`: `split_authority/1` converts the port with `String.to_integer/1` without bounding length, a port of up to 1,262,592 decimal digits becomes a bignum, and rendering the URI back through `:erlang.integer_to_binary/1` is quadratic on Erlang/OTP 27, 28 and 29.0 — "a 400,000-digit port renders in about 2.6 seconds and a 1 MB port in about 18 seconds." Ports above 65535 are also accepted. **CVE-2026-97209** (5.4, `AV:L`) is different in kind: `Mix.Tasks.Deps.Partition.server/4` passes the partition config through a fixed-name directory in the shared system temp dir and trusts what it reads back, while `File.mkdir_p/1` "accepts an existing directory without checking its owner" — so another local user who created the directory first can swap the file and execute code as the compiling user. Only `1.20.0-rc.4` before `1.20.5` is affected.

**Why it matters:** The EEF's own technical analysis contains the detail worth generalising from: "The `JSON.decode/3` documentation names `&String.to_integer/1` as the default, **which converts the same way**" — the code calls `erlang:binary_to_integer/1`. The doc is not wrong about the behaviour, and it is wrong about the function, which is the shape of bug that survives review. Fixes are **1.18.6, 1.19.7 and 1.20.5** across three branch lines. The 6.9 undersells CVE-2026-115274: it lands in the request decoder before any route, plug or auth check can see it, so per-route rate limiting is not the mitigation — the mitigation is the upgrade.

[`🔗 EEF CNA — CVE-2026-115274 (JSON)`](https://cna.erlef.org/cves/CVE-2026-115274.html) · [`🔗 EEF CNA — CVE-2026-109821 (URI)`](https://cna.erlef.org/cves/CVE-2026-109821.html) · [`🔗 CVE-2026-115274 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-115274)

---

## 34. Azure's API Connections gave five full cross-tenant compromises — and one fix reopened the previous bug

- **Velocity:** ▮ steady
- **Source:** Hacker News · 10+ pts · ~2h ago (~18:06 UTC+8)
- **Tags:** `azure` `cloud-security` `cross-tenant` `logic-apps`

Binary Security's Haakon Wik Gulbrandsrud published this on **2026-10-02**; it reached Hacker News on 2026-10-30. The claim is large and the mechanism is small: Azure **API Connections** (the shared component behind Logic Apps) let one tenant operate on another tenant's connection, and through it on the backend that connection is authenticated to — Key Vault, Azure SQL, Jira, Salesforce, "effectively unbounded." The chain works because ARM's `DynamicInvoke` and `/extensions/proxy/` endpoints reach the shared APIM instance with rights to *every* connection, so a path traversal in the supplied path (`path/%2e%2e/%2e%2e/%2e%2e/%2e%2e/apim/keyvault/<id>/secrets/<name>/value`) reads a victim tenant's secret. The report says the first fix "seemed to restrict the paths allowed, rather than the underlying token issue"; the author then pulled a Standard Logic App's own code over SSH, found **four undocumented endpoints** (`DynamicInvoke`, `DynamicList`, and two more), and used `DynamicList` to run an arbitrary SQL `INSERT` against a victim's Azure SQL database.

Two more findings follow. Consumption Logic Apps have no managed identity of their own and therefore "implicit access to **every** Version 1 API Connection," held back only by input validation — and the `host.api.RuntimeUrl` parameter lets a workflow name a `runtimeUrl` that differs from the connection's own, as long as the host ends in `azure-apihub.net`. Microsoft's fix validated that URL **before the path was normalized**, so appending a traversal segment passed validation and hit the APIM instance as a different connection.

**Why it matters:** The regression is the reusable lesson: "When Microsoft managed to scrape together a fix for this path traversal, a surprising thing happened. The original `RuntimeUrl` path was no longer validated" — the second fix undid the first, which is the failure mode you get when a patch is matched to a payload rather than to a primitive. The caveat the author states himself is the mitigation most organisations skipped: "it is, of course, possible for the people who set up these connections to scope their access tokens or keys so that the API Connection has minimal privileges in the backend. I would guess, however, that this is rarely done." Everything here is reported fixed; the post is a month old, and it is new to this feed rather than new to the internet.

[`🔗 Binary Security — Azure's Weakest Link`](https://www.binarysecurity.no/posts/2026/10/one-root-case) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=50301854)

---

## 35. Cloud Foundry's `/internal/v3/` staging callbacks took the deny rule that v4 and v5 got — and an auditor can enumerate the GUIDs

- **Velocity:** ▮ steady
- **Source:** NVD / Cloud Foundry Foundation · CVE-2026-59387 · record published 2026-10-30
- **Tags:** `cloud-foundry` `access-control` `cve` `privilege-escalation`

**CVE-2026-59387** scores **8.8 (CVSS 3.1)** — `AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H` — assigned by `security@vmware.com`, status `Received` at NVD with **no NVD score of its own**. The defect is a deny-list that was extended twice and missed a third time: "The Nginx routing configuration for Cloud Controller blocks unauthenticated access to `/internal/v4/` and `/internal/v5/` endpoints but omits an equivalent deny rule for `/internal/v3/`." The result is that `/internal/v3/staging/:guid/droplet_completed` and `/internal/v3/staging/:guid/build_completed` are "reachable from the public API listener without OAuth or mutual TLS."

What that buys: "An attacker with a valid build or droplet GUID can submit a forged staging callback, transition a droplet to STAGED, and persist arbitrary process metadata and sidecar data with no associated package or actor" — and the GUID is not the hard part, because "**a SpaceAuditor can enumerate GUIDs without write permissions**, making this an effective privilege escalation beyond the intended role boundary." A read-only role becomes a write.

**Why it matters:** Two dates are worth keeping apart. The Cloud Foundry advisory is dated **2026-10-20**; the CVE record published **2026-10-30** — ten days later, which is why this appears in a batch about today. Affected is stated as "CAPI up to **v1.245.0** (inclusive)," with fixes in **CAPI v1.246.0 or greater** and **cf-deployment v60.7.0 or greater** (which carries CAPI v1.247.0). Reported by Minseong Kim (mak3bread). The generalisable bug is the one every internal-endpoint story in this feed has: a control expressed as a *list of blocked paths* fails the moment a sibling version prefix exists, and version prefixes are exactly what internal APIs accumulate.

[`🔗 Cloud Foundry — CVE-2026-59387 advisory`](https://www.cloudfoundry.org/blog/cve-2026-59387-broken-access-control-restriction-in-cloud-controller-api/) · [`🔗 CVE-2026-59387 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-59387)

---

## 36. ClickHouse's 9.5 is unauthenticated RCE — and the vendor's public explanation is one 28-word sentence

- **Velocity:** ▮▮ rising
- **Source:** NVD / ClickHouse CNA · CVE-2026-116366 · published 2026-10-30 11:00 UTC
- **Tags:** `clickhouse` `cve` `rce` `disclosure`

**CVE-2026-116366** is a **9.5 (CVSS 4.0)** — `AV:N/AC:H/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H/SC:H/SI:H/SA:H` — assigned by `ClickHouse` itself, reserved **2026-10-26T07:54:23Z** and published **2026-10-30T11:00:11Z**. Four days. NVD's record sits at `Received` carrying exactly one metric — the CNA's 9.5, in the `Secondary` slot, with zero `nvd@nist.gov` metrics — so the number is ClickHouse's, not NVD's; the CNA container states no CWE. `AC:H` is the only thing standing between this vector and a 10.0.

The machine-readable record is precise where it matters. Four branch ranges, all exclusive `lessThan` bounds anchored to `packages.clickhouse.com` and `github.com/ClickHouse/clickhouse`: `26.3 → 26.3.62.3-lts`, `26.8 → 26.8.36.3-lts`, `26.9 → 26.9.27.3-stable`, `26.10 → 26.10.3.7-stable`. The vendor changelog adds the date and the deployment note: "**Fixed in ClickHouse v26.10.3.7, 2026-10-30**," and "A fix for this vulnerability has been applied to all ClickHouse Cloud and BYOC deployments." Credit goes to **Elshad Toklayev**.

**Why it matters:** Everything except the vulnerability itself is here. The full public description is one sentence — "An issue has been discovered in ClickHouse Server that, under certain conditions, could allow an unauthenticated user with network access to execute arbitrary code on the ClickHouse Server" — which is 28 words, and it contains no *which conditions*. So the two questions an operator asks resolve in opposite directions: "am I exposed" cannot be answered from the disclosure, but "am I patched" can, from four exact version bounds, same-day. That is a better-than-average disclosure process (reservation, publication and fix all inside a week, ranges in the CNA container rather than only in prose) shipped with a worse-than-average description — and the practical consequence is that anyone running ClickHouse with a network listener should upgrade on the score and the range, not on their own threat model.

[`🔗 ClickHouse security changelog`](https://clickhouse.com/docs/resources/changelogs/security-changelog) · [`🔗 CVE-2026-116366 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-116366)

---

## 37. Prefix Executability: an agent can finish the task without ever having had an executable plan

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.40444 · 2026-10-29
- **Tags:** `agents` `evaluation` `tool-use` `benchmarks`

Four authors (Amir H. Rezaeian, Weiyi Sun, Yassine Benajiba, Dan Roth) argue that final task success hides the thing you actually want to know: whether the intermediate tool-call trajectory could have run. Their protocol checks "whether every prefix of a predicted tool-call sequence remains executable under tool schemas, state preconditions, and data dependencies," and summarises it with five statistics — Prefix Executability Curves, **First-Error Depth**, Trajectory Executability Rate, horizon-normalized AUC-PEC and Recovery Rate.

It is instantiated on stratified samples from **BFCL-v3 multi-turn** and **ToolSandbox**, plus the complete Airline/Retail base splits of **τ³-bench**. The central result is a ranking inversion: "outcome-only and prefix-level rankings diverge: agents whose execution is conditioned on an unverified plan often achieve higher point-estimate final success than non-plan-conditioned baselines **while substantially lowering TER and AUC-PEC**." As a validation intervention, "explicit pre-execution plan checking can improve executable-prefix survival while maintaining competitive terminal success."

**Why it matters:** Read the abstract as a methods paper, because that is what it is — it reports the divergence qualitatively and publishes no scores, no per-benchmark table and no effect sizes in the abstract, so nobody should quote a number from it. The claim it does make is the one this feed keeps arriving at from other directions: an agent that plans first scores higher *and* executes worse more often, which means the two metrics are not measuring one thing at two resolutions — they are measuring different things that trade off. If that holds, an eval that grades only the final state is systematically selecting for the agents whose trajectories a production system would reject, and First-Error Depth is the number that tells you where.

[`🔗 arXiv 2610.40444`](https://arxiv.org/abs/2610.40444) · [`🔗 Full text (HTML)`](https://arxiv.org/html/2610.40444v1)

---

## 38. Speculative decoding saves energy only while the draft is accepted — past a batch size it becomes a loss

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.40287 · 2026-10-29
- **Tags:** `inference` `energy` `speculative-decoding` `serving`

Five authors (Bole Ma, Ayesha Afzal, Jan Eitzinger, Harald Koestler, Gerhard Wellein) account for speculative decoding in the unit that now binds: "Large language model serving is limited by facility power. Energy per token determines how many tokens a datacenter can serve, while a latency target bounds how quickly each user receives them." Measured under production conditions — **SGLang with CUDA graphs enabled, on H100 and H200, batch sizes up to 64 across 5 corpora** — the result is a set of conditions rather than a speedup.

Four findings, each of which cuts against the usual framing. "On dense models, **verification, not drafting, dominates the energy cost**." "The saving shrinks as the batch grows, because batching has already shared the weight read that speculation would divide among the accepted tokens." "At large batch sizes, block drafters push verification past the balance point between arithmetic and memory traffic into the compute-bound regime, **where the saving becomes a loss**, and a drafter with low acceptance raises energy per token." And "meeting a tighter latency target with speculation then costs additional energy" — so the latency win and the energy win point in opposite directions at the same operating point.

Acceptance is not a property of the drafter alone, which is the part that transfers: "Every drafter we evaluate accepts fewer tokens on conversation than on code, and every trained drafter accepts fewer on Romansh, a low-resource language, than on English."

**Why it matters:** The abstract publishes no ratios — no joules per accepted token, no crossover batch size — so this is a paper to read before quoting, not to quote from its abstract. What it establishes is that the correct unit for a speculation claim is **energy per accepted token at a stated batch size and latency target**, and that the same configuration can save or lose depending on which corpus it is serving. The closing observation is the useful one for anyone tuning: "Larger batches lower energy per token without speculation. Speculation adds to that saving only when acceptance is high, and on the model we tested it leaves little headroom for latency-preserving DVFS."

[`🔗 arXiv 2610.40287`](https://arxiv.org/abs/2610.40287) · [`🔗 Full text (HTML)`](https://arxiv.org/html/2610.40287v1)

---

## 39. A probe catches 82% of leaking agent calls before they are written — and a bag-of-words classifier nearly matches it

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.40588 · 2026-10-29
- **Tags:** `agent-safety` `interpretability` `monitoring` `multi-agent`

A single-author paper (Leonidas Raghav) asks a narrow, checkable question about agent collusion: "Output filters check only what an agent has already written. Can an overseer tell beforehand that an agent is about to give in?" The setting is six scenarios in which a peer presses a target for up to 20 rounds to reveal a secret — a deploy token, say — and "the target often refuses, then gives in." A linear probe is read on the agent's activations at each model call, before the output is written.

The numbers are strong: on held-out **Qwen3-32B** episodes, at a threshold set to flag **5% of benign calls**, the probe "catches **82%** of leaking calls," where "at a similar flag rate, a zero-shot decision-model monitor catches **26%**." On **gpt-oss-20b**, a probe on the model's reasoning reaches **AUROC 0.91**.

Then the paper dismantles its own headline, which is why it is here. "A bag-of-words classifier trained on the same calls comes close, so **most of the gain comes from training on labels, not activations**." "The probe also flags permitted disclosures: it reads the coming disclosure more than the violation." And: "The warning is short-range, and halting on any alarm would stop most benign episodes, which a second text check does not fix."

**Why it matters:** The 82-versus-26 comparison is a claim about *supervision style* — trained probe against zero-shot monitor — and the bag-of-words result says the lift is mostly the labels, which reframes the contribution from "mechanistic interpretability works" to "cheap supervised monitors work, and activations are a convenient feature." That is still useful: a pre-generation warning is a different control point from an output filter, and "a warning raised before generation could let an overseer stop an agent that is about to give in, ahead of others acting on its messages or recruitment spreading through a swarm" is the argument for putting the detector there at all. Just don't read 82% as evidence that you need the model's internals.

[`🔗 arXiv 2610.40588`](https://arxiv.org/abs/2610.40588) · [`🔗 Full text (HTML)`](https://arxiv.org/html/2610.40588v1)

---

## 40. A 325M model pretrained from zero on an inference-only NPU matches its B200 twin to 0.0001 loss — and the method is patented

- **Velocity:** ▮▮ rising
- **Source:** Hugging Face Blog · published 2026-10-26
- **Tags:** `pretraining` `npu` `hardware` `reproducibility`

VIDRAFT's FINAL-Bench pretrained **VKORE-325M-NPU-Base**, a 325.6M-parameter decoder-only model, **from random initialization on a commercial inference-only NPU**, with "backpropagation run on the chip" and "no pretrained weights." The run covered **5.0 billion byte tokens** of FineWeb-Edu in **76,292 steps over about four days**. In parallel they trained "the same model on a B200 GPU with the same initialization, data, batch and learning-rate schedule."

On **1,024 windows of FineWeb-Edu text that neither model ever saw**: NPU loss **0.7993**, GPU loss **0.7994**, paired difference **−0.0001 with a standard error of 0.0007**, and "the NPU model is lower on **50.1%** of windows." Both weight sets and the evaluation script are public, so the claim is checkable in minutes.

**Why it matters:** The framing question the post sets itself is the real one — "The accepted view is that such chips cannot train… Training needs a backward pass, an optimizer state, and numerically stable updates over tens of thousands of steps, none of which an inference stack is built to provide" — and the result is a controlled comparison, which is rare in hardware announcements. But the post's own "What we do not claim" section is what makes it citable: "**Not a capable assistant.** This is a 325M base model trained on 5B tokens, released as a training-hardware result. **Not a speed record.** … **Not the method.** The training loop and the stability technique are in house and **under patent application**. The weights, data recipe, hyperparameters and evaluation are fully open." So the outcome is reproducible and the method is not — anyone can check the loss and nobody can replicate the run without the withheld piece. Read the 0.0001 as "an inference-only NPU can carry a pretraining run to GPU parity at this scale," not as "this is how you do it."

[`🔗 Hugging Face — Pretraining a 325M model from zero on an inference-only NPU`](https://huggingface.co/blog/FINAL-Bench/pretraining-a-325m-language-model-from-zero-on-an) · [`🔗 FINAL-Bench/VKORE-325M-NPU-Base`](https://huggingface.co/FINAL-Bench/VKORE-325M-NPU-Base)

---

## 41. Ai2: change a few words in a novelty-judge prompt and GPT-5.4 drops from 93.5% to 40.9% — below chance

- **Velocity:** ▮▮ rising
- **Source:** Hugging Face Blog / arXiv 2610.02022 · published 2026-10-27
- **Tags:** `evaluation` `research` `benchmarks` `llm-judges`

Ai2's **"Old Ideas, Novel Problems"** (Kyle Wiggers and Ai2Comms, paper, data and code released) tests the component that AI-for-science systems depend on and rarely validate: the **novelty judge** — an LLM asked whether a research idea is new. The labels are built from **ICLR 2026 peer reviews** rather than acceptance: a **high-novelty pool** of **154** human ideas from accepted papers in the top-rated 10% of their area where reviewers positively identified novelty and none disputed it, and a **lower-novelty pool** of **145** from rejected papers in the bottom 10% where reviewers raised originality concerns and none endorsed it. A review-mining check had an annotator agree with the extracted polarity in **47 of 50** cases.

Six judges were compared — GPT-5.1, GPT-5.2, GPT-5.4, Claude Sonnet 4.5, Claude Opus 4.5, Claude Opus 4.6 — across prompt, reasoning budget, retrieval, formatting and aggregation. The headline instability: on the Human+Generated pairs, GPT-5.4 told that "reviewers had found exactly one idea in each pair to be novel" scored **93.5%**; asked the simpler "which idea is novel," it scored **40.9%**, below chance, and "changed its verdict on more than half of the same pairs." Human-authored pairs were not immune — the same change moved Claude Opus 4.6 by **21 points** — and "there was also no universally better prompt."

**Why it matters:** The sentence to carry out of this is the one about the systems already shipping: "**Retrieval and additional reasoning do not consistently improve judgments, and two purpose-built novelty evaluation systems perform worse than a simple prompted Claude Opus 4.6 baseline.**" But read the label quality before quoting the percentage: on Human+Generated, "we assumed the generated ideas were less novel than their human-authored counterparts; these are **weak labels**, not verified judgments for every idea." The paper anticipates that objection — an expert reviewed 30 pairs weighted toward the strongest judge's failures, preferred the human idea in all 30 and judged none of the generated ones novel — and it also notes that "many of our core findings don't depend on the labels at all," because "if two reasonable evaluation setups give opposite answers for the same pair of ideas, that disagreement itself reveals instability." An evaluator that swings 50 points on wording is not measuring novelty.

[`🔗 Hugging Face — Can we trust LLMs to judge whether a research idea is novel?`](https://huggingface.co/blog/allenai/novelty-bench) · [`🔗 arXiv 2610.02022`](https://arxiv.org/abs/2610.02022) · [`🔗 allenai/novelty-eval`](https://github.com/allenai/novelty-eval)

---

## 42. DOOMFORMER runs a neural network inside a DOOM map — 10,000 of 10,000 MNIST digits exact, tolerance 0

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 99+ pts · ~13h ago (~07:25 UTC+8)
- **Tags:** `doom` `verification` `neural-networks` `demoscene`

`mottopanikeiku/doomformer` (MIT, Python 3.11+, **36 stars**, created 2026-10-20, v0.4.0) compiles an integer neural network into a DOOM map and lets the game engine run it: "Voodoo dolls do the arithmetic, light levels and plane heights hold the values." A number is a crowd of dolls, a weight is a line on the floor, a sum is a light level or a height, an activation is a staircase, attention is a ceiling. The MNIST map uses **1,355 voodoo dolls**; the maps need ZDoom (UDMF and ACS) and the repo runs ViZDoom 1.3.2 with Freedoom assets.

The published scores: **10,000 / 10,000** MNIST test digits exact, **0** mismatches across 20,000 fuzzed nets, and **4** other DOOM engines run the "museum" map exactly. `doomformer mnist` reads four test digits or your own image in 1.5–3 minutes; `doomformer ask "what does iddqd do"` answers from 189 DOOM facts; `doomformer machine subleq all` runs a tiny computer on maps.

**Why it matters:** The project attacks its own check, in a table, and that is the reason to trust the headline. Tamper with one weight line → "the check fails on exactly the inputs that cross it." Fuzz 20,000 random nets at the range limits → 0 mismatches, with CI fuzzing a fresh seed on every push. Mutate one line of a map **1,004 times** → **297 caught**, and "no survivor is proven harmless." Extract the weights back out of the map without DOOM → equal to the source net. Guard every readout page with a poison value → "a page that never runs cannot pass old values." Then the limit, stated plainly: "Every run compares each value the map exposes with NumPy. **That proves the inputs that ran, nothing more.**" The MNIST map exposes 248 values; it does not expose its 903 staircase counts or 1,351 gate comparisons, which are checked only through the sums they feed — and "fuzzing and tests found four bugs in the compiler. All are fixed." A demoscene stunt with a verification section better than most production test suites.

[`🔗 mottopanikeiku/doomformer`](https://github.com/mottopanikeiku/doomformer) · [`🔗 Project site`](https://mottopanikeiku.github.io/doomformer/) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=50297697)

---

## 43. Lasm compiles Lean 4 to WebAssembly — 117 proved theorems in a RealWorld app, and no kernel at run time

- **Velocity:** ▮ steady
- **Source:** Hacker News · 31+ pts · ~10h ago (~10:05 UTC+8)
- **Tags:** `lean4` `webassembly` `formal-verification` `dev-tools`

`Millillion/lasm` (MIT, **66 stars**, created 2026-09-23) ahead-of-time compiles ordinary Lean 4 to WebAssembly: "One Lean code base can become a Node server, a serverless or edge function, a WASI/Fastly module or a browser app. Because it is Lean, you can prove properties of the code you deploy." `@lasm/cli` is at **0.3.5**, published to npm **2026-10-28T19:07:10Z**, and pins Lean to exactly **4.35.0** (`leanprover/lean4:v4.35.0`), installing the toolchain itself so no elan is needed. The target table is unusually wide for a 0.x project and each row is claimed CI-tested against the platform's own runtime, image or emulator: Node, AWS Lambda (zip and container), Lambda@Edge, Vercel, Netlify, Azure Functions, Google Cloud Functions gen2, Cloudflare Workers, Vercel Edge, Netlify Edge, Deno Deploy, Supabase Edge, Bun, Deno, Fastly Compute, WASI, wasi-http and browsers.

**Why it matters:** The limits column is the interesting one, and the README puts it in the quick-facts table rather than a footnote: "**Not available at run time:** elaboration, `#eval`-style evaluation, loading `.olean`, Lean's kernel — all of these work at build time." So the deployed artifact carries no proof checker: the theorems are a property of the build you shipped, not of the process running. And the edge/Bun/Deno/WASI/browser targets "run Lean single-threaded, without sockets or processes (and without files, except on WASI)," which is a much smaller runtime than the Node row's "full runtime (threads, files, processes, sockets)." The flagship claim — the Conduit RealWorld app with "**117 proved theorems**" — is the project's own count, in its own README, and not independently reproduced; the honest way to read it is as evidence that a full-stack app can be written this way at all. One detail worth copying: "By project policy CI never deploys to a real cloud account."

[`🔗 Millillion/lasm`](https://github.com/Millillion/lasm) · [`🔗 @lasm/cli on npm`](https://www.npmjs.com/package/@lasm/cli) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=50299004)

---

## 44. Looping a transformer is not uniformly better — the gains saturate, reverse, or become unstable

- **Velocity:** ▮ steady
- **Source:** arXiv 2610.40325 · 2026-10-29
- **Tags:** `transformers` `looped-models` `training` `inference`

Eight authors (Chanakya Ekbote, Artidoro Pagnoni, Devendra Singh Sachan, Shruti Bhosale, Mike Lewis, Maryam Fazel-Zarandi, Shashank Rajput, Sujan Kumar Gonugondla) study looping jointly across the three constraints that trade off against each other, in dense decoder-only transformers trained from scratch: up to **1B parameters**, up to **155B tokens**, up to **1.07×10²¹ FLOPs**, and up to **32 loops**. Their framing is the right one — "Whether looping is useful depends on which constraint dominates: model size, training compute, or autoregressive inference efficiency."

The findings are conditions rather than a recipe. "Looping the full transformer generally gives the strongest quality at a fixed parameter budget, whereas looping a middle block of layers gives a better return when training FLOPs are constrained." "Adding loops is not uniformly beneficial: gains eventually **saturate, reverse, or become unstable**." Small loop-specific low-rank adapters help, "with larger gains as more loops are added." Looped models decode more slowly in proportion to loop count, and the obvious fix does not work cleanly: Parallel Loop Transformers run stages concurrently by passing hidden states between loops across adjacent token positions, but "the original formulation does not consistently retain the quality gains of ordinary looping" — recovering it required preserving the current-token embedding and normalizing it separately from the previous-token hidden state before combining.

**Why it matters:** The abstract reports no benchmark scores and no deltas, so the honest reading is that this is a design-space paper, not a result to quote. Its value is the negative result: "more loops" is a resource-constrained engineering decision with a failure mode on either side, and the paper's own fix for the parallel variant had to change how two hidden states are normalized rather than simply run them at once. Anyone reaching for looped weights — the same week two other papers in this feed are measuring what a smaller model can do at more test-time compute — should read "gains eventually saturate, reverse, or become unstable" as the summary of the whole genre rather than of this one ablation.

[`🔗 arXiv 2610.40325`](https://arxiv.org/abs/2610.40325) · [`🔗 Full text (HTML)`](https://arxiv.org/html/2610.40325v1)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-10-30T12:16:26Z |
| Items | 44 |
| Sources tracked | 32 (Hacker News, GitHub, NVD, CISA KEV, cveawg, PyPI, npm, vendor advisories, CNA advisories, arXiv, Hugging Face, security research blogs, security press, vendor blogs) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[Previous day](2026-10-29.md) · [Raw .md](https://trending.md/en/feed/2026-10-30.md) · [Archive](../archive/)
