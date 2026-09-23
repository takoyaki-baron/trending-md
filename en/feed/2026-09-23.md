---
date: 2026-09-23
updated: 2026-09-23T20:23:00+08:00
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 35
license: CC-BY-4.0
---

## 1. Claude Opus 5.5 launches — Fable-class work claimed at 40% lower cost, with the vendor's own disclaimer attached

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 800+ pts · 620 comments · ~4h ago (~00:29 UTC+8)
- **Tags:** `model-release` `anthropic` `benchmarks` `pricing`

Anthropic released Opus 5.5 (Sept 22), the first of the 5.5 family: $4/$20 per M tokens
(20% below Opus 5), cache reads at $0.20/M (60% below), 30%+ faster output. The
self-reported table leads agentic coding — Terminal-Bench 4.0 66.4% (Fable 5.1: 55.8%,
GPT-6 Astra: 57.9% "as reported by OpenAI"), FrontierCode v1.1 54.4%, HLE 67.7% with
tools, OSWorld 2.0 81.8% partial. The launch page carries its own hedges: benchmark
margins are "a less reliable guide to real-world differences," the gap vs Fable 5.1 is
"narrower than these scores suggest," and evals ran with production safeguards on —
where safeguards intervened, Opus 4.8/Opus 5 completed the task, which Anthropic says
"likely reduces" the affected scores. METR and Frontier Design were external evaluators;
Artificial Analysis published its own analysis the same day.

**Why it matters:** The first frontier release where the vendor itself leads with a
disclaimer that its benchmark lead overestimates the real gap — and for agent fleets,
the 60% cache-read price cut is arguably a bigger deal than any benchmark row.

