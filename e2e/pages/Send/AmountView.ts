import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';
import {
  AmountViewSelectorsIDs,
  AmountViewSelectorsText,
} from '../../selectors/SendFlow/AmountView.selectors';

/**
 * Page object model for the Amount View screen in the Send flow.
 * Provides methods to interact with amount input, currency switching, and navigation.
 */
class AmountView {
  /**
   * Gets the currency switch toggle element.
   * @returns The currency switch DetoxElement
   */
  get currencySwitch(): DetoxElement {
    return Matchers.getElementByID(AmountViewSelectorsIDs.CURRENCY_SWITCH);
  }

  /**
   * Gets the screen title element.
   * @returns The title DetoxElement
   */
  get title(): DetoxElement {
    return Matchers.getElementByText(AmountViewSelectorsText.SCREEN_TITLE);
  }

  /**
   * Gets the next button element with platform-specific handling.
   * @returns The next button DetoxElement
   */
  get nextButton(): DetoxElement {
    return device.getPlatform() === 'ios'
      ? Matchers.getElementByID(AmountViewSelectorsIDs.NEXT_BUTTON)
      : Matchers.getElementByLabel(AmountViewSelectorsIDs.NEXT_BUTTON);
  }

  /**
   * Gets the back button element.
   * @returns The back button DetoxElement
   */
  get backButton(): DetoxElement {
    return Matchers.getElementByID(AmountViewSelectorsIDs.SEND_BACK_BUTTON);
  }

  /**
   * Gets the amount input field element.
   * @returns The amount input DetoxElement
   */
  get amountInputField(): DetoxElement {
    return Matchers.getElementByID(AmountViewSelectorsIDs.AMOUNT_INPUT);
  }

  /**
   * Gets the max button element for setting maximum amount.
   * @returns The max button DetoxElement
   */
  get maxButton(): DetoxElement {
    return Matchers.getElementByID(AmountViewSelectorsIDs.MAX_BUTTON);
  }

  async tapNextButton(): Promise<void> {
    await Gestures.waitAndTap(this.nextButton, {
      elemDescription: 'Next Button in Amount View',
    });
  }

  async tapBackButton(): Promise<void> {
    await Gestures.waitAndTap(this.backButton, {
      elemDescription: 'Back Button in Amount View',
    });
  }

  async typeInTransactionAmount(amount: string): Promise<void> {
    const elemDescription = `Amount Input Field in Amount View`;
    device.getPlatform() === 'android'
      ? await Gestures.typeText(this.amountInputField, amount, {
          elemDescription,
          hideKeyboard: true,
        })
      : await Gestures.replaceText(this.amountInputField, amount, {
          elemDescription,
        });
  }

  async tapCurrencySwitch(): Promise<void> {
    await Gestures.waitAndTap(this.currencySwitch, {
      elemDescription: 'Currency Switch in Amount View',
    });
  }

  async tapMaxButton(): Promise<void> {
    await Gestures.waitAndTap(this.maxButton, {
      elemDescription: 'Max Button in Amount View',
    });
  }
}
export default new AmountView();
