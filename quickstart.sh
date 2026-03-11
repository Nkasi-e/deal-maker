#!/usr/bin/env bash
# DealMaker – one-time setup. Run from repo root: ./quickstart.sh

set -e

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$REPO_ROOT"

echo "→ DealMaker quickstart (repo root: $REPO_ROOT)"
echo ""

# 1. Check Node.js
if ! command -v node &>/dev/null; then
  echo "✗ Node.js is not installed. Install Node.js 18+ from https://nodejs.org or via nvm."
  exit 1
fi
NODE_VER=$(node -v | sed 's/^v//' | cut -d. -f1)
if [ "$NODE_VER" -lt 18 ] 2>/dev/null; then
  echo "✗ Node.js 18+ required. Current: $(node -v)"
  exit 1
fi
echo "✓ Node.js $(node -v)"

# 2. Ensure pnpm is available
if ! command -v pnpm &>/dev/null; then
  echo "→ pnpm not found. Enabling corepack to use pnpm..."
  if command -v corepack &>/dev/null; then
    corepack enable
    corepack prepare pnpm@9.15.0 --activate
  else
    echo "  Installing pnpm via npm..."
    npm install -g pnpm@9
  fi
fi
echo "✓ pnpm $(pnpm -v)"

# 3. Install dependencies
echo ""
echo "→ Installing dependencies (pnpm install)..."
pnpm install
echo "✓ Dependencies installed"

# 4. Optional: extension .env from example (no overwrite)
EXT_ENV="plug-extension/.env"
EXT_EXAMPLE="plug-extension/.env.example"
if [ -f "$EXT_EXAMPLE" ] && [ ! -f "$EXT_ENV" ]; then
  cp "$EXT_EXAMPLE" "$EXT_ENV"
  echo "✓ Created $EXT_ENV from .env.example (add your API keys there for the extension)"
elif [ -f "$EXT_ENV" ]; then
  echo "✓ $EXT_ENV already exists (skipped)"
fi

echo ""
echo "=============================================="
echo "  Setup complete."
echo "=============================================="
echo ""
echo "Next steps:"
echo "  make help       – show all make targets"
echo "  make frontend   – start web app at http://localhost:3000"
echo "  make extension  – start extension dev server"
echo "  make both       – start frontend + extension (same terminal)"
echo ""
echo "Or use pnpm directly: pnpm run dev:frontend | pnpm run dev:extension"
echo ""
