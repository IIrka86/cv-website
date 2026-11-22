import type { Metadata } from 'next';
import '@/styles/globals.css';
import { fontVariables } from '@/styles/tokens/fonts';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { routing } from '@/i18n/routing';

// Placeholder, the same for every locale: per-locale title and description
// come with generateMetadata in T3.6
export const metadata: Metadata = {
  title: 'My CV App',
  description: 'Describe my experience',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  params,
  children,
}: LayoutProps<'/[locale]'>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} className={fontVariables.join(' ')}>
      <body>
        <NextIntlClientProvider>
          {/* The header (T3.5) and footer will sit next to <main> */}
          <main>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
