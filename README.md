# Relay Shift Handoff Board

Relay is a private React workspace for handing operational context from one support shift to the next. It keeps the most important work visible, makes ownership explicit, and stores responder notes without external services.

## Product goals

- Make open operational work easy to scan at shift change.
- Preserve context while teams and statuses are filtered.
- Keep keyboard and screen-reader workflows first-class.
- Stay fully runnable with local fixture data.

## Local development

Use Node.js 20.19.5 and pnpm 10.34.5.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Quality checks:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```
