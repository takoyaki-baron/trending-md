---
date: 2026-11-05
updated: 2026-11-05T04:27:03Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 24
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
- **Source:** arXiv 2611.03998 · submitted 2026-11-02T21:38Z · weights on Hugging Face
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

`scenario-labs/skills` is an MIT-licensed set of Agent Skills that "teach AI coding agents (Claude Code, Cursor, Codex, Copilot, and 70+ others) how to create production-ready content with Scenario through the Scenario MCP server": images, video, audio, textures, skyboxes, 3D assets and custom-trained models. Neither the README nor the MCP docs states a total, so we counted the git tree ourselves: **174 `SKILL.md` files** — **167** under `skills/` across **82** directories (**80** named `scenario*`, plus `dcc/` with **35** and `game-engines/` with **52**, the "expert tools" families that need ZBrush, Blender, Maya, Unreal, Unity, Godot or Roblox Studio installed rather than the MCP server) — and **7** more under `.agents/skills/` that maintain the repo's own PR workflow.

The pitch in the repo's own description field is narrower than "generate media": skills that "pick the right model, price before spending, and keep characters and brands consistent". The skill list backs that up with a long tail of per-provider wrappers — `scenario-veo`, `scenario-seedance`, `scenario-kling`, `scenario-vidu`, `scenario-wan`, `scenario-runway`, `scenario-elevenlabs`, `scenario-meshy`, `scenario-rodin` — alongside workflow skills like `scenario-quality-gate`, `scenario-refine-loop` and `scenario-model-comparison`.

Two operational details are worth copying. Install can be pinned: `npx skills@1.7.4 add scenario-labs/skills#<commit> --skill <name>` — "To install a reviewed state instead, pin both the installer and the commit, taken from a release's tag." And the installer's topic groups "cannot be selected from the command line", because the CLI matches `--skill` against exact skill names only; that limitation is an open upstream issue (`vercel-labs/skills#992`), not a bug in this repo.

**Why it matters:** a skills marketplace with 174 entries and no per-skill version is a supply-chain surface with a single review point — which is exactly why the README documents commit pinning and why the DCC families each record "how it was built and how far it was verified" in their own READMEs.

