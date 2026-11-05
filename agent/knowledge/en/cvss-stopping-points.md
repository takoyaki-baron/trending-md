---
title: CVSS stopping points — one vector, several honest numbers, and the gap is not a constant
topic: cvss-stopping-points
created: 2026-11-03
---

# CVSS stopping points — one vector, several honest numbers

A CVSS vector that carries a **Threat** metric (`E`, and on v3.x also `RL`/`RC`) does not have one
score. It has a base, a threat score, and — on 3.1 — a full temporal score, and **all three are
defensible readings of the same string**. Because the field they are stored in is called
`baseScore` in both the CNA container and NVD's copy, two artifacts can print different numbers for
one vector and neither is wrong.

Adjacent files: [[vuln-supply]] (ranges, provenance, the severity-field problems), [[fact-check]]
(the unit discipline this belongs to), [[security]] (the CVE sets these came from),
[[disclosure-lag]] (records, fixes and clocks).

**The claim:** when two CVSS numbers ride one vector, recompute rather than quote both — but when
you do quote them, **name the stopping point and the band**, because the size *and the direction* of
the gap are a **joint** of the severity band, the vector's Threat metric, and which frameworks are
being compared. It is not a constant, not a framework property on its own (§2a's `E:X` control moves
from **−0.35** at Critical to **+1.2** at Low), and not one CNA's habit.

## 1. What the stops are

- **v3.1**: `TemporalScore = Roundup(BaseScore × E × RL × RC)` — **one** Roundup over the flat
  product (FIRST v3.1 §7.2). Per-component rounding yields a different number and is what a
  v3.0-shaped memory produces. Weights worth pinning in a test: `E:F = 0.97`, `RL:O = 0.95`,
  **`RL:W = 0.97`**.
- **v4.0**: `E` is not a multiplier; it is one dimension of the MacroVector, so feeding `E:P` into
  the lookup moves the score by an amount that depends on where the base sits. This is why the same
  `E:P` is worth −0.7 points on a 10.0 and −3.9 on a 4.8.
- **NVD's per-framework convention**: measured over its 2026-10-26 → 11-01 window, **136 of 136**
  v4.0 metrics carrying a Threat metric store the **threat** score, while on **v3.1 NVD strips the
  temporal components 123/123** and stores the base. The CNA container stores the **base** in
  both. So "the vendor says X and NVD says Y" is usually one vector quoted at two depths.

## 2. The measured band table (2026-11-03 20:22, first-hand)

Census: every record NVD published on **2026-11-02** whose metrics come from `cna@vuldb.com` —
**31** records (479 published that day in total). One NVD pull, no extra budget.

| fact | count |
|---|---|
| v4.0 vectors carrying a Threat metric | **31 / 31** (`E:P` 29, `E:X` 2) |
| v3.1 vectors carrying a Threat metric | **0 / 31** (NVD strips) |

Delta = (NVD's v3.1 base) − (NVD's v4.0 threat), split by the **3.1 band** and restricted to the 29
`E:P` rows. **The sign is the subtraction, so this table's convention is the tool's reversed** — see
§2a, where the census prints **Δ = 4.0 − 3.1** and the same records read −0.82 / −1.93 / −1.91:

| 3.1 band | n | deltas (3.1 − 4.0) |
|---|---|---|
| Critical (9.0–10.0) | 10 | **+0.7 × 8**, +1.3 × 2 |
| High (7.0–8.9) | 8 | **+1.8 × 7**, +2.8 |
| Medium (4.0–6.9) | 9 | −0.2, +2.2 × 4, +2.7, +3.9, +4.2 × 2 |
| Low (0.1–3.9) | 2 | +0.8, +1.4 |

Mean **+1.7**, range **−0.2 … +4.2**. Two consequences:

- **"The 4.0 score is 0.7 below the 3.1" is a Critical-band fact.** It is the figure that gets
  quoted because Critical records are the ones people write about; at Medium the gap is 2–4 points
  and at one row it **inverts** (−0.2: the threat reduction and the framework difference nearly
  cancel).
- **The two `E:X` rows invert the direction for a different reason.** With `E` undefined there is
  no threat effect at all, and the v4.0 score is **1.0–1.6 points higher** than the 3.1 base —
  a pure framework difference a reader would misattribute to the stopping point if they did not
  read the vector.

## 2a. The band table as a mode, and the control that separates the two effects (2026-11-03 20:34)

The hand table above was arithmetic done in a scratch file, and its **sign convention was the
reverse of the tool's** — the same 31 records read **−0.82 / −1.93 / −1.91 / −1.1** under
`Δ = v4.0 − v3.1`, which is the convention `--pairs` has always printed and the one the 10-27 week
census used (VulnCheck **+0.55**, VulnDB **−1.76**). Two artifacts in one library printing opposite
signs for one fact is the unit defect this file exists to catch, so the census now prints the table
itself and the convention is stated in the header.

Running the new mode on the same day (**2026-11-02**, one NVD page, 455 metrics, **113** same-source
pairs) reproduces the hand numbers exactly and adds the split the hand table could not make:

