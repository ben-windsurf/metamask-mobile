import { remove0x, add0x } from '@metamask/utils';
import { hexToBN } from '@metamask/controller-utils';
import { updateEditableParams } from '../../../../../../util/transaction-controller';

/**
 * Updates a transaction to use the maximum possible value based on account balance and gas fees
 * Calculates the maximum transaction value by subtracting gas fees from account balance
 * @param {Object} params - The transaction update parameters
 * @param {string} params.transactionId - The ID of the transaction to update
 * @param {boolean} params.isEIP1559Transaction - Whether this is an EIP-1559 transaction
 * @param {Object} params.EIP1559GasTransaction - EIP-1559 gas transaction data
 * @param {string} params.EIP1559GasTransaction.gasFeeMaxHex - Maximum gas fee in hex for EIP-1559
 * @param {Object} params.legacyGasTransaction - Legacy gas transaction data
 * @param {string} params.legacyGasTransaction.gasFeeMaxHex - Maximum gas fee in hex for legacy
 * @param {string} params.accountBalance - Current account balance in hex
 * @param {Function} params.setTransactionValue - Function to set the transaction value
 * @returns {Promise<void>} Promise that resolves when transaction is updated
 */
export const updateTransactionToMaxValue = async ({
  transactionId,
  isEIP1559Transaction,
  EIP1559GasTransaction,
  legacyGasTransaction,
  accountBalance,
  setTransactionValue,
}: {
  transactionId: string;
  isEIP1559Transaction: boolean;
  EIP1559GasTransaction: {
    gasFeeMaxHex: string;
  };
  legacyGasTransaction: {
    gasFeeMaxHex: string;
  };
  accountBalance: string;
  setTransactionValue: (value: string) => void;
}) => {
  const { gasFeeMaxHex } = isEIP1559Transaction
    ? EIP1559GasTransaction
    : legacyGasTransaction;

  const accountBalanceBN = hexToBN(remove0x(accountBalance));
  const transactionFeeMax = hexToBN(gasFeeMaxHex);

  const maxTransactionValueBN = accountBalanceBN.sub(transactionFeeMax);

  if (maxTransactionValueBN.lt(hexToBN('0x0'))) {
    return;
  }

  const maxTransactionValueHex = add0x(maxTransactionValueBN.toString(16));

  if (transactionId) {
    await updateEditableParams(transactionId, {
      value: maxTransactionValueHex,
    });
  }

  setTransactionValue(maxTransactionValueHex);
};
