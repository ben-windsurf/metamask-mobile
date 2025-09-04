import { Hex, createProjectLogger } from '@metamask/utils';
import { convertHexToDecimal } from '@metamask/controller-utils';

/** Logger instance for transaction relay operations */
const log = createProjectLogger('transaction-relay');

/**
 * Configuration for a relay network
 * @interface RelayNetwork
 * @property network - The network subdomain identifier
 * @property relayTransactions - Whether transaction relaying is enabled for this network
 */
interface RelayNetwork {
  network: string;
  relayTransactions: boolean;
}

/**
 * Response structure from relay networks API
 * @interface RelayNetworkResponse
 * Maps chain ID (as decimal string) to relay network configuration
 */
interface RelayNetworkResponse {
  [chainIdDecimal: string]: RelayNetwork;
}

/** Base URL template for transaction relay API endpoints */
const BASE_URL = 'https://tx-sentinel-{0}.api.cx.metamask.io/';
/** API endpoint for fetching network configurations */
const ENDPOINT_NETWORKS = 'networks';

/**
 * Checks if transaction relaying is supported for the given chain ID
 * @param chainId - The chain ID in hexadecimal format
 * @returns Promise that resolves to true if relay is supported, false otherwise
 */
export async function isRelaySupported(chainId: Hex): Promise<boolean> {
  return Boolean(await getRelayUrl(chainId));
}

/**
 * Gets the relay URL for a specific chain ID if supported
 * @param chainId - The chain ID in hexadecimal format
 * @returns Promise that resolves to the relay URL if supported, undefined otherwise
 */
async function getRelayUrl(chainId: Hex): Promise<string | undefined> {
  const networkData = await getNetworkData();
  const chainIdDecimal = convertHexToDecimal(chainId);
  const network = networkData[chainIdDecimal];

  if (!network?.relayTransactions) {
    log('Chain is not supported', chainId);
    return undefined;
  }

  return buildUrl(network.network);
}

/**
 * Fetches network configuration data from the relay API
 * @returns Promise that resolves to the network configuration mapping
 */
async function getNetworkData(): Promise<RelayNetworkResponse> {
  const url = `${buildUrl('ethereum-mainnet')}${ENDPOINT_NETWORKS}`;
  const response = await fetch(url);
  return response.json();
}

/**
 * Builds a complete URL by replacing the subdomain placeholder in the base URL
 * @param subdomain - The subdomain to insert into the URL template
 * @returns The complete URL with the subdomain substituted
 */
function buildUrl(subdomain: string): string {
  return BASE_URL.replace('{0}', subdomain);
}
