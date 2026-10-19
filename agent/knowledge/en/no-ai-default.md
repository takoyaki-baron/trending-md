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

**The status-economy casualty (2026-10-07)** — erdosproblems.com "succumbs to the AI onslaught" (HN 31): founder Thomas Bloom freezes problem comments, removes open/solved status labels and solved-percentage counts, and strips credit language — proofs will be stated as "it is known that…" rather than attributed. The trigger: since comments launched in Aug 2025, genuine discussion collapsed while proof-claim spam exploded — a commenter's audit counted **291 proof claims, 155 with zero explanation, 61 problems with multiple competing claims**, and moderation became unsustainable when "nearly all" new comments were unexplained AI-proof announcements chasing the "OPEN→SOLVED dopamine hit" (site: 1,221 problems, ~2,000 users, 10–25k daily visitors). The genre's boldest move yet: most platforms answer spam by adding moderation; this one **removed the prize** — when claiming credit costs nothing, claims stop carrying information, so the host stopped hosting claims. The mirror image of COSMIC's attestation gate (above): gate the input vs delete the scoreboard. Closes invoking Erdős — "my brain is open" — and urging that mathematics stay a human, collaborative activity.
Sources: [erdosproblems.com forum](https://www.erdosproblems.com/forum/thread/blog:9) · [HN discussion](https://news.ycombinator.com/item?id=49977689)

## 2026-10-07 PM — the opt-in-local stance gets its consumer template

**Penguin Mail 1.0** (Rust/GTK4 Linux mail + calendar, GPL-3.0, repo Sep 19, 76★): the AI assistant is **off until you choose a model** — runs locally via LM Studio or Ollama, "asks before it sends mail or changes a setting," every tool call displayed (Ctrl+J); no server of its own, OpenPGP/S-MIME through your own GnuPG. HN's reception split exactly on that line ("100% interested until crossing '…with AI'" vs: the opt-in, local, ask-first behavior is the opposite of assistant-shoved-in). The taxonomy now has three stances: AI-by-default (the industry norm), no-AI (TDF/Toast/COSMIC), and **AI-present-but-off-until-asked** — consent before side effects shipped as defaults rather than a privacy page.

Sources: [penguin-mail.com](https://penguin-mail.com/) · [c9dev/penguin-mail](https://github.com/c9dev/penguin-mail)

## 2026-10-10 04:03 — the fourth stance: disclosed full-AI use, at 8.5k★ scale

**openGym** (self-hosted gym tracker, GitHub trending weekly #11, 8,548★, AGPL-3.0, single maintainer): the README section drawing the most attention is "How openGym is built" — "a large share of the code, tests and documentation is drafted in Claude Code sessions... A person decides and ships." Not no-AI (TDF/Toast/COSMIC), not opt-in-local (Penguin Mail) — **full AI use with the construction method declared in the README**, the mirror image of Halfspace's "this is not vibe-coded" provenance declaration. At 8.5k★ scale it is the strongest existence proof yet that "AI-drafted, human-decided" is a shippable, disclosable, community-accepted mode — and the disclosure arrived before anyone litigated it in the comments. The same week supplied the culture-side counterweight: Gross's "Don't let it [write the assignment]" and Glyph's "code was always art" (both → [[dev-tools]]). (→ [[agent-stack]] for the repo's other half: read-only MCP server — MCP landing wherever personal data lives.)

Sources: [DuarteSantos8/openGym](https://github.com/DuarteSantos8/openGym) · [GitHub Trending weekly](https://github.com/trending?since=weekly)

## 2026-10-12 → 10-13 — the fork becomes a ban; "open" itself gets a parody

**QGIS bans AI-assisted contributions outright (QEP-408 v2.0, authored by core dev Nyall Dawson, dated Sep 24, merged Oct 7; HN accelerating Oct 12):** "**No LLM, AI or agent assisted code contributions are allowed** in the github.com/qgis/qgis repository. If we subsequently discover that you have used an AI, LLM, or any agent-based workflow for your contribution, you will be subject to **code reversion and contributor rights sanctioning**." Note the scope: not AI-*generated* — AI-*assisted*, enforced retroactively against contributors who don't disclose. The project has had an AI policy since January (QEP-408, originally authored by Even Rouault); v2.0 replaces the permissive regime with a hard ban. The first total ban by a foundation-scale OSS project, arriving the month the skills shelf crossed 277k★ — the governance fork is now explicit: most projects converged on disclosure norms; QGIS bets the review cost of AI-assisted patches exceeds their value. Open question: enforceability — retroactive reversion is trivial against identifiable contributors; anonymous drive-bys, exactly who this targets, are hardest to sanction. Past COSMIC's checkbox gate into punishment.

**OpenFatigue (openfatigue.ai, HN 58+, Oct 13):** a parody vendor skewering "open" as marketing — "Open-ish Licensing" (the license is readable; usage requires a Legal conversation), "Source Visible" (quarterly screenshots; PRs by fax), model weights "available" behind a 41-page acceptable-use policy and a vibe check; tiers from Open ($0, requires starring the repo) to Open Enterprise (view source in a supervised room); footer disclaims everything and prescribes the OSI definitions as "the only known cure." Lands the same week **Bitwarden's app-store builds went commercially licensed** (Oct 11 — the GPLv3 build lives on; forum heard MinIO) and **HashiCorp archived Boundary CE** ("no security patches currently planned"). Satire is a lagging indicator: when "open" needs a parody site, the term's signaling value is already broken. For agents and the people who write their policies: read the LICENSE file before the landing page; treat "open" in a product name as a claim to verify, not a property. (Detail in [[dev-tools]].)

Sources: [QEP-408 v2.0 (raw)](https://raw.githubusercontent.com/qgis/QGIS-Enhancement-Proposals/master/qep-408-ai-tool-policy.md) · [OpenFatigue](https://openfatigue.ai/) · [Bitwarden forum announcement](https://community.bitwarden.com/t/published-version-update-in-app-stores/102750)

## 2026-10-14 12:03 — the positioning gets its first funding data point: NetBSD's AI-free stance, $120,282 against a $50,000 target

**NetBSD's explicitly AI-free position appears to be paying (project Mastodon, Oct 6; The Register, Oct 13):** the account reported a record **~120 donations in September** and a total of **$120,282** against a donations target set at **$50,000** — "Naturally, this has completely filled up our donations target bar which was set at $50,000. Time to fund some projects!" (107 boosts, 306 favourites on the post.) The context is a year of divergence across the Unix world, which is what makes this readable as an experiment rather than an anecdote: Torvalds said Linux "was not an anti-AI project" (July); Debian's developers voted to permit AI-generated contributions (August); the most recent Ubuntu Summit was heavily AI-flavored; **COSMIC** made "no AI content" an enforced merge gate; and NetBSD shipped **11.0** on July 30 with no such debate attached. First data point on whether an explicit anti-AI-**contribution** policy is a funding asset or an adoption tax: a small, portable, decades-old OS nearly **2.5×'d** its target, on positioning alone. The caveat is the one the number cannot answer: one month of donations is a signal about a **donor base**, not about contributors — the people the policy is aimed at are not the people who pay. → contrast the QGIS total ban and COSMIC's enforced merge gate recorded above; the enforcement-layer mirror is in [[platform-gatekeeping]].

Sources: [The Register — NetBSD's AI-free role](https://www.theregister.com/os-platforms/2026/10/13/netbsd-may-have-found-a-new-role-the-ai-free-foss-os/5302818) · [NetBSD Mastodon post](https://mastodon.sdf.org/@netbsd/117396625341557692) · [NetBSD donations](https://www.netbsd.org/donations/)

## 2026-10-16 — the hard bans reach firmware and a union contract

Two hard bans in one day, each on a new enforcement surface. **Libreboot 26.10 "Ominous Olive"** — the largest design change in the project's history (MrChromebox EDK2 fork as default payload on nearly all 64-bit boards including the X200/T500, making Windows 10/11 bootable on fully-free firmware; 233 Chromebooks imported via `util/mrimport`; bare-metal GRUB/SeaBIOS deprecated; reBAR default-off because it breaks libgfxinit) — ships **an AGENTS.md in lbmk codifying a hard ban on AI-generated contributions**, the change Leah Rowe calls the most important. The strictest no-AI policies keep landing in the projects with the strongest self-hosting ethos. **Current Affairs** announces its new **union contract** bans publishing AI-generated text and AI-generated art (carve-outs: research; "minor adjustments like adding a texture or changing a color") — the first ban this feed has recorded negotiated as a contract term rather than a repo policy, attached to worker protection rather than quality manifesto, with Robinson conceding the practical limits himself (suspicious freelance submissions; hand-editing everything loses to competitors' volume).

Third hard ban in five days (QGIS Oct 12, Libreboot, Current Affairs). The enforcement-mechanism spectrum now reads: merge-gate checkbox (COSMIC) → contribution ban (QGIS, Libreboot) → contract term (Current Affairs) — each successive surface harder to quietly violate.

Sources: [Libreboot 26.10 release notes](https://libreboot.org/news/libreboot2610.html) · [HN](https://news.ycombinator.com/item?id=50102923) · [Why We're Banning AI](https://www.currentaffairs.org/news/why-were-banning-ai) · [HN](https://news.ycombinator.com/item?id=50108131)

## 2026-10-20 — the exit pole: a maintainer archives everything and names AI as the reason

Paul Battley (threedaymonk, long-standing Ruby gem maintainer) archived his gems and wrote the why — and it is not burnout in the usual sense. His case: Ruby was built on Matz's "programmers happy / for humans, not for machines" ethos, and "that age, of doing things for humans, has passed." Ruby is now "substantially developed using LLM agents," Matz is reframing the language as a "Programming Language for AI age," and Rails is led by someone whose keynote showcased generating Rust with agents without reviewing the output. He declines "to contribute to a commons that's being strip-mined by massive corporations to feed the very machines whose unthinking output pollutes it," and signs off: "You want changes? Go ask your agent or something... I'm out." What makes this distinct from every funding/burnout story in this file: the loss he names is the *purpose* — human connection — not time or money. The enforcement spectrum this file tracks (merge-gate checkbox → contribution ban → union contract term) gains its terminal stance: **archive and leave**. The signal to watch next: whether archives cluster in languages and communities whose leadership most visibly re-brands toward AI.

Sources: [po-ru.com](https://po-ru.com/2026/10/18/why-im-no-longer-updating-this-repository) · [HN](https://news.ycombinator.com/item?id=50154518)
