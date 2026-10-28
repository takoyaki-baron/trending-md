---
date: 2026-10-28
updated: 2026-10-28T12:23:59Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 30
license: CC-BY-4.0
---

# Trending — 2026-10-28

## 1. Genie 4 generates worlds with audio and dialogue — and DeepMind ships no benchmark with it

- **Velocity:** ▮▮▮ trending
- **Source:** Google DeepMind blog / Hacker News · 470 pts · 276 comments · ~4h ago (~00:06 UTC+8 Oct 28)
- **Tags:** `deepmind` `world-model` `multimodal` `simulation` `research-preview`

**Genie 4** is a world model for "real-time interactive simulation," and the modality list is the news: it generates a simulated world *together with* ambient sound matched to the environment and interactive character dialogue that adapts on the fly. Steering is natural-language — change weather, move the camera, add people or objects — with Gemini adapting the prompt to the scene and keeping the world coherent between edits. DeepMind credits **Gemini Omni** for grounding scenes in realistic appearance and behaviour, and **Gemini 3.8 Flash** as a guiding agent that observes, plans steps and checks progress to support causality and multi-step events. It simulates aerodynamics, collisions and character movement. Robotics experiments pair **Gemini 4 Argon** with Genie 4, including an Apptronik Apollo humanoid playing checkers. Availability is a research preview for trusted testers, "coming soon" to Google AI Ultra subscribers through Project Genie and to early-access partners via the Gemini API and Google AI Studio, with a waitlist.

**Why it matters:** there is no benchmark in the post and no model size — so the deployable information is the limitations list, and it is unusually specific. Visual details and object permanence "shift or drift over time," particularly in longer sessions, after multiple complex edits, or while navigating; complex physical interactions, real-time audio accuracy, legible text rendering, spatial accuracy and long-term consistency "are active areas of ongoing research." SynthID watermarking is on every output. That combination describes a preview with a *named* failure mode rather than a solved simulator — and drift-after-edits is the one that matters for the pre-visualisation and prototyping uses DeepMind lists, because those workflows are exactly the multi-edit ones.

