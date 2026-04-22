'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PixelButton } from '@/components/pixel-button';
import { LanguageSwitcher } from '@/components/language-switcher';
import { Github, Download } from 'lucide-react';
import {
  locales,
  defaultLocale,
  ui,
  pagePaths,
  type Locale,
  type PageKey,
  GITHUB_URL,
} from '@/lib/i18n';

function getLocaleFromPath(pathname: string): Locale {
  const seg = pathname.split('/').filter(Boolean)[0];
  return (locales as string[]).includes(seg) ? (seg as Locale) : defaultLocale;
}

export function Navigation() {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const t = ui[locale];

  const navItems: Array<{ key: PageKey | 'home'; label: string }> = [
    { key: 'home', label: t.nav.home },
    { key: 'about', label: t.nav.about },
    { key: 'experience', label: t.nav.experience },
    { key: 'skills', label: t.nav.skills },
    { key: 'resources', label: t.nav.resources },
    { key: 'contact', label: t.nav.contact },
  ];

  const hrefFor = (key: PageKey | 'home'): string => {
    if (key === 'home') return `/${locale}`;
    return `/${locale}/${pagePaths[key as PageKey]}`;
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 group transition-transform hover:-translate-y-0.5"
          >
            <div className="w-8 h-8 bg-cyan border border-cyan rounded-sm flex items-center justify-center transition-all group-hover:glow-cyan-strong">
              <span className="text-background font-bold text-sm">G</span>
            </div>
            <span className="font-bold text-cyan hidden sm:inline group-hover:animate-text-glow">
              Ghassen
            </span>
          </Link>

          {/* Nav Items */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={hrefFor(item.key)}
                className="px-3 py-2 text-sm font-mono text-muted-foreground hover:text-cyan transition-all duration-200 border border-transparent hover:border-cyan/30 rounded-sm hover:-translate-y-0.5"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher currentLocale={locale} />
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              title="GitHub"
              className="hidden sm:inline-flex items-center justify-center w-9 h-9 border border-border rounded-sm text-muted-foreground hover:text-cyan hover:border-cyan hover:glow-cyan transition-all duration-200 hover:-translate-y-0.5"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="/BAHROUN_Ghassen_CV_En_2026.docx"
              download
              aria-label={t.downloadCV}
              title={t.downloadCV}
              className="hidden sm:inline-flex items-center justify-center w-9 h-9 border border-border rounded-sm text-muted-foreground hover:text-cyan hover:border-cyan hover:glow-cyan transition-all duration-200 hover:-translate-y-0.5"
            >
              <Download className="w-4 h-4" />
            </a>
            <Link href={hrefFor('contact')} className="hidden sm:inline-flex">
              <PixelButton variant="primary" size="sm">
                {t.nav.getInTouch}
              </PixelButton>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
