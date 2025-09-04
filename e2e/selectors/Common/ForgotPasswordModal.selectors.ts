import enContent from '../../../locales/languages/en.json';

/**
 * Selector IDs for the Forgot Password Modal elements used in end-to-end testing.
 * Contains test identifiers for all interactive elements within the forgot password flow.
 */
export const ForgotPasswordModalSelectorsIDs = {
  CONTAINER: 'forgot-password-modal-container',
  TITLE: 'forgot-password-modal-title',
  DESCRIPTION: 'forgot-password-modal-description',
  RESET_WALLET_BUTTON: 'forgot-password-modal-reset-wallet-button',
  YES_RESET_WALLET_BUTTON: 'forgot-password-modal-yes-reset-wallet-button',
  CANCEL_BUTTON: 'forgot-password-modal-cancel-button',
  WARNING_TEXT: 'forgot-password-modal-warning-text',
  BACK_BUTTON: 'forgot-password-modal-back-button',
};

/**
 * Text selectors for the Forgot Password Modal elements used in end-to-end testing.
 * Contains localized text content for validation and interaction in automated tests.
 */
export const ForgotPasswordModalSelectorsText = {
  TITLE: enContent.login.forgot_password_desc, // 'Forgot your password?',
  DESCRIPTION: enContent.login.forgot_password_desc_2, // 'MetaMask can\'t recover your password for you.',
  RESET_WALLET: enContent.login.reset_wallet, // 'Reset wallet',
  YES_RESET_WALLET: enContent.login.erase_my, // 'Yes, reset wallet',
  CANCEL: enContent.login.cancel, // 'Cancel',
  WARNING: enContent.login.are_you_sure, // 'Are you sure?',
};
