---
name: new-component
description: Scaffold a UI-kit component folder from the project templates
argument-hint: <ComponentName>
disable-model-invocation: true
---

Create a new UI-kit component named `$ARGUMENTS`.

1. The name must be PascalCase (`Text`, `ButtonLink`). If it is missing or not
   PascalCase, ask for a valid name and stop.
2. The target folder is `src/components/ui/$ARGUMENTS/`. If it already exists,
   say so and stop. Never overwrite existing files.
3. Read the four templates in `templates/` next to this file and replace the
   placeholders:
   - `%Name%`: the name as given, e.g. `ButtonLink`
   - `%NAME%`: the name in SCREAMING_SNAKE_CASE, e.g. `BUTTON_LINK`
4. Write the results:

   | Template             | File                 |
   | -------------------- | -------------------- |
   | `Component.tsx.tmpl` | `%Name%.tsx`         |
   | `module.css.tmpl`    | `%Name%.module.css`  |
   | `stories.tsx.tmpl`   | `%Name%.stories.tsx` |
   | `index.ts.tmpl`      | `index.ts`           |

5. Copy the templates exactly. Don't add props, variants, styles or stories
   beyond what the templates contain: the component itself is written by hand.
6. Run `npm run lint` and `npm run typecheck`, then list the created files and
   the check results.
