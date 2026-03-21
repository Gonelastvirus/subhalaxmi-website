# Vercel Deployment Guide
## Subhalaxmi Property & Construction

---

## Before You Deploy

### 1. Set Your APK Download URL

Open `artifacts/sl-property/src/lib/constants.ts` and replace the placeholder with your real GitHub release URL:

```ts
export const APK_URL = "https://github.com/your-username/your-repo/releases/latest/download/app.apk";
```

---

## Step 1 — Create a `vercel.json` File

Create a file named `vercel.json` in the **root of your project** (same level as `package.json`) with the following content:

```json
{
  "buildCommand": "pnpm run --filter @workspace/sl-property build",
  "outputDirectory": "artifacts/sl-property/dist/public",
  "installCommand": "pnpm install",
  "framework": null,
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://replit-sample-app-draft.onrender.com/api/:path*"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

> The `rewrites` block does two things:
> - Forwards all `/api/...` requests to your backend API (replacing Vite's dev proxy)
> - Sends every other route to `index.html` so React's client-side routing works correctly

---

## Step 2 — Add Environment Variables

The build requires two environment variables. You will set these in Vercel's dashboard (not in a `.env` file).

| Variable | Value |
|---|---|
| `PORT` | `3000` |
| `BASE_PATH` | `/` |

---

## Step 3 — Deploy on Vercel

### Option A — Using the Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Vercel will detect your `vercel.json` automatically — **do not change** the build settings it shows
5. Go to **Settings → Environment Variables** and add:
   - `PORT` = `3000`
   - `BASE_PATH` = `/`
6. Click **Deploy**

### Option B — Using the Vercel CLI

Install the CLI and deploy from your terminal:

```bash
npm install -g vercel
vercel login
vercel --prod
```

When prompted, confirm the project settings. The `vercel.json` file will handle everything automatically.

---

## Step 4 — Verify the Deployment

After deployment succeeds, check the following:

| Check | Expected |
|---|---|
| Home page loads | Hero section visible with properties |
| Properties section | Cards load with images and details |
| Download button | Opens new tab and starts APK download |
| API data loads | Properties and services appear (not empty) |

If the properties/services section is empty, check the **Function Logs** in Vercel dashboard to confirm the `/api` rewrite is working.

---

## Updating the App After Deploy

Every time you push changes to your connected GitHub branch, Vercel will automatically rebuild and redeploy. No manual steps needed.

To update the APK link in the future, just change the `APK_URL` in `artifacts/sl-property/src/lib/constants.ts` and push to GitHub.

---

## Troubleshooting

**Page shows blank / 404 on refresh**
- Make sure the SPA rewrite rule is in `vercel.json`:
  ```json
  { "source": "/(.*)", "destination": "/index.html" }
  ```

**Build fails with "PORT is required"**
- Add `PORT=3000` in Vercel's Environment Variables (Settings → Environment Variables)

**API data not loading**
- Check that the `/api/:path*` rewrite in `vercel.json` points to the correct backend URL

**APK not downloading**
- Make sure `APK_URL` in `constants.ts` is a direct GitHub release asset URL, not a page URL
- Correct format: `https://github.com/user/repo/releases/download/v1.0/app.apk`

