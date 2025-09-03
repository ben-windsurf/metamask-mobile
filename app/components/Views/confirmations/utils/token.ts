import { memoize } from 'lodash';
import { Hex } from '@metamask/utils';
import { AssetsContractController } from '@metamask/assets-controllers';
import { NetworkClientId } from '@metamask/network-controller';
import { getTokenDetails } from '../../../../util/address';

export type TokenDetailsERC20 = Awaited<
  ReturnType<
    ReturnType<AssetsContractController['getERC20Standard']>['getDetails']
  >
> & { decimalsNumber: number };

export type TokenDetailsERC721 = Awaited<
  ReturnType<
    ReturnType<AssetsContractController['getERC721Standard']>['getDetails']
  >
>;

export type TokenDetailsERC1155 = Awaited<
  ReturnType<
    ReturnType<AssetsContractController['getERC1155Standard']>['getDetails']
  >
>;

export type TokenDetails =
  | TokenDetailsERC20
  | TokenDetailsERC721
  | TokenDetailsERC1155;

/**
 * Default number of decimal places for ERC20 tokens
 * Used as fallback when token decimals cannot be determined
 */
export const ERC20_DEFAULT_DECIMALS = 18;

/**
 * Parses token decimal string to number, trying both decimal and hexadecimal formats
 * Used to convert token decimal values from contract responses to usable numbers
 * @param {string} decStr - The decimal string to parse (optional)
 * @returns {number | undefined} Parsed decimal number or undefined if parsing fails
 */
export const parseTokenDetailDecimals = (
  decStr?: string,
): number | undefined => {
  if (!decStr) {
    return undefined;
  }

  for (const radix of [10, 16]) {
    const parsedDec = parseInt(decStr, radix);
    if (isFinite(parsedDec)) {
      return parsedDec;
    }
  }
  return undefined;
};

/**
 * Memoized function to get token standard and details for ERC20, ERC721, or ERC1155 tokens
 * Caches results to avoid repeated contract calls for the same token information
 * @param {Object} params - Token lookup parameters
 * @param {Hex | string} params.tokenAddress - The token contract address
 * @param {string} params.userAddress - The user's wallet address (optional)
 * @param {string} params.tokenId - The token ID for NFTs (optional)
 * @param {NetworkClientId} params.networkClientId - Network client identifier (optional)
 * @returns {Promise<TokenDetails | Record<string, never>>} Token details or empty object if lookup fails
 */
export const memoizedGetTokenStandardAndDetails = memoize(
  async ({
    tokenAddress,
    tokenId,
    userAddress,
    networkClientId,
  }: {
    tokenAddress?: Hex | string;
    userAddress?: string;
    tokenId?: string;
    networkClientId?: NetworkClientId;
  }): Promise<TokenDetails | Record<string, never>> => {
    try {
      if (!tokenAddress) {
        return {};
      }

      return (await getTokenDetails(
        tokenAddress,
        userAddress,
        tokenId,
        networkClientId,
      )) as TokenDetails;
    } catch {
      return {};
    }
  },
);

/**
 * Fetches the decimals for the given token address.
 *
 * @param address - The ethereum token contract address. It is expected to be in hex format.
 * We currently accept strings since we have a patch that accepts a custom string
 * {@see .yarn/patches/@metamask-eth-json-rpc-middleware-npm-14.0.1-b6c2ccbe8c.patch}
 */
export const fetchErc20Decimals = async (
  address: Hex | string,
  networkClientId?: NetworkClientId,
): Promise<number> => {
  try {
    const { decimals: decStr } = (await memoizedGetTokenStandardAndDetails({
      tokenAddress: address,
      networkClientId,
    })) as TokenDetailsERC20;
    const decimals = parseTokenDetailDecimals(decStr);

    return decimals ?? ERC20_DEFAULT_DECIMALS;
  } catch {
    return ERC20_DEFAULT_DECIMALS;
  }
};
