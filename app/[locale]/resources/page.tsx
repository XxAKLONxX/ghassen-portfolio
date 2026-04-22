import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { PixelCard } from '@/components/pixel-card';
import { PixelBadge } from '@/components/pixel-badge';
import { PixelGrid } from '@/components/pixel-grid';
import { PixelButton } from '@/components/pixel-button';
import { JsonLd } from '@/components/json-ld';
import { Download, ExternalLink, Github, FileCheck, Search, Wrench, Clock } from 'lucide-react';
import Link from 'next/link';
import { locales, pageSEO, type Locale, SITE_URL } from '@/lib/i18n';
import { absUrl, languageAlternates, breadcrumbSchema, resourcesSchema } from '@/lib/schema';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!(locales as string[]).includes(raw)) notFound();
  const locale = raw as Locale;
  const seo = pageSEO.resources[locale];
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: absUrl(locale, 'resources'), languages: languageAlternates('resources') },
    openGraph: { url: absUrl(locale, 'resources'), title: seo.title, description: seo.description },
    twitter: { title: seo.title, description: seo.description },
    keywords: [seo.keyword, 'SEO checklist', 'free SEO tools', 'Ghassen Bahroun'],
  };
}

const resourcesForSchema = [
  { name: 'SEO Site Audit Checklist', description: 'Ten-section site audit framework.', url: `${SITE_URL}/resources/seo-site-audit-checklist.md`, format: 'text/markdown' },
  { name: 'Keyword Research Template', description: 'Seven-phase keyword research framework.', url: `${SITE_URL}/resources/keyword-research-template.md`, format: 'text/markdown' },
  { name: 'Technical SEO Checklist', description: 'Code-level technical SEO checklist.', url: `${SITE_URL}/resources/technical-seo-checklist.md`, format: 'text/markdown' },
];

