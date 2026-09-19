/**
 * Setup for the rate-limit suite only.
 *
 * The main e2e suite raises the enquiry burst limit so it can fire many
 * submissions without tripping the throttle. This suite exists to prove the
 * limiter works, so it deliberately leaves the production value in place.
 */
process.env.ENQUIRY_THROTTLE_LIMIT = '5';
process.env.THROTTLE_LIMIT = '100000';
process.env.NODE_ENV = 'test';
