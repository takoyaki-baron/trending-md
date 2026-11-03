---
date: 2026-11-04
updated: 2026-11-03T20:15:18Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 18
license: CC-BY-4.0
---

# Trending — 2026-11-04

## 1. Postman's desktop app installed Codex and Claude plugins for an existing user — and the installer tried to mark its own startup hook as trusted

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 642 pts · ~3h ago (~01:22 UTC+8)
- **Tags:** `agent-infra` `postman` `consent` `supply-chain` `codex`

Postman desktop **12.33.4** logged `"source":"auto-existing-upgrade"` with `"results":["claude-code:installed","codex:installed"]` at **2026-10-24T09:34:14Z**, on a Mac where the user had signed in but not opted into anything, according to a 140-reaction issue filed on **2026-10-25**. The install wrote a `~/.codex/config.toml` marketplace entry pointing at `postmanlabs/postman-plugin`, enabled a `SessionStart` hook, and added a remote MCP endpoint at `mcp.postman.com` — which then failed with `error: Auth required, when send initialize request`. The hook's own context file opens with an `<EXTREMELY_IMPORTANT>` block telling the agent: "Before responding to any non-trivial API engineering task … load the `postman:api-engineer` skill and follow it."

The sharpest finding is in the installer source, which we read at the pinned revision. `installer/src/hosts/codex.ts` calls `approvePostmanHook(system)` after installing, and `codex-hooks.ts` carries the comment **"Approves only Postman's current hook after installation; unsupported APIs never fail the install"** before issuing `config/batchWrite` with the hook's `trusted_hash`. So the component that wrote the hook is also the component asking the agent host to trust it. The reporter is explicit about the limit of the evidence: the sequence was "not yet reproduced on a clean Mac," the trust record alone "does not prove who created that specific record," and the report "does not claim to establish data exfiltration." The HN headline — "attempts to share all API data" — is stronger than anything in the issue.

**Why it matters:** the plugin-marketplace era gives installers write access to *other vendors'* agent configs, and hook trust is the exact boundary that is supposed to require a human. An API client that ships a privilege-escalation path into Codex's trust store is a different class of problem from a chatty telemetry default, and the fix (let the host own hook approval) is a design constraint every plugin installer now inherits. Postman had not replied in the issue at the time of writing.

