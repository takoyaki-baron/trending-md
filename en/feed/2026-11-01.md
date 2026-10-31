---
date: 2026-11-01
updated: 2026-10-31T20:35:33Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 14
license: CC-BY-4.0
---

# Trending — 2026-11-01

## 1. Delinea shipped three Secret Server auth fixes in one day — and the lowest-scored one is the one that breaks "phishing-resistant" MFA

- **Velocity:** ▮▮▮ trending
- **Source:** Delinea CNA records (cveawg) · published 2026-10-30 · reserved 2026-10-23
- **Tags:** `cve` `authentication-bypass` `pam` `jwt` `fido2`

Delinea published three CVEs against Secret Server on **2026-10-30**, all with the same fix target — "versions earlier than 12.3.1" — and all three are authentication paths that stop authenticating. `CVE-2026-115829` is a partial login bypass: "a user could bypass the initial login step and authenticate by successfully negotiating the second factor login step only", at **8.7** (`CVSS:4.0/AV:N/AC:H/AT:N/PR:H/UI:N/VC:H/VI:H/VA:N`). `CVE-2026-115830` is JWT issuance: a user "could submit an unsigned JWT and receive **cloudadmin** permissions in response", also **8.7** on the same vector. And `CVE-2026-115828` says Secret Server "did not always validate the PIN or biometric check when using a FIDO2-compliant device" — **5.1**.

The scoring is the interesting part. The FIDO2 bug has the *easiest* attack complexity of the three (`AC:L`) and scores lowest, because its impact components are `VC:L/VI:L`; the two that mint administrator rights carry `AC:H/PR:H`, which drags them to 8.7 despite `Technical Impact: total` in CISA's SSVC enrichment. Read the numbers as severity-of-the-computed-scenario, not severity-of-the-outcome: a PAM appliance whose second factor is sufficient *by itself* is a different class of problem from a 5.1.

**Why it matters:** "phishing-resistant MFA" is a procurement checkbox that lands on exactly this product category, and the FIDO2 record says the PIN/biometric check was not always enforced. That is not a partial-credit finding for a password vault — it is the assurance argument, filed at 5.1. Patch to 12.3.1 and re-read what your MFA policy actually assumes.

[`🔗 CVE-2026-115829 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-115829) · [`🔗 CVE-2026-115830 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-115830) · [`🔗 CVE-2026-115828 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-115828) · [`🔗 Delinea security advisories`](https://delinea.com/security-advisories)

---

## 2. Drupal says its Commerce bug is being exploited in the wild; the only score on the record is CISA's 6.5 and its exploitation flag says "none"

- **Velocity:** ▮▮▮ trending
- **Source:** Drupal SA-CONTRIB-2026-254 · CVE record published 2026-10-30T03:09Z
- **Tags:** `cve` `drupal` `ecommerce` `access-bypass` `provenance`

`CVE-2026-118539` is a missing-authorization flaw in Drupal Commerce Core, assigned by the `drupal` CNA on **2026-10-30**: it "doesn't sufficiently protect certain routes and entity fields", which "may financially impact the vendor". Affected are `<2.41` and `>=3.0.0 <3.3.13`. Drupal's own advisory rates it **"Highly critical — 21 ∕ 25"** and states flatly: **"This vulnerability is being actively exploited in the wild."** There is no workaround; the advice is to install the latest version and "audit their orders for inconsistencies."

Now the record. The CNA container carries **no metrics at all**. The only score anywhere on the CVE is in the **CISA-ADP Vulnrichment** container — `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:L/A:N` = **6.5** — alongside an SSVC block whose own options read `Exploitation: **none**`, `Automatable: yes`, `Technical Impact: partial`, and whose timestamp is `2026-10-30T00:00:00+00:00`, i.e. **before** the record was published at 03:09Z. So the two most load-bearing statements about this bug — how bad, and whether anyone is using it — come from opposite directions, and the automated one is the one that will reach your scanner.

**Why it matters:** this is the whole provenance problem in one record. "CVSS 6.5" here is CISA's third-party enrichment, not the vendor's, and it sits on a page that says *actively exploited*; an SSVC `Exploitation: none` stamped before publication is a statement about a deadline, not about the world. If your triage sorts on the record's score, Commerce stores rank below a WordPress plugin while the vendor's telemetry says they are being hit today.

[`🔗 Drupal SA-CONTRIB-2026-254`](https://www.drupal.org/sa-contrib-2026-254) · [`🔗 CVE-2026-118539 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-118539)

---

## 3. A Windows infostealer now POSTs the victim's dossier to `claude-opus-4.6` — and fails over to Kimi and Gemini when the model refuses

- **Velocity:** ▮▮▮ trending
- **Source:** Cisco Talos · 206+ pts · ~6h ago (~22:29 UTC+8)
- **Tags:** `malware` `llm-abuse` `infostealer` `opsec` `talos`

