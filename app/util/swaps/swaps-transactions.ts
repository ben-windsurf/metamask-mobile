import Engine from '../../core/Engine';
import Logger from '../Logger';

const LOG_PREFIX = 'Swaps Transactions';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SwapsTransaction = Record<string, any>;

/**
 * Adds a new swaps transaction to the TransactionController state
 * @param {string} transactionId - Unique identifier for the transaction
 * @param {SwapsTransaction} data - Transaction data to store
 */
export function addSwapsTransaction(
  transactionId: string,
  data: SwapsTransaction,
) {
  const { TransactionController } = Engine.context;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (TransactionController as any).update((state: SwapsTransaction) => {
    if (!state.swapsTransactions) {
      state.swapsTransactions = {};
    }

    state.swapsTransactions[transactionId] = data;
  });

  Logger.log(LOG_PREFIX, 'Added transaction', transactionId);
}

/**
 * Updates an existing swaps transaction using a callback function
 * @param {string} transactionId - Unique identifier for the transaction to update
 * @param {Function} callback - Function that receives the existing transaction data for modification
 * @throws {Error} If the transaction with the given ID is not found
 */
export function updateSwapsTransaction(
  transactionId: string,
  callback: (transaction: SwapsTransaction) => void,
) {
  const { TransactionController } = Engine.context;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (TransactionController as any).update((state: SwapsTransaction) => {
    const existingData = state.swapsTransactions?.[transactionId];

    if (!existingData) {
      throw new Error(`Swaps transaction not found - ${transactionId}`);
    }

    callback(existingData);
  });

  Logger.log(LOG_PREFIX, 'Updated transaction', transactionId);
}
