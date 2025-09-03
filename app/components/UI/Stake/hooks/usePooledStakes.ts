import { useMemo, useState } from 'react';
import { PooledStake } from '@metamask/stake-sdk';
import Engine from '../../../../core/Engine';
import { useSelector } from 'react-redux';
import { pooledStakingSelectors } from '../../../../selectors/earnController';

export enum StakeAccountStatus {
  // These statuses are only used internally rather than displayed to a user
  ACTIVE = 'ACTIVE', // non-zero staked shares
  NEVER_STAKED = 'NEVER_STAKED',
  INACTIVE_WITH_EXIT_REQUESTS = 'INACTIVE_WITH_EXIT_REQUESTS', // zero staked shares, unstaking or claimable exit requests
  INACTIVE_WITH_REWARDS_ONLY = 'INACTIVE_WITH_REWARDS_ONLY', // zero staked shares, no exit requests, previous lifetime rewards
}

/**
 * Custom hook for managing pooled staking data and operations
 * Provides access to pooled stakes data, exchange rates, and status information
 * @param {number} chainId - The chain ID to fetch pooled stakes data for
 * @returns {Object} Object containing pooled stakes data, loading state, error state, and status flags
 */
const usePooledStakes = (chainId: number) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { selectPoolStakesForChain, selectExchangeRateForChain } =
    pooledStakingSelectors;

  const pooledStakesData = useSelector(selectPoolStakesForChain(chainId));
  const exchangeRate = useSelector(selectExchangeRateForChain(chainId));

  /**
   * Fetches fresh pooled stakes data from the EarnController
   * Resets cache and updates loading/error states during the operation
   */
  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await Engine.context.EarnController.refreshPooledStakes({
        resetCache: true,
      });
    } catch (err) {
      setError('Failed to fetch pooled stakes');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Determines the status of a pooled stake based on assets and exit requests
   * @param {PooledStake} stake - The pooled stake object to analyze
   * @returns {StakeAccountStatus} The determined status of the stake account
   */
  const getStatus = (stake: PooledStake) => {
    if (stake.assets === '0' && stake.exitRequests.length > 0) {
      return StakeAccountStatus.INACTIVE_WITH_EXIT_REQUESTS;
    } else if (stake.assets === '0' && stake.lifetimeRewards !== '0') {
      return StakeAccountStatus.INACTIVE_WITH_REWARDS_ONLY;
    } else if (stake.assets === '0') {
      return StakeAccountStatus.NEVER_STAKED;
    }
    return StakeAccountStatus.ACTIVE;
  };

  const statusFlags = useMemo(() => {
    const currentStatus = pooledStakesData
      ? getStatus(pooledStakesData)
      : StakeAccountStatus.NEVER_STAKED;

    return {
      hasStakedPositions:
        currentStatus === StakeAccountStatus.ACTIVE ||
        currentStatus === StakeAccountStatus.INACTIVE_WITH_EXIT_REQUESTS,
      hasRewards:
        currentStatus === StakeAccountStatus.INACTIVE_WITH_REWARDS_ONLY ||
        currentStatus === StakeAccountStatus.ACTIVE,
      hasRewardsOnly:
        currentStatus === StakeAccountStatus.INACTIVE_WITH_REWARDS_ONLY,
      hasNeverStaked: currentStatus === StakeAccountStatus.NEVER_STAKED,
      hasEthToUnstake: currentStatus === StakeAccountStatus.ACTIVE,
    };
  }, [pooledStakesData]);

  return {
    pooledStakesData,
    exchangeRate,
    isLoadingPooledStakesData: isLoading,
    error,
    refreshPooledStakes: fetchData,
    ...statusFlags,
  };
};

export default usePooledStakes;
