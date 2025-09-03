import { useRef, useCallback } from 'react';
import {
  useMetrics,
  MetaMetricsEvents,
} from '../../components/hooks/useMetrics';

/**
 * Custom hook for handling network connection state changes
 * Tracks connection events and navigates to offline mode when connection is lost
 * @param {any} navigation - React Navigation object for screen navigation
 * @returns {Object} Object containing connectionChangeHandler function
 */
// TODO: Replace "any" with type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useConnectionHandler = (navigation: any) => {
  const connectedRef = useRef(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { trackEvent, createEventBuilder } = useMetrics();

  const connectionChangeHandler = useCallback(
    (state: { isConnected: boolean } | null) => {
      if (!state) return;
      const { isConnected } = state;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      if (connectedRef.current !== isConnected) {
        if (isConnected === false) {
          trackEvent(
            createEventBuilder(MetaMetricsEvents.CONNECTION_DROPPED).build(),
          );
          timeoutRef.current = setTimeout(() => {
            navigation.navigate('OfflineModeView');
          }, 3000);
        } else {
          trackEvent(
            createEventBuilder(MetaMetricsEvents.CONNECTION_RESTORED).build(),
          );
        }
        connectedRef.current = isConnected;
      }
    },
    [createEventBuilder, navigation, trackEvent],
  );

  return { connectionChangeHandler };
};
