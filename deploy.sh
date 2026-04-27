#!/usr/bin/env bash
# ============================================================
#  deploy.sh - Buildora Homes deployment script
#  Usage:  sudo bash deploy.sh
#  Requires: node, npm, nginx, openssl
# ============================================================
set -e

APP_NAME="buildora-homes"
REPO_URL="https://github.com/Suman-MS-sudo/BuildoraHomes.git"
DEPLOY_DIR="$(cd "$(dirname "$0")" && pwd)"
WEB_ROOT="/var/www/$APP_NAME"
NGINX_CONF="/etc/nginx/sites-available/$APP_NAME"
DOMAIN="${DOMAIN:-buildorahomes.co.in}"
LE_CERT="/etc/letsencrypt/live/$DOMAIN/fullchain.pem"
LE_KEY="/etc/letsencrypt/live/$DOMAIN/privkey.pem"
SELF_CERT_DIR="/etc/ssl/$APP_NAME"
SELF_CERT="$SELF_CERT_DIR/fullchain.pem"
SELF_KEY="$SELF_CERT_DIR/privkey.pem"

echo "========================================"
echo "  Buildora Homes - Deploy Script"
echo "========================================"

# -- 1. Pull latest from git ----------------------------------------
echo ""
echo "[1/4] Pulling latest code from GitHub..."
cd "$DEPLOY_DIR"
if [ -d ".git" ]; then
  git pull origin main
else
  echo "  Not a git repo. Cloning fresh..."
  cd ..
  git clone "$REPO_URL" BuildoraHomes
  cd BuildoraHomes
fi

# -- 2. Install dependencies ----------------------------------------
echo ""
echo "[2/4] Installing dependencies..."
npm install --legacy-peer-deps

# -- 3. Build the app -----------------------------------------------
echo ""
echo "[3/4] Building production bundle..."
npm run build

# -- 4. Deploy via nginx --------------------------------------------
echo ""
echo "[4/4] Configuring nginx..."

# Copy dist to web root
mkdir -p "$WEB_ROOT"
cp -r dist/. "$WEB_ROOT/"

# Determine SSL cert to use
if [ -f "$LE_CERT" ] && [ -f "$LE_KEY" ]; then
  SSL_CERT="$LE_CERT"
  SSL_KEY="$LE_KEY"
  CERT_NOTE="Let's Encrypt (trusted)"
  echo "  Using Let's Encrypt certificate."
else
  mkdir -p "$SELF_CERT_DIR"
  if [ ! -f "$SELF_CERT" ]; then
    echo "  Generating self-signed SSL certificate (valid 10 years)..."
    openssl req -x509 -nodes -days 3650 -newkey rsa:2048 \
      -keyout "$SELF_KEY" \
      -out "$SELF_CERT" \
      -subj "/CN=$DOMAIN" 2>/dev/null
  fi
  SSL_CERT="$SELF_CERT"
  SSL_KEY="$SELF_KEY"
  CERT_NOTE="self-signed (browser will warn)"
  echo "  Using self-signed certificate."
fi

# Write nginx config
cat > "$NGINX_CONF" << NGINXEOF
server {
    listen 80;
    listen [::]:80;
    server_name _;
    return 301 https://\$host\$request_uri;
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name _;

    ssl_certificate     $SSL_CERT;
    ssl_certificate_key $SSL_KEY;
    ssl_protocols       TLSv1.2 TLSv1.3;
    ssl_ciphers         HIGH:!aNULL:!MD5;

    root $WEB_ROOT;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
NGINXEOF

# Enable site, disable nginx default
ln -sf "$NGINX_CONF" /etc/nginx/sites-enabled/$APP_NAME
rm -f /etc/nginx/sites-enabled/default 2>/dev/null || true

# Stop PM2 serve instance (nginx takes over)
pm2 delete "$APP_NAME" 2>/dev/null || true
pm2 save --force 2>/dev/null || true

# Test config and reload nginx
nginx -t
systemctl reload nginx

SERVER_IP=$(curl -s ifconfig.me 2>/dev/null || echo "<server-ip>")

echo ""
echo "========================================"
echo "  Buildora Homes is live!"
echo "     https://$SERVER_IP  (HTTPS port 443)"
echo "     http://$SERVER_IP   (redirects to HTTPS)"
echo ""
echo "  Certificate: $CERT_NOTE"
if [ "$CERT_NOTE" = "self-signed (browser will warn)" ]; then
  echo "  Browser tip: click Advanced > Proceed to accept self-signed cert"
  echo ""
  echo "  To upgrade to a trusted cert later:"
  echo "    1. Point DNS: $DOMAIN -> $SERVER_IP"
  echo "    2. sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN"
  echo "    3. sudo bash deploy.sh"
fi
echo ""
echo "  Useful commands:"
echo "    systemctl status nginx    - check nginx"
echo "    systemctl reload nginx    - reload config"
echo "    nginx -t                  - test config"
echo "========================================"
