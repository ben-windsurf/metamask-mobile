import { ApprovalRequest } from '@metamask/approval-controller';
import { ApprovalType } from '@metamask/controller-utils';
import {
  TransactionMeta,
  TransactionType,
} from '@metamask/transaction-controller';
import { FULL_SCREEN_CONFIRMATIONS } from '../../constants/confirmations';
import { useIsInternalConfirmation } from '../transactions/useIsInternalConfirmation';
import { useTransactionMetadataRequest } from '../transactions/useTransactionMetadataRequest';
import useApprovalRequest from '../useApprovalRequest';

const getIsFullScreenConfirmation = (
  approvalRequest: ApprovalRequest<TransactionMeta> | undefined,
  transactionMetadata: TransactionMeta | undefined,
  isWalletInitiated: boolean,
): boolean => {
  if (!isWalletInitiated) {
    return false;
  }

  if (approvalRequest?.type === ApprovalType.Transaction) {
    return FULL_SCREEN_CONFIRMATIONS.includes(
      transactionMetadata?.type as TransactionType,
    );
  }

  if (approvalRequest?.type === ApprovalType.TransactionBatch) {
    return true;
  }

  return false;
};

/**
 * Custom hook that determines whether a confirmation should be displayed in full screen mode
 * Evaluates approval requests and transaction metadata to decide on full screen presentation
 * Used in confirmation flows to provide appropriate UI layout for different transaction types
 * @returns {Object} Object containing isFullScreenConfirmation boolean flag
 */
export const useFullScreenConfirmation = () => {
  const { approvalRequest } = useApprovalRequest();
  const transactionMetadata = useTransactionMetadataRequest();
  const isInternalConfirmation = useIsInternalConfirmation();

  const isFullScreenConfirmation = getIsFullScreenConfirmation(
    approvalRequest,
    transactionMetadata,
    isInternalConfirmation,
  );

  return { isFullScreenConfirmation };
};
