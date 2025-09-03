import { getAmount, getUsdAmount } from '../methods/common';

/**
 * Formats a token amount with its symbol for display in notifications
 * @param {Object} token - Token information object
 * @param {string} token.amount - The raw token amount
 * @param {string} token.decimals - Number of decimal places for the token
 * @param {string} token.symbol - Token symbol (e.g., 'ETH', 'USDC')
 * @returns {string} Formatted token amount with symbol (e.g., "1.5 ETH")
 */
export function getTokenAmount(token: {
  amount: string;
  decimals: string;
  symbol: string;
}) {
  return `${getAmount(token.amount, token.decimals, {
    shouldEllipse: true,
  })} ${token.symbol}`;
}

/**
 * Formats a token amount in USD for display in notifications
 * @param {Object} token - Token information object with USD value
 * @param {string} token.amount - The raw token amount
 * @param {string} token.decimals - Number of decimal places for the token
 * @param {string} token.usd - USD value per token unit
 * @returns {string} Formatted USD amount with dollar sign (e.g., "$150.25")
 */
export function getTokenUSDAmount(token: {
  amount: string;
  decimals: string;
  usd: string;
}) {
  return `$${getUsdAmount(token.amount, token.decimals, token.usd)}`;
}
