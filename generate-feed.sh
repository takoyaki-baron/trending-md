#!/bin/bash
# Feed content generation — triggered by launchd 3x daily (04:03 / 12:03 / 20:03)
# MERGE mode: reads existing file, dedups, appends new items (max 30/day/lang)
# FRESH mode: creates new file from scratch (first run of the day)
set -euo pipefail

REPO_DIR="/Users/kelong/developer/github/trending-md"
TODAY=$(date +%Y-%m-%d)
LOG_DIR="$REPO_DIR/.cron-logs"
mkdir -p "$LOG_DIR"
LOG="$LOG_DIR/generate-$TODAY-$(date +%H%M).log"

exec >"$LOG" 2>&1
echo "=== generate-feed $TODAY start $(date) ==="

cd "$REPO_DIR"

# Pull latest
git pull origin master --ff-only 2>&1 || echo "(git pull skipped)"

FEED_FILE="en/feed/$TODAY.md"
MAX_TOTAL=30
MAX_PER_RUN=10
ITEM_COUNT=0

# Determine mode: FRESH vs MERGE
if [ -f "$FEED_FILE" ]; then
  ITEM_COUNT=$(grep -c '^## [0-9]' "$FEED_FILE" 2>/dev/null || echo 0)
  echo "MERGE mode: $FEED_FILE exists with $ITEM_COUNT items (max $MAX_TOTAL)"

  if [ "$ITEM_COUNT" -ge "$MAX_TOTAL" ]; then
    echo "Already at $ITEM_COUNT items (max $MAX_TOTAL), nothing to do"
    exit 0
  fi

  REMAINING=$((MAX_TOTAL - ITEM_COUNT))
  BATCH=$((REMAINING < MAX_PER_RUN ? REMAINING : MAX_PER_RUN))
  MODE="merge"
else
  echo "FRESH mode: $FEED_FILE does not exist, creating from scratch"
  BATCH=$MAX_PER_RUN
  MODE="fresh"
fi

# Write prompt to temp file
PROMPT_FILE=$(mktemp /tmp/trending-prompt.XXXXXX)

if [ "$MODE" = "merge" ]; then
  cat > "$PROMPT_FILE" << ENDPROMPT
Update today's trending feed for $TODAY (MERGE mode — add new items).

The feed already has $ITEM_COUNT items. Add up to $BATCH genuinely NEW items.
Max total is $MAX_TOTAL. If no genuinely new stories exist, exit cleanly without edits.

1. Read the existing $FEED_FILE to understand what's already covered. DO NOT rephrase or modify existing items — only add net-new stories (different events, different companies, different CVEs, different repos).

2. Research new trending AI/developer/web topics from Hacker News, GitHub Trending, major tech blogs, and security advisories. Use WebSearch and WebFetch.

3. Dedup against existing items. Skip anything that overlaps with what's already there. Quality > quantity — if only 3 genuinely new items exist, add 3, not 10.

4. Append new items after existing ones in $FEED_FILE, renumbering sequentially (## $((ITEM_COUNT + 1)). ...). Follow the exact format in CLAUDE.md. Each item must have: velocity, source with points+time, tags, description, "Why it matters", and at least 2 source links.

5. Re-translate the FULL file (all items, old + new) to zh/feed/$TODAY.md and jp/feed/$TODAY.md. Keep tags in English, translate everything else.

6. Update en/feed/latest.md, zh/feed/latest.md, jp/feed/latest.md to match. Update feed/index.md and archive/index.md for all 3 locales if needed.

7. Update the metadata table: Items = old + new count, Generated = now.
ENDPROMPT
else
  cat > "$PROMPT_FILE" << ENDPROMPT
Generate today's trending feed for $TODAY (FRESH mode — first run of the day).

1. Research today's trending AI/developer/web topics from Hacker News, GitHub Trending, major tech blogs, and security advisories. Use WebSearch and WebFetch to get current information.

2. Write $FEED_FILE with up to $BATCH items following the exact format in CLAUDE.md. Each item must have: velocity, source with points+time, tags, description, "Why it matters", and at least 2 source links.

3. Translate to zh/feed/$TODAY.md (Simplified Chinese) and jp/feed/$TODAY.md (Japanese). Keep tags in English, translate everything else.

4. Update en/feed/latest.md to copy today's content. Update zh/feed/latest.md and jp/feed/latest.md similarly.

5. Update en/feed/index.md, zh/feed/index.md, jp/feed/index.md — add today's link at the top of the list. Same for en/archive/index.md, zh/archive/index.md, jp/archive/index.md.
ENDPROMPT
fi

echo "Mode=$MODE batch=$BATCH"
echo "Running claude -p ..."
claude -p "$(cat "$PROMPT_FILE")" 2>&1
echo "Claude exit code: $?"
rm -f "$PROMPT_FILE"

# Stage and commit
git add en/feed/"$TODAY.md" zh/feed/"$TODAY.md" jp/feed/"$TODAY.md" \
        en/feed/index.md en/archive/index.md en/feed/latest.md \
        zh/feed/index.md zh/archive/index.md zh/feed/latest.md \
        jp/feed/index.md jp/archive/index.md jp/feed/latest.md 2>/dev/null || true

if git diff --cached --quiet; then
  echo "No changes to commit"
else
  NEW_COUNT=$(grep -c '^## [0-9]' "$FEED_FILE" 2>/dev/null || echo 0)
  git commit -m "feed: $TODAY $(date +%H:%M) batch ($NEW_COUNT items)" 2>&1
  git push origin master 2>&1
  echo "Committed and pushed ($NEW_COUNT items)."

  # Build and deploy to Cloudflare Pages
  echo "Building…"
  node build.js 2>&1
  echo "Deploying to Cloudflare Pages…"
  npx wrangler pages deploy dist/ --project-name=trending-md --commit-dirty=true 2>&1
  echo "Deployed."
fi

# Magichand tracking (non-blocking)
curl -s -X POST http://localhost:8777/api/feature-todo \
  -H 'Content-Type: application/json' \
  -d "{\"feature\":\"general\",\"project\":\"trending-md\",\"text\":\"[auto] $TODAY $(date +%H:%M) batch — $MODE mode\",\"taskKind\":\"daily-feed\"}" \
  || echo "(magichand portal not reachable)"

echo "=== generate-feed $TODAY done $(date) ==="
