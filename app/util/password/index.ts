import SecureKeychain from '../../core/SecureKeychain';
import Engine from '../../core/Engine';
import { UNRECOGNIZED_PASSWORD_STRENGTH } from '../../constants/error';

/**
 * Minimum required password length for MetaMask
 */
export const MIN_PASSWORD_LENGTH = 8;

/**
 * Converts a numeric password strength score to a descriptive word
 * @param {number} strength - Password strength score (0-4)
 * @returns {string} Descriptive word for password strength ('weak', 'good', or 'strong')
 * @throws {Error} If strength is negative
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
 * Checks if a password meets the minimum length requirement
 * @param {string} password - The password to validate
 * @returns {boolean} True if password meets minimum length requirement, false otherwise
 */
export const passwordRequirementsMet = (password: string) =>
  password.length >= MIN_PASSWORD_LENGTH;

interface PasswordValidationResponse {
  valid: boolean;
  message: string;
}

/**
 * Validates if the provided password matches the stored password
 * Verifies against both stored credentials and vault decryption capability
 * @param {string} input - The password to validate
 * @returns {Promise<PasswordValidationResponse>} Object containing validation result and message
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
