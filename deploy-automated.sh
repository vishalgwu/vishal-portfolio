#!/bin/bash

#############################################
# Portfolio Deployment Script
# Automates: GitHub Pages Setup & Deployment
# For: Vishal Fulsundar (vishalgwu)
#############################################

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
GITHUB_USERNAME="vishalgwu"
REPO_NAME="vishalgwu.github.io"
GITHUB_REPO="$GITHUB_USERNAME/$REPO_NAME"
REPO_URL="https://github.com/$GITHUB_REPO.git"
LIVE_URL="https://$REPO_NAME"

echo -e "${BLUE}"
echo "╔═══════════════════════════════════════════════════════════╗"
echo "║     🚀 Vishal's Portfolio - GitHub Pages Deployment       ║"
echo "║           Automated Setup & Deployment Script             ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo -e "${NC}"
echo ""

# Check prerequisites
echo -e "${YELLOW}📋 Checking Prerequisites...${NC}"
echo ""

# Check git
if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ Git not installed${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Git installed${NC}"

# Check GitHub CLI
if ! command -v gh &> /dev/null; then
    echo -e "${RED}❌ GitHub CLI not installed${NC}"
    echo "   Install from: https://cli.github.com"
    exit 1
fi
echo -e "${GREEN}✓ GitHub CLI installed${NC}"

# Check authentication
echo ""
echo -e "${YELLOW}🔐 Checking GitHub Authentication...${NC}"

if gh auth status &> /dev/null; then
    echo -e "${GREEN}✓ Already authenticated${NC}"
    gh auth status
else
    echo -e "${YELLOW}⚠️  Not authenticated yet${NC}"
    echo ""
    echo "Run the following to authenticate:"
    echo -e "${BLUE}  gh auth login${NC}"
    echo ""
    echo "Then run this script again."
    exit 1
fi

echo ""
echo -e "${YELLOW}📂 Setting Up Repository...${NC}"
echo ""

# Get current directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
echo "Current directory: $SCRIPT_DIR"
echo ""

# Check if portfolio files exist
if [ ! -f "index.html" ]; then
    echo -e "${RED}❌ index.html not found in current directory${NC}"
    echo "   Please run this script from the portfolio directory"
    exit 1
fi
echo -e "${GREEN}✓ Portfolio files found${NC}"

# Initialize git if needed
if [ ! -d ".git" ]; then
    echo -e "${YELLOW}Initializing git repository...${NC}"
    git init
    git config user.email "vishalfulsundar2017@gmail.com"
    git config user.name "Vishal Fulsundar"
    echo -e "${GREEN}✓ Git initialized${NC}"
else
    echo -e "${GREEN}✓ Git already initialized${NC}"
fi

echo ""
echo -e "${YELLOW}📦 Creating GitHub Repository...${NC}"
echo ""
echo "This will:"
echo "  • Create repository: $GITHUB_REPO"
echo "  • Make it public (required for GitHub Pages)"
echo "  • Set up automatic deployment"
echo ""

# Create repository with gh CLI
# This does: create repo + add remote + push all files
if gh repo create "$REPO_NAME" --public --source=. --remote=origin --push 2>&1; then
    echo ""
    echo -e "${GREEN}✓ Repository created and files pushed!${NC}"
else
    echo ""
    echo -e "${YELLOW}ℹ️  Repository might already exist${NC}"
    echo "   Adding remote and pushing files..."
    
    # Check if remote already exists
    if git remote | grep -q origin; then
        echo "Remote 'origin' already configured"
    else
        git remote add origin "$REPO_URL"
    fi
    
    # Push files
    git add .
    git commit -m "Portfolio deployment [$(date +%Y-%m-%d)]" || true
    git branch -M main
    git push -u origin main
    echo -e "${GREEN}✓ Files pushed to GitHub${NC}"
fi

echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}🎉 Deployment Initiated!${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo ""

echo "What happens next:"
echo "  1. GitHub Actions workflow starts (check Actions tab)"
echo "  2. Your site builds and deploys"
echo "  3. Live at: $LIVE_URL (in 2-5 minutes)"
echo ""

echo -e "${YELLOW}📍 Important Links:${NC}"
echo "  Repository:    https://github.com/$GITHUB_REPO"
echo "  Actions:       https://github.com/$GITHUB_REPO/actions"
echo "  Settings:      https://github.com/$GITHUB_REPO/settings/pages"
echo "  Live Site:     $LIVE_URL"
echo ""

echo -e "${YELLOW}✅ Next Steps:${NC}"
echo ""
echo "1️⃣  Wait 2-5 minutes for first deployment"
echo ""
echo "2️⃣  Check deployment status:"
echo -e "   ${BLUE}gh repo view $GITHUB_REPO --web${NC}  (opens Actions tab)"
echo ""
echo "3️⃣  Visit your live site:"
echo -e "   ${BLUE}open $LIVE_URL${NC}  (or copy URL to browser)"
echo ""
echo "4️⃣  Share your portfolio:"
echo -e "   Add to LinkedIn, resume, and email signature!"
echo ""

echo -e "${YELLOW}📝 To Update Later:${NC}"
echo ""
echo "  1. Edit index.html locally"
echo "  2. Run: git add . && git commit -m 'Update portfolio' && git push"
echo "  3. GitHub Actions auto-deploys (1-2 minutes)"
echo ""

echo -e "${YELLOW}🔗 Useful Commands:${NC}"
echo ""
echo "  # Check deployment status"
echo -e "  ${BLUE}gh repo view $GITHUB_REPO --web${NC}"
echo ""
echo "  # View recent commits"
echo -e "  ${BLUE}git log --oneline -5${NC}"
echo ""
echo "  # Check GitHub Pages settings"
echo -e "  ${BLUE}gh repo view $GITHUB_REPO --web --template='settings/pages'${NC}"
echo ""

echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${GREEN}✨ Your portfolio is deploying! Check back in 2-5 minutes.${NC}"
echo ""
echo -e "${BLUE}Portfolio URL: $LIVE_URL${NC}"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Optionally open in browser
read -p "Would you like to open GitHub Actions in your browser? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    gh repo view "$GITHUB_REPO" --web
fi

echo -e "${GREEN}Done! 🎉${NC}"
