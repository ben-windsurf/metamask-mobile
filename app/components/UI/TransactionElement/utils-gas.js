import { isEIP1559Transaction } from '@metamask/transaction-controller';
import { sumHexWEIs } from '../../../util/conversions';
import { hexToBN, isBN, BNToHex, renderToGwei } from '../../../util/number';
import { calculateEIP1559GasFeeHexes } from '../../../util/transactions';

/**
 * Calculates the total gas cost for a transaction
 * Handles both legacy and EIP-1559 transactions, including multi-layer fees
 * @param {Object} transaction - The transaction object containing gas parameters
 * @param {string} transaction.gas - Gas limit in hex format
 * @param {string} transaction.gasPrice - Gas price in hex format (legacy transactions)
 * @param {string} transaction.gasUsed - Actual gas used in hex format
 * @param {string} transaction.estimatedBaseFee - Estimated base fee for EIP-1559
 * @param {string} transaction.maxPriorityFeePerGas - Max priority fee for EIP-1559
 * @param {string} transaction.maxFeePerGas - Max fee per gas for EIP-1559
 * @param {string} transaction.multiLayerL1FeeTotal - Additional L1 fees for multi-layer networks
 * @returns {Object} BigNumber representing the total gas cost
 */
export function calculateTotalGas(transaction) {
  const {
    gas,
    gasPrice,
    gasUsed,
    estimatedBaseFee,
    maxPriorityFeePerGas,
    maxFeePerGas,
    multiLayerL1FeeTotal,
  } = transaction;
  if (isEIP1559Transaction(transaction)) {
    const eip1559GasHex = calculateEIP1559GasFeeHexes({
      gasLimitHex: gasUsed || gas,
      estimatedBaseFeeHex: estimatedBaseFee || '0x0',
      suggestedMaxPriorityFeePerGasHex: maxPriorityFeePerGas,
      suggestedMaxFeePerGasHex: maxFeePerGas,
    });
    return hexToBN(eip1559GasHex.gasFeeMinHex);
  }
  const gasBN = hexToBN(gas);
  const gasPriceBN = hexToBN(gasPrice);
  const gasUsedBN = gasUsed ? hexToBN(gasUsed) : null;
  let totalGas = hexToBN('0x0');
  if (gasUsedBN && isBN(gasUsedBN) && isBN(gasPriceBN)) {
    totalGas = gasUsedBN.mul(gasPriceBN);
  }
  if (isBN(gasBN) && isBN(gasPriceBN)) {
    totalGas = gasBN.mul(gasPriceBN);
  }
  if (multiLayerL1FeeTotal) {
    totalGas = hexToBN(sumHexWEIs([BNToHex(totalGas), multiLayerL1FeeTotal]));
  }
  return totalGas;
}
/**
 * Renders the gas price in Gwei format for display
 * Handles both legacy and EIP-1559 transactions
 * @param {Object} transaction - The transaction object containing gas parameters
 * @param {string} transaction.gasPrice - Gas price in hex format (legacy transactions)
 * @param {string} transaction.estimatedBaseFee - Estimated base fee for EIP-1559
 * @param {string} transaction.maxFeePerGas - Max fee per gas for EIP-1559
 * @param {string} transaction.maxPriorityFeePerGas - Max priority fee for EIP-1559
 * @param {string} transaction.gas - Gas limit in hex format
 * @returns {string} Formatted gas price in Gwei
 */
export function renderGwei(transaction) {
  const {
    gasPrice,
    estimatedBaseFee,
    maxFeePerGas,
    maxPriorityFeePerGas,
    gas,
  } = transaction;

  if (isEIP1559Transaction(transaction)) {
    const eip1559GasHex = calculateEIP1559GasFeeHexes({
      gasLimitHex: gas,
      estimatedBaseFeeHex: estimatedBaseFee || '0x0',
      suggestedMaxPriorityFeePerGasHex: maxPriorityFeePerGas,
      suggestedMaxFeePerGasHex: maxFeePerGas,
    });

    return renderToGwei(
      eip1559GasHex.estimatedBaseFee_PLUS_suggestedMaxPriorityFeePerGasHex,
    );
  }
  return renderToGwei(gasPrice);
}
