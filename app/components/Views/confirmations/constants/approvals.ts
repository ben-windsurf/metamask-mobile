/**
 * Legacy function signature for standard ERC-20 token approval
 * Used to identify and validate approval transactions in confirmations
 */
export const SIGNATURE_LEGACY = 'function approve(address,uint256)';

/**
 * Permit2 function signature for advanced token approval with expiration
 * Used for identifying Permit2-based approval transactions in confirmations
 */
export const SIGNATURE_PERMIT2 =
  'function approve(address,address,uint160,uint48)';

/**
 * Function signature for increasing token allowance
 * Used to identify increaseAllowance transactions in confirmations
 */
export const SIGNATURE_INCREASE_ALLOWANCE =
  'function increaseAllowance(address,uint256)';

/**
 * Object mapping approval method names to their string identifiers
 * Used for categorizing different types of approval transactions in confirmations
 */
export const APPROVAL_TYPES = {
  approve: 'approve',
  increaseAllowance: 'increaseAllowance',
  setApprovalForAll: 'setApprovalForAll',
};

/**
 * Array of all supported approval transaction types
 * Used for validation and filtering of approval transactions in confirmations
 */
export const APPROVALS_LIST = [
  APPROVAL_TYPES.approve,
  APPROVAL_TYPES.increaseAllowance,
  APPROVAL_TYPES.setApprovalForAll,
];
