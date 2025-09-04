import {
  NotificationServicesControllerMessenger,
  NotificationServicesControllerState,
  Controller as NotificationServicesController,
} from '@metamask/notification-services-controller/notification-services';

/**
 * Creates and configures a NotificationServicesController instance for managing
 * notification services in the MetaMask mobile application.
 *
 * @param props - Configuration object for the controller
 * @param props.messenger - The controller messenger for inter-controller communication
 * @param props.initialState - Optional initial state for the controller
 * @returns A configured NotificationServicesController instance
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
