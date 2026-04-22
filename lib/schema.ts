import {
  SITE_URL,
  SITE_NAME,
  EMAIL,
  PHONE,
  GITHUB_URL,
  type Locale,
  localeMeta,
  pagePaths,
  pageSEO,
  type PageKey,
} from './i18n';

/**
 * Absolute URL for a given locale + page path.
 * Pattern: {SITE_URL}/{locale}{/path?}
 */
export function absUrl(locale: Locale, pageKey: PageKey = 'home'): string {
  const path = pagePaths[pageKey];
  return path ? `${SITE_URL}/${locale}/${path}` : `${SITE_URL}/${locale}`;
}

/** Language alternates for a given page, across all locales + x-default. */
export function languageAlternates(pageKey: PageKey): Record<string, string> {
  const alt: Record<string, string> = {};
  (Object.keys(localeMeta) as Locale[]).forEach((loc) => {
    alt[localeMeta[loc].htmlLang] = absUrl(loc, pageKey);
  });
  alt['x-default'] = absUrl('en', pageKey);
  return alt;
}

/**
 * Person schema — the core "who is Ghassen" entity. Used on home + about.
 */
export function personSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: SITE_NAME,
    alternateName: ['Ghassen', 'غسان بحرون'],
    url: absUrl(locale),
    image: `${SITE_URL}/apple-icon.png`,
    jobTitle: 'SEO/SEM Specialist',
    email: `mailto:${EMAIL}`,
    telephone: PHONE,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Tunis',
      addressRegion: 'Tunis',
      addressCountry: 'TN',
    },
    nationality: { '@type': 'Country', name: 'Tunisia' },
    knowsLanguage: ['ar', 'fr', 'en'],
    sameAs: [GITHUB_URL],
    knowsAbout: [
      'Search Engine Optimization',
      'Search Engine Marketing',
      'Google Ads',
      'Technical SEO',
      'Multilingual SEO',
      'Performance Max',
      'Google Search Console',
      'Google Analytics',
      'SEMrush',
      'Python automation',
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Pinet Industrie',
    },
  };
}

/**
 * ProfessionalService schema — for commercial/local intent.
 * Positions Ghassen as a hirable SEO service based in Tunis, serving worldwide.
 */
export function professionalServiceSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#service`,
    name: `${SITE_NAME} — SEO/SEM Specialist`,
    description: pageSEO.home[locale].description,
    url: absUrl(locale),
    image: `${SITE_URL}/apple-icon.png`,
    priceRange: '$$',
    founder: { '@id': `${SITE_URL}/#person` },
    provider: { '@id': `${SITE_URL}/#person` },
    areaServed: [
      { '@type': 'Country', name: 'Tunisia' },
      { '@type': 'Country', name: 'France' },
      { '@type': 'Country', name: 'Germany' },
      { '@type': 'Country', name: 'Italy' },
      { '@type': 'Country', name: 'Spain' },
      { '@type': 'Country', name: 'United Kingdom' },
      { '@type': 'Country', name: 'Qatar' },
      { '@type': 'Place', name: 'Worldwide (Remote)' },
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Tunis',
      addressCountry: 'TN',
    },
    availableLanguage: ['en', 'fr', 'ar'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'SEO & SEM Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Technical SEO Audit' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Multilingual SEO Strategy' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Google Ads Campaign Management' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Performance Max Optimization' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'SEO Automation & Python Tooling' },
        },
      ],
    },
  };
}

/** WebSite schema with SearchAction. Goes on every page via layout. */
export function websiteSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: absUrl(locale),
    name: SITE_NAME,
    inLanguage: locale,
    publisher: { '@id': `${SITE_URL}/#person` },
  };
}

/** Breadcrumb — every page except home. */
export function breadcrumbSchema(locale: Locale, pageKey: PageKey, label: string) {
  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: absUrl(locale, 'home'),
    },
  ];
  if (pageKey !== 'home') {
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: label,
      item: absUrl(locale, pageKey),
    });
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}

/** AboutPage — wraps the about route. */
export function aboutPageSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${absUrl(locale, 'about')}#aboutpage`,
    url: absUrl(locale, 'about'),
    name: pageSEO.about[locale].title,
    description: pageSEO.about[locale].description,
    inLanguage: locale,
    mainEntity: { '@id': `${SITE_URL}/#person` },
    isPartOf: { '@id': `${SITE_URL}/#website` },
  };
}

/** ContactPage schema. */
export function contactPageSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${absUrl(locale, 'contact')}#contactpage`,
    url: absUrl(locale, 'contact'),
    name: pageSEO.contact[locale].title,
    description: pageSEO.contact[locale].description,
    inLanguage: locale,
    mainEntity: {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      email: `mailto:${EMAIL}`,
      telephone: PHONE,
    },
  };
}

/**
 * Experience schema — ItemList of WorkExperience-like entries.
 * Schema.org doesn't have a WorkExperience type so we use OrganizationRole inside ItemList.
 */
export function experienceSchema(locale: Locale, items: Array<{
  role: string;
  company: string;
  startDate: string;
  endDate?: string;
  description: string;
}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Professional Experience',
    url: absUrl(locale, 'experience'),
    itemListElement: items.map((it, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'OrganizationRole',
        roleName: it.role,
        startDate: it.startDate,
        ...(it.endDate ? { endDate: it.endDate } : {}),
        description: it.description,
        memberOf: {
          '@type': 'Organization',
          name: it.company,
        },
      },
    })),
  };
}

/** Skills as DefinedTermSet. */
export function skillsSchema(locale: Locale, skills: string[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'Professional Skills',
    url: absUrl(locale, 'skills'),
    hasDefinedTerm: skills.map((s) => ({
      '@type': 'DefinedTerm',
      name: s,
    })),
  };
}

/** Resources — ItemList of CreativeWork templates. */
export function resourcesSchema(
  locale: Locale,
  items: Array<{ name: string; description: string; url: string; format?: string }>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Free SEO Resources & Templates',
    url: absUrl(locale, 'resources'),
    itemListElement: items.map((it, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'CreativeWork',
        name: it.name,
        description: it.description,
        url: it.url,
        inLanguage: 'en',
        author: { '@id': `${SITE_URL}/#person` },
        ...(it.format ? { encodingFormat: it.format } : {}),
        license: `${SITE_URL}/${locale}/resources`,
        isAccessibleForFree: true,
      },
    })),
  };
}
