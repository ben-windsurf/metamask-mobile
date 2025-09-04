// Network Errors
/**
 * Enum defining different types of network switching errors that can occur
 * when attempting to change networks in the MetaMask mobile application.
 */
export enum NetworkSwitchErrorType {
  /** Error when network ID is not provided */
  missingNetworkId = 'Missing network id',
  /** Error when trying to switch to the currently active network */
  currentNetwork = 'Already in current network',
  /** Error when the provided network ID is not recognized */
  unknownNetworkId = 'Unknown network with id',
  /** Error when chain ID is not provided */
  missingChainId = 'Missing chain id',
}

// Transaction Errors
/** Error message for when token decimals are set to a negative value */
export const NEGATIVE_TOKEN_DECIMALS = 'Token decimals can not be negative';
/** Error message for when an unknown chain ID is encountered during network operations */
export const NETWORK_ERROR_UNKNOWN_CHAIN_ID = 'Unknown chain id';

// QR hardware Errors
/** Error message for when a transaction is canceled on Keystone hardware wallet */
export const KEYSTONE_TX_CANCELED = 'KeystoneError#Tx_canceled';

// Password Errors
/** Error message for when an incorrect password is provided */
export const WRONG_PASSWORD_ERROR = 'error: Invalid password';
/** Error message for when password strength cannot be determined */
export const UNRECOGNIZED_PASSWORD_STRENGTH = 'Unrecognized password strength.';

// Contact Flow Errors
/** Error message for when attempting to save a contact that already exists */
export const CONTACT_ALREADY_SAVED = 'contactAlreadySaved';
/** Error message for when there's an issue with a token symbol */
export const SYMBOL_ERROR = 'symbolError';

// Authentication errors
/** Error message for when no credentials are found in secure keychain during app-triggered authentication */
export const AUTHENTICATION_APP_TRIGGERED_AUTH_NO_CREDENTIALS =
  'Password does not exist when calling SecureKeychain.getGenericPassword';
/** Error message for when app-triggered authentication fails during login process */
export const AUTHENTICATION_APP_TRIGGERED_AUTH_ERROR =
  'Authentication.appTriggeredAuth failed to login';
/** Error message for when wallet creation fails during authentication process */
export const AUTHENTICATION_FAILED_WALLET_CREATION = 'Failed wallet creation';
/** Error message for when login attempt fails */
export const AUTHENTICATION_FAILED_TO_LOGIN = 'Failed to login';
/** Detailed error message for when password reset fails with additional context */
export const AUTHENTICATION_RESET_PASSWORD_FAILED_MESSAGE =
  'Authentication.resetPassword failed when calling SecureKeychain.resetGenericPassword with:';
/** General error message for when password reset operation fails */
export const AUTHENTICATION_RESET_PASSWORD_FAILED =
  'Authentication.resetPassword failed';

export const AUTHENTICATION_STORE_PASSWORD_FAILED =
  'Authentication.storePassword failed';

export const AUTHENTICATION_LOGIN_VAULT_CREATION_FAILED =
  'Authentication.loginVaultCreation was unable to recreate vault';

// EngineService
export const VAULT_CREATION_ERROR = 'Error creating the vault';
export const NO_VAULT_IN_BACKUP_ERROR = 'No vault in backup';

// RPCMethodMiddleware
export const TOKEN_NOT_SUPPORTED_FOR_NETWORK =
  'This token is not supported on this network';
export const TOKEN_NOT_VALID = 'This token address os mpt valid';
