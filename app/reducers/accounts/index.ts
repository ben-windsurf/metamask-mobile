import { AccountsActionType, iAccountActions } from '../../actions/accounts';

/**
 * Interface for defining what properties will be defined in store
 */
export interface AccountsState {
  reloadAccounts: boolean;
}

/**
 * Initial state of the Accounts event flow
 */
const initialState: AccountsState = {
  reloadAccounts: false,
};

/**
 * Reducer to Account relative event
 * @param {AccountsState} state: the state of the Accounts event flow, default to initialState
 * @param {iAccountActions} action: the action object contain type and payload to change state.
 * @returns {AccountsState}: the new state of the Accounts event flow
 */
const accountReducer = (
  state: AccountsState = initialState,
  action: iAccountActions = {
    type: '',
    reloadAccounts: false,
  },
): AccountsState => {
  switch (action.type) {
    case AccountsActionType.SET_RELOAD_ACCOUNTS:
      return {
        ...state,
        reloadAccounts: action.reloadAccounts,
      };
    default:
      return state;
  }
};
export default accountReducer;