Talos's write-up on **VOLTA-AUTODOXER** describes a self-deleting infostealer that, after collecting browser credentials, wallet seeds, Discord/Telegram/Steam sessions and cloud tokens, reuses the stolen sessions to enrich a victim profile — Gmail receipts from Amazon, DoorDash, Uber Eats, Walmart and PayPal to confirm a home address, food-delivery histories, a live Roblox inventory valuation — writes `Identity_Report.txt`, serialises it as JSON, and **POSTs it to OpenRouter's chat-completions endpoint** from the victim's own machine and network. The default model is `anthropic/claude-opus-4.6`, with `moonshotai/kimi-k2` and then `google/gemini-2.5-flash` as fallbacks at temperature `0.2`. The system prompt asks the model to act as "a forensic intelligence analyst drafting a target assessment" and to produce "WHAT THEY'RE WORTH" and "THEIR OPSEC".

The refusal handling is the detail worth keeping: the sample inspects the response for strings like "I can't" or "I'm not able" and moves to the next model. Talos is careful about what this means commercially — "This suggests it's a builder model", and "**If** VOLTA is indeed a commoditized malware" — and notes there is no actor-owned infrastructure: "All the observed endpoints for this malware are third-party controlled." One sample, SHA256 `57ef4242666d78c50df145b34023df564f0fad38812d6a580e66433d427e2279`, first seen 2026-10-11.

**Why it matters:** the model is not doing anything a spreadsheet could not, but it is doing the *triage* — turning a scraped bundle into a ranked, citation-backed shortlist of who is worth robbing. The transferable fact is the failover loop: a refusal from one frontier model is now a routing decision in commodity malware, so "the model declined" is not a control, it is a latency.

