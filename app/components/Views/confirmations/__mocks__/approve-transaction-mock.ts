import { merge } from 'lodash';

import { transactionApprovalControllerMock } from './controllers/approval-controller-mock';
import { emptySignatureControllerMock } from './controllers/signature-controller-mock';
import { otherControllersMock } from './controllers/other-controllers-mock';
import { gasFeeControllerMock } from './controllers/gas-fee-controller-mock';

import {
  approveERC20TransactionControllerMock,
  revokeERC20TransactionControllerMock,
  approveERC721TransactionControllerMock,
  revokeERC721TransactionControllerMock,
  decreaseAllowanceERC20TransactionControllerMock,
  increaseAllowanceERC20TransactionControllerMock,
  approveAllERC721TransactionControllerMock,
  revokeAllERC721TransactionControllerMock,
  approveERC20Permit2TransactionControllerMock,
  revokeERC20Permit2TransactionControllerMock,
} from './controllers/transaction-controller-mock';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createTransactionStateMock = (transactionControllerMock: any) =>
  merge(
    {},
    transactionControllerMock,
    emptySignatureControllerMock,
    transactionApprovalControllerMock,
    otherControllersMock,
    gasFeeControllerMock,
  );

/**
 * Mock state for ERC20 token approval transactions
 * Used in testing confirmation flows for token spending approvals
 */
export const approveERC20TransactionStateMock = createTransactionStateMock(
  approveERC20TransactionControllerMock,
);

/**
 * Mock state for ERC20 token approval revocation transactions
 * Used in testing confirmation flows for removing token spending permissions
 */
export const revokeERC20TransactionStateMock = createTransactionStateMock(
  revokeERC20TransactionControllerMock,
);

/**
 * Mock state for ERC721 NFT approval transactions
 * Used in testing confirmation flows for NFT spending approvals
 */
export const approveERC721TransactionStateMock = createTransactionStateMock(
  approveERC721TransactionControllerMock,
);

/**
 * Mock state for ERC721 NFT approval revocation transactions
 * Used in testing confirmation flows for removing NFT spending permissions
 */
export const revokeERC721TransactionStateMock = createTransactionStateMock(
  revokeERC721TransactionControllerMock,
);

/**
 * Mock state for ERC20 token allowance decrease transactions
 * Used in testing confirmation flows for reducing token spending limits
 */
export const decreaseAllowanceERC20TransactionStateMock =
  createTransactionStateMock(decreaseAllowanceERC20TransactionControllerMock);

/**
 * Mock state for ERC20 token allowance increase transactions
 * Used in testing confirmation flows for increasing token spending limits
 */
export const increaseAllowanceERC20TransactionStateMock =
  createTransactionStateMock(increaseAllowanceERC20TransactionControllerMock);

/**
 * Mock state for ERC721 "approve all" NFT transactions
 * Used in testing confirmation flows for granting permissions to all NFTs in a collection
 */
export const approveAllERC721TransactionStateMock = createTransactionStateMock(
  approveAllERC721TransactionControllerMock,
);

/**
 * Mock state for ERC721 "revoke all" NFT transactions
 * Used in testing confirmation flows for removing permissions from all NFTs in a collection
 */
export const revokeAllERC721TransactionStateMock = createTransactionStateMock(
  revokeAllERC721TransactionControllerMock,
);

export const approveERC20Permit2TransactionStateMock =
  createTransactionStateMock(approveERC20Permit2TransactionControllerMock);

export const revokeERC20Permit2TransactionStateMock =
  createTransactionStateMock(revokeERC20Permit2TransactionControllerMock);
