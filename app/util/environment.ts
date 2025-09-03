/**
 * Environment utility functions for detecting runtime environment
 */
/* eslint-disable import/prefer-default-export */

/**
 * Determines if the application is running in production environment
 * @returns {boolean} True if running in production, false otherwise
 */
export const isProduction = (): boolean =>
  // TODO: process.env.NODE_ENV === 'production' doesn't work with tests yet. Once we make it work,
  // we can remove the following line and use the code above instead.
  ({ ...process.env }?.NODE_ENV === 'production');
