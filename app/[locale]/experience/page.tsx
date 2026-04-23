import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { PixelCard } from '@/components/pixel-card';
import { PixelBadge } from '@/components/pixel-badge';
import { PixelGrid } from '@/components/pixel-grid';
import { JsonLd } from '@/components/json-ld';
import { locales, pageSEO, type Locale } from '@/lib/i18n';
import { absUrl, languageAlternates, breadcrumbSchema, experienceSchema } from '@/lib/schema';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!(locales as string[]).includes(raw)) notFound();
  const locale = raw as Locale;
  const seo = pageSEO.experience[locale];
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: absUrl(locale, 'experience'), languages: languageAlternates('experience') },
    openGraph: { url: absUrl(locale, 'experience'), title: seo.title, description: seo.description },
    twitter: { title: seo.title, description: seo.description },
    keywords: [seo.keyword, 'SEO Tunis', 'Ghassen Bahroun'],
  };
}

const experienceForSchema = [
  { role: 'SEO/SEM Specialist', company: 'Pinet Industrie', startDate: '2025-09', description: 'Multilingual digital marketing across 5 European markets.' },
  { role: 'SEO/SEM Strategist', company: 'TakiAcademy', startDate: '2023-01', endDate: '2025-08', description: 'Led SEO for 4 sites; managed 36 SEA campaigns over 18 months.' },
  { role: 'Freelance SEO/SEM Consultant', company: 'BeBrandy Agency (Qatar)', startDate: '2025-08', endDate: '2025-08', description: 'International SEO/SEM for EAG.qa; Qatar market campaigns.' },
  { role: 'Freelance SEO/SEM Consultant', company: 'WIC — Healthcare', startDate: '2025-03', endDate: '2025-06', description: 'Medical-sector SEO/SEM and website rework (wic-doctor.com, wic-ophtacare.com).' },
  { role: 'Sales & Webmaster', company: 'Tangorythm, Djerba', startDate: '2019-01', endDate: '2022-12', description: 'Tourism industry web development and SEO.' },
];

export default async function Experience({ params }: Props) {
  const { locale: raw } = await params;
  if (!(locales as string[]).includes(raw)) notFound();
  const locale = raw as Locale;
  const experiences = [
    {
      title: 'SEO/SEM Specialist',
      company: 'Pinet Industrie, Tunisia',
      period: 'September 2025 - Present',
      description:
        'Developing comprehensive digital marketing campaigns across multiple channels with focus on search engine optimization and paid advertising.',
      achievements: [
        'Developing digital marketing campaigns',
        'Managing search engine marketing initiatives',
        'Performance optimization across channels',
      ],
      tags: ['SEO', 'SEM', 'Google Ads', 'Analytics'],
    },
    {
      title: 'SEO/SEM Strategist',
      company: 'TakiAcademy, Tunisia',
      period: '2023 - August 2025',
      description:
        'Strategic leadership role managing SEO initiatives across a portfolio of major websites with integrated performance tracking and optimization.',
      achievements: [
        'Led SEO strategy for 4 major websites (takiacademy.com, Takana.com, ibtakiacademyschool.com, tamdone.com)',
        'Managed and optimized 36 SEA campaigns over 18 months',
        'Designed SEO-friendly website architectures',
        'Developed integrated performance tracking using Google Analytics and Looker Studio',
      ],
      tags: ['SEO Strategy', 'SEM', 'Analytics', 'Google Ads'],
    },
    {
      title: 'Freelance SEO/SEM Consultant',
      company: 'WIC — Healthcare',
      period: 'March - June 2025',
      description:
        'Specialized SEO/SEM for the healthcare sector with focus on search campaign optimization and technical implementation.',
      achievements: [
        'Managed SEO/SEM strategy for medical websites (wic-doctor.com, wic-ophtacare.com)',
        'Developed and executed 4 ads campaigns for the healthcare sector',
        'Website rework and technical optimization',
      ],
      tags: ['Healthcare', 'SEM', 'Google Ads', 'Technical SEO'],
    },
    {
      title: 'Freelance SEO/SEM Consultant',
      company: 'BeBrandy Agency (Qatar)',
      period: 'August 2025',
      description:
        'International SEO/SEM for Qatari client with localized search campaign strategy.',
      achievements: [
        'SEO/SEM services for EAG.qa',
        'Executed search campaigns targeting the Qatari audience',
        'International market optimization',
      ],
      tags: ['International SEO', 'SEM', 'Localization'],
    },
    {
      title: 'Sales & Webmaster',
      company: 'Tangorythm, Djerba',
      period: '2019 - 2022',
      description:
        'Acquired new clients and managed website development projects for tourism industry with WordPress optimization.',
      achievements: [
        'Acquired new clients for website development projects',
        'Implemented SEO strategies and managed WordPress content optimization',
        'Maintained client relationships with consistent repeat business',
      ],
      tags: ['WordPress', 'SEO', 'Client Management', 'Tourism'],
    },
  ];

  const competencies = [
    { category: 'Tools & Platforms', items: ['Google Ads', 'Google Search Console', 'Google Analytics', 'SEMrush', 'Screaming Frog', 'Looker Studio'] },
    { category: 'Technical Skills', items: ['WordPress', 'Shopify', 'Yoast SEO', 'Strapi', 'ClickUp', 'HTML/CSS', 'JavaScript (Basic)'] },
    { category: 'Core Competencies', items: ['SEO Strategy', 'SEM Campaign Management', 'Analytics & Reporting', 'Technical SEO', 'Performance Optimization', 'Market Research'] },
    { category: 'Languages', items: ['Arabic (Native)', 'French (Professional)', 'English (Professional)'] },
  ];

  return (
    <>
      <JsonLd data={[breadcrumbSchema(locale, 'experience', 'Experience'), experienceSchema(locale, experienceForSchema)]} />
      <Navigation />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="py-16 md:py-24 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold">Professional Experience</h1>
              <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
                4+ years of expertise across SEO strategy, SEM campaign management, and digital
                marketing optimization. Remote work available worldwide.
              </p>
            </div>
          </div>
        </section>

        {/* Experiences */}
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <PixelCard key={exp.company + exp.period} variant="default">
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">{exp.title}</h3>
                        <p className="text-cyan font-mono text-sm mt-1">{exp.company}</p>
                      </div>
                      <PixelBadge variant="secondary" size="sm">
                        {exp.period}
                      </PixelBadge>
                    </div>

                    <p className="text-muted-foreground leading-relaxed">{exp.description}</p>

                    {exp.achievements.length > 0 && (
                      <ul className="space-y-2 pt-2">
                        {exp.achievements.map((achievement) => (
                          <li key={achievement} className="text-muted-foreground text-sm flex gap-2">
                            <span className="text-cyan flex-shrink-0">▸</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="flex flex-wrap gap-2 pt-4">
                      {exp.tags.map((tag) => (
                        <PixelBadge key={tag} variant="muted" size="sm">
                          {tag}
                        </PixelBadge>
                      ))}
                    </div>
                  </div>
                </PixelCard>
              ))}
            </div>
          </div>
        </section>

        {/* Competencies */}
        <section className="py-16 md:py-24 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-12">Competencies</h2>
            <PixelGrid cols={2} gap="lg">
              {competencies.map((comp) => (
                <PixelCard key={comp.category} variant="glow">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground text-lg">{comp.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {comp.items.map((item) => (
                        <PixelBadge key={item} variant="primary" size="sm">
                          {item}
                        </PixelBadge>
                      ))}
                    </div>
                  </div>
                </PixelCard>
              ))}
            </PixelGrid>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