[`🔗 scenario-labs/skills`](https://github.com/scenario-labs/skills) · [`🔗 Scenario MCP docs`](https://mcp.scenario.com/docs)

---

## 17. Coding agents lose 11.5 points when a session interleaves unfinished tasks

- **Velocity:** ▮ steady
- **Source:** arXiv 2611.02017 · submitted 2026-11-01T16:04Z
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
- **Source:** arXiv 2611.05036 · submitted 2026-11-03T15:09Z
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

## 21. OpenAI's cyber pipeline turned $1.2M of API credits into 948 Linux root exploits

- **Velocity:** ▮▮▮ trending
- **Source:** openai.com/index · published 2026-11-04 · 197 pts on HN
- **Tags:** `security` `ai-research` `linux` `kernel` `vulnerability-research`

OpenAI published the methodology and the bill for an autonomous kernel-hunting pipeline: "Our prototype identified and analyzed 2,308 candidate Linux kernel findings, dynamically reproduced 1,724 vulnerabilities, and produced 948 local privilege escalation (LPE) exploits that could allow an unprivileged local user to gain root access." The run cost **$1,213,430 in API credits, or $1,279 per LPE exploit**, and the post also reports **291** information-leak vulnerabilities.

The pipeline is five stages with a human at the end. **Scout** agents picked **5,034 audit targets** — about **2.8 million lines**, "roughly 7% of the whole Linux kernel code base" — for $3,426. **Analyst** agents produced the 2,308 candidates in twelve hours for $316,549. **Validation** reproduced 1,724 of them (**74.7%**) in KASAN-instrumented VMs within 30 hours for $73,330, and the post is unusually specific about the residue: "Only 3.1% reflected incorrect analysis by the model, where the reported vulnerability assumed an impossible condition." Then exploitability assessment and patch generation.

The comparison that carries the thesis is a second run on an adapted **kernelCTF** environment: 25 information-leak PoCs and 21 LPE exploits for **$32,936**, against **26** confirmed 0-day LPEs accepted by kernelCTF across all of 2026. Against a July run on GPT-5.6 Sol, the newer model found ">5x more novel LPEs" — and the post claims "at least 10 novel Linux exploitation techniques" as a floor.

The caveats bound the headline more than the cost does. The model is "an upcoming cyber model" and is never named or benchmarked. The dollar ranges in the valuation paragraph are explicitly "hypothetical" — 948 exploits priced against historical Pwn2Own and TyphoonPWN bounties gives $18.9M–$66.3M, but those are bounty prices for accepted submissions, not a measurement of what these exploits are worth. And on cost: "we focused on methodology and measuring model capability in this research, not cost", so "the costs we report are more an upper bound". **948** is the count of exploits generated inside a lab, not of CVEs filed or patches merged.

**Why it matters:** the numbers everyone will quote — 948 exploits, $1,279 each — are the ones that answer a question nobody asked, because discovery was never the bottleneck the post identifies. Its own operational finding is that "within 10 days while the scan was running, we observed over 100 Linux LPEs had been patched or had staging patches from other contributors, with ~300 more being publicly discussed" — so the marginal cost of finding a kernel bug has fallen below the marginal capacity to review, patch and ship one. That is a disclosure-pipeline problem, and the paper's honest contribution is pricing it.

[`🔗 OpenAI: A thousand fewer paths to root`](https://openai.com/index/a-thousand-fewer-paths-to-root/) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=50372929)

---

## 22. Ripple-65B is a dense 65B that beats 500B–975B US open-weight models on Terminal-Bench — on one of two columns

- **Velocity:** ▮▮▮ trending
- **Source:** ricursive.com/ripple · 2026-11-04 · 248 pts on HN
- **Tags:** `ai-models` `open-weights` `dense` `benchmarks` `agentic-coding`

Ricursive Intelligence released **Ripple-65B Preview**, a **65B dense** Transformer (not MoE) pretrained on **12T tokens** with up to 1M context, scoring **80.52 on Terminal-Bench 2.1** — above Reflection Beam 501B (80.1), Meta Muse Spark Open 816B (76.4), Thinking Machines Inkling 975B (63.8) and NVIDIA Nemotron 3 Ultra 550B (56.4). The card's architecture is deliberately plain: `d_model` **5120**, **80 layers**, MFU **40%**, "simple sharding, no custom kernels, and no quantization (BF16)", built by a team that "scaled from 1 to 5 people during development". It ships **16 safetensors shards totalling 129,565,519,472 bytes (129.6 GB)** under Apache-2.0, plus NVFP4, DFlash2 and a pretrain-only base checkpoint. At the time we read it: **129 likes, 0 downloads**.

The benchmark table has two Terminal-Bench columns and they behave very differently. Under `(self-reported)`, Ripple 80.5 sits 0.4 above Beam's 80.1. Under the **official Terminus 2 harness**, Beam drops to **70.8**, Inkling to 56.2, Muse Spark to 78.7 — and Ripple stays at **80.5**. The card says why it published both: "we found that Terminal-Bench 2.1 scores were universally lower (with the exception of Muse Spark Open) when using the official Terminus 2 harness at 128K sequence length with summarization", and it marks re-run competitor cells in italics while stating plainly that "Replicating benchmark scores has been challenging, particularly for modern agentic evals, due to the number of factors which can cause eval scores to shift."

The advantage is narrower than "SOTA" once you leave Terminal-Bench. **SWE-bench Verified 76.5** against Beam's 81.6 and Muse's 78.7; **SWE-bench Pro v1.0 61.42** against Beam's 66.1; **DeepSWE 1.1 44.3** against Muse's 60.0. The one outlier is **SWE-bench Pro v2.0 Hard**, where Ripple claims 79.1 against Inkling's **2.0** — a number the same table puts at 54.3 on Pro v1.0, which is a harness difference rather than a capability difference and is not called out.

The cost claim needs its footnote attached: **$32M** for "our full R&D cost", described as "one-tenth the cost of the previous open-weight SOTA on agentic coding", "as estimated to the best of our knowledge". The efficiency claim is separate and better specified: the ladder "improves Compute Efficiency (CE) on code by 16x relative to the Olmo 3 ladder, with the advantage further increasing with scale up to 55x for the full hero run."

**Why it matters:** a dense 65B that fits on a DGX Spark and lands within a few points of 500B-plus MoEs is the more interesting result than the rank, because it says the gap between MoE capacity and dense compute efficiency is narrower than the parameter counts suggest. What should travel with it is the column split — the same competitor loses 9.3 points when the harness changes, so "beats 501B" is a statement about which column you read. (Ricursive is not RecursiveSI, the lab behind Flint, which we covered on 2026-10-31.)

[`🔗 ricursive.com/ripple`](https://www.ricursive.com/ripple) · [`🔗 ricursiveAI/Ripple-65B-Preview`](https://huggingface.co/ricursiveAI/Ripple-65B-Preview) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=50369925)

---

## 23. Kyverno published 21 CVE records in 3.3 seconds — seven at 9.0 or above, and the fix is 15 days older than the paperwork

- **Velocity:** ▮▮▮ trending
- **Source:** NVD · 21 records `CVE-2026-122302`–`CVE-2026-122323` published 2026-11-05T03:17:22–03:17:25Z
- **Tags:** `cve` `kubernetes` `kyverno` `privilege-escalation` `policy-engine`

Twenty-one Kyverno records landed at NVD between **2026-11-05T03:17:22.030Z** and **03:17:25.343Z** — a **3.313-second** publication window — every one of them scored by `disclosure@vulncheck.com` and every one still at `Received`. The IDs are a set, not a range: the span `CVE-2026-122302`–`CVE-2026-122323` holds **22** values and **`CVE-2026-122317` carries no record at NVD at all** (queried on its own, `totalResults` **0**), so 21 records sit inside a 22-ID span with one hole. Seven score at or above 9.0: **five at 9.9**, one at **9.8** and one at **9.1**. The 9.9s share `CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:C/C:H/I:H/A:H` (which recomputes to 9.9: the `S:C` scope change is what lifts a `PR:L` bug into the Critical band), with VulnCheck's 4.0 metric scoring the same records **9.4**.

The mechanisms are all the same shape — a namespaced policy author reaching the controller's ServiceAccount — and the individual variants are worth reading. `CVE-2026-122311` is a path traversal in `resource.get()` / `resource.post()`: the resource argument is split on `/` and everything after the first segment is handed to client-go as a "subresource", which `rest.IsValidPathSegmentName` does not validate, and `path.Join` resolves the `..`. The advisory's own summary is direct about the consequence: a tenant who can create a `NamespacedValidatingPolicy` in its own namespace can read and write arbitrary objects anywhere in the cluster, using the Kyverno admission controller's ServiceAccount. `CVE-2026-122310` is the same idea one layer up — the `context.apiCall` `urlPath` is validated after cleaning but the raw path is executed, so a `#` or `?` hides the traversal from the check. `CVE-2026-122303` and `-122313` use `targetMatchConstraints.expression` to return a CEL map literal naming someone else's namespace; `CVE-2026-122304` exploits the cleanup controller building "its context loader with a nil policy"; `CVE-2026-122302` checks the *controller's* permissions rather than the author's.

The dates matter more than the count. The patched version is **1.19.2**, released **2026-10-20T23:50:19Z**; `GHSA-4pqm-wqq6-h9q2` was published **Oct 21**, 2026 with `datePublic` **2026-10-21**; the CVE records arrived **2026-11-05** — **15.15 days** after the fix shipped, or 16 if you subtract the calendar dates (`2026-10-20` → `2026-11-05`). And the advisory is explicit that this is a recurrence rather than a new class — the mechanism here is different, it says, and neither of the two earlier fixes stops it — referring to `GHSA-79gf-7frw-68m9` (CVE-2026-54523) and `GHSA-cvq5-hhx3-f99p` (CVE-2026-41068).

**Why it matters:** the published reproduction is a kind cluster running Kubernetes v1.32.2, installed from the release manifest, with no configuration changes and no extra RBAC granted to Kyverno — the default install — so the precondition is only that some tenant can create a namespaced policy, and the outcome is cluster admin. The 3.3-second batch is also a reminder that publication timing at NVD is a workflow artifact: nothing about these bugs became true at 03:17Z, and everything about them was already public on October 21.

[`🔗 GHSA-4pqm-wqq6-h9q2 (path traversal)`](https://github.com/kyverno/kyverno/security/advisories/GHSA-4pqm-wqq6-h9q2) · [`🔗 Kyverno v1.19.2`](https://github.com/kyverno/kyverno/releases/tag/v1.19.2) · [`🔗 NVD CVE-2026-122311`](https://nvd.nist.gov/vuln/detail/CVE-2026-122311)

---

## 24. GPUStack treated any loopback request as the administrator — and the advisory says it was exploited in the wild

- **Velocity:** ▮▮ rising
- **Source:** GitHub Advisory Database · GHSA-gj9m-f8ph-pmhr · CVE-2026-102895 · 9.8
- **Tags:** `cve` `ai-infra` `authentication` `gpustack` `exploited`

`CVE-2026-102895` is a **9.8** against GPUStack, an open-source GPU cluster manager for model serving — **5,972 stars**, and a repo that pushed again on 2026-11-05. The bug is one line of policy: `get_current_user` promotes any request whose source is considered loopback to the built-in administrator account when `force_auth_localhost` is False, which is the default. There are two unauthenticated ways to look like loopback: put GPUStack behind a same-host reverse proxy (the canonical self-hosted shape, where "every remote request arrives at GPUStack with TCP peer `127.0.0.1`"), or send a forged `X-GPUStack-Real-IP: 127.0.0.1`. The advisory's root-cause line is the whole lesson: "Trusting the network source of a request (socket peer, or a client-controllable header) as an authentication signal."

The blast radius is administrative: enumerate and modify users, models, workers and configuration; mint persistent admin API keys with scope `["*"]` "valid from any source IP thereafter"; read worker credentials and cloud-provider secrets; and reach code execution on worker hosts through admin-only endpoints such as `POST /v2/inference-backends/from-yaml`.

The sentence that makes this a different item from the dozens of 9.x auth bypasses is in the same advisory: "This vulnerability has been observed exploited in the wild against a v2.1.1 deployment (attacker-created custom backends running reverse shells)." In-the-wild reporting is credited to Javier Sixto (ulex.fr); the bug was independently reported by Nikko Enggaliano, Wei Yunzhou, and Rui Yang & Haoyu Wang (Johns Hopkins).

The clocks disagree more than usual. The advisory was published **Jul 31, 2026**; **v2.2.0**, the fix, shipped **2026-06-18T15:54:18Z** — **139 days** before the NVD record on **2026-11-04T22:17:44Z**. The newest release is **v2.3.0** (2026-10-21), so anyone on the current line is already patched; anyone still on 2.1.x is the population the advisory describes.

**Why it matters:** "localhost is trusted" is a default that survives every code review because it reads as a security decision rather than a bug, and a reverse proxy silently converts it into a rule that the whole internet satisfies. The workaround list is also a checklist worth keeping: set `force_auth_localhost=true`, strip client-supplied `X-GPUStack-Real-IP` at the edge, and never let a gateway make external traffic look local.

[`🔗 GHSA-gj9m-f8ph-pmhr`](https://github.com/gpustack/gpustack/security/advisories/GHSA-gj9m-f8ph-pmhr) · [`🔗 NVD CVE-2026-102895`](https://nvd.nist.gov/vuln/detail/CVE-2026-102895) · [`🔗 GPUStack v2.2.0`](https://github.com/gpustack/gpustack/releases/tag/v2.2.0)

---

## 25. Yuxi's sandboxes could reach each other's APIs without a container escape — 9.9, fixed 110 days before the record

- **Velocity:** ▮▮ rising
- **Source:** GitHub Advisory Database · CVE-2026-97693 · published 2026-11-04T22:18Z
- **Tags:** `cve` `ai-infra` `multi-tenant` `sandbox` `yuxi`

Yuxi is "a large-model-based intelligent knowledge base and knowledge graph agent development platform" — 7,602 stars, a release line still in beta. `CVE-2026-97693` scores **9.9** (`CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:C/C:H/I:H/A:H`) for "insufficient isolation between execution-capable Docker sandboxes and trusted application services". A low-privileged authenticated user who can run commands in their own sandbox "can reach other tenants' sandbox APIs, access their files and secrets, execute commands in active sandboxes, and enumerate, create, or delete sandboxes through the unauthenticated provisioner without knowing administrator, database, or MinIO credentials."

The phrase that keeps this honest is the one that says what did *not* happen: these paths disclose and modify cross-tenant data and can cause denial of service "without a container escape or kernel vulnerability". Every sandbox boundary held; the network boundary between the sandbox and the control plane did not.

The remediation note is the part operators will miss. The fix is **0.7.1**, released **2026-07-17T15:50:37Z** — **110 days** before the record — and the current line has moved on to **v0.8.0.beta7**. But: "upgrading the Compose files does not automatically rotate them", so any deployment that ever ran the documented defaults must separately rotate persisted **PostgreSQL**, **Neo4j** and **MinIO** credentials; if the exposed PostgreSQL account is a superuser, the advisory notes that alone yields command execution in the PostgreSQL container.

**Why it matters:** the sandbox is the security claim every agent platform makes, and here the sandbox was fine — the orchestrator's own API surface was the tenant boundary. Upgrading a Compose file rotates code, never secrets, and the advisory says so explicitly rather than leaving it to the reader.

[`🔗 CVE-2026-97693 record`](https://www.cve.org/CVERecord?id=CVE-2026-97693) · [`🔗 GHSA-qpm5-6332-9445`](https://github.com/xerrors/Yuxi/security/advisories/GHSA-qpm5-6332-9445) · [`🔗 NVD CVE-2026-97693`](https://nvd.nist.gov/vuln/detail/CVE-2026-97693)

---

## 26. Pocket ID bound its email token to the user, not the address — so you could verify an address you no longer controlled

- **Velocity:** ▮▮ rising
- **Source:** GitHub Advisory Database · CVE-2026-115770 · published 2026-11-04T23:17Z
- **Tags:** `cve` `identity` `oidc` `pocket-id` `account-linking`

`CVE-2026-115770` is a **9.6** (`AV:N/AC:L/PR:L/UI:N/S:C/C:H/I:H/A:N`) in Pocket ID, a passkey-based OIDC provider with **10,005 stars**. The bug is a three-way interaction between three normal features: `SendEmailVerification` binds the token "only to the user's identifier", `UpdateUser` changes the account email "without invalidating the outstanding token", and `VerifyEmail` marks "the current address as verified". So an ordinary user requests a token for an address they control, switches the account to an arbitrary unused address, and redeems the stale token — and Pocket ID publishes the new address with `email_verified` set to true.

The defaults are what make it reachable: "The default affected configuration uses `emailsVerified=false` and `allowOwnAccountEdit=true`". There is one precondition, stated in the record — "the target address must not already belong to another Pocket ID user" — which is exactly the case a new hire's mailbox satisfies.

The downstream consequence is precise and worth quoting rather than paraphrasing: an application that trusts a verified email for automatic account matching or provisioning "can link the attacker's identity to another user's account, while applications that rely exclusively on the stable OIDC `sub` claim are not affected by that downstream consequence."

The clocks: the fix is **2.12.0**, released **2026-07-29T23:05:53Z** — **98 days** before the record on **2026-11-04** — and the project is now at **v2.19.2** (2026-10-22). CWE-345.

**Why it matters:** `email_verified` is the one claim relying parties treat as an assertion about a fact, and here it was a claim about a token's subject instead of its contents. The mitigation is a design rule, not a patch note: if an identity claim can be invalidated by a later edit, the edit has to invalidate the claim — and any app doing JIT provisioning off `email` rather than `sub` is the half of this bug that no upgrade fixes.

[`🔗 CVE-2026-115770 record`](https://www.cve.org/CVERecord?id=CVE-2026-115770) · [`🔗 GHSA-rm8c-2cv8-jwf6`](https://github.com/pocket-id/pocket-id/security/advisories/GHSA-rm8c-2cv8-jwf6) · [`🔗 Pocket ID v2.12.0`](https://github.com/pocket-id/pocket-id/releases/tag/v2.12.0)

---

## 27. ESP-IDF's TEE trap entry wrote through the caller's stack pointer — and the 6.x fix does not exist yet

- **Velocity:** ▮▮ rising
- **Source:** GitHub Advisory Database · CVE-2026-113780 · 9.3 · published 2026-11-04T19:17Z
- **Tags:** `cve` `esp32` `tee` `firmware` `espressif`

`CVE-2026-113780` scores **9.3** (`AV:L/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H`) on ESP-IDF, and the mechanism is an ordering bug in an assembly entry path: "the `esp_tee` trap entry in `esp_tee_vectors_plic.S` and `esp_tee_vectors_clic.S` saves a caller-controlled register frame through the REE-supplied stack pointer before switching to the trusted TEE stack or validating the pointer." A local unprivileged application in the Rich Execution Environment can therefore "direct this machine-mode write into TEE-exclusive memory" on **ESP32-C5, C6, C61 and H2**, breaking the REE/TEE isolation boundary and potentially corrupting TEE control-flow data. Both the secure-service `ecall` and interrupt entry paths carry the same ordering.

The versions are where this becomes operational rather than academic. The affected range is **from 5.5.5 until 5.5.6, 6.0.4, and 6.1.1**, and the record says the issue "is fixed in version 5.5.6 and is scheduled to be fixed in versions 6.0.4 and 6.1.1." **v5.5.6** shipped **2026-10-16T14:32:14Z**. But ESP-IDF's release list, read today, tops out at **v6.0.3** (2026-09-02) and **v6.1** (2026-08-27) — so **6.0.4 and 6.1.1 do not exist**, and anyone on the 6.x line has no version to install. The record itself was published **2026-11-04T19:17:18Z**, nineteen days after the 5.5.x fix.

Four fix commits are cited, and the CNA is `GitHub_M` — the GitHub-assigned CVE, not Espressif's own numbering.

**Why it matters:** an advisory that names a future fixed version is a remediation date dressed as a version number, and the honest reading here is that 5.5.x is patched while 6.x is not yet. The bug class is also the one embedded teams discount: the TEE boundary fails on the instruction *before* the switch, not inside the trusted code, which is why validating the pointer is not the same as validating it before using it.

[`🔗 GHSA-49x8-xqjg-2pjg`](https://github.com/espressif/esp-idf/security/advisories/GHSA-49x8-xqjg-2pjg) · [`🔗 NVD CVE-2026-113780`](https://nvd.nist.gov/vuln/detail/CVE-2026-113780) · [`🔗 ESP-IDF v5.5.6`](https://github.com/espressif/esp-idf/releases/tag/v5.5.6)

---

## 28. Compressing a prompt to save tokens quietly weakens the model's refusals — at high reconstruction fidelity

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2611.06380 · submitted 2026-11-04T11:42Z
- **Tags:** `ai-research` `safety` `compression` `alignment` `interpretability`

**Does Context Compression Preserve Refusal Alignment?** asks whether a compression encoder that reconstructs its input faithfully also preserves what the model does with it. The answer is no: "encoder-based compression systematically weakens refusal behaviour in instruction-tuned language models, despite high reconstruction fidelity", and the effect "persists across model families and compression architectures."

The mechanistic claim is the part that makes it more than a leaderboard observation: "compression attenuates activation along the decoder's learned refusal direction." That is, the refusal behaviour has a direction in activation space, compression shrinks the component along it, and semantic content survives because it lives somewhere else. The paper proposes **Memory Steering**, "a lightweight inference-time intervention that restores refusal rates to near-baseline levels without retraining", operating entirely in compressed representation space.

Its conclusion is the sentence to carry into systems design: "semantic preservation does not guarantee behavioural preservation under compression."

The limits are the ones a reader should apply before quoting a number: the abstract reports no figures — no refusal-rate deltas, no reconstruction-fidelity values, no named model list — so this is a directional claim with a mechanism, and the magnitude is in the body. Two authors, Anthony Nguyen and Wenjun Lin.

**Why it matters:** every long-context agent stack now compresses to fit a budget, and the standard acceptance test is whether a human can still read the summary — which is precisely the metric this paper shows is insufficient. A safety property that degrades silently while quality metrics hold is the worst shape a regression can take, and checking that the reconstruction is faithful is the check that misses it.

[`🔗 arXiv 2611.06380`](https://arxiv.org/abs/2611.06380) · [`🔗 Full text (PDF)`](https://arxiv.org/pdf/2611.06380)

---

## 29. CASE-Bench: giving a coding agent good repository context buys 8.2 points of function and 3.7 of security

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2611.06294 · submitted 2026-11-04T10:29Z
- **Tags:** `ai-research` `security` `benchmark` `coding-agents` `context`

**A.S.E 2.0** builds **CASE-Bench**, "a benchmark of 145 repository-level tasks from real CVEs in 51 projects", where each task runs in Docker, "has functional tests and a proof-of-concept exploit validated in both directions", and is annotated with "the repository code that enforces or undermines its security." The design question is the one secure-code benchmarks usually hold fixed: context construction is "designed almost exclusively for functional correctness", so whether the model sees the project's authorization check — or a nearby piece of insecure code to imitate — was never varied.

Across **13 context construction methods**, six controls and six LLMs, three results:

- "(1) functionality-oriented context raises the functional pass rate by up to 8.2 percentage points (pp) but the secure pass rate by at most 3.7 pp" — the optimizations everyone ships are worth roughly twice as much on the axis they were tuned for.
- "(2) withholding a safeguard lowers the secure pass rate by up to 8.1 pp, while one inserted insecure exemplar raises correct-but-exploitable code by 6.3 pp" — a single bad example is nearly as harmful as removing the guard, and it produces code that passes the functional tests.
- "(3) coding agents observe the relevant safeguard in only 27-36% of trajectories" — the majority of the time the agent never read the file that would have constrained it.

**Why it matters:** the second result is the one with no fix in the prompt. "Correct-but-exploitable" is a category that both functional tests and most security review miss, because the test suite was written against the same spec the insecure exemplar satisfies. The 27–36% figure also reframes the problem: this is a retrieval question before it is a reasoning question, since two-thirds of trajectories never surfaced the relevant guardrail at all.

[`🔗 arXiv 2611.06294`](https://arxiv.org/abs/2611.06294) · [`🔗 Full text (PDF)`](https://arxiv.org/pdf/2611.06294)

---

## 30. D3D drafts the *next* block while the current one is still being verified — 5.71× on a 32B target

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2611.06425 · submitted 2026-11-04T12:27Z · code on GitHub
- **Tags:** `ai-research` `inference` `speculative-decoding` `diffusion` `throughput`

Speculative decoding has an idle window: a diffusion drafter predicts a block in one pass, but "each new block must wait for updated target-model hidden states", so drafting and verification serialize. **D3D** ("Decoupled Diffusion Drafting") removes the dependency — a standalone diffusion drafter combining "blockwise denoising with auxiliary autoregressive supervision" that achieves long accepted prefixes without the target's hidden states, which lets it "draft successor blocks during verification in one packed pass."

The compression is the practical half: layers are pruned by their effect on acceptance length, and "Removing five of 36 layers retains over 99% of mean acceptance length across three benchmarks with Qwen3-8B as the target."

Measured average speedup across seven benchmarks: **5.00×** with a Qwen3-8B target and **5.71×** with Qwen3-32B, against **4.03×** and **3.67×** for DFlash. On GSM8K with Qwen3-32B it reaches **7.48×**. The baseline is the relevant kind — same-family drafter, same benchmarks — and the code is public at `fudan-generative-vision/D3D` (9 stars, last push 2026-11-01, so this is a fresh artifact rather than a maintained one).

**Why it matters:** the asymmetry in the numbers is the finding. DFlash gets *slower in relative terms* as the target grows (4.03× → 3.67×) while D3D gets *faster* (5.00× → 5.71×), which is what you would expect if the win comes from filling the verification window rather than from drafting quality — a bigger target means a longer window to fill. Speculative decoding has been optimised for the drafter for two years; this is a paper about the schedule.

[`🔗 arXiv 2611.06425`](https://arxiv.org/abs/2611.06425) · [`🔗 fudan-generative-vision/D3D`](https://github.com/fudan-generative-vision/D3D) · [`🔗 Full text (PDF)`](https://arxiv.org/pdf/2611.06425)

---

## 31. Model merging does not require uniform LoRA ranks — and the methods that say it does drop the instruction adapter

- **Velocity:** ▮ steady
- **Source:** arXiv 2611.06486 · submitted 2026-11-04T13:26Z
- **Tags:** `ai-research` `lora` `model-merging` `fine-tuning` `evaluation`

Model merging combines separately fine-tuned experts without retraining, and the standard practice trains every expert at the same LoRA rank — coupling the rank choice across domains "even though each domain has its own best rank". The paper's claim is that the coupling "is a property of the merge method, not of merging". The experiment: **36 experts** on three domains (mathematics, instruction following, multilingual), at four ranks and three model scales, merged with six methods.

The result splits cleanly by family. "Giving experts different ranks costs averaging and utility-based selection nothing, and gains them up to 1.8 pp of multi-domain accuracy, while the conflict-resolution methods are inconsistent and can lose up to 4 pp." The mechanism is a selection rule: merging "keeps only a fixed share of the pooled spectral components, and methods that choose them by size discard many that would have reduced loss" — and they discard the *same* expert. "The instruction adapter has the smallest singular values, so it is dropped almost entirely and IFEval falls by 16 to 25 pp."

Choosing components "by their effect on loss instead keeps all three experts, and leaves accuracy nearly flat" across an 8× rank range — 0.7 pp, against 6.7 pp for TIES at 4B scale.

**Why it matters:** the 16–25-point IFEval loss is not a tuning artifact — it is a merge method silently deleting one of the three experts you merged, and it would look like instruction following simply got worse after merging rather than like a bug. The operational rule is one sentence: rank can be chosen per expert whenever the merge operator does not select by magnitude, and if it does, the smallest-norm adapter is not the least important one.

[`🔗 arXiv 2611.06486`](https://arxiv.org/abs/2611.06486) · [`🔗 Full text (PDF)`](https://arxiv.org/pdf/2611.06486)

---

## 32. SumOne trains an agent's summarizer by asking a frozen model to reconstruct what it dropped

- **Velocity:** ▮ steady
- **Source:** arXiv 2611.06445 · submitted 2026-11-04T12:49Z
- **Tags:** `agent-infra` `memory` `context-compaction` `grpo` `open-source`

Context compaction for long-horizon agents is usually trained against the thing you actually care about — the downstream task score or the solver's behaviour — which couples the summarizer to a specific task and a specific agent. **SumOne** replaces that with a reconstruction reward: "Given a summary of the expired history, a frozen reconstructor recovers randomly masked portions of the original trajectory; reconstruction quality, combined with a length penalty, provides a task-agnostic reward for optimizing the summarizer with GRPO." No reference summaries, no task execution.

At inference "only the lightweight summarizer is retained, enabling plug-and-play context compression for otherwise unchanged agents" — and the checkpoint "transfers across downstream models and agent harnesses without additional fine-tuning." Measured on long-horizon search and software-engineering tasks, it "reduces estimated inference cost by approximately 78% on DeepSearchQA and 75% on SWE-bench Verified relative to operating with full context".

The accuracy side is stated as "absolute decreases of 0.04" without naming the metric's scale, which is the one number in the abstract a reader cannot size — on a 0–1 pass rate that is four points, on a 0–100 score it is nothing.

**Why it matters:** the training signal is the interesting design decision. Asking whether a frozen model can still recover the details that were thrown away is a proxy for information retention that is cheap, needs no task, and cannot be gamed by a summarizer that has learned one benchmark's shape — which is exactly the failure the paper is built to avoid. The unresolved part is that reconstruction fidelity and downstream usefulness were already known to diverge in other settings (item 28), so the reward's independence is also its blind spot.

[`🔗 arXiv 2611.06445`](https://arxiv.org/abs/2611.06445) · [`🔗 Full text (PDF)`](https://arxiv.org/pdf/2611.06445)

---

## 33. Horizon is a 12,624-star news radar with a profile system, an MCP server, a skill — and no releases or tags at all

- **Velocity:** ▮ steady
- **Source:** GitHub Trending (daily) · 121 stars today · MIT · last push 2026-11-03T17:20Z
- **Tags:** `agent-infra` `mcp` `skills` `rss` `open-source`

`Thysrael/Horizon` is an MIT Python project that calls itself "your own AI-powered news radar": it pulls from RSS, Hacker News, Reddit, Telegram, X, GitHub and financial feeds, then "collects, filters, and deduplicates them, then brings the worthwhile ones to you with context and community discussion." Created **2026-02-20**, it has **12,624 stars**, pushes on 2026-11-03, and generates bilingual (English/Chinese) briefings delivered as Markdown, GitHub Pages, email, WeChat or a webhook.

The design decision worth copying is **profiles**: "A profile is a reusable set of editorial rules: what belongs, what's worth keeping, and what to write." Each source routes to a profile (`tech-news`, `tech-blog`, `ai-creator` are the built-ins), each profile carries its own scoring rubric, threshold, dedup rule and output shape, and items are analysed and deduplicated *before* enrichment. There is also an MCP server under `src/mcp/` so an assistant can call the pipeline stages, and a skill install — `npx skills add Thysrael/Horizon --skill horizon -g`.

The artifact state is the part to note before recommending it. We checked the repo's releases and tags feeds directly: **0 releases, 0 tags**. Everything installable from this project is the default branch as of 2026-11-03 — including the skill, which has no tagged version to pin to.

**Why it matters:** a per-source editorial rubric is the right abstraction for a feed — it separates what to read from how to write about it, which most aggregators collapse into one prompt. The missing tags are the same supply-chain shape the feed keeps finding: 12.6k stars and a documented install path with no reviewed state available, so "pin a commit" is advice the project cannot yet give you.

[`🔗 Thysrael/Horizon`](https://github.com/Thysrael/Horizon) · [`🔗 Live demo`](https://thysrael.github.io/Horizon/) · [`🔗 GitHub Trending`](https://github.com/trending)

---

## 34. Qualcomm's Cloud AI 100 Ultra puts 128 GB behind 548 GB/s at 150 W — and its own spec table has a typo

- **Velocity:** ▮ steady
- **Source:** qualcomm.com product page · 116 pts on HN · ~20h ago (~00:00 UTC+8)
- **Tags:** `hardware` `inference` `qualcomm` `datacenter` `specs`

Qualcomm's **Cloud AI 100 Ultra** is a PCIe FH3/4L inference card at **150 W TDP** with **up to 870 TOPS INT8**, **up to 288 TFLOPS FP16**, **576 MB** of on-die SRAM, **64 AI cores**, **128 GB** of DRAM and **548 GB/s** of bandwidth over **PCIe Gen4 ×16** — no NVLink, no host-memory coherence, no interconnect beyond the slot. It is sold alongside an **AI Inference Suite** that exposes OpenAI-compatible APIs for chat, image generation, multimodal and RAG, deployed on Kubernetes or bare-metal containers.

The family table is the interesting artifact, because it shows what the "Ultra" suffix actually buys. The **AI 80 Ultra** has the *same* 150 W, the *same* 128 GB and the *same* 548 GB/s, and differs only in compute — 618 TOPS INT8 and 222 TFLOPS FP16 against 870 and 288. The **AI 100 Pro** drops to 75 W, 32 GB and 137 GB/s in a half-height card on eight lanes.

Read across the four SKUs and the ratio is constant: 548 GB/s per 128 GB and 137 GB/s per 32 GB are both **4.3 GB/s of bandwidth per GB of capacity**. Capacity and bandwidth scale together, which is the signature of an LPDDR-based design rather than HBM — and it means a single card's memory is sized for many concurrent small models, not for decoding one large one at speed.

One detail from the vendor's own page: the DRAM column reads "128 GB **LPR4x**" on both Ultra SKUs, which is a typo for LPDDR4x rather than a part number.

**Why it matters:** the spec that decides what this card is good for is the one absent from the headline — 548 GB/s is the constraint, and it is why the pitch is hundreds of concurrent inference streams at low power rather than fast single-model decode. Comparing TOPS across vendors is close to meaningless without that number, and the same is true of "128 GB", which here describes capacity per watt and per slot rather than per bandwidth.

[`🔗 Cloud AI 100 Ultra`](https://www.qualcomm.com/data-center/products/cloud-ai-100-ultra) · [`🔗 Product brief (PDF)`](https://www.qualcomm.com/content/dam/qcomm-martech/dm-assets/documents/Prod-Brief-QCOM-Cloud-AI-100-Ultra.pdf) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=50370654)

---

## 35. The Xbox 360 hypervisor exploit went from 20 minutes at 30% to near-instant at near-100% — because of a 20-bit lookup table

- **Velocity:** ▮ steady
- **Source:** icode4.coffee · 2026-11-04 · 78 pts on HN
- **Tags:** `reverse-engineering` `xbox360` `exploit` `hardware` `writeup`

Ryan Miceli's third post on the Xbox 360 hypervisor is short and mostly about what changed after the PoC. The headline: "how it went from taking ~20 minutes with a ~30% success rate to being near instantaneous with a near 100% success rate."

Two changes did it. First, an entry point that removes the game disc: a save-file exploit in the **Rock Band Blitz** demo ("DaTArrest", by `ihatecompvir` and `InvoxiPlayGames`) reached the stage-2 ROP chain, and because packages signed to boot from the HDD or memory unit were grandfathered onto **USB storage** when the console gained USB support, the demo package can be copied to a stick and launched on any console at a supported version.

Second, a fix for the author's own blind spot. The memory-encryption scheme's whitening value is **12 bits**, giving **1024 unique ciphertexts** for any plaintext, and the original PoC only generated the one it needed — a lookup table it had tried and abandoned. The post is candid about why: an older hypervisor flushed the TLB for the encrypted range and later builds did not, so calling the syscall directly left stale whitening bits and the table "was causing issues"; "by the time I got to the end of the exploit I had become so blinded by tunnel vision chasing CPU cache issues that I had convinced myself the lookup table just wasn't going to work." The rebuilt table indexes on **20 bits** of the expected ciphertext and stores both the oracle value (for collision validation) and the malicious replacement, and deliberately ignores collisions — a few collisions, the post argues, mean skipping some iterations of the race loop, which is cheaper than implementing bucket support in the hash table.

**Why it matters:** this is a worked example of the most common exploit-engineering failure — not a missing primitive but a wrong model of one, held for weeks because a negative result from a broken prototype was never retested against a fixed premise. The fix was 1024× more precomputation and an admission that the earlier experiment had been invalid; part 4 covers the peer-pressure exploit.

[`🔗 Hacking the Xbox 360 Hypervisor Part 3`](https://icode4.coffee/?p=1746) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=50372164)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-05T04:27:03Z |
| Items | 35 |
| Sources tracked | 24 (Hacker News, GitHub Trending, NVD, CVE.org, CISA KEV, GitHub Advisory Database, vendor PSIRTs, arXiv, Hugging Face, vendor engineering blogs) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[Previous day](../2026-11-04/) · [Raw .md](https://trending.md/en/feed/2026-11-05.md) · [Archive](../../archive/)
