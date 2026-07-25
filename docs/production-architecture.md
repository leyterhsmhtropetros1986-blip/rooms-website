# Production Architecture (Vercel + Supabase)

## Stack
- **Frontend:** existing static HTML/CSS/JS (unchanged design-first approach)
- **Backend:** Vercel serverless functions under `/api`
- **Database:** Supabase PostgreSQL (tables for reservations, reviews, offers, drafts)
- **Auth:** secure server-issued HTTP-only cookie session for owner-only admin access
- **Route protection:** Vercel middleware for `/admin/*` and `/api/admin/*`

## Security model
- No credentials in frontend files.
- Admin login verifies server-side credentials from environment variables.
- Session cookie: `HttpOnly`, `Secure`, `SameSite=Lax`, signed with `SESSION_SECRET`.
- Admin API endpoints require valid server-side session.
- Public submission APIs enforce server-side validation and basic rate limiting.

## Data flows
1. Public booking form → `POST /api/public/reservations` → DB (status `pending` by default).
2. Public review form → `POST /api/public/reviews` → DB (status `pending` by default).
3. Public website offers section → `GET /api/public/offers` (only active/valid offers).
4. Public approved reviews → `GET /api/public/reviews` (only `approved`).
5. Admin dashboard CRUD/moderation → `/api/admin/*` endpoints.
6. AI assistant → `/api/admin/ai-generate` (only when `OPENAI_API_KEY` is configured).
7. Instagram remains OAuth-ready/documented via backend status + draft storage (no fake publishing).

## Credentials-dependent features
- AI generation requires `OPENAI_API_KEY`.
- Instagram “connected/publish-ready” status requires Meta env vars.
- Without these credentials, features stay safely disabled or return setup errors.
