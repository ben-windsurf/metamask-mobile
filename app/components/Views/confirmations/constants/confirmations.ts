import { ApprovalType } from '@metamask/controller-utils';
import { TransactionType } from '@metamask/transaction-controller';

/**
 * Origin identifier for MetaMask core application
 * Used to identify requests originating from the main MetaMask application
 */
export const MMM_ORIGIN = 'metamask';
/**
 * Origin identifier for MetaMask Mobile application
 * Used to identify requests originating from the mobile application
 */
export const MM_MOBILE_ORIGIN = 'Metamask Mobile';

/**
 * Array of signature approval types that use the redesigned confirmation UI
 * Includes typed data signing and personal message signing flows
 */
export const REDESIGNED_SIGNATURE_TYPES = [
  ApprovalType.EthSignTypedData,
  ApprovalType.PersonalSign,
];

/**
 * Array of transaction types that use the redesigned confirmation UI
 * Includes various transaction types like contract interactions, token operations, and staking
 */
export const REDESIGNED_TRANSACTION_TYPES = [
  TransactionType.batch,
  TransactionType.contractInteraction,
  TransactionType.deployContract,
  TransactionType.lendingDeposit,
  TransactionType.lendingWithdraw,
  TransactionType.revokeDelegation,
  TransactionType.simpleSend,
  TransactionType.stakingClaim,
  TransactionType.stakingDeposit,
  TransactionType.stakingUnstake,
  TransactionType.tokenMethodApprove,
  TransactionType.tokenMethodIncreaseAllowance,
  TransactionType.tokenMethodSetApprovalForAll,
  TransactionType.tokenMethodTransfer,
  TransactionType.tokenMethodTransferFrom,
];

/**
 * Array of approval transaction types that use the redesigned confirmation UI
 * Includes token approval, allowance increase, and approval for all operations
 */
export const REDESIGNED_APPROVE_TYPES = [
  TransactionType.tokenMethodApprove,
  TransactionType.tokenMethodIncreaseAllowance,
  TransactionType.tokenMethodSetApprovalForAll,
];

/**
 * Array of transfer transaction types that use the redesigned confirmation UI
 * Includes simple sends and token transfer operations
 */
export const REDESIGNED_TRANSFER_TYPES = [
  TransactionType.simpleSend,
  TransactionType.tokenMethodTransfer,
  TransactionType.tokenMethodTransferFrom,
];

/**
 * Array of contract interaction transaction types that use the redesigned confirmation UI
 * Includes general contract interactions and DeFi lending operations
 */
export const REDESIGNED_CONTRACT_INTERACTION_TYPES = [
  TransactionType.contractInteraction,
  TransactionType.lendingDeposit,
  TransactionType.lendingWithdraw,
];

/**
 * Array of transaction types that require full-screen confirmation UI
 * Includes high-impact transactions like staking, transfers, and token operations
 */
export const FULL_SCREEN_CONFIRMATIONS = [
  TransactionType.simpleSend,
  TransactionType.stakingClaim,
  TransactionType.stakingDeposit,
  TransactionType.stakingUnstake,
  TransactionType.tokenMethodTransfer,
  TransactionType.tokenMethodTransferFrom,
];

/**
 * Array of transaction types related to earning/lending contract interactions
 * Includes deposit and withdrawal operations for DeFi lending protocols
 */
export const EARN_CONTRACT_INTERACTION_TYPES = [
  TransactionType.lendingDeposit,
  TransactionType.lendingWithdraw,
];
