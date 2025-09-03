import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Hex } from '@metamask/utils';
import { selectAccountsByChainId } from '../../../../selectors/accountTrackerController';

interface AccountData {
  balance: string;
}

type AccountsByChainId = Record<Hex, Record<string, AccountData>>;

/**
 * Custom hook that retrieves the native balance for a specific account on a given chain
 * Normalizes account addresses to lowercase for consistent lookups and returns balance in hex format
 * @param {Hex} chainId - The chain ID to look up the account balance for
 * @param {string} address - The account address to get the balance for
 * @returns {Object} Object containing balanceWeiInHex property with the account's native balance
 */
export const useAccountNativeBalance = (chainId: Hex, address: string) => {
  const accountsByChainId = useSelector(selectAccountsByChainId);

  // Create a normalized version of accountsByChainId with lowercase addresses
  const normalizedAccountsByChainId = useMemo(() => {
    if (!accountsByChainId) return {} as AccountsByChainId;
    return Object.entries(accountsByChainId).reduce<AccountsByChainId>(
      (acc, [chainIdKey, accounts]) => {
        acc[chainIdKey as Hex] = Object.entries(accounts).reduce<
          Record<string, AccountData>
        >((chainAcc, [acctAddress, acctData]) => {
          chainAcc[acctAddress.toLowerCase()] = acctData;
          return chainAcc;
        }, {});
        return acc;
      },
      {} as AccountsByChainId,
    );
  }, [accountsByChainId]);

  if (!chainId || !address) {
    return {
      balanceWeiInHex: '0x0',
    };
  }

  const lowercaseAddress = address.toLowerCase();

  const rawAccountBalance =
    normalizedAccountsByChainId[chainId]?.[lowercaseAddress]?.balance ?? '0x0';

  return {
    balanceWeiInHex: rawAccountBalance,
  };
};
