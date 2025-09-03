import {
  NotificationServicesControllerMessenger,
  NotificationServicesControllerState,
  Controller as NotificationServicesController,
} from '@metamask/notification-services-controller/notification-services';

/**
 * Creates and configures a NotificationServicesController instance for MetaMask Mobile
 * Handles feature announcements and notification services with mobile-specific configuration
 * @param props - Configuration object for the controller
 * @param props.messenger - The controller messenger for communication with other controllers
 * @param props.initialState - Optional initial state for the notification services controller
 * @returns {NotificationServicesController} Configured notification services controller instance
 */
export const createNotificationServicesController = (props: {
  messenger: NotificationServicesControllerMessenger;
  initialState?: Partial<NotificationServicesControllerState>;
}): NotificationServicesController => {
  const notificationServicesController = new NotificationServicesController({
    messenger: props.messenger,
    state: props.initialState,
    env: {
      featureAnnouncements: {
        platform: 'mobile',
        accessToken: process.env.FEATURES_ANNOUNCEMENTS_ACCESS_TOKEN ?? '',
        spaceId: process.env.FEATURES_ANNOUNCEMENTS_SPACE_ID ?? '',
      },
    },
  });
  return notificationServicesController;
};
