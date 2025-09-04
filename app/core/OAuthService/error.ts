/**
 * Enumeration of OAuth error types with specific error codes.
 * Each error type represents a different failure scenario in the OAuth flow.
 */
export enum OAuthErrorType {
  /** Unknown or unspecified error occurred during OAuth process */
  UnknownError = 10001,
  /** User explicitly cancelled the OAuth authentication flow */
  UserCancelled = 10002,
  /** User dismissed the OAuth authentication dialog */
  UserDismissed = 10003,
  /** General login error occurred during authentication */
  LoginError = 10004,
  /** Invalid or unsupported OAuth provider specified */
  InvalidProvider = 10005,
  /** OAuth not supported on the current platform */
  UnsupportedPlatform = 10006,
  /** Another login process is already in progress */
  LoginInProgress = 10007,
  /** Error occurred on the authentication server side */
  AuthServerError = 10008,
  /** Invalid parameters provided for getting auth token */
  InvalidGetAuthTokenParams = 10009,
  /** Invalid OAuth state parameter received */
  InvalidOauthStateError = 10010,
  /** Google-specific login error occurred */
  GoogleLoginError = 10011,
  /** Apple-specific login error occurred */
  AppleLoginError = 10012,
}

/**
 * Human-readable error messages corresponding to each OAuth error type.
 * Maps each OAuthErrorType enum value to a descriptive error message.
 */
export const OAuthErrorMessages: Record<OAuthErrorType, string> = {
  [OAuthErrorType.UnknownError]: 'Unknown error',
  [OAuthErrorType.UserCancelled]: 'User cancelled',
  [OAuthErrorType.UserDismissed]: 'User dismissed',
  [OAuthErrorType.LoginError]: 'Login error',
  [OAuthErrorType.InvalidProvider]: 'Invalid provider',
  [OAuthErrorType.UnsupportedPlatform]: 'Unsupported platform',
  [OAuthErrorType.LoginInProgress]: 'Login in progress',
  [OAuthErrorType.AuthServerError]: 'Auth server error',
  [OAuthErrorType.InvalidGetAuthTokenParams]: 'Invalid auth token params',
  [OAuthErrorType.InvalidOauthStateError]: 'Invalid OAuth state',
  [OAuthErrorType.GoogleLoginError]: 'Google login error',
  [OAuthErrorType.AppleLoginError]: 'Apple login error',
} as const;

/**
 * Custom error class for OAuth-related errors.
 * Extends the standard Error class with OAuth-specific error codes and messages.
 */
export class OAuthError extends Error {
  /** The specific OAuth error type code */
  public readonly code: OAuthErrorType;

  /**
   * Creates a new OAuthError instance.
   *
   * @param errMessage - The error message or Error object to wrap
   * @param code - The specific OAuth error type code
   */
  constructor(errMessage: string | Error, code: OAuthErrorType) {
    if (errMessage instanceof Error) {
      super(errMessage.message);
      this.stack = errMessage.stack;
      this.name = errMessage.name;
    } else {
      super(errMessage);
    }
    this.message = `${OAuthErrorMessages[code]} - ${errMessage}`;
    this.code = code;
  }
}
