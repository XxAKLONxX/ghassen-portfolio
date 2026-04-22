import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/json-ld';
import { locales, pageSEO, type Locale } from '@/lib/i18n';
import { absUrl, languageAlternates, breadcrumbSchema, contactPageSchema } from '@/lib/schema';
import { ContactForm } from './contact-form';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!(locales as string[]).includes(raw)) notFound();
  const locale = raw as Locale;
  const seo = pageSEO.contact[locale];
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: absUrl(locale, 'contact'), languages: languageAlternates('contact') },
    openGraph: { url: absUrl(locale, 'contact'), title: seo.title, description: seo.description },
    twitter: { title: seo.title, description: seo.description },
    keywords: [seo.keyword, 'hire SEO Tunis', 'Ghassen Bahroun'],
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!(locales as string[]).includes(raw)) notFound();
  const locale = raw as Locale;
  return (
    <>
      <JsonLd data={[breadcrumbSchema(locale, 'contact', 'Contact'), contactPageSchema(locale)]} />
      <ContactForm />
    </>
  );
}
