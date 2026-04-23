import type { Viewport } from 'next';
import Script from 'next/script';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const GA_ID = 'G-GP9KJW5NX1';

const geist = Geist({ subsets: ['latin'] });
const geistMono = Geist_Mono({ subsets: ['latin'] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#27f5e0',
  colorScheme: 'dark',
  userScalable: true,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // lang and dir are set by the locale-specific layout; this root layout
  // exists because Next requires app/layout.tsx with html + body.
  // We set neutral defaults here; [locale]/layout.tsx overrides via metadata.
  const isProd = process.env.NODE_ENV === 'production';
  return (
    <html className="dark bg-background" suppressHydrationWarning>
      <head>
        <style>{`
          :root {
            --geist-font-family: ${geist.style.fontFamily};
            --geist-mono-font-family: ${geistMono.style.fontFamily};
          }
        `}</style>
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        {isProd && <Analytics />}
        {isProd && (
          <>
            {/* Google Analytics 4 */}
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { anonymize_ip: true });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
