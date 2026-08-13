# trending.md — Claude Instructions

A dense trending-information feed optimized for agentic web search and human readability.
Canonical content in Markdown (`.md`) files; web view is a styled HTML render. Built by
`build.js`, deployed to Cloudflare Pages.

## Feed generation workflow (3x daily: 04:00 / 12:00 / 20:00)

The feed file `en/feed/YYYY-MM-DD.md` is built up across 3 runs per day.
Each run adds up to 20 new items. Cap is 100 per day per language (safety limit);
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
1. **Research** — search across the five tracks below (not just GitHub). Each item must
   link to a primary source (GitHub repo, arXiv, vendor blog, or CVE record) — a balanced
   mix, not all repos.
2. **Write** `en/feed/YYYY-MM-DD.md` with up to 20 items
3. **Translate** to zh/ and jp/
4. **Update** all indices

### Content focus: five balanced tracks

Cover a mix every day; don't let any single track dominate. Each item must link to a primary
source (GitHub repo, arXiv, vendor blog, or CVE record):

1. **AI models & research** — model releases, papers, benchmarks, training/inference techniques.
2. **AI tools & agent infra** — repos + products: agent runtimes, memory, skills, MCP, routing.
3. **Security & CVEs** — new vulnerabilities, exploits, patches; prioritize CVSS ≥9.0 or
   actively-exploited issues.
4. **Developer tools & open-source releases** — trending repos, new libraries/frameworks.
5. **Industry news** — product launches, safety incidents, policy — only when tied to a
   concrete release or a dev-relevant impact.

**Avoid:** pure funding rounds, corporate strategy, non-technical AI policy debates. If a story
has no primary source to cite or no concrete impact, skip it.

### Source validation — VISIT, don't trust aggregates (MANDATORY — 2026-08-12 Void lesson)

**Every cited source MUST be actually visited and validated.** The feed generator's default
behavior was to trust aggregated metrics (star count, trending rank) without opening the
underlying pages — this produced a two-layer false signal in a single item.

**The rule:** before writing a trending item, OPEN and READ:
1. **The repo itself** — README, last commit date, archived flag, maintenance status. Star
   count alone tells you nothing about whether a project is alive, abandoned, or just having
   a viral moment from an old blog post.
2. **Every source link you plan to cite** — click through. Does the page actually contain
   the data point you're attributing to it? A tool's landing page is not a data source. A
   search results page is not a source for a specific fact. If you can't find the data on
   the page, don't cite it.
3. **The trigger, not just the metric** — a repo spikes on trending for a reason (new release?
   HN mention? Twitter thread? blog post?). Find that trigger and write the item around IT,
   not around the number. "X's dormant editor resurfaces after HN mention" is accurate;
   "X rockets to #2 on trending" without context is misleading.

**Case study (Void, 2026-08-12 — two failures, one root cause):**
- The feed saw voideditor/void at #2 trending with +2,840 stars and wrote it as "AI-first
  editor momentum beyond Cursor/Copilot."
- **Neither GitHub nor the cited PageCrawl page was actually visited.** Had the repo been
  opened: README says "paused development since mid-2025" — the project is dead. Had the
  PageCrawl link been clicked: it's a generic tool signup form with zero Void data.
- The single root cause: **aggregate metrics were trusted without visiting the actual pages.**
  Star velocity is a signal to INVESTIGATE, not a signal to PUBLISH.

### Feed correction convention (when an item is wrong)

When a published item is found to be wrong (Void precedent), correct it **in place** — do not
renumber or silently drop it:

1. **Fix the body in place** — keep the item's number and position; rewrite the title/description
   to state what is actually true ("archived and deprecated", not "trending").
2. **Retract the bogus link** — remove any source that never contained the attributed fact; replace
   it with a source you have actually visited (the repo itself, the real vendor page).
3. **Keep ≥2 valid links** — every corrected item still needs at least two visited, working sources.
4. **Re-derive velocity** — a corrected item's velocity drops to match reality (▮ steady), never
   keeps its inflated rank.
