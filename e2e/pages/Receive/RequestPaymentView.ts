import { RequestPaymentViewSelectors } from '../../selectors/Receive/RequestPaymentView.selectors';
import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';

/**
 * Page object model for the Request Payment view in the MetaMask mobile app.
 * Provides methods to interact with UI elements for requesting cryptocurrency payments.
 */
class RequestPaymentView {
  /**
   * Gets the back button element for navigating away from the request payment view.
   * @returns The back button DetoxElement
   */
  get backButton(): DetoxElement {
    return Matchers.getElementByID(RequestPaymentViewSelectors.BACK_BUTTON_ID);
  }

  /**
   * Gets the token search input element for searching available tokens.
   * @returns The token search input DetoxElement
   */
  get tokenSearchInput(): DetoxElement {
    return Matchers.getElementByID(
      RequestPaymentViewSelectors.TOKEN_SEARCH_INPUT_BOX,
    );
  }

  /**
   * Gets the request amount input element for entering the payment amount.
   * @returns The request amount input DetoxElement
   */
  get requestAmountInput(): DetoxElement {
    return Matchers.getElementByID(
      RequestPaymentViewSelectors.REQUEST_AMOUNT_INPUT_BOX_ID,
    );
  }

  /**
   * Gets the main request payment container element.
   * @returns The request payment container DetoxElement
   */
  get requestPaymentContainer(): DetoxElement {
    return Matchers.getElementByID(
      RequestPaymentViewSelectors.REQUEST_PAYMENT_CONTAINER_ID,
    );
  }

  /**
   * Gets the request asset list element containing available tokens.
   * @returns The request asset list DetoxElement
   */
  get requestAssetList(): DetoxElement {
    return Matchers.getElementByID(
      RequestPaymentViewSelectors.REQUEST_ASSET_LIST_ID,
    );
  }

  /**
   * Taps the back button to navigate away from the request payment view.
   * @returns Promise that resolves when the tap action is complete
   */
  async tapBackButton(): Promise<void> {
    await Gestures.waitAndTap(this.backButton);
  }

  async searchForToken(token: string): Promise<void> {
    await Gestures.typeText(this.tokenSearchInput, token, {
      elemDescription: 'Token Search Input',
      hideKeyboard: true,
    });
  }

  async tapOnToken(token: string) {
    const tokenElement = await Matchers.getElementByText(token, 0);
    await Gestures.waitAndTap(Promise.resolve(tokenElement), {
      elemDescription: `Token "${token}" in Request Payment View`,
    });
  }

  async typeInTokenAmount(amount: number | string): Promise<void> {
    await Gestures.typeText(this.requestAmountInput, String(amount), {
      elemDescription: 'Request Amount Input',
      hideKeyboard: true,
    });
  }
}

export default new RequestPaymentView();
