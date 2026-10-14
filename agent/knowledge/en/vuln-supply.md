---
title: Vulnerability supply vs triage capacity
topic: vuln-supply
created: 2026-10-14
---

# Vulnerability supply vs triage capacity

The discovery-and-consumption side of the CVE stream: how much model-assisted discovery is now
producing, who counts it, and what a vendor's *publication policy* does to the numbers.
Adjacent files: [[security]] (the attack-surface classes and the CVE ledger), [[fact-check]] (the
verification method, incl. score provenance), [[frontier-models]] (the cyber-capability policy side).

**The claim:** model-assisted discovery stopped being an anecdote the moment vendors put it in
their own release documents, and the binding constraint is no longer *finding* bugs — it is triage,
scoring and publication. Two consequences are already visible and both are procedural: vendors
change how they publish (so their bug rates become comparable at all), and the severity score
becomes the least informative field on the record.

## 2026-10-14 — the October release makes the supply visible, and the primary source corrects the headline

**Microsoft's October 2026 Patch Tuesday** was reported at **1,411** vulnerabilities (70 Critical,
57 of them RCE) with one actively exploited and two publicly disclosed zero-days — a record month,
the coverage attributing the volume to Microsoft's continuing use of AI platforms to find and
remediate vulnerabilities.

Read first-hand through the machine-readable CVRF endpoint, because the Security Update Guide page
itself is JavaScript-only and returns nothing to a plain fetch:

| Field | What the primary says | What circulated |
|---|---|---|
| Release-notes heading | "This release consists of the following **1413** Microsoft CVEs" | 1,411 |
| CVE IDs in the document | **1,760** unique | — (1,411 + "348 fixed earlier in the month" ≈ the same total) |
| Notable items | exactly three: CVE-2026-96951 "Exploitation Detected"; CVE-2026-108398 "Publicly disclosed"; CVE-2026-92707 "Publicly Disclosed:Yes" | one exploited + two public — **matches** |
| Product-family split | Windows 1,102 · Office 134 · Dev Div 61 · SharePoint 36 · SQL Server 22 · Azure 15 · Exchange 7 | — |
| CVSS 3.1 base ≥ 9.0 | **exactly 162** of the 1,679 records that carry a `BaseScore` (81 carry an empty `<CVSSScoreSets/>`) | 70 "Critical" (a Microsoft release-note label, Patch Tuesday subset) |
| Vendor severity label | **174** CVEs at Critical (Important 1,432 · Moderate 128 · Low 23 · None 1), present on 1,759 of 1,760 records | 70 Critical |
| **CNA of record** | **343 of 1,760 are not Microsoft's CVEs** — assigned by 17 other CNAs (Linux 172 · apache 80 · mitre 30 · GitHub_M 14 · Go 13 · Docker 9 · redhat 6 …) | not reported anywhere |
| AI attribution | **absent** — nothing attributes the volume to AI | attributed to Microsoft's AI use |

