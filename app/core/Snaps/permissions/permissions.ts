///: BEGIN:ONLY_INCLUDE_IF(preinstalled-snaps,external-snaps)
// TODO: Figure out which permissions should be disabled at this point

/**
 * Snap permissions that are excluded/disabled in MetaMask Mobile
 * Contains permissions that are not supported or temporarily disabled for security reasons
 */
export const ExcludedSnapPermissions = Object.freeze({
  eth_accounts:
    'eth_accounts is disabled. For more information please see https://github.com/MetaMask/snaps/issues/990.',
});

/**
 * Snap endowments that are excluded/disabled in MetaMask Mobile
 * Currently empty but reserved for future endowment restrictions
 */
export const ExcludedSnapEndowments = Object.freeze({});

/**
 * Available endowment permissions for Snaps in MetaMask Mobile
 * Defines the complete set of endowments that Snaps can request to extend their capabilities
 */
export const EndowmentPermissions = Object.freeze({
  'endowment:network-access': 'endowment:network-access',
  'endowment:transaction-insight': 'endowment:transaction-insight',
  'endowment:cronjob': 'endowment:cronjob',
  'endowment:ethereum-provider': 'endowment:ethereum-provider',
  'endowment:rpc': 'endowment:rpc',
  'endowment:webassembly': 'endowment:webassembly',
  'endowment:lifecycle-hooks': 'endowment:lifecycle-hooks',
  'endowment:page-home': 'endowment:page-home',
  'endowment:signature-insight': 'endowment:signature-insight',
  'endowment:name-lookup': 'endowment:name-lookup',
  'endowment:keyring': 'endowment:keyring',
} as const);
///: END:ONLY_INCLUDE_IF
