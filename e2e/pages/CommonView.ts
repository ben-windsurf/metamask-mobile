import Matchers from '../framework/Matchers';
import Gestures from '../framework/Gestures';
import {
  CommonSelectorsIDs,
  CommonSelectorsText,
} from '../selectors/Common.selectors';

/**
 * Common view page object for shared UI elements and interactions across the app.
 * Provides methods to interact with common elements like alerts, back buttons, and error messages.
 */
class CommonView {
  /**
   * Gets the OK alert element by text.
   * @returns The OK alert DetoxElement
   */
  get okAlertByText(): DetoxElement {
    return Matchers.getElementByText('OK');
  }

  /**
   * Gets the back button element.
   * @returns The back button DetoxElement
   */
  get backButton(): DetoxElement {
    return Matchers.getElementByID(CommonSelectorsIDs.BACK_ARROW_BUTTON);
  }

  /**
   * Gets the error message element.
   * @returns The error message DetoxElement
   */
  get errorMessage(): DetoxElement {
    return Matchers.getElementByID(CommonSelectorsIDs.ERROR_MESSAGE);
  }

  /**
   * Gets the OK alert button element.
   * @returns The OK alert button DetoxElement
   */
  get okAlertButton(): DetoxElement {
    return Matchers.getElementByText(CommonSelectorsText.OK_ALERT_BUTTON);
  }

  /**
   * Taps the back button to navigate to the previous screen.
   * @returns Promise that resolves when the tap action is complete
   */
  async tapBackButton(): Promise<void> {
    await Gestures.waitAndTap(this.backButton, {
      elemDescription: 'Back Button',
    });
  }

  /**
   * Taps the OK alert to dismiss it.
   * @returns Promise that resolves when the tap action is complete
   */
  async tapOkAlert(): Promise<void> {
    await Gestures.waitAndTap(this.okAlertByText, {
      elemDescription: 'OK Alert',
    });
  }

  /**
   * Taps the OK alert button to confirm or dismiss the alert.
   * @returns Promise that resolves when the tap action is complete
   */
  async tapOKAlertButton(): Promise<void> {
    await Gestures.waitAndTap(this.okAlertButton, {
      elemDescription: 'OK Alert Button',
    });
  }
}

export default new CommonView();
