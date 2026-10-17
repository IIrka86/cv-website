# CV site

Personal CV and portfolio. Next.js App Router, TypeScript, CSS Modules, next-intl.

## Commands
- `npm run dev` — dev server
- `npm run lint` / `npm run typecheck` / `npm test`
- `npm run storybook` — UI kit

## Architecture
Layers: theme tokens → ui kit → sections → pages. A layer only imports from layers above it.
- `src/styles/tokens` — design tokens (CSS variables)
- `src/components/ui` — UI kit
- `src/components/sections` — page sections
- `src/content` — CV data, typed by `src/types`

## Conventions
- Server Components by default; `'use client'` only for state or event handlers
- No raw colors, sizes or durations in components — semantic tokens only
- Conventional Commits; one task per branch: `feat/T1-3-semantic-colors`

Detailed rules live in `.claude/rules/`.
