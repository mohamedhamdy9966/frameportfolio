# Taxi Admin

Internal control surface for Taxi Digital Solutions: triage quote-form
enquiries and review the content the client site renders.

## Quick start

```bash
npm install
cp .env.example .env.local     # then set ADMIN_API_KEY to match the server
npm run dev                    # http://localhost:3000
```

The NestJS API must be running first — **every** page in this portal reads from
it. Start it in `server/` with `npm run start:dev`.

## Architecture

```
app/
  login/                     public sign-in
  (dashboard)/               authenticated group — layout guards the whole subtree
    page.tsx                 pipeline stats + recent enquiries + system health
    enquiries/               list, filters, pagination
    enquiries/[id]/          detail, status triage, delete
    content/                 content hub
      projects|services|software|pricing|testimonials|faqs/
    loading.tsx error.tsx    streaming skeleton and error boundary
  actions/                   Server Actions (auth, enquiry mutations)
components/                  nav, filters, action controls, ui primitives
lib/                         api client, session, types, env, utils
proxy.ts                     route protection (Next 16's renamed middleware)
```

### Next.js 16 differences that matter here

This version differs from older Next.js in ways that would silently break
things. `AGENTS.md` points at `node_modules/next/dist/docs/`; these are the
three that bit:

1. **`middleware.ts` is now `proxy.ts`.** The functionality is identical but
   the old filename is *ignored*. A `middleware.ts` would leave every admin
   route unprotected with no error to warn you.
2. **`cookies()` is async** — `await cookies()` before reading or writing.
3. **`fetch` is uncached by default.** Content routes opt into caching
   explicitly via `next: { revalidate }`; enquiry routes deliberately do not.

### Security model

- **`proxy.ts` is an optimistic check only.** It verifies the session cookie is
  present and unexpired so anonymous visitors are redirected early. The docs are
  explicit that Proxy is not an authorisation boundary.
- **Every page and Server Action re-verifies the signature** through
  `getSession()` before touching data. Server Functions are directly POST-able,
  so the route guard is a convenience, not the security boundary.
- **The API key never reaches the browser.** `lib/api.ts` is marked
  `server-only`, which turns an accidental client import into a build error.
- **Sessions are signed cookies** (HMAC-SHA256), verified with a timing-safe
  comparison. Editing the payload invalidates the signature.
- **`?next=` is restricted to same-origin relative paths** so it cannot be used
  as an open redirect.
- **The server refuses admin access while `ADMIN_API_KEY` is the default**, so a
  misconfigured deploy cannot expose captured leads.

## Environment

| Variable | Purpose |
|---|---|
| `API_URL` | NestJS base URL, no trailing slash |
| `API_VERSION` | API version segment (default `v1`) |
| `ADMIN_API_KEY` | **Must equal the server's `ADMIN_API_KEY`** |
| `ADMIN_USERNAME` | This portal's login |
| `ADMIN_PASSWORD` | This portal's password |
| `SESSION_SECRET` | Signs the session cookie — `openssl rand -hex 32` |

## Known gaps

- **Login is a single shared account.** Fine for one operator, not for a team.
  `lib/session.ts` `verifyCredentials()` is the one function to replace with a
  real user lookup; nothing else needs to change.
- **Content is read-only.** Editing still happens in
  `server/src/content/data/portfolio.data.ts`. The admin shows what the client
  renders rather than pretending to write to a store that does not exist yet.
- **Unverified testimonials are surfaced but not editable.** The content hub
  flags them and they are withheld from the public API, but replacing them is
  still a code change.