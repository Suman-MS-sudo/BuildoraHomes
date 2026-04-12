#!/usr/bin/env bash
# ============================================================
#  deploy.sh — Buildora Homes deployment script
#  Usage:  sudo bash deploy.sh
#  Requires: node, npm, pm2 (npm install -g pm2), serve (npm install -g serve)
#
#  Set DOMAIN below to your actual domain for Let's Encrypt SSL.
#  Certs are expected at /etc/letsencrypt/live/$DOMAIN/
# ============================================================
set -e

APP_NAME="buildora-homes"
REPO_URL="https://github.com/Suman-MS-sudo/BuildoraHomes.git"
DEPLOY_DIR="$(cd "$(dirname "$0")" && pwd)"

# ── SSL / port config ────────────────────────────────────────
DOMAIN="${DOMAIN:-hmconstructions.in}"          # override: DOMAIN=example.com bash deploy.sh
SSL_CERT="/etc/letsencrypt/live/$DOMAIN/fullchain.pem"
SSL_KEY="/etc/letsencrypt/live/$DOMAIN/privkey.pem"
HTTPS_PORT=443
HTTP_PORT=80

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

# ── 4. Start / restart with PM2 on port 443 ──────────────────
echo ""
echo "[4/4] Starting app with PM2..."

# Install 'serve' globally if not present
if ! command -v serve &> /dev/null; then
  echo "  Installing 'serve' globally..."
  npm install -g serve
fi

# Stop old instance if running
pm2 delete "$APP_NAME" 2>/dev/null || true

if [ -f "$SSL_CERT" ] && [ -f "$SSL_KEY" ]; then
  # ── HTTPS on port 443 ──
  echo "  SSL certs found — serving HTTPS on port $HTTPS_PORT"
  pm2 start serve --name "$APP_NAME" -- \
    -s dist \
    -l $HTTPS_PORT \
    --ssl-cert "$SSL_CERT" \
    --ssl-key  "$SSL_KEY"
  SCHEME="https"
  PORT=$HTTPS_PORT
else
  # ── Fallback: HTTP on port 80 ──
  echo "  ⚠  SSL certs not found at $SSL_CERT"
  echo "     Run: sudo certbot certonly --standalone -d $DOMAIN"
  echo "     Falling back to HTTP on port $HTTP_PORT"
  pm2 start serve --name "$APP_NAME" -- -s dist -l $HTTP_PORT
  SCHEME="http"
  PORT=$HTTP_PORT
fi

# Save PM2 process list so it survives reboots
pm2 save

echo ""
echo "========================================"
echo "  ✓  Buildora Homes is live!"
echo "     $SCHEME://$DOMAIN"
echo "     $SCHEME://localhost:$PORT"
echo ""
echo "  Useful commands:"
echo "    pm2 logs $APP_NAME      — view logs"
echo "    pm2 status              — check status"
echo "    pm2 restart $APP_NAME   — restart app"
echo "    pm2 stop $APP_NAME      — stop app"
echo "========================================"
