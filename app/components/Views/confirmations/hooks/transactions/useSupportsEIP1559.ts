import { useSelector } from 'react-redux';
import {
  TransactionEnvelopeType,
  TransactionMeta,
} from '@metamask/transaction-controller';

import { checkNetworkAndAccountSupports1559 } from '../../../../../selectors/networkController';
import { RootState } from '../../../../../reducers';

/**
 * Custom hook that determines if a transaction supports EIP-1559 fee structure
 * Checks both network support for EIP-1559 and whether the transaction is not a legacy type
 * @param {TransactionMeta} transactionMeta - Transaction metadata containing network and type information
 * @returns {Object} Object containing supportsEIP1559 boolean indicating EIP-1559 support
 */
export function useSupportsEIP1559(transactionMeta: TransactionMeta) {
  const { networkClientId } = transactionMeta;
  const isLegacyTxn =
    transactionMeta?.txParams?.type === TransactionEnvelopeType.legacy;
  const networkSupportsEIP1559 = useSelector((state: RootState) =>
    checkNetworkAndAccountSupports1559(state, networkClientId),
  );

  const supportsEIP1559 = networkSupportsEIP1559 && !isLegacyTxn;

  return { supportsEIP1559 };
}
