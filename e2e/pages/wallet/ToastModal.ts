import {
  ToastSelectorsIDs,
  ToastSelectorsText,
} from '../../selectors/wallet/ToastModal.selectors';
import Gestures from '../../framework/Gestures';
import Matchers from '../../framework/Matchers';

/**
 * Page object model for interacting with toast modal notifications in the wallet.
 * Provides methods to access toast elements and perform actions like closing toasts.
 */
class ToastModal {
  /**
   * Gets the main container element of the toast modal.
   * @returns The toast modal container element
   */
  get container(): DetoxElement {
    return Matchers.getElementByID(ToastSelectorsIDs.CONTAINER);
  }

  /**
   * Gets the notification title element within the toast modal.
   * @returns The notification title element
   */
  get notificationTitle(): DetoxElement {
    return Matchers.getElementByID(ToastSelectorsIDs.NOTIFICATION_TITLE);
  }

  /**
   * Gets the close button element of the toast modal.
   * @returns The toast close button element
   */
  get toastCloseButton(): DetoxElement {
    return Matchers.getElementByText(ToastSelectorsText.CLOSE_BUTTON);
  }

  /**
   * Taps the toast close button to dismiss the toast modal.
   * Waits for the button to be available before tapping.
   * @returns Promise that resolves when the tap action is complete
   */
  async tapToastCloseButton(): Promise<void> {
    await Gestures.waitAndTap(this.toastCloseButton, {
      elemDescription: 'Toast Modal Close Button',
    });
  }
}

export default new ToastModal();
