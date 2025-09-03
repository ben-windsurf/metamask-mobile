import { ORIGIN_METAMASK } from '@metamask/controller-utils';
import {
  TransactionMeta,
  TransactionType,
} from '@metamask/transaction-controller';

/**
 * Determines if a transaction is a bridge transaction
 * Checks if the transaction originated from MetaMask and is of bridge or bridge approval type
 * @param {TransactionMeta} txMeta - The transaction metadata object
 * @returns {boolean} True if the transaction is a bridge transaction, false otherwise
 */
export const getIsBridgeTransaction = (txMeta: TransactionMeta) => {
  const { origin } = txMeta;

  return (
    origin === ORIGIN_METAMASK &&
    (txMeta.type === TransactionType.bridgeApproval ||
      txMeta.type === TransactionType.bridge)
  );
};
