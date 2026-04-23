'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PixelButton } from '@/components/pixel-button';
import { LanguageSwitcher } from '@/components/language-switcher';
import { Logo } from '@/components/logo';
import { Github, Download, Menu, X } from 'lucide-react';
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
  const [open, setOpen] = useState(false);

  // Close drawer when route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

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

  const isActive = (key: PageKey | 'home'): boolean => {
    const href = hrefFor(key);
    if (key === 'home') return pathname === `/${locale}` || pathname === `/${locale}/`;
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href={`/${locale}`}
              className="flex items-center gap-2 group transition-transform hover:-translate-y-0.5"
            >
              <Logo className="w-8 h-8 text-cyan transition-all group-hover:drop-shadow-[0_0_8px_rgba(39,245,224,0.7)]" />
              <span className="font-bold text-cyan hidden sm:inline group-hover:animate-text-glow">
                Ghassen
              </span>
            </Link>

            {/* Desktop Nav Items */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={hrefFor(item.key)}
                  className={`px-3 py-2 text-sm font-mono transition-all duration-200 border rounded-sm hover:-translate-y-0.5 ${
                    isActive(item.key)
                      ? 'text-cyan border-cyan/40'
                      : 'text-muted-foreground border-transparent hover:text-cyan hover:border-cyan/30'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Right side: lang + desktop actions + mobile hamburger */}
            <div className="flex items-center gap-2">
              <LanguageSwitcher currentLocale={locale} />

              {/* Desktop-only actions */}
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                title="GitHub"
                className="hidden lg:inline-flex items-center justify-center w-9 h-9 border border-border rounded-sm text-muted-foreground hover:text-cyan hover:border-cyan hover:glow-cyan transition-all duration-200 hover:-translate-y-0.5"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="/BAHROUN_Ghassen_CV_En_2026.docx"
                download
                aria-label={t.downloadCV}
                title={t.downloadCV}
                className="hidden lg:inline-flex items-center justify-center w-9 h-9 border border-border rounded-sm text-muted-foreground hover:text-cyan hover:border-cyan hover:glow-cyan transition-all duration-200 hover:-translate-y-0.5"
              >
                <Download className="w-4 h-4" />
              </a>
              <Link href={hrefFor('contact')} className="hidden lg:inline-flex">
                <PixelButton variant="primary" size="sm">
                  {t.nav.getInTouch}
                </PixelButton>
              </Link>

              {/* Mobile hamburger */}
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                aria-expanded={open}
                aria-controls="mobile-drawer"
                className="lg:hidden inline-flex items-center justify-center w-10 h-10 border border-border rounded-sm text-muted-foreground hover:text-cyan hover:border-cyan transition-all duration-200"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile drawer overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm transition-opacity duration-200 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile drawer panel */}
      <aside
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className={`lg:hidden fixed top-0 right-0 z-[70] h-[100dvh] w-[88%] max-w-sm bg-card border-l border-border shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between p-4 border-b border-border shrink-0">
          <div className="flex items-center gap-2">
            <Logo className="w-7 h-7 text-cyan" />
            <span className="font-bold text-cyan">Ghassen</span>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="inline-flex items-center justify-center w-10 h-10 border border-border rounded-sm text-muted-foreground hover:text-cyan hover:border-cyan transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer nav links */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.key}>
                <Link
                  href={hrefFor(item.key)}
                  className={`block px-4 py-3 rounded-sm font-mono text-base border transition-all duration-200 ${
                    isActive(item.key)
                      ? 'text-cyan border-cyan/40 bg-cyan/5'
                      : 'text-foreground border-transparent hover:border-cyan/30 hover:text-cyan'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Drawer footer actions */}
        <div className="p-4 border-t border-border space-y-3 shrink-0">
          <Link href={hrefFor('contact')} className="block">
            <PixelButton variant="primary" size="lg" className="w-full justify-center">
              {t.nav.getInTouch}
            </PixelButton>
          </Link>
          <div className="grid grid-cols-2 gap-3">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-11 border border-border rounded-sm text-sm text-muted-foreground hover:text-cyan hover:border-cyan transition-all duration-200"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href="/BAHROUN_Ghassen_CV_En_2026.docx"
              download
              className="inline-flex items-center justify-center gap-2 h-11 border border-border rounded-sm text-sm text-muted-foreground hover:text-cyan hover:border-cyan transition-all duration-200"
            >
              <Download className="w-4 h-4" />
              <span>CV</span>
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
