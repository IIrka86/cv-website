---
paths:
  - '**/*.css'
---

# Styling

- Only semantic tokens: `var(--color-*)`, `var(--space-*)`, `var(--radius-*)`, `var(--duration-*)`
- No hex, rgb or px literals outside `src/styles/tokens`, except in `@media` conditions (see below)
- Every animation respects `prefers-reduced-motion`
- Mobile first. `var()` doesn't work in `@media` conditions, so write the breakpoint value from `--bp-md` literally and mark it: `@media (width >= 860px) { ... } /* --bp-md */`
