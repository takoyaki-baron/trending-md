#!/bin/bash
# Nightly feed content generation — triggered by launchd at 21:03
# Uses claude -p (non-interactive) to research + write today's feed,
# then commits, pushes, and creates a magichand tracking task.
set -euo pipefail

REPO_DIR="/Users/kelong/developer/github/trending-md"
TODAY=$(date +%Y-%m-%d)
LOG_DIR="$REPO_DIR/.cron-logs"
mkdir -p "$LOG_DIR"
LOG="$LOG_DIR/generate-$TODAY.log"

exec >"$LOG" 2>&1
echo "=== generate-feed $TODAY start $(date) ==="

cd "$REPO_DIR"

# Pull latest so we're building on the current state
git pull origin master --ff-only 2>&1 || echo "(git pull skipped or no remote changes)"

# Idempotency: skip if today's feed already exists
if [ -f "en/feed/$TODAY.md" ]; then
  echo "en/feed/$TODAY.md already exists, skipping generation"
  exit 0
fi

# Generate the feed via Claude non-interactive mode.
# CLAUDE.md in this repo is auto-loaded as context.
echo "Running claude -p to generate feed for $TODAY…"
claude -p "Generate today's trending feed for $TODAY.

1. Research today's trending AI/developer/web topics from Hacker News, GitHub Trending, major tech blogs, and security advisories. Use WebSearch and WebFetch to get current information.

2. Write en/feed/$TODAY.md with 10 items following the exact format in CLAUDE.md. Each item must have: velocity, source with points+time, tags, description, 'Why it matters', and at least 2 source links.

3. Translate to zh/feed/$TODAY.md (Simplified Chinese) and jp/feed/$TODAY.md (Japanese). Keep tags in English, translate everything else.

4. Update en/feed/latest.md to copy today's content. Update zh/feed/latest.md and jp/feed/latest.md similarly.

5. Update en/feed/index.md, zh/feed/index.md, jp/feed/index.md — add today's link at the top of the list. Same for en/archive/index.md, zh/archive/index.md, jp/archive/index.md." 2>&1

echo "Claude generation exit code: $?"

# Stage and commit
git add en/feed/"$TODAY.md" zh/feed/"$TODAY.md" jp/feed/"$TODAY.md" \
        en/feed/index.md en/archive/index.md en/feed/latest.md \
        zh/feed/index.md zh/archive/index.md zh/feed/latest.md \
        jp/feed/index.md jp/archive/index.md jp/feed/latest.md 2>/dev/null || true

if git diff --cached --quiet; then
  echo "No changes to commit"
else
  git commit -m "feed: $TODAY daily trending snapshot (auto)" 2>&1
  git push origin master 2>&1
  echo "Committed and pushed."
fi

# Magichand tracking — non-blocking; portal may be down
curl -s -X POST http://localhost:8777/api/feature-todo \
  -H 'Content-Type: application/json' \
  -d "{\"feature\":\"general\",\"project\":\"trending-md\",\"text\":\"[auto] Daily feed $TODAY generated\",\"taskKind\":\"daily-feed\"}" \
  || echo "(magichand portal not reachable, skipping tracking)"

echo "=== generate-feed $TODAY done $(date) ==="
