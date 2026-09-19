import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Route protection.
 *
 * In Next.js 16 middleware was renamed to Proxy (`proxy.ts`). Same execution
 * model, new filename — `middleware.ts` is silently ignored by this version,
 * which would leave every admin route unprotected.
 *
 * The docs are explicit that Proxy is for *optimistic* checks, not full
 * authorisation. So this does a cheap presence/expiry check to redirect
 * anonymous visitors early, and every page and Server Action re-verifies the
 * signature through `getSession()` before touching data.
 */

const COOKIE_NAME = "taxi_admin_session";

/** Routes reachable without a session. */
const PUBLIC_PATHS = ["/login"];

function hasPlausibleSession(request: NextRequest): boolean {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;

  const [body, signature] = token.split(".");
  if (!body || !signature) return false;

  // Decode the payload to check expiry without recomputing the HMAC here —
  // signature verification happens server-side in getSession().
  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString()) as {
      exp?: number;
    };
    return typeof payload.exp === "number" && payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const isPublic = PUBLIC_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );

  const authed = hasPlausibleSession(request);

  // Signed in and visiting /login → send to the dashboard.
  if (isPublic && authed) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Anonymous and somewhere private → bounce to /login, remembering where
  // they were headed so they land there after signing in.
  if (!isPublic && !authed) {
    const loginUrl = new URL("/login", request.url);
    if (pathname !== "/")
      loginUrl.searchParams.set("next", `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  const response = NextResponse.next();

  // Defence in depth alongside the per-route headers.
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  return response;
}

export const config = {
  /*
    Everything except Next internals and static files. `_next/static` and
    `_next/image` are excluded because proxying them buys nothing and costs
    a function invocation per asset.
  */
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
