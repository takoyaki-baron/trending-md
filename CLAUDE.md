# trending.md — Claude Instructions

A dense trending-information feed optimized for agentic web search and human readability.
Canonical content in Markdown (`.md`) files; web view is a styled HTML render. Built by
`build.js`, deployed to Cloudflare Pages.

## Feed generation workflow (3x daily: 04:00 / 12:00 / 20:00)

The feed file `en/feed/YYYY-MM-DD.md` is built up across 3 runs per day.
Each run adds up to 20 new items. Cap is 100 per day per language (safety limit);
the real constraint is **dedup** — only genuinely new stories get added.

### MERGE mode (subsequent runs — file already exists)

When `en/feed/YYYY-MM-DD.md` already exists:
1. **Read existing** `en/feed/YYYY-MM-DD.md` to understand what's already covered
2. **Research** new trending topics from the source list below
3. **Dedup** — skip any topic already covered in the existing file. Each item must be
   genuinely new — different event, different company, different CVE, different repo.
   Do NOT rephrase existing items; only add net-new stories.
4. **If nothing new** — exit cleanly (no edits). Don't force items just to hit a quota.
5. **If new items found** — append them after the last existing item, renumbering
   sequentially (max 100 items total as safety limit; dedup is the real filter).
6. **Re-translate** — update zh/ and jp/ versions to match the expanded en file.
   Translate all items (old + new) to keep the output consistent.
7. **Update indices** — refresh `en/feed/latest.md`, `zh/feed/latest.md`,
   `jp/feed/latest.md`, and all `feed/index.md` + `archive/index.md` if needed.

### FRESH mode (first run of the day — file doesn't exist yet)

When `en/feed/YYYY-MM-DD.md` does NOT exist:
1. **Research** — search across the five tracks below (not just GitHub). Each item must
   link to a primary source (GitHub repo, arXiv, vendor blog, or CVE record) — a balanced
   mix, not all repos.
2. **Write** `en/feed/YYYY-MM-DD.md` with up to 20 items
3. **Translate** to zh/ and jp/
4. **Update** all indices

### Content focus: five balanced tracks

Cover a mix every day; don't let any single track dominate. Each item must link to a primary
source (GitHub repo, arXiv, vendor blog, or CVE record):

1. **AI models & research** — model releases, papers, benchmarks, training/inference techniques.
2. **AI tools & agent infra** — repos + products: agent runtimes, memory, skills, MCP, routing.
3. **Security & CVEs** — new vulnerabilities, exploits, patches; prioritize CVSS ≥9.0 or
   actively-exploited issues.
4. **Developer tools & open-source releases** — trending repos, new libraries/frameworks.
5. **Industry news** — product launches, safety incidents, policy — only when tied to a
   concrete release or a dev-relevant impact.

**Avoid:** pure funding rounds, corporate strategy, non-technical AI policy debates. If a story
has no primary source to cite or no concrete impact, skip it.

### Source validation — VISIT, don't trust aggregates (MANDATORY — 2026-08-12 Void lesson)

**Every cited source MUST be actually visited and validated.** The feed generator's default
behavior was to trust aggregated metrics (star count, trending rank) without opening the
underlying pages — this produced a two-layer false signal in a single item.

**The rule:** before writing a trending item, OPEN and READ:
1. **The repo itself** — README, last commit date, archived flag, maintenance status. Star
   count alone tells you nothing about whether a project is alive, abandoned, or just having
   a viral moment from an old blog post.
2. **Every source link you plan to cite** — click through. Does the page actually contain
   the data point you're attributing to it? A tool's landing page is not a data source. A
   search results page is not a source for a specific fact. If you can't find the data on
   the page, don't cite it.
3. **The trigger, not just the metric** — a repo spikes on trending for a reason (new release?
   HN mention? Twitter thread? blog post?). Find that trigger and write the item around IT,
   not around the number. "X's dormant editor resurfaces after HN mention" is accurate;
   "X rockets to #2 on trending" without context is misleading.
