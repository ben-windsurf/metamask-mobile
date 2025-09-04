export { default as createNavigationProps } from './mocks/navigation';

/**
 * Utility function to pause execution for a specified duration.
 * Commonly used in tests to wait for asynchronous operations or animations.
 *
 * @param ms - The number of milliseconds to sleep
 * @returns A promise that resolves after the specified delay
 *
 * @example
 * ```typescript
 * // Wait for 1 second
 * await sleep(1000);
 *
 * // Wait for animation to complete
 * await sleep(300);
 * ```
 */
export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
