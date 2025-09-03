import { Hex, add0x } from '@metamask/utils';
import { decimalToHex, multiplyHexes } from '../../../../../util/conversions';
import { useTransactionMetadataRequest } from '../transactions/useTransactionMetadataRequest';

/**
 * Custom hook that calculates the maximum gas cost for a transaction
 * Computes the maximum possible gas cost by multiplying gas limit with the higher of maxFeePerGas or gasPrice
 * Used in confirmation views to display the maximum amount that could be charged for gas
 * @returns {string | undefined} The maximum gas cost as a hex string, or undefined if no transaction metadata
 */
export const useTransactionMaxGasCost = () => {
  const transactionMetadata = useTransactionMetadataRequest();

  if (!transactionMetadata) {
    return undefined;
  }

  const { txParams } = transactionMetadata;
  const { maxFeePerGas, gas, gasPrice } = txParams;

  return add0x(
    multiplyHexes(
      maxFeePerGas ? (decimalToHex(maxFeePerGas) as Hex) : (gasPrice as Hex),
      gas as Hex,
    ),
  );
};
