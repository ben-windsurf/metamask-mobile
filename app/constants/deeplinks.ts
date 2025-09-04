/**
 * Ethereum action types for deep link handling
 */
export enum ETH_ACTIONS {
  TRANSFER = 'transfer',
  APPROVE = 'approve',
}

/**
 * Supported protocols for deep link parsing and handling
 */
export enum PROTOCOLS {
  HTTP = 'http',
  HTTPS = 'https',
  WC = 'wc',
  ETHEREUM = 'ethereum',
  DAPP = 'dapp',
  METAMASK = 'metamask',
}

/**
 * Available deep link actions that can be triggered from external sources
 */
export enum ACTIONS {
  DAPP = 'dapp',
  SEND = 'send',
  APPROVE = 'approve',
  PAYMENT = 'payment',
  FOCUS = 'focus',
  WC = 'wc',
  CONNECT = 'connect',
  MMSDK = 'mmsdk',
  ANDROID_SDK = 'bind',
  BUY = 'buy',
  BUY_CRYPTO = 'buy-crypto',
  SELL = 'sell',
  SELL_CRYPTO = 'sell-crypto',
  HOME = 'home',
  SWAP = 'swap',
  EMPTY = '',
  OAUTH_REDIRECT = 'oauth-redirect',
}

/**
 * URL prefixes mapped to each deep link action type for proper URL construction
 */
export const PREFIXES = {
  [ACTIONS.DAPP]: 'https://',
  [ACTIONS.SEND]: 'ethereum:',
  [ACTIONS.APPROVE]: 'ethereum:',
  [ACTIONS.FOCUS]: '',
  [ACTIONS.EMPTY]: '',
  [ACTIONS.PAYMENT]: '',
  [ACTIONS.WC]: '',
  [ACTIONS.CONNECT]: '',
  [ACTIONS.ANDROID_SDK]: '',
  [ACTIONS.BUY]: '',
  [ACTIONS.SELL]: '',
  [ACTIONS.BUY_CRYPTO]: '',
  [ACTIONS.SELL_CRYPTO]: '',
  [ACTIONS.OAUTH_REDIRECT]: '',
  [ACTIONS.HOME]: '',
  [ACTIONS.SWAP]: '',
  METAMASK: 'metamask://',
};
