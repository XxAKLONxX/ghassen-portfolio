import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { PixelCard } from '@/components/pixel-card';
import { PixelBadge } from '@/components/pixel-badge';
import { PixelGrid } from '@/components/pixel-grid';
import { JsonLd } from '@/components/json-ld';
import { PixelIcon } from '@/components/pixel-icon';
import { locales, pageSEO, type Locale } from '@/lib/i18n';
import { absUrl, languageAlternates, breadcrumbSchema, aboutPageSchema } from '@/lib/schema';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!(locales as string[]).includes(raw)) notFound();
  const locale = raw as Locale;
  const seo = pageSEO.about[locale];
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: absUrl(locale, 'about'), languages: languageAlternates('about') },
    openGraph: { url: absUrl(locale, 'about'), title: seo.title, description: seo.description },
    twitter: { title: seo.title, description: seo.description },
    keywords: [seo.keyword, 'SEO Tunis', 'Ghassen Bahroun'],
  };
}

export default async function About({ params }: Props) {
  const { locale: raw } = await params;
  if (!(locales as string[]).includes(raw)) notFound();
  const locale = raw as Locale;
  const journey = [
    {
      year: '2019 - 2022',
      role: 'Sales & Webmaster',
      company: 'Tangorythm, Djerba',
      highlights: [
        'Acquired new clients and managed website development projects',
        'Implemented SEO strategies and WordPress optimization',
        'Maintained client relationships with consistent repeat business',
      ],
    },
    {
      year: '2023 - 2025',
      role: 'SEO/SEM Strategist',
      company: 'Takiacademy, Tunisia',
      highlights: [
        'Led SEO strategy for 4 major websites from development',
        'Managed and optimized 36 SEA campaigns over 18 months',
        'Developed integrated performance tracking across portfolio',
      ],
    },
    {
      year: '2025',
      role: 'Freelance Consultant',
      company: 'Way Interactive Convergence & Bebrandy',
      highlights: [
        'Managed SEO/SEM for healthcare sector (4 campaigns)',
        'Executed search campaigns for international markets',
        'Provided strategic services for Qatari clients',
      ],
    },
    {
      year: '2025 - Present',
      role: 'SEO/SEM Specialist',
      company: 'Pinet Industry, Tunisia',
      highlights: [
        'Developing digital marketing campaigns across multiple channels',
        'Managing search engine marketing initiatives',
        'Optimizing performance across portfolio',
      ],
    },
  ];

  const values = [
    {
      title: 'Data-Driven',
      description: 'Every decision backed by analytics and performance metrics',
      icon: 'database',
    },
    {
      title: 'Strategic',
      description: 'Long-term vision combined with tactical execution',
      icon: 'planing',
    },
    {
      title: 'Innovative',
      description: 'Staying ahead of market trends and algorithm updates',
      icon: 'start-up',
    },
    {
      title: 'Collaborative',
      description: 'Working closely with teams to align on goals',
      icon: 'five',
    },
  ];

  return (
    <>
      <JsonLd data={[breadcrumbSchema(locale, 'about', 'About'), aboutPageSchema(locale)]} />
      <Navigation />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="py-16 md:py-24 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold">About Me</h1>
              <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
                I&apos;m a results-driven SEO/SEM specialist with 4+ years of experience transforming
                digital marketing strategies into measurable business growth across international markets.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold">My Journey</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Starting as a Webmaster and Sales professional in the tourism industry, I discovered
                  my passion for digital marketing and strategic growth. I&apos;ve since evolved to become
                  a strategic SEO/SEM specialist, managing complex campaigns and building long-term
                  organic growth strategies.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  My expertise spans technical SEO implementation, paid search campaign management,
                  analytics and reporting, and strategic planning for multi-site portfolios. I&apos;m fluent
                  in Arabic, French, and English, which has enabled me to work across diverse international
                  markets.
                </p>
              </div>

              <div className="space-y-4">
                {values.map((value) => (
                  <PixelCard key={value.title} variant="subtle">
                    <div className="flex gap-4 items-start">
                      <PixelIcon name={value.icon} size={36} alt={value.title} className="text-cyan shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{value.title}</h3>
                        <p className="text-muted-foreground text-sm">{value.description}</p>
                      </div>
                    </div>
                  </PixelCard>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-16 md:py-24 border-t border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-12">Professional Timeline</h2>
            <div className="space-y-8">
              {journey.map((item, index) => (
                <div key={item.year} className="relative pl-8 border-l-2 border-cyan/30">
                  <div className="absolute -left-3 top-0 w-4 h-4 bg-cyan rounded-sm"></div>
                  <PixelCard variant="subtle" className="!p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">{item.role}</h3>
                          <p className="text-cyan font-mono text-sm mt-1">{item.company}</p>
                        </div>
                        <PixelBadge variant="primary" size="sm">
                          {item.year}
                        </PixelBadge>
                      </div>
                      <ul className="space-y-2">
                        {item.highlights.map((highlight) => (
                          <li key={highlight} className="text-muted-foreground text-sm flex gap-2">
                            <span className="text-cyan">▸</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </PixelCard>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education & Certifications */}
        <section className="py-16 md:py-24 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-12">Education & Learning</h2>
            <PixelGrid cols={2} gap="lg">
              <PixelCard variant="glow">
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground">Bachelor of Business Administration</h3>
                  <p className="text-cyan font-mono text-sm">ISET, Tunisia | 2018-2021</p>
                  <p className="text-muted-foreground text-sm">
                    Specialization in Small and Medium Enterprises management
                  </p>
                </div>
              </PixelCard>
              <PixelCard variant="glow">
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground">Full-Stack JavaScript Development</h3>
                  <p className="text-cyan font-mono text-sm">GoMyCode, Tunis | 2022</p>
                  <p className="text-muted-foreground text-sm">
                    Comprehensive web development training with focus on practical skills
                  </p>
                </div>
              </PixelCard>
            </PixelGrid>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
