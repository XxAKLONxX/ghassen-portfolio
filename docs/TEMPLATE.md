# TEMPLATE.md — Design System Reference

> **What this file is:** The complete visual + structural spec for this portfolio.
> **How to use it:** Paste this entire file into any AI (Claude, ChatGPT, etc.) along with `INTEGRATION.md` and ask it to build a new page. It will produce on-brand code that fits the existing site.
> **Stack:** Next.js 15 (App Router) + React 19 + Tailwind CSS 4 + TypeScript + Lucide icons.

---

## 1. Aesthetic Philosophy

Dark, futuristic, minimal. Pixel-inspired in **details only** — never retro/game-like.
- Grid-based, generous spacing
- Sharp edges, slightly blocky shapes (subtle clip-path corners on cards/buttons)
- Glowing cyan accents for interactive states
- Mono font for labels, sans for body and headings
- Restrained color: cyan dominates, purple is rare

**Do not** make it look like a video game, an arcade, or a Geocities throwback. The pixel language lives in 8×8 logo marks, blocky icons, sharp clipped corners, and glow shadows — not in pixel fonts or scanlines on the body.

---

## 2. Color Tokens

All colors are CSS custom properties in `app/globals.css`. Use the token name, not the hex.

| Token | Hex | Use |
|---|---|---|
| `--background` | `#0a0f1c` | Page background |
| `--foreground` | `#e5e7eb` | Primary text |
| `--card` | `#111827` | Card surfaces |
| `--popover` | `#1f2937` | Dropdowns, modals |
| `--cyan` | `#27f5e0` | Primary accent — buttons, links, headings emphasis |
| `--cyan-light` | `#27f2f5` | Secondary accent — gradients with cyan |
| `--purple-accent` | `#7c3aed` | Rare accent — featured/special only (max 1 per section) |
| `--muted` | `#374151` | Disabled / inactive |
| `--muted-foreground` | `#9ca3af` | Secondary text, captions |
| `--border` | `#1f2937` | Card borders, dividers |

**Tailwind class equivalents:** `bg-background`, `text-foreground`, `bg-card`, `text-cyan`, `text-cyan-light`, `text-purple-accent`, `text-muted-foreground`, `border-border`.

**Glow shadows** (also in globals.css):
- `glow-cyan` — soft glow, default hover
- `glow-cyan-strong` — strong glow, active/focus
- `glow-purple` / `glow-purple-strong` — for accent elements only

---

## 3. Typography

| Family | Token | Use |
|---|---|---|
| Geist Sans | `font-sans` | All body, headings, default |
| Geist Mono | `font-mono` | Labels, code, kickers, nav items, badges |

**Type scale** (Tailwind):
- Hero h1: `text-4xl sm:text-5xl md:text-6xl font-bold leading-tight`
- Section h2: `text-2xl md:text-3xl font-bold`
- Card h3: `text-lg font-semibold` or `text-xl font-semibold`
- Body: `text-muted-foreground text-sm` or `text-base leading-relaxed`
- Kicker (above hero h1): `text-cyan font-mono text-sm font-semibold`
- Badge / nav: `font-mono text-xs uppercase tracking-tight`

**Headings rule:** never use `text-cyan` on the whole heading. Only on emphasis spans:
```tsx
<h1>Strategic Growth Through{' '}
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-cyan-light">
    SEO &amp; SEM
  </span>
</h1>
```

---

## 4. Spacing & Layout

**Page container** (always use this for content):
```tsx
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
```

**Section padding:**
- Standard: `py-16 md:py-24`
- Hero: `py-20 md:py-32`
- Tight CTA: `py-12 md:py-16`

**Section dividers:** `border-t border-border` or `border-y border-border`. Sometimes alternate with `bg-card/30` for subtle stripe effect.

**Vertical rhythm inside sections:** `space-y-8` (or `space-y-12` for spacious areas) on the wrapping div.

**Grids:** always use the `<PixelGrid>` component (see § 6). Do not write raw Tailwind `grid grid-cols-X` for content cards.

**Responsive philosophy:**
- Mobile = single column
- Tablet (md, ≥768px) = 2 columns where applicable
- Desktop (lg, ≥1024px) = 2-4 columns depending on density

---

## 5. Pixel Effects (the signature look)

**Subtle clip-path corners on cards/buttons** — these give the "blocky" feel without being childish. Defined in `globals.css` as utility classes `pixel-border` and `pixel-border-subtle`. Always apply via the `<PixelCard>` and `<PixelButton>` components.

**Glow on hover** — every interactive element should add a glow on `:hover`. The component library does this automatically. If writing custom: `hover:glow-cyan` or `hover:glow-cyan-strong`.

