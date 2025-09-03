import { ApprovalType } from '@metamask/controller-utils';
import { TransactionMeta } from '@metamask/transaction-controller';
import { useSelector } from 'react-redux';

import { selectTransactionMetadataById } from '../../../../../selectors/transactionController';
import { RootState } from '../../../../UI/BasicFunctionality/BasicFunctionalityModal/BasicFunctionalityModal.test';
import useApprovalRequest from '../useApprovalRequest';

/**
 * Custom hook that retrieves transaction metadata for the current approval request
 * Used in confirmation flows to access transaction details and metadata
 * @returns {TransactionMeta | undefined} Transaction metadata object or undefined if not found
 */
export function useTransactionMetadataRequest() {
  const { approvalRequest } = useApprovalRequest();

  const transactionMetadata = useSelector((state: RootState) =>
    selectTransactionMetadataById(state, approvalRequest?.id as string),
  );

  if (
    approvalRequest?.type === ApprovalType.Transaction &&
    !transactionMetadata
  ) {
    return undefined;
  }

  return transactionMetadata as TransactionMeta;
}

/**
 * Custom hook that retrieves transaction metadata for the current approval request
 * Throws an error if transaction metadata is not found, ensuring non-null return
 * @returns {TransactionMeta} Transaction metadata object
 * @throws {Error} When transaction approval request is not found
 */
export function useTransactionMetadataOrThrow() {
  const transactionMetadata = useTransactionMetadataRequest();

  if (!transactionMetadata) {
    throw new Error('Transaction approval request not found');
  }

  return transactionMetadata;
}