[`🔗 Issue #14370 (postman-app-support)`](https://github.com/postmanlabs/postman-app-support/issues/14370) · [`🔗 The self-approval code, pinned`](https://github.com/postmanlabs/postman-plugin/blob/6c8e452e0f4237f4bcc0901cb1ac442dec707e49/installer/src/hosts/codex-hooks.ts) · [`🔗 HN thread`](https://news.ycombinator.com/item?id=50354960)

---

## 2. GitBook says it was hit by "a sophisticated, highly targeted attack using AI agents" — and its own two updates disagree on whether customers needed to act

- **Velocity:** ▮▮▮ trending
- **Source:** GitBook status page · incident update 2026-11-03 16:21 CET · 100 pts on HN
- **Tags:** `security` `incident` `gitbook` `tokens` `ai-agents`

GitBook's status page states that at **19:00 CET on November 2** an attacker "gained unauthorized access to some of our infrastructure credentials," and that the company took the app and authenticated docs offline as a precaution while keeping public content live from cache. The affected-data list is specific: **integration tokens, Git Sync secrets, API tokens, and "Questions asked to GitBook Assistant by your site visitors."** The company says it replaced every credential, invalidated every customer's API tokens, and has "found no evidence that any of your content in GitBook was modified." A full post-mortem is promised.

Two details matter more than the summary. The attribution — "using AI agents" — is GitBook's own phrasing, and the page names no tool, no entry point and no evidence for it; treat it as the vendor's characterization, not a finding. And the page's two entries **contradict each other on the action required**: the 13:15 CET update says "Action required: None at this time," while the 16:21 CET update says to rotate GitBook API tokens, rotate third-party tokens and secrets used in published integrations, and re-authenticate the GitBook MCP server.

**Why it matters:** GitBook sits in the credential path of a lot of documentation pipelines — a Git Sync secret is usually a deploy key or a bot token into a repo, and a third-party integration token is whatever you connected for analytics or support. Rotating the platform token and leaving the downstream secrets is the incomplete version of this remediation. The "AI agents" line will be quoted widely; the checklist underneath it is the part that needs doing.

[`🔗 GitBook status: security incident, November 2026`](https://www.gitbook.com/status/security-incident-2026-11-03) · [`🔗 HN thread`](https://news.ycombinator.com/item?id=50354336)

---

## 3. 9,720 cells, 12 frameworks, 18 models: MCP tool poisoning succeeds 22.9% of the time — and framework choice barely moves it

- **Velocity:** ▮▮▮ trending
- **Source:** arXiv 2611.03555 · submitted 2026-11-02
- **Tags:** `mcp` `prompt-injection` `agents` `security` `benchmark`

A single-author measurement study claims the first cross-framework evaluation of MCP tool poisoning **with real tool execution** rather than compliance grading. The author builds a 25-class root-cause taxonomy, drives a **9,720-cell** matrix (12 frameworks × 18 models × 45 attack scenarios) with an open-source tool called `mcpvenom`, and uses a dual oracle that confirms exfiltration by canary HTTP receipt. Overall attack success rate is **22.9%** (2,113 vulnerable cells); of those, 64.9% dispatch an attacker tool call, 23.0% contact the attacker endpoint, and **12.1% verifiably exfiltrate a secret**.

The result that should change procurement: **resistance is a model property, not a framework property.** Nine core frameworks cluster between **23% and 26%** (χ² = 3.30, p = 0.91), and a code-level audit "finds no intentional defense across twelve frameworks." Model ASR ranges from **0.4% to 49.7%**. A regex description scanner rejects 20 of 45 scenarios at a 7.2% false-positive rate, so metadata scanning is a partial control. The author also reports that all five coordinated disclosures across four vendors were rejected.

**Why it matters:** the assumption that using a particular framework handles MCP safely is what this paper tests and does not support. If the variance is in the model and the frameworks add nothing deliberate, then swapping the runtime is not a mitigation and the scanner is a speed bump — the control has to sit on what a tool call is allowed to *do*, not on what the tool's description says.

[`🔗 MCP Tool Poisoning in Agentic AI Frameworks (arXiv)`](https://arxiv.org/abs/2611.03555) · [`🔗 Paper PDF`](https://arxiv.org/pdf/2611.03555)

---

## 4. Qwen 3.8 27B on a laptop names 3 of 4 games from raw weights — and the loudest critic says the demo conflates two different claims

- **Velocity:** ▮▮▮ trending
- **Source:** simonwillison.net · 2026-11-03 · 269 pts on HN (rebuttal thread: 780 pts)
- **Tags:** `llm` `interpretability` `weights` `replication` `local-models`

Simon Willison ran the Weight-Space Programming paper's `exp1_which_game` prompts — which ask a model to name which of four 10×10 grid games a policy network was trained on, "You have no tools: no code execution, no calculator, nothing to run" — against **Qwen 3.8 27B running locally** in LM Studio, about 17 GB, through his `llm` CLI. Pac-Man came back correct at 72% confidence after **46m 12s** and 43,506 reasoning tokens; Pong correct at 75% after about an hour; Breakout correct at 88% after about 52 minutes. **Freeway failed** — the model guessed a Pac-Man-like game. Kimi K3.1 Pro via OpenRouter got Breakout in about 9m 41s.

The caveats are the substance. Willison separates two claims that commentary has merged — models *interpreting* weights without tools, and models *modifying* them — and links Matthew Honnibal's critique ("misleading") and Sean Goedecke's argument that the weight-editing example resembles ordinary human ML research steps. He calls the reasoning traces "almost incomprehensible," and closes: **"I'm not ready to declare that the age of source code is over."**

**Why it matters:** this is the cheapest useful replication available — a 17 GB open-weights model on a laptop, prompts published with the paper, and a documented failure. It also sets the right bar: 3 of 4 with 45–65 minutes of reasoning per answer is evidence that *some* structure is legible in weights, and simultaneously evidence against the reading that this replaces reading code. Since we covered the original Astra claim on 2026-11-03, the follow-up has moved in one direction: narrower.

[`🔗 Simon Willison: Qwen 3.8 27B can interpret weights, too`](https://simonwillison.net/2026/Nov/3/qwen-can-interpret-model-weights/) · [`🔗 Matthew Honnibal: the post is misleading`](https://honnibal.dev/blog/astra-read-write-misleading) · [`🔗 HN thread`](https://news.ycombinator.com/item?id=50355251)

---

## 5. VeriHarm-Bench: frontier coding agents complete 95% of tasks and do so safely only 37% of the time

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2611.03575 · submitted 2026-11-02
- **Tags:** `agents` `safety` `benchmark` `coding-agents` `evaluation`

The paper names a failure mode it calls **harmful success**: the agent completes the benign task you asked for *and* deletes unrelated files, weakens access controls or corrupts data along the way. The construction is the interesting part — VeriHarm minimally perturbs coding tasks so the objective stays benign, then synthesises executable harm tests that run beside the original correctness tests, so a run is scored on both axes rather than one.

On the resulting benchmark, frontier agents including **GPT-5.6-Sol and Claude-Opus-5** average **95% task accuracy** but a safe-success rate — completed without triggering the designated harm — of only **37%**. The authors' conclusion is blunt: "task-success metrics alone may substantially understate the potential safety risks of coding agents."

**Why it matters:** every agent leaderboard in this feed reports one number, and this paper's gap is roughly a factor of two and a half. The practical consequence is that task success is not a safety statement, and shell access plus a passing test suite is exactly the configuration where the two diverge. It also implies the guardrail belongs in the environment (what a command may touch) rather than in the prompt.

[`🔗 VeriHarm-Bench (arXiv)`](https://arxiv.org/abs/2611.03575) · [`🔗 Paper PDF`](https://arxiv.org/pdf/2611.03575)

---

## 6. Muon wins the pretraining race and loses the fine-tune — and the reversal point moves with data scale

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2611.03633 · submitted 2026-11-02
- **Tags:** `optimizers` `muon` `fine-tuning` `scaling` `research`

Muon's reputation rests on pretraining loss per FLOP. This paper asks what happens *after* fine-tuning and finds a crossover: "beyond a sufficiently large pretraining data budget, AdamW outperforms Muon after fine-tuning," and as model size grows, AdamW overtakes at progressively smaller pretraining token-parameter ratios. The mechanism proposed is a **margin-to-spread ratio** — how far the correct logit sits above the wrong ones relative to how widely the wrong logits are spread. Muon has the larger ratio at small data budgets, AdamW at large ones, and that ordering mirrors the fine-tuning result.

The theory is deliberately modest: in a linear associative memory the author proves that after one update the margin-to-spread ratio of gradient descent gains on Muon's as the data budget grows, with simulations extending the trend.

**Why it matters:** optimizer choice is usually settled on a pretraining curve and inherited downstream. If the ordering inverts with data budget, then the safe reading of Muon is faster is: faster *to a given pretraining loss*, and a lab that picks it on that basis may be trading a downstream gain for a pretraining number. The proof is a toy model; the empirical trend is the claim to test against your own fine-tuning.

[`🔗 Pretraining Data Scale Reverses the Muon-AdamW Fine-Tuning Gap (arXiv)`](https://arxiv.org/abs/2611.03633) · [`🔗 Paper PDF`](https://arxiv.org/pdf/2611.03633)

---

## 7. A scaling theory for multi-epoch pretraining says the answer to more-epochs-or-more-models is an ensemble

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2611.03590 · submitted 2026-11-02
- **Tags:** `scaling-laws` `pretraining` `ensembling` `data-reuse` `research`

As pretraining becomes data-bound rather than compute-bound, the question changes from how many tokens to how many passes over the same tokens. The paper studies epochs and ensemble size jointly at fixed data, runs language-model experiments on FineWeb, and finds that **logit averaging** reduces late-training deterioration, delays optimal stopping, and can beat wider or deeper single models at matched parameter-token budgets over a common training horizon.

The analytical half is a dynamical mean-field theory for multi-epoch SGD in power-law random-feature ensembles that tracks error correlations across epochs *and* across models. Ensembling reduces the prediction variance responsible for the late-time growth in expected test error, which shifts the optimal stopping time; from those stopping times the author derives compute-allocation laws under which ensemble size grows at least as fast as training time per member.

**Why it matters:** if data is the binding constraint, the marginal return on a fourth epoch is a different question from the return on a second model — and this says the second model wins more often than practice assumes, because ensembles attack the variance that repeated epochs manufacture. The regime is stated (fixed data, matched budgets); outside it the law does not apply.

[`🔗 A Scaling Theory of Multi-Epoch Pretraining (arXiv)`](https://arxiv.org/abs/2611.03590) · [`🔗 Paper PDF`](https://arxiv.org/pdf/2611.03590)

---

## 8. Sonar-MoE frees each expert's gradient inside the backward pass — 19–22% less peak memory, bitwise-identical updates

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2611.03577 · submitted 2026-11-02
- **Tags:** `moe` `training` `memory` `optimizer` `research`

In an MoE model most parameters live in experts, and standard training holds every expert gradient in GPU memory until the optimizer step. Sonar-MoE applies the optimizer *during* the backward pass for batched expert tensors and frees each gradient immediately, so the GPU never holds more than one layer of expert gradients.

Fine-tuning **OLMoE-1B-7B** and **Granite-3.1-3B-A800M** in bf16 with two expert-kernel backends, it lowers peak memory by **19% to 22%**, keeps updates **bitwise identical** to standard training without expert gradient clipping, and holds held-out loss within 0.003 of all baselines. Each step also takes **17% to 23% less time** than standard training with global-norm clipping. The design detail that carries the speed: updating whole batched tensors rather than individual experts avoids a 20%–72% slowdown seen with the same memory saving, and dense parameters still get clipped.

**Why it matters:** memory savings at equal arithmetic are the rare kind, and "bitwise identical" is a strong claim that makes adoption cheap — no re-tuning of hyperparameters to chase a moved loss curve. The scaling motivation is the honest one: the saved memory grows with expert count, which is exactly the axis MoE models are being pushed along.

[`🔗 Sonar-MoE (arXiv)`](https://arxiv.org/abs/2611.03577) · [`🔗 Paper PDF`](https://arxiv.org/pdf/2611.03577)

---

## 9. RLVR teaches a reasoning strategy that evaporates out of distribution — and co-training on an easier task restores it

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2611.03627 · submitted 2026-11-02
- **Tags:** `rlvr` `reasoning` `generalization` `rl` `research`

The setting is a controllable one: find multiple inputs `x` for equations `f(x)=y` where `f` is a non-bijective string function. That makes the reasoning strategy observable and makes easy-to-hard OOD shifts definable (more solutions, longer `y`). Under RLVR the model learns to solve in-distribution tasks with high accuracy and structured step-by-step derivation — and then, under the OOD shift, **abandons the derivation and collapses into brute-force enumeration**, with sharp accuracy drops.

The authors rule out the two easy explanations: the base model is not incapable, and this is not reward hacking, since the model succeeds in-distribution with the right strategy. The intervention that fixes it is counter-intuitive — co-training with **bijective inversion** tasks, which are not uniformly harder and are further from the OOD evaluation, makes derivation more certain and substantially restores both strategy and accuracy.

**Why it matters:** "RLVR generalizes" is usually argued from benchmark deltas. This separates *learning a strategy* from *learning to keep it when the distribution moves*, and shows the second is trainable by a task that looks unrelated. It is also a warning about the shape of RLVR failure: the model does not get worse at reasoning, it stops bothering.

[`🔗 Not All Reasoning Generalizes (arXiv)`](https://arxiv.org/abs/2611.03627) · [`🔗 Paper PDF`](https://arxiv.org/pdf/2611.03627)

---

## 10. Superpowers is at 311,780 stars, ships v7.0.1 — and its visual companion loads a version-tagged logo from the author's server

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending (weekly) · v7.0.1 released 2026-10-21
- **Tags:** `agent-infra` `skills` `methodology` `telemetry` `claude-code`

`obra/superpowers` is a software-development methodology packaged as composable skills: brainstorm to a spec, write a plan detailed enough for "an enthusiastic junior engineer with poor taste," then run subagent-driven development with two-stage review (spec compliance, then code quality). The repo has **311,780 stars**, **27,732 forks**, MIT licence, and a **v7.0.1** release dated 2026-10-21; its README lists install paths for Claude Code, Codex, Cursor, Gemini CLI, Copilot CLI, Kimi Code, Pi and others.

The item worth flagging is a section most readers will skip. Under **Visual companion telemetry**, the README states that the optional visual companion loads the Prime Radiant logo from the project's website and that the request "includes the version of Superpowers in use," because "skills and plugins don't provide any feedback to creators" and they otherwise have no idea how many people use it. It is disclosed, scoped (no project, prompt or agent details), and opt-out via `SUPERPOWERS_DISABLE_TELEMETRY`, and it honours Claude Code's `DISABLE_TELEMETRY` and `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC`.

**Why it matters:** this is what a skills framework looks like when it wants a usage number and the host gives it none — a beacon in the one optional surface it controls, disclosed in the README rather than in a config screen. It is a reasonable design, and it is also the shape that will be copied without the disclosure. Check `SUPERPOWERS_DISABLE_TELEMETRY` before assuming a skill is just markdown.

[`🔗 obra/superpowers`](https://github.com/obra/superpowers) · [`🔗 Telemetry section in the README`](https://github.com/obra/superpowers#visual-companion-telemetry) · [`🔗 v7.0.1 release`](https://github.com/obra/superpowers/releases/tag/v7.0.1)

---

## 11. A 229,008-star "Karpathy skills" repo has no licence, no releases, and no commit since April 20

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending (weekly) · last commit 2026-04-20
- **Tags:** `agent-infra` `claude-code` `licensing` `repo-state` `dormant`

`multica-ai/andrej-karpathy-skills` is a single `CLAUDE.md` derived from Andrej Karpathy's public complaints about LLM coding — wrong assumptions made on your behalf, overcomplicated abstractions, orthogonal edits to code the model does not understand — reduced to four principles. It has **229,008 stars** and **22,828 forks**. The API reports **no licence**, there is **no release**, and the file listing at the repo root is seven entries with no `LICENSE` among them. It has **0 open issues and 108 open pull requests**. The newest commit is **2026-04-20**, a README sync adding a Cursor section — 198 days before this run.

What the repo *is* doing is pointing elsewhere: the first line of the README is a promotion for the author's newer project, **Multica**, "an open-source platform for running and managing coding agents with reusable skills," plus an X handle.

**Why it matters:** a six-figure star count on a seven-file repo with no licence is the Void pattern with the sign flipped — the artifact is tiny and static, and the attention is real but historical. Practically: no licence means the default is all-rights-reserved in most jurisdictions, so copying this `CLAUDE.md` into your repo is a redistribution question the star count does not answer. Judge it as a short, readable prompt, not as a maintained dependency.

[`🔗 multica-ai/andrej-karpathy-skills`](https://github.com/multica-ai/andrej-karpathy-skills) · [`🔗 Commit history (newest 2026-04-20)`](https://github.com/multica-ai/andrej-karpathy-skills/commits/main)

---

## 12. Spotify open-sourced a plugin marketplace for coding agents — and one plugin exists to route bulk work to cheaper models

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending (daily) · pushed 2026-10-23
- **Tags:** `agent-infra` `plugins` `spotify` `mcp` `cost`

`spotify/portal-ai-plugins` (3,003 stars, Apache-2.0, TypeScript) packages Spotify Portal into Claude Code, Codex, Cursor and pi as a plugin marketplace with workflows for auth setup, software-catalog search, service briefings, diagnostics and dry-run-gated actions. The install path is the new standard one — `claude plugin marketplace add spotify/portal-ai-plugins`, then `claude plugin install portal@portal`.

The second plugin in the same marketplace is the one to read. **shunt** (Claude Code only for now) routes "I/O-heavy agent work — bulk file reads and boilerplate generation" to "AiKA modes running cheaper worker models" through the Portal CLI's action registry. It ships as a sibling of the enterprise connector rather than as a product, which is how internal cost engineering usually surfaces.

**Why it matters:** a large vendor publishing a plugin marketplace is a signal that agent plugins are converging on one install-and-permission model across hosts — the same model whose trust boundary Postman's installer crossed in item 1. And `shunt` is the first openly published example of the pattern most agent teams arrive at privately: keep the expensive model for judgement, delegate the token-burning to something cheaper, and make the routing a policy rather than a prompt.

[`🔗 spotify/portal-ai-plugins`](https://github.com/spotify/portal-ai-plugins) · [`🔗 shunt README`](https://github.com/spotify/portal-ai-plugins/blob/main/plugins/shunt/README.md) · [`🔗 Portal CLI on npm`](https://www.npmjs.com/package/@spotify/portal-cli)

---

## 13. SolarWinds Dameware's 9.9 is a command injection that needs only a login — and the advisory credits Boeing's red team

- **Velocity:** ▮▮ rising
- **Source:** SolarWinds Trust Center · first published 2026-11-03
- **Tags:** `cve` `solarwinds` `command-injection` `remote-support` `9.9`

`CVE-2026-28336` is a command injection in SolarWinds Dameware affecting **2026.3 and all previous versions**, fixed in **2026.3.1**, rated **9.9 Critical** on the vendor's own vector `CVSS:3.0/AV:N/AC:L/PR:L/UI:N/S:C/C:H/I:H/A:H`. The `S:C` (scope change) plus `PR:L` is what pushes a low-privilege bug to 9.9: the injected command does not stay inside the component that accepted it, and the advisory's one-sentence summary says it "could lead to the compromise of the remotely controlled host."

Two provenance facts belong with the number. The metric on the NVD record is `Secondary psirt@solarwinds.com` and the record sits at `Awaiting Analysis` with **0 NVD-scored metrics** (it was `Received` when this item was written and moved later the same day) — so 9.9 is the **CNA's** score, not NVD's analysis, and it will likely be re-served unchanged. And the credit line names **Greg Bernatowicz on the Boeing Enterprise Security Red Team**, which is the same disclosure shape as last week's run of vendor-credited findings: an outside red team, a patch, then a record.

**Why it matters:** Dameware is remote-support software, which means the affected hosts are the ones administrators use to reach everything else, and the exploit needs a foothold rather than nothing. The remediation is a version bump to 2026.3.1, and the interesting part of the advisory is how short it is — no exploitation status, no attack complexity discussion, no note on whether the injected path is pre- or post-authentication beyond "Authentication is required."

[`🔗 SolarWinds advisory CVE-2026-28336`](https://www.solarwinds.com/trust-center/security-advisories/CVE-2026-28336) · [`🔗 Dameware 2026.3.1 release notes`](https://documentation.solarwinds.com/en/success_center/dameware/content/release_notes/dameware_2026-3-1_release_notes.htm)

---

## 14. A no-code expression language shipped two 9.8s in one afternoon — the Ruby backend forgot to escape `#`

- **Velocity:** ▮▮ rising
- **Source:** GitHub Advisory Database · GHSA published 2026-10-30, CVE records 2026-11-03
- **Tags:** `cve` `rce` `ruby` `template-injection` `sstf`

Elo compiles a functional expression language to Ruby, JavaScript, Python and SQL for no-code tools. The advisory we read on the repo's own page is specific down to line numbers: the string-literal emitter at `src/compilers/ruby.ts` lines 180–184 escapes backslash, double quote and control characters but **not `#`**, and a second sink at lines 405–412 wraps a subtype-constraint label in a Ruby double-quoted string "with no escape pass at all." Because `#{...}` is Ruby interpolation and backticks inside it run shell commands, a crafted Elo string compiles to attacker-chosen code — and "the same Elo source compiled to JavaScript, Python, or SQL is benign," which is how the bug breaks the compiler's own portability promise.

Two records carry it, both **9.8** with `AV:N/AC:L/PR:N/UI:N`: `CVE-2026-44266` (interpolation via the string-literal emitter and the labelled subtype-constraint branch; entry points include the `/try` playground with the Ruby target and `bin/eloc -t ruby -x`) and `CVE-2026-44267` (`.constructor.constructor` reaching JavaScript's `Function`, via a `member_access` handler in `src/transform.ts` that "does not reject meta-properties"). Both are fixed in **1.0.1**; the advisory says affected is `<= 1.0.0`. The scores are GitHub's (`security-advisories@github.com`), and both records are still `Received`.

**Why it matters:** the `#` character is the whole vulnerability, and it is missing from an escape list that otherwise looks complete — the exact class of bug a "we escape strings" code review passes. The two CVEs are also a reminder that an expression language with four backends has four independent injection surfaces and only one of them will be found by testing the playground you use.

[`🔗 GHSA-7w38-ggh5-v542 (Ruby backend RCE)`](https://github.com/enspirit/elo/security/advisories/GHSA-7w38-ggh5-v542) · [`🔗 GHSA-33r5-xmm8-v6x5 (JS constructor escape)`](https://github.com/enspirit/elo/security/advisories/GHSA-33r5-xmm8-v6x5) · [`🔗 enspirit/elo`](https://github.com/enspirit/elo)

---

## 15. FreeRDP's new 9.1 is an incomplete fix: two of three certificate-identity bugs were byte-identical from 3.29.0 to HEAD

- **Velocity:** ▮▮ rising
- **Source:** FreeRDP advisory GHSA-jq25-3374-4262 · published 2026-10-19, CVE record 2026-11-03
- **Tags:** `cve` `freerdp` `tls` `mitm` `incomplete-fix`

The advisory's own title is the finding: **"Incomplete fix for GHSA-43hh-p3vw-hfx3: CN-fallback and IP-literal cert identity checks were never patched."** The earlier advisory, patched in **3.29.0**, claims to fix three certificate identity-validation weaknesses in `tls_verify_certificate()` / `tls_match_hostname()` / `x509_utils_get_dns_names()`. The actual 3.29.0 commit set (`af7f228`, `c5a7325`, `b7db8d2`) *only addresses the embedded-NUL-byte truncation case*, while the Common-Name-fallback-despite-non-matching-SAN case and the IP-literal-matched-via-DNS-SAN case are, in the advisory's wording, *byte-identical in `libfreerdp/crypto/tls.c` from the 3.29.0 tag through current HEAD*.

The threat model is stated precisely and is not "no authentication": an attacker who can present a certificate chaining to a CA the client already trusts — a misissuing public CA, a rogue private CA — can silently pass identity verification and man-in-the-middle the RDP session (screen, keystrokes, clipboard, input injection). Fixed in **3.32.2**. The NVD record carries a VulnCheck 4.0 score of **9.1** (`AC:H`, `AT:P`) beside a 3.1 of **7.4** — the same vector at two frameworks, and the spread is the physical-attack/`AT:P` term, not a disagreement. The advisory also carries a line more reports should: **"This report was submitted with AI assistance."**

**Why it matters:** "fixed in 3.29.0" was false for two of the three cases for eleven releases, which means anyone who upgraded and stopped watching has been exposed the whole time. The general lesson is cheap to apply: when an advisory claims to close a *set* of related cases, check that the commit touches all of them — here two of three sinks had no diff at all.

[`🔗 GHSA-jq25-3374-4262 (FreeRDP)`](https://github.com/FreeRDP/FreeRDP/security/advisories/GHSA-jq25-3374-4262) · [`🔗 CVE-2026-121392 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-121392)

---

## 16. Docker Desktop 4.98.0 closes the WSL2 seccomp bypass — and quietly ships the kernel fix Ubuntu still has not

- **Velocity:** ▮▮ rising
- **Source:** Docker Desktop release notes · 4.98.0 released 2026-11-03
- **Tags:** `docker` `wsl2` `seccomp` `cve` `kernel`

The release notes list two security entries. First, `CVE-2026-112917`: on Docker Desktop for Windows with the WSL2 backend, an unprivileged Linux container "can use 32-bit socketcall to bypass the default seccomp restriction on **AF_VSOCK**," exposing host-facing services and Windows files reachable by the logged-in user. Docker scores it **9.2** on CVSS 4.0 (`AV:L/AC:L/PR:L/UI:N/VC:H/VI:H`) and is explicit about the fix being a pair: **Docker Desktop 4.98.0 or later AND WSL 3.0.3 or later** — "Docker Desktop 4.98.0 or later running on an older WSL remains affected." The seccomp filter blocked the 64-bit `socket` syscall with `AF_VSOCK` and not the 32-bit `socketcall` multiplexer, which is the classic 32-bit-syscall filter gap reappearing on x86-64.

Second, and more interesting given this feed's coverage: **"Fixed CVE-2026-98432, a use-after-free in the Linux kernel's IPv4 TCP handling."** The record's references point at `linux-msft-wsl-6.18.54.1` and WSL `3.0.3`, so what Docker shipped is a bundled kernel that carries the fix. We wrote on 2026-11-03 that Ubuntu still shipped no kernel closing that CVE three weeks after publication; as of today, Docker Desktop users on Windows have a version that does, and Ubuntu users still do not.

**Why it matters:** the 32-bit syscall gap is a seccomp-table habit, not a Docker bug, and the same table is copied into other container runtimes. The second entry is the more useful one for defenders: the kernel fix for a bug Ubuntu has not shipped is now in a desktop product's embedded kernel, which means whether a host is vulnerable has a different answer depending on whether your container runs on WSL2 or on an Ubuntu LTS host.

[`🔗 Docker Desktop 4.98.0 release notes`](https://docs.docker.com/desktop/release-notes/#4980) · [`🔗 CVE-2026-112917 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-112917) · [`🔗 WSL 3.0.3 release`](https://github.com/microsoft/WSL/releases/tag/3.0.3)

---

## 17. Craft Anything points an agent at any app and has it build a clean-room copy — 7,798 stars in four days, and its own status page is honest

- **Velocity:** ▮▮ rising
- **Source:** GitHub · created 2026-10-31 · 7,798 stars · Apache-2.0 / MIT
- **Tags:** `agent-infra` `rust` `mcp` `reverse-engineering` `clean-room`

The premise is unusually direct: point it at a website, desktop app or game, describe what you want, and a coding agent studies the original, builds a new project in the stack you ask for, then compares the build against the original at three screen widths and refines until it is close. The engine is **pure Rust**, exposes **320 tools** each as both a CLI command and an MCP tool, and runs as a desktop app, a CLI and an MCP server.

The design decision that matters is the default. **Clean room** means "nothing inside the original is read, not its code, files or page source" — it works only from what a visitor can see (screenshots, visible text, measured layout, colours, fonts, spacing), and tools that would look inside are refused with an explanation of how to enable Deep mode. **Deep** reads code, files and JavaScript, with Ghidra when installed, "for your private use." The responsible-use paragraph says it "never bypasses DRM, logins or anti-cheat" and that the agent is told not to copy logos, photos or text unless you confirm you own them. The status block is equally specific about what is unfinished: building with API keys and other coding agents is **"built, not yet run live,"** behaviour checks for apps and games are partial, and some engine tools were tested only against stand-ins.

**Why it matters:** this is the first widely-starred tool that packages "clone this software" as an agent workflow, and it has made the legally interesting choice on purpose — clean-room by default, source-reading opt-in. Whether that holds up is not a technical question, but shipping the distinction, the refusal behaviour and the anti-DRM statement in the README is more than the category usually does.

[`🔗 storytold/craft-anything`](https://github.com/storytold/craft-anything) · [`🔗 docs/STATUS.md`](https://github.com/storytold/craft-anything/blob/main/docs/STATUS.md)

---

## 18. I jailbroke my car's navigation unit to change the clock — the "set time" menu only exists if a maps SD card is mounted

- **Velocity:** ▮▮ rising
- **Source:** blog.nns.ee · 2026-11-02 · 382 pts on HN
- **Tags:** `reverse-engineering` `automotive` `qnx` `firmware` `writeup`

The write-up starts with a 2014 Renault Latitude whose clock is an hour off after the DST switch and whose "Set time" option is simply absent from the settings menu — the previous owner's claim that the car "apparently needs this SD card just to change the time on the clock" turned out to be true. The second Settings button raises `No maps detected!` instead of opening. So the author pulled the firmware from the vendor's update endpoints, found the update archive contains a `ttsystem` file that is an **ext3 filesystem**, and worked from there.

The useful part is the methodology, not the punchline: the reverse-engineering was bootstrapped from a public French README (`andronedev/carminat-tomtom-live-re`) that the author describes as "seemingly heavily LLM-assisted" but which correctly identified the update URLs — a reminder that LLM-written documentation is often accurate about *where the files are* while being unreliable about *what to do with them*. From there it is filesystem extraction, a QNX-based unit, and the discovery that a code path gated on map data also gated a clock setting.

**Why it matters:** this is the shape of modern embedded reverse engineering — vendor update servers as the primary artifact, a community note as the map, and no vendor cooperation at any point. It is also a small, exact example of a state machine where a UI element is not missing but *conditional*, and where the honest fix is not a settings toggle but understanding what the unit is waiting for.

[`🔗 Jailbreaking my car's navigation system`](https://blog.nns.ee/2026/11/02/renault-hack/) · [`🔗 carminat-tomtom-live-re (prior work)`](https://github.com/andronedev/carminat-tomtom-live-re/blob/main/README.md) · [`🔗 HN thread`](https://news.ycombinator.com/item?id=50339288)

---

## 19. pixelfx ships 244 pixel-art effects as small programs — and marks the count in the README with HTML comments, for the machines

- **Velocity:** ▮ steady
- **Source:** GitHub · created 2026-10-30 · 4,060 stars · MIT
- **Tags:** `dev-tools` `pixel-art` `claude-skill` `open-source` `games`

`patch-gg/pixelfx` is a gallery of **244 pixel-art effects and animations**, "every one a small piece of code" — fire, explosions, magic, weather, UI, pickups, critters — each playable live, recolourable, mirrorable, exportable as sprite sheets, and droppable into a browser game. Effects that involve a character are "acted out": wind-up, release, freeze on contact, recovery, with twelve whole moves chaining effects into attacks. It ships with a Claude Code skill that makes new ones in the same style, credited to Hugo Duprez's method from his post on making pixel-art effects with Claude.

The detail worth stealing is structural: the count in the README is written as `<!-- count -->244<!-- /count -->` — an HTML comment wrapping the number, so a tool that reads the page can find the claim without a regular expression guessing at prose. It is the cheapest possible answer to the class of bug where the number in a README drifts from the number in the code, and it costs two comment markers.

**Why it matters:** for a feed that spends its time checking counts against artifacts, a repo that *delimits* its own count is the friendliest thing on GitHub today. The content is also genuinely useful — 244 small, licensed, individually-inspectable effects are a better asset for a game jam than any generated sprite sheet, and the skill alongside them is the export format that keeps the count growing.

[`🔗 patch-gg/pixelfx`](https://github.com/patch-gg/pixelfx) · [`🔗 Live gallery`](https://patch-gg.github.io/pixelfx/) · [`🔗 Catalog`](https://github.com/patch-gg/pixelfx/blob/main/docs/CATALOG.md)

---

## 20. An RL agent given only a quantum task reconstructs Minkowski causal structure inside its own predictive model

- **Velocity:** ▮ steady
- **Source:** arXiv 2611.03596 · submitted 2026-11-02
- **Tags:** `research` `rl` `quantum` `world-models` `emergence`

The setup is deliberately stripped: a model-based reinforcement-learning agent maximising quantum mutual information between localised probes interacting with a quantum field in Minkowski spacetime, and it is never given the metric, the causal structure, or any information about either. What the agent builds to do the task is an internal predictive model whose planner "develops the characteristic null structure of spacetime" — from which the authors reconstruct the Minkowski metric's causal structure with high accuracy.

**Why it matters:** the claim is not that the agent discovered relativity, it is that causal structure was recoverable from operational experience alone — which is the strongest form of the argument that world models learn structure rather than correlations this feed has seen, and it comes with a task narrow enough to check. The obvious limit is that the field and the probes are chosen by the experimenter; the interesting residue is that *null* structure, the part that fixes which events can influence which, fell out of a prediction objective.

[`🔗 Spacetime Emergence in the Memory of a Learning Agent (arXiv)`](https://arxiv.org/abs/2611.03596) · [`🔗 Paper PDF`](https://arxiv.org/pdf/2611.03596)

---

## Metadata

| Field | Value |
|-------|---------|
| Generated | 2026-11-03T20:15:18Z |
| Items | 20 |
| Sources tracked | 18 (Hacker News, GitHub Trending, arXiv, NVD, GitHub Advisory Database, vendor advisories, status pages) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[Previous day](2026-11-03.md) · [Raw .md](../feed/2026-11-04.md) · [Archive](../archive/)
