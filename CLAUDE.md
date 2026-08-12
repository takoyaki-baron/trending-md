# trending.md — Claude Instructions

A dense trending-information feed optimized for agentic web search and human readability.
Canonical content in Markdown (`.md`) files; web view is a styled HTML render. Built by
`build.js`, deployed to Cloudflare Pages.

## Feed generation workflow (3x daily: 04:00 / 12:00 / 20:00)

The feed file `en/feed/YYYY-MM-DD.md` is built up across 3 runs per day.
Each run adds up to 10 new items. Cap is 100 per day per language (safety limit);
the real constraint is **dedup** — only genuinely new stories get added.

### MERGE mode (subsequent runs — file already exists)

When `en/feed/YYYY-MM-DD.md` already exists:
1. **Read existing** `en/feed/YYYY-MM-DD.md` to understand what's already covered
2. **Research** new trending topics from the source list below
3. **Dedup** — skip any topic already covered in the existing file. Each item must be
   genuinely new — different event, different company, different CVE, different repo.
   Do NOT rephrase existing items; only add net-new stories.
4. **If nothing new** — exit cleanly (no edits). Don't force items just to hit a quota.
5. **If new items found** — append them after the last existing item, renumbering
   sequentially (max 100 items total as safety limit; dedup is the real filter).
6. **Re-translate** — update zh/ and jp/ versions to match the expanded en file.
   Translate all items (old + new) to keep the output consistent.
7. **Update indices** — refresh `en/feed/latest.md`, `zh/feed/latest.md`,
   `jp/feed/latest.md`, and all `feed/index.md` + `archive/index.md` if needed.

### FRESH mode (first run of the day — file doesn't exist yet)

When `en/feed/YYYY-MM-DD.md` does NOT exist:
1. **Research** — Search GitHub Trending first (daily + weekly), then HN/Show HN.
   Every item must center on a specific GitHub repo or open-source project.
   At least 7 of 10 items must have a GitHub repo URL.
2. **Write** `en/feed/YYYY-MM-DD.md` with 10 items
3. **Translate** to zh/ and jp/
4. **Update** all indices

### Content focus: GitHub repos first

**Primary (≥70% of items):** GitHub repos — trending projects, new releases, interesting tools,
libraries, frameworks, open-source AI models. Every item should center on a concrete repo/project.

**Secondary (≤30% of items):** Developer-relevant news that directly impacts how people code —
new APIs, platform changes, language/ecosystem shifts, major security vulnerabilities with CVEs.

**Avoid unless repo-adjacent:** corporate acquisitions, funding rounds, company strategy,
non-technical AI policy debates, general tech industry news. If a story doesn't have a repo
URL or a concrete dev workflow impact, skip it.

### GitHub repo vitality check (MANDATORY — added 2026-08-12 after Void false trend)

**Star velocity alone is NOT enough to validate a trending repo.** Before writing up ANY GitHub
Trending item, check the repo's actual vitality:

1. **Archived?** — If the repo is archived/read-only, the trend is noise. SKIP it entirely, or
   if it's genuinely newsworthy (e.g. a major project just got archived), write it as an
   "archival/end-of-life" story, NOT as a momentum signal.
2. **Last commit date** — If the last commit is >3 months ago and there's no release/announcement
   driving the spike, the stars are likely from a viral social share of an old project. Flag it
   as "dormant" and either skip or note the dormancy explicitly in the write-up.
3. **Active maintenance?** — Check README for deprecation/paused notices. "Paused development"
   or "no longer maintained" = NOT a valid trending signal. If there are active forks, mention
   THOSE as the real story.
