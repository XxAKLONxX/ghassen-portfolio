# /docs — Project Documentation

This folder is **excluded from the website build**. It travels with the codebase but is never served. Files here are reference material for you and any AI you ask to extend the site.

## Files

### [`TEMPLATE.md`](./TEMPLATE.md)
The complete design system reference: colors, typography, components, spacing, motion, do's and don'ts. This is the visual spec.

### [`INTEGRATION.md`](./INTEGRATION.md)
Step-by-step recipe for adding a new page. Includes a fully worked `/blog` example showing all 6 files you need to touch. This is the "how to build" guide.

### [`DEPLOYMENT.md`](./DEPLOYMENT.md)
Cloudflare Pages setup, GSC submission, and post-launch SEO checklist.

---

## How to use this with an AI

When you want to add a page (let's say a `/case-studies` page):

1. Open Claude / ChatGPT / your AI of choice
2. Paste **`TEMPLATE.md`** + **`INTEGRATION.md`** (in that order)
3. Tell it: *"Add a /case-studies page following the recipe. I want it to feature 6 case study cards with metric + outcome + tags. Primary keyword: 'SEO case studies Tunis'."*
4. The AI will produce all 6 file edits — copy each into your project.
5. Run `npx tsc --noEmit` to verify, then `git push` to deploy.

The AI doesn't need to see the rest of the codebase — these two files contain everything required to produce on-brand, SEO-correct code.

---

## Updating the docs

If you change global styles, add a new component pattern, or change the page architecture, **update these files** so future AI builds stay consistent. Stale docs lead to off-brand pages.
