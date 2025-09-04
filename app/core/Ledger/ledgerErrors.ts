/**
 * Enumeration of possible communication errors that can occur when interacting with Ledger hardware wallets.
 * These errors represent various failure states during Ledger device communication and transaction processing.
 */
export enum LedgerCommunicationErrors {
  /** Ledger device has been disconnected from the system */
  LedgerDisconnected = 'LedgerDisconnected',
  /** Ledger device has a pending confirmation that must be resolved first */
  LedgerHasPendingConfirmation = 'LedgerHasPendingConfirmation',
  /** Failed to open the required application on the Ledger device */
  FailedToOpenApp = 'FailedToOpenApp',
  /** Failed to close the application on the Ledger device */
  FailedToCloseApp = 'FailedToCloseApp',
  /** User declined to confirm the transaction on the Ledger device */
  UserRefusedConfirmation = 'UserRefusedConfirmation',
  /** Required application is not installed on the Ledger device */
  AppIsNotInstalled = 'AppIsNotInstalled',
  /** Ledger device is locked and requires PIN entry */
  LedgerIsLocked = 'LedgerIsLocked',
  /** Operation is not supported by the current Ledger configuration */
  NotSupported = 'NotSupported',
  /** An unknown error occurred during Ledger communication */
  UnknownError = 'UnknownError',
  /** Transaction nonce is too low for the current account state */
  NonceTooLow = 'NonceTooLow',
  /** Error occurred during blind signing operation */
  BlindSignError = 'BlindSignError',
}

/**
 * Enumeration of Bluetooth permission errors that can occur when attempting to connect to Ledger devices.
 * These errors represent various permission-related failures on mobile platforms.
 */
export enum BluetoothPermissionErrors {
  /** Bluetooth access has been denied by the user or system */
  BluetoothAccessBlocked = 'BluetoothAccessBlocked',
  /** Location access has been denied, which is required for Bluetooth scanning */
  LocationAccessBlocked = 'LocationAccessBlocked',
  /** Nearby devices access has been denied, preventing device discovery */
  NearbyDevicesAccessBlocked = 'NearbyDevicesAccessBlocked',
}
