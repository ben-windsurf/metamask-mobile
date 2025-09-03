import { ChainId, PooledStakeExitRequest } from '@metamask/stake-sdk';
import { BigNumber } from 'ethers';
import { MultiCallData } from './usePoolStakedClaim.types';
import { TransactionParams } from '@metamask/transaction-controller';
import { toHex } from '@metamask/controller-utils';

const TWENTY_FOUR_HOURS_IN_SECONDS = 86400;
const CLAIM_EXITED_ASSETS = 'claimExitedAssets';

/**
 * Checks if 24 hours have passed since the given timestamp
 * @param {string} timestamp - The timestamp to check against (in milliseconds)
 * @returns {boolean} True if 24 hours have passed, false otherwise
 */
export const have24HoursPassed = (timestamp: string) => {
  const current = Math.floor(Number(new Date().getTime() / 1000));
  const timestampInSeconds = Math.floor(Number(timestamp) / 1000);

  const difference = Number(current) - Number(timestampInSeconds);

  return difference > TWENTY_FOUR_HOURS_IN_SECONDS;
};

/**
 * Determines if an exit request is claimable based on queue index and time elapsed
 * @param {string} exitQueueIndex - The exit queue index to validate
 * @param {string} timestamp - The timestamp when the exit request was made
 * @returns {boolean} True if the request is claimable, false otherwise
 */
export const isRequestClaimable = (
  exitQueueIndex: string,
  timestamp: string,
) => {
  const isValidExitQueueIndex = exitQueueIndex && exitQueueIndex !== '-1';
  return isValidExitQueueIndex && have24HoursPassed(timestamp);
};

/**
 * Transforms claimable exit requests into multicall arguments for batch claiming
 * @param {PooledStakeExitRequest[]} exitRequests - Array of exit requests to process
 * @returns {MultiCallData} Array of multicall data for claimable exit requests
 */
export const transformAggregatedClaimableExitRequestToMulticallArgs = (
  exitRequests: PooledStakeExitRequest[],
): MultiCallData => {
  const result: MultiCallData = [];

  for (const { positionTicket, timestamp, exitQueueIndex } of exitRequests) {
    // claimExitedAssets rules: https://docs.google.com/document/d/1LJYXaTxdOaze8F7PwgJDG10yWw9xW0Vqinq2Nyn2Hp4/edit?tab=t.0#heading=h.a8yj0zi6pn8h
    if (!isRequestClaimable(exitQueueIndex, timestamp)) continue;

    const claim = {
      functionName: CLAIM_EXITED_ASSETS,
      args: [
        BigNumber.from(positionTicket).toString(),
        // Convert timestamp from milliseconds to seconds.
        BigNumber.from(timestamp).div(1000).toString(),
        BigNumber.from(exitQueueIndex).toString(),
      ],
    };

    result.push(claim);
  }

  return result;
};

/**
 * Generates transaction parameters for claiming staked assets
 * @param {string} activeAccountAddress - The address of the active account
 * @param {string} contractAddress - The contract address to interact with
 * @param {string} encodedClaimTransactionData - The encoded transaction data
 * @param {ChainId} chainId - The chain ID for the transaction
 * @param {string} gasLimit - The gas limit for the transaction
 * @returns {TransactionParams} Transaction parameters object
 */
export const generateClaimTxParams = (
  activeAccountAddress: string,
  contractAddress: string,
  encodedClaimTransactionData: string,
  chainId: ChainId,
  gasLimit: string,
): TransactionParams => ({
  to: contractAddress,
  from: activeAccountAddress,
  chainId: `0x${chainId}`,
  data: encodedClaimTransactionData,
  value: '0',
  gas: toHex(gasLimit),
});
