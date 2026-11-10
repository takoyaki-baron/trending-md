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
   **A document can state its number in four places, and the abstract can be the WEAKEST** (added
   2026-10-27, the `openai/math` ETH preprint): the bound is `2^{n/(log n)^{1+o(1)}}` in the abstract,
   `2^{O_k(√(n log log n / log n))}` in Theorem 1.1, and `ρ(n) = n(log log n)²/√(log n)` in §6.4 — which
   the paper itself calls "the weaker exponent" *and which still beats the abstract*. So the usual
   direction (headline stronger than artifact) is not the only one: name the place you are quoting, and
   when a vendor ships a build-speed number, read the runtime table too — `indexable-inc/blaze` prints
   10–24× faster builds beside binaries that run **1.10–1.18× slower** than cargo's.
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
   **A score is DERIVED from its vector, and the second number on a page is the one to doubt**
   (added 2026-10-27, the `zip` lesson measured instead of argued). `CVE-2026-115905` prints **10.0** and
   **9.9** against one vector string; the learn pass inferred "NVD copied a score without checking the
   arithmetic" and the inference was **backwards** — that vector computes **10.0** under two independent
   v4.0 implementations, so the page body's 9.9 is the stale number. Censused with the new
   `node agent/tools/cvss-recompute.mjs` over NVD's 2026-10-20→26 publication window: **4,461 metrics,
   0 differ** (v3.1 3,319 native, v4.0 1,113 via `--oracle`, v3.0 29) — so a stored `baseScore` **is** the
   arithmetic of the `vectorString` beside it, and NVD published its own score on only **8 of 4,461**
   (0.2%). Three consequences for writing: **(a)** "NVD says 9.8" is almost always a *CNA's* number NVD
   re-serves — the provenance question, not the arithmetic question, is what keeps producing errors;
   **(b)** when two numbers ride one vector, recompute rather than quote both — "they disagree" is the
   answer only when the arithmetic cannot run (v4.0 needs a MacroVector table, hence `--oracle`);
   **(c)** the v3.1↔v4.0 spread's **direction is the CNA's habit, not the framework's** — 761 same-source
   pairs over one week give VulnCheck **+0.55** mean and VulnDB **−1.76** under the *same*
   `Primary`=3.1/`Secondary`=4.0 layout, so a two-column trend needs its CNA attached
   (`cvss-recompute.mjs --pairs`).
   **One vector has SEVERAL honest numbers, and NVD stores a different stopping point per framework**
   (added 2026-11-02 12:34, measured instead of argued). A vector carrying a Threat metric yields more
   than one defensible score — v3.x by `Roundup(Base × E × RL × RC)`, v4.0 by feeding `E` into the
   MacroVector lookup — and **both are published in a field called `baseScore`**. Over NVD's
   **2026-10-26 → 11-01** publication window: **136** metrics carry a Threat metric (**4.1%** of
   3,327, all v4.0), and **136 of 136 store the THREAT score** — the base, never. Reading the CNA
   container the number came from (cveawg, **259** record/framework pairs) splits the two frameworks'
   conventions cleanly: on **v4.0** NVD **keeps** `E` **136/136** and the container stores the **base**
   in **123/136**, so the two artifacts disagree on **123** pairs by **−3.4…−0.4** — every difference
   the vector's own Threat term, and **0** pairs where either side matches no arithmetic; on **v3.1**
   NVD **strips** the temporal metrics **123/123**, both copies hold the base, and the numbers agree
   **123/123**. So "the 4.0 score on NVD is lower than the vendor's" is not a disagreement and not a
   provenance question — it is one vector quoted at two stopping points, and **the arithmetic, not a
   field, says which**. Consequences for writing: **(a)** name the stopping point when you quote a
   score off a vector with `E` — "9.3" is the threat score and "10.0" the base of the *same* string;
   **(b)** a scanner reading NVD's v4.0 is reading a threat-adjusted number while the v3.1 column on
   the same record is a base, so a cross-framework comparison is comparing two conventions;
   **(c)** "the record says 10.0 and NVD says 9.3" is not a copy error, and recomputing only the base
   is what made it look like one. One call:
   `node agent/tools/cvss-recompute.mjs --from YYYY-MM-DD --to YYYY-MM-DD --stopping-point-census
   --with-cna N [--oracle /path/to/cvss4] [--json]` — `--with-cna` joins the container (unmetered,
   capped, and a cap is printed rather than hidden), the oracle is required for v4.0 and its absence
   prints `v4-not-recomputed` rather than a verdict, and `judge()` now accepts a number matching
   **any** stopping point, so a record honestly storing the threat score no longer reads as a
   non-reproducing one. `claim-unit-lint.mjs --check cvss` emits the advisory `score-stopping-point`
   when a quoted score reconciles to a stopping point the item never names (silent when the item says
   "base"/"threat"/"temporal", or when it already quotes two of them — enumeration is disclosure;
   `--selftest` **194 → 199**).
   **A two-framework gap is a SCOPE reading before it is a severity reading** (added 2026-11-05 12:40,
   measured over NVD's 2026-10-27→11-02 window — **610** same-source 3.1/4.0 pairs, **521** clean). On the
   4.0 vector, classify where the impact lands: `vuln-only` (`VC/VI/VA` only), `split`, `subsequent-only`
   (`SC/SI/SA` only). Then Δ = v4.0 − v3.1 is **+0.71 vuln-only** (n=441, 327 higher), **−0.42 split**
   (n=53) and **−0.89 subsequent-only** (n=27, **25 of 27** lower) — so "the 4.0 column is lower" is a
   statement that impact left the vulnerable system, not that the bug got less severe. The mapping to
   v3.1's own vocabulary is near-total (**`S:U` → `vuln-only` 440 of 443**, **`S:C` →
   `split`/`subsequent` 77 of 78**), and it holds **inside one CNA** (VulnCheck's 456 clean pairs:
   **+0.74 / −0.65 / −0.83**), which is what makes it the framework rather than a house style. The
   control that must be applied or the number is worthless: **a 4.0 vector carrying a live `E` is a
   stopping-point pair, not a scope pair** — excluding them turns VulDB's headline **−1.29** into
   **+0.87** on its 16 surviving `vuln-only` pairs. One call:
   `node agent/tools/cvss-recompute.mjs --from YYYY-MM-DD --to YYYY-MM-DD --scope-census [--json]`.
   **A mean over severity bands describes no band, so the census prints the band table** (added
   2026-11-03 20:22, and the convention is part of the number: **Δ = v4.0 − v3.1**, so a negative row
   means NVD's 4.0 sits *below* the 3.1). The hand census of the **31** `cna@vuldb.com` records
   published 2026-11-02 returned a mean Δ of **−1.51**, and no band carried it: **−0.82** at Critical
   (10 pairs, 3.1 higher 10), **−1.93** at High, **−1.91** at Medium (**−4.2…+1.6**) — while the two
   `E:X` rows run the other way. So "the 4.0 score is 0.7 below the 3.1" is a **Critical-band** fact
   quoted as a constant, and the reusable rule is that a gap between two frameworks is a *joint* of
   the band and the Threat metric, never a single number. `--stopping-point-census` now prints a row
   per severity band **and** per (band · Threat group), keeps `E:X` as its own **control** row (base
   == threat there, so its gap is the framework rather than the stopping point), and puts the counts
   (**4.0 higher** / **3.1 higher** / **equal**) beside the mean instead of folding them in;
   `pairStats()` rides the `--json` payload too, because a machine-readable run that drops the band
   table leaves the caller with exactly the number the item was filed against. One boundary worth
   carrying: **`bandOf(null)` is `unscored`, never `None`** — `Number(null)` is 0, and an absent
   score banded as a 0.0-severity record is the GHSA empty-slot defect one field over (the selftest
   caught it on the first run). And the sign is a unit: the hand table filed one day earlier wrote
   the same census as **+0.7 / +1.8 / −0.2…+4.2** by subtracting in the other order, so quote the
   subtraction or the table reads as its own contradiction. One operational limit came out of running
   it: a **month-long** window (17,256 records) dies on NVD's **120 s** per-request timeout at
   `resultsPerPage=2000`, so page size is a flag (`--per-page 1000`) and a failed page now names its
   `startIndex` instead of exiting on a bare `AbortError`.
   **A record-shape check needs the same disclosure guard as a claim check, or it measures the
   writer's vocabulary instead of the reader's ability** (added 2026-11-02 20:29). The separate
   `--check temporal` fires on the CONTAINER, not on the prose — deliberately, because an item can
   quote three numbers with no `CVSS 3.1` label anywhere — but it shipped with no yield, so on its
   first live run it returned **3 advisories against 3 correct items**: #28 wrote "a base of 10.0
   and a threat score of 9.3" and #35 "the base score, with `E:P` taking the full temporal value to
   9.4", which is exactly what the check exists to ask for. It now carries the same two arms
   (a named stop, or a second number from **this vector's own** stops), the enumeration arm binds
   to the record's **own stretch of prose** (first mention → next mention of a different id, so a
   neighbouring record's 9.4 cannot disclose this one), and the suppression prints
   `temporal-disclosed` (sev 0) rather than vanishing — a suppression nobody can count is how a
   check's prevalence becomes folklore. Live: **3 advisories → 3 `temporal-disclosed`, 0 findings**;
   `--selftest` **199 → 203**.
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
   **A word-only severity is a QUEUE, not a policy — CISA-ADP writes the number within hours, and the
   number can be in the record before NVD's API returns it** (added 2026-11-03, from the Syncope
   item's own follow-up question). Measured over NVD's 2026-10-27→11-02 window (**3,336** records):
   **835** carry zero CVSS metrics (25%), 197 of those `Rejected` → **638** published records with no
   score. Of those only **23 (3.6%)** carry a `"Textual description of severity"` metric and **23 of 23
   are `security@apache.org`**, while **615** carry **no `metrics` key in the CNA container at all**
   (Mozilla's 340 Firefox records, Android 128, kernel 104, Drupal 77, MITRE 38) — so "no CVSS" is
   **three states** and only one of them is a word. Over the 2026-09-21→27 window, **41 of Apache's 44
   records** (all the word-only ones; the 3 skipped already carried Apache's own CVSS) now hold a
   **CISA-ADP** CVSS 3.1 in the record's ADP container, a median **4.4 h** after publication (min 0.9 h,
   max 104 h; **40 of 41 within 24 h**) — and the word **stays**, so the shape is "a number beside the
   word in another container", never "the word was replaced". Two guards: the ADP's
   `providerMetadata.dateUpdated` moves on any rewrite, so every lag is an **upper bound**, and the
   population is **survivors** (records that got enriched), so 4.4 h describes the class, not a
   deadline. And **11 of the 638** carry a CISA-ADP number NVD's `metrics` does not serve (all
   `security@android.com`, still `Received`) — so "no CVSS on the NVD API" is not "no CVSS on the
   record", and the artifact you read decides the sentence. Write the state, not the absence.
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
   is a **null minimum**; and **`changes[]` is a FIFTH field that ENDS a range** — a change entry
   toggles status at its `at` version and holds to the range's end, so
   `{version: "0.42.0", lessThan: "2.0.4", changes: [{at: "1.8.18", status: "unaffected"}]}`
   (CVE-2026-110720, consul-k8s, read from cveawg 2026-10-27) means affected **`[0.42.0, 1.8.18)`**,
   not `[0.42.0, 2.0.4)`. The tell in prose is **two fix versions listed beside one affected span**:
   the bulletin said "0.42.0 up to 2.0.4" fixed by "1.8.18 and 2.1.0" and never mentioned branches,
   while the machine-readable record had carried the exemption from publication day — so a page that
   looks self-contradictory is often one missing sentence, and a parser reading only
   version/lessThan marks the fix release vulnerable *and* silently covers the whole `2.x` line.
   One call:
   `node agent/tools/disclosure-lag.mjs --range-census --from YYYY-MM-DD --to YYYY-MM-DD` prints the
   table above for any window (re-run it — analysis lands later and the top row moves).
   **Read the range VALUE, not the range FIELD — a bound has three spellings and the selectors knew
   two** (added 2026-11-06 04:47). `affectedRanges` learned the operator-inside-`version` form on
   2026-10-26 (GitHub CNA's `{version: "< 13.0.0"}`), but every **population filter** kept testing
   `v.lessThan || v.lessThanOrEqual`, so the reader knew and the census did not: `GitHub_M`'s
   openhuman block `{version: "< 0.57.13", status: "affected"}` was counted unbounded by
   `--range-census`, invisible to `--bound-census`'s `openBoundOf` (it needs an inclusive max), and
   not a *named fix* to `--future-fix-census`'s `namedFixesOf` — a record that names its fix, filed
   as one that names none. All three now call one function, `versionBounds()`, which returns the
   bound **and its spelling** (`structured` · `operator-in-version` · `point` · `null-min` ·
   `unread`), because a fix that silently reclassifies records is indistinguishable from one that
   did nothing. Measured on NVD's **2026-10-29 → 11-04** window (**3,069** records): **303 (9.9%)**
   state their bound ONLY as a comparator inside `versions[].version`, and `--range-census`'s
   `bounded` column moves **2,118 → 2,421** by exactly those 303 — the decomposable change is the
   point, so the print names `structured · operator-in-version · both · point-only` and keeps
   `bounded`'s old meaning (an explicit range bound; a **point** is a single affected version, not a
   range). Two guards the live data bought: **`MT6993` is not prose and `n/a` is not a version** —
   a "starts with a digit" test threw away **159 distinct MediaTek chip IDs** that are the affected
   set, so the test is *no digit anywhere, or whitespace with a non-digit-led first token*, which
   keeps `1.18 RTM2` and `25.3.01 hotfix 10`; and **a residual bucket is a label nobody measured** —
   the `--range-census` line that called everything unexplained "only UNAFFECTED versions" was
   computed by subtraction, and the same change moved **120** records into it whose value is prose
   (`n/a`, `Android kernel`, `Radeon Software for Linux 26.13`), so each term is now counted from
   the record. `--selftest` **178 → 188**.
   **`changes[]` has a majority spelling that confirms the bound from the FAR SIDE, and the rule that
   reads it right can still be right for the wrong reason** (added 2026-10-28, censused over 3,070
   records). Of **139** records carrying a non-empty `changes[]` in NVD's 2026-10-21→27 window, only
   **24** have entries landing *inside* the span; **114** are Patchstack's
   `{version: "0", lessThanOrEqual: "3.3.12", changes: [{at: "3.3.13", status: "unaffected"}]}` —
   with an **inclusive** bound the first unaffected release is by definition one *above*
   `lessThanOrEqual`, so the entry confirms `≤ 3.3.12` rather than overshooting it. A parser that
   treats "above the stated max" as noise gets the right range and the wrong reason, and reports the
   field's prevalence as 5× too small. And the shape is **one vendor's house style, not a CNA idiom**:
   the whole window has three writers (`audit@patchstack.com` 115, `hirt@hitachi.co.jp` 19,
   `security@hashicorp.com` 5), and all 18 multi-entry records are Hitachi **descending** — which is
   also why the positional bug survived: descending order makes the *first* entry equal the bound, and
   only a list short enough to read to the end reaches the *lowest* fix. A last-entry reader (the
   pre-10-27 parser) bounds **18** of 3,070 records differently; a first-entry reader bounds **0**. So
   when a rule is learned from two records, run the census before quoting its prevalence — and when a
   count of "carriers" and a count of "records it changes" disagree, ask which side of the boundary
   the entries sit on. One call:
   `node agent/tools/disclosure-lag.mjs --changes-census --from YYYY-MM-DD --to YYYY-MM-DD`
   (`--backlog-census` on the same window answers "is a low-CWE `Received` residue a queue or a
   quality signal?"; `--window-cache <path>` makes the second census free).
   **An open-ended bound excludes the newest release far more often than it is wrong, and the fix
   can be in a field that is not the range** (added 2026-10-30 04:31, the Agno `CVE-2026-119050`
   case turned into a census). The shape: `versions: [{version: "0", lessThanOrEqual: "3.1.11",
   status: "affected"}]` with no `unaffected` entry, no `changes[]` and no `lessThan` — an inclusive
   max and **no named fix** — beside a `packageURL`, so a registry can answer the question the
   record cannot. Measured over NVD's **2026-10-23 → 10-29** window (**3,421** records): only **10**
   carry the shape at all (**0.29%**), and **2 of those 10** have a newest release **above** the
   bound — **both from `disclosure@vulncheck.com`**, which is the `changes[]` lesson repeating: a
   10-record class with a one-CNA numerator is a *writer's* rate, never an industry one. The two
   rows then split into opposite causes, and that split is the reusable part: `CVE-2026-117558`
   (`@ai-sdlc/plugin-mcp-server` ≤ **0.31.2**) names a fix **commit** `717d7ecf` in its own
   `references[]` (dated 32 minutes after 0.31.2 shipped, carried by 0.32.0) — so the range was
   **right** and only the machine field was silent — while `CVE-2026-119050` points at no fix
   anywhere and `v3.1.12` still carries the identical `getattr` at lines 54 and 90. **So
   `versions[]` naming no fix is not the RECORD naming no fix, and it is not "no fix exists"**: the
   third place a record names a fix is a `references[]` commit/pull URL. Second answer, and it is a
   negative worth stating carefully: **no CNA in this window re-issued a range after the release it
   excluded** — none of the 2 rows has a `lastModified` later than the newest release's upload time
   — but the sample is **2**, so the finding is "not observed", never "never happens"; and
   `lastModified` moves for KEV adds and ADP rewrites too, so it is a weak clock for "the CNA
   looked". One call:
   `node agent/tools/disclosure-lag.mjs --bound-census --from YYYY-MM-DD --to YYYY-MM-DD`
   (`--max-pkgs` caps registry lookups; a cap hit prints `unqueried`, never a pass — and **a
   registry miss is not an answer**, so `newest > bound` proves the range excludes the current
   release, never that the release is fixed; the newest version's bytes are the test).
   **`newest == bound` is a third state with the OPPOSITE advice** (added 2026-11-03 12:37, from
   python-jose `CVE-2026-120459`): the ceiling is the latest release, so the record is accurate and
   its remedy is **empty** — there is no version to install, and the mitigation is application-side
   (reject the input, fork), never "upgrade". The old two-way split counted these rows as *inside*
   the bound, which is one output for two opposite remedies; `newest < bound` is now separate too
   (a registry behind the stated ceiling — a private build, or a lag). Live: python-jose `≤ 3.5.0`
   against PyPI's `3.5.0` (2025-05-28) with `defaultStatus: unaffected` and **no fix pointer
   anywhere** in the record, beside 10-30's Python-Markdown case — the same shape from a different
   filing.
   **"Above the ceiling" is a DIFFERENT question from "is the newest release outside" — and the
   release one step up is often not the fix** (added 2026-11-04 12:34, the AzuraCast
   `CVE-2026-121427/8/9` item turned into a census). `--bound-census` answers the second; a responder
   obeys the first, so **0.23.9** — one patch above the `≤ 0.23.8` ceiling — gets installed while the
   project's own notes say it "is solely intended to update our distributed Docker containers to an
   updated version of PHP". `--ceiling-census` reads the release LIST rather than the newest release,
   names the lowest release above the bound, and classifies that release's own changelog section:
   `own-security` / `dependency-security` (security and infrastructure in the SAME sentence — the PHP
   case, and the one a section-level word scan gets wrong) / `infrastructure` / `unclear` / `no-text`,
   plus, separately, **where the changelog names this CVE** (the id column) and the first later
   release whose notes are own-code security (the unlabelled fix). Two reading rules: **a release
   section NESTS subheadings**, so it ends at the next heading at the same or a higher level — the
   first version stopped at any `#` line and cut 0.24.0 to its two-line subheading; and **a record
   with no `packageURL` still names a project** in `references[]`, which is why the census resolves a
   repo from a GHSA URL and reads `tags.atom` (10 entries, so a ceiling older than all of them is
   `outside-tag-window`, never a guessed successor). Measured over NVD's **2026-10-27 → 11-02**
   window: the repo fallback takes open-bound candidates from **17** (registry-nameable) to **190**,
   of which **44** have no release above, **18** no readable changelog, **5** `own-security`, and
   **2** name the fix above ceiling+1 — FreeImage `≤3.18.0` → **3.19.23** with the CVE at
   **3.19.25**, i.e. ceiling+1 is 20 releases up and still not the fix. One call:
   `node agent/tools/disclosure-lag.mjs --ceiling-census --from YYYY-MM-DD --to YYYY-MM-DD
   [--window-cache <path>]`.
   **A vendor's advised install version can fall inside its own CVE record's range — and that is a
   text join, not a field join** (added 2026-10-30 20:30, filed from Cloud Foundry `CVE-2026-59387`).
   `node agent/tools/disclosure-lag.mjs --mitigation-census --from … --to …` (or `--ids CVE-…` for a
   record in hand) fetches the advisory each `references[]` entry points at, extracts the versions it
   tells a reader to install, and compares them with the record's own bounds. It reproduces the
   filing case first-hand: the advisory's "Upgrade CAPI to **v1.246.0** or greater" sits inside the
   CNA's `{version: "0", lessThan: "v1.247.0"}`, and only the *other product row*
   (`cf-deployment 60.7.0 — Includes CAPI v1.247.0`) clears it. **Four guards, each bought by a live
   run**: "Confirmed/tested up to X" is where the reporter stopped, never a fix or a bound; a
   **bundled product line** ("Includes CAPI v1.247.0") is a different artifact; **ranges must not be
   pooled across products** (CAPI `1.246.0` is trivially "< 60.7.0", so a version is paired with the
   product its own sentence names, and an unnamed product on a multi-product record is
   `product-ambiguous`, not a hit); and **the first reference is not necessarily the record's own
   advisory** — Jackson's incomplete-fix follow-up lists the ORIGINAL advisory first, whose page says
   "Fixed in 2.18.8" for the *earlier* CVE, so a page naming CVEs and none of them the subject is
   `page-other-advisory` and the next reference gets a turn (≤2 fetches). "Latest release" is
   deliberately **not** a fix phrase: every README carries it, and the first live run read Xerte's
   badge as a remediation. First measured sample: **40 pages of 1,126 candidates** over
   2026-10-28→29 — 0 `mitigation-inside-range`, 2 `product-ambiguous`, 6 unreadable — so read the
   prevalence as *unmeasured*, and the filing case as *reproduced*.
   **A remedy can point BELOW the record's own range, and the record's own span can contain nothing
   at all** (added 2026-11-01 20:49, filed from Apache MINA `CVE-2026-118636` and censused over NVD's
   2026-10-25→31 publication window, **3,461** records). MINA's `affected[]` is
   `{version: "3.0.0", lessThanOrEqual: "3.0.0-M2", versionType: "maven"}` — an **empty** span under
   its own comparator (`3.0.0-M2` sorts before `3.0.0`) — beside "we do not plan to release a version
   that fixes this issue" and "use the latest Apache MINA **2.2.X** branch". Every `disclosure-lag`
   state assumes a fix at or above the range, so this class had no bucket.
   `node agent/tools/disclosure-lag.mjs --remedy-census --from … --to … [--window-cache <path>]`
   reads the record's own prose (branch lines first, then point fixes, then the record's
   `versions[].status`) and splits: **761 above (22.0%) · 2 inside · 3 inside-other-line · 1 below
   (0.03%) · 9 `eol-line-upgrade` · 4 `no-fix-no-remedy` · 2,681 no statement (77.5%)**. Read the no-statement
   row as a property of the RECORD, not of the vendor: CNA descriptions are descriptions, and
   Wordfence's 68 records carry no remediation sentence at all because theirs lives on the advisory
   page (`--mitigation-census`'s question). Four guards, each bought by a wrong number first:
   **(a) `noFix` and direction are ORTHOGONAL** — Apache Camel `CVE-2026-101259` says three release
   lines "reached end of life … and will not receive a fix" **while naming 4.23.0 above the range**,
   so the refusal is scoped to a LINE while MINA's is scoped to the PRODUCT; collapsing them into one
   "unsupported" bucket put 8 Apache records in the wrong class on the first run;
   **(b) a fix set names one version PER BRANCH** — Backstage `CVE-2026-115923`'s spans are
   `< 3.9.2` and `>= 4.0.0, < 4.0.2`, so "below every minimum" read its own fix `3.9.2` as a
   downgrade and produced **34 of the first pass's 36** below-range rows. A boundary is matched on
   the **numeric core** (FileBrowser's `< 1.5.2-stable` beside "fixed in 1.5.2-stable"), and a
   version the record itself lists as `unaffected` **outranks any comparator** (VulDB's `1.3R` is
   segment-wise *below* `1.295`, and the record says it is the fix);
   **(c) a remedy sentence about another CVE is not this record's remedy** — WPScan's "regression of
   CVE-2023-4643, which was fixed in 4.1.3 and reintroduced in 4.1.4" is a history of an older bug;
   **(d) a git range is not a version range** — 211 of the first week's "empty spans" were
   `<sha>`…`<sha>` from the kernel and NVD-assigned git ranges, ordered by a comparator with no
   meaning for a hash, so both bounds must *look* like versions before the comparator runs at all.
   **The registry arm is the half that decides whether a below-range remedy is usable**: MINA's 2.2
   line has **11** releases on Maven Central (newest **2.2.10**), and
   `org/apache/mina/codec/delimited/serialization/JavaNativeMessageDecoder.class` is present in
   `mina-codec-3.0.0-M2.jar` and **absent** from `mina-core-2.2.10.jar` (468 classes) — so the
   recommendation is installable and lacks the named decoder, while *absence of the class is not
   absence of the bug*.
   **And 2.5% of the week's records state a span that contains nothing** — **87 of 3,461**: **86**
   write a POINT as a range (`{version: X, lessThan: X}`, where the intent is plainly "everything
   before X") and **1** inverts its bounds. **73 of the 86 are `chrome-cve-admin@google.com`**, 10
   Tanium, 1 each Nextcloud/HackerOne, Checkmk and OpenText — a **house style**, so quote the
   assigner and never the rate. What a scanner does with such a span is untested; that the span
   contains nothing is the record's own arithmetic.
   **A record can name the product and never a release** (the same week, the second question filed
   11-01): **44** records carry an `affected[]` entry with a product and **no `versions[]`**, and
   **44/44 are `secalert@redhat.com`** — the json-glib `CVE-2026-120194` shape (six RHEL/RHCOS
   products, `defaultStatus: affected`, nothing to compare a `--modversion` against). `--range-census`
   cannot see it because it asks whether a record carries a range, and these records carry a
   PRODUCT; the operational content is the CNA's own prose, and whether the advisory in
   `references[]` names the version the record omits is still **unmeasured**.
   **A missing CWE on a `Received` record is the CNA's silence, not a triage backlog — and the
   "stalled because it is thin" reading is falsified by the records themselves** (added 2026-10-28,
   measured over the same 3,070-record window). Of **398** `Received` records, **155 (38.9%)** carry a
   CWE, and **0 of 3,070** records anywhere in the window carry an `nvd@nist.gov` CWE *source* (the
   same window's `--field-census weaknesses` splits the 2,250 carriers **2,222 `cna` · 28
   `cve@mitre.org` · 0 `nvd@nist.gov`**) — so every CWE is assigner-supplied and there is no NVD
   processing step for a "queue" reading to point at.
   The **243** CWE-less ones come **243/243** from three assigners — `416baaa9-dc9f-4396-8d5f-8c081fb06d67`
   (**231**, the Linux kernel CNA; identify it from its records' own text, "In the Linux kernel, the
   following vulnerability has been resolved"), `security@mozilla.org` (7), `cret@cert.org` (5) —
   while every other listed assigner is at **100%**. And they are the **thickest**, not the thinnest:
   kernel median description **1,039** chars / **4** references against 79–697 chars for the
   assigners that do state one. Day-level swings are composition (10-23: **217** `Received` at
   **0.0%**; 10-27: **167** at **92.8%**), so a week rate is a rate over *which CNA filed that day*
   — quote the assigner, never the percentage alone.
   **A CWE is a claim at a time, and the census could not see it move** (added 2026-10-30, the
   field-watch): every count above is one instant, and the next question — does a value change
   between publication and analysis, and does NVD add *beside* the CNA's or replace it? — cannot be
   answered by re-running the window, because `vulnStatus` is read at query time so the cohort's
   composition moves while the field does. `disclosure-lag.mjs --field-watch weaknesses --from … --to …`
   pins an id list instead and a later re-read queries the SAME ids, driven by `lastModified` (any
   edit bumps it, so the intersection is complete and costs 1–2 calls rather than one per record);
   `--if-due 20` keeps it a watch in a 3x-daily pipeline. The distinction it encodes is
   **value-sets alone cannot tell "NVD added beside" from "NVD overwrote"** — same values plus an
   `nvd` source is the first, different values with only `nvd` left is the second.
   **And since 2026-11-05 it has an EXECUTOR, because a rule in prose did not survive one recurrence**
   (added 2026-11-05 12:34, the Kyverno cohort): item 23 shipped "21 records `CVE-2026-122302`–`CVE-2026-122323`",
   a **22**-id span in which **`CVE-2026-122317` has no record at all** (`cveId` queried alone: `totalResults` **0**)
   — the HPE shape again, one namespace over, ten days after the rule was written. `claim-unit-lint.mjs --check
   idrange` (default set, **zero network calls**) extracts every dashed range, computes the implied span for
   same-year endpoints, binds it to a stated count of **records** (never of scores), and emits
   `cve-range-span-mismatch` (sev 2). Four guards, each bought by a wrong answer while calibrating it on the filing
   case's own **corrected** sentence: a count may take at most **one capitalised** intervening word (`22 values and
   CVE` counted two and fired on a correct item, so the fix is a `[A-Z]`-only single slot); a number immediately
   after a hyphen is an **identifier, not a count** (`CVE-2026-122317 carries no record` read as "122317 records" —
   the `countNumsIn` guard, one regex over); **two** stated counts for one range is `range-ambiguous` (sev 0) rather
   than a coin flip; and a disclosed gap is the **correction**, printed `cve-range-disclosed` (sev 0) and never
   dropped. Calibrated both ways on the filing file: the pre-correction commit returns **1 finding**, the corrected
   working file **0 findings / 2 disclosed**; census over **36** October–November feeds / **1,484** items → **5**
   dashed ranges, **1** finding, **3** `ok-range`, **1** cross-year silence — so the class is 0.34% of items and the
   check has no false positive on the corpus. `--selftest` **243 → 252**.
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
   **A record's `published` quoted as a calendar day can be the HOST's day, not its own — and that
   is now a check, not a rule** (added 2026-11-02 04:31, filed by the feed's own item 18:
   `CVE-2026-120209` written as "published 2026-11-01" against cveawg's
   `datePublished 2026-10-31T17:25:56Z`, i.e. the same instant's **UTC+8** date — the `updated:`
   trap one layer over). `claim-unit-lint.mjs --check date` (in the default set) reads every
   publish **cue** ("published"/"disclosed", never "fixed"/"released"/"reserved" — NVD carries no
   `dateReserved`, so a reservation date is unverifiable rather than wrong), binds it the way the
   `cvss` check binds a subject (its own sentence's id → the item's single CVE → every cited record
   agreeing on the day), and compares against the record's `published` parsed **as UTC when the `Z`
   is absent**. Verdicts `date-local-shift` (sev 2 — the quoted day is the instant's UTC+8 date)
   and `date-mismatch` (sev 2); a record it cannot read is silence, never a finding. Calibrated
   both ways on its filing day: **1 finding / 24 verified** before the correction, **0 / 24**
   after; `--selftest` 164 → **171**.
   **A "published" cue is about an ARTEFACT ten times before it is about the record, and there are TWO
   clocks** (added 2026-11-02 04:43, from the 33-feed census: **10 of the check's first 11 findings were
   the checker's**). Every one of the ten was a cue whose subject was something else — a newsroom's
   article date on the `Source:` line ("Unit 42 · published 2026-10-14"), a release ("fixed in
   `v0.1.7`, published 2026-05-06"; "7.1.2-33 was published on 2026-10-10"), a pair of fix releases
   ("worker 0.1.756 and gateway 0.1.776 — both published 2026-09-15"), a vendor's own publication
   ("published by Patchstack on 2026-10-13"), an author's post ("published the Sleep framework on
   2026-10-27"), or a `Source:` line naming the site rather than the registry. Five suppressors now
   encode that: cue followed by `the`/`a`/`by`; a version ATTACHED to the cue (the short tail is
   punctuation, a dash, `both`, `was`/`is` — markdown emphasis must be stripped first, or `**v0.1.7**,`
   reads as no version); an artefact noun in the preceding clause; and a `Source:` line that names no
   registry. Two further defects the census found in the regex itself: **`\b` after the day fails on an
   ISO instant** (`2026-10-31T09:29Z` — `1` and `T` are both word characters), so the cue skipped the
   instant and scored the *next* bare date in the sentence (a `reserved` day, an advisory's `dated`
   day); and the comparison read **NVD's `published` only**, while cveawg's `datePublished` is a
   different clock — `CVE-2026-117656` is `2026-10-30T23:55:23Z` there and `2026-10-31T00:16:51Z` in
   NVD, 21 minutes apart on different calendar days, so a correct "published 2026-10-30" was a
   finding. A claim now matches EITHER clock's day and the verdict names the one that matched; the
   CNA container carries `datePublished` under `CNA_CACHE_V: 5`. `--selftest` 171 → **194**.
   **A KEV row and its CVE record are two clocks, and the catalog can be AHEAD** (added 2026-10-31
   20:41, from `CVE-2026-118527`: KEV'd 2026-10-30, `cveawg` 404 a day later, its own `notes`
   linking an NVD URL that resolves to nothing). Measured with the new
   `node agent/tools/kev-record-watch.mjs --since YYYY-MM-DD` (KEV's JSON and `cveawg` are both
   **unmetered** — zero `api.github.com`, zero NVD calls): of the **79** rows added since
   **2026-09-01**, **76** had a record at or before their KEV add, **2** published *the day after*
   it (`CVE-2026-85706` added 09-11 → published 09-12T02:46Z; `CVE-2026-87886` added 09-16 →
   published 09-17T22:57Z), and **1** was still unpublished a day on. So "CISA listed a CVE the
   registry has no record of" is **true as a lag and false as an absence**, and the sentence must say
   which. Three things to write correctly: **`cveawg` 404 is a RESERVED id whose record is
   unpublished — never "does not exist"** (the reservation is why KEV can cite it at all); **`dueDate`
   is not this clock** (it is the FCEB remediation deadline and moves independently); and **`dateAdded`
   carries no time**, so every lag from it is **day-granular** — "the following day", not "+1d" as if
   hours were known. The catalog's own `catalogVersion` is a date, so "added 10-30" means "present in
   the 10-30 batch", not an hour. `--watch` keeps `agent/data/kev-record-state.json` and appends only
   on a real move (`MISSING → PUBLISHED` is the only evidence that bounds the lag); a row unpublished
   past **30 days** is the finding rather than another pending row.
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
   **A fix can ship with NOTHING to key it, and that is a state rather than a gap** (added
   2026-10-29 12:32, the sixth artifact state). The five above all assume a record exists to ask
   about. `node agent/tools/disclosure-lag.mjs --repo <slug> --artifact <mode>` **with no `--ids`**
   asks the other question: it lists every published advisory carrying no CVE id and joins its
   patched version to the release that shipped it → **`fix-in-artifact-no-identifier`**. Live on
   `Openpanel-dev/openpanel`: **37 advisories, 0 CVE ids**, only **10** state a patched version at
   all, and `GHSA-49hg-9qhc-4623` → **3.16.2 (2026-10-27)**. Waiting for a record is not a remedy
   here because **none is pending**; the remedy is tracking the vendor's own feed. Measured over the
   **29** repos this feed had cited a repo advisory for (one `gh api
   repos/<slug>/security-advisories` call each, authenticated so outside the core budget): **1,114**
   advisories, **683** with an id (**61%**, median **78%**), and **bimodal** — **13** repos ≥90%,
   **10** ≤50%, **3** at zero. So the identifier is applied for **per project, not per advisory**,
   and "N advisories with no CVE" describes a policy, never a triage failure. Two guards on reading
   that table: **five rows are capped by `per_page=100`**, so the corpus total is a lower bound; and
   a **zero from this endpoint is not "zero advisories"** — `tailscale/tailscale` returns **3**, all
   CVE'd, because the bulletins this feed counted live on the vendor's site and never enter the
   GitHub API.
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
   **And the CNA's own `packageURL` is not a mapping either** (measured 2026-10-27 20:31 on two
   VulnCheck records). `CVE-2026-116137` states `pkg:npm/adm-zip` `<= 0.6.1` (0.6.1 is npm
   `latest`, published 2026-09-11) and `CVE-2026-116176` states `pkg:pypi/vllm` `0.9.2 < 0.24.0`;
   OSV's CVE-level record carries only a **GIT** range in both cases, and the vllm record's
   `GHSA-vfp2-c8pq-v6h6` alias resolves to **404 in `api.github.com/advisories`** and to
   "not found, but the following aliases were: CVE-2026-116176" at OSV. Run against both affected
   versions: **trivy 0.76.1 → 0 and 41 records, grype 0.121.0 → 0 and 41, neither containing either
   CVE**, while an `adm-zip@0.6.1` install is the newest release there is. So "the CNA declares an
   ecosystem and a semver range" is not "a scanner can see it" — the package-level advisory
   (GHSA/PYSEC reaching the global DB *and* OSV) is the whole mapping, and it can lag the CVE
   indefinitely. A repository-level advisory is not that record.
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
   `node agent/tools/doc-twin.mjs --probe <url> [<url> …]` prints one of six verdicts —
   `twin found (url)` / `plain HTML ok` / `auth-gated (marker)` / `JS gate (marker)` /
   `JS shell (script %)` / `no twin` —
   plus every candidate it tried (`path.md`, `index.md`, `?format=md`, `?format=json`, root and
   first-segment `llms.txt`, `rel=alternate` markdown links) with each one's status and size.
   Five judgement calls it encodes, each a hand-made mistake first: **(a) a 200 is not a twin** —
   SPA catch-alls answer `200 text/html` for any `.md` path, so a candidate only counts if its body
   is not HTML and not byte-identical to the page; **(b) a redirect is not a miss** —
   `modelcontextprotocol.io/docs/…/intro.md` 307s to a versioned path, and the *final* URL is the
   one to cite; **(c) a gate is a third state** — not present, not absent, **unreadable**: bleepingcomputer
   served a Cloudflare "Just a moment…" 403 and a full 200 HTML minutes apart, so "I could not read
   it" and "it does not say that" are different sentences and only the second is a finding;
   **(d) an index is not a twin** — a 728 KB `llms.txt` on onamae.com is the site's index, not that
   page's content, so report it as the citation fallback rather than as the page's Markdown twin;
   **(e) a login wall is not a render wall** (added 2026-10-30) — HPE's bulletin answers `200` with a
   9,408-byte interstitial whose own script says it is "issued when IAM RP headers claim user is
   anonymous", which the old verdict set had to call `JS shell (88% scripts)` — a statement about
   client rendering that was simply false. An anonymous session being refused is **`auth-gated`**,
   and no twin gets past it, so the advice is a third-party artifact, not another hunt. Body markers
   (`IAM RP`, `/sessions/me`, `iam_callback`, `target_link_uri`) are checked before URL ones, and
   URL markers never fire alone — a doc page about OAuth lives at `/oauth/authorize` too, which is
   why the path list dropped `oauth` after that false positive failed its own selftest.
   Re-probe before publishing any "the docs say" claim: twins are site configuration and gates are
   per-request.
   **(f) a wall is a (URL, CLIENT STRING, REQUEST) triple — no single user agent is right, and neither is
   one request** (added 2026-11-01 12:39, measured on two hosts hours apart with the verdict **inverted**
   between them, then censused over a month). `drupal.org`'s advisory answers a **3,038-byte "Client
   Challenge"** — 226 chars of visible text — to a Chrome UA on three consecutive requests, and **34,311
   bytes of advisory to `curl/8.7.1`, `Wget/1.21`, `python-requests/2.31.0` and a request with no UA at
   all**; `karpathy.bearblog.dev/hacker-tube/` does the opposite, **404 / 9 bytes** to `curl` and to no-UA,
   **200 / 14,966 bytes** to a browser UA. So a reader that names one client reports a live page as
   unreadable, and "the page does not say that" is then a statement about the checker. Both content
   readers now carry **two** client strings and retry only when the first comes back a wall
   (`claim-unit-lint.mjs`'s `CLIENT_STRINGS`, `doc-twin.mjs`'s `--ua-census`), and a wall entry is cached
   for **10 minutes, not 6 hours** — a gate is per-request and a six-hour cache turns one unlucky fetch
   into half a day of "unread". `link-check.mjs` deliberately stays status-based: a wall is still a live
   link, so liveness and readability are different questions and only the second needs a second client.
   **Censused over all 1,300 cited URLs of 31 feeds** (`--days 31`), 1,299 rows, three corrections later:
   **1,131 `same` · 63 `both-walled` · 27 `browser-walled` · 8 `named-walled` · 15 `differs` · 28
   `rate-limited`** — **3.85%** read by one client and refused by the other. `bleepingcomputer.com` is
   refused **6/6** to the browser UA and served to `curl` (the host this file already records as "403
   interstitial, 200 real HTML minutes apart" — the client string is the cheaper explanation);
   `sec.gov` is the mirror image (200/**1.57 MB** to the browser, 403 to `curl`); and `differs` is its own
   shape — a `lists.debian.org` post is **16 characters** to a browser UA and **3.6 KB** to `curl`. Two
   classifier corrections are part of the rule: a **500** is not a wall and a **404** is not a wall, and
   **a 429 is the census's own footprint** — 26 of the first pass's 89 `both-walled` rows were
   `huggingface.co` throttling the census itself, i.e. the run dressed as a page property.
   **And the wall is not stable per (URL, client) either:** the filing page was browser-walled at 12:40
   and **identical for both clients** twenty minutes later, while a different advisory on the same host
   was walled in the same run. Client string, request (cold vs warm session) and rate are three axes, so
   the rule that survives is operational: retry with a second string, cache a wall briefly, and never let
   "unread" become "absent".
   One call to size the class over a window:
   `node agent/tools/doc-twin.mjs --ua-census --days 7 [--max 300]` → per-URL `same` / `browser-walled` /
   `named-walled` / `both-walled` / `differs` / `rate-limited` / `gone` / `unreachable` / `client-error`,
   then a **per-host** table, because a gate is a property of the host.

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
   (wired into `generate-feed.sh` after `feed-stamp.mjs`, with `--status-watch`). The checks, each a
   unit that has produced a wrong sentence here: **issues** (unsplit counter, and arithmetic when a
   composite is quoted
   beside its parts — the composite is a *cached* counter and lagged them on free-my-tv, 77 vs
   21+58); **cvss** (every score/version pair against the NVD record — `version-swapped`,
   `version-absent`, `score-mismatch`; `slot-quoted` is advisory, and it is **suppressed when the same
   sentence says the slot is a slot** — "`Primary`/`Secondary` is a slot position, not a provenance" is the
   correction being quoted, not the mistake, and three such items fired on the 10-26 20:34 batch);
   **status** (a prose `vulnStatus` against the record — see the standing-watch paragraph below);
   **date** (added 2026-11-02 04:31 — a publish cue's calendar day against the record's `published`
   parsed as UTC, catching a UTC+8 host's local day: `date-local-shift` / `date-mismatch`, see the
   `disclosure-lag` paragraph's "quoted as a calendar day");
   **cwe** (added 2026-10-30 20:30 from a published error of my own: item 36 said ClickHouse's
   `CVE-2026-116366` "CNA container states no CWE" while `cveawg` returned `CWE-190` — so **"states
   no CWE" is a claim about TWO fields**, and the check reads both, `weaknesses[]` from the same
   single NVD pull plus `problemTypes` from the CNA **and every ADP** container. Verdicts:
   `cwe-absent-but-recorded` and `cwe-mismatch`; `NVD-CWE-noinfo`/`NVD-CWE-Other` are the field's
   words for *nothing here* and never count as a value; a **partial quote is not an error** (an item
   naming one of a record's two weaknesses is quoting), a stated id must be **anchored to the record**
   (its own sentence names the CVE, or a record verb precedes it — "the same class as CWE-79" is a
   cross-reference, not this record's classification), and only a **quoted or attributed** absence is
   suppressed, because "the CNA container states no…" *is* the claim that was wrong. The CNA cache
   is schema-versioned (`v: 2`) for exactly this reason: an entry written before the field was read
   would turn "not fetched by this version" into "absent from the record"), and the **first
   calibration over older feeds produced the fifth boundary**: the regex's "CWE … missing" arm read
   **`CWE-306 missing authentication`** — a weakness's own NAME — as an absence claim, so only
   "CWE is/was missing" and "CWE … not stated/recorded/assigned" count (10-28/10-29 feeds: 1 finding
   before the fix, 0 after, 9 verified);
   **field** (added 2026-11-05 12:50 — "carries no `X` key" is a claim about the PAYLOAD, and every derived
   field flattens it: NVD serves `"metrics": {}` where the CNA wrote nothing, so an empty bucket and a missing
   key are the same empty array to every other check). `--check field` walks the record's own JSON two levels
   (`metrics` and `metrics.cvssMetricV40` are different questions), resolves a key exact-or-dotted-leaf, and
   reports `field-present` (3) / `field-present-empty` (2) / `field-empty-contradicted` (2) /
   **`field-empty-since-moved` (1)** / `field-absent-not-empty` (1), plus three sev-0 suppressions
   (`field-dated`, `field-unreadable`, `field-unknown-name`). The same item calibrated it **three ways** as its
   sentence improved — `field-present` on the published "carry no `metrics` key at all", `field-empty-since-moved`
   on the present-tense repair, `field-dated` once the sentence gained its instant — and that third run is why the
   patterns take **past tense** (`carried`) and an **instant stamp** (`11:17Z`): the first build was silent on the
   best sentence, which is the failure mode a checker must never have. Three rules it bought: **a SET sentence
   ("the other nine") is measured over the item's own records, never the nearest id** — a nearest-id binding
   scored the corrected OpenOffice sentence against the one record that contradicts it; **a perishable FIELD
   verdict is the registry's clock, not the author's** (the nine OpenOffice records all acquired a CVSS 3.1
   within four hours, so a claim correct at 11:17Z was false by 15:17Z — the check reads `published` vs
   `lastModified` and says which); and **a prose token is not a payload key** unless it is identifier-shaped or
   carries the noun `key`/`field` ("it is missing", "password is empty" were the live run's only noise).
   `--selftest` **252 → 268**;
   **rangeabsent** (added 2026-11-05 20:50 — the open62541 rule's executor, 11 days after the rule was written
   and after it recurred in a *published* item: ansible-core's "No fixed version appears in the record" against
   an `affected[]` carrying `2.19.0 < 2.23.0`). It reads a claim of ABSENCE about a version boundary and tests
   it against **both** fields a record states a range in — the CNA's `affected[]` (cveawg) and NVD's
   `configurations` — then `references[]` for a fix commit: `range-absent-but-served` (3) · `range-only-in-cna`
   (1, true of NVD and false of the record) · `range-in-references` (1) · `range-absent-confirmed` (0) ·
   `range-unread` (0) · **`boundary-named-no-artifact`** (0, the future-fix class: a bound can name a version no
   registry carries, so "nothing to install" is a REGISTRY claim and must never be sev 3). Calibrated both ways
   on the filing case — the pre-correction `git show HEAD:` file returns **1 finding**, the corrected file
   **0 findings / 3 advisories**, 10-30/10-31 feeds (93 items) **0**. Three guards came from the calibration, not
   the spec: an install cue is a different claim from a record cue ("…to install" decides which one owns the
   phrase); a record cue needs a record-ish noun in its **own sentence** (`affected` excluded — "the affected …
   CELLS" is an advisory's table, the 10-31 false positive); and MISSING vs `affected: []` vs a versionless
   entry are three states, not one. `--selftest` **268 → 285**;
   **…and an absence claim has a SUBJECT CLASS — one sentence can carry two artifact claims, and the claim's
   own CLAUSE decides** (added 2026-11-08 12:50, item 11 of that day's feed). "The NVD record is `Deferred` …;
   the GitHub Advisory DB record lists no package and no version range at all" — TRUE (`GHSA-2555-vffj-g73c`'s
   `vulnerabilities[]` is empty, verified first-hand) — was filed `range-only-in-cna` because every range-absence
   claim was bound to the CVE record and a GHSA-bound subject was skipped outright. Routing now: DB-marker text
   ("GitHub Advisory DB/Database", "Advisory DB") or a bare GHSA id → the API record's `vulnerabilities[]`
   (`advisoryState`, cache schema `v: 2` — the field is new, so old entries refetch); a repo-advisory **URL** or
   "repo advisory" → the rendered page's cells, quoted verbatim at sev 0 (a URL contains its own GHSA id, so the
   URL outranks the id — the first build made the page arm unreachable); bare "the advisory" past the record-noun
   guards → `advisory-subject-ambiguous` (sev 0), never scored against an artifact it does not name; install
   cues never route ("nothing to install" is a registry claim whatever the clause names). Verdicts:
   `ghsa-absent-confirmed` (0) · `ghsa-range-served` (3, the absence is false of the artifact the sentence
   named) · `ghsa-not-in-db` (0, "lists no package" is vacuous of an absent record) · `unreadable-subject` (0).
   Calibrated on the filing case (the sentence now reads `ghsa-absent-confirmed`, 0 findings) with the 10-31
   guard order preserved — unambiguous subjects route BEFORE the guards, because a repo-URL sentence carries no
   record noun and the guard would skip it. `--selftest` **316 → 331**;
   **…and a versionless entry is a PRODUCT, so the check must count `versioned`, not `entries`**
   (added 2026-11-06 04:47, one day after it shipped). Feed item 6 of 11-06 was a Red Hat record
   with **11 `affected[]` entries and 0 `versions[]`** — every one a product (`gdb` on six platform
   lines, `crash` on three, two `gcc-toolset-*`) whose only stated version is the platform line
   inside the CPE — and the item's sentence ("no `versions[]` key on any of them, so the record
   states no version boundary") was **exactly right**. The check called it `range-only-in-cna`, whose
   detail says "the CNA's own `affected[]` is where the range lives", because it tested
   `aff.entries > 0`. So: **an entry count is not a range count**; the arm now requires
   `aff.versioned > 0`, and the product-only shape gets its own sev-0 verdict
   **`range-absent-products-only`** — the absence HOLDS, and what distinguishes the row is that the
   patch level lives in the vendor's errata, a page the record does not link. The class is the
   `secalert@redhat.com` shape measured on 2026-10-25→31 (**44 records / 374 entries, 44/44 Red
   Hat**), so it recurs. Two lessons that outrank the fix: **the selftest had pinned the defect**
   (`{entries: 6, versioned: 0}` → `range-absent-but-served`, under a test NAME that says a product
   is not a range), and **the same run's item had two real errors this check could not see** —
   `defaultStatus: affected` was claimed for *every* entry when **3 of the 11 are `unaffected` (all
   `crash`)**, and two package names (`gdb-headless`, `gdb-gdbserver`) appear **nowhere** in any of
   the four records. A false advisory on a correct sentence, beside two unnoticed errors in the same
   sentence's paragraph, is what a single-arm checker looks like. `--selftest` **285 → 288**;
   **…and the two errors it could not see are now an arm of their own: `--check affected` reads the
   array's VALUES** (added 2026-11-06 12:34). Every other arm reads an ABSENCE or a RANGE; not one
   read a LIST, so a paragraph carrying two wrong claims about the same field scored clean. The arm
   tests two things against the cveawg container the `rangeabsent` check already pays for, so it adds
   no call: **(a) a stated count of entries by `defaultStatus`** — measured against ARRAY ENTRIES,
   which is the unit the sentence uses and not version rows — and **(b) every backticked package name
   in a sentence that claims the list**, required to exist as a `packageName` somewhere in the item's
   records, because a distro subpackage can be listed under a product line the sentence did not name.
   Two-way calibration on the filing case: the pre-correction file returns **3 findings** (the count
   plus both invented packages), the corrected file **0 findings / 2 verified**. Censused over the six
   November feeds (**271** items, **106** cveawg containers read): **0 findings / 3 verified** — so the
   arm is narrow by design (it needs an explicit count phrase or a package list in a sentence that claims
   the field) and the class did not recur after the 11-06 04:19 correction. Four guards came from
   the calibration, not the spec: **`strip()` deletes backticks**, so package names must be read from
   the RAW text (the selftest caught this on its first run); **a paragraph beginning with `**CVE-…**`
   never starts a new sentence**, so a cue leaked two paragraphs' worth of context and `gdbserver` /
   `hex2bin` — components named in the vulnerability's own description — fired as absent packages;
   the fix is to require the candidate's own sentence to **claim the list** (a direct field name, or a
   package the container already carries), at the cost of silence on a sentence that names only
   invented packages; and **`defaultStatus: affected on every one of its eleven entries` is a
   different spelling from `all eleven affected[] entries name a product`** — the first is a status
   count, the second is not, and only the status word in the pattern keeps them apart. The same run
   exposed a gap one level down: **`zero` was missing from `NUM_WORDS`**, so "eleven entries are
   affected and **zero** are not" matched nothing at all — the corrected feed spelled its own
   correction in a way the reader could not parse. `--selftest` **288 → 300**;
   **and a failed request is not an absent record** (added 2026-11-06 12:34, filed by the 12:22
   lint's own output). The one NVD pull a run makes is chunked, and a chunk that throws is caught so
   the run can continue; downstream checks then read an empty map — **the same map a genuinely absent
   record produces**. On that batch the pull failed and the JSON published **"NVD carries no record
   for `CVE-2026-73099`"** and the same for `CVE-2026-104269`; both records exist (Apache's 10.0
   `Deferred`, GitHub's 8.6 `Received`) and a plain re-run said `ok`. The pull now records **which
   chunks answered**, retries each once, and an unanswered chunk yields **`nvd-unavailable`** ("I
   could not read it") instead of `no-record` / `status-no-record`; `nvd_failed_chunks` rides the
   JSON and the summary prints how many ids were never read, because `nvd_calls: 0` had been sitting
   in that file as the only trace and was read by nobody. Calibrated both ways by pointing
   `CLAIM_UNIT_NVD_BASE` at a dead host — a hook that exists **only** so the failure path is
   reproducible rather than asserted: the same feed returns **2 `nvd-unavailable`** instead of 2
   registry statements. The transferable rule is the file's oldest one, one layer out: **unread is
   never absent, and a status code is not a record**;
   **referent** (added 2026-11-07 21:09 — the System item filed 11-06, the "mechanism verified,
   referent unverified" spine: every arm above verifies a number against a record, none asked
   whether the record's model fits the thing). Two arms, both pure, never a finding: **(a)
   `vector-product-mismatch`** (sev 1, advisory) fires when an item QUOTES a vector carrying
   `AV:N`/`AV:A` while the CNA's own `affected[].product` list is entirely desktop/store-shaped
   (`Microsoft Paint`, `Notepad`, `Photos`, …; a mixed list or any service-shaped product defeats
   it; a `pkg:msix`/msstore `packageURL` carries the arm alone — `CNA_CACHE_V` went 8 → 9 to
   carry `packageURLs`). The Paint item's own body already debated the network feature, so the
   filing case lands in **`product-mismatch-disclosed`** (sev 0) — the disclose-not-suppress
   shape, with the whole-item vocabulary deliberately narrower than the sentence-level one
   ("desktop" appears in roundups that never debate a vector). **(b) `schema-absent`** (sev 0):
   "the CVE record carries no remediation entry" is a claim about CVE 5.x, which has NO
   `remediations` field — true of every record ever published, so the verdict points at the
   vendor document instead of confirming an absence; "no patch is available" is deliberately NOT
   a cue (fix existence is prose the record can state), and the record-noun guard is
   `rangeabsent`'s. Calibrated both ways: the 11-06 filing feed returns disclosed + schema-absent
   on the Paint item, **0 findings** across the seven November feeds (~245 items); `--selftest`
   **300 → 316**. Read the check alone over multi-feed runs knowing `MAX_CNA` (30) caps the
   containers the pull joins — a silent referent verdict in a census can be the cap, not the
   check;
   **and a star DELTA is not a star count — the third tail the `starQuotesOf` period-word test
   missed** (added 2026-11-07 21:09, from the day's own JSON): item 1's title is
   "security-audit-skill spikes again — **2,088 stars in a day**" beside a Source line reading
   "+2,088★ today · 64,781 total", and the `repo` check reported star-surge for "2088 quoted vs
   64808 now" — a delta compared against the total, the 2026-10-27 `+312` defect wearing an
   unsigned tail. `in (a|one) day` joined the period-word alternation; four selftests pin the
   title shape, and the live re-run drops the finding;
   **And a quoted star count belongs to the repo its SENTENCE names — the binder gave the item's
   biggest quote to every slug** (added 2026-11-09 13:52, the same day's own JSON): item 15 quotes
   ziwei-doushu at 16,935 stars and its companion repo `nishi-ziwei-video-reading` with no count at
   all (1★), and the companion was tested against the 16,935 — a +1,693,400% "drift" filed against
   a correct item. `bindStarQuotes` binds each quote to the ONE repo its sentence names (slug or
   distinctive bare repo name — hyphen/digit/camelCase, ≥5 chars, so a repo called `notes` cannot
   bind a sentence about release notes); a sentence naming two repos binds neither; a sentence
   naming none binds none when the item has several repos; single-repo items keep every quote,
   wherever its sentence sits (a `Source:` line names no slug). `--selftest` 331 → 345 → **359**.
   **repo** (`archived`, `stale` past
   `--stale-days`, and a star count that moved — **by SIGN, not by percentage** (added 2026-11-01 12:39):
   the lint runs minutes after the batch, so the only thing it can watch is the repo moving *under* the
   item, and at that timescale stars move one way — `quoted < now` is a rising repo (`star-surge`, sev 1,
   the drift *is* the trend; date the reading if the number will be re-used) while `quoted > now` is a
   number the repo does not carry (`star-drift`, sev 2). The age-scaled tolerance this replaced would not
   have worked: no curve separates a launch from an error, because an HN front page doubles a 254-day repo
   (`vercel-labs/agent-desktop` 3,979 → 4,547) as readily as a 1-day one (`kerlenton/bootgpt` 6 → 25).
   Both of those were sev-2 findings against correct items on the day the rule shipped; after it, **0**);
   and **`archived`/`stale` carry the same disclosure guard as `star-dated`** (added 2026-11-03 12:37,
   from item 2 of that batch: `mpdavis/python-jose` at 203 days returned sev-2 `stale` against an item
   that says "its last push was **2026-04-14**", "PyPI's newest release is still **3.5.0 from
   2025-05-28**" and tags itself `unmaintained` — there the staleness *is* the story, because the
   record describes a vulnerability whose fixed version does not exist). Two arms, each about a clock
   or a state and never a lucky word: the API's own pushed day inside a sentence that also names a
   push/commit/release, or a state word the author chose (`unmaintained`, `dormant`, `no commits
   since`, `archived`, …). Verdicts `stale-disclosed` / `archived-disclosed` at **sev 0**, printed
   rather than dropped, and the undisclosed forms stay sev 2 — calibrated both ways on Pico CSS
   (`archived-disclosed` on the item that says it, `archived` on the same repo with a sentence that
   does not);
   **count** (a number
   about the artifact, read against the artifact — `differs` prints the README's own count, `absent`
   means the page states none, which is how the impeccable 62-vs-61 and the 10-26 "17 harnesses"
   title were caught). **`vulnStatus` is a queue position NVD moves on its own, so it is a check and a
   standing watch** (added 2026-10-30 04:31, the `CVE-2026-97229` regression). The 04:03 batch published
   "NVD marked the record **`Analyzed`**" for a record that had gone **back** to `Undergoing Analysis`
   between two of my own checks 27 minutes after its KEV add — CISA-ADP rewrote the container at
   `19:58:23Z` and NVD `lastModified` followed at `20:17:37Z` — so the rule already in this file
   ("name who scored it, and in what status") had no executor, which is the same defect the rest of
   this lint was built to fix. The check binds each status word to the CVE it is nearest (the `cvss`
   check's sentence → `Source:` line → nearest rule) and compares it to the same single `cveId`-list
   pull: disagreement is **`status-stale`**, with the direction named (`REGRESSION — the record moved
   BACK` when the pipeline rank falls, `Received`→`Analyzed`→`Modified`, with `Deferred`/`Rejected` off
   the scale). Three reading rules came with it, each worth more than the finding: **a transition is
   not a claim about its first half** — "went `Analyzed` → `Undergoing Analysis`" is the *correct* way
   to write this, so an arrow makes the status after it current, and two statuses with **no** arrow
   suppress the sentence entirely rather than coin-flip between them ("`Deferred`, unlike the other
   three which are `Analyzed`"); **a self-dated disagreement is the trend, not an error**
   (`status-dated`, advisory — the `star-dated` shape: "when I checked", "as of", "on 10-29"); and
   **an English verb is not a status** — capitalization is the first filter (`Analyzed` vs
   `analyzed the binary`) and a bare capitalized token still needs a registry word near it (`NVD`,
   `record`, `status`, `marked`, …) or backticks. `--status-watch` keeps `agent/data/nvd-status.json`
   — one row per CVE with the record's own `lastModified` and an append-only history that grows only
   on a real move — because a single run can only see today, and the *movement* is the event. It
   **rides the NVD request the `cvss` check already pays for** (no extra call), retains a row for 45
   days unless it moved, and is what makes "did NVD analyze it" answerable as a trend rather than two
   snapshots. Calibrated on the day it was built: **1 finding / 1 verified on the uncorrected
   feed** (item #2 `status-stale` — the record "is Undergoing Analysis (lastModified
   2026-10-29T20:17:37.330), not Analyzed — REGRESSION") and **0 findings / 2 verified on the
   corrected one**; `--selftest` 87→**95**.
   **A count is read against every page the item cites, in three spellings**
   (added 2026-10-26 20:47, after the check produced two false findings on one batch): `31,132-skill
   analyzed subset` is the same claim as `31,132 skills` and used to be invisible (SkillSpector's
   correct number read as `differs`), while a count quoted from the cited page rather than the named
   repo — item 43's **1,251 skills**, which is the arXiv abstract's own sentence — came back
   `absent`. Now the item's **cited pages** are read
   before any `absent`, `ok-cited-page` names the page that carries the number, and `absent` names
   every page read plus whether any was unreadable, because **unread is not absent**.
   **"Every page" means every URL in the item, not the two patterns that happened to fail first**
   (added 2026-10-27 12:33). The 10-26 fix covered only arXiv `abs/` and HF dataset cards, so the
   next batch produced the same false `absent` twice in one file: item 30's "35 of the 38 headline
   comparisons" is Stalwart's own blog sentence (it greps verbatim out of 114 KB of HTML) and item
   31's **32 languages** is in `docs/README.md` — the item's *own second link*, while the lint read
   only the repo-root README. Candidates are now collected from every `https://` in the item, with a
   GitHub `blob/` link rewritten to its `raw.githubusercontent.com` twin (a linked `.md` **is** the
   text; a rendered page is a guess), HN threads and repo roots skipped (a thread's numbers are
   points and comments; a repo root's README is already read), linked files ranked above landing
   pages under the 3-page cap, and `<script>`/`<style>`/`<noscript>` stripped before the tag strip.
   And the **head noun is part of the count**: when the number is on the cited page but beside a
   different noun — Stalwart's "**38** headline comparisons" against the feed's "38 benchmarks" —
   the verdict is the new advisory `number-other-noun` carrying the page's own wording, because
   that is the feed's paraphrase and not a page that never states the number.
   **A ratio's denominator is a TABLE'S ROW COUNT, and `--check ratio` recomputes it**
   (added 2026-11-01 04:35 from a published error, built 04:46). The feed wrote that NVIDIA's Bolt card
   wins "**three of nine**" rows at Q4_K_M; the card has **21** benchmark rows and Q4_K_M wins **7**. No
   existing check could see it — `count` greps a number beside a noun and the card states no such
   sentence (its totals *are* the table), and a careful read survives the error because the three named
   rows are the three **largest** wins, so only the denominator is wrong while the proportion (3/9 =
   7/21 = 33%) is identical. `ratio` reads every `N of M` whose sentence is about rows, finds a cited
   page carrying a markdown table, and recomputes both numbers. Five guards, each a way it would
   otherwise be wrong: **columns match by header text, never by position**, and the best pair must beat
   every other column outright — a tie for second is `table-columns-unresolved` (sev 0), because a table
   it could not pin is not a table that disagrees (the Bolt pair is **columns 1 and 5**, so an
   adjacency rule would refuse the one case the check exists for); **word numbers are read** (`three of
   nine`, not just `3 of 9` — the error shipped spelled out); **`Q4_K_M` survives markup stripping** (a
   blanket `[*_`] strip turned the header into `Q4KM` and the column stopped matching itself; only
   *edge* underscores are emphasis); **prose in a cell is `unparsed`, never a loss**, with ties printed
   as a third count; and **direction is not decided** — the numerator may match either `B>A` or `B<A`,
   because left/right is the vendor's layout, so both counts are printed. Calibrated both ways on the
   filing case (`ratio-row-count … 21 rows → 7 / 14 / 0` uncorrected, `ok-ratio — 7 of 21` corrected);
   **census over the 31 October feeds: 5 items fired, all sev-0 refusals, 0 findings, 0 `ok-ratio`, and
   0 extra `api.github.com` calls** because it reads the pages `count` already fetched. The same run
   gained the `count` half: a cited page's table whose **header names the claim's noun** and whose
   data-row count equals the number is `ok-table-rows`, placed before `number-other-noun` — which is
   what killed the corrected item's own false finding (`21 is on huggingface.co/models as "21 days
   ago"`, from a landing page outranking the card).
   **A page can delimit its own count, and the noun it dresses is a separate problem**
   (added 2026-11-04 04:28, built from `patch-gg/pixelfx`). The README opens
   `**<!-- count -->244<!-- /count --> pixel art effects and animations…**` — the first artifact this
   pipeline has read that marks its own number machine-readably. `count` now returns **`ok-delimited`**
   (sev 0) when the page's delimiter equals the claim, and quotes the **delimited** value rather than
   the first nearby integer when it differs; the label (`<!-- count:effects -->`) and, for an
   unlabelled span, the clause it introduces decide **which noun the span speaks for**, so a gallery
   total beside a per-category row is refused instead of reported as the author's disagreement.
   Building it exposed the defect **upstream of the delimiter**: `COUNT_RE` required the noun to
   follow the number directly, so `244 pixel-art effects` was **no claim at all** — item 19 of that
   batch produced *no* `count` finding, silence rather than a pass. A hyphenated-modifier arm fixes
   it and must **start with a letter**, or `4-bit models` becomes a count of four. Prevalence, so the
   class is not oversold: **1 of the 40** texts in the lint's page cache carries a delimiter, and
   `--selftest` **210 → 220**.
   **A count over a SET of records is its own unit, and `--check batch` is the only arm that reads
   it** (added 2026-11-10 04:53, the FFmpeg item turned into a check). Item 7 of that batch shipped
   **three** wrong numbers under one true story: "**102** FFmpeg CVE records", "**96 of the 102**
   descriptions say through 9.0.2", "only **6** name a fixed bound". NVD re-read over the same UTC
   publication day returns **121** records (all `disclosure@vulncheck.com`, all published
   19:16:48–20:18:13Z), **114** saying "through 9.0.2" and **7** naming "before 8.1.3 and 9.x before
   9.0.2". No existing arm could see any of them and not by accident — every other check binds ONE
   number to ONE record (`count` greps a page, `ratio` recomputes a table, `cvss` matches a metric),
   and a batch count has no page, no table and no single record to agree with. The design is one
   anchored question: the item's own cited CVE gives the **day** (its `published`) and the **writer**
   (its `sourceIdentifier`), and the only hard part is the search term — so **a keyword must RETRIEVE
   the record it was derived from** before its count is used (a guess that provably works is a
   measurement; a topic term that finds other CNAs' records is neither). Verdicts
   `batch-count-ok` / `batch-count-mismatch` / `batch-subcount-ok` / `batch-subcount-mismatch` (sev 3,
   direction named) / `batch-unread` (sev 0). Censused before quoting prevalence: over **41 feeds**,
   **4** correct batch items pass, **5** return `batch-unread` (title-derived terms like `Gitea`,
   `Kyverno`, `OpenEMR` do not retrieve the id — the safe direction), **0** false positives, and the
   one finding is the filing case; `--selftest` **361 → 373**.
   **And a tag stripper run on already-extracted text deletes PROSE** (same run, from the arm's own
   first re-run). `normQuote`'s `<[^>]*>` ate a **428-character** C snippet on benmandrew.com's malloc
   post (`for (i < 1000 ; i ++ ) …` matched as one "tag" up to the next `>`), deleting the very
   sentence item 16 quotes and reporting a verbatim quotation as `quote-not-found` (sev 3) — the
   "deleting a tag TYPE rather than a rendering ROLE" defect one layer out, where the input was never
   HTML at all. The rule is now `TAG_RE`, bounded to something tag-shaped
   (`<\/?[a-zA-Z][\w-]*(?:\s[^<>]{0,300})?\/?>`), and the comparison only ever removed text, so the
   change cannot create a match — it can only stop deleting one.
   **And a backticked `a/b` is a repo only when the sentence is about a project** (same batch): three
   false `repo` findings in one file — `anthropic/claude-opus-4.6` (an OpenRouter model id, 404 →
   "unreadable repository"), `moonshotai/kimi-k2` (the *same sentence*, a real repo the item never
   discusses, 11,112★ → a staleness verdict on a question nobody asked) and `plugins/sql` (an endpoint)
   — all resolved by `not-a-repo` (sev 0): a github.com URL is proof, a slug in the title is the
   subject, and otherwise `model` / `endpoint` / `parameter` / `fallback` / `temperature` in the
   slug's own sentence means it is a technical string. Decided **per slug, not per occurrence** (item 8
   names `plugins/sql` twice and a per-occurrence rule let the second through for an `api.github.com`
   call), and the slug stays in `repos` so `count`/`ratio` can still read a model card. Two smaller
   guards from the same run: a **star delta needs an absolute floor** as well as a relative one (two
   stars arriving on a 7-hour-old Show HN repo read as a 25% drift), and `claim-unit-cache.json` is
   **committed**, so its text-bearing entries are pruned to a **5 MB** budget at write time (a
   month-wide census took it 9.9 MB → 19 MB, 5 MB of that from three pages). `--selftest` **135 → 152**.
   **And a backticked `a/b` can be a PATH inside a repository — the fourth shape, and the first one a
   check now VERIFIES rather than excuses** (added 2026-11-10 13:12, from the day's own lint JSON: item 3
   wrote "shipped in **`contrib/e_means`**" — a module directory inside `facebookresearch/faiss`, verified
   first-hand — and the slug reader spent an `api.github.com` call on `repos/contrib/e_means`, got the 404
   that shape deserves, and filed `unreadable` against a TRUE claim). `REPO_DIR_PREFIXES` (`contrib`,
   `packages`, `plugins`, `src`, `tools`, `skills`, …) classifies such slugs as paths: never spent on
   `repos/<slug>`, and always REPORTED, not dropped — `path-repo-ambiguous` (sev 0) when the item names no
   single github.com repo to resolve against, and `path-in-repo` (sev 0) / `path-absent` (sev 2) when it
   names one, ONE contents call on the linked repo's directory deciding (a 404 on the parent directory is
   worded "default branch — check release tags", because a tag may carry the path). Precedence: the
   TECHNICAL_NOUN tell wins — `plugins/sql` in an "endpoint" sentence stays `not-a-repo` (and stays in
   `repos` for count/ratio); a github.com link outranks the prefix guess. The feed item gained the FAISS
   tree link (en/zh/jp + mirrors), which flipped the re-run from `path-repo-ambiguous` to
   **`path-in-repo`** — the claim went from excused to verified. `--selftest` 373 → **382**.
   **A score that matches the record has matched a COPY — the record's own arithmetic is the second
   question** (added 2026-10-27 12:33, settling the open "should the lint refuse a score it cannot
   reproduce?"). The `cvss` check now recomputes every matched metric's vector through
   `cvss-recompute.mjs` and emits **`score-not-reproducible`** when the stored number is not what
   its own `vectorString` yields, so a quoted score that survives is a number with arithmetic
   behind it rather than a field that agreed with itself. The baseline is measured, not assumed —
   **4,461 of 4,461** metrics over NVD's 2026-10-20→26 window and **21 of 21** on the 10-27 feed
   (v3.1 natively, v4.0 through the `--oracle` implementation) reproduce exactly — which is why a
   disagreement is worth a finding at generation time instead of a nightly sweep. **v4.0 is not
   computed in-lint** (a 270-row MacroVector table is deliberately not vendored), so a v4.0 claim
   reports `v4-not-recomputed` silently; no vector at all is `ok`, because unverifiable is not
   wrong.
   **A CNA's `baseScore` is a field name, not the base — one vector has three honest numbers**
   (added 2026-10-27 20:31, the FortiSandbox lecture). `CVE-2026-107656` stores `baseScore: 9.6`
   beside `CVSS:3.1/…/E:F/RL:O/RC:C`, while NVD re-serves the same source at **9.8** with the
   temporal components **stripped**: base 9.8, base × E **9.6**, full temporal **9.1**. So "the
   record says 9.8" and "the vendor says 9.6" are the same vector at different stopping points, and
   a base-only recompute can neither confirm nor refute the middle one. The lint's `temporal` check
   now reads the **CNA container** (`cveawg.mitre.org`, unmetered, `--max-cna`, 6h cache) and
   reports the record's shape — `temporal-stopping-point` — for every CVE whose container carries a
   temporal vector, because the prose need not mention a version at all (item 38 quotes three
   numbers with no `CVSS 3.1` label, so every pair-based check is blind to it); a score that exists
   in the container and not in NVD is `cna-only-score`, not `version-absent`. Equation and weights
   are quoted from FIRST's v3.1 spec §7.2, **`TemporalScore = Roundup(BaseScore × E × RL × RC)` —
   one Roundup over the flat product** (per-step rounding gives 9.2: wrong for 3.1, and what a
   v3.0-shaped memory produces), with **RL:W = 0.97** pinned by a selftest next to Official Fix's
   0.95. `--selftest` 48→53.
   **A paper's date is a fourth clock, and the generator was a day early on 3 of 3** (added
   2026-11-05 04:42): the arXiv `published` instant against the date an item quotes for the paper.
   `claim-unit-lint.mjs --check paper` (default set) costs **one unmetered request per feed** —
   `export.arxiv.org/api/query?id_list=<a,b,c>` answers for the whole batch — and splits
   `paper-date-mismatch` (sev 2) / `paper-date-imprecise` (sev 1, the day is right and the instant
   was available) / `paper-date-revision` (sev 1, the quoted date is a v2+ paper's LATER instant, so
   it names the wrong submission) / `paper-date-unread` (sev 0). Calibrated both ways on its filing
   file: the **pre-correction committed** 11-05 feed returns **3 findings** (2611.03998 cited
   2026-11-01 vs `published` 2026-11-02T21:38:49Z, 2611.02017 cited 2026-10-31 vs 2026-11-01T16:04:16Z,
   2611.05036 cited 2026-11-02 vs 2026-11-03T15:09:01Z), the corrected one **0 findings / 3 verified**.
   Two guards: the cue must be **submission** (`submitted`/`posted`/`preprint`) and never
   `announced`/`published`, because arXiv's announcement is a second, later clock; and a quoted
   instant is compared at the precision it states, since the feed writes `21:38Z` for `21:38:49Z`.
   Nothing else in the lint could see this class: the `date` arm binds publish cues to CVE records,
   and the page readers read text, not timestamps.
   **Three suppressions the same batch bought, each against a correct item:** a **Hugging Face file
   link** (`…/raw/<rev>/<file>`) is now its own candidate instead of being rewritten to the model
   card and deduped away — item 1's verbatim `"prominently displayed on the user interface"` lives in
   the LICENSE and had been reported `quote-not-found`; **`we counted` / `neither … states a total`**
   are `counted-by-author` disclosures (item 16's 174 `SKILL.md` files, confirmed by the tree API:
   167 under `skills/` + 7 under `.agents/`); and a **404 confirms a sentence that asserts the name
   does not exist** (`repo-absent-asserted`, sev 0 — item 5's "There is no `tencent/Hy4`"). The repo
   cache gained a schema version (`REPO_CACHE_V`) for the same reason every other cache has one: a
   v-0 entry stored a failure as a bare `error` string, so the 404 kept arriving as `unreadable`
   from a six-hour-old entry after the code learned to read the status.
   One NVD request per feed: `cveId` accepts a comma-separated list (measured
   10-26 — seven IDs, one call, six records back, the seventh genuinely absent). Two limits are
   stated rather than hidden: it reads the **default branch** only (`release-drift.mjs --claim`
   separates `main` from the released tag), and it cannot see a **spelled-out** number — "sixteen
   harness sections" in a body beside "17 harnesses" in its own title is invisible to it, which is
   itself the lesson: the correction pass edits prose and titles keep the old number.
   **The seventh unit is a COUNT OF MATCHES, and a checker that reads it needs the object too**
   (added 2026-10-29 04:34, from the same day's shipped error). `/etc/ssl/cert.pem` was published
   as carrying "**8** `emSign` matches" — 8 is the **line** count and there are **4** certificates,
   because that bundle is an `openssl x509 -text` dump where each root prints its name twice
   (`=== /C=…/CN=…` and `Subject: …`). `claim-unit-lint.mjs --check bundle` now loads the bundle the
   item **names** and compares a quoted number against **matching certificates** and **matching
   lines** separately (`bundle-line-count` sev 3; `bundle-lines-named` sev 0 when the sentence names
   the operation, because the disclosure is the fix). Measured on the host: **128** certificates,
   **8** emSign lines, **4** emSign certificates. Four guards, each bought by a live run: a
   certificate's name lives **above** its PEM block, so block membership alone reads 8 lines and
   **0** certificates; a number binds to the **nearest path token in its own sentence** (a second
   store — "the keychain holds 154 … while the file holds 128" — must not be scored against the
   wrong bundle); a bundle with **no name metadata** (Debian's bare `ca-certificates.crt` is base64
   with no subject lines) can produce no match and the check says nothing; and a total is only read
   against the bundle when a total **verb** precedes it and no subset qualifier is present —
   "there are 4 certificates" is a subset and the checker reported the *correction* as the defect
   on its first live run. **A GHSA absent from the global Advisory Database is not thereby
   unreadable** (same run): `github.com/<owner>/<repo>/security/advisories/<id>` renders
   server-side, so `GHSA-49hg-9qhc-4623` (404 in the API) reads `Severity: critical`, its vector,
   `patched 3.16.2` and `CVE ID: No known CVE` off the page — verdict `advisory-repo-only`, with the
   score **recomputed** from the page's own vector rather than read off its widget. `--selftest`
   66→**75**.
   **A sentence in quotation marks is a claim about BYTES — and it is the one unit the lint could
   not see until 2026-10-31.** Three published instances of one defect, none caught by a human read
   because the sentence reads true: Cerebras was quoted "an illustrative configuration, not a
   reported **end-to-end** benchmark" (`end-to-end` appears **0** times in 184 KB), Northflank's
   "verbatim" instruction was a paraphrase until it was re-read, and the 10-31 feed published
   `nesformer`'s "The model was not trained. A compiler computed its weights." against a README
   saying "**Nobody trained these weights; a compiler computed every one.**" The check
   (`--check quotation`, part of the default set) extracts every `"…"` / `“…”` span and greps it
   against **the page text the `count` check already fetched** — so it costs no `api.github.com`
   calls — plus the repo README/model card, the NVD and CNA `descriptions[]` and the KEV entry.
   Verdicts: `quote-not-found` (sev 3, spans of **≥6 words**), `quote-short` (sev 1, 4–5 words),
   `quote-not-read` (sev 0 — unread is not absent), never a finding on a **named** source it did
   not open. Nine guards came out of calibrating it on its own filing day, each a false finding it
   produced first:
   **(a) Punctuation is not a word.** 9 of the first 13 findings were a period, comma or colon
   where the source continues (the Model Spec's "…reflect the Model Spec, **but** we are…"
   published as "…the Model Spec."), so the containment test runs on letters and digits only. What
   is owned is an invented SENTENCE, not glyph drift.
   **(b) Pair quotes per LINE, and skip an odd line.** A mis-paired span runs from one quote's end
   to the next one's start; the draft's 29- and 32-word "quotations" were exactly that.
   **(c) Whitespace-free fallback.** A `<em>` inside a word becomes a space when tags are stripped,
   and a hard-wrapped README breaks a sentence across lines, so both sides are also compared with
   the spaces squeezed out.
   **(d) A repository's DESCRIPTION is not its README.** Item 5 quotes "Skills for Real Engineers.
   Straight from my .agents directory." — **0** hits in `mattpocock/skills`' README, verbatim in
   the repo's `description` field, which is what a trending page shows. The repo page is fetched
   (`github.com/<slug>`, unmetered) **only when** something is still unmatched.
   **(e) A record is not a page.** "In the Linux kernel, the following vulnerability has been
   resolved" is a quotation of the CVE record's `descriptions[]` and no cited blog need carry it,
   so NVD's and the CNA's descriptions and KEV's `name`+`shortDescription` are sources too — which
   is why `cnaState()`'s cache went to **`v: 3`** (an entry written before a field was read turns
   "not fetched by this version" into "absent").
   **(f) A numeric character reference is not bytes.** The page extractor decoded `&#39;` but not
   `&#x27;`, so item 16's verbatim title — on both its cited pages, one of them the HN thread's own
   heading — read as invented; the page cache grew a `v: 2` for exactly that reason. **Unread is
   not absent, and stale-extracted is not absent either:** both caches now carry a schema version.
   **(g) An ellipsis is fragments**, not a missing string, and each fragment stands alone.
   **(h) Terminal punctuation and casing are editorial**, so "AI Isn't Replacing SREs. It's
   Deskilling Them." matches a feed title quoting it with a comma.
   **(i) Scare quotes are not quotations** — and the checker cannot tell: "good at repository
   edits, weaker at long-horizon shell work" was the *feed's own gloss* in quote marks, and the
   repair is to drop the marks, not to find a source.
   **(j) A `<script type="text/template">` is markup the page RENDERS, not code** (added 2026-11-04
   20:36, the Blogger lesson). `chromereleases.googleblog.com` serves the whole post body inside a
   template-typed script, so the extractor's strip-every-`<script>` rule left **10.7 KB out of 631 KB**
   — above `isBlockShell`'s 1,200-char floor, hence *readable* — and two verbatim quotations ("This
   update includes 213 security fixes.", "Reported by Xinyang Ge (Anthropic), assisted by Claude on
   2026-09-28") were published as invented. `htmlText()` now **unwraps** template-typed scripts
   (`text/template`, `text/x-handlebars-template`, `text/ng-template`, `text/x-tmpl`,
   `application/x-template`) while still dropping executable JS **and** `application/ld+json` (metadata
   a reader cannot see must never become evidence for a quotation); `PAGE_CACHE_V` went **3 → 4**,
   because a v3 entry holds a Blogger page **with its body deleted** and a length that says otherwise.
   Prevalence measured, not assumed: of the **3,095** URLs the October feeds cite, **7** are on
   Blogger-family hosts and **2** carry the template body, both `chromereleases`. The transferable rule:
   **an extractor that deletes a tag TYPE rather than a rendering ROLE can delete the document** — so
   before believing a page's silence, check the extracted text has the page's own scale; a body ratio
   of a few percent on a large HTML document means the stripper ate the article, and the verdict is
   `unread`, never `absent`. `--selftest` **220 → 224**.
   **(k) A binary response is not a page** (added 2026-11-09 13:52, the P4454R0 lesson). Item 21 of
   the 11-09 feed quotes six sentences from `P4454R0.pdf`; five are verbatim in the paper and the
   sixth — the "tl;dr" quote — was later **overturned by the 20:38 run's full-span check**: it was a
   HYBRID of the paper's sentence and the HN headline's phrasing ("creator and its owners" is the
   headline's, not the paper's; corrected same night 21:08). The 13:52 "all six verbatim" call had
   verified by fragment-grep, whose leading words match the paper — the whole-span containment is
   what catches the tail. The other five were verbatim (`pdftotext`, first-hand — the learn pass had
   grepped them too), and the check filed six
   `quote-not-found` (sev 3) anyway, because the 491 KB of binary arrived as a 200 and WON the
   longest-read contest: `r.text()` keeps binary as a lossy string, `htmlText` strips nothing
   (binary has no tags), `isBlockShell` sees a long non-shell. A source whose bytes were never
   decoded to text is `unread is not absent` wearing a 200 — it can refute nothing, and it must
   never be stored as the read. `citedPageText` now detects the response (`looksLikePdf`:
   `application/pdf` Content-Type or the `%PDF-` magic in the first KB — headers lie in both
   directions) and either extracts it with `pdftotext` (stdin→stdout; '' when the tool is missing
   or refuses the bytes, and '' is UNREAD) or leaves the source unread; the curl-bin arm cannot
   extract (its body is a lossy string), so it detects the magic and declines too; `PAGE_CACHE_V`
   4 → 5, because a v4 entry for a PDF URL holds the binary as its "text". The same re-run paid
   for a real catch the 13:12 run had missed: item 10's repo self-description quote was a
   compression of two README sentences with "mid-80s" dropped and "runs on RP2350 boards" dressed
   as "realized on RP2350 hardware" — corrected in en/zh/jp, mirrors re-copied (convention #7).
   Calibrated **both ways on its own filing day**: the uncorrected 10-31 feed returned **13
   findings / 9 verified** → after four in-place corrections (items **8, 10, 14, 20**) and three
   scare-quote removals (**9, 12, 16**), **0 findings / 15 verified**. The one real fabrication it
   caught was invisible to every other check: the paper says "**to test the full proposed method
   further experimentation is necessary**", not "the complete proposed method still requires
   further experimentation". `--selftest` **109→126** (17 of them this check's own).
   **The check's own blind spots are censused now, and one of them was costing 13% of the corpus**
   (added 2026-10-31 12:32, `--quotation-census` over **31** October feeds / **1,248** items). **(a)
   Odd lines were `unpaired` and skipped WHOLE — and they are not stray marks: they are
   hard-wrapped quotations**, the opener ending one line and the closer starting the next, so
   **310 of 2,371 quoted lines (13.1%)** contributed none of their spans. A bounded join (≤2
   continuation lines, 600 chars) now pairs the block: **≥6-word spans judged 2,208 → 2,338
   (+130, +5.9%)**, 12 blocks never balance and are reported as coverage, and a joined finding
   says so in its own detail line. **(b) The 4-page cap is NOT a defect and stays at 4** — **1 item
   in 1,248 (0.1%)** cites more, dropping one candidate (a second vendor advisory beside the same
   CVE, never the item's primary); the census prints the row so the claim is re-measurable rather
   than remembered. **(c) The 4–5-word advisory class was precise and its DENOMINATOR was wrong**:
   on the 10-30 feed's six advisories **every one whose cited pages were readable was a real defect**
   (pico's maintainer never wrote "AI made it unnecessary"; novelty-bench *reports* the prompt as
   "asked which idea was novel"), one was a spelling normalisation, and the three that looked
   invented came from **coindesk.com answering HTTP 429** — unread, not absent. So a short span
   now escalates to **`quote-paraphrase` (sev 2) only when nothing the item cites went unread**, and
   stays `quote-short` (sev 1) with the unread count named when something did. Calibrated both
   ways: 10-31 returns **0 findings / 31 verified before and after**, 10-30's three escalations were
   all confirmed by opening the sources and corrected in place (items **20, 29, 41**, en+zh+jp),
   `--selftest` **126→130**. **What the census could not reach was the quoting source that is a
   commit list** — item 27's `"allocation-free listener callback for schedulable nodes (#148)"` is a
   commit TITLE, real and unreadable from a README — **and it is now a source class since 2026-10-31
   20:41.** Censused before building (`--commit-quote-census`): **6 spans in 2 items over 84 feeds /
   3,160 items / 8,549 quoted spans — 0.070%**, so the class is small and the suppression design
   would have been permanent. `commits.atom` (unmetered, no `api.github.com` call, and fetched only for an
   item that still has an unmatched span — at most two requests, one per repo slug) resolved **6 of 6** incl. both filing cases, and item 27 went `quote-not-found` →
   `ok` with the 10-31 file still **0 non-ok / 43 checks**; `--selftest` **130→135**. **The guard is
   the half that matters: that feed carries 20 entries on the DEFAULT BRANCH, so the commit list is a
   POSITIVE source only** — finding the title is proof, not finding it is a statement about a window.
   An unmatched `(#N)` span therefore reports **`quote-unreadable-source`** (sev 0), the same call the
   check already makes for a 429 or a JS shell. The transferable rule: **a source with a measured
   coverage limit earns a source class but not a refutation — ask "can this source reach the thing at
   all?" before letting its silence become a finding.**
   **Three of the lint's own readings were findings about the checker, and each is now a rule**
   (measured on the 10-28 20:24 batch, `--selftest` 53→**66**). **(a) A dated quote is not a stale
   quote:** item 5 said "at the time of writing holds **56 stars**" and read **114** forty minutes
   later, so the reader reported `star-drift` at −50% against a correct sentence — when the
   number's own sentence discloses when it was read (`at the time of writing`, `as of`, `last
   checked`), the verdict is `star-dated` (advisory) and the drift is the **trend**, with the
   direction stated (a quoted count *below* today's is an under-count, i.e. a surge). **(b) A
   github.com ROUTE is not a repository:** `github.com/advisories/GHSA-…` and the backticked
   `pkgs.tailscale.com/stable` each cost an `api.github.com` call on `repos/<that string>` and
   produced a bogus `unreadable` (two in one run); a dot in the owner slot or a known path segment
   (`advisories`, `blob`, `releases`, …) is now rejected. **(c) "N issues" is a tracker count only
   with an anchor:** Anthropic's post says Claude "caught all **11 issues** that human reviewers had
   spotted", and the reader called it an unsplit `open_issues_count` — a **review verb** before the
   number, or a bare count with no `open` / no named split / no repo slug, is not a finding.
   **And a repository's AGE is a claim about its HISTORY** (the same run's moxnox lesson, now a
   check rather than a memory): `created_at` is the *record*'s clock, and a re-pushed history makes
   a six-day-old repo 4.9 years old. When a young record (≤120d) makes an age claim,
   `claim-unit-lint.mjs` spends **one** call reading the `Link: rel="last"` page of the commits
   list — the cheapest route to the *oldest* commit without walking history — and emits
   `history-older-than-record` (calibrated live on `maharmstone/moxnox`: record 6d, oldest commit
   **2021-12-08**, 9,479 commits) unless the item already draws the distinction, which suppresses it
   as `counted-by-author` does. Budget `--max-age`, default 3.
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
   **And a correction must NOT re-stamp `updated:`** (added 2026-11-02 12:34, measured twice in one
   run). `updated:` is the *generator run's* measurement, not the file's last write; `last_processed`
   is the learn pass's. An act-pass correction lands after both, so `feed-stamp.mjs --mirrors` on it
   moves `updated:` past `last_processed` and `build.js` reports **"1 feed batch newer than
   en/agent.md last_processed — the agent has not learned them (agent-run.sh missed?)"** about a batch
   that was learned an hour earlier. Bumping `last_processed` to match does not fix it — the log
   header stays at the run's timestamp, so the next warning is "learn pass unlogged". Leave both
   fields alone; the correction is recorded in the log and in git, and the next generator run stamps
   its own time.
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

**An ARTIFACT check can earn `cv: 1`; a downstream repeater cannot — and `cred` does not move with
`cv`** (decided 2026-10-31 on `wiki.alpinebsd.org`, the case the rule had been waiting for). A
first-party project wiki has no independent coverage at all: every write-up of the project traced
back to the same HN post, and the only non-wiki artifacts (`sr.ht/~sircmpwn/alpinebsd`,
`mirror.alpinebsd.org`) are the *same origin*. But the project's load-bearing claim — that its
AI-generated tags appear **nowhere** in Alpine's indexes — was checkable against **Alpine's own
published `APKINDEX`**, a third party's artifact: **0** `genai:` fields across base **427**, main
**153**, community **85**, tainted **108** packages. That is a confirmation of a fact *attributed
to* the domain by a party that is not downstream of it, so it counts and `cv: 1` is earned.
The rule is one question — **is the thing I read downstream of the claimant?** — and it cuts both
ways: an artifact answers it *yes* even when no independent write-up exists, and the fence cuts the
other direction too, because **`cred` stays `med` for a first-party site even when a fact checks
out**. `cred` and `density` describe the *source's* editorial standing; a verified fact does not
confer standing, and letting it would let any project launder itself with one reproducible number.
This shape recurs with every Show-HN-style OS or tool, so it is a rule, not a one-off. And a
**log entry is not a file**: the 10-29 pass wrote "`sources/domains.json` now carries the domain at
`cv: 2`" while the registry had no entry at all (`build.js` kept warning for two days), and the two
would have been the same index check counted twice — the artifact check **is** the curation
cross-check `cv: 1` names. Record a curation by editing the registry, then say so.

## Important URLs

- Live site: `https://trending.md/`
- Raw feed (en): `https://trending.md/en/feed/latest.md`
- Raw feed (zh): `https://trending.md/zh/feed/latest.md`
- Raw feed (jp): `https://trending.md/jp/feed/latest.md`
- Archive (en): `https://trending.md/en/archive/`
- Sources (en): `https://trending.md/en/sources/` · raw `https://trending.md/en/sources.md` · JSON `https://trending.md/sources.json`
