import AppConstants from '../../../core/AppConstants';

/**
 * Gets the appropriate avatar URL for a token, with special handling for ETH
 * @param {Object} token - Token object containing address, symbol, and iconUrl
 * @param {string} token.address - The token contract address
 * @param {string} token.symbol - The token symbol
 * @param {string} token.iconUrl - The token's icon URL
 * @returns {string} The URL to use for the token's avatar image
 */
export function getTokenAvatarUrl(token: {
  address: string;
  symbol: string;
  iconUrl: string;
}) {
  return token.address === AppConstants.ZERO_ADDRESS && token.symbol === 'ETH'
    ? 'https://raw.githubusercontent.com/MetaMask/metamask-mobile/main/app/images/eth-logo-new.png'
    : token.iconUrl;
}