4. **What actually caused the spike?** — A repo can trend because of a blog post, a Hacker News
   comment mention, a Twitter thread — not because the project itself shipped something. Try to
   identify the actual trigger and write the item around THAT (e.g. "X's old editor resurfaces
   in HN thread about Y" not "X rockets up trending").

**Case study (Void, 2026-08-12):** voideditor/void hit #2 on daily trending with +2,840 stars,
but the project has been paused since mid-2025 and the README says development stopped. The
stars went to a dead project. The real story was active forks (Loophole, Modo), not Void itself.
The feed wrote it as "AI-first editors beyond Cursor/Copilot" — a false momentum signal.

### Sources (in priority order)

1. **GitHub Trending** (daily + weekly) — PRIMARY. Check every run.
2. **Hacker News** — filter for Show HN, project launches, new tools/libraries
3. **Major repo releases** — check popular orgs (Meta, Google, Anthropic, OpenAI, Cloudflare,
   Vercel, Shopify, etc.) for new open-source releases
4. **Chinese open-source** — GitHub trending in Chinese, CSDN GitHub Hot, 36Kr tech
5. **Security** — only CVSS ≥9.0 or widely-exploited vulnerabilities (CVE, GHSA)

## Feed file format

### Frontmatter
```yaml
---
date: 2026-08-11
updated: 2026-08-11T12:00:00Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 12
license: CC-BY-4.0
---
```

### Item template
```markdown
## N. <Title> — <one-line English subtitle>

- **Velocity:** ▮▮▮ trending  |  ▮▮ rising  |  ▮ steady
- **Source:** <source name> · <points>+ pts · <Xh ago> (~<HH:MM> UTC+8)
- **Tags:** `<tag1>` `<tag2>` `<tag3>`

<2-3 sentence description of what happened>

**Why it matters:** <1-2 sentence analysis of significance>

> <Optional blockquote with extra context>

[`🔗 <source label>`](<url>) · [`🔗 <source label>`](<url>)
```

### Velocity levels (per-run, not cumulative)
- **▮▮▮ trending** — top 1-3 of this batch, highest velocity
- **▮▮ rising** — strong momentum, middle items
- **▮ steady** — notable but slower, bottom items
- Velocity is relative to THIS RUN's batch, not the full 30-item list

### Rules
- **Up to 10 items per run**, 100 max per day per language (safety cap; dedup is the real limiter)
- Ranked by velocity (recency × engagement acceleration × source authority), NOT total attention
- Every item MUST have at least 2 source links
- Tags must be lowercase, backtick-wrapped `<kebab-case>` or `<single-word>`
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
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |
```

## i18n

- **en/** — English (default). Write first.
- **zh/** — Simplified Chinese. Full translation of all items.
- **jp/** — Japanese. Full translation of all items.
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
en/feed/YYYY-MM-DD.md    ← English daily feed (canonical, up to 30 items)
zh/feed/YYYY-MM-DD.md    ← Chinese translation (full mirror)
jp/feed/YYYY-MM-DD.md    ← Japanese translation (full mirror)
en/feed/latest.md        ← Copy of today's en feed
en/feed/index.md         ← Feed index (list of all days)
en/archive/index.md      ← Archive index (same list, archive context)
```

## Schedule

| Run | Time (local) | Mode | Target |
|-----|-------------|------|--------|
| 1 | 04:03 UTC+8 | FRESH or MERGE | Up to 10 items |
| 2 | 12:03 UTC+8 | MERGE | Up to 10 new items (20 max) |
| 3 | 20:03 UTC+8 | MERGE | Up to 10 new items (dedup-gated, 100 max) |

Launchd triggers `generate-feed.sh` at these times. `deploy-cron.sh` runs at 22:07 as a
safety-net deploy.

## Build & deploy

- `node build.js` — builds all locales into `dist/`
- `npx wrangler pages deploy dist/ --project-name=trending-md --commit-dirty=true` — deploys
- Each generate run pushes to master, which triggers Cloudflare Pages auto-deploy
- Cron: launchd runs `deploy-cron.sh` at 22:07 daily (safety-net build + deploy)

## Important URLs

- Live site: `https://trending.md/`
- Raw feed (en): `https://trending.md/en/feed/latest.md`
- Raw feed (zh): `https://trending.md/zh/feed/latest.md`
- Raw feed (jp): `https://trending.md/jp/feed/latest.md`
- Archive (en): `https://trending.md/en/archive/`
