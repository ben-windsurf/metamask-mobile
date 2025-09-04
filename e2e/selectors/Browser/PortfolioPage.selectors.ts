/**
 * XPath selectors for Portfolio page elements in end-to-end tests
 */
export const PortfolioPageSelectorsXpath = {
  CLOSE_PRIVACY_MODAL: '//*[@aria-label="Close modal"]',
  ACCOUNT_ICON_HREF: '//a[@href="/settings/accounts"]',
} as const;

/**
 * Web ID selectors for Portfolio page elements in end-to-end tests
 */
export const PortfolioPageSelectorsWebID = {
  CONNECT_WALLET_BUTTON: 'connect-wallet-button',
  BURGER_MENU_BUTTON: 'dashboard-mobile-button',
} as const;

/**
 * Type definition for Portfolio page XPath selectors
 */
export type PortfolioPageSelectorsXpathType =
  typeof PortfolioPageSelectorsXpath;

/**
 * Type definition for Portfolio page Web ID selectors
 */
export type PortfolioPageSelectorsWebIDType =
  typeof PortfolioPageSelectorsWebID;
