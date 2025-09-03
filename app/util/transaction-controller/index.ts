/**
 * Transaction controller utility functions for managing Ethereum transactions
 * Provides proxy methods and utilities for interacting with the TransactionController
 */
import {
  GasFeeEstimateType,
  TransactionParams,
  TransactionEnvelopeType,
  TransactionController as BaseTransactionController,
} from '@metamask/transaction-controller';
import { Hex } from '@metamask/utils';

import Engine from '../../core/Engine';
import { NetworkClientId } from '@metamask/network-controller';
import { selectBasicFunctionalityEnabled } from '../../selectors/settings';
import { store } from '../../store';

/**
 * Adds a new transaction to the transaction controller
 * @param {TransactionParams} transaction - The transaction parameters
 * @param {Object} opts - Additional options for the transaction
 * @returns {Promise<Object>} The added transaction metadata
 */
export async function addTransaction(
  transaction: TransactionParams,
  opts: Parameters<BaseTransactionController['addTransaction']>[1],
) {
  const { TransactionController } = Engine.context;

  return await TransactionController.addTransaction(transaction, opts);
}

/**
 * Updates atomic batch data for a transaction
 * @param {Object} batchData - The batch data to update
 * @param {string} batchData.transactionId - The transaction ID
 * @param {Hex} batchData.transactionData - The transaction data
 * @param {number} batchData.transactionIndex - The transaction index in the batch
 * @returns {Promise<void>} Promise that resolves when batch data is updated
 */
export async function updateAtomicBatchData(batchData: {
  transactionId: string;
  transactionData: Hex;
  transactionIndex: number;
}) {
  const { TransactionController } = Engine.context;

  return await TransactionController.updateAtomicBatchData(batchData);
}

/**
 * Adds a batch of transactions to the transaction controller
 * @param {...any} args - Arguments passed to the transaction controller's addTransactionBatch method
 * @returns {Promise<Object[]>} Array of added transaction metadata
 */
export async function addTransactionBatch(
  ...args: Parameters<BaseTransactionController['addTransactionBatch']>
) {
  const { TransactionController } = Engine.context;

  return await TransactionController.addTransactionBatch(...args);
}

/**
 * Estimates gas for a transaction
 * @param {TransactionParams} transaction - The transaction parameters
 * @param {NetworkClientId} networkClientId - The network client ID
 * @returns {Promise<string>} The estimated gas amount as a hex string
 */
export async function estimateGas(
  transaction: TransactionParams,
  networkClientId: NetworkClientId,
) {
  const { TransactionController } = Engine.context;
  return await TransactionController.estimateGas(transaction, networkClientId);
}

/**
 * Estimates gas fees for a transaction on a specific chain
 * @param {Object} params - The gas fee estimation parameters
 * @param {TransactionParams} params.transactionParams - The transaction parameters
 * @param {Hex} params.chainId - The chain ID to estimate fees for
 * @returns {Promise<Object>} The estimated gas fee data
 */
export async function estimateGasFee({
  transactionParams,
  chainId,
}: {
  transactionParams: TransactionParams;
  chainId: Hex;
}) {
  const { TransactionController } = Engine.context;

  return await TransactionController.estimateGasFee({
    transactionParams,
    chainId,
  });
}

// Proxy methods
/**
 * Handles method data for a transaction by parsing contract method signatures
 * @param {...any} args - Arguments passed to the transaction controller's handleMethodData method
 * @returns {Promise<Object>} The parsed method data including method name and parameters
 */
export function handleMethodData(
  ...args: Parameters<BaseTransactionController['handleMethodData']>
) {
  const { TransactionController } = Engine.context;
  return TransactionController.handleMethodData(...args);
}

/**
 * Acquires a nonce lock to prevent nonce conflicts during transaction creation
 * @param {...any} args - Arguments passed to the transaction controller's getNonceLock method
 * @returns {Promise<Object>} Object containing nextNonce and releaseLock function
 */
export function getNonceLock(
  ...args: Parameters<BaseTransactionController['getNonceLock']>
) {
  const { TransactionController } = Engine.context;
  return TransactionController.getNonceLock(...args);
}

/**
 * Creates a new transaction with higher gas fees to speed up an existing pending transaction
 * @param {...any} args - Arguments passed to the transaction controller's speedUpTransaction method
 * @returns {Promise<Object>} The new speed-up transaction metadata
 */
export function speedUpTransaction(
  ...args: Parameters<BaseTransactionController['speedUpTransaction']>
) {
  const { TransactionController } = Engine.context;
  return TransactionController.speedUpTransaction(...args);
}

