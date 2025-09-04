import { rpcErrors } from '@metamask/rpc-errors';
import validUrl from 'valid-url';
import { ApprovalType, isSafeChainId } from '@metamask/controller-utils';
import { jsonRpcRequest } from '../../../util/jsonRpcRequest';
import {
  getDecimalChainId,
  isPrefixedFormattedHexString,
  isPerDappSelectedNetworkEnabled,
} from '../../../util/networks';
import {
  Caip25CaveatType,
  Caip25EndowmentPermissionName,
  getPermittedEthChainIds,
  setPermittedEthChainIds,
} from '@metamask/chain-agnostic-permission';
import { MetaMetrics, MetaMetricsEvents } from '../../../core/Analytics';
import { MetricsEventBuilder } from '../../../core/Analytics/MetricsEventBuilder';
import Engine from '../../Engine';

/**
 * The standard number of decimals for EVM native tokens
 */
const EVM_NATIVE_TOKEN_DECIMALS = 18;

/**
 * Validates and normalizes a chain ID parameter
 * @param {string} chainId - The chain ID to validate (should be 0x-prefixed hex)
 * @returns {string} The validated and normalized chain ID
 * @throws {Error} If the chain ID is invalid or unsafe
 */
export function validateChainId(chainId) {
  const _chainId = typeof chainId === 'string' && chainId.toLowerCase();

  if (!isPrefixedFormattedHexString(_chainId)) {
    throw rpcErrors.invalidParams(
      `Expected 0x-prefixed, unpadded, non-zero hexadecimal string 'chainId'. Received:\n${chainId}`,
    );
  }

  if (!isSafeChainId(_chainId)) {
    throw rpcErrors.invalidParams(
      `Invalid chain ID "${_chainId}": numerical value greater than max safe value. Received:\n${chainId}`,
    );
  }

  return _chainId;
}

/**
 * Validates parameters for adding a new Ethereum chain
 * @param {Array} params - Array containing the chain parameters object
 * @returns {Object} Validated chain parameters including chainId, chainName, firstValidRPCUrl, firstValidBlockExplorerUrl, and ticker
 * @throws {Error} If any parameter is invalid or missing required fields
 */
export function validateAddEthereumChainParams(params) {
  if (!params || !params?.[0] || typeof params[0] !== 'object') {
    throw rpcErrors.invalidParams({
      message: `Expected single, object parameter. Received:\n${JSON.stringify(
        params,
      )}`,
    });
  }

  const [
    {
      chainId,
      chainName: rawChainName = null,
      blockExplorerUrls = null,
      nativeCurrency = null,
      rpcUrls,
    },
  ] = params;

  const allowedKeys = {
    chainId: true,
    chainName: true,
    blockExplorerUrls: true,
    nativeCurrency: true,
    rpcUrls: true,
    iconUrls: true,
  };

  const extraKeys = Object.keys(params[0]).filter((key) => !allowedKeys[key]);
  if (extraKeys.length) {
    throw rpcErrors.invalidParams(
      `Received unexpected keys on object parameter. Unsupported keys:\n${extraKeys}`,
    );
  }
  const _chainId = validateChainId(chainId);

  const firstValidRPCUrl = validateRpcUrls(rpcUrls);

  const firstValidBlockExplorerUrl =
    validateBlockExplorerUrls(blockExplorerUrls);

  const chainName = validateChainName(rawChainName);

  const ticker = validateNativeCurrency(nativeCurrency);

  return {
    chainId: _chainId,
    chainName,
    firstValidRPCUrl,
    firstValidBlockExplorerUrl,
    ticker,
  };
}

/**
 * Validates RPC URLs and returns the first valid HTTPS URL
 * @param {Array} rpcUrls - Array of RPC URL strings to validate
 * @returns {string} The first valid HTTPS RPC URL with trailing slashes removed
 * @throws {Error} If no valid HTTPS URLs are found
 */
function validateRpcUrls(rpcUrls) {
  const dirtyFirstValidRPCUrl = Array.isArray(rpcUrls)
    ? rpcUrls.find((rpcUrl) => validUrl.isHttpsUri(rpcUrl))
    : null;

  const firstValidRPCUrl = dirtyFirstValidRPCUrl
    ? dirtyFirstValidRPCUrl.replace(/([^/])\/+$/g, '$1')
    : dirtyFirstValidRPCUrl;

  if (!firstValidRPCUrl) {
    throw rpcErrors.invalidParams(
      `Expected an array with at least one valid string HTTPS url 'rpcUrls', Received:\n${rpcUrls}`,
    );
  }

  return firstValidRPCUrl;
}

