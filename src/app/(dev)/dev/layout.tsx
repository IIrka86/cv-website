import type { Metadata } from 'next';
import '@/styles/globals.css';
import { fontVariables } from '@/styles/tokens/fonts';

export const metadata: Metadata = {
  title: 'Dev',
};

export default function RootLayout({ children }: LayoutProps<'/dev'>) {
  return (
    <html lang="en" className={fontVariables.join(' ')}>
      <body>{children}</body>
    </html>
  );
}
