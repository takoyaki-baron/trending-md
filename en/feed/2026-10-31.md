---
date: 2026-10-31
updated: 2026-10-31T04:19:32Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 17
license: CC-BY-4.0
---

# Trending — 2026-10-31

Ranked by **velocity** — how fast attention is shifting, not how much it has accumulated. Every item links to a primary source that was opened and read.

---

## 1. CISA adds two Ivanti Connect Secure bugs to KEV — and the one everybody quotes as 8.8 is a 7.0 in the record

- **Velocity:** ▮▮▮ trending
- **Source:** CISA KEV · added 2026-10-30 · due 2026-11-02 / 2026-11-13
- **Tags:** `cve` `ivanti` `kev` `exploitation` `vpn`

CISA added **CVE-2026-111357** and **CVE-2026-118527** to the Known Exploited Vulnerabilities catalog on **2026-10-30**, "based on evidence of active exploitation." Both are Ivanti Connect Secure; the third bug in the chain they belong to, **CVE-2026-104935** (the authentication bypass and upload race, CVSS 8.6), entered KEV on **2026-10-13**. The vulnerability research is Volexity's, published **2026-10-13** as "A Series of Unauthenticated Events": a self-described **unknown** actor tracked as **UTA0576** chained all three against a **fully patched** appliance running `22.8R2.4, Build 19097`, with activity traced back to **2026-10-03**. The chain ends at root by patching the in-memory `dsinvoked` broker and `libdsplibs.so` DSCache configuration.

**The score in the record is not the score in the coverage.** The CVE record (state `PUBLISHED`, assigner **MITRE**) carries **one** metric: `CVSS:3.1/AV:L/AC:H/PR:L/UI:N/S:U/C:H/I:H/A:H` = **7.0 HIGH**, CWE-829 — while KEV's own title for the same entry reads "Missing Authentication for Critical Function" and Volexity calls it privilege escalation, three labels for one bug. NVD's copy now reads `Analyzed` (lastModified **2026-10-30T20:29Z**, fifteen minutes after this item was drafted) and still carries **zero** metrics of its own — the endorsement case: NVD analyzed the record and left MITRE's 7.0 standing rather than publishing a score beside it. Secondary coverage attributes **8.8** to "the updated advisory" — Ivanti's, not the CVE record — and gives **4.3** for CVE-2026-118527, a number with no record behind it: NVD has no such CVE, `cveawg` answers `CVE_RECORD_DNE`, and the KEV entry's own notes link an NVD detail URL that resolves to nothing. It is **1 of 79** KEV entries added since 2026-09-01 with no published record, and the only one. The vector arithmetic is the arbiter and it yields 7.0: `AV:L` and `AC:H` are what hold it down, not any missing component. Volexity's own update note names CVE-2026-111357 as the privilege-escalation fix and gives **no CVSS at all**; CVE-2026-118527, the predictable-filename bug that lets an authenticated attacker write to known disk paths, is **not mentioned** on that page.

**Why it matters:** KEV is an exploitation claim, not a severity one — a 7.0 that requires local access and a race sits beside 9.8s because the catalog records what attackers *did*, and anyone triaging by score alone skips it. The practical instructions are the post-exploitation ones: the actor deployed **no web shell**, replayed the chain for every command and returned output over HTTPS, so Ivanti's own Integrity Checker "may not be able to identify device compromise" — Volexity needed memory forensics to see it. Fix versions are **25.1.1.3 / 25.1.3.1 / 22.8R2.6**, with 22.7.x and below unaffected — though none of the three pages cited here states either: Volexity's does not, NVD's description names only `22.8R2.4`, and Ivanti's advisory is a JS shell on this pass (**1.0 MB** of HTML, **68 characters** of text, its `llms.txt` redirecting to a login), so the fix list is unverified here. The two same-day KEV adds also carry different due dates — **2026-11-02** and **2026-11-13** — because the clock is risk-tiered per entry, not per chain. Read the confidence labels too: Volexity assesses **low** confidence on criminal rather than espionage motive, **medium** on LLM use, and states the actor's ultimate objectives "could not be determined."

