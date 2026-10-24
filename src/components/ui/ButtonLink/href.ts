export const isInternalHref = (href: string) =>
  href.startsWith('/') && !href.startsWith('//');

export const isExternalHref = (href: string) => /^(https?:)?\/\//.test(href);
