import {
  NotificationSettingsViewSelectorsIDs,
  NotificationSettingsViewSelectorsText,
} from '../../selectors/Notifications/NotificationSettingsView.selectors';
import Gestures from '../../framework/Gestures';
import Matchers from '../../framework/Matchers';
import { Assertions, Utilities } from '../../framework';

/**
 * Represents the state of a toggle element
 */
type ToggleState = 'on' | 'off';

/**
 * Configuration object for toggle operations
 * @interface ToggleConfig
 * @property element - The Detox element to interact with
 * @property description - Human-readable description of the toggle action
 * @property elemDescription - Element description for debugging purposes
 */
interface ToggleConfig {
  element: DetoxElement;
  description: string;
  elemDescription: string;
}

/**
 * Page object for the Notifications Settings view in end-to-end tests.
 * Provides methods to interact with notification toggles and verify their states.
 */
class NotificationsSettingsView {
  /**
   * Gets the main notification toggle element
   * @returns The notification toggle element
   */
  get notificationToggle() {
    return Matchers.getElementByID(
      NotificationSettingsViewSelectorsIDs.NOTIFICATIONS_TOGGLE,
    );
  }

  /**
   * Gets the push notifications toggle element
   * @returns The push notifications toggle element
   */
  get pushNotificationsToggle() {
    return Matchers.getElementByID(
      NotificationSettingsViewSelectorsIDs.PUSH_NOTIFICATIONS_TOGGLE,
    );
  }

  /**
   * Gets the feature announcements toggle element
   * @returns The feature announcements toggle element
   */
  get featureAnnouncementsToggle() {
    return Matchers.getElementByID(
      NotificationSettingsViewSelectorsIDs.FEATURE_ANNOUNCEMENTS_TOGGLE,
    );
  }

  /**
   * Gets the account activity section element
   * @returns The account activity section element
   */
  get accountActivitySection() {
    return Matchers.getElementByText(
      NotificationSettingsViewSelectorsText.ACCOUNT_ACTIVITY_SECTION,
    );
  }

  /**
   * Gets the account notification toggle element for a specific address
   * @param address - The account address to get the toggle for
   * @returns The account notification toggle element
   */
  accountNotificationToggle(address: string) {
    return Matchers.getElementByID(
      NotificationSettingsViewSelectorsIDs.ACCOUNT_NOTIFICATION_TOGGLE(address),
    );
  }

  /**
   * Private method to toggle an element and verify its state
   * @param config - Configuration object containing element and descriptions
   * @param expectedToggleState - Expected state after toggle ('on' or 'off')
   * @returns Promise that resolves when toggle operation is complete
   */
  private async toggleElement(
    config: ToggleConfig,
    expectedToggleState: ToggleState = 'on',
  ) {
    return Utilities.executeWithRetry(
      async () => {
        await Gestures.waitAndTap(config.element, {
          timeout: 2000,
          elemDescription: config.elemDescription,
        });

        const assertion =
          expectedToggleState === 'on'
            ? Assertions.expectToggleToBeOn
            : Assertions.expectToggleToBeOff;

        await assertion(config.element, {
          timeout: 2000,
        });
      },
      {
        timeout: 30000,
        description: `${config.description} and verify it is ${expectedToggleState}`,
        elemDescription: config.elemDescription,
      },
    );
  }

  // Checking the toggle state within the method due to flaky behavior

  async tapPushNotificationsToggleAndVerifyState(
    expectedToggleState: ToggleState,
  ) {
    return this.toggleElement(
      {
        element: this.pushNotificationsToggle,
        description: 'Tap Push Notifications Toggle',
        elemDescription: 'Notification Settings - Push Notifications Toggle',
      },
      expectedToggleState,
    );
  }

  async tapNotificationToggleAndVerifyState(expectedToggleState: ToggleState) {
    return this.toggleElement(
      {
        element: this.notificationToggle,
        description: 'Tap Notification Toggle',
        elemDescription: 'Notification Settings - Main Toggle',
      },
      expectedToggleState,
    );
  }

  async tapFeatureAnnouncementsToggleAndVerifyState(
    expectedToggleState: ToggleState,
  ) {
    return this.toggleElement(
      {
        element: this.featureAnnouncementsToggle,
        description: 'Tap Feature Announcements Toggle',
        elemDescription: 'Notification Settings - Feature Announcements Toggle',
      },
      expectedToggleState,
    );
  }

  async tapAccountNotificationsToggleAndVerifyState(
    address: string,
    expectedToggleState: ToggleState,
  ) {
    return this.toggleElement(
      {
        element: this.accountNotificationToggle(address),
        description: 'Tap Account Notifications Toggle',
        elemDescription: `Notification Settings - Account Notifications Toggle for ${address}`,
      },
      expectedToggleState,
    );
  }
}

export default new NotificationsSettingsView();
