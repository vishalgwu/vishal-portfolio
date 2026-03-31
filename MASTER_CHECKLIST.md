# 📋 MASTER DEPLOYMENT CHECKLIST

## 🎯 YOUR SITUATION

✅ Portfolio website created  
✅ All files ready in `/mnt/user-data/outputs`  
✅ GitHub CLI installed  
⚠️  **GitHub CLI not authenticated yet** ← You are here

---

## 🚀 DEPLOYMENT IN 3 STEPS

### STEP 1️⃣: AUTHENTICATE (2 minutes)

**Run this in your terminal:**
```bash
gh auth login
```

**When prompted, select:**
- Protocol: `HTTPS`
- Authenticate Git: `Y`
- Method: `Login with a web browser`

A browser window will open. **Approve the request.**

✅ **Done!** You're authenticated.

---

### STEP 2️⃣: NAVIGATE & DEPLOY (2 minutes)

**In the same terminal:**

```bash
# Navigate to portfolio files
cd /path/to/portfolio  # or ~/Downloads/portfolio

# Verify you're in the right place
ls -la index.html

# Deploy (one command!)
gh repo create vishalgwu.github.io --public --source=. --remote=origin --push
```

You should see:
```
✓ Created repository vishalgwu/vishalgwu.github.io on GitHub
✓ Initialized repository in .
✓ Pushed commits to https://github.com/vishalgwu/vishalgwu.github.io.git
```

✅ **Done!** Your code is pushed.

---

### STEP 3️⃣: WAIT & VERIFY (3-5 minutes)

**After Step 2, wait 2-5 minutes, then:**

**Option A:** Check in terminal
```bash
gh repo view vishalgwu.github.io --web
# Opens GitHub Actions page - look for green checkmark ✅
```

**Option B:** Open in browser
```
https://vishalgwu.github.io
# Your portfolio should be live! 🎉
```

✅ **Done!** Your site is live!

---

## 📋 DETAILED CHECKLIST

### Before You Start

- [ ] GitHub account created (`vishalgwu`)
- [ ] Terminal/Command Prompt open
- [ ] Internet connection working
- [ ] GitHub CLI installed (`gh --version` shows version)

### Step 1: Authentication

- [ ] Run `gh auth login`
- [ ] Select `HTTPS` when asked
- [ ] Select `Y` for "Authenticate Git"
- [ ] Select "Login with a web browser"
- [ ] Browser opens - approve request
- [ ] Return to terminal
- [ ] Run `gh auth status` - should show "Logged in to github.com"

### Step 2: Prepare Files

- [ ] `index.html` exists
- [ ] `.github/workflows/deploy.yml` exists
- [ ] `README.md` exists
- [ ] `.gitignore` exists
- [ ] All files are in same directory

### Step 3: Deploy

- [ ] Navigate to portfolio directory
- [ ] Run: `gh repo create vishalgwu.github.io --public --source=. --remote=origin --push`
- [ ] See "Created repository" in output
- [ ] See "Pushed commits" in output

### Step 4: Verify

- [ ] Wait 2-5 minutes
- [ ] Check: https://github.com/vishalgwu/vishalgwu.github.io/actions
- [ ] See "Deploy Portfolio to GitHub Pages" with green checkmark
- [ ] Visit: https://vishalgwu.github.io
- [ ] See your portfolio! 🎉

---

## 🎯 DEPLOYMENT TIMELINE

| Time | What Happens | Status |
|------|-------------|--------|
| T+0min | You run deploy command | 🔵 In Progress |
| T+1min | Files pushed to GitHub | ✅ Complete |
| T+1-2min | GitHub Actions triggered | 🔵 In Progress |
| T+2-3min | Workflow builds site | 🔵 In Progress |
| T+3-5min | Deployment completes | ✅ Complete |
| T+5min+ | Site live at your URL | 🎉 Done! |

---

## 📂 YOUR FILES (All Ready!)

