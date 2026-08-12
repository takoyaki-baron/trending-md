#!/bin/bash
# Learnt-agent runner — headless claude -p after each feed batch.
# Reads the agent's identity + memory + knowledge TOC + today's feed,
# then rewrites the memory window and translates it to zh/jp.
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
2. Create/update agent/knowledge/en/*.md if useful, then translate each to agent/knowledge/zh/*.md + agent/knowledge/jp/*.md, and update every agent/knowledge/<lang>/index.md (keep the `topic:` slug identical across locales).
3. Translate en/agent.md → zh/agent.md and jp/agent.md (keep repo names, URLs, and code identifiers untranslated).

Keep en/agent.md a compact distilled summary — far under the 1M-token cap.
ENDPROMPT

echo "Running claude -p (agent)…"
claude -p "$(cat "$PROMPT_FILE")" 2>&1
echo "Claude exit code: $?"
rm -f "$PROMPT_FILE"

# Commit + push agent files
git add en/agent.md zh/agent.md jp/agent.md agent/ 2>/dev/null || true
if git diff --cached --quiet; then
  echo "No agent changes to commit"
else
  git commit -m "agent: learn from $TODAY feed batch" 2>&1
  git push origin master 2>&1
  echo "Agent notes committed and pushed."
fi

echo "=== agent-run $TODAY done $(date) ==="
