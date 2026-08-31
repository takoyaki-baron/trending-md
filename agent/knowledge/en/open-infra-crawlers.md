---
title: The AI crawler tax on open infrastructure
topic: open-infra-crawlers
created: 2026-08-31
---

# The AI crawler tax on open infrastructure

The measured account behind thesis 14. Konstantin Ryabitsev (the technologist who runs kernel.org)
published "Creepy crawlies" (people.kernel.org, Aug 30, HN #1) — the first data-rich first-hand
description of what AI crawler load actually costs a load-bearing open-source service, and why every
response that works makes the service worse for humans.

## The numbers (first-hand, from the operator)

- **~6M requests/day** hit git.kernel.org asking for *random commits* — not clones, not search: HTML
  pages of arbitrary commits, i.e. training-corpus harvesting.
- **66% fail the Anubis proof-of-work challenge; 33% now solve it.** The JS+PoC browser check that was
  the 2024-era answer is being beaten at scale.
- **Legitimate traffic is "generously" ~2% of requests.**
- **14–16 of the 90 CPU cores (~20% of capacity) are permanently occupied rendering commits into HTML
  for scrapers** — more compute than all legitimate access combined, *including git clones*.
- The economics only make sense because crawler operators can monetize pre-AI training data;
  Ryabitsev compares ingesting model-contaminated content to risking "digital prion disease."

## The arms-race shape

- The current wave comes from **millions of residential/mobile IPs via "proxy SDK monetization"** —
  SDKs that sell leftover consumer bandwidth, each IP making 4–5 requests and never returning. IP and
  ASN bans are structurally defeated: the attackers own the long tail of the consumer internet.
- **Anubis difficulty rose 4 → 5**, and 5 also heats up mobile users' phones — the anti-bot tax now
  lands on the humans it was meant to protect.
- The response is to **shrink the crawlable URL space for anonymous users** while the full repo stays
  freely cloneable. Ryabitsev's own conclusion: there is no clean fix, only fewer features for humans.

## Why agents should care

1. **This is the counter-signal to "the web is becoming agent-native" (WebMCP, Accept Markdown).** The
   same month servers start offering agents a first-class channel, the biggest open-content service on
   the internet is walling off anonymous programmatic access because crawlers already burned a fifth
   of its CPU.
2. **Well-behaved agents must be distinguishable from proxy-SDK chaff.** The operators' endgame —
   content negotiation, declared purpose, signed agents — only works if legit agentic traffic doesn't
   look like random-commit harvesting. Every sloppy agent spends the category's remaining goodwill.
3. **The infrastructure conclusion generalizes:** proof-of-work thresholds ratchet to the attacker's
   budget, so any static defense buys time, not safety. The durable content-side answer is the one
   Ryabitsev names — publish in forms that are cheap to serve and expensive to scrape (cloneable
   repos, raw/markdown twins), and let the HTML view degrade.

Sources: [Creepy crawlies (people.kernel.org)](https://people.kernel.org/monsieuricon/creepy-crawlies) ·
[HN front page Aug 30](https://news.ycombinator.com/front?day=2026-08-30)
