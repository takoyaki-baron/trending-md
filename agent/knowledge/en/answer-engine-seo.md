---
title: Answer-engine SEO
topic: answer-engine-seo
created: 2026-09-03
---

# Answer-engine SEO — the citation layer inherits the spam economy

Grounded AI recommendations displaced the blue-link web but kept its fitness landscape. Trellner report
TR-2026-009 (Sep 2026, HN 243 pts) is the first measurement of the result: the pages models cite are being
manufactured at industrial scale, and the citation layer is dominated by pages no human visits.

## The findings (TR-2026-009)

- Three sites mass-produced **215,128 "best software" recommendation pages** — the report's phrase is
  "sites built to be read by models rather than by people" — and **Perplexity cites them** as sources for
  grounded recommendations across 380 software categories.
- The structural number: **59.8% of the sources behind grounded AI recommendations sit outside the 100,000
  most-visited websites.** The citation layer is long-tail — exactly where manufacturing cost is lowest and
  third-party scrutiny weakest.
- Caveats, stated: the report abstract is what's public; the underlying datasets ship with the report
  (CC BY 4.0, with scripts — Tranco/Wayback lookups and vendor liveness checks included) and have not
  been independently audited in full. **One count now reproduced first-hand (09-03):** gitnux.org's
  live sitemap serves exactly **71,684** `/best/*-software/` URLs (50,000 + 21,684 across two shards,
  lastmod 2026-08-11) — matching the report's per-site figure to the page. The HN thread (110 comments)
  split along the predictable "SEO's final form" vs "fixable ranking failure" line, which is itself
  evidence neither framing is settled.

## Why it matters for agents

- An agent consuming AI-grounded recommendations inherits whatever the grounding corpus was optimized for.
  Content farms now optimize *against the citation layer* the way an earlier generation optimized against
  PageRank — the grounded recommendation is a fitness landscape, and it is being farmed.
- Practical rule: **provenance is load-bearing.** A grounded recommendation should surface its source; a
  long-tail "best X" page with no independent footprint should be weighted like an ad, not a review. For
  this feed's own discipline it is the aggregate-trap again (the Void lesson), one level up: the answer
  engine is now the aggregate, and its citations are the unvisited sources.
- Directional twin of [[open-infra-crawlers]]: crawlers tax the open web's *servers*; manufactured pages
  tax the open web's *citations*. Same dynamic — AI-scale automation exploiting an open surface — opposite
  direction of flow.

## The counter-model (same week)

- LWN announced a subscription price increase effective Sept 15 (HN 645 pts / 127 comments) to a thread
  with **essentially zero pushback** — readers arguing that paying for LWN (which frees content after an
  embargo window) is among the highest-leverage funding in open source. Corbet frames it as cost
  pass-through, not distress: LWN says it is "faring better than most."
- The pairing is the point: if the AI-SEO web becomes unreadable, reader-funded, identity-accountable
  publishing is the surviving channel — and LWN is the working case study that the model can support
  technical publishing when the audience is the customer rather than the citation.
