# INTEGRATION.md — How to Add a New Page

> **What this file is:** A step-by-step recipe for adding a new page to this portfolio. Paste this file + `TEMPLATE.md` into any AI to generate a fully-integrated, SEO-hardened, multilingual page that fits the existing design.
> **Prerequisites:** Read `TEMPLATE.md` first for the visual rules.

---

## Quick Reference — the 6-Step Recipe

To add a new page (let's call it `/yourpage`), you must update **6 places**:

1. `lib/i18n.ts` → add to `pagePaths`
2. `lib/i18n.ts` → add to `pageSEO` (all 3 locales: en/fr/ar)
3. `lib/i18n.ts` → add to `ui[locale].nav` (all 3 locales)
4. `components/navigation.tsx` → add to `navItems` array
5. `app/[locale]/yourpage/page.tsx` → create the page file
6. *(Optional)* `lib/schema.ts` → add a custom JSON-LD helper if a standard one doesn't fit

The sitemap and hreflang tags update **automatically** once steps 1–2 are done.

---

## File-by-File Walkthrough

### Step 1 — Register the path

Open `lib/i18n.ts`. Find `pagePaths` and add your route:

```ts
export const pagePaths: Record<PageKey, string> = {
  home: '',
  about: 'about',
  experience: 'experience',
  skills: 'skills',
  resources: 'resources',
  contact: 'contact',
  yourpage: 'yourpage', // ← add
};
```

Then add `'yourpage'` to the `PageKey` type union right above:

```ts
export type PageKey = 'home' | 'about' | 'experience' | 'skills' | 'resources' | 'contact' | 'yourpage';
```

### Step 2 — Define SEO for all 3 locales

Still in `lib/i18n.ts`, find `pageSEO` and add an entry. **All 3 locales mandatory.** Pick ONE primary keyword per locale and weave it into title + description naturally. Keep title ≤ 60 chars and description ≤ 155 chars.

```ts
yourpage: {
  en: {
    keyword: 'your primary keyword',
    title: 'Your Page Title — Keyword Phrase | Ghassen Bahroun',
    description: 'A single sentence describing the page, with the keyword once, action-oriented, under 155 characters.',
  },
  fr: {
    keyword: 'votre mot-clé principal',
    title: 'Titre de la Page — Phrase Clé | Ghassen Bahroun',
    description: 'Une phrase décrivant la page, avec le mot-clé, orientée action, moins de 155 caractères.',
  },
  ar: {
    keyword: 'كلمتك الرئيسية',
    title: 'عنوان الصفحة — الكلمة المفتاحية | غسان بحرون',
    description: 'جملة واحدة تصف الصفحة، مع الكلمة المفتاحية، أقل من 155 حرفاً.',
  },
},
```

### Step 3 — Add nav label translations

In `lib/i18n.ts`, find `ui` and add the nav label to all 3 locales:

```ts
ui: {
  en: { nav: { ..., yourpage: 'Your Page' } },
  fr: { nav: { ..., yourpage: 'Votre Page' } },
  ar: { nav: { ..., yourpage: 'صفحتك' } },
}
```

You'll also need to add `yourpage` to the `nav` type at the top of the `ui` definition. The TypeScript compiler will tell you exactly where if you forget.

### Step 4 — Add to navigation

Open `components/navigation.tsx` and add to `navItems`:

```tsx
const navItems = [
  { key: 'home', label: t.nav.home },
  { key: 'about', label: t.nav.about },
  // ...
  { key: 'yourpage', label: t.nav.yourpage }, // ← add
];
```

That's it for nav — the existing `hrefFor()` function will route correctly.

### Step 5 — Create the page file

Create `app/[locale]/yourpage/page.tsx`. Use this template — copy-paste, then replace what's in `{{...}}`:

```tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { PixelCard } from '@/components/pixel-card';
import { PixelBadge } from '@/components/pixel-badge';
import { PixelGrid } from '@/components/pixel-grid';
import { PixelButton } from '@/components/pixel-button';
import { JsonLd } from '@/components/json-ld';
import Link from 'next/link';
import { locales, pageSEO, type Locale } from '@/lib/i18n';
import { absUrl, languageAlternates, breadcrumbSchema } from '@/lib/schema';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!(locales as string[]).includes(raw)) notFound();
  const locale = raw as Locale;
  const seo = pageSEO.yourpage[locale];

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: absUrl(locale, 'yourpage'),
      languages: languageAlternates('yourpage'),
    },
    openGraph: {
      url: absUrl(locale, 'yourpage'),
      title: seo.title,
      description: seo.description,
    },
    twitter: { title: seo.title, description: seo.description },
    keywords: [seo.keyword, 'SEO Tunis', 'Ghassen Bahroun'],
  };
}

export default async function YourPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!(locales as string[]).includes(raw)) notFound();
  const locale = raw as Locale;

  // Locale-specific copy lives in a single object so translations stay co-located
  const copy = {
    en: {
      kicker: 'Section Kicker',
      title: 'Page Title',
      lead: 'A short lead paragraph.',
      ctaTitle: 'Call To Action Headline',
      ctaText: 'Supporting text for the CTA.',
      ctaButton: 'Click Me',
    },
    fr: {
      kicker: 'En-tête de Section',
      title: 'Titre de la Page',
      lead: 'Un court paragraphe d\u2019introduction.',
      ctaTitle: 'Appel à l\u2019Action',
      ctaText: 'Texte de soutien pour l\u2019appel à l\u2019action.',
      ctaButton: 'Cliquez',
    },
    ar: {
      kicker: 'عنوان القسم',
      title: 'عنوان الصفحة',
      lead: 'فقرة مقدمة قصيرة.',
      ctaTitle: 'دعوة للعمل',
      ctaText: 'نص داعم للدعوة.',
      ctaButton: 'انقر',
    },
  }[locale];

  return (
    <>
      <JsonLd data={breadcrumbSchema(locale, 'yourpage', 'Your Page')} />
      <Navigation />
      <main className="min-h-screen">

        {/* Hero */}
        <section className="py-16 md:py-24 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-6">
              <p className="text-cyan font-mono text-sm font-semibold">{copy.kicker}</p>
              <h1 className="text-4xl md:text-5xl font-bold text-balance">{copy.title}</h1>
              <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
                {copy.lead}
              </p>
            </div>
          </div>
        </section>

        {/* Add your content sections here following TEMPLATE.md § 7 */}

        {/* CTA */}
        <section className="py-16 md:py-24 bg-card/30 border-t border-border">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">{copy.ctaTitle}</h2>
              <p className="text-muted-foreground text-lg">{copy.ctaText}</p>
            </div>
            <Link href={`/${locale}/contact`}>
              <PixelButton variant="primary" size="lg">{copy.ctaButton}</PixelButton>
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
```

### Step 6 — (Optional) Add custom JSON-LD

If your page is a `BlogPosting`, `Article`, `FAQPage`, etc., add a helper to `lib/schema.ts`:

```ts
export function blogPostSchema(locale: Locale, post: { title: string; date: string; body: string; slug: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    datePublished: post.date,
    inLanguage: locale,
    author: { '@id': `${SITE_URL}/#person` },
    url: `${absUrl(locale, 'blog')}/${post.slug}`,
  };
}
```

Then include it in your page's `<JsonLd>` array:
```tsx
<JsonLd data={[breadcrumbSchema(locale, 'blog', 'Blog'), blogPostSchema(locale, post)]} />
```

---

## ⭐ Worked Example — Adding a `/blog` Page

Let's add a blog index page. Going through all 6 steps:

### 1. `lib/i18n.ts` — pagePaths

```ts
export type PageKey = 'home' | 'about' | 'experience' | 'skills' | 'resources' | 'contact' | 'blog';

