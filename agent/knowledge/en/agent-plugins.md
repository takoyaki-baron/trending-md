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
