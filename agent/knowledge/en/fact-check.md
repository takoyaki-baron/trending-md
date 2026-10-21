
## The star-to-commit ratio, applied before writing (2026-09-21 20:03)

OpenStock (Open-Dev-Society, AGPL-3.0) hit #3 on daily trending — 17,274 stars, +755 that day —
against **141 commits**, a README crediting one lead contributor with "the entire application," and
tutorial provenance (JavaScript Mastery). The MiroFish/OpenMontage caution ratio, checked *before*
publishing: a polished portfolio-grade app riding a viral moment, not production market
infrastructure — its own page concedes 15+-minute delayed non-US data on free tiers, Finnhub rate
limits, "not a brokerage." The durable extraction: star velocity measured against commit count is a
two-number check that takes seconds and would have caught the Void failure class; the honest item
writes the *demand* signal (an open, self-hostable market-data front end is what 755 people/day want
to star), not the repo's maturity.

## 2026-09-25 20:36 — "patched" is a claim about a git ref; the memorization probe gets a causal method

Three additions to the method ledger from the 09-23→09-25 sweep. **Apache MINA CVE-2026-94301:** the June fix for a CVSS 9.8 was committed to a branch and never made it into a release — a version-number patch check reads "vulnerable" while the repo reads "fixed." The fix-ref, not the release number, is the claim to verify. **SchrödingerRepo (arXiv:2609.27891)** gives the SWE-bench memorization critique a clean causal method — four progressive *behavior-preserving* transforms (problem-statement reconstruction, namespace remapping, intra-file layout reordering, functionality-preserving rewriting) with executable behavior held identical, and the honest framing: qualitative degradation concentrated in repo exploration/localization, no inflated single number, agents "partially rely on memorized repository-side cues." **Breen's archival essay** is the model for keeping score against one's own claims: the Charles V ciphers Opus partially deciphered were already solved (1530s, 1916 — "desk research" the model skipped), the Newton anagram finding "only seems" new, and the real bottleneck (undigitized manuscripts) is named — exactly the already-solved-problem failures vendor demos never mention. Plus: the scorer-split ledger grows by two (Avast CVE-2025-13032 — 9.9 Gen-Digital-CNA vs 7.8 NVD; libexpat 2.8.5 — 9.8 upstream vs 7.5 NVD), and the GitHub brand-imitation takedown (23 days of silence after VirusTotal-flagged evidence, then removal ~10 minutes after the HN front page) is the measured baseline for platform policing that scales with virality, not harm.

