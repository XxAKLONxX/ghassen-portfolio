import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { PixelCard } from '@/components/pixel-card';
import { PixelBadge } from '@/components/pixel-badge';
import { PixelGrid } from '@/components/pixel-grid';
import { JsonLd } from '@/components/json-ld';
import { PixelIcon } from '@/components/pixel-icon';
import { locales, pageSEO, type Locale, COURSERA_URL } from '@/lib/i18n';
import { absUrl, languageAlternates, breadcrumbSchema, skillsSchema } from '@/lib/schema';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!(locales as string[]).includes(raw)) notFound();
  const locale = raw as Locale;
  const seo = pageSEO.skills[locale];
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: absUrl(locale, 'skills'), languages: languageAlternates('skills') },
    openGraph: { url: absUrl(locale, 'skills'), title: seo.title, description: seo.description },
    twitter: { title: seo.title, description: seo.description },
    keywords: [seo.keyword, 'Google Ads Tunis', 'Ghassen Bahroun'],
  };
}

const skillsForSchema = [
  'Google Ads', 'Google Search Console', 'Google Analytics 4', 'SEMrush', 'Screaming Frog',
  'Looker Studio', 'Technical SEO', 'WordPress', 'Shopify', 'Yoast SEO', 'Strapi',
  'HTML/CSS', 'JavaScript', 'Python', 'Performance Max', 'Multilingual SEO',
];