4. **The limitations, not just the result** (added 2026-08-23 — the disclaimer-stripping lesson).
   Read past the abstract or the lede to the caveats, and check whether the framing you are about to
   publish is one the source **explicitly refused**. Vendor posts and research leaderboards are now
   routinely more careful than the coverage of them — NVIDIA's AVO post disclaims the harness-ablation
   reading twice ("should not be interpreted as a direct measurement…", "not… a controlled ablation")
   under a 100.00 headline, and Prime Intellect's Speedrun Frontier publishes the equal-budget column
   that halves its own top score. Both were then reported as the un-caveated claim, once by this feed.
   Cheap checks: grep the page for "not", "should not be interpreted", "does not isolate",
   "limitations", "public set", "we did not"; if the headline is a **delta** (30% → 100), ask whether
   the source claims the delta is attributable — two numbers from different setups are not an ablation.
   **A quotation must be greppable** (added 2026-10-25): a sentence in quotation marks is a claim about bytes
   in the source, so check the string is actually there before publishing — on a JS-rendered page the prose
   lives in the RSC/`__next_f` payload or a Markdown twin (`doc-twin.mjs` reaches both). If it is not there you
   have a paraphrase, and attributing it verbatim is a fabricated quote; the analysis can stand while the
   quotation is replaced (Cerebras' trillion-parameter post was quoted as "an illustrative configuration, not a
   reported end-to-end benchmark" — `end-to-end` appears **0 times** in its 184 KB payload).
   When a caveat exists it belongs in **"Why it matters"**, not only in the body: the analysis line is
   what gets quoted onward.
5. **The whole source, including its own corrections** — a primary source often *fixes* the record that
   aggregators repeat. Hunt.io's CameraSwarm report explicitly flags CVE-2024-39943 as a mislabel
   circulating in coverage; this feed cited it anyway, having read the parts of the report that matched
   the aggregate framing. A source's hedges, corrections and "we could not confirm" paragraphs are its
   highest-value content, because they are the ones no aggregator carries.
6. **Who scored it** — for a CVE, record the scorer with the score. `CVSS 9.0 (CNA-assigned, NVD
   Deferred)` is a materially different statement from `CVSS 9.0 (NVD Analyzed)`, and the two have
   disagreed twice in one week (Oracle WebCenter's CWE, Elementor's Patchstack-assigned 9.0/`AC:H`).
   **"No CVSS published" is a perishable claim — check the NVD record, never coverage** (added
   2026-09-17 after two same-day corrections, telnetd CVE-2026-32746 and Pixel CVE-2026-58704:
   both carried CNA-assigned scores on NVD while the feed asserted absence). Absence asserted from
   an article, a KEV entry, or a joke ("CVSS three squillion") is not absence; NVD enrichment also
   lags record publication, so "no score yet" can invert within days. One-call check before
   publishing any absence claim:
   `curl -s "https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-…"` → look at `metrics`.
   **`Primary`/`Secondary` does not answer "did NVD analyze it" — the source does** (added
   2026-10-14, after one batch carried five CNA-assigned high scores whose records were all still
   unanalyzed). Adobe's `psirt@adobe.com` metric is `Primary` and SAP's `cna@sap.com` one is
   `Secondary`, yet neither record had been analyzed; an NVD-*analyzed* record is *usually*
   recognizable by a metric whose `source` is `nvd@nist.gov` (calibrated first-hand against
   CVE-2026-102489, status `Analyzed`, carrying `cvssMetricV31 Primary nvd@nist.gov 9.8` beside
   DIVD's `Secondary` 9.4).
   **`Analyzed` status does not imply an NVD score — the endorsement case** (added 2026-10-16,
   CVE-2026-96951: status flipped to `Analyzed` with Microsoft's `Secondary` 8.8 as the **sole**
   metric — NVD analyzed and endorsed the CNA's score without publishing its own; "recognized by
   the metric" alone would have misread it as unanalyzed, and "0 NVD metrics" on an `Analyzed`
   record means endorsement, not neglect. First seen 2026-10-14 on CVE-2026-104935 and recorded
   only as a knowledge-file lesson while rule 6 kept the universal claim — promote the
   counterexample into the rule the day you see it, not two days later). `vulnStatus` answers "did NVD analyze it"; the
   `nvd@nist.gov` metric answers "did NVD publish its own score" — two different questions,
   check both before writing either "CNA-assigned" or "NVD Analyzed".
   **A missing score can be POLICY, not absence — name whose policy** (added 2026-10-15 after the
   curl item: the project's own `VULN-DISCLOSURE-POLICY.md` says "We do not support CVSS … We
   believe CVSS is a broken system", so "no CVSS for this CVE" and "no CVSS has been assigned yet"
   look identical in a table and are different sentences). Score provenance has **five** cases, and
   every item must say which one it is in: **(1)** CNA-assigned, **(2)** NVD-analyzed, **(3)** no
   score **by design** — the policy is documented by **curl** (`curl/curl`
   `docs/VULN-DISCLOSURE-POLICY.md`, four levels Low→Critical) and **Go** (`go.dev/doc/security/policy`:
   "when issuing CVEs for Go security issues we do not assign CVSS scores"), **(4)** scored by a
   third party the code's owner **disowns** — Go states MITRE/NVD "may assign CVSS scores to our
   vulnerabilities, but we do not endorse these scores as accurate reflections of their impact", so
   a number on the record is not an endorsement by the party that knows the code. The kernel-CNA
   half of the same claim is **third-party only** (Stenberg, quoted in The Register): the kernel's
   own `Documentation/process/cve.rst` contains no CVSS statement at all — cite it as "reported by
   Stenberg", never as "the kernel's policy". **(5)** scored by a **third-party enrichment
   container** — CISA's ADP (`CISA-ADP Vulnrichment`, orgId `134c704f-9b21-4f2e-91b3-4a467353bcc0`)
   writes CVSS *and* SSVC into the CVE record itself, so NVD's API shows a `Secondary` metric while
   NVD sits at `Awaiting Analysis` and the CNA publishes nothing: Apache's October Tomcat advisory
   rates its entries with the word "Important" and contains no CVSS string at all (verified
   2026-10-21 — 0 occurrences of "CVSS"), yet all three Important records carry a 9.1 whose source
   is the ADP and whose SSVC says `role: CISA Coordinator`, `Exploitation: none`, `Automatable: yes`.
   Name it as **CISA-ADP**, never "NVD" and never the vendor; the enrichment is a third party's
   assessment, and it is the case where the record's own `Secondary` label is not the CNA's.
   One-call form for an item in hand — prints status,
   every metric's (version, type, source, score), CWE, KEV:
   `node agent/tools/nvd-provenance.mjs --ids CVE-…,CVE-…`
   **Case (5) is measured, not anecdotal** (added 2026-10-21, after the Tomcat trio became the rule):
   `node agent/tools/provenance-census.mjs --from YYYY-MM-DD --to YYYY-MM-DD` pages NVD's
   publication window and counts who wrote each record's number — ~**8.4% of 1,412 records published
   Oct 15–21 carried an `adpOnly` score** (per-day 3.2%–21.2%), concentrated in CNAs with no CVSS
   practice (FreeBSD, Chrome's CVE admin, MITRE, WPScan, Eclipse, Apache). Two consequences for
   writing: **(a)** a number on such a record is CISA's, so name the ADP — never "NVD", never the
   vendor; **(b)** the class is **layered**, not temporary: NVD does eventually analyze some of these
   and **leaves the ADP metric in place** (CVE-2026-101307, `Analyzed`: `nvd@nist.gov` v3.1 9.1
   beside the ADP's v4.0 8.2) — so when both exist, quote both with their CVSS versions instead of
   replacing one with the other. Census cohorts are *publication-day* snapshots (analysis lands
   later), so read the `nvd` row as latency, not as NVD's steady-state coverage.
   A **standing** per-CVE watch (Pass 10 of `agent-run.sh`, `agent/tools/nvd-provenance.json`)
   reports only movement — status flips, an `nvd@nist.gov` metric appearing, a score revision, a
   KEV add — because keyword search cannot see a record that already exists changing state.
   **"This record states no affected range" is a claim about a FIELD, and the record has two —
   `configurations` is NVD's analysis output, `affected[]` is the CNA's own statement** (added
   2026-10-25 04:32, the open62541 lesson). `CVE-2026-116014` was published as a "structurally
   range-less `Received` record" whose range lived in one prose sentence; it had carried
   `{version: "1.5.0", lessThan: "1.5.7", status: "affected"}` in `affected[]` from publication, and
   the tool read only `configurations`. Measured over the 2026-10-18→24 publication week (**4,624**
   records): `configurations` is present on **408/408** `Analyzed`+`Modified` records and on
   **0/4,097** of every other status, so its absence marks **"not yet analysed"**, never "says
   nothing"; `affected[]` is present on **4,505/4,624 (97.4%)** and on every non-`Rejected` record
   that names a product. The residue is 160 records — 119 `Rejected` (no product by definition), 29
   that name a product with no versions (the Red Hat `secalert@` shape, range in the vendor's own
   advisory), 12 that list only *unaffected* versions — and the prose parser rescues **1 of 4,624
   (0.02%)**. So quote which field you read, and never turn one field's absence into a statement
   about the record. CVE 5.x semantics the quote must survive: `lessThan` is **exclusive**,
   `lessThanOrEqual` inclusive; a bare `version` is a **point**, not `[v, ∞)`; `version: "0"`/`"*"`
   is a **null minimum**. One call:
   `node agent/tools/disclosure-lag.mjs --range-census --from YYYY-MM-DD --to YYYY-MM-DD` prints the
   table above for any window (re-run it — analysis lands later and the top row moves).
   **An identifier list is a SET, a range is an assumption, and "CVE-X to CVE-Y" is not a citation**
   (added 2026-10-25 20:30, the HPE ArubaOS eighth row). Coverage printed a "maximum severity" table of
   eight consecutive IDs, `CVE-2026-79844`…`-79851`; one of them, `-79845`, is `VulDB`'s SQL injection in
   an unrelated PHP app. **No ID can be claimed by two CNAs** — the registry is one namespace with a single
   `assignerShortName` per record — so what failed was the *range*, not the registry, and the feed's
   "collision" framing was wrong (corrected in place). The mechanism is visible only in cveawg, because
   NVD carries no `dateReserved`: HPE's `-79835`–`-79844` share one reservation stamp to the millisecond
   (14:47:15.581–.582Z), VulDB reserved `-79845` at **14:47:17.838Z**, and HPE's next batch
   (`-79846`–`-79855`) starts at **14:47:27.562Z** — the pool hands out the lowest free IDs per request,
   so **one foreign reservation splits a vendor's block and strands a one-ID island**. Measured on the
   bulletin itself: its 71 records form **4 runs** (`{79844} 79846–79895 79955–79956 95704–95721`),
   **0.45% density** over 15,878 ID values, **7** at 10.0 — not eight. And the eighth row's *vulnerability*
   is real, at `CVE-2026-79873` (**9.3**, `AV:ADJACENT_NETWORK`, `baseSeverity: CRITICAL`): so "eight
   maximum-severity" is a **label** count (Critical = 9.0–10.0) while "seven 10.0s" is a **score** count,
   and the only error in the table was the ID. Quote a count and an assigner, never a span; when a vendor
   document's number and the registry's disagree, ask whether the vendor counted a label. One call:
   `node agent/tools/cve-id-neighbours.mjs --ids CVE-…[,CVE-…] | --around CVE-… --span N |
   --ref <bulletin-id> --from YYYY-MM-DD --to YYYY-MM-DD` → per ID: assigner, **reservation stamp**,
   publication, product, score; then runs, foreign owners and the reservation batches that explain the gap.
   **A record's `published` date is a WORKFLOW timestamp, not the event's date — check the fix
   release before writing "new"** (added 2026-10-22, the vLLM / Vibe-Trading / Trigger.dev batch).
   `published` is when the assignment finished, and the gap runs both ways: vLLM's seven CVEs
   published Oct 21 were fixed in **0.31.0 on Oct 5 (16 days earlier)**, Vibe-Trading's fix is
   **168 days** older than its record, Trigger.dev's 29-CVE block maps onto repo advisories dated
   **Jul 9 – Oct 20**, Vyper publishes **no repaired release at all**, and six `ZDI-CAN` kernel
   reports have no CVE id to look up. Sorting by publication date reports a platform "under
   attack" on the day its paperwork was filed. One-call check before publishing any "newly
   disclosed / just patched / still unpatched" framing:
   `node agent/tools/disclosure-lag.mjs --ids CVE-… --pypi <pkg>` or `--repo owner/repo` →
   joins NVD's `published`, the advisory's affected/patched range, and the release timeline into
   one of eight states (`fix-then-record` / `fix-predates-record` / `record-then-fix` /
   `backfill` / `no-fix` / `no-record` / `pre-record` / `indeterminate`); `--tracker ZDI-CAN-…`
   covers the no-CVE case. Three traps the calibration put into the tool, each of which had
   already produced a wrong number by hand: **NVD omits the `Z`** on `published` (parse it as
   host-local and a UTC+8 host shifts every lag by a day — 15 vs 16 for vLLM); GitHub's advisory
   cells use a **second, interval syntax** (`[,2.5.303), [3.0,3.1.9)`, patched `2.5.303, 3.1.9`)
   for multi-branch fixes, which a comparison-only parser reads as "no range"; and the cells can
   **contradict the advisory's own title** — Trigger.dev's read `<= 4.6.0` / `>= 4.6.0` (both
   true at 4.6.0) while the summary says "through 4.7.6", so trusting the cell yields a 36-day
   lag for a fix that actually landed **one day after** the record. When the two disagree, say
   so; never silently pick one. **`no record` is perishable like every other absence** — both
   negatives this tool was filed against (`CVE-2026-92707`, `CVE-2026-110264`) acquired NVD
   records within days, so re-run before quoting one.
   **"Patched" is a claim about an artifact, and the record, the commit and the thing a consumer
   installs are three different objects** (added 2026-10-23, the EDK2 lesson). Every state above
   is *temporal*; none answers "can I install the fix". EDK2's 9.5 pre-boot RCE has PR **#13302**
   merged 2026-10-15 while its own advisory cell reads `Patched versions: Not patched currently`,
   because firmware images are built and signed downstream of the repo — permanent for the
   installed base, not pending. Add
   **`--artifact commit|package|firmware|image`** to the same call: it prints the advisory's
   patched cell **verbatim** beside the derived state and emits **`fix-in-source-no-artifact`**
   when the fix is newer than the newest release that could carry it; `--fix-ref <commit|pull url>`
   or `--debian <srcpkg>` supplies the fix's date (the Debian tracker's own `Fixed by:` links are
   the cheapest route, and `--debian` also prints per-suite installable status, which is what
   settles "is the released code affected"). Three traps, each measured: an **`as of <date>`**
   affected cell is a *reporting* date, not an introduction date — EDK2's "master as of
   2026-09-14" looks like it excludes the August tag, and Debian's tracker is what proves that
   release is vulnerable, so an older artifact is **not** thereby clean; a **multi-line advisory
   renders one `div` per line** and a cell reader that takes the first silently truncates three
   ranges to one; and a **self-contradictory cell must refuse** rather than derive a lag (the
   tool now returns `indeterminate`, not Trigger.dev's known-wrong 36 days). Two degraded-mode
   facts also belong here: when `api.github.com` rate-limits, the release timeline comes from
   `releases.atom` (no auth) and a named fix version missing from it is checked on its own tag
   page before "absent" is written; and **the advisory a CVE is filed against is not always in
   the owning repo** — Keycloak's lives only in the GitHub Advisory Database
   (`/advisories/GHSA-…`) with no NVD reference to it.
   **Every verdict above rests on a version range, and the range has a provenance of its own**
   (added 2026-10-24 12:38). `--census` tallies where each range came from — `nvd-cpe`,
   `vendor-advisory` (the page the record links), `advisory-db` (a third party's ingest),
   `advisory-api` (`api.github.com`, quota-bearing), `record-prose` (parsed from a sentence),
   `operator-supplied` (`--range`) — and then **re-runs the same IDs with `api.github.com`
   deliberately unavailable**, reusing the NVD records so the second pass costs no NVD budget.
   Measured on the 10-23 four: Keycloak's range moves `advisory-api → advisory-db` (same
   `indeterminate`, different provenance) and **Trigger.dev's verdict moves `record-then-fix →
   indeterminate`** — its rescue bound lives only in the advisory object. So: **a verdict that flips
   on an hourly quota is not a check** — name it, or pin `--range` and say you did.
   `node agent/tools/disclosure-lag.mjs --ids … --census` (add `--no-github` when the quota really is
   gone).
   **The fourth document is the ANNOUNCEMENT, and it is often the only one in the consumer's
   unit** (added 2026-10-24, the OpenWrt odhcpd lesson). On CVE-2026-53921 four artifacts gave
   four answers: the GHSA cell read `Patched versions: None`; the record's prose said "patched in
   version 25.12" (a *branch*, not a point release); the component repo's `openwrt-24.10` branch
   contained **none** of the fixes because 24.10 ships them as **patch files 0030/0031/0033** in
   `openwrt/openwrt` over a source pinned at `b14cf98c` (2025-10-02); and the release notes named
   **24.10.8 and 25.12.5**. One call:
   `node agent/tools/disclosure-lag.mjs --ids CVE-… --release-notes <url>[,<url>…]` → per page:
   does it name the CVE, which release, the date, the revision, the series' own EoL statement, and
   the count of sibling fixes it labels "no CVE"; emits
   **`advisory-none-but-notes-name-it`** only when the cell names no patched version and an
   announcement names the CVE (`notes-do-not-name-it` never clears a record — EDK2 must stay
   `fix-in-source-no-artifact`). Four traps, each measured: **a series is not its endpoints** —
   "no 25.12 note mentions it" was checked against 25.12.0 and 25.12.6, and the fix is in 25.12.5,
   so "upgrade to <line>" needs a **patch level**; **branch reachability and artifact contents are
   different repositories**, so check the patch directory before calling a backport absent; **a
   commit count is not a fix count** (cherry-picks double it — the record's "6 references" were
   three fixes × two branches) and **a "no CVE" count is not a bug count** (`03dacc233` repairs a
   regression `0320032ae` introduced 3h39m earlier, so a fix-of-the-fix appears as its own
   entry); and **the page's version is its `<title>` or a banner beside its own revision id, never
   a number in the body** (a body scan reported EDK2's release as "3.5.1" from a release-index
   row).
   **"Scanners can't see this yet" is perishable, and its unit is the PACKAGE record, not the CVE**
   (added 2026-10-24 12:38, after Aikido's claim inverted inside a day). A CVE's OSV entry is a
   pointer: `GET /v1/vulns/CVE-…` returns `affected: [{ranges:[{type:'GIT'}]}]` and lists
   `PYSEC-…`/`GHSA-…` in `aliases`, and **an alias is not a mapping** — a scanner querying
   `package@version` needs the GHSA/PYSEC/RUSTSEC record, which is a second lookup. Two consequences
   for writing: quote the package record and its `published` (not `modified`, not
   `github_reviewed_at`, which on Brotli's GHSA trailed `published` by a day and a half), and treat
   "no mapping" as an instant, not a state. Also **a FIXED version returns zero records**, which is
   not a mapping gap — check an affected version before concluding anything. One call:
   `node agent/tools/osv-lag.mjs --ids CVE-…[,CVE-…] [--census]` (lag = OSV package record
   `published` − NVD record `published`, five states) or `--pkg <name> --ecosystem PyPI --version
   X.Y.Z --cve CVE-…` for the scanner's own question. PYSEC timestamps are midnight-truncated, so
   the tool labels day-granular rows rather than implying a sub-day lag.
   **Package-registry state is perishable the same way** (added 2026-09-26, GHAPPIER follow-up):
   "unpublished", "removed", "still downloadable" and "no advisory" for a cited npm/PyPI package
   are version-presence claims that invert without notice — a backdoored version can be
   unpublished by an unknown party and can legally be republished (registries have no republish
   guard). One-call check before publishing any version-presence claim:
   `curl -s "https://registry.npmjs.org/<pkg>"` → look at `versions` + `dist-tags.latest`.
   Record *who* unpublished/removed as unconfirmed unless a source states it.
   **Repo-state is perishable the same way — and the CVE record can't tell you** (added 2026-09-27,
   Flowise follow-up): "no patched release", "no upgrade path", and "still maintained" are claims
   about a living repo, and the repo can be dead while the CVE record is fresh — Flowise's two 9.2
   SSO-takeover CVEs published Sep 26 against a repo archived read-only Aug 13 (the NVD check was
   done — both scores carried, correctly attributed — the repo was not; the Void lesson recurring
   because CVE items gravitate to the NVD record and skip the repo). One-call check before
   publishing any "no patched release / no upgrade path / unpatched" claim:
   `curl -s "https://api.github.com/repos/OWNER/REPO"` → look at `archived`, `pushed_at`
   (plus the latest release tag). An archived repo makes "unpatched" **permanent**, not pending —
   different story, different advice (migrate/fork, not wait for a fix).
   **Artifact state is perishable too, and "signed" is three different claims** (added 2026-10-22,
   LiteLLM follow-up): *signed* (bytes → a key), *attested* (digest → **repository + workflow**), and
   *revision-bound* (artifact → **a commit**) are separate statements with separate checks, and only
   the third answers "is this the code that was reviewed." One-call check before publishing any
   "signed / verified / provenance / unattested" claim:
   `node agent/tools/artifact-provenance.mjs --pypi <pkg>` or `--npm <pkg>` → prints the class,
   publisher, and whether a revision is bound. Two traps calibrated first-hand (2026-10-22):
   `/pypi/<pkg>/json`'s `provenance` field reads **null even for attested files** (use the Integrity
   endpoint, `pypi.org/integrity/<pkg>/<ver>/<file>/provenance`), and a PEP 740 publish attestation
   carries **no commit** — so it would not catch a tag/sdist version skew, while SLSA provenance on a
   container image does name the source revision (LiteLLM's named `Berri-AI/litellm@20535d8f` and
   nothing consumed it). Absence is perishable like "unpublished": re-run, and record the version.

   **Trust-store state is perishable, and a CA item must say WHICH store claims what** (added
   2026-10-22, the eMudhra `--emudhra` matrix). "Distrusted", "blocked", "still trusted", "no
   longer in the bundle" are claims about a **specific store snapshot**, not about the CA: Mozilla's
   root program, the certifi bundle, curl.se's bundle, the macOS keychain, Java `cacerts` and
   Homebrew's bundle disagree with each other *right now*, and each changes on its own cadence.
   Measured 2026-10-22: for the compromised eMudhra chain, `emSign ECC Root CA - G3` is anchored in
   **macOS + Java** and absent from Mozilla/certifi/curl, while `AAA Certificate Services` is in
   **Mozilla's program, macOS and Java** but absent from **certifi and curl** — the Mozilla-*derived*
   bundles are stricter than the program they derive from. The consequence for writing: "the
   blocklist reaches browsers, not libraries" was **backwards** on macOS, where curl, Node, Java and
   Python all accepted a leaf forged with the leaked `d = 4` key while certifi/curl-bundle stacks
   rejected it. So **cut by trust source (OS/vendor store vs pinned bundle), never by species
   (browser vs library)**. One-call check before publishing any trust claim:
   `node agent/tools/trust-store-check.mjs --cert <pem> | --chain <pem> | --sha256 <hex>` → prints
   ANCHOR/absent/unavailable per store (mozilla, certifi, curl, macos, java, linux) plus store
   sizes. Presence ≠ safety and absence ≠ compromise: a present anchor means the store will
   validate *any* leaf chaining to that CA; the leaked key is what turns it into a forgery. Local
   stores are host-specific — report the set you measured. `--demo` prints the mint-and-handshake
   recipe when the question is which store a *process* loaded rather than what a bundle contains.

   **"Independently reproduced/verified" is a claim about who did the work — check the author
   list** (added 2026-09-28, hindsight follow-up): reproduction by a university or newsroom is
   only independent if the reproducers have no co-development tie to the vendor, and the fastest
   way to check is the cited paper's own author list — hindsight's README credited "independent
   reproduction" to Virginia Tech's Sanghani Center and The Washington Post, but arXiv 2512.12818
   lists two Sanghani faculty (Wang, Ramakrishnan) among its seven authors and the Post is a named
   development collaborator; the vendor's own word was "research collaborators." Co-developing
   institutions are more than self-report but not third-party — cite as "reproduced by the
   collaborating labs." One-call check before publishing any independent-verification claim:
   `curl -s "https://arxiv.org/abs/<id>"` (or the paper's page) → compare authors against the
   vendor's team; also check the *metric* — a claimed number may not be the same metric other
   systems report (accuracy vs recall@5), making cross-system "SOTA" comparisons incoherent.
   **The affiliation gap closes one hop away** (added 2026-10-15, Doc2Harness): arXiv abstract
   pages list authors WITHOUT affiliations; the HTML full text carries them — when the abs page
   has none, fetch `https://arxiv.org/html/<id>v1` and read the author block before writing
   "unaffiliated/unstated." An affiliation-less abs page is a closable gap, not a finding.

7. **A JS-only vendor page has a machine-readable twin — find it, name it, and read the CNA field
   inside it** (added 2026-10-14, the October Patch Tuesday CVRF read; extended same day). Microsoft's
   Security Update Guide release-notes page returns **nothing but its title** to a plain fetch, which
   is how the month's most-copied number (1,411 CVEs) came to have no reachable primary at all — while
   the same data sits one request away as **CVRF 1.1 XML** (not JSON), where the vendor's own notes
   head "This release consists of the following **1413** Microsoft CVEs" beside **1,760** unique CVE
   IDs. Check the machine-readable sibling before quoting an aggregator's count. Calibrated endpoints
   and the "what a number from it means" column now live in **`agent/tools/vendor-advisory.mjs`**
   (`--vendors` prints the registry; Microsoft CVRF, Red Hat CSAF v2 + change feed, and Cisco's
   publication service are calibrated — Mozilla and Adobe are recorded *negatives*, no twin located).
   **Name which artifact a number came from**, because the vendor document carries three independent
   measurements that are routinely conflated: its own note count (1,413, = inclusion in the release),
   its CVSS 3.1 base scores (**exactly 162** CVEs at ≥ 9.0, computed first-hand over 1,679 scored
   records), and its own qualitative `Type="Severity"` label (**174** CVEs at Critical) — a label is
   *not* a CVSS threshold, and "70 Critical" is a release-note subset, not the document.
   **The field no aggregator carries is `Type="CNA"`** — a per-entry note naming the party that
   *assigned* the ID, which is not always the vendor publishing the document: **343 of the 1,760**
   October entries are assigned by 17 other CNAs (Linux 172, apache 80, mitre 30, GitHub_M 14 …), so a
   Patch Tuesday list is not a list of that vendor's CVEs. Cross-validated first-hand: the CVRF's CNA
   equals the CVE Program's `assignerShortName` on 11 of 11 sampled IDs across 11 CNAs. **This settles
   "the primary can also be the only record":** CVE-2026-92707 appeared in no registry at all on
   10-14 (no NVD, no cveawg, no GHSA) — and the vendor document itself said why, `CNA = GitHub_M`,
   so the pending party was GitHub, not NVD. **That prediction resolved on 10-15:** the record is
   now `PUBLISHED` with `assignerShortName: GitHub_M` (cveawg, checked 10-22), and NVD published it
   the same day beside a repo advisory dated **Sep 17** — a 28-day backfill, which is what
   `disclosure-lag.mjs --ids CVE-2026-92707 --repo MessagePack-CSharp/MessagePack-CSharp` prints.
   The rule earned its keep by naming the party and the date; the *example* is expired, so do not
   quote it as a live absence. One call for that whole question:
   `node agent/tools/vendor-advisory.mjs --cve CVE-… --cna-doc <cvrf url|path>`. The recurring four
   formats are **CSAF, CVRF, OSV, GHSA**; a vendor document is also the place to check what it
   *doesn't* carry — Microsoft's October CVRF omits an `Exploit Status` on 341 of its 1,760 records,
   so "no exploitation reported" is not the same claim as "assessed as not exploited".
   **The URL-shaped half is now a tool too** (added 2026-10-23, after one batch produced four
   different shapes): `vendor-advisory.mjs` owns the *CVE*-shaped twins (a known endpoint per
   vendor), while any ordinary page needs the sibling *derived from the URL*.
   `node agent/tools/doc-twin.mjs --probe <url> [<url> …]` prints one of five verdicts —
   `twin found (url)` / `plain HTML ok` / `JS gate (marker)` / `JS shell (script %)` / `no twin` —
   plus every candidate it tried (`path.md`, `index.md`, `?format=md`, `?format=json`, root and
   first-segment `llms.txt`, `rel=alternate` markdown links) with each one's status and size.
   Four judgement calls it encodes, each a hand-made mistake first: **(a) a 200 is not a twin** —
   SPA catch-alls answer `200 text/html` for any `.md` path, so a candidate only counts if its body
   is not HTML and not byte-identical to the page; **(b) a redirect is not a miss** —
   `modelcontextprotocol.io/docs/…/intro.md` 307s to a versioned path, and the *final* URL is the
   one to cite; **(c) a gate is a third state** — not present, not absent, **unreadable**: bleepingcomputer
   served a Cloudflare "Just a moment…" 403 and a full 200 HTML minutes apart, so "I could not read
   it" and "it does not say that" are different sentences and only the second is a finding;
   **(d) an index is not a twin** — a 728 KB `llms.txt` on onamae.com is the site's index, not that
   page's content, so report it as the citation fallback rather than as the page's Markdown twin.
   Re-probe before publishing any "the docs say" claim: twins are site configuration and gates are
   per-request.

8. **"Released today" is a claim about three artifacts, and the newsroom default is to read the wrong
   one.** (added 2026-10-24, the impeccable lesson.) The feed wrote that `pbakaus/impeccable`'s `4.7.1`
   was "released 2026-10-24T01:46Z" with "62 detector rules". There is no `skill-v4.7.1` tag and no
   4.7.1 on npm; the highest release is `skill-v4.7.0` (2026-10-19T17:52Z), `npm latest` is **4.7.0**,
   that tag's README says **61**, and 4.7.1 exists only in `main`'s `package.json` — while the vendor's
   own changelog page carries a "Skill v4.7.1, October 23, 2026" entry. So **docs-ahead-of-release is the
   shape most likely to be published as a release**, and a count copied from a README is a claim about a
   branch. Keep the three axes separate — **manifest** (default-branch `package.json`/`Cargo.toml`/
   `pyproject.toml`), **release** (the tag/release page), **registry** (`npm`/`PyPI` `latest`) — and a
   version is only "shipped" when release and registry agree. One call:
   `node agent/tools/release-drift.mjs --repos owner/repo[,owner/repo…] [--npm owner/repo=pkg] [--pypi owner/repo=pkg] [--claim "detector rules"] [--census]`
   → per repo: manifest/release/registry + the numeric claim on `main` vs the highest release tag, then a
   verdict (`in-sync` / `manifest-ahead` / `manifest-behind` / `registry-lags-release` / `registry-ahead-of-tags` /
   `release-no-registry` / `no-release` / `name-collision` / `registry-unrelated` / `manifest-name-mismatch` /
   `no-manifest` / `unreadable`). Costs **zero** `api.github.com` calls: raw.githubusercontent,
   `releases.atom`, `registry.npmjs.org` and `pypi.org` are unmetered (the summary prints the API count).
   **Six traps, each measured while calibrating it:** **(a) the newest tag is not the newest version, and
   a monorepo has several version lines** — impeccable's newest release is `engine-v0.1.17` while the
   skill/CLI lines are `4.7.0`, so versions are compared per component (`engine` / `skill` / `cli`) and
   the registry against the maximum; **(b) a registry name is not a repo name** — `npm hallmark` is
   `vweevers/hallmark`, `postiz` is `postiz-agent`, `rqlite` is `like/rqlite-runtime`, `dagger` is
   `kuym/dagger`, so compare the registry record's own `repository` field (PyPI: `project_urls`) before
   comparing versions; **(c) a renamed repo's metadata keeps the old slug** — `npm ruflo` →
   `ruvnet/claude-flow`, which 301s to `ruvnet/ruflo`, so follow the redirect before calling a collision;
   **(d) a name-only registry package is not a release channel** — `npm wasmtime` is `0.0.2` with no
   repository field against a `50.0.0` project, so a major-version gap with no provenance is
   `registry-unrelated`, not "the registry lags"; **(e) a manifest version can be a placeholder** —
   `gitroomhq/postiz-app`'s `package.json` says `gitroom 1.0.0` beside `v2.25.2` releases; **(f) `no
   release` is a state** — `Nutlope/hallmark` publishes no releases at all, so `main` is the only
   release. **Measured on the 20:13 batch's 20 repos: only 3 (15%) had all three artifacts agreeing; 7
   (35%) had their name taken on npm/PyPI by another project or by a stub; 5 (25%) publish no registry
   artifact at all; and exactly 1 of the batch's "fresh release" triggers was unreleased code** — the one
   the feed got wrong. Before writing any "released / ships N / vX.Y.Z today": run it, quote the artifact
   the claim is about, and if the release is announced but untagged, say **announced, not released**.
   **A raw patch URL is an artifact too, and its date is TWO clocks or none** (added 2026-10-25 12:33,
   the Unitree `.upk`). `CVE-2026-115995`'s only `patch` reference is a 341 MB firmware blob whose entire
   version metadata is a filename; the date lives in a trailing epoch (`…_1761128358872` →
   `2025-10-22T10:19:18Z`) *and* in the object's `Last-Modified` (`11:39:21 GMT`), **1.3h apart**. One
   clock in a filename is a guess; two agreeing is a measurement; beyond **48h** the two describe
   different events and the answer is "no date", never an average. So a fix date for a binary is never
   quoted from a filename alone. `node agent/tools/disclosure-lag.mjs --ids CVE-… --artifact firmware
   --fix-ref <url>` now reads it and emits `fix-predates-record` from the artifact when the artifact is
   older than the record — 367d for Unitree, the largest in the library. Trap: a version is not an epoch
   (plausibility window 2001–2100), and the version must be read *after* the epoch is stripped, or
   `package_1.1.11.5_…_1761128358872.upk` reports the epoch as its version.

9. **A claim's UNIT is checked by a tool, not by a rule — because a rule in prose does not fire at
   generation time.** (added 2026-10-26.) Two units were written into this file *and* into the
   knowledge library on 10-25, and both recurred in the very next batch: `open_issues_count` is
   issues **+ PRs** (recurred as Orca's 8,538 = 4,379 issues + 4,159 PRs), and `Primary`/`Secondary`
   is a slot, not a provenance (recurred as one CNA's two CVSS versions read as two parties, and as
   "9.1 (CVSS 3.1)" where 9.1 was the **4.0** score). So the rule is now a command that runs on every
   batch *before the commit*, and its findings are handed to the act pass:
   `node agent/tools/claim-unit-lint.mjs --file en/feed/YYYY-MM-DD.md --out agent/data/claim-unit-YYYY-MM-DD.json`
   (wired into `generate-feed.sh` after `feed-stamp.mjs`). Four checks, each a unit that has produced
   a wrong sentence here: **issues** (unsplit counter, and arithmetic when a composite is quoted
   beside its parts — the composite is a *cached* counter and lagged them on free-my-tv, 77 vs
   21+58); **cvss** (every score/version pair against the NVD record — `version-swapped`,
   `version-absent`, `score-mismatch`; `slot-quoted` is advisory, and it is **suppressed when the same
   sentence says the slot is a slot** — "`Primary`/`Secondary` is a slot position, not a provenance" is the
   correction being quoted, not the mistake, and three such items fired on the 10-26 20:34 batch); **repo** (`archived`, `stale` past
   `--stale-days`, and `stargazers_count` drifting >10% from the quoted number); **count** (a number
   about the artifact, read against the artifact — `differs` prints the README's own count, `absent`
   means the page states none, which is how the impeccable 62-vs-61 and the 10-26 "17 harnesses"
   title were caught). **A count is read against every page the item cites, in three spellings**
   (added 2026-10-26 20:47, after the check produced two false findings on one batch): `31,132-skill
   analyzed subset` is the same claim as `31,132 skills` and used to be invisible (SkillSpector's
   correct number read as `differs`), while a count quoted from the cited page rather than the named
   repo — item 43's **1,251 skills**, which is the arXiv abstract's own sentence — came back
   `absent`. Now the item's **cited pages** (arXiv `abs/`, HF dataset cards, max 3, cached) are read
   before any `absent`, `ok-cited-page` names the page that carries the number, and `absent` names
   every page read plus whether any was unreadable, because **unread is not absent**.
   One NVD request per feed: `cveId` accepts a comma-separated list (measured
   10-26 — seven IDs, one call, six records back, the seventh genuinely absent). Two limits are
   stated rather than hidden: it reads the **default branch** only (`release-drift.mjs --claim`
   separates `main` from the released tag), and it cannot see a **spelled-out** number — "sixteen
   harness sections" in a body beside "17 harnesses" in its own title is invisible to it, which is
   itself the lesson: the correction pass edits prose and titles keep the old number.
   **The sixth unit is a FIELD, and the score is only its occupant** (added 2026-10-26 12:29, the
   Echo/Pillow lesson made measurable). The GitHub Advisory Database scores in per-version slots:
   the legacy `cvss` object is a **mirror of `cvss_v3`** and is null for every record that moved to
   a v4-only shape, while `cvss_severities.cvss_v4` / `.cvss_v3` carry one slot each. Measured with
   `node agent/tools/claim-unit-lint.mjs --ghsa-census` over 100 advisories published 10-22→23:
   **`cvss_severities` populated 100/100**, **legacy `cvss.score` null 35/100**, **exactly one slot
   carrying a real score 96/100** (3 carry both and disagree — 4.7 vs 2.1 — 1 carries neither),
   **no CVE id 21/100**, and **1/100** severity label disagreeing with its score band. So "the
   advisory carries no CVSS" and "the field I parsed is null" are different sentences, and the
   second is the one that shipped twice. Two sub-rules come with it: **`{score: 0.0, vector_string:
   null}` is an empty slot, not a zero** — a genuine 0.0 carries a vector (one sampled record,
   `GHSA-27mw-82g8-phjj`, holds the all-N v3.1 vector with a null score, a third state where the
   score is computable and absent), so test `vector_string`, never the score; and **a GHSA id is
   not necessarily a database record** — Snipe-IT's `GHSA-xf36-wx48-5rqp` and Parse Server's
   `GHSA-rq3w-5c6f-p7wr` render published repo pages, return **404** from
   `api.github.com/advisories/<id>`, and are absent from **OSV** under that id (OSV answers
   "Vulnerability not found, but the following aliases were: CVE-…"), so the CVE is the only key
   both indexes share and an unreadable subject must fall back to it rather than become a finding.
   The check now binds every score to the identifier it belongs to — same sentence first, then the
   `Source:` line's first id, then nearest — because a passing CVE mentioned 900 characters later
   can otherwise out-distance the subject (`wrong-subject`), and a claim that fails on its own
   subject while matching another id in the item is now the finding that binding buys.

**Case study (Void, 2026-08-12 — two failures, one root cause):**
- The feed saw voideditor/void at #2 trending with +2,840 stars and wrote it as "AI-first
  editor momentum beyond Cursor/Copilot."
- **Neither GitHub nor the cited PageCrawl page was actually visited.** Had the repo been
  opened: README says "paused development since mid-2025" — the project is dead. Had the
  PageCrawl link been clicked: it's a generic tool signup form with zero Void data.
- The single root cause: **aggregate metrics were trusted without visiting the actual pages.**
  Star velocity is a signal to INVESTIGATE, not a signal to PUBLISH.

### Feed correction convention (when an item is wrong)

When a published item is found to be wrong (Void precedent), correct it **in place** — do not
renumber or silently drop it:

1. **Fix the body in place** — keep the item's number and position; rewrite the title/description
   to state what is actually true ("archived and deprecated", not "trending").
2. **Retract the bogus link** — remove any source that never contained the attributed fact; replace
   it with a source you have actually visited (the repo itself, the real vendor page).
3. **Keep ≥2 valid links** — every corrected item still needs at least two visited, working sources.
4. **Re-derive velocity — but only for claim corrections** (refined 2026-08-20). Corrections come in
   two species with opposite velocity consequences:
   - **Claim/framing correction** (the fact was wrong): re-derive velocity down to match reality
     (usually ▮ steady). The inflated framing is what bought the rank, so the rank goes back.
     *Canonical instances:* Void (dead project, live stars); `ai-memory` misattributed to DHH — the
     celebrity attribution was doing the work.
   - **Citation correction** (the pointer was wrong, the story is right): swap the link, **keep the
     velocity**. *Canonical instance:* the 404'd GrapheneOS permalink on the Pixel-kernel-Git-tags
     item — the HN points and the story were real; the URL was not.
   Applying the drop mechanically to both makes the feed under-report genuine trends as punishment
   for a dead link. The rule exists to stop *inflated* ranks surviving a correction, not to penalize
   every edit.
5. **Mirror to zh/ and jp/** — the correction lands in all three locales in the same run.
6. **Resolve every permalink, not just article URLs** — social-media permalinks (Mastodon, X) are the
   feed's most fragile citations. A status API (`/api/v1/statuses/<id>`) is a one-call check.
7. **Re-copy `latest.md` — a correction is only a correction where every copy moved** (added
   2026-10-26 12:29). `dist/<lang>/feed/latest.md` is rebuilt from the **dated** file at build time,
   so the published site self-heals; the three **checked-in** `feed/latest.md` mirrors do not, and on
   2026-10-26 the in-place correction to item 26 rewrote the dated feeds while all three mirrors kept
   serving the retracted "carries no CVSS" text to anything that reads the repo. After any in-place
   edit, run `cp <lang>/feed/YYYY-MM-DD.md <lang>/feed/latest.md` for all three locales —
   `node build.js` now warns per locale with the first differing line and the exact `cp` to run.
   (The same trap bit the check's own comment: writing the dist path as a glob — `dist`, then the
   star, then `/feed/latest.md` — inside a block comment embeds the two characters that close it,
   so `build.js` failed to parse until the comment became line comments. That is the
   unclosed-delimiter class this section's sibling check exists to catch, one level up.)

A correction is the same fact-check discipline applied *after* publication: visit the primary
source first, then edit. Never edit from the aggregate's framing.

### Sources (check every run)

1. **GitHub Trending** (daily + weekly) — repos + open-source releases
2. **Hacker News** — front page + Show HN (project launches, tools, discussions)
3. **Security/CVE feeds** — NVD, CISA KEV, vendor advisories (prioritize CVSS ≥9.0 / actively exploited)
4. **AI model & research** — arXiv, Hugging Face, vendor blogs (Meta, Google, Anthropic, OpenAI,
   NVIDIA, Alibaba, etc.)
5. **Major AI/tech news** — product launches, safety incidents (check the primary source, not just aggregates)
6. **Chinese open-source** — GitHub trending (zh), CSDN GitHub Hot, 36Kr tech

## Feed file format

### Frontmatter
```yaml
---
date: 2026-08-11
updated: 2026-08-11T04:00:00Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 12
license: CC-BY-4.0
---
```

**`updated:` is a true UTC instant, and the generator does not write it.** The host runs UTC+8, so a
hand-written value repeats the local wall clock — `updated: 2026-10-23T04:10:00Z` for a run that
happened at `2026-10-22T20:10:00Z`. That is 8 hours in the future, which made `build.js`'s
batch-coverage lint (feed `updated` vs the honest `last_processed`) warn on every batch that had in
fact just been learned, and it published a timestamp that had not happened yet. Same class as NVD's
`published`, which omits the `Z` — a date without a zone is a claim, not a measurement.
After the model returns, `generate-feed.sh` runs
`node agent/tools/feed-stamp.mjs --file en/feed/YYYY-MM-DD.md --mirrors`, which stamps `updated:`
from the clock on the en file, both translations, and the three `latest.md` copies (MERGE runs
included, which previously left an earlier batch's value in place). `build.js` warns if any dated
feed's `updated:` carries no offset or resolves to a future instant. Backfill recent files with
`feed-stamp.mjs --repair-from-git [--since YYYY-MM-DD]`, which takes each file's own git commit
instant.

### Item template
```markdown
## N. <Title> — <one-line English subtitle>

- **Velocity:** ▮▮▮ trending  |  ▮▮ rising  |  ▮ steady
- **Source:** <source name> · <points>+ pts · <Xh ago> (~<HH:MM> UTC+8)
- **Tags:** `<tag1>` `<tag2>` `<tag3>`

<2-3 sentence description of what happened>

**Why it matters:** <1-2 sentence analysis of significance>

> <Optional blockquote with extra context>

[`🔗 <source label>`](<url>) · [`🔗 <source label>`](<url>)
```

### Velocity levels (per-run, not cumulative)
- **▮▮▮ trending** — top 1-3 of this batch, highest velocity
- **▮▮ rising** — strong momentum, middle items
- **▮ steady** — notable but slower, bottom items
- Velocity is relative to THIS RUN's batch, not the full 30-item list

### Rules
- **Up to 20 items per run**, 100 max per day per language (safety cap; dedup is the real limiter)
- Ranked by velocity (recency × engagement acceleration × source authority), NOT total attention
- Every item MUST have at least 2 source links
- Tags must be lowercase, backtick-wrapped `<kebab-case>` or `<single-word>`
- Separate items with `---`
- End with a **Metadata** table (Generated, Items, Sources tracked, Refresh, Ranking, License)
- End with navigation: `[Previous day](...)` · `[Raw .md](...)` · `[Archive](...)`

### Metadata footer
```markdown
## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-08-11T12:00:00Z |
| Items | 10 |
| Sources tracked | 12 (Hacker News, GitHub Trending, major tech blogs, security advisories) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |
```

## i18n

- **en/** — English (default). Write first.
- **zh/** — Simplified Chinese. Full translation of all items.
- **jp/** — Japanese. Full translation of all items.
- All three locales have identical structure: `feed/`, `archive/`, `about.md`
- i18n config: `i18n.js` (strings per locale, fallback to `en` for missing keys)
- Build: `node build.js` discovers all locales automatically

### Translation notes
- Keep the same velocity levels, points, and time ago in all locales
- Translate item titles and descriptions fully
- Keep source names in original language
- Keep tags in English (they're machine-readable identifiers)
- Links stay the same across locales (point to original sources)

## File structure
```
en/feed/YYYY-MM-DD.md    ← English daily feed (canonical, up to 100 items)
zh/feed/YYYY-MM-DD.md    ← Chinese translation (full mirror)
jp/feed/YYYY-MM-DD.md    ← Japanese translation (full mirror)
en/feed/latest.md        ← Copy of today's en feed
en/feed/index.md         ← Feed index (list of all days)
en/archive/index.md      ← Archive index (same list, archive context)
```

## Schedule

| Run | Time (local) | Mode | Target |
|-----|-------------|------|--------|
| 1 | 04:03 UTC+8 | FRESH or MERGE | Up to 20 items |
| 2 | 12:03 UTC+8 | MERGE | Up to 20 new items (40 max) |
| 3 | 20:03 UTC+8 | MERGE | Up to 20 new items (dedup-gated, 100 max) |

Launchd triggers `generate-feed.sh` at these times. `deploy-cron.sh` runs at 22:07 as a
safety-net deploy.

## Build & deploy

- `node build.js` — builds all locales into `dist/`
- `npx wrangler pages deploy dist/ --project-name=trending-md --commit-dirty=true` — deploys
- Each generate run pushes to master, which triggers Cloudflare Pages auto-deploy
- Cron: launchd runs `deploy-cron.sh` at 22:07 daily (safety-net build + deploy)

## Learnt agent

A persistent **learnt agent** accumulates knowledge across feed batches and surfaces it on the
`/agent/` + `/action/` pages (trilingual). Its immutable purpose — recorded verbatim in
`en/agent.md` `## Purpose` and `en/action.md` — is to surface **fact-checked, first-hand,
agent-useful** trend information. It runs headless (`claude -p`) after each successful feed batch
via `agent-run.sh`, invoked from `generate-feed.sh`.

- **`agent/AGENT.md`** — the agent's identity + operating rules: the immutable Purpose, the 5-point
  self-improvement charter (fact-check, deep source traversal, every-day-better, self-evaluation,
  freshness), the 1M-token cap, net-new-only learning, and the **Self-execution** contract.
- **`en/agent.md`** — the agent's canonical English memory window (`## Purpose`, Identity, theses,
  todos, trend notes + `last_processed` frontmatter). Rewritten each run.
- **`zh/agent.md`**, **`jp/agent.md`** — display-only translations of the memory window.
- **`en/action.md`** — the agent's action page: self-proposed capability-expansion **todos** + a
  dated **log** (Plan / Did / Result, newest first) that tracks everything it did and links the
  results. Trilingual (zh/jp translations).
- **`agent/knowledge/<lang>/`** — cold-storage library, **trilingual**. The agent archives a
  `<topic>.md` reference file under `agent/knowledge/en/` (canonical English) when a topic is
  useful-but-not-hot, translates it to `agent/knowledge/zh/` + `agent/knowledge/jp/` (same
  `topic:` slug), and maintains a per-locale `index.md` TOC. The build renders each as
  `/<lang>/agent/knowledge/<topic>/`, and `[[topic]]` wiki-links resolve to the reader's locale.
- **`agent-run.sh`** — the runner; two passes: (1) **learn** the feed batch, (2) **act** — execute
  the agent's own todos and write the log. Runnable manually (`bash agent-run.sh YYYY-MM-DD`).

## Sources page

The `/sources/` page (trilingual, `en/zh/jp`) aggregates every source domain cited across the
feed and ranks them by citation count. It is **fully generated by `build.js`** — no hand-authored
markdown to drift:

- **Stats** — `build.js` scans every `en/feed/YYYY-MM-DD.md` (canonical English, date-named files
  only), extracts every `https://…` URL, normalizes the host (strips `www.`/`m.`, applies the
  `SOURCE_ALIASES` map — e.g. `raw.githubusercontent.com` → `github.com`, `blog.csdn.net` →
  `csdn.net`), and counts citations. Co-citation (two domains cited in the same item) is recorded
  as graph edges.
- **Categories + review** — eight categories: `code`, `vendor`, `news`, `security`, `research`,
  `community`, `data`, `other`. Every cited domain (currently 125) is hand-classified **and
  hand-reviewed** in **`sources/domains.json`**. Each curated entry carries a **review**: `cred`
  (credibility: `high`/`med`/`low`), `density` (info density: `high`/`med`/`low`), and `cv`
  (cross-validation count). Unreviewed domains (if any) render an italic "needs review" marker.
- **Outputs** (all regenerated each build, written straight to `dist/`):
  - `/<lang>/sources/` — the HTML page (stats, a clickable source cloud sized by citation count,
    a "most-cited together" co-citation list, and the full ranked table with category +
    cred/density/cv badges). Layout-is-the-diagram: no external chart library.
  - `/<lang>/sources.md` — a raw Markdown table for agents (`curl …/en/sources.md`).
  - `/sources.json` — canonical trilingual machine-readable dump (domain, citations, category,
    cred, density, crossValidated, en/zh/jp note).

**Maintaining `sources/domains.json`** — when a new domain starts appearing in feeds, add an entry
`"<host>": {"cat": "<category>", "en": "…", "zh": "…", "jp": "…", "cred": "…", "density": "…",
"cv": N}` with a one-sentence classification + evaluation and a review. **A new source must be
cross-validated at least once (`cv` ≥ 1)** — confirm at least one of its facts against an
independent source before adding it. This is the learnt agent's job (see `agent/AGENT.md`);
`node build.js` prints a `⚠ N uncurated domains need a review` list each run.

**What `cv` counts** (defined 2026-10-15; the machine-readable definition lives in the registry
itself under the `"$cv"` key, and is exported to `/sources.json` as `cvDefinition`) — `cv` is the
number of **independent** confirmations of a fact attributed to this domain. `cv: 1` is the
curation cross-check above; each further confirmation appends a dated `cvlog` line, so
**`cv === 1 + cvlog.length`** for every entry that has a `cvlog`. Independence is the whole point
and the easy thing to get wrong: **a confirming party counts only if it is not downstream of the
same original report, and two hosts cited in the same feed item are never a cross-check** —
co-citation is a *shared-origin* signal (one press release, one vendor advisory, one wire story,
one co-sealed government document). Entries with `cv > 1` and no `cvlog` are pre-rule legacy and are
**not** retro-fitted. Review a batch with `node agent/tools/cv-audit.mjs --clusters` (co-citation
candidates, i.e. what NOT to bump for), audit with `--check` (enforces the invariant; `build.js`
warns on drift each run), and bump with
`node agent/tools/cv-audit.mjs --bump <host> --note "YYYY-MM-DD — <what you verified, against whom>" --write`
(dry-run without `--write`; the note must be dated and must name the independent check).

## Important URLs

- Live site: `https://trending.md/`
- Raw feed (en): `https://trending.md/en/feed/latest.md`
- Raw feed (zh): `https://trending.md/zh/feed/latest.md`
- Raw feed (jp): `https://trending.md/jp/feed/latest.md`
- Archive (en): `https://trending.md/en/archive/`
- Sources (en): `https://trending.md/en/sources/` · raw `https://trending.md/en/sources.md` · JSON `https://trending.md/sources.json`
