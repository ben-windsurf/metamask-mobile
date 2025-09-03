import { useState, useEffect, useCallback } from 'react';

import Engine from '../../../../core/Engine';

/**
 * Custom hook that fetches and manages ERC20 token balance for a specific user and contract
 * Used in confirmation flows to display current token balances before transactions
 * @param {string} contractAddress - The ERC20 token contract address
 * @param {string} userAddress - The user's wallet address to check balance for
 * @param {string} networkClientId - The network client ID to use for the balance query
 * @returns {Object} Object containing tokenBalance (string|null), loading (boolean), and error (boolean) states
 */
export const useERC20TokenBalance = (
  contractAddress: string,
  userAddress: string,
  networkClientId: string,
) => {
  const [tokenBalance, setTokenBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchBalance = useCallback(
    async (token: string, user: string): Promise<void> => {
      Engine.context.AssetsContractController?.getERC20BalanceOf(
        token,
        user,
        networkClientId,
      )
        // BN versions mismatch here
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((balance: any) => setTokenBalance(balance?.toString()))
        .catch(() => setError(true))
        .finally(() => setLoading(false));
    },
    [networkClientId],
  );

  useEffect(() => {
    fetchBalance(contractAddress, userAddress);
  }, [contractAddress, fetchBalance, userAddress]);

  return { tokenBalance, loading, error };
};
