---
paths:
  - "src/app/**"
---
# Next.js App Router
- Server Component by default; `'use client'` only on the leaf that needs state, event handlers or browser APIs — never on a whole route segment
- Secrets, env vars and data access stay server-side; modules that must never reach the client import `server-only` at the top
- Metadata via `generateMetadata` (async when it reads data), not client-side `<head>` tags; type `params`/`searchParams` from Next's generated types
- `page.tsx` / `layout.tsx` / `loading.tsx` / `error.tsx` stay thin — delegate markup and logic to `src/components/sections`
- Route segments import from `sections`/`ui` only, matching the layering in CLAUDE.md — never the reverse
