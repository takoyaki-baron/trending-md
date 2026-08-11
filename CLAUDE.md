# trending.md — Claude Instructions

A dense trending-information feed optimized for agentic web search and human readability.
Canonical content in Markdown (`.md`) files; web view is a styled HTML render. Built by
`build.js`, deployed to Cloudflare Pages.

## Daily feed generation workflow

When asked to generate today's trending feed:

1. **Research** — Search for today's trending AI/developer/web topics from:
   - Hacker News front page
   - GitHub Trending (daily/weekly)
   - Major tech blogs (Meta AI, Anthropic, OpenAI, Google, Cloudflare, etc.)
   - Security advisories
   - X/Twitter tech discourse
   - Chinese tech media (36Kr, CSDN, etc.)

2. **Write `en/feed/YYYY-MM-DD.md`** following the exact format below

3. **Translate** to `zh/feed/YYYY-MM-DD.md` and `jp/feed/YYYY-MM-DD.md`

4. **Update indices**: add the new day link to each locale's `feed/index.md` and
   `archive/index.md`; update `en/feed/latest.md`, `zh/feed/latest.md`, `jp/feed/latest.md`
   to point to the new day.

## Feed file format

### Frontmatter
```yaml
---
date: 2026-08-11
updated: 2026-08-11T12:00:00Z
refresh: 15min
sources: 12
license: CC-BY-4.0
---
```

### Item template (10 items per day)
```markdown
## N. <Title> — <one-line English subtitle>

- **Velocity:** ▮▮▮ trending  |  ▮▮ rising  |  ▮ steady
- **Source:** <source name> · <points>+ pts · <time> ago
- **Tags:** `<tag1>` `<tag2>` `<tag3>`

<2-3 sentence description of what happened>

**Why it matters:** <1-2 sentence analysis of significance>

> <Optional blockquote with extra context>

[`🔗 <source label>`](<url>) · [`🔗 <source label>`](<url>)
```

### Velocity levels
- **▮▮▮ trending** — top 3 items, highest velocity
- **▮▮ rising** — strong momentum, items 4-8
- **▮ steady** — notable but slower, items 9-10

### Rules
- Exactly **10 items** per day
- Ranked by velocity (recency × engagement acceleration × source authority), NOT total attention
- Every item MUST have at least 2 source links
- Tags must be lowercase, use backtick-wrapped `<kebab-case>` or `<single-word>`
- Separate items with `---`
- End with a **Metadata** table (Generated, Items, Sources tracked, Refresh, Ranking, License)
- End with navigation: `[Previous day](...)` · `[Raw .md](...)` · `[Archive](...)`

### Metadata footer
```markdown
## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-08-11T12:00:00Z |
| Items | 10 |
| Sources tracked | 12 (Hacker News, GitHub Trending, major tech blogs, security advisories) |
| Refresh interval | 15 min |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |
```

## i18n

- **en/** — English (default). Write first.
- **zh/** — Simplified Chinese. Full translation of all 10 items.
- **jp/** — Japanese. Full translation of all 10 items.
- All three locales have identical structure: `feed/`, `archive/`, `about.md`
- i18n config: `i18n.js` (strings per locale, fallback to `en` for missing keys)
- Build: `node build.js` discovers all locales automatically

### Translation notes
- Keep the same velocity levels, points, and time ago in all locales
- Translate item titles and descriptions fully
- Keep source names in original language
- Keep tags in English (they're machine-readable identifiers)
- Links stay the same across locales (point to original sources)

## File structure
```
en/feed/YYYY-MM-DD.md    ← English daily feed (canonical)
zh/feed/YYYY-MM-DD.md    ← Chinese translation
jp/feed/YYYY-MM-DD.md    ← Japanese translation
en/feed/latest.md        ← Symlink equivalent: copies today's feed
en/feed/index.md         ← Feed index (list of all days)
en/archive/index.md      ← Archive index (same list, archive context)
```

## Build & deploy

- `node build.js` — builds all locales into `dist/`
- `npx wrangler pages deploy dist/ --project-name=trending-md --commit-dirty=true` — deploys
- Commits to `master` trigger Cloudflare Pages auto-deploy (but manual deploy is more reliable)
- Cron: launchd runs `deploy-cron.sh` at 22:07 daily (build + deploy only, no content gen)

## Important URLs

- Live site: `https://trending.md/`
- Raw feed (en): `https://trending.md/en/feed/latest.md`
- Raw feed (zh): `https://trending.md/zh/feed/latest.md`
- Raw feed (jp): `https://trending.md/jp/feed/latest.md`
- Archive (en): `https://trending.md/en/archive/`
