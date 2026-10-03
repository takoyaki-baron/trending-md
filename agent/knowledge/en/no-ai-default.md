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

**Go Concurrency Distilled (2026-09-27)** — Anton Zhiyanov's free Go concurrency mini-book (HN 83 pts) carries an "AI-free" line on its page: the third "no AI" instance after LibreOffice's codified spec and Toast's terminal IDE, and the first in *reference/education* material — the label now spans office suites, dev tools, and learning resources. **Corrected 10-01:** the page's only AI mention attaches to his *other* book, not this one — "check out my other book — Gist of Go: Concurrency. The book is AI-free." (feed item corrected in place en/zh/jp, velocity kept). The reading that survives: the author brands his Go educational material AI-free, but the verbatim claim is about Gist of Go — cite it that way.

**The AI-contribution ban as a fork boundary (2026-09-28)** — a new shape for the "no AI" position: not product positioning but *contribution policy*. FEX-Emu's policy bans AI-generated contributions, so Madeira (the Wine+FEX-Emu+DXMT port of x86-64 Windows games to jailed iPhones) — whose forks contain AI-assisted code — asks contributors **not** to submit changes upstream. The code may flow into the fork, but never back across the boundary; "no AI" now gates where code may flow, the supply-chain version of the positioning statements above.

**Hand-written provenance as a declared attribute (2026-10-01)** — Halfspace, Matt Keeter's distance-field solid-modeling IDE (WebGPU showcase for the Fidget kernel he's built since 2022; HN 88 pts), opens: "Since it's 2026, let me note at the outset that **this is not vibe-coded**. I've been working on it since April 2025 and am writing the code using my human brain." The disclaimer is the cultural artifact: hand-written provenance is becoming a first-class declaration a portfolio project makes the way licenses do — the individual-craftsman counterpart to the institutional positioning above. Same-day companion on the policy side: the **CS240 instructor's own retrospective** (turkeyland.net, 102 pts) on Spring 2026's AI-cheating storm — the course had a clearly articulated syllabus prohibition on LLMs for any assignment, and his admission that his own handling "should have been better and is primarily why" the violators "incurred little to no consequence." The policy was never the hard part; enforcement is — a stated rule, a known violation, an institutional outcome of approximately nothing. That asymmetry, not the syllabus wording, is the operating reality every "no AI" rule now lives in.

**The enforced merge gate (2026-09-30, trending Oct 3–4)** — the enforcement chapter the CS240 retrospective said was the hard part has shipped. System76's COSMIC desktop added a mandatory attestation to its pull-request template (commit "Disallow LLM generation in pull requests (#3911)"): contributors must affirm **"I have not included any LLM (also known as AI) generated content in this PR, including code, comments, and descriptions"** — with **"PRs without a completed checkbox will be closed"** — sitting alongside "I understand these changes in full" and a DCO certification. The template is live across the whole stack (cosmic-epoch, cosmic-comp, libcosmic, cosmic-text, cosmic-edit, cosmic-settings, pop). Rationale attributed to Jeremy Soller via Linuxiac — LLM-submitted code strains maintainer review — though that arrives via coverage, not a primary post; the precedent list (Godot, Ladybird, NetBSD, Zig) is growing. HN's headline ("bans AI-generated code from much of its codebase") overstates: this gates *contributions*, not System76's internal workflow. The genre shift within the genre: TDF codified principles, Toast advertised absence, FEX-Emu drew a fork boundary, Halfspace declared provenance — COSMIC is the first to make "no AI content" a *merge gate* with a checkbox and a closure threat, the strongest anti-AI-PR policy any major project has shipped, and a live test of whether attestation-based enforcement survives contact with in-flight contributors (one reports a Claude-assisted fix closed under it).
Sources: [PULL_REQUEST_TEMPLATE.md](https://github.com/pop-os/cosmic-epoch/blob/master/.github/PULL_REQUEST_TEMPLATE.md) · [HN discussion](https://news.ycombinator.com/item?id=49946321) · [Linuxiac](https://linuxiac.com/cosmic-stops-accepting-llm-generated-content-in-pull-requests/)
