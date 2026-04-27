#!/usr/bin/env bash
# ============================================================
#  setup-ssl.sh - Install certbot & generate Let's Encrypt cert
#  Usage:  sudo bash setup-ssl.sh
#  Requires: nginx already installed and serving the site on port 80
# ============================================================
set -e

DOMAIN="${DOMAIN:-buildorahomes.co.in}"
WWW_DOMAIN="www.$DOMAIN"
EMAIL="${EMAIL:-admin@buildorahomes.co.in}"
APP_NAME="buildora-homes"

echo "========================================"
echo "  SSL Setup for $DOMAIN"
echo "========================================"

# -- 0. Must be root ------------------------------------------------
if [ "$(id -u)" -ne 0 ]; then
  echo "Please run as root (sudo bash setup-ssl.sh)"
  exit 1
fi

# -- 1. Detect package manager --------------------------------------
if command -v apt-get >/dev/null 2>&1; then
  PKG="apt"
elif command -v dnf >/dev/null 2>&1; then
  PKG="dnf"
elif command -v yum >/dev/null 2>&1; then
  PKG="yum"
else
  echo "Unsupported package manager. Install certbot manually."
  exit 1
fi

# -- 2. Install certbot ---------------------------------------------
echo ""
echo "[1/5] Installing certbot..."
case "$PKG" in
  apt)
    export DEBIAN_FRONTEND=noninteractive
    apt-get update -y
    apt-get install -y certbot python3-certbot-nginx
    ;;
  dnf)
    dnf install -y certbot python3-certbot-nginx
    ;;
  yum)
    yum install -y epel-release || true
    yum install -y certbot python2-certbot-nginx || yum install -y certbot python-certbot-nginx
    ;;
esac

# -- 3. Ensure nginx is running -------------------------------------
echo ""
echo "[2/5] Verifying nginx is running..."
systemctl enable nginx >/dev/null 2>&1 || true
systemctl start nginx  >/dev/null 2>&1 || true
nginx -t

# -- 4. Make sure server_name matches the domain --------------------
NGINX_CONF="/etc/nginx/sites-available/$APP_NAME"
if [ -f "$NGINX_CONF" ]; then
  echo ""
  echo "[3/5] Updating server_name in $NGINX_CONF ..."
  # Replace any 'server_name _;' with the real domains so certbot can match
  sed -i "s/server_name _;/server_name $DOMAIN $WWW_DOMAIN;/g" "$NGINX_CONF"
  nginx -t
  systemctl reload nginx
else
  echo ""
  echo "[3/5] $NGINX_CONF not found - skipping server_name patch."
  echo "     Make sure your nginx config has: server_name $DOMAIN $WWW_DOMAIN;"
fi

# -- 5. Check DNS for www subdomain ---------------------------------
INCLUDE_WWW=1
if ! getent hosts "$WWW_DOMAIN" >/dev/null 2>&1; then
  echo ""
  echo "  WARNING: $WWW_DOMAIN has no DNS record - skipping www in cert."
  echo "           Add an A record for www -> server IP and re-run to include it."
  INCLUDE_WWW=0
fi

# -- 6. Request certificate -----------------------------------------
echo ""
echo "[4/5] Requesting Let's Encrypt certificate..."
CERTBOT_ARGS=(--nginx --non-interactive --agree-tos --redirect --email "$EMAIL" -d "$DOMAIN")
if [ "$INCLUDE_WWW" = "1" ]; then
  CERTBOT_ARGS+=(-d "$WWW_DOMAIN")
fi
certbot "${CERTBOT_ARGS[@]}"

# -- 6. Enable auto-renew + restart ---------------------------------
echo ""
echo "[5/5] Enabling auto-renewal and restarting services..."
systemctl enable certbot.timer >/dev/null 2>&1 || true
systemctl start  certbot.timer >/dev/null 2>&1 || true
certbot renew --dry-run

nginx -t
systemctl reload nginx
pm2 restart "$APP_NAME" >/dev/null 2>&1 || true

echo ""
echo "========================================"
echo "  SSL successfully installed!"
echo "     https://$DOMAIN"
echo "     https://$WWW_DOMAIN"
echo ""
echo "  Cert path : /etc/letsencrypt/live/$DOMAIN/fullchain.pem"
echo "  Key path  : /etc/letsencrypt/live/$DOMAIN/privkey.pem"
echo "  Auto-renew: certbot.timer (twice daily)"
echo "========================================"
