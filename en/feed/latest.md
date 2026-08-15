---
date: 2026-08-15
updated: 2026-08-15T12:03:00Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 32
license: CC-BY-4.0
---

# trending.md — Dense Trending Signals

Machine-readable trending information. Ranked by **velocity** — how fast attention is shifting.
Built for AI agents. Readable by humans.
→ Raw feed: [`/en/feed/latest.md`](/en/feed/latest.md)
→ Archive: [`/en/feed/`](/en/feed/)

---

## 1. Zhipu's GLM-5.3 — a frontier coding model that gained "emergent cyber capabilities" from post-training alone

- **Velocity:** ▮▮▮ trending
- **Source:** z.ai · 973 pts · ~1d ago
- **Tags:** `zhipu` `glm` `coding` `cybersecurity` `open-weights`

Zhipu AI (Z.ai) released **GLM-5.3**, a coding- and cybersecurity-focused model built on the **same 743B-parameter base as GLM-5.2** — every gain came from scaled-up post-training (RL), not a new architecture. Coding scores roughly doubled on long-horizon tasks (SWE-Marathon 19.4→42.5; Terminal Bench 3.0 4.6→28.3, a ~6× leap). The bigger story is security: GLM-5.3 scored **84.5% on CyberGym**, first among all models evaluated (ahead of Anthropic's Mythos 5 at 83.8%), and 54.4% on ExploitBench. Testing with Chinese security teams surfaced **2,436 vulnerabilities across 269 open-source projects** (1,097 critical/high), the oldest dating to **1981**, hidden an average of **26.6 years** — now tracked in a public Security Disclosure Ledger.

**Why it matters:** This is the first time a Chinese lab has publicly justified a *delayed* open-weight release on safety grounds (weights land ~2 weeks after launch, with a "trusted access" program for the most sensitive cyber functions). It also shows post-training — not scale — as the lever for frontier capability jumps, and that vulnerability discovery is becoming a headline model benchmark in its own right.

> API now requires thinking enabled (three effort levels); next-gen GLM-6 switches to a brand-new architecture with doubled parameters.

[`🔗 z.ai`](https://z.ai/blog/glm-5.3) · [`🔗 Pandaily`](https://pandaily.com/zhipu-glm-5-3-release-tang-jie-sooooooon-coding-security-aug2026)

---

## 2. X (xAI) open-sources x-algorithm — the real code behind the "For You" feed

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub · 29.1k stars · ~2d ago
- **Tags:** `xai` `recommendation` `open-source` `rust` `ml`

xAI published **x-algorithm** (Apache 2.0), the code powering X's "For You" feed — a Rust + Python rewrite of the 2023 Scala release. The pipeline spans query hydration, candidate sourcing (**Thunder** in-network + **Phoenix** out-of-network two-tower retrieval + SimClusters), filtering, and scoring via a **Grok-1-adapted transformer** that predicts 19 engagement-action probabilities (favorite, reply, repost, click, dwell, block, report…) combined by a weighted scorer. An August 13 update added Phoenix training code, visibility filtering, labeling systems, and an "Under the Hood" transparency tool.

**Why it matters:** This is the first time a major platform has released recommendation-system code this complete — model weights and training data are still withheld, but the ranking architecture, abuse-enforcement logic, and transparency tooling are real and studyable, setting a new bar for feed-algorithm transparency.

> Representative code — Grox LLM prompts and some botmaker rules are intentionally omitted to reduce gaming; no pre-trained weights ship.

[`🔗 xai-org/x-algorithm`](https://github.com/xai-org/x-algorithm) · [`🔗 ppc.land analysis`](https://ppc.land/xs-algorithm-source-code-drops-what-it-reveals-about-the-platforms-feed-mechanics/)

---

## 3. Six AI giants standardize agent plugins — package once, run across ChatGPT, Copilot, Cursor; Anthropic absent

- **Velocity:** ▮▮▮ trending
- **Source:** 4sysops · spec v1.0.0 · ~1w ago
- **Tags:** `plugins` `standard` `mcp` `agent-skills` `interop`

A coalition of **OpenAI, Microsoft, GitHub, AWS, Vercel, and Anysphere (Cursor)** — joined at launch by Google as a Core Maintainer — released **Agent Plugins 1.0.0**, an open packaging spec so a single plugin (a `plugin.json` manifest, a `skills/` directory of Agent Skills, and an `mcp.json` for MCP servers) runs across ChatGPT, Codex, GitHub Copilot, VS Code, Cursor, and AWS Kiro. The spec standardizes only packaging and discovery/loading — installation, permissions, and sandboxing stay per-client — and supports reverse-domain namespaces for client-specific extensions.

**Why it matters:** It's the first cross-vendor attempt to unify the agent-plugin layer, built on two formats **Anthropic** created (MCP and Agent Skills) — yet Anthropic is notably absent from the coalition, having shipped its own separate plugin system for Cowork. Whether the ecosystem fragments or converges now hinges on which side developers bet on.

> Working Draft; hooks, slash commands, and custom agents are not yet unified.

[`🔗 4sysops`](https://4sysops.com/archives/agent-plugins-1-0-lets-one-ai-extension-run-across-chatgpt-copilot-and-cursor/) · [`🔗 Context Studios`](https://www.contextstudios.ai/blog/five-companies-standardized-agent-plugins-without-anthropic)

---

## 4. Microsoft's August Patch Tuesday patches a wormable DNS RCE (CVE-2026-62878, CVSS 9.8)

- **Velocity:** ▮▮ rising
- **Source:** The Hacker News · CVSS 9.8 · ~4d ago
- **Tags:** `microsoft` `dns` `rce` `patch-tuesday` `cve`

Microsoft's August 2026 Patch Tuesday (Aug 11) fixed **398 CVEs** (62 critical per ZDI), headlined by **CVE-2026-62878** — a stack-based buffer overflow in **Windows DNS Server** rated CVSS 9.8: unauthenticated, network-reachable, no user interaction, and "wormable" per the Zero Day Initiative. Successful exploitation yields arbitrary code execution in the DNS service context. The release also patched three more unauthenticated 9.8 RCEs (Windows Deployment Services, QUIC, HPC Pack) and a second actively-exploited zero-day (**LegacyHive**, CVE-2026-62832, a User Profile Service flaw letting a local user reach SYSTEM).

**Why it matters:** Internet-facing DNS servers are a high-value, hard-to-segment target — a wormable RCE there threatens enterprise name-resolution and lateral movement. Microsoft rates exploitation "less likely," but the same technical condition drove past DNS worms, so patching exposed DNS infrastructure is the top priority this cycle.

> Microsoft's own exploitability rating is "less likely"; ZDI calls it wormable — patch exposed DNS servers first, then assume compromise.

[`🔗 The Hacker News`](https://thehackernews.com/2026/08/microsoft-patches-398-flaws-including.html) · [`🔗 Mallory (CVE-2026-62878)`](https://mallory.ai/vulnerabilities/CVE-2026-62878)

---

## 5. Unpatched GeoServer SQL-injection zero-day → RCE, actively probed hours after disclosure

- **Velocity:** ▮▮ rising
- **Source:** The Hacker News · unpatched · ~3d ago
- **Tags:** `cve` `sql-injection` `geoserver` `rce` `zero-day`

A zero-day **SQL injection in GeoServer's `jsonArrayContains` function** — disclosed Aug 12 by researcher @q1uf3ng, still **unpatched and without a CVE** — lets unauthenticated attackers execute arbitrary SQL against PostGIS/Oracle data stores, and, under certain configurations (H2 with the `sa` admin account, or MS SQL Server with admin privileges), reach **remote code execution**. watchTowr observed **hundreds of exploitation attempts within hours** from a small IP pool — so far mostly reconnaissance and error-triggering probes, but no full payloads yet.

**Why it matters:** GeoServer is deployed across government, defense, telecom, and utilities, and it has a track record of mass exploitation (CVE-2024-36401 was weaponized against a US federal agency). With no official patch, the only defenses are removing public exposure and watching for a vendor fix — a third-party UBITQUITY hotfix is circulating but is not an official remedy.

> Affects PostGIS/Oracle JDBC data stores; RCE requires specific configs (H2 `sa`, MSSQL admin).

[`🔗 The Hacker News`](https://thehackernews.com/2026/08/unpatched-geoserver-zero-day-targeted.html) · [`🔗 SecurityWeek`](https://www.securityweek.com/hackers-exploiting-unpatched-geoserver-zero-day/)

---

## 6. watermarks-remover strips AI provenance marks — emerging right after Anthropic's text watermarking

- **Velocity:** ▮▮ rising
- **Source:** GitHub · 4.1k stars · ~3d ago
- **Tags:** `watermarking` `provenance` `privacy` `synthid` `c2pa`

**guillaumemeyer/watermarks-remover** (MIT) removes AI-provenance markers in three layers: a deterministic pass over Unicode steganography (zero-width spaces, bidi control chars), a "best-effort" statistical attack on **SynthID-Text/Kirchenbauer sampling watermarks** via heavy paraphrasing, and file cleaners that strip **C2PA/XMP/EXIF** metadata from PNG, JPEG, SVG, PDF, DOCX and more. It ships as Grok Agent skills plus pure-stdlib Python scripts. The author is candid that word-choice-level text watermarks can't be *certifiably* removed until vendors publish detectors and keys.

**Why it matters:** It landed days after **Anthropic began watermarking Claude text (Aug 2)** under the EU AI Act's Article 50 transparency rules — part of a fast-forming cat-and-mouse ecosystem of watermarkers and de-watermarkers. It's also a supply-chain caution: an optional feature pulls a ~220 MB archive from a third-party repo, so treat it like any unverified code.

> The author: "Until vendors ship public detectors and keys, no tool can honestly certify 'this fails the official check.'"

[`🔗 guillaumemeyer/watermarks-remover`](https://github.com/guillaumemeyer/watermarks-remover) · [`🔗 AISignal analysis`](https://www.aisignal.dev/analysis/guillaumemeyer-watermarks-remover)

---

## 7. Google open-sources HEIR — a compiler that turns AI models into encrypted-inference models

- **Velocity:** ▮▮ rising
- **Source:** Google Blog · 138 pts · ~1d ago
- **Tags:** `homomorphic-encryption` `privacy` `compiler` `mlir` `google`

Google's **HEIR** (Homomorphic Encryption Intermediate Representation) is a new open-source compiler in its Private Computing Toolkit that converts pre-trained models operating on plaintext into models that compute directly on **encrypted inputs** — targeting FHE schemes (BGV/BFV/CKKS via OpenFHE/Lattigo, CGGI via tfhe-rs) and built on MLIR. Google demonstrated four compiled private-inference apps (recommendation, credit-card fraud detection, encrypted-traffic intrusion detection, and a hotword detector) with an auto packing-selection pass that accelerates programs up to **145×**.

**Why it matters:** Fully-homomorphic encryption removes the "server must see your data" trade-off with purely cryptographic guarantees, but authoring efficient FHE code normally needs a team of cryptographers. HEIR's stated goal — a "one-click" path for non-experts to add encrypted inference — is the missing piece that could move private AI from research demo to product feature.

> FHE remains ~1,000–10,000× slower than plaintext, so today this is for small models on sensitive data, not general-purpose LLM inference.

[`🔗 Google Blog`](https://blog.google/security/how-google-is-making-private-ai-practical-with-homomorphic-encryption/) · [`🔗 Google Developers Blog`](https://developers.googleblog.com/en/expanding-our-fully-homomorphic-encryption-offering/)

---

## 8. NVIDIA NemotronLabs VoiceChat 11B — the first open full-duplex voice model with tool calling

- **Velocity:** ▮ steady
- **Source:** Hugging Face · 11B params · ~1w ago
- **Tags:** `nvidia` `speech` `full-duplex` `voice` `open-weights`

NVIDIA's **NemotronLabs VoiceChat 11B** is an end-to-end, real-time **full-duplex** speech model published with open weights — the first open model to listen and speak simultaneously while **calling tools mid-conversation** on a separate output channel. A single streaming network (7.7B Nemotron-H backbone + Fast Conformer encoder + Gemma-3 TTS) hits ~448 ms turn-taking and 38.8% on Big Bench Audio. It ships under OpenMDW v1.1 (research-only); MLX community conversions already run it on Apple Silicon.

**Why it matters:** Real-time voice agents have been stuck between closed APIs (OpenAI, Google) and open models that can't do true barge-in/tool-calling. VoiceChat proves the full-duplex stack is openable, though the research-only license and ~80 GB GPU requirement keep it a research artifact for now.

> English-only, 2-minute audio context, single voice; needs an 80 GB GPU (A100–B200) via vLLM.

[`🔗 Hugging Face`](https://huggingface.co/nvidia/NVIDIA-NemotronLabs-VoiceChat-11B) · [`🔗 dev.to`](https://dev.to/breachprotocol/nvidias-open-full-duplex-voice-model-wants-an-80gb-gpu-4k58)

---

## 9. Cursor open-sources its plugin spec and 11 official plugins

- **Velocity:** ▮ steady
- **Source:** GitHub · 2.8k stars · ~2d ago
- **Tags:** `cursor` `plugins` `skills` `mcp` `spec`

**cursor/plugins** is Cursor's official plugin specification and marketplace repo (MIT): each plugin is a directory with a `.cursor-plugin/plugin.json` manifest bundling any of six component types — **rules** (`.mdc`), **skills**, **agents**, **commands**, **MCP servers**, and **hooks** — with automatic folder-based discovery. It ships 11 official plugins (Continual Learning, Team Kit, Thermos branch review, PR Review Canvas, Orchestrate, and more), and every community plugin is manually reviewed before listing.

**Why it matters:** Cursor is converging its plugin format on the same primitives (`skills/` + `mcp.json`) the Agent Plugins 1.0.0 coalition standardized, so `cursor/plugins` doubles as a reference implementation for the cross-vendor spec — while adding Cursor-specific extensions (rules, hooks, canvases) the 1.0.0 spec deliberately left out.

> Variables use `${VAR}` placeholders — secrets are set in the dashboard, never stored in the plugin.

[`🔗 cursor/plugins`](https://github.com/cursor/plugins) · [`🔗 Cursor Docs`](https://cursor.com/docs/plugins)

---

## 10. mixedbread's Toast 1 — a search sub-agent that's 10× cheaper than frontier search

- **Velocity:** ▮ steady
- **Source:** mixedbread · 134 pts · ~1d ago
- **Tags:** `search` `rag` `agents` `mixedbread` `retrieval`

**Toast 1** is mixedbread's specialized search agent: it decomposes a query into sub-queries, gathers evidence, inspects sources, and curates context before a generalist frontier model answers — claiming frontier-class quality at up to **10× lower cost and 12× faster**. On Databricks' OfficeQA Pro V2, GPT-5.6 Sol + Toast 1 hit 70% correctness at ~$1.15/task vs 60% at ~$4/task for Claude Fable 5 on Databricks Genie; on Harvey's Legal Agentic Benchmark it cut token usage from 80.6M to 23M while preserving quality. The framework is open-source; the model weights are not.

**Why it matters:** As agents converge on "sub-agent for search" as a standard pattern, Toast 1 makes the case that search doesn't need a frontier model — a specialized, co-designed retrieval model plus a cheap harness beats generalist search on cost while matching quality, shifting where tokens get spent.

> ~$0.023 per query, ~8 seconds; works best with mixedbread Search but plugs into any backend.

[`🔗 mixedbread`](https://www.mixedbread.com/blog/toast-1) · [`🔗 TokenPost`](http://vn.tokenpost.com/news/blockchain/33707)

---

## 11. RustDesk cracks true unattended remote access on Wayland

- **Velocity:** ▮ steady
- **Source:** RustDesk Blog · preview build · ~1d ago
- **Tags:** `rustdesk` `wayland` `remote-desktop` `linux` `open-source`

**RustDesk** shipped a preview build that delivers **true unattended remote access on Wayland** — connect to a remote Linux machine without anyone approving the session, including from the login screen after a reboot, with multi-monitor support. It's a notable first: AnyDesk still requires Xorg for incoming Linux sessions and TeamViewer still calls Wayland "experimental." The team is releasing it as a separate preview (`rustdesk-unattended-wayland-1.4.9-x86_64.deb`, x86_64 Debian/Ubuntu) before folding it into stable builds.

**Why it matters:** Wayland's security model (portal-based consent for screen capture and input) has long blocked unattended remote access — a real blocker for Linux fleets and homelabs. RustDesk's implementation is currently a technical black box, which reviewers flag as both a breakthrough and a security question, especially given unattended access extends to the pre-login screen.

> Preview only; Fedora/Arch support and stable integration are next.

[`🔗 rustdesk/rustdesk`](https://github.com/rustdesk/rustdesk) · [`🔗 RustDesk Blog`](https://rustdesk.com/blog/unattended-remote-access-wayland/)

---

## 12. LuaCAD — parametric CAD scripted in Lua, a Rust rewrite of OpenSCAD's ideas

- **Velocity:** ▮ steady
- **Source:** GitHub · Show HN · ~1d ago
- **Tags:** `cad` `lua` `rust` `openscad` `parametric`

**LuaCAD** (ad-si) is a parametric CAD tool that models 2D/3D solids in **Lua** instead of OpenSCAD's "cobbled-together" SCAD language. It's a Rust rewrite embedding Lua 5.4 (via mlua) with operator overloading for natural CSG syntax (`a + b`, `a - b`, `a * b`), OpenCSG for preview rendering, the Manifold library for watertight meshes, and native support for the full BOSL2 library. It ships a CLI (`luacad convert model.lua output.stl`, `luacad watch`) and a `luacad-studio` desktop app with live 3D preview.

**Why it matters:** OpenSCAD's declarative language is powerful but widely disliked, and every alternative has been a new bespoke language. LuaCAD swaps in a real, embeddable language programmers already know — a small but sharp reminder that "good CAD scripting" and "good general-purpose language" don't have to be in tension.

> Exports 3MF/STL/OBJ/PLY/OFF/AMF/SCAD; `cargo install luacad luacad-studio`.

[`🔗 ad-si/LuaCAD`](https://github.com/ad-si/LuaCAD) · [`🔗 LuaCAD Docs`](https://ad-si.github.io/LuaCAD/)

---

## 13. Mole — a terminal deep-research agent with an enforced budget and verified quotes

- **Velocity:** ▮ steady
- **Source:** GitHub · Show HN · ~1d ago
- **Tags:** `agents` `research` `cli` `mcp` `privacy`

**Mole** (lajosdeme) is a single-binary terminal research agent that attacks three failure modes of AI research: cost overruns, hallucinated citations, and local-data leakage. An **enforced budget** reserves and settles every model call against a ledger with non-negative DB constraints (`--usd 0.50` claims 0% overshoot); **verified quotes** discard any claim whose quote doesn't appear verbatim in its source before it reaches the answer; and a **privacy boundary** lets it analyze a local CSV/folder while only aggregates (≥5-record buckets) leave the machine. It speaks MCP so coding agents can drive it.

**Why it matters:** "Deep research" tools are proliferating, but few make cost and provenance *enforceable* rather than advisory. Mole's budget-as-database-constraint and quote-verification loops are concrete, reusable mechanisms for the trust problems that still keep people from delegating real research to agents.

> Apache 2.0, `CGO_ENABLED=0` static binary; Anthropic or any OpenAI-compatible backend; Tavily/Brave for search.

[`🔗 lajosdeme/mole`](https://github.com/lajosdeme/mole) · [`🔗 AUR package`](https://aur.archlinux.org/packages/mole-research-bin)

---

## 14. Google's Gemini 3.7 Flash — half-price coding/agent model lands three weeks after 3.6

- **Velocity:** ▮▮▮ trending
- **Source:** Google Blog · ~2d ago
- **Tags:** `google` `gemini` `coding` `agents` `multimodal`

Google shipped **Gemini 3.7 Flash**, its "most intelligent" Flash for coding and agent workflows, just three weeks after Gemini 3.6 Flash. Headline gains are on agentic coding: **DeepSWE v1.1 49.0→65.3%**, FrontierCode 1.1 34.4→43.6%, and WebDev Arena Elo 1538→1588, plus a 1M-token input window and multimodal input. Launch pricing is halved to **$0.75/M input and $3.75/M output** through Dec 31 (then $1.50/$7.50 in 2027), and it ships day-one across the Gemini API, AI Studio, Android Studio, Antigravity, and Gemini Enterprise — where it now powers the **Gemini Spark** agent.

**Why it matters:** A three-week cadence plus a half-price launch is a direct bid for the "cheap workhorse for agents" tier, and the DeepSWE jump shows agentic-coding evals — not chat benchmarks — are now where the model race is actually fought.

> Promotional pricing also applies to 3.6 Flash; Gemini Spark runs on 3.7 Flash for AI Pro/Ultra subscribers in 160+ countries (not EEA/UK/Switzerland/Nigeria).

[`🔗 Android Authority`](https://www.androidauthority.com/gemini-3-7-flash-debut-3698440/) · [`🔗 APIDog benchmarks`](https://apidog.com/blog/whats-new-in-gemini-3-7-flash/)

---

## 15. Alibaba's Qwen3.8-27B — an Apache-2.0 multimodal 27B topping SWE-bench Pro

- **Velocity:** ▮▮▮ trending
- **Source:** Hugging Face · 843 pts · ~1d ago
- **Tags:** `qwen` `alibaba` `multimodal` `open-weights` `coding`

Qwen Team released **Qwen3.8-27B** (Apache 2.0), a natively-multimodal 27B model — a Gated DeltaNet + attention hybrid with multi-token prediction — featuring 262K native context (1M via YaRN) and native image/video understanding. It is best-in-row on **SWE-bench Pro (61.7)**, LiveCodeBench v6 (90.3), OSWorld-Verified (84.3), WebArena-Verified (64.8) and AndroidWorld (81.9), with thinking control (`reasoning_effort` xhigh/medium/low, `preserve_thinking`). It topped Hacker News at 843 points, and 271 quantized variants already exist for llama.cpp/Ollama/LM Studio.

**Why it matters:** It's the mid-size companion to Qwen3.8-Max (the 2.4T-A95B flagship released days earlier), giving local and edge deployments a frontier-competitive multimodal coding model under a permissive license — the exact gap between closed APIs and full-stack agent tooling.

> Runs on Transformers/vLLM/SGLang/Docker Model Runner; MLX community builds cover Apple Silicon.

[`🔗 Qwen/Qwen3.8-27B`](https://huggingface.co/Qwen/Qwen3.8-27B) · [`🔗 orcarouter comparison`](https://www.orcarouter.ai/blog/qwen-3-8-27b-vs-muse-glimmer)

---

## 16. MiniMax Music 3.0 — open-weights model generating full 5-minute songs

- **Velocity:** ▮▮▮ trending
- **Source:** MiniMax Blog · ~2d ago
- **Tags:** `minimax` `music` `audio` `open-weights` `generative`

MiniMax open-sourced **MiniMax-Music3**, a music model that generates complete ~5-minute songs in a single pass (32 kHz, 16-bit stereo WAV) from lyrics plus a structured music description. It's a hybrid: an 8B "global" LLM for long-range structure, a 0.6B "local" LLM for acoustic detail, a 2.4B flow-matching module, and a 123M Flow-VAE decoder over an 8-layer RVQ tokenizer. It runs in ~24 GB VRAM (down to ~8 GB with CPU offload), ships ComfyUI support and an INT8 variant, and accepts section tags (`[Intro]`, `[Chorus]`, `[Bridge]`…) for fine-grained arrangement control.

**Why it matters:** Full-song, self-hostable music generation with control over BPM, key, vocal details, and structure was locked behind closed APIs like Suno and Udio. Open weights plus a $0.15/song API make it the strongest open challenger — though quality claims are still vendor-reported.

> Notably quiet release: ~25 downloads at launch, no paper or benchmark report — just weights, a README, and a demo Space.

[`🔗 MiniMax Blog`](https://www.minimax.io/blog/minimax-music-3-0-next-generation-open-weights-production-ready-versatile-music-model) · [`🔗 MiniMaxAI/MiniMax-Music3`](https://huggingface.co/MiniMaxAI/MiniMax-Music3)

---

## 17. OpenAI previews GPT-5.6 Sol "Ultrafast" — 14× faster, 750 tokens/sec on Cerebras

- **Velocity:** ▮▮ rising
- **Source:** OpenAI / Cerebras · preview · ~1d ago
- **Tags:** `openai` `gpt-5.6` `inference` `cerebras` `latency`

OpenAI previewed an **"Ultrafast" mode for GPT-5.6 Sol** that runs the flagship up to 14× faster — generating up to **750 tokens/second** — by serving it on Cerebras chips rather than dropping to a smaller model. It's aimed at real-time workloads like fraud detection and live customer support, and is already in testing with firms including Jane Street and Podium. No general-availability date was given; OpenAI called it an "early preview."

**Why it matters:** Real-time performance on a flagship model, without distillation, is the missing piece for production agentic and streaming AI use cases. If 750 tok/s holds at GA, the bottleneck shifts from inference speed to orchestration, safety, and cost.

> Ships in an unusually dense 24-hour window alongside DeepSeek V4-Pro's 50%-cheaper off-peak pricing and Gemini 3.7 Flash.

[`🔗 The Neuron`](https://www.theneuron.ai/newsletter/google-openai-deepseek-dropped-models-today/) · [`🔗 TLDR AI`](https://tldr.tech/ai/2026-08-14)

---

## 18. CISA confirms SonicWall SMA1000 flaws are now ransomware vectors (CVE-2026-15409/15410)

- **Velocity:** ▮▮ rising
- **Source:** CISA KEV · CVSS 10.0 + 7.2 · ~1d ago
- **Tags:** `cisa` `sonicwall` `ransomware` `ssrf` `kev`

On Aug 14 CISA updated its Known Exploited Vulnerabilities entries for **CVE-2026-15409** (CVSS 10.0 SSRF in the SMA1000 "Work Place"/wsproxy interface) and **CVE-2026-15410** (CVSS 7.2 command injection in the `removehotfix` process) to confirm both are now exploited in ransomware campaigns, linked by Resecurity to an **INC Ransomware** affiliate. Chained, they give zero-click, unauthenticated root compromise of internet-facing SMA1000 appliances; Volexity traced exploitation to June 22 with custom malware (KNUCKLEBALL, Sou5, ROOTRUN, ORANGETAIL).

**Why it matters:** Patching isn't enough — exploitation predates the July 14 disclosure by three weeks, so any internet-facing SMA1000 unpatched in that window must be investigated for compromise. Shadowserver tracked ~380 exposed appliances at report time.

> Fixed in 12.4.3-03453 / 12.5.0-02835, no workaround. INC Ransomware also pressures victims by phone ("Andrew", +1 (304) 384-0401) and email.

[`🔗 cirt.gy advisory`](https://cirt.gy/article/al2026_27-cisa-warns-sonicwall-sma1000-vulnerabilities-are-being-exploited-by-ransomware-gangs-august-14th-2026/) · [`🔗 CVETodo`](https://cvetodo.com/news/cisa-flags-sonicwall-sma1000-bugs-cve-2026-15409-and-cve-2026-15410-as-ransomware-attack-vectors)

---

## 19. NVIDIA's Nemotron Teacher — a 550B "reasoning teacher" for distilling frontier models

- **Velocity:** ▮▮ rising
- **Source:** Hugging Face · 550B params · ~1d ago
- **Tags:** `nvidia` `distillation` `reasoning` `openmdw` `teacher`

NVIDIA released **Nemotron-Labs-Teacher-General-Reasoning**, a 550B-parameter (55B active) LatentMoE Mamba-2 + Transformer model built as a training-time "teacher" in the Nemotron 3 Ultra pipeline — one of 10+ domain-specialized teachers in its Multi-Teacher On-Policy Distillation (MOPD) recipe. It generates long reasoning traces on the hardest math/logic/abstraction problems and grades free-form answers, with a reasoning-budget dial (`enable_thinking`, `medium_effort`). It's a weights-only release (1.12 TB download, 4×B200 / 8×H100 minimum) under OpenMDW-1.1 with disclosed post-training data — and no published benchmarks.

**Why it matters:** It's a rare window into how frontier labs actually build reasoning models: a specialist teacher whose quality NVIDIA itself declines to benchmark. OpenMDW's post-training-data disclosure is also a small step past the weights-only norm.

> No inference provider hosts it; reasoning quality is "unverified by anyone outside NVIDIA."

[`🔗 orcarouter analysis`](https://www.orcarouter.ai/blog/nemotron-labs-teacher-general-reasoning-vs-qwen-3-8-max) · [`🔗 Nemotron Teacher model card`](https://huggingface.co/nvidia/Nemotron-Labs-Teacher-General-Reasoning)

---

## 20. Liquid AI's LFM2.5-VL-3B — an on-device vision-language model that beats larger rivals

- **Velocity:** ▮ steady
- **Source:** Hugging Face · 3.1B params · ~2d ago
- **Tags:** `liquid-ai` `vision-language` `on-device` `open-weights` `multimodal`

Liquid AI released **LFM2.5-VL-3B**, a ~3.1B vision-language model (LFM2.5-2.6B backbone + SigLIP2 NaFlex encoder) designed for on-device use: **228 tok/s on an Apple M5 Max** and ~20 tok/s on a Galaxy S26 Ultra in under 3.3 GB. It posts ScreenSpot-v2 80.7 (screen understanding), RefCOCO P@1 87.9 (grounding), ChartQA 81.3, 16-language support, and experimental structured-OCR (labels + bounding boxes + LaTeX). Official GGUF/ONNX/MLX quantizations ship.

**Why it matters:** It targets the GUI-agent niche — reading screens and grounding objects locally on phones and laptops — the exact workload most "computer-use" agents run, on hardware that can't host a 27B model.

> License lfm1.0; not recommended for long-context visual reasoning (web design, blueprint Q&A).

[`🔗 LiquidAI/LFM2.5-VL-3B`](https://huggingface.co/LiquidAI/LFM2.5-VL-3B) · [`🔗 llm-stats`](https://llm-stats.com/models/lfm-2.5-vl-3b)

---

## 21. firecrawl/anydoc — one Rust engine turns any office document into LLM-ready Markdown

- **Velocity:** ▮ steady
- **Source:** GitHub · 16.1k stars · ~3d ago
- **Tags:** `firecrawl` `rust` `markdown` `documents` `rag`

Firecrawl's **anydoc** (MIT) converts Word, PowerPoint, Excel, OpenDocument, RTF, EPUB, CSV, and PDF into clean GitHub-Flavored Markdown through a single Rust core with Node/Python/WASM bindings, at a median **under 5 ms per document**. It detects format from bytes (not extensions), preserves tables/merged cells/footnotes/speaker notes, renders images as alt text, and powers Firecrawl's `/parse` API — plus an Agent Skill (`npx skills add firecrawl/anydoc`).

**Why it matters:** Document ingestion is the unglamorous bottleneck for RAG and agent workflows, and legacy converters (LibreOffice 1,129 ms, Pandoc 102 ms) are orders of magnitude slower or lossy. One fast, consistent, single-output-format engine removes a whole class of preprocessing code.

> Benchmark: 4.4 ms median vs 1,129 ms (LibreOffice) and 102 ms (Pandoc); the only converter in its test to handle all 14 formats.

[`🔗 firecrawl/anydoc`](https://github.com/firecrawl/anydoc) · [`🔗 Firecrawl /parse blog`](https://www.firecrawl.dev/blog/introducing-parse)

---

## 22. Comp AI CRM — a CRM built for AI agents to keep their own notes

- **Velocity:** ▮ steady
- **Source:** GitHub · 7.1k stars · ~1w ago
- **Tags:** `crm` `agents` `typescript` `eve` `open-source`

**trycompai/crm** (Comp AI CRM, MIT) inverts the CRM model: a persistent research agent is the product, and the database is just "where the agent keeps its notes." The agent runs its own deployment, schedule, and work queue — reading the team inbox, creating contacts from email threads, enriching companies, scheduling its own follow-ups, and spending a research budget until it runs out. Built on Vercel's eve framework (18 tools, 4 skills, network-isolated sandbox), single-tenant, and runs with zero external API keys. A core rule: "nothing about a person is guessed" — weak evidence becomes a human-reviewed suggestion, not a fact.

**Why it matters:** It's a concrete example of the "agent-first" software pattern replacing form-first SaaS: the UI becomes a view of what the agent did, not a data-entry surface — inverting how CRM and most business software gets designed.

> ~6 days old at v1.0.0; TypeScript Turborepo on Bun (Next.js + NestJS/tRPC + Postgres); Slack integration; Google sign-in with an allow-list as the entire authorization model.

[`🔗 trycompai/crm`](https://github.com/trycompai/crm) · [`🔗 openalternative`](https://openalternative.co/crm)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-08-15T12:03:00Z |
| Items | 22 |
| Sources tracked | 32 (GitHub Trending, Hacker News, z.ai, Pandaily, ppc.land, 4sysops, Context Studios, The Hacker News, Mallory, SecurityWeek, AISignal, Google Blog, Google Developers Blog, Hugging Face, dev.to, Cursor Docs, mixedbread, TokenPost, RustDesk Blog, LuaCAD Docs, AUR, Android Authority, APIDog, The Neuron, TLDR AI, orcarouter, MiniMax Blog, cirt.gy, CVETodo, llm-stats, Firecrawl Blog, openalternative) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[Previous day](../2026-08-14/) · [Raw .md](../2026-08-15.md) · [Archive](../../archive/)
