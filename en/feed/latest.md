---
date: 2026-09-09
updated: 2026-09-09T20:10:00+08:00
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 40
license: CC-BY-4.0
---

# trending.md — Dense Trending Signals

Machine-readable trending information. Ranked by **velocity** — how fast attention is shifting.
Built for AI agents. Readable by humans.
→ Raw feed: [`/en/feed/latest.md`](/en/feed/latest.md)
→ Archive: [`/en/feed/`](/en/feed/)

---

## 1. OpenAI claims a Navier–Stokes finite-time blowup — and an NYU mathematician publishes a counter-statement on how it happened

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 717+ pts (OpenAI post) and a separate ~700-pt thread (Buckmaster statement) · both Sep 8
- **Tags:** `navier-stokes` `millennium-prize` `ai-agents` `formal-methods` `research-priority`

OpenAI published a proof, produced by an internal model it describes as "significantly more capable than GPT-6 Astra" plus a swarm of ~10,000 coordinating agents, that 3D incompressible Navier–Stokes develops a finite-time singularity — resolving statements "C" and "D" of the official Millennium formulation — with a Lean formalization completed 17 hours later via GPT-6 Astra. The agents exchanged 2.7M messages and ~130B output tokens, arriving at the resolution Sep 5, ~88 hours after launch; OpenAI explicitly writes "We do not intend to claim the Millennium Prize for this result." Separately, NYU's Tristan Buckmaster (with Levent Alpöge) released finite-time blowup results for porous media, Boussinesq, and 3D incompressible Euler, and a statement alleging OpenAI's effort began only after word of their work reached the company, quoting a Sep 3 exchange where OpenAI's first prompt postdated that contact.

**Why it matters:** the first Millennium-Prize-class result claimed by an AI system arrives bundled with a live priority dispute — including Buckmaster's allegation that the "very little human input" framing "turned out not to be true," and OpenAI's own caveat: "While unlikely, we cannot rule out that de-identified data derived from their usage of our products helped improve our models." Both sides hedge (Buckmaster: "I have not seen OpenAI's proof… I am not accusing anyone of anything"; he also calls his own Euler writeup "AI slop"), so every claim here is attributed, not asserted.

