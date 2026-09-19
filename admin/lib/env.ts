/**
 * Environment configuration for the admin portal.
 *
 * Read once at module load so a missing variable surfaces immediately rather
 * than turning into `undefined` halfway through a fetch.
 */

function required(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (!value) {
    throw new Error(
      `Missing required environment variable ${name}. Copy .env.example to .env.local and fill it in.`,
    );
  }
  return value;
}

export const env = {
  /** Base URL of the NestJS API, without a trailing slash. */
  apiUrl: required("API_URL", "http://localhost:3001").replace(/\/+$/, ""),

  /** API version segment, so bumping it is a one-line change. */
  apiVersion: process.env.API_VERSION ?? "v1",

  /**
   * Shared secret for the server's admin endpoints.
   * Must match ADMIN_API_KEY in the server's .env.
   * Server-only: never prefix this with NEXT_PUBLIC_.
   */
  adminApiKey: required("ADMIN_API_KEY", ""),

  /** Secret used to sign the admin session cookie. */
  sessionSecret: required("SESSION_SECRET", ""),

  isProduction: process.env.NODE_ENV === "production",
} as const;

export const apiBase = `${env.apiUrl}/api/${env.apiVersion}`;
