import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

// Locale-aware versions of Next's navigation APIs: an internal path like
// `/projects` gets the current locale prefix, e.g. `/ru/projects`
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
