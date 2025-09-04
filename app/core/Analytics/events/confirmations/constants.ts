/**
 * Types of tooltips used in confirmation screens for providing additional context to users.
 */
export enum TOOLTIP_TYPES {
  /** Tooltip explaining network fee calculations and components */
  NETWORK_FEE = 'network_fee',
  /** Tooltip explaining how reward frequency works in staking */
  REWARD_FREQUENCY = 'reward_frequency',
}

/**
 * Event locations for confirmation screens used in analytics tracking.
 * These represent the main confirmation flow types where user interactions are tracked.
 */
export enum CONFIRMATION_EVENT_LOCATIONS {
  /** Token or contract approval confirmation screen */
  APPROVE = 'approve',
  /** Smart contract deployment confirmation screen */
  CONTRACT_DEPLOYMENT = 'contract_deployment',
  /** Smart contract method call confirmation screen */
  CONTRACT_INTERACTION = 'contract_interaction',
  /** Personal message signing confirmation screen */
  PERSONAL_SIGN = 'personal_sign',
  /** Typed data signing v1 confirmation screen */
  TYPED_SIGN_V1 = 'typed_sign_v1',
  /** Typed data signing v3/v4 confirmation screen */
  TYPED_SIGN_V3_V4 = 'typed_sign_v3_v4',
  /** Staking deposit confirmation screen */
  STAKING_DEPOSIT = 'staking_deposit',
  /** Staking withdrawal confirmation screen */
  STAKING_WITHDRAWAL = 'staking_withdrawal',
  /** Staking rewards claim confirmation screen */
  STAKING_CLAIM = 'staking_claim',
  /** Token or ETH transfer confirmation screen */
  TRANSFER = 'transfer',
}
