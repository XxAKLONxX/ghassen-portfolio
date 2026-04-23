'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Github, Download, Mail } from 'lucide-react';
import { PixelIcon } from '@/components/pixel-icon';
import { locales, defaultLocale, type Locale, GITHUB_URL, COURSERA_URL, EMAIL, SITE_NAME, ui, pagePaths } from '@/lib/i18n';

function getLocaleFromPath(pathname: string): Locale {
  const seg = pathname.split('/').filter(Boolean)[0];
  return (locales as string[]).includes(seg) ? (seg as Locale) : defaultLocale;
}

export function Footer() {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const t = ui[locale];
  const currentYear = new Date().getFullYear();

  // Locale-specific static copy
  const copy = {
    en: {
      aboutTitle: 'About',
      aboutText:
        "SEO/SEM specialist focused on multilingual B2B search, paid acquisition, and Python automation.",
      linksTitle: 'Links',
      contactTitle: 'Contact',
      rights: 'All rights reserved.',
      tagline: 'Pixel Design · Dark Theme',
    },
    fr: {
      aboutTitle: 'À propos',
      aboutText:
        "Spécialiste SEO/SEM concentré sur le référencement B2B multilingue, l'acquisition payante et l'automatisation Python.",
      linksTitle: 'Liens',
      contactTitle: 'Contact',
      rights: 'Tous droits réservés.',
      tagline: 'Design Pixel · Thème Sombre',
    },
    ar: {
      aboutTitle: 'نبذة',
      aboutText:
        'خبير SEO/SEM مركّز على البحث B2B متعدد اللغات، الاستحواذ المدفوع، وأتمتة بايثون.',
      linksTitle: 'روابط',
      contactTitle: 'التواصل',
      rights: 'جميع الحقوق محفوظة.',
      tagline: 'تصميم بكسل · وضع داكن',
    },
  }[locale];

  return (
    <footer className="border-t border-border bg-background/50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-cyan font-bold font-mono mb-4">{copy.aboutTitle}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{copy.aboutText}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-cyan font-bold font-mono mb-4">{copy.linksTitle}</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-muted-foreground text-sm hover:text-cyan transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={COURSERA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-muted-foreground text-sm hover:text-cyan transition-colors"
                >
                  <PixelIcon name="graduation-cap" size={14} alt="" className="text-current" />
                  Coursera
                </a>
              </li>
              <li>
                <a
                  href="/BAHROUN_Ghassen_CV_En_2026.docx"
                  download
                  className="inline-flex items-center gap-2 text-muted-foreground text-sm hover:text-cyan transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  {t.downloadCV}
                </a>
              </li>
              <li>
                <Link
                  href={`/${locale}/${pagePaths.resources}`}
                  className="inline-flex items-center gap-2 text-muted-foreground text-sm hover:text-cyan transition-colors"
                >
                  {t.nav.resources}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-cyan font-bold font-mono mb-4">{copy.contactTitle}</h3>
            <p className="text-muted-foreground text-sm">
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 hover:text-cyan transition-colors break-all"
              >
                <Mail className="w-3.5 h-3.5 shrink-0" />
                {EMAIL}
              </a>
            </p>
            <p className="text-muted-foreground text-sm mt-2">
              Sousse · Djerba · Tunis, Tunisia
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <p className="text-muted-foreground text-xs">
              © {currentYear} {SITE_NAME}. {copy.rights}
            </p>
            <p className="text-muted-foreground text-xs font-mono">{copy.tagline}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
