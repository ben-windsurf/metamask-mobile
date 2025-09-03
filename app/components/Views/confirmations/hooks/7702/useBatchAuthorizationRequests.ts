import { Hex } from '@metamask/utils';
import { MultichainNetworkConfiguration } from '@metamask/multichain-network-controller';
import {
  TransactionMeta,
  TransactionStatus,
} from '@metamask/transaction-controller';
import { useSelector } from 'react-redux';

import { selectTransactions } from '../../../../../selectors/transactionController';

export type EIP7702NetworkConfiguration = MultichainNetworkConfiguration & {
  chainIdHex: Hex;
  isSupported: boolean;
  upgradeContractAddress?: Hex;
};

/**
 * Custom hook that checks for pending EIP-7702 authorization requests for a specific account and chain
 * Filters submitted transactions to find those with authorization lists from the specified account
 * @param {Hex} from - The account address to check for pending authorization requests
 * @param {Hex} chainId - The chain ID to filter transactions by
 * @returns {Object} Object containing hasPendingRequests boolean indicating if there are pending authorization requests
 */
export const useBatchAuthorizationRequests = (from: Hex, chainId: Hex) => {
  const transactions = useSelector(selectTransactions);

  const submittedRequestsOfChain = transactions.filter(
    (transaction: TransactionMeta) =>
      transaction.chainId === chainId &&
      transaction.status === TransactionStatus.submitted &&
      (transaction.txParams.authorizationList?.length ?? 0) > 0 &&
      transaction.txParams.from === from,
  );

  return { hasPendingRequests: submittedRequestsOfChain.length > 0 };
};
