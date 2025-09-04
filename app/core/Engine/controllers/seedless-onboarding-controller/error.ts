/**
 * Error types for the Seedless Onboarding Controller.
 * Each error type has a unique numeric code for identification.
 */
export enum SeedlessOnboardingControllerErrorType {
  /** Generic unknown error occurred during seedless onboarding */
  UnknownError = 10101,
  /** Authentication failed during the onboarding process */
  AuthenticationError = 10102,
  /** Error occurred while changing password */
  ChangePasswordError = 10103,
  /** Password was recently updated and cannot be changed again */
  PasswordRecentlyUpdated = 10104,
}

/**
 * Human-readable error messages corresponding to each SeedlessOnboardingControllerErrorType.
 * Maps error type codes to descriptive error messages for user display.
 */
export const SeedlessOnboardingControllerErrorMessages: Record<
  SeedlessOnboardingControllerErrorType,
  string
> = {
  [SeedlessOnboardingControllerErrorType.UnknownError]: 'Unknown error',
  [SeedlessOnboardingControllerErrorType.AuthenticationError]:
    'Authentication error',
  [SeedlessOnboardingControllerErrorType.ChangePasswordError]:
    'Change password error',
  [SeedlessOnboardingControllerErrorType.PasswordRecentlyUpdated]:
    'Password recently updated',
} as const;

/**
 * Custom error class for Seedless Onboarding Controller operations.
 * Extends the base Error class with specific error codes and formatted messages.
 */
export class SeedlessOnboardingControllerError extends Error {
  /** The specific error type code identifying the nature of the error */
  public readonly code: SeedlessOnboardingControllerErrorType;

  /**
   * Creates a new SeedlessOnboardingControllerError instance.
   *
   * @param code - The specific error type from SeedlessOnboardingControllerErrorType
   * @param errMessage - Optional custom error message or Error object to wrap
   */
  constructor(
    code: SeedlessOnboardingControllerErrorType,
    errMessage?: string | Error,
  ) {
    if (errMessage instanceof Error) {
      super(errMessage.message);
      this.stack = errMessage.stack;
      this.name = errMessage.name;
    } else {
      super(errMessage || SeedlessOnboardingControllerErrorMessages[code]);
    }
    this.message = `SeedlessOnboardingController- ${
      errMessage || SeedlessOnboardingControllerErrorMessages[code]
    }`;
    this.code = code;
  }
}
