import { NetworkConfiguration } from '@metamask/network-controller';
import { Hex } from '@metamask/utils';
import { NETWORK_CHAIN_ID } from '../../../../util/networks/customNetworks';

/**
 * Type definition for known network configurations mapped by chain ID
 */
export type KnownNetworkConfigurations = {
  [K in (typeof NETWORK_CHAIN_ID)[keyof typeof NETWORK_CHAIN_ID]]: NetworkConfiguration;
};

/**
 * Creates a filter object that enables all provided networks
 * @param networks - Partial network configurations to enable
 * @returns Record mapping chain IDs to enabled status (all true)
 */
export function enableAllNetworksFilter(
  networks: Partial<KnownNetworkConfigurations>,
) {
  const allOpts: Record<Hex, boolean> = {};
  Object.keys(networks).forEach((chainId) => {
    const hexChainId = chainId as Hex;
    allOpts[hexChainId] = true;
  });
  return allOpts;
}
