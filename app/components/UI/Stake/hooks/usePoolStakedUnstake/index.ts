import { PooledStakingContract, ChainId } from '@metamask/stake-sdk';
import { useStakeContext } from '../useStakeContext';
import {
  TransactionParams,
  TransactionType,
  WalletDevice,
} from '@metamask/transaction-controller';
import { addTransaction } from '../../../../../util/transaction-controller';
import { ORIGIN_METAMASK } from '@metamask/controller-utils';
import trackErrorAsAnalytics from '../../../../../util/metrics/TrackError/trackErrorAsAnalytics';
import useBalance from '../useBalance';
import { Stake } from '../../sdk/stakeSdkProvider';
import { NetworkClientId } from '@metamask/network-controller';

/**
 * Generates transaction parameters for unstaking operations
 * @param {string} activeAccountAddress - The address of the account performing the unstake
 * @param {string} contractAddress - The address of the staking contract
 * @param {string} encodedUnstakeTransactionData - The encoded transaction data for unstaking
 * @param {ChainId} chainId - The chain ID for the transaction
 * @returns {TransactionParams} Transaction parameters object for the unstake operation
 */
const generateUnstakeTxParams = (
  activeAccountAddress: string,
  contractAddress: string,
  encodedUnstakeTransactionData: string,
  chainId: ChainId,
): TransactionParams => ({
  to: contractAddress,
  from: activeAccountAddress,
  chainId: `0x${chainId}`,
  data: encodedUnstakeTransactionData,
  value: '0',
});

/**
 * Creates a function to attempt an unstake transaction
 * @param {PooledStakingContract | null} pooledStakingContract - The pooled staking contract instance
 * @param {string} stakedBalanceWei - The total staked balance in wei
 * @param {NetworkClientId} networkClientId - The network client identifier
 * @returns {Function} Async function that executes the unstake transaction
 */
const attemptUnstakeTransaction =
  (
    pooledStakingContract: PooledStakingContract | null,
    stakedBalanceWei: string,
    networkClientId: NetworkClientId,
  ) =>
  /**
   * Executes an unstake transaction for the specified amount
   * @param {string} valueWei - The amount to unstake in wei
   * @param {string} receiver - The user address attempting to unstake
   * @returns {Promise<any>} The transaction result or undefined if failed
   */
  // Note: receiver is the user address attempting to unstake.
  async (valueWei: string, receiver: string) => {
    try {
      if (!pooledStakingContract)
        throw new Error('Pooled staking contract not found');

      // STAKE-871: if we are unstaking the total assets we send the total shares
      // the user has in the vault through getShares contract method avoiding the
      // case where contract level rounding error causes 1 wei dust to be left
      // when converting assets to shares and attempting to unstake all assets
      let shares;
      if (valueWei === stakedBalanceWei) {
        shares = await pooledStakingContract.getShares(receiver);
      } else {
        shares = await pooledStakingContract.convertToShares(valueWei);
      }

      const gasLimit = await pooledStakingContract.estimateEnterExitQueueGas(
        shares.toString(),
        receiver,
      );

      const { data, chainId } =
        await pooledStakingContract.encodeEnterExitQueueTransactionData(
          shares,
          receiver,
          { gasLimit },
        );

      const txParams = generateUnstakeTxParams(
        receiver,
        pooledStakingContract.contract.address,
        data,
        chainId,
      );

      return await addTransaction(txParams, {
        deviceConfirmedOn: WalletDevice.MM_MOBILE,
        networkClientId,
        origin: ORIGIN_METAMASK,
        type: TransactionType.stakingUnstake,
      });
    } catch (e) {
      const errorMessage = (e as Error).message;
      trackErrorAsAnalytics(
        'Pooled Staking Unstake Transaction Failed',
        errorMessage,
      );
    }
  };

/**
 * Hook for managing pooled staking unstake operations
 * Provides functionality to attempt unstake transactions with proper error handling
 * @returns {Object} Object containing attemptUnstakeTransaction function
 */
const usePoolStakedUnstake = () => {
  const { networkClientId, stakingContract } =
    useStakeContext() as Required<Stake>;

  const { stakedBalanceWei } = useBalance();

  return {
    attemptUnstakeTransaction: attemptUnstakeTransaction(
      stakingContract,
      stakedBalanceWei,
      networkClientId,
    ),
  };
};

export default usePoolStakedUnstake;
