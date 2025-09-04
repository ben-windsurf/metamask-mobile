import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
  assertIsFeatureEnabled,
  disablePushNotifications as disablePushNotificationsHelper,
  enablePushNotifications as enablePushNotificationsHelper,
} from '../../../actions/notification/helpers';
import {
  selectIsMetaMaskPushNotificationsEnabled,
  selectIsMetaMaskPushNotificationsLoading,
} from '../../../selectors/notifications';
import {
  hasPushPermission,
  requestPushPermissions,
} from '../services/NotificationService';

/**
 * Props for the usePushNotificationsToggle hook
 * @interface UsePushNotificationsToggleProps
 * @property nudgeEnablePush - Whether to nudge the user to enable push notifications.
 * Depending on the instance, we may want to nudge to enable push notifications or skip nudging.
 * E.g. Onboarding = nudge, settings page = don't nudge
 */
export interface UsePushNotificationsToggleProps {
  /** Whether to nudge the user to enable push notifications */
  nudgeEnablePush: boolean;
}
/**
 * Hook for managing push notification toggle functionality
 * Provides methods to enable, disable, and toggle push notifications with optional nudging behavior
 *
 * @param props - Configuration options for the hook
 * @returns Object containing notification state and toggle functions
 *
 * @example
 * ```tsx
 * function NotificationSettings() {
 *   const { data, loading, togglePushNotification } = usePushNotificationsToggle({
 *     nudgeEnablePush: false
 *   });
 *
 *   return (
 *     <Switch
 *       value={data}
 *       onValueChange={togglePushNotification}
 *       disabled={loading}
 *     />
 *   );
 * }
 * ```
 */
export function usePushNotificationsToggle(
  props: UsePushNotificationsToggleProps = { nudgeEnablePush: true },
) {
  const data = useSelector(selectIsMetaMaskPushNotificationsEnabled);
  const loading = useSelector(selectIsMetaMaskPushNotificationsLoading);

  const enablePushNotifications = useCallback(async () => {
    assertIsFeatureEnabled();
    const pushPermCallback = props.nudgeEnablePush
      ? requestPushPermissions
      : hasPushPermission;

    const result = await pushPermCallback().catch(() => false);
    if (!result) return;

    await enablePushNotificationsHelper().catch(() => {
      /* Do Nothing */
    });
  }, [props.nudgeEnablePush]);

  const disablePushNotifications = useCallback(async () => {
    assertIsFeatureEnabled();
    await disablePushNotificationsHelper().catch(() => {
      /* Do Nothing */
    });
  }, []);

  const togglePushNotification = useCallback(
    async (val: boolean) => {
      val ? await enablePushNotifications() : await disablePushNotifications();
    },
    [disablePushNotifications, enablePushNotifications],
  );

  return {
    data,
    togglePushNotification,
    loading,
  };
}
