import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectIsSignedIn } from '../../../selectors/identity';
import { selectIsUnlocked } from '../../../selectors/keyringController';
import {
  getIsNotificationEnabledByDefaultFeatureFlag,
  selectIsMetamaskNotificationsEnabled,
} from '../../../selectors/notifications';
import { selectBasicFunctionalityEnabled } from '../../../selectors/settings';
import Logger from '../../Logger';
import { isNotificationsFeatureEnabled } from '../constants';
import {
  useEnableNotifications,
  useListNotifications,
} from './useNotifications';
import {
  hasNotificationSubscriptionExpired,
  hasUserTurnedOffNotificationsOnce,
} from '../constants/notification-storage-keys';
import { useStorageValue } from '../../../store/storage-wrapper-hooks';
import { SOLANA_FEATURE_MODAL_SHOWN } from '../../../constants/storage';

/**
 * Configuration object for enabling push notifications with nudge.
 */
const showPushNush = { nudgeEnablePush: true };

/**
 * Custom hook that provides a callback to enable notifications and refresh the notification list.
 * @returns A callback function that enables notifications and refreshes the list
 */
const useEnableAndRefresh = () => {
  const { enableNotifications } = useEnableNotifications(showPushNush);
  const { listNotifications } = useListNotifications();
  return useCallback(
    async (shouldEnable = true) => {
      shouldEnable && (await enableNotifications());
      await listNotifications();
    },
    [enableNotifications, listNotifications],
  );
};

/**
 * Custom hook that provides notification-related selectors for startup logic.
 * @returns Object containing notification state flags and requirements
 */
const useNotificationStartupSelectors = () => {
  // Base requirements
  const isUnlocked = Boolean(useSelector(selectIsUnlocked));
  const isBasicFunctionalityEnabled = Boolean(
    useSelector(selectBasicFunctionalityEnabled),
  );

  // Notification requirements
  const notificationsFlagEnabled = isNotificationsFeatureEnabled();
  const notificationsControllerEnabled = useSelector(
    selectIsMetamaskNotificationsEnabled,
  );
  const isSignedIn = useSelector(selectIsSignedIn);
  const notificationsEnabled =
    notificationsFlagEnabled && notificationsControllerEnabled && isSignedIn;

  return {
    isUnlocked,
    isBasicFunctionalityEnabled,
    notificationsEnabled,
    notificationsFlagEnabled,
  };
};

/**
 * Custom hook that registers and fetches notifications on app startup.
 * Automatically enables notifications and refreshes the list when conditions are met.
 */
export function useRegisterAndFetchNotifications() {
  const { isUnlocked, isBasicFunctionalityEnabled, notificationsEnabled } =
    useNotificationStartupSelectors();

  // Actions
  const enableAndRefresh = useEnableAndRefresh();

  // App Open Effect
  useEffect(() => {
    const run = async () => {
      try {
        if (isUnlocked && isBasicFunctionalityEnabled && notificationsEnabled) {
          await enableAndRefresh(await hasNotificationSubscriptionExpired());
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        Logger.error(
          new Error(`Failed to list notifications - ${errorMessage}`),
        );
      }
    };

    run();
  }, [
    enableAndRefresh,
    isBasicFunctionalityEnabled,
    isUnlocked,
    notificationsEnabled,
  ]);
}

/**
 * Custom hook that automatically enables notifications by default for new users.
 * Only enables notifications if the user hasn't previously turned them off and all conditions are met.
 */
export function useEnableNotificationsByDefaultEffect() {
  const {
    isUnlocked,
    isBasicFunctionalityEnabled,
    notificationsEnabled,
    notificationsFlagEnabled,
  } = useNotificationStartupSelectors();
  const isNotificationsEnabledByDefaultFeatureFlag = useSelector(
    getIsNotificationEnabledByDefaultFeatureFlag,
  );

  const enableAndRefresh = useEnableAndRefresh();

  // Ensure in-app modals are closed
  const solanaModalFlag = useStorageValue(SOLANA_FEATURE_MODAL_SHOWN);
  const solanaModalClosed =
    !solanaModalFlag.loading && solanaModalFlag.value === 'true';

  useEffect(() => {
    const run = async () => {
      try {
        if (
          isBasicFunctionalityEnabled &&
          isUnlocked &&
          !notificationsEnabled &&
          isNotificationsEnabledByDefaultFeatureFlag &&
          notificationsFlagEnabled &&
          solanaModalClosed
        ) {
          if (!(await hasUserTurnedOffNotificationsOnce())) {
            await enableAndRefresh();
          }
        }
      } catch {
        // Do nothing
      }
    };
    run();
  }, [
    enableAndRefresh,
    isBasicFunctionalityEnabled,
    isNotificationsEnabledByDefaultFeatureFlag,
    isUnlocked,
    notificationsEnabled,
    notificationsFlagEnabled,
    solanaModalClosed,
  ]);
}

/**
 * Effect that queries for notifications on startup if notifications are enabled.
 */
export function useStartupNotificationsEffect() {
  useRegisterAndFetchNotifications();
  useEnableNotificationsByDefaultEffect();
}
