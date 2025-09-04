import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { isEqual } from 'lodash';

/**
 * Constant representing the loading state when refetching account states.
 */
export const REFECHING_ACCOUNTS_STATES = 'loading';

/**
 * Interface representing the state of notifications for different accounts.
 * Maps account addresses to their notification enabled status.
 */
export interface NotificationsAccountsState {
  /** Account address mapped to notification enabled status */
  [address: string]: boolean;
}

/**
 * Initial state for the notifications accounts provider slice.
 */
export const initialState: NotificationsAccountsState = {};

const name = 'notificationsAccountsProvider';

const slice = createSlice({
  name,
  initialState,
  reducers: {
    /**
     * Updates the local accounts state based on external notifications source.
     * @param state - The current state of the notificationsAccountsProvider slice.
     * @param action - An action with the new accounts states as payload.
     */

    updateAccountState: (
      state,
      action: PayloadAction<NotificationsAccountsState>,
    ) => {
      // Check if the payload is not an empty object
      if (Object.keys(action.payload).length > 0) {
        // Only update if there are differences
        if (!isEqual(state, action.payload)) {
          return { ...state, ...action.payload };
        }
      }
      return state;
    },
  },
});

const { actions, reducer } = slice;

export default reducer;

export const { updateAccountState } = actions;
