#!/bin/bash
# Feed content generation — triggered by launchd 3x daily (04:03 / 12:03 / 20:03)
# MERGE mode: reads existing file, dedups, appends new items (max 30/day/lang)
# FRESH mode: creates new file from scratch (first run of the day)
set -euo pipefail

# deepseek-v4-pro isn't in Claude Code's model registry, so auto-compact assumes a 200k window.
# Disable that enforcement so the API reports the real context window instead.
export CLAUDE_CODE_DISABLE_UNKNOWN_MODEL_WINDOW_ENFORCEMENT=1

# Authenticate git as the repo owner (takoyaki-baron). gh's git-credential helper answers
# with the globally-active account by default (currently wohaoshuai), which has NO write
# access to takoyaki-baron/trending-md — so `git push` 403s. Setting GH_TOKEN forces the
# helper to hand back the owner's token instead. Inherited by agent-run.sh via export.
export GH_TOKEN="$(gh auth token --hostname github.com --user takoyaki-baron)"

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
MAX_TOTAL=100
MAX_PER_RUN=20
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

# Build cross-day dedup history: repos + titles already seen in the previous 7 days.
# A story is a duplicate if its primary GitHub repo already appeared, or it's the same
# event/CVE/story — this keeps each day's feed net-new so information accumulates, not repeats.
# Window widened 3 → 7 days on 2026-08-23: the 08-23 batch re-ran OpenLogi (08-19), llmfit and
# omlx (08-18) as fresh items because all three sat 4–5 days back, just outside a 3-day window.
RECENT_HISTORY=""
for i in 1 2 3 4 5 6 7; do
  D=$(date -v-${i}d +%Y-%m-%d)
  F="en/feed/$D.md"
  [ -f "$F" ] || continue
  RECENT_HISTORY="$RECENT_HISTORY
### $D
$(grep -oE 'github.com/[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+' "$F" | sort -u | sed 's/^/- repo: /')
$(grep -E '^## [0-9]+\.' "$F" | sed 's/^## [0-9]*\. /- story: /')"
done

# Write prompt to temp file
PROMPT_FILE=$(mktemp /tmp/trending-prompt.XXXXXX)

if [ "$MODE" = "merge" ]; then
  cat > "$PROMPT_FILE" << ENDPROMPT
Update today's trending feed for $TODAY (MERGE mode — add new items).

The feed already has $ITEM_COUNT items. Add up to $BATCH genuinely NEW items.
Max total is $MAX_TOTAL. If no genuinely new stories exist, exit cleanly without edits.

1. Read the existing $FEED_FILE to understand what's already covered. DO NOT rephrase or modify existing items — only add net-new stories (different events, different companies, different CVEs, different repos).

2. Research new items across five tracks — (a) AI models & research (releases, papers, benchmarks), (b) AI tools & agent infra (repos + products), (c) security & CVEs (new vulns, exploits, patches), (d) developer tools & open-source releases, (e) significant industry news (product launches, safety incidents, policy). Use GitHub Trending, Hacker News (front page + Show HN), security/CVE feeds, and major AI/tech news. Skip pure corporate news (funding rounds, strategy) unless tied to a concrete release. Every item must link to a primary source (GitHub repo, arXiv, vendor blog, or CVE record) — a balanced mix across tracks, not all repos.

3. Dedup against existing items AND against the recent-history list below. Skip anything whose primary GitHub repo already appears below, or that is the same event/CVE/story as an item already covered in the last 7 days. Quality > quantity — if only 3 genuinely new items exist, add 3, not 10. A repo is new if (and only if) its slug does NOT appear in the recent-history list. If a repo DOES appear below but has since shipped a genuinely new development (a release, a measured result, a security fix), you may cover that development — but write it as an explicit update ("since we covered X on <date>, it has …"), never as a fresh discovery, and never re-describe what the earlier item already said.

RECENT HISTORY (previous 7 days — do NOT repeat these repos or stories):
${RECENT_HISTORY:-"(none — first days of the feed)"}

4. Append new items after existing ones in $FEED_FILE, renumbering sequentially (## $((ITEM_COUNT + 1)). ...). Follow the exact format in CLAUDE.md. Each item must have: velocity, source with points+time, tags, description, "Why it matters", and at least 2 source links.

5. Re-translate the FULL file (all items, old + new) to zh/feed/$TODAY.md and jp/feed/$TODAY.md. Keep tags in English, translate everything else.

6. Update en/feed/latest.md, zh/feed/latest.md, jp/feed/latest.md to match. Update feed/index.md and archive/index.md for all 3 locales if needed.

7. Update the metadata table: Items = old + new count, Generated = now.
ENDPROMPT
else
  cat > "$PROMPT_FILE" << ENDPROMPT
Generate today's trending feed for $TODAY (FRESH mode — first run of the day).

FOCUS: a balanced mix across five tracks — (a) AI models & research (releases, papers, benchmarks), (b) AI tools & agent infra (repos + products), (c) security & CVEs (new vulns, exploits, patches), (d) developer tools & open-source releases, (e) significant industry news (product launches, safety incidents, policy). Check GitHub Trending (daily + weekly), Hacker News (front page + Show HN), security/CVE feeds, and major AI/tech news. Skip pure corporate news (funding rounds, strategy) unless tied to a concrete release.

1. Research new items across the five tracks above. Use WebSearch and WebFetch.

2. Write $FEED_FILE with up to $BATCH items following the exact format in CLAUDE.md. Each item must have: velocity, source with points+time, tags, description, "Why it matters", and at least 2 source links (link to a primary source — GitHub repo, arXiv, vendor blog, or CVE record; a balanced mix, not all repos).

3. Dedup against the recent-history list below — skip anything whose primary GitHub repo already appears there, or that is the same event/CVE/story covered in the last 7 days. Each day's feed must be net-new so information accumulates instead of repeating. A repo is new if (and only if) its slug does NOT appear below. If a repo DOES appear below but has since shipped a genuinely new development (a release, a measured result, a security fix), you may cover that development — but write it as an explicit update ("since we covered X on <date>, it has …"), never as a fresh discovery.

RECENT HISTORY (previous 7 days — do NOT repeat these repos or stories):
${RECENT_HISTORY:-"(none — first days of the feed)"}

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

  # Run the learnt agent on the new batch (writes its own commit + push).
  # SKIP_AGENT_DEPLOY=1 → agent-run.sh skips its own build+deploy; this script deploys below.
  echo "Running learnt agent…"
  SKIP_AGENT_DEPLOY=1 bash agent-run.sh "$TODAY"

  # Build and deploy to Cloudflare Pages
  echo "Building…"
  node build.js 2>&1
  echo "Deploying to Cloudflare Pages…"
  npx wrangler pages deploy dist/ --project-name=trending-md --commit-dirty=true 2>&1
  echo "Deployed."
fi

# Magichand tracking (non-blocking)
# status:"done" + doneAt → the record is the COMPLETED automation batch (claude -p
# already ran above), so it must not be picked up as a new work order and must not
# render as a multi-day open-ended span on the gantt.
curl -s -X POST http://localhost:8777/api/feature-todo \
  -H 'Content-Type: application/json' \
  -d "{\"feature\":\"general\",\"project\":\"trending-md\",\"text\":\"[auto] $TODAY $(date +%H:%M) batch — $MODE mode\",\"taskKind\":\"daily-feed\",\"status\":\"done\"}" \
  || echo "(magichand portal not reachable)"

echo "=== generate-feed $TODAY done $(date) ==="
