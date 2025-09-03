import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../../reducers';

/**
 * Maximum number of RPC request rejections allowed before blocking an origin
 */
export const NUMBER_OF_REJECTIONS_THRESHOLD = 3;

/**
 * Time window in milliseconds for counting rejections (30 seconds)
 */
export const REJECTION_THRESHOLD_IN_MS = 30000;
const BLOCKING_THRESHOLD_IN_MS = 60000;

export interface OriginState {
  rejections: number;
  lastRejection: number;
}

export interface OriginThrottlingState {
  origins: {
    [key: string]: OriginState;
  };
}

/**
 * Initial state for origin throttling Redux slice
 */
export const initialState: OriginThrottlingState = {
  origins: {},
};

const name = 'originThrottling';

const slice = createSlice({
  name,
  initialState,
  reducers: {
    onRPCRequestRejectedByUser(
      state: OriginThrottlingState,
      action: PayloadAction<string>,
    ) {
      const origin = action.payload;
      const currentState = state.origins[origin] || {
        rejections: 0,
        lastRejection: 0,
      };
      const currentTime = Date.now();
      let newRejections = currentState.rejections;

      const isUnderThreshold =
        currentTime - currentState.lastRejection < REJECTION_THRESHOLD_IN_MS;

      newRejections = isUnderThreshold ? newRejections + 1 : 1;

      state.origins[origin] = {
        rejections: newRejections,
        lastRejection: currentTime,
      };
    },
    resetOriginSpamState: (
      state: OriginThrottlingState,
      action: PayloadAction<string>,
    ) => {
      const origin = action.payload;
      delete state.origins[origin];
    },
  },
});

// Actions
const { actions, reducer } = slice;

export default reducer;
/**
 * Redux action creators for origin throttling
 * @property {Function} onRPCRequestRejectedByUser - Records when a user rejects an RPC request from an origin
 * @property {Function} resetOriginSpamState - Clears the throttling state for a specific origin
 */
export const { onRPCRequestRejectedByUser, resetOriginSpamState } = actions;

// Selectors
const selectOriginState = (state: RootState, origin: string) =>
  state[name].origins[origin];

/**
 * Selector to determine if an origin should be blocked from making RPC requests
 * An origin is blocked if it has exceeded the rejection threshold within the blocking time window
 * @param {RootState} state - The Redux root state
 * @param {string} origin - The origin URL to check
 * @returns {boolean} True if the origin should be blocked, false otherwise
 */
export const selectIsOriginBlockedForRPCRequests = (
  state: RootState,
  origin: string,
) => {
  const originState = selectOriginState(state, origin);
  if (!originState) {
    return false;
  }
  const currentTime = Date.now();
  const { rejections, lastRejection } = originState;
  const isWithinOneMinute =
    currentTime - lastRejection <= BLOCKING_THRESHOLD_IN_MS;

  return rejections >= NUMBER_OF_REJECTIONS_THRESHOLD && isWithinOneMinute;
};