[`🔗 Talos — Appraisal by AI: model-driven victim prioritization in the VOLTA infostealer`](https://blog.talosintelligence.com/appraisal-by-ai-model-driven-victim-prioritization-in-the-volta-infostealer/) · [`🔗 Discussion (Hacker News)`](https://news.ycombinator.com/item?id=50316531)

---

## 4. Jepsen finds 96 issues in ParticleDB and tells users to migrate away — on a report the vendor paid for

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 113+ pts · ~6h ago (~21:39 UTC+8)
- **Tags:** `database` `jepsen` `correctness` `acid` `testing`

Jepsen's analysis of **ParticleDB 1.1.4** (Orkes) reports **96 issues**, **93 of which arose on healthy single-node systems, often with one client and no faults**: crashes, deadlocks, `WHERE 4 = 5` matching rows, `WHERE TRUE` ignored, unenforced `NOT NULL`/`UNIQUE`/primary keys, incorrect joins, undeletable rows, strings returned as integers, and aborted transactions that committed. Under concurrency it detected G1a, G1b, G-single, Lost Update, read skew and stale reads — acknowledged writes disappearing. By `1.1.18.11.rc-22` "all but ten of those issues appeared resolved", but ParticleDB "continued to lose committed writes during normal operation with the default `occ` transaction mode" and "allowed internal anomalies and Lost Update with `serializable`, the strongest setting". Orkes says 1.1.19-rc.13 resolves everything; Jepsen "has not evaluated versions of ParticleDB after 1.1.18.11.rc-22". The recommendation is not hedged: **"Jepsen recommends users halt further deployment of ParticleDB and migrate to other databases as soon as possible."**

The caveats are all disclosed rather than buried. The work was **funded by Orkes** — the vendor — and still recommends leaving. No replication was tested at all: "The builds Orkes provided did not support replication, so this report covers only single-node behavior." There is no TLA+ specification behind the "formally proven" marketing. One cluster of nondeterministic failures "may be artifacts of a bug in the test suite". And the epistemics are stated plainly: "we can prove the presence of bugs, but not their absence."

**Why it matters:** "Full ACID" is a marketing claim and this is what it costs to check one. The useful pattern for anyone reading a database benchmark is the ordering — single-node, default configuration, no faults, and the system still loses writes; every distributed-systems number published above that line is measuring something the base engine has not earned.

[`🔗 Jepsen — ParticleDB 1.1.4`](https://jepsen.io/analyses/particledb-1.1.4) · [`🔗 Discussion (Hacker News)`](https://news.ycombinator.com/item?id=50316100)

---

## 5. NVIDIA's new on-device model scores *better* at Q4 than at BF16 on three benchmarks — and "4GB" is neither the parameters nor the file

- **Velocity:** ▮▮▮ trending
- **Source:** Hugging Face model card · released 2026-10-23 · 300 likes, 75k downloads
- **Tags:** `quantization` `small-language-model` `nvidia` `on-device` `benchmarks`

`nvidia/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB` is "further post-trained from Gemma-4-E4B-it" at "8B (4B effective)", Q4_K_M, 64K in and out, OpenMDW-1.1. The card publishes BF16 and Q4_K_M side by side, and on three of nine rows the quantized build wins: MultiChallenge **53.10 → 55.60**, RoleBench **67.05 → 71.21**, ToolSandbox **68.77 → 74.13**. It loses where you would expect — Tau2-Bench 55.10 → 52.32, LongBench v2 50.50 → 48.67, RULER 86.99 → 85.76.

Two things to hold apart. First, the name: "4B" is the *effective* parameter count of a Gemma-4-E4B sparse model, the total is 8B, and the Q4_K_M file is listed at **6.18 GB** — so "4GB" is a brand, not a measurement of anything on the card. Second, the card's own framing: "Accuracy numbers are measured by NVIDIA under a consistent harness" and "may differ from vendors' self-reported numbers", with evaluations "in reasoning mode except for RoleBench, EQ-Bench v3, and RULER". A quantized build beating BF16 by 2.9 points on MultiChallenge is either a real effect of the post-training pairing or a harness artifact; a card that says "consistent harness" has told you it is not the latter without showing the variance.

**Why it matters:** on-device is where quantization stops being an optimization and becomes the deployment. If Q4 is the artifact people actually ship, its *own* numbers should be the headline, not a column — and the honest read of this card is that the four-bit build is not a strict downgrade, which is a different claim from "quantization is free".

[`🔗 nvidia/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB`](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB) · [`🔗 Hugging Face trending models`](https://huggingface.co/models?sort=trending)

---

## 6. The Platonic Representation Hypothesis becomes a theorem — and the proof says next-token prediction is the *inefficient* route

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.39302 · 58 upvotes on HF Papers
- **Tags:** `research` `representation-learning` `jepa` `multimodal` `scaling-laws`

The paper proves a **Platonic Representation Theorem**: Joint-Embedding Predictive Architectures trained separately on any number of modalities "learn the same representation up to one rotation whenever their positive pairs are two observations of one scene — *good views* — and their misalignment is bounded otherwise". Next-token prediction, in this framing, is a JEPA with *bad views* — parts of a single document — "which explains why language models align with vision only through scale". The empirical claim is the striking one: good views need **42 times fewer training samples** than next-token prediction on the same corpus to reach the same alignment, and a **109M-parameter text JEPA** aligns with DINOv2 and CLIP's image encoders better than every language model evaluated, up to 72B parameters, and better than CLIP's own text encoder. Validation runs from 145k captions to the texts of 940M web images, with a scaling law that "predicts unseen runs within seed noise".

The showcase is deliberately small: one rotation turns separately trained encoders into an image captioner, at CIDEr .838 on COCO, and on a pair-free benchmark the text JEPA reports 64% top-5 on ImageNet-100 "against at most 56%" for language models up to 8B.

**Why it matters:** if alignment across modalities is a property of *view construction* rather than of scale, then scaling is the expensive way to buy a representation you could have specified. The 42× figure is a sample-efficiency claim on one corpus and should not be read as a training-cost claim — but it is the first version of this hypothesis that comes with a recipe instead of an observation.

[`🔗 arXiv 2610.39302 — Proving and Improving the Platonic Representation Hypothesis with JEPAs`](https://arxiv.org/abs/2610.39302) · [`🔗 HF Papers (trending)`](https://huggingface.co/papers/2610.39302)

---

## 7. imgproxy's 9.8 has no CVE, arrived eight days after the fix, and the next release patched the same loader again

- **Velocity:** ▮▮ rising
- **Source:** GitHub Advisory Database · published 2026-10-06 · reviewed 2026-10-30
- **Tags:** `cve` `go` `libvips` `heap-overflow` `image-processing`

`GHSA-hff9-5pqw-6w9f` is a **9.8** (`CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H`) heap overflow in imgproxy's ICO loader, reached by any network client that sends a crafted `.ico`. The mechanism is an integer wrap on a size field the file supplies: the ICO loader allocates `data_size + BMP_FILE_HEADER_LEN` bytes after reading a 32-bit attacker-controlled `data_size`, and the addition wraps when `data_size > UINT32_MAX - 14` — `0xfffffff5` yields a **3-byte** allocation — while the loader still writes the declared multi-gigabyte span starting 14 bytes in. Affected is `>= 4.0.0, < 4.0.16` across the base, `/v2` and `/v3` module paths.

Three dates worth lining up. imgproxy **4.0.16** shipped **2026-09-28** with "Fixed several vulnerabilities in ICO image loader"; **4.0.17** followed **2026-09-30** with "Fixed a possible out-of-bounds read in the ICO image loader"; the advisory was **published 2026-10-06** and only **reviewed into the database on 2026-10-30** — 24 days later, with **no CVE id**. And the image proxy had two more security-shaped releases inside three weeks: 4.0.18 (2026-10-14) fixed SVG sanitization bypasses "via control-character entities in `href`, SMIL animations of link attributes, and DOCTYPE entities", and 4.0.19 (2026-10-21) added "(docker) Untrust compromised eMudhra CA certificates" — patching a different problem than the one 4.0.16's advisory names.

**Why it matters:** for Go modules, `4.0.16` is what the advisory points at and `4.0.20` is what exists. A scanner keyed on the GHSA will clear `4.0.17` while the loader it just reconciled still had an out-of-bounds read one patch higher. And a 24-day gap between advisory publication and database review means "no advisory found" during October was a statement about the queue.

[`🔗 GHSA-hff9-5pqw-6w9f`](https://github.com/advisories/GHSA-hff9-5pqw-6w9f) · [`🔗 imgproxy releases`](https://github.com/imgproxy/imgproxy/releases)

---

## 8. OpenSearch's SQL plugin deserialised a client-supplied cursor — 106 days from reservation to disclosure, and read permission is the whole barrier

- **Velocity:** ▮▮ rising
- **Source:** CVE record (assigner `GitHub_M`) · published 2026-10-30T22:22Z
- **Tags:** `cve` `opensearch` `deserialization` `rce` `sql`

`CVE-2026-63393` is arbitrary code execution in the OpenSearch SQL plugin: "a remote authenticated user with basic read/search permissions can provide a crafted `cursor` parameter to the `plugins/sql` endpoint and trigger unsafe deserialization of untrusted data". The 2.x line is affected from `2.8.0.0` until `2.19.6.0`, and 3.x before `3.7.0.0`; fixed in **2.19.6.0** and **3.7.0.0**. The CNA score is **8.7** on `CVSS:4.0/AV:N/AC:L/AT:N/PR:L/UI:N/VC:H/VI:H/VA:H` — the `PR:L` is the whole design of the bug: read-only search permission is the only thing standing between a normal user and server-side execution.

Two record details. It was **reserved 2026-07-16** and **published 2026-10-30** — 106 days between the ID being claimed and the description being readable, so "new vulnerability" and "new record" are again different sentences. The CNA does classify it: **`CWE-502` (Deserialization of Untrusted Data)**, carried in `problemTypes`.

**Why it matters:** unbounded deserialization of a value the client supplies is the same shape as the cursor-handling bugs that keep landing in query engines, and a cursor is the one parameter every paginated API hands back to the caller. If your cluster exposes `plugins/sql`, `PR:L` is not a mitigation — it is "any analyst".

[`🔗 CVE-2026-63393 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-63393) · [`🔗 OpenSearch releases`](https://github.com/opensearch-project/OpenSearch/releases)

---

## 9. OpenDeepWiki shipped its admin signing key in `appsettings.json` — so anyone can mint an Admin token

- **Velocity:** ▮▮ rising
- **Source:** CVE record (assigner `VulnCheck`) · published 2026-10-30T13:18Z
- **Tags:** `cve` `hardcoded-secret` `jwt` `dotnet` `self-hosted`

`CVE-2026-119597`: OpenDeepWiki through **2.0.6** carries a **hard-coded JWT signing key**, and the record names the file — `Jwt:SecretKey` in `appsettings.json` — as "publicly known". An unauthenticated attacker mints HS256 bearer tokens with an `Admin` role claim and reaches `/api/admin`, controlling "users, roles, repositories, settings, and API keys". The record carries **two scores on two vectors**: **9.3** at CVSS 4.0 (`AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H`) and **9.8** at 3.1 (`AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H`) — same CNA, same bug, two frameworks, and the 0.5 gap is the frameworks, not a disagreement about what happened.

The record is unusually complete for a shipped-secret finding: `references[]` points at the offending line in `appsettings.json`, the `Program.cs` that consumes it, the fixing commit, and the upstream issue (#403). It was **reserved and published the same day** — 11:46Z and 13:18Z, under two hours. The repo is still at 3,651 stars, MIT, last pushed 2026-10-23.

**Why it matters:** a default signing key is the failure mode where "self-hosted" makes things worse, because every deployment inherits the same secret and the exploit is a `curl`. The dual-score record is also a useful reminder: 9.3 and 9.8 both being right is the normal case now, and quoting either without its CVSS version is the error.

[`🔗 CVE-2026-119597 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-119597) · [`🔗 AIDotNet/OpenDeepWiki — fixing commit`](https://github.com/AIDotNet/OpenDeepWiki/commit/1bf0f4b5ef8d972ca640e5df145b5813a9492544)

---

## 10. Vercel Labs ships `agent-desktop` 1.0: agents drive real apps through the accessibility tree, with no pixel matching

- **Velocity:** ▮▮ rising
- **Source:** GitHub · 3,979 stars · v1.0.0 2026-10-28, v1.0.2 2026-10-30
- **Tags:** `agent-infra` `computer-use` `rust` `accessibility` `desktop`

`vercel-labs/agent-desktop` (Apache-2.0, Rust, created 2026-02-19) is a CLI and C library for macOS, Windows and Linux that gives an agent "computer use for AI agents: read and operate desktop apps through the OS accessibility tree". A snapshot returns JSON with a ref for every actionable element; the agent acts on a ref, then snapshots again — "The agent acts on a ref and snapshots again to check, with no pixel matching; the loop stays in your agent." The design choice that matters: "Ref actions go through the accessibility API without moving the pointer or taking focus", and it is **headless by default**, with a `--headed` flag for physical input.

The failure modes are typed rather than vague, which is the sign of a harness built against real use: refs are snapshot-scoped, so a changed UI returns `STALE_REF` or `AMBIGUOUS_TARGET` and the remedy is a fresh snapshot; multiple windows produce `AMBIGUOUS_TARGET` unless a window id is supplied; macOS needs Accessibility permission and "The host exits after 15 idle minutes", with `TMPDIR` required to be mode `0700`. It went 1.0.0 → 1.0.2 inside 72 hours.

**Why it matters:** screenshot-and-click is the part of computer use that cannot be made reliable, and an accessibility tree is the part that can — refs are stable and actions are safe to retry. Two warnings belong with the feature: "Snapshots, clipboard reads, screenshots, command output and debug artifacts can contain private desktop content," and "The optional JEV helper sends screen descriptions to a configured model provider" — a network path the native CLI does not have.

[`🔗 vercel-labs/agent-desktop`](https://github.com/vercel-labs/agent-desktop) · [`🔗 Releases`](https://github.com/vercel-labs/agent-desktop/releases)

---

## 11. Molly has shipped nothing since July 31 while mainline Signal fixed the bug in 8.27 — and the repo has exactly one commit since

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 259+ pts · ~10h ago (~18:23 UTC+8)
- **Tags:** `signal` `fork` `supply-chain` `maintenance` `messaging`

The claim is that Molly, the hardened Signal fork, "has not been updated since 3 months and is vulnerable to attacks fixed in mainline Signal" — specifically an October-disclosed flaw that could leave audio, and possibly video, running after a call ends, fixed upstream in **Signal 8.27**. The numbers check out at the source rather than in the post: Molly's newest release is **`v8.19.2-4`, published 2026-07-31T11:56Z**, and since that tag the default branch has **one commit** — `2026-09-08T08:32:13Z`, a CI change that tracks the upstream stable release in the sync workflow. The repo itself is not abandoned (`pushed_at` 2026-10-30), it just has not cut a build in three months. No CVE is assigned to the Signal bug.

**Why it matters:** a privacy fork's entire value proposition is that it tracks upstream *faster* than you can audit upstream yourself; a three-month release gap inverts that and leaves you on a base you cannot patch. The measurable quantity is not whether the repo is alive but when users last received a binary — and here those two answers are 91 days apart.

[`🔗 Molly — releases`](https://github.com/mollyim/mollyim-android/releases) · [`🔗 Discussion thread`](https://piefed.world/post/1503394)

---

## 12. Orkas puts 16 specialist agents and a Commander on your desktop — MIT, local-first, and the open build drops the cloud features

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · 6,051 stars · 1,118 today · created 2026-04-29
- **Tags:** `multi-agent` `desktop` `local-first` `mit` `orchestration`

`Orkas-AI/Orkas` is "an open-source (MIT), local-first AI team for your desktop: a Commander turns your goal into to-dos and coordinates 16 built-in specialist agents plus Claude Code, Codex, OpenCode, OpenClaw and Hermes". 820 commits since 2026-04-29, 366 forks, **7 open items (3 issues, 4 pull requests)**, and a marketplace listing "30+ agents". It ships project memory, scheduled automations, and connectors for Gmail, Notion, Slack, Shopify and Stripe, and the packaged app includes "500 credits for the built-in Orkas model".

The README is unusually precise about what the open build is not: shared projects, cloud sync and web-app publishing "the open-source build doesn't support them yet", and the packaged app needs a sign-in. Automations need the machine awake and the app running; missed runs are recovered only "within 12 hours when the computer wakes or Orkas starts". Linux runs from source, "with no installer yet", and "Alpine and other musl-based distributions are not supported". On task honesty: "an admitted or queued task is not treated as a completed result."

**Why it matters:** the interesting part is not the agent count, it is that the desktop-orchestrator category has settled on a stable architecture — a planner that writes todos, specialists that execute, an external-CLI bridge — and is now competing on packaging and connectors rather than on orchestration research. Seven open issues on 6,051 stars is the number to watch: it describes a young backlog, not a hardened runtime.

[`🔗 Orkas-AI/Orkas`](https://github.com/Orkas-AI/Orkas) · [`🔗 GitHub Trending (daily)`](https://github.com/trending?since=daily)

---

## 13. Youtu-Parsing-Omni puts ten parsing tasks through one encoder and one schema — 96.96 on OmniDocBench v1.6 from a 5B checkpoint

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.39301 · 67 upvotes on HF Papers
- **Tags:** `research` `multimodal` `document-parsing` `audio` `video`

Youtu-Parsing-Omni is an omni-modal parser turning documents, images, audio and video into "structured records grounded in space and time", intended as "a perception layer for agents that read, locate, and cite evidence across modalities". The design is two invariants: **one encoder for every modality** (initialised from a pre-trained language model to strengthen text reading, encoding everything "with shared weights in a unified space-time coordinate system") and **one schema for every task** (`OmniSchema` unifies ten parsing tasks so a single post-training procedure, OmniSchema-Aware On-Policy Distillation, can serve all of them).

The single **5B** checkpoint reports state of the art on **OmniDocBench v1.6 at 96.96 Overall**, leads open-weight models on **OmniParsingBench at 75.08 Avg.** — "with its advantage concentrated on audio and video" — takes the best overall chart-parsing score (**95.02**), reports "the highest exact chemical-fingerprint agreement among compared systems", and "matches a dedicated optical-music model in character-level transcription of typeset sheet music while staying far ahead of general-purpose systems".

**Why it matters:** "with its advantage concentrated on audio and video" is doing a lot of work — it means the document-leaderboard number and the multimodal claim are measuring different things, and the case for one-encoder is made on the modalities where nobody competes. Code and weights are public, which makes the specific claim checkable rather than citable.

[`🔗 arXiv 2610.39301 — Youtu-Parsing-Omni`](https://arxiv.org/abs/2610.39301) · [`🔗 HF Papers (trending)`](https://huggingface.co/papers/2610.39301)

---

## 14. PAPERBENCHX asks agents to reproduce 93 real papers — the best configuration fully reproduces 14%

- **Velocity:** ▮ steady
- **Source:** arXiv 2610.39744
- **Tags:** `research` `benchmark` `agents` `reproduction` `science`

PAPERBENCHX is a benchmark of **93 expert-constructed paper-reproduction tasks across 12 research areas** — electromagnetics, photonics, chemistry, materials science, biology, robotics — where "each task provides the source paper, a public task specification, and a domain-native scientific environment involving specialized scientific software". The evaluation is the strict part: "we replay every submission from scratch and score only regenerated evidence against expert-validated criteria", so a plausible write-up earns nothing. Across **10 frontier agent configurations**, "the best configuration fully reproduces only **14%** tasks under the 90% threshold", while "mean rubric scores range from 27.53% to 59.08%".

That spread is the finding. Agents routinely get more than half the rubric and rarely finish, which the authors read as "a large gap between paper understanding and reliably producing reproducible scientific evidence" — partial progress "rarely translates into complete scientific reproduction".

**Why it matters:** existing reproduction benchmarks concentrate on machine learning, where every experiment shares a stack; this one makes agents drive domain-specific scientific software, diagnose long-running computations, and distinguish valid evidence from plausible output. The 14%-under-90% framing is also the honest one — publishing the mean rubric alone would have reported a 59% capability that does not exist.

[`🔗 arXiv 2610.39744 — PAPERBENCHX`](https://arxiv.org/abs/2610.39744) · [`🔗 Full text (arXiv HTML)`](https://arxiv.org/html/2610.39744v1)

---

## 15. GPT-5.6 Sol launched a Factorio rocket in 13.5 game-hours — and the post says much of it was ferrying supplies by hand

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 74+ pts · ~1h ago (~02:50 UTC+8)
- **Tags:** `agents` `benchmark` `codex` `games` `long-horizon`

Ryan Madden ran "GPT-5.6 Sol, running in Codex with low thinking level" against a full Factorio run with a manager layer and a small Python library enforcing reach and fog-of-war, targeting "complete a peaceful (i.e. no biters) Factorio run in 13.5 hours of game time". It ended with a rocket launch, with "production statistics throughout the game" charted and annotated by science milestone.

The caveats are stated rather than discovered by commenters. Peaceful mode means no biters, so no defence task. The run outlasted its plan — Madden "had planned to terminate the run after blue science research" and continued because of "Sol's surprising effectiveness" — but later scaling "slowed Sol's relative progress significantly". And: **"The rocket launch was only achieved through significant 'manual' effort on Sol's part"**, working around "failures to connect certain production systems" by "repeatedly ferrying supplies between areas of the factory". The comparison point is GPT-5.5's "failures to use transport belts at all".

**Why it matters:** this is long-horizon agency measured on a task with a real end state, and the honest result is that the model recovered from a structural failure by doing the dumb thing many times. That is genuine persistence and not planning — worth separating, because the run succeeds either way and only one of them generalises.

[`🔗 GPT-5.6 Sol can beat Factorio on peaceful mode`](https://ryanmadden.net/gpt-56-beats-factorio/) · [`🔗 Discussion (Hacker News)`](https://news.ycombinator.com/item?id=50318871)

---

## 16. kube32 runs a Kubernetes control plane and a Wasm pod runtime on an ESP32-S3 — 2 MB of PSRAM, `kubectl` over Wi-Fi

- **Velocity:** ▮ steady
- **Source:** Hacker News (Show HN) · 50+ pts · ~2d ago
- **Tags:** `kubernetes` `esp32` `wasm` `embedded` `apache-2`

`arterialist/kube32` is an Apache-2.0 Kubernetes-compatible control plane, kubelet agent and WebAssembly pod runtime for ESP32 microcontrollers — 27 stars, created 2026-10-26. Its own repository summary calls it "Kubernetes-compatible control plane, Kubelet agent, and WebAssembly runtime for ESP32 microcontrollers". "Pods are WebAssembly modules executed by the wasm3 interpreter", and "One firmware image runs on every board": the control plane needs "ESP32-S3, 8 MB flash, 2 MB or more quad SPI PSRAM" while "Any ESP32-S3 with 8 MB flash" can join as a worker. It serves the Pod, Node, Namespace, Service, EndpointSlice, Ingress, Deployment, DaemonSet, Job, ConfigMap, Secret, Lease, Event and metrics APIs "including watch streams, Table output, OpenAPI v3 validation, and log tailing", with service routing, HTTP ingress, PVC-style volumes, restart backoff, optional bearer auth, "automatic self-signed ECDSA P-256 TLS on port 6443", and firmware rollouts. `kubectl` and `k9s` drive it over Wi-Fi or USB serial, and a macOS/Linux simulator (`kube32-sim`) is included.

**Why it matters:** the README claims compatibility, not conformance, and does not list unsupported APIs — so read the API reference before assuming a controller will work. What is genuinely useful is the shape: an API server small enough for 2 MB of PSRAM is a test of how much of Kubernetes is the protocol versus the machinery, and the answer this project argues for is that most of the protocol fits.

[`🔗 arterialist/kube32`](https://github.com/arterialist/kube32) · [`🔗 Show HN discussion`](https://news.ycombinator.com/item?id=50291812)

---

## 17. bootgpt boots a neural network out of the master boot record — 11.5 KB of int8 weights in 23 sectors

- **Velocity:** ▮ steady
- **Source:** Hacker News (Show HN) · 11+ pts · ~7h ago (~20:58 UTC+8)
- **Tags:** `llm` `bootloader` `quantization` `assembly` `tiny`

A character-level model that "boots your PC": the MBR is 512 bytes of handwritten assembly with 510 usable, and "It loads an 11.5 KB int8 model from the next 23 sectors and runs it in 16-bit real mode on a 386." "The boot sector is code only" — "Strings, weights and the vocab table all live in the data sectors" — and the net is char embeddings, one hidden layer, and softmax, quantized to int8 with power-of-two scales. It does exactly one thing: "hallucinating the boot log of the machine it wakes up on", generating timestamps, PCI bars and "ACPI events for hardware that never existed". Any keypress reboots the machine. MIT, 3 commits, 6 stars.

The author does not oversell it: "With 8 chars of context and one hidden layer this is roughly the quality you get", and "the model is not a general story teller". Training corpus is 3 MB of synthetic fake `dmesg`, one kernel version, one disk per boot session.

**Why it matters:** this is the floor of the deployment spectrum, and it is a useful one — an 11.5 KB model in a boot sector is a sanity check on what "model size" claims actually buy. The interesting artifact is not the text quality, it is that the weights, vocabulary table and inference loop fit in the slack between an MBR and the first partition.

[`🔗 kerlenton/bootgpt`](https://github.com/kerlenton/bootgpt) · [`🔗 Show HN discussion`](https://news.ycombinator.com/item?id=50315782)

---

## 18. ziwei-doushu ships 674,976 charts and 8.7 million readings as an open dataset — and names the 2,520 samples with dates that do not exist

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · 12,227 stars · created 2026-05-01
- **Tags:** `dataset` `typescript` `astrology` `chinese-oss` `licensing`

`Renhuai123/ziwei-doushu` is an open Zi Wei Dou Shu charting engine and data snapshot built on Ni Haixia's *Tianji* system, and its v4.0 interpretation dataset is the scale story: **674,976 charts × 13 dimensions = 8,774,688 readings**, "约 204 亿字" (about 20.4 billion characters), **56.6 GB uncompressed / 161 MB compressed**, 77 yearly files covering 1950–2026. v3.0 adds 518,400 records covering 1924–1983 at 33.1 GB. The engine itself handles the 14 major stars, auxiliary stars, decadal and annual cycles, four transformations, twelve shensha, true-solar-time correction, 1986–1991 China DST detection, four leap-month conventions and a "1100+ 行格局知识库" — 1,100+ *lines* of rules, not 1,100 named patterns. Code MIT, datasets CC BY 4.0, classical texts public domain, Ni's lecture excerpts CC BY-NC-SA (non-commercial) — and the README says those excerpts are excluded from the dataset licence even where they appear inside interpretations.

The disclosure is what makes it citable. The UI is a demo: "本仓库的界面是一套最小可运行示例". v4.0 is natal-chart only and "未按出生地做真太阳时校正". It was generated with the old brightness default ("按旧默认「现代修正 v2」生成") while the engine now defaults to *Quanshu*, so labels and readings diverge. And v3.0 carries roughly 2,520 samples whose dates do not exist — February 30 and non-leap February 29 — which duplicate the March 1–2 samples and should be filtered.

**Why it matters:** a 56 GB synthetic corpus is the kind of thing that gets re-published downstream without its README, and this one publishes the defect list in advance: non-existent dates, a brightness default that no longer matches the engine, and a licence carve-out sitting inside the data. The engine is also not a maintained product — the README says so — which is the honest version of ship the algorithm, not the product.

[`🔗 Renhuai123/ziwei-doushu`](https://github.com/Renhuai123/ziwei-doushu) · [`🔗 GitHub Trending (daily)`](https://github.com/trending?since=daily)

---

## 19. dsh-purge patches DeepSeek's own harness to swap jailbreak prompts — Apache-2.0 with a no-resale clause

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · 14,529 stars · 6,665 this week · Apache-2.0
- **Tags:** `jailbreak` `harness` `licensing` `deepseek` `plugins`

`YuJunZhiXue/dsh-purge` describes itself as a "cybersecurity red-team plugin for the official DeepSeek Harness", targeting DSH 0.2.1-rc.2 and 0.2.0 on the official web and desktop builds. Mechanically it is a local package patch, not a service: "apply" backs up matched `@deepseek-ai` files as `.dshpurge.bak`, replaces them, overrides the shim, and injects a bundled prompt. Each turn the prompt is chosen from `prompt-inject.md` if non-empty, else a local `AGENTS.md`/`CLAUDE.md`, else "the encrypted prompt shipped in the plugin, the text the prompt box shows by default". A workspace policy of strict/fallback/always controls whether the DSH baseline section is kept. The open build "only allows localhost/private nets".

The licence is the part to read twice. It is Apache-2.0 **with added conditions**: "Forks and redistributions must keep the copyright notice and NOTICE", "Forks must attribute and name the source repository", and "The original build may not be resold" — no rebranded store listings, no group sales, and attribution required for borrowing the name, ideas, code or prompts.

**Why it matters:** a repo that patches a vendor's own installed packages is the sharpest form of the harness-extension question — it does not ask the vendor for permission and it does not survive an upgrade. And "Apache-2.0" plus a non-resale clause is not Apache-2.0; the licence field says one thing and the README says another, which is exactly the distinction that matters if you plan to redistribute.

[`🔗 YuJunZhiXue/dsh-purge`](https://github.com/YuJunZhiXue/dsh-purge) · [`🔗 GitHub Trending (weekly)`](https://github.com/trending?since=weekly)

---

## 20. SAP's exploit window collapsed from 489 days to 1–3 — and the median quietly merges "exploited" with "a PoC exists"

- **Velocity:** ▮ steady
- **Source:** Onapsis Research Labs + Recorded Future · published 2026-10-29
- **Tags:** `sap` `exploitation` `ransomware` `threat-intel` `methodology`

The joint "Days to Zero" report measures the gap from SAP Security Note to first public exploitation: for flaws patched in **2025–2026** the median is **1–3 days**, against **489 days** for 2021 patches, over "more than 1.2 million threat-intelligence events" from 2023 through H1 2026. Underground documents mentioning SAP went from 419 (2023) to **933 (2025)**, +123%; ransomware and extortion groups in SAP-relevant content from eight to **26**, with 30 appearing at least once over the period. Qilin's encryptor terminates SAP background services before encrypting, and 11 Qilin leak-site victims had exfiltrated files "explicitly labeled 'SAP'" across a 40-day stretch in early 2026. Compromised SAP access sells for **$500–$30,000**.

The methodology is where the headline needs care, and the coverage states it: the public summary "does not provide the sample size behind each annual median", the median "combines two milestones: verified public exploitation and publication of a proof-of-concept", a public demonstration "is not necessarily evidence of an attack against a production system", and the figures cover vulnerabilities "with observed milestones, rather than every SAP vulnerability". The document and group counts "do not represent a count of successful SAP breaches".

**Why it matters:** 489 → 1–3 is the right direction and probably the right magnitude, and it is a *definition* change as much as a threat change — a 2021 median counted only confirmed exploitation, while the 2026 number credits a published PoC. The operational conclusion survives either reading: if the patch-to-exploit gap is days, quarterly patch cycles are measuring the wrong interval.

[`🔗 ERP News — SAP exploit window shrinks to days`](https://erpnews.com/sap-exploit-window-shrinks-to-days-onapsis-and-recorded-future-research-finds/) · [`🔗 Onapsis — Days to Zero (report event)`](https://onapsis.com/event/days-to-zero-recored-future-research-onapsis/)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-10-31T20:35:33Z |
| Items | 20 |
| Sources tracked | 14 (GitHub Trending, Hacker News, arXiv, Hugging Face, NVD/CVE records, vendor advisories, security research) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[Previous day](2026-10-31.md) · [Raw .md](https://trending.md/en/feed/latest.md) · [Archive](../archive/)
