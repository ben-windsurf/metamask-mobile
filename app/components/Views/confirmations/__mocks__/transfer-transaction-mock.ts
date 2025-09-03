import { merge } from 'lodash';

import { transactionApprovalControllerMock } from './controllers/approval-controller-mock';
import { simpleSendTransactionControllerMock } from './controllers/transaction-controller-mock';
import { otherControllersMock } from './controllers/other-controllers-mock';

/**
 * Mock state object for transfer transaction confirmations in MetaMask Mobile
 * Combines approval controller, transaction controller, and other controller mocks
 * Used for testing transfer transaction confirmation flows and UI components
 */
export const transferTransactionStateMock = merge(
  transactionApprovalControllerMock,
  simpleSendTransactionControllerMock,
  otherControllersMock,
);
