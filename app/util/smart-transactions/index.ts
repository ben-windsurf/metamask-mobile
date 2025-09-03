import { TransactionMeta } from '@metamask/transaction-controller';
import { Hex } from '@metamask/utils';
import TransactionTypes from '../../core/TransactionTypes';
import {
  getIsSwapApproveTransaction,
  getIsSwapApproveOrSwapTransaction,
  getIsSwapTransaction,
  getIsNativeTokenTransferred,
} from '../transactions';
import SmartTransactionsController from '@metamask/smart-transactions-controller';
import {
  SmartTransaction,
  Fees,
} from '@metamask/smart-transactions-controller/dist/types';
import type { BaseControllerMessenger } from '../../core/Engine';
import { isProduction } from '../environment';

const TIMEOUT_FOR_SMART_TRANSACTION_CONFIRMATION_DONE_EVENT = 10000;

/**
 * Determines the type and characteristics of a transaction
 * @param {TransactionMeta} transactionMeta - The transaction metadata object
 * @param {Hex} chainId - The chain ID where the transaction is being executed
 * @returns {Object} Object containing transaction type flags (isDapp, isSend, isInSwapFlow, etc.)
 */
export const getTransactionType = (
  transactionMeta: TransactionMeta,
  chainId: Hex,
) => {
  // Determine tx type
  // If it isn't a dapp tx, check if it's MM Swaps or Send
  // process.env.MM_FOX_CODE is from MM Swaps
  const isDapp =
    transactionMeta?.origin !== TransactionTypes.MMM &&
    transactionMeta?.origin !== process.env.MM_FOX_CODE;

  const to = transactionMeta.txParams.to?.toLowerCase();
  const data = transactionMeta.txParams.data; // undefined for send txs of gas tokens

  const isSwapApproveOrSwapTransaction = getIsSwapApproveOrSwapTransaction(
    data,
    transactionMeta.origin,
    to,
    chainId,
  );
  const isSwapApproveTx = getIsSwapApproveTransaction(
    data,
    transactionMeta.origin,
    to,
    chainId,
  );
  const isSwapTransaction = getIsSwapTransaction(
    data,
    transactionMeta.origin,
    to,
    chainId,
  );

  const isNativeTokenTransferred = getIsNativeTokenTransferred(
    transactionMeta.txParams,
  );

  const isSend = !isDapp && !isSwapApproveOrSwapTransaction;

  return {
    isDapp,
    isSend,
    isInSwapFlow: isSwapApproveOrSwapTransaction,
    isSwapApproveTx,
    isSwapTransaction,
    isNativeTokenTransferred,
  };
};

// Status modal start, update, and close conditions
// If ERC20 if from token in swap and requires additional allowance, Swap txs are the 2nd in the swap flow, so we don't want to show another status page for that
/**
 * Determines whether to start an approval request for a transaction
 * @param {boolean} isDapp - Whether the transaction originates from a dapp
 * @param {boolean} isSend - Whether this is a send transaction
 * @param {boolean} isSwapApproveTx - Whether this is a swap approval transaction
 * @param {boolean} hasPendingApprovalForSwapApproveTx - Whether there's a pending approval for swap approve tx
 * @param {boolean} mobileReturnTxHashAsap - Whether to return transaction hash immediately on mobile
 * @returns {boolean} True if approval request should be started
 */
export const getShouldStartApprovalRequest = (
  isDapp: boolean,
  isSend: boolean,
  isSwapApproveTx: boolean,
  hasPendingApprovalForSwapApproveTx: boolean,
  mobileReturnTxHashAsap: boolean,
): boolean =>
  !mobileReturnTxHashAsap &&
  (isDapp || isSend || isSwapApproveTx || !hasPendingApprovalForSwapApproveTx);

/**
 * Determines whether to update an existing approval request
 * @param {boolean} isDapp - Whether the transaction originates from a dapp
 * @param {boolean} isSend - Whether this is a send transaction
 * @param {boolean} isSwapTransaction - Whether this is a swap transaction
 * @param {boolean} mobileReturnTxHashAsap - Whether to return transaction hash immediately on mobile
 * @returns {boolean} True if approval request should be updated
 */
export const getShouldUpdateApprovalRequest = (
  isDapp: boolean,
  isSend: boolean,
  isSwapTransaction: boolean,
  mobileReturnTxHashAsap: boolean,
): boolean =>
  !mobileReturnTxHashAsap && (isDapp || isSend || isSwapTransaction);

