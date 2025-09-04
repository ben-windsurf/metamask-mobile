import type { AccountsControllerState } from '@metamask/accounts-controller';

/**
 * Default state configuration for the AccountsController.
 * Provides initial empty state with no accounts and no selected account.
 */
export const defaultAccountsControllerState: AccountsControllerState = {
  internalAccounts: {
    accounts: {},
    selectedAccount: '',
  },
};
