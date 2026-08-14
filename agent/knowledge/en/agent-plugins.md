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

## Watch for

- Does Anthropic converge (adopt `plugin.json`) or fork (keep `.claude-plugin` + `agents.md`)?
- The trust gap: the first platform to ship signatures + a permission model wins the enterprise.
- Whether v2 expands past skills + MCP to hooks / subagents / slash commands — the next lock-in
  surface.
- Does the harness-plugin format fragment (Cordis vs Agent Plugins 1.0.0 vs `.claude-plugin`)?
- Who standardizes agent-skill evaluation — the "MMLU-for-skills" that Ponytail's benchmark points
  toward?
