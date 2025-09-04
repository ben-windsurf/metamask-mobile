/** Ledger Live derivation path following BIP44 standard with account and address indices */
export const LEDGER_LIVE_PATH = `m/44'/60'/0'/0/0`;

/** Ledger BIP44 derivation path without the final address index */
export const LEDGER_BIP44_PATH = `m/44'/60'/0'/0`;

/** Legacy Ledger derivation path without change and address indices */
export const LEDGER_LEGACY_PATH = `m/44'/60'/0'`;

/** Display string for Ledger Live derivation method */
export const LEDGER_LIVE_STRING = 'Ledger Live';

/** Display string for Ledger BIP44 derivation method */
export const LEDGER_BIP44_STRING = 'Ledger BIP44';

/** Display string for Ledger Legacy derivation method */
export const LEDGER_LEGACY_STRING = 'Ledger Legacy';

/** Display string for unknown Ledger derivation method */
export const LEDGER_UNKNOWN_STRING = 'unknown';
