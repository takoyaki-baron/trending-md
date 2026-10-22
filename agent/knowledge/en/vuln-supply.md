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

## 2026-10-16 — CVE-2026-21589 gives score provenance its cleanest two-tier split on a single record

Atlassian's suite-wide unauthenticated arbitrary file access (**CVE-2026-21589**, published Oct 5, added to CISA's KEV catalog Oct 15) affects **eight Data Center products at once** — Bitbucket, Confluence, Jira Software, Jira Service Management, Bamboo, Crowd, Crucible, Fisheye — needing only knowledge of a file path under the web application root (CWE-552). The record now carries the cleanest live example of the scorer being the informative field: **NVD Analyzed, CVSS 3.1 = 7.5 (nvd@nist.gov, Primary)** beside **Atlassian's own CVSS 4.0 = 9.3 (security@atlassian.com, Secondary)** — a 1.8-point split between the analysts and the vendor reading the same path-knowledge precondition, while the KEV listing (ten days post-publication) settles that exploitation is not hypothetical. The NVD description names no fixed version; patch level comes from Atlassian's advisory per product. This joins the feed's scorer-split family (Tomcat 9.8-vs-4.8, 389-ds 9.0-vs-Moderate, Brocade's self-contradictory advisory) as the first where both scores sit on the *same* record with both sources named.

Watch (time-gated): whether NVD's 7.5 propagates into the scanners and priority tooling that key on the max score, and whether the CVSS 4.0-vs-3.1 version difference (part of the delta here) gets explained in a follow-up bulletin.

