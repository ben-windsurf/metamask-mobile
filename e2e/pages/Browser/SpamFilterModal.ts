import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';
import { SpamFilterModalSelectorText } from '../../selectors/Browser/SpamFilterModal.selectors';

/**
 * Page object model for the Spam Filter Modal in the browser.
 * Provides methods to interact with spam filter modal elements and actions.
 */
class SpamFilterModal {
  /**
   * Gets the title element of the spam filter modal.
   * @returns The title element
   */
  get title(): DetoxElement {
    return Matchers.getElementByText(SpamFilterModalSelectorText.TITLE);
  }

  /**
   * Gets the cancel button element of the spam filter modal.
   * @returns The cancel button element
   */
  get cancelButtonText(): DetoxElement {
    return Matchers.getElementByText(SpamFilterModalSelectorText.CANCEL_BUTTON);
  }

  /**
   * Taps the close button to dismiss the spam filter modal.
   * @returns Promise that resolves when the tap action is completed
   */
  async tapCloseButton(): Promise<void> {
    await Gestures.waitAndTap(this.cancelButtonText, {
      elemDescription: 'Tap on the close button',
    });
  }
}

export default new SpamFilterModal();
