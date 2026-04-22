import type { MetadataRoute } from 'next';
import { locales, pagePaths, type PageKey, type Locale } from '@/lib/i18n';
import { absUrl, languageAlternates } from '@/lib/schema';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = Object.keys(pagePaths) as PageKey[];
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    for (const locale of locales as Locale[]) {
      entries.push({
        url: absUrl(locale, page),
        lastModified: now,
        changeFrequency: page === 'home' ? 'weekly' : 'monthly',
        priority:
          page === 'home'
            ? 1.0
            : page === 'contact' || page === 'resources'
              ? 0.9
              : 0.8,
        alternates: {
          languages: languageAlternates(page),
        },
      });
    }
  }

  return entries;
}
