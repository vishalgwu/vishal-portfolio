# 🚀 Complete GitHub Pages Deployment Guide

## QUICK START (5 Minutes)

### Prerequisites
- GitHub account (you have: vishalgwu)
- Git installed ([download](https://git-scm.com/downloads))
- Terminal/Command Prompt access

---

## METHOD 1: Using GitHub CLI (Easiest - Recommended)

### Step 1: Install GitHub CLI
- **Mac:** `brew install gh`
- **Windows:** `choco install gh` or download from https://cli.github.com
- **Linux:** `sudo apt install gh`

### Step 2: Authenticate
```bash
gh auth login
# Select: GitHub.com
# Select: HTTPS
# Paste your GitHub token (or let it open browser)
```

### Step 3: Create Repo & Deploy (One Command!)
```bash
cd /path/to/portfolio/files
gh repo create vishalgwu.github.io --public --source=. --remote=origin --push
```

✅ **DONE!** Site live at `https://vishalgwu.github.io` in 2-5 minutes

---

## METHOD 2: Manual Git + GitHub Web UI (Standard)

### Step 1: Create Repository on GitHub
1. Go to: https://github.com/new
2. **Repository name:** `vishalgwu.github.io`
3. **Description:** "Personal Portfolio - AI/ML Engineer"
4. **Public:** ✅ (required for GitHub Pages)
5. **Initialize with README:** ❌ (you have one already)
6. Click **Create repository**

### Step 2: Clone or Initialize Locally
```bash
# If creating new folder
mkdir vishalgwu.github.io
cd vishalgwu.github.io
git init

# If you have files already in a folder
cd /path/to/your/portfolio/folder
git init
```

### Step 3: Configure Git
```bash
git config user.email "vishalfulsundar2017@gmail.com"
git config user.name "Vishal Fulsundar"
```

### Step 4: Add Remote
```bash
git remote add origin https://github.com/vishalgwu/vishalgwu.github.io.git
```

### Step 5: Add & Commit Files
```bash
# Copy your files here first, then:
git add .
git commit -m "Initial portfolio deployment"
```

### Step 6: Push to GitHub
```bash
# For main branch (newer GitHub default)
git branch -M main
git push -u origin main

# OR if you get an error, try master:
git push -u origin master
```

### Step 7: Enable GitHub Pages
1. Go to: https://github.com/vishalgwu/vishalgwu.github.io/settings/pages
2. Under **Build and deployment:**
   - **Source:** `Deploy from a branch`
   - **Branch:** `main` (or `master` - whatever you pushed to)
   - **Folder:** `/ (root)`
3. Click **Save**

✅ Site live at `https://vishalgwu.github.io`

---

## METHOD 3: Automated Deployment Script

### Step 1: Set Up Repository
```bash
# Create repo on GitHub first (steps in METHOD 2, Step 1)
# Then clone it locally:
git clone https://github.com/vishalgwu/vishalgwu.github.io.git
cd vishalgwu.github.io
```

### Step 2: Add Portfolio Files
```bash
# Copy index.html, .github/, README.md, .gitignore here
cp /path/to/index.html .
cp -r /path/to/.github .
cp /path/to/README.md .
cp /path/to/.gitignore .
```

### Step 3: Run Deployment Script
```bash
chmod +x deploy.sh
./deploy.sh
```

The script will:
- ✅ Initialize git
- ✅ Stage all files
- ✅ Commit changes
- ✅ Push to GitHub
- ✅ Configure GitHub Pages

---

## GitHub Actions Workflow (Auto-Deploy)

The `.github/workflows/deploy.yml` file automatically:

✅ Triggers on every push to `main` branch  
✅ Builds your site  
✅ Deploys to GitHub Pages  
✅ Updates live in 1-2 minutes  

**View deployment status:**
- Go to your repo
- Click **Actions** tab
- See live build logs

---

## File Checklist

Before pushing, ensure you have:

```
✅ index.html                     (main portfolio file)
✅ .github/workflows/deploy.yml   (auto-deployment)
✅ README.md                      (documentation)
✅ .gitignore                     (exclude unnecessary files)
```

---

## Troubleshooting

### ❌ "fatal: not a git repository"
```bash
git init
git remote add origin https://github.com/vishalgwu/vishalgwu.github.io.git
```

### ❌ "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/vishalgwu/vishalgwu.github.io.git
```

### ❌ "Permission denied (publickey)"
You need to set up SSH keys:
```bash
ssh-keygen -t ed25519 -C "vishalfulsundar2017@gmail.com"
# Then add key to GitHub: Settings → SSH Keys
# Use SSH URL instead: git@github.com:vishalgwu/vishalgwu.github.io.git
```

### ❌ "Site not live after push"
1. Check **Actions** tab for build errors
2. Go to **Settings → Pages**
3. Verify **Source** is set to `Deploy from a branch`
4. Wait 2-5 minutes (sometimes longer on first deploy)
5. Hard refresh browser: `Ctrl+Shift+R` or `Cmd+Shift+R`

### ❌ "GitHub Actions workflow failing"
```
Check Actions tab → Deploy Portfolio → See error logs
Common issues:
  • Missing index.html in repo root
  • Wrong branch name (main vs master)
  • CNAME file conflicts (only if using custom domain)
```

---

## Verify Deployment

### Check Repo Status
```bash
# Confirm files are pushed
git log --oneline

# Confirm remote is set
git remote -v

# Output should show:
# origin  https://github.com/vishalgwu/vishalgwu.github.io.git (fetch)
# origin  https://github.com/vishalgwu/vishalgwu.github.io.git (push)
```

### Check GitHub Pages Status
1. Go to: https://github.com/vishalgwu/vishalgwu.github.io
2. Click **Settings** → **Pages**
3. Should show: "Your site is live at https://vishalgwu.github.io"

### Test Live Site
```bash
# From command line:
curl https://vishalgwu.github.io

# Or just open in browser:
https://vishalgwu.github.io
```

---

## Updating Your Portfolio (After First Deployment)

Once deployed, updating is simple:

```bash
# 1. Edit index.html (add new projects, skills, etc)
nano index.html

# 2. Commit changes
git add .
git commit -m "Add new project: Project Name"

# 3. Push to GitHub
git push origin main

# 4. GitHub Actions auto-deploys
# Site updates within 1-2 minutes ✅
```

No need to manually trigger anything - GitHub Actions handles it!

---

## Custom Domain (Optional)

To use a custom domain (e.g., `vishal.dev`):

1. Buy domain from: GoDaddy, Namecheap, Google Domains, etc.
2. Create `CNAME` file in repo root with just: `vishal.dev`
3. Go to **Settings → Pages → Custom domain**
4. Enter: `vishal.dev`
5. Update DNS records at your domain registrar (instructions provided)

---

## Performance Tips

✅ Your site is already optimized, but:
- **Cache busting:** Add `?v=1.0` to any static asset URLs if you update
- **Analytics:** Add Google Analytics (see README.md)
- **CDN:** GitHub Pages uses CloudFlare CDN automatically (fast!)
- **Monitoring:** Set up Sentry or LogRocket for error tracking

---

## Next Steps

1. ✅ Deploy using METHOD 1, 2, or 3 above
2. ✅ Verify site is live at `https://vishalgwu.github.io`
3. ✅ Share link on LinkedIn, resume, job applications
4. ✅ Add custom domain (optional)
5. ✅ Set up analytics (optional)
6. ✅ Keep updating with new projects!

---

## Questions?

- **GitHub Docs:** https://docs.github.com/en/pages
- **GitHub Actions:** https://docs.github.com/en/actions
- **My Email:** vishalfulsundar2017@gmail.com

---

**🎉 You're all set! Your portfolio is about to go live.**

*Last updated: 2026*
