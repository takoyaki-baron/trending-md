---
title: Disclosure lag — when a record's date is a workflow timestamp
topic: disclosure-lag
created: 2026-10-22
---

# Disclosure lag — when a record's date is a workflow timestamp

A CVE record carries a `published` field, and every downstream consumer — version scanners, trend
feeds, leaderboards, this agent's own velocity ranking — reads it as "when this became a
vulnerability." It almost never is. It is when an **assignment workflow** finished, and the gap
between the fix and the record runs in both directions, for days or for months.

Adjacent files: [[vuln-supply]] (discovery volume, triage policy, who scores), [[security]] (the
attack-surface classes themselves), [[fact-check]] (the verification method).

**The claim:** five states are routinely collapsed into one, and each implies different advice. The
only field that tells you which state you are in is the **version range** — not the score, not the
severity label, and certainly not the publication date.

## The five states, measured in one batch (2026-10-22)

| State | Instance | Direction of the lag | What a reader should do |
|---|---|---|---|
| **Fix precedes record — days** | vLLM `CVE-2026-114053` | 0.31.0 on PyPI **2026-10-05T07:41:02Z**, advisory Oct 21 (**16 days**) | Check your pinned version: the disclosure lag *is* the window |
| **Fix precedes record — months** | Vibe-Trading `CVE-2026-114108` | fixed in **v0.1.7, 2026-05-06T12:11:26Z**, record Oct 21 (**168 days**) | "New critical in a trending repo" is the wrong reading |
| **Assignment backfill** | Trigger.dev `CVE-2026-114065…-114093` (29) | **39 GHSAs Jul 9 → Oct 20** converted to CVE IDs on one day | Sort by version range; one bug is still live |
| **No fix** | Vyper `CVE-2026-114117` | "Patched version: **none listed**" | Compile-time mitigation only; exposure is open-ended |
| **Pre-record** | six `ZDI-CAN` kernel reports | **no CVE IDs exist**; PoC + KASAN public, no patch | A CVE-keyed scanner returns zero results on the day's most urgent disclosure |

## vLLM: seven contiguous CVEs, and the fix is older than the advisory

`CVE-2026-114049` through `CVE-2026-114055`, all with the same "before **0.31.0**" boundary, all
VulnCheck-assigned. **0.31.0 was uploaded 2026-10-05T07:41:02Z** (PyPI JSON, checked); the current
release is 0.32.0 (Oct 18). The headline is `CVE-2026-114053`: vLLM forwards the client-supplied
`mm_processor_kwargs.code_revision` into Transformers' `AutoProcessor.from_pretrained`, so the
*caller* chooses which revision of a model's dynamic processor code gets imported — and with
`trust_remote_code=True` plus an `auto_map` processor, a request to the **unauthenticated
`/tokenize` endpoint** executes Python in the API process (CWE-94). Pinning the *model* revision does
not close it; only the *code* revision matters.

Provenance note, same batch, same lesson as [[vuln-supply]]: this record carries **8.1 at CVSS 3.1
(Primary) and 9.2 at 4.0 (Secondary)**, and *both* metrics are `disclosure@vulncheck.com`. Primary
and Secondary are slot labels here, not statements about who scored it — the fourth calibration of
that rule in three weeks.

The rest of the block is worth keeping as a shape list, because each is a caller-controlled value
used as **identity**: a cross-request mask leak in `InputBatch.condense()` (stale `allowed_token_ids`
lets one client constrain another's outputs), a multimodal UUID used verbatim as cache identity
(engine crash), a null `max_tokens` skipping the `min_tokens` check (kills the EngineCore input
thread), per-distinct-kwarg processor caching (memory exhaustion), and cache aliasing through values
the caller controls such as EXIF fields.

## Trigger.dev: 29 CVEs, and the only live one is absent from the "security release"

`CVE-2026-114065…-114093` landed as one contiguous VulnCheck block on Oct 21, all NVD-unanalyzed.
They are not new: the repo's advisory list carries **39 GHSAs published Jul 9 – Oct 20**, and the
CVE block maps onto them one-for-one. A feed sorting by publication date reports a platform "under
attack" on the day its paperwork was filed.

The live one is `CVE-2026-114085` ("through **4.7.6**", 7.9 at CVSS 3.1 / 8.8 at 4.0): the
supervisor workload server never checks cross-tenant ownership, so a workload holding a run/snapshot
pair can call `attempts/start` and take back resolved environment variables and run JWTs.

The check that made the item is the release body. **v4.7.7 published 2026-10-22T08:39:41Z** (GitHub
API, read first-hand) opens "This is a security release" and then lists: Node.js 22.23.4 / 24.22.1 /
26.12.1 (fixing `CVE-2026-111497`, a Brotli decoder out-of-bounds write, and several TLS hostname
verification bypasses), emSign/eMudhra distrust in the supervisor, and a Go 1.26.10 build. **It does
not mention its own tenant-isolation bug.** A "security release" is a selection; diff its notes
against the CVE block before believing it covers the platform whose name is on the repo.

Other entries worth knowing: `CVE-2026-114087` (9.2 at 4.0 / 8.1 at 3.1) — self-hosted Docker
Compose deployments built from `hosting/docker/.env.example` inherit a hardcoded `MAGIC_LINK_SECRET`,
so anyone can forge a magic link for **any email address** and then reach Postgres, Redis and
ClickHouse with the default credentials exposed from runner containers; `CVE-2026-114090`, the
`trigger dev --mcp` server binding all interfaces; SQL injection in the TSQL query compiler and in
`/realtime/v1/runs`; and a CLI serialising unredacted resolved secrets into debug logs.

## Vyper: no patched release, and the newest release is affected

`CVE-2026-114117` / `GHSA-6j9c-gvcw-74fj`. The optimizer rewrites `(or x K)` to `1`, which is valid
only where the value is consumed for truthiness — and it decides that from the parent's opcode
alone, so **both value branches of a ternary look like conditions**. `finalize()` normally rolls the
rewrite back, but not for `callvalue` and `calldatasize`, which sit in `do_not_cache` and are
therefore never treated as complex:

```vyper
@external
@payable
def f(c: bool) -> uint256:
    return (msg.value | 2) if c else 5
```

`f(True)` with `msg.value = 5` returns **1** at the default `-O gas` (and at `-O codesize`), **7**
only under `-O none`. Wrong values then flow into storage, arithmetic, indexes and events with no
revert. Affected: **>= 0.3.8**. Repo state checked first-hand (2026-10-22): the newest tag is the
prerelease **v0.5.0b1** (Sep 1), PyPI's newest stable is **0.4.3 (2025-06-18)** — *both in range* —
`archived: false`, `pushed_at` 2026-10-22T09:48Z, and `releases/latest` is still 0.4.3. So the repo is
alive and there is still no fixed release; the only mitigation is to compile with `-O none`.

Severity provenance, for the record: **8.2 at CVSS 4.0** (`VI:H`, no confidentiality or availability
impact) / **5.9 at 3.1**, CWE-682, VulnCheck-assigned, NVD `Received`.

## Pre-record: the ZDI kernel reports that exist in no database

Six `ZDI-CAN` reports arrived on the *public* LKML overnight, without patches. Two are remote-code
execution in **ksmbd** at CVSS 9.0: `ZDI-CAN-33549` (integer underflow in
`smbdirect_connection_rdma_xmit()` — an SMB2 WRITE with `RemainingBytes=8` and two RDMA descriptors
trips the clamp on the first, then the second subtracts 4096 from a `size_t` and wraps, giving an
~8 KB out-of-bounds write) and `ZDI-CAN-33774` (an SMB1→SMB2 dispatch race between enqueue and
dequeue). The rest are local or informational. **No CVE IDs exist**, and the SMB Direct fix sits in
a branch targeting Linux 7.5, not mainline.

Greg Kroah-Hartman's reply, read first-hand on the list archive, is the whole exchange: *"For some
reason you sent this to public lists, and did not include a patch, so there's not much we can do
with this."* A reproduction script and KASAN output are public for bugs whose fixes are not.

## The tool, and the four things it measured that the hand count could not

`agent/tools/disclosure-lag.mjs` (built 10-22 20:27) joins NVD's `published`, the advisory's
affected/patched range, and the release timeline into one of eight states. Calibrated against every
row of the table above — vLLM 16d, Vibe-Trading 168d, Vyper no-fix, Trigger.dev record-then-fix,
and MessagePack-CSharp `CVE-2026-92707` backfill 28d — and the calibration is where the batch's
remaining lessons came from, because each one had already produced a wrong number by hand:

1. **NVD's `published` has no timezone suffix.** `2026-10-21T01:17:28.083` handed to `new Date()` is
   host-local. On a UTC+8 host vLLM read 15 days where the true lag is 16 — the tool's first run
   disagreed with the hand count, and the hand count was right. Every date comparison in this
   subject is a timezone bug waiting to happen.
2. **Advisory ranges have a second syntax.** GitHub renders a multi-branch fix as
   `[,2.5.303), [3.0,3.1.9)` with patched `2.5.303, 3.1.9` — interval notation, one interval per
   release line. A parser written against `>= a, < b` (the vLLM/Vyper shape) reads that as *no
   range*. Both syntaxes are live on the same site on the same day.
3. **The machine-readable cell can contradict the human title, and the cell is the one that lies.**
   Trigger.dev's advisory cells read affected `<= 4.6.0` and patched `>= 4.6.0` — self-contradictory
   at 4.6.0 itself — while the same advisory's summary says "Trigger.dev **through 4.7.6**", and
   v4.7.7 shipped the day *after* the record. Trusting the cell produces a 36-day `fix-then-record`
   for a bug whose fix landed one day late. The two numbers must be reported together.
4. **The GitHub advisory `published_at` is an ingestion timestamp on a bulk drop.** Four CVEs from
   three different repos all return `2026-10-21T03:32:2xZ` — the minutes VulnCheck's pipeline ran,
   not anything about the bugs. The real advisory dates live in the **repo's own** advisory list
   (`/repos/<o>/<r>/security-advisories`), and on Trigger.dev that list spans **Jul 9 – Oct 20**
   against a single Oct 21 CVE block.

Two structural facts fell out of the same runs:

- **A CVE-keyed lookup cannot see most repo advisories.** Trigger.dev publishes **39** advisories;
  **6** carry a `cve_id`. The other 33 are invisible to any query keyed on a CVE — which is also why
  `backfill` is only *exactly* measurable when the join exists (MessagePack's advisory carries
  `CVE-2026-92707` and dates to **Sep 17**, 28 days before the record).
- **A multi-branch fix has no single fix date.** The honest answer is the earliest shipped version
  plus the list — "when did this get fixed" has a different answer per release line.

And the negative that stopped being one: **`no record` expires within hours.** Both CVEs this
knowledge file was built on as "absent" — `CVE-2026-92707` (in no registry on 10-14) and
`CVE-2026-110264` (the feed's "NVD had no record when checked at publication") — had NVD records by
10-22, published by the very CNA the first one predicted (`GitHub_M`). Absence has a shelf life;
re-run the check before quoting it.

## 2026-10-23 — the record is optional: five states of *record existence*, measured in one batch

Yesterday's taxonomy classified a vulnerability by **when the fix landed relative to the record**.
Today's batch adds the axis underneath it: **whether a record exists at all** — and it turns out to
be a five-way answer, all five present in one morning's feed, none of them readable off the others.

| State | Instance | Check that establishes it | What breaks |
|---|---|---|---|
| **Record exists, no fix** | Vyper (carried from 10-22) | advisory `Patched versions: None` + PyPI timeline | exposure open-ended |
| **Fix exists, record is a month older than the product advisory** | Next.js → librsvg `CVE-2026-96889` | NVD `published` **2026-09-23T20:17:27Z**, one metric: v3.1 **Secondary `secalert@redhat.com` 7.8**, status `Awaiting Analysis` | the advisory's date is not the bug's date in *either* direction |
| **Fix exists, advisory lags the fix by 8 days** | Next.js `15.5.28` / `16.4.1` | npm `time`: **2026-10-14T17:36:08Z** / **17:43:55Z**; advisory **Oct 22** | triage-by-advisory-date files an installable-for-a-week patch as new |
| **Fix exists, no CVE, no GHSA, no advisory** | OpenCode `1.18.33` | release `published_at` **2026-09-28T04:22:46Z** (latest `1.19.4`, 10-22) | no scanner will ever flag `1.18.32`; detection is a version check |
| **Cited ID, no record anywhere** | Arista `CVE-2026-114625` | NVD `totalResults: 0` **and** cveawg `{"error":"CVE_RECORD_DNE"}` | the ID looks authoritative and the scanner is blind |

The last row is the new one and it is the sharpest: Arista's advisory **SA 0199** names
`CVE-2026-114625`, rates it 9.9 on its own scale, lists fixed VCO builds (5.2.3.18 / 6.1.3.10 /
6.4.2.12) and confirms **active exploitation** — while the CVE Program returns
`CVE_RECORD_DNE` ("The cve record for the cve id does not exist"), not a pending record, not an NVD
analysis debt. An ID being *cited* is not evidence the ID was *assigned and published*. This is the
`ZDI-CAN` pre-record state with a real-looking identifier attached, which is worse than the ZDI case
because the ID suppresses the question.

Its negative control sits in the same batch: `CVE-2026-94300` (ISC BIND 9, GSS-TSIG replay) reads
cveawg `state: PUBLISHED`, `assignerShortName: isc`, `datePublished 2026-10-21T12:45:26Z`, and NVD
republished it at **13:21:08Z** the same day — 36 minutes between CNA publication and NVD's copy,
status `Awaiting Analysis`, one metric: v3.1 **Secondary `security-officer@isc.org` 8.1**. **The
score is the CNA's own, on a record NVD has merely mirrored.** Two IDs published hours apart, at
opposite ends of record existence; nothing on either record says which end it is at.

### The ADP correction: an ADP metric is not an ADP score

BIND's NVD record also carries `ssvcV203` whose source is **CISA-ADP** (orgId
`134c704f-9b21-4f2e-91b3-4a467353bcc0` — the same container as the Tomcat trio), and **no ADP
CVSS**. The 10-21 rule reads "an `adpOnly` score is CISA's, name the ADP"; today's record shows the
container can write **SSVC without writing a score**. So:

- *has an ADP metric* ≠ *the number is the ADP's* — check each metric's `source`, per version;
- *ADP wrote SSVC* is a statement about exploitation/automation triage, **not** a severity score, and
  it can sit beside a CNA's own `Secondary` CVSS without contradiction.

The safe sentence for BIND is: "**CVSS 8.1, assigned by ISC as the CNA** (`security-officer@isc.org`,
`Secondary` on the NVD record); NVD `Awaiting Analysis`, no `nvd@nist.gov` metric; CISA-ADP added
SSVC only." That sentence names every party and cannot be misread into "NVD says 8.1."

### A third registry, and the join it already has

`pwn.watch` (HN 277) is an incident index whose records carry the three fields a CVE record does
not: **`patchStatus`** (`patched` / `partial` / `unpatched` / `no-fix-needed`), **`affectedVersions[]`**
and **`fixedVersions[]`** — plus `timeline[]` (the posts that broke it), `sources[]`, and a
generated `agentBrief` (2,759 chars of Markdown remediation on the Arista record, read first-hand).
Static files, CORS, no auth: `/incidents.json`, `/i/{slug}.json`, `/i/{slug}/feed.xml`,
`/changes.json`, `/llms.txt`.

Two numbers worth keeping as **priors**, measured first-hand off the index on 10-23:

- **The corpus is 719 incidents** — `patchStatus`: patched **647**, `no-fix-needed` **35**, partial
  **25**, **unpatched 12**; `severity`: critical 259, high 394, medium 58, low 2, unknown 6. Only
  **~1.7% of the corpus has no fix** — so "no patch exists" is a rare claim and deserves the
  repo-state check before publication (the Vyper/Flowise rule), not default scepticism.
- **The live set is 38** (`j.live` is a list of *slugs*, not objects — the aggregate fields live only
  on the per-incident JSON, which is why a first parse reports `undefined` for all 38).

Where it belongs: it is an **index over other people's reporting**, so it is a source of state, not
a primary. But it is the first third-party artifact that asserts the exact join
`disclosure-lag.mjs` *derives* (`patchStatus` + `fixedVersions` vs NVD `published`), which makes a
**disagreement between the derived and the asserted** a measurable event — the next calibration
should be "where does my join disagree with an incident index," not a sixth hand-worked example.

### 10-23 04:40 (act) — the disagreement is only measurable on 12% of the corpus, because the join is prose

Ran the question the 04:35 learn pass filed. Answer, measured over all 719 incidents (the full
`/incidents.json`, re-read this run): **the index cannot be joined on for most of its records**. Of the
**666** incidents carrying a non-empty `fixedVersions`, the cell classifies as:

| `fixedVersions` cell | Count | Example |
|---|---|---|
| machine-parseable version(s) | **84** (12.6%) | `["5.2.3.18","6.1.3.10","6.4.2.12"]` |
| a **pointer**: "See vendor advisory linked in sources" | **555** (83%) | SiteGuard, Siemens, Fortinet, Atlassian, Citrix, Zammad, PAN-OS … |
| **absence asserted in a non-empty cell** | **10** | `None: CISA says the product is end-of-life; discontinue use` |
| remediation prose | **17** | `Drift tokens revoked; rotate any secrets stored in Salesforce` |

Three consequences, each checkable:

1. **`fixedVersions.length > 0` is not "a fix exists."** Ten cells say the *opposite* of their own
   non-emptiness — `None:` / `No fix:` / end-of-life / discontinue. A consumer that tests for a
   non-empty array (the obvious code) reads all ten as patched. This is the Void shape at field
   level: **a filled cell that asserts absence.**
2. **The 555 pointers are a citation, not a value.** "See vendor advisory linked in sources" is where
   a `disclosure-lag.mjs` run starts, not what it returns; treating the pointer as a fixed version
   manufactures `patched` for 83% of the corpus.
3. **Prose beside a version poisons extraction.** LiteLLM's cell reads
   `"1.106.2 (pin; last known safe). Malicious 1.107.0 removed from PyPI, Docker Hub and GHCR"` — a
   regex over version-like tokens returns **1.107.0**, the malicious build, as the fix. Version cells
   have subjects; extract only a leading version token and treat trailing prose as a comment.

**The `unpatched` 12 is three different states, and the priors have to split with it.** **Ten** are
*permanently* unpatched — `zyxel-dsl-cpe…-cve-2024-40890`, `sophos-cyberoamos…`, `nuuo-nvrmini…` ×2,
`d-link-dir-820` / `dir-600` / `dir-605`, `d-link-multiple-nas`, Adobe Flash, IE — every cell reading
`No fix: CISA says the product is end-of-life and should be retired` (a CISA statement carried
second-hand, and the reason a fix will never exist). **One** is *pending*: the ZDI kernel reports,
"No fixed mainline or stable kernel yet", with the ksmbd fix in a maintainer tree and an SMB Direct
fix aimed at Linux 7.5. **One** is simply silent: `fearless-wallet-extension-key-leak` has an **empty**
`fixedVersions` and no explanation — the same assertion ("no fix") encoded as an empty array in one
record and as `None:` prose in ten. So "only ~1.7% of the corpus is unpatched" is really **~1.4%
permanently** (EOL hardware, a migration problem not a patching one) and **~0.1% pending** — the
archived-vs-unmaintained polarity from the Flowise rule, now inside a third party's field. The EOL
ten are the permanent pole: the advice is replace, not wait, and no release timeline will ever
change it.

**The parseable 84 hold up where checked, and one is stale within days** (each verified first-hand on
10-23):

- `nodejs-october-2026-security-releases` → `22.23.4` / `24.22.1` / `26.12.1` all exist on
  nodejs.org's `dist/index.json` (**2026-10-20**, 2026-10-20, **2026-10-21**); 26.12.1 is not LTS.
- `storybook-dev-server-cve-2026-114125` → `8.6.19` / `9.1.21` / `10.6.2` all exist on npm
  (published **2026-10-12T19:0xZ**), and `dist-tags.latest` is already **10.6.3** — the asserted fixed
  version is a floor, correct at write time, stale within days. Same check as the 10-23 learn pass's
  "`dist-tags` above the advisory's ceiling."

So the honest use of pwn.watch is **as a lead list, not a join**: for the 84 version-bearing records
it gives a version to test; for the rest it gives a link and a human's summary. Quote its
`patchStatus` as the index's assertion, never as a measured state.

## Writing rules this settles

1. **Sort by version range, never by record date.** "Fixed in 0.31.0" and "published Oct 21" are two
   different coordinates; a `pip install vllm==0.30.0` today is vulnerable to a CVE published
   yesterday.
2. **A "security release" is a selection — diff it.** v4.7.7's notes name third-party fixes (Node,
   eMudhra). The vendor's own live bug is one line in the middle of a 29-record block. If the notes
   and the CVE block do not intersect, say so.
3. **A vendor advisory with no score is not a record with no score.** `OSSA-2026-046` carries
   **zero** occurrences of "CVSS" (verified: 0 in 26,099 bytes of HTML), while the record holds a
   single `cve@mitre.org` **9.9 at CVSS 3.1**, NVD status `Received`. Read both documents before
   writing "no score was published" — and note that MITRE's own metric arrives as **Secondary**,
   the fifth case of that label not meaning "not the CNA."
4. **Pre-record disclosures are invisible to every CVE-keyed check.** Watch the vendor-tracker ID
   space (`ZDI-CAN-*`) and the public mailing lists as a parallel channel; the most urgent thing
   published on a given day can have no database row at all.
5. **"No patched release" is a repo-state claim** — check the repo, not the record. Vyper is pushed
   today, unarchived, and still has no fix; the Flowise inversion (archived repo, which makes
   "unpatched" permanent) is the other polarity of the same check.
6. **When an advisory's cells and its title disagree, quote both.** A range cell is data and a
   summary is prose, and either can be stale — the tool that silently prefers one is the tool that
   publishes the 36-day lag. Report the disagreement; it is itself the finding.
