import {
  ImportTokenViewSelectorsIDs,
  ImportTokenViewSelectorsText,
} from '../../../selectors/wallet/ImportTokenView.selectors';
import Matchers from '../../../framework/Matchers';
import Gestures from '../../../framework/Gestures';

/**
 * Page object model for the Confirm Add Asset view in the import token flow.
 * Provides methods to interact with UI elements for confirming or canceling asset imports.
 */
class ConfirmAddAssetView {
  /**
   * Gets the main container element for the confirm add asset view.
   * @returns The container DetoxElement
   */
  get container(): DetoxElement {
    return Matchers.getElementByID(
      ImportTokenViewSelectorsIDs.ADD_CONFIRM_CUSTOM_ASSET,
    );
  }

  /**
   * Gets the cancel button element.
   * @returns The cancel button DetoxElement
   */
  get cancelButton(): DetoxElement {
    return Matchers.getElementByText(
      ImportTokenViewSelectorsText.CANCEL_IMPORT_TOKEN,
    );
  }

  /**
   * Gets the confirm button element.
   * @returns The confirm button DetoxElement
   */
  get confirmButton(): DetoxElement {
    return Matchers.getElementByText(
      ImportTokenViewSelectorsText.CONFIRM_IMPORT_TOKEN,
    );
  }

  /**
   * Gets the cancel modal element.
   * @returns The cancel modal DetoxElement
   */
  get cancelModal(): DetoxElement {
    return Matchers.getElementByID(
      ImportTokenViewSelectorsIDs.ADD_CANCEL_ADD_CUSTOM_ASSET_MODAL,
    );
  }

  /**
   * Gets the confirm button element within the modal.
   * @returns The confirm button modal DetoxElement
   */
  get confirmButtonModal(): DetoxElement {
    return Matchers.getElementByText(
      ImportTokenViewSelectorsText.CONFIRM_CANCEL_IMPORT_TOKEN,
    );
  }

  /**
   * Taps on the cancel button to cancel the asset import process.
   * @returns Promise that resolves when the tap action is complete
   */
  async tapOnCancelButton(): Promise<void> {
    await Gestures.waitAndTap(this.cancelButton, {
      elemDescription: 'Cancel Add Asset Button',
    });
  }

  async tapOnConfirmButton(): Promise<void> {
    await Gestures.waitAndTap(this.confirmButton, {
      elemDescription: 'Confirm Add Asset Button',
    });
  }

  async tapOnConfirmModalButton(): Promise<void> {
    await Gestures.waitAndTap(this.confirmButtonModal, {
      elemDescription: 'Confirm Add Asset Modal Button',
    });
  }
}

export default new ConfirmAddAssetView();
