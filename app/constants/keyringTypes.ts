/**
 * Extended keyring types supported by MetaMask Mobile.
 * Defines the different types of key management systems available.
 */
enum ExtendedKeyringTypes {
  /** Simple key pair keyring for basic account management */
  simple = 'Simple Key Pair',
  /** Hierarchical Deterministic key tree for seed phrase based accounts */
  hd = 'HD Key Tree',
  /** QR code based hardware wallet device integration */
  qr = 'QR Hardware Wallet Device',
  /** Ledger hardware wallet device integration */
  ledger = 'Ledger Hardware',
}

export default ExtendedKeyringTypes;

/**
 * Hardware device types supported for wallet integration.
 * Used to identify and manage different hardware wallet connections.
 */
export enum HardwareDeviceTypes {
  /** Ledger hardware wallet devices */
  LEDGER = 'Ledger',
  /** QR code based hardware wallet devices */
  QR = 'QR Hardware',
}
