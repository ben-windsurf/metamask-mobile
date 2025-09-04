import {
  QuotesModalSelectorIDs,
  QuotesModalSelectorsTexts,
} from '../../selectors/swaps/QuotesModal.selectors.js';
import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';

/**
 * Page object model for the Quotes Modal in the swaps flow.
 * Provides methods to interact with quote selection and modal controls.
 */
class QuotesModal {
  /**
   * Gets the close button element for the quotes modal.
   * @returns The close button DetoxElement
   */
  get closeButton(): DetoxElement {
    return Matchers.getElementByID(QuotesModalSelectorIDs.QUOTES_MODAL_CLOSE);
  }

  /**
   * Gets the header element displaying the quotes overview.
   * @returns The header DetoxElement containing quotes overview text
   */
  get header(): DetoxElement {
    return Matchers.getElementByText(QuotesModalSelectorsTexts.QUOTES_OVERVIEW);
  }

  /**
   * Closes the quotes modal by tapping the close button.
   * @returns Promise that resolves when the modal is closed
   */
  async close(): Promise<void> {
    await Gestures.waitAndTap(this.closeButton, {
      elemDescription: 'Close Button in Quotes Modal',
    });
  }
}

export default new QuotesModal();
