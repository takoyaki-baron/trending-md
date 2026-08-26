---
title: Token economics
topic: token-economics
created: 2026-08-20
---

# Token economics — cost optimization at the context boundary

The layer that answers **"how many bytes cross the wire per turn?"** — as distinct from
[[smart-routing]], which answers "which engine runs this?", and from [[agent-stack]]'s harness layer,
which answers "what executes the loop?". It appeared as a set of unrelated hacks and is consolidating
into an optimization surface with its own tools, its own benchmarks, and — newly — its own vocabulary
for grading evidence.

## Why it separated from routing

Routing lowers the *unit price* of a call. Token economics lowers the *number of units*, and it does so
without touching the model, the provider, or the route. The two compose: a routed-to-cheap model still
reads a bloated context, and a compressed context still has to pick an engine. They are now measured by
different teams with different numbers, which is the practical sign that a layer has separated.

The pressure driving it is structural. Agents re-read context every turn, so token spend scales with
*conversation length × tool output size*, not with task difficulty. Any workload where the agent reads
more than it writes — code search, log triage, browser automation, repo Q&A — is dominated by input
tokens that no model choice can reduce.

## The instances

| Tool | What it compresses | Reported effect |
|------|-------------------|-----------------|
| caveman skill (`JuliusBrussee/caveman`) | what the agent **writes** | −65% output tokens (avg, 1,214 → 294) |
| caveman proxy (Caveman Engine) | what the agent **reads**, byte-exact recovery | −33.2% provider-reported input tokens |
| caveman `--pixel` | dense text → PNG pages for vision models | skill itself 1,069 → 415 est. tokens (−61%) |
| caveman `browse` | browser state vs Playwright ARIA | 15,704 → 121 tokens (129.8×) on a 200-row table |
| DeepSeek-Reasonix | prefix-cache stability across long sessions | flat cost over session length |
| JetBrains benjamin-plus-skill | injected-not-installed skill payload | −17.9% cost, quality unchanged |
| i-have-adhd | output UX (first line = command/path) | assertion only |
| StateM | runbooks replacing exploration | Terminal-Bench 2.1 at ~$15 vs $574.68 |
| fx (`vercel-labs/fx`) | the harness binary itself | ~6–8 MiB, ~10µs cold start |
| vomit (`zachahn/vomit`) | a frontier model's verbose output, via a local "style filter" | assertion only (GPLv3, Go) |

## caveman — read first-hand, 2026-08-20

99,364 stars / 5,760 forks at check; GitHub reports the license as `NOASSERTION` because it is split:
**MIT** for the skill and CLI, **BSL-1.1** for the proxy runtime (Caveman Engine). Two independent
mechanisms ship under one name, and conflating them is the easiest way to misreport it:

- **The skill** (the original, MIT, 30+ agents) makes the agent answer in terse "caveman" style while
  code, commands and errors stay byte-for-byte exact.
- **The proxy** (`caveman wrap`, BSL) shrinks what the agent reads before each provider call, with
  byte-exact recovery via a content-addressed store and per-type compressors for JSON, logs, code
  (tree-sitter), diffs and search results.

**Pixel mode** renders dense text slabs to PNG pages for models with measured render legibility
(`claude-fable-5`, `gpt-5.6` by default). Its own README is careful here: "Pixel only pays on dense,
long-line content. Sparse code with short lines is honestly *not* profitable" — a profitability gate
declines the conversion and passes bytes through untouched.

### The honest-numbers section is the reason to care

The README carries a block headed **"Honest number warning"** that concedes what a marketing page
would bury:

> "The skill only shrinks **output** tokens. Input and reasoning tokens are untouched, and the skill
> itself adds ~1–1.5k input tokens per turn. Whole-session savings run smaller than the output number,
> and on already-terse workloads they can go net-negative."

And, on the benchmark's missing control arm:

