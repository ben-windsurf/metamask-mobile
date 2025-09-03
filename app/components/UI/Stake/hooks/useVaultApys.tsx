import { useState } from 'react';
import { useSelector } from 'react-redux';
import Engine from '../../../../core/Engine';
import { pooledStakingSelectors } from '../../../../selectors/earnController';

/**
 * Custom hook for managing vault APY data for pooled staking
 * Provides vault APY information, loading state, and refresh functionality
 * @param {number} chainId - The chain ID to fetch vault APYs for
 * @returns {Object} Object containing vault APYs, refresh function, loading state, and error state
 */
const useVaultApys = (chainId: number) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const vaultApys = useSelector(
    pooledStakingSelectors.selectVaultDailyApysForChain(chainId),
  );

  const fetchVaultApys = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await Engine.context.EarnController.refreshPooledStakingVaultDailyApys();
    } catch (err) {
      setError('Failed to fetch pooled staking vault APYs');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    vaultApys: vaultApys || [],
    refreshVaultApys: fetchVaultApys,
    isLoadingVaultApys: isLoading,
    error,
  };
};

export default useVaultApys;
