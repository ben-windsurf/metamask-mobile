import { NetworkClientId } from '@metamask/network-controller';
import { Hex } from '@metamask/utils';

import { TokenStandard } from '../../../UI/SimulationDetails/types';
import { useAsyncResult } from '../../../hooks/useAsyncResult';
import {
  ERC20_DEFAULT_DECIMALS,
  parseTokenDetailDecimals,
  memoizedGetTokenStandardAndDetails,
  TokenDetailsERC20,
} from '../utils/token';
import { useRef } from 'react';

/**
 * Custom hook that retrieves token standard and details for a given token contract address
 * Fetches ERC-20 token information including decimals, symbol, and standard type
 * Used in confirmation flows to display accurate token information to users
 * @param {Hex | string | undefined} tokenAddress - The token contract address to fetch details for
 * @param {NetworkClientId} networkClientId - Optional network client ID for multi-chain support
 * @returns {Object} Object containing token details (decimals, standard, symbol) and loading state
 */
export const useGetTokenStandardAndDetails = (
  tokenAddress?: Hex | string | undefined,
  networkClientId?: NetworkClientId,
) => {
  const isPendingRef = useRef<boolean>(false);

  const { value: details } =
    useAsyncResult<TokenDetailsERC20 | null>(async () => {
      if (!tokenAddress) {
        return Promise.resolve(null);
      }

      isPendingRef.current = true;

      const result = (await memoizedGetTokenStandardAndDetails({
        tokenAddress,
        networkClientId,
      })) as TokenDetailsERC20;
      isPendingRef.current = false;

      return result;
    }, [tokenAddress]);

  if (!details) {
    return {
      details: {
        decimalsNumber: undefined,
        standard: undefined,
        symbol: undefined,
      },
      isPending: isPendingRef.current,
    };
  }

  const { decimals, standard } = details || {};

  if (standard === TokenStandard.ERC20) {
    const parsedDecimals =
      parseTokenDetailDecimals(decimals) ?? ERC20_DEFAULT_DECIMALS;
    details.decimalsNumber = parsedDecimals;
  }

  return { details, isPending: isPendingRef.current };
};
