# CV site

Personal CV and portfolio built with Next.js (App Router), TypeScript and CSS Modules.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

| Command                | What it does                                     |
| ---------------------- | ------------------------------------------------ |
| `npm run dev`          | Start the dev server                             |
| `npm run build`        | Production build                                 |
| `npm run start`        | Serve the production build                       |
| `npm run lint`         | Run ESLint                                       |
| `npm run typecheck`    | Generate route types, then type-check with `tsc` |
| `npm run format`       | Format all files with Prettier                   |
| `npm run format:check` | Check formatting without changing files (CI)     |

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
`npm run lint`, `npm run typecheck` and `npm run format:check` on Node 22.

`typecheck` runs `next typegen` first: route types in `.next/types` and `next-env.d.ts` are generated
by Next.js and are not in git, so a clean checkout needs them before `tsc`.
