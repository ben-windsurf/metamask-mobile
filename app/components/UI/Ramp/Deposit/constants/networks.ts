/**
 * Network constants for deposit functionality
 * Defines supported networks for deposit operations with their chain IDs and display names
 */
import { CaipChainId } from '@metamask/utils';

interface DepositNetwork {
  chainId: CaipChainId;
  name: string;
}

/**
 * Ethereum mainnet network configuration for deposits
 */
export const ETHEREUM_MAINNET: DepositNetwork = {
  chainId: 'eip155:1',
  name: 'Ethereum',
};

/**
 * Linea mainnet network configuration for deposits
 */
export const LINEA_MAINNET: DepositNetwork = {
  chainId: 'eip155:59144',
  name: 'Linea',
};

/**
 * Base mainnet network configuration for deposits
 */
export const BASE_MAINNET: DepositNetwork = {
  chainId: 'eip155:8453',
  name: 'Base',
};

/**
 * Solana mainnet network configuration for deposits
 */
export const SOLANA_MAINNET: DepositNetwork = {
  chainId: 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',
  name: 'Solana',
};

/**
 * BNB Smart Chain mainnet network configuration for deposits
 */
export const BSC_MAINNET: DepositNetwork = {
  chainId: 'eip155:56',
  name: 'BNB Smart Chain',
};

/**
 * Mapping of chain IDs to their corresponding deposit network configurations
 * Used for quick lookup of network information by chain ID
 */
export const DEPOSIT_NETWORKS_BY_CHAIN_ID: Record<CaipChainId, DepositNetwork> =
  {
    [ETHEREUM_MAINNET.chainId]: ETHEREUM_MAINNET,
    [LINEA_MAINNET.chainId]: LINEA_MAINNET,
    [BASE_MAINNET.chainId]: BASE_MAINNET,
    [SOLANA_MAINNET.chainId]: SOLANA_MAINNET,
    [BSC_MAINNET.chainId]: BSC_MAINNET,
  };
