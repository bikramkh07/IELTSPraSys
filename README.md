# IELTSPracSYS

AI-powered IELTS practice app built with Next.js App Router, Clerk authentication, Gemini feedback, and Prisma/PostgreSQL score history.

## Stack

- Next.js 15, React 19, TypeScript
- Clerk for authentication
- Google Gemini for writing and speaking feedback
- Prisma with PostgreSQL for persisted score history
- Node test runner for dependency-light unit, integration, and smoke tests

## Setup

1. Install dependencies:

```bash
npm ci
```

2. Create `.env.local` from `.env.local.example`.

Required for production:

```env
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
GEMINI_API_KEY=...
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/ielts_up?sslmode=require
```

Optional:

```env
NEXT_PUBLIC_ENABLE_WEB_VITALS=true
```

3. Validate Prisma and run migrations:

```bash
npx prisma validate
npm run db:deploy
```

4. Start local development:

```bash
npm run dev
```

## API

### `POST /api/writing`

Returns IELTS writing feedback.

Body:

```json
{
  "prompt": "Discuss both views and give your opinion.",
  "essay": "At least 50 words..."
}
```

Validation:

- Essay and prompt are required.
- Essay minimum: 50 words.
- Essay maximum: 12,000 characters.
- Prompt maximum: 2,000 characters.
- Same-origin browser requests only.
- Rate limited by IP.

### `POST /api/speaking`

Returns IELTS speaking transcript and band feedback.

Form data:

- `audio`: WebM, OGG, MP4, MPEG, or WAV audio up to 10 MB.

### `GET /api/scores`

Returns saved scores for the signed-in user.

Query:

- `limit`: optional, defaults to 50, maximum 100.

### `POST /api/scores`

Saves a score for the signed-in user. Requires Clerk and `DATABASE_URL`.

Body:

```json
{
  "module": "writing",
  "overall": 7,
  "ta": 7,
  "cc": 6.5,
  "lr": 7,
  "gra": 6.5
}
```

Scores must be valid IELTS half-band values from 0 to 9.

### `POST /api/monitoring/web-vitals`

Receives browser Web Vitals when `NEXT_PUBLIC_ENABLE_WEB_VITALS=true`.

## Quality Gates

Run before deployment:

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

Run E2E smoke checks against a live local or deployed app:

```bash
E2E_BASE_URL=http://localhost:3000 npm run test:e2e
```

Run a small HTTP load check:

```bash
LOAD_TEST_URL=http://localhost:3000 LOAD_TEST_REQUESTS=100 LOAD_TEST_CONCURRENCY=10 npm run load:test
```

## Deployment

1. Add all production environment variables to your deployment platform.
2. Use PostgreSQL for `DATABASE_URL`; SQLite URLs such as `file:` are not valid for this schema.
3. Run `npm run db:deploy` during deployment or as a pre-release migration job.
4. Ensure Clerk production domains include the deployed domain.
5. Set `NEXT_PUBLIC_APP_URL` to the final HTTPS origin.
6. Enable Web Vitals reporting only after a log sink is configured.

## Security Notes

- API POST routes enforce same-origin checks and IP-based rate limits.
- Security headers are configured in `next.config.ts`.
- Clerk protects AI and score routes when Clerk keys are present.
- Secrets must remain in environment variables, not source files.
- Gemini failures return API errors when configured, rather than silently returning mock scores.

## Production Checklist

- `npm ci` succeeds in CI.
- `npx prisma validate` succeeds with a PostgreSQL `DATABASE_URL`.
- `npm run typecheck`, `npm run lint`, `npm test`, and `npm run build` pass.
- E2E smoke tests pass against the deployed URL.
- Database migrations have been applied.
- Clerk production keys and allowed domains are configured.
- Monitoring logs are connected to a production sink.
- Load test latency and error rate are acceptable for the expected launch traffic.
