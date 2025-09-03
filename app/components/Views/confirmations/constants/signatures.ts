/**
 * The contents of this file have been taken verbatim from
 * metamask-extension/shared/constants/signatures.ts
 *
 * If updating, please be mindful of this or delete this comment.
 */

export enum PrimaryTypeOrder {
  Order = 'Order',
  OrderComponents = 'OrderComponents',
}

export enum PrimaryTypePermit {
  Permit = 'Permit',
  PermitBatch = 'PermitBatch',
  PermitBatchTransferFrom = 'PermitBatchTransferFrom',
  PermitSingle = 'PermitSingle',
  PermitTransferFrom = 'PermitTransferFrom',
}

/**
 * EIP-712 Permit PrimaryTypes
 */
export const PrimaryType = {
  ...PrimaryTypeOrder,
  ...PrimaryTypePermit,
} as const;

// Create a type from the const object
export type PrimaryType = (typeof PrimaryType)[keyof typeof PrimaryType];

/**
 * Array of all PrimaryTypeOrder enum values for EIP-712 order signatures
 * Used for validation and processing of order-related signature types
 */
export const PRIMARY_TYPES_ORDER: PrimaryTypeOrder[] =
  Object.values(PrimaryTypeOrder);

/**
 * Array of all PrimaryTypePermit enum values for EIP-712 permit signatures
 * Used for validation and processing of permit-related signature types
 */
export const PRIMARY_TYPES_PERMIT: PrimaryTypePermit[] =
  Object.values(PrimaryTypePermit);

/**
 * Array of all PrimaryType values combining order and permit signature types
 * Used for comprehensive validation of all supported EIP-712 signature types
 */
export const PRIMARY_TYPES: PrimaryType[] = Object.values(PrimaryType);

export enum ResultType {
  Benign = 'Benign',
  Malicious = 'Malicious',
  Warning = 'Warning',

  // MetaMask defined result types
  Failed = 'Failed',
  RequestInProgress = 'RequestInProgress',
}