Sources: [arXiv:2609.27891](https://arxiv.org/abs/2609.27891) · [Res Obscura](https://resobscura.substack.com/p/ai-labs-need-to-start-funding-historical) · [NVD: CVE-2026-94301](https://nvd.nist.gov/vuln/detail/CVE-2026-94301) · [Successful Software — GitHub takedown](https://successfulsoftware.net/2026/09/24/github-has-not-removed-malicious-imitation-software-after-3-weeks/)

## 2026-09-26 04:35 — attestation proves where, not whether; the advisory can contradict itself

Two reusable additions. **GHAPPIER** gives the trust-model lesson a concrete instance: the malicious `@dforge-core/dforge-mcp` v0.2.21 release carried **valid OIDC provenance and Sigstore attestation naming the attacker's own commit** — the attestation chain worked exactly as designed, and the release was still malware. "Provenance attests where an artefact was built, not whether its source was honest": any pipeline treating npm provenance as a trust signal needs its mental model updated — attestation is evidence of process, not of intent. The check it actually supports is "was this built by the repo's CI from that commit," and the attacker satisfied it by controlling the workflow (a 105-minute maintainer-account window, publish-on-push edit). **Brocade CVE-2026-82370** is the consistency lesson inside a single document: the advisory *describes* the SANnav flaw as unauthenticated while its own CVSS v4.0 vector (`AV:A/…/PR:L`) says adjacent + low privileges — an internal inconsistency in the CNA's own advisory, so the 8.6 is provisional until the vector and the prose agree. The general form: when the prose and the vector disagree, neither is confirmed — quote the contradiction, not the number. Related: the vendor "AI-discovered" disclosure category arrives (Brocade states the flaw was "a Frontier AI discovered vulnerability") — and AI-discovered still needs the same human audit, starting with the advisory itself.

Sources: [CloudSEK — GHAPPIER](https://www.cloudsek.com/blog/ghappier-malware-loader-npm-supply-chain-attack) · [NVD: CVE-2026-82370](https://nvd.nist.gov/vuln/detail/CVE-2026-82370) · [Broadcom BSA-2026-3919](https://support.broadcom.com/web/ecx/support-content-notification/-/external/content/SecurityAdvisories/0/38995)

## 2026-09-26 20:51 — star-timeline verification is dead: GitHub now 404s the stargazers listing platform-wide

Discovered mid-check: the stargazers endpoint (API with the `star+json` media type, the plain API call, and the HTML `/stargazers` + `/watchers` pages) returns 404 for EVERY repo — verified against four unrelated repos (reverse-skill, jev-ultrafast, paperclip, claude-code-templates) while the forks/contributors/issues endpoints still serve. Consequence: per-star timestamps (star-velocity curves, burst-vs-organic bot detection) are no longer obtainable first-hand — any published star-history claim is now unverifiable at the source. The engagement-ratio check migrates to what still exists: ★/commit count (commits-list Link header), fork %, subscriber %, and a history-span probe (oldest visible commit vs created_at — a large gap means rewritten or long-empty history, which is exactly how reverse-skill's missing three months surfaced). Formalized as `agent/tools/star-integrity.mjs` + Pass 9 in `agent-run.sh` (flag at ≥100★/commit against the 19/209/6,806 calibration ladder; a type-matched control repo measured for context, never flagged).

Sources: [GitHub REST — List stargazers (now 404s for all repos)](https://docs.github.com/en/rest/activity/starring#list-stargazers) · [browser-use/jev-ultrafast — verified 404](https://github.com/browser-use/jev-ultrafast/stargazers)

**Kiteworks' global shutdown — headline vs primary statement (09-27)**: coverage headlined "potential zero-day attacks" (a support-queue phrase, per Heise) while the vendor's own statement says "not aware of any compromise… all known vulnerabilities addressed in 9.5.1" and no CVE exists. The extraordinary fact (a vendor telling its whole install base to power off) and the unconfirmed framing were kept separate in the same item — the extraordinary part is real, the "zero-day" part is not established.

## 2026-09-28 — absence claims are perishable at write time (this feed's own KEV inversion)

The 09-28 04:03 feed batch published a Cisco ISE item whose entire hook was a "correction": CVE-2026-76460 is *not* on CISA KEV, "we checked the KEV feed directly." A one-call check ~40 minutes later (`known_exploited_vulnerabilities.json`, catalog v2026.09.25) showed the CVE **listed since Sep 16** — the "correction" was itself the false claim, and the item was corrected in place en/zh/jp with the KEV catalog as source. Two lessons folded into the standing method: (1) an absence claim has a half-life measured in hours, not days — verify it in the same session it is typed, not in a previous run (the claim was plausibly true when first drafted, then aged out before publication); (2) the inverse-claim genre ("we checked, it's NOT there") carries extra authority and therefore extra risk — being the *corrector* is no substitute for being *correct*. The one-call checks in CLAUDE.md (NVD metrics, npm packument, GitHub repo state, KEV catalog) all belong in the same pass as the writing.

Sources: [CISA KEV catalog](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) · [NVD: CVE-2026-76460](https://nvd.nist.gov/vuln/detail/CVE-2026-76460)

## 2026-09-28 12:03 + 20:03 — the trending-audit published as its own item (PLFM_RADAR)

**PLFM_RADAR (`NawfalMotii79/PLFM_RADAR`) re-trends at +145★/day (25.6k★) with no trigger findable** — no release since April (v2.0.2-p0-audit), no commit since Jun 17, no fresh HN or press pickup located; the strongest prior attention is an older 71-point HN thread. The trigger check every item is supposed to get ran, found nothing, and became the item: "a genuinely impressive hardware artifact whose *current* trend is unexplained, and whose maintenance status is dormant — signal to investigate, not to install." A consumer-price phased-array radar is remarkable open hardware; today it doubles as a live specimen of star velocity detached from any project event. The difference from the Void precedent is *when* the check ran: before publication, and the published finding is the check itself — the discipline applied at item level, not as post-hoc correction. Compare the reverse case from the same day: the feed's own KEV-absence claim (→ 09-28 04:03 entry) inverted because the check *wasn't* run at write time.

Sources: [NawfalMotii79/PLFM_RADAR](https://github.com/NawfalMotii79/PLFM_RADAR) · [Hackaday project](https://hackaday.io/project/205190-open-source-plfm-radar-up-to-20km-range)

## 2026-10-02 12:03 — the dormancy-heavy trending board: three of the top fifteen at once, verified live

GitHub Trending on Oct 1 was a live demo of this feed's oldest lesson — stronger than any single instance before it. **#1 DietrichGebert/ponytail** (150,288★, +1,179 that day — "makes your AI agent think like the laziest senior dev in the room"): last push **Sep 14, eighteen days** earlier, riding an old viral wave, not new work. **#12 pablostanley/yoinks** (+356 that day): unpushed since **Jul 17**. **#13 HunxByts/GhostTrack** (+369 — a "track location or mobile number" tool of dubious accuracy): unpushed since **January 2024**. All three verified against the GitHub API (`pushed_at`, stars, archived flags) before publication. This is the third documentation of the pattern (Void in August, PLFM_RADAR on Sep 28) — but the first with **three simultaneous instances in the top fifteen**, which converts an anomaly into a board-level property: trending rank rewards whatever is already being shared, so star velocity compounds on dormancy instead of decaying. `pushed_at` remains the cheapest possible disambiguator — one API call per repo — and the structural lesson is that the check has to run at item-generation time, not as post-hoc correction: the feed ran it as part of writing the item, and the published finding *was* the check.

Sources: [ponytail](https://github.com/DietrichGebert/ponytail) · [yoinks](https://github.com/pablostanley/yoinks) · [GhostTrack](https://github.com/HunxByts/GhostTrack)

## 2026-10-03 05:03 — a 9.0 the CNA itself rates Moderate; a "fixed in" version that predates the disclosure

**CVE-2026-86345 (389 Directory Server StartTLS injection): score and severity rating are different claims.** Red Hat, as CNA, assigned **CVSS 9.0 CRITICAL** and simultaneously rated the impact **Moderate** "despite a CVSS base score of 9.0" — exploitation needs an active MITM position, "389-ds-base itself is not compromised by this flaw," the damage lands in downstream clients like PAM, and Red Hat explicitly compares it to Blast-RADIUS (CVE-2024-3596). NVD hasn't scored it (Awaiting Analysis). The quote-the-contradiction rule (cf. Brocade's advisory whose prose and CVSS vector disagree) generalizes: **the vector and the vendor's severity rating disagree, and both halves are the story** — a 9.0 headline that is real (your PAM bind can be forged) but bounded (needs a MITM). Either half alone misinforms patch triage.

**"Fixed in 6.5.4" was true and misleading until the tag date was checked.** Today's Zammad KEV item cites the fix version from the CVE record — but the **6.5.4 tag was committed 2026-04-08, six months before the Sep 30 disclosure** (verified via the GitHub tags API, one call). That converts the reader's natural reading ("upgrade to get the fix") into the accurate one: 6.5.4 is a pre-disclosure/per-branch fix; there is still no post-disclosure release or GHSA (newest repo-advisory batch Aug 25), and the privesc exists in all versions including the latest alpha per NVD. **A fix-version claim has a hidden temporal coordinate** — always resolve the tag/commit date before writing "upgrade to X."

Sources: [Red Hat CVE database](https://access.redhat.com/security/cve/CVE-2026-86345) · [zammad/zammad commit 15c7e6d](https://github.com/zammad/zammad/commit/15c7e6d4ffd95c84535d334b7c0ce0bc2fbc5228)

## 2026-10-04 04:03 — the pending-claim frame and the advisory→NVD gap, both caught at write time

Two instances of standing rules firing as designed in one batch, recorded as anchors for the next edge case. **(1) The pending-claim frame (Vercel's KVM 0-day):** the claim arrived as a vendor CEO tweet with zero of the load-bearing specifics — no CVE, no affected versions, no component, no maintainer confirmation — so the item's frame *is* the verification debt: "treat it as a pending claim, not an established vulnerability." The discipline is not just "visit the source" but pricing the claim at what's missing: a 0-day in the hypervisor under most agent sandboxes would be an industry-wide event, and industry-wide events do not publication-complete as one tweet (cf. the Kiteworks separation: extraordinary fact vs unconfirmed framing). The item can age in two directions and both are wins — the writeup lands and upgrades it, or nothing lands and the tweet ages as a claim that never completed. **(2) The advisory→NVD publication gap (MikroTik CVE-2026-84411):** CISA advisory Sep 29, NVD record Oct 2 ("Received") — the item framed it as "newly *documented*, not newly fixed," the publication-direction twin of the perishable-absence rule: no NVD record ≠ no exposure, because enrichment lags record publication (the same lag that inverted two absence claims in September, now harnessed on the other side). Both checks were one API call each, run in the same session as the writing — the method working, recorded so its failure modes stay recognizable when a batch skips it.

Sources: [rauchg on x.com](https://twitter.com/rauchg/status/2106402024804020657) · [CISA ICSA-26-272-06](https://www.cisa.gov/news-events/ics-advisories/icsa-26-272-06) · [NVD CVE-2026-84411](https://nvd.nist.gov/vuln/detail/CVE-2026-84411)

## 2026-10-04 05:27 act — an absence claim has a channel; a score has layers

**(1) "No vendor advisory" requires checking the vendor's CURRENT channel, not the one an aggregator cites.** A search-aggregator claimed "Zammad has published a security advisory under ID ZAA-2026-05" for the DIVD chain. The ID exists on zammad.com/en/advisories — but it is an **April** entry, and ZAA-2026-07 (Apr 8) states outright it was "the last security advisory published on the Zammad website. Going forward, all advisories will be available on GitHub." The real channel (repo GHSAs, one API call) has no entry for either CVE. An advisory-ID claim that checks out as *existing* can still be *wrong about the event*: verify the ID's date and subject, not just its existence — and when a vendor announces a channel migration, that announcement becomes the context every future absence claim about that vendor must cite. **(2) A CVSS score is layered before it is a number.** The Oct 3 feed item's "DIVD secondary 8.7 RCE alone, 9.4 chained" looked wrong against NVD on re-check (9.4 on both records) — but the CVE.org CNA record carries *scenario-conditional* scores (8.7 GENERAL / 9.4 chained for 102489; 8.5 / 9.4 for 102490) that NVD's mirror flattens to the chained value only. Near-miss averted by pulling `cveawg.mitre.org/api/cve/<id>` before calling a mismatch: **NVD is a mirror of the CNA record plus NVD's own analysis — check all three layers (CNA scenarios, NVD mirror, NVD analysis) before correcting a published score.** One call each: `curl https://cveawg.mitre.org/api/cve/CVE-…` → `containers.cna.metrics[].scenarios`.

Sources: [Zammad advisory index](https://zammad.com/en/advisories) · [ZAA-2026-07 (the channel-migration notice)](https://zammad.com/en/advisories/zaa-2026-07) · [CVE.org CNA record CVE-2026-102489](https://cveawg.mitre.org/api/cve/CVE-2026-102489)

## 2026-10-06 20:45 — the star-to-watcher ratio; a 10.0 on a dormant repo

**Star-to-commit catches history inflation; star-to-WATCHER catches audience absence (10-06):** tester-army/e2e took daily #1 (+344★/day, 2,921★) with a genuinely interesting core idea (record-then-replay agentic testing), but the health numbers tell a second story: **7 watchers** on 2,921★, 33 open PRs, no releases despite a changesets directory, heavy promotion of the commercial tester.army platform. Watchers are the hardest star-count to fake at scale — nobody watches a repo they don't care about — so a four-hundred-to-one star/watch ratio flags attention that isn't translation into actual users. Joins the disambiguator kit: `pushed_at` (dormancy), star-to-commit (history-vs-velocity), and now star-to-watcher (audience-vs-attention).

**A CVSS 10.0 can land on a repo that stopped moving (10-05):** MindSearch CVE-2026-105135 (VulDB CNA) — planner-agent code injection — scored maximum severity against a repo whose last push was Jul 4, 2025 (fifteen months dormant, not archived). The dormancy check (already standing since the Flowise lesson) applies to score *magnitude* too: a 10.0 on a dead repo is not a patch-pending emergency, it is a permanent-exposure fact — different advice (stop exposing / fork), different urgency. The check must run at item-generation time, and the score must not set the tone the repo state doesn't support.

Sources: [tester-army/e2e](https://github.com/tester-army/e2e) · [NVD CVE-2026-105135](https://nvd.nist.gov/vuln/detail/CVE-2026-105135) · [InternLM/MindSearch](https://github.com/InternLM/MindSearch)

## 2026-10-07 04:34 — exploitation status as the third scoring axis

**Triage on exploitation, not severity (10-07):** NetScaler CVE-2026-88779 was KEV'd by CISA on the same day its NVD record published, scored **7.5 High** (NVD-analyzed primary; 8.7 on the secondary CVSS 4.0) — a confirmed-exploited bug with no 9+ anywhere. Joins the scorer kit alongside "who scored it" (CNA vs NVD) and "quote the contradiction" (score-vs-prose splits): the **exploitation axis** is the one that sets patch priority, and any CVSS≥9.0 filter silently drops it. Corollaries for the feed: a KEV add is newsworthy at *any* score; "no 9+ anywhere" must never be read as "not urgent"; and the same-day record→KEV turnaround is itself a signal worth recording (contrast the advisory→NVD publication gap noted 10-04 — the pipeline runs at both speeds).

Sources: [NVD CVE-2026-88779](https://nvd.nist.gov/vuln/detail/CVE-2026-88779) · [CISA KEV catalog](https://www.cisa.gov/known-exploited-vulnerabilities-catalog?field_cve=CVE-2026-88779)

## 2026-10-07 PM → 10-08 — honesty that survives its own README; a shared stopping rule; attribution as claim-not-finding

- **zerobrew's README disclaims its own tagline twice** ("100×" = 24 of 100 packages, warm only; "none of these numbers exist without" Homebrew's bottle build farm) — the positive case for rewarding derived-value honesty: a package manager whose entire value is someone else's build farm, saying so in its own README. The week's cleanest self-applied instance of the limitations-in-the-lede discipline.
- **matklad's ~300ms rule** — size microbenchmarks so warm-cache noise (~2%) sits inside a tolerable error bar; thresholds de-generalized to one laptop, measure your own noise floor. Agent-written benchmarks are becoming ambient (every harness generates performance claims as a side effect of existing); a shared stopping rule for "is this measurement real" is the folklore the harness wave keeps rediscovering.
- **Head-of-government attribution is a claim, not a finding** (South Korea's president: AI agents "appear" in the bank hacks; no technical evidence published, no tooling named) — same discipline as vendor exploitability claims: cite who said it, note what evidence exists, keep the noun out of the headline until the artifact lands. Contrast the Australia June disclosure, which named the tool.
- **The sourcing-chain caveat** (Meta/Microsoft Claude pullback): The Information (paywalled) → aggregator re-reports → HN — three hops before us; figures carried as "reported, not confirmed" in the feed item itself. The chain length is itself a signal.

## 2026-10-11 → 10-13 — catch-up: the record lags the field; changelogs are the only signal; ask which artifact the numbers describe

- **"Fixed in N" must be verified against the actually-latest build (AhsayCBS).** Both CVEs are reported fixed in 10.3.2 — NVD's descriptions still say "up to 10.3.2" — but Huntress tested the vendor's current latest **10.3.4 and it is also affected**; the vendor didn't answer press queries. The record was true when written and false in the field; the check is not "does the advisory say fixed" but "does the fix exist in the newest shipping artifact." Same shape as LMCache/SGLang release-watching, applied to closed source.
- **Silent fixes make changelog wording the only signal (Telegram, AnyDesk).** Telegram fixed a one-click tdata-exfiltration chain in 7.2.9 with a changelog line about rendering; AnyDesk fixed pre-auth root RCE in 8.0.3 with "fixed a bug that could lead to a crash" — no CVE (NVD keyword check: newest AnyDesk CVE = 2023 — **verified absence**, done properly), no advisory. Two cases in one month where defenders who diff advisories saw nothing. Method: keyword-search NVD for the product, diff the vendor changelog against researcher blogs, and treat "no CVE" as a claim to verify with the one-call NVD check, never as an article's assertion.
- **Ask which artifact the benchmark describes (Muse Wonder).** The launch benchmarks (Harvey LAB, FocusBench, SWE-Marathon) belong to Wonder Full — a tier sold only inside Meta's own harness — while the buyable API model is base Wonder ("closer to Sonnet" hands-on). The disclaimer-stripping lesson (2026-08-23) generalizes from caveats to *tiering*: when the headline number and the purchasable product are different artifacts, the gap is the story. Same family: Reflection Beam pre-announcing on vendor-run efficiency numbers; Prime Agent's self-reported swarm metrics from the company selling the sandboxes and inference it ran on; billion-context's repo-shipped self-published study.
- **The static-artifact re-trend (218k★ Karpathy CLAUDE.md).** Dormancy is a board-level property (10-02) — extend it: a repo with no push since April accruing +279★/day is attention accruing to a *name*; the star-to-push check joins star-to-commit and star-to-watcher as the cheap disambiguators. A static prompt file doesn't decay, but velocity on it measures the shelf's bubble, not the artifact.
- **Coverage-framing corrections run both directions (Anthropic report).** Our Oct 10 framing ("a model filed a false tip") implied sandbox escape; the Oct 9 report's own finding is the opposite — most cases ran where live internet was *deliberately enabled* (standard for web benchmarks) or in regular internal use. The correction ("persistence, not escape") changes the fix (incentive design, not architecture) — and it's the vendor's own report that supplies it, days after the initial coverage. Read the report, not the coverage of the coverage.
- **Satire as a lagging indicator (OpenFatigue).** When a parody vendor site front-pages the week of a real licensing split (Bitwarden) and an archive-with-no-security-patches (Boundary CE), the parody is evidence the term's signaling value broke — useful for calibrating how much weight "open" in a product name should carry in our own items.

Sources: [BleepingComputer — AhsayCBS](https://www.bleepingcomputer.com/news/security/unpatched-ahsaycbs-flaws-exploited-to-deploy-webshells-mine-crypto/) · [beaksec — Telegram](https://beaksec.github.io/posts/telegram-desktop-one-click-account-takeover/) · [The Hacker News — AnyPwn](https://thehackernews.com/2026/10/researchers-publish-working-exploit-for.html) · [Meta — Muse Wonder](https://research.meta.ai/blog/muse-wonder) · [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) · [Anthropic — unintended actions](https://www.anthropic.com/research/investigating-unintended-model-actions)

## 2026-10-13 PM → 10-14 04:03 — six method lessons from the batch

1. **Press-leak numbers vs the vendor page (Intel D270).** The in-thread bandwidth/FLOPS figures (1.5 TB/s, 1.3 PFLOPS FP8, via videocardz) appear nowhere on Intel's own page, whose projections carry "Intel internal analysis as of Feb 2026." The Meta Wonder lesson in silicon: cite the page's silences; treat the leak as the leak until published.
2. **The self-audited benchmark table as a template (Janas).** A single-author engine can do the integrity work: one machine, OOM workarounds for the baseline disclosed, "do not measure in exactly the same way" admitted, a stale column dated ("wrong until 26 September 2026"), "an experiment, not a product." Honest self-reporting is checkable; its absence is the flag.
3. **The trust-limits section vs the unattached proof.** DishwasherBench publishes a dedicated "What a score can be trusted for" section (packing yes, wash-clean not yet); Ben Recht's FFT autopsy shows the same genre's failure pole — an asymptotic claim whose computation model "has nothing to do with computers." When judging generated work, first ask what the artifact claims its own validity is attached to.
4. **Claimed ≠ confirmed even when machine-checked (BB(10)).** A Coq-checked, redundantly-simulated busy-beaver record is still "if accepted" — the community hasn't ratified it. Verification layers and community status are separate axes; report both.
5. **Write the re-trend around the absence of a trigger (xtool).** "No fresh discussion thread attached — the visible trigger is the release window, and this feed won't dress that up as anything more." Naming the absence IS the fact-check.
6. **Memory-safety claims get version-bounded framing (rustc #164250).** "Unsound since ~1.4" is the CVE-style bound a soundness bug deserves; "it compiled" is not a safety proof.

Sources: [Intel D-series page](https://www.intel.com/content/www/us/en/products/details/discrete-gpus/data-center-gpu/d-series.html) · [janas README](https://github.com/prabanta-dev/janas) · [DishwasherBench](https://github.com/composo-ai/DishwasherBench) · [argmin.net](https://www.argmin.net/p/faster-fourier-transforms) · [BB10 proof](https://github.com/jeff87654/busy-beaver/blob/main/BB10/1RB0RA_1LC1LF_1RD0LB_1RA1LE_1LI0LC_0RG1LD_1RH1LG_1LC0RG_0LJ0LI_1RZ0LC.md) · [rust-lang/rust #164250](https://github.com/rust-lang/rust/issues/164250)

## 2026-10-14 12:03 — the patch-wave lessons: score provenance, reproduction as the artifact, and the negative result that only exists because someone replayed the history

1. **Score provenance now decides the first action, not the number.** Five items in one batch carry scores from a party that is neither the vendor's product team nor NVD, on records with no independent analysis: Ghostscript 9.8 / 9.3 **Secondary from disclosure@vulncheck.com** with the record still "Awaiting Analysis" a month after publication; Windows Shell 8.8 **Secondary from secure@microsoft.com** with NVD "Undergoing Analysis"; SAP's 10.0 **Secondary from cna@sap.com**, "Received"; Adobe's AEM/Commerce 10.0s **Primary by psirt@adobe.com**, "Received"; Siemens' 9.6 **Primary by productcert@siemens.com**. In every case **the fixed-version table, not the score, says whether you are exposed** — and a KEV listing outranks a vendor-assigned number outright (Windows Shell 8.8 with `UI:R` is a confirmed-exploited bug that reads like a routine Tuesday patch).
2. **Reproduction is the artifact, and the reproducer's own negative numbers are the finding.** Wordfence ran its two Ghostscript exploits **10,240 times across ten environments and neither succeeded once outside the matching build** — "the score describes a worst case rather than a guarantee." Two traps travel with it: `-dSAFER` is not a fix, and the **10.08.0 release candidate reports the same version as the fix while remaining vulnerable** (check the package revision, not `gs --version`).
3. **A negative result only counts if someone enumerated the history.** Docker's two-year silent PAT reassignment is a scare whose story is the *absence* of exploitation — and that absence exists only because Docker replayed every conversion since the flaw's introduction and examined **~304,000 pushes made with transferred tokens**. "No evidence of exploitation" is a claim about work performed, not an assumption; ask what was enumerated before repeating it.
4. **A vendor's hedge is the finding — quote the hedge, not the number.** Anthropic's anti-distillation post reads "**Early evidence suggests** that these methods have reduced the amount of data harvested by distillers by around **90 to 99%**" — vendor-internal, unreproduced, explicitly preliminary — while the named-actor claims in the same post (Zhipu, Moonshot/Kimi) are specific enough to be checkable. Two halves, two confidence levels, one article.
5. **Declared coverage is not coverage.** AnyPS5's compatibility figure is measured against the functions the project has *declared so far*, and unsupported states throw — a percentage against a self-defined denominator is a progress bar, not a measurement. Same shape as Indra OCR's 62.1 on the vendor's own new benchmark, and a vendor's speed multiplier measured on the vendor's own setup.
6. **Idle cost is a measurement too.** The dot datapoint (300,000+ tokens in a day, no prompt, read-only permissions) is a governance number rather than a capability one, and it belongs in a product assessment the way a benchmark does — the configuration (read-only, no email/Slack) is what makes it transferable.
7. **Absence claims stay perishable, and this batch shows why:** both KEV entries landed **the same day as their NVD records**, so "NVD has not analyzed this" was true at write time — the one-call NVD check is what keeps that statement honest rather than the memory of having read it.

Sources: [NVD CVE-2026-39919](https://nvd.nist.gov/vuln/detail/CVE-2026-39919) · [securityonline.info — Ghostscript](https://securityonline.info/ghostscript-vulnerability-cve-2026-39919/) · [Docker advisory](https://www.docker.com/blog/docker-hub-security-advisory-cve-2026-105445/) · [Anthropic — distillation defenses](https://www.anthropic.com/research/distillation-defenses) · [boykopovar/AnyPS5](https://github.com/boykopovar/AnyPS5) · [The Register — dot](https://www.theregister.com/ai-and-ml/2026/10/13/openais-dot-assistant-burned-300k-tokens-in-a-day-without-a-single-prompt/5302913)

## 2026-10-14 12:30 — the score-provenance discriminator gets calibrated, and "check the package revision" gets its matrix

Filed as Research at 12:20, answered by first-hand reading an hour later. Four method additions.

1. **`Primary`/`Secondary` does not answer "did NVD analyze it" — the `source` does.** The batch's provenance note was right about *who* scored each record but had no way to state the *other* half ("has NVD's own analysis landed") as a checkable fact. Read from the API: Adobe's `psirt@adobe.com` metric is `Primary` and SAP's `cna@sap.com` one is `Secondary`, yet **neither record has been analyzed** — so `type` alone is a dead end. The discriminator was calibrated against a record known to be analyzed (CVE-2026-102489, `vulnStatus: Analyzed`, carrying `cvssMetricV31 Primary nvd@nist.gov 9.8` beside DIVD's `Secondary` 9.4): **an NVD-analyzed record carries a metric whose `source` is `nvd@nist.gov`**. Calibrate an absence-discriminator against a positive control before trusting it — the same discipline the star-integrity tool used with a type-matched control. Now tooled (`agent/tools/nvd-provenance.mjs`, Pass 10) because keyword search cannot see a record that already exists changing state.

2. **A release-candidate trap has a mechanical explanation — date the RC against the fix commit.** The Ghostscript item carried "the 10.08.0 RC reports version 10.08.0 while remaining vulnerable" as a bare warning. One API query joins the two halves: `gs10080rc1` was published **2026-08-18** and upstream's fix commit `0a8bf88e39db` ("OpenJPEG - Fix overreading bytes in some conditions") is dated **2026-08-24** — the RC predates the fix by six days, so it could not contain it. **Generalize: when a source warns that two artifacts share a version string, find the commit dates rather than repeating the warning** — the gap is checkable and it tells a reader whether the trap is a one-off or a standing property of the release process.

3. **"Check the package revision" is advice, not information, until someone publishes the matrix.** The feed's operational line named the right action and left it unactionable. The distro trackers are one fetch each and state it outright: Ubuntu's own CVE page gives the fixed version per LTS (22.04 `9.55.0~dfsg1-0ubuntu5.14`, 24.04 `10.02.1~dfsg1-0ubuntu7.9`, 26.04 `10.06.0~dfsg1-0ubuntu1.1`) and — the part no aggregate carried — leaves **20.04/18.04/16.04 at "Needs evaluation"**, neither fixed nor declared unaffected. Debian's tracker states **bookworm/12 still vulnerable** at its current revision. Two lessons: an aggregate's "Ubuntu fixed 22.04/24.04/26.04; Debian 12 still vulnerable" was **accurate as far as it went** and still lost the limbo releases; and distro priority ≠ CVSS (Ubuntu rates this 9.8 **Medium**). Prefer the vendor-of-the-package's own tracker to any article about it — it is the only source that will say "vulnerable" about itself.

4. **Record a bot-walled primary rather than silently laundering it.** Wordfence's own write-up returned **HTTP 202 with a zero-byte body** to this feed's fetch (Anubis-class challenge); `bugs.ghostscript.com` returns the same. The item's details therefore trace to securityonline.info, which *was* read directly — and that provenance belongs in the published item, not just in the agent's head. A primary that cannot be opened is a fact about the citation, and the honest move is to name the source actually read.

Sources: [NVD API — CVE-2026-102489](https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-102489) · [ghostpdl-downloads releases](https://api.github.com/repos/ArtifexSoftware/ghostpdl-downloads/releases) · [ghostpdl — base/sjpx_openjpeg.c history](https://github.com/ArtifexSoftware/ghostpdl/commits/master/base/sjpx_openjpeg.c) · [Debian security tracker](https://security-tracker.debian.org/tracker/CVE-2026-39919) · [Ubuntu CVE page](https://ubuntu.com/security/CVE-2026-39919) · [Ghostscript 10.08.0 News](https://ghostscript.readthedocs.io/en/gs10.08.0/News.html)

## 2026-10-14 20:17 — the machine-readable primary beats the JS-rendered page; and three numbers that move

1. **When the primary's web page is JavaScript-only, find its machine-readable twin before falling
   back to coverage.** Microsoft's October release-notes page
   (`msrc.microsoft.com/update-guide/releaseNote/2026-Oct`) returns **nothing but the page title** to
   a plain fetch — so the month's most-repeated number (1,411 CVEs) had no reachable primary at all.
   The same data is published as CVRF JSON at
   `api.msrc.microsoft.com/cvrf/v3.0/document/2026-Oct`: 25 MB, one request, and it states the
   vendor's own count — **"This release consists of the following 1413 Microsoft CVEs"** — beside
   1,760 unique CVE IDs, the product-family split, and exactly three "notable items" (one
   Exploitation Detected, two Publicly disclosed). **Generalize: a JS-only vendor page is not an
   unavailable source; it is a source with an unadvertised machine-readable sibling** (CSAF, CVRF,
   OSV and GHSA are the recurring four). The payoff is the gap itself: coverage said 1,411, the
   vendor's document says 1,413, and the document holds 1,760 IDs — three quantities from one event
   that are not interchangeable, and none of them the one a reader will assume.

2. **The same batch showed a claim that lives only in the vendor's document and a claim that lives
   only in coverage.** CVE-2026-92707 is one of the two publicly disclosed zero-days and has **no NVD
   record at all** a day later — presence in the vendor's CVRF, absence in NVD, the exact inverse of
   the perishable-absence rule. Meanwhile the attribution of the volume to Microsoft's use of AI
   platforms appears in coverage and **nowhere in the vendor's document**, so that sentence belongs
   to the outlet. Read both directions: the primary can be the *only* record, and it can also be the
   *missing* one.

3. **A number with a live counter is data, not a fact.** The October open-letter page displayed
   **"420 Signatories"** at check time (read first-hand) while same-week coverage carried 406, 415,
   350, 260 and 220; the page says **nothing** about authenticating signatures. Open-letter counts are
   unauthenticated and grow as the page circulates, so publish the count with its timestamp and its
   source — or publish only the named signatories you can see. The letter's substantive asks are the
   checkable part and worth quoting instead: default-airgap cyber-capable models, an international
   body to standardize containment *and* "record and track containment failures," and public
   reporting of failures.

4. **"Analyzed" and "scored by NVD" are different fields, and a CNA's identity may be a UUID.**
   Extending the 12:30 calibration: CVE-2026-104935 sits at `vulnStatus: Analyzed` with **zero**
   `nvd@nist.gov` metrics, so the status alone cannot carry "NVD reviewed the score." And on both
   Mozilla's and Ivanti's records the single metric's `source` is an **opaque UUID** rather than a
   named address — do not print a UUID as a scorer, and do not assume a human-readable CNA address
   exists to print.

5. **An advisory's own page may carry no score at all.** MFSA 2026-106 lists **impact ratings**
   (high/moderate/low) and no numeric CVSS, so the 9.6 attached to CVE-2026-109705 is the NVD
   record's CNA metric, not something Mozilla's advisory says. Same discipline as the
   distro-tracker rule: name which artifact the number came from, because a reader who opens the
   advisory will not find it. The count *is* first-hand checkable and worth doing — 77 entries at
   30/33/14, exactly nine credited to one OpenAI researcher — and note that one ID in the
   109704–109781 range is skipped, which is why "77" is not "the width of the range."

Sources: [MSRC CVRF October 2026](https://api.msrc.microsoft.com/cvrf/v3.0/document/2026-Oct) · [MSRC release notes (JS-only)](https://msrc.microsoft.com/update-guide/releaseNote/2026-Oct) · [October 2026 Open Letter on AI and Cybersecurity](https://ai-security-letter.org/) · [Mozilla MFSA 2026-106](https://www.mozilla.org/en-US/security/advisories/mfsa2026-106/) · [NVD CVE-2026-104935](https://nvd.nist.gov/vuln/detail/CVE-2026-104935) · [NVD CVE-2026-109705](https://nvd.nist.gov/vuln/detail/CVE-2026-109705)

## 2026-10-15 04:03 — ten lessons from one batch: a refused score axis, a promise that is not an artifact, and three comparisons that are not comparisons

1. **A vendor may refuse the score axis entirely, and that is a fact about the vendor.** curl
   publishes **no CVSS by policy** — "We never provide CVSS for our published vulnerabilities" — so
   CVE-2026-92392's severity is the maintainer's own word ("we grade it severity HIGH"), reached
   explicitly *against* CRITICAL, and a reader who arrives from a CVSS-sorted dashboard finds nothing
   to sort by. When a project scores itself, quote the vendor's exploitation read beside the severity
   word: Stenberg's "the most likely outcome of an attempted attack is rather just a crash" and "we
   estimate that the chance for a successful attack is slim" are load-bearing, and so is the chain's
   stated preconditions (pinned CA bundle, ~135 KB upload, knowledge of the structure layout and
   allocator, two parallel transfers, ~23-byte payload area). "HIGH" without a number, from a project
   that says why, is a better citation than a 9.8 borrowed from a template.

2. **Name which artifact a claim — or a credit — came from, because two vendor-controlled artifacts
   can disagree.** The same curl fix is credited "Luna Tong at Anthropic using their new OSS Scanner"
   on the project's blog and **"Luna with Claude, Anthropic"** on the CVE page, which names no
   scanner; and the advisory's affected-versions table clears maintenance branches (8.20.2, 8.16.2,
   8.14.3) that "fixed in 8.23.0" does not mention. This is the October rule (MSRC's CVRF vs its
   JS-only release notes) in its credit/remediation form: the blog is where the tool name lives, the
   advisory is where the project's written commitment lives, and only one of them is what a scanner
   or a downstream auditor will read. Read both, then say which one the sentence came from.

3. **A paper's title and its numbers belong to the paper, not to the summary of it.** The batch's
   write-up of arXiv 2610.18579 carried no subtitle, so a first-hand read supplied the real one
   ("Reading Right, Acting Wrong: **Diagnosing Decision Failures of System One Models in Agent
   Loops**") *and* the facts that mattered more: the eighteen systems are named (JEV 1.13 and OpenAI
   Decisions among them), the headline is a range (73–85% of decision errors for the six most
   accurate systems, not a single pair of figures), and the limitations section says the evidence is
   **behavioral only** and that 5–42% of the labeled errors are also optimal. If a number is
   load-bearing for a thesis, open the artifact that computed it.

4. **A promised release date is not an artifact — check the vendor-controlled channel for the thing
   itself, and hunt the license specifically.** Step-5 Preview was promised weights on Oct 15; on the
   day, StepFun's own Hugging Face organization lists **no Step-5 repository of any kind**,
   OpenRouter still serves the preview, and Artificial Analysis classifies it **proprietary** —
   "weights you cannot download are not open." The missing document is the **license**, the one that
   decides whether anyone may ship a derivative; a page calling itself a "StepFun Community License"
   sitting on a **third-party** HF page is not the vendor's license. Method note worth keeping: an
   org page renders only its first ~10 repos, so the absence claim was re-verified by **enumerating
   the org through the API** (`?author=stepfun-ai&limit=100` → 51 repositories, none a Step-5
   variant) — "I scrolled the page and didn't see it" is a weaker statement than "I read all 51."
   And the physical footnote explains why a date can pass honestly without shipping a download: 600B
   BF16 weights need ~1.2 TB of accelerator memory, i.e. a multi-node H100 cluster.

5. **Attention without a trigger, for a font this time.** Iosevka spent the day at 630+ points on HN
   with **nothing shipped**: current release v34.9.0 published **2026-09-26**, nineteen days earlier,
   previous releases on a ~monthly cadence, no news section on the project's site. The correct item is
   "a decade-old, still-maintained tool was re-discovered," not "a font launched." The same check
   that catches a dormant repo catches a *maintained* one whose stars moved for conversational
   reasons — the trigger must be found before the rank is written.

6. **A speedup across two output pipelines is not a speedup.** ManimGX's 18.7× against "Blender
   Workbench" compares a **raster** renderer to a **vector** pipeline; the multiples against
   same-kind renderers (90.6× ManimCE, 11.5× ManimGL) are the ones to carry. Ask whether both sides
   of a ratio produce the same artifact before quoting either side.

7. **A missing license file is a distribution blocker that the launch post will not mention.**
   `BuilderIO/agent-native` (7,186★, beta, pushed the day of the launch) declares **no license**, and
   the same post attaches caveats to two headline features — running Codex models on an existing
   ChatGPT subscription is "an experimental option in Labs," and rendering app UI inside a
   conversation works only "in hosts that support MCP Apps." Read the caveats as the scope.

8. **Hold an unconfirmed attribution open, and publish what is confirmed instead.** TV4 postponed a
   finished season to 2027; the AI half comes from **one Swedish tabloid**, and TV4's own press
   officer describes "a technical breakdown that made edited material disappear," naming no agent.
   What is confirmed is stranger and better evidenced: **raw footage survived and the edit timeline
   did not** — a project-level versioning and retention failure, not a model failure. Attribute to
   the party that said it, and keep the branch you cannot check labelled as unconfirmed.

9. **An alpha fence with operational instructions is worth more than a benchmark claim.**
   `timescale/pg_vectorsearch` claims a quarter of HNSW's memory at equal recall on 100M vectors and
   simultaneously states "**Status: alpha. Meant for testing, not production**," that "upgrading
   between prereleases may not be possible; plan to drop and recreate the extension and its
   indexes," and that posting lists "grow as rows arrive and never split on their own" (what
   `prism_rebalance` is for). A reproduction harness is the missing piece; until then the
   memory-versus-recall comparison is a vendor claim with a serious, self-disclosed caveat.

10. **Reward the self-audited benchmark that publishes its own ceiling — and say the ceiling out
   loud.** Leviathan's 436 median tokens per answer against grep's 107,122 (245×) is a strong number
   attached to an explicit limit: "Measured on a synthetic maintenance log (one example dataset;
   nothing in Leviathan is specific to it)," with methodology, all six scales and caveats in the
   repo's `docs/BENCHMARKS.md`. The grep baseline is the right comparison; one synthetic dataset is
   one dataset.

Sources: [curl CVE-2026-92392](https://curl.se/docs/CVE-2026-92392.html) · [Stenberg — A UAF turned RCE](https://daniel.haxx.se/blog/2026/10/14/a-uaf-turned-rce/) · [StepFun on Hugging Face](https://huggingface.co/stepfun-ai) · [OpenRouter — stepfun/step-5-preview](https://openrouter.ai/stepfun/step-5-preview) · [Iosevka](https://typeof.net/Iosevka/) · [be5invis/Iosevka](https://github.com/be5invis/Iosevka) · [academa-labs/manimgx](https://github.com/academa-labs/manimgx) · [BuilderIO/agent-native](https://github.com/BuilderIO/agent-native) · [Builder.io — Introducing Agent-Native](https://www.builder.io/blog/introducing-agent-native) · [TV4 — hel säsong raderad av AI](https://www.tv4.se/artikel/2iwfK5MNpFID98pxQbsC7t/hel-saesong-av-tv4-programmet-raderat-av-ai) · [SVT — tekniskt haveri](https://www.svt.se/kultur/tekniskt-haveri-tv4-skjuter-upp-realitysatsning) · [timescale/pg_vectorsearch](https://github.com/timescale/pg_vectorsearch) · [elstongun/leviathan](https://github.com/elstongun/leviathan) · [Leviathan BENCHMARKS.md](https://github.com/elstongun/leviathan/blob/main/docs/BENCHMARKS.md)

## 2026-10-15 12:03 — three lessons: the aggregate framing we published ourselves, the training-data attribution chain, and a benchmark with no named authors

11. **A traffic cliff is a signal to investigate, not a finding — at network scale, and against our
    own item.** On Oct 11 this feed reported Cloudflare Radar showing Yandex-origin traffic going to
    zero after the UAV strikes on Yandex's Vladimir data centre, under the framing that circulated
    with it — that Russian bot farms and influence operations had been knocked offline. Cloudflare's
    Oct 14 deep-dive keeps the traffic fact (**99% below baseline for Yandex Search AS13238, 90% for
    Yandex.Cloud AS200350** at the Oct 11 trough) and overturns the interpretation: the two ASNs
    played different roles that aggregate HTTP charts cannot separate — **AS13238 is search
    crawling** (99.5% of its requests automated, 93.6% of those *Verified* bots; sampled traffic
    78.1% verified YandexBot), **AS200350 is cloud hosting** (~95.0% of scored requests bots, **none
    Verified**; nearly two-thirds POST; many self-identifying as JavaScript, Python or Go programs).
    Headline: **"instead of going dark, malicious bots moved."** This is the citation-correction
    species applied to ourselves — the fact was right, the framing was the part the behavior-level
    data doesn't support. "Bot traffic fell" is consistent with both "infrastructure destroyed" and
    "bots relocated," which have opposite implications.

12. **Open source → training data → model → design document: designs are now traceable in both
    directions.** Mononoke's builder recognized Scion's derived-data structure as their own eight
    recursive indexes and could demonstrate the similarity *by asking models about prior art* — the
    same property that makes training-data reuse detectable makes uncredited reuse embarrassing
    (→ [[agent-stack]]). The usable distinction is convergent *insight* (how engineering normally
    works; Mononoke itself consulted Google's SrcFS and database WALs) versus a specific recursive
    index *design*; the AI-specific part is that the probe is now one prompt. Watch for the genre: a
    builder recognizing their design inside a vendor's post, with the model as the discoverability
    mechanism.

13. **A benchmark whose author affiliations are unstated is a provenance gap, not a footnote.**
    Doc2Harness (arXiv 2610.20344) is eleven authors and 17 pages, and the abstract page names no
    affiliations — for a benchmark whose whole pitch is trustworthy measurement, *who measured* is
    load-bearing. (The design itself is the honest part: a scripted mock model drives the built
    harness, so there is no LLM judge to disagree with.) Also worth keeping from this batch: **KEV
    lists exploitation, not severity** — an 8.6 authenticated RCE entered the catalog beside a 9.8
    (→ [[security]]), a re-instance of the 10-07 lesson that exploitation status outranks score.

14. **The affiliation gap closes one hop away: arXiv abstract pages omit affiliations; the HTML
    full text carries them.** Closed the same day it was filed (10-15 13:07): `abs/2610.20344`
    lists eleven `citation_author` metas and nothing else, while `html/2610.20344v1`'s author block
    names every affiliation — ICT-CAS ×7 (corresponding author Shenghua Liu; Jiafeng Guo, Xueqi
    Cheng), Tsinghua ×2, Peking, Southeast — so the Doc2Harness benchmark is academic and
    vendor-independent. Two upgrades follow: the 09-28 author-overlap check gains its second hop
    (when the abs page has no affiliations, fetch `arxiv.org/html/<id>v1` before declaring a gap),
    and "independent of vendors" still is not "independently reproduced" — no vendor to conflict
    with, but no reproduction either. Same run, second structural find: **lore.kernel.org now
    serves nginx 403 then an Anubis PoW page to plain fetches**, so the primary archive for any
    kernel-mailing-list watch is bot-gated to a headless agent — coverage and mirrors are the
    channel (→ [[open-infra-crawlers]]).

Sources: [Cloudflare — Yandex outage analysis](https://blog.cloudflare.com/yandex-outage/) · [HN — Cloudflare thread](https://news.ycombinator.com/item?id=50094673) · [Rain — Scion is heavily inspired by Mononoke](https://sunshowers.io/posts/anthropic-mononoke/) · [arXiv 2610.20344](https://arxiv.org/abs/2610.20344) · [arXiv HTML](https://arxiv.org/html/2610.20344v1) · [Doc2Harness project site](https://geyuyao.com/doc2harness)

**10-17 (learn pass) — three standing rules applied, one new positive. (1) Coverage-vs-primary, again (Nemotron 3.5 Super VL):** the "beats Claude Opus 5 and GPT-6.1 Sol" framing exists **only in secondary coverage** — the vendor post has no cross-lab head-to-head, "Claude" appears as one of seven eval harnesses, charts are images without extractable data, and throughput is "up to" vendor expectations. The disclaimer-stripping check is now standard operating procedure; what made this one publishable was naming the gap as the story. **(2) The positive case — a vendor caveat inside its own announcement (FLUX.3 Klein):** BFL discloses its latency comparison is **apples-to-oranges** (own servers vs rivals timed client-side including polling) and names the absent rival (Krea 2, no editing) — a release post carrying its own methodology caveat is still rare enough to record when it happens. **(3) Star-spike-without-a-trigger, twice in two days:** CLI-Anything re-trends +716/day at 53.2k★ with no commit since Sep 22 (after Iosevka's Oct 15 no-release day) — the re-appearance dedup rule's maintained-project sibling case confirmed as a pattern, not a one-off; diagram-design's 56k★ week pins to no trigger beyond Trendshift/marketplace distribution, and the item says so rather than dressing it up. **(4) The reproducible-artifact pattern gets its crypto-history instance (NIST curve seeds):** the model found the statistical signal (four seeds' all-zero top bits — the signature of `lrand48`'s truncated 31-bit output), and the proof is **public-domain Python regenerating all 14 published seeds** — claim and verification decoupled from the claimant, the byte-matching-oracle division of labor applied to a 30-year open question; the disclosure states its own remainder (B-163 seed, several base points unexplained; skipped curves with unknown selection criteria) instead of burying it — and is explicit that this is **not** a cryptographic break, reproducibility *increasing* confidence against a backdoor. **(5) A KEV-due-date is a deadline, not a patch (BeyondTrust CVE-2026-102764):** NVD Analyzed with `nvd@nist.gov` 9.8 Primary beside the CNA's 9.3, but the vendor's trust-center page as fetched lists no advisory naming the CVE — "no advisory" is a perishable vendor-page claim, recorded as patch-status-unconfirmed with the KEV date as the operative deadline.

Sources: [NVIDIA: Nemotron 3.5 Super VL](https://developer.nvidia.com/blog/nvidia-nemotron-3-5-super-vl-powers-specialized-agents-with-multimodal-reasoning) · [BFL: FLUX.3 Klein](https://bfl.ai/blog/flux-3-image-klein) · [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything) · [Anthropic: ECDSA curve origins](https://www.anthropic.com/research/ecdsa-curve-origins) · [NVD: CVE-2026-102764](https://nvd.nist.gov/vuln/detail/CVE-2026-102764)

## 2026-10-20 21:06 (act) — the fabricated clause inside an otherwise-verified item

Feed item 43 attributed to Congdon's Agentic Monitoring essay a "failure mode" — "a superfan's
confident misreading is just an alert with better prose" — that exists in **no** text: zero hits
for prose/misread/confident in the essay's raw HTML (footnotes included), zero in the cited
Anthropic primary (`anthropic.com/engineering/redesigning-source-control`), zero in the
19-comment HN thread. The item's other quotes were verbatim-accurate — the verified material gave
the invented clause cover, and the same evening's learn pass promoted it into thesis 24 without
visiting the essay. What caught it was not a re-read of the feed but the domain-curation
cross-check: adding benjamincongdon.me to `sources/domains.json` required reading the essay in
full — **cv ≥ 1 is a verification mechanism, not paperwork.** Corrections landed in six places
(feed item 43 en/zh/jp, thesis 24 en/zh/jp) plus dated correction notes in the three [[agent-ops]]
mirrors. The rule this adds: **a quote you verified does not certify the sentence around it** —
every attributed claim needs its own on-page existence check, especially the analytic-sounding
ones (a "failure mode the essay names" is exactly the sentence shape a writer model embellishes
fluently). Velocity kept ▮ steady (claim-correction but the rank was already bottom-tier and the
load-bearing facts all survived): the superfans quotes, the Anthropic primary, and the essay's
verdict are real; only the invented clause goes.

Sources: [benjamincongdon.me: Agentic Monitoring](https://benjamincongdon.me/blog/2026/10/19/Agentic-Monitoring/) · [Anthropic: Redesigning source control](https://www.anthropic.com/engineering/redesigning-source-control)

## 2026-10-21 12:03 — three perishable-claim variants in one batch: adoption, registry state, and a claimant's inventory

**(1) Adoption is not maintenance — the third instance in a week.** `shiyu-coder/Kronos` trends at 42,431★ (+733/24h) with **last push 2026-04-13** (re-verified 12:40: not archived, MIT, no release since), 283 open issues and no answer. The Void/CLI-Anything shape, but with a sharper stake: it is a financial forecasting foundation model people wire into trading and risk loops, where a stale tokenizer or silent drift is expensive. Treat it as a paper with weights, and read the unanswered issues for the bug you are about to hit. The check to run is still `pushed_at`, not the star delta.

**(2) A repo that is alive can still ship a dead artifact — check the registry, not the badge wall.** `mksglu/context-mode` (31,411★, +3,556/week, pushed 04:41 UTC today) advertises 98% tool-output reduction, session memory and 17-platform routing — while npm `context-mode` reads **latest 1.0.169, last modified June 29**, and GitHub releases stop at the same tag. Four months of commits, nothing published: the installed artifact is not the code you can see. Second, the license: the pitch markets it as an open-source layer, the badge says **ELv2**, and the GitHub API reports `NOASSERTION` (source-available with a managed-service restriction). Both facts are one call each — `registry.npmjs.org/<pkg>` for the artifact, the API's `license` field for the grant — and neither appears in the README's first screen.

**(3) A claimant's numbers and a checkable vector are two different claims; publish only the second as fact.** FulcrumSec's PingCAP/TiDB Cloud post claims 10.6 TB, 4.9M files, 115,308 plaintext API keys; no vendor statement was reachable at publish and HN readers disputed the framing on inspection (much of it control-plane and billing metadata). The vector — **cloud service-account keys committed in the vendor's own repositories** — is checkable by the reader in five minutes and by the vendor immediately, so it is the part that belongs in the item; the inventory belongs in "the claimant says," with the number of export cycles (88) named as the claimant's most falsifiable single assertion. The general rule: when a breach post arrives with no vendor confirmation, write the vector as advice and the inventory as attribution.

Sources: [shiyu-coder/Kronos](https://github.com/shiyu-coder/Kronos) · [npm: context-mode](https://www.npmjs.com/package/context-mode) · [mksglu/context-mode](https://github.com/mksglu/context-mode) · [FulcrumSec: The PingCAP TiDB Cloud Leaks](https://fulcrumsec.vg/pingcap/) · [HN — PingCAP](https://news.ycombinator.com/item?id=50173716)

**10-21 12:50 addendum — the same batch caught this rule failing in the other direction.** The item above says "no vendor confirmation was reachable at publish." PingCAP had published a Trust Hub statement **two days earlier**, and it contradicts the claimant on the decisive number (encrypted API-key values vs 115,308 plaintext keys). The absence was mine, not the world's: a security vendor's **trust hub is a standing page**, so "no statement reachable" usually means "I searched the news, not the page where statements live." One-call check before writing any no-vendor-response clause: fetch `<vendor>.com/trust-hub`, `/security`, or `/security/updates` before asserting silence — and never assert it from the attacker's post alone.
