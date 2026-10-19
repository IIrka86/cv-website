# CV site

Personal CV and portfolio built with Next.js (App Router), TypeScript and CSS Modules.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

| Command                | What it does                                 |
| ---------------------- | -------------------------------------------- |
| `npm run dev`          | Start the dev server                         |
| `npm run build`        | Production build                             |
| `npm run start`        | Serve the production build                   |
| `npm run lint`         | Run ESLint                                   |
| `npm run typecheck`    | Type-check the whole project with `tsc`      |
| `npm run format`       | Format all files with Prettier               |
| `npm run format:check` | Check formatting without changing files (CI) |

## Pre-commit hook

`npm install` sets up a [husky](https://typicode.github.io/husky/) pre-commit hook via the `prepare` script.
On every commit it runs [lint-staged](https://github.com/lint-staged/lint-staged) on staged files only:

- `*.{js,mjs,cjs,jsx,ts,tsx}` — `eslint --fix`, then `prettier --write`
- `*.{json,md,css,yml,yaml}` — `prettier --write`

The commit is blocked if ESLint finds an error it can't fix. Type checking runs in CI, not in the hook.

Line endings are LF everywhere (enforced by `.gitattributes` and Prettier's `endOfLine`).
