import { DetectedTokensSelectorIDs } from '../../selectors/wallet/DetectedTokensView.selectors';
import Gestures from '../../framework/Gestures';
import Matchers from '../../framework/Matchers';

/**
 * Page object model for the Detected Tokens View in the wallet.
 * Provides methods to interact with detected token import functionality.
 */
class DetectedTokensView {
  /**
   * Gets the import button element for detected tokens.
   * Uses platform-specific selectors for iOS and Android.
   *
   * @returns The import button DetoxElement
   */
  get importButton(): DetoxElement {
    return device.getPlatform() === 'ios'
      ? Matchers.getElementByID(DetectedTokensSelectorIDs.IMPORT_BUTTON_ID)
      : Matchers.getElementByLabel(DetectedTokensSelectorIDs.IMPORT_BUTTON_ID);
  }

  /**
   * Taps the import button to import detected tokens.
   * Waits for the button to be available before tapping.
   *
   * @returns Promise that resolves when the tap action is complete
   */
  async tapImport(): Promise<void> {
    await Gestures.waitAndTap(this.importButton, {
      elemDescription: 'Import Button in Detected Tokens View',
    });
  }
}

export default new DetectedTokensView();
