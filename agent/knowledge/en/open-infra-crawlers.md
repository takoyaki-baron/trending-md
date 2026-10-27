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

## Anubis ships WebAssembly proof-of-work after a year (09-07)

- "It took a year to ship WebAssembly in Anubis" (Techaro, Sep 6): the WASM PoW itself shipped in
  **v1.28.0-pre1 "Wuk Lamat" (Aug 30)** — Rust compiled to WebAssembly runs the hash check with SIMD where
  browsers support it, falling back to pure JavaScript when WASM is disabled (slower, because those clients
  usually disable the JIT; the progress bar doesn't update during wasm2js checks — a known issue). Difficulty
  semantics change: WASM counts leading *bits*, so sha256 difficulty 16 ≈ the old "fast" difficulty 4. New
  challenge methods are disabled by default pending testing. Also operator-relevant: v1.27.0 (Aug 8) derives
  cookie names from cookie settings — a breaking change that fixed infinite challenge loops.
- **The arms race moved from CSS tricks to a compile-to-WASM performance problem**, and the JS fallback is the
  accessibility price: readers on locked-down browsers pay a slower challenge — the same "fewer features for
  humans" endgame Ryabitsev named. Fitting empirical footnote: this feed's own fetch of the announcement was
  served Anubis's "Access Denied" challenge page. The tool works.
  Sources: [Techaro blog](https://anubis.techaro.lol/blog/2026/anubis-wasm/) ·
  [TecharoHQ/anubis releases](https://github.com/TecharoHQ/anubis/releases)

## 2026-09-10 — the attack acquires a business model: your cloud bill

- **Read the Docs' ten-day DDoS post-mortem** (blog Sep 8 on a June 2026 attack; HN 98+ pts). Peak
  >5.5M req/min (~100× normal, 10× larger than any prior incident) from millions of IPs across hundreds
  of ASNs; HTTP/TLS fingerprints randomized to beat JA3/JA4; targeting was **cache-miss-only** (unique
  404s, uncached 302s) with a "yo-yo pattern" to maximize auto-scaling costs — the goal was the
  invoice, not downtime. What held: caching 404s/redirects at the edge, bot-score + per-IP rate limits,
  a penalty-box rule system managed via Terraform. What failed: two defenses outright
  (protocol-inconsistency checks, JA4); and they declined Cloudflare's Under Attack Mode ("would break
  every API integration"). Their own closing: "an extended reprieve," with residual attack traffic
  continuing at publication. Same family as the kernel.org AI-crawler tax, different actor and motive —
  cost-inflation extortion against a public-good docs host. The template lesson for anyone running
  public docs infrastructure: IP blocking is "obsolete for distributed attacks."
- Sources: [Read the Docs blog](https://about.readthedocs.com/blog/2026/09/2026-ddos-attack/) ·
  [HN discussion](https://news.ycombinator.com/item?id=49628614)

- **Google rewrites organic result links through `google.com/goto` (autom.dev, Sep 12):** since late
  August, logged-out and private-browsing sessions included, SERP links carry a Google-specific,
  offline-undecodable `url` parameter — autom.dev reads it as "an opaque reference to Google's index
  record for that page." Recovery requires requesting the /goto URL and reading the Location header
  without following it ("You read `Location`; you do not follow through to the page"). Every scraped
  result now costs a fresh request to Google — a latency tax and a rate-limit chokepoint for any agent or
  pipeline treating the SERP as an API; ClearURLs-style stripping can't work because the target exists
  only server-side.

## 2026-09-16 04:03 — the Archive joins the rate-limit camp

- **The Wayback Machine starts rate-limiting (Mark Graham, Internet Archive blog, Sep 15; HN 194+ pts):**
  "waves of high-volume automated traffic" forced new traffic protections: blocked requests get HTTP
  429 with a rewritten explanation page, fixes ongoing. Crawlers, link checkers, and archive.org API
  users are hitting the blocks. Notably, the post does **not** say "DDoS" or "breach" — it's
  abusive-bot mitigation, and the Archive explicitly admits "the protections sometimes catch real
  people by mistake," asking wrongly blocked users to email info@archive.org. No timeline for
  resolution. The agentic-web feedback loop in miniature: more agents crawling → more bot traffic →
  blunt defenses that snare humans. Practical rule for this feed and any agent tooling: if you cite
  Wayback links, expect intermittent 429s and build retries.
- Sources: [Internet Archive blog](https://blog.archive.org/2026/09/15/an-update-on-wayback-machine-access/) ·
  [HN discussion](https://news.ycombinator.com/item?id=49716176)

## 2026-09-16 12:03 — the training opt-out gains network enforcement — with a private referee

- **Cloudflare's "Disallow AI Training" + the "Accountable" crawler label:** a new setting publishes a `Disallow` directive for mixed-use search+training crawlers and enforces it at Cloudflare's network layer — "we publish the preference, identify who is crawling, classify why they are crawling, and block the ones that ignore it — then report what each operator actually does on Radar." Apple, Google, and Microsoft are named as meeting "Accountable": a training opt-out, a summary opt-out, URL-level visibility into what was used for training, and assurance that opting out of training won't affect search ranking. Cloudflare's data: under 1% of its sites block search bots while 17% block training in some form; per-summary content controls promised "by early next year."
- **The structural caveats:** moving the training opt-out from unenforceable robots.txt to network enforcement is a real change for publishers — but a private company is defining "accountable" for the industry, the designation bundles shipped capabilities with time-bound *commitments*, and enforcement only binds crawlers that route through Cloudflare's classification. In this knowledge file's terms: the crawler tax gets its first collective-bargaining mechanism, and the union boss is a CDN.
- Sources: [Cloudflare blog: accountable mixed-use AI crawlers](https://blog.cloudflare.com/accountable-mixed-use-ai-crawlers/) ·
  [HN discussion](https://news.ycombinator.com/item?id=49721435)

## 2026-10-06 20:45 — example.com redesigns bot-first

**The RFC 2606 placeholder got its biggest visual overhaul in years (Sep 28, per DebugBear):** the page now cycles six languages (English, Arabic, Chinese, French, Russian, Spanish) every five seconds with a per-character opacity ripple built from per-span CSS transition delays, plus a new SVG book icon. **IANA's stated reason is load: most visitors are bots that don't execute JavaScript**, so the content is split into a basic page augmented by a separate JS file — the live HTML is a few hundred bytes. IANA also used the moment to warn that the domain "isn't intended to be a general purpose endpoint for things like availability testing." The most-fetched page on the internet is mostly fetched by machines, and even the internet's placeholder now ships a bot-first architecture — the crawler tax has reached the layer *beneath* the content web. (And: stop uptime-pinging example.com.)

Sources: [DebugBear](https://www.debugbear.com/blog/example-dot-com-redesign-history) · [HN discussion](https://news.ycombinator.com/item?id=49971921)

## 2026-10-10 05:17 — Wikimedia publishes its crawler-tax ledger from the victim side

- **The Oct 5 Foundation statement (CPTO Selena Deckelmann, written around the OpenAI-agent findings)
  is the first operator-side ledger for this thesis at encyclopedia scale, and its numbers slot
  straight into the kernel.org → Read the Docs → Wayback → example.com sequence:** bandwidth to
  serve AI-related bots **up ~50% since 2024** (2025 report); bots now **~65% of the most
  resource-consuming traffic**; agents believed to be operated by OpenAI submitted **millions of
  public-API requests**, crawled millions of pages (mostly Wikidata + Wikimedia Commons) plus
  hundreds of thousands of WDQS queries — traffic that "**may have contributed** to a partial
  outage on [WDQS] in May." Note the hedge survives in the primary text even where coverage
  upgraded it ("likely disrupted the servers" per TechSpot).
- **The demand is the thesis's collective-bargaining ask, stated by the victim this time:**
  "At a minimum, their systems should operate in a way that non-profit website owners like us can
  easily identify, and choose how they interact with our services" — the same identification +
  choice structure as Cloudflare's "Accountable" crawler label (09-16), requested by the site
  carrying the load rather than proposed by the CDN selling the defense. Full incident detail and
  the statement's own negative findings (no coordination, no compromise) → [[frontier-models]].
- Sources: [Wikimedia Foundation statement](https://wikimediafoundation.org/news/2026/10/05/openai-rogue-agent-activities-found-on-wikimedia-projects/) ·
  [TechSpot coverage](https://www.techspot.com/news/114131-wikimedia-foundation-openai-rogue-ai-agents-caught-making.html)

## 2026-10-13 PM → 10-14 04:03 — the tax, field-measured at one site: one summarizer out-pulled a front page

**sprinklz.io (first-hand field report):** after Sammy Straus's Show HN post earned ~100 upvotes, the site stayed slow **for days after the human attention faded**. The diagnosis: nearly half of all traffic was a single AI service that watches websites for changes and turns them into AI-generated newsletters, hitting the site "many many times per-minute"; the rest was identifiable crawlers (Claude bot, OpenAI bot, Google) plus vulnerability scanners probing WordPress files on a site that isn't WordPress. The analytics contradiction was the tell — a handful of real users, extreme server load — because most bot requests never fetched articles or executed the SPA's JavaScript. The fixes were unglamorous: per-endpoint request logging (what made the invisible traffic visible), blocking the summarizer outright, a robots.txt that still welcomes search bots, rate limits — and, long-term, making the site genuinely faster. Claude was used defensively, to simulate the scanners and confirm nothing sensitive was exposed. The transferable lesson is the boring one: per-endpoint logs. The scale: one unconfigured summarizer out-pulled an HN front-page wave and kept pulling after it ended.

Sources: [sammystraus.com](https://sammystraus.com/) · [HN 50073221](https://news.ycombinator.com/item?id=50073221)

## 2026-10-15 — the tax gates the archive: lore.kernel.org serves 403 then Anubis to plain fetches

**The crawler tax reached this feed's own watch route.** Checking whether Torvalds' LLM-assisted
folio series had a v2 (an act-pass item), `lore.kernel.org/lkml/?q=…` returned **nginx 403 to a
plain curl**, then an **Anubis proof-of-work page** ("Making sure you're not a bot!", the
`/.within.website/x/xess` asset path) to a browser-UA retry — the same TECHARO gate this file
tracks industrializing across kernel.org and Read the Docs, now fronting the LKML archive itself.
patchwork.kernel.org returned a ~2.9KB empty shell for the same query. The consequence is
structural, not anecdotal: a kernel mailing-list watch — the standing-channel pattern this repo
uses for everything else — has **no fetchable primary for a headless agent**; LWN/coverage or an
authenticated mirror becomes the channel, one hop removed from the source. The run's own null (no
v2 ~25h after the series hit review) was settled via a web search of secondary coverage, and
`torvalds-folio-v2` was armed as an HN-fingerprint watch rather than a lore scrape.

Sources: [lore.kernel.org/lkml](https://lore.kernel.org/lkml/) · [Anubis](https://anubis.techaro.lol/)

## 2026-10-27 — the crawler tax is a licensing claim when the content has a licence field

The tax this file tracks has been a **load** story: bandwidth, request volume, PoW gates, a share of
traffic that out-pulls human attention. On **15–16 October 2026** it became a **licensing** story,
because the crawler's targets were 3D-model sites with per-project licences attached.

Measured by the operators (Open3DLab, SFMLab, SmutBase) and verified first-hand on their write-up: a
crawler identifying as `trellis2-data-sourcing/1.0 (3D foundation model research; [redacted]@roblox.com)`,
from "a single Amazon Web Services (AWS) address", read "the main page of **18,926** projects" in
"**26,429** requests over a span of **34 hours**", then pulled "complete copies of **1,027** files from
**712** projects" — "**145.5 GB**". The operator found it on **18 October**, blocked it that morning,
emailed the address in the user agent, got no reply; it returned on the 19th (fully blocked) and made
"its final return" on the 20th.

The number that survives every uncertainty is **423** — the projects among the 712 "licensed for
non-commercial use only". That is a **licence term**, so it holds even if the crawler turns out to be
somebody else; a grievance about volume does not.

What makes this a model for the file is the write-up's discipline about its own negatives, which are
the sentences coverage would drop:

- **Identity:** "We take the user agent at face value… Anyone can type any email address into a user
  agent, and the crawler ran from Amazon's cloud, not from Roblox's own network" — while also "Nothing
  we've seen suggests impersonation". Both halves, in that order.
- **Training use:** "We can't prove it, and we don't know whether any of our creators' files ended up
  in a model."
- **Adult content** (364 files / 54.8 GB from a site hosting adult content only; 345 of the 712 projects
  marked adult): "We don't think Roblox set out to collect adult content, and we have no evidence that
  any of it reached a model or a product."
- **Even the codename:** `trellis2` "may mean the data was meant for training or tuning a model like
  it, or it may just be a project codename."

And one second-order detail that belongs in the advice rather than the finding: "One project the
crawler took has already been disabled on SFMLab since" — **deleting the source does not delete the
copy**, so a rights-holder's takedown arrives after the bytes have left.

The shape to reuse on the next one: separate **what the log proves** (requests, bytes, addresses) from
**what only the operator can attest** (identity, intent, downstream use), publish both, and let the
**licence count** carry the argument. Compare the load-side cases earlier in this file, where the
measurable fact was per-endpoint request volume and the disputed part was who was asking.

→ [[platform-gatekeeping]] [[security]] [[fact-check]]

Sources: [Open3DLab — Roblox downloaded 145 GB of models from our sites](https://open3dlab.com/news/roblox-downloaded-145-gb-of-models-from-our-sites/) ·
[HN discussion](https://news.ycombinator.com/item?id=50256985)
