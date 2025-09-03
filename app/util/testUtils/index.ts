/**
 * Test utility functions for testing React Native components and async operations
 */
export { default as createNavigationProps } from './mocks/navigation';

/**
 * Utility function to pause execution for a specified duration
 * Useful for testing async operations and waiting for state changes
 * @param {number} ms - Number of milliseconds to sleep
 * @returns {Promise<void>} Promise that resolves after the specified delay
 */
export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
