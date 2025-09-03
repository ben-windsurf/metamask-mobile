/**
 * Ledger Live derivation path for Ethereum accounts
 * Uses the standard BIP44 path with account and address indices
 */
export const LEDGER_LIVE_PATH = `m/44'/60'/0'/0/0`;

/**
 * Ledger BIP44 derivation path for Ethereum accounts
 * Uses the BIP44 standard without the final address index
 */
export const LEDGER_BIP44_PATH = `m/44'/60'/0'/0`;

/**
 * Ledger Legacy derivation path for Ethereum accounts
 * Uses the older derivation path format for backward compatibility
 */
export const LEDGER_LEGACY_PATH = `m/44'/60'/0'`;

/**
 * Display string for Ledger Live derivation path type
 */
export const LEDGER_LIVE_STRING = 'Ledger Live';

/**
 * Display string for Ledger BIP44 derivation path type
 */
export const LEDGER_BIP44_STRING = 'Ledger BIP44';

/**
 * Display string for Ledger Legacy derivation path type
 */
export const LEDGER_LEGACY_STRING = 'Ledger Legacy';

/**
 * Display string for unknown Ledger derivation path type
 */
export const LEDGER_UNKNOWN_STRING = 'unknown';