**Lift on hover** — `hover:-translate-y-0.5` for buttons, `hover:-translate-y-1` for cards. Always paired with `transition-all duration-200`.

**Pixel logo / icon marks** — small blocky decorations made from CSS grid. Use sparingly.

---

## 6. Component Library

All components live in `/components/`. Always use these instead of writing custom equivalents.

### `<PixelCard>` — `components/pixel-card.tsx`
```tsx
<PixelCard variant="default" | "glow" | "subtle">
  {children}
</PixelCard>
```
- `default` — standard card with cyan border on hover
- `glow` — has a permanent soft cyan glow (use for highlights, key metrics)
- `subtle` — muted border, less attention-grabbing

### `<PixelButton>` — `components/pixel-button.tsx`
```tsx
<PixelButton variant="primary" | "secondary" | "accent" | "outline" size="sm" | "md" | "lg">
  Click me
</PixelButton>
```
- `primary` — solid cyan, on dark bg. Main CTA per section.
- `secondary` — solid cyan-light. Pair with primary.
- `accent` — solid purple. **Use rarely** — special/featured CTAs only.
- `outline` — transparent with cyan border. Secondary action.

To make a button navigate, **wrap it** in a Next `<Link>` or `<a>`:
```tsx
<Link href={`/${locale}/contact`}>
  <PixelButton variant="primary" size="lg">Get In Touch</PixelButton>
</Link>
```

### `<PixelBadge>` — `components/pixel-badge.tsx`
```tsx
<PixelBadge variant="primary" | "secondary" | "accent" | "muted" size="sm" | "md">
  Label
</PixelBadge>
```

### `<PixelGrid>` — `components/pixel-grid.tsx`
```tsx
<PixelGrid cols={2 | 3 | 4} gap="sm" | "md" | "lg">
  {items.map(...)}
</PixelGrid>
```

### `<Navigation>` and `<Footer>` — `components/navigation.tsx`, `components/footer.tsx`
Always include both, in this order:
```tsx
<Navigation />
<main className="min-h-screen">
  {/* page content */}
</main>
<Footer />
```

### `<JsonLd>` — `components/json-ld.tsx`
```tsx
<JsonLd data={schemaObject} />
<JsonLd data={[schema1, schema2]} /> // arrays render multiple <script> tags
```

### `<LanguageSwitcher>` — `components/language-switcher.tsx`
Already inside `<Navigation>`. Don't duplicate.

---

## 7. Standard Page Structure

Every page follows this exact skeleton:

```tsx
return (
  <>
    <JsonLd data={[breadcrumbSchema(locale, 'pageKey', 'Page Label'), pageSpecificSchema(locale)]} />
    <Navigation />
    <main className="min-h-screen">

      {/* 1. HERO — always first, always with border-b */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <p className="text-cyan font-mono text-sm font-semibold">Page Kicker</p>
            <h1 className="text-4xl md:text-5xl font-bold">Page Title</h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              Lead paragraph.
            </p>
          </div>
        </div>
      </section>

      {/* 2-N. CONTENT SECTIONS — alternate plain and bg-card/30 */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold">Section Title</h2>
              <p className="text-muted-foreground">Section subtitle</p>
            </div>
            <PixelGrid cols={2} gap="lg">
              {/* cards */}
            </PixelGrid>
          </div>
        </div>
      </section>

      {/* OPTIONAL: TEASER / CROSS-LINK section before CTA */}
      <section className="py-16 md:py-24 border-t border-border">
        ...
      </section>

      {/* LAST: CTA SECTION — always centered, always on bg-card/30 */}
      <section className="py-16 md:py-24 bg-card/30 border-t border-border">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">CTA Headline</h2>
            <p className="text-muted-foreground text-lg">CTA supporting text.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href={`/${locale}/contact`}>
              <PixelButton variant="primary" size="lg">Primary Action</PixelButton>
            </Link>
            <Link href={`/${locale}/resources`}>
              <PixelButton variant="outline" size="lg">Secondary</PixelButton>
            </Link>
          </div>
        </div>
      </section>

    </main>
    <Footer />
  </>
);
```

**Section sequencing rule:** alternate background treatment to create rhythm.
1. Hero (no bg, `border-b`)
2. Content (no bg)
3. Content (`border-t`)
4. Cross-link / teaser (`border-t`, sometimes `bg-card/30`)
5. CTA (`bg-card/30 border-t`)

---

## 8. Motion

All animations are CSS-only, defined in `globals.css`. Do not pull in motion libraries.

