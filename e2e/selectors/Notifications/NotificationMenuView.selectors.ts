import enContent from '../../../locales/languages/en.json';

/**
 * Text selectors for the notification menu view, containing localized strings
 * for different tab labels used in end-to-end testing.
 */
export const NotificationMenuViewSelectorsText = {
  ALL_TAB: enContent.notifications.list[0],
  WALLET_TAB: enContent.notifications.list[1],
  ANNOUNCEMENTS_TAB: enContent.notifications.list[2],
};

/**
 * ID selectors for the notification menu view elements used in end-to-end testing.
 * Contains test IDs for various UI components in the notification menu.
 */
export const NotificationMenuViewSelectorsIDs = {
  TITLE: 'notification-menu-view-title',
  COG_WHEEL: 'notification-menu-view-cog-wheel',
  /**
   * Generates a test ID for a specific notification menu item.
   * @param id - The unique identifier for the notification item
   * @returns The formatted test ID string for the notification item
   */
  ITEM: (id: string) => `notification-menu-view-item-${id}`,
  ITEM_LIST_SCROLLVIEW: 'notification-menu-scroll-view',
};
