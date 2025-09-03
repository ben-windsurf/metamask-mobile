import { ensureValidState } from './util';
import { hasProperty, isObject } from '@metamask/utils';

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
 * Migration 60: Initialize NotificationServicesController with default state
 * Ensures the NotificationServicesController exists in the background state with proper default values
 * @param {unknown} state - The Redux state to migrate
 * @returns {unknown} The migrated state with NotificationServicesController initialized
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
