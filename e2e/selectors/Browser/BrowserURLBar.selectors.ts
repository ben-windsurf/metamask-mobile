/**
 * Browser URL Bar selectors for E2E tests.
 * Contains selector IDs for interacting with the browser URL bar components during automated testing.
 */
export const BrowserURLBarSelectorsIDs = {
  /** Input field for entering URLs in the browser modal */
  URL_INPUT: 'browser-modal-url-input',
  /** Cancel button to close the browser URL input modal */
  CANCEL_BUTTON_ON_BROWSER_ID: 'cancel-url-button',
  /** Icon button to clear the current URL input */
  URL_CLEAR_ICON: 'url-clear-icon',
} as const;

/**
 * Type definition for the BrowserURLBarSelectorsIDs constant.
 * Provides type safety when accessing browser URL bar selector IDs.
 */
export type BrowserURLBarSelectorsIDsType = typeof BrowserURLBarSelectorsIDs;
