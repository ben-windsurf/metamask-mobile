import enContent from '../../../locales/languages/en.json';

/**
 * Text selectors for the Connected Account Modal using localized content.
 * Contains all text-based selectors for UI elements in the connected accounts modal.
 */
export const ConnectedAccountModalSelectorsText = {
  PERMISSION_LINK: enContent.accounts.permissions,
  DISCONNECT_ALL: enContent.accounts.disconnect_all_accounts,
  IMPORTED: enContent.accounts.imported,
  TITLE: enContent.accounts.connected_accounts_title,
  SELECT_ALL: enContent.networks.select_all,
} as const;

/**
 * ID-based selectors for Connected Accounts Modal elements.
 * Contains testID and element ID selectors for automated testing of connected accounts functionality.
 */
export const ConnectedAccountsSelectorsIDs = {
  CONNECT_ACCOUNTS_BUTTON: 'connect-accounts-buttons',
  NETWORK_PICKER: 'accounts-connected-network-picker',
  DISCONNECT_ALL_BUTTON: 'accounts-connected-revoke-button',
  CONTAINER: 'accounts-connected-modal-container',
  DISCONNECT: 'disconnect',
  DISCONNECT_ALL_ACCOUNTS_NETWORKS: 'disconnect_all',
  NAVIGATE_TO_EDIT_NETWORKS_PERMISSIONS_BUTTON:
    'navigate_to_edit_networks_permissions_button',
  SELECT_ALL_NETWORKS_BUTTON: 'select_all',
  DESELECT_ALL_NETWORKS_BUTTON: 'deselect_all',
  DISCONNECT_NETWORKS_BUTTON: 'disconnect',
  CONFIRM_DISCONNECT_NETWORKS_BUTTON: 'confirm_disconnect_networks',
  MANAGE_PERMISSIONS: 'manage_permissions',
  ACCOUNT_LIST_BOTTOM_SHEET: 'account-list-bottom-sheet',
} as const;

/**
 * ID-based selectors for Permissions Summary Modal elements.
 * Contains testID selectors for the permissions summary tab navigation.
 */
export const PermissionsSummarySelectorsIDs = {
  ACCOUNTS_TAB: 'accounts-tab',
  PERMISSIONS_TAB: 'permissions-tab',
} as const;

/**
 * Type definition for ConnectedAccountModalSelectorsText object.
 * Provides type safety for text-based selectors in connected account modal.
 */
export type ConnectedAccountModalSelectorsTextType =
  typeof ConnectedAccountModalSelectorsText;

/**
 * Type definition for ConnectedAccountsSelectorsIDs object.
 * Provides type safety for ID-based selectors in connected accounts functionality.
 */
export type ConnectedAccountsSelectorsIDsType =
  typeof ConnectedAccountsSelectorsIDs;

/**
 * Type definition for PermissionsSummarySelectorsIDs object.
 * Provides type safety for ID-based selectors in permissions summary modal.
 */
export type PermissionsSummarySelectorsIDsType =
  typeof PermissionsSummarySelectorsIDs;
