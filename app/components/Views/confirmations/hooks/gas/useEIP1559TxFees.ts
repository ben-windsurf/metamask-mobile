import { useMemo } from 'react';
import { TransactionMeta } from '@metamask/transaction-controller';

import { hexToDecimal } from '../../../../../util/conversions';

/**
 * Custom hook that extracts and converts EIP-1559 transaction fee parameters from hex to decimal
 * Used in confirmation views to display gas fees in a human-readable format
 * @param {TransactionMeta} transactionMeta - Transaction metadata containing EIP-1559 fee parameters
 * @returns {Object} Object containing maxFeePerGas and maxPriorityFeePerGas as decimal strings
 */
export const useEIP1559TxFees = (
  transactionMeta: TransactionMeta,
): {
  maxFeePerGas: string;
  maxPriorityFeePerGas: string;
} => {
  const hexMaxFeePerGas = transactionMeta?.txParams?.maxFeePerGas;
  const hexMaxPriorityFeePerGas =
    transactionMeta?.txParams?.maxPriorityFeePerGas;

  return useMemo(() => {
    const maxFeePerGas = hexMaxFeePerGas
      ? hexToDecimal(hexMaxFeePerGas).toString()
      : '0';
    const maxPriorityFeePerGas = hexMaxPriorityFeePerGas
      ? hexToDecimal(hexMaxPriorityFeePerGas).toString()
      : '0';

    return { maxFeePerGas, maxPriorityFeePerGas };
  }, [hexMaxFeePerGas, hexMaxPriorityFeePerGas]);
};
