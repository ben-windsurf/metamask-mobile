import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';
import {
  QuoteViewSelectorIDs,
  QuoteViewSelectorText,
} from '../../selectors/swaps/QuoteView.selectors';

/**
 * Page object model for the Quote View in the swaps flow.
 * Provides methods to interact with swap quote elements and perform swap-related actions.
 */
class QuoteView {
  /**
   * Gets the "Get Quotes" button element.
   * @returns The DetoxElement for the get quotes button
   */
  get getQuotes(): DetoxElement {
    return Matchers.getElementByText(QuoteViewSelectorText.GET_QUOTES);
  }

  /**
   * Gets the "Get New Quotes" button element.
   * @returns The DetoxElement for the get new quotes button
   */
  get getNewQuotes(): DetoxElement {
    return Matchers.getElementByText(QuoteViewSelectorText.GET_NEW_QUOTES);
  }

  /**
   * Gets the cancel button element.
   * @returns The DetoxElement for the cancel button
   */
  get cancelButton(): DetoxElement {
    return Matchers.getElementByText(QuoteViewSelectorText.CANCEL);
  }

  /**
   * Gets the source token selector element.
   * @returns The DetoxElement for the source token selector
   */
  get sourceToken(): DetoxElement {
    return Matchers.getElementByID(QuoteViewSelectorIDs.SOURCE_TOKEN);
  }

  /**
   * Gets the destination token selector element.
   * @returns The DetoxElement for the destination token selector
   */
  get destToken(): DetoxElement {
    return Matchers.getElementByID(QuoteViewSelectorIDs.DEST_TOKEN);
  }

  /**
   * Gets the token search input element.
   * @returns The TypableElement for the token search input
   */
  get searchToken(): TypableElement {
    return Matchers.getElementByID(
      QuoteViewSelectorIDs.SEARCH_TOKEN,
    ) as TypableElement;
  }

  /**
   * Gets the max slippage setting element.
   * @returns The DetoxElement for the max slippage setting
   */
  get maxSlippage(): DetoxElement {
    return Matchers.getElementByID(QuoteViewSelectorIDs.MAX_SLIPPAGE);
  }

  async enterSwapAmount(amount: string) {
    for (const digit of amount) {
      const button = Matchers.getElementByText(digit);
      await Gestures.waitAndTap(button, {
        elemDescription: `Digit ${digit} in Swap Amount`,
      });
    }
  }

  async tapOnSelectSourceToken() {
    await Gestures.waitAndTap(this.sourceToken, {
      elemDescription: 'Source Token in Quote View',
    });
  }

  async tapOnSelectDestToken() {
    await Gestures.waitAndTap(this.destToken, {
      elemDescription: 'Destination Token in Quote View',
    });
  }

  async tapSearchToken() {
    await Gestures.waitAndTap(this.searchToken, {
      elemDescription: 'Search Token in Quote View',
    });
  }

  async typeSearchToken(symbol: string) {
    await Gestures.typeText(this.searchToken, symbol, {
      elemDescription: `Search Token with symbol ${symbol}`,
    });
  }

  async selectToken(symbol: string, index: number = 1): Promise<void> {
    const token = Matchers.getElementByText(symbol, index);
    await Gestures.waitAndTap(token, {
      elemDescription: `Token with symbol ${symbol} at index ${index}`,
    });
  }

  async tapOnGetQuotes(): Promise<void> {
    await Gestures.waitAndTap(this.getQuotes, {
      elemDescription: 'Get Quotes Button in Quote View',
    });
  }

  async tapOnCancelButton(): Promise<void> {
    await Gestures.waitAndTap(this.cancelButton, {
      elemDescription: 'Cancel Button in Quote View',
    });
  }
}

export default new QuoteView();
