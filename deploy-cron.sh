#!/bin/bash
# Nightly build+deploy for trending.md — fired by launchd at 10pm local
set -euo pipefail

REPO_DIR="/Users/kelong/developer/github/trending-md"
LOG_DIR="$REPO_DIR/.cron-logs"
mkdir -p "$LOG_DIR"

LOG="$LOG_DIR/deploy-$(date +%Y-%m-%d).log"
exec >"$LOG" 2>&1

echo "=== trending.md nightly deploy $(date) ==="

cd "$REPO_DIR"

# Pull latest source (if any remote changes)
git pull origin master --ff-only || echo "(no remote changes or pull skipped)"

# Build
echo "Building…"
node build.js

# Deploy
echo "Deploying…"
npx wrangler pages deploy dist/ --project-name=trending-md --commit-dirty=true

echo "=== done $(date) ==="
