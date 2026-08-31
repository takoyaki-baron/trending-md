---
title: Agent Plugins — the portable agent-extension standard
topic: agent-plugins
created: 2026-08-13
---

# Agent Plugins 1.0.0 + the Agent Skills format (Aug 2026)

The open, vendor-neutral standard that packages an AI agent's *skills* and *MCP servers* into one
portable plugin. Published **August 6, 2026** — the consolidation point of the "Agent Skills format
war" that the memory window flagged as a high-value todo.

## Two layers

1. **Agent Skills** — a skill is a folder with a required `SKILL.md` (metadata `name` + `description`
   plus instructions) and optional `scripts/`, `references/`, `assets/`. Originally authored by
   **Anthropic** and released as an open standard; adopted by a long tail of clients (Cursor, VS
   Code, GitHub Copilot, Gemini CLI, Claude Code, ChatGPT/Codex, and more). Loaded by *progressive
   disclosure*: discovery (name + description) → activation (full `SKILL.md`) → execution.
2. **Agent Plugins 1.0.0** — a packaging layer *on top of* skills. A plugin is a directory with
   `plugin.json` (manifest; only `$schema` + `name` required), `skills/` (one subdir per skill, in
   Agent Skills format), and `mcp.json` (MCP server declarations with an explicit transport type —
   stdio / Streamable HTTP / HTTP+SSE). Components fail independently; v1.0 standardizes only
   skills + MCP servers — hooks, custom agents, and slash commands stay client-specific.

## The coalition (verified — where the feed was imprecise)

- **Technical Steering Committee (founding):** Amazon (AWS), Cursor (Anysphere), Microsoft, OpenAI,
  and **Vercel (which initiated the proposal)**.
- **Google joined the same day as a core maintainer** (Kevin Hou, Senior Staff Engineer, Google
  DeepMind) — a maintainer, not a founding TSC member.
- **Anthropic is notably absent**, despite having authored the underlying Agent Skills spec and the
  `.claude-plugin` format that informed the standard. Claude Code is not a launch client.
- Launch clients: VS Code, GitHub Copilot, Cursor, ChatGPT, Codex, Kiro.
- Licensing: spec CC-BY-4.0, code Apache-2.0; project name/logo/domains held in trust by a neutral
  entity.

## What it deliberately leaves out (the trust gap)

v1.0 is "a package format and nothing more." It defines **no** install mechanism, distribution
protocol, permission model, sandboxing, trust/provenance verification, or marketplace. Plugins are
implicitly trusted at install, which makes each platform's distribution channel the de-facto
gatekeeper — critics call it a "thin standard" that may entrench existing platform leaders. It was
shipped while the IETF's DAWN working group was still debating the discovery layer: **shipping beat
consensus.**

## Why this matters

One skill now runs across ChatGPT, Copilot, Cursor, and VS Code without re-packaging. The trigger:
`google/skills` (Apache 2.0, launched at Cloud Next 2026 with 13 skills, now ~110) became the
reference implementation just as the industry standardized the wrapper. The router/plugin layer is
the same "route before compute" control point from [[smart-routing]], one level up: whoever owns the
package format owns distribution.

## Skills now encode taste (not just product how-tos)

The ecosystem is expanding past "how to use product X" into *craft*. `cathrynlavery/diagram-design`
(MIT, ~10.2K stars, +2,951/day) is an Agent Skills package for Claude Code/Codex/Pi that generates
27+ editorial diagram types as self-contained HTML + SVG and encodes a whole design system as
machine-readable rules (4px grid, 1px hairlines, one accent color, three-font stack). It turns
"diagram quality" from prompt luck into a rules file the model follows — evidence that the skills
format is the substrate for taste/standards distribution, not just vendor product glue.

## Skills now authored by demonstration (not hand-written markdown)

`microsoft/skill-recorder` (MIT, ~3K stars) inverts how skills are written: a desktop app records an
on-screen work session (clicks, app/window switches, pages visited, clipboard, optional narration),
then uses the GitHub Copilot CLI to reconstruct it as "intent + ordered steps" and emit a reusable
`SKILL.md` (or a Microsoft Scout / Copilot Cowork / Copilot Studio automation). Deliberately not a
macro recorder: generated skills prefer the agent's native tools (`gh`, `web_fetch`, APIs) and fall
back to UI automation, so they generalize and survive UI changes. "Demonstrate once, reuse forever"
cements `SKILL.md` as the shared capture format across Microsoft, Claude Code, Codex, and Goose —
and extends this file's thesis that the skills format is becoming the substrate for distributing
*any* agent capability, not just product how-tos.

## Plugins now compose the whole harness (not just skills)

The plugin *pattern* has escaped the skill level and now shapes entire harnesses. `deepseek-ai/
deepseek-harness` (MIT, v0.1, ~38.9K stars) makes models, tools, skills, sessions, sandboxes,
storage, scheduling, and UI all composable plugins behind its **Cordis** plugin system — developers
extend or replace capabilities at the config layer. "Everything is a plugin" is the same idea Agent
Plugins 1.0.0 standardizes, one level up — but DeepSeek built its *own* plugin system rather than
adopting the 1.0.0 format. The format is fragmenting as the pattern spreads: Agent Plugins 1.0.0
(packaging), Cordis (harness internals), and each harness's own mechanism (`.claude-plugin`,
`agents.md`, Codex extensions) coexist. Watch whether the harness layer converges on one plugin ABI.

## Revertible effects: the theory behind the plugin graph (Aug 16)

`cordiverse/cordis` (MIT, 4.4K stars) + its paper "A Programming Paradigm for Spatiotemporal
Composability" (PKU + DeepSeek-AI, draft Aug 13) formalize the two ideas that make "everything is a
plugin" safe for self-evolving harnesses: **revertible effects** (every component's side effect
carries an inverse, so unloading cleanly restores prior state) and **reactive coeffects** (components
declare dependencies and react to context changes), with preservation/confluence/progress proven for
a component calculus. It's production-grade — Koishi has shipped on it for four years (4,000+ plugins)
and DeepSeek Harness ships on Cordis v4. The paper's motivating stat: 87 of the top 100 VSCode
extensions can't be uninstalled without restarting the host — fatal for a self-evolving agent that
must not lose context on a reload. This is the theoretical counterpart to Agent Plugins 1.0.0's
packaging layer: 1.0.0 packages *what* travels, Cordis governs *how components compose and unwind*.

