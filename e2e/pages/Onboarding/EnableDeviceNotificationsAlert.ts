import Gestures from '../../framework/Gestures';
import Matchers from '../../framework/Matchers';

import { EnableDeviceNotificationsAlertSelectorText } from '../../selectors/Onboarding/EnableDeviceNotificationsAlert.selectors';

/**
 * Page object for handling the Enable Device Notifications alert during onboarding.
 * Provides methods to interact with the system alert that prompts users to enable
 * device notifications for the MetaMask mobile app.
 */
class EnableDeviceNotificationsAlert {
  /**
   * Gets the container element for the device notifications alert.
   * @returns The DetoxElement representing the alert container
   */
  get stepOneContainer(): DetoxElement {
    return Matchers.getSystemElementByText(
      EnableDeviceNotificationsAlertSelectorText.CONTAINER,
    );
  }

  /**
   * Gets the "Enable" button element from the device notifications alert.
   * @returns The DetoxElement representing the enable notifications button
   */
  get getEnableDeviceNotificationsButton(): DetoxElement {
    return Matchers.getSystemElementByText(
      EnableDeviceNotificationsAlertSelectorText.YES_BUTTON,
    );
  }

  /**
   * Taps on the enable device notifications button in the system alert.
   * Waits for the button to be available before tapping.
   * @returns Promise that resolves when the tap action is completed
   */
  async tapOnEnableDeviceNotificationsButton(): Promise<void> {
    await Gestures.waitAndTap(this.getEnableDeviceNotificationsButton, {
      elemDescription: 'Enable Device Notifications Button',
    });
  }
}

export default new EnableDeviceNotificationsAlert();
