#!/usr/bin/env bash
# ============================================================
#  deploy.sh — Buildora Homes deployment script
#  Usage:  bash deploy.sh
#  Requires: node, npm, pm2 (npm install -g pm2)
# ============================================================
set -e

APP_NAME="buildora-homes"
REPO_URL="https://github.com/Suman-MS-sudo/BuildoraHomes.git"
DEPLOY_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "========================================"
echo "  Buildora Homes — Deploy Script"
echo "========================================"

# ── 1. Pull latest from git ──────────────────────────────────
echo ""
echo "[1/4] Pulling latest code from GitHub..."
cd "$DEPLOY_DIR"

if [ -d ".git" ]; then
  git pull origin main
else
  echo "  Not a git repo. Cloning fresh..."
  cd ..
  git clone "$REPO_URL" hm-site
  cd hm-site
fi

# ── 2. Install dependencies ──────────────────────────────────
echo ""
echo "[2/4] Installing dependencies..."
npm install --legacy-peer-deps

# ── 3. Build the app ─────────────────────────────────────────
echo ""
echo "[3/4] Building production bundle..."
npm run build

# ── 4. Start / restart with PM2 ──────────────────────────────
echo ""
echo "[4/4] Starting app with PM2..."

# Install 'serve' globally if not present (serves the dist/ folder)
if ! command -v serve &> /dev/null; then
  echo "  Installing 'serve' globally..."
  npm install -g serve
fi

# Stop old instance if running, then start fresh
pm2 delete "$APP_NAME" 2>/dev/null || true
pm2 start serve --name "$APP_NAME" -- -s dist -l 3000

# Save PM2 process list so it survives reboots
pm2 save

echo ""
echo "========================================"
echo "  ✓  Buildora Homes is live!"
echo "     http://localhost:3000"
echo ""
echo "  Useful commands:"
echo "    pm2 logs $APP_NAME     — view logs"
echo "    pm2 status             — check status"
echo "    pm2 restart $APP_NAME  — restart app"
echo "    pm2 stop $APP_NAME     — stop app"
echo "========================================"
