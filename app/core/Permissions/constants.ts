/**
 * Caveat types used in MetaMask permission system to restrict dApp capabilities
 * Caveats are conditions that limit the scope of granted permissions
 */
export const CaveatTypes = Object.freeze({
  restrictReturnedAccounts: 'restrictReturnedAccounts',
  restrictNetworkSwitching: 'restrictNetworkSwitching',
});

/**
 * Restricted methods that require explicit user permission in MetaMask
 * These methods are gated behind the permission system and cannot be called without user consent
 */
export const RestrictedMethods = Object.freeze({
  eth_accounts: 'eth_accounts',
  ///: BEGIN:ONLY_INCLUDE_IF(preinstalled-snaps,external-snaps)
  // Snap Specific Restricted Methods
  snap_notify: 'snap_notify',
  snap_dialog: 'snap_dialog',
  snap_manageState: 'snap_manageState',
  snap_getBip32PublicKey: 'snap_getBip32PublicKey',
  snap_getBip32Entropy: 'snap_getBip32Entropy',
  snap_getBip44Entropy: 'snap_getBip44Entropy',
  snap_getEntropy: 'snap_getEntropy',
  wallet_snap: 'wallet_snap',
  ///: END:ONLY_INCLUDE_IF
});
