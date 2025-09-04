import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../../reducers';

/** Maximum number of RPC request rejections before blocking an origin */
export const NUMBER_OF_REJECTIONS_THRESHOLD = 3;

/** Time window in milliseconds for counting rejections (30 seconds) */
export const REJECTION_THRESHOLD_IN_MS = 30000;

/** Time window in milliseconds for blocking an origin after threshold is reached (60 seconds) */
const BLOCKING_THRESHOLD_IN_MS = 60000;

/**
 * State tracking for a specific origin's RPC request rejections
 * @interface OriginState
 * @property rejections - Number of consecutive rejections within the threshold window
 * @property lastRejection - Timestamp of the most recent rejection
 */
export interface OriginState {
  rejections: number;
  lastRejection: number;
}

/**
 * Redux state for origin throttling functionality
 * @interface OriginThrottlingState
 * @property origins - Map of origin URLs to their rejection state
 */
export interface OriginThrottlingState {
  origins: {
    [key: string]: OriginState;
  };
}

/** Initial state for the origin throttling slice */
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
export const { onRPCRequestRejectedByUser, resetOriginSpamState } = actions;

// Selectors
/**
 * Selects the rejection state for a specific origin
 * @param state - Redux root state
 * @param origin - Origin URL to get state for
 * @returns Origin state or undefined if not found
 */
const selectOriginState = (state: RootState, origin: string) =>
  state[name].origins[origin];

/**
 * Determines if an origin should be blocked from making RPC requests
 * based on recent rejection history
 * @param state - Redux root state
 * @param origin - Origin URL to check
 * @returns True if origin should be blocked, false otherwise
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
