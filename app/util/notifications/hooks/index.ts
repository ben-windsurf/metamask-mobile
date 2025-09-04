import { useRegisterPushNotificationsEffect } from './useRegisterPushNotificationsEffect';
import { useStartupNotificationsEffect } from './useStartupNotificationsEffect';

/**
 * Custom hook that registers Push Notifications and lists notifications on startup.
 * This hook combines the registration of push notifications with startup notification effects.
 *
 * @returns void - This hook doesn't return any value, it only performs side effects
 *
 * @example
 * ```tsx
 * function App() {
 *   useNotificationHandler();
 *   return <AppContent />;
 * }
 * ```
 */
const useNotificationHandler = () => {
  useRegisterPushNotificationsEffect();
  useStartupNotificationsEffect();
};

export default useNotificationHandler;
