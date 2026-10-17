---
paths:
  - "**/*.css"
---
# Styling
- Only semantic tokens: `var(--color-*)`, `var(--space-*)`, `var(--radius-*)`, `var(--duration-*)`
- No hex, rgb or px literals outside `src/styles/tokens`
- Every animation respects `prefers-reduced-motion`
- Mobile first; breakpoints from tokens
