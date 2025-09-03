import type { AccountsControllerState } from '@metamask/accounts-controller';

/**
 * Default state configuration for the AccountsController
 * Provides the initial state structure with empty accounts and no selected account
 * Used during controller initialization and state migrations
 * @type {AccountsControllerState}
 */
export const defaultAccountsControllerState: AccountsControllerState = {
  internalAccounts: {
    accounts: {},
    selectedAccount: '',
  },
};
