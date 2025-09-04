import {
  NotificationMenuViewSelectorsIDs,
  NotificationMenuViewSelectorsText,
} from '../../selectors/Notifications/NotificationMenuView.selectors';
import Gestures from '../../framework/Gestures';
import Matchers from '../../framework/Matchers';

/**
 * Page object model for the Enable Notifications Modal in end-to-end tests.
 * Provides methods to interact with notification menu elements including tabs,
 * notification items, and scrolling functionality.
 */
class EnableNotificationsModal {
  get title() {
    return Matchers.getElementByID(NotificationMenuViewSelectorsIDs.TITLE);
  }
  get all_tab() {
    return Matchers.getElementByText(NotificationMenuViewSelectorsText.ALL_TAB);
  }
  get wallet_tab() {
    return Matchers.getElementByText(
      NotificationMenuViewSelectorsText.WALLET_TAB,
    );
  }
  get announcements_tab() {
    return Matchers.getElementByText(
      NotificationMenuViewSelectorsText.ANNOUNCEMENTS_TAB,
    );
  }
  get scrollViewIdentifier() {
    return Matchers.getIdentifier(
      NotificationMenuViewSelectorsIDs.ITEM_LIST_SCROLLVIEW,
    );
  }

  /**
   * Selects a notification item by its ID.
   * @param id - The unique identifier of the notification item
   * @returns Promise that resolves to the notification item element
   */
  selectNotificationItem(id: string) {
    return Matchers.getElementByID(
      NotificationMenuViewSelectorsIDs.ITEM(id),
    ) as Promise<IndexableNativeElement>;
  }

  /**
   * Taps on the wallet tab in the notification menu.
   */
  async tapOnWalletTab() {
    await Gestures.waitAndTap(this.wallet_tab);
  }

  /**
   * Taps on the announcements tab in the notification menu.
   */
  async tapOnAnnouncementsTab() {
    await Gestures.waitAndTap(this.announcements_tab);
  }

  /**
   * Taps on a specific notification item by its ID.
   * @param id - The unique identifier of the notification item to tap
   */
  async tapOnNotificationItem(id: string) {
    await Gestures.waitAndTap(this.selectNotificationItem(id), {
      elemDescription: `Notification Menu - Notification Item with ID: ${id}`,
    });
  }

  /**
   * Scrolls to a specific notification item by its ID.
   * @param id - The unique identifier of the notification item to scroll to
   */
  async scrollToNotificationItem(id: string) {
    await Gestures.scrollToElement(
      this.selectNotificationItem(id),
      this.scrollViewIdentifier,
    );
  }
}

export default new EnableNotificationsModal();
