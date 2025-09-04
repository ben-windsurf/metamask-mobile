/**
 * Selectors for the Request Payment view in end-to-end tests.
 * Contains element IDs and selectors used to interact with the request payment screen.
 */
export const RequestPaymentViewSelectors = {
  /** Back button element ID for navigating away from request payment screen */
  BACK_BUTTON_ID: 'request-search-asset-back-button',
  /** Main container element ID for the request payment screen */
  REQUEST_PAYMENT_CONTAINER_ID: 'request-screen',
  /** Asset list element ID showing searched asset results */
  REQUEST_ASSET_LIST_ID: 'searched-asset-results',
  /** Input box element ID for entering the request amount */
  REQUEST_AMOUNT_INPUT_BOX_ID: 'request-amount-input',
  /** Input box element ID for searching tokens */
  TOKEN_SEARCH_INPUT_BOX: 'request-search-asset-input',
} as const;
