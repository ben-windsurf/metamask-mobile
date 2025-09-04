import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';
import {
  QuoteViewSelectorIDs,
  QuoteViewSelectorText,
} from '../../selectors/Bridge/QuoteView.selectors';

/**
 * Page object model for the Bridge Quote View screen.
 * Provides methods to interact with bridge quote elements and perform bridge-related actions.
 */
class QuoteView {
  /**
   * Gets the select amount label element.
   * @returns The select amount label DetoxElement
   */
  get selectAmountLabel(): DetoxElement {
    return Matchers.getElementByText(QuoteViewSelectorText.SELECT_AMOUNT);
  }

  /**
   * Gets the confirm bridge button element.
   * @returns The confirm bridge button DetoxElement
   */
  get confirmBridge(): DetoxElement {
    return Matchers.getElementByText(QuoteViewSelectorText.CONFIRM_BRIDGE);
  }

  /**
   * Gets the confirm swap button element.
   * @returns The confirm swap button DetoxElement
   */
  get confirmSwap(): DetoxElement {
    return Matchers.getElementByText(QuoteViewSelectorText.CONFIRM_SWAP);
  }

  /**
   * Gets the bridge to button element.
   * @returns The bridge to button DetoxElement
   */
  get bridgeTo(): DetoxElement {
    return Matchers.getElementByText(QuoteViewSelectorText.BRIDGE_TO);
  }

  /**
   * Gets the swap to button element.
   * @returns The swap to button DetoxElement
   */
  get swapTo(): DetoxElement {
    return Matchers.getElementByText(QuoteViewSelectorText.SWAP_TO);
  }

  /**
   * Gets the token search input element.
   * @returns Promise resolving to the token search input element
   */
  get searchToken(): Promise<Detox.IndexableNativeElement> {
    return Matchers.getElementByID(
      QuoteViewSelectorIDs.TOKEN_SEARCH_INPUT,
    ) as Promise<Detox.IndexableNativeElement>;
  }

  /**
   * Gets the cancel button element.
   * @returns The cancel button DetoxElement
   */
  get cancelButton(): DetoxElement {
    return Matchers.getElementByText(QuoteViewSelectorText.CANCEL);
  }

  get networkFeeLabel(): DetoxElement {
    return Matchers.getElementByText(QuoteViewSelectorText.NETWORK_FEE);
  }

  token(chainId: string, symbol: string): Detox.NativeElement {
    const elementId = `asset-${chainId}-${symbol}`;
    return element(by.id(elementId)).atIndex(0);
  }

  async enterAmount(amount: string): Promise<void> {
    for (const digit of amount) {
      const button = Matchers.getElementByText(digit);
      await Gestures.waitAndTap(button, { delay: 500 });
    }
  }

  async tapSearchToken(): Promise<void> {
    await Gestures.waitAndTap(this.searchToken);
  }

  async tapBridgeTo(): Promise<void> {
    await Gestures.waitAndTap(this.bridgeTo, { delay: 1000 });
  }

  async tapToken(chainId: string, symbol: string): Promise<void> {
    await Gestures.waitAndTap(
      this.token(chainId, symbol) as unknown as DetoxElement,
      {
        delay: 1000,
      },
    );
  }

  async tapSourceToken(): Promise<void> {
    const token = Matchers.getElementByText('ETH');
    await Gestures.waitAndTap(token, { delay: 1000 });
  }

  async tapDestToken(): Promise<void> {
    const token = Matchers.getElementByText('USDC');
    await Gestures.waitAndTap(token, { delay: 1000 });
  }

  async tapSwapTo(): Promise<void> {
    await Gestures.waitAndTap(this.swapTo, { delay: 1000 });
  }

  async selectNetwork(network: string): Promise<void> {
    const networkElement = Matchers.getElementByText(network);
    await Gestures.waitAndTap(networkElement, { delay: 1000 });
  }

  async typeSearchToken(symbol: string): Promise<void> {
    await Gestures.typeTextAndHideKeyboard(this.searchToken, symbol);
  }

  async tapConfirmBridge(): Promise<void> {
    await Gestures.waitAndTap(this.confirmBridge);
  }

  async tapConfirmSwap(): Promise<void> {
    await Gestures.waitAndTap(this.confirmSwap, {
      delay: 1300,
    });
  }

  async tapOnCancelButton() {
    await Gestures.waitAndTap(this.cancelButton);
  }
}

export default new QuoteView();
