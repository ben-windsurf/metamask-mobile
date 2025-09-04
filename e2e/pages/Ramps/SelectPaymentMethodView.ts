import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';
import { SelectPaymentMethodSelectors } from '../../selectors/Ramps/SelectPaymentMethod.selectors';

/**
 * Page object for the Select Payment Method view in the Ramps flow.
 * Provides methods to interact with payment method selection UI elements.
 */
class SelectPaymentMethodView {
  /**
   * Gets the continue button element.
   * @returns The continue button DetoxElement
   */
  get continueButton(): DetoxElement {
    return Matchers.getElementByText(
      SelectPaymentMethodSelectors.CONTINUE_BUTTON,
    );
  }

  /**
   * Taps on a specific payment method option.
   * @param paymentMethod - The text of the payment method to select
   * @returns Promise that resolves when the tap action is complete
   */
  async tapPaymentMethodOption(paymentMethod: string): Promise<void> {
    const paymentMethodOption = Matchers.getElementByText(paymentMethod);
    await Gestures.waitAndTap(paymentMethodOption, {
      elemDescription: `Payment Method "${paymentMethod}" in Select Payment Method View`,
    });
  }

  /**
   * Taps the continue button to proceed to the next step.
   * @returns Promise that resolves when the tap action is complete
   */
  async tapContinueButton(): Promise<void> {
    await Gestures.waitAndTap(this.continueButton, {
      elemDescription: 'Continue Button in Select Payment Method View',
    });
  }
}

export default new SelectPaymentMethodView();