const waitForSmartTransactionConfirmationDone = (
  controllerMessenger: BaseControllerMessenger,
): Promise<SmartTransaction | undefined> =>
  new Promise((resolve) => {
    controllerMessenger.subscribe(
      'SmartTransactionsController:smartTransactionConfirmationDone',
      async (smartTransaction: SmartTransaction) => {
        resolve(smartTransaction);
      },
    );
    setTimeout(() => {
      resolve(undefined); // In a rare case we don't get the "smartTransactionConfirmationDone" event within 10 seconds, we resolve with undefined to continue.
    }, TIMEOUT_FOR_SMART_TRANSACTION_CONFIRMATION_DONE_EVENT);
  });

/**
 * Retrieves metrics properties for smart transactions
 * @param {SmartTransactionsController} smartTransactionsController - The smart transactions controller instance
 * @param {TransactionMeta | undefined} transactionMeta - The transaction metadata
 * @param {boolean} waitForSmartTransaction - Whether to wait for smart transaction confirmation
 * @param {BaseControllerMessenger} controllerMessenger - Optional controller messenger for event subscription
 * @returns {Promise<Object>} Object containing smart transaction metrics properties
 */
export const getSmartTransactionMetricsProperties = async (
  smartTransactionsController: SmartTransactionsController,
  transactionMeta: TransactionMeta | undefined,
  waitForSmartTransaction: boolean,
  controllerMessenger?: BaseControllerMessenger,
) => {
  if (!transactionMeta) return {};
  let smartTransaction =
    smartTransactionsController.getSmartTransactionByMinedTxHash(
      transactionMeta.hash,
    );
  const shouldWaitForSmartTransactionConfirmationDoneEvent =
    waitForSmartTransaction &&
    !smartTransaction?.statusMetadata && // We get this after polling for a status for a Smart Transaction.
    controllerMessenger;
  if (shouldWaitForSmartTransactionConfirmationDoneEvent) {
    smartTransaction = await waitForSmartTransactionConfirmationDone(
      controllerMessenger,
    );
  }
  if (!smartTransaction?.statusMetadata) {
    return {};
  }
  const { timedOut, proxied } = smartTransaction.statusMetadata;
  return {
    smart_transaction_timed_out: timedOut,
    smart_transaction_proxied: proxied,
  };
};

export type GasIncludedQuote = Fees & { isGasIncludedTrade?: boolean };

// Currently, we take the first token for gas fee payment, but later, a user can choose which token to use for gas payment.
/**
 * Extracts the token fee for trade transactions from a gas-included quote
 * @param {GasIncludedQuote} quote - The quote object containing fee information
 * @returns {Object | undefined} The token fee object for the first token, or undefined if not available
 */
export const getTradeTxTokenFee = (quote: GasIncludedQuote) =>
  // @ts-expect-error Property 'tokenFees' does not exist on type 'Fee'. Need to update the type.
  quote?.tradeTxFees?.fees?.[0]?.tokenFees?.[0];

// We get gas included fees from a swap quote now. In a future iteration we will have a universal
// implementation that works for non-swaps transactions as well.
/**
 * Gets gas-included transaction fees from a swap quote
 * @param {GasIncludedQuote} quote - The quote object containing fee information
 * @returns {Object | undefined} Transaction fees object with approval and trade fees, or undefined if not gas-included
 */
export const getGasIncludedTransactionFees = (quote: GasIncludedQuote) => {
  const tradeTxTokenFee = getTradeTxTokenFee(quote);
  let transactionFees;
  if (tradeTxTokenFee && quote?.isGasIncludedTrade) {
    transactionFees = {
      approvalTxFees: quote?.approvalTxFees,
      tradeTxFees: quote?.tradeTxFees,
    };
  }
  return transactionFees;
};

/**
 * Checks if an RPC URL is allowed for smart transactions
 * @param {string} rpcUrl - The RPC URL to validate
 * @returns {boolean} True if the RPC URL is allowed for smart transactions, false otherwise
 */
export const getIsAllowedRpcUrlForSmartTransactions = (rpcUrl?: string) => {
  // Allow in non-production environments.
  if (!isProduction()) {
    return true;
  }

  const hostname = rpcUrl && new URL(rpcUrl).hostname;

  return (
    hostname?.endsWith('.infura.io') ||
    hostname?.endsWith('.binance.org') ||
    false
  );
};
