# DealMaker – run from repo root
# Usage: make <target>

.PHONY: help install frontend extension build build-frontend build-extension both

# Default: show targets
help:
	@echo "DealMaker – available targets:"
	@echo ""
	@echo "  make install        Install dependencies (pnpm install)"
	@echo "  make frontend       Start web app dev server (http://localhost:3000)"
	@echo "  make extension      Start extension dev server"
	@echo "  make both           Start frontend and extension (two processes, same terminal)"
	@echo "  make build          Build frontend and extension for production"
	@echo "  make build-frontend Build web app only"
	@echo "  make build-extension Build Chrome extension only"
	@echo ""

# Install all workspace dependencies
install:
	pnpm install

# Start web app (Next.js) – http://localhost:3000
frontend:
	pnpm run dev:frontend

# Start extension (Vite) dev server
extension:
	pnpm run dev:extension

# Run both: frontend in background, extension in foreground. Ctrl+C stops extension only; stop frontend with: pkill -f "next dev"
both:
	@pnpm run dev:frontend & pnpm run dev:extension

# Build everything
build: build-frontend build-extension

build-frontend:
	pnpm run build:frontend

build-extension:
	pnpm run build:extension
