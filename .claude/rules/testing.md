---
paths:
  - '**/*.test.tsx'
---

# Testing

- Test behavior and rendered output a user would see, not internal state or implementation details
- Query with Testing Library by role/label/text (`getByRole`, `getByLabelText`, `getByText`) — never by CSS class or test id unless there's no accessible query
- Prefer `userEvent` over `fireEvent` for interactions
- No markup snapshot tests; assert specific content and behavior instead
- Co-locate the test file next to the component it covers
