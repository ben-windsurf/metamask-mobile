import { NETWORKS_CHAIN_ID } from './network';

/**
 * Enumeration of supported fiat order providers for on-ramp functionality.
 * These providers enable users to purchase cryptocurrency using fiat currency.
 */
export enum FIAT_ORDER_PROVIDERS {
  WYRE = 'WYRE',
  WYRE_APPLE_PAY = 'WYRE_APPLE_PAY',
  TRANSAK = 'TRANSAK',
  MOONPAY = 'MOONPAY',
  // The key for fiat on-ramp aggregator
  AGGREGATOR = 'AGGREGATOR',
  DEPOSIT = 'DEPOSIT',
}

/**
 * Enumeration of possible states for fiat orders during the on-ramp process.
 * Tracks the lifecycle of a fiat-to-crypto purchase transaction.
 */
export enum FIAT_ORDER_STATES {
  PENDING = 'PENDING',
  FAILED = 'FAILED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  CREATED = 'CREATED',
}

/**
 * Mapping of network chain IDs to their human-readable display names.
 * Used for presenting network information to users in the on-ramp interface.
 */
export const FORMATTED_NETWORK_NAMES = {
  [NETWORKS_CHAIN_ID.MAINNET]: 'Ethereum Mainnet',
  [NETWORKS_CHAIN_ID.BSC]: 'Binance Smart Chain',
  [NETWORKS_CHAIN_ID.POLYGON]: 'Polygon',
  [NETWORKS_CHAIN_ID.AVAXCCHAIN]: 'Avalanche',
  [NETWORKS_CHAIN_ID.CELO]: 'Celo',
  [NETWORKS_CHAIN_ID.FANTOM]: 'Fantom',
} as const;

/**
 * The native token address used to represent the native currency of a blockchain.
 * This zero address is a standard convention for native tokens (ETH, BNB, MATIC, etc.).
 */
export const NATIVE_ADDRESS = '0x0000000000000000000000000000000000000000';
