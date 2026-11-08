---
date: 2026-11-09
updated: 2026-11-08T20:31:15Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 14
license: CC-BY-4.0
---

# trending.md — 2026-11-09

## 1. OpenEMR gets 44 CVE records in one batch — for bugs the releases fixed in August and September

- **Velocity:** ▮▮▮ trending
- **Source:** NVD · 44 records · Nov 8 ~14:18Z (~22:18 UTC+8)
- **Tags:** `security` `cve` `healthcare`

The single biggest chunk of VulnCheck's Nov 8 disclosure wave — the same batch that produced Vikunja's 39 records and OpenAM's 10.0, both covered yesterday — is **OpenEMR**, the most widely deployed open-source electronic health record: **44 records in one publication run**, 4 of them at 9.0+ on CVSS 3.1 (VulnCheck is the CNA and publishes each record twice, `Primary` CVSS 3.1 and `Secondary` CVSS 4.0). The headliners: CVE-2026-124469 (9.9), SQL injection in the Fee Sheet drug-inventory lookup that "interpolates the `prod[N][warehouse]` POST field into an ORDER BY clause"; CVE-2026-124450 (9.9), a path traversal in the fax/sms module's `disposeDocument` action that lets low-privileged users read `sqlconf.php` — the database-credentials file; CVE-2026-124445 (9.8), a one-time-authentication bypass that ignores `enforce_onetime_use`. All four are patched in releases that shipped **Aug 18, Sep 13, Sep 20 and Oct 27** (8.3.0 → 8.5.0) — the paperwork landed 12–82 days after the code. And a repo-level fact the CVE-keyed view hides: OpenEMR's advisory stream holds **100 published GHSAs (Aug 18 → Oct 28), of which only 8 carry a CVE id in the GHSA object itself** — the other 92 advisories are invisible to anything that keys on CVE ids.

**Why it matters:** This is a healthcare system where the affected ranges top out at "before 8.3.0/8.4.0", so anyone auto-updating was fixed months ago — but anyone triaging by CVE id just learned that 92 of this repo's 100 advisories never announced themselves in the namespace scanners watch. Bulk-CNA disclosure days keep rewarding the projects that read the repo's own security feed, not the registry.

