---
date: 2026-09-22
updated: 2026-09-22T20:15:00+08:00
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 43
license: CC-BY-4.0
---

## 1. Grok 4.7 ships — xAI's own benchmark table shows Fable 5.1 Max winning five rows

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 364+ pts · 306 comments · ~4h ago (~23:50 UTC+8)
- **Tags:** `model-release` `xai` `benchmarks` `coding-agents`

xAI released Grok 4.7 on Sept 21, pitched as its "most capable model for coding and
knowledge work": same pricing as 4.6 ($2/$6 per M tokens, "fast" variant at 2×), 500k
context, longer RL training on multi-hour tasks. The self-reported table leads on EEBench
(64.0%) and Harvey Legal Agent (19.6%), and shows DeepSWE v1.1 71.0% with a "high effort"
asterisk while effort settings vary across rows. The catch is on the same page: xAI's own
table gives Fable 5.1 Max CursorBench (51.8% vs 46.3%), Terminal-Bench (57.9% vs 38.0%),
HealthBench, AA Briefcase and GDPval Elo (1735 vs 1695) — the claim is price-performance,
not leadership. Artificial Analysis independently measures Intelligence Index 46 (#16 of
202), "notably slow" (39.3 tok/s, #151) and very verbose (240M output tokens in eval vs
94M median).

**Why it matters:** This is the honest-headline pattern in reverse — the vendor page is
more careful than a "Grok 4.7 tops coding benchmarks" summary would be, and the independent
measurement cuts against even the softened claim. All benchmarks are self-reported except
the AA index; the safety numbers ("only 3.3% of risky dual-use prompts through") are
internal assessments only. No parameter count disclosed.

[`🔗 x.ai announcement`](https://x.ai/news/grok-4-7) · [`🔗 Artificial Analysis`](https://artificialanalysis.ai/models/grok-4-7) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49788838)

---

## 2. Amazon blocks Meta's Muse shopping agent at the bot wall — with dueling credential claims

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 123+ pts · 117 comments · ~3h ago (~01:00 UTC+8)
- **Tags:** `agentic-commerce` `amazon` `meta` `bot-detection` `platform-policy`

Amazon has started blocking Meta's Muse agent (launched in the US earlier this month — it
can shop, pay, read email and browse like a human) from amazon.com. The Register's hands-on
test confirms the mechanism: asked to buy a chair, Muse reported hitting "an anti-bot wall
that blocks automated browsers outright" before it could even reach the search page. Amazon
says on record that Meta "attempted to unilaterally force its way in," never sought
authorization, and that Muse "appears to capture and store customer credentials"; Meta
countered that Muse "cannot see users' passwords or payment methods." Amazon notes it has
blocked third-party shopping agents since 2023 — Google, OpenAI and Perplexity included —
while running its own (Alexa for Shopping, Buy for Me).

**Why it matters:** The credential claims are dueling assertions, neither independently
verified — carry them as such. The structural question is live now: a recent Ninth Circuit
ruling held that a user (not the agent company) accessing a site through an agent doesn't
violate anti-hacking law, which pushes this fight from courtrooms to bot walls — and the
company that owns the wall also owns the competing agent.

