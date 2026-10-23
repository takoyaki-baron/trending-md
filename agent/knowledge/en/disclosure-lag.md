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
