---
date: 2026-11-05
updated: 2026-11-04T20:30:18Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 26
license: CC-BY-4.0
---

# Trending — 2026-11-05

## 1. Kimi K3.1-Pro puts 2.8T of open weights on Hugging Face under a licence that is not open source

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 234 pts · ~5h ago (~23:30 UTC+8)
- **Tags:** `ai-models` `open-weights` `moonshot` `licensing` `moe`

Moonshot's `moonshotai/Kimi-K3.1-Pro` repository was created on **2026-11-02T04:13:51Z** and reached Hacker News' front page two days later. The card describes a **2.8T-parameter** mixture-of-experts model with **104B activated**, **93 layers**, **896 experts** (16 selected per token, 2 shared), a **1,048,576-token** context window, a **MoonViT-V2** vision encoder at 401M parameters and a 160K vocabulary — quantized as "MXFP4 weights / MXFP8 activations" with quantization-aware training. The repo is not gated: **96 safetensors shards** summing to **1,563,293,160,568 bytes (1.56 TB)**, plus custom `kimi_k3` modelling code. It had **797 downloads and 388 likes** when we read it.

The card's benchmark table is evaluated at maximum reasoning effort, temperature 1.0 and top-p 0.95: Terminal-Bench 4.0 **65.7**, SWE Marathon v1.1 **51.7**, BrowseComp **92.1**, OSWorld V2.1 **79.6**, GPQA-Diamond **94.2**, HLE-Full **51.1**, ExploitBench **74.7**. Its own caveats say that "Elo scores and other benchmark-specific metrics are not directly comparable with accuracy or pass-rate scores", that some evaluations were internal or tool-assisted, and that PostTrainBench ran on H20 rather than H100 with a substitute judge.

The licence file is the part worth reading. It grants use, modification, distribution and sublicensing, then attaches two conditions: §2 requires a separate agreement with Moonshot if a Model-as-a-Service business exceeds **$20M** in any 12-month period, and §3 requires that `"Kimi K3.1-Pro"` be "prominently displayed on the user interface" of any product with more than **100M monthly active users** or more than **$20M in monthly revenue**. Section 4 exempts internal use and access through Moonshot's own products or certified inference partners.

**Why it matters:** this is downloadable weights with a scale-triggered attribution clause, not an OSI-approved licence — so "open-weight" is literally true and "open source" is not, and the two get used interchangeably in coverage. The 1.56 TB checkpoint size is also the number that decides who can run it at all, which is why a C reimplementation streamed from disk trended the same day (item 12).

> "A dash (`—`) means that the source table does not report a score." — the model card's own note on its benchmark table

