#!/usr/bin/env bash
# =============================================================================
# Wire Whop (+ site URL) into Vercel PRODUCTION from .env.whop.local, then redeploy.
#
#   1. cp .env.whop.local.example .env.whop.local
#   2. fill .env.whop.local with Bake's real Whop values
#   3. bash scripts/wire-whop.sh
#
# Idempotent: re-running replaces existing values. Empty values are skipped, so you
# can wire links first and the secret later. NEXT_PUBLIC_* are build-time, so this
# triggers a production redeploy at the end for the values to take effect.
# =============================================================================
set -euo pipefail
cd "$(dirname "$0")/.."

ENVFILE=".env.whop.local"
if [ ! -f "$ENVFILE" ]; then
  echo "Missing $ENVFILE."
  echo "Run:  cp .env.whop.local.example .env.whop.local   then fill in Bake's values."
  exit 1
fi

# Load KEY="value" lines into the environment.
set -a; . "./$ENVFILE"; set +a

VARS=(
  NEXT_PUBLIC_WHOP_CHECKOUT_DAY
  NEXT_PUBLIC_WHOP_CHECKOUT_WEEK
  NEXT_PUBLIC_WHOP_CHECKOUT_MONTH
  NEXT_PUBLIC_WHOP_CHECKOUT_PROPS
  NEXT_PUBLIC_WHOP_CHECKOUT_COACHING
  NEXT_PUBLIC_FREE_CHANNEL_URL
  NEXT_PUBLIC_SITE_URL
  WHOP_WEBHOOK_SECRET
)

set_var () {
  local name="$1" val="${2:-}"
  if [ -z "$val" ]; then echo "  skip  $name (empty)"; return; fi
  vercel env rm "$name" production --yes >/dev/null 2>&1 || true
  printf '%s' "$val" | vercel env add "$name" production >/dev/null 2>&1
  echo "  set   $name"
}

echo "Wiring Whop env into Vercel production:"
for v in "${VARS[@]}"; do set_var "$v" "${!v:-}"; done

echo "Redeploying production (NEXT_PUBLIC_* are baked at build time)..."
vercel deploy --prod --yes

echo ""
echo "Done. Verify the webhook is now armed:"
echo "  curl -s https://sports-money-games.vercel.app/api/whop/webhook   # expect configured:true"
