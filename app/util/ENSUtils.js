import Engine from '../core/Engine';
import ENS from 'ethjs-ens';
import { areAddressesEqual } from './address';
import {
  ChainId,
  InfuraNetworkType,
  NetworkType,
} from '@metamask/controller-utils';
/** Error message when ENS name is not defined */
const ENS_NAME_NOT_DEFINED_ERROR = 'ENS name not defined';

/** Error message for invalid ENS names */
const INVALID_ENS_NAME_ERROR = 'invalid ENS name';

/** Cache refresh threshold - one hour in milliseconds */
const CACHE_REFRESH_THRESHOLD = 60 * 60 * 1000;
import { EMPTY_ADDRESS } from '../constants/transaction';
import { regex } from '../../app/util/regex';

/**
 * Utility class with the single responsibility
 * of caching ENS names
 *
 * TODO: Replace this entire module and cache with the core ENS controller
 */
export class ENSCache {
  static cache = {};
}

/**
 * A list of all chain IDs supported by the current legacy ENS library we are
 * using.
 *
 * Ropsten is excluded because we no longer support Ropsten.
 */
const ENS_SUPPORTED_CHAIN_IDS = [ChainId[NetworkType.mainnet]];

/**
 * Network IDs supported by the legacy ENS library.
 * We still need it to support the legacy ENS library that we are using.
 */
const ENS_SUPPORTED_NETWORK_IDS = {
  [InfuraNetworkType.mainnet]: '1',
};

/**
 * A map of chain ID to network ID for networks supported by the current
 * legacy ENS library we are using.
 */
const CHAIN_ID_TO_NETWORK_ID = {
  [ChainId[NetworkType.mainnet]]:
    ENS_SUPPORTED_NETWORK_IDS[NetworkType.mainnet],
};

/**
 * Get a cached ENS name.
 *
 * @param {string} address - The address to lookup.
 * @param {string} chainId - The chain ID for the cached ENS name.
 * @returns {string|undefined} The cached ENS name, or undefined if the name
 * was not found in the cache.
 */
export function getCachedENSName(address, chainId) {
  const networkHasEnsSupport = ENS_SUPPORTED_CHAIN_IDS.includes(chainId);
  if (!networkHasEnsSupport) {
    return undefined;
  }

  const networkId = CHAIN_ID_TO_NETWORK_ID[chainId];
  const cacheEntry = ENSCache.cache[networkId + address];

  return cacheEntry?.name;
}

/**
 * Performs an ENS reverse lookup to get the ENS name for a given address.
 * Results are cached to improve performance.
 *
 * @param {string} address - The Ethereum address to lookup
 * @param {string} chainId - The chain ID to perform the lookup on
 * @returns {Promise<string|undefined>} The ENS name if found, undefined otherwise
 */
export async function doENSReverseLookup(address, chainId) {
  const { provider } =
    Engine.context.NetworkController.getProviderAndBlockTracker();
  const { name: cachedName, timestamp } =
    ENSCache.cache[chainId + address] || {};
  const nowTimestamp = Date.now();
  if (timestamp && nowTimestamp - timestamp < CACHE_REFRESH_THRESHOLD) {
    return Promise.resolve(cachedName);
  }

  const networkHasEnsSupport = ENS_SUPPORTED_CHAIN_IDS.includes(chainId);

  if (networkHasEnsSupport) {
    const networkId = CHAIN_ID_TO_NETWORK_ID[chainId];
    this.ens = new ENS({ provider, network: networkId });
    try {
      const name = await this.ens.reverse(address);
      const resolvedAddress = await this.ens.lookup(name);
      if (areAddressesEqual(address, resolvedAddress)) {
        ENSCache.cache[networkId + address] = { name, timestamp: Date.now() };
        return name;
      }
    } catch (e) {
      if (
        e.message.includes(ENS_NAME_NOT_DEFINED_ERROR) ||
        e.message.includes(INVALID_ENS_NAME_ERROR)
      ) {
        ENSCache.cache[networkId + address] = { timestamp: Date.now() };
      }
    }
  }
}

/**
 * Performs an ENS lookup to get the Ethereum address for a given ENS name.
 *
 * @param {string} ensName - The ENS name to resolve
 * @param {string} chainId - The chain ID to perform the lookup on
 * @returns {Promise<string|undefined>} The resolved Ethereum address if found, undefined otherwise
 */
export async function doENSLookup(ensName, chainId) {
  const { provider } =
    Engine.context.NetworkController.getProviderAndBlockTracker();

  const networkHasEnsSupport = ENS_SUPPORTED_CHAIN_IDS.includes(chainId);

  if (networkHasEnsSupport) {
    const networkId = CHAIN_ID_TO_NETWORK_ID[chainId];
    this.ens = new ENS({ provider, network: networkId });
    try {
      const resolvedAddress = await this.ens.lookup(ensName);
      if (resolvedAddress === EMPTY_ADDRESS) return;
      return resolvedAddress;
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }
}

/**
 * Checks if the given name matches the default account name pattern.
 *
 * @param {string} name - The account name to check
 * @returns {boolean} True if the name matches the default account pattern, false otherwise
 */
export function isDefaultAccountName(name) {
  return regex.defaultAccount.test(name);
}
