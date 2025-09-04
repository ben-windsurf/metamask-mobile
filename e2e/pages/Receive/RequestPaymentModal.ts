import { RequestPaymentModalSelectorsIDs } from '../../selectors/Receive/RequestPaymentModal.selectors';
import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';

/**
 * Page object model for the Request Payment Modal in end-to-end tests.
 * Provides methods to interact with the request payment functionality.
 */
class RequestPaymentModal {
  /**
   * Gets the request payment button element based on platform.
   * @returns The DetoxElement for the request payment button
   */
  get requestPaymentButton(): DetoxElement {
    return device.getPlatform() === 'android'
      ? Matchers.getElementByLabel(
          RequestPaymentModalSelectorsIDs.REQUEST_BUTTON,
        )
      : Matchers.getElementByID(RequestPaymentModalSelectorsIDs.REQUEST_BUTTON);
  }

  /**
   * Taps the request payment button in the modal.
   * @returns Promise that resolves when the button is tapped
   */
  async tapRequestPaymentButton(): Promise<void> {
    await Gestures.waitAndTap(this.requestPaymentButton, {
      elemDescription: 'Request Payment Button in Request Payment Modal',
    });
  }
}

export default new RequestPaymentModal();