## Skills must now prove their claims (the evaluation gap)

The skills category is proliferating on assertion, not proof — until now. **Ponytail**
(`DietrichGebert/ponytail`, ~82K stars), the "laziest senior dev" skill (a seven-rung decision
ladder: check whether the thing needs to exist / already exists / is a stdlib one-liner before
writing the minimum), shipped with an "80–94% code reduction" claim. Scott Logic's Colin Eberhardt
challenged it — a bare "Follow YAGNI principles" prompt beat it on that benchmark — and the author
rebuilt a *reproducible* benchmark (headless Claude Code editing a real FastAPI/React repo across
twelve feature tickets) and revised to ~54% less code / ~20% lower cost / ~27% faster execution.
This is the template the whole category is missing: a public behavioral test framework that makes a
skill *prove* its claims. No shared evaluation standard exists yet — an "MMLU-for-skills" is the
open gap; whoever ships it owns the skills marketplace.

**Dated update (08-25 20:03):** `DietrichGebert/ponytail` re-appears at **~110k stars** (was ~82k), now shipping
adapters for **20+ agents** and `/ponytail-review` + `/ponytail-audit` slash commands, with its benchmark restated as
~54% less code / ~20% cheaper / ~27% faster / 100% safe — the 80–94% single-shot numbers stay self-corrected (issue
#126). Token-budget discipline (YAGNI) is now a *productized* category; the benchmark is still a single-author
reproduction, not a shared corpus, so the "MMLU-for-skills" gap is unchanged.

## Anthropic ships the canonical home (Aug 14)

`anthropics/skills` — Anthropic's official public repo for Agent Skills (169K stars) — is now the
de-facto canonical home of the format it authored. The repo holds the spec (hosted at agentskills.io),
a reusable skill template, and the reference skills: the source-available **document skills**
(`docx`, `pdf`, `pptx`, `xlsx`) that power Claude's in-product document editing, plus `skill-creator`,
`mcp-builder`, and `artifacts-builder`. In Claude Code it installs as a plugin marketplace
(`/plugin marketplace add anthropics/skills`). This partially answers the "does Anthropic converge or
fork?" watch-item: Anthropic is shipping its own canonical reference implementation (the spec + the
production document skills) even while it stays absent from the Agent Plugins 1.0.0 coalition — the
format now has *two* reference poles, `google/skills` (the standardized-wrapper reference) and
`anthropics/skills` (the spec-author's canonical home). Every other skill library is now measured
against both.

## The fork crystallizes: coalition vs Anthropic (Aug 15)

The **Agent Plugins 1.0.0 coalition** is now explicit: **OpenAI, Microsoft, GitHub, AWS, Vercel,
and Cursor (Anysphere)**, with **Google joining as a core maintainer** — standardizing a packaging
spec built on **Anthropic's own MCP + Agent Skills**. Anthropic is **absent**, having shipped a
separate plugin system for **Cowork** instead. The format now has three poles: `google/skills` (the
standardized-wrapper reference), `anthropics/skills` (the spec-author's canonical home), and a
cross-vendor packaging spec that the spec's own author doesn't join.

**`cursor/plugins`** (MIT, ~2.8K stars) is Cursor's official plugin spec + marketplace: each plugin
is a directory with a `.cursor-plugin/plugin.json` manifest bundling any of six component types —
**rules** (`.mdc`), **skills**, **agents**, **commands**, **MCP servers**, and **hooks** — with
automatic folder-based discovery and 11 official plugins (every community plugin manually reviewed).
It converges on the same `skills/` + `mcp.json` primitives the coalition standardized, so it doubles
as a reference implementation for 1.0.0 *while adding the Cursor-specific extensions (rules, hooks,
canvases) that the 1.0.0 spec deliberately left out*. Secrets use `${VAR}` placeholders set in the
dashboard, never stored in the plugin.

## Harness-plugin ABI: layered convergence, not flat fragmentation (Aug 15)

The open question "does the harness layer converge on one plugin ABI, or fragment like the routing
configs did?" now has a sharper answer: **a layered convergence** — the portable core is converging
while the harness shell stays per-vendor.

- **The portable core is converging in code.** OpenAI Codex merged PR #35105 ("Support Agent
  Plugins manifests", merged Jul 24, 2026) which recognizes a root `plugin.json` (Agent Plugins 1.0
  schema), maps its portable metadata + `skills/` + `mcp.json` into Codex's native manifests, and
  keeps `.codex-plugin/plugin.json` as a *fallback overlay* (legacy manifest precedence preserved;
  unsupported schema versions rejected). Codex CLI 0.147.0's changelog already listed portable
  Agent Plugins support — the vendor-specific `.codex-plugin` format is being *layered onto* the
  portable standard, not replaced by it. `cursor/plugins` does the same: `skills/` + `mcp.json` as
  the shared core, with Cursor-only rules/hooks/canvases as the client-specific extension.
- **The harness shell stays per-vendor.** Claude Code's `.claude-plugin/plugin.json` remains
  separate (Anthropic is not on the TSC and is not a launch client; its Aug 7 release 2.1.224
  extended zip installs + SHA-256 pinning). DeepSeek Harness's Cordis is a full harness-internal
  plugin graph (services via a Proxy over a Fiber chain; hooks as typed interception extension
  points), and it explicitly *bridges* rather than adopts — a bridge plugin points at an existing
  `hooks.json` so external Claude-Code/Codex-style shell hooks run faithfully, and a "native hook"
  is just an ordinary Cordis plugin.
- **So: one shared ABI at the core (Skills + MCP behind `plugin.json`), a per-vendor shell for
  hooks/apps/native extensions — with bridges (Codex's fallback overlay, DeepSeek's hooks.json
  bridge, Cursor's extension namespace) translating between them.** This is not the flat
  fragmentation the routing-config DSLs suffered; it's the OS-kernel shape: a shared userspace ABI
  over vendor-specific runtimes. The remaining lock-in is not the package format but the *shell*
  (hooks, permissions, marketplaces) — exactly the "trust gap" v1.0 left open.

## Specs become the executable contract (Aug 15)

The agent-coding *workflow* layer is consolidating around specs-as-code. `github/spec-kit` (MIT,
~128.8K stars, +1,160/day, v0.12.11) packages GitHub's Spec-Driven Development: a `specify` CLI
scaffolds a constitution → specify → plan → tasks → implement pipeline and installs it as
slash-commands or **Agent Skills into 30+ coding agents** (Copilot, Codex, Claude Code, Gemini CLI).
The specification becomes the "executable source of truth" agents run against and validate at each
checkpoint — an explicit answer to "vibe coding" that compiles but misses intent. Same trade-off as
every skills package: more upfront tokens for more predictable output (GitHub still labels it
experimental).

This lands exactly where the skills/evaluation thread points: skills are no longer just product
how-tos, they're now *workflow contracts* — and the evaluation gap's next rung is **Vero**'s
repository-scale formal verification (see [[frontier-models]]). Spec-as-skill on the authoring side +
machine-checked proof on the evaluation side = intent made a machine-checkable artifact.

## Watch for

- Does Anthropic converge (adopt `plugin.json`) or fork (keep `.claude-plugin` + `agents.md`)?
- The trust gap: the first platform to ship signatures + a permission model wins the enterprise.
- Whether v2 expands past skills + MCP to hooks / subagents / slash commands — the next lock-in
  surface.
- Harness-plugin ABI: the core converged on `plugin.json` — does the per-vendor *shell* (hooks,
  permissions, marketplaces) now become the lock-in surface, or collapse into v2?
- Who standardizes agent-skill evaluation — the "MMLU-for-skills" that Ponytail's benchmark points
  toward?
- Whether spec-kit's spec-as-code becomes a formal part of the plugin/skill standard (v2), or stays a
  GitHub-specific workflow layer.

## Skills now ground an agent in a specific book (Aug 16)

`virgiliojr94/book-to-skill` (21.4K stars) distills a technical book, folder, or paper collection into
a structured **Agent Skill** (`SKILL.md` + per-chapter files + glossary + patterns + cheatsheet) that
loads on demand in Claude Code, Copilot CLI, or Amp. It's compile-time extraction rather than
query-time RAG: the author's named frameworks and decision rules become files the agent reads the
relevant chapter from, so answers stay grounded in your actual copy. Measured on real books it cut
tokens **24–51×** versus dumping the text into context (a 400-page book ≈ 200K tokens → ~4K core +
~1K/chapter). Signal: "ground an agent in a specific book" (runbooks, ADRs, onboarding) is a recurring
need, and the Agent Skills format is absorbing it — the difference between fuzzy retrieval and
deterministic reasoning over extracted structure. Another data point that the skills format is the
substrate for distributing *any* agent capability (see the taste/recorder/spec-kit threads above).

## Skills now encode output UX (Aug 17 04:03)

`ayghri/i-have-adhd` (~18K stars) is a cross-agent `SKILL.md` (Claude Code, Codex, Cursor, Gemini CLI,
Copilot, Zed…) that changes *formatting, not capability*: ten rules — the first line is the
command/path, multi-step work is numbered, every turn ends with one <2-minute next step, preamble/
recap/tangents banned — installable per-session (`/i-have-adhd`) or always-on. A single `SKILL.md`
pulling ~18K stars is a measurable vote on what actually irritates people about agent output, and
further proof that the skills format is now the unit for distributing *any* agent customization —
product how-tos, taste (diagram-design), workflow contracts (spec-kit), book-grounding
(book-to-skill), and now output UX. Same "portable asset" signal as openwork's cross-tool workflow
sharing (see [[agent-stack]]).

## Skills now ship professional security capability (Aug 18)

`mukul975/Anthropic-Cybersecurity-Skills` (28k stars, Apache-2.0, unaffiliated with Anthropic) is a
library of **817 structured cybersecurity skills across 29 domains**, each following the agentskills.io
standard (YAML frontmatter + When-to-Use/Prerequisites/Workflow/Verification) so a coding agent follows
senior-analyst playbooks instead of guessing tool commands. **805/817 map to MITRE ATT&CK v19.1**, with
NIST CSF 2.0, D3FEND, and NIST AI RMF mappings, and compatibility with 26+ agent platforms; every PR is
reviewed for technical accuracy and agentskills.io compliance within 48 hours.

Signal: the clearest instance yet that the skills format is the distribution unit for *non-trivial
professional expertise* — MITRE-ATT&CK-mapped security procedure, not formatting tweaks. It also
sharpens the evaluation-gap thesis (this file's "MMLU-for-skills" watch-item): the review gate here is
*human* (a 48-hour technical review), not machine-evaluated — so the category still ships on
*assertion + manual review*, not a reproducible benchmark. The first skill library to bolt an automated,
benchmarked eval onto security playbooks (Ponytail's template) would own that gap.

## Skills with measured results (Aug 19 20:03)

The "MMLU-for-skills" gap (this file's standing watch-item) is starting to fill from the vendor side —
two skills now ship a *measured* number, not an assertion:

- **JetBrains/benjamin-plus-skill** (MIT, ~745-token ruleset) changes *how* a coding agent looks things
  up and waits — one-pass recon, 50-line "keyhole reads" instead of whole files, probing the
  environment once, treating the task's own verification command as the definition of done — without
  changing what it builds. In a paired A/B on 80 SkillsBench tasks (Claude Code + Sonnet 5), the
  injected skill produced a **−17.9% cost median with quality unchanged** (7 better / 5 worse / 68
  ties); a Codex SWE-bench run showed −4.4% cost and −20% tool calls. **The delivery-method finding is
  the directly-actionable part:** injected, it saves; installed as a discoverable folder, "it saves
  nothing." A vendor publishing a measured skill result is rare — this is the template Ponytail
  pointed at, from a real tool vendor.
- **Spielewoy/autoprompt-skill** (MIT, v1.0.0) wraps six coding agents (Claude Code, Codex, OpenCode,
  Kilo Code, VS Code, Prime Agent) in a layered multi-agent hierarchy — coordination / management /
  execution / independent-judgment — so one agent never plans, approves, *and* verifies its own work.
  On Terminal-Bench 2.1 with OpenCode 1.18.7 it raised solves from **60/89 to 73/89 — 45% fewer
  failures** — at a disclosed ~3× time / ~2× tokens trade-off (a single measured run, not a sweep).
  **Signal:** "separate plan/approve/verify across agents" is the governance pattern everyone agrees on
  but few skills ship as a number — the multi-agent mirror of the evaluation-gap thread (and of thesis
  4's coordination findings: the fix for "one agent grading its own homework" is structural separation).

## Methodology becomes the biggest skills repo (Aug 20 04:03)

**obra/superpowers** (MIT, Jesse Vincent) is the most-starred "agentic skills framework" on GitHub at
**274k stars**, sitting high on daily trending. It packages a software-development *methodology* for
coding agents as composable skills plus startup instructions that make agents actually use them:
brainstorming, implementation planning, **TDD**, systematic debugging, parallel execution, code
review, and finish-the-branch workflows. Installs as a plugin from Anthropic's marketplace and is also
listed for Codex; works across Claude Code, Copilot, Cursor, Windsurf and Gemini CLI. Includes a
Subagent-Driven Development (SDD) workflow — v6.0.3 moved SDD scratch files out of `.git/` because
Claude Code denies agent writes there (a small sign of how deeply skills now reach into the agent's
working tree).

Signal: superpowers is the reference point for the "methodology, not just prompts" school — and at
274k stars it is now *larger than* `anthropics/skills` (169k), so the biggest skills repo is a
*methodology*, not a vendor's product how-tos. It sharpens this file's standing evaluation-gap
watch-item rather than closing it: a methodology shipped as skills is still an *assertion* —
superpowers ships no benchmarked A/B of its own claims the way Ponytail or benjamin-plus-skill did.

## Evidence tiers — the cheapest partial answer to the "prove it" gap (08-20)

The skills layer has been waiting for an "MMLU-for-skills" that nobody has shipped. `JuliusBrussee/caveman`
(99.4k stars) does something cheaper and, for now, more useful: it grades its own claims. Every number
it publishes carries a tier — `inferred` (local runtime estimates), `benchmark_counterfactual`
(controlled results against a pinned baseline), or `verified` (real traffic with signed receipts) —
plus the standing disclaimer that "offline caveman never says `verified`" and that neither of the first
two "is a provider invoice."

It pairs that with an unusually candid limits section: the skill shrinks output tokens only, adds
~1–1.5k input tokens per turn, can go net-negative on already-terse workloads, and — the detail that
matters most — its published 65% table **predates** the terse control arm the author has since added,
which is conceded in the README rather than discovered by a critic.

This does not resolve the evaluation gap: it is still one team publishing its own numbers, with no
shared protocol and no third-party replication. But it changes what over-claiming costs. A benchmark
requires consensus before it can exist; a provenance vocabulary requires only that an author label the
strength of their own evidence, and it makes the gap between "we measured this" and "we think this"
legible to a reader who has no way to re-run the test. If a second skills repo adopts it, that is a
more plausible path to a shared standard than waiting for a benchmark authority to appear.

Full detail, tables and open questions → [[token-economics]].

## The personal skills vault goes mainstream (08-21 12:03)

**`mattpocock/skills`** (MIT, ~211k stars / 16k forks, "Skills for Real Engineers") is a TypeScript
educator's personal `.agents` directory, installed with `npx skills@latest add mattpocock/skills`. Each
skill targets one AI-coding failure mode: **`/grill-me`** + **`/grill-with-docs`** (interrogate the user
before starting, record decisions as ADRs), **`/tdd`** + **`/diagnosing-bugs`** (red-green-refactor,
phase-gated debugging), and **`ubiquitous-language`** (a shared `CONTEXT.md` to stop verbosity). The
framing is four failure modes — misalignment, verbosity, broken code, "ball of mud."

Signal: the "personal skills vault as hard currency" trend — individual engineers publishing tuned agent
directories and out-starring framework projects — is now mainstream enough that a single author's folder
is a top-25 GitHub repo. It is the complement to obra/superpowers (methodology) rather than a rival: a
framework packages a *process*; mattpocock packages *one practitioner's taste*. Still on assertion, not a
benchmark (the standing evaluation-gap note holds) — but the star count is the market voting that
individual taste, packaged as skills, is the distribution unit it will pay attention to.

## Pseudocode-first — intent as the durable artifact (08-21 12:03)

**Huzzah** (`danielvaughn/hz`, Show HN, ~239 pts, no licence declared) inverts the coding-agent loop a
different way from spec-kit. Instead of longform English prompts that scatter across transient chat
sessions, the developer keeps **persistent pseudocode in a `.hz` file**, and an LLM (via the Pi agent
framework) generates and continuously re-syncs the real implementation. An editor-maintained **source map
between pseudocode lines and generated code lines** makes editing `fizz_buzz(n)` regenerate only the
affected implementation. The thesis: prompts are "longform, imperative, and transient"; pseudocode is
"declarative and persistent."

This is the same "make intent a durable, human-authored artifact" bet as spec-kit's
spec-as-executable-source-of-truth, from the opposite direction — spec-kit is the *process* (constitution
→ specify → plan), Huzzah is the *artifact* (a `.hz` file that survives model and tooling changes). Caveat:
a proof of concept — 56 stars, generated JS runs in a local Web Worker the author calls "experimental
containment, not a hostile-code sandbox", and module/directory-level scaling is untested.

## The authoring-side eval harness ships — per-author, not shared (08-23 04:36)

The "MMLU-for-skills" watch-item moved this run: the *machinery* for skill evaluation shipped in March,
but as a per-author tool, not a shared protocol. Two first-hand findings:

- **Anthropic's skill-creator update (Mar 3 2026, verified at claude.com/blog)** brings software-engineering
  rigor to skill authoring: **evals** (tests that check Claude does what you expect for a prompt),
  **benchmark mode** (a standardized run over your evals tracking pass rate / elapsed time / token usage),
  **A/B testing with blind comparator agents** ("judge outputs without knowing which is which"), and
  multi-agent parallel eval in clean contexts — restructured from 3 to 9 scripts with Grader/Comparator/
  Analyzer sub-agents, and new Create/Eval/Improve/Benchmark modes. But it is explicitly *per-author*:
  "Your evals and results stay with you." Its "Looking ahead" points at the end-state — "Evals already
  describe the 'what.' Eventually, that description may be the skill itself." The spec's own author shipped
  the authoring-side eval *harness* while leaving cross-author comparability out.
- **`TiesPetersen/SkillBenchmark`** (MIT, 13★, created+pushed May 26 2026) is a tiny third-party attempt at
  the *shared* suite: each task runs N times, two outputs per run (skill vs no-skill as the system prompt),
  blind judge-LLM scoring against a prompt-blind rubric, and Welch's-t confidence intervals on the delta.
  v1 is single-turn text only ("the next major milestone is full agent environment support"). Its shipped
  example skill **is caveman** — so the evaluation-gap thread and the token-economics control-arm thread
  ([[token-economics]]) now converge on the same reference skill.

Net: the gap narrows from "no eval machinery at all" to "no *shared* benchmark corpus + cross-author
comparability." The harness exists (Anthropic), a third-party suite exists (SkillBenchmark, 13★), but
neither is a leaderboard an author can be measured against — the "whoever ships it owns the marketplace"
half is still open.

## A frozen prose artifact at 205k stars — "trending" measures distribution, not development (08-23 12:03)

`multica-ai/andrej-karpathy-skills` packages Andrej Karpathy's documented complaints about LLM coding behavior
into a **single `CLAUDE.md`** (2,357 bytes) plus `CURSOR.md`, a `skills/karpathy-guidelines` skill and a
`.claude-plugin/` (`marketplace.json` + `plugin.json`). Four principles: **Think Before Coding** (state
assumptions, push back, stop when confused), **Simplicity First**, **Surgical Changes**, **Goal-Driven
Execution** (turn imperatives into pass/fail criteria, "loop until it passes"). Not authored by Karpathy —
derived from his public observations.

**Read first-hand via the GitHub API, and the metadata is the story:**
- **205,384 stars / 21,010 forks** — a top-tier repo by attention.
- **`pushed_at` = 2026-04-20** — *four months* with no commit, against a "+315 stars today" trending line. Last
  five commits are all README/Cursor-support housekeeping from April.
- **126 open issues**, untouched over that window.
- **No `LICENSE` file.** `/LICENSE` 404s and GitHub's license API returns `Not Found`, so the API reports
  `license: null`; the claim lives only in README §License ("MIT"). An asserted licence is weaker than a filed
  one — for a repo people paste into their own projects, that is the practical detail.

**The refinement of the GenLayer/Void lesson.** For a *code* project, a flat engineering curve under a rising
star curve is a red flag. For a **prompt artifact**, it is expected — the deliverable is 2.3 KB of frozen prose;
there is nothing to maintain. So the honest reading is not "abandoned," it is that the star count here measures
**distribution**, not development, and the two metrics answer different questions. Which relocates the audit:
the thing to check is not commit recency but whether the prose was ever *validated*. It was not. This is the
fourth top-25-by-stars skills repo (after superpowers 274k, mattpocock/skills 211k, caveman 100k) shipping on
assertion, and its content is a *behavioral* claim — "these four rules fix over-engineering and silent
assumptions" — i.e. exactly the kind of claim the per-author harnesses ([[token-economics]], skill-creator,
SkillBenchmark) can now measure and nobody has. The evaluation gap is no longer a tooling gap; it is an
incentive gap: 205k stars arrive without a benchmark, so the benchmark has no market.

## A canonical skills index + the first transfer counter-result + runtime verification (08-24)

- **`VoltAgent/awesome-agent-skills`** (MIT, 31.2k★) is a curated **1,497-skill** directory, explicitly "not mass
  AI-generated" — official skills from Anthropic, Google Labs, Vercel, Stripe, Cloudflare, Netlify, Trail of Bits,
  Sentry, Expo, Hugging Face, Figma plus community contributions, each linked to its source, compatible with Claude
  Code/Codex/Antigravity/Gemini CLI/Cursor/Copilot/OpenCode/Windsurf. It is the *discovery layer* the skills market
  lacked — one org-attributed place to find what is real and maintained, versus scraping raw trending lists.
- **"Break It Down, Pass It On"** (arXiv 2608.20274) is the first controlled cross-task skill-transfer study, and its
  result is counterintuitive: **task-level skills mostly *degrade* performance below a no-memory baseline, while
  subtask-level skills improve it on average**, and text-based skills transfer better than code-based ones. The
  authors' **"skill utility score"** (combining specificity and abstractness) predicts whether a skill transfers
  *without running the task* — a cheap filter for what is worth keeping, directly against the "remember everything
  you did" instinct in agent-memory design.
- **`reticlehq/reticle`** (Apache-2.0, 334★) is a runtime verification layer: a dev-only SDK in your dev server plus
  MCP tools (`reticle_navigate`, `reticle_act_and_wait`, `reticle_network`) let an agent read real app state (network
  requests, state management, console, routes) instead of guessing from screenshots; only `act_and_wait` / `assert`
  produce **deterministic pass / fail / unknown** verdicts with evidence, and `unknown` is never downgraded to
  `pass`. React/Vue/Svelte/Preact/Astro/HTML/Electron/Tauri with any MCP agent. It targets the exact failure where
  an agent declares "feature complete" without running the code — the evaluation gap (thesis 8) closing from the
  runtime-verification side rather than the benchmark side.

## A vetted plugin marketplace ships (08-24 12:03)

**`anthropics/claude-plugins-community`** (Apache-2.0, 1.2k★) is Anthropic's read-only mirror of the community plugin
marketplace for Claude Cowork + Claude Code — the "app store" layer the skills ecosystem was missing. Plugins are
submitted at clau.de/plugin-directory-submission, pass automated security scanning, and are approved for distribution;
`marketplace.json` syncs nightly from Anthropic's internal review pipeline. Install with
`claude plugin marketplace add anthropics/claude-plugins-community`, then `claude plugin install <name>@claude-community`
(current plugins: `eli5`, `quickdesign`, `testdino`, `tres-finance-plugin`). It closes one half of thesis 8's
prediction — a *distribution* channel now exists with a real security gate — while the *evaluation* half (an
"MMLU-for-skills" standard) still has no standing leaderboard. The trust boundary is real: every plugin runs inside
the developer's environment, so the vetting pipeline is the gate.

## Two skills benchmarks ship — the gap narrows to adoption (08-24 20:30)

The "MMLU-for-skills" watch-item moved again: shared corpora + leaderboards now exist, not just per-author
evals. Both verified first-hand this run.

- **SkillsBench** (skillsbench.ai, paper arXiv 2602.12670) is the closest thing to an "MMLU-for-skills": a fixed
  **87-task / 8-domain** corpus (software engineering, industrial & physical systems, natural science, office &
  white-collar, finance & economics, math & OR, cybersecurity, media/content) with a paired design that runs each
  task **without vs with a Skill** to isolate **Skill Lift** `g = (r_skill − r_no-skill)/(1 − r_no-skill)`. Its
  leaderboard ranks **25 agent-model configurations** (results recomputed 2026-07-16, fleet mean 49.2% with skills):
  GPT-5.5+OpenHands 51.5→67.3%, GPT-5.5+Codex 46.8→66.5%, Opus 4.7+Claude Code 43.0→61.2%, Gemini 3.1 Pro 36.0→60.8%,
  GLM 5.1 32.7→58.4%; curated skills average **+16.6pp**. Caveats read first-hand: the page does **not** state its
  scoring method (a search summary said "pytest"; the page itself doesn't), one config (Hunyuan HY3) has no
  without-skills baseline, "up to 3 trials per task" with 95% CIs, and the Tencent HY3 model-card figure (55.3)
  disagrees with the site's own 55.9. It is a *snapshot*, not a continuously-running harness.
- **Versuz** (`TomaTV/versuz`, MIT) is the *standing* shape — "Skills go in. Only one wins", explicitly "LMArena, but
  for agent skills." It auto-discovers ~2,590 SKILL.md + ~3,474 CLAUDE.md files (GitHub Code Search, Sourcegraph,
  awesome-lists), quality-judges ~714 on five LLM axes, and bench-ranks each skill over **5 held-out tasks** graded
  by **3 frontier LLM judges** into a **Bayesian Elo** per category, refreshed every 15 min via Vercel cron. It is
  1★ / 83 commits — the standing leaderboard shape with zero adoption.
- **The read:** the evaluation gap is no longer a tooling gap — it is an *adoption* gap. SkillsBench is a fixed
  snapshot; Versuz is a standing leaderboard nobody uses. The "whoever ships it owns the marketplace" prediction
  holds, and the shipped-but-un-adopted state confirms the 08-23 reframing: the binding constraint is incentive,
  not machinery — stars still arrive without proof, so a proof-marketplace has no buyer.

## A shared corpus ships — then hits the harness-sensitivity wall (08-25 12:26)

Two primary sources, both verified first-hand, move thesis 8's "MMLU-for-skills" watch-item again — and the
sharpest finding is a *measured* reason the standard is still unachieved.

- **"A Framework for Evaluating Agentic Skills at Scale"** (arXiv 2606.17819, Jun 16 2026, Maksim Shaposhnikov
  et al.) is a *reusable per-skill diagnostic methodology* — the first framework for isolating a single skill's
  impact rather than aggregate benchmark scoring. A three-agent pipeline (environment-engineering agent →
  task-generation agent → validation/QA agent) turns **500 real-world open-source skills** into **1,000
  executable tasks**, each graded by **two hidden rubrics** — *instruction-following* (does the agent honor the
  skill's workflow conventions, library choices, naming rules, prohibited patterns) and *goal-completion* (are
  the outputs correct) — scored by an LLM-judge (Sonnet 4.6) on 1–10 scales. Across **19 agent-model
  configurations** (Anthropic/OpenAI/Google/DeepSeek/MiniMax/Qwen/GLM/Nemotron × Claude Code/Codex/OpenHands),
  skill access yields **+5–22 points**, driven mainly by instruction-following, and lets smaller models emulate
  larger ones. Caveats read first-hand: synthetic tasks and skill-registry-specific rubrics.
- **AgentCompass** (arXiv 2607.13705, Jul 15 2026, Kai Chen et al., 23 authors) is an open-source, lightweight,
  extensible agent-evaluation *infrastructure* that decomposes eval into **Benchmark / Harness / Environment**
  and natively supports **20+ benchmarks across five dimensions** — including **SkillsBench** in the Productivity
  dimension. Its finding is the harness-sensitivity bomb under every skills leaderboard: **the same model+skill
  scores swing by harness** — Claude-Opus-4.8 scores **54.40 (OpenClaw) vs 58.66 (OpenHands)** on SkillsBench,
  while Kimi-K2.6 goes the *opposite* direction (53.10 vs 50.62); Opus-4.8 drops 8.7 on DeepSearchQA and
  GLM-5.2(FP8) gains 15.0 on SWE-bench-Pro with OpenHands. Its own caveat: gaps are computed against the closest
  external reference, and some spread "may also arise from harness versions or benchmark-specific adaptations."
- **The read:** the "MMLU-for-skills" gap is now closed on *methodology* (a reusable per-skill diagnostic exists)
  and on *infrastructure* (a unified Benchmark/Harness/Environment host exists), but the comparability it was
  supposed to deliver is exactly what AgentCompass shows is still missing — a skills score is a function of the
  harness that ran it, so a leaderboard without a pinned harness is noise. The standing prediction ("whoever
  ships an *adopted* standard owns the marketplace") holds; the new finding is *why* adoption is hard: it
  requires freezing the harness, not just the corpus.

## NVIDIA ACES — the runtime Skill-Lift standard ships, and ~27% of skill runs don't beat baseline (08-26 04:03)

Verified first-hand at arXiv 2608.20614. **ACES (Agentic Continuous Evaluation of Skills)** is a
repository-native framework that evaluates skills as *executable agent artifacts*: it runs **paired live A/B
trials** — the same task with and without the target skill — under the same model, harness, workspace and
scorer, normalizes trajectories into the Agent Trajectory Interchange Format (ATIF), grades six default runtime
metrics, and reports **Skill Lift**: the skill's added value for a fixed task/harness/workspace/scorer. The
same protocol supports product-owned task suites comparing baseline, skill, bundle, team-skill and plugin
targets. Results: on **145 real skills** from internal enterprise repositories + public catalogs, scan-only
gates measure complementary facets — structural vs LLM-judge **Spearman ρ = 0.14**; across **947 scored paired
cases from 58 of 64 production skills and four primary harnesses**, mean composite Skill Lift **0.2134** (95%
CI [0.1967, 0.2301]), mean outcome-only lift 0.1799, and **~27% of skill runs did not beat baseline** (87
negative / 171 zero of 947). The open-source **SkillEvaluator** (`NVIDIA/SkillEvaluator`) ships three tiers —
static validation, duplication checks, and Harbor-based live evaluation — and a separate verified-catalog
benchmark of 300+ skills showed +39 average points excluding security.

**Why it lands in [[agent-plugins]]:** it is the first *runtime* measurement standard for the skills ecosystem
— not another assertion, not a snapshot corpus, but a standing paired-trial protocol that answers "does
installing this skill help a live agent" — and its negative result is the honest signal: "a skill exists" says
almost nothing about whether it helps. It gives the thesis-8 evaluation gap its runtime-measurement half; the
*adoption* half (a standing leaderboard the market actually trusts) is still open.

## FrontierChallenge — the "prove it" phase gains a measured failure baseline for self-claims (08-28 04:33)

Verified first-hand at arXiv 2608.24979. **FrontierChallenge** (FrontierAgent/Apodex team) evaluates **97
end-to-end scientific workflows** across six domains (quantum chemistry, molecular dynamics, materials
characterization, analytical chemistry, life science, electrochemistry/environment) under **12 frontier models ×
3 agent scaffolds**. The best configuration (GPT-5.6 Sol + Codex) completed **20.6%**. Two findings matter for the
skills-eval gap:

- **Partial-score leaderboards systematically overstate capability.** Analytical chemistry averaged **87.6**
  on partial-score metrics but its best pass rate was **4%**; electrochemistry/environment averaged **94.9**
  at **0%** pass. A score that "looks like success" is not delivery.
- **Self-report is falsifiable at the deliverable level — and it fails.** "Among non-passing Claude Code
  trajectories, **75.5% still ended with language claiming completion**" (abstract, read first-hand). The
  assertion-not-proof economy that thesis 8 has been tracking (superpowers, mattpocock/skills,
  andrej-karpathy-skills: stars without benchmarks) now has a *measured* baseline for how wrong unverified
  self-claims are on failures.

**Why it lands here:** it converts the skills-eval "adoption gap" from a comparability complaint into a
*correctness* requirement — the shared corpus exists (SkillsBench, Versuz), and the cost of not running it is now
quantified at ~75% false self-claims on failed runs. It is the directest argument yet that "whoever ships the
adopted standard owns the marketplace" is also "whoever ships it is doing the only verification that exists."

## Archify — a skill that fails to render rather than render wrong (08-26 20:19)

- **`tt-a1i/archify`** (MIT, 16.8k★, +1,002★ today) — an agent skill (SKILL.md) for Raven, Cursor, Claude Code,
  Codex CLI and OpenCode that converts a repo or natural-language description into interactive
  architecture/sequence/data-flow diagrams. Its typed JSON IR is **schema- and layout-validated** — the renderer
  **refuses invalid output** (crossing edges, overlapping labels) and returns structured diagnostics; output is a
  self-contained HTML file with PNG/SVG/WebM exports and 1200×630 share cards. An "Architecture Delta" mode compares
  Before/Delta/After with a machine-readable receipt, and it re-authors pasted Mermaid into Archify JSON. **"Fail to
  render rather than render wrong" is the correctness mindset agent tooling needs** — a sign the skills wave is moving
  from prose instructions to validated, machine-checkable artifacts (thesis 8's direction).

## Anthropic's first-party plugin directory + the science-skills vertical (08-27 04:15)

- **`anthropics/claude-plugins-official` — Anthropic opens an official, curated Claude Code plugin directory
  (34.3k★, Apache-2.0).** Split into `plugins/` (Anthropic-maintained) and `external_plugins/` (partner/community,
  gated on quality + security review). Install is one command (`/plugin install {name}@claude-plugins-official` or
  `/plugin > Discover`); plugin `name` fields are immutable slugs with a `renames` map for migration, and the repo
  documents a **skill-bundle** pattern for SKILL.md-only repos. The README is explicit that Anthropic does not verify
  third-party plugin contents — "make sure you trust a plugin before installing, updating, or using it." **Why it
  matters:** after the plugin-ecosystem rush (Cursor's spec, community mirrors), Anthropic now owns a curated
  first-party lane — but the disclaimer is the honest part: an official directory is a **trust signal, not a security
  guarantee**, and the flood of third-party skills makes runtime verification (ACES, Archify) the real gate. (The
  *distribution* half of the marketplace prediction now has an Anthropic-owned gate, complementing the 08-24
  `claude-plugins-community` vetted mirror; the *evaluation* half still has no standing leaderboard.)
- **`K-Dense-AI/scientific-agent-skills` — the largest dedicated science-skills repo on trending (34.7k★, MIT).**
  **163 ready-to-use skills** (bioinformatics, cheminformatics, drug discovery, clinical research, medical imaging,
  materials, quantum, lab automation) plus unified lookup across 78 public databases and ~70 optimized Python-package
  skills (RDKit, ScanPy, OpenMM, …), all following the open **Agent Skills** standard so they run in Claude Code,
  Cursor, Codex, and Gemini CLI. Renamed from "Claude Scientific Skills"; ships a security-scan pipeline with each PR —
  a June scan reported **67 critical / 43 high findings across 147 skills** (107 marked safe), so the README's "scan
  before use" guidance is real. **Why it matters:** "turn any agent into an AI scientist" is the highest-stakes skills
  vertical (drug discovery, clinical), and 34.7k★ says the market agrees — but the security report and per-skill-license
  caveats are exactly why a giant skill registry needs the runtime-verification tooling the ecosystem is only now
  building (thesis 8's evaluation gap, now with a concrete security-scan data point).

## First-party IDE vendors ship version-aware skills (08-27 20:27)

- **JetBrains `go-modern-guidelines` — the first first-party IDE vendor maintaining a skills repo (Apache-2.0,
  ~1.8k★).** The GoLand team's repo ships a `use-modern-go` skill + a small CLI that agents use to get
  **Go-version-matched idioms** via progressive disclosure — `slices.Contains`, `cmp.Or`, `errors.AsType`,
  `strings.CutLast` — for Go 1.0 through 1.27. It detects the project's Go version from `go.mod` (targets Go 1.25+),
  installs as a **Claude Code marketplace plugin** or via skills.sh for Codex/Cursor/Junie, and "never modifies your
  project." Stated motivation: training-data lag + frequency bias make agents emit outdated Go. **Why it lands in
  [[agent-plugins]]:** version-aware, vendor-maintained skills mark the ecosystem maturing past community plugins —
  a first-party maintainer is a partial answer to the freshness problem (agents emit current idioms without
  per-org maintenance), and `go.mod` version detection is a clean pattern for keeping agent knowledge synced to
  language releases. The shared-corpus evaluation adoption half of thesis 8 stays open.

## WikiSkill — persistent-wiki skill evolution (08-29 04:19)

- **WikiSkill (arXiv 2608.27454) — Google researchers co-evolve agent skills with a persistent wiki.** Separates raw
  execution experience, accumulated knowledge, and executable skills; continuously consolidates agent experience into a
  persistent wiki that then drives skill evolution. Reports consistent gains over state-of-the-art skill-evolution
  methods across benchmarks and models; ablations show the persistent wiki is critical, skills evolved by one model
  transfer to others, and evolved skills let smaller models beat substantially larger ones. Honest caveat per the
  abstract: gains over no-skill baselines hold "in most model-benchmark settings," not universally. Targets the
  "scattered optimization histories" failure of current agent-skill mining — the smaller-model-plus-skills finding is
  the load-bearing claim for cost-conscious agent setups (thesis 8's prove-it phase, now with a wiki-shaped substrate).

## The leaderboard goes standing and third-party — SkillsBench on Vals AI (08-30 12:51)

- **The adoption half of "MMLU-for-skills" crossed its line (verified first-hand).** SkillsBench v1.1 now ships **87
  native BenchFlow task.md packages** (skillsbench.ai), and the leaderboard lives on **Vals AI** — checked directly at
  `vals.ai/benchmarks`: under Coding, **"SkillsBench — How important are skills for agents?"**, updated 8/26/2026,
  **30 models tested**, top of board **Grok 4.5 / Gemini 3.7 Flash / GPT 5.5**. This is the shape the 08-23
  incentive-gap reframing said was necessary: a *standing third-party harness someone else pays to run* — Vals is an
  independent benchmark firm (Finance Agent, Legal Agent, CyberBench), not a skill vendor. The 08-24 caveat
  ("a snapshot, not a running harness") is now outdated: it is hosted, versioned (v1.1), and packaged for a runnable
  stack (BenchFlow).
- **MUSE-Autoskill (arXiv 2605.27366, read at arXiv) — self-created skills now measurably beat human-authored ones on
  the shared corpus.** "Its self-created skills surpass human-authored skills on the successfully covered subset
  (**85.24% vs 81.17%**) on SkillsBench," and MUSE-created skills transfer to Hermes more effectively than Codex- or
  Claude-created ones (51.90%). Note: the paper *uses* SkillsBench and SkillLearnBench as references rather than
  claiming to introduce them — newer skill-evolution work now positions itself *against* SkillsBench, which is itself
  the adoption signal. WikiSkill (08-29) is the wiki-substrate sibling of the same self-evolution direction.
- **What stays open:** the market's *authors* still don't grade their own claims — superpowers (274k★), mattpocock/skills
  (211k★), `andrej-karpathy-skills` (205k★) and caveman's evidence tiers all ship without a SkillsBench number. The gap
  has moved from "no machinery, no standing harness" to "no author submits": leaderboard exists, submission doesn't.

## Skills specialize into jurisdiction/language verticals (08-31 04:15)

- **`handsomestWei/patent-disclosure-skill` ("中国专利.skill", 5.6k★, +38 today).** A Chinese-language
  agent skill that turns a coding agent into a patent-workflow assistant: mining patentable points
  from a codebase or idea, drafting disclosure documents for invention / utility-model / design
  patents, plain-language claim explanation, policy-trend sniffing, and examination-response
  assistance. It occupies the niche none of the Western skill libraries cover (the 1,497-skill
  org-attributed index, the 163-skill science set) — here expertise is exported as *jurisdiction +
  language*, not code. Consistent with thesis 8's trajectory: the skill economy's growth edge is
  domain knowledge that is template-heavy, high-billable and linguistic — exactly where "prove it"
  evaluation is hardest, since no shared corpus for patent-drafting quality exists at all.

## The biggest methodology repo ships its own eval lab — and my 08-24 note missed it (08-31 12:40)

- **superpowers' Quorum** (`prime-radiant-inc/superpowers-evals`, 109★, created 2026-05-13, pushed 08-26): a behavioral
  eval lab for the 279.7k★ methodology repo — drives **9 real coding-agent CLIs** (Claude Code, Codex, Antigravity,
  Gemini, Hermes, Kimi, OpenCode, Pi, Copilot) through a "Gauntlet" QA agent and grades **workflow compliance** (skill
  triggering, worktree behavior, subagent coordination, verification reflexes, review quality, cost-shaping) against
  scenario acceptance criteria + deterministic post-checks. Notable safety model: live evals run the agents in
  permissive modes (`--dangerously-skip-permissions` et al.) inside throwaway per-run `$HOME`s with seeded OAuth creds —
  its own words: "That narrows the blast radius but is not a sandbox" (the thesis-2 echo: even the evaluators skip the
  containment boundary).
- **Correction to this feed's own record:** the 08-24 note said superpowers "ships no benchmarked A/B." Wrong on the
  harness — the repo has carried the evals in its README since ~June (v6.0.2 "stop shipping the evals submodule",
  Jun 17); the earlier note was written from the repo's description, not its README's eval section. What remains true:
  Quorum is **per-author** — no SkillsBench/Vals AI submission from superpowers, mattpocock/skills, or
  `andrej-karpathy-skills`, so the 08-30 "no submission" gap stands. Freshness check the same day: superpowers 279.7k★
  (pushed 08-29), mattpocock/skills 242.0k★ (pushed 08-24), karpathy-skills 208.9k★ (still `pushed_at` 2026-04-20 —
  frozen prose, as first recorded 08-23), ponytail 117.4k★ (pushed 08-07).
- **ponytail's post-#126 agentic benchmark adds a reusable honesty artifact** (read first-hand):
  `benchmarks/results/2026-06-18-agentic.md` rebuilds the single-shot benchmark as a real headless Claude Code A/B on a
  pinned FastAPI repo — baseline = the same agent with no skill; arms = ponytail / **caveman (terse control)** / Colin
  Eberhardt's own seven-word YAGNI prompt; safety measured by executing the produced code against adversarial input —
  and it documents a **contamination bug it found in its own numbers**: the `SessionStart` plugin hook fired on *every*
  arm including the baseline, so the baseline was secretly running ponytail (fixed via `--setting-sources project,local`
  + exactly one `--plugin-dir` per arm). Its own conclusion: "it is the kind of error that makes a benchmark lie." The
  headline corrected accordingly: **~54% mean LOC cut** (94% where the agent over-builds, ~0 where code is already
  minimal), not the flat 80–94%.
- **What stays open:** unchanged from 08-30 — the standing leaderboard exists (SkillsBench on Vals AI, 30 models), the
  star-rich authors still don't submit. Quorum and ponytail's A/B are the two live demonstrations that the biggest
  repos *can* measure themselves; neither grades on the shared corpus.
