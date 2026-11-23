import type { ProxyConfig } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

// The proxy runs on every path except:
// - `_next`, `_vercel`: Next and Vercel internals (JS, CSS, analytics);
// - `dev`, `admin`, `login`: routes outside `[locale]`, a locale prefix
//   would send them to 404 (`admin` and `login` come in phase 6);
// - paths with a dot: static files such as `favicon.ico`.
// Exclusion is by prefix, not by whole segment, so `/devices` skips the proxy
// too. Deliberate: no pages start with these words.
// T6.5: `/admin` has to go back under the proxy for the session check,
// with next-intl handling only the localized paths.
export const config = {
  matcher: ['/((?!_next|_vercel|dev|admin|login|.*\\..*).*)'],
} satisfies ProxyConfig;

const proxy = createMiddleware(routing);

export default proxy;
