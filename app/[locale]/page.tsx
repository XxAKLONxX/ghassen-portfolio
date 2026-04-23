import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { PixelButton } from '@/components/pixel-button';
import { PixelCard } from '@/components/pixel-card';
import { PixelBadge } from '@/components/pixel-badge';
import { PixelGrid } from '@/components/pixel-grid';
import { JsonLd } from '@/components/json-ld';
import { Terminal } from '@/components/terminal';
import { Download, Github } from 'lucide-react';
import {
  locales,
  pageSEO,
  pagePaths,
  type Locale,
  SITE_URL,
  GITHUB_URL,
} from '@/lib/i18n';
import {
  absUrl,
  languageAlternates,
  breadcrumbSchema,
} from '@/lib/schema';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!(locales as string[]).includes(raw)) notFound();
  const locale = raw as Locale;
  const seo = pageSEO.home[locale];

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: absUrl(locale, 'home'),
      languages: languageAlternates('home'),
    },
    openGraph: {
      url: absUrl(locale, 'home'),
      title: seo.title,
      description: seo.description,
    },
    twitter: { title: seo.title, description: seo.description },
    keywords: [seo.keyword, 'SEO Tunis', 'SEM Tunis', 'Google Ads Tunisia'],
  };
}

export default async function Home({ params }: Props) {
  const { locale: raw } = await params;
  if (!(locales as string[]).includes(raw)) notFound();
  const locale = raw as Locale;

  // Locale-specific copy
  const copy = {
    en: {
      kicker: 'Digital Marketing Specialist',
      headingPrefix: 'Strategic Growth Through',
      headingAccent: 'SEO & SEM',
      lead:
        '4+ years of expertise managing 41+ paid search campaigns and optimizing organic performance across international markets. Results-driven approach to digital excellence.',
      viewWork: 'View My Work',
      getInTouch: 'Get In Touch',
      downloadCV: 'Download CV',
      github: 'GitHub',
      specLabel: 'Specializations:',
      byNumbers: 'By The Numbers',
      featured: 'Featured Projects',
      featuredSub: 'Strategic wins across multiple platforms',
      resourcesKicker: 'Open Source',
      resourcesTitle: 'Free templates & Python tooling',
      resourcesText:
        'SEO audit checklists, keyword research frameworks, and a GitHub profile full of Python scripts for sitemap generation, GSC automation, and SERP tracking.',
      browseResources: 'Browse Resources',
      ctaTitle: 'Ready To Grow Your Digital Presence?',
      ctaText:
        "Let's discuss your marketing goals and create a strategic roadmap for success.",
      startProject: 'Start A Project',
      scheduleCall: 'Schedule A Call',
    },
    fr: {
      kicker: 'Spécialiste Marketing Digital',
      headingPrefix: 'Croissance Stratégique par',
      headingAccent: 'le SEO & SEM',
      lead:
        "4+ ans d'expertise dans la gestion de 41+ campagnes de recherche payante et l'optimisation des performances organiques sur les marchés internationaux.",
      viewWork: 'Voir mon travail',
      getInTouch: 'Me contacter',
      downloadCV: 'Télécharger CV',
      github: 'GitHub',
      specLabel: 'Spécialisations :',
      byNumbers: 'En Chiffres',
      featured: 'Projets Phares',
      featuredSub: 'Victoires stratégiques sur plusieurs plateformes',
      resourcesKicker: 'Open Source',
      resourcesTitle: 'Modèles gratuits & outils Python',
      resourcesText:
        "Checklists d'audit SEO, frameworks de recherche de mots-clés, et un profil GitHub rempli de scripts Python pour la génération de sitemaps, l'automatisation GSC et le suivi SERP.",
      browseResources: 'Parcourir les Ressources',
      ctaTitle: 'Prêt à développer votre présence digitale ?',
      ctaText:
        'Discutons de vos objectifs marketing et créons une feuille de route stratégique pour réussir.',
      startProject: 'Démarrer un Projet',
      scheduleCall: 'Planifier un Appel',
    },
    ar: {
      kicker: 'خبير التسويق الرقمي',
      headingPrefix: 'نمو استراتيجي من خلال',
      headingAccent: 'SEO و SEM',
      lead:
        'أكثر من 4 سنوات من الخبرة في إدارة 41+ حملة بحث مدفوعة وتحسين الأداء العضوي عبر الأسواق الدولية. نهج مبني على النتائج للتميز الرقمي.',
      viewWork: 'عرض أعمالي',
      getInTouch: 'تواصل معي',
      downloadCV: 'تحميل السيرة الذاتية',
      github: 'GitHub',
      specLabel: 'التخصصات:',
      byNumbers: 'بالأرقام',
      featured: 'مشاريع مميزة',
      featuredSub: 'إنجازات استراتيجية عبر منصات متعددة',
      resourcesKicker: 'مفتوح المصدر',
      resourcesTitle: 'قوالب مجانية وأدوات بايثون',
      resourcesText:
        'قوائم تدقيق SEO، أطر البحث عن الكلمات المفتاحية، وملف GitHub مليء بسكريبتات بايثون لإنشاء خرائط الموقع، وأتمتة GSC، وتتبع SERP.',
      browseResources: 'تصفح الموارد',
      ctaTitle: 'هل أنت جاهز لتنمية حضورك الرقمي؟',
      ctaText: 'دعنا نناقش أهدافك التسويقية وننشئ خارطة طريق استراتيجية للنجاح.',
      startProject: 'ابدأ مشروعاً',
      scheduleCall: 'حجز مكالمة',
    },
  }[locale];

  const highlights = [
    { number: '4+', label: 'Years Experience', description: 'Strategic growth and digital marketing' },
    { number: '41+', label: 'Campaigns Managed', description: 'Across diverse international markets' },
    { number: '36', label: 'SEA Campaigns', description: '18 months of optimization' },
    { number: '4', label: 'Major Websites', description: 'Strategic leadership from launch' },
  ];

  const specialties = [
    'Google Ads',
    'SEO Strategy',
    'Google Analytics',
    'Campaign Management',
    'Performance Optimization',
    'Technical SEO',
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(locale, 'home', 'Home')} />
      <Navigation />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-12 sm:py-16 md:py-24 lg:py-32 bg-gradient-to-b from-background to-card/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center animate-stagger">
              <div className="space-y-6 sm:space-y-8 animate-fade-in-up">
                <div className="space-y-3 sm:space-y-4">
                  <p className="text-cyan font-mono text-xs sm:text-sm font-semibold">{copy.kicker}</p>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance">
                    {copy.headingPrefix}{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-cyan-light">
                      {copy.headingAccent}
                    </span>
                  </h1>
                  <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-lg">
                    {copy.lead}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-2 sm:pt-4">
                  <Link href={`/${locale}/${pagePaths.experience}`}>
                    <PixelButton variant="primary" size="lg" className="w-full sm:w-auto justify-center">{copy.viewWork}</PixelButton>
                  </Link>
                  <Link href={`/${locale}/${pagePaths.contact}`}>
                    <PixelButton variant="outline" size="lg" className="w-full sm:w-auto justify-center">{copy.getInTouch}</PixelButton>
                  </Link>
                  <a href="/BAHROUN_Ghassen_CV_En_2026.docx" download>
                    <PixelButton variant="secondary" size="lg">
                      <Download className="w-4 h-4 mr-2 inline" />
                      {copy.downloadCV}
                    </PixelButton>
                  </a>
                  <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                    <PixelButton variant="accent" size="lg">
                      <Github className="w-4 h-4 mr-2 inline" />
                      {copy.github}
                    </PixelButton>
                  </a>
                </div>

                <div className="pt-8 space-y-4">
                  <p className="text-sm font-mono text-muted-foreground">{copy.specLabel}</p>
                  <div className="flex flex-wrap gap-2">
                    {specialties.map((tech) => (
                      <PixelBadge key={tech} variant="primary">{tech}</PixelBadge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="block">
                <div className="relative space-y-4">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan/20 to-purple-accent/20 rounded-sm blur-2xl"></div>

                  {/* Pixel Google G card — desktop only */}
                  <div className="hidden lg:flex relative bg-card border border-border rounded-sm p-8 space-y-4 flex-col items-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/icons/google_pixel.svg"
                      alt="Google Ads specialist"
                      className="w-32 h-24 animate-float"
                    />
                    <p className="text-center font-mono text-xs text-muted-foreground tracking-wide">
                      // Google Ads · GSC · GA4 specialist
                    </p>
                  </div>

                  {/* Terminal — visible on all screens */}
                  <Terminal
                    title="ghassen@portfolio ~ /status"
                    lines={[
                      { type: 'cmd', text: 'whoami' },
                      { type: 'output', text: 'Ghassen Bahroun — SEO/SEM Specialist' },
                      { type: 'comment', text: 'current role' },
                      { type: 'kv', key: 'role', val: 'SEO/SEM @ Pinet Industrie' },
                      { type: 'kv', key: 'focus', val: 'Multilingual B2B · 5 markets' },
                      { type: 'kv', key: 'location', val: 'Tunisia → Worldwide' },
                      { type: 'comment', text: 'stack' },
                      { type: 'kv', key: 'tools', val: 'GSC, SEMrush, Looker, Python' },
                      { type: 'blink' },
                    ]}
                    className="relative"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Highlights */}
        <section className="py-16 md:py-24 border-y border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">{copy.byNumbers}</h2>
            <PixelGrid cols={4} gap="md">
              {highlights.map((item) => (
                <PixelCard key={item.number} variant="glow">
                  <div className="text-center space-y-3">
                    <div className="text-4xl font-bold text-cyan font-mono">{item.number}</div>
                    <h3 className="font-semibold text-foreground">{item.label}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                </PixelCard>
              ))}
            </PixelGrid>
          </div>
        </section>

        {/* Featured */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-bold">{copy.featured}</h2>
                <p className="text-muted-foreground">{copy.featuredSub}</p>
              </div>

              <PixelGrid cols={2} gap="lg">
                {[
                  {
                    title: 'Takia Academy Multi-Site Strategy',
                    description:
                      'Led SEO strategy from development for 4 major websites with integrated performance tracking using Google Analytics and Looker Studio.',
                    tags: ['SEO', 'Strategy', 'Analytics'],
                  },
                  {
                    title: 'Healthcare Sector SEM Campaigns',
                    description:
                      'Managed comprehensive SEO/SEM strategy for medical websites with 4 targeted ads campaigns for healthcare audience.',
                    tags: ['SEM', 'Healthcare', 'Campaigns'],
                  },
                  {
                    title: '36 SEA Campaigns Optimization',
                    description:
                      'Optimized and managed 36 search engine advertising campaigns over 18 months with consistent performance improvement.',
                    tags: ['SEM', 'Google Ads', 'Optimization'],
                  },
                  {
                    title: 'International Market Expansion',
                    description:
                      'Executed search campaigns targeting international audiences including Qatari market with localized SEO/SEM strategies.',
                    tags: ['International', 'SEO', 'SEM'],
                  },
                ].map((project) => (
                  <PixelCard key={project.title} variant="default">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">{project.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 pt-4">
                        {project.tags.map((tag) => (
                          <PixelBadge key={tag} variant="muted" size="sm">{tag}</PixelBadge>
                        ))}
                      </div>
                    </div>
                  </PixelCard>
                ))}
              </PixelGrid>
            </div>
          </div>
        </section>

        {/* Resources Teaser */}
        <section className="py-16 md:py-24 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2 space-y-4">
                <PixelBadge variant="accent" size="sm">{copy.resourcesKicker}</PixelBadge>
                <h2 className="text-2xl md:text-3xl font-bold">{copy.resourcesTitle}</h2>
                <p className="text-muted-foreground leading-relaxed max-w-2xl">
                  {copy.resourcesText}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
                <Link href={`/${locale}/${pagePaths.resources}`}>
                  <PixelButton variant="outline" size="md">{copy.browseResources}</PixelButton>
                </Link>
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                  <PixelButton variant="accent" size="md">
                    <Github className="w-4 h-4 mr-2 inline" />
                    GitHub
                  </PixelButton>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 bg-card/30 border-t border-border">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">{copy.ctaTitle}</h2>
              <p className="text-muted-foreground text-lg">{copy.ctaText}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href={`/${locale}/${pagePaths.contact}`}>
                <PixelButton variant="primary" size="lg">{copy.startProject}</PixelButton>
              </Link>
              <Link href={`/${locale}/${pagePaths.contact}`}>
                <PixelButton variant="secondary" size="lg">{copy.scheduleCall}</PixelButton>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