export default async function Resources({ params }: Props) {
  const { locale: raw } = await params;
  if (!(locales as string[]).includes(raw)) notFound();
  const locale = raw as Locale;
  const templates = [
    {
      title: 'SEO Site Audit Checklist',
      description:
        'Ten-section checklist covering crawl, indexation, architecture, performance, on-page, content, international, backlinks, mobile, and analytics. The same framework I use on client audits.',
      icon: FileCheck,
      tag: 'Template',
      meta: [
        { label: 'Type', value: 'Checklist' },
        { label: 'Pages', value: '~6' },
      ],
      href: '/resources/seo-site-audit-checklist.md',
      cta: 'Download .md',
      download: true,
    },
    {
      title: 'Keyword Research Template',
      description:
        'Seven-phase framework from foundation and seed discovery through clustering, prioritisation, and handoff. Includes the full spreadsheet column schema I use on multilingual projects.',
      icon: Search,
      tag: 'Framework',
      meta: [
        { label: 'Type', value: 'Framework' },
        { label: 'Pages', value: '~5' },
      ],
      href: '/resources/keyword-research-template.md',
      cta: 'Download .md',
      download: true,
    },
    {
      title: 'Technical SEO Checklist',
      description:
        'Code-level checklist for pre-launch and quarterly audits — crawlability, indexation, URL structure, redirects, rendering, schema, Core Web Vitals, mobile, security. Red-flag reference included.',
      icon: Wrench,
      tag: 'Checklist',
      meta: [
        { label: 'Type', value: 'Checklist' },
        { label: 'Pages', value: '~5' },
      ],
      href: '/resources/technical-seo-checklist.md',
      cta: 'Download .md',
      download: true,
    },
    {
      title: 'Google Ads Campaign Brief',
      description:
        'Campaign structure, asset matrix, negative keyword lists, and tracking plan — for launching Performance Max and Search campaigns across markets. Coming soon.',
      icon: Clock,
      tag: 'Soon',
      meta: [
        { label: 'Type', value: 'Template' },
        { label: 'Status', value: 'In progress' },
      ],
      href: `/${locale}/contact`,
      cta: 'Notify me',
      download: false,
      muted: true,
    },
  ];

  const workflow = [
    {
      step: '01',
      title: 'Free to download',
      description:
        'All templates are released openly. Use them on client projects, adapt them, rebrand them — no attribution required.',
    },
    {
      step: '02',
      title: 'Built from practice',
      description:
        'Every framework here is drawn from live work on multilingual B2B, edtech, healthcare, and MENA projects. Nothing theoretical.',
    },
    {
      step: '03',
      title: 'Maintained',
      description:
        'Updated as the search landscape shifts — Core Web Vitals thresholds, schema changes, new GSC features, and more.',
    },
  ];

  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="py-16 md:py-24 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-6">
              <p className="text-cyan font-mono text-sm font-semibold">
                Open Source &amp; Resources
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-balance">
                Free templates &amp;{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-cyan-light">
                  open tooling
                </span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
                Working frameworks and Python scripts I&apos;ve built and shared. Download the
                templates for your own projects, or grab the tooling straight from GitHub.
              </p>
            </div>
          </div>
        </section>

        {/* Featured GitHub Card */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden">
              {/* Purple-accent glow background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-accent/10 via-transparent to-cyan/5 blur-2xl"></div>

              <PixelCard variant="glow" className="relative border-purple-accent/40 p-8 md:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                  <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center gap-3 flex-wrap">
                      <PixelBadge variant="accent" size="md">
                        <Github className="w-3 h-3 mr-1.5 inline" />
                        Open Source
                      </PixelBadge>
                      <PixelBadge variant="muted" size="sm">
                        @XxAKLONxX
                      </PixelBadge>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold">
                      GitHub — Python SEO tooling
                    </h2>

                    <p className="text-muted-foreground leading-relaxed">
                      A growing collection of Python scripts I&apos;ve built in production:
                      sitemap generators with adaptive crawling and Playwright support, GSC URL
                      Inspection API automation, SERP tracking with fuzzy keyword matching, bulk
                      meta description generators, and more. Free to use, fork, and adapt.
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {['Python', 'Playwright', 'Pandas', 'GSC API', 'SEMrush API'].map(
                        (tag) => (
                          <PixelBadge key={tag} variant="muted" size="sm">
                            {tag}
                          </PixelBadge>
                        ),
                      )}
                    </div>
                  </div>

                  <div className="flex lg:justify-end">
                    <a
                      href="https://github.com/XxAKLONxX"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
                      <PixelButton variant="accent" size="lg">
                        View on GitHub
                        <ExternalLink className="w-4 h-4 ml-2 inline" />
                      </PixelButton>
                    </a>
                  </div>
                </div>
              </PixelCard>
            </div>
          </div>
        </section>

        {/* Templates Grid */}
        <section className="py-16 md:py-24 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-2 mb-12">
              <h2 className="text-2xl md:text-3xl font-bold">Downloadable templates</h2>
              <p className="text-muted-foreground">
                Working frameworks drawn directly from client projects
              </p>
            </div>

            <PixelGrid cols={2} gap="lg">
              {templates.map((tpl) => {
                const Icon = tpl.icon;
                return (
                  <PixelCard
                    key={tpl.title}
                    variant={tpl.muted ? 'subtle' : 'default'}
                    className="flex flex-col"
                  >
                    <div className="flex flex-col flex-grow space-y-5">
                      {/* Head */}
                      <div className="flex items-start justify-between gap-4">
                        <div
                          className={`w-12 h-12 rounded-sm border flex items-center justify-center ${
                            tpl.muted
                              ? 'border-muted/30 bg-muted/10 text-muted-foreground'
                              : 'border-cyan/30 bg-cyan/5 text-cyan'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <PixelBadge
                          variant={tpl.muted ? 'muted' : 'primary'}
                          size="sm"
                        >
                          {tpl.tag}
                        </PixelBadge>
                      </div>

                      {/* Body */}
                      <div className="space-y-3 flex-grow">
                        <h3
                          className={`text-xl font-semibold ${
                            tpl.muted ? 'text-muted-foreground' : 'text-foreground'
                          }`}
                        >
                          {tpl.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {tpl.description}
                        </p>
                      </div>

                      {/* Meta */}
                      <div className="flex flex-wrap gap-4 text-xs font-mono text-muted-foreground pt-4 border-t border-border">
                        {tpl.meta.map((m) => (
                          <span key={m.label}>
                            {m.label} ·{' '}
                            <span className="text-foreground">{m.value}</span>
                          </span>
                        ))}
                      </div>

                      {/* CTA */}
                      <div className="pt-2">
                        {tpl.download ? (
                          <a href={tpl.href} download>
                            <PixelButton variant="outline" size="md">
                              <Download className="w-3.5 h-3.5 mr-2 inline" />
                              {tpl.cta}
                            </PixelButton>
                          </a>
                        ) : (
                          <Link href={tpl.href}>
                            <PixelButton
                              variant="outline"
                              size="md"
                              className="opacity-70"
                            >
                              {tpl.cta}
                              <ExternalLink className="w-3.5 h-3.5 ml-2 inline" />
                            </PixelButton>
                          </Link>
                        )}
                      </div>
                    </div>
                  </PixelCard>
                );
              })}
            </PixelGrid>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 md:py-24 border-t border-border bg-card/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-2 mb-12">
              <h2 className="text-2xl md:text-3xl font-bold">Why I share this</h2>
              <p className="text-muted-foreground">
                A small note on how to use — and adapt — these resources
              </p>
            </div>

            <PixelGrid cols={3} gap="md">
              {workflow.map((item) => (
                <PixelCard key={item.step} variant="subtle">
                  <div className="space-y-4">
                    <div className="text-3xl font-mono font-bold text-cyan">
                      {item.step}
                    </div>
                    <h3 className="font-semibold text-foreground text-lg">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </PixelCard>
              ))}
            </PixelGrid>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 border-t border-border">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">
                Need something custom?
              </h2>
              <p className="text-muted-foreground text-lg">
                Happy to tailor any of these templates to your project — or build you a
                bespoke Python tool. Let&apos;s talk.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href={`/${locale}/contact`}>
                <PixelButton variant="primary" size="lg">
                  Start A Project
                </PixelButton>
              </Link>
              <a
                href="https://github.com/XxAKLONxX"
                target="_blank"
                rel="noopener noreferrer"
              >
                <PixelButton variant="outline" size="lg">
                  <Github className="w-4 h-4 mr-2 inline" />
                  Browse on GitHub
                </PixelButton>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
