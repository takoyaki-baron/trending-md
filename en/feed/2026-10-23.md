---
date: 2026-10-23
updated: 2026-10-23T04:15:43Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 16
license: CC-BY-4.0
---

# Trending — 2026-10-23

## 1. eMudhra exits the global SSL/TLS business — five days after its CA keys turned out to be the number 4

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 800+ pts · 6h ago (~21:33 UTC+8)
- **Tags:** `security` `pki` `ca` `trust-store` `emudhra`

eMudhra's board voted on October 22 to voluntarily withdraw from the global SSL/TLS certificate business, closing a week that began with an independent researcher recovering eight intermediate CA private keys — all generated April 30, 2025 — in under a second each. Google, Apple, Microsoft and Mozilla have distrusted the affected certificates; the G3 ECC root is out, the G1 RSA root continues to serve during a transition. The company says the affected CAs were revoked within 14 hours, that no end-entity certificates were issued from them, and that no infrastructure or data was breached. It has promised a root-cause report to the root programs. The segment is roughly 1% of global revenue (FY26 revenue ₹701.6 Cr); the stock fell 36–40% over two days, hitting exchange circuit breakers twice.

**Why it matters:** A cryptographic failure became a business exit in five days, and "distrusted" remains a per-store claim rather than a property of the certificate authority. Our own October 22 measurement of this chain found `emSign ECC Root CA - G3` still anchored in the macOS keychain and Java `cacerts` while absent from Mozilla, certifi and curl — so an exit from the *program* does not remove the *anchor*, and nothing in this announcement revokes anything. Cut exposure by trust source, not by species.

