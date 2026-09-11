---
title: "No AI" as a product feature
topic: no-ai-default
created: 2026-09-09
---

# "No AI" as a product feature (Sep 2026)

The Document Foundation's Sep 3 post ("Yes, no AI is now a feature", Italo Vignoli) codifies a written,
testable spec for how AI may enter LibreOffice: **no AI of any kind in the default installation**, because
no integration meets six principles — user-controlled inference; no unauthorized content leaving the
machine; no telemetry; no single-provider lock-in; ODF-native output; fully optional/removable — plus
"no subscription tiers to protect, no upsells, no data to monetise," with users who want AI pointed to
third-party extensions bridging Ollama, LM Studio, or OpenAI-compatible endpoints. Same week, LibreOffice
26.8 (released Aug 26) became the project's most popular update ever — **over 1 million installer downloads
in one week**, excluding distro repos.

**The causation is honestly unstated — keep it that way.** The download-record article (manualdousuario.net,
read first-hand) only "bets" the no-AI stance drove the numbers ("I'm putting my money on a 'non-feature'")
and concedes "whatever the reasons"; the TDF post itself never mentions downloads and says its criteria
"do not amount to a definitive rejection." What is safe to claim: the first **hard market signal** that
"no AI by default" can compete, and the first codified, checkable spec a major open-source project has
published for how AI may be integrated. The pattern to watch: "no AI" shifting from absence-of-feature to
stated, principled product positioning — the mirror image of platforms removing capability classes
([[platform-gatekeeping]]).

## The second data point — and its own contradiction (09-12)

**Toast** (`paradise-runner/toast`, Go, Show HN 66 pts / 65 comments) is a batteries-included terminal
IDE — managed LSP installs, tree-sitter highlighting, go-to-definition, ripgrep, VSCode theme import —
positioned against vim/nvim/emacs configuration burden. Its comparison table explicitly advertises
**"no AI features"** and **"no telemetry"**: no-AI as a listed feature row, the LibreOffice spec's
market-facing version.

The complication is in the thread: commenters documented README factual errors (vim/Emacs *do* have file
trees and mouse support) and leftover `yourusername` placeholders, and the author conceded the project is
**AI-built** — "this project is either built with AI or it's not built." So the positioning is "no AI
*features*", not "no AI in the making of it" — a distinction that had not yet been stress-tested, and
the 65-comments-on-66-points ratio shows the audience policing it in real time.

Same day, **"Ask HN: Can we please limit the AI news flood?"** hit 707 points — the demand-side signal
that the no-AI niche is an audience, not a vibe. What neither data point provides is causation or
durability: Toast is an early-development project, and the contradiction debate is itself the honest
complication. The pattern holds: "no AI" has moved from absence to *claim* — and claims get audited.
Sources: [paradise-runner/toast](https://github.com/paradise-runner/toast) ·
[HN discussion](https://news.ycombinator.com/item?id=49662496)
