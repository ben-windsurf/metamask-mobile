/**
 * Error types for the Seedless Onboarding Controller
 * Used to categorize different types of errors that can occur during seedless onboarding flow
 */
export enum SeedlessOnboardingControllerErrorType {
  UnknownError = 10101,
  AuthenticationError = 10102,
  ChangePasswordError = 10103,
  PasswordRecentlyUpdated = 10104,
}

/**
 * Error messages mapping for Seedless Onboarding Controller error types
 * Provides human-readable error messages for each error type
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
 * Custom error class for Seedless Onboarding Controller operations
 * Extends the base Error class with specific error codes and formatted messages
 */
export class SeedlessOnboardingControllerError extends Error {
  public readonly code: SeedlessOnboardingControllerErrorType;

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
