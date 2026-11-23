import type { Preview } from '@storybook/nextjs-vite';
import '@/styles/globals.css';
import { fontVariables } from '@/styles/tokens/fonts';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import { NextIntlClientProvider } from 'next-intl';
import messages from '../messages/en.json';

document.documentElement.classList.add(...fontVariables);

const preview: Preview = {
  parameters: {
    a11y: {
      // axe violations fail story tests (@storybook/addon-vitest) and CI
      test: 'error',
    },

    backgrounds: {
      disable: true,
    },
  },
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="en" messages={messages}>
        <Story />
      </NextIntlClientProvider>
    ),
    withThemeByDataAttribute({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
      attributeName: 'data-theme',
    }),
  ],
};

export default preview;
