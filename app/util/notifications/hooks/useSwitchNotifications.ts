import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  assertIsFeatureEnabled,
  enableAccounts,
  disableAccounts,
  fetchAccountNotificationSettings,
  toggleFeatureAnnouncements,
} from '../../../actions/notification/helpers';

import { debounce } from 'lodash';
import {
  selectIsFeatureAnnouncementsEnabled,
  selectIsMetamaskNotificationsEnabled,
  selectIsMetaMaskPushNotificationsLoading,
  selectIsUpdatingMetamaskNotifications,
  selectIsUpdatingMetamaskNotificationsAccount,
} from '../../../selectors/notifications';
import {
  useListNotifications,
  useEnableNotifications,
  useDisableNotifications,
  useContiguousLoading,
} from './useNotifications';
import { isNotificationsFeatureEnabled } from '../constants';
import { strings } from '../../../../locales/i18n';

/**
 * Hook for toggling MetaMask notifications on/off
 * @returns {Object} Object containing switchNotifications function, data, loading state, and error
 */
export function useNotificationsToggle() {
  const {
    enableNotifications,
    data,
    loading,
    error: enableError,
  } = useEnableNotifications({ nudgeEnablePush: false });
  const { disableNotifications, error: disableError } =
    useDisableNotifications();

  const switchNotifications = useCallback(
    async (val: boolean) => {
      assertIsFeatureEnabled();
      val ? await enableNotifications() : await disableNotifications();
    },
    [disableNotifications, enableNotifications],
  );

  return {
    switchNotifications,
    data,
    loading,
    error: enableError || disableError,
  };
}

/**
 * Hook for toggling feature announcements on/off
 * @returns {Object} Object containing data and switchFeatureAnnouncements function
 */
export function useFeatureAnnouncementToggle() {
  const { listNotifications } = useListNotifications();
  const isEnabled = useSelector(selectIsMetamaskNotificationsEnabled);
  const data = useSelector(selectIsFeatureAnnouncementsEnabled);
  const switchFeatureAnnouncements = useCallback(
    async (val: boolean) => {
      assertIsFeatureEnabled();
      if (!isEnabled) {
        return;
      }

      await toggleFeatureAnnouncements(val);

      // Refetch notifications
      debounce(listNotifications)();
    },
    [isEnabled, listNotifications],
  );

  return {
    data,
    switchFeatureAnnouncements,
  };
}

/**
 * Hook for fetching account notification settings
 * @param {string[]} accounts - Array of account addresses to fetch settings for
 * @returns {Object} Object containing data, loading states, error, and update function
 */
export function useFetchAccountNotifications(accounts: string[]) {
  const accountsBeingUpdated = useSelector(
    selectIsUpdatingMetamaskNotificationsAccount,
  );
  const isEnabled = useSelector(selectIsMetamaskNotificationsEnabled);
  const [data, setData] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Memoize the accounts array to avoid unnecessary re-fetching
  const jsonAccounts = useMemo(() => JSON.stringify(accounts), [accounts]);

  const update = useCallback(
    async (addresses: string[]) => {
      assertIsFeatureEnabled();
      if (!isEnabled) {
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const res = await fetchAccountNotificationSettings(addresses);
        setData(res);
      } catch {
        setError('Failed to get account settings');
      } finally {
        setLoading(false);
      }
    },
    [isEnabled],
  );

  // Effect - async get if accounts are enabled/disabled
  useEffect(() => {
    if (!isEnabled || !isNotificationsFeatureEnabled()) {
      return;
    }
    const memoAccounts: string[] = JSON.parse(jsonAccounts);
    if (memoAccounts.length > 0) {
      update(memoAccounts);
    }
  }, [jsonAccounts, isEnabled, update]);

  return {
    data,
    initialLoading: loading,
    error,
    accountsBeingUpdated,
    update,
  };
}

/**
 * Hook for toggling account notifications on/off for specific addresses
 * @returns {Object} Object containing onToggle function, error state, and loading state
 */
export function useAccountNotificationsToggle() {
  const { listNotifications } = useListNotifications();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onToggle = useCallback(
    async (addresses: string[], state: boolean) => {
      setLoading(true);
      setError(null);

      try {
        if (state) {
          await enableAccounts(addresses);
        } else {
          await disableAccounts(addresses);
        }
      } catch (e) {
        const errorMessage =
          e instanceof Error ? e.message : JSON.stringify(e ?? '');
        setError(errorMessage);
      } finally {
        setLoading(false);
        // Refetch notifications
        debounce(listNotifications)();
      }
    },
    [listNotifications],
  );

  return {
    onToggle,
    error,
    loading,
  };
}

/**
 * Hook that returns appropriate loading text for notification operations
 * @returns {string | undefined} Loading text string or undefined if not loading
 */
export function useSwitchNotificationLoadingText(): string | undefined {
  // Notification Settings
  const notificationsLoading = useSelector(
    selectIsUpdatingMetamaskNotifications,
  );

  // Push Notification Settings
  const pushNotificationsLoading = useSelector(
    selectIsMetaMaskPushNotificationsLoading,
  );

  const accountsLoading = useSelector(
    selectIsUpdatingMetamaskNotificationsAccount,
  );

  const loading = useContiguousLoading(
    notificationsLoading,
    pushNotificationsLoading,
  );

  if (accountsLoading.length > 0) {
    return strings('app_settings.updating_account_settings');
  }

  if (notificationsLoading || pushNotificationsLoading || loading) {
    return strings('app_settings.updating_notifications');
  }

  return undefined;
}
