import { defineRouting } from 'next-intl/routing';

// The only list of locales: the layout, request config, navigation
// and generateStaticParams all read it from here
export const routing = defineRouting({
  locales: ['en', 'ru', 'pl'],
  defaultLocale: 'en',
});
