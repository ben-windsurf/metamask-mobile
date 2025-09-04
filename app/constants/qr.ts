/**
 * Supported Uniform Resource (UR) types for QR code scanning and generation.
 * These constants define the standardized UR type identifiers used in cryptocurrency
 * hardware wallet interactions and QR code-based data exchange.
 */
export const SUPPORTED_UR_TYPE = {
  /** Hierarchical Deterministic key type for wallet key derivation */
  CRYPTO_HDKEY: 'crypto-hdkey',
  /** Cryptocurrency account information type */
  CRYPTO_ACCOUNT: 'crypto-account',
  /** Ethereum signature data type */
  ETH_SIGNATURE: 'eth-signature',
};
