/**
 * Caveat types used in permission system to restrict certain behaviors.
 * These caveats can be applied to permissions to limit their scope.
 */
export const CaveatTypes = Object.freeze({
  restrictReturnedAccounts: 'restrictReturnedAccounts',
  restrictNetworkSwitching: 'restrictNetworkSwitching',
});

/**
 * Restricted methods that require explicit permission from users.
 * These methods are gated behind the permission system and cannot be called
 * without proper authorization.
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
