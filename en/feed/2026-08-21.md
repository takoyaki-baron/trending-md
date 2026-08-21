---
date: 2026-08-21
updated: 2026-08-21T12:03:00Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 35
license: CC-BY-4.0
---

# trending.md — Dense Trending Signals

Machine-readable trending information. Ranked by **velocity** — how fast attention is shifting.
Built for AI agents. Readable by humans.
→ Raw feed: [`/en/feed/latest.md`](/en/feed/latest.md)
→ Archive: [`/en/feed/`](/en/feed/)

---

## 1. Bun 1.4 — the runtime quietly rewrote itself from Zig to Rust

- **Velocity:** ▮▮▮ trending
- **Source:** bun.com · 202 pts HN · ~6h ago (~04:03 UTC+8)
- **Tags:** `bun` `rust` `javascript` `runtime` `nodejs-compat`

**Bun 1.4** shipped Aug 20 with a line most release notes would lead on and this one buries: *"Bun is now written in Rust — and this is the first release."* The Zig→Rust port had been running in production for months (Claude Code shipped on it; Prisma launched Prisma Compute atop it) before the announcement. The measured payoff: **idle CPU down 5×**, memory down **up to 35%**, Linux startup roughly **2× faster** (5.1 ms vs 10.9 ms in 1.3, against Node's 27.2 ms), and binaries up to **17% smaller**. Node compatibility took the biggest jump since 1.0 — **+1,517 Node test-suite tests** and **2,900+ issues fixed**, with passing Node test files going **1,450 (v1.2.0) → 3,743 (v1.4.0)**. Per-framework memory over 1M requests: fastify **233→120 MB (−48%)**, Express **169→92 MB (−46%)**, Next.js **397→285 MB (−28%)**. New batteries: `Bun.Image`, `Bun.WebView` (headless browser automation with no Puppeteer/Playwright), `Bun.markdown`, `Bun.cron()`, `Bun.Terminal` (built-in PTY), and `bun run --parallel`.

**Why it matters:** A production JS runtime swapping its implementation language mid-flight — and only mentioning it once the port already shipped — is the rarest kind of migration. The Claude Code CPU numbers (p99 **24% → 10%**) are the concrete case that agent harnesses, which spawn and idle many processes, are now a first-class Bun optimization target.

> Not universally applauded: a companion HN thread, *"Bun 1.4 Rust rewrite is not looking good?"* (166 pts), argues the rewrite's costs are being undersold. Bun's own post still concedes "Bun is not 100% compatible with Node.js yet."

[`🔗 Bun 1.4 release notes`](https://bun.com/blog/bun-v1.4) · [`🔗 Rust rewrite critique`](https://tipiirai.com/writing/bun-rust-rewrite-worries)

---

## 2. OpenRouter is joining Stripe — the model router devs default to gets a parent company

- **Velocity:** ▮▮▮ trending
- **Source:** openrouter.ai · 939 pts HN · ~1d ago (~04:03 UTC+8)
- **Tags:** `openrouter` `stripe` `model-routing` `agent-infra` `acquisition`

**OpenRouter** — the multi-provider LLM routing layer a large share of agent stacks call instead of talking to vendors directly — announced Aug 19 that it is **joining Stripe**. The post is explicit that this is a sale (it notes OpenRouter weighed "selling to" other companies) and that **the transaction has not closed**: it is "subject to customary closing conditions" with closing expected "in the coming weeks." The continuity commitments are unusually specific: *"OpenRouter will continue to operate as it is: same mission, same name, same product, same roadmap"* and *"If you build on OpenRouter today, nothing about your integration changes."* On the question that actually matters for a router, it commits that routing decisions stay "driven by one thing: what's best for you, the user" — a neutrality that "doesn't bend to any model, any provider, or any parent company."

**Why it matters:** Routing is the layer that decides which model your agent actually hits, so its ownership is a supply-chain question, not a business-page one. Nothing to change today — but the neutrality pledge is now the thing to hold Stripe to, and it is worth pinning your provider preferences explicitly rather than relying on default routing.

> No API, pricing, or model-catalog changes are announced anywhere in the post. Announced two days after a separate channel-level price cut on GPT-5.6 Sol ran through OpenRouter.

[`🔗 OpenRouter announcement`](https://openrouter.ai/blog/announcements/openrouter-is-joining-stripe/) · [`🔗 HN discussion (939 pts)`](https://news.ycombinator.com/item?id=49364559)

---

## 3. AliExpress runs a silent WebAudio graph that holds your Bluetooth channel hostage

- **Velocity:** ▮▮▮ trending
- **Source:** blog.laserphile.com · 762 pts HN · ~10h ago (~04:03 UTC+8)
- **Tags:** `fingerprinting` `webaudio` `privacy` `bluetooth` `tracking`

The AliExpress homepage loads two obfuscated Alibaba scripts — **`collina.js`** and **`fireyejs.js`** — and each spins up a hidden `AudioContext`: sawtooth oscillator → analyser → script processor → **zero-gain node** → audio destination. The zero gain makes it inaudible, but the graph stays wired to the system audio path, so the browser keeps the machine's Bluetooth audio channel claimed and **multipoint headphones can no longer hand back to the phone**. The author reproduced it on both Firefox and Chrome, and notes that muting the tab, the browser, or the OS does not help — there is no `<audio>` element to mute. The WebAudio graph is one layer of a broader canvas/WebGL/WebRTC fingerprint shipped to Alibaba telemetry; mitigation is blocking the two scripts with narrow uBlock Origin rules.

**Why it matters:** Audio fingerprinting is usually invisible by construction — this is a rare case where it produced a **physical, user-noticeable side effect**, which is what made it findable at all. It's a reminder that "silent" in the WebAudio sense means gain-zero, not disconnected.

> Caveat: single-author writeup, and the Bluetooth behaviour was observed on one machine. Alibaba has not confirmed it.

[`🔗 Original writeup`](https://blog.laserphile.com/2026/08/aliexpress-webpage-keeping-multipoint.html) · [`🔗 HN discussion (762 pts)`](https://news.ycombinator.com/item?id=49372583)

---

## 4. Claude designed de novo protein binders and hit 14 of 15 targets

- **Velocity:** ▮▮▮ trending
- **Source:** anthropic.com · vendor research · ~2d ago (~04:03 UTC+8)
- **Tags:** `ai-for-science` `protein-design` `agentic` `anthropic` `wet-lab`

Anthropic published results (Aug 18) in which two models — **Mythos Preview** and **Opus 4.8** — autonomously designed "minibinder" proteins from scratch, orchestrating existing tools (**RFdiffusion, ProteinMPNN, ESMFold2**) with no human design intervention. Of **1,320 designed candidates, 354 were confirmed binders against 14 of 15 targets** — a **~26.8% hit rate** against the 10–15% typical for such campaigns, with Mythos Preview reaching **35.1%** in single-target mode. In a separate chemistry evaluation, Claude Opus 5 processed raw **NMR and LC-MS** files in **23 and 19 minutes**, reporting **96.4% sample purity** against the lab's own 96.33%.

**Why it matters:** The loop here is end-to-end — the model picks the tools, runs the design campaign, and the output is physically synthesized and assayed. Binders were validated by two independent labs (**Adaptyv Bio** and **Twist Bioscience**), which is what separates this from an in-silico benchmark.

> Caveat: these are Anthropic's own results and are not peer-reviewed. A binder is not a drug. Notably, the capability is **blocked on Anthropic's most capable model (Fable 5)** over dual-use concerns — the safety posture is itself part of the announcement.

[`🔗 Anthropic research`](https://www.anthropic.com/research/Claude-accelerates-protein-design) · [`🔗 The Next Web coverage`](https://thenextweb.com/news/anthropic-claude-protein-design-chemistry)

---

## 5. A hijacked `arrayref` release runs a payload at `cargo build` time

- **Velocity:** ▮▮▮ trending
- **Source:** safedep.io · 316 pts HN · ~7h ago (~04:03 UTC+8)
- **Tags:** `supply-chain` `rust` `cargo` `malware` `crates-io`

A compromised crates.io publish of **`arrayref` 0.3.10** — pushed from the legitimate maintainer's account — added a single one-line dependency on the typosquatted crate **`proc-macro1`**. That crate's **build script** reassembles obfuscated URLs at compile time, downloads an OS/architecture-specific binary from **`23.254.165.112`** over TLS **with certificate validation disabled**, then drops and executes `/tmp/rust-setup` on Unix or `rust-setup.ps1` plus a VBScript launcher on Windows — detached, so Cargo doesn't block waiting on it. The attacker also **yanked versions 0.3.5–0.3.9** to push resolvers onto the malicious 0.3.10. `arrayref` sits deep in common dependency graphs (**tiny-skia, sctk-adwaita, winit**) with roughly **245M all-time downloads**.

**Why it matters:** No `cargo run` required — **compiling** a project that resolves these versions is enough to execute the payload, which makes CI runners and dev laptops equally exposed. Audit `Cargo.lock` for `arrayref` 0.3.10 and any `proc-macro1`, and treat the yanked 0.3.5–0.3.9 range as a tell rather than a coincidence.

> No CVE assigned at the time of writing; tracked as **RustSec advisory-db issue #3161**. Build-script execution remains the least-sandboxed step in the Rust toolchain.

[`🔗 SafeDep analysis`](https://safedep.io/arrayref-proc-macro1-rust-build-time-malware/) · [`🔗 RustSec advisory-db #3161`](https://github.com/rustsec/advisory-db/issues/3161)

---

## 6. CVE-2026-64849 — an MLflow webhook "test" button reads your cloud metadata service

- **Velocity:** ▮▮▮ trending
- **Source:** NVD / CISA KEV · CVSS 9.3 · ~1d ago (~04:03 UTC+8)
- **Tags:** `cve` `ssrf` `mlflow` `kev` `cloud-credentials`

An unauthenticated, **full-read SSRF** in MLflow's model-registry webhook delivery (`POST /api/2.0/mlflow/webhooks/{id}/test`). The `_validate_webhook_url` guard checks only the *originally submitted* URL, while the delivery path follows HTTP redirects and re-resolves the hostname **without pinning the validated IP** — so a 302/307/308 redirect or DNS rebinding steers the request to `169.254.169.254` or any internal service, and the endpoint **reflects the response body back to the caller**. All versions before **3.15.0** are affected (fixed in 3.15.0, PR #24258); CWE-918, **CVSS 9.3** as assigned by the GitHub CNA. **CISA added it to KEV on 2026-08-19** with a 2026-09-02 remediation deadline, SSVC marking it *exploitation: active* and *automatable: yes*; watchTowr observed scanning within hours of CVE assignment on Aug 17.

**Why it matters:** Internet-facing MLflow tracking servers are ordinary in ML infrastructure, and the payoff here is temporary cloud IAM credentials read straight off the instance metadata endpoint — the shortest available path from "exposed ML tooling" to full cloud account takeover.

> Caveat: NVD has not published its own CVSS score; 9.3 is the CNA (GitHub) figure. The validate-then-follow-redirects split is the same defect shape as several prior SSRF-to-metadata bugs — validating a URL and fetching a URL are different operations.

[`🔗 NVD CVE-2026-64849`](https://nvd.nist.gov/vuln/detail/CVE-2026-64849) · [`🔗 GHSA-7gwp-5pfp-969j`](https://github.com/advisories/GHSA-7gwp-5pfp-969j)

---

## 7. GLM-5.3 — same base model as 5.2, and every gain came from post-training

- **Velocity:** ▮▮ rising
- **Source:** zhipuai.cn · vendor release · ~1d ago (~04:03 UTC+8)
- **Tags:** `model-release` `glm` `post-training` `rl-scaling` `open-weights`

**Zhipu (Z.ai)** shipped **GLM-5.3** with an unusual claim: it is built on the **exact same base model as GLM-5.2**, and all improvements come from post-training and RL scaling across longer, more diverse task environments. Vendor-reported deltas are large — **Terminal-Bench 3.0 4.6 → 28.3**, **DeepSWE v1.1 46.2 → 66.9**, **Agents' Last Exam 23.8 → 28.5**, **CyberGym 77.2% → 84.5%**, plus ExploitBench 54.4% and GDPval-AA v2 1769. The API went live **Aug 19** with a **1M-token context**, 128K max output, text-only I/O, and always-on reasoning at three effort levels. Zhipu positions it as the strongest open-source coding model; on Artificial Analysis it enters at an **Intelligence Index of 60**, tying Kimi K3 at the top of the open-weight field. **Weights are staged for roughly Aug 28**, held back for security hardening.

**Why it matters:** If a jump this size is reachable without touching the base model, the marginal return on post-training compute is currently higher than on pre-training scale — which is the cheaper axis for everyone who isn't training frontier bases.

> Caveat: every benchmark is vendor-reported, **parameter count and licence are undisclosed**, and the weights had not shipped at the time of writing. Zhipu explicitly ties the delayed open-weight release to the model's emergent vulnerability-discovery ability (CyberGym/ExploitBench) — a dual-use argument, from the vendor's own page.

[`🔗 Zhipu GLM-5.3 research post`](https://www.zhipuai.cn/zh/research/162) · [`🔗 Z.ai GLM-5.3 docs`](https://docs.z.ai/guides/llm/glm-5.3)

---

## 8. CVE-2026-20315 / -20317 — two CVSS 10.0 holes in the tool that does your microsegmentation

- **Velocity:** ▮▮ rising
- **Source:** Cisco advisory · CVSS 10.0 · ~1d ago (~04:03 UTC+8)
- **Tags:** `cve` `cisco` `access-control` `microsegmentation` `patch`

Cisco's **Aug 19 Secure Workload "security hardening release"** discloses five internally-discovered flaws, two at maximum severity: **CVE-2026-20315** (CVSS **10.0**, CWE-284 improper access control) and **CVE-2026-20317** (CVSS **10.0**, CWE-287 improper authentication), alongside CVE-2026-20231 (9.9, injection), CVE-2026-20318 (9.6, input validation) and CVE-2026-20319 (7.5, buffer handling). All are remotely reachable **with no privileges, no user interaction, and no special configuration**, affecting both SaaS and on-prem deployments "regardless of device configuration." Fixed in **3.10.9.1** and **4.0.4.16**; **no workarounds exist**.

**Why it matters:** Secure Workload *is* the microsegmentation control plane — a full authentication bypass in the product enforcing east-west policy undermines the containment assumption the rest of the architecture is built on. With no workaround, patching is the only lever.

> Cisco credits internal security testing "plus frontier AI models" for the discovery — another data point in the pattern of vendors finding their own critical bugs with model assistance before attackers do (compare item 10).

[`🔗 Cisco Security Advisory`](https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-hardening-csw1-shSvndWP) · [`🔗 SecurityWeek`](https://www.securityweek.com/cisco-patches-critical-crosswork-secure-workload-vulnerabilities/)

---

## 9. CVE-2026-19490 — a NetScaler auth bypass lands with ~22,000 appliances exposed

- **Velocity:** ▮▮ rising
- **Source:** CERT-EU 2026-010 · CVSS 9.3 · ~1d ago (~04:03 UTC+8)
- **Tags:** `cve` `citrix` `netscaler` `auth-bypass` `perimeter`

Citrix disclosed two NetScaler ADC/Gateway flaws on **Aug 19** (bulletin **CTX696939**): **CVE-2026-19490** (CVSS **9.3**, CWE-288, "authentication bypass using an alternate path") and CVE-2026-19489 (CVSS 8.8, memory overflow → DoS, requiring SIP ALG on an LSN group). The bypass is exploitable by **remote unauthenticated attackers with no user interaction** on appliances configured as a Gateway (SSL VPN, ICA Proxy, CVPN, RDP Proxy) or as an AAA virtual server. On newer builds (14.1-43.56+, 13.1-61.28+) a SAML action must also be configured; **older builds and 13.1-FIPS are exposed with just the Gateway/AAA configuration**. Fixed in **14.1-73.32** and **13.1-63.21** (FIPS/NDcPP: 13.1-37.277). Reported by Samarth Vashisht of JPMorgan Chase.

**Why it matters:** NetScaler sits at the enterprise perimeter and has a long history of post-disclosure mass exploitation. Rapid7 reports no in-the-wild activity yet but expects it "shortly" and is calling for emergency patching; roughly **22,000 internet-exposed instances** are in scope.

> Sourcing note: `support.citrix.com` is JavaScript-rendered and could not be read directly, so the technical details above are cited to the **canonical CERT-EU advisory 2026-010**, which reproduces the vendor bulletin. NVD has not published a score.

[`🔗 CERT-EU advisory 2026-010`](https://cert.europa.eu/publications/security-advisories/2026-010/) · [`🔗 SecurityWeek`](https://www.securityweek.com/exploitation-expected-for-critical-authentication-bypass-patched-in-citrix-netscaler/)

---

## 10. An XML comment truncates a SAML NameID — and Claude found it in four projects at once

- **Velocity:** ▮▮ rising
- **Source:** oblique.security · CVSS 9.4 · ~2d ago (~04:03 UTC+8)
- **Tags:** `cve` `saml` `authentik` `ai-assisted-research` `account-takeover`

Eric Chiang (CTO, Oblique Security) published *"Hacking SAML with Claude Code"* on **Aug 19**, describing a multi-agent harness around Claude Opus — run under Anthropic's Cyber Verification Program — that independently found **full authentication bypasses in four SAML implementations**: authentik (**CVE-2026-57580**), PHP litesaml/lightsaml (CVE-2026-63182, Response signature-wrapping), OneUptime (signature wrapping plus an email-truncation C14N differential), and Java saml-client. The authentik bug is the sharpest: on inbound SAML Sources using the **non-default** `USERNAME_LINK` or `EMAIL_LINK` matching modes, an attacker who controls their own NameID injects an **XML comment that truncates the value used for account matching** to a victim's username or email — while the signed assertion remains cryptographically valid. The attacker's external identity then binds to the victim's account, permanently, with no password and no IdP private key. **CVSS 9.4** (CWE-436, interpretation conflict); fixed in **2026.5.5** and **2026.2.6**.

**Why it matters:** Parser-differential bugs in SAML are old news; what's new is the **discovery rate**. Eight researchers reported this same authentik flaw essentially simultaneously — a signature of AI-assisted auditing sweeping a well-known bug class across many codebases at once, and a warning that hand-rolled SAML handling is broadly fragile.

> The default unique-identifier matching mode is unaffected — check which mode your SAML Sources use before assuming exposure. Oblique also flagged signature bypasses in a dozen projects for non-Response messages and DoS risks in Go `xmldsig`, JS `xmldom`, and `libxmlsec1`.

[`🔗 Oblique Security writeup`](https://oblique.security/blog/hacking-saml/) · [`🔗 authentik CVE-2026-57580`](https://docs.goauthentik.io/security/cves/CVE-2026-57580/)

---

## 11. The most-upvoted issue in Claude Code's tracker turned one year old, still closed

- **Velocity:** ▮▮ rising
- **Source:** GitHub · 343 pts HN · ~23h ago (~04:03 UTC+8)
- **Tags:** `agents-md` `claude-code` `standards` `agent-config` `community`

**anthropics/claude-code#6235, "Feature Request: Support AGENTS.md,"** resurfaced on Hacker News (343 pts, 213 comments) — and the interesting part is the metadata, not the ask. The issue was opened **Aug 21, 2025**, exactly a year ago, by DylanLIiii; it is **closed**; and it carries **6,340 reactions** (4,920 👍, 423 ❤️, 347 🚀) across **373 comments**, making it far and away the most-reacted item in the repository. The request is to support the tool-neutral **`AGENTS.md`** convention — already adopted by Codex, Amp, and Cursor — instead of, or alongside, the Claude-specific `CLAUDE.md`, so teams mixing agent tooling can maintain one instructions file. The thread was last touched Aug 20, 2026.

**Why it matters:** This is the config-file layer of the agent stack failing to converge in public. Every harness that ships its own dotfile pushes the cost onto repositories, which end up carrying `CLAUDE.md`, `AGENTS.md`, and `.cursorrules` describing the same project — the multi-file tax the standard was proposed to remove.

> Read the velocity honestly: nothing shipped this week. A year-old **closed** issue re-entered the front page, which is a signal about unresolved demand, not about a new release. Practical workaround in the thread: symlink or `@`-import one file from the other.

[`🔗 claude-code issue #6235`](https://github.com/anthropics/claude-code/issues/6235) · [`🔗 agents.md`](https://agents.md/)

---

## 12. A 125M-parameter transformer autocompletes your piano playing on an iPhone

- **Velocity:** ▮▮ rising
- **Source:** simedw.com · 416 pts HN · ~8h ago (~04:03 UTC+8)
- **Tags:** `on-device` `music-ml` `transformers` `coreml` `dpo`

A developer trained a small decoder-only transformer to continue live MIDI piano playing and shipped it as **RollTab**, a free iOS app, running **fully on-device**. Three sizes (**~33M / ~64M / ~125M** parameters) use a conventional stack — RMSNorm, rotary embeddings, causal self-attention, SwiGLU — but the representation is the clever part: a **single NOTE token carrying five categorical fields** (event type, pitch, delta onset, duration, velocity), each separately embedded and summed, so **the transformer runs once per note rather than once per field**. Timing is quantized to 24 steps per quarter note. Training used a few hundred thousand cleaned, deduplicated MIDI files ≈ **300M note events**, followed by DPO (β=0.01 and 0.03 helped, β=0.10 hurt), reaching **69.05% pairwise preference** over the base model. The 125M model runs at **~108 notes/sec on an iPhone 15**, exported to Core ML with INT8 weights, with a 512-note context that keeps the most recent 384 notes and rebuilds the KV cache.

**Why it matters:** A clean worked example of domain-specific tokenization beating brute scale — collapsing five fields into one token is what makes a 125M model fast enough to feel real-time on phone hardware.

> The author is candid about what doesn't work: occasional looping, and difficulty with very short prompts.

[`🔗 Technical writeup`](https://simedw.com/2026/08/20/midi-autocomplete/) · [`🔗 HN discussion (416 pts)`](https://news.ycombinator.com/item?id=49373456)

---

## 13. DiffusionGemma — Google fine-tunes an MoE into a diffusion LM at 1,500 tok/s

- **Velocity:** ▮▮ rising
- **Source:** arXiv · 118 pts HN · ~7h ago (~04:03 UTC+8)
- **Tags:** `diffusion-lm` `gemma` `inference` `open-weights` `paper`

The **DiffusionGemma Technical Report** (arXiv:2608.00146) describes an experimental **open-weight discrete-diffusion language model** that abandons token-by-token decoding and instead **iteratively refines blocks of 256 tokens in parallel**. It is produced by fine-tuning the mixture-of-experts **Gemma 4** (3.8B activated / 25.2B total) using **fewer than 10% of the base AR model's total training token budget**, via a two-stage pipeline: supervised fine-tuning for bidirectional denoising, then RL combined with sampler distillation to jointly improve quality and inference efficiency. The result generates **~20 tokens per forward pass** and reaches roughly **1,500 output tokens/sec on a single H100** — reported as substantially faster than AR models even with state-of-the-art speculative decoding — while retaining thinking mode, multimodal inputs, and long contexts.

**Why it matters:** The claim to watch isn't raw speed but that the model **remains capable of AR generation with only minor degradation**, which points at hybrid diffusion-AR decoding — picking the decoding strategy per request rather than per model.

> Timing note: the paper was submitted **31 Jul 2026** and only reached the front page on Aug 20 — the velocity here is attention catching up to a three-week-old report, not a new drop. 43 authors credited.

[`🔗 arXiv:2608.00146`](https://arxiv.org/abs/2608.00146) · [`🔗 HF Papers`](https://huggingface.co/papers/2608.00146)

---

## 14. Ant Group opens raw Ling-3.0 base checkpoints — under MIT, mid-training stages included

- **Velocity:** ▮▮ rising
- **Source:** Hugging Face · model release · ~1d ago (~04:03 UTC+8)
- **Tags:** `open-weights` `moe` `base-model` `mit-license` `ant-group`

Ant Group's **inclusionAI** released **Ling-3.0-tiny-base** (7.9B total / 1.3B active, 128 routed experts) and **Ling-3.0-flash-base** (124B total / 5.1B active, 512 routed experts) on **Aug 20** — plus **six checkpoints spanning pre-training, mid-training, and WSM-merged stages** — all under the permissive **MIT licence**. The architecture is a hybrid-linear MoE combining KDA and Gated MLA. Model-card benchmarks: **HumanEval-Plus 79.27 / 81.10**, **MMLU-Pro 51.83 / 67.74**, **MATH500 65.60 / 79.00** (tiny / flash).

**Why it matters:** These are **base** checkpoints, not chat models — and shipping the intermediate training stages under MIT is the part that matters for researchers, who normally get a single post-trained artifact and no view into the trajectory. It makes continued pre-training and MoE ablation work possible on a frontier-adjacent model.

> Caveat: benchmarks are vendor-reported, and base checkpoints are explicitly not intended for direct chat deployment without post-training. Contrast with item 7, where the weights are still embargoed.

[`🔗 Ling-3.0-tiny-base`](https://huggingface.co/inclusionAI/Ling-3.0-tiny-base) · [`🔗 Ling-3.0-flash-base`](https://huggingface.co/inclusionAI/Ling-3.0-flash-base)

---

## 15. "Mind viruses" — ideas that spread agent-to-agent and survive 20 memory wipes

- **Velocity:** ▮▮ rising
- **Source:** arXiv · paper · ~1d ago (~04:03 UTC+8)
- **Tags:** `multi-agent` `security` `prompt-injection` `agent-memory` `paper`

A paper by Vassilis Papadopoulos, McNair Shah, Sam Zimmerman and Jack Lindsey (**arXiv:2608.10218**) shows that natural-language "mind viruses" propagate through multi-agent systems by persuading agents to adopt and re-transmit them. Payloads planted in a **`SOUL.md`-style persistent identity file infected the next agent 55% of the time**, versus **17%** for ordinary workspace files, and accounted for **88% of successful propagation attempts**. Most striking: **all four action payloads survived 20 hops of full workspace wipes** — the idea persisted across environments that were completely reset. The mitigation is almost trivially cheap: **a single warning paragraph in the system prompt dropped spread to near zero**, and held against 150+ adversarially optimized payloads evolved over 15 generations.

**Why it matters:** This reframes agent memory hygiene as an epidemiological problem rather than a storage one. The concrete operational takeaway: **identity/persona files are a materially more dangerous injection surface than ordinary working files** — the 55% vs 17% gap is the number to design around — and the defence is one paragraph you are probably not currently writing.

> Timing: posted Aug 10, went viral over the past 48h. Per-model susceptibility figures circulating in secondary coverage are not in the abstract, which says only that frontier models "tend (with exceptions) to be less susceptible."

[`🔗 arXiv:2608.10218`](https://arxiv.org/abs/2608.10218) · [`🔗 alphaXiv`](https://www.alphaxiv.org/abs/2608.10218)

---

## 16. Diagram Design 2.6 — 38 editorial diagram types so agents stop emitting Mermaid

- **Velocity:** ▮ steady
- **Source:** GitHub · 24.2k stars · ~1d ago (~04:03 UTC+8)
- **Tags:** `diagrams` `claude-code` `agent-skills` `svg` `documentation`

**cathrynlavery/diagram-design** is an MIT-licensed HTML/SVG system giving coding agents **38 editorial diagram types** — architecture, sequence, Sankey, Wardley, Gantt, treemap and more — as self-contained HTML + SVG, with draw.io/Mermaid import, brand onboarding from a URL, and SVG/PNG export. Its own tagline states the thesis bluntly: *"No shadows. No Mermaid slop."* The **v2.6.0** release was consolidated on **Aug 20**, and the repo currently sits at **24,200 stars / 1,467 forks** on GitHub's weekly trending chart, having launched in April 2026.

**Why it matters:** Agents reliably produce diagrams that are structurally correct and visually illegible. Handing them a constrained editorial design system instead of a general renderer raises the floor on AI-generated architecture docs — a template problem solved with templates rather than a bigger model.

> Caveat: this is a template/skill library, not a runtime, and it is effectively a single-maintainer project. Its velocity is viral adoption rather than an infrastructure release — weigh accordingly before making it load-bearing.

[`🔗 cathrynlavery/diagram-design`](https://github.com/cathrynlavery/diagram-design) · [`🔗 Diagram gallery`](https://cathrynlavery.github.io/diagram-design/)

---

## 17. NVIDIA Switchyard v0.2 — a Rust LLM router that speaks native OpenAI *and* Anthropic

- **Velocity:** ▮ steady
- **Source:** GitHub · 1,960 stars · ~1d ago (~04:03 UTC+8)
- **Tags:** `model-routing` `rust` `nvidia` `proxy` `agent-infra`

**NVIDIA-NeMo/Switchyard** is an Apache-2.0 Rust proxy and library that routes LLM traffic across models and providers **while preserving native OpenAI and Anthropic API compatibility** — protocol translation, multi-backend routing, Prometheus metrics, and typed composable routing algorithms. **v0.2.0** (Aug 10) was a substantial redesign around a native Rust server plus a new `libsy` library, and the repo has since added roughly **1,220 stars in a week** to reach 1,960.

**Why it matters:** Routing keeps consolidating as core agent infrastructure (see item 2), and a vendor-neutral Rust implementation that speaks both dominant API dialects natively is a credible building block for cost and latency optimization without an SDK rewrite.

> Caveat: explicitly **pre-alpha** — both the README and the release notes say "not for production use," and APIs and configuration may change.

[`🔗 NVIDIA-NeMo/Switchyard`](https://github.com/NVIDIA-NeMo/Switchyard) · [`🔗 Releases`](https://github.com/NVIDIA-NeMo/Switchyard/releases)

---

## 18. Macro — email, chat, docs, tasks and CRM in one AGPL Rust monorepo

- **Velocity:** ▮ steady
- **Source:** GitHub · 3,858 stars · ~1d ago (~04:03 UTC+8)
- **Tags:** `open-source` `workspace` `rust` `agents` `crdt`

**macro-inc/macro** is an AGPL-3.0 monorepo unifying email, chat, docs, tasks, agents, calls and CRM behind **shared team-level AI memory**. The stack is a **Rust backend (167 crates)** with a SolidJS frontend, CRDT-backed documents, and an agent harness in which agents edit documents directly and act through MCP, API and SDK. It is **fully open source rather than open core** — notable for a company with $30M+ raised and SOC 2 Type II. Open-sourced in early August, it hit #1 on GitHub Trending on Aug 13 and is still shipping daily: **three releases landed on Aug 20 alone**.

**Why it matters:** Most "AI workspace" products bolt an assistant onto a suite. Macro's bet is the inverse — one datastore with agents as first-class peers alongside humans — and doing it as a single open Rust codebase makes it the most inspectable version of that argument currently available.

> Caveat: self-hosting documentation is thin (no Docker guide yet), and there is a licence inconsistency to resolve — `apps/web/LICENSE` still references "Copyright 2023 CoParse, Inc." Verify before relying on the AGPL grant.

[`🔗 macro-inc/macro`](https://github.com/macro-inc/macro) · [`🔗 macro.com`](https://macro.com/)

---

## 19. Claude's Gmail and Drive connectors can now send, move and trash

- **Velocity:** ▮ steady
- **Source:** support.claude.com · product update · ~2d ago (~04:03 UTC+8)
- **Tags:** `claude` `connectors` `google-workspace` `agent-actions` `permissions`

Anthropic updated Claude's Google Workspace connectors so that **Gmail can send, reply to and forward email** — previously read and search only — and **Google Drive can share, move and trash files**. Every write action requires **explicit user approval by default**. On Team and Enterprise plans, workspace owners control whether members may run actions without per-step confirmation, and must enable the connectors at the organization level first. Available on Claude web and desktop across paid plans.

**Why it matters:** This moves Claude from a read-only assistant to one taking **irreversible actions in systems of record**. Trashing a Drive file or sending mail on someone's behalf are not recoverable in the way a bad summary is — admins should set the approval and org-enablement policy deliberately *before* turning connectors on, not after.

> Caveat: the help article is labelled "Updated this week" rather than carrying a pinned date, and the change is not yet reflected in Anthropic's newsroom or release notes — it surfaced via the support page and social channels.

[`🔗 Google Workspace connectors`](https://support.claude.com/en/articles/10166901-use-google-workspace-connectors) · [`🔗 PCMag coverage`](https://www.pcmag.com/news/claude-can-now-send-gmail-messages-sometimes-on-your-behalf)

---

## 20. EgoSuite-Open100K — a 100,000-hour egocentric dataset starts landing on AtomGit

- **Velocity:** ▮ steady
- **Source:** AtomGit · dataset release · ~1d ago (~04:03 UTC+8)
- **Tags:** `dataset` `embodied-ai` `robotics` `egocentric` `open-data`

Beijing embodied-data firm **Guanglun (光轮智能 / Lightwheel)** announced **EgoSuite-Open100K** at WRC 2026 on **Aug 20**: a 100,000-hour full-modal human-behaviour dataset with head and wrist dual-view capture, whole-body and hand pose, depth, and semantic annotation, spanning **7 environment categories** (home, hospitality, retail, sports, logistics, office, industry). It is publishing on **AtomGit** under the Lightwheel organization as three repos — **EgoDemo** (flagship), **EgoStandard** (9,000 h head-view) and **EgoPro** (1,000 h dual-view).

**Why it matters:** Robot learning is bottlenecked on real physical-interaction data far more than on architectures, and open egocentric corpora at this scale are rare. If the full 100k hours lands, it is a meaningful step toward a shared embodied-data substrate rather than per-lab proprietary collection.

> Read the number carefully: **only the first batch — roughly 10,000 hours — is actually uploaded** (EgoStandard 9,000 h + EgoPro 1,000 h), with the org page marked "陆续上传发布" (publishing incrementally). **No Hugging Face mirror is live** despite press coverage saying otherwise, and **the licence is not stated on the org page** — check each repo's LICENSE before training on it.

[`🔗 AtomGit — Lightwheel org`](https://atomgit.com/Lightwheel) · [`🔗 PingWest coverage`](https://www.pingwest.com/w/316627)

---

## 21. VMware vCenter is being actively ransomed through two chained CVSS 9.8 flaws

- **Velocity:** ▮▮▮ trending
- **Source:** Rapid7 · CVSS 9.8 · ~3d ago (~12:03 UTC+8)
- **Tags:** `cve` `vmware` `vcenter` `kev` `ransomware`

Broadcom's **VMSA-2026-0006** (July 29) fixed two maximum-severity flaws in the vCenter management plane, and both are now confirmed under active exploitation: **CVE-2026-59310**, a directory traversal in the **vCenter Syslog server** (CVSS **9.8**, no auth, no interaction) yielding remote code execution, and **CVE-2026-59309**, an authentication bypass in **VMware Directory Service** (also CVSS 9.8) that is independently chainable for initial access. CISA added 59310 to the **KEV catalog on Aug 18**; German IR firm **QUIRSO** observed exploitation as early as **Aug 3** — five days after disclosure — across **361 victim IPs in 47 countries** (Germany 55, US 41, Turkey 38), with reverse-SSH persistence and one intrusion escalating to **Babuk-derived ransomware on ESXi hosts**, attributed to a likely China-nexus actor.

**Why it matters:** vCenter is the control plane for an entire vSphere estate — a compromise there grants enumeration, credential theft and VM control across every ESXi host it manages. With **no workaround**, the only lever is patching to 8.0 U3k / 9.0.2.0100 / 9.1.0.0300 — plus a compromise assessment, since patching won't remove persistence already planted.

> The two flaws were briefly assessed "no in-the-wild exploitation" at disclosure; QUIRSO's campaign data overturns that. Syslog and Directory Service are exactly the components most often left internet-reachable on older 7.0 builds, which are now end-of-support.

[`🔗 Rapid7 analysis (CVE-2026-59309/-59310)`](https://www.rapid7.com/blog/post/etr-critical-vmware-vcenter-vulnerabilities-allow-authentication-bypass-and-remote-code-execution-cve-2026-59309-cve-2026-59310/) · [`🔗 CISA KEV catalog`](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)

---

## 22. OpenAI open-sources the Codex agent harness — exec, SDK and app-server

- **Velocity:** ▮▮▮ trending
- **Source:** developers.openai.com · vendor release · ~2d ago (~12:03 UTC+8)
- **Tags:** `openai` `codex` `agent-harness` `open-source` `apache-2.0`

OpenAI announced (Aug 19) that the **Codex agent harness** — the execution framework powering the Codex app, CLI and IDE extensions — is now fully open source at `github.com/openai/codex` under **Apache-2.0**. Since April 2025 only the CLI frontend was public; what's new is the app-server protocol and SDK. Three integration surfaces ship together: **`codex exec`** (a non-interactive CLI for CI and batch jobs), the **Codex SDK** (TypeScript/Python) for embedding agent tasks in application code, and **`codex app-server`** (a JSON-RPC client protocol) for products where a persistent agent loop is a first-class feature. The Rust core (`codex-rs`) handles conversation state, context compaction, tool calls, sandboxed execution and approval flows. On **ARC-AGI-3**, harness-level optimizations (retained reasoning + compaction) lifted GPT-5.6 Sol from **13.3% to 38.3%** while cutting output tokens **6×** — OpenAI's own evidence that the harness, not just the model, sets the performance ceiling.

**Why it matters:** This makes "OpenAI's way to run an agent" a reusable, self-hostable substrate — swap in any OpenAI-compatible model and run unattended agent loops in CI. It's the same strategic move DeepSeek made with its MIT-licensed harness, and it reframes agent competition as harness engineering rather than model weights.

> What stays closed: model access, the IDE plugins, Codex Web, and hosted cloud products — the open layer is the integration surface, not the service. Repo is ~108.7k stars / 16.6k forks.

[`🔗 Codex as a platform`](https://developers.openai.com/blog/codex-as-a-platform) · [`🔗 openai/codex`](https://github.com/openai/codex)

---

## 23. Xiaohongshu ships its first open model — dots3-note, a 280B multimodal MoE

- **Velocity:** ▮▮▮ trending
- **Source:** Hugging Face · model release · ~1d ago (~12:03 UTC+8)
- **Tags:** `open-weights` `moe` `multimodal` `xiaohongshu` `tempo`

Xiaohongshu's **dots.studio** (RedNote HiLab) released **dots3-note Preview**, the company's first open-source model, under **Apache-2.0**. It's a sparse MoE with **280B total / 16B active** parameters, a **512K-token** context, and native text + image + video + audio input (a MoE ViT vision encoder plus an 800M audio encoder), with hybrid attention mixing 13 **DSA** and 33 **SWA** layers. The differentiator is its RL recipe, **TEMPO** (test-time-scaled value estimation with macro-step policy optimization): the model periodically flips from actor to critic, decomposing long tasks into macro-steps and estimating the remaining return — the lab's argument that *evaluation is easier than generation*, and that self-evaluation is what unlocks days-long agents. It ships with two new evals, **VibeSearchBench** and **VibeLifeBench**, and reports **75.1 on Terminal-Bench 2.1**.

**Why it matters:** A content platform — not a model lab — releasing a 280B multimodal MoE with a novel RL method and full deployment recipes (vLLM/SGLang, FP8 on 8×H100) signals that agent-optimized open weights are now table stakes. The 512K context is aimed squarely at long-horizon agent state.

> Read the reception honestly: the top model-card discussion is titled **"The model is very weak,"** and all benchmarks are self-reported — no independent Artificial Analysis/SWE-bench/LMSYS numbers had circulated as of writing. Weights went up ~Aug 14–15; the "first open-source model" news wave and Trending spike are Aug 20–21. Positioned as the *lightweight* member of a planned note/jazz/aria family.

[`🔗 dots3-note-prev (Hugging Face)`](https://huggingface.co/dots-studio/dots3-note-prev) · [`🔗 Transformers support PR #47844`](https://github.com/huggingface/transformers/pull/47844)

---

## 24. CVE-2026-72529 / -72530 — TrueConf Server joins KEV, unauthenticated RCE on port 4307

- **Velocity:** ▮▮ rising
- **Source:** CISA KEV · active exploitation · ~1d ago (~12:03 UTC+8)
- **Tags:** `cve` `trueconf` `kev` `video-conferencing` `rce`

CISA added two TrueConf Server vulnerabilities to the **KEV catalog on Aug 20**, both reachable by an **unauthenticated remote attacker on TCP port 4307**, with active exploitation cited as the basis. **CVE-2026-72529** is a missing-authentication-for-critical-function flaw allowing arbitrary script execution (federal remediation due **Aug 23**); **CVE-2026-72530** is a code-injection flaw letting a crafted script **break out of the isolated environment and execute arbitrary code on the host** (due **Sep 3**). Ransomware-use status is listed as unknown.

**Why it matters:** Video-conferencing servers sit at the network edge and are rarely patched with urgency, and TrueConf is widely deployed across government and enterprise in Eastern Europe. A chained script-exec → sandbox-escape path to host RCE on an unauthenticated port is a short route from "exposed meeting infra" to full host compromise.

> The 4307/TCP service is the administrative/protocol port — anything firewall-exposed there is in scope. Both flaws carry the KEV "active exploitation" flag, so treat the two-day and two-week deadlines as real.

[`🔗 CISA KEV alert (Aug 20)`](https://www.cisa.gov/news-events/alerts/2026/08/20/cisa-adds-two-known-exploited-vulnerabilities-catalog) · [`🔗 CISA KEV catalog`](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)

---

## 25. GitHub's postmortem: the Aug 17 outage was capacity, a misconfig, and a VS Code retry bug

- **Velocity:** ▮▮ rising
- **Source:** github.blog · 383 pts HN · ~1d ago (~12:03 UTC+8)
- **Tags:** `github` `outage` `postmortem` `infrastructure` `resilience`

GitHub published *"The August 17 outage, and the work ahead,"* a 7h47m-incident postmortem (13:28–21:15 UTC) whose root cause was a **capacity failure, not a code change**. A traffic peak saturated load balancers; an **Istio sidecar hit its concurrency limit**, but a **misconfigured autoscaling policy** monitored only the host service and never added capacity, cascading until **four HAProxy nodes exhausted their flow limits** and the gateway auth path degraded. Two amplifiers followed: GitHub's optimistic retry logic produced a retry storm, and a **latent retry bug in VS Code** multiplied Copilot token traffic **~10×** (7–9k → 70–100k RPS) once traffic rerouted. Context: monthly commits grew **1.4B (April) → 2.9B (August)**.

**Why it matters:** The failure chain — an autoscaler watching the wrong metric, then a client retry bug amplifying load 10× — is the canonical pattern for "the platform didn't break, it saturated" outages, and it's instructive precisely because GitHub is the best-resourced host in the world. The fix list (retry budgets, sidecar-aware autoscaling, the VS Code bug) is a checklist anyone running agent-heavy infra should steal.

> Second significant incident in August after the Aug 6 Actions failure. GitHub's remediation: correct autoscaling, audit Istio limits, consistent retry budgets, fix the VS Code bug, and keep expanding (3M+ cores, ~58% of load now on Azure).

[`🔗 GitHub postmortem`](https://github.blog/news-insights/company-news/the-august-17-outage-and-the-work-ahead/) · [`🔗 Computing.co.uk analysis`](https://www.computing.co.uk/news/2026/security/github-outage-exposes-flaws-in-autoscaling-and-retry-systems)

---

## 26. Huzzah — an editor where the source of truth is the pseudocode, not the code

- **Velocity:** ▮▮ rising
- **Source:** Show HN · 239 pts · ~1d ago (~12:03 UTC+8)
- **Tags:** `ai-coding` `pseudocode` `editor` `show-hn` `agent-tools`

Daniel Vaughn's **Huzzah** (`danielvaughn/hz`) inverts the coding-agent loop: instead of longform English prompts that scatter across transient chat sessions, the developer keeps **persistent pseudocode in a `.hz` file**, and an LLM (via the Pi agent framework) generates and continuously re-syncs the real implementation. The editor maintains a **source map between pseudocode lines and generated code lines**, so editing `fizz_buzz(n)` regenerates only the affected implementation. The thesis is explicit: prompts are "longform, imperative, and transient"; pseudocode is "declarative and persistent."

**Why it matters:** Most AI-coding tools treat the generated source as the durable artifact and the intent as disposable. Huzzah's bet is the opposite — a durable, human-authored distillation of intent that survives model and tooling changes — and the pseudocode↔code source map is the mechanism that makes "why does this code exist?" answerable later.

> Caveat: a proof of concept — no licence declared, 56 stars, and generated JavaScript runs in a local Web Worker the author calls "experimental containment, not a hostile-code sandbox." Module/directory-level scaling is untested.

[`🔗 danielvaughn/hz`](https://github.com/danielvaughn/hz) · [`🔗 HN discussion (239 pts)`](https://news.ycombinator.com/item?id=49378768)

---

## 27. vomit — a Go tool that has a local LLM clean up Claude 5's "token vomit"

- **Velocity:** ▮▮ rising
- **Source:** GitHub · 162 pts HN · ~1d ago (~12:03 UTC+8)
- **Tags:** `claude` `token-efficiency` `local-llm` `go` `agent-tools`

`zachahn/vomit` is a Go utility that intercepts Claude Code / Claude 5's output and rewrites it through a **separate local LLM** before display, under the tagline *"Save your tokens, Claude 5 is hopeless."* It buffers Claude's messages via a MessageDisplay hook, forwards them to a local model (the author uses **gpt-oss:20b**), and shows the compressed version instead of the verbose original. It's fully local (no telemetry), GPLv3, and works with Ollama, Llama.app or any OpenAI-compatible endpoint.

**Why it matters:** It's a tongue-in-cheek but real remedy to a widely-felt cost — frontier models that pad output with repetitive narration and over-decorated comments. Piping one model's output through a smaller one as a "style filter" is a cheap, composable pattern, and one HN commenter's "found vomit with a small LLM much better than anything Opus 5 ever wrote" is the honest review.

> Caveats from the author: the local model only sees what Claude says (so it "hallucinates a bit"), it's "pretty slow," "totally vibe-coded," and only tested on Mac.

[`🔗 zachahn/vomit`](https://github.com/zachahn/vomit) · [`🔗 HN discussion (162 pts)`](https://news.ycombinator.com/item?id=49375996)

---

## 28. mattpocock/skills — a TypeScript educator's `.agents` directory hits 211k stars

- **Velocity:** ▮ steady
- **Source:** GitHub · 211k stars · ~1d ago (~12:03 UTC+8)
- **Tags:** `agent-skills` `claude-code` `codex` `developer-tooling` `typescript`

Matt Pocock open-sourced his personal `.agents` directory as **`mattpocock/skills`** — "Skills for Real Engineers" — a MIT-licensed collection of small, composable `SKILL.md` files for Claude Code and Codex, installed with `npx skills@latest add mattpocock/skills`. Each skill targets a specific AI-coding failure mode: **`/grill-me`** and **`/grill-with-docs`** force the agent to interrogate you before starting (and record decisions as ADRs); **`/tdd`** and **`/diagnosing-bugs`** enforce red-green-refactor and a phase-gated debugging loop; **`ubiquitous-language`** builds a shared `CONTEXT.md` to stop agents being "too verbose." It has reached roughly **211k stars / 16k forks**.

**Why it matters:** The "personal skills vault as hard currency" trend — individual engineers publishing their tuned agent directories and watching them out-star framework projects — is now mainstream enough that a single author's folder is a top-25 GitHub repo. It's the complement to frameworks like obra/superpowers: opinionated process distilled to files, not a runtime.

> Framed as fixes for four failure modes: misalignment, verbosity, broken code, and "ball of mud." Star counts vary by tracker (188k–226k); all agree it's the week's fastest-growing skills repo.

[`🔗 mattpocock/skills`](https://github.com/mattpocock/skills) · [`🔗 opensourceai.tech profile`](https://opensourceai.tech/project/mattpocock-skills.html)

---

## 29. google-timeline-visualizer — turn your Google Location History into a travel film

- **Velocity:** ▮ steady
- **Source:** GitHub · 953 stars · ~1d ago (~12:03 UTC+8)
- **Tags:** `open-source` `kotlin` `visualization` `privacy` `data-portability`

`mahlernim/google-timeline-visualizer` converts an exported Google Location History **`Timeline.json`** into an animated travel-recap MP4 — moving map points, drawn routes and a zooming camera — entirely **on-device** (Android APK, iPhone web app, or a Python/FFmpeg generator), with no login and no upload. It uses Web Mercator projection, Haversine distances and great-circle (slerp) interpolation so long-haul flights animate as smooth arcs rather than teleporting across the map, and it's **MIT-licensed Kotlin**, ~953 stars at v2.2.x. The developer built it with AI coding tools (Antigravity and Codex).

**Why it matters:** It's a tidy, concrete example of **data portability colliding with AI-assisted development**: Google Takeout gives you your data, a lone developer plus a coding agent turns it into something delightful, and the whole thing runs locally so the privacy-sensitive location data never leaves your device. The same pattern — personal-data exports re-rendered by on-device tools — is spreading fast.

> Includes long-trip compression for pacing and a privacy mode (in testing) to exclude sensitive places like home and work from the video.

[`🔗 mahlernim/google-timeline-visualizer`](https://github.com/mahlernim/google-timeline-visualizer) · [`🔗 Technical breakdown (zh)`](https://blog.xlap.top/post/tech/2026-08-21/google-timeline-visualizer/)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-08-21T12:03:00Z |
| Items | 29 |
| Sources tracked | 35 (GitHub, Hacker News, arXiv, Hugging Face, alphaXiv, NVD, CISA KEV, cisa.gov, CERT-EU, Cisco, SecurityWeek, SafeDep, Oblique Security, goauthentik, bun.com, tipiirai.com, openrouter.ai, anthropic.com, support.claude.com, developers.openai.com, The Next Web, PCMag, laserphile, simedw.com, zhipuai.cn, docs.z.ai, AtomGit, PingWest, macro.com, agents.md, Rapid7, github.blog, computing.co.uk, opensourceai.tech, blog.xlap.top) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[Previous day](../2026-08-20/) · [Raw .md](../2026-08-21.md) · [Archive](../../archive/)
