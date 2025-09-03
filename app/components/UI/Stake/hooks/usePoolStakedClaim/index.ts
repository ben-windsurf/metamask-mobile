import { PooledStake, PooledStakingContract } from '@metamask/stake-sdk';
import { useStakeContext } from '../useStakeContext';
import trackErrorAsAnalytics from '../../../../../util/metrics/TrackError/trackErrorAsAnalytics';
import {
  TransactionType,
  WalletDevice,
} from '@metamask/transaction-controller';
import { addTransaction } from '../../../../../util/transaction-controller';
import { ORIGIN_METAMASK } from '@metamask/controller-utils';
import {
  generateClaimTxParams,
  isRequestClaimable,
  transformAggregatedClaimableExitRequestToMulticallArgs,
} from './utils';
import { NetworkClientId } from '@metamask/network-controller';
import { Stake } from '../../sdk/stakeSdkProvider';

/**
 * Attempts to create a multi-call claim transaction for multiple exit requests
 * @param {PooledStake} pooledStakesData - The pooled stakes data containing exit requests
 * @param {PooledStakingContract} poolStakingContract - The staking contract instance
 * @param {string} activeAccountAddress - The active account address
 * @param {NetworkClientId} networkClientId - The network client ID
 * @returns {Promise} Promise that resolves to the transaction result
 */
const attemptMultiCallClaimTransaction = async (
  pooledStakesData: PooledStake,
  poolStakingContract: PooledStakingContract,
  activeAccountAddress: string,
  networkClientId: NetworkClientId,
) => {
  const multiCallData = transformAggregatedClaimableExitRequestToMulticallArgs(
    pooledStakesData.exitRequests,
  );

  const gasLimit = await poolStakingContract.estimateMulticallGas(
    multiCallData,
    activeAccountAddress,
  );

  const { data, chainId } =
    await poolStakingContract.encodeMulticallTransactionData(
      multiCallData,
      activeAccountAddress,
      { gasLimit },
    );

  const txParams = generateClaimTxParams(
    activeAccountAddress,
    poolStakingContract.contract.address,
    data,
    chainId,
    gasLimit.toString(),
  );

  return addTransaction(txParams, {
    deviceConfirmedOn: WalletDevice.MM_MOBILE,
    networkClientId,
    origin: ORIGIN_METAMASK,
    type: TransactionType.stakingClaim,
  });
};

/**
 * Attempts to create a single claim transaction for one exit request
 * @param {PooledStake} pooledStakesData - The pooled stakes data containing exit requests
 * @param {PooledStakingContract} poolStakingContract - The staking contract instance
 * @param {string} activeAccountAddress - The active account address
 * @param {NetworkClientId} networkClientId - The network client ID
 * @returns {Promise} Promise that resolves to the transaction result
 */
const attemptSingleClaimTransaction = async (
  pooledStakesData: PooledStake,
  poolStakingContract: PooledStakingContract,
  activeAccountAddress: string,
  networkClientId: NetworkClientId,
) => {
  const { positionTicket, timestamp, exitQueueIndex } =
    pooledStakesData.exitRequests[0];

  if (!isRequestClaimable(exitQueueIndex, timestamp)) return;

  const gasLimit = await poolStakingContract.estimateClaimExitedAssetsGas(
    positionTicket,
    timestamp,
    exitQueueIndex,
    activeAccountAddress,
  );

  const { data, chainId } =
    await poolStakingContract.encodeClaimExitedAssetsTransactionData(
      positionTicket,
      timestamp,
      exitQueueIndex,
      activeAccountAddress,
      {
        gasLimit,
      },
    );

  const txParams = generateClaimTxParams(
    activeAccountAddress,
    poolStakingContract.contract.address,
    data,
    chainId,
    gasLimit.toString(),
  );

  return addTransaction(txParams, {
    deviceConfirmedOn: WalletDevice.MM_MOBILE,
    networkClientId,
    origin: ORIGIN_METAMASK,
    type: TransactionType.stakingClaim,
  });
};

/**
 * Creates a curried function for attempting pool staked claim transactions
 * @param {PooledStakingContract} poolStakingContract - The staking contract instance
 * @param {NetworkClientId} networkClientId - The network client ID
 * @returns {Function} Function that takes activeAccountAddress and pooledStakesData to execute claim
 */
const attemptPoolStakedClaimTransaction =
  (
    poolStakingContract: PooledStakingContract,
    networkClientId: NetworkClientId,
  ) =>
  async (activeAccountAddress: string, pooledStakesData: PooledStake) => {
    try {
      if (pooledStakesData.exitRequests.length === 0) return;

      const isMultiCallClaim = pooledStakesData.exitRequests.length > 1;

      return isMultiCallClaim
        ? await attemptMultiCallClaimTransaction(
            pooledStakesData,
            poolStakingContract,
            activeAccountAddress,
            networkClientId,
          )
        : await attemptSingleClaimTransaction(
            pooledStakesData,
            poolStakingContract,
            activeAccountAddress,
            networkClientId,
          );
    } catch (e) {
      const errorMessage = (e as Error).message;
      trackErrorAsAnalytics(
        'Pooled Staking Claim Transaction Failed',
        errorMessage,
      );
    }
  };

/**
 * Custom hook for handling pooled staking claim transactions
 * Provides functionality to claim exited staking assets from pooled staking contracts
 * @returns {Object} Object containing attemptPoolStakedClaimTransaction function
 */
const usePoolStakedClaim = () => {
  const { networkClientId, stakingContract } =
    useStakeContext() as Required<Stake>;

  return {
    attemptPoolStakedClaimTransaction: attemptPoolStakedClaimTransaction(
      stakingContract as PooledStakingContract,
      networkClientId,
    ),
  };
};

export default usePoolStakedClaim;
