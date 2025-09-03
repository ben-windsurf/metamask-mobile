import { merge } from 'lodash';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../../reducers';
import { createSelector } from 'reselect';
import { Hex } from '@metamask/utils';
import { TransactionBridgeQuote } from '../../../../components/Views/confirmations/utils/bridge';

export interface ConfirmationMetrics {
  properties?: Record<string, unknown>;
  sensitiveProperties?: Record<string, unknown>;
}

export interface TransactionPayToken {
  address: Hex;
  chainId: Hex;
}

export interface ConfirmationMetricsState {
  metricsById: Record<string, ConfirmationMetrics>;
  transactionPayTokenById: Record<string, TransactionPayToken>;
  transactionBridgeQuotesById: Record<
    string,
    TransactionBridgeQuote[] | undefined
  >;
}

/**
 * Initial state for confirmation metrics Redux slice
 * Contains empty objects for storing metrics, pay tokens, and bridge quotes by ID
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

/**
 * Redux actions for managing confirmation metrics
 * Includes actions for updating metrics, setting pay tokens, and managing bridge quotes
 */
export const {
  updateConfirmationMetric,
  setTransactionPayToken,
  setTransactionBridgeQuotes,
} = actions;

/**
 * Selector to get all confirmation metrics from Redux state
 * @param {RootState} state - The Redux root state
 * @returns {Record<string, ConfirmationMetrics>} Object containing all metrics by ID
 */
export const selectConfirmationMetrics = (state: RootState) =>
  state[name].metricsById;

/**
 * Selector to get transaction pay token by transaction ID
 * @param {RootState} state - The Redux root state
 * @param {string} id - The transaction ID
 * @returns {TransactionPayToken | undefined} The pay token for the transaction
 */
export const selectTransactionPayToken = (state: RootState, id: string) =>
  state[name].transactionPayTokenById[id];

/**
 * Memoized selector to get confirmation metrics by ID
 * Uses reselect for performance optimization
 * @param {RootState} state - The Redux root state
 * @param {string} id - The confirmation ID
 * @returns {ConfirmationMetrics | undefined} The metrics for the specified confirmation
 */
export const selectConfirmationMetricsById = createSelector(
  [selectConfirmationMetrics, (_: RootState, id: string) => id],
  (metricsById, id) => metricsById[id],
);

/**
 * Memoized selector to get bridge quotes by transaction ID
 * Uses reselect for performance optimization
 * @param {RootState} state - The Redux root state
 * @param {string} transactionId - The transaction ID
 * @returns {TransactionBridgeQuote[] | undefined} The bridge quotes for the transaction
 */
export const selectTransactionBridgeQuotesById = createSelector(
  (state: RootState) => state[name].transactionBridgeQuotesById,
  (_: RootState, transactionId: string) => transactionId,
  (transactionBridgeQuotesById, transactionId) =>
    transactionBridgeQuotesById[transactionId],
);
