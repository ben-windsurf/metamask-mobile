/* eslint-disable import/prefer-default-export */

/**
 * Determines if the application is running in production environment.
 *
 * @returns True if NODE_ENV is set to 'production', false otherwise
 *
 * @example
 * ```typescript
 * if (isProduction()) {
 *   // Production-only code
 *   console.log('Running in production mode');
 * }
 * ```
 */
export const isProduction = (): boolean =>
  // TODO: process.env.NODE_ENV === 'production' doesn't work with tests yet. Once we make it work,
  // we can remove the following line and use the code above instead.
  ({ ...process.env }?.NODE_ENV === 'production');
