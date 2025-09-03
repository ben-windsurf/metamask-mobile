import { zeroAddress } from 'ethereumjs-util';
import { TokenI } from '../../Tokens/types';
import { TokenDetails } from '../TokenDetails/TokenDetails';
import { parseCaipAssetType } from '@metamask/utils';

/**
 * Extracts token details from asset information for display purposes
 * Handles both EVM and non-EVM assets, including native tokens and contract tokens
 * @param {TokenI} asset - The token asset object containing basic token information
 * @param {boolean} isNonEvmAsset - Whether this is a non-EVM asset (e.g., Solana)
 * @param {string | undefined} tokenContractAddress - The contract address for EVM tokens
 * @param {Record<string, string | number | string[]>} tokenMetadata - Additional token metadata
 * @returns {TokenDetails} Formatted token details including contract address, decimals, and token list
 */
export const getTokenDetails = (
  asset: TokenI,
  isNonEvmAsset: boolean,
  tokenContractAddress: string | undefined,
  tokenMetadata: Record<string, string | number | string[]>,
): TokenDetails => {
  if (isNonEvmAsset) {
    // Use the same approach as useTokenHistoricalPrices
    const isCaipAssetType = asset.address.startsWith(`${asset.chainId}`);

    // Ensure we have proper CAIP format address for parsing
    const normalizedCaipAssetTypeAddress = isCaipAssetType
      ? asset.address
      : `${asset.chainId}/token:${asset.address}`;

    const { assetNamespace, assetReference } = parseCaipAssetType(
      normalizedCaipAssetTypeAddress as `${string}:${string}/${string}:${string}`,
    );
    const isNative = assetNamespace === 'slip44';
    return {
      contractAddress: isNative ? null : assetReference || null,
      tokenDecimal: asset.decimals || null,
      tokenList: asset?.aggregators?.join(', ') || null,
    };
  }

  if (asset.isETH) {
    return {
      contractAddress: zeroAddress(),
      tokenDecimal: 18,
      tokenList: '',
    };
  }

  return {
    contractAddress: tokenContractAddress ?? null,
    tokenDecimal:
      typeof tokenMetadata?.decimals === 'number'
        ? tokenMetadata.decimals
        : null,
    tokenList: Array.isArray(tokenMetadata?.aggregators)
      ? tokenMetadata.aggregators.join(', ')
      : null,
  };
};
