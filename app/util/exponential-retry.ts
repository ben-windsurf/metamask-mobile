/**
 * Calculates delay for exponential backoff with optional jitter and max delay cap
 *
 * @param retryCount - The current retry attempt number (0-based)
 * @param baseDelay - The base delay in milliseconds for the first retry
 * @param maxDelay - The maximum delay cap in milliseconds
 * @param jitter - Whether to add random jitter to prevent thundering herd
 * @returns The calculated delay in milliseconds
 */
export function calculateExponentialRetryDelay(
  retryCount: number,
  baseDelay: number = 1000,
  maxDelay: number = 30000,
  jitter: boolean = false,
): number {
  let delay = baseDelay * Math.pow(2, retryCount);

  if (delay > maxDelay) {
    delay = maxDelay;
  }

  if (jitter) {
    // Add up to 10% random jitter
    const jitterAmount = delay * 0.1 * Math.random();
    delay += jitterAmount;
  }

  return delay;
}

/**
 * Retries an async function with exponential backoff
 *
 * @param asyncFn - The async function to retry
 * @param maxRetries - Maximum number of retry attempts
 * @param baseDelay - The base delay in milliseconds for the first retry
 * @param maxDelay - The maximum delay cap in milliseconds
 * @param jitter - Whether to add random jitter to prevent thundering herd
 * @returns Promise that resolves with the function result or rejects with the last error
 * @throws The last error encountered if all retry attempts fail
 */
export async function retryWithExponentialDelay<T>(
  asyncFn: () => Promise<T>,
  maxRetries: number,
  baseDelay: number = 1000,
  maxDelay: number = 30000,
  jitter: boolean = false,
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await asyncFn();
    } catch (error) {
      lastError = error;

      // If this was the last attempt, don't delay
      if (attempt === maxRetries) {
        break;
      }

      // Calculate and wait for the delay
      const delay = calculateExponentialRetryDelay(
        attempt,
        baseDelay,
        maxDelay,
        jitter,
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  // If we get here, all attempts failed
  if (lastError instanceof Error) {
    throw lastError;
  } else if (lastError !== undefined && lastError !== null) {
    throw new Error(`Retry function failed: ${String(lastError)}`);
  } else {
    throw new Error('Retry function failed with unknown error');
  }
}
