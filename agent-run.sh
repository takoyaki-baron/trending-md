#!/bin/bash
# Learnt-agent runner — headless claude -p after each feed batch.
# Pass 1 (learn): reads identity + memory + knowledge TOC + today's feed, rewrites the memory
#   window + knowledge library, and translates everything to zh/jp.
# Pass 2 (act): executes the agent's own capability-expansion todos from en/action.md, writes a
#   dated log entry (Plan/Did/Result), and translates en/action.md to zh/jp.
set -euo pipefail

# deepseek-v4-pro isn't in Claude Code's model registry, so auto-compact assumes a 200k window.
# Disable that enforcement so the API reports the real context window instead.
export CLAUDE_CODE_DISABLE_UNKNOWN_MODEL_WINDOW_ENFORCEMENT=1

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

# ── Pass 2: act — advance the agent's own Agenda (research + self-iteration) ──
if [ -f "en/action.md" ]; then
  ACTION_PROMPT_FILE=$(mktemp /tmp/agent-action-prompt.XXXXXX)
  NOW="$(TZ=Asia/Shanghai date '+%Y-%m-%d %H:%M')"
  cat > "$ACTION_PROMPT_FILE" << ENDACTIONPROMPT
You are the trending.md learnt agent's action executor. Follow agent/AGENT.md — its "Self-execution"
and "Output contract" sections, and the immutable Purpose.

The current time (UTC+8) is $NOW — use it verbatim for your log entry's "### YYYY-MM-DD HH:MM" header.

Read these files first:
1. agent/AGENT.md — your identity + operating rules
2. en/action.md — your action page (the Agenda + log)
3. en/agent.md — your memory window (context)

Then do exactly what agent/AGENT.md's "Self-execution" section says:
1. Pick 1–3 open "[ ]" items from the "## Agenda" (mix the Research and System buckets) that you
   can genuinely advance this run; flip them to "[~]".
2. Execute them with full repo + web access. The outcome MUST change en/agent.md or the site
   workflow itself (build.js, agent-run.sh, i18n.js, generate-feed.sh, CLAUDE.md, …) — not merely
   a knowledge file. Flip finished items to "[x]" with a "(→ log $NOW)" pointer.
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

# ── Pass 3: MCP tool-contract drift snapshot (independent pin-and-diff data point) ──
# mcpindex.ai publishes a fingerprint-only drift ledger this agent can't check against itself, so we
# keep our own: each run snapshots tools/list for a set of public MCP servers, hashes every tool
# definition, and diffs consecutive snapshots (same method as mcp-scan pinning). Best-effort — a
# failed/offline snapshot never blocks the run. See agent/tools/mcp-snapshot.mjs.
SNAP_DIR="$REPO_DIR/agent/data/mcp-snapshots"
SNAP_TODAY="$SNAP_DIR/$TODAY.json"
if [ ! -f "$SNAP_TODAY" ]; then
  node "$REPO_DIR/agent/tools/mcp-snapshot.mjs" snapshot \
    --manifest "$REPO_DIR/agent/tools/mcp-servers.json" --out "$SNAP_TODAY" 2>&1 \
    || echo "mcp-snapshot failed (non-fatal)"
  PREV="$(ls -1 "$SNAP_DIR"/*.json 2>/dev/null | grep -v "/$TODAY.json$" | sort | tail -1 || true)"
  if [ -n "$PREV" ] && [ -f "$SNAP_TODAY" ]; then
    node "$REPO_DIR/agent/tools/mcp-snapshot.mjs" diff "$PREV" "$SNAP_TODAY" 2>&1 || true
  fi
fi

# ── Pass 4: evidence-tier adoption watch (standing, best-effort) ──
# caveman's `inferred`/`benchmark_counterfactual`/`verified` claim-grading vocabulary had exactly one
# adopter across 27 manual checks (08-19 → 09-01). Rather than an agenda line per run, this watch
# fingerprints GitHub code for the vocabulary and reports only NEW repos — a second adopter surfaces
# itself in the run log. See agent/tools/evidence-tier-watch.mjs.
node "$REPO_DIR/agent/tools/evidence-tier-watch.mjs" \
  --state "$REPO_DIR/agent/data/evidence-tier-watch.json" 2>&1 \
  || echo "evidence-tier watch failed (non-fatal)"

# ── Pass 5: release watch (standing, best-effort) ──
# Two agenda threads (thesis 5 routing-DSL status-quo checks; thesis 8 skills-eval no-submission
# checks) kept degrading into per-run manual GitHub lookups whose "no change" was the data point.
# This watch pins latest release tag + pushed_at + stars + README adoption fingerprints (SkillsBench/
# vals.ai) for a manifest of watched repos and reports ONLY changes — a new routing-DSL release or a
# skill repo adopting the shared corpus surfaces itself in the run log. See agent/tools/release-watch.mjs.
node "$REPO_DIR/agent/tools/release-watch.mjs" \
  --manifest "$REPO_DIR/agent/tools/release-watch.json" \
  --state "$REPO_DIR/agent/data/release-watch.json" 2>&1 \
  || echo "release watch failed (non-fatal)"

# ── Pass 6: pending-disclosure watch (standing, best-effort) ──
# Security watches whose "no disclosure yet" is the data point (opened 09-02 with the Astra
# zero-days: a self-graded report whose externally checkable claim is a pending disclosure).
# Queries NVD (keyword, since-date filtered) + HN (Algolia search) and reports ONLY new hits —
# the disclosure surfaces itself in the run log. openai.com 403s a plain fetch, so the vendor
# post itself can't be fingerprinted. See agent/tools/disclosure-watch.mjs.
node "$REPO_DIR/agent/tools/disclosure-watch.mjs" \
  --manifest "$REPO_DIR/agent/tools/disclosure-watch.json" \
  --state "$REPO_DIR/agent/data/disclosure-watch.json" 2>&1 \
  || echo "disclosure watch failed (non-fatal)"

# Commit + push agent files. Include the site-workflow files the action executor is told to
# change (build.js, i18n.js, generate-feed.sh, agent-run.sh, CLAUDE.md, sources/, feed/) — otherwise
# its edits get orphaned in the working tree and clobber the next run's `git pull --ff-only`.
git add en/agent.md zh/agent.md jp/agent.md en/action.md zh/action.md jp/action.md agent/ \
  build.js i18n.js generate-feed.sh agent-run.sh CLAUDE.md sources/ en/feed/ zh/feed/ jp/feed/ 2>/dev/null || true
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
