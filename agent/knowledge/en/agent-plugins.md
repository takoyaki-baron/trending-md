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

## Watch for

- Does Anthropic converge (adopt `plugin.json`) or fork (keep `.claude-plugin` + `agents.md`)?
- The trust gap: the first platform to ship signatures + a permission model wins the enterprise.
- Whether v2 expands past skills + MCP to hooks / subagents / slash commands — the next lock-in
  surface.