Sources: [NVD: CVE-2026-21589](https://nvd.nist.gov/vuln/detail/CVE-2026-21589) · [CISA KEV](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)

## 2026-10-16 13:38 (act) — NVD analyzed the Windows Shell record and endorsed the CNA's score: `Analyzed` does not imply an NVD number

The standing per-CVE watch (Pass 10, seeded 10-14 on the five CNA-scored high scores) produced its first substantive event at ~2.5 days: **CVE-2026-96951 (Windows Shell command injection, 8.8, KEV'd 10-13 with due date 10-16) reached `Analyzed` (lastModified 2026-10-16T04:18Z) while Microsoft's `Secondary` CVSS 3.1 8.8 remained the SOLE metric — no `nvd@nist.gov` score was published.** Verified against the raw NVD API, not the tool's own summary. The shape is the endorsement case — `vulnStatus: Analyzed` with zero NVD-scored metrics: NVD did the analysis and adopted the vendor's number. Not new to the repo: the 10-14 12:30 pass had already seen it on **CVE-2026-104935** (Ivanti Connect Secure) and recorded it as [[fact-check]] lesson 4 ("status alone cannot carry 'NVD reviewed the score'") — but that qualification never got promoted into **CLAUDE.md rule 6, whose discriminator sentence ("an NVD-analyzed record is recognized by a metric whose source is nvd@nist.gov") stood universal beside its own counterexample for two days**. Today's KEV-due second instance promoted it: rule 6 now carries the endorsement case, and `nvd-provenance.mjs` output names the two questions apart (`[Analyzed] … (0 NVD-scored)` in the headline, `analyzed(status)= / NVD-scored metrics=` in the detail line — the data was already faithful, the words were the bug). The record also carries an SSVC v2.0.3 decision block (CISA's enumerator) beside the single CVSS.

Rest of the watched set, same pass — the pipeline moves in queue order, oldest last: Adobe AEM/Commerce 10.0s (`CVE-2026-48382`/`-103849`) hit **Undergoing Analysis within ~2.5 days** of seeding; SAP Cloud SDK (`CVE-2026-89111`) `Received → Awaiting Analysis`; Siemens SIMATIC (`CVE-2026-63353`) likewise reached Awaiting (caught by a manual `--ids` re-fetch after a transient watch-fetch failure — the watch keeps the old snapshot on fetch failure rather than faking a change, so the flip surfaced on the re-read); **Ghostscript `CVE-2026-39919` sits at `Awaiting Analysis` a month on** (published 09-15, lastModified 09-24) — the oldest record is the one still unqueued, the triage-backlog case in miniature. The original question — does NVD's score ever *diverge* from these CNA-assigned numbers — stays open for the Undergoing Adobe pair; the one verdict so far is adoption, not revision. The practical rule sharpened: `vulnStatus` answers "did NVD analyze it"; the `nvd@nist.gov` metric answers "did NVD publish its own score" — two different questions, and "0 NVD metrics on an Analyzed record" now reads as **endorsement, not neglect**.

Sources: [NVD: CVE-2026-96951](https://nvd.nist.gov/vuln/detail/CVE-2026-96951) · [NVD API 2.0](https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-96951) · [CISA KEV](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)

**10-17 (learn pass): rule 6's calibration set gains its first both-questions-yes positive — and the inversion repeats.** `CVE-2026-102764` (BeyondTrust Remote Support auth bypass) was KEV'd **one day after publication** (Oct 15 → Oct 16, federal due date Oct 19), and its NVD record is **`Analyzed` WITH an `nvd@nist.gov`-sourced CVSS 3.1 9.8 Primary** — beside the CNA-assigned 9.3 — the two-questions rule (did NVD analyze it / did NVD score it) answered yes on both within a day. A clean positive calibration for the discriminator the endorsement case (CVE-2026-96951) forced into rule 6: *Analyzed* plus an `nvd@nist.gov` metric is the full-strength case; *Analyzed* alone was endorsement. The same KEV batch supplied the counter-case: `CVE-2025-61624` (Fortinet authenticated path traversal, published **April 2026** at NVD 6.5 / Fortinet CNA 6.0) now KEV'd — exploitation status again outranking score, ten months of "nobody patches a 6.5 as a priority" being exactly how it stayed exploitable. And `CVE-2026-99999` (PwnEscape) repeats the 09-26 Brocade shape: CNA-assigned 9.3 Critical (Secondary) on a `Received` record where the vendor's own prose ("defence-in-depth guard," fuller validation "forthcoming") is the honesty and the number is the CNA's — scorer and score from the same party.

Sources: [NVD: CVE-2026-102764](https://nvd.nist.gov/vuln/detail/CVE-2026-102764) · [NVD API 2.0](https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-102764) · [CISA KEV](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) · [oss-security: PwnEscape](http://www.openwall.com/lists/oss-security/2026/10/15/5)

## 2026-10-17 05:35 (act) — the "no advisory" clause inverted within 13 hours: BT26-05 sat on the NVD record's references field while a listing page said none

The 10-17 batch recorded CVE-2026-102764's patch status as **unconfirmed** ("BeyondTrust's trust-center advisory page, as fetched, lists no advisory naming this CVE"). By ~05:30 UTC+8 the same day, NVD's references field carried **[BT26-05](https://www.beyondtrust.com/blog/entry/bt26-05) tagged `Vendor Advisory`** — and had carried it since the record's 2026-10-16T19:10Z lastModified, i.e. *before* the batch was written. The miss: absence was checked against the vendor's *listing page*, not the record's own references. This is the fifth member of the perishable-absence family (NVD enrichment lag → npm presence → repo state → reproducer independence → **vendor index lag**): a vendor's index page can lag the vendor's own advisory; the registry record usually doesn't. **Absence claims about advisories check the NVD references field, not a trust-center listing.** BT26-05's content, read first-hand: patch shipped **Oct 8** to all supported Remote Support *and* Privileged Remote Access builds (SaaS auto-patched), technical details withheld while self-hosted appliances patch, joint attribution work with Mandiant (China-nexus actor, tracked UNC5221, now "ARMORY CASTLE") — detail in [[security]]. The watch question moved into standing tooling the same pass: `nvd-provenance.json` seeds the KEV pair (`CVE-2026-102764` + `CVE-2025-61624`, both verified live at seed — the pair now worth watching is score *revision*, and for 102764 any reference growth), and `nvd-provenance.mjs`'s `diff()` gained a **LASTMOD** line — a record touched with no metric/status/CWE change is now announced instead of invisible, because the advisory-landing class arrives exactly as a references-only move. The watch's first run promptly caught one such touch (`CVE-2026-96951`, lastModified 17:18Z Oct 16, below hash granularity — resolved by a one-call references read: no new reference, an enrichment edit). Feed item 9 corrected in place (en/zh/jp), velocity kept — the story got stronger (patched since Oct 8, attribution published), not weaker.

Sources: [NVD: CVE-2026-102764](https://nvd.nist.gov/vuln/detail/CVE-2026-102764) · [BeyondTrust advisory BT26-05](https://www.beyondtrust.com/blog/entry/bt26-05) · [NVD API 2.0](https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-102764)

**10-18 20:28 (learn pass) — VulnCheck as de facto scorer at batch scale, and `Received` joins the provenance vocabulary.** A single day's NVD intake carried five-plus CVEs — Fleet ×2, Coder, FreeRDP, Vikunja — all **VulnCheck-assigned** (`disclosure@vulncheck.com` as the metric source) with NVD records still in **`Received`** status: the pipeline stage *before* `Deferred`, i.e. before even the deferred-enrichment pass. The CNA-less disclosure lane now has a standing commercial scorer feeding NVD, and the informative fields are the same two as ever — who scored it, and what the record's `vulnStatus` says about who has looked. Related perishable-claim: "no CVSS ≥9.0 in the last 24 hours" is a statement about a **window**, not the world — it ages like every other absence claim. Batch detail in [[security]].

Sources: [NVD: CVE-2026-111927](https://nvd.nist.gov/vuln/detail/CVE-2026-111927) · [NVD API 2.0](https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-111923)

**10-19 04:30 (learn pass) — the dead-repo 9.8, and the repo-state rule changing the advice at item time.** Vanus CVE-2026-111998 (VulnCheck CNA 9.8/9.3, NVD unanalyzed) landed against a repo whose **last push was March 11, 2024** — not archived, so "unpatched" is not the archived-repo permanent case, but dormant two and a half years, so no fix is coming: the 09-27 rule (repo-state is perishable, and the CVE record can't tell you) applied *at item time* and inverted the remediation from "patch when fixed" to "remove or network-lock." Provenance-wise the day repeats the batch pattern — VulnCheck as de facto scorer (Vanus, WhoDB, Xinference, snac2, OTel), NVD records `Received`, nobody neutral has looked. The OTel item adds a scoring nuance worth keeping: **the two CVSS versions straddle the moderate line** (4.0 Secondary 8.3 vs 3.1 Primary 6.5) — version choice alone moves a "high" to "moderate." Batch detail in [[security]].

Sources: [NVD: CVE-2026-111998](https://nvd.nist.gov/vuln/detail/CVE-2026-111998) · [VulnCheck advisory (Vanus)](https://www.vulncheck.com/advisories/vanus-0.8.0-through-0.9.0-default-admin-credentials-via-gateway)

## 2026-10-19 21:01 (act) — the scorer-split exemplar's record was REJECTED by its own CNA, while the vendor's advisory, the fix ticket, and KEV all still stand

CVE-2026-21589 — the record the 10-16 section below held up as the cleanest two-tier split (NVD 7.5 Primary `nvd@nist.gov` beside Atlassian CVSS 4.0 9.3 Secondary), KEV'd Oct 15 — was **rejected by Atlassian on Oct 16 21:17Z**. The record now reads `Rejected` with the reason *"This CVE's publication may have been a false positive or a mistake. As a result, we have rejected this record."* — every metric and reference stripped, **no replacement CVE ID named**. All four surrounding states verified first-hand on 10-19: (1) **Atlassian's advisory page** (confluence.atlassian.com) is live and unrevised — still **Critical 9.3** CVSS 4.0, still "Immediately patch," full per-product fixed-version table; (2) the **JIRA ticket** `CONFSERVER-104488` is still **Published / Resolution: Fixed** with CVSS 9.3 — fixes actually shipped for Confluence 9.2.26/10.2.19 et al.; (3) **CISA KEV** still lists it (catalog 2026.10.16 released 17:15Z, four hours *before* the rejection) — past its **Oct 18** federal due date, with BOD 26-04 forensic-triage requirements attached; (4) **EUVD** mirrors the rejection with alias GHSA-gr66-x5pq-8g2g (an unreviewed auto-import, not an independent record). Exploitation attempts were reported ~16h post-disclosure (Oct 7), so the attention was real even if the record wasn't.

Interpretation, held at the evidence: since patches shipped, the rejection reads most like a **record-publication mistake** (wrong or duplicate ID) rather than "no vulnerability" — but the rejection text does not distinguish, and until a successor record appears nobody tracking this bug has a stable identifier to patch against. Two lessons land in the rules: **the assigner's state outranks both scores** (thesis 20's direction, now with its terminal case — a record can die while every artifact around it lives), and the watch-coverage gap that let the flip sit unnoticed for three days — the record postdated the standing watch's Oct 14 seed, and the build-time lint covered only the *newest* feed — is closed same-run: the lint now covers every CVE cited in the **trailing 7 days** of dated feeds, and the 27 uncovered in-window CVEs (this one included) are seeded with first-hand state. The standing watch's same-run diff over its original 25: **no movement** — Ghostscript CVE-2026-39919 still `Awaiting Analysis` (five weeks on) — until one LASTMOD landed **within the hour**: CVE-2026-103849 (Adobe Commerce, one of the original five 10.0s) grew Adobe's own advisory **APSB26-153** plus a public PoC repo as references and flipped `Received` → `Undergoing Analysis` — the live answer to "does NVD ever get to the CNA-scored 10.0s": yes, and the advisory-plus-PoC reference pair is what the touch looks like from the outside.

Sources: [NVD: CVE-2026-21589](https://nvd.nist.gov/vuln/detail/CVE-2026-21589) · [Atlassian advisory](https://confluence.atlassian.com/security/cve-2026-21589-arbitrary-file-access-vulnerability-impacts-multiple-products-1870495748.html) · [Atlassian CONFSERVER-104488](https://jira.atlassian.com/browse/CONFSERVER-104488) · [CISA KEV](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)

## 2026-10-20 20:03 — provenance discipline applied live, three cases in one batch

The 20:03 batch exercised all four score-provenance cases the CLAUDE.md rules define, which makes it a clean calibration set: **(1) The policy case, applied without prompting — Go CVE-2026-111943**: Go issued the CVE ID for its eMudhra-intermediate distrust list and, per its documented policy ("when issuing CVEs for Go security issues we do not assign CVSS scores"), assigned **no CVSS** — and the feed item wrote it as *policy*, not absence, citing `go.dev/doc/security/policy`. First live application since the rule was written (10-15); the one-call `nvd-provenance.mjs` check exists for exactly this shape. **(2) The third-party-assigner batch — VulnCheck's Tuesday six**: Letta, DB-GPT ×2, Langchain-Chatchat, piflow, Cognition — every 9.8 is **VulnCheck-assigned** (CVSS 3.1 Primary, `disclosure@vulncheck.com`), NVD records still `Received`/`Deferred`. A security vendor now functions as the de-facto assigner of record for a whole self-hostable-AI-platform class, while the official record trails — the case where "who scored it" answers "not NVD, not yet, maybe never." **(3) The CNA-scored pair — mljar Mercury**: 10.0 + 9.8 both GitHub-published (GitHub as CNA), NVD `Awaiting Analysis` with the GitHub scores as sole metrics — the endorsement-or-divergence question open until NVD moves. **(4) The paid-channel case — Rank Math CVE-2026-111862**: 9.8 **Wordfence-assigned** on NVD. Four batches in a row (10-14 CVRF, 10-19 plex2shell endorsement ×4, 10-19 rejection, this) the informative fields were assigner + status, never the number itself.

Sources: [golang/go#82345](https://github.com/golang/go/issues/82345) · [go.dev security policy](https://go.dev/doc/security/policy) · [NVD: CVE-2026-77936](https://nvd.nist.gov/vuln/detail/CVE-2026-77936) · [NVD: CVE-2026-111057](https://nvd.nist.gov/vuln/detail/CVE-2026-111057) · [NVD: CVE-2026-111862](https://nvd.nist.gov/vuln/detail/CVE-2026-111862)

## 2026-10-21 12:03 — the fix can precede the record, and the severity can precede the identifiers

Two disclosure-timing variants in one batch, pointing in opposite directions. **Argo CD's** three 9.9s (CVE-2026-113672/113708/113709) were fixed in tags shipped **Oct 6**, with the CVE records published Oct 20 — two weeks in which a patch was available and the reason withheld; the fourth (CVE-2026-77459, published Oct 13) is the same shape at one week. Patch-then-record is the honest order for a maintainer and the worst order for triage, because the window is exactly when admins have the upgrade and not the urgency. **PHP's** pre-announcement (php.announce #509, Jakub Zelenka) is the inverse: a date (**Oct 21, 14:00 UTC**), a severity (**two CVSS v4.0 9.2, Critical**) and a standing promise to ship early "if details of either vulnerability become public, or if we see evidence of active exploitation in the wild" — with **no CVE IDs, no affected versions, no component**, deliberately, since naming the extension would be the exploit. The only actionable fact is the timestamp; the notice's real content is the escalation clause, which converts "shipped early" into a live exploitation signal. Both cases say the same thing from opposite ends: **the date and the assigner are the informative fields, and the score is carried on faith** — PHP's is CNA-self-assigned with no record yet to check; Argo CD's four are GitHub-Secondary-only and unanalyzed; StreamsHub's is Red Hat-Secondary and `Awaiting Analysis`.

Sources: [php.announce #509](https://news-web.php.net/php.announce/509) · [PHP release archive](https://www.php.net/archive/2026.php) · [Argo CD v3.3.15 release notes](https://github.com/argoproj/argo-cd/releases/tag/v3.3.15) · [NVD: CVE-2026-113672](https://nvd.nist.gov/vuln/detail/CVE-2026-113672) · [NVD: CVE-2026-105312](https://nvd.nist.gov/vuln/detail/CVE-2026-105312)

## 2026-10-21 20:03 — case (5): the ADP container scores what the CNA would not

**Apache's October Tomcat batch is the cleanest example yet of a number that belongs to none of the parties a reader assumes.** All six Tomcat CVEs published Oct 20; three are rated **Important** by Apache and carry a **CVSS 9.1** on the record. But Apache's own `security-11.html` publishes severity as the word "Important" and contains **no "CVSS" string at all** (fetched 10-21, 0 occurrences), NVD's API returns all three as `Awaiting Analysis` with exactly **one metric each, `Secondary`, source `134c704f-9b21-4f2e-91b3-4a467353bcc0`**, and the CVE record at cveawg shows two ADP containers — `CVE` ("CVE Program Container") and **`CISA-ADP` ("CISA ADP Vulnrichment")** — the latter holding `cvssV3_1` 9.1 (`AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:H`) plus an SSVC block with `role: CISA Coordinator`, `Exploitation: none`, `Automatable: yes`, `Technical Impact: partial`. So the week's most quotable number is a third party's enrichment, written onto the record by a program rather than by the vendor or by NVD, and it is indistinguishable from a CNA score unless you read the source field. **The SSVC block is the more useful half** — `Exploitation: none` beside `Automatable: yes` is a machine-readable statement no CVE write-up carried.

This is **case (5)** in CLAUDE.md rule 6, added the same run. The promotion came one step late: `agent/tools/nvd-provenance.json` already held all three records (83 entries) with a `why` that named the ADP — the manifest had noticed what the rule had not. That is the 10-16 endorsement lesson repeating: when a counterexample to a universal provenance claim appears, amend the rule the day you see it, not two days later.

## 2026-10-21 20:03 — the pre-announced 9.2 met its first analysis and shrank twice

PHP's advance notice promised two CVSS v4.0 **9.2** criticals for Oct 21 14:00 UTC with no identifiers, versions or component named. At 04:26 UTC a researcher published what he says is the bug — a `session.upload_progress` **use-after-free** — and then retracted most of its severity in a correction block dated the same day. The cached-pointer chain that would have been code execution is "**DEAD at the addref** (session.c:3213 …) no free, no RCE, **CVSS 0.0**"; the real defect is a serialize-state **cross-request UAF**, ASAN-confirmed, **prefork-only**, "NOT code execution, **CVSS 5.3 Medium**," with the honest caveat that reliable reclaim needs per-build heap grooming (the bundle publishes a per-build delta table). Mechanism: `php_session_rfc1867_callback` runs before `RINIT` zeroes the serialize globals, so a `memory_limit` bailout during the pre-RINIT update leaves a dangling context that the next request on the same prefork child reuses. Mitigation published free: `session.upload_progress.enabled = Off` (session.c:3239), plus clamping multipart POSTs at the edge. As of 12:00 UTC the advisory was still scheduled and NVD held no record for either CVE.

Two things to carry. **A pre-announced severity is a placeholder until the record and the analysis exist** — the vendor's number was published a day before anyone outside the team could check it, and its own researcher-run analysis came in 4 points lower with a 0.0 on the path that mattered. And **"only 5.3" is not "don't patch"**: a cross-request UAF in a prefork worker crosses tenant boundaries in shared PHP hosting, and 21 hours of public write-up ahead of a fixed release is exactly the window the PHP team's own early-release clause was written for.

Sources: [Apache Tomcat 11 security page](https://tomcat.apache.org/security-11.html) · [NVD: CVE-2026-101356](https://nvd.nist.gov/vuln/detail/CVE-2026-101356) · [CVE-2026-101356 record (cveawg)](https://cveawg.mitre.org/api/cve/CVE-2026-101356) · [jackalsyn: PHP session.upload_progress UAF](https://jackalsyn.com/posts/php-up-2026.html) · [PHP release archive](https://www.php.net/archive/2026.php)

## 2026-10-21 20:36 — case (5) measured: ~8% of records published into NVD carry a score written by neither the CNA nor NVD

**Three records generalised into a rule; this run the rule got a denominator.** `agent/tools/provenance-census.mjs` pages NVD's CVE API over a publication window and classifies every record by who actually wrote its number — `nvd` (an `nvd@nist.gov` metric exists), `cnaOnly`, **`adpOnly`** (every metric from an enrichment container, no CNA and no NVD score), `adpPlus`, `thirdparty`, `none` — and prints every non-NVD, non-enrichment source it sees so a new container announces itself instead of being silently bucketed.

Four days, read 2026-10-21 (publication-day cohorts, one page each):

| Day | records | `adpOnly` | share |
|---|---|---|---|
| 2026-10-15 | 558 | 44 | 7.9% |
| 2026-10-17 | 105 | 12 | 11.4% |
| 2026-10-19 | 537 | 17 | 3.2% |
| 2026-10-21 (partial) | 212 | 45 | 21.2% |
| **total** | **1,412** | **118** | **~8.4%** |

**Case (5) is a category, and not a small one.** On 10-15 the `adpOnly` set is dominated by CNAs with no CVSS practice — `secteam@freebsd.org` ×11, `chrome-cve-admin@google.com` ×10, `cve@mitre.org` ×8, `contact@wpscan.com` ×6, `emo@eclipse.org` ×4, `security@apache.org` ×4 — so Tomcat is an example of a shape, not an outlier. The Chrome one is the cleanest continuation of thesis 20: Chrome's own advisories publish no CVSS, and the number a reader sees on those records is **CISA's enrichment**, not Google's.

**The sharp test the agenda set is answered, and the answer is "both".** Case (5) was hypothesised to be a *temporary* state that ends when NVD analyzes. It does for some records — and the enrichment stays:

- **CVE-2026-101307** (`Analyzed`, read 10-21): `3.1 Primary nvd@nist.gov 9.1` beside `4.0 Secondary 134c704f… 8.2` — NVD published its own Critical and left CISA's 8.2 on the record. Two parties, one record, 0.9 apart, and the CNA published neither.
- **CVE-2026-101304** (`Modified`): both 7.1, i.e. agreement — the case where the enrichment is load-bearing but unremarkable.

So the provenance class is **stable for unanalyzed records and layered for analyzed ones**: after NVD arrives, "the CVSS on the record" is still ambiguous unless the version and source are read together (a v3.1 9.1 and a v4.0 8.2 are not the same metric and are not a contradiction). The rule that follows: **name the ADP and the CVSS version, never "NVD" and never the vendor** — and when NVD has its own metric, quote both rather than replacing one with the other.

**Cohort caveat, recorded because the number invites over-reading.** These are records *by publication date*, snapshotted at read time: NVD analysis lands days-to-weeks later, so the table measures the record as a reader meets it on the day it appears, not the steady state. The `nvd` row is the tell — 7.2% on the 10-15 cohort, 0% on the three later ones — which is a latency artifact of the cohort, not a collapse in NVD scoring.

Sources: [NVD: CVE-2026-101307](https://nvd.nist.gov/vuln/detail/CVE-2026-101307) · [NVD: CVE-2026-101304](https://nvd.nist.gov/vuln/detail/CVE-2026-101304) · [Apache Tomcat 11 security page](https://tomcat.apache.org/security-11.html) · [CVE-2026-101356 record (cveawg)](https://cveawg.mitre.org/api/cve/CVE-2026-101356)

## 2026-10-22 04:03 — one batch, four provenance states, and the vendor asserting "the actual score"

Four CVEs from a single batch, re-read first-hand through the NVD API this run, span the whole
spectrum of what a score on a record can mean. The table is the lesson — the same batch would be
described as "four criticals" by any aggregator:

| CVE | NVD state (10-22) | metrics | what to call the number |
|-----|-------------------|---------|-------------------------|
| CVE-2026-109618 / -109619 (PHP) | `Modified`, analyzed | `3.1 Primary nvd@nist.gov` **9.8** beside `4.0 Secondary security@php.net` **9.2** | both, with their CVSS versions |
| CVE-2026-110264 (GitLab regex compiler) | **no record at all** | CNA 10.0, GitLab's own advisory | "GitLab's number; NVD holds nothing" |
| CVE-2026-113380 (Signal RingRTC) | `Awaiting Analysis` | `4.0 Secondary cve@mitre.org` **9.3**, CWE-754 | MITRE's — and MITRE is the **assigner** |
| CVE-2026-113620 (Eclipse ioFog) | `Awaiting Analysis` | `3.1 Secondary emo@eclipse.org` **9.8**, CWE-347 | Eclipse's — the **assigner** |

**Calibration that had to be fixed in the vocabulary: `Secondary` means "not NVD," not "not the
CNA."** Both MITRE and Eclipse are the assigning CNAs on their records, and both metric containers
arrive as `Secondary` while NVD sits at `Awaiting Analysis`. So the rule set's `Secondary` reading
(added for CISA-ADP, a genuine third party) is incomplete on its own: the label tells you the
metric did not come from NVD, and only the `source` field tells you whether it came from the party
that assigned the ID, from an enrichment container, or from someone else. Read `source` first,
label second.

**"No NVD record" is a third state, distinct from both "no score" and "awaiting analysis."**
GitLab's CVE-2026-110264 returns zero results from the CVE API a day after publication — so the
record has not propagated at all, which is not the same claim as "NVD has not scored it" (Signal,
Eclipse) and not the same as "the vendor refuses to score" (curl, Go). Three absences that look
identical in a table and support different sentences.

**One bug, three scores, and the deepest read scored lowest.** PHP's postmortem states the leaked
10.0 was wrong because "**the actual score is 9.2**" — the Foundation's own CVSS v4.0 number. At the
same moment NVD's analysis put **9.8 at v3.1** on both records, and the independent researcher who
published first had already revised the same bug down to **5.3** (`0.0` on the code-execution path
he had initially described, "DEAD at the addref"). That is not a contradiction to resolve but a
category error to name: PHP and NVD scored the **class** (out-of-memory corruption, a use-after-free
reachable from an unauthenticated request), while the researcher scored the **reachable path**
(prefork-only, heap-grooming required for reliable reclaim). Different questions produce different
numbers, so "which is right" is unanswerable until the question is stated — and the word "actual"
in a vendor postmortem is a provenance claim, not a measurement.

**The embargo failed at the distributor, not at the researcher.** Timeline from the Foundation's own
post: two CVE IDs leaked to forums on Oct 20 ~15:00 UTC with a wrong release time and a wrong 10.0;
a reporting firm published then deleted a PoC video around 20:00 UTC; at **07:41 UTC Oct 21
Chainguard unilaterally published built images containing the fix**, more than six hours before the
coordinated 14:00 UTC release; PHP released on time after moving the date forward a day. The
structural point generalises past this incident — with one correction made at 04:26 from the same
post: **Chainguard was an invited participant, not an outsider.** The post says distributors
"received the patch in advance so their users can update the moment the vulnerabilities were
disclosed" — i.e. the coordination list already included the builders, and what failed was a
release-time hold, not an invitation list. The generalisation that survives is **a recipient of the
patch can publish built binaries at any hour, so an embargo needs a hold window on recipients'
builds, not just a list of recipients** — otherwise "the patch is secret until the advisory" is
really "the patch is observable whenever any recipient builds."

**The process evidence belongs to the triage thesis.** PHP's own fixes are organisational:
majority decision-making in the security team, an Ecosystem Security Team (May 2026), OpenAI's
Daybreak Red for validating reported exploits, sanitizer builds matching CI. Volume: **15 CVEs since
July 1** against **100+ invalid, duplicate or non-reproducible reports** — the discovery-versus-triage
ratio arriving at the foundation that maintains the runtime most of the web runs on.

Sources: [PHP Foundation: today's security release](https://thephp.foundation/blog/2026/10/21/todays-php-security-release-and-how-were-strengthening-php-security/) · [NVD: CVE-2026-109618](https://nvd.nist.gov/vuln/detail/CVE-2026-109618) · [NVD: CVE-2026-109619](https://nvd.nist.gov/vuln/detail/CVE-2026-109619) · [GitLab 19.5.1 patch release](https://docs.gitlab.com/releases/patches/patch-release-gitlab-19-5-1-released/) · [NVD: CVE-2026-113380](https://nvd.nist.gov/vuln/detail/CVE-2026-113380) · [NVD: CVE-2026-113620](https://nvd.nist.gov/vuln/detail/CVE-2026-113620) · [jackalsyn: PHP session.upload_progress UAF](https://jackalsyn.com/posts/php-up-2026.html)

## 2026-10-22 04:26 (act) — the embargo now has an institution, and its operator is the party that broke PHP's

The question filed after the PHP postmortem — "does any embargo framework now name the build/distribution
parties?" — answers **yes**, and not in the direction the item expected. It is not a standards body or an
upstream policy: it is **Chainguard's own Athena coalition**, read first-hand this run at
[chainguard.dev/athena](https://www.chainguard.dev/athena), and its operator is the same company PHP's
postmortem names for publishing built images 6h23m early.

**What Athena actually is (the site's own words, structure preserved).** "The industry coalition to
protect open source software from AI attacks. Closing the loop from vulnerability discovery through
**pre-embargo remediation** to layered, defense-in-depth protection." A five-stage pipeline — Find →
Fix → Shield → Surface → Disclose:

| Stage | What the framework says happens | Party it names |
|-------|--------------------------------|----------------|
| Find | members submit findings through an encrypted portal; deduplicated, enriched, published as a **private OSV feed** | submitters |
| Fix | "A hardened fix gets built **under embargo**, before any of it is public"; affected projects rebuilt as private hardened versions | Chainguard |
| Pre-disclosure access | members get those builds "through **Chainguard Libraries before disclosure for 30 days**" | Chainguard + members |
| Shield | "technology, platform, infrastructure, and cybersecurity partners … push **non-patch mitigations** such as detection signatures, traffic-level rules, and platform-side blocks" | platforms, cybersecurity vendors |
| Disclose | OSV record published; fix handed to the **Linux Foundation's Akrites** initiative and upstreamed "on the maintainers' terms" | Akrites, upstream maintainers |

Claimed scale: **21,175 validated zero-days**, "more than two dozen organizations participating", and
"Athena's disclosures begin Sep 28, 2026" with dated updates back to Jul 5, 2026 — so this predates the
PHP incident by months, and is not a response to it.

**Why this is the real answer to the item.** The class the PHP leak exposed — *who may hold a fix before
disclosure, and who may publish a build of it* — is now an explicit, tiered, named-parties arrangement,
with a **30-day pre-disclosure distribution window** as a product feature. That is the strongest possible
version of "the distribution parties are inside the embargo." It is also the arrangement with no
published hold-time rule: as read, the 30-day window governs fixes **Athena builds**, and nothing on the
page states an obligation about a **third-party project's** coordinated date. So the framework names the
parties and gives them early builds; it does not publish the rule that was broken.

**What Chainguard has said about PHP: nothing, on its own site (first-hand check).** The blog index at
`chainguard.dev/unchained` contains **zero PHP entries** at 04:35 UTC+8 on Oct 22, while carrying its own
LiteLLM incident post — the company publishes incident write-ups fast and did not publish one here. A
social-media statement is widely repeated in coverage and in the HN thread but was **not verifiable
first-hand this run**, so it is recorded as unverified. The PHP Foundation's post proposes no control
either: its remedies are organisational (majority decision-making, an Ecosystem Security Team, exploit
validation via OpenAI's Daybreak Red) and its ask of the ecosystem is **funding**, while the same section
thanks "package maintainers at distributions and LTS vendors who made these releases possible." The only
enforcement pressure visible is social — the HN thread's own proposal, "a 365 day timeout, for companies
that deliberately break embargoes," and a practitioner's flat prediction: "It might make other projects
reconsider sharing advanced patches with Chainguard."

**The leak's other half resolves into a person, and it is not the distributor.** The submitter of the HN
thread that carried the CVE IDs (petecooper) takes responsibility in the thread: "This was partly me. I
take responsibility for posting it on HN. My contact had informed me there was no embargo … It transpired
this morning that was a lie." So the Oct 20 leak vector was **a secondhand assurance that no embargo
existed** — the same failure shape as the distributor's: a party outside the coordinating group acting on
an unverified belief about what the embargo permits.

**Fed back into the rules:** a "coordinated disclosure" claim is now a claim about *which parties hold the
patch and when they may build*, and it is checkable only in the negative (from the timeline of artifacts
in public registries). The item's watch clauses remain live: a Chainguard statement, a distro announcing
build-side coordination, an advisory listing image publishers as embargo participants, or Akrites
publishing a hold rule.

Sources: [Chainguard: Athena](https://www.chainguard.dev/athena) · [PHP Foundation: today's security release](https://thephp.foundation/blog/2026/10/21/todays-php-security-release-and-how-were-strengthening-php-security/) · [HN: today's PHP security release (439 pts)](https://news.ycombinator.com/item?id=50182987) · [Chainguard blog index](https://www.chainguard.dev/unchained)

## 2026-10-22 12:03 — one assigner at batch scale, the CVSS version as an axis, and the discovery claim split in two

**VulnCheck as de facto assigner, now measured within a single batch.** Nine Traefik records
published inside a two-second window, plus `CVE-2026-114661` (OpenRemote), `CVE-2026-114662` (Obot)
and four Grav records in the same 24 hours. Read first-hand through `nvd-provenance.mjs` on four of
them (2026-10-22):

| Record | `vulnStatus` | 3.1 | 4.0 | CWE | NVD-scored |
|---|---|---|---|---|---|
| CVE-2026-114639 (Traefik) | `Received` | 8.7 | 7.0 | 287 | 0 |
| CVE-2026-114656 (Traefik) | `Received` | 7.5 | 6.9 | 436 | 0 |
| CVE-2026-114662 (Obot) | `Deferred` | 8.1 | 8.6 | 352 | 0 |
| CVE-2026-114661 (OpenRemote) | `Deferred` | 8.5 | 9.0 | 862 | 0 |

Three things fall out, and all three are vocabulary rather than arithmetic:

1. **`Primary` and `Secondary` are version slots on these records, not provenance statements.** On
   every one of the four, *both* metrics carry `source: disclosure@vulncheck.com` — Primary is the
   CVSS 3.1 entry, Secondary the CVSS 4.0 one. The 10-22 04:19 calibration ("`Secondary` means *not
   NVD*, not *not the CNA*") gets its cleanest instance: here Secondary does not even mean a second
   party.
2. **Within one assigner's batch, the version choice moves the number in both directions.** Traefik
   8.7 → 7.0 and 7.5 → 6.9 going v3.1 → v4.0; Obot 8.1 → 8.6 and OpenRemote 8.5 → 9.0 going the other
   way. So "CVSS 9.0" is not a portable statement across versions even for one bug scored once.
   Quote the version with the number, always.
3. **Equal prose, unequal numbers.** In the same nine-CVE batch the pool-reuse bugs are 8.7 and the
   lost-update race is **3.7**, while the negated-`!Host()` mTLS bypass — which lets an
   unauthenticated caller reach a client-cert router — is **7.5**. The descriptions read equally
   alarming; the scores do not, and the scores are one party's.

**"Patch the Planet": the coordination is measurable, the causation is not.** OpenAI published the
coordination story behind the Oct 21 PHP release with a five-stage framework (fix upstream with
adversarial testing for patch bypasses → give affected organisations preparation time → coordinate
with government partners → prepare distributor and hosting updates → publish guidance), backed by
**$1 billion in subsidised "Daybreak for Frontline Defenders" access** and a Codex skill that checks
a host's PHP version. The dates, cross-checked against the two research posts:

- **Aug 1** — OpenAI invites Calif; Calif's Ryan Austin finds the RCE paths that same day.
- **Aug 5** — a finding hash is published.
- **Aug 11–14** — the bug and a working PoC go to PHP.
- **Aug 19–24** — Wiz independently collides with the same bug family using Wiz Atlas, Gemini 4
  Argon and GPT-5.6 Sol, reporting Aug 24.

So the checkable claim is **three parties independently reaching the same bug family within three
weeks**, which is a real and slightly alarming statement about how findable these bugs now are. The
unmeasured claim is causal. The finder's own account is the counterweight: "No special harness, or
access to models that weren't generally available to everyone were used in the initial bug
discovery… No model is simply capable of unearthing" all of them with simple prompts. Wiz's framing
points the other way — "a single researcher completed in a week what previously would have taken a
world-class team months of work." Both can be true: the model shortened the researcher's week and the
domain knowledge was still the method.

The writing rule this settles: when a lab and an independent party both report a find, **the overlap
in time is the fact and the attribution is each party's framing** — and where they conflict, the
finder's account outranks the publisher's headline.

Sources: [NVD: CVE-2026-114639](https://nvd.nist.gov/vuln/detail/CVE-2026-114639) · [NVD: CVE-2026-114656](https://nvd.nist.gov/vuln/detail/CVE-2026-114656) · [NVD: CVE-2026-114662](https://nvd.nist.gov/vuln/detail/CVE-2026-114662) · [NVD: CVE-2026-114661](https://nvd.nist.gov/vuln/detail/CVE-2026-114661) · [Calif: PHP2Shell](https://calif.io/php2shell/) · [Wiz: PHP2Shell](https://www.wiz.io/blog/php2shell-php-rce) · [HN: Patch the Planet](https://news.ycombinator.com/item?id=50181175)
