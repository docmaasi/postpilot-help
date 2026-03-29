# CLAUDE.md — PostPilot.Help

## Project Overview

**PostPilot.Help** is a social media content management platform with a viral-hook pricing model. Users import YouTube videos, repurpose content for multiple platforms, schedule posts, and collaborate through "PostPilot Circles."

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite 6 |
| Build | Turborepo + pnpm 9 |
| Backend | Convex (BaaS) |
| Auth | Clerk (Google + Apple login) |
| Styling | Tailwind CSS 3 + shadcn/ui |
| AI | Claude API (@anthropic-ai/sdk) |
| Payments | Stripe (subscriptions + one-time packs) |
| Icons | Lucide React |
| Animation | Framer Motion |

## Monorepo Structure

```
apps/web/         → Main app (port 3000)
apps/marketing/   → Marketing site (port 3002, future)
packages/config/  → Shared Tailwind, ESLint, TSConfig
packages/lib/     → Auth, Convex client, shared hooks
packages/ui/      → shadcn/ui components
convex/           → Backend functions + schema
```

## Critical Rules

- **Do NOT run `pnpm build`** unless explicitly asked
- **Always run `pnpm typecheck`** after changes
- **Always run `pnpm lint`** after changes
- **Max 200 lines per file**, split if longer
- **Max 30 lines per function**
- **Named exports only** (no default exports except pages)
- **Files: kebab-case**, Components: PascalCase, Functions: camelCase

## Auth

- Clerk handles all authentication (Google, Apple, email)
- `ClerkProvider` + `ConvexProviderWithClerk` in main.jsx
- Backend uses `ctx.auth.getUserIdentity()` via helpers in `convex/lib/auth.ts`
- Clerk JWT issuer domain set as Convex env var

## Business Model

### Plans: Free, Creator ($12/mo), Pro ($24/mo)
### One-Time Packs: Content Blitz ($9.99), Viral Growth ($14.99), Analytics ($19.99)
### Viral Feature: PostPilot Circles (invite collaborators)
### Referrals: PostPilot Credits system

## Development

```bash
pnpm dev:web      # Start web app
pnpm convex:dev   # Start Convex dev server
pnpm typecheck    # Type check
pnpm lint         # Lint
```

## Convex Env Variables

- `CLERK_JWT_ISSUER_DOMAIN` — Clerk Frontend API URL
- `ANTHROPIC_API_KEY` — Claude API key (future)
- `STRIPE_SECRET_KEY` — Stripe secret (future)
- `STRIPE_WEBHOOK_SECRET` — Stripe webhook secret (future)
