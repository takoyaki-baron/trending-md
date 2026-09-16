---
date: 2026-09-16
updated: 2026-09-16T12:15:00+08:00
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 26
license: CC-BY-4.0
---

## 1. Fugleramme: an e-ink frame that hears birds and draws them as 1800s illustrations — Show HN #1

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 1,029+ pts · 8h ago (~20:31 UTC+8)
- **Tags:** `e-ink` `birdnet` `raspberry-pi`

A Raspberry Pi 5 + 13.3″ Pimoroni Inky Impression (Spectra 6) frame that runs BirdNET-Go locally
for audio bird detection — and when the detected species change, redraws one of 800+ hand-cut
public-domain illustrations (400+ species, sized by AVONET body mass). MIT-licensed, one-line Pi
installer, Docker compose bundles BirdNET-Go; the live demo runs from the author's kitchen window
in Bergen, Norway. The repo is genuinely alive: 279 commits, releases, CI, 1.2k stars.

**Why it matters:** Ambient, local-first AI that ends in a drawing on the wall instead of a chat
box — and the discipline that made HN love it is that the frame only redraws when the species
actually change.

> The README's own caveats: "still in early development: expect the odd bug"; artwork coverage is
> best for "the Nordics, the British Isles and Germany. Elsewhere not so much (yet)"; BirdNET-Go's
> detection is CC BY-NC-SA (non-commercial); and "no art is AI-generated, though some has been
> retouched with AI."

[`🔗 arnegiacomo/fugleramme`](https://github.com/arnegiacomo/fugleramme) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49711544)

---

## 2. Gemini 3.8 Live and 3.8 Live Extended Thinking — Google's new speech-to-speech pair

- **Velocity:** ▮▮▮ trending
- **Source:** Google blog · announced Sep 15 · HN 133+ pts
- **Tags:** `gemini` `speech-to-speech` `voice-ai`

Google's Gemini Audio Team shipped two voice models: 3.8 Live ("built for scale and cost
efficiency" — near real-time visual input, mid-conversation switching across 97 languages, background
tool execution) and 3.8 Live Extended Thinking, which reasons and speaks simultaneously, narrating
progress live ("Let me check that…"). Claimed numbers: #1 on the Artificial Analysis Speech-to-Speech
Quality Index at 82.6, 68.6% on τ-Voice agentic completion, 97.7% Big Bench Audio. Rolling out to the
Gemini API, AI Studio, Search Live, and Gemini Live; enterprise access is private preview.

**Why it matters:** The voice frontier is now contested by several labs at once — Nari Labs claimed
the price Pareto frontier yesterday, Google answers with the quality index. But the caveats to carry:
the announcement contains **no latency figures** (only partner quotes about "impressive latency") and
**no pricing numbers** despite the "cost efficiency" framing, and the EVA-Bench Pareto claim was run
on Google's own Live API/Agent Platform. All audio is SynthID-watermarked.

[`🔗 Google blog`](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-8-live-gemini-3-8-live-extended-thinking/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49715947)

---

## 3. Jev: "40-400× cheaper, 20-200× faster" — a non-autoregressive "system one" model, disclaimed by its own blog post

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 169+ pts · ~1h ago (~03:25 UTC+8)
- **Tags:** `inference` `structured-outputs` `benchmarks`

TypeSafe AI (founder Diogo Almeida, ex-OpenAI) announced Jev, a non-autoregressive model that outputs
typed structured values with calibrated probabilities in one parallel pass — 70–500 ms vs 3–329 s for
frontier LLMs, $0.042/MTok input vs $0.20–$10, trained with what they call "RLCD" (RL for Calibrated
Decisions). The HN headline: 193.6× faster and 444.6× cheaper than GPT-6 Astra/Fable 5.1 averages on
their workflow evals.

**Why it matters:** This is exactly the headline shape the feed's source-validation rules flag — a
delta whose two numbers come from different setups. The post itself disclaims it repeatedly: evals
ran from West Coast laptops; pricing may be subsidized; "0% hallucination" is guaranteed by schema
math, not measured; workflows were authored by TypeSafe's own team; reference answers bias toward
OpenAI/Anthropic; LLM baselines went through TypeSafe's own slower structured-output wrapper; the
demo used short dense inputs ("favorable lighting for Jev"); and it's waitlist-only. The underlying
idea — calibrated typed function calls in a single pass — is worth taking seriously; the 444× is not.

