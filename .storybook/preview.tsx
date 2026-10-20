import type { Preview } from '@storybook/nextjs-vite';
import '@/styles/globals.css';
import { fontVariables } from '@/styles/tokens/fonts';
import { withThemeByDataAttribute } from '@storybook/addon-themes';

document.documentElement.classList.add(...fontVariables);

const preview: Preview = {
  parameters: {
    a11y: {
      // Only affects story tests run by @storybook/addon-vitest, which is not
      // installed yet (T2.8). Until then violations show in the
      // Accessibility panel only; CI's build-storybook doesn't check a11y.
      test: 'todo',
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
