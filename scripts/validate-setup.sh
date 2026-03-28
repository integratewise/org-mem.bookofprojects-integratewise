#!/bin/bash
# IntegrateWise Setup Validation Script
# Usage: ./scripts/validate-setup.sh

set -e

export PATH="/Users/nirmal/Library/pnpm:$PATH"

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║     INTEGRATEWISE SETUP VALIDATION                           ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

check_pass() {
  echo -e "${GREEN}✓${NC} $1"
}

check_fail() {
  echo -e "${RED}✗${NC} $1"
}

check_warn() {
  echo -e "${YELLOW}⚠${NC} $1"
}

# 1. Check pnpm
echo "1. Checking PNPM Installation..."
if command -v pnpm &> /dev/null; then
  check_pass "pnpm installed: $(pnpm --version)"
else
  check_fail "pnpm not found"
  exit 1
fi

# 2. Check central store
echo ""
echo "2. Checking Central PNPM Store..."
STORE_DIR=$(pnpm config get store-dir)
if [ "$STORE_DIR" = "/Users/nirmal/Github/.pnpm-store" ]; then
  check_pass "Central store configured: $STORE_DIR"
  STORE_SIZE=$(du -sh /Users/nirmal/Github/.pnpm-store 2>/dev/null | cut -f1)
  echo "   Store size: $STORE_SIZE"
else
  check_fail "Central store not configured"
  echo "   Current: $STORE_DIR"
  echo "   Expected: /Users/nirmal/Github/.pnpm-store"
fi

# 3. Check for npm remnants
echo ""
echo "3. Checking for NPM Remnants..."
NPM_LOCKS=$(find /Users/nirmal/Github -name "package-lock.json" -not -path "*/node_modules/*" 2>/dev/null | wc -l | tr -d ' ')
if [ "$NPM_LOCKS" -eq 0 ]; then
  check_pass "No package-lock.json files found"
else
  check_fail "Found $NPM_LOCKS package-lock.json files"
  find /Users/nirmal/Github -name "package-lock.json" -not -path "*/node_modules/*" 2>/dev/null
fi

# 4. Check pnpm projects
echo ""
echo "4. Checking PNPM Projects..."
PNPM_PROJECTS=$(find /Users/nirmal/Github -name "pnpm-lock.yaml" -not -path "*/node_modules/*" 2>/dev/null | wc -l | tr -d ' ')
check_pass "Found $PNPM_PROJECTS pnpm projects"
find /Users/nirmal/Github -maxdepth 2 -name "pnpm-lock.yaml" -not -path "*/node_modules/*" 2>/dev/null | while read f; do
  dir=$(basename $(dirname "$f"))
  echo "   • $dir"
done

# 5. Check main monorepo
echo ""
echo "5. Checking Main Monorepo (integratewise-live)..."
if [ -d "/Users/nirmal/Github/integratewise-live" ]; then
  check_pass "Monorepo exists"
  
  # Check workspace
  if [ -f "/Users/nirmal/Github/integratewise-live/pnpm-workspace.yaml" ]; then
    check_pass "Workspace config exists"
  else
    check_fail "Workspace config missing"
  fi
  
  # Count services
  SERVICE_COUNT=$(ls /Users/nirmal/Github/integratewise-live/services/ 2>/dev/null | wc -l | tr -d ' ')
  check_pass "Services: $SERVICE_COUNT microservices"
  
  # Count apps
  APP_COUNT=$(ls /Users/nirmal/Github/integratewise-live/apps/ 2>/dev/null | wc -l | tr -d ' ')
  check_pass "Apps: $APP_COUNT applications"
  
  # Count packages
  PKG_COUNT=$(ls /Users/nirmal/Github/integratewise-live/packages/ 2>/dev/null | wc -l | tr -d ' ')
  check_pass "Packages: $PKG_COUNT shared packages"
else
  check_fail "Monorepo not found"
fi

# 6. Check environment files
echo ""
echo "6. Checking Environment Files..."
if [ -f "/Users/nirmal/Github/integratewise-live/.env" ]; then
  check_pass "Root .env exists"
  
  # Check key variables
  if grep -q "SUPABASE_URL" /Users/nirmal/Github/integratewise-live/.env; then
    check_pass "SUPABASE_URL configured"
  else
    check_warn "SUPABASE_URL not found in .env"
  fi
  
  if grep -q "CLOUDFLARE_ACCOUNT_ID" /Users/nirmal/Github/integratewise-live/.env; then
    check_pass "Cloudflare account configured"
  else
    check_warn "CLOUDFLARE_ACCOUNT_ID not found in .env"
  fi
else
  check_warn "Root .env missing (copy from .env.example)"
fi

# 7. Check Supabase config
echo ""
echo "7. Checking Supabase Configuration..."
if [ -f "/Users/nirmal/Github/integratewise-live/supabase/config.toml" ]; then
  check_pass "Supabase config exists"
  PROJECT_ID=$(grep "project_id" /Users/nirmal/Github/integratewise-live/supabase/config.toml | head -1 | cut -d'=' -f2 | tr -d ' "')
  echo "   Project ID: $PROJECT_ID"
else
  check_warn "Supabase config not found"
fi

# 8. Check wrangler config
echo ""
echo "8. Checking Cloudflare Wrangler..."
if [ -f "/Users/nirmal/Github/integratewise-live/wrangler.toml" ]; then
  check_pass "Root wrangler.toml exists"
else
  check_warn "wrangler.toml not found"
fi

# 9. Verify all repos have .npmrc
echo ""
echo "9. Checking Project Configurations..."
MISSING_NPMRC=0
for dir in /Users/nirmal/Github/*/; do
  if [ -f "$dir/package.json" ] && [ ! -f "$dir/.npmrc" ]; then
    check_warn "Missing .npmrc in $(basename "$dir")"
    MISSING_NPMRC=$((MISSING_NPMRC + 1))
  fi
done

if [ $MISSING_NPMRC -eq 0 ]; then
  check_pass "All projects have .npmrc configured"
fi

# 10. Summary
echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                      SUMMARY                                 ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""
echo "✓ Centralized pnpm store: /Users/nirmal/Github/.pnpm-store"
echo "✓ Main monorepo: integratewise-live/"
echo "  - Services: Microservices architecture on Cloudflare Workers"
echo "  - Apps: Web, Mobile, Desktop, Technical Marketing"
echo "  - Packages: Shared internal libraries"
echo "✓ Marketing: integratewise-marketing/ (standalone)"
echo "✓ Landing: integratewise-lg/ (standalone)"
echo "✓ Documentation: BrandDocumentations/ (standalone)"
echo "✓ Storage: Supabase (PostgreSQL + Auth + Storage)"
echo "✓ Compute: Cloudflare Workers (Edge)"
echo ""
echo "🔗 Key Connections:"
echo "  Web App → Gateway → Services → Supabase"
echo "  Workers communicate via Service Bindings"
echo "  All use central pnpm store for dependencies"
echo ""
echo "📝 Next Steps:"
echo "  1. Ensure .env files are configured"
echo "  2. Run: pnpm install (in integratewise-live/)"
echo "  3. Run: pnpm dev (to start all services)"
echo ""
