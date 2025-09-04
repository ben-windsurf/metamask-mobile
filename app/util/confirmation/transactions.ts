/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  GAS_ESTIMATE_TYPES,
  GasEstimateType,
} from '@metamask/gas-fee-controller';
import {
  TransactionEnvelopeType,
  TransactionParams,
} from '@metamask/transaction-controller';
import { addHexPrefix, safeBNToHex } from '../number';
import { safeToChecksumAddress } from '../address';

/**
 * Builds transaction parameters for submission to the network.
 * Handles both EIP-1559 (fee market) and legacy transaction types,
 * applying appropriate gas pricing and formatting.
 *
 * @param params - Configuration object for building transaction parameters
 * @param params.gasDataEIP1559 - EIP-1559 gas data including base fee and priority fee
 * @param params.gasDataLegacy - Legacy gas data with gas price and limit
 * @param params.gasEstimateType - Type of gas estimation being used
 * @param params.showCustomNonce - Whether to include custom nonce in transaction
 * @param params.transaction - Base transaction object to build from
 * @returns Formatted transaction parameters ready for network submission
 */
export function buildTransactionParams({
  gasDataEIP1559,
  gasDataLegacy,
  gasEstimateType,
  showCustomNonce,
  transaction,
}: {
  gasDataEIP1559: any;
  gasDataLegacy: any;
  gasEstimateType: GasEstimateType;
  showCustomNonce: boolean;
  transaction: any;
}): TransactionParams {
  const transactionParams: TransactionParams = { ...transaction };
  const { nonce, value } = transaction;
  const { type } = transactionParams;

  transactionParams.from = safeToChecksumAddress(transaction.from) as string;
  transactionParams.nonce = showCustomNonce ? safeBNToHex(nonce) : undefined;
  transactionParams.to = safeToChecksumAddress(transaction.to);
  transactionParams.value = safeBNToHex(value);

  if (
    gasEstimateType === GAS_ESTIMATE_TYPES.FEE_MARKET &&
    type !== TransactionEnvelopeType.legacy
  ) {
    const {
      estimatedBaseFeeHex,
      gasLimitHex,
      suggestedMaxFeePerGasHex,
      suggestedMaxPriorityFeePerGasHex,
    } = gasDataEIP1559;

    transactionParams.gas = addHexPrefix(gasLimitHex);
    transactionParams.gasPrice = undefined;
    transactionParams.maxFeePerGas = addHexPrefix(suggestedMaxFeePerGasHex);
    transactionParams.maxPriorityFeePerGas = addHexPrefix(
      suggestedMaxPriorityFeePerGasHex,
    );
    transactionParams.estimatedBaseFee = addHexPrefix(estimatedBaseFeeHex);
  } else {
    const { suggestedGasLimitHex, suggestedGasPriceHex } = gasDataLegacy;

    transactionParams.gas = addHexPrefix(suggestedGasLimitHex);
    transactionParams.gasPrice = addHexPrefix(suggestedGasPriceHex);
    transactionParams.maxFeePerGas = undefined;
    transactionParams.maxPriorityFeePerGas = undefined;
  }

  return transactionParams;
}
