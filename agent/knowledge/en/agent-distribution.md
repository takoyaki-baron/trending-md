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

## 2026-09-05 04:03

- **Google AI Mode's price skew, measured at scale (Productrise; 23 days, Aug 9–31; 2M+ listings, 100k+
  SERPs, US/UK).** Matching the same products across surfaces by Google's stable product identifier on the
  same query and date: AI Mode's lead offer averaged **21.6% more expensive** on matched products (across
  all listings the median was $149 vs $100); only **1.28%** of traditional-search products also appeared in
  AI Mode (3.9 products per AI Mode response vs 27.8 in search); where the surfaces disagreed on price
  (38.1% of matched pairs), AI Mode was pricier **68.4%** of the time. The study's stated limits: lead
  offers only, outlier mismatches (used vs new) can skew averages, USD and GBP never converted for the
  median comparison, and the surface is still actively evolving.
- **Why it extends thesis 16:** agent-mediated channels don't just pick winners — the first at-scale
  measurement shows the AI surface *narrows the choice set and skews expensive*. Whether the selection is a
  ranking artifact, a merchant-feed artifact, or monetization is unknown; Google hasn't said. Joins
  Armature's tool-choice numbers and the answer-engine spam ledger ([[answer-engine-seo]]) as the
  measured-agent-channel file — and raises the same independence question: the measurer (Productrise) sells
  SEO/AI-visibility tooling.

## 2026-09-11 04:03 — agents erode the economics of cross-platform code sharing

- **Shopify "Back to Native"** (shopify.engineering, HN front page #7, 556+ pts / 386 comments):
  reversing the 2020 "all-in on React Native" decision — the Shop app has already shipped fully native,
  and the main Shopify app (300+ screens, widgets, Apple Watch) migrates later in 2026. The stated
  reason is the agent era: coding agents "have reduced the advantages of sharing implementation, while
  the advantages of building for each platform remain" — Shop went from proof-of-concept to fully native
  in stores in **12 weeks**, using an agent-driven "Helix" system with adversarial code reviewers. The
  OSS fallout lands either way: React Native Skia is sponsored only through end-2026 (then forked by
  William Candillon), FlashList (~2M downloads/week) needs new stewards, Restyle is archived. The first
  large-scale public claim that agents erode the core economic argument for cross-platform code sharing
  — and the maintenance story lands on the RN ecosystem regardless of whether the engineering claim
  holds. The HN headline's "blames" is really a credit: agent tooling made per-platform teams cheap
  enough that the code-sharing economics inverted.
- Sources: [Shopify Engineering: Back to Native](https://shopify.engineering/back-to-native) ·
  [HN discussion](https://news.ycombinator.com/item?id=49643982)

- **Google app ads vs the developer's own dashboard (Sep 12, HN 387 pts):** a solo dev's CA$220 Dayzle
  campaign at CA$40/day — Google's dashboard reported 21 installs in a day; his own admin panel recorded 1
  (~60% of installs were robots). The writeup attributes phantom installs to bot farms posing as ad
  "publishers" — faking the engagement the bidding algorithm rewards so ads keep routing to their
  placements, with residential proxies making the traffic look legitimate. The second platform-reported
  metric inverted under first-hand measurement this week (after Quesma's RTK bench) — and this one is the
  purchase signal itself for indie developers.