/**
 * Starts polling for incoming transactions if basic functionality is enabled
 * @returns {void|Promise<void>} Starts the polling process or returns undefined if disabled
 */
export function startIncomingTransactionPolling() {
  const isBasicFunctionalityToggleEnabled = selectBasicFunctionalityEnabled(
    store.getState(),
  );

  if (isBasicFunctionalityToggleEnabled) {
    const { TransactionController } = Engine.context;
    return TransactionController.startIncomingTransactionPolling();
  }
}

export function stopIncomingTransactionPolling() {
  const { TransactionController } = Engine.context;
  return TransactionController.stopIncomingTransactionPolling();
}

export function updateIncomingTransactions() {
  const isBasicFunctionalityToggleEnabled = selectBasicFunctionalityEnabled(
    store.getState(),
  );

  if (isBasicFunctionalityToggleEnabled) {
    const { TransactionController } = Engine.context;
    return TransactionController.updateIncomingTransactions();
  }
}

export function updateSecurityAlertResponse(
  ...args: Parameters<BaseTransactionController['updateSecurityAlertResponse']>
) {
  const { TransactionController } = Engine.context;
  return TransactionController.updateSecurityAlertResponse(...args);
}

export function updateTransaction(
  ...args: Parameters<BaseTransactionController['updateTransaction']>
) {
  const { TransactionController } = Engine.context;
  const { txParams, id } = args[0];

  // This is a temporary fix to ensure legacy transaction confirmations does not override expected gas properties
  // Once redesign is complete, this can be removed
  sanitizeTransactionParamsGasValues(id, txParams);

  return TransactionController.updateTransaction(...args);
}

export function wipeTransactions(
  ...args: Parameters<BaseTransactionController['wipeTransactions']>
) {
  const { TransactionController } = Engine.context;
  return TransactionController.wipeTransactions(...args);
}

export function updateEditableParams(
  ...args: Parameters<BaseTransactionController['updateEditableParams']>
) {
  const { TransactionController } = Engine.context;
  const id = args[0];
  const txParams = args[1];

  // This is a temporary fix to ensure legacy transaction confirmations does not override expected gas properties
  // Once redesign is complete, this can be removed
  sanitizeTransactionParamsGasValues(id, txParams);

  return TransactionController.updateEditableParams(...args);
}

export function updateTransactionGasFees(
  ...args: Parameters<BaseTransactionController['updateTransactionGasFees']>
) {
  const { TransactionController } = Engine.context;
  return TransactionController.updateTransactionGasFees(...args);
}

export const getNetworkNonce = async (
  { from }: { from: string },
  networkClientId: NetworkClientId,
) => {
  const { nextNonce, releaseLock } = await getNonceLock(from, networkClientId);

  releaseLock();

  return nextNonce;
};

function sanitizeTransactionParamsGasValues(
  transactionId: string,
  requestedTransactionParamsToUpdate: Partial<TransactionParams>,
) {
  const { TransactionController } = Engine.context;

  const transactionMeta = TransactionController?.getTransactions({
    searchCriteria: { id: transactionId },
  })?.[0];

  if (!transactionMeta || !requestedTransactionParamsToUpdate) {
    return;
  }

  const envelopeType = transactionMeta.txParams.type;

  if (envelopeType === TransactionEnvelopeType.legacy) {
    requestedTransactionParamsToUpdate.type = TransactionEnvelopeType.legacy;
    delete requestedTransactionParamsToUpdate.maxFeePerGas;
    delete requestedTransactionParamsToUpdate.maxPriorityFeePerGas;
  } else if (envelopeType === TransactionEnvelopeType.feeMarket) {
    requestedTransactionParamsToUpdate.type = TransactionEnvelopeType.feeMarket;
    if (
      transactionMeta?.gasFeeEstimates?.type === GasFeeEstimateType.GasPrice
    ) {
      // Try picking 1559 gas properties in order to ensure legacy transaction confirmations is setting expected gas properties
      // 1. Requested change
      // 2. Existing txParams
      // 3. Existing gasFeeEstimates
      requestedTransactionParamsToUpdate.maxFeePerGas =
        requestedTransactionParamsToUpdate?.maxFeePerGas ||
        transactionMeta?.txParams?.maxFeePerGas ||
        transactionMeta?.gasFeeEstimates?.gasPrice;
      requestedTransactionParamsToUpdate.maxPriorityFeePerGas =
        requestedTransactionParamsToUpdate?.maxPriorityFeePerGas ||
        transactionMeta?.txParams?.maxPriorityFeePerGas ||
        transactionMeta?.gasFeeEstimates?.gasPrice;
    }
    delete requestedTransactionParamsToUpdate.gasPrice;
  }
}
