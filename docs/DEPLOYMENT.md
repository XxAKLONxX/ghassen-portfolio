# DEPLOYMENT.md — Cloudflare Pages Setup

This project is configured for **Cloudflare Pages** deployment using `@cloudflare/next-on-pages`. You'll get a free `https://ghassen-bahroun.pages.dev` subdomain (or whatever you name it).

---

## One-Time Setup

### 1. Push to GitHub

```bash
cd ghassen-portfolio
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/XxAKLONxX/ghassen-portfolio.git
git push -u origin main
```

### 2. Connect to Cloudflare Pages

1. Go to **dash.cloudflare.com** → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
2. Authorize Cloudflare to access your GitHub
3. Select the `ghassen-portfolio` repo
4. Configure the build:
   - **Framework preset:** Next.js
   - **Build command:** `npx @cloudflare/next-on-pages@1`
   - **Build output directory:** `.vercel/output/static`
   - **Root directory:** `/` (default)
   - **Environment variables:**
     - `NODE_VERSION` = `20`
     - `NEXT_TELEMETRY_DISABLED` = `1`
5. Click **Save and Deploy**

First build takes ~3 minutes. Every Git push to `main` redeploys automatically.

### 3. Custom Subdomain (optional, free)

In Cloudflare Pages → your project → **Custom domains** → you can pick any `*.pages.dev` subdomain. The default uses your project name.

If you later buy a real domain (recommended for SEO authority transfer):
- Buy from Cloudflare Registrar (cheapest, at-cost), Porkbun, or Namecheap (~$10–15/yr)
- Add it as a custom domain in Cloudflare Pages — DNS + SSL handled automatically

---

## Updating the Site

Just commit and push. Cloudflare Pages will rebuild and deploy in ~2–3 minutes.

```bash
git add .
git commit -m "Add /blog page"
git push
```

Preview deployments are created for every branch push and pull request — useful for testing changes before merging to `main`.

---

## After You Deploy — SEO Setup

Once live, do these in order:

### 1. Update SITE_URL if your domain differs

If your final URL isn't `https://ghassen-bahroun.pages.dev`, edit `lib/i18n.ts`:

```ts
export const SITE_URL = 'https://your-actual-domain.com';
```

Commit, push, redeploy. This propagates to **all** canonical tags, hreflang URLs, sitemap, robots, and JSON-LD `@id` values automatically.

### 2. Submit to Google Search Console

1. Add your property at **search.google.com/search-console**
2. Verify ownership (usually via DNS TXT record in Cloudflare)
3. Submit your sitemap: `https://your-domain.com/sitemap.xml`
4. Wait 24–48 hours for initial crawl

### 3. Submit to Bing Webmaster Tools

Same process at **bing.com/webmasters**. Even if you don't care about Bing traffic, it powers DuckDuckGo and ChatGPT search.

### 4. Verify hreflang in GSC

Once Google has crawled multiple language versions, check **GSC → Indexing → Pages → International Targeting** for hreflang errors. There shouldn't be any since the implementation is reciprocal — but check anyway.

### 5. Test rich results

Run each page URL through:
- **search.google.com/test/rich-results** — confirms Person, ProfessionalService, Breadcrumb, ItemList schema all parse
- **validator.schema.org** — backup validator
- **Lighthouse** (in Chrome DevTools) — should score 100 for SEO, 95+ for performance

---

## Local Development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` — middleware will redirect you to `/en` (or your browser's preferred locale).

To preview the production build locally:
```bash
npm run build
npm run start
```

---

## Build Troubleshooting

**Build fails with "Failed to fetch font"**
- Ensure your build environment can reach `fonts.googleapis.com`
- Cloudflare Pages can — local sandboxes sometimes can't

**Build fails with TypeScript errors after editing**
```bash
npx tsc --noEmit
```
Will tell you exactly what's broken before you push.

**Build succeeds but routes 404**
- Make sure the `[locale]` folder is a literal directory named `[locale]` (with brackets) — not `locale`
- Confirm `middleware.ts` is at the project root, not inside `app/`

**Hreflang or canonical pointing to localhost in production**
- Check `SITE_URL` in `lib/i18n.ts` — must be the production HTTPS URL with no trailing slash

---

## What's Configured Out of the Box

- ✅ `next.config.mjs` set up for Cloudflare's Workers runtime
- ✅ `middleware.ts` handles locale detection
- ✅ `sitemap.ts` generates 18 URLs (6 pages × 3 locales) with hreflang alternates
- ✅ `robots.ts` points crawlers to the sitemap
- ✅ Per-page `generateMetadata` with canonical, hreflang, OG, Twitter
- ✅ Global `Person` + `ProfessionalService` + `WebSite` JSON-LD on every page
- ✅ Per-page `BreadcrumbList` + page-type-specific schema
- ✅ Static asset caching handled by Cloudflare automatically
- ✅ HTTPS + HSTS automatic on `pages.dev` domains

---

## Cost

**$0/month** for the free tier. Free tier limits on Cloudflare Pages:
- Unlimited bandwidth (yes, really)
- Unlimited sites
- 500 builds per month
- 100 custom domains per project

You'll never hit these for a personal portfolio.
