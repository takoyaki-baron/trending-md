---
date: 2026-11-09
updated: 2026-11-09T12:38:24Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 30
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

Raph Levien's latest post on vic-2350 — a machine whose repo describes itself as "an envisioning of an alternate universe mid-80s home computer" that "runs on RP2350 boards" (pushed Nov 7) — attacks a hard budget: the machine races the beam (520 kB SRAM, no framebuffer), leaving roughly 6 cycles per pixel, which Rust can't meet. The answer is a JIT that compiles a specialized ARM machine-code loop **per string** at display time, in a language he built for the Cortex-M33 called symbolasm. Numbers from the post: the inner loop costs 23 cycles per glyph to compile, the demo spends ~21k cycles compiling and ~42k executing (≈2.6% of one core's throughput), compilation finishes under 100 µs before scanout, and kerning reduces to an AND-plus-popcount over 2-byte-per-glyph bitvectors. A second pass expands the 1bpp scanline to RGB565 at 1.75 cycles/pixel. He notes Claude translated and optimized the JIT compiler from his hand-written Rust draft.

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

## 16. Plate → unlocked door: the connected-car chain whose WAF bypass was found by an LLM after the humans gave up

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 139+ pts · 4.7h ago (~08:10 UTC+8)
- **Tags:** `security` `automotive` `llm`

Assetnote co-founder Shubham Shah and Sam Curry published paired writeups on one automaker's connected-car platform (brand redacted; all testing "on cars we explicitly owned or had permission to interact with"). The Australian chain: an exposed `admintool.*` subdomain whose admin APIs needed no authentication "beyond the hardcoded API keys sitting in the JavaScript bundle"; plate→VIN via public registration lookups; VIN→subscriber GUID→PII; ForgeRock OpenIDM admin credentials embedded in a vendor JS bundle meant for staging that worked in production. Then the wall: every `/openidm/` path was WAF-blocked, the obvious traversal (`/XUI%2f..%2fopenidm/`) hard-403'd, and OpenIDM's own servlet routing refused traversal-containing paths even while issuing an admin JWT. After days of manual attempts: "We grabbed the OpenIDM source closest to the version we were testing against and let GPT 5.6 Sol Ultra spend a good six hours on it. It succeeded." — the prefix `/static%2f..%2fopenidm/` was not covered by the WAF. With an MFA skip (a Resource-Owner-Password-Credentials token exchanged via the `IDTokenROPC` service), `POST /v1/remote/route/command {"command":"door-unlock"}` lands: "remote commands such as unlocking and turning the engines on, for any of the automaker's vehicles in Australia, the United States, and Canada." Stated on the page: a no-WAF `getUser` endpoint leaks PBKDF2-SHA512 password hashes, PIN hashes, push tokens and PII; the automaker had "invested heavily in WAF rules" on exactly these endpoints.

**Why it matters:** ForgeRock identity infrastructure is becoming the recurring domino in high-value chains — last week's OpenAM 10.0 WebSocket token theft, now a full vehicle-control chain — and this post is a clean, documented instance of the new division of labor: humans mapped the system and hit a routing/WAF wall, and the LLM's exhaustive search found the one uncovered prefix. "Being human, we assumed that applied to every prefix" is precisely the failure mode automated search exists to close.

[`🔗 shubs.io — the Australian chain`](https://shubs.io/unlocking-any-car-from-x-brand-in-most-of-the-world/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50419215)

---

## 17. NVIDIA's board opens an independent investigation into Jensen Huang over "a foreign intelligence effort" — and states no evidence of compromise

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 440+ pts (two threads) · 8.5h ago (~04:26 UTC+8)
- **Tags:** `industry` `nvidia` `governance`

NVIDIA's board, November 8: "The NVIDIA Board is initiating an independent investigation in light of recent reporting that founder and CEO Jensen Huang has been the target of a foreign intelligence effort. A committee of independent directors, assisted by outside independent counsel, will oversee the investigation." The load-bearing sentence is in the same statement: "While the Board has no reason to believe that either national security or NVIDIA secrets were compromised, the Board's inquiry will examine all available information." Hours later, Huang's all-hands letter ("A Message to Our Company") acknowledged the underlying personal conduct that prompted the reporting and committed to cooperating with the review; HN ran both documents past 440 points each within hours. The underlying reporting is Bloomberg's (paywalled).

**Why it matters:** a governance probe of the CEO of the company most of the AI stack runs on is a continuity story whether or not any compromise is found. The board's own framing — precautionary, no evidence of compromise, "confidence in Jensen and his leadership team" — is the sentence to carry; any breach framing ahead of the primary sources is speculation.

[`🔗 Statement from NVIDIA Board of Directors`](https://nvidianews.nvidia.com/news/statement-from-nvidia-board-of-directors) · [`🔗 A Message to Our Company`](https://nvidianews.nvidia.com/news/a-message-to-our-company)

---

## 18. KetchUp launches on HN and renames to BenchUp mid-launch — an open-source SketchUp alternative in Rust and WebGPU

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 309+ pts · 6.3h ago (~06:35 UTC+8)
- **Tags:** `cad` `rust` `webgpu`

The night's biggest Show HN (309 pts) is a free, open-source 3D modeler built for woodworking: Push/Pull, exact dimensions, groups and components, portable project files — running as a native Windows/macOS/Linux application "and in a desktop browser through WebAssembly," where the browser build "prefers WebGPU and falls back to WebGL2." It imports SketchUp `.skp` files and exports `.obj`; the latest release is v0.6.6, the repo was created Oct 23 (198 stars so far — the HN points went to the hosted app), pushed 04:12Z today. The launch's live wrinkle: the HN title still says **KetchUp**, but the site and repo have already renamed to **BenchUp** ("formerly KetchUp"), with the README referencing legacy `.ketchup` projects — a rename one day after the announcement.

**Why it matters:** the workshop-CAD niche has lacked a credible free-software answer since SketchUp's ownership changes, and this is the most serious attempt yet — one Rust codebase producing native apps and a browser build. The rename is also a live specimen of the announcement-vs-artifact gap this feed keeps measuring: cite the repo's current name, not the launch title's.

[`🔗 BenchUp3D/editor`](https://github.com/BenchUp3D/editor) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50418176)

---

## 19. Dux Modular Shell 2.1: one QML shell to replace the waybar-and-five-daemons Wayland desktop — 225 points on HN

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 225+ pts · 9.7h ago (~03:08 UTC+8)
- **Tags:** `linux` `wayland` `desktop`

DMS 2.1 ("Stormborn," released Nov 4; v2.1.2 current) is a monorepo of QML on Quickshell plus a Go backend providing panels, widgets, launcher, lock, idle, notifications and polkit — explicitly replacing the waybar/swaylock/swayidle/mako/fuzzel stack — across niri, Hyprland, Sway, labwc, MangoWC, Scroll and Miracle WM. Version 2.1 adds interface-density presets (Spacious through Dense), a "DMS Classic" style, a media player with synced lyrics, video wallpapers, and Fedora Atomic support in the installer. It stands at 8.9k stars, is packaged in Arch's `extra` repository (not just the AUR), and last committed Nov 8. The HN title undersells it as a "desktop shell with file manager"; the suite spans the shell plus Dux Files, Calendar and a Greeter.

**Why it matters:** the post-GNOME/KDE Wayland world's missing piece is the assembled desktop layer, and a compositor-agnostic shell reaching a distro main repository is the milestone that turns pick-a-compositor-pick-a-shell from a ricing hobby into a supported configuration.

[`🔗 duxlabs.dev — v2.1 release notes`](https://duxlabs.dev/blog/v2-1-release) · [`🔗 duxlabs-dev/dux-shell`](https://github.com/duxlabs-dev/dux-shell) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50416053)

---

## 20. RAM Altman: a cron script that emails Sam Altman your idle-RAM numbers daily — the DRAM-price spike becomes a meme

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 216+ pts · 11.5h ago (~01:20 UTC+8)
- **Tags:** `humor` `hardware` `dram`

The project (repo created Nov 5, 821 stars) is a shell script on a timer: if more than 10% of your RAM is available, it emails Altman one of a rotating set of messages carrying the machine's real `MemTotal − MemAvailable` figures, with `--dry-run` to preview without sending. It riffs on Altman's comments that home PCs' DRAM sits idle "maybe 5% of the time" and that hoarding DRAM in personal machines is "quite terrible" — remarks that landed amid this year's AI-driven RAM price spike. To the project's credit, it carries the correction itself: the site notes Altman said the remarks were taken out of context, posted "i want you to have so much ram," and briefly renamed himself Ram Altman on X; the project labels itself a parody with no affiliation.

**Why it matters:** 200+ points for a joke is a thermometer reading — memory-price pain has reached meme stage in exactly this audience. And a meme whose own site carries the correction alongside the jab is doing better source hygiene than most straight coverage of the same remarks.

[`🔗 ram-altman.lol`](https://ram-altman.lol/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50415172)

---

## 21. Since we covered the C++26 DIS failure on 2026-11-04: Herb Sutter's post-mortem says the decisive factor wasn't contracts — "the language's creator and its owners disagree"

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 91+ pts · 5.4h ago (~07:28 UTC+8)
- **Tags:** `cpp` `standards` `iso`

P4454R0 (dated 2026-10-31; nine pages on isocpp.org) opens its tl;dr: "The core decisive issue that caused the DIS to fail is that the language's creator and its owners disagree." Sutter's three facts: WG21 has strong consensus for contracts (114–12 in Croydon, 2026-03); "For the first time since WG21 was formed 36 years ago, C++'s creator is siding with the minority" against the DIS; and the national bodies chose to give Bjarne Stroustrup's dissent more weight — lobbying that "more than doubled the numerical NB opposition," in a vote close enough that one flipped Disapprove plus one abstention would have passed it. Against the process complaints he defends the consensus numbers: the EWG chairs "quietly counted every contracts poll twice" to de-duplicate by company. Six options are tabled for C++26, from skipping ISO publication entirely (Option A) to moving standardization into a national body or the Linux Foundation (Options E/F) — with an editorial note that Bjarne, reviewing the paper, said Option B (remove contracts and re-ballot, ideally a new DIS within six weeks) "is the outcome he most wants to see."

**Why it matters:** this week's vote was covered as a contracts-design fight; the primary post-mortem argues the technical debate was secondary to a governance question every standards body eventually hits — what weight a founder's dissent carries against committee consensus. And it names a live possibility: C++26 shipping without contracts.

[`🔗 P4454R0 (PDF, isocpp.org)`](https://isocpp.org/files/papers/P4454R0.pdf) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50418818)

---

## 22. Keycloak's token-exchange signature bypass got its public advisory 130 days after the fix — CVE-2026-11800, 8.1

- **Velocity:** ▮▮ rising
- **Source:** GitHub Advisory DB · GHSA-j97h-3f8r-mrjr · Nov 3 (~6d ago)
- **Tags:** `security` `cve` `identity`

CVE-2026-11800 (8.1 CVSS 3.1, Red Hat CNA `secalert@redhat.com`; on NVD the record is `Analyzed` with the Red Hat score as the sole metric — an NVD endorsement with no NVD-published score — plus a CISA-ADP SSVC container): "This JWT algorithm confusion vulnerability in the JWT Authorization Grant flow allows an attacker with valid client credentials to bypass signature verification" and forge an assertion that mints unauthorized access tokens — the deepest cut there is in an identity provider, gated only by holding valid client credentials (`PR:L`). The fix shipped in upstream **26.6.4 on 2026-06-26**; the GHSA documenting it landed **2026-11-03** — a 130-day gap. The current 26.8.2 line (Nov 5) carries the fix; Red Hat's RHBK containers in 26.6.4-2/26.6-8.

**Why it matters:** token exchange in one of the world's most-deployed identity providers is a credential-minting primitive, not a data leak — and the disclosure clock is the story: anyone patching on advisory publication ran the vulnerable flow for four months after the code was fixed. Check what your identity provider fixed in June, not what it announced in November.

[`🔗 CVE-2026-11800 on NVD`](https://nvd.nist.gov/vuln/detail/CVE-2026-11800) · [`🔗 GHSA-j97h-3f8r-mrjr on OSV`](https://osv.dev/vulnerability/GHSA-j97h-3f8r-mrjr)

---

## 23. IBM Qiskit ships two 8.4s — a quantum-checkpoint deserialization RCE, and a record whose own stated range contains its fix

- **Velocity:** ▮▮ rising
- **Source:** NVD · 2 records · Nov 8 17:16Z (~01:16 UTC+8)
- **Tags:** `security` `quantum` `deserialization`

CVE-2026-116499 — "IBM Qiskit SDK 1.4.2 through 2.6.2 could allow a local attacker to execute arbitrary code due to deserialization of untrusted data": QPY files with format versions below 13 are deserialized with SymPy used internally, so a crafted `.qpy` checkpoint runs code on load. CVE-2026-116501 (2.4.0–2.6.1) is an out-of-bounds write via a corrupted unitary matrix. Both are 8.4 CVSS 3.1 (IBM CNA `psirt@us.ibm.com`, Secondary slot), NVD `Awaiting Analysis`, with CISA-ADP SSVC present (exploitation: none; automatable: no; technical impact: total). Both are fixed in **v2.6.2** (PyPI upload 2026-11-05 — three days before the records). And the range quirk sits in the record's own description: "1.4.2 **through** 2.6.2" while the bulletin's remediation is "upgrade to 2.6.2" — the fix version is inside the stated affected range (the sibling record's "2.4.0 through 2.6.1" is clean).

**Why it matters:** the model-file-loads-code class has reached the quantum stack — `.qpy` files are shared artifacts in notebooks and course material, and "local" means whoever opens your checkpoint. The through-the-fix range arithmetic is exactly what version scanners obey literally; quote the bulletin's upgrade line, not the record's range.

[`🔗 IBM security bulletin (CVE-2026-116499)`](https://www.ibm.com/support/pages/node/7295238) · [`🔗 CVE-2026-116499 on NVD`](https://nvd.nist.gov/vuln/detail/CVE-2026-116499)

---

## 24. Stanford Stanza: a pickle smuggled in a bytes field bypasses `torch.load(weights_only=True)` — CVE-2026-115878

- **Velocity:** ▮▮ rising
- **Source:** NVD · 1 record · Nov 3 21:17Z (~6d ago)
- **Tags:** `security` `ai` `pickle`

CVE-2026-115878 (7.8 CVSS 3.1, GitHub CNA `security-advisories@github.com`; NVD `Received`): "From 1.14.0 until 1.15.0, loading an attacker-supplied lemmatizer checkpoint" executes arbitrary code — stanza stores the lemmatizer's `pos_dict` as a gzip-compressed pickle inside the checkpoint's `dicts` field, a **`bytes`** value, and `torch.load(weights_only=True)` treats `bytes` as a primitive, so the allowlist never inspects the inner pickle (vector `AV:L/PR:N/UI:R` — it runs as whoever loads the model). Fixed in **1.15.0** (PyPI 2026-10-01, 32 days before the advisory; PR #1649).

**Why it matters:** `weights_only=True` is the safe default everyone reaches for when loading checkpoints; this is a patched counterexample showing its blind spot — a primitive type carrying a serialized payload — in a small NLP library that larger pipelines routinely wrap. The checkpoint-supply-chain story keeps turning out to be one layer deeper than the guard.

[`🔗 GHSA-gh9r-c94j-cmp5 on OSV`](https://osv.dev/vulnerability/GHSA-gh9r-c94j-cmp5) · [`🔗 CVE-2026-115878 on NVD`](https://nvd.nist.gov/vuln/detail/CVE-2026-115878)

---

## 25. WeChat's WeLM-Image claims the open-source image-generation lead — a 31.7B MoT report with no weights behind it

- **Velocity:** ▮▮ rising
- **Source:** arXiv · 2611.07392 · Nov 5 (HF papers ~42 upvotes)
- **Tags:** `research` `image-generation` `tencent`

A technical report from WeChat Vision: a unified image foundation model (understanding, generation, instruction-guided editing, multi-reference synthesis) on a Mixture-of-Transformers backbone — shared attention with independent understanding/generation parameters — and MoE on each path: **31.7B stored parameters, ~5.4B generation parameters active** per target latent token, trained at native 1.5K resolution, then rubric/checklist-reward RL followed by noise-aware on-policy distillation. The abstract's headline: the 1536-resolution model "ranks first among the evaluated open-source models" on PRISM-Bench and two further benchmarks. The Turbo variant (MeanFlow few-step distillation) generates 1024×1024 in **4.98 s on a single H20**. The paper also builds its own editing benchmark (WeGenEditBench, 2,740 curated samples), arguing prior editing benchmarks lack explicit per-sample verification criteria. And the decisive caveat: **no public weights** — Hugging Face search returns nothing, and the paper states no release plan.

**Why it matters:** "ranks first among the evaluated open-source models" is a comparison-set claim about a comparison set the authors chose, from a lab that has not released the model — a real signal about where Tencent's production stack is, but not currently a model you can run or a leaderboard you can check.

[`🔗 arXiv:2611.07392`](https://arxiv.org/abs/2611.07392) · [`🔗 Hugging Face papers`](https://huggingface.co/papers/2611.07392)

---

## 26. Vercel's json-render streams validated generative UI into Chat SDK agents — 19.5k stars and a spec for constrained AI-written UI

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · +149 today · 19.5k stars
- **Tags:** `agents` `generative-ui` `frontend`

The Nov 7 changelog wires json-render into Chat SDK agents: the agent emits a typed JSON spec that renders as cards in Slack Block Kit or Teams Adaptive Cards; edits stream with changes throttled to at most once per 500 ms; and `toCard` validates every element's props against the component schema, throwing `CardSpecError` with per-issue diagnostics designed to be fed back to the model. The Apache-2.0 core ships adapters for React, Vue, Svelte, Solid, React Native, ink (terminal), react-three-fiber, react-pdf, remotion and email; v0.22.0 released Nov 4.

**Why it matters:** AI-written UI "constrained to your catalog" is the pattern every agent-UI product is converging on, and this puts validation-and-retry in the protocol — the card either type-checks against your schema or the model receives the exact list of violations — instead of prompt-hoping the model behaves.

[`🔗 vercel-labs/json-render`](https://github.com/vercel-labs/json-render) · [`🔗 Vercel changelog`](https://vercel.com/changelog/json-render-and-chat-sdk-agents)

---

## 27. Paradev ships Desktop Canary hours after going MIT: one workspace per CLI agent, one worktree per task — 16.1k stars

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · +39 today · 16.1k stars
- **Tags:** `agents` `devtools` `worktrees`

Paradev is a desktop app that orchestrates Claude Code, Codex, OpenCode, Gemini CLI and Cursor Agent: each task gets its own git worktree, branch and terminals, with an in-app review/PR pane and per-workspace dev-server previews — "not a coding agent itself… does not proxy model calls." desktop-v2.0.6 (Nov 8) added a Bring-Your-Own-Cloud guide and the MIT license change; **Desktop Canary** — an automated build of main published 2026-11-09T00:53Z, flagged as internal testing that may be unstable — is the first look at the desktop line's next cut. macOS (Apple Silicon/Intel) plus an experimental Linux AppImage; no Windows build. The CLI is still named `superset`, explicitly unrelated to Apache Superset.

**Why it matters:** the conductor layer for CLI agents is consolidating fast, and Paradev's position — own no model relationship, MIT, bring your own cloud — is a direct swing at the Conductor/Codex-app-shaped incumbents. The bet to watch is whether orchestration without a model-vendor lock-in survives the incumbents' bundling.

[`🔗 ParadevAI/Paradev`](https://github.com/ParadevAI/Paradev) · [`🔗 releases`](https://github.com/ParadevAI/Paradev/releases)

---

## 28. kortix-ai/CompanyOS: always-on agents with server-side Goals only a verifier session can close — v0.15.1, 20.6k stars

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · +72 today · 20.6k stars
- **Tags:** `agents` `open-source` `automation`

CompanyOS is an event-driven multi-agent "operating system for your company" built on the pi runtime: agents start on schedules, webhooks, tool events and team messages, each on its own cloud computer with persistent state, with 3,000+ app connections claimed. v0.15.1 (Nov 7) moved Goals to the API with server-side state where "only a verifier session can mark a goal done," and added Proactive Spaces — a watcher that "reads a Space's event feed and speaks up only when it matters."

**Why it matters:** the always-on-agent stack is emerging in the open, and its hard problem is trust. An agent that cannot close its own goals — a separate verifier session must — is one of the first open-source designs that makes who-checks-the-agent's-homework an architectural fact rather than a prompt instruction.

[`🔗 kortix-ai/CompanyOS`](https://github.com/kortix-ai/CompanyOS) · [`🔗 releases`](https://github.com/kortix-ai/CompanyOS/releases)

---

## 29. Muir: Google finds the erase gate in gated delta-rule attention can go low-rank — and gets 2,560× length extrapolation

- **Velocity:** ▮ steady
- **Source:** arXiv · 2611.08376 · Nov 5 (HF papers ~9 upvotes)
- **Tags:** `research` `linear-attention` `architecture`

Gated DeltaNet-2 decays its key-value state and erases its prediction for an incoming key before writing a new value. Muir's starting observation is that "state updates are far less sensitive to erasure than to writes" — key activation and unit normalization concentrate key energy onto a sparse subset of channels — so the erase gate can be **low-rank**. Muir fuses all gates into one sensitivity-allocated low-rank projection, adds a matched-filter readout gate, and reinvests the saved parameters in a wider FFN, with a parallel form for numerical stability at large chunk sizes. Across 166M–1.34B parameters: perplexity −1.8–2.0% vs GDN-2 and −2.5–3.6% vs a Transformer; at 1.34B it wins multi-hop and multi-needle recall and extrapolates **2,560×**, from 4K training length to 10M-token streams. The paper's own limitations, from its discussion: at a fixed gate-rank budget, static and dynamic readout trade single-horizon retention against multi-lag adaptability, and Splash Attention stays faster at short contexts (under roughly 11K tokens) thanks to its fused Pallas kernel while XLA materializes chunk temporaries in HBM.

**Why it matters:** a measured simplification of the gated-delta-rule family at the scale flash-linear-attention practitioners actually train — and the honest short-context regression note is the part to carry before quoting the extrapolation headline.

[`🔗 arXiv:2611.08376`](https://arxiv.org/abs/2611.08376) · [`🔗 Hugging Face papers`](https://huggingface.co/papers/2611.08376)

---

## 30. Do latent-communication gains come from communication? PLatour's controls say sometimes no — and it ships the test that catches it

- **Velocity:** ▮ steady
- **Source:** arXiv · 2611.06976 · Nov 4 (HF papers ~15 upvotes)
- **Tags:** `research` `multi-model` `evaluation`

PACT (prefill-to-autoregressive cross-model transfer) combines a large frozen model's prompt representations with a small model's cheap generation. PLatour is an open-source PACT framework — zero-initialized linear bridges, reported to outperform open-source baselines and beat a prior system's results on shared math and coding benchmarks with a substantially smaller sender — and then the paper's real contribution lands: "controlled experiments show that the gains on some tasks can be reproduced by uninformative sender signals, self-communication, or receiver-only training." That is, trainable bridges can act as parameter-efficient adaptation without exploiting useful sender information. The paper ships **PACT-Check**, a test that quantifies how much of a trained system's gain is genuinely communication.

**Why it matters:** latent-communication and cross-model compression papers report end-task deltas; this provides the negative controls that distinguish the small model actually using the big one from a bridge that is just a small LoRA in disguise. Run it before believing the next headline number.

[`🔗 arXiv:2611.06976`](https://arxiv.org/abs/2611.06976) · [`🔗 zhenyi4/platour`](https://github.com/zhenyi4/platour)

---

## 31. SAE Interprets MoE: exact per-expert feature attribution — every latent's pre-activation decomposes over experts, no counting

- **Velocity:** ▮ steady
- **Source:** arXiv · 2611.08089 · Nov 5 (HF papers ~7 upvotes)
- **Tags:** `research` `moe` `interpretability`

Existing MoE analyses "count how often an expert is selected on domain-labeled corpora, an instrument that … records selection rather than contribution." ByteDance Seed's alternative: an MoE layer's output is a router-weighted sum of expert outputs and the SAE encoder is affine, so **each latent's pre-activation decomposes exactly over experts** — contribution, not selection. On Qwen3-30B-A3B (layers 4, 30, 46): contribution is "far more concentrated than gating," most latents have one or two dominant experts, and auto-interpreted dominant sets show sub-domain specialization — distinct experts for Java vs front-end web code, geometry vs arithmetic and polynomials. Code released (Bytedance-Seed/SAE-Interprets-MoE). The paper's own caveat: coarse domains take "very unequal numbers of experts," so the concentration claim needs that base rate kept in mind.

**Why it matters:** an exact (not correlational) attribution method with code, on a model people actually run — and the selection-vs-contribution distinction is the reusable part for anyone auditing what a routed model's experts really do.

[`🔗 arXiv:2611.08089`](https://arxiv.org/abs/2611.08089) · [`🔗 Bytedance-Seed/SAE-Interprets-MoE`](https://github.com/Bytedance-Seed/SAE-Interprets-MoE)

---

## 32. Agentero: a research workspace where agents write revision-checked notebook tables and read-only UI blocks — v0.15.3

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · +145 today · 2.1k stars
- **Tags:** `agents` `research-tools` `chinese-oss`

Agentero (MIT, Chinese-first with an English README, 2.1k stars, +145 today) is a desktop research workspace where humans and agents share one context. v0.15.3 (Nov 8 23:58Z) adds read-only structured UI blocks rendered inside agent replies — parsed from `openui-lang` code fences (layout, text, state, data and paper-reading components) — plus draggable PDF-translation float-cards and CLI feed commands sharing the desktop's fetch pipeline. v0.15.2 added lab-notebook tables that agents write through `table_query`/`table_upsert` with revision-checked writes, and a Papers-with-Code integration.

**Why it matters:** the design split is the point: give the model clean, structured, revision-checked context to write into, and keep the human in comfortable PDF-land with read-only renderings coming back. That is a concrete answer to agent-context fragmentation, from the Chinese OSS scene that keeps shipping this shape of tool.

[`🔗 poco-ai/Agentero`](https://github.com/poco-ai/Agentero) · [`🔗 releases`](https://github.com/poco-ai/Agentero/releases)

---

## 33. microduck: an 800 g biped duck whose entire brain is open source — RL policies trained in MuJoCo, hourly verified builds

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · +599 today · 13.6k stars
- **Tags:** `robotics` `reinforcement-learning` `open-source`

pollen-robotics' microduck is a ~25 cm / 800 g biped on a Rockchip RK3566 whose 50 Hz control loop drives 15 servos from RL policies trained in the companion `microduck_rl` repo — MuJoCo + PPO, sim2real, ONNX export — with walking, roller (wheels), beak pickup and self-righting modes, and firmware updates that are "verified, health-gated and reversible" (daemon 0.18.9-dev builds stamped today; units sold via pollen-robotics.com). One honest note: no public trigger surfaced for this week's surge (+599 stars/day) — no HN post or press found. What is verifiable is the repo, the continuous release cadence, and the shipped stack.

**Why it matters:** hobby-priced robots almost always ship closed control stacks; this one publishes the full training toolchain, which is what makes "reproduce it yourself" a checkable claim rather than marketing. The undiscoverable trigger is the part to watch — investigate before quoting the velocity.

[`🔗 pollen-robotics/microduck`](https://github.com/pollen-robotics/microduck) · [`🔗 releases`](https://github.com/pollen-robotics/microduck/releases)

---

## 34. Aphyr eulogizes Harvest: Bending Spoons took his invoicing bill from $13.32 to $133.98 a month

- **Velocity:** ▮ steady
- **Source:** Hacker News · 75+ pts · 2.9h ago (~09:58 UTC+8)
- **Tags:** `saas` `pricing` `industry`

Kyle Kingsbury — Jepsen's author — on Harvest, the time-tracking/invoicing SaaS acquired in 2025 by Bending Spoons ("the company that gutted Vimeo," in his framing): his plan went from **$13.32 to $133.98/mo** through a forced migration to an "enterprise" plan and an "unlimited" usage-billing model which is, in his words, "as far as I can tell, exactly what I had before"; the $12.65/mo "flex" plan skims an additional 2% on top of the usual ~3% card fees; and support emails are now answered by an LLM — "they don't read customer emails any more." The caveat: this is one customer's account — his own plan pricing and his own characterization of the terms.

**Why it matters:** freelancer infrastructure (invoicing, time tracking) is being repriced roughly 10× post-acquisition with a recognizable playbook — migrate everyone to one plan, relabel existing usage as billable, monetize support. The practical takeaway is to model your own renewal before the migration email arrives, not after.

[`🔗 aphyr.com — RIP Harvest`](https://aphyr.com/posts/427-rip-harvest) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50420035)

---

## 35. Declarative Dragging: specify which model states a drag should reach — the engine renders the possible worlds itself (UIST 2026 Best Paper)

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 586+ pts · Nov 4 (still on front page)
- **Tags:** `ui` `research` `interaction-design`

Declarative Dragging (Horowitz, Blinn & Heer; Best Paper Award, UIST 2026) inverts how drag-and-drop gets built: "Rather than programming all that visual behavior directly, you simply say, for each element you want to make draggable, which future states of your application dragging it should lead to." The engine speculatively renders those states to view trees, extracts where the dragged element lands in each rendering, and synthesizes the interaction from those possible worlds — no drop-zone geometry written by hand. The implementation is **Dragology**, a library for SVG interfaces on the web, with composable modifiers layering floating, snapping and transitions. Demos include algebra-rewriting puzzles, order-preserving maps between trees, and a permutation lab where parallel representations of the same system update mid-drag; post-paper work shows Hazel refactorings made tangible by dragging, and the authors' math game moving to 3D on a gamepad.

**Why it matters:** "it's just drag-and-drop" is a standing HN joke because hand-building it costs a week; this makes the hard part a query over model semantics instead of fiddly geometry. Speculative rendering of possible states is also the same trick agents use for action planning — arriving in UI code from the research side.

[`🔗 declarative-dragging.github.io`](https://declarative-dragging.github.io/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50368481)

---

## 36. Writing as a thinking tool: the six-pager argument dies — "you can now produce six pages with no thinking at all"

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 383+ pts · 26h ago (~18:41 UTC+8 yesterday)
- **Tags:** `writing` `llm` `essay`

The muratbuffalo blog (writing there since 2011) makes a crisp technical case for writing as cognition: Manuel Blum's line to graduate students — a Turing machine differs from a finite automaton only in having "paper and pencil" — lands as "Without writing, you are reduced to a finite automaton." Writing is out-of-core execution: his paper reviews reveal he understood "maybe 60%" until he wrote them, and a 2018 blog post on Paxos/Nakamoto anatomical similarity became the seed of a research paper. The LLM section is the sharper half: "the model has read everything except what is in your brain" — it knows the consensus framing, not your half-formed intuition against it. And Bezos's six-pager warrant — "There is no way to write a six-page, narratively structured memo and not have clear thinking" — is declared dead: with LLMs, "you can now produce six pages with no thinking at all, and the six pages still look like evidence that the thinking happened." Five rules follow (mess up, tidy up, keep it plain, write without expectations, put it on the schedule).

**Why it matters:** this names the evaluation problem underneath a lot of this feed's beats — produced text no longer certifies that thought occurred, so every artifact (six-pager, benchmark report, CVE writeup) needs a provenance story. The comparative-advantage framing is also a concrete answer to today's Goldman Sachs item: what the firm restricted is exactly the thing this essay says not to outsource.

[`🔗 muratbuffalo.blogspot.com`](http://muratbuffalo.blogspot.com/2026/11/writing-as-thinking-tool.html) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50412067)

---

## 37. Is Opus 5.5 nerfed? The 238-point debate vs the one instrument built to answer it — which already published its null

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 238+ pts · 5h ago (~15:04 UTC+8)
- **Tags:** `evaluation` `llm` `benchmarks`

A viral thread claiming Opus 5.5's thinking patterns changed on November 3 hit HN's front page and drew the usual war: anecdotes of quality collapse (one commenter: ~85% success rate down to ~10% in their workflows) against others who see nothing, with theories ranging from silent quantization to IPO-season downgrades. The part worth reading is the instrument: **ninjahawk/livenerf** — a pre-registered, 30-day (now 45-day) drift benchmark that locked a frozen 78-question panel (screened from 2,336 GPQA/MMLU-Pro/competition-math/AIME items where the model is "sometimes right"), pins the CLI, grades with pure functions, and committed its decision rule before collecting data. Its results post (Oct 27): days 11–20 scored 59.2% (+0.7 ± 1.8 pp) and days 21–30 scored 57.1% (−1.5 ± 1.8 pp) against a 58.4% launch baseline — no sustained regression. The honest limits are the load-bearing part: realized minimum detectable effect ≈ 6.6 pp per 10-day window; a deliberate **Opus 5 → Opus 5.5 substitution was indistinguishable** (−3.8 ± 6.3 pp, −23% tokens); effort cuts show in tokens first (medium −26%, low −62% output tokens); and the panel audit found 8 wrong answer keys plus ~30 ambiguous questions.

**Why it matters:** the most-repeated claim in model-quality discourse is currently unmeasurable by the best public instrument built to measure it — and the author says so plainly: "If an instrument can't reliably detect a particular same-family substitution, it shouldn't be used to claim that substitution hasn't happened." The token channel is where a silent effort cut would show first, which is the number to watch, not the vibes.

[`🔗 LiveNerf 30-day results post`](https://blog.nathanlangley.dev/posts/livenerf-30-days.html) · [`🔗 ninjahawk/livenerf`](https://github.com/ninjahawk/livenerf) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50422069)

---

## 38. Chimera: a voice synthesizer whose every sound comes from a simulated airway — Pink Trombone's lineage, in a browser tab

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 246+ pts · 13h ago (~06:36 UTC+8)
- **Tags:** `audio` `web` `synthesis`

Chimera Vocal Synth is a physically-modelled voice synthesizer: "Every sound here is produced by simulating air moving through a throat, mouth and nose." The interface exposes the instrument — a glottis-to-lips tube view, vocal folds slowed 100×, a live formant spectrum, an F1/F2 vowel chart — and you drag the tongue, lips or jaw, or play keys at a 110 Hz fundamental with controls for breath pressure (8.0 cmH₂O), pressed phonation and vibrato. No ML model, no samples; the HN thread places it as a modern descendant of Pink Trombone (2018), which itself descends from older articulatory-synthesis work, and clips of people playing it are circulating on X and Bluesky.

**Why it matters:** articulatory synthesis — the vocal tract as a physical instrument — is the standing counterpoint to neural TTS: fully interpretable (every vowel is a tract shape), controllable in ways diffusion audio models aren't, and a phonetics classroom in a tab. That it runs at interaction rates in a browser is the engineering feat.

[`🔗 chimera-vocal-synth.vercel.app`](https://chimera-vocal-synth.vercel.app/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50418182)

---

## 39. A Critique of GPUI: `notify` is zone.js — measured days after Discord bet its desktop app on the framework

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 117+ pts · 8h ago (~11:51 UTC+8)
- **Tags:** `rust` `gui` `performance`**

Days after Discord announced a GPUI rewrite (covered Nov 6), a measured counterweight: the author's thesis is that GPUI's state model cannot answer "when one value changes, what runs?" — `cx.notify()` names an entity and nothing below it, "more precise than a zone, since it names an entity, but ultimately it makes the same kind of statement" as Angular's zone.js. Benchmarks (i9-13900K, Vulkan, medians of three): at 3,000 live rows with a cached view per row, one label change costs 8.4 ms and grows ~3 ms per 1,000 rows; plain elements cost 92 ms; a hand-written equality guard takes the equal write from 7.9 ms to 0.9 µs. The gpui-fast fork gets 8.4 → 3.4 ms — still a whole-tree walk — and Zed's own retention experiments measured "1–3% slower than off on ordinary workloads." Elm/Iced rebuilds 39,023 widgets per label change (7.3 ms); egui costs ~32 ms per edit at 3,000 rows. The post's disclosure is the model for benchmark posts: the author ported GPUI's Linux renderer to wgpu, built the harness, and works on a rival signal framework (zgui, 0.69 ms) — "it is my framework and was tuned on this harness, so take these numbers with a grain of salt."

**Why it matters:** with Discord's rewrite making GPUI the reference choice for native Rust UI, this is the counterweight document — and its central trade is real: keep the plain-`render` API and pay per view, or hand-build a signal graph of entities and lose the simplicity you chose the framework for. The disclosure section is also worth copying for any harness-vs-harness benchmark.

[`🔗 A Critique of GPUI (zortax.de)`](https://blog.zortax.de/posts/a-critique-of-gpui) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50420857)

---

## 40. Since we covered Craft CMS's SQL injection on 2026-11-08: six more records in the same wave — a 9.8 GraphQL bypass and an 8.8 signed-template RCE

- **Velocity:** ▮▮ rising
- **Source:** NVD · 6 records · Nov 8 14:18Z
- **Tags:** `security` `cve` `craftcms`

The Nov 8 VulnCheck wave (the same ~14:18Z run as OpenEMR's 44 records, item 1) also published six more Craft CMS records, CVE-2026-124426 through -124431 — beyond the unauthenticated SQL injection covered yesterday. The headliners: **CVE-2026-124427 (9.8 CVSS 3.1)**, an authorization bypass that "allows anonymous GraphQL clients to read out-of-scope section entries via prev/next fields," chaining from one visible entry into sections a schema never exposed; **CVE-2026-124430 (8.8)**, RCE where non-administrator control-panel users "obtain HMAC-signed Twig templates via the app/render-elements endpoint"; and CVE-2026-124429 (7.5), where public registrants reclaim deactivated non-admin accounts while retaining their direct permissions. Plus arbitrary file read via SVG paths on the app/icon-svg endpoint (6.5) and an asset-volume browse bypass (4.3). VulnCheck is the CNA and publishes each record twice — `Primary` CVSS 3.1 beside `Secondary` CVSS 4.0 — and the pair directions disagree record-by-record (9.8→9.3, 6.5→7.1, 7.5→8.7, 8.8→8.7). All are fixed in **5.11.2, which Packagist shows shipping 2026-09-17** — 52 days before the paperwork; the current release is 5.11.5.1 (Oct 8).

**Why it matters:** the combined severity of this second tranche exceeds yesterday's single record, and the 52-day fix-to-record lag means anyone patching on CVE publication ran the GraphQL scope bypass and the signed-template RCE for almost two months. And when one CNA's 3.1 and 4.0 disagree in both directions across its own records, the version belongs beside every score you quote.

[`🔗 CVE-2026-124427 on NVD`](https://nvd.nist.gov/vuln/detail/CVE-2026-124427) · [`🔗 CVE-2026-124430 on NVD`](https://nvd.nist.gov/vuln/detail/CVE-2026-124430) · [`🔗 craftcms/cms on Packagist`](https://packagist.org/packages/craftcms/cms)

---

## 41. ChatGPT Desktop forwards your SSH agent — the mechanism is in OpenAI's own PR comment: a `forwarded-ssh-agent.sock`

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 53+ pts · 7.5h ago (~12:43 UTC+8)
- **Tags:** `security` `agents` `ssh`

An HN post argues ChatGPT Desktop's agent setup lets "the agent running on a remote machine… authenticate using your local SSH credentials. That means it can push to your private repos on GitHub." The mechanism is documented in OpenAI's own code: a June 14 comment by an OpenAI engineer on codex PR #28131 shows the app launching its server with `SSH_AUTH_SOCK=~/.codex/app-server-control/forwarded-ssh-agent.sock` pointed at `codex app-server --listen unix://`. An SSH-agent socket forwards *signing requests*, not keys — so whatever can reach that socket can wield your keys against any host that will accept the signature. The thread's mitigations: keys in the macOS Secure Enclave via Secretive (touch-gated per session), or a YubiKey with touch-required — so a new SSH connection always needs a human gesture.

**Why it matters:** agent convenience keeps widening the credential blast radius by design decisions, not bugs — this sits beside Claude Code's email-in-User-Agent and the "Don't Ask Again" secrets file in the same class. If your desktop agent mounts an agent socket anywhere, the answer to "who can push as me?" now includes everything that can reach that socket — worth checking before the next `git push` surprises you.

[`🔗 HN discussion`](https://news.ycombinator.com/item?id=50422628) · [`🔗 codex PR #28131 comment`](https://github.com/openai/codex/pull/28131#discussion_r3410013180)

---

## 42. Next-Concept Modeling: generate a whole level of concepts in parallel — 10–31× faster than diffusion LMs at matched quality

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 110+ pts · 4.7h ago (~15:20 UTC+8)
- **Tags:** `research` `architecture` `generation`

Next-Concept Modeling (arXiv 2610.14162, submitted Oct 9; Hermann Kumbong et al. — Stanford Hazy lineage incl. Azalia Mirhoseini and Christopher Ré) sits between autoregressive and diffusion language models: a multiscale residual VQ-VAE first encodes text into a *hierarchy* of discrete codes, then a transformer generates one level at a time, predicting **all codes within a level in parallel** — coarse structure first, fine detail later. At matched parameter scales, NCM beats the strongest diffusion-LM baseline's generative perplexity on LM1B while running **21× faster**, is competitive on OpenWebText at 10×, matches ROUGE-L on XSum at **31×**, and beats AR and diffusion baselines on Sudoku at every difficulty with fewer function evaluations. One editing artifact to note: the abstract's Sudoku sentence appears twice, back to back.

**Why it matters:** the next-token → parallel-spectrum has two known poles (AR quality, diffusion speed with full-sequence-per-step cost), and this proposes a third granularity — the "concept" — as the unit of parallel prediction. Small-scale results (LM1B, OWT, XSum, Sudoku), so the open question is whether the VQ hierarchy survives instruction tuning and long context; but the speed claims are the kind inference budgets care about.

[`🔗 arXiv:2610.14162`](https://arxiv.org/abs/2610.14162) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50422168)

---

## 43. gbrain: Garry Tan's agent-memory layer goes wide — 31.9k stars, MCP into five harnesses, and a warning that npm's `gbrain` is not this

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · +215 today · 31.9k stars
- **Tags:** `agents` `memory` `open-source`

GBrain ("Garry's Opinionated OpenClaw/Hermes Agent Brain") is the memory layer behind Y Combinator CEO Garry Tan's own agent deployment — his stated numbers: 155,795 pages, 24,589 people, 5,340 companies, 66 cron jobs running autonomously. MIT, self-hostable, with gbrain.io as optional paid hosting; it stores explicit facts *with sources*, supports corrections and withdrawal, and serves the same brain to Claude Code, Codex, ChatGPT, Cursor, Grok Bot and Muse over MCP. The synthesis layer returns cited answers plus a gap analysis ("what the brain doesn't know yet" — including staleness warnings like "nothing's been added to the brain about Alice or Acme since April 22, six weeks ago"); the typed graph lifts production R@5 from 0.6626 to 0.7241 on BrainBench relationship questions, with the honesty to note "0.9791 is the graph-oracle-parse upper bound, not a product score." The README also carries a supply-chain warning: "GBrain is NOT distributed on npm. The npm `gbrain` package is unrelated and can shadow the real binary."

**Why it matters:** memory is today's theme (claude-mem above, Anthropic's memory map last week) and this entrant's differentiators are provenance, retraction and gap analysis — the parts that make an agent's memory auditable rather than just large. The npm-shadowing warning is the release-drift lesson showing up in someone else's README, which is worth copying.

[`🔗 garrytan/gbrain`](https://github.com/garrytan/gbrain) · [`🔗 gbrain.io (hosted option)`](https://gbrain.io)

---

## 44. Scriban, the embedded .NET templating engine, gets a sandbox escape and a DoS pair — all fixed October 24, records published November 8

- **Velocity:** ▮ steady
- **Source:** NVD · 3 records · Nov 8 14:18Z
- **Tags:** `security` `dotnet` `templating`

Three records for Scriban (3,990★; embedded wherever .NET renders user-authored templates) arrived in the same Nov 8 VulnCheck wave. **CVE-2026-124438 is the sandbox escape** (7.4 CVSS 3.1 / 9.1 CVSS 4.0): `array.map` member access reaches ".NET internals of function values through reflection member accessors" — reading `Target`, `Method` or `ReturnType` on imported delegates exposes "and overwriting service properties, captured closure secrets, and assembly paths." The GHSA (patched 7.5.2) scopes it precisely: the high-impact variant needs the host to have imported an instance-method delegate via `ScriptObject.Import(name, Delegate)` — "the documented way to expose a function." The DoS pair (CVE-2026-124437, -124439, fixed 7.5.3): builtins like `math.format`, `regex.replace` and `string.escape` skip the `LimitToString` allocation guard, and postfix member/indexer/call chains bypass `ExpressionDepthLimit` while `object.eval` bypasses `RecursiveLimit` — landing an **uncatchable `StackOverflowException` that terminates the host process**. Fixes shipped Oct 24; the current 7.6.1 released Nov 8 — the same day, ~7 hours before the records went public.

**Why it matters:** Scriban's sandbox exists precisely because templates are untrusted input, and the escape runs through the *documented* delegate-import API — so every host that exposed service methods the normal way is in scope, not just misconfigured ones. And this CNA's 4.0 scores run 1.2–1.7 points above its own 3.1s: quote the version with the score.

[`🔗 GHSA-hvr4-4p37-494f`](https://github.com/scriban/scriban/security/advisories/GHSA-hvr4-4p37-494f) · [`🔗 CVE-2026-124438 on NVD`](https://nvd.nist.gov/vuln/detail/CVE-2026-124438)

---

## 45. RuView's 103k-star "see through walls with WiFi" ships an honesty table — its own retracted 100% figure, its 3.0% stub, and what's actually measured

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · +203 today · 103k stars
- **Tags:** `wifi-sensing` `hardware` `open-source`

RuView (103,148 stars) claims commodity-WiFi spatial sensing: $9 ESP32 CSI nodes, presence, 17-keypoint pose, breathing and heart-rate "through walls, in the dark, with no cameras or wearables." The part worth reading is its own labeling table (ADR-187, "Read the label, not the headline"). **Measured:** the CSI encoder + presence head at 82.3% held-out temporal-triplet accuracy — with the older "100% presence" figure explicitly *retracted* as "measured on a single-class recording" — and an MM-Fi pose model at **82.69% torso-PCK@20** (ensemble 83.59%) against MultiFormer's 72.25% and CSI2Pose's 68.41% on the matched protocol, self-corrected on a public leaderboard. **Honestly labeled weak:** the committed on-device pose model measures **PCK@20 = 3.0%** against its ≥35% target, and its runtime path "is still a centred-skeleton stub returning `confidence=0`" — "the weights are not yet wired in." **Architecture only:** archive/v1 has "no checkpoint of any kind." Full-study numbers: zero-shot cross-subject ~64%, in-room calibration 72.2%. The 4-bit encoder fits in 8 KB; the HF weights are published. No public trigger surfaced for today's +203 — no HN post or press found.

**Why it matters:** a repo claiming through-wall DensePose that publishes a three-tier real/stub/architecture table of its own claims, and retracts its own best marketing number, is the counter-Void: the honesty is the artifact. Quote the 82.69% (benchmarked, published protocol) — not the hero image.

[`🔗 ruvnet/RuView`](https://github.com/ruvnet/RuView) · [`🔗 ruvnet/wifi-densepose-pretrained (model)`](https://huggingface.co/ruvnet/wifi-densepose-pretrained)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-09T12:38:24Z |
| Items | 45 |
| Sources tracked | 30 (Hacker News, GitHub Trending, NVD, CISA-ADP enrichment, VulnCheck advisories, IBM security bulletins, WPScan, GitHub Advisory DB, OSV Advisory DB, arXiv, Hugging Face Papers, NVIDIA Newsroom, isocpp.org, shubs.io, duxlabs.dev, vercel.com changelog, aphyr.com, ram-altman.lol, ketchup3d.github.io, The Decoder, MailRoute, linebender.org, packethound.app, hamza.se, declarative-dragging.github.io, blog.nathanlangley.dev, muratbuffalo.blogspot.com, blog.zortax.de, chimera-vocal-synth.vercel.app, Packagist) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[Previous day](2026-11-08.md) · [Raw .md](https://trending.md/en/feed/latest.md) · [Archive](../archive/index.md)
