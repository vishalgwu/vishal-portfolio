# Vishal Fulsundar - Portfolio

Professional portfolio website showcasing AI/ML projects, research, and experience.

**Live Site:** https://vishalgwu.github.io

## Features

- 🎨 Modern, responsive design (dark mode included)
- ⚡ Fast-loading single HTML file (~50KB)
- 📱 Mobile-optimized (works on all devices)
- 🎯 SEO-friendly semantic HTML
- 🚀 GitHub Pages + GitHub Actions auto-deployment
- ✨ Smooth animations and hover effects

## Quick Start

### Option 1: Deploy to GitHub Pages (Recommended)

#### Step 1: Create the Repository
```bash
# Option A: If you don't have the repo yet
gh repo create vishalgwu.github.io --public --source=. --remote=origin --push

# Option B: If you already have the repo
cd vishalgwu.github.io
```

#### Step 2: Add Files
```bash
# Copy the portfolio files to your repo
cp index.html .
mkdir -p .github/workflows
cp .github/workflows/deploy.yml .github/workflows/
```

#### Step 3: Configure GitHub Pages
```bash
# Push to main branch (GitHub Pages will auto-detect)
git add .
git commit -m "Initial portfolio deployment"
git push origin main
```

#### Step 4: Enable GitHub Pages
1. Go to: **Settings → Pages**
2. Select **Source:** `Deploy from a branch`
3. Select **Branch:** `main` / `root`
4. Click **Save**

✅ Your site will be live at: `https://vishalgwu.github.io`

---

### Option 2: Deploy Manually (Without GitHub Actions)

If you prefer not to use the GitHub Actions workflow:

1. Push `index.html` to the `main` branch
2. Go to **Settings → Pages**
3. Select **Source:** `Deploy from a branch`
4. GitHub will serve `index.html` automatically

---

## File Structure

```
vishalgwu.github.io/
├── index.html                    # Main portfolio (all-in-one file)
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Actions workflow
├── README.md                     # This file
└── .gitignore                   # Git ignore patterns
```

## Customization

### Change Colors
Edit the CSS variables in `index.html`:

```css
:root {
    --primary: #1a1a2e;           /* Dark background */
    --highlight: #e94560;         /* Accent color (pink) */
    --text-light: #eaeaea;        /* Light text */
    /* ... other colors ... */
}
```

### Update Content
1. **Hero Section:** Edit the `<h1>` and tagline text
2. **Projects:** Modify project cards (copy a card block and customize)
3. **Skills:** Add/remove skill tags
4. **Experience:** Update timeline items
5. **Contact:** Change email, LinkedIn, GitHub links

### Add Blog Section
To add a blog section, create a `blog.html` page and link from the main navigation.

---

## GitHub Actions Workflow

The included `deploy.yml` automatically:
- ✅ Runs on every push to `main` branch
- ✅ Uploads files to GitHub Pages artifact
- ✅ Deploys to production
- ✅ Updates live site within 1-2 minutes

**View deployment status:**
- Go to **Actions** tab → **Deploy Portfolio to GitHub Pages**
- See real-time build and deployment logs

---

## Performance

- **Page Load:** < 1 second (single HTML file)
- **Mobile:** Fully responsive (tested on all screen sizes)
- **Accessibility:** Semantic HTML, high contrast, keyboard navigable
- **SEO:** Meta tags, proper heading hierarchy, fast load time

---

## Troubleshooting

### Site not updating after push?
```bash
# Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)
# Or clear cache: Settings → Clear browsing data → Cached images/files
```

### GitHub Actions failing?
1. Check **Actions** tab for error logs
2. Ensure `index.html` is in the repo root
3. Verify branch is set to `main` in **Settings → Pages**

### Dark/Light mode not working?
The theme toggle uses `localStorage`. This is preserved per device. 
- Check browser DevTools → Application → Local Storage
- Make sure JavaScript is enabled

---

## Deployment Checklist

- [ ] Fork/create repo `vishalgwu.github.io`
- [ ] Push `index.html` to `main` branch
- [ ] Copy `.github/workflows/deploy.yml` to `.github/workflows/`
- [ ] Go to **Settings → Pages**
- [ ] Select **Source: Deploy from a branch**
- [ ] Select **Branch: main**, **root**
- [ ] Click **Save**
- [ ] Wait 2-5 minutes for first deployment
- [ ] Visit `https://vishalgwu.github.io` ✅

---

## Update Workflow

After initial setup, updating is simple:

```bash
# Make changes to index.html
nano index.html

# Push to GitHub
git add index.html
git commit -m "Update portfolio content"
git push origin main

# GitHub Actions automatically deploys
# Site updates within 1-2 minutes ✅
```

---

## Analytics (Optional)

To add analytics, insert before closing `</body>` tag:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

Replace `GA_ID` with your Google Analytics ID.

---

## License

© 2026 Vishal Fulsundar. All rights reserved.

---

## Need Help?

- **GitHub Issues:** Report bugs or suggest improvements
- **GitHub Discussions:** Ask questions or share ideas
- **Contact:** vishalfulsundar2017@gmail.com

Happy coding! 🚀
