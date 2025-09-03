import { MMM_ORIGIN } from '../../constants/confirmations';
import { useTransactionBatchesMetadata } from './useTransactionBatchesMetadata';
import { useTransactionMetadataRequest } from './useTransactionMetadataRequest';

/**
 * Custom hook that determines if a confirmation request is internal to MetaMask Mobile
 * Checks both transaction metadata and batch metadata to identify internal confirmations
 * @returns {boolean} True if the confirmation originates from MetaMask Mobile, false otherwise
 */
export const useIsInternalConfirmation = () => {
  const transactionMetadata = useTransactionMetadataRequest();
  const transactionBatchesMetadata = useTransactionBatchesMetadata();

  const isInternalConfirmation =
    transactionMetadata?.origin === MMM_ORIGIN ||
    transactionBatchesMetadata?.origin === MMM_ORIGIN;

  return isInternalConfirmation;
};
