import { TransactionType } from '@metamask/transaction-controller';

import { ApprovalTypes } from '../../../../core/RPCMethods/RPCMethodMiddleware';

/**
 * Threshold value for determining unlimited token approvals
 * Used to identify when a token approval amount should be considered "unlimited"
 */
export const TOKEN_VALUE_UNLIMITED_THRESHOLD = 10 ** 15;

/**
 * Determines if a request type is a signature request
 * Used in confirmation flows to identify signature-based operations
 * @param {string} requestType - The type of request to check
 * @returns {boolean} True if the request is a signature request, false otherwise
 */
export function isSignatureRequest(requestType: string) {
  return [
    ApprovalTypes.PERSONAL_SIGN,
    ApprovalTypes.ETH_SIGN_TYPED_DATA,
  ].includes(requestType as ApprovalTypes);
}

/**
 * Determines if a request type is a staking confirmation
 * Used in confirmation flows to identify staking-related transactions
 * @param {string} requestType - The type of request to check
 * @returns {boolean} True if the request is a staking confirmation, false otherwise
 */
export function isStakingConfirmation(requestType: string) {
  return [
    TransactionType.stakingDeposit,
    TransactionType.stakingUnstake,
    TransactionType.stakingClaim,
  ].includes(requestType as TransactionType);
}