5. **Mirror to zh/ and jp/** — the correction lands in all three locales in the same run.

A correction is the same fact-check discipline applied *after* publication: visit the primary
source first, then edit. Never edit from the aggregate's framing.

### Sources (check every run)

1. **GitHub Trending** (daily + weekly) — repos + open-source releases
2. **Hacker News** — front page + Show HN (project launches, tools, discussions)
3. **Security/CVE feeds** — NVD, CISA KEV, vendor advisories (prioritize CVSS ≥9.0 / actively exploited)
4. **AI model & research** — arXiv, Hugging Face, vendor blogs (Meta, Google, Anthropic, OpenAI,
   NVIDIA, Alibaba, etc.)
5. **Major AI/tech news** — product launches, safety incidents (check the primary source, not just aggregates)
6. **Chinese open-source** — GitHub trending (zh), CSDN GitHub Hot, 36Kr tech

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
- **Up to 20 items per run**, 100 max per day per language (safety cap; dedup is the real limiter)
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
en/feed/YYYY-MM-DD.md    ← English daily feed (canonical, up to 100 items)
zh/feed/YYYY-MM-DD.md    ← Chinese translation (full mirror)
jp/feed/YYYY-MM-DD.md    ← Japanese translation (full mirror)
en/feed/latest.md        ← Copy of today's en feed
en/feed/index.md         ← Feed index (list of all days)
en/archive/index.md      ← Archive index (same list, archive context)
```

## Schedule

| Run | Time (local) | Mode | Target |
|-----|-------------|------|--------|
| 1 | 04:03 UTC+8 | FRESH or MERGE | Up to 20 items |
| 2 | 12:03 UTC+8 | MERGE | Up to 20 new items (40 max) |
| 3 | 20:03 UTC+8 | MERGE | Up to 20 new items (dedup-gated, 100 max) |

Launchd triggers `generate-feed.sh` at these times. `deploy-cron.sh` runs at 22:07 as a
safety-net deploy.

## Build & deploy

- `node build.js` — builds all locales into `dist/`
- `npx wrangler pages deploy dist/ --project-name=trending-md --commit-dirty=true` — deploys
- Each generate run pushes to master, which triggers Cloudflare Pages auto-deploy
- Cron: launchd runs `deploy-cron.sh` at 22:07 daily (safety-net build + deploy)

## Learnt agent

A persistent **learnt agent** accumulates knowledge across feed batches and surfaces it on the
`/agent/` + `/action/` pages (trilingual). Its immutable purpose — recorded verbatim in
`en/agent.md` `## Purpose` and `en/action.md` — is to surface **fact-checked, first-hand,
agent-useful** trend information. It runs headless (`claude -p`) after each successful feed batch
via `agent-run.sh`, invoked from `generate-feed.sh`.

- **`agent/AGENT.md`** — the agent's identity + operating rules: the immutable Purpose, the 5-point
  self-improvement charter (fact-check, deep source traversal, every-day-better, self-evaluation,
  freshness), the 1M-token cap, net-new-only learning, and the **Self-execution** contract.
- **`en/agent.md`** — the agent's canonical English memory window (`## Purpose`, Identity, theses,
  todos, trend notes + `last_processed` frontmatter). Rewritten each run.
- **`zh/agent.md`**, **`jp/agent.md`** — display-only translations of the memory window.
- **`en/action.md`** — the agent's action page: self-proposed capability-expansion **todos** + a
  dated **log** (Plan / Did / Result, newest first) that tracks everything it did and links the
  results. Trilingual (zh/jp translations).
- **`agent/knowledge/<lang>/`** — cold-storage library, **trilingual**. The agent archives a
  `<topic>.md` reference file under `agent/knowledge/en/` (canonical English) when a topic is
  useful-but-not-hot, translates it to `agent/knowledge/zh/` + `agent/knowledge/jp/` (same
  `topic:` slug), and maintains a per-locale `index.md` TOC. The build renders each as
  `/<lang>/agent/knowledge/<topic>/`, and `[[topic]]` wiki-links resolve to the reader's locale.
- **`agent-run.sh`** — the runner; two passes: (1) **learn** the feed batch, (2) **act** — execute
  the agent's own todos and write the log. Runnable manually (`bash agent-run.sh YYYY-MM-DD`).

## Sources page

The `/sources/` page (trilingual, `en/zh/jp`) aggregates every source domain cited across the
feed and ranks them by citation count. It is **fully generated by `build.js`** — no hand-authored
markdown to drift:

- **Stats** — `build.js` scans every `en/feed/YYYY-MM-DD.md` (canonical English, date-named files
  only), extracts every `https://…` URL, normalizes the host (strips `www.`/`m.`, applies the
  `SOURCE_ALIASES` map — e.g. `raw.githubusercontent.com` → `github.com`, `blog.csdn.net` →
  `csdn.net`), and counts citations. Co-citation (two domains cited in the same item) is recorded
  as graph edges.
- **Categories + review** — eight categories: `code`, `vendor`, `news`, `security`, `research`,
  `community`, `data`, `other`. Every cited domain (currently 125) is hand-classified **and
  hand-reviewed** in **`sources/domains.json`**. Each curated entry carries a **review**: `cred`
  (credibility: `high`/`med`/`low`), `density` (info density: `high`/`med`/`low`), and `cv`
  (cross-validation count). Unreviewed domains (if any) render an italic "needs review" marker.
- **Outputs** (all regenerated each build, written straight to `dist/`):
  - `/<lang>/sources/` — the HTML page (stats, a clickable source cloud sized by citation count,
    a "most-cited together" co-citation list, and the full ranked table with category +
    cred/density/cv badges). Layout-is-the-diagram: no external chart library.
  - `/<lang>/sources.md` — a raw Markdown table for agents (`curl …/en/sources.md`).
  - `/sources.json` — canonical trilingual machine-readable dump (domain, citations, category,
    cred, density, crossValidated, en/zh/jp note).

**Maintaining `sources/domains.json`** — when a new domain starts appearing in feeds, add an entry
`"<host>": {"cat": "<category>", "en": "…", "zh": "…", "jp": "…", "cred": "…", "density": "…",
"cv": N}` with a one-sentence classification + evaluation and a review. **A new source must be
cross-validated at least once (`cv` ≥ 1)** — confirm at least one of its facts against an
independent source before adding it. This is the learnt agent's job (see `agent/AGENT.md`);
`node build.js` prints a `⚠ N uncurated domains need a review` list each run.

## Important URLs

- Live site: `https://trending.md/`
- Raw feed (en): `https://trending.md/en/feed/latest.md`
- Raw feed (zh): `https://trending.md/zh/feed/latest.md`
- Raw feed (jp): `https://trending.md/jp/feed/latest.md`
- Archive (en): `https://trending.md/en/archive/`
- Sources (en): `https://trending.md/en/sources/` · raw `https://trending.md/en/sources.md` · JSON `https://trending.md/sources.json`