| Animation | When to use |
|---|---|
| `animate-fade-in-up` | Hero on first paint |
| `animate-stagger` | Wrapper for lists where children fade in one-by-one (uses CSS nth-child delays) |
| `animate-text-glow` | Hover on logo, never on body text |
| `animate-pixel-pop` | Dropdown opening |
| `glow-cyan-pulse` | Live status indicators only |
| `hover:-translate-y-0.5` | Buttons |
| `hover:-translate-y-1` | Cards |

**Rule:** never animate on scroll without prefers-reduced-motion respect, never animate more than 2 elements simultaneously outside the hero.

---

## 9. Internationalization (i18n)

The site supports **3 locales**: `en`, `fr`, `ar` (RTL).

URL structure: `/en/path`, `/fr/path`, `/ar/path` — always with locale prefix.

**Reading the current locale in a page:**
```tsx
type Props = { params: Promise<{ locale: string }> };
export default async function Page({ params }: Props) {
  const { locale: raw } = await params;
  if (!(locales as string[]).includes(raw)) notFound();
  const locale = raw as Locale;
  // ...
}
```

**Translating UI strings:** import the `ui` object from `lib/i18n.ts` and access `ui[locale].nav.about` etc. For longer page-specific copy, define a `copy` object inline (see `app/[locale]/page.tsx`).

**RTL:** automatic — the `[locale]/layout.tsx` sets `dir="rtl"` for Arabic. Tailwind's logical properties (`ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-`) handle most cases. If you write `ml-4`, fix it to `ms-4`.

**Adding a new translatable string:** add it to `ui` in `lib/i18n.ts` for all 3 locales — never leave one missing.

---

## 10. SEO Requirements (NON-NEGOTIABLE)

Every page **must** export `generateMetadata` and inject schema. See `INTEGRATION.md` for the full per-page checklist. The short version:

- `title` ≤ 60 chars, includes the page's primary keyword + brand
- `description` ≤ 155 chars, action-oriented
- `alternates.canonical` — set to absolute URL
- `alternates.languages` — full hreflang map via `languageAlternates(pageKey)`
- `openGraph` + `twitter` cards
- `keywords` — 4-8 terms, primary keyword first
- One `breadcrumbSchema` JSON-LD per page (except home — already in layout)
- One page-type-specific schema where it applies (`AboutPage`, `ContactPage`, `ItemList`, etc.)

Every new page also needs:
- An entry in `lib/i18n.ts` → `pageSEO` (all 3 locales)
- An entry in `lib/i18n.ts` → `pagePaths`
- An entry in `lib/i18n.ts` → `ui[locale].nav` for the nav label
- A nav link in `components/navigation.tsx`
- The sitemap will pick it up automatically once added to `pagePaths`

---

## 11. What NOT to Do

- ❌ Don't use rounded corners larger than `rounded-sm`. The radius variable is `2px` for a reason.
- ❌ Don't use shadow-md / shadow-lg without a glow class. Standard drop shadows look generic.
- ❌ Don't introduce new colors outside the token palette.
- ❌ Don't use emoji as primary icons (we use `lucide-react`). One or two for accent is fine.
- ❌ Don't add gradients on solid color backgrounds (e.g., gradient text on a card). Gradients only on transparent text or `bg-gradient-to-b from-background to-card/20` for atmospheric backdrops.
- ❌ Don't write inline styles. Use Tailwind utilities or extend `globals.css`.
- ❌ Don't import `motion` or any animation library. CSS only.
- ❌ Don't add a `<Container>` wrapper component. The `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` pattern is the convention.
- ❌ Don't put `'use client'` on a page that needs `generateMetadata`. Split into a server-side page + a client child component (see `/contact` for pattern).
- ❌ Don't hardcode `/about` etc. — always use ``/${locale}/about`` for internal links.

---

## 12. Quick Visual Checklist

Before declaring a page done, verify:
- [ ] Hero kicker in `text-cyan font-mono text-sm font-semibold`
- [ ] H1 has either a gradient span or stays plain (no full-cyan h1s)
- [ ] All cards use `<PixelCard>`, all buttons use `<PixelButton>`
- [ ] Spacing follows `py-16 md:py-24` for sections
- [ ] Final section is a `bg-card/30 border-t` CTA
- [ ] Internal links use ``/${locale}/path``
- [ ] `<JsonLd>` is the first child after `<>`
- [ ] `generateMetadata` exports correctly
- [ ] No raw `grid-cols-X` — use `<PixelGrid>`
- [ ] No inline hex colors

---

*This document is a living spec. When you change global styles or add a new component pattern, update the relevant section here so future AI builds stay consistent.*
