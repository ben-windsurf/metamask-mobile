import { PayloadAction, createSlice } from '@reduxjs/toolkit';

/** Constant indicating that the network ID is currently being loaded */
export const NETWORK_ID_LOADING = 'loading';

/**
 * State interface for the inpage provider Redux slice
 * @interface InpageProviderState
 * @property networkId - The current network ID or loading state
 */
export interface InpageProviderState {
  networkId: string;
}

/** Initial state for the inpage provider slice with network ID set to loading */
export const initialState: InpageProviderState = {
  networkId: NETWORK_ID_LOADING,
};

const name = 'inpageProvider';

const slice = createSlice({
  name,
  initialState,
  reducers: {
    /**
     * Updates the network ID.
     * @param state - The current state of the inpageProvider slice.
     * @param action - An action with the new network ID as payload.
     */
    networkIdUpdated: (state, action: PayloadAction<string>) => {
      state.networkId = action.payload;
    },
    /**
     * Sets the network ID to 'loading' indicating that a network ID update will happen soon.
     * @param state - The current state of the inpageProvider slice.
     */
    networkIdWillUpdate: (state) => {
      state.networkId = NETWORK_ID_LOADING;
    },
  },
});

const { actions, reducer } = slice;

export default reducer;

// Actions / action-creators

export const { networkIdUpdated, networkIdWillUpdate } = actions;
