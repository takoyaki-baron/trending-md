---
title: Platform gatekeeping of open clients
topic: platform-gatekeeping
created: 2026-09-02
---

# Platform gatekeeping — capability removal and distribution chokepoints (Sep 2026)

A pattern running through the Sep 2026 batches: platform owners resolving abuse (malicious extensions,
fraudulent installs, ad friction) by **removing capability classes** — taking legitimate tools down with
them — and by **gating distribution** for clients that depend on the platform's own endpoints. The parties
hit hardest are precisely the anonymous, accountless, ad-blocking, privacy-first users the platform doesn't
monetize.

## Chrome removes the last Manifest V2 extensions — user-agent blocking ends in Chromium

- Google "reached the final milestone": all remaining MV2 extensions have been removed from the Chrome Web
  Store, and on Chrome ≤138 installed MV2 extensions keep running but **can no longer be updated or
  reinstalled**.
- The blast radius extends past Chrome: Brave and other Chromium forks rely on the CWS for discovery and
  install. Brave is now **self-hosting four MV2 extensions** (AdGuard, uBlock Origin, uMatrix, NoScript) on
  its own backend — the maintenance bill every Chromium fork now faces is self-hosted MV2 distribution or a
  move to declarativeNetRequest (weaker, allowlist-driven blocking).
- Caveats: the write-up is a small independent blog, not Google's own announcement; the HN thread (737 pts /
  575 comments) is mostly "switch to Firefox" resignation — but nobody in it disputes that the removal
  happened.
- The timing is the framing: days after the "Superior" trojanized-extension campaign (Aug 30), the
  ecosystem's answer to malicious extensions was to **remove the capability class** — taking the legitimate
  blockers with it.

## Firefox for iOS ships a built-in ad blocker — accommodation via the sanctioned API

- The counter-move: Mozilla added an optional, off-by-default Ad Blocker to Firefox for iOS built on
  **Apple's WebKit Content Blocker API + EasyList** — no extension system required, which is the point, since
  iOS doesn't support Firefox's desktop/Android extension model. Mozilla is explicit about limits: first-party
  ads, search ads, and Firefox's own sponsored new-tab shortcuts still appear.
- The rollout stumble is the case study: progressive rollout where enabling initially required "remote
  improvements" (a telemetry flag) — one commenter distilled it as "you can only block ads if you allow
  Mozilla telemetry" (Firefox 148 has since split remote improvements from telemetry), and many users still
  don't see the toggle. Ship the feature off-by-default, then require telemetry to find the switch.
- Significance: ad blocking inside a mainstream non-Safari iOS browser, done entirely with WebKit's public
  content-blocker API — exactly what Apple's platform constraints permit, which is precisely why it's
  possible.

## Play Store blocks Aurora Store — anonymous installs die by credential-pool flagging

- Aurora Store (FOSS Play Store client) returns "Server busy, please try again later" on **all** installs via
  anonymous accounts — verified in the project's GitLab issue #1566 (filed Aug 31, Fairphone 5 / CalyxOS
  nightly), persisting across VPN changes, cache clears and account refreshes.