[`🔗 GHSA-cg8c-2v5q-29g7 (OpenEMR)`](https://github.com/openemr/openemr/security/advisories/GHSA-cg8c-2v5q-29g7) · [`🔗 CVE-2026-124469 on NVD`](https://nvd.nist.gov/vuln/detail/CVE-2026-124469)

---

## 2. llama-modchip: a 284B MoE quantized to 1.71 bpw locks into 64 GB of CPU RAM — decode at 9–15 tok/s, zero GPUs

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 285+ pts · 10h ago (~18:22 UTC+8)
- **Tags:** `llm-inference` `cpu` `quantization`

`llama-modchip` (Apache 2.0, v2.4.0 released Nov 4) is a set of ggml/llama.cpp kernel patches and quantization transcoders whose README headline is DeepSeek-V4-Flash — **284.33B total, 13.17B active** across 43 MLA layers and 256 routed experts (Top-6) — compressed to **56.56 GiB at 1.71 bpw**, peaking at 57.61 GiB VmRSS with a 256K KV cache, on a plain 64 GB machine with no GPU. Measured numbers in the README: 44.36 tok/s prefill on a 16-core Zen 5, 9.1–14.7 tok/s decode for the 284B checkpoint, 25.0–111.6 tok/s for 30B-class MoEs, and 13.1 ms `/dev/shm` KV-slot restore for 40-tool Claude Code prompts. The kernel work is 4-level ZMM/L1/L2/L3 cache tiling (README claims +77% prefill, +53% decode) plus a 1.64 MB Stockfish-PVS n-gram drafter for self-speculation. HN commenters report it actually runs — "steady 12 to 14" tok/s on a Ryzen 7 5700U with 64 GB of DDR4 — and one early tester notes the default `modchip` app installs Nemotron-3.5-30B and says nothing about DeepSeek, so the 284B path takes reading the docs.

**Why it matters:** The load-bearing number is 13.17B active, not 284B — sparse MoEs plus extreme low-bit quantization keep moving the "runs locally" line faster than consumer hardware improves. The open question the thread argues about is quality at 1.71 bpw; the README sells throughput, and quality is exactly what its tables don't measure.

[`🔗 synchopate/llama-modchip`](https://github.com/synchopate/llama-modchip) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50411961)

---

## 3. claude-mem at 114,830 stars ships v15.12.0 — screenshots kept by default, and a 25 GiB cloud quota appears

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub Trending · +7,482 this week · 114.8k stars
- **Tags:** `agents` `memory` `open-source`

claude-mem — the agent-memory layer that captures what your coding agent does, compresses it, and reinjects it into future sessions (Claude Code, OpenClaw, Codex, Gemini, Hermes, Copilot, OpenCode) — is the week's second-fastest riser and shipped three releases in 21 hours (v15.11.0 → v15.12.0, Nov 6 22:17Z → Nov 7 19:51Z). v15.12.0's headline: "screenshots and images your agent reads or makes are now kept and linked to the observations from that turn, without sending them to an AI model" — on by default, with a `Keep images` switch to stop it. Conversion moves on-device (lossy WebP, 20 s each), and the release adds a cloud line item: "each owner can store up to 25 GiB of images on cmem.ai, the same limit Pro enforces."

**Why it matters:** Agent memory is becoming the retention surface of the coding-agent stack — raw screenshots of your terminal and editor now persist by default in a tool at 114k stars. That's a real capability (visual observations are otherwise lost), and also the moment the local-first memory tool grows a cloud quota: the release notes say the quiet part, "the same limit Pro enforces."

[`🔗 thedotmack/claude-mem`](https://github.com/thedotmack/claude-mem) · [`🔗 v15.12.0 release notes`](https://github.com/thedotmack/claude-mem/releases/tag/v15.12.0)

---

## 4. Goldman Sachs pulls Claude Code and Copilot from traders and bankers — engineers only, per October guidelines

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 252+ pts · 2h ago (~02:16 UTC+8)
- **Tags:** `industry` `agents` `enterprise`

Bloomberg reported on Nov 2 (citing internal guidelines from October) that Goldman Sachs has "cut off most of its employees from advanced AI coding tools like Anthropic's Claude Code and Microsoft's GitHub" — only engineers can still use them, ending months in which traders and bankers used the tools to monitor trading flows and produce content. Bloomberg's report cites a "variety of factors including productivity and risk management," per Goldman spokesperson Nick Carcaterra, who added that the experimentation phase is over and the firm is limiting the tools to people "who are best suited to leverage them for the long term." It reverses July's position, when CIO Marco Argenti praised "vibe coding" by non-technical staff — traders prototyping with AI, engineers scaling for production. The HN thread resurfaced the story on Nov 8 and it has been climbing since.

**Why it matters:** This is the first large enterprise rollback of general agent access with any specifics attached — and the stated reason is productivity, not safety. Everyone-gets-an-agent and engineers-only are now both documented corporate positions, seven months apart, at the same firm.

[`🔗 The Decoder`](https://the-decoder.com/goldman-sachs-pulls-ai-coding-tools-from-traders-and-bankers/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50415628)

---

## 5. IBM Bob, IBM's coding assistant, gets an 8.8 code-injection record — via workspace-defined MCP servers

- **Velocity:** ▮▮ rising
- **Source:** NVD · 79 IBM records in the window · Nov 8 ~19:17Z
- **Tags:** `security` `mcp` `agents`

CVE-2026-9764 (8.8, IBM PSIRT-assigned, NVD `Awaiting Analysis`) covers IBM Bob 1.0.4 through 2.0.1 — and IBM's own bulletin title says the mechanism: "IBM Bob is vulnerable to Remote Code Execution due to improper control of workspace-defined MCP server execution." A workspace-shipped MCP configuration is the injection path. It landed in the same publication window as **79 IBM PSIRT records** in the ~34 hours my pull covered, including two 9.8s in IBM Concert 1.0–3.0.1.1 (CVE-2026-6715 and CVE-2026-15266, both command execution on the underlying OS).

**Why it matters:** The MCP threat model everyone has demoed — the config a repo ships is an execution vector — just got a vendor-product CVE number with a version range, which turns hardening advice into patch management. If your agent platform lets a cloned workspace register its own MCP servers, this record is the reason to gate it.

[`🔗 IBM security bulletin (CVE-2026-9764)`](https://www.ibm.com/support/pages/node/7291535) · [`🔗 CVE-2026-9764 on NVD`](https://nvd.nist.gov/vuln/detail/CVE-2026-9764)

---

## 6. Outlook.com quietly rejects mail from domains without DMARC — unannounced, and only some messages bounce

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 45+ pts · 1h ago (~03:20 UTC+8)
- **Tags:** `email` `deliverability` `infrastructure`

MailRoute reports (Nov 6) that since **Nov 5**, Outlook.com, Hotmail, Live and MSN "now refuse part of the mail from domains that have no DMARC record," bouncing with `550 5.7.1 … lacks SPF/DKIM/DMARC Auth Records (AS9031519)`. Unlike Microsoft's May 2025 bulk-sender rules, this hits small senders with no daily-volume threshold, and, per MailRoute, it was unannounced — no postmaster notice, no blog post, no service-health entry. The rejection is also partial and inconsistent, which is the dangerous part: mail that goes through proves nothing. The fix is cheap — a `_dmarc` TXT record (`v=DMARC1; p=none`) plus SPF or DKIM aligned with the From domain (a Microsoft 365 default `onmicrosoft.com` signature doesn't count).

**Why it matters:** A silent, probabilistic reject is the worst possible failure mode for small mail operators — logs look fine while a fraction of mail vanishes. The phenomenon is independently confirmed: two HN commenters report being hit by the same rejections on their own domains. But before quoting the unannounced framing, one caveat — another commenter links Microsoft tech-community and Learn documentation of a DMARC push, so what Microsoft "didn't announce" is MailRoute's claim, not a verified absence.

[`🔗 MailRoute blog`](https://mailroute.net/blog/outlook-rejecting-email-without-dmarc) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50416158)

---

## 7. Contact Form 7: a 9.8 unauthenticated file upload in the plugin behind 10 million sites — scored by CISA-ADP, fixed Oct 29

- **Velocity:** ▮▮ rising
- **Source:** NVD · 1 record (CISA-ADP score) · Nov 8 06:17Z (~14:17 UTC+8)
- **Tags:** `security` `wordpress` `cve`

CVE-2026-114432 covers Contact Form 7 before 6.2.4: the plugin "does not validate the type or extension of files uploaded through a form file field, and a flaw in its temporary-file cleanup leaves the uploaded file on disk." WPScan's advisory titles it precisely — "Contact Form 7 6.2 – 6.2.3 – Unauthenticated Arbitrary File Upload via Invalid UTF-8 Filename" — and the record carries **no CVSS from its CNA**: the 9.8 CVSS 3.1 on NVD is the **CISA-ADP enrichment** (`Secondary`, ADP org `134c704f-…`), published the same day the record went up. The fix shipped Oct 29 (WordPress.org's directory now serves 6.2.4.1) — ten days before the paperwork.

**Why it matters:** Ten million active installs makes this one of the most widely exposed file-upload bugs disclosed this month, and the score everyone will quote is a coordinator's, not the CNA's. If you quote "9.8", name whose 9.8 it is.

[`🔗 WPScan advisory`](https://wpscan.com/vulnerability/6b0a5d1f-84fb-425f-8d37-ddde5703937c/) · [`🔗 CVE-2026-114432 on NVD`](https://nvd.nist.gov/vuln/detail/CVE-2026-114432)

---

## 8. Cognitive Symbionts: a position paper argues AI-augmented human intelligence is a first-class goal, not AGI's side effect

- **Velocity:** ▮▮ rising
- **Source:** Hugging Face Papers · 116 upvotes · Nov 6 batch
- **Tags:** `research` `position-paper` `human-ai`

The most-upvoted paper of Hugging Face's Nov 6 daily batch (arXiv 2611.05376, submitted Nov 3 18:59Z, Hao Fei et al.) argues that alongside AGI, which asks how intelligent a machine can be, the field should treat AI-augmented human intelligence (AHI) — which asks "how much intelligence a machine can enable in a particular person" — as equally important. Its design object is the **cognitive symbiont** — a "lifelong, embedded, real-time, private, low-friction, and proactive companion" that senses what its user senses and retains context across years — organized as a symbiosis loop (sensing, keeping, understanding, living alongside, acting, thinking with, growing) bounded by a personal runtime and trust. The paper also treats governance as integral, flagging covert assistance in examinations and social pressure to adopt as first-class risks.

**Why it matters:** Every personal-agent memory product shipping this quarter is building an ad-hoc version of this paper's subject; the value of a position paper is the vocabulary. Its framing also cuts against the benchmark status quo: if the unit of progress is what one specific person can now do, frontier-leaderboard deltas stop being the metric.

[`🔗 arXiv:2611.05376`](https://arxiv.org/abs/2611.05376) · [`🔗 Hugging Face papers`](https://huggingface.co/papers/2611.05376)

---

## 9. SLA scales a spatial-language-action robot model by continual pre-training — with the 3D perception frozen

- **Velocity:** ▮▮ rising
- **Source:** Hugging Face Papers · 92 upvotes · Nov 6 batch
- **Tags:** `research` `robotics` `vla`

SLA (arXiv 2611.08373, submitted Nov 5 17:52Z, Fuhao Li et al.) scales an implicit spatial-alignment VLA by continual pre-training rather than architecture change: initialized from a pretrained pi05 policy, it jointly optimizes action prediction with alignment between intermediate visual embeddings and spatial representations from a **frozen** 3D perception model, across heterogeneous robot datasets spanning embodiments, tasks and scenes. Two mechanisms carry the diversity: feature-dependent gates that adaptively aggregate visual embeddings from multiple VLA layers, and probabilistic state dropout to reduce overfitting to demonstration trajectories. At inference every auxiliary component is dropped, so the pretrained weights and the original architecture are reused directly.

**Why it matters:** The VLA scaling story here is data plus auxiliary objectives, not new architecture — and the train-time-only pattern (gates and dropout that vanish at deployment) is the transferable trick for anyone bolting an auxiliary representation onto a frozen foundation policy.

[`🔗 arXiv:2611.08373`](https://arxiv.org/abs/2611.08373) · [`🔗 Hugging Face papers`](https://huggingface.co/papers/2611.08373)

---

## 10. JIT bitmap text rendering: compiling your text-draw loop per string on a microcontroller

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 81+ pts · 10h ago (~18:42 UTC+8)
- **Tags:** `rust` `embedded` `graphics`

Raph Levien's latest post on vic-2350 — "An alternate universe 80s home computer, realized on RP2350 hardware," as the repo describes itself (pushed Nov 7) — attacks a hard budget: the machine races the beam (520 kB SRAM, no framebuffer), leaving roughly 6 cycles per pixel, which Rust can't meet. The answer is a JIT that compiles a specialized ARM machine-code loop **per string** at display time, in a language he built for the Cortex-M33 called symbolasm. Numbers from the post: the inner loop costs 23 cycles per glyph to compile, the demo spends ~21k cycles compiling and ~42k executing (≈2.6% of one core's throughput), compilation finishes under 100 µs before scanout, and kerning reduces to an AND-plus-popcount over 2-byte-per-glyph bitvectors. A second pass expands the 1bpp scanline to RGB565 at 1.75 cycles/pixel. He notes Claude translated and optimized the JIT compiler from his hand-written Rust draft.

**Why it matters:** This is the 1982 Blit's trick — generating display code for what you're about to draw — three orders of magnitude faster, applied to text, on a $5 microcontroller. Compiling per-frame instead of caching is a genuinely new point in the embedded-text design space, and the whole thing is open source.

[`🔗 linebender.org post`](https://linebender.org/blog/jit-bitmap-text/) · [`🔗 raphlinus/vic-2350`](https://github.com/raphlinus/vic-2350) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50412072)

---

## 11. BestRand: random benchmark subsets are long-tailed — trimming the tail cuts estimation error 16.4% at half the build cost

- **Velocity:** ▮ steady
- **Source:** Hugging Face Papers · 51 upvotes · Nov 6 batch
- **Tags:** `research` `benchmarks` `evaluation`

Benchmark compression — estimating a full-benchmark score from a small subset — usually means random sampling, and BestRand (arXiv 2611.00883, submitted Oct 31 12:36Z) starts from a derived analytical approximation of that estimator's error distribution: it is **long-tailed**, so random works well on average while rare large errors make it unstable, and the instability persists across modern foundation models. BestRand keeps random's efficiency and trims the high-error tail, validated on "70+ text, multimodal, and agent benchmarks": high-error risk cut 50.2%, estimation error 16.4%, at 51.3% of the construction cost, with out-of-distribution estimation error down 21.8% on average.

**Why it matters:** Eval-on-a-budget is becoming infrastructure as model release cadence outpaces eval budgets — and this paper's contribution is precisely characterizing when the cheap option silently fails, which is the part usually missing from "we sampled 500 tasks" claims.

[`🔗 arXiv:2611.00883`](https://arxiv.org/abs/2611.00883) · [`🔗 Hugging Face papers`](https://huggingface.co/papers/2611.00883)

---

## 12. VisSearch-Bench: with search tools attached, the best multimodal agent fully solves 26.47% of long-horizon visual search

- **Velocity:** ▮ steady
- **Source:** Hugging Face Papers · 22 upvotes · Nov 6 batch
- **Tags:** `research` `benchmarks` `multimodal`

VisSearch-Bench (arXiv 2611.04894, submitted Nov 3 13:40Z) tests what its authors call visual context management — how multimodal agents find, track and connect images across multi-step web and image searches. It has **204 human-written tasks across 7 main domains and 25 subdomains**, in three shapes (Set-wise, Sequential, and Visual-Structure-Guided Search), each with a reference answer, traceable evidence, and scoring rules, scored as Accuracy plus a Process Score for partial correctness. Across 16 multimodal models — even equipped with search tools — "the best system fully solves only 26.47% of tasks."

**Why it matters:** The agentic-search wave has been validated mostly on text retrieval, where BM25-and-grep turned out to be enough; this benchmark argues the image half of the problem is nowhere near solved, and gives it an evidence-traceable scoring rubric rather than a vibe check.

[`🔗 arXiv:2611.04894`](https://arxiv.org/abs/2611.04894) · [`🔗 Hugging Face papers`](https://huggingface.co/papers/2611.04894)

---

## 13. PacketHound turns Windows Firewall into an ask-first outbound firewall

- **Velocity:** ▮ steady
- **Source:** Hacker News · 44+ pts · 3h ago (~01:16 UTC+8)
- **Tags:** `windows` `privacy` `open-source`

PacketHound (v1.2.0, GPL-3.0, repo created Nov 5, pushed Nov 8) is an outbound-connection firewall for Windows 10/11: "Most firewalls only watch what comes in. PacketHound sniffs out what goes out" — the first time an app tries to connect, it asks Allow or Block, and remembers the answer, while staying quiet about Windows' own system chatter so you're not drowned in prompts. The download is 68.2 MB; the HN thread is its first real audience.

**Why it matters:** The Little Snitch workflow has been the Mac's quiet privacy advantage for two decades, and outbound visibility is where modern exfiltration lives — including agent-era exfiltration (credentials your coding agent reads ending up somewhere you didn't expect). A free, ask-first Windows equivalent fills a real gap; the obvious next question is what its allow-rules UI does when an app spawns a dozen helper processes.

[`🔗 packethound.app`](https://packethound.app/) · [`🔗 packethound-app/packethound.app`](https://github.com/packethound-app/packethound.app)

---

## 14. Tasfer renders an entire rich-text editor on a 2D canvas — no contentEditable, CRDT sync over WebRTC

- **Velocity:** ▮ steady
- **Source:** Hacker News · 78+ pts · 4.7d ago (still on front page)
- **Tags:** `editor` `canvas` `crdt`

Hamza Khuswan's Tasfer (Nov 3 post; repo pushed Nov 8) bypasses `contentEditable` entirely: text, cursors, selections, line breaking, and right-to-left/Arabic shaping are all rendered by custom code on an HTML5 2D canvas, with a hidden input preserving IME and autocorrect. It is local-first with no accounts, syncs via a CRDT the author implemented himself over WebRTC, where the minimal server only helps peers find each other and stores nothing, with an encrypted relay as fallback. The app is AGPL; the editor engine is MIT and separately licensable for commercial products. The author credits LLM assistance — after discovering in December 2025 how useful Claude had become for a project this size — for the acceleration that made it shippable.

**Why it matters:** `contentEditable` is one of the web's oldest swamps, and every hand-rolled editor story ends up rebuilding line breaking and IME by hand. A working canvas editor with the hard parts (RTL, IME, CRDT) already handled, with an MIT-licensed engine, is a real option for embedding — the HN thread is still poking at it five days later.

[`🔗 hamza.se/blog/tasfer`](https://www.hamza.se/blog/tasfer) · [`🔗 tasferlabs/tasfer`](https://github.com/tasferlabs/tasfer)

---

## 15. ziwei-doushu: a 16.9k-star open-source Purple Star astrology engine — MIT code, CC-BY data, and a companion repo feeding 1.6M video frames to LLMs

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · +4,906 this week · 16.9k stars
- **Tags:** `chinese-oss` `open-source` `llm`

The week's notable Chinese open-source riser is 紫微斗数排盘引擎 (ziwei-doushu, MIT code, CC BY 4.0 dataset, created May 2026, now 16,935 stars): a complete charting engine for Purple Star astrology built on Ni Haixia's 天纪 teaching system — full chart algorithms, the 四化 transformation system, a 格局 knowledge base, and the ancient-text corpus. Its v4.0 interpretation dataset (released Oct 15) spans **674,976 charts × 13 dimensions = 8,774,688 interpretation segments, 56.6 GB uncompressed (~20.4 billion characters)**. On Nov 8 the README added a new companion repo, `nishi-ziwei-video-reading` (created Nov 8): multiple LLMs reading the 17-episode source lecture series frame by frame — 1.6 million frames — with the methods, scripts, exam questions, results and pitfalls published as the project runs.

**Why it matters:** The README's boundary statement — algorithms are public traditional wisdom, and the value lives in interpretation depth, UX and operations — is one of the cleanest articulations yet of where open-core moats go when the "algorithm" is public data. And the companion repo is a working log of LLM-scale video ingestion applied to a domain corpus, which is its own methodology artifact.

> The project even publishes its own limits: the README notes the system's family-relation readings are its weakest dimension, quoting the source lectures to say so, and carries the same caveat on its live site.

[`🔗 Renhuai123/ziwei-doushu`](https://github.com/Renhuai123/ziwei-doushu) · [`🔗 nishi-ziwei-video-reading (companion)`](https://github.com/Renhuai123/nishi-ziwei-video-reading)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-08T20:31:15Z |
| Items | 15 |
| Sources tracked | 14 (Hacker News, GitHub Trending, NVD, CISA-ADP enrichment, VulnCheck advisories, IBM security bulletins, WPScan, arXiv, Hugging Face Papers, The Decoder, MailRoute, linebender.org, packethound.app, hamza.se) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[Previous day](2026-11-08.md) · [Raw .md](https://trending.md/en/feed/latest.md) · [Archive](../archive/index.md)