[`🔗 DeepMind — Genie 4: a new generation of world simulation`](https://deepmind.google/blog/genie-4-a-new-generation-of-world-simulation/) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=50261319)

---

## 2. Ghostty 1.4.0 completes Kitty graphics and cuts scrollback memory 70–90% — and ships ten security advisories with no CVE IDs

- **Velocity:** ▮▮▮ trending
- **Source:** ghostty.org release notes / Hacker News · 389 pts · 127 comments · ~3h ago (~00:51 UTC+8 Oct 28)
- **Tags:** `terminal` `zig` `release` `performance` `disclosure`

**Ghostty 1.4.0** shipped **2026-10-27T19:37Z** after seven months, 172 contributors and 2,889 commits. The headline is Kitty graphics: animation and relative placements land, completing support for the published spec — Ghostty claims to be the first non-Kitty terminal to get there. Idle scrollback is now transparently compressed, cutting physical memory roughly **70–90%** for typical text, which is what lets the default scrollback limit rise from **10 MB to 50 MB** while an empty terminal on macOS uses about **16 KiB**. Reading and parsing the pty were separated: macOS I/O throughput up **25–55%**, and plain-text VT parsing measured at **128 MB/s → 725 MB/s**. GTK gets a new EGL renderer with triple buffering and DMABUF sharing, replacing `GtkGLArea`; fractional-scaled text is sharp. Also: the Kitty clipboard protocol (OSC 5522) on macOS and GTK, drag-and-drop split rearrangement on GTK, `esctest` wired into CI, a `ghostty +ssh` wrapper that installs terminfo and forwards environment variables, macOS 27 "Golden Gate" fixes, and four new localisations (Basque, Belarusian, Danish, Serbian in both scripts).

**Why it matters:** read the breaking changes before upgrading — `copy-on-select` now accepts `none`/`primary`/`clipboard`/`both` where `clipboard` means *only* the system clipboard, macOS changes the default to `none`, `cmd+arrow_up/down` revert to `jump_to_prompt`, GTK moves tab-switching to `ctrl+shift+page_up/down`, and `scrollback-limit` is deprecated for `scrollback-limit-bytes`. Then read the security section, which is the largest part of this release: **ten** GHSA advisories — a paste guard that did not treat carriage returns as line endings, hostile Kitty graphics commands that could crash, hang, over-allocate or touch files, two tmux-control-mode crashes (one closing every window, one via a zero-sized or oversized pane), memory corruption when clearing into a scrollback with a very small limit, escape injection through zsh integration from a crafted directory name, and four macOS issues (cmd-clicking a crafted OSC 8 link, links matched by the `link` configuration, drag-and-drop bypassing paste protection, and control characters in a filename misrepresenting the command in the confirmation dialog) — with the notes stating **CVEs had not yet been assigned**. Ten advisories and zero identifiers means a scanner has nothing to match on release day; the release notes are the only disclosure that exists. Requirements also move: GTK **4.18** and libadwaita **1.7** (Ubuntu 24.04 no longer qualifies), Zig **0.17**, macOS 13+. Ghostty 1.5 is slated for **March 2027**, and the Windows GUI roadmap is gone while libghostty support for Windows continues.

[`🔗 Ghostty 1.4.0 release notes`](https://ghostty.org/docs/install/release-notes/1-4-0) · [`🔗 ghostty-org/ghostty — releases`](https://github.com/ghostty-org/ghostty/releases) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=50261998)

---

## 3. CPython is removing its experimental JIT — PEP 836 was withdrawn on October 19, and the council's objections are the useful part

- **Velocity:** ▮▮▮ trending
- **Source:** LWN.net / Hacker News · 371 pts · 194 comments · ~9h ago (~19:17 UTC+8 Oct 27)
- **Tags:** `python` `cpython` `jit` `pep` `governance`

The Python steering council set a **six-month deadline in June** for a standards-track PEP to keep the experimental JIT, and on **October 19** the PEP 836 authors — **Brandt Bucher, Savannah Ostrowski and Ken Jin** — withdrew it. Ostrowski's reason is bandwidth, not performance: "we don't feel we have the personal bandwidth to carry the current version forward." The council concluded the PEP "mostly answers the questions we asked" but named three gaps: security was "**an underserved area in the PEP**," the user-impact claims were "**overly optimistic**," and the planned 2028 compatibility review was "**way, way too late**." It also cited main-branch experimentation problems and a "lack of unified design." Brett Cannon said "work would be stopped in the main repository," leaving open whether the community continues elsewhere. Removal is expected early in the **3.16** development cycle — early enough to absorb fallout. The JIT landed in **3.13** (2024); **3.15** was allowed to keep the status quo. The reference implementation will be published and linked from the withdrawn PEP.

**Why it matters:** the JIT was the headline performance story of 3.13, and every reason it died is maintenance-shaped. The security objection is the one to carry: a JIT is a memory-corruption surface that the PEP never budgeted for, and "add a JIT to improve the interpreter" is a proposal that has to answer that question first. The second thing worth keeping is the shape of the ending — a six-month clock that expired in *withdrawal plus a promised reference implementation*, not in a roadmap. An alternative PEP is considered unlikely precisely because the active JIT drivers were all in PEP 836.

[`🔗 LWN — Python's experimental JIT to be removed`](https://lwn.net/SubscriberLink/1102102/0c00e4d550f25f8c/) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=50257419)

---

## 4. Adobe Commerce's 9.3 gets a KEV entry 105 days after the fix — and CISA's own SSVC flipped to "active" the same afternoon

- **Velocity:** ▮▮▮ trending
- **Source:** CISA KEV catalog / NVD / CVE record · published 2026-07-14 · KEV added 2026-10-27
- **Tags:** `cve` `adobe` `magento` `kev` `provenance`

**CVE-2026-48356** is a **CWE-434** unrestricted upload of a dangerous file type in Adobe Commerce, Commerce B2B, Magento Open Source and Commerce Events, at **CVSS 3.1 9.3** (`AV:N/AC:L/PR:N/UI:R/S:C/C:H/I:H/A:N`). The CNA record was reserved **2026-05-21**, published **2026-07-14**, and fixed in the **APSB26-73** July releases — `2.4.9-2026-jul`, `2.4.8-2026-jul`, `2.4.7-2026-jul`, `2.4.6-2026-jul`, `2.4.5-2026-jul`, `2.4.4-2026-jul` and the matching B2B and Magento Open Source builds. The affected ranges are stated as `lessThanOrEqual` against a comma-joined version string from `0`, so the record means "these branches through these points, plus every earlier release in each line." NVD marks it **Analyzed** and publishes its **own** 9.3 alongside Adobe's `psirt@adobe.com` 9.3 — the minority case where NVD scored the record rather than endorsing the CNA. CISA added it to **KEV on 2026-10-27**.

**Why it matters:** the ADP container answers "when did the exploitation assessment change," and it has a timestamp. CISA's Vulnrichment entry for this CVE now reads `Exploitation: active`, `Automatable: no`, `Technical Impact: total`, stamped **2026-10-27T19:53:15Z** — the same afternoon as the KEV add. That pairing is the checkable version of "newly exploited": an active SSVC verdict with a minute-resolution timestamp beside a KEV `dateAdded`. And the lag is the story for anyone who runs Magento: **105 days** from the fix (Jul 14) to KEV (Oct 27), which means a store that read July's quarterly patch notes as routine has been carrying a KEV-listed hole for a third of a year. Note `UI:R` and `S:C` together — the attacker needs a victim to visit a crafted URL, so this is an upload endpoint plus a lure, not a drive-by, and `Automatable: no` says the same thing from CISA's side.

[`🔗 CISA KEV catalog`](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) · [`🔗 NVD — CVE-2026-48356`](https://nvd.nist.gov/vuln/detail/CVE-2026-48356) · [`🔗 CVE.org — CVE-2026-48356`](https://www.cve.org/CVERecord?id=CVE-2026-48356)

---

## 5. The Classification of Finite Simple Groups is formalized in Lean — 43.1M lines, one commit, and errata still being compiled

- **Velocity:** ▮▮ rising
- **Source:** cfsg.axiommath.ai / AxiomMath GitHub / Hacker News · 101 pts · 25 comments · ~3.5h ago (~00:29 UTC+8 Oct 28)
- **Tags:** `lean4` `formal-methods` `mathematics` `proof-assistant` `verification`

**AxiomMath** has formalized the **Classification of Finite Simple Groups** — the multi-thousand-page theorem that classifies every finite simple group — as a **sorry-free Lean 4** proof on **v4.35.0-rc3**, built on Mathlib and TauCeti. The project's own numbers: **43.1M lines of Lean**, **2.05M declarations**, **100 milestones**, **139 works** in the source corpus and **715 papers/books** referenced. Every logical step is checked by Lean's kernel; a full build takes **under 24 hours**; it uses only the standard axioms `Classical.choice`, `propext` and `Quot.sound`, with no `native_decide`. The repository was created **2026-10-27T13:19Z**, is Apache-2.0, and at the time of writing holds **56 stars and one commit**.

**Why it matters:** the artifact and the announcement disagree in a way that is worth reading carefully. The repo README says "sorry-free" and identifies no remaining work; the project site still runs a **"What's left?"** section and a dashboard showing *Working / Just verified / Idle / In progress*, and says the team is "working with group theorists to compile the **errata**." That is not boilerplate — during the work they found **counterexamples to a closure claim in a published route to the Unbalanced Group Theorem** and had to substitute an argument built on Solomon's maximal 2-components and "preservation of simple tops." And the whole thing rests on TauCeti's statement that every finite simple group is isomorphic to one on an explicit classification list. So the honest description is: kernel-checked *relative to a stated list*, six gigabytes of proof arriving as a single squashed commit with no development history to inspect, following the first-generation proof, with errata still open. Extraordinary result, very young artifact.

[`🔗 AxiomMath — CFSG formalization`](https://cfsg.axiommath.ai/) · [`🔗 AxiomMath/CFSG`](https://github.com/AxiomMath/CFSG) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=50261647)

---

## 6. A judge found Anthropic's library was pirated — the Stanford Daily counts 10+ campus authors, and two opted out for a jury

- **Velocity:** ▮▮ rising
- **Source:** The Stanford Daily / Hacker News · 279 pts · 148 comments · ~4.5h ago (~23:28 UTC+8 Oct 27)
- **Tags:** `anthropic` `copyright` `litigation` `training-data` `policy`

In **Bartz v. Anthropic**, decided in **May 2026**, Judge **William Alsup** held that Anthropic improperly pirated books to build a permanent central library, while holding that training on **lawfully acquired** books is fair use — comparing AI training to how readers absorb a book's themes and style. The case settled for **$1.5 billion** covering authors and publishers of nearly **500,000 registered works**, roughly **$3,000 per work**. The Stanford Daily's count of campus authors runs past ten and names **Tobias Wolff, Abraham Verghese, Chang-Rae Lee, Daniel Mason, Hayagreeva Rao and Myra Strober**; Wolff says ten of his own works were used. Wolff and Lee **opted out** of the class and filed **Cruz v. Anthropic** in May 2026, seeking a jury trial and up to **$150,000 per infringed work**.

**Why it matters:** three things coverage tends to merge, and they price differently. The **$1.5B is a settlement**, not a damages award — it prices the class's aggregate claim, so it is not a per-work precedent. The **fair-use holding is conditional on lawful acquisition**, which is precisely why the pirated-library finding will be the cited sentence for years. And **Cruz is where the sourcing allegations actually go to trial**: the LibGen and PiLiMi claims, and the storage of pirated files, are allegations in that complaint, not findings in Bartz. The spread that matters is arithmetic — roughly **$3,000 per work** in the class versus up to **$150,000 per work** for an opt-out — a 50× difference that is the entire reason opting out was rational.

[`🔗 The Stanford Daily — Anthropic illegally trained Claude with Stanford professors' books`](https://stanforddaily.com/2026/10/27/professors-books-pirated-to-train-claude/) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=50260814)

---

## 7. Liquid AI's LFM3 puts six 2B models on one 1.7B base — and the license is LFM Open v1.0, not Apache

- **Velocity:** ▮▮ rising
- **Source:** liquid.ai blog / Hugging Face · 6 models live 2026-10-28
- **Tags:** `liquid-ai` `open-weights` `small-models` `multimodal` `licensing`

**LFM3** is a family of six models in the ~2B class, all derived from **LFM3-1.7B-Base**: text, vision, audio, omni, and two decision models built from the vision and omni variants. The architecture is 24 layers — **13 gated short convolutions, 5 sliding-window attention layers with a 256-token window, and 6 global-attention layers** — plus kernel size 7, head-wise gated attention, partial RoPE and sandwich normalization, on a 128K vocabulary trained over **22T pre-training tokens** and a **3.5T**-token mid-training stage. The text model carries **256K context**, fits in about **1 GB at 4-bit**, and can be fine-tuned on a single GPU. Liquid's own comparison table puts LFM3-1.7B at an average of **49.37** against LFM2.5-2.6B's **31.55**, MiniCPM5-2B's **39.19**, Gemma 4 E4B's **31.74**, Qwen3.5-4B's **39.27** and Qwen3.5-9B's **47.24** — "outperform our previous LFM2.5-2.6B while using 35% fewer parameters." The strong rows are tool-use and instruction-following: **BFCL V4 71.39**, **ToolSandbox 80.36**, **LiveClaw 45.60**, Claw-Eval pass^3 **51.40**, SWE-bench Verified **43.40**, RULER 128K **65.56**. On-device decoding is reported **1.8–2.8×** faster than the next model, and a 128K context needs **1.6 GB** of KV cache.

**Why it matters:** the caveats live on the model card, not the announcement, and there are two. First, the license is **LFM Open License v1.0** — the blog page states no license at all, so "open-weight" in the launch post is not "Apache." Second, the card says the model is "**not recommended for agentic coding or complex multi-step reasoning due to its small size**," which sits beside a Terminal-Bench 2.1 of **12.92**, GPQA Diamond **63.37**, and HLE **7.17** (13.90 with tools). The 49.37 average is bought by the tool-use and instruction rows; the same table names where the model does not go. All figures are vendor-reported, and Hugging Face lists **6,311 downloads and 110 likes** for LFM3-1.7B — real adoption, an order of magnitude below the hub's leaders.

[`🔗 Liquid AI — Introducing LFM3`](https://www.liquid.ai/blog/lfm3) · [`🔗 Hugging Face — LiquidAI/LFM3-1.7B`](https://huggingface.co/LiquidAI/LFM3-1.7B)

---

## 8. Microsoft's MAI-Image-2.7 takes #2 on Artificial Analysis — an editing-only preview with no price and no text-to-image

- **Velocity:** ▮▮ rising
- **Source:** microsoft.ai news · published 2026-10-27
- **Tags:** `microsoft` `image-editing` `leaderboard` `preview` `availability`

**MAI-Image-2.7** launched **2026-10-27** in preview as Microsoft's image **editing** model. Capabilities are restyling and relighting whole scenes, editing text and symbols while keeping them integrated, restoration and enhancement, and edits that require reasoning about objects, lighting and environment relationships. Microsoft's post claims **No. 3 on Arena's Edit board** — making Microsoft AI the No. 2 lab there — and **No. 2 on Artificial Analysis's image-editing leaderboard**, above GPT Image 2.5 Flare. It says the model improved over MAI-Image-2.6 on "**all 10 use cases and all 7 editing actions**," with its largest margin in scene and style at "**24 Elo ahead of the next-best model**." Access is **Arena, Artificial Analysis and MAI Playground**. Text-to-image generation is "**coming soon**."

**Why it matters:** the ranking is third-party blind voting and the post is careful to say so — no overall Elo of its own, no pricing, no GA date, no reference-image or resolution limits. That restraint is the right shape, but it also marks what this launch *is*: the first MAI image model with **no Microsoft Foundry deployment and no price**, against a 2.6 that is in Foundry at roughly **$0.039 per image**. An editing-only model behind a playground is a leaderboard entry, not a product, and the Elo gaps that get quoted are inside the noise band — a few points of blind-vote preference is not a capability ordering. The question to carry forward is whether it reaches Foundry before the next board update, because that is what turns the number into something a developer can act on.

[`🔗 Microsoft AI — MAI Image 2.7 debuts`](https://microsoft.ai/news/mai-image-2-7-debut/) · [`🔗 Artificial Analysis — image editing leaderboard`](https://artificialanalysis.ai/text-to-image/arena)

---

## 9. GoAhead loaded its CRL and never checked it — one of three TLS bugs, and neither CVE ID resolves in any registry

- **Velocity:** ▮▮ rising
- **Source:** FoxIO blog · published 2026-10-27
- **Tags:** `tls` `cve` `mtls` `embedded` `disclosure`

FoxIO's **Sébastien Féry** published three TLS-integration flaws in **GoAhead**, the embedded web server. **GOAHEAD-SA-2026-0006 / CVE-2026-115881** (**CVSS 9.1**): with the OpenSSL-compatible backend and mTLS configured against a CRL, "the CRL is loaded but CRL checking is never enabled," so **revoked client certificates are silently accepted** — GoAhead **3.4.5–6.1.0**, fixed in **6.1.1**. **GOAHEAD-SA-2026-0004 / CVE-2026-115884** (**7.4**): LibreSSL's legacy verifier reports an issuer error instead of a chain-too-long error and GoAhead tolerates it, so a client chain past the **10-certificate** limit is accepted — requires `VERIFY_PEER=1` and `VERIFY_ISSUER=0`, affects **LibreSSL 3.2.x or 3.3.2–3.3.6**, and LibreSSL builds may inherit the CRL defect too. **GOAHEAD-SA-2026-0005** (**5.9, no CVE**): on the mbedTLS backend, a buffer-length typo reduces the **2048-bit DH modulus to one byte** (`0xff`), leaving only **eight possible shared secrets**, so a passive observer can decrypt captured TLS 1.2 DHE_RSA sessions — GoAhead **4.0.2–6.1.0**, fixed in **6.1.1**.

**Why it matters:** checked first-hand at **2026-10-27T20:06Z**, **CVE-2026-115881** and **CVE-2026-115884** both return `{"error":"CVE_RECORD_DNE"}` from cveawg and `"totalResults": 0` from NVD. A vendor advisory carrying a 9.1, plus an identifier that no registry has published, is the parser problem running backwards: the advisory is the *only* record, and a scanner consuming CVE feeds sees nothing to match. The middle bug is a configuration conjunction rather than a default, which is why it is a 7.4 — but the third is the one to sit with. Eight possible shared secrets is not a defect you patch quietly; for anyone who terminated TLS 1.2 DHE on mbedTLS, captured traffic is decryptable, and the remedy is re-keying, not upgrading.

[`🔗 FoxIO — Choose your backend: three TLS bugs in GoAhead`](https://foxio.io/blog/choose-your-backend-three-tls-bugs-in-goahead) · [`🔗 NVD API — CVE-2026-115881 returns 0 results`](https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-115881)

---

## 10. Graphify turns a codebase into a knowledge graph — 136.8k stars, and every edge labelled EXTRACTED or INFERRED

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending (weekly #6) / repository · 7,183 stars this week
- **Tags:** `agent-skill` `knowledge-graph` `tree-sitter` `repo` `mcp`

**Graphify** turns a repository — code plus docs, SQL schemas, configs and PDFs — into a queryable knowledge graph, and it is explicit about what it is not: "**not a vector index**." Code is parsed locally with **tree-sitter** into an AST, and every edge is labelled either `EXTRACTED` or `INFERRED`, which is the design decision worth noticing — it lets a reader discard the model's guesses and keep only what the parser found. It ships as a `/graphify` skill for Claude Code, Cursor, Codex, Gemini CLI and GitHub Copilot (20+ assistants claimed) plus CLI commands `query`, `path` and `explain`, emitting `graph.json`, `graph.html` and `GRAPH_REPORT.md`. Roughly **40 languages**, plus docs, PDFs, images, audio/video, SQL schemas, Terraform and PostgreSQL. The repo has **136,863 stars**, **13,066 forks**, **2,625 commits**, dual **Apache-2.0 / MIT** licensing, PyPI package `graphifyy` (CLI still `graphify`), a `v8` branch, and a YC S26 badge.

**Why it matters:** the README's limitations section is more informative than its feature list, and three entries change how you would deploy it. Ambiguous extensions "may be parsed as the wrong language without failing," so symbols go missing **silently** — the failure mode of a graph is a missing edge, not an error. HTML export caps at **5,000 nodes**, with larger graphs falling back to an aggregated community view. Community labelling defaults to **100 communities per call**, and failed batches **keep hub-derived names rather than being split and retried** — a quality degradation that looks like a result. Switching to the `leiden` extra later reshuffles communities and forces relabelling, so that choice is load-bearing from day one. And one number to split: `open_issues_count` reads **1,627**, which is **719 issues + 908 pull requests** — two different backlogs, not one.

[`🔗 Graphify-Labs/graphify`](https://github.com/Graphify-Labs/graphify) · [`🔗 GitHub Trending — weekly`](https://github.com/trending?since=weekly)

---

## 11. Since our Oct 21 note on PHP2Shell: Wiz watched the exploit kits fail, and exposure fell 67% in six days

- **Velocity:** ▮▮ rising
- **Source:** Wiz blog / Hacker News · 168 pts · ~1d ago (~Oct 27)
- **Tags:** `php` `exploitation` `update` `kev` `remediation`

**This is an update to our October 21 coverage of PHP2Shell (CVE-2026-109618 / CVE-2026-109619).** Wiz's October 27 telemetry post reports "a limited number of exploitation attempts" across **nine IPv4 indicators**, and — the part worth keeping — **no successful end-to-end exploitation** in its own captures. Two variants of an open-source exploit kit were used: the legacy one failed because a **~12.6 MB** request exceeded an **8 MB** `post_max_size`, and the newer one reliably caused PHP memory exhaustion but **the memory-leak stage failed every time**, with no source ever sending the final stage. Other tools marketed under the PHP2Shell name did not target the PHP bugs at all — they used session poisoning plus an application LFI, and depended on a vulnerable endpoint such as `lfi_sink.php`. Wiz attributes the failures to PHP build differences, memory limits, heap layout, worker pinning, latency and timeouts — and notes that scans **did** succeed against a public honeypot running a favorable single-worker Apache `mod_php` setup. Remediation moved fast: daily distinct internet-exposed vulnerable machines down about **67%**, the share of exposed vulnerable machines on **PHP 7.3 or earlier** from **8.3% to 5.7%** over five days, organisations with at least one exposed instance down **47.9%**, and under **53%** of initially affected organisations still vulnerable one week after disclosure.

**Why it matters:** this is the rare exploitation report where the negative result is the finding. "No successful end-to-end exploitation" is *not* "not exploited" — CISA had already added PHP2Shell to **KEV on October 26** — but it does mean the public kits are build-sensitive, and every failure mode listed (`post_max_size`, memory limits, worker pinning, heap layout) is a **configuration accident**, not a defense anyone designed. The honeypot that did get hit was the one with a single-worker `mod_php`; that is the shape to worry about, because it is the shape a default install produces. Read the 67% as patching working rather than the threat receding — one week is not long enough to conclude either way.

[`🔗 Wiz — PHP2Shell: exploitation attempts and remediation trends`](https://www.wiz.io/blog/php2shell-exploitation-so-far) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=50259343)

---

## 12. Since our Oct 23 Brotli note: CISA put the decoder bug in KEV — the first statement about it that isn't a vendor's

- **Velocity:** ▮▮ rising
- **Source:** CISA KEV catalog / NVD · KEV added 2026-10-27
- **Tags:** `brotli` `cve` `kev` `update` `rce`

**An update to our October 23, 24 and 26 coverage of CVE-2026-111497.** CISA added the Brotli decoder flaw to **KEV on 2026-10-27** as the "**Google Brotli Unchecked Return Value Vulnerability**," with its own description: a missing return-value check "could let a remote unauthenticated attacker corrupt decoder memory, expose memory contents, cause a denial of service, or possibly execute code via a crafted compressed stream." Context as it stands: **Google** as CNA scores it **CVSS 4.0 9.2**; **Microsoft** rates .NET at **8.1**, calling exploitation "more likely"; **Red Hat** says public proofs-of-concept reliably crash but it has no reliable RCE. Disclosure was by **Node.js on October 21**; Microsoft shipped **out-of-band .NET patches on October 25** (8.0.33, 9.0.22, 10.0.14, 11.0.0-rc.3.26522.148); Palo Alto confirmed **PAN-OS** exposure on October 26.

**Why it matters:** until today the exploitation claim was vendor-dependent — ELLIO said it observed attempts against its deception network, while most advisories said none confirmed. A KEV entry is CISA certifying "reliable evidence" of in-the-wild exploitation, and that makes it the **first non-vendor statement** in the record. Keep the scores apart, because they have three scopes and are routinely averaged into one number: 9.2 is Google's v4.0 CNA score for the library, 8.1 is Microsoft's for .NET specifically, and Red Hat's "crashes reliably, no reliable RCE" is a claim about its own builds. The KEV entry depends on none of them. One artifact trap from the earlier items still applies: patched Node.js reportedly still reports `process.versions.brotli` as **1.2.0**, so the **release** is the only reliable signal that you are patched.

[`🔗 CISA KEV catalog`](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) · [`🔗 NVD — CVE-2026-111497`](https://nvd.nist.gov/vuln/detail/CVE-2026-111497)

---

## 13. Trajectory2Gym: a successful tool-use trajectory isn't automatically good training data — grounding it is worth 16.9–29.8 points

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.33568 / Hugging Face papers · 330 upvotes · dated 2026-10-27
- **Tags:** `tool-use` `agents` `rl` `training-data` `benchmark`

**Trajectory2Gym** starts from a claim most agent-training pipelines do not make: that a trajectory ending in success is not thereby good supervision. Successful runs "may underrepresent multi-step dependencies, or include actions that the agent could not justify from the information visible when deciding" — so the paper names two properties to optimize for, **compositional coverage** and **decision grounding**. The method builds executable interactions around weakly supported compositional structures, then derives supervision **only from grounded decisions** in the executions that actually occur; structural-support selection allocates training experience, and a parent-normalized SFT objective makes each *semantic interaction*, rather than each trajectory fragment, carry the training weight. Across **five Qwen3 model scales**, the equal-weight average over **Tau1, Tau2 and BFCL** rises by **16.9–29.8 percentage points**, with gains largest on stateful and multi-turn interactions.

**Why it matters:** the framing is the contribution. Treating "it worked" as insufficient *label quality* is the opposite of the usual scrape-and-filter pipeline, and the result pattern is the diagnostic: the gains concentrate exactly on stateful and multi-turn rows, which are the rows where a later decision depends on an earlier observation. An ungrounded trajectory teaches the model to skip that dependency, and a benchmark that only scores the endpoint cannot see the skip. One caveat to carry: the abstract states **no limitations section at all**, on a headline of up to 29.8 points — so the number is real but the failure modes are not published.

[`🔗 arXiv — Trajectory2Gym`](https://arxiv.org/abs/2610.33568) · [`🔗 Hugging Face — daily papers`](https://huggingface.co/papers)

---

## 14. The Continual Learning Exam: 600 levels, 17 harness–model pairs, and the best system completes 23.3% of tasks

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.33956 / Hugging Face papers · 43 upvotes · dated 2026-10-27
- **Tags:** `continual-learning` `benchmark` `agents` `evaluation` `harness`

**CLE (Continual Learning Exam)** argues that existing evaluations measure *isolated* task performance rather than gains from accumulated experience. The benchmark is **120 human-authored tasks** built with **50+ domain experts**, each structured as a five-level ladder — **600 levels** total — across **89 professional roles** and **12 occupational domains**. Agents must pass a level to unlock the next, and later levels **depend on experience from earlier ones**, with human-authored rubrics driving an evaluation agent. The study compares a single-submission setup against one that gives **diagnostic feedback after failure and permits one revision**, across **17 harness–model configurations** on frontier LLMs. Feedback plus revision produces a median improvement of **5.3 percentage points**. The strongest system passes **47.7%** of levels and completes **all five levels on just 23.3%** of tasks.

**Why it matters:** the ladder is what makes "continual" measurable at all. A single-submission score can be produced by a model that learns nothing within the task, so the interesting quantity is what a second attempt buys — and the answer, **+5.3 pp median**, is small enough to rule out "just retry" as the missing ingredient. **23.3% full completion** on 120 tasks also means the ceiling is nowhere near, which is what you want from a benchmark that is supposed to have headroom for another year. The paper is candid that the dataset could be used to post-train for continual learning: this is a measurement first and a training set second.

[`🔗 arXiv — Continual Learning Exam`](https://arxiv.org/abs/2610.33956) · [`🔗 Hugging Face — daily papers`](https://huggingface.co/papers)

---

## 15. Hurston-1: a 3B TTS fine-tuned on 190 hours so accents stop collapsing — and it admits the generic label scores 0.26 WER

- **Velocity:** ▮▮ rising
- **Source:** Hugging Face model card / Show HN · 66 pts · ~1d ago (~Oct 27)
- **Tags:** `tts` `speech` `open-weights` `accents` `telephony`

**Hurston-1** is a **3B** BF16 text-to-speech model from **Destined AI**, fine-tuned from **Maya1** with a rank-64 LoRA for **2,000 steps**, **Apache-2.0**. The training set is about **190 hours**: roughly **136 hours** of Destined's accented-English corpus (including ~10 hours of real calls with AI voice agents — 7,600 turns from 250 contributors), **~46 hours** of LibriTTS-R and **~10.5 hours** of Mozilla Common Voice. The accent classifier moves sharply against base Maya1: **Southern African 0.95 vs 0.60**, West African **0.84 vs 0.60**, East African **0.98 vs 0.81**, Nigerian **0.94 vs 0.82**. Everyday-sentence WER is **0.03** (base: 0.02), and on harder sentences falls from **0.145** for a single take to **0.062** with `--check`. Blind listeners preferred Hurston-1 **78%** of the time against **6%** for Maya1. An **NB-TTS** phone mode renders 8 kHz G.711 audio for telephony systems such as Twilio.

**Why it matters:** the limitations list is unusually specific and includes the one that undercuts the pitch — the generic "**African English accent**" label performs poorly at **WER 0.26**, so the gain comes from *per-accent labelled data*, not from accent modelling in general. That distinction decides the data strategy: this is a recipe for collecting labelled accent corpora, not a model that generalizes to accents nobody recorded. The operational caveats matter just as much for the telephony use case: **no consistent voice across calls** (each generation samples a new one, and long text can change voice between chunks), names/dates/amounts are the weakest areas, English only, no child voices. A voice agent that changes voice between chunks is acceptable for one-shot IVR prompts and wrong for a persona — and the card says so out loud.

[`🔗 Hugging Face — destined/hurston-1`](https://huggingface.co/destined/hurston-1) · [`🔗 Hacker News — Show HN`](https://news.ycombinator.com/show)

---

## 16. Rubric RL rewards coverage, so answers get longer and worse — FORK adds a precision objective and win rate goes 10.6% → 68.0%

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.33512 / Hugging Face papers · 27 upvotes · dated 2026-10-27
- **Tags:** `rl` `reward-hacking` `rubrics` `alignment` `evaluation`

**"Eat Your Precision"** names a mechanism rather than a symptom. Rubric-based RL typically rewards **how much of a rubric a response covers** — recall — which "encourages longer answers that include unnecessary or factually incorrect material," to the point where tuned outputs are **less preferred than the base model's**. The proposed **FORK reward** combines recall with a precision objective under which every part of a response must be both **necessary** (rubric-driven necessity credits) and **factually correct** (checked by a correctness grader). FORK outperforms existing rubric-based RL methods and reaches a Pareto-optimal balance between rubric coverage and response quality: it improves precision and shortens responses while maintaining coverage, and win rates against the base policy rise from **10.6% to 68.0%** on **RubricHub-Medical** and from **22.1% to 74.1%** on **HealthBench**.

**Why it matters:** the useful part is that the rubric is not the bug — coverage is a **one-sided proxy**, and RL reliably finds the cheap side of any one-sided proxy. That is why the fix is structural (make necessity a graded term in the reward) rather than a length penalty bolted on afterwards, which would suppress the symptom and leave the incentive intact. Two caveats worth stating at generation time: the abstract lists **no limitations**, and the win rates are measured **against the base policy**, not against a frontier model — so "Pareto-optimal" is a claim inside the authors' own comparison set, and the honest read is that FORK fixes a self-inflicted regression rather than beating a stronger baseline.

[`🔗 arXiv — Eat Your Precision`](https://arxiv.org/abs/2610.33512) · [`🔗 Hugging Face — daily papers`](https://huggingface.co/papers)

---

## 17. HiP3R stitches overlapping 3D-reconstruction chunks with a two-level pose graph — and its abstract reports no numbers

- **Velocity:** ▮ steady
- **Source:** arXiv 2610.31635 / Hugging Face papers · 387 upvotes · dated 2026-10-27
- **Tags:** `3d-reconstruction` `slam` `pose-graph` `video` `research`

Feed-forward 3D reconstruction works well on short windows, but long video has to be split into **overlapping chunks**, and each chunk comes back in its own coordinate frame with its own camera estimate — so naive concatenation produces inconsistent scale and duplicated cameras. **HiP3R** fixes this with a **two-stage hierarchical pose graph** and no extra training: stage one optimizes a robust **chunk-level Sim(3)** graph to establish global layout and scale; stage two holds that layout fixed and estimates **one shared SE(3) camera per frame**, turning overlapping window predictions into a single trajectory. It supports both chunk-based and streaming backends, and the paper reports improved camera trajectories and reconstruction across multiple benchmarks.

**Why it matters:** worth naming plainly that the **most-upvoted paper of the day reports no number in its abstract** — no dataset names, no ATE or PSNR deltas, no comparison table. This is a method whose ablations are cheap to run (Sim(3)-only versus the two-stage variant is one table), so the absence is a reason to open the PDF before quoting an improvement, not evidence that there isn't one. The decomposition itself is the right one, though: chunk-level for layout and scale, frame-level for camera pose, which is exactly where the two error sources live — global drift accumulates across chunks, while per-frame error is local and does not need to be re-solved globally.

[`🔗 arXiv — HiP3R`](https://arxiv.org/abs/2610.31635) · [`🔗 Hugging Face — daily papers`](https://huggingface.co/papers)

---

## 18. Gforth reaches 1.0 — and the release notes define what "stable" means: a list of words that will not move

- **Velocity:** ▮ steady
- **Source:** gforth.org NEWS / Hacker News · 139 pts · 12 comments · ~10h ago (~18:23 UTC+8 Oct 27)
- **Tags:** `forth` `gforth` `release` `embedded` `language`

**Gforth 1.0** has shipped, and the NEWS file is framed as "user-visible changes between **Gforth 0.7.x and 1.0**." For a Forth, the version number is a compatibility promise, and this one is written as prose rather than semver: 1.0 documents "which words are intended to be **permanently supported**, and which are not." The feature list is broader than a maintenance release suggests — a more capable text interpreter with new literal forms, vocabulary-qualified names, environment variables and extensible "recognizers"; IDE features including locating definitions and uses, browsable backtraces and editor integration; a "smart `.s`" stack display and a terminal status line; **multi-tasking across cores and hardware threads** with message queues, Cilk support, mutexes and atomics; an expanded C interface with callbacks; dictionary sections, closures, value/defer fields, user-defined `to` behaviour and a new word-header layout; and performance work in loop optimization and constant folding. Some words are no longer documented, with replacements recommended.

**Why it matters:** the permanent-support list is the actual deliverable here — for anyone embedding a Forth, "which words can I build on" is a harder question than "what's new," and answering it in the release notes is rarer than it should be. The multi-tasking section is the least Forth-shaped change in the file (message queues, Cilk, mutexes, atomics across hardware threads) and it is what makes Gforth 1.0 plausible as an **embedded runtime** rather than a teaching interpreter. One honest gap: the page states **no release date and no development duration**, so "after decades" is inference from the 0.7.x baseline, not something the artefact says.

[`🔗 Gforth 1.0 — NEWS`](https://gforth.org/manual/1.0/NEWS.html) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=50256952)

---

## 19. Spec-first puts a spec file between the prompt and the diff — and its own docs name the bypass

- **Velocity:** ▮ steady
- **Source:** spec-first.dev / Show HN · 19 pts · ~1d ago (~Oct 27)
- **Tags:** `agent-workflow` `coding-agents` `plugin` `methodology` `open-source`

**Spec-first** is an **MIT**-licensed method and toolkit that inserts a written, repository-stored spec between the prompt and the diff, shipping as a **Claude Code plugin** while the same files work for Codex, Cursor, Copilot or a terminal agent. Four commands: **`create-spec`** reads repo memory and code, then writes a goal, facts citing **file and line**, implementation steps and done criteria, creating a branch and worktree without writing code; **`review-spec`** runs a script that verifies every cited file and line exists, then has a **fresh agent with no chat history** review the spec against the code and return *build*, *build with cuts* or *refuse*; **`apply-spec`** implements the steps, writes the tests the spec names, and records non-obvious choices in a decisions file; **`deliver-spec`** passes the commit through a gate that runs declared build and test stages, then pushes and opens a PR with the spec attached. A separate **`deliver-series`** builds specs that share no files in parallel and merges them into one PR. Supporting machinery: `context.yaml` for resumable state, a `memory/` directory, per-spec decision logs, and a **ledger** recording which commits passed the gate.

**Why it matters:** the review step is the part worth copying — a citation-checking script plus a **context-free reviewer** are two independent checks on the same artifact, which is more than most "plan mode" implementations actually provide, because both of their checks run inside the same conversation that wrote the plan. The limitations are stated plainly, and one of them is the whole ballgame: the git hook gate **can be bypassed with `git commit --no-verify`**, and a commit with no ledger entry is treated as never having met the gate. So the **ledger**, not the hook, is the trust anchor — which means the method holds exactly as far as you trust the ledger's custody, and that is a property of where you run it, not of the plugin.

[`🔗 Spec-first — agentic development`](https://spec-first.dev/) · [`🔗 Hacker News — Show HN`](https://news.ycombinator.com/show)

---

## 20. NVIDIA's NeMo Agent Toolkit scores a 10.0 for missing authentication — and the fix shipped 47 days earlier

- **Velocity:** ▮▮▮ trending
- **Source:** NVIDIA product-security bulletin 5912 / NVD / GitHub · bulletin dated 2026-10-27
- **Tags:** `cve` `nvidia` `agent-infra` `authentication` `provenance`

**CVE-2026-65145** is a **CWE-306** missing authentication issue in **NVIDIA NeMo Agent Toolkit** at **CVSS 3.1 10.0** (`AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H`), affecting **1.0 through 1.8.0** and fixed in **1.9.0**. The same bulletin carries **CVE-2026-65151**, a **CWE-89** SQL injection at **8.4** (`AV:L/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H`), affecting **1.4 to 1.6** and fixed in **1.7.0**. Both were "found externally": **Colin McDonough of 50words.com**, and **YJK (@YJK0805) of ZUSO ART working with the TrendAI Zero Day Initiative** for the 10.0. The **NVIDIA/NeMo-Agent-Toolkit** repository is **Apache-2.0**, and its tracker counter reads **30 open — 15 issues and 15 pull requests**.

**Why it matters:** the two fixed versions are the story the top line hides. **1.9.0** shipped **2026-09-10T22:12Z**, so the 10.0 was patched **47 days** before the bulletin that describes it; **1.7.0** shipped **2026-05-21T18:15Z**, making the 8.4 SQL injection **158 days** old at disclosure. A single line telling operators to "update to 1.9.0 or later" is correct and still understates how long the SQL injection sat fixed-and-unannounced. Second: NVD shows this record at **Awaiting Analysis** with **zero NVD-scored metrics** — the 10.0 is NVIDIA's CNA number, not a second opinion — so the severity, the CWE and every downstream severity-band decision rest on one party. NVIDIA's own footnote applies: its "risk assessment is based on an average of risk across a diverse set of installed systems and might not represent the true risk to your local installation." A `S:C` 10.0 in an agent framework means the vulnerable component is not the security boundary — which is the same shape as the score, and the reason to check what actually fronts the toolkit before assuming the number is theoretical.

[`🔗 NVIDIA — Security Bulletin 5912: NeMo Agent Toolkit`](https://github.com/NVIDIA/product-security/blob/main/2026/5912/5912.md) · [`🔗 NVD — CVE-2026-65145`](https://nvd.nist.gov/vuln/detail/CVE-2026-65145) · [`🔗 NVIDIA/NeMo-Agent-Toolkit`](https://github.com/NVIDIA/NeMo-Agent-Toolkit)

---

## 21. Tailscale SSH gets four bulletins in one week — all fixed in 1.104.4, none with a CVE, and the changelog still says 1.104.2

- **Velocity:** ▮▮▮ trending
- **Source:** Tailscale security bulletins TS-2026-014–017 / Hacker News · 304 pts · ~1d ago (~Oct 27 19:55 UTC+8)
- **Tags:** `tailscale` `ssh` `privilege-escalation` `disclosure` `cve`

Tailscale published **four** security bulletins for **Tailscale SSH** and Serve, all fixed in **1.104.4 or newer**. **TS-2026-014**: the SSH server in the root-privileged `tailscaled` validated Unix socket paths **lexically** and then performed the operation **as root** — three bugs together (privileged dials via `ssh -L`, socket replacement via `ssh -R` unlinking root-owned sockets, and a TOCTOU race that defeats the allowlist because "the kernel re-resolves paths after the initial check"), with the Docker socket and the `tailscaled` local API as the reachable targets. **TS-2026-015**: unbounded memory growth from continuous window-change messages and environment-variable appends in a session, with allocations that "persisted even after the peer disconnected" — an OOM kill of `tailscaled` takes every Tailscale connection on the node with it. **TS-2026-016**: `tailscale serve` TCP forwards to Unix sockets "lacked a guard and dialed the target as root," plus a symlink guard that ran only on configuration reload instead of per dial — full node takeover through the local API. **TS-2026-017**: an HTTP/2 `serveHTTPContext` race where concurrent streams on one connection could bleed **Tailscale-App-Capabilities** across mounts. The umbrella advisory says "most of the Tailscale SSH issues we've identified concern privilege escalation," declines to recommend disabling Tailscale SSH wholesale, and offers `TS_SSH_DISABLE_FORWARDING=1` as the interim mitigation.

**Why it matters:** TS-2026-014 is the same shape as today's GoAhead item — *checked the string, acted as root* — and the third sub-bug is the one that generalises: a lexical allowlist plus a privileged syscall is a race, not a boundary, wherever it appears. The artifact split is the practical problem. None of the four bulletins carries a CVE ID (the bulletins index lists only **CVE-2022-41924**, **-41925** and **CVE-2023-28436**), so vulnerability feeds and scanners have nothing to key on. And the release page and the changelog disagree: `pkgs.tailscale.com/stable` carries `tailscale_1.104.4`, while the public changelog's newest client entry is still **v1.104.2 (Oct 21)** with no 1.104.4 row. So "am I patched" is a `tailscale version` question this week, not a release-notes question — and for anyone who allows SSH forwarding, disabling it is a config change you can make before the upgrade lands.

[`🔗 Tailscale — SSH investigation and remediation update`](https://tailscale.com/ssh-investigation-update) · [`🔗 Tailscale — security bulletins`](https://tailscale.com/security-bulletins) · [`🔗 pkgs.tailscale.com — stable packages`](https://pkgs.tailscale.com/stable/)

---

## 22. jackson-databind's 9.8 is an incomplete fix — June's patch validated the outer class and not the generic arguments

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub Advisory GHSA-m8xf-2cr7-77ph / NVD / OSV · advisory published 2026-10-20 · CVE record 2026-10-28
- **Tags:** `cve` `jackson` `deserialization` `java` `supply-chain`

**CVE-2026-110879** (**CWE-502**, **CVSS 3.1 9.8**, `AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H`) is a **PolymorphicTypeValidator bypass via generic type arguments and array element types**, and its own advisory calls it an "**incomplete fix for CVE-2026-54512**." `DatabindContext._resolveAndValidateGeneric()` checks the outer class against the declared base type, then validates each generic argument against the **outer base type** rather than its declared binding — so under the default `DefaultBaseTypeLimitingValidator`, "this accepts an unrelated class inside a generic subtype even when the same class is rejected as a direct type ID." When an `allowIfBaseType(...)` rule approves the outer type, Jackson substitutes `LaissezFaireSubTypeValidator` outright. The worked example: a property declared `Map<String,String>` accepts `HashMap<FileSystemXmlApplicationContext,String>`, and map-key discovery hands the attacker's JSON property name to that class's one-string constructor — which, with Spring on the classpath, loads attacker XML and calls `ProcessBuilder.start()`. Affected from **2.10.0**; patched in **2.18.12**, **2.21.8**, **2.22.4**, and for Jackson 3.x **3.1.8** and **3.2.4**.

**Why it matters:** the June advisory (GHSA-j3rv-43j4-c7qm, **8.1**, published **2026-06-23**) added generic-argument validation and scored 8.1; the replacement is 9.8 four months later, which is what an incomplete fix costs. The second thing is the registry state, checked first-hand: `api.github.com/advisories/GHSA-m8xf-2cr7-77ph` returns **404** while `github.com/FasterXML/jackson-databind/security/advisories/GHSA-m8xf-2cr7-77ph` renders normally, and **OSV's record for CVE-2026-110879 carries only `GIT` ranges** — no Maven range at all. So a Maven scanner asking "is `jackson-databind` 2.22.3 affected" has nothing to match unless the ecosystem advisory lands, even though the repo advisory has listed patched versions since **Oct 20**. The record itself is 8 days newer than the page that describes it.

[`🔗 GHSA-m8xf-2cr7-77ph — jackson-databind`](https://github.com/FasterXML/jackson-databind/security/advisories/GHSA-m8xf-2cr7-77ph) · [`🔗 NVD — CVE-2026-110879`](https://nvd.nist.gov/vuln/detail/CVE-2026-110879) · [`🔗 OSV — CVE-2026-110879`](https://api.osv.dev/v1/vulns/CVE-2026-110879)

---

## 23. Adobe's Campaign Classic bulletin prints 9.8 for a vector that computes to 10.0 — and all eight of its CVEs are Critical

- **Velocity:** ▮▮ rising
- **Source:** Adobe security bulletin APSB26-162 / NVD · published 2026-10-27
- **Tags:** `cve` `adobe` `cvss` `campaign` `provenance`

**APSB26-162** is a Priority 2 update for **Adobe Campaign Classic v7**, fixing **eight** CVEs, every one rated **Critical**: **CVE-2026-105781** SQL injection, **CVE-2026-104351** code injection, **CVE-2026-104353** OS command injection, **CVE-2026-105780** incorrect authorization, **CVE-2026-105489** SQL injection, **CVE-2026-104350** reflected XSS, **CVE-2026-104354** SQL injection and **CVE-2026-105779** SQL injection. Adobe says it is "not aware of any exploits in the wild for any of the issues addressed in this update." The affected range is **ACC v7 7.4.4 build 9402 and earlier**, and the fix is **7.4.4 build 9403** — a *build* increment inside an unchanged version string.

**Why it matters:** two checkable things, and one of them is arithmetic. Recomputing every vector in the bulletin with a first-pass CVSS 3.1 calculator, **seven of the eight reproduce exactly** (9.9, 9.9, 9.9, 9.9, 9.3, 9.1, 9.1) — and **CVE-2026-105781 does not**: Adobe prints "**CVSS base score: 9.8**" beside `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H`, which computes to **10.0**, and that is the number NVD also carries for the record. 9.8 is precisely what that same string yields if you drop the **`S:C`** scope change, so the page's number is the *unscoped* reading of its own vector. This is the "second number on a page" trap running in the vendor's direction rather than the aggregator's — and it is the only row where the whole bulletin's other seven are consistent, which is how you know it is a scoring slip and not a different revision. The second thing is operational: **7.4.4 build 9402** and **7.4.4 build 9403** are the same product version to every inventory tool that reads a version string, so "we're on 7.4.4" is not a patched statement — the build number is.

[`🔗 Adobe — APSB26-162: Security update for Campaign Classic`](https://www.adobe.com/trust/security/products/campaign/apsb26-162.html) · [`🔗 NVD — CVE-2026-105781`](https://nvd.nist.gov/vuln/detail/CVE-2026-105781)

---

## 24. llama.cpp's ggml-rpc writes 256 KiB into a 1-byte stack variable — and VulnCheck scores it 8.1 and 9.2 at once

- **Velocity:** ▮▮ rising
- **Source:** NVD / VulnCheck / ggml-org/llama.cpp · record published 2026-10-28T03:17Z
- **Tags:** `cve` `llama-cpp` `rdma` `memory-safety` `provenance`

**CVE-2026-118375** (**CWE-787**) is an out-of-bounds write in llama.cpp's **ggml-rpc RDMA transport**, in `rdma_recv()`. A peer that advertises RDMA capabilities in the HELLO message "can send up to **256 KiB** into a **1-byte** stack variable in `rpc_serve_client()`," crashing the server or potentially executing code. Affected **b8841 before b11865**; the fix is PR **#30399** (commit `9a0fde9`), shipped in build **b11865**, published **2026-10-24T19:30Z** — so the record is **3.3 days newer than the fix**.

**Why it matters:** the record carries **two metrics from one source** and they disagree by 1.1 points, which is exactly the case where "two scores" reads as "two scorers" if you only look at the slot. Both are **VulnCheck's**: **CVSS 3.1 `Primary` 8.1** (`AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:H`) and **CVSS 4.0 `Secondary` 9.2** (`AV:N/AC:L/AT:P/PR:N/UI:N/VC:H/VI:H/VA:H/SC:N/SI:N/SA:N`). The 3.1 number is 8.1 because of `AC:H`, the 4.0 number is 9.2 because of `AT:P` — one judgement written twice, and which one you see is a function of which field your scanner reads. The version range is the other trap: `b8841` and `b11865` are **nightly build tags**, not releases, so `pip`/`brew` version strings will not answer "am I patched." Anyone running `rpc-server` with RDMA enabled across a trust boundary should treat the transport as pre-auth reachable until the build number says otherwise.

[`🔗 NVD — CVE-2026-118375`](https://nvd.nist.gov/vuln/detail/CVE-2026-118375) · [`🔗 ggml-org/llama.cpp — fix PR #30399`](https://github.com/ggml-org/llama.cpp/pull/30399) · [`🔗 ggml-org/llama.cpp — release b11865`](https://github.com/ggml-org/llama.cpp/releases/tag/b11865)

---

## 25. MLflow's 9.8 imports the class you placed — and the fix shipped 20 days before the advisory

- **Velocity:** ▮▮ rising
- **Source:** GitHub Advisory GHSA-26p8-2jq9-3vq9 / NVD / MLflow releases · advisory published 2026-10-27T21:26Z
- **Tags:** `cve` `mlflow` `deserialization` `ai-platform` `rce`

**CVE-2026-116692** (**CWE-470**, **CWE-94**, **CVSS 3.1 9.8**) affects MLflow **from 3.12.0rc0 until 3.17.0**. The third-party scorer path in `mlflow/genai/scorers/base.py` "accepts request-selected **descendants** of `THIRD_PARTY_SCORER_ALLOWED_MODULES` rather than requiring an exact allowed module." The chain: a caller uses MLflow artifact endpoints to place a Python module beneath a writable allowed package, then submits its module and class through `/ajax-api/3.0/mlflow/scorer/invoke`, where `Scorer.model_validate_json()` imports and constructs it **before** trace processing. On an authentication-disabled deployment that needs no credentials; with basic auth it needs a principal that can create an experiment and run and upload artifacts. Either way "the allowed scorer package must be writable by the server process." Fixed in **3.17.0**, released **2026-10-07T08:24Z**.

**Why it matters:** the allow-list is a **prefix test**, not a membership test — "descendants of a module" is the same defect class as trusting an unenumerated subclass, and it is the third deserialization-by-allowlist bug in this feed's recent window. Read the three conditions carefully, because they are conjunctive and each one is a deployment fact rather than a code fact: auth disabled (or a low-privilege principal), an artifact-upload path, and a scorer package the server can write to. That is the shape of a developer's MLflow box and not the shape of a hardened one. The timeline is the other half: **20.5 days** passed between the fixed release and the advisory, so a pinned `3.17.0` was safe a month before its scanner said the CVE existed — and a pinned `3.16.x` was vulnerable the whole time with nothing in an advisory feed to say so.

[`🔗 GHSA-26p8-2jq9-3vq9 — MLflow`](https://github.com/mlflow/mlflow/security/advisories/GHSA-26p8-2jq9-3vq9) · [`🔗 NVD — CVE-2026-116692`](https://nvd.nist.gov/vuln/detail/CVE-2026-116692) · [`🔗 MLflow v3.17.0 release`](https://github.com/mlflow/mlflow/releases/tag/v3.17.0)

---

## 26. WatchGuard published 18 Fireware OS records in one batch — all CVSS 4.0, none of them 3.1

- **Velocity:** ▮ steady
- **Source:** WatchGuard PSIRT advisory board / NVD · records published 2026-10-27T16:17Z
- **Tags:** `cve` `watchguard` `firewall` `cvss` `provenance`

WatchGuard's CNA published **18 Fireware OS and Mobile VPN records** inside five seconds on **2026-10-27** (16:17:28Z–16:17:33Z), and **all 18 are still at `Received`** in NVD. Seven score **≥ 9.2**: **CVE-2026-103594** at **9.5** (stack overflow in WireGuard configuration processing), **CVE-2026-90465** at **9.4** (missing authentication in FireCluster Sync — "invoke privileged firewall management actions as root"), and five at **9.2** — **CVE-2026-112709** and **-112710** (heap overflow in the AD authentication service, pre-auth RCE), **CVE-2026-93857** (SIP proxy stack overflow, unauthenticated RCE), **CVE-2026-93865** (FireCluster sync daemon, missing authentication, reachable at the cluster management IP) and **CVE-2026-93866** (integer overflow in Access Portal WebSocket handling). FireCluster appears directly in **four** of them — three missing-authentication bugs plus an out-of-bounds read. The version ranges are wide and branch-shaped: **`2025.1 < 2026.4`** and **`12.0 < 12.12.4`**, with **T15/T35** hardware on its own `12.0 < 12.5.22` line.

**Why it matters:** the measurable fact is that **0 of the 18 carry a CVSS 3.1 metric** — every score is **CVSS 4.0**, and every 9.2 carries **`AT:P`** ("attack requirements: present"), which is how 4.0 encodes a precondition that 3.1 would express through `AC` or `PR`. Any pipeline that reads `cvssMetricV31` and nothing else sees eighteen unscored firewall CVEs on a device that terminates your internet. Cross-checking the same 18 against WatchGuard's own advisory board, **15 agree exactly and 3 do not**: **CVE-2026-103593** reads **9.1** on the board against **7.1** in the record, **CVE-2026-82332** reads **5.6** against **5.7**, and **CVE-2026-90465** reads **8.7** against **9.4** — which is the one that matters, because it is the difference between a "high" chip and a critical score. For what it is worth, 8.7 is exactly what that record's 4.0 vector yields if you read it under 3.1 with `S:U` rather than `SC:H`, so the split looks like two frameworks rather than two judgements — but the board publishes no vector, so that is arithmetic on my side, not WatchGuard's statement.

[`🔗 WatchGuard — PSIRT advisory board`](https://psirt.watchguard.com/) · [`🔗 NVD — CVE-2026-90465`](https://nvd.nist.gov/vuln/detail/CVE-2026-90465)

---

## 27. Heads of Security: one learned gate per attention head takes RL-Hammer from 97% to 10%

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.37657 / arXiv HTML · dated 2026-10-27 · 9 authors
- **Tags:** `prompt-injection` `security` `attention` `defense` `research`

**Heads of Security (HoS)** is a prompt-injection defence that "enforces instruction-data separation via a small set of learned per-head attention gates" — it learns how each head should redistribute attention between trusted and untrusted tokens, rather than retraining the model to ignore injected instructions. Evaluated on **Llama-3.3-70B-Instruct** and **GPT-OSS-20B** against **SecAlign++** (finetuning-based) and **ASIDE** (architectural). The numbers: the black-box **RL-Hammer** attack reaches **97% ASR** against GPT-OSS-20B and **85%** against SecAlign, but only **10%** against HoS; **Claudini**, a white-box attack "strengthened against HoS through autoresearch," needs **3× more FLOPs** to reach the same ASR. HoS preserves base-model utility on standard multiple-choice benchmarks where SecAlign and ASIDE degrade in few-shot settings, and ASIDE reaches only **10% utility** on tool use.

**Why it matters:** the 97→10 gap is on a **black-box** attack, which is the kind an outside attacker actually has, and it arrives from an architectural change rather than from more safety data — that is the claim worth testing against your own stack. But read the boundary of the result before quoting it: "on agentic benchmarks with **static** attacks, HoS and SecAlign perform similarly," so the large margin is on the injection suites and not on the agentic ones, and the paper's own framing is that both "substantially improve the security-utility trade-off over the base model" there. The residual **10%** is also not zero: a per-head gate is a learned component inside the threat model, and `Claudini` plus autoresearch is already the recipe for attacking it. Nine authors, including Imperial College's Yves-Alexandre de Montjoye — the affiliations are in the HTML full text, not the abstract page.

[`🔗 arXiv — Heads of Security`](https://arxiv.org/abs/2610.37657) · [`🔗 arXiv HTML full text — affiliations`](https://arxiv.org/html/2610.37657v1)

---

## 28. Scaling laws for tool-use agents: 458,752 tasks and 849 trained models say diversity beats volume

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.37648 / arXiv HTML · dated 2026-10-27 · 8 authors
- **Tags:** `tool-use` `agents` `scaling-laws` `synthetic-data` `training`

**SynthAPI** generates tool-use environments while "explicitly controlling the diversity of generated environments along the axes of **tools, tasks, and the databases** on which the tools operate." Varying those controls across **458,752 tasks** and **849 trained models of four different sizes** yields a scaling law that "predicts downstream tool-use agent generalization based on the scale and composition of the synthesized environments." The three findings: as data budgets grow, scaling **tool and database diversity** becomes more effective than increasing the number of tasks; increasing data **complexity** yields larger gains; and agents scaled on those rules "outperform models trained on data from prior work" across four evaluation benchmarks.

**Why it matters:** this converts "how much environment do I need" from a guess into a curve with a composition term, which is the first thing that makes synthetic agent data an engineering budget rather than a scrape. The caveat is what "diversity" means here: it is **combinatorial expansion along three API-surface axes the pipeline controls**, not distribution shift from real traffic — so the law predicts generalization *within* the SynthAPI family, and the paper's claim about beating prior work is measured on the same four benchmarks that family was tuned against. It is also, like most scaling-law papers, a result about *synthetic* tool use; the abstract gives no coefficient for the case where your production tools are the ones with the long tail.

[`🔗 arXiv — Scaling Laws for Tool-Use Agents`](https://arxiv.org/abs/2610.37648) · [`🔗 arXiv HTML full text`](https://arxiv.org/html/2610.37648v1)

---

## 29. None of the latent world models actually learns the dynamics — a new consistency metric says so

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.37588 / arXiv HTML · dated 2026-10-27 · 2 authors
- **Tags:** `world-models` `evaluation` `latent-dynamics` `equivariance` `research`

The paper introduces **faithful latent world models** as an *equivariance condition* between an environment's transition map and the learned latent dynamics, and proposes **latent rollout consistency (LRC)** to score action-conditioned latent prediction against it. The result is a negative for the class: "across the studied state of the art latent world models, **none** solves the task by actually faithfully modeling the dynamics of the environment." The authors' diagnosis of the field is about evaluation rather than architecture — current benchmarks "often emphasize task performance while providing limited insight into whether learned world models acquire predictive latent dynamics that reflect the underlying structure of the environment."

**Why it matters:** read this beside today's **Genie 4** item, because they are the same finding from two directions. DeepMind's own limitations list says visual details and object permanence "shift or drift over time," particularly after multiple edits or during navigation; LRC is a way to measure exactly that gap, and the answer it gives is that task success and faithful dynamics come apart. A model can produce a plausible rollout that satisfies a downstream reward without encoding the transition function — which is fine for pre-visualisation and disqualifying for planning. One caveat stated plainly: the abstract names **no models, no datasets and no LRC values**, so "none" is a claim about a set the abstract does not enumerate. Open the PDF before quoting a list or a score, and treat this as a measurement proposal whose first application is its own authors' negative result.

[`🔗 arXiv — Understanding the limits of latent world models`](https://arxiv.org/abs/2610.37588) · [`🔗 arXiv HTML full text`](https://arxiv.org/html/2610.37588v1)

---

## 30. Label-free RLVR collapse has a critical dataset size — and more problems make it worse

- **Velocity:** ▮ steady
- **Source:** arXiv 2610.37553 / arXiv HTML · dated 2026-10-27 · 1 author
- **Tags:** `rlvr` `reinforcement-learning` `collapse` `theory` `reasoning`

Label-free RLVR rewards a model for agreeing with its own majority vote. It "improves reasoning at first but eventually collapses: the self-assessed reward goes to one while accuracy falls, often until the model gives the same answer to every problem" — and, counter-intuitively, "the collapse appears only when training uses many problems." The paper explains the dataset-size dependence as a collective instability: per-problem sharpening slows by **1/N** for **N** training problems, while a **shared mode** grows at a rate proportional to **λ²**, independent of **N**, giving a critical problem count **N_c ≃ ln(1/δ)/(λ²G)**. Simulations confirm a sharp transition, **N_c ∝ λ⁻²** up to a logarithmic correction, "a single critical amplification **λ²NG** across couplings, confidence profiles and training variants," a logarithmic dependence on batch size, and **no collapse for confident initial models**. A kernel version identifies a protective coupling and a marginal-entropy bonus; in label-free RL of a small Transformer, "removing the shared direction prevents collapse entirely, restoring it causes collapse, and collapse grows with training-set size and base-model entropy."

**Why it matters:** the actionable inversion is that **scaling the problem set is the failure mode**, which is the opposite of the default instinct for a training-data bottleneck — and the mechanism says why: the shared mode is a property of a *distribution over problems*, so adding problems adds sharpening signal more slowly than it adds shared drift. The remedy it points at is structural (remove or penalise the shared direction) rather than a learning-rate tweak, and that is the part worth testing on a real run. It is a theory paper with one author and simulations on a small model, so the value is the falsifiable prediction — `N_c ∝ λ⁻²` with a measurable `λ²NG` — not a recipe.

[`🔗 arXiv — Collective Dynamics of Self-Reinforcement`](https://arxiv.org/abs/2610.37553) · [`🔗 arXiv HTML full text`](https://arxiv.org/html/2610.37553v1)

---

## 31. Anthropic's drug programmes: 35,000 antibody designs, 1,061 pages checked — and "mostly preclinical"

- **Velocity:** ▮▮ rising
- **Source:** Anthropic research blog / Hacker News · 242 pts · 238 comments · ~1d ago (~Oct 27 20:50 UTC+8)
- **Tags:** `anthropic` `life-sciences` `drug-discovery` `case-study` `research`

Anthropic's life sciences team published results from **six** partnerships — **BigHat Biosciences, Bristol Myers Squibb, Divergence Labs, Enveda, Generate Biomedicines** and **The Column Group** — plus its own discovery programmes after acquiring **Mithril Medicine**, a one-person company. The specific numbers, each with a partner technical report behind it: at **Generate**, six scientists used Claude Code to shorten part of a CAR-T construct and got a design **~70% shorter** that let immune cells make **~10×** as many receptors; at **Divergence**, Claude "largely autonomously, generated roughly **35,000** antibody designs in about a month," of which early tests found **3** IgE binders and **20** that dislodged IgE, **3** of those better than the standard medication; at **BigHat**, ~**1,010** variants in ~10 weeks produced leads that bound **>10×** more tightly, stayed in solution **18 °C** higher and clumped **>100×** more slowly — and Claude had also argued the standard heat-stability and clumping metrics were misleading, then proposed replacements the lab ran; at **Enveda**, across **1,061** pages Claude "caught all **11** issues that human reviewers had spotted—and flagged seven they'd missed," cutting review from over **25 hours** to under **3**, and drafted a regulatory document in **4 hours** against "about three months by hand."

**Why it matters:** these are lab measurements from named partners with published technical reports, which is the strongest form this class of claim can take — and the sentence to carry forward is the one in the post's own closing section: "All of this research is still at an early stage. In particular, so far it is **mostly preclinical**— that is, for the most part, it isn't yet at the stage where the drugs are being tested in humans." Two of the metrics need their denominators attached before they travel. "**11 of 11** caught" is a **recall** statement on one 1,061-page corpus with no false-positive count in the post, so it does not yet say what a reviewer would have to read past. And "**4 hours vs three months**" compares a first draft to a completed document — the post says the other draft went through human review that "found one minor error," which is the right disclosure and the reason the two figures are not a speedup ratio.

[`🔗 Anthropic — Early progress on accelerating drug development with Claude`](https://www.anthropic.com/research/early-progress-drug-development) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=50265609)

---

## 32. Survival LLM runs an AI and 930,000 Wikipedia articles with the internet off — and publishes its own 22-question test

- **Velocity:** ▮▮ rising
- **Source:** brangus.io / Hacker News · 385 pts · 148 comments · ~1d ago (~Oct 27 19:55 UTC+8)
- **Tags:** `local-first` `offline` `open-source` `retrieval` `emergency`

**Survival LLM** is a free, open-source app that runs a local model plus a local reference library on your own machine — set up while online, then fully offline, with "about **930,000** of Wikipedia's most-read articles" alongside WikiMed, MedlinePlus, UK Medicines A to Z, WikEM, Ready.gov, CDC travellers' health, US military medicine and survival manuals, wikiHow, iFixit, Appropedia and Stack Exchange Q&A. Every answer lists the articles it read with "the exact passage highlighted." It picks the model by available memory and publishes an accuracy row per tier: **≥128 GB Mac → NVIDIA Nemotron 3.5 Super (80 GB), 21/22**; **32–96 GB Mac → Qwen3.8 27B (18 GB), 21/22**; **≥32 GB Windows PC → Nemotron 3.5 Lightning (25 GB), 19/22**; **16–31 GB → IBM Granite 4.2 8B (6 GB), 14/22**. The library is a **9 GB** download (**19 GB** installed), or **1.3 GB / 3 GB** without Wikipedia and iFixit. Battery is stated too: "about **100 W** while it answers, for **5 to 40 seconds** per question."

**Why it matters:** the memory-tiered table with an accuracy number beside each tier is the most honest form "runs on your machine" can take, because it tells you what you are trading rather than implying there is no trade. Now read the footnote on those numbers: **22 questions** about blackouts and first aid, "graded blind, in our tests on an **earlier build** of the library," with "got the main point of official guidance right" as the criterion. Twenty-two items is a wide interval, the grader is the author, and the smallest tier is at **14/22** — so the table is a relative ordering, not a reliability figure. What actually carries the safety argument is the interface decision the page states in the same breath — "It can be wrong… Every answer shows the articles it used, so you can check" — and a citation-with-highlight is a mechanism you can audit, where an accuracy percentage is not.

[`🔗 Survival LLM`](https://www.brangus.io/survival-llm) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=50264853)

---

## 33. RuView: 100,544 stars for see-through-walls WiFi pose — and its own benchmark log records PCK@20 of 3.0%

- **Velocity:** ▮▮ rising
- **Source:** ruvnet/RuView / repository benchmark log / GitHub Trending · 100,544 stars
- **Tags:** `wifi-sensing` `csi` `pose-estimation` `benchmark` `repo`

**RuView** turns WiFi Channel State Information from low-cost **ESP32** sensors into presence detection, breathing and heart rate, activity recognition and "camera-free pose — estimate **17 body keypoints** from WiFi CSI," and ships Home Assistant, Matter, Apple Home, Google Home and Alexa integrations with **21 entities per node**. The repo has **100,544 stars**, **13,122 forks**, and a counter reading **497 open** that splits into **72 issues and 425 pull requests** — MIT, pushed today. Its own `docs/benchmarks/pose-estimation-cog.md` contains **one** measured run — **v0.0.1, 2026-05-19** — recording **PCK@20 of 3.0%**, **PCK@50 of 18.5%** and normalised **MPJPE 0.0931**, from **1,077 paired samples** taken in a single "30-min seated-at-desk recording" at average confidence **0.44**, trained for **2.1 seconds** with a **randomly initialised** encoder because "HF presence model is MLP `8→64→128`, incompatible with this Conv1d shape."

**Why it matters:** the repo's own acceptance gate is **ADR-079's PCK@20 ≥ 35%**, and the only published run is **3.0%** — an order of magnitude short, on one subject in one posture. The per-joint table explains its own best rows: the strongest signals are **r_hip** (25.0% PCK@20, **76.9%** PCK@50), **r_knee** (35.2%) and **r_shoulder** (19.9%), which "is consistent with the camera framing during data collection (operator's right side most consistently in frame)" — the model learned the side the camera saw, which is a label-leak signature, not a sensing result. The log also says "The remaining gap to ADR-079's PCK@20 ≥ 35% target is data-bound, not infra-bound," and the appliance smoke run recorded "**0 `pose.frame` events fired**" because no CSI source was connected. None of that makes the project dishonest — the log is unusually candid, and it is dated and append-only. It does mean the star count is not evidence for the pose claim: for the vitals and presence claims I could find no comparable measurement log, and the README's own note on the unified RF world model — "accuracy is still **synthetic** until real-data validation" — is the same caveat in a smaller font.

[`🔗 ruvnet/RuView`](https://github.com/ruvnet/RuView) · [`🔗 RuView — pose-estimation benchmark log`](https://github.com/ruvnet/RuView/blob/main/docs/benchmarks/pose-estimation-cog.md)

---

## 34. Moxnox 1.0: an NT-shaped POSIX OS on btrfs, 130,000 lines of C++, and it builds itself

- **Velocity:** ▮ steady
- **Source:** maharmstone/moxnox / Hacker News · 80 pts · 18 comments · ~1d ago (~Oct 27 23:53 UTC+8)
- **Tags:** `operating-system` `nt` `posix` `btrfs` `release`

**Moxnox v1.0** is a hobby operating system with an unusual pair of constraints. Its syscall design "is modelled after that of Windows NT," yet it "should be capable of running software written for Unix-like systems, **provided that they have been recompiled for it**," and it "comes with a full GNU base system." It is mature enough to be **self-hosting** — "you can build Moxnox on Moxnox" — and it runs on **btrfs**, on **amd64 and aarch64**, at "around **130,000 lines of C++**." v1.0 images for both architectures are published, with a documented QEMU invocation in the README. The repository was created **2026-10-22** and holds **147 stars** at index time.

**Why it matters:** the design bet is the interesting part — targeting the **syscall ABI** modelled on NT while requiring recompilation for POSIX software means compatibility is a source-level contract, not a binary one, which is why "recompiled" is in the README rather than buried in a FAQ. That is a very different proposition from Wine-shaped binary compatibility, and it is the reason a 130k-line OS can claim both. The caveat is stated by the author and deserves repeating verbatim: "The btrfs code works for basic purposes, but has not been **battle-hardened**. Please don't try to mount anything but throwaway filesystems." A filesystem implementation that has only ever met images you can regenerate is a data-loss risk, and the README says so on the same page as the feature list — which is the right order.

[`🔗 maharmstone/moxnox`](https://github.com/maharmstone/moxnox) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=50267569)

---

## 35. "Git for the US Code": replay 365 amendments, 361 reproduce exactly, and the four that don't are labelled

- **Velocity:** ▮ steady
- **Source:** Lexifina blog / Hacker News · 305 pts · 145 comments · ~1d ago (~Oct 28 01:47 UTC+8)
- **Tags:** `law` `version-control` `provenance` `data` `methodology`

Lexifina's write-up describes a version-control layer over the US Code with a validation method rather than a demo. For "each pair of release points from 2017 onward," they took the public laws enacted in between, "carried out their amending instructions on the older text in date order," and compared the result with the newer official release point: "Of **365** changes across the nine titles, **361** reproduced the next release point exactly," and "the other four are shown with a label saying how far they could be confirmed." Each change carries its law and effective date — **261** by enactment default, **72** by an effective-date note, **29** by a date in the amendment itself — and one change "depends on an agency determination that may never come, and we leave it out of the text rather than guess." The motivation is measured on models: a TUM study found one model answered **24%** of post-cutoff German-statute questions correctly on its own and **87%** when the relevant statutory text was retrieved, and in a second study, applying amending laws produced output "**93–99% similar**" to the official text while only "half of single amendments and a fifth of chains of amendments matched exactly," with experts finding "legally significant errors in the near misses."

**Why it matters:** replaying amendments and diffing against the next official release point is a ground truth that does not depend on trusting a model — that is the methodological contribution, and it is why the 4 failures can be labelled instead of dropped. A dataset that reports 361/365 and names the four is a different artifact from one that reports a percentage. The stated limits are the ones that matter for law rather than for software: "It does not yet show a later law's reach back on the earlier dates it covers, so for a case filed in the 2022 gap it shows the lower limit without warning that the June 2022 Act changed the answer," and effective-date notes "are read by pattern" with unusual wording falling back to the enactment date. Behind all of it sits a legal fact worth carrying: outside the titles Congress has enacted as positive law, the code is only **prima facie** evidence, and the Statutes at Large govern where the two differ — so a faithful reconstruction of the code is still not the source of law.

[`🔗 Lexifina — Git for the US Code`](https://lexifina.com/blog/git-for-the-us-code) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=50268380)

---

## 36. Expo ships 24 official agent skills — and the file splits them by who pays

- **Velocity:** ▮ steady
- **Source:** expo/skills / Expo docs · repository pushed 2026-10-28T11:10Z
- **Tags:** `agent-skill` `expo` `react-native` `marketplace` `repo`

**expo/skills** is the Expo team's official set of AI agent skills for building, deploying, upgrading and debugging Expo and React Native apps — **MIT**, **3,357 stars**, and pushed today. Its `skills.sh.json` manifest groups **24** skills into three buckets — a total counted from the manifest itself, since no page states it: **16** under "**Framework (open source)**" (UI, navigation, styling, data fetching, native modules, DOM, examples, SDK upgrades), **7** under "**Services & paid distribution**" — described as "skills whose core purpose uses paid Expo Application Services (EAS). Each one discloses costs and plan limits up front" — and **1** "**Experimental**", for "Expo APIs that are not finalized," which "graduate to the groups above when the underlying API stabilizes." Installation is per-harness: Claude Code via `claude plugin install expo@claude-plugins-official`, Codex via `codex plugin add expo@openai-curated`, and other agents via `npx skills@latest add expo/skills --skill '*'`.

**Why it matters:** the three-way split is the part worth copying. Separating *free framework knowledge* from *skills whose purpose is to drive a paid service*, and requiring the paid ones to disclose costs up front, is a commercial boundary written into the artifact instead of left to the reader — which is exactly what most vendor skill packs omit, and the omission is what makes them read as documentation rather than as routing. The README's framing is also right: "Expo documentation, Expo CLI, and EAS CLI remain the source of truth; these skills help agents apply them correctly," so the pack is a router rather than a second spec that can drift. The honest gap: the repo ships a `tests/` directory and an `eval-harness` entry at the root, and its README states **no evaluation result** — so "official" here means provenance, not measured accuracy.

[`🔗 expo/skills`](https://github.com/expo/skills) · [`🔗 expo/skills — skills.sh.json manifest`](https://github.com/expo/skills/blob/main/skills.sh.json) · [`🔗 Expo docs — Expo Skills for AI agents`](https://docs.expo.dev/skills/)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-10-28T12:23:59Z |
| Items | 36 |
| Sources tracked | 30 (Hacker News, GitHub Trending, GitHub API, Google DeepMind, ghostty.org, LWN.net, CISA KEV, NVD, cveawg, CVE.org, cfsg.axiommath.ai, The Stanford Daily, liquid.ai, Hugging Face, microsoft.ai, Artificial Analysis, FoxIO, Wiz, arXiv, NVIDIA product-security, Adobe trust center, GitHub Advisory Database, OSV, VulnCheck, Tailscale, WatchGuard PSIRT, Anthropic, brangus.io, lexifina.com, expo.dev) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[Previous day](2026-10-27.md) · [Raw .md](2026-10-28.md) · [Archive](../archive/)
