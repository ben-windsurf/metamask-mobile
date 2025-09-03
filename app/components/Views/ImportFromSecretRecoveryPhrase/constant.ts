/**
 * Number of columns for displaying Secret Recovery Phrase words in grid layout
 */
export const NUM_COLUMNS = 3;

/**
 * Valid Secret Recovery Phrase lengths supported by MetaMask
 * Corresponds to BIP39 mnemonic phrase standards (12, 15, 18, 21, 24 words)
 */
export const SRP_LENGTHS = [12, 15, 18, 21, 24];

/**
 * Error message displayed when device passcode is not configured
 * Used during biometric authentication setup for wallet import
 */
export const PASSCODE_NOT_SET_ERROR = 'Error: Passcode not set.';

/**
 * Error message for iOS biometric authentication failures
 * Displayed when Touch ID or Face ID authentication is rejected
 */
export const IOS_REJECTED_BIOMETRICS_ERROR =
  'Error: The user name or passphrase you entered is not correct.';

/**
 * Space character constant used for Secret Recovery Phrase word separation
 */
export const SPACE_CHAR = ' ';
