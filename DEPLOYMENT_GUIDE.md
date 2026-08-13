# 🌐 Deployment Guide: How to Publish Your Portfolio Website Live

You have 3 ultra-fast, free options to host your portfolio online. For US Master's applicants, **Option 1 (GitHub Pages)** or **Option 2 (Vercel)** are strongly recommended because they provide instant SSL certificates, fast global CDN speeds, and look very professional on CVs.

---

## 📌 Option 1: GitHub Pages (Recommended for Master's Applicants)

Since admissions committees and professors already look at your GitHub profile, hosting your portfolio on GitHub Pages links your code and live site under your GitHub domain: `https://<your-username>.github.io`.

### Step 1: Create a GitHub Repository
1. Go to [GitHub New Repository](https://github.com/new).
2. Repository Name:
   - Option A: `<your-username>.github.io` (This will make your URL `https://<your-username>.github.io`)
   - Option B: `portfolio` (This will make your URL `https://<your-username>.github.io/portfolio`)
3. Set visibility to **Public**.
4. Leave "Initialize this repository with a README" **unchecked** (we already have a local git repo).
5. Click **Create repository**.

### Step 2: Push Your Code to GitHub
Run the following commands in your terminal inside your `Higher Studies` directory:

```bash
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. On GitHub, go to your repository **Settings** tab.
2. On the left sidebar, click **Pages**.
3. Under **Build and deployment** -> **Source**, select **Deploy from a branch**.
4. Select **Branch**: `main`, Folder: `/ (root)`, and click **Save**.
5. Within 1 to 2 minutes, GitHub will give you your live URL!

---

## ⚡ Option 2: Vercel Instant Deployment (1-Click CLI)

Vercel provides blazing-fast global deployment with automatic HTTPS.

### Step 1: Run Vercel Deploy Command
In your terminal inside `Higher Studies`, run:

```bash
npx -y vercel
```

### Step 2: Follow Prompts
- Set up and deploy? **`y`**
- Which scope? (Select your account)
- Link to existing project? **`n`**
- What's your project's name? **`portfolio`**
- In which directory is your code located? **`./`**
- Auto-detect project settings? **`y`**

Vercel will output a live URL (e.g. `https://portfolio-xyz.vercel.app`).

To deploy updates in the future:
```bash
npx -y vercel --prod
```

---

## ☁️ Option 3: Netlify Instant Deployment

Netlify is another great free hosting service.

Run in terminal:
```bash
npx -y netlify-cli deploy --prod
```
Follow the prompts to log in and select `./` as the deploy path.

---

## 📝 Updating Your Live Portfolio Later

Whenever you add new projects or update your GPA/GRE scores in `projects_data.json`:
```bash
git add .
git commit -m "update: added new project and updated GRE metrics"
git push origin main
```
If using GitHub Pages or Vercel linked to GitHub, your live site will update automatically on every `git push`!
