import { registerAs } from '@nestjs/config';

/**
 * Typed config namespaces.
 *
 * Reading config through these accessors instead of raw `process.env` means a
 * typo becomes a compile error rather than `undefined` reaching runtime.
 */

export const appConfig = registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: parseInt(process.env.PORT ?? '3000', 10),
  apiPrefix: process.env.API_PREFIX ?? 'api',
  isProduction: process.env.NODE_ENV === 'production',
  corsOrigins: (
    process.env.CORS_ORIGINS ?? 'http://localhost:3000,http://localhost:3001'
  )
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
}));

export const throttleConfig = registerAs('throttle', () => ({
  limit: parseInt(process.env.THROTTLE_LIMIT ?? '120', 10),
  ttl: parseInt(process.env.THROTTLE_TTL ?? '60', 10),
}));

export const enquiriesConfig = registerAs('enquiries', () => ({
  maxStored: parseInt(process.env.MAX_STORED_ENQUIRIES ?? '500', 10),
  adminApiKey: process.env.ADMIN_API_KEY ?? 'change-me-in-production',
  notificationEmail: process.env.CONTACT_NOTIFICATION_EMAIL ?? 'info@taxi.com',
}));

export const CONFIG_NAMESPACES = [appConfig, throttleConfig, enquiriesConfig];
