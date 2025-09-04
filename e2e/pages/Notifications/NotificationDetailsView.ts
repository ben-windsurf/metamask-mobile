import { NotificationDetailsViewSelectorsIDs } from '../../selectors/Notifications/NotificationDetailsView.selectors';
import Gestures from '../../framework/Gestures';
import Matchers from '../../framework/Matchers';

/**
 * Page object model for the Notification Details view in end-to-end tests.
 * Provides methods to interact with notification detail screen elements.
 */
class NotificationsDetailView {
  /**
   * Gets the title element of the notification details view.
   * @returns The title element matcher
   */
  get title() {
    return Matchers.getElementByID(NotificationDetailsViewSelectorsIDs.TITLE);
  }
  /**
   * Gets the back button element of the notification details view.
   * @returns The back button element matcher
   */
  get backButton() {
    return Matchers.getElementByID(
      NotificationDetailsViewSelectorsIDs.BACK_BUTTON,
    );
  }

  /**
   * Taps on the back button to navigate away from the notification details view.
   * @returns Promise that resolves when the tap gesture is completed
   */
  async tapOnBackButton() {
    await Gestures.waitAndTap(this.backButton, {
      elemDescription: 'Notification Details - Back Button',
    });
  }
}

export default new NotificationsDetailView();
