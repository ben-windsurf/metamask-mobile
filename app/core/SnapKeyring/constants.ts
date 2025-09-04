import {
  SnapKeyringAccountAssetListUpdatedEvent as SnapKeyringAccountAssetListUpdatedEventType,
  SnapKeyringAccountBalancesUpdatedEvent as SnapKeyringAccountBalancesUpdatedEventType,
  SnapKeyringAccountTransactionsUpdatedEvent as SnapKeyringAccountTransactionsUpdatedEventType,
} from '@metamask/eth-snap-keyring';

// Events

/**
 * Event type constant for when a Snap keyring account's asset list is updated.
 * Used to notify listeners when the list of assets for a Snap-managed account changes.
 */
export const SnapKeyringAccountAssetListUpdatedEvent: SnapKeyringAccountAssetListUpdatedEventType['type'] =
  'SnapKeyring:accountAssetListUpdated';

/**
 * Event type constant for when a Snap keyring account's balances are updated.
 * Used to notify listeners when the balance information for a Snap-managed account changes.
 */
export const SnapKeyringAccountBalancesUpdatedEvent: SnapKeyringAccountBalancesUpdatedEventType['type'] =
  'SnapKeyring:accountBalancesUpdated';

/**
 * Event type constant for when a Snap keyring account's transactions are updated.
 * Used to notify listeners when the transaction history for a Snap-managed account changes.
 */
export const SnapKeyringAccountTransactionsUpdatedEvent: SnapKeyringAccountTransactionsUpdatedEventType['type'] =
  'SnapKeyring:accountTransactionsUpdated';
