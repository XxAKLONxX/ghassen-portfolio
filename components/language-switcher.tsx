'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Check, ChevronDown, Globe } from 'lucide-react';
import { locales, localeMeta, type Locale } from '@/lib/i18n';
import { cn } from '@/lib/utils';

/** Inline flag SVGs — no external dependencies, scale cleanly */
const Flags: Record<Locale, React.ReactNode> = {
  en: (
    // United Kingdom flag
    <svg viewBox="0 0 60 30" className="w-5 h-auto rounded-[1px] shrink-0 block" aria-hidden="true">
      <clipPath id="s"><path d="M0,0 v30 h60 v-30 z"/></clipPath>
      <clipPath id="t"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/></clipPath>
      <g clipPath="url(#s)">
        <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
        <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4"/>
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
      </g>
    </svg>
  ),
  fr: (
    // France flag
    <svg viewBox="0 0 3 2" className="w-5 h-auto rounded-[1px] shrink-0 block" aria-hidden="true">
      <rect width="3" height="2" fill="#ED2939"/>
      <rect width="2" height="2" fill="#fff"/>
      <rect width="1" height="2" fill="#002395"/>
    </svg>
  ),
  ar: (
    // Tunisia flag
    <svg viewBox="0 0 1200 800" className="w-5 h-auto rounded-[1px] shrink-0 block" aria-hidden="true">
      <rect width="1200" height="800" fill="#E70013"/>
      <circle cx="600" cy="400" r="200" fill="#fff"/>
      <circle cx="600" cy="400" r="140" fill="#E70013"/>
      <circle cx="645" cy="400" r="110" fill="#fff"/>
      <polygon
        points="600,305 615,365 680,365 628,400 645,460 600,425 555,460 572,400 520,365 585,365"
        fill="#E70013"
      />
    </svg>
  ),
};

interface LanguageSwitcherProps {
  currentLocale: Locale;
  variant?: 'nav' | 'compact';
}

export function LanguageSwitcher({ currentLocale, variant = 'nav' }: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const switchTo = (target: Locale) => {
    // Replace the locale segment in the current path
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length > 0 && (locales as string[]).includes(segments[0])) {
      segments[0] = target;
    } else {
      segments.unshift(target);
    }
    const nextPath = '/' + segments.join('/');
    router.push(nextPath);
    setOpen(false);
  };

  const current = localeMeta[currentLocale];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'inline-flex items-center gap-2 border rounded-sm text-sm font-mono transition-all duration-200 focus-glow',
          variant === 'nav'
            ? 'h-10 sm:h-9 px-3 border-border text-muted-foreground hover:text-cyan hover:border-cyan'
            : 'h-8 px-2.5 border-border/60 text-muted-foreground hover:text-cyan hover:border-cyan/50',
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select language"
      >
        <Globe className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
        <span className="text-xs uppercase tracking-wide">
          {current.htmlLang}
        </span>
        <ChevronDown
          className={cn('w-3 h-3 transition-transform duration-200', open && 'rotate-180')}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 top-full mt-1 min-w-[180px] sm:min-w-[160px] bg-card border border-border rounded-sm shadow-lg glow-cyan z-50 overflow-hidden animate-pixel-pop"
        >
          {(locales as Locale[]).map((loc) => {
            const m = localeMeta[loc];
            const active = loc === currentLocale;
            return (
              <button
                key={loc}
                role="option"
                aria-selected={active}
                onClick={() => switchTo(loc)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3.5 sm:py-2.5 text-sm font-mono transition-colors duration-150 text-left',
                  active
                    ? 'bg-cyan/10 text-cyan'
                    : 'text-muted-foreground hover:bg-card-foreground/5 hover:text-cyan',
                )}
                dir={m.dir}
              >
                {Flags[loc]}
                <span className="flex-1">{m.native}</span>
                {active && <Check className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
