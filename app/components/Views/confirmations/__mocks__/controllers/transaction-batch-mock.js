import { ApprovalType } from '@metamask/controller-utils';
import {
  contractInteractionBaseState,
  mockApprovalRequest,
  mockTransaction,
  mockTxId,
} from '../../../../../util/test/confirm-data-helpers';

/**
 * Mock state configuration for stablecoin lending deposit confirmation flows
 * Provides a complete Redux state with transaction batch approval setup for testing
 * confirmation views in the MetaMask Mobile lending feature
 * @type {Object}
 */
export const generateStablecoinLendingDepositConfirmationState = {
  ...contractInteractionBaseState,
  engine: {
    ...contractInteractionBaseState.engine,
    backgroundState: {
      ...contractInteractionBaseState.engine.backgroundState,
      // Set a completely new ApprovalController to reject the approval in
      // stakingConfirmationBaseState
      ApprovalController: {
        pendingApprovals: {
          [mockTxId]: {
            ...mockApprovalRequest,
            type: ApprovalType.TransactionBatch,
            origin: 'metamask',
          },
        },
        pendingApprovalCount: 1,
        approvalFlows: [],
      },
      TransactionController: {
        transactions: [],
        transactionBatches: [
          {
            ...mockTransaction,
            origin: 'metamask',
            from: mockTransaction.txParams.from,
          },
        ],
      },
    },
  },
};