[`🔗 moonshotai/Kimi-K3.1-Pro`](https://huggingface.co/moonshotai/Kimi-K3.1-Pro) · [`🔗 LICENSE`](https://huggingface.co/moonshotai/Kimi-K3.1-Pro/raw/main/LICENSE) · [`🔗 Hacker News submission`](https://news.ycombinator.com/item?id=50366999)

---

## 2. Debian's apt would install an attacker's package — as root — after one redirect and the retry it does by default

- **Velocity:** ▮▮▮ trending
- **Source:** Debian Security Announce · NVD record 2026-11-04T16:17Z · 117+91 pts on HN
- **Tags:** `cve` `linux` `apt` `mitm` `supply-chain`

`CVE-2026-109518` is titled — in the CNA record's own `title` field — **APT RCE via hard link reuse**. The record describes an on-path attacker who "can manipulate the HTTP traffic (including a malicious mirror or proxy) between an APT client and an archive server triggered by a package install" and thereby "trick the client into installing an attacker-controlled unverified package and achieve remote code execution with root privileges". Debian's advisory credits Max Justicz and fixes it in apt **3.0.4** for trixie.

The exposure condition is unusually specific and unusually common: the record says the bug "requires the client to follow redirects and retry the download of package files. It requires the client to have a non-zero `Acquire::Retries` configuration setting; the value 3 is the default starting with Debian 12 (bookworm) and Ubuntu 22.04 LTS (Jammy Jellyfish), so older releases are unaffected in a default configuration."

Provenance, because it decides which number you quote: Canonical is the CNA, and the only score on the NVD record is **CVSS 4.0 7.7 from `security@ubuntu.com`** (`AV:N/AC:L/AT:P/PR:N/UI:P/VC:H/VI:H/VA:H`); NVD's status is `Received` and it has published no metric of its own. The GitHub Advisory Database record `GHSA-jw32-37xr-xwfw` carries the same 7.7 — but only in `cvss_severities.cvss_v4`, while its legacy `cvss` object is null and its `cvss_v3` slot holds `{score: 0.0, vector_string: null}`. Reading the legacy field would report this record as unscored, and reading the 0.0 as a score would report it as zero. (The Debian announcement at `lists.debian.org` now answers our clients with a JavaScript proof-of-work challenge, so the quoted text here comes from the CVE record, which carries the same description in machine-readable form.)

**Why it matters:** a root-executing supply-chain bug scored 7.7 is the clearest illustration of how v4.0 discounts a vector with `AT:P` and `UI:P` — the attacker must be on-path *and* an upgrade must be in flight — while the consequence stays root-level code execution. And because the retry default is what makes it exploitable, the population at risk is the one that upgraded to a modern release, not the stale install.

[`🔗 CVE-2026-109518 record`](https://www.cve.org/CVERecord?id=CVE-2026-109518) · [`🔗 Ubuntu CVE-2026-109518`](https://ubuntu.com/security/CVE-2026-109518) · [`🔗 Debian DSA`](https://lists.debian.org/debian-security-announce/2026/msg00526.html)

---

## 3. Anthropic's FlashProve verifies an inference in 19 MB of proof — at 70–95× the cost of just running it

- **Velocity:** ▮▮▮ trending
- **Source:** anthropic.com/research · 2026-11-04 · 122 pts on HN
- **Tags:** `ai-research` `zkproof` `inference` `anthropic` `verification`

Anthropic released **FlashProve**, an open-source research prototype that uses zkSNARKs to prove a specific model produced specific output tokens. A provider commits to its weights, then proves that the committed model generated the tokens; the release includes a prover, a fast C++ verifier, a Lean verifier, Lean proofs, a protocol specification and documentation. It targets mixture-of-experts models and keeps weights hidden — though not the architecture.

The measured run is on **Llama 4 Maverick** (400B-parameter MoE, 4-bit weights): on a single H100 the prover generated proofs at about **110 tokens/second** with roughly **19 MB of proof per 1,024-token request**; verification took **17 seconds on 24 threads** and **21 seconds on one thread**. The offline commitment phase took about **39 minutes** and stayed valid for roughly **16 million requests**. Proving cost roughly **70–95×** the GPU time of ordinary vLLM inference.

The post lists its own limits plainly, and they bound the claim more than the throughput number does: "This release is a research prototype"; "The proof is about an integer model under greedy decoding"; "Our system assumes the served model uses a Mixture-of-Experts (MoE) architecture"; "The system currently proves inference over contexts of up to 1,024 tokens"; and, of the three artifacts, "we do not guarantee that all three (Lean, paper, code) match each other." Side channels "could potentially reveal information about the weights" and are out of scope.

**Why it matters:** watermarking asks a model to leave a trace; this asks a provider to prove a claim about which weights ran, without showing them. That is a different primitive, and the 70–95× overhead plus the 1,024-token ceiling are what decide whether it is a research curiosity or something a serving stack could afford on every request.

[`🔗 Anthropic: Progress on provable inference`](https://www.anthropic.com/research/provable-inference) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=50368626)

---

## 4. GitHub's Pull Requests, Git operations and Issues degraded for two hours — and the incident has no root cause yet

- **Velocity:** ▮▮ rising
- **Source:** githubstatus.com · incident 2026-11-04 09:49–11:50 UTC · 228 pts on HN
- **Tags:** `github` `outage` `dev-infra`

GitHub opened an incident at **09:49 UTC** on 2026-11-04 for "degraded performance for Git Operations, Issues and Pull Requests". It escalated quickly: Actions degradation at **09:50**, Pull Requests availability at **09:53**, API Requests at **11:11**. Core services were reported mitigated at **11:30** and Actions at **11:43**; the incident was resolved at **11:50 UTC** — **2 hours 1 minute** end to end.

No cause was published. The status page says a "detailed root cause analysis will be shared as soon as it is available."

**Why it matters:** this is a separate incident from the October 31 Actions/Pages/Webhooks degradation (17:50–19:23 UTC), and the overlap is instructive rather than repetitive — Actions appears in both, which is what you would expect if agent-driven CI now dominates that surface. What the feed can say without overreach: five services reported, two hours, no cause named.

[`🔗 GitHub Status incident`](https://www.githubstatus.com/incidents/smtdswd1h2w4) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=50363378)

---

## 5. Tencent's Hy4 ships computer use and withholds the weights its own preview published

- **Velocity:** ▮▮ rising
- **Source:** SiliconANGLE · 2026-11-04 · 104 pts on HN
- **Tags:** `ai-models` `tencent` `open-weights` `computer-use`

Tencent released **Hy4** on 2026-11-04, adding "computer-use capabilities for the first time" through "advanced visual understanding, reasoning and tool-calling", with a 1M-token context window and integrations for Unreal Engine, Unity and Godot. Availability runs through Tencent Cloud TokenHub, WorkBuddy, CodeBuddy, Yuanbao, WeCom and Ima, plus third parties including OpenRouter.

Two caveats decide how to read it. First, the parameter figures circulating — **770B total, 49B active** — are Hy4 *Preview*'s, not separately stated for the GA model; Tencent's own `hy.tencent.ai/research/hy4` page answers as a 6 KB document with **10 characters of visible text**, and none of the sibling `.md`, `?format=md`, `?format=json` or `llms.txt` probes returned anything but the same shell, so we could not read the GA spec first-hand. Second, the improvement claims (GameDev **+19.1%**, GameLogic **+9.8%** over the preview) come with internal baselines: "actual baseline numbers remain internal and weren't released."

The weights are the sharpest contrast. Hy4 **Preview** is on Hugging Face as `tencent/Hy4-preview`, created **2026-08-27**, tagged **`license:apache-2.0`**, with 533 likes and 11,399 downloads. There is no `tencent/Hy4` and no GA system card in the org's listing at the time of writing; Tencent says it "intends to release the model weights and system cards in coming days."

**Why it matters:** two releases eleven weeks apart, one Apache-2.0 and downloadable, one closed pending a promise — so a headline that calls Hy4 open-weight is describing the older artifact. The unpublished baselines compound it: a delta with no denominator is a number you cannot check.

[`🔗 hy.tencent.ai/research/hy4`](https://hy.tencent.ai/research/hy4) · [`🔗 tencent/Hy4-preview (Apache-2.0)`](https://huggingface.co/tencent/Hy4-preview) · [`🔗 SiliconANGLE report`](https://siliconangle.com/2026/11/04/tencent-releases-hy4-powerful-frontier-llm-introducing-visual-understanding-and-computer-use/)

---

## 6. Go 1.27 makes encoding/json/v2 stable — and unmarshal gets up to 10× faster while marshal stays put

- **Velocity:** ▮▮ rising
- **Source:** go.dev/blog · 2026-11-04 · 95 pts on HN
- **Tags:** `go` `json` `standard-library` `release`

Go 1.27 ships stable **`encoding/json/v2`** and **`encoding/json/jsontext`**. `jsontext` handles syntax and streaming; `v2` handles semantic conversion, per-call options and streaming interfaces such as `MarshalerTo`/`UnmarshalerFrom`, with `WithMarshalers`/`WithUnmarshalers` to override serialization per type. `RawMessage` becomes an alias of `jsontext.Value`.

The behavioural changes are the ones that bite, and the post states them as a list: "`v2` reports an error in the presence of invalid UTF-8"; "`v2` reports an error if a JSON object contains a duplicate name"; "`v2` marshals a nil Go slice or Go map as an empty JSON array or JSON object, respectively"; "`v2` unmarshals a JSON object into a Go struct using a case-sensitive match from the JSON member name to the Go field name". `omitempty` now keys off empty JSON values, and `time.Duration` has no default serialization unless configured.

Performance is asymmetric: "The `Marshal` performance of `v2` is roughly at parity with `v1`" — "Sometimes it is slightly faster, but other times it is slightly slower" — while unmarshal gains "up to 10x", with more expected in Go 1.28. Migration is optional: "Applications using `v1` will continue to be supported indefinitely and need not ever migrate to `v2`," and `v1` is implemented on top of `v2`, so new interfaces reach existing callers.

**Why it matters:** the duplicate-name and invalid-UTF-8 errors are the interesting half. Those inputs were silently tolerated by `v1`, which means some services have been accepting ambiguous JSON for years and only find out when they switch — the performance chart is the part everyone reads, and the semantics are the part that changes behaviour.

[`🔗 Go blog: A new Go API for JSON`](https://go.dev/blog/jsonv2) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=50369106)

---

## 7. Sogou's input method fetched its config over plain HTTP, so a state actor made the ad slot deliver DarkVigil

- **Velocity:** ▮▮ rising
- **Source:** ESET WeLiveSecurity · CVE-2026-120422 published 2026-11-04T10:17Z
- **Tags:** `cve` `malware` `espionage` `supply-chain` `eset`

ESET published its account of **SlippyNunchucks**, "a China-aligned threat actor that has been active since at least September 15th, 2023", and the mechanism it used against Sogou Input Method for Windows. `SGTool.exe` retrieves branded-dictionary icon settings from an official Sogou endpoint **over plain HTTP**; when DNS resolution is attacker-controlled, that request goes to staging servers at `47.239.250[.]102` or `47.237.122[.]175`, which return a malicious configuration encrypted the same way as the legitimate one. The configuration's icon fields act as file destinations: one payload replaces `SogouComMgr.exe`, another lands in a BizCenterCom version directory, alongside "the legitimate and signed Adobe Licensing WF Helper, renamed to `biz_helper.exe`" and DarkVigil as `libcef.dll`. Sogou's own component-loading workflow then runs the Adobe binary, which side-loads the DLL — "resulting in execution of the DarkVigil implant."

ESET also found "20 request endpoints on this host that the application accesses over unencrypted HTTP rather than HTTPS." `CVE-2026-120422` carries ESET's **CVSS 4.0 8.9** (`AV:N/AC:L/AT:P/PR:N/UI:P/VC:H/VI:H/.../V:D`) as the only metric on the NVD record, whose status is **`Deferred`** — NVD is not currently analyzing it.

Stated limits, and one the source contradicts itself on: "The point at which DNS manipulation occurs remains unknown" — router compromise and ISP interception are possibilities, not findings. The article names targets in Hong Kong, Thailand, Japan, Vietnam, Oman and Sri Lanka but gives **no victim or infection count**, so telemetry geography is not prevalence. Tencent fixed it in Sogou **16.10**, migrating the HTTP requests to HTTPS with certificate pinning; ESET reported on 2026-09-11 and Tencent acknowledged on 2026-09-21. The fix date appears twice in the post and disagrees with itself — "On October 29th, 2026, Tencent released version 16.10" in one place and "on October 30th, 2026" in another.

**Why it matters:** the delivered payload rode a first-party update-adjacent channel — a brand-promotion config — which means the defence was neither a signature nor a patch to the app's own code but moving 20 endpoints off HTTP. And the CVE record's `Deferred` status means scanners keyed to NVD analysis will not learn about it from there.

[`🔗 ESET research`](https://www.welivesecurity.com/en/eset-research/slippynunchucks-hijacks-sogou-input-methods-brand-promotion-mechanism-to-distribute-malware/) · [`🔗 NVD CVE-2026-120422`](https://nvd.nist.gov/vuln/detail/CVE-2026-120422)

---

## 8. Traefik's ForwardAuth pool shared one authenticated connection across all clients — and one advisory carries both a 8.7 and a 7.0

- **Velocity:** ▮▮ rising
- **Source:** GitHub Advisory Database · GHSA-6cm8-r9cr-2hc7 published 2026-11-04T18:30Z
- **Tags:** `cve` `traefik` `authentication` `reverse-proxy` `ntlm`

`CVE-2026-121966` affects Traefik **2.x before 2.11.60** and **3.x before 3.7.16**. ForwardAuth subrequests — and, in 3.7, Ingress NGINX `auth-url` requests — are sent "through an auth-server connection pool shared by all clients, exposing connection-bound NTLM or Negotiate authentication." Because NTLM and Negotiate bind identity to the TCP connection rather than to a header, "an unauthenticated attacker can reuse another user's authenticated connection, receiving the victim's identity via `authResponseHeaders` to access backends as that user."

The scoring is the instructive part, because the advisory fills both slots and they disagree. `cvss_v3` is **8.7** (`AV:N/AC:H/PR:N/UI:N/S:C/C:H/I:H/A:N`); `cvss_v4` is **7.0** (`AV:N/AC:L/AT:P/PR:N/UI:N/VC:N/VI:N/VA:N/SC:H/SI:H/SA:N`). The 4.0 vector says there is **no** confidentiality, integrity or availability impact on the vulnerable system at all — everything is scoped to the *subsequent* system (`SC:H/SI:H`), which is exactly right for an identity that is borrowed rather than a component that is broken. The 3.1 vector puts the impact in the vulnerable system and raises the complexity instead.

**Why it matters:** identity confusion through a connection pool is invisible to almost every test you would write — nothing is malformed, no privilege is escalated, the request is simply labelled with someone else's name. And this is a clean worked example of why a 4.0 score can sit two bands below the 3.1 for the same bug: the frameworks disagree about *where* the impact lands, not about whether there is one.

[`🔗 GHSA-6cm8-r9cr-2hc7`](https://github.com/advisories/GHSA-6cm8-r9cr-2hc7) · [`🔗 traefik/traefik advisory`](https://github.com/traefik/traefik/security/advisories/GHSA-hrpp-p4fc-wwf8)

---

## 9. Rails' Active Storage ran ImageMagick on attach — so an upload alone could read secret_key_base

- **Velocity:** ▮▮ rising
- **Source:** rails/rails security advisory GHSA-f3w6-w445-fwh9 · 2026-11-04
- **Tags:** `cve` `rails` `imagemagick` `file-upload` `ruby`

Rails published **GHSA-f3w6-w445-fwh9**, titled *Possible arbitrary file write and read in Active Storage image analysis*, fixed in **8.1.4.1** and **8.0.5.2**, and published as `CVE-2026-122006`. Impact: a Rails app that processes attachments with ImageMagick may let an unauthenticated attacker write arbitrary files on the server and, with the Disk service, read arbitrary files the application process can read — typically `secret_key_base` and external-system credentials, which may in turn allow escalation to remote code execution or lateral movement to those systems.

The mechanism is that ImageMagick selects a coder from the file's content, and some coders act on files named *inside* the image rather than on the image itself. Active Storage constrained none of them, and the ImageMagick analyzer runs at attach time. The advisory's sharpest sentence is that attaching the upload is sufficient: no variant, preview or analyze call is required. Rails also says one specific attack chain was reported to it, and that it does not assume it is the only one that exists.

The fixed versions ship an ImageMagick `policy.xml` and prepend its directory to `MAGICK_CONFIGURE_PATH` through `MiniMagick.cli_env`, denying the MSL scripting coder, file-reading coders, remote references, the Ghostscript-backed coders and the `gs` delegate, and `@filename` indirection.

The affected population is narrower than "Rails": an app qualifies only if it uses `config.active_storage.variant_processor = :mini_magick` (the default for `load_defaults` 6.1 or earlier), runs ImageMagick under a policy that does not already deny these coders — the ones Debian and Ubuntu package do not — and accepts uploads from untrusted users. Apps on vips are outside it. One upgrade trap: a `:mini_magick` app must also be on **mini_magick >= 5.1**, which applying the policy requires; with an older one it "raises an exception during boot".

**Why it matters:** the fix is a config file, not a code change — the vulnerability was that Active Storage never set ImageMagick's policy at all, so every MiniMagick spawn inherited the host's permissive one. The CVSS record is **9.8** from `cve@mitre.org` (`AV:N/AC:L/PR:N/UI:N`), the only metric on a record NVD has at `Received`; the advisory page says **Critical** and carries no separate vector of its own.

[`🔗 GHSA-f3w6-w445-fwh9`](https://github.com/rails/rails/security/advisories/GHSA-f3w6-w445-fwh9) · [`🔗 Rails v8.1.4.1`](https://github.com/rails/rails/releases/tag/v8.1.4.1)

---

## 10. Dory1.0-4B buys 11.5 points of SWE-bench by running the same 20 layers twice

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2611.03998 · submitted 2026-11-01 · weights on Hugging Face
- **Tags:** `ai-research` `looped-model` `nvidia` `efficiency` `benchmarks`

NVIDIA's Nemotron Labs released **Dory1.0-4B**, a 4-billion-parameter "looped (latent-recurrent) language model with elastic depth: a single checkpoint serves different inference compute budgets." The architecture is a normalized Transformer (nGPT) backbone with interleaved sliding-window and full-attention layers, split into input block, a shared recurrent block and output block — "the Input and Output blocks have 8 layers each, while the Recurrent block has 20 layers" — and the recurrent block can be applied a variable number of times *without retraining or swapping the model*.

The benchmark deltas across loop counts are the argument. SWE-bench Verified goes **50.3 → 59.5 → 61.8** at one, two and four loops; Terminal-Bench 2.1 **12.5 → 18.1 → 22.2**; SciCode **27.3 → 34.94 → 35.11**; τ³-bench Banking **11.6 → 12.89 → 14.69**; GDPval-AA-V2 Elo **815 → 946 → 967**. The card is explicit that the curve is front-loaded: "Most of the accuracy gain from looping comes from the second loop, with smaller gains beyond that", with two loops recommended as the default. It was pretrained on 6T tokens, the first ~4.5T in NVFP4, then extended to 256K context, then SFT and multi-environment GRPO.

Three caveats worth carrying: the AA columns are "internal estimates computed under a consistent evaluation harness" that "may deviate from official Artificial Analysis (AA) scores"; the published benchmark results are for the **BF16** checkpoint, not the quantized exports; and serving support is not settled — "Dory support in vLLM is under review", and the llama.cpp path requires building from a branch.

**Why it matters:** elastic depth turns inference compute into a runtime dial on a 4B model, which is a materially different bet from "train a bigger model" — and the honest part is that the gains saturate: the card reports GPQA Diamond at 72.41 with two loops and **72.16** with four.

[`🔗 arXiv 2611.03998`](https://arxiv.org/abs/2611.03998) · [`🔗 nvidia/NVIDIA-Nemotron-Labs-Dory1.0-4B-BF16`](https://huggingface.co/nvidia/NVIDIA-Nemotron-Labs-Dory1.0-4B-BF16)

---

## 11. Since we covered ggml-rpc's second CVE on 2026-10-30, llama.cpp has shipped v0.9.0 — with NCCL multi-node tensor parallelism

- **Velocity:** ▮▮ rising
- **Source:** GitHub release · v0.9.0 tagged 2026-11-04T13:08Z
- **Tags:** `llama-cpp` `ggml` `release` `quantization` `inference`

llama.cpp released **v0.9.0** on 2026-11-04 — the newest of its numbered releases (`v0.1.0` through `v0.9.0`), a line that runs alongside the `b#####` nightly build tags still shipping several times a day. The overview lists **OCP FP8 E4M3** support (saturating mode, new ftype, `LLAMA_FTYPE_MOSTLY_F8_E4M3`), a new **`flash_attn_ext_rows`** op that makes the unified KV cache efficient for multi-sequence inference, "restoring non-unified KV prefill performance", and a batched tensor copy API (`ggml_backend_tensor_copy_n`/`set_n`/`get_n`) superseding the `_2d` API, implemented for Metal and CUDA.

Model coverage widens in four directions at once: four new architectures (**Clover**, **Limite**, **Metis-1.6**, **Mistral Large 4**), audio generation and transcription with **Chatterbox TTS**, **Nemotron 3.5 Transcribe** and predefined Pocket TTS voices, plus "major prefill optimizations" for the Gemma 4 E2B/E4B models. `ggml` moves to **v0.29.0**, which is where the headline capability actually lives — FP8 E4M3, flash attention rows, and **NCCL-based multi-node tensor parallelism**, with performance work across CPU, CUDA, SYCL, Metal, Vulkan, OpenCL and Hexagon backends.

The API breaks are listed rather than buried: `mtmd.h` gains `MTMD_GEN_AUDIO_TYPE_CHATTERBOX`, the predefined-voice functions and `MTMD_VIDEO_TEMPLATE_QWEN3VL`, and `GET /props` now reports the model's predefined TTS `voices`.

**Why it matters:** the two lines to notice are `flash_attn_ext_rows` and NCCL. The first is a fix for a regression the project introduced when it unified the KV cache — the release note says so explicitly — and the second is llama.cpp growing a multi-node story that used to be vLLM's territory.

[`🔗 llama.cpp v0.9.0`](https://github.com/ggml-org/llama.cpp/releases/tag/v0.9.0) · [`🔗 ggml v0.29.0`](https://github.com/ggml-org/ggml/releases)

---

## 12. kimi-k3-in-c runs 2.78T parameters in 8.24 GB of RAM — at 26.5 seconds per token

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending (daily) · 10,183 stars · last push 2026-10-02
- **Tags:** `llm-inference` `c99` `mmap` `open-source` `edge`

`FareedKhan-dev/kimi-k3-in-c` implements Kimi K3 inference in portable C99 — "No BLAS. No framework. No GPU." — and its headline numbers are a **2.78T-parameter** model, a **1.56 TB** checkpoint on disk, **8.24 GB** peak RSS measured, and a **176 KB** engine. That checkpoint figure cross-checks exactly against the shards we summed on the Hugging Face repo in item 1: 96 files, 1,563,293,160,568 bytes.

The design is streaming, not compression. The README's own table gives time per token against RAM: **26.5 s** on an 8 GB laptop where "the whole model streams off the disk on every step", **24.2 s** at 32 GB, **19.8 s** at 64 GB, and **5.6 s** at 128 GB+ where "the model fits entirely in memory, the disk wait is gone". It claims the output is **byte-identical** across all four — "only the clock changes" — and is candid that the runnable demos were captured on a slower drive "so their clock reads a little higher". A captured run in the README shows a 32.69 s/token average for 8 tokens and a correct completion.

The project is **Apache-2.0**, was created **2026-08-01**, last pushed **2026-10-02**, is at **v1.1.0**, and its `CONTRIBUTORS.md` names **20** outside contributors, for the macOS, Windows and NEON ports, chat mode and MXFP4 kernels. It trended the same day the K3.1-Pro weights hit the front page — the repo did not change today; the reason it is being read today is the release.

**Why it matters:** this is the correct mental model for running a frontier model on a laptop — it does not fit, it is re-read from disk on every token, and the memory floor is roughly one expert layer plus the KV cache rather than the model. The interesting engineering is that the answer is deterministic regardless of how much of it you can hold.

[`🔗 FareedKhan-dev/kimi-k3-in-c`](https://github.com/FareedKhan-dev/kimi-k3-in-c) · [`🔗 GitHub Trending`](https://github.com/trending)

---

## 13. PR-Agent now lives under a new org, and its README's third paragraph is a disclaimer about its own former owner

- **Velocity:** ▮▮ rising
- **Source:** GitHub · 14,663 stars · v0.49.0 (2026-10-25) · pushed 2026-11-04T10:11Z
- **Tags:** `agent-infra` `code-review` `open-source` `qodo` `governance`

`The-PR-Agent/pr-agent` is on trending at **14,663 stars** with a README that opens: "This repository contains the open-source PR Agent Project. It is not the Qodo offering for open-source projects." A paragraph later it is more precise — "PR-Agent is an open-source, AI-powered code review agent and a community-maintained legacy project of Qodo" — while Qodo remains the project's **Gold Sponsor** at the top of the same file, with a link to "Free version of Qodo for open-source projects."

The project is not dormant. The latest release is **v0.49.0** (2026-10-25), commits landed on 2026-11-04 (`feat: include PR identity in pushed outputs`, `fix: scope response language instructions to each command`), and the README documents a **Docker Hub namespace migration**: releases **0.34.2 and later** publish under `pragent/pr-agent`, while older releases "up to and including `v0.31`" remain at `codiumai/pr-agent` "as a frozen archive — no new images are pushed there."

**Why it matters:** a popular OSS project changing organisations leaves three artifacts pointing at three names — the GitHub slug, the Docker namespace and the npm/action reference — and only one of them redirects. The README is doing the work that a redirect cannot, which is telling a reader which of two similarly-named products they are actually installing.

[`🔗 The-PR-Agent/pr-agent`](https://github.com/The-PR-Agent/pr-agent) · [`🔗 v0.49.0`](https://github.com/The-PR-Agent/pr-agent/releases/tag/v0.49.0)

---

## 14. Ladybird passed Safari Technology Preview on WPT in October — and shipped a JavaScript JIT for x86-64 and AArch64 only

- **Velocity:** ▮▮ rising
- **Source:** ladybird.org newsletter · 2026-10-31 · 60 pts on HN
- **Tags:** `browser` `ladybird` `javascript` `webassembly` `wpt`

Ladybird's October update is a wall of numbers, and the honest ones are the most useful. On Web Platform Tests it "ended the month at 2,184,722 subtests, a gain of 75,650", and on **October 26** it "passed Safari Technology Preview on WPT" — with most of the gain arriving in five days, "from about 2.12 million on October 22 to about 2.18 million on October 27". The final standings it publishes are Chrome **2,244,397**, Firefox **2,189,315**, Ladybird **2,184,722**, Safari Technology Preview **2,172,990**.

The engine work: style and layout moved off the main thread with paint recording on another (so CSS animations and `:hover` keep running during long JavaScript tasks — "As far as we know, no other browser can do this today"), a JavaScript JIT that compiles hot code to machine code, and a **new WebAssembly engine in Rust** with its own interpreter and JIT replacing the C++ engine and Cranelift. Benchmarks moved accordingly: Speedometer 2 from **84 to 156**, Speedometer 3 from **5.9 to 8.6**, Octane up **4.7×**, Wasm CoreMark up **2.5×**, and the new Wasm engine scores "about 7x higher" on JetStream 3 Wasm workloads both engines can run. JSLinux "now boots Alpine Linux to a shell in 1.8 seconds, while Chrome takes 1.5".

The limits are stated in the same voice. The JIT works "On Linux and macOS … on both x86-64 and AArch64" — nothing else. On ambition: "For now, we just want to go reasonably fast." The 7× figure applies **only** to the workloads both engines can run. Accessibility: "There's still a lot of work to do here." And the alpha is still ahead: "Our first alpha is planned for later this year."

**Why it matters:** passing a browser vendor's own test suite is the first milestone in this project's history that is externally defined and externally scored — and the newsletter's refusal to quote the 7× without its denominator is the difference between a benchmark and an advertisement.

[`🔗 Ladybird newsletter, October 2026`](https://ladybird.org/newsletter/2026-10-31/) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=50369194)

---

## 15. bitcoinjs-lib accepted a forged transaction list for nine years of versions — because a duplicate Merkle node was never reported

- **Velocity:** ▮▮ rising
- **Source:** GitHub Advisory Database · GHSA-8vv3-6qpc-gpw6 · CVE-2026-107846
- **Tags:** `cve` `bitcoin` `merkle-tree` `javascript` `consensus`

`CVE-2026-107846`: "Undetected merkle node duplication in block root computation validates a forged transaction list." In `bitcoinjs-lib`, `fastMerkleRoot` "pads odd Merkle-tree levels by hashing the final node with itself but does not report adjacent duplicate hashes" — the shape of the 2012 duplicate-transaction bug — so "A peer can append duplicate transactions so a different transaction list retains the original Merkle root, block header, proof of work, and block identifier."

The affected ranges run from **2.3.0** — fixed in **5.2.1**, **6.1.8** and **7.0.2** — which is to say the bug spans nearly the library's entire release history. The advisory names the entry point precisely: "The affected block-root verifier was introduced as `Block.checkMerkleRoot()` alongside `Block.calculateMerkleRoot()`, while later versions expose validation through `checkTxRoots()` and `__checkMerkleRoot`; these validation paths can accept a recomputed root without checking for mutation." Consumers listed as exposed: "explorers, exchange indexers, or SPV clients."

Scoring: **CVSS 4.0 9.3** from `security-advisories@github.com` (`AV:N/AC:L/AT:N/PR:N/UI:N/VC:L/VI:H/VA:L/SC:N/SI:H/SA:H`), the only metric on an NVD record still at `Received`.

**Why it matters:** three commits are cited as fixes, and the class is one Bitcoin's own history already contains — the 2012 duplicate-transaction bug that let a node accept a block whose txid list did not match its Merkle root. What is new is the population: a JavaScript library used by explorers and SPV clients, where the same block can mean two different things to two different readers.

[`🔗 GHSA-8vv3-6qpc-gpw6`](https://github.com/bitcoinjs/bitcoinjs-lib/security/advisories/GHSA-8vv3-6qpc-gpw6) · [`🔗 NVD CVE-2026-107846`](https://nvd.nist.gov/vuln/detail/CVE-2026-107846)

---

## 16. Scenario ships 174 agent skills that price a video before generating it

- **Velocity:** ▮ steady
- **Source:** GitHub Trending (daily) · 2,324 stars · MIT · pushed 2026-11-04T18:02Z
- **Tags:** `agent-skills` `mcp` `media-generation` `open-source` `scenario`

`scenario-labs/skills` is an MIT-licensed set of Agent Skills that "teach AI coding agents (Claude Code, Cursor, Codex, Copilot, and 70+ others) how to create production-ready content with Scenario through the Scenario MCP server": images, video, audio, textures, skyboxes, 3D assets and custom-trained models. Neither the README nor the MCP docs states a total, so we counted the git tree ourselves: **174 `SKILL.md` files** across **82 top-level directories** — **80** of the directories are `scenario-*` skills, and the rest of the files sit under `dcc/` (**35**) and `game-engines/` (**52**) in the "expert tools" families, which need ZBrush, Blender, Maya, Unreal, Unity, Godot or Roblox Studio installed rather than the MCP server.

The pitch in the repo's own description field is narrower than "generate media": skills that "pick the right model, price before spending, and keep characters and brands consistent". The skill list backs that up with a long tail of per-provider wrappers — `scenario-veo`, `scenario-seedance`, `scenario-kling`, `scenario-vidu`, `scenario-wan`, `scenario-runway`, `scenario-elevenlabs`, `scenario-meshy`, `scenario-rodin` — alongside workflow skills like `scenario-quality-gate`, `scenario-refine-loop` and `scenario-model-comparison`.

Two operational details are worth copying. Install can be pinned: `npx skills@1.7.4 add scenario-labs/skills#<commit> --skill <name>` — "To install a reviewed state instead, pin both the installer and the commit, taken from a release's tag." And the installer's topic groups "cannot be selected from the command line", because the CLI matches `--skill` against exact skill names only; that limitation is an open upstream issue (`vercel-labs/skills#992`), not a bug in this repo.

**Why it matters:** a skills marketplace with 174 entries and no per-skill version is a supply-chain surface with a single review point — which is exactly why the README documents commit pinning and why the DCC families each record "how it was built and how far it was verified" in their own READMEs.

[`🔗 scenario-labs/skills`](https://github.com/scenario-labs/skills) · [`🔗 Scenario MCP docs`](https://mcp.scenario.com/docs)

---

## 17. Coding agents lose 11.5 points when a session interleaves unfinished tasks

- **Velocity:** ▮ steady
- **Source:** arXiv 2611.02017 · submitted 2026-10-31
- **Tags:** `ai-research` `agents` `benchmark` `coding` `evaluation`

**Switch-SWE** measures something the standard repository-level benchmarks do not: whether an agent can come back to a half-finished task after working on another one in the same repo. The setup is **200 focus tasks from 19 Python repositories**, reconstructed from issue, pull-request and review history and "rendered as 400 matched session specifications" — each focus task is scored twice, once in an uninterrupted session and once in a "switched" session that "interleaves ordered stages from other unfinished tasks in the same repository, while only the final focus patch is scored."

Across **7 coding agents**, "interleaved unfinished work produces an average focus-task resolution gap of **11.5 percentage points**, ranging from **6.0 to 15.0** percentage points." Trajectory analysis attributes the loss to "cross-task requirement confusion and loss of task state".

**Why it matters:** the matched-session design is the contribution — because every agent runs the same focus task with the same verifier and only the interleaving changes, the 11.5 points is attributable to the switching and not to task difficulty. It also describes the normal working conditions of an agent in a real repository, which single-issue benchmarks deliberately remove.

[`🔗 arXiv 2611.02017`](https://arxiv.org/abs/2611.02017) · [`🔗 Hugging Face daily papers`](https://huggingface.co/papers/2611.02017)

---

## 18. CISA added a 5.5 Pointer Authentication bypass to KEV — 904 days after Apple fixed it

- **Velocity:** ▮ steady
- **Source:** CISA KEV catalog 2026.11.04 · added 2026-11-04, due 2026-11-18
- **Tags:** `cve` `cisa-kev` `apple` `exploitation` `policy`

`CVE-2024-27834` entered the Known Exploited Vulnerabilities catalog on **2026-11-04** with a remediation deadline of **2026-11-18**. Its NVD record was published **2024-05-14T15:13:06Z** — **904 days** earlier — and its description is unchanged since then: "An attacker with arbitrary read and write capability may be able to bypass Pointer Authentication", fixed in Safari 17.5, iOS/iPadOS 16.7.8 and 17.5, macOS Sonoma 14.5, tvOS 17.5 and watchOS 10.5.

The score is the part that will be quoted wrong. NVD's own metric — the one whose `source` is `nvd@nist.gov` — is **CVSS 3.1 5.5 MEDIUM** (`AV:L/AC:L/PR:L/UI:N/S:U/C:N/I:H/A:N` — local, integrity-only); the CISA-ADP container carries a matching **5.5** plus an SSVC block. There is no higher third-party score on the record. The record's `lastModified` is **2026-11-04T18:17:33Z**; CWE-287.

The KEV entry itself documents a schema that has moved. It carries `forensicTriage: "No"` and `knownRansomwareCampaignUse: "Unknown"`, and its `requiredAction` points at **BOD 26-04, "Prioritizing Security Updates Based on Risk"** plus separate "Forensics Triage Requirements". Across the full catalog of **1,768** entries, **151** now cite BOD 26-04 — the earliest being an entry added **2026-06-11** — while **340** still cite the older BOD 22-01. `forensicTriage` is `Yes` on **97**.

**Why it matters:** a KEV add is a statement that exploitation was observed, and it does not come with a score — so a local-only 5.5 and a live-exploitation flag can be true of the same bug, and the 5.5 describes the privilege the attacker needs, not the value of what they get. The 904-day gap is also the argument for KEV as a separate signal from NVD rather than a filter over it.

[`🔗 CISA KEV catalog`](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) · [`🔗 NVD CVE-2024-27834`](https://nvd.nist.gov/vuln/detail/CVE-2024-27834)

---

## 19. ToolSpace builds harder MCP environments from real execution traces — and seven frontier models drop up to 38.2 points

- **Velocity:** ▮ steady
- **Source:** arXiv 2611.05036 · submitted 2026-11-02
- **Tags:** `ai-research` `agents` `mcp` `benchmark` `tool-use`

**ToolSpace** inverts how MCP environments are usually synthesized. Existing methods are data-centric — synthesize a database and scenario, then derive tools and tasks from it — which the paper says produces interfaces that "may not match real ones", compositions "not grounded in execution", and tasks that "rarely span more than one environment". ToolSpace instead "mines data, state, and retry dependencies from adjacent calls in execution traces of real MCP services and open agent corpora, using deterministic rules rather than LLM judgment", clusters the weighted tool-composition graph into environments, synthesizes databases only where state is mutated, replays recorded returns otherwise, and keeps only chains that "replay successfully from the initial state".

Applied to AutomationBench and τ³-Bench Banking, "the pipeline produces harder Pro versions on which **7 frontier models drop by up to 38.2 points**." On the training side, across seven long-horizon tool-use benchmarks it "raises Qwen3.6-35B-A3B from **23.0 to 41.0** average score (**43.2** with RL)". The design choice that matters for reproducibility is the deterministic rule set: the dependency graph is mined, not judged, so the environment construction is not itself a model behaviour.

**Why it matters:** the 38.2-point drop is the more important number, because it says the existing MCP benchmarks were measuring something easier than the traces real services produce. A harder environment that is derived from recorded execution is also the cheapest way to find out that a benchmark was saturated by interface familiarity rather than capability.

[`🔗 arXiv 2611.05036`](https://arxiv.org/abs/2611.05036) · [`🔗 Hugging Face daily papers`](https://huggingface.co/papers/2611.05036)

---

## 20. Kairos is an open-source fraud engine whose stated differentiator is that your coding agent tunes it

- **Velocity:** ▮ steady
- **Source:** Show HN · 103 pts · ~23h ago (~05:16 UTC+8)
- **Tags:** `agent-infra` `mcp` `fraud` `open-source` `fintech`

`finic-ai/kairos` is an Apache-2.0, real-time fraud and risk decisioning engine — "an open-source alternative to Sardine, Sift, Riskified and SEON" — that decides sign-ups, logins, orders, payments and payouts and keeps each decision with the signals behind it. It was created **2026-10-30**, had **202 stars** and pushes on **2026-11-03**, and ships TypeScript (`@finic-ai/kairos`) and Python (`finic-kairos`) SDKs, a CLI, an HTTP API and a Docker self-hosting path.

The agent-first claim is concrete rather than decorative: an **MCP server** lets Claude Code, Cursor or Codex "read your decisions and build workflows, with every action recorded under its key", and the experiments loop has the agent "propose model variants", Kairos "trains and tests them on your data", and then "the agent ships the winner". Underneath that sit conventional models — logistic regression and XGBoost-compatible gradient-boosted trees — plus a hosted decision model called Grayson that answers questions about each request in plain language and is described as working "with few labels".

**Why it matters:** the interesting design decision is audit attribution — an agent that can retrain and promote a fraud model is an agent that can change who gets blocked, so binding every action to a key is the minimum for the idea to be reviewable. Six days old and 202 stars is early; the architecture is the claim, not the traction.

[`🔗 finic-ai/kairos`](https://github.com/finic-ai/kairos) · [`🔗 Show HN discussion`](https://news.ycombinator.com/item?id=50358314)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-04T20:30:18Z |
| Items | 20 |
| Sources tracked | 26 (Hacker News, GitHub Trending, NVD, CISA KEV, GitHub Advisory Database, vendor PSIRTs, arXiv, Hugging Face, vendor engineering blogs) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[Previous day](../2026-11-04/) · [Raw .md](https://trending.md/en/feed/2026-11-05.md) · [Archive](../../archive/)
