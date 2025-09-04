import { ConfirmationFooterSelectorIDs } from '../../../selectors/Confirmation/ConfirmationView.selectors';
import Matchers from '../../../framework/Matchers';
import Gestures from '../../../framework/Gestures';

/**
 * Page object class for handling footer actions in browser confirmation dialogs.
 * Provides methods to interact with confirm and cancel buttons across different platforms.
 */
class FooterActions {
  /**
   * Gets the confirm button element for the current platform.
   * @returns The confirm button DetoxElement
   */
  get confirmButton(): DetoxElement {
    return device.getPlatform() === 'android'
      ? Matchers.getElementByLabel(ConfirmationFooterSelectorIDs.CONFIRM_BUTTON)
      : Matchers.getElementByID(ConfirmationFooterSelectorIDs.CONFIRM_BUTTON);
  }

  /**
   * Gets the cancel button element for the current platform.
   * @returns The cancel button DetoxElement
   */
  get cancelButton(): DetoxElement {
    return device.getPlatform() === 'android'
      ? Matchers.getElementByLabel(ConfirmationFooterSelectorIDs.CANCEL_BUTTON)
      : Matchers.getElementByID(ConfirmationFooterSelectorIDs.CANCEL_BUTTON);
  }

  /**
   * Taps the confirm button in the footer.
   * @returns Promise that resolves when the tap action is complete
   */
  async tapConfirmButton(): Promise<void> {
    await Gestures.waitAndTap(this.confirmButton, {
      elemDescription: 'Confirm button',
    });
  }

  /**
   * Taps the cancel button in the footer.
   * @returns Promise that resolves when the tap action is complete
   */
  async tapCancelButton(): Promise<void> {
    await Gestures.waitAndTap(this.cancelButton, {
      elemDescription: 'Cancel button',
    });
  }
}

export default new FooterActions();
