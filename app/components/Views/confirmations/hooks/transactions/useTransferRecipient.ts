import { TransactionType } from '@metamask/transaction-controller';
import { parseStandardTokenTransactionData } from '../../utils/transaction';
import { useTransactionMetadataRequest } from './useTransactionMetadataRequest';

/**
 * Custom hook that determines the recipient address for a transfer transaction
 * Handles both simple sends and token transfers by parsing transaction data
 * @returns {string | null} The recipient address or null if no transaction metadata is available
 */
export function useTransferRecipient() {
  const transactionMetadata = useTransactionMetadataRequest();
  const transactionData = parseStandardTokenTransactionData(
    transactionMetadata?.txParams?.data,
  );

  if (!transactionMetadata) {
    return null;
  }

  const { type, txParams } = transactionMetadata;
  const { to: transactionTo } = txParams;

  const transferTo =
    transactionData?.args?._to || transactionData?.args?.to || transactionTo;

  return type === TransactionType.simpleSend ? transactionTo : transferTo;
}
