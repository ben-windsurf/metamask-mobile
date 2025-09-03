import { TransactionBatchMeta } from '@metamask/transaction-controller';
import { useSelector } from 'react-redux';

import { selectTransactionBatchMetadataById } from '../../../../../selectors/transactionController';
import { RootState } from '../../../../UI/BasicFunctionality/BasicFunctionalityModal/BasicFunctionalityModal.test';
import useApprovalRequest from '../useApprovalRequest';
import { ApprovalType } from '@metamask/controller-utils';

/**
 * Custom hook that retrieves transaction batch metadata for the current approval request
 * Used in confirmation flows to access batch transaction information and metadata
 * @returns {TransactionBatchMeta | undefined} Transaction batch metadata or undefined if not available
 */
export function useTransactionBatchesMetadata() {
  const { approvalRequest } = useApprovalRequest();

  const transactionBatchMetadata = useSelector((state: RootState) =>
    selectTransactionBatchMetadataById(state, approvalRequest?.id as string),
  );

  if (
    approvalRequest?.type === ApprovalType.TransactionBatch &&
    !transactionBatchMetadata
  ) {
    return undefined;
  }

  return transactionBatchMetadata as TransactionBatchMeta;
}
