import type { Preview } from '@storybook/nextjs-vite';
import '@/styles/globals.css';
import { fontVariables } from '@/styles/tokens/fonts';
import { withThemeByDataAttribute } from '@storybook/addon-themes';

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
