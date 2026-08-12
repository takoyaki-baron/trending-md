#!/bin/bash
# Learnt-agent runner — headless claude -p after each feed batch.
# Pass 1 (learn): reads identity + memory + knowledge TOC + today's feed, rewrites the memory
#   window + knowledge library, and translates everything to zh/jp.
# Pass 2 (act): executes the agent's own capability-expansion todos from en/action.md, writes a
#   dated log entry (Plan/Did/Result), and translates en/action.md to zh/jp.
set -euo pipefail

REPO_DIR="/Users/kelong/developer/github/trending-md"
TODAY="${1:-$(date +%Y-%m-%d)}"
LOG_DIR="$REPO_DIR/.cron-logs"
mkdir -p "$LOG_DIR"
LOG="$LOG_DIR/agent-$TODAY-$(date +%H%M).log"

exec >"$LOG" 2>&1
echo "=== agent-run $TODAY start $(date) ==="

cd "$REPO_DIR"

FEED_FILE="en/feed/$TODAY.md"
if [ ! -f "$FEED_FILE" ]; then
  echo "No feed for $TODAY, nothing to learn from. Exiting."
  exit 0
fi

# Build prompt: identity + memory + library TOC + new batch
PROMPT_FILE=$(mktemp /tmp/agent-prompt.XXXXXX)
cat > "$PROMPT_FILE" << ENDPROMPT
You are running as the trending.md learnt agent. Follow the identity and rules in agent/AGENT.md.

Read these files first:
1. agent/AGENT.md — your identity + operating rules
2. en/agent.md — your current memory window (note the last_processed marker)
3. agent/knowledge/en/index.md — your knowledge-library table of contents (canonical; the library is trilingual: en/ zh/ jp/)
4. $FEED_FILE — today's feed (your new batch of trends to learn from)

Then do exactly what agent/AGENT.md's "Output contract" says:
1. Rewrite en/agent.md — take notes on NET-NEW items only (skip anything at/before last_processed), update theses + todos, bump last_processed.
2. Create/update agent/knowledge/en/*.md if useful, then translate each to agent/knowledge/zh/*.md + agent/knowledge/jp/*.md, and update every agent/knowledge/<lang>/index.md (keep the topic: slug identical across locales).
3. Translate en/agent.md → zh/agent.md and jp/agent.md (keep repo names, URLs, and code identifiers untranslated).

Keep en/agent.md a compact distilled summary — far under the 1M-token cap.
ENDPROMPT

echo "Running claude -p (agent)…"
claude -p "$(cat "$PROMPT_FILE")" 2>&1
echo "Claude exit code: $?"
rm -f "$PROMPT_FILE"

# ── Pass 2: act — execute the agent's own capability-expansion todos ──
if [ -f "en/action.md" ]; then
  ACTION_PROMPT_FILE=$(mktemp /tmp/agent-action-prompt.XXXXXX)
  NOW="$(TZ=Asia/Shanghai date '+%Y-%m-%d %H:%M')"
  cat > "$ACTION_PROMPT_FILE" << ENDACTIONPROMPT
You are the trending.md learnt agent's action executor. Follow agent/AGENT.md — its "Self-execution"
and "Output contract" sections, and the immutable Purpose.

The current time (UTC+8) is $NOW — use it verbatim for your log entry's "### YYYY-MM-DD HH:MM" header.

Read these files first:
1. agent/AGENT.md — your identity + operating rules
2. en/action.md — your action page (active todos + log)
3. en/agent.md — your memory window (context)

Then do exactly what agent/AGENT.md's "Self-execution" section says:
1. Pick 1–3 pending todos from en/action.md that you can genuinely advance this run.
2. Execute them with full repo + web access (you may read any file, visit sources, and write
   agent/knowledge/en/*.md + their zh/jp translations as needed).
3. Prepend a new entry at the top of the "## Log" section in en/action.md (newest first). Open it
   with a "### $NOW" header (this run's timestamp, one header per run, never merge under one date),
   then "Plan:", "Did:", and "Result:" lines — link any new knowledge as [[topic]].
4. Translate en/action.md → zh/action.md and jp/action.md (keep repo names, URLs, and code
   identifiers untranslated).
ENDACTIONPROMPT

  echo "Running claude -p (action executor)…"
  claude -p "$(cat "$ACTION_PROMPT_FILE")" 2>&1
  echo "Action executor exit code: $?"
  rm -f "$ACTION_PROMPT_FILE"
else
  echo "No en/action.md found — skipping action pass."
fi

# Commit + push agent files
git add en/agent.md zh/agent.md jp/agent.md en/action.md zh/action.md jp/action.md agent/ 2>/dev/null || true
if git diff --cached --quiet; then
  echo "No agent changes to commit"
else
  git commit -m "agent: learn from $TODAY feed batch" 2>&1
  git push origin master 2>&1
  echo "Agent notes committed and pushed."

  # Build + deploy so agent self-updates go live immediately.
  # Skip when the caller (generate-feed.sh) builds+deploys right after this.
  if [ "${SKIP_AGENT_DEPLOY:-0}" != "1" ]; then
    echo "Building…"
    node build.js 2>&1
    echo "Deploying…"
    npx wrangler pages deploy dist/ --project-name=trending-md --commit-dirty=true 2>&1
    echo "Deployed."
  fi
fi

echo "=== agent-run $TODAY done $(date) ==="