> "'Normal' above means an unprompted assistant, not a terse one. Some of that 65% is what any 'answer
> concisely' instruction would buy you. `benchmarks/run.py` now runs a terse control arm alongside the
> other two, so the next regenerated table splits the two apart; **the numbers above predate it**."

It also publishes a case where it *loses*: on a small checkout form its browse output is larger than
the Playwright baseline (67 → 111 tokens) because it additionally returns action UIDs and a recovery
handle.

## The transferable idea: evidence tiers

caveman labels every claim with the strength of evidence behind it:

- **`inferred`** — local runtime results (estimates from its own accounting).
- **`benchmark_counterfactual`** — controlled benchmark results against a pinned baseline.
- **`verified`** — reserved for real traffic with signed receipts; "**offline caveman never says
  `verified`**," and neither of the first two "is a provider invoice."

This matters beyond one repo. The [[agent-plugins]] "prove it" gap has been waiting for an
MMLU-for-skills that nobody has shipped. A claim-provenance vocabulary is a *cheaper* partial answer:
it does not tell you whether a skill is good, but it tells you what kind of evidence the author is
standing on — and it makes over-claiming visible without requiring a shared benchmark first. It is
worth borrowing regardless of whether caveman's specific numbers survive their control arm.

## Open questions

- Does the terse control arm survive contact with the 65% headline? The author has pre-committed to
  publishing the split; the next regenerated table is the test, and it is a rare case of a falsifiable
  prediction with a named mechanism and a date.
  **Checked 08-20 21:06:** the control arm is now live in code — `benchmarks/run.py` runs a terse arm
  (`TERSE_SYSTEM = "Answer concisely."`) and computes *both* deltas (caveman vs terse, and vs the
  unprompted baseline) — but `benchmarks/results/` is empty and the README still labels the 65% table as
  predating it, so the regenerated number is still pending. One signal surfaced anyway: run.py's own
  comment flags the mean-of-ratios (65%) vs aggregate-ratio (76%) split — the honest audit is alive in
  the code before the table lands.
  **Re-checked 08-22 04:43:** still no regenerated table — the README's 65% output figure is unchanged
  and `benchmarks/results/` remains empty, so the terse-arm split the author pre-committed to is still
  pending a third check.
  **Third check 08-22 12:41:** still pending — `benchmarks/results/` holds only `.gitkeep`, `pushed_at`
  is 08-21 03:28 (no code change since the 04:43 check), and the README's 65% output table is unchanged.
  Three checks over ~24h: the control arm is live in `run.py` but the regenerated vs-terse number has not
  shipped — the falsifiable prediction stays open.
  **Fourth check 08-22 20:28:** still no table — `benchmarks/results/` holds only `.gitkeep`, `pushed_at`
  unchanged (08-21 03:28, ~48h of no code change), README's 65% table unchanged; the repo has since crossed
  **100k stars** (100,242). Four checks over ~2 days: the terse control arm is live in `run.py` but the
  regenerated vs-terse number has not shipped — the falsifiable prediction is now well past its stated "next
  table", and the honest audit remains in code only (the mean-of-ratios 65% vs aggregate-ratio 76% comment).
  **Fifth check 08-23 04:03:** still no table — `benchmarks/results/` = `.gitkeep`, `pushed_at` still
  08-21 03:28 (~2.5 days), README's 65% table unchanged, stars 100,312.
  **Sixth check 08-23 04:36:** still no table — `benchmarks/results/` = `.gitkeep`, `pushed_at` still
  08-21 03:28 (~2.5 days), README's 65% table unchanged, stars 100,315. New: a *third-party* measurement
  tool now exists to run the split — `TiesPetersen/SkillBenchmark` (MIT, 13★) ships **caveman as its
  example skill** (blind judge + Welch-t CIs, see [[agent-plugins]]), so the terse-vs-unprompted question is
  no longer gated on caveman's own `run.py` republishing.
  **Seventh–eleventh checks (08-23 12:38 → 08-24 04:30):** still no table — `benchmarks/results/` = `.gitkeep`
  throughout; `pushed_at` moved once (to 08-23 12:04Z, the first code change after ~2.6 days) and has held
  since; README's 65% table unchanged; stars 100,357 → 100,499. Eleven checks: the repo is maintained, the
  regenerated vs-terse number still has not shipped.
  **Twelfth–nineteenth checks (08-24 20:30 → 08-26 04:35) — archived unanswered.** `pushed_at` held at
  08-24 23:31Z (the third push = proxy git-hardening PR #901 + release 1.2.5) through all eight; `benchmarks/results/`
  stayed `.gitkeep`; README's 65% unchanged; stars 100,620 → 100,916. **Answer:** the promised vs-terse table
  **quietly never shipped** — the repo is actively maintained (stars climbing, 371 open issues) and spends velocity
  on proxy security, not the benchmark; the honest audit lives in `run.py` only, now third-party-runnable via
  SkillBenchmark. The falsifiable prediction resolved as "disappeared"; the evidence-tier-adoption half of the watch
  folds into the agent-stack "prove it" thread ([[agent-plugins]]).
- Does pixel-mode billing hold? It depends on providers pricing image tokens below the text they
  replace — a pricing-policy dependency, not a technical one, and therefore revocable by a vendor
  changing a rate card.
- Byte-exact recovery is the security-relevant claim: a proxy that rewrites what an agent reads is a
  prompt-injection surface and a correctness surface at once. No third party has audited the recovery
  path (→ [[security]]).
- Do evidence tiers spread? If a second skills repo adopts `inferred`/`benchmark_counterfactual`/
  `verified`, that is the start of the shared protocol the skills layer has been missing.
  **Checked 08-26 12:27: still no second adopter.** Searches surface only caveman itself, forks of it
  (bhardwajRahul/caveman, dexpal-ai-tools/caveman) and a Tessl registry listing (v1.0.7, "96 quality score") — none
  of which adopt the tier vocabulary independently; the vocabulary stays single-repo. Watch in passing.

## vomit — a local style filter for verbosity (08-21 12:03)

`zachahn/vomit` (Go, GPLv3) intercepts Claude Code / Claude 5's output via a MessageDisplay hook and
rewrites it through a **separate local LLM** (the author uses `gpt-oss:20b`) before display, under the
tagline "Save your tokens, Claude 5 is hopeless." Fully local (no telemetry), works with Ollama,
Llama.app or any OpenAI-compatible endpoint. It is tongue-in-cheek but a real instance of the layer:
frontier models pad output with repetitive narration and over-decorated comments, and piping one model's
output through a smaller one as a "style filter" is a cheap, composable pattern — a *quality-of-output*
compress that none of the other instances (caveman, DeepSeek-Reasonix, benjamin-plus-skill) target.
Caveats from the author: the local model only sees what Claude says (so it "hallucinates a bit"), it's
"pretty slow," "totally vibe-coded," and only tested on Mac.

## nobuzz — a cross-model style filter for a frontier model's house voice (08-22 12:03)

`adnanakil/nobuzz` (MIT) is a Claude Code skill, `/debuzz`, that takes Claude's last response and pipes it
through Google's **Antigravity CLI (`agy`)** — powered by Gemini — to strip the "BuzzFeed voice" (the
theatrical "load-bearing assumption … and the kicker is …" prose that got worse around Opus 4.8). Three modes:
`colleague` (same content, zero theatrics), `manager` (⅓ length, no code), `director` (3–5 sentences), plus a
fallback if `agy` errors. It is the same layer as `zachahn/vomit` — routing one model's output through a
*different* model as a style filter, because self-correction can't remove the tics a model was trained to
produce. The difference from vomit: vomit targets generic verbosity, nobuzz targets a *specific* house voice.
Both remain assertion-only (no benchmarked token delta). Signal: the style-filter instance is now repeatable
enough to be a named pattern rather than a one-off joke — and it is a measurable vote on how much friction a
frontier model's house voice now causes working engineers.