/**
 * Validates block explorer URLs and returns the first valid HTTPS URL
 * @param {Array|null} blockExplorerUrls - Array of block explorer URL strings to validate, or null
 * @returns {string|null} The first valid HTTPS block explorer URL, or null if none provided
 * @throws {Error} If blockExplorerUrls is provided but contains no valid HTTPS URLs
 */
function validateBlockExplorerUrls(blockExplorerUrls) {
  const firstValidBlockExplorerUrl =
    blockExplorerUrls !== null && Array.isArray(blockExplorerUrls)
      ? blockExplorerUrls.find((blockExplorerUrl) =>
          validUrl.isHttpsUri(blockExplorerUrl),
        )
      : null;

  if (blockExplorerUrls !== null && !firstValidBlockExplorerUrl) {
    throw rpcErrors.invalidParams(
      `Expected null or array with at least one valid string HTTPS URL 'blockExplorerUrl'. Received: ${blockExplorerUrls}`,
    );
  }

  return firstValidBlockExplorerUrl;
}

/**
 * Validates and truncates a chain name to acceptable length
 * @param {string} rawChainName - The raw chain name to validate
 * @returns {string} The validated chain name, truncated to 100 characters if necessary
 * @throws {Error} If the chain name is not a non-empty string
 */
function validateChainName(rawChainName) {
  if (typeof rawChainName !== 'string' || !rawChainName) {
    throw rpcErrors.invalidParams({
      message: `Expected non-empty string 'chainName'. Received:\n${rawChainName}`,
    });
  }
  return rawChainName.length > 100
    ? rawChainName.substring(0, 100)
    : rawChainName;
}

/**
 * Validates native currency parameters and returns the ticker symbol
 * @param {Object|null} nativeCurrency - The native currency object with symbol and decimals, or null
 * @returns {string} The validated ticker symbol (defaults to 'ETH' if not provided)
 * @throws {Error} If the native currency object is invalid or has incorrect decimals
 */
function validateNativeCurrency(nativeCurrency) {
  if (nativeCurrency !== null) {
    if (typeof nativeCurrency !== 'object' || Array.isArray(nativeCurrency)) {
      throw rpcErrors.invalidParams({
        message: `Expected null or object 'nativeCurrency'. Received:\n${nativeCurrency}`,
      });
    }
    if (nativeCurrency.decimals !== EVM_NATIVE_TOKEN_DECIMALS) {
      throw rpcErrors.invalidParams({
        message: `Expected the number 18 for 'nativeCurrency.decimals' when 'nativeCurrency' is provided. Received: ${nativeCurrency.decimals}`,
      });
    }

    if (!nativeCurrency.symbol || typeof nativeCurrency.symbol !== 'string') {
      throw rpcErrors.invalidParams({
        message: `Expected a string 'nativeCurrency.symbol'. Received: ${nativeCurrency.symbol}`,
      });
    }
  }
  const ticker = nativeCurrency?.symbol || 'ETH';

  if (typeof ticker !== 'string' || ticker.length < 1 || ticker.length > 6) {
    throw rpcErrors.invalidParams({
      message: `Expected 1-6 character string 'nativeCurrency.symbol'. Received:\n${ticker}`,
    });
  }

  return ticker;
}

/**
 * Validates that an RPC endpoint returns the expected chain ID
 * @param {string} rpcUrl - The RPC URL to validate
 * @param {string} chainId - The expected chain ID
 * @throws {Error} If the RPC request fails or returns a different chain ID
 */
export async function validateRpcEndpoint(rpcUrl, chainId) {
  let endpointChainId;
  try {
    endpointChainId = await jsonRpcRequest(rpcUrl, 'eth_chainId');
  } catch (err) {
    throw rpcErrors.internal({
      message: `Request for method 'eth_chainId on ${rpcUrl} failed`,
      data: { networkErr: err },
    });
  }
  if (chainId !== endpointChainId) {
    throw rpcErrors.invalidParams({
      message: `Chain ID returned by RPC URL ${rpcUrl} does not match ${chainId}`,
      data: { chainId: endpointChainId },
    });
  }
}

/**
 * Finds an existing network configuration by chain ID
 * @param {string} chainId - The chain ID to search for
 * @param {Object} networkConfigurations - Object containing network configurations
 * @returns {Array|undefined} Array containing [networkConfigurationId, networkConfiguration] if found, undefined otherwise
 */
export function findExistingNetwork(chainId, networkConfigurations) {
  const existingEntry = Object.entries(networkConfigurations).find(
    ([, networkConfiguration]) => networkConfiguration.chainId === chainId,
  );
  if (existingEntry) {
    const [, networkConfiguration] = existingEntry;
    const networkConfigurationId =
      networkConfiguration.rpcEndpoints[
        networkConfiguration.defaultRpcEndpointIndex
      ].networkClientId;
    return [networkConfigurationId, networkConfiguration];
  }
  return;
}