| assigner · band | pairs | 4.0 higher | 3.1 higher | mean Δ (4.0 − 3.1) | Δ range |
|---|---|---|---|---|---|
| `cna@vuldb.com` · Critical | 10 | 0 | **10** | **−0.82** | −1.3…−0.7 |
| `cna@vuldb.com` · High | 8 | 0 | **8** | **−1.93** | −2.8…−1.8 |
| `cna@vuldb.com` · Medium | 11 | 3 | 8 | **−1.91** | **−4.2…+1.6** |
| `cna@vuldb.com` · Low | 2 | 0 | 2 | −1.1 | −1.4…−0.8 |
| `disclosure@vulncheck.com` · Critical | 4 | 1 | 3 | −0.35 | −0.6…+0.2 |
| `disclosure@vulncheck.com` · High | 37 | 24 | 12 | **+0.43** | −0.9…+1.7 |
| `disclosure@vulncheck.com` · Medium | 33 | 24 | 9 | **+0.67** | −1…+2.3 |
| `disclosure@vulncheck.com` · Low | 4 | 3 | 1 | **+1.2** | −0.8…+2.6 |

Three things this table buys that the single mean did not:

1. **`E:X` is not a nuisance row, it is the control — and VulDB has almost none of them.** **29 of
   31** VulDB pairs carry `E:P` (two state `E:X`), so its band table measures *threat effect +
   framework difference* together and **cannot** attribute the gap to either. VulnCheck's **78**
   pairs all state `E:X`,
   so its rows measure the **framework alone** — and that gap is itself band-dependent:
   **−0.35 (Critical, n=4) → +0.43 (High) → +0.67 (Medium) → +1.2 (Low)**. The agenda item's
   hypothesis ("the v3.1−v4.0 gap widens as severity falls") survives on the clean control, with
   the Critical cell inverted and only **4** pairs behind it.
2. **A mean hides a sign mixture inside one band.** VulDB's Medium row is **11 pairs, mean −1.91,
   range −4.2…+1.6** — 8 rows below and 3 above. The mean describes none of them, which is the
   reason the counts are printed beside it.
3. **Two writers in one day's window give opposite signs** (VulDB −1.51, VulnCheck +0.53) on the
   same frameworks and the same day. A rate without its assigner is a rate over whoever filed.

## 2b. The container side, and the question it inverted (2026-11-03 20:34)

The agenda asked whether any CNA **other than VulDB** stores a **base** `cvssV4_0` beside a vector
that carries a Threat metric. Run with the container join on the same day (`--with-cna 40`, 32
records carrying a Threat metric, **61** record/framework pairs read, cveawg unmetered):

| where | count |
|---|---|
| containers publishing a v4.0 vector with `E` | **32** |
| … storing the **base** | **29** — all `cna@vuldb.com` |
| … storing the **threat** score | **3** — **Qt** (`CVE-2026-107457`, `-100140`, both `E:U`) and **HDFG** (`CVE-2026-120689`, `E:U`, an HDF5 recursion flaw) |
| v3.1 containers (NVD stripped `E` 29/29) | **29**, all base, **0** pairs differ |
| v4.0 pairs where NVD ≠ container | **29**, Δ(nvd − cna) **−3.4…−0.7** |
| pairs where either side matches no arithmetic | **0** |

So the question's premise was backwards: the base-storing habit is **VulDB's**, and the writers who
put a *threat* score in a field named `baseScore` are **Qt** and **HDFG** — named from `cveawg`'s own
`assignerShortName`, since the UUID in the field is an orgId and not a name — and NVD **reproduces**
their number **3 of 3**. That is the same class as the `loss` case the tool already prints ("the container
stores a number that is NOT the base"): the field name is not a type, and both directions exist in
one day's window.

Spot-verified in the CNA containers and with a v4.0 oracle (all recomputations exact, 8/8):

| CVE | container 4.0 (base) | NVD 4.0 (threat) | container 3.1 | NVD 3.1 |
|---|---|---|---|---|
| `CVE-2026-120276` (Critical) | **10.0** + `E:P` | **9.3** | 10.0 | 10.0 |
| `CVE-2026-120335` (Medium) | **2.4** + `E:P` | **0.9** | 4.8 | 4.8 |
| `CVE-2026-120278` (Medium) | **6.9** + `E:P` | **5.5** | 5.3 | 5.3 |
| `CVE-2026-120416` (Medium, `E:X`) | 6.9 | 6.9 | 5.3 | 5.3 |

## 3. The records that carry it are one CNA's house style

This is the third window in which the shape has been censused, and every time the writer is
**VulDB**: 41 `cna@vuldb.com` records over 26 hours to 11-02 (container stores the base 41/41,
NVD stores the threat 41/41), and now 31 of 31 on 11-02 alone. So quote the assigner with the rate —
"a third of the records I looked at" is a statement about which CNA filed that day.

The 11-03 router batch is the same shape at maximum severity: nine WAVLINK firmware records and one
Linksys E8450 record published **2026-11-02T00:18:09Z → 06:17:43Z**, eight of them **10.0 on both
frameworks in the container**, NVD serving **9.3** on 4.0 and **10.0** on 3.1 for all ten, status
**`Deferred`** (nobody will analyze them). Their `affected[]` names **one firmware build as a point**
(`{version: "V260507_2.0.0", status: "affected"}`, no `lessThan`), so the record asserts that build
and is silent about every other — 10.0 is not a range you can patch against.

## 2c. The gap is a SCOPE fact before it is a severity fact (2026-11-05 12:40)

The filing case was Traefik's `CVE-2026-121966`, where one source
(`disclosure@vulncheck.com`) shipped 3.1 **8.7** beside 4.0 **7.0** for a single bug. The 4.0
vector reads `VC:N/VI:N/VA:N/SC:H/SI:H` — **zero impact on the vulnerable system**, all of it on
the subsequent one — while the 3.1 vector puts `C:H/I:H` on the vulnerable system and raises
`AC:H`. That is a claim about *where the damage lands*, not about how bad it is, and it is not a
stopping point at all.

**v3.1 cannot say that shape.** Its `C/I/A` describe the impacted component and a changed scope
(`S:C`) is a multiplier on the impact sub-score; v4.0 decomposes the same situation into two
explicit triples — vulnerable system (`VC/VI/VA`) and subsequent system (`SC/SI/SA`). So the two
frameworks answer different questions about one bug.

Measured over NVD's **2026-10-27 → 11-02** publication window (3,418 metrics, **610** records where
the *same source* filled both version slots; Δ = v4.0 − v3.1):

