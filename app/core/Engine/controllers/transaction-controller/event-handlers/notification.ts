import {
  TransactionType,
  TransactionStatus,
  type TransactionMeta,
} from '@metamask/transaction-controller';
import NotificationManager from '../../../../NotificationManager';
import { REDESIGNED_TRANSACTION_TYPES } from '../../../../../components/Views/confirmations/constants/confirmations';

/**
 * Handles showing notifications for submitted transactions.
 * Only shows notifications for redesigned transaction types that haven't failed.
 *
 * @param transactionMeta - The transaction metadata containing status and type information
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
