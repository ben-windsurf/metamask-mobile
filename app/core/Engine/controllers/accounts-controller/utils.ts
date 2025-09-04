import { AccountsControllerState } from '@metamask/accounts-controller';
import Logger from '../../../../util/Logger';
import { defaultAccountsControllerState } from './constants';

/**
 * Logs the creation of AccountsController with information about the initial state.
 * Provides different log messages depending on whether default or custom initial state is used.
 *
 * @param initialState - Optional partial initial state for the AccountsController
 */
export function logAccountsControllerCreation(
  initialState?: Partial<AccountsControllerState>,
) {
  if (!initialState) {
    Logger.log('Creating AccountsController with default state', {
      defaultState: defaultAccountsControllerState,
    });
  } else {
    Logger.log('Creating AccountsController with provided initial state', {
      hasSelectedAccount: !!initialState.internalAccounts?.selectedAccount,
      accountsCount: Object.keys(initialState.internalAccounts?.accounts || {})
        .length,
    });
  }
}
