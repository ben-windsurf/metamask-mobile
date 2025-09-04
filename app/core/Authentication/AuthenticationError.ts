import { AuthData } from './Authentication';

/**
 * Custom error class for authentication-related failures.
 * Extends the standard Error class to include additional authentication context.
 */
class AuthenticationError extends Error {
  /** Authentication data associated with the error */
  public authData: AuthData;
  /** Custom error message for user-facing display */
  public customErrorMessage: string;

  /**
   * Creates a new AuthenticationError instance.
   *
   * @param message - The error message
   * @param customErrorMessage - Custom error message for user display
   * @param authData - Authentication data context
   */
  constructor(message: string, customErrorMessage: string, authData: AuthData) {
    super(message);
    this.authData = authData;
    this.customErrorMessage = customErrorMessage;
    // Set the prototype explicitly.
    // https://github.com/Microsoft/TypeScript-wiki/blob/main/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}

export default AuthenticationError;