export const pagePaths: Record<PageKey, string> = {
  home: '',
  about: 'about',
  experience: 'experience',
  skills: 'skills',
  resources: 'resources',
  contact: 'contact',
  blog: 'blog', // ← new
};
```

### 2. `lib/i18n.ts` — pageSEO

```ts
blog: {
  en: {
    keyword: 'SEO blog Tunis',
    title: 'SEO Blog — Insights from Tunis | Ghassen Bahroun',
    description: 'SEO blog from Tunis: technical audits, multilingual strategy, Google Ads tactics, and Python automation lessons from real client work.',
  },
  fr: {
    keyword: 'blog SEO Tunis',
    title: 'Blog SEO — Analyses depuis Tunis | Ghassen Bahroun',
    description: 'Blog SEO depuis Tunis : audits techniques, stratégie multilingue, tactiques Google Ads, leçons d\u2019automatisation Python.',
  },
  ar: {
    keyword: 'مدونة SEO تونس',
    title: 'مدونة SEO — رؤى من تونس | غسان بحرون',
    description: 'مدونة SEO من تونس: تدقيق تقني، استراتيجية متعددة اللغات، تكتيكات Google Ads، ودروس أتمتة بايثون.',
  },
},
```

### 3. `lib/i18n.ts` — ui nav labels

```ts
ui: {
  en: { nav: { ..., blog: 'Blog' } },
  fr: { nav: { ..., blog: 'Blog' } },
  ar: { nav: { ..., blog: 'مدونة' } },
}
```

(And `blog` to the type union for `nav`.)

### 4. `components/navigation.tsx` — add link

```tsx
const navItems = [
  { key: 'home', label: t.nav.home },
  { key: 'about', label: t.nav.about },
  { key: 'experience', label: t.nav.experience },
  { key: 'skills', label: t.nav.skills },
  { key: 'blog', label: t.nav.blog }, // ← new — usually placed after Skills
  { key: 'resources', label: t.nav.resources },
  { key: 'contact', label: t.nav.contact },
];
```

### 5. `app/[locale]/blog/page.tsx` — create the page

```tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { PixelCard } from '@/components/pixel-card';
import { PixelBadge } from '@/components/pixel-badge';
import { PixelGrid } from '@/components/pixel-grid';
import { PixelButton } from '@/components/pixel-button';
import { JsonLd } from '@/components/json-ld';
import Link from 'next/link';
import { locales, pageSEO, type Locale } from '@/lib/i18n';
import { absUrl, languageAlternates, breadcrumbSchema } from '@/lib/schema';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!(locales as string[]).includes(raw)) notFound();
  const locale = raw as Locale;
  const seo = pageSEO.blog[locale];
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: absUrl(locale, 'blog'), languages: languageAlternates('blog') },
    openGraph: { url: absUrl(locale, 'blog'), title: seo.title, description: seo.description },
    twitter: { title: seo.title, description: seo.description },
    keywords: [seo.keyword, 'SEO blog', 'Ghassen Bahroun'],
  };
}

