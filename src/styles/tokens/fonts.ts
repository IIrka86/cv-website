import { Space_Grotesk, IBM_Plex_Sans, JetBrains_Mono } from 'next/font/google';

export const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin', 'latin-ext'],
});

export const ibmPlexSans = IBM_Plex_Sans({
  variable: '--font-ibm-plex-sans',
  subsets: ['latin', 'latin-ext', 'cyrillic'],
});

export const jetBrainsMono = JetBrains_Mono({
  variable: '--font-jet-brains-mono',
  subsets: ['latin', 'latin-ext', 'cyrillic'],
});