[`🔗 CISA — two KEV additions`](https://www.cisa.gov/news-events/alerts/2026/10/30/cisa-adds-two-known-exploited-vulnerabilities-catalog) · [`🔗 Volexity — chained ICS zero-days`](https://www.volexity.com/blog/2026/10/13/a-series-of-unauthenticated-events-chained-exploitation-of-ivanti-connect-secure-zero-days/) · [`🔗 CVE-2026-111357 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-111357)

---

## 2. Northflank tells every customer to assume their environment variables were decrypted — and says users are confirming AI keys were used

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 244+ pts · ~1 day ago (~2026-10-30)
- **Tags:** `incident` `secrets` `paas` `supply-chain`

Northflank opened a **"Security incident"** at **11:43 UTC on 2026-10-30** after receiving a Wiz threat alert, and within two hours had moved from "investigating" to a flat instruction, verbatim: "**Assume all environment variables have been decrypted. Disable/rotate all keys.**" By **13:58** the notice named the scope — "workloads, secret groups and global secrets" — and by **15:12** the platform had enabled secret rotation for Postgres and MongoDB for all users and recommended disabling public exposure on addons. Seven components were listed **Major outage**: Networking, Certificates, Services, Addons, Jobs, Builds, and Logs and Metrics. The App, API, marketing site and docs stayed up.

The line that matters most is buried in the status thread rather than the headline: **"Multiple users are confirming that their AI keys have been used."** Northflank does not give a customer count, does not confirm the full scope of what was accessed, and as of the final **19:28** update says the investigation is ongoing with "no further confirmed findings" — while the guidance there has moved past decryption altogether: "assume all environment variables have been **compromised**."

**Why it matters:** A PaaS holds the credentials its customers stopped thinking about — the model API keys, the database URLs, the webhook secrets — and the response here is the correct one precisely because it is the expensive one: it assumes decryption rather than waiting to prove it. The rotation guidance and the disclosure are both live artifacts that can move; treat the scope as unknown rather than bounded, and treat "no further confirmed findings" as a status, not a clean bill.

[`🔗 Northflank — status incident`](https://status.northflank.com) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=50305025)

---

## 3. Google's Sleep framework splits training into wake and sleep — and its 10M-token win is measured with no limitations section

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 92+ pts · ~1 day ago (~2026-10-30)
- **Tags:** `continual-learning` `moe` `research` `google`

Ali Behrouz and Vahab Mirrokni published the **Sleep framework** on the Google Research blog on **2026-10-27** (paper: arXiv **2606.03979**). The pitch is a periodic learning lifecycle instead of the usual train-then-freeze: a *wake* phase where the model serves and stores short-term traces, and a *sleep* phase where it stops taking input and does two things — **consolidation**, adding low-rank MoE experts to stable blocks and distilling short-term traces into long-term parameters with on-policy distillation plus an RL "learning to imitate" reward, then resetting the temporary high-frequency parameters ("synaptic pruning"); and **dreaming**, where the MoE router deliberately activates atypical experts, generates synthetic samples, filters them by gradient usefulness and fine-tunes on the best-rated ones.

The numbers, as reported: near-zero degradation across multiple stages of continual translation on unseen **Manchu** and **Kalamang** where ICL, Cartridges and SFT "showed severe forgetting"; **BABILong at 10M tokens** with near-perfect results, ahead of GPT-4 and Titans; **48.9%** single-task and **46.2%** CPT on SQuAD and continued pre-training, beating the base model, SFT and SEAL; and **79.2% / 69.0% / 46.1%** on AIME 24/25 and HMMT 25, ahead of SFT, GRPO and OPSD.

**Why it matters:** The post ships no limitations section, does not name a specific model family, parameter count or compute budget, and gives charts without numbers for class-incremental learning — so the honest read is that this is a **method** paper with headline results, not an ablation you can compare across systems. Two structural caveats are visible in the description itself: the method needs preallocated expert capacity and an offline phase, which is a deployment cost the post does not price; and the gains rest on self-generated synthetic data filtered by a gradient signal, which is the part most likely to fail silently in someone else's hands. The theory is offered as explanation, not as proof of the empirical margins.

[`🔗 Google Research — the Sleep framework`](https://research.google/blog/the-sleep-framework-a-new-way-for-llms-to-retain-knowledge-in-continual-learning/) · [`🔗 arXiv 2606.03979`](https://arxiv.org/abs/2606.03979)

---

## 4. Lightpanda is a headless browser rewritten in Zig — 123 MB against 2 GB, and an Alpine binary that will not run on Alpine

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub Trending · 559 stars today · 38,209 total
- **Tags:** `browser` `zig` `agents` `automation`

**`lightpanda-io/browser`** is a headless browser built from scratch in **Zig** — "Not a Chromium fork. Not a WebKit patch." — with no graphical rendering engine, JavaScript executed through V8, and CDP, WebDriver BiDi, Puppeteer/Playwright-style automation, a page dumper, an "agent mode" and an MCP server on top. License is **AGPL-3.0**. The benchmark on the README is 933 real pages on an AWS EC2 `m5.large`: peak memory for 100 concurrent pages **123 MB vs 2 GB** (~16× less) and execution time **5 seconds vs 46 seconds** (~9× faster), which is where "16x lighter and 9x faster than Chromium" comes from.

**Why it matters:** The differentiator is the constraint, not the speedup — dropping the renderer is what makes the memory number possible, and it also defines what the tool cannot do (anything that needs layout or pixels). The README is unusually honest about where it breaks: **no native Android build** because Bionic lacks the glibc loader; **no native Windows binary**, WSL only; and the released Linux binaries need glibc, so on musl systems like Alpine they fail with "cannot execute: required file not found" — pick a glibc image or build from source with Zig 0.17.0 plus V8, Libcurl and html5ever. For agent workloads that read DOM and call APIs, that is a reasonable trade; for visual testing it is the wrong tool, and the page says so.

[`🔗 lightpanda-io/browser`](https://github.com/lightpanda-io/browser) · [`🔗 GitHub Trending`](https://github.com/trending)

---

## 5. Matt Pocock's skills repo holds 307k stars and 27 skills — and it is an argument against vibe coding, not a prompt pack

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · 882 stars today · 307,347 total
- **Tags:** `agent-skills` `engineering` `mit` `claude-code`

**`mattpocock/skills`** ("Skills for Real Engineers. Straight from my .agents directory.") carries **307.3k stars, 25.9k forks, 551 commits** and an **MIT** license. It is **27 skills — counted from the README's own list, which states no total** — under `skills/`, split by both phase and invocation: **11 user-invoked engineering skills** (`ask-matt`, `grill-with-docs`, `triage`, `improve-codebase-architecture`, `to-spec`, `to-tickets`, `implement`, `implement-spec`, `wayfinder`, `retro`, `setup-matt-pocock-skills`), **9 model-invoked ones** (`prototype`, `diagnosing-bugs`, `research`, `tdd`, `domain-modeling`, `codebase-design`, `code-review`, `pr`, `wizard`), **5 user-invoked productivity skills** (`grill-me`, `handoff`, `teach`, `to-questionnaire`, `wait-what`) and **2 model-invoked** (`grilling`, `writing-for-agents`). Install is via plugin marketplaces or `npx skills@latest add mattpocock/skills`.

**Why it matters:** The stated design target is four failure modes — building the wrong thing, excessive verbosity, code that does not work, and codebases turning into a "ball of mud" — and the proposed fixes are deliberately boring: interview sessions before building, a shared domain glossary and ADRs, red-green-refactor loops, and ongoing architectural improvement. The split by invocation style is the part worth copying: user-invoked skills orchestrate a workflow, model-invoked skills carry reusable discipline the agent can select itself, and conflating the two is how skill collections become menus nobody triggers. It also claims to "work with any model," which is a portability promise the repository structure supports and its tests do not demonstrate.

[`🔗 mattpocock/skills`](https://github.com/mattpocock/skills) · [`🔗 GitHub Trending (weekly)`](https://github.com/trending?since=weekly)

---

## 6. NESformer runs a Nintendo in ~933 MB of Qwen weights — and it was never trained

- **Velocity:** ▮▮ rising
- **Source:** Hacker News (Show HN) · 118+ pts · ~1 day ago (~2026-10-30)
- **Tags:** `transformers` `deltanet` `emulation` `weights`

**`dbreunig/nesformer`** runs an NES 6502 CPU, its 2 KB of work RAM and a cartridge ROM *inside a stock `Qwen3_5ForCausalLM` checkpoint* — and, as the README states plainly, "**Nobody trained these weights; a compiler computed every one.**" Gated DeltaNet state matrices act as memory: a one-hot key overwrites one 128-wide row, a one-hot query reads it back, so rows become registers, RAM or ROM cells. The program counter is not stored — it is inferred from jump targets and instruction-length counters. The checkpoint is **466.6M parameters in bf16 (~933 MB)**, with only **9.3M nonzero** and **3.3 MB** zipped; the host program supplies the PPU, controller input, vblank/NMI timing and APU registers, and never touches CPU state except through the generated trace.

The verification is the interesting part: the reference CPU matches nestest's golden log for **3,348 instructions** and py65 across **5.7 million game instructions**; the exact circuit predicted every reference token for nestest plus **283,610** positions; full runs of Thwaite and Full Game reproduced **all 300** and **all 210** saved frames. On raw speed it is far from usable — numba reaches ~**1,650 tokens/s** on one core against ~**700,000 tokens/s** needed for real time, and idle-loop skipping leaves it **150–290× slower** than hardware.

**Why it matters:** This is the cleanest public demonstration that a transformer's state can be *host memory* and its forward pass a *CPU*, with weights as a compiled artifact rather than a learned one — the same trick Qwenputer pulled on RISC-V state, applied to a console with a cycle-level reference trace to check against. The limits are stated without hedging: **NROM / iNES mapper 0 only**, no bank switching, unofficial opcodes emit HALT, no APU-frame or DMC IRQs, no sound, approximate sprite-0 hit, and the PPU is not in the weights at all. MIT-licensed, with a `chipformer` compiler lineage derived from Qwenputer.

[`🔗 dbreunig/nesformer`](https://github.com/dbreunig/nesformer) · [`🔗 Hacker News (Show HN)`](https://news.ycombinator.com/item?id=50306442)

---

## 7. OpenAI rewrites the Model Spec around five values — and the document says its own models do not yet reflect it

- **Velocity:** ▮▮ rising
- **Source:** OpenAI · Model Spec 2026-10-29 edition
- **Tags:** `openai` `policy` `alignment` `agents`

OpenAI published a rewritten **Model Spec** on **2026-10-29**, restructured around five named values: **"Be faithful to human intent," "Minimize harm," "Be honest and transparent," "Facilitate human agency," "Act with care."** Faithfulness to intent is framed as the foundation — models should grasp what people actually want rather than follow instructions literally, and use judgment where instructions run out. The document keeps a **"chain of command"** with explicit authority levels — **Root, System, Developer, User, Guideline** — plus **"No authority by default"** for assistant and tool messages and untrusted content, and adds two balancing frameworks for individual-versus-collective interests and immediate-instruction-versus-longer-term goals. It also introduces "Consider context carefully" for conversation history, memory and personalization, with assumptions required to be visible and correctable.

**Why it matters:** The sentence to carry away is the vendor's own: **"Our production models do not yet fully reflect the Model Spec."** That turns the document from a description of behaviour into a training target, and it is the right reading — the expanded guidance on controlling and communicating side effects is written for **agents that book, buy and edit**, where the failure mode is an action taken correctly under a misread intent. Two structural notes: the most detailed style guidance was retired in favour of adapting to user, language and culture, and the subject is now called **"GPT"** rather than "the assistant." The page also flags a newer edition as current and marks this one historical, so quote the version you read.

[`🔗 OpenAI — Model Spec (2026-10-29)`](https://model-spec.openai.com/2026-10-29.html) · [`🔗 TNW — five core values`](https://thenextweb.com/news/openai-model-spec-five-values-update)

---

## 8. Recursive's Flint is a 39.8B-A2.5B coder at Apache 2.0 — 89.7% SWE-bench Pro v2, and a June 2026 knowledge cutoff

- **Velocity:** ▮▮ rising
- **Source:** Hugging Face Trending · 19k downloads · 1.26k likes
- **Tags:** `open-weights` `moe` `coding-agent` `apache`

**`RecursiveSI/flint`** is a decoder-only MoE coding-agent model at **39.8B total / ~2.5B active per token** (including the output head; the active body alone is ~2.2B), **49 layers** — 2 dense then 47 MoE — with **256 routed experts per MoE layer**, 6 selected per token plus a shared expert. Attention is split **35 sliding-window / 14 full-attention** layers, context is **262,144 tokens**, vocabulary **150,144**, license **Apache 2.0**. Reported benchmarks, at temperature 1.0 / top-p 0.95 / top-k 20: **54.9% on Terminal-Bench 2.1, 89.7% on SWE-bench Pro v2, 74.2% on SWE-bench Verified.**

**Why it matters:** The SWE-bench Pro figure is the one to read carefully — Pro v2 is a harder, contamination-resistant split, and an 89.7% there beside a 54.9% Terminal-Bench is the shape of a model that is strong at repository edits and weaker at long-horizon shell work — the opposite of what the active-parameter count would predict. The model card's own caveats are worth quoting rather than paraphrasing: it may generate "incorrect or harmful content, faulty code, or inappropriate tool calls," long reasoning can consume the output budget, and the context limit is "a capacity limit, not a guarantee of uniform accuracy across all sequence lengths or tasks." Knowledge cutoff is **June 2026**, so anything after that is inference rather than recall.

[`🔗 RecursiveSI/flint`](https://huggingface.co/RecursiveSI/flint) · [`🔗 Hugging Face trending`](https://huggingface.co/models?sort=trending)

---

## 9. A linear probe catches 82% of a pressured agent's leaks — and a bag-of-words classifier nearly matches it

- **Velocity:** ▮▮ rising
- **Source:** arXiv · 2610.40588 · 2026-10-30
- **Tags:** `multi-agent` `safety` `interpretability` `research`

"**Pre-Crime for Agents, at the Last Second: Probing When a Recruited Agent Gives In**" (arXiv **2610.40588**, Leonidas Raghav) sets up a controlled multi-agent pressure test across six scenarios: a peer pushes a target for up to 20 rounds to reveal a secret such as a deploy token, and the target often refuses and then gives in. A **linear probe** reads the target's activations at each model call *before* generation. On held-out **Qwen3-32B** episodes, with a threshold that flags 5% of benign calls, the probe detects **82%** of leaking calls; a zero-shot decision-model monitor detects **26%** at a similar rate. On **gpt-oss-20b**, probing reasoning reaches **AUROC 0.91**.

**Why it matters:** The result the paper reports against itself is the useful one — a bag-of-words classifier on the same calls "comes close," which suggests "most of the gain comes from training on labels, not activations," and the probe reacts to *permitted* disclosures too, reading "the coming disclosure more than the violation." Output filters only see text after it exists; this moves the check earlier, but the warning is short-range and stopping on every alarm "would stop most benign episodes," with a second text check failing to resolve the trade-off. The setup is controlled, not a deployment, so 82% is an upper-bound-shaped number rather than a field rate.

[`🔗 arXiv 2610.40588`](https://arxiv.org/abs/2610.40588) · [`🔗 arXiv cs.AI recent`](https://arxiv.org/list/cs.AI/recent)

---

## 10. Treat retrieval as walking a memory, not searching it — 0.95 return in 0.59M steps where absolute addressing needs 0.94M to 2M+

- **Velocity:** ▮▮ rising
- **Source:** arXiv · 2610.40545 · 2026-10-30
- **Tags:** `memory` `long-context` `agents` `research`

"**Retrieval as Traversal: Value-Indexed Memory for Stateful Long-Context Agents**" (arXiv **2610.40545**; Daniel Strauß, Zhenshan Bing, Alois Knoll) separates memory *content* from memory *address*: content determines value, location determines access cost, and retrieval becomes a persistent local traversal instead of a fresh global search at every step. The proposed objective is a cost-regularized index that keeps valuable information in nearby regions while penalizing each memory made locally accessible; its marginal-value form encourages complementary memories to be retrieved together and discourages redundant ones from sharing a set just because each is individually useful.

The only experiment is a proof-of-concept using the simplest fixed-geometry variant on **MiniGrid Memory** with a five-token context: a persistent local-traversal head reached **0.95 mean return after 0.59M training steps**, against **0.94M** for Gaussian absolute addressing and **more than 2M** for categorical absolute addressing.

**Why it matters:** The honest framing is the paper's own — learned geometry and repeated retrieval were not tested, and "to test the full proposed method further experimentation is necessary," so what is supported is the weaker claim that *stateful* retrieval may be easier to learn than stateless. That is still the useful direction for agents, where re-searching a growing context is the dominant cost, and the 1.6×–3.4× sample-efficiency gap is a reason to test it rather than a reason to ship it.

[`🔗 arXiv 2610.40545`](https://arxiv.org/abs/2610.40545) · [`🔗 arXiv cs.AI recent`](https://arxiv.org/list/cs.AI/recent)

---

## 11. "Rewindable interactive proofs" let a weak verifier rewind a strong prover — and the construction buys nearly-linear verification

- **Velocity:** ▮▮ rising
- **Source:** arXiv · 2610.40535 · 2026-10-30
- **Tags:** `scalable-oversight` `proofs` `research`

"**Efficient Scalable Oversight via Rewinding**" (arXiv **2610.40535**; Ziyi Guan, Yael Tauman Kalai, Ron Rothblum, Zoe Xi) attacks the assumption underneath debate-based oversight: existing interactive proofs are efficient only if at least one prover is truthful, and dropping that assumption has been expensive. Their construction — **rewindable interactive proofs**, or RIPs — lets the verifier save a prover's state and restore it later, which is feasible precisely when the prover is an AI model or runs in a checkpointable environment. They build an RIP for computations "robust to changing a small fraction of oracle answers" without cryptography. The honest prover runs in time **linear in the original computation**, and after one-time preprocessing the verifier runs in time "nearly linear in the input length."

**Why it matters:** This is an efficiency theorem, not a benchmark — the abstract gives no quantitative speedup, and the only empirical evidence is a **preliminary MNIST experiment** indicating an RIP can beat "a state-of-the-art deployed proof system." Two applicability limits are stated: the construction only covers computations robust to a small fraction of altered oracle answers, and rewinding depends on the verifier controlling the prover's machine or being able to checkpoint and restore it. That is a real constraint on third-party models and a non-issue for a model you host — which is where oversight research increasingly has to live.

[`🔗 arXiv 2610.40535`](https://arxiv.org/abs/2610.40535) · [`🔗 arXiv cs.AI recent`](https://arxiv.org/list/cs.AI/recent)

---

## 12. OpenMausBot gives each bot its own computer — 8.4k stars, Apache-2.0, and plaintext API keys in a 0600 file

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · 899 stars today · 8,422 total
- **Tags:** `agents` `desktop` `mcp` `apache`

**`milind-soni/OpenMausBot`** — formerly OpenGrokBot, also "MausBot" — is an open-source alternative to Grok Bot / Meta Muse / OpenAI dots, built around a simple premise: AI agents are **contacts in a chat app**, each with a persona, model, conversation memory, computer and connected apps. Bots run through locally installed `claude`, `codex` or `grok` CLIs with a local harness server managing processes. Every bot gets a computer — a cloud Linux desktop provisioned through the Boat API, an isolated "Local VM," or, where supported, the user's own machine. License is **Apache-2.0** except an `enterprise/` directory that is "source-available" under a separate license; removing it leaves the open-source edition. The repo has **8.4k stars, 1.2k forks and 7,442 commits**.

The security model is more considered than the category norm: a permission broker turns shell commands, file edits and questions into inline Allow/Deny/answer cards; credentials are "write-only" so the UI sees configured flags rather than values; host-computer control is explicit opt-in and **fail-closed** on Ubuntu Wayland pending issue #345; and the MCP control plane deliberately excludes approval grants, deletion, settings, credentials and computer lifecycle.

**Why it matters:** The carve-out is the caveat — API keys are stored **as plaintext in a private `config.json`** (`0600` on Unix), so the whole permission model rests on local filesystem protection, which is a different threat model from a keychain. The project calls itself "early but real" and lists the gaps: Ubuntu is beta, calls are macOS-only, the Windows installer is unsigned, and app events require the bundled Composio service. The interesting bet is architectural — that an agent with a computer is a product shape, and the permission broker is what makes it sellable.

[`🔗 milind-soni/OpenMausBot`](https://github.com/milind-soni/OpenMausBot) · [`🔗 GitHub Trending`](https://github.com/trending)

---

## 13. Tangled rebuilds its federated forge: an in-memory Rust indexer, and issues stored as Git object chains beside the code

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 144+ pts · ~1 day ago (~2026-10-30)
- **Tags:** `git` `federation` `atproto` `forge`

Tangled relaunched its code forge with a rebuilt architecture. The old Go monolith ("the appview") served indexing, caching, off-protocol data and server-rendered UI from one SQLite database in Sweden; it is now split into a **Svelte frontend at the edge** and **bobbin**, a new **Rust** indexer that is entirely in-memory and read-only, running in more than **11 regions**. **Knot2**, also Rust, folds a custom Git server and SSH server into one binary. Issues, pull requests, comments, reactions and labels now live **on the knot alongside the code** as "collaborative objects" — chains of Git objects with signed records and full history — syncing through the AT Protocol firehose, and attestations written to users' own PDSs let a user verify two-way that a knot did not alter their records. Organizations became real AT Protocol accounts with their own DIDs, and the PR flow supports stacked pull requests for both Git and Jujutsu, including interdiffs between versions.

**Why it matters:** "Federated" usually means the code is mirrored and the collaboration layer is not; putting issues and PRs in the same signed object graph as commits is the part that makes portability real rather than nominal. The limits are stated: bobbin is **read-only** and handles only AT Protocol data, existing self-hosters must upgrade knots to **v1.20.0**, migration for accounts currently standing in as organizations is still being developed, and private repositories, a CLI, language SDKs and agent skills are promised for later weeks — so this is a rebuild announced, not a rebuild finished.

[`🔗 Tangled — the federated code forge`](https://tangled.org/blog/forge/) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=50305573)

---

## 14. Bunny.net found one CDN node on a compromised hosting provider and is reissuing every managed certificate

- **Velocity:** ▮▮ rising
- **Source:** bunny.net status · incident published 2026-10-28
- **Tags:** `cdn` `tls` `incident` `supply-chain`

bunny.net published an incident on **2026-10-28** after an infrastructure provider reported unauthorized access involving third-party server-management software. One **CDN node in Armenia** was hosted on an affected provider server. At **11:40 UTC on 2026-10-28** bunny.net stopped routing traffic through it within 20 minutes, preserved logs, wiped the server, revoked its access and permanently removed it. Its investigation "found no evidence of unauthorized access to the CDN node or any of its data," while the page concedes it "cannot completely rule out the possibility" — the standard formulation, and the reason the follow-up work is happening anyway.

The scope statement is narrow: potentially exposed data, *if* access occurred, was limited to temporarily cached content, Pull Zone configurations and TLS certificates on that server; no bunny.net account data or internal systems were affected. Platform-domain certificates were revoked and reissued, and at **18:40 UTC on 2026-10-29** managed TLS certificate reissuance was progressing in controlled batches with new private keys, expected to finish by end of **2026-10-31**.

**Why it matters:** A single node is a small blast radius and a large one at the same time, because a CDN edge holds the private keys for other people's domains. The distinction between "no evidence" and "ruled out" is what turns a status note into a key-rotation exercise, and the honest part of this one is that the cost lands on customers using their own certificates, who were told to revoke and reissue themselves — the provider cannot do it for them.

[`🔗 bunny.net — CDN incident`](https://status.bunny.net/incidents/p6gf1by9kr7m) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=50308697)

---

## 15. A WordPress import plugin gets a 9.9 from CISA's enrichment — and NVD's status is `Deferred`

- **Velocity:** ▮ steady
- **Source:** NVD · published 2026-10-29
- **Tags:** `cve` `wordpress` `cisa-adp` `path-traversal`

**CVE-2026-113617** (published **2026-10-29**) is a path traversal in the WordPress plugin **Automated Import Products to Cart** before **1.0.4**: the plugin fails to sanitize a user-supplied file path before using it to read and delete files, so users with minimal permissions — "such as subscribers" — can read arbitrary files (including ones containing the database credentials) and delete arbitrary server files. The metric is `CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:C/C:H/I:H/A:H` = **9.9**.

**The 9.9 is not the vendor's and not NVD's.** Its source is `134c704f-9b21-4f2e-91b3-4a467353bcc0` — **CISA-ADP** (Vulnrichment) — sitting in the `Secondary` slot, with CWE-22 attributed to the same source. The record's `vulnStatus` is **`Deferred`**, and there is no `nvd@nist.gov` metric. So this is the fifth provenance case in its purest form: a number on the record written by a third-party enrichment container, on a record NVD has said it will not analyse.

**Why it matters:** The score is defensible — `S:C` is what pushes a `PR:L` file-read-and-delete to 9.9 — but attributing it to "NVD" or to the plugin author would both be wrong, and the `Deferred` status means that number will not be revisited. The same 24-hour window produced **CVE-2026-109516** (`security@wordfence.com`, **9.8**, `Deferred`) — an authentication bypass in "Bot for Telegram on WooCommerce" through **1.3.0** where a public REST endpoint skips webhook signature verification, accepts a forged update whose `message.chat.id` is the target's username, and a predictable login token then sets an auth cookie for any account including administrator — and **CVE-2026-42922** (`talos-cna@cisco.com`, **9.8**, `Deferred`), an authorization bypass in **FUXA 1.3.2-2809**'s `/nodered` path reachable unauthenticated to arbitrary code execution. Three Criticals, three different CNA scorers, three records NVD has deferred.

[`🔗 CVE-2026-113617 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-113617) · [`🔗 CVE-2026-109516 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-109516) · [`🔗 CVE-2026-42922 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-42922)

---

## 16. "AI isn't replacing SREs, it's deskilling them" — and the evidence is borrowed from endoscopy and aviation

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 363+ pts · ~1 day ago (~2026-10-30)
- **Tags:** `sre` `automation` `labor` `analysis`

A SigNoz newsletter essay argues that the nearer-term AI risk to SREs is not replacement but **skill erosion**, built on Bainbridge's 1983 "Ironies of Automation": automating routine work leaves people passively monitoring, then facing rare crises without enough practice. In SRE terms, AI increasingly handles alert grouping, runbooks, known-issue remediation, log anomalies and first-pass root-cause suggestions, so humans are left with novel cascading incidents — where intuition matters most — while getting fewer chances to build it. The author names the junior version **"never-skilling."**

**The supporting numbers are all from other fields.** A medical study found endoscopists' unassisted polyp detection fell from **28% to 22%** after AI assistance; aviation research found autopilot-heavy pilots losing situational awareness and manual flying proficiency, leading the FAA to require more manual flying. PagerDuty's tiered model is cited — known failures automated, partial problems get AI recommendations plus human validation, novel cascading failures stay human-led.

**Why it matters:** The essay's own structure is the caveat: there is no SRE-specific study behind it, the evidence is analogical, the "95%" premise is hypothetical, and the PagerDuty framework is a vendor's. As a SigNoz post it also has a commercial interest in observability-native AI. None of that voids the argument — "human-in-the-loop, not human-on-the-side" is a real design constraint, and routing a fraction of incidents to humans on purpose is the cheap intervention — but the honest citation is a plausible mechanism with borrowed evidence, not a measured effect.

[`🔗 SigNoz — AI isn't replacing SREs, it's deskilling them`](https://newsletter.signoz.io/p/ai-isnt-replacing-sres-its-deskilling) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=50305693)

---

## 17. GitHub's Actions, Pages and Webhooks degraded for 90 minutes — 17:50 to 19:23 UTC

- **Velocity:** ▮ steady
- **Source:** githubstatus.com · incident 2026-10-30
- **Tags:** `github` `outage` `ci`

GitHub opened an investigation at **17:50 UTC on 2026-10-30** for "degraded performance" in **Actions and Webhooks**, with **Pages** following at **18:00**. By **18:06** the impact was concrete: delays to Actions workflows, Pages deployments and webhook events, plus errors in **code search and live updates**. Mitigation began with early signs of recovery, all affected services recovered by **18:32**, and the incident was resolved at **19:23** with a detailed root-cause analysis promised.

**Why it matters:** The blast radius is the dependency graph — Actions is where most OSS CI runs, Pages is where a lot of documentation lives, and webhooks are how every integration learns something changed, so a 90-minute degradation stalls releases and deploy pipelines that have no idea they depend on it. No data loss or security component is reported; treat the resolution as service restoration and wait for the RCA before drawing conclusions about cause.

[`🔗 GitHub — incident`](https://www.githubstatus.com/incidents/pwxsjgnvrk6b) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=50307723)

---

## 18. DeepSeek-V4.1-Flash-1017 resurfaces at #1 on Hugging Face — 763B, 1M context, MIT, and a citation about KV-cache compression

- **Velocity:** ▮ steady
- **Source:** Hugging Face Trending · 146k downloads · 3.99k likes
- **Tags:** `deepseek` `open-weights` `moe` `context`

**`deepseek-ai/DeepSeek-V4.1-Flash-1017`** is the top trending model on Hugging Face this morning with **146k downloads** and **3.99k likes**, but it is not a new release — the model card describes it as a **"minor update"** to DeepSeek-V4.1-Flash, and the collection shows it last updated **14 days ago**. It is image-text-to-text at **763B parameters** in 8-bit / FP8, **MIT** licensed, with a **1M-token context window** and `max_tokens` of at least **256K**, supporting interleaved images, thinking mode, tool calling, numeric reasoning effort and mid-conversation system messages. Reported scores include **HLE 42.6 without tools** (44.0 text-only), **Terminal-Bench 4.0 42.3**, **DeepSWE v1.1 77.0**, **NL2Repo-Bench 68.2**, **Agents' Last Exam 35.4** and **ZeroBench-main 51.0 with tools**. The citation title points at "Pushing the Limits of KV Cache Compression."

**Why it matters:** The trending spike is a distribution event, not a capability one, and the feed should say so — the version string's `-1017` is a date stamp, not a novelty claim. Two practical notes from the card: **no Jinja chat template ships with the release**, so prompt encoding needs a Python reference implementation or the `deepseek-recipe` libraries, which breaks naive serving configs; and the benchmarks are publisher-reported, several run with tools or on subsets, so they are not cross-comparable with harness-free numbers elsewhere in this feed.

[`🔗 deepseek-ai/DeepSeek-V4.1-Flash-1017`](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017) · [`🔗 Hugging Face trending`](https://huggingface.co/models?sort=trending)

---

## 19. Taste-skill trends at 106k stars for art direction — one skill, and the rest moved out

- **Velocity:** ▮ steady
- **Source:** GitHub Trending (weekly) · +4,359 this week · 106,235 total
- **Tags:** `agent-skills` `design` `mit`

**`Leonxlnx/taste-skill`** is an agent skill that supplies **art direction**, openly licensed reference images and browser-based checks so coding agents produce designed pages and dashboard screens instead of generic layouts. It carries **106,235 stars**, **254 commits** and an **MIT** license, and it now contains **one active skill** — `design-taste-frontend` — because the author moved the other skills into separate repositories.

**Why it matters:** This is the third large agent-skill repo in two weeks to concentrate on *aesthetic* judgement rather than code generation, and the consolidation into one skill is the interesting signal: the value is in the reference set and the browser check (does the result actually look like the reference), not in the number of prompts, which is the same lesson the design-skill wave produced before it. 106k stars for a single skill file is a measure of demand for taste as a commodity, not evidence that the file works — and the README makes no benchmark claim that would settle it.

[`🔗 Leonxlnx/taste-skill`](https://github.com/Leonxlnx/taste-skill) · [`🔗 GitHub Trending (weekly)`](https://github.com/trending?since=weekly)

---

## 20. The IRS forms project checks its own arithmetic and publishes where it fails — 68.6% filer coverage, 148 of 157 refusal gates unmeasured

- **Velocity:** ▮ steady
- **Source:** Hacker News (Show HN) · 80+ pts · ~2 days ago (~2026-10-29)
- **Tags:** `verification` `lean` `tax` `open-source`

**`emmilco/us-tax-model`** encodes US federal individual income tax forms and instructions as public, cited, machine-checkable data — **124 stars, 10 forks**, code under **Apache-2.0**, data under **CC0**. Forms are YAML files whose every line carries an expression from a closed vocabulary of roughly twenty atoms (`sum`, `smaller_of`, `table_lookup`, …) with no user-defined functions, loops or recursion, plus citations to archived sources including page hashes. Money is integer cents evaluated with `BigInt`, so there is no floating point anywhere. A build-time checker validates references, acyclicity, types, exhaustive guarded choices and provenance, and a renderer emits readable English for every line. Under `lean/TaxFormalization/`, the atoms are defined over integers, properties such as `subtractFloor0_nonneg` and `roundHalfUpToUnit_idem` are proved, and a reference evaluator over canonical JSON is proved terminating and deterministic. It cross-checks against **PolicyEngine-US**, **Tax-Calculator** and **OpenTaxSolver**, and it "never files, signs or transmits a return."

**Why it matters:** The limitations section is the reason to trust the rest of it. A citation "proves a line points at a page, not that it was read correctly"; a type-correct wrong operand still passes; evaluator agreement does not establish the data matches IRS text, and **BUG-0001** is their own case where both evaluators agreed on a wrong sum; the two evaluators "read the same files, so agreement shows the evaluators agree, not that the data is right"; the scoreboard credits outside-family assertions for **198 of 1,515** computed lines (**13.1%**); and measured filer coverage is **68.6%** while **148 of 157 refusal gates are unmeasured**, so true coverage is lower. Forms and instructions are not law, ambiguities are recorded rather than resolved, and no lawyer has reviewed the project's legal position. That is what a verification project looks like when it is honest about which claims are proved and which are merely checked.

[`🔗 emmilco/us-tax-model`](https://github.com/emmilco/us-tax-model) · [`🔗 Hacker News (Show HN)`](https://news.ycombinator.com/item?id=50278678)

---

## 21. Anthropic's Claude found a zero-click root RCE in the Linux kernel — 48 minutes to leak KASLR, and Akamai is now advising its customers

- **Velocity:** ▮▮▮ trending
- **Source:** Anthropic Frontier Red Team · published 2026-10-27 · CVE record 2026-10-15
- **Tags:** `cve` `linux-kernel` `rce` `anthropic` `mptcp`

**CVE-2026-98432** is a race-condition use-after-free in the kernel's IPv4 TCP path, and the write-up is Anthropic's: the Frontier Red Team says an internal research model wrote a full exploit chain that reaches root on a server exposing a **Multipath TCP listener**, with no credentials and no user interaction. The record is the Linux kernel CNA's (assigner `Linux`, `PUBLISHED` **2026-10-15T12:08Z**, reserved **2026-09-25**), carries **one** metric — `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H` = **9.8** — and **no CWE at all** (`problemTypes` is `null` in the CNA container, so the absence is a statement about the CNA's own field, not about NVD's parse). NVD's copy is at **`Received`**, last modified **2026-10-30T16:18Z**.

The bug is the one the kernel commit names: `ipv4: free inet_opt and ireq_opt after an RCU grace period`. `tcp_v4_syn_recv_sock()` transfers ownership of `ireq->ireq_opt` to the child socket without copying it; another CPU handling a **retransmitted SYN** sends a SYNACK from `tcp_check_req()`, reading the same options under `rcu_read_lock()` only; `inet_sock_destruct()` frees `inet_opt` with a plain `kfree()` rather than `kfree_rcu()`, so `ip_options_build()` can read a freed object. The CNA's own `AV:N` justification (written in the metric's `scenarios[]` field, not in the description) is precise about the prerequisite — an unauthenticated peer supplies IPv4 Record Route or Timestamp bytes in a TCP SYN — and the request-socket **migration** path (`net.ipv4.tcp_migrate_req=1` or a BPF reuseport selector) is the second half — that is the path MPTCP exercises. Eight fix commits across stable branches are listed in `references[]`, all keyed as `versionType: git` from the introducing commit `079096f103fa` (the one that installed syn_recv requests into ehash).

**Why it matters:** the operational fallout is the story today, not the score. Anthropic's timeline is blunt — "it takes 48 minutes to leak a kernel pointer and another five minutes to reach the shell command execution" — and the enabling property is retry-until-success, because a lost race only drops the handshake and never crashes the box. That changes what patching means for shared hosts: **Akamai** opened a Linode customer advisory at **18:10 UTC on 2026-10-30**, said at **01:55 UTC on 10-31** that it is deploying mitigations and that "At this time, we have no evidence of this vulnerability being exploited on the Akamai Compute platform", and told customers to apply upstream OS updates. Meanwhile the **Go security team** warned that since **Go 1.24** programs enable MPTCP by default on Linux listen sockets, so a Go server can be in scope without anyone asking for it — `GODEBUG=multipathtcp=0` or `godebug multipathtcp=0` in `go.mod` exists as a stopgap, but the same post says "disabling MPTCP on a program-by-program basis is a fragile mitigation" and that "The best fix for this vulnerability is to upgrade to a patched kernel version." Read the two claims apart: Anthropic's PoC needs MPTCP; Go's warning is that the underlying bug is not MPTCP-specific and a system with no MPTCP listener may be reachable by a different route.

[`🔗 Anthropic — discovering and exploiting vulnerabilities with Claude`](https://www.anthropic.com/research/discovering-vulnerabilities-with-claude) · [`🔗 oss-security — protecting Go programs against CVE-2026-98432`](https://www.openwall.com/lists/oss-security/2026/10/30/1) · [`🔗 Akamai/Linode — customer security advisory`](https://status.linode.com/incidents/nt58zhx3pmgm) · [`🔗 CVE-2026-98432 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-98432)

---

## 22. LXD's mutual TLS trusted every certificate in the chain — 10.0, and any trusted user's public cert was enough

- **Velocity:** ▮▮▮ trending
- **Source:** Ubuntu Discourse · advisory 2026-10-28 · CVE published 2026-10-30
- **Tags:** `cve` `lxd` `tls` `auth-bypass` `canonical`

**CVE-2026-112816** is an authentication bypass in **LXD** (and **MicroCloud**): the daemon's mutual-TLS check "compared all peer certificates sent by the client to known trust store entries", so an attacker who can reach the HTTPS API and holds **someone else's public client certificate** can authenticate as that identity by placing it as an **intermediary** certificate in their own chain. Canonical's advisory states the mechanism in one line — "only the leaf certificate proves ownership of the signing key" — and the impact: "The vulnerability allows an attacker that is able to reach the LXD HTTPS API to authenticate as any trusted TLS client, for which the attacker has the public certificate." Depending on the victim's privilege that is **root on the host**, since an admin client can drive the daemon. In MicroCloud the shape is worse: an attacker can "intercept the public TLS certificate of a joining cluster member" and then authenticate as that member.

Canonical says the bug "was referred to us from the Incus project", credits `stgraber`, and shipped fixes on **2026-10-29** across four LXD channels and two MicroCloud channels — **6.10.1**, **5.21.9**, **5.0.11**, **4.0.15**, **microcloud 2.1.5** and **3.4.1** — applied with `snap refresh lxd` / `snap refresh microcloud`, with the point releases still rolling from `candidate` to `stable`. The CVE container (assigner **canonical**, `PUBLISHED` **2026-10-30T16:42Z**) carries **CVSS 4.0 at 10.0** from `security@ubuntu.com` — `AV:N/AC:L/AT:N/PR:N/UI:N` with all three impacts High in both the vulnerable and subsequent systems — plus **CWE-295**, and four affected ranges written as semver (`4.0.14 < 4.0.15`, `5.0.10 < 5.0.11`, `5.21.8 < 5.21.9`, `6.9.0 < 6.10.1`). NVD's copy is **`Deferred`** and carries no metric of its own.

**Why it matters:** this is the rare 10.0 whose cause is a **comparison over the wrong set** rather than a memory bug or a missing check — every certificate in a client-supplied chain was matched against the trust store, so the trust store's contents become signable credentials. It also gives you a clean field-level caveat: the advisory's fix table covers **six** snap versions across **two** products, while the CVE record's `affected[]` names **one** product (LXD) and four ranges — MicroCloud's 2.1.5 and 3.4.1 exist only on the prose page, so a reader who trusts the machine-readable record alone cannot tell that MicroCloud is in scope. Anyone running LXD as a privileged management plane should treat the public half of every client certificate as a leaked credential until patched, and re-check which channel a given snap is actually tracking, because "latest" and "stable" are not the same thing during a progressive rollout.

[`🔗 Ubuntu Discourse — Canonical LXD and MicroCloud advisory`](https://discourse.ubuntu.com/t/security-advisory-critical-vulnerability-found-in-canonical-lxd-and-microcloud/90557) · [`🔗 CVE-2026-112816 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-112816) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=50310937)

---

## 23. Seven of 305 code GGUF tags in the official Ollama library solve almost nothing — and they match an uncalibrated rebuild tensor for tensor

- **Velocity:** ▮▮▮ trending
- **Source:** arXiv · 2609.05881 (v3) · code and audit data released
- **Tags:** `quantization` `gguf` `reproducibility` `benchmark` `research`

"**Broken on Arrival: Non-Functional Quantized LLM Artifacts in Public Model Registries and How to Catch Them**" (arXiv **2609.05881**, Aditi Patodiya) tests **all 305 eligible code-capable GGUF tags** across **15 model lines** in the official Ollama library plus **22** popular Hugging Face community files, screening with 15 code tasks and retesting suspects on all **164 HumanEval+** tasks. **Seven official tags (2.3%) solved at most six of them** — all low-bit quantizations of models with at most **four billion** parameters. The paper's own control is the finding: five suspects rebuilt from the original weights "matched our uncalibrated rebuilds tensor for tensor, so none was corrupted", followed by the line worth quoting, "**Exact reproducibility did not imply function.**"

The mechanism is calibration, not bit-width alone. With weights, toolchain and tensor mix held fixed, adding an **importance matrix** raised `Qwen2.5-Coder-3B` at three quantization levels **from zero to 76–113 of 164 tasks**; the same uncalibrated recipe left the smaller `Qwen2.5-Coder-1.5B` working, which is why the paper says the recipe alone does not predict failure. On the other side, "None of 66 sampled tags that passed the screen was non-functional" — so the cheap screen is not producing false alarms in the sample. **v3** of the paper revises one earlier diagnosis: a community `deepseek-coder-6.7B` file pair fails for **lack of a chat template**, not by backend, and the release adds a test for it.

**Why it matters:** registries publish downloads and likes, not functional tests, and every "runs on a laptop" recommendation inherits that gap — the artifact you downloaded can be byte-identical to what the publisher built and still score zero. Two operational consequences: for **≤4B models at low bit-width**, run a task-level smoke test before trusting the tag, not a checksum; and when a tag fails, the fix is often to **switch to a calibrated quantization** of the same model rather than to suspect corruption. The audit data and a `quantcheck` tool ship with the paper, so the screen is reproducible; what is not yet established is how the failure rate scales above 15 model lines or on non-code tasks, which the study does not test.

[`🔗 arXiv 2609.05881`](https://arxiv.org/abs/2609.05881) · [`🔗 Hugging Face — daily papers`](https://huggingface.co/papers)

---

## 24. pgAdmin's `\copy` guard checked one quoting dialect and psql parses another — 9.9, and it is a bypass of June's fix

- **Velocity:** ▮▮ rising
- **Source:** NVD / cveawg · CVE published 2026-10-30T20:17Z · assigner PostgreSQL
- **Tags:** `cve` `pgadmin` `postgresql` `command-injection`

**CVE-2026-116241** is a command injection in pgAdmin 4's **Import/Export Data** tool: pgAdmin wraps a user's query export in a `psql \copy (...) TO` command and checks the query's parentheses are balanced so nothing can escape the wrapper. The check "rejected a backslash inside a single-quoted string but not inside a double-quoted identifier, where it treated the next double quote as closing the identifier" — while psql's `\copy` parser "applies the connection's escape character to whichever quote opened a token", so with `standard_conforming_strings` off a backslash-escaped double quote does **not** close the identifier. Two parsers, two beliefs about where a string ends; the attacker sets the session variable.

The record is assigned by **PostgreSQL** (`PUBLISHED`, **2026-10-30T20:17Z**) with **two** metrics from the CNA — `CVSS:3.1/…/PR:L/UI:N/S:C/…` = **9.9** and a CVSS 4.0 vector at **9.4** — plus **two** weaknesses, **CWE-78** and **CWE-115** (misinterpretation of input), and the CNA's own note that this is a bypass of the fix for **CVE-2026-17566**, inheriting its threat model and `S:C` rationale. NVD's copy is at **`Received`** and carries no `nvd@nist.gov` metric. The affected range is written as `{version: "0", lessThan: "9.19"}`.

**Why it matters:** the fix predates the record by a week and the artefact by a day — commit **`9be31a0`** is dated **2026-10-23T18:47Z**, and pgAdmin **9.19** was uploaded to PyPI on **2026-10-29T15:36Z** — while the tracking issue **#10663** is still **open** with the body "Internal tracking: pending fix for 9.19" and "Details will be published with the pgAdmin 4 9.19 release notes", so the disclosure order is commit → release → record → notes. The repo's tag feed still shows `REL-9_18` (2026-09-17), so "is it fixed" has to be answered from PyPI, not from tags. The transferable lesson is the bug class: a sanitizer is only as correct as its model of the **consumer's** grammar, and any parse that depends on a session setting (`standard_conforming_strings`) the caller can flip is a sanitizer that can be turned off from the other side.

[`🔗 CVE-2026-116241 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-116241) · [`🔗 pgAdmin commit 9be31a0`](https://github.com/pgadmin-org/pgadmin4/commit/9be31a019f780647fb689c458408c8803263c812) · [`🔗 pgAdmin issue #10663`](https://github.com/pgadmin-org/pgadmin4/issues/10663)

---

## 25. A WordPress cache plugin is a 10.0 with no official patch — reported in September, in NVD on October 29

- **Velocity:** ▮▮ rising
- **Source:** Patchstack · published 2026-10-13 · NVD record 2026-10-29
- **Tags:** `cve` `wordpress` `rce` `unpatched` `patchstack`

**CVE-2026-61991** is an unauthenticated remote code execution in the WordPress plugin **AjaxLoadMore Cache** at or below **3.1.1**, classified **CWE-94** (code injection) by the assigner **Patchstack**. The Patchstack entry is unusually bare and unusually direct about the remediation state: the patched-version cell reads "**No official patch available**", the entry carries "No VDP", the required privilege is **unauthenticated**, and the CVSS is **10**. The plugin's own distribution page is the place to check whether that is still true, because "no patch" is a perishable state.

The timeline is the part worth reading: reported by **Julieta** on **2026-09-12**, published by Patchstack on **2026-10-13**, and only entering NVD on **2026-10-29T16:18Z** — **47 days** from report to record, **16** of them with a public exploit description and no code fix. NVD's copy is **`Deferred`**, carries exactly one metric (`CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H` = **10.0**, source `audit@patchstack.com`, `Secondary`), and no `nvd@nist.gov` metric at all — so the 10.0 is the finder's number, re-served by NVD, on a record NVD has said it will not analyse.

**Why it matters:** a 10.0 with no patch has only two honest remedies — remove the plugin, or virtual-patch it — and Patchstack's own mitigation is the second: "Patchstack has issued a mitigation rule to block any attacks until an official patch becomes available." That sentence is a vendor's product offering, not a fix, and it works only behind their WAF. The scoring detail matters too: `S:C` on a `PR:N` code-injection is what makes it 10.0 rather than 9.8, and here it is defensible, because code execution in a plugin runs in the scope of the whole WordPress install and its database. What the record cannot tell you is whether the plugin is still installed anywhere that matters — that is a version-presence question, and it belongs in an inventory, not in a CVE feed.

[`🔗 Patchstack — AjaxLoadMore Cache advisory`](https://patchstack.com/database/wordpress/plugin/ajax-load-more-cache/vulnerability/wordpress-ajaxloadmore-cache-plugin-3-1-1-remote-code-execution-rce-vulnerability) · [`🔗 CVE-2026-61991 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-61991)

---

## 26. Progress shipped two WS_FTP fixes three months apart — and the 10.0 is the one that hands over administrative credentials

- **Velocity:** ▮▮ rising
- **Source:** NVD · published 2026-10-29T16:19Z · both `Awaiting Analysis`
- **Tags:** `cve` `ws-ftp` `progress` `credentials` `rce`

Two Progress **WS_FTP Server** records landed in the same minute on **2026-10-29**, both Windows, both scored by `security@progress.com`, both still `Awaiting Analysis` at NVD. **CVE-2026-84295** is **CWE-287** improper authentication — "an unauthenticated remote attacker to access sensitive information, including administrative credentials" — in versions prior to **2024.0.6** and **2025.0.3**; its vector is `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H` = **10.0**. **CVE-2026-90868** is **CWE-78** OS command injection, `PR:L`, "under certain configurations", in versions prior to **2024.0.7** and **2025.0.4**, at **9.9**. The CNA's container adds **CWE-522** (insufficiently protected credentials) beside CWE-287 on the first one.

**The two fix levels are the interesting part.** The authentication bug is fixed at `2024.0.6` / `2025.0.3`; the command-injection bug is fixed at `2024.0.7` / `2025.0.4`. An operator who applied the advisory's first fix and stopped is running a build that still contains the second bug — and a file-transfer server is exactly the class of host where "administrative credentials" plus "arbitrary command execution" is a single chain rather than two findings. The only reference on either record is a `progress.lightning.force.com` Knowledge article that redirects to a SAML login, so on this pass the vendor's own patch guidance could not be read: treat the version numbers as the record's claim rather than the advisory's, and confirm them against the vendor's page from an authenticated session.

**Why it matters:** `S:C` on a `PR:N` authentication bypass is the pattern that has produced most of this month's 10.0s, and it is correct here — the credential store is outside the vulnerable component, so the impact crosses a security authority. The practical instruction is version arithmetic, not triage: `2025.0.3` is *not* the fixed release for the RCE, and the naming (`2024.0.x` and `2025.0.x` on parallel lines) makes it easy to stop one increment early. Neither record is KEV-listed and neither has an NVD-authored score, so nothing here claims exploitation — it is a patch-ahead-of-use item, and the missing NVD analysis is why the record's own CWEs are worth quoting with their source.

[`🔗 CVE-2026-84295 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-84295) · [`🔗 CVE-2026-90868 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-90868)

---

## 27. Same tools, two interfaces: MCP and CLI diverge on 94.3% of paired trajectories — and a repair layer gains up to 9 points

- **Velocity:** ▮▮ rising
- **Source:** arXiv · 2610.34298 · 2026-10-25
- **Tags:** `mcp` `agents` `tool-use` `benchmark` `research`

"**Matched Capabilities, Different Behaviors: A Controlled Study of MCP and CLI Interfaces for Language Agents**" (arXiv **2610.34298**; Zhenning Shi, Liang Pang, Yongqi Li) builds **MICA** — Matched Interface Comparison and Analysis — which renders MCP and CLI from a **shared semantic action contract** and routes decoded actions through the **same runtime**, so capability, environment and execution are held fixed and only the model-facing representation changes. Across **six models** and **three interactive environments**, matched interfaces produce "substantial differences in task performance and interaction cost", and paired natural trajectories show structured divergence in **94.3% of 2,004 episodes**, with early differences propagating through subsequent interaction.

The repair half is **DART** — Decoupled Action Realization and Targeted Repair — which "preserves validated semantic commitments while repairing interface-specific realization". It improves benchmark score in **all six** evaluated settings by up to **9.0 points** and reduces MCP token cost in **all three** environments by up to **27.1k tokens per task**.

**Why it matters:** the paper's claim is narrow and that is what makes it usable — it does not say MCP is better or worse than a CLI, it says the choice of interface is a **confounder** in every agent benchmark and every "tool use" comparison, and that matched-state probes can localize whether a failure came from capability presentation, realization, or feedback. The cost number is the operational one: a 27.1k-token gap per task on the same semantic work is a budget line, not a style preference. Two caveats the abstract leaves open: the six models and three environments are not named there, and the 9.0-point gain is an upper bound across settings rather than a mean — read the tables before quoting it as typical.

[`🔗 arXiv 2610.34298`](https://arxiv.org/abs/2610.34298) · [`🔗 Hugging Face — daily papers`](https://huggingface.co/papers)

---

## 28. Multi-token prediction's gradient is half self-distillation and half noise — removing the noise is a one-line change

- **Velocity:** ▮▮ rising
- **Source:** arXiv · 2610.38331 · preprint
- **Tags:** `training` `mtp` `speculative-decoding` `research`

"**Multi-Token Prediction Done Right**" (arXiv **2610.38331**, Jayden Teoh) decomposes the MTP cross-entropy gradient exactly into a **KL self-distillation term** that pulls each MTP head toward the model's own next-token distribution — which is what makes speculative decoding faster — and a **residual** with a low signal-to-noise ratio that "buries the useful KL signal", increasingly so with scale. The proposed fix exploits a fact about tied heads: when two distributions share a linear output head, the gradient of their KL divergence can be recovered exactly from the two cross-entropy gradients via straight-through routing, so **Soft-MTP** backpropagates only the KL term while reusing the existing NTP and MTP cross-entropy computations — one line of code, no new parameters, no vocabulary-sized logit matrices, no measurable overhead, and compatible with fused cross-entropy kernels.

The reported results span **167M to 1.2B parameters**: lower NTP perplexity, faster speculative decoding and higher zero-shot accuracy than standard MTP at every scale; lower MTP perplexity from **689M** onward; stronger math and code reasoning after fine-tuning at 1.2B; and parity-to-better against direct KL minimization on most metrics. Both DeepSeek- and Meta-style MTP layouts are supported.

**Why it matters:** MTP is now a standard pre-training ingredient precisely because it is cheap, and this paper's argument is that part of what the cheap version learns is noise — the kind of finding that changes a training recipe without changing a model. Treat it as a strong hypothesis rather than a settled result: this is a single-author preprint, the largest scale tested is 1.2B — well under where the paper says the residual gets worse — and "no measurable overhead" is an implementation claim about fused kernels that has to be re-measured on another stack. The right next test is the one the paper does not run: does the advantage survive at the scale where standard MTP is actually deployed.

[`🔗 arXiv 2610.38331`](https://arxiv.org/abs/2610.38331) · [`🔗 Hugging Face — daily papers`](https://huggingface.co/papers)

---

## 29. Baidu's Unlimited-OCR-2 bounds the working set instead of the window — and its SOTA table is an image

- **Velocity:** ▮▮ rising
- **Source:** Hugging Face · baidu/Unlimited-OCR-2 · released 2026-10-27
- **Tags:** `ocr` `vision-language` `long-context` `mit` `baidu`

**`baidu/Unlimited-OCR-2`** is an **MIT**-licensed image-text-to-text model released **2026-10-27**, with **24,276 downloads** and **457 likes** on the Hub, and it ships beside a new dataset, **MarathonDocBench**, for "ultra-long document parsing". The mechanism is **SR-SWA**, sparse reference sliding-window attention: the model "compresses text-visual attention interactions from ultra-long sequences down to a fixed-size set of working references (e.g., 512 tokens)", which bounds compute so that "per-step decoding latency and memory footprint nearly constant regardless of document length". Multi-page parsing is a single request — the prompt is `"<PAGE><image>" * num_pages + "Multi page parsing."` — so cross-page context is available and every page emits one `<PAGE>` marker in order.

**Why it matters:** "unlimited" is a claim about the **working set**, not about an unbounded context window, and the card is honest at the level of mechanism while being opaque at the level of numbers: the SOTA sentence says it "Achieves state-of-the-art performance across both dozens-of-pages benchmarks (e.g. MPDocBench) and extreme hundred-page benchmarks (e.g. MarathonDocBench)", and the actual leaderboard is a **PNG** (`assets/leaderboard.png`), so no figure in it can be quoted or checked without an OCR pass. The most useful part of the release is the serving appendix: a custom SGLang wheel, a page-window scheduler that reuses the previous window's KV tail, `--mem-fraction-static 0.7` because 0.75 OOMs past 32 concurrent requests, and the explicit trade-off that a smaller page window lowers peak memory but loses cross-page merging at window boundaries. That is what "unlimited" costs in practice — a tunable window plus a memory budget — and it is stated more clearly here than in most long-context releases.

[`🔗 baidu/Unlimited-OCR-2`](https://huggingface.co/baidu/Unlimited-OCR-2) · [`🔗 baidu/Unlimited-OCR`](https://github.com/baidu/Unlimited-OCR) · [`🔗 Hugging Face — trending`](https://huggingface.co/models)

---

## 30. Firezone replaced two years of patching boringtun with a sans-IO WireGuard — and its 45× is a ratio, not a measurement

- **Velocity:** ▮▮ rising
- **Source:** Firezone blog · 2026-10-31 · firezone/sanstun
- **Tags:** `wireguard` `rust` `networking` `sans-io` `apache`

**`firezone/sanstun`** (Apache-2.0, created **2026-10-02**, 37 stars) is a sans-IO Rust implementation of the WireGuard state machine, announced today by Thomas Eizinger. The premise is that IO, **time and randomness** all move out of the library: the only public entry point that parses a datagram is `Interface::receive`, which applies rate limits, generates cookie replies and returns a typed message; the constructors for `HandshakeInitiation` and friends are **crate-private**, so a caller cannot reach `Tunnel::handle_handshake_initiation` without having passed the rate limiter first. That is a protocol invariant enforced by the type system rather than by documentation — and the post's argument is that forgetting the limiter is exactly the bug that would never show up under normal operation.

The performance design is the second half. `Tunnel::begin_encapsulate` does **not** encrypt: it checks the session, reserves a packet counter, advances timers and returns a `PendingEncapsulate` that implements `Send`, so ChaCha20-Poly1305 work can move to a worker thread while counter bookkeeping stays on the owner thread. The published `cargo bench data_path` numbers make the split visible: `begin_encapsulate` **20.8 ns** at both 64 B and 1280 B, `encrypt` **226 ns** at 64 B and **933 ns** at 1280 B, `begin_decapsulate` **37.6 ns**, `commit_decapsulate` **17.5 ns**.

**Why it matters:** the headline number the post offers has its own disclaimer attached — "If we move the actual encryption to another thread, this hints at a potential speedup of more than 45x!" is immediately followed by "An effective speedup of 45x is hard to achieve in practice because it ignores the cost of passing `PendingEncapsulate` to another thread and assumes no other overhead is introduced." So 45× is bookkeeping-versus-crypto at 1280 B, not a throughput result, and the honest reading is that the benchmark shows the bookkeeping is **2%** of the work at MTU-sized packets. The other thing worth noting is the project's own history: Firezone patched its `boringtun` fork for more than two years — "more than 70 PRs" excluding dependency bumps — before concluding that API compatibility with upstream was the constraint, which is a more useful argument for rewriting a protocol library than any microbenchmark.

[`🔗 Firezone — introducing sanstun`](https://www.firezone.dev/blog/introducing-sanstun) · [`🔗 firezone/sanstun`](https://github.com/firezone/sanstun)

---

## 31. Anthropic's `skills` repo is at 185k stars with no top-level licence — the licence is per folder, and four of them are not open source

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending (weekly) · +1,888 this week · 185,417 total
- **Tags:** `agent-skills` `anthropic` `licensing` `mit`

**`anthropics/skills`** — "Public repository for Agent Skills" — is trending again this week with **+1,888 stars** (**295** today, **185,417** total, **21,904** forks, **1,450** open issues), last pushed **2026-10-28**. The tree is small and load-bearing: `skills/` with **19** skill folders — counted from the directory listing, no page states a total — plus `spec/`, `template/` and `.claude-plugin/`, and **no `LICENSE` file at the root** (the path 404s) — the only licence-adjacent file at top level is `THIRD_PARTY_NOTICES.md`.

The licence is inside the README and it is **two licences in one repo**: "Many skills in this repo are open source (Apache 2.0). We've also included the document creation & editing skills that power Claude's document capabilities … in the `skills/docx`, `skills/pdf`, `skills/pptx`, and `skills/xlsx` subfolders" — and of those, "These are **source-available, not open source**", shared "as a reference for more complex skills that are actively used in a production AI application." The README also carries a disclaimer that the skills are "provided for demonstration and educational purposes only" and that "the implementations and behaviors you receive from Claude may differ from what is shown".

**Why it matters:** this is the repository a large fraction of the agent-skills ecosystem is copying from, and the thing being copied is not uniformly licensed — four of nineteen folders are reference material you can read but not reuse, and a repo-level "public" badge does not distinguish them. If you vendor skills into a product, enumerate per folder rather than per repo, and treat the README's own "may differ" clause as the vendor saying the shipped behaviour is not this code. The raw counts are also a reminder to use the right unit: **1,450** is issues **plus** pull requests on this repo, not 1,450 open issues.

[`🔗 anthropics/skills`](https://github.com/anthropics/skills) · [`🔗 GitHub Trending (weekly)`](https://github.com/trending?since=weekly)

---

## 32. Context is not free even when it is cached — prefill energy grows quadratically with input length

- **Velocity:** ▮ steady
- **Source:** arXiv · 2610.39621 · 2026-10-30
- **Tags:** `energy` `prefill` `agents` `long-context` `research`

"**The Real Cost of Context: Predicting Compute Time and Energy Consumption in LLM Prefill and Decode Phases**" (arXiv **2610.39621**; Lars Krupp, Daniel Geißler, Francisco M. Calatrava-Nicolas, Stefan Gerd Fritsch, Paul Lukowicz, Jakob Karolus) starts from a measurement problem: agentic architectures "substantially increased token consumption", but existing estimates count generated **output** tokens and ignore the large input contexts agents carry. The authors profile compute time and energy across a wide range of prefill and decode lengths and fit generalized linear models to the results.

The scaling is the result: **decode** compute time and energy scale **linearly** with output length, while **prefill** shows **both linear and quadratic** scaling with input length — so input context "becomes a relevant factor for large-context workloads". They also show compute time is a reliable proxy for energy consumption when direct measurement is unavailable, which is what makes the framework usable for proprietary API models.

**Why it matters:** the quadratic term is the part that changes design decisions, because it says the cost of an agent's growing history is not proportional to its size — doubling the context can cost more than twice as much, and the penalty lands in the phase everyone treats as "just reading". For anything that buys latency by sending more context rather than retrieving less, that is a direct argument for retrieval and compaction over long prompts. Two limits worth stating: the fits are per-model and per-hardware, so the coefficients do not transfer between deployments; and the claim that compute time serves as a reliable proxy for energy consumption is calibrated on the authors' own measurements, not on a vendor's metering, so it estimates a hosted model's energy rather than billing you for the tokens you actually pay for.

[`🔗 arXiv 2610.39621`](https://arxiv.org/abs/2610.39621) · [`🔗 arXiv cs.AI recent`](https://arxiv.org/list/cs.AI/recent)

---

## 33. An autonomous lab rejected its own positive result — the agents caught drift in their reference measurements and rewrote the protocol

- **Velocity:** ▮ steady
- **Source:** arXiv · 2610.40589 · 2026-10-30
- **Tags:** `ai-for-science` `agents` `self-checking` `research`

"**Collaborative AI agents for autonomous experimental research with solid-state quantum spins**" (arXiv **2610.40589**; El Mustapha Mansouri, Eikichi Kimura, Masato Koga, Keigo Arai) builds a laboratory where LLM-based agents "assess one another's work and can stop or redirect investigations" — generating and rejecting research questions, requiring separate theoretical checks, and designing experiments to challenge their own claims. The setting is ensembles of quantum spins in diamond: the agents derived the **minimum number of calibration settings** needed to predict responses to a defined family of microwave pulse sequences, checked the result computationally, and then designed experiments to distinguish between competing predictions.

Then the interesting thing happened. An initial experiment **agreed** with the theoretical predictions, and repeated reference measurements showed the **signal was drifting** during data collection. The agents "therefore treated the result as inconclusive and revised the measurement protocol without relaxing the acceptance criteria" — and the revised experiment met those criteria and supported the predictions.

**Why it matters:** confirmatory runs are cheap to produce and hard to distrust, and the capability on display here is not the derivation but the **refusal**: an agent system that discards a favourable measurement because its own control drifted is the difference between a lab notebook and a press release. The paper's own framing is what makes it citable — it opens by noting that recent AI systems "may draw conclusions that the evidence does not support", which is the failure this study is built to avoid. Read it as one system, one physics setting and one successful escalation of acceptance criteria; what is not tested is whether the same disagreement machinery still works when the agents' own theoretical claim is the thing that is wrong.

[`🔗 arXiv 2610.40589`](https://arxiv.org/abs/2610.40589) · [`🔗 arXiv cs.AI recent`](https://arxiv.org/list/cs.AI/recent)

---

## 34. Spark-X2.6-4B keeps X2.5's architecture and takes the gains from post-training — and ships the comparison as an SVG

- **Velocity:** ▮ steady
- **Source:** Hugging Face · XHToken/Spark-X2.6-4B · updated 2026-10-31
- **Tags:** `open-weights` `on-device` `agents` `apache`

**`XHToken/Spark-X2.6-4B`** is a **4B**, **Apache-2.0**, English-and-Chinese general-purpose model aimed at on-device agents, with **923 likes** and **12,515 downloads** on the Hub and a card revised today. The release note is explicit that nothing architectural changed: "Spark-X2.6-4B retains exactly the same architecture as Spark-X2.5-4B, achieving its capability gains through improved post-training." The functional addition is a **controllable thinking budget** with three levels — none, low, high — so an application can trade reasoning against latency and cost per request.

The claims are large and unsourced in text: the card says it achieves "state-of-the-art performance among similarly sized open-source models, matching or even surpassing models with approximately 9B parameters", and the benchmark section renders as a single **SVG** (`images/all_benchmark.svg`) with no table beside it. On the infrastructure side the card is unusually thorough for an on-device model — native `spark2_5` support in `llama.cpp` from build **b10828**, Ollama **0.34.1+**, MLX through the project's own `Spark-MLX-LLM`, LM Studio, and a community WebGPU/ONNX demo built on the official INT4 weights.

**Why it matters:** post-training-only gains on a fixed architecture are the cheapest kind of model improvement and the hardest to audit, because there is no new mechanism to inspect — only a table, and here the table is a picture. Treat "matches 9B models" as a positioning claim until someone re-runs it on a harness both models were evaluated on, and treat the three thinking levels as the actually shippable feature: it is the part that changes what an on-device agent can do under a fixed token budget. The distribution list is the honest signal — llama.cpp, Ollama, MLX and LM Studio support at launch means the weights are runnable today, which is more than the benchmark image can say.

[`🔗 XHToken/Spark-X2.6-4B`](https://huggingface.co/XHToken/Spark-X2.6-4B) · [`🔗 Hugging Face — trending`](https://huggingface.co/models)

---

## 35. A single training algorithm for pretraining, SFT and RL — with staged training as a special case

- **Velocity:** ▮ steady
- **Source:** arXiv · 2610.40564 · 67 pages
- **Tags:** `training` `rl` `pretraining` `research`

"**Training Foundation Models with a Single Algorithm**" (arXiv **2610.40564**; Yuda Song, Alvin Zhang, Fahim Tajwar, Daman Arora, Jeff Schneider, Daniel Khashabi, Ruslan Salakhutdinov, J. Andrew Bagnell, Aarti Singh, Andrea Zanette) argues that the algorithmic separation between pretraining, midtraining, supervised fine-tuning and RL "is not fundamental". The construction derives RL objectives as **maximum-likelihood fitting to model-generated target distributions**, which places all four stages under one likelihood-based trainer; conventional staged training then becomes "a special case", and the lifecycle reduces to choosing *which data to train on, in what proportions, and when*. They instantiate it as a system that mixes static data and RL generations inside a single trainer.

The reported result is directional rather than numeric in the abstract: across "controlled and real-world experiments", unified training "improves the accuracy-compute tradeoff and task coverage while preserving broader capabilities, and provides a stronger starting point for continual learning". The paper is **67 pages** with **31 figures** and **22 tables**, so the ablations exist — they are just not in the paragraph everyone will quote.

**Why it matters:** if the framing holds, the pipeline stops being four jobs with four owners and becomes one training loop with a data-mixing schedule, which is a much bigger organisational claim than a benchmark win — and the paper is careful to present it as groundwork for "a unified science of foundation-model training" rather than a turnkey recipe. Read the tables before the thesis: "preserving broader capabilities" is precisely the axis where staged RL usually costs something, and a single-algorithm trainer that improves target tasks while quietly eroding general capability would look identical in an abstract. The affiliation list is also worth noting for the usual reason — a result this structural needs independent reproduction, not adoption on the strength of a 67-page appendix.

[`🔗 arXiv 2610.40564`](https://arxiv.org/abs/2610.40564) · [`🔗 Hugging Face — daily papers`](https://huggingface.co/papers)

---

## 36. Scribd told the world on October 1 and its customers one at a time from October 26 — and the notice names the payment fields

- **Velocity:** ▮ steady
- **Source:** Hacker News · 60+ pts · ~1h ago (~2026-10-31T02:46Z)
- **Tags:** `incident` `breach` `notification` `scribd`

A **Tell HN** posted at **02:46 UTC on 2026-10-31** carries the notification letter a Scribd customer received on **Monday 2026-10-26**, sent "on behalf of Scribd, Inc., the parent company of **Scribd, Slideshare, Everand, and Fable**" by **Epiq**, the company's notification partner. The scope named in the letter is specific: the third party "may have accessed your email address and the following of your information: last 4 digits of your credit card and country, credit card issuer, credit card expiry date, payment history (not including credit card details)". It states there is "no evidence that this data has been misused" and directs recipients to a call centre.

Scribd's own help-centre article is dated **October 01, 2026** and says the same thing at a different resolution: an unauthorized third party "was able to gain access to our systems" and "used their access to reach other internal systems", and "For most accounts, this involved basic account information. For a smaller number of accounts, more sensitive information was involved." It says notices are being sent "in phases", that "If you haven't gotten one, it doesn't necessarily mean you weren't affected", and recommends password resets on all four brands.

**Why it matters:** the disclosure dates are the story — a public help-centre post on **October 1**, notices to individuals beginning **October 26**, and a front-page discussion on **October 31** in which commenters report receiving the same letter "a few hours ago" on October 30. A phased notification means the absence of an email is not evidence of safety, and the letter's own field list is the part to act on: card expiry, issuer and last-four plus email is a good enough set to make a convincing billing or account-recovery pretext, which is exactly why the letter's next section is about phishing. There is no CVE here and nothing to patch — the only controls are the ones on the account, and the timeline says they should have been applied a month ago.

[`🔗 Hacker News — Tell HN: Scribd Breached`](https://news.ycombinator.com/item?id=50312756) · [`🔗 Scribd — information about the recent security incident`](https://support.scribd.com/hc/en-us/articles/53787421531284)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-10-31T04:19:32Z |
| Items | 36 |
| Sources tracked | 23 (Hacker News, GitHub, arXiv, Hugging Face, CISA KEV, NVD, cveawg, CISA-ADP, Google Research, OpenAI, Anthropic, Volexity, Ubuntu Discourse, Patchstack, Firezone, Akamai/Linode, Go Security, bunny.net, Northflank, GitHub Status, SigNoz, Tangled, TNW) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[Previous day](2026-10-30.md) · [Raw .md](https://trending.md/en/feed/2026-10-31.md) · [Archive](../archive/)