[`🔗 eMudhra press release`](https://emudhra.com/en/press-release/emudhra-to-exit-global-ssl-tls-certificate-business) · [`🔗 The Hindu`](https://www.thehindu.com/business/emudhra-to-exit-overseas-web-security-certificate-business-as-stock-takes-beating/article71611983.ece) · [`🔗 CNA`](https://www.channelnewsasia.com/business/indian-firm-emudhra-exits-global-digital-certificates-business-after-vulnerability-disclosure-6482671)

---

## 2. Arista's third VeloCloud zero-day this year: a 9.9 SQL injection, exploited, and not yet in any CVE registry

- **Velocity:** ▮▮▮ trending
- **Source:** BleepingComputer / securityonline.info · ~1h ago (~03:30 UTC+8)
- **Tags:** `cve` `arista` `sd-wan` `exploited` `sql-injection`

Arista Security Advisory 0199 covers CVE-2026-114625, a SQL injection in on-prem VeloCloud Orchestrator that lets any authenticated user — including a read-only one — escalate to operator and masquerade as the local "superuser operator". Fixes are in VCO 5.2.3.18, 6.1.3.10 and 6.4.2.12; hosted VCO is already patched. Arista confirms active exploitation and advises restricting the VCO web interface to admin networks, blocking 74.82.197.86 and 38.54.50.151, and preserving logs before remediating. It is the third VCO flaw in a year: CVE-2026-16812 (OS command injection) went into CISA KEV in July, CVE-2026-93952 (input validation) did in September.

**Why it matters:** The 9.9 is **Arista's own score**. At the time of writing neither NVD nor the CVE Program's cveawg API has a record for CVE-2026-114625 at all — so scanners keyed to NVD will see nothing for a vulnerability that is being exploited right now. The aggregator we first read this from also cited an NCSC-NL advisory that turns out to be for the *September* VCO bug (CVE-2026-93952), a reminder that a linked advisory is not automatically an advisory for the CVE beside it.

[`🔗 securityonline.info`](https://securityonline.info/velocloud-orchestrator-cve-2026-114625-exploited/) · [`🔗 pwn.watch incident`](https://pwn.watch/i/arista-velocloud-orchestrator-cve-2026-114625)

---

## 3. Next.js names two critical unauthenticated RCEs — eight days after the fixes shipped

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub Advisory Database · ~3.5h ago (~00:42 UTC+8)
- **Tags:** `cve` `nextjs` `rce` `sharp` `advisory-lag`

Vercel published two critical advisories on October 22, hours apart. GHSA-2464-fhr4-w9xw is an unauthenticated RCE through the Image Optimization API: a use-after-free in librsvg (CVE-2026-96889, triggered by SVG XIncludes with duplicate entity declarations), reachable via `sharp` when Next.js runs on glibc-based Linux, affecting next 10.0.0–15.5.27 and 16.0.0–16.4.0. GHSA-673q-mjm6-r5xr is an RCE in App Router apps using `use cache` functions that return multiple typed arrays, affecting 16.0.0–16.4.0 with **no workaround** — upgrade only. Both are fixed in 15.5.28 and 16.4.1.

**Why it matters:** npm's publish timestamps put 15.5.28 and 16.4.1 on **October 14** — the advisory naming them critical landed on October 22, an eight-day gap in the direction the disclosure-lag rule usually doesn't catch. Anyone triaging by advisory date will file these as new today; the patch has been installable for over a week. The `sharp` half also explains three separate 8.4–8.9 NVD entries published October 21 for bundled libheif, librsvg and libvips dependencies — same root cause, different paperwork.

[`🔗 GHSA-2464-fhr4-w9xw`](https://github.com/advisories/GHSA-2464-fhr4-w9xw) · [`🔗 GHSA-673q-mjm6-r5xr`](https://github.com/advisories/GHSA-673q-mjm6-r5xr) · [`🔗 CVE-2026-96889 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-96889)

---

## 4. Quad9 leaves France on November 24 — compliance was "technically unfeasible"

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 639+ pts · 5h ago (~22:32 UTC+8)
- **Tags:** `dns` `policy` `privacy` `quad9` `france`

A French court ruled against Quad9 on October 21 in a case brought by beIN, ordering the resolver to block recursive DNS resolution for a set of domain names for users located in France. The court cut the penalty from €580,000 to €1,000 per day, but Quad9 says compliance contradicts its mandate to return unmodified DNS answers and has decided to withdraw from France entirely as of Tuesday, November 24. Its post is explicit that the reduced fine was never the deciding factor.

**Why it matters:** A public recursive resolver is infrastructure, and removing it from a country moves every ISP-level and device-level configuration that points at 9.9.9.9 — including a lot of hardcoded `resolv.conf` and container defaults. The technical consequence is duller than the principle: users in France fall back to resolvers that filter, log, or both, and any French deployment depending on Quad9's threat blocking silently stops getting it.

[`🔗 Quad9 — Farewell, France`](https://quad9.net/news/blog/au-revoir-france/) · [`🔗 Hacker News thread`](https://news.ycombinator.com/item?id=50195959)

---

## 5. "Header Accordions": a tiny HTTP/3 HEADERS frame expands ~4,000× on Bun, and seven of ten QPACK stacks were vulnerable

- **Velocity:** ▮▮ rising
- **Source:** FoxIO research · ~6h ago (~22:00 UTC+8)
- **Tags:** `http3` `qpack` `dos` `cve` `quic`

Sébastien Féry found that QPACK decoded-header limits are missing, incomplete, or applied too late across implementations, so a small compressed header block can expand into hundreds of thousands of header objects in memory. One connection is enough to OOM or pin a default-configured server; the worst amplification measured was about 4,000× on Bun. Patched: quic-go 0.57.0 (CVE-2025-64702), Cloudflare quiche 0.29.3 (CVE-2026-12523), lsquic 4.9.0 (no CVE), Wireshark 4.6.2 / 4.4.12 (CVE-2025-13945). Unpatched at publication: Bun 1.4.3, the `h3` crate, and aioquic/mitmproxy. IIS, Envoy and ngtcp2/nghttp3 were never affected.

**Why it matters:** Three of the four fixes carry CVE IDs that date to 2025 — the news here is the coordinated write-up and PoC, not the discovery, so treat "new HTTP/3 DoS" framing with care. The practical instruction is short: mitmproxy users can pass `--set http3=false`; `h3` users should set a sane `max_field_section_size`; Bun users should not expose HTTP/3.

[`🔗 FoxIO — Header Accordions`](https://foxio.io/blog/header-accordions-qpack-amplification-attacks-against-http-3-servers) · [`🔗 oss-security announcement`](https://www.openwall.com/lists/oss-security/2026/10/22/1)

---

## 6. GhostAction returns: ~1,900 hijacked accounts pushed fake "security audit" workflows into 30,000+ repos

- **Velocity:** ▮▮ rising
- **Source:** GitGuardian · ~9h ago (~19:00 UTC+8)
- **Tags:** `supply-chain` `github-actions` `secrets` `github`

A campaign first documented by GitGuardian in September 2025 came back harder. It hit 772 repositories in August–September 2026, then surged on October 8–12: roughly 1,900 compromised GitHub accounts pushed workflows dressed as security audits into more than 30,000 repositories. The payload is broader than the original — it exfiltrates the repo's Actions secrets plus every credential it can find in the **full git history**, over plain HTTP to 193.32.204.199. GitHub began preventing the workflow from running around October 9. The operator moved on to GitHub-themed phishing at my-github.com and a VS Code `tasks.json` plus fake `.woff2` font stealer found in 94 repositories.

**Why it matters:** Rotating CI secrets is not sufficient remediation for this one. The credential set that matters is whatever has ever been committed — including secrets that were "removed" in a later commit and are still reachable from history. A workflow that arrives via a compromised contributor account also defeats the usual protection of reviewing what a PR changes, because it looks like an audit tool.

[`🔗 GitGuardian`](https://blog.gitguardian.com/ghostaction-github-actions-supply-chain-attack-returns/) · [`🔗 StepSecurity`](https://www.stepsecurity.io/blog/ghostaction-returns) · [`🔗 Socket`](https://socket.dev/blog/ghostaction-cloud-credentials)

---

## 7. Zeabur: 3.22M environment-variable records read from plaintext credentials — and the platform is shutting down

- **Velocity:** ▮▮ rising
- **Source:** Zeabur incident report · ~4h ago (~00:00 UTC+8)
- **Tags:** `breach` `secrets` `paas` `zeabur` `shutdown`

Zeabur disclosed an October 14–15 incident in which an attacker used leaked internal credentials, stored in plaintext, to reach shared clusters in nine regions, root into 101 Zeabur-managed GCP dedicated servers, and read the platform database — exposing roughly 3.22 million environment-variable records across 321,810 accounts. The report notes the attacker read about 53 production secrets and re-added SSH keys after one was disabled; last recorded activity was 21:05 on October 15. The company is winding down: from December 1 shared-cluster services pause and dedicated servers stop renewing, on December 31 all services stop and service data is deleted, and refund and incident claims close November 30.

**Why it matters:** A PaaS breach is a multiplier on every customer's secret hygiene at once, and this one lands on a platform with a hard shutdown date — so "rotate and monitor" and "migrate off" are the same task on a 69-day clock. Anyone who ever set a database URL, signing key or API token as a Zeabur environment variable should treat it as public.

[`🔗 Zeabur preliminary incident report`](https://zeabur.com/blogs/october-2026-security-incident) · [`🔗 Zeabur is shutting down`](https://zeabur.com/blogs/zeabur-is-shutting-down) · [`🔗 migration, refunds and claims`](https://zeabur.com/blogs/migration-refunds-and-security-claims)

---

## 8. U.S. banks find third-party AI agents inside customer accounts — and can't tell consent from autonomy

- **Velocity:** ▮▮ rising
- **Source:** Axios · ~7h ago (~21:00 UTC+8)
- **Tags:** `agents` `banking` `identity` `policy` `mcp`

Axios reported on October 22 that Morgan Stanley, JPMorgan Chase, Bank of America, Wells Fargo and Citi have detected third-party AI agents operating inside customer accounts — in most cases logging in with the customer's own credentials, which violates rules requiring the account holder to log in personally. Banks can see which credentials were used but often cannot determine whether activity was human-directed or agent-driven. Morgan Stanley has begun blocking third-party agents outright; JPMorgan, BofA and Citi are restricting them. Charles Schwab is reportedly planning scoped, read-only connections exposed as MCP servers.

**Why it matters:** This is the first broad signal that agent authentication is being solved at the *counterparty*, not the client — the bank decides what an agent may do, because the credential proves nothing about who is holding it. Two caveats travel with the story: Reuters said it could not independently verify the Axios report, and most follow-up coverage is aggregation of that single original rather than independent confirmation, so treat the incident counts as attributed rather than verified.

[`🔗 Axios`](https://www.axios.com/2026/10/22/ai-agents-banks-unauthorized-accounts-access) · [`🔗 pwn.watch incident`](https://pwn.watch/i/us-banks-unauthorized-ai-agents-customer-accounts)

---

## 9. NVIDIA open-sources OpenShell: kernel-enforced sandboxes plus a theorem prover in front of every policy change

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 134+ pts · 2h ago (~01:44 UTC+8)
- **Tags:** `agents` `sandbox` `security` `nvidia` `formal-verification`

OpenShell is an Apache-2.0 runtime for fleets of autonomous agents, at v0.1.5 (October 20) and 17.4k stars. It enforces agent policy at two layers: kernel controls on file access, system calls and every outbound network connection, so an agent in a sandbox cannot reach a host or call an API the policy hasn't approved; and a formal-verification pass that runs *before* a policy change is accepted, flagging risky new grants — a new host reachable with credentials, a new API method — for human review. Agents never hold real credentials; OpenShell injects them only into requests bound for approved endpoints. It runs on Linux, Apple Silicon macOS, or Windows via WSL 2, backed by Docker, Podman or host virtualization.

**Why it matters:** The interesting half is the prover. Most agent sandboxes are enforced-only — you find out what a policy allows by running an agent under it. Making policy changes subject to review *before* deployment is the difference between a sandbox and a change-management system, and it is the part competitors would have to reimplement rather than configure.

[`🔗 NVIDIA/OpenShell`](https://github.com/NVIDIA/OpenShell) · [`🔗 OpenShell docs`](https://docs.nvidia.com/openshell/latest/index.html)

---

## 10. Recursive ships Flint: a 40B-A2.5B Apache-2.0 coding model it says its own research system largely built

- **Velocity:** ▮▮ rising
- **Source:** Ollama v0.40.8 release / Hugging Face · ~1d ago (~22:00 UTC+8)
- **Tags:** `llm` `open-weights` `coding` `moe` `local`

Recursive (Richard Socher's company) released Flint on October 21 under Apache 2.0: 39.8B total parameters with ~2.5B active per token, 49 layers (2 dense, 47 MoE with 256 routed experts, 6 selected), 262,144-token context, BF16 and NVFP4 checkpoints. Recursive reports 54.9% on Terminal-Bench 2.1 and 74.2% on SWE-bench Verified, and says the model was built in under four months largely by its automated research system, Eureka Machine, which contributed across architecture search, training, quantization and inference optimization. Ollama shipped support the same day; macOS first, other GPUs later.

**Why it matters:** Every number above is **vendor-reported** — Recursive's own release evaluations, with no independent verification, and OpenHands' pre-launch testing did not extend to the benchmarks. The claim worth watching is not the score but the provenance: a 40B model whose architecture search and quantization were machine-generated is a test of whether automated research pipelines produce something that survives outside their own eval harness.

[`🔗 RecursiveSI/flint on Hugging Face`](https://huggingface.co/RecursiveSI/flint) · [`🔗 Ollama v0.40.8`](https://github.com/ollama/ollama/releases/tag/v0.40.8)

---

## 11. iFlytek's Spark X2.6: 293B-A30B, 1M context, trained entirely on domestic Chinese compute

- **Velocity:** ▮▮ rising
- **Source:** iFlytek 1024 Developer Festival · ~18h ago (~10:00 UTC+8)
- **Tags:** `llm` `china` `moe` `open-weights` `iflytek`

At its 1024 Global Developer Festival in Beijing on October 22, iFlytek launched Spark X2.6 — a 293B-A30B mixture-of-experts model with a 1M-token context, trained entirely on domestic (non-NVIDIA) Chinese compute and served from a domestic 10,000-card inference cluster. Pricing is 0.9 RMB per million input tokens, 0.08 RMB on cache hits, 3.6 RMB per million output. Alongside it the company open-sourced Spark X2.6-4B, an edge model for robots, auto platforms and AI PCs with three reasoning-budget modes; its predecessor, X2.5-4B (open-sourced September 1), reports 2.56M downloads. iFlytek claims #1 on SWE Pro and SWE Multilingual and second to DeepSeek-V4.1-Flash on SWE Verified.

**Why it matters:** The headline is the supply chain, not the benchmark table: a frontier-scale MoE trained without NVIDIA hardware is the concrete result the "domestic compute" claim has been waiting for, and the pricing undercuts DeepSeek-V4.1-Flash on both input and output. Treat the SWE claims as vendor-reported — the open-sourced artefact is the 4B edge model, not the 293B cloud model, so the benchmark numbers describe something you cannot download and check.

[`🔗 Global Times`](https://www.globaltimes.cn/page/202610/1372798.shtml) · [`🔗 Sina Tech`](https://finance.sina.cn/tech/2026-10-22/detail-iniwarrp5932585.d.html)

---

## 12. ISC BIND 9: replaying a GSS-TSIG message can corrupt memory in `named`

- **Velocity:** ▮▮ rising
- **Source:** ISC / NVD · ~15h ago (~21:21 UTC+8)
- **Tags:** `cve` `dns` `bind` `rce` `isc`

CVE-2026-94300: an attacker who captures a GSS-TSIG-signed UDP message — the Kerberos signing used for Active Directory-style dynamic DNS updates — can replay it while the negotiated TSIG key is still valid. Combined with crafted queries to a zone the attacker controls, this can corrupt memory in `named` and potentially reach remote code execution. Affected ranges are wide: 9.11.0–9.18.50, 9.20.0–9.20.29, 9.21.0–9.21.26, plus the corresponding -S1 branches; fixes land in 9.20.30 and 9.21.27.

**Why it matters:** The score is **CVSS 8.1, assigned by ISC as the CNA** (`security-officer@isc.org`); NVD's status is `Awaiting Analysis` with no NVD-authored metric, so the number on the record is the vendor's own, not an independent one. The exposure is narrower than the version list suggests — GSS-TSIG has to be configured — but any BIND deployment fronting an AD domain with dynamic updates is the population that matters.

[`🔗 ISC advisory`](https://kb.isc.org/docs/cve-2026-94300) · [`🔗 NVD record`](https://nvd.nist.gov/vuln/detail/CVE-2026-94300)

---

## 13. HackiOS boots Apple's XNU kernel and the unmodified iOS 16.5 user space on an Android phone

- **Velocity:** ▮ steady
- **Source:** Show HN · 214+ pts · 4h ago (~23:26 UTC+8)
- **Tags:** `kernel` `xnu` `ios` `android` `reverse-engineering`

HackiOS runs `xnu-8796.121.2` — the kernel from iOS 16.5 — on Android hardware and brings up the unmodified iOS 16.5 user space on top: launchd, backboardd, SpringBoard, then apps. The project ships its own EFI loader, a UEFI port, replacements for Apple's closed drivers, and a Linux Wi-Fi driver on a compatibility layer. On a POCO X5 Pro 5G (Snapdragon 778G, codename redwood) nothing is flashed — UEFI starts via `fastboot boot`, the whole system lives in RAM, and a reboot returns the phone to Android. The same thing runs under QEMU `virt` on any Linux box, so no phone is required. Neither repository contains Apple files; a fetch script pulls the IPSW from Apple's CDN on your machine.

**Why it matters:** Running launchd and SpringBoard on non-Apple silicon is a long-standing wall, and the interesting part is what had to be replaced to do it — a UEFI port and a compatibility layer that lets a Linux Wi-Fi driver serve XNU. The repo is one day old, at 403 stars, so treat "runs apps" as the authors' claim rather than an independently reproduced result.

[`🔗 oosexgang/hackios-xnu-kernel`](https://github.com/oosexgang/hackios-xnu-kernel) · [`🔗 Hacker News thread`](https://news.ycombinator.com/item?id=50196718)

---

## 14. K-Dense's scientific skills library trends at 53.9k stars — its own paper says it ran no task-level evaluation

- **Velocity:** ▮ steady
- **Source:** GitHub Trending (weekly) · 4,719+ stars this week
- **Tags:** `agent-skills` `science` `arxiv` `provenance`

`K-Dense-AI/scientific-agent-skills` is a MIT-licensed library of procedural knowledge for research agents, covering genomics, cheminformatics, medical imaging, study design and scientific communication. Each skill is a directory built around a versioned, human-readable instruction file that an agent loads only when a task calls for it, often alongside reference material and runnable scripts. The README advertises "177 ready-to-use validated skills plus 100+ scientific databases" and use by "250,000+ scientists".

**Why it matters:** The paper behind the library is considerably more careful than its README. arXiv 2609.00065 describes **163** procedures in 16 areas — not 177 — and states plainly: "We report no task-level evaluation and no host selection rate." What it does measure is context cost: always-resident skill descriptions consume 7.1% of a 200,000-token window, the median documented workflow fits within 23.9%, and 29 of 46 would overflow if every reference file were loaded. That is a useful, honest number about a real agent problem — and a reminder to read the paper under the star count.

[`🔗 K-Dense-AI/scientific-agent-skills`](https://github.com/K-Dense-AI/scientific-agent-skills) · [`🔗 arXiv 2609.00065`](https://arxiv.org/abs/2609.00065)

---

## 15. GoDaddy revokes 404,607 certificates because they didn't match its own rulebook

- **Velocity:** ▮ steady
- **Source:** GoDaddy / Mozilla Bugzilla · ~12h ago (~16:00 UTC+8)
- **Tags:** `pki` `tls` `godaddy` `certificates` `cabf`

GoDaddy (Starfield) found that 404,607 TLS certificates carried policy information — policy OIDs and CPS URI — that did not match its own published CP/CPS. Under the CA/Browser Forum Baseline Requirements that is a five-day revocation trigger, and GoDaddy says the certificates were revoked on October 21, three days after the October 18 deadline. Nothing was hacked and no keys leaked; the failure is a profile mismatch between what the certificates assert and what the issuer says it does.

**Why it matters:** The impact is entirely operational and lands on anyone still serving the old certificate: consumers generally fail open on this class of revocation, but some strict clients and pinning setups do not, and the failure mode looks like a TLS error with no obvious cause. Sites that did not re-issue within the window are the ones to check, not sites that saw an alert.

[`🔗 GoDaddy — the CP/CPS profile bug`](https://www.godaddy.com/help/what-is-the-cpcps-certificate-profile-bug-43095) · [`🔗 Mozilla Bug 2083191`](https://bugzilla.mozilla.org/show_bug.cgi?id=2083191)

---

## 16. Since our Oct 18 note on OpenCode's key leak: a malicious MCP server could run PowerShell on Windows at OAuth sign-in — and the fix shipped with no CVE

- **Velocity:** ▮ steady
- **Source:** pwn.watch / Anomaly · ~20h ago (~07:00 UTC+8)
- **Tags:** `agents` `mcp` `opencode` `rce` `windows`

A second, unrelated flaw in the OpenCode AI coding agent: a command injection let a malicious — or later-hijacked — remote MCP server execute PowerShell commands on a developer's Windows or WSL machine at the moment they started the MCP OAuth sign-in flow. The server-supplied authorization endpoint was passed unescaped to an old version of the `open` package. Anomaly fixed it in **1.18.33 on September 28**, without a CVE or a published advisory. This is separate from the October API-key breach we covered on October 18; the fix here predates it by two weeks.

**Why it matters:** The vulnerability class is ordinary — an MCP server is remote input that reaches an exec — but the remediation class is not. With no CVE, no GHSA and no advisory, dependency scanners will never flag 1.18.32, and the only available detection is a version check against a release note. If you run OpenCode on Windows or WSL, the question is not whether you were exposed but whether you are past 1.18.33.

[`🔗 pwn.watch incident`](https://pwn.watch/i/opencode-mcp-oauth-rce-windows) · [`🔗 anomalyco/opencode releases`](https://github.com/anomalyco/opencode/releases)

---

## 17. Environment Duels: the strongest agent solvers are not the strongest environment authors

- **Velocity:** ▮ steady
- **Source:** arXiv 2610.30116 · ~14h ago (~20:00 UTC+8)
- **Tags:** `arxiv` `benchmark` `agents` `co-evolution` `rl`

Shibo Jin, Zhiqiu Xu, Yiling Zou, Shangyu Gong and Mayur Naik introduce a dynamic agentic benchmark where each model both *writes* interactive environments — each with a privileged hint, aiming for tasks that capable solvers fail without the hint and pass with it — and *solves* others'. Across nine frontier models, solving and authoring turn out to be distinct skills: the strongest solvers are not the strongest authors, while smaller models write the hardest environments and the most useful hints. Head-to-head outcomes are transitive and yield a stable ranking; independent authors converge on the same designs. A reinforcement-learning study with Qwen3.8-27B then tracks how much the learner's hint lift carries over onto environments written by other authors.

**Why it matters:** A benchmark where models author the tasks is only meaningful if authoring quality is separable from solving quality — and this finds it is, in a direction nobody expected: weaker solvers produce harder environments. That matters for anyone generating synthetic training data, because capability in the generator and usefulness of the generated task are not the same axis.

[`🔗 arXiv abstract`](https://arxiv.org/abs/2610.30116) · [`🔗 PDF`](https://arxiv.org/pdf/2610.30116v1)

---

## 18. SWE-DIVE: coding agents graded on a conversation, not a well-formed issue

- **Velocity:** ▮ steady
- **Source:** arXiv 2610.30047 · ~14h ago (~20:00 UTC+8)
- **Tags:** `arxiv` `benchmark` `coding-agents` `evaluation`

Lorenz Brehme, Benjamin Steenhoek and Ruth Breu argue that SWE-bench-style evaluation is unrepresentative in two specific ways: real prompts are not as well-structured as GitHub issues, and a real session is not one prompt but a multi-turn exchange where requirements accumulate. SWE-DIVE pairs a user simulator — able to reproduce different behavioural patterns — with a conversation validator that checks whether the simulator's outputs satisfy the initial requirements and steer the agent toward a solution. The framework is packaged in a harness rather than shipped as a fixed set of transcripts.

**Why it matters:** Benchmark realism is drifting from "harder tasks" toward "messier inputs", and a simulated user is the only way to scale the second without human annotation. The open question the design raises is the same one every simulator-based eval faces: a validator that also guides the agent is measuring the agent against a moving target, and the paper's own framing is the place to check how much of the score comes from the steering.

[`🔗 arXiv abstract`](https://arxiv.org/abs/2610.30047) · [`🔗 PDF`](https://arxiv.org/pdf/2610.30047v1)

---

## 19. pwn.watch: live security incidents as plain JSON, RSS and `llms.txt`

- **Velocity:** ▮ steady
- **Source:** Hacker News · 277+ pts · 6h ago (~22:08 UTC+8)
- **Tags:** `security` `agents` `data` `rss` `tooling`

pwn.watch tracks live security incidents with three fields most CVE feeds omit — patch status, affected versions and fixed versions — plus a timeline of the posts that broke each story. At the time of writing it lists 38 live incidents: 17 critical, 20 patched, 16 partly patched, 2 with no patch. Everything is served as static files with CORS enabled, no auth and no rate limits: `/incidents.json` for the index, `/i/{slug}.json` for a full incident including an `agentBrief` Markdown remediation brief, `/i/{slug}/feed.xml` and `feed.json` for per-incident updates, `/changes.json` for every timeline update across all incidents, and `/llms.txt` describing the shape.

**Why it matters:** The data model is the argument. A CVE record tells you a vulnerability exists; it does not tell you whether a fix is out, and the "fixed version" field is exactly what an agent needs to answer "am I exposed" — which is why the `agentBrief` and the machine-readable endpoints, not the heatmap, are the interesting part. Treat it as an index over other people's reporting rather than a primary source, and follow the linked advisory before acting.

[`🔗 pwn.watch`](https://pwn.watch/) · [`🔗 llms.txt`](https://pwn.watch/llms.txt) · [`🔗 incidents.json`](https://pwn.watch/incidents.json)

---

## 20. Arc gets a sunset date: the browser stops working December 22

- **Velocity:** ▮ steady
- **Source:** Hacker News · 162+ pts · 3.5h ago (~00:27 UTC+8)
- **Tags:** `browser` `arc` `sunset` `migration`

The Browser Company announced on October 22 that Arc will be sunset on December 22, 2026, citing the constant security work a browser requires and the company's decision to concentrate those teams on Dia. The schedule is staged: October 22 disabled new account creation and shipped full data export plus a Dia importer; November 23 disables "Browse for Me" and other AI features on iOS and Android and drops sign-in and tab syncing; December 22 stops Arc on macOS and Windows entirely, deactivates accounts, and deletes personal data within 30 days, with Arc Search pulled from Google Play. Passwords, bookmarks, extensions, history, Spaces (now "Profiles"), Folders (now "Tab Groups") and Pinned Tabs import into Dia.

**Why it matters:** Arc's development stopped in May 2025 when the company pivoted to Dia, so this is a formal end to a maintenance period rather than a surprise — but a browser ending is not like an app ending: the export window is real, it closes, and account data is deleted 30 days after. Anyone with a workflow built on Arc's Spaces model should note that the feature *names* changed in the destination, which is where migration guides tend to lose people.

[`🔗 arc.net — A farewell to Arc`](https://arc.net/) · [`🔗 The Verge`](https://www.theverge.com/tech/1016832/arc-browser-shutting-down) · [`🔗 Engadget`](https://www.engadget.com/2294643/the-browser-company-is-officially-killing-arc-on-december-22/)

---

## 21. Claude proved 123 open-source libraries crash-free — 239 entry points, 180M lines of Rocq

- **Velocity:** ▮▮▮ trending
- **Source:** Anthropic Frontier Red Team · 190+ pts · 5h ago (~06:54 UTC+8)
- **Tags:** `formal-verification` `security` `anthropic` `rocq` `riscv`

On October 22 Anthropic published a collaboration with Theorem in which Claude wrote machine-checked proofs that the compiled binaries of 123 OSS-Fuzz C/C++ libraries cannot crash on any input under 64 MB. The spec is derived mechanically from each project's existing fuzz entry point — "this test suite never crashes" — and proved over the compiled RISC-V instructions using Theorem's RISC-V and Linux process semantics; the Rocq kernel checks every proof. The result is 239 entry points, roughly 180 million lines of Rocq, with a typical proof around 600,000 lines covering a binary whose median length is 18,000 RISC-V instructions. While writing them Claude found and patched bugs that fuzzing had missed across trillions of runs.

**Why it matters:** The post's own limitations section is the part to quote: the proofs describe single-threaded, statically linked RISC-V binaries against musl, while almost everyone deploys x86 or ARM with glibc; not every entry point of each library was verified; ASan does not detect every memory-safety bug; and misuse by the *caller* is out of scope entirely. "Formally verified" does not mean "bug-free" — what is proven is that no crash is reachable within a stated model, and the trusted base is Theorem's semantics, the theorem statements, and the Rocq checker. That is a much stronger claim than a fuzzer, and a much narrower one than the headline invites.

[`🔗 Anthropic — formal software verification`](https://www.anthropic.com/research/formal-verification) · [`🔗 Hacker News thread`](https://news.ycombinator.com/item?id=50202217)

---

## 22. OpenAI's Decisions API goes GA — three typed outputs, and you are not billed for tokens it doesn't write

- **Velocity:** ▮▮ rising
- **Source:** OpenAI API changelog · ~14h ago (~22:00 UTC+8)
- **Tags:** `openai` `api` `decision-models` `pricing` `agents`

`POST /v1/decisions` became generally available on October 22, running only on `gpt-6-luna`. A request carries one shared input plus 1–400 independent questions, each returning one of three typed shapes: `predicate` (a 0–1 probability a condition holds), `choice` (one of your supplied options, with per-option probabilities and confidence) or `score` (a probability-weighted average over 2–10 ordered levels). Uncached input is $0.10 per 1M tokens, cached reads $0.01, and output tokens are free; caching reuses an identical shared-input prefix of at least 1,024 tokens. GA added `input_json`, images inside individual question instructions, a 400-question ceiling (up from 200), and Zero Data Retention and HIPAA eligibility for qualifying customers.

**Why it matters:** The pricing is the design: predicting a label is billed as reading, not writing, which makes a per-request classifier cheap in a way a chat completion never is. Two constraints belong in the design doc — questions are independent, so anything dependent is a second call, and `file_id` is unsupported, so an image must be a base64 data URL or a public HTTP(S) URL. The "up to 10× faster" figure is OpenAI's, measured against its own Responses API.

[`🔗 Decisions API guide`](https://developers.openai.com/api/docs/guides/decisions) · [`🔗 API changelog (Oct 22)`](https://developers.openai.com/api/docs/changelog)

---

## 23. Base Labs open-sources mammoth-1 and elephant-1: decision models that return probabilities, not prose

- **Velocity:** ▮▮ rising
- **Source:** Baseten / Base Labs · ~1d ago (~22:00 UTC+8)
- **Tags:** `llm` `open-weights` `decision-models` `qwen` `benchmarks`

Baseten's research team released two post-trains of Qwen3.5 on October 21 — mammoth-1 (27B) and elephant-1 (9B) — trained on 6.21 million decision examples to answer fixed-option questions in a single shared-prefix pass. Neither model writes an answer: they return calibrated probabilities for yes/no, a choice among supplied options, or a score on an ordered rubric, including a trained "I don't know". Weights are on Hugging Face as `baselabs/mammoth-1` and `baselabs/elephant-1` under MIT, and both are free to try on Baseten Model APIs for a week from launch, with zero data retention by default. Baseten reports 71.24 on the Jev Decision Index 0.4 (#1 of 208) and 65.9 / 65.2 on the Artificial Analysis Decision Index, where elephant-1 ties Liquid AI's d1-ultra.

**Why it matters:** Every number here is the publisher's own: the blog names no training compute, gives no per-domain table, and the second index is not one we were able to check independently — so read "#1 of 208" as a claim about a benchmark, not a settled ranking. The interface is the substantive part: a calibrated probability per option is the shape a router, guardrail or triage step actually consumes, and it is the same shape OpenAI shipped in the Decisions API the next day.

[`🔗 Baseten — mammoth-1 and elephant-1`](https://www.baseten.co/blog/the-best-decision-models-in-the-world-mammoth-1-and-elephant-1/) · [`🔗 baselabs/mammoth-1 (MIT)`](https://huggingface.co/baselabs/mammoth-1)

---

## 24. AAIF takes in Agent Skills, Open Responses, OpenEnv and OpenSandbox — ten projects in its first year

- **Velocity:** ▮▮ rising
- **Source:** Agentic AI Foundation · ~18h ago (~18:00 UTC+8)
- **Tags:** `agents` `standards` `mcp` `governance` `open-source`

Announced on October 22 at AGNTCon + MCPCon North America in San Jose, four projects joined the Agentic AI Foundation: Anthropic's **Agent Skills** (a format for packaging instructions, scripts and resources agents load on demand), OpenAI's **Open Responses** (an open spec for multi-provider LLM interfaces based on the Responses API), Hugging Face's **OpenEnv** (containerized RL environments over MCP and Gym protocols) and Alibaba's **OpenSandbox** (a general-purpose sandbox platform with Docker and Kubernetes runtimes). They join A2A, Agent Router, agentgateway, AGENTS.md, goose and MCP — ten hosted projects, up from three when AAIF launched in December 2025.

**Why it matters:** Four competing vendors donated four pieces of the *interface* layer rather than the model layer, which is the layer where lock-in is decided: how skills are packaged, what a request/response looks like, how environments are defined, where code executes. What the announcement does not contain is as telling — no financial terms, no adoption figures beyond the project count, and no mechanism for resolving conflicts between members beyond the phrase "vendor-neutral governance".

[`🔗 AAIF announcement`](https://aaif.io/news/agentic-ai-foundation-announces-four-new-projects) · [`🔗 Linux Foundation press release`](https://www.linuxfoundation.org/press/agentic-ai-foundation-announces-four-new-projects-agent-skills-open-responses-openenv-and-opensandbox)

---

## 25. EAGLE-4 ships a speedup matrix instead of a headline — 3.35× at batch 1, 1.38× at 64

- **Velocity:** ▮▮ rising
- **Source:** eagle-hq/EAGLE-4 · 880+ stars · ~2h ago (~10:00 UTC+8)
- **Tags:** `inference` `speculative-decoding` `vllm` `sglang` `benchmarks`

EAGLE-4 is the drafted-token side of speculative decoding — "one flexible drafter for all batch sizes and hardware" — shipped as `eagle-harness` 0.1.2 with engine builds for SGLang 0.5.23, vLLM 0.32.0rc1 and TokenSpeed, plus a published draft model for Qwen3.8-27B. Its support matrix divides EAGLE-4 throughput by the same engine's no-speculation control in the same allocation: SGLang TP4 at temperature 0 measures 3.35× at 1 concurrent request, 2.11× at 8 and 1.38× at 64; at temperature 1 the same cells are 2.74×, 1.78× and 1.25×. Every cell carries a ✅/⚠️/❌ mark from a greedy-equivalence check, and shipped and unreleased candidate numbers never share a row.

**Why it matters:** Speculative-decoding claims usually decay quietly at high concurrency, and this is the rare release that publishes the decay itself — 3.35× at batch 1 is the number that gets quoted, 1.38× at 64 is the number that decides whether inference teams leave it switched on. The scope caveats are on the same page: every row is an NVIDIA B300 allocation except one AMD MI355X row that still runs the 0.1.0 packages, and the licence is a custom "Eagle-4" licence rather than an OSI one.

[`🔗 eagle-hq/EAGLE-4`](https://github.com/eagle-hq/EAGLE-4) · [`🔗 EAGLE-Corp/Qwen3.8-27B-EAGLE4 draft`](https://huggingface.co/EAGLE-Corp/Qwen3.8-27B-EAGLE4)

---

## 26. Opposable runs a 2B computer-use model on the phone itself — 27/36 screens, and the 1.5 GB download is the tell

- **Velocity:** ▮▮ rising
- **Source:** Opposable engineering blog · 17+ pts · ~1d ago (~21:00 UTC+8)
- **Tags:** `agents` `computer-use` `on-device` `android` `npu`

Opposable's Android app drives other apps through the accessibility service, and with no cloud agent connected it runs the screen-action loop locally on GUI-Owl 1.5 2B — a Qwen3-VL fine-tune from Alibaba's Mobile-Agent team — quantized to 4-bit in llama.cpp: a 1.05 GB language model plus a 445 MB vision encoder, both resident, one action per screenshot. On a Mac M2 CPU a step originally took 10.6 s (4.6 s encoder, 4.3 s prefill, 1.7 s decode) and fell to 7.3 s after cropping UI bars, pruning flat-background image tokens, caching the system prompt and adding a grounded early exit — accuracy unchanged at 27/36 on a graded screen set. Whole-task success was 4/8 and 3/8 over two rounds of eight held-out tasks, rising to 6/8 in both rounds when the tasks were split into verified subgoals. On a Galaxy S25, exporting only the vision tower to ONNX took a screen from 3.9 s on CPU to 236 ms on the Snapdragon NPU.

**Why it matters:** The published numbers are modest and the author ships them anyway, including three token-pruning configurations that all score 27/36 — the pruning bought latency, not accuracy, and saying so is rarer than the result. The deployment constraint is the real story: the NPU path exists only for Snapdragon, and unfamiliar apps are delegated to Claude, ChatGPT or Codex when a cloud agent is connected — a 1.5 GB download for a fallback.

[`🔗 Opposable — computer use on the phone itself`](https://getopposable.com/blog/computer-use-on-the-phone) · [`🔗 Hacker News thread`](https://news.ycombinator.com/item?id=50180190)

---

## 27. Since our Oct 21 note on PHP's two 9.2s: Amazon says its honeypots saw attempts four days before the patches

- **Velocity:** ▮▮▮ trending
- **Source:** BleepingComputer / Amazon Threat Intelligence · ~15h ago (~21:09 UTC+8)
- **Tags:** `cve` `php` `exploited` `patching` `exploit`

Amazon Threat Intelligence says the earliest php2shell exploitation attempts it observed landed on **October 17** — four days before the October 21 emergency release for CVE-2026-109618 and CVE-2026-109619 — and AWS CISO CJ Moses says the flaws are now broadly exploited, with attempts from a commercial anonymization network. PHP's security team maintains that pre-patch proofs of concept were not functional, and Dataminr TRACE describes observed activity as scanning, fingerprinting and non-working exploits; VirusTotal counts 5.1 million exposed PHP hosts, 3.8 million of them with at least one open port. Exploit code went public in parallel: `ikow/php2shell-poc` (1,564★, five RCE chains plus Suricata/Sigma/ModSecurity rules), `9bie`'s ASLR-bypass variant (981★), `eness`'s PoC (901★), Assetnote's scanner (324★) and OpenAI's `php2shell-checker` (843★) — two Codex skills that read `X-Powered-By` and `Server`.

**Why it matters:** The apparent contradiction is not one — failed exploit attempts are still exploitation attempts, so "PoCs didn't work" and "we saw attempts on the 17th" can both be true, and they imply very different exposure windows. Version-header scanning cannot settle it either: OpenAI's own README states that HTTP headers cannot reveal a backported fix, so `OK` describes the advertised version and not the installed one.

[`🔗 BleepingComputer — exploitation began 4 days before patches`](https://www.bleepingcomputer.com/news/security/amazon-says-php2shell-exploitation-began-4-days-before-patches/) · [`🔗 openai/php2shell-checker`](https://github.com/openai/php2shell-checker) · [`🔗 ikow/php2shell-poc`](https://github.com/ikow/php2shell-poc)

---

## 28. Capcom's CAPCOM ID breach is 11,774,247 records — and passwords were force-reset on 196 accounts, not all

- **Velocity:** ▮▮▮ trending
- **Source:** Capcom IR · ~8h ago (~04:22 UTC+8)
- **Tags:** `breach` `gaming` `credentials` `capcom` `incident`

Capcom's October 22 notice reports unauthorized access to CAPCOM ID, the account service behind Street Fighter 6, Monster Hunter and Resident Evil online play, affecting 11,774,247 records worldwide. The exposed fields are email addresses plus system identifiers — account creation time, last-login time, login count and the IP address of the last login. For 43 accounts the data also included date of birth, gender, nickname and country/region; for 196 accounts, passwords were changed without authorization and have since been reset. Capcom detected the activity on October 19, established an incident response HQ the next day, and reported to Osaka Prefectural Police and Japan's Personal Information Protection Commission on October 21.

**Why it matters:** What leaked is a phishing list, not a credential dump — email plus last-login IP and timestamp is exactly the material that makes "we detected a login from a new device" convincing, and Capcom has already warned about impersonation. The company says it has not confirmed compromise of user-chosen passwords and that no card data was held; those are "not confirmed", not "not possible", and every figure is explicitly qualified as "as of October 22".

[`🔗 Capcom — unauthorized access notice`](https://www.capcom.co.jp/ir/english/news/html/e261022.html) · [`🔗 BleepingComputer`](https://www.bleepingcomputer.com/news/security/capcom-confirms-data-breach-affecting-117-million-accounts/)

---

## 29. GMO's Onamae Desktop Cloud is still down: 26,739 servers, and FX trading credentials in the blast radius

- **Velocity:** ▮▮ rising
- **Source:** GMO Internet / Watch Impress · ~1.3d ago (~04:00 UTC+8)
- **Tags:** `breach` `vps` `japan` `fx` `incident`

GMO Internet confirmed on October 20 that malicious programs had been placed on customer servers in お名前.com デスクトップクラウド, a Windows VPS widely used for automated FX trading. All plans were suspended sequentially from 04:00 JST on October 21, and the service remains down with no restart date. GMO's October 22 statement puts the potentially affected population at 26,739 servers, and reporting says brokerage and MT4/MT5 login credentials stored on those servers appear to have been stolen, with users reporting unauthorized logins and trades; the company says it holds no card data on that infrastructure.

**Why it matters:** A VPS provider is where the customer's *own* secrets live, and this one holds brokerage logins — so the incident is simultaneously a hosting outage and a financial-account compromise with a third party (the broker) in the loop, which is why "change your server password" is not the whole remediation. Read the newest notice, not the first: the October 21 text said no personal-information leak and no misuse of viewed data had been confirmed, and the following day's statements widened that materially.

[`🔗 GMO / お名前.com notice`](https://www.onamae.com/news/article/11584) · [`🔗 Watch Impress — FX 不正利用も発生`](https://www.watch.impress.co.jp/docs/news/2150663.html)

---

## 30. Drupal Webform's 9.1 is CISA's number, on a record for an advisory dated September 23

- **Velocity:** ▮ steady
- **Source:** Drupal Security Team / NVD · ~14h ago (~22:00 UTC+8)
- **Tags:** `cve` `drupal` `provenance` `rce` `adp`

CVE-2026-96355 is a critical (18/25 on Drupal's own scale) remote code execution in the Webform contributed module: it does not sufficiently exclude certain format templates from token replacement, so an attacker can submit data that is evaluated as template code when a submission is rendered — information disclosure, stored XSS or RCE depending on configuration. Fixed in Webform 6.2.12 and 6.3.1; mitigated by the fact that an affected form must use a custom multiple-value item format that includes submission-value tokens. The Drupal advisory is dated **2026-09-23**. NVD published the CVE record on October 22 carrying a single metric — CVSS 3.1, **9.1, `Secondary`, source `134c704f-…` (CISA-ADP)** — with status `Awaiting Analysis` and zero NVD-authored metrics.

**Why it matters:** Both halves of the obvious framing are wrong. The fix shipped a month before the record, so this is a backfill, not a new Drupal RCE; and the 9.1 was written by CISA's Vulnrichment container, not by NVD and not by Drupal, whose own risk score is a 25-point composite rather than CVSS. A third-party enrichment scoring someone else's vulnerability is no longer an edge case — our own census of one October week put ADP-only scores at about 8% of published records.

[`🔗 Drupal SA-CONTRIB-2026-175`](https://www.drupal.org/sa-contrib-2026-175) · [`🔗 CVE-2026-96355 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-96355)

---

## 31. Reason Network puts your teammates' coding agents on a peer-to-peer network — one daemon, end-to-end encrypted

- **Velocity:** ▮ steady
- **Source:** reason-machines/reason-network · 1,081+ stars · ~4h ago (~08:10 UTC+8)
- **Tags:** `agents` `mcp` `p2p` `coding-agents` `infra`

Reason Network installs one small daemon per computer that registers every coding-agent session on it — Claude Code, Codex, Cursor, Gemini CLI, Copilot CLI, Grok CLI, opencode, pi, DeepSeek Harness and Reason — and publishes who is running, in which repo and branch, busy or idle, to everyone on the same network. Agents get three MCP tools (`list_team`, `send_message`, `ask_user`) plus `check_inbox`; messages land mid-session for Claude Code, Codex, opencode, pi and Reason, at the next step for Cursor, Gemini, Copilot and Grok, and can carry up to ten text files. Computers talk peer-to-peer over iroh with end-to-end encryption; hosted assistants connect through an MCP server at `mcp.reasonmachines.com`. The engine is Apache-2.0, the setup CLI is free but not open source, and the service is free.

**Why it matters:** This is one of the first widely-starred attempts to make agent-to-agent messaging a *team* primitive rather than a single-user one, and the architecture draws the trust boundary honestly — end-to-end between your own computers, but a hosted bot necessarily routes through Reason's relay. The README's own operational warning is the one to carry: never accept a webhook from a teammate's message, a file, or a web page, because an agent that takes instructions from another agent is a prompt-injection path with a friendly name.

[`🔗 reason-machines/reason-network`](https://github.com/reason-machines/reason-network) · [`🔗 Reason Network`](https://reasonmachines.com/network)

---

## 32. Reylo types your `.sql` files by having TypeScript compile them — 707 stars in two days, and it needs TS 7.1 beta

- **Velocity:** ▮ steady
- **Source:** colinhacks/reylo · 707+ stars · ~1d ago (~21:00 UTC+8)
- **Tags:** `typescript` `sql` `devtools` `types` `open-source`

Colin Hacks (Zod) published Reylo on October 21 under MIT: you `import getAuthor from "./get_author.sql"` and call `getAuthor.run(db, { id: 1 })`, and the result type follows the SQL, updating in the editor as the query changes. It is built on TypeScript 7.1's **content mappers** (`microsoft/typescript-go` PR 4712), which let a plugin define static types for foreign file extensions inside compilation — so the SQL dialect's full syntax works, with no codegen step. Postgres, MySQL and SQLite with bring-your-own driver (`pg`, postgres.js, `mysql2`, `better-sqlite3`, `Bun.sql`, Cloudflare D1); npm is at 0.3.0, six releases deep.

**Why it matters:** Content mappers are the part worth watching: this is the first project we have seen use TypeScript 7.1's new extension hook as a general compile-time type provider, which turns a language feature into a pattern others will copy. The constraint is equally real — it requires `typescript@beta` 7.1, so it is not something to drop into a build pinned to stable TS, and parameters still need explicit casts where the query does not pin a type down.

[`🔗 colinhacks/reylo`](https://github.com/colinhacks/reylo) · [`🔗 reylo.dev`](https://reylo.dev)

---

## 33. Uberblok is ZFS internals as a museum — 128 KiB rings, `N mod slots`, and source links at a pinned commit

- **Velocity:** ▮ steady
- **Source:** Show HN · 94+ pts · ~1d ago (~21:04 UTC+8)
- **Tags:** `zfs` `storage` `education` `filesystems` `show-hn`

Uberblok is an interactive, source-linked walkthrough of OpenZFS that starts at the uberblock: `ub_txg` records the latest transaction group, `ub_rootbp` points at the root of the block tree, and each disk carries four labels — two at each end — each holding a 128 KiB ring of uberblocks. A new uberblock goes into slot `N mod slots` (one slot reserved when multihost/MMP is enabled), slot size follows sector size, rounded to 1 KiB and capped at 8 KiB, which yields 128, 64, 32 or 16 slots, and on import ZFS selects the valid uberblock with the highest txg. Rooms walk through copy-on-write, checksums and self-healing, vdevs, RAID-Z, snapshots and clones, the ARC, metaslabs, ZIL/SLOG, send/receive and encryption, plus a 3D ring showing successive transaction groups occupying slots. Code excerpts pin to OpenZFS 2.4.4 at commit `71a9f95`.

**Why it matters:** Filesystem documentation usually explains the model or the code, not the on-disk arithmetic that decides which of your copies is the one that mounts — the slot-count table is the sort of detail you normally get only by reading source. It is unaffiliated with OpenZFS and says so, and it does the licensing bookkeeping most interactive explainers skip: CDDL-1.0 for the quoted source, CC BY 4.0 for the text, MIT for the site.

[`🔗 Uberblok`](https://uberblok.storagebits.workers.dev/) · [`🔗 Hacker News thread`](https://news.ycombinator.com/item?id=50180257)

---

## 34. Rubix: a 42 KB compiler written in 3,500 lines of x86-64 assembly — self-hosting is still a prototype

- **Velocity:** ▮ steady
- **Source:** GitHub (created October 19) · 1,904+ stars
- **Tags:** `compilers` `assembly` `systems` `open-source` `languages`

Rubix (`.ix`) is a systems language whose production compiler is roughly 3,500 lines of pure GNU x86-64 assembly, emitting standalone Linux ELF64 and Windows PE64 binaries with no libc, no C, no LLVM and no virtual machine. The README puts the compiler binary at about 42 KB, claims sub-millisecond builds, and lists 19 test suites covering arithmetic, control flow, functions, structs, floats via native SSE2 operators, separate compilation and Windows cross-linking. It is MIT-licensed and passed 1,904 stars in four days, with example programs including a 1,000-element sieve and a 200-element quicksort.

**Why it matters:** The interesting claim is the bootstrap one, and the repo is candid about it — the self-hosting compiler written in Rubix itself is an early ~1,000-line prototype tracked in issue #1, so today's compiler is assembly all the way down, and "self-hosting" is a roadmap item rather than a property. Treat the size and speed figures as the author's own measurements until someone reproduces them: a "42 KB compiler" is a claim about a build artefact, and the 19 test suites are the part you can actually check.

[`🔗 tek-sys-hub/Rubix-lang`](https://github.com/tek-sys-hub/Rubix-lang) · [`🔗 Issue #1 — self-hosting roadmap`](https://github.com/tek-sys-hub/Rubix-lang/issues/1)

---

## 35. GNU Taler gets a company: Taler Operations AG is being founded in Bochum to seek an e-money licence

- **Velocity:** ▮ steady
- **Source:** taler.net · 240+ pts · ~12h ago (~00:14 UTC+8)
- **Tags:** `payments` `privacy` `eu` `regulation` `fintech`

After three years of the NGI TALER project, the GNU Taler team announced that **Taler Operations AG** is being founded in Bochum to operate Taler in euro — first in Germany, then across the euro-zone — and will apply to BaFin, Germany's financial supervisor, for a licence as an e-money issuer. The role was originally GLS Bank's, but GLS decided in January 2026 not to pursue it for reasons it said were unrelated to Taler; it remains a consortium member in a supporting role. Taler issues bearer tokens that represent value, which makes it electronic money under EU regulation, and any institution issuing e-money for euros must be a bank or hold a dedicated licence.

**Why it matters:** Privacy-preserving payment systems have repeatedly stalled on the same non-technical step — finding a regulated entity willing to carry the liability — and this announcement names the entity and the regulator instead of the cryptography. Nothing is licensed yet: the BaFin application is the next step, so as of today Taler has a plan for euro operation, not euro operation.

[`🔗 taler.net — Getting ready to operate Taler in Germany`](https://www.taler.net/en/news/2026-13.html) · [`🔗 Hacker News thread`](https://news.ycombinator.com/item?id=50197404)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-10-23T04:15:43Z |
| Items | 35 |
| Sources tracked | 16 (Hacker News, GitHub Trending, NVD, CVE Program, GitHub Advisory DB, vendor advisories, arXiv, Hugging Face, OpenAI/Anthropic/Baseten engineering blogs, standards foundations, security research blogs) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[Previous day](2026-10-22.md) · [Raw .md](https://trending.md/en/feed/2026-10-23.md) · [Archive](../archive/)
