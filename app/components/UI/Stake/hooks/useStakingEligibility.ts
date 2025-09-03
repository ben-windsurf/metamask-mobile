import { useSelector } from 'react-redux';
import { useState } from 'react';
import { pooledStakingSelectors } from '../../../../selectors/earnController';
import Engine from '../../../../core/Engine';

/**
 * Custom hook for managing staking eligibility state and operations
 * Provides access to eligibility status, loading state, and refresh functionality
 * @returns {Object} Object containing eligibility data and control functions
 * @returns {boolean} returns.isEligible - Whether the user is eligible for staking
 * @returns {boolean} returns.isLoadingEligibility - Whether eligibility is being fetched
 * @returns {string | null} returns.error - Error message if eligibility fetch failed
 * @returns {Function} returns.refreshPooledStakingEligibility - Function to refresh eligibility data
 */
const useStakingEligibility = () => {
  const isEligible = useSelector(pooledStakingSelectors.selectEligibility);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStakingEligibility = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await Engine.context.EarnController.refreshEarnEligibility();
    } catch (err) {
      setError('Failed to fetch pooled staking eligibility');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isEligible,
    isLoadingEligibility: isLoading,
    error,
    refreshPooledStakingEligibility: fetchStakingEligibility,
  };
};

export default useStakingEligibility;