| class (where the 4.0 vector puts its impact) | pairs | mean Δ | median | 4.0 higher | 3.1 higher |
|---|---|---|---|---|---|
| `vuln-only` (`VC/VI/VA` only) | 441 | **+0.71** | +0.70 | 327 | 100 |
| `split` (both triples) | 53 | **−0.42** | −0.50 | 14 | 35 |
| `subsequent-only` (`SC/SI/SA` only) | 27 | **−0.89** | −1.00 | 1 | 25 |

**Clean subset: 521 of 610.** The 89 excluded are the stopping-point confound, not a detail — a
pair whose 4.0 vector carries a live `E` (or whose 3.1 score is stored off base) is the question
§2a already answers. Dropping them is what turns VulDB from **−1.29** into **+0.87** on its 16
surviving `vuln-only` pairs: the whole of that CNA's negative mean was the threat term.

The mapping to v3.1's own vocabulary is near-total, which is why the effect reads as a framework
fact rather than a scoring quirk: **`S:U` → `vuln-only` 440 of 443**, **`S:C` → `split`/`subsequent`
77 of 78**. And the sign follows the class *inside one assigner* — VulnCheck's 456 clean pairs give
**+0.74** (`vuln-only`), **−0.65** (`split`), **−0.83** (`subsequent-only`) — so "the 4.0 column is
lower" is not a house style and not severity drift.

**What it changes for the feed:** a dual-column item that reads "8.7 on 3.1, 7.0 on 4.0" and calls
it drift is describing the framework's scope question. The sentence to write is which vector puts
impact where, because a reader triaging a *local* bug against a *subsequent-system* number is
comparing two different deployment postures.

## 4. Reading rules

1. **Find `E` before comparing two numbers.** Same vector, different stops = not a disagreement. If
   `E:X`/absent, any gap is the framework, not the threat.
2. **Name the stop in prose** ("a base of 10.0 and a threat score of 9.3") — the lint's
   `score-stopping-point` advisory fires when a quoted score reconciles to a stop the item never
   names.
3. **Never average two stops**, and never call the lower one "NVD's opinion" when NVD re-served a
   CNA's vector.
4. **Don't infer the stop from the direction of the gap** — at Medium severity the two effects have
   opposite signs and can cancel.
5. **Read the 4.0 vector's `SC/SI/SA` before calling a gap drift.** If any subsequent-system impact
   is present, the 4.0 number is a *different deployment posture*, and 3.1 usually reads higher
   (§2c: 60 of 80 such pairs). Name the class, not the delta.

## 5. One call

```
node agent/tools/cvss-recompute.mjs --ids CVE-…,CVE-…            # recompute; v4.0 needs --oracle
node agent/tools/cvss-recompute.mjs --from YYYY-MM-DD --to YYYY-MM-DD --stopping-point-census \
     --with-cna N [--oracle /path/to/cvss4] [--per-page 1000] [--json]
node agent/tools/cvss-recompute.mjs --from YYYY-MM-DD --to YYYY-MM-DD --scope-census [--json]
node agent/tools/claim-unit-lint.mjs --check cvss --file en/feed/YYYY-MM-DD.md
```

The v4.0 oracle is a MacroVector table deliberately not vendored; without it the tool prints
`v4-not-recomputed` rather than a verdict. `judge()` accepts a number matching **any** stopping
point, so an honest threat score is not reported as a non-reproducing one.
