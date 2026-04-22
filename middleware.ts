import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale, type Locale } from './lib/i18n';

function getLocaleFromAcceptLanguage(header: string | null): Locale {
  if (!header) return defaultLocale;
  const preferred = header
    .split(',')
    .map((s) => s.split(';')[0].trim().toLowerCase().slice(0, 2));
  for (const tag of preferred) {
    if ((locales as string[]).includes(tag)) return tag as Locale;
  }
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files, Next internals, API, public assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') // files with extensions (CV, images, md, etc.)
  ) {
    return NextResponse.next();
  }

  // Check if a supported locale prefix already exists
  const hasLocale = locales.some(
    (loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`),
  );
  if (hasLocale) return NextResponse.next();

  // No locale → redirect to preferred locale
  const detected = getLocaleFromAcceptLanguage(request.headers.get('accept-language'));
  const url = request.nextUrl.clone();
  url.pathname = `/${detected}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url, 308); // 308 = permanent, preserves method
}

export const config = {
  matcher: [
    // Match everything except files, next internals, api routes
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
