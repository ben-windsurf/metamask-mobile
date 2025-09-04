import { ensureValidState } from './util';
import { hasProperty, isObject } from '@metamask/utils';

/**
 * Default state configuration for the NotificationServicesController.
 * Contains initial values for all notification-related feature flags and data arrays.
 */
export const DEFAULT_NOTIFICATION_SERVICES_CONTROLLER = {
  isCheckingAccountsPresence: false,
  isFeatureAnnouncementsEnabled: false,
  isFetchingMetamaskNotifications: false,
  isMetamaskNotificationsFeatureSeen: false,
  isNotificationServicesEnabled: false,
  isUpdatingMetamaskNotifications: false,
  isUpdatingMetamaskNotificationsAccount: [],
  metamaskNotificationsList: [],
  metamaskNotificationsReadList: [],
  subscriptionAccountsSeen: [],
};

/**
 * Migration function to ensure NotificationServicesController exists in state.
 * Adds default NotificationServicesController configuration if missing from engine background state.
 *
 * @param state - The application state to migrate
 * @returns The migrated state with NotificationServicesController initialized
 */
export default function migrate(state: unknown) {
  if (!ensureValidState(state, 60)) {
    return state;
  }

  if (
    !hasProperty(
      state.engine.backgroundState,
      'NotificationServicesController',
    ) ||
    !isObject(state.engine.backgroundState.NotificationServicesController)
  ) {
    state.engine.backgroundState.NotificationServicesController =
      DEFAULT_NOTIFICATION_SERVICES_CONTROLLER;
  }
  return state;
}
