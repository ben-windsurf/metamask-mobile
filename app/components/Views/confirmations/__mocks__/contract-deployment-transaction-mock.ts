import { merge } from 'lodash';

import { transactionApprovalControllerMock } from './controllers/approval-controller-mock';
import { erc20ContractDeploymentTransactionControllerMock } from './controllers/transaction-controller-mock';
import { emptySignatureControllerMock } from './controllers/signature-controller-mock';
import { otherControllersMock } from './controllers/other-controllers-mock';
import { gasFeeControllerMock } from './controllers/gas-fee-controller-mock';

/**
 * Mock state object for contract deployment transaction confirmations
 * Combines multiple controller mocks to create a complete state for testing contract deployment flows
 * Used in confirmation view tests to simulate the application state during contract deployment
 */
export const contractDeploymentTransactionStateMock = merge(
  {},
  emptySignatureControllerMock,
  erc20ContractDeploymentTransactionControllerMock,
  transactionApprovalControllerMock,
  otherControllersMock,
  gasFeeControllerMock,
);
