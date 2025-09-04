import { SNAP_ACCOUNT_CUSTOM_NAME_ADD_ACCOUNT_BUTTON } from '../../../app/components/Approvals/SnapAccountCustomNameApproval/SnapAccountCustomNameApproval.constants';

/**
 * Selector IDs for the Solana new feature sheet component elements.
 * Used in end-to-end tests to identify and interact with specific UI elements.
 */
export const SolanaNewFeatureSheetSelectorsIDs = {
  SOLANA_NEW_FEATURE_SHEET: 'solana-new-feature-sheet',
  SOLANA_IMPORT_ACCOUNT_BUTTON: 'solana-import-account-button',
  SOLANA_LEARN_MORE_BUTTON: 'solana-learn-more-button',
  SOLANA_ADD_ACCOUNT_BUTTON_IN_SHEET:
    SNAP_ACCOUNT_CUSTOM_NAME_ADD_ACCOUNT_BUTTON,
  SOLANA_NOT_NOW_BUTTON: 'solana-not-now-button',
  SOLANA_CARASOULE_LOGO: 'carousel-sixth-slide',
};

/**
 * Text content selectors for the Solana new feature sheet component.
 * Contains expected text values used in end-to-end tests for content verification.
 */
export const SolanaNewFeatureSheetSelectorsText = {
  TITLE: 'Solana is here!',
  DESCRIPTION: 'Create, send, and receive Solana tokens in MetaMask',
  CREATE_ACCOUNT_BUTTON: 'Create Solana Account',
};
