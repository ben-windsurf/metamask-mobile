/**
 * 4-byte function selectors for various approval-related smart contract methods
 * Used to identify and handle different types of token approval transactions in confirmations
 */
export const APPROVAL_4BYTE_SELECTORS = {
  APPROVE: '0x095ea7b3',
  ERC20_INCREASE_ALLOWANCE: '0x39509351',
  ERC20_DECREASE_ALLOWANCE: '0xa457c2d7',
  SET_APPROVAL_FOR_ALL: '0xa22cb465',
  PERMIT2_APPROVE: '0x87517c45',
};

/**
 * Constant representing zero amount for token approvals
 * Used to revoke token allowances by setting approval amount to zero
 */
export const ZERO_AMOUNT = '0';

/**
 * Threshold value for determining unlimited token approvals
 * Values above this threshold are considered "unlimited" approvals in the UI
 */
export const TOKEN_VALUE_UNLIMITED_THRESHOLD = 10 ** 15;