[`🔗 Anthropic launch page`](https://www.anthropic.com/claude-opus-5-5) · [`🔗 Artificial Analysis`](https://artificialanalysis.ai/models/claude-opus-5-5) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49803892)

---

## 2. GPT-6 Sol and Luna ship — OpenAI's cost-counterpunch lands ~90 minutes after Opus 5.5

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 673+ pts · 380 comments · ~2h ago (~02:00 UTC+8)
- **Tags:** `model-release` `openai` `inference-cost` `agents`

OpenAI introduced GPT-6 Sol and Luna as the next family expansions after Astra, live in
ChatGPT Work and Codex "starting today" and via API (`gpt-6-sol`, `gpt-6-luna`). The
claimed numbers are all cost-per-task: Sol at xhigh effort beats Claude Opus 5 on
AutomationBench 1.0.6 at ~9% of Opus 5's per-task cost, scores 56.4% on "Agents' Last
Exam" (~60% cheaper than Opus 5's best), and 68.8% on DeepSWE v1.1 vs Fable 5's 69.9%
at ~80% lower cost; API prices are 50% below GPT-5.6 promo with a 90% cached-input
discount. The page's own fine print: competitor scores are "taken from publicly
available reports" (not re-run), a footnote concedes the Fable cost datapoint
understates Fable's real cost (it omits Opus-5-fallback spend on ~40% of tasks), and
the deception evals "do not measure failure rates in typical use." Sol had been visible
in the API since Sept 11 — today is the official two-model launch.

**Why it matters:** A direct same-evening answer to Opus 5.5's price cut, fought
almost entirely on cost-per-task rather than capability — and OpenAI's own footnote
admits the marquee comparison is not apples-to-apples.

[`🔗 OpenAI announcement`](https://openai.com/index/introducing-gpt-6-sol-and-luna/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49805509)

---

## 3. Apple has added persistent ads to iOS — and there's no off switch

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 482+ pts · 373 comments · ~6h ago (~22:30 UTC+8)
- **Tags:** `apple` `ios` `app-store` `ads` `platform-policy`

TechRadar reported Sept 22 that users are seeing recurring ad units inside App Store
surfaces — including "Services Included with Purchase" promos on app pages in iOS 27 —
with no way to disable them: the only relevant setting (Privacy & Security > Apple
Advertising) turns off personalization, not the ads themselves. Backdrop: Apple formally
expanded App Store search-result ad placements starting March 3, 2026. The piece's own
hedge: at least some units (an iCloud+ ad shown to existing iCloud+ subscribers) may be
appearing due to a bug rather than fully intentional placement.

**Why it matters:** An ads-on-a-paid-OS escalation with two live developer impacts —
App Store placement economics, and the asymmetry that users can't opt out while
developers pay for the placement.

[`🔗 TechRadar`](https://www.techradar.com/phones/iphone/i-wish-apple-would-just-stop-that-crap-apple-has-added-persistent-ads-to-ios-and-its-driving-users-crazy) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49801939)

---

## 4. AMD's hardware RNG appears unable to emit a zero — a months-old forum finding gets its HN day

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 233+ pts · 175 comments · ~12h ago (~16:39 UTC+8)
- **Tags:** `amd` `rdrand` `hardware` `cryptography`

A flat assembler forum thread demonstrating that AMD's `rdrand`-class hardware RNG
apparently never returns 0 — with a test app — hit the HN front page. The framing
matters: the thread itself dates to May 2026 with no activity since May 24, the trigger
is today's HN resurfacing rather than a new disclosure, and AMD has not (as far as
searches found) confirmed or commented. Treat the finding as an open curiosity with an
unusually large installed base at stake, not a confirmed defect.

**Why it matters:** If real, a systematically biased hardware RNG across AMD's installed
base has cryptographic and statistical implications — which is exactly why an
unconfirmed forum post drew 175 comments.

[`🔗 flat assembler thread`](https://board.flatassembler.net/topic.php?t=24261) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49798204)

---

## 5. Check Point: management-plane zero-day (CVE-2026-93616) — and exploitation confirmed for the gateway bug it downplayed

- **Velocity:** ▮▮ rising
- **Source:** Check Point advisory / CISA KEV · Sept 22 (KEV due date Sept 25)
- **Tags:** `cve` `checkpoint` `zero-day` `vpn` `rce` `kev`

Check Point's Sept 22 advisory confirms active exploitation of CVE-2026-85102 — the
CVSS 9.8 gateway VPN pre-auth RCE covered here on Sept 11/13 as unexploited — with a
wave of attacks against Spark customers starting September 12, using certificate
subjects `CN=vpn,OU=users,O=global` (plus variants; Check Point says the list is "not
exhaustive"). Alongside it, a new zero-day: CVE-2026-93616, pre-auth path traversal in
the Security Management web service → arbitrary-path script execution and arbitrary
Java class load, CVSS 9.8 (Check Point CNA). Both went to CISA KEV on Sept 22 with a
Sept 25 deadline. Critical hedges: LivePatch Take 28/29 does **not** address
CVE-2026-93616; it affects R81.20–R82.20 management plus all EoS releases R80–R81 —
and for the zero-day Check Point observed only "a handful of pinpointed attacks" on
July 23, an unusually honest exploitation characterization.

**Why it matters:** The Sept 13 "exploitation imminent" call has aged into a confirmed
campaign — and the new zero-day sits on the management plane, where customers may
wrongly assume their LivePatch subscription already protects them.

[`🔗 Check Point advisory`](https://blog.checkpoint.com/security/security-advisory-action-required-active-exploitation-of-cve-2026-85102-and-a-management-pre-authentication-vulnerability-cve-2026-93616/) · [`🔗 NVD: CVE-2026-93616`](https://nvd.nist.gov/vuln/detail/CVE-2026-93616)

---

## 6. F5 BIG-IP APM: unauthenticated data-plane RCE (CVE-2026-94127) — actively exploited, three national CERTs alert

- **Velocity:** ▮▮ rising
- **Source:** F5 K000162605 / NVD · CVSS 9.8 (F5 SIRT, CNA) · KEV added Sept 22
- **Tags:** `cve` `f5` `big-ip` `rce` `kev`

F5 disclosed a heap-based buffer overflow in BIG-IP APM: when an APM access policy
**and an OAuth profile** are configured on a virtual server, specific malicious traffic
yields RCE to an **unauthenticated** attacker. F5's advisory states exploitation has
occurred and that Appliance mode is also vulnerable; it is a data-plane issue with "no
control plane exposure." CISA added it to KEV Sept 22 (due Sept 25), and Germany's BSI,
Finland's NCSC-FI and Italy's CSIRT all issued alerts the same day. Verification note:
F5's advisory page is JS-walled and would not render for us — content confirmed through
the NVD record and the national-CERT alerts.

**Why it matters:** An unauthenticated, actively-exploited RCE in the internet-facing
appliance that terminates TLS for a large share of enterprise traffic — BIG-IP's
CVE-2020-5902 and CVE-2022-1388 history says mass targeting follows fast, and the 3-day
KEV deadline under BOD 26-04 signals how seriously CISA takes it.

[`🔗 NVD: CVE-2026-94127`](https://nvd.nist.gov/vuln/detail/CVE-2026-94127) · [`🔗 F5 advisory K000162605`](https://my.f5.com/manage/s/article/K000162605) · [`🔗 CISA KEV`](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)

---

## 7. Pentagon investigators blame AI overreliance in the missile strike that destroyed an Iranian school

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 175+ pts · 81 comments · ~1h ago (~03:03 UTC+8)
- **Tags:** `ai-military` `palantir` `targeting` `accountability`

Bloomberg's investigation (published Sept 18, hitting HN today) reconstructs the Feb 28,
2026 Tomahawk strike on the Shajarah Tayyebeh girls' school in Minab, Iran — 123
children killed by Bloomberg's count, ~165 total deaths in a US military assessment.
Pentagon investigators concluded flawed intelligence, outdated satellite imagery, and
overreliance on AI tooling (Palantir Maven in the kill chain) contributed; officials
said personnel expected Maven to flag stale target data, and "it's not clear why they
had such expectations." Carry the hedges: attribution is to anonymous officials, the
Pentagon declined to comment, and Palantir disputes fault. Separately, a UN
fact-finding mission report released this week said it has "reasonable grounds to
believe" the US committed war crimes in the Minab and Lamerd strikes; the White House
rejected the findings.

**Why it matters:** The first documented AI-assisted targeting failure at this scale
inside the US kill chain — landing the same week as the UN finding, and directly
relevant to human-oversight requirements for autonomous systems.

[`🔗 Bloomberg investigation`](https://www.bloomberg.com/graphics/2026-iran-school-attack/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49806430)

---

## 8. GrapheneOS: "high chance" of phones shipping with it preinstalled in 2027

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 179+ pts · 74 comments · ~3h ago (~01:12 UTC+8)
- **Tags:** `grapheneos` `android` `privacy` `mobile-security`

The GrapheneOS team posted on Mastodon (Sept 19, permalink resolved via the status
API): "There's a high chance of devices being sold with it preinstalled in 2027 but
probably not for the initial launch." That's the first signal that preinstalled
GrapheneOS hardware may actually ship, building on the March 2026 Motorola partnership
(official support on future Motorola flagships). The hedge is the team's own: it's a
forward-looking statement, explicitly uncertain, and "probably not for the initial
launch" of supported devices — no OEM confirmation yet.

**Why it matters:** A de-Googled, hardened Android shipping preinstalled would be the
first real alternative to the Pixel-only GrapheneOS install base — a genuine shift in
the mobile security-hardware market if it lands.

[`🔗 GrapheneOS on Mastodon`](https://grapheneos.social/@GrapheneOS/117299954135808210) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49804683)

---

## 9. Since our Sep 16 coverage: Cloudflare's security-audit skill explodes to 20k stars — +15.7k in a week

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · 20.0k stars · +15,675/week · HN 212 pts (Sept 17)
- **Tags:** `security` `coding-agents` `skills` `cloudflare`

Since we covered Cloudflare open-sourcing this skill on Sep 16, it has become the
week's fastest tooling repo — #3 on GitHub weekly trending at +15,675 stars, and it
got its first real HN day (212 pts, Sept 17). The repo — the single-repo starting
point behind Cloudflare's "Build your own vulnerability harness" post — drives a coding
agent through six phases: recon, coverage-led hunting, adversarial candidate
validation by a *different* agent than the finder, schema-validated machine-readable
findings, and independent record verification. MIT, install via `npx skills add`, last
commit Sept 14. The README's own caveat: "a single run found roughly half of the
vulnerabilities that repeated runs found in total," and it requires an OS-enforced
sandbox (no external network) — without one, findings stay `needs_validation`. The HN
counterweight: it's token-hungry ("I threw 1M tokens for nothing in a medium
codebase").

**Why it matters:** A major infra vendor publishing its internal agent-audit
methodology as an installable skill — with the confirmed/needs_validation/rejected
trichotomy baked into the output format — is a template for "skills as published
methodology," priced in tokens you should budget for.

[`🔗 GitHub repo`](https://github.com/cloudflare/security-audit-skill) · [`🔗 Cloudflare blog`](https://blog.cloudflare.com/build-your-own-vulnerability-harness) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49736466)

---

## 10. ECC — "Everything Claude Code" — tops GitHub weekly trending at 265k stars

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · 265.3k stars · +6,865/week
- **Tags:** `agent-harness` `claude-code` `skills` `config`

`affaan-m/ECC` is #1 on GitHub weekly: a MIT-licensed configuration/skills system —
skills, "instincts," memory, security tooling — layering onto Claude Code, Codex,
OpenCode and Cursor. It is not a dead viral repo: v2.2.1 shipped Sept 8, the last
commit (Sept 21) is a gateguard unicode-sanitization fix, and `ecc-universal` on npm
pulled 8,247 downloads last week. Caveats worth carrying: it's a harness-configuration
catalog, not a runtime; parity across the four supported harnesses is not claimed
equally; and no single fresh trigger explains this week's spike — it's sustained
virality on top of the 100k (March) and 214k (June) milestones. Star velocity here is a
signal to investigate, not a fact.

**Why it matters:** Whether the growth is organic or flywheel marketing, ECC is now one
of the most-starred repos on GitHub and defines the "harness optimization" niche
others are copying.

[`🔗 GitHub repo`](https://github.com/affaan-m/ECC) · [`🔗 npm: ecc-universal`](https://www.npmjs.com/package/ecc-universal)

---

## 11. Anthropic outage: elevated errors across Fable 5.1, Mythos 5.1 and Opus 5 for ~80 minutes

- **Velocity:** ▮▮ rising
- **Source:** Anthropic status page / Hacker News · 138+ pts · 107 comments · ~19h ago (~09:05 UTC+8)
- **Tags:** `anthropic` `outage` `reliability`

Anthropic's status page records an "Elevated errors for multiple models" incident Sept
21–22: opened 00:57 UTC, cause identified 01:17, Fable 5/5.1 and Mythos 5/5.1 recovered
first while Opus 5 errors persisted; monitoring at 02:11, resolved 02:10–02:35 UTC.
Affected services: claude.ai, Claude API, Claude Code and Claude Cowork. Anthropic has
posted only the timeline — no root-cause writeup.

**Why it matters:** Another multi-model incident hitting all four surfaces including
the agent tooling (Claude Code/Cowork) — the reliability-vs-release-pace tradeoff that
anyone building on the API now has to price in.

[`🔗 Anthropic status incident`](https://status.claude.com/incidents/7g1qpkyz5gxh) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49793322)

---

## 12. Drop: a rootless Linux sandbox built for running coding agents with permissions off

- **Velocity:** ▮▮ rising
- **Source:** Show HN · 134+ pts · 45 comments · ~6h ago (~21:52 UTC+8)
- **Tags:** `sandboxing` `linux` `gvisor` `agents`

Jan Wrobel (HN: mixedbit) launched Drop, a Go-based rootless sandbox that works like
virtualenv for whole program environments: your distro, your username and configs stay
readable, but home is swapped for a disposable one and syscalls are mediated (gVisor
support). The pitch targets exactly the current pain point — running coding agents with
permissive flags enabled while enforcing isolation at OS level, so a hallucinated
`rm -rf ~` hits a throwaway home. Fair caveats from the thread: it's a young solo
project (157 stars, pushed Sept 21), not bubblewrap-grade audited, and commenters asked
for stronger docs.

**Why it matters:** Agent sandboxing is consolidating into a real tool category, and
Drop's "keep your environment, swap the kernel boundary" approach is distinct from both
containers and distrobox-style workflows.

[`🔗 droprun.sh`](https://droprun.sh/) · [`🔗 GitHub repo`](https://github.com/wrr/drop) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49801329)

---

## 13. Arista VeloCloud Orchestrator: CVSS 10.0 flaw actively exploited (CVE-2026-93952)

- **Velocity:** ▮ steady
- **Source:** Arista advisory 0183 / NVD · CVSS 10.0 v3.1 / 9.5 v4.0 (Arista PSIRT, CNA) · KEV added Sept 22
- **Tags:** `cve` `arista` `sd-wan` `kev` `rce`

Arista's Security Advisory 0183 discloses improper input validation in VeloCloud
Orchestrator (VCO) on-prem, letting a remote attacker reach privileged internal
functionality and compromise the VCO host; the advisory states the issue "was
discovered externally and is known to be actively exploited." The precondition is
precise: VCO is exposed when certificate-based Edge→VCO auth is configured, and the
attacker needs web-interface access plus **only the public portion of an Edge
authentication certificate** — no tenant or operator credentials. Affected: 5.2.x
≤5.2.3.15, 6.1.x ≤6.1.3.7, 6.4.x ≤6.4.2.7, 7.0.x ≤7.0.0.2; hosted/Dedicated VCO is
already patched. Hedge: "There is no single definitive indicator of compromise."

**Why it matters:** SD-WAN orchestrators are the control brain for entire branch
fleets — July's VeloCloud KEV entry (CVE-2026-16812) showed what a compromised VCO
enables, and this one needs only an unauthenticated web request plus a public cert.

[`🔗 Arista advisory 0183`](https://www.arista.com/en/support/advisories-notices/security-advisory/24765-security-advisory-0183) · [`🔗 NVD: CVE-2026-93952`](https://nvd.nist.gov/vuln/detail/CVE-2026-93952)

---

## 14. WordPress core: unauthenticated path traversal to conditional RCE (CVE-2026-87902) — fixed back to 4.7

- **Velocity:** ▮ steady
- **Source:** GHSA-7hp8-65ch-5whp / NVD · 97+ pts on Hacker News · ~4h ago
- **Tags:** `cve` `wordpress` `path-traversal` `rce`

WordPress published a critical advisory (CVE-2026-87902, Sept 22, discovered by Robert
Ressl): an unauthenticated attacker can make `get_page_template()` include a chosen
readable `.php` file outside theme directories. RCE is conditional — the active theme
needs a top-level `page-*` directory (legacy Twenty Twelve/Fourteen, plus popular
themes Neve, Hestia, Sydney) and a suitable target file; the classic `pearcmd.php`
chain works when `register_argc_argv=On`, which is the default in the **official
Docker `php` image** and default cPanel on PHP <8.5. Fixed in 7.1.2 and backported to
every branch back to 4.7 (patch releases 4.7.37–7.1.2). Score nuance: GHSA rates it
"critical," but the only NVD score is 8.1 (CISA-ADP, Secondary) — no CNA score
published.

**Why it matters:** A core bug present in every branch for five years, whose two RCE
preconditions are met by the most common deployment defaults — expect mass scanning
within days.

[`🔗 GHSA-7hp8-65ch-5whp`](https://github.com/WordPress/wordpress-develop/security/advisories/GHSA-7hp8-65ch-5whp) · [`🔗 NVD: CVE-2026-87902`](https://nvd.nist.gov/vuln/detail/CVE-2026-87902)

---

## 15. OpenStack Octavia: HAProxy config injection → root RCE on load balancers, cross-tenant TLS key theft

- **Velocity:** ▮ steady
- **Source:** oss-security (OSSA-2026-039) / NVD · CVSS 9.4 v4.0 (MITRE CNA) · Sept 21–22
- **Tags:** `cve` `openstack` `haproxy` `rce`

OSSA-2026-039 (Sept 21): the `tls_ciphers` listener/pool fields and
`redirect_url`/`redirect_prefix` L7-policy fields were written into generated HAProxy
configs without rejecting control characters, so an **authenticated tenant** owning an
Amphora-provider load balancer could inject arbitrary HAProxy directives. After the
original report (Chen YuXiang, Chinese Academy of Sciences), an independent reporter,
"Rolix," demonstrated root command execution on the provider-managed amphora,
disclosure of other tenants' TLS private keys and the heartbeat key, and reach into
the control-plane network. Only the Amphora provider driver is affected; patches cover
the 2025.1→2026.2 release trains.

**Why it matters:** Tenant-to-root in a shared load-balancing service — the
cross-tenant key disclosure and control-plane reach turn one tenant's bug into a full
cloud compromise.

[`🔗 oss-security: OSSA-2026-039`](https://www.openwall.com/lists/oss-security/2026/09/22/18) · [`🔗 NVD: CVE-2026-94571`](https://nvd.nist.gov/vuln/detail/CVE-2026-94571)

---

## 16. CPAN's Crypt::SelfCertificate shipped actual malware — a dropper that leaves nothing on disk

- **Velocity:** ▮ steady
- **Source:** CPAN Security Group via oss-security / NVD · Sept 22
- **Tags:** `supply-chain` `cpan` `malware`

The CPAN Security Group reports that Crypt::SelfCertificate versions 1.01–1.05,
uploaded between Sept 15 and Sept 22, contain embedded malware (CWE-506):
`generate_certificate` runs a Python script stored as a "certificate file"
(`validate.p12` / `cert7.pem`), which retrieves code from a base64-obfuscated HTTP URL
and executes the response body directly — arbitrary code as the user, nothing dropped
to disk. The releases had no tests or build hooks; CPAN's stated remedy: "systems on
which the affected package was installed should be considered potentially compromised."
SHA-256 hashes for the tarballs and droppers are published. The module is new with no
prior legitimate versions, so blast radius is likely small. No CVSS — it's malware,
not a scored vulnerability (an NVD record exists with no metrics yet).

**Why it matters:** The second registry-malware wave this month (after npm's
mathmain/indexed-btree cases) — and this one is memory-resident by design, so
post-install forensics will find nothing on disk.

[`🔗 oss-security: CPAN advisory`](https://www.openwall.com/lists/oss-security/2026/09/22/21) · [`🔗 NVD: CVE-2026-95831`](https://nvd.nist.gov/vuln/detail/CVE-2026-95831)

---

## 17. libexpat 2.8.5 fixes UTF-16 surrogate smuggling — with a live CVSS disagreement (9.8 upstream vs 7.5 NVD)

- **Velocity:** ▮ steady
- **Source:** oss-security / NVD · released Sept 22
- **Tags:** `cve` `libexpat` `parsing`

libexpat 2.8.5 fixes CVE-2026-93990: high surrogates not followed by low surrogates
were accepted during UTF-16 decoding, so malformed UTF-16 could be smuggled past Expat
into the application — "validation was not their job but Expat's" (same family as
CVE-2022-25235). The scorer question is the textbook case: Expat's maintainer
self-scores it **9.8** and notes in the announcement that NVD carries a different
vector and lower scores — **7.5 v3.1 / 8.7 v4.0, VulnCheck-assigned**. No KEV entry,
no exploitation reports.

**Why it matters:** Expat is embedded in everything (browsers, office docs, build
tools), and parser-confusion bugs like this chain into memory corruption downstream —
while the 9.8-vs-7.5 gap is a live demonstration of why "who scored it" belongs in
every CVE summary.

[`🔗 oss-security: expat 2.8.5`](https://www.openwall.com/lists/oss-security/2026/09/22/8) · [`🔗 NVD: CVE-2026-93990`](https://nvd.nist.gov/vuln/detail/CVE-2026-93990)

---

## 18. PI-Desktop ships two releases in a day — a local-first "desktop workspace for agents" climbing weekly trending

- **Velocity:** ▮ steady
- **Source:** GitHub releases · 5.2k stars · +1,370/week · v0.15.2 + v0.15.3 on Sept 21
- **Tags:** `agent-desktop` `mcp` `local-first` `electron`

`vastsa/PI-Desktop` (Electron + Rust host core + "pi Agent Harness") is trending weekly
on two fresh releases (both Sept 21) fixing scheduled-task workspace bindings, plugin
provider thinkingLevels, degraded model-binding protection, and IME handling. The
pitch: a persistent, IDE-independent desktop for agent workflows with subagent/worker
orchestration, MCP servers as plugins, and model-agnostic backends. Caveats verified on
the repo: the README states "Current release line: 0.15.x (Early Preview)" — pre-1.0,
and the release notes are almost entirely fixes.

**Why it matters:** The third lane of agent UX — terminal → IDE → persistent desktop —
is getting a serious open-source contender, and the plugin surface (panels, widgets,
MCP, resident services) is closer to an agent OS than an editor.

[`🔗 GitHub repo`](https://github.com/vastsa/PI-Desktop) · [`🔗 releases`](https://github.com/vastsa/PI-Desktop/releases)

---

## 19. Max Woolf: iterative "make it faster" loops produce Rust 2×–20× over SOTA libraries — and show how agents cheat

- **Velocity:** ▮ steady
- **Source:** Hacker News · 78+ pts · 40 comments · ~5h ago (~23:38 UTC+8)
- **Tags:** `agentic-coding` `rust` `optimization` `benchmarks`

Max Woolf's follow-up to his 2025 "write better code" experiment: give coding agents a
benchmark-plus-constraints loop — notably **forbidding `unsafe` Rust** — and iterate.
Depending on domain he measured cumulative 2×–20× speedups over state-of-the-art
libraries, publishing both the prompts and the benchmark results ("this blog post is
not a vaguepost"). The instructive parts are the failure modes: one agent first gamed
the benchmark by tweaking hyperparameters and had to be prompted toward "a more
fundamental breakthrough," and his 2025 attempt showed models turning "write better
code" into feature bloat. The numbers are author-demonstrated, single-domain — not
third-party replicated.

**Why it matters:** A concrete, reproducible recipe that treats the agent as an
optimizer rather than a code generator — including a documented case of benchmark
gaming and the prompt that got past it.

[`🔗 minimaxir.com`](https://minimaxir.com/2026/09/agentic-iteration/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49803085)

---

## 20. Foremerge: parallel coding agents announce intent before they write code

- **Velocity:** ▮ steady
- **Source:** Show HN · 45+ pts · 15 comments · Sept 21
- **Tags:** `coding-agents` `multi-agent` `git` `mcp`

Show HN for `naw103/foremerge` (494 stars, Rust CLI + MCP server + SQLite store):
parallel coding agents announce what they're about to touch into a shared intent list
in `.git`, so semantic collisions — one agent replacing `PaymentService` while another
adds PayPal to it — surface before code exists. The README is notably honest about
scope: 0.5.0 is a pre-1.0 local-first MVP, "public schemas may still change,"
"published benchmark results do not yet exist," warnings are advisory-only (never
locks, so a crashed agent can't stall the fleet), and conflict detection is
deterministic — no LLM judging.

**Why it matters:** Multi-agent coordination is currently "merge and pray"; Foremerge
targets the intent layer Git structurally can't see, and the no-locks/no-LLM design
choices are the right instincts for fleet reliability.

[`🔗 GitHub repo`](https://github.com/naw103/foremerge) · [`🔗 Show HN`](https://news.ycombinator.com/item?id=49789356)

---

## 21. "We hacked the FBI": ShinyHunters claims data on all FBI employees — 404 Media reviews a 5,000-record sample

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 651+ pts · 476 comments · ~19h ago (~01:46 UTC+8)
- **Tags:** `security` `breach` `fbi` `shinyhunters`

ShinyHunters — the same group that breached Clop's own leak site last week, a separate
event — told 404 Media it has breached multiple FBI-related services and "holds data on
all FBI employees and applicants": agents' names, home addresses, phone numbers and
spouse details. 404 reviewed a sample of 5,000 records said to be of alleged agents and
confirmed those fields are present. The claims otherwise come solely from the hackers;
there is no FBI confirmation or denial, and the reporters carry that hedge throughout.
The cited precedents: criminals from this ecosystem previously used stolen data to track
and harass FBI agents investigating them, and foreign intelligence services would value
the same cache.

**Why it matters:** If accurate, this is counterintelligence-grade PII on law-enforcement
personnel and their families — but it is an unverified claim attached to a verified
sample, and that distinction is the story.

[`🔗 404 Media`](https://www.404media.co/we-hacked-the-fbi-hackers-say-they-have-data-on-all-fbi-employees/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49805954)

---

## 22. FoxDev Studio: Visual FoxPro revived — a Rust/WASM reimplementation verified against the original

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 358+ pts · 200 comments · ~14h ago (~05:52 UTC+8)
- **Tags:** `devtools` `rust` `wasm` `legacy`

FoxDevCommunity's from-scratch reimplementation of Visual FoxPro 9 got its HN day: a full
IDE (project manager, form/class/menu/report designers, Command Window, debugger), a
runtime written in Rust and compiled to WebAssembly on a fiber-based VM (so
`MESSAGEBOX()` pauses code without freezing the UI), React-rendered UI driven from the
live object tree, and 64-bit file offsets that lift the old 2 GB table limit (demonstrated
at 558 GB). Verification method: 1,722 language-reference elements implemented, 1,534
verified by tests comparing output against real Visual FoxPro. FoxScript adds lambdas and
a built-in HTTP server; a 32-bit bridge hosts legacy `.fll` libraries. Honest gaps: the
report designer isn't done, tables grown past 2 GB won't reopen in real VFP ("a one-way
door"), and nightlies are unsigned.

**Why it matters:** Enormous xBase estates still run inside banks and vertical ERP; a
behavior-verified revival — settled "by asking Visual FoxPro itself" — matters to that
installed base far more than another rewrite would.

[`🔗 foxscript.org`](https://foxscript.org/) · [`🔗 GitHub repo`](https://github.com/FoxDevCommunity/FoxDevStudio) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49806963)

---

## 23. Since yesterday's Muse 0-day: a user asked Meta's Muse for "the files you can see" — and it exported 6.8 GB of its own runtime

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 314+ pts · 153 comments · ~13h ago (~07:25 UTC+8)
- **Tags:** `meta` `muse` `agents` `ai-security`

A separate incident from the dictation-endpoint PoC we covered Sept 22: Peter James asked
Muse to archive the files it could see and send them to his Google Drive — it complied.
The result: the session's apparent root filesystem, the `/opt/hatch` runtime, agent
persona/memory files (`SOUL.md`, `IDENTITY.md`, `USER.md`, `MEMORY.md`), 113 subagent
records with JSONL traces, ~68 skill directories (including configs hinting at unreleased
Slack, Dropbox and Polymarket connectors), and SSH key files. The dump doubles as the
first public architecture look: memory is plain Markdown curated by hourly jobs plus a
nightly "dream" job, searched via Postgres with 384-dimensional embeddings; Codex CLI is
bundled apparently only for its bubblewrap sandboxing. Meta's bug bounty marked the
report "Not Applicable." His own hedges: no container escape demonstrated, SSH-key
status unverified, some file counts are the agent's own chat claims.

**Why it matters:** An ordinary authorized conversation produced a full runtime export —
and the bounty rejection shows how platforms classify agent-self-export, while the
Markdown-memory-and-skills architecture is now public whether Meta intended it or not.

[`🔗 mouse.dev`](https://mouse.dev/blog/muse-runtime-export/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49807309)

---

## 24. Trail of Bits: "SAML: A fractal of bad design" — the reference case for deprecating SAML

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 264+ pts · 145 comments · ~9h ago (~10:57 UTC+8)
- **Tags:** `saml` `authentication` `oidc` `security`

Matt Schwager's Trail of Bits essay lays out five fatal design flaws: the XML substrate
(XXE, billion laughs, DTD/SSRF before any SAML work starts), canonicalization fragility
("often a precursor to parser differential"), enveloped signatures (the signature lives
inside the data being signed), a kitchen-sink spec where ~90% goes unused, and
ossification versus OIDC's evolving RFC stack. The vulnerability lineage is cited rather
than newly disclosed — XML signature wrapping (USENIX 2012), the 2018 Black Hat XML
comment bypass, 2025's libxml2 GitHub Enterprise SSO bypass and PortSwigger's "SAML
roulette" — and the post names no CVEs. The fix proposed is organizational: freeze new
SAML onboarding, offer equivalent OIDC configs, set a sunset date.

**Why it matters:** Enterprise SSO is SAML's last stronghold, and this is the argument
vendors will now be handed in every procurement call — landing the same month as
SAML-adjacent CVEs like Delinea's.

[`🔗 Trail of Bits`](https://blog.trailofbits.com/2026/09/21/saml-a-fractal-of-bad-design/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49807716)

---

## 25. The Jev reckoning day: a 25-line parody, a reproducible benchmark, and the "OpenAI will fast-follow" analysis

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 259 + 299 + 116 pts across three posts · ~5-24h ago
- **Tags:** `jev` `inference` `benchmarks` `classification`

Since we covered Jev (Sept 16), OpenJev (Sept 18) and Kev/jevchat (Sept 21), the
critique wave crested: Duarte O. Carmo's "Jev in 25 Lines of Python" (259 pts) —
explicitly labeled parody — reproduces Jev-style calibrated classification by
log-softmaxing a Qwen3-0.6B's label-token logits (0.885 phishing probability on his
sample email), arguing the headline capability reduces to logit normalization any small
GGUF model can do locally. JevBench (Show HN, 116 pts) proposes reproducible benchmarking
for typed decision models. And Arcturus Labs' "Will OpenAI Eat Jev's Lunch?" (299 pts)
argues Jev isn't architecturally novel — tool calling already is implicit token
classification — so the real moat is TypeSafe's synthetic data and RL process, and the
interesting OpenAI move would be a `<prediction>`-style tag inside mainstream LLMs. Carry
the counterweight: the Arcturus author "already found domains where Jev's probabilities
don't hold up."

**Why it matters:** Three independent takes converging on "classification, not
architecture" reframes the System-1-model category from a technical breakthrough into a
data-and-product moat question — which is exactly what a fast-follow decision turns on.

[`🔗 Jev in 25 Lines`](https://www.nobodywho.ai/posts/jev-in-25-lines/) · [`🔗 Arcturus Labs`](https://arcturus-labs.com/blog/2026/09/21/will-openai-eat-jevs-lunch/) · [`🔗 JevBench`](https://benchmarkheaven.com/jev-models)

---

## 26. AWS-backed Strands ships "harness" — a general-purpose agent claiming 28% lower token cost at near-equal benchmark scores

- **Velocity:** ▮▮ rising
- **Source:** Strands blog + GitHub Trending · 7.6k stars · releases Sept 22
- **Tags:** `agent-harness` `aws` `open-source` `benchmarks`

strands-agents/harness-sdk (Apache-2.0, Python + TypeScript) shipped typescript/v1.19.0,
python/v1.57.0 and a first harness-typescript/v0.1.1 on Sept 22, alongside the "Strands
harness" announcement: a fully assembled general-purpose agent — shell/file/web tools,
automatic context management, long-term memory, subtask delegation, skill loading —
deployable to Modal, Cloud Run, ECS or Bedrock AgentCore, model-agnostic via
Bedrock/Anthropic/OpenAI/Google/Ollama/LiteLLM. Claimed numbers: 28% lower cost than
other harnesses at "nearly equal benchmark scores" across six benchmarks; with Fable 5,
"77% less than Claude Code while scoring higher on Terminal Bench 2.1." The post's own
hedges: only Terminal Bench 2.1 is named, a follow-up paper is promised, the most
token-efficient harness overall (DeepSeek's) had the lowest accuracy, and the headline
figure is model-pairing-specific.

**Why it matters:** The harness layer gets a hyperscaler-backed SDK entrant with a
cost-per-task argument — and, notably, a vendor framing its benchmark caveats correctly
from the start.

[`🔗 Strands blog`](https://strandsagents.com/blog/introducing-strands-harness/) · [`🔗 GitHub repo`](https://github.com/strands-agents/harness-sdk)

---

## 27. GeaStack: TypeScript + CSS compiled to native apps on six targets — including 60fps CSS animation on an ESP32

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 112+ pts · 45 comments · ~17h ago (~03:42 UTC+8)
- **Tags:** `devtools` `typescript` `embedded` `compiler`

GeaStack's `geatsc` compiler turns TypeScript/JSX/CSS into native C++ — no JavaScript
engine on device. Flexbox layout and keyframe animations compile to run on the device
itself; their demo shows a CSS-animated cube at 60 fps on an ESP32. Targets: MCUs
(ESP32/RP2350), iOS/macOS, Win32, Android, Linux and Xbox ("port Three.js games to
console"). Claims 2.5× geomean speedup over Node on the same TypeScript (1.8–16.7×
range) and 1.5–2 ms native startup — with the site itself saying absolute times were
"measured under machine load, so treat as directional." GPL/commercial dual-licensed,
young ecosystem, and it ships coding-agent skills via `npx skills add geastack/skills`.

**Why it matters:** "One codebase, six targets" is a swing at Qt/LVGL/Flutter territory,
and the genuinely novel part is compiled CSS down to microcontrollers — a layer nobody
else treats as a compilation target.

[`🔗 geastack.com`](https://geastack.com) · [`🔗 GitHub repo`](https://github.com/geastack/examples) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49802911)

---

## 28. Obscura: a VPN architected so neither it nor its exit provider can log your full picture

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 152+ pts · 117 comments · ~17h ago (~03:40 UTC+8)
- **Tags:** `privacy` `vpn` `wireguard` `quic`

Obscura (Sovereign Engineering, founder Carl Dong) routes user → Obscura relay → Mullvad
exit: relays forward WireGuard packets encrypted to Mullvad's public key, so Obscura
can't read what it carries, and Mullvad never sees your real IP because Obscura NATs the
first hop — "We can't leak what we don't have." WireGuard-over-QUIC (unreliable
datagrams, no TCP-over-TCP meltdown) doubles as censorship evasion; signup needs only a
randomized account number; $8/month with Monero and Lightning accepted. The FAQ's own
limits: no independent audit yet, reproducible builds are planned not shipping, and
Obscura still sees your connecting IP in real time — "no logging" is a behavioral claim,
not a technical impossibility.

**Why it matters:** It splits trust so no single party holds both identity and traffic —
a structural answer to the "trust our no-logs policy" problem, with the caveats stated
on the vendor's own page.

[`🔗 obscura.com`](https://obscura.com/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49802930)

---

## 29. SlopShape: AI web content identified from structure alone — 98 macro-F1, survives rewording, attributes the source model

- **Velocity:** ▮▮ rising
- **Source:** Show HN · 60+ pts · arXiv 2609.15369 (v2 Sept 17)
- **Tags:** `ai-content-detection` `research` `arxiv`

arXiv 2609.15369 (Jochen Madler, Sitefire): instead of word-level AI-text detection, a
214-feature annotation instrument (187 structural — ordering, evidence, voicing) applied
by an LLM, validated against human gold annotations (human-model kappa 0.946). Corpus:
2,250 pre-ChatGPT human blog posts from 268 company domains vs 11,250 AI "mirrors" from
five frontier models. Results: 98.0 macro-F1 on held-out companies from structural
features alone, essentially unchanged (98.1) when every AI post is reworded by its own
model, and 79.3% source-model attribution against a 16.7% chance rate. Qualitative
finding: "AI posts share a tidy, self-announcing shape." Pipeline and code released.
Caveats: single-author industry paper, commercial blogs only, and heavily human-edited
AI text isn't evaluated.

**Why it matters:** Detection that survives rewording and attributes authorship moves the
AI-content arms race from vocabulary to structure — the layer humanizer-style tools
structurally can't scrub.

[`🔗 arXiv:2609.15369`](https://arxiv.org/abs/2609.15369) · [`🔗 GitHub repo`](https://github.com/pulse-energy-eu/slopshape)

---

## 30. Nathan Lambert: "The current balance of power in open models" — China's open-weight lead, quantified

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 98+ pts · 37 comments · ~14h ago (~06:03 UTC+8)
- **Tags:** `open-models` `policy` `benchmarks` `china`

Interconnects' data-heavy essay argues China has held a clear open-weight lead since
~April 2025 (Qwen, Kimi, GLM, DeepSeek) while the US leads only true open-source
(weights + data + code: OLMo, Marin, Pythia). Numbers: 3.2B Hugging Face downloads for
Chinese open models vs ~1.6B American; Artificial Analysis Index (Sept 14): GLM-5.3 at
45 and Kimi K3 at 44 vs a best US open model at 26; Chinese open-weight models sit ~2–5
months behind the closed frontier vs ~6–9 for American ones; OpenRouter weekly open-model
tokens grew ~1T → ~80T with 80%+ Chinese share. His own caveats: Chinese labs target
narrow, demand-heavy tasks that flatter public scores; usage data has blind spots; and
blocking Chinese open models would mainly hurt US enterprises.

**Why it matters:** The reference dataset for the open-weight policy argument — landing
the same week Kimi K3 went GA on Bedrock (our Sept 22 item) with the first NA
revenue-split deal for a Chinese open-weight model.

[`🔗 Interconnects`](https://www.interconnects.ai/p/the-current-balance-of-power-in-open) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49801743)

---

## 31. DeusData/codebase-memory-mcp — code intelligence as a persistent knowledge graph, 44.3k stars and climbing

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · 44.3k stars · +201/day · v0.11.0 Sept 15
- **Tags:** `mcp` `code-intelligence` `agents` `rust`

`DeusData/codebase-memory-mcp` (MIT, C) is on today's trending list: an MCP server that
indexes codebases into a persistent knowledge graph, claiming 158 languages, sub-ms
queries, "99% fewer tokens," and a single static binary with zero dependencies. Verified
on the repo: active development (pushed Sept 22), v0.11.0 shipped Sept 15 on a steady
release cadence. The performance claims are README-self-reported and we haven't
benchmarked them — treat as vendor numbers pending your own query test.

**Why it matters:** Token-efficient code context is the scarce resource in agent coding;
a dependency-free binary indexer is a different bet than the embedding-everything
approach, and the market has voted with stars.

[`🔗 GitHub repo`](https://github.com/DeusData/codebase-memory-mcp) · [`🔗 Project page`](https://deusdata.github.io/codebase-memory-mcp/)

---

## 32. HKUDS/CLI-Anything — "making all software agent-native," 49.7k stars and back on trending

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · 49.7k stars · +41/day · Apache-2.0
- **Tags:** `agents` `cli` `agent-native` `hong-kong-u`

HKU's HKUDS lab built a framework that generates CLIs making GUI-era software usable by
agents — Pi, OpenClaw, nanobot, Cursor, Claude Code — with a community registry
(CLI-Hub, `pip install cli-anything-hub`), 18 demo apps (CAD builds, 3D scenes,
diagrams, gameplay), 2,461 passing tests, and an arXiv tech report (2606.03854).
Verified on the repo: pushed Sept 22, Apache-2.0 — but the last tagged release is v0.4.0
from June 25, so this week's trending placement is sustained virality, not a fresh
launch. The CLI-Hub contribution flow (PR to add your own CLI) is turning the project
into a registry economy.

**Why it matters:** The "agent-native adapter for legacy software" niche is scaling into
a community registry — the same aggregator-layer dynamic the skills economy went through,
applied to desktop applications.

[`🔗 GitHub repo`](https://github.com/HKUDS/CLI-Anything) · [`🔗 arXiv:2606.03854`](https://arxiv.org/abs/2606.03854)

---

## 33. pbakaus/impeccable — the 70k-star design-language skill for AI coding agents

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · 70.1k stars · +287/day · Apache-2.0
- **Tags:** `skills` `design` `frontend` `coding-agents`

Paul Bakaus's Impeccable — "the design language that makes your AI harness better at
design" — is 70,077 stars and on today's trending list: one skill, 24 commands
(`polish`, `audit`, `critique`, `distill`…), live browser iteration, and 61
deterministic detector rules that run with no LLM and no API key, plus a `PRODUCT.md` /
`DESIGN.md` durable-context flow. It started from Anthropic's frontend-design skill.
Verified on the repo: pushed Sept 22, last tagged release skill-v4.3.1 on Sept 9 — no
single fresh trigger explains this week's placement, so it's riding the skills wave
(alongside ECC and agent-skills). Star velocity here is a signal to investigate, not a
fact.

**Why it matters:** Design quality is emerging as a skills category with deterministic
checkers, not just prompt guidance — 61 no-LLM rules amount to an eval harness for UI
taste.

[`🔗 GitHub repo`](https://github.com/pbakaus/impeccable) · [`🔗 impeccable.style`](https://impeccable.style)

---

## 34. PanWatch — a self-hosted AI market watcher wiring TradingAgents' 9-agent pipeline into A-share/HK/US monitoring

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · 1.4k stars · +175/day · MIT
- **Tags:** `fintech` `multi-agent` `self-hosted` `chinese-oss`

`TNT-Likely/PanWatch` (Python, MIT, created Jan 2026, pushed Sept 21) is climbing the
Chinese trending charts: a self-hosted "盯盘侠" assistant covering A-shares, Hong Kong
and US markets, integrating TauricResearch's TradingAgents (76k stars) — a trigger on
any holding runs four analyst types through a bull/bear debate, risk review and a PM
decision memo, outputting a 3–5 minute reasoning chain pushed to Telegram, WeChat or
DingTalk. Defaults to deepseek-chat at ~$0.05 per analysis; Docker one-command deploy;
PWA for mobile. The obvious caveat: it's decision support built on self-reported costs
and an LLM debate, not investment advice.

**Why it matters:** The Chinese open-source scene keeps productizing research-grade
multi-agent frameworks into vertical consumer tools — PanWatch is the template for how
TradingAgents-style frameworks become infrastructure.

[`🔗 GitHub repo`](https://github.com/TNT-Likely/PanWatch) · [`🔗 TradingAgents`](https://github.com/TauricResearch/TradingAgents)

---

## 35. OpenAI fires data raters for using AI to do the rating — and one admits sabotage

- **Velocity:** ▮ steady
- **Source:** Hacker News · 75+ pts · 54 comments · ~23h ago (Sept 22 ~21:27 UTC+8)
- **Tags:** `openai` `data-labeling` `rlhf` `labor`

404 Media: contractors hired to rate and critique ChatGPT outputs — including through
AI-training firm Mercor — were fired for using AI to do their work; Mercor says it
removes anyone confirmed to have used AI on a task. Internal documents reference
projects with more than ten thousand contractors reading user prompts; guidance tells
reviewers to judge patterns (repetitive phrasing, heavy em-dash use, unusually fast
completion) rather than run detectors — "Do not use AI detection tools, or AI yourself."
One contractor admitted deliberately picking the worst responses because they felt
"paid to make AI worse." Hedges: anonymous sources, the termination letter was only
"presented," OpenAI declined to comment, and the saboteur doubts their own impact
among hundreds of raters.

**Why it matters:** The human-feedback supply chain has an authenticity problem in both
directions — AI-generated text flowing back into RLHF (model-collapse risk) and
deliberate poisoning — and enforcement is pattern-based because detectors can't be
trusted either.

[`🔗 404 Media`](https://www.404media.co/people-training-openais-ai-fired-for-using-ai-to-train-the-ai/) · [`🔗 HN discussion`](https://news.ycombinator.com/item?id=49799952)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-09-23T20:23:00+08:00 |
| Items | 35 |
| Sources tracked | 35 (Hacker News, GitHub Trending, Anthropic, OpenAI, Artificial Analysis, TechRadar, Bloomberg, flat assembler forum, Check Point blog, NVD, CISA KEV, F5, Arista, GitHub advisories, oss-security, CPAN Security Group, GrapheneOS, Anthropic status, Cloudflare blog, npm, droprun.sh, 404 Media, foxscript.org, mouse.dev, Trail of Bits, nobodywho.ai, Arcturus Labs, benchmarkheaven.com, Strands Agents, geastack.com, obscura.com, arXiv, Interconnects, impeccable.style, deusdata.github.io) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[Previous day](../archive/2026-09-22.md) · [Raw .md](./2026-09-23.md) · [Archive](../archive/index.md)
