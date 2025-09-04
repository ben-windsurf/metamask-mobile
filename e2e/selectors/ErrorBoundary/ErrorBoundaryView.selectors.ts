import enContent from '../../../locales/languages/en.json';

/**
 * Selector IDs for error boundary view elements used in end-to-end testing.
 * Contains unique identifiers for locating UI elements during automated tests.
 */
export const ErrorBoundarySelectorsIDs = {
  CONTAINER: 'error-boundary-container-id',
};

/**
 * Text selectors for error boundary view elements used in end-to-end testing.
 * Contains localized text content for verifying UI text during automated tests.
 */
export const ErrorBoundarySelectorsText = {
  SAVE_YOUR_SRP_TEXT: enContent.error_screen.save_seedphrase_2,
  TITLE: enContent.error_screen.title,
};
