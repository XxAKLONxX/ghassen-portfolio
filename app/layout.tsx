import type { Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

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
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  );
}
