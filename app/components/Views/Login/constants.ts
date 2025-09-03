/**
 * Error message displayed when passcode is not set on the device
 * Used during login flow when biometric authentication fails due to missing passcode
 */
export const PASSCODE_NOT_SET_ERROR = 'Error: Passcode not set.';

/**
 * Generic error message for password decryption failures
 * Displayed when user enters incorrect password during wallet unlock
 */
export const WRONG_PASSWORD_ERROR = 'Error: Decrypt failed';

/**
 * Android-specific error message for OpenSSL decryption failures
 * Occurs when incorrect password is used on Android devices with hardware encryption
 */
export const WRONG_PASSWORD_ERROR_ANDROID =
  'Error: error:1e000065:Cipher functions:OPENSSL_internal:BAD_DECRYPT';

/**
 * Alternative Android-specific error message for cipher operation failures
 * Secondary error pattern for Android password decryption issues
 */
export const WRONG_PASSWORD_ERROR_ANDROID_2 =
  'Error: error in DoCipher, status: 2';

/**
 * Error message when attempting to unlock without an existing vault
 * Displayed when no wallet data exists but user tries to access wallet
 */
export const VAULT_ERROR = 'Cannot unlock without a previous vault.';

/**
 * Android-specific error when user cancels PIN entry
 * Occurs when biometric authentication falls back to PIN and user cancels
 */
export const DENY_PIN_ERROR_ANDROID = 'Error: Error: Cancel';

/**
 * Error message for JSON parsing failures during wallet data processing
 * Indicates corrupted or invalid wallet data format
 */
export const JSON_PARSE_ERROR_UNEXPECTED_TOKEN = 'Error: JSON Parse error';

/**
 * Error message when password doesn't meet security requirements
 * Used during password creation or change to enforce security standards
 */
export const PASSWORD_REQUIREMENTS_NOT_MET = 'Password requirements not met';
