import { EnableNotificationModalSelectorsIDs } from '../../selectors/Notifications/EnableNotificationModal.selectors';
import Gestures from '../../framework/Gestures.ts';
import Matchers from '../../framework/Matchers.ts';

/**
 * Page object model for the Enable Notifications Modal in end-to-end tests.
 * Provides methods to interact with notification permission dialog elements.
 */
class EnableNotificationsModal {
  /**
   * Gets the title element of the enable notifications modal.
   * @returns The title element matcher
   */
  get title() {
    return Matchers.getElementByID(EnableNotificationModalSelectorsIDs.TITLE);
  }
  /**
   * Gets the cancel button element of the enable notifications modal.
   * @returns The cancel button element matcher
   */
  get cancel_button() {
    return Matchers.getElementByID(
      EnableNotificationModalSelectorsIDs.BUTTON_CANCEL,
    );
  }
  /**
   * Gets the enable button element of the enable notifications modal.
   * @returns The enable button element matcher
   */
  get enable_button() {
    return Matchers.getElementByID(
      EnableNotificationModalSelectorsIDs.BUTTON_ENABLE,
    );
  }

  /**
   * Taps on the confirm/enable button to enable notifications.
   * Waits for the element to be available before tapping.
   * @returns Promise that resolves when the tap action is completed
   */
  async tapOnConfirm() {
    await Gestures.waitAndTap(this.enable_button, {
      elemDescription: 'Confirm Enable Notifications',
    });
  }
}

export default new EnableNotificationsModal();
