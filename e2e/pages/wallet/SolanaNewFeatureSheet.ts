import { SolanaNewFeatureSheetSelectorsIDs } from '../../selectors/wallet/SolanaNewFeatureSheet.selectors';
import Gestures from '../../framework/Gestures';
import Matchers from '../../framework/Matchers';

/**
 * Page object model for the Solana New Feature Sheet in end-to-end tests.
 * Provides methods to interact with the Solana feature introduction sheet,
 * including account import, learn more actions, and sheet dismissal.
 */
class SolanaNewFeatureSheet {
  /**
   * Gets the main sheet container element.
   * @returns The Detox element for the Solana new feature sheet container
   */
  get sheetContainer(): DetoxElement {
    return Matchers.getElementByID(
      SolanaNewFeatureSheetSelectorsIDs.SOLANA_NEW_FEATURE_SHEET,
    );
  }

  /**
   * Gets the import account button element.
   * @returns The Detox element for the import account button
   */
  get importAccountButton(): DetoxElement {
    return Matchers.getElementByID(
      SolanaNewFeatureSheetSelectorsIDs.SOLANA_IMPORT_ACCOUNT_BUTTON,
    );
  }

  /**
   * Gets the learn more button element.
   * @returns The Detox element for the learn more button
   */
  get learnMoreButton(): DetoxElement {
    return Matchers.getElementByID(
      SolanaNewFeatureSheetSelectorsIDs.SOLANA_LEARN_MORE_BUTTON,
    );
  }

  /**
   * Gets the not now button element.
   * @returns The Detox element for the not now button
   */
  get notNowButton(): DetoxElement {
    return Matchers.getElementByID(
      SolanaNewFeatureSheetSelectorsIDs.SOLANA_NOT_NOW_BUTTON,
    );
  }

  /**
   * Gets the add account button element.
   * @returns The Detox element for the add account button
   */
  get addAccountButton(): DetoxElement {
    return Matchers.getElementByID(
      SolanaNewFeatureSheetSelectorsIDs.SOLANA_ADD_ACCOUNT_BUTTON_IN_SHEET,
    );
  }

  /**
   * Taps the import account button on the Solana new feature sheet.
   * @returns Promise that resolves when the tap action is completed
   */
  async tapImportAccountButton(): Promise<void> {
    await Gestures.waitAndTap(this.importAccountButton, {
      elemDescription: 'Solana New Feature Sheet Import Account Button',
    });
  }

  /**
   * Taps the view account button on the Solana new feature sheet.
   * @returns Promise that resolves when the tap action is completed
   */
  async tapViewAccountButton(): Promise<void> {
    await Gestures.waitAndTap(this.importAccountButton, {
      elemDescription: 'Solana New Feature Sheet View Account Button',
    });
  }

  /**
   * Taps the add account button on the Solana new feature sheet.
   * @returns Promise that resolves when the tap action is completed
   */
  async tapAddAccountButton(): Promise<void> {
    await Gestures.waitAndTap(this.addAccountButton, {
      elemDescription: 'Solana New Feature Sheet Add Account Button',
    });
  }

  /**
   * Taps the learn more button on the Solana new feature sheet.
   * @returns Promise that resolves when the tap action is completed
   */
  async tapLearnMoreButton(): Promise<void> {
    await Gestures.waitAndTap(this.learnMoreButton, {
      elemDescription: 'Solana New Feature Sheet Learn More Button',
    });
  }

  async tapNotNowButton(): Promise<void> {
    await Gestures.waitAndTap(this.notNowButton, {
      elemDescription: 'Solana New Feature Sheet Not Now Button',
    });
  }

  async swipeWithCarouselLogo(): Promise<void> {
    await Gestures.swipe(this.learnMoreButton, 'down', {
      speed: 'fast',
    });
  }
}

export default new SolanaNewFeatureSheet();
