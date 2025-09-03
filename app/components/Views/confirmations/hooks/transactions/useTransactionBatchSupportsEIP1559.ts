import {
  GasFeeEstimateType,
  TransactionBatchMeta,
} from '@metamask/transaction-controller';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../reducers';
import { checkNetworkAndAccountSupports1559 } from '../../../../../selectors/networkController';

/**
 * Custom hook that determines if a transaction batch supports EIP-1559 gas fee structure
 * Checks both network support for EIP-1559 and whether the transaction is using legacy gas estimates
 * @param {TransactionBatchMeta} transactionBatchMeta - Transaction batch metadata containing network and gas fee information
 * @returns {Object} Object containing supportsEIP1559 boolean indicating EIP-1559 support
 */
export function useTransactionBatchSupportsEIP1559(
  transactionBatchMeta: TransactionBatchMeta,
) {
  const { networkClientId } = transactionBatchMeta;
  const isLegacyTxn =
    transactionBatchMeta.gasFeeEstimates?.type === GasFeeEstimateType.Legacy ||
    transactionBatchMeta.gasFeeEstimates?.type === GasFeeEstimateType.GasPrice;
  const networkSupportsEIP1559 = useSelector((state: RootState) =>
    checkNetworkAndAccountSupports1559(state, networkClientId),
  );

  const supportsEIP1559 = networkSupportsEIP1559 && !isLegacyTxn;

  return { supportsEIP1559 };
}
