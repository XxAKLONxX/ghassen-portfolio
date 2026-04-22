import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/json-ld';
import {
  locales,
  localeMeta,
  pageSEO,
  type Locale,
  SITE_URL,
  SITE_NAME,
} from '@/lib/i18n';
import {
  personSchema,
  professionalServiceSchema,
  websiteSchema,
  absUrl,
  languageAlternates,
} from '@/lib/schema';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!(locales as string[]).includes(raw)) notFound();
  const locale = raw as Locale;
  const seo = pageSEO.home[locale];

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: seo.title,
      template: `%s | ${SITE_NAME}`,
    },
    description: seo.description,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    },
    alternates: {
      canonical: absUrl(locale, 'home'),
      languages: languageAlternates('home'),
    },
    openGraph: {
      type: 'website',
      locale: locale === 'en' ? 'en_US' : locale === 'fr' ? 'fr_FR' : 'ar_TN',
      alternateLocale: locales.filter((l) => l !== locale).map((l) =>
        l === 'en' ? 'en_US' : l === 'fr' ? 'fr_FR' : 'ar_TN',
      ),
      url: absUrl(locale, 'home'),
      siteName: SITE_NAME,
      title: seo.title,
      description: seo.description,
      images: [
        {
          url: `${SITE_URL}/apple-icon.png`,
          width: 512,
          height: 512,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: [`${SITE_URL}/apple-icon.png`],
    },
    icons: {
      icon: [
        { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
        { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
        { url: '/icon.svg', type: 'image/svg+xml' },
      ],
      apple: '/apple-icon.png',
    },
    keywords: [
      seo.keyword,
      'SEO Tunis',
      'SEM Tunis',
      'Google Ads Tunisia',
      'multilingual SEO',
      'SEO consultant',
      'technical SEO',
      'Ghassen Bahroun',
    ],
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: raw } = await params;
  if (!(locales as string[]).includes(raw)) notFound();
  const locale = raw as Locale;
  const meta = localeMeta[locale];

  return (
    <>
      {/* Set lang + dir on the html element client-side via inline script.
          Root layout sets neutral defaults; we override here per locale. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang="${meta.htmlLang}";document.documentElement.dir="${meta.dir}";`,
        }}
      />
      {/* Global schema injected on every page */}
      <JsonLd
        data={[
          personSchema(locale),
          professionalServiceSchema(locale),
          websiteSchema(locale),
        ]}
      />
      <div dir={meta.dir}>{children}</div>
    </>
  );
}
