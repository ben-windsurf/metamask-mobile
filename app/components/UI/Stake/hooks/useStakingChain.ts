import { CaipChainId, Hex } from '@metamask/utils';
import { useSelector } from 'react-redux';
import { getDecimalChainId } from '../../../../util/networks';
import { selectEvmChainId } from '../../../../selectors/networkController';
import { isSupportedPooledStakingChain } from '@metamask/earn-controller';

/**
 * Hook to check if the current chain supports staking
 * @returns {Object} Object containing staking support status for current chain
 * @returns {boolean} returns.isStakingSupportedChain - Whether the current chain supports pooled staking
 */
const useStakingChain = () => {
  const chainId = useSelector(selectEvmChainId);

  const isStakingSupportedChain = isSupportedPooledStakingChain(
    getDecimalChainId(chainId),
  );

  return {
    isStakingSupportedChain,
  };
};

/**
 * Hook to check if a specific chain supports staking
 * @param {Hex | CaipChainId} chainId - The chain ID to check for staking support
 * @returns {Object} Object containing staking support status for the specified chain
 * @returns {boolean} returns.isStakingSupportedChain - Whether the specified chain supports pooled staking
 */
export const useStakingChainByChainId = (chainId: Hex | CaipChainId) => {
  const isStakingSupportedChain = isSupportedPooledStakingChain(
    getDecimalChainId(chainId),
  );

  return {
    isStakingSupportedChain,
  };
};

export default useStakingChain;
