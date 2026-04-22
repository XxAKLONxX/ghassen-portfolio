# SEO Site Audit Checklist
*A practitioner's checklist — v1.0*

> Authored by **Ghassen Bahroun** · SEO/SEM Specialist
> Use this as a starting framework for technical and on-page SEO audits. Adapt thresholds and priorities to your vertical and market.

---

## 1. CRAWL & INDEXATION

- [ ] Run a full crawl (Screaming Frog, Sitebulb, or equivalent) on the production domain
- [ ] Check `robots.txt` — confirm no accidental disallow on important sections
- [ ] Verify `sitemap.xml` — submitted in GSC, reachable from `robots.txt`, contains only canonical 200 URLs
- [ ] Check sitemap last-modified dates reflect reality (not "all updated today")
- [ ] Pull GSC "Pages" report → count Indexed vs. Not Indexed, categorise reasons (noindex, duplicate, crawled-not-indexed, soft 404)
- [ ] Flag crawl waste: PDFs, parameter URLs, faceted nav, staging subdomains, pagination loops
- [ ] Check `noindex` coverage — intentional on thank-you, cart, internal search pages?
- [ ] Inspect canonical tags — self-referential on primary pages, cross-referential only where intentional
- [ ] Check for mixed-signal conflicts: canonical + noindex, canonical pointing to a redirected URL, hreflang to noindex pages

## 2. SITE ARCHITECTURE

- [ ] Click-depth from homepage — core money pages ≤ 3 clicks
- [ ] Orphan pages — crawl vs. sitemap diff; investigate unlinked URLs
- [ ] Internal linking distribution — hub pages receiving enough anchor variety
- [ ] Breadcrumbs present and marked up with schema
- [ ] URL structure — lowercase, hyphens, no session IDs, localised slugs where relevant
- [ ] Pagination handled cleanly (self-canonical, not `rel=prev/next` — deprecated)

## 3. PERFORMANCE (Core Web Vitals)

- [ ] LCP ≤ 2.5s (field data, GSC Core Web Vitals report)
- [ ] INP ≤ 200ms
- [ ] CLS ≤ 0.1
- [ ] Lighthouse pass on representative templates: home, category, product/article, local landing
- [ ] Images: modern formats (WebP/AVIF), `width`/`height` set, lazy-loading below fold
- [ ] Fonts: `font-display: swap`, preload critical fonts, subset where possible
- [ ] Render-blocking JS/CSS minimised
- [ ] Third-party script audit — tag manager bloat, heatmaps, unused pixels

## 4. ON-PAGE SEO

- [ ] Title tags — unique, ≤ 60 chars visible, primary keyword + brand
- [ ] Meta descriptions — present, ≤ 155 chars, action-oriented
- [ ] Single H1 per page, matching intent
- [ ] Heading hierarchy logical (no skipped levels)
- [ ] Images: descriptive alt text, file names, no `image_1.jpg`
- [ ] Schema markup present where applicable: Organization, Breadcrumb, Product, Article, FAQ, LocalBusiness
- [ ] Validate schema in GSC rich results test + Schema.org validator

## 5. CONTENT QUALITY

- [ ] Content audit — identify thin (<300 words), duplicate, outdated, underperforming pages
- [ ] Decision per low-performer: keep / improve / consolidate / redirect / remove
- [ ] Topical coverage gaps vs. competitors and SERP
- [ ] E-E-A-T signals: author bios, sources, last-updated dates, expertise indicators
- [ ] Internal linking from high-authority pages to priority targets

## 6. INTERNATIONAL SEO (if applicable)

- [ ] `hreflang` implementation — reciprocal, self-referencing, valid language-country codes
- [ ] `x-default` set for root/language selector
- [ ] Domain strategy documented (ccTLD / subdomain / subfolder) and consistent
- [ ] Language switcher uses proper hreflang and doesn't redirect based only on IP
- [ ] Localised: URLs, titles, metas, structured data, currencies, phone formats
- [ ] Separate GSC property per language version, monitored

## 7. BACKLINK & AUTHORITY

- [ ] Referring domains trend (Ahrefs / SEMrush / Majestic)
- [ ] Toxic link review — disavow only if clear manipulative pattern
- [ ] Lost links worth reclaiming
- [ ] Competitor link-gap analysis for priority pages
- [ ] Internal PageRank distribution sanity check

## 8. MOBILE & UX

- [ ] Mobile-first rendering verified in GSC URL Inspection
- [ ] Tap targets ≥ 48px, no horizontal scroll
- [ ] Viewport meta configured
- [ ] Forms usable on mobile — proper input types, autocomplete
- [ ] Interstitials non-intrusive

## 9. SECURITY & INFRASTRUCTURE

- [ ] HTTPS site-wide, HSTS enabled, no mixed content
- [ ] 301 redirects for `http` → `https`, `www` ↔ non-`www` canonical chosen
- [ ] No redirect chains > 1 hop on important URLs
- [ ] 4xx and 5xx errors monitored; custom 404 is helpful, returns 404 status
- [ ] Server response time < 600ms

## 10. ANALYTICS & TRACKING

- [ ] GA4 installed, events configured (form submits, clicks, scroll, video)
- [ ] GSC verified, linked to GA4, sitemap submitted
- [ ] Conversion tracking validated end-to-end
- [ ] Looker Studio or equivalent dashboard — one source of truth
- [ ] UTM conventions documented, applied consistently

---

## DELIVERABLE FORMAT

At the end of an audit I typically produce:

1. **Executive summary** (1 page) — top 5 findings, projected impact
2. **Prioritised backlog** — High / Medium / Low, effort estimate, owner
3. **Technical appendix** — full crawl data, screenshots, specific URLs
4. **Tracker** — re-check cadence (30/60/90 day)

---

*Made with care · ghassenbahroun@yahoo.fr · github.com/XxAKLONxX*
