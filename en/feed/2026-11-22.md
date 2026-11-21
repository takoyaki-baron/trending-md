---
date: 2026-11-22
updated: 2026-11-21T20:30:36Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 22
license: CC-BY-4.0
---

# Trending — 2026-11-22

## 1. Since we covered yesterday's GRH announcements: the Lean proof is now a certified 17-million-line library — independent kernels are accepting the export

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 569+ pts · ~5.5h ago (~22:40 UTC+8)
- **Tags:** `mathematics` `lean` `riemann-hypothesis` `ai-assisted-proof` `formal-verification`

Yesterday the feed covered the dueling GRH claims — Alpöge's Lean-only announcement ("I believe I have, working with Claude, discovered a proof") beside Masullo's all-human draft. Since then the load-bearing half actually happened: the Lean and Mathlib communities issued a joint certification dated November 21, stating "We hereby certify that both the statement and the proof of the Riemann Hypothesis are correct." The proof is a library of ~17 million lines across 175,187 modules, and Andrew Sutherland's (MIT) verification-files page — "checks run with Claude Code" — records the audit: every module compiles with zero errors under Lean v4.33.1, the five headline theorems depend only on the three standard axioms (propext, Classical.choice, Quot.sound), and the full exported proof is accepted by two independently written kernels — nanoda (Rust, 27 min 42 s on 80 threads) and con-leche (1,468,418 declarations in verified mode), whose `--compare` mode confirms all five theorems against the published challenge. lean4lean passes all 175,187 modules; the export's sha256 matches the file published in the Deicyde/riemann-hypothesis repo. Two checks are still running (Lean's paranoid kernel, the lake comparator), and the communities are explicit that the *mathematics* is not yet understood: they "look forward to all the activity… that will help explain the new ideas in this proof."

**Why it matters:** This is the moment the "is it real?" question changes shape — the claim is no longer a PDF nobody can read but an artifact two independent kernel implementations accept, which is a different and much stronger kind of "true." The caveats travel with it: Scott Aaronson notes Lean's kernel has historically had bugs that allowed 0=1 proofs ("these issues can and should urgently be fixed"), and hours after the certification a `math-horizon` repo appeared under google-deepmind and was gone (404) within a day — contents never public long enough to read.

> The verification page's own honesty note: results are "as of" its November 21 12:55 UTC update, and the paranoid-kernel and comparator runs were still in progress at that stamp.

[`🔗 Lean community certification`](https://leanprover-community.github.io/blog/posts/riemann-hypothesis/) · [`🔗 Verification files (Sutherland, MIT)`](https://math.mit.edu/~drew/grh/) · [`🔗 Alpöge's announcement (PDF)`](https://alpo.ge/remark.pdf) · [`🔗 Scott Aaronson: the stochastic parrots have apparently proved RH`](https://scottaaronson.blog/?p=10344) · [`🔗 HN discussion (436 comments)`](https://news.ycombinator.com/item?id=50589618)

---

## 2. Inkling-2-Mini already runs in 5.4 GB — a quantization compiler beats a 9.1 GB GGUF on GSM8K and HumanEval at 41% less memory

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 160+ pts · ~2.2h ago (~02:00 UTC+8)
- **Tags:** `quantization` `inkling` `local-llm` `apple-silicon`

Since we covered Thinking Machines' Inkling 2 Mini yesterday morning: ShinMegamiBoson's LookAtMyQuant — a quantization compiler that measures how much each stored piece of a model hurts the output, then picks a code per piece to fit a size budget — shipped its take on the new 26.4B/5.4B-active looped MoE overnight. The 18.89 GB BF16 original compresses to **5.38 GB (1.63 bits/weight)** and 8.87 GB (2.69), with published comparisons against Unsloth's own low-bit GGUFs: the 5.4 GB build scores 134/200 on GSM8K and 60/164 on HumanEval, beating Unsloth's 9.14 GB UD-Q2_K_XL (127 and 46) at 41% less memory, and the 8.9 GB build matches the BF16 teacher on GSM8K (148/200). Both quantized files are on Hugging Face, run through the project's Apple Silicon Metal runtime, and the README reports M5 Max decode of 73.2 tok/s serial (125.2 median, 1,037 tok/s prefill) with a 179 MB drafter attached.

**Why it matters:** A same-week quant of a brand-new open release is the local-AI ecosystem working as intended — and the honest tables (KL deltas, untuned baselines, teacher scores) are a better template for quant claims than the usual as-good-as-FP16 marketing. Yesterday's laptop inference story now has a 5 GB entry point.

[`🔗 LookAtMyQuant (repo + full recipe)`](https://github.com/ShinMegamiBoson/lookatmyquant) · [`🔗 Inkling-2-Mini 5.4 GB quant (Hugging Face)`](https://huggingface.co/shinmegamiboson/Inkling-2-Mini-LookAtMyQuant-5.4GB) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50591853)

---

## 3. Upload2Shell: a Ghostscript -dSAFER escape with confirmed RCE in CUPS, Roundcube and WordPress — the research page is public, the record is 12 days old

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 10+ pts · ~1.8h ago (~02:30 UTC+8)
- **Tags:** `security` `ghostscript` `rce` `cve` `disclosure`

pwn.ai's research page for **CVE-2026-125396** went public today, and it is a full disclosure ledger rather than a bug blurb: a use-after-free in Ghostscript's Type 1 font loader (`gs_fonts.ps`'s `.putgstringcopy` calls the privileged `.forceput` without checking operand types), letting a crafted document cross -dSAFER, recover `.forceput` through a custom error handler, and execute attacker-chosen commands as the rendering process. The timeline is the substance: discovered July 27, demonstrated against Google's document renderer July 30, a WordPress core fix (CVE-2026-65640) August 12, upstream Artifex bug 709684 September 2, the fix shipped in Ghostscript 10.08.0 on September 8 — and then the downstream roots: Debian 13's CUPS accepts an unauthenticated IPP job that runs as `lp`, Roundcube executes code as `www-data` when a viewed mail's attachment is thumbnailed, with Plesk and a Dropbox document-processing path confirmed alongside. NVD's record (published 2026-11-10, `Awaiting Analysis`) carries VulnCheck's CVSS 4.0 **8.5** / 3.1 **7.8** (Secondary) and a CISA-ADP SSVC of exploitation: none.

**Why it matters:** The score says "High," the confirmed paths say worse: Ghostscript sits invisibly under print servers, mail scanners and image pipelines (the ImageMagick delegate class), so the exposed population is everyone whose stack renders untrusted files — not everyone who installed Ghostscript. The fix is five weeks upstream and months downstream; the record landing only now is the usual CVE-clock lag the feed keeps documenting.

[`🔗 Upload2Shell research page (pwn.ai)`](https://pwn.ai/upload2shell) · [`🔗 NVD record CVE-2026-125396`](https://nvd.nist.gov/vuln/detail/CVE-2026-125396) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50592097)

---

## 4. My monitor was cutting my download speed by 75% — the one-cable desk setup, debugged frame by frame

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 357+ pts · ~9.8h ago (~18:30 UTC+8)
- **Tags:** `networking` `debugging` `hardware` `usb`

Oscar Molnar's 2.5-gigabit symmetric line was delivering 600 Mbps down (upload untouched at 2.4 Gbps) through his Studio Display XDR's Ethernet pass-through. The investigation is a model of measurement over guessing: the adapter and cable are fine direct on the Mac (2.3 Gbps iperf3), pings fail 10% through the display with zero dropped-frame errors in macOS logs — "the adapter was dropping them before the computer could know." The resolution has two layers: the Realtek RTL8156B on Apple's generic USB driver gives way to Realtek's own driver (600 Mbps → 1.1 Gbps), and flow control (pause frames) on the UniFi switch lifts it to ~2 Gbps — because the chip's own counters show it silently shedding frames above ~168,000 frames/s (~2 Gbps) when connected behind the display, with 0% loss plugged in direct. The author leaves flow control off anyway: it buffers bursts at the sender and adds latency to his gaming PC.

**Why it matters:** The monitor-dock-as-network-bottleneck failure is silent by construction — nothing logs a dropped frame, so you just live with a quarter of your line. The post doubles as the clearest short explainer of Ethernet flow control most engineers will ever read, and its method (UDP at a fixed rate, read the chip's own counters) generalizes to every why-is-my-transfer-slow hunt.

[`🔗 The full investigation (Tymscar blog)`](https://blog.tymscar.com/posts/studiodisplayethernet/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50587875)

---

## 5. Since we shipped GPT-6.2 coverage on the 18th: Astra and Sol flop below the human baseline on SimpleBench — while five rivals clear it

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 144+ pts · ~7.2h ago (~21:05 UTC+8)
- **Tags:** `benchmarks` `gpt-6` `evaluation` `ai-models`

SimpleBench's leaderboard updated with the November 18 launches, and the numbers are brutal: **GPT-6.2 Astra Pro 79.2%** (16th), **GPT-6.2 Astra 77.3%** (17th), **GPT-6.2 Sol 69.9%** (30th) — every GPT-6.2 variant lands below the benchmark's 83.7% non-specialized human baseline, while the new entries at the top are Claude Fable 5.2 (94.9%) and Google's Gemini 4 Neon (94.4%), with Carbon, Argon and Hydrogen at 91.7–92.6%: five models now beat the human sample of nine. SimpleBench's 200+ questions target spatio-temporal reasoning, social intelligence and "linguistic adversarial robustness" — the trick questions where memorized patterns mislead. A telling detail from the page itself: its intro still carries the stale claim "outperforming every tested LLM, including today's top model, Claude Fable, which scored 81.9%" — struck through, a fossil from before the new wave landed.

**Why it matters:** Two benchmarks, two opposite verdicts for the same release: GPT-6.2 went 100% on ARC-AGI-3 with a provider adapter on launch day, and sits below a high-schooler on SimpleBench four days later. That divergence is the current evaluation crisis in miniature — benchmark wins are harness-shaped, and "linguistic adversarial robustness" measures something the reasoning harnesses don't.

[`🔗 SimpleBench leaderboard`](https://simple-bench.com/) · [`🔗 HN discussion (138 comments)`](https://news.ycombinator.com/item?id=50588916)

---

## 6. Reuters: the SEC's Nvidia probe is examining potential accounting issues — shares plunge ~12% amid a $2.7 trillion rout

- **Velocity:** ▮▮ rising
- **Source:** Reuters (via HN) · 298+ pts · ~24h ago (~04:20 UTC+8 Nov 21)
- **Tags:** `nvidia` `regulation` `sec` `industry`

Reuters reports, per two people familiar with the matter, that the SEC enforcement probe into Nvidia is focused on **potential accounting issues** — the first reporting on what investigators are actually examining, days after CEO Jensen Huang's resignation (covered Nov 13) and one day after the FT documented that Nvidia stopped disclosing Singapore sales as quarterly revenue passed $104B (covered Nov 18). Nvidia shares fell ~12% on the report, extending what Yahoo Finance sizes as a $2.7 trillion rout; the Nasdaq has erased its 2026 gains and the WSJ frames the broader move as a $4 trillion AI wipeout that the Anthropic IPO bust punctuated. Neither the SEC nor Nvidia has confirmed the probe's focus — this is a sources-say story, and the feed labels it as such.

**Why it matters:** Accounting scrutiny of the AI capex cycle's bellwether is a dev-relevant event even for people who never trade: it is the revenue-recognition side of the where-are-the-returns question Baidu's and Xiaomi's CEOs raised last week, and chip procurement plans across the industry are repricing on it. Watch for whether the probe's scope reaches the GPU-deployment deals (CoreWeave-style circulars) rather than product accounting.

[`🔗 Reuters: Nvidia's accounting is a focus of SEC investigation`](https://www.reuters.com/world/us-secs-nvidia-probe-is-examining-potential-accounting-issues-sources-say-2026-11-20) · [`🔗 HN discussion (162 comments)`](https://news.ycombinator.com/item?id=50581438)

---

## 7. Alibaba's OpenCodeReview rides weekly trending at +4,457 stars — v1.14.0 shipped yesterday

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · +4,457 stars this week · v1.14.0 ~13h ago
- **Tags:** `code-review` `alibaba` `developer-tools` `open-source`

OpenCodeReview — Alibaba's code review platform, self-described as "secure, fast, efficient, battle-tested at Alibaba's scale. Hybrid architecture code review tool" — is the week's fourth-biggest gainer on GitHub trending with 55,047 stars, and released v1.14.0 yesterday (15:17 UTC+8). The repo, created in May, publishes npm packages and positions itself for enterprise review pipelines where automated checks and human approval mix. Its arrival on the weekly board alongside the agent-skills wave suggests the audience is the same one building AI review loops — tools that gate machine-written PRs before humans spend attention on them.

**Why it matters:** Code review is the documented bottleneck of the agent-coding era (Harvard's firm-level study put submission-to-approval time up 56%); a hyperscaler's production review system going broadly open-source is directly the tooling that bottleneck needs. Worth watching: how its hybrid (rule-based + model) split is weighted, and whether the npm distribution makes it embeddable in agent pipelines rather than a standalone portal.

[`🔗 alibaba/open-code-review`](https://github.com/alibaba/open-code-review) · [`🔗 v1.14.0 release`](https://github.com/alibaba/open-code-review/releases/tag/v1.14.0) · [`🔗 Project site`](https://open-codereview.ai)

---

## 8. Plannotator: an inbox where you annotate your agent's plans and review its diffs — 14k stars and climbing

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · +3,555 stars this week · v0.29.1 Nov 19
- **Tags:** `agent-infra` `code-review` `planning` `developer-tools`

Plannotator (backnotprop) sells itself as "everything you need to annotate and stay in the loop with your agents": an inbox surface for plans, specs, markdown, HTML and other interactive artifacts, with diff/PR review and a feedback channel back to the agent. First-party support spans Amp, Claude Code, Codex, Copilot CLI, Droid and Gemini CLI, with more agent icons in the README — it is the human-approval UI layer the plan-approve-execute agent loop keeps needing. v0.29.1 shipped November 19 and the repo is pushed daily; at 14,123 stars it is one of the week's fastest risers.

**Why it matters:** Every agent framework converges on the same chokepoint — a human reading a plan before the agent burns an afternoon on it. A dedicated, agent-native annotation surface (rather than comments in a chat log) is the missing piece of that loop, and the multi-agent support list shows the ecosystem standardizing on the workflow rather than on any one vendor's harness.

[`🔗 backnotprop/plannotator`](https://github.com/backnotprop/plannotator) · [`🔗 v0.29.1 release`](https://github.com/backnotprop/plannotator/releases/tag/v0.29.1)

---

## 9. Show HN: Zero C# — C# without a runtime or GC, compiled to a 386 DOS binary

- **Velocity:** ▮ steady
- **Source:** Show HN · 74+ pts · ~4.6h ago (~23:40 UTC+8)
- **Tags:** `csharp` `compilers` `native` `runtime-free`

Onur Gumus's Zero C# is a fork of bflat that compiles C# straight to a small native program: no .NET runtime, no garbage collector, nothing to install where it runs. You keep the language — C# 15 syntax, type checking, generics specialized per type, records, LINQ-shaped lambdas via a small library, even `Parallel.For` — and give up the runtime's services: memory comes from arenas you free all at once, `throw` ends the program (errors return as unions), and there's no reflection or async. Hello world is 11 KB on Windows and 40 KB on Linux, and the same source builds for Linux, macOS, Windows, WebAssembly and DOS on a 386, with the identical test suite required to pass on every target.

**Why it matters:** The no-runtime niche (latent-space of Go, Rust and Zig adopters) has always priced out C# — the language people actually know. Arena-only memory plus a real type system is also a genuinely interesting safety trade: it gives up use-after-free freedom by construction rather than by borrow-checking. 386/DOS as a supported target is the same retro-computing boundary the ClawDOS agent pushed last week.

[`🔗 Zero C# guide`](https://onurgumus.github.io/zero-csharp/index.html) · [`🔗 OnurGumus/zero-csharp`](https://github.com/OnurGumus/zero-csharp) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50590279)

---

## 10. gopgext: PostgreSQL extensions written in plain Go — TinyGo compiles them into the server

- **Velocity:** ▮ steady
- **Source:** Hacker News · 70+ pts · ~3.1h ago (~01:10 UTC+8)
- **Tags:** `postgresql` `golang` `tinygo` `extensions`

Jespino's gopgext builds PostgreSQL extensions from ordinary Go code via TinyGo: mark a function with `//gopgext:function` and the toolchain writes the C glue, the install script and the control file for you. The standard library works inside the server (`fmt`, `regexp`, JSON, crypto, generics, defer/recover), strings/numbers/arrays/JSON map to SQL types, and the surface goes beyond functions: triggers, aggregates, GiST/GIN/SP-GiST/BRIN operator classes, foreign data wrappers and query hooks. The project proves itself on upstream's own territory — ports of contrib modules (pgcrypto, hstore, pg_stat_statements, cube) pass upstream's test suite — and its README is blunt about the risk: a bug in generated code or the Go runtime "runs inside the server, where it can crash it or corrupt data." The repo is four days old with 16 stars.

**Why it matters:** PGXS/C-level extension authorship is a small, specialist guild; a Go path (with the sandboxing story still open, as the README admits) widens who can extend Postgres — the database most agent stacks now sit on. Experimental label worn honestly; watch the memory-model story before production.

[`🔗 gopgext documentation`](https://jespino.github.io/gopgext/) · [`🔗 jespino/gopgext`](https://github.com/jespino/gopgext) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50591260)

---

## 11. Deterministic Simulation Testing Is for Everyone — the distributed-systems trick, argued down to ordinary apps

- **Velocity:** ▮ steady
- **Source:** Hacker News · 56+ pts · ~31h ago (~21:20 UTC+8 Nov 20)
- **Tags:** `testing` `deterministic-simulation` `reliability` `essay`

Outdata's November 20 essay argues deterministic simulation testing (DST — replay the world, seed and all, until the failure reproduces) should not stay a FoundationDB/Antithesis-shaped specialist technique. Its taxonomy of why we test is the essay's engine: reactive regression tests, defensive guardrails, and "obligation" testing — TDD whose discipline leaves when its champion does, leaving "numerous, brittle, numerous" tests behind. The claim is that doubt-removal is the actual product ("Can this dependency be removed? Can these modules be re-arranged?"), and that a deterministic, seed-addressable failure is the only kind of bug report you can hand a teammate — or, this feed would add, an agent.

**Why it matters:** DST is having its second HN moment for a reason: agents write code fast and tests are the management, and a testing mode where any failure is reproducible from a seed is exactly what agent-written changes need. The essay's framing gives teams that found Antithesis/Turso-style tooling intimidating a doorway-level argument to start with.

[`🔗 Deterministic Simulation Testing Is for Everyone`](https://outdata.net/blog/261120) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=50574264)

---

## 12. Machine-code programming: LLMs read and write executables byte by byte, given only a hex dump

- **Velocity:** ▮ steady
- **Source:** Hacker News · 133+ pts · ~3.4 days ago
- **Tags:** `llm` `reverse-engineering` `machine-code` `malware-analysis`

"LLMs can now understand and write machine code. Given only a hex dump, with no disassembler or compiler, and no tools." That is the claim George Xenos and Sotiris Giannopoulos set out to test — explicitly positioned as the compiled-code sibling of the weight-space programming result this feed covered last week (they cite Takehi et al.). GPT-6.1 Sol, fed xxd output at ~2.4 tokens per byte, explained all five binaries they gave it — including a stripped statistics tool where it found a real bug in the upstream code — analyzed an unknown malware sample correctly down to its IOCs, added a feature to three binaries by directly editing bytes, and wrote three working programs from scratch. DeepSeek V4.1 Flash reached the same conclusion on the malware sample, their evidence that this isn't closed-model-only.

**Why it matters:** Weight-space programming said trained weights are becoming an addressable artifact; this says compiled binaries are too — the artifact every security team treats as opaque. The near-term use is reverse engineering and malware triage without toolchains; the long-term one is models that patch shipped artifacts where no source exists. The caveat is in their own setup: ~2.4 tokens per byte means context, not capability, is the binding constraint.

[`🔗 Programming in the Machine Code Space`](https://sgiannopoulos.github.io/blog/machine-code-programming/) · [`🔗 HN discussion (96 comments)`](https://news.ycombinator.com/item?id=50546587)

---

## 13. Three 9+ CVE records from one publication day: Google Cloud Dataform path traversal, Net::DNS predictable query IDs, and a Go PKCS#11 nonce flaw

- **Velocity:** ▮ steady
- **Source:** NVD · published Nov 20 · all three `Received`, CNA-scored
- **Tags:** `security` `cve` `gcp` `dns` `cryptography`

Three records from NVD's November 20 batch deserve more attention than their zero-KEV status suggests. **CVE-2026-126054** (CVSS 4.0 **9.3**, Google's CNA): a path traversal in workspace directory handling and Git integration across Google Cloud Dataform, BigQuery Studio and Colab Enterprise lets an authenticated remote attacker "read private files and create arbitrary files across tenant repositories." **CVE-2026-101340** (CVSS 4.0 **9.1**, NLnet Labs): Net::DNS through 1.57 derives its 16-bit DNS query IDs from Perl's built-in `rand()`, so an attacker who observes the ID sequence can recover the PRNG state and predict IDs "before they are transmitted" — the forged-response primitive behind DNS cache poisoning, and the record notes 1.57's deduplication cache does not stop it. **CVE-2026-115407** (CVSS 4.0 **9.1**, Eclipse CNA): the `crypto11` Go PKCS#11 wrapper passes whatever GCM nonce it is given straight to `CK_GCM_PARAMS` without checking its length — and accepts an empty nonce; on SoftHSM2, every `Seal` with an empty nonce encrypts under the same IV, "reusing the keystream and exposing the GHASH authentication key, which allows forgeries." Fix commit and GHSA advisory are linked in the record.

**Why it matters:** All three still sit at `Received` — NVD has not yet analyzed any of them, and none carries an NVD score of its own — so the numbers above are the CNAs' (Google's, NLnet Labs', Eclipse's), and the CISA-ADP enrichment container is attached to each. The Net::DNS one is the sleeper: Perl DNS resolvers are still load-bearing in unexpected places, and predictable query IDs are the oldest attack in the book.

[`🔗 CVE-2026-126054 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-126054) · [`🔗 CVE-2026-101340 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-101340) · [`🔗 CVE-2026-115407 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-115407)

---

## 14. SoK: grading LLMs on a driving-automation scale for vulnerability research — agents were fully autonomous before 2026's frontier models

- **Velocity:** ▮ steady
- **Source:** arXiv · 2611.26601 · submitted Nov 19
- **Tags:** `ai-research` `security` `sok` `vulnerability-research`

Amine Lbath's systematization-of-knowledge paper builds the missing measurement layer for the agents-are-changing-vulnerability-research claims: a framework that rates LLM security capability on an autonomy scale modeled on driving automation (SAE J3016-style levels), qualifying each published claim by correctness, availability and evidence strength. Three findings stand out: agents "discovered, validated, and patched vulnerabilities in real-world software without human intervention before the restricted frontier models of 2026"; open-weight models subsequently attained comparable autonomy for discovery and validation; and measuring a decade of public vulnerability records — disclosures **more than doubled in 2026**, with an increasing share critical or high and decade-old bugs reported several times more often — while the time "from report to fix and from disclosure to attack has not shifted noticeably so far." The paper grades the literature's proposed mitigations with an explicit rubric and derives stakeholder guidance from the best-supported ones.

**Why it matters:** The doubled disclosure volume with unchanged fix latency is the quantified version of the feed's security-track thesis: AI is finding bugs faster than the industry patches them, and the bottleneck moved to remediation. An automation-levels scale for security agents gives procurement and policy a shared vocabulary the current vendor claims lack.

[`🔗 arXiv: 2611.26601`](https://arxiv.org/abs/2611.26601) · [`🔗 Hugging Face papers`](https://huggingface.co/papers/2611.26601)

---

## 15. sure: the self-hosted personal finance app with a built-in AI assistant crosses 17k stars

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · +2,476 stars this week · v2026.11.20-alpha Nov 21
- **Tags:** `finance` `self-hosted` `ai-assistant` `open-source`

we-promise/sure — "the personal finance app for everyone (by everyone)" — is the week's quiet trending story: 17,105 stars, +2,476 this week, and an alpha release train that ships daily (v2026.11.20-alpha / v0.7.7-alpha.8 landed yesterday). The dashboard pairs cashflow, net-worth, spending and outflows with an AI assistant that answers questions about your own numbers — the local-AI pattern this feed keeps tracking (Platypush's voice pipeline, Foolscap's read-only writing app) applied to the most sensitive personal data there is. Notably for a 17k-star project, releases are dated calendar alphas rather than semver stables — an explicit work-in-progress signal rather than a maturity claim.

**Why it matters:** Finance is the category where your-data-never-leaves is a feature, not a preference, and an assistant that can explain a November spending spike over local data is the demo every self-hosted AI integration is reaching for. The daily-alpha cadence means users are effectively on main — worth knowing before importing a decade of statements.

[`🔗 we-promise/sure`](https://github.com/we-promise/sure) · [`🔗 Releases`](https://github.com/we-promise/sure/releases)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-21T20:30:36Z |
| Items | 15 |
| Sources tracked | 22 (Hacker News, GitHub Trending, NVD, CISA KEV, Reuters, arXiv, Hugging Face, simple-bench.com, pwn.ai, leanprover-community, math.mit.edu, scottaaronson.blog, blog.tymscar.com, outdata.net, sgiannopoulos.github.io, jespino.github.io, onurgumus.github.io, github.com, yahoo.com, wsj.com) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[Previous day](../2026-11-21.md) · [Raw .md](https://trending.md/en/feed/2026-11-22.md) · [Archive](../archive/)
