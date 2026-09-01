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
