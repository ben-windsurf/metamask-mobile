import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';
import { QuoteSelectors } from '../../selectors/Ramps/Quotes.selectors';

/**
 * Page object for the Quotes View in the Ramps feature.
 * Provides methods to interact with quote selection and provider options.
 */
class QuotesView {
  /**
   * Gets the "Select a Quote" label element.
   * @returns The DetoxElement for the recommended quote label
   */
  get selectAQuoteLabel(): DetoxElement {
    return Matchers.getElementByText(QuoteSelectors.RECOMMENDED_QUOTE);
  }

  /**
   * Gets the quote amount label element.
   * @returns The DetoxElement for the quote amount display
   */
  get quoteAmountLabel(): DetoxElement {
    return Matchers.getElementByID(QuoteSelectors.QUOTE_AMOUNT_LABEL);
  }

  /**
   * Gets the quotes container element.
   * @returns The DetoxElement for the quotes section
   */
  get quotes(): DetoxElement {
    return Matchers.getElementByID(QuoteSelectors.QUOTES);
  }

  /**
   * Gets the "Explore More Options" button element.
   * @returns The DetoxElement for the explore more options button
   */
  get exploreMoreOptions(): DetoxElement {
    return Matchers.getElementByText(QuoteSelectors.EXPLORE_MORE_OPTIONS);
  }

  /**
   * Gets the expanded quotes section element.
   * @returns The DetoxElement for the expanded quotes section
   */
  get expandedQuotesSection(): DetoxElement {
    return Matchers.getElementByID(QuoteSelectors.EXPANDED_QUOTES_SECTION);
  }

  /**
   * Gets the "Continue with Provider" button element.
   * Uses a regex pattern to match any provider name.
   * @returns The DetoxElement for the continue with provider button
   */
  get continueWithProvider(): DetoxElement {
    const providerLocator = QuoteSelectors.CONTINUE_WITH_PROVIDER.replace(
      '{{provider}}',
      '.*',
    );
    return Matchers.getElementByText(new RegExp(`^${providerLocator}$`));
  }

  /**
   * Taps the "Continue with Provider" button.
   * @returns Promise that resolves when the tap gesture is complete
   */
  async tapContinueWithProvider() {
    await Gestures.tap(this.continueWithProvider);
  }

  async tapExploreMoreOptions() {
    await Gestures.tap(this.exploreMoreOptions);
  }

  async closeQuotesSection() {
    await Gestures.swipe(this.selectAQuoteLabel, 'down', {
      elemDescription: 'Close Quotes Section',
      speed: 'fast',
      percentage: 0.7,
    });
  }
}

export default new QuotesView();
