import { useCallback } from 'react';
import { ChainId, PooledStakingContract } from '@metamask/stake-sdk';
import {
  TransactionParams,
  TransactionType,
  WalletDevice,
} from '@metamask/transaction-controller';
import { ORIGIN_METAMASK, toHex } from '@metamask/controller-utils';
import { formatEther } from 'ethers/lib/utils';
import { NetworkClientId } from '@metamask/network-controller';
import { addTransaction } from '../../../../../util/transaction-controller';
import trackErrorAsAnalytics from '../../../../../util/metrics/TrackError/trackErrorAsAnalytics';
import { MetaMetricsEvents, useMetrics } from '../../../../hooks/useMetrics';
import { Stake } from '../../sdk/stakeSdkProvider';
import { EVENT_PROVIDERS } from '../../constants/events';
import { useStakeContext } from '../useStakeContext';

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

/**
 * Generates transaction parameters for a staking deposit transaction
 * @param {string} valueWei - The deposit amount in wei
 * @param {string} activeAccountAddress - The address of the account making the deposit
 * @param {string} contractAddress - The staking contract address
 * @param {string} encodedDepositTransactionData - The encoded transaction data
 * @param {ChainId} chainId - The chain ID for the transaction
 * @returns {TransactionParams} The formatted transaction parameters
 */
const generateDepositTxParams = (
  valueWei: string,
  activeAccountAddress: string,
  contractAddress: string,
  encodedDepositTransactionData: string,
  chainId: ChainId,
): TransactionParams => ({
  to: contractAddress,
  from: activeAccountAddress,
  chainId: `0x${chainId}`,
  data: encodedDepositTransactionData,
  value: toHex(valueWei.toString()),
});

/**
 * Creates a function to attempt a staking deposit transaction
 * @param {PooledStakingContract} pooledStakingContract - The staking contract instance
 * @param {NetworkClientId} networkClientId - The network client identifier
 * @param {Function} trackEvent - Function to track analytics events
 * @param {Function} createEventBuilder - Function to create event builders for analytics
 * @returns {Function} Async function that executes the deposit transaction
 */
const attemptDepositTransaction =
  (
    pooledStakingContract: PooledStakingContract,
    networkClientId: NetworkClientId,
    trackEvent: ReturnType<typeof useMetrics>['trackEvent'],
    createEventBuilder: ReturnType<typeof useMetrics>['createEventBuilder'],
  ) =>
  /**
   * Executes a staking deposit transaction
   * @param {string} depositValueWei - The deposit amount in wei
   * @param {string} receiver - The address that can claim exited ETH
   * @param {string} referrer - Address to track referrals or deposits from different interfaces
   * @param {boolean} isRedesigned - Whether using the redesigned UI
   * @returns {Promise} Promise that resolves when transaction is submitted
   */
  async (
    depositValueWei: string,
    receiver: string, // the address that can claim exited ETH
    referrer: string = ZERO_ADDRESS, // any address to track referrals or deposits from different interfaces (can use zero address if not needed)
    isRedesigned: boolean = false,
  ) => {
    try {
      const gasLimit = await pooledStakingContract.estimateDepositGas(
        formatEther(depositValueWei),
        receiver,
        referrer,
      );

      const encodedDepositTransactionData =
        await pooledStakingContract.encodeDepositTransactionData(
          formatEther(depositValueWei),
          receiver,
          referrer,
          {
            gasLimit,
          },
        );

      const { data, chainId } = encodedDepositTransactionData;

      const txParams = generateDepositTxParams(
        depositValueWei,
        receiver,
        pooledStakingContract.contract.address,
        data,
        chainId,
      );

      if (isRedesigned) {
        trackEvent(
          createEventBuilder(MetaMetricsEvents.STAKE_TRANSACTION_INITIATED)
            .addProperties({
              is_redesigned: true,
              selected_provider: EVENT_PROVIDERS.CONSENSYS,
              transaction_amount_eth: formatEther(depositValueWei),
            })
            .build(),
        );
      }
      return await addTransaction(txParams, {
        deviceConfirmedOn: WalletDevice.MM_MOBILE,
        networkClientId,
        origin: ORIGIN_METAMASK,
        type: TransactionType.stakingDeposit,
      });
    } catch (e) {
      const errorMessage = (e as Error).message;
      trackErrorAsAnalytics('Pooled Staking Transaction Failed', errorMessage);
    }
  };

/**
 * Hook for managing pooled staking deposit transactions
 * Provides functionality to initiate staking deposits with proper gas estimation and analytics tracking
 * @returns {Object} Object containing attemptDepositTransaction function
 */
const usePoolStakedDeposit = () => {
  const { networkClientId, stakingContract } =
    useStakeContext() as Required<Stake>;
  const { trackEvent, createEventBuilder } = useMetrics();

  // Linter is complaining that function may use other dependencies
  // We will simply ignore since we don't want to use inline function
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedAttemptDepositTransaction = useCallback(() => {
    if (!stakingContract) return;
    return attemptDepositTransaction(
      stakingContract,
      networkClientId,
      trackEvent,
      createEventBuilder,
    );
  }, [stakingContract, networkClientId, trackEvent, createEventBuilder]);

  return {
    attemptDepositTransaction: memoizedAttemptDepositTransaction(),
  };
};

export default usePoolStakedDeposit;
