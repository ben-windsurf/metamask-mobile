import { AssetWatcherSelectorsIDs } from '../../selectors/Transactions/AssetWatcher.selectors';
import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';

/**
 * Page object model for the Asset Watch bottom sheet component.
 * Provides methods to interact with the asset watching confirmation dialog.
 */
class AssetWatchBottomSheet {
  /**
   * Gets the main container element of the asset watch bottom sheet.
   * @returns The container DetoxElement for the bottom sheet
   */
  get container(): DetoxElement {
    return Matchers.getElementByID(AssetWatcherSelectorsIDs.CONTAINER);
  }

  /**
   * Gets the cancel button element.
   * @returns The cancel button DetoxElement
   */
  get cancelButton(): DetoxElement {
    return Matchers.getElementByID(AssetWatcherSelectorsIDs.CANCEL_BUTTON);
  }

  /**
   * Gets the confirm button element.
   * @returns The confirm button DetoxElement
   */
  get confirmButton(): DetoxElement {
    return Matchers.getElementByID(AssetWatcherSelectorsIDs.CONFIRM_BUTTON);
  }

  /**
   * Taps the cancel button to dismiss the asset watch bottom sheet.
   * @returns Promise that resolves when the tap action is complete
   */
  async tapCancelButton(): Promise<void> {
    await Gestures.waitAndTap(this.cancelButton, {
      elemDescription: 'Cancel Button in Asset Watch Bottom Sheet',
    });
  }

  /**
   * Taps the confirm button to add the token to the watch list.
   * @returns Promise that resolves when the tap action is complete
   */
  async tapAddTokenButton(): Promise<void> {
    await Gestures.waitAndTap(this.confirmButton, {
      elemDescription: 'Confirm Button in Asset Watch Bottom Sheet',
    });
  }
}

export default new AssetWatchBottomSheet();
