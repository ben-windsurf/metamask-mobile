import {
  SwapsViewSelectorsIDs,
  SwapViewSelectorsTexts,
} from '../../selectors/swaps/SwapsView.selectors.js';

import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';
import { waitFor } from 'detox';
import { logger } from '../../framework/logger.js';

/**
 * Page object model for the Swap View screen in end-to-end tests.
 * Provides methods and element getters for interacting with the swap interface.
 */
class SwapView {
  /**
   * Gets the quote summary element.
   * @returns The quote summary DetoxElement
   */
  get quoteSummary(): DetoxElement {
    return Matchers.getElementByID(SwapsViewSelectorsIDs.QUOTE_SUMMARY);
  }

  /**
   * Gets the gas fee element.
   * @returns The gas fee DetoxElement
   */
  get gasFee(): DetoxElement {
    return Matchers.getElementByID(SwapsViewSelectorsIDs.GAS_FEE);
  }

  /**
   * Gets the fetching quotes element.
   * @returns The fetching quotes DetoxElement
   */
  get fetchingQuotes(): DetoxElement {
    return Matchers.getElementByText(SwapViewSelectorsTexts.FETCHING_QUOTES);
  }

  /**
   * Gets the swap button element, with platform-specific handling.
   * @returns The swap button DetoxElement
   */
  get swapButton(): DetoxElement {
    return device.getPlatform() === 'ios'
      ? Matchers.getElementByID(SwapsViewSelectorsIDs.SWAP_BUTTON)
      : Matchers.getElementByLabel(SwapsViewSelectorsIDs.SWAP_BUTTON);
  }

  /**
   * Gets the "I Understand" label element for price warnings.
   * @returns The "I Understand" label DetoxElement
   */
  get iUnderstandLabel(): DetoxElement {
    return Matchers.getElementByText(SwapViewSelectorsTexts.I_UNDERSTAND);
  }

  /**
   * Gets the view details button element.
   * @returns The view details button DetoxElement
   */
  get viewDetailsButton(): DetoxElement {
    return Matchers.getElementByID(SwapsViewSelectorsIDs.VIEW_ALL_QUOTES);
  }

  async isPriceWarningDisplayed(): Promise<boolean> {
    try {
      const label = (await this.iUnderstandLabel) as Detox.NativeElement;
      await waitFor(label).toBeVisible().withTimeout(5000);
      return true;
    } catch (e) {
      return false;
    }
  }

  generateSwapCompleteLabel(
    sourceToken: string,
    destinationToken: string,
  ): string {
    let title = SwapViewSelectorsTexts.SWAP_CONFIRMED;
    title = title.replace('{{sourceToken}}', sourceToken);
    title = title.replace('{{destinationToken}}', destinationToken);
    return title;
  }

  async tapSwapButton(): Promise<void> {
    await Gestures.waitAndTap(this.swapButton, {
      elemDescription: 'Swap Button in Swap View',
    });
  }

  async tapIUnderstandPriceWarning(): Promise<void> {
    const isDisplayed = await this.isPriceWarningDisplayed();
    if (isDisplayed) {
      await Gestures.waitAndTap(this.iUnderstandLabel, {
        elemDescription: 'I Understand Label in Swap View',
      });
    } else {
      // eslint-disable-next-line no-console
      logger.warn(
        'SwapView: tapIUnderstandPriceWarning - I Understand label is not displayed, skipping tap.',
      );
    }
  }

  async tapViewDetailsAllQuotes(): Promise<void> {
    await Gestures.waitAndTap(this.viewDetailsButton, {
      elemDescription: 'View Details Button in Swap View',
    });
  }
}

export default new SwapView();
