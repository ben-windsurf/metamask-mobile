import { renderFromWei, hexToBN } from '../../../../../../util/number';
import {
  getTicker,
  decodeTransferData,
} from '../../../../../../util/transactions';
import { strings } from '../../../../../../../locales/i18n';
import type BN4 from 'bnjs4';

interface SelectedAsset {
  address: string;
  decimals: string;
  symbol: string;
}

/**
 * Generates an insufficient balance error message for transaction validation
 * Calculates the shortfall amount and formats it with the appropriate token symbol
 * @param {BN4} weiBalance - Current wallet balance in wei
 * @param {BN4} transactionValue - Transaction amount in wei
 * @param {string} ticker - Token ticker symbol
 * @returns {string} Localized insufficient balance error message
 */
export const generateInsufficientBalanceMessage = (
  weiBalance: BN4,
  transactionValue: BN4,
  ticker: string,
) => {
  const amount = renderFromWei(transactionValue.sub(weiBalance));
  const tokenSymbol = getTicker(ticker);
  return strings('transaction.insufficient_amount', {
    amount,
    tokenSymbol,
  });
};

/**
 * Validates if the wallet balance is sufficient for a transaction
 * Checks if balance is greater than or equal to transaction value and not zero
 * @param {BN4} weiBalance - Current wallet balance in wei
 * @param {BN4} transactionValue - Transaction amount in wei
 * @returns {boolean} True if balance is insufficient, false if sufficient
 */
export const validateBalance = (weiBalance: BN4, transactionValue: BN4) =>
  !weiBalance.gte(transactionValue) || weiBalance.isZero();

/**
 * Validates if the user has sufficient token balance for an ERC-20 token transfer
 * Decodes transaction data to extract transfer amount and compares with token balance
 * @param {Object} transaction - Transaction object containing encoded data
 * @param {string} transaction.data - Encoded transaction data
 * @param {Object} contractBalances - Map of contract addresses to token balances
 * @param {SelectedAsset} selectedAsset - Selected token asset information
 * @returns {string|undefined} Error message if insufficient balance, undefined if sufficient
 */
export const validateSufficientTokenBalance = (
  transaction: {
    data: string;
  },
  contractBalances: { [key: string]: string },
  selectedAsset: SelectedAsset,
) => {
  const [, , amount] = decodeTransferData('transfer', transaction.data);
  const tokenBalance = hexToBN(contractBalances[selectedAsset.address]);
  const weiInput = hexToBN(amount);

  if (!tokenBalance.gte(weiInput)) {
    return strings('transaction.insufficient_tokens', {
      token: selectedAsset.symbol,
    });
  }

  return undefined;
};

/**
 * Validates if the wallet has sufficient balance for the total transaction cost
 * Includes both transaction value and gas fees in the validation
 * @param {string} weiBalance - Current wallet balance in wei as hex string
 * @param {string} totalTransactionValue - Total transaction cost including gas in wei as hex string
 * @param {string} ticker - Token ticker symbol for error message
 * @returns {string|undefined} Error message if insufficient balance, undefined if sufficient
 */
export const validateSufficientBalance = (
  weiBalance: string,
  totalTransactionValue: string,
  ticker: string,
) => {
  const weiBalanceBN = hexToBN(weiBalance);
  const totalTransactionValueBN = hexToBN(totalTransactionValue);

  if (validateBalance(weiBalanceBN, totalTransactionValueBN)) {
    return generateInsufficientBalanceMessage(
      weiBalanceBN,
      totalTransactionValueBN,
      ticker,
    );
  }
  return undefined;
};