export default async function Skills({ params }: Props) {
  const { locale: raw } = await params;
  if (!(locales as string[]).includes(raw)) notFound();
  const locale = raw as Locale;
  const skillCategories = [
    {
      title: 'SEO/SEM',
      description: 'Expert in search optimization and paid advertising strategies',
      skills: [
        { name: 'Google Ads', level: 'Expert' },
        { name: 'Google Search Console', level: 'Expert' },
        { name: 'Google Analytics', level: 'Expert' },
        { name: 'SEMrush', level: 'Advanced' },
        { name: 'Screaming Frog', level: 'Advanced' },
        { name: 'Technical SEO', level: 'Expert' },
      ],
    },
    {
      title: 'Analytics & Reporting',
      description: 'Data-driven insights and comprehensive performance tracking',
      skills: [
        { name: 'Looker Studio', level: 'Expert' },
        { name: 'Google Analytics 4', level: 'Expert' },
        { name: 'Performance Tracking', level: 'Expert' },
        { name: 'Data Visualization', level: 'Advanced' },
        { name: 'Reporting & Dashboards', level: 'Advanced' },
        { name: 'Campaign Analysis', level: 'Expert' },
      ],
    },
    {
      title: 'Platforms',
      description: 'Experience with major CMS and project management tools',
      skills: [
        { name: 'WordPress', level: 'Expert' },
        { name: 'Shopify', level: 'Advanced' },
        { name: 'Yoast SEO', level: 'Expert' },
        { name: 'Strapi', level: 'Intermediate' },
        { name: 'ClickUp', level: 'Advanced' },
      ],
    },
    {
      title: 'Development',
      description: 'Web technologies and coding fundamentals',
      skills: [
        { name: 'HTML/CSS', level: 'Proficient' },
        { name: 'JavaScript', level: 'Intermediate' },
        { name: 'Website Architecture', level: 'Advanced' },
      ],
    },
  ];

  const expertise = [
    {
      icon: 'analysis',
      title: 'Campaign Management',
      description: 'Managed 41+ paid search campaigns with consistent optimization and improvement',
    },
    {
      icon: 'database',
      title: 'Data Analytics',
      description: 'Advanced analytics implementation and comprehensive performance reporting',
    },
    {
      icon: 'wrench',
      title: 'Technical SEO',
      description: 'Website architecture design and technical optimization from ground up',
    },
    {
      icon: 'world',
      title: 'International Markets',
      description: 'Multi-language expertise (Arabic, French, English) and cross-border campaigns',
    },
    {
      icon: 'bar-chart',
      title: 'Performance Optimization',
      description: '18 months of continuous improvement across 36 SEA campaigns',
    },
    {
      icon: 'five',
      title: 'Strategic Planning',
      description: 'Long-term vision development and roadmap creation for digital growth',
    },
  ];

  return (
    <>
      <JsonLd data={[breadcrumbSchema(locale, 'skills', 'Skills'), skillsSchema(locale, skillsForSchema)]} />
      <Navigation />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="py-16 md:py-24 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold">Skills & Expertise</h1>
              <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
                Comprehensive toolkit spanning SEO/SEM, analytics, platform expertise, and strategic
                digital marketing with 4+ years of hands-on experience.
              </p>
            </div>
          </div>
        </section>

        {/* Skills by Category */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {skillCategories.map((category) => (
                <div key={category.title} className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl md:text-3xl font-bold">{category.title}</h2>
                    <p className="text-muted-foreground">{category.description}</p>
                  </div>

                  <PixelGrid cols={2} gap="md">
                    {category.skills.map((skill) => (
                      <PixelCard key={skill.name} variant="subtle">
                        <div className="flex items-center justify-between gap-4">
                          <h3 className="font-semibold text-foreground">{skill.name}</h3>
                          <PixelBadge
                            variant={
                              skill.level === 'Expert'
                                ? 'primary'
                                : skill.level === 'Advanced'
                                  ? 'secondary'
                                  : 'muted'
                            }
                            size="sm"
                          >
                            {skill.level}
                          </PixelBadge>
                        </div>
                      </PixelCard>
                    ))}
                  </PixelGrid>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Expertise */}
        <section className="py-16 md:py-24 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-12">Core Expertise</h2>
            <PixelGrid cols={3} gap="lg">
              {expertise.map((item) => (
                <PixelCard key={item.title} variant="glow">
                  <div className="space-y-4 text-center flex flex-col items-center">
                    <PixelIcon name={item.icon} size={48} alt={item.title} className="text-cyan" />
                    <h3 className="font-semibold text-foreground text-lg">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                  </div>
                </PixelCard>
              ))}
            </PixelGrid>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-16 md:py-24 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                  <PixelIcon name="graduation-cap" size={32} alt="" className="text-cyan" />
                  Certifications
                </h2>
                <p className="text-muted-foreground">
                  Ongoing study through Coursera — SEO, marketing strategy, and business.
                </p>
              </div>
              <a
                href={COURSERA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-cyan hover:text-cyan-light font-mono text-sm transition-colors"
              >
                View Coursera profile
                <span aria-hidden="true">→</span>
              </a>
            </div>

            <PixelGrid cols={2} gap="md">
              {[
                {
                  title: 'Advanced Search Engine Optimization Strategies',
                  issuer: 'University of California, Davis',
                  date: 'Jan 2023',
                  tags: ['SEO', 'Strategy', 'Data Analysis'],
                },
                {
                  title: 'Google SEO Capstone Project',
                  issuer: 'University of California, Davis',
                  date: 'Jun 2023',
                  tags: ['SEO', 'Capstone'],
                },
                {
                  title: 'Google SEO Fundamentals',
                  issuer: 'University of California, Davis',
                  date: 'Apr 2023',
                  tags: ['SEO', 'Audit', 'Marketing'],
                },
                {
                  title: 'Introduction to Google SEO',
                  issuer: 'University of California, Davis',
                  date: 'Mar 2020',
                  tags: ['SEO', 'Algorithms'],
                },
                {
                  title: 'Increase SEO Traffic with WordPress',
                  issuer: 'Coursera',
                  date: 'Aug 2023',
                  tags: ['SEO', 'WordPress', 'Web Dev'],
                },
                {
                  title: 'Create Your E-commerce Store with Shopify',
                  issuer: 'Coursera',
                  date: 'Aug 2023',
                  tags: ['E-commerce', 'Shopify'],
                },
                {
                  title: 'Positioning: What You Need for a Successful Marketing Strategy',
                  issuer: 'IE Business School',
                  date: 'Feb 2020',
                  tags: ['Brand', 'Marketing Strategy'],
                },
                {
                  title: 'Market Research and Consumer Behavior',
                  issuer: 'IE Business School',
                  date: 'Feb 2020',
                  tags: ['Market Research', 'Analysis'],
                },
              ].map((cert) => (
                <PixelCard key={cert.title} variant="subtle">
                  <div className="flex gap-4 items-start">
                    <PixelIcon name="graduation-cap" size={28} alt="" className="text-cyan shrink-0 mt-1" />
                    <div className="space-y-2 flex-grow">
                      <h3 className="font-semibold text-foreground leading-snug">{cert.title}</h3>
                      <p className="text-cyan font-mono text-xs">
                        {cert.issuer} · {cert.date}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {cert.tags.map((tag) => (
                          <PixelBadge key={tag} variant="muted" size="sm">{tag}</PixelBadge>
                        ))}
                      </div>
                    </div>
                  </div>
                </PixelCard>
              ))}
            </PixelGrid>
          </div>
        </section>

        {/* Growth Areas */}
        <section className="py-16 md:py-24 border-t border-border bg-card/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-12">Continuous Learning</h2>
            <PixelGrid cols={2} gap="lg">
              <PixelCard variant="glow">
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground">Industry Knowledge</h3>
                  <p className="text-muted-foreground text-sm">
                    Staying updated with latest Google algorithm updates, SEO best practices, and
                    emerging digital marketing trends.
                  </p>
                </div>
              </PixelCard>
              <PixelCard variant="glow">
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground">Technical Development</h3>
                  <p className="text-muted-foreground text-sm">
                    Expanding web development capabilities and deepening expertise in modern tech
                    stack and automation tools.
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
