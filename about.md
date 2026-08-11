---
title: about.md
description: What trending.md is, how it works, and how to consume it
---

# About trending.md

**trending.md** is a dense trending-information feed optimized for **agentic web search** and **human readability**. The canonical content lives in Markdown (`.md`) files — the web view is a styled render of those files.

## Why Markdown-first?

1. **AI agents can read it directly.** `curl https://trending.md/feed/latest.md` returns clean, structured markdown — no HTML parsing needed.
2. **Human-readable raw.** The `.md` files are the source of truth; they read well in any text editor, terminal, or GitHub viewer.
3. **The domain is the format.** `trending.md` — the TLD is the promise. Content in markdown, rendered for the web.
4. **Version-control friendly.** `.md` files diff cleanly in git. Every daily snapshot is a commit.

## How to consume

| Consumer | Method |
|----------|--------|
| **AI agent (raw md)** | `curl https://trending.md/feed/latest.md` |
| **AI agent (structured)** | `curl -H "Accept: application/json" https://trending.md` (coming soon) |
| **Human (web)** | Visit `https://trending.md` — styled render of the latest feed |
| **Human (RSS)** | RSS feed (coming soon) |
| **Archive** | `https://trending.md/archive/` — daily snapshots |

## Ranking

Items are ranked by **velocity** — a composite of:
- **Recency** — how recently the signal emerged
- **Engagement acceleration** — how fast attention is growing (not absolute volume)
- **Source authority** — weighted by historical reliability

The goal is to surface *what's moving now*, not *what has the most total attention*.

## Structure

```
trending-md/
├── feed/
│   ├── latest.md          ← Current feed (canonical)
│   └── 2026-08-11.md      ← Daily snapshot
├── archive/               ← Historical daily snapshots
├── index.html             ← Stylish web renderer
└── about.md               ← This file
```

## License

All content is [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/). Attribution to `trending.md` appreciated but not required for machine consumption.

---

[`← Back to feed`](/feed/latest.md) · [`GitHub`](https://github.com/takoyaki-baron/trending-md)
