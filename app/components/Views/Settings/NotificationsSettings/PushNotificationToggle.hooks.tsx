import { useCallback } from 'react';
import { usePushNotificationsToggle } from '../../../../util/notifications/hooks/usePushNotifications';

/**
 * Custom hook for managing push notification settings toggle functionality
 * Provides toggle state and handler for enabling/disabling push notifications in settings
 * @returns {Object} Object containing onToggle handler, current value, and loading state
 * @returns {Function} returns.onToggle - Function to toggle push notification state
 * @returns {boolean} returns.value - Current push notification enabled state
 * @returns {boolean} returns.loading - Loading state during toggle operations
 */
export function usePushNotificationSettingsToggle() {
  const { data, togglePushNotification, loading } = usePushNotificationsToggle({
    nudgeEnablePush: true,
  });
  const onToggle = useCallback(
    () => togglePushNotification(!data),
    [data, togglePushNotification],
  );
  return {
    onToggle,
    value: data,
    loading,
  };
}
