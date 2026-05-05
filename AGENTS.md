# AGENTS.md - awfixerme

## Setup

- Use Bun as package manager: `bun install`, `bun run dev`, etc.
- Required env vars: `MARBLE_API_KEY` (from Marble CMS settings), optionally `MARBLE_WEBHOOK_SECRET` for webhooks
- Clerk auth requires additional env vars (NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY, CLERK_SECRET_KEY, etc.) - check Clerk docs

## Commands

- Dev server: `bun run dev` (uses Turbopack)
- Build: `bun run build`
- Lint: `bun run lint`
- Typecheck: `bun run typecheck`
- Format: `bun run format`

## Architecture

- Next.js app router in `/app`
- Static MDX content in `/content`
- Blog posts likely sourced from Marble CMS via SDK
- ISR revalidation via `/api/revalidate`

## Quirks

- Images served from `images.marblecms.com`
- No test suite configured
- Deployed on Vercel with Bun
