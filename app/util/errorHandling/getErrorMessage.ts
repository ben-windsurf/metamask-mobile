/**
 * Interface for objects that have a message property
 */
export interface ErrorWithMessage {
  message: string;
}

/**
 * Type guard to check if an unknown value is an object with a message property
 * @param {unknown} error - The value to check
 * @returns {boolean} True if the value has a string message property
 */
export function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  );
}

/**
 * Converts an unknown value to an ErrorWithMessage object
 * @param {unknown} maybeError - The value to convert to an error with message
 * @returns {ErrorWithMessage} An object with a message property
 */
export function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) return maybeError;

  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    // fallback in case there's an error stringifying the maybeError
    // like with circular references for example.
    return new Error(String(maybeError));
  }
}

/**
 * Extracts an error message from an unknown value
 * @param {unknown} error - The error value to extract message from
 * @returns {string} The error message string
 */
export default function getErrorMessage(error: unknown) {
  return toErrorWithMessage(error).message;
}
