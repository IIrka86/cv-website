# CV site

Personal CV and portfolio built with Next.js (App Router), TypeScript and CSS Modules.

**Live:** [cv-website-three-mocha.vercel.app](https://cv-website-three-mocha.vercel.app/)

Deployed on [Vercel](https://vercel.com): every merge into `main` goes to production, every pull request gets a preview URL.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

| Command                   | What it does                                     |
| ------------------------- | ------------------------------------------------ |
| `npm run dev`             | Start the dev server                             |
| `npm run build`           | Production build                                 |
| `npm run start`           | Serve the production build                       |
| `npm run lint`            | Run ESLint                                       |
| `npm run typecheck`       | Generate route types, then type-check with `tsc` |
| `npm run format`          | Format all files with Prettier                   |
| `npm run format:check`    | Check formatting without changing files (CI)     |
| `npm test`                | Run unit and story tests once (CI)               |
| `npm run test:unit`       | Run unit tests in watch mode                     |
| `npm run storybook`       | Start Storybook on port 6006                     |
| `npm run build-storybook` | Build static Storybook into `storybook-static/`  |

## Storybook

The UI kit (`src/components/ui`) is documented in [Storybook](https://storybook.js.org) with
`@storybook/nextjs-vite`. Each component has a `Name.stories.tsx` next to it.

- The toolbar switches light and dark theme: it sets `data-theme` on `<html>`, like the site does.
- The Accessibility panel runs axe on every story.
- `.storybook/preview.tsx` loads `globals.css` and adds the font variables to `<html>`, because
  stories render without `app/layout.tsx`.

## Tests

[Vitest](https://vitest.dev) runs two projects from `vitest.config.mts`:

- **`unit`** — `src/**/*.test.tsx` in jsdom with [Testing Library](https://testing-library.com).
  Test files live next to the component they cover.
- **`storybook`** — every story becomes a test via `@storybook/addon-vitest`, run in headless
  Chromium. A story fails if it throws while rendering or if axe finds an accessibility violation
  (`a11y.test: 'error'` in `.storybook/preview.tsx`). Story tests use the default (light) theme only.

Story tests need Chromium once per machine: `npx playwright install chromium`.
To run a single project: `npm test -- --project storybook`.

## Project structure

```
src/
  app/                # routing only: layouts, pages, route handlers
    [locale]/         # localized pages (phase 3)
    admin/            # admin panel (phase 6)
    login/            # sign-in page (phase 6)
  components/
    ui/               # UI kit: Button, Heading, Tabs, ...
    sections/         # page sections: Hero, Skills, About, Experience, ...
  content/            # CV data, typed by src/types
  i18n/               # next-intl configuration
  lib/                # pure helpers: dates, experience length
  server/             # server-only code: DB queries (phase 6)
  styles/
    tokens/           # design tokens as CSS variables
    globals.css       # reset and base styles
  types/              # shared TypeScript types
messages/             # UI translations: en.json, ru.json, pl.json
public/               # static files served from /
```

### Layers

```
tokens → ui → sections → app (pages)
```

A layer imports only from the layers to its left:

- `components/ui` uses design tokens and nothing from `sections` or `app`.
- `components/sections` compose UI kit components and receive data via props.
- Pages in `app` read data on the server and pass it down to sections.

Components use semantic tokens only — no raw colors, sizes or durations.

## Pre-commit hook

`npm install` sets up a [husky](https://typicode.github.io/husky/) pre-commit hook via the `prepare` script.
On every commit it runs [lint-staged](https://github.com/lint-staged/lint-staged) on staged files only:

- `*.{js,mjs,cjs,jsx,ts,tsx}` — `eslint --fix`, then `prettier --write`
- `*.{json,md,css,yml,yaml}` — `prettier --write`

The commit is blocked if ESLint finds an error it can't fix. Type checking runs in CI, not in the hook.

Line endings are LF everywhere (enforced by `.gitattributes` and Prettier's `endOfLine`).

## CI

[GitHub Actions](.github/workflows/ci.yml) runs on every pull request and on pushes to `main`:
`npm run lint`, `npm run typecheck`, `npm test`, `npm run format:check` and `npm run build-storybook`
on Node 22. Chromium for story tests is installed in CI with `npx playwright install --with-deps chromium`.

`typecheck` runs `next typegen` first: route types in `.next/types` and `next-env.d.ts` are generated
by Next.js and are not in git, so a clean checkout needs them before `tsc`.
