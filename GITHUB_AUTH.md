# 🔐 GitHub Authentication & Deployment Instructions

Your portfolio files are ready! Now you need to authenticate with GitHub and push the code.

## ⚠️ Authentication Required

GitHub CLI needs your permission to create the repository and push code.

### Option 1: Interactive Authentication (Recommended)

Run this command on your local machine (terminal/command prompt):

```bash
gh auth login
```

Then follow these steps:
1. **What is your preferred protocol for Git operations?**
   - Select: `HTTPS` (press Enter)

2. **Authenticate Git with your GitHub credentials?**
   - Select: `Y` (Yes)

3. **How would you like to authenticate GitHub CLI?**
   - Select: `Login with a web browser` (recommended)

4. A browser window will open - approve the request
5. Return to terminal - you're now authenticated! ✅

---

### Option 2: Using Personal Access Token

If interactive login doesn't work:

#### Step 1: Create a Personal Access Token
1. Go to: https://github.com/settings/tokens/new
2. **Token name:** `portfolio-deployment`
3. **Expiration:** 90 days (recommended)
4. **Scopes:** Check these boxes:
   - ✅ `repo` (full control of private repositories)
   - ✅ `workflow` (update GitHub Action workflows)
5. Click **Generate token**
6. **Copy the token** (you'll need it immediately)

#### Step 2: Authenticate with Token
```bash
gh auth login

# When prompted:
# Protocol: HTTPS
# Authenticate Git: Y
# Authentication method: Paste an authentication token
# Paste your token from Step 1
```

---

### Option 3: One-Line Authentication (Advanced)

If you have your token ready:

```bash
echo "YOUR_TOKEN_HERE" | gh auth login --with-token
```

Replace `YOUR_TOKEN_HERE` with your actual token.

---

## ✅ After Authentication

Once authenticated, run this command to create the repo and deploy:

```bash
cd /path/to/portfolio/files
gh repo create vishalgwu.github.io --public --source=. --remote=origin --push
```

This will:
1. ✅ Create `vishalgwu.github.io` repository
2. ✅ Initialize git
3. ✅ Commit all files
4. ✅ Push to GitHub
5. ✅ Set up GitHub Pages

---

## 🔍 Verify Authentication

After authenticating, confirm it worked:

```bash
gh auth status
```

You should see output like:
```
  ✓ Logged in to github.com as vishalgwu (git)
  ✓ Git operations for github.com configured to use https protocol.
  ✓ Token: ghu_****...
  ✓ Token scopes: gist, read:org, repo, workflow
```

---

## 🚀 Complete Deployment Steps

### Step 1: Authenticate (see options above)
```bash
gh auth login
```

### Step 2: Navigate to Portfolio Directory
```bash
cd /mnt/user-data/outputs
# or wherever your portfolio files are
```

### Step 3: Create Repo & Deploy
```bash
gh repo create vishalgwu.github.io --public --source=. --remote=origin --push
```

### Step 4: Wait for Completion
- Should take 30-60 seconds
- You'll see output showing:
  - `✓ Created repository`
  - `✓ Initialized git`
  - `✓ Pushed files`

### Step 5: Verify Deployment
```bash
# Check that remote is configured
git remote -v

# Output should show:
# origin    https://github.com/vishalgwu/vishalgwu.github.io.git (fetch)
# origin    https://github.com/vishalgwu/vishalgwu.github.io.git (push)
```

---

## 🌐 After Successful Push

Your site will be live at: **`https://vishalgwu.github.io`**

### First-Time Deployment Timeline
- **Immediate:** Files pushed to GitHub ✅
- **1-2 minutes:** GitHub Actions workflow starts ✅
- **2-5 minutes:** Site deployed and live ✅

### Check Deployment Status
1. Go to: https://github.com/vishalgwu/vishalgwu.github.io
2. Click **Actions** tab
3. You should see: "Deploy Portfolio to GitHub Pages" workflow running
4. Wait for green checkmark ✅

### Test Your Live Site
```bash
# From terminal:
curl https://vishalgwu.github.io

# Or open in browser:
https://vishalgwu.github.io
```

---

## ❌ Common Authentication Issues

### Issue: "Invalid authentication credentials"
**Solution:** Your token expired or is incorrect
- Generate a new token: https://github.com/settings/tokens/new
- Run: `gh auth logout` then `gh auth login`

### Issue: "We can't find that repository"
**Solution:** Repository wasn't created yet
- Make sure `gh auth status` shows you're logged in
- Run the create command again

### Issue: "Permission denied (publickey)"
**Solution:** SSH key issue (shouldn't happen with HTTPS)
- Use HTTPS instead: make sure you selected `HTTPS` during auth
- Run: `gh auth logout` then `gh auth login` and select HTTPS

---

## 📋 Checklist

Before you start:

- [ ] GitHub account created (vishalgwu)
- [ ] Terminal/Command Prompt open
- [ ] Portfolio files ready in `/mnt/user-data/outputs`
- [ ] Internet connection working
- [ ] GitHub CLI installed (`gh --version` works)

After authentication:

- [ ] `gh auth status` shows you're logged in
- [ ] Navigate to correct directory
- [ ] Run repo creation command
- [ ] See "Created repository" in output
- [ ] Visit `https://vishalgwu.github.io` (wait 2-5 min)
- [ ] See your portfolio live! 🎉

---

## 🆘 Need Help?

If authentication fails:

1. Try Option 1 (Interactive) first
2. If that fails, try Option 2 (Token-based)
3. Make sure you have internet connection
4. Check your GitHub account is active
5. Visit: https://github.com/settings/tokens to manage tokens

---

## 🎯 Next: Deployment Commands

**Once you're authenticated**, here are the exact commands to run:

```bash
# 1. Authenticate with GitHub
gh auth login

# 2. Navigate to portfolio directory
cd /mnt/user-data/outputs

# 3. Create repo and push (one command!)
gh repo create vishalgwu.github.io --public --source=. --remote=origin --push

# 4. Done! Your site is live at https://vishalgwu.github.io
```

**Estimated time:** 2-5 minutes total ⏱️

---

**Ready? Start with `gh auth login` on your machine!** 🚀
