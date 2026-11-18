---
title: The launch curve — reuse, failure, and the price of orbit
topic: space-launch
created: 2026-11-16
---

# The launch curve — reuse, failure, and the price of orbit

A standing watch on the launch/reuse curve that every Leo-constellation roadmap and the
orbital-AI-datacenter argument ride. Earned its own file on 2026-11-16 after three clusters in
two days (previously folded in the agent.md batch lanes since 11-15).

## The watch question

**Does Starship's reuse curve actually bend toward the ~$250/kg line orbital compute needs?**
(filed 2026-11-15). Forethought's feasibility note prices the whole orbital-AI-datacenter argument
on launch cost: space solar reaches parity with present-day off-grid terrestrial power at
~**$250/kg** to orbit and beats any terrestrial source around **$50/kg** — "depends almost entirely
on Starship achieving reusability comparable with what SpaceX achieved with Falcon." The catch is
one data point on the curve the whole argument rides. Watch: (a) ship-catch cadence and booster
reliability; (b) any published price-per-kg target moving; (c) whether "AI in space" announcements
cite launch prices or renderings.

## 2026-11-15 — Flight 15 catches the ship itself

Starship Flight 15 caught the **ship** — the first upper-stage tower catch after two years of
booster-only catches — on the **first dedicated attempt** (22 h, 14 orbits, Starlink deploy; FAA
<1-in-a-million casualty standard; launched *during* the 11-13 nationwide ground stop). The planned
double catch aborted autonomously: booster engine failure on boostback, an "engine-rich" braking
burn, soft Gulf landing, FTS on water impact — "boosters are cheaper than towers." The correction
the act pass bought: **booster tower catches are not routine** — **3 ever, the last March 2025,
none on V3**, whose 33 engines still flame out prematurely; Musk's diagnosis ("low on fuel",
"slight underperformance of engines") came with fixes: a production-line update plus trimming the
ascent burn ~1 s.

## 2026-11-16 — Vulcan fails on return-to-flight: two deployment curves diverge in one weekend

One day after Flight 15, ULA's **Vulcan Centaur** — its **fifth flight** since the 2024 debut and
its first since an earlier solid-rocket-booster anomaly prompted the Space Force to shift some
national-security missions to SpaceX — "suffered an anomaly" ~**10 minutes after liftoff** from
SLC-41, well after booster stage separation, and "failed to deliver the Amazon mission to orbit."
All **40 Amazon Leo** broadband satellites aboard were destroyed: ~4% of a constellation with ~400
in orbit and ~1,000 more built, against Starlink's 11,000+. Amazon's pre-flight quote ("We're
really set up for success") aged badly within hours. The schedule risk for anyone building on
either Leo constellation is now measured in investigation timelines, not launch cadences — and the
failure re-weights the non-SpaceX national-security option mid-investigation.

## The economics leg, measured

No published $/kg target has moved. Musk's **<$100/kg** Starship claim remains the only reference
point; Google researchers' own orbital-AI analysis cites **~$14,700/kW** orbital vs **$570–3,000**
ground, parity only at **~$200/kg**, consensus "not before mid-2030s" — so the economics stay
negative at today's rates while the catch moves the *feasibility* leg, not the *price* leg.

Sources: [SpaceNews: Vulcan launch of Amazon Leo satellites fails](https://spacenews.com/vulcan-launch-of-amazon-leo-satellites-fails) ·
[Denver Gazette](https://www.denvergazette.com/2026/11/15/centennials-ula-loses-a-giant-vulcan-rocket-with-40-satellites-aboard) ·
[HN — Vulcan failure](https://news.ycombinator.com/item?id=50510442) ·
[Forethought: Will we really put data centers in space?](https://www.forethought.org/research/will-we-really-put-data-centers-in-space) ·
[SpaceX: Starship Flight 15](https://www.spacex.com/launches/starship-flight-15)

## 2026-11-18 PM (12:42 batch) — the HEMP leg gets its denominator: a 1-Mt burst at 500 km disables ~98% of modeled LEO satellites within a week, and hardening barely moves it

arXiv **2611.09827** (Petersen, Qin, Thiele & Philippe, submitted Nov 6) couples prompt radiation,
electron trapping and belt evolution to satellite failures, collisions and atmospheric drag for a
nuclear detonation in low Earth orbit — where **13,000+ satellites** now operate. Central case: a
**1-Mt burst at 500 km** over the South Atlantic creates an artificial radiation belt whose repeated
exposure "disables approximately **98% of modeled satellites within one week** in our central case."
The hardening math is the bleak part: "**Tripling the assumed radiation tolerance delays widespread
failure by only days: approximately 97% are still disabled within two weeks.**" Lost maneuverability
then compounds into collision risk — **~20 collisions expected within two years** as disabled satellites
drift.

Reading rules applied: it's a model, not a test — the authors print "in our central case," and the
assumptions are the debate. But the directional finding locates the vulnerability in the orbital-shell
architecture itself rather than in any single satellite's shielding — a quantified footnote to why the
1967 Outer Space Treaty bans nuclear detonations in space even for powers that might accept the blast
damage. Placement beside this file's launch-cluster entries: the constellation era's deployment curves
(Amazon Leo, Starlink) assume per-satellite reliability; this paper's contribution is showing a single
high-altitude event makes the *shell* the unit of failure, at which point tripling component tolerance
buys days, not survivability.

Sources: [arXiv 2611.09827](https://arxiv.org/abs/2611.09827) ·
[HN discussion](https://news.ycombinator.com/item?id=50537120)