/**
 * Switches the active network for the origin if already permitted
 * otherwise requests approval to update permission first.
 *
 * @param response - The JSON RPC request's response object.
 * @param end - The JSON RPC request's end callback.
 * @param {object} params.network - Network configuration of the chain being switched to.
 * @param {string} params.chainId - The network client being switched to.
 * @param {Function} params.requestUserApproval - The callback to trigger user approval flow.
 * @param {object} params.analytics - Analytics parameters to be passed when tracking event via `MetaMetrics`.
 * @param {string} params.origin - The origin sending this request.
 * @param {boolean} params.autoApprove - Variable to check if the switch should be auto approved.
 * @param {object} params.hooks - Method hooks passed to the method implementation.
 * @returns a null response on success or an error if user rejects an approval when autoApprove is false or on unexpected errors.
 */
export async function switchToNetwork({
  network,
  chainId,
  requestUserApproval,
  analytics,
  origin,
  autoApprove = false,
  hooks,
  dappUrl = origin,
}) {
  const {
    getCaveat,
    requestPermittedChainsPermissionIncrementalForOrigin,
    hasApprovalRequestsForOrigin,
    toNetworkConfiguration,
    fromNetworkConfiguration,
    rejectApprovalRequestsForOrigin,
  } = hooks;
  const {
    MultichainNetworkController,
    PermissionController,
    SelectedNetworkController,
  } = Engine.context;

  const [networkConfigurationId, networkConfiguration] = network;

  const caip25Caveat = getCaveat({
    target: Caip25EndowmentPermissionName,
    caveatType: Caip25CaveatType,
  });

  let ethChainIds;

  if (caip25Caveat) {
    ethChainIds = getPermittedEthChainIds(caip25Caveat.value);
  } else {
    await requestPermittedChainsPermissionIncrementalForOrigin({
      origin,
      chainId,
      autoApprove,
    });
  }

  const shouldGrantPermissions = !ethChainIds?.includes(chainId);

  const requestModalType = autoApprove ? 'new' : 'switch';

  const shouldShowRequestModal = !autoApprove && shouldGrantPermissions;

  const requestData = {
    rpcUrl:
      networkConfiguration.rpcEndpoints[
        networkConfiguration.defaultRpcEndpointIndex
      ],
    chainId,
    chainName:
      networkConfiguration.name ||
      networkConfiguration.chainName ||
      networkConfiguration.nickname ||
      networkConfiguration.shortName,
    ticker: networkConfiguration.ticker || 'ETH',
    chainColor: networkConfiguration.color,
    pageMeta: {
      url: dappUrl ?? origin,
    },
  };

  if (shouldShowRequestModal) {
    await requestUserApproval({
      type: 'SWITCH_ETHEREUM_CHAIN',
      requestData: { ...requestData, type: requestModalType },
    });

    if (caip25Caveat) {
      await PermissionController.grantPermissionsIncremental({
        subject: { origin },
        approvedPermissions: {
          [Caip25EndowmentPermissionName]: {
            caveats: [
              {
                type: Caip25CaveatType,
                value: setPermittedEthChainIds(caip25Caveat.value, [chainId]),
              },
            ],
          },
        },
      });
    }
  }

  if (!shouldShowRequestModal && !ethChainIds?.includes(chainId)) {
    await requestPermittedChainsPermissionIncrementalForOrigin({
      origin,
      chainId,
      autoApprove,
    });
  } else if (hasApprovalRequestsForOrigin?.() && !autoApprove) {
    await requestUserApproval({
      origin,
      type: ApprovalType.SwitchEthereumChain,
      requestData: {
        toNetworkConfiguration,
        fromNetworkConfiguration,
      },
    });
  }

  rejectApprovalRequestsForOrigin?.();

  if (isPerDappSelectedNetworkEnabled()) {
    SelectedNetworkController.setNetworkClientIdForDomain(
      origin,
      networkConfigurationId || networkConfiguration.networkType,
    );
  } else {
    await MultichainNetworkController.setActiveNetwork(
      networkConfigurationId || networkConfiguration.networkType,
    );
  }

  const analyticsParams = {
    chain_id: getDecimalChainId(chainId),
    source: 'Custom Network API',
    symbol: networkConfiguration?.ticker || 'ETH',
    ...analytics,
  };

  MetaMetrics.getInstance().trackEvent(
    MetricsEventBuilder.createEventBuilder(MetaMetricsEvents.NETWORK_SWITCHED)
      .addProperties(analyticsParams)
      .build(),
  );
}
