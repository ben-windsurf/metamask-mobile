import {
  SnapKeyringAccountAssetListUpdatedEvent as SnapKeyringAccountAssetListUpdatedEventType,
  SnapKeyringAccountBalancesUpdatedEvent as SnapKeyringAccountBalancesUpdatedEventType,
  SnapKeyringAccountTransactionsUpdatedEvent as SnapKeyringAccountTransactionsUpdatedEventType,
} from '@metamask/eth-snap-keyring';

/**
 * Event type constant for Snap Keyring account asset list updates
 * Fired when the asset list for a Snap-managed account is updated
 */
export const SnapKeyringAccountAssetListUpdatedEvent: SnapKeyringAccountAssetListUpdatedEventType['type'] =
  'SnapKeyring:accountAssetListUpdated';

/**
 * Event type constant for Snap Keyring account balance updates
 * Fired when account balances for Snap-managed accounts are updated
 */
export const SnapKeyringAccountBalancesUpdatedEvent: SnapKeyringAccountBalancesUpdatedEventType['type'] =
  'SnapKeyring:accountBalancesUpdated';

/**
 * Event type constant for Snap Keyring account transaction updates
 * Fired when transaction data for Snap-managed accounts is updated
 */
export const SnapKeyringAccountTransactionsUpdatedEvent: SnapKeyringAccountTransactionsUpdatedEventType['type'] =
  'SnapKeyring:accountTransactionsUpdated';
