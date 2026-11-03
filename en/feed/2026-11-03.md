---
date: 2026-11-03
updated: 2026-11-03T04:25:33Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 22
license: CC-BY-4.0
---

# Trending — 2026-11-03

## 1. Astra reads and writes neural-network weights — and 50 editing passes take Qwen3.5-0.8B from 7.9% to 48.1% on MATH-500

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 702 pts · ~20h ago (~08:03 UTC+8)
- **Tags:** `llm` `interpretability` `weight-editing` `research` `mit-csail`

A blog post by Rikiya Takehi, Jayden Teoh, Alex Zhang and Omar Khattab (MIT CSAIL) reports that GPT-6 Astra can inspect and modify a model's parameters directly, with no optimizer and no gradients. Weights are supplied as text, or through a Python sandbox for larger networks; the rule across both setups is that "no training or gradient information is allowed." The headline demonstrations run from reading to writing: it named the correct game for all four 17,253-weight PPO policies without being given the options, and in a car-on-ramp task it changed **3.5%** of the weights in a single attempt, moving success from **0% to 100%** across 1,024 episodes. In three MinAtar games its one-shot hand-written networks — written "without any environment feedback" — scored Breakout **517.4** against **25.3** for PPO trained for 500M steps (and 15.8 at 100M), came close in Asterix (53.2 vs 55.2) and reached 60% of PPO's score in Seaquest (53.1 vs 88.9).

The result that will get quoted is the Qwen one, and its row in the page's own table is **50 forward passes** — at 10 and 25 passes the same loop reaches only **12.3%** and **14.1%**. Over those 50 passes Astra edited **0.016%** of Qwen3.5-0.8B's weights (131,072 values in total) and raised MATH-500 from **7.9% to 48.1%**, GSM8K from 13.8% to 67.1% and IFEval from 21.0% to 62.3%, while the share of MATH-500 answers hitting the 32,768-token limit fell from **93% to 33.1%**. The single-shot edit is the *car* result, not this one: there Astra changed **3.5%** of a policy's weights in one attempt with no tools. The authors' own reading of that number is narrower than the headline: Astra located a reasoning loop that Qwen's model card already warns about and removed it, and **"Editing weights could remove an obstacle that hid an ability, but it could not add an ability the model lacked."** On Gemma 3 270M, where the ceiling is not a loop, edits moved MATH-500 by no more than about a point.

