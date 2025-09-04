import namehash from 'eth-ens-namehash';
import Eth from '@metamask/ethjs-query';
import EthContract from '@metamask/ethjs-contract';
import registryAbi from './contracts/registry';
import resolverAbi from './contracts/resolver';
import contentHash from 'content-hash';
import multihash from 'multihashes';
import Engine from '../../core/Engine';
import { IPFS_GATEWAY_DISABLED_ERROR } from '../../components/Views/BrowserTab/constants';

/**
 * Resolves an ENS name to an IPFS content ID by querying the ENS registry and resolver contracts.
 * Supports both EIP-1577 compliant resolvers (contenthash) and legacy resolvers (content).
 *
 * @param {Object} params - The resolution parameters
 * @param {Object} params.provider - The Ethereum provider to use for contract calls
 * @param {string} params.name - The ENS name to resolve (e.g., 'example.eth')
 * @param {string} params.chainId - The chain ID to determine which ENS registry to use
 * @returns {Promise<Object>} Object containing the content type and hash
 * @throws {Error} When no registry is found for the chain, no resolver exists, or IPFS gateway is disabled
 *
 * @example
 * const result = await resolveEnsToIpfsContentId({
 *   provider: web3Provider,
 *   name: 'example.eth',
 *   chainId: '0x1'
 * });
 * // Returns: { type: 'ipfs-ns', hash: 'QmHash...' }
 */
export default async function resolveEnsToIpfsContentId({
  provider,
  name,
  chainId,
}) {
  const eth = new Eth(provider);
  const hash = namehash.hash(name);
  const contract = new EthContract(eth);
  // lookup registry
  const registryAddress = getRegistryForChainId(chainId);
  if (!registryAddress) {
    throw new Error(
      `EnsIpfsResolver - no known ens-ipfs registry for chainId "${chainId}"`,
    );
  }
  const Registry = contract(registryAbi).at(registryAddress);
  // lookup resolver
  const resolverLookupResult = await Registry.resolver(hash);
  const resolverAddress = resolverLookupResult[0];
  if (hexValueIsEmpty(resolverAddress)) {
    throw new Error(`EnsIpfsResolver - no resolver found for name "${name}"`);
  }
  const Resolver = contract(resolverAbi).at(resolverAddress);
  const isEIP1577Compliant = await Resolver.supportsInterface('0xbc1c58d1');
  const isLegacyResolver = await Resolver.supportsInterface('0xd8389dc5');
  if (isEIP1577Compliant[0]) {
    const contentLookupResult = await Resolver.contenthash(hash);
    const rawContentHash = contentLookupResult[0];
    const decodedContentHash = contentHash.decode(rawContentHash);
    const type = contentHash.getCodec(rawContentHash);
    if (!Engine.context.PreferencesController.state.isIpfsGatewayEnabled) {
      throw new Error(IPFS_GATEWAY_DISABLED_ERROR);
    }
    return { type, hash: decodedContentHash };
  }
  if (isLegacyResolver[0]) {
    // lookup content id
    const contentLookupResult = await Resolver.content(hash);
    const content = contentLookupResult[0];
    if (hexValueIsEmpty(content)) {
      throw new Error(
        `EnsIpfsResolver - no content ID found for name "${name}"`,
      );
    }
    const nonPrefixedHex = content.slice(2);

    // Multihash
    const buffer = multihash.fromHexString(nonPrefixedHex);
    const contentId = multihash.toB58String(
      multihash.encode(buffer, 'sha2-256'),
    );
    if (!Engine.context.PreferencesController.state.isIpfsGatewayEnabled) {
      throw new Error(IPFS_GATEWAY_DISABLED_ERROR);
    }
    return { type: 'ipfs-ns', hash: contentId };
  }

  throw new Error(
    `EnsIpfsResolver - the resolver for name "${name}" is not standard, it should either supports contenthash() or content()`,
  );
}

/**
 * Checks if a hexadecimal value represents an empty or null value.
 * Used to determine if ENS resolver addresses or content hashes are empty.
 *
 * @param {string|undefined|null} value - The hexadecimal value to check
 * @returns {boolean} True if the value is considered empty, false otherwise
 */
function hexValueIsEmpty(value) {
  return [
    undefined,
    null,
    '0x',
    '0x0',
    '0x0000000000000000000000000000000000000000000000000000000000000000',
  ].includes(value);
}

/**
 * Gets the ENS registry contract address for a given chain ID.
 * Currently supports Ethereum mainnet and Sepolia testnet.
 *
 * @param {string} chainId - The chain ID in hexadecimal format (e.g., '0x1' for mainnet)
 * @returns {string|null} The ENS registry contract address, or null if unsupported chain
 */
function getRegistryForChainId(chainId) {
  switch (chainId) {
    // mainnet
    case '0x1':
      return '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e';
    // sepolia
    case '0xaa36a7':
      return '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e';
    default:
      return null;
  }
}

export function isGatewayUrl(urlObj) {
  // All IPFS gateway urls start with the path /ipfs/
  if (urlObj.pathname.substr(0, 6) === '/ipfs/') return true;
  // All Swarm gateway urls start with the path /bzz:/
  if (urlObj.pathname.substr(0, 6) === '/bzz:/') return true;
  // All IPNS gateway urls start with the path /ipns/
  if (urlObj.pathname.substr(0, 6) === '/ipns/') return true;

  return false;
}
