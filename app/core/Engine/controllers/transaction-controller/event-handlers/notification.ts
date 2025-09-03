import {
  TransactionType,
  TransactionStatus,
  type TransactionMeta,
} from '@metamask/transaction-controller';
import NotificationManager from '../../../../NotificationManager';
import { REDESIGNED_TRANSACTION_TYPES } from '../../../../../components/Views/confirmations/constants/confirmations';

/**
 * Handles showing notifications for transaction status updates in MetaMask Mobile
 * Watches submitted transactions for redesigned transaction types and triggers notifications
 * when transactions are successfully submitted (not failed)
 * @param {TransactionMeta} transactionMeta - The transaction metadata containing status and type information
 */
export function handleShowNotification(transactionMeta: TransactionMeta) {
  const { status } = transactionMeta;
  if (
    REDESIGNED_TRANSACTION_TYPES.includes(
      transactionMeta.type as TransactionType,
    ) &&
    status !== TransactionStatus.failed
  ) {
    NotificationManager.watchSubmittedTransaction(transactionMeta);
  }
}
