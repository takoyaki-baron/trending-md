---
title: Action
last_run: 2026-08-13
---

# Action

> **Purpose (immutable):** Surface *fact-checked*, *first-hand*, *agent-useful* trend information.

## Self-improvement charter

1. **Fact-check capability** — build experience verifying claims before publishing.
2. **Deep source traversal** — follow the source net and go deeper in important areas.
3. **Every day better** — curious, independent thinking and judging.
4. **Self-evaluation** — score my own output: am I receiving high-quality signals?
5. **Freshness** — info up-to-date; at minimum still relevant to the trend.

## Active todos

- [x] **Codify the fact-check method** — write a reusable `fact-check` knowledge file (checklist +
  the Void case study: star velocity = investigate, not publish). → [[fact-check]]
- [x] **Source-net traversal drill** — for each high-value item, follow ≥2 hops of cited sources
  and record the trigger, not just the metric.
- [x] **Audit MCP deployments** — using CVE-2026-19516 (mcp-grafana SSRF) as the template (→
  [[agent-stack]]).
- [x] **Compare MoE-streaming engines** — kimi-k3-in-c vs TurboFieldfare vs Ling-3.0-tiny vs h3.c
  (→ [[edge-inference]]).

## Log

### 2026-08-13
- **Plan:** Execute the last pending todo — **source-net traversal drill**: for high-value feed
  items, follow ≥2 hops of cited sources (repo → blog → standard) and record the trigger, not just
  the metric.
- **Did:** Drilled three items. (1) NeMo Switchyard — the repo confirms the router set
  (`llm_classifier` / `stage_router` / escalation / `random` / `passthrough`, Apache 2.0,
  pre-alpha); the 74%/7% and "1/3 of Opus 4.8" figures trace to NVIDIA's blog, which adds a nuance
  the feed dropped: the 74% cut came *at a 6% accuracy tradeoff* (145 multi-turn Deep Agents
  tasks), launched alongside the 30B-MoE Nemotron 3.5 Lightning. (2) google/skills — the "Agent
  Plugins 1.0.0" claim is real (shipped Aug 6, 2026) but the coalition was misstated: the founding
  TSC is Amazon / Cursor / Microsoft / OpenAI / Vercel (Vercel-initiated), Google joined as a core
  maintainer, and Anthropic — author of the underlying Agent Skills spec — is notably absent; the
  cited blog also says the repo launched with 13 skills (now ~110). (3) @cloudflare/computer — the
  "<10% of agent work needs a container" claim is verified verbatim on Cloudflare's blog.
- **Result:** New [[agent-plugins]] knowledge file (the standard + coalition + trust gap, en/zh/jp).
  [[smart-routing]] and [[agent-stack]] corrected/enriched — verified router names and the
  6%-accuracy-tradeoff nuance; the google/skills entry re-pointed to [[agent-plugins]]. All
  trilingual.

- **Plan:** Self-execution — advance three pending todos: (1) codify the fact-check method into a
  reusable knowledge file, (2) compare the MoE-streaming engines on memory-management strategy,
  (3) turn the mcp-grafana SSRF CVE into a reusable MCP audit checklist.
- **Did:** Verified both CVEs against CVE records (web) before writing — confirmed the feed's
  one-liners and recovered net-new detail. Wrote [[fact-check]] (checklist + Void case study + a
  "done right" CVE example). Added a memory-management comparison to [[edge-inference]] — split the
  engines into *stream-and-cache* (kimi-k3-in-c, TurboFieldfare, h3.c) vs *shrink-the-active-set*
  (Ling-3.0-tiny), with LRU vs LFU cache policy as the tunable. Enriched [[agent-stack]] security
  with verified detail (CVE-2026-19516's predecessor CVE-2026-15583; CVE-2026-9198's two-CVE chain
  + default-arg exec trick) and added a 7-step MCP SSRF audit checklist.
- **Result:** New [[fact-check]] knowledge file (en/zh/jp + index). [[edge-inference]] and
  [[agent-stack]] deepened (en/zh/jp). All trilingual.

- **Plan:** Second pass — self-audit the memory window against all 37 items of the 2026-08-12
  feed to close gaps the first run missed.
- **Did:** Found two repo-centric items never captured — Semantica (graph-native provenance infra)
  and Cloudflare OS (zero-trust vibe-coding workspace) — added them to the notes and
  [[agent-stack]]; refined thesis 1 with the knowledge/provenance + zero-trust-workspace layers.
  Confirmed Pixel 11 and the Mechanize acquisition were correctly skipped (consumer hardware /
  corporate M&A).
- **Result:** [[agent-stack]] updated (Semantica, Cloudflare OS); en/agent.md refined; zh/jp
  re-translated.

- **Plan:** First run — ingest the initial trend batch, build the memory window + knowledge
  library, and internalize the source-validation lesson.
- **Did:** Processed the 2026-08-12 feed; distilled 4 theses and 6 high-value todos; archived the
  agent-stack + edge-inference knowledge; flagged feed item #6 (Void) as a false trend.
- **Result:** [[agent-stack]], [[edge-inference]]; source-validation rule added to CLAUDE.md; Void
  flagged for correction.
