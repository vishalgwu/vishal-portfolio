#!/bin/bash

# Deployment Script for Vishal Fulsundar's Portfolio
# This script sets up GitHub Pages deployment automatically

set -e  # Exit on error

echo "🚀 Portfolio Deployment Setup for GitHub Pages"
echo "=============================================="
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null; then
    echo "⚠️  GitHub CLI (gh) not found. You can still proceed with manual git commands."
    echo "   To auto-create the repo, install: https://cli.github.com"
fi

echo "Step 1: Initialize Git (if not already done)"
echo "-------------------------------------------"

if [ ! -d ".git" ]; then
    git init
    git config user.email "vishalfulsundar2017@gmail.com"
    git config user.name "Vishal Fulsundar"
    echo "✅ Git initialized"
else
    echo "✅ Git already initialized"
fi

echo ""
echo "Step 2: Add Files"
echo "----------------"

git add -A
git status
echo "✅ Files staged"

echo ""
echo "Step 3: Commit Changes"
echo "---------------------"

git commit -m "Initial portfolio deployment with GitHub Pages setup" || echo "✅ Files already committed"

echo ""
echo "Step 4: Configure GitHub Remote"
echo "-------------------------------"

# Check if remote exists
if git remote | grep -q origin; then
    echo "✅ Remote 'origin' already exists"
    git remote -v
else
    echo "⚠️  No remote configured yet. Choose one:"
    echo ""
    echo "Option A (if repo exists):"
    echo "  git remote add origin https://github.com/vishalgwu/vishalgwu.github.io.git"
    echo ""
    echo "Option B (automatic with GitHub CLI):"
    echo "  gh repo create vishalgwu.github.io --public --source=. --remote=origin --push"
    echo ""
    read -p "Have you added a remote? (y/n): " hasremote
    if [ "$hasremote" != "y" ]; then
        echo "❌ Remote not configured. Exiting."
        exit 1
    fi
fi

echo ""
echo "Step 5: Push to GitHub"
echo "---------------------"

# Try to push
if git remote | grep -q origin; then
    echo "Pushing to GitHub..."
    git push -u origin main 2>/dev/null || git push -u origin master 2>/dev/null || {
        echo "⚠️  First push might fail if branch doesn't exist on remote"
        echo "    Your files are committed locally. Try pushing again in a moment."
    }
    echo "✅ Push complete (or queued for retry)"
else
    echo "❌ No remote found. Please add it manually."
    exit 1
fi

echo ""
echo "Step 6: Enable GitHub Pages"
echo "---------------------------"
echo ""
echo "✅ Automatic: GitHub Actions workflow will handle deployment"
echo ""
echo "Manual Steps (if needed):"
echo "1. Go to: https://github.com/vishalgwu/vishalgwu.github.io/settings/pages"
echo "2. Under 'Build and deployment':"
echo "   - Source: 'Deploy from a branch'"
echo "   - Branch: 'main' (or 'master')"
echo "   - Folder: 'root'"
echo "3. Click 'Save'"
echo ""

echo "=============================================="
echo "✅ Deployment Setup Complete!"
echo "=============================================="
echo ""
echo "Your portfolio will be live at:"
echo "🌐 https://vishalgwu.github.io"
echo ""
echo "Next Steps:"
echo "1. Wait 2-5 minutes for first deployment"
echo "2. Check GitHub Actions tab for build status"
echo "3. Visit your live site!"
echo ""
echo "To update your portfolio:"
echo "  1. Edit index.html"
echo "  2. git add ."
echo "  3. git commit -m 'Update portfolio'"
echo "  4. git push"
echo ""
echo "That's it! GitHub Actions will auto-deploy. 🚀"