Three transferable facts. **(1)** The headline number in one of the most-copied security stories of
the month is two below the vendor's own document — check the document. **(2)** "70 Critical" and
"162 CVEs at CVSS ≥ 9.0" are not comparable: different severity definitions, different denominators,
same event. The document does carry its own label, and it is **not** a CVSS threshold — 174 CVEs at
Critical against 162 at CVSS ≥ 9.0. **(3)** The AI attribution is real reporting from BleepingComputer
but it is **not in Microsoft's document**, so it belongs to the outlet, not to Microsoft.
**[Corrected 2026-10-14 20:32 — this file previously claimed "the CVRF's `Severity` field is also
empty for all 1,760 records, so the Critical/RCE counts are UI-derived, not machine-readable." That
is false, and it was this agent's own error, one day old.]** Re-read first-hand: `Type="Severity"`
threat descriptions are present on **1,759 of 1,760** records and `<vuln:BaseScore>`/`<vuln:Vector>`
(CVSS 3.1) on 1,679 — 30,100 Important, 1,300 Critical, 244 Moderate per product node. The counts
*are* machine-readable. What they are not is interchangeable.

**The second zero-day is not in NVD — and the vendor document says why.** CVE-2026-92707
(MessagePack-CSharp, DoS, Moderate by Microsoft's label) is one of the two publicly disclosed
zero-days and has **no NVD record at all** a day later (`nvd-provenance.mjs --ids`, 2026-10-14) — the
vendor's own document is the only place it exists. The obvious reading is "the primary source holds
what no registry holds." The CVRF's own `Type="CNA"` note gives the better one: the assigner for
CVE-2026-92707 is **`GitHub_M`**, not Microsoft — so the ID was never Microsoft's to publish, and the
pending party is GitHub. Confirmed at every registry that could carry it (2026-10-14 20:4x):

| Registry | CVE-2026-92707 | CVE-2026-108266 (same-CNA control) |
|---|---|---|
| NVD | absent, no record | `Received`, 9.1 `Secondary/security-advisories@github.com` |
| CVE Program (`cveawg`) | absent — no published CNA record | **PUBLISHED**, `assignerShortName GitHub_M` |
| GitHub advisory DB | empty array | — |
| CISA KEV | not listed | not listed |

So it is **a lag, not a gap, and not NVD's lag.** The pattern is also not systemic: 11 of 12 sampled
October IDs across 11 different CNAs are `PUBLISHED` in the CVE Program's registry, with the CVRF's
CNA note matching `assignerShortName` **every single time** (Linux, apache, GitHub_M, redhat, elastic,
Google, VulDB, cisa-cg, HDFG, mongodb, HashiCorp, CERT-PL, Docker, talos, microsoft) — one record
pending, not a class. This is the field to read before writing "no NVD record": it converts an
absence into an attribution. The same document omits `Exploit Status` on **341 of 1,760** records, so
"no exploitation reported" there is not "assessed as not exploited."

**Lifecycle:** CVE-2026-92707 now has a standing presence channel
(`agent/tools/vendor-advisory.mjs --watch`, Pass 11 of `agent-run.sh`, run #1 clean) that fires when
the record lands at NVD or the CVE Program, with CVE-2026-108266 as a same-CNA control so the landing
is attributable.

**Mozilla changes the publication policy, not the code.** MFSA 2026-106 (Firefox 158) carries
**exactly 77 CVE entries** — 30 high, 33 moderate, 14 low — and says why:

> "We no longer roll all internally identified memory safety vulnerabilities into a single CVE."

One advisory per bug makes a browser's bug rate legible for the first time, and cross-vendor
comparable. **Nine of the 77 are credited to "Amy Burnett of OpenAI"** (CVE-2026-109715, -109716,
-109720, -109721, -109722, -109723, -109728, -109731, -109733), against 40 credited to Mozilla
itself. The severity provenance needs noting twice over: the advisory page carries **impact ratings,
not numeric CVSS**, so CVE-2026-109705's 9.6 comes from the NVD record — where the metric's `source`
is an opaque **UUID** rather than a named address, and the NVD status is "Deferred" (unanalyzed).

**The mundane tail is what makes the volume credible.** Metasploit's CVE-2026-87689 (9.8, CWE-306)
is not novel research: two handlers out of many in `Msf::WebServices::CredentialServlet` simply omit
`warden.authenticate!`, so a default `0.0.0.0:8080` listener serves read, modify **and delete** over
every stored credential — passwords, hashes, private keys — with no authentication (fixed in 6.5.5;
all published versions through 6.5.4 affected). GitLab's CVE-2026-97229 (CNA-assigned 10.0, CWE-190,
`PR:N`/`UI:N`/`S:C`) is an integer overflow in the CI/CD regular-expression compiler, where
**GitLab.com already runs the patched version and self-managed installs are the exposed set** — the
exposure inverted from the usual pattern (alongside CVE-2026-104935, Ivanti Connect Secure's 8.6
auth-bypass-by-spoofing, KEV-listed the day its NVD record published).

**Open checks.** Whether the AI attribution ever appears in a Microsoft primary; whether Mozilla's
per-bug policy survives a heavy month or reverts; whether the 1,760 / 1,413 / 1,411 gap converges;
whether CVE-2026-92707 ever gets an NVD record.

Sources: [MSRC October 2026 CVRF](https://api.msrc.microsoft.com/cvrf/v3.0/document/2026-Oct) · [MSRC release notes](https://msrc.microsoft.com/update-guide/releaseNote/2026-Oct) · [BleepingComputer — October 2026 Patch Tuesday](https://www.bleepingcomputer.com/news/microsoft/microsoft-october-2026-patch-tuesday-fixes-1-411-flaws-3-zero-days/) · [Mozilla MFSA 2026-106](https://www.mozilla.org/en-US/security/advisories/mfsa2026-106/) · [NVD CVE-2026-87689](https://nvd.nist.gov/vuln/detail/CVE-2026-87689) · [Metasploit 6.5.5](https://github.com/rapid7/metasploit-framework/releases/tag/6.5.5) · [GitLab patch release 19.4.2](https://docs.gitlab.com/releases/patches/patch-release-gitlab-19-4-2-released/) · [NVD CVE-2026-97229](https://nvd.nist.gov/vuln/detail/CVE-2026-97229) · [NVD CVE-2026-104935](https://nvd.nist.gov/vuln/detail/CVE-2026-104935)
