import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { env } from "./env";

/**
 * Session handling for the admin portal.
 *
 * The session is a signed cookie: base64url(payload).base64url(hmac).
 * There is no server-side session store, so the signature is what stops a
 * visitor from minting their own cookie — editing the payload invalidates it.
 */

const COOKIE_NAME = "taxi_admin_session";

/** How long a login lasts. */
const SESSION_TTL_SECONDS = 60 * 60 * 8; // 8 hours

export interface SessionPayload {
  /** Who is signed in. Single-operator today; the field keeps the door open. */
  user: string;
  /** Issued-at, seconds since epoch. */
  iat: number;
  /** Expiry, seconds since epoch. Checked on every read. */
  exp: number;
}

function sign(value: string): string {
  return createHmac("sha256", env.sessionSecret)
    .update(value)
    .digest("base64url");
}

function encode(payload: SessionPayload): string {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${body}.${sign(body)}`;
}

function decode(token: string): SessionPayload | null {
  const [body, signature] = token.split(".");
  if (!body || !signature) return null;

  const expected = sign(body);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  // Length must match before timingSafeEqual, which throws on mismatched sizes.
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  let payload: SessionPayload;
  try {
    payload = JSON.parse(
      Buffer.from(body, "base64url").toString(),
    ) as SessionPayload;
  } catch {
    return null;
  }

  if (typeof payload?.exp !== "number" || payload.exp * 1000 < Date.now()) {
    return null;
  }

  return payload;
}

/** Reads and verifies the current session. Returns null when absent/expired. */
export async function getSession(): Promise<SessionPayload | null> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return decode(token);
}

/** Issues a new session cookie. Server Actions and Route Handlers only. */
export async function createSession(user: string): Promise<void> {
  const now = Math.floor(Date.now() / 1000);
  const token = encode({ user, iat: now, exp: now + SESSION_TTL_SECONDS });

  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: env.isProduction,
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function destroySession(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

/**
 * Constant-time credential check.
 *
 * Compares against the configured credentials from the environment. Swapping
 * this for a real user table later means changing only this function.
 */
export function verifyCredentials(username: string, password: string): boolean {
  const expectedUser = process.env.ADMIN_USERNAME ?? "admin";
  const expectedPassword = process.env.ADMIN_PASSWORD ?? "";

  if (!expectedPassword) return false;

  const userMatches = safeEqual(username, expectedUser);
  const passMatches = safeEqual(password, expectedPassword);

  // Evaluate both comparisons before returning, so the response time does not
  // reveal whether the username alone was correct.
  return userMatches && passMatches;
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export { COOKIE_NAME };
