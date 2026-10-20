import { Space_Grotesk, IBM_Plex_Sans, JetBrains_Mono } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin', 'latin-ext'],
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: '--font-ibm-plex-sans',
  subsets: ['latin', 'latin-ext', 'cyrillic'],
});

const jetBrainsMono = JetBrains_Mono({
  variable: '--font-jet-brains-mono',
  subsets: ['latin', 'latin-ext', 'cyrillic'],
});

export const fontVariables = [
  spaceGrotesk.variable,
  ibmPlexSans.variable,
  jetBrainsMono.variable,
];
