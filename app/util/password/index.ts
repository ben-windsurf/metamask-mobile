import SecureKeychain from '../../core/SecureKeychain';
import Engine from '../../core/Engine';
import { UNRECOGNIZED_PASSWORD_STRENGTH } from '../../constants/error';

/**
 * Minimum required password length for MetaMask wallet security.
 */
export const MIN_PASSWORD_LENGTH = 8;

/**
 * Converts a numeric password strength score to a human-readable word.
 *
 * @param strength - Numeric strength score (0-4 scale)
 * @returns Password strength description as a string
 * @throws {Error} When strength is negative (unrecognized)
 */
export const getPasswordStrengthWord = (strength: number) => {
  if (strength < 0) {
    throw new Error(UNRECOGNIZED_PASSWORD_STRENGTH);
  } else if (strength < 3) {
    return 'weak';
  } else if (strength === 3) {
    return 'good';
  } else {
    return 'strong';
  }
};

/**
 * Checks if a password meets the minimum length requirements.
 *
 * @param password - The password string to validate
 * @returns True if password meets minimum length requirement, false otherwise
 */
export const passwordRequirementsMet = (password: string) =>
  password.length >= MIN_PASSWORD_LENGTH;

/**
 * Response interface for password validation operations.
 */
interface PasswordValidationResponse {
  /** Whether the password validation was successful */
  valid: boolean;
  /** Descriptive message about the validation result */
  message: string;
}

/**
 * Validates if the provided input matches the stored wallet password.
 * Performs secure validation by attempting to decrypt the vault with stored credentials.
 *
 * @param input - The password input to validate against stored password
 * @returns Promise resolving to validation response with success status and message
 */
export const doesPasswordMatch = async (
  input: string,
): Promise<PasswordValidationResponse> => {
  try {
    // first try to get the stored password
    const credentials = await SecureKeychain.getGenericPassword();
    if (credentials) {
      try {
        // then we verify if the stored password matches the one that can decrypt the vault
        // TODO: Replace "any" with type
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { KeyringController } = Engine.context as any;
        await KeyringController.exportSeedPhrase(credentials.password);
        // now that we are confident that the user is logged in, we can test that the input matches
        if (input === credentials.password) {
          return {
            valid: true,
            message: 'The input matches the stored password',
          };
        }
        return {
          valid: false,
          message: 'The input does not match the stored password',
        };
        // TODO: Replace "any" with type
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        return {
          valid: false,
          message: error.toString(),
        };
      }
    }
    return {
      valid: false,
      message: 'no password stored',
    };
    // TODO: Replace "any" with type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      valid: false,
      message: error.toString(),
    };
  }
};
