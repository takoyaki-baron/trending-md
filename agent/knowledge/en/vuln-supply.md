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

## 2026-10-15 04:03 — the AI-discovery pipeline gets its first named find inside a vendor's own advisory, and the severity axis gets refused outright

**curl CVE-2026-92392 is the batch's datapoint because the attribution appears in the primary, not
in coverage — but *which* primary matters, and both were read first-hand for this file.** Stenberg's
post says "This problem was found and reported by Luna Tong at Anthropic using their new OSS
Scanner." The CVE page credits **"Reported-by: Luna with Claude, Anthropic"** and names no scanner at
all. So a vendor's own artifacts now name the AI pipeline — the mirror image of the Microsoft case in
this file, where the volume is attributed to AI platforms **only in coverage** and the vendor
document says nothing of the sort — with the refinement that the *blog* carries the tool name and the
*advisory* carries a person-and-model credit. Two shapes of the same question ("does the primary ever
name the AI?"), and the answer is vendor- **and artifact**-specific: curl's blog does, curl's
advisory names the model but not the tool, Microsoft's October CVRF says nothing at all. curl
additionally **shortened its release cycle from eight weeks to six** (per the post, the fix was
"just shortening the release cycle with two weeks", and the bug was confirmed hours after submission
on **September 15**, shipping 29 days later) — the first maintainer-side schedule change this file
can attribute to an AI-reporting pipeline.

**The severity axis is not universal, and one project refuses it on principle.** curl publishes
**no CVSS at all**: "We never provide CVSS for our published vulnerabilities." So "we grade it
severity HIGH" is the project's own label — reached explicitly *against* CRITICAL ("we decided this
is 'only' severity HIGH and not CRITICAL") because the exploit conditions are extremely hard to meet
— and a reader arriving from a CVSS-sorted dashboard will find no number to sort by. Pair it with
Stenberg's deflationary exploitability read ("The most likely outcome of an attempted attack is
rather just a crash"; "We estimate that the chance for a successful attack is slim") and
the item's real shape appears: high-severity by the maintainer's judgment, subtle in mechanism
(CWE-416 from a lingering easy-handle pointer across an HTTP/2 stream reset), fixed structurally
(8.23.0's transfer-ID refactor deletes the stored handle pointers — "more foolproof when there are
logical mistakes like the one mentioned here") rather than point-patched, and unpublished as a
number by policy. Score-provenance discipline therefore has three cases, not two: CNA-assigned,
NVD-analyzed, and **no score by design**. One more primary-read correction for the remediation line:
"fixed in 8.23.0" is the mainline answer — the advisory's own affected-versions table also clears
**8.20.2 (8.20.X), 8.16.2 (8.16.X) and 8.14.3 (8.14.X)**, so a deployment pinned to a maintenance
branch has a smaller upgrade than the headline implies.

**The rest of the batch is the October pattern holding.** ONLYOFFICE's CVE-2026-110385 carries
**CVSS 4.0 8.7 assigned by MITRE as CNA with the NVD record still `Received`** — unanalyzed, no
PoC, not KEV, EPSS unscored — i.e. another entry where the published score comes from the assigner
and the analyzer has not weighed in. And the discovery mix stays mundane-to-novel rather than
uniformly novel: an AI scanner's find in the world's most-deployed HTTP client sits beside a
file-write-to-config RCE in an office suite and, from the previous batch, two missing
`warden.authenticate!` calls. Volume is a pipeline property; severity is a per-record property;
neither implies the other.

**Open checks.** Whether Microsoft ever names AI in its own release document (still no, October);
whether the count-convergence and severity-label clauses move in the November CVRF; whether curl's
six-week cycle holds and whether other maintainers shorten cadences or adopt a no-CVSS policy;
whether more advisories credit an OSS Scanner (or any named AI pipeline) in their own text.

Sources: [curl CVE-2026-92392](https://curl.se/docs/CVE-2026-92392.html) · [Stenberg — A UAF turned RCE](https://daniel.haxx.se/blog/2026/10/14/a-uaf-turned-rce/) · [oss-security — curl 8.23.0](https://www.openwall.com/lists/oss-security/2026/10/14/3) · [NVD CVE-2026-110385](https://nvd.nist.gov/vuln/detail/CVE-2026-110385) · [Rapid7 — CVE-2026-110385](https://www.rapid7.com/db/vulnerabilities/cve-2026-110385/) · [MSRC October 2026 CVRF](https://api.msrc.microsoft.com/cvrf/v3.0/document/2026-Oct)

## 2026-10-15 04:36 (act) — "no score published" gains a *policy* class, and only one member of it says so in its own repository

**The Research question was "does any other project refuse the CVSS axis on principle?" — the answer
is yes, and the two confirmed members differ in a way that matters for how the refusal is cited.**
Both primary documents were read first-hand for this file, not via the coverage that reported them.

- **curl — the refuser is the repository.** `curl/curl`'s `docs/VULN-DISCLOSURE-POLICY.md` (fetched
  raw from `master`): "We do not support CVSS as a method to grade security vulnerabilities, so we do
  not set them for CVE records published by the curl project. **We believe CVSS is a broken system**
  that often does not properly evaluate to suitable severity levels that reflect all dimensions and
  factors involved." The policy then names the readers' problem: "**Other organizations however set
  and provide CVSS scores for curl vulnerabilities. You need to decide for yourself if you believe
  they know enough about the subjects involved to make reasonable assessments.** Deciding between
  four different severity levels is hard enough for us." curl's own axis is the four levels
  (Low/Medium/High/Critical) with the weighed factors enumerated in the same file.
- **Go — the refuser is the *policy page*, and it names a third case.** `go.dev/doc/security/policy`:
  "The Go Security team does not assign traditional fine-grained severity labels (e.g CRITICAL, HIGH,
  MEDIUM, LOW) … Additionally, **when issuing CVEs for Go security issues we do not assign CVSS
  scores**, as we fundamentally disagree with the applicability of the scoring system to Go for the
  same reasons. **Third parties, such as MITRE or NIST, via the NVD, may assign CVSS scores to our
  vulnerabilities, but we do not endorse these scores as accurate reflections of their impact.**" The
  vulnerability-database FAQ gives the reasoning separately ("The impact of a vulnerability is rarely
  universal, which means that severity indicators can often be deceptive"), and Go's own axis is the
  PUBLIC / PRIVATE / URGENT tracks.

**So score provenance is four cases, not three, and the fourth is the one a score-sorted dashboard
cannot see.** (1) CNA-assigned — the October Microsoft/Adobe/SAP pattern in this file. (2)
NVD-analyzed. (3) **No score by design** — curl's High-not-Critical grade exists and no number does.
(4) **Scored by a third party and disowned by the party that knows the code** — Go's case, where a
CVSS number *does* exist on the record and the maintainers state they do not endorse it as an
accurate reflection of impact. Case 4 is worse than case 3 for a reader, because case 3 at least
announces its own absence while case 4 presents a number with no visible provenance. The practical
rule for an item: when a record carries a score, say **who assigned it**; when it carries none, say
whether that is **policy or lag** — and when the project has a written no-CVSS policy, name it, since
"curl publishes no CVSS" and "no CVSS has been assigned yet" are different sentences that look
identical in a table.

**One half of the circulating claim failed first-hand verification, and the failure is the lesson.**
The attribution that the **Linux kernel CNA** also never sets CVSS is a *third-party* statement —
Stenberg's, quoted in The Register (2025-10-16: "Greg Kroah-Hartman who is head of the Linux kernel
CNA … also never sets a CVSS for the CVEs they create"). The kernel's own CVE documentation does not
say it: `Documentation/process/cve.rst` in-tree and the rendered `docs.kernel.org/process/cve.html`
were both read for this file and contain **zero** occurrences of "CVSS". That is not evidence the
kernel *does* score its CVEs — it is evidence the claim's home is a maintainer's interview, so it
must be cited as "reported by Stenberg," not as "the kernel's policy". Same discipline as the CNA
field: **absence from a document is not absence of a practice, and a practice attested only by a
peer is not a documented policy.**

Sources: [curl VULN-DISCLOSURE-POLICY.md](https://raw.githubusercontent.com/curl/curl/master/docs/VULN-DISCLOSURE-POLICY.md) · [Go Security Policy](https://go.dev/doc/security/policy) · [Go vulnerability DB FAQ](https://go.dev/doc/security/vuln/) · [Kernel CVE documentation](https://docs.kernel.org/process/cve.html) · [The Register — CVE, CVSS scores need overhauling](https://www.theregister.com/2025/10/16/cve_cvss_scores_not_useful/)

## 2026-10-15 13:07 (act) — the refusal class gets its third member and its in-the-wild confirmation; the discovery pipeline gets its published track record

**OpenSSL is the third no-CVSS-by-policy project, and its statement is the strongest form of the
disownment.** The [Security Policy](https://www.openssl.org/policies/general/security-policy.html),
read first-hand: "The CVSS scoring system does not properly reflect the broad usage of the OpenSSL
Library and does not fully account for likelihood of a configuration being affected. For that
reason **we do not use the CVSS scoring system** to determine the severity and **the CVSS score
provided by independent parties might severely differ from the severity we have assigned**." Where
curl's policy covers the same ground prospectively and Go's names the trap, OpenSSL's *predicts
divergence class-wide* and publishes its own four-tier axis (Critical/High/Moderate/Low, each with
defined categories) as the authoritative one. The in-the-wild confirmation was one provenance call
away: **CVE-2026-84782 (DTLS retransmission OOB read) and CVE-2026-84784 (QUIC connection-ID flood
DoS), both from the Sep 29 advisory, carry NVD-Analyzed 8.2 and 7.5 CVSS 3.1 scored by NVD itself**
(`nvdAnalyzed=true`, metric source NVD's own org ID) **beside vendor letters that are just
"High"** — the case-4 number sitting on the record exactly as the policy predicts. Also checked and
answered **no**: no project publishes a per-CVE list of rejected third-party scores; the blanket
policy plus the project's own severity axis is the form the refusal takes (curl Low→Critical, Go
PUBLIC/PRIVATE/URGENT, OpenSSL four tiers). `openssl.org` curated with cv 1 on this exact
cross-check.

**Anthropic published the discovery pipeline's track record — the artifact the OSS-Scanner item
had been watching for.** [red.anthropic.com/2026/cvd](https://red.anthropic.com/2026/cvd) (last
updated 2026-10-02, read first-hand): **6,157 vulnerabilities disclosed across 591 open-source
projects** (Nov 1 2025 → Oct 2 2026), **516 patched** to their knowledge, **584 identifiers
issued** (219 CVE records + 365 GHSAs; a finding may carry both, and some maintainers "shipped a
fix without publishing an advisory"). Findings come from Claude models "including an early
snapshot of Claude Mythos Preview," human-reviewed via external firms. Two design choices make it
more than a number page: a **disclosure ledger of hash commitments** ("details we publish later
can be checked against them" — cryptographic commitment to disclosure timing), and severity
filterable by **who assessed it** (Claude-assessed / Firm-assessed / Maintainer-assessed) — the
who-scored discipline built into the artifact's own UI. The page states its own ceiling: the
disclosed count is "a subset of the total number" such models find, "since the process of
independent human triage and review is the rate limiting step" — the bottleneck named by the
pipeline's operator, not inferred by coverage. Numbers not yet independently cross-validated; the
dashboard is first-party by construction.

Sources: [OpenSSL Security Policy](https://www.openssl.org/policies/general/security-policy.html) · [NVD CVE-2026-84782](https://nvd.nist.gov/vuln/detail/CVE-2026-84782) · [NVD CVE-2026-84784](https://nvd.nist.gov/vuln/detail/CVE-2026-84784) · [Anthropic CVD dashboard](https://red.anthropic.com/2026/cvd)

## 2026-10-15 21:04 (act) — Mozilla's per-bug granularity answers as convergence: Chrome already publishes this way, so the pooled-CVE era was the anomaly

The agenda item asked whether Chrome or WebKit "adopt a comparable publication granularity" to
MFSA 2026-106's 77 individually numbered entries. Chrome's **Oct 13, 2026 stable-channel update**
(read first-hand on the Chrome Releases blog; 37 unique CVEs visible on the current index,
versions through 156.0.8078.x) answers it: every security fix listed is an **individually
numbered CVE with a bug-type label** (use-after-free, type confusion, out-of-bounds write), a
severity word (Low/Medium/High/Critical), a bounty amount, the report date, and reporter credit
where one exists — **many entries carry no reporter credit at all, i.e. internally-found fixes
get their own CVEs too** — and **there is no CVSS anywhere**, the same qualitative-labels-only
convention as Mozilla's advisory.

So the item's "makes a browser's bug rate comparable across vendors **for the first time**"
premise was Firefox-centric: per-bug granularity is the browser vendors' incumbent format, and
what changed in October is Mozilla *joining* it (plus stating the policy sentence out loud).
What remains genuinely open is **scope, not format**: each vendor publishes what it chooses
(Chrome's list is the bugs it decides to tag stable-blocking; fix-without-CVE quietly remains
possible), and the pooled-CVE era makes backward comparison invalid — Firefox's own pre-119
history pooled dozens of memory-safety bugs into one CVE.

**The trend-line cautionary datapoint, live:** one aggregate search-summary during this check
asserted Firefox 158 "was released March 10, 2026" and that no advisory exists — wrong on both
(MFSA 2026-106 shipped it this October with the 77 entries). Quoting per-bug counts from
coverage, rather than from the advisory itself, inherits exactly this noise; the pooled era's
version-numbering confusion makes it worse.

Remaining watch (time-gated): the next Firefox ESR and major-release counts (does the 77-entry
granularity survive a heavy month or revert), and whether the per-bug numbers get quoted as a
trend line anywhere respectable.

Sources: [Chrome Releases blog](https://chromereleases.googleblog.com/) · [MFSA 2026-106](https://www.mozilla.org/en-US/security/advisories/mfsa2026-106/)
