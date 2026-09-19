/**
 * Jest global setup — runs before any test module is imported.
 *
 * The @Throttle({ default: { limit, ttl } }) decorator on the enquiry
 * controller reads ENQUIRY_THROTTLE_LIMIT when the module is first imported.
 * Setting it inside a beforeAll is therefore too late, so both limits are
 * raised here and restored by each suite that needs the real values.
 *
 * test/rate-limit.e2e-spec.ts overrides ENQUIRY_THROTTLE_LIMIT back to the
 * production value to verify the limiter genuinely rejects a burst.
 */
process.env.ENQUIRY_THROTTLE_LIMIT =
  process.env.ENQUIRY_THROTTLE_LIMIT ?? '100000';
process.env.THROTTLE_LIMIT = process.env.THROTTLE_LIMIT ?? '100000';
process.env.NODE_ENV = 'test';

// Jest reuses each test file's module registry, so the @Throttle decorator
// resolves its limit once per FILE — not once per suite. That means the
// rate-limit spec must run in its own Jest process, which is why
// package.json runs it as a separate, second command with the real value.
