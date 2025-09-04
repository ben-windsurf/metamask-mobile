/* eslint-disable import/prefer-default-export */

import { isProduction } from '../util/environment';
import { NETWORKS_CHAIN_ID } from './network';

/** Chain IDs allowed for smart transactions in development environment */
const ALLOWED_SMART_TRANSACTIONS_CHAIN_IDS_DEVELOPMENT: string[] = [
  NETWORKS_CHAIN_ID.MAINNET,
  NETWORKS_CHAIN_ID.SEPOLIA,
  // NETWORKS_CHAIN_ID.BASE, // TODO: Add base to development when ready
  // NETWORKS_CHAIN_ID.LINEA_MAINNET, // TODO: Add linea mainnet to development when ready
  NETWORKS_CHAIN_ID.BSC,
  NETWORKS_CHAIN_ID.ARBITRUM,
];

/** Chain IDs allowed for smart transactions in production environment */
const ALLOWED_SMART_TRANSACTIONS_CHAIN_IDS_PRODUCTION: string[] = [
  NETWORKS_CHAIN_ID.MAINNET,
  // NETWORKS_CHAIN_ID.BASE, // TODO: Add base to production when ready
  // NETWORKS_CHAIN_ID.LINEA_MAINNET, // TODO: Add linea mainnet to production when ready
  NETWORKS_CHAIN_ID.BSC,
  NETWORKS_CHAIN_ID.ARBITRUM,
];

/**
 * Gets the list of chain IDs that are allowed for smart transactions
 * based on the current environment (production or development).
 *
 * @returns Array of chain IDs that support smart transactions
 */
export const getAllowedSmartTransactionsChainIds = (): string[] =>
  isProduction()
    ? ALLOWED_SMART_TRANSACTIONS_CHAIN_IDS_PRODUCTION
    : ALLOWED_SMART_TRANSACTIONS_CHAIN_IDS_DEVELOPMENT;
