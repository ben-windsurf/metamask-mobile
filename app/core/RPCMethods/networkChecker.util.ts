import axios from 'axios';
import { BannerAlertSeverity } from '../../component-library/components/Banners/Banner';
import { strings } from '../../../locales/i18n';
import { PopularList } from '../../util/networks/customNetworks';

import { toHex } from '@metamask/controller-utils';

/**
 * Checks if a network exists in the popular networks list by RPC URL and chain ID.
 * @param rpcUrl - The RPC URL to check
 * @param chainId - The chain ID to match
 * @returns True if the network is found in the popular list
 */
const findPopularNetwork = (rpcUrl: string, chainId: string) =>
  PopularList.some((network) => {
    const { origin } = new URL(network.rpcUrl);
    return origin === rpcUrl && network.chainId === chainId;
  });

/**
 * Checks if a network name exists in the popular networks list by name and chain ID.
 * @param name - The network name to check
 * @param chainId - The chain ID to match
 * @returns True if the network name is found in the popular list
 */
const findPopularNetworkName = (name: string, chainId: string) =>
  PopularList.some(
    (network) =>
      network.nickname.toLowerCase() === name?.toLowerCase() &&
      network.chainId === chainId,
  );

/**
 * Checks if a network symbol exists in the popular networks list by symbol and chain ID.
 * @param symbol - The network symbol/ticker to check
 * @param chainId - The chain ID to match
 * @returns True if the network symbol is found in the popular list
 */
const findPopularNetworkSymbol = (symbol: string, chainId: string) =>
  PopularList.some(
    (network) => network.ticker === symbol && network.chainId === chainId,
  );

/**
 * Validates a custom network configuration against the safe chains list and popular networks.
 * Checks RPC URL, chain name, ticker symbol, and native currency decimals for potential issues.
 * @param chainIdDecimal - The chain ID in decimal format
 * @param rpcUrl - The RPC URL to validate
 * @param nickname - The network name to validate
 * @param ticker - The native currency symbol to validate
 * @returns Array of alert objects containing validation errors and warnings
 */
const checkSafeNetwork = async (
  chainIdDecimal: string,
  rpcUrl: string,
  nickname: string,
  ticker: string,
) => {
  const alerts = [];
  const EVM_NATIVE_TOKEN_DECIMALS = 18;

  const response = await axios.get('https://chainid.network/chains.json');
  const safeChainsList = response.data;

  const matchedChain = safeChainsList.find(
    (chain: { chainId: number }) => chain.chainId.toString() === chainIdDecimal,
  );

  if (matchedChain) {
    const { origin } = new URL(rpcUrl);
    if (
      !matchedChain.rpc
        ?.map((rpc: string) => new URL(rpc).origin)
        .includes(origin) &&
      !findPopularNetwork(origin, toHex(chainIdDecimal))
    ) {
      alerts.push({
        alertError: strings('add_custom_network.invalid_rpc_url'),
        alertSeverity: BannerAlertSeverity.Error,
        alertOrigin: 'rpc_url',
      });
    }
    if (matchedChain.nativeCurrency?.decimals !== EVM_NATIVE_TOKEN_DECIMALS) {
      alerts.push({
        alertError: strings('add_custom_network.invalid_chain_token_decimals'),
        alertSeverity: BannerAlertSeverity.Warning,
        alertOrigin: 'decimals',
      });
    }
    if (
      matchedChain.name?.toLowerCase() !== nickname?.toLowerCase() &&
      !findPopularNetworkName(nickname, toHex(chainIdDecimal))
    ) {
      alerts.push({
        alertError: strings('add_custom_network.unrecognized_chain_name'),
        alertSeverity: BannerAlertSeverity.Warning,
        alertOrigin: 'chain_name',
      });
    }
    if (
      matchedChain.nativeCurrency?.symbol !== ticker &&
      !findPopularNetworkSymbol(ticker, toHex(chainIdDecimal))
    ) {
      alerts.push({
        alertError: strings('add_custom_network.unrecognized_chain_ticker'),
        alertSeverity: BannerAlertSeverity.Warning,
        alertOrigin: 'chain_ticker',
      });
    }
  }

  if (!matchedChain) {
    alerts.push({
      alertError: strings('add_custom_network.unrecognized_chain_id'),
      alertSeverity: BannerAlertSeverity.Error,
      alertOrigin: 'unknown_chain',
    });
  }

  return alerts;
};

export default checkSafeNetwork;
