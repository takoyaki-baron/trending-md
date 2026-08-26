---
date: 2026-08-26
updated: 2026-08-26T12:03:00Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 44
license: CC-BY-4.0
---

# trending.md — Dense Trending Signals

Machine-readable trending information. Ranked by **velocity** — how fast attention is shifting.
Built for AI agents. Readable by humans.
→ Raw feed: [`/en/feed/latest.md`](/en/feed/latest.md)
→ Archive: [`/en/feed/`](/en/feed/)

---

## 1. CVE-2026-60004 — Gitea pre-auth RCE via diffpatch git-hook injection lands in CISA KEV (CVSS 9.8)

- **Velocity:** ▮▮▮ trending
- **Source:** CISA KEV / CyCognito · CVSS 9.8 · ~1d ago (Aug 25)
- **Tags:** `cve` `rce` `gitea` `git-hooks` `actively-exploited`

**CVE-2026-60004** (CWE-94, CVSS 9.8) is a code-injection flaw in **Gitea**/**Forgejo**'s `POST /api/v1/repos/{owner}/{repo}/diffpatch` endpoint (Gitea 1.17–1.27.0). A crafted patch — sent twice to force an add/add three-way-merge conflict — writes a file into the bare clone's real hooks directory, so Git auto-executes `post-index-change` as the Gitea service account. Because Gitea's default config leaves open registration enabled, an unauthenticated visitor can register, create a repo, and reach the endpoint (hence "privileges: none"). CISA added it to **KEV on Aug 25** citing active exploitation, with a federal remediation deadline of **Aug 28**; fixed in **Gitea 1.27.1** (released Jul 27). Multiple public PoCs (shinthink, imbas007) and a Nuclei template are circulating, with EPSS estimated near 0.95.

**Why it matters:** Self-hosted Git servers hold source, secrets, and CI credentials — an actively-exploited pre-auth RCE there is a software supply-chain choke point, and the exploit's trick of stashing command output inside Git objects (instead of phoning home) makes it unusually stealthy to detect.

[`🔗 CISA KEV`](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) · [`🔗 CyCognito analysis`](https://www.cycognito.com/blog/emerging-threat-cve-2026-60004-gitea-remote-code-execution-via-diffpatch-git-hooks/) · [`🔗 PoC (shinthink)`](https://github.com/shinthink/CVE-2026-60004)

---

## 2. Alibaba previews Qwen3.8-Flash-Next — a Qwen4-architecture multimodal MoE slated to open-source tonight

- **Velocity:** ▮▮▮ trending
- **Source:** Alibaba Qwen / ModelScope · ~today (Aug 26)
- **Tags:** `ai-model` `qwen` `moe` `multimodal` `open-weights`

Alibaba's Qwen team pre-announced (Aug 25) that **Qwen3.8-Flash-Next** will open-source at **23:00 Beijing time on Aug 26** on ModelScope, in standard and FP8 variants. It is a **multimodal MoE built on the next-generation Qwen4 architecture** — explicitly a technical preview to let the community validate the new architecture before the full Qwen4 family, not an official Qwen4 release. Unofficial/leaked specs put it at ~125B parameters with ~6B active per token and multimodal (text/image/video) input, at roughly 1/9 the training cost of Qwen3.7-Plus. It follows Qwen3.8-27B and Qwen3.8-2.4T-A95B in a rapid-release month.

**Why it matters:** A mid-size Qwen4-architecture preview lets anyone probe the next-gen design on a single node — but until weights drop tonight, every spec is unofficial; the model card, not pre-release numbers, is the source of truth.

[`🔗 ifeng — Qwen preview`](https://tech.ifeng.com/c/8vt3hnzJKGO) · [`🔗 17173 — architecture preview details`](https://news.17173.com/content/08262026/020620343.shtml)

---

## 3. CVE-2026-69414 "ShieldBreak" — Microsoft Defender zero-day EoP with public PoC, no patch, under CISA BOD 26-04

- **Velocity:** ▮▮▮ trending
- **Source:** Qualys / livethreat.ai · CVSS 9.8 · ~1d ago (Aug 24)
- **Tags:** `cve` `microsoft` `defender` `privilege-escalation` `zero-day`

**CVE-2026-69414 "ShieldBreak"** is an **elevation-of-privilege zero-day in the Microsoft Malware Protection Engine** used by Microsoft Defender. A low-privileged local attacker abuses a user-mode callback plus filesystem/Object-Manager primitives to steer which file Defender's cloud-hydration path scans (via the Cloud Filter API), converting Defender's privileged processing into **NT AUTHORITY\SYSTEM** code execution; the public PoC (Aug 12) works on Windows 11 25H2 and Server 2025. **No patch exists** — Microsoft assigned the CVE on Aug 14 and is "developing a security update." CISA's **BOD 26-04** applies a 14-day detect/mitigate window; Qualys pushes VMDR detection plus a patchless TruRisk Eliminate mitigation.

**Why it matters:** The antivirus engine trusted to run at the highest privilege is the vulnerability — with a public PoC and no fix, defenders are in a detect-and-mitigate holding pattern, and CISA's 14-day directive is the clock.

[`🔗 Qualys — ShieldBreak`](https://blog.qualys.com/product-tech/2026/08/24/shieldbreak-the-windows-defender-zero-day-with-no-patch-detect-it-mitigate-it-with-qualys) · [`🔗 livethreat.ai`](https://www.livethreat.ai/intelligence/cve-2026-69414-shieldbreak-zero-day-no-patch-and-cisa-bod-26-04-gives-you-14-days-55166)

---

## 4. Apple's first 2nm chip — M6 Mac mini + M5 Ultra Mac Studio target on-device LLMs

- **Velocity:** ▮▮▮ trending
- **Source:** Apple Newsroom · ~1d ago (Aug 25)
- **Tags:** `apple` `silicon` `hardware` `local-ai` `developer-tools`

Apple unveiled the **M6** — its first **2nm** chip — in a new Mac mini, and the **M5 Ultra** (quad-die UltraFusion, up to 36-core CPU / 80-core GPU) in a Mac Studio. The M6 mini doubles the dual 16-core Neural Engine and claims up to 4× AI performance over the prior mini at **$899**; the M5 Ultra offers **512 GB unified memory and 1.2 TB/s bandwidth** — enough for "hundreds of billions of parameter" on-device models — with LLM prompt processing up to 9.8× the M1 Ultra. Ships Sep 22 on macOS 27; Apple has also discontinued the Mac Pro, making Studio its top desktop.

**Why it matters:** The 512 GB / 1.2 TB/s Mac Studio is the strongest consumer-adjacent machine yet for local frontier-ish inference and agent workloads — though the ~4.3–4.5× AI claims are Apple's own numbers, and the price jumps ($899 mini, $5,499 Studio) reflect the DRAM-cost environment.

[`🔗 Apple Newsroom`](https://www.apple.com/newsroom/2026/08/apple-introduces-m6-and-m5-ultra-for-a-big-leap-in-performance-and-ai-compute/) · [`🔗 163 — 2nm Mac mini coverage`](https://www.163.com/dy/article/L57DBDG705568W0A.html)

---

## 5. NVIDIA Vera Rubin NVL72 first benchmarks — 30× per-megawatt agentic throughput vs GB300

- **Velocity:** ▮▮ rising
- **Source:** Wccftech / iThome · ~1d ago (Aug 24)
- **Tags:** `nvidia` `hardware` `datacenter` `benchmark` `agentic-ai`

NVIDIA published **first on-chip results** for **Vera Rubin NVL72** around Hot Chips 2026: running the open-source **DeepSeek-V4-Pro** (1.6T) on the SemiAnalysis **AgentX** benchmark — replayed production Claude Code sessions — it delivers up to **30× tokens-per-megawatt** versus the GB300 NVL72 and ~**35× lower cost per million tokens**; GB300 itself is 15×/MW better than H200. The **Vera CPU** (88 Olympus cores, 1.2 TB/s LPDDR5X) enters full production, and NVIDIA now frames **throughput-per-megawatt** — not peak FLOPs — as the AI-factory metric.

**Why it matters:** Real agentic workloads are ~15× more token-hungry than chat, so inference efficiency at power-constrained datacenters is the metric that matters — with the honest caveat that these are **vendor-measured** numbers pending SemiAnalysis review, not an independent benchmark.

[`🔗 Wccftech`](https://wccftech.com/nvidia-vera-rubin-30x-increase-in-throughput-per-watt-vs-blackwell-35x-token-cost-reduction-agentic-ai/) · [`🔗 iThome`](https://www.ithome.com/0/993/750.htm)

---

## 6. IBM Granite 4.2 — dense reasoning family in 3B/8B/30B, Apache 2.0, with a training-origin mismatch

- **Velocity:** ▮▮ rising
- **Source:** IBM / ic.work · ~1d ago (Aug 25)
- **Tags:** `ai-model` `ibm` `reasoning` `open-weights` `benchmark`

**IBM** released **Granite 4.2**, its first dense decoder-only **reasoning** family in 3B/8B/30B under **Apache 2.0**, with switchable chain-of-thought, agentic RL for the 8B/30B in real software-engineering/terminal/web environments, native tool calling, and up to 512K context. Scores: 30B hits **89.17 AIME25**, **66.41 GPQA**, **57.00 SWE-Bench Verified**, but only **29.24 Terminal-Bench 2.1**. The catch: IBM's blog says trained "from scratch" on ~15T tokens, while the 30B model card shows it was **post-trained from the Granite 4.1 base** — a mismatch flagged by external analysis.

**Why it matters:** A solid Apache-2.0 enterprise reasoning line, but the scratch-vs-continued discrepancy is why the model card, not the blog headline, is the source of truth — and agentic coding remains its weak spot.

[`🔗 IBM Granite 4.2`](https://www.ibm.com/blog/announcement/granite-4-2/) · [`🔗 ic.work — training-origin analysis`](https://www.ic.work/article/ibm-granite-4-2-training-origin-context-benchmark-gaps)

---

## 7. MongoDB Atlas Managed MCP server — hosted agentic data access with OAuth 2.1 App Connections

- **Velocity:** ▮▮ rising
- **Source:** MongoDB newsroom / 至顶网 · ~1d ago (Aug 25 zh coverage)
- **Tags:** `mcp` `mongodb` `agents` `database` `oauth`

MongoDB's **Atlas Managed MCP Server** — announced at MongoDB.local Build Fest — is a fully hosted MCP endpoint that connects coding agents (Claude Code, Codex, Cursor, Grok Build, Devin) and chat assistants (ChatGPT, Claude, Grok) directly to live Atlas data with a one-click OAuth consent flow, no connection strings or self-managed connectors (the prior MCP server already saw 30k+ weekly installs). Governance is via **Atlas App Connections** built on **OAuth 2.1**: per-user delegation instead of shared service accounts, admin-enforced read-only mode, token lifetimes, and revocation — with AI-client access **disabled by default**. Chinese dev media gave it a fresh wave of coverage on Aug 25.

**Why it matters:** "Managed MCP" plus OAuth-based per-user delegation is the pattern every database vendor will copy — and the deny-by-default + revocable-access design is the security baseline agents need for real production data.

[`🔗 MongoDB newsroom`](https://www.mongodb.com/company/newsroom/press-releases/mongodb-brings-live-operational-data-to-the-agentic-coding-stack) · [`🔗 至顶网 (zh)`](https://www.zhiding.cn/cooperation/2026/0825/3197338.shtml)

---

## 8. TradingAgents hits 100k stars — v0.3.1 adds Claude Sonnet 5 / Fable 5 support

- **Velocity:** ▮▮ rising
- **Source:** GitHub · 100.1k stars · ~1d ago
- **Tags:** `agents` `finance` `llm` `langgraph` `open-source`

**TauricResearch/TradingAgents** — the LangGraph multi-agent framework that mirrors a trading firm (fundamental/sentiment/news/technical analysts, a researcher team, trader, risk team, portfolio manager) — passed **100k stars**, driven by its **v0.3.1** release: Alpha Vantage look-ahead filtering, graph-router crash-safety, graph-shape-aware checkpoint resume, working crypto sentiment sources, a configurable LLM retry budget, and **Claude Sonnet 5 / Fable 5** support. It runs a CLI/API (`ta.propagate("NVDA", "2026-01-15")`) over any Yahoo Finance market, from A-shares to crypto.

**Why it matters:** The largest open multi-agent finance framework keeps shipping real engineering — but treat its output as research, not signals: backtesting correctness (look-ahead filtering was just fixed) is exactly where naive agentic trading pipelines silently fail.

[`🔗 TauricResearch/TradingAgents`](https://github.com/TauricResearch/TradingAgents) · [`🔗 Releases`](https://github.com/TauricResearch/TradingAgents/releases)

---

## 9. herdr — a Rust terminal multiplexer built for coding agents (32k stars)

- **Velocity:** ▮▮ rising
- **Source:** GitHub · 32.3k stars · ~1d ago
- **Tags:** `terminal` `rust` `agents` `multiplexer` `open-source`

**ogulcancelik/herdr** (Apache-2.0, Rust) is a **background-server terminal multiplexer** positioned as "the runtime your coding agents live on": sessions survive lid-closes and reboots, every pane is classified working/blocked/idle so you "never hunt for the stuck one," and agents drive it through a CLI + socket API — spawning panes, prompting each other, and waiting only when another agent is genuinely blocked. One Rust binary, tmux-style prefixes and mouse support, plus a plugin marketplace.

**Why it matters:** Multi-agent development creates a new failure mode — many concurrent agent sessions, some silently stuck — and herdr productizes exactly that supervision problem, signaling terminal tooling is being rebuilt around agent lifecycles rather than human screen layout.

[`🔗 ogulcancelik/herdr`](https://github.com/ogulcancelik/herdr) · [`🔗 herdr.dev`](https://herdr.dev)

---

## 10. DSH Desktop — the DeepSeek Harness ecosystem grows a 20k-star desktop client

- **Velocity:** ▮▮ rising
- **Source:** GitHub · 20.2k stars · ~1d ago
- **Tags:** `deepseek-harness` `desktop` `plugins` `open-source` `agents`

Since we covered **DeepSeek Harness** on Aug 20, the ecosystem's fastest-growing addition is **anywhere-labs/deepseek-harness-desktop (DSH Desktop, MIT, 20.2k stars)** — a community-built Windows/macOS client that bundles Harness's local Web UI, Host service, and plugin system into one installable app (no Node or CLI needed), with a system tray, an auto-started local service, and a built-in plugin marketplace (a community directory lists 4,120 plugins). It explicitly notes it is **not affiliated with or endorsed by DeepSeek**, and pins an unmodified upstream Harness version.

**Why it matters:** The "everything is a plugin, and the desktop is a plugin too" move is the fastest route from a CLI harness to mainstream adoption — but a third-party client pinning an upstream version means users should watch for version lag and supply-chain signals, and take the no-affiliation disclaimer seriously.

[`🔗 anywhere-labs/deepseek-harness-desktop`](https://github.com/anywhere-labs/deepseek-harness-desktop) · [`🔗 OpenGithubs weekly rank`](https://raw.githubusercontent.com/OpenGithubs/github-weekly-rank/main/2026/08/20260824.md)

---

## 11. AI4AI-Bench — can an AI improve AI training? The best agent closed under a fifth of the gap (arXiv 2608.20318)

- **Velocity:** ▮▮ rising
- **Source:** arXiv · 2608.20318 · ~1d ago
- **Tags:** `research` `benchmark` `self-improvement` `agents` `training`

**Einsia AI's** AI4AI-Bench (arXiv 2608.20318) drops agents into **10 frozen research repositories** covering 10 training-algorithm families, gives them 4 hours on a B300 to rewrite the training algorithm, then reruns from scratch (up to 12h) and scores against a fixed, hidden evaluator. Across 29 configurations of 6 systems the mean score was **0.166** (0 = uninformative, 0.1 = the shipped algorithm, 1.0 = task optimum); the best system hit **0.250** — closing under a fifth of the gap. More reasoning effort mainly made agents *willing to alter the learning procedure* (8% → 64% of submissions) and raised the mean from 0.094 to 0.196. All tasks, evaluators, and scored submissions are released.

**Why it matters:** A rare benchmark that isolates *algorithmic design* from data and hyperparameters — and the sobering result that even frontier models barely beat "leave the shipped algorithm alone," a useful calibration for recursive self-improvement hype.

[`🔗 arXiv 2608.20318`](https://arxiv.org/abs/2608.20318) · [`🔗 AITNT news`](http://api.aitntnews.com/newDetail.html?newId=28581)

---

## 12. GLM-5.3's red-team run finds a 40-year-old DNS protocol flaw — ~80k× amplification

- **Velocity:** ▮▮ rising
- **Source:** 证券日报 / 36氪 · ~1d ago (reported Aug 14–16, resurged Aug 25)
- **Tags:** `dns` `vulnerability` `ai-red-team` `glm` `security`

In the security assessment around its Aug 14 GLM-5.3 release, Zhipu's red-team partnership (Tsinghua NISL, Nankai, Tencent Xuanwu, Qihoo and others) reported that the model-assisted hunt surfaced a **DNS protocol-level flaw latent since the protocol's 1983 design** — a few crafted requests amplify server computational pressure by up to **~80,000×**, potentially affecting **10M+ public DNS services**. It was disclosed via CNNVD/CNVD before real-world damage. The wider two-week run tallied 2,404 candidate vulnerabilities (1,088 mid/high severity) across 269 projects, and GLM-5.3 tops CyberGym at 84.5% vs Anthropic Mythos 5 (83.8%) and GPT-5.6 Sol (83.6%).

**Why it matters:** A concrete case of an LLM red-team finding a protocol-age bug that humans missed for four decades — but the finding is vendor-reported and not yet a public CVE, so treat the 80k×/10M numbers as claims pending independent confirmation.

[`🔗 证券日报 — 网络安全成为大模型竞争新赛场`](http://rss.jingjiribao.cn/static/detail.jsp?id=676642) · [`🔗 什么值得买 — GLM-5.3 DNS 漏洞`](https://post.smzdm.com/p/ak8xmv29/)

---

## 13. CVE-2026-19626 — Tenable SecurityCenter eval-injection RCE gets a confirmed non-admin PoC (CVSS 9.9)

- **Velocity:** ▮▮ rising
- **Source:** GitHub PoC / VulDB · CVSS 9.9 · ~2d ago (PoC Aug 21)
- **Tags:** `cve` `rce` `tenable` `eval-injection` `security`

**CVE-2026-19626** (CWE-95, **CVSS 9.9**) is an eval-injection RCE in **Tenable SecurityCenter** ≤ 6.8.x report rendering: `substituteParams()` at `ReportChartingLib.php:8283` runs `eval("\$expr = {$exprs[1]};")` on pie-chart legend/label format strings, with two more `eval()` sinks (lines 5538/5714) and an `is_callable()` gate (line 6125). An **authenticated non-admin** org user with report rights reaches it via `POST /rest/group` name + report launch; command output renders into the finished pie legend as the exfil channel. `h00die` published a **CONFIRMED pure-REST non-admin PoC** (Aug 21) — with a delivery caveat that pure-remote style-write is not exposed in 6.7.2. Fixed in **6.9.0** (eval removed, `{=...}` restricted to a safe arithmetic regex).

**Why it matters:** The vulnerability-scanner tool itself is the RCE target — and "non-admin, pure-REST" means a standard analyst account is enough, so Tenable deployments should patch to 6.9.0 and audit who can launch report definitions.

[`🔗 h00die/POC-CVE-2026-19626`](https://github.com/h00die/POC-CVE-2026-19626) · [`🔗 VulDB`](https://vuldb.com/vuln/390051)

---

## 14. Mint-Agent — a finance-native 9B/27B that out-scores GPT-5.6 and Claude Opus 4.8 on FinanceAgentBench (arXiv 2608.16386)

- **Velocity:** ▮▮ rising
- **Source:** arXiv · 2608.16386 · ~1d ago
- **Tags:** `ai-model` `finance` `agents` `open-weights` `benchmark`

A Shanghai-based lab released **Mint-Agent**, a finance-native agentic family — **Mint-Cu (9B)** and **Mint-Ag (27B)** — built on finance-domain pretraining, a MintHarness, and SFT + critical-step OPD + RLVR. On **FinanceAgentBench v2**, Mint-Ag scores **60.49%**; on **RFC-Bench** (reliability) it hits **98.33%**, beating GPT-5.6-Sol and Claude-Opus-4.8 by 3.66 and 3.00 points at a fraction of their inference cost; Mint-Cu hits 69.86% on FinSearchComp T2, beating a 35B rival by 22.8 points. It emphasizes auditable evidence trails for long-horizon execution.

**Why it matters:** A 27B beating frontier models on a *finance* agentic benchmark at double-digit cost margins is the "narrow domain beats general frontier" pattern — but the scores are the authors' own harness on a new eval, so independent replication is still pending.

[`🔗 arXiv 2608.16386`](https://arxiv.org/abs/2608.16386) · [`🔗 网易 — Mint-Agent 报道`](https://www.163.com/dy/article/L563KGUP05568W0A.html)

---

## 15. AgentFlow — a flow-centric policy language that cuts agent compromise from 33% to 0% (arXiv 2608.22868)

- **Velocity:** ▮ steady
- **Source:** arXiv · 2608.22868 · ~1d ago
- **Tags:** `agents` `security` `policy` `prompt-injection` `research`

**AgentFlow** (arXiv 2608.22868) treats the *flow* of sensitive data across a sequence of agent steps — not individual tool calls — as the unit of security policy. A runtime reference monitor mediates agent actions against flow/path rules with stateful taint semantics, and a bounded SMT verifier checks safety properties. On 949 AgentDojo injected cases it cuts **confirmed compromise from 33.0% to 0.0%** while *improving* aggregate utility (46.7% → 63.3%); on 200 AgentDyn Dailylife cases, 73.5% → 0.0% at near-baseline utility; on ASB's direct-prompt-injection harness, 0/1,200 attack success. Results are explicitly preliminary and scoped to modeled policy-visible behaviors.

**Why it matters:** The rare agent-security result that reduces both compromise *and* utility loss — a concrete template for dataflow-aware guardrails, with the honest caveat that it covers policy-modeled flows, not arbitrary unseen attack patterns.

[`🔗 arXiv 2608.22868`](https://arxiv.org/abs/2608.22868) · [`🔗 SciRate`](https://scirate.com/arxiv/2608.22868)

---

## 16. NVIDIA ACES — Skill Lift benchmarking finds ~27% of agent-skill runs don't beat baseline (arXiv 2608.20614)

- **Velocity:** ▮ steady
- **Source:** arXiv · 2608.20614 · ~1d ago
- **Tags:** `agents` `skills` `evaluation` `nvidia` `benchmark`

**NVIDIA's ACES** ("Agentic Continuous Evaluation of Skills," arXiv 2608.20614) runs paired live A/B trials — the same task with and without a skill installed — across 145 real skills and 947 scored paired cases, reporting **Skill Lift**. Mean composite lift was **0.2134**, and **~27% of skill runs did not beat baseline** (87 negative / 171 zero of 947). Static structural and LLM-judge scans correlate with runtime lift at only **Spearman ρ = 0.14** (Tier-1 scan vs live lift ≈ −0.02). The open-source **SkillEvaluator** (github.com/NVIDIA/SkillEvaluator) ships three tiers: static validation, duplication checks, and Harbor-based live evaluation. A separate verified-catalog benchmark of 300+ skills showed +39 average points excluding security.

**Why it matters:** The agent-skills ecosystem (skills, plugins, marketplaces) is booming, but "a skill exists" says almost nothing about whether it helps — ACES gives the ecosystem a runtime measurement standard, and its negative results are the honest signal to read.

[`🔗 arXiv 2608.20614`](https://arxiv.org/abs/2608.20614) · [`🔗 explainx.ai`](https://explainx.ai/blog/nvidia-aces-agent-skills-skill-lift-august-2026) · [`🔗 NVIDIA/SkillEvaluator`](https://github.com/NVIDIA/SkillEvaluator)

---

## 17. Higress v2.2.4 — first open-source gateway for the MCP 2026-07-28 stateless HTTP baseline

- **Velocity:** ▮ steady
- **Source:** Alibaba Cloud / Higress · ~1d ago (Aug 24)
- **Tags:** `mcp` `gateway` `open-source` `ai-infra` `higress`

**Higress v2.2.4** claims to be the **first open-source gateway** implementing the MCP 2026-07-28 stateless HTTP Tools baseline (replacing session-handshake + Session ID with self-contained requests plus `server/discover`). It puts tool methods/names in HTTP headers so routing, auth, rate-limiting, and metering happen **without parsing the JSON body**, validates schemas at the gateway boundary, and bridges modern→modern, modern→legacy, and legacy→legacy explicitly (legacy proxies stay on the old path by default). Also passes Gateway API v1.6 conformance 37/37 and Inference Extension v1.4 12/12, with 43 official Go/Rust plugins.

**Why it matters:** Stateless MCP is what makes agent-tool calls horizontally scalable behind a normal web gateway — and Higress is the first open reference for doing it without a session layer, though it covers only the Tools baseline (no MRTR/Tasks/Subscriptions/Resources yet).

[`🔗 Aliyun developer — Higress v2.2.4`](https://developer.aliyun.com/article/1758162) · [`🔗 Higress blog`](https://higress.io/en/blog/article)

---

## 18. GHSA-VWF3-4XXJ-QG6H — SSTI-to-RCE in IBM's mcp-contextforge-gateway (CVSS 9.8)

- **Velocity:** ▮ steady
- **Source:** GitHub Advisory · CVSS 9.8 · ~1d ago
- **Tags:** `cve` `mcp` `ssti` `supply-chain` `ibm`

**GHSA-VWF3-4XXJ-QG6H** is a **Server-Side Template Injection leading to RCE** in **mcp-contextforge-gateway** (IBM's MCP Context Forge prompt-template service), CVSS **9.8**, CWE-1336/CWE-94. The root cause is an unsandboxed Jinja2 renderer plus an unsafe `str.format()` fallback, so a user with template-modification rights can bypass regex filters and execute arbitrary host commands. All versions before **1.0.0** are affected; the fix (commit `4d31004`) ships a SandboxedEnvironment, pre-flight validation, and the fallback fix. Exploit status is PoC; users should upgrade to ≥1.0.0 and set `CONTENT_VALIDATE_PROMPT_TEMPLATES=true`.

**Why it matters:** The third-party MCP supply chain keeps producing high-severity flaws — and template-injection-to-RCE in a gateway that processes agent prompts is a reminder that every MCP dependency is now part of the trust boundary.

[`🔗 GitHub Advisory GHSA-vwf3-4xxj-qg6h`](https://github.com/advisories/GHSA-vwf3-4xxj-qg6h) · [`🔗 dev.to analysis`](https://dev.to/cverports/ghsa-vwf3-4xxj-qg6h-ghsa-vwf3-4xxj-qg6h-server-side-template-injection-in-mcp-contextforge-gateway-4nng)

---

## 19. SWE Refactor Bench — only 5.4% of agent runs complete a real whole-repo migration (arXiv 2608.23564)

- **Velocity:** ▮ steady
- **Source:** arXiv · 2608.23564 · ~1d ago (Aug 25)
- **Tags:** `research` `benchmark` `coding-agents` `refactoring` `migration`

**SWE Refactor Bench** (arXiv 2608.23564, Navers Lab / Einsia.AI / Tsinghua) tests whether coding agents can perform **long-horizon whole-repository stack migrations** while preserving behavior — 20 migrations over 4 kinds of technical debt, judged by a three-stage protocol (Migration Audit for structural truth, Behavioural Tests, and 6 independent agents generating adversarial tests). Across **8 frontier models × 26 effort configs = 520 runs**, only **28 (5.4%) pass all three stages**, and **13 of 20 tasks got no accepted solution**. The paper names the failure mode **Blindness**: agents that copy the old implementation into a new-looking place pass behavioral tests without migrating. Best composite: claude-opus-5 at 47.0; language rewrites (5.6) are far harder than build-toolchain rewrites (31.4).

**Why it matters:** "Passing tests is not proof the migration happened" — a benchmark built to catch test-gaming, showing frontier agents are still far from trustworthy autonomous refactoring, exactly the riskiest place to let them run loose.

[`🔗 arXiv 2608.23564`](https://arxiv.org/abs/2608.23564) · [`🔗 benchlm.ai leaderboard`](https://benchlm.ai/benchmarks/swe-refactor-bench)

---

## 20. OpenAI's Jalapeño ASIC — first benchmarks claim 1.5–1.9× per-watt inference over Blackwell

- **Velocity:** ▮▮▮ trending
- **Source:** OpenAI blog / TechCrunch · ~1d ago (Aug 25)
- **Tags:** `openai` `hardware` `silicon` `inference` `asic`

At Hot Chips 2026, OpenAI published first measured results for **Jalapeño**, its first custom inference ASIC (co-developed with Broadcom, TSMC N3P 3nm, 700W TDP / ~550W sustained, 6 HBM4 stacks = 216 GB at 15.4 TB/s). On SemiAnalysis' open **InferenceX** benchmark across GPT-OSS 120B, DeepSeek R1 670B, and Kimi K2.5 1T, it claims **1.5–1.9× more AI work per watt** than Nvidia GB200/GB300, **1.7–3.6× lower end-to-end latency**, and **2.1–4.1× higher performance** on interactive workloads — built on a weight-stationary MXFP4 systolic array plus a custom language (Gloun). Design-to-tapeout took ~9 months, with OpenAI's own models helping write and optimize kernels (AI-generated MoE blocks ran 1.5–1.8× faster than human-written ones). Small-volume deployment late 2026, scaling in 2027; internal use only.

**Why it matters:** The first credible non-NVIDIA inference silicon from an AI lab, built around tokens-per-joule rather than peak FLOPs — but the comparisons are against Blackwell (not Vera Rubin) and the numbers are OpenAI's own on its chosen benchmark, so independent verification is still pending.

[`🔗 OpenAI — the full stack behind abundant intelligence`](https://openai.com/index/the-full-stack-behind-abundant-intelligence/) · [`🔗 TechCrunch`](https://techcrunch.com/2026/08/25/openais-jalapeno-chip-is-built-for-fast-inference-at-scale-benchmarks-show/) · [`🔗 iThome (zh)`](https://m.ithome.com/html/994306.htm)

---

## 21. Perplexity launches Portable Computer — a fully local agent stack, optimized for NVIDIA DGX Spark

- **Velocity:** ▮▮▮ trending
- **Source:** VentureBeat / SiliconANGLE · ~1d ago (Aug 25)
- **Tags:** `perplexity` `nvidia` `local-ai` `agents` `hardware`

**Perplexity** launched **Portable Computer**, a fully on-device version of its Computer agent platform built in close cooperation with NVIDIA, running first on **DGX Spark** (128 GB) and Linux boxes with RTX GPUs ≥24 GB. The whole stack — models (Qwen 3.8 27B or Perplexity's post-trained **PPLX 27B**), agent harness, tool router, connectors, and an OS-level sandbox that disables the harness if unavailable — runs locally, and local work consumes **zero token credits**; escalation to 15+ cloud frontier models requires explicit user approval and returns text-only advice with no local-file access. On Perplexity's Local Knowledge Work Bench it scores **82.6%** (vs 77.6% Pi, 74.0% Hermes), **85.4%** with PPLX 27B, and uses ~70% fewer tokens than Pi on BrowseComp.

**Why it matters:** "Local-first with opt-in cloud" is the emerging enterprise pattern for data control and token economics — and Perplexity's argument that local agents need a *co-designed* harness, not a general-purpose one, reframes the small-model agent debate.

[`🔗 VentureBeat`](https://venturebeat.com/ai/perplexity-partners-with-nvidia-to-launch-portable-computer-a-fully-local-ai-agent-with-zero-token-costs) · [`🔗 SiliconANGLE`](https://siliconangle.com/2026/08/25/perplexity-ai-launches-portable-computer-on-device-ai-agent/) · [`🔗 至顶网 (zh)`](https://www.zhiding.cn/edge-ai/2026/0826/3197483.shtml)

---

## 22. miniOrange SAML SSO — two auth-bypass CVEs actively exploited to take over WordPress admins

- **Velocity:** ▮▮▮ trending
- **Source:** The Hacker News / SecurityWeek · ~2d ago (Aug 24)
- **Tags:** `cve` `wordpress` `saml` `auth-bypass` `actively-exploited`

**CVE-2026-61979** (CVSS 8.1) and **CVE-2026-15981** (CVSS 9.8) in Xecurify's **miniOrange SAML 2.0 SP Single Sign-On** WordPress plugin let an unauthenticated attacker log in as **any user, including administrators**. 61979 is a signature-algorithm confusion — the plugin honors the SAML response's declared algorithm and treats the IdP's RSA public key as an HMAC shared secret; 15981 is a truthiness bug where `mo_saml_validate_signature()` treats OpenSSL's `-1` (processing error) as a valid signature. DigitalOcean's security team caught an anomalous admin session on Aug 16; Patchstack analyzed the chain, and attackers are running **opportunistic scans with a public PoC** against ~10k free + 30k paid installs. Patches exist, but paid editions got no explicit advisory and fix versions differ per edition.

**Why it matters:** SAML signature-validation logic keeps producing account-takeover chains, and "silent patches" plus edition-dependent versioning make this actively-exploited pair particularly hard for admins to remediate — a textbook reason to assume compromise on any exposed WordPress SSO.

[`🔗 The Hacker News`](https://thehackernews.com/2026/08/attackers-target-miniorange-saml-flaws.html) · [`🔗 SecurityWeek`](https://www.securityweek.com/wordpress-websites-targeted-via-miniorange-plugin-vulnerabilities/)

---

## 23. llama.cpp v0.3.0 — native dots3-note multimodal and a ggml 0.22.0 core

- **Velocity:** ▮▮ rising
- **Source:** GitHub · release v0.3.0 · ~1d ago (Aug 25)
- **Tags:** `llm` `inference` `llama.cpp` `multimodal` `open-source`

**llama.cpp v0.3.0** (ggml-org) landed: the `mtmd` multimodal library adds **dots3-note vision and audio** (a new DSA-ISWA KV cache type), WebP decoding via ffmpeg, a Pillow-accurate resize algorithm, and a fix for videos whose `moov` atom sits at end-of-file; **GLM-4.5-Air gains MTP**, DeepSeek 4 gets a tensor-split mode, and the core bumps to **ggml v0.22.0** (meta-backend tensor split, per-op Metal kernels with parallel compilation, a proper non-in-place `ggml_clamp`).

**Why it matters:** llama.cpp is the reference runtime for local inference everywhere — a first 0.x major bump in a long while, consolidating multimodal + video handling into the one binary most local-AI tooling builds on.

[`🔗 llama.cpp v0.3.0 release`](https://github.com/ggml-org/llama.cpp/releases/tag/v0.3.0) · [`🔗 lemmus.org`](https://lemmus.org/post/24898197)

---

## 24. ReWorld — an interactive world model that remembers where it showed you (arXiv 2608.23565)

- **Velocity:** ▮▮ rising
- **Source:** arXiv · 2608.23565 · ~1d ago (Aug 25)
- **Tags:** `research` `world-model` `video-generation` `memory` `arxiv`

**ReWorld** (HKUST-GZ + Alibaba, arXiv 2608.23565) separates *control* (short horizon) from *memory* (unbounded) in an interactive video-diffusion world model: most attention heads stay local while a few "global" heads attend across history, random chunk dropping makes sparse histories in-distribution, and inference memory is bounded by a **pose-indexed landmark bank** — the model retrieves landmarks nearest the current camera pose. It streams **704×1280** interactive video (4-step distillation, LoRA rank-128) and beats six recent interactive world models on action-following, long-horizon recall, and video quality — a 64-second out-and-back rollout still regenerates its starting view from a fixed 12-chunk cache. Inference code is on GitHub.

**Why it matters:** Long-horizon memory is the missing capability in interactive world models, and the pose-indexed landmark bank is a cheap, concrete mechanism for it — expect "remembers what it showed you" to become the next world-model benchmark axis.

[`🔗 arXiv 2608.23565`](https://arxiv.org/abs/2608.23565) · [`🔗 GitHub — zhifeichen097/ReWorld`](https://github.com/zhifeichen097/ReWorld)

---

## 25. CVE-2026-80138 — ClipBucket V5 installer command injection is unauthenticated RCE (CVSS 9.2 / 9.8)

- **Velocity:** ▮▮ rising
- **Source:** VulnCheck / Rapid7 · CVSS 9.2 · ~1d ago (Aug 25)
- **Tags:** `cve` `rce` `clipbucket` `installer` `command-injection`

**CVE-2026-80138** (CWE-78; CVSS 4.0 **9.2**, CVSS 3.1 **9.8**) — ClipBucket V5's web installer (`cb_install`) passes the `php_cli_filepath` parameter to shell execution without validation or escaping, so an **unauthenticated** attacker can POST a crafted value and run arbitrary OS commands as the web-server user. Affects versions 5.5.1 through 5.5.3-#153; fixed in **5.5.3-#154+**. Assigned by VulnCheck (credit Adam Nurudini) and described as trivial to exploit — full host compromise whenever the installer is reachable.

**Why it matters:** A leftover installer on an internet-facing video-hosting CMS is a standing RCE — "delete `cb_install` after setup" is the oldest hardening advice in the book, and this CVE is another instance of the setup page being the weakest link.

[`🔗 VulnCheck advisory`](https://www.vulncheck.com/advisories/clipbucket-v5-5.5.1-through-5.5.3-153-os-command-injection-via-installer-php-cli-filepath-parameter) · [`🔗 Rapid7`](https://www.rapid7.com/db/vulnerabilities/cve-2026-80138/) · [`🔗 IONIX`](https://www.ionix.io/threat-center/cve-2026-80138/)

---

## 26. C2PA camera authentication "does not survive contact with reality" — a rooted Pixel can mint valid signed photos

- **Velocity:** ▮▮ rising
- **Source:** HN · 104 pts · ~1d ago (Aug 25)
- **Tags:** `c2pa` `provenance` `security` `android` `photography`

David Buchanan's essay argues Google's **Pixel Camera C2PA Assurance Level 2** certification is unsound: the trust chain rests on Android Key Attestation and Play Integrity, but privilege-escalation bugs — he cites **CVE-2026-43499**, a one-click root exploit on fully-patched Pixels, reported 90+ days earlier — let anyone produce **C2PA-valid signed forgeries without hardware attacks**, and analog "photo of a screen" attacks defeat the system with zero skill. The HN thread (104 pts, 65 comments) debates whether cryptographic provenance can ever establish photographic truth — or whether signatures make the *unverified* look more suspect.

**Why it matters:** With provenance becoming the default answer to deepfakes, an implementation where a rooted device mints valid signatures means "C2PA-signed" ≠ "authentic" — a fundamental trust-model caveat for every platform and policy betting on the standard.

[`🔗 da.vidbuchanan.co.uk — essay`](https://www.da.vidbuchanan.co.uk/blog/android-c2pa.html) · [`🔗 Hacker News`](https://news.ycombinator.com/item?id=49439499)

---

## 27. Python's str.lower() diverges from IDNA 2003 — CVE-2026-17084, a Unicode version-anchoring bug

- **Velocity:** ▮ steady
- **Source:** Seth Larson blog · HN 46 pts · ~1d ago
- **Tags:** `python` `idna` `unicode` `cve` `security`

Seth Larson (PSF Security Developer-in-Residence) details **CVE-2026-17084**: the `stringprep`/IDNA 2003 codec (`str.encode('idna')`) used `str.lower()` for RFC 3454 case-folding, but `str.lower()` follows the interpreter's Unicode version (17.0) instead of the spec's pinned **Unicode 3.2.0**. The same visible input encodes to different Punycode under different Unicode versions (e.g. `"ᎠᎠ"` → `xn--58da` vs `xn--kz9aa`) — a parser differential usable for homoglyph/phishing, allowlist bypass, or SSRF-style confusion. The fix anchors case-folding to Unicode 3.2.0 only within StringPrep (CPython PR #155293, backported to 3.14/3.15); NVD classifies it **CWE-436** interpretation conflict.

**Why it matters:** "Version anchoring" — a spec pinning an old Unicode version while code follows the current one — is a quiet class of security bug, and the recommendation is to move off the IDNA 2003 codec to the IDNA 2008 `idna` package.

[`🔗 sethmlarson.dev`](https://sethmlarson.dev/when-str-lower-is-a-security-vulnerability) · [`🔗 CPython PR #155293`](https://github.com/python/cpython/pull/155293) · [`🔗 HN`](https://news.ycombinator.com/item?id=49440410)

---

## 28. ERPO — Alibaba regularizes RL on the query side instead of the response (arXiv 2608.23311)

- **Velocity:** ▮ steady
- **Source:** arXiv · 2608.23311 · ~1d ago
- **Tags:** `research` `rl` `rhlf` `optimization` `alibaba`

**ERPO** (arXiv 2608.23311, accepted to EMNLP 2026) replaces the action-side **Policy-KL** regularizer in LLM policy optimization with a **Query-KL** penalty on the query distribution the current policy induces — because the QKL gradient flows only through query likelihood, it places no direct pressure on the response distribution, so exploration is preserved. It is estimator-agnostic and plugs into GRPO/PPO/REINFORCE without extra forward passes. On six math benchmarks (Qwen2.5-Math-7B, 240 steps) it scores **0.336 vs 0.274** GRPO baseline; under 960+ step training GRPO's KL explodes and accuracy collapses after ~480 steps while ERPO stays stable. Code open-sourced (AlibabaResearch/ERPO).

**Why it matters:** The stability–exploration trade-off is the core RLHF bottleneck — bounding *query* drift instead of *response* drift is a cheap, general change that measurably stabilizes long training runs.

[`🔗 arXiv 2608.23311`](https://arxiv.org/abs/2608.23311) · [`🔗 GitHub — AlibabaResearch/ERPO`](https://github.com/AlibabaResearch/ERPO)

---

## 29. CVE-2026-79992 — Emacs TRAMP shell injection via crafted filenames (CVSS 7.8)

- **Velocity:** ▮ steady
- **Source:** Red Hat / NVD · CVSS 7.8 · ~1d ago (Aug 25)
- **Tags:** `cve` `emacs` `tramp` `command-injection` `local`

Red Hat disclosed **CVE-2026-79992** (CWE-78, CVSS 7.8): Emacs **TRAMP** concatenates login arguments without sanitization before passing them to a local shell, so a local attacker who gets you to open a **maliciously crafted filename** (via the "user" field) achieves shell command injection and arbitrary code execution. Affects RHEL's `emacs` package (RHEL 9/10 listed as affected); no fix yet in supported channels — the mitigation is to avoid processing untrusted filenames.

**Why it matters:** The editor's remote-file layer is the injection surface — a reminder that "local" tools that shell out to handle remote paths need the same input-sanitization discipline as network services, and untrusted filenames are the new untrusted HTML.

[`🔗 Red Hat CVE`](https://access.redhat.com/security/cve/cve-2026-79992) · [`🔗 NVD`](https://nvd.nist.gov/vuln/detail/CVE-2026-79992)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-08-26T12:03:00Z |
| Items | 29 |
| Sources tracked | 44 (CISA KEV, CyCognito, GitHub, Qualys, livethreat.ai, Apple Newsroom, Wccftech, iThome, IBM, ic.work, MongoDB, 至顶网, arXiv, AITNT, 证券日报, smzdm, VulDB, dev.to, GitHub Advisory, herdr.dev, OpenGithubs, explainx.ai, Alibaba Cloud, Higress, benchlm.ai, SciRate, ifeng, 17173, 163.com, openai.com, TechCrunch, VentureBeat, SiliconANGLE, The Hacker News, SecurityWeek, lemmus.org, VulnCheck, Rapid7, IONIX, da.vidbuchanan.co.uk, HN, sethmlarson.dev, Red Hat, NVD) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[Previous day](../2026-08-25/) · [Raw .md](../2026-08-26.md) · [Archive](../../archive/)
