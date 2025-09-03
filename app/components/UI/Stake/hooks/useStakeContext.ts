import { useContext } from 'react';
import { StakeContext } from '../sdk/stakeSdkProvider';

/**
 * Custom hook to access the StakeContext
 * Provides access to staking-related state and functions from the StakeProvider
 * @returns {Object} The stake context object containing staking state and methods
 * @throws {Error} Throws an error if used outside of a StakeProvider
 */
export const useStakeContext = () => {
  const context = useContext(StakeContext);
  if (!context) {
    throw new Error('useStakeContext must be used within a StakeProvider');
  }
  return context;
};
