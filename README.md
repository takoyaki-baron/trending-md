# trending.md

Dense trending information listing optimized for **agentic web search**. Markdown-first. Web-rendered.

```
curl https://trending.md/feed/latest.md
```

## Structure

- `feed/` — Canonical markdown feeds (daily snapshots + `latest.md`)
- `index.html` — Stylish web renderer with inline markdown parser
- `about.md` — Project description and consumption guide
- `archive/` — Historical daily snapshots

## Design

1. **Markdown is the source of truth.** AI agents read `.md` directly — no HTML parsing needed.
2. **Web is a render layer.** The same `.md` files are fetched and rendered client-side for humans.
3. **The domain is the format.** `trending.md` — the TLD is the promise.

## Deploy

Cloudflare Pages. Push to `main`, auto-deploys to `trending.md`.