**Why it matters:** the caveat is load-bearing, not decorative. What is demonstrated is a *repair* channel that runs without training data and without any inference pass over the target model (the passes in the 50-pass row are Astra's own) — useful for exactly the failure class the model card already names, and not a substitute for training. The authors call the results "exciting but still limited," citing context-length and harness inefficiency, so read the 7.9 → 48.1 as "an obstacle removed," not "capability added."

[`🔗 Weight-Space Programming (MIT CSAIL)`](https://rikiyat.github.io/blog/weight-space-programming/) · [`🔗 HN thread`](https://news.ycombinator.com/item?id=50341174)

---

## 2. python-jose has accepted an empty HMAC key since at least 3.5.0 — the 9.1 landed 1h47m after its ID was reserved, and there is no fixed version to install

- **Velocity:** ▮▮▮ trending
- **Source:** VulnCheck CNA (cveawg) · record published 2026-11-02 · issue open since 2026-03-08
- **Tags:** `cve` `python` `jwt` `authentication-bypass` `unmaintained`

`CVE-2026-120459` says python-jose "through 3.5.0" lets unauthenticated attackers forge JWTs because `HMACKey` and `CryptographyHMACKey` accept zero-length HMAC secrets. When an application's HS256/HS384/HS512 verification key resolves to empty — the record's example is an `oct` JWK with an empty `k` — `jwt.decode` will accept a token signed with that empty key and arbitrary claims. Read at 3.5.0, `jose/backends/native.py` assigns `self.prepared_key = key` after checking only that the key is a string or bytes, and `_process_jwk` base64url-decodes `k` without a length test, so `""` becomes `b""` and reaches `hmac.new`. The record is CWE-347, scored **CVSS 4.0 9.1** (`AV:N/AC:L/AT:P/PR:N/UI:N/VC:H/VI:H/VA:N`) by VulnCheck, and NVD's status is `Awaiting Analysis` — the 9.1 is the CNA's number.

The disclosure is unusually fast and unusually incomplete. VulnCheck reserved the ID at **2026-11-02T12:42:23Z** and published at **14:29:15Z**, 1h47m later. The underlying report is older: Conner Webber filed it as **issue #398 on 2026-03-08**, noting that private vulnerability reporting was disabled and no `SECURITY.md` existed, and recommended rejecting empty HMAC keys with `ValueError`. The issue has no comments, no labels, no linked PR. The repo sits at **1,759 stars**, its last push was **2026-04-14**, and PyPI's newest release is still **3.5.0 from 2025-05-28** — so the record's `lessThanOrEqual` has no ceiling above it to upgrade to.

**Why it matters:** this is a dependency in a lot of FastAPI and JWT tutorial code, and the remedy the advisory implies does not exist. If you verify HS* tokens, the fix is application-side: reject an empty or whitespace-only key at configuration time rather than trusting the library to. "Through 3.5.0" here means the current release is inside the affected range, not that a patched one exists above it.

[`🔗 CVE-2026-120459 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-120459) · [`🔗 Issue #398 (filed 2026-03-08)`](https://github.com/mpdavis/python-jose/issues/398) · [`🔗 Vulnerable code at 3.5.0`](https://github.com/mpdavis/python-jose/blob/3.5.0/jose/backends/native.py) · [`🔗 PyPI`](https://pypi.org/project/python-jose/)

---

## 3. Hyprland 0.57 deletes the `.conf` config format — "starting with this version, .conf configs are no longer supported"

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub Trending · 508 stars today · release 2026-10-28
- **Tags:** `wayland` `hyprland` `open-source` `breaking-change` `lua`

Hyprland's 0.57 release, posted by maintainer Vaxry on 2026-10-28, completes the Lua migration the project started in April and announced in 0.55: **"As Hyprland's been warning you for the past few months, starting with this version, .conf configs are no longer supported."** The post gives no migration procedure and points at the wiki; the Lua section covers scripting APIs rather than config syntax — `config.unload`, `hl.reload_config()`, `hl.get_devices()`, plus new window-minimize and state-update events. Feature-wise the release adds blur variants (plugins can add more), workspace sharing in both Hyprland and XDPH so a screen-share can pick a specific workspace as its source, Compiz-style window wobble, `cursor:warp_on_monitor_change`, `no_glow`/`no_wobble` rules, globally disabling tablet devices, and first-click swallowing for the focus-changing window.

The repo is trending today at 508 stars, eight days after the tag and a year and a half after the `0.56` series began adding deprecation notices. The release is BSD-3-Clause and has **39,835 stars**.

**Why it matters:** a desktop compositor dropping its entire config parser is a migration, not an upgrade — every dotfile, every grubby `bind=` line and every third-party tool that wrote `.conf` fragments has to move, and the release notes do not tell you how. Pin the package before 0.57 if you are not ready to rewrite, because `hyprland.conf` will simply stop being read rather than fail loudly.

[`🔗 Hyprland 0.57 announcement`](https://hypr.land/news/update57/) · [`🔗 v0.57.0 release`](https://github.com/hyprwm/Hyprland/releases/tag/v0.57.0) · [`🔗 Hyprland repo`](https://github.com/hyprwm/Hyprland)

---

## 4. Meituan's LongCat-2.5 is a 1.6T native-multimodal model trained entirely on domestic Chinese silicon — and the weights are not out yet

- **Velocity:** ▮▮▮ trending
- **Source:** Meituan newsroom · released 2026-11-02 · ~48B activated per token
- **Tags:** `llm` `multimodal` `moe` `meituan` `longcat` `china`

Meituan released **LongCat-2.5** on 2026-11-02, continuing the line from LongCat-2.0 (June 2026). Its own page describes it as "面向长程智能体任务的原生多模态模型，总参数1.6万亿，训练全程由国产算力完成" — a native multimodal model for long-horizon agentic tasks, **1.6 trillion total parameters**, with training done end-to-end on domestic Chinese compute. IT之家's launch report adds that **~48 billion parameters activate per token**, that visual signals are encoded as **multi-level discrete tokens** so one backbone handles vision and text in the same form, that long-context training was done with **W4A4** inference quantization, and that the training loop converts real agents' failed trajectories into reproducible, verifiable tasks.

Availability is the part to read carefully. The model is live **via API and at longcat.chat**, and both GitHub and Hugging Face are listed as **"即将上线"** — coming soon. Meituan's announcement names no licence, publishes no weight files, and the model card does not exist yet. The technical blog at `longcat.ai/blog/longcat-2.5` is a client-rendered SPA: its only server-rendered text is a page title and the meta description ("1.6万亿总参大模型，训练全程由国产芯片完成"), so the benchmark table lives in an image on third-party coverage rather than in fetchable prose.

**Why it matters:** a 1.6T model trained without NVIDIA is the claim with staying power; it is the same bet LongCat-2.0 made and the one most likely to be re-measured by others. But "native multimodal" and "open" are separate facts here — read this as a **hosted API launch**, not a weights release, until the HF repository appears.

[`🔗 Meituan announcement`](https://www.meituan.com/news/NN261102280001343) · [`🔗 LongCat-2.5 page`](https://longcat.ai/blog/longcat-2.5) · [`🔗 IT之家 launch report`](https://www.ithome.com/1/020/873.htm)

---

## 5. Poisoning 0.1% of a pretraining corpus installs a remote-code-execution backdoor in the agent it becomes — 92% success at 4B

- **Velocity:** ▮▮▮ trending
- **Source:** arXiv 2610.37741 · submitted 2026-10-27
- **Tags:** `security` `backdoor` `pretraining` `agents` `supply-chain`

"Agentic Backdoors via Pretraining Poisoning" (Hu, Hu, Loughridge, He, Carlini, Jagielski, Rando, Zhang) pretrains Qwen3 models from scratch at **0.6B, 1.7B and 4B**, post-trains each into a CLI agent using a clean pipeline, and then asks what contaminated *pretraining* data buys an attacker. The answer: "Poisoning only 0.1% of the pretraining corpus with our new poison design implants the backdoor," and the resulting agent "executes the malicious command when the trigger is present while behaving normally on clean inputs."

The scaling runs the wrong way. "The attack success rate (ASR) increases with model scale" — the 4B model reaches **roughly 92% ASR at a 0.1% poison rate** and "staying positive even when the poisoning rate drops to 0.0005%," which is the number that should end the argument. The authors describe the work as the first demonstration that data poisoning can plant a remote code execution backdoor in an agent rather than a misclassification or a bad answer.

**Why it matters:** every defense in this space inspects post-training data, fine-tuning sets, or the model's outputs. This attack is upstream of all of them and survives a clean post-training pipeline, which means the supplier you have to trust is the corpus, not the fine-tuner. The abstract reports no clean-input false-positive rate, no durability measurement and no defense evaluation — so treat 92% as the upper bound of an undefended system, not as a field rate.

[`🔗 arXiv 2610.37741`](https://arxiv.org/abs/2610.37741) · [`🔗 Full text (HTML)`](https://arxiv.org/html/2610.37741v1) · [`🔗 HN thread`](https://news.ycombinator.com/item?id=50341334)

---

## 6. Barracuda's own advisory says "Authentication Required: Yes" for a bug Mandiant scored 9.3 with `PR:N` — and calls the result "High"

- **Velocity:** ▮▮ rising
- **Source:** Mandiant CNA (cveawg) · record published 2026-11-02 · NVD `Awaiting Analysis`
- **Tags:** `cve` `barracuda` `authentication-bypass` `appliance` `email-security`

`CVE-2026-116606` is a pre-authentication authorization bypass in Barracuda Email Security Gateway before **9.4.0.030**: an attacker invokes a configuration-import function and restores a crafted, compatible backup archive, which modifies the appliance's global configuration. Mandiant scored it **CVSS 4.0 9.3** (`AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H`, `baseSeverity: CRITICAL`), CWE-288, from a reservation on **2026-10-26** to publication on **2026-11-02** — seven days. It ships beside `CVE-2026-111560`, a command injection at 8.6 that affects ESG, ADC, BMA, WCC, WAF and WSG; Barracuda's page notes that "if exploited in combination, these vulnerabilities could allow an attacker to bypass authorization controls and obtain root access to the device."

Two fields on the vendor's own advisory do not match the record. Its per-CVE table reads **"Severity: High / CVSS Score: 9.3 / Authentication Required: Yes, administrative access"** — the 9.3 is reproduced, but 9.3 sits in CVSS 4.0's *Critical* band, and the `PR:N` in the Mandiant vector means no privileges are required. The page's prose resolves the second discrepancy only partly: "Successful exploitation requires an attacker to have access to the administrative interface of an affected product," which is a network-reachability statement rather than a credential one. NVD's status is **`Awaiting Analysis`** with no `nvd@nist.gov` metric, and the CISA ADP wrote an SSVC in the same record the next afternoon: `Exploitation: none`, `Automatable: yes`, `Technical Impact: total`.

**Why it matters:** the appliance category keeps producing this shape — reachable management plane, restore-a-backup primitive, root at the end. The remediation split is the practical detail: **BNSF-40425 for 9.4.017 and above, BNSF-40430 below it**, so a device several versions stale may need more than one update. And if you are triaging by the "Authentication Required" row rather than the vector, you are triaging with a string the vendor's template fills in.

[`🔗 CVE-2026-116606 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-116606) · [`🔗 Barracuda advisory`](https://trust.barracuda.com/security/pre-authentication-authorization-bypass-command-injection) · [`🔗 Mandiant disclosure (MNDT-2026-0042)`](https://github.com/mandiant/Vulnerability-Disclosures/blob/master/2026/MNDT-2026-0042.md)

---

## 7. Subvocal's glasses read silent mouthing off RF reflections from inside your face — under 500ms, English only, requires the internet

- **Velocity:** ▮▮ rising
- **Source:** Hacker News (Show HN) · 301 pts · 2026-11-02
- **Tags:** `hardware` `input` `rf-sensing` `accessibility` `agents`

Aarush and Arnav, two former Georgia Tech CS students now at The Subvocal Company (YC F26), posted a Show HN for smart glasses that "let you talk to your computer without talking out loud." The mechanism is not EMG and not cameras: antennas in the frames "emit radio waves, similar to Bluetooth, that pass through your face," and movement of the tongue, lips and soft palate perturbs the signal. "We train foundation models on this data to decode these perturbations to text," with pretraining across users so a new wearer needed only a "short 20-sentence calibration."

The limitations are stated plainly, which is why the post is worth reading rather than the video. Decoding happens in a companion app "on your laptop or phone in the cloud," typical latency "under 500ms usually," and **"Yes, it requires internet access."** It is **English only** at launch, there is no wake word — dictation starts from a trigger key — and the closed-mouth mode is deliberate mouthing, not inner-monologue reading: the founder's edit says the RF "can see inside your mouth" and can be tuned on "internal speech," which he distinguishes from "the automatic tongue movements that occur when 'thinking' words to yourself."

**Why it matters:** sub-vocal input has been a demo-stage promise for a decade, and the interesting shift here is the sensing channel — RF inside the mouth sidesteps both the electrode problem and the camera-in-a-glasses privacy objection. The cloud dependency is the catch: a device whose value is discreet input sends the decoded text through a server, so the discretion is about acoustics, not about data.

[`🔗 Show HN: Subvocal`](https://news.ycombinator.com/item?id=50340088) · [`🔗 subvocal.company`](https://subvocal.company/)

---

## 8. Three months of auditing kornia with Astra, Fable and Opus 5.5 — and a release note written twice, once for humans and once for agents

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · 412 stars today · v0.9.0 released 2026-10-23
- **Tags:** `computer-vision` `pytorch` `open-source` `release` `agents`

kornia 0.9.0 is the geometric-vision library's largest release in years, and its notes are split into an **"Overview for humans"** and an **"Overview for agents"** — the second instructing a model to "Target Kornia 0.9.0 explicitly, and check its documented contracts before generating code," and pointing at an agent index and a conformance-backed support matrix. The human half is candid about what the release is: **"We have run 3 month audit, looking for silent bugs, crashes, and stupid slow-downs -- with Astra, Fable and Opus 5.5 -- under tight human control,"** with more than 800 issues raised and fixed and 995 community PRs merged. It also removes models that never worked — "sorry! -- like SAM3" — and fixes others.

The performance claims come with their own counterexample, which is rare enough to quote in full: **"we publish flagship speed benchmarks for CPU and GPU -- we have 10x faster than OpenCV on CUDA, but ofc, 4x slower on CPU."** Specifics include 16× faster Gaussian blur and 3× faster unsharp mask on Apple CPU, CLAHE **2,000× faster on MPS**, 4× faster morphology ops and 10× less host-sync in augmentations.

**Why it matters:** the agent-facing release note is a new artifact class — documentation whose reader is a code generator, with a version pin as the contract — and it arrives in a library that describes itself as "slop-hostile, be it natural or artificial." The CUDA/CPU split is the other half: a 10× win and a 4× loss in the same sentence is what an honest portability benchmark looks like.

[`🔗 kornia v0.9.0 release`](https://github.com/kornia/kornia/releases/tag/v0.9.0) · [`🔗 Changelog (≈5,000 lines)`](https://github.com/kornia/kornia/blob/v0.9.0/CHANGELOG.md) · [`🔗 kornia repo`](https://github.com/kornia/kornia)

---

## 9. Apache Syncope shipped five CVEs in eight minutes — and not one carries a CVSS score, only a word

- **Velocity:** ▮▮ rising
- **Source:** Apache CNA (cveawg) · five records, 2026-11-02T13:04–13:12Z · NVD `Deferred` on all five
- **Tags:** `cve` `apache-syncope` `rce` `identity` `scoring`

Apache's CNA published five Syncope records on 2026-11-02 between **13:04:15Z and 13:12:27Z**, all `Deferred` at NVD, and every one of them carries a `metrics` entry whose only content is a **textual severity** — `moderate` for one, `important` for the other four. There is no numeric score anywhere on any of the five, from the CNA or from NVD. That absence has a measured shelf life, though: across the 44 Apache CVEs published **2026-09-21→27**, 42 carry the same severity word and the **41 whose only metric is that word now hold a CISA-ADP CVSS 3.1** in the record's ADP container — a median **4.4 hours** after publication, with the word left in place. A word turns out to be a queue somebody else clears, not the assigner's final answer. The most serious by description is `CVE-2026-109083`: "An administrator with adequate entitlements can import arbitrary BPMN process definitions via the REST API and then start the process. When a BPMN process containing a JUEL expression is imported and started, the expression is executed directly on the server, with no sandbox." That is an authenticated RCE, and its severity line is the word "moderate."

The batch reads as one audit release with different endings. `CVE-2026-114364` is explicitly **an incomplete fix** — "This CVE covers an incomplete fix for CVE-2026-77051" — where an administrator can still reach arbitrary SQL through a path the earlier patch did not close. `CVE-2026-113687` is the same Groovy sandbox-escape shape as 109083 by a different route ("running untrusted code on a separate Thread, thus bypassing the Groovy security"). `CVE-2026-113511` is an authorization bypass where a delegated admin relocates a Realm subtree across realm boundaries. `CVE-2026-110535` lets non-admin users configure impersonation for WA surrogate authentication via AuthProfile self-updates. Every record names **4.0.9 / 4.1.4** as the fix, across three affected lines (3.0.x, 4.0.x, 4.1.x).

**Why it matters:** "no CVSS published" is a statement about a policy, and this is the policy made visible — Apache rates with words on the record and leaves the number to whoever computes one later. If your pipeline gates on `CVSS >= 9.0`, all five of these are invisible to it, including the one that runs arbitrary JUEL on the server. The Apache severity vocabulary does map to something (important ≈ high), but that mapping lives in your YAML, not in the record.

[`🔗 CVE-2026-109083 (BPMN/JUEL RCE)`](https://cveawg.mitre.org/api/cve/CVE-2026-109083) · [`🔗 CVE-2026-114364 (incomplete fix)`](https://cveawg.mitre.org/api/cve/CVE-2026-114364) · [`🔗 CVE-2026-113687 (Groovy sandbox escape)`](https://cveawg.mitre.org/api/cve/CVE-2026-113687) · [`🔗 Apache Syncope security page`](https://syncope.apache.org/security)

---

## 10. An agentic search harness with only BM25 and grep answers 85% of BrowseComp-Plus — and the fancy indexes added nothing

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.41172 · submitted 2026-10-30
- **Tags:** `rag` `retrieval` `agents` `context-engineering` `ragflow`

"Context as Infrastructure" (Yu, Cao, Idriss, Wang, Xu, Qin, Jin, Liu) starts from a result that reframes the retrieval stack: "a harness with only BM25/grep and MiniMax M3 answers 85% of BrowseComp-Plus and 91% on multi-hop FRAMES in our runs, without compiled or vector indexes." If accuracy is that saturated, the remaining cost is context — "an undisciplined loop repeats queries, rereads documents, and fills the window with unused passages."

The paper's most useful finding is a negative one about the layer everyone is selling. Compilation "is not a better retriever: under a competent harness, structural artifacts gave no detectable accuracy gain on FRAMES, and a PageIndex-style outline degraded at scale." What *does* pay is narrower: "A navigation tree whose leaves are claim-evidence pairs—the mechanism we measure—cuts query tokens by 91% when evidence suffices and adds 1.9% when it does not, a 38% average reduction; this implies a 2% break-even sufficiency rate and a measured rate near 43%." A decision gate cuts latency from **140 s to 30 s**, though the authors note the token saving "is bought with retrieval rounds and carries its own latency cost." Ontology, graph, wiki, timeline, mind map and memory artifacts "pay off in deployment (governance, integration, onboarding, temporal orientation, continuity) where accuracy benchmarks cannot see them."

**Why it matters:** two claims that are usually bundled get separated here — better retrieval and better *supply*. If the harness is competent, buying a vector index for accuracy is unfalsifiable spending; the measurable win is token supply discipline, and it has an explicit break-even rate you can compute for your own corpus.

[`🔗 arXiv 2610.41172`](https://arxiv.org/abs/2610.41172) · [`🔗 RAGFlow`](https://github.com/infiniflow/ragflow)

---

## 11. Nuxt's `getRouterParam` returns a different parameter than h3 matched when the path contains `%3F` — so authz and resource selection can disagree

- **Velocity:** ▮▮ rising
- **Source:** VulnCheck CNA (cveawg) · record published 2026-11-02 · fix in 4.6.2
- **Tags:** `cve` `nuxt` `javascript` `authorization-bypass` `parser-confusion`

`CVE-2026-120309` is a route-parameter confusion bug in Nuxt and `@nuxt/nitro-server`, affecting **4.6.0 up to but not including 4.6.2**, and triggered "by sending paths containing an encoded question mark (%3F)." The effect: `getRouterParam` and `getRouterParams` can return a *different* parameter value than the one h3 actually matched. It is CWE-436, Interpretation Conflict, scored **CVSS 4.0 6.3** and **3.1 3.7** by VulnCheck, with the reporter credited as `seslo82` and a public date of **2026-10-16**. NVD's status is `Awaiting Analysis`.

The exploit condition is the part worth reading twice, because it is not "all Nuxt apps": the bug is exploitable when "authorization checks use the Nuxt helper value while resource selection uses `event.context.params`," "allowing access to unauthorized resources." In other words, two ways of asking the same question get two different answers, and only a codebase that mixes them is affected.

**Why it matters:** a 6.3 that depends on a programming pattern is easy to dismiss and easy to be wrong about, because the pattern is exactly what a framework helper invites — you reach for `getRouterParam` in the guard and for `event.context.params` in the handler without noticing they are different sources. Grep for both in the same route before deciding you are unaffected.

[`🔗 CVE-2026-120309 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-120309) · [`🔗 Nuxt security advisories`](https://github.com/nuxt/nuxt/security/advisories)

---

## 12. rTaste gave six research agents 415 experiments to rank — the rankings beat random, but not the experiment you wrote down first

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.40488 · submitted 2026-10-30
- **Tags:** `agents` `evaluation` `research` `negative-result` `benchmark`

"rTaste: Do Research Agents Have Taste?" (Art Kanke) asks the question that every "AI scientist" demo skips: given a paper, can an agent tell which experiment is *worth running* before anyone knows the outcome? Six frontier models, alone or as teams, propose minimum viable experiments, forecast whether each will pass a threshold they set, and rank them. A separate executor then runs **every** MVE — "including those ranked last" — and three model auditors judge the results.

The result is a careful negative. "Of 415 MVEs, 194 are judged sound, valuable and new, but fewer than half of these (73) are also judged beyond the seed paper and non obvious." On ranking: "The agents' first choices match the auditors' most valued experiment more often than a random pick, but are not shown to improve on choosing the experiment written first." Forecasts "beat a base rate but are not measurably more accurate than those of a fresh instance of the same model given only the paper and registrations." And teams — the configuration everyone reaches for — "cost more without a clear overall improvement in proposal quality."

**Why it matters:** the agents are good at *generating* worthwhile experiments and unproven at *selecting* them, which is the opposite of the ordering the products assume. A ranking that cannot beat taking the first idea is a cost, not a capability — and the paper publishes all 415 MVEs, their forecasts and their audited outcomes, so the claim is re-checkable rather than asserted.

[`🔗 arXiv 2610.40488`](https://arxiv.org/abs/2610.40488) · [`🔗 Full text (HTML)`](https://arxiv.org/html/2610.40488v1)

---

## 13. PostHog held 2 PB in per-customer DuckDB instances and is moving off it — "DuckLake is built for compatibility, not scale"

- **Velocity:** ▮▮ rising
- **Source:** PostHog blog · 124 pts on HN · 2026-11-02
- **Tags:** `databases` `duckdb` `trino` `infrastructure` `analytics`

PostHog is not calling DuckDB bad — it calls it "brilliant on one machine." The problem was running it as a multi-tenant cloud warehouse: five months after replacing a shared ClickHouse cluster with per-customer DuckDB instances holding, at the move, "about 2 PB," or "roughly 1 trillion rows and 15.3 million snapshots." It is now rebuilding on a customized Trino deployment with its own table format, HogLake.

The failure modes are specific and transferable. Single-node sizing meant choosing worker resources before seeing the query, and "the ergonomics here are wonky." DuckLake's portable catalog schema restricted engine-specific optimizations — **"DuckLake is built for compatibility, not scale"** — and at PostHog's scale "a single-table write could take more than three minutes." Catalog statistics bloated until "over 99% of the catalog's statistics rows belonged to tables that no longer existed"; removing them made writes **30–50 times faster**, but the rows returned, and PostHog ended up maintaining a fork. It also notes that DuckDB lacked asynchronous S3 fetching until recently, and that offering direct Postgres connections on port 5432 "sounds like a great idea" but "in practice, it was much harder to scale than HTTP."

**Why it matters:** the per-tenant-database pattern is the current default answer to analytics isolation, and this is a first-hand account of where it stops — not at correctness but at the catalog and the single-node sizing decision you have to make blind. The 30–50× write speedup from deleting dead statistics rows is the kind of number that is worth checking in your own warehouse before migrating anything.

[`🔗 Moving our warehouse off DuckDB`](https://posthog.com/blog/moving-off-duckdb) · [`🔗 HN thread`](https://news.ycombinator.com/item?id=50338747)

---

## 14. Cloudflare cut DNS zone-build memory 85% by rebuilding only what changed — with the rule that makes it safe stated up front

- **Velocity:** ▮▮ rising
- **Source:** Cloudflare blog · 94 pts on HN · 2026-11-02
- **Tags:** `dns` `infrastructure` `cloudflare` `performance` `distributed-systems`

Cloudflare's DNS Zone Builder used to treat a zone-setting change as a full rebuild — read, encode, compare and hold every record in memory — which does not scale when "some zones now hold more than 20 million records, and we expect them to keep growing toward hundreds of millions." The new design has event producers identify which zone fields and settings changed, and a planner picks one of five paths (targeted record work, records plus metadata, apex plus metadata, purge, or full build). A unified scheduler merges queued work for the same zone over soft Kafka commits, and builds are planned from the event, then re-checked against a fresh database snapshot.

The safety rule is the interesting engineering: **"every key a targeted build writes must be byte-for-byte identical to what a full build would write,"** enforced by equivalence tests and a production mirror — and "The planner never turns uncertainty into less work" — missing details, unknown events, or any change that might affect records anywhere in the zone still get a full build. Over 24 hours, **92.95% of builds avoided a full zone rebuild** (7.04% remained full), full builds fell about **40%**, peak memory went from **79 GiB to 12 GiB** (−85%), the largest p99 spike fell from **14.6 minutes to 1.21 minutes**, and median build completion halved from about **7.7 s to 3.3 s**. The mirror comparison found a **0.31% diff rate across 234,313 matched zones**, much of it temporary timing skew.

**Why it matters:** the caveats are as useful as the wins. Cloudflare says the latency figures "combine every build type and customer plan, so they are not a latency guarantee for an individual zone," that much of the remaining delay is the deliberate rebuild interval, and that network distribution time is excluded. Full builds still exist for first publication and for any event that does not say what changed — which is the honest shape of an incremental system: the fallback is the spec.

[`🔗 Cloudflare: DNS targeted zone builds`](https://blog.cloudflare.com/dns-targeted-zone-builds/) · [`🔗 HN thread`](https://news.ycombinator.com/item?id=50337558)

---

## 15. GPT-Rosalind-6 adds no training data and no post-training — it is GPT-6 Astra's weights behind a biology access gate

- **Velocity:** ▮▮ rising
- **Source:** OpenAI deployments safety · system card addendum · 2026-11-02
- **Tags:** `ai-safety` `biosecurity` `openai` `system-card` `policy`

OpenAI published a system card addendum for **GPT-Rosalind-6**, "a frontier reasoning model for biology, drug discovery, and translational medicine," and the disclosure's first useful sentence is that it is a re-release rather than a new model: it "uses the same weights as GPT-6 Astra," and **"We did not add training data or perform additional post-training for this release."** What changed is the access policy, not the network.

The beneficial-capability numbers against GPT-Rosalind-5.5 at the highest reasoning budget are large — MedChemBench v7 **49.6% vs 28.9%**, GeneBench Pro v13 single-attempt **37.7% vs 16.7%**, LifeSciBench Gold **61.3% vs 44.0%** — and so is the risk posture. OpenAI treats the model as "High capability in the Biological and Chemical domain, below the threshold for Critical" and as "Critical in Cybersecurity," inheriting Astra's assessments for cyber and self-improvement. Of the four High-capability preparedness evaluations: "After adjusting for refusals, GPT-Rosalind-6 exceeds the indicative High capability thresholds on three of the four evaluations. We therefore continue to treat the model as High capability." The addendum adds that against GPT-Rosalind-5.5, "observed scores are higher on three evaluations and lower on Biorisk knowledge." On the four Critical evaluations — AAV capsid packaging (0.600), SHP2 function (0.60), coronavirus-ACE2 entry (0.75) and phage-plasmid co-evolution (NLL ≤ 9.40) — **"None of the four Critical capability evaluations met its indicative threshold."**

**Why it matters:** the one number that undercuts the launch framing is **Biorisk knowledge cons@32: 78.3% for Rosalind-6 versus 79.2% for Rosalind-5.5** (GPT-6 Astra: 63.3%) — read beside the table's next two rows, which is where the framing partly recovers: refusal rates are **9.4%** and **1.8%**, and refusal-adjusted cons@32 is **85.0%** for Rosalind-6 against an indicative High threshold of **80%**, so the raw 78.3% misses the bar while the adjusted number clears it. A "new" biology model that scores marginally *below* its predecessor on the unadjusted headline probe, with identical weights, is a reminder that a version bump here is an access decision — and the safeguards (approved customers only, business verification, compliance screening, qualified human review before outputs inform experiments) are the actual content of the release.

[`🔗 GPT-Rosalind-6 system card addendum`](https://deploymentsafety.openai.com/gpt-rosalind-6) · [`🔗 HN thread`](https://news.ycombinator.com/item?id=50337503)

---

## 16. Chainalysis says an intruder used "offensive agentic techniques" — and names the four fields it believes were taken

- **Velocity:** ▮▮ rising
- **Source:** Chainalysis incident notice · published 2026-10-30 · coverage 2026-10-31
- **Tags:** `security-incident` `agents` `disclosure` `crypto` `attribution`

Chainalysis published a security incident notice on **2026-10-30** saying it "detected an external actor using offensive agentic techniques" to reach its systems and internal tools during October. The data it names is narrow and specific: **"user IDs, full names, email addresses, and organization role labels."** The data it says it found no evidence of is the part that matters for a forensics-adjacent company: "no evidence of unauthorized access to investigation content, authentication credentials, or session tokens," with the customer email adding transaction and query results, cleartext passwords and MFA secrets to the not-exposed list. Investigation content means graphs, notes and cases.

The framing is the weakest part of the disclosure and the notice is careful not to overclaim it. Chainalysis does not say how many users or organizations are affected, what the entry point was, which vulnerabilities were patched, how long the actor had access, or what "agentic" concretely means — whether a known framework or custom agents. It also states the incident is **"not related to the recent crypto theft at Binance,"** and says it engaged third-party experts and used "sophisticated large language models" in its own security review. Guidance to customers is MFA plus vigilance for "unexpected password reset requests or authentication prompts" — which is the right advice for a list of names, emails and org roles, because that list is a targeting set.

**Why it matters:** a victim describing an intrusion as agentic is a claim about the attacker's tooling that the victim may not be able to substantiate, and this notice does not try to. Read the useful part as the four-field scope and the absence of a stated count: a breach notice that names its data precisely and its attacker vaguely is more trustworthy than the reverse, and the phishing exposure for crypto-compliance staff is the concrete operational consequence.

[`🔗 Chainalysis incident notice`](https://www.chainalysis.com/blog/security-incident-october-30/) · [`🔗 BleepingComputer report`](https://www.bleepingcomputer.com/news/security/chainalysis-discloses-data-breach-from-offensive-agentic-techniques/) · [`🔗 The Block`](https://www.theblock.co/news/business/2026-10-31-chainalysis-says-hacker-using-offensive-agentic-techniques-accessed-its-customers-names-and-emails-432244)

---

## 17. Scrapling's v0.5 MCP server "can solve almost any CAPTCHA" — and the release it shipped in broke the old API

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · 858 stars today · v0.5 released 2026-10-17
- **Tags:** `scraping` `python` `mcp` `agents` `open-source`

Scrapling is a Python scraping framework at **92,634 stars** and BSD-3-Clause, trending today at 858 stars, and the version that matters is **v0.5, released 2026-10-17** — two weeks before it started climbing. That release is explicitly a break: "This release introduces a lot of breaking changes that don't fit here. Check the Migrating to v0.5 guide before updating." What it adds is agent-facing: "A much more capable MCP server for AI agents that can solve almost any CAPTCHA," complete browser workflows as one ordered sequence — fill forms, click, hover, scroll, use the keyboard, handle dialogs, wait for results, "with actions stopping at the first error" — and reading or searching the current page, as HTML, Markdown or text, without a reload.

The repo's tracker carries **4 open issues and 4 open PRs** (read 2026-11-03) against 9,760 forks — the `open_issues_count` field reads 8 only because GitHub sums the two — and PyPI's `latest` is **0.5**, so what is documented is what is installable. Prior releases followed the same pattern: v0.4.15 on 2026-08-23 reworked the MCP server and added "RAG-ready Markdown in one line," and v0.4.14 was a maintenance release fixing `uv` silently falling back to an older version.

**Why it matters:** a scraper whose headline feature is CAPTCHA solving is a tool class with a moving legal and ethical boundary, and the honest read is that the MCP surface — not the parsing — is why it is trending: agent frameworks need a browser they can drive and a page they can read as Markdown, and this ships both behind one `npx`. Pin to 0.5 knowingly; the migration guide exists because the previous interface does not carry over.

[`🔗 Scrapling repo`](https://github.com/D4Vinci/Scrapling) · [`🔗 v0.5 release notes`](https://github.com/D4Vinci/Scrapling/releases/tag/v0.5) · [`🔗 v0.4.15 release notes`](https://github.com/D4Vinci/Scrapling/releases/tag/v0.4.15) · [`🔗 PyPI`](https://pypi.org/project/scrapling/)

---

## 18. BlindToChange: agents that search perfectly still miss the change nobody told them to look for — a 27.5-point gap

- **Velocity:** ▮ steady
- **Source:** arXiv 2610.41435 · submitted 2026-10-30
- **Tags:** `agents` `search` `benchmark` `evaluation` `freshness`

"BlindToChange" (Phukan, Goyal, Pruthi) makes an argument about what agentic search benchmarks can and cannot see. BrowseComp and its relatives "explicitly state what needs to be found," so an agent that never questions its own assumptions scores well: "While agents can search and easily find recent changes, the correctness of their responses depends on whether they search and what they search for." Real requests state only the final need — an itinerary for a trip — leaving the agent to discover that a museum is temporarily closed.

The benchmark is built from requests "where an obvious candidate is no longer applicable due to a recent real-world event," with events drawn automatically from **Wikidata** so it can be "periodically refreshed" rather than frozen. The measured effect is large: "a big gap -- as high as 27.5 points, even at high reasoning effort -- in systems' performance, when the recent event is not explicitly mentioned compared to when we ask about it directly." Trajectory analysis attributes "more than half of the failures" to the specific behaviour: agents "do not directly search to verify whether a relevant fact has [changed]."

**Why it matters:** 27.5 points is not a knowledge gap — the agents can find the change once asked — it is a *triggering* gap, and it is invisible to every benchmark that hands over the question. The refreshable-from-Wikidata design is the part worth stealing: any eval whose items are hand-written decays, and this one can be re-drawn from a live feed.

[`🔗 arXiv 2610.41435`](https://arxiv.org/abs/2610.41435) · [`🔗 Full text (HTML)`](https://arxiv.org/html/2610.41435v1)

---

## 19. worktrunk makes git worktrees addressable by branch — the missing plumbing for running ten agents at once

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · 136 stars today · MIT OR Apache-2.0
- **Tags:** `git` `worktree` `agents` `cli` `rust`

Worktrunk is a CLI for git worktree management built for one workflow: "AI agents like Claude Code and Codex can handle longer tasks without supervision, such that it's possible to manage 5-10+ in parallel. Git's native worktree feature gives each agent its own working directory, so they don't step on each other's changes." The gap it fills is ergonomic and real — "Even a task as small as starting a new worktree requires typing the branch name three times."

The design decision is that **worktrees are addressed by branch name**, with paths computed from a configurable template, and commands that take a branch also accept the path of the worktree checked out there. Around those three core commands it adds hooks for local workflows and copy-on-write build caches, which is the part that makes parallel agents practical: ten worktrees without a shared build cache means ten cold builds.

**Why it matters:** running agents in parallel is now the default advice and the version-control story underneath it is usually skipped. A worktree-per-agent model is the correct isolation — separate index, separate HEAD, shared object store — and the tooling gap was never git's capability but its interface. At **9,958 stars** and 136 today, this is trending as infrastructure rather than as a demo.

[`🔗 worktrunk repo`](https://github.com/max-sixty/worktrunk) · [`🔗 worktrunk.dev`](https://worktrunk.dev)

---

## 20. Since we covered CVE-2026-98432 on 2026-11-02: Ubuntu still ships no kernel that closes it, three weeks after publication

- **Velocity:** ▮ steady
- **Source:** Ubuntu CVE tracker · publication 2026-10-15, last updated 2026-10-30
- **Tags:** `cve` `linux-kernel` `ubuntu` `patching` `distributions`

**Update to our 2026-11-02 item.** When we covered CVE-2026-98432 — the IPv4 TCP use-after-free that Go's MPTCP default put in front of every Go service on Linux — the story was the runtime default. The downstream half has since become the actionable one: Ubuntu's own CVE tracker lists the record as published **2026-10-15**, last updated **2026-10-30**, with Ubuntu priority **High** and a CVSS 3 severity score of **9.8 · Critical**, and as of 2026-10-31 reporting, "No patched kernels are available yet for 22.04, 24.04, or 26.04 despite a CVSS 9.8 rating." The tracker carries no ETA.

The gap is between the mainline fix and the LTS kernels. The vulnerability is a request-socket ownership bug — `tcp_v4_syn_recv_sock()` "transfers ownership of ireq->ireq_opt to the child socket (newinet->inet_opt) without copying it," while a retransmitted SYN on another CPU can still read it under `rcu_read_lock()` only — and it is fixed by freeing those options after an RCU grace period. Upstream releases carrying the patch shipped before the Ubuntu advisory went stale; the LTS kernels did not follow in the same window.

**Why it matters:** the mitigation we described on 11-02 — set `multipathtcp=0`, which a module declaring `go 1.23` gets by default — is now the *only* remedy available to an Ubuntu LTS host that cannot change its kernel. That is a materially different recommendation from "patch the kernel," and it is the difference between a distro that has the fix and one that does not. Check the tracker again before quoting any of this; a kernel update is exactly the kind of event that inverts the claim.

[`🔗 Ubuntu CVE-2026-98432 tracker`](https://ubuntu.com/security/CVE-2026-98432) · [`🔗 Report: no patched LTS kernels (2026-10-31)`](https://freenode.net/article/ubuntu-lts-kernels-still-unfixed-for-critical-cve-2026-98432) · [`🔗 CVE record`](https://cveawg.mitre.org/api/cve/CVE-2026-98432)

---

## 21. WorkOS says an "AI-assisted offensive security framework" reached its sales tool — the framework's name is in the CEO's Hacker News comment, not the bulletin

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News (self) · 60 pts · ~5h ago (~07:31 UTC+8)
- **Tags:** `security` `incident` `identity` `ai-agents` `disclosure`

WorkOS published a bulletin on 2026-11-02 for unauthorized access to an internal application used by its sales team, identified on **2026-10-30**. The bulletin scopes the incident to CRM and customer-support data: business contact details, account histories, and "summaries and excerpts from sales calls, support discussions, and customer Slack conversations", plus product-usage and directory-health metadata. It also states: **"There is no evidence that WorkOS application data was accessed, nor is there evidence that production WorkOS services were accessed or impacted."** The technique appears exactly once, as "an AI-assisted offensive security framework to automate reconnaissance and exploitation attempts," with Wiz, Google and CrowdStrike reporting on agentic intrusions linked as context.

The name is not in the bulletin. In the Hacker News thread, CEO Michael Grinich writes: **"The attack involved ARTEX, an autonomous AI agent framework used to carry out offensive security operations."** That is a stronger attribution than the document carries — an actor and a tool rather than a technique — and it is the sentence every downstream story quotes. Both can be true; they are not the same claim, and only one of them is the vendor's formal notice.

**Why it matters:** for an identity and SSO vendor the damaging material is not the contact list but the conversation excerpts, because a request to reissue a SAML certificate or reconnect a directory is exactly the kind of thing that sounds routine when it cites a real support thread and a real colleague. Two readings to keep separate: "no evidence" on day four is a statement about an investigation in progress, and the ARTEX attribution is the CEO's, not the bulletin's.

[`🔗 WorkOS security bulletin`](https://workos.com/security/bulletins/october-30th-2026-data-security-incident) · [`🔗 HN thread + CEO comment`](https://news.ycombinator.com/item?id=50345712) · [`🔗 WorkOS security page`](https://workos.com/security)

---

## 22. OpenAI's Pando cut median push latency by nearly 80% — on a monorepo whose reliability had fallen below 90%

- **Velocity:** ▮▮▮ trending
- **Source:** OpenAI Engineering · published 2026-11-02 · Aaron Friel, Taylor Blau, Ted Nyman
- **Tags:** `git` `infrastructure` `monorepo` `agents` `source-control`

OpenAI built a new Git backend, **Pando**, and now serves its entire monorepo from it without changing the client or the protocol. The framing is explicitly agent-driven: Codex raised the number of branches, pushes, merges and fetches per engineer, "with reliability at times falling below 90%" before the rebuild. The production numbers are stated plainly: median push latency down **nearly 80%** (also written as "nearly 5x"), **nearly a petabyte of Git data per day**, more than **57 TB of Git packs in a single hour** with over 99% of those bytes from local disk cache, a median packfile under **20 KiB** and a 99th percentile under **3 MiB**, and a petabyte/day served "with just a handful of CPU cores".

The design has two moving parts. Pando coordinates updates to each branch independently, so unrelated branch pushes proceed in parallel; and it reuses packfiles across fetches instead of generating one per client, so many readers get the same bytes. The cost is stated in the post rather than discovered by a reader: "a reader looking at several branches can see them at different points of time." Upstream contributions came out of the work — `packfile-uri` tracing and byte counts, validation when accepting an existing pack, and fixes around concurrent downloads and interrupted transfers.

**Why it matters:** agent concurrency turned source control into a throughput problem, and the answer here is per-branch causal consistency rather than a global lock — a trade you should name before adopting it, because cross-branch atomic reads are the thing you give up. The performance claims are production self-reports with no stated baseline beyond "the previous backend", and "nearly 5x" and "nearly 80%" are the same measurement in two units, not two results.

[`🔗 Scaling Git at OpenAI`](https://openai.com/index/scaling-git-at-openai/) · [`🔗 OpenAI news index`](https://openai.com/news/)

---

## 23. OpenAI's LifeVal shows five everyday tasks at 90.4%–100% — and no average, no model name, and no task count

- **Velocity:** ▮▮ rising
- **Source:** OpenAI Research · published 2026-11-02
- **Tags:** `eval` `agents` `benchmark` `openai` `transparency`

LifeVal is a new OpenAI evaluation of "tasks that matter in everyday life", built from the American Time Use Survey and the Multinational Time Use Study plus a new demographically representative survey of **3,995** respondents, covering caregiving, health, education, household administration, personal finance, shopping and government services. The published page is a set of worked examples, each with a score: **93.1%** for comparing kindergartens and shortlisting enrolment, **98.0%** for organising flood-prep volunteers, **100%** for finding a home in Luzerne County and adding the deed to a cart, **96.3%** for setting up a shared game stream with a grandparent, and **90.4%** for a meal plan after a diabetes diagnosis. Then one summary sentence: **"Our latest models score very highly on many LifeVal tasks."**

What the page's text does not carry: which model or version, how many tasks the evaluation contains, an aggregate score, a failure example, or a methodology and limitations section. A "See more" control sits under the examples, so more rows plausibly exist behind it — but the five numbers above are the ones in the server-rendered page, and the only quantitative claim about the benchmark as a whole is the sentence above.

**Why it matters:** an eval published as five passing examples is a capability claim, not a measurement anyone else can compare against — there is no denominator, no model version to pin, and no stated task distribution. Quote the examples as examples. The survey work underneath is the more reusable artifact: 3,995 respondents is a defensible way to choose what to measure, and the omission is what happens after that choice.

[`🔗 LifeVal`](https://openai.com/index/lifeval/) · [`🔗 OpenAI Research index`](https://openai.com/research/)

---

## 24. Netpbm's September release fixed buffer overruns written in 1988 — the seven CVEs for them arrived five weeks later

- **Velocity:** ▮▮ rising
- **Source:** NVD (VulnCheck CNA) · records published 2026-11-02 · release 10.86.51 dated 2026-09-28
- **Tags:** `cve` `netpbm` `memory-safety` `image-parsing` `disclosure`

Seven VulnCheck records published 2026-11-02 describe memory-safety bugs in Netpbm's format converters: a heap overflow in **sgitopnm** (`readChannels()`, RLE-compressed SGI), an integer overflow in **winicontopam** on oversized ICO/CUR dimensions, stack overflows in **picttoppm**'s `paintPoly()` and `scanPoly()`, a heap overflow in **xpmtoppm** from an unvalidated characters-per-pixel value, an integer overflow in **jbigtopnm**, and an out-of-bounds read in **tgatoppm**'s `get_pixel()`. The fixed versions are given per branch: before **10.86.51**, 11.x before **11.02.30**, and 11.03 before **11.15.08** (the first record says 11.02.29 / 11.15.07). All seven are **`Awaiting Analysis`** at NVD, so every score is the CNA's: **CVSS 3.1 7.8** with `AV:L/AC:L/PR:N/UI:R`, and **CVSS 4.0 8.5** with `AV:L/UI:P` — the same bug in two frameworks with different interaction assumptions.

The changelog is larger and older than the batch. Release **10.86.51 (2026-09-28)** lists fixes in seventeen programs plus a build fix, most annotated "Always broken" with the introduction date: `picttoppm` since 1988, `tgatoppm` since 1989, `pjtoppm` and `imgtoppm` since 1991, `xpmtoppm` and `sgitopnm` since 1994, `jbigtopnm` since 9.2 (2000). Several entries credit "Discovered and diagnosed by Tristan Madani", and one is unusually candid about provenance: **"picttoppm: fix buffer overrun with very large polygons in input. Always broken -- in fact done intentionally for coding convenience (picttoppm was in primordial Netpbm in 1988)."**

**Why it matters:** the batch covers six converters; the release note covers seventeen converters, five weeks earlier. If your exposure list is the CVE feed, it is a subset of the patch you already needed — and "always broken" means these are not regressions from a refactor but properties the code has had since the 1980s. Patch to the branch level named in the record, not to "latest".

[`🔗 CVE-2026-120431 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-120431) · [`🔗 Netpbm 10.86.51 changelog (SVN)`](https://svn.code.sf.net/p/netpbm/code/!svn/bc/5371/super_stable/doc/HISTORY) · [`🔗 VulnCheck advisory`](https://www.vulncheck.com/advisories/netpbm-before-10.86.51-11.02.29-and-11.15.07-sgitopnm-heap-buffer-overflow)

---

## 25. CSGHub serves private model and code files to anonymous callers — the portal signs the request with its own admin key

- **Velocity:** ▮▮ rising
- **Source:** VulnCheck CVE-2026-120426 · published 2026-11-02 · issue #1586 opened 2026-10-31
- **Tags:** `cve` `idor` `model-hub` `self-hosted` `unfixed`

`CVE-2026-120426` describes an authorization bypass in **OpenCSG CSGHub** through `v2.6.0-ce`: an unauthenticated caller can read files in private model, code and space repositories by injecting a percent-encoded `current_user` parameter into the file path. The reporter's own write-up in issue #1586 traces it precisely. `GET /:repo_type/:namespace/:name/resolve/:branch/*path` is registered in a bare route group with no per-route guard, unlike the upload routes above it; with no `user_token` cookie the portal fetches through the backend using the **global server API key**; on that privileged call the acting identity is carried only as a `current_user` query parameter, and the attacker-controlled path is interpolated with `%s` ahead of `?current_user=%s` with no escaping. Because Gin decodes a percent-encoded query separator inside the catch-all segment, a path ending `README.md%3Fcurrent_user%3D<owner>%26` overrides the parameter. Datasets are unaffected — their routes use a login middleware the others lack.

VulnCheck scored it **CVSS 4.0 8.7** (`PR:N/VC:H`) and **CVSS 3.1 7.5** — both from the same CNA, at different framework conventions — and NVD's status is **`Deferred`**. There is no fixed release to install: the issue was opened 2026-10-31 and is still open, the newest release is **v2.6.0-ce (2026-10-15)**, and `main`'s last commit is **2026-09-19**.

**Why it matters:** a self-hosted model hub holds the weights, the dataset, and whatever tokens were committed beside them, so an unauthenticated GET is the whole exposure — no write and no RCE needed. The failure is architectural rather than a typo: a user-facing route falling back to the administrative service credential, with the user's identity then asserted by a query parameter. Until a release exists, the mitigation is at the proxy: deny anonymous access to `*/resolve/*` or require a session for private namespaces.

[`🔗 CVE-2026-120426 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-120426) · [`🔗 Issue #1586 (full trace)`](https://github.com/OpenCSGs/csghub/issues/1586) · [`🔗 VulnCheck advisory`](https://www.vulncheck.com/advisories/opencsg-csghub-through-2.6.0-ce-unauthenticated-private-repository-file-read-via-resolve-route)

---

## 26. WSO2's 9.4 says no privileges are required — its own description says the attacker needs a lower-privilege role

- **Velocity:** ▮▮ rising
- **Source:** CVE record (WSO2 CNA) · reserved 2025-10-20 · published 2026-11-02
- **Tags:** `cve` `wso2` `access-control` `cvss` `api-gateway`

`CVE-2025-11969` is a System REST API access-control failure in WSO2 API Manager. The record's description is about a logged-in user: **"The System REST APIs do not correctly enforce access control mechanisms, allowing users with lower privilege roles to execute administrative actions that should be restricted."** The metric attached to the same record is not: **CVSS 3.1 9.4** with `AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:L`, where `privilegesRequired: NONE` describes an unauthenticated attacker. Recomputing that vector with `PR:L` — the value the prose implies — gives **8.3**. Both numbers are WSO2's; NVD's status is `Awaiting Analysis`, so there is no second opinion on the record.

The scope is broad and build-pinned. Nine API Manager branch lines from **3.1.0** to **4.5.0** each carry a build-number ceiling (for example `4.5.0` before `4.5.0.32`), alongside WSO2 Identity Server as Key Manager 5.10.0, Open Banking AM and IAM 2.0.0, API Control Plane, Universal Gateway and Traffic Manager. Two Maven artifacts (`org.wso2.carbon.apimgt.rest.api.util` and `.common`) list per-version fix builds, and the record states that APIs exposed through the API Gateway are not affected. The ID was reserved on **2025-10-20** and published on **2026-11-02**, 378 days later.

**Why it matters:** `PR:N` versus `PR:L` is the difference between patching on your normal schedule and treating the deployment as exposed now, and it moves the score by more than a point. The record does not resolve it, and the vendor advisory it links did not render for me, so the honest reading is the conservative one: assume a low-privileged account is enough until someone publishes a request that works without a session. Either way the fixed builds are named per branch — "upgrade API Manager" is not the instruction.

[`🔗 CVE-2025-11969 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2025-11969) · [`🔗 NVD record`](https://nvd.nist.gov/vuln/detail/CVE-2025-11969)

---

## 27. Auriga closes 68.3% of RoboDojo's planning–execution gap — and the number that makes the case is the 22.5% it starts from

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2611.01112 · submitted 2026-10-31 · 21 authors
- **Tags:** `robotics` `agents` `harness` `embodied` `benchmark`

The Auriga technical report starts with a measurement that is not about its own system: on RoboDojo, a benchmark that separates high-level task decisions from physical execution, **removing arm execution raises GPT-6 Astra's success rate from 22.5% to 76.2%**. The gap is the interface, not the model. Auriga is a task-agnostic harness that tries to close it — the model decides over an explicit task belief and acts through tool calls or synthesised multi-step Python; the harness supplies calibrated 3D measurements, finger-referenced dual-arm control, a single admission gateway to the robot, a paused visual trajectory preview before motion, and stage-tolerance checks during execution that stop the robot and return the measured discrepancy for in-place recovery. The authors report it closes **68.3%** of that gap zero-shot, ranks first on RoboDojo with **57.7%** success (**64.0** score), "more than doubling the reference harness on the same model", and stays first under scene randomisation while learned policies drop by up to **33.9%**. On RoboCasa365 the same frozen harness reaches **73.2%**, up to 23.1% ahead of VLA-assisted agents on composite tasks.

The caveats are structural. The harness was developed across **13 cross-task capability iterations** and then frozen for evaluation — an honest description of how much iteration sits behind a "zero-shot" number, but iteration nonetheless. The leaderboard is the authors' own submission on a benchmark whose reference control interface is what the 22.5% was measured against. And the 68.3% is a fraction of a gap defined by one model on one benchmark.

**Why it matters:** the transferable result is the 22.5 → 76.2 swing, because it says most of the embodied-agent deficit on this benchmark lives in the control interface rather than in perception or planning. That is a claim about where to spend engineering, and it is also why a harness paper can beat a model paper on the same leaderboard without either being wrong.

[`🔗 Auriga (arXiv)`](https://arxiv.org/abs/2611.01112) · [`🔗 Auriga project page`](https://auriga.stelledge.com/) · [`🔗 Code`](https://github.com/lose4578/Auriga)

---

## 28. Four prompt optimizers, eight tasks, no significant gain on strong reasoners — and one arm collapsed to the judge floor in 3 of 5 runs

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2611.01135 · submitted 2026-10-31 · Zhengshuai Yang, Changyun Li
- **Tags:** `prompt-optimization` `evals` `reasoning` `negative-result` `research`

"Compile as Hypothesis" tests the assumption underneath every prompt-optimisation tool: that searching over prompts reliably improves downstream accuracy. Across four optimizer families — genome search, profile-guided mutation, GEPA and ESPO — and eight tasks, measured in paired same-day runs, the authors find **"no statistically significant accuracy gains on strong reasoners."** One structural finding is not a null result: a discrete structural genome prevents a bimodal seed-collapse, where unconstrained search "collapses toward the judge floor in **3/5 runs**".

The paper's useful contribution is a three-dimensional headroom typology over 190-problem knowledge-intensive evaluations: prompt optimisation cannot compensate for an intrinsic knowledge deficit or for physical token truncation, but it does resolve protocol and formatting errors. On `gpt-6`, free-text reflective search (GEPA) gains **+0.14** where structured search stays flat — and the ablation splits that gain into roughly **0.035 from judge-rubric reconstruction** and **0.105 from genuine instruction refinement**. The authors also report exposing "silent backend-mixing in commercial APIs during outage windows" and ship per-call audit verification for it.

**Why it matters:** the split is the finding to carry. If a third of a measured prompt gain is the judge's rubric being reconstructed rather than the instruction being improved, then any optimisation loop scored by an LLM judge is measuring partly its own rubric — and the typology tells you which failures are addressable at all. If your task is knowledge-bound rather than format-bound, the honest expectation from this paper is zero.

[`🔗 Compile as Hypothesis (arXiv)`](https://arxiv.org/abs/2611.01135) · [`🔗 cs.AI listing (2026-10-31)`](https://arxiv.org/list/cs.AI/2026-10-31)

---

## 29. Give PPO a button that resets its needs and it solves 2 of 80 seeds instead of 71

- **Velocity:** ▮ steady
- **Source:** arXiv 2611.01183 · submitted 2026-10-31 · Chase J. Metoyer
- **Tags:** `rl` `reward-hacking` `wireheading` `pre-registration` `research`

Bounded intrinsic rewards are usually treated as safe from gaming on the argument that a capped signal cannot pay to exploit. This paper tests it directly. A homeostatic satiation reward gives an agent needs that build up and pay out when relieved; add one cheap action that resets the needs, and in **MiniGrid DoorKey-8x8** PPO agents solve **2 of 80 seeds**, against **71 of 80** on the same seeds without the action. In **KeyCorridorS3R1** it is **0 of 20** against **20 of 20**. The policies stay near-uniform, which is the interesting part: this is not a policy that learned a clever exploit, it is one that found a button and stopped.

The paper does the theory too. A telescoping argument caps any policy's satiation return at the needs' starting drive, and a post-hoc computation shows that at every growth rate trained, a solving trajectory beats that cap on all sampled layouts — so the reward does not ask for the behaviour that appeared. Two controls land it: with advantage normalisation on, a satisfaction signal the agent could fill itself was worse than none (**11 of 20** solved with task reward alone versus **1 of 20** with the tamperable signal), and a per-press cost of **0.1** restored the task in every seed. All predictions were pre-registered and hash-locked from round 3, and **9 of 23 hypotheses were not supported** — each is reported.

**Why it matters:** "bounded" is a property of the range, not of the incentive; the exploit here needs no reward hacking in the usual sense, only an action that satisfies the signal without doing the task. The per-press cost restoring every seed is the practical lever — price the reset — and the pre-registration with nine published failures is the reason to trust the other fourteen.

[`🔗 Satisfied, Not Solving (arXiv)`](https://arxiv.org/abs/2611.01183) · [`🔗 cs.LG listing (2026-10-31)`](https://arxiv.org/list/cs.LG/2026-10-31)

---

## 30. Polyend published the Tracker firmware source under PolyForm Noncommercial — the plugin SDK is MIT, the synth engine is still two `.a` files

- **Velocity:** ▮▮ rising
- **Source:** Polyend · announced 2026-11-02 · HN 100 pts
- **Tags:** `open-source` `licensing` `embedded` `firmware` `hardware`

Polyend published the firmware source for the original **Tracker**, **Tracker+** and **Tracker Mini** on 2026-11-02, alongside a **Tracker Community Edition 1.0** that installs on all three instruments. The announcement is explicit that you can "modify the firmware yourself and share your own version", and that a recovery path exists: "We've built in a recovery system to keep a faulty firmware build from bricking your Tracker." The repository (`polyend/tracker-ce`) documents the hardware split — an NXP Kinetis MK66FX1M0 Cortex-M4F at 180 MHz in the original, i.MX RT1051/RT1064 Cortex-M7 at 600 MHz in the Plus and Mini.

The licence is the part worth reading. It is a three-part document: the firmware and most headers under **PolyForm Noncommercial 1.0.0**; the `.ptfx` Sample Editor plugin SDK (`editor-fx-sdk/`) under **MIT**, with the text saying developers are "expressly permitted to build, distribute, and sell" those plugins; and two precompiled static archives, `synth/lib/libPolySynth.a` and `synth/lib/libPolyDSP.a`, kept **proprietary**. Commercial music made with the firmware is explicitly permitted; selling the firmware or a derivative, or putting it in a commercial hardware product, is not. GitHub's licence detector reports the repository as **NOASSERTION**, which is what an unrecognised composite looks like.

**Why it matters:** this is source-available with a deliberate commercial carve-out, not open source — the synthesis engine you would need to build a genuinely new instrument remains a binary. The split is also a template more hardware vendors will reach for: permissive where the community adds value (plugins), noncommercial where the product is, closed where the DSP is.

[`🔗 Tracker firmware announcement`](https://polyend.com/whats-up/tracker-the-biggest-update-yet/) · [`🔗 polyend/tracker-ce`](https://github.com/polyend/tracker-ce) · [`🔗 LICENSE (PolyForm NC + MIT SDK)`](https://github.com/polyend/tracker-ce/blob/main/LICENSE)

---

## 31. syscall.sh relaunched with 27 architecture tables and a JSON endpoint per architecture

- **Velocity:** ▮ steady
- **Source:** Show HN · 215 pts · ~19h ago (~17:29 UTC+8)
- **Tags:** `linux` `syscalls` `reference` `json` `devtools`

syscall.sh is a browsable index of Linux system-call tables, rebuilt and relaunched — the about page says it began in 2020, went on hiatus, and is "being maintained again" as of 2026. It now covers **27 architectures**, each with per-call numbers, arguments and register conventions: **369** syscalls on x86_64 since 3.3, **441** on i386, **326** on AArch64 since 3.7, **327** on RISC-V 64 since 4.15, **439** on the ia32 compat layer, and so on down to Hexagon, MicroBlaze and Xtensa. Tables run from Linux **3.3 to 7.3**, and every architecture also ships as a plain JSON file — `/<arch>/syscalls.json` — alongside an API.

**Why it matters:** syscall numbers are not portable across architectures and not stable across kernel versions, which is precisely the detail that breaks emulators, sandbox seccomp profiles, tracing tools and hand-written assembly. Having the tables as JSON per arch turns a lookup problem into a build input — and the per-call history of when something appeared or was dropped is the part that a header file cannot tell you.

[`🔗 syscall.sh`](https://syscall.sh/) · [`🔗 x86_64 table as JSON`](https://syscall.sh/x64/syscalls.json) · [`🔗 About`](https://syscall.sh/about)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-03T04:25:33Z |
| Items | 31 |
| Sources tracked | 22 (Hacker News, GitHub Trending, arXiv, NVD, cveawg, vendor blogs, security advisories) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[Previous day](2026-11-02.md) · [Raw .md](../feed/2026-11-03.md) · [Archive](../archive/)
