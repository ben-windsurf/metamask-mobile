import {
  ClearPrivacyModalSelectorsIDs,
  ClearPrivacyModalSelectorsText,
} from '../../../selectors/Settings/SecurityAndPrivacy/ClearPrivacyModal.selectors';
import Matchers from '../../../framework/Matchers';
import Gestures from '../../../framework/Gestures';

/**
 * Page object model for the Clear Privacy Modal in Security & Privacy settings.
 * Provides methods to interact with modal elements for clearing privacy data.
 */
class ClearPrivacyModal {
  /**
   * Gets the main container element of the Clear Privacy Modal.
   * @returns The container DetoxElement for the modal
   */
  get container(): DetoxElement {
    return Matchers.getElementByID(ClearPrivacyModalSelectorsIDs.CONTAINER);
  }

  /**
   * Gets the Clear button element in the modal.
   * @returns The Clear button DetoxElement
   */
  get clearButton(): DetoxElement {
    return Matchers.getElementByText(
      ClearPrivacyModalSelectorsText.CLEAR_BUTTON,
    );
  }
  /**
   * Gets the Cancel button element in the modal.
   * @returns The Cancel button DetoxElement
   */
  get cancelButton(): DetoxElement {
    return Matchers.getElementByText(
      ClearPrivacyModalSelectorsText.CANCEL_BUTTON,
    );
  }

  /**
   * Taps the Clear button to confirm clearing privacy data.
   * @returns Promise that resolves when the tap action is completed
   */
  async tapClearButton(): Promise<void> {
    await Gestures.waitAndTap(this.clearButton, {
      elemDescription: 'Clear Button in Clear Privacy Modal',
    });
  }
}

export default new ClearPrivacyModal();