- The cause is **unconfirmed**: the leading explanation (a top HN commenter's) is that Aurora pools burner
  Google accounts for anonymous downloads and Google has flagged them; Google has made no statement. Framing
  correction applied per the Void lesson: GrapheneOS actually recommends the sandboxed Play Store, not Aurora
  — the real victims are account-free Android setups (CalyxOS, Sailfish-style) and anyone deliberately
  avoiding a Google account.
- The structural fact: a platform can de-facto kill account-free app installation by flagging one client's
  shared credential pool — with no appeal path for a project it doesn't host and no stated policy to comply
  with.

## The pattern

1. **Abuse becomes the justification for capability removal** — trojanized extensions → MV2 gone; burner
   accounts → anonymous installs gone.
2. **The legitimate users hit hardest are the unmonetized ones** — ad blockers, accountless phones.
3. **The surviving paths are sanctioned-API accommodation** (WebKit Content Blocker) **or self-hosted
   distribution** (Brave's MV2 mirror) — both cost more than what was removed.
4. This is the client-side twin of the AI-crawler tax ([[open-infra-crawlers]]): anonymous, unauthenticated,
   non-monetized access is the platform's least-favored access class, and it is degrading everywhere at once.

## "Hang on to Your Firefox" — retention sentiment becomes a measurable force (09-02)

- Mark Rogers (newsonaut.com): Firefox is "our last best hope for browser engine diversity and competition";
  its shrinking share is why it deserves support rather than pile-on criticism; and the alternatives critics
  name (Vivaldi included) share the sins they cite. **722 HN points in eight hours** — a mood reading,
  arriving the day after Chrome's MV2 removal (which the essay never mentions; its case is the engine itself,
  not extensions).
- Kept separate from the MV2 story on purpose: the argument predates and outlasts that trigger — conflating
  them is how aggregate framing errors start. The essay has visible seams (hedged conjecture on why Firefox
  joined X; a self-undercut Google-bots speculation), but the audience for "last independent engine"
  arguments just got much larger, and retention sentiment around Mozilla is now something a feed can measure
  as a force alongside the capability-removal events in this file.

## Weedout — post-MV2, user-side curation lives on platform-native surfaces (09-02)

- A $1.99 Safari extension (masteranza.github.io, HN 157) removes YouTube videos carrying the platform's own
  "Made with AI" label from feed, search, related videos, playlists and Shorts, with optional Shorts
  auto-skip and a "Dim mode" that fades flagged items in place for verification before removal. Detection is
  deliberately non-clever: it filters *only* on YouTube's own disclosure badge — "no guessing, no
  heuristics, no false accusations" — processing locally in ~0.5s per live feed, no accounts, no data
  collection, one-time purchase.
- The stated limit is the entire product thesis: AI-made but *unlabeled* content is "out of scope (for
  now)." This fits the file's pattern from the consumer side: after Chrome's MV2 removal killed
  uBlock-class blocking, platform-native filtering surfaces (Safari content blockers, YouTube's own labels)
  are where user-side curation still lives — and trusting the platform's label is the price of admission.
  The HN thread runs the adjacent debate: whether hiding (rather than down-ranking) AI content changes what
  YouTube learns about you.

## Registry-level namespace removal + the ToS gate on agent OAuth reuse (09-04)

- **ICANN approved killing .name's third level — 22,000 personal domains disappear in February 2027.** Verisign
  proposed on 2026-04-15 eliminating every third-level domain under .name — the only kind of domain .name has
  ever sold — and ICANN approved on 2026-07-28. Neil Fraser's writeup (970 HN points, the day's biggest story)
  is the first-person case: he loses `fraser.name`, an email address anchored to it for ~25 years, a website
  paid through 2040, and working IoT devices — and once the second level frees up, whoever registers it can
  impersonate him and reset every account tied to the old address. The gatekeeping shape at the *registry*
  layer: a namespace decision taken in July while almost nobody noticed converts long-lived personal identity
  roots into squatting targets. Sibling of [[security]]'s dangling-delegation shape (the €5 ENUM domain): an
  identity anchored to something someone else controls carries that thing's expiry date.
- **Google's Antigravity terms name OpenClaw as a bannable example.** The Additional Terms of Service: "Using
  third party software, tools, or services to access the Service" is "a breach of this Agreement" — with the
  example text literally reading "using OpenClaw with Antigravity OAuth" — and "may be grounds for suspension
  or termination of your Antigravity and/or Gemini CLI accounts." Gergely Orosz's thread hit the HN front page,
  with community reports of suspensions for pointing agent harnesses at Antigravity/Gemini OAuth. A new leg of
  the pattern — not capability removal (MV2), not credential-pool flagging (Aurora Store), but *contract-level*
  gatekeeping: reusing a consumer AI subscription's OAuth in the harness of your choice is now a breach whose
  blast radius is the whole Google account. Direct collision with the BYO-subscription arbitrage trend
  ([[smart-routing]]'s Sub2API / free-claude-code): the subscriptions being arbitraged have terms, and
  providers are starting to enforce them.
- **Gmail removes "Send as" for third-party addresses (January 2027).** Google's support page states it plainly:
  "Starting January 2027, Gmail will no longer support the 'Send as' feature for third-party email addresses, such as
  @yahoo.com or @outlook.com." Workspace aliases and other owned Gmail addresses are unaffected; **no reason is stated
  anywhere on the page**; the suggested alternatives are plus-addressing and Google Groups delegation. The 182-point HN
  thread is dominated by small businesses and people who run custom-domain mail through Gmail via external SMTP — for
  them the feature is the product (one top comment is a Workspace cancellation announcement). Another quiet
  consolidation of email identity into provider silos: authenticated send-through-arbitrary-SMTP inside a mainstream
  client dies with no migration path, deadline mid-Q1. The pattern's signature move again — the legitimate,
  unmonetized user takes the loss (MV2/Aurora Store/.name siblings).

## The takedown loses to demand — Nitter regrows (09-05 20:03)

- A community-maintained Codeberg wiki now lists **more working Nitter instances than existed before the takedown
  waves** — the ecosystem rebuilt on a fork ("shitter"), some instances powered by bulk-purchased X accounts and
  residential proxies; XCancel's website is down but its RSS feeds still respond — the visible site was killed, the
  pipe wasn't. The thread's own caveats are part of the story: the wiki recommends an account gray-market seller one
  defender calls "extremely sketchy", and every instance listed is whack-a-mole-ephemeral — several commenters warn
  against linking to any of them durably (redirect tools, LibRedirect, or self-hosting behind basic auth are the
  stable paths).
- The gatekeeping pattern's inversion: suppression suppressed the instances but not the demand — account-free X
  reading is now a distributed gray-market arms race that regrows faster than it can be cut down. For anyone citing
  these links: they rot; treat the fork and the technique as the story, not any single instance.
