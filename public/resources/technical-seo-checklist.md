# Technical SEO Checklist
*For pre-launch and quarterly audits — v1.0*

> Authored by **Ghassen Bahroun** · SEO/SEM Specialist
> A focused, code-level companion to the full site audit. Use this before launching a new site, after a major migration, or quarterly on production sites.

---

## 1. CRAWLABILITY

### robots.txt
- [ ] File exists at `/robots.txt` and returns 200
- [ ] No accidental `Disallow: /`
- [ ] Sitemap URL declared: `Sitemap: https://domain.com/sitemap.xml`
- [ ] Staging / dev subdomains separately blocked
- [ ] No block on CSS/JS that Googlebot needs to render

### Sitemaps
- [ ] Primary `sitemap.xml` or sitemap index submitted to GSC
- [ ] Only canonical, indexable, 200-status URLs listed
- [ ] Separate sitemaps per language (multilingual sites) OR hreflang inline
- [ ] Separate sitemaps for images and videos (if applicable)
- [ ] `<lastmod>` dates are accurate, not rewritten on every deploy
- [ ] Under 50k URLs / 50MB per file — split if exceeded

### Crawl budget
- [ ] Log file analysis or GSC "Crawl stats" reviewed
- [ ] Faceted navigation controlled (URL parameters, `noindex`, or AJAX)
- [ ] Pagination controlled — self-referencing canonicals, no infinite loops
- [ ] Parameter URLs canonicalised to clean version
- [ ] PDFs either canonicalised to an HTML equivalent or `X-Robots-Tag: noindex` in headers

## 2. INDEXATION

### Meta robots / X-Robots-Tag
- [ ] Production pages return `index, follow` (or are absent — same default)
- [ ] `noindex` intentional and documented where present
- [ ] No conflicts between HTML meta and HTTP header
- [ ] Staging environments return `noindex` OR are password-protected

### Canonical tags
- [ ] Every indexable page has a `rel=canonical` — self-referencing by default
- [ ] Absolute URLs, including protocol and host
- [ ] No canonical to a 3xx or 4xx URL
- [ ] No canonical to a noindex page
- [ ] Parameter URLs canonicalise to the clean version

### Hreflang (multilingual)
- [ ] Every language variant listed on every other variant (reciprocal)
- [ ] Self-referencing hreflang on each page
- [ ] Valid ISO codes: `en`, `en-GB`, `fr-FR`, `fr-CA`, `de`, etc.
- [ ] `x-default` set for language selector / root
- [ ] No hreflang pointing to a noindex or 4xx page
- [ ] Consistency between sitemap hreflang and `<link rel="alternate">` tags — pick one method and stick with it

## 3. URL STRUCTURE

- [ ] HTTPS site-wide — `http://` returns 301 to `https://`
- [ ] Either `www.` or non-`www.` canonical — the other redirects once
- [ ] Trailing-slash convention consistent and enforced with 301
- [ ] Lowercase URLs — uppercase redirects or 404s resolved
- [ ] Hyphens, not underscores or `%20`
- [ ] No session IDs or tracking params in canonical URLs
- [ ] Localised slugs for non-English markets (not English transliterated)

## 4. REDIRECTS

- [ ] Redirect chains ≤ 1 hop on important URLs
- [ ] No redirect loops
- [ ] 301 for permanent, 302 only for truly temporary
- [ ] Removed pages: either 301 to relevant replacement OR return 410 if genuinely gone
- [ ] Migration redirects mapped 1:1 for top 100 URLs by traffic, top 100 by backlinks

## 5. STATUS CODES

- [ ] 200 for indexable pages
- [ ] Soft 404s identified and fixed — empty results pages should return 404 or 410, or be made useful with content
- [ ] 5xx errors monitored, alerting in place
- [ ] Custom 404 page is helpful — links to search, popular pages, sitemap

## 6. RENDERING

- [ ] Site renders without JavaScript for critical content (progressive enhancement) OR SSR/SSG is configured
- [ ] GSC URL Inspection "Live test" shows expected HTML including internal links, headings, copy
- [ ] Lazy-loaded content is either crawlable or not critical for ranking
- [ ] Key pages pass mobile-friendly test

## 7. STRUCTURED DATA

- [ ] Valid schema per template — at minimum: Organization + Breadcrumb site-wide
- [ ] Product pages: `Product` + `Offer` + `AggregateRating` (where genuine)
- [ ] Articles: `Article` with `author`, `datePublished`, `dateModified`
- [ ] Local: `LocalBusiness` with full NAP
- [ ] FAQ schema only where real FAQs exist and are visible on the page
- [ ] Validated in Rich Results Test + Schema.org validator
- [ ] No markup for content that isn't visible to users

## 8. PERFORMANCE (Core Web Vitals — Field Data)

| Metric | Good | Needs Improvement | Poor |
|---|---|---|---|
| LCP | ≤ 2.5s | ≤ 4.0s | > 4.0s |
| INP | ≤ 200ms | ≤ 500ms | > 500ms |
| CLS | ≤ 0.1 | ≤ 0.25 | > 0.25 |

- [ ] GSC Core Web Vitals report: > 75% of URLs pass
- [ ] CrUX data reviewed for representative templates
- [ ] Lab tests (Lighthouse) aligned with field data — investigate divergence

**Quick wins:**
- Compress and properly size images; use WebP/AVIF
- Set explicit `width` and `height` on images and embeds (CLS)
- Preload the LCP image if it's above the fold
- Defer non-critical JS; inline critical CSS
- Reduce third-party scripts — audit every one

## 9. MOBILE

- [ ] Viewport meta: `<meta name="viewport" content="width=device-width, initial-scale=1">`
- [ ] No horizontal scroll on mobile
- [ ] Tap targets ≥ 48×48 px
- [ ] Font size ≥ 16px body copy
- [ ] Intrusive interstitials avoided
- [ ] Mobile-first indexing — mobile version is the canonical source of content

## 10. SECURITY

- [ ] Valid SSL certificate, no mixed content
- [ ] HSTS header configured
- [ ] `X-Content-Type-Options: nosniff`
- [ ] `Referrer-Policy` set
- [ ] `Content-Security-Policy` considered (advanced)

## 11. MONITORING

- [ ] GSC property verified for every protocol/subdomain variant in use (or Domain property)
- [ ] Bing Webmaster Tools configured
- [ ] Uptime monitoring in place
- [ ] Ranking monitoring for priority keywords (SEMrush, Ahrefs, or custom)
- [ ] Log file analysis quarterly for crawl patterns

---

## RED FLAGS TO FIX IMMEDIATELY

| Symptom | Likely cause |
|---|---|
| Sudden indexation drop | `noindex` deployed, `robots.txt` `Disallow`, canonical conflict, migration issue |
| Traffic drop with no ranking change | Measurement issue (GA config, tracking broken) or SERP feature loss |
| Massive increase in "Discovered – currently not indexed" | Thin/duplicate content flooding from CMS, parameter URLs, faceted nav |
| Soft 404 spike | Empty category pages, out-of-stock products returning 200 |
| Hreflang errors in GSC | Missing reciprocal tags, wrong codes, pointing to non-indexable URLs |

---

*Made with care · ghassenbahroun@yahoo.fr · github.com/XxAKLONxX*
