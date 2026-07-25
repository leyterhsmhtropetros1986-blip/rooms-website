# Rooms Website

Static public website with a Vercel serverless backend for:
- secure admin authentication
- reservations management
- review moderation
- offers management
- AI draft generation
- Instagram draft workflow

## Production architecture

See `docs/production-architecture.md`.

## Stack

- Frontend: HTML, CSS, vanilla JavaScript
- Backend: Vercel Serverless Functions (`/api`)
- Database: Supabase Postgres (`/supabase/migrations/001_initial_schema.sql`)
- Admin session: signed HTTP-only cookie + middleware-protected routes

## Environment variables

Copy `.env.example` and set values in Vercel project settings:

- `SESSION_SECRET`
- `ADMIN_OWNER_EMAILS`
- `ADMIN_CREDENTIALS_JSON`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENAI_API_KEY` (optional)
- `AI_MODEL` (optional)
- `META_APP_ID` (optional)
- `META_APP_SECRET` (optional)
- `META_INSTAGRAM_ACCOUNT_ID` (optional)
- `META_ACCESS_TOKEN` (optional)

## Database setup

Run migration in Supabase SQL editor:

- `supabase/migrations/001_initial_schema.sql`

## Local run

This repository is static-first. For local API + middleware behavior, run with Vercel CLI:

1. `npm i -g vercel` (if missing)
2. `vercel dev`
3. Open:
   - Public site: `http://localhost:3000/`
   - Admin login: `http://localhost:3000/admin/login.html`

## Deployment steps (Vercel)

1. Import repository in Vercel.
2. Add environment variables from `.env.example`.
3. Apply Supabase migration.
4. Deploy.
5. Verify:
   - unauthenticated `/admin/index.html` redirects to `/admin/login.html`
   - authenticated admin CRUD works
   - public booking/review submissions persist in DB

## Security notes

- Never store API keys or tokens in frontend files.
- Keep `SUPABASE_SERVICE_ROLE_KEY` server-side only.
- Keep admin credentials in encrypted environment variables only.
- Prefer scrypt hashes in `ADMIN_CREDENTIALS_JSON` via `password_scrypt` (`salt:hexhash`) instead of plaintext passwords.
- Session cookie is `HttpOnly`, `Secure`, `SameSite=Lax`.
- Public review/reservation endpoints include server-side validation and rate limiting.
- Instagram publishing must remain disabled until Meta App permissions are approved.