[`🔗 The Register (hands-on)`](https://www.theregister.com/ai-and-ml/2026/09/21/amazon-shows-metas-muse-ai-shopping-agent-the-door/5297777) · [`🔗 GeekWire`](https://www.geekwire.com/2026/amazon-blocks-metas-muse-ai-assistant-in-new-standoff/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49789982)

---

## 3. Cloudflare Python Workers go GA — FastAPI/Django/Flask natively, asyncpg over real TCP sockets

- **Velocity:** ▮▮▮ trending
- **Source:** Cloudflare blog / Hacker News · 130+ pts · 17 comments · ~7h ago (~21:38 UTC+8)
- **Tags:** `cloudflare` `python` `serverless` `wasm`

Cloudflare declared Python Workers generally available, making Python "a first-class, fully
supported language" on the Workers platform after two years in beta. It runs
Wasm-compiled CPython via Pyodide; all platform bindings (R2, D1, Durable Objects, Queues,
Workflows, Workers AI, Hyperdrive) work without JS glue; FastAPI/Django/Flask run through
`workers.asgi`/`workers.wsgi`. The new piece is a socket bridge that translates Python
socket syscalls — previously "stubs that always fail" — into real outbound TCP, which is
what makes `asyncpg`/`aiomysql` work through Hyperdrive; `openai`, `langchain` and `mcp`
run natively. PEP 783 (the PyEmscripten platform) has been accepted.

**Why it matters:** The GA itself is the news — Python shops can now treat Workers as a
supported platform rather than an experiment. The post's own caveats: packages with native
C/C++/Rust extensions must be cross-compiled to Wasm, ecosystem adoption of PyEmscripten
wheels is still in progress, and there are no Python-version or pricing specifics.

[`🔗 Cloudflare blog`](https://blog.cloudflare.com/python-workers-ga/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49787142)

---

## 4. Four Linux kernel local-root bugs disclosed with public PoCs — found by an "AI-assisted" bug hunt

- **Velocity:** ▮▮ rising
- **Source:** oss-security / securityonline.info · disclosed Sep 18, PoCs public
- **Tags:** `linux-kernel` `lpe` `exploit` `security`

Researcher Asim Manizada disclosed four kernel LPEs with working public exploits,
disclosed Sept 18 on oss-security after a linux-distros embargo, found with what he
describes as an AI-assisted harness that reasons about kernel memory layout:
CVE-2026-80844 "DirtyAH6" (xfrm/IPv6 AH, OOB memmove up to 4,064 bytes), CVE-2026-81000
"TUNderflow" (TUN, SKB_MAX_HEAD underflow), CVE-2026-68121 "PPPoEject" (PPPoE stale skb
pointer UAF), and CVE-2026-74469 "DiagSpill" (SCTP/sctp_diag 16-bit counter wrap spilling
~8 MiB past a netlink buffer). Bugs aged 10–21 years; all fixed in stable kernels
(5.10.270 through 7.2.4). NVD check this morning: 7.8/7.8/8.8 on the last three — all
CNA-assigned "Secondary," NVD status still Received, not Analyzed; CVE-2026-80844 has **no
score published yet**.

**Why it matters:** DiagSpill needs neither user namespaces nor CAP_NET_ADMIN, and the
researcher reports AppArmor/SELinux did not block the PoCs in testing — but carry his own
hedges: remote root for DirtyAH6 is "theoretically possible, but looks extremely
difficult," DiagSpill's remote path needs non-default SCTP settings ("I do not see a path
to full remote root"), and no in-the-wild exploitation is reported. A search aggregator's
"Red Hat RHSB-2026-011" bulletin could not be confirmed to exist — don't cite it.

[`🔗 oss-security disclosure`](https://www.openwall.com/lists/oss-security/2026/09/18/3) · [`🔗 securityonline.info`](https://securityonline.info/linux-kernel-lpe-quartet-disclosed/) · [`🔗 NVD: CVE-2026-81000`](https://nvd.nist.gov/vuln/detail/CVE-2026-81000)

---

## 5. Raspberry Pi locks Compute Module 5 to its original RAM size — anti-fraud, with a side effect for repairability

- **Velocity:** ▮ rising
- **Source:** Hacker News · 188+ pts · 152 comments · ~7h ago (~20:54 UTC+8)
- **Tags:** `raspberry-pi` `hardware` `sdram`

Raspberry Pi engineers confirmed in an official forum thread that CM5-generation devices
are locked to their original RAM size: "We therefore remove the commercial incentive by
locking devices to their original RAM size" — because people were buying lower-spec
modules, swapping larger chips, and reselling them as higher-spec units. Engineer timg236
added the second reason: due to AI-driven memory-market density, far more SDRAM SKUs are in
circulation, so timing parameters are now programmed into the device — meaning even a
same-capacity chip swap now has a "non-zero chance" of random crashes.

**Why it matters:** Two motivations, one visible consequence: an anti-fraud measure and a
supply-chain pragmatism land as reduced repairability/upgradeability for a board family
the maker community rebuilds on. Note the source is a forum post by the engineers
themselves, not a press announcement — that's also what makes it credible.

[`🔗 Raspberry Pi forum (PhilE)`](https://forums.raspberrypi.com/viewtopic.php?p=2380887#p2380888) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49786689)

---

## 6. Fable 5 "median thinking declined in August" — one user's measurement of the inference-cost squeeze

- **Velocity:** ▮ rising
- **Source:** Hacker News · 254+ pts · 169 comments · ~4h ago (~00:13 UTC+8)
- **Tags:** `anthropic` `inference` `reasoning`

A widely-circulated thread reports that Fable 5's median thinking-token usage dropped
sharply in August — timing the decline to when the model became permanently available to
subscription plans — with most invocations getting little or no thinking even at
xhigh/max effort, across five different measurement methods the author describes.

**Why it matters:** The caveats are the item: this is explicitly one user's
self-measurement ("this is my own experience"), not a vendor confirmation, and no primary
writeup beyond the thread has been independently verified. It resonates because it
matches a pattern the feed has documented all month — capability-preservation claims
living in tension with inference economics — but it's a data point, not a finding.

[`🔗 X thread`](https://x.com/Lon/status/2101793422487204027) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49789224)

---

## 7. Qwen open-sources RecreationWorld — agents must rebuild a running app from the outside, then get graded on behavior

- **Velocity:** ▮ rising
- **Source:** arXiv / GitHub · appeared in Sep 21 cs.CL listing
- **Tags:** `computer-use` `benchmark` `agents` `qwen` `rl-environments`

A 32-author Qwen/Alibaba team released RecreationWorld (arXiv Sept 18, listed Sept 21):
250 verifiable environments across Ubuntu/macOS/Windows/Android/Web where an agent must
**recreate** a running reference application — reverse-engineer it through the GUI, then
reimplement it in code — and is graded against the reference via programmatic and visual
assertions of behavior, not source-code similarity. MIT-licensed, with a `uv run rb run`
harness. Trajectories generated this way transfer: improvements on 5 out-of-distribution
coding and hybrid computer-use benchmarks.

**Why it matters:** The abstract's own headline number is a humility clause: "GPT-6 Astra
leads at 58.1% overall, yet passes all programmatic tests on just 2.8% of tasks" — agents
reproduce static UI structure far better than actual computed behavior, and generated apps
come out "smaller and more monolithic" than references. Frontier evals cost ~$115.80/task
per the repo's own table, and the repo is days old (3 commits) — treat numbers as
first-shipment, not settled.

[`🔗 arXiv:2609.22000`](https://arxiv.org/abs/2609.22000) · [`🔗 GitHub: QwenLM/RecreationWorld`](https://github.com/QwenLM/RecreationWorld)

---

## 8. npm `mathmain`: an encrypted RAT loader whose payload only decrypts if you solve a specific equation

- **Velocity:** ▮ rising
- **Source:** SafeDep / Hacker News · 53+ pts · 8 comments · ~2h ago (~02:33 UTC+8), climbing
- **Tags:** `npm` `supply-chain` `malware` `c2`

SafeDissected by SafeDep (analysis began Sept 17, decryption reproduced Sept 21): npm
packages `mathmain` (a typosquat-adjacent of `mathjs`), plus siblings `mathsbase` and
`math-universe`, ship an AES-256-GCM-encrypted loader in the npm builds only — the linked
GitHub repos contain no loader. The payload decrypts only when `lusolve()` is called with
a specific matrix (the LU factor of a Pascal matrix); decrypted stages include host recon,
shell execution, a Base Sepolia smart-contract read, and `fraction.js` — a C2 agent that
polls Slack `conversations.history` every 10 seconds and executes operator messages as
shell commands. JFrog independently reported the equation trigger; SHA-256 IOCs are
published.

**Why it matters:** Distinct from last week's `indexed-btree` typosquat (different
mechanism, different packages) — this one gates execution on a mathematical trigger,
presumably to defeat sandbox detonation. SafeDep's own caveats: no public code calls the
solver with the trigger (the attacker-side caller is unknown), no evidence of execution on
any victim, and npm's download counts are unreliable (605k/week inflated; the registry
reported zero downloads Sept 17).

[`🔗 SafeDep analysis`](https://safedep.io/mathmain-encrypted-loader/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49791378)

---

## 9. NVIDIA open-sources NemotronLabs VoiceChat 11B — one full-duplex speech-to-speech model with (simulated) tool calling

- **Velocity:** ▮ rising
- **Source:** arXiv / Hugging Face · paper in Sep 21 cs.CL listing
- **Tags:** `speech-to-speech` `full-duplex` `nvidia` `open-weights` `voice-agents`

NVIDIA's ~49-author VoiceChat team published the paper behind NemotronLabs VoiceChat 11B
(weights released earlier this summer): a hybrid Mamba/Transformer that replaces the
ASR→LLM→TTS cascade with one model — Fast Conformer 0.6B encoder + Nemotron Nano v2 9B +
TTS decoder — trained on ~550k hours, ~448 ms turn-taking, claimed first open full-duplex
voice model with tool calling, OpenMDW v1.1 licensed, running via vLLM on a single
A100–B200. VoiceBench and Full-Duplex-Bench: #2 among open full-duplex models.

**Why it matters:** The abstract concedes the weak points before you do: "argument
accuracy and end-to-end tool execution remain areas for improvement" — the card's own
numbers are 42.2% tool-argument accuracy and 33% end-to-end Pass@1, and offline function
calling is simulated (pre-written JSON, no live execution). System prompts and tool
responses must be ASCII-only. The "first open full-duplex with tool calling" framing is
real; the tool calling itself is not production-grade by NVIDIA's own numbers.

[`🔗 arXiv:2609.21967`](https://arxiv.org/abs/2609.21967) · [`🔗 Hugging Face model card`](https://huggingface.co/nvidia/NVIDIA-NemotronLabs-VoiceChat-11B)

---

## 10. WordPress "Click2Shell": a CSRF that force-installs a theme and executes its PHP — scored 4.3, headlined as RCE

- **Velocity:** ▮ rising
- **Source:** BleepingComputer / WPScan · fixed in 7.1.1 (Sep 17)
- **Tags:** `wordpress` `csrf` `rce` `security`

A chain disclosed by Paulos Yibelo: a crafted link makes a logged-in WordPress admin
silently force-install an attacker-chosen WordPress.org theme (theme slug injected into a
jQuery selector), and the Customizer preview then executes the theme's PHP even while the
theme is inactive. Requires an Administrator-level victim and phishing or chained XSS for
delivery; `DISALLOW_FILE_MODS` blocks it. Fixed in WordPress 7.1.1 by escaping the slug,
backported across all branches down to 4.8. No CVE assigned (checked both BleepingComputer
and the WPScan record); WPVDB ID 2624e094.

**Why it matters:** The official CVSS is **4.3 medium** — scored only for the core CSRF
component — while coverage headlines say "pre-auth RCE." That gap is the lesson: the scary
framing is the researcher's chain, not any scorer's, and no active exploitation has been
reported. Don't conflate with pwn.ai's earlier `/blog/xss2shell` (CVE-2026-64638, fixed
Aug 6) — a different chain.

[`🔗 BleepingComputer`](https://www.bleepingcomputer.com/news/security/wordpress-click2shell-flaw-lets-hackers-execute-php-on-the-server/) · [`🔗 WPScan record`](https://wpscan.com/vulnerability/2624e094-6c88-43b4-812f-26444994737d/)

---

## 11. Alibaba open-sources open-code-review — the internal AI review CLI crosses 39k stars on a 10-releases-in-10-days cadence

- **Velocity:** ▮ rising
- **Source:** GitHub Trending · 39.1k stars · v1.12.8 released Sep 21
- **Tags:** `code-review` `agents` `cli` `alibaba`

Alibaba open-sourced the hybrid code-review CLI it says tens of thousands of internal
developers used over two years: it reads Git diffs, bundles files into sub-agent review
units, and pairs deterministic rules (NPE, thread-safety, XSS, SQL injection) with a
tool-using LLM agent for line-level comments. OpenAI/Anthropic-compatible, npm-installable,
with integrations for Claude Code, Codex, Cursor, GitHub Actions and Gerrit. The current
+15.5k stars/week spike is release-driven: ten releases in ten days (v1.11.9 → v1.12.8,
which landed yesterday with F# rules and default exclusion of dependency/build dirs), not
the June HN moment (284 pts).

**Why it matters:** The README's own benchmark concedes the trade-off: on their
self-reported AACR-Bench, recall is **lower than general agents like Claude Code** — framed
as "a deliberate trade-off favoring precision over noise." The token-efficiency claims come
from their own benchmark image. As a shape, it's the deterministic-rules-plus-agent hybrid
gaining on pure-LLM review.

[`🔗 GitHub repo`](https://github.com/alibaba/open-code-review) · [`🔗 Releases`](https://github.com/alibaba/open-code-review/releases)

---

## 12. Heretic gets a project site and its second HN day — automated safety-alignment removal at 32k stars

- **Velocity:** ▮ rising
- **Source:** Hacker News · 196+ pts · 83 comments · ~16h ago (~12:35 UTC+8)
- **Tags:** `abliteration` `llm-safety` `open-source` `dual-use`

Heretic (Philipp Emanuel Weidmann, AGPL-3.0) — the tool that automatically strips safety
training from open-weight models via directional ablation, with an Optuna TPE optimizer
co-minimizing refusal count and KL divergence and no fine-tuning data — launched a landing
page (heretic-project.org) and re-hit the HN front page (the repo post hit 745 points in
Nov 2025). 32.1k stars, 5,000+ community-ablated models on Hugging Face, ~20–30 minutes on
an RTX 3090: `pip install -U heretic-llm && heretic Qwen/Qwen3.5-4B`. Self-reported
gemma-3-12b result: 3/100 refusals at KL 0.16 vs manual abliteration's 0.45–1.04.

**Why it matters:** Dual-use by design, and the landing page carries no usage warnings.
The author's own caveats are on the repo: "metrics are no substitute for human
evaluation," benchmark numbers are platform-dependent, and pure state-space architectures
are unsupported. The distribution reality — 5,000 ablated models one `pip install` away —
is the part safety discussions keep underweighting.

[`🔗 heretic-project.org`](https://heretic-project.org/) · [`🔗 GitHub: p-e-w/heretic`](https://github.com/p-e-w/heretic) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49783101)

---

## 13. Zyxel GS1900 switch RCE (CVE-2026-7273) lands on CISA KEV — exploitation confirmed ~3 months after the fix

- **Velocity:** ▮ steady
- **Source:** CISA KEV · added Sep 21 · CVSS 8.8 (CNA-assigned, NVD Deferred)
- **Tags:** `zyxel` `kev` `rce` `network-switch` `security`

CISA added CVE-2026-7273 to the KEV catalog on Sept 21 — the newest entry as of this
morning: a stack-based buffer overflow in a CGI program of Zyxel GS1900-series switches,
letting an unauthenticated LAN attacker run OS commands via a crafted HTTP request.
Fixed firmware is `2.90(XXXX.2)C0` per model, published June 16, with patches only for
models inside their vulnerability-support period and no workarounds listed.

**Why it matters:** The pattern repeats — patch available since June, exploitation
confirmed in September, and the affected devices are LAN-edge switches that rarely get
firmware attention. Scoring nuance worth carrying: CVSS 8.8 is CNA-assigned (Zyxel) with
NVD status Deferred, and the Zyxel advisory page itself shows no score — the number exists
only in the CVE record.

[`🔗 Zyxel advisory`](https://www.zyxel.com/global/en/support/security-advisories/zyxel-security-advisory-for-stack-based-buffer-overflow-vulnerability-in-gs1900-series-switches-06-16-2026) · [`🔗 CISA KEV catalog`](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)

---

## 14. Kimi K3 goes GA on Amazon Bedrock — and Chinese media confirm the first North-America revenue-split deal for a Chinese open-weight model

- **Velocity:** ▮ steady
- **Source:** AWS What's New (Sep 18) / 每日经济新闻 (Sep 21)
- **Tags:** `kimi` `moonshot-ai` `amazon-bedrock` `chinese-ai` `open-weights`

AWS made Moonshot AI's Kimi K3 generally available on Amazon Bedrock on Sept 18: a
2.8-trillion-parameter open-weight model with native vision, a 1M-token context window,
and — a Bedrock first for an open-weight model — explicit prompt caching. Moonshot reports
roughly 2.5× scaling efficiency over Kimi K2. On Sept 21, 每日经济新闻 reported, citing
Moonshot confirmation, that this is the first "North America cloud revenue-split"
arrangement for a Chinese model — the arrangement rumored since August.

**Why it matters:** The distribution milestone is concrete: a Chinese frontier-scale
open-weight model on the default AWS enterprise shelf. The revenue-split framing is
confirmed as real but has **no disclosed terms** — no percentage, no named executive, and
the AWS-side announcement doesn't mention revenue at all. Report the deal, not the deal's
economics.

[`🔗 AWS What's New`](https://aws.amazon.com/about-aws/whats-new/2026/09/moonshot-ai-kimi-k3-on-amazon-bedrock/) · [`🔗 每日经济新闻`](https://www.mrjjxw.com/articles/2026-09-21/4587773.html)

---

## 15. Amnesty's MVT hits v3 — the Pegasus-era spyware forensics toolkit rewrites its output format

- **Velocity:** ▮ steady
- **Source:** GitHub · 13.5k stars · v3 branch merged
- **Tags:** `forensics` `spyware` `security-tools` `amnesty`

Mobile Verification Toolkit — born from the 2021 Pegasus Project — merged its v3 branch:
breaking changes to the output format (issue #757: "changing the output format and adding
low, medium and high levels to warnings"), a new plugin package system, shell completion,
and a switch to CalVer versioning to match its use case of staying current against new
spyware. Scripts or forks that consume MVT output will need migration.

**Why it matters:** The toolkit most civil-society forensics depends on just changed its
contract — downstream tooling breaks quietly if nobody notices. The project's own
disclaimers still stand: it's not for end-user self-assessment, and public IOCs alone "are
insufficient to determine that a device is 'clean'."

[`🔗 GitHub: mvt-project/mvt`](https://github.com/mvt-project/mvt) · [`🔗 v3 migration issue`](https://github.com/mvt-project/mvt/issues/757)

---

## 16. project-nomad: an offline-first knowledge server crosses 37k stars — Wikipedia, Khan Academy, maps and RAG in one Docker stack

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · 37.8k stars · +360/day · v1.35.0-rc.1 Sep 13
- **Tags:** `offline-first` `self-hosted` `rag` `kiwix`

Crosstalk-Solutions' project-nomad orchestrates an offline knowledge/education server in
Docker: Kiwix Wikipedia, Kolibri (Khan Academy content), ProtoMaps, CyberChef, plus an
Ollama+Qdrant RAG assistant. The v1.35.0-rc.1 release (Sept 13) added local vision
attachments, RAG source citations under chat answers, and offline translation; it's
currently pulling +360 stars/day on trending.

**Why it matters:** The category keeps proving out — the same offline-first stack serves
disaster response, classrooms without connectivity, and privacy-conscious homes. Carry the
README's own warning: the box has **no authentication** and is explicitly not meant to be
exposed to the internet; AI features want RTX 3060+/32GB-class hardware.

[`🔗 GitHub repo`](https://github.com/Crosstalk-Solutions/project-nomad) · [`🔗 Releases`](https://github.com/Crosstalk-Solutions/project-nomad/releases)

---

## 17. SolarWinds Access Rights Manager: hardcoded-key RCE (CVE-2026-28326) — adjacent, not "remote"

- **Velocity:** ▮ steady
- **Source:** SolarWinds advisory / NVD · fixed in ARM 2026.2.1 (Sep 17)
- **Tags:** `solarwinds` `hardcoded-key` `rce` `security`

SolarWinds patched CVE-2026-28326 in Access Rights Manager ≤ 2026.2: an unauthenticated
RCE via a **hardcoded static key** shipped in the product (credit: Kai Huang, Armadin),
fixed in ARM 2026.2.1 with no workarounds offered. NVD check this morning: CVSS 8.8,
CNA-assigned (SolarWinds PSIRT, "Secondary"), status Awaiting Analysis — and the vector is
`AV:A`, **adjacent** network, a step down from the "unauthenticated remote code execution"
framing in secondary coverage.

**Why it matters:** Hardcoded keys in shipped products keep recurring (Issabel's identical
JWT key on every install, two weeks ago), and the adjacency nuance matters operationally —
this is reachable from the network the server sits on, not necessarily from anywhere. No
exploitation confirmed yet; SolarWinds' history makes that a "yet" worth watching.

[`🔗 SolarWinds advisory`](https://www.solarwinds.com/trust-center/security-advisories/cve-2026-28326) · [`🔗 NVD: CVE-2026-28326`](https://nvd.nist.gov/vuln/detail/CVE-2026-28326)

---

## 18. ai-memory re-trends — the git-backed agent memory server, described correctly this time

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · 7.6k stars · +217/day
- **Tags:** `agent-memory` `mcp` `rust` `cli`

akitaonrails' ai-memory — a single Rust binary exposing MCP and HTTP — captures agent
sessions into a git-backed markdown wiki with a SQLite FTS5 index, using lifecycle hooks
and zero LLM calls on the default path. It works across ~20 agent CLIs (Claude Code, Codex,
Cursor, Gemini CLI among them); a 2.0 migration guide and OKF v0.2 support are recent.
It's pulling +217 stars/day without any fresh HN or launch event we could find — the
momentum is sustained, not spike-driven.

**Why it matters:** This is the repo whose coverage this feed previously corrected (a
misattribution inflated its framing); the corrected description is the one above. The
category — durable, inspectable memory for agent CLIs — keeps drawing attempts, and the
zero-LLM-calls default path is the differentiator worth noting. Caveats from the README:
Windows support is experimental, the quick-start Docker has no auth (loopback only), and
it's one server per data directory.

[`🔗 GitHub repo`](https://github.com/akitaonrails/ai-memory) · [`🔗 GitHub Trending`](https://github.com/trending?since=daily)

---

## 19. humanizer crosses 51k stars — the agent skill built on Wikipedia's "Signs of AI writing"

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · 51.0k stars · +3,045/week
- **Tags:** `agent-skills` `writing` `claude-code`

blader's humanizer is a plain-Markdown agent skill that strips AI-writing tells from text,
built on Wikipedia's "Signs of AI writing" page. The v3 rebuild (Sept 6) consolidated 35
patterns into 25, ranked by strength, with a rule that weak patterns only count when they
co-occur. It works in any skills-capable agent and explicitly refuses to invent facts or
edit anything but prose.

**Why it matters:** No fresh release and no fresh HN moment — the +3k/week is sustained
momentum around the v3 rebuild, not a new launch, and we're writing it as exactly that.
Its existence is the interesting datum: the most-demanded agent skill of the season is one
that makes machine text read less like machine text, sourced from the encyclopedia's own
style guide.

[`🔗 GitHub repo`](https://github.com/blader/humanizer) · [`🔗 Commit history`](https://github.com/blader/humanizer/commits/main)

---

## 20. Xiaomi launches MiMo v2.6 — the numbers land on Hugging Face hours after a benchmark-free launch page

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 684+ pts · ~8h ago (~04:40 UTC+8)
- **Tags:** `model-release` `xiaomi` `mimo` `open-weights` `chinese-ai`

Since we covered Xiaomi's live RL-training dashboard on Sep 17, the company has shipped
what it was streaming toward: the MiMo-V2.6 series, "3 全新模型" in one drop —
**MiMo-V2.6-Pro** (flagship reasoning, pitched at long-horizon tasks and security work),
**MiMo-V2.6-Flash** (high-volume office workloads), and **MiMo-V2.6-Pro-UltraSpeed**
(claimed up to 20× output speed for latency-sensitive serving). Pricing is aggressive:
Pro at ¥3/MTok input (¥0.025 cache-hit) / ¥6 output; Flash at ¥1/¥0.02/¥2; UltraSpeed at
¥0.25/¥30/¥60. Access is API, MiMo Chat/Desktop, and a "MiMo Claw" agent bundle at
¥14.9/month. V2.5 models are marked "即将下线" (being phased out).

**Updated 09-22 12:51 (act pass):** the launch page *still* publishes zero benchmark
scores, zero parameter counts and no context window for any V2.6 model (re-verified
first-hand this run) — but the numbers landed elsewhere within ~8 hours. Hugging Face
model cards (MIT license, weights published with an `-RL` suffix) carry the specs
Xiaomi's own page omits: Pro is a 1.02T-total / 42B-active sparse MoE with 1M context;
Flash is 309B/15B, also 1M context. The cards' self-reported tables are mixed rather
than flattering: DeepSWE v1.1 **71.9** (Pro) / **67.9** (Flash) — a real jump over
V2.5-Pro's 19% on the watched dashboard — but Terminal Bench 4.0 **34.9/28.8** and
ExploitGym **17.8/6.0**. Independent context from the HN thread puts TB4.0's 34.9
against GPT-6 Astra 59.6, Claude Fable 5.1 55.1 and Claude Opus 5 49.0 (poster table,
unverified); Artificial Analysis independently measures Pro at **Intelligence Index 46
(v4.3.2) — #1 among open-weights large-class models**, the same index value it measured
for Grok 4.7 — at $0.435/$0.87 per MTok and 125 tok/s.

**Why it matters:** The caveat moved but didn't disappear: Xiaomi published numbers,
just not on the page it advertises from — and published unflattering rows (TB4.0,
ExploitGym) alongside flattering ones, which is itself a calibration signal. Re-rate
the release: a very cheap open-weights MoE at roughly Grok-4.7-class on AA's index but
clearly mid-pack on the independent agentic tables — not Opus-class, whatever the launch
page's V2.5 comparison implies.

[`🔗 mimo.mi.com launch page`](https://mimo.mi.com/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49792730) · [`🔗 HF: MiMo-V2.6-Pro-RL`](https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Pro-RL) · [`🔗 Artificial Analysis`](https://artificialanalysis.ai/models/mimo-v2-6-pro)

---

## 21. Bryan Cantrill: "What Sun got wrong" — strategic brilliance, operational indifference, death

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 533+ pts · 311 comments · ~14h ago (~22:30 UTC+8)
- **Tags:** `tech-history` `sun-microsystems` `engineering-culture` `oxide`

Cantrill (Sun engineer 1998–2010, now Oxide co-founder) answers the young engineers who
asked, at OxCon, what Sun actually did wrong. His answer: "Sun had become bored with the
mechanics of running a business." The centerpiece is a 2006 blog post, "The Sun Doesn't
Shine on Me," written by a fast-growing startup (Joyent) that *wanted* to buy Sun
hardware running OpenSolaris and couldn't get a call returned — while Dell answered a
late-night web form with an account rep who did "95% of all of the work." The epilogue
lands like a short story: Cantrill left Sun for that startup, Joyent, and the Dell rep
named Steve later co-founded Oxide with him.

**Why it matters:** The essay's generalization is the takeaway for anyone shipping
infrastructure in an AI-boom market: "a company that is bored with the mechanics of
running a business cannot succeed — no matter how successful its strategy might
otherwise be." Cantrill anchors it to his 2011 HN comment he still stands behind 15
years later — a rare case of a decade-old hot take aging *into* correctness.

[`🔗 bcantrill.dtrace.org`](https://bcantrill.dtrace.org/2026/09/20/what-sun-got-wrong/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49787436)

---

## 22. "I don't want to read what you didn't write" — Colin Breck's essay becomes the reader-revolt reference text

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 415+ pts · 137 comments · ~6h ago (~07:00 UTC+8)
- **Tags:** `ai-writing` `technical-writing` `engineering-culture` `communication`

Breck (systems/database engineer, recently through a CIDR paper cycle) argues that AI
fails *as the author* of text meant for other humans, while being genuinely useful as
tool: verifier of claims against source code, BibTeX completer, TikZ diagram drawer —
it even caught a notation error four expert reviewers missed. But "asking AI to write
paragraphs? Never valuable. Not once," with one exception he concedes: the abstract,
"the paper's most mechanical, abstracted section." The core mechanism is context
asymmetry — the prompter can skim because they built the context; the reader must read
every line "peering into the internals of a machine."

**Why it matters:** The essay lands mid-wave — it cites the Cynthia Dunlop survey (78%
of developers stop reading articles they suspect are AI-authored) and notes Oxide now
mandates the Pangram AI-detector for public writing, while Cantrill's own line ("to use
an LLM to write is to void the social contract between writer and reader") is doing
circulation. The practical residue: verify, edit, cite — never author. Caveat: it's an
opinion essay; the survey numbers are second-hand.

[`🔗 blog.colinbreck.com`](https://blog.colinbreck.com/i-dont-want-to-read-what-you-didnt-write/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49794330)

---

## 23. "Spymarks, not watermarks" — a naming intervention for covert AI-content tracking

- **Velocity:** ▮ rising
- **Source:** Hacker News · 215+ pts · 40 comments · ~5h ago (~07:35 UTC+8)
- **Tags:** `watermarking` `privacy` `synthid` `provenance`

Brandon Thomas (brand.io) proposes "spymark" for hidden signals that make work
traceable without knowledge or consent — reserving "watermark" for the visible,
benign kind. The evidence assembled: SynthID-O encodes a 136-bit payload in a 512×512
image (enough for a database identifier plus error correction); audio schemes hide
128-bit payloads that survive compression and re-encoding (audiowmark, 2018, predates
the LLM era); and the printer-dot precedent goes back to the 1980s. The industry
counterpoint — spymarking helps identify AI-generated content — is stated, not
strawmanned.

**Why it matters:** The article is honest about being a framing intervention, not a
breach disclosure: the risk scenarios are conditional ("imagine a future..."), the
demos are explicitly fictional, and standardized metadata (EXIF, ID3) is excluded as
inspectable. The point that survives scrutiny is structural: payloads *can* carry
per-user identifiers, they survive laundering, and nothing in current deployments
prevents the linkage — the term you use decides whether that registers as a feature.

[`🔗 brand.io/article/spymarks`](https://brand.io/article/spymarks/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49794615)

---

## 24. M5 Ultra Mac Studio review: 1.2 TB/s unified memory makes local agent fleets boring — in the good way

- **Velocity:** ▮ rising
- **Source:** MacStories / Hacker News · 236+ pts · 235 comments · ~14h ago (~22:20 UTC+8)
- **Tags:** `apple` `local-llm` `hardware` `mac-studio`

Federico Viticci reviews the M5 Ultra Mac Studio — the first UltraFusion quad-die
design (two dual-die M5 Max chips), 80-core GPU, 819 GB/s → 1.2 TB/s bandwidth, 256 GB
unified memory (512 GB variant due late October). Local-AI numbers with Qwen3.8-Flash-
Next 4-bit via oMLX: prompt processing +150% vs M3 Ultra (~2,733 tok/s), ~108 vs 70
tok/s generation at 16K context, 60–85 tok/s even at 256K, and time-to-first-token at
256K halved to ~102s. Concurrency is the quiet win: three parallel requests hit 81.5
tok/s combined (+23%) where the M3 Ultra gained only 4%.

**Why it matters:** The verdict matters more than the numbers: Viticci now runs his
daily agent stack entirely on-device (a 99-day agent research stack at zero API cost),
and the review's caveats are unusually clean — an RTX 5090 still beats it on raw speed
(~25% faster generation) for models that fit in 32 GB, setup is "not something I would
ever recommend" to casual users, and the hardware costs more than years of cloud
subscriptions. No price stated in the review — the one spec that decides everything is
the one not printed.

[`🔗 MacStories review`](https://www.macstories.net/stories/m5-ultra-mac-studio-review-the-dream-mac-for-local-ai-agents/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49787313)

---

## 25. Linear reworked CI for the AI-coding era — and wrote down every number

- **Velocity:** ▮ rising
- **Source:** Linear / Hacker News · 170+ pts · 176 comments · ~9h ago (~03:55 UTC+8)
- **Tags:** `ci-cd` `developer-tools` `ai-coding` `typescript`

Linear's problem was structural: agents quadrupled their test suite since January, and
every agent iteration waited on CI. The rework: off GitHub Actions onto faster
third-party runners (jobs −34% avg, `tsc` −52%), the native `tsgo` compiler (weekly
median typecheck −73%), ESLint rules rewritten to drop TypeScript from linting
entirely (−68%), checkout replaced with a custom composite action plus a persistent
git mirror, `node_modules` caching dropped (restore cost 28s vs 7.5s to rebuild), and
their largest single win — an opt-in `isolate: false` Vitest project so safe files
share a module registry (~17% of monthly runner spend). Net: PR wait fell from >6min
to ~5min *despite* the 4× suite; without the work it would be ~11 minutes.

**Why it matters:** The post is a rare fully-quantified CI engineering log — 87,000
runner-minutes/month from batching seven small checks, setup-cost math for when
sharding pays, and an honest risk ledger (`isolate: false` carries the highest
correctness risk and stays opt-in per file). The pattern generalizes: when agents
generate the code, the bottleneck moves to verification, and CI tuning becomes a
first-class engineering discipline.

[`🔗 linear.app/now`](https://linear.app/now/ci-bottleneck-reworked) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49792067)

---

## 26. Mathematicians form an independent advisory group — their first task: OpenAI's batch of "100+ resolved open problems"

- **Velocity:** ▮ rising
- **Source:** Terry Tao's blog / HN · 106+ pts · 51 comments · ~18h ago (~18:30 UTC+8)
- **Tags:** `openai` `mathematics` `ai-research` `governance`

The Advisory Group on Mathematics and Artificial Intelligence (AGMAI, hosted at the
Institute for Advanced Study) launched Sept 21 via a guest post on Terence Tao's blog:
nine members (Gowers, Hairer, De Lellis, Witten, Vakil, Wood, Tillmann, Srivastava,
Charles), unpaid, "independently of any AI company," with public recommendations and
explicitly no decision-making authority. The origin: OpenAI approached members about
an external advisory board; they instead formed an independent group. First mandate —
advising OpenAI on how to coordinate the release of a large batch of significant
mathematical results OpenAI says its internal model produced, which OpenAI's own
announcement claims "resolved more than 100 long-standing open problems."

**Why it matters:** This is the release-coordination question institutionalized: when
a lab claims a century of results at once, who checks them, and at what pace? The
comment section's dissent is part of the story — Burt Totaro and others question
whether unpaid advisory legitimacy masks the fact that OpenAI retains full control of
pacing and disclosure. The verification of the claimed results themselves hasn't
started publicly.

[`🔗 Terry Tao's blog (guest post)`](https://terrytao.wordpress.com/2026/09/21/advisory-group-on-mathematics-and-artificial-intelligence/) · [`🔗 agmai.org`](https://agmai.org/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49790389)

---

## 27. Tim Dettmers' lab declares "the unit of research is the ecosystem" — six releases, one interlocking bet on small-lab AI

- **Velocity:** ▮ rising
- **Source:** timdettmers.com / Hacker News · 120+ pts · 60 comments · ~11h ago (~01:30 UTC+8)
- **Tags:** `academic-ai` `open-source` `agents` `quantization`

Dettmers (CMU) published the argument behind his lab's coordinated release: two
open-source projects and four papers as one ecosystem, built on "a couple of GPUs."
The pieces: an agent harness that autonomously optimizes repos (CUDA/Metal kernels)
over long unattended sessions; a fully local autonomous research system claimed to
beat frontier-lab deep-research systems, Sakana AI and ScientistOne while running
offline; "CliffCompaction," an auto-compaction method enabling million-to-100M-token
sessions at ~50% cost cut (state of the art on KernelBench, per the post); and a
test-time-scaling method that reinvests the savings into multiple rollouts. Demo
numbers: Qwen 3.6 35B-A3B at ~450 tok/s on Mac via 1.5-bit quantization; DeepSeek
V4.1 (550B) on a 128 GB MacBook with automatic context compression.

**Why it matters:** The post is advocacy — Dettmers says so, and the caveats are
concrete: the autonomous bioinformatics run produced a useful heuristic lower bound in
~2 hours but did not reach state of the art overall; the test-time-scaling method is
"not practical for everyday engineering work yet"; releases slipped a day. The claim
to watch is the load-bearing one: that small labs can stay frontier-adjacent by
shipping ecosystems rather than papers. Releases begin today.

[`🔗 timdettmers.com`](https://timdettmers.com/2026/09/21/dlab-open-source-week/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49791647)

---

## 28. Fake LastPass Authenticator ships a Microsoft-signed kernel driver that kills 145 security tools

- **Velocity:** ▮ rising
- **Source:** LastPass TIME team + Delphos Labs (Sep 17) · The Hacker News (Sep 21)
- **Tags:** `byovd` `infostealer` `supply-chain` `malware`

A fraudulent GitHub org ("LastPass-Authenticator") ranking for download searches leads
to 148 MB junk-padded ZIPs that size-limited scanners skip. Inside: a legitimate
renamed `vsdbg.exe` plus a malicious `vsdbg.dll` for DLL side-loading → SYSTEM via
three escalation methods → kernel driver `Alinubx.sys`, signed through Microsoft's
Windows Hardware Compatibility Publisher chain, zero detections on VirusTotal and
absent from Microsoft's vulnerable-driver blocklist. From the kernel it terminates 145
AV/EDR process names, then the "Rapuncel" stealer harvests 24+ browsers' passwords,
crypto wallets, and session tokens — defeating Chrome/Edge app-bound encryption by
injecting into the browser itself. The same attacker server hosted impersonation pages
for 40+ brands.

**Why it matters:** The renamed driver is a known one — CnCrypt's `CcProtect.sys`,
already in the LOLDrivers catalog; the rename alone dropped detections from 7/70 to
0/70. Microsoft declined to treat it as a vulnerability (not a Microsoft component).
LastPass' own line is the one to quote: "Microsoft attestation proves a driver passed
through a trust pipeline. It does not prove the driver is safe." Hunt by lineage
(service `NvFsFilter`, signer "Henan Dafeng Software"), not hash.

[`🔗 The Hacker News`](https://thehackernews.com/2026/09/fake-lastpass-authenticator-installer.html) · [`🔗 LastPass/Delphos report`](https://blog.lastpass.com/posts/lastpass-delphos-report-rapuncel-infostealer)

---

## 29. One cut fiber line grounded flights at JFK, Newark, Boston and Philadelphia

- **Velocity:** ▮ rising
- **Source:** Reuters / Hacker News · 216+ pts · 121 comments · ~9h ago (~03:10 UTC+8)
- **Tags:** `infrastructure` `faa` `resilience` `fiber`

On Sept 21 the FAA halted incoming flights at major East Coast airports after a
construction crew cut a **backup** fiber-optic line serving Philadelphia TRACON
(terminal radar approach control). Ground stops rippled to JFK, Newark, Boston and
Philadelphia; thousands of flights were delayed before the FAA restored the telecom
path later the same day, saying it would not restart "until we make sure the airspace
is safe."

**Why it matters:** The redundancies worked as designed and it still snarled a
metro airspace for hours — a single physical cut took out the surviving path at the
same time. It's the same lesson as this month's Dutch-railway halt and the Bahrain
data-loss incident: resilience failures cluster on the unglamorous physical layer,
and "backup" is only a topology, not a guarantee, until the failover is rehearsed.

[`🔗 Reuters`](https://www.reuters.com/world/us/faa-halts-some-us-east-coast-flights-due-communication-issues-2026-09-21/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49791509)

---

## 30. macOS 27 ships AI features you can finally turn off — but users say the models still download

- **Velocity:** ▮ steady
- **Source:** Apple Support / HN · 259+ pts · 177 comments · ~11h ago (~01:00 UTC+8)
- **Tags:** `apple` `apple-intelligence` `macos-27` `privacy`

Apple published official per-feature controls for Apple Intelligence on Mac (macOS 27
"Golden Gate"): Siri AI can be turned off with a fallback to "Use Siri Classic,"
Messages/Mail/Notification summaries, Smart Replies, Journal writing prompts and
voicemail suggestions each get individual switches, and Screen Time can restrict the
lot. The catch users found: the support page says nothing about storage, and a
separately-trending thread documents a workaround to stop macOS from downloading the
on-device AI models at all — while an Ask HN thread argues full Siri disablement
remains elusive.

**Why it matters:** Opt-out granularity is real progress after a year of
bundle-everything defaults; the open question the threads expose is whether "off"
means *not downloaded* or just *not used*. Note the fine print Apple does state:
server-side models are subject to daily usage limits, with expanded access "possibly
for a fee in the future" — the local/cloud boundary has a price tag attached now.

[`🔗 Apple Support`](https://support.apple.com/guide/mac-help/turn-restrict-access-apple-intelligence-mchlb2e44f94/mac) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49790409) · [`🔗 storage workaround thread`](https://www.reddit.com/r/MacOSBeta/comments/1vlnf13/workaround_to_avoid_downloading_ai_models_and/)

---

## 31. TraderTraitor's macOS backdoors resurface on a victim with no crypto ties — dormant 11 days, then beacons seconds after a Cursor workspace opens

- **Velocity:** ▮ steady
- **Source:** SentinelLabs (Sep 18) · The Hacker News (Sep 21)
- **Tags:** `north-korea` `macos-malware` `supply-chain` `developer-security`

SentinelLabs reports the North Korea-linked group (Jade Sleet/TraderTraitor/UNC4899 —
the Bybit $1.5B crew) hit an India-based IT services provider through a DevOps
engineer's Apple Silicon Mac: job-interview lures leading to a weaponized Terraform
dependency lock file — `terraform init` pulls attacker-hosted modules. Two Rust ARM64
backdoors: FLATROOF (Telegram C2, steals browser data, terminal history and
`login.keychain-db`) and ROOFDECK (Nostr-based decentralized C2, cryptographically
signed commands, Launch Agent persistence). Detected Mar 18, dormant until Mar 29 —
when beaconing began seconds after a workspace opened in Cursor. An updated ROOFDECK
landed Apr 20, one day after LayerZero publicly acknowledged the KelpDAO hack.

**Why it matters:** Two details generalize beyond crypto-heist targets: the trigger
was the victim *opening their dev environment*, and the payload update tracked the
public disclosure clock. Developer endpoints are the supply chain — and interview
lures plus `terraform init` are now a repeatable kill chain against them.

[`🔗 The Hacker News`](https://thehackernews.com/2026/09/jade-sleet-linked-to-indian-it-provider.html) · [`🔗 SentinelLabs report`](https://www.sentinelone.com/labs/dont-call-us-well-call-your-apis-tradertraitor-backdoors-resurface-on-victim-with-no-crypto-ties/)

---

## 32. Git 2.56 lands this week — and the 3.0 question is officially on the table

- **Velocity:** ▮ steady
- **Source:** LWN / Hacker News · 53+ pts · 19 comments · ~7h ago (~05:30 UTC+8)
- **Tags:** `git` `version-control` `sha256` `developer-tools`

Git 2.56 (~700 non-merge commits, expected late September) ships experimental
`git history drop`, `git add --resolved` (stages only resolved files, aborts on
leftover conflict markers), `git refs create/delete/update/rename`, and
`git branch --delete-merged`. Bigger: Junio Hamano formally asked the community this
month whether the next release should be **3.0**, with four compatibility breaks under
discussion — SHA-256 by default (non-experimental since 2.42; GitLab and Forgejo
ready, GitHub's status unclear), lower-case-only object IDs, reftable as default ref
storage, and Rust as a build requirement. Hamano: "this is not a popularity contest,
nor is it even a democracy" — the call is his.

**Why it matters:** The SHA-256 default is the one with ecosystem consequences —
every tool that reads Git object formats, plus every forge, has to be ready, and old
repos stay supported but new defaults propagate for a decade. Note what's *not* under
discussion: any change that breaks old repos. The 3.0 decision is expected this year
if it happens at all.

[`🔗 LWN`](https://lwn.net/SubscriberLink/1094575/2385e98583715c2b/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49794736)

---

## 33. "I said no and Apple said yes" — a macOS upgrade re-enables Apple Intelligence after an explicit opt-out

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 303+ pts · 225 comments · ~4h ago (~16:04 UTC+8)
- **Tags:** `apple` `apple-intelligence` `privacy` `consent`

David Bushell's upgrade-day account: he had explicitly disabled Apple Intelligence and Siri
("a rather explicit 'no'") after macOS 15.3 auto-enabled a feature phoning home every 15
minutes. Upgrading macOS 15 → 27 this week, he found the AI features re-enabled and the
opt-out switch gone. Siri "disabled" still leaves multiple unkillable Siri processes
consuming memory and writing data; Apple Intelligence took 22.28 GB of disk (which he
prices at ~£11 against Apple's £500/TB storage upgrades); the Screen Time hidden
workarounds only hide AI features from menus without disabling them.

**Why it matters:** This is the concrete answer to the question item 30 left open —
whether "off" means off. Apple published real per-feature controls this week, but a
prior opt-out evidently didn't survive the upgrade, so consent here is a per-version
state, not a setting. Caveat: a single-user anecdote and an opinion essay — but every
specific (processes, storage, Screen Time path) is checkable on the machine in question.

[`🔗 dbushell.com`](https://dbushell.com/2026/09/22/apple-intelligence/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49797982)

---

## 34. agent-substrate/substrate — a "secure-by-default agent execution runtime" is today's fastest uncovered riser at +498/day

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub Trending · 2.7k stars · +498/day
- **Tags:** `agent-infra` `kubernetes` `sandboxing` `gvisor`

A Go runtime (Apache-2.0) that multiplexes many mostly-idle agents ("actors") onto a
smaller pool of warm workers on Kubernetes: gVisor and microVM (cloud-hypervisor)
sandbox backends, full-state snapshots for suspend/resume ("Actor Teleport") with
filesystem/RAM persistence across hibernation, request parking, and egress policy with
MITM interception. It supports ADK, LangChain, Claude Code, Codex and MCP servers.
Claims: 10× density over standard container runtimes, sub-500ms resume at 500+
suspend/resume activations/second, ~250 actors on 8 pods ("30×+ oversubscription") —
all vendor claims; a benchmarking guide is linked but no methodology appears on the page.

**Why it matters:** Agent-density-by-oversubscription is becoming the infra thesis of
the season, and this is the most concrete open-source take yet. The README's own
warnings are the counterweight: "not ready for production use, and the APIs are almost
guaranteed to change"; "not an officially supported Google product" and excluded from
Google's OSS vulnerability-rewards program; supports only the latest Kubernetes stable
plus one minor.

[`🔗 GitHub repo`](https://github.com/agent-substrate/substrate) · [`🔗 GitHub Trending`](https://github.com/trending?since=daily)

---

## 35. JetBrains launches Air — one agent system across IDEs, Web, CLI and Mobile

- **Velocity:** ▮▮ rising
- **Source:** JetBrains / Hacker News · 39+ pts · 26 comments · ~1h ago (~19:00 UTC+8)
- **Tags:** `jetbrains` `agents` `ide` `product-launch`

Air is "one system for building software with agents" across four surfaces (IDEs, Web,
CLI, Mobile), integrating Claude Agent, Codex, Junie, Copilot, OpenCode "and any you can
connect via ACP." Components: Air in IDEs (auto-discovery of local agents via a
registry, diff review, line comments for agents to act on), Air Teams (dedicated cloud
environments, automations, centralized MCP setup), Air Governance (org-wide
permissions), and credit-accounted automations triggered on merge/PR/push. Cloud runs
are "already available for some customers" with gradual rollout; the IDE plugin is in
alpha; bring-your-own keys or JetBrains AI credits billed at public API rates.

**Why it matters:** This is where JetBrains landed after abandoning Fleet for Air last
December — and the notable choice is that it's agent-agnostic infrastructure (a control
plane and review surface for other companies' agents), not another IDE-locked agent.
Caveats: no full pricing published yet, and the announcement's engagement is still
small — it's an hour old.

[`🔗 jetbrains.com/air`](https://www.jetbrains.com/air/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49799287)

---

## 36. Can gzip be a language model? A zero-training generator answers "kind of?"

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 196+ pts · 78 comments · ~6h ago (~14:08 UTC+8)
- **Tags:** `compression` `information-theory` `llm` `education`

The `gzipt` tool (pure-stdlib Python, by the nathan.rs author) primes DEFLATE's 32 KiB
window with a corpus and
scores continuations as `len(compress(context + candidate))` — shorter means more
"predicted." Two tricks make it work at all: beam search over multi-byte spans (gzip
emits integer byte counts, so single-byte steps tie and drown in quantization noise),
and keeping only the last `tail` bytes in the scoring context, since DEFLATE favors
cheap nearby matches and full history collapses into verbatim self-copying. The
Shakespeare sample comes out recognizably play-formatted and garbled; the author's own
verdict is "kind of?" — citing DeepMind's "Language Modeling Is Compression" (2023),
whose footnote already recorded that gzip-based generation "ended up performing poorly."

**Why it matters:** A working, honest demonstration of the compression=prediction
equivalence with zero trained parameters — and a model of how to report a negative
result (no benchmarks claimed, caveats in line). The beam-over-byte-spans construction
is the actual novelty over the 2023 paper.

[`🔗 nathan.rs`](https://nathan.rs/posts/gzip-lm/) · [`🔗 arXiv:2309.10668`](https://arxiv.org/abs/2309.10668) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49797323)

---

## 37. browser-use/video-use — "edit videos with coding agents" pulls 25.5k stars

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · 25.5k stars · +155/day
- **Tags:** `video-editing` `coding-agents` `browser-use` `mit`

Drop raw footage in a folder, chat with your coding agent (Claude Code, Codex), get
`final.mp4` — no timeline software. The design point: the LLM never views frames. It
reads a ~12KB transcript file (ElevenLabs Scribe: word timestamps, diarization, audio
events) plus on-demand filmstrip PNGs generated only at decision points, then cuts,
color-grades, adds 30ms audio fades and burned-in subtitles, with a self-evaluation
loop that re-checks cut boundaries (max 3 fix cycles) and parallel sub-agents for
Remotion/Manim/PIL/HyperFrames overlays. MIT.

**Why it matters:** The token-efficiency-by-representation trick — text transcript as
the video's world model — is the same pattern the harness-engineering items have been
charting all month, applied to a medium where raw frames are unaffordable. Caveats:
the "45M tokens of noise" comparison is the project's own framing; a hard dependency
on a paid ElevenLabs API key sits oddly beside the "100% open source" claim; no
releases, 21 commits, 93 open PRs — and we found no fresh launch event, so the
trending surge is momentum, not a trigger we can name.

[`🔗 GitHub repo`](https://github.com/browser-use/video-use) · [`🔗 Releases`](https://github.com/browser-use/video-use/releases)

---

## 38. SharePoint CVE-2026-65660: Microsoft's advisory said "spoofing, 6.5" — today's writeup demonstrates authenticated RCE

- **Velocity:** ▮▮ rising
- **Source:** Viettel / The Hacker News · published ~1h ago (~19:17 UTC+8)
- **Tags:** `sharepoint` `microsoft` `rce` `cvss`

Full technical details published today by Viettel's Dinh Ho Anh Khoa — the ToolShell
researcher from Pwn2Own Berlin 2025 — show CVE-2026-65660 is a SafeControls-list
bypass: ToolPane rebuilds `Register` directives writing attribute values between
double quotes without escaping embedded quotes, so an authenticated attacker registers
arbitrary .NET classes after the type check and reaches code execution via
`XamlServices.Parse()` deserialization (in-memory webshell payload included). It
chains with a separately-patched auth bypass (fixed June 9) for pre-auth RCE, but only
where anonymous page access is enabled. Patched August 11; the patch also disables the
vulnerable function by default. No in-the-wild exploitation reported, not on CISA KEV;
Microsoft rates exploitation "unlikely" — with the full exploit markup now public.
Khoa says SharePoint 2013 (EOL since 2023) is also affected; Microsoft's advisory
lists only 2016/2019/Subscription Edition.

**Why it matters:** The scoring saga is the item. Microsoft's advisory long showed
6.5/spoofing with no integrity or availability impact; the CVE record now titles it
RCE (CWE-94) and the current NVD record carries CVSS 3.1 **8.8 AV:N/AC:L/PR:L/UI:N —
CNA-assigned (Microsoft), status Modified**. Defenders who triaged off the advisory
saw a moderate spoofing bug, not near-maximum code execution.

[`🔗 The Hacker News`](https://thehackernews.com/2026/09/sharepoint-flaw-initially-listed-as.html) · [`🔗 NVD: CVE-2026-65660`](https://nvd.nist.gov/vuln/detail/CVE-2026-65660)

---

## 39. Meta Muse's hidden dictation endpoint: Wardle's PoC turns the assistant into a backdoor

- **Velocity:** ▮ steady
- **Source:** The Hacker News · PoC Sep 21, writeup Sep 22 (~14:33 UTC+8)
- **Tags:** `muse` `meta` `macos` `agent-security`

Patrick Wardle (Objective-See) published a PoC for the Mac Muse app: an undocumented
preference, `endo_voyager_dictation_endpoint`, decides where dictated prompts go — and
any program running as the logged-in user can repoint it without extra permissions.
From there he showed three things: read what the user dictates, inject instructions
Muse trusts and acts on, and capture Muse's session token — which he used to drive
Muse on his own iPhone (location report, Bluetooth scan, smart-home command listing).
The hedges stay attached: requires pre-existing code execution, doesn't defeat macOS
TCC/keychain protection, doesn't show Meta's cloud isolation broken, and in his tests
Muse only drafted messages rather than self-sending. He disclosed publicly without
reporting to Meta; Meta has since pushed what he calls a "fix" (unconfirmed, no
security advisory). Different issue from item 2's Amazon bot-wall standoff — adjacent
target, separate flaw.

**Why it matters:** The agent's own granted access is the attack surface: malware
doesn't need to escalate, just steer a signed, legitimate app that already holds the
keys — and EDR may not flag commands coming from it. Agent-class apps with
cross-device sessions turn one Mac compromise into control of every device the
account touches.

[`🔗 The Hacker News`](https://thehackernews.com/2026/09/one-hidden-meta-muse-setting-could-let.html) · [`🔗 Objective-See Foundation`](https://objective-see.org)

---

## 40. Univer rebrands as "the Office Harness for AI Agents" — an office runtime where agents worktree-and-merge

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · 14.9k stars · +202/day
- **Tags:** `office` `agents` `sdk` `typescript`

DreamNum's Univer (the Luckysheet team) unifies spreadsheets, docs, slides, canvas,
relational tables — PDF "coming soon" — into one Apache-2.0 runtime with a headless
Node mode, a CLI for Claude Code/Codex/OpenCode, and an `univer-mcp` plugin. The
agent positioning is now explicit: humans and agents co-edit the same file, agents
work in isolated worktree drafts with human review before merge, git-style version
history tracks every change, and agents self-verify — setting their own validation
conditions and iterating until they pass. The site cites a #1 SpreadsheetBench score
(68.86% vs the human benchmark 71.3%) — self-reported.

**Why it matters:** The office suite is being rebuilt as an agent-verification
surface — structured APIs, screenshots and layout diagnostics as the check — which
matches where coding-agent evals are heading. Read the boundary before embedding:
realtime collaboration, import/export, printing, charts and pivot tables are Univer
Pro commercial offerings, docs/slides are earlier-stage than sheets, and the
SpreadsheetBench number is the vendor's own.

[`🔗 GitHub repo`](https://github.com/dream-num/univer) · [`🔗 univer.ai`](https://univer.ai/)

---

## 41. Treg: "OpenRouter for agent tools" — one token, 2,630 endpoints, per-call pricing

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · 2.0k stars · +197/day
- **Tags:** `agent-tools` `api-gateway` `credentials` `metering`

Treg (self-hostable Python/FastAPI, hosted at treg.to) gives agents one base URL and
token for vendor tool APIs — Semrush, Moz, SerpApi, Hunter, Crunchbase and more.
Agents request capabilities rather than tools; treg routes to a provider, injecting
credentials server-side, and shows each provider's measured success rate and speed so
the agent picks on evidence. Per-call pricing with no subscription (cited example:
$0.006 per Semrush keyword lookup; "$0.000 markup" claimed); teams can register their
own keys, CLIs and `SKILL.md` recipes org-wide.

**Why it matters:** The tool-call layer getting its own OpenRouter is a real unmet
need — credential injection plus per-call metering is exactly what agents calling
vendor APIs lack. But check the discrepancies before routing secrets through it: the
README claims 3,000+ endpoints across 60+ providers and "Apache 2.0 with additional
terms," while the hosted site says 2,630 endpoints, 47 providers and AGPL. Also
noted: responses buffered up to 8 MiB for billing evidence, losing the Fernet key
makes stored secrets unrecoverable, and hosted CLI use ships PostHog telemetry by
default.

[`🔗 GitHub repo`](https://github.com/superdesigndev/treg) · [`🔗 treg.to`](https://treg.to/)

---

## 42. claude-code-templates crosses 30.9k stars — the aggregator layer of the skills economy

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · 30.9k stars · +33/day
- **Tags:** `claude-code` `skills` `aggregator` `mit`

davila7's claude-code-templates is a MIT-licensed CLI that configures and monitors
Claude Code: 100+ agents, slash commands, hooks, settings and MCP integrations
installable via `npx claude-code-templates@latest`, plus a real-time analytics
dashboard, a mobile conversation monitor, health checks and a plugin dashboard. It
aggregates third-party collections with attribution retained — K-Dense scientific
skills (139), Anthropic official skills (21), wshobson/agents (48), obra/superpowers
among them.

**Why it matters:** This is the distribution layer of the skills wave, and it
inherits an aggregator's risks worth stating plainly: installed content carries its
original authors' licenses and quality, and the README mixes sponsored placements
(Bright Data, Z.AI, Neon, Vercel) into the catalog. No fresh release event found —
the +33/day is steady accumulation, not a spike, which is the honest way to read it.

[`🔗 GitHub repo`](https://github.com/davila7/claude-code-templates) · [`🔗 GitHub Trending`](https://github.com/trending?since=daily)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-09-22T20:15:00+08:00 |
| Items | 42 |
| Sources tracked | 43 (Hacker News, GitHub Trending, x.ai, Artificial Analysis, The Register, GeekWire, Cloudflare blog, oss-security, securityonline.info, NVD, arXiv, GitHub, Hugging Face, Raspberry Pi forums, SafeDep, BleepingComputer, WPScan, Zyxel, CISA KEV, SolarWinds, AWS, 每日经济新闻, X, mimo.mi.com, bcantrill.dtrace.org, blog.colinbreck.com, brand.io, MacStories, linear.app, terrytao.wordpress.com, agmai.org, timdettmers.com, The Hacker News, LastPass blog, SentinelLabs, Reuters, Apple Support, LWN, dbushell.com, jetbrains.com, nathan.rs, univer.ai, treg.to) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[Previous day](../archive/2026-09-21.md) · [Raw .md](./2026-09-22.md) · [Archive](../archive/index.md)
