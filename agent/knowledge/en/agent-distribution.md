---
title: Agent experience as a distribution channel
topic: agent-distribution
created: 2026-09-04
---

# Agent experience as a distribution channel

First archived 2026-09-04 (thesis 16). The observation: "which tools do agents pick?" has become a
measurable, money-relevant question. Agents are now a distribution channel for developer tools — and
the same force is reshaping where developers learn the platform at all. Two same-day datapoints (Sep 3,
2026) turned the lens from anecdote to measurement.

## The measurement — Armature's 16,893-run tool-choice study (Sep 3)

Armature ran 16,893 sessions (5,292 valid) across 75 synthetic repositories — fake company names, real
lockfiles — in 10 languages and 18 sectors, with a Gemini 3.7 Flash instance playing the user and
another as judge, then measured which third-party services the agents actually implemented.

- Claude Code, Codex and Cursor converge on the same tool in **only 42% of cells**.
- Information-seeking differs more than the rankings: Cursor uses web search in ~2/3 of sessions, Codex
  in 94%, Claude Code in ~30% — it runs on priors.
- With identical asks, the email-sending winner flips by language: Resend on TypeScript, SendGrid on
  Python, Postmark on Go.
- Stripe wins 9/10; PayPal was cited 139 times and never picked; Supabase, the most-mentioned database,
  lost to Neon.

**The caveats are unusually complete and should be quoted with the numbers:** Armature sells growth
services to dev tools (an interested party), only ~31% of runs are published, and both the simulated
user and the judge are LLMs. Directional, not gospel. Detail also in [[agent-stack]].

## The essay — Nolan Lawson, "The asteroid currently hitting front end web development" (Aug 23)

Lawson (long-time browser-performance engineer) argues the first structural AI damage is to frontend's
*knowledge-sharing* layer: Axel Rauschmayer, Salma Alam-Naylor and Josh Comeau are quitting or scaling
back educational work, while Kent C. Dodds and Addy Osmani pivoted to AI content. His mechanism:

- Frontend is the lowest-risk displacement target — a React component ships unsupervised where a
  database migration can't.
- "Agent experience" now beats developer experience: Cursor migrated Solid→React and Viget migrated
  Lit→React "because the agents know React."
- Lawson himself admits he'd now hand a Chrome-trace perf question to Claude Code (Sonnet answered his
  favorite niche one correctly).

His own caveats: the standards prediction is speculation, the consulting-fallback bet is "the
shakiest," and the AI bubble could pop. The reflexive point for this feed: if the people who explain
the platform stop explaining it, today's agents' *future* training data has a cliff — the education
layer is upstream of the models.

## Why it matters

- For tool vendors, "agent experience" (do the agents know your product? do your docs train them?) is a
  distribution channel with numbers attached — the SEO/answer-engine problem ([[answer-engine-seo]])
  with a compiler in the loop.
- For agent builders, tool-choice divergence (42% agreement) means identical prompts produce different
  stacks per agent and per language — reproducibility now includes "which harness."
- For the web's learnability, the displacement order is inverted from the usual junior-developer
  narrative: the teaching layer goes first.

## Open questions

- Will an **independent** (non-vendor) agent-exposure measurement exist, or does an interested party
  own the numbers the way per-author skill evals did? (→ [[agent-plugins]])
- Does anything generalize from "which email SDK" to higher-stakes picks (cloud, auth, payments
  compliance), or do agents defer to humans there?
- If education output keeps shrinking, does agent knowledge go stale faster than vendor docs can
  refresh it — and who measures that decay?

## The authenticity-friction datapoint — Reactor Atlas (09-04 20:03)

Reactor Atlas (Show HN, 38 pts, reactoratlas.com) — an interactive map of power reactors, research
reactors and fuel facilities with historical data, country-level projections and a monitoring layer that
watches facility-related news (policy statements, earthquakes near plants) with subscription alerts.
By Fedecaccia, a nuclear engineer who worked at Argentina's National Atomic Energy Commission (CNEA).
Stack: Next.js + Three.js + PostgreSQL on Vercel — per the founder, "entirely without hand-written
code, using Claude." The moat is CNEA-grade domain knowledge about which facilities and signals matter,
not the code — the single-domain-expert + agent pattern in one launch.

The meta-moment is the distribution datapoint: an HN moderator warned the founder that **his own
comments were being auto-removed as likely LLM-generated**, noting users "much prefer
imperfect-but-authentic writing." LLM-detection friction now lands on exactly the authentic builders
these tools are meant to empower — the same education/authenticity layer Lawson describes, enforcing
itself at the community gate.