export default async function Blog({ params }: Props) {
  const { locale: raw } = await params;
  if (!(locales as string[]).includes(raw)) notFound();
  const locale = raw as Locale;

  // Static post list — replace with CMS fetch later
  const posts = [
    {
      slug: 'multilingual-seo-checklist',
      title: 'Multilingual SEO: a 12-point checklist',
      excerpt: 'Hreflang, ccTLDs, content parity, and the mistakes I see most often on 5-language sites.',
      date: '2026-04-15',
      tags: ['Technical SEO', 'i18n'],
    },
    {
      slug: 'performance-max-france-vs-export',
      title: 'Why Performance Max wins France but loses your export markets',
      excerpt: 'Diagnosing the asset-coverage gap that quietly kills international P-Max performance.',
      date: '2026-03-22',
      tags: ['Google Ads', 'P-Max'],
    },
  ];

  const copy = {
    en: { kicker: 'SEO Blog', title: 'Notes from the trenches.', lead: 'Posts on multilingual SEO, paid search, and Python automation.' },
    fr: { kicker: 'Blog SEO', title: 'Notes du terrain.', lead: 'Articles sur le SEO multilingue, le SEA et l\u2019automatisation Python.' },
    ar: { kicker: 'مدونة SEO', title: 'ملاحظات من الميدان.', lead: 'مقالات حول SEO متعدد اللغات و SEA وأتمتة بايثون.' },
  }[locale];

  return (
    <>
      <JsonLd data={breadcrumbSchema(locale, 'blog', 'Blog')} />
      <Navigation />
      <main className="min-h-screen">

        {/* Hero */}
        <section className="py-16 md:py-24 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-6">
              <p className="text-cyan font-mono text-sm font-semibold">{copy.kicker}</p>
              <h1 className="text-4xl md:text-5xl font-bold">{copy.title}</h1>
              <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">{copy.lead}</p>
            </div>
          </div>
        </section>

        {/* Post grid */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <PixelGrid cols={2} gap="lg">
              {posts.map((post) => (
                <Link key={post.slug} href={`/${locale}/blog/${post.slug}`}>
                  <PixelCard variant="default" className="h-full cursor-pointer">
                    <div className="space-y-4">
                      <p className="text-xs font-mono text-muted-foreground">{post.date}</p>
                      <h2 className="text-xl font-semibold">{post.title}</h2>
                      <p className="text-muted-foreground text-sm leading-relaxed">{post.excerpt}</p>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {post.tags.map((tag) => (
                          <PixelBadge key={tag} variant="muted" size="sm">{tag}</PixelBadge>
                        ))}
                      </div>
                    </div>
                  </PixelCard>
                </Link>
              ))}
            </PixelGrid>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 bg-card/30 border-t border-border">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">Want me on your project?</h2>
            <Link href={`/${locale}/contact`}>
              <PixelButton variant="primary" size="lg">Get In Touch</PixelButton>
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
```

### 6. (Optional) Custom schema for individual posts

When you later add `app/[locale]/blog/[slug]/page.tsx` for individual posts, add `blogPostSchema()` to `lib/schema.ts` and use it there.

### Verify it works

```bash
npm run dev
```
Visit `/en/blog`, `/fr/blog`, `/ar/blog`. The language switcher will preserve the path. The sitemap (`/sitemap.xml`) will include all 3 blog URLs automatically. View page source — confirm canonical, hreflang, JSON-LD, and Open Graph tags are all present.

---

## Common Mistakes & Fixes

| Mistake | Fix |
|---|---|
| TS error: `Property 'yourpage' does not exist on type 'PageKey'` | You forgot to add it to the `PageKey` type union in `lib/i18n.ts`. |
| Page shows but isn't in sitemap | Add to `pagePaths`. The sitemap reads from there. |
| Hreflang missing for new page | Same — add to `pagePaths`. `languageAlternates()` reads from it. |
| Hardcoded `/about` link doesn't work | Use `` `/${locale}/about` `` — never bare paths. |
| `'use client'` blocks `generateMetadata` | Split: server-side `page.tsx` + client child component. See `app/[locale]/contact/` for the pattern. |
| Nav label is missing in one locale | Add it to all 3 `ui[locale].nav` entries. TypeScript will compile but the label will be `undefined`. |
| Title is too long for SERPs | Keep titles ≤ 60 chars. Test on [serpsim.com](https://www.serpsim.com/). |
| Forgot the breadcrumb schema | Every page except home needs `breadcrumbSchema(locale, 'pageKey', 'Label')`. |

---

## Adding a Dynamic Route (e.g. `/blog/[slug]`)

For pages with parameters:

```tsx
type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  // ... fetch post by slug, generate metadata from it
}
```

Inside the page, also build the canonical URL using the slug:
```ts
const url = `${absUrl(locale, 'blog')}/${slug}`;
```

For dynamic hreflang on slug-based pages, you'll typically want a per-slug helper since the slug may differ across languages — handle that explicitly when you implement.

---

## Adding a New Language

If you want to add Spanish (`es`):

1. Add `'es'` to the `Locale` type and `locales` array in `lib/i18n.ts`
2. Add an `es` entry to `localeMeta` (set `htmlLang: 'es'`, `dir: 'ltr'`, flag SVG)
3. Add `es` translations to **every** entry in `pageSEO`, `ui`
4. Add a Spanish flag SVG to `Flags` in `components/language-switcher.tsx`
5. Locale-specific copy in each page's `copy` object — add `es: { ... }`

That's it. The middleware, sitemap, hreflang, and routing all derive from `locales` automatically.

---

*Last updated when adding the i18n + SEO architecture. Update this file every time you change the page-creation flow.*
