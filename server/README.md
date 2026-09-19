# Taxi Digital Solutions - API

The NestJS backend for the Taxi portfolio site and admin portal.

It serves two jobs:

1. **Content** - projects, services, shipped software, FAQs and pricing, so the
   client and admin apps read from one source instead of duplicating strings.
2. **Enquiries** - the quote form endpoint, plus an admin surface for triaging
   the leads that come out of it.

## Quick start

```bash
npm install
cp .env.example .env      # then edit ADMIN_API_KEY
npm run start:dev
```

The API listens on `http://localhost:3001` and the docs are at
`http://localhost:3001/api/docs`.

> **Port note:** the client expects `PORT=3001` so it does not collide with the
> Next.js dev server on 3000.

## API surface

All endpoints are under `/api/v1`. Health is deliberately unprefixed.

| Method | Path | Auth | Purpose |
|---|---|
| GET | `/health` | - | Liveness probe (200 healthy / 503 degraded) |
| GET | `/api/v1` | - | Service banner + endpoint map |
| GET | `/api/v1/status` | - | Uptime, version, environment |
| GET | `/api/v1/content/bootstrap` | - | Everything the homepage needs, in one call |
| GET | `/api/v1/content/site` | - | Brand, contact details, hero + impact stats |
| GET | `/api/v1/content/projects` | - | Case studies (`?search=`, `?category=`, `?tag=`, `?page=`, `?limit=`) |
| GET | `/api/v1/content/projects/featured` | - | Featured case studies |
| GET | `/api/v1/content/projects/tags` | - | Distinct tags, for filter chips |
| GET | `/api/v1/content/projects/:id` | - | One case study |
| GET | `/api/v1/content/services` | - | Services (`?category=marketing\|software`) |
| GET | `/api/v1/content/services/:id` | - | One service |
| GET | `/api/v1/content/software` | - | Shipped platforms with stack + metrics |
| GET | `/api/v1/content/software/:id` | - | One platform |
| GET | `/api/v1/content/testimonials` | - | Verified testimonials only by default |
| GET | `/api/v1/content/faqs` | - | FAQ (`?search=`) |
| GET | `/api/v1/content/pricing` | - | Engagement models |
| GET | `/api/v1/content/process` | - | Five-stage delivery process |
| GET | `/api/v1/content/milestones` | - | Company timeline |
| GET | `/api/v1/content/form-options` | - | Select options for the quote form |
| POST | `/api/v1/enquiries` | - | Submit a quote request (5/min per IP) |
| GET | `/api/v1/enquiries` | `x-api-key` | List enquiries (`?status=`, `?search=`, `?page=`, `?limit=`) |
| GET | `/api/v1/enquiries/stats` | `x-api-key` | Pipeline counts |
| GET | `/api/v1/enquiries/:id` | `x-api-key` | One enquiry |
| PATCH | `/api/v1/enquiries/:id/status` | `x-api-key` | Move a lead through the pipeline |
| DELETE | `/api/v1/enquiries/:id` | `x-api-key` | Delete an enquiry |

## Response envelope

Every response uses one shape, so a client never has to branch on whether an
endpoint wrapped its payload:

```jsonc
// success
{ "success": true, "data": { ... }, "meta": { "total": 4, "page": 1, ... } }

// failure
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "One or more fields are invalid.",
    "details": ["email must be a valid email address"],
    "path": "/api/v1/enquiries",
    "requestId": "eab4263e-...",
    "timestamp": "2026-09-19T10:54:18.701Z"
  }
}
```

Error `code` values are stable and safe to switch on: `VALIDATION_ERROR`,
`NOT_FOUND`, `UNAUTHORIZED`, `RATE_LIMITED`, `INTERNAL_SERVER_ERROR`, and so on.

Every response also carries an `X-Request-Id` header. Quote it in a bug report
and the whole request can be traced through the logs.

## Connecting the client

The client's `app/api/contact/route.js` currently validates and accepts
enquiries locally. To forward them here instead, replace the marked TODO with:

```js
await fetch(`${process.env.API_URL}/api/v1/enquiries`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload),
});
```

The option lists in `client/src/constants/constants.js` mirror
`GET /api/v1/content/form-options`, and the server validates against the same
values - so a value the form offers is always a value the API accepts.

## Configuration

Validated on boot; the process refuses to start on a bad environment rather
than failing later at runtime. See `.env.example` for the full list.

| Variable | Default | Notes |
|---|---|---|
| `PORT` | `3000` | Use `3001` locally to avoid the client |
| `API_PREFIX` | `api` | |
| `CORS_ORIGINS` | localhost:3000,3001 | Comma-separated allow-list - no wildcard |
| `THROTTLE_LIMIT` / `THROTTLE_TTL` | `120` / `60` | Global rate limit |
| `ENQUIRY_THROTTLE_LIMIT` | `5` | Per-minute burst cap on the public POST |
| `MAX_STORED_ENQUIRIES` | `500` | In-memory retention |
| `ADMIN_API_KEY` | `change-me-in-production` | **Must be changed** - see below |
| `ENABLE_SWAGGER` | `false` | Docs are auto-served outside production |

### Admin access

`ADMIN_API_KEY` protects every endpoint that returns captured personal data.
While it is still the default value the guard **refuses all admin requests** and
logs a warning, so a misconfigured deploy can never silently expose the leads.
Set it to something long and random:

```bash
openssl rand -hex 32
```

## Testing

```bash
npm test          # unit - services and business rules
npm run test:e2e  # e2e - the real HTTP contract
npm run test:cov  # coverage
```

The e2e suite runs in two passes because the `@Throttle` decorator resolves its
limit once per module load: the main suite raises the burst cap so it can fire
many submissions, then `rate-limit.e2e-spec.ts` runs separately at the shipped
value to prove the limiter really rejects a burst.

## Architecture

```
src/
  config/          env schema, typed namespaces
  common/
    dto/           pagination contract shared by every list endpoint
    filters/       one error shape for the whole API
    guards/        admin API-key guard (timing-safe compare)
    interfaces/    response envelope types
    middleware/    request logging + correlation ids
  content/         portfolio content, read-only
  enquiries/       quote submissions + admin triage
  health/          liveness probes
  setup-app.ts     pipes, filters, CORS, versioning - shared by main.ts and tests
  main.ts          process bootstrap
```

## Known gaps

Being explicit about what is **not** production-ready yet:

- **Enquiry storage is in-memory.** Enquiries vanish on restart. This is
  deliberate - it keeps the server runnable with zero infrastructure. Before
  real traffic, replace the four private helpers at the bottom of
  `EnquiriesService` with Prisma or TypeORM. Nothing outside that file knows how
  enquiries are stored, so this is a contained change.
- **Submissions are not emailed.** Enquiries are stored but nobody is notified.
  Wire the marked TODO in `EnquiriesController.create` to a transactional email
  provider (Resend, SendGrid, SES).
- **Content is static.** Editable content still lives in
  `content/data/portfolio.data.ts`. The controller and DTO shapes are already
  what a CMS would serve, so swapping the source does not change the API.
- **Testimonials are placeholders.** Every entry has `verified: false` and is
  withheld from `/content/testimonials` and `/content/bootstrap` by default.
  Replace them with attributable quotes before publishing.
- **No authentication provider.** Admin access is a shared API key, which is
  enough for one operator but not for per-user accounts. Move to JWT or session
  auth before more than one person needs access.