[`🔗 TypeSafe blog`](https://typesafe.ai/blog/introducing-system-one-models-and-jev) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49717558)

---

## 4. Capsule — single-file web apps that save their data into SQLite

- **Velocity:** ▮▮ rising
- **Source:** Show HN · 227+ pts · 7h ago (~21:31 UTC+8)
- **Tags:** `sqlite` `web-apps` `show-hn`

Capsule (v0.4.0) packages an entire app — HTML/CSS UI, schema, and a live SQLite database — into one
portable `.capsule` file that opens in a desktop host player with data preloaded: no cloud, no
accounts, shareable like a document. Apps are generated from natural-language prompts and iterable
via prompt or MCP coding tools.

**Why it matters:** "Apps as documents" is an old dream (the self-contained-HTML lineage goes back
 decades), and SQLite-in-a-file is the right substrate. The open question is the one the product page
doesn't explain: the mechanism by which live SQLite writes round-trip back into the shared file.

> Page-stated limits: the web preview "cannot open or save files directly on your computer"; a host
> player is required (macOS 12+/Win10/Linux); mobile is "coming soon"; and there is no GitHub repo —
> Capsule is not open source.

[`🔗 withcapsule.app`](https://withcapsule.app/) · [`🔗 Show HN discussion`](https://news.ycombinator.com/item?id=49712278)

---

## 5. The Wayback Machine starts rate-limiting — and catches real users in the net

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 194+ pts · 2h ago (~01:52 UTC+8)
- **Tags:** `internet-archive` `rate-limiting` `crawlers`

The Internet Archive's Mark Graham posted Sept 15 that "waves of high-volume automated traffic" forced
new traffic protections on the Wayback Machine: blocked requests now get HTTP 429 with a rewritten
explanation page, and fixes are ongoing. Crawlers, link checkers, and archive.org API users are
hitting the blocks. Notably, the post does not say "DDoS" or "breach" — it's abusive-bot mitigation,
and the Archive explicitly admits "the protections sometimes catch real people by mistake," asking
wrongly blocked users to email info@archive.org.

**Why it matters:** The agentic-web feedback loop in miniature: more agents crawling means more bot
traffic means blunt defenses that snare humans — with no timeline for resolution. If your tooling
cites Wayback links, expect intermittent 429s and build retries.

[`🔗 Internet Archive blog`](https://blog.archive.org/2026/09/15/an-update-on-wayback-machine-access/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49716176)

---

## 6. CISA flags the vCenter Syslog path traversal (CVE-2026-59310) as ransomware-used

- **Velocity:** ▮▮ rising
- **Source:** CISA KEV update · reported Sep 15
- **Tags:** `vmware` `ransomware` `cisa-kev`

CISA updated the KEV entry for CVE-2026-59310 — directory/path traversal (CWE-22) in the vCenter
Syslog server, CVSS 9.8 per Broadcom's advisory — to `knownRansomwareCampaignUse: "Known"`, with
mandatory forensic triage under BOD 26-04. The bug was patched July 29 and KEV-added Aug 18; DFIR
firm QUIRSO has tracked a suspected APT compromising 361+ IPs across 47 countries since Aug 3,
persisting via the open-source `reverse_ssh` framework.

**Why it matters:** vCenter is the management plane of the hypervisor estate — the crown-jewel target.
A ransomware flag landing two months after the patch says unpatched estates are being swept for
staging, not just probed. And the honesty caveats: no gang has been named (CISA "yet to share any
details"), Shadowserver sees 450+ exposed vCenter servers, and nobody knows how many are patched.

[`🔗 BleepingComputer`](https://www.bleepingcomputer.com/news/security/cisa-critical-vmware-vcenter-rce-flaw-now-exploited-by-ransomware-gangs/) · [`🔗 SecurityWeek`](https://www.securityweek.com/critical-vmware-vcenter-vulnerability-in-attackers-crosshairs/)

---

## 7. Atria Dawn Preview: Shanghai AI Lab's 744B agentic MoE ships MIT-licensed

- **Velocity:** ▮▮ rising
- **Source:** arXiv + Hugging Face papers · 368+ upvotes
- **Tags:** `open-weights` `moe` `agents`

Atria Dawn Preview (arXiv 2609.15818, Sept 14, 143 authors) is a 744B-parameter MoE built on a
GLM-5.2 foundation with 256K context, trained via a "Verifiable Experience Pipeline" — tool
interactions scored in executable environments. MIT-licensed weights in BF16 + FP8. The README claims
the highest reported scores on 5 of 16 benchmarks (DeepSearchQA 96.0, BrowseComp 92.5, CyberGym 86.5,
BFCL v4 77.0, SWE-bench Pro 59.6).

**Why it matters:** Another very large open-weights agentic entrant — but the release's most valuable
line is its own: the abstract stresses that two-thirds of the AI-assisted tasks in its 769-task case
study were still feasible *without* AI. Also note the fine print: it's text-only (the README ships
hooks for Codex and Claude Code to block image/PDF inputs), several benchmark rows have missing
competitor data, and the HF model page is gated.

[`🔗 arXiv 2609.15818`](https://arxiv.org/abs/2609.15818) · [`🔗 atria-asi/Atria-Dawn-Preview`](https://github.com/atria-asi/Atria-Dawn-Preview)

---

## 8. Strix got admin access to Baseten's production GitHub in 25 minutes — via a PAT baked into a Docker layer

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 120+ pts · 2h ago (~02:11 UTC+8)
- **Tags:** `secrets` `docker` `disclosure`

Evaluating Baseten black-box, security firm Strix found an anonymously-accessible Harbor container
registry, pulled the `baseten-app` image, and extracted a live GitHub PAT from its build history: a
`RUN` step had expanded `GITHUB_TOKEN` into the command, so Docker recorded it permanently. The token
(org member `basetenbot`, `repo` scope) had admin+push on the main product repo, the GitOps repo
driving production, and the Homebrew tap — and though the image was built in March 2023, the token
still worked in July 2026. Baseten rotated it the afternoon after the July 13 report.

**Why it matters:** The most consequential cloud exposures of 2026 keep being 2013-era mistakes:
layer history is forever, and a `repo`-scoped PAT inside a GitOps pipeline is production control.
The disclosure was coordinated — no customer repo cloned, nothing pushed, read-only calls only — and
the writeup's explicit "what we did not do" section is part of why it landed well.

[`🔗 Strix blog`](https://www.strix.ai/blog/baseten-harbor-github-pat-takeover) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49716476)

---

## 9. "Plan Injection": Stanford shows CoT monitors can be evaded with benign-sounding context

- **Velocity:** ▮▮ rising
- **Source:** arXiv · Sep 14
- **Tags:** `ai-safety` `chain-of-thought` `monitorability`

Keertana Chidambaram, Andrew Ilyas, and Vasilis Syrgkanis (arXiv 2609.15989) show that planting
harmful-but-benign-sounding reasoning in an actor model's context steers it toward unsafe plans while
the visible chain-of-thought stays clean — evading CoT monitors at 25–33% across monitorability
benchmarks, scaling up to DeepSeek-R1. Actors paraphrase the injected plans as their own reasoning,
without attribution.

**Why it matters:** It attacks chain-of-thought monitoring at the *input* rather than the weights —
and its two most counterintuitive findings belong in every monitorability design doc: giving the
monitor access to the injected plan *cut* detection by up to 50% on a Bio-Math task, and some
monitors given extra thinking tokens "rationaliz[ed] the injected plan rather than flagging it."
More monitor compute can backfire.

[`🔗 arXiv 2609.15989`](https://arxiv.org/abs/2609.15989) · [`🔗 arXiv cs.AI recent`](https://arxiv.org/list/cs.AI/recent)

---

## 10. ZGCM-1: a "fully open" 7.39B model that goes door-to-door with giants on math

- **Velocity:** ▮ steady
- **Source:** arXiv + GitHub · 291+ upvotes on HF papers
- **Tags:** `open-weights` `math` `training`

Zhongguancun Academy's ZGCM-1 (arXiv 2609.13356) is a 7.39B dense model trained from scratch —
~4.19T pretrain tokens, FP8 + Muon optimizer, hybrid sliding-window + global attention, 256K context
— with weights, per-stage data, training code, and W&B logs all public under MIT. README numbers:
MATH-500 97.13%, AIME 2026 75.00%, GAIA text-only 42.52%.

**Why it matters:** The fully-open training stack (data + code + logs) is rarer than the weights, and
the 4.2× pretrain time-to-loss claim matters more for reproducibility than any single score. But the
paper's abstract gives no numbers — all "competitive with Qwen3-235B-A22B and GLM-5.1" claims are
qualitative — and BrowseComp at 19.43% is low in absolute terms however it's framed.

[`🔗 arXiv 2609.13356`](https://arxiv.org/abs/2609.13356) · [`🔗 zgcagi/ZGCM-1`](https://github.com/zgcagi/ZGCM-1)

---

## 11. Exposed Vite dev servers are being mass-scanned for cloud credentials (CVE-2026-39364)

- **Velocity:** ▮ steady
- **Source:** F5 Labs + GitHub advisory · reported Sep 11–15
- **Tags:** `vite` `credential-harvesting` `dev-servers`

An automated campaign is scanning internet-exposed Vite dev servers to exploit CVE-2026-39364
(GHSA-v2wj-q39q-566r, CVSS 8.2 GitHub-reviewed): the `server.fs.deny` block is bypassed by appending
`?raw` / `?import&raw` / `?import&url&inline` query params, serving `.env`, `rootkey.csv`,
`.azure/accessTokens.json`, and `terraform.tfstate` with HTTP 200. F5's honeynets saw 807
session-grouped attacks (~32,000 raw events) in August — up from a three-month baseline of 1,732
file-read events — largely from Google Cloud IPs, impersonating ClaudeBot, GPTBot, and Googlebot.
Patched in Vite 7.3.2 / 8.0.5 since April.

**Why it matters:** Dev servers keep leaking into production ranges, and the campaign dresses itself
up as the AI crawlers everyone whitelists. F5's own caveat is the story's honesty marker: honeypot
attempts, not confirmed thefts — "actual exfiltration of specific credentials or Terraform state is
not verified." Exploitation also needs three conditions to line up (exposed host, file in
`fs.allow`, denied only via `fs.deny`).

[`🔗 GHSA-v2wj-q39q-566r`](https://github.com/advisories/GHSA-v2wj-q39q-566r) · [`🔗 F5 Labs`](https://www.f5.com/labs/articles/cloud-takeover-mass-scanning-for-exposed-vite-endpoints-cve-2026-39364)

---

## 12. A human attacker turned marimo's old pre-auth RCE into an AWS bastion foothold in 8 seconds

- **Velocity:** ▮ steady
- **Source:** Sysdig Threat Research · Sep 11
- **Tags:** `rce` `notebooks` `cloud-security`

Sysdig documents an intruder exploiting CVE-2026-39987, the pre-auth RCE in the marimo reactive
Python notebook (disclosed and patched back in April: `/terminal/ws` skips the `validate_auth()`
check other WebSocket endpoints apply, fixed in 0.23.0). The actor
swept the local /24, stole AWS keys from the host environment and the app's Redis backend, called
`secretsmanager:GetSecretValue` across five regions via hand-written boto3, and authenticated to an
internet-facing bastion **8 seconds** after the WebSocket opened.

**Why it matters:** "Patch your notebooks" is the small lesson; the big one is dwell-time math —
a prepared human operator moves faster than most alerting pipelines. Sysdig found no LLM-generated
scripts, and the actor ignored a planted prompt-injection probe twice (attribution is
absence-of-evidence, not proof). The initial credential harvest also predates Sysdig's visibility
window by 28+ hours.

[`🔗 Sysdig TRT`](https://www.sysdig.com/blog/machine-speed-hold-the-ai-hand-rolled-marimo-cve-2026-39987-exploit) · [`🔗 GHSA-2679-6mx9-h9xc`](https://github.com/marimo-team/marimo/security/advisories/GHSA-2679-6mx9-h9xc)

---

## 13. LiteSpeed Enterprise patches a root-escalation flaw — silently, with no CVE and no CVSS

- **Velocity:** ▮ steady
- **Source:** cPanel advisory · Sep 14
- **Tags:** `litespeed` `privilege-escalation` `shared-hosting`

cPanel warned Sept 14 that LiteSpeed Web Server Enterprise before 6.3.7 lets a low-privilege hosting
account gain root on shared servers, bypassing account isolation including CageFS. LiteSpeed shipped
6.3.7 on Sept 11; both vendors urge forcing the update (`lsup.sh -f -v 6.3.7`). It's described as
"critical" — but carries no CVE ID and no CVSS, and a Sept 15 CVE-records check finds nothing.

**Why it matters:** This is the third LiteSpeed root-class bug since May (the previous two, in the
cPanel plugin, were both KEV-listed), and the disclosure is a case study in what "silent" costs
defenders: no technical description, changelog entries that don't say which fix applies, no IOCs —
and 6.3.6 was still listed "stable" on LiteSpeed's download page after the fix shipped. No evidence
of exploitation yet.

[`🔗 cPanel advisory`](https://support.cpanel.net/hc/en-us/articles/43483286674583-Security-LiteSpeed-Enterprise-security-advisory-September-14-2026) · [`🔗 The Hacker News`](https://thehackernews.com/2026/09/litespeed-enterprise-flaw-could-let-one.html)

---

## 14. WordPress Wholesale Lead Capture file-upload flaw under mass attack — 100k+ attempts blocked (CVE-2026-27540)

- **Velocity:** ▮ steady
- **Source:** Wordfence / BleepingComputer · reported Sep 15
- **Tags:** `wordpress` `file-upload` `webshell`

Attackers are actively exploiting CVE-2026-27540 (CVSS 9.8, Wordfence-assigned), an unauthenticated
arbitrary file upload in the WooCommerce Wholesale Lead Capture plugin (≤ 2.0.3.1). The AJAX action
`wwlc_file_upload_handler` draws its extension allowlist from the user-controlled `file_settings`
parameter — so attackers simply add `php` and drop webshells. Wordfence has blocked 100,000+
attempts (spikes June 4–17, July 1, Aug 30); the fix shipped in 2.0.3.2 back on Feb 20, but unpatched
sites keep getting hit.

**Why it matters:** An eight-month-old patch and a still-running attack wave is the WordPress
long-tail problem in one number — and the number needs its caveat: those are blocked *attempts*, not
confirmed compromises; per-victim shell counts are unknown, and WPScan's record is still flagged
"not yet verified."

[`🔗 BleepingComputer`](https://www.bleepingcomputer.com/news/security/hackers-target-wordpress-sites-via-third-party-woocommerce-plugin/) · [`🔗 WPScan`](https://wpscan.com/vulnerability/a3cc250e-abec-4c6f-bbbd-4e5cb2b468df/)

---

## 15. DDRop: a $159 DDR5 interposer breaks confidential computing's integrity guarantees

- **Velocity:** ▮ steady
- **Source:** The Hacker News · ACM CCS 2026 paper
- **Tags:** `memory-encryption` `tdx` `hardware-attack`

Researchers from KU Leuven, ETH Zurich, Durham, and Google show a ~$159 DDR5 bus interposer that
silently drops writes so the CPU reads stale encrypted data — exploiting the missing *freshness*
guarantee in scalable memory encryption. On Intel TDX they achieved full control of a protected VM,
including forged launch measurements and attestation; on AMD SEV-SNP, page-copy attacks. It's the
first active interposer attack on DDR5 and the first to break current TDX integrity.

**Why it matters:** Both vendors declined to assign a CVE, holding physical interposer attacks
outside their threat model — so there is no patch, only design pressure. The honest limits: TDX's
cryptographic-integrity mode wasn't tested (the lab system lacked it), Arm CCA was untested, and the
attacker needs both server software control and brief physical access. NVIDIA's confidential GPUs are
unaffected (on-package memory).

[`🔗 The Hacker News`](https://thehackernews.com/2026/09/new-ddrop-attack-breaks-intel-tdx-and.html) · [`🔗 Project page`](https://ddropattack.eu/)

---

## 16. Ordewell — one goal in, an ordered per-task-model coding-agent plan out

- **Velocity:** ▮ steady
- **Source:** Show HN · 43+ pts · 29 comments
- **Tags:** `coding-agents` `planning` `orchestration`

A read-only planner agent researches your repo, asks clarifying questions, and produces a typed,
editable plan of coding-agent tasks — each with its own runner (Claude Code, Codex, OpenCode), model,
and effort level — then executes against the dependency graph (default 3 parallel, max 5). Completion
is decided by a "VerdictEngine" that requires a unique completion marker in runner output: "the model
is never the tie-breaker."

**Why it matters:** The interesting stance isn't the orchestration, it's the refusal to let the model
grade its own homework. Early days though — 80 stars, and the README lists real gaps: tmux required
on every platform (Windows under WSL), npm-installed agent CLIs hit cmd.exe's 8,191-char limit, and
the web dashboard serves JSON only.

[`🔗 ordewell/ordewell`](https://github.com/ordewell/ordewell) · [`🔗 Show HN discussion`](https://news.ycombinator.com/item?id=49712276)

---

## 17. Panel — a research workspace where the agent builds its own panes

- **Velocity:** ▮ steady
- **Source:** Show HN · 44+ pts · 10 comments
- **Tags:** `research-tools` `agents` `show-hn`

A dock-style research workspace (chat, files, PDFs, real Jupyter kernels) where the agent can read
and write files, run long-running background commands, and — the distinctive bit — write custom
pane/viewer code when the built-in panes aren't enough. A "Module Protocol" of Skills-like typed
inputs and outputs keeps agent-built modules observable and validable.

**Why it matters:** Most agent workspaces stop at tool-calling; making the agent extend its own UI,
inside a typed protocol, is a genuinely different point on the curve. The README's "what doesn't yet"
section is candid: only Claude Code is fully supported, modules don't work with the OpenAI API yet,
modules launch only via chat, and "hypothesis Modules have no view of their own." 39 stars, early
tester build.

[`🔗 greentfrapp/panel`](https://github.com/greentfrapp/panel) · [`🔗 Show HN discussion`](https://news.ycombinator.com/item?id=49712621)

---

## 18. Homebrew ships BrewUI — the official macOS GUI, sandboxed through real zsh

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · +356 today · 1.3k total
- **Tags:** `homebrew` `macos` `gui`

Homebrew's official SwiftUI package GUI for discovering, installing, and updating packages is
trending at +356 stars today — an ecosystem milestone after years of third-party GUIs (Cakebrew,
Applite). Its design stance is the notable part: it "never hides what Homebrew is doing" — it shells
out to `/bin/zsh --no-rcs` with a minimal PATH rather than reimplementing brew, built on Swift 6.0
strict concurrency.

**Why it matters:** After the 7.0 release added `brew vulns` and an Intel countdown, an official GUI
completes Homebrew's surface for non-terminal users. The trade-offs are by-design and worth knowing:
requires macOS Tahoe 26+, no releases yet on the Releases page, and login-shell aliases/env vars/
custom PATH are ignored — configuration goes in `brew.env` files instead. AGPL-3.0.

[`🔗 Homebrew/BrewUI`](https://github.com/Homebrew/BrewUI) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49657121)

---

## 19. Vidu S2: real-time interactive avatars and live video editing, at 720p

- **Velocity:** ▮ steady
- **Source:** arXiv · Sep 10
- **Tags:** `video-generation` `avatars` `real-time`

Vidu (Shengshu) published S2 (arXiv 2609.11638, 35 authors): S2-Avatar, a real-time interactive
digital character with voice interaction and reference-guided outfit/background/object switching, and
S2-Editing, which edits an incoming video stream on the fly — style transfer, clothing/character/
background replacement — plus exploration of real-time spatial video. Abstract claims real-time 720p,
up from S1's 540p@25FPS, with a live demo at vidu.com/vidu-stream.

**Why it matters:** Interactive video is converging on livestream infrastructure — if a model can
edit an incoming stream at 720p in real time, "video call with a live filter stack" becomes a
products question, not a research one. The caveat is that the abstract's only benchmark statement is
the unquantified "outperforms all baselines": no latency/FPS numbers, and the demo page is vendor
marketing, not a data source.

[`🔗 arXiv 2609.11638`](https://arxiv.org/abs/2609.11638) · [`🔗 Vidu Stream demo`](https://www.vidu.com/vidu-stream)

---

## 20. Edge0's 35B MoE trends on a "3 GB active memory" claim — with no benchmarks published

- **Velocity:** ▮ steady
- **Source:** Hugging Face trending · 17.9k downloads · 2.6k likes
- **Tags:** `on-device` `moe` `edge-ai`

Edge0-35B-A3B-preview, a 35B sparse MoE with ~3B active parameters claiming "about 3 GB peak active
memory," is climbing Hugging Face's trending listings alongside an 8B-A1B sibling (~1 GB) and a family
of tiny ASR/TTS models (0.1B–0.6B). The positioning is local/private/offline inference for phones,
laptops, wearables, and robots.

**Why it matters:** The download velocity is real, but so is what's missing: no numeric benchmark
results anywhere on the org page — the *only* performance claim is the memory footprint — no license
stated, and the 3 GB figure is the org's own, unverified. Sparse-MoE memory math and real-world
latency are different claims; treat this as a signal to investigate, not a spec sheet.

[`🔗 Edge0 on Hugging Face`](https://huggingface.co/Edge0) · [`🔗 HF trending models`](https://huggingface.co/models?sort=trending)

---

## 21. "I Came, I Prompted, I Left Part 2" — a conformant M4 GPU driver built in one month

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 202+ pts · 8h ago (~03:30 UTC+8)
- **Tags:** `gpu-driver` `reverse-engineering` `agents`

Cody Ho and Niklas built a fully OpenGL ES 3.0-compliant GPU driver for the M4 Mac Mini (and the
"MacBook Neo") in about a month — a process that "normally takes years." They reverse-engineered the
AGX firmware ABI and user space for the M4, A18 Pro, and (mostly) M5 using only live hardware
probing, built a custom IR/shader compiler and command-stream builder, and implemented a full Linux
kernel driver — with Chrome and Firefox running WebGL with working compositing, and Minecraft at
200 fps. The clean-room discipline is the headline: no Apple binaries were opened, only hardware
traces from the hypervisor the author built previously, with all experiments published for
provenance verification.

**Why it matters:** This is the sequel to "I came, I prompted, I left" — LLM agents did much of the
implementation grind under human direction, and pairing a custom hypervisor with agent-driven RE
compressed a multi-year effort into weeks. The post's own honesty markers: "days was overly
optimistic" (it took weeks), the code is "not yet ready for end users," and conformant Vulkan is
still ahead.

[`🔗 codyho.dev`](https://codyho.dev/blog/gpu-driver/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49717638)

---

## 22. Admin Menu Editor Pro supply-chain attack — a backdoored update served twice in one day

- **Velocity:** ▮▮ rising
- **Source:** BleepingComputer + vendor advisory · reported Sep 15
- **Tags:** `supply-chain` `wordpress` `backdoor`

An attacker compromised adminmenueditor.com on Sep 14 and pushed a malicious 2.35 update of the
Admin Menu Editor Pro plugin (the premium twin of a 300k+-install free plugin): an included
`includes/wp-user-consent.php` installed a web shell and created a hidden administrator account.
Developer Janis Elsts noticed and pushed a clean 2.36 the same day at 19:00 UTC — but the attacker
still had server access and compromised 2.36 too. At least 230 customers installed the malicious
update on ~1,500 sites; Elsts warns the real count could be higher because trojanized-2.36 installs
are hard to count. The vendor site is now offline: "sales, plugin update checks, and downloads are
disabled until the site is rebuilt on new infrastructure."

**Why it matters:** The textbook lesson made live: the emergency fix was re-compromised because the
intrusion wasn't evicted before remediating. Unlike item 14's attacks on unpatched sites, this is
upstream — the vendor's own update channel was the weapon, which no customer-side patching can
prevent.

[`🔗 BleepingComputer`](https://www.bleepingcomputer.com/news/security/malcious-admin-menu-editor-pro-plugin-backdoors-1-500-wordpress-sites/) · [`🔗 Vendor advisory`](https://adminmenueditor.com/)

---

## 23. Cloudflare's "Disallow AI Training": stay in search, refuse training — and an "Accountable" label for crawlers

- **Velocity:** ▮▮ rising
- **Source:** Cloudflare blog · 35+ pts · 2h ago (~10:25 UTC+8)
- **Tags:** `ai-crawlers` `robots-txt` `publishing`

A new setting lets sites publish a `Disallow` directive for mixed-use search+training crawlers and
enforces it at Cloudflare's network layer: "we publish the preference, identify who is crawling,
classify why they are crawling, and block the ones that ignore it — then report what each operator
actually does on Radar." Apple, Google, and Microsoft are named as meeting the new "Accountable"
designation: a training opt-out, a summary opt-out, URL-level visibility into what was used for
training, and assurance that opting out of training won't affect search ranking. Cloudflare's data:
under 1% of its sites block search bots, while 17% block training in some form. Per-summary content
controls are promised "by early next year."

**Why it matters:** It moves the training opt-out from unenforceable robots.txt to network
enforcement — a real change for publishers. But the caveats are structural: a private company is
defining "accountable" for the industry, the designation bundles shipped capabilities with
time-bound *commitments*, and the enforcement only binds crawlers that route through Cloudflare's
classification.

[`🔗 Cloudflare blog`](https://blog.cloudflare.com/accountable-mixed-use-ai-crawlers/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49721435)

---

## 24. Continual learning mechanisms compose — JHU reports 28× better long-horizon memorization, and what it costs

- **Velocity:** ▮▮ rising
- **Source:** Hugging Face papers · 270+ upvotes
- **Tags:** `continual-learning` `memorization` `training`

Johns Hopkins (Alvin Zhang, Daniel Khashabi, Tianmin Shu; arXiv 2609.06986) defines "long-horizon
memorization": a model learns 100 query-answer tasks sequentially via continual supervised
fine-tuning, with no access to earlier raw examples and no task identifiers at inference. Naive
sequential fine-tuning retains 1.2%; the best single mechanism 8.1%; composing mechanisms across
three anchors (data/function/weight) plus merged LoRA reaches 34.9% average retention — the only
composition ranking top-3 on all three datasets — and extends memory half-life from 1–2 tasks to
19–44. A factorial analysis finds replay and merged LoRA have the largest main effects, with a
statistically significant super-additive interaction.

**Why it matters:** Agent memory keeps hitting the same wall, and this maps the design space
instead of proposing one trick. The paper's own limits belong in the takeaway: it's memorization,
not generalization (evaluated on training queries); every method still catastrophically forgets on
GSM8K/MATH/MMLU-Redux; and retention curves keep declining — forgetting is delayed, not prevented.

[`🔗 arXiv 2609.06986`](https://arxiv.org/abs/2609.06986) · [`🔗 HF papers`](https://huggingface.co/papers/2609.06986)

---

## 25. addyosmani/agent-skills — the skills wave's biggest collection is a 94.9k-star SDLC

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · +307 today · 94.9k total
- **Tags:** `agent-skills` `coding-agents` `workflow`

Addy Osmani's "Production-grade engineering skills for AI coding agents" — 25 skills and 9 slash
commands mapped onto define→plan→build→test→review→ship, with skills that auto-activate by context
(designing an API triggers `api-and-interface-design`) and a `/build auto` mode that generates the
plan and implements every task in a single approved pass, keeping per-task tests and individual
commits. Installs via the vercel-labs `skills` CLI into 70+ agents.

**Why it matters:** While one-file skills trend daily, the largest repo in the genre is betting on
lifecycle discipline — spec before code, test gates, human approval between stages. The README's
own fine print: a per-skill `npx` install copies only the skill folder and omits the repo-level
`references/` directory, so shared checklists silently go missing — an ecosystem-wide packaging
gap in miniature.

[`🔗 addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) · [`🔗 vercel-labs/skills CLI`](https://github.com/vercel-labs/skills)

---

## 26. Kinesis — control your Mac with the Meta Neural Band

- **Velocity:** ▮▮ rising
- **Source:** Show HN · 119+ pts · 34 comments
- **Tags:** `hardware` `emg` `macos`

A native macOS app (Swift 6, macOS 14+, Apple Silicon and Intel) that pairs with Meta's EMG neural
band and maps its gestures to system input: swipe between desktops, open Mission Control, control
music, pinch-and-turn for volume or brightness — with user-definable mappings, a practice mode in
setup, and a menu-bar home. The author credits the PoC to tinkering "with astra" in a public
`neural-band-poc` repo, so the protocol work is inspectable and reusable.

**Why it matters:** Meta shipped the band as a closed-platform input device; a 9-commit weekend repo
turns it into a system-wide Mac input bus. The caveats are proportionate to the fun: 71 stars, no
code-signing discussion, and enabling Accessibility grants full input control — install with that
in mind.

[`🔗 callbacked/kinesis`](https://github.com/callbacked/kinesis) · [`🔗 Show HN discussion`](https://news.ycombinator.com/item?id=49695408)

---

## 27. Since our Sep 10 coverage: Apple publishes the Reference Image technical page — C2PA critique included

- **Velocity:** ▮ steady
- **Source:** security.apple.com · 47+ pts · 2h ago (~10:07 UTC+8)
- **Tags:** `provenance` `c2pa` `privacy`

Apple Security Engineering and Architecture (SEAR) and Camera & Photos have published how Apple
Reference Image works: an opt-in camera mode debuting on the main sensor of the iPhone 18 Pro and
Pro Max that creates a securely timestamped reference image verified through Private Cloud Compute,
with a chain of trust covering both the sensor and the computational-photography stack. The page
argues C2PA-style post-capture metadata is vulnerable to compromise anywhere in the editing chain
and creates privacy risks by tying images to a device or identity. Since we covered Proof of
Capture on Sep 10 — the $100 DIY camera answering Reference Image with steganography — the debate
has moved to primary sources.

**Why it matters:** Apple's own page concedes the hard part ("this is not a simple problem to
address") and stakes the design on PCC verifiability rather than metadata. What it doesn't
quantify: no verification failure rates, no adversarial-testing results — the same gap Proof of
Capture was built to probe.

[`🔗 Apple SEAR`](https://security.apple.com/blog/apple-reference-image/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49721322)

---

## 28. A Twitch browser extension with 30k installs leaks OAuth tokens into proxy logs

- **Velocity:** ▮ steady
- **Source:** Socket · reported Sep 14
- **Tags:** `oauth` `browser-extensions` `token-leak`

Socket's analysis of "Twitch Enhanced Viewer | JeetBot" — listed in the official Chrome and Firefox
stores with 30k+ installs, advertised as ad-blocking, 1080p-forcing, region-unlocking — found it
captures the Twitch web client's authorization header and forwards the OAuth token to a commercial
Russian-language streaming-bot service, appended as an `&auth=` query parameter on proxied
video-playlist requests. Tokens therefore land in cleartext in the proxy's request logs, retrievable
by the operator. Every watched channel is proxied except ten Russian-language channels hardcoded
into the extension.

**Why it matters:** A token in a URL is log leakage by design, and the feature list is exactly the
lure pattern that gets extensions installed. Socket documents the mechanism and the hardcoded
exemptions but publishes no token counts and confirms no account takeovers — the exposure is
demonstrated, the abuse is not.

[`🔗 Socket`](https://socket.dev/blog/malicious-twitch-browser-extension) · [`🔗 BleepingComputer`](https://www.bleepingcomputer.com/news/security/twitch-extension-with-30k-installs-exposes-users-oauth-tokens/)

---

## 29. Japan's Digital Agency: a VPN flaw exposed ~246,000 government personnel records

- **Velocity:** ▮ steady
- **Source:** Digital Agency announcement · Sep 11, reported Sep 14
- **Tags:** `data-breach` `vpn` `japan`

Japan's Digital Agency says a third party used a vulnerability in a VPN device on the Government
Solution Service (GSS) to access the system — discovered Jul 9 after the agency began investigating
large-scale file access from a maintenance-and-operations staff account on Jun 25. Potentially
exposed: 236,000 names, 231,000 email addresses, 94,000 phone numbers, and 1,000 addresses of
government employees, public officials, and associated businesses — no general-public data. The
agency's Q&A says the VPN flaw was rated medium severity and was not a zero-day; the product and
CVE remain unnamed.

**Why it matters:** A medium-severity, already-known flaw still produced one of the larger Japanese
government exposures — severity ratings are not exposure rankings. And the timeline is the other
lesson: Jun 25 detection → Jul 9 confirmation → Sep 11 public announcement.

[`🔗 Digital Agency announcement`](https://www.digital.go.jp/news/2026-0911-01) · [`🔗 BleepingComputer`](https://www.bleepingcomputer.com/news/security/japans-digital-agency-says-vpn-flaw-exposed-246-000-personnel-records/)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-09-16T04:15:00Z |
| Items | 29 |
| Sources tracked | 26 (Hacker News, GitHub Trending, Google blog, arXiv, Hugging Face, TypeSafe, Internet Archive, CISA KEV, BleepingComputer, SecurityWeek, Wordfence/WPScan, F5 Labs, Sysdig, cPanel, The Hacker News, Strix, GitHub advisories, codyho.dev, Cloudflare blog, adminmenueditor.com, Apple SEAR, Socket, Japan Digital Agency, vendor pages) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[Previous day](2026-09-15.md) · [Raw .md](https://trending.md/en/feed/latest.md) · [Archive](../archive/index.md)
