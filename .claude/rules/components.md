---
paths:
  - 'src/components/**'
---

# Components

- One folder per component: `Name.tsx`, `Name.module.css`, `Name.stories.tsx`, `index.ts`
- Variants via props (`variant`, `size`, `tone`), not new components
- Props typed with an exported `NameProps` interface; no `any`
- Interactive elements are real `<button>`, `<a>`, `<input>`; icon-only buttons have `aria-label`
- Server Component unless it needs state or event handlers
