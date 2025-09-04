import enContent from '../../../locales/languages/en.json';

/**
 * Collection of test selector IDs for onboarding screen elements.
 * Used by end-to-end tests to locate and interact with onboarding UI components.
 */
export const OnboardingSelectorIDs = {
  CONTAINER_ID: 'onboarding-screen',
  NEW_WALLET_BUTTON: 'wallet-setup-screen-create-new-wallet-button-id',
  EXISTING_WALLET_BUTTON:
    'wallet-setup-screen-have-an-existing-wallet-button-id',
  SCREEN_TITLE: 'wallet-setup-screen-title-id',
  SCREEN_DESCRIPTION: 'wallet-setup-screen-description-id',
};

/**
 * Collection of text selectors for onboarding screen elements.
 * Contains localized text content used to identify elements in end-to-end tests.
 */
export const OnboardingSelectorText = {
  SUCCESSFUL_WALLET_RESET: enContent.onboarding.your_wallet,
};
