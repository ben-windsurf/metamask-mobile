import enContent from '../../../locales/languages/en.json';

/**
 * Selector IDs for the Permission Summary Bottom Sheet component used in end-to-end tests.
 * Contains data-testid values for identifying UI elements during automated testing.
 */
export const PermissionSummaryBottomSheetSelectorsIDs = {
  CONTAINER: 'permission-summary-container',
  NETWORK_PERMISSIONS_CONTAINER: 'permission-network-permissions-container',
  ACCOUNT_PERMISSION_CONTAINER: 'permission-summary-account-text',
  BACK_BUTTON: 'permission-summary-back-button',
};

/**
 * Text selectors for the Permission Summary Bottom Sheet component used in end-to-end tests.
 * Contains localized text values for identifying UI elements by their displayed content.
 */
export const PermissionSummaryBottomSheetSelectorsText = {
  CONNECTED_ACCOUNTS_TEXT: enContent.accounts.connected_accounts_title,
  ADD_NETWORK_PERMISSION: enContent.permissions.title_add_network_permission,
  ETHEREUM_MAINNET_LABEL: 'Ethereum Main Network',
  ACCOUNT_ONE_LABEL: 'Connected to  Account 1',
};
