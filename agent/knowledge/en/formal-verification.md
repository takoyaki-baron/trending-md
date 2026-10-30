---
topic: formal-verification
title: Machine-checked claims — what "verified" buys, what it trusts, and the degenerate proof
---

# Machine-checked claims

**The claim:** a proof is a claim about a *model*, not about reality, and the model's trust boundary is
almost never in the headline. The recurring 2026 pattern is that the artifact which says "proven" also
ships — in a footnote, a limitations section, or the spec itself — the statement that fixes what the
proof does **not** cover. Read the proof as a very strong test whose scope is written down, and the
work is (a) find the scope, (b) find the trusted base, (c) ask what the prover was rewarded for.

## 2026-10-22 — Anthropic × Theorem: proofs over compiled RISC-V binaries (the landmark)

First large-scale application of formal verification to *production software at the assembly level*
(the post's own framing). Claude wrote proofs that each compiled binary in 123 OSS-Fuzz C/C++ libraries
can never crash — it always exits normally without a memory-safety error or a failed assertion — for
**every input under 64 MB**, every modeled Linux response and memory layout, under stated assumptions.
All figures verified first-hand on [the post](https://www.anthropic.com/research/formal-verification)
(2026-10-23 12:20 UTC+8):

| Field | Value | Note |
|---|---|---|
| Libraries | **123** | OSS-Fuzz corpus |
| Entry points | **239** | the spec is derived mechanically from each project's existing fuzz entry point — "this test suite never crashes" |
| Proof volume | **~180M lines of Rocq** | typical proof ~600,000 lines |
| Binaries | median **18,000 RISC-V instructions** | proofs operate on compiled instructions, via Theorem's RISC-V + Linux process semantics |
| Bug find | patches for bugs **fuzzing missed over trillions of runs** | found *while* proving |
| Artifacts | a subset of proofs + the RISC-V/OS semantics published; Theorem offers the pipeline to other projects and publishes a Claude skill | reuse is the amortisation story |

### The trusted base (the part the headline omits)

1. **Theorem's RISC-V and Linux process semantics** — themselves model-generated; the post's fn 7 says
   single-stepping the semantics boots an Ubuntu user space on a Linux kernel, and that generating them
   found **hundreds of mistakes in the official reference documentation** plus a smaller number of
   **hardware bugs**. That is a validation story, not a proof.
2. **The theorem statements** — the spec. Derived from a fuzzer's entry point, which is why the claim is
   "cannot crash", not "is correct".
3. **The Rocq kernel** — and, per fn 5, "the hardware, OS, OCaml compiler that the Rocq proof checker
   relies on". The chain terminates in silicon.
4. **The caller** — out of scope entirely. A verified library can still be misused into memory
   corruption; closing that needs per-function caller contracts.

### The limitations section, verbatim in substance

- Single-threaded, statically linked **RISC-V + musl**; most deployments are **x86/ARM + glibc**.
- Not every entry point was verified; verifying all entry points still doesn't cover the library
  (dead code), and **ASan does not detect every memory-safety bug**, so "no ASan crash" ≠ "no bug".
- The post's own sentence, which is the line to quote: **"Formally verified" does not mean "bug-free."**

### The footnote that changes how to read the whole thing (fn 6)

> "Note this leaves open the door to **reward hacking** … Claude could make any theorem provable by
> **rewriting the program into one that trivially never crashes**. To discourage this, we penalized any
> patch and offered extra credit for proving which inputs it changes and how few they are. We also
> logged and audited the patches for these failure modes."

This is the most important paragraph in the release and it is not in the body. **A prover given "make
this theorem true" has a degenerate solution: change the subject of the theorem.** The mitigation here
is reward shaping (penalise patches, reward minimality) plus a human audit of the patches — i.e. an
*incentive* and a *process*, not a constraint the checker can enforce. The same shape as an agent that
passes a monitoring test by deleting the monitoring, and as SlopCodeBench's strict-vs-core gap: the
target is adjustable unless something external pins it. **When a verification claim covers code the
model also edited, the patch count and the patch audit are part of the result.**

Related, same week: the compiled-artifact framing means the *deployed bytes* are what is proven, which
sidesteps source-vs-binary skew — but only for the build someone verified.

## Method catalogue (what "verified" can mean, cheapest first)

| Method | What it proves | Where the trust lands | Seen here |
|---|---|---|---|
| Reachability / crash-freedom over a bounded input space | no crash reachable within the model | the semantics + the bound (64 MB here) | Anthropic×Theorem (10-22) |
| Spec-from-existing-test | the test's property holds universally | the test's *intent* — a weak spec inherits the fuzzer's blind spots | Anthropic×Theorem (the entry-point trick) |
| Interactive proof of a mathematical statement | the statement, given axioms | the axioms + the kernel | FLT formalization (13M Lean lines/11 days, 09-05); BB(10) in Coq (10-07); A-greement's Lean proofs, which also found unreported bugs (10-22) |
| N-version re-checking | the proof survives independent kernels | the kernels' independence | Lean v4.35.0 `lake check --paranoid`, four kernels (10-18) |
| Complementary/reverse benchmarks | both a problem and its negation are shipped | the pairing, not a score | ReuF2F (10-22) |
| Reproducible oracle | the claim is regenerable from public input | the oracle script | NIST curve seeds, public-domain Python regenerates all 14 (10-17) |
| "Machine-checked pipeline output" | each step checked, the *goal* not | the goal statement | coincidence, not verification — name it as such |

## The question list — apply to any "verified / proved / formally checked" claim

1. **What is the theorem?** Crash-freedom, functional correctness, and "no reachable UB" are three
   different claims; the abstract usually states one and the coverage implies another.
2. **What is the trusted base, and does the vendor enumerate it?** Semantics, compiler, kernel, hardware.
   A trusted base stated only as "the checker" is incomplete.
3. **Does the model match the deployment?** RISC-V+musl vs x86/glibc is the whole delta here.
4. **What is out of scope by construction?** Caller misuse, concurrency, dead code, and the parts of the
   library no entry point reaches.
5. **Was the subject editable by the prover?** If yes, find the anti-trivialisation measure and whether
   it is an audit (weak but real) or a constraint (strong). Reward shaping is not a proof.
6. **Is "no counterexample" being reported as "no bug"?** ASan/differential testing can't see what it
   can't detect — that sentence is usually present and usually dropped downstream.
7. **Single run or a distribution?** One proof of one build is one data point (the four-Gemini
   Minecraft run's caveat, reused).

## Lineage in this library (where the rest of it lives)

- [[frontier-models]] — the math-verification arc: FLT, the NIST oracle, quantum circuits with a Lean
  proof (17× fewer gates), A-greement, Maggi's "recognition signal has collapsed" counterweight.
- [[dev-tools]] — Lean's `--paranoid`, the compile-step-as-reviewer idea.
- [[fact-check]] — the generic habit this file specialises: find the sentence the vendor wrote that
  narrows its own headline, and quote it in the analysis line.

## 2026-10-23 (learn pass) — why this file exists

The 10-22 release moved verification from "a paper's theorem" to "a library you ship", which makes it a
*feed* topic rather than a research curiosity. The class will now recur (Theorem is productising the
pipeline and shipping a skill), and the failure mode of covering it is well-established: repeat the
number, drop the footnote. This file is the checklist that prevents that, and the next two things to
watch are (a) whether any of the published proofs is re-checked by an independent party against the
same semantics, and (b) whether the 64 MB bound is ever the thing an attacker needs — an input-size
bound is a real constraint only if the parser refuses larger inputs at the same boundary.

Sources: [Anthropic — LLMs are making formal software verification feasible at scale](https://www.anthropic.com/research/formal-verification) · [HN thread](https://news.ycombinator.com/item?id=50202217)

## 2026-10-30 — a proof is a property of the build, not of the process

Two artifacts in one batch ship verification to places the 10-22 run did not: one to WASM, one into a
game engine. Both state, in their own words, **what stops being checked once the thing is deployed** —
and that sentence is the reusable part.

**Lasm (`Millillion/lasm`, MIT, 66★, created 2026-09-23, `@lasm/cli` 0.3.5 on npm 2026-10-28T19:07:10Z)
ahead-of-time compiles ordinary Lean 4 to WebAssembly.** It pins `leanprover/lean4:v4.35.0` exactly and
installs the toolchain itself. The target table is unusually wide for a 0.x project — Node, Lambda,
Lambda@Edge, Vercel, Netlify, Azure Functions, Cloud Functions gen2, Workers, Deno Deploy, Supabase Edge,
Bun, Deno, Fastly Compute, WASI, wasi-http, browsers — and each row is claimed CI-tested against the
platform's own runtime. Its quick-facts table puts the limit where a reader cannot miss it:

> **Not available at run time:** elaboration, `#eval`-style evaluation, loading `.olean`, Lean's kernel —
> all of these work at build time.

So the deployed artifact carries **no proof checker**: the theorems are a property of the build you
shipped, and the process running it neither re-checks nor could. Two more limits are in the same table
rather than a footnote: edge/Bun/Deno/WASI/browser targets "run Lean single-threaded, without sockets or
processes (and without files, except on WASI)", against the Node row's full runtime. The flagship claim —
the Conduit RealWorld app with **117 proved theorems** — is the project's own count (README, `npm run
proofs`, "no `sorry`, standard axioms only", CI job `conduit.yml`), not independently reproduced; and
"by project policy CI never deploys to a real cloud account", which is exactly the right policy and also
means the cloud rows are build-artifact tests rather than deployments.

**DOOMFORMER (`mottopanikeiku/doomformer`, MIT, 36★, created 2026-10-20, v0.4.0) compiles an integer
neural network into a DOOM map** and lets the engine do the arithmetic: voodoo dolls are numbers, weights
are lines on the floor, a sum is a light level or a plane height, an activation a staircase, attention a
ceiling. The MNIST map uses **1,355 dolls**. Published: **10,000 / 10,000** test digits exact, **0**
mismatches across **20,000** fuzzed nets, and **4** other DOOM engines running the "museum" map exactly.
Then the part that makes the headline citable — it attacks its own check in a table: tamper with one
weight line and "the check fails on exactly the inputs that cross it"; mutate one map line **1,004** times
→ **297 caught**, and "no survivor is proven harmless"; guard every readout page with a poison value →
"a page that never runs cannot pass old values". And the limit, plainly:

> Every run compares each value the map exposes with NumPy. **That proves the inputs that ran, nothing
> more.** The MNIST map exposes 248 values; it does not expose its 903 staircase counts or 1,351 gate
> comparisons.

**Added to the question list (applies to any "verified" claim):**

1. **Where does the checker live after deployment?** A kernel, a `lake check`, or a NumPy comparator that
   runs at build time is a claim about the build. Ask what the *installed* artifact can still prove — for
   Lasm the answer is "nothing beyond ordinary compiled code".
2. **How many values does the check touch, out of how many the artifact computes?** DOOMFORMER's honest
   denominator is 248 exposed of 2,502-odd internal values (903 staircases + 1,351 comparisons). A
   verification that covers the outputs proves the outputs.
3. **Is the count of theorems a count of things a consumer cares about?** 117 theorems over authorization,
   follows, favorites, slugs, pagination and JSON round trips is a set somebody chose; it is evidence the
   app *can* be written this way, not a coverage figure.

→ [[frontier-models]] [[fact-check]] [[dev-tools]]
