import { merge } from 'lodash';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../../reducers';
import { createSelector } from 'reselect';
import { Hex } from '@metamask/utils';
import { TransactionBridgeQuote } from '../../../../components/Views/confirmations/utils/bridge';

/**
 * Metrics data structure for confirmation flows.
 * Contains both regular and sensitive properties for analytics tracking.
 */
export interface ConfirmationMetrics {
  /** General properties for metrics tracking */
  properties?: Record<string, unknown>;
  /** Sensitive properties that require special handling */
  sensitiveProperties?: Record<string, unknown>;
}

/**
 * Token information used for transaction payments.
 */
export interface TransactionPayToken {
  /** Token contract address */
  address: Hex;
  /** Chain ID where the token exists */
  chainId: Hex;
}

/**
 * Redux state structure for confirmation metrics tracking.
 * Stores metrics, payment tokens, and bridge quotes indexed by transaction ID.
 */
export interface ConfirmationMetricsState {
  /** Metrics data indexed by transaction ID */
  metricsById: Record<string, ConfirmationMetrics>;
  /** Payment token information indexed by transaction ID */
  transactionPayTokenById: Record<string, TransactionPayToken>;
  /** Bridge quotes indexed by transaction ID */
  transactionBridgeQuotesById: Record<
    string,
    TransactionBridgeQuote[] | undefined
  >;
}

/**
 * Initial state for the confirmation metrics slice.
 */
export const initialState: ConfirmationMetricsState = {
  metricsById: {},
  transactionPayTokenById: {},
  transactionBridgeQuotesById: {},
};

const name = 'confirmationMetrics';

const slice = createSlice({
  name,
  initialState,
  reducers: {
    updateConfirmationMetric: (
      state,
      action: PayloadAction<{
        id: string;
        params: ConfirmationMetrics;
      }>,
    ) => {
      const { id, params } = action.payload;

      if (state.metricsById[id] === undefined) {
        state.metricsById[id] = {
          properties: {},
          sensitiveProperties: {},
        };
      }

      state.metricsById[id] = merge(state.metricsById[id], params);
    },

    setTransactionPayToken: (
      state,
      action: PayloadAction<{
        transactionId: string;
        payToken: TransactionPayToken;
      }>,
    ) => {
      const { transactionId, payToken } = action.payload;
      state.transactionPayTokenById[transactionId] = payToken;
    },

    setTransactionBridgeQuotes: (
      state,
      action: PayloadAction<{
        transactionId: string;
        quotes: TransactionBridgeQuote[] | undefined;
      }>,
    ) => {
      const { transactionId, quotes } = action.payload;
      state.transactionBridgeQuotesById[transactionId] = quotes;
    },
  },
});

const { actions, reducer } = slice;

export default reducer;

// Actions
export const {
  updateConfirmationMetric,
  setTransactionPayToken,
  setTransactionBridgeQuotes,
} = actions;

// Selectors
/**
 * Selects all confirmation metrics from the Redux state.
 * @param state - The root Redux state
 * @returns Record of metrics indexed by ID
 */
export const selectConfirmationMetrics = (state: RootState) =>
  state[name].metricsById;

/**
 * Selects the payment token for a specific transaction.
 * @param state - The root Redux state
 * @param id - The transaction ID
 * @returns The payment token information or undefined
 */
export const selectTransactionPayToken = (state: RootState, id: string) =>
  state[name].transactionPayTokenById[id];

/**
 * Memoized selector for confirmation metrics by ID.
 * @param state - The root Redux state
 * @param id - The transaction ID
 * @returns The confirmation metrics for the specified ID
 */
export const selectConfirmationMetricsById = createSelector(
  [selectConfirmationMetrics, (_: RootState, id: string) => id],
  (metricsById, id) => metricsById[id],
);

export const selectTransactionBridgeQuotesById = createSelector(
  (state: RootState) => state[name].transactionBridgeQuotesById,
  (_: RootState, transactionId: string) => transactionId,
  (transactionBridgeQuotesById, transactionId) =>
    transactionBridgeQuotesById[transactionId],
);
