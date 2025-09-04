import BN from 'bnjs4';
import TransactionTypes from '../core/TransactionTypes';
import { ORIGIN_METAMASK } from '@metamask/controller-utils';

/** Transaction status indicating the transaction is waiting for user approval */
export const TX_UNAPPROVED = 'unapproved';

/** Transaction status indicating the transaction has been submitted to the network */
export const TX_SUBMITTED = 'submitted';

/** Transaction status indicating the transaction has been signed but not yet submitted */
export const TX_SIGNED = 'signed';

/** Transaction status indicating the transaction is pending confirmation on the network */
export const TX_PENDING = 'pending';

/** Transaction status indicating the transaction has been confirmed on the network */
export const TX_CONFIRMED = 'confirmed';

/** Transaction status indicating the transaction has been cancelled by the user */
export const TX_CANCELLED = 'cancelled';

/** Transaction status indicating the transaction has been approved by the user */
export const TX_APPROVED = 'approved';

/** Transaction status indicating the transaction has failed */
export const TX_FAILED = 'failed';

/** Transaction status indicating the transaction has been rejected by the user */
export const TX_REJECTED = 'rejected';

/** Maximum value for a 256-bit unsigned integer as a BigNumber */
export const UINT256_BN_MAX_VALUE = new BN(2).pow(new BN(256)).sub(new BN(1));

/** Maximum value for a 256-bit unsigned integer as a hexadecimal string */
export const UINT256_HEX_MAX_VALUE =
  'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

/**
 * Empty Ethereum address (all zeros)
 * @see https://github.com/ethjs/ethjs-ens/blob/8ea29591ae545a5da243b0f071b5676ff95aa647/index.js#L13
 */
export const EMPTY_ADDRESS = '0x0000000000000000000000000000000000000000';

/** Standard prefix for hexadecimal strings in Ethereum */
export const PREFIX_HEX_STRING = '0x';

/** Array of internal origins that are considered trusted within the MetaMask ecosystem */
export const INTERNAL_ORIGINS = [
  process.env.MM_FOX_CODE,
  TransactionTypes.MMM,
  ORIGIN_METAMASK,
];

/**
 * Error codes defined in EIP-5792 for wallet capabilities and bundle operations
 * @see https://eips.ethereum.org/EIPS/eip-5792
 */
export enum EIP5792ErrorCode {
  /** Error code for unsupported non-optional capability */
  UnsupportedNonOptionalCapability = 5700,
  /** Error code for unsupported chain ID */
  UnsupportedChainId = 5710,
  /** Error code for unknown bundle ID */
  UnknownBundleId = 5730,
  /** Error code for rejected upgrade */
  RejectedUpgrade = 5750,
}