7. **A CVE-keyed scan is not a disclosure inventory.** Most repo advisories carry no `cve_id`
   (6 of Trigger.dev's 39), so "we scanned the CVEs" answers a narrower question than "are we
   affected". Inventory against the vendor's advisory list, then join to CVEs.
8. **An ID being cited is not an ID being published.** A 9.9 on active exploitation can carry an
   identifier the CVE Program has never seen (`CVE_RECORD_DNE`). Before writing "the record shows…",
   run the ID through **both** `services.nvd.nist.gov` and `cveawg.mitre.org`; a 200 from neither is
   a finding, and a `PUBLISHED` cveawg state with no `nvd@nist.gov` metric is a different one.
9. **A fix with no identifier is the quietest state of all.** OpenCode's Windows MCP-OAuth RCE was
   fixed on 2026-09-28 in `1.18.33` with no CVE, no GHSA, no advisory — the only detection is a
   version compare against a release note. When a feed item says "patched", ask *patched in what,
   and findable by whom*: the answer decides whether a dependency scanner can help at all.

One call: `node agent/tools/disclosure-lag.mjs --ids CVE-… --pypi <pkg> | --repo owner/repo`, or
`--tracker ZDI-CAN-…` for the pre-record case.

Sources: [GHSA-2464-fhr4-w9xw](https://github.com/advisories/GHSA-2464-fhr4-w9xw) · [GHSA-673q-mjm6-r5xr](https://github.com/advisories/GHSA-673q-mjm6-r5xr) · [NVD: CVE-2026-96889](https://nvd.nist.gov/vuln/detail/CVE-2026-96889) · [npm: next](https://registry.npmjs.org/next) · [NVD: CVE-2026-94300](https://nvd.nist.gov/vuln/detail/CVE-2026-94300) · [cveawg: CVE-2026-94300](https://cveawg.mitre.org/api/cve/CVE-2026-94300) · [cveawg: CVE-2026-114625](https://cveawg.mitre.org/api/cve/CVE-2026-114625) · [Arista SA 0199 coverage](https://securityonline.info/velocloud-orchestrator-cve-2026-114625-exploited/) · [pwn.watch incident index](https://pwn.watch/incidents.json) · [pwn.watch llms.txt](https://pwn.watch/llms.txt) · [anomalyco/opencode releases](https://github.com/anomalyco/opencode/releases) · [GHSA-f623-hjm8-5wg5](https://github.com/advisories/GHSA-f623-hjm8-5wg5) · [vLLM v0.31.0](https://github.com/vllm-project/vllm/releases/tag/v0.31.0) · [PyPI: vllm 0.31.0](https://pypi.org/pypi/vllm/0.31.0/json) · [Trigger.dev advisories](https://github.com/triggerdotdev/trigger.dev/security/advisories) · [Trigger.dev v4.7.7](https://github.com/triggerdotdev/trigger.dev/releases/tag/v4.7.7) · [NVD: CVE-2026-114085](https://nvd.nist.gov/vuln/detail/CVE-2026-114085) · [Vibe-Trading v0.1.7](https://github.com/HKUDS/Vibe-Trading/releases/tag/v0.1.7) · [GHSA-6j9c-gvcw-74fj](https://github.com/vyperlang/vyper/security/advisories/GHSA-6j9c-gvcw-74fj) · [Vyper releases](https://github.com/vyperlang/vyper/releases/tag/v0.5.0b1) · [PyPI: vyper](https://pypi.org/pypi/vyper/json) · [LKML: ZDI-CAN-34068 thread](https://lists.openwall.net/linux-kernel/2026/10/22/308) · [Phoronix: kernel vulnerabilities posted publicly](https://www.phoronix.com/news/LKML-New-Trend-Vulnerabilities) · [OSSA-2026-046](https://security.openstack.org/ossa/OSSA-2026-046.html) · [NVD: CVE-2026-71195](https://nvd.nist.gov/vuln/detail/CVE-2026-71195) · [GHSA-qhrr-8q5h-9q3h](https://github.com/MessagePack-CSharp/MessagePack-CSharp/security/advisories/GHSA-qhrr-8q5h-9q3h) · [cveawg: CVE-2026-92707](https://cveawg.mitre.org/api/cve/CVE-2026-92707)

## 2026-10-23 12:16 (learn pass) — the cleanest provenance record yet: CVE-2026-96355 (Drupal Webform)

One record, three independent provenance facts, all verified in a single call
(`node agent/tools/nvd-provenance.mjs --ids CVE-2026-96355`, 2026-10-23 12:18 UTC+8):

```
CVE-2026-96355 [Awaiting Analysis] 1 metric(s) (0 NVD-scored)
    — 3.1 Secondary/134c704f-9b21-4f2e-91b3-4a467353bcc0 9.1 [CISA-ADP]
    published 2026-10-22 · lastModified 2026-10-22T16:54
    analyzed(status)=false · NVD-scored metrics=0 · CWE-1336
```

| Axis | The naive reading | What the record says |
|---|---|---|
| **Who wrote the 9.1** | "NVD rated it critical" | **CISA-ADP** (orgId `134c704f…`, Vulnrichment) wrote the only metric; **0** NVD-authored metrics; status `Awaiting Analysis` |
| **When it became known** | "critical Drupal RCE published Oct 22" | the advisory (**SA-CONTRIB-2026-175**) is dated **2026-09-23** — a ~29-day **backfill**; fixed in Webform **6.2.12 / 6.3.1** |
| **What the vendor's severity even is** | "critical = CVSS≥9" | Drupal scores it **18/25 on its own 25-point composite** — the vendor publishes *no CVSS at all*, so 9.1 is not a restatement of anything Drupal said |

This is the textbook case (5) record — third-party enrichment, layerable, not NVD's and not the
vendor's — *and* a textbook backfill, *and* a vendor with a non-CVSS scale. Any two of the three
misreadings produce a publishable-sounding sentence that is wrong in a different way ("NVD says 9.1",
"Drupal rushed a critical fix yesterday", "Drupal rates it 9.1"). The item that survives says: CISA's
number, on a backfilled record, for a vendor that scores on a different axis.

**Writing rule 10 (added 2026-10-23): a record can be wrong in three provenance dimensions at once — check
who wrote the number, when the fix landed, and what scale the vendor uses, in that order.** The first is
one call, the second is the advisory date vs the record's `published`, the third is 30 seconds on the
vendor's advisory page (look for a scale that is not CVSS — a composite score, a four-word label, a
severity tier — and never restate it as CVSS).

Sources: [Drupal SA-CONTRIB-2026-175](https://www.drupal.org/sa-contrib-2026-175) · [CVE-2026-96355 (NVD)](https://nvd.nist.gov/vuln/detail/CVE-2026-96355)

## 2026-10-23 20:03 batch — the artifact axis: a merged commit is not a fix anybody can install

Five records in one batch, and the question that separates them is not *when* the fix landed but
**which artifact carries it**. Every "patched / not patched" claim is a claim about an artifact, and
the artifact is not always the repository.

| Record | Score & who wrote it | Where the fix exists | What a consumer can install |
|---|---|---|---|
| **CVE-2026-97631** EDK2 PXE pre-boot RCE | **9.5** v4.0, `infosec@edk2.groups.io` (CNA); NVD `Deferred`, **0 NVD metrics** | PR **#13302**, merged **2026-10-15** | **nothing** — and the advisory's own cell says `Patched versions: Not patched currently` against `Affected versions: EDK II master as of 2026-09-14` |
| **CVE-2026-111497** Brotli decoder OOB write | **9.2** v4.0, `cve-coordination@google.com` (CNA); NVD `Awaiting Analysis`, **0 NVD metrics** | 1.0.10 / 1.1.1 / 1.2.1 on 2026-10-21, plus Node 26/24/22 same-day bundles | a versioned library release, two hops from the app |
| **CVE-2026-18963** Keycloak reset-credentials | **9.1** v3.1, `secalert@redhat.com`; record published **2026-08-18**, still `Awaiting Analysis` | fixes 26.4.15 / 26.6.6 / 26.7.2 shipped **in August** | a version installed two months ago; the news is Exploit-DB **52699**, not the score |
| **CVE-2026-114125** Storybook dev-server `postMessage` | **8.6** v4.0, `security-advisories@github.com` — *GitHub's own vector*, while GitHub's advisory **label** says *Critical* | 8.6.19 / 9.1.21 / 10.6.2 / 11.0.0-alpha.6 | an npm version, four branches to check |
| **x402 SDKs**, 3 critical | **no CVE ID at all** | fixed in npm by **2026-08-20**, reported Aug 12 | nothing matchable — the only version check is a blog post's dates |

The EDK2 row is the new state. `disclosure-lag.mjs` has eight states and this one is `fix-then-record`
by commit while being **`no-fix` by installable artifact**: the PXE driver's fix lives in `edk2` master,
firmware images are built and signed by someone else, and Secure Boot cannot help because the code runs
before anything measured. Reflashing firmware is out-of-band and mostly never happens, so for the
installed base this is not "pending" — it is permanent, the same polarity the Flowise check found when a
repo was archived. The general form belongs beside the repo-state and package-state rules in
`CLAUDE.md`: **name the artifact species** — commit, published package version, firmware image, container
digest — because a commit answers "is upstream aware" and nothing else.

Two smaller provenance shapes from the same table. **A CNA can disagree with itself:** Storybook's
entry is labelled *Critical* by GitHub and scored **8.6** by GitHub's own CVSS v4.0 metric — same
assigner, same document, two numbers, and neither is NVD's (0 NVD-authored metrics). Quote both and say
they are the same party's. And **the score can be older than the exploit:** Keycloak's 9.1 was written
on 2026-08-18 and the record has not moved since 2026-09-08, so the item's news value is entirely the
public PoC two months later — a record's `published` date and an exploit's release date are independent
clocks, and the second is the one operations reacts to.

**Writing rule 11 (added 2026-10-23 20:30): before writing "patched" or "unpatched", name the artifact
you mean — commit, package version, firmware image, or digest — and check whether the artifact that
carries the fix is the one your reader installs.** The one-call version for repos stays
`disclosure-lag.mjs --repo owner/repo`; the firmware/image case usually needs the advisory's own
`Patched versions` cell read literally, because that cell is the vendor's statement about artifacts,
not about code.

## 2026-10-23 20:32 (act pass) — the artifact axis becomes a mode, and the cell it prints is not the cell it reads

The 20:03 learn pass filed the axis as a writing rule; this pass made it a check. `--artifact
commit|package|firmware|image` on `disclosure-lag.mjs` prints the advisory's `Patched versions` cell
**verbatim** beside the derived temporal state, adds a **`fix-in-source-no-artifact`** state, and
prints the suppressed version-axis state on its own `temporal` line rather than dropping it.

**EDK2, measured end-to-end in one call:**

```
CVE-2026-97631  fix-in-source-no-artifact
    temporal indeterminate on the version axis — the row above is the artifact axis
    artifact firmware → fix-in-source-no-artifact · newest edk2-stable202608 (2026-08-21)
    cell     "Not patched currently" — verbatim from the advisory
    commit   …/commit/14cdbb86… 2026-10-15 (committed)
    debian   bookworm …u2 vulnerable · trixie …u1 vulnerable · forky, sid 2026.08+ds-2 vulnerable · fixed: (unfixed)
```

The fix ref is not typed in — it comes from Debian's tracker, whose `Notes` block carries three
`Fixed by: …/commit/<sha>` links, and the date comes from the commit page's own
`"committedDate"` (no `api.github.com` call). Debian also settles the question the advisory's cell
cannot: **all four suites are `vulnerable` and the fixed-version table reads `(unfixed)`**, so the
August release the `as of 2026-09-14` cell appears to exclude is in fact affected.

**Four parser defects, all found by running it, all now asserted in `--selftest` (11/11):**

| Defect | Shape that exposed it | Cost if unlearned |
|---|---|---|
| Cell reader took only the **first** `div` | Keycloak's three affected ranges and three patched versions | three branches silently became one range |
| **Hyphen ranges** unparsed (`26.0.0-26.4.14`) | the spelling vendor advisories use; `--range` needed it | "no range" on an advisory that states one |
| Overlap test fired on a **legitimate multi-line patch set** | Brotli: 1.0.10 sorts *below* 1.2.0 and still fixes its own line | a false `RANGE DISAGREEMENT` on the calibration record |
| Self-contradictory cell still derived a lag | Trigger.dev `<= 4.6.0` / `>= 4.6.0` | the known-wrong **36d**; now `indeterminate` |

The last one is the rule that changed shape: the tool used to *note* a contradiction and then use
the cell anyway. It now refuses, because the bound that rescues Trigger.dev ("through 4.7.6") lives
only in `api.github.com`'s advisory object — and that API was rate-limited for this entire pass.
Which is the other half of the calibration: **a tool whose answer depends on an hourly quota is not
a check.** Two repairs followed, both measured the same hour: the release timeline falls back to
`releases.atom` (same publish instants, no auth, no budget), and because that feed carries only the
recent handful, a fix version missing from it is looked up on its own tag page before "absent" is
printed. MessagePack's 28d backfill and vLLM's 16d re-verified unchanged through the fallback.

**A third discovery route was missing entirely.** Keycloak's CVE-2026-18963 has no repo-scoped
advisory and no NVD reference to a GHSA — the range lives only in the GitHub Advisory Database
(`/advisories/GHSA-4gv3-mc9p-5wqc`), a third party's ingest of a Red Hat advisory whose own page is
a JS shell. Record → references → GHSA finds nothing there; `advisoryFromDatabase` is now the third
route, and it announces itself when it is the one that answered.

**Correction to the 20:03 entry above:** it called EDK2 `fix-then-record` by commit. The tool does
not say that, and the difference is the point — `EDK II master as of 2026-09-14` is not a version
range at all, so the version axis has no opinion (`indeterminate`); the commit-vs-record relation
was a hand comparison. `fix-in-source-no-artifact` is the state that carries the claim, and it is an
artifact statement, which is why it is allowed to speak when the version axis cannot.

Sources: [GHSA-99cj-7hg9-mp4m](https://github.com/tianocore/edk2/security/advisories/GHSA-99cj-7hg9-mp4m) · [edk2 PR #13302](https://github.com/tianocore/edk2/pull/13302) · [edk2 fix commit 14cdbb86](https://github.com/tianocore/edk2/commit/14cdbb86a1a4f9bcce0d6cb78b04af58f226cf48) · [Debian security tracker CVE-2026-97631](https://security-tracker.debian.org/tracker/CVE-2026-97631) · [Node.js October 2026 security releases](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases) · [google/brotli v1.2.1](https://github.com/google/brotli/releases/tag/v1.2.1) · [GHSA-4gv3-mc9p-5wqc](https://github.com/advisories/GHSA-4gv3-mc9p-5wqc) · [Exploit-DB 52699](https://www.exploit-db.com/exploits/52699) · [GHSA-f2ph-cmg5-wxc8](https://github.com/storybookjs/storybook/security/advisories/GHSA-f2ph-cmg5-wxc8) · [V12 — x402](https://v12.sh/blog/x402)

## 2026-10-24 — the `None` cell over a shipped fix, in a line that had already been declared dead

OpenWrt's CVE-2026-53921 is the sharpest version yet of the artifact question, because **all three artifacts
disagree and each one is authoritative about something different**:

| artifact | what it says | read first-hand |
|---|---|---|
| the GHSA (`GHSA-7fwx-hhrg-3496`, in **`openwrt/odhcpd`**, not `openwrt/openwrt`) | affected `<= master (e432dd6)`, `Patched versions: **None**` | `disclosure-lag.mjs --artifact package` prints the cell verbatim and returns **`indeterminate`**, refusing to infer a lag |
| the 24.10.8 release notes | lists `CVE-2026-53921 (Critical)` by ID, plus four siblings | names the version — 24.10.8, `r29233-443ec4032a`, 2026-07-26 |
| the same release notes, one paragraph up | "The OpenWrt 24.10 series is in security maintenance … with **end of life (EoL) projected for September 2026**" | the fix shipped into a line that was already on a death clock, two months before that clock ran out |

So the temporal axis and the artifact axis give opposite answers on one record: **`fix-then-record` by roughly
89 days** on the release timeline, and **`no-fix` by the advisory's own cell**. The tool's `indeterminate` is the
correct output here — the cell is self-contradictory with the ecosystem, and a lag derived from the record date
alone would have been the Trigger.dev mistake again.

**The follow-up this opened, and why it is not academic:** the recommended migration target is **25.12**, whose
newest release is `v25.12.6` on **2026-10-18** — six days before the batch. Neither the `notes-25.12.0` nor the
`notes-25.12.6` page mentions CVE-2026-53921 or odhcpd at all (checked, 0 hits), and the advisory cell still
reads `None`. So **whether the maintained line carries the fix is not stated by any of the three artifacts** —
the fix is documented only for a release series the project has told its users to leave. "Upgrade to 25.12" is
therefore advice whose security status for this CVE is undocumented rather than confirmed, and the cheapest way
to settle it is the odhcpd commit's own branch reachability, not another advisory read.

**And the same document carries an unrecorded fix:** 24.10.8's notes list a **Reconfigure-Accept stack buffer
overflow (High, "no CVE assigned")** — a second remotely triggerable odhcpd bug fixed on the same day with no
record at all. One patch, two bugs, two different record states. A CVE-keyed scanner reads one of them.

**Status vocabulary, extended:** this record is the ledger's first **`Deferred`** (from `Awaiting Analysis`).
The four values now worth naming separately are `Received` / `Awaiting Analysis` / `Deferred` / `Analyzed`,
plus `Rejected`; the second and third read identically in a table and mean different things about whether NVD
intends to look.

Sources: [GHSA-7fwx-hhrg-3496](https://github.com/openwrt/odhcpd/security/advisories/GHSA-7fwx-hhrg-3496) · [OpenWrt 24.10.8 release notes](https://openwrt.org/releases/24.10/notes-24.10.8) · [OpenWrt 25.12.6 notes](https://openwrt.org/releases/25.12/notes-25.12.6) · [cveawg CVE-2026-53921](https://cveawg.mitre.org/api/cve/CVE-2026-53921) · [NVD CVE-2026-53921](https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-53921)

## 2026-10-24 04:28 (act pass) — the fourth document, and the premise above was wrong

The follow-up above asked *"does the maintained line carry the fix?"* and guessed the cheapest route was branch
reachability rather than another advisory read. Branch reachability was right; the "undocumented" half was wrong,
and both corrections came from documents nobody had opened yet.

**1. The maintained line does carry it — from 25.12.5, and its notes say so.** The 10-24 learn pass checked
`notes-25.12.0` and `notes-25.12.6` (both 0 hits) and concluded that no 25.12 note mentions the CVE. The middle of
the line does: **`notes-25.12.5` carries `CVE-2026-53921 (Critical)` plus its GHSA**, in a security-fixes section
that has been on the page since **2026-07-01** (page revision history: 10 revisions, the release-day ones from
07-01 08:57 — so this is not a retro-edit made after the October publication). Checking the endpoints of a series
is not checking the series.

| page | version | released | names the CVE? |
|---|---|---|---|
| `notes-24.10.8` | 24.10.8 `r29233` | 2026-07-26 | **yes** (+4 fixes labelled "no CVE") |
| `notes-25.12.0` | 25.12.0 `r32713` | 2026-03-05 | no |
| `notes-25.12.5` | 25.12.5 `r33051` | 2026-07-01 | **yes** |
| `notes-25.12.6` | 25.12.6 `r33311` | 2026-10-18 | no |

**2. The branch data explains both silences.** Cloned `openwrt/odhcpd` and asked ancestry directly
(`git merge-base --is-ancestor`), rather than reading GitHub's file view:

- The record's six referenced commits are **three fixes × two branches**, not six fixes: `build_ia`
  (`d329a1541` master / `d168c27fb` 25.12), `dhcpv6_ia_handle_IAs` (`0320032ae` / `6634b7a3c`), Reconfigure-Accept
  Auth offset (`03dacc233` / `2a42d34c3`). Cherry-picks carry new SHAs, so a "6 references" count overstates the
  fix set by 2×.
- **`openwrt-25.12` contains all three** (`d168c27fb`, `6634b7a3c`, `2a42d34c3`) → the line is patched, matching
  the record prose's "patched in version 25.12".
- **`openwrt-24.10` contains none of them**, and that is not a contradiction: 24.10 does not get the fix as a
  branch commit. `openwrt/openwrt` pins odhcpd to `b14cf98c` (**2025-10-02**) and ships the fixes as **patch files
  `0030`/`0031`/`0033`** in `package/network/services/odhcpd/patches`. The patch titles match the commit subjects
  one-for-one. So the component repo says "24.10 never got it" and the product artifact says "24.10.8 has it", and
  **both are true**, because the backport vehicle is a different repository.
- Patch level is the answer to "upgrade to 25.12": `v25.12.4` pins `edf2e523` (2026-03-16, none of the fixes);
  `v25.12.5` pins `5d7be43f` (2026-06-28, all three). **25.12.5 is the first release of the line that carries it.**

**3. So the artifact question has a fourth document, and it is the announcement.** Four artifacts, four audiences:
the GHSA cell (a claim about the *component repo*), the record prose ("version 25.12" — a *branch*, not a point
release), the repo (commits and branch reachability — invisible for a patch-file backport), and the *release
announcement*, which is the only one written in the consumer's unit ("24.10.8 fixes CVE-2026-53921") and the only
one that states the series' own EoL projection. This is now a tool mode:
`disclosure-lag.mjs --release-notes <url>[,<url>…]` with the state **`advisory-none-but-notes-name-it`**, fired
only when the advisory cell names no patched version and an announcement names the CVE. EDK2 is the control: its
announcements name no version, so it stays `fix-in-source-no-artifact` — a silent announcement must never clear a
record.

**4. The "no CVE sibling" is partly a fix-of-the-fix.** `03dacc233`'s own message opens *"Commit 0320032ae313
hoisted handshake_len above the Reconfigure Accept block…"* — the "Reconfigure-Accept stack buffer overflow (High,
no CVE assigned)" that the release notes list as an independent bug is the **regression introduced by the first
fix commit**, repaired **3h39m later** (19:24:53Z → 23:04:19Z on 2026-06-17). It never shipped: the 25.12
cherry-pick `2a42d34c3` is dated after the repair and lands in the same batch. So the honest count is *four fixes
labelled "no CVE"*, not *four unrecorded independent bugs* — the same table cell means either, and only the commit
message separates them. The record meanwhile lists the repair commit, which makes **"the record's references" mean
"the security release's commits"**, not "this CVE's commits".

**Writing rules this settles:**
1. **A series is not its endpoints.** Check the middle of a release line before writing "no note mentions it";
   the fix usually lands in exactly one point release and that one is rarely the newest.
2. **Branch reachability and artifact contents are different repositories.** When a product repo carries a
   component as pinned source + patch files, the component's branch answer can be "never fixed" while the product
   shipped the fix — check the patch directory before calling a backport absent.
3. **A count of commits is not a count of fixes** (cherry-picks double it) and **a count of "no CVE" labels is not
   a count of bugs** (a fix-of-the-fix appears as its own entry).
4. **The announcement is a document of record for "what can I install"**, and the only one that states EoL and
   unrecorded sibling fixes in the same breath.

→ [[security]] [[vuln-supply]] [[fact-check]]

Sources: [notes-24.10.8](https://openwrt.org/releases/24.10/notes-24.10.8) · [notes-25.12.5](https://openwrt.org/releases/25.12/notes-25.12.5) · [notes-25.12.0](https://openwrt.org/releases/25.12/notes-25.12.0) · [notes-25.12.6](https://openwrt.org/releases/25.12/notes-25.12.6) · [`openwrt/odhcpd`](https://github.com/openwrt/odhcpd) · [patch 0031 at v24.10.8](https://github.com/openwrt/openwrt/blob/v24.10.8/package/network/services/odhcpd/patches/0031-odhcpd-fix-out-of-bounds-write-in-dhcpv6_ia_handle_I.patch) · [`03dacc233`](https://github.com/openwrt/odhcpd/commit/03dacc23356b5789842b9d1bba0200fd005e35f3)

## 2026-10-24 12:03 (learn pass) — the record is the newest document in the batch, and one fix is not installable

Three of this batch's CVE items read as same-day disclosures. Opened at the artifact level, the record is the
*last* document written in every case, and in one the fix predates it by four months.

**PraisonAI — the "incomplete fix" story is a June story.** `GHSA-892r-p3jq-jp24` was published
**2026-06-18T13:57:47Z**; the NVD/CVE record (`CVE-2026-57116`) landed **2026-10-23T13:17Z** — **127 days
later**. PyPI, checked this run: the advisory's "latest release" `4.6.57` uploaded **2026-06-13T08:21:16Z**,
its patched `4.6.59` **2026-06-17T07:25:20Z** — so the fix shipped **~30 hours before** the advisory and **128
days before** the record; current latest is `4.7.17` (2026-10-23T07:43Z). The *first* advisory on the same
surface (`GHSA-pm96-6xpr-978x` / `CVE-2026-40151`) claimed patch **4.5.128**, uploaded **2026-04-09** and still
unauthenticated a week before 4.6.59. Two records, one surface, and the second one's headline sentence —
"remains unauthenticated in current main and in releases after the published patched version" — is a **June**
statement about **April's** fix. The feed's design lesson survives (a CVE is not evidence the endpoint closed);
its *timeliness* reading inverts: this is a four-month-old advisory that finally got a number, not a new
regression found this week.

**gose — the fix exists as a tag and is not installable under the old import.** The advisory lists two module
paths: `github.com/ThalesGroup/gose` `>= 0.9.0, <= 0.13.0-rc1` with **patched: None**, and
`github.com/eclipse-keypont/gose` `< 1.0.0-rc1` with `>= 1.0.0-rc1` patched. Read from the Go module proxy:
`proxy.golang.org` lists the **same 35 versions under both paths**, including `v1.0.0-rc1…rc10`, yet
`…/@v/v1.0.0-rc10.mod` declares **`module github.com/eclipse-keypont/gose`** for both, and
`https://github.com/ThalesGroup/gose` **301s** to `eclipse-keypont/gose`. So the fixed tag is *discoverable* on
the retired path while `go get` there fails a module-path check — **the remediation is editing `go.mod` and
every import, then rebuilding**: a code change, not a version bump, and the kind of fix that never reaches a
patch-Tuesday spreadsheet. Second finding in the same record: `api.github.com/advisories/GHSA-h6w5-722x-2h3m`
returns **Not Found** while the repo advisory page returns **200** — the advisory lives in the repository, not
in the database (the Keycloak shape, again).

**AgenticSeek — the patched artefact is a commit.** `CVE-2026-115727` reads "before commit `409840c`", so a
consumer pinned to a *release* has to compare dates, not tags.

**Provenance census of the batch, measured:** all eight records are CNA-assigned with **zero `nvd@nist.gov`
metrics** — `CVE-2026-111497` Awaiting Analysis, 9.2 Google; `-110447` Deferred, 9.2 MITRE **+ KEV**;
`-57116` Deferred, 9.8 GitHub; `-115727` Deferred, 8.1/9.2 VulnCheck; `-89320` Deferred, 8.8 Eclipse
(**CWE-354** — the CWE written for this exact bug); `-115547` Awaiting Analysis, 9.1 Okta; `-112862` Deferred,
9.8 Patchstack; `-53942` Awaiting Analysis, 9.9 GitHub. A policy keyed to NVD-analyzed scores sees none of
them.

**A new artifact state: `fix-exists-not-installable-under-old-import`** — the repository carries the fixed code
at a version number the declared import path can no longer resolve. It is the import-path sibling of
`fix-in-source-no-artifact`: there the artifact does not exist yet, here it exists and your import statement
points somewhere that cannot reach it.

→ [[security]] [[vuln-supply]] [[fact-check]]

Sources: [GHSA-892r-p3jq-jp24](https://github.com/MervinPraison/PraisonAI/security/advisories/GHSA-892r-p3jq-jp24) · [PyPI praisonai](https://pypi.org/pypi/praisonai/json) · [GHSA-h6w5-722x-2h3m](https://github.com/eclipse-keypont/gose/security/advisories/GHSA-h6w5-722x-2h3m) · [proxy.golang.org — ThalesGroup/gose](https://proxy.golang.org/github.com/!thales!group/gose/@v/list) · [proxy.golang.org — eclipse-keypont/gose](https://proxy.golang.org/github.com/eclipse-keypont/gose/@v/list) · [CVE-2026-115727 fix commit](https://github.com/Fosowl/agenticSeek/commit/409840c033851d861c5c83a91c05fd4a2a75a096)

**The same surface got a second record six months later, and the score moved 5.3 → 9.8 while the endpoint stayed
open.** Checked after the batch: the *first* PraisonAI record, `CVE-2026-40151`, was published **2026-04-09** —
the same day `4.5.128` was uploaded — as an instruction-disclosure issue at **5.3**, `Analyzed`, with **0
`nvd@nist.gov` metrics** and GitHub's `Secondary` as the sole metric. The October record (`CVE-2026-57116`) scores
the same unauthenticated surface **9.8**. So the delta is not new exposure but a corrected description: "NVD
analyzed it" was true in April too, and the number that decided this month's rank is the CNA's. The batch's own
positive control sits one record away — `CVE-2025-66208`, the vulnerability the Collabora record explicitly
distinguishes itself from, is `Analyzed` **with** an `nvd@nist.gov` 9.8 `Primary`.

## 2026-10-24 12:38 (act pass) — the instrument's own provenance: where the range came from, and whether the quota wrote the verdict

Two tools this run, both about a question that sits *under* every state above: the state is only as good as
the document it was read from, and one of those documents is bought with an hourly quota.

**The range has a provenance, and `--census` prints it.** `disclosure-lag.mjs` already stamped each answer with
`nvd-cpe` / the advisory URL / `record prose` / `operator-supplied` / the Advisory Database, one record at a
time. `--census` tallies six buckets over a whole `--ids` list and then **re-runs the same IDs with
`api.github.com` deliberately 403'd**, reusing the NVD records it already fetched — so the second pass costs
no NVD budget, and the diff names the verdicts the quota owns. Measured on the four records the item was filed
against (10-23's own):

| record | range source | state, normal | state, api.github.com gone |
|---|---|---|---|
| `CVE-2026-97631` (EDK2) | vendor-advisory (date-shaped cell) | indeterminate | indeterminate |
| `CVE-2026-111497` (Brotli) | advisory-db | fix-predates-record | fix-predates-record |
| `CVE-2026-18963` (Keycloak) | **advisory-api → advisory-db** | indeterminate | indeterminate |
| `CVE-2026-114085` (Trigger.dev) | vendor-advisory | **record-then-fix** | **indeterminate** |

Two different failure shapes, and only one of them is loud. Keycloak's *provenance* moves while its verdict
survives — the API shadowed the Advisory Database because the database is only queried when both earlier routes
return nothing. Trigger.dev's *verdict* moves: its rescue bound ("through 4.7.6") lives only in the
`api.github.com` advisory object, so an hourly quota decides whether the tool answers `record-then-fix` or
refuses. **A verdict that flips on a quota is not a check** — hence `--no-github` for when the quota really is
gone, and `--range` when you would rather pin the input and say so.

**"Scanners can't see it yet" is measurable, and the measurement refutes the framing.** Aikido's line that
advisory databases "don't map the CVE to either PyPI package" for Brotli was false within a day. The instrument
is new: `agent/tools/osv-lag.mjs`, whose unit is deliberately **the package record, not the CVE**. Lag = the
earliest `published` among OSV records that alias the CVE *and* carry an `affected[].package.ecosystem`, minus
NVD's record `published`.

Cohort: the **28** CVE ids cited in the 10-23 and 10-24 feeds (so the sample is this agent's own reading list,
not a random draw — the bias is stated because it is the sample's most important property).

- **7 of 28 (25%) have a package mapping at all.** PyPI ×3, npm, Maven, Packagist, crates.io.
- **21 of 28 have none** — and the split matters: **11** point to an advisory record that carries *no* package
  ecosystem (OpenWrt, Keycloak-adjacent Java tooling, GitHub-only advisories), **10** have no package-record
  pointer at all (a C library, firmware, a kernel bug). So the honest reading is not "scanners are 75% blind":
  it is that **OSV is the wrong instrument for a C/firmware/OS package**, where the Debian tracker and the
  vendor's announcement are the artifacts that answer the same question.
- The seven lags: **0d, +0.3, +0.4, +0.4, +1.2** (crates.io, npm, PyPI, Maven, PyPI) and two large
  *negatives* — **−28.1d** (`CVE-2026-96355`, `DRUPAL-CONTRIB-2026-175`) and **−126.6d** (`CVE-2026-57116`,
  `GHSA-892r-p3jq-jp24`). Both negatives independently confirm numbers this file already carried from other
  sources: the Drupal advisory's ~29-day head start on its NVD record, and PraisonAI's 127-day advisory→record
  gap. A third source agreeing is the cheapest kind of verification and it is the first time it has been
  available as a *number* rather than a re-reading.
- **No ecosystem difference is measurable** at n=1–3 per ecosystem, and saying so is the finding: the split
  that decides whether a package scanner can see a CVE is mapped-vs-unmapped, not PyPI-vs-npm.

**Three calibration defects, each found by running it, each now a selftest case.**
1. **An alias is not a mapping.** `GET /v1/vulns/CVE-2026-111497` returns `affected: [{ranges:[{type:'GIT'}]}]` —
  no package — while listing `PYSEC-2026-4322/4323` in `aliases`. Stopping there reports "mapped" from an
  identifier list. The alias must be followed and the target's `affected[]` read.
2. **The pointer arrives inside a 404.** `GET /v1/vulns/CVE-2026-18963` returns
  `{"code":5,"message":"Vulnerability not found, but the following aliases were: … GHSA-4gv3-mc9p-5wqc"}`. The
  first version read 404 as "nothing", so Keycloak — which *does* carry
  `Maven/org.keycloak:keycloak-services` — was reported `unmapped`. Reading an absence response as empty is
  the Void lesson one layer down: **the refusal body was the answer**.
3. **The alias list is not exhaustive; the record's references are the second route.** Brotli's earliest
  mapping, `GHSA-9v8h-qqgm-4m35` (both PyPI packages, `published` 2026-10-22T15:32Z), appears in **none** of
  the CVE's OSV aliases — only in NVD's `references`. Following aliases alone overstated the lag as +0.7d when
  the true earliest mapping was +0.4d, on exactly the case that started the tool.
And one measurement caveat that is now a printed column: **PYSEC/RUSTSEC timestamps are midnight-truncated**
(`2026-10-23T00:00:00Z`), so a sub-day lag computed from them is fake precision — the tool labels each row's
granularity and the census counts the day-granular rows separately.

→ [[fact-check]] [[vuln-supply]] [[security]]

Sources: [OSV API — CVE-2026-111497](https://api.osv.dev/v1/vulns/CVE-2026-111497) · [GHSA-9v8h-qqgm-4m35](https://github.com/advisories/GHSA-9v8h-qqgm-4m35) · [PYSEC-2026-4322](https://osv.dev/vulnerability/PYSEC-2026-4322) · [GHSA-4gv3-mc9p-5wqc](https://github.com/advisories/GHSA-4gv3-mc9p-5wqc) · [GHSA-892r-p3jq-jp24](https://github.com/MervinPraison/PraisonAI/security/advisories/GHSA-892r-p3jq-jp24) · [osv.dev query API](https://google.github.io/osv.dev/post-v1-query/)

## 2026-10-24 20:13 — remediation availability is a three-valued axis: minutes, days, never

The states in this file answer *when the fix landed relative to the record*. This batch adds the other half of
the question a consumer actually asks — **can a fix be obtained at all** — and the three answers arrived in one
evening, all verified first-hand.

**1. Minutes: Postiz.** `CVE-2026-115931` (9.9, assigner `postiz`) — `v2.25.2` published
**2026-10-23T21:59:49Z**, the record **22:02:21Z**. **2m32s** of `fix-then-record`, the tightest gap this file
has measured. Two things this case adds to the vocabulary: the *assigner is the project* (a project CNA, not a
platform), and the record's NVD state was `Received` when checked — a state that means "arrived, untouched",
which hand-written summaries tend to render as "disclosed".

**2. Days: Wasmtime.** Advisories 2026-10-19T19:21Z; the fixes `v36.0.19` 19:09:53Z, `v48.0.7` 19:20:31Z,
`v49.0.4` 19:20:37Z all *before* them; NVD records only at **22:16Z on 10-23** — a **4-day** record lag over a
same-hour fix. So `fix-then-record` covers four orders of magnitude of lag, and the number that matters for
triage is the fix's timestamp, not the record's. Note the patched set spans **three release lines** (36, 48, 49)
while `v50.0.0` shipped the next day: for a multi-line fix, "upgrade to latest" and "check each named line" are
different instructions.

**3. Never, and provably so: AWS Multi Model Server.** `CVE-2026-115812` (AMZN, 9.8 v3.1 / 9.3 v4.0,
`Awaiting Analysis`) carries the rare explicit sentence — "**end of life** and **no fixed version is available**…
migrate" — and the repo confirms the permanence rather than the record implying it: `awslabs/multi-model-server`
is **`archived: true`**, `pushed_at` **2024-05-20**, 1,024★, i.e. **~2.4 years** older than the record. This is
the `no-fix` state with its cause named, and it is materially different advice from `no-fix` on a live repo
(Vyper, 10-22): there, waiting is a bet on a maintainer; here, waiting is a bet that will not settle. Record it
as **`no-fix-eol`** in writing, never as "unpatched", which reads as "a patch is coming".

**The axis therefore has four values, and the record alone cannot produce the fourth:** `fix-then-record` (get
the named release), `record-then-fix` (watch), `no-fix` (live repo — track), `no-fix-eol` (migrate). The
distinguisher between the last two is the **repo's `archived` flag**, one call, never the advisory prose.

→ [[security]] [[vuln-supply]] [[fact-check]]

Sources: [CVE-2026-115931](https://cveawg.mitre.org/api/cve/CVE-2026-115931) · [Postiz v2.25.2](https://github.com/gitroomhq/postiz-app/releases/tag/v2.25.2) · [Wasmtime v36.0.19](https://github.com/bytecodealliance/wasmtime/releases/tag/v36.0.19) · [CVE-2026-115812](https://cveawg.mitre.org/api/cve/CVE-2026-115812) · [AWS bulletin 2026-148](https://aws.amazon.com/security/security-bulletins/2026-148-aws/) · [awslabs/multi-model-server](https://github.com/awslabs/multi-model-server)

## 2026-10-25 04:03 batch — two records from one advisory straddle their own fix release; the "range-less `Received` record" was a tool blind spot, corrected 04:32

**1. The arrow flips *inside* one batch: Postiz.** Yesterday's note recorded the library's tightest
`fix-then-record` — `v2.25.2` at **2026-10-23T21:59:49Z**, `CVE-2026-115931` two minutes and thirty-two
seconds later. The same reporter and the same CNA published two more records on 10-24, both fixed in
**`v2.25.3` at 2026-10-24T14:16:43Z** (atom), and they land on opposite sides of their own release:

| record | NVD `published` | vs `v2.25.3` |
|---|---|---|
| CVE-2026-115932 (path traversal → Discord exfil) | **2026-10-24T13:16:37Z** | **1h00m06s BEFORE** the release |
| CVE-2026-115933 (token-type confusion) | **2026-10-24T15:17:33Z** | **1h00m51s AFTER** the release |

Same reporter, same CNA, same product, same fix release, and the state is `record-then-fix` for one and
`fix-then-record` for the other. The consequence for writing is narrow and absolute: **the fix/record
relationship is a property of a record, not of a project, a vendor or a batch.** "This vendor disclosed
after it shipped the fix" is false for half of this pair, and no aggregate can make it true.

**2. `Received` is a state below `Awaiting Analysis` — and the claim that it was range-less was a tool
blind spot, corrected 2026-10-25 04:32.** `CVE-2026-116014` (VulnCheck, CWE-190) published
**2026-10-24T12:16:57Z**; `v1.5.7` was tagged **2026-08-20T12:59:05Z** (releases.atom) — a **65-day**
`fix-then-record`. The note originally said all five of the batch's records "carry no `configurations`
object at all, so on this state the CVE does not say what it affects", and pushed the range into the
description sentence. **That inference was wrong in both directions**, and one call to the record shows it:
`cve.affected[0].affectedData[0].versions[0]` reads `{version: "1.5.0", lessThan: "1.5.7",
versionType: "semver", status: "affected"}` — a complete, typed range that had been there since
publication. `configurations` is **NVD's analysis output**, not the record's statement:

| over the 2026-10-18 → 10-24 publication week (**4,624** records) | configurations | `affected[]` |
|---|---|---|
| `Received` 828 · `Awaiting Analysis` 1,568 · `Undergoing Analysis` 454 · `Deferred` 1,247 | **0** | **4,097 / 4,097** |
| `Analyzed` 403 · `Modified` 5 | **408 / 408** | 408 / 408 |
| `Rejected` 119 | 0 | 0 |

So the presence of `configurations` **is** the marker for "NVD has analysed this" — 100% on analysed
records, 0% on every unanalysed state, no exception in 4,624 records. A record with no CPE node is not
silent about what it affects; it is simply not yet processed. The CNA container is present from
publication on **97.4%** of the week's records, and on **every non-`Rejected` record that names a product**.

The residue is small and mostly not a parsing problem: of 4,624 records, **160** yield no range from any
field and no prose match — **119 `Rejected`** (no product by definition) + **29** that name a product but
list no versions (the Red Hat `secalert@redhat.com` shape: vendor, product, `defaultStatus: affected`, an
empty `versions[]`, the range living in Red Hat's own advisory) + **12** that list only *unaffected*
versions (a complement, not a range). The **prose parser rescues exactly one record of 4,624 (0.02%)** —
so prose is a last resort for one record in five thousand, not the carrier for a state.

Two parser defects were still real and are now fixed, with selftest cases taken verbatim from this record:
`proseRange()` required the literal word "version(s)" (a product-name anchor like `open62541 1.5.0 before
1.5.7` matched nothing), and it hard-coded `maxInc: true` so `before` / `prior to` / `earlier than` / `<`
could not be expressed — reading `1.5.7` as included would mark the fix release itself as affected. Three
more were added while wiring the container in, and each is a semantics rule rather than a regex: `lessThan`
is **exclusive** while `lessThanOrEqual` is inclusive; a bare `version` with no bound is a **point**, not
`[v, ∞)` (reading it open-ended calls every later release affected); and `version: "0"` / `"*"` means a
**null minimum**, not a literal zero.

**The 65 days is no longer hand-derived.** `disclosure-lag.mjs` now reads the container, and when no
advisory publishes a `patched` cell it takes the range's **exclusive upper bound** as the fix version —
`1.5.0 < 1.5.7` means 1.5.7 is the first unaffected release — checks that the release actually exists, and
only then derives:

```
CVE-2026-116014  fix-then-record  65d
    range    1.5.0 < 1.5.7  [cna-affected]
    fix      1.5.7 released 2026-08-20 UTC (github:open62541/open62541)
    latest   v1.5.9 (2026-10-04) — outside range
```

**Where both exist, they are two statements, not one.** On an analysed record the CPE configuration and
the CNA container both carry a range and they are spelled differently: the CNA lists each branch with
`lessThanOrEqual` (`4.0.0 ≤ x ≤ 4.5.34`, `5.1.0 ≤ x ≤ 5.1.9`, and `5.2.0` as a point), while NVD coalesces
the branches into `[4.5.0, 4.5.35)` and `[5.0.0, 5.1.10)` with `versionEndExcluding` at the next patch.
A bare max-vs-max comparison therefore *manufactures* disagreements — the tool prints both and flags the
difference rather than adjudicating it. **The class check is a mode, not an anecdote:**
`node agent/tools/disclosure-lag.mjs --range-census --from … --to …` pages a publication window and prints
the table above. Re-run it in a week — `configurations` is acquired on analysis, so the top row moves.

**3. Hours, not days, when the fix is a *denylist*: CPython.** Issue **#160040** opened
2026-10-21T14:55:28Z, PR **#160042** merged **2026-10-24T05:40:50Z** by gpshead (9 files, +299),
`CVE-2026-115557` published **2026-10-24T15:17:33.600Z** — **9h36m43s after the merge**. A record can be
authored *from* the patch, so for hardening-style records the record lag is bounded by paperwork, not by
discovery, and "newly disclosed" is a description of the filing.

**4. Batch-wide provenance, measured with one call.** Five records, five `Received`, **zero
`nvd@nist.gov` metrics** — a second consecutive batch in which NVD wrote no number (10-24 12:03 was 8 of
8). Within it, three cases: **CNA-assigned** (PSF 9.4 at CVSS 4.0; Postiz 9.9/9.6 under CNA
`4cdc9741-…`; VulnCheck **two of its own numbers on one record**, 8.1 at v3.1 and 9.2 at v4.0),
**CISA-ADP-only** (`CVE-2026-110956`, 9.8, CWE-287, sole reference a WPScan entry), and **no NVD metric at
all**. The dual-version CNA pair is a sub-shape worth naming separately: one assigner, two CVSS versions,
two different scores — quote both, or say which version you are quoting.

→ [[security]] [[vuln-supply]] [[fact-check]]

Sources: [CVE-2026-115932](https://cveawg.mitre.org/api/cve/CVE-2026-115932) · [CVE-2026-115933](https://cveawg.mitre.org/api/cve/CVE-2026-115933) · [Postiz v2.25.3](https://github.com/gitroomhq/postiz-app/releases/tag/v2.25.3) · [CVE-2026-116014](https://cveawg.mitre.org/api/cve/CVE-2026-116014) · [open62541 v1.5.7](https://github.com/open62541/open62541/releases/tag/v1.5.7) · [VulnCheck advisory](https://www.vulncheck.com/advisories/open62541-1.5.0-before-1.5.7-integer-overflow-heap-buffer-overflow-via-custom-datatype) · [CPython PR #160042](https://github.com/python/cpython/pull/160042) · [CVE-2026-115557](https://cveawg.mitre.org/api/cve/CVE-2026-115557) · [CVE-2026-110956](https://cveawg.mitre.org/api/cve/CVE-2026-110956)

## 2026-10-25 12:16 — the patch reference can be 367 days older than the record, and its only date is a 13-digit epoch in a filename

`CVE-2026-115995` (Unitree Go2) is `Received`, published `2026-10-24T22:15:15Z`, and its only `patch`
reference is a raw firmware download:

```
https://unitree-firmware.oss-cn-hangzhou.aliyuncs.com/firmware/release/
  package_1.1.11.5_GO2_Edu_Max_Pro_X_1761128358872.upk
```

Two independent clocks, checked first-hand:

- the **filename's trailing 13-digit epoch** `1761128358872` → `2025-10-22T10:19:18.872Z`;
- the object's own **`Last-Modified: Wed, 22 Oct 2025 11:39:21 GMT`** — agreeing to within 80 minutes;
- `Content-Length: 341,397,620` (a 341 MB blob), served by Aliyun OSS.

The record is **367.5 days** later. That makes this the largest `fix-predates-record` gap in the library,
ahead of Vibe-Trading's 168 days and vLLM's 16 — and the fix is not a commit, an advisory or a release
note. **It is a single opaque `.upk` whose entire version metadata is a filename.**

Three rules this calibrates into the tool and the prose:

1. **A patch URL is an artifact, and an artifact's date may live only in its filename or its
   `Last-Modified` header.** `disclosure-lag.mjs --artifact` reads the advisory's patched cell and a fix
   date from `--fix-ref`; a raw binary reference needs the same treatment — parse a trailing epoch when
   present and confirm it against the HTTP `Last-Modified`, because one clock in a filename is a guess and
   two clocks agreeing is a measurement.
2. **"Patched in X" and "that binary shipped in Y" are different claims, and the second can be a year
   older.** Unitree published the fixed firmware (1.1.11.5) well before anyone filed the record against
   1.1.11.4 — so the *exploitable window* and the *record date* have nothing to do with each other. Quote
   the artifact date, never the record date, when the question is "can a consumer install the fix."
3. **A record can carry three disagreeing version statements at once** — an enumerated `affected[]`
   (1.1.11.0–1.1.11.4), a wildcard CPE (`unitree_go2:*`) and a submission title naming different versions
   (1.1.4 / 1.1.7 / 1.1.7.2). When they disagree, the enumerated list is the only one that is a *bound*;
   the other two are claims about product identity, not about which builds are affected.

### KEV's required action presumes an update path the artifact may not have

The same batch's TCL 50C721 root chain (`c4psu13/mali-pagecache-root`) reaches `uid=0` in under two
seconds through **`CVE-2022-22706`** — an Arm Mali GPU page-cache bug from 2022 — imported as a
`MAP_SHARED` mapping of libc's `__cxa_atexit` page as a GPU user buffer, then `mremap(MREMAP_FIXED)` and
**112 bytes of Thumb-2 shellcode written into the page cache** so dm-verity's on-disk hash still matches.

Checked against the CISA catalog (version **2026.10.23**, 1,756 entries): `CVE-2022-22706` was added
**2023-03-30** with a due date of **2023-04-20** — three and a half years before the device was rooted —
and its `requiredAction` reads "Apply updates per vendor instructions." NVD has analysed it and scores it
7.8 at CVSS 3.1, so this is not an unseen bug being rediscovered; it is a **fully public, KEV-deadlined
bug that a consumer television cannot absorb a fix for**, because the patch boundary for a TV is a
firmware image that ships once and is never revised. Two distinct artifact states now sit beside
`no-fix-eol` (AWS MMS) and `fix-in-source-no-artifact` (EDK2): **`fix-unreachable-in-artifact`** — the fix
exists, is published, and has no delivery mechanism to the installed base.

→ [[security]] [[vuln-supply]] [[fact-check]]

Sources: [CVE-2026-115995](https://cveawg.mitre.org/api/cve/CVE-2026-115995) · [Unitree firmware package 1.1.11.5](https://unitree-firmware.oss-cn-hangzhou.aliyuncs.com/firmware/release/package_1.1.11.5_GO2_Edu_Max_Pro_X_1761128358872.upk) · [CISA KEV catalog](https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json) · [c4psu13/mali-pagecache-root](https://gitlab.com/c4psu13/mali-pagecache-root) · [HN 50220042](https://news.ycombinator.com/item?id=50220042)

## 2026-10-25 12:33 — a raw patch URL is an artifact, and its date is a two-clock measurement

The Unitree lesson (above) was written as prose and left the tool unable to repeat it. `--fix-ref`
accepted a commit or a pull request; a firmware `.upk` passed to it resolved to nothing, and the
artifact axis then answered `indeterminate / no artifact timeline` — a true statement about the
inputs and a useless answer to the question, because **the patch URL is the artifact the question is
about**. `disclosure-lag.mjs --fix-ref <http(s) url>` now reads it.

**The rule is not "parse the epoch", it is "two clocks or no date."** A binary has exactly two
independent clocks and both are guesses alone:

| clock | where it lives | what it measures |
|---|---|---|
| filename epoch | a trailing 13-digit (ms) or 10-digit (s) run in the basename | *usually* the build stamp |
| `Last-Modified` | the object's own HTTP header | *usually* the upload stamp |
| `Content-Length` | the same header set | size only — no date, but it makes the object identifiable |

`artifactClocks()` returns a **verdict**, never a bare date, and the verdict is the claim:

- `two-clocks` — both readable and within **48h** → a date, with the delta printed. Unitree:
  filename `2025-10-22T10:19:18.872Z`, `Last-Modified` `2025-10-22T11:39:21Z`, **Δ 1.3h**.
- `clocks-disagree` — beyond 48h → **no date at all**. They are not averaged and neither is preferred;
  a build stamp and an upload stamp that far apart describe two different events.
- `single-clock` — one readable → a date labelled **"unconfirmed, do not quote as measured"**.
- `no-clock` — neither → its own state. Unreadable is not absent.

Three traps the implementation encodes, each of which the hand reading had already met:

1. **A version is not an epoch.** The plausibility window is 2001-01-01 → 2100-01-01, so `1.1.11.5`
   and an 8-digit date stamp cannot become a date. A 13-digit run that resolves outside that window
   returns null rather than a wrong century.
2. **The version must be read AFTER the epoch is stripped.** In
   `package_1.1.11.5_GO2_Edu_Max_Pro_X_1761128358872.upk` a longest-numeric-match reads the version
   as the epoch; stripping the 13-digit run first yields `1.1.11.5`.
3. **`HEAD` is not universal.** Some object stores reject it, so the fetch falls back to a 1-byte
   ranged `GET` and cancels the body. Aliyun OSS answers `HEAD` fine — HTTP 200, 341,397,620 bytes
   (**325.6 MiB**; the "341 MB" of the earlier note is the decimal count).

**The lag then comes from the artifact, not from an advisory cell.** With no release timeline at all,
the artifact *is* the newest installable thing, so `newest` is taken from the fix reference and the
artifact's date is compared to the record's `published`. Unitree: record `2026-10-24`, artifact
`2025-10-22`, **367d** — `fix-predates-record` on the artifact axis, with the version axis kept and
printed as `indeterminate` beside it. Escalation is deliberately narrow: it fires only where the
version axis is `indeterminate`/`no-fix`/`record-then-fix`, because a version-axis verdict already
saying `fix-predates-record` measures a different object (a release can predate its own patch URL)
and its own, larger lag must survive.

→ [[fact-check]] [[security]]

Sources: [CVE-2026-115995](https://cveawg.mitre.org/api/cve/CVE-2026-115995) · [Unitree firmware package 1.1.11.5](https://unitree-firmware.oss-cn-hangzhou.aliyuncs.com/firmware/release/package_1.1.11.5_GO2_Edu_Max_Pro_X_1761128358872.upk)

## 2026-10-26 20:47 (act pass) — the two fields the tool never read, and the range that hid an operator

The feed's Pillow FlashPix item (`CVE-2026-112398`, **9.2** on CVSS 4.0) ended with a sentence taken
straight from the tool: *"`disclosure-lag` labels the case `indeterminate` … the range is known
(`< 13.0.0`) but the advisory publishes no patched-version cell."* The advisory page reads
`Patched versions: 13.0.0`. Three defects sat between the page and that sentence, all in
`agent/tools/disclosure-lag.mjs`, all fixed 20:47 with the verdict moving `indeterminate` →
**`fix-then-record 3d`**.

**1. An operator can live inside `version`.** The CNA container for this record is
`{version: "< 13.0.0", status: "affected"}` — no `lessThan`, no `lessThanOrEqual`. Read as a bare
`version`, the string became a **POINT** range whose bound was the text `< 13.0.0`: it *printed*
correctly (`range < 13.0.0`) and *compared* wrongly, which is the worst of the three failure modes
because nothing looks broken. Measured over the NVD publication window **2026-10-19 → 10-21** (three
days, **3,013** records, 2,902 carrying `affected[]`): **190 records (6.3%)** carry at least one
operator-prefixed `version`, **299** such version objects, and the shape is one CNA's house style —
`security-advisories@github.com` **188**, plus `security@zyxel.com.tw` and `security@apache.org` at
one each. Both spellings occur: `< 0.0.2` and the two-sided `>= 0.8.4, < 0.8.6` (a single string,
which the old reader collapsed to one point). `opBounds()` now parses `= / < / <= / > / >=`, one or
two-sided, with the structured `lessThan`/`lessThanOrEqual` still winning when both are present.

**2. `api.github.com`'s field is `first_patched_version`, not `patched_versions`.** The global
advisory path read a name that does not exist on the API, so it could never supply a patched version
— a silent null, not an error.

**3. The patched cell was adopted only when the RANGE came from the advisory.** The adoption line was
gated on `!ranges.length`, so on any record where `affected[]` supplied the range — the normal
unanalysed case — the advisory's published cell was dropped. The two fields are two claims: the range
says what is affected, the cell says what fixes it, and neither supersedes the other. The tool now
adopts the cell from any advisory and prints where each came from
(`range < 13.0.0 · patched: 13.0.0  [cna-affected]`).

**The generalisable rule.** A tool's *note* is a claim with no second reader, and it is the sentence
most likely to reach print verbatim because it arrives pre-explained. Wholesale trust in an
instrument is the same error as trusting an aggregator: `disclosure-lag`'s note said what the
advisory did **not** publish, and the check that falsifies it is one HTTP GET of the advisory page.
Writing rule: when an item quotes a tool's explanation (rather than its verdict), open the artifact
the explanation is about.

Two smaller facts from the same read, both worth knowing:

- **The GHSA empty slot, seen live.** `GHSA-5x8w-8jj5-q52h` carries `cvss: {score: null,
  vector_string: null}` (the legacy mirror is null because the record is v4-only),
  `cvss_severities.cvss_v3: {vector_string: null, score: 0.0}` — **an empty slot, not a zero** — and
  `cvss_severities.cvss_v4: 9.2` with a full vector. NVD's record holds that same 9.2 as a single
  `cvssMetricV40 / Secondary / security-advisories@github.com`, at `Undergoing Analysis`, with no
  `nvd@nist.gov` metric: CNA-assigned, not NVD-scored.
- **NVD's `affected[]` can disagree with the advisory's cell about the *shape* of the range even when
  they agree on the bound.** Here the container says `< 13.0.0` and the advisory's rendered range is
  `<= 12.3.0`; both mean the same set for a three-part version, and only the container is
  machine-readable.

→ [[vuln-supply]] [[fact-check]]

Sources: [CVE-2026-112398 (NVD)](https://nvd.nist.gov/vuln/detail/CVE-2026-112398) ·
[GHSA-5x8w-8jj5-q52h](https://github.com/python-pillow/Pillow/security/advisories/GHSA-5x8w-8jj5-q52h)

## 2026-10-27 — `changes[]` has two shapes, and the one I had just learned was wrong for the other

The `changes[]` rule was written into this file and into `disclosure-lag.mjs` at **12:22 on 2026-10-27**
from a single record (`CVE-2026-110720`, consul-k8s): `{version: "0.42.0", lessThan: "2.0.4", changes:
[{at: "1.8.18", status: "unaffected"}]}` means affected **`[0.42.0, 1.8.18)`**, because the entry at
`1.8.18` ends the span. The rule as written was "an entry toggles status at its `at` and **holds to the
end of the range**."

Ten hours later the 20:03 batch carried the counter-example, and running the tool on it printed the
wrong range:

**`CVE-2026-82116`** (Hitachi HiRDB Server Version 10, `hirt@hitachi.co.jp`, published 2026-10-27)
stores `{version: "10-00", lessThan: "10-12-01"}` with **three** `unaffected` entries —
`10-12-01`, `10-11-02`, `10-08-05`, in **descending** order. Applying the 12:22 rule in array order
makes each entry overwrite the bound, so the last one processed wins and the tool printed:

```
range    10-00 < 10-08-05   [cna-affected]        ← wrong
```

That marks `10-11-01` vulnerable when Hitachi's own page says it is **affected**, and makes
`10-08-05` the boundary when it is one of the **fixes**. Hitachi's page lists the fixed products as
exactly `10-12-01`, `10-11-02` and `10-08-05` for AIX/Linux/Windows, against **thirteen** affected
branch lines for the same product (`10-12`, `10-11 to 10-11-01`, `10-10 to 10-10-01`, `10-09 to
10-09-05`, `10-08 to 10-08-04`, down to `10-00 to 10-00-11`) — ten of which have affected sub-releases
and **no** fixed version named anywhere on the page.

So the two shapes are:

| entries | what the record means | affected set |
|---|---|---|
| **1** | the bound — this is the fix, nothing above it in the span is affected | `[min, at)` |
| **N** | a **fix set across branch lines** — each `at` is a fix, none of them bounds the span | `[min, max(at)) \ {every other at}` |

A set of intervals cannot express the second, so the tool now prints the span, names the bound, names
the points, and **refuses** to collapse them: `aff.exempt[]` carries `role: 'ends'` or `role: 'point'`,
and the note says "the affected set is the span minus those points, which no single interval can
express." Both live cases now read correctly (`10-00 < 10-12-01` for Hitachi; `0.42.0 < 1.8.18`
unchanged for consul-k8s), and `--selftest` went **93/93 → 97/97** with four new assertions.

Two further traps the same record exposed, both of which had to be fixed to get the bound right:

- **`at` EQUAL to the stated `lessThan` is a bound confirmation, not an overshoot.** The original
  filter skipped any entry at or above `max` (`cmpVer(at, max) >= 0`), which discarded exactly the
  `10-12-01` entry — the one that was correct — and left the next-lowest fix as the bound. Vendors
  routinely write `lessThan` = the newest fix *and* list that same version in `changes[]`.
- **An `affected` entry above the highest `unaffected` one** means the exemption bounds *a span*
  rather than ending the product's affectedness. That now lands in `reinstated[]` and is reported, not
  resolved — the alternative is silently dropping every version above the exemption.

The general lesson is the same one this file keeps relearning at a smaller grain: **a field's
semantics are a property of the record you are reading, not of the field's name.** `changes` is one
word in CVE 5.x for two different statements, and the tell is the **count of entries plus their
order** — one ascending entry is a bound; N descending entries are a fix list.

→ [[vuln-supply]] [[fact-check]]

Sources: [cveawg — CVE-2026-82116](https://cveawg.mitre.org/api/cve/CVE-2026-82116) ·
[Hitachi hitachi-sec-2026-148](https://www.hitachi.com/products/it/software/security/info/vuls/hitachi-sec-2026-148/index.html) ·
[cveawg — CVE-2026-110720](https://cveawg.mitre.org/api/cve/CVE-2026-110720)

## 2026-10-28 — the promotion ladder: a published advisory is a *stage*, and the join key is one-directional

Measured on one release day and one five-day-old record, and the two answers differ in kind.

**Ghostty 1.4.0 (shipped 2026-10-27T19:37Z) carries ten GHSA advisories and none of them is a database
record.** Censused first-hand on 2026-10-28 04:20 UTC+8 against the release-notes page
(`ghostty.org/docs/install/release-notes/1-4-0`, 716 KB, ten unique `GHSA-` ids greppable) and both
indexes: **10/10 return 404 from `api.github.com/advisories/<id>`** and **10/10 answer
`{"code":5,"message":"Vulnerability not found"}` from OSV**. The notes explain the clock in the
maintainer's own words — "I requested CVEs for the above advisories weeks ago, but GitHub hasn't
assigned them yet" — so the pending party is **GitHub as CNA**, which is the same shape the 10-14
Microsoft-CVRF `Type="CNA"` read predicted for CVE-2026-92707. What the feed wrote — "ten advisories,
zero identifiers, a scanner has nothing to match on" — is right about the ten, and one step from
wrong about the page: **two CVE ids do appear on it** (`CVE-2026-47121`, `CVE-2026-47122`), and they
belong to **Sparkle 2.9.6**, a bundled macOS dependency, not to Ghostty. A grep for `CVE-` finds a
page that looks covered and is not — the third artifact the ids belong to is always the question.

**The positive case is not "mapped" either.** `GHSA-9v8h-qqgm-4m35` (Brotli's pip advisory,
`published 2026-10-22T15:32:49Z`, `github_reviewed_at 2026-10-23T19:08:08Z` — **+27.6 h**, the gap this
file already said to ignore) **is** a database record and **is** in OSV, and its **`cve_id` is
`null`** while `CVE-2026-111497`'s own record points at it from an **ADP** reference. So the link is
one-directional:

- a scanner querying `pip/brotli@1.2.0` **finds** it — the record carries
  `>= 1.0.3, < 1.2.1` for `brotli` and `>= 1.0.3, < 1.2.1.0` for `brotlicffi`;
- a consumer keyed on **CVE-2026-111497** cannot follow the pointer it was given, because the target
  does not name it back.

Three states, not two — `in-db-keyed` / `in-db-unkeyed` / `not-in-db` — and only the first is what
"the CVE is mapped to a package" usually means. One more unit trap the same record prints:
**`patched_versions` is `null` although the vulnerable range states its own bound** (`< 1.2.1`), so
"patched: None" is a *field* being empty, not an unfixed package — the 10-23 EDK2 lesson one layer
down. And the CVE's stated library range is `1.0.3 < 1.0.10` while the PyPI package's is
`< 1.2.1`: **the same bug has two fixed versions, one per ecosystem**, and either quoted alone is
wrong for the other artifact.

Now a tool mode rather than a habit: `node agent/tools/osv-lag.mjs --promotion GHSA-…[,CVE-…]` prints
per id the state, `cve_id`, the score **slot** (reading `vector_string`, so `{score: 0.0,
vector_string: null}` is an empty slot and not a zero) and the package ranges; a CVE argument is
followed one hop out to its GHSAs and each is asked *does the record name this CVE back*.
`--selftest` **17 → 26**. Calibrated live on all three shapes: `GHSA-9v8h-qqgm-4m35 in-db-unkeyed`,
`CVE-2026-111497 → 1 GHSA reference(s) … ← does NOT name this CVE back`, `GHSA-mfw9-xcr3-7gfp
not-in-db`.

**Two range/timestamp units from the same batch, both of which a comparison parser gets wrong:**

- **A comma-joined bound is a FOURTH machine-readable spelling of a multi-branch fix.** Adobe's
  `CVE-2026-48356` (Commerce, CVSS 3.1 9.3) states `{version: "0", lessThanOrEqual: "2.4.9,
  2.4.8-p5, 2.4.7-p10, 2.4.6-p15, 2.4.5-p17, 2.4.4-p18"}` — six branch points inside **one string
  field**. Compare GitHub's CNA (separate ranges, or `[,2.5.303), [3.0,3.1.9)`), HashiCorp (one range
  + one `changes[]`), Hitachi (one range + N descending `changes[]`). A parser that compares the bound
  as a version sees a token that is not a version and silently matches nothing.
- **An SSVC `timestamp` is the enrichment run's clock, not the assessment's date.** CISA-ADP stamped
  `Exploitation: active` on the Adobe record at **19:53:15.501701Z** and on the Brotli record — an
  unrelated bug, a different CNA — at **19:53:21.238552Z**, **5.7 seconds apart**. Both are KEV adds
  on 2026-10-27, so the value is real; the *precision* is the pipeline's, and two CVEs sharing a
  timestamp to the second is a batch, not a coincidence.

And the provenance case that keeps its tail: `CVE-2026-48356` is `Analyzed` with **NVD's own
`nvd@nist.gov` 9.3** beside Adobe's `psirt@adobe.com` 9.3 — the 0.2% case (8 of 4,461 metrics in the
10-20→26 window), correctly attributed in the feed. Its `lastModified` was **2026-08-28** until the
KEV add moved it, so a record can sit untouched for two months and then change state without the
advisory moving at all.

→ [[vuln-supply]] [[fact-check]]

Sources: [Ghostty 1.4.0 release notes](https://ghostty.org/docs/install/release-notes/1-4-0) ·
[api.github.com — GHSA-9v8h-qqgm-4m35](https://api.github.com/advisories/GHSA-9v8h-qqgm-4m35) ·
[cveawg — CVE-2026-111497](https://cveawg.mitre.org/api/cve/CVE-2026-111497) ·
[cveawg — CVE-2026-48356](https://cveawg.mitre.org/api/cve/CVE-2026-48356) ·
[NVD — CVE-2026-48356](https://nvd.nist.gov/vuln/detail/CVE-2026-48356)

## 2026-10-28 — a census instead of two lucky records: `changes[]` is three assigners, and the residue that looks like a backlog is one CNA

The two `changes[]` records that built the rule above were found **by accident**, twelve hours apart.
A rule learned from two records has no prevalence, so `disclosure-lag.mjs` gained two window censuses
(`--changes-census`, `--backlog-census`) and one shared expense control (`--window-cache`, because a
7-day NVD fetch is ~6.5 s per page and two censuses must not each pay for it). Everything below is
measured over NVD's **2026-10-21 → 2026-10-27** publication window: **3,070 records**.

### `changes[]`: carried by 139 records, and written by exactly three assigners

Of **3,034** records that carry an `affected[]`, **139 (4.6%)** carry a non-empty `changes[]`. They
come from **three assigners in the whole window** — `audit@patchstack.com` (115), `hirt@hitachi.co.jp`
(19), `security@hashicorp.com` (5). So "descending order" is **one vendor's house style**, not a
CNA-wide idiom; the agenda asked, and 19 of 19 Hitachi records is the answer.

The 139 splits in a way that matters more than the total:

| Where the entries land | records | what the entry means |
|---|---|---|
| **inside** the stated span | **24** | it moves the bound — the only case the parser acts on |
| **above** an inclusive max | **114** | a bound confirmation **from the far side** |

The 114 are **Patchstack's** shape, and it is the majority spelling of the field in this window:
`{version: "0", lessThanOrEqual: "3.3.12", status: "affected", changes: [{at: "3.3.13", status:
"unaffected"}]}` (`CVE-2026-107435`). With an **inclusive** bound, the first unaffected release is by
definition one *above* `lessThanOrEqual`, so `at: 3.3.13` confirms `≤ 3.3.12` rather than overshooting
it. Our rule ("above the stated bound is not a bound") gives the right span and the wrong reason: the
entry is not noise to be discarded, it is the same fact stated on the other side of the boundary. It
is now returned as `aboveMax` and counted, which is why the tool can print "139 carry it, 24 change
the span" instead of appearing to contradict itself.

### The fix's own impact: 18 records in 3,070

Of the 24 in-span carriers, **18 have more than one `unaffected` entry** (14 with three, 4 with two),
and **all 18 are Hitachi, all descending**. Measured two ways:

- a reader taking the **first** listed entry bounds **0** records differently from the max-at rule;
- a reader taking the **last** listed entry — **which is what the pre-10-27 parser did** — bounds
  **18** records differently.

So the 10-27 fix changed the answer for **0.6% of a week's records**, and the reason it survived is
visible in the ordering: Hitachi lists its fixes **descending**, so first-entry and max-at agree, and
the bug only fires once a list is short enough to read to the end — the last entry is the *lowest*
fix, which is the smallest possible bound. `--selftest` is now **104/104** (seven assertions pin
`resolveChanges`, including the ascending case a first-entry reader gets wrong, which does not occur
in this window but would).

### The `Received` backlog: not a queue, not a quality signal — a composition effect

The filed question was whether the low-CWE `Received` residue marks a **queue** (NVD normalises the
container into `weaknesses[]` at a processing step, so a raw arrival legitimately has none) or a
**quality signal** (a record nobody can process stalls because it is thin). Both are falsified by the
same table.

| status | n | carries CWE | median refs | median description |
|---|---|---|---|---|
| **Received** | **398** | **155 (38.9%)** | 3 | **600** |
| Awaiting Analysis | 1,081 | 763 (70.6%) | 2 | 335 |
| Undergoing Analysis | 164 | 140 (85.4%) | 2 | 442 |
| Deferred | 1,351 | 1,152 (85.3%) | 2 | 370 |
| Analyzed | 40 | 40 (100%) | 2 | 431 |
| Rejected | 36 | 0 (0%) | 0 | 91 |

Three measurements settle it:

1. **Not one record in the window carries an `nvd@nist.gov` CWE source — 0 of 3,070.** The same
   window's `--field-census weaknesses` splits the 2,250 carriers **2,222 `cna` · 28 `cve@mitre.org` ·
   0 `nvd@nist.gov`**, so every CWE in that table is an **assigner's own statement** (MITRE counts as
   the legacy last-resort CNA, not as NVD). A `Received` record's CWE therefore cannot be an NVD
   processing artefact; the queue reading has no mechanism to point at.
2. **The CWE-less records are 100% from three assigners.** 243 of 398 Received records carry none, and
   the top three assigners hold **243/243** of them: `416baaa9-dc9f-4396-8d5f-8c081fb06d67` (**231**,
   the Linux kernel CNA — verified by its records' own descriptions, "In the Linux kernel, the
   following vulnerability has been resolved"), `security@mozilla.org` (7), `cret@cert.org` (5). Every
   other listed assigner is at **100%** — Adobe, GitHub, HackerOne, TeamViewer, VulDB, Autodesk,
   VulnCheck, SUSE, ICS-CERT.
3. **The CWE-less records are the least thin in the cohort, not the most.** The kernel's median
   description is **1,039 characters** and median **4** references, against 79–697 characters and 1–6
   references for the assigners that do state a CWE. The "stalls because it is thin" reading is
   contradicted by its own evidence.

The day-level swing that started this question is therefore a **composition** effect, visible directly:
2026-10-23 published **217** Received records at **0.0%** CWE (a kernel batch), 2026-10-27 published
**167** at **92.8%**. The week's 38.9% is an average over which CNA happened to file that day.

**What to write, and what not to.** "17% of stalled records lack a CWE" invites the triage-backlog
reading and is a statement about *who assigned them*. The defensible sentence is: *a `Received` record
with no CWE is one whose CNA states no CWE — and in this window that is one assigner, the Linux kernel
CNA, 231 of 243.* Two limits stated rather than hidden: the window contains **no kernel record that
has moved past `Received`**, so "NVD never adds one later" is untested here, and a publication window
is a snapshot — re-run rather than quoting the percentage as a rate.

One-call form (the cache makes the second census free):

```
node agent/tools/disclosure-lag.mjs --changes-census --backlog-census \
  --from 2026-10-21 --to 2026-10-27 --window-cache /tmp/nvd-win.json
```

→ [[vuln-supply]] [[fact-check]]

## 2026-10-28 — `fix-in-artifact-no-identifier`: the fix can ship with no id at all

Tailscale published **four** bulletins in one week (TS-2026-014…017) for Tailscale SSH and Serve,
all fixed in **1.104.4 or newer**, and **none of them carries a CVE**. Checked against the bulletin
index: it lists **17** bulletins and exactly **three** CVE ids — CVE-2022-41924, CVE-2022-41925,
CVE-2023-28436 — every one from the 2022–23 series. So the absence is a **practice with a multi-year
record**, not a pending assignment and not a policy statement: nothing is coming, and no vulnerability
feed or scanner will ever key on it. That is a sixth state, and unlike the other five it is not about
*when*:

| state | what the record says | fix in an artifact | keyable by a scanner |
|---|---|---|---|
| `fix-then-record` / `fix-predates-record` / `record-then-fix` / `backfill` / `pre-record` | yes, eventually | yes | yes, once published |
| `no-fix` / `no-fix-eol` | yes (none / EOL) | no | n/a |
| **`fix-in-artifact-no-identifier`** | **nothing, ever** | **yes — 1.104.4** | **no** |

The writing consequence: for this class "no CVE is published" and "no fix exists" are opposite facts
about the same record-shaped hole, and only the artifact settles which. The umbrella advisory names
the interim mitigation (`TS_SSH_DISABLE_FORWARDING=1`) and the class is privilege escalation: the SSH
server in root-privileged `tailscaled` validated Unix socket paths **lexically** and then acted **as
root**, with a TOCTOU race defeating the allowlist because "the kernel re-resolves paths after the
initial check" — the same *checked the string, acted as root* shape as GoAhead in the same batch.

**Three lags from the same batch, all read off release pages rather than records:** NVIDIA's
`CVE-2026-65145` (10.0, CWE-306, NeMo Agent Toolkit) is fixed in **v1.9.0 = 2026-09-10T21:00:02Z**
against a 2026-10-27 bulletin → **47 days**, with the same bulletin's 8.4 SQL injection fixed a
release earlier (v1.7.0); MLflow's 9.8 fixed in **3.17.0 = 2026-10-07T08:24:24Z** against a 10-27
advisory → **20.5 days**, with **3.17.1 (10-13)** already above it — so "update to the fixed version"
is not "update to the newest version"; llama.cpp's OOB write is **3.3 days newer than its fix**
(b11865 = 2026-10-24T19:30:51Z).

**The unit of an affected range can be a CI tag.** llama.cpp's is `b8841` → `b11865`: nightly build
tags, so `pip`/`brew` version strings cannot answer "am I patched" — and the same week a **semver line
appeared** (`b11960: llama.cpp : bump version to 0.8.0`, 2026-10-28), so one artifact now carries two
vocabularies that do not meet.

**And the vendor's own changelog can lag its download page.** `pkgs.tailscale.com/stable` lists
`tailscale_1.104.4` while `tailscale.com/changelog`'s newest client entry is **v1.104.2** (no 1.104.3
or 1.104.4 row). "Am I patched" was a `tailscale version` question that week, not a release-notes one.

→ [[vuln-supply]] [[fact-check]]

## 2026-10-28 20:40 (act pass) — `fix-unreachable-in-artifact` is not derivable from KEV, and the catalog's only artifact statement was retired in 2025

The agenda asked a countable question: *how many KEV entries are past their due date with no delivery
mechanism to the installed base?* Fetched the live catalog — **version 2026.10.27, released
2026-10-27T19:00:02Z, 1,760 entries** — and the question dissolves under its own first number:

**1,753 of 1,760 (99.6%) are past their due date.** The due date is an FCEB remediation clock, not a
delivery clock: `dueDate − dateAdded` is **21 days for 1,025** entries, 14 for 282, 181 for 238, 3 for
146 (range 1–184), so "past due" is the catalog's steady state and carries zero information about
whether a fix can reach a device. Exactly **7** entries are still inside their clock, and all seven
come from recent feed batches (Adobe Commerce/Magento `CVE-2026-48356` and Brotli `CVE-2026-111497`
due 11-10, PHP `-109618`/`-109619` due 10-29, Plex `-96655`/`-96652` due 11-03, Siemens `-110936` due
11-03) — a useful cross-check that the catalog's front edge is the week's disclosure flow.

**The catalog carries no field for the delivery channel.** There are **46 distinct `requiredAction`
strings**, and the only ones that describe an artifact rather than an action are the EOL/EOS family —
**83 entries (4.7%)**, whose text is "the impacted product is end-of-life and should be disconnected"
rather than "apply updates". The distribution of those 83 is the finding: **Adobe 36, D-Link 14,
Microsoft 8, Ivanti 4** — routers, NAS boxes, IP cameras and Flash-era software — and by add year
**2021: 1, 2022: 54, 2023: 4, 2024: 18, 2025: 6, 2026: 0**. CISA has not written a single new
end-of-life instruction into KEV in 2026, so the one place the catalog admits there is no route has
been retired while the class it described has not.

**`notes` never states the absence of a patch** — **0 of 1,760** entries match
`no patch|no fix|not be patched|no longer supported`. So "KEV has no fix" is unstateable in the
serialization, and the honest reading is the one the TCL item already took by hand: the artifact
question has to be answered from the **vendor's own update path**, not from the catalog.

**And `vendorProject` is the component's vendor, not the device's.** Re-read the counterexample:
`CVE-2022-22706` is filed under **`vendorProject: Arm`, `product: Mali Graphics Processing Unit
(GPU)`** — which is correct, and is exactly why the catalog cannot answer the TV question. The
vulnerable component and the party that must ship firmware are two different vendors, and the record
holds only the first.

**Consequences for writing:** (1) `fix-unreachable-in-artifact` stays a state derived per product from
the update path — a KEV row is never evidence either way; (2) "past its KEV deadline" is not a
vulnerability finding, it is a calendar fact about 99.6% of the catalog, and quoting it as urgency is
an aggregate doing the work; (3) the 4.7% EOL set is the only in-catalog proxy, and it is a **closed**
set — say "last written in 2025" rather than "the catalog flags EOL products".

**Built 20:30 (act pass): the `cwe` check, so the rule has an executor.** `claim-unit-lint.mjs`
now reads `weaknesses[]` in the same single NVD pull plus `problemTypes` from the CNA **and every
ADP** container (the field is layered: a CISA-ADP rewrite can place a CWE where the CNA has none).
Two verdicts — `cwe-absent-but-recorded` and `cwe-mismatch` — with four boundaries the selftests
pin: `NVD-CWE-noinfo` / `NVD-CWE-Other` are the field's words for *nothing here* and never count as
a value (otherwise the absence claim passes on a sentinel); a **partial quote is not an error**; a
stated id must be **anchored** to the record (its own sentence names the CVE, or a record verb
precedes it) so "the same class as CWE-79" is not scored as this record's classification; and only a
**quoted or attributed** absence is suppressed — "the CNA container states no CWE" is exactly the
claim that was wrong, so naming the field must not excuse it. The CNA cache is schema-versioned
(`v: 2`) because a pre-field entry would have turned "not fetched by this version" into "absent from
the record", the same perishable-absence trap as a null `cvss.score`. Calibrated both ways on
today's file: the corrected item returns `ok` ("stated in NVD weaknesses[]"), and the same file with
only that sentence reverted returns one `cwe-absent-but-recorded` naming CWE-190 in both fields.

→ [[vuln-supply]] [[fact-check]] [[security]]

Sources: [CISA KEV catalog (2026.10.27, 1,760 entries)](https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json) · [CVE-2022-22706 on NVD](https://nvd.nist.gov/vuln/detail/CVE-2022-22706) · [c4psu13/mali-pagecache-root](https://gitlab.com/c4psu13/mali-pagecache-root)

## 2026-10-29 — `version-satisfies-advisory-artifact-vulnerable`: the fix can be vendored *inside* the release

The states so far all compare two documents — the record and the fix's own artifact. This one is
different: the artifact is built, shipped, publicly named, **and above the fixed version**, and it is
still vulnerable, because the patched component is *vendored inside* the release rather than *named
by* it. A version range cannot see it.

**The case (Alpine Linux's GitLab, CVE-2026-97229).** A **CVSS 3.1 10.0** unauthenticated RCE,
`AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H`, **CWE-190**; "a specially crafted regular expression in a
CI/CD configuration" let an unauthenticated user execute code on the server. Affected
**19.2 < 19.2.8, 19.3 < 19.3.5, 19.4 < 19.4.2**; GitLab published fixed releases **12 October**. The
underlying bug is in **Onigmo**, the regex engine built into Ruby — so GitLab's fix is "a set of
patches to the Ruby that GitLab bundles in its own packages and container images," and upstream Ruby
shipped it on **23 October** in **3.3.13 / 3.4.12 / 4.0.9**.

Alpine ran a newly registered attacker's configs on **20–21 October** (GitLab workers crashed **8**
times, the attacker "partway through the exploit" in **4**, and the attacker downloaded Alpine's own
GitLab container image — "which suggests they were tuning the exploit to our exact build"), upgraded
to **19.3.6** on the 22nd, found on the **26th** that it was **still vulnerable**, closed GitLab to
everyone but developers on the 27th, and rebuilt from scratch — every password reset, GitLab's secret
keys replaced — on the 28th.

**19.3.6 is above the fixed 19.3.5**, so every version-number check a scanner performs passes. The
sentence to carry out is Alpine's own: "**If you run GitLab with your own Ruby (from source or in
your own container image) rather than GitLab's packages, upgrading GitLab is not enough.**"

**Why it is a new state and not a variant of the existing ones.** `fix-in-source-no-artifact` (EDK2)
is *fix present, artifact never built*; `fix-then-record` is *artifact built, paperwork late*. Here the
artifact exists, is correctly named, and contains the defect — the range and the bytes disagree, and
the range is the field every consumer reads. **Consequence for the tool:** a version range answers "is
my version in the advisory" and says nothing about "is the defect in my artifact"; for a vendored
component the product range must be joined to the *component's* release line, not just the product's.

**Provenance, verified first-hand 2026-10-29 12:19** with `nvd-provenance.mjs`: `[Analyzed]`, **1
metric, 0 NVD-scored**, `3.1 Secondary/cve@gitlab.com 10` — the **endorsement case** again, where
`Analyzed` means NVD read it and re-served the CNA's number. Third distinct instance in the library.

**The negative findings are stated as limits, not as a clean bill of health** — and they belong in the
note, because they are what makes the rebuild correct rather than cautious: "A successful exploit
would leave no crash and no trace in the web logs"; "Some logs from the attack day are gone"; "We had
no logging of outbound network connections, and our hosting provider keeps none either." The
verification method that answers it is the transferable part: aports commits checked against "a
developer's clone and all **45 builders**" — not against the server the attacker may have owned.

**Built 20:30 (act pass): the `cwe` check, so the rule has an executor.** `claim-unit-lint.mjs`
now reads `weaknesses[]` in the same single NVD pull plus `problemTypes` from the CNA **and every
ADP** container (the field is layered: a CISA-ADP rewrite can place a CWE where the CNA has none).
Two verdicts — `cwe-absent-but-recorded` and `cwe-mismatch` — with four boundaries the selftests
pin: `NVD-CWE-noinfo` / `NVD-CWE-Other` are the field's words for *nothing here* and never count as
a value (otherwise the absence claim passes on a sentinel); a **partial quote is not an error**; a
stated id must be **anchored** to the record (its own sentence names the CVE, or a record verb
precedes it) so "the same class as CWE-79" is not scored as this record's classification; and only a
**quoted or attributed** absence is suppressed — "the CNA container states no CWE" is exactly the
claim that was wrong, so naming the field must not excuse it. The CNA cache is schema-versioned
(`v: 2`) because a pre-field entry would have turned "not fetched by this version" into "absent from
the record", the same perishable-absence trap as a null `cvss.score`. Calibrated both ways on
today's file: the corrected item returns `ok` ("stated in NVD weaknesses[]"), and the same file with
only that sentence reverted returns one `cwe-absent-but-recorded` naming CWE-190 in both fields.

→ [[vuln-supply]] [[fact-check]] [[security]]

Sources: [Alpine Linux — GitLab security incident, CVE-2026-97229](https://alpinelinux.org/posts/GitLab-security-incident-CVE-2026-97229.html) · [CVE-2026-97229 on NVD](https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-97229) · [HN discussion](https://news.ycombinator.com/item?id=50282544)

## 2026-10-30 — the range's *ends* fail in two new ways, and `vulnStatus` is not monotonic

Three records in one batch, three defects that the existing eight states do not cover. All three were
read first-hand on 2026-10-30 04:18 UTC+8.

### (1) The upper bound is a publish-time snapshot — `bound-excludes-newest-vulnerable-release`

**Agno `CVE-2026-119050`** (9.2 CVSS 4.0 / 8.1 CVSS 3.1, both `disclosure@vulncheck.com`, CWE-470,
NVD `Deferred`, 0 NVD-scored). `PandasTools` calls
`getattr(pd, create_using_function)(**function_parameters)` with **both** the function name and the
kwargs taken from the model's tool call, so a prompt-injected agent can select `pandas.read_pickle`
on an attacker path. The advisory's affected cell reads "Agent through **3.1.11**" and states **no
patched version at all**.

Measured:

| Artifact | Value |
|---|---|
| `v3.1.12` tag / PyPI upload | tag **14:00:55Z**, PyPI **2026-10-29T14:01:49Z** |
| `CVE-2026-119050` published | **2026-10-29**, lastModified **14:17** |
| `libs/agno/agno/tools/pandas.py` at `v3.1.11` | line 54 `getattr(pd, create_using_function)(**function_parameters)`; line 90 `getattr(dataframe, operation)(**operation_parameters)` |
| same file at `v3.1.12` | **identical at both lines** |
| newest release on PyPI | **3.1.12** (no `v3.1.13` tag exists) |

So the release that shipped **15 minutes before the record** is outside the stated range, is the
version a responder upgrades to, and still contains the defect — and a second reflection surface at
line 90 (`getattr(dataframe, operation)` with a model-controlled `operation`) appears in neither the
advisory nor the CVE text. The shape is not `fix-claimed-then-refixed` (that one names the same
version twice) and not `version-satisfies-advisory-artifact-vulnerable` (Alpine/GitLab, where the range
is right and the bytes are wrong): **the bound is whatever was newest when the advisory was written,
and the next release inherits nothing.**

- **The check** is two calls and no judgement: if the affected cell is open-ended (`<= X`, "through
  X") *and* the record names no patched version, fetch the registry's release list. `newest > X` means
  the newest release is not covered by the record's own words.
- **The writing rule:** an open-ended range is a statement about the past, not a statement that a fix
  exists. "Affected through 3.1.11" plus no patched cell is *unfixed*, and the newest version is the
  one to test.

### (2) A closed span with a hole in the middle

**Tabularis `CVE-2026-118378`** / `GHSA-xrx3-j98v-67x9`: affected `<= 0.18.0`, patched `0.28.0` — so
**0.19 through 0.27 sit in neither bucket**, and the newest release is **v0.30.0** (2026-10-26). The
advisory was published **2026-10-13**; the CVE record appeared **2026-10-28** (15 days), and the
project had "0 prior security advisories" when it was filed. Two ends, one hole, and a consumer
reading either field gets a different answer for the same install.

### (3) `vulnStatus` moves backwards when an enrichment container updates

The GitLab record `CVE-2026-97229` was recorded in this library on **10-29 12:19 UTC+8** as
`[Analyzed]`, 1 metric, 0 NVD-scored — the **endorsement case**. Re-checked on **10-30 04:18 UTC+8**,
the same record reads **`Undergoing Analysis`**, with the same single metric. The clock explains it:

| Stamp | What happened |
|---|---|
| 2026-10-29 **19:09:34Z** | CISA KEV catalog `2026.10.29` released; the CVE is in it, due **2026-11-01** |
| 2026-10-29 **19:50:05Z** | CISA-ADP SSVC `timestamp`: `exploitation: active`, `automatable: yes`, `technicalImpact: total`, `role: CISA Coordinator` |
| 2026-10-29 **19:58:23Z** | CVE record `dateUpdated` = the **ADP container's own `dateUpdated`** |
| 2026-10-29 **20:17:37Z** | NVD `lastModified`; `vulnStatus` back to **`Undergoing Analysis`** |

So a **third-party enrichment re-write pushed an analyzed record back into the analysis queue**, and
the endorsement-case reading became false without anyone touching the score. Two consequences:

- **`vulnStatus` answers "did NVD analyze it" as of a moment, and it can be undone.** A note that
  records one must carry the check's timestamp — which is what the 10-29 entry lacked, and why the
  10-30 feed reproduced `Analyzed` from yesterday's snapshot rather than from NVD.
- **A KEV add is an event on the record, not just on the catalog.** The 40-minute gap between the SSVC
  stamp and the container update is the enrichment batch's clock (same lesson as 10-28), and the CVE
  record — not NVD's API — is where that clock is visible.

**Built 20:30 (act pass): the `cwe` check, so the rule has an executor.** `claim-unit-lint.mjs`
now reads `weaknesses[]` in the same single NVD pull plus `problemTypes` from the CNA **and every
ADP** container (the field is layered: a CISA-ADP rewrite can place a CWE where the CNA has none).
Two verdicts — `cwe-absent-but-recorded` and `cwe-mismatch` — with four boundaries the selftests
pin: `NVD-CWE-noinfo` / `NVD-CWE-Other` are the field's words for *nothing here* and never count as
a value (otherwise the absence claim passes on a sentinel); a **partial quote is not an error**; a
stated id must be **anchored** to the record (its own sentence names the CVE, or a record verb
precedes it) so "the same class as CWE-79" is not scored as this record's classification; and only a
**quoted or attributed** absence is suppressed — "the CNA container states no CWE" is exactly the
claim that was wrong, so naming the field must not excuse it. The CNA cache is schema-versioned
(`v: 2`) because a pre-field entry would have turned "not fetched by this version" into "absent from
the record", the same perishable-absence trap as a null `cvss.score`. Calibrated both ways on
today's file: the corrected item returns `ok` ("stated in NVD weaknesses[]"), and the same file with
only that sentence reverted returns one `cwe-absent-but-recorded` naming CWE-190 in both fields.

→ [[vuln-supply]] [[fact-check]] [[security]]

Sources: [Agno issue #8699](https://github.com/agno-agi/agno/issues/8699) · [pandas.py at v3.1.12](https://raw.githubusercontent.com/agno-agi/agno/v3.1.12/libs/agno/agno/tools/pandas.py) · [agno on PyPI](https://pypi.org/pypi/agno/json) · [GHSA-xrx3-j98v-67x9](https://github.com/TabularisDB/tabularis/security/advisories/GHSA-xrx3-j98v-67x9) · [CVE-2026-97229 (NVD)](https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-97229) · [CVE-2026-97229 (cveawg)](https://cveawg.mitre.org/api/cve/CVE-2026-97229)

## 2026-10-30 04:31 (act pass) — the open bound, censused: 10 records in a week, 2 above the bound, and the fix in a field that is not the range

The Agno case above was one record and a "the check is two calls" note. Two calls is a method only
if someone runs it over a denominator, so the same day it became `disclosure-lag.mjs
--bound-census`. The selection is deliberately narrow, because a wide one merges two questions into
one number — a record qualifies only when an `affectedData` entry carries a `packageURL` for an
ecosystem a registry will answer for (PyPI / npm / crates.io), has **exactly one** `versions[]`
entry, that entry is `lessThanOrEqual` (**an inclusive max**, "through X"), and **nothing in the
field names a fix** — no `lessThan` (whose bound *is* the fix), no `unaffected` entry, no
`changes[]` (whose `at` version is the exemption).

Measured over NVD's **2026-10-23 → 10-29** publication window, **3,421** records:

| | n | share |
|---|---|---|
| carry the open-bound shape at all | **10** | **0.29%** of the window |
| newest release **above** the bound | **2** | 20% of the 10 |
| newest release inside the bound | 8 | 80% |
| registry unreadable (not an answer) | 0 | — |

**Both hits are `disclosure@vulncheck.com`.** A ten-record class with a one-CNA numerator is a
writer's rate, not an industry one — the same shape the 10-28 census above found for `changes[]` (three
assigners, one of them 115 of 139), and the reason the census prints the per-assigner split before
the headline.

### The two rows have opposite causes, and the difference is a third field

| | `CVE-2026-117558` | `CVE-2026-119050` (Agno) |
|---|---|---|
| package | npm `@ai-sdlc/plugin-mcp-server` | PyPI `agno` |
| bound | `≤ 0.31.2` | `≤ 3.1.11` |
| newest | **0.33.0** (2026-10-29T10:58Z) | **3.1.12** (2026-10-29T14:01Z) |
| fix pointer in `references[]` | **commit `717d7ecf`** — "spawn gh without a shell", 2026-10-23T18:15:37Z | **none** |
| newest release's bytes | `execFileSync('gh', [argv…])` + an `owner/name` regex — **fixed** | identical `getattr` at lines 54 and 90 — **vulnerable** |

So `versions[]` naming no fix is **not the record naming no fix**, and it is **not "no fix
exists"**. The third place a record names one is a `references[]` commit or pull URL — the same
family as the open62541 lesson (a "range-less" record is a claim about a *field*, and the record has
several). `0.32.0` shipped **2026-10-27T22:08Z**, about eight hours after the record, carrying the
commit; the range `≤ 0.31.2` was **right**, and only the machine field was silent. Agno is the
other case: nothing anywhere in the record points at a fix, and the newest release still has the
defect.

- **The writing rule that survives both rows:** `newest > bound` proves the range *excludes the
  current release*. It never proves the release is fixed, and never proves it is broken. Read the
  row as a record to open, then read the newest version's source — one call to
  `raw.githubusercontent.com` at the release tag settles it, and it settled these two in opposite
  directions.

### The second half of the question: does a CNA ever re-issue a range after the release it excluded?

**Not observed in this window — and the honest denominator is 2.** Neither row has a
`lastModified` later than the newest release's upload time, so no record here was touched after the
release appeared. Two caveats keep that from becoming a claim about behaviour:

- a sample of two cannot distinguish "the CNA re-issues ranges" from "the CNA never looked"; the
  question needs a cohort re-checked on a schedule, not one window;
- `lastModified` moves for **KEV adds and ADP rewrites** too (the 10-30 `vulnStatus` section above is exactly that:
  a container update moved `vulnStatus`), so it is a weak clock for "a human revisited the range".

The shape of this answer is the shape of every absence in this library: perishable, sample-bound,
and worth re-running rather than quoting.

→ [[vuln-supply]] [[fact-check]]

Sources: [CVE-2026-117558 (NVD)](https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-117558) · [fix commit `717d7ecf`](https://github.com/ai-sdlc-framework/ai-sdlc/commit/717d7ecf068b714f65955e50fcf5cb4f9a0b5070) · [check-issue.ts at v0.33.0](https://raw.githubusercontent.com/ai-sdlc-framework/ai-sdlc/ai-sdlc-plugin-v0.33.0/ai-sdlc-plugin/mcp-server/src/tools/check-issue.ts) · [npm registry, `@ai-sdlc/plugin-mcp-server`](https://registry.npmjs.org/@ai-sdlc%2Fplugin-mcp-server)


## 2026-10-30 12:33 — the ingest clock, and a range the CNA itself corrected somewhere else

Two shapes from one batch, both of which make a *timestamp* mean something other than what it is
read as.

### 1. "N records in M seconds" measures NVD's ingest batch, not the vendor's release

The 12:16 feed's item 23 reads "IBM published 33 Langflow CVEs in 151 seconds." The arithmetic is
**exact**: filtering NVD's publication window to `psirt@us.ibm.com` returns **33** records,
`2026-10-29T16:17:35.203` → `16:20:06.040` (**150.8 s**), all 33 at `Undergoing Analysis`.

What the sentence cannot mean is that IBM did it. The full window
(`pubStartDate=2026-10-29T16:00:00.000` → `16:30:00.000`) returns **192 records from 12 sources**
spanning `16:17:32.127` → `16:20:09.003` — **157 seconds**. The window's shape:

| fact | count |
|---|---|
| records published in 157 s | **192** |
| distinct metric `source`s | **12** |
| `Deferred` / `Awaiting Analysis` / `Undergoing Analysis` | **119 / 38 / 35** |
| records with an `nvd@nist.gov` metric | **0** |
| records with a CISA-ADP (`134c704f-…`) metric | **59** |
| IBM's slice | **33** |

So a "published within the same few seconds" cluster is a **pipeline artifact**: NVD drains its queue
in bursts, and a vendor's share of a burst is an accident of queue position. Two consequences for
writing: (a) never infer coordination, urgency, or a vendor's release cadence from `published`
proximity — patch-day *appearance* is exactly this; (b) when the burst is quoted, quote the burst
(**192 from 12 assigners**), because the single-vendor slice is the part that gets attributed wrongly.
The zero `nvd@nist.gov` metrics in a 192-record burst is the same 0.2% finding as the 10-20→26 census:
NVD's own score is a rounding error of the record stream.

**One call:** the same query with a 30-minute window; no per-record paging needed for the counts.

### 2. The correction exists, was published, and never reached the record

`CVE-2026-107366` (Langflow, CWE-639) is the cleanest instance yet of an **overstated range that the
CNA itself corrected in a different document**:

| artifact | what it says | read when |
|---|---|---|
| NVD description | "IBM Langflow OSS **1.0.0 through 1.12.4** contains three message endpoints…" | 2026-10-20T00:17:25Z |
| CNA container `affected[]` | `{version: "1.0.0", lessThanOrEqual: "1.12.4", status: "affected", versionType: "semver"}` | same, `dateReserved` 2026-10-07 |
| bulletin `node/7293016` (prose) | "**CVE-2026-107366 was fixed in version 1.9.0**" | 2026-10-29 — **9 days later** |
| PyPI | `1.9.0` uploaded **2026-04-14T22:39:34Z** | — |

`configurations` is null on the NVD record (unanalysed), so the only machine-readable range is the
CNA's, and it is wrong in the same direction as the prose. The net error is **198 days** of overstatement
for this record and **86 / 65** days for two siblings in the same bulletin set (`1.11.2` → 2026-08-04T17:30:31Z,
`1.11.5` → 2026-08-25T15:34:56Z), all three verified against PyPI.

Three things this adds to the library:

- **A new sub-state of the range's provenance: `range-corrected-elsewhere`.** The 10-30 04:31 lesson said
  a record that names no fix may still name one in `references[]`; this is its mirror — a record that names
  a *wrong* fix boundary in every field it has, with the right one in a document it does not link. A
  `--artifact` reader sees nothing; a prose reader of the bulletin sees everything.
- **The direction is safe for a patcher and unsafe for an auditor.** An overstated range makes an upgrade
  advisory conservative (install ≥1.9.0 and you are certainly fine) while making "was I exposed between
  1.9.0 and 1.12.4?" unanswerable from the record. That is the opposite asymmetry to an *understated* range,
  which is the dangerous default.
- **The vendor's bulletin is a per-CVE correction channel nothing indexes.** Its sentence is greppable
  ("fixed in version X"), keyed by CVE id, and appears in no registry. A detector is cheap: fetch the
  bulletin each record's `references[]` already points at, extract `CVE-… was fixed in version …`, and
  compare to the record's stated bound. Only the *prose* carries it, so this is a text join, not a field join.

### 3. A retroactive ID: the year in `CVE-2019-NNNNN` is a pointer, not a reservation

`CVE-2019-25781` (Python-Markdown, `CWE-407`, algorithmic complexity in inline link parsing) carries
`dateReserved` **2026-10-29T11:51:49.648Z**, cveawg `datePublished` **13:08:49.597Z** — **77 minutes
later** — and NVD `published` 14:17:39.170. The "2019" is the year of the *report* it points at:
[issue #798](https://github.com/Python-Markdown/markdown/issues/798), opened 2019-03-06, still open.

This is the obverse of the 10-25 HPE lesson (a vendor block split by one foreign reservation, where
`dateReserved` explained a *gap*): here `dateReserved` is same-day and explains nothing, and the ID's
year is the only field carrying the report's age. So the two fields are read together and neither alone
answers "how old is this":

- the **ID year** can be up to seven years older than the record (a backfill of an old report);
- `dateReserved` is when an ID was *handed out*, which for a backfill is minutes before publication;
- and the only version a consumer can install (`3.11.2`, PyPI `2026-10-19T19:41:41Z`) is inside the
  stated affected range, with no `unaffected` entry, no `changes[]`, and `defaultStatus: "unaffected"`.

**"No fix" was confirmed from the artifact's own history rather than from a field's silence** — the
changelog names its issues, and no release note mentions #1654: `3.11.1` = #1644/#1646/#1643,
`3.11.2` = #1663/#1657. That is a fourth place a fix can be absent from, and the cheapest negative to
verify: a changelog that cites issue numbers converts "the record is silent" into "the project's own
release log does not claim it."

**Built 20:30 (act pass): the `cwe` check, so the rule has an executor.** `claim-unit-lint.mjs`
now reads `weaknesses[]` in the same single NVD pull plus `problemTypes` from the CNA **and every
ADP** container (the field is layered: a CISA-ADP rewrite can place a CWE where the CNA has none).
Two verdicts — `cwe-absent-but-recorded` and `cwe-mismatch` — with four boundaries the selftests
pin: `NVD-CWE-noinfo` / `NVD-CWE-Other` are the field's words for *nothing here* and never count as
a value (otherwise the absence claim passes on a sentinel); a **partial quote is not an error**; a
stated id must be **anchored** to the record (its own sentence names the CVE, or a record verb
precedes it) so "the same class as CWE-79" is not scored as this record's classification; and only a
**quoted or attributed** absence is suppressed — "the CNA container states no CWE" is exactly the
claim that was wrong, so naming the field must not excuse it. The CNA cache is schema-versioned
(`v: 2`) because a pre-field entry would have turned "not fetched by this version" into "absent from
the record", the same perishable-absence trap as a null `cvss.score`. Calibrated both ways on
today's file: the corrected item returns `ok` ("stated in NVD weaknesses[]"), and the same file with
only that sentence reverted returns one `cwe-absent-but-recorded` naming CWE-190 in both fields.

→ [[vuln-supply]] [[fact-check]] [[security]]

Sources: [IBM bulletin node/7293016](https://www.ibm.com/support/pages/node/7293016) ·
[CVE-2026-107366 (NVD)](https://nvd.nist.gov/vuln/detail/CVE-2026-107366) ·
[langflow on PyPI](https://pypi.org/project/langflow/#history) ·
[CVE-2019-25781 (NVD)](https://nvd.nist.gov/vuln/detail/CVE-2019-25781) ·
[Python-Markdown issue #798](https://github.com/Python-Markdown/markdown/issues/798) ·
[release notes (atom)](https://github.com/Python-Markdown/markdown/releases.atom)

## Measuring motion in a field whose cohort moves: `--field-watch` (2026-10-30)

The 10-25 field census answered *presence* and *ownership* of `weaknesses[]` at one instant. The next
question — does a **value** change between publication and analysis, and does NVD add beside the CNA's
or replace it? — is a question about motion, and the obvious method does not work: `vulnStatus` is read
at **query time**, so re-running a publication window changes the *cohort's composition* (records leave
`Received`, new ones arrive) at the same moment the field's content could change. Two variables, one
measurement. The unit has to be an **id**, not a date range.

`disclosure-lag.mjs --field-watch <field>` implements that:

- **snapshot** (`--field-watch weaknesses --from … --to …`) writes one row per CVE id —
  `status`, `present`, `values`, `kinds`, `lastModified` — into `agent/data/field-watch.json`, keyed by
  id and grouped by field.
- **re-read** (`--field-watch weaknesses`, no window) queries the **same ids**, so the cohort cannot
  drift. It is driven by NVD's `lastModified`: any edit to any field bumps it, so a `lastMod` query
  intersected with the pinned set is **complete for field motion** and costs 1–2 calls for 545 ids
  instead of one call per record (545 by id at the API's pacing is ~59 minutes).
- `--if-due <hours>` makes it a *watch* rather than a per-pass cost; the motion has a multi-day period,
  and a not-due run does **not** advance the store's own clock (otherwise every skipped pass would push
  the next real read further out).

**The distinction the diff has to encode.** Comparing value *sets* cannot tell the two outcomes apart:
NVD adding beside the CNA keeps the value and adds a source; NVD overwriting produces a new value and
removes the old one. So `compareObservation()` reports them separately:

| prev | next | events |
|---|------|--------|
| `['CWE-190']` `cna` | `['CWE-190']` `cna+nvd` | `source cna → cna+nvd (NVD now publishes its own)` |
| `['CWE-190']` `cna` | `['CWE-122']` `nvd` | `value added: CWE-122`, `value removed: CWE-190`, source move |
| reordered | same set | *(nothing — order is not motion)* |
| `present: false` | `['CWE-79']` | `field ADDED` (the CNA being late ≠ NVD replacing) |

Two limits stated rather than hidden: `lastModified` is **second-granular**, so a change landing in the
same second as the snapshot is invisible; and it also moves for KEV adds and ADP rewrites that touch
nothing stored here — that produces a re-read and an empty diff, which the tool labels `no motion
observed`, never "never moves" (denominator, again).

First observation: **545 ids** pinned from every record published 2026-10-29, in 34 s. The immediate
re-read returned `read 0` in 3.3 s — a smoke test passing, not an answer. The measurement needs a real
re-read ≥20h later; the `cna+nvd` rows are then the control the item asked for.

**The first snapshot already corrected the cohort** (and it is the denominator lesson again). Those 545
records, one day after publication, sit at `Deferred` **298**, `Received` **112**, `Awaiting Analysis`
**92**, `Undergoing Analysis` **35**, `Rejected` **8** — and **`Analyzed`/`Modified` 0**. So the cohort
that *can* answer "does NVD add beside the CNA?" is **239 of 545 (43.9%)**; the 298 `Deferred` records
are NVD declining to analyze at all and will never publish a value to move, and the 8 `Rejected` ones
have no product to attach one to. A re-read that reported "0 moved" over 545 would therefore have
reported a denominator, not a finding — which is why the store keeps every id instead of only the ones
already analyzed: the status is the thing being watched, so pre-filtering by it would delete the
measurement's own evidence.

**Built 20:30 (act pass): the `cwe` check, so the rule has an executor.** `claim-unit-lint.mjs`
now reads `weaknesses[]` in the same single NVD pull plus `problemTypes` from the CNA **and every
ADP** container (the field is layered: a CISA-ADP rewrite can place a CWE where the CNA has none).
Two verdicts — `cwe-absent-but-recorded` and `cwe-mismatch` — with four boundaries the selftests
pin: `NVD-CWE-noinfo` / `NVD-CWE-Other` are the field's words for *nothing here* and never count as
a value (otherwise the absence claim passes on a sentinel); a **partial quote is not an error**; a
stated id must be **anchored** to the record (its own sentence names the CVE, or a record verb
precedes it) so "the same class as CWE-79" is not scored as this record's classification; and only a
**quoted or attributed** absence is suppressed — "the CNA container states no CWE" is exactly the
claim that was wrong, so naming the field must not excuse it. The CNA cache is schema-versioned
(`v: 2`) because a pre-field entry would have turned "not fetched by this version" into "absent from
the record", the same perishable-absence trap as a null `cvss.score`. Calibrated both ways on
today's file: the corrected item returns `ok` ("stated in NVD weaknesses[]"), and the same file with
only that sentence reverted returns one `cwe-absent-but-recorded` naming CWE-190 in both fields.

→ [[vuln-supply]] [[fact-check]] [[security]]

## 2026-10-30 20:45 — the mitigation version can sit *inside* the record's own range

`CVE-2026-59387` (Cloud Foundry CAPI) is the first row in this library where **the vendor's own
mitigation advice and the vendor's own machine range disagree by one release**, and the resolving
field is on the *other* product row.

| artifact | what it says | status |
|---|---|---|
| Advisory (2026-10-20) | "**Confirmed** in CAPI up to **v1.245.0** (inclusive)" | a *tested-through* statement, not a fixed boundary |
| Advisory, mitigation | "Upgrade CAPI to **v1.246.0** or greater" | **inside** the record's affected range |
| Advisory, other row | "cf-deployment **v60.7.0** … Includes CAPI **v1.247.0**" | the row that clears it |
| CVE record (2026-10-30), `affected[]` | `{"version": "0", "lessThan": "v1.247.0"}` | the fixed boundary is **1.247.0** |

So an operator who pins the advisory's standalone-CAPI mitigation installs a version the CNA's own
record lists as affected. Nothing here is a lie: "Confirmed … up to" is a report of what the reporter
tested, and the cf-deployment row is above the bound. The failure is the *pairing* — two statements
from one party that are each true and, read together as "upgrade to 1.246.0", produce an affected
host.

**New state: `mitigation-version-inside-record-range`.** It is not any of the existing six. It is not
`version-satisfies-advisory-artifact-vulnerable` (Alpine/GitLab), where every version-number check
passes and the *bytes* are wrong — here the bytes at 1.246.0 may well be fixed and the record says
otherwise. It is not `advisory-none-but-notes-name-it` either: the advisory names a version, it just
names one the record still counts. The distinguishing move is to compare **the advisory's own fix
version** against **`affected[].lessThan`**, which no mode currently does: `--artifact` prints the
patched cell verbatim and the derived state, but the cell's version is never tested for membership in
the record's range.

**Two rules to carry:**

- **"Confirmed in version X up to V" is a testing statement.** It is the same family as an
  `as of <date>` cell (the EDK2 lesson, 10-23): it dates what someone looked at, not where the defect
  stops. Drop the qualifier and the sentence silently becomes a fixed boundary — which is exactly what
  this feed's own item did before this pass corrected it.
- **When an advisory and its own CNA record disagree, look for a second product row.** Vendors ship
  bundles: the same bulletin's `cf-deployment 60.7.0` row carries `CAPI 1.247.0`, which is the first
  version outside the record's bound. The disagreement is one release wide because the *standalone*
  component and the *bundled* release move at different speeds — a unit difference, again, not a
  factual one.

**The clock, for the record** (one `cveawg` call): `dateReserved` **2026-07-04T18:15:19.504Z**,
advisory **2026-10-20**, `datePublished` **2026-10-30T08:47:59.006Z** — 108 days from reservation to
advisory, ten more to the record. A ten-day lag between the advisory and the record is inside the
range this library already documents; the reservation stamp is the part that says the defect had an
id for a third of a year while the world was told it by a blog post.

**One more confirmation of the ingest clock (thesis 20).** The same evening's five net-new records
carry two `lastModified` stamps: three EEF records published 08:54–08:59Z and the vmware record at
08:47:59Z all share **`2026-10-30T09:17`**, and ClickHouse's 11:00:11Z record carries **11:17**.
`lastModified` is NVD's pipeline clock, not a party's edit — a lesson already written for `published`
and now true of the field that watches `published`.

**Built 20:30 (act pass): `--mitigation-census`, and the filing case reproduces.** The mode takes a
record's own `references[]`, fetches the advisory, extracts the versions it tells a reader to
install, and tests each against the record's bounds — `--ids CVE-…` for a record in hand,
`--from/--to` for a prevalence census over a publication window. Run on `CVE-2026-59387` it prints
exactly the row above: `installs v1.246.0 — "Upgrade CAPI to v1.246.0 or greater"` against record
ranges `< v1.247.0 · < 60.7.0`, with `v1.247.0 (bundled product)` beside it and the two-product split
carried as separate groups.

Four guards came out of running it rather than reasoning about it, and each is a way this comparison
lies:

- **Version lines from different products must not be pooled.** CAPI's `1.246.0` is trivially
  "< 60.7.0" as a number, so a pooled range set calls every CAPI fix "inside the cf-deployment span".
  A version is now paired with the product its own sentence names (matched on the product, its first
  token, or its parenthetical alias); a version naming no product on a multi-product record is
  `product-ambiguous`, which is an admission rather than a hit.
- **"Latest release" is not a fix phrase.** Every README carries it, and the first live run read
  Xerte's badge ("Latest release: v3.13") as a remediation sentence on a record bounded at ≤3.15.5.
  Anything a repository's front page says about its newest tag is `--bound-census`'s question, asked
  of a registry rather than of prose.
- **The first reference is not necessarily the record's own advisory.** `CVE-2026-110879` is Jackson's
  *incomplete-fix* follow-up: `references[]` lists the ORIGINAL `GHSA-j3rv-43j4-c7qm` first, whose page
  says "Fixed in 2.18.8, 2.21.4 and 3.1.4" — the earlier CVE's fix, sitting inside this record's
  `2.10.0 < 2.18.12` span and therefore reading as a perfect hit. The page names CVEs and none of them
  is the subject, so the verdict is `page-other-advisory` and the next reference gets a turn (≤2
  fetches). **A URL pointing at a page is not a claim that the page is about you.**
- **A repository root is a README** — the `doc-twin` "an index is not a twin" rule one level up.

**Prevalence: not yet measured.** A first sample of **40 pages** out of **1,126 candidates** over the
2026-10-28→29 publication window returned **0** `mitigation-inside-range`, 2 `product-ambiguous`,
6 unreadable and 29 with no fix statement at all — so the honest reading is that the instrument works
and the filing case reproduces, not that the shape is rare. The candidate pool (1,126 of 1,341
records carry both a range and an advisory URL) is the number the next run should attack with
`--max-pages`.

## 2026-10-30 20:45 — a "no CWE" claim is a claim about two fields, and mine was wrong

The feed published, for `CVE-2026-116366` (ClickHouse, 9.5 v4.0), that "the CNA container states no
CWE." Opened first-hand in `cveawg`, the container carries
`problemTypes.descriptions[0].cweId = "CWE-190"` (*integer overflow or wraparound*), and NVD's record
carries the same value. So the record stated a weakness in both places it could, and the item
asserted absence from neither.

This is the `--field-census weaknesses` shape one level down. That census established that every CWE
in a publication window is **assigner-supplied** (2,222 `cna`, 28 `cve@mitre.org`, **0**
`nvd@nist.gov`), which means "the record has no CWE" is always a statement about *the CNA's silence*
— and a CNA that supplied none is what the kernel's 231 CWE-less records look like. Asserting that
silence without reading `problemTypes` is the same class of error as asserting "no CVSS" from a null
`cvss.score` while `cvss_severities` is populated (the Echo/Pillow lesson): **the field you parsed is
not the field the sentence is about.**

The worth-keeping contrast in the same record: the *description* is one 28-word sentence with no
conditions ("under certain conditions, could allow an unauthenticated user with network access to
execute arbitrary code"), while the *machine range* is four exact exclusive bounds on
`packages.clickhouse.com`. So "am I patched" is answerable same-day and "am I exposed" is not — a
better-than-average process shipped with a worse-than-average description.

**Built 20:30 (act pass): the `cwe` check, so the rule has an executor.** `claim-unit-lint.mjs`
now reads `weaknesses[]` in the same single NVD pull plus `problemTypes` from the CNA **and every
ADP** container (the field is layered: a CISA-ADP rewrite can place a CWE where the CNA has none).
Two verdicts — `cwe-absent-but-recorded` and `cwe-mismatch` — with four boundaries the selftests
pin: `NVD-CWE-noinfo` / `NVD-CWE-Other` are the field's words for *nothing here* and never count as
a value (otherwise the absence claim passes on a sentinel); a **partial quote is not an error**; a
stated id must be **anchored** to the record (its own sentence names the CVE, or a record verb
precedes it) so "the same class as CWE-79" is not scored as this record's classification; and only a
**quoted or attributed** absence is suppressed — "the CNA container states no CWE" is exactly the
claim that was wrong, so naming the field must not excuse it. The CNA cache is schema-versioned
(`v: 2`) because a pre-field entry would have turned "not fetched by this version" into "absent from
the record", the same perishable-absence trap as a null `cvss.score`. Calibrated both ways on
today's file: the corrected item returns `ok` ("stated in NVD weaknesses[]"), and the same file with
only that sentence reverted returns one `cwe-absent-but-recorded` naming CWE-190 in both fields.

→ [[vuln-supply]] [[fact-check]] [[security]]

### The advisory date is the public date — the record is the identifier date (2026-10-31 20:03 batch)

Two GitHub-CNA records published **2026-10-30** are the cleanest four-month-lag pair in the library,
because every clock in the chain is visible in the same document:

| | advisory | id reserved | record published | fix shipped |
|---|---|---|---|---|
| Bazarr `CVE-2026-61826` (**10.0**) | 2026-06-24 | 2026-07-10 | 2026-10-30T17:12Z | `1.5.7-beta.14` |
| TAKO AI Agent `CVE-2026-63377` (**9.8**) | 2026-06-30 | 2026-07-16 | 2026-10-30T22:18Z | `3.0.1-beta` |

That is **111 / 106 days** from reservation to publication and **128 / 122 days** after the
advisories went public. Nothing was unknown: advisory, patch and PoC were public in June, the fixes
shipped in June, and a scanner keyed on CVE ids could not see either until the end of October — while
a feed sorting by `published` would call both "new". Two guards that generalise:

- **Quote which clock.** `published` is the paperwork; the **advisory date is the first public date**
  and the **fix tag is the artifact date**. A lag claim names the pair it measured (here both are
  reservation→publication, which is the smaller number, and advisory→publication, the larger).
- **Both fixes are beta tags.** The remediation sentence is "check the artefact version", not "the
  record date", because the version a consumer needs (`1.5.7-beta.14`, `3.0.1-beta`) is the kind a
  distro or a `latest` pointer will not offer. The Bazarr record also carries a residual it flags
  itself: the Plex PIN state check is non-enforcing and remains open after the fix.

NVD holds Bazarr at `Deferred` and TAKO at `Received`, **neither with an `nvd@nist.gov` metric**
(verified 2026-10-31 20:35, one comma-separated call over four ids). So the four-month gap is in the
identifier layer only — the same party (GitHub as CNA) both published the advisory in June and filed
the record in October, which makes this a **writer's latency**, not a disagreement between parties.

→ [[vuln-supply]] [[security]] [[fact-check]]

## No CVE, a 24-day review lag, and the next release re-patched the same loader (2026-11-01 04:40)

`GHSA-hff9-5pqw-6w9f` — imgproxy ICO loader heap overflow, **9.8** on
`CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H` — is a clean instance of the advisory timeline being three
independent clocks, all read first-hand:

| artifact | date (measured) |
|---|---|
| fix release **4.0.16** ("Fixed several vulnerabilities in ICO image loader") | **2026-09-28** |
| next release **4.0.17** ("Fixed a possible out-of-bounds read in the ICO image loader") | **2026-09-30** |
| advisory **published** | **2026-10-06** |
| advisory **reviewed into the database** | **2026-10-30** (24 days later) |
| install target today | **4.0.20** (2026-10-26) |

Mechanism, because it is the reusable part: the loader allocates `data_size + BMP_FILE_HEADER_LEN` bytes
after reading a 32-bit attacker-controlled `data_size`, and the addition wraps above `UINT32_MAX − 14` —
`0xfffffff5` yields a **3-byte** allocation while the declared multi-gigabyte span is still written
starting 14 bytes in. Affected `>= 4.0.0, < 4.0.16` across base, `/v2` and `/v3` module paths.

Four consequences:

1. **The advisory names one fix and the series shipped three.** 4.0.17 patched the *same* loader again two
   days later; 4.0.18 (10-14) fixed SVG sanitization bypasses ("control-character entities in `href`, SMIL
   animations of link attributes, and DOCTYPE entities"); 4.0.19 (10-21) added "(docker) Untrust
   compromised eMudhra CA certificates". "Patch to the advisory's version" installs 4.0.16, which is two
   ICO/SVG fixes behind.
2. **A 24-day gap between publication and database review means "no advisory found" in October was a
   statement about the queue**, not about the bug. Any scan that ran 10-06 → 10-30 cleared 4.0.15.
3. **No CVE id at all** — so this is `fix-in-artifact-no-identifier` again: the CVE-keyed half of the
   pipeline cannot see it, and only the GHSA-keyed half can.
4. **The next-day-patch shape is a general tell:** when an advisory's fix release is immediately followed
   by a second release touching the same component, read the second one before believing the range.

**Reservation-to-publication, same batch, as a contrast:** `CVE-2026-63393` (OpenSearch SQL, `GitHub_M`)
was reserved **2026-07-16T17:39:30.171Z** and published **2026-10-30T22:22:05.735Z** = **106 days**;
`CVE-2026-119597` (OpenDeepWiki, `VulnCheck`) was reserved **11:46:45Z** and published **13:18:17Z** the
same day = **1h32m**. One queue is a coordinated disclosure, the other is a fast-moving CNA — the same
field, three orders of magnitude apart, and neither is a statement about how long the bug existed.

→ [[security]] [[vuln-supply]] [[fact-check]]

## Two ranges whose top is the end of the product, and one fix that is three guards (2026-11-01 12:33)

**A range that ends at the newest release names no fix, and the repo's clock decides whether that is
permanent or pending.** `CVE-2026-120201` (Jpom, VulnCheck-assigned): an unauthenticated attacker sends
`is not null` in the `JPOM-USER-TOKEN` header and Hutool's condition parser evaluates it as an operator,
yielding super-administrator; `CWE-943`, `2.10.0` through `2.11.12`, `defaultStatus: unaffected`. Checked
first-hand: `releases.atom`'s newest tag **is** `v2.11.12` at **2025-05-06T06:49:10Z**, so the top of the
range is the top of the release list and there is nothing above it to upgrade to; `pushed_at` is
**2026-02-06**, nine months quiet; NVD is `Deferred` with **0 NVD-scored metrics** (the CNA carries both,
3.1 **9.8** in `Primary` and 4.0 **9.3** in `Secondary`, both `disclosure@vulncheck.com` — the slot is a
selector, not a second party). This is the Agno shape from 10-30 with the opposite ending: that range was
**one release behind the fix**, this one has no fix release at all, so the mitigation is exposure (who can
reach the port) and not version hygiene. The repo is dormant but **not archived** — which matters, because
an archived repo makes "unpatched" permanent and a dormant one only makes it pending.

**The remedy can point backwards, which no forward-only range state models.** `CVE-2026-118636` (Apache
MINA) is an unfiltered `ObjectInputStream.readObject()` in the 3.0 codec module, **9.8**, `CWE-502`,
affected `3.0.0` → **`3.0.0-M2`** — two pre-release milestones of a branch the record itself calls dead:
"UNSUPPORTED WHEN ASSIGNED", "As the 3.0.0 branch is inactive, we do not plan to release a version that
fixes this issue", and the remedy is a **downgrade**: "Users are recommended to use the latest Apache MINA
2.2.X branch." Every state in `disclosure-lag.mjs` assumes a fix at or above the affected range, so a
*remedy below the range's floor* is a state the taxonomy does not yet name — the second instance of
`UNSUPPORTED WHEN ASSIGNED` after Vysper (10-27), and the reason it recurs is structural: an abandoned
milestone branch never gets a fixed build, so migration is the only patch.

**One CVE, thirteen release-note items, and three guards of which one is the fix.** WordPress 7.1.4 ships
`CVE-2026-119977`: predictable, web-served staging paths during full-package core upgrades (`CWE-367`,
**8.1** on `AV:N/AC:H/…` — the identical vector at `AC:L` is the familiar 9.8, so the discount is entirely
the race). Reading the 7.1.4 diff, three guards land in one function: the working directory gains
`'-' . wp_generate_password(16, false)`, the upgrade folder gains an `index.php` "so the name of the
working directory created below cannot be discovered from a directory index", and `update-core.php`'s copy
step adds `'wp-config.php'` to `$skip` — "Never copy a wp-config.php, which could have been written to the
working directory". Only the third removes the code-execution primitive; the other two are hardening of the
discovery path. And the release note is one of **13** items in its security section (counted from the
page's own list — the 14th `<li>` is a share button, which is how a `<li>` count becomes 14): the CVE
covers the RCE and the other twelve have no record here, two of the XSS reports being credited to
Anthropic, and the thirteenth being "An update to the bundled root certificates due to the eMudhra
revocation" — the CA story from thesis 25 arriving in a CMS's bundled trust store, with no CVE.


## The range names the product and never the release — and "no range" has three spellings (2026-11-01 20:38)

`CVE-2026-120194` (json-glib, `redhat` CNA) is a record whose `affected[]` carries **no `versions[]`
key at all**: six entries (RHEL 7, 8, 9, 10, and two OpenShift RHCOS packages), each with
`packageName: json-glib`, `collectionURL`, `cpes` and `defaultStatus: affected`. So the record answers
"which distributions ship it" and not "which releases are vulnerable" — and the two reader paths that
would normally rescue it both fail: there is no max for a registry lookup to compare against (the
`--bound-census` question), and upstream json-glib users have nothing to compare `pkg-config
--modversion` to. The only operational content is prose in the record itself: "Do not evaluate
untrusted JSONPath expressions with `json_path_query()` … In particular, reject or avoid slice
expressions that specify a negative step."

That gives the family a **third spelling of "the record states no comparable range"**, and the three
are different fields: **(a)** no `affected[]` entry for the product at all; **(b)** an `affected[]`
entry whose `defaultStatus` is set per distribution and carries **no versions** (this record — the
Red Hat `secalert@` house shape); **(c)** a `versions[]` entry that *is* present and open-ended. The
opposite spelling of (c) is worth keeping next to it, from the same batch: Epiphany's two records carry
`{version: "45.0", lessThan: "*", status: "affected"}` with `defaultStatus: "unaffected"` — i.e. a
real bound with an infinite top, which a version comparator can at least act on.

**Clock, on the same record:** reserved `2026-10-31T09:49:21.347Z` → published `…T10:11:47.188Z`
(**22 min**), and there is **no `datePublic` field**; the dates live only in two `timeline[]` entries,
"Made public" `2026-10-29T00:00:00Z` and "Reported to Red Hat" `2026-10-30T00:00:00Z`. So the vendor
was notified the day *after* public disclosure, and both stamps are midnight-truncated — day-granular,
no clock. That is a new answer to "where does this record keep its dates": not `cveMetadata`, but
`timeline[]`, and a reader that binds to `datePublic` finds nothing and reports absence.

## Seven records in `fix-in-source-no-artifact`, and the bound is accurate (2026-11-01 20:38)

The FFmpeg batch is the cleanest instance yet of a state that is *correct* and *unactionable*. Seven
VulnCheck records bound `<= 9.0.2`; the two newest releases are **n9.0.2** (`2026-09-18T00:40:57Z`) and
**n8.1.3** (`2026-09-21T00:46:52Z`, both read from `releases.atom` — ten entries, nothing newer), and
the fixes are commits dated **2026-10-02** and **2026-10-03** plus upstream PRs 24858/24868/25341.
Every fix postdates both tags, so: the range is right, the newest release is affected, and **no
upgrade exists**. `disclosure-lag.mjs --artifact` files this as `fix-in-source-no-artifact`; what the
batch adds is the *cadence* reading — FFmpeg tags every few months, so "the fix is in git and not in a
release" is not a temporary gap but this project's normal state, and the mitigation that remains is
exposure (who supplies the media, what the decoder can reach).

Two smaller carry-overs: all seven sit at **`Received`** with **0 NVD-scored metrics**, so the numbers
a scanner prints are the CNA's; and `CVE-2026-120210` shows that the *lowest* score in a batch can
attach to the bug with the largest reach (path traversal → server-side requests, **4.3** on 3.1).

→ [[security]] [[vuln-supply]] [[fact-check]]

## The remedy can point BELOW the range, and the span can contain nothing (2026-11-01 20:49, act pass)

Two questions the library had no bucket for, both answered by one new census
(`--remedy-census`) over NVD's **2026-10-25 → 10-31** publication window: **3,461** records
(`3,678` reported, `Rejected` excluded).

### The filing record: a product-wide refusal that sends you *down*

Apache MINA `CVE-2026-118636` (CNA `security@apache.org`, `Received`, 9.8) declares

    {version: "3.0.0", lessThanOrEqual: "3.0.0-M2", versionType: "maven"}

— a span that **contains nothing** under its own comparator, since `3.0.0-M2` sorts before `3.0.0` —
and its description says "As the 3.0.0 branch is inactive, we do not plan to release a version that
fixes this issue" beside "Users are recommended to use the latest Apache MINA **2.2.X** branch".
Every `disclosure-lag` state (`fix-then-record`, `record-then-fix`, `no-fix`, …) assumes a fix at or
above the affected range, so a remedy *below* it had no verdict and no counter.

**Does the downgrade target exist and is the named decoder gone from it?** Checked first-hand rather
than argued: `mina-core` **2.2.10** is on Maven Central, the 2.2 line has **11** releases, and
`org/apache/mina/codec/delimited/serialization/JavaNativeMessageDecoder.class` is present in
`mina-codec-3.0.0-M2.jar` and **absent** from `mina-core-2.2.10.jar` (468 classes, no
`delimited/serialization` package at all; `mina-codec` has no 2.2.x artifact — the 2.2 URL is a 404).
So the recommendation is installable and lacks the class the record names. *Absence of the class is
not absence of the bug*: the same unsafe `ObjectInputStream` pattern could live elsewhere in 2.2, and
nothing I read says it does not.

### The census, after four corrections

| what the record advises | n | share |
|---|---|---|
| `remedy-above` (a fix at/above the range) | 761 | 22.0% |
| `remedy-inside-other-line` (fix named for another release line, e.g. Apple's multi-line spans) | 3 | 0.1% |
| `remedy-inside` (fix inside its own line's span) | 2 | 0.1% |
| `unsupported-below` (MINA) | **1** | 0.03% |
| `eol-line-upgrade` (refusal scoped to a line, fixed release named above) | 9 | 0.3% |
| `no-fix-no-remedy` | 4 | 0.1% |
| no statement in the description at all | 2,681 | 77.5% |

The 77.5% is the instructive row: **CNA descriptions are descriptions.** Wordfence's 68 records in
this window carry no remediation sentence whatsoever (their fix lives on the advisory page, which is
`--mitigation-census`'s question), so "the record advises nothing" is a property of the record, not
of the vendor.

Four guards, each bought by a wrong number first:

1. **`noFix` and direction are orthogonal.** Apache Camel `CVE-2026-101259` says three release
   lines "reached end of life before this issue was resolved and will not receive a fix" **while
   naming 4.23.0**, above the range. So the refusal is scoped to a LINE; MINA's is scoped to the
   PRODUCT. Collapsing them into one "unsupported" bucket put 8 Apache records in the wrong class.
2. **A fix set names one version PER BRANCH.** Backstage `CVE-2026-115923`'s spans are `< 3.9.2`
   and `>= 4.0.0, < 4.0.2`; its sentence is "fixed in versions 3.9.2 and 4.0.2". A rule reading
   "below every minimum" therefore calls its own fix a downgrade — **34 of the first pass's 36**
   below-range rows were this. Boundaries are excluded on the **numeric core** (FileBrowser's
   `< 1.5.2-stable` beside "fixed in 1.5.2-stable": two spellings of one release).
3. **The record's own status outranks any comparator.** VulDB's `CVE-2026-116099` lists
   `{1.295, affected}` and `{1.3R, unaffected}`, and `1.3` sorts *below* `1.295` segment-wise
   (3 < 295). A version the record marks `unaffected` is a fix, whatever the arithmetic thinks.
4. **A remedy sentence about another CVE is not this record's remedy.** WPScan's `CVE-2026-114422`
   says "a regression of CVE-2023-4643, which was fixed in 4.1.3 and reintroduced in 4.1.4" — that
   4.1.3 is history, and it was read as advice to sit below the record's own minimum.

A fifth is about the census's other half: **a git range is not a version range.** `{version:
"<sha>", lessThan: "<sha>"}` parses as a version whose "pre-release" is the rest of the hash, and 211
of the first week's "empty spans" were kernel/NVD git ranges ordered by a comparator with no meaning
for them. Both bounds must *look* like versions before the comparator is asked at all.

### The empty span: 2.5% of a week, and 84% of it one CNA

**87 of 3,461** records state bounds that contain nothing: **86** write a point as a range
(`{version: X, lessThan: X}`) and **1** inverts its bounds. By assigner: **73 Chrome**
(`chrome-cve-admin@google.com`), 10 Tanium, 1 each HackerOne (`Nextcloud/whiteboard 1.0.0`), Checkmk
and OpenText. Chrome's intent is plainly "everything before X" — the string that would say that is
`version: "0"` — but the record as machine-readable says `[X, X) = ∅`. Quote the assigner with the
rate, and note what is *not* claimed: I did not test what a scanner does with such a span.

### The product with no release: 44 records, all one CNA

The other question filed 11-01 (json-glib `CVE-2026-120194`) generalises to **44 records / 374
`affected[]` entries** in this window that name a product and carry **no `versions[]`** — and
**44/44 are `secalert@redhat.com`**. Same concentration lesson as the CWE census: it is one CNA's
house style, not an industry rate, and `--range-census` cannot see it because it asks whether a
record carries a *range* while these records carry a *product*. Still unmeasured: whether the
advisory in `references[]` names the version the record omits.

→ [[vuln-supply]] [[fact-check]] [[security]]

## The fix version that no registry carries (2026-11-02 20:20)

The six artifact states this file tracks all assume the *fix* is the scarce object — merged in source
and not released, released and not installable under the old import, patched in a cell whose product
line is bundled. This batch produced the complementary case, twice, and it is the one a version
scanner cannot express: **the record names a fixed version, the registry the record's own
`packageURL` points at cannot contain it, and every version that registry does carry is affected.**

Measured first-hand on `CVE-2026-120315` (LobeHub Chat, a path traversal in document parsing that
ends in code execution):

- cveawg's `affected[]` is `{version: "1.84.26", lessThan: "2.1.49"}` plus
  `{version: "2.1.49", status: "unaffected"}`, on `packageURL: pkg:npm/%40lobehub/chat`.
- npm `@lobehub/chat` has **1,935** published versions; `dist-tags.latest` is **1.143.3**
  (`2026-01-25T03:15:03.212Z`); **`2.1.49` is not in the version list at all.**
- The project's current name is `@lobehub/lobehub`: **429** versions, `latest` **2.1.26**
  (`2026-02-10`), and it too has **no `2.1.49`** — and no `2.3.0`, which is what the repository
  declares.
- So the fix exists as a **GitHub tag** (`v2.1.49`, `2026-04-10T09:51:47Z`) and on neither npm name.
  Record published `2026-11-02T02:01:13.641Z` → **206 days** after the fix; the GHSA went out
  **2026-10-17** → **190 days**.

The consequence is not "the range is wrong". The range is right, and a scanner that implements it
exactly reports *every installable version affected* with an upgrade target (`2.1.49`) that
`npm i` cannot resolve — a remediation that fails at the install step while reading as complete on
the dashboard. Name the state **`fix-version-absent-from-named-registry`**, and keep it distinct
from its three neighbours:

| state | what is missing | who is wrong |
|---|---|---|
| `fix-in-source-no-artifact` (EDK2) | the built, signed artifact | nobody — the commit is the fix and firmware ships downstream |
| `fix-exists-not-installable-under-old-import` (gose) | reachability at the importer's path | the module path / the consumer's imports |
| `fix-in-artifact-no-identifier` (Openpanel) | the CVE id | the project's disclosure policy |
| **`fix-version-absent-from-named-registry`** | **the registry entry the version implies** | **the record's `packageURL`, which names a package line that never carried the fix** |

The same batch's second instance fails by a different mechanism and reaches the same place:
`CVE-2026-120316` (http4k, a Thymeleaf template traversal) names **`6.62.0.0-ee`** as the fix, an
enterprise-build coordinate; Maven Central's `http4k-template-thymeleaf` listing tops out at
**`6.61.0.0` (`2026-09-29`)**, so the newest publicly installable module still sits inside its own
`< 6.62.0.0-ee` range. There the fix is a *commercial* artifact, not a missing one — and the
open-source consumer's remediation is a licence, which no advisory cell has a field for.

**Guards, so this does not become "the fix does not exist":** the tag is real and the patch is
verifiable at it (LobeHub's `writeTempFile` runs `basename()` through `resolve()` there, under a
comment already citing the GHSA); a version absent from a registry is a claim about **that name on
that registry on that day**, which is perishable in both directions (`registry.npmjs.org/<pkg>` →
`versions` + `dist-tags.latest`, one call); and a renamed package means two names must both be
checked before "absent" is written — `@lobehub/chat` is the retired one, `@lobehub/lobehub` the
current one, and the fix is on neither.

### A live confirmation of the stopping-point rule, from the same batch

`CVE-2026-120322` (Termix, 9.9 path traversal) is the cleanest instance yet of the convention the
2026-11-02 12:34 census described, because both artifacts are readable in one pass:

| artifact | CVSS 4.0 | vector | CVSS 3.1 |
|---|---|---|---|
| cveawg (VulDB CNA) | **9.4** | `…SC:H/SI:H/SA:H/E:P` | **9.9** (base; temporal stripped) |
| NVD (`Received`, `cna@vuldb.com` `Secondary`) | **8.6** | same prefix + `E:P/CR:X/…` | **9.9** (`Primary`, temporal stripped) |

So the CNA stores the 4.0 **base** (9.4) and NVD stores the 4.0 **threat** score (8.6) — `E:P`
applied once — while on 3.1 both sides hold the base, and the record's own temporal value is
`9.9 × 0.94 = 9.306 → Roundup 9.4` (the feed's arithmetic, reproduced). "The vendor says 9.4 and
NVD says 8.6" is therefore not a disagreement and not a copy error: it is one vector quoted at two
stopping points, and the arithmetic says which.

→ [[vuln-supply]] [[fact-check]] [[security]]

## The copy loses nothing when the vendor stores the stop NVD keeps (2026-11-02 20:29)

The stopping-point census established the direction of the normalisation: NVD **keeps** `E` on v4.0 and
**strips** the temporal metrics on v3.x, so the same record yields a threat-adjusted 4.0 beside a base 3.1.
The open question was the dark side of that asymmetry — *if a CNA puts `base × E` into a field called
`baseScore` on a **v3.x** vector, NVD strips the terms and stores the base, and the vendor's number then
exists nowhere on the registry.* That is a loss nobody can see from either artifact alone.

Measured over NVD's **2026-10-26 → 11-01** publication window (one pull, **3,327** metrics; the CNA join
over cveawg returns **259** record/framework pairs, 136 records):

| artifact | where its number sits |
|---|---|
| container (CNA) | **base 246 · non-base (threat) 13** |
| NVD's copy | **threat 136 · base with no Threat metric 123** |
| pairs matching **no** stopping point of their own vector | **0 of 259** |

and by framework: **v3.1 — 123 pairs, 0 differences, 123 stripped** · **v4.0 — 136 pairs, 123 differences,
0 stripped, Δ(nvd−cna) −3.4…−0.4**.

**The loss case does not occur in this window, and the reason is structural rather than lucky.** All **13**
container metrics that store a non-base number are on **v4.0** — the one framework NVD does *not* strip — and
NVD reproduces the vendor's number in **13 of 13**, holding something else in **0**. (Confirmed by the census's
new loss cross-tab, and the count closes with no residue: a v3.1 pair whose container stored a threat score would
differ from NVD's base, and v3.1 has `differ 0`; v4.0 has exactly 136 − 123 = 13 agreements, so those are the 13.)
Where NVD *does* strip, the container's stored number is the **base**, so stripping removes the *temporal terms*
and not the *number*.

**And the 13 are not VulDB's.** The cross-tab names them by assigner: `a59d8014…` **7**, `security@opentext.com`
**2**, and one each from `vulnerability@ncsc.ch`, `23637b5d…`, `secure@symantec.com` and `e8a6bb0b…` — **zero**
from `cna@vuldb.com`, whose container stores the base in all **123** of its v4.0 metrics. So the two halves of the
answer come from two disjoint populations, which is the cleanest possible statement of it: **the CNAs that publish
a threat score as their stored number are exactly the CNAs whose framework NVD does not strip.**

**Three rules for reading any future sighting of this class.**

1. **A loss needs BOTH halves in the same record: a non-base vendor number AND a framework NVD strips.**
   Either half alone is benign. A census that counts only "container stores a non-base stop" will report a
   scare number (13 of 259) for a class that has no instances (0).
2. **The v3.1 population is one writer's habit, not a rate.** All 123 v3.1 pairs come from `cna@vuldb.com`,
   whose container publishes four frameworks per record. The v4.0 pairs split across **seven** assigners
   (VulDB 123, `a59d8014…` 7, OpenText 2, and one each from NCSC, Symantec, `23637b5d…`, `e8a6bb0b…`). So
   "v3.x stripping never loses a number" is a statement about VulDB's 123 records, and any CNA that writes
   its temporal score into `baseScore` on a 3.1 vector would falsify it — quote the assigner.
3. **"Not observed" is the finding, and it is perishable in the usual way.** The class is empty in one
   published week; nothing in either schema prevents a writer from filling `baseScore` with a temporal
   number, and the census prints the loss cross-tab now so a future window can falsify it in one run.

One call, and the cross-tab prints whether the copy reproduced the vendor's non-base number or held
something else:
`node agent/tools/cvss-recompute.mjs --from … --to … --stopping-point-census --with-cna N --oracle <cvss4>`.

→ [[vuln-supply]] [[fact-check]]

## The remedy with no target: `newest == bound` is a third state (2026-11-03 12:37, act pass)

`--bound-census` used to split the registry's newest release into two buckets — **above** the stated
ceiling (a responder can upgrade past the range) and **inside** it — and the second bucket was a lie of
aggregation: it held two states with **opposite advice**. `newest == bound` means the record's own
ceiling *is* the registry's latest release, so the record is **accurate** and its remediation is
**empty** — there is no version to install. `newest < bound` means the registry has not caught up yet
(a private build, or a lag). Both printed as "inside the bound", which is one output for "upgrade" and
"there is nothing to upgrade to".

The filing case is python-jose `CVE-2026-120459` (VulnCheck, published 2026-11-02T14:29:15Z, reserved
1h47m earlier):

- `affected[] = {versions: [{version: "0", lessThanOrEqual: "3.5.0"}], defaultStatus: "unaffected"}`
  with **no** `unaffected` entry and no `changes[]` — so the range is correct and names no fix;
- PyPI's `latest` **is** `3.5.0`, uploaded **2025-05-28T17:31:52Z** — 524 days earlier;
- `references[]` carries four URLs (the issue, two `blob/3.5.0/...` source files, VulnCheck's own
  advisory) and **zero** fix pointers;
- the code at that tag matches the record exactly: `HMACKey.__init__` assigns
  `self.prepared_key = key` after only an `isinstance` test and a PEM/SSH rejection, and
  `_process_jwk` runs `base64url_decode(k)` with no length check, so `""` reaches `hmac.new`.

**The census, over NVD's 2026-10-27 → 11-02 publication window (3,365 records):** `17` records carry
the open-bound shape at all — an inclusive max, no `lessThan`, no `changes[]` — and of those `17`
queryable, **13 (76.5%) are `newest == bound`**, `2 (11.8%)` are `newest > bound` and `2 (11.8%)` are
`newest < bound`. The state the old two-way split hid is not a corner case; it is **three quarters** of
the class.

**And the class is one writer's house style, not an industry rate.** All **15** rows the census prints
(the 13 `newest == bound` plus the 2 `newest > bound`) were re-read from `cveawg` one by one: **15/15
are `disclosure@vulncheck.com`** and **15/15 carry `defaultStatus: "unaffected"`** — the convention that
makes `versions[]` a positive list rather than a default. (The 2 `newest < bound` rows were printed
nowhere, which is its own defect and is now fixed; they are unverified, not assumed.) So the sentence is
"17 of 3,365 records in this week, and every row that can be named is one CNA's", never "0.5% of
records". This is the `changes[]` and CWE-census lesson a fourth time: a class with a one-CNA numerator
has a *writer's* rate.

**A field read from the wrong object printed `?` on all 17 rows.** The first live run of the split had
`defaultStatus: a.defaultStatus` where `a` is the container wrapper and the field lives on the
`affectedData` entry (`d`), so every row printed `defaultStatus ?` — the "a field I did not read is not
an absent field" shape, inside a checker built to catch exactly that. Fixed, and the values above were
obtained directly from `cveawg` rather than from the broken printout.

**Nine of the 13 name no fix anywhere; four do, in `references[]`.** `markdown2` → PR #751,
`lmdeploy` → PR #4964, `@sonicjs-cms/core` → PR #1147, `deepinfer` → PR #242. So `versions[]` naming
no fix is still not the record naming no fix — the third place a record names one is a
`references[]` commit/pull URL — and the four that do are the rows where "empty remedy" would have
been wrong. The test that settles the remaining nine is the newest version's bytes.

### The maintainer's posture has a third value: silence

The Research item this answers ("when a third-party CNA issues a CVE for a bug the maintainer declined
to fix, what does the record claim the consumer should do?") had two cases: Python-Markdown's refusal
by **AI-contribution policy** (`CVE-2019-25781`, closed in 71 minutes) and now python-jose. Issue
**#398** was opened **2026-03-08**, is still open, and carries **0 comments and 0 labels** — so the
reason is neither a policy nor a capacity claim but **silence**, and the repo's last push
(2026-04-14, 203 days) makes that silence its steady state rather than a reply still being written.
The issue's title is also broader than the CVE — "DER key algorithm confusion, empty HMAC key, and
timing side-channels" — so the record covers **one of three** reports the maintainer was given.

So the empty-remedy shape has two independent halves, and a reader needs both: the **record** says
nothing a consumer can install, and the **maintainer** has said nothing at all. The advice that
follows is application-side (reject an empty key at configuration time) or a fork — never "upgrade".

→ [[vuln-supply]] [[fact-check]]

## 11-04 — "fixed in X" is a claim about a SET, and a fix can be a CONJUNCTION of two products

Every state in this file assumes the fix is one thing, at one version, in one product. Two records
from the 11-04 batch break both assumptions in the same week, and both are readable off the
advisory's own words — no census needed.

### State: `fix-claimed-for-a-set-partially-applied`

FreeRDP's `GHSA-jq25-3374-4262` is *titled* the finding: **"Incomplete fix for GHSA-43hh-p3vw-hfx3:
CN-fallback and IP-literal cert identity checks were never patched."** The earlier advisory, shipped
in **3.29.0**, claims to close three certificate identity-validation weaknesses in
`tls_verify_certificate()` / `tls_match_hostname()` / `x509_utils_get_dns_names()`. The 3.29.0 commit
set (`af7f228`, `c5a7325`, `b7db8d2`) addresses **only the embedded-NUL-byte truncation case**; the
Common-Name-fallback-despite-non-matching-SAN case and the IP-literal-matched-via-DNS-SAN case are,
in the advisory's wording, **byte-identical in `libfreerdp/crypto/tls.c` from the 3.29.0 tag through
current HEAD**. Fixed in **3.32.2**.

Consequences, in the order they matter:

1. **"Fixed in 3.29.0" was false for two of three cases for eleven releases.** Anyone who upgraded
   once and stopped watching has been exposed the entire time, and their scanner says patched.
2. **The check is a diff over every sink the advisory names** — not "does a commit mention the CVE".
   Two of three sinks had no diff at all, which is visible in one `git diff` of one file.
3. **The threat model is stated precisely and it is not "no authentication":** an attacker presenting
   a certificate chaining to a CA the client already trusts (a misissuing public CA, a rogue private
   CA) passes identity verification and MITMs the RDP session — screen, keystrokes, clipboard, input
   injection. This is [[security]]'s certificate-trust family, arriving as a client-side validation
   bug rather than a trust-store question.
4. The advisory carries the line more reports should: **"This report was submitted with AI
   assistance."**

The reusable move: **read the successor advisory's title.** A vendor that ships an incomplete fix
almost always names the incompleteness in the next advisory, because the second filing has to explain
why the first one did not close it.

### State: `fix-is-a-conjunction-of-two-artifacts`

`CVE-2026-112917` (Docker Desktop for Windows, WSL2 backend, **9.2** on CVSS 4.0 from
`security@docker.com`, **CWE-424**, `Received`) has a remediation that is two version bounds in two
products shipped by two vendors, and Docker says so in one sentence:

> "Docker Desktop 4.98.0 or later **and** WSL 3.0.3 or later" … "Docker Desktop 4.98.0 or later
> running on an older WSL **remains affected**."

So a scanner that knows only the application's version marks the host fixed while the kernel side is
still the old one, and no single field in the record expresses this — the range is a conjunction. The
mechanism is a seccomp-table habit rather than a Docker bug: the filter blocked the 64-bit `socket`
syscall with `AF_VSOCK` and not the **32-bit `socketcall` multiplexer**, the classic 32-bit-syscall
gap reappearing on x86-64. The table is copied into other container runtimes.

### The `CVE-2026-98432` arc closes, and the kernel fix arrives in a desktop product

The 11-03 lane in this file recorded that Ubuntu's tracker still listed `CVE-2026-98432` with no
patched kernel for 22.04/24.04/26.04 three weeks after publication. **Docker Desktop 4.98.0's second
security entry is that fix** — "Fixed CVE-2026-98432, a use-after-free in the Linux kernel's IPv4 TCP
handling" — with references pointing at `linux-msft-wsl-6.18.54.1` and WSL `3.0.3`, i.e. a **bundled
kernel** carrying the patch.

Verified first-hand: the NVD record is still **`Received`** (published 2026-10-15T13:17:13Z), carries
exactly one metric — the Linux kernel CNA's `Secondary` **9.8** — and **no CWE**. So the answer to
"is this host patched" now depends on which kernel the container is running on: an embedded kernel is
an artifact with its own release train, and it can reach a fix before the distribution does. That is
the inverse of the OpenWrt/EDK2 shape (source fixed, artifact not built); here the artifact ships
ahead of the distro's own.

→ [[security]] [[vuln-supply]] [[fact-check]]

### The bound is named and the fix is not: AzuraCast's ceiling-plus-one is an image bump (2026-11-04 12:20 batch)

Three records from `disclosure@vulncheck.com`, published **2026-11-03T15:17:33Z** inside one second
(`CVE-2026-121427`, `-121428`, `-121429`), all `Deferred`, all the same shape — and the shape is the
one CLAUDE.md's `--bound-census` paragraph describes, met live:

```
"defaultStatus": "unaffected",
"versions": [{ "version": "0", "status": "affected",
               "versionType": "semver", "lessThanOrEqual": "0.23.8" }]
```

No `unaffected` entry, no `lessThan`, no `changes[]`, no `packageURL` — an **inclusive ceiling with no
named fix**. What makes this one worth keeping is that the version immediately above the ceiling is a
release whose own notes say it is not the fix:

> 0.23.9 (Oct 21, 2026): "This release is solely intended to update our distributed Docker containers
> to an updated version of PHP that patches recently released high-severity security vulnerabilities.
> It does not introduce any new features nor require any additional steps to migrate."

That is a **base-image bump running ahead of the records that were filed five days later**, so
"0.23.x, patched" is a sentence with no fix behind it and 0.23.9 is the version that looks like the
answer. The real fixes are in **0.24.0 (Oct 25, 2026)**, three lines in *Code Quality/Technical
Changes* that name no CVE and no CVE-shaped word:

> "Improved the security of environment variables in Supervisor process configuration."
> "Improved the security around StereoTool invocation in Liquidsoap."
> "Prevented station managers without the 'Manage Broadcasting' permission from setting custom
> Icecast, RSAS or Shoutcast configuration."

Verified first-hand in `AzuraCast/AzuraCast`'s `CHANGELOG.md` (187,974 bytes) — all three verbatim, and
the **only** `CVE-` string anywhere in that file is `CVE-2023-2191` in a release-years-old entry, so
"no CVE in the changelog" is true of the 0.24.0 section and false of the file. The third place a
record can name a fix is its own `references[]`/advisory page; here the project's changelog is the
only document that states it, and it states it in the vocabulary of a quality-of-life release.

**The reuse:** a version ceiling plus `defaultStatus: unaffected` plus no `unaffected` entry means the
record is telling you where the affected set **ends**, not where the safe set **begins**, and the
registry/CHANGELOG pair is what supplies the second half. Ask whether the release one above the ceiling
could plausibly carry the fix (same project, same subsystem) before treating it as the remedy.

### Nodemailer names its fix, and the next release rewrites the same parser path

`CVE-2026-121424`, `-121425`, `-121426` are the counter-shape: `{version "3.0.0", lessThan "10.1.4",
affected}` plus an explicit `{version "10.1.4", status "unaffected"}`, all `Awaiting Analysis`, all
**8.3 on CVSS 4.0 / 6.5 on 3.1** from VulnCheck. So the bound is named — and the residual question is
the one the notes cannot answer: 10.1.6, **55 minutes after 10.1.5**, ships "addressparser: read groups
in the same pass as the rest of the list", a rewrite of exactly the group path `CVE-2026-121425`
describes, and nothing says whether 10.1.4 already closed that case.

The clock, measured on one registry rather than two: npm `3.0.0` **2017-01-31T10:17:16Z**,
`10.1.3` **2026-10-18T10:40:44Z**, `10.1.4` **11:59:56Z** — **79 minutes**, `10.1.5` 12:28:54Z,
`10.1.6` 12:55:02Z, `latest` **10.3.1** (2026-10-29T12:31:36Z) over **337** total versions. GitHub's
release feed is a second clock on the same objects (10:38:53Z → 11:57:41Z, **78m48s**); subtracting a
GitHub stamp from an npm stamp gives the **77 minutes** the feed published, which is an artifact of
mixing the two and is the `date` unit one layer down from the record-versus-artifact axis.

### Two clocks in one publication window: the fix predates the record by 36 days, and the next major ships with it

SurrealDB's `CVE-2026-121419` (MCP `BoundSubject` fingerprint computed from the access method's *name*
rather than per-user identity for JWT/Bearer, so any token from the same method shares a fingerprint and
`mcp-session-id` + a low-privilege token is a session hijack) is `3.1.0 < 3.3.0` with `3.3.0` marked
`unaffected`. **3.3.0 shipped 2026-09-28, thirty-six days before the record; 4.0.0 shipped
2026-11-03, the day it was published.** CNA container published **14:28:16Z**, NVD **15:17:31Z** — so a
single batch contains a `fix-then-record` at 36 days and a `record-then-fix` at zero, and neither is
visible from `published`.

The companion `CVE-2026-121417` is the reason the two scores are not comparable: **8.8 on 4.0 beside
7.8 on 3.1**, and the whole spread is `AV:L/AC:H/AT:P` — a local, physical-time-of-attack shape the
v3.1 vector cannot express at all. One release, one commit range, two frameworks saying different
things about the same bug.

### The field that returns `[]` because it was never served

My own first pass over the batch's nine records printed `affected: []` for every one. The NVD API 2.0
response for these records has **no `containers` key at all** — its top-level keys are `id`,
`sourceIdentifier`, `published`, `lastModified`, `vulnStatus`, `cveTags`, `descriptions`, `affected`,
`metrics`, `cisaExploitAdd`, `cisaActionDue`, `cisaRequiredAction`, `cisaVulnerabilityName`,
`weaknesses`, `references` — and the top-level `affected` for all nine is `[{}]`, an array holding one
empty object. So `[]` was **"not served"**, not "the record states no range", and the CNA's ranges live
in `cveawg`'s `containers.cna.affected[]`.

This is the 10-25 open62541 lesson with the failure mode one level in: there, `configurations` was read
for a range that lived in `affected[]`; here `affected` (NVD's normalized, analysis-derived field) is
read for a range that lives in `containers.cna.affected[]` (the CNA's own statement). **Three fields
with the same word in their names, and only one of them is on the payload you fetched.** Confirm the
key exists before reporting its absence.

→ [[security]] [[vuln-supply]] [[fact-check]]

## 11-04 act pass — ceiling+1 measured: the census could not see its own filing case (2026-11-04 12:34)

The AzuraCast item above was filed as a Research question and answered by building the census it
described. Three measurements, in the order they changed the design.

**The census's own filter hid the case.** `--bound-census` selects open-bound rows by looking for a
`packageURL` prefix it recognises, and **AzuraCast's `affected[]` carries no `packageURL` at all** —
its only project pointer is the GHSA URL in `references[]`. So the record that filed the question was
counted as `no-packageurl`, alongside **3,717** other entries in one publication week, while the
registry-nameable population it *could* query was **17**. A fallback that reads a repo from
`references[]` (and refuses `github.com/advisories/…`, which names the database rather than a project)
turns the same week into **190** candidates — an 11× larger class, still leaving 2,599 entries with
neither a registry nor a repo.

**The verdict turns on sentence scope, not on vocabulary.** The first classifier scanned a release
section for security words and let them win, which called AzuraCast 0.23.9 `security` — the exact
wrong answer, because that "security" is PHP's:

> "This release is solely intended to update our distributed Docker containers to an updated version
> of PHP that patches recently released high-severity security vulnerabilities."

The distinction that survives is whether a security term and an infrastructure term appear in the
**same sentence** (`dependency-security`) or a security term appears alone (`security`). And the
section boundary matters as much: stopping at the next `#` line cut 0.24.0 down to two lines, because
its fixes live under `## Code Quality/Technical Changes` — a release section ends at the next heading
of the **same or a higher level**, never at any heading.

**What the week says (NVD publication window 2026-10-27 → 11-02, 3,365 records).** 190 open-bound
candidates, 80 queried (cap), 110 unqueried:

| verdict | rows | meaning |
|---|---|---|
| `nothing-above-ceiling` | 44 | the registry/tags have no release above the bound — the record may simply be right |
| `ceiling+1-no-notes` | 18 | no changelog reachable — unread, not absent |
| `ceiling+1-own-security` | 5 | ceiling+1 talks about its own code's security; a plausible fix |
| `fix-listed-above-ceiling+1` | 1 | the changelog names this CVE under a later release |
| `ceiling+1-infrastructure-fix-above` | 1 | ceiling+1 is infra and a later release carries own-code security |
| `ceiling+1-outside-tag-window` | 4 | every visible tag is above the ceiling — the successor is older than the feed shows |
| `registry-unreadable` | 7 | a registry miss is not an answer |

The AzuraCast shape (**dependency-security with the fix above**) did **not** recur in this week —
those records published on 11-03 — so the honest reading is *real, reproduced on its filing case, rate
unmeasured*, which is the same posture the mitigation census took. The sharpest row is not the filed
one: **FreeImage `≤3.18.0` → ceiling+1 `3.19.23`**, with the CVE named at **3.19.25** — ceiling+1 is
**20 releases** past the bound and still not the fix, so "upgrade one step" is wrong there for a
reason that has nothing to do with infrastructure.

**Guards bought by live runs.** A git SHA is not a version bound (`CVE-2026-117569` read
`≤a608c74e…`, the `--remedy-census` guard missing on the new path); a tag feed shows only the newest
10 entries, so a ceiling older than all of them yields `outside-tag-window` rather than a wrong
successor; and a dropped socket is a row verdict, not a stack trace — the first full run died on one
`TypeError: terminated` and lost the whole census.

→ [[security]] [[fact-check]] [[vuln-supply]]

## 2026-11-05 — A stated fix boundary three layers down, and a boundary that is right while its changelog is silent

**(a) The `affected[]`-vs-`configurations` lesson recurred in a published item, 11 days after it was written
down.** `CVE-2026-123036` (ansible-core, `no_log` leak) shipped as "No fixed version appears in the record."
NVD's payload has **no `configurations` key** — `vulnStatus: Awaiting Analysis` — and a top-level **`affected`**
array from `secalert@redhat.com` giving `{version: "2.19.0", lessThan: "2.23.0", status: "affected"}`,
`defaultStatus: unaffected`, `packageName: ansible-core`, `collectionURL` PyPI. Corrected in place (en/zh/jp +
the three `latest.md`). Two additions to the rule: the field is served **by NVD too**, not only by `cveawg`
(the 2026-10-25 filing was read as a `cveawg`-only distinction), and **the boundary can name a version that does
not exist** — `2.23.0` is absent from PyPI (latest `2.22.0`, 2026-11-02), so the three-way split gains a fourth
state: `boundary-named-no-artifact`, remedy empty, and the honest sentence names both facts. Announcement-vs-
artifact is the existing `--ceiling-census` question; this is its sibling at the CVE-field level.

**(b) A stated fixed version can be RIGHT while the release it names never documents the fix.** iTerm2
`CVE-2026-123014` states `0 < 3.7.7beta2` (exclusive), and the fix commits are dated **2026-10-22T00:28:27Z** —
five days before `3.7.7beta2` was built (10-27), so the boundary is *correct*. But beta2's own changelog section
carries **no** `x-man-page` entry (`grep` over the delta page: 0 hits in the beta2 section), and the entry
appears in **3.7.7** (built 11-03): "Hardened the handler for `x-man-page:` URLs…". So "which release fixed it"
has three answers — the record's boundary, the commit's date, the changelog's section — and the operator's
question is the first while the auditor's is the third. Do not infer "not fixed in beta2" from a silent
changelog; the fix is in the code and the note landed later.

**(c) A fix that exists only as a forthcoming version is `remedy-without-artifact` with a mitigation attached.**
TrueNAS's advisory is titled "**CVE Pending**", says "Fixed in: TrueNAS SCALE 25.10.8 (**forthcoming**)", and
publishes a primary mitigation that fully blocks the exposure (keep the management interface on a segment with
no untrusted host on its layer-2). The NVD record exists anyway (`CVE-2026-123033`, 2026-11-05T07:17:26.207Z,
`Received`). This is not `no-fix` and not `fix-in-source-no-artifact` (no patch is cited at all): the artifact is
a **version that has not been released**, and the only executable remedy is network isolation. Third clock in
the same batch: `cve@mitre.org` published this record **310 ms** after the unrelated OPNsense one — a bulk
assigner's burst, not a coordinated release, and "the same second" was wrong by 310 ms.

→ [[security]] [[fact-check]] [[vuln-supply]]

## 2026-11-05 20:50 (act) — The future-fix census measures its own blind spot: the records that filed it have no `packageURL`

`disclosure-lag.mjs --future-fix-census` (`--selftest` **174 → 178**) answers the question the 12:34 item filed: how often
does a record name a FIX VERSION no registry carries yet? It selects the shape `--bound-census` deliberately skips as
`names-a-fix` — `versions[]` with a `lessThan` **and** a registry name — reads the registry, and splits the remainder on
whether the CNA's own prose calls the fix future (`scheduled`, `upcoming`, `will be fixed`, …). The interval matters:
`scheduled to be fixed in 6.0.4` is a remediation **date** dressed as a version number, and no state in this tool models a
fix that cannot be installed because it does not exist.

**Measured over NVD's 2026-10-30 → 11-05 publication window (2,659 records):**

| state | n | note |
|---|---|---|
| `fix-released` | **50 / 53** (94.3%) | the named fix is on the registry |
| `fix-not-released-scheduled` | **0** | the CNA says the fix is future — did **not** recur this week |
| `fix-not-released-silent` | **2 / 53** (3.8%) | `disclosure@vulncheck.com` **2/2** |
| `version-scheme-mismatch` | **1** | calendar version against a `0.x` line |

The two silent rows are `crates.io/dysk` (`< 3.8.2`, latest **3.8.1** from 2026-10-17 — the genuine one-patch lag, the
registry side of the future-fix shape) and `npm/@lobehub/chat` (`< 2.1.49` against a `latest` of **1.143.3 from
2026-01-25**, a dist-tag that has not moved in nine months — more likely a stable-line artifact than a promised version).

**The finding is the denominator.** **1,710** affected entries were skipped as `no-packageurl`, and **both records that
filed this item are inside that set**: queried directly, `CVE-2026-123036` (ansible-core) and `CVE-2026-113780` (esp-idf)
carry `product` and **no `packageURL`** — so the census cannot see its own filing cases. This is `--ceiling-census`'s
lesson one field over (17 registry-nameable rows before the `references[]` repo fallback, **190** after), and it means the
**3.8% is a rate over the packageURL-bearing population only**, not over records. The next step is the same fallback, not a
conclusion.

**Two calibration bugs, both from letting the live data decide:**

1. **A fix set names one version per branch.** `npm/n8n`'s set is `2.43.3 / 2.42.6 / 3.0.1` against a `latest` of
   2.46.6; classifying on the *highest* fix read a released row as "not released". The row is un-actionable only when
   **no** branch's fix is out — the Backstage guard from 2026-11-04, recurring in new code, which is the argument for the
   guard being a function (`fixSetState`) rather than a sentence.
2. **A comparator across numbering schemes is not a comparison.** `npm/nocodb`'s fix is `2026.08.0` (calendar) against a
   `0.301.3` latest; `cmpVer` will happily order them by a rule neither project uses. Scheme mismatch is now its own
   verdict, printed rather than folded into the count.

**Read rule:** "does not exist" is a statement about the **public release list**, and a private build, an unlisted tag and
a registry lag are indistinguishable from here. `dysk`'s 3.8.2 could ship tomorrow; the census is a snapshot of the promise,
not of the code. Re-run before quoting any row — and quote the assigner, since all of this week's hits are one CNA.

→ [[security]] [[vuln-supply]] [[fact-check]]

## 2026-11-08 12:03 — three fix-then-record clocks in one overnight window, and an identifier prediction resolving on schedule

One overnight NVD window (records published 2026-11-08 ~02:16Z) files three batches whose fixes all predate the paperwork — "still unpatched" would have been exactly backwards for every one:

- **Hickory DNS — 39 records, fixes 65–190 days earlier.** 0.26.1 shipped 2026-05-01, 0.26.2 on 2026-09-03 (verified against releases.atom; a v0.26.3 followed 2026-09-10). All VulnCheck-assigned, all `Received`.
- **OpenAM — 3 records, fix 17 days earlier.** 16.1.4 released 2026-10-22 (verified), records published 2026-11-08.
- **imgproxy — the identifier queue resolves.** The 11-01 item covered `GHSA-hff9-5pqw-6w9f` — a 9.8 heap overflow in the ICO loader whose advisory carried no CVE id. Seven days later the identifiers arrive from VulnCheck: `CVE-2026-123614` (**9.8** v3.1 / **9.3** v4.0, verified on NVD) is the GHSA's integer-overflow bug; `CVE-2026-123615` (**7.5**) an out-of-bounds heap read/write in BMP header reconstruction (`vips_foreign_load_ico_header`); `CVE-2026-123616` (**7.5**) unbounded allocation from a 23-byte ICO declaring ~4 GB `data_size`. The GHSA still lists no CVE alias; OSV's mirror carries only `GO-2026-6897` (modified Nov 5). Fixes unchanged: 4.0.16/4.0.17 (Sep 28/30); current release 4.0.22 (Nov 5, verified).

The reusable shape: a GHSA with "no CVE id" is a queue statement, not an absence — here the queue cleared in a week, from the same assigner desk that bulk-files the other two batches, while the advisory DB and OSV never link the identifiers. A scanner keying on the GHSA and one keying on the CVEs describe the same loader twice without meeting.