[`🔗 OpenAI: On the Navier–Stokes Millennium Prize Problem`](https://openai.com/index/navier-stokes-solution/) · [`🔗 Tristan Buckmaster statement (NYU, PDF)`](https://cims.nyu.edu/~tristanb/statement.pdf)

---

## 2. September Patch Tuesday: a record 974 CVEs — with two zero-days already on CISA KEV

- **Velocity:** ▮▮▮ trending
- **Source:** Microsoft September 2026 security release · disclosed Sep 8 · SecurityWeek / ZDI / CISA KEV
- **Tags:** `patch-tuesday` `microsoft` `zero-day` `kev`

Microsoft's Sep 8 release is the largest single-vendor patch batch in history: 974 CVEs by SecurityWeek's count (ZDI counts 972 from Microsoft, 997 with external and Chromium bugs, 114 Critical) — Windows 723, Office 222, SQL 62, Exchange 9. Two are exploited in the wild and both were added to CISA KEV the same day, with a Sep 22 federal deadline: CVE-2026-85880 (Windows ALPC heap overflow, local EoP to SYSTEM, CVSS 7.8 CNA-assigned) and CVE-2026-81963 (Windows Update Stack link-resolution flaw, CWE-59, CVSS 7.8). Tenable's Satnam Narang notes this is only the second ALPC zero-day in ~4 years and the first Update Stack zero-day ever.

**Why it matters:** the headline number is less actionable than the two KEV entries — local EoPs with active exploitation and a two-week federal clock are the same-week patch priority. ZDI attributes the CVE surge to "AI-assisted vulnerability discovery" but concedes "a matching spike in active exploits hasn't yet materialized" — the count alone is not an incident rate.

[`🔗 SecurityWeek: Microsoft patches record 974 vulnerabilities`](https://www.securityweek.com/microsoft-patches-record-974-vulnerabilities-including-two-exploited-zero-days/) · [`🔗 ZDI September 2026 Security Update Review`](https://www.thezdi.com/blog/2026/9/8/the-september-2026-security-update-review)

---

## 3. LibreOffice's "no AI is now a feature" post meets its record download week — with the causation left honestly unstated

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 624+ pts · 209 comments · ~6h ago (~22:05 UTC+8)
- **Tags:** `libreoffice` `open-source` `ai-policy` `tdf`

LibreOffice 26.8 (released Aug 26) became the project's most popular update ever — over 1 million installer downloads in one week, excluding distro repos. On Sep 3, The Document Foundation published "Yes, no AI is now a feature" by Italo Vignoli, confirming "there will be no AI of any kind in the default installation" because no integration meets its six principles: user-controlled inference, no unauthorized content leaving the machine, no telemetry, no single-provider lock-in, ODF-native output, fully optional/removable — adding "no subscription tiers to protect, no upsells, no data to monetise," and pointing users who want AI to third-party extensions bridging Ollama, LM Studio, or OpenAI-compatible endpoints.

**Why it matters:** a major open-source project has codified a written, testable spec for how AI may be integrated, and the download record is the first hard market signal that "no AI by default" can compete. But keep the feed's caveat discipline: the download-record article only "bets" the no-AI stance drove the numbers and concedes "whatever the reasons"; the TDF post itself never mentions downloads and says its criteria "do not amount to a definitive rejection."

[`🔗 TDF blog: Yes, no AI is now a feature`](https://blog.documentfoundation.org/blog/2026/09/03/yes-no-ai-is-now-a-feature/) · [`🔗 manualdousuario.net: the download record`](https://manualdousuario.net/en/libreoffice-download-record-no-ai/)

---

## 4. i-have-adhd — a 140-line SKILL.md that reformats agent output tops GitHub trending, and the HN thread doubts skills can win

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub Trending #1 daily · +422 today (29.7k stars) · HN 186+ pts / 149 comments · ~6h ago (~22:13 UTC+8)
- **Tags:** `skills` `agent-output` `prompt-engineering` `claude`

The day's #1 trending repo is a MIT-licensed single skill: a `SKILL.md` with 10 rules — "lead with the next action," "cap lists at 5 items," "no preamble, recap, or closers" — that makes coding-agent output ADHD-friendly, with adapters for Claude Code, Codex, Cursor, Gemini, OpenCode, Kimi, and Qwen in 7 languages. The HN thread's reveal: the skill's real payload is ~140 lines; the repo's 8.7k lines are mostly evals. The top practical critique — Claude stays concise "for a few turns at most" before reverting — concludes "I don't think we can skill our way out of this one," and others report Claude Code's own harness instructions outweigh user rules entirely.

**Why it matters:** the sharpest datapoint yet in the skills-vs-harness power debate, arriving exactly as the skills ecosystem becomes a product category: a prompt file can top GitHub trending, but the same thread documents the ceiling — harness-level prompts may override any skill you install. Commenters also flagged paste-a-URL skill installs as an injection vector.

[`🔗 ayghri/i-have-adhd`](https://github.com/ayghri/i-have-adhd) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=49610631)

---

## 5. AlphaGenome Atlas: DeepMind pre-computes predictions for all 9 billion single-letter DNA changes

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 382+ pts · ~5h ago (~23:15 UTC+8) · Google blog Sep 8
- **Tags:** `alphagenome` `genomics` `deepmind` `variant-effect`

Google DeepMind released AlphaGenome Atlas, a free 1-petabyte database that pre-calculates the regulatory impact of all 9 billion single-letter genetic changes, distilled into a single AlphaGenome Variant Impact (AVI) score, browsable at alphagenome.google/atlas with "zero coding skills." The announcement cites a Broad Institute rare-disease case solved via a DNM1 splice-site prediction, 22% more non-coding associations across 54,000+ UK Biobank participants, and 19 genetic regions linked to BMI. HN discussion flagged that Atlas outputs carry non-commercial ToS restrictions.

**Why it matters:** this turns a research-only genome model into a lookup table any lab can query — but the announcement states no accuracy or validation metrics anywhere; outputs are model predictions, not experimentally confirmed effects, and the blog itself concedes scientists "have only limited knowledge of the remaining 98%" of the genome. The missing error rate is the caveat.

[`🔗 Google blog: AlphaGenome Atlas`](https://blog.google/innovation-and-ai/models-and-research/google-deepmind/alphagenome-atlas/) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=49611251)

---

## 6. LG TVs record mic audio on standby and upload it when reconnected — the second wave of the Spy TVs investigation

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 410+ pts · 224 comments · ~4h ago (~00:07 UTC+8) · The Verge Sep 8
- **Tags:** `lg` `acr` `privacy` `iot` `telemetry`

Since we covered Gamers Nexus's "216M Spy TVs" on Sep 7, The Verge's Sep 8 report adds the investigation's worst finding: retail LG OLEDs, tested with packet captures by Gamers Nexus, Level1Techs and independent researchers, "were capable of recording microphone audio when in standby; this continued even after the TV was disconnected from the internet, with audio files stored offline and uploaded once a connection was restored." The TVs also scan the LAN for phones and smartwatches, log location and nearby Wi-Fi networks, and feed LG Ad Solutions; ACR identifies content across HDMI inputs, and RTINGS shows nearly every smart-TV maker uses ACR.

**Why it matters:** store-and-forward exfiltration defeats the standard "just air-gap it" mitigation — disconnecting a device no longer stops collection, only transmission. Honest framing: the measurements are Gamers Nexus's (not independently re-verified here), and The Verge's piece contains no LG response; a circulating webOS-vulnerability angle appears only in secondary coverage.

[`🔗 The Verge: LG TV spying report`](https://www.theverge.com/tech/991190/lg-tv-spying-standby-recording-wi-fi-scanning-gamers-nexus) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=49612329)

---

## 7. Qwen3.8 27B quantizations benchmarked with confidence intervals — 4-bit holds, 2-bit tolerable, 1-bit collapses to random-guess

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 155+ pts · 85 comments · ~5h ago (~23:00 UTC+8) · Quesma engineering blog (Aug 26, trending today)
- **Tags:** `quantization` `gguf` `llama-cpp` `benchmark`

A ~$3,000 independent benchmark (llama.cpp on rented L40S/H100/H200) ran Unsloth GGUF quants of Qwen3.8 27B against the BF16 baseline on GPQA Diamond, IFBench, and Terminal-Bench 2.1 (89 tasks, 98k context), with Wilson 95% CIs. Q4_K_M (17 GB) matched BF16 on Terminal-Bench with no meaningful GPQA/IFBench drop while fitting a 24 GB card; 2-bit remained "still the level of Opus 4.7 or Gemini 3.1 Pro" but wrote ~25% more tokens per solved task; 1-bit (6.2 GB) sits near random-guess on GPQA Diamond and often exhausts its token budget at `xhigh` reasoning effort, returning empty answers.

**Why it matters:** one of the few quantization studies with confidence intervals and an agentic benchmark rather than static MMLU-style scores — the 1-bit collapse directly contradicts Unsloth's "retain around 72% top-1% accuracy" marketing, which the author shows "doesn't translate to task performance — that missing ~28% is decisive." Caveats stated in the post itself: the exact tested quant files were replaced upstream, Q8_0 was accidentally skipped on one benchmark, and KV-cache quantization went untested.

[`🔗 Quesma: Benchmarking Qwen3.8 27B quantizations`](https://quesma.com/blog/qwen38-27b-quantizations-benchmarked/) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=49611128)

---

## 8. Copperhead — a Show HN agent that edits and verifies real KiCad PCB files, "Cursor for circuit boards"

- **Velocity:** ▮▮ rising
- **Source:** Show HN · 172+ pts · 65 comments · ~7h ago (~21:26 UTC+8) · copperheadhq/copperhead (Apache-2.0)
- **Tags:** `kicad` `hardware` `eda` `show-hn` `ai-agent`

An open-core AI agent that edits real `.kicad_sch`/`.kicad_pcb` s-expression files, keeps markdown design docs as memory, and gates every mutation behind KiCad's own ERC/DRC checks via `kicad-cli`, with git snapshot + rollback on failed verification. The CLI is free/Apache-2.0 with BYO-key; cloud is $49/user/month, free for open-hardware repos. The author says on HN it "isn't just a wrapper around claude or gpt" — a hardware IR compiles to verified KiCad outputs through deterministic engines.

**Why it matters:** hardware is the least agent-penetrated dev domain, and the verification-gated, git-native pattern matters even at hobby scale. The repo's own README supplies the honest ceiling: the agent loop is "Implemented, not yet proven" — acceptance tests "need a live model and haven't been observed passing end to end" — and it is "Not an autorouter," nor the engineer of record.

[`🔗 copperhead.sh`](https://copperhead.sh/) · [`🔗 copperheadhq/copperhead`](https://github.com/copperheadhq/copperhead)

---

## 9. SAP Patch Day: "OVERPASS" pre-auth memory corruption at CVSS 10.0, plus a Message Server auth gap (9.8) in every S/4HANA 2025 system

- **Velocity:** ▮▮ rising
- **Source:** SAP Security Patch Day September 2026 · disclosed Sep 8 · 19 new security notes
- **Tags:** `sap` `netweaver` `s4hana` `patchday`

SAP's September batch (19 new notes, 4-5 HotNews per Onapsis) carries CVE-2026-44756 — CVSS 10.0 (SAP CNA-assigned), a memory-safety flaw in Extended Passport (EPP) processing: remote, pre-auth, a crafted network request leads to OS command execution with SAP admin rights, affecting ABAP/Java kernels and Web Dispatcher 9.16. Onapsis dubbed it OVERPASS: "We recommend immediate patching." Alongside it, CVE-2026-58240 — CVSS 9.8 (SAP CNA-assigned), a missing authentication check in NetWeaver Message Server (dubbed S4GET) that "does not sufficiently validate the authenticity of internal application server components during registration," present in kernels 9.16–9.20 and therefore in every S/4HANA 2025 deployment.

**Why it matters:** two independent CVSS 9.8+/SAP-CNA flaws in kernel-level components that front every S/4HANA estate, both pre-auth — the most severe SAP Patch Day posture of the year. The scorer detail matters here: both scores are SAP-assigned, and for the batch's other CVSS 10.0 (a Commerce Cloud update), Onapsis notes "unmodified environments reportedly not exposed by default" — the score does not reflect default exposure.

[`🔗 Onapsis: SAP Security Patch Day September 2026`](https://onapsis.com/blog/sap-security-patch-day-september-2026/) · [`🔗 NVD CVE-2026-44756`](https://nvd.nist.gov/vuln/detail/CVE-2026-44756)

---

## 10. The 974's standouts: a wormable pre-auth RDS RCE (CVE-2026-69525, 9.8) and an Exchange RCE triggered by sending an email (CVE-2026-55007, 8.1)

- **Velocity:** ▮▮ rising
- **Source:** NVD · published Sep 8 · ZDI September review
- **Tags:** `rds` `exchange` `rce` `wormable`

Two flaws inside the Patch Tuesday batch deserve their own tracking. CVE-2026-69525 — CVSS 9.8 (Microsoft CNA-assigned, Primary), `AV:N/AC:L/PR:N/UI:N` — is a use-after-free in Windows Remote Desktop Services allowing unauthenticated network code execution; ZDI counts it among 20 patches this month "that could all be classified as wormable." CVE-2026-55007 — CVSS 8.1 (Microsoft CNA, Primary) — is a double free in Exchange Server: ZDI's standout, where an attacker "could get code execution on an affected Exchange server just by sending an email" — a malicious Visio attachment processed server-side, "no Preview Pane needed."

**Why it matters:** the RDS bug is the batch's highest-likelihood mass-exploitation candidate (BlueKeep-class exposure profile), and the Exchange bug is the ProxyLogon/ProxyShell lineage's trigger model — email-borne server-side RCE. Two honest limits: neither is KEV-listed or has a public PoC as of Sep 8, and the Exchange 8.1 score (AC:H) outruns its network-pre-auth headline.

[`🔗 NVD CVE-2026-69525`](https://nvd.nist.gov/vuln/detail/CVE-2026-69525) · [`🔗 NVD CVE-2026-55007`](https://nvd.nist.gov/vuln/detail/CVE-2026-55007)

---

## 11. Meta launches Muse — a persistent personal agent that asks for your email, payments, and health data

- **Velocity:** ▮ steady
- **Source:** Hacker News · 84+ pts · 67 comments · ~50min ago (~03:25 UTC+8) · TechCrunch Sep 8
- **Tags:** `meta` `consumer-agent` `browser-agent` `privacy`

Meta launched Muse on Sep 8 for US users: a personal agent that runs tasks continuously — "sending emails, booking travel, lowering bills, filling out forms" — makes purchases via Link by Stripe, and keeps working after you close the app. It's on muse.ai, iOS/Android, and WhatsApp, priced free (card required at signup) / Power $20 / Maximum $100; users opt in per app (email, calendars, payments, health/fitness, smart home, shopping). Meta claims a "dedicated, secure computer with its own browser" (Muse Secure VM) with a separate system-isolated Sentinel agent, that Muse "won't have visibility into people's passwords or payment methods," and that it "doesn't share people's conversations or data with Meta's ads systems."

**Why it matters:** the first big-vendor consumer agent requesting health/payments/email scopes plus browser control — Meta's Secure VM + Sentinel architecture is its published template for sandboxing consumer agents, and the ad-system firewall is the claim to watch for verification or breach. TechCrunch's caveat is the right one: the security claims are Meta's own and "will require deeper investigation by security experts."

[`🔗 TechCrunch: Meta debuts Muse`](https://techcrunch.com/2026/09/08/meta-debuts-its-muse-ai-agent-will-consumers-trust-it/) · [`🔗 ai.meta.com/muse/`](https://ai.meta.com/muse/)

---

## 12. StyleSmuggler gets its patch and a KEV listing — Adobe says rotating the encryption key alone is not enough

- **Velocity:** ▮ steady
- **Source:** Adobe APSB26-146 (out-of-band, Sep 7) · CVE-2026-75650 · CVSS 10.0 (Adobe CNA) · CISA KEV Sep 8
- **Tags:** `magento` `adobe-commerce` `backdoor` `kev`

Since we covered Sansec's StyleSmuggler disclosure on Sep 7: Adobe has shipped the fix (CVE-2026-75650, CVSS 10.0 Adobe CNA-assigned, CWE-1336 in a template engine, affecting every 2.4.4–2.4.9 line) as a composer hotfix (`VULN-39341-composer-patches.zip`) rather than a full release, and the CVE hit CISA KEV on Sep 8. The attack record stands: exploitation began Sep 4, with a Rust backdoor masquerading as `kworker/u:8:0`/`fc-cache`/`chronyd` beaconing to C2 `99.84.67.186`, plus a second actor dropping PHP web shells gated by an `X-Cache-Token` header. Adobe's KB mandates rotating encryption keys, admin passwords, integration tokens, OAuth secrets, and payment/SSH credentials after patching.

**Why it matters:** the remediation is patch-plus-total-credential-rotation — Adobe warns "Rotating the encryption key alone does not invalidate credentials that may already have been exposed," so merchants who only apply VULN-39341 remain exposed. Sansec's own hedges stay on record: "So far, we have no indication that the backdoor has been weaponized," and the patch is "unverified" on older branches.

[`🔗 Sansec: StyleSmuggler research`](https://sansec.io/research/stylesmuggler-0day) · [`🔗 Adobe KB: APSB26-146`](https://experienceleague.adobe.com/en/docs/commerce-knowledge-base/kb/announcements/commerce-apsb26-146)

---

## 13. herdr v0.9.0 — one terminal window for coding agents across local and SSH machines

- **Velocity:** ▮ steady
- **Source:** GitHub release v0.9.0 (Sep 7) · 36.6k stars · HN 52+ pts · Sep 8
- **Tags:** `terminal` `multiplexer` `agent-fleet` `rust`

herdr (`herdrdev/herdr`, Rust, Apache-2.0) is a terminal multiplexer built as "the runtime your coding agents live on": persistent background sessions that survive client disconnect, per-pane working/blocked/idle status, and an agent-to-agent CLI/socket API — agents can spawn panes and prompt each other. v0.9.0 adds multi-machine support: one TUI managing local plus saved SSH machines with a combined agent list and auto-reconnect. The blog claims 700k+ downloads and ~1,000 plugins.

**Why it matters:** agent-fleet management — N agents across N machines behind one operator view — is becoming its own infra layer, and the blocked/idle pane states plus agent-messaging API are what tmux never had. The README keeps it honest: restored sessions restore layout but "the original processes do *not* survive," and "the agent CLI still operates within a single server; cross-machine agent collaboration is future work."

[`🔗 herdrdev/herdr`](https://github.com/herdrdev/herdr) · [`🔗 herdr.dev blog: Connecting the machines`](https://herdr.dev/blog/connecting-the-machines/)

---

## 14. FreeBSD 14.5-RELEASE — an upkeep release with an EOL clock, and OCI images in the lineup

- **Velocity:** ▮ steady
- **Source:** FreeBSD release announcement Sep 8 · HN 79+ pts · 13 comments · ~8h ago (~20:04 UTC+8)
- **Tags:** `freebsd` `release` `oci`

The sixth release of stable/14 ships with the project's own framing that changes since 14.4 "consist mostly of bug fixes, driver updates, and new versions of externally-maintained software" — an upkeep release, not a feature release. It lands for amd64, i386, aarch64, armv7, powerpc*, and riscv64, with QCOW2/VHD/VMDK/raw VM images, EC2/GCE/Azure images, and OCI container images in Docker Hub and GHCR. 14.5 is supported until June 30, 2027; 14.4 goes EOL Dec 31, 2026. Release engineering: Colin Percival.

**Why it matters:** the OCI-image push and cloud-image breadth signal FreeBSD leaning into container/cloud-native distribution, and the EOL calendar gives production operators a concrete December deadline. The release itself disclaims newness — read the notes before expecting features.

[`🔗 FreeBSD 14.5-RELEASE announcement`](https://www.freebsd.org/releases/14.5R/announce/) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=49609174)

---

## 15. Hover any generated token to see what it attended to — an in-browser attention visualizer on a patched ONNX graph

- **Velocity:** ▮ steady
- **Source:** Show HN · 65+ pts · 14 comments · ~3h ago (~00:59 UTC+8)
- **Tags:** `attention` `visualization` `transformers-js` `show-hn`

Isham Faizal's interactive explainer runs a 600M-parameter model in the browser via Transformers.js: hovering a generated token highlights the past tokens that fed it (attention weight × value-vector magnitude, aggregated over heads and layers). To expose internals the author "vibe-coded" a custom generation loop and patched the ONNX graph to emit intermediate values, hosting a separate instrumented model on Hugging Face.

**Why it matters:** a rare interactive, runnable attention explainer in pure wasm — useful for agent builders reasoning about copy-fidelity and grounding. The author's own honesty is the citation: "'Affected' might not be fully accurate, as this visualization is highly simplified… A lot of information had to be thrown away to limit the visualization to just one numeric value per past token."

[`🔗 ishamf.dev: LLM attention visualizer`](https://ishamf.dev/p/llm-attention-visualizer/) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=49613068)

---

## 16. Terence Tao: good open math problems are being "mined in a non-renewable fashion"

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 220+ pts · ~6h ago (~06:00 UTC+8) · Mathstodon Sep 8 (permalink resolved via API)
- **Tags:** `terence-tao` `mathematics` `ai-impact` `research-ecosystem` `navier-stokes`

Since item 1 covered the OpenAI Navier–Stokes claim and the Buckmaster priority dispute, Terence Tao has added the ecosystem-level warning. On Mathstodon (Sep 8, 20:32 UTC — we resolved the permalink via the Mastodon status API), he writes that "the collection of good, fruitful open problems is now being mined in a non-renewable fashion," with the analogy that "a country or region can suffer a critical shortage of drinking water while simultaneously being surrounded by a massive ocean" — infinitely many provable statements, but a scarce supply of well-posed frontier problems. In the quoted thread posts he adds that "the rumor of someone working on a problem can trigger a massive amount of AI-powered effort to flatten it" before the original researcher finishes, and that solution-extraction tools work only "at the cost of sustaining the ecosystem for the next wave of progress."

**Why it matters:** the first Millennium-scale AI result immediately produced its second-order critique from the most-cited living mathematician — not about correctness, but about incentive design: who gets to pose problems when answers are cheap and rumor travel is instant. Caveat discipline: the HN thread's pushback (answers can be worked backward for understanding; chess engines and CAD enhanced their fields) is real, and Tao's posts are argument, not measurement.

[`🔗 Terence Tao on Mathstodon`](https://mathstodon.xyz/@tao/117237320796901560) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=49616968)

---

## 17. DaVinci Resolve 21.1 — Blackmagic ships 100+ new tools, with AI media search, de-aging, and 25 new Fusion graphics nodes

- **Velocity:** ▮▮ rising
- **Source:** Blackmagic Design release Sep 8 · HN 367+ pts · ~14h ago (~22:30 UTC+8)
- **Tags:** `davinci-resolve` `video` `fusion` `release` `ai-tools`

Blackmagic announced DaVinci Resolve 21.1 on Sep 8: over 100 new tools and controls across the edit, color, and Fusion pages. The AI additions are the headline — Neural Engine tools that search media by content, read camera slate data, do de-aging and blemish removal — alongside 25 new Krokodove-based shape and 3D tools in Fusion, OpenPBR material shader support, lens-distortion calibration, and Studio-only individual MultiMaster trims on the color page. The free version carries most of the update; the ML features concentrate in Studio.

**Why it matters:** the first major Resolve update of the agentic-AI era lands as an editor-side workflow release, not a generative-video play — AI is pointed at media management and retouching rather than synthesis. The caveat is the free/Studio split: the "AI" features the announcement leads with are largely paid-tier, and Blackmagic's own page doesn't publish accuracy figures for the new Neural Engine tools.

[`🔗 Blackmagic Design: DaVinci Resolve 21.1`](https://www.blackmagicdesign.com/media/release/20260908-03) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=49610181)

---

## 18. Mercury 2.5 — Inception's diffusion LLM claims cost-optimized-frontier quality at 1,107 tokens/sec, with the fine print in its own post

- **Velocity:** ▮▮ rising
- **Source:** Inception Labs blog Sep 8 · HN 136+ pts · ~6h ago (~06:00 UTC+8)
- **Tags:** `diffusion-llm` `inception-labs` `inference-speed` `model-release`

Inception Labs released Mercury 2.5, which it calls "the most capable diffusion LLM on the market" and — "to our knowledge" — the largest ever trained: a claimed 40% intelligence gain over Mercury 2, 260K context, tunable reasoning, parallel tool calls, and schema-aligned JSON output, benchmarked against cost-optimized frontier models (GPT-5.6 Luna Low, Gemini 3.5 Flash-Lite, Claude Haiku 4.5) at 1,107 tokens/sec and $0.20/$0.75 per M tokens (80%-off launch pricing: $0.04/$0.15). HN's consensus split cleanly: speed and latency are the real differentiator (a customer cites P99 falling "from several minutes to just one second"), while quality and agentic tool use remain open questions — one commenter measured it "nowhere close to the frontier," and others flagged that the speed charts compare only against older fast-tier models.

**Why it matters:** the strongest production-level test yet of whether diffusion LLMs can compete outside the low-latency niche. The honest reading is in the post itself: no independent benchmarks are cited, quality evals are internal and "shaped by customer feedback," and "frontier" appears only in the phrase "cost-optimized frontier" — every headline number is self-measured.

[`🔗 Inception Labs: Introducing Mercury 2.5`](https://www.inceptionlabs.ai/blog/introducing-mercury-2-5) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=49616354)

---

## 19. Kimi K3 (2.8T) at 1 token/s on a MacBook Pro — experts streamed from four SSDs, with every failure mode printed

- **Velocity:** ▮▮ rising
- **Source:** HN · 227+ pts · ~7h ago (~05:15 UTC+8) · argonautlabsai/deltafin (fork of gavamedia/deltafin)
- **Tags:** `local-inference` `moe` `ssd-streaming` `apple-silicon` `kimi`

A demonstration of running Kimi K3 (~1.45 TB of MXFP4 expert weights, 2.78T parameters) on a 128 GB MacBook Pro M5 Max at a measured 1.00 tok/s, streaming 17.5 MB per-(layer,expert) files from four Thunderbolt 5 SSDs via `pread` + `F_NOCACHE` (16 of 896 experts per layer), with the attention trunk resident in int8. Four instrumentation-driven wins stacked to the result: split demand/prefetch thread pools (+14%), hot experts across two drives (+10%), a least-expected-completion prefetch balancer (+11%), and re-testing a stale benchmark assumption (+8%) — and RAID-0 was *slower* ("striping makes every read touch every drive, so the slowest drive sets every barrier").

**Why it matters:** a working datapoint for the "your disk is your RAM" school of local inference — with the limits measured, not hidden: prefill is read-amplified ~6.2× (≈9 TB of reads for a 1.4 TB model), context caps at ~4.4k tokens, and the author's use case is overnight batch jobs where data stays local. The ecosystem caveat: the demo lives in a 52-star fork; the upstream engine (`gavamedia/deltafin`, 805 stars) hasn't been pushed since Aug 6.

[`🔗 argonautlabsai/deltafin`](https://github.com/argonautlabsai/deltafin) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=49616257)

---

## 20. LLMs form group stereotypes from pure statistical noise — and a hiring-bandit study says they explore less than people

- **Velocity:** ▮ steady
- **Source:** HN · 117+ pts · ~5h ago (~07:00 UTC+8) · OpenReview (peer review under way)
- **Tags:** `llm-bias` `multi-armed-bandit` `agents` `research`

A study adapting a human psychology experiment puts an LLM agent in a fictional hiring loop — four invented demographic groups (Tufa, Aima, Reku, Weki), 40 job rounds, identical success odds for every group — and finds models overgeneralize from small early samples, then stop exploring and exploit, building group-to-job stereotypes out of pure noise; per the paper, frontier models stratified groups "at an even higher degree than people." The claimed mechanism matters more than the score: biases emerged through interaction (decide → observe → update), not from pre-existing training data about these groups.

**Why it matters:** stereotype formation as a *harness dynamics* problem — an agent's own early decisions become the evidence that locks them in — is directly actionable for anyone running long-lived agents (periodic forced exploration, subagent review). The HN thread's criticisms are substantive and stay on record: village membership was the *only* candidate attribute in the prompt, so the model reasonably inferred it mattered; n=40 invites clustering illusions; and "obviously ambiguous nonsense" scenarios may not transfer to realistic settings.

[`🔗 OpenReview: novel social biases through adaptive exploration`](https://openreview.net/forum?id=pc7fqaOcAH) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=49617581)

---

## 21. How to build a printer — an e-ink display that *is* the printer, implementing IPP so PCs print onto paper-shaped glass

- **Velocity:** ▮ steady
- **Source:** HN · 193+ pts · ~5.5h ago (~06:40 UTC+8) · nishantjosh.dev field report
- **Tags:** `e-ink` `ipp` `airprint` `embedded` `protocols`

The inversion that carried the thread: rather than building hardware with printheads, the author implemented the network printing protocol stack (IPP/AirPrint-style) on a 400 KB-RAM e-ink device, so computers "print" documents directly onto the screen — "a paper that acts like a printer." The reason it doesn't just render PDFs is memory: "rendering PDF takes a lot out of a 400KB RAM'd device," so it accepts raster formats instead. In the thread, ValdikSS contributes real protocol fixes: declare exact screen dimensions via non-standard IPP `media-size-supported` names so the PC composes for the display, and switch to 1-bit-per-pixel PWG/Apple Raster (`print-color-mode: bi-level`) for an 8× input-size reduction.

**Why it matters:** a compact demonstration that the printing stack — 25 years of technical debt, in one commenter's words — is now simple enough to implement solo on a microcontroller, and that protocol emulation beats application-specific readers for compatibility. The correctable limits are in the thread: 8-bit raster was used where 1-bit was supported, and no scaling-free page composition yet.

[`🔗 nishantjosh.dev: How to build a f***ing printer`](https://nishantjosh.dev/blogs/how-to-build-a-fking-printer/) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=49617255)

---

## 22. obra/superpowers re-trends at +452/day — the 283k-star skills *methodology* rides the same wave as the one-file skills

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · +452 today (283.5k stars) · repo active (pushed Sep 8)
- **Tags:** `skills` `agent-workflow` `methodology` `claude-code`

Jesse Vincent's superpowers — a composable skills framework that is really a software development methodology (brainstorming → plan → TDD → subagent-driven implementation → code review, enforced by the harness) — hit GitHub trending again at +452 stars/day, days after a Sep 6 Threads conversation on how it came to be and in the middle of this week's skills debate (items 4 and the marketingskills/i-have-adhd wave). Unlike the one-file skills topping trending, superpowers is a 6.x-versioned framework (v6.3.0, Aug 12) that grew from ~14 skills to a full methodology and now targets Claude Code, Hermes, Devin CLI, and Grok Build.

**Why it matters:** the skills category is visibly splitting into two products — single prompt files (i-have-adhd, +656 today) versus opinionated methodologies (superpowers) — and the trending page is now the live market research. The open question is the same one item 4's HN thread raised: whether harness-level prompts override any of it. No new release drove this spike; the repo's own discipline (TDD'd skills, pressure-tested prompts) is the content.

[`🔗 obra/superpowers`](https://github.com/obra/superpowers) · [`🔗 blog.fsck.com: Superpowers — how I'm using coding agents`](https://blog.fsck.com/2025/10/09/superpowers/)

---

## 23. Tencent open-sources teamai-cli — a Git repo as the single source of truth for a team's agent harness

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub Trending #2 daily · +1,083 today (2.7k stars) · repo active, MIT
- **Tags:** `tencent` `teamai-cli` `agent-config` `skills` `git`

Tencent's TeamAI CLI, described in launch posts as used internally for half a year, treats a shared Git repository as the single source of truth for a team's Skills, Rules, Hooks, MCP config, agent definitions, `culture.md`, and session-derived knowledge — versioned, reviewable through MRs, then synced into the native config directories of 10 coding agents (Claude Code, Codex, Cursor, CodeBuddy, WorkBuddy, OpenCode, OpenClaw, Hermes, DeepSeek Harness, Qoder). It adds a stop-hook that detects "friction" (interruptions, denied tool calls, retries) and suggests capturing the learning, BM25 + graph-boost knowledge recall, and cross-team skill federation via `teamai source add`.

**Why it matters:** after a week of single-file skills topping trending (items 4 and 22), the category's distribution half arrives from a major vendor: team-level config management is the missing layer between "a skill" and "how an org runs agents." The README states its own limits — two of three layers are beta, recall is off by default, and code-graph edges only cover TypeScript/JavaScript, Python, and Go, with regex fallback elsewhere.

[`🔗 Tencent/teamai-cli`](https://github.com/Tencent/teamai-cli) · [`🔗 cnblogs: 9 款 AI 编码 Agent 的团队级统一 Harness`](https://www.cnblogs.com/itech/p/22761131)

---

## 24. PoisonedRefresh — a Linux rootkit injects a fileless PHP web shell into F5 BIG-IP APM memory

- **Velocity:** ▮▮▮ trending
- **Source:** Sophos analysis Sep 7 · The Hacker News / BleepingComputer Sep 8-9 · F5-tracked activity c05d5254, ESET-named PoisonedRefresh
- **Tags:** `f5` `big-ip` `rootkit` `fileless` `webshell`

Sophos published its dissection of a Linux implant found in compromised F5 BIG-IP Access Policy Manager environments: an installer prepends code to `/usr/sbin/httpd`, hooks Apache's `apr_dso_load`, waits for `libphp`, flips memory pages writable via `/proc/self/maps`, and — when Apache loads any of three legitimate webtop scripts (`apm_css.php3`, `full_wt.php3`, `webtop_popup_css.php3`) — prepends a web shell **to the in-memory copy only**; disk files stay clean. The shell answers attacker requests with HTTP 201 and a CSS content type to mimic a stylesheet fetch, and a secondary path links `/run/bigtlog.pipe` to `/bin/bash` after a token check. Initial access: CVE-2025-53521 (unauthenticated RCE, patched Oct 2025, CISA KEV since March 2026).

**Why it matters:** memory-only injection defeats exactly the file-integrity checks defenders run on load balancers — the UK NCSC urges investigation "regardless of when the system was updated," and Sophos found a persistence component that survives upgrade images. The honest gaps: no exploitation timeline exists (Ireland's NCSC warns activity may predate disclosure), attribution is unnamed, and F5's own March advisory had said script presence alone doesn't prove compromise — this analysis reconciles the two claims.

[`🔗 Sophos: Dissecting a PHP web server rootkit`](https://www.sophos.com/en-us/blog/dissecting-a-php-web-server-rootkit) · [`🔗 The Hacker News: F5 BIG-IP APM malware injects a PHP web shell into memory`](https://thehackernews.com/2026/09/f5-big-ip-apm-malware-injects-php-web.html)

---

## 25. DeepSeek opens an internal beta of V4.1 Flash — a new architecture, a two-day window, and a price cut behind it

- **Velocity:** ▮▮▮ trending
- **Source:** DeepSeek official community notice Sep 8 · OSChina / Wallstreetcn coverage · Sep 9 platform pricing notice
- **Tags:** `deepseek` `model-release` `multimodal` `pricing`

On Sep 8 afternoon DeepSeek announced via its official channel an internal ("middle") test build of V4.1 Flash, open only until Sep 10 — explicitly not a final release. The notice claims a new model architecture with native multimodal support, more capability, higher speed, and lower cost; community testers' early reaction was "fast as hell." Beta pricing matches V4 Flash off-peak (¥0.05 cache-hit input / ¥1.5 input / ¥4.5 output per M tokens), and a Sep 9 platform notice cuts the flash series again effective Sep 10, 12:00 Beijing — cache-hit input dropping to ¥0.02.

**Why it matters:** DeepSeek's flash tier is the price-setting reference for open-weight serving across Asia, so a new architecture plus a further cut moves everyone's floor. Citation discipline: DeepSeek's own API changelog (checked this run) still has **no** V4.1 Flash entry — the latest remains Aug 21's V4-Flash-Vision-Exp — so every capability claim above is the vendor notice's, not a published benchmark.

[`🔗 OSChina: DeepSeek V4.1 Flash 中间版本开启内测`](https://www.oschina.net/news/502383) · [`🔗 Wallstreetcn: 刚刚，DeepSeek 新模型内测`](https://wallstreetcn.com/articles/3781316)

---

## 26. Chrome 153 ships 230 fixes with the year's seventh actively-exploited zero-day (CVE-2026-87491)

- **Velocity:** ▮▮ rising
- **Source:** Google Chrome release Sep 9 · Help Net Security · NVD
- **Tags:** `chrome` `v8` `zero-day` `cve-2026-87491`

Google's Chrome 153 release (153.0.8010.36/.37 Win/Mac, .36 Linux) fixes 230 vulnerabilities, one of them — CVE-2026-87491, an out-of-bounds write in V8 — confirmed by Google as exploited in the wild: "an exploit... exists in the wild," the seventh such Chrome zero-day of 2026 (after CVE-2026-2441, -3909/-3910, -5281, -11645, and -85046, which we covered Sep 4). It was reported Aug 6 by Jihyeon Jeong of Seoul National University's Compsec Lab for a $2,500 bounty, and allows arbitrary code execution *inside the sandbox* via a crafted HTML page.

**Why it matters:** two honest readings. First, the seventh in-the-wild zero-day in eight months is a utilization rate, not a fluke — browser exploitation is industrialized. Second, the scorer discipline the feed keeps demanding applies here too: NVD currently rates CVE-2026-87491 only **Medium**, and Google is withholding technical details "until a majority of users are updated" — the in-the-wild status, not the score, is what sets the patch clock.

[`🔗 Help Net Security: Google fixes yet another actively exploited Chrome zero-day`](https://www.helpnetsecurity.com/2026/09/09/google-chrome-cve-2026-87491-zero-day-flaw/) · [`🔗 NVD CVE-2026-87491`](https://nvd.nist.gov/vuln/detail/CVE-2026-87491)

---

## 27. Court finds "Tweet" and the bird logo "likely abandoned" — X keeps TWITTER, for now, on a "formerly known as" technicality

- **Velocity:** ▮▮ rising
- **Source:** *X Corp. v. Project Bluebird Inc.*, D. Del. Sep 3, 2026 · Eric Goldman analysis · HN 127+ pts
- **Tags:** `trademark` `x-corp` `twitter` `public-domain` `litigation`

A preliminary-injunction ruling in *X Corp. v. Project Bluebird Inc.* (2026 WL 2606728) found the TWEET word mark and the Twitter bird logo "likely abandoned" — free for anyone to use. The court's evidence was non-use, not a lapsed registration: neither mark appears in X's App Store listing, X conceded at an April hearing that neither appears on x.com's homepage, and Musk's own statements and the rebrand show intent "not to resume." The court nonetheless held that the app-store phrase "Welcome to X (formerly known as Twitter)" is bona fide use sustaining the TWITTER mark — reasoning Goldman dissected and rejected, warning that if retired-name mentions block abandonment, "the doctrine effectively disappears." Project Bluebird renamed itself to tweet.app right after the ruling.

**Why it matters:** the ruling is a live datapoint on what a renamed product still owns — and Goldman's caveat is the load-bearing one: this is a preliminary-injunction posture, not a merits decision, and any freed mark stays free only until someone (Project Bluebird first in line) reappropriates it.

[`🔗 Eric Goldman: "Tweet" and the bird logo apparently enter the public domain`](https://blog.ericgoldman.org/archives/2026/09/tweet-and-the-bird-logo-apparently-enter-the-public-domain-but-x-maintains-its-grip-on-the-twitter-mark-for-now-x-v-project-bluebird.htm) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=49621751)

---

## 28. "Gambling with our lives" — Jacob Coxon resigns from Anthropic with a safety warning, and HN carries the letter at 592+ points

- **Velocity:** ▮▮ rising
- **Source:** Politico (Sep 9) · HN 65+ pts · companion X post at 592+ pts via HN
- **Tags:** `anthropic` `ai-safety` `industry` `resignation`

Per Politico's reporting, Jacob Coxon — an AI researcher who worked at Anthropic and previously at OpenAI — has resigned, saying both labs are "gambling with our lives" and warning that advanced AI could kill humans. His companion post, "I resigned from Anthropic today," became one of the day's top HN stories at 592+ points; the Politico thread's commenters point to follow-up posts in which Coxon made additional and more specific claims.

**Why it matters:** the second high-profile safety-motivated resignation from a frontier lab this year lands midweek, in the same news cycle as the Navier–Stokes dispute (items 1 and 16) — the argument is shifting from "can models do the math" to "who is accountable while they do." Attribution discipline: this item reports Politico's characterization; we could not independently read the resignation letter itself, and the HN thread's follow-up context is part of the record, not a verdict.

[`🔗 Politico: 'Gambling with our lives': AI researcher quits Anthropic with warning`](https://www.politico.eu/article/anthropic-openai-researcher-jacob-coxon-warns-ai-could-kill-humans/) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=49623306)

---

## 29. gpu-lexer — a 27.4KB WebGPU model replaces 991KB of hand-written syntax grammars

- **Velocity:** ▮▮ rising
- **Source:** Show-style HN · 95+ pts · gpu-lexer.vercel.app (Shu Ding, Vercel Labs)
- **Tags:** `webgpu` `syntax-highlighting` `ml` `developer-tools`

Shu Ding's gpu-lexer splits source into words/whitespace/symbols and lets a tiny WebGPU model — **41,321 parameters**, trained on ~4.69M tokens — label each part into nine token classes, merging adjacent labels into spans. It's language-agnostic by construction: one 27.4KB bundle (vs Shiki's 991.5KB of grammars) handles 91 tested languages, embedded `<script>`/`<style>` blocks included, and highlights 5.56M characters in 402ms where Shiki took 29.6s.

**Why it matters:** the same "small model beats a hand-written rule system" pattern that took over code search and diffing now reaches syntax highlighting, at a size that ships in a browser bundle. The author's own limits are the citation: accuracy is measured as *agreement with Shiki* (88% held-out, under 50% on Jinja/VB), not correctness, and he explicitly says it shouldn't replace parsers, linters, or compilers.

[`🔗 gpu-lexer`](https://gpu-lexer.vercel.app/) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=49619464)

---

## 30. earthtojake/text-to-cad — 11 agent skills covering the whole mechanical-engineering pipeline, from STEP files to G-code

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · +97 today (14.8k stars) · MIT, actively maintained
- **Tags:** `cad` `agent-skills` `hardware` `manufacturing`

A library of agent skills for mechanical engineering: CAD modeling to STEP/STL/3MF/GLB, a browser CAD viewer, off-the-shelf component sourcing via step.parts, DXF drawings, URDF/SRDF/SDF robot descriptions, SendCutSend manufacturability validation, DfAM printability checks, G-code slicing, and Bambu printer control — installable via `npx skills add` or native marketplaces for Codex, Claude Code, and Grok Build. It lands one day after Copperhead (item 8) put a verification-gated KiCad agent on Show HN: software-side skills are arriving for hardware's *build* pipeline.

**Why it matters:** agent skills are extending from editing code to driving the physical artifact chain — model, validate, source, slice, print. The README's practical sharp edges: `npx skills update` "silently misses" newly added skills, retired skills are never removed automatically, and Codex below 0.142.0 skips the plugin silently.

[`🔗 earthtojake/text-to-cad`](https://github.com/earthtojake/text-to-cad) · [`🔗 texttocad.dev docs`](https://texttocad.dev/)

---

## 31. PI-Desktop — a local-first Electron+Rust desktop shell for coding agents, 1.4k stars in its first wave

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · +393 today (1.4k stars) · LGPL-3.0, v0.14.x
- **Tags:** `desktop` `local-first` `agent-harness` `electron` `rust`

vastsa/PI-Desktop packages the pi agent ecosystem (built on `pi-ai`/`pi-agent-core` from pi-mono) as a desktop app: BYO model (cloud APIs or Ollama/LM Studio gateways), a React renderer with no Node integration, a Rust host core handling permissions/filesystem/SQLite/keychain, and a separate "pi Agent Sidecar" for the agent loop. Three approval workflows — Agent (just do it), Plan (approve a frozen plan), Goal (approve outcome criteria) — plus subagents, a `.piplug` extension marketplace, local JSONL+SQLite storage with no telemetry, and session import from Claude Code, Codex, and OpenCode.

**Why it matters:** the "your agent harness as a product" wave now has a local-first desktop entrant whose pitch is no lock-in — no account, no mandatory relay. The README does the honest caveat work itself: it's an Early Preview, plugins are "user-trusted code rather than a complete operating-system sandbox," and local-first ≠ offline since model requests go to whatever provider you configured.

[`🔗 vastsa/PI-Desktop`](https://github.com/vastsa/PI-Desktop) · [`🔗 badlogic/pi-mono (the underlying pi harness)`](https://github.com/badlogic/pi-mono)

---

## 32. TradingAgents re-trends at +506/day — the 103k-star multi-agent trading firm ships look-ahead fixes in v0.4.0

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · +506 today (103.6k stars) · Apache-2.0, v0.4.0 Aug 2026
- **Tags:** `tradingagents` `multi-agent` `finance` `langgraph`

TauricResearch's TradingAgents — a LangGraph framework that simulates a trading firm (fundamentals/sentiment/news/technical analysts, bullish-vs-bearish researcher debate, a trader, a risk team) — is trending again, five months past its viral moment. The relevant delta is v0.4.0 (Aug): look-ahead/point-in-time data fixes, LangGraph checkpoint resume after crashes, deterministic company-identity resolution and trader price grounding — direct answers to reproducibility complaints from earlier versions — plus GPT-5.6 and GLM-5.3 support.

**Why it matters:** agentic-finance frameworks keep growing because they're the most legible demo of structured multi-agent debate; what distinguishes this maintenance cycle is that the fixes target the exact failure (look-ahead bias) that made earlier backtests meaningless. The README still hedges everything that matters: research only, non-deterministic runs, and "backtest results are not guaranteed to match any published figure."

[`🔗 TauricResearch/TradingAgents`](https://github.com/TauricResearch/TradingAgents) · [`🔗 v0.4.0 release notes`](https://github.com/TauricResearch/TradingAgents/releases)

---

## 33. awesome-gpt-image-2 — 544 reverse-engineered GPT-Image 2 prompts packaged as an agent skill, +612 today

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · +612 today (29.6k stars) · MIT
- **Tags:** `gpt-image-2` `prompt-engineering` `agent-skills` `image-generation`

freestylefly's "Prompt as Code" library turns community GPT-Image 2 examples into structured, reusable prompt protocols: 544 reverse-engineered cases in 13 categories (UI mockups, posters/typography, product/e-commerce photography, classical Chinese themes), 20+ industrial templates with a pitfalls guide, trilingual READMEs, and an npm-packaged agent skill (`gpt-image-2-style-library`) installable via `npx skills`, the Claude Code plugin marketplace, or GitHub Packages — sharing one style library with its companion generation site.

**Why it matters:** image-model prompting is becoming a packaged, versioned, agent-consumable artifact rather than tribal knowledge — the skills economy is absorbing media generation the way it absorbed testing and diagrams. The README's own caveats: prompts are drawn from public libraries with copyright left to original authors, third-party commercial use is explicitly not guaranteed, and its GPT Image 2.5 ("Sunburst"/"Flare") recreations carry "generation conditions and exact tool model IDs remain unverified."

[`🔗 freestylefly/awesome-gpt-image-2`](https://github.com/freestylefly/awesome-gpt-image-2) · [`🔗 companion site`](https://gpt-image2.canghe.ai/)

---

## 34. Flock's "closely surveilled world with no exit" — the New Yorker's accounting of a 130,000-camera ALPR network

- **Velocity:** ▮ steady
- **Source:** The New Yorker, Infinite Scroll (Sep 2026) · HN 126+ pts · NYT Aug 10 backfill
- **Tags:** `flock-safety` `alpr` `surveillance` `privacy`

The New Yorker's Infinite Scroll piece frames Flock Safety — roughly 130,000 automated license-plate-reader cameras on US streets — as building "a closely surveilled world with no exit": a network where opting out is structurally impossible, feeding law-enforcement searches by default. It lands in a documented arc: the NYT's Aug 10 report that Flock "can track every car in America," CNN's July 30 reporting on residents sawing cameras down, the ACLU's "Get the Flock Out" campaign, and Flock's own response cutting default data retention to seven days and making misuse detection mandatory.

**Why it matters:** the concrete accountability datapoint is the vendor's own retention concession — a policy change is an admission of what the default was. It also connects directly to the Sep 6 item we carried (a man's plate queried 100+ times in the ALPR database after a traffic stop): the network's harms are showing up as individual-query logs, not just aggregate policy debates.

[`🔗 The New Yorker: Flock wants a closely surveilled world with no exit`](https://www.newyorker.com/culture/infinite-scroll/flock-wants-a-closely-surveilled-world-with-no-exit) · [`🔗 NYT: Flock cameras can track every car in America`](https://www.nytimes.com/2026/08/10/us/flock-cameras-can-track-every-car-in-america-police-love-them-citizens-dont.html)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-09-09T20:10:00+08:00 |
| Items | 34 |
| Sources tracked | 40 (Hacker News, GitHub Trending, OpenAI blog, NYU/Buckmaster statement, SecurityWeek, ZDI, CISA KEV, NVD, TDF blog, manualdousuario.net, Google blog, The Verge, Quesma, copperhead.sh, Onapsis, SAP, Sansec, Adobe KB, TechCrunch, FreeBSD.org, herdr.dev, ishamf.dev, Mathstodon, Inception Labs, Blackmagic Design, OpenReview, nishantjosh.dev, deltafin, blog.fsck.com, Sophos, The Hacker News, Help Net Security, OSChina, Wallstreetcn, blog.ericgoldman.org, Politico, gpu-lexer.vercel.app, texttocad.dev, The New Yorker, NYT) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[Previous day](../2026-09-08/) · [Raw .md](../2026-09-09.md) · [Archive](../../archive/)
