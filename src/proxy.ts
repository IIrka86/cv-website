import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

export const config = {
  matcher: ['/((?!_next|_vercel|dev|admin|login|.*\\..*).*)'],
};

const proxy = createMiddleware(routing);

export default proxy;
