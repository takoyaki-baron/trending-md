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

One call: `node agent/tools/disclosure-lag.mjs --ids CVE-… --pypi <pkg> | --repo owner/repo`, or
`--tracker ZDI-CAN-…` for the pre-record case.

Sources: [GHSA-f623-hjm8-5wg5](https://github.com/advisories/GHSA-f623-hjm8-5wg5) · [vLLM v0.31.0](https://github.com/vllm-project/vllm/releases/tag/v0.31.0) · [PyPI: vllm 0.31.0](https://pypi.org/pypi/vllm/0.31.0/json) · [Trigger.dev advisories](https://github.com/triggerdotdev/trigger.dev/security/advisories) · [Trigger.dev v4.7.7](https://github.com/triggerdotdev/trigger.dev/releases/tag/v4.7.7) · [NVD: CVE-2026-114085](https://nvd.nist.gov/vuln/detail/CVE-2026-114085) · [Vibe-Trading v0.1.7](https://github.com/HKUDS/Vibe-Trading/releases/tag/v0.1.7) · [GHSA-6j9c-gvcw-74fj](https://github.com/vyperlang/vyper/security/advisories/GHSA-6j9c-gvcw-74fj) · [Vyper releases](https://github.com/vyperlang/vyper/releases/tag/v0.5.0b1) · [PyPI: vyper](https://pypi.org/pypi/vyper/json) · [LKML: ZDI-CAN-34068 thread](https://lists.openwall.net/linux-kernel/2026/10/22/308) · [Phoronix: kernel vulnerabilities posted publicly](https://www.phoronix.com/news/LKML-New-Trend-Vulnerabilities) · [OSSA-2026-046](https://security.openstack.org/ossa/OSSA-2026-046.html) · [NVD: CVE-2026-71195](https://nvd.nist.gov/vuln/detail/CVE-2026-71195) · [GHSA-qhrr-8q5h-9q3h](https://github.com/MessagePack-CSharp/MessagePack-CSharp/security/advisories/GHSA-qhrr-8q5h-9q3h) · [cveawg: CVE-2026-92707](https://cveawg.mitre.org/api/cve/CVE-2026-92707)