```
/mnt/user-data/outputs/
├── index.html                    ← Your portfolio website
├── .github/
│   └── workflows/
│       └── deploy.yml            ← Auto-deployment (handled by Actions)
├── README.md                      ← Project documentation
├── QUICKSTART.md                  ← Simple guide (recommended to read)
├── DEPLOYMENT_GUIDE.md            ← Detailed setup instructions
├── GITHUB_AUTH.md                 ← Authentication help
├── deploy.sh                      ← Manual deploy script
├── deploy-automated.sh            ← Full automated script
├── .gitignore                     ← Git ignore patterns
└── MASTER_CHECKLIST.md            ← This file
```

**Everything is ready to deploy!** ✅

---

## 🔗 IMPORTANT LINKS

**After you deploy, save these:**

| Link | Purpose |
|------|---------|
| https://vishalgwu.github.io | Your live portfolio |
| https://github.com/vishalgwu/vishalgwu.github.io | Repository |
| https://github.com/vishalgwu/vishalgwu.github.io/actions | Deployments |
| https://github.com/vishalgwu/vishalgwu.github.io/settings/pages | GitHub Pages settings |

---

## 🆘 QUICK TROUBLESHOOTING

### "gh: command not found"
```bash
# Install GitHub CLI
brew install gh  # Mac
choco install gh # Windows
sudo apt install gh # Linux
```

### "Not logged in"
```bash
gh auth login
# Follow the prompts
```

### "Repository already exists"
Great! Your repo was created. Just verify:
- Check: https://github.com/vishalgwu/vishalgwu.github.io
- Files should be there ✅

### "Site not live after 5 minutes"
1. Hard refresh: `Ctrl+Shift+R` or `Cmd+Shift+R`
2. Check Actions tab for errors
3. Wait a bit longer (sometimes slow on first push)

### "Deployment failed"
1. Check Actions tab: https://github.com/vishalgwu/vishalgwu.github.io/actions
2. Click on failed workflow
3. Read error message
4. Contact support if unclear

---

## 📝 COPY-PASTE COMMANDS

### Single command to do everything:

**After running `gh auth login`:**

```bash
cd /path/to/portfolio && gh repo create vishalgwu.github.io --public --source=. --remote=origin --push && echo "✅ Deployed! Check https://vishalgwu.github.io in 2-5 minutes"
```

---

## 🎯 AFTER DEPLOYMENT

### Share Your Portfolio

Add link to:
- [ ] LinkedIn profile (headline or about section)
- [ ] GitHub profile bio
- [ ] Resume/CV
- [ ] Email signature
- [ ] Twitter/social media bio

### Keep It Updated

Future updates are simple:

```bash
# 1. Edit index.html locally
nano index.html

# 2. Push to GitHub
git add . && git commit -m "Update: Add new project" && git push

# 3. GitHub Actions auto-deploys (1-2 minutes)
```

### Monitor Deployments

```bash
# Check status anytime
gh repo view vishalgwu.github.io --web

# See recent deployments
gh run list -R vishalgwu/vishalgwu.github.io
```

---

## ✨ WHAT YOU GET

✅ Professional portfolio website  
✅ Hosted on GitHub Pages (free, fast, 99.9% uptime)  
✅ Automatic deployment (GitHub Actions)  
✅ Custom domain ready (optional)  
✅ SEO optimized  
✅ Mobile responsive  
✅ Dark mode included  
✅ Fast global CDN  

---

## 📞 SUPPORT

- **Quick help:** See `QUICKSTART.md`
- **Detailed help:** See `DEPLOYMENT_GUIDE.md`
- **Auth help:** See `GITHUB_AUTH.md`
- **GitHub Docs:** https://docs.github.com/en/pages
- **Email:** vishalfulsundar2017@gmail.com

---

## 🎯 YOUR EXACT NEXT STEPS

**Right now:**
1. Open terminal/command prompt
2. Type: `gh auth login`
3. Follow the prompts

**After authentication:**
1. Type: `cd /path/to/portfolio`
2. Type: `gh repo create vishalgwu.github.io --public --source=. --remote=origin --push`
3. Wait for it to complete

**Then:**
1. Wait 2-5 minutes
2. Visit: `https://vishalgwu.github.io`
3. 🎉 Your site is live!

---

## 🚀 YOU'RE READY!

Everything is set up. Now it's time to deploy.

**Start with:** `gh auth login`

Let's go! 💪

---

*Last updated: March 31, 2026*
*Portfolio owner: Vishal Fulsundar (@vishalgwu)*
